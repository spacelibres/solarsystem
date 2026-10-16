// Recovered from vendors.js:2387651-2388852.
import * as Unidentified959 from "./Unidentified959.js";
import * as Unidentified945 from "./Unidentified945.js";
import * as Unidentified937 from "./Unidentified937.js";
import * as Unidentified964 from "./Unidentified964.js";
import * as Unidentified963 from "./Unidentified963.js";
import * as afterMain from "./afterMain-955.js";
import * as isElement from "./isElement-932.js";
import * as Unidentified968 from "./Unidentified968.js";
import * as Unidentified970 from "./Unidentified970.js";
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
    w = (0, Unidentified968.default)("number" != typeof S ? S : (0, Unidentified970.default)(S, afterMain.basePlacements)),
    E = y === afterMain.popper ? afterMain.reference : afterMain.popper,
    x = e.rects.popper,
    C = e.elements[v ? E : y],
    z = (0, Unidentified959.default)((0, isElement.isElement)(C) ? C : C.contextElement || (0, Unidentified945.default)(e.elements.popper), _, g, m),
    O = (0, Unidentified937.default)(e.elements.reference),
    B = (0, Unidentified964.default)({
      reference: O,
      element: x,
      strategy: "absolute",
      placement: p
    }),
    D = (0, Unidentified963.default)(Object.assign({}, x, B)),
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
