/** @eyes-analysis
 * 文件职责：Popper 浮层定位：按节点类型选择 window 或元素的滚动偏移
 * 依据：// Recovered from vendors.js:2381802-2382017.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2381802-2382017.
import * as Unidentified942 from "./Unidentified942.js";
import * as Unidentified933 from "./Unidentified933.js";
import * as isElement from "./isElement-932.js";
import * as Unidentified943 from "./Unidentified943.js";
function o(e) {
  return e !== (0, Unidentified933.default)(e) && (0, isElement.isHTMLElement)(e) ? (0, Unidentified943.default)(e) : (0, Unidentified942.default)(e);
}
export { o as default };
