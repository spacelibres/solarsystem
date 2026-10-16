/** @eyes-analysis
 * 文件职责：Popper 浮层定位：识别参考被裁剪或浮层逃逸并设置 data 属性
 * 依据：// Recovered from vendors.js:1108987-1109825.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1108987-1109825.
import * as afterMain from "./afterMain-194.js";
import * as Unidentified197 from "./Unidentified197.js";
let defaultExport;
function a(e, t, n) {
  return void 0 === n && (n = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - n.y,
    right: e.right - t.width + n.x,
    bottom: e.bottom - t.height + n.y,
    left: e.left - t.width - n.x
  };
}
function s(e) {
  return [afterMain.top, afterMain.right, afterMain.bottom, afterMain.left].some(function (t) {
    return e[t] >= 0;
  });
}
defaultExport = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: function (e) {
    var t = e.state,
      n = e.name,
      r = t.rects.reference,
      o = t.rects.popper,
      c = t.modifiersData.preventOverflow,
      l = (0, Unidentified197.default)(t, {
        elementContext: "reference"
      }),
      u = (0, Unidentified197.default)(t, {
        altBoundary: !0
      }),
      d = a(l, r),
      h = a(u, o, c),
      p = s(d),
      f = s(h);
    t.modifiersData[n] = {
      referenceClippingOffsets: d,
      popperEscapeOffsets: h,
      isReferenceHidden: p,
      hasPopperEscaped: f
    }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-reference-hidden": p,
      "data-popper-escaped": f
    });
  }
};
export { defaultExport as default };
