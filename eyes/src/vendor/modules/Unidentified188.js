// Recovered from vendors.js:1089181-1089543.
import * as Unidentified189 from "./Unidentified189.js";
import * as Unidentified190 from "./Unidentified190.js";
import * as Unidentified172 from "./Unidentified172.js";
import * as Unidentified185 from "./Unidentified185.js";
function o(e, t) {
  var n;
  void 0 === t && (t = []);
  var c = (0, Unidentified189.default)(e),
    l = c === (null == (n = e.ownerDocument) ? void 0 : n.body),
    u = (0, Unidentified172.default)(c),
    d = l ? [u].concat(u.visualViewport || [], (0, Unidentified185.default)(c) ? c : []) : c,
    h = t.concat(d);
  return l ? h : h.concat(o((0, Unidentified190.default)(d)));
}
export { o as default };
