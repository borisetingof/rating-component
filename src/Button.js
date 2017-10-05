import React, {Component} from 'react';
import Radium from 'radium';

import Style from './Style';

class Button extends Component {
  constructor(props) {
    super(props);
    this.theme = Style.getInstance().getTheme();
  }

  render() {
    return (
      <button onClick={this.props.action} tabIndex={0}
              style={[
                this.theme.button,
                this.props.action ? this.theme.button.enabled : this.theme.button.disabled,
                !this.props.rating && this.theme.button.greyed_out
              ]}>
        {this.props.children}
      </button>
    );
  }
}

export default Radium(Button);