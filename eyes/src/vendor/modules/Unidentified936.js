// Recovered from vendors.js:2379860-2380615.
import * as Unidentified937 from "./Unidentified937.js";
import * as Unidentified941 from "./Unidentified941.js";
import * as Unidentified931 from "./Unidentified931.js";
import * as isElement from "./isElement-932.js";
import * as Unidentified944 from "./Unidentified944.js";
import * as Unidentified945 from "./Unidentified945.js";
import * as Unidentified946 from "./Unidentified946.js";
import * as max from "./max-938.js";
function d(e, t, n) {
  void 0 === n && (n = !1);
  var d = (0, isElement.isHTMLElement)(t),
    h = (0, isElement.isHTMLElement)(t) && function (e) {
      var t = e.getBoundingClientRect(),
        n = (0, max.round)(t.width) / e.offsetWidth || 1,
        r = (0, max.round)(t.height) / e.offsetHeight || 1;
      return 1 !== n || 1 !== r;
    }(t),
    p = (0, Unidentified945.default)(t),
    f = (0, Unidentified937.default)(e, h, n),
    m = {
      scrollLeft: 0,
      scrollTop: 0
    },
    M = {
      x: 0,
      y: 0
    };
  return (d || !d && !n) && (("body" !== (0, Unidentified931.default)(t) || (0, Unidentified946.default)(p)) && (m = (0, Unidentified941.default)(t)), (0, isElement.isHTMLElement)(t) ? ((M = (0, Unidentified937.default)(t, !0)).x += t.clientLeft, M.y += t.clientTop) : p && (M.x = (0, Unidentified944.default)(p))), {
    x: f.left + m.scrollLeft - M.x,
    y: f.top + m.scrollTop - M.y,
    width: f.width,
    height: f.height
  };
}
export { d as default };
