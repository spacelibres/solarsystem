/** @eyes-analysis
 * 文件职责：CSS scroll 模式下同步 scrollLeft/Top 到平移、索引和进度
 * 依据：// Recovered from vendors.js:1637443-1637967.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
