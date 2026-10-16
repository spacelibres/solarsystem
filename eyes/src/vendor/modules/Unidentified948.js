/** @eyes-analysis
 * 文件职责：Popper 浮层定位：返回 offset 布局矩形并校正一像素内的测量差
 * 依据：// Recovered from vendors.js:2383088-2383375.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2383088-2383375.
import * as Unidentified937 from "./Unidentified937.js";
function i(e) {
  var t = (0, Unidentified937.default)(e),
    n = e.offsetWidth,
    i = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - i) <= 1 && (i = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: i
  };
}
export { i as default };
