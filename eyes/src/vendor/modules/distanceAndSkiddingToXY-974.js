// Recovered from vendors.js:2396153-2396883.
import * as Unidentified965 from "./Unidentified965.js";
import * as afterMain from "./afterMain-955.js";
let defaultExport;
function distanceAndSkiddingToXY(e, t, n) {
  var a = (0, Unidentified965.default)(e),
    s = [afterMain.left, afterMain.top].indexOf(a) >= 0 ? -1 : 1,
    o = "function" == typeof n ? n(Object.assign({}, t, {
      placement: e
    })) : n,
    c = o[0],
    l = o[1];
  return c = c || 0, l = (l || 0) * s, [afterMain.left, afterMain.right].indexOf(a) >= 0 ? {
    x: l,
    y: c
  } : {
    x: c,
    y: l
  };
}
defaultExport = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: function (e) {
    var t = e.state,
      n = e.options,
      r = e.name,
      s = n.offset,
      o = void 0 === s ? [0, 0] : s,
      c = afterMain.placements.reduce(function (e, n) {
        return e[n] = distanceAndSkiddingToXY(n, t.rects, o), e;
      }, {}),
      l = c[t.placement],
      u = l.x,
      d = l.y;
    null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += u, t.modifiersData.popperOffsets.y += d), t.modifiersData[r] = c;
  }
};
export { distanceAndSkiddingToXY };
export { defaultExport as default };
