/** @eyes-analysis
 * 文件职责：提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1844231-1846197.；exports: forward, init, inverse, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1844231-1846197.
import * as Unidentified654 from "./Unidentified654.js";
import * as Unidentified655 from "./Unidentified655.js";
import * as Unidentified656 from "./Unidentified656.js";
import * as Unidentified657 from "./Unidentified657.js";
import * as Unidentified609 from "./Unidentified609.js";
import * as Unidentified653 from "./Unidentified653.js";
import * as N from "./N.js";
import * as Unidentified659 from "./Unidentified659.js";
import * as Unidentified660 from "./Unidentified660.js";
import * as D2R from "./D2R.js";
let defaultExport;
function init() {
  Math.abs(this.lat1 + this.lat2) < D2R.EPSLN || (this.lat2 = this.lat2 || this.lat1, this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = (0, Unidentified654.default)(this.es), this.e1 = (0, Unidentified655.default)(this.es), this.e2 = (0, Unidentified656.default)(this.es), this.e3 = (0, Unidentified657.default)(this.es), this.sin_phi = Math.sin(this.lat1), this.cos_phi = Math.cos(this.lat1), this.ms1 = (0, Unidentified609.default)(this.e, this.sin_phi, this.cos_phi), this.ml1 = (0, Unidentified653.default)(this.e0, this.e1, this.e2, this.e3, this.lat1), Math.abs(this.lat1 - this.lat2) < D2R.EPSLN ? this.ns = this.sin_phi : (this.sin_phi = Math.sin(this.lat2), this.cos_phi = Math.cos(this.lat2), this.ms2 = (0, Unidentified609.default)(this.e, this.sin_phi, this.cos_phi), this.ml2 = (0, Unidentified653.default)(this.e0, this.e1, this.e2, this.e3, this.lat2), this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1)), this.g = this.ml1 + this.ms1 / this.ns, this.ml0 = (0, Unidentified653.default)(this.e0, this.e1, this.e2, this.e3, this.lat0), this.rh = this.a * (this.g - this.ml0));
}
function forward(e) {
  var t,
    n = e.x,
    r = e.y;
  if (this.sphere) t = this.a * (this.g - r);else {
    var i = (0, Unidentified653.default)(this.e0, this.e1, this.e2, this.e3, r);
    t = this.a * (this.g - i);
  }
  var a = this.ns * (0, N.default)(n - this.long0, this.over),
    s = this.x0 + t * Math.sin(a),
    o = this.y0 + this.rh - t * Math.cos(a);
  return e.x = s, e.y = o, e;
}
function inverse(e) {
  var t, n, r, i;
  e.x -= this.x0, e.y = this.rh - e.y + this.y0, this.ns >= 0 ? (n = Math.sqrt(e.x * e.x + e.y * e.y), t = 1) : (n = -Math.sqrt(e.x * e.x + e.y * e.y), t = -1);
  var a = 0;
  if (0 !== n && (a = Math.atan2(t * e.x, t * e.y)), this.sphere) return i = (0, N.default)(this.long0 + a / this.ns, this.over), r = (0, Unidentified659.default)(this.g - n / this.a), e.x = i, e.y = r, e;
  var s = this.g - n / this.a;
  return r = (0, Unidentified660.default)(s, this.e0, this.e1, this.e2, this.e3), i = (0, N.default)(this.long0 + a / this.ns, this.over), e.x = i, e.y = r, e;
}
var names = ["Equidistant_Conic", "eqdc"];
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
