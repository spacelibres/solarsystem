/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 gom-deva 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2041236-2043189.；literal: थोडया सॅकंडांनी
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2041236-2043189.
!function (e) {
  "use strict";

  function t(e, t, n, r) {
    var i = {
      s: ["थोडया सॅकंडांनी", "थोडे सॅकंड"],
      ss: [e + " सॅकंडांनी", e + " सॅकंड"],
      m: ["एका मिणटान", "एक मिनूट"],
      mm: [e + " मिणटांनी", e + " मिणटां"],
      h: ["एका वरान", "एक वर"],
      hh: [e + " वरांनी", e + " वरां"],
      d: ["एका दिसान", "एक दीस"],
      dd: [e + " दिसांनी", e + " दीस"],
      M: ["एका म्हयन्यान", "एक म्हयनो"],
      MM: [e + " म्हयन्यानी", e + " म्हयने"],
      y: ["एका वर्सान", "एक वर्स"],
      yy: [e + " वर्सांनी", e + " वर्सां"]
    };
    return r ? i[n][0] : i[n][1];
  }
  e.defineLocale("gom-deva", {
    months: {
      standalone: "जानेवारी_फेब्रुवारी_मार्च_एप्रील_मे_जून_जुलय_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),
      format: "जानेवारीच्या_फेब्रुवारीच्या_मार्चाच्या_एप्रीलाच्या_मेयाच्या_जूनाच्या_जुलयाच्या_ऑगस्टाच्या_सप्टेंबराच्या_ऑक्टोबराच्या_नोव्हेंबराच्या_डिसेंबराच्या".split("_"),
      isFormat: /MMMM(\s)+D[oD]?/
    },
    monthsShort: "जाने._फेब्रु._मार्च_एप्री._मे_जून_जुल._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),
    monthsParseExact: !0,
    weekdays: "आयतार_सोमार_मंगळार_बुधवार_बिरेस्तार_सुक्रार_शेनवार".split("_"),
    weekdaysShort: "आयत._सोम._मंगळ._बुध._ब्रेस्त._सुक्र._शेन.".split("_"),
    weekdaysMin: "आ_सो_मं_बु_ब्रे_सु_शे".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "A h:mm [वाजतां]",
      LTS: "A h:mm:ss [वाजतां]",
      L: "DD-MM-YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY A h:mm [वाजतां]",
      LLLL: "dddd, MMMM Do, YYYY, A h:mm [वाजतां]",
      llll: "ddd, D MMM YYYY, A h:mm [वाजतां]"
    },
    calendar: {
      sameDay: "[आयज] LT",
      nextDay: "[फाल्यां] LT",
      nextWeek: "[फुडलो] dddd[,] LT",
      lastDay: "[काल] LT",
      lastWeek: "[फाटलो] dddd[,] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s",
      past: "%s आदीं",
      s: t,
      ss: t,
      m: t,
      mm: t,
      h: t,
      hh: t,
      d: t,
      dd: t,
      M: t,
      MM: t,
      y: t,
      yy: t
    },
    dayOfMonthOrdinalParse: /\d{1,2}(वेर)/,
    ordinal: function (e, t) {
      return "D" === t ? e + "वेर" : e;
    },
    week: {
      dow: 0,
      doy: 3
    },
    meridiemParse: /राती|सकाळीं|दनपारां|सांजे/,
    meridiemHour: function (e, t) {
      return 12 === e && (e = 0), "राती" === t ? e < 4 ? e : e + 12 : "सकाळीं" === t ? e : "दनपारां" === t ? e > 12 ? e : e + 12 : "सांजे" === t ? e + 12 : void 0;
    },
    meridiem: function (e, t, n) {
      return e < 4 ? "राती" : e < 12 ? "सकाळीं" : e < 16 ? "दनपारां" : e < 20 ? "सांजे" : "राती";
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
