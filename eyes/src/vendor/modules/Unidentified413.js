/** @eyes-analysis
 * 文件职责：实现 updateProgress；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1610042-1610654.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1610042-1610654.
function r(e) {
  const t = this;
  if (void 0 === e) {
    const n = t.rtlTranslate ? -1 : 1;
    e = t && t.translate && t.translate * n || 0;
  }
  const n = t.params,
    r = t.maxTranslate() - t.minTranslate();
  let {
    progress: progress,
    isBeginning: isBeginning,
    isEnd: isEnd
  } = t;
  const o = isBeginning,
    c = isEnd;
  0 === r ? (progress = 0, isBeginning = !0, isEnd = !0) : (progress = (e - t.minTranslate()) / r, isBeginning = progress <= 0, isEnd = progress >= 1), Object.assign(t, {
    progress: progress,
    isBeginning: isBeginning,
    isEnd: isEnd
  }), (n.watchSlidesProgress || n.centeredSlides && n.autoHeight) && t.updateSlidesProgress(e), isBeginning && !o && t.emit("reachBeginning toEdge"), isEnd && !c && t.emit("reachEnd toEdge"), (o && !isBeginning || c && !isEnd) && t.emit("fromEdge"), t.emit("progress", progress);
}
export { r as default };
