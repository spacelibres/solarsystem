// Recovered from vendors.js:1628496-1630642.
import * as extend from "./extend.js";
import * as Dom7Entry from "./Dom7Entry.js";
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
function s(e) {
  const t = this,
    n = (0, extend.getDocument)(),
    s = (0, extend.getWindow)(),
    o = t.touchEventsData,
    {
      params: params,
      touches: touches,
      enabled: enabled
    } = t;
  if (!enabled) return;
  if (t.animating && params.preventInteractionOnTransition) return;
  !t.animating && params.cssMode && params.loop && t.loopFix();
  let d = e;
  d.originalEvent && (d = d.originalEvent);
  let h = (0, Dom7Entry.default)(d.target);
  if ("wrapper" === params.touchEventsTarget && !h.closest(t.wrapperEl).length) return;
  if (o.isTouchEvent = "touchstart" === d.type, !o.isTouchEvent && "which" in d && 3 === d.which) return;
  if (!o.isTouchEvent && "button" in d && d.button > 0) return;
  if (o.isTouched && o.isMoved) return;
  !!params.noSwipingClass && "" !== params.noSwipingClass && d.target && d.target.shadowRoot && e.path && e.path[0] && (h = (0, Dom7Entry.default)(e.path[0]));
  const p = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`,
    f = !(!d.target || !d.target.shadowRoot);
  if (params.noSwiping && (f ? function (e, t = this) {
    return function t(n) {
      return n && n !== (0, extend.getDocument)() && n !== (0, extend.getWindow)() ? (n.assignedSlot && (n = n.assignedSlot), n.closest(e) || t(n.getRootNode().host)) : null;
    }(t);
  }(p, d.target) : h.closest(p)[0])) return void (t.allowClick = !0);
  if (params.swipeHandler && !h.closest(params.swipeHandler)[0]) return;
  touches.currentX = "touchstart" === d.type ? d.targetTouches[0].pageX : d.pageX, touches.currentY = "touchstart" === d.type ? d.targetTouches[0].pageY : d.pageY;
  const m = touches.currentX,
    M = touches.currentY,
    _ = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection,
    A = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
  if (_ && (m <= A || m >= s.innerWidth - A)) {
    if ("prevent" !== _) return;
    e.preventDefault();
  }
  if (Object.assign(o, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), touches.startX = m, touches.startY = M, o.touchStartTime = (0, animateCSSModeScroll.now)(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, params.threshold > 0 && (o.allowThresholdMove = !1), "touchstart" !== d.type) {
    let e = !0;
    h.is(o.focusableElements) && (e = !1), n.activeElement && (0, Dom7Entry.default)(n.activeElement).is(o.focusableElements) && n.activeElement !== h[0] && n.activeElement.blur();
    const r = e && t.allowTouchMove && params.touchStartPreventDefault;
    !params.touchStartForcePreventDefault && !r || h[0].isContentEditable || d.preventDefault();
  }
  t.emit("touchStart", d);
}
export { s as default };
