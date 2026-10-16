/** @eyes-analysis
 * 文件职责：提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1869477-1873604.；exports: forward, init, inverse, names, default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1869477-1873604.
import * as N from "./N.js";
import * as D2R from "./D2R.js";
import * as Unidentified587 from "./Unidentified587.js";
import * as forward from "./forward-614.js";
let defaultExport;
const o = {
    OBLIQUE: {
      forward: function (e, t) {
        let {
          x: n,
          y: a
        } = t;
        n = (0, N.default)(n - e.long0, e.over);
        const s = Math.cos(n),
          o = Math.sin(a),
          c = Math.cos(a);
        t.x = (0, N.default)(Math.atan2(c * Math.sin(n), e.sphip * c * s + e.cphip * o) + e.lamp), t.y = Math.asin(e.sphip * o - e.cphip * c * s);
        const l = e.obliqueProjection.forward(t);
        e.isIdentity && (l.x *= D2R.R2D, l.y *= D2R.R2D);
        return l;
      },
      inverse: function (e, t) {
        e.isIdentity && (t.x *= D2R.D2R, t.y *= D2R.D2R);
        const n = e.obliqueProjection.inverse(t);
        let {
          x: a,
          y: s
        } = n;
        if (a < Number.MAX_VALUE) {
          a -= e.lamp;
          const n = Math.cos(a),
            r = Math.sin(s),
            i = Math.cos(s);
          t.x = Math.atan2(i * Math.sin(a), e.sphip * i * n - e.cphip * r), t.y = Math.asin(e.sphip * r + e.cphip * i * n);
        }
        return t.x = (0, N.default)(t.x + e.long0), t;
      }
    },
    TRANSVERSE: {
      forward: function (e, t) {
        let {
          x: n,
          y: a
        } = t;
        n = (0, N.default)(n - e.long0, e.over);
        const s = Math.cos(a),
          o = Math.cos(n);
        t.x = (0, N.default)(Math.atan2(s * Math.sin(n), Math.sin(a)) + e.lamp), t.y = Math.asin(-1 * s * o);
        const c = e.obliqueProjection.forward(t);
        e.isIdentity && (c.x *= D2R.R2D, c.y *= D2R.R2D);
        return c;
      },
      inverse: function (e, t) {
        e.isIdentity && (t.x *= D2R.D2R, t.y *= D2R.D2R);
        const n = e.obliqueProjection.inverse(t);
        let {
          x: a,
          y: s
        } = n;
        if (a < Number.MAX_VALUE) {
          const n = Math.cos(s);
          a -= e.lamp, t.x = Math.atan2(n * Math.sin(a), -1 * Math.sin(s)), t.y = Math.asin(n * Math.cos(a));
        }
        return t.x = (0, N.default)(t.x + e.long0), t;
      }
    }
  },
  c = {
    ROTATE: {
      o_alpha: "oAlpha",
      o_lon_c: "oLongC",
      o_lat_c: "oLatC"
    },
    NEW_POLE: {
      o_lat_p: "oLatP",
      o_lon_p: "oLongP"
    },
    NEW_EQUATOR: {
      o_lon_1: "oLong1",
      o_lat_1: "oLat1",
      o_lon_2: "oLong2",
      o_lat_2: "oLat2"
    }
  };
function init() {
  if (this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.long0 = this.long0 || 0, this.title = this.title || "General Oblique Transformation", this.isIdentity = forward.names.includes(this.o_proj), !this.o_proj) throw new Error("Missing parameter: o_proj");
  if ("ob_tran" === this.o_proj) throw new Error("Invalid value for o_proj: " + this.o_proj);
  const e = this.projStr.replace("+proj=ob_tran", "").replace("+o_proj=", "+proj=").trim(),
    obliqueProjection = (0, Unidentified587.default)(e);
  if (!obliqueProjection) throw new Error("Invalid parameter: o_proj. Unknown projection " + this.o_proj);
  let n;
  obliqueProjection.long0 = 0, this.obliqueProjection = obliqueProjection;
  const r = Object.keys(c),
    l = e => {
      if (void 0 === this[e]) return;
      const t = parseFloat(this[e]) * D2R.D2R;
      if (isNaN(t)) throw new Error("Invalid value for " + e + ": " + this[e]);
      return t;
    };
  for (let e = 0; e < r.length; e++) {
    const t = r[e],
      i = c[t],
      a = Object.entries(i);
    if (a.some(([e]) => void 0 !== this[e])) {
      n = i;
      for (let e = 0; e < a.length; e++) {
        const [t, n] = a[e],
          r = l(t);
        if (void 0 === r) throw new Error("Missing parameter: " + t + ".");
        this[n] = r;
      }
      break;
    }
  }
  if (!n) throw new Error("No valid parameters provided for ob_tran projection.");
  const {
    lamp: lamp,
    phip: phip
  } = function (e, t) {
    let n, r;
    if (t === c.ROTATE) {
      let t = e.oLongC,
        a = e.oLatC,
        s = e.oAlpha;
      if (Math.abs(Math.abs(a) - D2R.HALF_PI) <= D2R.EPSLN) throw new Error("Invalid value for o_lat_c: " + e.o_lat_c + " should be < 90°");
      r = t + Math.atan2(-1 * Math.cos(s), -1 * Math.sin(s) * Math.sin(a)), n = Math.asin(Math.cos(a) * Math.sin(s));
    } else if (t === c.NEW_POLE) r = e.oLongP, n = e.oLatP;else {
      let t = e.oLong1,
        a = e.oLat1,
        s = e.oLong2,
        o = e.oLat2,
        c = Math.abs(a);
      if (Math.abs(a) > D2R.HALF_PI - D2R.EPSLN) throw new Error("Invalid value for o_lat_1: " + e.o_lat_1 + " should be < 90°");
      if (Math.abs(o) > D2R.HALF_PI - D2R.EPSLN) throw new Error("Invalid value for o_lat_2: " + e.o_lat_2 + " should be < 90°");
      if (Math.abs(a - o) < D2R.EPSLN) throw new Error("Invalid value for o_lat_1 and o_lat_2: o_lat_1 should be different from o_lat_2");
      if (c < D2R.EPSLN) throw new Error("Invalid value for o_lat_1: o_lat_1 should be different from zero");
      r = Math.atan2(Math.cos(a) * Math.sin(o) * Math.cos(t) - Math.sin(a) * Math.cos(o) * Math.cos(s), Math.sin(a) * Math.cos(o) * Math.sin(s) - Math.cos(a) * Math.sin(o) * Math.sin(t)), n = Math.atan(-1 * Math.cos(r - t) / Math.tan(a));
    }
    return {
      lamp: r,
      phip: n
    };
  }(this, n);
  this.lamp = lamp, Math.abs(phip) > D2R.EPSLN ? (this.cphip = Math.cos(phip), this.sphip = Math.sin(phip), this.projectionType = o.OBLIQUE) : this.projectionType = o.TRANSVERSE;
}
function u(e) {
  return this.projectionType.forward(this, e);
}
function inverse(e) {
  return this.projectionType.inverse(this, e);
}
var names = ["General Oblique Transformation", "General_Oblique_Transformation", "ob_tran"];
defaultExport = {
  init: init,
  forward: u,
  inverse: inverse,
  names: names
};
export { u as forward };
export { init };
export { inverse };
export { names };
export { defaultExport as default };
