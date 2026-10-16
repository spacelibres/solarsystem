/** @eyes-analysis
 * 文件职责：提供 distanceAndSkiddingToXY、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1101958-1102688.；exports: distanceAndSkiddingToXY, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1101958-1102688.
import * as Unidentified204 from "./Unidentified204.js";
import * as afterMain from "./afterMain-194.js";
let defaultExport;
function distanceAndSkiddingToXY(e, t, n) {
  var a = (0, Unidentified204.default)(e),
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
