// Recovered from app.js:1286770-1292424.
/* 通用时间管理器在引擎每帧回调中预测下一帧时间并检查边界，超界暂停，回到范围内可恢复。ET 与 Unix 秒换算，Moment 毫秒经 1000 转换；limits 克隆保存，getnow 回调串行传递同一时间值。 */
import * as Pioneer from "../pioneer/index.js";
import FollowName from "../../vendor/modules/FollowName.cjs";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
var getFollowName = () => FollowName;
class TimeManager extends EyesPublicApi.BaseManager {
  constructor(app) {
    super(app);
    this._dateFormats = {
      utc: {
        full: "YYYY-MM-D HH[:]mm[:]ss",
        datetime: "YYYY-MM-D HH[:]mm",
        date: "YYYY MMMM D",
        time: "HH[:]mm[:]ss",
        url: "YYYY-MM-DDTHH:mm:ss.SSSZ"
      },
      local: {
        full: "M/D/YY hh[:]mm[:]ss",
        datetime: "M/D/YY hh[:]mm",
        date: "MMMM D, YYYY",
        time: "hh[:]mm[:]ss",
        meridiem: "a"
      }
    };
    this._timeLimits = {
      min: null,
      max: null
    };
    this._defaultLimits = {
      min: null,
      max: null
    };
    this._startTime = null;
    this._forcedPause = false;
    this._isUTC = true;
    this._ertMgr = null;
    this._rate = 0;
    this._defaultRate = 1;
    this._utcTimezone = "Etc/UTC";
    this._localTimezone = getFollowName().tz.guess();
    this._previousTimeRate = this.pioneer.getTimeRate();
    this._timezone = this._utcTimezone;
    this._eventNames.push("update", "change", "timezone", "ratechange", "forcedpause", "forcedpauseresume", "getnow");
    this._initCallbacks();
    this.setToNow();
    this.pioneer.addCallback(() => {
      const currentEphemerisTime = this.pioneer.getTime();
      const timeRate = this.pioneer.getTimeRate();
      this._time = getFollowName().tz(1e3 * Pioneer.TimeUtils.etToUnix(currentEphemerisTime), this._timezone);
      let nextFrameTime = getFollowName().tz(1e3 * Pioneer.TimeUtils.etToUnix(currentEphemerisTime + timeRate / this.pioneer.getFPS()), this._timezone);
      isNaN(nextFrameTime) && (nextFrameTime = this._time);
      this._timeLimits.max && nextFrameTime.valueOf() > this._timeLimits.max.valueOf() ? (console.warn("[Time Manager]: Clock has reached maximum limit."), this._onLimitReach("max")) : this._timeLimits.min && nextFrameTime.valueOf() < this._timeLimits.min.valueOf() ? (console.warn("[Time Manager]: Clock has reached minimum limit."), this._onLimitReach("min")) : this._timeLimits.max && nextFrameTime.valueOf() < this._timeLimits.max.valueOf() && this._timeLimits.min && nextFrameTime.valueOf() > this._timeLimits.min.valueOf() && this._forcedPause && (this._forcedPause = false, 0 === this.getTimeRate() && (this.play(), this.triggerCallbacks("forcedpauseresume", [this._time])));
      this.triggerCallbacks("update", [this._time]);
    }, true);
  }
  _onLimitReach(limitName) {
    0 !== this.getTimeRate() && (this._forcedPause = true, this.pause(), this._previousTimeRate = 0, this.triggerCallbacks("forcedpause", [this._time, limitName]));
    this.setTime(this._timeLimits[limitName]);
  }
  setERTManager(ertMgr) {
    this._ertMgr = ertMgr;
  }
  isNow() {
    return 1 === this._rate && Math.abs(this._time.valueOf() - this.getNow().valueOf()) < 1e3;
  }
  getNow() {
    let currentTime = getFollowName()().tz(this._timezone);
    for (let callbackIndex = this._callbacks.getnow.length - 1; callbackIndex >= 0; callbackIndex--) {
      currentTime = (0, this._callbacks.getnow[callbackIndex])(currentTime);
    }
    return currentTime;
  }
  setToNow() {
    this.setTime(this.getNow());
  }
  setStartTime(startTime) {
    this._startTime = startTime;
  }
  setToStart() {
    null !== this._startTime && this.setTime(this._startTime);
  }
  getTime() {
    return this._time;
  }
  setTime(timeValue) {
    timeValue = this.parseTime(timeValue);
    const ephemerisTime = this.momentToET(timeValue);
    this.pioneer.setTime(ephemerisTime);
    this._time = getFollowName().tz(1e3 * Pioneer.TimeUtils.etToUnix(this.pioneer.getTime()), this._timezone);
    this.triggerCallbacks("change", [this._time]);
  }
  parseTime(timeValue, formatName = "url") {
    let isUTC = this._isUTC;
    let inputFormat = getFollowName().ISO_8601;
    if ("string" == typeof timeValue && "" !== timeValue) {
      const isoDateTimePattern = /^(?:[1-9]\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)-02-29)T(?:[01]\d|2[0-3]):[0-5]\d(?:|:[0-5]\d)(?:\.\d{1,6})?(?:|Z|[+-][01]\d:[0-5]\d)$/;
      isUTC = null !== timeValue.match(isoDateTimePattern);
      const formatGroup = isUTC ? "utc" : "local";
      const configuredFormat = this.getDateFormat(formatName, formatGroup);
      configuredFormat && (inputFormat = configuredFormat);
    } else "number" == typeof timeValue && (isUTC = true);
    return isUTC ? getFollowName().utc(timeValue) : getFollowName().tz(timeValue, inputFormat, true, this._localTimezone);
  }
  etToMoment(ephemerisTime) {
    if (!isFinite(ephemerisTime)) return null;
    const timeValue = getFollowName().tz(1e3 * Pioneer.TimeUtils.etToUnix(ephemerisTime), "Etc/UTC");
    return timeValue.isValid() ? timeValue : null;
  }
  momentToET(momentValue) {
    const unixSeconds = momentValue.valueOf() / 1e3;
    const ephemerisTime = Pioneer.TimeUtils.unixToEt(unixSeconds);
    return Math.round(1e3 * ephemerisTime) / 1e3;
  }
  urlToET(timeUrl) {
    const parsedTime = this.parseTime(timeUrl);
    return this.momentToET(parsedTime);
  }
  getTimezone() {
    return this._timezone;
  }
  getUTCTimezone() {
    return this._utcTimezone;
  }
  getLocalTimezone() {
    return this._localTimezone;
  }
  isUTC() {
    return this._isUTC;
  }
  setDisplayUTC(isUTC) {
    this._isUTC = isUTC;
    this._timezone = this._isUTC ? this._utcTimezone : this._localTimezone;
    this.triggerCallbacks("timezone", [isUTC]);
  }
  getDateFormats() {
    return this._dateFormats;
  }
  setDateFormats(formatsByTimezone) {
    for (const [formatGroup, formats] of Object.entries(formatsByTimezone)) void 0 !== this._dateFormats[formatGroup] ? Object.assign(this._dateFormats[formatGroup], formats) : this._dateFormats[formatGroup] = formats;
  }
  getDateFormat(formatName, formatGroup) {
    formatGroup || (formatGroup = this._isUTC ? "utc" : "local");
    return this._dateFormats[formatGroup][formatName];
  }
  setDateFormat(formatName, formatValue) {
    this._dateFormats[formatName] = formatValue;
  }
  getLimits() {
    return this._timeLimits;
  }
  setLimits(limits) {
    this._timeLimits.min = limits.min.clone();
    this._timeLimits.max = limits.max.clone();
  }
  getDefaultLimits() {
    return this._defaultLimits;
  }
  setDefaultLimits(limits) {
    this._defaultLimits.min = limits.min.clone();
    this._defaultLimits.max = limits.max.clone();
  }
  resetLimits() {
    this._timeLimits.min = this._defaultLimits.min.clone();
    this._timeLimits.max = this._defaultLimits.max.clone();
  }
  setMin(minimumTime) {
    this._timeLimits.min = getFollowName().tz(minimumTime, this._timezone);
  }
  resetMin() {
    this._timeLimits.min = this._defaultLimits.min.clone();
  }
  setMax(maximumTime) {
    this._timeLimits.max = getFollowName().tz(maximumTime, this._timezone);
  }
  resetMax() {
    this._timeLimits.max = this._defaultLimits.max.clone();
  }
  getTimeUrl(timeValue) {
    let utcTime;
    utcTime = timeValue ? getFollowName().utc(getFollowName().tz(timeValue, this._timezone)) : getFollowName().utc(this._time);
    return utcTime.utc().format(this._dateFormats.utc.url);
  }
  getDefaultTimeRate() {
    return this._defaultRate;
  }
  setDefaultTimeRate(defaultRate) {
    this._defaultRate = defaultRate;
  }
  resetTimeRate() {
    this.setTimeRate(this._defaultRate);
  }
  getTimeRate() {
    return this.pioneer.getTimeRate();
  }
  setTimeRate(rate) {
    this._rate = rate;
    this.pioneer.setTimeRate(rate);
    this.triggerCallbacks("ratechange", [this._rate]);
  }
  play() {
    const resumedRate = 0 === this._previousTimeRate ? this._defaultRate : this._previousTimeRate;
    this.setTimeRate(resumedRate);
  }
  pause() {
    this._previousTimeRate = this.getTimeRate();
    this.setTimeRate(0);
  }
  getMidTime(startTime, endTime) {
    const midpointUnixSeconds = (startTime.unix() + endTime.unix()) / 2;
    return getFollowName()(midpointUnixSeconds, "X");
  }
  getEventNames() {
    return this._eventNames;
  }
  isWithinLimits(timeValue) {
    return this._timeLimits.min && timeValue.isBefore(this._timeLimits.min) ? -1 : this._timeLimits.max && timeValue.isAfter(this._timeLimits.max) ? 1 : 0;
  }
  get timeLimits() {
    return this._timeLimits;
  }
  get forcedPause() {
    return this._forcedPause;
  }
  get previousTimeRate() {
    return this._previousTimeRate;
  }
}
export { TimeManager };
