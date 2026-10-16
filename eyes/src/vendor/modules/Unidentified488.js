// Recovered from vendors.js:1711164-1711705.
function r(e) {
  const {
    effect: effect,
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    overwriteParams: overwriteParams,
    perspective: perspective
  } = e;
  on("beforeInit", () => {
    if (swiper.params.effect !== effect) return;
    swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`), perspective && perspective() && swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
    const e = overwriteParams ? overwriteParams() : {};
    Object.assign(swiper.params, e), Object.assign(swiper.originalParams, e);
  }), on("setTranslate", () => {
    swiper.params.effect === effect && setTranslate();
  }), on("setTransition", (e, r) => {
    swiper.params.effect === effect && setTransition(r);
  });
}
export { r as default };
