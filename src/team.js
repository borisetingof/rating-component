import React, {Component} from 'react';
import Radium from 'radium';

import Dancers from './dancers';
import Profile from './profile';
import Navigation from './navigation';
import Style from './style';

class Team extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded:      false,
      data:        null,
      highlighted: null,
      active:      null,
    };

    this._style = Style.getInstance(this.props.skin);

    this._loadData()
      .then(() => {
        return this._loadImages();
      })
      .then(() => {
        this.setState({loaded: true});
      })
      .catch((ex) => {
        alert('Something went wrong1..')
      });
  }

  _loadData() {
    return fetch(this.props.url)
      .then((response) => {
        if(response.ok) {
          return response.json();
        }
      })
      .then((json) => {
        let obj,
            data    = [],
            resolve,
            promise = new Promise((res, rej) => {resolve = res});

        for (let key in json.modular_content) {
          obj = json.modular_content[key].elements;
          data.push({
            firstname: obj.full_name.value.split(' ')[0],
            surname:   obj.full_name.value.split(' ')[1],
            fullname:  obj.full_name.value,
            bio:       obj.bio.value,
            linkedin:  obj.linkedin.value,
            img_src:   obj.picture.value[0].url,
          });
        }

        this.setState({data: data}, resolve);

        return promise;
      })
  }

  _loadImages() {
    return Promise.all(this.state.data.map((params) => {
      return new Promise((resolve, reject) => {
        let img    = new Image();
        params.img = img;

        img.onload = () => {
          img.onload = null;
          resolve();
        };

        img.src = params.img_src;
      });
    }));
  }

  _onMouseOver(index) {
    this.setState({highlighted: index});
  }

  _onMouseOut() {
    this.setState({highlighted: null});
  }

  _onClick(index) {
    this.setState({active: index});
  }

  render() {
    return (
      <div>
          {this.state.loaded && <div style={[
            this._style.container
          ]}>
            <Dancers
              config={this.state.data}
              active={this.state.highlighted}/>

            <header style={this._style.header}>
              <h1 key='title' style={this._style.title}>Lobster</h1>
              <Navigation
                config={this.state.data}
                onMouseOver={this._onMouseOver.bind(this)}
                onMouseOut={this._onMouseOut.bind(this)}
                onClick={this._onClick.bind(this)}/>
            </header>

            <Profile
              config={this.state.active !== null && this.state.data[this.state.active]}
              onClose={this.setState.bind(this, {active: null}, null)}/>
          </div>}
      </div>
    )
  }
}

export default Radium(Team);
