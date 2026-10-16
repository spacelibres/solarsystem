// Recovered from vendors.js:1624362-1625518.
import * as extend from "./extend.js";
import * as Dom7Entry from "./Dom7Entry.js";
function a() {
  const e = this,
    t = (0, extend.getDocument)(),
    {
      params: params,
      $wrapperEl: $wrapperEl
    } = e;
  $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
  let s = $wrapperEl.children(`.${params.slideClass}`);
  if (params.loopFillGroupWithBlank) {
    const e = params.slidesPerGroup - s.length % params.slidesPerGroup;
    if (e !== params.slidesPerGroup) {
      for (let r = 0; r < e; r += 1) {
        const e = (0, Dom7Entry.default)(t.createElement("div")).addClass(`${params.slideClass} ${params.slideBlankClass}`);
        $wrapperEl.append(e);
      }
      s = $wrapperEl.children(`.${params.slideClass}`);
    }
  }
  "auto" !== params.slidesPerView || params.loopedSlides || (params.loopedSlides = s.length), e.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10)), e.loopedSlides += params.loopAdditionalSlides, e.loopedSlides > s.length && (e.loopedSlides = s.length);
  const o = [],
    c = [];
  s.each((t, n) => {
    const r = (0, Dom7Entry.default)(t);
    n < e.loopedSlides && c.push(t), n < s.length && n >= s.length - e.loopedSlides && o.push(t), r.attr("data-swiper-slide-index", n);
  });
  for (let e = 0; e < c.length; e += 1) $wrapperEl.append((0, Dom7Entry.default)(c[e].cloneNode(!0)).addClass(params.slideDuplicateClass));
  for (let e = o.length - 1; e >= 0; e -= 1) $wrapperEl.prepend((0, Dom7Entry.default)(o[e].cloneNode(!0)).addClass(params.slideDuplicateClass));
}
export { a as default };
