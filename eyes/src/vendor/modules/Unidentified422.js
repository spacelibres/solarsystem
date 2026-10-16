// Recovered from vendors.js:1615339-1616776.
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
function i(e = 0, t = this.params.speed, n = !0, i = !0, a) {
  const s = this,
    {
      params: params,
      wrapperEl: wrapperEl
    } = s;
  if (s.animating && params.preventInteractionOnTransition) return !1;
  const l = s.minTranslate(),
    u = s.maxTranslate();
  let d;
  if (d = i && e > l ? l : i && e < u ? u : e, s.updateProgress(d), params.cssMode) {
    const e = s.isHorizontal();
    if (0 === t) wrapperEl[e ? "scrollLeft" : "scrollTop"] = -d;else {
      if (!s.support.smoothScroll) return (0, animateCSSModeScroll.animateCSSModeScroll)({
        swiper: s,
        targetPosition: -d,
        side: e ? "left" : "top"
      }), !0;
      wrapperEl.scrollTo({
        [e ? "left" : "top"]: -d,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return 0 === t ? (s.setTransition(0), s.setTranslate(d), n && (s.emit("beforeTransitionStart", t, a), s.emit("transitionEnd"))) : (s.setTransition(t), s.setTranslate(d), n && (s.emit("beforeTransitionStart", t, a), s.emit("transitionStart")), s.animating || (s.animating = !0, s.onTranslateToWrapperTransitionEnd || (s.onTranslateToWrapperTransitionEnd = function (e) {
    s && !s.destroyed && e.target === this && (s.$wrapperEl[0].removeEventListener("transitionend", s.onTranslateToWrapperTransitionEnd), s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onTranslateToWrapperTransitionEnd), s.onTranslateToWrapperTransitionEnd = null, delete s.onTranslateToWrapperTransitionEnd, n && s.emit("transitionEnd"));
  }), s.$wrapperEl[0].addEventListener("transitionend", s.onTranslateToWrapperTransitionEnd), s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onTranslateToWrapperTransitionEnd))), !0;
}
export { i as default };
