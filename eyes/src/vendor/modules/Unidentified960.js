// Recovered from vendors.js:2390082-2390467.
import * as Unidentified933 from "./Unidentified933.js";
import * as Unidentified945 from "./Unidentified945.js";
import * as Unidentified944 from "./Unidentified944.js";
import * as Unidentified939 from "./Unidentified939.js";
function o(e, t) {
  var n = (0, Unidentified933.default)(e),
    o = (0, Unidentified945.default)(e),
    c = n.visualViewport,
    l = o.clientWidth,
    u = o.clientHeight,
    d = 0,
    h = 0;
  if (c) {
    l = c.width, u = c.height;
    var p = (0, Unidentified939.default)();
    (p || !p && "fixed" === t) && (d = c.offsetLeft, h = c.offsetTop);
  }
  return {
    width: l,
    height: u,
    x: d + (0, Unidentified944.default)(e),
    y: h
  };
}
export { o as default };
