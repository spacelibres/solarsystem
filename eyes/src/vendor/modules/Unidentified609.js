/** @eyes-analysis
 * 文件职责：计算依偏心率和纬度正弦变化的椭球曲率半径
 * 依据：// Recovered from vendors.js:1754628-1754756.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1754628-1754756.
function r(e, t, n) {
  var r = e * t;
  return n / Math.sqrt(1 - r * r);
}
export { r as default };
