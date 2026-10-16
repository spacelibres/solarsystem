// Recovered from vendors.js:1809310-1812826.
import * as D2R from "./D2R.js";
import * as Unidentified611 from "./Unidentified611.js";
import * as Unidentified609 from "./Unidentified609.js";
import * as Unidentified612 from "./Unidentified612.js";
import * as Unidentified613 from "./Unidentified613.js";
import * as N from "./N.js";
let defaultExport;
function ssfn_(e, t, n) {
  return t *= n, Math.tan(.5 * (D2R.HALF_PI + e)) * Math.pow((1 - t) / (1 + t), .5 * n);
}
function init() {
  this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.coslat0 = Math.cos(this.lat0), this.sinlat0 = Math.sin(this.lat0), this.sphere ? 1 === this.k0 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= D2R.EPSLN && (this.k0 = .5 * (1 + (0, Unidentified611.default)(this.lat0) * Math.sin(this.lat_ts))) : (Math.abs(this.coslat0) <= D2R.EPSLN && (this.lat0 > 0 ? this.con = 1 : this.con = -1), this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e)), 1 === this.k0 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= D2R.EPSLN && Math.abs(Math.cos(this.lat_ts)) > D2R.EPSLN && (this.k0 = .5 * this.cons * (0, Unidentified609.default)(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / (0, Unidentified612.default)(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts))), this.ms1 = (0, Unidentified609.default)(this.e, this.sinlat0, this.coslat0), this.X0 = 2 * Math.atan(ssfn_(this.lat0, this.sinlat0, this.e)) - D2R.HALF_PI, this.cosX0 = Math.cos(this.X0), this.sinX0 = Math.sin(this.X0));
}
function forward(e) {
  var t,
    n,
    i,
    a,
    o,
    u,
    d = e.x,
    h = e.y,
    p = Math.sin(h),
    f = Math.cos(h),
    m = (0, N.default)(d - this.long0, this.over);
  return Math.abs(Math.abs(d - this.long0) - Math.PI) <= D2R.EPSLN && Math.abs(h + this.lat0) <= D2R.EPSLN ? (e.x = NaN, e.y = NaN, e) : this.sphere ? (t = 2 * this.k0 / (1 + this.sinlat0 * p + this.coslat0 * f * Math.cos(m)), e.x = this.a * t * f * Math.sin(m) + this.x0, e.y = this.a * t * (this.coslat0 * p - this.sinlat0 * f * Math.cos(m)) + this.y0, e) : (n = 2 * Math.atan(ssfn_(h, p, this.e)) - D2R.HALF_PI, a = Math.cos(n), i = Math.sin(n), Math.abs(this.coslat0) <= D2R.EPSLN ? (o = (0, Unidentified612.default)(this.e, h * this.con, this.con * p), u = 2 * this.a * this.k0 * o / this.cons, e.x = this.x0 + u * Math.sin(d - this.long0), e.y = this.y0 - this.con * u * Math.cos(d - this.long0), e) : (Math.abs(this.sinlat0) < D2R.EPSLN ? (t = 2 * this.a * this.k0 / (1 + a * Math.cos(m)), e.y = t * i) : (t = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * i + this.cosX0 * a * Math.cos(m))), e.y = t * (this.cosX0 * i - this.sinX0 * a * Math.cos(m)) + this.y0), e.x = t * a * Math.sin(m) + this.x0, e));
}
function inverse(e) {
  var t, n, i, a, s;
  e.x -= this.x0, e.y -= this.y0;
  var l = Math.sqrt(e.x * e.x + e.y * e.y);
  if (this.sphere) {
    var u = 2 * Math.atan(l / (2 * this.a * this.k0));
    return t = this.long0, n = this.lat0, l <= D2R.EPSLN ? (e.x = t, e.y = n, e) : (n = Math.asin(Math.cos(u) * this.sinlat0 + e.y * Math.sin(u) * this.coslat0 / l), t = Math.abs(this.coslat0) < D2R.EPSLN ? this.lat0 > 0 ? (0, N.default)(this.long0 + Math.atan2(e.x, -1 * e.y), this.over) : (0, N.default)(this.long0 + Math.atan2(e.x, e.y), this.over) : (0, N.default)(this.long0 + Math.atan2(e.x * Math.sin(u), l * this.coslat0 * Math.cos(u) - e.y * this.sinlat0 * Math.sin(u)), this.over), e.x = t, e.y = n, e);
  }
  if (Math.abs(this.coslat0) <= D2R.EPSLN) {
    if (l <= D2R.EPSLN) return n = this.lat0, t = this.long0, e.x = t, e.y = n, e;
    e.x *= this.con, e.y *= this.con, i = l * this.cons / (2 * this.a * this.k0), n = this.con * (0, Unidentified613.default)(this.e, i), t = this.con * (0, N.default)(this.con * this.long0 + Math.atan2(e.x, -1 * e.y), this.over);
  } else a = 2 * Math.atan(l * this.cosX0 / (2 * this.a * this.k0 * this.ms1)), t = this.long0, l <= D2R.EPSLN ? s = this.X0 : (s = Math.asin(Math.cos(a) * this.sinX0 + e.y * Math.sin(a) * this.cosX0 / l), t = (0, N.default)(this.long0 + Math.atan2(e.x * Math.sin(a), l * this.cosX0 * Math.cos(a) - e.y * this.sinX0 * Math.sin(a)), this.over)), n = -1 * (0, Unidentified613.default)(this.e, Math.tan(.5 * (D2R.HALF_PI + s)));
  return e.x = t, e.y = n, e;
}
var names = ["stere", "Stereographic_South_Pole", "Polar_Stereographic_variant_A", "Polar_Stereographic_variant_B", "Polar_Stereographic"];
defaultExport = {
  init: init,
  forward: forward,
  inverse: inverse,
  names: names,
  ssfn_: ssfn_
};
export { forward };
export { init };
export { inverse };
export { names };
export { ssfn_ };
export { defaultExport as default };
