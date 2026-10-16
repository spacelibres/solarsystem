// Recovered from app.js:678761-685479.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import * as Pioneer from "../../engine/pioneer/index.js";
import KioskBaseTemplate from "../templates/KioskBaseTemplate.html";
import "../../styles/extracted/KioskBaseStyles.js";
var getKioskBaseTemplate = () => KioskBaseTemplate;
class KioskBase extends EyesPublicApi.BaseComponent {
  static screenLastClicked = Math.ceil(Pioneer.TimeUtils.now());
  constructor(t, e = {}) {
    super(t, null, {
      isVisible: false,
      loadingTextVisibleClass: "hidden",
      sessionEndVisibleClass: "hidden",
      autoplayVisibleClass: "hidden",
      sessionTimerVisibleClass: "hidden",
      continueButtonVisibleClass: "",
      forceRestartClass: "",
      ...e
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
    }).catch(t => {
      console.warn(t);
    });
  }
  validateQueries() {
    const {
      maxSessionTime: maxSessionTime,
      maxInactivityTime: maxInactivityTime
    } = this._router.configs;
    const i = {};
    for (const [t, e] of Object.entries(this._router.configs)) e && (i[t] = e);
    for (const t in i) t.toLowerCase().includes("time") && !this._isValidTime(i[t]) && delete i[t];
    const {
      maxSessionTime: s,
      maxInactivityTime: n
    } = i;
    this._isValidTime(s) && this._isValidTime(n) && (Math.abs(maxSessionTime - maxInactivityTime) <= .05 && maxSessionTime > 0 && maxInactivityTime > 0 ? i.maxInactivityTime = maxSessionTime + .1 : maxSessionTime >= maxInactivityTime && (0 === maxInactivityTime ? delete i.maxSessionTime : i.maxInactivityTime = maxSessionTime + 1));
    this._router.setConfig("maxSessionTime", i.maxSessionTime);
    this._router.setConfig("maxInactivityTime", i.maxInactivityTime);
  }
  _isValidTime(t) {
    return "" !== t && !isNaN(Number(t)) && Number(t) > -1;
  }
  setEnabled(t) {
    super.setEnabled(t);
    const {
      kiosk: kiosk,
      maxSessionTime: maxSessionTime,
      maxInactivityTime: maxInactivityTime
    } = this._router.configs;
    t && (kiosk || this._isValidTime(maxSessionTime) || this._isValidTime(maxInactivityTime)) && this.show();
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
    }), null)).catch(t => {
      console.warn("error: ", t);
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
    const o = !this.isHidden(kioskAutoplay);
    const r = !this.isHidden(kioskSessionEnd);
    this.setState({
      autoplayVisibleClass: "hidden"
    });
    this.setState({
      sessionEndVisibleClass: "hidden"
    });
    !o && !r || forceRestart || this.setState({
      loadingTextVisibleClass: ""
    });
    clearInterval(this.inactivityInterval);
    this.inactivityInterval = null;
    o && (await this.app.getManager("camera").waitForTransitionComplete(), await this.resetApp());
    this.app.getManager("camera").waitForTransitionComplete().then(() => (this.setState({
      loadingTextVisibleClass: "hidden"
    }), null)).catch(t => {
      console.warn("error: ", t);
    });
    this.setState({
      sessionEndVisibleClass: "hidden"
    });
    this.resetLastClicked();
    this._isValidTime(maxSessionTime) && (o || r) && this.resetSessionTimer();
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
    const e = !this.isHidden(kioskAutoplay);
    const i = Math.ceil(Pioneer.TimeUtils.now());
    this.timeElapsed = i - this.timeOfDaySessionStarted;
    this.setState({
      sessionTimerVisibleClass: ""
    });
    this.timeElapsed < this.maxSessionTime ? this.updateSessionTimerComponent() : e || this.endSession();
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
    const e = EyesPublicApi.AppUtils.formatCountdownTime(1e3 * this.maxSessionTime, 1e3 * (this.maxSessionTime - this.timeElapsed));
    kioskSessionClockComponent.update(e, true);
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
  resetLayers(t) {
    if (t) for (const e of Object.keys(t)) {
      const {
        defaultVisibility: defaultVisibility
      } = this.app.getManager("layer").getLayer(e);
      this.app.getManager("layer").toggleLayer(e, {}, defaultVisibility);
    }
  }
  setComponentsVisibility(t) {
    if (t) for (const [e, i] of Object.entries(t)) {
      const t = this.app.getComponent(e);
      i ? t?.show() : t?.hide();
      t?.setExpanded?.(i);
    }
  }
  setComponentsEnabled(t) {
    if (t) for (const [e, i] of Object.entries(t)) {
      const t = this.app.getComponent(e);
      t?.setEnabled(i);
    }
  }
  async resetApp() {
    const t = this.app.getComponent("layerPanel").getCategoriesDisplay();
    const {
      currentView: currentView
    } = this._router;
    const i = this.app.getManager("camera").getContext().context === EyesPublicApi.CameraScripts.CONTEXT.SYSTEM && "sun" === this.app.getManager("camera").getContext().id;
    const n = this.app.getManager("camera").getIsTransitioning();
    this.resetLayers(t);
    this.setComponentsVisibility(this.componentDefaultVisibility);
    "/home" !== this._router.currentRoute?.url ? this._router.navigate("/home") : n || i || (await this.app.cameraScripts.goToSystem("inner_solar_system"), "story" === currentView && this.app.getComponent("story")?.close());
    this.app.getManager("camera").waitForTransitionComplete().then(() => {
      this.app.getComponent("clock").backToLive();
      this.app.getManager("layer").toggleLayer("planets", {}, true);
    }).catch(t => {
      console.warn("error: ", t);
    });
  }
  isHidden(t) {
    return t?.classList.contains("hidden");
  }
}
KioskBase.html = getKioskBaseTemplate();
export { KioskBase };
