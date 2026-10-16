/** @eyes-analysis
 * 文件职责：提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1806903-1808182.；exports: forward, init, inverse, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1806903-1808182.
import * as forward from "./forward-645.js";
import * as N from "./N.js";
import * as Unidentified635 from "./Unidentified635.js";
let defaultExport;
function init() {
  forward.default.init.apply(this), this.rc && (this.sinc0 = Math.sin(this.phic0), this.cosc0 = Math.cos(this.phic0), this.R2 = 2 * this.rc, this.title || (this.title = "Oblique Stereographic Alternative"));
}
function o(e) {
  var t, n, a, s;
  return e.x = (0, N.default)(e.x - this.long0, this.over), forward.default.forward.apply(this, [e]), t = Math.sin(e.y), n = Math.cos(e.y), a = Math.cos(e.x), s = this.k0 * this.R2 / (1 + this.sinc0 * t + this.cosc0 * n * a), e.x = s * n * Math.sin(e.x), e.y = s * (this.cosc0 * t - this.sinc0 * n * a), e.x = this.a * e.x + this.x0, e.y = this.a * e.y + this.y0, e;
}
function inverse(e) {
  var t, n, s, o, c;
  if (e.x = (e.x - this.x0) / this.a, e.y = (e.y - this.y0) / this.a, e.x /= this.k0, e.y /= this.k0, c = (0, Unidentified635.default)(e.x, e.y)) {
    var l = 2 * Math.atan2(c, this.R2);
    t = Math.sin(l), n = Math.cos(l), o = Math.asin(n * this.sinc0 + e.y * t * this.cosc0 / c), s = Math.atan2(e.x * t, c * this.cosc0 * n - e.y * this.sinc0 * t);
  } else o = this.phic0, s = 0;
  return e.x = s, e.y = o, forward.default.inverse.apply(this, [e]), e.x = (0, N.default)(e.x + this.long0, this.over), e;
}
var names = ["Stereographic_North_Pole", "Oblique_Stereographic", "sterea", "Oblique Stereographic Alternative", "Double_Stereographic"];
defaultExport = {
  init: init,
  forward: o,
  inverse: inverse,
  names: names
};
export { o as forward };
export { init };
export { inverse };
export { names };
export { defaultExport as default };
