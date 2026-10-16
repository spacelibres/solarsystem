// Recovered from vendors.js:1090060-1091066.
import * as Unidentified172 from "./Unidentified172.js";
import * as Unidentified170 from "./Unidentified170.js";
import * as Unidentified186 from "./Unidentified186.js";
import * as isElement from "./isElement-171.js";
import * as Unidentified192 from "./Unidentified192.js";
import * as Unidentified190 from "./Unidentified190.js";
import * as Unidentified179 from "./Unidentified179.js";
function u(e) {
  return (0, isElement.isHTMLElement)(e) && "fixed" !== (0, Unidentified186.default)(e).position ? e.offsetParent : null;
}
function d(e) {
  for (var t = (0, Unidentified172.default)(e), n = u(e); n && (0, Unidentified192.default)(n) && "static" === (0, Unidentified186.default)(n).position;) n = u(n);
  return n && ("html" === (0, Unidentified170.default)(n) || "body" === (0, Unidentified170.default)(n) && "static" === (0, Unidentified186.default)(n).position) ? t : n || function (e) {
    var t = /firefox/i.test((0, Unidentified179.default)());
    if (/Trident/i.test((0, Unidentified179.default)()) && (0, isElement.isHTMLElement)(e) && "fixed" === (0, Unidentified186.default)(e).position) return null;
    var n = (0, Unidentified190.default)(e);
    for ((0, isElement.isShadowRoot)(n) && (n = n.host); (0, isElement.isHTMLElement)(n) && ["html", "body"].indexOf((0, Unidentified170.default)(n)) < 0;) {
      var r = (0, Unidentified186.default)(n);
      if ("none" !== r.transform || "none" !== r.perspective || "paint" === r.contain || -1 !== ["transform", "perspective"].indexOf(r.willChange) || t && "filter" === r.willChange || t && r.filter && "none" !== r.filter) return n;
      n = n.parentNode;
    }
    return null;
  }(e) || t;
}
export { d as default };
