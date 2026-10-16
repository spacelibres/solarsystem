/** @eyes-analysis
 * 文件职责：提供 compareDatums、geocentricFromWgs84、geocentricToGeodetic、geocentricToWgs84、geodeticToGeocentric；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1787187-1789329.；exports: compareDatums, geocentricFromWgs84, geocentricToGeodetic, geocentricToWgs84, geodeticToGeocentric
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1787187-1789329.
import * as D2R from "./D2R.js";
function compareDatums(e, t) {
  return e.datum_type === t.datum_type && !(e.a !== t.a || Math.abs(e.es - t.es) > 5e-11) && (e.datum_type === D2R.PJD_3PARAM ? e.datum_params[0] === t.datum_params[0] && e.datum_params[1] === t.datum_params[1] && e.datum_params[2] === t.datum_params[2] : e.datum_type !== D2R.PJD_7PARAM || e.datum_params[0] === t.datum_params[0] && e.datum_params[1] === t.datum_params[1] && e.datum_params[2] === t.datum_params[2] && e.datum_params[3] === t.datum_params[3] && e.datum_params[4] === t.datum_params[4] && e.datum_params[5] === t.datum_params[5] && e.datum_params[6] === t.datum_params[6]);
}
function geodeticToGeocentric(e, t, n) {
  var i,
    a,
    s,
    o,
    c = e.x,
    l = e.y,
    u = e.z ? e.z : 0;
  if (l < -D2R.HALF_PI && l > -1.001 * D2R.HALF_PI) l = -D2R.HALF_PI;else if (l > D2R.HALF_PI && l < 1.001 * D2R.HALF_PI) l = D2R.HALF_PI;else {
    if (l < -D2R.HALF_PI) return {
      x: -1 / 0,
      y: -1 / 0,
      z: e.z
    };
    if (l > D2R.HALF_PI) return {
      x: 1 / 0,
      y: 1 / 0,
      z: e.z
    };
  }
  return c > Math.PI && (c -= 2 * Math.PI), a = Math.sin(l), o = Math.cos(l), s = a * a, {
    x: ((i = n / Math.sqrt(1 - t * s)) + u) * o * Math.cos(c),
    y: (i + u) * o * Math.sin(c),
    z: (i * (1 - t) + u) * a
  };
}
function geocentricToGeodetic(e, t, n, i) {
  var a,
    s,
    o,
    c,
    l,
    u,
    d,
    h,
    p,
    f,
    m,
    M,
    _,
    A,
    g,
    b = 1e-12,
    y = e.x,
    L = e.y,
    v = e.z ? e.z : 0;
  if (a = Math.sqrt(y * y + L * L), s = Math.sqrt(y * y + L * L + v * v), a / n < b) {
    if (A = 0, s / n < b) return D2R.HALF_PI, g = -i, {
      x: e.x,
      y: e.y,
      z: e.z
    };
  } else A = Math.atan2(L, y);
  o = v / s, h = (c = a / s) * (1 - t) * (l = 1 / Math.sqrt(1 - t * (2 - t) * c * c)), p = o * l, _ = 0;
  do {
    _++, u = t * (d = n / Math.sqrt(1 - t * p * p)) / (d + (g = a * h + v * p - d * (1 - t * p * p))), M = (m = o * (l = 1 / Math.sqrt(1 - u * (2 - u) * c * c))) * h - (f = c * (1 - u) * l) * p, h = f, p = m;
  } while (M * M > 1e-24 && _ < 30);
  return {
    x: A,
    y: Math.atan(m / Math.abs(f)),
    z: g
  };
}
function geocentricToWgs84(e, t, n) {
  if (t === D2R.PJD_3PARAM) return {
    x: e.x + n[0],
    y: e.y + n[1],
    z: e.z + n[2]
  };
  if (t === D2R.PJD_7PARAM) {
    var i = n[0],
      a = n[1],
      s = n[2],
      o = n[3],
      c = n[4],
      l = n[5],
      u = n[6];
    return {
      x: u * (e.x - l * e.y + c * e.z) + i,
      y: u * (l * e.x + e.y - o * e.z) + a,
      z: u * (-c * e.x + o * e.y + e.z) + s
    };
  }
}
function geocentricFromWgs84(e, t, n) {
  if (t === D2R.PJD_3PARAM) return {
    x: e.x - n[0],
    y: e.y - n[1],
    z: e.z - n[2]
  };
  if (t === D2R.PJD_7PARAM) {
    var i = n[0],
      a = n[1],
      s = n[2],
      o = n[3],
      c = n[4],
      l = n[5],
      u = n[6],
      d = (e.x - i) / u,
      h = (e.y - a) / u,
      p = (e.z - s) / u;
    return {
      x: d + l * h - c * p,
      y: -l * d + h + o * p,
      z: c * d - o * h + p
    };
  }
}
export { compareDatums };
export { geocentricFromWgs84 };
export { geocentricToGeodetic };
export { geocentricToWgs84 };
export { geodeticToGeocentric };
