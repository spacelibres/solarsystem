/** @eyes-analysis
 * 文件职责：时间播放速率与时间拖动控制
 * 依据：imports: ../../framework/eyes/index.js, ../../styles/extracted/TimeControlsStyles.js, ../templates/TimeControlsTemplate.html；manager dependencies: time, router
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1630483-1637426.
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/TimeControlsStyles.js";
import TimeControlsTemplate from "../templates/TimeControlsTemplate.html";
var getTimeControlsTemplate = () => TimeControlsTemplate;
const {
  formatNumber: formatNumber,
  throttle: throttle
} = Eyes.AppUtils;
const l = {
  yr: 31536e3,
  mth: 2592e3,
  wk: 604800,
  day: 86400,
  hr: 3600,
  min: 60,
  sec: 1
};
/** @eyes-analysis
 * 类职责：时间播放速率与时间拖动控制；继承 Eyes.BaseComponent
 * 继承：Eyes.BaseComponent；导出：TimeControls。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TimeControls extends Eyes.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Parent.setAttribute, this._drawCurve, this._drawKnob, this._app.getManager, this._manager.getTimeRate, this.setState, this.getRateDisplay, this.bindFunctions；写入 _curve, _rates, _resizeObserver, _normValue, _currentRate, _currentIsLive, _canUpdate, _rateBeforePause, _touchTimeout, _activeDelay, _manager, _router。
   * 状态写入：_activeDelay、_canUpdate、_class.isPlaying、_currentIsLive、_currentRate、_curve、_curve.cp1x、_curve.cp2x等；完整记录见索引。
   * 调用线索：new ResizeObserver、super、svgParent.setAttribute、t.forEach、this._app.getManager等。
   */
  constructor(t, e = {}) {
    super(t, null, {
      isVisible: true,
      isPlaying: null,
      isPlayingClass: "",
      isLiveClass: "",
      touchActiveClass: "",
      realTimeBtnClass: "hidden",
      isRateControlsVisible: "",
      playIconClass: null,
      rateDisplay: null,
      timeLimit: null,
      ...e
    });
    this._curve = {
      x: 0,
      y: 0,
      cp1x: 60,
      cp1y: 50,
      cp2x: 540,
      cp2y: 50,
      endx: 600,
      endy: 0
    };
    this._rates = [-94608e3, -31536e3, -6048e3, -604800, -86400, -36e3, -3600, -600, -60, -10, -1, 1, 10, 60, 600, 3600, 36e3, 86400, 604800, 6048e3, 31536e3, 94608e3];
    this._class.isPlaying = {
      true: "rate-pause",
      false: "rate-play"
    };
    this._resizeObserver = new ResizeObserver(t => {
      t.forEach(t => {
        const {
          svgParent: svgParent
        } = this._children;
        const {
          width: width
        } = t.contentRect;
        svgParent.setAttribute("width", width);
        const s = .1 * width;
        this._curve.cp1x = s;
        this._curve.cp2x = width - s;
        this._curve.endx = width;
        this._drawCurve();
        this._drawKnob(this._normValue);
      });
    });
    this._normValue = .5;
    this._currentRate = null;
    this._currentIsLive = null;
    this._canUpdate = null;
    this._rateBeforePause = null;
    this._touchTimeout = null;
    this._activeDelay = 3e3;
    this._manager = this._app.getManager("time");
    this._router = this._app.getManager("router");
    const i = 0 !== this._manager.getTimeRate();
    this.setState({
      isPlaying: i,
      playIconClass: this._class.isPlaying[i],
      rateDisplay: this.getRateDisplay()
    });
    this.bindFunctions(["_onRateChange", "_onSliderMove", "_onTouchStart", "_onTouchEnd", "update"]);
    this._drawKnobThrottled = throttle(this._drawKnob, 50);
    this._setQueryDebounced = throttle(this._setQuery, 200);
  }
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._createRatesMap, this._app.getManager, this._callbackRegistry.push, Range.addEventListener, Range.blur, this._element.addEventListener, this._resizeObserver.observe。
   * 调用线索：inputRange.addEventListener、inputRange.blur、super.init、this._app.getManager、this._callbackRegistry.push等。
   */
  async init() {
    super.init();
    this._createRatesMap();
    const {
      inputRange: inputRange
    } = this._children;
    const timeManager = this._app.getManager("time");
    this._callbackRegistry.push({
      emitter: timeManager,
      event: "ratechange",
      callback: this._onRateChange
    }, {
      emitter: this._app.getManager("time"),
      event: "update",
      callback: this.update
    });
    inputRange.addEventListener("input", this._onSliderMove);
    inputRange.addEventListener("click", () => inputRange.blur());
    this._element.addEventListener("touchstart", this._onTouchStart);
    this._element.addEventListener("touchend", this._onTouchEnd);
    const {
      sliderContainer: sliderContainer
    } = this._children;
    this._resizeObserver.observe(sliderContainer);
  }
  /** @eyes-analysis
   * 执行 _onRateChange 对应的组件业务步骤；调用 this._setRate, this._setQuery。
   * 调用线索：this._setQuery、this._setRate。
   */
  _onRateChange(t) {
    t >= this._rates[0] && t <= this._rates[this._rates.length - 1] ? this._setRate(t) : this._setQuery(1);
  }
  /** @eyes-analysis
   * 执行 _onSliderMove 对应的组件业务步骤；调用 this._drawKnobThrottled, this._setQueryDebounced；写入 _normValue, _currentRate。
   * 状态写入：_currentRate、_normValue。
   * 调用线索：this._drawKnobThrottled、this._setQueryDebounced。
   */
  _onSliderMove(t) {
    const {
      timeLimit: timeLimit
    } = this._state;
    const {
      value: value
    } = t.target;
    if ("max" === timeLimit && value > 45 || "min" === timeLimit && value < 55) return void (t.target.value = 50);
    const currentRate = this._ratesMap[value];
    this._canUpdate && this._currentRate !== currentRate ? (this._normValue = value / 100, this._currentRate = currentRate, this._drawKnobThrottled(this._normValue), this._setQueryDebounced(currentRate)) : t.target.value = 100 * this._normValue;
  }
  /** @eyes-analysis
   * 执行 _onTouchStart 对应的组件业务步骤；调用 List.contains, this.setState。
   * 调用线索：clearTimeout、t.preventDefault、t.target?.classList.contains、this.setState。
   */
  _onTouchStart(t) {
    const {
      touchActiveClass: touchActiveClass
    } = this._state;
    const i = t.target?.classList.contains("slider-input");
    const s = t.target?.classList.contains("realtime");
    touchActiveClass || i || s || t.preventDefault();
    clearTimeout(this._touchTimeout);
    this.setState({
      touchActiveClass: "touchactive"
    });
  }
  /** @eyes-analysis
   * 执行 _onTouchEnd 对应的组件业务步骤；调用 this.setState；写入 _touchTimeout。
   * 状态写入：_touchTimeout。
   * 调用线索：setTimeout、this.setState。
   */
  _onTouchEnd() {
    this._touchTimeout = setTimeout(() => {
      this.setState({
        touchActiveClass: ""
      });
    }, this._activeDelay);
  }
  /** @eyes-analysis
   * 执行 _createRatesMap 对应的组件业务步骤；调用 this._rates.indexOf, this._rates.slice, Math.round, this._roundRate, this._ratesMap.push, Math.floor；写入 _ratesMap。
   * 状态写入：_ratesMap。
   * 调用线索：Math.floor、Math.round、n.forEach、o.forEach、this._rates.indexOf等。
   */
  _createRatesMap() {
    const t = this._rates.indexOf(1);
    const e = this._rates.length - t - 1;
    const i = 50 / t;
    const s = 50 / e;
    const n = this._rates.slice(0, t);
    const o = this._rates.slice(t);
    this._ratesMap = [];
    n.forEach((t, e) => {
      const s = Math.round(e * i);
      const o = Math.round((e + 1) * i) - s;
      const r = n[e + 1] ?? 0;
      for (let e = 0; e < o; e++) {
        const i = t + e / o * (r - t);
        const s = i > -1 ? -1 : this._roundRate(i);
        this._ratesMap.push(Math.floor(s));
      }
    });
    o.forEach((t, e) => {
      const i = 50 + Math.round(e * s);
      const n = (e < o.length - 1 ? 50 + Math.round((e + 1) * s) : 101) - i;
      const r = o[e + 1] || o[o.length - 1];
      for (let e = 0; e < n; e++) {
        const i = t + e / n * (r - t);
        const s = this._roundRate(i);
        this._ratesMap.push(Math.floor(s));
      }
    });
  }
  /** @eyes-analysis
   * 执行 _roundRate 对应的组件业务步骤；调用 this.getRateUnit。
   * 调用线索：this.getRateUnit。
   */
  _roundRate(t) {
    const {
      rate: rate,
      unit: unit
    } = this.getRateUnit(t);
    return rate * l[unit];
  }
  /** @eyes-analysis
   * 执行 _drawCurve 对应的组件业务步骤；调用 Path.setAttribute。
   * 调用线索：sliderPath.setAttribute。
   */
  _drawCurve() {
    const {
      x: t,
      y: e,
      cp1x: cp1x,
      cp1y: cp1y,
      cp2x: cp2x,
      cp2y: cp2y,
      endx: endx,
      endy: endy
    } = this._curve;
    const {
      sliderPath: sliderPath
    } = this._children;
    sliderPath.setAttribute("d", `M${t},${e} C${cp1x},${cp1y} ${cp2x},${cp2y} ${endx},${endy}`);
  }
  /** @eyes-analysis
   * 执行 _drawKnob 对应的组件业务步骤；调用 Math.pow, Math.abs, this._element.style.setProperty。
   * 调用线索：Math.abs、Math.pow、this._element.style.setProperty。
   */
  _drawKnob(t) {
    const {
      endx: endx,
      cp1y: cp1y
    } = this._curve;
    const s = t * endx;
    const n = .75 * cp1y * (1 - .95 * Math.pow(2 * Math.abs(t - .5), 3.2));
    const o = n - cp1y;
    this._element.style.setProperty("--knobX", `${s}px`);
    this._element.style.setProperty("--knobY", `${n}px`);
    this._element.style.setProperty("--knobOffsetY", `${o}px`);
  }
  /** @eyes-analysis
   * 执行 _setRate 对应的组件业务步骤；调用 this._getTimeLimit, this._getValueFromRate, this._drawKnob, this.setState, this.getRateDisplay；写入 _rateBeforePause, _normValue, _currentRate, _timeLimit。
   * 状态写入：_currentRate、_normValue、_rateBeforePause、_timeLimit。
   * 调用线索：this._drawKnob、this._getTimeLimit、this._getValueFromRate、this.getRateDisplay、this.setState。
   */
  _setRate(currentRate) {
    const {
      inputRange: inputRange
    } = this._children;
    const i = 0 !== currentRate;
    const s = 0 !== this._currentRate;
    const n = i ? null : this._getTimeLimit();
    const o = "max" === n;
    const r = o || "min" === n;
    this._rateBeforePause = i || r || !s ? null : this._currentRate;
    const a = o ? "rate-replay" : this._class.isPlaying[i];
    if (i && this._currentRate !== currentRate || r) {
      const i = r ? 50 : this._getValueFromRate(currentRate);
      i && (inputRange.value = i);
      this._normValue = inputRange.value / 100;
      this._drawKnob(this._normValue);
      this._currentRate = currentRate;
    }
    const l = this._normValue < .47 || this._normValue > .53;
    this.setState({
      isPlaying: i,
      isPlayingClass: i ? "" : "paused",
      realTimeBtnClass: l ? "" : "hidden",
      playIconClass: a,
      rateDisplay: this.getRateDisplay(currentRate),
      timeLimit: n
    });
    this._timeLimit = null;
  }
  /** @eyes-analysis
   * 执行 _getTimeLimit 对应的组件业务步骤；调用 this._manager.getTime, Math.abs。
   * 调用线索：Math.abs、i.valueOf、max.valueOf、min.valueOf、this._manager.getTime。
   */
  _getTimeLimit() {
    const {
      min: min,
      max: max
    } = this._manager.timeLimits;
    const i = this._manager.getTime();
    return Math.abs(i.valueOf() - max.valueOf()) < 10 ? "max" : Math.abs(i.valueOf() - min.valueOf()) < 10 ? "min" : null;
  }
  /** @eyes-analysis
   * 执行 _getValueFromRate 对应的组件业务步骤；调用 this._ratesMap.indexOf。
   * 调用线索：this._ratesMap.indexOf。
   */
  _getValueFromRate(t) {
    const e = this._ratesMap.indexOf(t);
    if (e > -1) return e;
    for (let e = 0; e < this._ratesMap.length - 1; e++) {
      const i = this._ratesMap[e];
      const s = this._ratesMap[e + 1];
      if (t >= i && t <= s) {
        return e + (t - i) / (s - i);
      }
    }
    return 50;
  }
  /** @eyes-analysis
   * 执行 _setQuery 对应的组件业务步骤；调用 this._router.navigate, this._manager.getTimeUrl。
   * 调用线索：this._manager.getTimeUrl、this._router.navigate。
   */
  _setQuery(t, e) {
    this._router.navigate({
      rate: t,
      time: this._manager.getTimeUrl(e)
    });
  }
  /** @eyes-analysis
   * 执行 decreaseRate 对应的组件业务步骤；调用 this._getValueFromRate, Math.floor, this._setQuery。
   * 调用线索：Math.floor、this._getValueFromRate、this._setQuery。
   */
  decreaseRate() {
    if (!this._canUpdate) return;
    const {
      timeLimit: timeLimit
    } = this._state;
    const e = (0 === this._currentRate ? this._rateBeforePause : this._currentRate) || 1;
    const i = this._getValueFromRate(e);
    let s = i % 1 > 0 ? Math.floor(i) : i - 1;
    for (; this._ratesMap[s] === e;) s--;
    if (s <= 0) return;
    const n = "max" === timeLimit ? -1 : this._ratesMap[s];
    this._setQuery(n);
  }
  /** @eyes-analysis
   * 执行 increaseRate 对应的组件业务步骤；调用 this._getValueFromRate, Math.ceil, this._setQuery。
   * 调用线索：Math.ceil、this._getValueFromRate、this._setQuery。
   */
  increaseRate() {
    if (!this._canUpdate) return;
    const {
      timeLimit: timeLimit
    } = this._state;
    const e = (0 === this._currentRate ? this._rateBeforePause : this._currentRate) || 1;
    const i = this._getValueFromRate(e);
    let s = i % 1 > 0 ? Math.ceil(i) : i + 1;
    for (; this._ratesMap[s] === e;) s++;
    if (s >= this._ratesMap.length || "max" === timeLimit) return;
    const n = this._ratesMap[s];
    this._setQuery(n);
  }
  /** @eyes-analysis
   * 执行 playPauseRate 对应的组件业务步骤；调用 this._app.getView, this._setQuery。
   * 调用线索：this._app.getView、this._app.getView("event")?.replayEvent、this._setQuery。
   */
  playPauseRate(t, e = this._state.isPlaying) {
    if (!this._canUpdate) return;
    const {
      timeLimit: timeLimit
    } = this._state;
    if ("max" === timeLimit) return void this._app.getView("event")?.replayEvent();
    const s = this._rateBeforePause ?? 1;
    const n = e ? 0 : s;
    this._setQuery(n);
  }
  /** @eyes-analysis
   * 执行 onRealtimeClick 对应的组件业务步骤；调用 this._setQuery。
   * 调用线索：this._setQuery。
   */
  onRealtimeClick() {
    this._canUpdate && this._setQuery(1);
  }
  /** @eyes-analysis
   * 执行 getRateUnit 对应的组件业务步骤；调用 Object.keys。
   * 调用线索：Object.keys、formatNumber、h.find、parseFloat。
   */
  getRateUnit(t, e = 0) {
    const i = t / l.yr;
    const s = t / l.mth;
    const n = t / l.wk;
    const o = t / l.day;
    const a = t / l.hr;
    const c = t / l.min;
    const h = Object.keys(l);
    let d = t % l.min;
    let u = h.find(t => l[t] === l.sec);
    i >= 1 || i <= -1 ? (d = i, u = h.find(t => l[t] === l.yr)) : s >= 1 || s <= -1 ? (d = s, u = h.find(t => l[t] === l.mth)) : n >= 1 || n <= -1 ? (d = n, u = h.find(t => l[t] === l.wk)) : o >= 1 || o <= -1 ? (d = o, u = h.find(t => l[t] === l.day)) : a >= 1 || a <= -1 ? (d = a, u = h.find(t => l[t] === l.hr)) : (c >= 1 || c <= -1) && (d = c, u = h.find(t => l[t] === l.min));
    return {
      rate: parseFloat(formatNumber(d, e)),
      unit: u
    };
  }
  /** @eyes-analysis
   * 执行 getRateDisplay 对应的组件业务步骤；调用 this.getRateUnit。
   * 调用线索：this._manager.getTimeRate、this.getRateUnit。
   */
  getRateDisplay(t = this._manager.getTimeRate()) {
    if (0 === t) return "paused";
    if (1 === t) return "real rate";
    const {
      rate: rate,
      unit: unit
    } = this.getRateUnit(t);
    return `${rate} ${unit}${1 === rate ? "" : "s"}/s`;
  }
  /** @eyes-analysis
   * 执行 setCanUpdate 对应的组件业务步骤；写入 _canUpdate。
   * 状态写入：_canUpdate。
   * 调用线索：Boolean。
   */
  setCanUpdate(t) {
    this._canUpdate = Boolean(t);
  }
  /** @eyes-analysis
   * 执行 update 对应的组件业务步骤；调用 this._manager.isNow, this.setState；写入 _currentIsLive。
   * 状态写入：_currentIsLive。
   * 调用线索：this._manager.isNow、this.setState。
   */
  update() {
    const currentIsLive = this._manager.isNow();
    this._currentIsLive !== currentIsLive && (this.setState({
      isLiveClass: currentIsLive ? "live" : ""
    }), this._currentIsLive = currentIsLive);
  }
  /** @eyes-analysis
   * 卸载 DOM 并取消业务订阅；调用 super.__disable。
   * 调用线索：clearTimeout、super.__disable。
   */
  __disable() {
    super.__disable();
    clearTimeout(this._touchTimeout);
  }
}
TimeControls.html = getTimeControlsTemplate();
export { TimeControls };
