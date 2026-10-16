/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 uz-latn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2152694-2153694.；literal: uz-latn
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2152694-2153694.
!function (e) {
  "use strict";

  e.defineLocale("uz-latn", {
    months: "Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split("_"),
    monthsShort: "Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"),
    weekdays: "Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split("_"),
    weekdaysShort: "Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"),
    weekdaysMin: "Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "D MMMM YYYY, dddd HH:mm"
    },
    calendar: {
      sameDay: "[Bugun soat] LT [da]",
      nextDay: "[Ertaga] LT [da]",
      nextWeek: "dddd [kuni soat] LT [da]",
      lastDay: "[Kecha soat] LT [da]",
      lastWeek: "[O'tgan] dddd [kuni soat] LT [da]",
      sameElse: "L"
    },
    relativeTime: {
      future: "Yaqin %s ichida",
      past: "Bir necha %s oldin",
      s: "soniya",
      ss: "%d soniya",
      m: "bir daqiqa",
      mm: "%d daqiqa",
      h: "bir soat",
      hh: "%d soat",
      d: "bir kun",
      dd: "%d kun",
      M: "bir oy",
      MM: "%d oy",
      y: "bir yil",
      yy: "%d yil"
    },
    week: {
      dow: 1,
      doy: 7
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
