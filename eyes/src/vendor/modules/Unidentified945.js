/** @eyes-analysis
 * 文件职责：Popper 浮层定位：取得所属文档的 documentElement
 * 依据：// Recovered from vendors.js:2382536-2382727.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2382536-2382727.
import * as isElement from "./isElement-932.js";
function i(e) {
  return (((0, isElement.isElement)(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
export { i as default };
