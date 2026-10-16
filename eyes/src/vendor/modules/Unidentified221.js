// Recovered from vendors.js:1107774-1108986.
import * as Unidentified204 from "./Unidentified204.js";
import * as Unidentified187 from "./Unidentified187.js";
import * as Unidentified201 from "./Unidentified201.js";
import * as Unidentified191 from "./Unidentified191.js";
import * as Unidentified206 from "./Unidentified206.js";
import * as within from "./within-220.js";
import * as Unidentified207 from "./Unidentified207.js";
import * as Unidentified209 from "./Unidentified209.js";
import * as afterMain from "./afterMain-194.js";
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
      m = (0, Unidentified204.default)(n.placement),
      M = (0, Unidentified206.default)(m),
      _ = [afterMain.left, afterMain.right].indexOf(m) >= 0 ? "height" : "width";
    if (p && f) {
      var A = function (e, t) {
          return e = "function" == typeof e ? e(Object.assign({}, t.rects, {
            placement: t.placement
          })) : e, (0, Unidentified207.default)("number" != typeof e ? e : (0, Unidentified209.default)(e, afterMain.basePlacements));
        }(h.padding, n),
        g = (0, Unidentified187.default)(p),
        b = "y" === M ? afterMain.top : afterMain.left,
        y = "y" === M ? afterMain.bottom : afterMain.right,
        L = n.rects.reference[_] + n.rects.reference[M] - f[M] - n.rects.popper[_],
        v = f[M] - n.rects.reference[M],
        T = (0, Unidentified191.default)(p),
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
    null != r && ("string" != typeof r || (r = t.elements.popper.querySelector(r))) && (0, Unidentified201.default)(t.elements.popper, r) && (t.elements.arrow = r);
  },
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
export { defaultExport as default };
