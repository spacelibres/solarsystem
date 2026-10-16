/** @eyes-analysis
 * 文件职责：将交互输入映射到引擎仿真时间或时间速率。
 * 依据：import ../../vendor/modules/animateFill-168.js；import ../../framework/eyes/public-api.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:647400-650560.
import * as animateFill from "../../vendor/modules/animateFill-168.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import TimeControllerTemplate from "../../ui/templates/TimeControllerTemplate.html";
let defaultExport;
var getTimeControllerTemplate = () => TimeControllerTemplate;
/** @eyes-analysis
 * 类职责：将交互输入映射到引擎仿真时间或时间速率。
 * 继承：EyesPublicApi.BaseComponent；导出：default。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TimeController extends EyesPublicApi.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_class.fontSize.small`、`_class.isPlay`、`_manager`、`_rates`、`_router`；调用 `super`、`this._app.getManager`、`this._manager.getTimeRate`、`this._manager.setDefaultTimeRate`、`this.bindFunctions`、`this.getRateDisplay`。
   * 状态写入：_class.fontSize.small、_class.isPlay、_manager、_rates、_router。
   * 调用线索：super、this._app.getManager、this._manager.getTimeRate、this._manager.setDefaultTimeRate、this.bindFunctions等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `0,animateFill.default`、`animateFill.default.setDefaultProps`、`super.init`、`this._app.getManager`、`this._callbackRegistry.push`、`this._children.decreaseContainer.classList.add`。
   * 调用线索：0,animateFill.default、animateFill.default.setDefaultProps、super.init、this._app.getManager、this._callbackRegistry.push等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `this._rates`。
   */
  getRateLimits() {
    return this._rates;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_rates`。
   * 状态写入：_rates。
   */
  setRateLimits(rates) {
    this._rates = rates;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._manager.getTimeUrl`、`this._router.navigate`。
   * 调用线索：this._manager.getTimeUrl、this._router.navigate。
   */
  setRate(t) {
    this._router.navigate({
      time: this._manager.getTimeUrl(),
      rate: t
    }, this._router.currentRoute.url);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `this._manager.getTimeRate`、`this._rates.indexOf`、`this.setRate`。
   * 调用线索：this._manager.getTimeRate、this._rates.indexOf、this.setRate。
   */
  decreaseRate() {
    if (0 === this._rates.length) return;
    const t = this._rates.indexOf(this._manager.getTimeRate());
    0 !== t && this.setRate(this._rates[t - 1]);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `this._manager.getTimeRate`、`this._rates.indexOf`、`this.setRate`。
   * 调用线索：this._manager.getTimeRate、this._rates.indexOf、this.setRate。
   */
  increaseRate() {
    if (0 === this._rates.length) return;
    const t = this._rates.indexOf(this._manager.getTimeRate());
    t !== this._rates.length - 1 && this.setRate(this._rates[t + 1]);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._manager.getTimeRate`、`this._manager.pause`、`this._manager.play`、`this.setRate`。
   * 调用线索：this._manager.getTimeRate、this._manager.pause、this._manager.play、this.setRate。
   */
  togglePlayPause() {
    !this._state.isPlay ? this._manager.play() : this._manager.pause();
    this.setRate(this._manager.getTimeRate());
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._manager.getDefaultTimeRate`、`this.setRate`。
   * 调用线索：this._manager.getDefaultTimeRate、this.setRate。
   */
  setDefaultRate() {
    this.setRate(this._manager.getDefaultTimeRate());
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.setRate`。
   * 调用线索：this.setRate。
   */
  setRealRate() {
    this.setRate(1);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._manager.getDefaultTimeRate`、`this._manager.getTimeRate`、`this._rates.includes`、`this.getRateDisplay`、`this.setRate`、`this.setState`。
   * 调用线索：this._manager.getDefaultTimeRate、this._manager.getTimeRate、this._rates.includes、this.getRateDisplay、this.setRate等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `this.setRate`。
   * 调用线索：this.setRate。
   */
  onForcedPause() {
    this.setRate(0);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.setDefaultRate`。
   * 调用线索：this.setDefaultRate。
   */
  onForcedPauseResume() {
    this.setDefaultRate();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `{rate:t,unit:a}`；调用 `this._manager.getTimeRate`。
   * 调用线索：this._manager.getTimeRate。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `0!==rate?rate+unit+"(s)/sec":"paused"`；调用 `this.getRateUnit`。
   * 调用线索：this.getRateUnit。
   */
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
