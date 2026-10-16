// Recovered from vendors.js:1639383-1639981.
import * as extend from "./extend.js";
function i(e, t = "window", n) {
  if (!e || "container" === t && !n) return;
  let i = !1;
  const a = (0, extend.getWindow)(),
    s = "window" === t ? a.innerHeight : n.clientHeight,
    o = Object.keys(e).map(e => {
      if ("string" == typeof e && 0 === e.indexOf("@")) {
        const t = parseFloat(e.substr(1));
        return {
          value: s * t,
          point: e
        };
      }
      return {
        value: e,
        point: e
      };
    });
  o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
  for (let e = 0; e < o.length; e += 1) {
    const {
      point: point,
      value: value
    } = o[e];
    "window" === t ? a.matchMedia(`(min-width: ${value}px)`).matches && (i = point) : value <= n.clientWidth && (i = point);
  }
  return i || "max";
}
export { i as default };
