// Recovered from vendors.js:1689624-1693596.
import * as Unidentified468 from "./Unidentified468.js";
import * as Dom7Entry from "./Dom7Entry.js";
function a({
  swiper: swiper,
  extendParams: extendParams,
  on: on
}) {
  extendParams({
    a11y: {
      enabled: !0,
      notificationClass: "swiper-notification",
      prevSlideMessage: "Previous slide",
      nextSlideMessage: "Next slide",
      firstSlideMessage: "This is the first slide",
      lastSlideMessage: "This is the last slide",
      paginationBulletMessage: "Go to slide {{index}}",
      slideLabelMessage: "{{index}} / {{slidesLength}}",
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      itemRoleDescriptionMessage: null,
      slideRole: "group"
    }
  });
  let a = null;
  function s(e) {
    const t = a;
    0 !== t.length && (t.html(""), t.html(e));
  }
  function o(e) {
    e.attr("tabIndex", "0");
  }
  function c(e) {
    e.attr("tabIndex", "-1");
  }
  function l(e, t) {
    e.attr("role", t);
  }
  function u(e, t) {
    e.attr("aria-roledescription", t);
  }
  function d(e, t) {
    e.attr("aria-label", t);
  }
  function h(e) {
    e.attr("aria-disabled", !0);
  }
  function p(e) {
    e.attr("aria-disabled", !1);
  }
  function f(t) {
    if (13 !== t.keyCode && 32 !== t.keyCode) return;
    const n = swiper.params.a11y,
      a = (0, Dom7Entry.default)(t.target);
    swiper.navigation && swiper.navigation.$nextEl && a.is(swiper.navigation.$nextEl) && (swiper.isEnd && !swiper.params.loop || swiper.slideNext(), swiper.isEnd ? s(n.lastSlideMessage) : s(n.nextSlideMessage)), swiper.navigation && swiper.navigation.$prevEl && a.is(swiper.navigation.$prevEl) && (swiper.isBeginning && !swiper.params.loop || swiper.slidePrev(), swiper.isBeginning ? s(n.firstSlideMessage) : s(n.prevSlideMessage)), swiper.pagination && a.is((0, Unidentified468.default)(swiper.params.pagination.bulletClass)) && a[0].click();
  }
  function m() {
    if (swiper.params.loop || !swiper.navigation) return;
    const {
      $nextEl: $nextEl,
      $prevEl: $prevEl
    } = swiper.navigation;
    $prevEl && $prevEl.length > 0 && (swiper.isBeginning ? (h($prevEl), c($prevEl)) : (p($prevEl), o($prevEl))), $nextEl && $nextEl.length > 0 && (swiper.isEnd ? (h($nextEl), c($nextEl)) : (p($nextEl), o($nextEl)));
  }
  function M() {
    return swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length;
  }
  const _ = (e, t, n) => {
    o(e), "BUTTON" !== e[0].tagName && (l(e, "button"), e.on("keydown", f)), d(e, n), function (e, t) {
      e.attr("aria-controls", t);
    }(e, t);
  };
  function A() {
    const t = swiper.params.a11y;
    swiper.$el.append(a);
    const n = swiper.$el;
    t.containerRoleDescriptionMessage && u(n, t.containerRoleDescriptionMessage), t.containerMessage && d(n, t.containerMessage);
    const s = swiper.$wrapperEl,
      o = s.attr("id") || `swiper-wrapper-${function (e = 16) {
        return "x".repeat(e).replace(/x/g, () => Math.round(16 * Math.random()).toString(16));
      }(16)}`,
      c = swiper.params.autoplay && swiper.params.autoplay.enabled ? "off" : "polite";
    var h;
    h = o, s.attr("id", h), function (e, t) {
      e.attr("aria-live", t);
    }(s, c), t.itemRoleDescriptionMessage && u((0, Dom7Entry.default)(swiper.slides), t.itemRoleDescriptionMessage), l((0, Dom7Entry.default)(swiper.slides), t.slideRole);
    const p = swiper.params.loop ? swiper.slides.filter(t => !t.classList.contains(swiper.params.slideDuplicateClass)).length : swiper.slides.length;
    let m, A;
    swiper.slides.each((n, r) => {
      const a = (0, Dom7Entry.default)(n),
        s = swiper.params.loop ? parseInt(a.attr("data-swiper-slide-index"), 10) : r;
      d(a, t.slideLabelMessage.replace(/\{\{index\}\}/, s + 1).replace(/\{\{slidesLength\}\}/, p));
    }), swiper.navigation && swiper.navigation.$nextEl && (m = swiper.navigation.$nextEl), swiper.navigation && swiper.navigation.$prevEl && (A = swiper.navigation.$prevEl), m && m.length && _(m, o, t.nextSlideMessage), A && A.length && _(A, o, t.prevSlideMessage), M() && swiper.pagination.$el.on("keydown", (0, Unidentified468.default)(swiper.params.pagination.bulletClass), f);
  }
  on("beforeInit", () => {
    a = (0, Dom7Entry.default)(`<span class="${swiper.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`);
  }), on("afterInit", () => {
    swiper.params.a11y.enabled && (A(), m());
  }), on("toEdge", () => {
    swiper.params.a11y.enabled && m();
  }), on("fromEdge", () => {
    swiper.params.a11y.enabled && m();
  }), on("paginationUpdate", () => {
    swiper.params.a11y.enabled && function () {
      const t = swiper.params.a11y;
      M() && swiper.pagination.bullets.each(n => {
        const r = (0, Dom7Entry.default)(n);
        o(r), swiper.params.pagination.renderBullet || (l(r, "button"), d(r, t.paginationBulletMessage.replace(/\{\{index\}\}/, r.index() + 1)));
      });
    }();
  }), on("destroy", () => {
    swiper.params.a11y.enabled && function () {
      let t, n;
      a && a.length > 0 && a.remove(), swiper.navigation && swiper.navigation.$nextEl && (t = swiper.navigation.$nextEl), swiper.navigation && swiper.navigation.$prevEl && (n = swiper.navigation.$prevEl), t && t.off("keydown", f), n && n.off("keydown", f), M() && swiper.pagination.$el.off("keydown", (0, Unidentified468.default)(swiper.params.pagination.bulletClass), f);
    }();
  });
}
export { a as default };
