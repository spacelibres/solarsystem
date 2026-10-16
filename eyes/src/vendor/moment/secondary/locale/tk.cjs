/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 tk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2137445-2138744.；literal: 'inji
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2137445-2138744.
!function (e) {
  "use strict";

  var t = {
    1: "'inji",
    5: "'inji",
    8: "'inji",
    70: "'inji",
    80: "'inji",
    2: "'nji",
    7: "'nji",
    20: "'nji",
    50: "'nji",
    3: "'ünji",
    4: "'ünji",
    100: "'ünji",
    6: "'njy",
    9: "'unjy",
    10: "'unjy",
    30: "'unjy",
    60: "'ynjy",
    90: "'ynjy"
  };
  e.defineLocale("tk", {
    months: "Ýanwar_Fewral_Mart_Aprel_Maý_Iýun_Iýul_Awgust_Sentýabr_Oktýabr_Noýabr_Dekabr".split("_"),
    monthsShort: "Ýan_Few_Mar_Apr_Maý_Iýn_Iýl_Awg_Sen_Okt_Noý_Dek".split("_"),
    weekdays: "Ýekşenbe_Duşenbe_Sişenbe_Çarşenbe_Penşenbe_Anna_Şenbe".split("_"),
    weekdaysShort: "Ýek_Duş_Siş_Çar_Pen_Ann_Şen".split("_"),
    weekdaysMin: "Ýk_Dş_Sş_Çr_Pn_An_Şn".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[bugün sagat] LT",
      nextDay: "[ertir sagat] LT",
      nextWeek: "[indiki] dddd [sagat] LT",
      lastDay: "[düýn] LT",
      lastWeek: "[geçen] dddd [sagat] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s soň",
      past: "%s öň",
      s: "birnäçe sekunt",
      m: "bir minut",
      mm: "%d minut",
      h: "bir sagat",
      hh: "%d sagat",
      d: "bir gün",
      dd: "%d gün",
      M: "bir aý",
      MM: "%d aý",
      y: "bir ýyl",
      yy: "%d ýyl"
    },
    ordinal: function (e, n) {
      switch (n) {
        case "d":
        case "D":
        case "Do":
        case "DD":
          return e;
        default:
          if (0 === e) return e + "'unjy";
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
}(require("../../../modules/MomentSecondary.cjs"));
