/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 mk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2083999-2085283.；literal: јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2083999-2085283.
!function (e) {
  "use strict";

  e.defineLocale("mk", {
    months: "јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"),
    monthsShort: "јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),
    weekdays: "недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"),
    weekdaysShort: "нед_пон_вто_сре_чет_пет_саб".split("_"),
    weekdaysMin: "нe_пo_вт_ср_че_пе_сa".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "D.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY H:mm",
      LLLL: "dddd, D MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[Денес во] LT",
      nextDay: "[Утре во] LT",
      nextWeek: "[Во] dddd [во] LT",
      lastDay: "[Вчера во] LT",
      lastWeek: function () {
        switch (this.day()) {
          case 0:
          case 3:
          case 6:
            return "[Изминатата] dddd [во] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[Изминатиот] dddd [во] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "за %s",
      past: "пред %s",
      s: "неколку секунди",
      ss: "%d секунди",
      m: "една минута",
      mm: "%d минути",
      h: "еден час",
      hh: "%d часа",
      d: "еден ден",
      dd: "%d дена",
      M: "еден месец",
      MM: "%d месеци",
      y: "една година",
      yy: "%d години"
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
    ordinal: function (e) {
      var t = e % 10,
        n = e % 100;
      return 0 === e ? e + "-ев" : 0 === n ? e + "-ен" : n > 10 && n < 20 ? e + "-ти" : 1 === t ? e + "-ви" : 2 === t ? e + "-ри" : 7 === t || 8 === t ? e + "-ми" : e + "-ти";
    },
    week: {
      dow: 1,
      doy: 7
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
