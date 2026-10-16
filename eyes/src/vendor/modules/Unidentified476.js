/** @eyes-analysis
 * 文件职责：Swiper 的 HashNavigation 功能插件；按初始化、更新和销毁事件管理状态及 DOM
 * 依据：// Recovered from vendors.js:1695565-1697155.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1695565-1697155.
import * as extend from "./extend.js";
import * as Dom7Entry from "./Dom7Entry.js";
function a({
  swiper: swiper,
  extendParams: extendParams,
  emit: emit,
  on: on
}) {
  let s = !1;
  const o = (0, extend.getDocument)(),
    c = (0, extend.getWindow)();
  extendParams({
    hashNavigation: {
      enabled: !1,
      replaceState: !1,
      watchState: !1
    }
  });
  const l = () => {
      emit("hashChange");
      const t = o.location.hash.replace("#", "");
      if (t !== swiper.slides.eq(swiper.activeIndex).attr("data-hash")) {
        const n = swiper.$wrapperEl.children(`.${swiper.params.slideClass}[data-hash="${t}"]`).index();
        if (void 0 === n) return;
        swiper.slideTo(n);
      }
    },
    u = () => {
      if (s && swiper.params.hashNavigation.enabled) if (swiper.params.hashNavigation.replaceState && c.history && c.history.replaceState) c.history.replaceState(null, null, `#${swiper.slides.eq(swiper.activeIndex).attr("data-hash")}` || ""), emit("hashSet");else {
        const t = swiper.slides.eq(swiper.activeIndex),
          r = t.attr("data-hash") || t.attr("data-history");
        o.location.hash = r || "", emit("hashSet");
      }
    };
  on("init", () => {
    swiper.params.hashNavigation.enabled && (() => {
      if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) return;
      s = !0;
      const t = o.location.hash.replace("#", "");
      if (t) {
        const n = 0;
        for (let r = 0, i = swiper.slides.length; r < i; r += 1) {
          const i = swiper.slides.eq(r);
          if ((i.attr("data-hash") || i.attr("data-history")) === t && !i.hasClass(swiper.params.slideDuplicateClass)) {
            const t = i.index();
            swiper.slideTo(t, n, swiper.params.runCallbacksOnInit, !0);
          }
        }
      }
      swiper.params.hashNavigation.watchState && (0, Dom7Entry.default)(c).on("hashchange", l);
    })();
  }), on("destroy", () => {
    swiper.params.hashNavigation.enabled && swiper.params.hashNavigation.watchState && (0, Dom7Entry.default)(c).off("hashchange", l);
  }), on("transitionEnd _freeModeNoMomentumRelease", () => {
    s && u();
  }), on("slideChange", () => {
    s && swiper.params.cssMode && u();
  });
}
export { a as default };
