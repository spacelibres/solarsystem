// Recovered from vendors.js:1693597-1695564.
import * as extend from "./extend.js";
function i({
  swiper: swiper,
  extendParams: extendParams,
  on: on
}) {
  extendParams({
    history: {
      enabled: !1,
      root: "",
      replaceState: !1,
      key: "slides"
    }
  });
  let i = !1,
    a = {};
  const s = e => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""),
    o = e => {
      const t = (0, extend.getWindow)();
      let n;
      n = e ? new URL(e) : t.location;
      const i = n.pathname.slice(1).split("/").filter(e => "" !== e),
        a = i.length;
      return {
        key: i[a - 2],
        value: i[a - 1]
      };
    },
    c = (t, n) => {
      const a = (0, extend.getWindow)();
      if (!i || !swiper.params.history.enabled) return;
      let o;
      o = swiper.params.url ? new URL(swiper.params.url) : a.location;
      const c = swiper.slides.eq(n);
      let l = s(c.attr("data-history"));
      if (swiper.params.history.root.length > 0) {
        let n = swiper.params.history.root;
        "/" === n[n.length - 1] && (n = n.slice(0, n.length - 1)), l = `${n}/${t}/${l}`;
      } else o.pathname.includes(t) || (l = `${t}/${l}`);
      const u = a.history.state;
      u && u.value === l || (swiper.params.history.replaceState ? a.history.replaceState({
        value: l
      }, null, l) : a.history.pushState({
        value: l
      }, null, l));
    },
    l = (t, n, r) => {
      if (n) for (let i = 0, a = swiper.slides.length; i < a; i += 1) {
        const a = swiper.slides.eq(i);
        if (s(a.attr("data-history")) === n && !a.hasClass(swiper.params.slideDuplicateClass)) {
          const n = a.index();
          swiper.slideTo(n, t, r);
        }
      } else swiper.slideTo(0, t, r);
    },
    u = () => {
      a = o(swiper.params.url), l(swiper.params.speed, swiper.paths.value, !1);
    };
  on("init", () => {
    swiper.params.history.enabled && (() => {
      const t = (0, extend.getWindow)();
      if (swiper.params.history) {
        if (!t.history || !t.history.pushState) return swiper.params.history.enabled = !1, void (swiper.params.hashNavigation.enabled = !0);
        i = !0, a = o(swiper.params.url), (a.key || a.value) && (l(0, a.value, swiper.params.runCallbacksOnInit), swiper.params.history.replaceState || t.addEventListener("popstate", u));
      }
    })();
  }), on("destroy", () => {
    swiper.params.history.enabled && (() => {
      const t = (0, extend.getWindow)();
      swiper.params.history.replaceState || t.removeEventListener("popstate", u);
    })();
  }), on("transitionEnd _freeModeNoMomentumRelease", () => {
    i && c(swiper.params.history.key, swiper.activeIndex);
  }), on("slideChange", () => {
    i && swiper.params.cssMode && c(swiper.params.history.key, swiper.activeIndex);
  });
}
export { i as default };
