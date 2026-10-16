/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 et 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1237069-1238394.；literal: mõne sekundi
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1237069-1238394.
!function (e) {
  "use strict";

  function t(e, t, n, r) {
    var i = {
      s: ["mõne sekundi", "mõni sekund", "paar sekundit"],
      ss: [e + "sekundi", e + "sekundit"],
      m: ["ühe minuti", "üks minut"],
      mm: [e + " minuti", e + " minutit"],
      h: ["ühe tunni", "tund aega", "üks tund"],
      hh: [e + " tunni", e + " tundi"],
      d: ["ühe päeva", "üks päev"],
      M: ["kuu aja", "kuu aega", "üks kuu"],
      MM: [e + " kuu", e + " kuud"],
      y: ["ühe aasta", "aasta", "üks aasta"],
      yy: [e + " aasta", e + " aastat"]
    };
    return t ? i[n][2] ? i[n][2] : i[n][1] : r ? i[n][0] : i[n][1];
  }
  e.defineLocale("et", {
    months: "jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
    monthsShort: "jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
    weekdays: "pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),
    weekdaysShort: "P_E_T_K_N_R_L".split("_"),
    weekdaysMin: "P_E_T_K_N_R_L".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY H:mm",
      LLLL: "dddd, D. MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[Täna,] LT",
      nextDay: "[Homme,] LT",
      nextWeek: "[Järgmine] dddd LT",
      lastDay: "[Eile,] LT",
      lastWeek: "[Eelmine] dddd LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s pärast",
      past: "%s tagasi",
      s: t,
      ss: t,
      m: t,
      mm: t,
      h: t,
      hh: t,
      d: t,
      dd: "%d päeva",
      M: t,
      MM: t,
      y: t,
      yy: t
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
