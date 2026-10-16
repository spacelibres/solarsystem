// Recovered from vendors.js:1089544-1089820.
import * as Unidentified190 from "./Unidentified190.js";
import * as Unidentified185 from "./Unidentified185.js";
import * as Unidentified170 from "./Unidentified170.js";
import * as isElement from "./isElement-171.js";
function o(e) {
  return ["html", "body", "#document"].indexOf((0, Unidentified170.default)(e)) >= 0 ? e.ownerDocument.body : (0, isElement.isHTMLElement)(e) && (0, Unidentified185.default)(e) ? e : o((0, Unidentified190.default)(e));
}
export { o as default };
