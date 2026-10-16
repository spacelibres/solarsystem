// Recovered from vendors.js:1097279-1097933.
import * as Unidentified204 from "./Unidentified204.js";
import * as Unidentified205 from "./Unidentified205.js";
import * as Unidentified206 from "./Unidentified206.js";
import * as afterMain from "./afterMain-194.js";
function o(e) {
  var t,
    n = e.reference,
    o = e.element,
    c = e.placement,
    l = c ? (0, Unidentified204.default)(c) : null,
    u = c ? (0, Unidentified205.default)(c) : null,
    d = n.x + n.width / 2 - o.width / 2,
    h = n.y + n.height / 2 - o.height / 2;
  switch (l) {
    case afterMain.top:
      t = {
        x: d,
        y: n.y - o.height
      };
      break;
    case afterMain.bottom:
      t = {
        x: d,
        y: n.y + n.height
      };
      break;
    case afterMain.right:
      t = {
        x: n.x + n.width,
        y: h
      };
      break;
    case afterMain.left:
      t = {
        x: n.x - o.width,
        y: h
      };
      break;
    default:
      t = {
        x: n.x,
        y: n.y
      };
  }
  var p = l ? (0, Unidentified206.default)(l) : null;
  if (null != p) {
    var f = "y" === p ? "height" : "width";
    switch (u) {
      case afterMain.start:
        t[p] = t[p] - (n[f] / 2 - o[f] / 2);
        break;
      case afterMain.end:
        t[p] = t[p] + (n[f] / 2 - o[f] / 2);
    }
  }
  return t;
}
export { o as default };
