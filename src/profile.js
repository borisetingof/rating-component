import React, {Component} from 'react';
import Radium from 'radium';
import $ from 'jquery';

import Style from './style';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.style = Style.getInstance();
  }

  render() {
    setTimeout(() => {
      $(this._avatar).html(
        $(this.props.config.img).css(this.style.profile.content.img)
      );
    }, 0);

    return (
      <div style={[
        this.style.profile,
        this.props.config && this.style.profile.visible]}>

        <div style={[
          this.style.profile.fill,
          this.props.config && this.style.profile.fill.visible]}/>

        <article style={[
          this.style.profile.content,
          this.props.config && this.style.profile.content.visible]}>

          {this.props.config && <div>
            <div onClick={this.props.onClose.bind(this)}
                 style={this.style.profile.close}>&#215;</div>

            <h1 style={this.style.profile.content.title}>
              {this.props.config.fullname}
            </h1>

            <div ref={(el) => {this._avatar = el}}
                 style={this.style.profile.content.avatar}/>

            <div dangerouslySetInnerHTML={{__html: this.props.config.bio}}
                 style={this.style.profile.content.bio}/>

            <a key='linkedinbtn'
               href={this.props.config.linkedin} target='_blank'
               style={this.style.profile.content.linkedin}>View on LinkedIn</a>

          </div>}
        </article>
      </div>
    )
  }
}

export default Radium(Profile);
