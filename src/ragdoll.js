// import fetch from 'whatwg-fetch';


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

    // this.dancers = dancers;
    // this.dancerDrag = dancerDrag;
    // this.pointDrag = pointDrag;
    // this.pointer = pointer;

    // this.struct = struct;
    this.canvas = canvas;
    this.ctx = ctx;

    this.ground = ground;

    // ---- create points ----
    for (let p of struct.points) {
      this.points.push(new Ragdoll.Point(size * p.x + x, size * p.y + y, p.f));
    }
    // ---- create links ----
    for (let link of struct.links) {
      let p0 = this.points[link.p0];
      let p1 = this.points[link.p1];
      let dx = p0.x - p1.x;
      let dy = p0.y - p1.y;
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

  update(dragging) {
    if (++this.frame % 20 === 0) this.dir = -this.dir;
/*    if (
      this.dancerDrag &&
      this === this.dancerDrag &&
      this.size < 16 &&
      this.frame > 600
    ) {
      this.dancerDrag = null;
      this.dancers.push(
        new  Ragdoll(
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
    }*/
    // ---- update links ----
    for (let link of this.links) {
      let dx   = link.p0.x - link.p1.x,
          dy   = link.p0.y - link.p1.y,
          dist = Math.sqrt(dx * dx + dy * dy),
          tw, r1, r0, dz, sx, sy;

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
    // ---- update points ----
    for (let point of this.points) {

/*      // ---- dragging ----
      if (this === this.dancerDrag && point === this.pointDrag) {
        point.x += (this.pointer.x - point.x) * 0.1;
        point.y += (this.pointer.y - point.y) * 0.1;
      }

      // ---- dance ----
      if (this !== this.dancerDrag) {
        point.fn && point.fn(16 * Math.sqrt(this.size), this.dir);
      }*/

      // ---- dragging ----
      if (dragging) {
        // point.x += (this.pointer.x - point.x) * 0.1;
        // point.y += (this.pointer.y - point.y) * 0.1;
      }

      // ---- dance ----
      else {
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
    for (let link of this.links) {
      let p1 = link.p1;
      if (p1.y > this.canvas.height * this.ground - link.size * 0.5) {
        p1.y  = this.canvas.height * this.ground - link.size * 0.5;
        p1.x -= p1.vx;
        p1.vx = 0;
        p1.vy = 0;
      }
    }
    // ---- center position ----
    let delta = (this.x - this.points[0].x) * 0.0002;
    this.points[9].x += delta;
    this.points[10].x += delta;
  }

  draw() {
    for (let link of this.links) {
      if (link.size) {
        let dx = link.p1.x - link.p0.x;
        let dy = link.p1.y - link.p0.y;
        let a  = Math.atan2(dy, dx);
        let d  = Math.sqrt(dx * dx + dy * dy);
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
      let image  = document.createElement("canvas");
      image.width  = dist + size;
      image.height = size;
      let ict    = image.getContext("2d");
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
        // let s       = size / 10;
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

export default Ragdoll;
