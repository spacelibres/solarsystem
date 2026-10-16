// Recovered from vendors.js:1085665-1086420.
import * as Unidentified176 from "./Unidentified176.js";
import * as Unidentified180 from "./Unidentified180.js";
import * as Unidentified170 from "./Unidentified170.js";
import * as isElement from "./isElement-171.js";
import * as Unidentified183 from "./Unidentified183.js";
import * as Unidentified184 from "./Unidentified184.js";
import * as Unidentified185 from "./Unidentified185.js";
import * as max from "./max-177.js";
function d(e, t, n) {
  void 0 === n && (n = !1);
  var d = (0, isElement.isHTMLElement)(t),
    h = (0, isElement.isHTMLElement)(t) && function (e) {
      var t = e.getBoundingClientRect(),
        n = (0, max.round)(t.width) / e.offsetWidth || 1,
        r = (0, max.round)(t.height) / e.offsetHeight || 1;
      return 1 !== n || 1 !== r;
    }(t),
    p = (0, Unidentified184.default)(t),
    f = (0, Unidentified176.default)(e, h, n),
    m = {
      scrollLeft: 0,
      scrollTop: 0
    },
    M = {
      x: 0,
      y: 0
    };
  return (d || !d && !n) && (("body" !== (0, Unidentified170.default)(t) || (0, Unidentified185.default)(p)) && (m = (0, Unidentified180.default)(t)), (0, isElement.isHTMLElement)(t) ? ((M = (0, Unidentified176.default)(t, !0)).x += t.clientLeft, M.y += t.clientTop) : p && (M.x = (0, Unidentified183.default)(p))), {
    x: f.left + m.scrollLeft - M.x,
    y: f.top + m.scrollTop - M.y,
    width: f.width,
    height: f.height
  };
}
export { d as default };
