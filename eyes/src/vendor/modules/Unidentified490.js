/** @eyes-analysis
 * 文件职责：为虚拟平移模式监听效果目标的 transitionend 并结束动画
 * 依据：// Recovered from vendors.js:1711919-1712364.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
