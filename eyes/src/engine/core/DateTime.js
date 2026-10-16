// Recovered from app.js:703954-707354.
import * as Pioneer from "../pioneer/index.js";
class DateTime {
  year;
  month;
  day;
  hour;
  minute;
  second;
  millisecond;
  constructor(year = 1, month = 1, day = 1, hour = 0, minute = 0, second = 0, millisecond = 0) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.millisecond = millisecond;
  }
  copy(t) {
    this.year = t.year;
    this.month = t.month;
    this.day = t.day;
    this.hour = t.hour;
    this.minute = t.minute;
    this.second = t.second;
    this.millisecond = t.millisecond;
  }
  fromET(t) {
    const e = Pioneer.TimeUtils.etToUnix(t);
    DateTime._date.setTime(1e3 * e);
    this.year = DateTime._date.getUTCFullYear();
    this.month = DateTime._date.getUTCMonth() + 1;
    this.day = DateTime._date.getUTCDate();
    this.hour = DateTime._date.getUTCHours();
    this.minute = DateTime._date.getUTCMinutes();
    this.second = DateTime._date.getUTCSeconds();
    this.millisecond = DateTime._date.getUTCMilliseconds();
    for (let i = 0, n = Pioneer.TimeUtils.leapSeconds.length; i < n; i++) if (Math.floor(e) === Pioneer.TimeUtils.leapSeconds[i] && e === Pioneer.TimeUtils.etToUnix(t - 1)) {
      this.second += 1;
      break;
    }
  }
  toET() {
    DateTime._date.setUTCFullYear(this.year);
    DateTime._date.setUTCMonth(this.month - 1);
    DateTime._date.setUTCDate(this.day);
    DateTime._date.setUTCHours(this.hour);
    DateTime._date.setUTCMinutes(this.minute);
    DateTime._date.setUTCSeconds(this.second);
    DateTime._date.setUTCMilliseconds(this.millisecond);
    const t = DateTime._date.getTime() / 1e3;
    let e = Pioneer.TimeUtils.unixToEt(t);
    if (60 === this.second) for (let i = 0, n = Pioneer.TimeUtils.leapSeconds.length; i < n; i++) if (Math.floor(t) === Pioneer.TimeUtils.leapSeconds[i] + 1) {
      e -= 1;
      break;
    }
    return e;
  }
  fromDOY(year, e, hour = 0, minute = 0, second = 0, millisecond = 0) {
    let r = 0;
    this.year = year;
    this.month = 1;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.millisecond = millisecond;
    let a = this.getDaysInMonth();
    for (; e > r + a && this.month < 12;) {
      r += a;
      this.month += 1;
      a = this.getDaysInMonth();
    }
    this.day = e - r;
  }
  toDOY() {
    const month = this.month;
    let e = 0;
    for (this.month = 1; this.month < month; this.month++) e += this.getDaysInMonth();
    this.month = month;
    e += this.day;
    return e;
  }
  isLeapYear() {
    return this.year % 4 == 0 && this.year % 100 != 0 || this.year % 400 == 0;
  }
  getDaysInMonth() {
    let t = DateTime._daysInMonth[Pioneer.MathUtils.wrap(this.month - 1, 0, 12)];
    2 === this.month && this.isLeapYear() && (t += 1);
    return t;
  }
  parse(t) {
    this.year = parseInt(t.substring(0, 4));
    t.length > 5 ? this.month = parseInt(t.substring(5, 7)) : this.month = 1;
    t.length > 8 ? this.day = parseInt(t.substring(8, 10)) : this.day = 1;
    t.length > 11 ? (this.hour = parseInt(t.substring(11, 13)), this.minute = parseInt(t.substring(14, 16))) : (this.hour = 0, this.minute = 0);
    t.length > 17 ? this.second = parseInt(t.substring(17, 19)) : this.second = 0;
    t.length > 20 ? this.millisecond = parseInt(t.substring(20)) * 10 ** (23 - t.length) : this.millisecond = 0;
  }
  parseDOY(t) {
    const e = parseInt(t.substring(0, 4));
    let i = 1;
    t.length > 5 && (i = parseInt(t.substring(5, 8)));
    this.fromDOY(e, i);
    t.length > 9 ? (this.hour = parseInt(t.substring(9, 11)), this.minute = parseInt(t.substring(12, 14))) : (this.hour = 0, this.minute = 0);
    t.length > 15 ? this.second = parseInt(t.substring(15, 17)) : this.second = 0;
    t.length > 18 ? this.millisecond = parseInt(t.substring(18)) * 10 ** (21 - t.length) : this.millisecond = 0;
  }
  toString() {
    return `${this.year.toString().padStart(4, "0")}-${this.month.toString().padStart(2, "0")}-${this.day.toString().padStart(2, "0")} ${this.hour.toString().padStart(2, "0")}:${this.minute.toString().padStart(2, "0")}:${this.second.toString().padStart(2, "0")}.${Math.floor(1e3 * this.millisecond).toString().padStart(6, "0")}`;
  }
  toStringDOY() {
    return `${this.year.toString().padStart(4, "0")}-${this.toDOY().toString().padStart(3, "0")}`;
  }
  static _daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  static _date = new Date();
}
export { DateTime };
