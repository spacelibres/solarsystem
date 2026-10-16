/** @eyes-analysis
 * 文件职责：将超出半圆范围的纬度折回
 * 依据：// Recovered from vendors.js:1825403-1825572.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1825403-1825572.
import * as D2R from "./D2R.js";
import * as Unidentified611 from "./Unidentified611.js";
function a(e) {
  return Math.abs(e) < D2R.HALF_PI ? e : e - (0, Unidentified611.default)(e) * Math.PI;
}
export { a as default };
