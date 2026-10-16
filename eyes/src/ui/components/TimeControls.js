// Recovered from app.js:1630483-1637426.
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/TimeControlsStyles.js";
import TimeControlsTemplate from "../templates/TimeControlsTemplate.html";
var getTimeControlsTemplate = () => TimeControlsTemplate;
const {
  formatNumber: formatNumber,
  throttle: throttle
} = Eyes.AppUtils;
const secondsPerUnit = {
  yr: 31536e3,
  mth: 2592e3,
  wk: 604800,
  day: 86400,
  hr: 3600,
  min: 60,
  sec: 1
};
/* 滑块位置通过双向分段速率表转换，反向速率限制为不高于 -1；旋钮图形只是速率的视觉投影。路由写入节流与绘图节流独立，停用清理触摸提示计时器。 */
class TimeControls extends Eyes.BaseComponent {
  constructor(app, options = {}) {
    super(app, null, {
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
      ...options
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
    this._resizeObserver = new ResizeObserver(resizeEntries => {
      resizeEntries.forEach(resizeEntry => {
        const {
          svgParent: svgParent
        } = this._children;
        const {
          width: width
        } = resizeEntry.contentRect;
        svgParent.setAttribute("width", width);
        const controlPointInset = .1 * width;
        this._curve.cp1x = controlPointInset;
        this._curve.cp2x = width - controlPointInset;
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
    const isPlaying = 0 !== this._manager.getTimeRate();
    this.setState({
      isPlaying: isPlaying,
      playIconClass: this._class.isPlaying[isPlaying],
      rateDisplay: this.getRateDisplay()
    });
    this.bindFunctions(["_onRateChange", "_onSliderMove", "_onTouchStart", "_onTouchEnd", "update"]);
    this._drawKnobThrottled = throttle(this._drawKnob, 50);
    this._setQueryDebounced = throttle(this._setQuery, 200);
  }
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
  _onRateChange(currentRate) {
    currentRate >= this._rates[0] && currentRate <= this._rates[this._rates.length - 1] ? this._setRate(currentRate) : this._setQuery(1);
  }
  _onSliderMove(inputEvent) {
    const {
      timeLimit: timeLimit
    } = this._state;
    const {
      value: value
    } = inputEvent.target;
    if ("max" === timeLimit && value > 45 || "min" === timeLimit && value < 55) return void (inputEvent.target.value = 50);
    const currentRate = this._ratesMap[value];
    this._canUpdate && this._currentRate !== currentRate ? (this._normValue = value / 100, this._currentRate = currentRate, this._drawKnobThrottled(this._normValue), this._setQueryDebounced(currentRate)) : inputEvent.target.value = 100 * this._normValue;
  }
  _onTouchStart(touchEvent) {
    const {
      touchActiveClass: touchActiveClass
    } = this._state;
    const isSliderTarget = touchEvent.target?.classList.contains("slider-input");
    const isRealtimeTarget = touchEvent.target?.classList.contains("realtime");
    touchActiveClass || isSliderTarget || isRealtimeTarget || touchEvent.preventDefault();
    clearTimeout(this._touchTimeout);
    this.setState({
      touchActiveClass: "touchactive"
    });
  }
  _onTouchEnd() {
    this._touchTimeout = setTimeout(() => {
      this.setState({
        touchActiveClass: ""
      });
    }, this._activeDelay);
  }
  _createRatesMap() {
    const realRateIndex = this._rates.indexOf(1);
    const forwardIntervalCount = this._rates.length - realRateIndex - 1;
    const reverseStepWidth = 50 / realRateIndex;
    const forwardStepWidth = 50 / forwardIntervalCount;
    const reverseRates = this._rates.slice(0, realRateIndex);
    const forwardRates = this._rates.slice(realRateIndex);
    this._ratesMap = [];
    reverseRates.forEach((startRate, rateIndex) => {
      const intervalStart = Math.round(rateIndex * reverseStepWidth);
      const intervalWidth = Math.round((rateIndex + 1) * reverseStepWidth) - intervalStart;
      const endRate = reverseRates[rateIndex + 1] ?? 0;
      for (let stepIndex = 0; stepIndex < intervalWidth; stepIndex++) {
        const interpolatedRate = startRate + stepIndex / intervalWidth * (endRate - startRate);
        const roundedRate = interpolatedRate > -1 ? -1 : this._roundRate(interpolatedRate);
        this._ratesMap.push(Math.floor(roundedRate));
      }
    });
    forwardRates.forEach((startRate, rateIndex) => {
      const intervalStart = 50 + Math.round(rateIndex * forwardStepWidth);
      const intervalWidth = (rateIndex < forwardRates.length - 1 ? 50 + Math.round((rateIndex + 1) * forwardStepWidth) : 101) - intervalStart;
      const endRate = forwardRates[rateIndex + 1] || forwardRates[forwardRates.length - 1];
      for (let stepIndex = 0; stepIndex < intervalWidth; stepIndex++) {
        const interpolatedRate = startRate + stepIndex / intervalWidth * (endRate - startRate);
        const roundedRate = this._roundRate(interpolatedRate);
        this._ratesMap.push(Math.floor(roundedRate));
      }
    });
  }
  _roundRate(currentRate) {
    const {
      rate: rate,
      unit: unit
    } = this.getRateUnit(currentRate);
    return rate * secondsPerUnit[unit];
  }
  _drawCurve() {
    const {
      x: startX,
      y: startY,
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
    sliderPath.setAttribute("d", `M${startX},${startY} C${cp1x},${cp1y} ${cp2x},${cp2y} ${endx},${endy}`);
  }
  _drawKnob(normalizedPosition) {
    const {
      endx: endx,
      cp1y: cp1y
    } = this._curve;
    const knobX = normalizedPosition * endx;
    const knobY = .75 * cp1y * (1 - .95 * Math.pow(2 * Math.abs(normalizedPosition - .5), 3.2));
    const knobOffsetY = knobY - cp1y;
    this._element.style.setProperty("--knobX", `${knobX}px`);
    this._element.style.setProperty("--knobY", `${knobY}px`);
    this._element.style.setProperty("--knobOffsetY", `${knobOffsetY}px`);
  }
  _setRate(currentRate) {
    const {
      inputRange: inputRange
    } = this._children;
    const isPlaying = 0 !== currentRate;
    const wasPlaying = 0 !== this._currentRate;
    const timeLimit = isPlaying ? null : this._getTimeLimit();
    const isAtMaximum = "max" === timeLimit;
    const isAtLimit = isAtMaximum || "min" === timeLimit;
    this._rateBeforePause = isPlaying || isAtLimit || !wasPlaying ? null : this._currentRate;
    const playIconClass = isAtMaximum ? "rate-replay" : this._class.isPlaying[isPlaying];
    if (isPlaying && this._currentRate !== currentRate || isAtLimit) {
      const sliderValue = isAtLimit ? 50 : this._getValueFromRate(currentRate);
      sliderValue && (inputRange.value = sliderValue);
      this._normValue = inputRange.value / 100;
      this._drawKnob(this._normValue);
      this._currentRate = currentRate;
    }
    const showRealtimeButton = this._normValue < .47 || this._normValue > .53;
    this.setState({
      isPlaying: isPlaying,
      isPlayingClass: isPlaying ? "" : "paused",
      realTimeBtnClass: showRealtimeButton ? "" : "hidden",
      playIconClass: playIconClass,
      rateDisplay: this.getRateDisplay(currentRate),
      timeLimit: timeLimit
    });
    this._timeLimit = null;
  }
  _getTimeLimit() {
    const {
      min: min,
      max: max
    } = this._manager.timeLimits;
    const currentTime = this._manager.getTime();
    return Math.abs(currentTime.valueOf() - max.valueOf()) < 10 ? "max" : Math.abs(currentTime.valueOf() - min.valueOf()) < 10 ? "min" : null;
  }
  _getValueFromRate(currentRate) {
    const exactIndex = this._ratesMap.indexOf(currentRate);
    if (exactIndex > -1) return exactIndex;
    for (let rateIndex = 0; rateIndex < this._ratesMap.length - 1; rateIndex++) {
      const lowerRate = this._ratesMap[rateIndex];
      const upperRate = this._ratesMap[rateIndex + 1];
      if (currentRate >= lowerRate && currentRate <= upperRate) {
        return rateIndex + (currentRate - lowerRate) / (upperRate - lowerRate);
      }
    }
    return 50;
  }
  _setQuery(currentRate, currentTime) {
    this._router.navigate({
      rate: currentRate,
      time: this._manager.getTimeUrl(currentTime)
    });
  }
  decreaseRate() {
    if (!this._canUpdate) return;
    const {
      timeLimit: timeLimit
    } = this._state;
    const effectiveRate = (0 === this._currentRate ? this._rateBeforePause : this._currentRate) || 1;
    const currentValue = this._getValueFromRate(effectiveRate);
    let nextIndex = currentValue % 1 > 0 ? Math.floor(currentValue) : currentValue - 1;
    for (; this._ratesMap[nextIndex] === effectiveRate;) nextIndex--;
    if (nextIndex <= 0) return;
    const nextRate = "max" === timeLimit ? -1 : this._ratesMap[nextIndex];
    this._setQuery(nextRate);
  }
  increaseRate() {
    if (!this._canUpdate) return;
    const {
      timeLimit: timeLimit
    } = this._state;
    const effectiveRate = (0 === this._currentRate ? this._rateBeforePause : this._currentRate) || 1;
    const currentValue = this._getValueFromRate(effectiveRate);
    let nextIndex = currentValue % 1 > 0 ? Math.ceil(currentValue) : currentValue + 1;
    for (; this._ratesMap[nextIndex] === effectiveRate;) nextIndex++;
    if (nextIndex >= this._ratesMap.length || "max" === timeLimit) return;
    const nextRate = this._ratesMap[nextIndex];
    this._setQuery(nextRate);
  }
  playPauseRate(clickEvent, isPlaying = this._state.isPlaying) {
    if (!this._canUpdate) return;
    const {
      timeLimit: timeLimit
    } = this._state;
    if ("max" === timeLimit) return void this._app.getView("event")?.replayEvent();
    const resumedRate = this._rateBeforePause ?? 1;
    const nextRate = isPlaying ? 0 : resumedRate;
    this._setQuery(nextRate);
  }
  onRealtimeClick() {
    this._canUpdate && this._setQuery(1);
  }
  getRateUnit(currentRate, fractionDigits = 0) {
    const yearsPerSecond = currentRate / secondsPerUnit.yr;
    const monthsPerSecond = currentRate / secondsPerUnit.mth;
    const weeksPerSecond = currentRate / secondsPerUnit.wk;
    const daysPerSecond = currentRate / secondsPerUnit.day;
    const hoursPerSecond = currentRate / secondsPerUnit.hr;
    const minutesPerSecond = currentRate / secondsPerUnit.min;
    const unitNames = Object.keys(secondsPerUnit);
    let scaledRate = currentRate % secondsPerUnit.min;
    let unitName = unitNames.find(candidateUnit => secondsPerUnit[candidateUnit] === secondsPerUnit.sec);
    yearsPerSecond >= 1 || yearsPerSecond <= -1 ? (scaledRate = yearsPerSecond, unitName = unitNames.find(candidateUnit => secondsPerUnit[candidateUnit] === secondsPerUnit.yr)) : monthsPerSecond >= 1 || monthsPerSecond <= -1 ? (scaledRate = monthsPerSecond, unitName = unitNames.find(candidateUnit => secondsPerUnit[candidateUnit] === secondsPerUnit.mth)) : weeksPerSecond >= 1 || weeksPerSecond <= -1 ? (scaledRate = weeksPerSecond, unitName = unitNames.find(candidateUnit => secondsPerUnit[candidateUnit] === secondsPerUnit.wk)) : daysPerSecond >= 1 || daysPerSecond <= -1 ? (scaledRate = daysPerSecond, unitName = unitNames.find(candidateUnit => secondsPerUnit[candidateUnit] === secondsPerUnit.day)) : hoursPerSecond >= 1 || hoursPerSecond <= -1 ? (scaledRate = hoursPerSecond, unitName = unitNames.find(candidateUnit => secondsPerUnit[candidateUnit] === secondsPerUnit.hr)) : (minutesPerSecond >= 1 || minutesPerSecond <= -1) && (scaledRate = minutesPerSecond, unitName = unitNames.find(candidateUnit => secondsPerUnit[candidateUnit] === secondsPerUnit.min));
    return {
      rate: parseFloat(formatNumber(scaledRate, fractionDigits)),
      unit: unitName
    };
  }
  getRateDisplay(currentRate = this._manager.getTimeRate()) {
    if (0 === currentRate) return "paused";
    if (1 === currentRate) return "real rate";
    const {
      rate: rate,
      unit: unit
    } = this.getRateUnit(currentRate);
    return `${rate} ${unit}${1 === rate ? "" : "s"}/s`;
  }
  setCanUpdate(canUpdate) {
    this._canUpdate = Boolean(canUpdate);
  }
  update() {
    const currentIsLive = this._manager.isNow();
    this._currentIsLive !== currentIsLive && (this.setState({
      isLiveClass: currentIsLive ? "live" : ""
    }), this._currentIsLive = currentIsLive);
  }
  __disable() {
    super.__disable();
    clearTimeout(this._touchTimeout);
  }
}
TimeControls.html = getTimeControlsTemplate();
export { TimeControls };
