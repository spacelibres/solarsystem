/** @eyes-analysis
 * 文件职责：Clenshaw 递推计算实正弦级数
 * 依据：// Recovered from vendors.js:1805476-1805666.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1805476-1805666.
function r(e, t) {
  for (var n, r = 2 * Math.cos(t), i = e.length - 1, a = e[i], s = 0; --i >= 0;) n = r * a - s + e[i], s = a, a = n;
  return Math.sin(t) * n;
}
export { r as default };
