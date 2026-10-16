// Recovered from vendors.js:2374868-2375923.
import * as Unidentified931 from "./Unidentified931.js";
import * as isElement from "./isElement-932.js";
let defaultExport;
defaultExport = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: function (e) {
    var t = e.state;
    Object.keys(t.elements).forEach(function (e) {
      var n = t.styles[e] || {},
        a = t.attributes[e] || {},
        s = t.elements[e];
      (0, isElement.isHTMLElement)(s) && (0, Unidentified931.default)(s) && (Object.assign(s.style, n), Object.keys(a).forEach(function (e) {
        var t = a[e];
        !1 === t ? s.removeAttribute(e) : s.setAttribute(e, !0 === t ? "" : t);
      }));
    });
  },
  effect: function (e) {
    var t = e.state,
      n = {
        popper: {
          position: t.options.strategy,
          left: "0",
          top: "0",
          margin: "0"
        },
        arrow: {
          position: "absolute"
        },
        reference: {}
      };
    return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function () {
      Object.keys(t.elements).forEach(function (e) {
        var a = t.elements[e],
          s = t.attributes[e] || {},
          o = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce(function (e, t) {
            return e[t] = "", e;
          }, {});
        (0, isElement.isHTMLElement)(a) && (0, Unidentified931.default)(a) && (Object.assign(a.style, o), Object.keys(s).forEach(function (e) {
          a.removeAttribute(e);
        }));
      });
    };
  },
  requires: ["computeStyles"]
};
export { defaultExport as default };
