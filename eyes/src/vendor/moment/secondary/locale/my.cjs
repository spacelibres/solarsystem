/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 my 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2093882-2095157.；literal: ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2093882-2095157.
!function (e) {
  "use strict";

  var t = {
      1: "၁",
      2: "၂",
      3: "၃",
      4: "၄",
      5: "၅",
      6: "၆",
      7: "၇",
      8: "၈",
      9: "၉",
      0: "၀"
    },
    n = {
      "၁": "1",
      "၂": "2",
      "၃": "3",
      "၄": "4",
      "၅": "5",
      "၆": "6",
      "၇": "7",
      "၈": "8",
      "၉": "9",
      "၀": "0"
    };
  e.defineLocale("my", {
    months: "ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ".split("_"),
    monthsShort: "ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ".split("_"),
    weekdays: "တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ".split("_"),
    weekdaysShort: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),
    weekdaysMin: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[ယနေ.] LT [မှာ]",
      nextDay: "[မနက်ဖြန်] LT [မှာ]",
      nextWeek: "dddd LT [မှာ]",
      lastDay: "[မနေ.က] LT [မှာ]",
      lastWeek: "[ပြီးခဲ့သော] dddd LT [မှာ]",
      sameElse: "L"
    },
    relativeTime: {
      future: "လာမည့် %s မှာ",
      past: "လွန်ခဲ့သော %s က",
      s: "စက္ကန်.အနည်းငယ်",
      ss: "%d စက္ကန့်",
      m: "တစ်မိနစ်",
      mm: "%d မိနစ်",
      h: "တစ်နာရီ",
      hh: "%d နာရီ",
      d: "တစ်ရက်",
      dd: "%d ရက်",
      M: "တစ်လ",
      MM: "%d လ",
      y: "တစ်နှစ်",
      yy: "%d နှစ်"
    },
    preparse: function (e) {
      return e.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (e) {
        return n[e];
      });
    },
    postformat: function (e) {
      return e.replace(/\d/g, function (e) {
        return t[e];
      });
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
