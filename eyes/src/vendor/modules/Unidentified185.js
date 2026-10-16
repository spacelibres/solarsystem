/** @eyes-analysis
 * 文件职责：Popper 浮层定位：依据 overflow/overflowX/overflowY 判断滚动裁剪祖先
 * 依据：// Recovered from vendors.js:1088533-1088746.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1088533-1088746.
import * as Unidentified186 from "./Unidentified186.js";
function i(e) {
  var t = (0, Unidentified186.default)(e),
    n = t.overflow,
    i = t.overflowX,
    a = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + a + i);
}
export { i as default };
