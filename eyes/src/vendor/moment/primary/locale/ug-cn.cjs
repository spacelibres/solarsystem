/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 ug-cn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1359718-1361389.；literal: ug-cn
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1359718-1361389.
!function (e) {
  "use strict";

  e.defineLocale("ug-cn", {
    months: "يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر".split("_"),
    monthsShort: "يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر".split("_"),
    weekdays: "يەكشەنبە_دۈشەنبە_سەيشەنبە_چارشەنبە_پەيشەنبە_جۈمە_شەنبە".split("_"),
    weekdaysShort: "يە_دۈ_سە_چا_پە_جۈ_شە".split("_"),
    weekdaysMin: "يە_دۈ_سە_چا_پە_جۈ_شە".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "YYYY-MM-DD",
      LL: "YYYY-يىلىM-ئاينىڭD-كۈنى",
      LLL: "YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm",
      LLLL: "dddd، YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm"
    },
    meridiemParse: /يېرىم كېچە|سەھەر|چۈشتىن بۇرۇن|چۈش|چۈشتىن كېيىن|كەچ/,
    meridiemHour: function (e, t) {
      return 12 === e && (e = 0), "يېرىم كېچە" === t || "سەھەر" === t || "چۈشتىن بۇرۇن" === t ? e : "چۈشتىن كېيىن" === t || "كەچ" === t ? e + 12 : e >= 11 ? e : e + 12;
    },
    meridiem: function (e, t, n) {
      var r = 100 * e + t;
      return r < 600 ? "يېرىم كېچە" : r < 900 ? "سەھەر" : r < 1130 ? "چۈشتىن بۇرۇن" : r < 1230 ? "چۈش" : r < 1800 ? "چۈشتىن كېيىن" : "كەچ";
    },
    calendar: {
      sameDay: "[بۈگۈن سائەت] LT",
      nextDay: "[ئەتە سائەت] LT",
      nextWeek: "[كېلەركى] dddd [سائەت] LT",
      lastDay: "[تۆنۈگۈن] LT",
      lastWeek: "[ئالدىنقى] dddd [سائەت] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s كېيىن",
      past: "%s بۇرۇن",
      s: "نەچچە سېكونت",
      ss: "%d سېكونت",
      m: "بىر مىنۇت",
      mm: "%d مىنۇت",
      h: "بىر سائەت",
      hh: "%d سائەت",
      d: "بىر كۈن",
      dd: "%d كۈن",
      M: "بىر ئاي",
      MM: "%d ئاي",
      y: "بىر يىل",
      yy: "%d يىل"
    },
    dayOfMonthOrdinalParse: /\d{1,2}(-كۈنى|-ئاي|-ھەپتە)/,
    ordinal: function (e, t) {
      switch (t) {
        case "d":
        case "D":
        case "DDD":
          return e + "-كۈنى";
        case "w":
        case "W":
          return e + "-ھەپتە";
        default:
          return e;
      }
    },
    preparse: function (e) {
      return e.replace(/،/g, ",");
    },
    postformat: function (e) {
      return e.replace(/,/g, "،");
    },
    week: {
      dow: 1,
      doy: 7
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
