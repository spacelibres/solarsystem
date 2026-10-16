/** @eyes-analysis
 * 文件职责：按最大分量缩放计算二元范数，降低溢出
 * 依据：// Recovered from vendors.js:1804751-1804948.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1804751-1804948.
function r(e, t) {
  e = Math.abs(e), t = Math.abs(t);
  var n = Math.max(e, t),
    r = Math.min(e, t) / (n || 1);
  return n * Math.sqrt(1 + Math.pow(r, 2));
}
export { r as default };
