/** @eyes-analysis
 * 文件职责：Popper 浮层定位：向上寻找最近的滚动祖先
 * 依据：// Recovered from vendors.js:1089544-1089820.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1089544-1089820.
import * as Unidentified190 from "./Unidentified190.js";
import * as Unidentified185 from "./Unidentified185.js";
import * as Unidentified170 from "./Unidentified170.js";
import * as isElement from "./isElement-171.js";
function o(e) {
  return ["html", "body", "#document"].indexOf((0, Unidentified170.default)(e)) >= 0 ? e.ownerDocument.body : (0, isElement.isHTMLElement)(e) && (0, Unidentified185.default)(e) ? e : o((0, Unidentified190.default)(e));
}
export { o as default };
