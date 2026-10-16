// Recovered from vendors.js:1603735-1608151.
import * as animateCSSModeScroll from "./animateCSSModeScroll.js";
function i() {
  const e = this;
  function t(t) {
    return e.isHorizontal() ? t : {
      width: "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      marginRight: "marginBottom"
    }[t];
  }
  function n(e, n) {
    return parseFloat(e.getPropertyValue(t(n)) || 0);
  }
  const i = e.params,
    {
      $wrapperEl: $wrapperEl,
      size: size,
      rtlTranslate: rtlTranslate,
      wrongRTL: wrongRTL
    } = e,
    l = e.virtual && i.virtual.enabled,
    u = l ? e.virtual.slides.length : e.slides.length,
    d = $wrapperEl.children(`.${e.params.slideClass}`),
    h = l ? e.virtual.slides.length : d.length;
  let p = [];
  const f = [],
    m = [];
  let M = i.slidesOffsetBefore;
  "function" == typeof M && (M = i.slidesOffsetBefore.call(e));
  let _ = i.slidesOffsetAfter;
  "function" == typeof _ && (_ = i.slidesOffsetAfter.call(e));
  const A = e.snapGrid.length,
    g = e.slidesGrid.length;
  let b = i.spaceBetween,
    y = -M,
    L = 0,
    v = 0;
  if (void 0 === size) return;
  "string" == typeof b && b.indexOf("%") >= 0 && (b = parseFloat(b.replace("%", "")) / 100 * size), e.virtualSize = -b, rtlTranslate ? d.css({
    marginLeft: "",
    marginBottom: "",
    marginTop: ""
  }) : d.css({
    marginRight: "",
    marginBottom: "",
    marginTop: ""
  }), i.centeredSlides && i.cssMode && ((0, animateCSSModeScroll.setCSSProperty)(e.wrapperEl, "--swiper-centered-offset-before", ""), (0, animateCSSModeScroll.setCSSProperty)(e.wrapperEl, "--swiper-centered-offset-after", ""));
  const T = i.grid && i.grid.rows > 1 && e.grid;
  let S;
  T && e.grid.initSlides(h);
  const w = "auto" === i.slidesPerView && i.breakpoints && Object.keys(i.breakpoints).filter(e => void 0 !== i.breakpoints[e].slidesPerView).length > 0;
  for (let r = 0; r < h; r += 1) {
    S = 0;
    const a = d.eq(r);
    if (T && e.grid.updateSlide(r, a, h, t), "none" !== a.css("display")) {
      if ("auto" === i.slidesPerView) {
        w && (d[r].style[t("width")] = "");
        const s = getComputedStyle(a[0]),
          o = a[0].style.transform,
          c = a[0].style.webkitTransform;
        if (o && (a[0].style.transform = "none"), c && (a[0].style.webkitTransform = "none"), i.roundLengths) S = e.isHorizontal() ? a.outerWidth(!0) : a.outerHeight(!0);else {
          const e = n(s, "width"),
            t = n(s, "padding-left"),
            r = n(s, "padding-right"),
            i = n(s, "margin-left"),
            o = n(s, "margin-right"),
            c = s.getPropertyValue("box-sizing");
          if (c && "border-box" === c) S = e + i + o;else {
            const {
              clientWidth: clientWidth,
              offsetWidth: offsetWidth
            } = a[0];
            S = e + t + r + i + o + (offsetWidth - clientWidth);
          }
        }
        o && (a[0].style.transform = o), c && (a[0].style.webkitTransform = c), i.roundLengths && (S = Math.floor(S));
      } else S = (size - (i.slidesPerView - 1) * b) / i.slidesPerView, i.roundLengths && (S = Math.floor(S)), d[r] && (d[r].style[t("width")] = `${S}px`);
      d[r] && (d[r].swiperSlideSize = S), m.push(S), i.centeredSlides ? (y = y + S / 2 + L / 2 + b, 0 === L && 0 !== r && (y = y - size / 2 - b), 0 === r && (y = y - size / 2 - b), Math.abs(y) < .001 && (y = 0), i.roundLengths && (y = Math.floor(y)), v % i.slidesPerGroup === 0 && p.push(y), f.push(y)) : (i.roundLengths && (y = Math.floor(y)), (v - Math.min(e.params.slidesPerGroupSkip, v)) % e.params.slidesPerGroup === 0 && p.push(y), f.push(y), y = y + S + b), e.virtualSize += S + b, L = S, v += 1;
    }
  }
  if (e.virtualSize = Math.max(e.virtualSize, size) + _, rtlTranslate && wrongRTL && ("slide" === i.effect || "coverflow" === i.effect) && $wrapperEl.css({
    width: `${e.virtualSize + i.spaceBetween}px`
  }), i.setWrapperSize && $wrapperEl.css({
    [t("width")]: `${e.virtualSize + i.spaceBetween}px`
  }), T && e.grid.updateWrapperSize(S, p, t), !i.centeredSlides) {
    const t = [];
    for (let n = 0; n < p.length; n += 1) {
      let r = p[n];
      i.roundLengths && (r = Math.floor(r)), p[n] <= e.virtualSize - size && t.push(r);
    }
    p = t, Math.floor(e.virtualSize - size) - Math.floor(p[p.length - 1]) > 1 && p.push(e.virtualSize - size);
  }
  if (0 === p.length && (p = [0]), 0 !== i.spaceBetween) {
    const n = e.isHorizontal() && rtlTranslate ? "marginLeft" : t("marginRight");
    d.filter((e, t) => !i.cssMode || t !== d.length - 1).css({
      [n]: `${b}px`
    });
  }
  if (i.centeredSlides && i.centeredSlidesBounds) {
    let e = 0;
    m.forEach(t => {
      e += t + (i.spaceBetween ? i.spaceBetween : 0);
    }), e -= i.spaceBetween;
    const t = e - size;
    p = p.map(e => e < 0 ? -M : e > t ? t + _ : e);
  }
  if (i.centerInsufficientSlides) {
    let e = 0;
    if (m.forEach(t => {
      e += t + (i.spaceBetween ? i.spaceBetween : 0);
    }), e -= i.spaceBetween, e < size) {
      const t = (size - e) / 2;
      p.forEach((e, n) => {
        p[n] = e - t;
      }), f.forEach((e, n) => {
        f[n] = e + t;
      });
    }
  }
  if (Object.assign(e, {
    slides: d,
    snapGrid: p,
    slidesGrid: f,
    slidesSizesGrid: m
  }), i.centeredSlides && i.cssMode && !i.centeredSlidesBounds) {
    (0, animateCSSModeScroll.setCSSProperty)(e.wrapperEl, "--swiper-centered-offset-before", -p[0] + "px"), (0, animateCSSModeScroll.setCSSProperty)(e.wrapperEl, "--swiper-centered-offset-after", e.size / 2 - m[m.length - 1] / 2 + "px");
    const t = -e.snapGrid[0],
      n = -e.slidesGrid[0];
    e.snapGrid = e.snapGrid.map(e => e + t), e.slidesGrid = e.slidesGrid.map(e => e + n);
  }
  h !== u && e.emit("slidesLengthChange"), p.length !== A && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), f.length !== g && e.emit("slidesGridLengthChange"), i.watchSlidesProgress && e.updateSlidesOffset();
}
export { i as default };
