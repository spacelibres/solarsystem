// Recovered from vendors.js:1711919-1712364.
function r({
  swiper: swiper,
  duration: duration,
  transformEl: transformEl,
  allSlides: allSlides
}) {
  const {
    slides: slides,
    activeIndex: activeIndex,
    $wrapperEl: $wrapperEl
  } = swiper;
  if (swiper.params.virtualTranslate && 0 !== duration) {
    let t,
      o = !1;
    t = allSlides ? transformEl ? slides.find(transformEl) : slides : transformEl ? slides.eq(activeIndex).find(transformEl) : slides.eq(activeIndex), t.transitionEnd(() => {
      if (o) return;
      if (!swiper || swiper.destroyed) return;
      o = !0, swiper.animating = !1;
      const t = ["webkitTransitionEnd", "transitionend"];
      for (let e = 0; e < t.length; e += 1) $wrapperEl.trigger(t[e]);
    });
  }
}
export { r as default };
