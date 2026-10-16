// Recovered from vendors.js:1755035-1755220.
import * as D2R from "./D2R.js";
function i(e, t, n) {
  var i = e * n,
    a = .5 * e;
  return i = Math.pow((1 - i) / (1 + i), a), Math.tan(.5 * (D2R.HALF_PI - t)) / i;
}
export { i as default };
