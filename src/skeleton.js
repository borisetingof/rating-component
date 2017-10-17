export default {
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
    {p0: 3, p1: 7, size: 12, color: '#ffffff'},
    {p0: 1, p1: 3, size: 24},

    //head
    {p0: 1, p1: 0, size: 60, color: '#ffffff', disk: 1},

    //leg
    {p0: 5, p1: 9, size: 16, color: '#ffffff'},
    {p0: 2, p1: 5, size: 32},

    //body
    {p0: 1, p1: 2, size: 50},

    //leg
    {p0: 6, p1: 10, size: 16, color: '#ffffff'},
    {p0: 2, p1: 6, size: 32},

    //arm
    {p0: 4, p1: 8, size: 12, color: '#ffffff'},
    {p0: 1, p1: 4, size: 24}
  ]
};
