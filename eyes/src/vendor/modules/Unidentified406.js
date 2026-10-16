/** @eyes-analysis
 * 文件职责：实现 eventsEmitter；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1601310-1602748.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1601310-1602748.
let defaultExport;
defaultExport = {
  on(e, t, n) {
    const r = this;
    if ("function" != typeof t) return r;
    const i = n ? "unshift" : "push";
    return e.split(" ").forEach(e => {
      r.eventsListeners[e] || (r.eventsListeners[e] = []), r.eventsListeners[e][i](t);
    }), r;
  },
  once(e, t, n) {
    const r = this;
    if ("function" != typeof t) return r;
    function i(...n) {
      r.off(e, i), i.__emitterProxy && delete i.__emitterProxy, t.apply(r, n);
    }
    return i.__emitterProxy = t, r.on(e, i, n);
  },
  onAny(e, t) {
    const n = this;
    if ("function" != typeof e) return n;
    const r = t ? "unshift" : "push";
    return n.eventsAnyListeners.indexOf(e) < 0 && n.eventsAnyListeners[r](e), n;
  },
  offAny(e) {
    const t = this;
    if (!t.eventsAnyListeners) return t;
    const n = t.eventsAnyListeners.indexOf(e);
    return n >= 0 && t.eventsAnyListeners.splice(n, 1), t;
  },
  off(e, t) {
    const n = this;
    return n.eventsListeners ? (e.split(" ").forEach(e => {
      void 0 === t ? n.eventsListeners[e] = [] : n.eventsListeners[e] && n.eventsListeners[e].forEach((r, i) => {
        (r === t || r.__emitterProxy && r.__emitterProxy === t) && n.eventsListeners[e].splice(i, 1);
      });
    }), n) : n;
  },
  emit(...e) {
    const t = this;
    if (!t.eventsListeners) return t;
    let n, r, i;
    "string" == typeof e[0] || Array.isArray(e[0]) ? (n = e[0], r = e.slice(1, e.length), i = t) : (n = e[0].events, r = e[0].data, i = e[0].context || t), r.unshift(i);
    return (Array.isArray(n) ? n : n.split(" ")).forEach(e => {
      t.eventsAnyListeners && t.eventsAnyListeners.length && t.eventsAnyListeners.forEach(t => {
        t.apply(i, [e, ...r]);
      }), t.eventsListeners && t.eventsListeners[e] && t.eventsListeners[e].forEach(e => {
        e.apply(i, r);
      });
    }), t;
  }
};
export { defaultExport as default };
