/** @eyes-analysis
 * 文件职责：实现 setTranslate；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1614478-1615093.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1614478-1615093.
function r(e, t) {
  const n = this,
    {
      rtlTranslate: rtlTranslate,
      params: params,
      $wrapperEl: $wrapperEl,
      wrapperEl: wrapperEl,
      progress: progress
    } = n;
  let c = 0,
    l = 0;
  let u;
  n.isHorizontal() ? c = rtlTranslate ? -e : e : l = e, params.roundLengths && (c = Math.floor(c), l = Math.floor(l)), params.cssMode ? wrapperEl[n.isHorizontal() ? "scrollLeft" : "scrollTop"] = n.isHorizontal() ? -c : -l : params.virtualTranslate || $wrapperEl.transform(`translate3d(${c}px, ${l}px, 0px)`), n.previousTranslate = n.translate, n.translate = n.isHorizontal() ? c : l;
  const d = n.maxTranslate() - n.minTranslate();
  u = 0 === d ? 0 : (e - n.minTranslate()) / d, u !== progress && n.updateProgress(e), n.emit("setTranslate", n.translate, t);
}
export { r as default };
