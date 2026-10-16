/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 ky 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2072890-2074158.；literal: январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2072890-2074158.
!function (e) {
  "use strict";

  var t = {
    0: "-чү",
    1: "-чи",
    2: "-чи",
    3: "-чү",
    4: "-чү",
    5: "-чи",
    6: "-чы",
    7: "-чи",
    8: "-чи",
    9: "-чу",
    10: "-чу",
    20: "-чы",
    30: "-чу",
    40: "-чы",
    50: "-чү",
    60: "-чы",
    70: "-чи",
    80: "-чи",
    90: "-чу",
    100: "-чү"
  };
  e.defineLocale("ky", {
    months: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
    monthsShort: "янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),
    weekdays: "Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби".split("_"),
    weekdaysShort: "Жек_Дүй_Шей_Шар_Бей_Жум_Ише".split("_"),
    weekdaysMin: "Жк_Дй_Шй_Шр_Бй_Жм_Иш".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Бүгүн саат] LT",
      nextDay: "[Эртең саат] LT",
      nextWeek: "dddd [саат] LT",
      lastDay: "[Кечээ саат] LT",
      lastWeek: "[Өткөн аптанын] dddd [күнү] [саат] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s ичинде",
      past: "%s мурун",
      s: "бирнече секунд",
      ss: "%d секунд",
      m: "бир мүнөт",
      mm: "%d мүнөт",
      h: "бир саат",
      hh: "%d саат",
      d: "бир күн",
      dd: "%d күн",
      M: "бир ай",
      MM: "%d ай",
      y: "бир жыл",
      yy: "%d жыл"
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
    ordinal: function (e) {
      var n = e % 10,
        r = e >= 100 ? 100 : null;
      return e + (t[e] || t[n] || t[r]);
    },
    week: {
      dow: 1,
      doy: 7
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
