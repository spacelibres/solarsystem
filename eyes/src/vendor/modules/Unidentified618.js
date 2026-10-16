/** @eyes-analysis
 * 文件职责：构造基准参数；将角秒和 ppm 变换到内部单位
 * 依据：// Recovered from vendors.js:1779501-1780146.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1779501-1780146.
import * as D2R from "./D2R.js";
let defaultExport;
defaultExport = function (e, t, n, i, a, s, o) {
  var c = {};
  return c.datum_type = D2R.PJD_NODATUM, t && (c.datum_type = D2R.PJD_WGS84, c.datum_params = t.map(parseFloat), 0 === c.datum_params[0] && 0 === c.datum_params[1] && 0 === c.datum_params[2] || (c.datum_type = D2R.PJD_3PARAM), c.datum_params.length > 3 && (0 === c.datum_params[3] && 0 === c.datum_params[4] && 0 === c.datum_params[5] && 0 === c.datum_params[6] || (c.datum_type = D2R.PJD_7PARAM, c.datum_params[3] *= D2R.SEC_TO_RAD, c.datum_params[4] *= D2R.SEC_TO_RAD, c.datum_params[5] *= D2R.SEC_TO_RAD, c.datum_params[6] = c.datum_params[6] / 1e6 + 1))), o && (c.datum_type = D2R.PJD_GRIDSHIFT, c.grids = o), c.a = n, c.b = i, c.es = a, c.ep2 = s, c;
};
export { defaultExport as default };
