// Recovered from vendors.js:2382728-2382941.
import * as Unidentified947 from "./Unidentified947.js";
function i(e) {
  var t = (0, Unidentified947.default)(e),
    n = t.overflow,
    i = t.overflowX,
    a = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + a + i);
}
export { i as default };
