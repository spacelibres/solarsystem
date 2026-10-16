/** @eyes-analysis
 * 文件职责：Popper 浮层定位：按方向的溢出量排序自动定位候选
 * 依据：// Recovered from vendors.js:2398899-2399581.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2398899-2399581.
import * as Unidentified966 from "./Unidentified966.js";
import * as afterMain from "./afterMain-955.js";
import * as Unidentified958 from "./Unidentified958.js";
import * as Unidentified965 from "./Unidentified965.js";
function o(e, t) {
  void 0 === t && (t = {});
  var n = t,
    o = n.placement,
    c = n.boundary,
    l = n.rootBoundary,
    u = n.padding,
    d = n.flipVariations,
    h = n.allowedAutoPlacements,
    p = void 0 === h ? afterMain.placements : h,
    f = (0, Unidentified966.default)(o),
    m = f ? d ? afterMain.variationPlacements : afterMain.variationPlacements.filter(function (e) {
      return (0, Unidentified966.default)(e) === f;
    }) : afterMain.basePlacements,
    M = m.filter(function (e) {
      return p.indexOf(e) >= 0;
    });
  0 === M.length && (M = m);
  var _ = M.reduce(function (t, n) {
    return t[n] = (0, Unidentified958.default)(e, {
      placement: n,
      boundary: c,
      rootBoundary: l,
      padding: u
    })[(0, Unidentified965.default)(n)], t;
  }, {});
  return Object.keys(_).sort(function (e, t) {
    return _[e] - _[t];
  });
}
export { o as default };
