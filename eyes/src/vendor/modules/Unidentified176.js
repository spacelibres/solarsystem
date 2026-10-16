// Recovered from vendors.js:1086421-1087026.
import * as isElement from "./isElement-171.js";
import * as max from "./max-177.js";
import * as Unidentified172 from "./Unidentified172.js";
import * as Unidentified178 from "./Unidentified178.js";
function o(e, t, n) {
  void 0 === t && (t = !1), void 0 === n && (n = !1);
  var o = e.getBoundingClientRect(),
    c = 1,
    l = 1;
  t && (0, isElement.isHTMLElement)(e) && (c = e.offsetWidth > 0 && (0, max.round)(o.width) / e.offsetWidth || 1, l = e.offsetHeight > 0 && (0, max.round)(o.height) / e.offsetHeight || 1);
  var u = ((0, isElement.isElement)(e) ? (0, Unidentified172.default)(e) : window).visualViewport,
    d = !(0, Unidentified178.default)() && n,
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
