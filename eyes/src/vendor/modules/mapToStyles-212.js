/** @eyes-analysis
 * 文件职责：提供 mapToStyles、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1099592-1101957.；exports: mapToStyles, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1099592-1101957.
import * as afterMain from "./afterMain-194.js";
import * as Unidentified191 from "./Unidentified191.js";
import * as Unidentified172 from "./Unidentified172.js";
import * as Unidentified184 from "./Unidentified184.js";
import * as Unidentified186 from "./Unidentified186.js";
import * as Unidentified204 from "./Unidentified204.js";
import * as Unidentified205 from "./Unidentified205.js";
import * as max from "./max-177.js";
let defaultExport;
var d = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function mapToStyles(e) {
  var t,
    n = e.popper,
    c = e.popperRect,
    l = e.placement,
    h = e.variation,
    p = e.offsets,
    f = e.position,
    m = e.gpuAcceleration,
    M = e.adaptive,
    _ = e.roundOffsets,
    A = e.isFixed,
    g = p.x,
    b = void 0 === g ? 0 : g,
    y = p.y,
    L = void 0 === y ? 0 : y,
    v = "function" == typeof _ ? _({
      x: b,
      y: L
    }) : {
      x: b,
      y: L
    };
  b = v.x, L = v.y;
  var T = p.hasOwnProperty("x"),
    S = p.hasOwnProperty("y"),
    w = afterMain.left,
    E = afterMain.top,
    x = window;
  if (M) {
    var C = (0, Unidentified191.default)(n),
      z = "clientHeight",
      O = "clientWidth";
    if (C === (0, Unidentified172.default)(n) && (C = (0, Unidentified184.default)(n), "static" !== (0, Unidentified186.default)(C).position && "absolute" === f && (z = "scrollHeight", O = "scrollWidth")), l === afterMain.top || (l === afterMain.left || l === afterMain.right) && h === afterMain.end) E = afterMain.bottom, L -= (A && C === x && x.visualViewport ? x.visualViewport.height : C[z]) - c.height, L *= m ? 1 : -1;
    if (l === afterMain.left || (l === afterMain.top || l === afterMain.bottom) && h === afterMain.end) w = afterMain.right, b -= (A && C === x && x.visualViewport ? x.visualViewport.width : C[O]) - c.width, b *= m ? 1 : -1;
  }
  var B,
    D = Object.assign({
      position: f
    }, M && d),
    N = !0 === _ ? function (e, t) {
      var n = e.x,
        r = e.y,
        i = t.devicePixelRatio || 1;
      return {
        x: (0, max.round)(n * i) / i || 0,
        y: (0, max.round)(r * i) / i || 0
      };
    }({
      x: b,
      y: L
    }, (0, Unidentified172.default)(n)) : {
      x: b,
      y: L
    };
  return b = N.x, L = N.y, m ? Object.assign({}, D, ((B = {})[E] = S ? "0" : "", B[w] = T ? "0" : "", B.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + b + "px, " + L + "px)" : "translate3d(" + b + "px, " + L + "px, 0)", B)) : Object.assign({}, D, ((t = {})[E] = S ? L + "px" : "", t[w] = T ? b + "px" : "", t.transform = "", t));
}
defaultExport = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: function (e) {
    var t = e.state,
      n = e.options,
      r = n.gpuAcceleration,
      i = void 0 === r || r,
      a = n.adaptive,
      s = void 0 === a || a,
      o = n.roundOffsets,
      u = void 0 === o || o,
      d = {
        placement: (0, Unidentified204.default)(t.placement),
        variation: (0, Unidentified205.default)(t.placement),
        popper: t.elements.popper,
        popperRect: t.rects.popper,
        gpuAcceleration: i,
        isFixed: "fixed" === t.options.strategy
      };
    null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, mapToStyles(Object.assign({}, d, {
      offsets: t.modifiersData.popperOffsets,
      position: t.options.strategy,
      adaptive: s,
      roundOffsets: u
    })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, mapToStyles(Object.assign({}, d, {
      offsets: t.modifiersData.arrow,
      position: "absolute",
      adaptive: !1,
      roundOffsets: u
    })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-placement": t.placement
    });
  },
  data: {}
};
export { mapToStyles };
export { defaultExport as default };
