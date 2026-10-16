/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 tr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1354819-1356291.；literal: 'inci
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1354819-1356291.
!function (e) {
  "use strict";

  var t = {
    1: "'inci",
    5: "'inci",
    8: "'inci",
    70: "'inci",
    80: "'inci",
    2: "'nci",
    7: "'nci",
    20: "'nci",
    50: "'nci",
    3: "'üncü",
    4: "'üncü",
    100: "'üncü",
    6: "'ncı",
    9: "'uncu",
    10: "'uncu",
    30: "'uncu",
    60: "'ıncı",
    90: "'ıncı"
  };
  e.defineLocale("tr", {
    months: "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),
    monthsShort: "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
    weekdays: "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
    weekdaysShort: "Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),
    weekdaysMin: "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
    meridiem: function (e, t, n) {
      return e < 12 ? n ? "öö" : "ÖÖ" : n ? "ös" : "ÖS";
    },
    meridiemParse: /öö|ÖÖ|ös|ÖS/,
    isPM: function (e) {
      return "ös" === e || "ÖS" === e;
    },
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
      nextDay: "[yarın saat] LT",
      nextWeek: "[gelecek] dddd [saat] LT",
      lastDay: "[dün] LT",
      lastWeek: "[geçen] dddd [saat] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s sonra",
      past: "%s önce",
      s: "birkaç saniye",
      ss: "%d saniye",
      m: "bir dakika",
      mm: "%d dakika",
      h: "bir saat",
      hh: "%d saat",
      d: "bir gün",
      dd: "%d gün",
      w: "bir hafta",
      ww: "%d hafta",
      M: "bir ay",
      MM: "%d ay",
      y: "bir yıl",
      yy: "%d yıl"
    },
    ordinal: function (e, n) {
      switch (n) {
        case "d":
        case "D":
        case "Do":
        case "DD":
          return e;
        default:
          if (0 === e) return e + "'ıncı";
          var r = e % 10,
            i = e % 100 - r,
            a = e >= 100 ? 100 : null;
          return e + (t[r] || t[i] || t[a]);
      }
    },
    week: {
      dow: 1,
      doy: 7
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
