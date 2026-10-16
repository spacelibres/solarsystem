// Recovered from vendors.js:1618305-1621224.
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
function i(e = 0, t = this.params.speed, n = !0, i, a) {
  if ("number" != typeof e && "string" != typeof e) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);
  if ("string" == typeof e) {
    const t = parseInt(e, 10);
    if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
    e = t;
  }
  const s = this;
  let o = e;
  o < 0 && (o = 0);
  const {
    params: params,
    snapGrid: snapGrid,
    slidesGrid: slidesGrid,
    previousIndex: previousIndex,
    activeIndex: activeIndex,
    rtlTranslate: rtlTranslate,
    wrapperEl: wrapperEl,
    enabled: enabled
  } = s;
  if (s.animating && params.preventInteractionOnTransition || !enabled && !i && !a) return !1;
  const M = Math.min(s.params.slidesPerGroupSkip, o);
  let _ = M + Math.floor((o - M) / s.params.slidesPerGroup);
  _ >= snapGrid.length && (_ = snapGrid.length - 1), (activeIndex || params.initialSlide || 0) === (previousIndex || 0) && n && s.emit("beforeSlideChangeStart");
  const A = -snapGrid[_];
  if (s.updateProgress(A), params.normalizeSlideIndex) for (let e = 0; e < slidesGrid.length; e += 1) {
    const t = -Math.floor(100 * A),
      n = Math.floor(100 * slidesGrid[e]),
      r = Math.floor(100 * slidesGrid[e + 1]);
    void 0 !== slidesGrid[e + 1] ? t >= n && t < r - (r - n) / 2 ? o = e : t >= n && t < r && (o = e + 1) : t >= n && (o = e);
  }
  if (s.initialized && o !== activeIndex) {
    if (!s.allowSlideNext && A < s.translate && A < s.minTranslate()) return !1;
    if (!s.allowSlidePrev && A > s.translate && A > s.maxTranslate() && (activeIndex || 0) !== o) return !1;
  }
  let g;
  if (g = o > activeIndex ? "next" : o < activeIndex ? "prev" : "reset", rtlTranslate && -A === s.translate || !rtlTranslate && A === s.translate) return s.updateActiveIndex(o), params.autoHeight && s.updateAutoHeight(), s.updateSlidesClasses(), "slide" !== params.effect && s.setTranslate(A), "reset" !== g && (s.transitionStart(n, g), s.transitionEnd(n, g)), !1;
  if (params.cssMode) {
    const e = s.isHorizontal(),
      n = rtlTranslate ? A : -A;
    if (0 === t) {
      const t = s.virtual && s.params.virtual.enabled;
      t && (s.wrapperEl.style.scrollSnapType = "none", s._immediateVirtual = !0), wrapperEl[e ? "scrollLeft" : "scrollTop"] = n, t && requestAnimationFrame(() => {
        s.wrapperEl.style.scrollSnapType = "", s._swiperImmediateVirtual = !1;
      });
    } else {
      if (!s.support.smoothScroll) return (0, animateCSSModeScroll.animateCSSModeScroll)({
        swiper: s,
        targetPosition: n,
        side: e ? "left" : "top"
      }), !0;
      wrapperEl.scrollTo({
        [e ? "left" : "top"]: n,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return 0 === t ? (s.setTransition(0), s.setTranslate(A), s.updateActiveIndex(o), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, i), s.transitionStart(n, g), s.transitionEnd(n, g)) : (s.setTransition(t), s.setTranslate(A), s.updateActiveIndex(o), s.updateSlidesClasses(), s.emit("beforeTransitionStart", t, i), s.transitionStart(n, g), s.animating || (s.animating = !0, s.onSlideToWrapperTransitionEnd || (s.onSlideToWrapperTransitionEnd = function (e) {
    s && !s.destroyed && e.target === this && (s.$wrapperEl[0].removeEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd), s.onSlideToWrapperTransitionEnd = null, delete s.onSlideToWrapperTransitionEnd, s.transitionEnd(n, g));
  }), s.$wrapperEl[0].addEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd))), !0;
}
export { i as default };
