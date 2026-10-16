// Recovered from vendors.js:1088893-1089180.
import * as Unidentified176 from "./Unidentified176.js";
function i(e) {
  var t = (0, Unidentified176.default)(e),
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
