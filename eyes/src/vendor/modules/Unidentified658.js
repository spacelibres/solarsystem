/** @eyes-analysis
 * 文件职责：计算卯酉圈曲率半径
 * 依据：// Recovered from vendors.js:1825274-1825402.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1825274-1825402.
function r(e, t, n) {
  var r = t * n;
  return e / Math.sqrt(1 - r * r);
}
export { r as default };
