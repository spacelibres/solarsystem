/** @eyes-analysis
 * 文件职责：最多 16 轮迭代反求等角纬度，失败返回 -9999
 * 依据：// Recovered from vendors.js:1755221-1755500.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1755221-1755500.
import * as D2R from "./D2R.js";
function i(e, t) {
  for (var n, i, a = .5 * e, s = D2R.HALF_PI - 2 * Math.atan(t), o = 0; o <= 15; o++) if (n = e * Math.sin(s), s += i = D2R.HALF_PI - 2 * Math.atan(t * Math.pow((1 - n) / (1 + n), a)) - s, Math.abs(i) <= 1e-10) return s;
  return -9999;
}
export { i as default };
