/** @eyes-analysis
 * 文件职责：计算等积纬度辅助量 q
 * 依据：// Recovered from vendors.js:1829740-1829907.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1829740-1829907.
function r(e, t) {
  var n;
  return e > 1e-7 ? (1 - e * e) * (t / (1 - (n = e * t) * n) - .5 / e * Math.log((1 - n) / (1 + n))) : 2 * t;
}
export { r as default };
