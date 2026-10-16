/** @eyes-analysis
 * 文件职责：Popper 浮层定位：计算文档根元素与 window 滚动的横向差值
 * 依据：// Recovered from vendors.js:1088149-1088340.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1088149-1088340.
import * as Unidentified176 from "./Unidentified176.js";
import * as Unidentified184 from "./Unidentified184.js";
import * as Unidentified181 from "./Unidentified181.js";
function s(e) {
  return (0, Unidentified176.default)((0, Unidentified184.default)(e)).left + (0, Unidentified181.default)(e).scrollLeft;
}
export { s as default };
