// Recovered from vendors.js:1836062-1838306.
import * as Unidentified654 from "./Unidentified654.js";
import * as Unidentified655 from "./Unidentified655.js";
import * as Unidentified656 from "./Unidentified656.js";
import * as Unidentified657 from "./Unidentified657.js";
import * as N from "./N.js";
import * as Unidentified659 from "./Unidentified659.js";
import * as Unidentified653 from "./Unidentified653.js";
import * as D2R from "./D2R.js";
import * as Unidentified658 from "./Unidentified658.js";
let defaultExport;
var h = 20;
function init() {
  this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = (0, Unidentified654.default)(this.es), this.e1 = (0, Unidentified655.default)(this.es), this.e2 = (0, Unidentified656.default)(this.es), this.e3 = (0, Unidentified657.default)(this.es), this.ml0 = this.a * (0, Unidentified653.default)(this.e0, this.e1, this.e2, this.e3, this.lat0);
}
function forward(e) {
  var t,
    n,
    r,
    i = e.x,
    a = e.y,
    s = (0, N.default)(i - this.long0, this.over);
  if (r = s * Math.sin(a), this.sphere) Math.abs(a) <= D2R.EPSLN ? (t = this.a * s, n = -1 * this.a * this.lat0) : (t = this.a * Math.sin(r) / Math.tan(a), n = this.a * ((0, Unidentified659.default)(a - this.lat0) + (1 - Math.cos(r)) / Math.tan(a)));else if (Math.abs(a) <= D2R.EPSLN) t = this.a * s, n = -1 * this.ml0;else {
    var h = (0, Unidentified658.default)(this.a, this.e, Math.sin(a)) / Math.tan(a);
    t = h * Math.sin(r), n = this.a * (0, Unidentified653.default)(this.e0, this.e1, this.e2, this.e3, a) - this.ml0 + h * (1 - Math.cos(r));
  }
  return e.x = t + this.x0, e.y = n + this.y0, e;
}
function inverse(e) {
  var t, n, r, i, a, s, c, d, p;
  if (r = e.x - this.x0, i = e.y - this.y0, this.sphere) {
    if (Math.abs(i + this.a * this.lat0) <= D2R.EPSLN) t = (0, N.default)(r / this.a + this.long0, this.over), n = 0;else {
      var f;
      for (s = this.lat0 + i / this.a, c = r * r / this.a / this.a + s * s, d = s, a = h; a; --a) if (d += p = -1 * (s * (d * (f = Math.tan(d)) + 1) - d - .5 * (d * d + c) * f) / ((d - s) / f - 1), Math.abs(p) <= D2R.EPSLN) {
        n = d;
        break;
      }
      t = (0, N.default)(this.long0 + Math.asin(r * Math.tan(d) / this.a) / Math.sin(n), this.over);
    }
  } else if (Math.abs(i + this.ml0) <= D2R.EPSLN) n = 0, t = (0, N.default)(this.long0 + r / this.a, this.over);else {
    var m, M, _, A, g;
    for (s = (this.ml0 + i) / this.a, c = r * r / this.a / this.a + s * s, d = s, a = h; a; --a) if (g = this.e * Math.sin(d), m = Math.sqrt(1 - g * g) * Math.tan(d), M = this.a * (0, Unidentified653.default)(this.e0, this.e1, this.e2, this.e3, d), _ = this.e0 - 2 * this.e1 * Math.cos(2 * d) + 4 * this.e2 * Math.cos(4 * d) - 6 * this.e3 * Math.cos(6 * d), d -= p = (s * (m * (A = M / this.a) + 1) - A - .5 * m * (A * A + c)) / (this.es * Math.sin(2 * d) * (A * A + c - 2 * s * A) / (4 * m) + (s - A) * (m * _ - 2 / Math.sin(2 * d)) - _), Math.abs(p) <= D2R.EPSLN) {
      n = d;
      break;
    }
    m = Math.sqrt(1 - this.es * Math.pow(Math.sin(n), 2)) * Math.tan(n), t = (0, N.default)(this.long0 + Math.asin(r * m / this.a) / Math.sin(n), this.over);
  }
  return e.x = t, e.y = n, e;
}
var names = ["Polyconic", "American_Polyconic", "poly"];
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
