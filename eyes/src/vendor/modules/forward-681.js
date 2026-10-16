// Recovered from vendors.js:1852195-1853382.
import * as N from "./N.js";
import * as Unidentified666 from "./Unidentified666.js";
import * as D2R from "./D2R.js";
let defaultExport;
function init() {
  this.sin_p14 = Math.sin(this.lat0 || 0), this.cos_p14 = Math.cos(this.lat0 || 0);
}
function forward(e) {
  var t,
    n,
    i,
    s,
    o,
    c,
    l,
    u = e.x,
    d = e.y;
  return i = (0, N.default)(u - (this.long0 || 0), this.over), t = Math.sin(d), n = Math.cos(d), s = Math.cos(i), ((o = this.sin_p14 * t + this.cos_p14 * n * s) > 0 || Math.abs(o) <= D2R.EPSLN) && (c = 1 * this.a * n * Math.sin(i), l = (this.y0 || 0) + 1 * this.a * (this.cos_p14 * t - this.sin_p14 * n * s)), e.x = c, e.y = l, e;
}
function inverse(e) {
  var t, n, s, o, c, l, u, d, h;
  return e.x -= this.x0 || 0, e.y -= this.y0 || 0, t = Math.sqrt(e.x * e.x + e.y * e.y), n = (0, Unidentified666.default)(t / this.a), s = Math.sin(n), o = Math.cos(n), d = this.long0 || 0, h = this.lat0 || 0, l = d, Math.abs(t) <= D2R.EPSLN ? (u = h, e.x = l, e.y = u, e) : (u = (0, Unidentified666.default)(o * this.sin_p14 + e.y * s * this.cos_p14 / t), c = Math.abs(h) - D2R.HALF_PI, Math.abs(c) <= D2R.EPSLN ? (l = h >= 0 ? (0, N.default)(d + Math.atan2(e.x, -e.y), this.over) : (0, N.default)(d - Math.atan2(-e.x, e.y), this.over), e.x = l, e.y = u, e) : (l = (0, N.default)(d + Math.atan2(e.x * s, t * this.cos_p14 * o - e.y * this.sin_p14 * s), this.over), e.x = l, e.y = u, e));
}
var names = ["ortho"];
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
