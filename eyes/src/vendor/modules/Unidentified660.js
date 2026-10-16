/** @eyes-analysis
 * 文件职责：最多 15 次迭代反求子午线弧纬度，失败返回 NaN
 * 依据：// Recovered from vendors.js:1825573-1825867.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1825573-1825867.
function r(e, t, n, r, i) {
  var a, s;
  a = e / t;
  for (var o = 0; o < 15; o++) if (a += s = (e - (t * a - n * Math.sin(2 * a) + r * Math.sin(4 * a) - i * Math.sin(6 * a))) / (t - 2 * n * Math.cos(2 * a) + 4 * r * Math.cos(4 * a) - 6 * i * Math.cos(6 * a)), Math.abs(s) <= 1e-10) return a;
  return NaN;
}
export { r as default };
