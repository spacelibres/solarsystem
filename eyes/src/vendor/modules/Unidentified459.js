/** @eyes-analysis
 * 文件职责：实现 checkOverflow；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1641954-1642414.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1641954-1642414.
let defaultExport;
defaultExport = {
  checkOverflow: function () {
    const e = this,
      {
        isLocked: isLocked,
        params: params
      } = e,
      {
        slidesOffsetBefore: slidesOffsetBefore
      } = params;
    if (slidesOffsetBefore) {
      const t = e.slides.length - 1,
        n = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * slidesOffsetBefore;
      e.isLocked = e.size > n;
    } else e.isLocked = 1 === e.snapGrid.length;
    !0 === params.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === params.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), isLocked && isLocked !== e.isLocked && (e.isEnd = !1), isLocked !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
  }
};
export { defaultExport as default };
