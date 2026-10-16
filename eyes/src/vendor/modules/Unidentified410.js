/** @eyes-analysis
 * 文件职责：实现 updateAutoHeight；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1608152-1608892.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
