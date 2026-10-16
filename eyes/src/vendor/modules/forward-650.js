// Recovered from vendors.js:1818455-1820513.
import * as Unidentified609 from "./Unidentified609.js";
import * as Unidentified612 from "./Unidentified612.js";
import * as Unidentified611 from "./Unidentified611.js";
import * as N from "./N.js";
import * as Unidentified613 from "./Unidentified613.js";
import * as D2R from "./D2R.js";
let defaultExport;
function init() {
  if (this.lat2 || (this.lat2 = this.lat1), this.k0 || (this.k0 = 1), this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, !(Math.abs(this.lat1 + this.lat2) < D2R.EPSLN)) {
    var e = this.b / this.a;
    this.e = Math.sqrt(1 - e * e);
    var ns = Math.sin(this.lat1),
      n = Math.cos(this.lat1),
      a = (0, Unidentified609.default)(this.e, ns, n),
      s = (0, Unidentified612.default)(this.e, this.lat1, ns),
      o = Math.sin(this.lat2),
      l = Math.cos(this.lat2),
      u = (0, Unidentified609.default)(this.e, o, l),
      d = (0, Unidentified612.default)(this.e, this.lat2, o),
      h = Math.abs(Math.abs(this.lat0) - D2R.HALF_PI) < D2R.EPSLN ? 0 : (0, Unidentified612.default)(this.e, this.lat0, Math.sin(this.lat0));
    Math.abs(this.lat1 - this.lat2) > D2R.EPSLN ? this.ns = Math.log(a / u) / Math.log(s / d) : this.ns = ns, isNaN(this.ns) && (this.ns = ns), this.f0 = a / (this.ns * Math.pow(s, this.ns)), this.rh = this.a * this.f0 * Math.pow(h, this.ns), this.title || (this.title = "Lambert Conformal Conic");
  }
}
function forward(e) {
  var t = e.x,
    n = e.y;
  Math.abs(2 * Math.abs(n) - Math.PI) <= D2R.EPSLN && (n = (0, Unidentified611.default)(n) * (D2R.HALF_PI - 2 * D2R.EPSLN));
  var r,
    o,
    l = Math.abs(Math.abs(n) - D2R.HALF_PI);
  if (l > D2R.EPSLN) r = (0, Unidentified612.default)(this.e, n, Math.sin(n)), o = this.a * this.f0 * Math.pow(r, this.ns);else {
    if ((l = n * this.ns) <= 0) return null;
    o = 0;
  }
  var u = this.ns * (0, N.default)(t - this.long0, this.over);
  return e.x = this.k0 * (o * Math.sin(u)) + this.x0, e.y = this.k0 * (this.rh - o * Math.cos(u)) + this.y0, e;
}
function inverse(e) {
  var t,
    n,
    r,
    i,
    a,
    l = (e.x - this.x0) / this.k0,
    u = this.rh - (e.y - this.y0) / this.k0;
  this.ns > 0 ? (t = Math.sqrt(l * l + u * u), n = 1) : (t = -Math.sqrt(l * l + u * u), n = -1);
  var d = 0;
  if (0 !== t && (d = Math.atan2(n * l, n * u)), 0 !== t || this.ns > 0) {
    if (n = 1 / this.ns, r = Math.pow(t / (this.a * this.f0), n), -9999 === (i = (0, Unidentified613.default)(this.e, r))) return null;
  } else i = -D2R.HALF_PI;
  return a = (0, N.default)(d / this.ns + this.long0, this.over), e.x = a, e.y = i, e;
}
var names = ["Lambert Tangential Conformal Conic Projection", "Lambert_Conformal_Conic", "Lambert_Conformal_Conic_1SP", "Lambert_Conformal_Conic_2SP", "lcc", "Lambert Conic Conformal (1SP)", "Lambert Conic Conformal (2SP)"];
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
