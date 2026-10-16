// Recovered from vendors.js:1594957-1597720.
import * as extend from "./extend.js";
function deleteProps(e) {
  const t = e;
  Object.keys(t).forEach(e => {
    try {
      t[e] = null;
    } catch (e) {}
    try {
      delete t[e];
    } catch (e) {}
  });
}
function nextTick(e, t = 0) {
  return setTimeout(e, t);
}
function now() {
  return Date.now();
}
function getComputedStyle(e) {
  const t = (0, extend.getWindow)();
  let n;
  return t.getComputedStyle && (n = t.getComputedStyle(e, null)), !n && e.currentStyle && (n = e.currentStyle), n || (n = e.style), n;
}
function getTranslate(e, t = "x") {
  const n = (0, extend.getWindow)();
  let i, a, s;
  const c = getComputedStyle(e);
  return n.WebKitCSSMatrix ? (a = c.transform || c.webkitTransform, a.split(",").length > 6 && (a = a.split(", ").map(e => e.replace(",", ".")).join(", ")), s = new n.WebKitCSSMatrix("none" === a ? "" : a)) : (s = c.MozTransform || c.OTransform || c.MsTransform || c.msTransform || c.transform || c.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = s.toString().split(",")), "x" === t && (a = n.WebKitCSSMatrix ? s.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (a = n.WebKitCSSMatrix ? s.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), a || 0;
}
function isObject(e) {
  return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1);
}
function u(e) {
  return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType);
}
function d(...e) {
  const t = Object(e[0]),
    n = ["__proto__", "constructor", "prototype"];
  for (let r = 1; r < e.length; r += 1) {
    const i = e[r];
    if (null != i && !u(i)) {
      const e = Object.keys(Object(i)).filter(e => n.indexOf(e) < 0);
      for (let n = 0, r = e.length; n < r; n += 1) {
        const r = e[n],
          a = Object.getOwnPropertyDescriptor(i, r);
        void 0 !== a && a.enumerable && (isObject(t[r]) && isObject(i[r]) ? i[r].__swiper__ ? t[r] = i[r] : d(t[r], i[r]) : !isObject(t[r]) && isObject(i[r]) ? (t[r] = {}, i[r].__swiper__ ? t[r] = i[r] : d(t[r], i[r])) : t[r] = i[r]);
      }
    }
  }
  return t;
}
function setCSSProperty(e, t, n) {
  e.style.setProperty(t, n);
}
function animateCSSModeScroll({
  swiper: swiper,
  targetPosition: targetPosition,
  side: side
}) {
  const i = (0, extend.getWindow)(),
    a = -swiper.translate;
  let s,
    o = null;
  const c = swiper.params.speed;
  swiper.wrapperEl.style.scrollSnapType = "none", i.cancelAnimationFrame(swiper.cssModeFrameID);
  const l = targetPosition > a ? "next" : "prev",
    u = (e, t) => "next" === l && e >= t || "prev" === l && e <= t,
    d = () => {
      s = new Date().getTime(), null === o && (o = s);
      const r = Math.max(Math.min((s - o) / c, 1), 0),
        l = .5 - Math.cos(r * Math.PI) / 2;
      let h = a + l * (targetPosition - a);
      if (u(h, targetPosition) && (h = targetPosition), swiper.wrapperEl.scrollTo({
        [side]: h
      }), u(h, targetPosition)) return swiper.wrapperEl.style.overflow = "hidden", swiper.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
        swiper.wrapperEl.style.overflow = "", swiper.wrapperEl.scrollTo({
          [side]: h
        });
      }), void i.cancelAnimationFrame(swiper.cssModeFrameID);
      swiper.cssModeFrameID = i.requestAnimationFrame(d);
    };
  d();
}
export { animateCSSModeScroll };
export { deleteProps };
export { d as extend };
export { getComputedStyle };
export { getTranslate };
export { isObject };
export { nextTick };
export { now };
export { setCSSProperty };
