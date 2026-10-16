// Recovered from app.js:539425-546738.
/* 工具层保留原浏览器判定、模板占位符与对象转换规则。onAttachElement/elementReady 分别使用轮询和 MutationObserver，并在完成/超时撤销等待资源；tween 的 animationFrame 由完成回调取消。msToTime 的工作变量依次从毫秒缩减为整秒和整分，字段余数保持原算法。 */
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
  static isEmptyObject(object) {
    return object.constructor === Object && 0 === Object.keys(object).length;
  }
  static addStartToPath(path, prefix = "/") {
    return path.startsWith(prefix) ? path : prefix + path;
  }
  static cleanPathDuplicate(path, repeatedPattern = "/", replacement = "/") {
    const regExp = new RegExp(`${repeatedPattern}+`, "g");
    return path.replace(regExp, replacement);
  }
  static addEndToPath(path, suffix = "/") {
    return path.endsWith(suffix) ? path : path + suffix;
  }
  static isElement(value) {
    return value instanceof Element || value instanceof Document;
  }
  static isHTML(value) {
    return "string" == typeof value && null !== value.match(/<[^/>]+>/gm) && null !== value.match(/<\/[^>]+>/gm);
  }
  static hasHTML(value) {
    if ("string" != typeof value) return false;
    const parsedDocument = new DOMParser().parseFromString(value, "text/html");
    return Array.from(parsedDocument.body.childNodes).some(childNode => 1 === childNode.nodeType);
  }
  static async loadJSON(url) {
    url = AppUtils.addEndToPath(url, ".json");
    const response = await fetch(url);
    if (200 === response.status) return response.json();
    {
      const error = new Error(response.status + " (" + response.statusText + ') when trying to fetch "' + url + '"');
      throw error.name = "NotFound", error;
    }
  }
  static msToTime(remainingTimeUnits = 0) {
    const milliseconds = remainingTimeUnits % 1e3;
    const seconds = (remainingTimeUnits = (remainingTimeUnits - milliseconds) / 1e3) % 60;
    const minutes = (remainingTimeUnits = (remainingTimeUnits - seconds) / 60) % 60;
    return {
      hour: (remainingTimeUnits - minutes) / 60,
      minute: minutes,
      second: seconds,
      millisecond: milliseconds
    };
  }
  static formatCountdownTime(totalDurationMillis, remainingMillis) {
    const timeParts = this.msToTime(remainingMillis);
    timeParts.hour = timeParts.hour.toString().padStart(2, "0");
    timeParts.minute = timeParts.minute.toString().padStart(2, "0");
    timeParts.second = timeParts.second.toString().padStart(2, "0");
    return `${totalDurationMillis >= 36e5 ? timeParts.hour + ":" : ""}${timeParts.minute || "00"}:${timeParts.second}`;
  }
  static minToSec(minutes) {
    return 60 * minutes;
  }
  static minToMS(minutes) {
    return 6e4 * minutes;
  }
  static isFutureMission(launchDate) {
    const date = new Date();
    return new Date(launchDate) > date;
  }
  static deepCopy(value) {
    return JSON.parse(JSON.stringify(value));
  }
  static deepClone(value) {
    const clonedValue = Array.isArray(value) ? [] : {};
    for (const propertyName in value) {
      const propertyValue = value[propertyName];
      clonedValue[propertyName] = "object" == typeof propertyValue && null !== propertyValue ? AppUtils.deepClone(propertyValue) : propertyValue;
    }
    return clonedValue;
  }
  static deepMerge(target, source) {
    const mergeOptions = {
      isMergeableObject: value => (!value || !value._isAMomentObject) && Boolean(value) && "object" == typeof value
    };
    return getUnidentified157()(target, source, mergeOptions);
  }
  static deepEqual(leftObject, rightObject) {
    if (!leftObject || !rightObject) return false;
    const leftKeys = Object.keys(leftObject);
    const rightKeys = Object.keys(rightObject);
    if (leftKeys.length !== rightKeys.length) return false;
    for (const propertyName of leftKeys) {
      const leftValue = leftObject[propertyName];
      const rightValue = rightObject[propertyName];
      const bothObjects = AppUtils.isObject(leftValue) && AppUtils.isObject(rightValue);
      if (bothObjects && !AppUtils.deepEqual(leftValue, rightValue)) return false;
      if (!bothObjects && leftValue !== rightValue) return false;
    }
    return true;
  }
  static isObject(value) {
    return null !== value && "object" == typeof value;
  }
  static filterObject(object, predicate) {
    return Object.fromEntries(Object.entries(object).filter(([propertyName, propertyValue]) => predicate(propertyValue, propertyName)));
  }
  static debounce() {
    return getUnidentified158()(...arguments);
  }
  static throttle() {
    return getUnidentified159()(...arguments);
  }
  static waitFor(delayMillis) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, delayMillis);
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
    const platform = window.navigator?.userAgentData?.platform || window.navigator?.platform || "unknown";
    const hasMultipleTouchPoints = window.navigator.maxTouchPoints > 1;
    return "MacIntel" === platform && hasMultipleTouchPoints;
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
  static htmlToElement(htmlText) {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = htmlText.replace(/[\t\n]+/g, "").trim();
    return templateElement.content.firstElementChild;
  }
  static htmlToElements(htmlText) {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = htmlText.replace(/[\t\n]+/g, "").trim();
    return templateElement.content.cloneNode(true).childNodes;
  }
  static insertParamsToHTML(htmlText, params = {}) {
    htmlText = htmlText.replace(/[\t\n]+/g, "").trim();
    const paramNames = Object.keys(params);
    for (let paramIndex = paramNames.length - 1; paramIndex >= 0; paramIndex--) {
      const paramName = paramNames[paramIndex];
      const placeholder = `{$${paramName}}`;
      htmlText = htmlText.replaceAll(placeholder, params[paramName]);
    }
    return htmlText = htmlText.replaceAll(/{\$([A-Z])\w+}/gi, "");
  }
  static htmlWithParamsToElement(htmlText, params = {}) {
    htmlText = AppUtils.insertParamsToHTML(htmlText, params);
    return AppUtils.htmlToElement(htmlText);
  }
  static onAttachElement(elementOrSelector, onAttached, {
    interval: intervalMillis = 100,
    timeout: timeoutMillis = 5e3
  } = {}) {
    const pollingInterval = setInterval(() => {
      ("string" == typeof elementOrSelector ? null !== document.querySelector(elementOrSelector) : document.body.contains(elementOrSelector)) && (clearInterval(pollingInterval), clearTimeout(timeoutId), onAttached());
    }, intervalMillis);
    const timeoutId = setTimeout(() => {
      clearInterval(pollingInterval);
      console.error(`[AppUtils.onAttachElement] Timeout exceeded for "${elementOrSelector}".`);
    }, timeoutMillis);
  }
  static appendWithCallback(parentElement, childElement, targetSelector, onAttached) {
    new Promise(resolveElement => {
      if (document.querySelector(targetSelector)) return resolveElement(document.querySelector(targetSelector));
      const mutationObserver = new MutationObserver(() => {
        document.querySelector(targetSelector) && (resolveElement(document.querySelector(targetSelector)), mutationObserver.disconnect());
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }).then(onAttached);
    parentElement.appendChild(childElement);
  }
  static elementReady(selector, timeoutMillis = 1e3) {
    return new Promise((resolveElement, rejectElement) => {
      const existingElement = document.querySelector(selector);
      if (existingElement) return void resolveElement(existingElement);
      const mutationObserver = new MutationObserver(() => {
        const matchedElement = document.querySelector(selector);
        matchedElement && (mutationObserver.disconnect(), clearTimeout(timeoutId), resolveElement(matchedElement));
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
      const timeoutId = setTimeout(() => {
        mutationObserver.disconnect();
        rejectElement(console.warn(`${selector} not found in DOM`));
      }, timeoutMillis);
    });
  }
  static addScrollbar(element, options = {}) {
    const scrollbarOptions = {
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
      ...options
    };
    return getUnidentified160()(element, scrollbarOptions);
  }
  static formatNumber(numericValue, maximumFractionDigits = 3, minimumFractionDigits = void 0) {
    return numericValue.toLocaleString(void 0, {
      maximumFractionDigits: maximumFractionDigits,
      minimumFractionDigits: minimumFractionDigits
    });
  }
  static formatDate(dateValue, formatOptions = {}) {
    return dateValue.toLocaleString(void 0, {
      year: "numeric",
      month: "long",
      day: "numeric",
      ...formatOptions
    });
  }
  static tween(startState, endState, {
    onUpdate: onUpdate,
    onComplete: onComplete,
    duration: durationMillis = 2e3
  } = {}) {
    let animationFrameId = 0;
    const tween = new Easing.Tween(startState).to(endState, durationMillis).onUpdate(currentState => {
      void 0 !== onUpdate && onUpdate(currentState);
    }).onComplete(() => {
      "function" == typeof onComplete && onComplete();
      cancelAnimationFrame(animationFrameId);
    }).start();
    const animateFrame = timestamp => {
      animationFrameId = requestAnimationFrame(animateFrame);
      (0, Easing.update)(timestamp);
    };
    animateFrame();
    return tween;
  }
  static convertObjType(object) {
    Object.entries(object).forEach(([propertyName, stringValue]) => {
      let convertedValue;
      switch (stringValue.trim()) {
        case "undefined":
          convertedValue = void 0;
          break;
        case "null":
          convertedValue = null;
          break;
        case "true":
          convertedValue = true;
          break;
        case "false":
          convertedValue = false;
          break;
        case "NaN":
          convertedValue = NaN;
          break;
        case "":
          break;
        default:
          convertedValue = isNaN(stringValue) ? stringValue : parseFloat(stringValue);
      }
      object[propertyName] = convertedValue;
    });
    return object;
  }
}
export { AppUtils };
