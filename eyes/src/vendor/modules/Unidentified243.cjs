// Recovered from vendors.js:1110780-1117848.
var r, i, a;
!function (s, o) {
  "use strict";

  module.exports ? module.exports = o(require("./MomentPrimary.cjs")) : (i = [require("./MomentPrimary.cjs")], void 0 === (a = "function" == typeof (r = o) ? r.apply(exports, i) : r) || (module.exports = a));
}(0, function (e) {
  "use strict";

  void 0 === e.version && e.default && (e = e.default);
  var t,
    n = {},
    r = {},
    i = {},
    a = {},
    s = {};
  e && "string" == typeof e.version || C("Moment Timezone requires Moment.js. See https://momentjs.com/timezone/docs/#/use-it/browser/");
  var o = e.version.split("."),
    c = +o[0],
    l = +o[1];
  function u(e) {
    return e > 96 ? e - 87 : e > 64 ? e - 29 : e - 48;
  }
  function d(e) {
    var t = 0,
      n = e.split("."),
      r = n[0],
      i = n[1] || "",
      a = 1,
      s = 0,
      o = 1;
    for (45 === e.charCodeAt(0) && (t = 1, o = -1); t < r.length; t++) s = 60 * s + u(r.charCodeAt(t));
    for (t = 0; t < i.length; t++) a /= 60, s += u(i.charCodeAt(t)) * a;
    return s * o;
  }
  function h(e) {
    for (var t = 0; t < e.length; t++) e[t] = d(e[t]);
  }
  function p(e, t) {
    var n,
      r = [];
    for (n = 0; n < t.length; n++) r[n] = e[t[n]];
    return r;
  }
  function f(e) {
    var t = e.split("|"),
      n = t[2].split(" "),
      r = t[3].split(""),
      i = t[4].split(" ");
    return h(n), h(r), h(i), function (e, t) {
      for (var n = 0; n < t; n++) e[n] = Math.round((e[n - 1] || 0) + 6e4 * e[n]);
      e[t - 1] = 1 / 0;
    }(i, r.length), {
      name: t[0],
      abbrs: p(t[1].split(" "), r),
      offsets: p(n, r),
      untils: i,
      population: 0 | t[5]
    };
  }
  function m(e) {
    e && this._set(f(e));
  }
  function M(name, zones) {
    this.name = name, this.zones = zones;
  }
  function _(e) {
    var t = e.toTimeString(),
      abbr = t.match(/\([a-z ]+\)/i);
    "GMT" === (abbr = abbr && abbr[0] ? (abbr = abbr[0].match(/[A-Z]/g)) ? abbr.join("") : void 0 : (abbr = t.match(/[A-Z]{3,5}/g)) ? abbr[0] : void 0) && (abbr = void 0), this.at = +e, this.abbr = abbr, this.offset = e.getTimezoneOffset();
  }
  function A(zone) {
    this.zone = zone, this.offsetScore = 0, this.abbrScore = 0;
  }
  function g(e, t) {
    for (var n, r; r = 6e4 * ((t.at - e.at) / 12e4 | 0);) (n = new _(new Date(e.at + r))).offset === e.offset ? e = n : t = n;
    return e;
  }
  function b(e, t) {
    return e.offsetScore !== t.offsetScore ? e.offsetScore - t.offsetScore : e.abbrScore !== t.abbrScore ? e.abbrScore - t.abbrScore : e.zone.population !== t.zone.population ? t.zone.population - e.zone.population : t.zone.name.localeCompare(e.zone.name);
  }
  function y(e, t) {
    var n, r;
    for (h(t), n = 0; n < t.length; n++) r = t[n], s[r] = s[r] || {}, s[r][e] = !0;
  }
  function L(e) {
    var t,
      n,
      r,
      i = e.length,
      o = {},
      c = [];
    for (t = 0; t < i; t++) for (n in r = s[e[t].offset] || {}) r.hasOwnProperty(n) && (o[n] = !0);
    for (t in o) o.hasOwnProperty(t) && c.push(a[t]);
    return c;
  }
  function v() {
    try {
      var e = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (e && e.length > 3) {
        var t = a[T(e)];
        if (t) return t;
        C("Moment Timezone found " + e + " from the Intl api, but did not have that data loaded.");
      }
    } catch (e) {}
    var n,
      r,
      i,
      s = function () {
        var e,
          t,
          n,
          r = new Date().getFullYear() - 2,
          i = new _(new Date(r, 0, 1)),
          a = [i];
        for (n = 1; n < 48; n++) (t = new _(new Date(r, n, 1))).offset !== i.offset && (e = g(i, t), a.push(e), a.push(new _(new Date(e.at + 6e4)))), i = t;
        for (n = 0; n < 4; n++) a.push(new _(new Date(r + n, 0, 1))), a.push(new _(new Date(r + n, 6, 1)));
        return a;
      }(),
      o = s.length,
      c = L(s),
      l = [];
    for (r = 0; r < c.length; r++) {
      for (n = new A(w(c[r]), o), i = 0; i < o; i++) n.scoreOffsetAt(s[i]);
      l.push(n);
    }
    return l.sort(b), l.length > 0 ? l[0].zone.name : void 0;
  }
  function T(e) {
    return (e || "").toLowerCase().replace(/\//g, "_");
  }
  function S(e) {
    var t, r, i, s;
    for ("string" == typeof e && (e = [e]), t = 0; t < e.length; t++) s = T(r = (i = e[t].split("|"))[0]), n[s] = e[t], a[s] = r, y(s, i[2].split(" "));
  }
  function w(e, t) {
    e = T(e);
    var i,
      s = n[e];
    return s instanceof m ? s : "string" == typeof s ? (s = new m(s), n[e] = s, s) : r[e] && t !== w && (i = w(r[e], w)) ? ((s = n[e] = new m())._set(i), s.name = a[e], s) : null;
  }
  function E(e) {
    var t, n, i, s;
    for ("string" == typeof e && (e = [e]), t = 0; t < e.length; t++) i = T((n = e[t].split("|"))[0]), s = T(n[1]), r[i] = s, a[i] = n[0], r[s] = i, a[s] = n[1];
  }
  function x(e) {
    var t = "X" === e._f || "x" === e._f;
    return !(!e._a || void 0 !== e._tzm || t);
  }
  function C(e) {
    "undefined" != typeof console && "function" == typeof console.error && console.error(e);
  }
  function z(t) {
    var n = Array.prototype.slice.call(arguments, 0, -1),
      r = arguments[arguments.length - 1],
      i = w(r),
      a = e.utc.apply(null, n);
    return i && !e.isMoment(t) && x(a) && a.add(i.parse(a), "minutes"), a.tz(r), a;
  }
  (c < 2 || 2 === c && l < 6) && C("Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js " + e.version + ". See momentjs.com"), m.prototype = {
    _set: function (e) {
      this.name = e.name, this.abbrs = e.abbrs, this.untils = e.untils, this.offsets = e.offsets, this.population = e.population;
    },
    _index: function (e) {
      var t,
        n = +e,
        untils = this.untils;
      for (t = 0; t < untils.length; t++) if (n < untils[t]) return t;
    },
    countries: function () {
      var name = this.name;
      return Object.keys(i).filter(function (t) {
        return -1 !== i[t].zones.indexOf(name);
      });
    },
    parse: function (e) {
      var t,
        n,
        r,
        i,
        a = +e,
        offsets = this.offsets,
        untils = this.untils,
        c = untils.length - 1;
      for (i = 0; i < c; i++) if (t = offsets[i], n = offsets[i + 1], r = offsets[i ? i - 1 : i], t < n && z.moveAmbiguousForward ? t = n : t > r && z.moveInvalidForward && (t = r), a < untils[i] - 6e4 * t) return offsets[i];
      return offsets[c];
    },
    abbr: function (e) {
      return this.abbrs[this._index(e)];
    },
    offset: function (e) {
      return C("zone.offset has been deprecated in favor of zone.utcOffset"), this.offsets[this._index(e)];
    },
    utcOffset: function (e) {
      return this.offsets[this._index(e)];
    }
  }, A.prototype.scoreOffsetAt = function (e) {
    this.offsetScore += Math.abs(this.zone.utcOffset(e.at) - e.offset), this.zone.abbr(e.at).replace(/[^A-Z]/g, "") !== e.abbr && this.abbrScore++;
  }, z.version = "0.5.33", z.dataVersion = "", z._zones = n, z._links = r, z._names = a, z._countries = i, z.add = S, z.link = E, z.load = function (e) {
    S(e.zones), E(e.links), function (e) {
      var t, n, r, a;
      if (e && e.length) for (t = 0; t < e.length; t++) n = (a = e[t].split("|"))[0].toUpperCase(), r = a[1].split(" "), i[n] = new M(n, r);
    }(e.countries), z.dataVersion = e.version;
  }, z.zone = w, z.zoneExists = function e(t) {
    return e.didShowError || (e.didShowError = !0, C("moment.tz.zoneExists('" + t + "') has been deprecated in favor of !moment.tz.zone('" + t + "')")), !!w(t);
  }, z.guess = function (e) {
    return t && !e || (t = v()), t;
  }, z.names = function () {
    var e,
      t = [];
    for (e in a) a.hasOwnProperty(e) && (n[e] || n[r[e]]) && a[e] && t.push(a[e]);
    return t.sort();
  }, z.Zone = m, z.unpack = f, z.unpackBase60 = d, z.needsOffset = x, z.moveInvalidForward = !0, z.moveAmbiguousForward = !1, z.countries = function () {
    return Object.keys(i);
  }, z.zonesForCountry = function (e, t) {
    var n;
    if (n = (n = e).toUpperCase(), !(e = i[n] || null)) return null;
    var r = e.zones.sort();
    return t ? r.map(function (e) {
      return {
        name: e,
        offset: w(e).utcOffset(new Date())
      };
    }) : r;
  };
  var O,
    B = e.fn;
  function D(e) {
    return function () {
      return this._z ? this._z.abbr(this) : e.call(this);
    };
  }
  function N(e) {
    return function () {
      return this._z = null, e.apply(this, arguments);
    };
  }
  e.tz = z, e.defaultZone = null, e.updateOffset = function (t, n) {
    var r,
      i = e.defaultZone;
    if (void 0 === t._z && (i && x(t) && !t._isUTC && (t._d = e.utc(t._a)._d, t.utc().add(i.parse(t), "minutes")), t._z = i), t._z) if (r = t._z.utcOffset(t), Math.abs(r) < 16 && (r /= 60), void 0 !== t.utcOffset) {
      var a = t._z;
      t.utcOffset(-r, n), t._z = a;
    } else t.zone(r, n);
  }, B.tz = function (t, n) {
    if (t) {
      if ("string" != typeof t) throw new Error("Time zone name must be a string, got " + t + " [" + typeof t + "]");
      return this._z = w(t), this._z ? e.updateOffset(this, n) : C("Moment Timezone has no data for " + t + ". See http://momentjs.com/timezone/docs/#/data-loading/."), this;
    }
    if (this._z) return this._z.name;
  }, B.zoneName = D(B.zoneName), B.zoneAbbr = D(B.zoneAbbr), B.utc = N(B.utc), B.local = N(B.local), B.utcOffset = (O = B.utcOffset, function () {
    return arguments.length > 0 && (this._z = null), O.apply(this, arguments);
  }), e.tz.setDefault = function (t) {
    return (c < 2 || 2 === c && l < 9) && C("Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js " + e.version + "."), e.defaultZone = t ? w(t) : null, e;
  };
  var I = e.momentProperties;
  return "[object Array]" === Object.prototype.toString.call(I) ? (I.push("_z"), I.push("_a")) : I && (I._z = null), e;
});
