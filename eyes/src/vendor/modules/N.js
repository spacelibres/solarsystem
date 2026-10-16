/** @eyes-analysis
 * 文件职责：将超出范围的经度按 2π 折回；允许 force 参数保留输入
 * 依据：// Recovered from vendors.js:1754757-1754929.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1754757-1754929.
import * as D2R from "./D2R.js";
import * as Unidentified611 from "./Unidentified611.js";
function a(e, t) {
  return t || Math.abs(e) <= D2R.SPI ? e : e - (0, Unidentified611.default)(e) * D2R.TWO_PI;
}
export { a as default };
