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
