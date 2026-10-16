/** @eyes-analysis
 * 文件职责：实现 getBreakpoint；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1639383-1639981.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
