// Recovered from vendors.js:1054819-1056711.
let defaultExport;
const r = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]],
  i = (() => {
    if ("undefined" == typeof document) return !1;
    const e = r[0],
      t = {};
    for (const n of r) {
      const r = n?.[1];
      if (r in document) {
        for (const [r, i] of n.entries()) t[e[r]] = i;
        return t;
      }
    }
    return !1;
  })(),
  a = {
    change: i.fullscreenchange,
    error: i.fullscreenerror
  };
let s = {
  request(e = document.documentElement, t) {
    return new Promise((n, r) => {
      const a = () => {
        s.off("change", a), n();
      };
      s.on("change", a);
      const o = e[i.requestFullscreen](t);
      o instanceof Promise && o.then(a).catch(r);
    });
  },
  exit() {
    return new Promise((e, t) => {
      if (!s.isFullscreen) return void e();
      const n = () => {
        s.off("change", n), e();
      };
      s.on("change", n);
      const r = document[i.exitFullscreen]();
      r instanceof Promise && r.then(n).catch(t);
    });
  },
  toggle(e, t) {
    return s.isFullscreen ? s.exit() : s.request(e, t);
  },
  onchange(e) {
    s.on("change", e);
  },
  onerror(e) {
    s.on("error", e);
  },
  on(e, t) {
    const n = a[e];
    n && document.addEventListener(n, t, !1);
  },
  off(e, t) {
    const n = a[e];
    n && document.removeEventListener(n, t, !1);
  },
  raw: i
};
Object.defineProperties(s, {
  isFullscreen: {
    get: () => Boolean(document[i.fullscreenElement])
  },
  element: {
    enumerable: !0,
    get: () => document[i.fullscreenElement] ?? void 0
  },
  isEnabled: {
    enumerable: !0,
    get: () => Boolean(document[i.fullscreenEnabled])
  }
}), i || (s = {
  isEnabled: !1
}), defaultExport = s;
export { defaultExport as default };
