// Recovered from vendors.js:1623412-1624220.
import * as Dom7Entry from "./Dom7Entry.js";
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
function a() {
  const e = this,
    {
      params: params,
      $wrapperEl: $wrapperEl
    } = e,
    a = "auto" === params.slidesPerView ? e.slidesPerViewDynamic() : params.slidesPerView;
  let s,
    o = e.clickedIndex;
  if (params.loop) {
    if (e.animating) return;
    s = parseInt((0, Dom7Entry.default)(e.clickedSlide).attr("data-swiper-slide-index"), 10), params.centeredSlides ? o < e.loopedSlides - a / 2 || o > e.slides.length - e.loopedSlides + a / 2 ? (e.loopFix(), o = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${s}"]:not(.${params.slideDuplicateClass})`).eq(0).index(), (0, animateCSSModeScroll.nextTick)(() => {
      e.slideTo(o);
    })) : e.slideTo(o) : o > e.slides.length - a ? (e.loopFix(), o = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${s}"]:not(.${params.slideDuplicateClass})`).eq(0).index(), (0, animateCSSModeScroll.nextTick)(() => {
      e.slideTo(o);
    })) : e.slideTo(o);
  } else e.slideTo(o);
}
export { a as default };
