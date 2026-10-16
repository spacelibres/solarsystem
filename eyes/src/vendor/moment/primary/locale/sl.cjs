/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 sl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1332812-1335120.；literal: nekaj sekund
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1332812-1335120.
!function (e) {
  "use strict";

  function t(e, t, n, r) {
    var i = e + " ";
    switch (n) {
      case "s":
        return t || r ? "nekaj sekund" : "nekaj sekundami";
      case "ss":
        return i += 1 === e ? t ? "sekundo" : "sekundi" : 2 === e ? t || r ? "sekundi" : "sekundah" : e < 5 ? t || r ? "sekunde" : "sekundah" : "sekund";
      case "m":
        return t ? "ena minuta" : "eno minuto";
      case "mm":
        return i += 1 === e ? t ? "minuta" : "minuto" : 2 === e ? t || r ? "minuti" : "minutama" : e < 5 ? t || r ? "minute" : "minutami" : t || r ? "minut" : "minutami";
      case "h":
        return t ? "ena ura" : "eno uro";
      case "hh":
        return i += 1 === e ? t ? "ura" : "uro" : 2 === e ? t || r ? "uri" : "urama" : e < 5 ? t || r ? "ure" : "urami" : t || r ? "ur" : "urami";
      case "d":
        return t || r ? "en dan" : "enim dnem";
      case "dd":
        return i += 1 === e ? t || r ? "dan" : "dnem" : 2 === e ? t || r ? "dni" : "dnevoma" : t || r ? "dni" : "dnevi";
      case "M":
        return t || r ? "en mesec" : "enim mesecem";
      case "MM":
        return i += 1 === e ? t || r ? "mesec" : "mesecem" : 2 === e ? t || r ? "meseca" : "mesecema" : e < 5 ? t || r ? "mesece" : "meseci" : t || r ? "mesecev" : "meseci";
      case "y":
        return t || r ? "eno leto" : "enim letom";
      case "yy":
        return i += 1 === e ? t || r ? "leto" : "letom" : 2 === e ? t || r ? "leti" : "letoma" : e < 5 ? t || r ? "leta" : "leti" : t || r ? "let" : "leti";
    }
  }
  e.defineLocale("sl", {
    months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
    monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
    monthsParseExact: !0,
    weekdays: "nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),
    weekdaysShort: "ned._pon._tor._sre._čet._pet._sob.".split("_"),
    weekdaysMin: "ne_po_to_sr_če_pe_so".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD. MM. YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY H:mm",
      LLLL: "dddd, D. MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[danes ob] LT",
      nextDay: "[jutri ob] LT",
      nextWeek: function () {
        switch (this.day()) {
          case 0:
            return "[v] [nedeljo] [ob] LT";
          case 3:
            return "[v] [sredo] [ob] LT";
          case 6:
            return "[v] [soboto] [ob] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[v] dddd [ob] LT";
        }
      },
      lastDay: "[včeraj ob] LT",
      lastWeek: function () {
        switch (this.day()) {
          case 0:
            return "[prejšnjo] [nedeljo] [ob] LT";
          case 3:
            return "[prejšnjo] [sredo] [ob] LT";
          case 6:
            return "[prejšnjo] [soboto] [ob] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[prejšnji] dddd [ob] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "čez %s",
      past: "pred %s",
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
      doy: 7
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
