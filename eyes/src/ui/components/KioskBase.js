// Recovered from app.js:678761-685479.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import * as Pioneer from "../../engine/pioneer/index.js";
import KioskBaseTemplate from "../templates/KioskBaseTemplate.html";
import "../../styles/extracted/KioskBaseStyles.js";
var getKioskBaseTemplate = () => KioskBaseTemplate;
/* 会话与空闲分别使用独立 interval，交互时清理并重新启动空闲计时；重置应用等待相机转换再归还实时模式。组件显隐与启用配置分开保存，避免混淆暂时隐藏和停止订阅。 */
class KioskBase extends EyesPublicApi.BaseComponent {
  static screenLastClicked = Math.ceil(Pioneer.TimeUtils.now());
  constructor(app, options = {}) {
    super(app, null, {
      isVisible: false,
      loadingTextVisibleClass: "hidden",
      sessionEndVisibleClass: "hidden",
      autoplayVisibleClass: "hidden",
      sessionTimerVisibleClass: "hidden",
      continueButtonVisibleClass: "",
      forceRestartClass: "",
      ...options
    });
    this._router = this.app.getManager("router");
    this.inactivityInterval = null;
    this.sessionInterval = null;
    this.timeOfDaySessionStarted = Math.ceil(Pioneer.TimeUtils.now());
    this.componentDefaultVisibility = {
      menu: false,
      shareModal: false,
      infoPanel: false,
      layerPanel: false,
      featuredStoriesPanel: true,
      timecontrolsCollapsible: true
    };
    this.componentEnabledAutoplay = {
      breadcrumb: false
    };
  }
  init() {
    super.init();
    this.app.pioneer.getScene("main").getLoadedPromise().then(() => {
      this.resetLastClicked();
      this.validateQueries();
      const {
        maxSessionTime: maxSessionTime,
        maxInactivityTime: maxInactivityTime,
        forceRestart: forceRestart
      } = this._router.configs;
      this._isValidTime(maxSessionTime) && (this.maxSessionTime = EyesPublicApi.AppUtils.minToSec(maxSessionTime), this.setUpSessionTimerComponent(), this.startSessionTimer(), true === forceRestart && this.setState({
        continueButtonVisibleClass: "hidden",
        forceRestartClass: "force-restart"
      }));
      this._isValidTime(maxInactivityTime) && !this.inactivityInterval && (this.maxInactivityTime = EyesPublicApi.AppUtils.minToSec(maxInactivityTime), this.startInactivityTimer());
      return true;
    }).catch(loadError => {
      console.warn(loadError);
    });
  }
  validateQueries() {
    const {
      maxSessionTime: maxSessionTime,
      maxInactivityTime: maxInactivityTime
    } = this._router.configs;
    const validConfigs = {};
    for (const [configKey, configValue] of Object.entries(this._router.configs)) configValue && (validConfigs[configKey] = configValue);
    for (const configKey in validConfigs) configKey.toLowerCase().includes("time") && !this._isValidTime(validConfigs[configKey]) && delete validConfigs[configKey];
    const {
      maxSessionTime: validSessionTime,
      maxInactivityTime: validInactivityTime
    } = validConfigs;
    this._isValidTime(validSessionTime) && this._isValidTime(validInactivityTime) && (Math.abs(maxSessionTime - maxInactivityTime) <= .05 && maxSessionTime > 0 && maxInactivityTime > 0 ? validConfigs.maxInactivityTime = maxSessionTime + .1 : maxSessionTime >= maxInactivityTime && (0 === maxInactivityTime ? delete validConfigs.maxSessionTime : validConfigs.maxInactivityTime = maxSessionTime + 1));
    this._router.setConfig("maxSessionTime", validConfigs.maxSessionTime);
    this._router.setConfig("maxInactivityTime", validConfigs.maxInactivityTime);
  }
  _isValidTime(durationValue) {
    return "" !== durationValue && !isNaN(Number(durationValue)) && Number(durationValue) > -1;
  }
  setEnabled(isEnabled) {
    super.setEnabled(isEnabled);
    const {
      kiosk: kiosk,
      maxSessionTime: maxSessionTime,
      maxInactivityTime: maxInactivityTime
    } = this._router.configs;
    isEnabled && (kiosk || this._isValidTime(maxSessionTime) || this._isValidTime(maxInactivityTime)) && this.show();
  }
  resetLastClicked() {
    KioskBase.screenLastClicked = Math.ceil(Pioneer.TimeUtils.now());
  }
  async sessionStartOverButtonClick() {
    this.setState({
      loadingTextVisibleClass: ""
    });
    await this.resetApp();
    this.app.getManager("camera").waitForTransitionComplete().then(() => (this.setState({
      loadingTextVisibleClass: "hidden"
    }), null)).catch(transitionError => {
      console.warn("error: ", transitionError);
    });
  }
  async onWindowInteract() {
    const {
      maxSessionTime: maxSessionTime,
      maxInactivityTime: maxInactivityTime,
      forceRestart: forceRestart
    } = this._router.configs;
    const {
      kioskAutoplay: kioskAutoplay,
      kioskSessionEnd: kioskSessionEnd
    } = this._children;
    const wasAutoplayVisible = !this.isHidden(kioskAutoplay);
    const wasSessionEndVisible = !this.isHidden(kioskSessionEnd);
    this.setState({
      autoplayVisibleClass: "hidden"
    });
    this.setState({
      sessionEndVisibleClass: "hidden"
    });
    !wasAutoplayVisible && !wasSessionEndVisible || forceRestart || this.setState({
      loadingTextVisibleClass: ""
    });
    clearInterval(this.inactivityInterval);
    this.inactivityInterval = null;
    wasAutoplayVisible && (await this.app.getManager("camera").waitForTransitionComplete(), await this.resetApp());
    this.app.getManager("camera").waitForTransitionComplete().then(() => (this.setState({
      loadingTextVisibleClass: "hidden"
    }), null)).catch(transitionError => {
      console.warn("error: ", transitionError);
    });
    this.setState({
      sessionEndVisibleClass: "hidden"
    });
    this.resetLastClicked();
    this._isValidTime(maxSessionTime) && (wasAutoplayVisible || wasSessionEndVisible) && this.resetSessionTimer();
    this._isValidTime(maxInactivityTime) && this.startInactivityTimer();
  }
  setUpSessionTimerComponent() {
    const kioskSessionClockComponent = this.app.getComponent("kioskSessionClock");
    const {
      kioskSessionTimer: kioskSessionTimer
    } = this._children;
    kioskSessionClockComponent.setState({
      isKioskSessionTimer: true
    });
    kioskSessionClockComponent.show();
    kioskSessionClockComponent.setEnabled(true);
    kioskSessionClockComponent.setParent(kioskSessionTimer);
    this.updateSessionTimerComponent();
  }
  startSessionTimer() {
    this.timeOfDaySessionStarted = Math.ceil(Pioneer.TimeUtils.now());
    clearInterval(this.sessionInterval);
    this.sessionInterval = setInterval(() => {
      this.handleSessionTimer();
    }, 1e3);
  }
  handleSessionTimer() {
    const {
      kioskAutoplay: kioskAutoplay
    } = this._children;
    const isAutoplayVisible = !this.isHidden(kioskAutoplay);
    const currentSeconds = Math.ceil(Pioneer.TimeUtils.now());
    this.timeElapsed = currentSeconds - this.timeOfDaySessionStarted;
    this.setState({
      sessionTimerVisibleClass: ""
    });
    this.timeElapsed < this.maxSessionTime ? this.updateSessionTimerComponent() : isAutoplayVisible || this.endSession();
  }
  async endSession() {
    const {
      forceRestart: forceRestart
    } = this._router.configs;
    const {
      kioskSessionEnd: kioskSessionEnd
    } = this._children;
    clearInterval(this.sessionInterval);
    this.sessionInterval = null;
    this.setState({
      sessionTimerVisibleClass: "hidden"
    });
    this.isHidden(kioskSessionEnd) && this.setState({
      sessionEndVisibleClass: ""
    });
    true === forceRestart ? await this.resetApp() : this.setComponentsVisibility(this.componentDefaultVisibility);
  }
  resetSessionTimer() {
    this.timeElapsed = 0;
    this.setUpSessionTimerComponent();
    this.startSessionTimer();
    this.setState({
      sessionEndVisibleClass: "hidden"
    });
    this.setState({
      sessionTimerVisibleClass: ""
    });
  }
  updateSessionTimerComponent() {
    const kioskSessionClockComponent = this.app.getComponent("kioskSessionClock");
    const countdownText = EyesPublicApi.AppUtils.formatCountdownTime(1e3 * this.maxSessionTime, 1e3 * (this.maxSessionTime - this.timeElapsed));
    kioskSessionClockComponent.update(countdownText, true);
  }
  startInactivityTimer() {
    clearInterval(this.inactivityInterval);
    this.inactivityInterval = setInterval(async () => {
      await this.handleMaxInactivityTime();
    }, 1e3);
  }
  async handleMaxInactivityTime() {
    this.currentTimeWithoutActivity = Math.ceil(Pioneer.TimeUtils.now()) - KioskBase.screenLastClicked;
  }
  async startAutoplay() {
    this.setState({
      sessionTimerVisibleClass: "hidden"
    });
    this.setState({
      sessionEndVisibleClass: "hidden"
    });
    this.setState({
      autoplayVisibleClass: ""
    });
    await this.resetApp();
    this.setComponentsEnabled(this.componentEnabledAutoplay);
    clearInterval(this.inactivityInterval);
    this.inactivityInterval = null;
  }
  resetLayers(layerCategories) {
    if (layerCategories) for (const layerName of Object.keys(layerCategories)) {
      const {
        defaultVisibility: defaultVisibility
      } = this.app.getManager("layer").getLayer(layerName);
      this.app.getManager("layer").toggleLayer(layerName, {}, defaultVisibility);
    }
  }
  setComponentsVisibility(visibilityByComponent) {
    if (visibilityByComponent) for (const [componentName, isVisible] of Object.entries(visibilityByComponent)) {
      const component = this.app.getComponent(componentName);
      isVisible ? component?.show() : component?.hide();
      component?.setExpanded?.(isVisible);
    }
  }
  setComponentsEnabled(enabledByComponent) {
    if (enabledByComponent) for (const [componentName, isEnabled] of Object.entries(enabledByComponent)) {
      const component = this.app.getComponent(componentName);
      component?.setEnabled(isEnabled);
    }
  }
  async resetApp() {
    const layerCategories = this.app.getComponent("layerPanel").getCategoriesDisplay();
    const {
      currentView: currentView
    } = this._router;
    const isHomeCamera = this.app.getManager("camera").getContext().context === EyesPublicApi.CameraScripts.CONTEXT.SYSTEM && "sun" === this.app.getManager("camera").getContext().id;
    const isTransitioning = this.app.getManager("camera").getIsTransitioning();
    this.resetLayers(layerCategories);
    this.setComponentsVisibility(this.componentDefaultVisibility);
    "/home" !== this._router.currentRoute?.url ? this._router.navigate("/home") : isTransitioning || isHomeCamera || (await this.app.cameraScripts.goToSystem("inner_solar_system"), "story" === currentView && this.app.getComponent("story")?.close());
    this.app.getManager("camera").waitForTransitionComplete().then(() => {
      this.app.getComponent("clock").backToLive();
      this.app.getManager("layer").toggleLayer("planets", {}, true);
    }).catch(transitionError => {
      console.warn("error: ", transitionError);
    });
  }
  isHidden(element) {
    return element?.classList.contains("hidden");
  }
}
KioskBase.html = getKioskBaseTemplate();
export { KioskBase };
