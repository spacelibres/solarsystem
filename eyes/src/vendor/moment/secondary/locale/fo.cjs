/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 fo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2030933-2031962.；literal: januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2030933-2031962.
!function (e) {
  "use strict";

  e.defineLocale("fo", {
    months: "januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),
    monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
    weekdays: "sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),
    weekdaysShort: "sun_mán_týs_mik_hós_frí_ley".split("_"),
    weekdaysMin: "su_má_tý_mi_hó_fr_le".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D. MMMM, YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Í dag kl.] LT",
      nextDay: "[Í morgin kl.] LT",
      nextWeek: "dddd [kl.] LT",
      lastDay: "[Í gjár kl.] LT",
      lastWeek: "[síðstu] dddd [kl] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "um %s",
      past: "%s síðani",
      s: "fá sekund",
      ss: "%d sekundir",
      m: "ein minuttur",
      mm: "%d minuttir",
      h: "ein tími",
      hh: "%d tímar",
      d: "ein dagur",
      dd: "%d dagar",
      M: "ein mánaður",
      MM: "%d mánaðir",
      y: "eitt ár",
      yy: "%d ár"
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
