// Recovered from vendors.js:2401969-2403181.
import * as Unidentified965 from "./Unidentified965.js";
import * as Unidentified948 from "./Unidentified948.js";
import * as Unidentified962 from "./Unidentified962.js";
import * as Unidentified952 from "./Unidentified952.js";
import * as Unidentified967 from "./Unidentified967.js";
import * as within from "./within-981.js";
import * as Unidentified968 from "./Unidentified968.js";
import * as Unidentified970 from "./Unidentified970.js";
import * as afterMain from "./afterMain-955.js";
let defaultExport;
defaultExport = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: function (e) {
    var t,
      n = e.state,
      a = e.name,
      h = e.options,
      p = n.elements.arrow,
      f = n.modifiersData.popperOffsets,
      m = (0, Unidentified965.default)(n.placement),
      M = (0, Unidentified967.default)(m),
      _ = [afterMain.left, afterMain.right].indexOf(m) >= 0 ? "height" : "width";
    if (p && f) {
      var A = function (e, t) {
          return e = "function" == typeof e ? e(Object.assign({}, t.rects, {
            placement: t.placement
          })) : e, (0, Unidentified968.default)("number" != typeof e ? e : (0, Unidentified970.default)(e, afterMain.basePlacements));
        }(h.padding, n),
        g = (0, Unidentified948.default)(p),
        b = "y" === M ? afterMain.top : afterMain.left,
        y = "y" === M ? afterMain.bottom : afterMain.right,
        L = n.rects.reference[_] + n.rects.reference[M] - f[M] - n.rects.popper[_],
        v = f[M] - n.rects.reference[M],
        T = (0, Unidentified952.default)(p),
        S = T ? "y" === M ? T.clientHeight || 0 : T.clientWidth || 0 : 0,
        w = L / 2 - v / 2,
        E = A[b],
        x = S - g[_] - A[y],
        C = S / 2 - g[_] / 2 + w,
        z = (0, within.within)(E, C, x),
        O = M;
      n.modifiersData[a] = ((t = {})[O] = z, t.centerOffset = z - C, t);
    }
  },
  effect: function (e) {
    var t = e.state,
      n = e.options.element,
      r = void 0 === n ? "[data-popper-arrow]" : n;
    null != r && ("string" != typeof r || (r = t.elements.popper.querySelector(r))) && (0, Unidentified962.default)(t.elements.popper, r) && (t.elements.arrow = r);
  },
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
export { defaultExport as default };
