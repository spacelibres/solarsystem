// Recovered from vendors.js:1700126-1703434.
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
import * as Dom7Entry from "./Dom7Entry.js";
function a({
  swiper: swiper,
  extendParams: extendParams,
  on: on
}) {
  extendParams({
    thumbs: {
      swiper: null,
      multipleActiveThumbs: !0,
      autoScrollOffset: 0,
      slideThumbActiveClass: "swiper-slide-thumb-active",
      thumbsContainerClass: "swiper-thumbs"
    }
  });
  let a = !1,
    s = !1;
  function o() {
    const t = swiper.thumbs.swiper;
    if (!t) return;
    const n = t.clickedIndex,
      r = t.clickedSlide;
    if (r && (0, Dom7Entry.default)(r).hasClass(swiper.params.thumbs.slideThumbActiveClass)) return;
    if (null == n) return;
    let a;
    if (a = t.params.loop ? parseInt((0, Dom7Entry.default)(t.clickedSlide).attr("data-swiper-slide-index"), 10) : n, swiper.params.loop) {
      let t = swiper.activeIndex;
      swiper.slides.eq(t).hasClass(swiper.params.slideDuplicateClass) && (swiper.loopFix(), swiper._clientLeft = swiper.$wrapperEl[0].clientLeft, t = swiper.activeIndex);
      const n = swiper.slides.eq(t).prevAll(`[data-swiper-slide-index="${a}"]`).eq(0).index(),
        r = swiper.slides.eq(t).nextAll(`[data-swiper-slide-index="${a}"]`).eq(0).index();
      a = void 0 === n ? r : void 0 === r ? n : r - t < t - n ? r : n;
    }
    swiper.slideTo(a);
  }
  function c() {
    const {
      thumbs: thumbs
    } = swiper.params;
    if (a) return !1;
    a = !0;
    const n = swiper.constructor;
    if (thumbs.swiper instanceof n) swiper.thumbs.swiper = thumbs.swiper, Object.assign(swiper.thumbs.swiper.originalParams, {
      watchSlidesProgress: !0,
      slideToClickedSlide: !1
    }), Object.assign(swiper.thumbs.swiper.params, {
      watchSlidesProgress: !0,
      slideToClickedSlide: !1
    });else if ((0, animateCSSModeScroll.isObject)(thumbs.swiper)) {
      const r = Object.assign({}, thumbs.swiper);
      Object.assign(r, {
        watchSlidesProgress: !0,
        slideToClickedSlide: !1
      }), swiper.thumbs.swiper = new n(r), s = !0;
    }
    return swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass), swiper.thumbs.swiper.on("tap", o), !0;
  }
  function l(t) {
    const n = swiper.thumbs.swiper;
    if (!n) return;
    const r = "auto" === n.params.slidesPerView ? n.slidesPerViewDynamic() : n.params.slidesPerView,
      i = swiper.params.thumbs.autoScrollOffset,
      a = i && !n.params.loop;
    if (swiper.realIndex !== n.realIndex || a) {
      let s,
        o,
        c = n.activeIndex;
      if (n.params.loop) {
        n.slides.eq(c).hasClass(n.params.slideDuplicateClass) && (n.loopFix(), n._clientLeft = n.$wrapperEl[0].clientLeft, c = n.activeIndex);
        const t = n.slides.eq(c).prevAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index(),
          r = n.slides.eq(c).nextAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index();
        s = void 0 === t ? r : void 0 === r ? t : r - c === c - t ? n.params.slidesPerGroup > 1 ? r : c : r - c < c - t ? r : t, o = swiper.activeIndex > swiper.previousIndex ? "next" : "prev";
      } else s = swiper.realIndex, o = s > swiper.previousIndex ? "next" : "prev";
      a && (s += "next" === o ? i : -1 * i), n.visibleSlidesIndexes && n.visibleSlidesIndexes.indexOf(s) < 0 && (n.params.centeredSlides ? s = s > c ? s - Math.floor(r / 2) + 1 : s + Math.floor(r / 2) - 1 : s > c && n.params.slidesPerGroup, n.slideTo(s, t ? 0 : void 0));
    }
    let s = 1;
    const o = swiper.params.thumbs.slideThumbActiveClass;
    if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides && (s = swiper.params.slidesPerView), swiper.params.thumbs.multipleActiveThumbs || (s = 1), s = Math.floor(s), n.slides.removeClass(o), n.params.loop || n.params.virtual && n.params.virtual.enabled) for (let t = 0; t < s; t += 1) n.$wrapperEl.children(`[data-swiper-slide-index="${swiper.realIndex + t}"]`).addClass(o);else for (let t = 0; t < s; t += 1) n.slides.eq(swiper.realIndex + t).addClass(o);
  }
  swiper.thumbs = {
    swiper: null
  }, on("beforeInit", () => {
    const {
      thumbs: thumbs
    } = swiper.params;
    thumbs && thumbs.swiper && (c(), l(!0));
  }), on("slideChange update resize observerUpdate", () => {
    swiper.thumbs.swiper && l();
  }), on("setTransition", (t, n) => {
    const r = swiper.thumbs.swiper;
    r && r.setTransition(n);
  }), on("beforeDestroy", () => {
    const t = swiper.thumbs.swiper;
    t && s && t && t.destroy();
  }), Object.assign(swiper.thumbs, {
    init: c,
    update: l
  });
}
export { a as default };
