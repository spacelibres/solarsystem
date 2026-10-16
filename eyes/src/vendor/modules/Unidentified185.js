// Recovered from vendors.js:1088533-1088746.
import * as Unidentified186 from "./Unidentified186.js";
function i(e) {
  var t = (0, Unidentified186.default)(e),
    n = t.overflow,
    i = t.overflowX,
    a = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + a + i);
}
export { i as default };
