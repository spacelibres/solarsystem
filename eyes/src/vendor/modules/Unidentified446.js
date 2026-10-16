// Recovered from vendors.js:1634510-1636505.
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
function i(e) {
  const t = this,
    n = t.touchEventsData,
    {
      params: params,
      touches: touches,
      rtlTranslate: rtlTranslate,
      slidesGrid: slidesGrid,
      enabled: enabled
    } = t;
  if (!enabled) return;
  let l = e;
  if (l.originalEvent && (l = l.originalEvent), n.allowTouchCallbacks && t.emit("touchEnd", l), n.allowTouchCallbacks = !1, !n.isTouched) return n.isMoved && params.grabCursor && t.setGrabCursor(!1), n.isMoved = !1, void (n.startMoving = !1);
  params.grabCursor && n.isMoved && n.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
  const u = (0, animateCSSModeScroll.now)(),
    d = u - n.touchStartTime;
  if (t.allowClick && (t.updateClickedSlide(l), t.emit("tap click", l), d < 300 && u - n.lastClickTime < 300 && t.emit("doubleTap doubleClick", l)), n.lastClickTime = (0, animateCSSModeScroll.now)(), (0, animateCSSModeScroll.nextTick)(() => {
    t.destroyed || (t.allowClick = !0);
  }), !n.isTouched || !n.isMoved || !t.swipeDirection || 0 === touches.diff || n.currentTranslate === n.startTranslate) return n.isTouched = !1, n.isMoved = !1, void (n.startMoving = !1);
  let h;
  if (n.isTouched = !1, n.isMoved = !1, n.startMoving = !1, h = params.followFinger ? rtlTranslate ? t.translate : -t.translate : -n.currentTranslate, params.cssMode) return;
  if (t.params.freeMode && params.freeMode.enabled) return void t.freeMode.onTouchEnd({
    currentPos: h
  });
  let p = 0,
    f = t.slidesSizesGrid[0];
  for (let e = 0; e < slidesGrid.length; e += e < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    const t = e < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    void 0 !== slidesGrid[e + t] ? h >= slidesGrid[e] && h < slidesGrid[e + t] && (p = e, f = slidesGrid[e + t] - slidesGrid[e]) : h >= slidesGrid[e] && (p = e, f = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2]);
  }
  const m = (h - slidesGrid[p]) / f,
    M = p < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (d > params.longSwipesMs) {
    if (!params.longSwipes) return void t.slideTo(t.activeIndex);
    "next" === t.swipeDirection && (m >= params.longSwipesRatio ? t.slideTo(p + M) : t.slideTo(p)), "prev" === t.swipeDirection && (m > 1 - params.longSwipesRatio ? t.slideTo(p + M) : t.slideTo(p));
  } else {
    if (!params.shortSwipes) return void t.slideTo(t.activeIndex);
    t.navigation && (l.target === t.navigation.nextEl || l.target === t.navigation.prevEl) ? l.target === t.navigation.nextEl ? t.slideTo(p + M) : t.slideTo(p) : ("next" === t.swipeDirection && t.slideTo(p + M), "prev" === t.swipeDirection && t.slideTo(p));
  }
}
export { i as default };
