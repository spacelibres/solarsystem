// Recovered from vendors.js:1806686-1806902.
import * as N from "./N.js";
function i(e, t) {
  if (void 0 === e) {
    if ((e = Math.floor(30 * ((0, N.default)(t) + Math.PI) / Math.PI) + 1) < 0) return 0;
    if (e > 60) return 60;
  }
  return e;
}
export { i as default };
