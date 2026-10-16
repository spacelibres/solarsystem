/** @eyes-analysis
 * 文件职责：提供 dependsOn、init、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1806125-1806685.；exports: dependsOn, init, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1806125-1806685.
import * as Unidentified643 from "./Unidentified643.js";
import * as forward from "./forward-633.js";
import * as D2R from "./D2R.js";
let defaultExport;
var dependsOn = "etmerc";
function init() {
  var e = (0, Unidentified643.default)(this.zone, this.long0);
  if (void 0 === e) throw new Error("unknown utm zone");
  this.lat0 = 0, this.long0 = (6 * Math.abs(e) - 183) * D2R.D2R, this.x0 = 5e5, this.y0 = this.utmSouth ? 1e7 : 0, this.k0 = .9996, forward.default.init.apply(this), this.forward = forward.default.forward, this.inverse = forward.default.inverse;
}
var names = ["Universal Transverse Mercator System", "utm"];
defaultExport = {
  init: init,
  names: names,
  dependsOn: dependsOn
};
export { dependsOn };
export { init };
export { names };
export { defaultExport as default };
