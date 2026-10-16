/** @eyes-analysis
 * 文件职责：实现 updateSlidesProgress；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1609104-1610041.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1609104-1610041.
import * as Dom7Entry from "./Dom7Entry.js";
function i(e = this && this.translate || 0) {
  const t = this,
    n = t.params,
    {
      slides: slides,
      rtlTranslate: rtlTranslate,
      snapGrid: snapGrid
    } = t;
  if (0 === slides.length) return;
  void 0 === slides[0].swiperSlideOffset && t.updateSlidesOffset();
  let o = -e;
  rtlTranslate && (o = e), slides.removeClass(n.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
  for (let e = 0; e < slides.length; e += 1) {
    const r = slides[e];
    let c = r.swiperSlideOffset;
    n.cssMode && n.centeredSlides && (c -= slides[0].swiperSlideOffset);
    const l = (o + (n.centeredSlides ? t.minTranslate() : 0) - c) / (r.swiperSlideSize + n.spaceBetween),
      u = (o - snapGrid[0] + (n.centeredSlides ? t.minTranslate() : 0) - c) / (r.swiperSlideSize + n.spaceBetween),
      d = -(o - c),
      h = d + t.slidesSizesGrid[e];
    (d >= 0 && d < t.size - 1 || h > 1 && h <= t.size || d <= 0 && h >= t.size) && (t.visibleSlides.push(r), t.visibleSlidesIndexes.push(e), slides.eq(e).addClass(n.slideVisibleClass)), r.progress = rtlTranslate ? -l : l, r.originalProgress = rtlTranslate ? -u : u;
  }
  t.visibleSlides = (0, Dom7Entry.default)(t.visibleSlides);
}
export { i as default };
