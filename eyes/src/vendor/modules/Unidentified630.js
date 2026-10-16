/** @eyes-analysis
 * 文件职责：展开偏心率的子午线弧长级数系数
 * 依据：// Recovered from vendors.js:1800340-1800734.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1800340-1800734.
var r = 1,
  i = .25,
  a = .046875,
  s = .01953125,
  o = .01068115234375,
  c = .75,
  l = .46875,
  u = .013020833333333334,
  d = .007120768229166667,
  h = .3645833333333333,
  p = .005696614583333333,
  f = .3076171875;
function m(e) {
  var t = [];
  t[0] = r - e * (i + e * (a + e * (s + e * o))), t[1] = e * (c - e * (a + e * (s + e * o)));
  var n = e * e;
  return t[2] = n * (l - e * (u + e * d)), n *= e, t[3] = n * (h - e * p), t[4] = n * e * f, t;
}
export { m as default };
