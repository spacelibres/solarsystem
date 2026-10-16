/** @eyes-analysis
 * 文件职责：计算椭球共形转换的幂比值
 * 依据：// Recovered from vendors.js:1809188-1809309.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1809188-1809309.
function r(e, t) {
  return Math.pow((1 - e) / (1 + e), t);
}
export { r as default };
