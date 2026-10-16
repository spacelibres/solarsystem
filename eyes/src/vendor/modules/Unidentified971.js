// Recovered from vendors.js:2392901-2393503.
import * as Unidentified933 from "./Unidentified933.js";
let defaultExport;
var i = {
  passive: !0
};
defaultExport = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function () {},
  effect: function (e) {
    var t = e.state,
      n = e.instance,
      a = e.options,
      s = a.scroll,
      o = void 0 === s || s,
      c = a.resize,
      l = void 0 === c || c,
      u = (0, Unidentified933.default)(t.elements.popper),
      d = [].concat(t.scrollParents.reference, t.scrollParents.popper);
    return o && d.forEach(function (e) {
      e.addEventListener("scroll", n.update, i);
    }), l && u.addEventListener("resize", n.update, i), function () {
      o && d.forEach(function (e) {
        e.removeEventListener("scroll", n.update, i);
      }), l && u.removeEventListener("resize", n.update, i);
    };
  },
  data: {}
};
export { defaultExport as default };
