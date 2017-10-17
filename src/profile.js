import React, {Component} from 'react';
import Radium from 'radium';
import $ from 'jquery';

import Style from './Style';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.style = Style.getInstance();
  }

  render() {
    setTimeout(()=>{
      $(this._avatar).html(
        $(this.props.config.img).css(this.style.profile.content.img)
      );
    }, 0);

    return (
      <div style={[this.style.profile, this.props.config && this.style.profile.visible]}>

        <div style={[this.style.profile.fill, this.props.config && this.style.profile.fill.visible]}/>

        <div style={[this.style.profile.content, this.props.config && this.style.profile.content.visible]}>
          {this.props.config && <div>
            <div style={this.style.profile.close} onClick={this.props.onClose.bind(this)}>&#215;</div>
            <h1 style={this.style.profile.content.title}>{this.props.config.fullname}</h1>
            <div style={this.style.profile.content.avatar} ref={(el) => {this._avatar = el}} />
            <div style={this.style.profile.content.bio} dangerouslySetInnerHTML={{__html: this.props.config.bio}}/>
            <a key='linkedinbtn' style={this.style.profile.content.linkedin} href={this.props.config.linkedin} target='_blank'>View on LinkedIn</a>
          </div>}
        </div>

      </div>
    )
  }
}

export default Radium(Profile);