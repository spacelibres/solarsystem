// Recovered from vendors.js:1598268-1599109.
import * as extend from "./extend.js";
import * as getSupport from "./getSupport.js";
let a;
function getDevice(e = {}) {
  return a || (a = function ({
    userAgent: userAgent
  } = {}) {
    const t = (0, getSupport.getSupport)(),
      n = (0, extend.getWindow)(),
      a = n.navigator.platform,
      s = userAgent || n.navigator.userAgent,
      o = {
        ios: !1,
        android: !1
      },
      c = n.screen.width,
      l = n.screen.height,
      u = s.match(/(Android);?[\s\/]+([\d.]+)?/);
    let d = s.match(/(iPad).*OS\s([\d_]+)/);
    const h = s.match(/(iPod)(.*OS\s([\d_]+))?/),
      p = !d && s.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
      f = "Win32" === a;
    let m = "MacIntel" === a;
    return !d && m && t.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${c}x${l}`) >= 0 && (d = s.match(/(Version)\/([\d.]+)/), d || (d = [0, 1, "13_0_0"]), m = !1), u && !f && (o.os = "android", o.android = !0), (d || p || h) && (o.os = "ios", o.ios = !0), o;
  }(e)), a;
}
export { getDevice };
