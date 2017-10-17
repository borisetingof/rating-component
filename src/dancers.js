import React, {Component} from 'react';
import $ from 'jquery';
import Radium from 'radium';
import PropTypes from 'prop-types';

import Ragdoll from './ragdoll';
import Style from './Style';

class Dancers extends Component {

  static defaultProps = {
    config: []
  };

  constructor(props) {
    super(props);

    this._dancers = [];
    this._style   = Style.getInstance();

    this._resize = this._resize.bind(this);
    this._run    = this._run.bind(this);
  }

  _resize() {
    this._canvas.width  = window.innerWidth;
    this._canvas.height = window.innerHeight;
    for (let i = 0; i < this._dancers.length; i++) {
      this._dancers[i].x = (i + 2) * window.innerWidth / 9;
    }
  }

  _run() {
    if (!this._unmount) {
      requestAnimationFrame(this._run);
    }
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    for (let dancer of this._dancers) {
      dancer.update(this._canvas.height);
      dancer.draw(this._ctx);
    }
  };

  componentDidMount() {
    $(window).on('resize', this._resize);
    this._resize();

    this._ctx = this._canvas.getContext('2d');
    for (let i = this.props.config.length; i--;) {
      this._dancers.push(
        new Ragdoll(
          i * 360 / 7,
          80,
          4,
          (i + 2) * this._canvas.width / 9,
          this._canvas.height - 340,
        )
      )
    }

    this._run();
  }

  componentWillUnmount() {
    this._unmount = true;
    $(window).off('resize', this._resize);
  }

  render() {
    for (let i = this._dancers.length; i--;) {
      this._dancers[i].dragging = i === this.props.active;
    }

    return (
      <canvas style={this._style.dancers} ref={(el) => {this._canvas = el}}/>
    )
  }
}

export default Radium(Dancers);