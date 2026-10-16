// Recovered from vendors.js:1716852-1717176.
import * as Dom7Entry from "./Dom7Entry.js";
function i(e, t, n) {
  const i = "swiper-slide-shadow" + (n ? `-${n}` : ""),
    a = e.transformEl ? t.find(e.transformEl) : t;
  let s = a.children(`.${i}`);
  return s.length || (s = (0, Dom7Entry.default)(`<div class="swiper-slide-shadow${n ? `-${n}` : ""}"></div>`), a.append(s)), s;
}
export { i as default };
