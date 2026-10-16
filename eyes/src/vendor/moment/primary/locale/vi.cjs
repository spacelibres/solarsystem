/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 vi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1366773-1368128.；literal: tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1366773-1368128.
!function (e) {
  "use strict";

  e.defineLocale("vi", {
    months: "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),
    monthsShort: "Thg 01_Thg 02_Thg 03_Thg 04_Thg 05_Thg 06_Thg 07_Thg 08_Thg 09_Thg 10_Thg 11_Thg 12".split("_"),
    monthsParseExact: !0,
    weekdays: "chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),
    weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
    weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
    weekdaysParseExact: !0,
    meridiemParse: /sa|ch/i,
    isPM: function (e) {
      return /^ch$/i.test(e);
    },
    meridiem: function (e, t, n) {
      return e < 12 ? n ? "sa" : "SA" : n ? "ch" : "CH";
    },
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM [năm] YYYY",
      LLL: "D MMMM [năm] YYYY HH:mm",
      LLLL: "dddd, D MMMM [năm] YYYY HH:mm",
      l: "DD/M/YYYY",
      ll: "D MMM YYYY",
      lll: "D MMM YYYY HH:mm",
      llll: "ddd, D MMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Hôm nay lúc] LT",
      nextDay: "[Ngày mai lúc] LT",
      nextWeek: "dddd [tuần tới lúc] LT",
      lastDay: "[Hôm qua lúc] LT",
      lastWeek: "dddd [tuần trước lúc] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s tới",
      past: "%s trước",
      s: "vài giây",
      ss: "%d giây",
      m: "một phút",
      mm: "%d phút",
      h: "một giờ",
      hh: "%d giờ",
      d: "một ngày",
      dd: "%d ngày",
      w: "một tuần",
      ww: "%d tuần",
      M: "một tháng",
      MM: "%d tháng",
      y: "một năm",
      yy: "%d năm"
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal: function (e) {
      return e;
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
