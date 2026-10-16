// Recovered from vendors.js:2403182-2404020.
import * as afterMain from "./afterMain-955.js";
import * as Unidentified958 from "./Unidentified958.js";
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
      l = (0, Unidentified958.default)(t, {
        elementContext: "reference"
      }),
      u = (0, Unidentified958.default)(t, {
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
