/** @eyes-analysis
 * 文件职责：提供 createPopper、detectOverflow、popperGenerator；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1083428-1085664.；exports: createPopper, detectOverflow, popperGenerator
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1083428-1085664.
import * as Unidentified175 from "./Unidentified175.js";
import * as Unidentified187 from "./Unidentified187.js";
import * as Unidentified188 from "./Unidentified188.js";
import * as Unidentified191 from "./Unidentified191.js";
import * as Unidentified193 from "./Unidentified193.js";
import * as Unidentified195 from "./Unidentified195.js";
import * as Unidentified196 from "./Unidentified196.js";
import "./Unidentified197.js";
import * as isElement from "./isElement-171.js";
var h = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function p() {
  for (var e = arguments.length, array = new Array(e), n = 0; n < e; n++) array[n] = arguments[n];
  return !array.some(function (e) {
    return !(e && "function" == typeof e.getBoundingClientRect);
  });
}
function popperGenerator(e) {
  void 0 === e && (e = {});
  var t = e,
    n = t.defaultModifiers,
    u = void 0 === n ? [] : n,
    f = t.defaultOptions,
    m = void 0 === f ? h : f;
  return function (e, t, n) {
    void 0 === n && (n = m);
    var f = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, h, m),
        modifiersData: {},
        elements: {
          reference: e,
          popper: t
        },
        attributes: {},
        styles: {}
      },
      M = [],
      _ = !1,
      A = {
        state: f,
        setOptions: function (n) {
          var r = "function" == typeof n ? n(f.options) : n;
          g(), f.options = Object.assign({}, m, f.options, r), f.scrollParents = {
            reference: (0, isElement.isElement)(e) ? (0, Unidentified188.default)(e) : e.contextElement ? (0, Unidentified188.default)(e.contextElement) : [],
            popper: (0, Unidentified188.default)(t)
          };
          var i = (0, Unidentified193.default)((0, Unidentified196.default)([].concat(u, f.options.modifiers)));
          return f.orderedModifiers = i.filter(function (e) {
            return e.enabled;
          }), f.orderedModifiers.forEach(function (e) {
            var t = e.name,
              n = e.options,
              r = void 0 === n ? {} : n,
              i = e.effect;
            if ("function" == typeof i) {
              var a = i({
                  state: f,
                  name: t,
                  instance: A,
                  options: r
                }),
                s = function () {};
              M.push(a || s);
            }
          }), A.update();
        },
        forceUpdate: function () {
          if (!_) {
            var e = f.elements,
              t = e.reference,
              n = e.popper;
            if (p(t, n)) {
              f.rects = {
                reference: (0, Unidentified175.default)(t, (0, Unidentified191.default)(n), "fixed" === f.options.strategy),
                popper: (0, Unidentified187.default)(n)
              }, f.reset = !1, f.placement = f.options.placement, f.orderedModifiers.forEach(function (e) {
                return f.modifiersData[e.name] = Object.assign({}, e.data);
              });
              for (var a = 0; a < f.orderedModifiers.length; a++) if (!0 !== f.reset) {
                var o = f.orderedModifiers[a],
                  c = o.fn,
                  l = o.options,
                  u = void 0 === l ? {} : l,
                  d = o.name;
                "function" == typeof c && (f = c({
                  state: f,
                  options: u,
                  name: d,
                  instance: A
                }) || f);
              } else f.reset = !1, a = -1;
            }
          }
        },
        update: (0, Unidentified195.default)(function () {
          return new Promise(function (e) {
            A.forceUpdate(), e(f);
          });
        }),
        destroy: function () {
          g(), _ = !0;
        }
      };
    if (!p(e, t)) return A;
    function g() {
      M.forEach(function (e) {
        return e();
      }), M = [];
    }
    return A.setOptions(n).then(function (e) {
      !_ && n.onFirstUpdate && n.onFirstUpdate(e);
    }), A;
  };
}
var createPopper = popperGenerator();
export { createPopper };
export { default as detectOverflow } from "./Unidentified197.js";
export { popperGenerator };
