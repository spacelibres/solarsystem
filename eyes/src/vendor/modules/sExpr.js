// Recovered from vendors.js:1745944-1747228.
function r(e, t, n) {
  Array.isArray(t) && (n.unshift(t), t = null);
  var r = t ? {} : e,
    a = n.reduce(function (e, t) {
      return sExpr(t, e), e;
    }, r);
  t && (e[t] = a);
}
function sExpr(e, t) {
  if (Array.isArray(e)) {
    var n = e.shift();
    if ("PARAMETER" === n && (n = e.shift()), 1 === e.length) return Array.isArray(e[0]) ? (t[n] = {}, void sExpr(e[0], t[n])) : void (t[n] = e[0]);
    if (e.length) {
      if ("TOWGS84" !== n) {
        if ("AXIS" === n) return n in t || (t[n] = []), void t[n].push(e);
        var a;
        switch (Array.isArray(n) || (t[n] = {}), n) {
          case "UNIT":
          case "PRIMEM":
          case "VERT_DATUM":
            return t[n] = {
              name: e[0].toLowerCase(),
              convert: e[1]
            }, void (3 === e.length && sExpr(e[2], t[n]));
          case "SPHEROID":
          case "ELLIPSOID":
            return t[n] = {
              name: e[0],
              a: e[1],
              rf: e[2]
            }, void (4 === e.length && sExpr(e[3], t[n]));
          case "EDATUM":
          case "ENGINEERINGDATUM":
          case "LOCAL_DATUM":
          case "DATUM":
          case "VERT_CS":
          case "VERTCRS":
          case "VERTICALCRS":
            return e[0] = ["name", e[0]], void r(t, n, e);
          case "COMPD_CS":
          case "COMPOUNDCRS":
          case "FITTED_CS":
          case "PROJECTEDCRS":
          case "PROJCRS":
          case "GEOGCS":
          case "GEOCCS":
          case "PROJCS":
          case "LOCAL_CS":
          case "GEODCRS":
          case "GEODETICCRS":
          case "GEODETICDATUM":
          case "ENGCRS":
          case "ENGINEERINGCRS":
            return e[0] = ["name", e[0]], r(t, n, e), void (t[n].type = n);
          default:
            for (a = -1; ++a < e.length;) if (!Array.isArray(e[a])) return sExpr(e, t[n]);
            return r(t, n, e);
        }
      } else t[n] = e;
    } else t[n] = !0;
  } else t[e] = !0;
}
export { sExpr };
