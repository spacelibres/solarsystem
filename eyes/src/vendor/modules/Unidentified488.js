/** @eyes-analysis
 * 文件职责：在 beforeInit/setTranslate/setTransition 上装配视觉效果与透视类
 * 依据：// Recovered from vendors.js:1711164-1711705.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
