/** @eyes-analysis
 * 文件职责：Popper 浮层定位：交换 top/bottom 和 left/right
 * 依据：// Recovered from vendors.js:1104308-1104525.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1104308-1104525.
var r = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function i(e) {
  return e.replace(/left|right|bottom|top/g, function (e) {
    return r[e];
  });
}
export { i as default };
