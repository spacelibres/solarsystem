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
