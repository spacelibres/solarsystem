/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 tet 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2133494-2134609.；literal: Janeiru_Fevereiru_Marsu_Abril_Maiu_Juñu_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2133494-2134609.
!function (e) {
  "use strict";

  e.defineLocale("tet", {
    months: "Janeiru_Fevereiru_Marsu_Abril_Maiu_Juñu_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru".split("_"),
    monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
    weekdays: "Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu".split("_"),
    weekdaysShort: "Dom_Seg_Ters_Kua_Kint_Sest_Sab".split("_"),
    weekdaysMin: "Do_Seg_Te_Ku_Ki_Ses_Sa".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Ohin iha] LT",
      nextDay: "[Aban iha] LT",
      nextWeek: "dddd [iha] LT",
      lastDay: "[Horiseik iha] LT",
      lastWeek: "dddd [semana kotuk] [iha] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "iha %s",
      past: "%s liuba",
      s: "segundu balun",
      ss: "segundu %d",
      m: "minutu ida",
      mm: "minutu %d",
      h: "oras ida",
      hh: "oras %d",
      d: "loron ida",
      dd: "loron %d",
      M: "fulan ida",
      MM: "fulan %d",
      y: "tinan ida",
      yy: "tinan %d"
    },
    dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
    ordinal: function (e) {
      var t = e % 10;
      return e + (1 == ~~(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th");
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
