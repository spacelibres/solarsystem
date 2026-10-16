/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 sd 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1327525-1328528.；literal: جنوري
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1327525-1328528.
!function (e) {
  "use strict";

  var t = ["جنوري", "فيبروري", "مارچ", "اپريل", "مئي", "جون", "جولاءِ", "آگسٽ", "سيپٽمبر", "آڪٽوبر", "نومبر", "ڊسمبر"],
    n = ["آچر", "سومر", "اڱارو", "اربع", "خميس", "جمع", "ڇنڇر"];
  e.defineLocale("sd", {
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
      sameDay: "[اڄ] LT",
      nextDay: "[سڀاڻي] LT",
      nextWeek: "dddd [اڳين هفتي تي] LT",
      lastDay: "[ڪالهه] LT",
      lastWeek: "[گزريل هفتي] dddd [تي] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s پوء",
      past: "%s اڳ",
      s: "چند سيڪنڊ",
      ss: "%d سيڪنڊ",
      m: "هڪ منٽ",
      mm: "%d منٽ",
      h: "هڪ ڪلاڪ",
      hh: "%d ڪلاڪ",
      d: "هڪ ڏينهن",
      dd: "%d ڏينهن",
      M: "هڪ مهينو",
      MM: "%d مهينا",
      y: "هڪ سال",
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
}(require("../../../modules/MomentPrimary.cjs"));
