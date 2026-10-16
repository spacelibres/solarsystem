// Recovered from vendors.js:1866170-1867515.
import * as N from "./N.js";
import * as Unidentified662 from "./Unidentified662.js";
import * as Unidentified663 from "./Unidentified663.js";
import * as Unidentified664 from "./Unidentified664.js";
let defaultExport;
var o = 1.340264,
  c = -.081106,
  l = 893e-6,
  u = .003796,
  d = Math.sqrt(3) / 2;
function init() {
  this.long0 = void 0 !== this.long0 ? this.long0 : 0, this.x0 = void 0 !== this.x0 ? this.x0 : 0, this.y0 = void 0 !== this.y0 ? this.y0 : 0, 0 !== this.es && (this.apa = (0, Unidentified663.default)(this.es), this.qp = (0, Unidentified662.default)(this.e, 1), this.rqda = Math.sqrt(.5 * this.qp));
}
function forward(e) {
  var t = (0, N.default)(e.x - this.long0, this.over),
    n = e.y,
    a = Math.sin(n);
  0 !== this.es && (a = (0, Unidentified662.default)(this.e, a) / this.qp);
  var s = Math.asin(d * a),
    h = s * s,
    p = h * h * h;
  return e.x = t * Math.cos(s) / (d * (o + 3 * c * h + p * (7 * l + 9 * u * h))), e.y = s * (o + c * h + p * (l + u * h)), 0 !== this.es && (e.x *= this.rqda, e.y *= this.rqda), e.x = this.a * e.x + this.x0, e.y = this.a * e.y + this.y0, e;
}
function inverse(e) {
  e.x = (e.x - this.x0) / this.a, e.y = (e.y - this.y0) / this.a, 0 !== this.es && (e.x /= this.rqda, e.y /= this.rqda);
  var t,
    n,
    i,
    a,
    h = e.y;
  for (a = 0; a < 12 && (h -= i = (h * (o + c * (t = h * h) + (n = t * t * t) * (l + u * t)) - e.y) / (o + 3 * c * t + n * (7 * l + 9 * u * t)), !(Math.abs(i) < 1e-9)); ++a);
  return n = (t = h * h) * t * t, e.x = d * e.x * (o + 3 * c * t + n * (7 * l + 9 * u * t)) / Math.cos(h), e.y = Math.asin(Math.sin(h) / d), 0 !== this.es && (e.y = (0, Unidentified664.default)(e.y, this.apa)), e.x = (0, N.default)(e.x + this.long0, this.over), e;
}
var names = ["eqearth", "Equal Earth", "Equal_Earth"];
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
