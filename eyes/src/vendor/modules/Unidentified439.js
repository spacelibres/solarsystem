// Recovered from vendors.js:1626110-1626383.
function r() {
  const {
    $wrapperEl: $wrapperEl,
    params: params,
    slides: slides
  } = this;
  $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove(), slides.removeAttr("data-swiper-slide-index");
}
export { r as default };
