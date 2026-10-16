// Recovered from vendors.js:1613371-1613958.
import * as Dom7Entry from "./Dom7Entry.js";
function i(e) {
  const t = this,
    n = t.params,
    i = (0, Dom7Entry.default)(e.target).closest(`.${n.slideClass}`)[0];
  let a,
    s = !1;
  if (i) for (let e = 0; e < t.slides.length; e += 1) if (t.slides[e] === i) {
    s = !0, a = e;
    break;
  }
  if (!i || !s) return t.clickedSlide = void 0, void (t.clickedIndex = void 0);
  t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt((0, Dom7Entry.default)(i).attr("data-swiper-slide-index"), 10) : t.clickedIndex = a, n.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide();
}
export { i as default };
