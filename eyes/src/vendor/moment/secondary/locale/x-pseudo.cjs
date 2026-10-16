/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 x-pseudo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2155051-2156270.；literal: x-pseudo
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2155051-2156270.
!function (e) {
  "use strict";

  e.defineLocale("x-pseudo", {
    months: "J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér".split("_"),
    monthsShort: "J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc".split("_"),
    monthsParseExact: !0,
    weekdays: "S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý".split("_"),
    weekdaysShort: "S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát".split("_"),
    weekdaysMin: "S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[T~ódá~ý át] LT",
      nextDay: "[T~ómó~rró~w át] LT",
      nextWeek: "dddd [át] LT",
      lastDay: "[Ý~ést~érdá~ý át] LT",
      lastWeek: "[L~ást] dddd [át] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "í~ñ %s",
      past: "%s á~gó",
      s: "á ~féw ~sécó~ñds",
      ss: "%d s~écóñ~ds",
      m: "á ~míñ~úté",
      mm: "%d m~íñú~tés",
      h: "á~ñ hó~úr",
      hh: "%d h~óúrs",
      d: "á ~dáý",
      dd: "%d d~áýs",
      M: "á ~móñ~th",
      MM: "%d m~óñt~hs",
      y: "á ~ýéár",
      yy: "%d ý~éárs"
    },
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
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
