/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 ga 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2037454-2038648.；literal: Eanáir
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2037454-2038648.
!function (e) {
  "use strict";

  var t = ["Eanáir", "Feabhra", "Márta", "Aibreán", "Bealtaine", "Meitheamh", "Iúil", "Lúnasa", "Meán Fómhair", "Deireadh Fómhair", "Samhain", "Nollaig"],
    n = ["Ean", "Feabh", "Márt", "Aib", "Beal", "Meith", "Iúil", "Lún", "M.F.", "D.F.", "Samh", "Noll"],
    r = ["Dé Domhnaigh", "Dé Luain", "Dé Máirt", "Dé Céadaoin", "Déardaoin", "Dé hAoine", "Dé Sathairn"],
    i = ["Domh", "Luan", "Máirt", "Céad", "Déar", "Aoine", "Sath"],
    a = ["Do", "Lu", "Má", "Cé", "Dé", "A", "Sa"];
  e.defineLocale("ga", {
    months: t,
    monthsShort: n,
    monthsParseExact: !0,
    weekdays: r,
    weekdaysShort: i,
    weekdaysMin: a,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Inniu ag] LT",
      nextDay: "[Amárach ag] LT",
      nextWeek: "dddd [ag] LT",
      lastDay: "[Inné ag] LT",
      lastWeek: "dddd [seo caite] [ag] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "i %s",
      past: "%s ó shin",
      s: "cúpla soicind",
      ss: "%d soicind",
      m: "nóiméad",
      mm: "%d nóiméad",
      h: "uair an chloig",
      hh: "%d uair an chloig",
      d: "lá",
      dd: "%d lá",
      M: "mí",
      MM: "%d míonna",
      y: "bliain",
      yy: "%d bliain"
    },
    dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/,
    ordinal: function (e) {
      return e + (1 === e ? "d" : e % 10 == 2 ? "na" : "mh");
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
