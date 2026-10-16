// Recovered from vendors.js:2380616-2381221.
import * as isElement from "./isElement-932.js";
import * as max from "./max-938.js";
import * as Unidentified933 from "./Unidentified933.js";
import * as Unidentified939 from "./Unidentified939.js";
function o(e, t, n) {
  void 0 === t && (t = !1), void 0 === n && (n = !1);
  var o = e.getBoundingClientRect(),
    c = 1,
    l = 1;
  t && (0, isElement.isHTMLElement)(e) && (c = e.offsetWidth > 0 && (0, max.round)(o.width) / e.offsetWidth || 1, l = e.offsetHeight > 0 && (0, max.round)(o.height) / e.offsetHeight || 1);
  var u = ((0, isElement.isElement)(e) ? (0, Unidentified933.default)(e) : window).visualViewport,
    d = !(0, Unidentified939.default)() && n,
    h = (o.left + (d && u ? u.offsetLeft : 0)) / c,
    p = (o.top + (d && u ? u.offsetTop : 0)) / l,
    f = o.width / c,
    m = o.height / l;
  return {
    width: f,
    height: m,
    top: p,
    right: h + f,
    bottom: p + m,
    left: h,
    x: h,
    y: p
  };
}
export { o as default };
