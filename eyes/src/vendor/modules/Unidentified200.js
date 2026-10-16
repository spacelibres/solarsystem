// Recovered from vendors.js:1096273-1096825.
import * as Unidentified184 from "./Unidentified184.js";
import * as Unidentified186 from "./Unidentified186.js";
import * as Unidentified183 from "./Unidentified183.js";
import * as Unidentified181 from "./Unidentified181.js";
import * as max from "./max-177.js";
function c(e) {
  var t,
    n = (0, Unidentified184.default)(e),
    c = (0, Unidentified181.default)(e),
    l = null == (t = e.ownerDocument) ? void 0 : t.body,
    u = (0, max.max)(n.scrollWidth, n.clientWidth, l ? l.scrollWidth : 0, l ? l.clientWidth : 0),
    d = (0, max.max)(n.scrollHeight, n.clientHeight, l ? l.scrollHeight : 0, l ? l.clientHeight : 0),
    h = -c.scrollLeft + (0, Unidentified183.default)(e),
    p = -c.scrollTop;
  return "rtl" === (0, Unidentified186.default)(l || n).direction && (h += (0, max.max)(n.clientWidth, l ? l.clientWidth : 0) - u), {
    width: u,
    height: d,
    x: h,
    y: p
  };
}
export { c as default };
