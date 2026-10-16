/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 gl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2039884-2041235.；literal: xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2039884-2041235.
!function (e) {
  "use strict";

  e.defineLocale("gl", {
    months: "xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro".split("_"),
    monthsShort: "xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.".split("_"),
    monthsParseExact: !0,
    weekdays: "domingo_luns_martes_mércores_xoves_venres_sábado".split("_"),
    weekdaysShort: "dom._lun._mar._mér._xov._ven._sáb.".split("_"),
    weekdaysMin: "do_lu_ma_mé_xo_ve_sá".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D [de] MMMM [de] YYYY",
      LLL: "D [de] MMMM [de] YYYY H:mm",
      LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
    },
    calendar: {
      sameDay: function () {
        return "[hoxe " + (1 !== this.hours() ? "ás" : "á") + "] LT";
      },
      nextDay: function () {
        return "[mañá " + (1 !== this.hours() ? "ás" : "á") + "] LT";
      },
      nextWeek: function () {
        return "dddd [" + (1 !== this.hours() ? "ás" : "a") + "] LT";
      },
      lastDay: function () {
        return "[onte " + (1 !== this.hours() ? "á" : "a") + "] LT";
      },
      lastWeek: function () {
        return "[o] dddd [pasado " + (1 !== this.hours() ? "ás" : "a") + "] LT";
      },
      sameElse: "L"
    },
    relativeTime: {
      future: function (e) {
        return 0 === e.indexOf("un") ? "n" + e : "en " + e;
      },
      past: "hai %s",
      s: "uns segundos",
      ss: "%d segundos",
      m: "un minuto",
      mm: "%d minutos",
      h: "unha hora",
      hh: "%d horas",
      d: "un día",
      dd: "%d días",
      M: "un mes",
      MM: "%d meses",
      y: "un ano",
      yy: "%d anos"
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: "%dº",
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
