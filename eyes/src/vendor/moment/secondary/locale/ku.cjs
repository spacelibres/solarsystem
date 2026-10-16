/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 ku 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2071409-2072889.；literal: کانونی دووەم
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2071409-2072889.
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
    },
    r = ["کانونی دووەم", "شوبات", "ئازار", "نیسان", "ئایار", "حوزەیران", "تەمموز", "ئاب", "ئەیلوول", "تشرینی یەكەم", "تشرینی دووەم", "كانونی یەکەم"];
  e.defineLocale("ku", {
    months: r,
    monthsShort: r,
    weekdays: "یه‌كشه‌ممه‌_دووشه‌ممه‌_سێشه‌ممه‌_چوارشه‌ممه‌_پێنجشه‌ممه‌_هه‌ینی_شه‌ممه‌".split("_"),
    weekdaysShort: "یه‌كشه‌م_دووشه‌م_سێشه‌م_چوارشه‌م_پێنجشه‌م_هه‌ینی_شه‌ممه‌".split("_"),
    weekdaysMin: "ی_د_س_چ_پ_ه_ش".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    meridiemParse: /ئێواره‌|به‌یانی/,
    isPM: function (e) {
      return /ئێواره‌/.test(e);
    },
    meridiem: function (e, t, n) {
      return e < 12 ? "به‌یانی" : "ئێواره‌";
    },
    calendar: {
      sameDay: "[ئه‌مرۆ كاتژمێر] LT",
      nextDay: "[به‌یانی كاتژمێر] LT",
      nextWeek: "dddd [كاتژمێر] LT",
      lastDay: "[دوێنێ كاتژمێر] LT",
      lastWeek: "dddd [كاتژمێر] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "له‌ %s",
      past: "%s",
      s: "چه‌ند چركه‌یه‌ك",
      ss: "چركه‌ %d",
      m: "یه‌ك خوله‌ك",
      mm: "%d خوله‌ك",
      h: "یه‌ك كاتژمێر",
      hh: "%d كاتژمێر",
      d: "یه‌ك ڕۆژ",
      dd: "%d ڕۆژ",
      M: "یه‌ك مانگ",
      MM: "%d مانگ",
      y: "یه‌ك ساڵ",
      yy: "%d ساڵ"
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
      dow: 6,
      doy: 12
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
