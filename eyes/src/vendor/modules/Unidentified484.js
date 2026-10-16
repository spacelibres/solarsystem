// Recovered from vendors.js:1708772-1709474.
function r(e, t) {
  const n = this,
    {
      $wrapperEl: $wrapperEl,
      params: params,
      activeIndex: activeIndex
    } = n;
  let s = activeIndex;
  params.loop && (s -= n.loopedSlides, n.loopDestroy(), n.slides = $wrapperEl.children(`.${params.slideClass}`));
  const o = n.slides.length;
  if (e <= 0) return void n.prependSlide(t);
  if (e >= o) return void n.appendSlide(t);
  let c = s > e ? s + 1 : s;
  const l = [];
  for (let t = o - 1; t >= e; t -= 1) {
    const e = n.slides.eq(t);
    e.remove(), l.unshift(e);
  }
  if ("object" == typeof t && "length" in t) {
    for (let e = 0; e < t.length; e += 1) t[e] && $wrapperEl.append(t[e]);
    c = s > e ? s + t.length : s;
  } else $wrapperEl.append(t);
  for (let e = 0; e < l.length; e += 1) $wrapperEl.append(l[e]);
  params.loop && n.loopCreate(), params.observer || n.update(), params.loop ? n.slideTo(c + n.loopedSlides, 0, !1) : n.slideTo(c, 0, !1);
}
export { r as default };
