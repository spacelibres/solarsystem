// Recovered from vendors.js:1732435-1736922.
import * as buildPROJJSON from "./buildPROJJSON.js";
import * as detectWKTVersion from "./detectWKTVersion.js";
import * as Unidentified602 from "./Unidentified602.js";
import * as sExpr from "./sExpr.js";
import * as transformPROJJSON from "./transformPROJJSON.js";
import * as applyProjectionDefaults from "./applyProjectionDefaults.js";
var l = ["PROJECTEDCRS", "PROJCRS", "GEOGCS", "GEOCCS", "PROJCS", "LOCAL_CS", "GEODCRS", "GEODETICCRS", "GEODETICDATUM", "ENGCRS", "ENGINEERINGCRS"];
function u(e) {
  for (var t = Object.keys(e), n = 0, r = t.length; n < r; ++n) {
    var i = t[n];
    -1 !== l.indexOf(i) && d(e[i]), "object" == typeof e[i] && u(e[i]);
  }
}
function d(e) {
  if (e.AUTHORITY) {
    var t = Object.keys(e.AUTHORITY)[0];
    t && t in e.AUTHORITY && (e.title = t + ":" + e.AUTHORITY[t]);
  }
  if ("GEOGCS" === e.type ? e.projName = "longlat" : "LOCAL_CS" === e.type ? (e.projName = "identity", e.local = !0) : "object" == typeof e.PROJECTION ? e.projName = Object.keys(e.PROJECTION)[0] : e.projName = e.PROJECTION, e.AXIS) {
    for (var n = "", r = 0, i = e.AXIS.length; r < i; ++r) {
      var a = [e.AXIS[r][0].toLowerCase(), e.AXIS[r][1].toLowerCase()];
      -1 !== a[0].indexOf("north") || ("y" === a[0] || "lat" === a[0]) && "north" === a[1] ? n += "n" : -1 !== a[0].indexOf("south") || ("y" === a[0] || "lat" === a[0]) && "south" === a[1] ? n += "s" : -1 !== a[0].indexOf("east") || ("x" === a[0] || "lon" === a[0]) && "east" === a[1] ? n += "e" : -1 === a[0].indexOf("west") && ("x" !== a[0] && "lon" !== a[0] || "west" !== a[1]) || (n += "w");
    }
    2 === n.length && (n += "u"), 3 === n.length && (e.axis = n);
  }
  e.UNIT && (e.units = e.UNIT.name.toLowerCase(), "metre" === e.units && (e.units = "meter"), e.UNIT.convert && ("GEOGCS" === e.type ? e.DATUM && e.DATUM.SPHEROID && (e.to_meter = e.UNIT.convert * e.DATUM.SPHEROID.a) : e.to_meter = e.UNIT.convert));
  var s = e.GEOGCS;
  function o(t) {
    return t * (e.to_meter || 1);
  }
  "GEOGCS" === e.type && (s = e), s && (s.PRIMEM && s.PRIMEM.convert && (e.from_greenwich = (0, applyProjectionDefaults.d2r)(s.PRIMEM.convert)), s.DATUM ? e.datumCode = s.DATUM.name.toLowerCase() : e.datumCode = s.name.toLowerCase(), "d_" === e.datumCode.slice(0, 2) && (e.datumCode = e.datumCode.slice(2)), "new_zealand_1949" === e.datumCode && (e.datumCode = "nzgd49"), "wgs_1984" !== e.datumCode && "world_geodetic_system_1984" !== e.datumCode || ("Mercator_Auxiliary_Sphere" === e.PROJECTION && (e.sphere = !0), e.datumCode = "wgs84"), "belge_1972" === e.datumCode && (e.datumCode = "rnb72"), s.DATUM && s.DATUM.SPHEROID && (e.ellps = s.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk"), "international" === e.ellps.toLowerCase().slice(0, 13) && (e.ellps = "intl"), e.a = s.DATUM.SPHEROID.a, e.rf = parseFloat(s.DATUM.SPHEROID.rf)), s.DATUM && s.DATUM.TOWGS84 && (e.datum_params = s.DATUM.TOWGS84), ~e.datumCode.indexOf("osgb_1936") && (e.datumCode = "osgb36"), ~e.datumCode.indexOf("osni_1952") && (e.datumCode = "osni52"), (~e.datumCode.indexOf("tm65") || ~e.datumCode.indexOf("geodetic_datum_of_1965")) && (e.datumCode = "ire65"), "ch1903+" === e.datumCode && (e.datumCode = "ch1903"), ~e.datumCode.indexOf("israel") && (e.datumCode = "isr93")), e.b && !isFinite(e.b) && (e.b = e.a), e.rectified_grid_angle && (e.rectified_grid_angle = (0, applyProjectionDefaults.d2r)(e.rectified_grid_angle));
  [["standard_parallel_1", "Standard_Parallel_1"], ["standard_parallel_1", "Latitude of 1st standard parallel"], ["standard_parallel_2", "Standard_Parallel_2"], ["standard_parallel_2", "Latitude of 2nd standard parallel"], ["false_easting", "False_Easting"], ["false_easting", "False easting"], ["false-easting", "Easting at false origin"], ["false_northing", "False_Northing"], ["false_northing", "False northing"], ["false_northing", "Northing at false origin"], ["central_meridian", "Central_Meridian"], ["central_meridian", "Longitude of natural origin"], ["central_meridian", "Longitude of false origin"], ["latitude_of_origin", "Latitude_Of_Origin"], ["latitude_of_origin", "Central_Parallel"], ["latitude_of_origin", "Latitude of natural origin"], ["latitude_of_origin", "Latitude of false origin"], ["scale_factor", "Scale_Factor"], ["k0", "scale_factor"], ["latitude_of_center", "Latitude_Of_Center"], ["latitude_of_center", "Latitude_of_center"], ["lat0", "latitude_of_center", applyProjectionDefaults.d2r], ["longitude_of_center", "Longitude_Of_Center"], ["longitude_of_center", "Longitude_of_center"], ["longc", "longitude_of_center", applyProjectionDefaults.d2r], ["x0", "false_easting", o], ["y0", "false_northing", o], ["long0", "central_meridian", applyProjectionDefaults.d2r], ["lat0", "latitude_of_origin", applyProjectionDefaults.d2r], ["lat0", "standard_parallel_1", applyProjectionDefaults.d2r], ["lat1", "standard_parallel_1", applyProjectionDefaults.d2r], ["lat2", "standard_parallel_2", applyProjectionDefaults.d2r], ["azimuth", "Azimuth"], ["alpha", "azimuth", applyProjectionDefaults.d2r], ["srsCode", "name"]].forEach(function (t) {
    return n = e, i = (r = t)[0], a = r[1], void (!(i in n) && a in n && (n[i] = n[a], 3 === r.length && (n[i] = r[2](n[i]))));
    var n, r, i, a;
  }), (0, applyProjectionDefaults.applyProjectionDefaults)(e);
}
function h(e) {
  if ("object" == typeof e) return (0, transformPROJJSON.transformPROJJSON)(e);
  const t = (0, detectWKTVersion.detectWKTVersion)(e);
  var n = (0, Unidentified602.default)(e);
  if ("WKT2" === t) {
    const e = (0, buildPROJJSON.buildPROJJSON)(n);
    return (0, transformPROJJSON.transformPROJJSON)(e);
  }
  var c = n[0],
    l = {};
  return (0, sExpr.sExpr)(n, l), u(l), l[c];
}
export { h as default };
