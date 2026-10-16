// Recovered from vendors.js:1575730-1594956.
import * as extend from "./extend.js";
let defaultExport;
class Dom7 extends Array {
  constructor(e) {
    "number" == typeof e ? super(e) : (super(...(e || [])), function (e) {
      const t = e.__proto__;
      Object.defineProperty(e, "__proto__", {
        get() {
          return t;
        },
        set(e) {
          t.__proto__ = e;
        }
      });
    }(this));
  }
}
function i(e = []) {
  const t = [];
  return e.forEach(e => {
    Array.isArray(e) ? t.push(...i(e)) : t.push(e);
  }), t;
}
function a(e, t) {
  return Array.prototype.filter.call(e, t);
}
function s(e) {
  return e.toLowerCase().replace(/-(.)/g, (e, t) => t.toUpperCase());
}
function o(e, t) {
  const n = (0, extend.getWindow)(),
    i = (0, extend.getDocument)();
  let a = [];
  if (!t && e instanceof Dom7) return e;
  if (!e) return new Dom7(a);
  if ("string" == typeof e) {
    const n = e.trim();
    if (n.indexOf("<") >= 0 && n.indexOf(">") >= 0) {
      let e = "div";
      0 === n.indexOf("<li") && (e = "ul"), 0 === n.indexOf("<tr") && (e = "tbody"), 0 !== n.indexOf("<td") && 0 !== n.indexOf("<th") || (e = "tr"), 0 === n.indexOf("<tbody") && (e = "table"), 0 === n.indexOf("<option") && (e = "select");
      const t = i.createElement(e);
      t.innerHTML = n;
      for (let e = 0; e < t.childNodes.length; e += 1) a.push(t.childNodes[e]);
    } else a = function (e, t) {
      if ("string" != typeof e) return [e];
      const n = [],
        r = t.querySelectorAll(e);
      for (let e = 0; e < r.length; e += 1) n.push(r[e]);
      return n;
    }(e.trim(), t || i);
  } else if (e.nodeType || e === n || e === i) a.push(e);else if (Array.isArray(e)) {
    if (e instanceof Dom7) return e;
    a = e;
  }
  return new Dom7(function (e) {
    const t = [];
    for (let n = 0; n < e.length; n += 1) -1 === t.indexOf(e[n]) && t.push(e[n]);
    return t;
  }(a));
}
function addClass(...e) {
  const t = i(e.map(e => e.split(" ")));
  return this.forEach(e => {
    e.classList.add(...t);
  }), this;
}
function removeClass(...e) {
  const t = i(e.map(e => e.split(" ")));
  return this.forEach(e => {
    e.classList.remove(...t);
  }), this;
}
function toggleClass(...e) {
  const t = i(e.map(e => e.split(" ")));
  this.forEach(e => {
    t.forEach(t => {
      e.classList.toggle(t);
    });
  });
}
function hasClass(...e) {
  const t = i(e.map(e => e.split(" ")));
  return a(this, e => t.filter(t => e.classList.contains(t)).length > 0).length > 0;
}
function attr(e, t) {
  if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
  for (let n = 0; n < this.length; n += 1) if (2 === arguments.length) this[n].setAttribute(e, t);else for (const t in e) this[n][t] = e[t], this[n].setAttribute(t, e[t]);
  return this;
}
function removeAttr(e) {
  for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
  return this;
}
function prop(e, t) {
  if (1 !== arguments.length || "string" != typeof e) {
    for (let n = 0; n < this.length; n += 1) if (2 === arguments.length) this[n][e] = t;else for (const t in e) this[n][t] = e[t];
    return this;
  }
  return this[0] ? this[0][e] : this;
}
function data(e, t) {
  let n;
  if (void 0 === t) {
    if (n = this[0], !n) return;
    if (n.dom7ElementDataStorage && e in n.dom7ElementDataStorage) return n.dom7ElementDataStorage[e];
    const t = n.getAttribute(`data-${e}`);
    return t || void 0;
  }
  for (let r = 0; r < this.length; r += 1) n = this[r], n.dom7ElementDataStorage || (n.dom7ElementDataStorage = {}), n.dom7ElementDataStorage[e] = t;
  return this;
}
function removeData(e) {
  for (let t = 0; t < this.length; t += 1) {
    const n = this[t];
    n.dom7ElementDataStorage && n.dom7ElementDataStorage[e] && (n.dom7ElementDataStorage[e] = null, delete n.dom7ElementDataStorage[e]);
  }
}
function dataset() {
  const e = this[0];
  if (!e) return;
  const t = {};
  if (e.dataset) for (const n in e.dataset) t[n] = e.dataset[n];else for (let n = 0; n < e.attributes.length; n += 1) {
    const r = e.attributes[n];
    r.name.indexOf("data-") >= 0 && (t[s(r.name.split("data-")[1])] = r.value);
  }
  for (const e in t) "false" === t[e] ? t[e] = !1 : "true" === t[e] ? t[e] = !0 : parseFloat(t[e]) === 1 * t[e] && (t[e] *= 1);
  return t;
}
function val(e) {
  if (void 0 === e) {
    const e = this[0];
    if (!e) return;
    if (e.multiple && "select" === e.nodeName.toLowerCase()) {
      const t = [];
      for (let n = 0; n < e.selectedOptions.length; n += 1) t.push(e.selectedOptions[n].value);
      return t;
    }
    return e.value;
  }
  for (let t = 0; t < this.length; t += 1) {
    const n = this[t];
    if (Array.isArray(e) && n.multiple && "select" === n.nodeName.toLowerCase()) for (let t = 0; t < n.options.length; t += 1) n.options[t].selected = e.indexOf(n.options[t].value) >= 0;else n.value = e;
  }
  return this;
}
function value(e) {
  return this.val(e);
}
function transform(e) {
  for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
  return this;
}
function transition(e) {
  for (let t = 0; t < this.length; t += 1) this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
  return this;
}
function on(...e) {
  let [t, n, r, i] = e;
  function a(e) {
    const t = e.target;
    if (!t) return;
    const i = e.target.dom7EventData || [];
    if (i.indexOf(e) < 0 && i.unshift(e), o(t).is(n)) r.apply(t, i);else {
      const e = o(t).parents();
      for (let t = 0; t < e.length; t += 1) o(e[t]).is(n) && r.apply(e[t], i);
    }
  }
  function s(e) {
    const t = e && e.target && e.target.dom7EventData || [];
    t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t);
  }
  "function" == typeof e[1] && ([t, r, i] = e, n = void 0), i || (i = !1);
  const c = t.split(" ");
  let l;
  for (let e = 0; e < this.length; e += 1) {
    const t = this[e];
    if (n) for (l = 0; l < c.length; l += 1) {
      const e = c[l];
      t.dom7LiveListeners || (t.dom7LiveListeners = {}), t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []), t.dom7LiveListeners[e].push({
        listener: r,
        proxyListener: a
      }), t.addEventListener(e, a, i);
    } else for (l = 0; l < c.length; l += 1) {
      const e = c[l];
      t.dom7Listeners || (t.dom7Listeners = {}), t.dom7Listeners[e] || (t.dom7Listeners[e] = []), t.dom7Listeners[e].push({
        listener: r,
        proxyListener: s
      }), t.addEventListener(e, s, i);
    }
  }
  return this;
}
function off(...e) {
  let [t, n, r, i] = e;
  "function" == typeof e[1] && ([t, r, i] = e, n = void 0), i || (i = !1);
  const a = t.split(" ");
  for (let e = 0; e < a.length; e += 1) {
    const t = a[e];
    for (let e = 0; e < this.length; e += 1) {
      const a = this[e];
      let s;
      if (!n && a.dom7Listeners ? s = a.dom7Listeners[t] : n && a.dom7LiveListeners && (s = a.dom7LiveListeners[t]), s && s.length) for (let e = s.length - 1; e >= 0; e -= 1) {
        const n = s[e];
        r && n.listener === r || r && n.listener && n.listener.dom7proxy && n.listener.dom7proxy === r ? (a.removeEventListener(t, n.proxyListener, i), s.splice(e, 1)) : r || (a.removeEventListener(t, n.proxyListener, i), s.splice(e, 1));
      }
    }
  }
  return this;
}
function once(...e) {
  const t = this;
  let [n, r, i, a] = e;
  function s(...e) {
    i.apply(this, e), t.off(n, r, s, a), s.dom7proxy && delete s.dom7proxy;
  }
  return "function" == typeof e[1] && ([n, i, a] = e, r = void 0), s.dom7proxy = i, t.on(n, r, s, a);
}
function trigger(...e) {
  const t = (0, extend.getWindow)(),
    n = e[0].split(" "),
    i = e[1];
  for (let r = 0; r < n.length; r += 1) {
    const a = n[r];
    for (let n = 0; n < this.length; n += 1) {
      const r = this[n];
      if (t.CustomEvent) {
        const customEvent = new t.CustomEvent(a, {
          detail: i,
          bubbles: !0,
          cancelable: !0
        });
        r.dom7EventData = e.filter((e, t) => t > 0), r.dispatchEvent(customEvent), r.dom7EventData = [], delete r.dom7EventData;
      }
    }
  }
  return this;
}
function transitionStart(e) {
  const t = this;
  return e && t.on("transitionstart", function n(r) {
    r.target === this && (e.call(this, r), t.off("transitionstart", n));
  }), this;
}
function transitionEnd(e) {
  const t = this;
  return e && t.on("transitionend", function n(r) {
    r.target === this && (e.call(this, r), t.off("transitionend", n));
  }), this;
}
function animationEnd(e) {
  const t = this;
  return e && t.on("animationend", function n(r) {
    r.target === this && (e.call(this, r), t.off("animationend", n));
  }), this;
}
function width() {
  const e = (0, extend.getWindow)();
  return this[0] === e ? e.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null;
}
function outerWidth(e) {
  if (this.length > 0) {
    if (e) {
      const e = this.styles();
      return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"));
    }
    return this[0].offsetWidth;
  }
  return null;
}
function height() {
  const e = (0, extend.getWindow)();
  return this[0] === e ? e.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null;
}
function outerHeight(e) {
  if (this.length > 0) {
    if (e) {
      const e = this.styles();
      return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"));
    }
    return this[0].offsetHeight;
  }
  return null;
}
function offset() {
  if (this.length > 0) {
    const e = (0, extend.getWindow)(),
      t = (0, extend.getDocument)(),
      n = this[0],
      i = n.getBoundingClientRect(),
      a = t.body,
      s = n.clientTop || a.clientTop || 0,
      o = n.clientLeft || a.clientLeft || 0,
      c = n === e ? e.scrollY : n.scrollTop,
      l = n === e ? e.scrollX : n.scrollLeft;
    return {
      top: i.top + c - s,
      left: i.left + l - o
    };
  }
  return null;
}
function hide() {
  for (let e = 0; e < this.length; e += 1) this[e].style.display = "none";
  return this;
}
function show() {
  const e = (0, extend.getWindow)();
  for (let t = 0; t < this.length; t += 1) {
    const n = this[t];
    "none" === n.style.display && (n.style.display = ""), "none" === e.getComputedStyle(n, null).getPropertyValue("display") && (n.style.display = "block");
  }
  return this;
}
function styles() {
  const e = (0, extend.getWindow)();
  return this[0] ? e.getComputedStyle(this[0], null) : {};
}
function css(e, t) {
  const n = (0, extend.getWindow)();
  let i;
  if (1 === arguments.length) {
    if ("string" != typeof e) {
      for (i = 0; i < this.length; i += 1) for (const t in e) this[i].style[t] = e[t];
      return this;
    }
    if (this[0]) return n.getComputedStyle(this[0], null).getPropertyValue(e);
  }
  if (2 === arguments.length && "string" == typeof e) {
    for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
    return this;
  }
  return this;
}
function each(e) {
  return e ? (this.forEach((t, n) => {
    e.apply(t, [t, n]);
  }), this) : this;
}
function filter(e) {
  return o(a(this, e));
}
function html(e) {
  if (void 0 === e) return this[0] ? this[0].innerHTML : null;
  for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
  return this;
}
function text(e) {
  if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
  for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
  return this;
}
function is(e) {
  const t = (0, extend.getWindow)(),
    n = (0, extend.getDocument)(),
    i = this[0];
  let a, s;
  if (!i || void 0 === e) return !1;
  if ("string" == typeof e) {
    if (i.matches) return i.matches(e);
    if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
    if (i.msMatchesSelector) return i.msMatchesSelector(e);
    for (a = o(e), s = 0; s < a.length; s += 1) if (a[s] === i) return !0;
    return !1;
  }
  if (e === n) return i === n;
  if (e === t) return i === t;
  if (e.nodeType || e instanceof Dom7) {
    for (a = e.nodeType ? [e] : e, s = 0; s < a.length; s += 1) if (a[s] === i) return !0;
    return !1;
  }
  return !1;
}
function index() {
  let e,
    t = this[0];
  if (t) {
    for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
    return e;
  }
}
function eq(e) {
  if (void 0 === e) return this;
  const length = this.length;
  if (e > length - 1) return o([]);
  if (e < 0) {
    const n = length + e;
    return o(n < 0 ? [] : [this[n]]);
  }
  return o([this[e]]);
}
function append(...e) {
  let t;
  const n = (0, extend.getDocument)();
  for (let r = 0; r < e.length; r += 1) {
    t = e[r];
    for (let e = 0; e < this.length; e += 1) if ("string" == typeof t) {
      const r = n.createElement("div");
      for (r.innerHTML = t; r.firstChild;) this[e].appendChild(r.firstChild);
    } else if (t instanceof Dom7) for (let n = 0; n < t.length; n += 1) this[e].appendChild(t[n]);else this[e].appendChild(t);
  }
  return this;
}
function appendTo(e) {
  return o(e).append(this), this;
}
function prepend(e) {
  const t = (0, extend.getDocument)();
  let n, i;
  for (n = 0; n < this.length; n += 1) if ("string" == typeof e) {
    const r = t.createElement("div");
    for (r.innerHTML = e, i = r.childNodes.length - 1; i >= 0; i -= 1) this[n].insertBefore(r.childNodes[i], this[n].childNodes[0]);
  } else if (e instanceof Dom7) for (i = 0; i < e.length; i += 1) this[n].insertBefore(e[i], this[n].childNodes[0]);else this[n].insertBefore(e, this[n].childNodes[0]);
  return this;
}
function prependTo(e) {
  return o(e).prepend(this), this;
}
function insertBefore(e) {
  const t = o(e);
  for (let e = 0; e < this.length; e += 1) if (1 === t.length) t[0].parentNode.insertBefore(this[e], t[0]);else if (t.length > 1) for (let n = 0; n < t.length; n += 1) t[n].parentNode.insertBefore(this[e].cloneNode(!0), t[n]);
}
function insertAfter(e) {
  const t = o(e);
  for (let e = 0; e < this.length; e += 1) if (1 === t.length) t[0].parentNode.insertBefore(this[e], t[0].nextSibling);else if (t.length > 1) for (let n = 0; n < t.length; n += 1) t[n].parentNode.insertBefore(this[e].cloneNode(!0), t[n].nextSibling);
}
function next(e) {
  return this.length > 0 ? e ? this[0].nextElementSibling && o(this[0].nextElementSibling).is(e) ? o([this[0].nextElementSibling]) : o([]) : this[0].nextElementSibling ? o([this[0].nextElementSibling]) : o([]) : o([]);
}
function nextAll(e) {
  const t = [];
  let n = this[0];
  if (!n) return o([]);
  for (; n.nextElementSibling;) {
    const r = n.nextElementSibling;
    e ? o(r).is(e) && t.push(r) : t.push(r), n = r;
  }
  return o(t);
}
function prev(e) {
  if (this.length > 0) {
    const t = this[0];
    return e ? t.previousElementSibling && o(t.previousElementSibling).is(e) ? o([t.previousElementSibling]) : o([]) : t.previousElementSibling ? o([t.previousElementSibling]) : o([]);
  }
  return o([]);
}
function prevAll(e) {
  const t = [];
  let n = this[0];
  if (!n) return o([]);
  for (; n.previousElementSibling;) {
    const r = n.previousElementSibling;
    e ? o(r).is(e) && t.push(r) : t.push(r), n = r;
  }
  return o(t);
}
function siblings(e) {
  return this.nextAll(e).add(this.prevAll(e));
}
function parent(e) {
  const t = [];
  for (let n = 0; n < this.length; n += 1) null !== this[n].parentNode && (e ? o(this[n].parentNode).is(e) && t.push(this[n].parentNode) : t.push(this[n].parentNode));
  return o(t);
}
function parents(e) {
  const t = [];
  for (let n = 0; n < this.length; n += 1) {
    let r = this[n].parentNode;
    for (; r;) e ? o(r).is(e) && t.push(r) : t.push(r), r = r.parentNode;
  }
  return o(t);
}
function closest(e) {
  let t = this;
  return void 0 === e ? o([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
}
function find(e) {
  const t = [];
  for (let n = 0; n < this.length; n += 1) {
    const r = this[n].querySelectorAll(e);
    for (let e = 0; e < r.length; e += 1) t.push(r[e]);
  }
  return o(t);
}
function children(e) {
  const t = [];
  for (let n = 0; n < this.length; n += 1) {
    const r = this[n].children;
    for (let n = 0; n < r.length; n += 1) e && !o(r[n]).is(e) || t.push(r[n]);
  }
  return o(t);
}
function remove() {
  for (let e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
  return this;
}
function detach() {
  return this.remove();
}
function add(...e) {
  const t = this;
  let n, r;
  for (n = 0; n < e.length; n += 1) {
    const i = o(e[n]);
    for (r = 0; r < i.length; r += 1) t.push(i[r]);
  }
  return t;
}
function empty() {
  for (let e = 0; e < this.length; e += 1) {
    const t = this[e];
    if (1 === t.nodeType) {
      for (let e = 0; e < t.childNodes.length; e += 1) t.childNodes[e].parentNode && t.childNodes[e].parentNode.removeChild(t.childNodes[e]);
      t.textContent = "";
    }
  }
  return this;
}
function scrollTo(...e) {
  const t = (0, extend.getWindow)();
  let [n, i, a, s, o] = e;
  return 4 === e.length && "function" == typeof s && (o = s, [n, i, a, o, s] = e), void 0 === s && (s = "swing"), this.each(function () {
    const e = this;
    let r,
      c,
      l,
      u,
      d,
      h,
      p,
      f,
      m = i > 0 || 0 === i,
      M = n > 0 || 0 === n;
    if (void 0 === s && (s = "swing"), m && (r = e.scrollTop, a || (e.scrollTop = i)), M && (c = e.scrollLeft, a || (e.scrollLeft = n)), !a) return;
    m && (l = e.scrollHeight - e.offsetHeight, d = Math.max(Math.min(i, l), 0)), M && (u = e.scrollWidth - e.offsetWidth, h = Math.max(Math.min(n, u), 0));
    let _ = null;
    m && d === r && (m = !1), M && h === c && (M = !1), t.requestAnimationFrame(function n(i = new Date().getTime()) {
      null === _ && (_ = i);
      const l = Math.max(Math.min((i - _) / a, 1), 0),
        u = "linear" === s ? l : .5 - Math.cos(l * Math.PI) / 2;
      let A;
      m && (p = r + u * (d - r)), M && (f = c + u * (h - c)), m && d > r && p >= d && (e.scrollTop = d, A = !0), m && d < r && p <= d && (e.scrollTop = d, A = !0), M && h > c && f >= h && (e.scrollLeft = h, A = !0), M && h < c && f <= h && (e.scrollLeft = h, A = !0), A ? o && o() : (m && (e.scrollTop = p), M && (e.scrollLeft = f), t.requestAnimationFrame(n));
    });
  });
}
function scrollTop(...e) {
  let [t, n, r, i] = e;
  3 === e.length && "function" == typeof r && ([t, n, i, r] = e);
  const a = this;
  return void 0 === t ? a.length > 0 ? a[0].scrollTop : null : a.scrollTo(void 0, t, n, r, i);
}
function scrollLeft(...e) {
  let [t, n, r, i] = e;
  3 === e.length && "function" == typeof r && ([t, n, i, r] = e);
  const a = this;
  return void 0 === t ? a.length > 0 ? a[0].scrollLeft : null : a.scrollTo(t, void 0, n, r, i);
}
function animate(e, t) {
  const n = (0, extend.getWindow)(),
    i = this,
    a = {
      props: Object.assign({}, e),
      params: Object.assign({
        duration: 300,
        easing: "swing"
      }, t),
      elements: i,
      animating: !1,
      que: [],
      easingProgress(e, t) {
        return "swing" === e ? .5 - Math.cos(t * Math.PI) / 2 : "function" == typeof e ? e(t) : t;
      },
      stop() {
        a.frameId && n.cancelAnimationFrame(a.frameId), a.animating = !1, a.elements.each(e => {
          delete e.dom7AnimateInstance;
        }), a.que = [];
      },
      done(e) {
        if (a.animating = !1, a.elements.each(e => {
          delete e.dom7AnimateInstance;
        }), e && e(i), a.que.length > 0) {
          const e = a.que.shift();
          a.animate(e[0], e[1]);
        }
      },
      animate(e, t) {
        if (a.animating) return a.que.push([e, t]), a;
        const r = [];
        a.elements.each((t, i) => {
          let s, o, c, l, u;
          t.dom7AnimateInstance || (a.elements[i].dom7AnimateInstance = a), r[i] = {
            container: t
          }, Object.keys(e).forEach(a => {
            s = n.getComputedStyle(t, null).getPropertyValue(a).replace(",", "."), o = parseFloat(s), c = s.replace(o, ""), l = parseFloat(e[a]), u = e[a] + c, r[i][a] = {
              initialFullValue: s,
              initialValue: o,
              unit: c,
              finalValue: l,
              finalFullValue: u,
              currentValue: o
            };
          });
        });
        let s,
          o,
          c = null,
          l = 0,
          u = 0,
          d = !1;
        return a.animating = !0, a.frameId = n.requestAnimationFrame(function h() {
          let p, f;
          s = new Date().getTime(), d || (d = !0, t.begin && t.begin(i)), null === c && (c = s), t.progress && t.progress(i, Math.max(Math.min((s - c) / t.duration, 1), 0), c + t.duration - s < 0 ? 0 : c + t.duration - s, c), r.forEach(n => {
            const i = n;
            o || i.done || Object.keys(e).forEach(n => {
              if (o || i.done) return;
              p = Math.max(Math.min((s - c) / t.duration, 1), 0), f = a.easingProgress(t.easing, p);
              const {
                initialValue: initialValue,
                finalValue: finalValue,
                unit: unit
              } = i[n];
              i[n].currentValue = initialValue + f * (finalValue - initialValue);
              const M = i[n].currentValue;
              (finalValue > initialValue && M >= finalValue || finalValue < initialValue && M <= finalValue) && (i.container.style[n] = finalValue + unit, u += 1, u === Object.keys(e).length && (i.done = !0, l += 1), l === r.length && (o = !0)), o ? a.done(t.complete) : i.container.style[n] = M + unit;
            });
          }), o || (a.frameId = n.requestAnimationFrame(h));
        }), a;
      }
    };
  if (0 === a.elements.length) return i;
  let s;
  for (let e = 0; e < a.elements.length; e += 1) a.elements[e].dom7AnimateInstance ? s = a.elements[e].dom7AnimateInstance : a.elements[e].dom7AnimateInstance = a;
  return s || (s = a), "stop" === e ? s.stop() : s.animate(a.props, a.params), i;
}
function stop() {
  const e = this;
  for (let t = 0; t < e.length; t += 1) e[t].dom7AnimateInstance && e[t].dom7AnimateInstance.stop();
}
o.fn = Dom7.prototype;
const _e = "resize scroll".split(" ");
function Ae(e) {
  return function (...t) {
    if (void 0 === t[0]) {
      for (let t = 0; t < this.length; t += 1) _e.indexOf(e) < 0 && (e in this[t] ? this[t][e]() : o(this[t]).trigger(e));
      return this;
    }
    return this.on(e, ...t);
  };
}
const click = Ae("click"),
  blur = Ae("blur"),
  focus = Ae("focus"),
  focusin = Ae("focusin"),
  focusout = Ae("focusout"),
  keyup = Ae("keyup"),
  keydown = Ae("keydown"),
  keypress = Ae("keypress"),
  submit = Ae("submit"),
  change = Ae("change"),
  mousedown = Ae("mousedown"),
  mousemove = Ae("mousemove"),
  mouseup = Ae("mouseup"),
  mouseenter = Ae("mouseenter"),
  mouseleave = Ae("mouseleave"),
  mouseout = Ae("mouseout"),
  mouseover = Ae("mouseover"),
  touchstart = Ae("touchstart"),
  touchend = Ae("touchend"),
  touchmove = Ae("touchmove"),
  resize = Ae("resize"),
  scroll = Ae("scroll");
defaultExport = o;
export { o as $ };
export { add };
export { addClass };
export { animate };
export { animationEnd };
export { append };
export { appendTo };
export { attr };
export { blur };
export { change };
export { children };
export { click };
export { closest };
export { css };
export { data };
export { dataset };
export { detach };
export { each };
export { empty };
export { eq };
export { filter };
export { find };
export { focus };
export { focusin };
export { focusout };
export { hasClass };
export { height };
export { hide };
export { html };
export { index };
export { insertAfter };
export { insertBefore };
export { is };
export { keydown };
export { keypress };
export { keyup };
export { mousedown };
export { mouseenter };
export { mouseleave };
export { mousemove };
export { mouseout };
export { mouseover };
export { mouseup };
export { next };
export { nextAll };
export { off };
export { offset };
export { on };
export { once };
export { outerHeight };
export { outerWidth };
export { parent };
export { parents };
export { prepend };
export { prependTo };
export { prev };
export { prevAll };
export { prop };
export { remove };
export { removeAttr };
export { removeClass };
export { removeData };
export { resize };
export { scroll };
export { scrollLeft };
export { scrollTo };
export { scrollTop };
export { show };
export { siblings };
export { stop };
export { styles };
export { submit };
export { text };
export { toggleClass };
export { touchend };
export { touchmove };
export { touchstart };
export { transform };
export { transition };
export { transitionEnd };
export { transitionStart };
export { trigger };
export { val };
export { value };
export { width };
export { defaultExport as default };
