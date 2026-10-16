// Recovered from vendors.js:1655406-1658003.
import * as Unidentified466 from "./Unidentified466.js";
import * as Dom7Entry from "./Dom7Entry.js";
function a({
  swiper: swiper,
  extendParams: extendParams,
  on: on,
  emit: emit
}) {
  function s(t) {
    let n;
    return t && (n = (0, Dom7Entry.default)(t), swiper.params.uniqueNavElements && "string" == typeof t && n.length > 1 && 1 === swiper.$el.find(t).length && (n = swiper.$el.find(t))), n;
  }
  function o(t, n) {
    const r = swiper.params.navigation;
    t && t.length > 0 && (t[n ? "addClass" : "removeClass"](r.disabledClass), t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = n), swiper.params.watchOverflow && swiper.enabled && t[swiper.isLocked ? "addClass" : "removeClass"](r.lockClass));
  }
  function c() {
    if (swiper.params.loop) return;
    const {
      $nextEl: $nextEl,
      $prevEl: $prevEl
    } = swiper.navigation;
    o($prevEl, swiper.isBeginning), o($nextEl, swiper.isEnd);
  }
  function l(t) {
    t.preventDefault(), swiper.isBeginning && !swiper.params.loop || swiper.slidePrev();
  }
  function u(t) {
    t.preventDefault(), swiper.isEnd && !swiper.params.loop || swiper.slideNext();
  }
  function d() {
    const t = swiper.params.navigation;
    if (swiper.params.navigation = (0, Unidentified466.default)(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    }), !t.nextEl && !t.prevEl) return;
    const n = s(t.nextEl),
      i = s(t.prevEl);
    n && n.length > 0 && n.on("click", u), i && i.length > 0 && i.on("click", l), Object.assign(swiper.navigation, {
      $nextEl: n,
      nextEl: n && n[0],
      $prevEl: i,
      prevEl: i && i[0]
    }), swiper.enabled || (n && n.addClass(t.lockClass), i && i.addClass(t.lockClass));
  }
  function h() {
    const {
      $nextEl: $nextEl,
      $prevEl: $prevEl
    } = swiper.navigation;
    $nextEl && $nextEl.length && ($nextEl.off("click", u), $nextEl.removeClass(swiper.params.navigation.disabledClass)), $prevEl && $prevEl.length && ($prevEl.off("click", l), $prevEl.removeClass(swiper.params.navigation.disabledClass));
  }
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock"
    }
  }), swiper.navigation = {
    nextEl: null,
    $nextEl: null,
    prevEl: null,
    $prevEl: null
  }, on("init", () => {
    d(), c();
  }), on("toEdge fromEdge lock unlock", () => {
    c();
  }), on("destroy", () => {
    h();
  }), on("enable disable", () => {
    const {
      $nextEl: $nextEl,
      $prevEl: $prevEl
    } = swiper.navigation;
    $nextEl && $nextEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass), $prevEl && $prevEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
  }), on("click", (t, n) => {
    const {
        $nextEl: $nextEl,
        $prevEl: $prevEl
      } = swiper.navigation,
      o = n.target;
    if (swiper.params.navigation.hideOnClick && !(0, Dom7Entry.default)(o).is($prevEl) && !(0, Dom7Entry.default)(o).is($nextEl)) {
      if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === o || swiper.pagination.el.contains(o))) return;
      let t;
      $nextEl ? t = $nextEl.hasClass(swiper.params.navigation.hiddenClass) : $prevEl && (t = $prevEl.hasClass(swiper.params.navigation.hiddenClass)), emit(!0 === t ? "navigationShow" : "navigationHide"), $nextEl && $nextEl.toggleClass(swiper.params.navigation.hiddenClass), $prevEl && $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
    }
  }), Object.assign(swiper.navigation, {
    update: c,
    init: d,
    destroy: h
  });
}
export { a as default };
