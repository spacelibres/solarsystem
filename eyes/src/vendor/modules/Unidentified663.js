/** @eyes-analysis
 * 文件职责：计算等积纬度逆变换级数系数
 * 依据：// Recovered from vendors.js:1829908-1830214.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1829908-1830214.
var r = .3333333333333333,
  i = .17222222222222222,
  a = .10257936507936508,
  s = .06388888888888888,
  o = .0664021164021164,
  c = .016415012942191543;
function l(e) {
  var t,
    n = [];
  return n[0] = e * r, t = e * e, n[0] += t * i, n[1] = t * s, t *= e, n[0] += t * a, n[1] += t * o, n[2] = t * c, n;
}
export { l as default };
