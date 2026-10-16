/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 cv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1995083-1996245.；literal: кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1995083-1996245.
!function (e) {
  "use strict";

  e.defineLocale("cv", {
    months: "кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав".split("_"),
    monthsShort: "кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш".split("_"),
    weekdays: "вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун".split("_"),
    weekdaysShort: "выр_тун_ытл_юн_кӗҫ_эрн_шӑм".split("_"),
    weekdaysMin: "вр_тн_ыт_юн_кҫ_эр_шм".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD-MM-YYYY",
      LL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]",
      LLL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm",
      LLLL: "dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm"
    },
    calendar: {
      sameDay: "[Паян] LT [сехетре]",
      nextDay: "[Ыран] LT [сехетре]",
      lastDay: "[Ӗнер] LT [сехетре]",
      nextWeek: "[Ҫитес] dddd LT [сехетре]",
      lastWeek: "[Иртнӗ] dddd LT [сехетре]",
      sameElse: "L"
    },
    relativeTime: {
      future: function (e) {
        return e + (/сехет$/i.exec(e) ? "рен" : /ҫул$/i.exec(e) ? "тан" : "ран");
      },
      past: "%s каялла",
      s: "пӗр-ик ҫеккунт",
      ss: "%d ҫеккунт",
      m: "пӗр минут",
      mm: "%d минут",
      h: "пӗр сехет",
      hh: "%d сехет",
      d: "пӗр кун",
      dd: "%d кун",
      M: "пӗр уйӑх",
      MM: "%d уйӑх",
      y: "пӗр ҫул",
      yy: "%d ҫул"
    },
    dayOfMonthOrdinalParse: /\d{1,2}-мӗш/,
    ordinal: "%d-мӗш",
    week: {
      dow: 1,
      doy: 7
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
