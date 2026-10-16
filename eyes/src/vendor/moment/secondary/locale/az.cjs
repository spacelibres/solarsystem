/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 az 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1975839-1977369.；literal: -inci
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1975839-1977369.
!function (e) {
  "use strict";

  var t = {
    1: "-inci",
    5: "-inci",
    8: "-inci",
    70: "-inci",
    80: "-inci",
    2: "-nci",
    7: "-nci",
    20: "-nci",
    50: "-nci",
    3: "-üncü",
    4: "-üncü",
    100: "-üncü",
    6: "-ncı",
    9: "-uncu",
    10: "-uncu",
    30: "-uncu",
    60: "-ıncı",
    90: "-ıncı"
  };
  e.defineLocale("az", {
    months: "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),
    monthsShort: "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),
    weekdays: "Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"),
    weekdaysShort: "Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"),
    weekdaysMin: "Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[bugün saat] LT",
      nextDay: "[sabah saat] LT",
      nextWeek: "[gələn həftə] dddd [saat] LT",
      lastDay: "[dünən] LT",
      lastWeek: "[keçən həftə] dddd [saat] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s sonra",
      past: "%s əvvəl",
      s: "bir neçə saniyə",
      ss: "%d saniyə",
      m: "bir dəqiqə",
      mm: "%d dəqiqə",
      h: "bir saat",
      hh: "%d saat",
      d: "bir gün",
      dd: "%d gün",
      M: "bir ay",
      MM: "%d ay",
      y: "bir il",
      yy: "%d il"
    },
    meridiemParse: /gecə|səhər|gündüz|axşam/,
    isPM: function (e) {
      return /^(gündüz|axşam)$/.test(e);
    },
    meridiem: function (e, t, n) {
      return e < 4 ? "gecə" : e < 12 ? "səhər" : e < 17 ? "gündüz" : "axşam";
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
    ordinal: function (e) {
      if (0 === e) return e + "-ıncı";
      var n = e % 10,
        r = e % 100 - n,
        i = e >= 100 ? 100 : null;
      return e + (t[n] || t[r] || t[i]);
    },
    week: {
      dow: 1,
      doy: 7
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
