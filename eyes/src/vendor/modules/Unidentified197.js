/** @eyes-analysis
 * 文件职责：Popper 浮层定位：比较参考或浮层边界与裁剪矩形，返回四边溢出量
 * 依据：// Recovered from vendors.js:1093456-1094657.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1093456-1094657.
import * as Unidentified198 from "./Unidentified198.js";
import * as Unidentified184 from "./Unidentified184.js";
import * as Unidentified176 from "./Unidentified176.js";
import * as Unidentified203 from "./Unidentified203.js";
import * as Unidentified202 from "./Unidentified202.js";
import * as afterMain from "./afterMain-194.js";
import * as isElement from "./isElement-171.js";
import * as Unidentified207 from "./Unidentified207.js";
import * as Unidentified209 from "./Unidentified209.js";
function h(e, t) {
  void 0 === t && (t = {});
  var n = t,
    h = n.placement,
    p = void 0 === h ? e.placement : h,
    f = n.strategy,
    m = void 0 === f ? e.strategy : f,
    M = n.boundary,
    _ = void 0 === M ? afterMain.clippingParents : M,
    A = n.rootBoundary,
    g = void 0 === A ? afterMain.viewport : A,
    b = n.elementContext,
    y = void 0 === b ? afterMain.popper : b,
    L = n.altBoundary,
    v = void 0 !== L && L,
    T = n.padding,
    S = void 0 === T ? 0 : T,
    w = (0, Unidentified207.default)("number" != typeof S ? S : (0, Unidentified209.default)(S, afterMain.basePlacements)),
    E = y === afterMain.popper ? afterMain.reference : afterMain.popper,
    x = e.rects.popper,
    C = e.elements[v ? E : y],
    z = (0, Unidentified198.default)((0, isElement.isElement)(C) ? C : C.contextElement || (0, Unidentified184.default)(e.elements.popper), _, g, m),
    O = (0, Unidentified176.default)(e.elements.reference),
    B = (0, Unidentified203.default)({
      reference: O,
      element: x,
      strategy: "absolute",
      placement: p
    }),
    D = (0, Unidentified202.default)(Object.assign({}, x, B)),
    N = y === afterMain.popper ? D : O,
    I = {
      top: z.top - N.top + w.top,
      bottom: N.bottom - z.bottom + w.bottom,
      left: z.left - N.left + w.left,
      right: N.right - z.right + w.right
    },
    R = e.modifiersData.offset;
  if (y === afterMain.popper && R) {
    var k = R[p];
    Object.keys(I).forEach(function (e) {
      var t = [afterMain.right, afterMain.bottom].indexOf(e) >= 0 ? 1 : -1,
        n = [afterMain.top, afterMain.bottom].indexOf(e) >= 0 ? "y" : "x";
      I[e] += k[n] * t;
    });
  }
  return I;
}
export { h as default };
