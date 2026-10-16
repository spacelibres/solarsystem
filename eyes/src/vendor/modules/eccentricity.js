/** @eyes-analysis
 * 文件职责：提供 eccentricity、sphere；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1755771-1756263.；exports: eccentricity, sphere
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1755771-1756263.
import * as D2R from "./D2R.js";
import * as Unidentified616 from "./Unidentified616.js";
import * as Unidentified595 from "./Unidentified595.js";
const s = Unidentified616.default.WGS84;
function eccentricity(e, t, n, i) {
  var a = e * e,
    s = t * t,
    o = (a - s) / a,
    c = 0;
  return i ? (a = (e *= 1 - o * (D2R.SIXTH + o * (D2R.RA4 + o * D2R.RA6))) * e, o = 0) : c = Math.sqrt(o), {
    es: o,
    e: c,
    ep2: (a - s) / s
  };
}
function sphere(e, t, n, o, c) {
  if (!e) {
    var l = (0, Unidentified595.default)(Unidentified616.default, o);
    l || (l = s), e = l.a, t = l.b, n = l.rf;
  }
  return n && !t && (t = (1 - 1 / n) * e), (0 === n || Math.abs(e - t) < D2R.EPSLN) && (c = !0, t = e), {
    a: e,
    b: t,
    rf: n,
    sphere: c
  };
}
export { eccentricity };
export { sphere };
