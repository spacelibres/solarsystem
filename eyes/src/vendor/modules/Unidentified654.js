/** @eyes-analysis
 * 文件职责：子午线弧零阶系数
 * 依据：// Recovered from vendors.js:1824794-1824917.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1824794-1824917.
function r(e) {
  return 1 - .25 * e * (1 + e / 16 * (3 + 1.25 * e));
}
export { r as default };
