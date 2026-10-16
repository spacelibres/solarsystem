// Recovered from vendors.js:1780147-1783098.
var r = {};
function i(e, t, n) {
  return t instanceof ArrayBuffer ? function (e, t, n) {
    var i = !0;
    void 0 !== n && !1 === n.includeErrorFields && (i = !1);
    var dataView = new DataView(t),
      s = function (e) {
        var t = e.getInt32(8, !1);
        if (11 === t) return !1;
        t = e.getInt32(8, !0), 11 !== t && console.warn("Failed to detect nadgrid endian-ness, defaulting to little-endian");
        return !0;
      }(dataView),
      o = function (e, t) {
        return {
          nFields: e.getInt32(8, t),
          nSubgridFields: e.getInt32(24, t),
          nSubgrids: e.getInt32(40, t),
          shiftType: u(e, 56, 64).trim(),
          fromSemiMajorAxis: e.getFloat64(120, t),
          fromSemiMinorAxis: e.getFloat64(136, t),
          toSemiMajorAxis: e.getFloat64(152, t),
          toSemiMinorAxis: e.getFloat64(168, t)
        };
      }(dataView, s),
      c = function (e, t, n, r) {
        for (var i = 176, a = [], s = 0; s < t.nSubgrids; s++) {
          var o = h(e, i, n),
            c = p(e, i, o, n, r),
            u = Math.round(1 + (o.upperLongitude - o.lowerLongitude) / o.longitudeInterval),
            f = Math.round(1 + (o.upperLatitude - o.lowerLatitude) / o.latitudeInterval);
          a.push({
            ll: [l(o.lowerLongitude), l(o.lowerLatitude)],
            del: [l(o.longitudeInterval), l(o.latitudeInterval)],
            lim: [u, f],
            count: o.gridNodeCount,
            cvs: d(c)
          });
          var m = 16;
          !1 === r && (m = 8), i += 176 + o.gridNodeCount * m;
        }
        return a;
      }(dataView, o, s, i),
      f = {
        header: o,
        subgrids: c
      };
    return r[e] = f, f;
  }(e, t, n) : {
    ready: a(e, t)
  };
}
async function a(e, t) {
  for (var n = [], i = await t.getImageCount(), a = i - 1; a >= 0; a--) {
    var s = await t.getImage(a),
      o = await s.readRasters(),
      u = [s.getWidth(), s.getHeight()],
      d = s.getBoundingBox().map(c),
      h = "function" == typeof s.fileDirectory.getValue ? s.fileDirectory.getValue("ModelPixelScale") : s.fileDirectory.ModelPixelScale,
      p = [h[0], h[1]].map(c),
      f = d[0] + (u[0] - 1) * p[0],
      m = d[3] - (u[1] - 1) * p[1],
      M = o[0],
      _ = o[1],
      A = [];
    for (let e = u[1] - 1; e >= 0; e--) for (let t = u[0] - 1; t >= 0; t--) {
      var g = e * u[0] + t;
      A.push([-l(_[g]), l(M[g])]);
    }
    n.push({
      del: p,
      lim: u,
      ll: [-f, m],
      cvs: A
    });
  }
  var b = {
    header: {
      nSubgrids: i
    },
    subgrids: n
  };
  return r[e] = b, b;
}
function getNadgrids(e) {
  return void 0 === e ? null : e.split(",").map(o);
}
function o(e) {
  if (0 === e.length) return null;
  var t = "@" === e[0];
  return t && (e = e.slice(1)), "null" === e ? {
    name: "null",
    mandatory: !t,
    grid: null,
    isNull: !0
  } : {
    name: e,
    mandatory: !t,
    grid: r[e] || null,
    isNull: !1
  };
}
function c(e) {
  return e * Math.PI / 180;
}
function l(e) {
  return e / 3600 * Math.PI / 180;
}
function u(e, t, n) {
  return String.fromCharCode.apply(null, new Uint8Array(e.buffer.slice(t, n)));
}
function d(e) {
  return e.map(function (e) {
    return [l(e.longitudeShift), l(e.latitudeShift)];
  });
}
function h(e, t, n) {
  return {
    name: u(e, t + 8, t + 16).trim(),
    parent: u(e, t + 24, t + 24 + 8).trim(),
    lowerLatitude: e.getFloat64(t + 72, n),
    upperLatitude: e.getFloat64(t + 88, n),
    lowerLongitude: e.getFloat64(t + 104, n),
    upperLongitude: e.getFloat64(t + 120, n),
    latitudeInterval: e.getFloat64(t + 136, n),
    longitudeInterval: e.getFloat64(t + 152, n),
    gridNodeCount: e.getInt32(t + 168, n)
  };
}
function p(e, t, n, r, i) {
  var a = t + 176,
    s = 16;
  !1 === i && (s = 8);
  for (var o = [], c = 0; c < n.gridNodeCount; c++) {
    var l = {
      latitudeShift: e.getFloat32(a + c * s, r),
      longitudeShift: e.getFloat32(a + c * s + 4, r)
    };
    !1 !== i && (l.latitudeAccuracy = e.getFloat32(a + c * s + 8, r), l.longitudeAccuracy = e.getFloat32(a + c * s + 12, r)), o.push(l);
  }
  return o;
}
export { i as default };
export { getNadgrids };
