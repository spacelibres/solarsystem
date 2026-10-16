// Recovered from vendors.js:1096826-1097105.
import * as isElement from "./isElement-171.js";
function i(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (n && (0, isElement.isShadowRoot)(n)) {
    var i = t;
    do {
      if (i && e.isSameNode(i)) return !0;
      i = i.parentNode || i.host;
    } while (i);
  }
  return !1;
}
export { i as default };
