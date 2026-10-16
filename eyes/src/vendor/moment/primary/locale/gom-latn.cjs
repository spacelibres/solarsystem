/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 gom-latn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1256268-1258191.；literal: thoddea sekondamni
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1256268-1258191.
!function (e) {
  "use strict";

  function t(e, t, n, r) {
    var i = {
      s: ["thoddea sekondamni", "thodde sekond"],
      ss: [e + " sekondamni", e + " sekond"],
      m: ["eka mintan", "ek minut"],
      mm: [e + " mintamni", e + " mintam"],
      h: ["eka voran", "ek vor"],
      hh: [e + " voramni", e + " voram"],
      d: ["eka disan", "ek dis"],
      dd: [e + " disamni", e + " dis"],
      M: ["eka mhoinean", "ek mhoino"],
      MM: [e + " mhoineamni", e + " mhoine"],
      y: ["eka vorsan", "ek voros"],
      yy: [e + " vorsamni", e + " vorsam"]
    };
    return r ? i[n][0] : i[n][1];
  }
  e.defineLocale("gom-latn", {
    months: {
      standalone: "Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split("_"),
      format: "Janerachea_Febrerachea_Marsachea_Abrilachea_Maiachea_Junachea_Julaiachea_Agostachea_Setembrachea_Otubrachea_Novembrachea_Dezembrachea".split("_"),
      isFormat: /MMMM(\s)+D[oD]?/
    },
    monthsShort: "Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split("_"),
    monthsParseExact: !0,
    weekdays: "Aitar_Somar_Mongllar_Budhvar_Birestar_Sukrar_Son'var".split("_"),
    weekdaysShort: "Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"),
    weekdaysMin: "Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "A h:mm [vazta]",
      LTS: "A h:mm:ss [vazta]",
      L: "DD-MM-YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY A h:mm [vazta]",
      LLLL: "dddd, MMMM Do, YYYY, A h:mm [vazta]",
      llll: "ddd, D MMM YYYY, A h:mm [vazta]"
    },
    calendar: {
      sameDay: "[Aiz] LT",
      nextDay: "[Faleam] LT",
      nextWeek: "[Fuddlo] dddd[,] LT",
      lastDay: "[Kal] LT",
      lastWeek: "[Fattlo] dddd[,] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s",
      past: "%s adim",
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
    dayOfMonthOrdinalParse: /\d{1,2}(er)/,
    ordinal: function (e, t) {
      return "D" === t ? e + "er" : e;
    },
    week: {
      dow: 0,
      doy: 3
    },
    meridiemParse: /rati|sokallim|donparam|sanje/,
    meridiemHour: function (e, t) {
      return 12 === e && (e = 0), "rati" === t ? e < 4 ? e : e + 12 : "sokallim" === t ? e : "donparam" === t ? e > 12 ? e : e + 12 : "sanje" === t ? e + 12 : void 0;
    },
    meridiem: function (e, t, n) {
      return e < 4 ? "rati" : e < 12 ? "sokallim" : e < 16 ? "donparam" : e < 20 ? "sanje" : "rati";
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
