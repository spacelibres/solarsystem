/** @eyes-analysis
 * 文件职责：使用纬度、正余弦和级数系数计算子午线弧长
 * 依据：// Recovered from vendors.js:1800735-1800887.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1800735-1800887.
function r(e, t, n, r) {
  return n *= t, t *= t, r[0] * e - n * (r[1] + t * (r[2] + t * (r[3] + t * r[4])));
}
export { r as default };
