// Recovered from vendors.js:2396884-2398502.
import * as Unidentified976 from "./Unidentified976.js";
import * as Unidentified965 from "./Unidentified965.js";
import * as Unidentified977 from "./Unidentified977.js";
import * as Unidentified958 from "./Unidentified958.js";
import * as Unidentified978 from "./Unidentified978.js";
import * as afterMain from "./afterMain-955.js";
import * as Unidentified966 from "./Unidentified966.js";
let defaultExport;
defaultExport = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: function (e) {
    var t = e.state,
      n = e.options,
      u = e.name;
    if (!t.modifiersData[u]._skip) {
      for (var d = n.mainAxis, h = void 0 === d || d, p = n.altAxis, f = void 0 === p || p, m = n.fallbackPlacements, M = n.padding, _ = n.boundary, A = n.rootBoundary, g = n.altBoundary, b = n.flipVariations, y = void 0 === b || b, L = n.allowedAutoPlacements, v = t.options.placement, T = (0, Unidentified965.default)(v), S = m || (T === v || !y ? [(0, Unidentified976.default)(v)] : function (e) {
          if ((0, Unidentified965.default)(e) === afterMain.auto) return [];
          var t = (0, Unidentified976.default)(e);
          return [(0, Unidentified977.default)(e), t, (0, Unidentified977.default)(t)];
        }(v)), w = [v].concat(S).reduce(function (e, n) {
          return e.concat((0, Unidentified965.default)(n) === afterMain.auto ? (0, Unidentified978.default)(t, {
            placement: n,
            boundary: _,
            rootBoundary: A,
            padding: M,
            flipVariations: y,
            allowedAutoPlacements: L
          }) : n);
        }, []), E = t.rects.reference, x = t.rects.popper, map = new Map(), z = !0, O = w[0], B = 0; B < w.length; B++) {
        var D = w[B],
          N = (0, Unidentified965.default)(D),
          I = (0, Unidentified966.default)(D) === afterMain.start,
          R = [afterMain.top, afterMain.bottom].indexOf(N) >= 0,
          k = R ? "width" : "height",
          P = (0, Unidentified958.default)(t, {
            placement: D,
            boundary: _,
            rootBoundary: A,
            altBoundary: g,
            padding: M
          }),
          Y = R ? I ? afterMain.right : afterMain.left : I ? afterMain.bottom : afterMain.top;
        E[k] > x[k] && (Y = (0, Unidentified976.default)(Y));
        var W = (0, Unidentified976.default)(Y),
          F = [];
        if (h && F.push(P[N] <= 0), f && F.push(P[Y] <= 0, P[W] <= 0), F.every(function (e) {
          return e;
        })) {
          O = D, z = !1;
          break;
        }
        map.set(D, F);
      }
      if (z) for (var q = function (e) {
          var t = w.find(function (t) {
            var n = map.get(t);
            if (n) return n.slice(0, e).every(function (e) {
              return e;
            });
          });
          if (t) return O = t, "break";
        }, H = y ? 3 : 1; H > 0; H--) {
        if ("break" === q(H)) break;
      }
      t.placement !== O && (t.modifiersData[u]._skip = !0, t.placement = O, t.reset = !0);
    }
  },
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
export { defaultExport as default };
