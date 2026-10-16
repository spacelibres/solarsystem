// Recovered from vendors.js:985410-987054.
var r = /^\s+|\s+$/g,
  i = /^[-+]0x[0-9a-f]+$/i,
  a = /^0b[01]+$/i,
  s = /^0o[0-7]+$/i,
  o = parseInt,
  c = "object" == typeof globalThis && globalThis && globalThis.Object === Object && globalThis,
  l = "object" == typeof self && self && self.Object === Object && self,
  u = c || l || Function("return this")(),
  d = Object.prototype.toString,
  h = Math.max,
  p = Math.min,
  f = function () {
    return u.Date.now();
  };
function m(e) {
  var t = typeof e;
  return !!e && ("object" == t || "function" == t);
}
function M(e) {
  if ("number" == typeof e) return e;
  if (function (e) {
    return "symbol" == typeof e || function (e) {
      return !!e && "object" == typeof e;
    }(e) && "[object Symbol]" == d.call(e);
  }(e)) return NaN;
  if (m(e)) {
    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
    e = m(t) ? t + "" : t;
  }
  if ("string" != typeof e) return 0 === e ? e : +e;
  e = e.replace(r, "");
  var n = a.test(e);
  return n || s.test(e) ? o(e.slice(2), n ? 2 : 8) : i.test(e) ? NaN : +e;
}
module.exports = function (e, t, n) {
  var r,
    i,
    a,
    s,
    o,
    c,
    l = 0,
    u = !1,
    d = !1,
    _ = !0;
  if ("function" != typeof e) throw new TypeError("Expected a function");
  function A(t) {
    var n = r,
      a = i;
    return r = i = void 0, l = t, s = e.apply(a, n);
  }
  function g(e) {
    var n = e - c;
    return void 0 === c || n >= t || n < 0 || d && e - l >= a;
  }
  function b() {
    var e = f();
    if (g(e)) return y(e);
    o = setTimeout(b, function (e) {
      var n = t - (e - c);
      return d ? p(n, a - (e - l)) : n;
    }(e));
  }
  function y(e) {
    return o = void 0, _ && r ? A(e) : (r = i = void 0, s);
  }
  function L() {
    var e = f(),
      n = g(e);
    if (r = arguments, i = this, c = e, n) {
      if (void 0 === o) return function (e) {
        return l = e, o = setTimeout(b, t), u ? A(e) : s;
      }(c);
      if (d) return o = setTimeout(b, t), A(c);
    }
    return void 0 === o && (o = setTimeout(b, t)), s;
  }
  return t = M(t) || 0, m(n) && (u = !!n.leading, a = (d = "maxWait" in n) ? h(M(n.maxWait) || 0, t) : a, _ = "trailing" in n ? !!n.trailing : _), L.cancel = function () {
    void 0 !== o && clearTimeout(o), l = 0, r = c = i = o = void 0;
  }, L.flush = function () {
    return void 0 === o ? s : y(f());
  }, L;
};
