/** @eyes-analysis
 * 文件职责：Popper 浮层定位：计算布局/视觉视口尺寸和偏移
 * 依据：// Recovered from vendors.js:2390082-2390467.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
