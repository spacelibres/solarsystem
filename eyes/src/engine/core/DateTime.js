/** @eyes-analysis
 * 文件职责：组织日期/时间显示与输入转换的应用工具。
 * 依据：import ../pioneer/index.js；DateTime @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:703954-707354.
import * as Pioneer from "../pioneer/index.js";
/** @eyes-analysis
 * 类职责：组织日期/时间显示与输入转换的应用工具。
 * 继承：无显式父类；导出：DateTime。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class DateTime {
  year;
  month;
  day;
  hour;
  minute;
  second;
  millisecond;
  /** @eyes-analysis
   * 【结构证据】写入 `day`、`hour`、`millisecond`、`minute`、`month`、`second`、`year`。
   * 状态写入：day、hour、millisecond、minute、month、second、year。
   */
  constructor(year = 1, month = 1, day = 1, hour = 0, minute = 0, second = 0, millisecond = 0) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.millisecond = millisecond;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `day`、`hour`、`millisecond`、`minute`、`month`、`second`、`year`。
   * 状态写入：day、hour、millisecond、minute、month、second、year。
   */
  copy(t) {
    this.year = t.year;
    this.month = t.month;
    this.day = t.day;
    this.hour = t.hour;
    this.minute = t.minute;
    this.second = t.second;
    this.millisecond = t.millisecond;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `day`、`hour`、`millisecond`、`minute`、`month`、`second`、`year`；调用 `DateTime._date.getUTCDate`、`DateTime._date.getUTCFullYear`、`DateTime._date.getUTCHours`、`DateTime._date.getUTCMilliseconds`、`DateTime._date.getUTCMinutes`、`DateTime._date.getUTCMonth`。
   * 状态写入：day、hour、millisecond、minute、month、second、year。
   * 调用线索：DateTime._date.getUTCDate、DateTime._date.getUTCFullYear、DateTime._date.getUTCHours、DateTime._date.getUTCMilliseconds、DateTime._date.getUTCMinutes等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `e`；调用 `DateTime._date.getTime`、`DateTime._date.setUTCDate`、`DateTime._date.setUTCFullYear`、`DateTime._date.setUTCHours`、`DateTime._date.setUTCMilliseconds`、`DateTime._date.setUTCMinutes`。
   * 调用线索：DateTime._date.getTime、DateTime._date.setUTCDate、DateTime._date.setUTCFullYear、DateTime._date.setUTCHours、DateTime._date.setUTCMilliseconds等。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `day`、`hour`、`millisecond`、`minute`、`month`、`second`、`year`；调用 `this.getDaysInMonth`。
   * 状态写入：day、hour、millisecond、minute、month、second、year。
   * 调用线索：this.getDaysInMonth。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `month`；返回 `e`；调用 `this.getDaysInMonth`。
   * 状态写入：month。
   * 调用线索：this.getDaysInMonth。
   */
  toDOY() {
    const month = this.month;
    let e = 0;
    for (this.month = 1; this.month < month; this.month++) e += this.getDaysInMonth();
    this.month = month;
    e += this.day;
    return e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.year%4==0&&this.year%100!=0||this.year%400==0`。
   */
  isLeapYear() {
    return this.year % 4 == 0 && this.year % 100 != 0 || this.year % 400 == 0;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t`；调用 `Pioneer.MathUtils.wrap`、`this.isLeapYear`。
   * 调用线索：Pioneer.MathUtils.wrap、this.isLeapYear。
   */
  getDaysInMonth() {
    let t = DateTime._daysInMonth[Pioneer.MathUtils.wrap(this.month - 1, 0, 12)];
    2 === this.month && this.isLeapYear() && (t += 1);
    return t;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `day`、`hour`、`millisecond`、`minute`、`month`、`second`、`year`；调用 `parseInt`、`t.substring`。
   * 状态写入：day、hour、millisecond、minute、month、second、year。
   * 调用线索：parseInt、t.substring。
   */
  parse(t) {
    this.year = parseInt(t.substring(0, 4));
    t.length > 5 ? this.month = parseInt(t.substring(5, 7)) : this.month = 1;
    t.length > 8 ? this.day = parseInt(t.substring(8, 10)) : this.day = 1;
    t.length > 11 ? (this.hour = parseInt(t.substring(11, 13)), this.minute = parseInt(t.substring(14, 16))) : (this.hour = 0, this.minute = 0);
    t.length > 17 ? this.second = parseInt(t.substring(17, 19)) : this.second = 0;
    t.length > 20 ? this.millisecond = parseInt(t.substring(20)) * 10 ** (23 - t.length) : this.millisecond = 0;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `hour`、`millisecond`、`minute`、`second`；调用 `parseInt`、`t.substring`、`this.fromDOY`。
   * 状态写入：hour、millisecond、minute、second。
   * 调用线索：parseInt、t.substring、this.fromDOY。
   */
  parseDOY(t) {
    const e = parseInt(t.substring(0, 4));
    let i = 1;
    t.length > 5 && (i = parseInt(t.substring(5, 8)));
    this.fromDOY(e, i);
    t.length > 9 ? (this.hour = parseInt(t.substring(9, 11)), this.minute = parseInt(t.substring(12, 14))) : (this.hour = 0, this.minute = 0);
    t.length > 15 ? this.second = parseInt(t.substring(15, 17)) : this.second = 0;
    t.length > 18 ? this.millisecond = parseInt(t.substring(18)) * 10 ** (21 - t.length) : this.millisecond = 0;
  }
  /** @eyes-analysis
   * 【结构证据】本访问器没有 AST 可见的 this 字段直接赋值；调用 `Math.floor`、`Math.floor(1e3*this.millisecond).toString`、`Math.floor(1e3*this.millisecond).toString().padStart`、`this.day.toString`、`this.day.toString().padStart`、`this.hour.toString`、`this.hour.toString().padStart`、`this.minute.toString`、`this.minute.toString().padStart`、`this.month.toString`、`this.month.toString().padStart`、`this.second.toString`、`this.second.toString().padStart`、`this.year.toString`、`this.year.toString().padStart`。
   * 调用线索：Math.floor、Math.floor(1e3*this.millisecond).toString、Math.floor(1e3*this.millisecond).toString().padStart、this.day.toString、this.day.toString().padStart等。
   */
  toString() {
    return `${this.year.toString().padStart(4, "0")}-${this.month.toString().padStart(2, "0")}-${this.day.toString().padStart(2, "0")} ${this.hour.toString().padStart(2, "0")}:${this.minute.toString().padStart(2, "0")}:${this.second.toString().padStart(2, "0")}.${Math.floor(1e3 * this.millisecond).toString().padStart(6, "0")}`;
  }
  /** @eyes-analysis
   * 【结构证据】返回 ``${this.year.toString().padStart(4,"0")}-${this.toDOY().toString().padStart(3,"0")}``；调用 `this.toDOY`、`this.toDOY().toString`、`this.toDOY().toString().padStart`、`this.year.toString`、`this.year.toString().padStart`。
   * 调用线索：this.toDOY、this.toDOY().toString、this.toDOY().toString().padStart、this.year.toString、this.year.toString().padStart。
   */
  toStringDOY() {
    return `${this.year.toString().padStart(4, "0")}-${this.toDOY().toString().padStart(3, "0")}`;
  }
  static _daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  static _date = new Date();
}
export { DateTime };
