/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 ar-sa 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1973449-1974867.；literal: ar-sa
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1973449-1974867.
!function (e) {
  "use strict";

  var t = {
      1: "١",
      2: "٢",
      3: "٣",
      4: "٤",
      5: "٥",
      6: "٦",
      7: "٧",
      8: "٨",
      9: "٩",
      0: "٠"
    },
    n = {
      "١": "1",
      "٢": "2",
      "٣": "3",
      "٤": "4",
      "٥": "5",
      "٦": "6",
      "٧": "7",
      "٨": "8",
      "٩": "9",
      "٠": "0"
    };
  e.defineLocale("ar-sa", {
    months: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
    monthsShort: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
    weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
    weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
    weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    meridiemParse: /ص|م/,
    isPM: function (e) {
      return "م" === e;
    },
    meridiem: function (e, t, n) {
      return e < 12 ? "ص" : "م";
    },
    calendar: {
      sameDay: "[اليوم على الساعة] LT",
      nextDay: "[غدا على الساعة] LT",
      nextWeek: "dddd [على الساعة] LT",
      lastDay: "[أمس على الساعة] LT",
      lastWeek: "dddd [على الساعة] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "في %s",
      past: "منذ %s",
      s: "ثوان",
      ss: "%d ثانية",
      m: "دقيقة",
      mm: "%d دقائق",
      h: "ساعة",
      hh: "%d ساعات",
      d: "يوم",
      dd: "%d أيام",
      M: "شهر",
      MM: "%d أشهر",
      y: "سنة",
      yy: "%d سنوات"
    },
    preparse: function (e) {
      return e.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (e) {
        return n[e];
      }).replace(/،/g, ",");
    },
    postformat: function (e) {
      return e.replace(/\d/g, function (e) {
        return t[e];
      }).replace(/,/g, "،");
    },
    week: {
      dow: 0,
      doy: 6
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
