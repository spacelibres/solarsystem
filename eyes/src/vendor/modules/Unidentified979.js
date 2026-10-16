// Recovered from vendors.js:2399582-2401633.
import * as afterMain from "./afterMain-955.js";
import * as Unidentified965 from "./Unidentified965.js";
import * as Unidentified967 from "./Unidentified967.js";
import * as Unidentified980 from "./Unidentified980.js";
import * as within from "./within-981.js";
import * as Unidentified948 from "./Unidentified948.js";
import * as Unidentified952 from "./Unidentified952.js";
import * as Unidentified958 from "./Unidentified958.js";
import * as Unidentified966 from "./Unidentified966.js";
import * as Unidentified969 from "./Unidentified969.js";
import * as max from "./max-938.js";
let defaultExport;
defaultExport = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: function (e) {
    var t = e.state,
      n = e.options,
      f = e.name,
      m = n.mainAxis,
      M = void 0 === m || m,
      _ = n.altAxis,
      A = void 0 !== _ && _,
      g = n.boundary,
      b = n.rootBoundary,
      y = n.altBoundary,
      L = n.padding,
      v = n.tether,
      T = void 0 === v || v,
      S = n.tetherOffset,
      w = void 0 === S ? 0 : S,
      E = (0, Unidentified958.default)(t, {
        boundary: g,
        rootBoundary: b,
        padding: L,
        altBoundary: y
      }),
      x = (0, Unidentified965.default)(t.placement),
      C = (0, Unidentified966.default)(t.placement),
      z = !C,
      O = (0, Unidentified967.default)(x),
      B = (0, Unidentified980.default)(O),
      D = t.modifiersData.popperOffsets,
      N = t.rects.reference,
      I = t.rects.popper,
      R = "function" == typeof w ? w(Object.assign({}, t.rects, {
        placement: t.placement
      })) : w,
      k = "number" == typeof R ? {
        mainAxis: R,
        altAxis: R
      } : Object.assign({
        mainAxis: 0,
        altAxis: 0
      }, R),
      P = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
      Y = {
        x: 0,
        y: 0
      };
    if (D) {
      if (M) {
        var W,
          F = "y" === O ? afterMain.top : afterMain.left,
          q = "y" === O ? afterMain.bottom : afterMain.right,
          H = "y" === O ? "height" : "width",
          U = D[O],
          G = U + E[F],
          X = U - E[q],
          j = T ? -I[H] / 2 : 0,
          V = C === afterMain.start ? N[H] : I[H],
          K = C === afterMain.start ? -I[H] : -N[H],
          J = t.elements.arrow,
          $ = T && J ? (0, Unidentified948.default)(J) : {
            width: 0,
            height: 0
          },
          Z = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : (0, Unidentified969.default)(),
          ee = Z[F],
          te = Z[q],
          ne = (0, within.within)(0, N[H], $[H]),
          re = z ? N[H] / 2 - j - ne - ee - k.mainAxis : V - ne - ee - k.mainAxis,
          ie = z ? -N[H] / 2 + j + ne + te + k.mainAxis : K + ne + te + k.mainAxis,
          ae = t.elements.arrow && (0, Unidentified952.default)(t.elements.arrow),
          se = ae ? "y" === O ? ae.clientTop || 0 : ae.clientLeft || 0 : 0,
          oe = null != (W = null == P ? void 0 : P[O]) ? W : 0,
          ce = U + re - oe - se,
          le = U + ie - oe,
          ue = (0, within.within)(T ? (0, max.min)(G, ce) : G, U, T ? (0, max.max)(X, le) : X);
        D[O] = ue, Y[O] = ue - U;
      }
      if (A) {
        var de,
          he = "x" === O ? afterMain.top : afterMain.left,
          pe = "x" === O ? afterMain.bottom : afterMain.right,
          fe = D[B],
          me = "y" === B ? "height" : "width",
          Me = fe + E[he],
          _e = fe - E[pe],
          Ae = -1 !== [afterMain.top, afterMain.left].indexOf(x),
          ge = null != (de = null == P ? void 0 : P[B]) ? de : 0,
          be = Ae ? Me : fe - N[me] - I[me] - ge + k.altAxis,
          ye = Ae ? fe + N[me] + I[me] - ge - k.altAxis : _e,
          Le = T && Ae ? (0, within.withinMaxClamp)(be, fe, ye) : (0, within.within)(T ? be : Me, fe, T ? ye : _e);
        D[B] = Le, Y[B] = Le - fe;
      }
      t.modifiersData[f] = Y;
    }
  },
  requiresIfExists: ["offset"]
};
export { defaultExport as default };
