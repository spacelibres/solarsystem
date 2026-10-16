/** @eyes-analysis
 * 文件职责：Popper 浮层定位：交换 start/end 对齐
 * 依据：// Recovered from vendors.js:1104526-1104703.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1104526-1104703.
var r = {
  start: "end",
  end: "start"
};
function i(e) {
  return e.replace(/start|end/g, function (e) {
    return r[e];
  });
}
export { i as default };
