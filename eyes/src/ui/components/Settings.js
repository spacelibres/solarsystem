// Recovered from app.js:555983-569871.
import * as Unidentified167 from "../../vendor/modules/Unidentified167.js";
import * as animateFill from "../../vendor/modules/animateFill-168.js";
import "../../engine/pioneer/index.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import SettingsTemplate from "../templates/SettingsTemplate.html";
let defaultExport;
var getSettingsTemplate = () => SettingsTemplate;
/* 能力配置与按钮状态分离：视图可临时替换 zoom 回调和显示能力，方向规则按设备顺序匹配。长按缩放先等待阈值再开启 interval，松开重置持续缩放标记；光照同时同步常规相机与比较管理器。 */
class Settings extends EyesPublicApi.BaseComponent {
  constructor(app, options = {}) {
    const settingsConfig = {
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
      zoomIn: app.getManager("camera").zoomIn,
      zoomOut: app.getManager("camera").zoomOut,
      ...options.config
    };
    delete options.config;
    settingsConfig.orientation = {
      bigPortrait: {
        check: settingsConfig.orientation?.bigPortrait?.check || (() => EyesPublicApi.AppUtils.isPortrait() && !EyesPublicApi.AppUtils.isMobilePortrait() && !EyesPublicApi.AppUtils.isTabletPortrait()),
        ori: settingsConfig.orientation?.bigPortrait?.ori || "vertical"
      },
      tabletPortrait: {
        check: settingsConfig.orientation?.tabletPortrait?.check || (() => EyesPublicApi.AppUtils.isTabletPortrait()),
        ori: settingsConfig.orientation?.tabletPortrait?.ori || "vertical"
      },
      smallPortrait: {
        check: settingsConfig.orientation?.smallPortrait?.check || (() => EyesPublicApi.AppUtils.isMobilePortrait()),
        ori: settingsConfig.orientation?.smallPortrait?.ori || "vertical"
      },
      bigLandscape: {
        check: settingsConfig.orientation?.bigLandscape?.check || (() => EyesPublicApi.AppUtils.isLandscape() && !EyesPublicApi.AppUtils.isMobileLandscape() && !EyesPublicApi.AppUtils.isTabletLandscape()),
        ori: settingsConfig.orientation?.bigLandscape?.ori || "vertical"
      },
      tabletLandscape: {
        check: settingsConfig.orientation?.tabletPortrait?.check || (() => EyesPublicApi.AppUtils.isTabletLandscape() || EyesPublicApi.AppUtils.isPanorama()),
        ori: settingsConfig.orientation?.tabletPortrait?.ori || "vertical"
      },
      smallLandscape: {
        check: settingsConfig.orientation?.smallLandscape?.check || (() => EyesPublicApi.AppUtils.isMobileLandscape()),
        ori: settingsConfig.orientation?.smallLandscape?.ori || "horizontal"
      }
    };
    super(app, null, {
      isMetric: false,
      isVisible: true,
      isFullscreen: false,
      isPhotoMode: false,
      isGuidedCamera: true,
      showOrbitLines: true,
      showLabels: true,
      lightType: "shadow",
      config: settingsConfig,
      ...options
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
    const initiallyVisible = !this._isMobileMode;
    const isMobileMode = this._isMobileMode;
    const isHorizontal = this.isHorizontal();
    const cameraManager = this.app.getManager("camera");
    this._fullLightColor = cameraManager.getFullLightColor();
    this._shadowLightColor = cameraManager.getShadowLightColor();
    Object.assign(this._state, {
      isVisible: initiallyVisible,
      isCollapsed: isMobileMode,
      isVisibleClass: this._class.isVisible[initiallyVisible],
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
      isHorizontal: isHorizontal,
      orientationClass: this._class.isHorizontal[isHorizontal]
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
    const visibilityState = {};
    isCollapsible && (visibilityState.isCollapsibleClass = this._class.isItemVisible[isCollapsible]);
    allowInfoPanel && (visibilityState.allowInfoPanelClass = this._class.isItemVisible[allowInfoPanel]);
    allowToggleUnit && (visibilityState.allowToggleUnitClass = this._class.isItemVisible[allowToggleUnit]);
    allowPhotoMode && (visibilityState.allowPhotoModeClass = this._class.isItemVisible[allowPhotoMode]);
    allowZoom && (visibilityState.allowZoomClass = this._class.isItemVisible[allowZoom], this._children.zoomInButton.addEventListener("mousedown", () => {
      this._stopZooming();
      this._zoomIn(true);
    }), this._children.zoomInButton.addEventListener("mouseleave", this._stopZooming), this._children.zoomInButton.addEventListener("mouseup", () => {
      this._isContinuousZoom || this._zoomIn();
      this._stopZooming();
    }), this._children.zoomInButton.addEventListener("touchstart", touchEvent => {
      touchEvent.preventDefault();
      this._stopZooming();
      this._zoomIn(true);
    }), this._children.zoomInButton.addEventListener("touchmove", touchEvent => {
      touchEvent.preventDefault();
      "zoomInButton" !== document.elementFromPoint(touchEvent.changedTouches[0].clientX, touchEvent.changedTouches[0].clientY).getAttribute("key") && this._stopZooming();
    }), this._children.zoomInButton.addEventListener("touchend", touchEvent => {
      touchEvent.preventDefault();
      this._isContinuousZoom || this._zoomIn();
      this._stopZooming();
    }), this._children.zoomOutButton.addEventListener("mousedown", () => {
      this._stopZooming();
      this._zoomOut(true);
    }), this._children.zoomOutButton.addEventListener("mouseleave", this._stopZooming), this._children.zoomOutButton.addEventListener("mouseup", () => {
      this._isContinuousZoom || this._zoomOut();
      this._stopZooming();
    }), this._children.zoomOutButton.addEventListener("touchstart", touchEvent => {
      touchEvent.preventDefault();
      this._stopZooming();
      this._zoomOut(true);
    }), this._children.zoomOutButton.addEventListener("touchmove", touchEvent => {
      touchEvent.preventDefault();
      "zoomOutButton" !== document.elementFromPoint(touchEvent.changedTouches[0].clientX, touchEvent.changedTouches[0].clientY).getAttribute("key") && this._stopZooming();
    }), this._children.zoomOutButton.addEventListener("touchend", touchEvent => {
      touchEvent.preventDefault();
      this._isContinuousZoom || this._zoomOut();
      this._stopZooming();
    }));
    allowLighting && (visibilityState.allowLightingClass = this._class.isItemVisible[allowLighting], this._children.flood.onclick = this.toggleLightOptions.bind(this._children.flood, "flood"), this._children.shadow.onclick = this.toggleLightOptions.bind(this._children.shadow, "shadow"), this._children.natural.onclick = this.toggleLightOptions.bind(this._children.natural, "natural"), this._children.shadow.classList.add("selected-lighting"), this.toggleLightOptions("shadow"));
    allowGuidedCamera && (visibilityState.allowGuidedCameraClass = this._class.isItemVisible[allowGuidedCamera]);
    allowFullscreen && Unidentified167.default.isEnabled && (visibilityState.allowFullscreenClass = this._class.isItemVisible[allowFullscreen], Unidentified167.default.on("change", () => {
      const isFullscreen = Unidentified167.default.isFullscreen;
      this.setState({
        isFullscreen: isFullscreen,
        fullscreenClass: this._class.fullscreen[isFullscreen]
      });
    }));
    allowLayers && (visibilityState.allowLayersClass = this._class.isItemVisible[allowLayers]);
    this.setState(visibilityState);
    const tooltipElements = this._element.querySelectorAll('.settings button:not(.zoom), span[key="zoomInButton"], span[key="zoomOutButton"]');
    this.addTooltips(tooltipElements, {
      update: function (isHorizontal) {
        this.setProps({
          placement: isHorizontal ? "top" : "left"
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
  addTooltips(elements, tooltipOptions) {
    const tooltipProps = tooltipOptions.props || {};
    const tooltipInstances = (0, animateFill.default)(elements, tooltipProps);
    if ("function" == typeof tooltipOptions.update) for (const tooltip of tooltipInstances) tooltip.update = tooltipOptions.update;
    if ("function" == typeof tooltipOptions.onclick) for (const tooltip of tooltipInstances) tooltip.popper.onclick = tooltipOptions.onclick;
    this._tooltips.push(...tooltipInstances);
    return 1 === tooltipInstances.length ? tooltipInstances[0] : tooltipInstances;
  }
  updateTooltips(isHorizontal) {
    for (const tooltip of this._tooltips) "function" == typeof tooltip.update && tooltip.update(isHorizontal);
  }
  setConfig(configUpdates) {
    const {
      collapseSettingsOptions: collapseSettingsOptions,
      hideFullScreenToggle: hideFullScreenToggle,
      lighting: lighting
    } = this.app.getManager("router").configs;
    if (configUpdates.allowFullscreen && true !== hideFullScreenToggle && (configUpdates.allowFullscreen = Unidentified167.default.isEnabled), configUpdates.orientation) {
      const previousOrientation = this._config.orientation;
      const orientationNames = ["bigPortrait", "tabletPortrait", "smallPortrait", "bigLandscape", "tabletLandscape", "smallLandscape"];
      for (let orientationIndex = 0; orientationIndex < orientationNames.length; orientationIndex++) {
        const orientationName = orientationNames[orientationIndex];
        configUpdates.orientation[orientationName] ? (configUpdates.orientation[orientationName].check ??= previousOrientation[orientationName].check, configUpdates.orientation[orientationName].ori ??= previousOrientation[orientationName].ori) : configUpdates.orientation[orientationName] = previousOrientation[orientationName];
      }
    }
    super.setConfig(configUpdates);
    const visibilityState = {};
    for (const configKey in configUpdates) if ("orientation" === configKey) {
      const isHorizontal = this.isHorizontal();
      visibilityState.isHorizontal = isHorizontal;
      visibilityState[`${configKey}Class`] = this._class.isHorizontal[isHorizontal];
    } else visibilityState[`${configKey}Class`] = this._class.isItemVisible[configUpdates[configKey]];
    this.setState(visibilityState);
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
    for (const orientationName in this._config.orientation) {
      const orientationRule = this._config.orientation[orientationName];
      if (orientationRule.check()) return "horizontal" === orientationRule.ori;
    }
    return false;
  }
  _updateSize(forceUpdate = false) {
    const isHorizontal = this.isHorizontal();
    if (!forceUpdate && this._isHorizontal === isHorizontal) return;
    this._isHorizontal = isHorizontal;
    let visibleButtonCount = 1;
    const buttons = Array.from(this._children.content.querySelectorAll(":scope > button"));
    for (let buttonIndex = 0; buttonIndex < buttons.length; buttonIndex++) buttons[buttonIndex].classList.contains("hidden") || visibleButtonCount++;
    this._config.allowZoom && visibleButtonCount++;
    this._isHorizontal ? (this._element.style.width = `calc(${visibleButtonCount} * 30px + ${visibleButtonCount} * 2px)`, this._element.style.height = "30px") : (this._element.style.width = "30px", this._element.style.height = `calc(${visibleButtonCount} * 30px + ${visibleButtonCount} * 2px)`);
    this.updateTooltips(isHorizontal);
  }
  _zoomContinuously(zoomCallback) {
    this._isMouseHold = true;
    null !== this._zoomTimeout && clearTimeout(this._zoomTimeout);
    this._zoomTimeout = setTimeout(() => {
      this._isMouseHold && (this._isContinuousZoom = true, null !== this._zoomInterval && clearInterval(this._zoomInterval), this._zoomInterval = setInterval(() => {
        this._isMouseHold ? zoomCallback(true) : clearInterval(this._zoomInterval);
      }, 30));
    }, 200);
  }
  _zoomIn(startContinuous = false) {
    startContinuous ? this._zoomContinuously(this._config.zoomIn) : this._config.zoomIn();
  }
  _zoomOut(startContinuous = false) {
    startContinuous ? this._zoomContinuously(this._config.zoomOut) : this._config.zoomOut();
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
    const isMetric = !this._state.isMetric;
    this.setState({
      isMetric: isMetric,
      unitButton: isMetric ? this._class.icon.imperial : this._class.icon.metric
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
    const isPhotoMode = !this._state.isPhotoMode;
    this.setState({
      isPhotoMode: isPhotoMode,
      photoModeClass: this._class.photo[isPhotoMode]
    }, () => {
      this._state.isPhotoMode ? this.collapse() : this.expand();
      this.triggerCallbacks("photomodechange", [this._state.isPhotoMode]);
    });
  }
  hideLightingOptions(pointerEvent) {
    [this._children.lightToggle, this._children.lightOptions, this._children.flood, this._children.natural, this._children.shadow].includes(pointerEvent.target) || this.setState({
      showLightingOptionsClass: this._class.isVisible.false
    });
    window.removeEventListener("mousedown", this.hideLightingOptions);
    window.removeEventListener("touchstart", this.hideLightingOptions);
  }
  hideFullScreenOption() {
    const visibilityState = {};
    visibilityState.allowFullscreenClass = this._class.isItemVisible[false];
    this.setState(visibilityState);
  }
  toggleLightOptions(lightType) {
    this.setState({
      lightType: lightType,
      lightClass: this._class.light[lightType],
      showLightingOptionsClass: this._class.isVisible.false
    }, () => {
      "flood" === lightType ? (this._app.getManager("camera")?.toggleCameraLight(true, this._fullLightColor), this._app.getManager("comparison")?.setCameraLight(true, this._fullLightColor)) : "natural" === lightType ? (this._app.getManager("camera")?.toggleCameraLight(false), this._app.getManager("comparison")?.setCameraLight(false)) : "shadow" === lightType && (this._app.getManager("camera")?.toggleCameraLight(true, this._shadowLightColor), this._app.getManager("comparison")?.setCameraLight(true, this._shadowLightColor));
      for (const childKey in this._children) childKey === lightType || "flood" !== childKey && "natural" !== childKey && "shadow" !== childKey || this._children[childKey].classList.remove("selected-lighting");
      this._children[`${lightType}`].classList.add("selected-lighting");
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
    const isHorizontal = this.isHorizontal();
    this._isHorizontal !== isHorizontal && this.setState({
      isHorizontal: isHorizontal,
      orientationClass: this._class.isHorizontal[isHorizontal]
    });
    this._updateSize();
  }
}
Settings.html = getSettingsTemplate();
defaultExport = Settings;
export { defaultExport as default };
