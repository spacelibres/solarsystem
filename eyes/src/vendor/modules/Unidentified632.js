/** @eyes-analysis
 * 文件职责：最多 20 次 Newton 迭代反求子午线弧长对应纬度
 * 依据：// Recovered from vendors.js:1800888-1801171.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1800888-1801171.
import * as Unidentified631 from "./Unidentified631.js";
import * as D2R from "./D2R.js";
var a = 20;
function s(e, t, n) {
  for (var s = 1 / (1 - t), o = e, c = a; c; --c) {
    var l = Math.sin(o),
      u = 1 - t * l * l;
    if (o -= u = ((0, Unidentified631.default)(o, l, Math.cos(o), n) - e) * (u * Math.sqrt(u)) * s, Math.abs(u) < D2R.EPSLN) return o;
  }
  return o;
}
export { s as default };
