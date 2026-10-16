// Recovered from vendors.js:1608152-1608892.
function r(e) {
  const t = this,
    n = [],
    r = t.virtual && t.params.virtual.enabled;
  let i,
    a = 0;
  "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
  const s = e => r ? t.slides.filter(t => parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e)[0] : t.slides.eq(e)[0];
  if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1) {
    if (t.params.centeredSlides) t.visibleSlides.each(e => {
      n.push(e);
    });else for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
      const e = t.activeIndex + i;
      if (e > t.slides.length && !r) break;
      n.push(s(e));
    }
  } else n.push(s(t.activeIndex));
  for (i = 0; i < n.length; i += 1) if (void 0 !== n[i]) {
    const e = n[i].offsetHeight;
    a = e > a ? e : a;
  }
  a && t.$wrapperEl.css("height", `${a}px`);
}
export { r as default };
