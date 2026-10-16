// Recovered from app.js:703954-707354.
import * as Pioneer from "../pioneer/index.js";
/** 字段按 UTC 解释，month 为 1..12；ET/Unix 用 TimeUtils 闰秒表转换，second=60 单独补偿。共享 Date 暂存沿原设置顺序使用。 */

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
  copy(source) {
    this.year = source.year;
    this.month = source.month;
    this.day = source.day;
    this.hour = source.hour;
    this.minute = source.minute;
    this.second = source.second;
    this.millisecond = source.millisecond;
  }
  fromET(ephemerisSeconds) {
    const unixSeconds = Pioneer.TimeUtils.etToUnix(ephemerisSeconds);
    DateTime._date.setTime(1e3 * unixSeconds);
    this.year = DateTime._date.getUTCFullYear();
    this.month = DateTime._date.getUTCMonth() + 1;
    this.day = DateTime._date.getUTCDate();
    this.hour = DateTime._date.getUTCHours();
    this.minute = DateTime._date.getUTCMinutes();
    this.second = DateTime._date.getUTCSeconds();
    this.millisecond = DateTime._date.getUTCMilliseconds();
    for (let leapIndex = 0, leapCount = Pioneer.TimeUtils.leapSeconds.length; leapIndex < leapCount; leapIndex++) if (Math.floor(unixSeconds) === Pioneer.TimeUtils.leapSeconds[leapIndex] && unixSeconds === Pioneer.TimeUtils.etToUnix(ephemerisSeconds - 1)) {
      this.second += 1;
      break;
    }
  }
  /** 共享 Date 依次设置 UTC 字段，second=60 由 Unix 归一化后再回退一个 ET 秒；不在此轮改变月份溢出等旧顺序。 */
  toET() {
    DateTime._date.setUTCFullYear(this.year);
    DateTime._date.setUTCMonth(this.month - 1);
    DateTime._date.setUTCDate(this.day);
    DateTime._date.setUTCHours(this.hour);
    DateTime._date.setUTCMinutes(this.minute);
    DateTime._date.setUTCSeconds(this.second);
    DateTime._date.setUTCMilliseconds(this.millisecond);
    const unixSeconds = DateTime._date.getTime() / 1e3;
    let ephemerisSeconds = Pioneer.TimeUtils.unixToEt(unixSeconds);
    if (60 === this.second) for (let leapIndex = 0, leapCount = Pioneer.TimeUtils.leapSeconds.length; leapIndex < leapCount; leapIndex++) if (Math.floor(unixSeconds) === Pioneer.TimeUtils.leapSeconds[leapIndex] + 1) {
      ephemerisSeconds -= 1;
      break;
    }
    return ephemerisSeconds;
  }
  fromDOY(year, dayOfYear, hour = 0, minute = 0, second = 0, millisecond = 0) {
    let precedingDays = 0;
    this.year = year;
    this.month = 1;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.millisecond = millisecond;
    let daysInMonth = this.getDaysInMonth();
    for (; dayOfYear > precedingDays + daysInMonth && this.month < 12;) {
      precedingDays += daysInMonth;
      this.month += 1;
      daysInMonth = this.getDaysInMonth();
    }
    this.day = dayOfYear - precedingDays;
  }
  toDOY() {
    const month = this.month;
    let dayOfYear = 0;
    for (this.month = 1; this.month < month; this.month++) dayOfYear += this.getDaysInMonth();
    this.month = month;
    dayOfYear += this.day;
    return dayOfYear;
  }
  isLeapYear() {
    return this.year % 4 == 0 && this.year % 100 != 0 || this.year % 400 == 0;
  }
  getDaysInMonth() {
    let daysInMonth = DateTime._daysInMonth[Pioneer.MathUtils.wrap(this.month - 1, 0, 12)];
    if (2 === this.month && this.isLeapYear()) {
      daysInMonth += 1;
    }
    return daysInMonth;
  }
  parse(dateText) {
    this.year = parseInt(dateText.substring(0, 4));
    if (dateText.length > 5) {
      this.month = parseInt(dateText.substring(5, 7));
    } else {
      this.month = 1;
    }
    if (dateText.length > 8) {
      this.day = parseInt(dateText.substring(8, 10));
    } else {
      this.day = 1;
    }
    if (dateText.length > 11) {
      this.hour = parseInt(dateText.substring(11, 13));
      this.minute = parseInt(dateText.substring(14, 16));
    } else {
      this.hour = 0;
      this.minute = 0;
    }
    if (dateText.length > 17) {
      this.second = parseInt(dateText.substring(17, 19));
    } else {
      this.second = 0;
    }
    if (dateText.length > 20) {
      this.millisecond = parseInt(dateText.substring(20)) * 10 ** (23 - dateText.length);
    } else {
      this.millisecond = 0;
    }
  }
  parseDOY(dateText) {
    const year = parseInt(dateText.substring(0, 4));
    let dayOfYear = 1;
    if (dateText.length > 5) {
      dayOfYear = parseInt(dateText.substring(5, 8));
    }
    this.fromDOY(year, dayOfYear);
    if (dateText.length > 9) {
      this.hour = parseInt(dateText.substring(9, 11));
      this.minute = parseInt(dateText.substring(12, 14));
    } else {
      this.hour = 0;
      this.minute = 0;
    }
    if (dateText.length > 15) {
      this.second = parseInt(dateText.substring(15, 17));
    } else {
      this.second = 0;
    }
    if (dateText.length > 18) {
      this.millisecond = parseInt(dateText.substring(18)) * 10 ** (21 - dateText.length);
    } else {
      this.millisecond = 0;
    }
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
