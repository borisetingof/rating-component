import React, {Component} from 'react';
import $ from 'jquery';


//https://gamedevelopment.tutsplus.com/tutorials/simulate-tearable-cloth-and-ragdolls-with-simple-verlet-integration--gamedev-519

class Ragdoll {
  constructor(color, light, size, x, y, struct, dancers, dancerDrag, pointDrag, pointer, canvas, ctx, ground) {
    this.x      = x;
    this.points = [];
    this.links  = [];
    this.frame  = 0;
    this.dir    = 1;
    this.size   = size;
    this.color  = Math.round(color);
    this.light  = light;

    this.dancers = dancers;
    this.dancerDrag = dancerDrag;
    this.pointDrag = pointDrag;
    this.pointer = pointer;
    this.struct = struct;
    this.canvas = canvas;
    this.ctx = ctx;
    this.ground = ground;

    // ---- create points ----
    for (const p of struct.points) {
      this.points.push(new Ragdoll.Point(size * p.x + x, size * p.y + y, p.f));
    }
    // ---- create links ----
    for (const link of struct.links) {
      const p0 = this.points[link.p0];
      const p1 = this.points[link.p1];
      const dx = p0.x - p1.x;
      const dy = p0.y - p1.y;
      this.links.push(
        new Ragdoll.Link(
          this,
          p0,
          p1,
          Math.sqrt(dx * dx + dy * dy),
          link.size * size / 3,
          link.lum,
          link.force,
          link.disk
        )
      );
    }
  }

  update() {
    if (++this.frame % 20 === 0) this.dir = -this.dir;
    if (
      this.dancerDrag &&
      this === this.dancerDrag &&
      this.size < 16 &&
      this.frame > 600
    ) {
      this.dancerDrag = null;
      this.dancers.push(
        new Ragdoll(
          this.color,
          this.light * 1.25,
          this.size * 2,
          this.pointer.x,
          this.pointer.y - 100 * this.size * 2,
          this.struct
        )
      );
      this.dancers.sort(function (d0, d1) {
        return d0.size - d1.size;
      });
    }
    // ---- update links ----
    for (const link of this.links) {
      const p0   = link.p0;
      const p1   = link.p1;
      const dx   = p0.x - p1.x;
      const dy   = p0.y - p1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist) {
        const tw = p0.w + p1.w;
        const r1 = p1.w / tw;
        const r0 = p0.w / tw;
        const dz = (link.distance - dist) * link.force;
        const sx = dx / dist * dz;
        const sy = dy / dist * dz;
        p1.x -= sx * r0;
        p1.y -= sy * r0;
        p0.x += sx * r1;
        p0.y += sy * r1;
      }
    }
    // ---- update points ----
    for (const point of this.points) {
      // ---- dragging ----
      if (this === this.dancerDrag && point === this.pointDrag) {
        point.x += (this.pointer.x - point.x) * 0.1;
        point.y += (this.pointer.y - point.y) * 0.1;
      }
      // ---- dance ----
      if (this !== this.dancerDrag) {
        point.fn && point.fn(16 * Math.sqrt(this.size), this.dir);
      }
      // ---- verlet integration ----
      point.vx = point.x - point.px;
      point.vy = point.y - point.py;
      point.px = point.x;
      point.py = point.y;
      point.vx *= 0.995;
      point.vy *= 0.995;
      point.x += point.vx;
      point.y += point.vy + 0.01;
    }
    // ---- ground ----
    for (const link of this.links) {
      const p1 = link.p1;
      if (p1.y > this.canvas.height * this.ground - link.size * 0.5) {
        p1.y  = this.canvas.height * this.ground - link.size * 0.5;
        p1.x -= p1.vx;
        p1.vx = 0;
        p1.vy = 0;
      }
    }
    // ---- center position ----
    const delta = (this.x - this.points[0].x) * 0.0002;
    this.points[9].x += delta;
    this.points[10].x += delta;
  }

  draw() {
    for (const link of this.links) {
      if (link.size) {
        const dx = link.p1.x - link.p0.x;
        const dy = link.p1.y - link.p0.y;
        const a  = Math.atan2(dy, dx);
        const d  = Math.sqrt(dx * dx + dy * dy);
/*
        // ---- shadow ----
        this.ctx.save();
        this.ctx.translate(link.p0.x + link.size * 0.25, link.p0.y + link.size * 0.25);
        this.ctx.rotate(a);
        this.ctx.drawImage(
          link.shadow,
          -link.size * 0.5,
          -link.size * 0.5,
          d + link.size,
          link.size
        );
        this.ctx.restore();
*/
        // ---- stroke ----
        this.ctx.save();
        this.ctx.translate(link.p0.x, link.p0.y);
        this.ctx.rotate(a);
        this.ctx.drawImage(
          link.image,
          -link.size * 0.5,
          -link.size * 0.5,
          d + link.size,
          link.size
        );
        this.ctx.restore();
      }
    }
  }
}

Ragdoll.Link = class Link {
  constructor(parent, p0, p1, dist, size, light, force, disk) {
    // ---- cache strokes ----
    function stroke(color, axis) {
      const image  = document.createElement("canvas");
      image.width  = dist + size;
      image.height = size;
      const ict    = image.getContext("2d");
      ict.beginPath();
      ict.lineCap     = "round";
      ict.lineWidth   = size;
      ict.strokeStyle = color;
      if (disk) {
        ict.arc(size * 0.5 + dist, size * 0.5, size * 0.5, 0, 2 * Math.PI);
        ict.fillStyle = color;
        ict.fill();
      } else {
        ict.moveTo(size * 0.5, size * 0.5);
        ict.lineTo(size * 0.5 + dist, size * 0.5);
        ict.stroke();
      }
      if (axis) {
        const s       = size / 10;
        // ict.fillStyle = "#000";
        // ict.fillRect(size * 0.5 - s, size * 0.5 - s, s * 2, s * 2);
        // ict.fillRect(size * 0.5 - s + dist, size * 0.5 - s, s * 2, s * 2);
      }
      return image;
    }

    this.p0       = p0;
    this.p1       = p1;
    this.distance = dist;
    this.size     = size;
    this.light    = light || 1.0;
    this.force    = force || 0.5;
    this.image    = stroke(
      "hsl(" + parent.color + " ,30%, " + parent.light * this.light + "%)",
      true
    );
    this.shadow   = stroke("rgba(0,0,0,0.5)");
  }
};

Ragdoll.Point = class Point {
  constructor(x, y, fn, w) {
    this.x  = x;
    this.y  = y;
    this.w  = w || 0.5;
    this.fn = fn || null;
    this.px = x;
    this.py = y;
    this.vx = 0.0;
    this.vy = 0.0;
  }
};











class Ragdolls extends Component {

  constructor(props){
    super(props);

    this.dancers = [];
    this.ground = 1;
    this.pointer = {};
    this.dancerDrag = null;
    this.pointDrag = null;

    this.resize = this.resize.bind(this);
    this.move = this.move.bind(this);
    this.down = this.down.bind(this);
    this.up = this.up.bind(this);
    this.run = this.run.bind(this);
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
    const struct = {
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
    for (let i = 0; i < 6; i++) {
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
    for (const dancer of this.dancers) {
      for (const point of dancer.points) {
        const dx = this.pointer.x - point.x;
        const dy = this.pointer.y - point.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
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
    for (const dancer of this.dancers) {
      dancer.update();
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
