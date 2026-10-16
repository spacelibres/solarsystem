/** @eyes-analysis
 * 文件职责：提供 transformPROJJSON；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1747229-1751837.；exports: transformPROJJSON
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1747229-1751837.
import * as applyProjectionDefaults from "./applyProjectionDefaults.js";
function i(e) {
  let t = {
    units: null,
    to_meter: void 0
  };
  return "string" == typeof e ? (t.units = e.toLowerCase(), "metre" === t.units && (t.units = "meter"), "meter" === t.units && (t.to_meter = 1)) : e && e.name && (t.units = e.name.toLowerCase(), "metre" === t.units && (t.units = "meter"), t.to_meter = e.conversion_factor), t;
}
function a(e) {
  return "object" == typeof e ? e.value * e.unit.conversion_factor : e;
}
function s(e, t) {
  e.ellipsoid.radius ? (t.a = e.ellipsoid.radius, t.rf = 0) : (t.a = a(e.ellipsoid.semi_major_axis), void 0 !== e.ellipsoid.inverse_flattening ? t.rf = e.ellipsoid.inverse_flattening : void 0 !== e.ellipsoid.semi_major_axis && void 0 !== e.ellipsoid.semi_minor_axis && (t.rf = t.a / (t.a - a(e.ellipsoid.semi_minor_axis))));
}
function transformPROJJSON(e, t = {}) {
  return e && "object" == typeof e ? "BoundCRS" === e.type ? (transformPROJJSON(e.source_crs, t), e.transformation && (e.transformation.method && "NTv2" === e.transformation.method.name ? t.nadgrids = e.transformation.parameters[0].value : t.datum_params = e.transformation.parameters.map(e => e.value)), t) : (Object.keys(e).forEach(n => {
    const r = e[n];
    if (null !== r) switch (n) {
      case "name":
        if (t.srsCode) break;
        t.name = r, t.srsCode = r;
        break;
      case "type":
        "GeographicCRS" === r ? t.projName = "longlat" : "GeodeticCRS" === r ? e.coordinate_system && "Cartesian" === e.coordinate_system.subtype ? t.projName = "geocent" : t.projName = "longlat" : "ProjectedCRS" === r && e.conversion && e.conversion.method && (t.projName = e.conversion.method.name);
        break;
      case "datum":
      case "datum_ensemble":
        r.ellipsoid && (t.ellps = r.ellipsoid.name, s(r, t)), r.prime_meridian && (t.from_greenwich = r.prime_meridian.longitude * Math.PI / 180);
        break;
      case "ellipsoid":
        t.ellps = r.name, s(r, t);
        break;
      case "prime_meridian":
        t.long0 = (r.longitude || 0) * Math.PI / 180;
        break;
      case "coordinate_system":
        if (r.axis) {
          const e = {
              east: "e",
              north: "n",
              west: "w",
              south: "s",
              up: "u",
              down: "d",
              geocentricx: "e",
              geocentricy: "n",
              geocentricz: "u"
            },
            n = r.axis.map(t => e[t.direction.toLowerCase()]);
          if (n.every(Boolean) && (t.axis = n.join(""), 2 === t.axis.length && (t.axis += "u")), r.unit) {
            const {
              units: units,
              to_meter: to_meter
            } = i(r.unit);
            t.units = units, t.to_meter = to_meter;
          } else if (r.axis[0] && r.axis[0].unit) {
            const {
              units: units,
              to_meter: to_meter
            } = i(r.axis[0].unit);
            t.units = units, t.to_meter = to_meter;
          }
        }
        break;
      case "id":
        r.authority && r.code && (t.title = r.authority + ":" + r.code);
        break;
      case "conversion":
        r.method && r.method.name && (t.projName = r.method.name), r.parameters && r.parameters.forEach(e => {
          const n = e.name.toLowerCase().replace(/\s+/g, "_"),
            r = e.value;
          e.unit && e.unit.conversion_factor ? t[n] = r * e.unit.conversion_factor : "degree" === e.unit ? t[n] = r * Math.PI / 180 : t[n] = r;
        });
        break;
      case "unit":
        r.name && (t.units = r.name.toLowerCase(), "metre" === t.units && (t.units = "meter")), r.conversion_factor && (t.to_meter = r.conversion_factor);
        break;
      case "base_crs":
        transformPROJJSON(r, t), t.datumCode = r.id ? r.id.authority + "_" + r.id.code : r.name;
    }
  }), void 0 !== t.latitude_of_false_origin && (t.lat0 = t.latitude_of_false_origin), void 0 !== t.longitude_of_false_origin && (t.long0 = t.longitude_of_false_origin), void 0 !== t.latitude_of_standard_parallel && (t.lat0 = t.latitude_of_standard_parallel, t.lat1 = t.latitude_of_standard_parallel), void 0 !== t.latitude_of_1st_standard_parallel && (t.lat1 = t.latitude_of_1st_standard_parallel), void 0 !== t.latitude_of_2nd_standard_parallel && (t.lat2 = t.latitude_of_2nd_standard_parallel), void 0 !== t.latitude_of_projection_centre && (t.lat0 = t.latitude_of_projection_centre), void 0 !== t.longitude_of_projection_centre && (t.longc = t.longitude_of_projection_centre), void 0 !== t.easting_at_false_origin && (t.x0 = t.easting_at_false_origin), void 0 !== t.northing_at_false_origin && (t.y0 = t.northing_at_false_origin), void 0 !== t.latitude_of_natural_origin && (t.lat0 = t.latitude_of_natural_origin), void 0 !== t.longitude_of_natural_origin && (t.long0 = t.longitude_of_natural_origin), void 0 !== t.longitude_of_origin && (t.long0 = t.longitude_of_origin), void 0 !== t.false_easting && (t.x0 = t.false_easting), t.easting_at_projection_centre && (t.x0 = t.easting_at_projection_centre), void 0 !== t.false_northing && (t.y0 = t.false_northing), t.northing_at_projection_centre && (t.y0 = t.northing_at_projection_centre), void 0 !== t.standard_parallel_1 && (t.lat1 = t.standard_parallel_1), void 0 !== t.standard_parallel_2 && (t.lat2 = t.standard_parallel_2), void 0 !== t.scale_factor_at_natural_origin && (t.k0 = t.scale_factor_at_natural_origin), void 0 !== t.scale_factor_at_projection_centre && (t.k0 = t.scale_factor_at_projection_centre), void 0 !== t.scale_factor_on_pseudo_standard_parallel && (t.k0 = t.scale_factor_on_pseudo_standard_parallel), void 0 !== t.azimuth && (t.alpha = t.azimuth), void 0 !== t.azimuth_at_projection_centre && (t.alpha = t.azimuth_at_projection_centre), t.angle_from_rectified_to_skew_grid && (t.rectified_grid_angle = t.angle_from_rectified_to_skew_grid), (0, applyProjectionDefaults.applyProjectionDefaults)(t), t) : e;
}
export { transformPROJJSON };
