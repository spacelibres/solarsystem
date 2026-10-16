/** @eyes-analysis
 * 文件职责：实现 slidePrev；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1621934-1622704.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1621934-1622704.
function r(e = this.params.speed, t = !0, n) {
  const r = this,
    {
      params: params,
      animating: animating,
      snapGrid: snapGrid,
      slidesGrid: slidesGrid,
      rtlTranslate: rtlTranslate,
      enabled: enabled
    } = r;
  if (!enabled) return r;
  if (params.loop) {
    if (animating && params.loopPreventsSlide) return !1;
    r.loopFix(), r._clientLeft = r.$wrapperEl[0].clientLeft;
  }
  function u(e) {
    return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
  }
  const d = u(rtlTranslate ? r.translate : -r.translate),
    h = snapGrid.map(e => u(e));
  let p = snapGrid[h.indexOf(d) - 1];
  if (void 0 === p && params.cssMode) {
    let e;
    snapGrid.forEach((t, n) => {
      d >= t && (e = n);
    }), void 0 !== e && (p = snapGrid[e > 0 ? e - 1 : e]);
  }
  let f = 0;
  return void 0 !== p && (f = slidesGrid.indexOf(p), f < 0 && (f = r.activeIndex - 1), "auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto && (f = f - r.slidesPerViewDynamic("previous", !0) + 1, f = Math.max(f, 0))), r.slideTo(f, e, t, n);
}
export { r as default };
