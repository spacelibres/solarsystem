/** @eyes-analysis
 * 文件职责：Popper 浮层定位：处理 assignedSlot、parentNode、ShadowRoot host 的祖先遍历
 * 依据：// Recovered from vendors.js:1089821-1090059.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1089821-1090059.
import * as Unidentified170 from "./Unidentified170.js";
import * as Unidentified184 from "./Unidentified184.js";
import * as isElement from "./isElement-171.js";
function s(e) {
  return "html" === (0, Unidentified170.default)(e) ? e : e.assignedSlot || e.parentNode || ((0, isElement.isShadowRoot)(e) ? e.host : null) || (0, Unidentified184.default)(e);
}
export { s as default };
