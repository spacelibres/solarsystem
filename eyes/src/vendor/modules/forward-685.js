// Recovered from vendors.js:1861107-1863547.
import * as D2R from "./D2R.js";
import * as Unidentified635 from "./Unidentified635.js";
let defaultExport;
var a = {
    N_POLE: 0,
    S_POLE: 1,
    EQUIT: 2,
    OBLIQ: 3
  },
  s = {
    h: {
      def: 1e5,
      num: !0
    },
    azi: {
      def: 0,
      num: !0,
      degrees: !0
    },
    tilt: {
      def: 0,
      num: !0,
      degrees: !0
    },
    long0: {
      def: 0,
      num: !0
    },
    lat0: {
      def: 0,
      num: !0
    }
  };
function init() {
  if (Object.keys(s).forEach(function (e) {
    if (void 0 === this[e]) this[e] = s[e].def;else {
      if (s[e].num && isNaN(this[e])) throw new Error("Invalid parameter value, must be numeric " + e + " = " + this[e]);
      s[e].num && (this[e] = parseFloat(this[e]));
    }
    s[e].degrees && (this[e] = this[e] * D2R.D2R);
  }.bind(this)), Math.abs(Math.abs(this.lat0) - D2R.HALF_PI) < D2R.EPSLN ? this.mode = this.lat0 < 0 ? a.S_POLE : a.N_POLE : Math.abs(this.lat0) < D2R.EPSLN ? this.mode = a.EQUIT : (this.mode = a.OBLIQ, this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0)), this.pn1 = this.h / this.a, this.pn1 <= 0 || this.pn1 > 1e10) throw new Error("Invalid height");
  this.p = 1 + this.pn1, this.rp = 1 / this.p, this.h1 = 1 / this.pn1, this.pfact = (this.p + 1) * this.h1, this.es = 0;
  var tilt = this.tilt,
    azi = this.azi;
  this.cg = Math.cos(azi), this.sg = Math.sin(azi), this.cw = Math.cos(tilt), this.sw = Math.sin(tilt);
}
function forward(e) {
  e.x -= this.long0;
  var t,
    n,
    r,
    i,
    s = Math.sin(e.y),
    o = Math.cos(e.y),
    c = Math.cos(e.x);
  switch (this.mode) {
    case a.OBLIQ:
      n = this.sinph0 * s + this.cosph0 * o * c;
      break;
    case a.EQUIT:
      n = o * c;
      break;
    case a.S_POLE:
      n = -s;
      break;
    case a.N_POLE:
      n = s;
  }
  switch (t = (n = this.pn1 / (this.p - n)) * o * Math.sin(e.x), this.mode) {
    case a.OBLIQ:
      n *= this.cosph0 * s - this.sinph0 * o * c;
      break;
    case a.EQUIT:
      n *= s;
      break;
    case a.N_POLE:
      n *= -o * c;
      break;
    case a.S_POLE:
      n *= o * c;
  }
  return i = 1 / ((r = n * this.cg + t * this.sg) * this.sw * this.h1 + this.cw), t = (t * this.cg - n * this.sg) * this.cw * i, n = r * i, e.x = t * this.a, e.y = n * this.a, e;
}
function inverse(e) {
  e.x /= this.a, e.y /= this.a;
  var t,
    n,
    s,
    o = {
      x: e.x,
      y: e.y
    };
  s = 1 / (this.pn1 - e.y * this.sw), t = this.pn1 * e.x * s, n = this.pn1 * e.y * this.cw * s, e.x = t * this.cg + n * this.sg, e.y = n * this.cg - t * this.sg;
  var c = (0, Unidentified635.default)(e.x, e.y);
  if (Math.abs(c) < D2R.EPSLN) o.x = 0, o.y = e.y;else {
    var l, u;
    switch (u = 1 - c * c * this.pfact, u = (this.p - Math.sqrt(u)) / (this.pn1 / c + c / this.pn1), l = Math.sqrt(1 - u * u), this.mode) {
      case a.OBLIQ:
        o.y = Math.asin(l * this.sinph0 + e.y * u * this.cosph0 / c), e.y = (l - this.sinph0 * Math.sin(o.y)) * c, e.x *= u * this.cosph0;
        break;
      case a.EQUIT:
        o.y = Math.asin(e.y * u / c), e.y = l * c, e.x *= u;
        break;
      case a.N_POLE:
        o.y = Math.asin(l), e.y = -e.y;
        break;
      case a.S_POLE:
        o.y = -Math.asin(l);
    }
    o.x = Math.atan2(e.x, e.y);
  }
  return e.x = o.x + this.long0, e.y = o.y, e;
}
var names = ["Tilted_Perspective", "tpers"];
defaultExport = {
  init: init,
  forward: forward,
  inverse: inverse,
  names: names
};
export { forward };
export { init };
export { inverse };
export { names };
export { defaultExport as default };
