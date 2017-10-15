import React, {Component} from 'react';
import $ from 'jquery';
import Ragdoll from './ragdoll';


class Ragdolls extends Component {

  constructor(props){
    super(props);

    this.dancers = [];
    this.ground = 1;
    this.pointer = {
      x: 0,
      y: 0
    };
    this.dancerDrag = null;
    this.pointDrag = null;

    this.resize = this.resize.bind(this);
    this.move = this.move.bind(this);
    this.down = this.down.bind(this);
    this.up = this.up.bind(this);
    this.run = this.run.bind(this);



    fetch('https://deliver.kenticocloud.com/f838c20b-6429-46dd-89aa-e14f3f5d83ed/items/deepend_technical_team')
      .then(function(response) {
        return response.json()
      }).then(function(json) {
      console.log('parsed json', json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');

    $(window)
      .on('resize', this.resize)
      .on('mousemove touchmove', this.move)
      .on('mousedown touchstart', this.down)
      .on('mouseup touchend', this.up);

    this.resize();

    // ---- ragdoll structure ----
    let struct = {
      points: [
        {
          x: 0,
          y: -4,
          f(s, d) {
            this.y -= 0.01 * s;
          }
        },
        {
          x: 0,
          y: -16,
          f(s, d) {
            this.y -= 0.02 * s * d;
          }
        },
        {
          x: 0,
          y: 12,
          f(s, d) {
            this.y += 0.02 * s * d;
          }
        },
        {x: -12, y: 0},
        {x: 12, y: 0},
        {
          x: -3,
          y: 34,
          f(s, d) {
            if (d > 0) {
              this.x += 0.01 * s;
              this.y -= 0.015 * s;
            } else {
              this.y += 0.02 * s;
            }
          }
        },
        {
          x: 3,
          y: 34,
          f(s, d) {
            if (d > 0) {
              this.y += 0.02 * s;
            } else {
              this.x -= 0.01 * s;
              this.y -= 0.015 * s;
            }
          }
        },
        {
          x: -28,
          y: 0,
          f(s, d) {
            this.x += this.vx * 0.035;
            this.y -= 0.001 * s;
          }
        },
        {
          x: 28,
          y: 0,
          f(s, d) {
            this.x += this.vx * 0.035;
            this.y -= 0.001 * s;
          }
        },
        {
          x: -3,
          y: 64,
          f(s, d) {
            this.y += 0.015 * s;
            if (d > 0) {
              this.y -= 0.01 * s;
            } else {
              this.y += 0.05 * s;
            }
          }
        },
        {
          x: 3,
          y: 64,
          f(s, d) {
            this.y += 0.015 * s;
            if (d > 0) {
              this.y += 0.05 * s;
            } else {
              this.y -= 0.01 * s;
            }
          }
        }
      ],
      links:  [
        //arm
        {p0: 3, p1: 7, size: 12, lum: 0.5},
        {p0: 1, p1: 3, size: 24, lum: 0.5},

        //head
        {p0: 1, p1: 0, size: 60, lum: 0.5, disk: 1},

        //leg
        {p0: 5, p1: 9, size: 16, lum: 0.5},
        {p0: 2, p1: 5, size: 32, lum: 0.5},

        //body
        {p0: 1, p1: 2, size: 50, lum: 1},

        //leg
        {p0: 6, p1: 10, size: 16, lum: 1.5},
        {p0: 2, p1: 6, size: 32, lum: 1.5},

        //arm
        {p0: 4, p1: 8, size: 12, lum: 1.5},
        {p0: 1, p1: 4, size: 24, lum: 1.5}
      ]
    };
    // ---- instanciate ragdolls ----
    for (let i = 0; i < 1; i++) {
      this.dancers.push(
        new Ragdoll(
          i * 360 / 7,
          80,
          4,
          (i + 2) * this.canvas.width / 9,
          this.canvas.height * this.ground - 340,
          struct,
          this.dancers,
          this.dancerDrag,
          this.pointDrag,
          this.pointer,
          this.canvas,
          this.ctx,
          this.ground
        )
      );
    }
    this.run();

  }

  move(e) {
    let touchMode = e.targetTouches,
        pointer   = touchMode ? touchMode[0] : e;

    this.pointer.x = pointer.clientX;
    this.pointer.y = pointer.clientY;

  }

  down(e){
    this.move(e);
    for (let dancer of this.dancers) {
      for (let point of dancer.points) {
        let dx = this.pointer.x - point.x;
        let dy = this.pointer.y - point.y;
        let d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 60) {
          this.dancerDrag   = dancer;
          this.pointDrag    = point;
          dancer.frame = 0;
        }
      }
    }
  }

  up(){
    this.dancerDrag = null;
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ground = window.innerHeight > 500 ? 1 : 1;
    for (let i = 0; i < this.dancers.length; i++) {
      this.dancers[i].x = (i + 2) * window.innerWidth / 9;
    }
  }

  run() {
    requestAnimationFrame(this.run);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    /*
        this.ctx.fillStyle = "#222";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 0.15);
        this.ctx.fillRect(0, this.canvas.height * 0.85, this.canvas.width, this.canvas.height * 0.15);
    */
    for (let dancer of this.dancers) {
      dancer.update(false);
      dancer.draw();
    }
  };

  render() {
    return (
      <canvas ref={(el) => {
        this.canvas = el;
      }}/>
    )
  }
}
export default Ragdolls;
