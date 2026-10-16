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
