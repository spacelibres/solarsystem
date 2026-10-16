/** @eyes-analysis
 * 文件职责：通过正弦级数恢复等积变换纬度
 * 依据：// Recovered from vendors.js:1830215-1830381.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1830215-1830381.
function r(e, t) {
  var n = e + e;
  return e + t[0] * Math.sin(n) + t[1] * Math.sin(n + n) + t[2] * Math.sin(n + n + n);
}
export { r as default };
