// Recovered from vendors.js:2383376-2383738.
import * as Unidentified950 from "./Unidentified950.js";
import * as Unidentified951 from "./Unidentified951.js";
import * as Unidentified933 from "./Unidentified933.js";
import * as Unidentified946 from "./Unidentified946.js";
function o(e, t) {
  var n;
  void 0 === t && (t = []);
  var c = (0, Unidentified950.default)(e),
    l = c === (null == (n = e.ownerDocument) ? void 0 : n.body),
    u = (0, Unidentified933.default)(c),
    d = l ? [u].concat(u.visualViewport || [], (0, Unidentified946.default)(c) ? c : []) : c,
    h = t.concat(d);
  return l ? h : h.concat(o((0, Unidentified951.default)(d)));
}
export { o as default };
