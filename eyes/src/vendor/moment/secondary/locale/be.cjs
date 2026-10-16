/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 be 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1977370-1979506.；literal: хвіліна
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1977370-1979506.
!function (e) {
  "use strict";

  function t(e, t) {
    var n = e.split("_");
    return t % 10 == 1 && t % 100 != 11 ? n[0] : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20) ? n[1] : n[2];
  }
  function n(e, n, r) {
    return "m" === r ? n ? "хвіліна" : "хвіліну" : "h" === r ? n ? "гадзіна" : "гадзіну" : e + " " + t({
      ss: n ? "секунда_секунды_секунд" : "секунду_секунды_секунд",
      mm: n ? "хвіліна_хвіліны_хвілін" : "хвіліну_хвіліны_хвілін",
      hh: n ? "гадзіна_гадзіны_гадзін" : "гадзіну_гадзіны_гадзін",
      dd: "дзень_дні_дзён",
      MM: "месяц_месяцы_месяцаў",
      yy: "год_гады_гадоў"
    }[r], +e);
  }
  e.defineLocale("be", {
    months: {
      format: "студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня".split("_"),
      standalone: "студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань".split("_")
    },
    monthsShort: "студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж".split("_"),
    weekdays: {
      format: "нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу".split("_"),
      standalone: "нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота".split("_"),
      isFormat: /\[ ?[Ууў] ?(?:мінулую|наступную)? ?\] ?dddd/
    },
    weekdaysShort: "нд_пн_ат_ср_чц_пт_сб".split("_"),
    weekdaysMin: "нд_пн_ат_ср_чц_пт_сб".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY г.",
      LLL: "D MMMM YYYY г., HH:mm",
      LLLL: "dddd, D MMMM YYYY г., HH:mm"
    },
    calendar: {
      sameDay: "[Сёння ў] LT",
      nextDay: "[Заўтра ў] LT",
      lastDay: "[Учора ў] LT",
      nextWeek: function () {
        return "[У] dddd [ў] LT";
      },
      lastWeek: function () {
        switch (this.day()) {
          case 0:
          case 3:
          case 5:
          case 6:
            return "[У мінулую] dddd [ў] LT";
          case 1:
          case 2:
          case 4:
            return "[У мінулы] dddd [ў] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "праз %s",
      past: "%s таму",
      s: "некалькі секунд",
      m: n,
      mm: n,
      h: n,
      hh: n,
      d: "дзень",
      dd: n,
      M: "месяц",
      MM: n,
      y: "год",
      yy: n
    },
    meridiemParse: /ночы|раніцы|дня|вечара/,
    isPM: function (e) {
      return /^(дня|вечара)$/.test(e);
    },
    meridiem: function (e, t, n) {
      return e < 4 ? "ночы" : e < 12 ? "раніцы" : e < 17 ? "дня" : "вечара";
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(і|ы|га)/,
    ordinal: function (e, t) {
      switch (t) {
        case "M":
        case "d":
        case "DDD":
        case "w":
        case "W":
          return e % 10 != 2 && e % 10 != 3 || e % 100 == 12 || e % 100 == 13 ? e + "-ы" : e + "-і";
        case "D":
          return e + "-га";
        default:
          return e;
      }
    },
    week: {
      dow: 1,
      doy: 7
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
