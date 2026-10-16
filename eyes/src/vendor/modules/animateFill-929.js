// Recovered from vendors.js:2350907-2374867.
import * as Unidentified930 from "./Unidentified930.js";
import * as applyStyles from "./applyStyles-934.js";
let defaultExport;
var roundArrow = '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>',
  s = "tippy-content",
  o = "tippy-backdrop",
  c = "tippy-arrow",
  l = "tippy-svg-arrow",
  u = {
    passive: !0,
    capture: !0
  },
  d = function () {
    return document.body;
  };
function h(e, t, n) {
  if (Array.isArray(e)) {
    var r = e[t];
    return null == r ? Array.isArray(n) ? n[t] : n : r;
  }
  return e;
}
function p(e, t) {
  var n = {}.toString.call(e);
  return 0 === n.indexOf("[object") && n.indexOf(t + "]") > -1;
}
function f(e, t) {
  return "function" == typeof e ? e.apply(void 0, t) : e;
}
function m(e, t) {
  return 0 === t ? e : function (r) {
    clearTimeout(n), n = setTimeout(function () {
      e(r);
    }, t);
  };
  var n;
}
function M(e, t) {
  var n = Object.assign({}, e);
  return t.forEach(function (e) {
    delete n[e];
  }), n;
}
function _(e) {
  return [].concat(e);
}
function A(e, t) {
  -1 === e.indexOf(t) && e.push(t);
}
function g(e) {
  return e.split("-")[0];
}
function b(e) {
  return [].slice.call(e);
}
function y(e) {
  return Object.keys(e).reduce(function (t, n) {
    return void 0 !== e[n] && (t[n] = e[n]), t;
  }, {});
}
function L() {
  return document.createElement("div");
}
function v(e) {
  return ["Element", "Fragment"].some(function (t) {
    return p(e, t);
  });
}
function T(e) {
  return p(e, "MouseEvent");
}
function S(e) {
  return !(!e || !e._tippy || e._tippy.reference !== e);
}
function w(e) {
  return v(e) ? [e] : function (e) {
    return p(e, "NodeList");
  }(e) ? b(e) : Array.isArray(e) ? e : b(document.querySelectorAll(e));
}
function E(e, t) {
  e.forEach(function (e) {
    e && (e.style.transitionDuration = t + "ms");
  });
}
function x(e, t) {
  e.forEach(function (e) {
    e && e.setAttribute("data-state", t);
  });
}
function C(e) {
  var t,
    n = _(e)[0];
  return null != n && null != (t = n.ownerDocument) && t.body ? n.ownerDocument : document;
}
function z(e, t, n) {
  var r = t + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function (t) {
    e[r](t, n);
  });
}
function O(e, t) {
  for (var n = t; n;) {
    var r;
    if (e.contains(n)) return !0;
    n = null == n.getRootNode || null == (r = n.getRootNode()) ? void 0 : r.host;
  }
  return !1;
}
var B = {
    isTouch: !1
  },
  D = 0;
function N() {
  B.isTouch || (B.isTouch = !0, window.performance && document.addEventListener("mousemove", I));
}
function I() {
  var e = performance.now();
  e - D < 20 && (B.isTouch = !1, document.removeEventListener("mousemove", I)), D = e;
}
function R() {
  var e = document.activeElement;
  if (S(e)) {
    var t = e._tippy;
    e.blur && !t.state.isVisible && e.blur();
  }
}
var k = !!("undefined" != typeof window && "undefined" != typeof document) && !!window.msCrypto;
var P = {
    animateFill: !1,
    followCursor: !1,
    inlinePositioning: !1,
    sticky: !1
  },
  Y = Object.assign({
    appendTo: d,
    aria: {
      content: "auto",
      expanded: "auto"
    },
    delay: 0,
    duration: [300, 250],
    getReferenceClientRect: null,
    hideOnClick: !0,
    ignoreAttributes: !1,
    interactive: !1,
    interactiveBorder: 2,
    interactiveDebounce: 0,
    moveTransition: "",
    offset: [0, 10],
    onAfterUpdate: function () {},
    onBeforeUpdate: function () {},
    onCreate: function () {},
    onDestroy: function () {},
    onHidden: function () {},
    onHide: function () {},
    onMount: function () {},
    onShow: function () {},
    onShown: function () {},
    onTrigger: function () {},
    onUntrigger: function () {},
    onClickOutside: function () {},
    placement: "top",
    plugins: [],
    popperOptions: {},
    render: null,
    showOnCreate: !1,
    touch: !0,
    trigger: "mouseenter focus",
    triggerTarget: null
  }, P, {
    allowHTML: !1,
    animation: "fade",
    arrow: !0,
    content: "",
    inertia: !1,
    maxWidth: 350,
    role: "tooltip",
    theme: "",
    zIndex: 9999
  }),
  W = Object.keys(Y);
function F(e) {
  var t = (e.plugins || []).reduce(function (t, n) {
    var r,
      i = n.name,
      a = n.defaultValue;
    i && (t[i] = void 0 !== e[i] ? e[i] : null != (r = Y[i]) ? r : a);
    return t;
  }, {});
  return Object.assign({}, e, t);
}
function q(e, t) {
  var n = Object.assign({}, t, {
    content: f(t.content, [e])
  }, t.ignoreAttributes ? {} : function (e, t) {
    return (t ? Object.keys(F(Object.assign({}, Y, {
      plugins: t
    }))) : W).reduce(function (t, n) {
      var r = (e.getAttribute("data-tippy-" + n) || "").trim();
      if (!r) return t;
      if ("content" === n) t[n] = r;else try {
        t[n] = JSON.parse(r);
      } catch (e) {
        t[n] = r;
      }
      return t;
    }, {});
  }(e, t.plugins));
  return n.aria = Object.assign({}, Y.aria, n.aria), n.aria = {
    expanded: "auto" === n.aria.expanded ? t.interactive : n.aria.expanded,
    content: "auto" === n.aria.content ? t.interactive ? null : "describedby" : n.aria.content
  }, n;
}
function H(e, t) {
  e.innerHTML = t;
}
function U(e) {
  var t = L();
  return !0 === e ? t.className = c : (t.className = l, v(e) ? t.appendChild(e) : H(t, e)), t;
}
function G(e, t) {
  v(t.content) ? (H(e, ""), e.appendChild(t.content)) : "function" != typeof t.content && (t.allowHTML ? H(e, t.content) : e.textContent = t.content);
}
function X(e) {
  var t = e.firstElementChild,
    n = b(t.children);
  return {
    box: t,
    content: n.find(function (e) {
      return e.classList.contains(s);
    }),
    arrow: n.find(function (e) {
      return e.classList.contains(c) || e.classList.contains(l);
    }),
    backdrop: n.find(function (e) {
      return e.classList.contains(o);
    })
  };
}
function j(e) {
  var t = L(),
    n = L();
  n.className = "tippy-box", n.setAttribute("data-state", "hidden"), n.setAttribute("tabindex", "-1");
  var r = L();
  function i(n, r) {
    var i = X(t),
      a = i.box,
      s = i.content,
      o = i.arrow;
    r.theme ? a.setAttribute("data-theme", r.theme) : a.removeAttribute("data-theme"), "string" == typeof r.animation ? a.setAttribute("data-animation", r.animation) : a.removeAttribute("data-animation"), r.inertia ? a.setAttribute("data-inertia", "") : a.removeAttribute("data-inertia"), a.style.maxWidth = "number" == typeof r.maxWidth ? r.maxWidth + "px" : r.maxWidth, r.role ? a.setAttribute("role", r.role) : a.removeAttribute("role"), n.content === r.content && n.allowHTML === r.allowHTML || G(s, e.props), r.arrow ? o ? n.arrow !== r.arrow && (a.removeChild(o), a.appendChild(U(r.arrow))) : a.appendChild(U(r.arrow)) : o && a.removeChild(o);
  }
  return r.className = s, r.setAttribute("data-state", "hidden"), G(r, e.props), t.appendChild(n), n.appendChild(r), i(e.props, e.props), {
    popper: t,
    onUpdate: i
  };
}
j.$$tippy = !0;
var V = 1,
  K = [],
  J = [];
function $(e, t) {
  var n,
    r,
    a,
    s,
    o,
    c,
    l,
    p,
    M = q(e, Object.assign({}, Y, F(y(t)))),
    v = !1,
    S = !1,
    w = !1,
    D = !1,
    N = [],
    I = m(ye, M.interactiveDebounce),
    R = V++,
    P = (p = M.plugins).filter(function (e, t) {
      return p.indexOf(e) === t;
    }),
    W = {
      id: R,
      reference: e,
      popper: L(),
      popperInstance: null,
      props: M,
      state: {
        isEnabled: !0,
        isVisible: !1,
        isDestroyed: !1,
        isMounted: !1,
        isShown: !1
      },
      plugins: P,
      clearDelayTimeouts: function () {
        clearTimeout(n), clearTimeout(r), cancelAnimationFrame(a);
      },
      setProps: function (t) {
        0;
        if (W.state.isDestroyed) return;
        oe("onBeforeUpdate", [W, t]), ge();
        var n = W.props,
          r = q(e, Object.assign({}, n, y(t), {
            ignoreAttributes: !0
          }));
        W.props = r, Ae(), n.interactiveDebounce !== r.interactiveDebounce && (ue(), I = m(ye, r.interactiveDebounce));
        n.triggerTarget && !r.triggerTarget ? _(n.triggerTarget).forEach(function (e) {
          e.removeAttribute("aria-expanded");
        }) : r.triggerTarget && e.removeAttribute("aria-expanded");
        le(), se(), G && G(n, r);
        W.popperInstance && (Se(), Ee().forEach(function (e) {
          requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
        }));
        oe("onAfterUpdate", [W, t]);
      },
      setContent: function (e) {
        W.setProps({
          content: e
        });
      },
      show: function () {
        0;
        var e = W.state.isVisible,
          t = W.state.isDestroyed,
          n = !W.state.isEnabled,
          r = B.isTouch && !W.props.touch,
          i = h(W.props.duration, 0, Y.duration);
        if (e || t || n || r) return;
        if (ne().hasAttribute("disabled")) return;
        if (oe("onShow", [W], !1), !1 === W.props.onShow(W)) return;
        W.state.isVisible = !0, te() && (U.style.visibility = "visible");
        se(), fe(), W.state.isMounted || (U.style.transition = "none");
        if (te()) {
          var a = ie();
          E([a.box, a.content], 0);
        }
        c = function () {
          var e;
          if (W.state.isVisible && !D) {
            if (D = !0, U.offsetHeight, U.style.transition = W.props.moveTransition, te() && W.props.animation) {
              var t = ie(),
                n = t.box,
                r = t.content;
              E([n, r], i), x([n, r], "visible");
            }
            ce(), le(), A(J, W), null == (e = W.popperInstance) || e.forceUpdate(), oe("onMount", [W]), W.props.animation && te() && function (e, t) {
              Me(e, t);
            }(i, function () {
              W.state.isShown = !0, oe("onShown", [W]);
            });
          }
        }, function () {
          var e,
            t = W.props.appendTo,
            n = ne();
          e = W.props.interactive && t === d || "parent" === t ? n.parentNode : f(t, [n]);
          e.contains(U) || e.appendChild(U);
          W.state.isMounted = !0, Se(), !1;
        }();
      },
      hide: function () {
        0;
        var e = !W.state.isVisible,
          t = W.state.isDestroyed,
          n = !W.state.isEnabled,
          r = h(W.props.duration, 1, Y.duration);
        if (e || t || n) return;
        if (oe("onHide", [W], !1), !1 === W.props.onHide(W)) return;
        W.state.isVisible = !1, W.state.isShown = !1, D = !1, v = !1, te() && (U.style.visibility = "hidden");
        if (ue(), me(), se(!0), te()) {
          var i = ie(),
            a = i.box,
            s = i.content;
          W.props.animation && (E([a, s], r), x([a, s], "hidden"));
        }
        ce(), le(), W.props.animation ? te() && function (e, t) {
          Me(e, function () {
            !W.state.isVisible && U.parentNode && U.parentNode.contains(U) && t();
          });
        }(r, W.unmount) : W.unmount();
      },
      hideWithInteractivity: function (e) {
        0;
        re().addEventListener("mousemove", I), A(K, I), I(e);
      },
      enable: function () {
        W.state.isEnabled = !0;
      },
      disable: function () {
        W.hide(), W.state.isEnabled = !1;
      },
      unmount: function () {
        0;
        W.state.isVisible && W.hide();
        if (!W.state.isMounted) return;
        we(), Ee().forEach(function (e) {
          e._tippy.unmount();
        }), U.parentNode && U.parentNode.removeChild(U);
        J = J.filter(function (e) {
          return e !== W;
        }), W.state.isMounted = !1, oe("onHidden", [W]);
      },
      destroy: function () {
        0;
        if (W.state.isDestroyed) return;
        W.clearDelayTimeouts(), W.unmount(), ge(), delete e._tippy, W.state.isDestroyed = !0, oe("onDestroy", [W]);
      }
    };
  if (!M.render) return W;
  var H = M.render(W),
    U = H.popper,
    G = H.onUpdate;
  U.setAttribute("data-tippy-root", ""), U.id = "tippy-" + W.id, W.popper = U, e._tippy = W, U._tippy = W;
  var j = P.map(function (e) {
      return e.fn(W);
    }),
    $ = e.hasAttribute("aria-expanded");
  return Ae(), le(), se(), oe("onCreate", [W]), M.showOnCreate && xe(), U.addEventListener("mouseenter", function () {
    W.props.interactive && W.state.isVisible && W.clearDelayTimeouts();
  }), U.addEventListener("mouseleave", function () {
    W.props.interactive && W.props.trigger.indexOf("mouseenter") >= 0 && re().addEventListener("mousemove", I);
  }), W;
  function Z() {
    var e = W.props.touch;
    return Array.isArray(e) ? e : [e, 0];
  }
  function ee() {
    return "hold" === Z()[0];
  }
  function te() {
    var e;
    return !(null == (e = W.props.render) || !e.$$tippy);
  }
  function ne() {
    return l || e;
  }
  function re() {
    var e = ne().parentNode;
    return e ? C(e) : document;
  }
  function ie() {
    return X(U);
  }
  function ae(e) {
    return W.state.isMounted && !W.state.isVisible || B.isTouch || s && "focus" === s.type ? 0 : h(W.props.delay, e ? 0 : 1, Y.delay);
  }
  function se(e) {
    void 0 === e && (e = !1), U.style.pointerEvents = W.props.interactive && !e ? "" : "none", U.style.zIndex = "" + W.props.zIndex;
  }
  function oe(e, t, n) {
    var r;
    (void 0 === n && (n = !0), j.forEach(function (n) {
      n[e] && n[e].apply(n, t);
    }), n) && (r = W.props)[e].apply(r, t);
  }
  function ce() {
    var t = W.props.aria;
    if (t.content) {
      var n = "aria-" + t.content,
        r = U.id;
      _(W.props.triggerTarget || e).forEach(function (e) {
        var t = e.getAttribute(n);
        if (W.state.isVisible) e.setAttribute(n, t ? t + " " + r : r);else {
          var i = t && t.replace(r, "").trim();
          i ? e.setAttribute(n, i) : e.removeAttribute(n);
        }
      });
    }
  }
  function le() {
    !$ && W.props.aria.expanded && _(W.props.triggerTarget || e).forEach(function (e) {
      W.props.interactive ? e.setAttribute("aria-expanded", W.state.isVisible && e === ne() ? "true" : "false") : e.removeAttribute("aria-expanded");
    });
  }
  function ue() {
    re().removeEventListener("mousemove", I), K = K.filter(function (e) {
      return e !== I;
    });
  }
  function de(t) {
    if (!B.isTouch || !w && "mousedown" !== t.type) {
      var n = t.composedPath && t.composedPath()[0] || t.target;
      if (!W.props.interactive || !O(U, n)) {
        if (_(W.props.triggerTarget || e).some(function (e) {
          return O(e, n);
        })) {
          if (B.isTouch) return;
          if (W.state.isVisible && W.props.trigger.indexOf("click") >= 0) return;
        } else oe("onClickOutside", [W, t]);
        !0 === W.props.hideOnClick && (W.clearDelayTimeouts(), W.hide(), S = !0, setTimeout(function () {
          S = !1;
        }), W.state.isMounted || me());
      }
    }
  }
  function he() {
    w = !0;
  }
  function pe() {
    w = !1;
  }
  function fe() {
    var e = re();
    e.addEventListener("mousedown", de, !0), e.addEventListener("touchend", de, u), e.addEventListener("touchstart", pe, u), e.addEventListener("touchmove", he, u);
  }
  function me() {
    var e = re();
    e.removeEventListener("mousedown", de, !0), e.removeEventListener("touchend", de, u), e.removeEventListener("touchstart", pe, u), e.removeEventListener("touchmove", he, u);
  }
  function Me(e, t) {
    var n = ie().box;
    function r(e) {
      e.target === n && (z(n, "remove", r), t());
    }
    if (0 === e) return t();
    z(n, "remove", o), z(n, "add", r), o = r;
  }
  function _e(t, n, r) {
    void 0 === r && (r = !1), _(W.props.triggerTarget || e).forEach(function (e) {
      e.addEventListener(t, n, r), N.push({
        node: e,
        eventType: t,
        handler: n,
        options: r
      });
    });
  }
  function Ae() {
    var e;
    ee() && (_e("touchstart", be, {
      passive: !0
    }), _e("touchend", Le, {
      passive: !0
    })), (e = W.props.trigger, e.split(/\s+/).filter(Boolean)).forEach(function (e) {
      if ("manual" !== e) switch (_e(e, be), e) {
        case "mouseenter":
          _e("mouseleave", Le);
          break;
        case "focus":
          _e(k ? "focusout" : "blur", ve);
          break;
        case "focusin":
          _e("focusout", ve);
      }
    });
  }
  function ge() {
    N.forEach(function (e) {
      var t = e.node,
        n = e.eventType,
        r = e.handler,
        i = e.options;
      t.removeEventListener(n, r, i);
    }), N = [];
  }
  function be(e) {
    var t,
      n = !1;
    if (W.state.isEnabled && !Te(e) && !S) {
      var r = "focus" === (null == (t = s) ? void 0 : t.type);
      s = e, l = e.currentTarget, le(), !W.state.isVisible && T(e) && K.forEach(function (t) {
        return t(e);
      }), "click" === e.type && (W.props.trigger.indexOf("mouseenter") < 0 || v) && !1 !== W.props.hideOnClick && W.state.isVisible ? n = !0 : xe(e), "click" === e.type && (v = !n), n && !r && Ce(e);
    }
  }
  function ye(e) {
    var t = e.target,
      n = ne().contains(t) || U.contains(t);
    if ("mousemove" !== e.type || !n) {
      var r = Ee().concat(U).map(function (e) {
        var t,
          n = null == (t = e._tippy.popperInstance) ? void 0 : t.state;
        return n ? {
          popperRect: e.getBoundingClientRect(),
          popperState: n,
          props: M
        } : null;
      }).filter(Boolean);
      (function (e, t) {
        var n = t.clientX,
          r = t.clientY;
        return e.every(function (e) {
          var t = e.popperRect,
            i = e.popperState,
            a = e.props.interactiveBorder,
            s = g(i.placement),
            o = i.modifiersData.offset;
          if (!o) return !0;
          var c = "bottom" === s ? o.top.y : 0,
            l = "top" === s ? o.bottom.y : 0,
            u = "right" === s ? o.left.x : 0,
            d = "left" === s ? o.right.x : 0,
            h = t.top - r + c > a,
            p = r - t.bottom - l > a,
            f = t.left - n + u > a,
            m = n - t.right - d > a;
          return h || p || f || m;
        });
      })(r, e) && (ue(), Ce(e));
    }
  }
  function Le(e) {
    Te(e) || W.props.trigger.indexOf("click") >= 0 && v || (W.props.interactive ? W.hideWithInteractivity(e) : Ce(e));
  }
  function ve(e) {
    W.props.trigger.indexOf("focusin") < 0 && e.target !== ne() || W.props.interactive && e.relatedTarget && U.contains(e.relatedTarget) || Ce(e);
  }
  function Te(e) {
    return !!B.isTouch && ee() !== e.type.indexOf("touch") >= 0;
  }
  function Se() {
    we();
    var t = W.props,
      n = t.popperOptions,
      r = t.placement,
      a = t.offset,
      s = t.getReferenceClientRect,
      o = t.moveTransition,
      l = te() ? X(U).arrow : null,
      u = s ? {
        getBoundingClientRect: s,
        contextElement: s.contextElement || ne()
      } : e,
      d = {
        name: "$$tippy",
        enabled: !0,
        phase: "beforeWrite",
        requires: ["computeStyles"],
        fn: function (e) {
          var t = e.state;
          if (te()) {
            var n = ie().box;
            ["placement", "reference-hidden", "escaped"].forEach(function (e) {
              "placement" === e ? n.setAttribute("data-placement", t.placement) : t.attributes.popper["data-popper-" + e] ? n.setAttribute("data-" + e, "") : n.removeAttribute("data-" + e);
            }), t.attributes.popper = {};
          }
        }
      },
      h = [{
        name: "offset",
        options: {
          offset: a
        }
      }, {
        name: "preventOverflow",
        options: {
          padding: {
            top: 2,
            bottom: 2,
            left: 5,
            right: 5
          }
        }
      }, {
        name: "flip",
        options: {
          padding: 5
        }
      }, {
        name: "computeStyles",
        options: {
          adaptive: !o
        }
      }, d];
    te() && l && h.push({
      name: "arrow",
      options: {
        element: l,
        padding: 3
      }
    }), h.push.apply(h, (null == n ? void 0 : n.modifiers) || []), W.popperInstance = (0, applyStyles.createPopper)(u, U, Object.assign({}, n, {
      placement: r,
      onFirstUpdate: c,
      modifiers: h
    }));
  }
  function we() {
    W.popperInstance && (W.popperInstance.destroy(), W.popperInstance = null);
  }
  function Ee() {
    return b(U.querySelectorAll("[data-tippy-root]"));
  }
  function xe(e) {
    W.clearDelayTimeouts(), e && oe("onTrigger", [W, e]), fe();
    var t = ae(!0),
      r = Z(),
      i = r[0],
      a = r[1];
    B.isTouch && "hold" === i && a && (t = a), t ? n = setTimeout(function () {
      W.show();
    }, t) : W.show();
  }
  function Ce(e) {
    if (W.clearDelayTimeouts(), oe("onUntrigger", [W, e]), W.state.isVisible) {
      if (!(W.props.trigger.indexOf("mouseenter") >= 0 && W.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(e.type) >= 0 && v)) {
        var t = ae(!1);
        t ? r = setTimeout(function () {
          W.state.isVisible && W.hide();
        }, t) : a = requestAnimationFrame(function () {
          W.hide();
        });
      }
    } else me();
  }
}
function Z(e, t) {
  void 0 === t && (t = {});
  var n = Y.plugins.concat(t.plugins || []);
  document.addEventListener("touchstart", N, u), window.addEventListener("blur", R);
  var r = Object.assign({}, t, {
      plugins: n
    }),
    i = w(e).reduce(function (e, t) {
      var n = t && $(t, r);
      return n && e.push(n), e;
    }, []);
  return v(e) ? i[0] : i;
}
Z.defaultProps = Y, Z.setDefaultProps = function (e) {
  Object.keys(e).forEach(function (t) {
    Y[t] = e[t];
  });
}, Z.currentInput = B;
var hideAll = function (e) {
    var t = void 0 === e ? {} : e,
      n = t.exclude,
      r = t.duration;
    J.forEach(function (e) {
      var t = !1;
      if (n && (t = S(n) ? e.reference === n : e.popper === n.popper), !t) {
        var i = e.props.duration;
        e.setProps({
          duration: r
        }), e.hide(), e.state.isDestroyed || e.setProps({
          duration: i
        });
      }
    });
  },
  te = Object.assign({}, Unidentified930.default, {
    effect: function (e) {
      var t = e.state,
        n = {
          popper: {
            position: t.options.strategy,
            left: "0",
            top: "0",
            margin: "0"
          },
          arrow: {
            position: "absolute"
          },
          reference: {}
        };
      Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow);
    }
  }),
  createSingleton = function (e, t) {
    var n;
    void 0 === t && (t = {});
    var r,
      i = e,
      a = [],
      s = [],
      o = t.overrides,
      c = [],
      l = !1;
    function u() {
      s = i.map(function (e) {
        return _(e.props.triggerTarget || e.reference);
      }).reduce(function (e, t) {
        return e.concat(t);
      }, []);
    }
    function d() {
      a = i.map(function (e) {
        return e.reference;
      });
    }
    function h(e) {
      i.forEach(function (t) {
        e ? t.enable() : t.disable();
      });
    }
    function p(e) {
      return i.map(function (t) {
        var n = t.setProps;
        return t.setProps = function (i) {
          n(i), t.reference === r && e.setProps(i);
        }, function () {
          t.setProps = n;
        };
      });
    }
    function f(e, t) {
      var n = s.indexOf(t);
      if (t !== r) {
        r = t;
        var c = (o || []).concat("content").reduce(function (e, t) {
          return e[t] = i[n].props[t], e;
        }, {});
        e.setProps(Object.assign({}, c, {
          getReferenceClientRect: "function" == typeof c.getReferenceClientRect ? c.getReferenceClientRect : function () {
            var e;
            return null == (e = a[n]) ? void 0 : e.getBoundingClientRect();
          }
        }));
      }
    }
    h(!1), d(), u();
    var m = {
        fn: function () {
          return {
            onDestroy: function () {
              h(!0);
            },
            onHidden: function () {
              r = null;
            },
            onClickOutside: function (e) {
              e.props.showOnCreate && !l && (l = !0, r = null);
            },
            onShow: function (e) {
              e.props.showOnCreate && !l && (l = !0, f(e, a[0]));
            },
            onTrigger: function (e, t) {
              f(e, t.currentTarget);
            }
          };
        }
      },
      A = Z(L(), Object.assign({}, M(t, ["overrides"]), {
        plugins: [m].concat(t.plugins || []),
        triggerTarget: s,
        popperOptions: Object.assign({}, t.popperOptions, {
          modifiers: [].concat((null == (n = t.popperOptions) ? void 0 : n.modifiers) || [], [te])
        })
      })),
      g = A.show;
    A.show = function (e) {
      if (g(), !r && null == e) return f(A, a[0]);
      if (!r || null != e) {
        if ("number" == typeof e) return a[e] && f(A, a[e]);
        if (i.indexOf(e) >= 0) {
          var t = e.reference;
          return f(A, t);
        }
        return a.indexOf(e) >= 0 ? f(A, e) : void 0;
      }
    }, A.showNext = function () {
      var e = a[0];
      if (!r) return A.show(0);
      var t = a.indexOf(r);
      A.show(a[t + 1] || e);
    }, A.showPrevious = function () {
      var e = a[a.length - 1];
      if (!r) return A.show(e);
      var t = a.indexOf(r),
        n = a[t - 1] || e;
      A.show(n);
    };
    var b = A.setProps;
    return A.setProps = function (e) {
      o = e.overrides || o, b(e);
    }, A.setInstances = function (e) {
      h(!0), c.forEach(function (e) {
        return e();
      }), i = e, h(!1), d(), u(), c = p(A), A.setProps({
        triggerTarget: s
      });
    }, c = p(A), A;
  },
  re = {
    mouseover: "mouseenter",
    focusin: "focus",
    click: "click"
  };
function delegate(e, t) {
  var n = [],
    r = [],
    i = !1,
    a = t.target,
    s = M(t, ["target"]),
    o = Object.assign({}, s, {
      trigger: "manual",
      touch: !1
    }),
    c = Object.assign({
      touch: Y.touch
    }, s, {
      showOnCreate: !0
    }),
    l = Z(e, o);
  function d(e) {
    if (e.target && !i) {
      var n = e.target.closest(a);
      if (n) {
        var s = n.getAttribute("data-tippy-trigger") || t.trigger || Y.trigger;
        if (!n._tippy && !("touchstart" === e.type && "boolean" == typeof c.touch || "touchstart" !== e.type && s.indexOf(re[e.type]) < 0)) {
          var o = Z(n, c);
          o && (r = r.concat(o));
        }
      }
    }
  }
  function h(e, t, r, i) {
    void 0 === i && (i = !1), e.addEventListener(t, r, i), n.push({
      node: e,
      eventType: t,
      handler: r,
      options: i
    });
  }
  return _(l).forEach(function (e) {
    var t = e.destroy,
      a = e.enable,
      s = e.disable;
    e.destroy = function (e) {
      void 0 === e && (e = !0), e && r.forEach(function (e) {
        e.destroy();
      }), r = [], n.forEach(function (e) {
        var t = e.node,
          n = e.eventType,
          r = e.handler,
          i = e.options;
        t.removeEventListener(n, r, i);
      }), n = [], t();
    }, e.enable = function () {
      a(), r.forEach(function (e) {
        return e.enable();
      }), i = !1;
    }, e.disable = function () {
      s(), r.forEach(function (e) {
        return e.disable();
      }), i = !0;
    }, function (e) {
      var t = e.reference;
      h(t, "touchstart", d, u), h(t, "mouseover", d), h(t, "focusin", d), h(t, "click", d);
    }(e);
  }), l;
}
var animateFill = {
  name: "animateFill",
  defaultValue: !1,
  fn: function (e) {
    var t;
    if (null == (t = e.props.render) || !t.$$tippy) return {};
    var n = X(e.popper),
      r = n.box,
      i = n.content,
      a = e.props.animateFill ? function () {
        var e = L();
        return e.className = o, x([e], "hidden"), e;
      }() : null;
    return {
      onCreate: function () {
        a && (r.insertBefore(a, r.firstElementChild), r.setAttribute("data-animatefill", ""), r.style.overflow = "hidden", e.setProps({
          arrow: !1,
          animation: "shift-away"
        }));
      },
      onMount: function () {
        if (a) {
          var e = r.style.transitionDuration,
            t = Number(e.replace("ms", ""));
          i.style.transitionDelay = Math.round(t / 10) + "ms", a.style.transitionDuration = e, x([a], "visible");
        }
      },
      onShow: function () {
        a && (a.style.transitionDuration = "0ms");
      },
      onHide: function () {
        a && x([a], "hidden");
      }
    };
  }
};
var se = {
    clientX: 0,
    clientY: 0
  },
  oe = [];
function ce(e) {
  var t = e.clientX,
    n = e.clientY;
  se = {
    clientX: t,
    clientY: n
  };
}
var followCursor = {
  name: "followCursor",
  defaultValue: !1,
  fn: function (e) {
    var t = e.reference,
      n = C(e.props.triggerTarget || t),
      r = !1,
      i = !1,
      a = !0,
      s = e.props;
    function o() {
      return "initial" === e.props.followCursor && e.state.isVisible;
    }
    function c() {
      n.addEventListener("mousemove", d);
    }
    function l() {
      n.removeEventListener("mousemove", d);
    }
    function u() {
      r = !0, e.setProps({
        getReferenceClientRect: null
      }), r = !1;
    }
    function d(n) {
      var r = !n.target || t.contains(n.target),
        i = e.props.followCursor,
        a = n.clientX,
        s = n.clientY,
        o = t.getBoundingClientRect(),
        c = a - o.left,
        l = s - o.top;
      !r && e.props.interactive || e.setProps({
        getReferenceClientRect: function () {
          var e = t.getBoundingClientRect(),
            n = a,
            r = s;
          "initial" === i && (n = e.left + c, r = e.top + l);
          var o = "horizontal" === i ? e.top : r,
            u = "vertical" === i ? e.right : n,
            d = "horizontal" === i ? e.bottom : r,
            h = "vertical" === i ? e.left : n;
          return {
            width: u - h,
            height: d - o,
            top: o,
            right: u,
            bottom: d,
            left: h
          };
        }
      });
    }
    function h() {
      e.props.followCursor && (oe.push({
        instance: e,
        doc: n
      }), function (e) {
        e.addEventListener("mousemove", ce);
      }(n));
    }
    function p() {
      0 === (oe = oe.filter(function (t) {
        return t.instance !== e;
      })).filter(function (e) {
        return e.doc === n;
      }).length && function (e) {
        e.removeEventListener("mousemove", ce);
      }(n);
    }
    return {
      onCreate: h,
      onDestroy: p,
      onBeforeUpdate: function () {
        s = e.props;
      },
      onAfterUpdate: function (t, n) {
        var a = n.followCursor;
        r || void 0 !== a && s.followCursor !== a && (p(), a ? (h(), !e.state.isMounted || i || o() || c()) : (l(), u()));
      },
      onMount: function () {
        e.props.followCursor && !i && (a && (d(se), a = !1), o() || c());
      },
      onTrigger: function (e, t) {
        T(t) && (se = {
          clientX: t.clientX,
          clientY: t.clientY
        }), i = "focus" === t.type;
      },
      onHidden: function () {
        e.props.followCursor && (u(), l(), a = !0);
      }
    };
  }
};
var inlinePositioning = {
  name: "inlinePositioning",
  defaultValue: !1,
  fn: function (e) {
    var t,
      n = e.reference;
    var r = -1,
      i = !1,
      a = [],
      s = {
        name: "tippyInlinePositioning",
        enabled: !0,
        phase: "afterWrite",
        fn: function (i) {
          var s = i.state;
          e.props.inlinePositioning && (-1 !== a.indexOf(s.placement) && (a = []), t !== s.placement && -1 === a.indexOf(s.placement) && (a.push(s.placement), e.setProps({
            getReferenceClientRect: function () {
              return function (e) {
                return function (e, t, n, r) {
                  if (n.length < 2 || null === e) return t;
                  if (2 === n.length && r >= 0 && n[0].left > n[1].right) return n[r] || t;
                  switch (e) {
                    case "top":
                    case "bottom":
                      var i = n[0],
                        a = n[n.length - 1],
                        s = "top" === e,
                        o = i.top,
                        c = a.bottom,
                        l = s ? i.left : a.left,
                        u = s ? i.right : a.right;
                      return {
                        top: o,
                        bottom: c,
                        left: l,
                        right: u,
                        width: u - l,
                        height: c - o
                      };
                    case "left":
                    case "right":
                      var d = Math.min.apply(Math, n.map(function (e) {
                          return e.left;
                        })),
                        h = Math.max.apply(Math, n.map(function (e) {
                          return e.right;
                        })),
                        p = n.filter(function (t) {
                          return "left" === e ? t.left === d : t.right === h;
                        }),
                        f = p[0].top,
                        m = p[p.length - 1].bottom;
                      return {
                        top: f,
                        bottom: m,
                        left: d,
                        right: h,
                        width: h - d,
                        height: m - f
                      };
                    default:
                      return t;
                  }
                }(g(e), n.getBoundingClientRect(), b(n.getClientRects()), r);
              }(s.placement);
            }
          })), t = s.placement);
        }
      };
    function o() {
      var t;
      i || (t = function (e, t) {
        var n;
        return {
          popperOptions: Object.assign({}, e.popperOptions, {
            modifiers: [].concat(((null == (n = e.popperOptions) ? void 0 : n.modifiers) || []).filter(function (e) {
              return e.name !== t.name;
            }), [t])
          })
        };
      }(e.props, s), i = !0, e.setProps(t), i = !1);
    }
    return {
      onCreate: o,
      onAfterUpdate: o,
      onTrigger: function (t, n) {
        if (T(n)) {
          var i = b(e.reference.getClientRects()),
            a = i.find(function (e) {
              return e.left - 2 <= n.clientX && e.right + 2 >= n.clientX && e.top - 2 <= n.clientY && e.bottom + 2 >= n.clientY;
            }),
            s = i.indexOf(a);
          r = s > -1 ? s : r;
        }
      },
      onHidden: function () {
        r = -1;
      }
    };
  }
};
var sticky = {
  name: "sticky",
  defaultValue: !1,
  fn: function (e) {
    var t = e.reference,
      n = e.popper;
    function r(t) {
      return !0 === e.props.sticky || e.props.sticky === t;
    }
    var i = null,
      a = null;
    function s() {
      var o = r("reference") ? (e.popperInstance ? e.popperInstance.state.elements.reference : t).getBoundingClientRect() : null,
        c = r("popper") ? n.getBoundingClientRect() : null;
      (o && he(i, o) || c && he(a, c)) && e.popperInstance && e.popperInstance.update(), i = o, a = c, e.state.isMounted && requestAnimationFrame(s);
    }
    return {
      onMount: function () {
        e.props.sticky && s();
      }
    };
  }
};
function he(e, t) {
  return !e || !t || e.top !== t.top || e.right !== t.right || e.bottom !== t.bottom || e.left !== t.left;
}
Z.setDefaultProps({
  render: j
}), defaultExport = Z;
export { animateFill };
export { createSingleton };
export { delegate };
export { followCursor };
export { hideAll };
export { inlinePositioning };
export { roundArrow };
export { sticky };
export { defaultExport as default };
