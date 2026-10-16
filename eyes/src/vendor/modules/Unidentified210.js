// Recovered from vendors.js:1098706-1099308.
import * as Unidentified172 from "./Unidentified172.js";
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
      u = (0, Unidentified172.default)(t.elements.popper),
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
