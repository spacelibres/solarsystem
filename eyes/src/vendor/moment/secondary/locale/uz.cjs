/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 uz 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2151723-2152693.；literal: январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2151723-2152693.
!function (e) {
  "use strict";

  e.defineLocale("uz", {
    months: "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_"),
    monthsShort: "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
    weekdays: "Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),
    weekdaysShort: "Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),
    weekdaysMin: "Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "D MMMM YYYY, dddd HH:mm"
    },
    calendar: {
      sameDay: "[Бугун соат] LT [да]",
      nextDay: "[Эртага] LT [да]",
      nextWeek: "dddd [куни соат] LT [да]",
      lastDay: "[Кеча соат] LT [да]",
      lastWeek: "[Утган] dddd [куни соат] LT [да]",
      sameElse: "L"
    },
    relativeTime: {
      future: "Якин %s ичида",
      past: "Бир неча %s олдин",
      s: "фурсат",
      ss: "%d фурсат",
      m: "бир дакика",
      mm: "%d дакика",
      h: "бир соат",
      hh: "%d соат",
      d: "бир кун",
      dd: "%d кун",
      M: "бир ой",
      MM: "%d ой",
      y: "бир йил",
      yy: "%d йил"
    },
    week: {
      dow: 1,
      doy: 7
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
