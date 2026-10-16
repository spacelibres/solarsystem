/** @eyes-analysis
 * 文件职责：实现 loadImage；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1641116-1641435.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1641116-1641435.
import * as extend from "./extend.js";
import * as Dom7Entry from "./Dom7Entry.js";
function a(e, t, n, a, s, o) {
  const c = (0, extend.getWindow)();
  let l;
  function u() {
    o && o();
  }
  (0, Dom7Entry.default)(e).parent("picture")[0] || e.complete && s ? u() : t ? (l = new c.Image(), l.onload = u, l.onerror = u, a && (l.sizes = a), n && (l.srcset = n), t && (l.src = t)) : u();
}
export { a as default };
