// Recovered from app.js:628339-641482.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import "../../vendor/modules/Unidentified160.cjs";
import ShareModalTemplate from "../templates/ShareModalTemplate.html";
import * as animateFill from "../../vendor/modules/animateFill-168.js";
import * as Unidentified511 from "../../engine/core/Unidentified511.js";
let defaultExport;
var getShareModalTemplate = () => ShareModalTemplate;
class ShareModal extends EyesPublicApi.BaseComponent {
  constructor(t, e) {
    super(t, null, {
      isVisible: false,
      iframeElements: true,
      linkTitle: "",
      previewDevice: "",
      previewResolution: "",
      previewVisibleClass: EyesPublicApi.AppUtils.isiPhone() ? "hidden" : "",
      isWide: null,
      ...e,
      config: {
        title: "Share",
        shareBtnParent: {
          selector: ".header",
          wideSelector: ".header",
          threshold: 1025
        },
        linkAltText: "Eyes",
        linkImageSrc: "",
        paramsToKeep: ["time", "rate", "slide", "followId", "trajectory", "hideExternalLinks", "locked", "search", "menu", "timeControls", "hideFullScreenToggle", ...(e?.paramsToKeep ?? [])],
        resetOnClose: true,
        deviceResolutions: {
          desktop: {
            width: 1280,
            height: 720
          },
          tablet: {
            width: 1024,
            height: 1366
          },
          phone: {
            width: 375,
            height: 667
          }
        },
        ...e?.config
      }
    });
    this._activeTab = null;
    this._srcURL = null;
    this._embedOptionsScrollbar = null;
    this._tippySingleton = null;
    this._tippyItems = null;
    this._tippyTimeout = null;
    this._embedQueries = {};
    this._inputElements = {};
    this.bindFunctions(["_iframeLoadEventListener"]);
  }
  mergeEmbedControls() {
    const {
      controls: controls
    } = this._config;
    const e = Unidentified511.default.map(e => {
      const {
        groupName: groupName,
        items: items
      } = e;
      const n = controls.find(t => t.groupName === groupName);
      if (n) {
        const {
          items: t
        } = n;
        const i = items.filter(({
          name: name
        }) => !t.some(({
          name: t
        }) => t === name));
        return {
          ...e,
          items: [...t, ...i]
        };
      }
      return e;
    });
    const i = controls.filter(t => !e.some(({
      groupName: groupName
    }) => groupName === t.groupName));
    this._config.embedOptions = [...e, ...i];
  }
  init() {
    super.init();
    const {
      canHover: canHover
    } = this._app;
    this.mergeEmbedControls();
    this.setEmbedParams();
    this.generateEmbedContent();
    this.setIsWide();
    this.createScrollbars();
    this.createShareButton();
    this.addShareButtonToParent();
    animateFill.default.setDefaultProps({
      theme: "default",
      touch: true,
      hideOnClick: false,
      delay: [300, null],
      placement: "top",
      trigger: "mouseenter click",
      onTrigger: e => {
        clearTimeout(this._tippyTimeout);
        canHover || (this._tippyTimeout = setTimeout(() => {
          e?.hide();
        }, 3e3));
      },
      onClickOutside: t => {
        t.hide();
      },
      onHidden: t => {
        this._tippyItems?.forEach(({
          reference: reference
        }) => reference.blur());
      }
    });
  }
  createScrollbars() {
    const {
      embedOptsContent: embedOptsContent
    } = this._children;
    const e = embedOptsContent.parentElement;
    EyesPublicApi.AppUtils.onAttachElement(e, () => {
      this._embedOptionsScrollbar = EyesPublicApi.AppUtils.addScrollbar(e);
    });
  }
  getCurrentDevice() {
    return EyesPublicApi.AppUtils.isTablet() ? "tablet" : EyesPublicApi.AppUtils.isMobile() ? "phone" : "desktop";
  }
  createShareButton() {
    this.shareButton = document.createElement("button");
    this.shareButton.className = "share-button clickable";
    this.shareButton.innerText = "Share";
    const t = document.createElement("span");
    t.className = "icon icon-share";
    this.shareButton.prepend(t);
    this.shareButton.addEventListener("click", () => {
      this.setSrcURL();
      this.setPreviewDevice({
        target: {
          value: this.getCurrentDevice()
        }
      });
      this.setActiveTab("link");
      const {
        linkImage: linkImage
      } = this._children;
      const {
        linkAltText: linkAltText,
        linkImageSrc: linkImageSrc
      } = this._config;
      const s = document.querySelector("title")?.innerText;
      const n = document.querySelector('meta[property="og:image"]')?.getAttribute("content");
      const o = s || linkAltText;
      const r = "$OG_IMAGE" !== n && n || linkImageSrc;
      linkImage.setAttribute("alt", o);
      linkImage.setAttribute("src", r);
      const {
        fullTitle: fullTitle
      } = this._app.getManager("title");
      const l = fullTitle ?? o;
      this.setState({
        linkTitle: l
      });
      this.show();
    });
  }
  setIsWide() {
    const {
      isWide: isWide
    } = this._state;
    const {
      shareBtnParent: shareBtnParent
    } = this._config;
    const {
      threshold: threshold
    } = shareBtnParent;
    const s = window.innerWidth >= threshold;
    return isWide !== s && (this.setState({
      isWide: s
    }), true);
  }
  addShareButtonToParent() {
    const {
      shareBtnParent: shareBtnParent
    } = this._config;
    const {
      isWide: isWide
    } = this._state;
    const {
      selector: selector,
      wideSelector: wideSelector
    } = shareBtnParent;
    this.shareButton.parentNode?.removeChild(this.shareButton);
    const o = isWide ? wideSelector : selector;
    EyesPublicApi.AppUtils.elementReady(o, 3e3).then(t => (t.appendChild(this.shareButton), true)).catch(t => t);
  }
  setSrcURL(t = window.location.href, e = true) {
    const {
      linkCode: linkCode
    } = this._children;
    const {
      embedOptions: embedOptions,
      paramsToKeep: paramsToKeep
    } = this._config;
    const o = embedOptions.flatMap(({
      items: items
    }) => items);
    const {
      configs: configs
    } = this._app.getManager("router");
    const a = t.split("?");
    const l = a[1] ? new URLSearchParams(a[1]) : new URLSearchParams();
    const c = Array.from(l.keys());
    for (const t of c) {
      const e = o.find(e => e.query === t);
      let i = !paramsToKeep.includes(t);
      void 0 !== e?.appQueryDefault && (i ||= configs[t] === e.appQueryDefault);
      i && l.delete(t);
    }
    this._srcURL = `${a[0]}${l.size ? "?" : ""}${l.toString()}`;
    e && (linkCode.textContent = t);
  }
  setEmbedParams() {
    const {
      embedOptions: embedOptions
    } = this._config;
    embedOptions.forEach(({
      items: items
    }) => {
      items?.forEach(t => {
        const {
          query: query,
          inputDefault: inputDefault,
          invert: invert
        } = t;
        if (query) {
          const t = invert ? !inputDefault : inputDefault;
          this._embedQueries[query] = t;
        } else t.nestedGroup && t.items && t.items.forEach(t => {
          const {
            query: e,
            inputDefault: i,
            invert: s
          } = t;
          const n = s ? !i : i;
          this._embedQueries[e] = n;
        });
      });
    });
  }
  updateEmbedParams(t, e) {
    this._embedQueries[t] !== e && void 0 !== this._embedQueries[t] && (this._embedQueries[t] = e, this.updateEmbedCode());
  }
  updateEmbedCode(t) {
    const {
      force: e = false,
      updatePreview: i = true
    } = t || {};
    const {
      embedCode: embedCode,
      embedPreviewParent: embedPreviewParent
    } = this._children;
    const {
      iframeElements: iframeElements
    } = this._state;
    const {
      srcURL: srcURL,
      iframeString: iframeString,
      noTrackingIframeString: noTrackingIframeString
    } = this.getEmbedCodeFromParams();
    const h = iframeElements ? iframeString : srcURL;
    if ((h !== embedCode.textContent || e) && (embedCode.textContent = h), i && !EyesPublicApi.AppUtils.isiPhone() && (embedPreviewParent?.innerHTML.replace(/&amp;/g, "&") !== noTrackingIframeString || e)) {
      const t = embedPreviewParent.querySelector("iframe");
      t?.removeEventListener("load", this._iframeLoadEventListener);
      embedPreviewParent.innerHTML = noTrackingIframeString;
      embedPreviewParent.querySelector("iframe").addEventListener("load", this._iframeLoadEventListener);
    }
    const {
      embedOptions: embedOptions,
      paramsToKeep: paramsToKeep
    } = this._config;
    let p = embedOptions.flatMap(({
      items: items
    }) => items);
    p = p.flatMap(t => t.nestedGroup ? t.items : t);
    p = p.filter(t => paramsToKeep.includes(t.query));
    const {
      configs: configs
    } = this._app.getManager("router");
    p.forEach(t => {
      if (t.query && Object.keys(configs).includes(t.query) && void 0 !== configs[t.query] && configs[t.query] !== this._embedQueries[t.query] && configs[t.query] !== t.appQueryDefault) {
        const e = document.getElementById(`input-${t.query}`);
        const i = configs[t.query] === t.invert;
        if (e && (e.checked = i ? !configs[t.query] : configs[t.query], e.parentElement?.classList.add("greyed-out-disabled"), t.relatedCheckboxesToDisable)) for (let e = 0; e < t.relatedCheckboxesToDisable.length; e++) {
          const i = document.getElementById(`input-${t.relatedCheckboxesToDisable[e]}`);
          const s = i?.parentElement;
          s?.classList.add("greyed-out-disabled");
        }
      }
    });
    this.resize();
  }
  calcTemplateWidth() {
    const {
      deviceResolutions: deviceResolutions
    } = this._config;
    const {
      embedPreviewParent: embedPreviewParent
    } = this._children;
    const {
      previewDevice: previewDevice,
      useBrowserTemplate: useBrowserTemplate
    } = this._state;
    if (!useBrowserTemplate) return;
    const {
      width: width,
      height: height
    } = deviceResolutions[previewDevice] || deviceResolutions.desktop;
    console.log("\ncalculating template size for", previewDevice);
    console.log("width:", width);
    console.log("height:", height);
  }
  calcIframeTransform() {
    console.log("calcIframeTransform: ");
    const {
      previewResolution: previewResolution
    } = this._state;
    const {
      width: width,
      height: height
    } = previewResolution;
    this.resize();
  }
  _iframeLoadEventListener(t) {
    const {
      contentWindow: contentWindow
    } = t.target;
    contentWindow && (contentWindow.onhashchange = () => {
      this.setSrcURL(contentWindow.location.href, false);
      this.updateEmbedCode({
        updatePreview: false
      });
    });
  }
  calcIframeTransforms() {
    const {
      embedPreviewParent: embedPreviewParent
    } = this._children;
    const {
      deviceResolutions: deviceResolutions
    } = this._config;
    const {
      width: width,
      height: height
    } = deviceResolutions.desktop;
    const {
      paddingTop: paddingTop,
      paddingRight: paddingRight,
      paddingBottom: paddingBottom,
      paddingLeft: paddingLeft
    } = getComputedStyle(embedPreviewParent);
    const {
      clientWidth: clientWidth,
      clientHeight: clientHeight
    } = embedPreviewParent;
    const h = clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
    const d = clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
    this._element.style.setProperty("--iframe-width", `${width}px`);
    this._element.style.setProperty("--iframe-height", `${height}px`);
    const u = h / width;
    const p = d / height;
    const _ = Math.min(u, p);
    this._element.style.setProperty("--iframe-scale", _);
    const m = (h - width * _) / 2 / _;
    this._element.style.setProperty("--iframe-offset-x", `${m}px`);
  }
  setPreviewDevice(t) {
    const {
      value: value
    } = t.target;
    const {
      previewDevice: previewDevice
    } = this._state;
    value !== previewDevice && (this.setState({
      previewDevice: value
    }), this.updateEmbedCode({
      force: true
    }));
  }
  toggleIframeElements(t) {
    const {
      checked: checked
    } = t.target;
    this.setState({
      iframeElements: checked
    });
    this.updateEmbedCode({
      updatePreview: false
    });
  }
  getEmbedCodeFromParams() {
    const {
      embedOptions: embedOptions
    } = this._config;
    let e = embedOptions.flatMap(({
      items: items
    }) => items);
    e = e.flatMap(t => t.nestedGroup ? t.items : t);
    const i = this._srcURL.split("?");
    const uRLSearchParams = new URLSearchParams(i[1]);
    const n = new URLSearchParams(i[1]);
    const o = Object.entries(this._embedQueries).filter(([t, i]) => {
      if (!e || "undefined" === t) return false;
      const {
        appQueryDefault: appQueryDefault,
        dependencies: dependencies
      } = e.find(({
        query: query
      }) => query === t) ?? {};
      const o = !dependencies || dependencies?.length && dependencies.every(([t, e]) => e(this._embedQueries[t]));
      return i !== appQueryDefault && o;
    });
    const r = Object.fromEntries(o);
    const a = {
      ...r,
      tracking: "false"
    };
    Object.keys(r).forEach(t => uRLSearchParams.set(t, r[t]));
    Object.keys(a).forEach(t => n.set(t, a[t]));
    const l = `${i[0]}${uRLSearchParams.size ? "?" : ""}${uRLSearchParams.toString()}`;
    return {
      srcURL: l,
      iframeString: `<iframe src="${l}" allowfullscreen ></iframe>`,
      noTrackingIframeString: `<iframe src="${`${i[0]}${n.size ? "?" : ""}${n.toString()}`}" allowfullscreen ></iframe>`
    };
  }
  generateEmbedContent() {
    const {
      embedOptions: embedOptions
    } = this._config;
    const {
      embedOptsContent: embedOptsContent,
      embedAdvOptsContent: embedAdvOptsContent
    } = this._children;
    embedOptions.forEach(({
      isAdvanced: isAdvanced,
      groupName: groupName,
      items: items
    }) => {
      const o = groupName ? "fieldset" : "div";
      const r = document.createElement(o);
      r.className = "embed-group";
      groupName && this.createGroupLegend(groupName, r);
      this.createGroupInputs(items, r);
      (isAdvanced ? embedAdvOptsContent : embedOptsContent).appendChild(r);
    });
  }
  createGroupLegend(t, e) {
    const i = document.createElement("legend");
    i.innerText = t;
    e.appendChild(i);
    return i;
  }
  createGroupInputs(t, e) {
    t && t.forEach(t => {
      const {
        name: name,
        description: description,
        query: query,
        type: type,
        values: values,
        inputDefault: inputDefault,
        greyValue: greyValue,
        appQueryDefault: appQueryDefault,
        invert: invert,
        onChange: onChange,
        relatedCheckboxesToDisable: relatedCheckboxesToDisable,
        groupName: groupName,
        items: items
      } = t;
      if (groupName && items) {
        const t = document.createElement("fieldset");
        this.createGroupLegend(groupName, t);
        e.appendChild(t);
        return void this.createGroupInputs(items, t);
      }
      const m = "radio" === type;
      const g = inputDefault === greyValue;
      if ("checkbox" === type || "number" === type) {
        const t = document.createElement("div");
        t.className = `input-container ${type}-container ${g ? "greyed-out" : ""}`;
        const p = `input-${query}`;
        const _ = document.createElement("label");
        _.className = "clickable";
        _.innerText = name;
        _.setAttribute("for", p);
        const m = document.createElement("input");
        if (m.className = "clickable", m.setAttribute("id", p), m.setAttribute("type", type), m.setAttribute("name", query), "checkbox" === type && true === inputDefault) m.setAttribute("checked", "");else if ("number" === type) {
          const [t, e, i] = values;
          m.setAttribute("min", t);
          m.setAttribute("max", e);
          m.setAttribute("step", i ?? 1);
          m.setAttribute("value", inputDefault);
          m.setAttribute("inputmode", "decimal");
          m.setAttribute("required", "");
        } else m.setAttribute("value", inputDefault);
        m.addEventListener("click", t => t.stopPropagation());
        m.addEventListener("change", e => {
          const {
            checked: checked,
            value: value,
            validity: validity
          } = e.target;
          if ("checkbox" === type) {
            const t = invert ? !checked : checked;
            if (this.updateEmbedParams(query, t), "function" == typeof onChange && onChange(checked), relatedCheckboxesToDisable) for (let t = 0; t < relatedCheckboxesToDisable.length; t++) {
              const e = document.getElementById(`input-${relatedCheckboxesToDisable[t]}`);
              const s = e?.parentElement;
              s?.classList.toggle("greyed-out-disabled", checked);
            }
          } else if ("number" === type) {
            const e = parseFloat(value);
            const i = validity.valid ? e : appQueryDefault;
            this.updateEmbedParams(query, i);
            const o = !validity.valid || e === greyValue;
            t.classList.toggle("greyed-out", o);
            "function" == typeof onChange && onChange(value);
          }
        });
        const y = document.createElement("span");
        y.className = "clickable icon icon-help";
        y.setAttribute("data-tippy-content", description);
        y.setAttribute("aria-label", `Help: ${description}`);
        y.setAttribute("tabindex", "0");
        t.appendChild(m);
        t.appendChild(_);
        t.appendChild(y);
        e.appendChild(t);
      } else if (m) {
        const t = document.createElement("fieldset");
        t.className = `radio-fieldset ${type}-option`;
        const s = document.createElement("legend");
        s.innerText = name;
        t.appendChild(s);
        values.forEach(({
          title: title,
          value: value,
          description: s
        }) => {
          const r = document.createElement("div");
          r.className = `input-container ${type}-container`;
          const l = `input-${query}-${value}`;
          const c = document.createElement("label");
          c.className = "clickable";
          c.innerText = title;
          c.setAttribute("for", l);
          const h = document.createElement("input");
          h.className = "clickable";
          h.setAttribute("id", l);
          h.setAttribute("type", type);
          h.setAttribute("name", query);
          h.setAttribute("value", value);
          value === inputDefault && h.setAttribute("checked", "");
          h.addEventListener("change", t => {
            const {
              value: e
            } = t.target;
            this.updateEmbedParams(query, e);
          });
          const d = document.createElement("span");
          d.className = "clickable icon icon-help";
          d.setAttribute("data-tippy-content", s);
          d.setAttribute("aria-label", `Help: ${s}`);
          d.setAttribute("tabindex", "0");
          r.appendChild(h);
          r.appendChild(c);
          r.appendChild(d);
          t.appendChild(r);
        });
        e.appendChild(t);
      }
    });
  }
  destroyEmbedContent() {
    const {
      embedOptsContent: embedOptsContent,
      embedAdvOptsContent: embedAdvOptsContent
    } = this._children;
    embedOptsContent.innerHTML = "";
    embedAdvOptsContent.innerHTML = "";
  }
  setActiveTab(activeTab) {
    const {
      tabHeaders: tabHeaders,
      tabContent: tabContent
    } = this._children;
    tabHeaders.childNodes.forEach(e => {
      const i = e.classList.contains(activeTab);
      e.classList.toggle("active", i);
    });
    tabContent.childNodes.forEach(e => {
      const i = e.classList.contains(activeTab);
      e.classList.toggle("active", i);
    });
    "embed" === activeTab && (this.updateEmbedCode(), null === this._tippySingleton && (this._tippyItems = (0, animateFill.default)(".icon-help"), this._tippySingleton = (0, animateFill.createSingleton)(this._tippyItems, {
      moveTransition: "transform 0.2s ease-out"
    })));
    this._activeTab = activeTab;
  }
  copyToClipboard(t) {
    const {
      linkCode: linkCode,
      linkContainer: linkContainer,
      embedCode: embedCode,
      copiedOverlay: copiedOverlay
    } = this._children;
    const o = t.currentTarget.parentElement === linkContainer ? linkCode.textContent : embedCode?.textContent;
    o && navigator.clipboard.writeText(o).then(() => (copiedOverlay.classList.remove("flash"), copiedOverlay.offsetWidth, copiedOverlay.classList.add("flash"), true)).catch(t => {
      console.error("Could not copy text: ", t);
    });
  }
  handleClick(t) {
    const {
      resetOnClose: resetOnClose
    } = this._config;
    (t.target === this._element || t.target === this._children.closeButton) && (this.hide(), this.resetScrollbar(), resetOnClose && this.resetEmbedOptions(), this.destroyTooltips());
    "CODE" !== t.target?.nodeName && window.getSelection().removeAllRanges();
  }
  handleTabClick(t) {
    const e = t.target?.innerText?.toLowerCase();
    ("link" === e || "embed" === e) && this.setActiveTab(e);
  }
  destroyTooltips() {
    this._tippyItems = null;
    this._tippySingleton?.destroy();
    this._tippySingleton = null;
  }
  resetEmbedOptions() {
    this.setEmbedParams();
    this.destroyEmbedContent();
    this.generateEmbedContent();
  }
  resetScrollbar() {
    this._embedOptionsScrollbar.scroll(0);
  }
  resize() {
    this.calcIframeTransforms();
    this.setIsWide() && (this.addShareButtonToParent(), this.resetScrollbar());
  }
  setEnabled(t) {
    super.setEnabled(t);
    this.shareButton.classList.toggle("hidden", !t);
    t && !this.shareButton.parentNode && this.addShareButtonToParent();
  }
  __destroy() {
    super.__disable();
    this.shareButton.parentNode?.removeChild(this.shareButton);
    this.shareButton = null;
  }
}
ShareModal.html = getShareModalTemplate();
defaultExport = ShareModal;
export { defaultExport as default };
