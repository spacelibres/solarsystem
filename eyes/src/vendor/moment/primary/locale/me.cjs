/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 me 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1293882-1295768.；literal: sekund
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1293882-1295768.
!function (e) {
  "use strict";

  var t = {
    words: {
      ss: ["sekund", "sekunda", "sekundi"],
      m: ["jedan minut", "jednog minuta"],
      mm: ["minut", "minuta", "minuta"],
      h: ["jedan sat", "jednog sata"],
      hh: ["sat", "sata", "sati"],
      dd: ["dan", "dana", "dana"],
      MM: ["mjesec", "mjeseca", "mjeseci"],
      yy: ["godina", "godine", "godina"]
    },
    correctGrammaticalCase: function (e, t) {
      return 1 === e ? t[0] : e >= 2 && e <= 4 ? t[1] : t[2];
    },
    translate: function (e, n, r) {
      var i = t.words[r];
      return 1 === r.length ? n ? i[0] : i[1] : e + " " + t.correctGrammaticalCase(e, i);
    }
  };
  e.defineLocale("me", {
    months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),
    monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),
    monthsParseExact: !0,
    weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
    weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
    weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY H:mm",
      LLLL: "dddd, D. MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[danas u] LT",
      nextDay: "[sjutra u] LT",
      nextWeek: function () {
        switch (this.day()) {
          case 0:
            return "[u] [nedjelju] [u] LT";
          case 3:
            return "[u] [srijedu] [u] LT";
          case 6:
            return "[u] [subotu] [u] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[u] dddd [u] LT";
        }
      },
      lastDay: "[juče u] LT",
      lastWeek: function () {
        return ["[prošle] [nedjelje] [u] LT", "[prošlog] [ponedjeljka] [u] LT", "[prošlog] [utorka] [u] LT", "[prošle] [srijede] [u] LT", "[prošlog] [četvrtka] [u] LT", "[prošlog] [petka] [u] LT", "[prošle] [subote] [u] LT"][this.day()];
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "za %s",
      past: "prije %s",
      s: "nekoliko sekundi",
      ss: t.translate,
      m: t.translate,
      mm: t.translate,
      h: t.translate,
      hh: t.translate,
      d: "dan",
      dd: t.translate,
      M: "mjesec",
      MM: t.translate,
      y: "godinu",
      yy: t.translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      doy: 7
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
