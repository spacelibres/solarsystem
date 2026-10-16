// Recovered from vendors.js:1637443-1637967.
function r() {
  const e = this,
    {
      wrapperEl: wrapperEl,
      rtlTranslate: rtlTranslate,
      enabled: enabled
    } = e;
  if (!enabled) return;
  let i;
  e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -wrapperEl.scrollLeft : e.translate = -wrapperEl.scrollTop, -0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
  const a = e.maxTranslate() - e.minTranslate();
  i = 0 === a ? 0 : (e.translate - e.minTranslate()) / a, i !== e.progress && e.updateProgress(rtlTranslate ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1);
}
export { r as default };
