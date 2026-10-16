// Recovered from vendors.js:1104704-1105386.
import * as Unidentified205 from "./Unidentified205.js";
import * as afterMain from "./afterMain-194.js";
import * as Unidentified197 from "./Unidentified197.js";
import * as Unidentified204 from "./Unidentified204.js";
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
    f = (0, Unidentified205.default)(o),
    m = f ? d ? afterMain.variationPlacements : afterMain.variationPlacements.filter(function (e) {
      return (0, Unidentified205.default)(e) === f;
    }) : afterMain.basePlacements,
    M = m.filter(function (e) {
      return p.indexOf(e) >= 0;
    });
  0 === M.length && (M = m);
  var _ = M.reduce(function (t, n) {
    return t[n] = (0, Unidentified197.default)(e, {
      placement: n,
      boundary: c,
      rootBoundary: l,
      padding: u
    })[(0, Unidentified204.default)(n)], t;
  }, {});
  return Object.keys(_).sort(function (e, t) {
    return _[e] - _[t];
  });
}
export { o as default };
