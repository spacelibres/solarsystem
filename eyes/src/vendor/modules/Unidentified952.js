// Recovered from vendors.js:2384255-2385261.
import * as Unidentified933 from "./Unidentified933.js";
import * as Unidentified931 from "./Unidentified931.js";
import * as Unidentified947 from "./Unidentified947.js";
import * as isElement from "./isElement-932.js";
import * as Unidentified953 from "./Unidentified953.js";
import * as Unidentified951 from "./Unidentified951.js";
import * as Unidentified940 from "./Unidentified940.js";
function u(e) {
  return (0, isElement.isHTMLElement)(e) && "fixed" !== (0, Unidentified947.default)(e).position ? e.offsetParent : null;
}
function d(e) {
  for (var t = (0, Unidentified933.default)(e), n = u(e); n && (0, Unidentified953.default)(n) && "static" === (0, Unidentified947.default)(n).position;) n = u(n);
  return n && ("html" === (0, Unidentified931.default)(n) || "body" === (0, Unidentified931.default)(n) && "static" === (0, Unidentified947.default)(n).position) ? t : n || function (e) {
    var t = /firefox/i.test((0, Unidentified940.default)());
    if (/Trident/i.test((0, Unidentified940.default)()) && (0, isElement.isHTMLElement)(e) && "fixed" === (0, Unidentified947.default)(e).position) return null;
    var n = (0, Unidentified951.default)(e);
    for ((0, isElement.isShadowRoot)(n) && (n = n.host); (0, isElement.isHTMLElement)(n) && ["html", "body"].indexOf((0, Unidentified931.default)(n)) < 0;) {
      var r = (0, Unidentified947.default)(n);
      if ("none" !== r.transform || "none" !== r.perspective || "paint" === r.contain || -1 !== ["transform", "perspective"].indexOf(r.willChange) || t && "filter" === r.willChange || t && r.filter && "none" !== r.filter) return n;
      n = n.parentNode;
    }
    return null;
  }(e) || t;
}
export { d as default };
