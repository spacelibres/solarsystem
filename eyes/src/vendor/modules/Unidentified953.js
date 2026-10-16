/** @eyes-analysis
 * 文件职责：Popper 浮层定位：判断 table、td、th 类型
 * 依据：// Recovered from vendors.js:2385262-2385419.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2385262-2385419.
import * as Unidentified931 from "./Unidentified931.js";
function i(e) {
  return ["table", "td", "th"].indexOf((0, Unidentified931.default)(e)) >= 0;
}
export { i as default };
