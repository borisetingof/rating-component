import React, {Component} from 'react';
import Radium from 'radium';

import Style from './Style';

class Navigation extends Component {

  static defaultProps = {
    config: []
  };

  constructor(props) {
    super(props);
    this.style = Style.getInstance();
  }

  _onClick(index, e){
    e.preventDefault();
    if(this.props.onClick){
      this.props.onClick(index)
    }
  }

  render() {
    return (
      <nav style={[this.style.navigation]}>
        {this.props.config.map((params, index) => (
          <a key={index.toString()}
              onMouseOver={this.props.onMouseOver && this.props.onMouseOver.bind(this, index)}
              onMouseOut={this.props.onMouseOut && this.props.onMouseOut.bind(this)}
              onClick={this._onClick.bind(this, index)}
              style={this.style.navigation.item}>

            <span style={this.style.navigation.item.firstname}>
              {params.firstname}
            </span>

            <br/>

            <span style={this.style.navigation.item.surname}>
              {params.surname}
            </span>

            <div key={index.toString() + 'div'} style={this.style.navigation.separator}/>
          </a>
        ))}
      </nav>
    )
  }
}

export default Radium(Navigation);
