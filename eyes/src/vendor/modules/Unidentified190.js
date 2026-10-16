// Recovered from vendors.js:1089821-1090059.
import * as Unidentified170 from "./Unidentified170.js";
import * as Unidentified184 from "./Unidentified184.js";
import * as isElement from "./isElement-171.js";
function s(e) {
  return "html" === (0, Unidentified170.default)(e) ? e : e.assignedSlot || e.parentNode || ((0, isElement.isShadowRoot)(e) ? e.host : null) || (0, Unidentified184.default)(e);
}
export { s as default };
