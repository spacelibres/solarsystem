/** @eyes-analysis
 * 文件职责：对小量修正 log(1+x) 的舍入误差
 * 依据：// Recovered from vendors.js:1805143-1805278.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1805143-1805278.
function r(e) {
  var t = 1 + e,
    n = t - 1;
  return 0 === n ? e : e * Math.log(t) / n;
}
export { r as default };
