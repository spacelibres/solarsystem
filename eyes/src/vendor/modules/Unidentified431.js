/** @eyes-analysis
 * 文件职责：实现 slideNext；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1621425-1621933.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
