// Recovered from vendors.js:1779501-1780146.
import * as D2R from "./D2R.js";
let defaultExport;
defaultExport = function (e, t, n, i, a, s, o) {
  var c = {};
  return c.datum_type = D2R.PJD_NODATUM, t && (c.datum_type = D2R.PJD_WGS84, c.datum_params = t.map(parseFloat), 0 === c.datum_params[0] && 0 === c.datum_params[1] && 0 === c.datum_params[2] || (c.datum_type = D2R.PJD_3PARAM), c.datum_params.length > 3 && (0 === c.datum_params[3] && 0 === c.datum_params[4] && 0 === c.datum_params[5] && 0 === c.datum_params[6] || (c.datum_type = D2R.PJD_7PARAM, c.datum_params[3] *= D2R.SEC_TO_RAD, c.datum_params[4] *= D2R.SEC_TO_RAD, c.datum_params[5] *= D2R.SEC_TO_RAD, c.datum_params[6] = c.datum_params[6] / 1e6 + 1))), o && (c.datum_type = D2R.PJD_GRIDSHIFT, c.grids = o), c.a = n, c.b = i, c.es = a, c.ep2 = s, c;
};
export { defaultExport as default };
