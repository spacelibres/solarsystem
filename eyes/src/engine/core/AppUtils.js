/** @eyes-analysis
 * 文件职责：连接设备模式、路由/内容和应用界面常用逻辑的工具集合。
 * 依据：import ../../vendor/modules/Unidentified157.cjs；import ../../vendor/modules/Unidentified158.cjs
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
/** @eyes-analysis
 * 类职责：连接设备模式、路由/内容和应用界面常用逻辑的工具集合。
 * 继承：无显式父类；导出：AppUtils。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
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
  /** @eyes-analysis
   * 【结构证据】返回 `t.constructor===Object&&0===Object.keys(t).length`；调用 `Object.keys`。
   * 调用线索：Object.keys。
   */
  static isEmptyObject(t) {
    return t.constructor === Object && 0 === Object.keys(t).length;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t.startsWith(e)?t:e+t`；调用 `t.startsWith`。
   * 调用线索：t.startsWith。
   */
  static addStartToPath(t, e = "/") {
    return t.startsWith(e) ? t : e + t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t.replace(regExp,i)`；调用 `new RegExp`、`t.replace`。
   * 调用线索：new RegExp、t.replace。
   */
  static cleanPathDuplicate(t, e = "/", i = "/") {
    const regExp = new RegExp(`${e}+`, "g");
    return t.replace(regExp, i);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t.endsWith(e)?t:t+e`；调用 `t.endsWith`。
   * 调用线索：t.endsWith。
   */
  static addEndToPath(t, e = "/") {
    return t.endsWith(e) ? t : t + e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t instanceof Element||t instanceof Document`。
   */
  static isElement(t) {
    return t instanceof Element || t instanceof Document;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `"string"==typeof t&&null!==t.match(/<[^/>]+>/gm)&&null!==t.match(/<\/[^>]+>/gm)`；调用 `t.match`。
   * 调用线索：t.match。
   */
  static isHTML(t) {
    return "string" == typeof t && null !== t.match(/<[^/>]+>/gm) && null !== t.match(/<\/[^>]+>/gm);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `false` 或 `Array.from(e.body.childNodes).some(t=>1===t.nodeType)`；调用 `Array.from`、`Array.from(e.body.childNodes).some`、`new DOMParser`、`new DOMParser().parseFromString`。
   * 调用线索：Array.from、Array.from(e.body.childNodes).some、new DOMParser、new DOMParser().parseFromString。
   */
  static hasHTML(t) {
    if ("string" != typeof t) return false;
    const e = new DOMParser().parseFromString(t, "text/html");
    return Array.from(e.body.childNodes).some(t => 1 === t.nodeType);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e.json()`；调用 `AppUtils.addEndToPath`、`e.json`、`fetch`、`new Error`；含显式错误分支。
   * 调用线索：AppUtils.addEndToPath、e.json、fetch、new Error。
   */
  static async loadJSON(t) {
    t = AppUtils.addEndToPath(t, ".json");
    const e = await fetch(t);
    if (200 === e.status) return e.json();
    {
      const error = new Error(e.status + " (" + e.statusText + ') when trying to fetch "' + t + '"');
      throw error.name = "NotFound", error;
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `{hour:(t-s)/60,minute:s,second:i,millisecond:e}`。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 ``${t>=36e5?i.hour+":":""}${i.minute||"00"}:${i.second}``；调用 `i.hour.toString`、`i.hour.toString().padStart`、`i.minute.toString`、`i.minute.toString().padStart`、`i.second.toString`、`i.second.toString().padStart`。
   * 调用线索：i.hour.toString、i.hour.toString().padStart、i.minute.toString、i.minute.toString().padStart、i.second.toString等。
   */
  static formatCountdownTime(t, e) {
    const i = this.msToTime(e);
    i.hour = i.hour.toString().padStart(2, "0");
    i.minute = i.minute.toString().padStart(2, "0");
    i.second = i.second.toString().padStart(2, "0");
    return `${t >= 36e5 ? i.hour + ":" : ""}${i.minute || "00"}:${i.second}`;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `60*t`。
   */
  static minToSec(t) {
    return 60 * t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `6e4*t`。
   */
  static minToMS(t) {
    return 6e4 * t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `new Date(t)>date`；调用 `new Date`。
   * 调用线索：new Date。
   */
  static isFutureMission(t) {
    const date = new Date();
    return new Date(t) > date;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `JSON.parse(JSON.stringify(t))`；调用 `JSON.parse`、`JSON.stringify`。
   * 调用线索：JSON.parse、JSON.stringify。
   */
  static deepCopy(t) {
    return JSON.parse(JSON.stringify(t));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e`；调用 `AppUtils.deepClone`、`Array.isArray`。
   * 调用线索：AppUtils.deepClone、Array.isArray。
   */
  static deepClone(t) {
    const e = Array.isArray(t) ? [] : {};
    for (const i in t) {
      const s = t[i];
      e[i] = "object" == typeof s && null !== s ? AppUtils.deepClone(s) : s;
    }
    return e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `getUnidentified157()(t,e,i)`；调用 `Boolean`、`getUnidentified157`、`getUnidentified157()`。
   * 调用线索：Boolean、getUnidentified157、getUnidentified157()。
   */
  static deepMerge(t, e) {
    const i = {
      isMergeableObject: t => (!t || !t._isAMomentObject) && Boolean(t) && "object" == typeof t
    };
    return getUnidentified157()(t, e, i);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `false` 或 `true`；调用 `AppUtils.deepEqual`、`AppUtils.isObject`、`Object.keys`。
   * 调用线索：AppUtils.deepEqual、AppUtils.isObject、Object.keys。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `null!==t&&"object"==typeof t`。
   */
  static isObject(t) {
    return null !== t && "object" == typeof t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Object.fromEntries(Object.entries(t).filter(([t,i])=>e(i,t)))`；调用 `Object.entries`、`Object.entries(t).filter`、`Object.fromEntries`、`e`。
   * 调用线索：Object.entries、Object.entries(t).filter、Object.fromEntries、e。
   */
  static filterObject(t, e) {
    return Object.fromEntries(Object.entries(t).filter(([t, i]) => e(i, t)));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `getUnidentified158()(...arguments)`；调用 `getUnidentified158`、`getUnidentified158()`。
   * 调用线索：getUnidentified158、getUnidentified158()。
   */
  static debounce() {
    return getUnidentified158()(...arguments);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `getUnidentified159()(...arguments)`；调用 `getUnidentified159`、`getUnidentified159()`。
   * 调用线索：getUnidentified159、getUnidentified159()。
   */
  static throttle() {
    return getUnidentified159()(...arguments);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `new Promise(e=>{setTimeout(()=>{e();},t);})`；调用 `e`、`new Promise`、`setTimeout`。
   * 调用线索：e、new Promise、setTimeout。
   */
  static waitFor(t) {
    return new Promise(e => {
      setTimeout(() => {
        e();
      }, t);
    });
  }
  /** @eyes-analysis
   * 【结构证据】返回 `window.matchMedia("(orientation: portrait)").matches`；调用 `window.matchMedia`。
   * 调用线索：window.matchMedia。
   */
  static isPortrait() {
    return window.matchMedia("(orientation: portrait)").matches;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `window.matchMedia("(orientation: landscape)").matches`；调用 `window.matchMedia`。
   * 调用线索：window.matchMedia。
   */
  static isLandscape() {
    return window.matchMedia("(orientation: landscape)").matches;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `window.matchMedia("(min-width: 320px) and (max-width: 915px) and (orientation: landscape)").matches`；调用 `window.matchMedia`。
   * 调用线索：window.matchMedia。
   */
  static isMobileLandscape() {
    return window.matchMedia("(min-width: 320px) and (max-width: 915px) and (orientation: landscape)").matches;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `window.matchMedia("(min-width: 320px) and (max-width: 640px) and (orientation: portrait)").matches`；调用 `window.matchMedia`。
   * 调用线索：window.matchMedia。
   */
  static isMobilePortrait() {
    return window.matchMedia("(min-width: 320px) and (max-width: 640px) and (orientation: portrait)").matches;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `AppUtils.isMobileLandscape()||AppUtils.isMobilePortrait()`；调用 `AppUtils.isMobileLandscape`、`AppUtils.isMobilePortrait`。
   * 调用线索：AppUtils.isMobileLandscape、AppUtils.isMobilePortrait。
   */
  static isMobile() {
    return AppUtils.isMobileLandscape() || AppUtils.isMobilePortrait();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `true===AppUtils.isiPhone()||true===AppUtils.isiPad()`；调用 `AppUtils.isiPad`、`AppUtils.isiPhone`。
   * 调用线索：AppUtils.isiPad、AppUtils.isiPhone。
   */
  static isAppleDevice() {
    return true === AppUtils.isiPhone() || true === AppUtils.isiPad();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `"iPhone"===(window.navigator?.userAgentData?.platform||window.navigator?.platform||"unknown")`。
   */
  static isiPhone() {
    return "iPhone" === (window.navigator?.userAgentData?.platform || window.navigator?.platform || "unknown");
  }
  /** @eyes-analysis
   * 【结构证据】返回 `"MacIntel"===t&&e`。
   */
  static isiPad() {
    const t = window.navigator?.userAgentData?.platform || window.navigator?.platform || "unknown";
    const e = window.navigator.maxTouchPoints > 1;
    return "MacIntel" === t && e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `window.matchMedia("(min-width: 641px) and (max-width: 1024px) and (orientation: portrait)").matches`；调用 `window.matchMedia`。
   * 调用线索：window.matchMedia。
   */
  static isTabletPortrait() {
    return window.matchMedia("(min-width: 641px) and (max-width: 1024px) and (orientation: portrait)").matches;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `window.matchMedia("(min-width: 916px) and (max-width: 1024px) and (orientation: landscape)").matches`；调用 `window.matchMedia`。
   * 调用线索：window.matchMedia。
   */
  static isTabletLandscape() {
    return window.matchMedia("(min-width: 916px) and (max-width: 1024px) and (orientation: landscape)").matches;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `AppUtils.isTabletLandscape()||AppUtils.isTabletPortrait()`；调用 `AppUtils.isTabletLandscape`、`AppUtils.isTabletPortrait`。
   * 调用线索：AppUtils.isTabletLandscape、AppUtils.isTabletPortrait。
   */
  static isTablet() {
    return AppUtils.isTabletLandscape() || AppUtils.isTabletPortrait();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `AppUtils.isMobilePortrait()||AppUtils.isMobileLandscape()||AppUtils.isTabletLandscape()||AppUtils.isTabletPortrait()||AppUtils.isPanorama()`；调用 `AppUtils.isMobileLandscape`、`AppUtils.isMobilePortrait`、`AppUtils.isPanorama`、`AppUtils.isTabletLandscape`、`AppUtils.isTabletPortrait`。
   * 调用线索：AppUtils.isMobileLandscape、AppUtils.isMobilePortrait、AppUtils.isPanorama、AppUtils.isTabletLandscape、AppUtils.isTabletPortrait。
   */
  static isMobileMode() {
    return AppUtils.isMobilePortrait() || AppUtils.isMobileLandscape() || AppUtils.isTabletLandscape() || AppUtils.isTabletPortrait() || AppUtils.isPanorama();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `window.matchMedia("(min-width: 1025px) and (min-height: 600px)").matches`；调用 `window.matchMedia`。
   * 调用线索：window.matchMedia。
   */
  static isDesktop() {
    return window.matchMedia("(min-width: 1025px) and (min-height: 600px)").matches;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `window.matchMedia("(min-width: 1025px) and (max-height: 599px) and (orientation: landscape)").matches`；调用 `window.matchMedia`。
   * 调用线索：window.matchMedia。
   */
  static isPanorama() {
    return window.matchMedia("(min-width: 1025px) and (max-height: 599px) and (orientation: landscape)").matches;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `window.matchMedia("(min-width: 2880px) and (min-height: 1620px)").matches`；调用 `window.matchMedia`。
   * 调用线索：window.matchMedia。
   */
  static is2K() {
    return window.matchMedia("(min-width: 2880px) and (min-height: 1620px)").matches;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `window.matchMedia("(min-width: 3200px) and (min-height: 1800px)").matches`；调用 `window.matchMedia`。
   * 调用线索：window.matchMedia。
   */
  static is4K() {
    return window.matchMedia("(min-width: 3200px) and (min-height: 1800px)").matches;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `"ontouchstart"in window||window.navigator.maxTouchPoints>0`。
   */
  static isTouch() {
    return "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `window.matchMedia("(pointer: coarse)").matches`；调用 `window.matchMedia`。
   * 调用线索：window.matchMedia。
   */
  static isPrimaryTouch() {
    return window.matchMedia("(pointer: coarse)").matches;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `!matchMedia("(hover: none)").matches`；调用 `matchMedia`。
   * 调用线索：matchMedia。
   */
  static canHover() {
    return !matchMedia("(hover: none)").matches;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e.content.firstElementChild`；调用 `document.createElement`、`t.replace`、`t.replace(/[\t\n]+/g,"").trim`。
   * 调用线索：document.createElement、t.replace、t.replace(/[\t\n]+/g,"").trim。
   */
  static htmlToElement(t) {
    const e = document.createElement("template");
    e.innerHTML = t.replace(/[\t\n]+/g, "").trim();
    return e.content.firstElementChild;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e.content.cloneNode(true).childNodes`；调用 `document.createElement`、`e.content.cloneNode`、`t.replace`、`t.replace(/[\t\n]+/g,"").trim`。
   * 调用线索：document.createElement、e.content.cloneNode、t.replace、t.replace(/[\t\n]+/g,"").trim。
   */
  static htmlToElements(t) {
    const e = document.createElement("template");
    e.innerHTML = t.replace(/[\t\n]+/g, "").trim();
    return e.content.cloneNode(true).childNodes;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t=t.replaceAll(/{\$([A-Z])\w+}/gi,"")`；调用 `Object.keys`、`t.replace`、`t.replace(/[\t\n]+/g,"").trim`、`t.replaceAll`。
   * 调用线索：Object.keys、t.replace、t.replace(/[\t\n]+/g,"").trim、t.replaceAll。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `AppUtils.htmlToElement(t)`；调用 `AppUtils.htmlToElement`、`AppUtils.insertParamsToHTML`。
   * 调用线索：AppUtils.htmlToElement、AppUtils.insertParamsToHTML。
   */
  static htmlWithParamsToElement(t, e = {}) {
    t = AppUtils.insertParamsToHTML(t, e);
    return AppUtils.htmlToElement(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `clearInterval`、`clearTimeout`、`console.error`、`document.body.contains`、`document.querySelector`、`e`。
   * 调用线索：clearInterval、clearTimeout、console.error、document.body.contains、document.querySelector等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `document.querySelector`、`mutationObserver.disconnect`、`mutationObserver.observe`、`new MutationObserver`、`new Promise`、`t`。
   * 调用线索：document.querySelector、mutationObserver.disconnect、mutationObserver.observe、new MutationObserver、new Promise等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `new Promise((i,s)=>{const n=document.querySelector(t);if(n)return void i(n);const mutationObserver=new MutationObserver(()=>{const e=document.querySel`；调用 `clearTimeout`、`console.warn`、`document.querySelector`、`i`、`mutationObserver.disconnect`、`mutationObserver.observe`。
   * 调用线索：clearTimeout、console.warn、document.querySelector、i、mutationObserver.disconnect等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `getUnidentified160()(t,i)`；调用 `getUnidentified160`、`getUnidentified160()`。
   * 调用线索：getUnidentified160、getUnidentified160()。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `t.toLocaleString(void 0,{maximumFractionDigits:e,minimumFractionDigits:i})`；调用 `t.toLocaleString`。
   * 调用线索：t.toLocaleString。
   */
  static formatNumber(t, e = 3, i = void 0) {
    return t.toLocaleString(void 0, {
      maximumFractionDigits: e,
      minimumFractionDigits: i
    });
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t.toLocaleString(void 0,{year:"numeric",month:"long",day:"numeric",...e})`；调用 `t.toLocaleString`。
   * 调用线索：t.toLocaleString。
   */
  static formatDate(t, e = {}) {
    return t.toLocaleString(void 0, {
      year: "numeric",
      month: "long",
      day: "numeric",
      ...e
    });
  }
  /** @eyes-analysis
   * 【结构证据】返回 `r`；调用 `0,Easing.update`、`a`、`cancelAnimationFrame`、`new Easing.Tween`、`new Easing.Tween(t).to`、`new Easing.Tween(t).to(e,n).onUpdate`。
   * 调用线索：0,Easing.update、a、cancelAnimationFrame、new Easing.Tween、new Easing.Tween(t).to等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `t`；调用 `Object.entries`、`Object.entries(t).forEach`、`i.trim`、`isNaN`、`parseFloat`。
   * 调用线索：Object.entries、Object.entries(t).forEach、i.trim、isNaN、parseFloat。
   */
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
