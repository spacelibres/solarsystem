/** @eyes-analysis
 * 文件职责：提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1840643-1841244.；exports: forward, init, inverse, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1840643-1841244.
import * as N from "./N.js";
let defaultExport;
function init() {}
function forward(e) {
  var t = e.x,
    n = e.y,
    i = (0, N.default)(t - this.long0, this.over),
    a = this.x0 + this.a * i,
    s = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + n / 2.5)) * 1.25;
  return e.x = a, e.y = s, e;
}
function inverse(e) {
  e.x -= this.x0, e.y -= this.y0;
  var t = (0, N.default)(this.long0 + e.x / this.a, this.over),
    n = 2.5 * (Math.atan(Math.exp(.8 * e.y / this.a)) - Math.PI / 4);
  return e.x = t, e.y = n, e;
}
var names = ["Miller_Cylindrical", "mill"];
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
