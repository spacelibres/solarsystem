// Recovered from vendors.js:988900-1044114.
var r, i;
i = "undefined" != typeof window ? window : this, r = function () {
  return function (e, t, n) {
    "use strict";

    var r,
      i,
      a,
      s = "OverlayScrollbars",
      o = {
        o: "object",
        f: "function",
        a: "array",
        s: "string",
        b: "boolean",
        n: "number",
        u: "undefined",
        z: "null"
      },
      c = {
        c: "class",
        s: "style",
        i: "id",
        l: "length",
        p: "prototype",
        ti: "tabindex",
        oH: "offsetHeight",
        cH: "clientHeight",
        sH: "scrollHeight",
        oW: "offsetWidth",
        cW: "clientWidth",
        sW: "scrollWidth",
        hOP: "hasOwnProperty",
        bCR: "getBoundingClientRect"
      },
      l = function () {
        var r = {},
          i = {},
          a = ["-webkit-", "-moz-", "-o-", "-ms-"],
          s = ["WebKit", "Moz", "O", "MS"];
        function o(e) {
          return e.charAt(0).toUpperCase() + e.slice(1);
        }
        return {
          _cssPrefixes: a,
          _jsPrefixes: s,
          _cssProperty: function (e) {
            var r = i[e];
            if (i[c.hOP](e)) return r;
            for (var s, l, u, d = o(e), h = t.createElement("div")[c.s], p = 0; p < a.length; p++) for (u = a[p].replace(/-/g, ""), s = [e, a[p] + e, u + d, o(u) + d], l = 0; l < s[c.l]; l++) if (h[s[l]] !== n) {
              r = s[l];
              break;
            }
            return i[e] = r, r;
          },
          _cssPropertyValue: function (e, n, r) {
            var a = e + " " + n,
              s = i[a];
            if (i[c.hOP](a)) return s;
            for (var o, u = t.createElement("div")[c.s], d = n.split(" "), h = r || "", p = 0, f = -1; p < d[c.l]; p++) for (; f < l._cssPrefixes[c.l]; f++) if (o = f < 0 ? d[p] : l._cssPrefixes[f] + d[p], u.cssText = e + ":" + o + h, u[c.l]) {
              s = o;
              break;
            }
            return i[a] = s, s;
          },
          _jsAPI: function (t, n, i) {
            var a = 0,
              l = r[t];
            if (!r[c.hOP](t)) {
              for (l = e[t]; a < s[c.l]; a++) l = l || e[(n ? s[a] : s[a].toLowerCase()) + o(t)];
              r[t] = l;
            }
            return l || i;
          }
        };
      }(),
      u = function () {
        function r(n) {
          return n ? e.innerWidth || t.documentElement[c.cW] || t.body[c.cW] : e.innerHeight || t.documentElement[c.cH] || t.body[c.cH];
        }
        function i(e, t) {
          if (typeof e != o.f) throw "Can't bind function!";
          var n = c.p,
            r = Array[n].slice.call(arguments, 2),
            i = function () {},
            a = function () {
              return e.apply(this instanceof i ? this : t, r.concat(Array[n].slice.call(arguments)));
            };
          return e[n] && (i[n] = e[n]), a[n] = new i(), a;
        }
        return {
          wW: i(r, 0, !0),
          wH: i(r, 0),
          mO: i(l._jsAPI, 0, "MutationObserver", !0),
          rO: i(l._jsAPI, 0, "ResizeObserver", !0),
          rAF: i(l._jsAPI, 0, "requestAnimationFrame", !1, function (t) {
            return e.setTimeout(t, 1e3 / 60);
          }),
          cAF: i(l._jsAPI, 0, "cancelAnimationFrame", !1, function (t) {
            return e.clearTimeout(t);
          }),
          now: function () {
            return Date.now && Date.now() || new Date().getTime();
          },
          stpP: function (e) {
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
          },
          prvD: function (e) {
            e.preventDefault && e.cancelable ? e.preventDefault() : e.returnValue = !1;
          },
          page: function (e) {
            var r = "page",
              i = "client",
              a = "X",
              s = "Y",
              o = ((e = e.originalEvent || e).target || e.srcElement || t).ownerDocument || t,
              c = o.documentElement,
              l = o.body;
            if (e.touches !== n) {
              var u = e.touches[0];
              return {
                x: u[r + a],
                y: u[r + s]
              };
            }
            return !e[r + a] && e[i + a] && null != e[i + a] ? {
              x: e[i + a] + (c && c.scrollLeft || l && l.scrollLeft || 0) - (c && c.clientLeft || l && l.clientLeft || 0),
              y: e[i + s] + (c && c.scrollTop || l && l.scrollTop || 0) - (c && c.clientTop || l && l.clientTop || 0)
            } : {
              x: e[r + a],
              y: e[r + s]
            };
          },
          mBtn: function (e) {
            var t = e.button;
            return e.which || t === n ? e.which : 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0;
          },
          inA: function (e, t) {
            for (var n = 0; n < t[c.l]; n++) try {
              if (t[n] === e) return n;
            } catch (e) {}
            return -1;
          },
          isA: function (e) {
            var t = Array.isArray;
            return t ? t(e) : this.type(e) == o.a;
          },
          type: function (e) {
            return e === n || null === e ? e + "" : Object[c.p].toString.call(e).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
          },
          bind: i
        };
      }(),
      d = Math,
      h = e.jQuery,
      p = (a = {
        p: d.PI,
        c: d.cos,
        s: d.sin,
        w: d.pow,
        t: d.sqrt,
        n: d.asin,
        a: d.abs,
        o: 1.70158
      }, {
        swing: function (e, t, n, r, i) {
          return .5 - a.c(e * a.p) / 2;
        },
        linear: function (e, t, n, r, i) {
          return e;
        },
        easeInQuad: function (e, t, n, r, i) {
          return r * (t /= i) * t + n;
        },
        easeOutQuad: function (e, t, n, r, i) {
          return -r * (t /= i) * (t - 2) + n;
        },
        easeInOutQuad: function (e, t, n, r, i) {
          return (t /= i / 2) < 1 ? r / 2 * t * t + n : -r / 2 * (--t * (t - 2) - 1) + n;
        },
        easeInCubic: function (e, t, n, r, i) {
          return r * (t /= i) * t * t + n;
        },
        easeOutCubic: function (e, t, n, r, i) {
          return r * ((t = t / i - 1) * t * t + 1) + n;
        },
        easeInOutCubic: function (e, t, n, r, i) {
          return (t /= i / 2) < 1 ? r / 2 * t * t * t + n : r / 2 * ((t -= 2) * t * t + 2) + n;
        },
        easeInQuart: function (e, t, n, r, i) {
          return r * (t /= i) * t * t * t + n;
        },
        easeOutQuart: function (e, t, n, r, i) {
          return -r * ((t = t / i - 1) * t * t * t - 1) + n;
        },
        easeInOutQuart: function (e, t, n, r, i) {
          return (t /= i / 2) < 1 ? r / 2 * t * t * t * t + n : -r / 2 * ((t -= 2) * t * t * t - 2) + n;
        },
        easeInQuint: function (e, t, n, r, i) {
          return r * (t /= i) * t * t * t * t + n;
        },
        easeOutQuint: function (e, t, n, r, i) {
          return r * ((t = t / i - 1) * t * t * t * t + 1) + n;
        },
        easeInOutQuint: function (e, t, n, r, i) {
          return (t /= i / 2) < 1 ? r / 2 * t * t * t * t * t + n : r / 2 * ((t -= 2) * t * t * t * t + 2) + n;
        },
        easeInSine: function (e, t, n, r, i) {
          return -r * a.c(t / i * (a.p / 2)) + r + n;
        },
        easeOutSine: function (e, t, n, r, i) {
          return r * a.s(t / i * (a.p / 2)) + n;
        },
        easeInOutSine: function (e, t, n, r, i) {
          return -r / 2 * (a.c(a.p * t / i) - 1) + n;
        },
        easeInExpo: function (e, t, n, r, i) {
          return 0 == t ? n : r * a.w(2, 10 * (t / i - 1)) + n;
        },
        easeOutExpo: function (e, t, n, r, i) {
          return t == i ? n + r : r * (1 - a.w(2, -10 * t / i)) + n;
        },
        easeInOutExpo: function (e, t, n, r, i) {
          return 0 == t ? n : t == i ? n + r : (t /= i / 2) < 1 ? r / 2 * a.w(2, 10 * (t - 1)) + n : r / 2 * (2 - a.w(2, -10 * --t)) + n;
        },
        easeInCirc: function (e, t, n, r, i) {
          return -r * (a.t(1 - (t /= i) * t) - 1) + n;
        },
        easeOutCirc: function (e, t, n, r, i) {
          return r * a.t(1 - (t = t / i - 1) * t) + n;
        },
        easeInOutCirc: function (e, t, n, r, i) {
          return (t /= i / 2) < 1 ? -r / 2 * (a.t(1 - t * t) - 1) + n : r / 2 * (a.t(1 - (t -= 2) * t) + 1) + n;
        },
        easeInElastic: function (e, t, n, r, i) {
          var s = a.o,
            o = 0,
            c = r;
          return 0 == t ? n : 1 == (t /= i) ? n + r : (o || (o = .3 * i), c < a.a(r) ? (c = r, s = o / 4) : s = o / (2 * a.p) * a.n(r / c), -c * a.w(2, 10 * (t -= 1)) * a.s((t * i - s) * (2 * a.p) / o) + n);
        },
        easeOutElastic: function (e, t, n, r, i) {
          var s = a.o,
            o = 0,
            c = r;
          return 0 == t ? n : 1 == (t /= i) ? n + r : (o || (o = .3 * i), c < a.a(r) ? (c = r, s = o / 4) : s = o / (2 * a.p) * a.n(r / c), c * a.w(2, -10 * t) * a.s((t * i - s) * (2 * a.p) / o) + r + n);
        },
        easeInOutElastic: function (e, t, n, r, i) {
          var s = a.o,
            o = 0,
            c = r;
          return 0 == t ? n : 2 == (t /= i / 2) ? n + r : (o || (o = i * (.3 * 1.5)), c < a.a(r) ? (c = r, s = o / 4) : s = o / (2 * a.p) * a.n(r / c), t < 1 ? c * a.w(2, 10 * (t -= 1)) * a.s((t * i - s) * (2 * a.p) / o) * -.5 + n : c * a.w(2, -10 * (t -= 1)) * a.s((t * i - s) * (2 * a.p) / o) * .5 + r + n);
        },
        easeInBack: function (e, t, n, r, i, s) {
          return r * (t /= i) * t * (((s = s || a.o) + 1) * t - s) + n;
        },
        easeOutBack: function (e, t, n, r, i, s) {
          return r * ((t = t / i - 1) * t * (((s = s || a.o) + 1) * t + s) + 1) + n;
        },
        easeInOutBack: function (e, t, n, r, i, s) {
          return s = s || a.o, (t /= i / 2) < 1 ? r / 2 * (t * t * ((1 + (s *= 1.525)) * t - s)) + n : r / 2 * ((t -= 2) * t * ((1 + (s *= 1.525)) * t + s) + 2) + n;
        },
        easeInBounce: function (e, t, n, r, i) {
          return r - this.easeOutBounce(e, i - t, 0, r, i) + n;
        },
        easeOutBounce: function (e, t, n, r, i) {
          var a = 7.5625;
          return (t /= i) < 1 / 2.75 ? r * (a * t * t) + n : t < 2 / 2.75 ? r * (a * (t -= 1.5 / 2.75) * t + .75) + n : t < 2.5 / 2.75 ? r * (a * (t -= 2.25 / 2.75) * t + .9375) + n : r * (a * (t -= 2.625 / 2.75) * t + .984375) + n;
        },
        easeInOutBounce: function (e, t, n, r, i) {
          return t < i / 2 ? .5 * this.easeInBounce(e, 2 * t, 0, r, i) + n : .5 * this.easeOutBounce(e, 2 * t - i, 0, r, i) + .5 * r + n;
        }
      }),
      f = function () {
        var r = /[^\x20\t\r\n\f]+/g,
          i = " ",
          a = "",
          s = "scrollLeft",
          l = "scrollTop",
          h = [],
          f = u.type,
          m = {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
          };
        function M() {
          var e,
            t,
            r,
            i,
            a,
            s,
            l = arguments[0] || {},
            d = 1,
            h = arguments[c.l],
            p = !1;
          for (f(l) == o.b && (p = l, l = arguments[1] || {}, d = 2), f(l) != o.o && !f(l) == o.f && (l = {}), h === d && (l = D, --d); d < h; d++) if (null != (a = arguments[d])) for (i in a) e = l[i], l !== (r = a[i]) && (p && r && (b(r) || (t = u.isA(r))) ? (t ? (t = !1, s = e && u.isA(e) ? e : []) : s = e && b(e) ? e : {}, l[i] = M(p, s, r)) : r !== n && (l[i] = r));
          return l;
        }
        function _(e, t, n) {
          for (var r = n || 0; r < t[c.l]; r++) if (t[r] === e) return r;
          return -1;
        }
        function A(e) {
          return f(e) == o.f;
        }
        function g(e) {
          for (var t in e) return !1;
          return !0;
        }
        function b(e) {
          if (!e || f(e) != o.o) return !1;
          var t,
            n = c.p,
            r = Object[n].hasOwnProperty,
            i = r.call(e, "constructor"),
            a = e.constructor && e.constructor[n] && r.call(e.constructor[n], "isPrototypeOf");
          if (e.constructor && !i && !a) return !1;
          for (t in e);
          return f(t) == o.u || r.call(e, t);
        }
        function y(e, t) {
          var n = 0;
          if (L(e)) for (; n < e[c.l] && !1 !== t.call(e[n], n, e[n]); n++);else for (n in e) if (!1 === t.call(e[n], n, e[n])) break;
          return e;
        }
        function L(e) {
          var t = !!e && [c.l] in e && e[c.l],
            n = f(e);
          return !A(n) && (n == o.a || 0 === t || f(t) == o.n && t > 0 && t - 1 in e);
        }
        function v(e) {
          return (e.match(r) || []).join(i);
        }
        function T(e, n) {
          for (var r = (e.parentNode || t).querySelectorAll(n) || [], i = r[c.l]; i--;) if (r[i] == e) return !0;
          return !1;
        }
        function S(e, t, n) {
          if (u.isA(n)) for (var r = 0; r < n[c.l]; r++) S(e, t, n[r]);else f(n) == o.s ? e.insertAdjacentHTML(t, n) : e.insertAdjacentElement(t, n.nodeType ? n : n[0]);
        }
        function w(e, t, r) {
          try {
            e[c.s][t] !== n && (e[c.s][t] = E(t, r));
          } catch (e) {}
        }
        function E(e, t) {
          return m[e.toLowerCase()] || f(t) != o.n || (t += "px"), t;
        }
        function x(e, t) {
          var n, r;
          !1 !== t && e.q.splice(0, 1), e.q[c.l] > 0 ? (r = e.q[0], z(e.el, r.props, r.duration, r.easing, r.complete, !0)) : (n = _(e, h)) > -1 && h.splice(n, 1);
        }
        function C(e, t, n) {
          t === s || t === l ? e[t] = n : w(e, t, n);
        }
        function z(e, t, r, i, a, o) {
          var f,
            m,
            M,
            y,
            L,
            v,
            T = b(r),
            S = {},
            w = {},
            E = 0;
          for (T ? (i = r.easing, r.start, M = r.progress, y = r.step, L = r.specialEasing, a = r.complete, v = r.duration) : v = r, L = L || {}, v = v || 400, i = i || "swing", o = o || !1; E < h[c.l]; E++) if (h[E].el === e) {
            m = h[E];
            break;
          }
          for (f in m || (m = {
            el: e,
            q: []
          }, h.push(m)), t) S[f] = f === s || f === l ? e[f] : D(e).css(f);
          for (f in S) S[f] !== t[f] && t[f] !== n && (w[f] = t[f]);
          if (g(w)) o && x(m);else {
            var z,
              O,
              B,
              N,
              I,
              R,
              k,
              P,
              Y,
              W = o ? 0 : _(F, m.q),
              F = {
                props: w,
                duration: T ? r : v,
                easing: i,
                complete: a
              };
            if (-1 === W && (W = m.q[c.l], m.q.push(F)), 0 === W) if (v > 0) k = u.now(), P = function () {
              for (f in z = u.now(), Y = z - k, O = F.stop || Y >= v, B = 1 - (d.max(0, k + v - z) / v || 0), w) N = parseFloat(S[f]), I = parseFloat(w[f]), R = (I - N) * p[L[f] || i](B, B * v, 0, 1, v) + N, C(e, f, R), A(y) && y(R, {
                elem: e,
                prop: f,
                start: N,
                now: R,
                end: I,
                pos: B,
                options: {
                  easing: i,
                  speacialEasing: L,
                  duration: v,
                  complete: a,
                  step: y
                },
                startTime: k
              });
              A(M) && M({}, B, d.max(0, v - Y)), O ? (x(m), A(a) && a()) : F.frame = u.rAF()(P);
            }, F.frame = u.rAF()(P);else {
              for (f in w) C(e, f, w[f]);
              x(m);
            }
          }
        }
        function O(e, t, n) {
          for (var r, i, a, s = 0; s < h[c.l]; s++) if ((r = h[s]).el === e) {
            if (r.q[c.l] > 0) {
              if ((i = r.q[0]).stop = !0, u.cAF()(i.frame), r.q.splice(0, 1), n) for (a in i.props) C(e, a, i.props[a]);
              t ? r.q = [] : x(r, !1);
            }
            break;
          }
        }
        function B(e) {
          return !!(e[c.oW] || e[c.oH] || e.getClientRects()[c.l]);
        }
        function D(n) {
          if (0 === arguments[c.l]) return this;
          var r,
            i,
            a = new D(),
            s = n,
            l = 0;
          if (f(n) == o.s) for (s = [], "<" === n.charAt(0) ? ((i = t.createElement("div")).innerHTML = n, r = i.children) : r = t.querySelectorAll(n); l < r[c.l]; l++) s.push(r[l]);
          if (s) {
            for (f(s) == o.s || L(s) && s !== e && s !== s.self || (s = [s]), l = 0; l < s[c.l]; l++) a[l] = s[l];
            a[c.l] = s[c.l];
          }
          return a;
        }
        return D[c.p] = {
          on: function (e, t) {
            var n,
              i = (e = (e || a).match(r) || [a])[c.l],
              s = 0;
            return this.each(function () {
              n = this;
              try {
                if (n.addEventListener) for (; s < i; s++) n.addEventListener(e[s], t);else if (n.detachEvent) for (; s < i; s++) n.attachEvent("on" + e[s], t);
              } catch (e) {}
            });
          },
          off: function (e, t) {
            var n,
              i = (e = (e || a).match(r) || [a])[c.l],
              s = 0;
            return this.each(function () {
              n = this;
              try {
                if (n.removeEventListener) for (; s < i; s++) n.removeEventListener(e[s], t);else if (n.detachEvent) for (; s < i; s++) n.detachEvent("on" + e[s], t);
              } catch (e) {}
            });
          },
          one: function (e, t) {
            return e = (e || a).match(r) || [a], this.each(function () {
              var n = D(this);
              D.each(e, function (e, r) {
                var i = function (e) {
                  t.call(this, e), n.off(r, i);
                };
                n.on(r, i);
              });
            });
          },
          trigger: function (e) {
            var n, r;
            return this.each(function () {
              n = this, t.createEvent ? ((r = t.createEvent("HTMLEvents")).initEvent(e, !0, !1), n.dispatchEvent(r)) : n.fireEvent("on" + e);
            });
          },
          append: function (e) {
            return this.each(function () {
              S(this, "beforeend", e);
            });
          },
          prepend: function (e) {
            return this.each(function () {
              S(this, "afterbegin", e);
            });
          },
          before: function (e) {
            return this.each(function () {
              S(this, "beforebegin", e);
            });
          },
          after: function (e) {
            return this.each(function () {
              S(this, "afterend", e);
            });
          },
          remove: function () {
            return this.each(function () {
              var e = this,
                t = e.parentNode;
              null != t && t.removeChild(e);
            });
          },
          unwrap: function () {
            var e,
              t,
              n,
              r = [];
            for (this.each(function () {
              -1 === _(n = this.parentNode, r) && r.push(n);
            }), e = 0; e < r[c.l]; e++) {
              for (t = r[e], n = t.parentNode; t.firstChild;) n.insertBefore(t.firstChild, t);
              n.removeChild(t);
            }
            return this;
          },
          wrapAll: function (e) {
            for (var t, n = this, r = D(e)[0], i = r, a = n[0].parentNode, s = n[0].previousSibling; i.childNodes[c.l] > 0;) i = i.childNodes[0];
            for (t = 0; n[c.l] - t; i.firstChild === n[0] && t++) i.appendChild(n[t]);
            var o = s ? s.nextSibling : a.firstChild;
            return a.insertBefore(r, o), this;
          },
          wrapInner: function (e) {
            return this.each(function () {
              var t = D(this),
                n = t.contents();
              n[c.l] ? n.wrapAll(e) : t.append(e);
            });
          },
          wrap: function (e) {
            return this.each(function () {
              D(this).wrapAll(e);
            });
          },
          css: function (t, r) {
            var i,
              a,
              s,
              l = e.getComputedStyle;
            return f(t) == o.s ? r === n ? (i = this[0], s = l ? l(i, null) : i.currentStyle[t], l ? null != s ? s.getPropertyValue(t) : i[c.s][t] : s) : this.each(function () {
              w(this, t, r);
            }) : this.each(function () {
              for (a in t) w(this, a, t[a]);
            });
          },
          hasClass: function (e) {
            for (var t, n, r = 0, s = i + e + i; t = this[r++];) {
              if ((n = t.classList) && n.contains(e)) return !0;
              if (1 === t.nodeType && (i + v(t.className + a) + i).indexOf(s) > -1) return !0;
            }
            return !1;
          },
          addClass: function (e) {
            var t,
              s,
              o,
              c,
              l,
              u,
              d,
              h,
              p = 0,
              f = 0;
            if (e) for (t = e.match(r) || []; s = this[p++];) if (h = s.classList, d === n && (d = h !== n), d) for (; l = t[f++];) h.add(l);else if (c = s.className + a, o = 1 === s.nodeType && i + v(c) + i) {
              for (; l = t[f++];) o.indexOf(i + l + i) < 0 && (o += l + i);
              c !== (u = v(o)) && (s.className = u);
            }
            return this;
          },
          removeClass: function (e) {
            var t,
              s,
              o,
              c,
              l,
              u,
              d,
              h,
              p = 0,
              f = 0;
            if (e) for (t = e.match(r) || []; s = this[p++];) if (h = s.classList, d === n && (d = h !== n), d) for (; l = t[f++];) h.remove(l);else if (c = s.className + a, o = 1 === s.nodeType && i + v(c) + i) {
              for (; l = t[f++];) for (; o.indexOf(i + l + i) > -1;) o = o.replace(i + l + i, i);
              c !== (u = v(o)) && (s.className = u);
            }
            return this;
          },
          hide: function () {
            return this.each(function () {
              this[c.s].display = "none";
            });
          },
          show: function () {
            return this.each(function () {
              this[c.s].display = "block";
            });
          },
          attr: function (e, t) {
            for (var r, i = 0; r = this[i++];) {
              if (t === n) return r.getAttribute(e);
              r.setAttribute(e, t);
            }
            return this;
          },
          removeAttr: function (e) {
            return this.each(function () {
              this.removeAttribute(e);
            });
          },
          offset: function () {
            var n = this[0][c.bCR](),
              r = e.pageXOffset || t.documentElement[s],
              i = e.pageYOffset || t.documentElement[l];
            return {
              top: n.top + i,
              left: n.left + r
            };
          },
          position: function () {
            var e = this[0];
            return {
              top: e.offsetTop,
              left: e.offsetLeft
            };
          },
          scrollLeft: function (e) {
            for (var t, r = 0; t = this[r++];) {
              if (e === n) return t[s];
              t[s] = e;
            }
            return this;
          },
          scrollTop: function (e) {
            for (var t, r = 0; t = this[r++];) {
              if (e === n) return t[l];
              t[l] = e;
            }
            return this;
          },
          val: function (e) {
            var t = this[0];
            return e ? (t.value = e, this) : t.value;
          },
          first: function () {
            return this.eq(0);
          },
          last: function () {
            return this.eq(-1);
          },
          eq: function (e) {
            return D(this[e >= 0 ? e : this[c.l] + e]);
          },
          find: function (e) {
            var t,
              n = [];
            return this.each(function () {
              var r = this.querySelectorAll(e);
              for (t = 0; t < r[c.l]; t++) n.push(r[t]);
            }), D(n);
          },
          children: function (e) {
            var t,
              n,
              r,
              i = [];
            return this.each(function () {
              for (n = this.children, r = 0; r < n[c.l]; r++) t = n[r], e ? (t.matches && t.matches(e) || T(t, e)) && i.push(t) : i.push(t);
            }), D(i);
          },
          parent: function (e) {
            var t,
              n = [];
            return this.each(function () {
              t = this.parentNode, e && !D(t).is(e) || n.push(t);
            }), D(n);
          },
          is: function (e) {
            var t, n;
            for (n = 0; n < this[c.l]; n++) {
              if (t = this[n], ":visible" === e) return B(t);
              if (":hidden" === e) return !B(t);
              if (t.matches && t.matches(e) || T(t, e)) return !0;
            }
            return !1;
          },
          contents: function () {
            var e,
              t,
              n = [];
            return this.each(function () {
              for (e = this.childNodes, t = 0; t < e[c.l]; t++) n.push(e[t]);
            }), D(n);
          },
          each: function (e) {
            return y(this, e);
          },
          animate: function (e, t, n, r) {
            return this.each(function () {
              z(this, e, t, n, r);
            });
          },
          stop: function (e, t) {
            return this.each(function () {
              O(this, e, t);
            });
          }
        }, M(D, {
          extend: M,
          inArray: _,
          isEmptyObject: g,
          isPlainObject: b,
          each: y
        }), D;
      }(),
      m = (r = [], i = "__overlayScrollbars__", function (e, t) {
        var n = arguments[c.l];
        if (n < 1) return r;
        if (t) e[i] = t, r.push(e);else {
          var a = u.inA(e, r);
          if (a > -1) {
            if (!(n > 1)) return r[a][i];
            delete e[i], r.splice(a, 1);
          }
        }
      }),
      M = function () {
        var r,
          i,
          a,
          p,
          M,
          _,
          A,
          g,
          b,
          y,
          L,
          v,
          T,
          S,
          w,
          E,
          x = [],
          C = (p = u.type, M = [o.b, o.n, o.s, o.a, o.o, o.f, o.z], _ = " ", A = ":", g = [o.z, o.s], b = o.n, y = [o.z, o.b], L = [!0, o.b], v = [!1, o.b], T = [null, [o.z, o.f]], S = "v-h:visible-hidden v-s:visible-scroll s:scroll h:hidden", w = {
            className: ["os-theme-dark", g],
            resize: ["none", "n:none b:both h:horizontal v:vertical"],
            sizeAutoCapable: L,
            clipAlways: L,
            normalizeRTL: L,
            paddingAbsolute: v,
            autoUpdate: [null, y],
            autoUpdateInterval: [33, b],
            updateOnLoad: [["img"], [o.s, o.a, o.z]],
            nativeScrollbarsOverlaid: {
              showNativeScrollbars: v,
              initialize: L
            },
            overflowBehavior: {
              x: ["scroll", S],
              y: ["scroll", S]
            },
            scrollbars: {
              visibility: ["auto", "v:visible h:hidden a:auto"],
              autoHide: ["never", "n:never s:scroll l:leave m:move"],
              autoHideDelay: [800, b],
              dragScrolling: L,
              clickScrolling: v,
              touchSupport: L,
              snapHandle: v
            },
            textarea: {
              dynWidth: v,
              dynHeight: v,
              inheritedAttrs: [["style", "class"], [o.s, o.a, o.z]]
            },
            callbacks: {
              onInitialized: T,
              onInitializationWithdrawn: T,
              onDestroyed: T,
              onScrollStart: T,
              onScroll: T,
              onScrollStop: T,
              onOverflowChanged: T,
              onOverflowAmountChanged: T,
              onDirectionChanged: T,
              onContentSizeChanged: T,
              onHostSizeChanged: T,
              onUpdated: T
            }
          }, {
            _defaults: (E = function (e) {
              var t = function (n) {
                var r, i, a;
                for (r in n) n[c.hOP](r) && (i = n[r], (a = p(i)) == o.a ? n[r] = i[e ? 1 : 0] : a == o.o && (n[r] = t(i)));
                return n;
              };
              return t(f.extend(!0, {}, w));
            })(),
            _template: E(!0),
            _validate: function (t, r, i, a) {
              var s = {},
                l = {},
                d = f.extend(!0, {}, t),
                h = f.inArray,
                m = f.isEmptyObject,
                g = function (e, t, r, a, s, l) {
                  for (var d in t) if (t[c.hOP](d) && e[c.hOP](d)) {
                    var b,
                      y,
                      L,
                      v,
                      T,
                      S,
                      w,
                      E,
                      x = !1,
                      C = !1,
                      z = t[d],
                      O = p(z),
                      B = O == o.o,
                      D = u.isA(z) ? z : [z],
                      N = r[d],
                      I = e[d],
                      R = p(I),
                      k = l ? l + "." : "",
                      P = 'The option "' + k + d + "\" wasn't set, because",
                      Y = [],
                      W = [];
                    if (N = N === n ? {} : N, B && R == o.o) a[d] = {}, s[d] = {}, g(I, z, N, a[d], s[d], k + d), f.each([e, a, s], function (e, t) {
                      m(t[d]) && delete t[d];
                    });else if (!B) {
                      for (S = 0; S < D[c.l]; S++) if (T = D[S], L = (O = p(T)) == o.s && -1 === h(T, M)) for (Y.push(o.s), b = T.split(_), W = W.concat(b), w = 0; w < b[c.l]; w++) {
                        for (v = (y = b[w].split(A))[0], E = 0; E < y[c.l]; E++) if (I === y[E]) {
                          x = !0;
                          break;
                        }
                        if (x) break;
                      } else if (Y.push(T), R === T) {
                        x = !0;
                        break;
                      }
                      x ? ((C = I !== N) && (a[d] = I), (L ? h(N, y) < 0 : C) && (s[d] = L ? v : I)) : i && console.warn(P + " it doesn't accept the type [ " + R.toUpperCase() + ' ] with the value of "' + I + '".\r\nAccepted types are: [ ' + Y.join(", ").toUpperCase() + " ]." + (W[length] > 0 ? "\r\nValid strings are: [ " + W.join(", ").split(A).join(", ") + " ]." : "")), delete e[d];
                    }
                  }
                };
              return g(d, r, a || {}, s, l), !m(d) && i && console.warn("The following options are discarded due to invalidity:\r\n" + e.JSON.stringify(d, null, 2)), {
                _default: s,
                _prepared: l
              };
            }
          });
        function z() {
          i || (i = new O(C._defaults)), a || (a = new B(i));
        }
        function O(t) {
          var n = this,
            r = "overflow",
            i = "hidden",
            a = "scroll",
            s = f("body"),
            o = f('<div id="os-dummy-scrollbar-size"><div></div></div>'),
            h = o[0],
            p = f(o.children("div").eq(0));
          s.append(o), o.hide().show();
          var M = g(h),
            _ = {
              x: 0 === M.x,
              y: 0 === M.y
            },
            A = function () {
              var t,
                n = e.navigator.userAgent,
                r = "indexOf",
                i = "substring",
                a = n[r]("MSIE "),
                s = n[r]("Trident/"),
                o = n[r]("Edge/"),
                c = n[r]("rv:"),
                l = parseInt;
              return a > 0 ? t = l(n[i](a + 5, n[r](".", a)), 10) : s > 0 ? t = l(n[i](c + 3, n[r](".", c)), 10) : o > 0 && (t = l(n[i](o + 5, n[r](".", o)), 10)), t;
            }();
          function g(e) {
            return {
              x: e[c.oH] - e[c.cH],
              y: e[c.oW] - e[c.cW]
            };
          }
          f.extend(n, {
            defaultOptions: t,
            msie: A,
            autoUpdateLoop: !1,
            autoUpdateRecommended: !u.mO(),
            nativeScrollbarSize: M,
            nativeScrollbarIsOverlaid: _,
            nativeScrollbarStyling: function () {
              var t = !1;
              o.addClass("os-viewport-native-scrollbars-invisible");
              try {
                t = "none" === o.css("scrollbar-width") && (A > 9 || !A) || "none" === e.getComputedStyle(h, "::-webkit-scrollbar").getPropertyValue("display");
              } catch (e) {}
              return t;
            }(),
            overlayScrollbarDummySize: {
              x: 30,
              y: 30
            },
            cssCalc: l._cssPropertyValue("width", "calc", "(1px)") || null,
            restrictedMeasuring: function () {
              o.css(r, i);
              var e = {
                w: h[c.sW],
                h: h[c.sH]
              };
              o.css(r, "visible");
              var t = {
                w: h[c.sW],
                h: h[c.sH]
              };
              return e.w - t.w !== 0 || e.h - t.h !== 0;
            }(),
            rtlScrollBehavior: function () {
              o.css({
                "overflow-y": i,
                "overflow-x": a,
                direction: "rtl"
              }).scrollLeft(0);
              var e = o.offset(),
                t = p.offset();
              o.scrollLeft(-999);
              var n = p.offset();
              return {
                i: e.left === t.left,
                n: t.left !== n.left
              };
            }(),
            supportTransform: !!l._cssProperty("transform"),
            supportTransition: !!l._cssProperty("transition"),
            supportPassiveEvents: function () {
              var t = !1;
              try {
                e.addEventListener("test", null, Object.defineProperty({}, "passive", {
                  get: function () {
                    t = !0;
                  }
                }));
              } catch (e) {}
              return t;
            }(),
            supportResizeObserver: !!u.rO(),
            supportMutationObserver: !!u.mO()
          }), o.removeAttr(c.s).remove(), function () {
            if (!_.x || !_.y) {
              var t = d.abs,
                r = u.wW(),
                i = u.wH(),
                a = h(),
                c = function () {
                  if (m().length > 0) {
                    var e = u.wW(),
                      c = u.wH(),
                      p = e - r,
                      M = c - i;
                    if (0 === p && 0 === M) return;
                    var _,
                      A = d.round(e / (r / 100)),
                      b = d.round(c / (i / 100)),
                      y = t(p),
                      L = t(M),
                      v = t(A),
                      T = t(b),
                      S = h(),
                      w = y > 2 && L > 2,
                      E = !l(v, T),
                      x = w && E && S !== a && a > 0,
                      C = n.nativeScrollbarSize;
                    x && (s.append(o), _ = n.nativeScrollbarSize = g(o[0]), o.remove(), C.x === _.x && C.y === _.y || f.each(m(), function () {
                      m(this) && m(this).update("zoom");
                    })), r = e, i = c, a = S;
                  }
                };
              f(e).on("resize", c);
            }
            function l(e, n) {
              var r = t(e),
                i = t(n);
              return !(r === i || r + 1 === i || r - 1 === i);
            }
            function h() {
              var t = e.screen.deviceXDPI || 0,
                n = e.screen.logicalXDPI || 1;
              return e.devicePixelRatio || t / n;
            }
          }();
        }
        function B(e) {
          var t,
            r = this,
            i = f.inArray,
            a = u.now,
            s = "autoUpdate",
            o = s + "Interval",
            l = c.l,
            h = [],
            p = [],
            m = !1,
            M = 33,
            _ = M,
            A = a(),
            g = function () {
              if (h[l] > 0 && m) {
                t = u.rAF()(function () {
                  g();
                });
                var e,
                  r,
                  i,
                  c,
                  f,
                  b,
                  y = a(),
                  L = y - A;
                if (L > _) {
                  A = y - L % _, e = M;
                  for (var v = 0; v < h[l]; v++) (r = h[v]) !== n && (c = (i = r.options())[s], f = d.max(1, i[o]), b = a(), (!0 === c || null === c) && b - p[v] > f && (r.update("auto"), p[v] = new Date(b += f)), e = d.max(1, d.min(e, f)));
                  _ = e;
                }
              } else _ = M;
            };
          r.add = function (t) {
            -1 === i(t, h) && (h.push(t), p.push(a()), h[l] > 0 && !m && (m = !0, e.autoUpdateLoop = m, g()));
          }, r.remove = function (r) {
            var a = i(r, h);
            a > -1 && (p.splice(a, 1), h.splice(a, 1), 0 === h[l] && m && (m = !1, e.autoUpdateLoop = m, t !== n && (u.cAF()(t), t = -1)));
          };
        }
        function D(i, a, s, p, M) {
          var _ = u.type,
            A = f.inArray,
            g = f.each,
            b = new r(),
            y = f[c.p];
          if (_i(i)) {
            if (m(i)) {
              var L = m(i);
              return L.options(a), L;
            }
            var v,
              T,
              S,
              w,
              E,
              x,
              z,
              O,
              B,
              D,
              N,
              I,
              R,
              k,
              P,
              Y,
              W,
              F,
              q,
              H,
              U,
              G,
              X,
              j,
              V,
              K,
              J,
              $,
              Z,
              ee,
              te,
              ne,
              re,
              ie,
              ae,
              se,
              oe,
              ce,
              le,
              ue,
              de,
              he,
              pe,
              fe,
              me,
              Me,
              _e,
              Ae,
              ge,
              be,
              ye,
              Le,
              ve,
              Te,
              Se,
              we,
              Ee,
              xe,
              Ce,
              ze,
              Oe,
              Be,
              De,
              Ne,
              Ie,
              Re,
              ke,
              Pe,
              Ye,
              We,
              Fe,
              qe,
              He,
              Ue,
              Ge,
              Xe,
              je,
              Ve,
              Qe,
              Ke,
              Je,
              $e,
              Ze,
              et,
              tt,
              nt,
              rt,
              it,
              at,
              st,
              ot,
              ct,
              lt,
              ut,
              dt,
              ht,
              pt,
              ft,
              mt,
              Mt,
              _t,
              At,
              gt,
              bt,
              yt,
              Lt,
              vt,
              Tt,
              St,
              wt,
              Et,
              xt,
              Ct,
              zt,
              Ot,
              Bt,
              Dt,
              Nt,
              It,
              Rt,
              kt = {},
              Pt = {},
              Yt = {},
              Wt = {},
              Ft = {},
              qt = "-hidden",
              Ht = "margin-",
              Ut = "padding-",
              Gt = "border-",
              Xt = "top",
              jt = "right",
              Vt = "bottom",
              Qt = "left",
              Kt = "min-",
              Jt = "max-",
              $t = "width",
              Zt = "height",
              en = "float",
              tn = "",
              nn = "auto",
              rn = "sync",
              an = "scroll",
              sn = "100%",
              on = "x",
              cn = "y",
              ln = ".",
              un = " ",
              dn = "scrollbar",
              hn = "-horizontal",
              pn = "-vertical",
              fn = an + "Left",
              mn = an + "Top",
              Mn = "mousedown touchstart",
              _n = "mouseup touchend touchcancel",
              An = "mousemove touchmove",
              gn = "mouseenter",
              bn = "mouseleave",
              yn = "keydown",
              Ln = "keyup",
              vn = "selectstart",
              Tn = "transitionend webkitTransitionEnd oTransitionEnd",
              Sn = "__overlayScrollbarsRO__",
              wn = "os-",
              En = wn + "html",
              xn = wn + "host",
              Cn = xn + "-foreign",
              zn = xn + "-textarea",
              On = xn + "-" + dn + hn + qt,
              Bn = xn + "-" + dn + pn + qt,
              Dn = xn + "-transition",
              Nn = xn + "-rtl",
              In = xn + "-resize-disabled",
              Rn = xn + "-scrolling",
              kn = xn + "-overflow",
              Pn = (kn = xn + "-overflow") + "-x",
              Yn = kn + "-y",
              Wn = wn + "textarea",
              Fn = Wn + "-cover",
              qn = wn + "padding",
              Hn = wn + "viewport",
              Un = Hn + "-native-scrollbars-invisible",
              Gn = Hn + "-native-scrollbars-overlaid",
              Xn = wn + "content",
              jn = wn + "content-arrange",
              Vn = wn + "content-glue",
              Qn = wn + "size-auto-observer",
              Kn = wn + "resize-observer",
              Jn = wn + "resize-observer-item",
              $n = Jn + "-final",
              Zn = wn + "text-inherit",
              er = wn + dn,
              tr = er + "-track",
              nr = tr + "-off",
              rr = er + "-handle",
              ir = rr + "-off",
              ar = er + "-unusable",
              sr = er + "-" + nn + qt,
              or = er + "-corner",
              cr = or + "-resize",
              lr = cr + "-both",
              ur = cr + hn,
              dr = cr + pn,
              hr = er + hn,
              pr = er + pn,
              fr = wn + "dragging",
              mr = wn + "theme-none",
              Mr = [Un, Gn, nr, ir, ar, sr, cr, lr, ur, dr, fr].join(un),
              _r = [],
              Ar = [c.ti],
              gr = {},
              br = "added removed on contract",
              yr = {},
              Lr = 42,
              vr = "load",
              Tr = [],
              Sr = {},
              wr = ["wrap", "cols", "rows"],
              Er = [c.i, c.c, c.s, "open"].concat(Ar),
              xr = [];
            return b.sleep = function () {
              Z = !0;
            }, b.update = function (e) {
              var t, r, i, a, s;
              if (!P) return _(e) == o.s ? e === nn ? (t = Xr(), r = Gr(), (i = t || r) && Kr({
                _contentSizeChanged: r,
                _changedOptions: k ? n : ne
              })) : e === rn ? Lt ? (a = bt(At.takeRecords()), s = yt(gt.takeRecords())) : a = b.update(nn) : "zoom" === e && Kr({
                _hostSizeChanged: !0,
                _contentSizeChanged: !0
              }) : (e = Z || e, Z = !1, b.update(rn) && !e || Kr({
                _force: e
              })), Jr(), i || a || s;
            }, b.options = function (e, t) {
              var n,
                r = {};
              if (f.isEmptyObject(e) || !f.isPlainObject(e)) {
                if (_(e) != o.s) return te;
                if (!(arguments.length > 1)) return Si(te, e);
                wi(r, e, t), n = $r(r);
              } else n = $r(e);
              f.isEmptyObject(n) || Kr({
                _changedOptions: n
              });
            }, b.destroy = function () {
              if (!P) {
                for (var e in M.remove(b), Nr(), Or(he), Or(de), gr) b.removeExt(e);
                for (; xr[c.l] > 0;) xr.pop()();
                Fr(!0), _e && Ni(_e), Me && Ni(Me), U && Ni(de), ti(!0), li(!0), Zr(!0);
                for (var t = 0; t < Tr[c.l]; t++) f(Tr[t]).off(vr, Wr);
                Tr = n, P = !0, Z = !0, m(i, 0), di("onDestroyed");
              }
            }, b.scroll = function (e, t, r, i) {
              if (0 === arguments.length || e === n) {
                var a = Pt,
                  s = Yt,
                  l = lt && $ && S.i,
                  p = lt && $ && S.n,
                  m = a._currentScroll,
                  M = a._currentScrollRatio,
                  g = a._maxScroll;
                return M = l ? 1 - M : M, m = l ? g - m : m, g *= p ? -1 : 1, {
                  position: {
                    x: m *= p ? -1 : 1,
                    y: s._currentScroll
                  },
                  ratio: {
                    x: M,
                    y: s._currentScrollRatio
                  },
                  max: {
                    x: g,
                    y: s._maxScroll
                  },
                  handleOffset: {
                    x: a._handleOffset,
                    y: s._handleOffset
                  },
                  handleLength: {
                    x: a._handleLength,
                    y: s._handleLength
                  },
                  handleLengthRatio: {
                    x: a._handleLengthRatio,
                    y: s._handleLengthRatio
                  },
                  trackLength: {
                    x: a._trackLength,
                    y: s._trackLength
                  },
                  snappedHandleOffset: {
                    x: a._snappedHandleOffset,
                    y: s._snappedHandleOffset
                  },
                  isRTL: $,
                  isRTLNormalized: lt
                };
              }
              b.update(rn);
              var y,
                L,
                v,
                T,
                w,
                E,
                x,
                C,
                z,
                O = lt,
                B = [on, Qt, "l"],
                N = [cn, Xt, "t"],
                I = ["+=", "-=", "*=", "/="],
                R = _(t) == o.o,
                k = R ? t.complete : i,
                P = {},
                Y = {},
                W = "end",
                F = "begin",
                q = "center",
                H = "nearest",
                U = "always",
                G = "never",
                X = "ifneeded",
                j = c.l,
                V = [on, cn, "xy", "yx"],
                K = [F, W, q, H],
                J = [U, G, X],
                Z = e[c.hOP]("el"),
                ee = Z ? e.el : e,
                te = !!(ee instanceof f || h) && ee instanceof h,
                ne = !te && _i(ee),
                re = function () {
                  L && si(!0), v && si(!1);
                },
                ie = _(k) != o.f ? n : function () {
                  re(), k();
                };
              function ae(e, t) {
                for (y = 0; y < t[j]; y++) if (e === t[y]) return !0;
                return !1;
              }
              function se(e, t) {
                var n = e ? B : N;
                if (t = _(t) == o.s || _(t) == o.n ? [t, t] : t, u.isA(t)) return e ? t[0] : t[1];
                if (_(t) == o.o) for (y = 0; y < n[j]; y++) if (n[y] in t) return t[n[y]];
              }
              function oe(e, t) {
                var r,
                  i,
                  a,
                  s,
                  c = _(t) == o.s,
                  l = e ? Pt : Yt,
                  u = l._currentScroll,
                  h = l._maxScroll,
                  p = " * ",
                  f = $ && e,
                  m = f && S.n && !O,
                  M = "replace",
                  g = eval;
                if (c ? (t[j] > 2 && (s = t.substr(0, 2), A(s, I) > -1 && (r = s)), t = (t = r ? t.substr(2) : t)[M](/min/g, 0)[M](/</g, 0)[M](/max/g, (m ? "-" : tn) + sn)[M](/>/g, (m ? "-" : tn) + sn)[M](/px/g, tn)[M](/%/g, p + h * (f && S.n ? -1 : 1) / 100)[M](/vw/g, p + Wt.w)[M](/vh/g, p + Wt.h), i = gi(isNaN(t) ? gi(g(t), !0).toFixed() : t)) : i = t, i !== n && !isNaN(i) && _(i) == o.n) {
                  var b = O && f,
                    y = u * (b && S.n ? -1 : 1),
                    L = b && S.i,
                    v = b && S.n;
                  switch (y = L ? h - y : y, r) {
                    case "+=":
                      a = y + i;
                      break;
                    case "-=":
                      a = y - i;
                      break;
                    case "*=":
                      a = y * i;
                      break;
                    case "/=":
                      a = y / i;
                      break;
                    default:
                      a = i;
                  }
                  a = L ? h - a : a, a *= v ? -1 : 1, a = f && S.n ? d.min(0, d.max(h, a)) : d.max(0, d.min(h, a));
                }
                return a === u ? n : a;
              }
              function ce(e, t, n, r) {
                var i,
                  a,
                  s = [n, n],
                  c = _(e);
                if (c == t) e = [e, e];else if (c == o.a) {
                  if ((i = e[j]) > 2 || i < 1) e = s;else for (1 === i && (e[1] = n), y = 0; y < i; y++) if (a = e[y], _(a) != t || !ae(a, r)) {
                    e = s;
                    break;
                  }
                } else e = c == o.o ? [e[on] || n, e[cn] || n] : s;
                return {
                  x: e[0],
                  y: e[1]
                };
              }
              function le(e) {
                var t,
                  n,
                  r = [],
                  i = [Xt, jt, Vt, Qt];
                for (y = 0; y < e[j] && y !== i[j]; y++) t = e[y], (n = _(t)) == o.b ? r.push(t ? gi(z.css(Ht + i[y])) : 0) : r.push(n == o.n ? t : 0);
                return r;
              }
              if (te || ne) {
                var ue,
                  de = Z ? e.margin : 0,
                  he = Z ? e.axis : 0,
                  me = Z ? e.scroll : 0,
                  Me = Z ? e.block : 0,
                  _e = [0, 0, 0, 0],
                  Ae = _(de);
                if ((z = te ? ee : f(ee))[j] > 0) {
                  de = Ae == o.n || Ae == o.b ? le([de, de, de, de]) : Ae == o.a ? 2 === (ue = de[j]) ? le([de[0], de[1], de[0], de[1]]) : ue >= 4 ? le(de) : _e : Ae == o.o ? le([de[Xt], de[jt], de[Vt], de[Qt]]) : _e, w = ae(he, V) ? he : "xy", E = ce(me, o.s, U, J), x = ce(Me, o.s, F, K), C = de;
                  var ge = {
                      l: Pt._currentScroll,
                      t: Yt._currentScroll
                    },
                    be = pe.offset(),
                    ye = z.offset(),
                    Le = {
                      x: E.x == G || w == cn,
                      y: E.y == G || w == on
                    };
                  ye[Xt] -= C[0], ye[Qt] -= C[3];
                  var ve = {
                    x: d.round(ye[Qt] - be[Qt] + ge.l),
                    y: d.round(ye[Xt] - be[Xt] + ge.t)
                  };
                  if ($ && (S.n || S.i || (ve.x = d.round(be[Qt] - ye[Qt] + ge.l)), S.n && O && (ve.x *= -1), S.i && O && (ve.x = d.round(be[Qt] - ye[Qt] + (Pt._maxScroll - ge.l)))), x.x != F || x.y != F || E.x == X || E.y == X || $) {
                    var Te = z[0],
                      Se = D ? Te[c.bCR]() : {
                        width: Te[c.oW],
                        height: Te[c.oH]
                      },
                      we = {
                        w: Se[$t] + C[3] + C[1],
                        h: Se[Zt] + C[0] + C[2]
                      },
                      Ee = function (e) {
                        var t = ci(e),
                          n = t._w_h,
                          r = t._left_top,
                          i = t._x_y,
                          a = x[i] == (e && $ ? F : W),
                          s = x[i] == q,
                          o = x[i] == H,
                          c = E[i] == G,
                          l = E[i] == X,
                          u = Wt[n],
                          d = be[r],
                          h = we[n],
                          p = ye[r],
                          f = s ? 2 : 1,
                          m = p + h / 2,
                          M = d + u / 2,
                          _ = h <= u && p >= d && p + h <= d + u;
                        c ? Le[i] = !0 : Le[i] || ((o || l) && (Le[i] = !!l && _, a = h < u ? m > M : m < M), ve[i] -= a || s ? (u / f - h / f) * (e && $ && O ? -1 : 1) : 0);
                      };
                    Ee(!0), Ee(!1);
                  }
                  Le.y && delete ve.y, Le.x && delete ve.x, e = ve;
                }
              }
              P[fn] = oe(!0, se(!0, e)), P[mn] = oe(!1, se(!1, e)), L = P[fn] !== n, v = P[mn] !== n, (L || v) && (t > 0 || R) ? R ? (t.complete = ie, fe.animate(P, t)) : (T = {
                duration: t,
                complete: ie
              }, u.isA(r) || f.isPlainObject(r) ? (Y[fn] = r[0] || r.x, Y[mn] = r[1] || r.y, T.specialEasing = Y) : T.easing = r, fe.animate(P, T)) : (L && fe[fn](P[fn]), v && fe[mn](P[mn]), re());
            }, b.scrollStop = function (e, t, n) {
              return fe.stop(e, t, n), b;
            }, b.getElements = function (e) {
              var t = {
                target: xe,
                host: Ce,
                padding: Be,
                viewport: De,
                content: Ne,
                scrollbarHorizontal: {
                  scrollbar: be[0],
                  track: ye[0],
                  handle: Le[0]
                },
                scrollbarVertical: {
                  scrollbar: ve[0],
                  track: Te[0],
                  handle: Se[0]
                },
                scrollbarCorner: ge[0]
              };
              return _(e) == o.s ? Si(t, e) : t;
            }, b.getState = function (e) {
              function t(e) {
                if (!f.isPlainObject(e)) return e;
                var t = zi({}, e),
                  n = function (e, n) {
                    t[c.hOP](e) && (t[n] = t[e], delete t[e]);
                  };
                return n("w", $t), n("h", Zt), delete t.c, t;
              }
              var n = {
                destroyed: !!t(P),
                sleeping: !!t(Z),
                autoUpdate: t(!Lt),
                widthAuto: t(We),
                heightAuto: t(Fe),
                padding: t(He),
                overflowAmount: t($e),
                hideOverflow: t(Ye),
                hasOverflow: t(Pe),
                contentScrollSize: t(Re),
                viewportSize: t(Wt),
                hostSize: t(Ie),
                documentMixed: t(F)
              };
              return _(e) == o.s ? Si(n, e) : n;
            }, b.ext = function (e) {
              var t,
                n = br.split(" "),
                r = 0;
              if (_(e) == o.s) {
                if (gr[c.hOP](e)) for (t = zi({}, gr[e]); r < n.length; r++) delete t[n[r]];
              } else for (r in t = {}, gr) t[r] = zi({}, b.ext(r));
              return t;
            }, b.addExt = function (t, n) {
              var i,
                a,
                s,
                l,
                d = r.extension(t),
                h = !0;
              if (d) {
                if (gr[c.hOP](t)) return b.ext(t);
                if ((i = d.extensionFactory.call(b, zi({}, d.defaultOptions), f, u)) && (s = i.contract, _(s) == o.f && (l = s(e), h = _(l) == o.b ? l : h), h)) return gr[t] = i, a = i.added, _(a) == o.f && a(n), b.ext(t);
              } else console.warn('A extension with the name "' + t + "\" isn't registered.");
            }, b.removeExt = function (e) {
              var t,
                n = gr[e];
              return !!n && (delete gr[e], t = n.removed, _(t) == o.f && t(), !0);
            }, r.valid(Ri(i, a, s)) && m(i, b), b;
          }
          function Cr(e, t, n, r, i) {
            var a = u.isA(t) && u.isA(n),
              s = r ? "removeEventListener" : "addEventListener",
              o = r ? "off" : "on",
              l = !a && t.split(un),
              d = 0,
              h = f.isPlainObject(i),
              p = N && (h ? i._passive : i) || !1,
              m = h && (i._capture || !1),
              M = N ? {
                passive: p,
                capture: m
              } : m;
            if (a) for (; d < t[c.l]; d++) Cr(e, t[d], n[d], r, i);else for (; d < l[c.l]; d++) N ? e[0][s](l[d], n, M) : e[o](l[d], n);
          }
          function zr(e, t, n, r) {
            Cr(e, t, n, !1, r), xr.push(u.bind(Cr, 0, e, t, n, !0, r));
          }
          function Or(e, t) {
            if (e) {
              var r = u.rO(),
                i = "animationstart mozAnimationStart webkitAnimationStart MSAnimationStart",
                a = "childNodes",
                s = 3333333,
                l = function () {
                  e[mn](s)[fn]($ ? S.n ? -s : S.i ? 0 : s : s), t();
                };
              if (t) {
                if (I) ((P = e.addClass("observed").append(vi(Kn)).contents()[0])[Sn] = new r(l)).observe(P);else if (E > 9 || !w) {
                  e.prepend(vi(Kn, vi({
                    c: Jn,
                    dir: "ltr"
                  }, vi(Jn, vi($n)) + vi(Jn, vi({
                    c: $n,
                    style: "width: 200%; height: 200%"
                  })))));
                  var d,
                    h,
                    m,
                    M,
                    _ = e[0][a][0][a][0],
                    A = f(_[a][1]),
                    g = f(_[a][0]),
                    b = f(g[0][a][0]),
                    y = _[c.oW],
                    L = _[c.oH],
                    v = 2,
                    T = p.nativeScrollbarSize,
                    x = function () {
                      g[fn](s)[mn](s), A[fn](s)[mn](s);
                    },
                    C = function () {
                      h = 0, d && (y = m, L = M, l());
                    },
                    z = function (e) {
                      return m = _[c.oW], M = _[c.oH], d = m != y || M != L, e && d && !h ? (u.cAF()(h), h = u.rAF()(C)) : e || C(), x(), e && (u.prvD(e), u.stpP(e)), !1;
                    },
                    O = {},
                    B = {};
                  hi(B, tn, [-(T.y + 1) * v, T.x * -v, T.y * -v, -(T.x + 1) * v]), f(_).css(B), g.on(an, z), A.on(an, z), e.on(i, function () {
                    z(!1);
                  }), O[$t] = s, O[Zt] = s, b.css(O), x();
                } else {
                  var D = Ee.attachEvent,
                    N = E !== n;
                  if (D) e.prepend(vi(Kn)), Ii(e, ln + Kn)[0].attachEvent("onresize", l);else {
                    var R = Ee.createElement(o.o);
                    R.setAttribute(c.ti, "-1"), R.setAttribute(c.c, Kn), R.onload = function () {
                      var e = this.contentDocument.defaultView;
                      e.addEventListener("resize", l), e.document.documentElement.style.display = "none";
                    }, R.type = "text/html", N && e.prepend(R), R.data = "about:blank", N || e.prepend(R), e.on(i, l);
                  }
                }
                if (e[0] === Oe) {
                  var k = function () {
                    var e = ue.css("direction"),
                      t = {},
                      n = 0,
                      r = !1;
                    return e !== je && ("ltr" === e ? (t[Qt] = 0, t[jt] = nn, n = s) : (t[Qt] = nn, t[jt] = 0, n = S.n ? -s : S.i ? 0 : s), he.children().eq(0).css(t), he[fn](n)[mn](s), je = e, r = !0), r;
                  };
                  k(), zr(e, an, function (e) {
                    return k() && Kr(), u.prvD(e), u.stpP(e), !1;
                  });
                }
              } else if (I) {
                var P,
                  Y = (P = e.contents()[0])[Sn];
                Y && (Y.disconnect(), delete P[Sn]);
              } else Ni(e.children(ln + Kn).eq(0));
            }
          }
          function Br() {
            if (R) {
              var e,
                t,
                n,
                r,
                i,
                a,
                s,
                o,
                l,
                d,
                h = 11,
                p = u.mO(),
                f = u.now();
              yt = function (e) {
                var t = !1;
                return k && !Z && (g(e, function () {
                  return !(t = Ur(this));
                }), t && (o = u.now(), l = Fe || We, d = function () {
                  P || (f = o, Y && Qr(), l ? Kr() : b.update(nn));
                }, clearTimeout(s), h <= 0 || o - f > h || !l ? d() : s = setTimeout(d, h))), t;
              }, At = new p(bt = function (s) {
                var o,
                  l = !1,
                  u = !1,
                  d = [];
                return k && !Z && (g(s, function () {
                  e = (o = this).target, t = o.attributeName, n = t === c.c, r = o.oldValue, i = e.className, q && n && !u && r.indexOf(Cn) > -1 && i.indexOf(Cn) < 0 && (a = mi(!0), Ce.className = i.split(un).concat(r.split(un).filter(function (e) {
                    return e.match(a);
                  })).join(un), l = u = !0), l || (l = n ? Hr(r, i) : t !== c.s || r !== e[c.s].cssText), d.push(t);
                }), Vr(d), l && b.update(u || nn)), l;
              }), gt = new p(yt);
            }
          }
          function Dr() {
            R && !Lt && (At.observe(Ce, {
              attributes: !0,
              attributeOldValue: !0,
              attributeFilter: Er
            }), gt.observe(Y ? xe : Ne, {
              attributes: !0,
              attributeOldValue: !0,
              subtree: !Y,
              childList: !Y,
              characterData: !Y,
              attributeFilter: Y ? wr : Er
            }), Lt = !0);
          }
          function Nr() {
            R && Lt && (At.disconnect(), gt.disconnect(), Lt = !1);
          }
          function Ir() {
            if (!Z) {
              var e,
                t = {
                  w: Oe[c.sW],
                  h: Oe[c.sH]
                };
              e = xi(t, rt), rt = t, e && Kr({
                _hostSizeChanged: !0
              });
            }
          }
          function Rr() {
            zt && ii(!0);
          }
          function kr() {
            zt && !ce.hasClass(fr) && ii(!1);
          }
          function Pr() {
            Ct && (ii(!0), clearTimeout(St), St = setTimeout(function () {
              Ct && !P && ii(!1);
            }, 100));
          }
          function Yr(e) {
            return u.prvD(e), !1;
          }
          function Wr(e) {
            var t = f(e.target);
            Ei(function (e, n) {
              t.is(n) && Kr({
                _contentSizeChanged: !0
              });
            });
          }
          function Fr(e) {
            e || Fr(!0), Cr(ue, An.split(un)[0], Pr, !Ct || e, !0), Cr(ue, [gn, bn], [Rr, kr], !zt || e, !0), k || e || ue.one("mouseover", Rr);
          }
          function qr() {
            var e = {};
            return W && Me && (e.w = gi(Me.css(Kt + $t)), e.h = gi(Me.css(Kt + Zt)), e.c = xi(e, _t), e.f = !0), _t = e, !!e.c;
          }
          function Hr(e, t) {
            var n,
              r,
              i = typeof t == o.s ? t.split(un) : [],
              a = Ai(typeof e == o.s ? e.split(un) : [], i),
              s = A(mr, a);
            if (s > -1 && a.splice(s, 1), a[c.l] > 0) for (r = mi(!0, !0), n = 0; n < a.length; n++) if (!a[n].match(r)) return !0;
            return !1;
          }
          function Ur(e) {
            var t = e.attributeName,
              n = e.target,
              r = e.type,
              i = "closest";
            if (n === Ne) return null === t;
            if ("attributes" === r && (t === c.c || t === c.s) && !Y) {
              if (t === c.c && f(n).hasClass(xn)) return Hr(e.oldValue, n.className);
              if (typeof n[i] != o.f) return !0;
              if (null !== n[i](ln + Kn) || null !== n[i](ln + er) || null !== n[i](ln + or)) return !1;
            }
            return !0;
          }
          function Gr() {
            if (Z) return !1;
            var e,
              t,
              n,
              r,
              i = Li(),
              a = Y && We && !ht ? le.val().length : 0,
              s = !Lt && We && !Y,
              o = {};
            return s && (e = me.css(en), o[en] = $ ? jt : Qt, o[$t] = nn, me.css(o)), r = {
              w: i[c.sW] + a,
              h: i[c.sH] + a
            }, s && (o[en] = e, o[$t] = sn, me.css(o)), t = qr(), n = xi(r, nt), nt = r, n || t;
          }
          function Xr() {
            if (!Z && !Lt) {
              var e,
                t,
                r,
                i = [],
                a = [{
                  _elem: ue,
                  _attrs: Er.concat(":visible")
                }, {
                  _elem: Y ? le : n,
                  _attrs: wr
                }];
              return g(a, function (n, a) {
                (e = a._elem) && g(a._attrs, function (n, a) {
                  t = ":" === a.charAt(0) ? e.is(a) : e.attr(a), r = Sr[a], xi(t, r) && i.push(a), Sr[a] = t;
                });
              }), Vr(i), i[c.l] > 0;
            }
          }
          function jr(e) {
            if (!k) return !0;
            var t = "flex-grow",
              n = "flex-shrink",
              r = "flex-basis",
              i = [$t, Kt + $t, Jt + $t, Ht + Qt, Ht + jt, Qt, jt, "font-weight", "word-spacing", t, n, r],
              a = [Ut + Qt, Ut + jt, Gt + Qt + $t, Gt + jt + $t],
              s = [Zt, Kt + Zt, Jt + Zt, Ht + Xt, Ht + Vt, Xt, Vt, "line-height", t, n, r],
              o = [Ut + Xt, Ut + Vt, Gt + Xt + $t, Gt + Vt + $t],
              l = "s",
              u = "v-s",
              d = Je.x === l || Je.x === u,
              h = !1,
              p = function (e, t) {
                for (var n = 0; n < e[c.l]; n++) if (e[n] === t) return !0;
                return !1;
              };
            return (Je.y === l || Je.y === u) && ((h = p(s, e)) || H || (h = p(o, e))), d && !h && ((h = p(i, e)) || H || (h = p(a, e))), h;
          }
          function Vr(e) {
            g(e = e || Ar, function (e, t) {
              if (u.inA(t, Ar) > -1) {
                var n = le.attr(t);
                _(n) == o.s ? fe.attr(t, n) : fe.removeAttr(t);
              }
            });
          }
          function Qr() {
            if (!Z) {
              var e,
                t,
                n,
                r,
                i = !ht,
                a = Wt.w,
                s = Wt.h,
                o = {},
                l = We || i;
              return o[Kt + $t] = tn, o[Kt + Zt] = tn, o[$t] = nn, le.css(o), e = xe[c.oW], t = l ? d.max(e, xe[c.sW] - 1) : 1, o[$t] = We ? nn : sn, o[Kt + $t] = sn, o[Zt] = nn, le.css(o), n = xe[c.oH], r = d.max(n, xe[c.sH] - 1), o[$t] = t, o[Zt] = r, Ae.css(o), o[Kt + $t] = a, o[Kt + Zt] = s, le.css(o), {
                _originalWidth: e,
                _originalHeight: n,
                _dynamicWidth: t,
                _dynamicHeight: r
              };
            }
          }
          function Kr(e) {
            clearTimeout(ie), e = e || {}, yr._hostSizeChanged |= e._hostSizeChanged, yr._contentSizeChanged |= e._contentSizeChanged, yr._force |= e._force;
            var t,
              r = u.now(),
              i = !!yr._hostSizeChanged,
              a = !!yr._contentSizeChanged,
              s = !!yr._force,
              o = e._changedOptions,
              h = Lr > 0 && k && !P && !s && !o && r - re < Lr && !Fe && !We;
            if (h && (ie = setTimeout(Kr, Lr)), !(P || h || Z && !o || k && !s && (t = ue.is(":hidden")) || "inline" === ue.css("display"))) {
              re = r, yr = {}, !x || v.x && v.y ? O = zi({}, p.nativeScrollbarSize) : (O.x = 0, O.y = 0), Ft = {
                x: 3 * (O.x + (v.x ? 0 : 3)),
                y: 3 * (O.y + (v.y ? 0 : 3))
              }, o = o || {};
              var m = function () {
                  return xi.apply(this, [].slice.call(arguments).concat([s]));
                },
                _ = {
                  x: fe[fn](),
                  y: fe[mn]()
                },
                A = ne.scrollbars,
                g = ne.textarea,
                y = A.visibility,
                L = m(y, it),
                E = A.autoHide,
                C = m(E, at),
                B = A.clickScrolling,
                D = m(B, st),
                N = A.dragScrolling,
                I = m(N, ot),
                R = ne.className,
                F = m(R, ut),
                q = ne.resize,
                ee = m(q, ct) && !W,
                te = ne.paddingAbsolute,
                ae = m(te, Ve),
                se = ne.clipAlways,
                oe = m(se, Qe),
                ce = ne.sizeAutoCapable && !W,
                be = m(ce, tt),
                ye = ne.nativeScrollbarsOverlaid.showNativeScrollbars,
                Le = m(ye, Ze),
                ve = ne.autoUpdate,
                Te = m(ve, et),
                Se = ne.overflowBehavior,
                we = m(Se, Je, s),
                Ee = g.dynWidth,
                xe = m(Mt, Ee),
                Oe = g.dynHeight,
                je = m(mt, Oe);
              if (Et = "n" === E, xt = "s" === E, Ct = "m" === E, zt = "l" === E, wt = A.autoHideDelay, dt = ut, Dt = "n" === q, Nt = "b" === q, It = "h" === q, Rt = "v" === q, lt = ne.normalizeRTL, ye = ye && v.x && v.y, it = y, at = E, st = B, ot = N, ut = R, ct = q, Ve = te, Qe = se, tt = ce, Ze = ye, et = ve, Je = zi({}, Se), Mt = Ee, mt = Oe, Pe = Pe || {
                x: !1,
                y: !1
              }, F && (Bi(ue, dt + un + mr), Oi(ue, R !== n && null !== R && R.length > 0 ? R : mr)), Te && (!0 === ve || null === ve && w ? (Nr(), M.add(b)) : (M.remove(b), Dr())), be) if (ce) {
                if (_e ? _e.show() : (_e = f(vi(Vn)), pe.before(_e)), U) de.show();else {
                  de = f(vi(Qn)), ze = de[0], _e.before(de);
                  var nt = {
                    w: -1,
                    h: -1
                  };
                  Or(de, function () {
                    var e = {
                      w: ze[c.oW],
                      h: ze[c.oH]
                    };
                    xi(e, nt) && (k && Fe && e.h > 0 || We && e.w > 0 || k && !Fe && 0 === e.h || !We && 0 === e.w) && Kr(), nt = e;
                  }), U = !0, null !== z && de.css(Zt, z + "(100% + 1px)");
                }
              } else U && de.hide(), _e && _e.hide();
              s && (he.find("*").trigger(an), U && de.find("*").trigger(an)), t = t === n ? ue.is(":hidden") : t;
              var rt,
                At = !!Y && "off" !== le.attr("wrap"),
                gt = m(At, ht),
                bt = ue.css("direction"),
                yt = m(bt, Xe),
                Tt = ue.css("box-sizing"),
                St = m(Tt, qe),
                Ot = pi(Ut);
              try {
                rt = U ? ze[c.bCR]() : null;
              } catch (e) {
                return;
              }
              H = "border-box" === Tt;
              var Bt = ($ = "rtl" === bt) ? Qt : jt,
                Pt = $ ? jt : Qt,
                Yt = !1,
                qt = !(!U || "none" === ue.css(en)) && 0 === d.round(rt.right - rt.left) && (!!te || Ce[c.cW] - G > 0);
              if (ce && !qt) {
                var rn = Ce[c.oW],
                  on = _e.css($t);
                _e.css($t, nn);
                var cn = Ce[c.oW];
                _e.css($t, on), (Yt = rn !== cn) || (_e.css($t, rn + 1), cn = Ce[c.oW], _e.css($t, on), Yt = rn !== cn);
              }
              var ln = (qt || Yt) && ce && !t,
                dn = m(ln, We),
                hn = !ln && We,
                pn = !(!U || !ce || t) && 0 === d.round(rt.bottom - rt.top),
                Mn = m(pn, Fe),
                _n = !pn && Fe,
                An = pi(Gt, "-" + $t, !(ln && H || !H), !(pn && H || !H)),
                gn = pi(Ht),
                bn = {},
                yn = {},
                Ln = function () {
                  return {
                    w: Ce[c.cW],
                    h: Ce[c.cH]
                  };
                },
                vn = function () {
                  return {
                    w: Be[c.oW] + d.max(0, Ne[c.cW] - Ne[c.sW]),
                    h: Be[c.oH] + d.max(0, Ne[c.cH] - Ne[c.sH])
                  };
                },
                Tn = G = Ot.l + Ot.r,
                Sn = X = Ot.t + Ot.b;
              if (Tn *= te ? 1 : 0, Sn *= te ? 1 : 0, Ot.c = m(Ot, He), j = An.l + An.r, V = An.t + An.b, An.c = m(An, Ue), K = gn.l + gn.r, J = gn.t + gn.b, gn.c = m(gn, Ge), ht = At, Xe = bt, qe = Tt, We = ln, Fe = pn, He = Ot, Ue = An, Ge = gn, yt && U && de.css(en, Pt), Ot.c || yt || ae || dn || Mn || St || be) {
                var wn = {},
                  En = {},
                  xn = [Ot.t, Ot.r, Ot.b, Ot.l];
                hi(yn, Ht, [-Ot.t, -Ot.r, -Ot.b, -Ot.l]), te ? (hi(wn, tn, xn), hi(Y ? En : bn, Ut)) : (hi(wn, tn), hi(Y ? En : bn, Ut, xn)), pe.css(wn), le.css(En);
              }
              Wt = vn();
              var Cn = !!Y && Qr(),
                zn = Y && m(Cn, ft),
                On = Y && Cn ? {
                  w: Ee ? Cn._dynamicWidth : Cn._originalWidth,
                  h: Oe ? Cn._dynamicHeight : Cn._originalHeight
                } : {};
              if (ft = Cn, pn && (Mn || ae || St || Ot.c || An.c) ? bn[Zt] = nn : (Mn || ae) && (bn[Zt] = sn), ln && (dn || ae || St || Ot.c || An.c || yt) ? (bn[$t] = nn, yn[Jt + $t] = sn) : (dn || ae) && (bn[$t] = sn, bn[en] = tn, yn[Jt + $t] = tn), ln ? (yn[$t] = nn, bn[$t] = l._cssPropertyValue($t, "max-content intrinsic") || nn, bn[en] = Pt) : yn[$t] = tn, yn[Zt] = pn ? On.h || Ne[c.cH] : tn, ce && _e.css(yn), me.css(bn), bn = {}, yn = {}, i || a || zn || yt || St || ae || dn || ln || Mn || pn || Le || we || oe || ee || L || C || I || D || xe || je || gt) {
                var Bn = "overflow",
                  Dn = Bn + "-x",
                  Wn = Bn + "-y",
                  Fn = "hidden",
                  qn = "visible";
                if (!x) {
                  var Hn = {},
                    Gn = Pe.y && Ye.ys && !ye ? v.y ? fe.css(Bt) : -O.y : 0,
                    Xn = Pe.x && Ye.xs && !ye ? v.x ? fe.css(Vt) : -O.x : 0;
                  hi(Hn, tn), fe.css(Hn);
                }
                var Kn = Li(),
                  Jn = {
                    w: On.w || Kn[c.cW],
                    h: On.h || Kn[c.cH]
                  },
                  $n = {
                    w: Kn[c.sW],
                    h: Kn[c.sH]
                  };
                x || (Hn[Vt] = _n ? tn : Xn, Hn[Bt] = hn ? tn : Gn, fe.css(Hn)), Wt = vn();
                var Zn = Ln(),
                  er = {
                    w: Zn.w - K - j - (H ? 0 : G),
                    h: Zn.h - J - V - (H ? 0 : X)
                  },
                  tr = {
                    w: d.max((ln ? Jn.w : $n.w) + Tn, er.w),
                    h: d.max((pn ? Jn.h : $n.h) + Sn, er.h)
                  };
                if (tr.c = m(tr, Ke), Ke = tr, ce) {
                  (tr.c || pn || ln) && (yn[$t] = tr.w, yn[Zt] = tr.h, Y || (Jn = {
                    w: Kn[c.cW],
                    h: Kn[c.cH]
                  }));
                  var nr = {},
                    rr = function (e) {
                      var t = ci(e),
                        n = t._w_h,
                        r = t._width_height,
                        i = e ? ln : pn,
                        a = e ? j : V,
                        s = e ? G : X,
                        o = e ? K : J,
                        c = Wt[n] - a - o - (H ? 0 : s);
                      (!i || !i && An.c) && (yn[r] = er[n] - 1), !(i && Jn[n] < c) || e && Y && At || (Y && (nr[r] = gi(Ae.css(r)) - 1), yn[r] -= 1), Jn[n] > 0 && (yn[r] = d.max(1, yn[r]));
                    };
                  rr(!0), rr(!1), Y && Ae.css(nr), _e.css(yn);
                }
                ln && (bn[$t] = sn), !ln || H || Lt || (bn[en] = "none"), me.css(bn), bn = {};
                var ir = {
                  w: Kn[c.sW],
                  h: Kn[c.sH]
                };
                ir.c = a = m(ir, Re), Re = ir, Wt = vn(), i = m(Zn = Ln(), Ie), Ie = Zn;
                var ar = Y && (0 === Wt.w || 0 === Wt.h),
                  sr = $e,
                  or = {},
                  hr = {},
                  pr = {},
                  fr = {},
                  Mr = {},
                  _r = {},
                  Ar = {},
                  gr = Be[c.bCR](),
                  br = function (e) {
                    var t = ci(e),
                      n = ci(!e)._x_y,
                      r = t._x_y,
                      i = t._w_h,
                      a = t._width_height,
                      s = an + t._Left_Top + "Max",
                      o = gr[a] ? d.abs(gr[a] - Wt[i]) : 0,
                      c = sr && sr[r] > 0 && 0 === De[s];
                    or[r] = "v-s" === Se[r], hr[r] = "v-h" === Se[r], pr[r] = "s" === Se[r], fr[r] = d.max(0, d.round(100 * (ir[i] - Wt[i])) / 100), fr[r] *= ar || c && o > 0 && o < 1 ? 0 : 1, Mr[r] = fr[r] > 0, _r[r] = or[r] || hr[r] ? Mr[n] && !or[n] && !hr[n] : Mr[r], _r[r + "s"] = !!_r[r] && (pr[r] || or[r]), Ar[r] = Mr[r] && _r[r + "s"];
                  };
                if (br(!0), br(!1), fr.c = m(fr, $e), $e = fr, Mr.c = m(Mr, Pe), Pe = Mr, _r.c = m(_r, Ye), Ye = _r, v.x || v.y) {
                  var vr,
                    Tr = "px solid transparent",
                    Sr = {},
                    wr = {},
                    Er = s;
                  (Mr.x || Mr.y) && (wr.w = v.y && Mr.y ? ir.w + T.y : tn, wr.h = v.x && Mr.x ? ir.h + T.x : tn, Er = m(wr, ke), ke = wr), (Mr.c || _r.c || ir.c || yt || dn || Mn || ln || pn || Le) && (bn[Ht + Pt] = bn[Gt + Pt] = tn, vr = function (e) {
                    var t = ci(e),
                      n = ci(!e),
                      r = t._x_y,
                      i = e ? Vt : Bt,
                      a = e ? pn : ln;
                    v[r] && Mr[r] && _r[r + "s"] ? (bn[Ht + i] = a ? ye ? tn : T[r] : tn, bn[Gt + i] = e && a || ye ? tn : T[r] + Tr) : (wr[n._w_h] = bn[Ht + i] = bn[Gt + i] = tn, Er = !0);
                  }, x ? Di(fe, Un, !ye) : (vr(!0), vr(!1))), ye && (wr.w = wr.h = tn, Er = !0), Er && !x && (Sr[$t] = _r.y ? wr.w : tn, Sr[Zt] = _r.x ? wr.h : tn, Me || (Me = f(vi(jn)), fe.prepend(Me)), Me.css(Sr)), me.css(bn);
                }
                var xr,
                  Cr = {};
                if (wn = {}, (i || Mr.c || _r.c || ir.c || we || St || Le || yt || oe || Mn) && (Cr[Pt] = tn, (xr = function (e) {
                  var t = ci(e),
                    n = ci(!e),
                    r = t._x_y,
                    i = t._X_Y,
                    a = e ? Vt : Bt,
                    s = function () {
                      Cr[a] = tn, kt[n._w_h] = 0;
                    };
                  Mr[r] && _r[r + "s"] ? (Cr[Bn + i] = an, ye || x ? s() : (Cr[a] = -(v[r] ? T[r] : O[r]), kt[n._w_h] = v[r] ? T[n._x_y] : 0)) : (Cr[Bn + i] = tn, s());
                })(!0), xr(!1), !x && (Wt.h < Ft.x || Wt.w < Ft.y) && (Mr.x && _r.x && !v.x || Mr.y && _r.y && !v.y) ? (Cr[Ut + Xt] = Ft.x, Cr[Ht + Xt] = -Ft.x, Cr[Ut + Pt] = Ft.y, Cr[Ht + Pt] = -Ft.y) : Cr[Ut + Xt] = Cr[Ht + Xt] = Cr[Ut + Pt] = Cr[Ht + Pt] = tn, Cr[Ut + Bt] = Cr[Ht + Bt] = tn, Mr.x && _r.x || Mr.y && _r.y || ar ? Y && ar && (wn[Dn] = wn[Wn] = Fn) : (!se || hr.x || or.x || hr.y || or.y) && (Y && (wn[Dn] = wn[Wn] = tn), Cr[Dn] = Cr[Wn] = qn), pe.css(wn), fe.css(Cr), Cr = {}, (Mr.c || St || dn || Mn) && (!v.x || !v.y))) {
                  var zr = Ne[c.s];
                  zr.webkitTransform = "scale(1)", zr.display = "run-in", Ne[c.oH], zr.display = tn, zr.webkitTransform = tn;
                }
                if (bn = {}, yt || dn || Mn) if ($ && ln) {
                  var Br = me.css(en),
                    Ir = d.round(me.css(en, tn).css(Qt, tn).position().left);
                  me.css(en, Br), Ir !== d.round(me.position().left) && (bn[Qt] = Ir);
                } else bn[Qt] = tn;
                if (me.css(bn), Y && a) {
                  var Rr = bi();
                  if (Rr) {
                    var kr = pt === n || Rr._rows !== pt._rows,
                      Pr = Rr._cursorRow,
                      Yr = Rr._cursorColumn,
                      Wr = Rr._widestRow,
                      Hr = Rr._rows,
                      Ur = Rr._columns,
                      Gr = Rr._cursorPosition >= Rr._cursorMax && vt,
                      Xr = {
                        x: At || Yr !== Ur || Pr !== Wr ? -1 : $e.x,
                        y: (At ? Gr || kr && sr && _.y === sr.y : (Gr || kr) && Pr === Hr) ? $e.y : -1
                      };
                    _.x = Xr.x > -1 ? $ && lt && S.i ? 0 : Xr.x : _.x, _.y = Xr.y > -1 ? Xr.y : _.y;
                  }
                  pt = Rr;
                }
                $ && S.i && v.y && Mr.x && lt && (_.x += kt.w || 0), ln && ue[fn](0), pn && ue[mn](0), fe[fn](_.x)[mn](_.y);
                var jr = "v" === y,
                  Vr = "h" === y,
                  $r = "a" === y,
                  Zr = function (e, t) {
                    t = t === n ? e : t, ri(!0, e, Ar.x), ri(!1, t, Ar.y);
                  };
                Di(ue, kn, _r.x || _r.y), Di(ue, Pn, _r.x), Di(ue, Yn, _r.y), yt && !W && Di(ue, Nn, $), W && Oi(ue, In), ee && (Di(ue, In, Dt), Di(ge, cr, !Dt), Di(ge, lr, Nt), Di(ge, ur, It), Di(ge, dr, Rt)), (L || we || _r.c || Mr.c || Le) && (ye ? Le && (Bi(ue, Rn), ye && Zr(!1)) : $r ? Zr(Ar.x, Ar.y) : jr ? Zr(!0) : Vr && Zr(!1)), (C || Le) && (Fr(!zt && !Ct), ii(Et, !Et)), (i || fr.c || Mn || dn || ee || St || ae || Le || yt) && (ai(!0), si(!0), ai(!1), si(!1)), D && oi(!0, B), I && oi(!1, N), di("onDirectionChanged", {
                  isRTL: $,
                  dir: bt
                }, yt), di("onHostSizeChanged", {
                  width: Ie.w,
                  height: Ie.h
                }, i), di("onContentSizeChanged", {
                  width: Re.w,
                  height: Re.h
                }, a), di("onOverflowChanged", {
                  x: Mr.x,
                  y: Mr.y,
                  xScrollable: _r.xs,
                  yScrollable: _r.ys,
                  clipped: _r.x || _r.y
                }, Mr.c || _r.c), di("onOverflowAmountChanged", {
                  x: fr.x,
                  y: fr.y
                }, fr.c);
              }
              W && _t && (Pe.c || _t.c) && (_t.f || qr(), v.y && Pe.x && me.css(Kt + $t, _t.w + T.y), v.x && Pe.y && me.css(Kt + Zt, _t.h + T.x), _t.c = !1), k && o.updateOnLoad && Jr(), di("onUpdated", {
                forced: s
              });
            }
          }
          function Jr() {
            Y || Ei(function (e, t) {
              me.find(t).each(function (e, t) {
                u.inA(t, Tr) < 0 && (Tr.push(t), f(t).off(vr, Wr).on(vr, Wr));
              });
            });
          }
          function $r(e) {
            var t = C._validate(e, C._template, !0, te);
            return te = zi({}, te, t._default), ne = zi({}, ne, t._prepared), t._prepared;
          }
          function Zr(e) {
            var t = "parent",
              r = "os-resize-observer-host",
              i = Wn + un + Zn,
              a = Y ? un + Zn : tn,
              s = ne.textarea.inheritedAttrs,
              l = {},
              d = function () {
                var t = e ? le : ue;
                g(l, function (e, n) {
                  _(n) == o.s && (e == c.c ? t.addClass(n) : t.attr(e, n));
                });
              },
              h = [xn, Cn, zn, In, Nn, On, Bn, Dn, Rn, kn, Pn, Yn, mr, Wn, Zn, ut].join(un),
              p = {};
            ue = ue || (Y ? q ? le[t]()[t]()[t]()[t]() : f(vi(zn)) : le), me = me || Ti(Xn + a), fe = fe || Ti(Hn + a), pe = pe || Ti(qn + a), he = he || Ti(r), Ae = Ae || (Y ? Ti(Fn) : n), q && Oi(ue, Cn), e && Bi(ue, h), s = _(s) == o.s ? s.split(un) : s, u.isA(s) && Y && g(s, function (t, n) {
              _(n) == o.s && (l[n] = e ? ue.attr(n) : le.attr(n));
            }), e ? (q && k ? (he.children().remove(), g([pe, fe, me, Ae], function (e, t) {
              t && Bi(t.removeAttr(c.s), Mr);
            }), Oi(ue, Y ? zn : xn)) : (Ni(he), me.contents().unwrap().unwrap().unwrap(), Y && (le.unwrap(), Ni(ue), Ni(Ae), d())), Y && le.removeAttr(c.s), W && Bi(oe, En)) : (Y && (ne.sizeAutoCapable || (p[$t] = le.css($t), p[Zt] = le.css(Zt)), q || le.addClass(Zn).wrap(ue), ue = le[t]().css(p)), q || (Oi(le, Y ? i : xn), ue.wrapInner(me).wrapInner(fe).wrapInner(pe).prepend(he), me = Ii(ue, ln + Xn), fe = Ii(ue, ln + Hn), pe = Ii(ue, ln + qn), Y && (me.prepend(Ae), d())), x && Oi(fe, Un), v.x && v.y && Oi(fe, Gn), W && Oi(oe, En), Oe = he[0], Ce = ue[0], Be = pe[0], De = fe[0], Ne = me[0], Vr());
          }
          function ei() {
            var e,
              t,
              r = [112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 123, 33, 34, 37, 38, 39, 40, 16, 17, 18, 19, 20, 144],
              i = [],
              a = 175,
              s = "focus";
            function o(t) {
              Qr(), b.update(nn), t && w && clearInterval(e);
            }
            function l(e) {
              return le[fn](S.i && lt ? 9999999 : 0), le[mn](0), u.prvD(e), u.stpP(e), !1;
            }
            function d(e) {
              setTimeout(function () {
                P || o();
              }, 50);
            }
            function h() {
              vt = !0, Oi(ue, s);
            }
            function p() {
              vt = !1, i = [], Bi(ue, s), o(!0);
            }
            function f(t) {
              var n = t.keyCode;
              A(n, r) < 0 && (i[c.l] || (o(), e = setInterval(o, 1e3 / 60)), A(n, i) < 0 && i.push(n));
            }
            function m(e) {
              var t = e.keyCode,
                n = A(t, i);
              A(t, r) < 0 && (n > -1 && i.splice(n, 1), i[c.l] || o(!0));
            }
            function M(e) {
              !0 !== et && jr((e = e.originalEvent || e).propertyName) && b.update(nn);
            }
            function _(e) {
              Z || (t !== n ? clearTimeout(t) : ((xt || Ct) && ii(!0), yi() || Oi(ue, Rn), di("onScrollStart", e)), Bt || (si(!0), si(!1)), di("onScroll", e), t = setTimeout(function () {
                P || (clearTimeout(t), t = n, (xt || Ct) && ii(!1), yi() || Bi(ue, Rn), di("onScrollStop", e));
              }, a));
            }
            Y ? (E > 9 || !w ? zr(le, "input", o) : zr(le, [yn, Ln], [f, m]), zr(le, [an, "drop", s, s + "out"], [l, d, h, p])) : zr(me, Tn, M), zr(fe, an, _, !0);
          }
          function ti(e) {
            var t,
              n,
              r = function (t) {
                var n = Ti(er + un + (t ? hr : pr), !0),
                  r = Ti(tr, n),
                  i = Ti(rr, n);
                return q || e || (n.append(r), r.append(i)), {
                  _scrollbar: n,
                  _track: r,
                  _handle: i
                };
              };
            function i(e) {
              var t = ci(e),
                n = t._scrollbar,
                i = t._track,
                a = t._handle;
              q && k ? g([n, i, a], function (e, t) {
                Bi(t.removeAttr(c.s), Mr);
              }) : Ni(n || r(e)._scrollbar);
            }
            e ? (i(!0), i()) : (t = r(!0), n = r(), be = t._scrollbar, ye = t._track, Le = t._handle, ve = n._scrollbar, Te = n._track, Se = n._handle, q || (pe.after(ve), pe.after(be)));
          }
          function ni(e) {
            var t,
              r,
              i,
              a,
              s = ci(e),
              o = s._info,
              l = we.top !== we,
              h = s._x_y,
              p = s._X_Y,
              f = an + s._Left_Top,
              m = "active",
              M = "snapHandle",
              _ = "click",
              g = 1,
              y = [16, 17];
            function L(e) {
              return E && l ? e["screen" + p] : u.page(e)[h];
            }
            function v(e) {
              return ne.scrollbars[e];
            }
            function T() {
              g = .5;
            }
            function w() {
              g = 1;
            }
            function x(e) {
              u.stpP(e);
            }
            function C(e) {
              A(e.keyCode, y) > -1 && T();
            }
            function z(e) {
              A(e.keyCode, y) > -1 && w();
            }
            function O(e) {
              var t = (e.originalEvent || e).touches !== n;
              return !(Z || P || yi() || !ot || t && !v("touchSupport")) && (1 === u.mBtn(e) || t);
            }
            function D(t) {
              if (O(t)) {
                var n = o._trackLength,
                  s = o._handleLength,
                  c = o._maxScroll * ((L(t) - i) * a / (n - s));
                c = isFinite(c) ? c : 0, $ && e && !S.i && (c *= -1), fe[f](d.round(r + c)), Bt && si(e, r + c), N || u.prvD(t);
              } else I(t);
            }
            function I(o) {
              if (o = o || o.originalEvent, Cr(se, [An, _n, yn, Ln, vn], [D, I, C, z, Yr], !0), u.rAF()(function () {
                Cr(se, _, x, !0, {
                  _capture: !0
                });
              }), Bt && si(e, !0), Bt = !1, Bi(ce, fr), Bi(s._handle, m), Bi(s._track, m), Bi(s._scrollbar, m), r = n, i = n, a = 1, w(), t !== n && (b.scrollStop(), clearTimeout(t), t = n), o) {
                var l = Ce[c.bCR]();
                o.clientX >= l.left && o.clientX <= l.right && o.clientY >= l.top && o.clientY <= l.bottom || kr(), (xt || Ct) && ii(!1);
              }
            }
            function R(e) {
              O(e) && k(e);
            }
            function k(t) {
              r = fe[f](), r = isNaN(r) ? 0 : r, ($ && e && !S.n || !$) && (r = r < 0 ? 0 : r), a = Mi()[h], i = L(t), Bt = !v(M), Oi(ce, fr), Oi(s._handle, m), Oi(s._scrollbar, m), Cr(se, [An, _n, vn], [D, I, Yr]), u.rAF()(function () {
                Cr(se, _, x, !1, {
                  _capture: !0
                });
              }), !E && F || u.prvD(t), u.stpP(t);
            }
            function Y(r) {
              if (O(r)) {
                var c,
                  l = s._info._handleLength / Math.round(d.min(1, Wt[s._w_h] / Re[s._w_h]) * s._info._trackLength),
                  p = d.round(Wt[s._w_h] * l),
                  _ = 270 * l,
                  A = 400 * l,
                  y = s._track.offset()[s._left_top],
                  L = r.ctrlKey,
                  w = r.shiftKey,
                  E = w && L,
                  x = !0,
                  B = "linear",
                  D = function (t) {
                    Bt && si(e, t);
                  },
                  N = function () {
                    D(), k(r);
                  },
                  R = function () {
                    if (!P) {
                      var r = (i - y) * a,
                        s = o._handleOffset,
                        l = o._trackLength,
                        u = o._handleLength,
                        m = o._maxScroll,
                        M = o._currentScroll,
                        L = _ * g,
                        v = x ? d.max(A, L) : L,
                        T = m * ((r - u / 2) / (l - u)),
                        C = $ && e && (!S.i && !S.n || lt),
                        z = C ? s < r : s > r,
                        O = {},
                        I = {
                          easing: B,
                          step: function (t) {
                            Bt && (fe[f](t), si(e, t));
                          }
                        };
                      T = isFinite(T) ? T : 0, T = $ && e && !S.i ? m - T : T, w ? (fe[f](T), E ? (T = fe[f](), fe[f](M), T = C && S.i ? m - T : T, T = C && S.n ? -T : T, O[h] = T, b.scroll(O, zi(I, {
                        duration: 130,
                        complete: N
                      }))) : N()) : (c = x ? z : c, (C ? c ? s + u >= r : s <= r : c ? s <= r : s + u >= r) ? (clearTimeout(t), b.scrollStop(), t = n, D(!0)) : (t = setTimeout(R, v), O[h] = (c ? "-=" : "+=") + p, b.scroll(O, zi(I, {
                        duration: L
                      }))), x = !1);
                    }
                  };
                L && T(), a = Mi()[h], i = u.page(r)[h], Bt = !v(M), Oi(ce, fr), Oi(s._track, m), Oi(s._scrollbar, m), Cr(se, [_n, yn, Ln, vn], [I, C, z, Yr]), R(), u.prvD(r), u.stpP(r);
              }
            }
            function W(e) {
              Ot = !0, (xt || Ct) && ii(!0);
            }
            function q(e) {
              Ot = !1, (xt || Ct) && ii(!1);
            }
            function H(e) {
              u.stpP(e);
            }
            zr(s._handle, Mn, R), zr(s._track, [Mn, gn, bn], [Y, W, q]), zr(s._scrollbar, Mn, H), B && zr(s._scrollbar, Tn, function (t) {
              t.target === s._scrollbar[0] && (ai(e), si(e));
            });
          }
          function ri(e, t, n) {
            var r = e ? be : ve;
            Di(ue, e ? On : Bn, !t), Di(r, ar, !n);
          }
          function ii(e, t) {
            if (clearTimeout(Tt), e) Bi(be, sr), Bi(ve, sr);else {
              var n,
                r = "active",
                i = function () {
                  Ot || P || (!(n = Le.hasClass(r) || Se.hasClass(r)) && (xt || Ct || zt) && Oi(be, sr), !n && (xt || Ct || zt) && Oi(ve, sr));
                };
              wt > 0 && !0 !== t ? Tt = setTimeout(i, wt) : i();
            }
          }
          function ai(e) {
            var t = {},
              n = ci(e),
              r = n._info,
              i = 1e6,
              a = d.min(1, Wt[n._w_h] / Re[n._w_h]);
            t[n._width_height] = d.floor(100 * a * i) / i + "%", yi() || n._handle.css(t), r._handleLength = n._handle[0]["offset" + n._Width_Height], r._handleLengthRatio = a;
          }
          function si(e, t) {
            var r,
              i,
              a = _(t) == o.b,
              s = 250,
              c = $ && e,
              u = ci(e),
              h = u._info,
              p = "translate(",
              f = l._cssProperty("transform"),
              m = l._cssProperty("transition"),
              M = e ? fe[fn]() : fe[mn](),
              A = t === n || a ? M : t,
              g = h._handleLength,
              b = u._track[0]["offset" + u._Width_Height],
              y = b - g,
              L = {},
              v = (De[an + u._Width_Height] - De["client" + u._Width_Height]) * (S.n && c ? -1 : 1),
              T = function (e) {
                return isNaN(e / v) ? 0 : d.max(0, d.min(1, e / v));
              },
              w = function (e) {
                var t = y * e;
                return t = isNaN(t) ? 0 : t, t = c && !S.i ? b - g - t : t, t = d.max(0, t);
              },
              E = T(M),
              x = w(T(A)),
              C = w(E);
            h._maxScroll = v, h._currentScroll = M, h._currentScrollRatio = E, D ? (r = c ? -(b - g - x) : x, i = e ? p + r + "px, 0)" : p + "0, " + r + "px)", L[f] = i, B && (L[m] = a && d.abs(x - h._handleOffset) > 1 ? fi(u._handle) + ", " + (f + un + s) + "ms" : tn)) : L[u._left_top] = x, yi() || (u._handle.css(L), D && B && a && u._handle.one(Tn, function () {
              P || u._handle.css(m, tn);
            })), h._handleOffset = x, h._snappedHandleOffset = C, h._trackLength = b;
          }
          function oi(e, t) {
            var n = t ? "removeClass" : "addClass",
              r = e ? Te : Se,
              i = e ? nr : ir;
            (e ? ye : Le)[n](i), r[n](i);
          }
          function ci(e) {
            return {
              _width_height: e ? $t : Zt,
              _Width_Height: e ? "Width" : "Height",
              _left_top: e ? Qt : Xt,
              _Left_Top: e ? "Left" : "Top",
              _x_y: e ? on : cn,
              _X_Y: e ? "X" : "Y",
              _w_h: e ? "w" : "h",
              _l_t: e ? "l" : "t",
              _track: e ? ye : Te,
              _handle: e ? Le : Se,
              _scrollbar: e ? be : ve,
              _info: e ? Pt : Yt
            };
          }
          function li(e) {
            ge = ge || Ti(or, !0), e ? q && k ? Bi(ge.removeAttr(c.s), Mr) : Ni(ge) : q || ue.append(ge);
          }
          function ui() {
            var e,
              t = we.top !== we,
              r = {},
              i = {},
              a = {};
            function s(e) {
              if (l(e)) {
                var t = d(e),
                  n = {};
                (It || Nt) && (n[$t] = i.w + (t.x - r.x) * a.x), (Rt || Nt) && (n[Zt] = i.h + (t.y - r.y) * a.y), ue.css(n), u.stpP(e);
              } else o(e);
            }
            function o(t) {
              var r = t !== n;
              Cr(se, [vn, An, _n], [Yr, s, o], !0), Bi(ce, fr), ge.releaseCapture && ge.releaseCapture(), r && (e && Dr(), b.update(nn)), e = !1;
            }
            function l(e) {
              var t = (e.originalEvent || e).touches !== n;
              return !Z && !P && (1 === u.mBtn(e) || t);
            }
            function d(e) {
              return E && t ? {
                x: e.screenX,
                y: e.screenY
              } : u.page(e);
            }
            zr(ge, Mn, function (t) {
              l(t) && !Dt && (Lt && (e = !0, Nr()), r = d(t), i.w = Ce[c.oW] - (H ? 0 : G), i.h = Ce[c.oH] - (H ? 0 : X), a = Mi(), Cr(se, [vn, An, _n], [Yr, s, o]), Oi(ce, fr), ge.setCapture && ge.setCapture(), u.prvD(t), u.stpP(t));
            });
          }
          function di(e, t, n) {
            if (!1 !== n) if (k) {
              var r,
                i = ne.callbacks[e],
                a = e;
              "on" === a.substr(0, 2) && (a = a.substr(2, 1).toLowerCase() + a.substr(3)), _(i) == o.f && i.call(b, t), g(gr, function () {
                _((r = this).on) == o.f && r.on(a, t);
              });
            } else P || _r.push({
              n: e,
              a: t
            });
          }
          function hi(e, t, n) {
            n = n || [tn, tn, tn, tn], e[(t = t || tn) + Xt] = n[0], e[t + jt] = n[1], e[t + Vt] = n[2], e[t + Qt] = n[3];
          }
          function pi(e, t, n, r) {
            return t = t || tn, e = e || tn, {
              t: r ? 0 : gi(ue.css(e + Xt + t)),
              r: n ? 0 : gi(ue.css(e + jt + t)),
              b: r ? 0 : gi(ue.css(e + Vt + t)),
              l: n ? 0 : gi(ue.css(e + Qt + t))
            };
          }
          function fi(e) {
            var t = l._cssProperty("transition"),
              n = e.css(t);
            if (n) return n;
            for (var r, i, a, s = "\\s*(([^,(]+(\\(.+?\\))?)+)[\\s,]*", regExp = new RegExp(s), u = new RegExp("^(" + s + ")+$"), d = "property duration timing-function delay".split(" "), h = [], p = 0, f = function (e) {
                if (r = [], !e.match(u)) return e;
                for (; e.match(regExp);) r.push(RegExp.$1), e = e.replace(regExp, tn);
                return r;
              }; p < d[c.l]; p++) for (i = f(e.css(t + "-" + d[p])), a = 0; a < i[c.l]; a++) h[a] = (h[a] ? h[a] + un : tn) + i[a];
            return h.join(", ");
          }
          function mi(e, t) {
            var n,
              r,
              i,
              a = function (e, t) {
                if (i = "", t && typeof e == o.s) for (r = e.split(un), n = 0; n < r[c.l]; n++) i += "|" + r[n] + "$";
                return i;
              };
            return new RegExp("(^" + xn + "([-_].+|)$)" + a(ut, e) + a(dt, t), "g");
          }
          function Mi() {
            var e = Be[c.bCR]();
            return {
              x: D && 1 / (d.round(e.width) / Be[c.oW]) || 1,
              y: D && 1 / (d.round(e.height) / Be[c.oH]) || 1
            };
          }
          function _i(t) {
            var n = "ownerDocument",
              r = "HTMLElement",
              i = t && t[n] && t[n].parentWindow || e;
            return typeof i[r] == o.o ? t instanceof i[r] : t && typeof t == o.o && null !== t && 1 === t.nodeType && typeof t.nodeName == o.s;
          }
          function Ai(e, t) {
            var n,
              r,
              i = [],
              a = [];
            for (n = 0; n < e.length; n++) i[e[n]] = !0;
            for (n = 0; n < t.length; n++) i[t[n]] ? delete i[t[n]] : i[t[n]] = !0;
            for (r in i) a.push(r);
            return a;
          }
          function gi(e, t) {
            var n = t ? parseFloat(e) : parseInt(e, 10);
            return isNaN(n) ? 0 : n;
          }
          function bi() {
            var e = xe.selectionStart;
            if (e !== n) {
              var t,
                r,
                i = le.val(),
                a = i[c.l],
                s = i.split("\n"),
                o = s[c.l],
                l = i.substr(0, e).split("\n"),
                u = 0,
                d = 0,
                h = l[c.l],
                p = l[l[c.l] - 1][c.l];
              for (r = 0; r < s[c.l]; r++) (t = s[r][c.l]) > d && (u = r + 1, d = t);
              return {
                _cursorRow: h,
                _cursorColumn: p,
                _rows: o,
                _columns: d,
                _widestRow: u,
                _cursorPosition: e,
                _cursorMax: a
              };
            }
          }
          function yi() {
            return Ze && v.x && v.y;
          }
          function Li() {
            return Y ? Ae[0] : Ne;
          }
          function vi(e, t) {
            return "<div " + (e ? _(e) == o.s ? 'class="' + e + '"' : function () {
              var t,
                n = tn;
              if (f.isPlainObject(e)) for (t in e) n += ("c" === t ? "class" : t) + '="' + e[t] + '" ';
              return n;
            }() : tn) + ">" + (t || tn) + "</div>";
          }
          function Ti(e, t) {
            var n = _(t) == o.b,
              r = n ? ue : t || ue;
            return q && !r[c.l] ? null : q ? r[n ? "children" : "find"](ln + e.replace(/\s/g, ln)).eq(0) : f(vi(e));
          }
          function Si(e, t) {
            for (var n, r = t.split(ln), i = 0; i < r.length; i++) {
              if (!e[c.hOP](r[i])) return;
              n = e[r[i]], i < r.length && _(n) == o.o && (e = n);
            }
            return n;
          }
          function wi(e, t, n) {
            for (var r = t.split(ln), i = r.length, a = 0, s = {}, o = s; a < i; a++) s = s[r[a]] = a + 1 < i ? {} : n;
            f.extend(e, o, !0);
          }
          function Ei(e) {
            var t = ne.updateOnLoad;
            t = _(t) == o.s ? t.split(un) : t, u.isA(t) && !P && g(t, e);
          }
          function xi(e, t, n) {
            if (n) return n;
            if (_(e) != o.o || _(t) != o.o) return e !== t;
            for (var r in e) if ("c" !== r) {
              if (!e[c.hOP](r) || !t[c.hOP](r)) return !0;
              if (xi(e[r], t[r])) return !0;
            }
            return !1;
          }
          function zi() {
            return f.extend.apply(this, [!0].concat([].slice.call(arguments)));
          }
          function Oi(e, t) {
            return y.addClass.call(e, t);
          }
          function Bi(e, t) {
            return y.removeClass.call(e, t);
          }
          function Di(e, t, n) {
            return n ? Oi(e, t) : Bi(e, t);
          }
          function Ni(e) {
            return y.remove.call(e);
          }
          function Ii(e, t) {
            return y.find.call(e, t).eq(0);
          }
          function Ri(e, n, r) {
            var i, a;
            return ee = p.defaultOptions, x = p.nativeScrollbarStyling, O = zi({}, p.nativeScrollbarSize), v = zi({}, p.nativeScrollbarIsOverlaid), T = zi({}, p.overlayScrollbarDummySize), S = zi({}, p.rtlScrollBehavior), $r(zi({}, ee, n)), z = p.cssCalc, E = p.msie, w = p.autoUpdateRecommended, B = p.supportTransition, D = p.supportTransform, N = p.supportPassiveEvents, I = p.supportResizeObserver, R = p.supportMutationObserver, p.restrictedMeasuring, se = f(e.ownerDocument), Ee = se[0], ae = f(Ee.defaultView || Ee.parentWindow), we = ae[0], oe = Ii(se, "html"), ce = Ii(oe, "body"), le = f(e), xe = le[0], Y = le.is("textarea"), W = le.is("body"), F = Ee !== t, q = Y ? le.hasClass(Wn) && le.parent().hasClass(Xn) : le.hasClass(xn) && le.children(ln + qn)[c.l], v.x && v.y && !ne.nativeScrollbarsOverlaid.initialize ? (di("onInitializationWithdrawn"), q && (Zr(!0), ti(!0), li(!0)), P = !0, Z = !0, b) : (W && ((i = {}).l = d.max(le[fn](), oe[fn](), ae[fn]()), i.t = d.max(le[mn](), oe[mn](), ae[mn]()), a = function () {
              fe.removeAttr(c.ti), Cr(fe, Mn, a, !0, !0);
            }), Zr(), ti(), li(), ei(), ni(!0), ni(!1), ui(), Br(), Or(he, Ir), W && (fe[fn](i.l)[mn](i.t), t.activeElement == e && De.focus && (fe.attr(c.ti, "-1"), De.focus(), Cr(fe, Mn, a, !1, !0))), b.update(nn), k = !0, di("onInitialized"), g(_r, function (e, t) {
              di(t.n, t.a);
            }), _r = [], _(r) == o.s && (r = [r]), u.isA(r) ? g(r, function (e, t) {
              b.addExt(t);
            }) : f.isPlainObject(r) && g(r, function (e, t) {
              b.addExt(e, t);
            }), setTimeout(function () {
              B && !P && Oi(ue, Dn);
            }, 333), b);
          }
        }
        return r = e[s] = function (e, t, s) {
          if (0 === arguments[c.l]) return this;
          var l,
            d,
            h = [],
            p = f.isPlainObject(t);
          return e ? (e = e[c.l] != n ? e : [e[0] || e], z(), e[c.l] > 0 && (p ? f.each(e, function (e, r) {
            (l = r) !== n && h.push(D(l, t, s, i, a));
          }) : f.each(e, function (e, i) {
            l = m(i), ("!" === t && r.valid(l) || u.type(t) == o.f && t(i, l) || t === n) && h.push(l);
          }), d = 1 === h[c.l] ? h[0] : h), d) : p || !t ? d : h;
        }, r.globals = function () {
          z();
          var e = f.extend(!0, {}, i);
          return delete e.msie, e;
        }, r.defaultOptions = function (e) {
          z();
          var t = i.defaultOptions;
          if (e === n) return f.extend(!0, {}, t);
          i.defaultOptions = f.extend(!0, {}, t, C._validate(e, C._template, !0, t)._default);
        }, r.valid = function (e) {
          return e instanceof r && !e.getState().destroyed;
        }, r.extension = function (e, t, n) {
          var r = u.type(e) == o.s,
            i = arguments[c.l],
            a = 0;
          if (i < 1 || !r) return f.extend(!0, {
            length: x[c.l]
          }, x);
          if (r) if (u.type(t) == o.f) x.push({
            name: e,
            extensionFactory: t,
            defaultOptions: n
          });else for (; a < x[c.l]; a++) if (x[a].name === e) {
            if (!(i > 1)) return f.extend(!0, {}, x[a]);
            x.splice(a, 1);
          }
        }, r;
      }();
    return h && h.fn && (h.fn.overlayScrollbars = function (e, t) {
      var n = this;
      return h.isPlainObject(e) ? (h.each(n, function () {
        M(this, e, t);
      }), n) : M(n, e);
    }), M;
  }(i, i.document, void 0);
}.call(exports, require, exports, module), void 0 === r || (module.exports = r);
