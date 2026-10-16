// Recovered from vendors.js:1808183-1809187.
import * as Unidentified646 from "./Unidentified646.js";
import * as D2R from "./D2R.js";
let defaultExport;
var a = 20;
function init() {
  var e = Math.sin(this.lat0),
    t = Math.cos(this.lat0);
  t *= t, this.rc = Math.sqrt(1 - this.es) / (1 - this.es * e * e), this.C = Math.sqrt(1 + this.es * t * t / (1 - this.es)), this.phic0 = Math.asin(e / this.C), this.ratexp = .5 * this.C * this.e, this.K = Math.tan(.5 * this.phic0 + D2R.FORTPI) / (Math.pow(Math.tan(.5 * this.lat0 + D2R.FORTPI), this.C) * (0, Unidentified646.default)(this.e * e, this.ratexp));
}
function forward(e) {
  var t = e.x,
    n = e.y;
  return e.y = 2 * Math.atan(this.K * Math.pow(Math.tan(.5 * n + D2R.FORTPI), this.C) * (0, Unidentified646.default)(this.e * Math.sin(n), this.ratexp)) - D2R.HALF_PI, e.x = this.C * t, e;
}
function inverse(e) {
  for (var t = e.x / this.C, n = e.y, s = Math.pow(Math.tan(.5 * n + D2R.FORTPI) / this.K, 1 / this.C), o = a; o > 0 && (n = 2 * Math.atan(s * (0, Unidentified646.default)(this.e * Math.sin(e.y), -.5 * this.e)) - D2R.HALF_PI, !(Math.abs(n - e.y) < 1e-14)); --o) e.y = n;
  return o ? (e.x = t, e.y = n, e) : null;
}
var names = ["gauss"];
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
