// Recovered from vendors.js:1755221-1755500.
import * as D2R from "./D2R.js";
function i(e, t) {
  for (var n, i, a = .5 * e, s = D2R.HALF_PI - 2 * Math.atan(t), o = 0; o <= 15; o++) if (n = e * Math.sin(s), s += i = D2R.HALF_PI - 2 * Math.atan(t * Math.pow((1 - n) / (1 + n), a)) - s, Math.abs(i) <= 1e-10) return s;
  return -9999;
}
export { i as default };
