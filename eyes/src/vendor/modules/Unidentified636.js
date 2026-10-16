// Recovered from vendors.js:1804949-1805142.
import * as Unidentified635 from "./Unidentified635.js";
import * as Unidentified637 from "./Unidentified637.js";
function a(e) {
  var t = Math.abs(e);
  return t = (0, Unidentified637.default)(t * (1 + t / ((0, Unidentified635.default)(1, t) + 1))), e < 0 ? -t : t;
}
export { a as default };
