// Recovered from vendors.js:2383739-2384015.
import * as Unidentified951 from "./Unidentified951.js";
import * as Unidentified946 from "./Unidentified946.js";
import * as Unidentified931 from "./Unidentified931.js";
import * as isElement from "./isElement-932.js";
function o(e) {
  return ["html", "body", "#document"].indexOf((0, Unidentified931.default)(e)) >= 0 ? e.ownerDocument.body : (0, isElement.isHTMLElement)(e) && (0, Unidentified946.default)(e) ? e : o((0, Unidentified951.default)(e));
}
export { o as default };
