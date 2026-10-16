/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 tzl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1356292-1357735.；literal: viensas secunds
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1356292-1357735.
!function (e) {
  "use strict";

  function t(e, t, n, r) {
    var i = {
      s: ["viensas secunds", "'iensas secunds"],
      ss: [e + " secunds", e + " secunds"],
      m: ["'n míut", "'iens míut"],
      mm: [e + " míuts", e + " míuts"],
      h: ["'n þora", "'iensa þora"],
      hh: [e + " þoras", e + " þoras"],
      d: ["'n ziua", "'iensa ziua"],
      dd: [e + " ziuas", e + " ziuas"],
      M: ["'n mes", "'iens mes"],
      MM: [e + " mesen", e + " mesen"],
      y: ["'n ar", "'iens ar"],
      yy: [e + " ars", e + " ars"]
    };
    return r || t ? i[n][0] : i[n][1];
  }
  e.defineLocale("tzl", {
    months: "Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar".split("_"),
    monthsShort: "Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec".split("_"),
    weekdays: "Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi".split("_"),
    weekdaysShort: "Súl_Lún_Mai_Már_Xhú_Vié_Sát".split("_"),
    weekdaysMin: "Sú_Lú_Ma_Má_Xh_Vi_Sá".split("_"),
    longDateFormat: {
      LT: "HH.mm",
      LTS: "HH.mm.ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM [dallas] YYYY",
      LLL: "D. MMMM [dallas] YYYY HH.mm",
      LLLL: "dddd, [li] D. MMMM [dallas] YYYY HH.mm"
    },
    meridiemParse: /d\'o|d\'a/i,
    isPM: function (e) {
      return "d'o" === e.toLowerCase();
    },
    meridiem: function (e, t, n) {
      return e > 11 ? n ? "d'o" : "D'O" : n ? "d'a" : "D'A";
    },
    calendar: {
      sameDay: "[oxhi à] LT",
      nextDay: "[demà à] LT",
      nextWeek: "dddd [à] LT",
      lastDay: "[ieiri à] LT",
      lastWeek: "[sür el] dddd [lasteu à] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "osprei %s",
      past: "ja%s",
      s: t,
      ss: t,
      m: t,
      mm: t,
      h: t,
      hh: t,
      d: t,
      dd: t,
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
