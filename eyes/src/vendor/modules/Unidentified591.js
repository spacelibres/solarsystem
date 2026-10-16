/** @eyes-analysis
 * 文件职责：解析 +proj 参数并把角度转为弧度
 * 依据：// Recovered from vendors.js:1728445-1730389.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1728445-1730389.
import * as D2R from "./D2R.js";
import * as Unidentified593 from "./Unidentified593.js";
import * as Unidentified594 from "./Unidentified594.js";
import * as Unidentified595 from "./Unidentified595.js";
function o(e) {
  var t,
    n,
    o,
    c = {},
    l = e.split("+").map(function (e) {
      return e.trim();
    }).filter(function (e) {
      return e;
    }).reduce(function (e, t) {
      var n = t.split("=");
      return n.push(!0), e[n[0].toLowerCase()] = n[1], e;
    }, {}),
    u = {
      proj: "projName",
      datum: "datumCode",
      rf: function (e) {
        c.rf = parseFloat(e);
      },
      lat_0: function (e) {
        c.lat0 = e * D2R.D2R;
      },
      lat_1: function (e) {
        c.lat1 = e * D2R.D2R;
      },
      lat_2: function (e) {
        c.lat2 = e * D2R.D2R;
      },
      lat_ts: function (e) {
        c.lat_ts = e * D2R.D2R;
      },
      lon_0: function (e) {
        c.long0 = e * D2R.D2R;
      },
      lon_1: function (e) {
        c.long1 = e * D2R.D2R;
      },
      lon_2: function (e) {
        c.long2 = e * D2R.D2R;
      },
      alpha: function (e) {
        c.alpha = parseFloat(e) * D2R.D2R;
      },
      gamma: function (e) {
        c.rectified_grid_angle = parseFloat(e) * D2R.D2R;
      },
      lonc: function (e) {
        c.longc = e * D2R.D2R;
      },
      x_0: function (e) {
        c.x0 = parseFloat(e);
      },
      y_0: function (e) {
        c.y0 = parseFloat(e);
      },
      k_0: function (e) {
        c.k0 = parseFloat(e);
      },
      k: function (e) {
        c.k0 = parseFloat(e);
      },
      a: function (e) {
        c.a = parseFloat(e);
      },
      b: function (e) {
        c.b = parseFloat(e);
      },
      r: function (e) {
        c.a = c.b = parseFloat(e);
      },
      r_a: function () {
        c.R_A = !0;
      },
      zone: function (e) {
        c.zone = parseInt(e, 10);
      },
      south: function () {
        c.utmSouth = !0;
      },
      towgs84: function (e) {
        c.datum_params = e.split(",").map(function (e) {
          return parseFloat(e);
        });
      },
      to_meter: function (e) {
        c.to_meter = parseFloat(e);
      },
      units: function (e) {
        c.units = e;
        var t = (0, Unidentified595.default)(Unidentified594.default, e);
        t && (c.to_meter = t.to_meter);
      },
      from_greenwich: function (e) {
        c.from_greenwich = e * D2R.D2R;
      },
      pm: function (e) {
        var t = (0, Unidentified595.default)(Unidentified593.default, e);
        c.from_greenwich = (t || parseFloat(e)) * D2R.D2R;
      },
      nadgrids: function (e) {
        "@null" === e ? c.datumCode = "none" : c.nadgrids = e;
      },
      axis: function (e) {
        var t = "ewnsud";
        3 === e.length && -1 !== t.indexOf(e.substr(0, 1)) && -1 !== t.indexOf(e.substr(1, 1)) && -1 !== t.indexOf(e.substr(2, 1)) && (c.axis = e);
      },
      approx: function () {
        c.approx = !0;
      },
      over: function () {
        c.over = !0;
      }
    };
  for (t in l) n = l[t], t in u ? "function" == typeof (o = u[t]) ? o(n) : c[o] = n : c[t] = n;
  return "string" == typeof c.datumCode && "WGS84" !== c.datumCode && (c.datumCode = c.datumCode.toLowerCase()), c.projStr = e, c;
}
export { o as default };
