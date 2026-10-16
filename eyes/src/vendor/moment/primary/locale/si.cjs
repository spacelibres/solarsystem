/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 si 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1329675-1330874.；literal: ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1329675-1330874.
!function (e) {
  "use strict";

  e.defineLocale("si", {
    months: "ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්".split("_"),
    monthsShort: "ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ".split("_"),
    weekdays: "ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා".split("_"),
    weekdaysShort: "ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන".split("_"),
    weekdaysMin: "ඉ_ස_අ_බ_බ්‍ර_සි_සෙ".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "a h:mm",
      LTS: "a h:mm:ss",
      L: "YYYY/MM/DD",
      LL: "YYYY MMMM D",
      LLL: "YYYY MMMM D, a h:mm",
      LLLL: "YYYY MMMM D [වැනි] dddd, a h:mm:ss"
    },
    calendar: {
      sameDay: "[අද] LT[ට]",
      nextDay: "[හෙට] LT[ට]",
      nextWeek: "dddd LT[ට]",
      lastDay: "[ඊයේ] LT[ට]",
      lastWeek: "[පසුගිය] dddd LT[ට]",
      sameElse: "L"
    },
    relativeTime: {
      future: "%sකින්",
      past: "%sකට පෙර",
      s: "තත්පර කිහිපය",
      ss: "තත්පර %d",
      m: "මිනිත්තුව",
      mm: "මිනිත්තු %d",
      h: "පැය",
      hh: "පැය %d",
      d: "දිනය",
      dd: "දින %d",
      M: "මාසය",
      MM: "මාස %d",
      y: "වසර",
      yy: "වසර %d"
    },
    dayOfMonthOrdinalParse: /\d{1,2} වැනි/,
    ordinal: function (e) {
      return e + " වැනි";
    },
    meridiemParse: /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
    isPM: function (e) {
      return "ප.ව." === e || "පස් වරු" === e;
    },
    meridiem: function (e, t, n) {
      return e > 11 ? n ? "ප.ව." : "පස් වරු" : n ? "පෙ.ව." : "පෙර වරු";
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
