// Recovered from vendors.js:1094658-1095886.
import * as afterMain from "./afterMain-194.js";
import * as Unidentified199 from "./Unidentified199.js";
import * as Unidentified200 from "./Unidentified200.js";
import * as Unidentified188 from "./Unidentified188.js";
import * as Unidentified191 from "./Unidentified191.js";
import * as Unidentified184 from "./Unidentified184.js";
import * as Unidentified186 from "./Unidentified186.js";
import * as isElement from "./isElement-171.js";
import * as Unidentified176 from "./Unidentified176.js";
import * as Unidentified190 from "./Unidentified190.js";
import * as Unidentified201 from "./Unidentified201.js";
import * as Unidentified170 from "./Unidentified170.js";
import * as Unidentified202 from "./Unidentified202.js";
import * as max from "./max-177.js";
function _(e, t, n) {
  return t === afterMain.viewport ? (0, Unidentified202.default)((0, Unidentified199.default)(e, n)) : (0, isElement.isElement)(t) ? function (e, t) {
    var n = (0, Unidentified176.default)(e, !1, "fixed" === t);
    return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
  }(t, n) : (0, Unidentified202.default)((0, Unidentified200.default)((0, Unidentified184.default)(e)));
}
function A(e, t, n, r) {
  var i = "clippingParents" === t ? function (e) {
      var t = (0, Unidentified188.default)((0, Unidentified190.default)(e)),
        n = ["absolute", "fixed"].indexOf((0, Unidentified186.default)(e).position) >= 0 && (0, isElement.isHTMLElement)(e) ? (0, Unidentified191.default)(e) : e;
      return (0, isElement.isElement)(n) ? t.filter(function (e) {
        return (0, isElement.isElement)(e) && (0, Unidentified201.default)(e, n) && "body" !== (0, Unidentified170.default)(e);
      }) : [];
    }(e) : [].concat(t),
    a = [].concat(i, [n]),
    c = a[0],
    d = a.reduce(function (t, n) {
      var i = _(e, n, r);
      return t.top = (0, max.max)(i.top, t.top), t.right = (0, max.min)(i.right, t.right), t.bottom = (0, max.min)(i.bottom, t.bottom), t.left = (0, max.max)(i.left, t.left), t;
    }, _(e, c, r));
  return d.width = d.right - d.left, d.height = d.bottom - d.top, d.x = d.left, d.y = d.top, d;
}
export { A as default };
