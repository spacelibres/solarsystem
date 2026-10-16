/** @eyes-analysis
 * 文件职责：使用 History API 或 hash 匹配路由，管理导航钩子及链接监听
 * 依据：// Recovered from vendors.js:1873634-1881684.；literal: function
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1873634-1881684.
module.exports = function () {
  "use strict";

  var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  };
  function t() {
    return !("undefined" == typeof window || !window.history || !window.history.pushState);
  }
  function n(e, useHash, r) {
    this.root = null, this._routes = [], this._useHash = useHash, this._hash = void 0 === r ? "#" : r, this._paused = !1, this._destroyed = !1, this._lastRouteResolved = null, this._notFoundHandler = null, this._defaultHandler = null, this._usePushState = !useHash && t(), this._onLocationChange = this._onLocationChange.bind(this), this._genericHooks = null, this._historyAPIUpdateMethod = "pushState", e ? this.root = useHash ? e.replace(/\/$/, "/" + this._hash) : e.replace(/\/$/, "") : useHash && (this.root = this._cLoc().split(this._hash)[0].replace(/\/$/, "/" + this._hash)), this._listen(), this.updatePageLinks();
  }
  function r(e) {
    return e instanceof RegExp ? e : e.replace(/\/+$/, "").replace(/^\/+/, "^/");
  }
  function i(e) {
    return e.replace(/\/$/, "").split("/").length;
  }
  function a(e, t) {
    return i(t) - i(e);
  }
  function s(e, t) {
    return function (e) {
      return (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []).map(function (t) {
        var i = function (e) {
            var t = [];
            return {
              regexp: e instanceof RegExp ? e : new RegExp(e.replace(n.PARAMETER_REGEXP, function (e, r, i) {
                return t.push(i), n.REPLACE_VARIABLE_REGEXP;
              }).replace(n.WILDCARD_REGEXP, n.REPLACE_WILDCARD) + n.FOLLOWED_BY_SLASH_REGEXP, n.MATCH_REGEXP_FLAGS),
              paramNames: t
            };
          }(r(t.route)),
          a = i.regexp,
          s = i.paramNames,
          o = e.replace(/^\/+/, "/").match(a),
          c = function (e, t) {
            return 0 === t.length ? null : e ? e.slice(1, e.length).reduce(function (e, n, r) {
              return null === e && (e = {}), e[t[r]] = decodeURIComponent(n), e;
            }, null) : null;
          }(o, s);
        return !!o && {
          match: o,
          route: t,
          params: c
        };
      }).filter(function (e) {
        return e;
      });
    }(e, t)[0] || !1;
  }
  function o(e, t) {
    var n = t.map(function (t) {
        return "" === t.route || "*" === t.route ? e : e.split(new RegExp(t.route + "($|/)"))[0];
      }),
      i = r(e);
    return n.length > 1 ? n.reduce(function (e, t) {
      return e.length > t.length && (e = t), e;
    }, n[0]) : 1 === n.length ? n[0] : i;
  }
  function c(e, n, r) {
    var i,
      a = function (e) {
        return e.split(/\?(.*)?$/)[0];
      };
    return void 0 === r && (r = "#"), t() && !n ? a(e).split(r)[0] : (i = e.split(r)).length > 1 ? a(i[1]) : a(i[0]);
  }
  function l(t, n, r) {
    if (n && "object" === (void 0 === n ? "undefined" : e(n))) {
      if (n.before) return void n.before(function () {
        (!(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]) && (t(), n.after && n.after(r));
      }, r);
      if (n.after) return t(), void (n.after && n.after(r));
    }
    t();
  }
  return n.prototype = {
    helpers: {
      match: s,
      root: o,
      clean: r,
      getOnlyURL: c
    },
    navigate: function (e, t) {
      var n;
      return e = e || "", this._usePushState ? (n = (n = (t ? "" : this._getRoot() + "/") + e.replace(/^\/+/, "/")).replace(/([^:])(\/{2,})/g, "$1/"), history[this._historyAPIUpdateMethod]({}, "", n), this.resolve()) : "undefined" != typeof window && (e = e.replace(new RegExp("^" + this._hash), ""), window.location.href = window.location.href.replace(/#$/, "").replace(new RegExp(this._hash + ".*$"), "") + this._hash + e), this;
    },
    on: function () {
      for (var t = this, n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i];
      if ("function" == typeof r[0]) this._defaultHandler = {
        handler: r[0],
        hooks: r[1]
      };else if (r.length >= 2) {
        if ("/" === r[0]) {
          var s = r[1];
          "object" === e(r[1]) && (s = r[1].uses), this._defaultHandler = {
            handler: s,
            hooks: r[2]
          };
        } else this._add(r[0], r[1], r[2]);
      } else "object" === e(r[0]) && Object.keys(r[0]).sort(a).forEach(function (e) {
        t.on(e, r[0][e]);
      });
      return this;
    },
    off: function (e) {
      return null !== this._defaultHandler && e === this._defaultHandler.handler ? this._defaultHandler = null : null !== this._notFoundHandler && e === this._notFoundHandler.handler && (this._notFoundHandler = null), this._routes = this._routes.reduce(function (t, n) {
        return n.handler !== e && t.push(n), t;
      }, []), this;
    },
    notFound: function (e, t) {
      return this._notFoundHandler = {
        handler: e,
        hooks: t
      }, this;
    },
    resolve: function (e) {
      var n,
        r,
        i = this,
        a = (e || this._cLoc()).replace(this._getRoot(), "");
      this._useHash && (a = a.replace(new RegExp("^/" + this._hash), "/"));
      var o = function (e) {
          return e.split(/\?(.*)?$/).slice(1).join("");
        }(e || this._cLoc()),
        u = c(a, this._useHash, this._hash);
      return !this._paused && (this._lastRouteResolved && u === this._lastRouteResolved.url && o === this._lastRouteResolved.query ? (this._lastRouteResolved.hooks && this._lastRouteResolved.hooks.already && this._lastRouteResolved.hooks.already(this._lastRouteResolved.params), !1) : (r = s(u, this._routes)) ? (this._callLeave(), this._lastRouteResolved = {
        url: u,
        query: o,
        hooks: r.route.hooks,
        params: r.params,
        name: r.route.name
      }, n = r.route.handler, l(function () {
        l(function () {
          r.route.route instanceof RegExp ? n.apply(void 0, r.match.slice(1, r.match.length)) : n(r.params, o);
        }, r.route.hooks, r.params, i._genericHooks);
      }, this._genericHooks, r.params), r) : this._defaultHandler && ("" === u || "/" === u || u === this._hash || function (e, n, r) {
        if (t() && !n) return !1;
        if (!e.match(r)) return !1;
        var i = e.split(r);
        return i.length < 2 || "" === i[1];
      }(u, this._useHash, this._hash)) ? (l(function () {
        l(function () {
          i._callLeave(), i._lastRouteResolved = {
            url: u,
            query: o,
            hooks: i._defaultHandler.hooks
          }, i._defaultHandler.handler(o);
        }, i._defaultHandler.hooks);
      }, this._genericHooks), !0) : (this._notFoundHandler && l(function () {
        l(function () {
          i._callLeave(), i._lastRouteResolved = {
            url: u,
            query: o,
            hooks: i._notFoundHandler.hooks
          }, i._notFoundHandler.handler(o);
        }, i._notFoundHandler.hooks);
      }, this._genericHooks), !1));
    },
    destroy: function () {
      this._routes = [], this._destroyed = !0, this._lastRouteResolved = null, this._genericHooks = null, clearTimeout(this._listeningInterval), "undefined" != typeof window && (window.removeEventListener("popstate", this._onLocationChange), window.removeEventListener("hashchange", this._onLocationChange));
    },
    updatePageLinks: function () {
      var e = this;
      "undefined" != typeof document && this._findLinks().forEach(function (t) {
        t.hasListenerAttached || (t.addEventListener("click", function (n) {
          if ((n.ctrlKey || n.metaKey) && "a" == n.target.tagName.toLowerCase()) return !1;
          var r = e.getLinkPath(t);
          e._destroyed || (n.preventDefault(), e.navigate(r.replace(/\/+$/, "").replace(/^\/+/, "/")));
        }), t.hasListenerAttached = !0);
      });
    },
    generate: function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = this._routes.reduce(function (n, r) {
          var i;
          if (r.name === e) for (i in n = r.route, t) n = n.toString().replace(":" + i, t[i]);
          return n;
        }, "");
      return this._useHash ? this._hash + n : n;
    },
    link: function (e) {
      return this._getRoot() + e;
    },
    pause: function () {
      var paused = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
      this._paused = paused, this._historyAPIUpdateMethod = paused ? "replaceState" : "pushState";
    },
    resume: function () {
      this.pause(!1);
    },
    historyAPIUpdateMethod: function (historyAPIUpdateMethod) {
      return void 0 === historyAPIUpdateMethod ? this._historyAPIUpdateMethod : (this._historyAPIUpdateMethod = historyAPIUpdateMethod, historyAPIUpdateMethod);
    },
    disableIfAPINotAvailable: function () {
      t() || this.destroy();
    },
    lastRouteResolved: function () {
      return this._lastRouteResolved;
    },
    getLinkPath: function (e) {
      return e.getAttribute("href");
    },
    hooks: function (genericHooks) {
      this._genericHooks = genericHooks;
    },
    _add: function (t) {
      var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
        r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
      return "string" == typeof t && (t = encodeURI(t)), this._routes.push("object" === (void 0 === n ? "undefined" : e(n)) ? {
        route: t,
        handler: n.uses,
        name: n.as,
        hooks: r || n.hooks
      } : {
        route: t,
        handler: n,
        hooks: r
      }), this._add;
    },
    _getRoot: function () {
      return null !== this.root || (this.root = o(this._cLoc().split("?")[0], this._routes)), this.root;
    },
    _listen: function () {
      var e = this;
      if (this._usePushState) window.addEventListener("popstate", this._onLocationChange);else if ("undefined" != typeof window && "onhashchange" in window) window.addEventListener("hashchange", this._onLocationChange);else {
        var t = this._cLoc(),
          n = void 0,
          r = void 0;
        (r = function () {
          n = e._cLoc(), t !== n && (t = n, e.resolve()), e._listeningInterval = setTimeout(r, 200);
        })();
      }
    },
    _cLoc: function () {
      return "undefined" != typeof window ? void 0 !== window.__NAVIGO_WINDOW_LOCATION_MOCK__ ? window.__NAVIGO_WINDOW_LOCATION_MOCK__ : r(window.location.href) : "";
    },
    _findLinks: function () {
      return [].slice.call(document.querySelectorAll("[data-navigo]"));
    },
    _onLocationChange: function () {
      this.resolve();
    },
    _callLeave: function () {
      var lastRouteResolved = this._lastRouteResolved;
      lastRouteResolved && lastRouteResolved.hooks && lastRouteResolved.hooks.leave && lastRouteResolved.hooks.leave(lastRouteResolved.params);
    }
  }, n.PARAMETER_REGEXP = /([:*])(\w+)/g, n.WILDCARD_REGEXP = /\*/g, n.REPLACE_VARIABLE_REGEXP = "([^/]+)", n.REPLACE_WILDCARD = "(?:.*)", n.FOLLOWED_BY_SLASH_REGEXP = "(?:/$|$)", n.MATCH_REGEXP_FLAGS = "", n;
}();
