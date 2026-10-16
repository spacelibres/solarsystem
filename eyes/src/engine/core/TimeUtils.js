/** 输入输出均为秒；ET/Unix 使用固定基准 946727957.816 与已列出的闰秒，Date.now 先从毫秒换秒。 */
// Recovered from app.js:43614-44988.
class TimeUtils {
  static now() {
    return TimeUtils.unixToEt(Date.now() / 1e3);
  }
  /** 闰秒所在 ET 区间可映射到相同 Unix 秒；转换按表逐项修正，不把 Unix 时间当成可表示 second=60 的连续标尺。 */
  static etToUnix(ephemerisSeconds) {
    let leapAdjustment = 0;
    for (let leapIndex = 0; leapIndex < TimeUtils.leapSeconds.length; leapIndex++) if (ephemerisSeconds + 946727957.816 + leapAdjustment >= TimeUtils.leapSeconds[leapIndex] + 1) {
      leapAdjustment -= 1;
    }
    return ephemerisSeconds + 946727957.816 + leapAdjustment;
  }
  static unixToEt(unixSeconds) {
    let leapAdjustment = 0;
    for (let leapIndex = 0; leapIndex < TimeUtils.leapSeconds.length; leapIndex++) if (unixSeconds >= TimeUtils.leapSeconds[leapIndex] + 1) {
      leapAdjustment += 1;
    }
    return unixSeconds - 946727957.816 + leapAdjustment;
  }
  static leapSeconds = [Date.UTC(1972, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1972, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1973, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1974, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1975, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1976, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1977, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1978, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1979, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1981, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1982, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1983, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1985, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1987, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1989, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1990, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1992, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1993, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1994, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1995, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1997, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1998, 11, 31, 23, 59, 59) / 1e3, Date.UTC(2005, 11, 31, 23, 59, 59) / 1e3, Date.UTC(2008, 11, 31, 23, 59, 59) / 1e3, Date.UTC(2012, 5, 30, 23, 59, 59) / 1e3, Date.UTC(2015, 5, 30, 23, 59, 59) / 1e3, Date.UTC(2016, 11, 31, 23, 59, 59) / 1e3];
}
export { TimeUtils };
