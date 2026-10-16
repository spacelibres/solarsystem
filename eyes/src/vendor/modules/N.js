// Recovered from vendors.js:1754757-1754929.
import * as D2R from "./D2R.js";
import * as Unidentified611 from "./Unidentified611.js";
function a(e, t) {
  return t || Math.abs(e) <= D2R.SPI ? e : e - (0, Unidentified611.default)(e) * D2R.TWO_PI;
}
export { a as default };
