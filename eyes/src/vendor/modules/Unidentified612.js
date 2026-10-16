/** @eyes-analysis
 * 文件职责：计算椭球等角纬度的指数辅助量
 * 依据：// Recovered from vendors.js:1755035-1755220.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1755035-1755220.
import * as D2R from "./D2R.js";
function i(e, t, n) {
  var i = e * n,
    a = .5 * e;
  return i = Math.pow((1 - i) / (1 + i), a), Math.tan(.5 * (D2R.HALF_PI - t)) / i;
}
export { i as default };
