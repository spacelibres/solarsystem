/** @eyes-analysis
 * 文件职责：展陈模式基础界面及计时行为
 * 依据：imports: ../../framework/eyes/public-api.js, ../../engine/pioneer/index.js, ../templates/KioskBaseTemplate.html, ../../styles/extracted/KioskBaseStyles.js；manager dependencies: router, camera, layer
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:678761-685479.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import * as Pioneer from "../../engine/pioneer/index.js";
import KioskBaseTemplate from "../templates/KioskBaseTemplate.html";
import "../../styles/extracted/KioskBaseStyles.js";
var getKioskBaseTemplate = () => KioskBaseTemplate;
/** @eyes-analysis
 * 类职责：展陈模式基础界面及计时行为；继承 EyesPublicApi.BaseComponent
 * 继承：EyesPublicApi.BaseComponent；导出：KioskBase。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class KioskBase extends EyesPublicApi.BaseComponent {
  static screenLastClicked = Math.ceil(Pioneer.TimeUtils.now());
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this.app.getManager, Math.ceil, Pioneer.TimeUtils.now；写入 _router, inactivityInterval, sessionInterval, timeOfDaySessionStarted, componentDefaultVisibility, componentEnabledAutoplay。
   * 状态写入：_router、componentDefaultVisibility、componentEnabledAutoplay、inactivityInterval、sessionInterval、timeOfDaySessionStarted。
   * 调用线索：Math.ceil、Pioneer.TimeUtils.now、super、this.app.getManager。
   */
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
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this.app.pioneer.getScene, this.resetLastClicked, this.validateQueries, this._isValidTime, EyesPublicApi.AppUtils.minToSec, this.setUpSessionTimerComponent, this.startSessionTimer, this.setState, this.startInactivityTimer；写入 maxSessionTime, maxInactivityTime。
   * 状态写入：maxInactivityTime、maxSessionTime。
   * 调用线索：EyesPublicApi.AppUtils.minToSec、console.warn、super.init、this._isValidTime、this.app.pioneer.getScene等。
   */
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
  /** @eyes-analysis
   * 执行 validateQueries 对应的组件业务步骤；调用 Object.entries, this._isValidTime, Math.abs, this._router.setConfig。
   * 调用线索：Math.abs、Object.entries、t.toLowerCase、t.toLowerCase().includes、this._isValidTime等。
   */
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
  /** @eyes-analysis
   * 执行 _isValidTime 对应的组件业务步骤。
   * 调用线索：Number、isNaN。
   */
  _isValidTime(t) {
    return "" !== t && !isNaN(Number(t)) && Number(t) > -1;
  }
  /** @eyes-analysis
   * 切换当前组件及其子组件的启用状态；调用 super.setEnabled, this._isValidTime, this.show。
   * 调用线索：super.setEnabled、this._isValidTime、this.show。
   */
  setEnabled(t) {
    super.setEnabled(t);
    const {
      kiosk: kiosk,
      maxSessionTime: maxSessionTime,
      maxInactivityTime: maxInactivityTime
    } = this._router.configs;
    t && (kiosk || this._isValidTime(maxSessionTime) || this._isValidTime(maxInactivityTime)) && this.show();
  }
  /** @eyes-analysis
   * 执行 resetLastClicked 对应的组件业务步骤；调用 Math.ceil, Pioneer.TimeUtils.now。
   * 调用线索：Math.ceil、Pioneer.TimeUtils.now。
   */
  resetLastClicked() {
    KioskBase.screenLastClicked = Math.ceil(Pioneer.TimeUtils.now());
  }
  /** @eyes-analysis
   * 执行 sessionStartOverButtonClick 对应的组件业务步骤；调用 this.setState, this.resetApp, this.app.getManager。
   * 调用线索：console.warn、this.app.getManager、this.app.getManager("camera").waitForTransitionComplete、this.app.getManager("camera").waitForTransitionComplete().then、this.app.getManager("camera").waitForTransitionComplete().then(()=>(this.setState({loadingTextVisibleClass:"hidden"}),null)).catch等。
   */
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
  /** @eyes-analysis
   * 执行 onWindowInteract 对应的组件业务步骤；调用 this.isHidden, this.setState, this.app.getManager, this.resetApp, this.resetLastClicked, this._isValidTime, this.resetSessionTimer, this.startInactivityTimer；写入 inactivityInterval。
   * 状态写入：inactivityInterval。
   * 调用线索：clearInterval、console.warn、this._isValidTime、this.app.getManager、this.app.getManager("camera").waitForTransitionComplete等。
   */
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
  /** @eyes-analysis
   * 执行 setUpSessionTimerComponent 对应的组件业务步骤；调用 this.app.getComponent, SessionClockComponent.setState, SessionClockComponent.show, SessionClockComponent.setEnabled, SessionClockComponent.setParent, this.updateSessionTimerComponent。
   * 调用线索：kioskSessionClockComponent.setEnabled、kioskSessionClockComponent.setParent、kioskSessionClockComponent.setState、kioskSessionClockComponent.show、this.app.getComponent等。
   */
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
  /** @eyes-analysis
   * 执行 startSessionTimer 对应的组件业务步骤；调用 Math.ceil, Pioneer.TimeUtils.now, this.handleSessionTimer；写入 timeOfDaySessionStarted, sessionInterval。
   * 状态写入：sessionInterval、timeOfDaySessionStarted。
   * 调用线索：Math.ceil、Pioneer.TimeUtils.now、clearInterval、setInterval、this.handleSessionTimer。
   */
  startSessionTimer() {
    this.timeOfDaySessionStarted = Math.ceil(Pioneer.TimeUtils.now());
    clearInterval(this.sessionInterval);
    this.sessionInterval = setInterval(() => {
      this.handleSessionTimer();
    }, 1e3);
  }
  /** @eyes-analysis
   * 执行 handleSessionTimer 对应的组件业务步骤；调用 this.isHidden, Math.ceil, Pioneer.TimeUtils.now, this.setState, this.updateSessionTimerComponent, this.endSession；写入 timeElapsed。
   * 状态写入：timeElapsed。
   * 调用线索：Math.ceil、Pioneer.TimeUtils.now、this.endSession、this.isHidden、this.setState等。
   */
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
  /** @eyes-analysis
   * 执行 endSession 对应的组件业务步骤；调用 this.setState, this.isHidden, this.resetApp, this.setComponentsVisibility；写入 sessionInterval。
   * 状态写入：sessionInterval。
   * 调用线索：clearInterval、this.isHidden、this.resetApp、this.setComponentsVisibility、this.setState。
   */
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
  /** @eyes-analysis
   * 执行 resetSessionTimer 对应的组件业务步骤；调用 this.setUpSessionTimerComponent, this.startSessionTimer, this.setState；写入 timeElapsed。
   * 状态写入：timeElapsed。
   * 调用线索：this.setState、this.setUpSessionTimerComponent、this.startSessionTimer。
   */
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
  /** @eyes-analysis
   * 执行 updateSessionTimerComponent 对应的组件业务步骤；调用 this.app.getComponent, EyesPublicApi.AppUtils.formatCountdownTime, SessionClockComponent.update。
   * 调用线索：EyesPublicApi.AppUtils.formatCountdownTime、kioskSessionClockComponent.update、this.app.getComponent。
   */
  updateSessionTimerComponent() {
    const kioskSessionClockComponent = this.app.getComponent("kioskSessionClock");
    const e = EyesPublicApi.AppUtils.formatCountdownTime(1e3 * this.maxSessionTime, 1e3 * (this.maxSessionTime - this.timeElapsed));
    kioskSessionClockComponent.update(e, true);
  }
  /** @eyes-analysis
   * 执行 startInactivityTimer 对应的组件业务步骤；调用 this.handleMaxInactivityTime；写入 inactivityInterval。
   * 状态写入：inactivityInterval。
   * 调用线索：clearInterval、setInterval、this.handleMaxInactivityTime。
   */
  startInactivityTimer() {
    clearInterval(this.inactivityInterval);
    this.inactivityInterval = setInterval(async () => {
      await this.handleMaxInactivityTime();
    }, 1e3);
  }
  /** @eyes-analysis
   * 执行 handleMaxInactivityTime 对应的组件业务步骤；调用 Math.ceil, Pioneer.TimeUtils.now；写入 currentTimeWithoutActivity。
   * 状态写入：currentTimeWithoutActivity。
   * 调用线索：Math.ceil、Pioneer.TimeUtils.now。
   */
  async handleMaxInactivityTime() {
    this.currentTimeWithoutActivity = Math.ceil(Pioneer.TimeUtils.now()) - KioskBase.screenLastClicked;
  }
  /** @eyes-analysis
   * 执行 startAutoplay 对应的组件业务步骤；调用 this.setState, this.resetApp, this.setComponentsEnabled；写入 inactivityInterval。
   * 状态写入：inactivityInterval。
   * 调用线索：clearInterval、this.resetApp、this.setComponentsEnabled、this.setState。
   */
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
  /** @eyes-analysis
   * 执行 resetLayers 对应的组件业务步骤；调用 Object.keys, this.app.getManager。
   * 调用线索：Object.keys、this.app.getManager、this.app.getManager("layer").getLayer、this.app.getManager("layer").toggleLayer。
   */
  resetLayers(t) {
    if (t) for (const e of Object.keys(t)) {
      const {
        defaultVisibility: defaultVisibility
      } = this.app.getManager("layer").getLayer(e);
      this.app.getManager("layer").toggleLayer(e, {}, defaultVisibility);
    }
  }
  /** @eyes-analysis
   * 执行 setComponentsVisibility 对应的组件业务步骤；调用 Object.entries, this.app.getComponent。
   * 调用线索：Object.entries、t?.hide、t?.setExpanded、t?.show、this.app.getComponent。
   */
  setComponentsVisibility(t) {
    if (t) for (const [e, i] of Object.entries(t)) {
      const t = this.app.getComponent(e);
      i ? t?.show() : t?.hide();
      t?.setExpanded?.(i);
    }
  }
  /** @eyes-analysis
   * 执行 setComponentsEnabled 对应的组件业务步骤；调用 Object.entries, this.app.getComponent。
   * 调用线索：Object.entries、t?.setEnabled、this.app.getComponent。
   */
  setComponentsEnabled(t) {
    if (t) for (const [e, i] of Object.entries(t)) {
      const t = this.app.getComponent(e);
      t?.setEnabled(i);
    }
  }
  /** @eyes-analysis
   * 执行 resetApp 对应的组件业务步骤；调用 this.app.getComponent, this.app.getManager, this.resetLayers, this.setComponentsVisibility, this._router.navigate, this.app.cameraScripts.goToSystem。
   * 调用线索：console.warn、this._router.navigate、this.app.cameraScripts.goToSystem、this.app.getComponent、this.app.getComponent("clock").backToLive等。
   */
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
  /** @eyes-analysis
   * 执行 isHidden 对应的组件业务步骤；调用 List.contains。
   * 调用线索：t?.classList.contains。
   */
  isHidden(t) {
    return t?.classList.contains("hidden");
  }
}
KioskBase.html = getKioskBaseTemplate();
export { KioskBase };
