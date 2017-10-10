import React, {Component} from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

import Style from './Style';
import Stars from './Stars';
import Button from './Button';

class RatingComponent extends Component {

  static defaultProps = {
    rating: 0
  };

  static propTypes = {
    rating:  PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
    service: PropTypes.func,
    skin:    PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      rating:    this.props.rating,
      submitted: false,
      processed: false
    };

    this.theme = Style.getInstance().init(this.props.skin);
  }

  submit() {
    let success = () => {
          this.setState({processed: true})
        },
        error   = () => {
          this.setState({submitted: false})
        };

    this.setState({submitted: true});
    this.props.callback(this.state.rating, success, error);
  }

  render() {
    let is_interactive = this.props.callback;

    return (
      <article style={[this.theme, is_interactive && this.theme.interactive]}>

        {this.state.processed && <h2 role='alert' style={this.theme.alert}>Thanks for your rating!</h2>}

        <div style={[
          this.theme.container,
          is_interactive && this.theme.container.interactive,
          this.state.submitted && this.theme.container.disabled
        ]}>

          <h1 style={[this.theme.title, is_interactive && this.theme.title.interactive]} id='rate_this_product'>
            {is_interactive ? 'Rate this product' : 'Average rating'}
          </h1>

          <Stars action={is_interactive && !this.state.submitted ? this.setState.bind(this) : null}
                 rating={this.props.rating}
                 interactive={is_interactive}/>

          {is_interactive &&
          <Button action={!this.state.submitted && !!this.state.rating ? this.submit.bind(this) : null}
                  rating={this.state.rating}>Apply</Button>}

        </div>
      </article>
    )
  }
}

export default Radium(RatingComponent);