/** @eyes-analysis
 * 文件职责：Popper 浮层定位：把计算样式和属性应用到浮层、箭头、参考元素，并在清理时撤销
 * 依据：// Recovered from vendors.js:1080673-1081728.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1080673-1081728.
import * as Unidentified170 from "./Unidentified170.js";
import * as isElement from "./isElement-171.js";
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
      (0, isElement.isHTMLElement)(s) && (0, Unidentified170.default)(s) && (Object.assign(s.style, n), Object.keys(a).forEach(function (e) {
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
        (0, isElement.isHTMLElement)(a) && (0, Unidentified170.default)(a) && (Object.assign(a.style, o), Object.keys(s).forEach(function (e) {
          a.removeAttribute(e);
        }));
      });
    };
  },
  requires: ["computeStyles"]
};
export { defaultExport as default };
