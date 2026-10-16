// Recovered from vendors.js:1834793-1835208.
import * as D2R from "./D2R.js";
function i(e, t) {
  var n = 1 - (1 - e * e) / (2 * e) * Math.log((1 - e) / (1 + e));
  if (Math.abs(Math.abs(t) - n) < 1e-6) return t < 0 ? -1 * D2R.HALF_PI : D2R.HALF_PI;
  for (var i, a, s, o, c = Math.asin(.5 * t), l = 0; l < 30; l++) if (a = Math.sin(c), s = Math.cos(c), o = e * a, c += i = Math.pow(1 - o * o, 2) / (2 * s) * (t / (1 - e * e) - a / (1 - o * o) + .5 / e * Math.log((1 - o) / (1 + o))), Math.abs(i) <= 1e-10) return c;
  return NaN;
}
export { i as default };
