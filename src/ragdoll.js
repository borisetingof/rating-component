//https://gamedevelopment.tutsplus.com/tutorials/simulate-tearable-cloth-and-ragdolls-with-simple-verlet-integration--gamedev-519

import Skeleton from './skeleton';

class Ragdoll {
  constructor(color, size, x, y) {
    this.x     = x;
    this.y     = y;
    this.color = color;
    this.size  = size;

    this.frame = 0;
    this.dir   = 1;
    this.dragging = false;

    this._setPoints();
    this._setLinks();
  }

  update(floor) {
    this.dir = ++this.frame % 20 === 0 ? -this.dir : this.dir;

    this._updateLinks();
    this._updatePoints(floor);
    this._updateFloor(floor);
    this._updateCenter();
  }

  draw(ctx) {
    let dx, dy, a, d;
    for (let link of this.links) {
      dx = link.p1.x - link.p0.x;
      dy = link.p1.y - link.p0.y;
      a  = Math.atan2(dy, dx);
      d  = Math.sqrt(dx * dx + dy * dy);

      ctx.save();
      ctx.translate(link.p0.x, link.p0.y);
      ctx.rotate(a);
      ctx.drawImage(
        link.image,
        -link.size * 0.5,
        -link.size * 0.5,
        d + link.size,
        link.size
      );
      ctx.restore();
    }
  }

  _setPoints() {
    this.points = [];
    for (let p of Skeleton.points) {
      this.points.push(
        {
          x:  this.size * p.x + this.x,
          y:  this.size * p.y + this.y,
          px: this.size * p.x + this.x,
          py: this.size * p.y + this.y,
          vx: 0.0,
          vy: 0.0,
          w:  0.5,
          fn: p.f,
        }
      )
    }
  }

  _setLinks() {
    this.links = [];
    for (let link of Skeleton.links) {
      let p0       = this.points[link.p0],
          p1       = this.points[link.p1],
          dx       = p0.x - p1.x,
          dy       = p0.y - p1.y,
          color    = link.color,
          size     = link.size * this.size / 3,
          force    = link.force || 0.5,
          disk     = link.disk,
          distance = Math.sqrt(dx * dx + dy * dy),
          stroke   = (color) => {
            let image = document.createElement("canvas"),
                ctx   = image.getContext("2d");

            image.width  = distance + size;
            image.height = size;

            ctx.beginPath();
            ctx.lineCap     = "round";
            ctx.lineWidth   = size;
            ctx.strokeStyle = color;

            if (disk) {
              ctx.arc(size * 0.5 + distance, size * 0.5, size * 0.5, 0, 2 * Math.PI);
              ctx.fillStyle = color;
              ctx.fill();
            }
            else {
              ctx.moveTo(size * 0.5, size * 0.5);
              ctx.lineTo(size * 0.5 + distance, size * 0.5);
              ctx.stroke();
            }
            return image;
          };


      this.links.push(
        {
          p0:       p0,
          p1:       p1,
          distance: distance,
          size:     size,
          color:    color,
          force:    force,
          image:    stroke(color || this.color),
          shadow:   stroke("rgba(0,0,0,0.5)"),
        }
      );
    }
  }

  _updateLinks() {
    let dx, dy, dist, tw, r1, r0, dz, sx, sy;

    for (let link of this.links) {
      dx   = link.p0.x - link.p1.x;
      dy   = link.p0.y - link.p1.y;
      dist = Math.sqrt(dx * dx + dy * dy);

      if (dist) {
        tw = link.p0.w + link.p1.w;
        r1 = link.p1.w / tw;
        r0 = link.p0.w / tw;
        dz = (link.distance - dist) * link.force;
        sx = dx / dist * dz;
        sy = dy / dist * dz;

        link.p1.x -= sx * r0;
        link.p1.y -= sy * r0;
        link.p0.x += sx * r1;
        link.p0.y += sy * r1;
      }
    }
  }

  _updatePoints(floor) {
    for (let point of this.points) {

      if (this.dragging && point === this.points[0]) {
        point.y += (floor * 0.5 - point.y) * 0.1;
      }

      if(!this.dragging) {
        point.fn && point.fn(16 * Math.sqrt(this.size), this.dir);
      }

      point.vx = point.x - point.px;
      point.vy = point.y - point.py;
      point.px = point.x;
      point.py = point.y;
      point.vx *= 0.995;
      point.vy *= 0.995;
      point.x += point.vx;
      point.y += point.vy + 0.01;
    }
  }

  _updateFloor(floor) {
    for (let link of this.links) {
      if (link.p1.y > floor - link.size * 0.5) {
        link.p1.y  = floor - link.size * 0.5;
        link.p1.x -= link.p1.vx;
        link.p1.vx = 0;
        link.p1.vy = 0;
      }
    }
  }

  _updateCenter() {
    let delta = (this.x - this.points[0].x) * 0.0002;
    this.points[this.points.length - 2].x += delta;
    this.points[this.points.length - 1].x += delta;
  }

}

export default Ragdoll;
