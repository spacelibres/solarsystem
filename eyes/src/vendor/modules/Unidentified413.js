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
