/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 ur 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2150718-2151722.；literal: جنوری
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2150718-2151722.
!function (e) {
  "use strict";

  var t = ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر"],
    n = ["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"];
  e.defineLocale("ur", {
    months: t,
    monthsShort: t,
    weekdays: n,
    weekdaysShort: n,
    weekdaysMin: n,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd، D MMMM YYYY HH:mm"
    },
    meridiemParse: /صبح|شام/,
    isPM: function (e) {
      return "شام" === e;
    },
    meridiem: function (e, t, n) {
      return e < 12 ? "صبح" : "شام";
    },
    calendar: {
      sameDay: "[آج بوقت] LT",
      nextDay: "[کل بوقت] LT",
      nextWeek: "dddd [بوقت] LT",
      lastDay: "[گذشتہ روز بوقت] LT",
      lastWeek: "[گذشتہ] dddd [بوقت] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s بعد",
      past: "%s قبل",
      s: "چند سیکنڈ",
      ss: "%d سیکنڈ",
      m: "ایک منٹ",
      mm: "%d منٹ",
      h: "ایک گھنٹہ",
      hh: "%d گھنٹے",
      d: "ایک دن",
      dd: "%d دن",
      M: "ایک ماہ",
      MM: "%d ماہ",
      y: "ایک سال",
      yy: "%d سال"
    },
    preparse: function (e) {
      return e.replace(/،/g, ",");
    },
    postformat: function (e) {
      return e.replace(/,/g, "،");
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
