// Recovered from vendors.js:1621425-1621933.
function r(e = this.params.speed, t = !0, n) {
  const r = this,
    {
      animating: animating,
      enabled: enabled,
      params: params
    } = r;
  if (!enabled) return r;
  let o = params.slidesPerGroup;
  "auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto && (o = Math.max(r.slidesPerViewDynamic("current", !0), 1));
  const c = r.activeIndex < params.slidesPerGroupSkip ? 1 : o;
  if (params.loop) {
    if (animating && params.loopPreventsSlide) return !1;
    r.loopFix(), r._clientLeft = r.$wrapperEl[0].clientLeft;
  }
  return r.slideTo(r.activeIndex + c, e, t, n);
}
export { r as default };
