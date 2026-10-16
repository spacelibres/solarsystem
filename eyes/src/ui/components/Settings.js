/** @eyes-analysis
 * 文件职责：单位、图层等用户设置的交互界面
 * 依据：imports: ../../vendor/modules/Unidentified167.js, ../../vendor/modules/animateFill-168.js, ../../engine/pioneer/index.js, ../../framework/eyes/public-api.js, ../templates/SettingsTemplate.html；manager dependencies: camera, time, router, comparison
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:555983-569871.
import * as Unidentified167 from "../../vendor/modules/Unidentified167.js";
import * as animateFill from "../../vendor/modules/animateFill-168.js";
import "../../engine/pioneer/index.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import SettingsTemplate from "../templates/SettingsTemplate.html";
let defaultExport;
var getSettingsTemplate = () => SettingsTemplate;
/** @eyes-analysis
 * 类职责：单位、图层等用户设置的交互界面；继承 EyesPublicApi.BaseComponent
 * 继承：EyesPublicApi.BaseComponent；导出：default。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Settings extends EyesPublicApi.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 EyesPublicApi.AppUtils.isPortrait, EyesPublicApi.AppUtils.isMobilePortrait, EyesPublicApi.AppUtils.isTabletPortrait, EyesPublicApi.AppUtils.isLandscape, EyesPublicApi.AppUtils.isMobileLandscape, EyesPublicApi.AppUtils.isTabletLandscape, EyesPublicApi.AppUtils.isPanorama, EyesPublicApi.AppUtils.isMobileMode, Object.assign, this.isHorizontal, this.app.getManager, Manager.getFullLightColor, Manager.getShadowLightColor, this._eventNames.push；写入 _ori, _isMobileMode, _isHorizontal, _fullLightColor, _shadowLightColor, _isMouseHold, _isContinuousZoom, _zoomInterval, _zoomTimeout, _tooltips。
   * 状态写入：_fullLightColor、_isContinuousZoom、_isHorizontal、_isMobileMode、_isMouseHold、_ori、_shadowLightColor、_tooltips等；完整记录见索引。
   * 调用线索：EyesPublicApi.AppUtils.isLandscape、EyesPublicApi.AppUtils.isMobileLandscape、EyesPublicApi.AppUtils.isMobileMode、EyesPublicApi.AppUtils.isMobilePortrait、EyesPublicApi.AppUtils.isPanorama等。
   */
  constructor(t, e = {}) {
    const i = {
      isCollapsible: true,
      allowToggleUnit: false,
      allowLayers: true,
      allowZoom: true,
      allowFullscreen: Unidentified167.default.isEnabled,
      allowPhotoMode: false,
      allowInfoPanel: true,
      allowLighting: true,
      showLightOptions: false,
      allowGuidedCamera: false,
      zoomIn: t.getManager("camera").zoomIn,
      zoomOut: t.getManager("camera").zoomOut,
      ...e.config
    };
    delete e.config;
    i.orientation = {
      bigPortrait: {
        check: i.orientation?.bigPortrait?.check || (() => EyesPublicApi.AppUtils.isPortrait() && !EyesPublicApi.AppUtils.isMobilePortrait() && !EyesPublicApi.AppUtils.isTabletPortrait()),
        ori: i.orientation?.bigPortrait?.ori || "vertical"
      },
      tabletPortrait: {
        check: i.orientation?.tabletPortrait?.check || (() => EyesPublicApi.AppUtils.isTabletPortrait()),
        ori: i.orientation?.tabletPortrait?.ori || "vertical"
      },
      smallPortrait: {
        check: i.orientation?.smallPortrait?.check || (() => EyesPublicApi.AppUtils.isMobilePortrait()),
        ori: i.orientation?.smallPortrait?.ori || "vertical"
      },
      bigLandscape: {
        check: i.orientation?.bigLandscape?.check || (() => EyesPublicApi.AppUtils.isLandscape() && !EyesPublicApi.AppUtils.isMobileLandscape() && !EyesPublicApi.AppUtils.isTabletLandscape()),
        ori: i.orientation?.bigLandscape?.ori || "vertical"
      },
      tabletLandscape: {
        check: i.orientation?.tabletPortrait?.check || (() => EyesPublicApi.AppUtils.isTabletLandscape() || EyesPublicApi.AppUtils.isPanorama()),
        ori: i.orientation?.tabletPortrait?.ori || "vertical"
      },
      smallLandscape: {
        check: i.orientation?.smallLandscape?.check || (() => EyesPublicApi.AppUtils.isMobileLandscape()),
        ori: i.orientation?.smallLandscape?.ori || "horizontal"
      }
    };
    super(t, null, {
      isMetric: false,
      isVisible: true,
      isFullscreen: false,
      isPhotoMode: false,
      isGuidedCamera: true,
      showOrbitLines: true,
      showLabels: true,
      lightType: "shadow",
      config: i,
      ...e
    });
    this._ori = "";
    this._isMobileMode = EyesPublicApi.AppUtils.isMobileMode();
    this._isHorizontal = null;
    Object.assign(this._class, {
      container: {
        collapse: "hidden",
        expand: "active"
      },
      isItemVisible: {
        true: "",
        false: "hidden"
      },
      icon: {
        imperial: "icon-mi",
        metric: "icon-km",
        info: "icon-info"
      },
      fullscreen: {
        true: "fullscreen",
        false: "window"
      },
      photo: {
        true: "active",
        false: ""
      },
      light: {
        natural: "icon-natural-light",
        shadow: "icon-shadow-light",
        flood: "icon-flood-light"
      },
      camera: {
        true: "icon-free-cam",
        false: "icon-auto-cam"
      },
      isHorizontal: {
        true: "horizontal",
        false: "vertical"
      }
    });
    const r = !this._isMobileMode;
    const isMobileMode = this._isMobileMode;
    const l = this.isHorizontal();
    const cameraManager = this.app.getManager("camera");
    this._fullLightColor = cameraManager.getFullLightColor();
    this._shadowLightColor = cameraManager.getShadowLightColor();
    Object.assign(this._state, {
      isVisible: r,
      isCollapsed: isMobileMode,
      isVisibleClass: this._class.isVisible[r],
      containerClass: isMobileMode ? this._class.container.collapse : this._class.container.expand,
      isCollapsibleClass: this._class.isItemVisible[this._config.isCollapsible],
      allowInfoPanelClass: this._class.isItemVisible[this._config.allowInfoPanel],
      allowToggleUnitClass: this._class.isItemVisible[this._config.allowToggleUnit],
      allowPhotoModeClass: this._class.isItemVisible[this._config.allowPhotoMode],
      allowZoomClass: this._class.isItemVisible[this._config.allowZoom],
      allowLightingClass: this._class.isItemVisible[this._config.allowLighting],
      showLightingOptionsClass: this._class.isItemVisible[this._config.showLightOptions],
      allowGuidedCameraClass: this._class.isItemVisible[this._config.allowGuidedCamera],
      allowFullscreenClass: this._class.isItemVisible[this._config.allowFullscreen],
      allowLayersClass: this._class.isItemVisible[this._config.allowLayers],
      unitButton: this._state.isMetric ? this._class.icon.imperial : this._class.icon.metric,
      infoButton: this._class.icon.info,
      fullscreenClass: this._class.fullscreen[this._state.isFullscreen],
      photoModeClass: this._class.photo[this._state.isPhotoMode],
      lightClass: this._class.light[this._state.lightType],
      guidedClass: this._class.camera[this._state.isGuidedCamera],
      isHorizontal: l,
      orientationClass: this._class.isHorizontal[l]
    });
    this._eventNames.push("unitchange", "photomodechange", "guidedcamerachange", "expandtoggle");
    this._initCallbacks();
    this._isMouseHold = false;
    this._isContinuousZoom = false;
    this._zoomInterval = null;
    this._zoomTimeout = null;
    this._tooltips = [];
    animateFill.default.setDefaultProps({
      theme: "default",
      touch: ["hold", 2e3],
      delay: [600, null],
      plugins: [animateFill.followCursor]
    });
    this.bindFunctions(["toggleCollapse", "toggleUnit", "toggleLayers", "toggleFullscreen", "togglePhotoMode", "hideLightingOptions", "toggleLightOptions", "toggleLight", "toggleGuidedCamera", "toggleInfoPanel", "startGuidedCamera", "stopGuidedCamera", "_zoomIn", "_zoomOut", "_stopZooming", "_updateSize"]);
  }
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._children.zoomInButton.addEventListener, this._stopZooming, this._zoomIn, this._children.zoomOutButton.addEventListener, this._zoomOut, this.toggleLightOptions.bind, this._children.shadow.classList.add, this.toggleLightOptions, Unidentified167.default.on, this.setState, this._element.querySelectorAll, this.addTooltips, this.setProps。
   * 状态写入：_children.flood.onclick、_children.natural.onclick、_children.shadow.onclick。
   * 调用线索：Unidentified167.default.on、document.elementFromPoint、document.elementFromPoint(t.changedTouches[0].clientX,t.changedTouches[0].clientY).getAttribute、super.init、t.preventDefault等。
   */
  init() {
    super.init();
    const {
      isCollapsible: isCollapsible,
      allowToggleUnit: allowToggleUnit,
      allowLayers: allowLayers,
      allowZoom: allowZoom,
      allowFullscreen: allowFullscreen,
      allowPhotoMode: allowPhotoMode,
      allowInfoPanel: allowInfoPanel,
      allowLighting: allowLighting,
      allowGuidedCamera: allowGuidedCamera
    } = this._config;
    const h = {};
    isCollapsible && (h.isCollapsibleClass = this._class.isItemVisible[isCollapsible]);
    allowInfoPanel && (h.allowInfoPanelClass = this._class.isItemVisible[allowInfoPanel]);
    allowToggleUnit && (h.allowToggleUnitClass = this._class.isItemVisible[allowToggleUnit]);
    allowPhotoMode && (h.allowPhotoModeClass = this._class.isItemVisible[allowPhotoMode]);
    allowZoom && (h.allowZoomClass = this._class.isItemVisible[allowZoom], this._children.zoomInButton.addEventListener("mousedown", () => {
      this._stopZooming();
      this._zoomIn(true);
    }), this._children.zoomInButton.addEventListener("mouseleave", this._stopZooming), this._children.zoomInButton.addEventListener("mouseup", () => {
      this._isContinuousZoom || this._zoomIn();
      this._stopZooming();
    }), this._children.zoomInButton.addEventListener("touchstart", t => {
      t.preventDefault();
      this._stopZooming();
      this._zoomIn(true);
    }), this._children.zoomInButton.addEventListener("touchmove", t => {
      t.preventDefault();
      "zoomInButton" !== document.elementFromPoint(t.changedTouches[0].clientX, t.changedTouches[0].clientY).getAttribute("key") && this._stopZooming();
    }), this._children.zoomInButton.addEventListener("touchend", t => {
      t.preventDefault();
      this._isContinuousZoom || this._zoomIn();
      this._stopZooming();
    }), this._children.zoomOutButton.addEventListener("mousedown", () => {
      this._stopZooming();
      this._zoomOut(true);
    }), this._children.zoomOutButton.addEventListener("mouseleave", this._stopZooming), this._children.zoomOutButton.addEventListener("mouseup", () => {
      this._isContinuousZoom || this._zoomOut();
      this._stopZooming();
    }), this._children.zoomOutButton.addEventListener("touchstart", t => {
      t.preventDefault();
      this._stopZooming();
      this._zoomOut(true);
    }), this._children.zoomOutButton.addEventListener("touchmove", t => {
      t.preventDefault();
      "zoomOutButton" !== document.elementFromPoint(t.changedTouches[0].clientX, t.changedTouches[0].clientY).getAttribute("key") && this._stopZooming();
    }), this._children.zoomOutButton.addEventListener("touchend", t => {
      t.preventDefault();
      this._isContinuousZoom || this._zoomOut();
      this._stopZooming();
    }));
    allowLighting && (h.allowLightingClass = this._class.isItemVisible[allowLighting], this._children.flood.onclick = this.toggleLightOptions.bind(this._children.flood, "flood"), this._children.shadow.onclick = this.toggleLightOptions.bind(this._children.shadow, "shadow"), this._children.natural.onclick = this.toggleLightOptions.bind(this._children.natural, "natural"), this._children.shadow.classList.add("selected-lighting"), this.toggleLightOptions("shadow"));
    allowGuidedCamera && (h.allowGuidedCameraClass = this._class.isItemVisible[allowGuidedCamera]);
    allowFullscreen && Unidentified167.default.isEnabled && (h.allowFullscreenClass = this._class.isItemVisible[allowFullscreen], Unidentified167.default.on("change", () => {
      const t = Unidentified167.default.isFullscreen;
      this.setState({
        isFullscreen: t,
        fullscreenClass: this._class.fullscreen[t]
      });
    }));
    allowLayers && (h.allowLayersClass = this._class.isItemVisible[allowLayers]);
    this.setState(h);
    const d = this._element.querySelectorAll('.settings button:not(.zoom), span[key="zoomInButton"], span[key="zoomOutButton"]');
    this.addTooltips(d, {
      update: function (t) {
        this.setProps({
          placement: t ? "top" : "left"
        });
      }
    });
    this._updateSize();
    this._callbackRegistry.push({
      emitter: this._app.getManager("time"),
      event: "ratechange",
      callback: this.onRateChange
    });
  }
  /** @eyes-analysis
   * 执行 addTooltips 对应的组件业务步骤；调用 this._tooltips.push。
   * 调用线索：0,animateFill.default、this._tooltips.push。
   */
  addTooltips(t, e) {
    const i = e.props || {};
    const s = (0, animateFill.default)(t, i);
    if ("function" == typeof e.update) for (const t of s) t.update = e.update;
    if ("function" == typeof e.onclick) for (const t of s) t.popper.onclick = e.onclick;
    this._tooltips.push(...s);
    return 1 === s.length ? s[0] : s;
  }
  /** @eyes-analysis
   * 执行 updateTooltips 对应的组件业务步骤。
   * 调用线索：e.update。
   */
  updateTooltips(t) {
    for (const e of this._tooltips) "function" == typeof e.update && e.update(t);
  }
  /** @eyes-analysis
   * 执行 setConfig 对应的组件业务步骤；调用 this.app.getManager, super.setConfig, this.isHorizontal, this.setState, this.collapse, this.hideFullScreenOption, this.toggleLightOptions, this._updateSize。
   * 调用线索：super.setConfig、this._updateSize、this.app.getManager、this.collapse、this.hideFullScreenOption等。
   */
  setConfig(t) {
    const {
      collapseSettingsOptions: collapseSettingsOptions,
      hideFullScreenToggle: hideFullScreenToggle,
      lighting: lighting
    } = this.app.getManager("router").configs;
    if (t.allowFullscreen && true !== hideFullScreenToggle && (t.allowFullscreen = Unidentified167.default.isEnabled), t.orientation) {
      const e = this._config.orientation;
      const i = ["bigPortrait", "tabletPortrait", "smallPortrait", "bigLandscape", "tabletLandscape", "smallLandscape"];
      for (let s = 0; s < i.length; s++) {
        const n = i[s];
        t.orientation[n] ? (t.orientation[n].check ??= e[n].check, t.orientation[n].ori ??= e[n].ori) : t.orientation[n] = e[n];
      }
    }
    super.setConfig(t);
    const o = {};
    for (const e in t) if ("orientation" === e) {
      const t = this.isHorizontal();
      o.isHorizontal = t;
      o[`${e}Class`] = this._class.isHorizontal[t];
    } else o[`${e}Class`] = this._class.isItemVisible[t[e]];
    this.setState(o);
    true === collapseSettingsOptions && this.collapse();
    true === hideFullScreenToggle && this.hideFullScreenOption();
    "flood" !== lighting && "natural" !== lighting || this.toggleLightOptions(lighting);
    this._updateSize(true);
  }
  /** @eyes-analysis
   * 执行 getOrientation 对应的组件业务步骤。
   */
  getOrientation() {
    return this._ori;
  }
  /** @eyes-analysis
   * 执行 setOrientation 对应的组件业务步骤；写入 _ori。
   * 状态写入：_ori。
   */
  setOrientation(ori = "") {
    this._ori = ori;
  }
  /** @eyes-analysis
   * 执行 isHorizontal 对应的组件业务步骤。
   * 调用线索：e.check。
   */
  isHorizontal() {
    if ("" !== this._ori) return "horizontal" === this._ori;
    for (const t in this._config.orientation) {
      const e = this._config.orientation[t];
      if (e.check()) return "horizontal" === e.ori;
    }
    return false;
  }
  /** @eyes-analysis
   * 执行 _updateSize 对应的组件业务步骤；调用 this.isHorizontal, Array.from, this._children.content.querySelectorAll, List.contains, this.updateTooltips；写入 _isHorizontal。
   * 状态写入：_element.style.height、_element.style.width、_isHorizontal。
   * 调用线索：Array.from、s[t].classList.contains、this._children.content.querySelectorAll、this.isHorizontal、this.updateTooltips。
   */
  _updateSize(t = false) {
    const isHorizontal = this.isHorizontal();
    if (!t && this._isHorizontal === isHorizontal) return;
    this._isHorizontal = isHorizontal;
    let i = 1;
    const s = Array.from(this._children.content.querySelectorAll(":scope > button"));
    for (let t = 0; t < s.length; t++) s[t].classList.contains("hidden") || i++;
    this._config.allowZoom && i++;
    this._isHorizontal ? (this._element.style.width = `calc(${i} * 30px + ${i} * 2px)`, this._element.style.height = "30px") : (this._element.style.width = "30px", this._element.style.height = `calc(${i} * 30px + ${i} * 2px)`);
    this.updateTooltips(isHorizontal);
  }
  /** @eyes-analysis
   * 执行 _zoomContinuously 对应的组件业务步骤；写入 _isMouseHold, _zoomTimeout, _isContinuousZoom, _zoomInterval。
   * 状态写入：_isContinuousZoom、_isMouseHold、_zoomInterval、_zoomTimeout。
   * 调用线索：clearInterval、clearTimeout、setInterval、setTimeout、t。
   */
  _zoomContinuously(t) {
    this._isMouseHold = true;
    null !== this._zoomTimeout && clearTimeout(this._zoomTimeout);
    this._zoomTimeout = setTimeout(() => {
      this._isMouseHold && (this._isContinuousZoom = true, null !== this._zoomInterval && clearInterval(this._zoomInterval), this._zoomInterval = setInterval(() => {
        this._isMouseHold ? t(true) : clearInterval(this._zoomInterval);
      }, 30));
    }, 200);
  }
  /** @eyes-analysis
   * 执行 _zoomIn 对应的组件业务步骤；调用 this._zoomContinuously, this._config.zoomIn。
   * 调用线索：this._config.zoomIn、this._zoomContinuously。
   */
  _zoomIn(t = false) {
    t ? this._zoomContinuously(this._config.zoomIn) : this._config.zoomIn();
  }
  /** @eyes-analysis
   * 执行 _zoomOut 对应的组件业务步骤；调用 this._zoomContinuously, this._config.zoomOut。
   * 调用线索：this._config.zoomOut、this._zoomContinuously。
   */
  _zoomOut(t = false) {
    t ? this._zoomContinuously(this._config.zoomOut) : this._config.zoomOut();
  }
  /** @eyes-analysis
   * 执行 _stopZooming 对应的组件业务步骤；写入 _isMouseHold, _isContinuousZoom。
   * 状态写入：_isContinuousZoom、_isMouseHold。
   * 调用线索：clearInterval。
   */
  _stopZooming() {
    clearInterval(this._zoomInterval);
    this._isMouseHold = false;
    this._isContinuousZoom = false;
  }
  /** @eyes-analysis
   * 执行 show 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  show() {
    this.setState({
      isVisible: true,
      isVisibleClass: this._class.isVisible.true
    });
  }
  /** @eyes-analysis
   * 执行 hide 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  hide() {
    this.setState({
      isVisible: false,
      isVisibleClass: this._class.isVisible.false,
      showLightingOptionsClass: this._class.isVisible.false
    });
  }
  /** @eyes-analysis
   * 执行 isVisible 对应的组件业务步骤。
   */
  isVisible() {
    return this._state.isVisible;
  }
  /** @eyes-analysis
   * 执行 expand 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  expand() {
    this.setState({
      isCollapsed: false,
      containerClass: this._class.container.expand
    });
  }
  /** @eyes-analysis
   * 执行 collapse 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  collapse() {
    this.setState({
      isCollapsed: true,
      showLightingOptionsClass: this._class.isVisible.false,
      containerClass: this._class.container.collapse
    });
  }
  /** @eyes-analysis
   * 执行 toggleCollapse 对应的组件业务步骤；调用 this.expand, this.collapse, this.triggerCallbacks。
   * 调用线索：this.collapse、this.expand、this.triggerCallbacks。
   */
  toggleCollapse() {
    this._state.isCollapsed ? this.expand() : this.collapse();
    this.triggerCallbacks("expandtoggle", [!this._state.isCollapsed, this._state.isPhotoMode]);
  }
  /** @eyes-analysis
   * 执行 toggleUnit 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
   * 调用线索：this.setState、this.triggerCallbacks。
   */
  toggleUnit() {
    const t = !this._state.isMetric;
    this.setState({
      isMetric: t,
      unitButton: t ? this._class.icon.imperial : this._class.icon.metric
    }, () => {
      this.triggerCallbacks("unitchange", [this._state.isMetric]);
    });
  }
  /** @eyes-analysis
   * 执行 toggleFullscreen 对应的组件业务步骤；调用 Unidentified167.default.toggle。
   * 调用线索：Unidentified167.default.toggle。
   */
  toggleFullscreen() {
    Unidentified167.default.isEnabled && Unidentified167.default.toggle();
  }
  /** @eyes-analysis
   * 执行 toggleLayers 对应的组件业务步骤；调用 this._app.getComponent, this.collapse。
   * 调用线索：this._app.getComponent、this._app.getComponent("layerPanel").getState、this._app.getComponent("layerPanel").hide、this._app.getComponent("layerPanel").show、this.collapse。
   */
  toggleLayers() {
    !this._app.getComponent("layerPanel").getState("isVisible") ? (this._app.getComponent("layerPanel").show(), this.collapse()) : this._app.getComponent("layerPanel").hide();
  }
  /** @eyes-analysis
   * 执行 togglePhotoMode 对应的组件业务步骤；调用 this.setState, this.collapse, this.expand, this.triggerCallbacks。
   * 调用线索：this.collapse、this.expand、this.setState、this.triggerCallbacks。
   */
  togglePhotoMode() {
    const t = !this._state.isPhotoMode;
    this.setState({
      isPhotoMode: t,
      photoModeClass: this._class.photo[t]
    }, () => {
      this._state.isPhotoMode ? this.collapse() : this.expand();
      this.triggerCallbacks("photomodechange", [this._state.isPhotoMode]);
    });
  }
  /** @eyes-analysis
   * 执行 hideLightingOptions 对应的组件业务步骤；调用 this.setState。
   * 调用线索：[this._children.lightToggle,this._children.lightOptions,this._children.flood,this._children.natural,this._children.shadow].includes、this.setState、window.removeEventListener。
   */
  hideLightingOptions(t) {
    [this._children.lightToggle, this._children.lightOptions, this._children.flood, this._children.natural, this._children.shadow].includes(t.target) || this.setState({
      showLightingOptionsClass: this._class.isVisible.false
    });
    window.removeEventListener("mousedown", this.hideLightingOptions);
    window.removeEventListener("touchstart", this.hideLightingOptions);
  }
  /** @eyes-analysis
   * 执行 hideFullScreenOption 对应的组件业务步骤；调用 this.setState。
   * 调用线索：this.setState。
   */
  hideFullScreenOption() {
    const t = {};
    t.allowFullscreenClass = this._class.isItemVisible[false];
    this.setState(t);
  }
  /** @eyes-analysis
   * 执行 toggleLightOptions 对应的组件业务步骤；调用 this.setState, this._app.getManager, List.remove, List.add。
   * 调用线索：this._app.getManager、this._app.getManager("camera")?.toggleCameraLight、this._app.getManager("comparison")?.setCameraLight、this._children[`${t}`].classList.add、this._children[e].classList.remove等。
   */
  toggleLightOptions(t) {
    this.setState({
      lightType: t,
      lightClass: this._class.light[t],
      showLightingOptionsClass: this._class.isVisible.false
    }, () => {
      "flood" === t ? (this._app.getManager("camera")?.toggleCameraLight(true, this._fullLightColor), this._app.getManager("comparison")?.setCameraLight(true, this._fullLightColor)) : "natural" === t ? (this._app.getManager("camera")?.toggleCameraLight(false), this._app.getManager("comparison")?.setCameraLight(false)) : "shadow" === t && (this._app.getManager("camera")?.toggleCameraLight(true, this._shadowLightColor), this._app.getManager("comparison")?.setCameraLight(true, this._shadowLightColor));
      for (const e in this._children) e === t || "flood" !== e && "natural" !== e && "shadow" !== e || this._children[e].classList.remove("selected-lighting");
      this._children[`${t}`].classList.add("selected-lighting");
    });
  }
  /** @eyes-analysis
   * 执行 toggleLight 对应的组件业务步骤；调用 this.setState, this.getState。
   * 调用线索：this.getState、this.setState、window.addEventListener、window.removeEventListener。
   */
  toggleLight() {
    this.setState({
      showLightingOptionsClass: this.getState("showLightingOptionsClass") === this._class.isVisible.true ? this._class.isVisible.false : this._class.isVisible.true
    });
    this.getState("showLightingOptionsClass") === this._class.isVisible.true ? (window.addEventListener("mousedown", this.hideLightingOptions), window.addEventListener("touchstart", this.hideLightingOptions)) : (window.removeEventListener("mousedown", this.hideLightingOptions), window.removeEventListener("touchstart", this.hideLightingOptions));
  }
  /** @eyes-analysis
   * 执行 startGuidedCamera 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
   * 调用线索：this.setState、this.triggerCallbacks。
   */
  startGuidedCamera() {
    this.setState({
      isGuidedCamera: true,
      guidedClass: this._class.camera.true
    }, () => this.triggerCallbacks("guidedcamerachange", [this._state.isGuidedCamera]));
  }
  /** @eyes-analysis
   * 执行 stopGuidedCamera 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
   * 调用线索：this.setState、this.triggerCallbacks。
   */
  stopGuidedCamera() {
    this.setState({
      isGuidedCamera: false,
      guidedClass: this._class.camera.false
    }, () => this.triggerCallbacks("guidedcamerachange", [this._state.isGuidedCamera]));
  }
  /** @eyes-analysis
   * 执行 toggleGuidedCamera 对应的组件业务步骤；调用 this.stopGuidedCamera, this.startGuidedCamera。
   * 调用线索：this.startGuidedCamera、this.stopGuidedCamera。
   */
  toggleGuidedCamera() {
    this._state.isGuidedCamera ? this.stopGuidedCamera() : this.startGuidedCamera();
  }
  /** @eyes-analysis
   * 执行 toggleInfoPanel 对应的组件业务步骤；调用 this._app.getComponent。
   * 调用线索：this._app.getComponent、this._app.getComponent("infoPanel").openPanel。
   */
  toggleInfoPanel() {
    null !== this._app.getComponent("infoPanel") && this._app.getComponent("infoPanel").openPanel();
  }
  /** @eyes-analysis
   * 重排响应式界面；调用 super.resize, this.isHorizontal, this.setState, this._updateSize。
   * 调用线索：super.resize、this._updateSize、this.isHorizontal、this.setState。
   */
  resize() {
    super.resize();
    const t = this.isHorizontal();
    this._isHorizontal !== t && this.setState({
      isHorizontal: t,
      orientationClass: this._class.isHorizontal[t]
    });
    this._updateSize();
  }
}
Settings.html = getSettingsTemplate();
defaultExport = Settings;
export { defaultExport as default };
