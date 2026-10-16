/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 hy-am 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2054416-2055907.；literal: hy-am
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2054416-2055907.
!function (e) {
  "use strict";

  e.defineLocale("hy-am", {
    months: {
      format: "հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_"),
      standalone: "հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր".split("_")
    },
    monthsShort: "հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_"),
    weekdays: "կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_"),
    weekdaysShort: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
    weekdaysMin: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY թ.",
      LLL: "D MMMM YYYY թ., HH:mm",
      LLLL: "dddd, D MMMM YYYY թ., HH:mm"
    },
    calendar: {
      sameDay: "[այսօր] LT",
      nextDay: "[վաղը] LT",
      lastDay: "[երեկ] LT",
      nextWeek: function () {
        return "dddd [օրը ժամը] LT";
      },
      lastWeek: function () {
        return "[անցած] dddd [օրը ժամը] LT";
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "%s հետո",
      past: "%s առաջ",
      s: "մի քանի վայրկյան",
      ss: "%d վայրկյան",
      m: "րոպե",
      mm: "%d րոպե",
      h: "ժամ",
      hh: "%d ժամ",
      d: "օր",
      dd: "%d օր",
      M: "ամիս",
      MM: "%d ամիս",
      y: "տարի",
      yy: "%d տարի"
    },
    meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
    isPM: function (e) {
      return /^(ցերեկվա|երեկոյան)$/.test(e);
    },
    meridiem: function (e) {
      return e < 4 ? "գիշերվա" : e < 12 ? "առավոտվա" : e < 17 ? "ցերեկվա" : "երեկոյան";
    },
    dayOfMonthOrdinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
    ordinal: function (e, t) {
      switch (t) {
        case "DDD":
        case "w":
        case "W":
        case "DDDo":
          return 1 === e ? e + "-ին" : e + "-րդ";
        default:
          return e;
      }
    },
    week: {
      dow: 1,
      doy: 7
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
