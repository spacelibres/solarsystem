/** @eyes-analysis
 * 文件职责：Popper 浮层定位：按节点类型选择 window 或元素的滚动偏移
 * 依据：// Recovered from vendors.js:1087607-1087822.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1087607-1087822.
import * as Unidentified181 from "./Unidentified181.js";
import * as Unidentified172 from "./Unidentified172.js";
import * as isElement from "./isElement-171.js";
import * as Unidentified182 from "./Unidentified182.js";
function o(e) {
  return e !== (0, Unidentified172.default)(e) && (0, isElement.isHTMLElement)(e) ? (0, Unidentified182.default)(e) : (0, Unidentified181.default)(e);
}
export { o as default };
