// Recovered from vendors.js:1709475-1710033.
function r(e) {
  const t = this,
    {
      params: params,
      $wrapperEl: $wrapperEl,
      activeIndex: activeIndex
    } = t;
  let a = activeIndex;
  params.loop && (a -= t.loopedSlides, t.loopDestroy(), t.slides = $wrapperEl.children(`.${params.slideClass}`));
  let s,
    o = a;
  if ("object" == typeof e && "length" in e) {
    for (let n = 0; n < e.length; n += 1) s = e[n], t.slides[s] && t.slides.eq(s).remove(), s < o && (o -= 1);
    o = Math.max(o, 0);
  } else s = e, t.slides[s] && t.slides.eq(s).remove(), s < o && (o -= 1), o = Math.max(o, 0);
  params.loop && t.loopCreate(), params.observer || t.update(), params.loop ? t.slideTo(o + t.loopedSlides, 0, !1) : t.slideTo(o, 0, !1);
}
export { r as default };
