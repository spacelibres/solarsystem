// Recovered from vendors.js:1853383-1857852.
import * as D2R from "./D2R.js";
let defaultExport;
var i = {
    FRONT: 1,
    RIGHT: 2,
    BACK: 3,
    LEFT: 4,
    TOP: 5,
    BOTTOM: 6
  },
  a = {
    AREA_0: 1,
    AREA_1: 2,
    AREA_2: 3,
    AREA_3: 4
  };
function init() {
  this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Quadrilateralized Spherical Cube", this.lat0 >= D2R.HALF_PI - D2R.FORTPI / 2 ? this.face = i.TOP : this.lat0 <= -(D2R.HALF_PI - D2R.FORTPI / 2) ? this.face = i.BOTTOM : Math.abs(this.long0) <= D2R.FORTPI ? this.face = i.FRONT : Math.abs(this.long0) <= D2R.HALF_PI + D2R.FORTPI ? this.face = this.long0 > 0 ? i.RIGHT : i.LEFT : this.face = i.BACK, 0 !== this.es && (this.one_minus_f = 1 - (this.a - this.b) / this.a, this.one_minus_f_squared = this.one_minus_f * this.one_minus_f);
}
function forward(e) {
  var t,
    n,
    s,
    o,
    c,
    d,
    h = {
      x: 0,
      y: 0
    },
    p = {
      value: 0
    };
  if (e.x -= this.long0, t = 0 !== this.es ? Math.atan(this.one_minus_f_squared * Math.tan(e.y)) : e.y, n = e.x, this.face === i.TOP) o = D2R.HALF_PI - t, n >= D2R.FORTPI && n <= D2R.HALF_PI + D2R.FORTPI ? (p.value = a.AREA_0, s = n - D2R.HALF_PI) : n > D2R.HALF_PI + D2R.FORTPI || n <= -(D2R.HALF_PI + D2R.FORTPI) ? (p.value = a.AREA_1, s = n > 0 ? n - D2R.SPI : n + D2R.SPI) : n > -(D2R.HALF_PI + D2R.FORTPI) && n <= -D2R.FORTPI ? (p.value = a.AREA_2, s = n + D2R.HALF_PI) : (p.value = a.AREA_3, s = n);else if (this.face === i.BOTTOM) o = D2R.HALF_PI + t, n >= D2R.FORTPI && n <= D2R.HALF_PI + D2R.FORTPI ? (p.value = a.AREA_0, s = -n + D2R.HALF_PI) : n < D2R.FORTPI && n >= -D2R.FORTPI ? (p.value = a.AREA_1, s = -n) : n < -D2R.FORTPI && n >= -(D2R.HALF_PI + D2R.FORTPI) ? (p.value = a.AREA_2, s = -n - D2R.HALF_PI) : (p.value = a.AREA_3, s = n > 0 ? -n + D2R.SPI : -n - D2R.SPI);else {
    var f, m, M, _, A, g;
    this.face === i.RIGHT ? n = u(n, +D2R.HALF_PI) : this.face === i.BACK ? n = u(n, +D2R.SPI) : this.face === i.LEFT && (n = u(n, -D2R.HALF_PI)), _ = Math.sin(t), A = Math.cos(t), g = Math.sin(n), f = A * Math.cos(n), m = A * g, M = _, this.face === i.FRONT ? s = l(o = Math.acos(f), M, m, p) : this.face === i.RIGHT ? s = l(o = Math.acos(m), M, -f, p) : this.face === i.BACK ? s = l(o = Math.acos(-f), M, -m, p) : this.face === i.LEFT ? s = l(o = Math.acos(-m), M, f, p) : (o = s = 0, p.value = a.AREA_0);
  }
  return d = Math.atan(12 / D2R.SPI * (s + Math.acos(Math.sin(s) * Math.cos(D2R.FORTPI)) - D2R.HALF_PI)), c = Math.sqrt((1 - Math.cos(o)) / (Math.cos(d) * Math.cos(d)) / (1 - Math.cos(Math.atan(1 / Math.cos(s))))), p.value === a.AREA_1 ? d += D2R.HALF_PI : p.value === a.AREA_2 ? d += D2R.SPI : p.value === a.AREA_3 && (d += 1.5 * D2R.SPI), h.x = c * Math.cos(d), h.y = c * Math.sin(d), h.x = h.x * this.a + this.x0, h.y = h.y * this.a + this.y0, e.x = h.x, e.y = h.y, e;
}
function inverse(e) {
  var t,
    n,
    s,
    o,
    c,
    l,
    d,
    h,
    p,
    f,
    m,
    M,
    _ = {
      lam: 0,
      phi: 0
    },
    A = {
      value: 0
    };
  if (e.x = (e.x - this.x0) / this.a, e.y = (e.y - this.y0) / this.a, n = Math.atan(Math.sqrt(e.x * e.x + e.y * e.y)), t = Math.atan2(e.y, e.x), e.x >= 0 && e.x >= Math.abs(e.y) ? A.value = a.AREA_0 : e.y >= 0 && e.y >= Math.abs(e.x) ? (A.value = a.AREA_1, t -= D2R.HALF_PI) : e.x < 0 && -e.x >= Math.abs(e.y) ? (A.value = a.AREA_2, t = t < 0 ? t + D2R.SPI : t - D2R.SPI) : (A.value = a.AREA_3, t += D2R.HALF_PI), p = D2R.SPI / 12 * Math.tan(t), c = Math.sin(p) / (Math.cos(p) - 1 / Math.sqrt(2)), l = Math.atan(c), (d = 1 - (s = Math.cos(t)) * s * (o = Math.tan(n)) * o * (1 - Math.cos(Math.atan(1 / Math.cos(l))))) < -1 ? d = -1 : d > 1 && (d = 1), this.face === i.TOP) h = Math.acos(d), _.phi = D2R.HALF_PI - h, A.value === a.AREA_0 ? _.lam = l + D2R.HALF_PI : A.value === a.AREA_1 ? _.lam = l < 0 ? l + D2R.SPI : l - D2R.SPI : A.value === a.AREA_2 ? _.lam = l - D2R.HALF_PI : _.lam = l;else if (this.face === i.BOTTOM) h = Math.acos(d), _.phi = h - D2R.HALF_PI, A.value === a.AREA_0 ? _.lam = -l + D2R.HALF_PI : A.value === a.AREA_1 ? _.lam = -l : A.value === a.AREA_2 ? _.lam = -l - D2R.HALF_PI : _.lam = l < 0 ? -l - D2R.SPI : -l + D2R.SPI;else {
    var g, b, y;
    p = (g = d) * g, b = (p += (y = p >= 1 ? 0 : Math.sqrt(1 - p) * Math.sin(l)) * y) >= 1 ? 0 : Math.sqrt(1 - p), A.value === a.AREA_1 ? (p = b, b = -y, y = p) : A.value === a.AREA_2 ? (b = -b, y = -y) : A.value === a.AREA_3 && (p = b, b = y, y = -p), this.face === i.RIGHT ? (p = g, g = -b, b = p) : this.face === i.BACK ? (g = -g, b = -b) : this.face === i.LEFT && (p = g, g = b, b = -p), _.phi = Math.acos(-y) - D2R.HALF_PI, _.lam = Math.atan2(b, g), this.face === i.RIGHT ? _.lam = u(_.lam, -D2R.HALF_PI) : this.face === i.BACK ? _.lam = u(_.lam, -D2R.SPI) : this.face === i.LEFT && (_.lam = u(_.lam, +D2R.HALF_PI));
  }
  0 !== this.es && (f = _.phi < 0 ? 1 : 0, m = Math.tan(_.phi), M = this.b / Math.sqrt(m * m + this.one_minus_f_squared), _.phi = Math.atan(Math.sqrt(this.a * this.a - M * M) / (this.one_minus_f * M)), f && (_.phi = -_.phi));
  return _.lam += this.long0, e.x = _.lam, e.y = _.phi, e;
}
function l(e, t, n, i) {
  var s;
  return e < D2R.EPSLN ? (i.value = a.AREA_0, s = 0) : (s = Math.atan2(t, n), Math.abs(s) <= D2R.FORTPI ? i.value = a.AREA_0 : s > D2R.FORTPI && s <= D2R.HALF_PI + D2R.FORTPI ? (i.value = a.AREA_1, s -= D2R.HALF_PI) : s > D2R.HALF_PI + D2R.FORTPI || s <= -(D2R.HALF_PI + D2R.FORTPI) ? (i.value = a.AREA_2, s = s >= 0 ? s - D2R.SPI : s + D2R.SPI) : (i.value = a.AREA_3, s += D2R.HALF_PI)), s;
}
function u(e, t) {
  var n = e + t;
  return n < -D2R.SPI ? n += D2R.TWO_PI : n > +D2R.SPI && (n -= D2R.TWO_PI), n;
}
var names = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"];
defaultExport = {
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
};
export { forward };
export { init };
export { inverse };
export { names };
export { defaultExport as default };
