/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 ml 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1298362-1299670.；literal: ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1298362-1299670.
!function (e) {
  "use strict";

  e.defineLocale("ml", {
    months: "ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"),
    monthsShort: "ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"),
    monthsParseExact: !0,
    weekdays: "ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"),
    weekdaysShort: "ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"),
    weekdaysMin: "ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),
    longDateFormat: {
      LT: "A h:mm -നു",
      LTS: "A h:mm:ss -നു",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY, A h:mm -നു",
      LLLL: "dddd, D MMMM YYYY, A h:mm -നു"
    },
    calendar: {
      sameDay: "[ഇന്ന്] LT",
      nextDay: "[നാളെ] LT",
      nextWeek: "dddd, LT",
      lastDay: "[ഇന്നലെ] LT",
      lastWeek: "[കഴിഞ്ഞ] dddd, LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s കഴിഞ്ഞ്",
      past: "%s മുൻപ്",
      s: "അൽപ നിമിഷങ്ങൾ",
      ss: "%d സെക്കൻഡ്",
      m: "ഒരു മിനിറ്റ്",
      mm: "%d മിനിറ്റ്",
      h: "ഒരു മണിക്കൂർ",
      hh: "%d മണിക്കൂർ",
      d: "ഒരു ദിവസം",
      dd: "%d ദിവസം",
      M: "ഒരു മാസം",
      MM: "%d മാസം",
      y: "ഒരു വർഷം",
      yy: "%d വർഷം"
    },
    meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
    meridiemHour: function (e, t) {
      return 12 === e && (e = 0), "രാത്രി" === t && e >= 4 || "ഉച്ച കഴിഞ്ഞ്" === t || "വൈകുന്നേരം" === t ? e + 12 : e;
    },
    meridiem: function (e, t, n) {
      return e < 4 ? "രാത്രി" : e < 12 ? "രാവിലെ" : e < 17 ? "ഉച്ച കഴിഞ്ഞ്" : e < 20 ? "വൈകുന്നേരം" : "രാത്രി";
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
