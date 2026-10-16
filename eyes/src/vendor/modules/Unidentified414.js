/** @eyes-analysis
 * 文件职责：实现 updateSlidesClasses；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1610655-1612437.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1610655-1612437.
function r() {
  const e = this,
    {
      slides: slides,
      params: params,
      $wrapperEl: $wrapperEl,
      activeIndex: activeIndex,
      realIndex: realIndex
    } = e,
    s = e.virtual && params.virtual.enabled;
  let o;
  slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`), o = s ? e.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`) : slides.eq(activeIndex), o.addClass(params.slideActiveClass), params.loop && (o.hasClass(params.slideDuplicateClass) ? $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass) : $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass));
  let c = o.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);
  params.loop && 0 === c.length && (c = slides.eq(0), c.addClass(params.slideNextClass));
  let l = o.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);
  params.loop && 0 === l.length && (l = slides.eq(-1), l.addClass(params.slidePrevClass)), params.loop && (c.hasClass(params.slideDuplicateClass) ? $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${c.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass) : $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${c.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass), l.hasClass(params.slideDuplicateClass) ? $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass) : $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass)), e.emitSlidesClasses();
}
export { r as default };
