/** @eyes-analysis
 * 文件职责：Popper 浮层定位：计算文档根元素与 window 滚动的横向差值
 * 依据：// Recovered from vendors.js:2382344-2382535.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2382344-2382535.
import * as Unidentified937 from "./Unidentified937.js";
import * as Unidentified945 from "./Unidentified945.js";
import * as Unidentified942 from "./Unidentified942.js";
function s(e) {
  return (0, Unidentified937.default)((0, Unidentified945.default)(e)).left + (0, Unidentified942.default)(e).scrollLeft;
}
export { s as default };
