/** @eyes-analysis
 * 文件职责：Popper 浮层定位：将同一值分配给一组侧边键
 * 依据：// Recovered from vendors.js:2392759-2392900.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2392759-2392900.
function r(e, t) {
  return t.reduce(function (t, n) {
    return t[n] = e, t;
  }, {});
}
export { r as default };
