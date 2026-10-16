/** @eyes-analysis
 * 文件职责：组合稳定 log1p 和 hypot 计算反双曲正弦
 * 依据：// Recovered from vendors.js:1804949-1805142.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1804949-1805142.
import * as Unidentified635 from "./Unidentified635.js";
import * as Unidentified637 from "./Unidentified637.js";
function a(e) {
  var t = Math.abs(e);
  return t = (0, Unidentified637.default)(t * (1 + t / ((0, Unidentified635.default)(1, t) + 1))), e < 0 ? -t : t;
}
export { a as default };
