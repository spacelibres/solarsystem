/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 mt 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1305957-1306959.；literal: Jannar_Frar_Marzu_April_Mejju_Ġunju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Diċembru
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1305957-1306959.
!function (e) {
  "use strict";

  e.defineLocale("mt", {
    months: "Jannar_Frar_Marzu_April_Mejju_Ġunju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Diċembru".split("_"),
    monthsShort: "Jan_Fra_Mar_Apr_Mej_Ġun_Lul_Aww_Set_Ott_Nov_Diċ".split("_"),
    weekdays: "Il-Ħadd_It-Tnejn_It-Tlieta_L-Erbgħa_Il-Ħamis_Il-Ġimgħa_Is-Sibt".split("_"),
    weekdaysShort: "Ħad_Tne_Tli_Erb_Ħam_Ġim_Sib".split("_"),
    weekdaysMin: "Ħa_Tn_Tl_Er_Ħa_Ġi_Si".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Illum fil-]LT",
      nextDay: "[Għada fil-]LT",
      nextWeek: "dddd [fil-]LT",
      lastDay: "[Il-bieraħ fil-]LT",
      lastWeek: "dddd [li għadda] [fil-]LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "f’ %s",
      past: "%s ilu",
      s: "ftit sekondi",
      ss: "%d sekondi",
      m: "minuta",
      mm: "%d minuti",
      h: "siegħa",
      hh: "%d siegħat",
      d: "ġurnata",
      dd: "%d ġranet",
      M: "xahar",
      MM: "%d xhur",
      y: "sena",
      yy: "%d sni"
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: "%dº",
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
