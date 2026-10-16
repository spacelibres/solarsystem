/** @eyes-analysis
 * 文件职责：提供 EQUIT、N_POLE、OBLIQ、S_POLE、forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1825868-1829739.；exports: EQUIT, N_POLE, OBLIQ, S_POLE, forward, init, inverse, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1825868-1829739.
import * as D2R from "./D2R.js";
import * as Unidentified662 from "./Unidentified662.js";
import * as N from "./N.js";
import * as Unidentified663 from "./Unidentified663.js";
import * as Unidentified664 from "./Unidentified664.js";
let defaultExport;
var S_POLE = 1,
  N_POLE = 2,
  u = 3,
  d = 4;
function init() {
  var e,
    t = Math.abs(this.lat0);
  if (Math.abs(t - D2R.HALF_PI) < D2R.EPSLN ? this.mode = this.lat0 < 0 ? S_POLE : N_POLE : Math.abs(t) < D2R.EPSLN ? this.mode = u : this.mode = d, this.es > 0) switch (this.qp = (0, Unidentified662.default)(this.e, 1), this.mmf = .5 / (1 - this.es), this.apa = (0, Unidentified663.default)(this.es), this.mode) {
    case N_POLE:
    case S_POLE:
      this.dd = 1;
      break;
    case u:
      this.rq = Math.sqrt(.5 * this.qp), this.dd = 1 / this.rq, this.xmf = 1, this.ymf = .5 * this.qp;
      break;
    case d:
      this.rq = Math.sqrt(.5 * this.qp), e = Math.sin(this.lat0), this.sinb1 = (0, Unidentified662.default)(this.e, e) / this.qp, this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1), this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * e * e) * this.rq * this.cosb1), this.ymf = (this.xmf = this.rq) / this.dd, this.xmf *= this.dd;
  } else this.mode === d && (this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0));
}
function forward(e) {
  var t,
    n,
    s,
    o,
    c,
    l,
    u,
    d,
    h,
    p,
    f = e.x,
    m = e.y;
  if (f = (0, N.default)(f - this.long0, this.over), this.sphere) {
    if (c = Math.sin(m), p = Math.cos(m), s = Math.cos(f), this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      if ((n = this.mode === this.EQUIT ? 1 + p * s : 1 + this.sinph0 * c + this.cosph0 * p * s) <= D2R.EPSLN) return null;
      t = (n = Math.sqrt(2 / n)) * p * Math.sin(f), n *= this.mode === this.EQUIT ? c : this.cosph0 * c - this.sinph0 * p * s;
    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE && (s = -s), Math.abs(m + this.lat0) < D2R.EPSLN) return null;
      n = D2R.FORTPI - .5 * m, t = (n = 2 * (this.mode === this.S_POLE ? Math.cos(n) : Math.sin(n))) * Math.sin(f), n *= s;
    }
  } else {
    switch (u = 0, d = 0, h = 0, s = Math.cos(f), o = Math.sin(f), c = Math.sin(m), l = (0, Unidentified662.default)(this.e, c), this.mode !== this.OBLIQ && this.mode !== this.EQUIT || (u = l / this.qp, d = Math.sqrt(1 - u * u)), this.mode) {
      case this.OBLIQ:
        h = 1 + this.sinb1 * u + this.cosb1 * d * s;
        break;
      case this.EQUIT:
        h = 1 + d * s;
        break;
      case this.N_POLE:
        h = D2R.HALF_PI + m, l = this.qp - l;
        break;
      case this.S_POLE:
        h = m - D2R.HALF_PI, l = this.qp + l;
    }
    if (Math.abs(h) < D2R.EPSLN) return null;
    switch (this.mode) {
      case this.OBLIQ:
      case this.EQUIT:
        h = Math.sqrt(2 / h), n = this.mode === this.OBLIQ ? this.ymf * h * (this.cosb1 * u - this.sinb1 * d * s) : (h = Math.sqrt(2 / (1 + d * s))) * u * this.ymf, t = this.xmf * h * d * o;
        break;
      case this.N_POLE:
      case this.S_POLE:
        l >= 0 ? (t = (h = Math.sqrt(l)) * o, n = s * (this.mode === this.S_POLE ? h : -h)) : t = n = 0;
    }
  }
  return e.x = this.a * t + this.x0, e.y = this.a * n + this.y0, e;
}
function inverse(e) {
  e.x -= this.x0, e.y -= this.y0;
  var t,
    n,
    i,
    s,
    c,
    l,
    u,
    d = e.x / this.a,
    h = e.y / this.a;
  if (this.sphere) {
    var p,
      f = 0,
      m = 0;
    if ((n = .5 * (p = Math.sqrt(d * d + h * h))) > 1) return null;
    switch (n = 2 * Math.asin(n), this.mode !== this.OBLIQ && this.mode !== this.EQUIT || (m = Math.sin(n), f = Math.cos(n)), this.mode) {
      case this.EQUIT:
        n = Math.abs(p) <= D2R.EPSLN ? 0 : Math.asin(h * m / p), d *= m, h = f * p;
        break;
      case this.OBLIQ:
        n = Math.abs(p) <= D2R.EPSLN ? this.lat0 : Math.asin(f * this.sinph0 + h * m * this.cosph0 / p), d *= m * this.cosph0, h = (f - Math.sin(n) * this.sinph0) * p;
        break;
      case this.N_POLE:
        h = -h, n = D2R.HALF_PI - n;
        break;
      case this.S_POLE:
        n -= D2R.HALF_PI;
    }
    t = 0 !== h || this.mode !== this.EQUIT && this.mode !== this.OBLIQ ? Math.atan2(d, h) : 0;
  } else {
    if (u = 0, this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      if (d /= this.dd, h *= this.dd, (l = Math.sqrt(d * d + h * h)) < D2R.EPSLN) return e.x = this.long0, e.y = this.lat0, e;
      s = 2 * Math.asin(.5 * l / this.rq), i = Math.cos(s), d *= s = Math.sin(s), this.mode === this.OBLIQ ? (u = i * this.sinb1 + h * s * this.cosb1 / l, c = this.qp * u, h = l * this.cosb1 * i - h * this.sinb1 * s) : (u = h * s / l, c = this.qp * u, h = l * i);
    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE && (h = -h), !(c = d * d + h * h)) return e.x = this.long0, e.y = this.lat0, e;
      u = 1 - c / this.qp, this.mode === this.S_POLE && (u = -u);
    }
    t = Math.atan2(d, h), n = (0, Unidentified664.default)(Math.asin(u), this.apa);
  }
  return e.x = (0, N.default)(this.long0 + t, this.over), e.y = n, e;
}
var names = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"];
defaultExport = {
  init: init,
  forward: forward,
  inverse: inverse,
  names: names,
  S_POLE: S_POLE,
  N_POLE: N_POLE,
  EQUIT: u,
  OBLIQ: d
};
export { u as EQUIT };
export { N_POLE };
export { d as OBLIQ };
export { S_POLE };
export { forward };
export { init };
export { inverse };
export { names };
export { defaultExport as default };
