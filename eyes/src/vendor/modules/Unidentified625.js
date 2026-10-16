/** @eyes-analysis
 * 文件职责：拒绝非有限数坐标
 * 依据：// Recovered from vendors.js:1790212-1790554.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1790212-1790554.
function r(e) {
  i(e.x), i(e.y);
}
function i(e) {
  if ("function" == typeof Number.isFinite) {
    if (Number.isFinite(e)) return;
    throw new TypeError("coordinates must be finite numbers");
  }
  if ("number" != typeof e || e != e || !isFinite(e)) throw new TypeError("coordinates must be finite numbers");
}
export { r as default };
