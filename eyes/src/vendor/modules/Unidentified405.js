// Recovered from vendors.js:1600377-1601309.
import * as extend from "./extend.js";
function i({
  swiper: swiper,
  extendParams: extendParams,
  on: on,
  emit: emit
}) {
  const a = [],
    s = (0, extend.getWindow)(),
    o = (e, t = {}) => {
      const n = new (s.MutationObserver || s.WebkitMutationObserver)(e => {
        if (1 === e.length) return void emit("observerUpdate", e[0]);
        const t = function () {
          emit("observerUpdate", e[0]);
        };
        s.requestAnimationFrame ? s.requestAnimationFrame(t) : s.setTimeout(t, 0);
      });
      n.observe(e, {
        attributes: void 0 === t.attributes || t.attributes,
        childList: void 0 === t.childList || t.childList,
        characterData: void 0 === t.characterData || t.characterData
      }), a.push(n);
    };
  extendParams({
    observer: !1,
    observeParents: !1,
    observeSlideChildren: !1
  }), on("init", () => {
    if (swiper.params.observer) {
      if (swiper.params.observeParents) {
        const t = swiper.$el.parents();
        for (let e = 0; e < t.length; e += 1) o(t[e]);
      }
      o(swiper.$el[0], {
        childList: swiper.params.observeSlideChildren
      }), o(swiper.$wrapperEl[0], {
        attributes: !1
      });
    }
  }), on("destroy", () => {
    a.forEach(e => {
      e.disconnect();
    }), a.splice(0, a.length);
  });
}
export { i as default };
