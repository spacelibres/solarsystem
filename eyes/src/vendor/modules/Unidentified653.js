/** @eyes-analysis
 * 文件职责：使用四项三角级数计算子午线弧
 * 依据：// Recovered from vendors.js:1824638-1824793.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1824638-1824793.
function r(e, t, n, r, i) {
  return e * i - t * Math.sin(2 * i) + n * Math.sin(4 * i) - r * Math.sin(6 * i);
}
export { r as default };
