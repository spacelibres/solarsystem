/** @eyes-analysis
 * 文件职责：实现 getTranslate；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1614171-1614477.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1614171-1614477.
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
function i(e = this.isHorizontal() ? "x" : "y") {
  const {
    params: params,
    rtlTranslate: rtlTranslate,
    translate: translate,
    $wrapperEl: $wrapperEl
  } = this;
  if (params.virtualTranslate) return rtlTranslate ? -translate : translate;
  if (params.cssMode) return translate;
  let s = (0, animateCSSModeScroll.getTranslate)($wrapperEl[0], e);
  return rtlTranslate && (s = -s), s || 0;
}
export { i as default };
