/** @eyes-analysis
 * 文件职责：Popper 浮层定位：求多个裁剪祖先与根边界矩形的交集
 * 依据：// Recovered from vendors.js:2388853-2390081.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2388853-2390081.
import * as afterMain from "./afterMain-955.js";
import * as Unidentified960 from "./Unidentified960.js";
import * as Unidentified961 from "./Unidentified961.js";
import * as Unidentified949 from "./Unidentified949.js";
import * as Unidentified952 from "./Unidentified952.js";
import * as Unidentified945 from "./Unidentified945.js";
import * as Unidentified947 from "./Unidentified947.js";
import * as isElement from "./isElement-932.js";
import * as Unidentified937 from "./Unidentified937.js";
import * as Unidentified951 from "./Unidentified951.js";
import * as Unidentified962 from "./Unidentified962.js";
import * as Unidentified931 from "./Unidentified931.js";
import * as Unidentified963 from "./Unidentified963.js";
import * as max from "./max-938.js";
function _(e, t, n) {
  return t === afterMain.viewport ? (0, Unidentified963.default)((0, Unidentified960.default)(e, n)) : (0, isElement.isElement)(t) ? function (e, t) {
    var n = (0, Unidentified937.default)(e, !1, "fixed" === t);
    return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
  }(t, n) : (0, Unidentified963.default)((0, Unidentified961.default)((0, Unidentified945.default)(e)));
}
function A(e, t, n, r) {
  var i = "clippingParents" === t ? function (e) {
      var t = (0, Unidentified949.default)((0, Unidentified951.default)(e)),
        n = ["absolute", "fixed"].indexOf((0, Unidentified947.default)(e).position) >= 0 && (0, isElement.isHTMLElement)(e) ? (0, Unidentified952.default)(e) : e;
      return (0, isElement.isElement)(n) ? t.filter(function (e) {
        return (0, isElement.isElement)(e) && (0, Unidentified962.default)(e, n) && "body" !== (0, Unidentified931.default)(e);
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
