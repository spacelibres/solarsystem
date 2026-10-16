/** @eyes-analysis
 * 文件职责：实现 updateClickedSlide；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1613371-1613958.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1613371-1613958.
import * as Dom7Entry from "./Dom7Entry.js";
function i(e) {
  const t = this,
    n = t.params,
    i = (0, Dom7Entry.default)(e.target).closest(`.${n.slideClass}`)[0];
  let a,
    s = !1;
  if (i) for (let e = 0; e < t.slides.length; e += 1) if (t.slides[e] === i) {
    s = !0, a = e;
    break;
  }
  if (!i || !s) return t.clickedSlide = void 0, void (t.clickedIndex = void 0);
  t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt((0, Dom7Entry.default)(i).attr("data-swiper-slide-index"), 10) : t.clickedIndex = a, n.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide();
}
export { i as default };
