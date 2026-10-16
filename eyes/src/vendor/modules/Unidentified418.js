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
