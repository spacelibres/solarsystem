/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 pl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1318668-1320721.；literal: styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1318668-1320721.
!function (e) {
  "use strict";

  var t = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),
    n = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"),
    r = [/^sty/i, /^lut/i, /^mar/i, /^kwi/i, /^maj/i, /^cze/i, /^lip/i, /^sie/i, /^wrz/i, /^paź/i, /^lis/i, /^gru/i];
  function i(e) {
    return e % 10 < 5 && e % 10 > 1 && ~~(e / 10) % 10 != 1;
  }
  function a(e, t, n) {
    var r = e + " ";
    switch (n) {
      case "ss":
        return r + (i(e) ? "sekundy" : "sekund");
      case "m":
        return t ? "minuta" : "minutę";
      case "mm":
        return r + (i(e) ? "minuty" : "minut");
      case "h":
        return t ? "godzina" : "godzinę";
      case "hh":
        return r + (i(e) ? "godziny" : "godzin");
      case "ww":
        return r + (i(e) ? "tygodnie" : "tygodni");
      case "MM":
        return r + (i(e) ? "miesiące" : "miesięcy");
      case "yy":
        return r + (i(e) ? "lata" : "lat");
    }
  }
  e.defineLocale("pl", {
    months: function (e, r) {
      return e ? /D MMMM/.test(r) ? n[e.month()] : t[e.month()] : t;
    },
    monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
    monthsParse: r,
    longMonthsParse: r,
    shortMonthsParse: r,
    weekdays: "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
    weekdaysShort: "ndz_pon_wt_śr_czw_pt_sob".split("_"),
    weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Dziś o] LT",
      nextDay: "[Jutro o] LT",
      nextWeek: function () {
        switch (this.day()) {
          case 0:
            return "[W niedzielę o] LT";
          case 2:
            return "[We wtorek o] LT";
          case 3:
            return "[W środę o] LT";
          case 6:
            return "[W sobotę o] LT";
          default:
            return "[W] dddd [o] LT";
        }
      },
      lastDay: "[Wczoraj o] LT",
      lastWeek: function () {
        switch (this.day()) {
          case 0:
            return "[W zeszłą niedzielę o] LT";
          case 3:
            return "[W zeszłą środę o] LT";
          case 6:
            return "[W zeszłą sobotę o] LT";
          default:
            return "[W zeszły] dddd [o] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "za %s",
      past: "%s temu",
      s: "kilka sekund",
      ss: a,
      m: a,
      mm: a,
      h: a,
      hh: a,
      d: "1 dzień",
      dd: "%d dni",
      w: "tydzień",
      ww: a,
      M: "miesiąc",
      MM: a,
      y: "rok",
      yy: a
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
