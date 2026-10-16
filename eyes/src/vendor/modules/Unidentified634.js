/** @eyes-analysis
 * 文件职责：通过指数函数计算双曲正弦
 * 依据：// Recovered from vendors.js:1804625-1804750.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1804625-1804750.
function r(e) {
  var t = Math.exp(e);
  return t = (t - 1 / t) / 2;
}
export { r as default };
