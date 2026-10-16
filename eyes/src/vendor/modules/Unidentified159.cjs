/** @eyes-analysis
 * 文件职责：限制函数调用频率，复用防抖和最大等待窗口
 * 依据：// Recovered from vendors.js:987055-988899.；literal: Expected a function
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:987055-988899.
var r = "Expected a function",
  i = /^\s+|\s+$/g,
  a = /^[-+]0x[0-9a-f]+$/i,
  s = /^0b[01]+$/i,
  o = /^0o[0-7]+$/i,
  c = parseInt,
  l = "object" == typeof globalThis && globalThis && globalThis.Object === Object && globalThis,
  u = "object" == typeof self && self && self.Object === Object && self,
  d = l || u || Function("return this")(),
  h = Object.prototype.toString,
  p = Math.max,
  f = Math.min,
  m = function () {
    return d.Date.now();
  };
function M(e, t, n) {
  var i,
    a,
    s,
    o,
    c,
    l,
    u = 0,
    d = !1,
    h = !1,
    M = !0;
  if ("function" != typeof e) throw new TypeError(r);
  function g(t) {
    var n = i,
      r = a;
    return i = a = void 0, u = t, o = e.apply(r, n);
  }
  function b(e) {
    var n = e - l;
    return void 0 === l || n >= t || n < 0 || h && e - u >= s;
  }
  function y() {
    var e = m();
    if (b(e)) return L(e);
    c = setTimeout(y, function (e) {
      var n = t - (e - l);
      return h ? f(n, s - (e - u)) : n;
    }(e));
  }
  function L(e) {
    return c = void 0, M && i ? g(e) : (i = a = void 0, o);
  }
  function v() {
    var e = m(),
      n = b(e);
    if (i = arguments, a = this, l = e, n) {
      if (void 0 === c) return function (e) {
        return u = e, c = setTimeout(y, t), d ? g(e) : o;
      }(l);
      if (h) return c = setTimeout(y, t), g(l);
    }
    return void 0 === c && (c = setTimeout(y, t)), o;
  }
  return t = A(t) || 0, _(n) && (d = !!n.leading, s = (h = "maxWait" in n) ? p(A(n.maxWait) || 0, t) : s, M = "trailing" in n ? !!n.trailing : M), v.cancel = function () {
    void 0 !== c && clearTimeout(c), u = 0, i = l = a = c = void 0;
  }, v.flush = function () {
    return void 0 === c ? o : L(m());
  }, v;
}
function _(e) {
  var t = typeof e;
  return !!e && ("object" == t || "function" == t);
}
function A(e) {
  if ("number" == typeof e) return e;
  if (function (e) {
    return "symbol" == typeof e || function (e) {
      return !!e && "object" == typeof e;
    }(e) && "[object Symbol]" == h.call(e);
  }(e)) return NaN;
  if (_(e)) {
    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
    e = _(t) ? t + "" : t;
  }
  if ("string" != typeof e) return 0 === e ? e : +e;
  e = e.replace(i, "");
  var n = s.test(e);
  return n || o.test(e) ? c(e.slice(2), n ? 2 : 8) : a.test(e) ? NaN : +e;
}
module.exports = function (e, t, n) {
  var i = !0,
    a = !0;
  if ("function" != typeof e) throw new TypeError(r);
  return _(n) && (i = "leading" in n ? !!n.leading : i, a = "trailing" in n ? !!n.trailing : a), M(e, t, {
    leading: i,
    maxWait: t,
    trailing: a
  });
};
