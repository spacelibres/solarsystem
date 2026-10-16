// Recovered from vendors.js:1625519-1626109.
function r() {
  const e = this;
  e.emit("beforeLoopFix");
  const {
    activeIndex: activeIndex,
    slides: slides,
    loopedSlides: loopedSlides,
    allowSlidePrev: allowSlidePrev,
    allowSlideNext: allowSlideNext,
    snapGrid: snapGrid,
    rtlTranslate: rtlTranslate
  } = e;
  let c;
  e.allowSlidePrev = !0, e.allowSlideNext = !0;
  const l = -snapGrid[activeIndex] - e.getTranslate();
  if (activeIndex < loopedSlides) {
    c = slides.length - 3 * loopedSlides + activeIndex, c += loopedSlides;
    e.slideTo(c, 0, !1, !0) && 0 !== l && e.setTranslate((rtlTranslate ? -e.translate : e.translate) - l);
  } else if (activeIndex >= slides.length - loopedSlides) {
    c = -slides.length + activeIndex + loopedSlides, c += loopedSlides;
    e.slideTo(c, 0, !1, !0) && 0 !== l && e.setTranslate((rtlTranslate ? -e.translate : e.translate) - l);
  }
  e.allowSlidePrev = allowSlidePrev, e.allowSlideNext = allowSlideNext, e.emit("loopFix");
}
export { r as default };
