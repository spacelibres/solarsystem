// Recovered from vendors.js:1612438-1613370.
function r(e) {
  const t = this,
    n = t.rtlTranslate ? t.translate : -t.translate,
    {
      slidesGrid: slidesGrid,
      snapGrid: snapGrid,
      params: params,
      activeIndex: activeIndex,
      realIndex: realIndex,
      snapIndex: snapIndex
    } = t;
  let l,
    u = e;
  if (void 0 === u) {
    for (let e = 0; e < slidesGrid.length; e += 1) void 0 !== slidesGrid[e + 1] ? n >= slidesGrid[e] && n < slidesGrid[e + 1] - (slidesGrid[e + 1] - slidesGrid[e]) / 2 ? u = e : n >= slidesGrid[e] && n < slidesGrid[e + 1] && (u = e + 1) : n >= slidesGrid[e] && (u = e);
    params.normalizeSlideIndex && (u < 0 || void 0 === u) && (u = 0);
  }
  if (snapGrid.indexOf(n) >= 0) l = snapGrid.indexOf(n);else {
    const e = Math.min(params.slidesPerGroupSkip, u);
    l = e + Math.floor((u - e) / params.slidesPerGroup);
  }
  if (l >= snapGrid.length && (l = snapGrid.length - 1), u === activeIndex) return void (l !== snapIndex && (t.snapIndex = l, t.emit("snapIndexChange")));
  const d = parseInt(t.slides.eq(u).attr("data-swiper-slide-index") || u, 10);
  Object.assign(t, {
    snapIndex: l,
    realIndex: d,
    previousIndex: activeIndex,
    activeIndex: u
  }), t.emit("activeIndexChange"), t.emit("snapIndexChange"), realIndex !== d && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
}
export { r as default };
