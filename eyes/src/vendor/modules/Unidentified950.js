/** @eyes-analysis
 * 文件职责：Popper 浮层定位：向上寻找最近的滚动祖先
 * 依据：// Recovered from vendors.js:2383739-2384015.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2383739-2384015.
import * as Unidentified951 from "./Unidentified951.js";
import * as Unidentified946 from "./Unidentified946.js";
import * as Unidentified931 from "./Unidentified931.js";
import * as isElement from "./isElement-932.js";
function o(e) {
  return ["html", "body", "#document"].indexOf((0, Unidentified931.default)(e)) >= 0 ? e.ownerDocument.body : (0, isElement.isHTMLElement)(e) && (0, Unidentified946.default)(e) ? e : o((0, Unidentified951.default)(e));
}
export { o as default };
