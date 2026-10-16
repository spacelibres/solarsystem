// Recovered from vendors.js:2384016-2384254.
import * as Unidentified931 from "./Unidentified931.js";
import * as Unidentified945 from "./Unidentified945.js";
import * as isElement from "./isElement-932.js";
function s(e) {
  return "html" === (0, Unidentified931.default)(e) ? e : e.assignedSlot || e.parentNode || ((0, isElement.isShadowRoot)(e) ? e.host : null) || (0, Unidentified945.default)(e);
}
export { s as default };
