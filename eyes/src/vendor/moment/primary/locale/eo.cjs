/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 eo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1227454-1228725.；literal: januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1227454-1228725.
!function (e) {
  "use strict";

  e.defineLocale("eo", {
    months: "januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),
    monthsShort: "jan_feb_mart_apr_maj_jun_jul_aŭg_sept_okt_nov_dec".split("_"),
    weekdays: "dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato".split("_"),
    weekdaysShort: "dim_lun_mard_merk_ĵaŭ_ven_sab".split("_"),
    weekdaysMin: "di_lu_ma_me_ĵa_ve_sa".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "YYYY-MM-DD",
      LL: "[la] D[-an de] MMMM, YYYY",
      LLL: "[la] D[-an de] MMMM, YYYY HH:mm",
      LLLL: "dddd[n], [la] D[-an de] MMMM, YYYY HH:mm",
      llll: "ddd, [la] D[-an de] MMM, YYYY HH:mm"
    },
    meridiemParse: /[ap]\.t\.m/i,
    isPM: function (e) {
      return "p" === e.charAt(0).toLowerCase();
    },
    meridiem: function (e, t, n) {
      return e > 11 ? n ? "p.t.m." : "P.T.M." : n ? "a.t.m." : "A.T.M.";
    },
    calendar: {
      sameDay: "[Hodiaŭ je] LT",
      nextDay: "[Morgaŭ je] LT",
      nextWeek: "dddd[n je] LT",
      lastDay: "[Hieraŭ je] LT",
      lastWeek: "[pasintan] dddd[n je] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "post %s",
      past: "antaŭ %s",
      s: "kelkaj sekundoj",
      ss: "%d sekundoj",
      m: "unu minuto",
      mm: "%d minutoj",
      h: "unu horo",
      hh: "%d horoj",
      d: "unu tago",
      dd: "%d tagoj",
      M: "unu monato",
      MM: "%d monatoj",
      y: "unu jaro",
      yy: "%d jaroj"
    },
    dayOfMonthOrdinalParse: /\d{1,2}a/,
    ordinal: "%da",
    week: {
      dow: 1,
      doy: 7
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
