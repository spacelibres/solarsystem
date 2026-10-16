// Recovered from vendors.js:983880-985409.
var t = function (e) {
  return function (e) {
    return !!e && "object" == typeof e;
  }(e) && !function (e) {
    var t = Object.prototype.toString.call(e);
    return "[object RegExp]" === t || "[object Date]" === t || function (e) {
      return e.$$typeof === n;
    }(e);
  }(e);
};
var n = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;
function r(e, t) {
  return !1 !== t.clone && t.isMergeableObject(e) ? c((n = e, Array.isArray(n) ? [] : {}), e, t) : e;
  var n;
}
function i(e, t, n) {
  return e.concat(t).map(function (e) {
    return r(e, n);
  });
}
function a(e) {
  return Object.keys(e).concat(function (e) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function (t) {
      return e.propertyIsEnumerable(t);
    }) : [];
  }(e));
}
function s(e, t) {
  try {
    return t in e;
  } catch (e) {
    return !1;
  }
}
function o(e, t, n) {
  var i = {};
  return n.isMergeableObject(e) && a(e).forEach(function (t) {
    i[t] = r(e[t], n);
  }), a(t).forEach(function (a) {
    (function (e, t) {
      return s(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
    })(e, a) || (s(e, a) && n.isMergeableObject(t[a]) ? i[a] = function (e, t) {
      if (!t.customMerge) return c;
      var n = t.customMerge(e);
      return "function" == typeof n ? n : c;
    }(a, n)(e[a], t[a], n) : i[a] = r(t[a], n));
  }), i;
}
function c(e, n, a) {
  (a = a || {}).arrayMerge = a.arrayMerge || i, a.isMergeableObject = a.isMergeableObject || t, a.cloneUnlessOtherwiseSpecified = r;
  var s = Array.isArray(n);
  return s === Array.isArray(e) ? s ? a.arrayMerge(e, n, a) : o(e, n, a) : r(n, a);
}
c.all = function (e, t) {
  if (!Array.isArray(e)) throw new Error("first argument should be an array");
  return e.reduce(function (e, n) {
    return c(e, n, t);
  }, {});
};
var l = c;
module.exports = l;
