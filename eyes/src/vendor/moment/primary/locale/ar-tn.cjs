/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 ar-tn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1187946-1188916.；literal: ar-tn
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1187946-1188916.
!function (e) {
  "use strict";

  e.defineLocale("ar-tn", {
    months: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
    monthsShort: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
    weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
    weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
    weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[اليوم على الساعة] LT",
      nextDay: "[غدا على الساعة] LT",
      nextWeek: "dddd [على الساعة] LT",
      lastDay: "[أمس على الساعة] LT",
      lastWeek: "dddd [على الساعة] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "في %s",
      past: "منذ %s",
      s: "ثوان",
      ss: "%d ثانية",
      m: "دقيقة",
      mm: "%d دقائق",
      h: "ساعة",
      hh: "%d ساعات",
      d: "يوم",
      dd: "%d أيام",
      M: "شهر",
      MM: "%d أشهر",
      y: "سنة",
      yy: "%d سنوات"
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
