import React, {Component} from 'react';
import Radium from 'radium';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import Style from './Style';

const KEYCODE = {
  DOWN:  40,
  LEFT:  37,
  RIGHT: 39,
  UP:    38,
  SPACE: 32,
};

class Stars extends Component {

  constructor(props) {
    super(props);

    this.stars = [
      {label: 'One star', checked: false},
      {label: 'Two stars', checked: false},
      {label: 'Three stars', checked: false},
      {label: 'Four stars', checked: false},
      {label: 'Five stars', checked: false},
    ];

    this.state = {
      rating:      this.props.rating - 1,
      highlighted: this.props.rating - 1,
      focus:       false
    };

    this.theme = Style.getInstance().getTheme();
  }

  onMouseOver(index) {
    this.setState({highlighted: index, focus: false});
  }

  onMouseOut() {
    this.setState({highlighted: this.state.rating, focus: false});
  }

  onClick(index, e) {
    let rating = index === this.state.rating ? index - 1 : index;
    this.update({rating: rating, focus: false});

    e.preventDefault();
  }

  onKeyDown(e) {
    let key = e.keyCode;
    if (e.type === "keydown") {
      if (key === KEYCODE.UP || key === KEYCODE.RIGHT) {
        this.update({rating: this.state.rating + 1, focus: true})
      }
      else if (key === KEYCODE.DOWN || key === KEYCODE.LEFT) {
        this.update({rating: this.state.rating - 1, focus: true})

      }
      else if (key === KEYCODE.SPACE) {
        this.update({rating: this.state.rating, focus: true})
      }
    }
  }

  update(params) {
    let rating = Math.max(Math.min(params.rating, 4), 0);
    this.stars[rating].element.focus();
    this.props.action({rating: rating + 1});

    this.setState({rating: rating, highlighted: rating, focus: params.focus});
  }

  render() {
    let interactive = this.props.interactive,
        enabled     = this.props.action,
        label       = interactive && enabled ? 'rate_this_product' : null,
        role        = (role) => {
          return interactive && enabled ? role : null
        },
        checked     = (index) => {
          return interactive && enabled ? index === this.state.highlighted : null;
        },
        tabIndex    = (index) => {
          let result;
          if (this.state.rating === -1) {
            result = interactive && enabled ? (index === 0 ? 0 : -1) : null;
          }
          else {
            result = interactive && enabled ? (index === this.state.rating ? 0 : -1) : null;
          }
          return result;
        },
        onFocus     = () => {
          setTimeout(() => {
            if (!this.mouse_focus_on) {
              this.update({rating: this.state.rating, focus: true});
              this.mouse_focus_on = false;
            }
          }, 0)
        };

    return (
      <ul onKeyDown={this.onKeyDown.bind(this)} style={[this.theme.stars, interactive && this.theme.stars.interactive]}
          role={role('radiogroup')}
          onMouseDown={() => this.mouse_focus_on = true}
          onFocus={onFocus}
          tabIndex={interactive && enabled && !this.state.focus ? 0 : null}
          aria-labelledby={label}>

        {this.stars.map((params, index) => (
          <li role={role('radio')}
              aria-checked={checked(index)}
              aria-label={params.label}
              tabIndex={tabIndex(index)}
              key={index.toString()}
              ref={(li) => { this.stars[index].element = li }}
              onClick={interactive && enabled ? this.onClick.bind(this, index) : null}
              onMouseOver={interactive && enabled ? this.onMouseOver.bind(this, index) : null}
              onMouseOut={interactive && enabled ? this.onMouseOut.bind(this) : null}
              className={'fa fa-star fa-2x'}
              style={[
                this.theme.star,
                this.theme.star[index <= this.state.highlighted && 'active'],
                interactive && this.theme.star.interactive,
                enabled && this.theme.star.enabled,
                !this.state.focus && this.theme.star.blurred
              ]}>
          </li>
        ))}
      </ul>
    )
  }
}

export default Radium(Stars);