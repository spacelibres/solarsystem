/** @eyes-analysis
 * 文件职责：实现 transform；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1783099-1784364.；exports: default, transformInternal
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1783099-1784364.
import * as D2R from "./D2R.js";
import * as applyGridShift from "./applyGridShift.js";
import * as adjustAxisFromEnu from "./adjustAxisFromEnu.js";
import * as Unidentified587 from "./Unidentified587.js";
import * as Unidentified624 from "./Unidentified624.js";
import * as Unidentified625 from "./Unidentified625.js";
function transformInternal(e, t, n, o) {
  var u,
    d = void 0 !== n.z;
  if ((0, Unidentified625.default)(n), e.datum && t.datum && function (e, t) {
    return (e.datum.datum_type === D2R.PJD_3PARAM || e.datum.datum_type === D2R.PJD_7PARAM || e.datum.datum_type === D2R.PJD_GRIDSHIFT) && "WGS84" !== t.datumCode || (t.datum.datum_type === D2R.PJD_3PARAM || t.datum.datum_type === D2R.PJD_7PARAM || t.datum.datum_type === D2R.PJD_GRIDSHIFT) && "WGS84" !== e.datumCode;
  }(e, t) && (n = transformInternal(e, u = new Unidentified587.default("WGS84"), n, o), e = u), o && "enu" !== e.axis && (n = (0, adjustAxisFromEnu.adjustAxisToEnu)(e, n)), "longlat" === e.projName) n = {
    x: n.x * D2R.D2R,
    y: n.y * D2R.D2R,
    z: n.z || 0
  };else if (e.to_meter && (n = {
    x: n.x * e.to_meter,
    y: n.y * e.to_meter,
    z: n.z || 0
  }), !(n = e.inverse(n))) return;
  if (e.from_greenwich && (n.x += e.from_greenwich), n = (0, applyGridShift.default)(e.datum, t.datum, n)) return t.from_greenwich && (n = {
    x: n.x - t.from_greenwich,
    y: n.y,
    z: n.z || 0
  }), "longlat" === t.projName ? n = {
    x: n.x * D2R.R2D,
    y: n.y * D2R.R2D,
    z: n.z || 0
  } : (n = t.forward(n), t.to_meter && (n = {
    x: n.x / t.to_meter,
    y: n.y / t.to_meter,
    z: n.z || 0
  })), o && "enu" !== t.axis ? (0, adjustAxisFromEnu.adjustAxisFromEnu)(t, n) : (n && !d && "geocent" !== t.projName && delete n.z, n);
}
function u(e, t, n, r) {
  return transformInternal(e, t, Array.isArray(n) ? (0, Unidentified624.default)(n) : {
    x: n.x,
    y: n.y,
    z: n.z,
    m: n.m
  }, r);
}
export { u as default };
export { transformInternal };
