// Recovered from vendors.js:1095887-1096272.
import * as Unidentified172 from "./Unidentified172.js";
import * as Unidentified184 from "./Unidentified184.js";
import * as Unidentified183 from "./Unidentified183.js";
import * as Unidentified178 from "./Unidentified178.js";
function o(e, t) {
  var n = (0, Unidentified172.default)(e),
    o = (0, Unidentified184.default)(e),
    c = n.visualViewport,
    l = o.clientWidth,
    u = o.clientHeight,
    d = 0,
    h = 0;
  if (c) {
    l = c.width, u = c.height;
    var p = (0, Unidentified178.default)();
    (p || !p && "fixed" === t) && (d = c.offsetLeft, h = c.offsetTop);
  }
  return {
    width: l,
    height: u,
    x: d + (0, Unidentified183.default)(e),
    y: h
  };
}
export { o as default };
