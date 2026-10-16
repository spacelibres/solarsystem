/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 bg 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1192585-1193856.；literal: януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1192585-1193856.
!function (e) {
  "use strict";

  e.defineLocale("bg", {
    months: "януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),
    monthsShort: "яну_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),
    weekdays: "неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),
    weekdaysShort: "нед_пон_вто_сря_чет_пет_съб".split("_"),
    weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "D.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY H:mm",
      LLLL: "dddd, D MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[Днес в] LT",
      nextDay: "[Утре в] LT",
      nextWeek: "dddd [в] LT",
      lastDay: "[Вчера в] LT",
      lastWeek: function () {
        switch (this.day()) {
          case 0:
          case 3:
          case 6:
            return "[Миналата] dddd [в] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[Миналия] dddd [в] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "след %s",
      past: "преди %s",
      s: "няколко секунди",
      ss: "%d секунди",
      m: "минута",
      mm: "%d минути",
      h: "час",
      hh: "%d часа",
      d: "ден",
      dd: "%d дена",
      w: "седмица",
      ww: "%d седмици",
      M: "месец",
      MM: "%d месеца",
      y: "година",
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
}(require("../../../modules/MomentPrimary.cjs"));
