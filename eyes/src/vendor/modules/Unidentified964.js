// Recovered from vendors.js:2391474-2392128.
import * as Unidentified965 from "./Unidentified965.js";
import * as Unidentified966 from "./Unidentified966.js";
import * as Unidentified967 from "./Unidentified967.js";
import * as afterMain from "./afterMain-955.js";
function o(e) {
  var t,
    n = e.reference,
    o = e.element,
    c = e.placement,
    l = c ? (0, Unidentified965.default)(c) : null,
    u = c ? (0, Unidentified966.default)(c) : null,
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
  var p = l ? (0, Unidentified967.default)(l) : null;
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
