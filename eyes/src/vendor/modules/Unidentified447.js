/** @eyes-analysis
 * 文件职责：重算响应式断点、容器与滑片尺寸，恢复索引和导航锁
 * 依据：// Recovered from vendors.js:1636506-1637169.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1636506-1637169.
function r() {
  const e = this,
    {
      params: params,
      el: el
    } = e;
  if (el && 0 === el.offsetWidth) return;
  params.breakpoints && e.setBreakpoint();
  const {
    allowSlideNext: allowSlideNext,
    allowSlidePrev: allowSlidePrev,
    snapGrid: snapGrid
  } = e;
  e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses(), ("auto" === params.slidesPerView || params.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(), e.allowSlidePrev = allowSlidePrev, e.allowSlideNext = allowSlideNext, e.params.watchOverflow && snapGrid !== e.snapGrid && e.checkOverflow();
}
export { r as default };
