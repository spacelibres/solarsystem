/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 fi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2028052-2029868.；literal: nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2028052-2029868.
!function (e) {
  "use strict";

  var t = "nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(" "),
    n = ["nolla", "yhden", "kahden", "kolmen", "neljän", "viiden", "kuuden", t[7], t[8], t[9]];
  function r(e, t, n, r) {
    var a = "";
    switch (n) {
      case "s":
        return r ? "muutaman sekunnin" : "muutama sekunti";
      case "ss":
        a = r ? "sekunnin" : "sekuntia";
        break;
      case "m":
        return r ? "minuutin" : "minuutti";
      case "mm":
        a = r ? "minuutin" : "minuuttia";
        break;
      case "h":
        return r ? "tunnin" : "tunti";
      case "hh":
        a = r ? "tunnin" : "tuntia";
        break;
      case "d":
        return r ? "päivän" : "päivä";
      case "dd":
        a = r ? "päivän" : "päivää";
        break;
      case "M":
        return r ? "kuukauden" : "kuukausi";
      case "MM":
        a = r ? "kuukauden" : "kuukautta";
        break;
      case "y":
        return r ? "vuoden" : "vuosi";
      case "yy":
        a = r ? "vuoden" : "vuotta";
    }
    return a = i(e, r) + " " + a;
  }
  function i(e, r) {
    return e < 10 ? r ? n[e] : t[e] : e;
  }
  e.defineLocale("fi", {
    months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
    monthsShort: "tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),
    weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
    weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
    weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
    longDateFormat: {
      LT: "HH.mm",
      LTS: "HH.mm.ss",
      L: "DD.MM.YYYY",
      LL: "Do MMMM[ta] YYYY",
      LLL: "Do MMMM[ta] YYYY, [klo] HH.mm",
      LLLL: "dddd, Do MMMM[ta] YYYY, [klo] HH.mm",
      l: "D.M.YYYY",
      ll: "Do MMM YYYY",
      lll: "Do MMM YYYY, [klo] HH.mm",
      llll: "ddd, Do MMM YYYY, [klo] HH.mm"
    },
    calendar: {
      sameDay: "[tänään] [klo] LT",
      nextDay: "[huomenna] [klo] LT",
      nextWeek: "dddd [klo] LT",
      lastDay: "[eilen] [klo] LT",
      lastWeek: "[viime] dddd[na] [klo] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s päästä",
      past: "%s sitten",
      s: r,
      ss: r,
      m: r,
      mm: r,
      h: r,
      hh: r,
      d: r,
      dd: r,
      M: r,
      MM: r,
      y: r,
      yy: r
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
