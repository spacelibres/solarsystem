// Recovered from app.js:597896-600111.
import * as animateFill from "../../vendor/modules/animateFill-168.js";
import "../../vendor/modules/FollowName.cjs";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import ClockShortcutTemplate from "../templates/ClockShortcutTemplate.html";
let defaultExport;
var getClockShortcutTemplate = () => ClockShortcutTemplate;
class ClockShortcut extends EyesPublicApi.BaseComponent {
  constructor(t) {
    super(t, null, {
      hasHover: false,
      liveContainerClass: "hidden",
      liveClass: "live",
      liveText: "live",
      liveIcon: "icon-live",
      replayClass: "container",
      replayIcon: "icon-replay"
    });
    this._state.replayClass = "hidden";
    this._class.fontSize.small = "x-small";
    this._liveCallback = null;
    this.bindFunctions(["_replay", "backToLive", "update"]);
  }
  init() {
    super.init();
    const {
      canHover: canHover,
      isTouch: isTouch
    } = this._app;
    canHover && !isTouch && (this._children.liveContainer.addEventListener("mouseenter", () => {
      this.setState({
        hasHover: true,
        liveIcon: "icon-live"
      });
    }), this._children.liveContainer.addEventListener("mouseleave", () => {
      this.setState({
        hasHover: false,
        liveIcon: "icon-back-to-live"
      });
    }));
    animateFill.default.setDefaultProps({
      theme: "default",
      touch: ["hold", 2e3],
      delay: [600, null],
      plugins: [animateFill.followCursor]
    });
    (0, animateFill.default)(this._children.liveContainer, {
      content: "Reset time to live.",
      placement: "top"
    });
    this._children.live.classList.add("semi", "color");
    this._children.replay.classList.add("semi", "color");
    this._element.removeChild(this._children.replayContainer);
    this._callbackRegistry.push({
      emitter: this._app.getManager("time"),
      event: "update",
      callback: this.update
    });
  }
  setCallback(t) {
    this._liveCallback = "function" == typeof t ? t : null;
  }
  backToLive() {
    if ("function" == typeof this._liveCallback) this._liveCallback();else {
      const routerManager = this._app.getManager("router");
      const timeManager = this._app.getManager("time");
      if (!timeManager.isNow()) {
        const i = timeManager.getTimeUrl(timeManager.getNow());
        const s = routerManager.query.time;
        routerManager.navigate({
          __remove: ["time", "rate"]
        }, routerManager.currentRoute.url);
        s !== i && (timeManager.setTimeRate(1), timeManager.setToNow());
      }
    }
  }
  _replay() {
    this._app.getManager("router").navigate({
      __remove: ["time", "rate"]
    }) || (this._app.getManager("time").setTimeRate(1), this._app.getManager("time").setToStart());
  }
  update(t) {
    if (!this._state.isVisible) return;
    const e = this._app.getManager("time").isNow();
    const i = this._app.getManager("time").getNow();
    const s = {
      liveContainerClass: 0 === this._app.getManager("time").isWithinLimits(i) ? e ? "active" : "clickable" : "hidden",
      liveClass: e ? "live" : "",
      replayClass: EyesPublicApi.AppUtils.isMobileMode() ? "icon icon-box" : "container"
    };
    this._state.hasHover || (s.liveIcon = e ? "icon-live" : "icon-back-to-live");
    this.setState(s);
  }
}
ClockShortcut.html = getClockShortcutTemplate();
defaultExport = ClockShortcut;
export { defaultExport as default };
