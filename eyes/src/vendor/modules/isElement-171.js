/** @eyes-analysis
 * 文件职责：提供 isElement、isHTMLElement、isShadowRoot；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1081863-1082309.；exports: isElement, isHTMLElement, isShadowRoot
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1081863-1082309.
import * as Unidentified172 from "./Unidentified172.js";
function isElement(e) {
  return e instanceof (0, Unidentified172.default)(e).Element || e instanceof Element;
}
function isHTMLElement(e) {
  return e instanceof (0, Unidentified172.default)(e).HTMLElement || e instanceof HTMLElement;
}
function isShadowRoot(e) {
  return "undefined" != typeof ShadowRoot && (e instanceof (0, Unidentified172.default)(e).ShadowRoot || e instanceof ShadowRoot);
}
export { isElement };
export { isHTMLElement };
export { isShadowRoot };
