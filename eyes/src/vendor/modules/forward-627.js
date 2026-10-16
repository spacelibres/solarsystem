// Recovered from vendors.js:1791172-1796431.
let defaultExport;
var r = 6,
  i = "AJSAJS",
  a = "AFAFAF",
  s = 65,
  o = 73,
  c = 79,
  l = 86,
  u = 90;
function forward(e, t) {
  return t = t || 5, function (e, t) {
    var n = "00000" + e.easting,
      r = "00000" + e.northing;
    return e.zoneNumber + e.zoneLetter + (y = e.easting, L = e.northing, v = e.zoneNumber, T = A(v), S = Math.floor(y / 1e5), w = Math.floor(L / 1e5) % 20, d = S, h = w, p = T, f = p - 1, m = i.charCodeAt(f), M = a.charCodeAt(f), _ = m + d - 1, g = M + h, b = !1, _ > u && (_ = _ - u + s - 1, b = !0), (_ === o || m < o && _ > o || (_ > o || m < o) && b) && _++, (_ === c || m < c && _ > c || (_ > c || m < c) && b) && ++_ === o && _++, _ > u && (_ = _ - u + s - 1), g > l ? (g = g - l + s - 1, b = !0) : b = !1, (g === o || M < o && g > o || (g > o || M < o) && b) && g++, (g === c || M < c && g > c || (g > c || M < c) && b) && ++g === o && g++, g > l && (g = g - l + s - 1), String.fromCharCode(_) + String.fromCharCode(g)) + n.substr(n.length - 5, t) + r.substr(r.length - 5, t);
    var d, h, p, f, m, M, _, g, b;
    var y, L, v, T, S, w;
  }(function (e) {
    var t,
      n,
      r,
      i,
      a,
      s,
      o,
      c,
      l = e.lat,
      u = e.lon,
      d = 6378137,
      h = .00669438,
      p = .9996,
      m = f(l),
      M = f(u);
    c = Math.floor((u + 180) / 6) + 1, 180 === u && (c = 60);
    l >= 56 && l < 64 && u >= 3 && u < 12 && (c = 32);
    l >= 72 && l < 84 && (u >= 0 && u < 9 ? c = 31 : u >= 9 && u < 21 ? c = 33 : u >= 21 && u < 33 ? c = 35 : u >= 33 && u < 42 && (c = 37));
    o = f(6 * (c - 1) - 180 + 3), t = h / (1 - h), n = d / Math.sqrt(1 - h * Math.sin(m) * Math.sin(m)), r = Math.tan(m) * Math.tan(m), i = t * Math.cos(m) * Math.cos(m), a = Math.cos(m) * (M - o), s = d * ((1 - h / 4 - 3 * h * h / 64 - 5 * h * h * h / 256) * m - (3 * h / 8 + 3 * h * h / 32 + 45 * h * h * h / 1024) * Math.sin(2 * m) + (15 * h * h / 256 + 45 * h * h * h / 1024) * Math.sin(4 * m) - 35 * h * h * h / 3072 * Math.sin(6 * m));
    var A = p * n * (a + (1 - r + i) * a * a * a / 6 + (5 - 18 * r + r * r + 72 * i - 58 * t) * a * a * a * a * a / 120) + 5e5,
      g = p * (s + n * Math.tan(m) * (a * a / 2 + (5 - r + 9 * i + 4 * i * i) * a * a * a * a / 24 + (61 - 58 * r + r * r + 600 * i - 330 * t) * a * a * a * a * a * a / 720));
    l < 0 && (g += 1e7);
    return {
      northing: Math.round(g),
      easting: Math.round(A),
      zoneNumber: c,
      zoneLetter: _(l)
    };
  }({
    lat: e[1],
    lon: e[0]
  }), t);
}
function inverse(e) {
  var t = M(g(e.toUpperCase()));
  return t.lat && t.lon ? [t.lon, t.lat, t.lon, t.lat] : [t.left, t.bottom, t.right, t.top];
}
function toPoint(e) {
  var t = M(g(e.toUpperCase()));
  return t.lat && t.lon ? [t.lon, t.lat] : [(t.left + t.right) / 2, (t.top + t.bottom) / 2];
}
function f(e) {
  return e * (Math.PI / 180);
}
function m(e) {
  return e / Math.PI * 180;
}
function M(e) {
  var t = e.northing,
    n = e.easting,
    r = e.zoneLetter,
    i = e.zoneNumber;
  if (i < 0 || i > 60) return null;
  var a,
    s,
    o,
    c,
    l,
    u,
    d,
    h,
    p,
    f = .9996,
    _ = 6378137,
    A = .00669438,
    g = (1 - Math.sqrt(.99330562)) / (1 + Math.sqrt(.99330562)),
    b = n - 5e5,
    y = t;
  r < "N" && (y -= 1e7), d = 6 * (i - 1) - 180 + 3, a = .006739496752268451, p = (h = y / f / 6367449.145945056) + (3 * g / 2 - 27 * g * g * g / 32) * Math.sin(2 * h) + (21 * g * g / 16 - 55 * g * g * g * g / 32) * Math.sin(4 * h) + 151 * g * g * g / 96 * Math.sin(6 * h), s = _ / Math.sqrt(1 - A * Math.sin(p) * Math.sin(p)), o = Math.tan(p) * Math.tan(p), c = a * Math.cos(p) * Math.cos(p), l = .99330562 * _ / Math.pow(1 - A * Math.sin(p) * Math.sin(p), 1.5), u = b / (s * f);
  var L = p - s * Math.tan(p) / l * (u * u / 2 - (5 + 3 * o + 10 * c - 4 * c * c - 9 * a) * u * u * u * u / 24 + (61 + 90 * o + 298 * c + 45 * o * o - 1.6983531815716497 - 3 * c * c) * u * u * u * u * u * u / 720);
  L = m(L);
  var v,
    T = (u - (1 + 2 * o + c) * u * u * u / 6 + (5 - 2 * c + 28 * o - 3 * c * c + 8 * a + 24 * o * o) * u * u * u * u * u / 120) / Math.cos(p);
  if (T = d + m(T), e.accuracy) {
    var S = M({
      northing: e.northing + e.accuracy,
      easting: e.easting + e.accuracy,
      zoneLetter: e.zoneLetter,
      zoneNumber: e.zoneNumber
    });
    v = {
      top: S.lat,
      right: S.lon,
      bottom: L,
      left: T
    };
  } else v = {
    lat: L,
    lon: T
  };
  return v;
}
function _(e) {
  var t = "Z";
  return 84 >= e && e >= 72 ? t = "X" : 72 > e && e >= 64 ? t = "W" : 64 > e && e >= 56 ? t = "V" : 56 > e && e >= 48 ? t = "U" : 48 > e && e >= 40 ? t = "T" : 40 > e && e >= 32 ? t = "S" : 32 > e && e >= 24 ? t = "R" : 24 > e && e >= 16 ? t = "Q" : 16 > e && e >= 8 ? t = "P" : 8 > e && e >= 0 ? t = "N" : 0 > e && e >= -8 ? t = "M" : -8 > e && e >= -16 ? t = "L" : -16 > e && e >= -24 ? t = "K" : -24 > e && e >= -32 ? t = "J" : -32 > e && e >= -40 ? t = "H" : -40 > e && e >= -48 ? t = "G" : -48 > e && e >= -56 ? t = "F" : -56 > e && e >= -64 ? t = "E" : -64 > e && e >= -72 ? t = "D" : -72 > e && e >= -80 && (t = "C"), t;
}
function A(e) {
  var t = e % r;
  return 0 === t && (t = r), t;
}
function g(e) {
  if (e && 0 === e.length) throw "MGRSPoint coverting from nothing";
  for (var t, n = e.length, r = null, d = "", h = 0; !/[A-Z]/.test(t = e.charAt(h));) {
    if (h >= 2) throw "MGRSPoint bad conversion from: " + e;
    d += t, h++;
  }
  var p = parseInt(d, 10);
  if (0 === h || h + 3 > n) throw "MGRSPoint bad conversion from: " + e;
  var f = e.charAt(h++);
  if (f <= "A" || "B" === f || "Y" === f || f >= "Z" || "I" === f || "O" === f) throw "MGRSPoint zone letter " + f + " not handled: " + e;
  r = e.substring(h, h += 2);
  for (var m = A(p), M = function (e, t) {
      var n = i.charCodeAt(t - 1),
        r = 1e5,
        a = !1;
      for (; n !== e.charCodeAt(0);) {
        if (++n === o && n++, n === c && n++, n > u) {
          if (a) throw "Bad character: " + e;
          n = s, a = !0;
        }
        r += 1e5;
      }
      return r;
    }(r.charAt(0), m), _ = function (e, t) {
      if (e > "V") throw "MGRSPoint given invalid Northing " + e;
      var n = a.charCodeAt(t - 1),
        r = 0,
        i = !1;
      for (; n !== e.charCodeAt(0);) {
        if (++n === o && n++, n === c && n++, n > l) {
          if (i) throw "Bad character: " + e;
          n = s, i = !0;
        }
        r += 1e5;
      }
      return r;
    }(r.charAt(1), m); _ < b(f);) _ += 2e6;
  var g = n - h;
  if (g % 2 != 0) throw "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + e;
  var y,
    L,
    v,
    T = g / 2,
    S = 0,
    w = 0;
  return T > 0 && (y = 1e5 / Math.pow(10, T), L = e.substring(h, h + T), S = parseFloat(L) * y, v = e.substring(h + T), w = parseFloat(v) * y), {
    easting: S + M,
    northing: w + _,
    zoneLetter: f,
    zoneNumber: p,
    accuracy: y
  };
}
function b(e) {
  var t;
  switch (e) {
    case "C":
      t = 11e5;
      break;
    case "D":
      t = 2e6;
      break;
    case "E":
      t = 28e5;
      break;
    case "F":
      t = 37e5;
      break;
    case "G":
      t = 46e5;
      break;
    case "H":
      t = 55e5;
      break;
    case "J":
      t = 64e5;
      break;
    case "K":
      t = 73e5;
      break;
    case "L":
      t = 82e5;
      break;
    case "M":
      t = 91e5;
      break;
    case "N":
      t = 0;
      break;
    case "P":
      t = 8e5;
      break;
    case "Q":
      t = 17e5;
      break;
    case "R":
      t = 26e5;
      break;
    case "S":
      t = 35e5;
      break;
    case "T":
      t = 44e5;
      break;
    case "U":
      t = 53e5;
      break;
    case "V":
      t = 62e5;
      break;
    case "W":
      t = 7e6;
      break;
    case "X":
      t = 79e5;
      break;
    default:
      t = -1;
  }
  if (t >= 0) return t;
  throw "Invalid zone letter: " + e;
}
defaultExport = {
  forward: forward,
  inverse: inverse,
  toPoint: toPoint
};
export { forward };
export { inverse };
export { toPoint };
export { defaultExport as default };
