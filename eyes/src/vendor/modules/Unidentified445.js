// Recovered from vendors.js:1630643-1634509.
import * as extend from "./extend.js";
import * as Dom7Entry from "./Dom7Entry.js";
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
function s(e) {
  const t = (0, extend.getDocument)(),
    n = this,
    s = n.touchEventsData,
    {
      params: params,
      touches: touches,
      rtlTranslate: rtlTranslate,
      enabled: enabled
    } = n;
  if (!enabled) return;
  let d = e;
  if (d.originalEvent && (d = d.originalEvent), !s.isTouched) return void (s.startMoving && s.isScrolling && n.emit("touchMoveOpposite", d));
  if (s.isTouchEvent && "touchmove" !== d.type) return;
  const h = "touchmove" === d.type && d.targetTouches && (d.targetTouches[0] || d.changedTouches[0]),
    p = "touchmove" === d.type ? h.pageX : d.pageX,
    f = "touchmove" === d.type ? h.pageY : d.pageY;
  if (d.preventedByNestedSwiper) return touches.startX = p, void (touches.startY = f);
  if (!n.allowTouchMove) return n.allowClick = !1, void (s.isTouched && (Object.assign(touches, {
    startX: p,
    startY: f,
    currentX: p,
    currentY: f
  }), s.touchStartTime = (0, animateCSSModeScroll.now)()));
  if (s.isTouchEvent && params.touchReleaseOnEdges && !params.loop) if (n.isVertical()) {
    if (f < touches.startY && n.translate <= n.maxTranslate() || f > touches.startY && n.translate >= n.minTranslate()) return s.isTouched = !1, void (s.isMoved = !1);
  } else if (p < touches.startX && n.translate <= n.maxTranslate() || p > touches.startX && n.translate >= n.minTranslate()) return;
  if (s.isTouchEvent && t.activeElement && d.target === t.activeElement && (0, Dom7Entry.default)(d.target).is(s.focusableElements)) return s.isMoved = !0, void (n.allowClick = !1);
  if (s.allowTouchCallbacks && n.emit("touchMove", d), d.targetTouches && d.targetTouches.length > 1) return;
  touches.currentX = p, touches.currentY = f;
  const m = touches.currentX - touches.startX,
    M = touches.currentY - touches.startY;
  if (n.params.threshold && Math.sqrt(m ** 2 + M ** 2) < n.params.threshold) return;
  if (void 0 === s.isScrolling) {
    let e;
    n.isHorizontal() && touches.currentY === touches.startY || n.isVertical() && touches.currentX === touches.startX ? s.isScrolling = !1 : m * m + M * M >= 25 && (e = 180 * Math.atan2(Math.abs(M), Math.abs(m)) / Math.PI, s.isScrolling = n.isHorizontal() ? e > params.touchAngle : 90 - e > params.touchAngle);
  }
  if (s.isScrolling && n.emit("touchMoveOpposite", d), void 0 === s.startMoving && (touches.currentX === touches.startX && touches.currentY === touches.startY || (s.startMoving = !0)), s.isScrolling) return void (s.isTouched = !1);
  if (!s.startMoving) return;
  n.allowClick = !1, !params.cssMode && d.cancelable && d.preventDefault(), params.touchMoveStopPropagation && !params.nested && d.stopPropagation(), s.isMoved || (params.loop && !params.cssMode && n.loopFix(), s.startTranslate = n.getTranslate(), n.setTransition(0), n.animating && n.$wrapperEl.trigger("webkitTransitionEnd transitionend"), s.allowMomentumBounce = !1, !params.grabCursor || !0 !== n.allowSlideNext && !0 !== n.allowSlidePrev || n.setGrabCursor(!0), n.emit("sliderFirstMove", d)), n.emit("sliderMove", d), s.isMoved = !0;
  let _ = n.isHorizontal() ? m : M;
  touches.diff = _, _ *= params.touchRatio, rtlTranslate && (_ = -_), n.swipeDirection = _ > 0 ? "prev" : "next", s.currentTranslate = _ + s.startTranslate;
  let A = !0,
    g = params.resistanceRatio;
  if (params.touchReleaseOnEdges && (g = 0), _ > 0 && s.currentTranslate > n.minTranslate() ? (A = !1, params.resistance && (s.currentTranslate = n.minTranslate() - 1 + (-n.minTranslate() + s.startTranslate + _) ** g)) : _ < 0 && s.currentTranslate < n.maxTranslate() && (A = !1, params.resistance && (s.currentTranslate = n.maxTranslate() + 1 - (n.maxTranslate() - s.startTranslate - _) ** g)), A && (d.preventedByNestedSwiper = !0), !n.allowSlideNext && "next" === n.swipeDirection && s.currentTranslate < s.startTranslate && (s.currentTranslate = s.startTranslate), !n.allowSlidePrev && "prev" === n.swipeDirection && s.currentTranslate > s.startTranslate && (s.currentTranslate = s.startTranslate), n.allowSlidePrev || n.allowSlideNext || (s.currentTranslate = s.startTranslate), params.threshold > 0) {
    if (!(Math.abs(_) > params.threshold || s.allowThresholdMove)) return void (s.currentTranslate = s.startTranslate);
    if (!s.allowThresholdMove) return s.allowThresholdMove = !0, touches.startX = touches.currentX, touches.startY = touches.currentY, s.currentTranslate = s.startTranslate, void (touches.diff = n.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY);
  }
  params.followFinger && !params.cssMode && ((params.freeMode && params.freeMode.enabled && n.freeMode || params.watchSlidesProgress) && (n.updateActiveIndex(), n.updateSlidesClasses()), n.params.freeMode && params.freeMode.enabled && n.freeMode && n.freeMode.onTouchMove(), n.updateProgress(s.currentTranslate), n.setTranslate(s.currentTranslate));
}
export { s as default };
