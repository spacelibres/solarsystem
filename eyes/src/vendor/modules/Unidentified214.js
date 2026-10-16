/** @eyes-analysis
 * 文件职责：Popper 浮层定位：根据溢出程度切换首选方向及候选方向
 * 依据：// Recovered from vendors.js:1102689-1104307.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1102689-1104307.
import * as Unidentified215 from "./Unidentified215.js";
import * as Unidentified204 from "./Unidentified204.js";
import * as Unidentified216 from "./Unidentified216.js";
import * as Unidentified197 from "./Unidentified197.js";
import * as Unidentified217 from "./Unidentified217.js";
import * as afterMain from "./afterMain-194.js";
import * as Unidentified205 from "./Unidentified205.js";
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
      for (var d = n.mainAxis, h = void 0 === d || d, p = n.altAxis, f = void 0 === p || p, m = n.fallbackPlacements, M = n.padding, _ = n.boundary, A = n.rootBoundary, g = n.altBoundary, b = n.flipVariations, y = void 0 === b || b, L = n.allowedAutoPlacements, v = t.options.placement, T = (0, Unidentified204.default)(v), S = m || (T === v || !y ? [(0, Unidentified215.default)(v)] : function (e) {
          if ((0, Unidentified204.default)(e) === afterMain.auto) return [];
          var t = (0, Unidentified215.default)(e);
          return [(0, Unidentified216.default)(e), t, (0, Unidentified216.default)(t)];
        }(v)), w = [v].concat(S).reduce(function (e, n) {
          return e.concat((0, Unidentified204.default)(n) === afterMain.auto ? (0, Unidentified217.default)(t, {
            placement: n,
            boundary: _,
            rootBoundary: A,
            padding: M,
            flipVariations: y,
            allowedAutoPlacements: L
          }) : n);
        }, []), E = t.rects.reference, x = t.rects.popper, map = new Map(), z = !0, O = w[0], B = 0; B < w.length; B++) {
        var D = w[B],
          N = (0, Unidentified204.default)(D),
          I = (0, Unidentified205.default)(D) === afterMain.start,
          R = [afterMain.top, afterMain.bottom].indexOf(N) >= 0,
          k = R ? "width" : "height",
          P = (0, Unidentified197.default)(t, {
            placement: D,
            boundary: _,
            rootBoundary: A,
            altBoundary: g,
            padding: M
          }),
          Y = R ? I ? afterMain.right : afterMain.left : I ? afterMain.bottom : afterMain.top;
        E[k] > x[k] && (Y = (0, Unidentified215.default)(Y));
        var W = (0, Unidentified215.default)(Y),
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
