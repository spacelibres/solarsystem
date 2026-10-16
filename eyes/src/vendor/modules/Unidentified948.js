// Recovered from vendors.js:2383088-2383375.
import * as Unidentified937 from "./Unidentified937.js";
function i(e) {
  var t = (0, Unidentified937.default)(e),
    n = e.offsetWidth,
    i = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - i) <= 1 && (i = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: i
  };
}
export { i as default };
