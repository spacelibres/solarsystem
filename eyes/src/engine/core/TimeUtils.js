/** @eyes-analysis
 * 文件职责：ET 与 Unix 时间换算及时间单位辅助。
 * 依据：TimeUtils @2
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:43614-44988.
/** @eyes-analysis
 * 类职责：ET 与 Unix 时间换算及时间单位辅助。
 * 继承：无显式父类；导出：TimeUtils。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TimeUtils {
  /** @eyes-analysis
   * 【结构证据】返回 `TimeUtils.unixToEt(Date.now()/1e3)`；调用 `Date.now`、`TimeUtils.unixToEt`。
   * 调用线索：Date.now、TimeUtils.unixToEt。
   */
  static now() {
    return TimeUtils.unixToEt(Date.now() / 1e3);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t+946727957.816+e`。
   */
  static etToUnix(t) {
    let e = 0;
    for (let i = 0; i < TimeUtils.leapSeconds.length; i++) t + 946727957.816 + e >= TimeUtils.leapSeconds[i] + 1 && (e -= 1);
    return t + 946727957.816 + e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t-946727957.816+e`。
   */
  static unixToEt(t) {
    let e = 0;
    for (let i = 0; i < TimeUtils.leapSeconds.length; i++) t >= TimeUtils.leapSeconds[i] + 1 && (e += 1);
    return t - 946727957.816 + e;
  }
  static leapSeconds = [Date.UTC(1972, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1972, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1973, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1974, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1975, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1976, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1977, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1978, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1979, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1981, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1982, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1983, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1985, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1987, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1989, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1990, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1992, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1993, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1994, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1995, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1997, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1998, 11, 31, 23, 59, 59) / 1e3, Date.UTC(2005, 11, 31, 23, 59, 59) / 1e3, Date.UTC(2008, 11, 31, 23, 59, 59) / 1e3, Date.UTC(2012, 5, 30, 23, 59, 59) / 1e3, Date.UTC(2015, 5, 30, 23, 59, 59) / 1e3, Date.UTC(2016, 11, 31, 23, 59, 59) / 1e3];
}
export { TimeUtils };
