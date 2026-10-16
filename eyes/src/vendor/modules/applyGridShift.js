/** @eyes-analysis
 * 文件职责：提供 applyGridShift、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1784365-1787186.；exports: applyGridShift, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1784365-1787186.
import * as D2R from "./D2R.js";
import * as compareDatums from "./compareDatums.js";
import * as N from "./N.js";
function s(e) {
  return e === D2R.PJD_3PARAM || e === D2R.PJD_7PARAM;
}
function o(e, t, n) {
  if ((0, compareDatums.compareDatums)(e, t)) return n;
  if (e.datum_type === D2R.PJD_NODATUM || t.datum_type === D2R.PJD_NODATUM) return n;
  var a = e.a,
    o = e.es;
  if (e.datum_type === D2R.PJD_GRIDSHIFT) {
    if (0 !== applyGridShift(e, !1, n)) return;
    a = D2R.SRS_WGS84_SEMIMAJOR, o = D2R.SRS_WGS84_ESQUARED;
  }
  var l = t.a,
    u = t.b,
    d = t.es;
  if (t.datum_type === D2R.PJD_GRIDSHIFT && (l = D2R.SRS_WGS84_SEMIMAJOR, u = D2R.SRS_WGS84_SEMIMINOR, d = D2R.SRS_WGS84_ESQUARED), o === d && a === l && !s(e.datum_type) && !s(t.datum_type)) return n;
  if ((n = (0, compareDatums.geodeticToGeocentric)(n, o, a), s(e.datum_type) && (n = (0, compareDatums.geocentricToWgs84)(n, e.datum_type, e.datum_params)), s(t.datum_type) && (n = (0, compareDatums.geocentricFromWgs84)(n, t.datum_type, t.datum_params)), n = (0, compareDatums.geocentricToGeodetic)(n, d, l, u), t.datum_type === D2R.PJD_GRIDSHIFT) && 0 !== applyGridShift(t, !0, n)) return;
  return n;
}
function applyGridShift(e, t, n) {
  if (null === e.grids || 0 === e.grids.length) return console.log("Grid shift grids not found"), -1;
  var i = {
      x: -n.x,
      y: n.y
    },
    a = {
      x: Number.NaN,
      y: Number.NaN
    },
    s = [];
  e: for (var o = 0; o < e.grids.length; o++) {
    var c = e.grids[o];
    if (s.push(c.name), c.isNull) {
      a = i;
      break;
    }
    if (null !== c.grid) for (var u = c.grid.subgrids, d = 0, h = u.length; d < h; d++) {
      var p = u[d],
        f = (Math.abs(p.del[1]) + Math.abs(p.del[0])) / 1e4,
        m = p.ll[0] - f,
        M = p.ll[1] - f,
        _ = p.ll[0] + (p.lim[0] - 1) * p.del[0] + f,
        A = p.ll[1] + (p.lim[1] - 1) * p.del[1] + f;
      if (!(M > i.y || m > i.x || A < i.y || _ < i.x) && (a = l(i, t, p), !isNaN(a.x))) break e;
    } else if (c.mandatory) return console.log("Unable to find mandatory grid '" + c.name + "'"), -1;
  }
  return isNaN(a.x) ? (console.log("Failed to find a grid shift table for location '" + -i.x * D2R.R2D + " " + i.y * D2R.R2D + " tried: '" + s + "'"), -1) : (n.x = -a.x, n.y = a.y, 0);
}
function l(e, t, n) {
  var r = {
    x: Number.NaN,
    y: Number.NaN
  };
  if (isNaN(e.x)) return r;
  var i = {
    x: e.x,
    y: e.y
  };
  i.x -= n.ll[0], i.y -= n.ll[1], i.x = (0, N.default)(i.x - Math.PI) + Math.PI;
  var s = u(i, n);
  if (t) {
    if (isNaN(s.x)) return r;
    s.x = i.x - s.x, s.y = i.y - s.y;
    var o,
      c,
      l = 9;
    do {
      if (c = u(s, n), isNaN(c.x)) {
        console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
        break;
      }
      o = {
        x: i.x - (c.x + s.x),
        y: i.y - (c.y + s.y)
      }, s.x += o.x, s.y += o.y;
    } while (l-- && Math.abs(o.x) > 1e-12 && Math.abs(o.y) > 1e-12);
    if (l < 0) return console.log("Inverse grid shift iterator failed to converge."), r;
    r.x = (0, N.default)(s.x + n.ll[0]), r.y = s.y + n.ll[1];
  } else isNaN(s.x) || (r.x = e.x + s.x, r.y = e.y + s.y);
  return r;
}
function u(e, t) {
  var n,
    r = {
      x: e.x / t.del[0],
      y: e.y / t.del[1]
    },
    i = Math.floor(r.x),
    a = Math.floor(r.y),
    s = r.x - 1 * i,
    o = r.y - 1 * a,
    c = {
      x: Number.NaN,
      y: Number.NaN
    };
  if (i < 0 || i >= t.lim[0]) return c;
  if (a < 0 || a >= t.lim[1]) return c;
  n = a * t.lim[0] + i;
  var l = t.cvs[n][0],
    u = t.cvs[n][1];
  n++;
  var d = t.cvs[n][0],
    h = t.cvs[n][1];
  n += t.lim[0];
  var p = t.cvs[n][0],
    f = t.cvs[n][1];
  n--;
  var m = t.cvs[n][0],
    M = t.cvs[n][1],
    _ = s * o,
    A = s * (1 - o),
    g = (1 - s) * (1 - o),
    b = (1 - s) * o;
  return c.x = g * l + A * d + b * m + _ * p, c.y = g * u + A * h + b * M + _ * f, c;
}
export { applyGridShift };
export { o as default };
