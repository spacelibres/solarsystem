// Recovered from app.js:539425-546738.
import Unidentified157 from "../../vendor/modules/Unidentified157.cjs";
import Unidentified158 from "../../vendor/modules/Unidentified158.cjs";
import Unidentified159 from "../../vendor/modules/Unidentified159.cjs";
import Unidentified160 from "../../vendor/modules/Unidentified160.cjs";
import "../../styles/extracted/AppUtilsStyles.js";
import * as Easing from "../../vendor/modules/Easing.js";
var getUnidentified157 = () => Unidentified157;
var getUnidentified158 = () => Unidentified158;
var getUnidentified159 = () => Unidentified159;
var getUnidentified160 = () => Unidentified160;
class AppUtils {
  static conversionTable = {
    kmToMi: .621371,
    kmToFt: 3280.84,
    miToFt: 5280,
    kmToM: 1e3,
    auToKm: 149597871,
    ldToKm: 384398
  };
  static constants = {
    speedOfLight: 299792.458,
    minDate: -8e15,
    maxDate: 8e15
  };
  static isEmptyObject(t) {
    return t.constructor === Object && 0 === Object.keys(t).length;
  }
  static addStartToPath(t, e = "/") {
    return t.startsWith(e) ? t : e + t;
  }
  static cleanPathDuplicate(t, e = "/", i = "/") {
    const regExp = new RegExp(`${e}+`, "g");
    return t.replace(regExp, i);
  }
  static addEndToPath(t, e = "/") {
    return t.endsWith(e) ? t : t + e;
  }
  static isElement(t) {
    return t instanceof Element || t instanceof Document;
  }
  static isHTML(t) {
    return "string" == typeof t && null !== t.match(/<[^/>]+>/gm) && null !== t.match(/<\/[^>]+>/gm);
  }
  static hasHTML(t) {
    if ("string" != typeof t) return false;
    const e = new DOMParser().parseFromString(t, "text/html");
    return Array.from(e.body.childNodes).some(t => 1 === t.nodeType);
  }
  static async loadJSON(t) {
    t = AppUtils.addEndToPath(t, ".json");
    const e = await fetch(t);
    if (200 === e.status) return e.json();
    {
      const error = new Error(e.status + " (" + e.statusText + ') when trying to fetch "' + t + '"');
      throw error.name = "NotFound", error;
    }
  }
  static msToTime(t = 0) {
    const e = t % 1e3;
    const i = (t = (t - e) / 1e3) % 60;
    const s = (t = (t - i) / 60) % 60;
    return {
      hour: (t - s) / 60,
      minute: s,
      second: i,
      millisecond: e
    };
  }
  static formatCountdownTime(t, e) {
    const i = this.msToTime(e);
    i.hour = i.hour.toString().padStart(2, "0");
    i.minute = i.minute.toString().padStart(2, "0");
    i.second = i.second.toString().padStart(2, "0");
    return `${t >= 36e5 ? i.hour + ":" : ""}${i.minute || "00"}:${i.second}`;
  }
  static minToSec(t) {
    return 60 * t;
  }
  static minToMS(t) {
    return 6e4 * t;
  }
  static isFutureMission(t) {
    const date = new Date();
    return new Date(t) > date;
  }
  static deepCopy(t) {
    return JSON.parse(JSON.stringify(t));
  }
  static deepClone(t) {
    const e = Array.isArray(t) ? [] : {};
    for (const i in t) {
      const s = t[i];
      e[i] = "object" == typeof s && null !== s ? AppUtils.deepClone(s) : s;
    }
    return e;
  }
  static deepMerge(t, e) {
    const i = {
      isMergeableObject: t => (!t || !t._isAMomentObject) && Boolean(t) && "object" == typeof t
    };
    return getUnidentified157()(t, e, i);
  }
  static deepEqual(t, e) {
    if (!t || !e) return false;
    const i = Object.keys(t);
    const s = Object.keys(e);
    if (i.length !== s.length) return false;
    for (const s of i) {
      const i = t[s];
      const n = e[s];
      const o = AppUtils.isObject(i) && AppUtils.isObject(n);
      if (o && !AppUtils.deepEqual(i, n)) return false;
      if (!o && i !== n) return false;
    }
    return true;
  }
  static isObject(t) {
    return null !== t && "object" == typeof t;
  }
  static filterObject(t, e) {
    return Object.fromEntries(Object.entries(t).filter(([t, i]) => e(i, t)));
  }
  static debounce() {
    return getUnidentified158()(...arguments);
  }
  static throttle() {
    return getUnidentified159()(...arguments);
  }
  static waitFor(t) {
    return new Promise(e => {
      setTimeout(() => {
        e();
      }, t);
    });
  }
  static isPortrait() {
    return window.matchMedia("(orientation: portrait)").matches;
  }
  static isLandscape() {
    return window.matchMedia("(orientation: landscape)").matches;
  }
  static isMobileLandscape() {
    return window.matchMedia("(min-width: 320px) and (max-width: 915px) and (orientation: landscape)").matches;
  }
  static isMobilePortrait() {
    return window.matchMedia("(min-width: 320px) and (max-width: 640px) and (orientation: portrait)").matches;
  }
  static isMobile() {
    return AppUtils.isMobileLandscape() || AppUtils.isMobilePortrait();
  }
  static isAppleDevice() {
    return true === AppUtils.isiPhone() || true === AppUtils.isiPad();
  }
  static isiPhone() {
    return "iPhone" === (window.navigator?.userAgentData?.platform || window.navigator?.platform || "unknown");
  }
  static isiPad() {
    const t = window.navigator?.userAgentData?.platform || window.navigator?.platform || "unknown";
    const e = window.navigator.maxTouchPoints > 1;
    return "MacIntel" === t && e;
  }
  static isTabletPortrait() {
    return window.matchMedia("(min-width: 641px) and (max-width: 1024px) and (orientation: portrait)").matches;
  }
  static isTabletLandscape() {
    return window.matchMedia("(min-width: 916px) and (max-width: 1024px) and (orientation: landscape)").matches;
  }
  static isTablet() {
    return AppUtils.isTabletLandscape() || AppUtils.isTabletPortrait();
  }
  static isMobileMode() {
    return AppUtils.isMobilePortrait() || AppUtils.isMobileLandscape() || AppUtils.isTabletLandscape() || AppUtils.isTabletPortrait() || AppUtils.isPanorama();
  }
  static isDesktop() {
    return window.matchMedia("(min-width: 1025px) and (min-height: 600px)").matches;
  }
  static isPanorama() {
    return window.matchMedia("(min-width: 1025px) and (max-height: 599px) and (orientation: landscape)").matches;
  }
  static is2K() {
    return window.matchMedia("(min-width: 2880px) and (min-height: 1620px)").matches;
  }
  static is4K() {
    return window.matchMedia("(min-width: 3200px) and (min-height: 1800px)").matches;
  }
  static isTouch() {
    return "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
  }
  static isPrimaryTouch() {
    return window.matchMedia("(pointer: coarse)").matches;
  }
  static canHover() {
    return !matchMedia("(hover: none)").matches;
  }
  static htmlToElement(t) {
    const e = document.createElement("template");
    e.innerHTML = t.replace(/[\t\n]+/g, "").trim();
    return e.content.firstElementChild;
  }
  static htmlToElements(t) {
    const e = document.createElement("template");
    e.innerHTML = t.replace(/[\t\n]+/g, "").trim();
    return e.content.cloneNode(true).childNodes;
  }
  static insertParamsToHTML(t, e = {}) {
    t = t.replace(/[\t\n]+/g, "").trim();
    const i = Object.keys(e);
    for (let s = i.length - 1; s >= 0; s--) {
      const n = i[s];
      const o = `{$${n}}`;
      t = t.replaceAll(o, e[n]);
    }
    return t = t.replaceAll(/{\$([A-Z])\w+}/gi, "");
  }
  static htmlWithParamsToElement(t, e = {}) {
    t = AppUtils.insertParamsToHTML(t, e);
    return AppUtils.htmlToElement(t);
  }
  static onAttachElement(t, e, {
    interval: i = 100,
    timeout: s = 5e3
  } = {}) {
    const n = setInterval(() => {
      ("string" == typeof t ? null !== document.querySelector(t) : document.body.contains(t)) && (clearInterval(n), clearTimeout(o), e());
    }, i);
    const o = setTimeout(() => {
      clearInterval(n);
      console.error(`[AppUtils.onAttachElement] Timeout exceeded for "${t}".`);
    }, s);
  }
  static appendWithCallback(t, e, i, s) {
    new Promise(t => {
      if (document.querySelector(i)) return t(document.querySelector(i));
      const mutationObserver = new MutationObserver(() => {
        document.querySelector(i) && (t(document.querySelector(i)), mutationObserver.disconnect());
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }).then(s);
    t.appendChild(e);
  }
  static elementReady(t, e = 1e3) {
    return new Promise((i, s) => {
      const n = document.querySelector(t);
      if (n) return void i(n);
      const mutationObserver = new MutationObserver(() => {
        const e = document.querySelector(t);
        e && (mutationObserver.disconnect(), clearTimeout(r), i(e));
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
      const r = setTimeout(() => {
        mutationObserver.disconnect();
        s(console.warn(`${t} not found in DOM`));
      }, e);
    });
  }
  static addScrollbar(t, e = {}) {
    const i = {
      className: "os-theme-dark",
      resize: "none",
      clipAlways: false,
      normalizeRTL: false,
      paddingAbsolute: true,
      autoUpdate: false,
      sizeAutoCapable: false,
      overflowBehavior: {
        x: "hidden",
        y: "scroll"
      },
      scrollbars: {
        clickScrolling: true,
        autoHide: "move"
      },
      ...e
    };
    return getUnidentified160()(t, i);
  }
  static formatNumber(t, e = 3, i = void 0) {
    return t.toLocaleString(void 0, {
      maximumFractionDigits: e,
      minimumFractionDigits: i
    });
  }
  static formatDate(t, e = {}) {
    return t.toLocaleString(void 0, {
      year: "numeric",
      month: "long",
      day: "numeric",
      ...e
    });
  }
  static tween(t, e, {
    onUpdate: onUpdate,
    onComplete: onComplete,
    duration: n = 2e3
  } = {}) {
    let o = 0;
    const r = new Easing.Tween(t).to(e, n).onUpdate(t => {
      void 0 !== onUpdate && onUpdate(t);
    }).onComplete(() => {
      "function" == typeof onComplete && onComplete();
      cancelAnimationFrame(o);
    }).start();
    const a = t => {
      o = requestAnimationFrame(a);
      (0, Easing.update)(t);
    };
    a();
    return r;
  }
  static convertObjType(t) {
    Object.entries(t).forEach(([e, i]) => {
      let s;
      switch (i.trim()) {
        case "undefined":
          s = void 0;
          break;
        case "null":
          s = null;
          break;
        case "true":
          s = true;
          break;
        case "false":
          s = false;
          break;
        case "NaN":
          s = NaN;
          break;
        case "":
          break;
        default:
          s = isNaN(i) ? i : parseFloat(i);
      }
      t[e] = s;
    });
    return t;
  }
}
export { AppUtils };
