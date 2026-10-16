/** @eyes-analysis
 * 文件职责：在 Moment 时区时间与 Pioneer ET 之间转换，控制播放速率、上下限和时间事件。
 * 依据：import ../pioneer/index.js；import ../../vendor/modules/FollowName.cjs
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1286770-1292424.
import * as Pioneer from "../pioneer/index.js";
import FollowName from "../../vendor/modules/FollowName.cjs";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
var getFollowName = () => FollowName;
/** @eyes-analysis
 * 类职责：在 Moment 时区时间与 Pioneer ET 之间转换，控制播放速率、上下限和时间事件。
 * 继承：EyesPublicApi.BaseManager；导出：TimeManager。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TimeManager extends EyesPublicApi.BaseManager {
  /** @eyes-analysis
   * 【结构证据】写入 `_dateFormats`、`_defaultLimits`、`_defaultRate`、`_ertMgr`、`_forcedPause`、`_isUTC`、`_localTimezone`、`_previousTimeRate`；调用 `Pioneer.TimeUtils.etToUnix`、`console.warn`、`getFollowName`、`getFollowName().tz`、`getFollowName().tz.guess`、`i.valueOf`。
   * 状态写入：_dateFormats、_defaultLimits、_defaultRate、_ertMgr、_forcedPause、_isUTC、_localTimezone、_previousTimeRate等；完整记录见索引。
   * 调用线索：Pioneer.TimeUtils.etToUnix、console.warn、getFollowName、getFollowName().tz、getFollowName().tz.guess等。
   */
  constructor(t) {
    super(t);
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
      const t = this.pioneer.getTime();
      const e = this.pioneer.getTimeRate();
      this._time = getFollowName().tz(1e3 * Pioneer.TimeUtils.etToUnix(t), this._timezone);
      let i = getFollowName().tz(1e3 * Pioneer.TimeUtils.etToUnix(t + e / this.pioneer.getFPS()), this._timezone);
      isNaN(i) && (i = this._time);
      this._timeLimits.max && i.valueOf() > this._timeLimits.max.valueOf() ? (console.warn("[Time Manager]: Clock has reached maximum limit."), this._onLimitReach("max")) : this._timeLimits.min && i.valueOf() < this._timeLimits.min.valueOf() ? (console.warn("[Time Manager]: Clock has reached minimum limit."), this._onLimitReach("min")) : this._timeLimits.max && i.valueOf() < this._timeLimits.max.valueOf() && this._timeLimits.min && i.valueOf() > this._timeLimits.min.valueOf() && this._forcedPause && (this._forcedPause = false, 0 === this.getTimeRate() && (this.play(), this.triggerCallbacks("forcedpauseresume", [this._time])));
      this.triggerCallbacks("update", [this._time]);
    }, true);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_forcedPause`、`_previousTimeRate`；调用 `this.getTimeRate`、`this.pause`、`this.setTime`、`this.triggerCallbacks`。
   * 状态写入：_forcedPause、_previousTimeRate。
   * 调用线索：this.getTimeRate、this.pause、this.setTime、this.triggerCallbacks。
   */
  _onLimitReach(t) {
    0 !== this.getTimeRate() && (this._forcedPause = true, this.pause(), this._previousTimeRate = 0, this.triggerCallbacks("forcedpause", [this._time, t]));
    this.setTime(this._timeLimits[t]);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_ertMgr`。
   * 状态写入：_ertMgr。
   */
  setERTManager(ertMgr) {
    this._ertMgr = ertMgr;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `1===this._rate&&Math.abs(this._time.valueOf()-this.getNow().valueOf())<1e3`；调用 `Math.abs`、`this._time.valueOf`、`this.getNow`、`this.getNow().valueOf`。
   * 调用线索：Math.abs、this._time.valueOf、this.getNow、this.getNow().valueOf。
   */
  isNow() {
    return 1 === this._rate && Math.abs(this._time.valueOf() - this.getNow().valueOf()) < 1e3;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t`；调用 `0,this._callbacks.getnow[e]`、`getFollowName`、`getFollowName()`、`getFollowName()().tz`。
   * 调用线索：0,this._callbacks.getnow[e]、getFollowName、getFollowName()、getFollowName()().tz。
   */
  getNow() {
    let t = getFollowName()().tz(this._timezone);
    for (let e = this._callbacks.getnow.length - 1; e >= 0; e--) {
      t = (0, this._callbacks.getnow[e])(t);
    }
    return t;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.getNow`、`this.setTime`。
   * 调用线索：this.getNow、this.setTime。
   */
  setToNow() {
    this.setTime(this.getNow());
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_startTime`。
   * 状态写入：_startTime。
   */
  setStartTime(startTime) {
    this._startTime = startTime;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.setTime`。
   * 调用线索：this.setTime。
   */
  setToStart() {
    null !== this._startTime && this.setTime(this._startTime);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._time`。
   */
  getTime() {
    return this._time;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_time`；调用 `Pioneer.TimeUtils.etToUnix`、`getFollowName`、`getFollowName().tz`、`this.momentToET`、`this.parseTime`、`this.pioneer.getTime`。
   * 状态写入：_time。
   * 调用线索：Pioneer.TimeUtils.etToUnix、getFollowName、getFollowName().tz、this.momentToET、this.parseTime等。
   */
  setTime(t) {
    t = this.parseTime(t);
    const e = this.momentToET(t);
    this.pioneer.setTime(e);
    this._time = getFollowName().tz(1e3 * Pioneer.TimeUtils.etToUnix(this.pioneer.getTime()), this._timezone);
    this.triggerCallbacks("change", [this._time]);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `isUTC?getFollowName().utc(t):getFollowName().tz(t,s,true,this._localTimezone)`；调用 `getFollowName`、`getFollowName().tz`、`getFollowName().utc`、`t.match`、`this.getDateFormat`。
   * 调用线索：getFollowName、getFollowName().tz、getFollowName().utc、t.match、this.getDateFormat。
   */
  parseTime(t, e = "url") {
    let isUTC = this._isUTC;
    let s = getFollowName().ISO_8601;
    if ("string" == typeof t && "" !== t) {
      const n = /^(?:[1-9]\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)-02-29)T(?:[01]\d|2[0-3]):[0-5]\d(?:|:[0-5]\d)(?:\.\d{1,6})?(?:|Z|[+-][01]\d:[0-5]\d)$/;
      isUTC = null !== t.match(n);
      const o = isUTC ? "utc" : "local";
      const r = this.getDateFormat(e, o);
      r && (s = r);
    } else "number" == typeof t && (isUTC = true);
    return isUTC ? getFollowName().utc(t) : getFollowName().tz(t, s, true, this._localTimezone);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `null` 或 `e.isValid()?e:null`；调用 `Pioneer.TimeUtils.etToUnix`、`e.isValid`、`getFollowName`、`getFollowName().tz`、`isFinite`。
   * 调用线索：Pioneer.TimeUtils.etToUnix、e.isValid、getFollowName、getFollowName().tz、isFinite。
   */
  etToMoment(t) {
    if (!isFinite(t)) return null;
    const e = getFollowName().tz(1e3 * Pioneer.TimeUtils.etToUnix(t), "Etc/UTC");
    return e.isValid() ? e : null;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `Math.round(1e3*i)/1e3`；调用 `Math.round`、`Pioneer.TimeUtils.unixToEt`、`t.valueOf`。
   * 调用线索：Math.round、Pioneer.TimeUtils.unixToEt、t.valueOf。
   */
  momentToET(t) {
    const e = t.valueOf() / 1e3;
    const i = Pioneer.TimeUtils.unixToEt(e);
    return Math.round(1e3 * i) / 1e3;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.momentToET(e)`；调用 `this.momentToET`、`this.parseTime`。
   * 调用线索：this.momentToET、this.parseTime。
   */
  urlToET(t) {
    const e = this.parseTime(t);
    return this.momentToET(e);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._timezone`。
   */
  getTimezone() {
    return this._timezone;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._utcTimezone`。
   */
  getUTCTimezone() {
    return this._utcTimezone;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._localTimezone`。
   */
  getLocalTimezone() {
    return this._localTimezone;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._isUTC`。
   */
  isUTC() {
    return this._isUTC;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_isUTC`、`_timezone`；调用 `this.triggerCallbacks`。
   * 状态写入：_isUTC、_timezone。
   * 调用线索：this.triggerCallbacks。
   */
  setDisplayUTC(isUTC) {
    this._isUTC = isUTC;
    this._timezone = this._isUTC ? this._utcTimezone : this._localTimezone;
    this.triggerCallbacks("timezone", [isUTC]);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._dateFormats`。
   */
  getDateFormats() {
    return this._dateFormats;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_dateFormats[e]`；调用 `Object.assign`、`Object.entries`。
   * 状态写入：_dateFormats[e]。
   * 调用线索：Object.assign、Object.entries。
   */
  setDateFormats(t) {
    for (const [e, i] of Object.entries(t)) void 0 !== this._dateFormats[e] ? Object.assign(this._dateFormats[e], i) : this._dateFormats[e] = i;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._dateFormats[e][t]`。
   */
  getDateFormat(t, e) {
    e || (e = this._isUTC ? "utc" : "local");
    return this._dateFormats[e][t];
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_dateFormats[t]`。
   * 状态写入：_dateFormats[t]。
   */
  setDateFormat(t, e) {
    this._dateFormats[t] = e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._timeLimits`。
   */
  getLimits() {
    return this._timeLimits;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_timeLimits.max`、`_timeLimits.min`；调用 `t.max.clone`、`t.min.clone`。
   * 状态写入：_timeLimits.max、_timeLimits.min。
   * 调用线索：t.max.clone、t.min.clone。
   */
  setLimits(t) {
    this._timeLimits.min = t.min.clone();
    this._timeLimits.max = t.max.clone();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._defaultLimits`。
   */
  getDefaultLimits() {
    return this._defaultLimits;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_defaultLimits.max`、`_defaultLimits.min`；调用 `t.max.clone`、`t.min.clone`。
   * 状态写入：_defaultLimits.max、_defaultLimits.min。
   * 调用线索：t.max.clone、t.min.clone。
   */
  setDefaultLimits(t) {
    this._defaultLimits.min = t.min.clone();
    this._defaultLimits.max = t.max.clone();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_timeLimits.max`、`_timeLimits.min`；调用 `this._defaultLimits.max.clone`、`this._defaultLimits.min.clone`。
   * 状态写入：_timeLimits.max、_timeLimits.min。
   * 调用线索：this._defaultLimits.max.clone、this._defaultLimits.min.clone。
   */
  resetLimits() {
    this._timeLimits.min = this._defaultLimits.min.clone();
    this._timeLimits.max = this._defaultLimits.max.clone();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_timeLimits.min`；调用 `getFollowName`、`getFollowName().tz`。
   * 状态写入：_timeLimits.min。
   * 调用线索：getFollowName、getFollowName().tz。
   */
  setMin(t) {
    this._timeLimits.min = getFollowName().tz(t, this._timezone);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_timeLimits.min`；调用 `this._defaultLimits.min.clone`。
   * 状态写入：_timeLimits.min。
   * 调用线索：this._defaultLimits.min.clone。
   */
  resetMin() {
    this._timeLimits.min = this._defaultLimits.min.clone();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_timeLimits.max`；调用 `getFollowName`、`getFollowName().tz`。
   * 状态写入：_timeLimits.max。
   * 调用线索：getFollowName、getFollowName().tz。
   */
  setMax(t) {
    this._timeLimits.max = getFollowName().tz(t, this._timezone);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_timeLimits.max`；调用 `this._defaultLimits.max.clone`。
   * 状态写入：_timeLimits.max。
   * 调用线索：this._defaultLimits.max.clone。
   */
  resetMax() {
    this._timeLimits.max = this._defaultLimits.max.clone();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e.utc().format(this._dateFormats.utc.url)`；调用 `e.utc`、`e.utc().format`、`getFollowName`、`getFollowName().tz`、`getFollowName().utc`。
   * 调用线索：e.utc、e.utc().format、getFollowName、getFollowName().tz、getFollowName().utc。
   */
  getTimeUrl(t) {
    let e;
    e = t ? getFollowName().utc(getFollowName().tz(t, this._timezone)) : getFollowName().utc(this._time);
    return e.utc().format(this._dateFormats.utc.url);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._defaultRate`。
   */
  getDefaultTimeRate() {
    return this._defaultRate;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_defaultRate`。
   * 状态写入：_defaultRate。
   */
  setDefaultTimeRate(defaultRate) {
    this._defaultRate = defaultRate;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.setTimeRate`。
   * 调用线索：this.setTimeRate。
   */
  resetTimeRate() {
    this.setTimeRate(this._defaultRate);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.pioneer.getTimeRate()`；调用 `this.pioneer.getTimeRate`。
   * 调用线索：this.pioneer.getTimeRate。
   */
  getTimeRate() {
    return this.pioneer.getTimeRate();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_rate`；调用 `this.pioneer.setTimeRate`、`this.triggerCallbacks`。
   * 状态写入：_rate。
   * 调用线索：this.pioneer.setTimeRate、this.triggerCallbacks。
   */
  setTimeRate(rate) {
    this._rate = rate;
    this.pioneer.setTimeRate(rate);
    this.triggerCallbacks("ratechange", [this._rate]);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.setTimeRate`。
   * 调用线索：this.setTimeRate。
   */
  play() {
    const t = 0 === this._previousTimeRate ? this._defaultRate : this._previousTimeRate;
    this.setTimeRate(t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_previousTimeRate`；调用 `this.getTimeRate`、`this.setTimeRate`。
   * 状态写入：_previousTimeRate。
   * 调用线索：this.getTimeRate、this.setTimeRate。
   */
  pause() {
    this._previousTimeRate = this.getTimeRate();
    this.setTimeRate(0);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `getFollowName()(i,"X")`；调用 `e.unix`、`getFollowName`、`getFollowName()`、`t.unix`。
   * 调用线索：e.unix、getFollowName、getFollowName()、t.unix。
   */
  getMidTime(t, e) {
    const i = (t.unix() + e.unix()) / 2;
    return getFollowName()(i, "X");
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._eventNames`。
   */
  getEventNames() {
    return this._eventNames;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._timeLimits.min&&t.isBefore(this._timeLimits.min)?-1:this._timeLimits.max&&t.isAfter(this._timeLimits.max)?1:0`；调用 `t.isAfter`、`t.isBefore`。
   * 调用线索：t.isAfter、t.isBefore。
   */
  isWithinLimits(t) {
    return this._timeLimits.min && t.isBefore(this._timeLimits.min) ? -1 : this._timeLimits.max && t.isAfter(this._timeLimits.max) ? 1 : 0;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._timeLimits`。
   */
  get timeLimits() {
    return this._timeLimits;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._forcedPause`。
   */
  get forcedPause() {
    return this._forcedPause;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._previousTimeRate`。
   */
  get previousTimeRate() {
    return this._previousTimeRate;
  }
}
export { TimeManager };
