/** @eyes-analysis
 * 文件职责：提供 init、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1867516-1869476.；exports: init, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1867516-1869476.
import * as Unidentified659 from "./Unidentified659.js";
import * as N from "./N.js";
import * as Unidentified635 from "./Unidentified635.js";
import * as Unidentified630 from "./Unidentified630.js";
import * as Unidentified632 from "./Unidentified632.js";
import * as Unidentified631 from "./Unidentified631.js";
import * as D2R from "./D2R.js";
let defaultExport;
var u = 1e-10;
function init() {
  var e;
  if (this.phi1 = this.lat1, Math.abs(this.phi1) < u) throw new Error();
  this.es ? (this.en = (0, Unidentified630.default)(this.es), this.m1 = (0, Unidentified631.default)(this.phi1, this.am1 = Math.sin(this.phi1), e = Math.cos(this.phi1), this.en), this.am1 = e / (Math.sqrt(1 - this.es * this.am1 * this.am1) * this.am1), this.inverse = inverse, this.forward = forward) : (Math.abs(this.phi1) + u >= D2R.HALF_PI ? this.cphi1 = 0 : this.cphi1 = 1 / Math.tan(this.phi1), this.inverse = m, this.forward = f);
}
function forward(e) {
  var t,
    n,
    r,
    a = (0, N.default)(e.x - (this.long0 || 0), this.over),
    s = e.y;
  return t = this.am1 + this.m1 - (0, Unidentified631.default)(s, n = Math.sin(s), r = Math.cos(s), this.en), n = r * a / (t * Math.sqrt(1 - this.es * n * n)), e.x = t * Math.sin(n), e.y = this.am1 - t * Math.cos(n), e.x = this.a * e.x + (this.x0 || 0), e.y = this.a * e.y + (this.y0 || 0), e;
}
function inverse(e) {
  var t, n, s, c;
  if (e.x = (e.x - (this.x0 || 0)) / this.a, e.y = (e.y - (this.y0 || 0)) / this.a, n = (0, Unidentified635.default)(e.x, e.y = this.am1 - e.y), c = (0, Unidentified632.default)(this.am1 + this.m1 - n, this.es, this.en), (t = Math.abs(c)) < D2R.HALF_PI) t = Math.sin(c), s = n * Math.atan2(e.x, e.y) * Math.sqrt(1 - this.es * t * t) / Math.cos(c);else {
    if (!(Math.abs(t - D2R.HALF_PI) <= u)) throw new Error();
    s = 0;
  }
  return e.x = (0, N.default)(s + (this.long0 || 0), this.over), e.y = (0, Unidentified659.default)(c), e;
}
function f(e) {
  var t,
    n,
    r = (0, N.default)(e.x - (this.long0 || 0), this.over),
    a = e.y;
  return n = this.cphi1 + this.phi1 - a, Math.abs(n) > u ? (e.x = n * Math.sin(t = r * Math.cos(a) / n), e.y = this.cphi1 - n * Math.cos(t)) : e.x = e.y = 0, e.x = this.a * e.x + (this.x0 || 0), e.y = this.a * e.y + (this.y0 || 0), e;
}
function m(e) {
  var t, n;
  e.x = (e.x - (this.x0 || 0)) / this.a, e.y = (e.y - (this.y0 || 0)) / this.a;
  var s = (0, Unidentified635.default)(e.x, e.y = this.cphi1 - e.y);
  if (n = this.cphi1 + this.phi1 - s, Math.abs(n) > D2R.HALF_PI) throw new Error();
  return t = Math.abs(Math.abs(n) - D2R.HALF_PI) <= u ? 0 : s * Math.atan2(e.x, e.y) / Math.cos(n), e.x = (0, N.default)(t + (this.long0 || 0), this.over), e.y = (0, Unidentified659.default)(n), e;
}
var names = ["bonne", "Bonne (Werner lat_1=90)"];
defaultExport = {
  init: init,
  names: names
};
export { init };
export { names };
export { defaultExport as default };
