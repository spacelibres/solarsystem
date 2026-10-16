/** @eyes-analysis
 * 文件职责：提供 extend、getDocument、getWindow、ssrDocument、ssrWindow；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:1573321-1574961.；exports: extend, getDocument, getWindow, ssrDocument, ssrWindow
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1573321-1574961.
function r(e) {
  return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object;
}
function extend(e = {}, t = {}) {
  Object.keys(t).forEach(n => {
    void 0 === e[n] ? e[n] = t[n] : r(t[n]) && r(e[n]) && Object.keys(t[n]).length > 0 && extend(e[n], t[n]);
  });
}
const ssrDocument = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: {
    blur() {},
    nodeName: ""
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {}
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function getDocument() {
  const e = "undefined" != typeof document ? document : {};
  return extend(e, ssrDocument), e;
}
const ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {},
    pushState() {},
    go() {},
    back() {}
  },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      }
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(e) {
    return "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0);
  },
  cancelAnimationFrame(e) {
    "undefined" != typeof setTimeout && clearTimeout(e);
  }
};
function getWindow() {
  const e = "undefined" != typeof window ? window : {};
  return extend(e, ssrWindow), e;
}
export { extend };
export { getDocument };
export { getWindow };
export { ssrDocument };
export { ssrWindow };
