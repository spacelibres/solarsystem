// Recovered from vendors.js:2377623-2379859.
import * as Unidentified936 from "./Unidentified936.js";
import * as Unidentified948 from "./Unidentified948.js";
import * as Unidentified949 from "./Unidentified949.js";
import * as Unidentified952 from "./Unidentified952.js";
import * as Unidentified954 from "./Unidentified954.js";
import * as Unidentified956 from "./Unidentified956.js";
import * as Unidentified957 from "./Unidentified957.js";
import "./Unidentified958.js";
import * as isElement from "./isElement-932.js";
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
            reference: (0, isElement.isElement)(e) ? (0, Unidentified949.default)(e) : e.contextElement ? (0, Unidentified949.default)(e.contextElement) : [],
            popper: (0, Unidentified949.default)(t)
          };
          var i = (0, Unidentified954.default)((0, Unidentified957.default)([].concat(u, f.options.modifiers)));
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
                reference: (0, Unidentified936.default)(t, (0, Unidentified952.default)(n), "fixed" === f.options.strategy),
                popper: (0, Unidentified948.default)(n)
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
        update: (0, Unidentified956.default)(function () {
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
export { default as detectOverflow } from "./Unidentified958.js";
export { popperGenerator };
