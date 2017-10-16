import React, {Component} from 'react';
import $ from 'jquery';
import Radium from 'radium';
import Ragdoll from './ragdoll';
import Style from './Style';


class Ragdolls extends Component {

  constructor(props) {
    super(props);

    this.dancers    = [];
    this.ground     = 1;
    this.pointer    = {
      x: 0,
      y: 0
    };

    this.resize = this.resize.bind(this);

    this.run    = this.run.bind(this);

    this.state = {
      data: null
    };

    this.style = Style.getInstance();

    fetch('https://deliver.kenticocloud.com/f838c20b-6429-46dd-89aa-e14f3f5d83ed/items/deepend_technical_team')
      .then((response) => {
        return response.json()
      }).then((json) => {

      let data = [];
      for (let obj in json.modular_content) {
        data.push({
          firstname: json.modular_content[obj].elements.full_name.value.split(' ')[0],
          surname:   json.modular_content[obj].elements.full_name.value.split(' ')[1],
        })
      }

      this.setState({
        data: data
      });

      this.dataReady();
    }).catch((ex) => {
    })
  }

  dataReady() {
    this.ctx = this.canvas.getContext('2d');
    $(window).on('resize', this.resize);
    this.resize();

    // ---- instanciate ragdolls ----
    for (let i = 0; i < this.state.data.length; i++) {
      this.dancers.push(
        new Ragdoll(
          i * 360 / 7,
          80,
          4,
          (i + 2) * this.canvas.width / 9,
          this.canvas.height * this.ground - 340,
        )
      );
    }
    this.run();
  }

  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ground        = window.innerHeight > 500 ? 1 : 1;
    for (let i = 0; i < this.dancers.length; i++) {
      this.dancers[i].x = (i + 2) * window.innerWidth / 9;
    }
  }

  run() {
    requestAnimationFrame(this.run);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let dancer of this.dancers) {
      dancer.update(this.canvas.height * this.ground);
      dancer.draw(this.ctx);
    }
  };

  onMouseOver(index) {
    this.dancers[index].dragging = true;
  }

  onMouseOut(index) {
    this.dancers[index].dragging = false;
  }

  render() {
    return (
      <div>

        <div style={[this.style.container]}>
          <canvas ref={(el) => {
            this.canvas = el;
          }}/>

          <h1 style={this.style.title}>Lobster</h1>

          {this.state.data && <ul style={[this.style.teamlist]}>
            {this.state.data.map((params, index) => (
              <li key={index.toString()}
                  onMouseOver={this.onMouseOver.bind(this, index)}
                  onMouseOut={this.onMouseOut.bind(this, index)}
                  style={[this.style.teamlist.item]}>
                <span style={[this.style.teamlist.item.firstname]}>{params.firstname}</span>
                <br/>
                <span style={[this.style.teamlist.item.surname]}>{params.surname}</span>
                <div key={index.toString() + 'separator'} style={this.style.teamlist.separator}></div>
              </li>
            ))}
          </ul>}
        </div>

{/*        <div style={this.style.info}>
          <div style={this.style.info.curtain}/>
          <h1>Title</h1>
          <p>Description</p>
          <a href="#">Link</a>
        </div>*/}
      </div>


    )
  }
}
export default Radium(Ragdolls);
