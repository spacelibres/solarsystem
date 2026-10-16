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
