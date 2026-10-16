/** @eyes-analysis
 * 文件职责：Popper 浮层定位：通过节点所属 window 读取计算样式
 * 依据：// Recovered from vendors.js:2382942-2383087.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2382942-2383087.
import * as Unidentified933 from "./Unidentified933.js";
function i(e) {
  return (0, Unidentified933.default)(e).getComputedStyle(e);
}
export { i as default };
