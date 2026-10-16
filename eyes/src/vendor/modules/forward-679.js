// Recovered from vendors.js:1847702-1850648.
import * as N from "./N.js";
import * as D2R from "./D2R.js";
import * as Unidentified653 from "./Unidentified653.js";
import * as Unidentified654 from "./Unidentified654.js";
import * as Unidentified655 from "./Unidentified655.js";
import * as Unidentified656 from "./Unidentified656.js";
import * as Unidentified657 from "./Unidentified657.js";
import * as Unidentified666 from "./Unidentified666.js";
import * as Unidentified660 from "./Unidentified660.js";
import * as vincentyDirect from "./vincentyDirect.js";
let defaultExport;
function init() {
  this.sin_p12 = Math.sin(this.lat0), this.cos_p12 = Math.cos(this.lat0), this.f = this.es / (1 + Math.sqrt(1 - this.es));
}
function forward(e) {
  var t,
    n,
    u,
    d,
    p,
    f,
    m,
    M,
    _,
    A,
    g,
    b = e.x,
    y = e.y,
    L = Math.sin(e.y),
    v = Math.cos(e.y),
    T = (0, N.default)(b - this.long0, this.over);
  return this.sphere ? Math.abs(this.sin_p12 - 1) <= D2R.EPSLN ? (e.x = this.x0 + this.a * (D2R.HALF_PI - y) * Math.sin(T), e.y = this.y0 - this.a * (D2R.HALF_PI - y) * Math.cos(T), e) : Math.abs(this.sin_p12 + 1) <= D2R.EPSLN ? (e.x = this.x0 + this.a * (D2R.HALF_PI + y) * Math.sin(T), e.y = this.y0 + this.a * (D2R.HALF_PI + y) * Math.cos(T), e) : (_ = this.sin_p12 * L + this.cos_p12 * v * Math.cos(T), M = (m = Math.acos(_)) ? m / Math.sin(m) : 1, e.x = this.x0 + this.a * M * v * Math.sin(T), e.y = this.y0 + this.a * M * (this.cos_p12 * L - this.sin_p12 * v * Math.cos(T)), e) : (t = (0, Unidentified654.default)(this.es), n = (0, Unidentified655.default)(this.es), u = (0, Unidentified656.default)(this.es), d = (0, Unidentified657.default)(this.es), Math.abs(this.sin_p12 - 1) <= D2R.EPSLN ? (p = this.a * (0, Unidentified653.default)(t, n, u, d, D2R.HALF_PI), f = this.a * (0, Unidentified653.default)(t, n, u, d, y), e.x = this.x0 + (p - f) * Math.sin(T), e.y = this.y0 - (p - f) * Math.cos(T), e) : Math.abs(this.sin_p12 + 1) <= D2R.EPSLN ? (p = this.a * (0, Unidentified653.default)(t, n, u, d, D2R.HALF_PI), f = this.a * (0, Unidentified653.default)(t, n, u, d, y), e.x = this.x0 + (p + f) * Math.sin(T), e.y = this.y0 + (p + f) * Math.cos(T), e) : Math.abs(b) < D2R.EPSLN && Math.abs(y - this.lat0) < D2R.EPSLN ? (e.x = e.y = 0, e) : (g = (A = (0, vincentyDirect.vincentyInverse)(this.lat0, this.long0, y, b, this.a, this.f)).azi1, e.x = A.s12 * Math.sin(g), e.y = A.s12 * Math.cos(g), e));
}
function inverse(e) {
  var t, n, p, f, m, M, _, A, g, b, y, L, v, T, S, w;
  if (e.x -= this.x0, e.y -= this.y0, this.sphere) {
    if ((t = Math.sqrt(e.x * e.x + e.y * e.y)) > 2 * D2R.HALF_PI * this.a) return;
    return n = t / this.a, p = Math.sin(n), f = Math.cos(n), m = this.long0, Math.abs(t) <= D2R.EPSLN ? M = this.lat0 : (M = (0, Unidentified666.default)(f * this.sin_p12 + e.y * p * this.cos_p12 / t), _ = Math.abs(this.lat0) - D2R.HALF_PI, m = Math.abs(_) <= D2R.EPSLN ? this.lat0 >= 0 ? (0, N.default)(this.long0 + Math.atan2(e.x, -e.y), this.over) : (0, N.default)(this.long0 - Math.atan2(-e.x, e.y), this.over) : (0, N.default)(this.long0 + Math.atan2(e.x * p, t * this.cos_p12 * f - e.y * this.sin_p12 * p), this.over)), e.x = m, e.y = M, e;
  }
  return A = (0, Unidentified654.default)(this.es), g = (0, Unidentified655.default)(this.es), b = (0, Unidentified656.default)(this.es), y = (0, Unidentified657.default)(this.es), Math.abs(this.sin_p12 - 1) <= D2R.EPSLN ? (v = (L = this.a * (0, Unidentified653.default)(A, g, b, y, D2R.HALF_PI)) - (t = Math.sqrt(e.x * e.x + e.y * e.y)), M = (0, Unidentified660.default)(v / this.a, A, g, b, y), m = (0, N.default)(this.long0 + Math.atan2(e.x, -1 * e.y), this.over), e.x = m, e.y = M, e) : Math.abs(this.sin_p12 + 1) <= D2R.EPSLN ? (L = this.a * (0, Unidentified653.default)(A, g, b, y, D2R.HALF_PI), v = (t = Math.sqrt(e.x * e.x + e.y * e.y)) - L, M = (0, Unidentified660.default)(v / this.a, A, g, b, y), m = (0, N.default)(this.long0 + Math.atan2(e.x, e.y), this.over), e.x = m, e.y = M, e) : (T = Math.atan2(e.x, e.y), S = Math.sqrt(e.x * e.x + e.y * e.y), w = (0, vincentyDirect.vincentyDirect)(this.lat0, this.long0, T, S, this.a, this.f), e.x = w.lon2, e.y = w.lat2, e);
}
var names = ["Azimuthal_Equidistant", "aeqd"];
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
