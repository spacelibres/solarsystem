// Recovered from app.js:43614-44988.
class TimeUtils {
  static now() {
    return TimeUtils.unixToEt(Date.now() / 1e3);
  }
  static etToUnix(t) {
    let e = 0;
    for (let i = 0; i < TimeUtils.leapSeconds.length; i++) t + 946727957.816 + e >= TimeUtils.leapSeconds[i] + 1 && (e -= 1);
    return t + 946727957.816 + e;
  }
  static unixToEt(t) {
    let e = 0;
    for (let i = 0; i < TimeUtils.leapSeconds.length; i++) t >= TimeUtils.leapSeconds[i] + 1 && (e += 1);
    return t - 946727957.816 + e;
  }
  static leapSeconds = [Date.UTC(1972, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1972, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1973, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1974, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1975, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1976, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1977, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1978, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1979, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1981, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1982, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1983, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1985, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1987, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1989, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1990, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1992, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1993, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1994, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1995, 11, 31, 23, 59, 59) / 1e3, Date.UTC(1997, 5, 30, 23, 59, 59) / 1e3, Date.UTC(1998, 11, 31, 23, 59, 59) / 1e3, Date.UTC(2005, 11, 31, 23, 59, 59) / 1e3, Date.UTC(2008, 11, 31, 23, 59, 59) / 1e3, Date.UTC(2012, 5, 30, 23, 59, 59) / 1e3, Date.UTC(2015, 5, 30, 23, 59, 59) / 1e3, Date.UTC(2016, 11, 31, 23, 59, 59) / 1e3];
}
export { TimeUtils };
