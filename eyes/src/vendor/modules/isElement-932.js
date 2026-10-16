// Recovered from vendors.js:2376058-2376504.
import * as Unidentified933 from "./Unidentified933.js";
function isElement(e) {
  return e instanceof (0, Unidentified933.default)(e).Element || e instanceof Element;
}
function isHTMLElement(e) {
  return e instanceof (0, Unidentified933.default)(e).HTMLElement || e instanceof HTMLElement;
}
function isShadowRoot(e) {
  return "undefined" != typeof ShadowRoot && (e instanceof (0, Unidentified933.default)(e).ShadowRoot || e instanceof ShadowRoot);
}
export { isElement };
export { isHTMLElement };
export { isShadowRoot };
