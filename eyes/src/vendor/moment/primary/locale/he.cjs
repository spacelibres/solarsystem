/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 he 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1259743-1261135.；literal: ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1259743-1261135.
!function (e) {
  "use strict";

  e.defineLocale("he", {
    months: "ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),
    monthsShort: "ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split("_"),
    weekdays: "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
    weekdaysShort: "א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),
    weekdaysMin: "א_ב_ג_ד_ה_ו_ש".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D [ב]MMMM YYYY",
      LLL: "D [ב]MMMM YYYY HH:mm",
      LLLL: "dddd, D [ב]MMMM YYYY HH:mm",
      l: "D/M/YYYY",
      ll: "D MMM YYYY",
      lll: "D MMM YYYY HH:mm",
      llll: "ddd, D MMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[היום ב־]LT",
      nextDay: "[מחר ב־]LT",
      nextWeek: "dddd [בשעה] LT",
      lastDay: "[אתמול ב־]LT",
      lastWeek: "[ביום] dddd [האחרון בשעה] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "בעוד %s",
      past: "לפני %s",
      s: "מספר שניות",
      ss: "%d שניות",
      m: "דקה",
      mm: "%d דקות",
      h: "שעה",
      hh: function (e) {
        return 2 === e ? "שעתיים" : e + " שעות";
      },
      d: "יום",
      dd: function (e) {
        return 2 === e ? "יומיים" : e + " ימים";
      },
      M: "חודש",
      MM: function (e) {
        return 2 === e ? "חודשיים" : e + " חודשים";
      },
      y: "שנה",
      yy: function (e) {
        return 2 === e ? "שנתיים" : e % 10 == 0 && 10 !== e ? e + " שנה" : e + " שנים";
      }
    },
    meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
    isPM: function (e) {
      return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(e);
    },
    meridiem: function (e, t, n) {
      return e < 5 ? "לפנות בוקר" : e < 10 ? "בבוקר" : e < 12 ? n ? 'לפנה"צ' : "לפני הצהריים" : e < 18 ? n ? 'אחה"צ' : "אחרי הצהריים" : "בערב";
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
