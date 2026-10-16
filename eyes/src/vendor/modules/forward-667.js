// Recovered from vendors.js:1832667-1833822.
import * as N from "./N.js";
import * as Unidentified666 from "./Unidentified666.js";
import * as D2R from "./D2R.js";
let defaultExport;
function init() {
  this.sin_p14 = Math.sin(this.lat0), this.cos_p14 = Math.cos(this.lat0), this.infinity_dist = 1e3 * this.a, this.rc = 1;
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
  return i = (0, N.default)(u - this.long0, this.over), t = Math.sin(d), n = Math.cos(d), s = Math.cos(i), (o = this.sin_p14 * t + this.cos_p14 * n * s) > 0 || Math.abs(o) <= D2R.EPSLN ? (c = this.x0 + 1 * this.a * n * Math.sin(i) / o, l = this.y0 + 1 * this.a * (this.cos_p14 * t - this.sin_p14 * n * s) / o) : (c = this.x0 + this.infinity_dist * n * Math.sin(i), l = this.y0 + this.infinity_dist * (this.cos_p14 * t - this.sin_p14 * n * s)), e.x = c, e.y = l, e;
}
function inverse(e) {
  var t, n, a, s, o, c;
  return e.x = (e.x - this.x0) / this.a, e.y = (e.y - this.y0) / this.a, e.x /= this.k0, e.y /= this.k0, (t = Math.sqrt(e.x * e.x + e.y * e.y)) ? (s = Math.atan2(t, this.rc), n = Math.sin(s), a = Math.cos(s), c = (0, Unidentified666.default)(a * this.sin_p14 + e.y * n * this.cos_p14 / t), o = Math.atan2(e.x * n, t * this.cos_p14 * a - e.y * this.sin_p14 * n), o = (0, N.default)(this.long0 + o, this.over)) : (c = this.phic0, o = 0), e.x = o, e.y = c, e;
}
var names = ["gnom"];
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
