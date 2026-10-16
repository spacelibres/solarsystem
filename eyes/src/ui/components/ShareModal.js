// Recovered from app.js:628339-641482.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import "../../vendor/modules/Unidentified160.cjs";
import ShareModalTemplate from "../templates/ShareModalTemplate.html";
import * as animateFill from "../../vendor/modules/animateFill-168.js";
import * as Unidentified511 from "../../engine/core/Unidentified511.js";
let defaultExport;
var getShareModalTemplate = () => ShareModalTemplate;
/* 分享源 URL 先过滤非保留查询，嵌入选项再按默认值与依赖条件生成最终参数。预览强制 tracking=false，iframe hash 变化只更新代码而不重建预览；更换预览 iframe 前解除旧 load 监听。表单 DOM 与帮助提示归此组件持有。 */
class ShareModal extends EyesPublicApi.BaseComponent {
  constructor(app, options) {
    super(app, null, {
      isVisible: false,
      iframeElements: true,
      linkTitle: "",
      previewDevice: "",
      previewResolution: "",
      previewVisibleClass: EyesPublicApi.AppUtils.isiPhone() ? "hidden" : "",
      isWide: null,
      ...options,
      config: {
        title: "Share",
        shareBtnParent: {
          selector: ".header",
          wideSelector: ".header",
          threshold: 1025
        },
        linkAltText: "Eyes",
        linkImageSrc: "",
        paramsToKeep: ["time", "rate", "slide", "followId", "trajectory", "hideExternalLinks", "locked", "search", "menu", "timeControls", "hideFullScreenToggle", ...(options?.paramsToKeep ?? [])],
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
        ...options?.config
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
    const mergedGroups = Unidentified511.default.map(defaultGroup => {
      const {
        groupName: groupName,
        items: items
      } = defaultGroup;
      const customGroup = controls.find(controlGroup => controlGroup.groupName === groupName);
      if (customGroup) {
        const {
          items: customItems
        } = customGroup;
        const remainingDefaultItems = items.filter(({
          name: name
        }) => !customItems.some(({
          name: customName
        }) => customName === name));
        return {
          ...defaultGroup,
          items: [...customItems, ...remainingDefaultItems]
        };
      }
      return defaultGroup;
    });
    const customGroups = controls.filter(controlGroup => !mergedGroups.some(({
      groupName: groupName
    }) => groupName === controlGroup.groupName));
    this._config.embedOptions = [...mergedGroups, ...customGroups];
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
      onTrigger: tooltip => {
        clearTimeout(this._tippyTimeout);
        canHover || (this._tippyTimeout = setTimeout(() => {
          tooltip?.hide();
        }, 3e3));
      },
      onClickOutside: tooltip => {
        tooltip.hide();
      },
      onHidden: tooltip => {
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
    const scrollElement = embedOptsContent.parentElement;
    EyesPublicApi.AppUtils.onAttachElement(scrollElement, () => {
      this._embedOptionsScrollbar = EyesPublicApi.AppUtils.addScrollbar(scrollElement);
    });
  }
  getCurrentDevice() {
    return EyesPublicApi.AppUtils.isTablet() ? "tablet" : EyesPublicApi.AppUtils.isMobile() ? "phone" : "desktop";
  }
  createShareButton() {
    this.shareButton = document.createElement("button");
    this.shareButton.className = "share-button clickable";
    this.shareButton.innerText = "Share";
    const shareIcon = document.createElement("span");
    shareIcon.className = "icon icon-share";
    this.shareButton.prepend(shareIcon);
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
      const pageTitle = document.querySelector("title")?.innerText;
      const ogImageUrl = document.querySelector('meta[property="og:image"]')?.getAttribute("content");
      const imageAltText = pageTitle || linkAltText;
      const imageUrl = "$OG_IMAGE" !== ogImageUrl && ogImageUrl || linkImageSrc;
      linkImage.setAttribute("alt", imageAltText);
      linkImage.setAttribute("src", imageUrl);
      const {
        fullTitle: fullTitle
      } = this._app.getManager("title");
      const linkTitle = fullTitle ?? imageAltText;
      this.setState({
        linkTitle: linkTitle
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
    const shouldBeWide = window.innerWidth >= threshold;
    return isWide !== shouldBeWide && (this.setState({
      isWide: shouldBeWide
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
    const parentSelector = isWide ? wideSelector : selector;
    EyesPublicApi.AppUtils.elementReady(parentSelector, 3e3).then(parentElement => (parentElement.appendChild(this.shareButton), true)).catch(attachError => attachError);
  }
  setSrcURL(sourceUrl = window.location.href, updateLinkText = true) {
    const {
      linkCode: linkCode
    } = this._children;
    const {
      embedOptions: embedOptions,
      paramsToKeep: paramsToKeep
    } = this._config;
    const embedItems = embedOptions.flatMap(({
      items: items
    }) => items);
    const {
      configs: configs
    } = this._app.getManager("router");
    const urlParts = sourceUrl.split("?");
    const sourceParams = urlParts[1] ? new URLSearchParams(urlParts[1]) : new URLSearchParams();
    const queryNames = Array.from(sourceParams.keys());
    for (const queryName of queryNames) {
      const matchingOption = embedItems.find(embedOption => embedOption.query === queryName);
      let removeQuery = !paramsToKeep.includes(queryName);
      void 0 !== matchingOption?.appQueryDefault && (removeQuery ||= configs[queryName] === matchingOption.appQueryDefault);
      removeQuery && sourceParams.delete(queryName);
    }
    this._srcURL = `${urlParts[0]}${sourceParams.size ? "?" : ""}${sourceParams.toString()}`;
    updateLinkText && (linkCode.textContent = sourceUrl);
  }
  setEmbedParams() {
    const {
      embedOptions: embedOptions
    } = this._config;
    embedOptions.forEach(({
      items: items
    }) => {
      items?.forEach(embedOption => {
        const {
          query: query,
          inputDefault: inputDefault,
          invert: invert
        } = embedOption;
        if (query) {
          const queryDefault = invert ? !inputDefault : inputDefault;
          this._embedQueries[query] = queryDefault;
        } else embedOption.nestedGroup && embedOption.items && embedOption.items.forEach(nestedOption => {
          const {
            query: nestedQueryName,
            inputDefault: nestedInputDefault,
            invert: nestedInvert
          } = nestedOption;
          const nestedQueryDefault = nestedInvert ? !nestedInputDefault : nestedInputDefault;
          this._embedQueries[nestedQueryName] = nestedQueryDefault;
        });
      });
    });
  }
  updateEmbedParams(queryName, queryValue) {
    this._embedQueries[queryName] !== queryValue && void 0 !== this._embedQueries[queryName] && (this._embedQueries[queryName] = queryValue, this.updateEmbedCode());
  }
  updateEmbedCode(updateOptions) {
    const {
      force: forceUpdate = false,
      updatePreview = true
    } = updateOptions || {};
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
    const embedText = iframeElements ? iframeString : srcURL;
    if ((embedText !== embedCode.textContent || forceUpdate) && (embedCode.textContent = embedText), updatePreview && !EyesPublicApi.AppUtils.isiPhone() && (embedPreviewParent?.innerHTML.replace(/&amp;/g, "&") !== noTrackingIframeString || forceUpdate)) {
      const previousIframe = embedPreviewParent.querySelector("iframe");
      previousIframe?.removeEventListener("load", this._iframeLoadEventListener);
      embedPreviewParent.innerHTML = noTrackingIframeString;
      embedPreviewParent.querySelector("iframe").addEventListener("load", this._iframeLoadEventListener);
    }
    const {
      embedOptions: embedOptions,
      paramsToKeep: paramsToKeep
    } = this._config;
    let retainedOptions = embedOptions.flatMap(({
      items: items
    }) => items);
    retainedOptions = retainedOptions.flatMap(embedOption => embedOption.nestedGroup ? embedOption.items : embedOption);
    retainedOptions = retainedOptions.filter(embedOption => paramsToKeep.includes(embedOption.query));
    const {
      configs: configs
    } = this._app.getManager("router");
    retainedOptions.forEach(embedOption => {
      if (embedOption.query && Object.keys(configs).includes(embedOption.query) && void 0 !== configs[embedOption.query] && configs[embedOption.query] !== this._embedQueries[embedOption.query] && configs[embedOption.query] !== embedOption.appQueryDefault) {
        const optionInput = document.getElementById(`input-${embedOption.query}`);
        const invertCheckedState = configs[embedOption.query] === embedOption.invert;
        if (optionInput && (optionInput.checked = invertCheckedState ? !configs[embedOption.query] : configs[embedOption.query], optionInput.parentElement?.classList.add("greyed-out-disabled"), embedOption.relatedCheckboxesToDisable)) for (let relatedIndex = 0; relatedIndex < embedOption.relatedCheckboxesToDisable.length; relatedIndex++) {
          const relatedInput = document.getElementById(`input-${embedOption.relatedCheckboxesToDisable[relatedIndex]}`);
          const relatedContainer = relatedInput?.parentElement;
          relatedContainer?.classList.add("greyed-out-disabled");
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
  _iframeLoadEventListener(loadEvent) {
    const {
      contentWindow: contentWindow
    } = loadEvent.target;
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
    const availableWidth = clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
    const availableHeight = clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
    this._element.style.setProperty("--iframe-width", `${width}px`);
    this._element.style.setProperty("--iframe-height", `${height}px`);
    const horizontalScale = availableWidth / width;
    const verticalScale = availableHeight / height;
    const previewScale = Math.min(horizontalScale, verticalScale);
    this._element.style.setProperty("--iframe-scale", previewScale);
    const horizontalOffset = (availableWidth - width * previewScale) / 2 / previewScale;
    this._element.style.setProperty("--iframe-offset-x", `${horizontalOffset}px`);
  }
  setPreviewDevice(changeEvent) {
    const {
      value: value
    } = changeEvent.target;
    const {
      previewDevice: previewDevice
    } = this._state;
    value !== previewDevice && (this.setState({
      previewDevice: value
    }), this.updateEmbedCode({
      force: true
    }));
  }
  toggleIframeElements(changeEvent) {
    const {
      checked: checked
    } = changeEvent.target;
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
    let embedItems = embedOptions.flatMap(({
      items: items
    }) => items);
    embedItems = embedItems.flatMap(embedOption => embedOption.nestedGroup ? embedOption.items : embedOption);
    const urlParts = this._srcURL.split("?");
    const uRLSearchParams = new URLSearchParams(urlParts[1]);
    const previewParams = new URLSearchParams(urlParts[1]);
    const changedEntries = Object.entries(this._embedQueries).filter(([queryName, queryValue]) => {
      if (!embedItems || "undefined" === queryName) return false;
      const {
        appQueryDefault: appQueryDefault,
        dependencies: dependencies
      } = embedItems.find(({
        query: query
      }) => query === queryName) ?? {};
      const dependenciesSatisfied = !dependencies || dependencies?.length && dependencies.every(([dependencyQuery, dependencyPredicate]) => dependencyPredicate(this._embedQueries[dependencyQuery]));
      return queryValue !== appQueryDefault && dependenciesSatisfied;
    });
    const changedParams = Object.fromEntries(changedEntries);
    const previewOverrides = {
      ...changedParams,
      tracking: "false"
    };
    Object.keys(changedParams).forEach(queryName => uRLSearchParams.set(queryName, changedParams[queryName]));
    Object.keys(previewOverrides).forEach(queryName => previewParams.set(queryName, previewOverrides[queryName]));
    const embedUrl = `${urlParts[0]}${uRLSearchParams.size ? "?" : ""}${uRLSearchParams.toString()}`;
    return {
      srcURL: embedUrl,
      iframeString: `<iframe src="${embedUrl}" allowfullscreen ></iframe>`,
      noTrackingIframeString: `<iframe src="${`${urlParts[0]}${previewParams.size ? "?" : ""}${previewParams.toString()}`}" allowfullscreen ></iframe>`
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
      const groupTagName = groupName ? "fieldset" : "div";
      const groupElement = document.createElement(groupTagName);
      groupElement.className = "embed-group";
      groupName && this.createGroupLegend(groupName, groupElement);
      this.createGroupInputs(items, groupElement);
      (isAdvanced ? embedAdvOptsContent : embedOptsContent).appendChild(groupElement);
    });
  }
  createGroupLegend(groupName, groupElement) {
    const legendElement = document.createElement("legend");
    legendElement.innerText = groupName;
    groupElement.appendChild(legendElement);
    return legendElement;
  }
  createGroupInputs(inputOptions, groupElement) {
    inputOptions && inputOptions.forEach(inputOption => {
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
      } = inputOption;
      if (groupName && items) {
        const nestedFieldset = document.createElement("fieldset");
        this.createGroupLegend(groupName, nestedFieldset);
        groupElement.appendChild(nestedFieldset);
        return void this.createGroupInputs(items, nestedFieldset);
      }
      const isRadio = "radio" === type;
      const isDefaultGreyed = inputDefault === greyValue;
      if ("checkbox" === type || "number" === type) {
        const inputContainer = document.createElement("div");
        inputContainer.className = `input-container ${type}-container ${isDefaultGreyed ? "greyed-out" : ""}`;
        const inputId = `input-${query}`;
        const labelElement = document.createElement("label");
        labelElement.className = "clickable";
        labelElement.innerText = name;
        labelElement.setAttribute("for", inputId);
        const inputElement = document.createElement("input");
        if (inputElement.className = "clickable", inputElement.setAttribute("id", inputId), inputElement.setAttribute("type", type), inputElement.setAttribute("name", query), "checkbox" === type && true === inputDefault) inputElement.setAttribute("checked", "");else if ("number" === type) {
          const [minimumValue, maximumValue, stepValue] = values;
          inputElement.setAttribute("min", minimumValue);
          inputElement.setAttribute("max", maximumValue);
          inputElement.setAttribute("step", stepValue ?? 1);
          inputElement.setAttribute("value", inputDefault);
          inputElement.setAttribute("inputmode", "decimal");
          inputElement.setAttribute("required", "");
        } else inputElement.setAttribute("value", inputDefault);
        inputElement.addEventListener("click", clickEvent => clickEvent.stopPropagation());
        inputElement.addEventListener("change", changeEvent => {
          const {
            checked: checked,
            value: value,
            validity: validity
          } = changeEvent.target;
          if ("checkbox" === type) {
            const queryValue = invert ? !checked : checked;
            if (this.updateEmbedParams(query, queryValue), "function" == typeof onChange && onChange(checked), relatedCheckboxesToDisable) for (let relatedIndex = 0; relatedIndex < relatedCheckboxesToDisable.length; relatedIndex++) {
              const relatedInput = document.getElementById(`input-${relatedCheckboxesToDisable[relatedIndex]}`);
              const relatedContainer = relatedInput?.parentElement;
              relatedContainer?.classList.toggle("greyed-out-disabled", checked);
            }
          } else if ("number" === type) {
            const numericValue = parseFloat(value);
            const queryValue = validity.valid ? numericValue : appQueryDefault;
            this.updateEmbedParams(query, queryValue);
            const isGreyed = !validity.valid || numericValue === greyValue;
            inputContainer.classList.toggle("greyed-out", isGreyed);
            "function" == typeof onChange && onChange(value);
          }
        });
        const helpIcon = document.createElement("span");
        helpIcon.className = "clickable icon icon-help";
        helpIcon.setAttribute("data-tippy-content", description);
        helpIcon.setAttribute("aria-label", `Help: ${description}`);
        helpIcon.setAttribute("tabindex", "0");
        inputContainer.appendChild(inputElement);
        inputContainer.appendChild(labelElement);
        inputContainer.appendChild(helpIcon);
        groupElement.appendChild(inputContainer);
      } else if (isRadio) {
        const radioFieldset = document.createElement("fieldset");
        radioFieldset.className = `radio-fieldset ${type}-option`;
        const legendElement = document.createElement("legend");
        legendElement.innerText = name;
        radioFieldset.appendChild(legendElement);
        values.forEach(({
          title: title,
          value: value,
          description: optionDescription
        }) => {
          const radioContainer = document.createElement("div");
          radioContainer.className = `input-container ${type}-container`;
          const radioInputId = `input-${query}-${value}`;
          const radioLabel = document.createElement("label");
          radioLabel.className = "clickable";
          radioLabel.innerText = title;
          radioLabel.setAttribute("for", radioInputId);
          const radioInput = document.createElement("input");
          radioInput.className = "clickable";
          radioInput.setAttribute("id", radioInputId);
          radioInput.setAttribute("type", type);
          radioInput.setAttribute("name", query);
          radioInput.setAttribute("value", value);
          value === inputDefault && radioInput.setAttribute("checked", "");
          radioInput.addEventListener("change", changeEvent => {
            const {
              value: selectedValue
            } = changeEvent.target;
            this.updateEmbedParams(query, selectedValue);
          });
          const helpIcon = document.createElement("span");
          helpIcon.className = "clickable icon icon-help";
          helpIcon.setAttribute("data-tippy-content", optionDescription);
          helpIcon.setAttribute("aria-label", `Help: ${optionDescription}`);
          helpIcon.setAttribute("tabindex", "0");
          radioContainer.appendChild(radioInput);
          radioContainer.appendChild(radioLabel);
          radioContainer.appendChild(helpIcon);
          radioFieldset.appendChild(radioContainer);
        });
        groupElement.appendChild(radioFieldset);
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
    tabHeaders.childNodes.forEach(tabHeader => {
      const isActive = tabHeader.classList.contains(activeTab);
      tabHeader.classList.toggle("active", isActive);
    });
    tabContent.childNodes.forEach(tabPanel => {
      const isActive = tabPanel.classList.contains(activeTab);
      tabPanel.classList.toggle("active", isActive);
    });
    "embed" === activeTab && (this.updateEmbedCode(), null === this._tippySingleton && (this._tippyItems = (0, animateFill.default)(".icon-help"), this._tippySingleton = (0, animateFill.createSingleton)(this._tippyItems, {
      moveTransition: "transform 0.2s ease-out"
    })));
    this._activeTab = activeTab;
  }
  copyToClipboard(clickEvent) {
    const {
      linkCode: linkCode,
      linkContainer: linkContainer,
      embedCode: embedCode,
      copiedOverlay: copiedOverlay
    } = this._children;
    const clipboardText = clickEvent.currentTarget.parentElement === linkContainer ? linkCode.textContent : embedCode?.textContent;
    clipboardText && navigator.clipboard.writeText(clipboardText).then(() => (copiedOverlay.classList.remove("flash"), copiedOverlay.offsetWidth, copiedOverlay.classList.add("flash"), true)).catch(clipboardError => {
      console.error("Could not copy text: ", clipboardError);
    });
  }
  handleClick(clickEvent) {
    const {
      resetOnClose: resetOnClose
    } = this._config;
    (clickEvent.target === this._element || clickEvent.target === this._children.closeButton) && (this.hide(), this.resetScrollbar(), resetOnClose && this.resetEmbedOptions(), this.destroyTooltips());
    "CODE" !== clickEvent.target?.nodeName && window.getSelection().removeAllRanges();
  }
  handleTabClick(clickEvent) {
    const tabName = clickEvent.target?.innerText?.toLowerCase();
    ("link" === tabName || "embed" === tabName) && this.setActiveTab(tabName);
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
  setEnabled(isEnabled) {
    super.setEnabled(isEnabled);
    this.shareButton.classList.toggle("hidden", !isEnabled);
    isEnabled && !this.shareButton.parentNode && this.addShareButtonToParent();
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
