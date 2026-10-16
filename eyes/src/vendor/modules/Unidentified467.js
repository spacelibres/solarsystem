// Recovered from vendors.js:1658341-1665415.
import * as Dom7Entry from "./Dom7Entry.js";
import * as Unidentified468 from "./Unidentified468.js";
import * as Unidentified466 from "./Unidentified466.js";
function s({
  swiper: swiper,
  extendParams: extendParams,
  on: on,
  emit: emit
}) {
  const o = "swiper-pagination";
  let c;
  extendParams({
    pagination: {
      el: null,
      bulletElement: "span",
      clickable: !1,
      hideOnClick: !1,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: !1,
      type: "bullets",
      dynamicBullets: !1,
      dynamicMainBullets: 1,
      formatFractionCurrent: e => e,
      formatFractionTotal: e => e,
      bulletClass: `${o}-bullet`,
      bulletActiveClass: `${o}-bullet-active`,
      modifierClass: `${o}-`,
      currentClass: `${o}-current`,
      totalClass: `${o}-total`,
      hiddenClass: `${o}-hidden`,
      progressbarFillClass: `${o}-progressbar-fill`,
      progressbarOppositeClass: `${o}-progressbar-opposite`,
      clickableClass: `${o}-clickable`,
      lockClass: `${o}-lock`,
      horizontalClass: `${o}-horizontal`,
      verticalClass: `${o}-vertical`
    }
  }), swiper.pagination = {
    el: null,
    $el: null,
    bullets: []
  };
  let l = 0;
  function u() {
    return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el || 0 === swiper.pagination.$el.length;
  }
  function d(t, n) {
    const {
      bulletActiveClass: bulletActiveClass
    } = swiper.params.pagination;
    t[n]().addClass(`${bulletActiveClass}-${n}`)[n]().addClass(`${bulletActiveClass}-${n}-${n}`);
  }
  function h() {
    const t = swiper.rtl,
      n = swiper.params.pagination;
    if (u()) return;
    const a = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length,
      o = swiper.pagination.$el;
    let h;
    const p = swiper.params.loop ? Math.ceil((a - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop ? (h = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup), h > a - 1 - 2 * swiper.loopedSlides && (h -= a - 2 * swiper.loopedSlides), h > p - 1 && (h -= p), h < 0 && "bullets" !== swiper.params.paginationType && (h = p + h)) : h = void 0 !== swiper.snapIndex ? swiper.snapIndex : swiper.activeIndex || 0, "bullets" === n.type && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      const i = swiper.pagination.bullets;
      let a, s, u;
      if (n.dynamicBullets && (c = i.eq(0)[swiper.isHorizontal() ? "outerWidth" : "outerHeight"](!0), o.css(swiper.isHorizontal() ? "width" : "height", c * (n.dynamicMainBullets + 4) + "px"), n.dynamicMainBullets > 1 && void 0 !== swiper.previousIndex && (l += h - swiper.previousIndex, l > n.dynamicMainBullets - 1 ? l = n.dynamicMainBullets - 1 : l < 0 && (l = 0)), a = h - l, s = a + (Math.min(i.length, n.dynamicMainBullets) - 1), u = (s + a) / 2), i.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(e => `${n.bulletActiveClass}${e}`).join(" ")), o.length > 1) i.each(e => {
        const t = (0, Dom7Entry.default)(e),
          i = t.index();
        i === h && t.addClass(n.bulletActiveClass), n.dynamicBullets && (i >= a && i <= s && t.addClass(`${n.bulletActiveClass}-main`), i === a && d(t, "prev"), i === s && d(t, "next"));
      });else {
        const t = i.eq(h),
          r = t.index();
        if (t.addClass(n.bulletActiveClass), n.dynamicBullets) {
          const t = i.eq(a),
            o = i.eq(s);
          for (let e = a; e <= s; e += 1) i.eq(e).addClass(`${n.bulletActiveClass}-main`);
          if (swiper.params.loop) {
            if (r >= i.length - n.dynamicMainBullets) {
              for (let e = n.dynamicMainBullets; e >= 0; e -= 1) i.eq(i.length - e).addClass(`${n.bulletActiveClass}-main`);
              i.eq(i.length - n.dynamicMainBullets - 1).addClass(`${n.bulletActiveClass}-prev`);
            } else d(t, "prev"), d(o, "next");
          } else d(t, "prev"), d(o, "next");
        }
      }
      if (n.dynamicBullets) {
        const r = Math.min(i.length, n.dynamicMainBullets + 4),
          a = (c * r - c) / 2 - u * c,
          s = t ? "right" : "left";
        i.css(swiper.isHorizontal() ? s : "top", `${a}px`);
      }
    }
    if ("fraction" === n.type && (o.find((0, Unidentified468.default)(n.currentClass)).text(n.formatFractionCurrent(h + 1)), o.find((0, Unidentified468.default)(n.totalClass)).text(n.formatFractionTotal(p))), "progressbar" === n.type) {
      let t;
      t = n.progressbarOpposite ? swiper.isHorizontal() ? "vertical" : "horizontal" : swiper.isHorizontal() ? "horizontal" : "vertical";
      const r = (h + 1) / p;
      let a = 1,
        s = 1;
      "horizontal" === t ? a = r : s = r, o.find((0, Unidentified468.default)(n.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${a}) scaleY(${s})`).transition(swiper.params.speed);
    }
    "custom" === n.type && n.renderCustom ? (o.html(n.renderCustom(swiper, h + 1, p)), emit("paginationRender", o[0])) : emit("paginationUpdate", o[0]), swiper.params.watchOverflow && swiper.enabled && o[swiper.isLocked ? "addClass" : "removeClass"](n.lockClass);
  }
  function p() {
    const t = swiper.params.pagination;
    if (u()) return;
    const n = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length,
      r = swiper.pagination.$el;
    let a = "";
    if ("bullets" === t.type) {
      let s = swiper.params.loop ? Math.ceil((n - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && s > n && (s = n);
      for (let n = 0; n < s; n += 1) t.renderBullet ? a += t.renderBullet.call(swiper, n, t.bulletClass) : a += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`;
      r.html(a), swiper.pagination.bullets = r.find((0, Unidentified468.default)(t.bulletClass));
    }
    "fraction" === t.type && (a = t.renderFraction ? t.renderFraction.call(swiper, t.currentClass, t.totalClass) : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`, r.html(a)), "progressbar" === t.type && (a = t.renderProgressbar ? t.renderProgressbar.call(swiper, t.progressbarFillClass) : `<span class="${t.progressbarFillClass}"></span>`, r.html(a)), "custom" !== t.type && emit("paginationRender", swiper.pagination.$el[0]);
  }
  function f() {
    swiper.params.pagination = (0, Unidentified466.default)(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
      el: "swiper-pagination"
    });
    const t = swiper.params.pagination;
    if (!t.el) return;
    let n = (0, Dom7Entry.default)(t.el);
    0 !== n.length && (swiper.params.uniqueNavElements && "string" == typeof t.el && n.length > 1 && (n = swiper.$el.find(t.el), n.length > 1 && (n = n.filter(t => (0, Dom7Entry.default)(t).parents(".swiper")[0] === swiper.el))), "bullets" === t.type && t.clickable && n.addClass(t.clickableClass), n.addClass(t.modifierClass + t.type), n.addClass(t.modifierClass + swiper.params.direction), "bullets" === t.type && t.dynamicBullets && (n.addClass(`${t.modifierClass}${t.type}-dynamic`), l = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && n.addClass(t.progressbarOppositeClass), t.clickable && n.on("click", (0, Unidentified468.default)(t.bulletClass), function (t) {
      t.preventDefault();
      let n = (0, Dom7Entry.default)(this).index() * swiper.params.slidesPerGroup;
      swiper.params.loop && (n += swiper.loopedSlides), swiper.slideTo(n);
    }), Object.assign(swiper.pagination, {
      $el: n,
      el: n[0]
    }), swiper.enabled || n.addClass(t.lockClass));
  }
  function m() {
    const t = swiper.params.pagination;
    if (u()) return;
    const n = swiper.pagination.$el;
    n.removeClass(t.hiddenClass), n.removeClass(t.modifierClass + t.type), n.removeClass(t.modifierClass + swiper.params.direction), swiper.pagination.bullets && swiper.pagination.bullets.removeClass && swiper.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && n.off("click", (0, Unidentified468.default)(t.bulletClass));
  }
  on("init", () => {
    f(), p(), h();
  }), on("activeIndexChange", () => {
    (swiper.params.loop || void 0 === swiper.snapIndex) && h();
  }), on("snapIndexChange", () => {
    swiper.params.loop || h();
  }), on("slidesLengthChange", () => {
    swiper.params.loop && (p(), h());
  }), on("snapGridLengthChange", () => {
    swiper.params.loop || (p(), h());
  }), on("destroy", () => {
    m();
  }), on("enable disable", () => {
    const {
      $el: $el
    } = swiper.pagination;
    $el && $el[swiper.enabled ? "removeClass" : "addClass"](swiper.params.pagination.lockClass);
  }), on("lock unlock", () => {
    h();
  }), on("click", (t, n) => {
    const i = n.target,
      {
        $el: $el
      } = swiper.pagination;
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el.length > 0 && !(0, Dom7Entry.default)(i).hasClass(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && i === swiper.navigation.nextEl || swiper.navigation.prevEl && i === swiper.navigation.prevEl)) return;
      const t = $el.hasClass(swiper.params.pagination.hiddenClass);
      emit(!0 === t ? "paginationShow" : "paginationHide"), $el.toggleClass(swiper.params.pagination.hiddenClass);
    }
  }), Object.assign(swiper.pagination, {
    render: p,
    update: h,
    init: f,
    destroy: m
  });
}
export { s as default };
