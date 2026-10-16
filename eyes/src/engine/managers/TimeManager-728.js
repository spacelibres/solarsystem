// Recovered from app.js:1286770-1292424.
import * as Pioneer from "../pioneer/index.js";
import FollowName from "../../vendor/modules/FollowName.cjs";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
var getFollowName = () => FollowName;
class TimeManager extends EyesPublicApi.BaseManager {
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
  _onLimitReach(t) {
    0 !== this.getTimeRate() && (this._forcedPause = true, this.pause(), this._previousTimeRate = 0, this.triggerCallbacks("forcedpause", [this._time, t]));
    this.setTime(this._timeLimits[t]);
  }
  setERTManager(ertMgr) {
    this._ertMgr = ertMgr;
  }
  isNow() {
    return 1 === this._rate && Math.abs(this._time.valueOf() - this.getNow().valueOf()) < 1e3;
  }
  getNow() {
    let t = getFollowName()().tz(this._timezone);
    for (let e = this._callbacks.getnow.length - 1; e >= 0; e--) {
      t = (0, this._callbacks.getnow[e])(t);
    }
    return t;
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
  setTime(t) {
    t = this.parseTime(t);
    const e = this.momentToET(t);
    this.pioneer.setTime(e);
    this._time = getFollowName().tz(1e3 * Pioneer.TimeUtils.etToUnix(this.pioneer.getTime()), this._timezone);
    this.triggerCallbacks("change", [this._time]);
  }
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
  etToMoment(t) {
    if (!isFinite(t)) return null;
    const e = getFollowName().tz(1e3 * Pioneer.TimeUtils.etToUnix(t), "Etc/UTC");
    return e.isValid() ? e : null;
  }
  momentToET(t) {
    const e = t.valueOf() / 1e3;
    const i = Pioneer.TimeUtils.unixToEt(e);
    return Math.round(1e3 * i) / 1e3;
  }
  urlToET(t) {
    const e = this.parseTime(t);
    return this.momentToET(e);
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
  setDateFormats(t) {
    for (const [e, i] of Object.entries(t)) void 0 !== this._dateFormats[e] ? Object.assign(this._dateFormats[e], i) : this._dateFormats[e] = i;
  }
  getDateFormat(t, e) {
    e || (e = this._isUTC ? "utc" : "local");
    return this._dateFormats[e][t];
  }
  setDateFormat(t, e) {
    this._dateFormats[t] = e;
  }
  getLimits() {
    return this._timeLimits;
  }
  setLimits(t) {
    this._timeLimits.min = t.min.clone();
    this._timeLimits.max = t.max.clone();
  }
  getDefaultLimits() {
    return this._defaultLimits;
  }
  setDefaultLimits(t) {
    this._defaultLimits.min = t.min.clone();
    this._defaultLimits.max = t.max.clone();
  }
  resetLimits() {
    this._timeLimits.min = this._defaultLimits.min.clone();
    this._timeLimits.max = this._defaultLimits.max.clone();
  }
  setMin(t) {
    this._timeLimits.min = getFollowName().tz(t, this._timezone);
  }
  resetMin() {
    this._timeLimits.min = this._defaultLimits.min.clone();
  }
  setMax(t) {
    this._timeLimits.max = getFollowName().tz(t, this._timezone);
  }
  resetMax() {
    this._timeLimits.max = this._defaultLimits.max.clone();
  }
  getTimeUrl(t) {
    let e;
    e = t ? getFollowName().utc(getFollowName().tz(t, this._timezone)) : getFollowName().utc(this._time);
    return e.utc().format(this._dateFormats.utc.url);
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
    const t = 0 === this._previousTimeRate ? this._defaultRate : this._previousTimeRate;
    this.setTimeRate(t);
  }
  pause() {
    this._previousTimeRate = this.getTimeRate();
    this.setTimeRate(0);
  }
  getMidTime(t, e) {
    const i = (t.unix() + e.unix()) / 2;
    return getFollowName()(i, "X");
  }
  getEventNames() {
    return this._eventNames;
  }
  isWithinLimits(t) {
    return this._timeLimits.min && t.isBefore(this._timeLimits.min) ? -1 : this._timeLimits.max && t.isAfter(this._timeLimits.max) ? 1 : 0;
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
