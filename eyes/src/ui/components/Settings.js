// Recovered from app.js:555983-569871.
import * as Unidentified167 from "../../vendor/modules/Unidentified167.js";
import * as animateFill from "../../vendor/modules/animateFill-168.js";
import "../../engine/pioneer/index.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import SettingsTemplate from "../templates/SettingsTemplate.html";
let defaultExport;
var getSettingsTemplate = () => SettingsTemplate;
class Settings extends EyesPublicApi.BaseComponent {
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
  addTooltips(t, e) {
    const i = e.props || {};
    const s = (0, animateFill.default)(t, i);
    if ("function" == typeof e.update) for (const t of s) t.update = e.update;
    if ("function" == typeof e.onclick) for (const t of s) t.popper.onclick = e.onclick;
    this._tooltips.push(...s);
    return 1 === s.length ? s[0] : s;
  }
  updateTooltips(t) {
    for (const e of this._tooltips) "function" == typeof e.update && e.update(t);
  }
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
  getOrientation() {
    return this._ori;
  }
  setOrientation(ori = "") {
    this._ori = ori;
  }
  isHorizontal() {
    if ("" !== this._ori) return "horizontal" === this._ori;
    for (const t in this._config.orientation) {
      const e = this._config.orientation[t];
      if (e.check()) return "horizontal" === e.ori;
    }
    return false;
  }
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
  _zoomContinuously(t) {
    this._isMouseHold = true;
    null !== this._zoomTimeout && clearTimeout(this._zoomTimeout);
    this._zoomTimeout = setTimeout(() => {
      this._isMouseHold && (this._isContinuousZoom = true, null !== this._zoomInterval && clearInterval(this._zoomInterval), this._zoomInterval = setInterval(() => {
        this._isMouseHold ? t(true) : clearInterval(this._zoomInterval);
      }, 30));
    }, 200);
  }
  _zoomIn(t = false) {
    t ? this._zoomContinuously(this._config.zoomIn) : this._config.zoomIn();
  }
  _zoomOut(t = false) {
    t ? this._zoomContinuously(this._config.zoomOut) : this._config.zoomOut();
  }
  _stopZooming() {
    clearInterval(this._zoomInterval);
    this._isMouseHold = false;
    this._isContinuousZoom = false;
  }
  show() {
    this.setState({
      isVisible: true,
      isVisibleClass: this._class.isVisible.true
    });
  }
  hide() {
    this.setState({
      isVisible: false,
      isVisibleClass: this._class.isVisible.false,
      showLightingOptionsClass: this._class.isVisible.false
    });
  }
  isVisible() {
    return this._state.isVisible;
  }
  expand() {
    this.setState({
      isCollapsed: false,
      containerClass: this._class.container.expand
    });
  }
  collapse() {
    this.setState({
      isCollapsed: true,
      showLightingOptionsClass: this._class.isVisible.false,
      containerClass: this._class.container.collapse
    });
  }
  toggleCollapse() {
    this._state.isCollapsed ? this.expand() : this.collapse();
    this.triggerCallbacks("expandtoggle", [!this._state.isCollapsed, this._state.isPhotoMode]);
  }
  toggleUnit() {
    const t = !this._state.isMetric;
    this.setState({
      isMetric: t,
      unitButton: t ? this._class.icon.imperial : this._class.icon.metric
    }, () => {
      this.triggerCallbacks("unitchange", [this._state.isMetric]);
    });
  }
  toggleFullscreen() {
    Unidentified167.default.isEnabled && Unidentified167.default.toggle();
  }
  toggleLayers() {
    !this._app.getComponent("layerPanel").getState("isVisible") ? (this._app.getComponent("layerPanel").show(), this.collapse()) : this._app.getComponent("layerPanel").hide();
  }
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
  hideLightingOptions(t) {
    [this._children.lightToggle, this._children.lightOptions, this._children.flood, this._children.natural, this._children.shadow].includes(t.target) || this.setState({
      showLightingOptionsClass: this._class.isVisible.false
    });
    window.removeEventListener("mousedown", this.hideLightingOptions);
    window.removeEventListener("touchstart", this.hideLightingOptions);
  }
  hideFullScreenOption() {
    const t = {};
    t.allowFullscreenClass = this._class.isItemVisible[false];
    this.setState(t);
  }
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
  toggleLight() {
    this.setState({
      showLightingOptionsClass: this.getState("showLightingOptionsClass") === this._class.isVisible.true ? this._class.isVisible.false : this._class.isVisible.true
    });
    this.getState("showLightingOptionsClass") === this._class.isVisible.true ? (window.addEventListener("mousedown", this.hideLightingOptions), window.addEventListener("touchstart", this.hideLightingOptions)) : (window.removeEventListener("mousedown", this.hideLightingOptions), window.removeEventListener("touchstart", this.hideLightingOptions));
  }
  startGuidedCamera() {
    this.setState({
      isGuidedCamera: true,
      guidedClass: this._class.camera.true
    }, () => this.triggerCallbacks("guidedcamerachange", [this._state.isGuidedCamera]));
  }
  stopGuidedCamera() {
    this.setState({
      isGuidedCamera: false,
      guidedClass: this._class.camera.false
    }, () => this.triggerCallbacks("guidedcamerachange", [this._state.isGuidedCamera]));
  }
  toggleGuidedCamera() {
    this._state.isGuidedCamera ? this.stopGuidedCamera() : this.startGuidedCamera();
  }
  toggleInfoPanel() {
    null !== this._app.getComponent("infoPanel") && this._app.getComponent("infoPanel").openPanel();
  }
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
