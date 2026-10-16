// Recovered from vendors.js:1830382-1832529.
import * as Unidentified609 from "./Unidentified609.js";
import * as Unidentified662 from "./Unidentified662.js";
import * as N from "./N.js";
import * as Unidentified666 from "./Unidentified666.js";
import * as D2R from "./D2R.js";
let defaultExport;
function init() {
  Math.abs(this.lat1 + this.lat2) < D2R.EPSLN || (this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e3 = Math.sqrt(this.es), this.sin_po = Math.sin(this.lat1), this.cos_po = Math.cos(this.lat1), this.t1 = this.sin_po, this.con = this.sin_po, this.ms1 = (0, Unidentified609.default)(this.e3, this.sin_po, this.cos_po), this.qs1 = (0, Unidentified662.default)(this.e3, this.sin_po), this.sin_po = Math.sin(this.lat2), this.cos_po = Math.cos(this.lat2), this.t2 = this.sin_po, this.ms2 = (0, Unidentified609.default)(this.e3, this.sin_po, this.cos_po), this.qs2 = (0, Unidentified662.default)(this.e3, this.sin_po), this.sin_po = Math.sin(this.lat0), this.cos_po = Math.cos(this.lat0), this.t3 = this.sin_po, this.qs0 = (0, Unidentified662.default)(this.e3, this.sin_po), Math.abs(this.lat1 - this.lat2) > D2R.EPSLN ? this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1) : this.ns0 = this.con, this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1, this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0);
}
function forward(e) {
  var t = e.x,
    n = e.y;
  this.sin_phi = Math.sin(n), this.cos_phi = Math.cos(n);
  var r = (0, Unidentified662.default)(this.e3, this.sin_phi),
    s = this.a * Math.sqrt(this.c - this.ns0 * r) / this.ns0,
    o = this.ns0 * (0, N.default)(t - this.long0, this.over),
    c = s * Math.sin(o) + this.x0,
    l = this.rh - s * Math.cos(o) + this.y0;
  return e.x = c, e.y = l, e;
}
function inverse(e) {
  var t, n, r, i, s, o;
  return e.x -= this.x0, e.y = this.rh - e.y + this.y0, this.ns0 >= 0 ? (t = Math.sqrt(e.x * e.x + e.y * e.y), r = 1) : (t = -Math.sqrt(e.x * e.x + e.y * e.y), r = -1), i = 0, 0 !== t && (i = Math.atan2(r * e.x, r * e.y)), r = t * this.ns0 / this.a, this.sphere ? o = Math.asin((this.c - r * r) / (2 * this.ns0)) : (n = (this.c - r * r) / this.ns0, o = this.phi1z(this.e3, n)), s = (0, N.default)(i / this.ns0 + this.long0, this.over), e.x = s, e.y = o, e;
}
function phi1z(e, t) {
  var n,
    r,
    i,
    a,
    c = (0, Unidentified666.default)(.5 * t);
  if (e < D2R.EPSLN) return c;
  for (var l = e * e, u = 1; u <= 25; u++) if (c += a = .5 * (i = 1 - (r = e * (n = Math.sin(c))) * r) * i / Math.cos(c) * (t / (1 - l) - n / i + .5 / e * Math.log((1 - r) / (1 + r))), Math.abs(a) <= 1e-7) return c;
  return null;
}
var names = ["Albers_Conic_Equal_Area", "Albers_Equal_Area", "Albers", "aea"];
defaultExport = {
  init: init,
  forward: forward,
  inverse: inverse,
  names: names,
  phi1z: phi1z
};
export { forward };
export { init };
export { inverse };
export { names };
export { phi1z };
export { defaultExport as default };
