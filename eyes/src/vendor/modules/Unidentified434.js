/** @eyes-analysis
 * 文件职责：实现 slideToClosest；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1622863-1623411.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1622863-1623411.
function r(e = this.params.speed, t = !0, n, r = .5) {
  const i = this;
  let a = i.activeIndex;
  const s = Math.min(i.params.slidesPerGroupSkip, a),
    o = s + Math.floor((a - s) / i.params.slidesPerGroup),
    c = i.rtlTranslate ? i.translate : -i.translate;
  if (c >= i.snapGrid[o]) {
    const e = i.snapGrid[o];
    c - e > (i.snapGrid[o + 1] - e) * r && (a += i.params.slidesPerGroup);
  } else {
    const e = i.snapGrid[o - 1];
    c - e <= (i.snapGrid[o] - e) * r && (a -= i.params.slidesPerGroup);
  }
  return a = Math.max(a, 0), a = Math.min(a, i.slidesGrid.length - 1), i.slideTo(a, e, t, n);
}
export { r as default };
