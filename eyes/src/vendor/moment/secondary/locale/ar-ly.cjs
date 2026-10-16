/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 ar-ly 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1970599-1972479.；literal: أقل من ثانية
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1970599-1972479.
!function (e) {
  "use strict";

  var t = {
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      0: "0"
    },
    n = function (e) {
      return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5;
    },
    r = {
      s: ["أقل من ثانية", "ثانية واحدة", ["ثانيتان", "ثانيتين"], "%d ثوان", "%d ثانية", "%d ثانية"],
      m: ["أقل من دقيقة", "دقيقة واحدة", ["دقيقتان", "دقيقتين"], "%d دقائق", "%d دقيقة", "%d دقيقة"],
      h: ["أقل من ساعة", "ساعة واحدة", ["ساعتان", "ساعتين"], "%d ساعات", "%d ساعة", "%d ساعة"],
      d: ["أقل من يوم", "يوم واحد", ["يومان", "يومين"], "%d أيام", "%d يومًا", "%d يوم"],
      M: ["أقل من شهر", "شهر واحد", ["شهران", "شهرين"], "%d أشهر", "%d شهرا", "%d شهر"],
      y: ["أقل من عام", "عام واحد", ["عامان", "عامين"], "%d أعوام", "%d عامًا", "%d عام"]
    },
    i = function (e) {
      return function (t, i, a, s) {
        var o = n(t),
          c = r[e][n(t)];
        return 2 === o && (c = c[i ? 0 : 1]), c.replace(/%d/i, t);
      };
    },
    a = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  e.defineLocale("ar-ly", {
    months: a,
    monthsShort: a,
    weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
    weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
    weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "D/‏M/‏YYYY",
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
      sameDay: "[اليوم عند الساعة] LT",
      nextDay: "[غدًا عند الساعة] LT",
      nextWeek: "dddd [عند الساعة] LT",
      lastDay: "[أمس عند الساعة] LT",
      lastWeek: "dddd [عند الساعة] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "بعد %s",
      past: "منذ %s",
      s: i("s"),
      ss: i("s"),
      m: i("m"),
      mm: i("m"),
      h: i("h"),
      hh: i("h"),
      d: i("d"),
      dd: i("d"),
      M: i("M"),
      MM: i("M"),
      y: i("y"),
      yy: i("y")
    },
    preparse: function (e) {
      return e.replace(/،/g, ",");
    },
    postformat: function (e) {
      return e.replace(/\d/g, function (e) {
        return t[e];
      }).replace(/,/g, "،");
    },
    week: {
      dow: 6,
      doy: 12
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
