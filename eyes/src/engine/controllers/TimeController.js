// Recovered from app.js:647400-650560.
import * as animateFill from "../../vendor/modules/animateFill-168.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import TimeControllerTemplate from "../../ui/templates/TimeControllerTemplate.html";
let defaultExport;
var getTimeControllerTemplate = () => TimeControllerTemplate;
class TimeController extends EyesPublicApi.BaseComponent {
  constructor(t) {
    super(t, null, {
      isPlay: false,
      playClass: "",
      rate: 0,
      rateDisplay: 0
    });
    this._class.fontSize.small = "tiny";
    this._class.isPlay = {
      true: "icon-pause",
      false: "icon-play"
    };
    this._rates = [-94608e3, -31536e3, -6048e3, -604800, -86400, -36e3, -3600, -600, -60, -10, -1, 0, 1, 10, 60, 600, 3600, 36e3, 86400, 604800, 6048e3, 31536e3, 94608e3];
    this._manager = this._app.getManager("time");
    this._router = this._app.getManager("router");
    this._manager.setDefaultTimeRate(1);
    const e = this._manager.getTimeRate();
    const i = 0 !== e;
    this.setState({
      isPlay: i,
      playClass: this._class.isPlay[i],
      rate: e,
      rateDisplay: this.getRateDisplay()
    });
    this.bindFunctions(["getRateLimits", "setRateLimits", "setRate", "setDefaultRate", "setRealRate", "decreaseRate", "increaseRate", "togglePlayPause", "onRateChange", "onForcedPause", "onForcedPauseResume"]);
  }
  init() {
    super.init();
    animateFill.default.setDefaultProps({
      theme: "default",
      touch: ["hold", 2e3],
      delay: [600, null],
      plugins: [animateFill.followCursor]
    });
    (0, animateFill.default)(this._children.toggleBtn, {
      placement: "top"
    });
    (0, animateFill.default)(this._children.increaseBtn, {
      placement: "top"
    });
    (0, animateFill.default)(this._children.decreaseBtn, {
      placement: "top"
    });
    this._children.decreaseContainer.classList.add("bg-color", "gray", "dark");
    this._children.increaseContainer.classList.add("bg-color", "gray", "dark");
    this._children.label.classList.add("semi");
    this._children.rateDisplay.classList.add("semi");
    this._callbackRegistry.push({
      emitter: this._app.getManager("time"),
      event: "ratechange",
      callback: this.onRateChange
    });
  }
  getRateLimits() {
    return this._rates;
  }
  setRateLimits(rates) {
    this._rates = rates;
  }
  setRate(t) {
    this._router.navigate({
      time: this._manager.getTimeUrl(),
      rate: t
    }, this._router.currentRoute.url);
  }
  decreaseRate() {
    if (0 === this._rates.length) return;
    const t = this._rates.indexOf(this._manager.getTimeRate());
    0 !== t && this.setRate(this._rates[t - 1]);
  }
  increaseRate() {
    if (0 === this._rates.length) return;
    const t = this._rates.indexOf(this._manager.getTimeRate());
    t !== this._rates.length - 1 && this.setRate(this._rates[t + 1]);
  }
  togglePlayPause() {
    !this._state.isPlay ? this._manager.play() : this._manager.pause();
    this.setRate(this._manager.getTimeRate());
  }
  setDefaultRate() {
    this.setRate(this._manager.getDefaultTimeRate());
  }
  setRealRate() {
    this.setRate(1);
  }
  onRateChange() {
    const t = this._manager.getTimeRate();
    const e = 0 !== t;
    e === this._state.isPlay && this._state.rate === t || (this._rates.length > 0 && !this._rates.includes(t) ? this.setRate(this._manager.getDefaultTimeRate()) : this.setState({
      isPlay: e,
      rate: t,
      playClass: this._class.isPlay[e],
      rateDisplay: this.getRateDisplay(t)
    }));
  }
  onForcedPause() {
    this.setRate(0);
  }
  onForcedPauseResume() {
    this.setDefaultRate();
  }
  getRateUnit(t = null) {
    null === t && (t = this._manager.getTimeRate());
    const e = t / 31536e3;
    const i = t / 2592e3;
    const s = t / 604800;
    const n = t / 86400;
    const o = t / 3600;
    const r = t / 60;
    let a = "";
    (e >= 1 || e <= -1) && e % 1 == 0 ? (t = e, a = " yr") : (i >= 1 || i <= -1) && i % 1 == 0 ? (t = i, a = " mth") : (s >= 1 || s <= -1) && s % 1 == 0 ? (t = s, a = " wk") : (n >= 1 || n <= -1) && n % 1 == 0 ? (t = n, a = " day") : (o >= 1 || o <= -1) && o % 1 == 0 ? (t = o, a = " hr") : (r >= 1 || r <= -1) && r % 1 == 0 ? (t = r, a = " min") : (t %= 60, a = " sec");
    return {
      rate: t,
      unit: a
    };
  }
  getRateDisplay(t) {
    const {
      rate: rate,
      unit: unit
    } = this.getRateUnit(t);
    return 0 !== rate ? rate + unit + "(s)/sec" : "paused";
  }
}
TimeController.html = getTimeControllerTemplate();
defaultExport = TimeController;
export { defaultExport as default };
