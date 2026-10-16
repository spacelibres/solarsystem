// Recovered from vendors.js:1724634-1725891.
import * as Unidentified588 from "./Unidentified588.js";
import * as Unidentified606 from "./Unidentified606.js";
import * as add from "./add.js";
import * as eccentricity from "./eccentricity.js";
import * as Unidentified617 from "./Unidentified617.js";
import * as Unidentified618 from "./Unidentified618.js";
import * as Unidentified595 from "./Unidentified595.js";
import * as getNadgrids from "./getNadgrids.js";
let defaultExport;
function d(e, t) {
  if (!(this instanceof d)) return new d(e);
  this.forward = null, this.inverse = null, this.init = null, this.name, this.axis, this.names = null, this.title, t = t || function (e) {
    if (e) throw e;
  };
  var n = (0, Unidentified588.default)(e);
  if ("object" == typeof n) {
    var a = d.projections.get(n.projName);
    if (a) {
      if (n.datumCode && "none" !== n.datumCode) {
        var h = (0, Unidentified595.default)(Unidentified617.default, n.datumCode);
        h && (n.datum_params = n.datum_params || (h.towgs84 ? h.towgs84.split(",") : null), n.ellps = h.ellipse, n.datumName = h.datumName ? h.datumName : n.datumCode);
      }
      n.k0 = n.k0 || 1, n.axis = n.axis || "enu", n.ellps = n.ellps || "wgs84", n.lat1 = n.lat1 || n.lat0;
      var p = (0, eccentricity.sphere)(n.a, n.b, n.rf, n.ellps, n.sphere),
        f = (0, eccentricity.eccentricity)(p.a, p.b, p.rf, n.R_A),
        m = (0, getNadgrids.getNadgrids)(n.nadgrids),
        datum = n.datum || (0, Unidentified618.default)(n.datumCode, n.datum_params, p.a, p.b, f.es, f.ep2, m);
      (0, Unidentified606.default)(this, n), (0, Unidentified606.default)(this, a), this.a = p.a, this.b = p.b, this.rf = p.rf, this.sphere = p.sphere, this.es = f.es, this.e = f.e, this.ep2 = f.ep2, this.datum = datum, "init" in this && "function" == typeof this.init && this.init(), t(null, this);
    } else t("Could not get projection name from: " + e);
  } else t("Could not parse to valid json: " + e);
}
d.projections = add.default, d.projections.start(), defaultExport = d;
export { defaultExport as default };
