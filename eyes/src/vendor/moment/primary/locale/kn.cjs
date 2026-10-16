/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 kn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1281713-1283383.；literal: ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1281713-1283383.
!function (e) {
  "use strict";

  var t = {
      1: "೧",
      2: "೨",
      3: "೩",
      4: "೪",
      5: "೫",
      6: "೬",
      7: "೭",
      8: "೮",
      9: "೯",
      0: "೦"
    },
    n = {
      "೧": "1",
      "೨": "2",
      "೩": "3",
      "೪": "4",
      "೫": "5",
      "೬": "6",
      "೭": "7",
      "೮": "8",
      "೯": "9",
      "೦": "0"
    };
  e.defineLocale("kn", {
    months: "ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್".split("_"),
    monthsShort: "ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂ_ಅಕ್ಟೋ_ನವೆಂ_ಡಿಸೆಂ".split("_"),
    monthsParseExact: !0,
    weekdays: "ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ".split("_"),
    weekdaysShort: "ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ".split("_"),
    weekdaysMin: "ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ".split("_"),
    longDateFormat: {
      LT: "A h:mm",
      LTS: "A h:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, A h:mm",
      LLLL: "dddd, D MMMM YYYY, A h:mm"
    },
    calendar: {
      sameDay: "[ಇಂದು] LT",
      nextDay: "[ನಾಳೆ] LT",
      nextWeek: "dddd, LT",
      lastDay: "[ನಿನ್ನೆ] LT",
      lastWeek: "[ಕೊನೆಯ] dddd, LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s ನಂತರ",
      past: "%s ಹಿಂದೆ",
      s: "ಕೆಲವು ಕ್ಷಣಗಳು",
      ss: "%d ಸೆಕೆಂಡುಗಳು",
      m: "ಒಂದು ನಿಮಿಷ",
      mm: "%d ನಿಮಿಷ",
      h: "ಒಂದು ಗಂಟೆ",
      hh: "%d ಗಂಟೆ",
      d: "ಒಂದು ದಿನ",
      dd: "%d ದಿನ",
      M: "ಒಂದು ತಿಂಗಳು",
      MM: "%d ತಿಂಗಳು",
      y: "ಒಂದು ವರ್ಷ",
      yy: "%d ವರ್ಷ"
    },
    preparse: function (e) {
      return e.replace(/[೧೨೩೪೫೬೭೮೯೦]/g, function (e) {
        return n[e];
      });
    },
    postformat: function (e) {
      return e.replace(/\d/g, function (e) {
        return t[e];
      });
    },
    meridiemParse: /ರಾತ್ರಿ|ಬೆಳಿಗ್ಗೆ|ಮಧ್ಯಾಹ್ನ|ಸಂಜೆ/,
    meridiemHour: function (e, t) {
      return 12 === e && (e = 0), "ರಾತ್ರಿ" === t ? e < 4 ? e : e + 12 : "ಬೆಳಿಗ್ಗೆ" === t ? e : "ಮಧ್ಯಾಹ್ನ" === t ? e >= 10 ? e : e + 12 : "ಸಂಜೆ" === t ? e + 12 : void 0;
    },
    meridiem: function (e, t, n) {
      return e < 4 ? "ರಾತ್ರಿ" : e < 10 ? "ಬೆಳಿಗ್ಗೆ" : e < 17 ? "ಮಧ್ಯಾಹ್ನ" : e < 20 ? "ಸಂಜೆ" : "ರಾತ್ರಿ";
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ನೇ)/,
    ordinal: function (e) {
      return e + "ನೇ";
    },
    week: {
      dow: 0,
      doy: 6
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
