// Recovered from vendors.js:1825403-1825572.
import * as D2R from "./D2R.js";
import * as Unidentified611 from "./Unidentified611.js";
function a(e) {
  return Math.abs(e) < D2R.HALF_PI ? e : e - (0, Unidentified611.default)(e) * Math.PI;
}
export { a as default };
