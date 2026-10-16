/** @eyes-analysis
 * 文件职责：实现 setBreakpoint；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1638087-1639382.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1638087-1639382.
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
const i = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function a() {
  const e = this,
    {
      activeIndex: activeIndex,
      initialized: initialized,
      loopedSlides: a = 0,
      params: params,
      $el: $el
    } = e,
    c = params.breakpoints;
  if (!c || c && 0 === Object.keys(c).length) return;
  const l = e.getBreakpoint(c, e.params.breakpointsBase, e.el);
  if (!l || e.currentBreakpoint === l) return;
  const u = (l in c ? c[l] : void 0) || e.originalParams,
    d = i(e, params),
    h = i(e, u),
    p = params.enabled;
  d && !h ? ($el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`), e.emitContainerClasses()) : !d && h && ($el.addClass(`${params.containerModifierClass}grid`), (u.grid.fill && "column" === u.grid.fill || !u.grid.fill && "column" === params.grid.fill) && $el.addClass(`${params.containerModifierClass}grid-column`), e.emitContainerClasses());
  const f = u.direction && u.direction !== params.direction,
    m = params.loop && (u.slidesPerView !== params.slidesPerView || f);
  f && initialized && e.changeDirection(), (0, animateCSSModeScroll.extend)(e.params, u);
  const M = e.params.enabled;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev
  }), p && !M ? e.disable() : !p && M && e.enable(), e.currentBreakpoint = l, e.emit("_beforeBreakpoint", u), m && initialized && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(activeIndex - a + e.loopedSlides, 0, !1)), e.emit("breakpoint", u);
}
export { a as default };
