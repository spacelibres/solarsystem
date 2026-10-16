// Recovered from vendors.js:1725892-1726728.
import * as Unidentified589 from "./Unidentified589.js";
import * as Unidentified596 from "./Unidentified596.js";
import * as Unidentified591 from "./Unidentified591.js";
import * as Unidentified595 from "./Unidentified595.js";
let defaultExport;
var o = ["3857", "900913", "3785", "102113"];
defaultExport = function (e) {
  let t;
  if (function (e) {
    return "string" == typeof e;
  }(e)) {
    if (function (e) {
      return e in Unidentified589.default;
    }(e)) t = Unidentified589.default[e];else if (function (e) {
      return 0 !== e.indexOf("+") && -1 !== e.indexOf("[") || "object" == typeof e && !("srsCode" in e);
    }(e)) {
      t = (0, Unidentified596.default)(e);
      var n = function (e) {
        var t = (0, Unidentified595.default)(e, "extension");
        if (t) return (0, Unidentified595.default)(t, "proj4");
      }(t);
      n && (t = (0, Unidentified591.default)(n));
    } else (function (e) {
      return "+" === e[0];
    })(e) && (t = (0, Unidentified591.default)(e));
  } else t = "projName" in e ? e : (0, Unidentified596.default)(e);
  return t && function (e) {
    if (e.title) return 0 === e.title.toLowerCase().indexOf("epsg:") && o.indexOf(e.title.substr(5)) > -1;
    var t = (0, Unidentified595.default)(e, "authority");
    if (t) {
      var n = (0, Unidentified595.default)(t, "epsg");
      return n && o.indexOf(n) > -1;
    }
  }(t) ? Unidentified589.default["EPSG:3857"] : t;
};
export { defaultExport as default };
