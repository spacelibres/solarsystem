// Recovered from vendors.js:1805667-1805998.
import * as Unidentified634 from "./Unidentified634.js";
import * as Unidentified641 from "./Unidentified641.js";
function a(e, t, n) {
  for (var a, s, o = Math.sin(t), c = Math.cos(t), l = (0, Unidentified634.default)(n), u = (0, Unidentified641.default)(n), d = 2 * c * u, h = -2 * o * l, p = e.length - 1, f = e[p], m = 0, M = 0, _ = 0; --p >= 0;) a = M, s = m, f = d * (M = f) - a - h * (m = _) + e[p], _ = h * M - s + d * m;
  return [(d = o * u) * f - (h = c * l) * _, d * _ + h * f];
}
export { a as default };
