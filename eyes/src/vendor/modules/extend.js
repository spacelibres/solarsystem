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
