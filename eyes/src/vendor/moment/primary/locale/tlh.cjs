/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 tlh 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1352889-1354818.；literal: pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1352889-1354818.
!function (e) {
  "use strict";

  var t = "pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_");
  function n(e) {
    var t = e;
    return t = -1 !== e.indexOf("jaj") ? t.slice(0, -3) + "leS" : -1 !== e.indexOf("jar") ? t.slice(0, -3) + "waQ" : -1 !== e.indexOf("DIS") ? t.slice(0, -3) + "nem" : t + " pIq";
  }
  function r(e) {
    var t = e;
    return t = -1 !== e.indexOf("jaj") ? t.slice(0, -3) + "Hu’" : -1 !== e.indexOf("jar") ? t.slice(0, -3) + "wen" : -1 !== e.indexOf("DIS") ? t.slice(0, -3) + "ben" : t + " ret";
  }
  function i(e, t, n, r) {
    var i = a(e);
    switch (n) {
      case "ss":
        return i + " lup";
      case "mm":
        return i + " tup";
      case "hh":
        return i + " rep";
      case "dd":
        return i + " jaj";
      case "MM":
        return i + " jar";
      case "yy":
        return i + " DIS";
    }
  }
  function a(e) {
    var n = Math.floor(e % 1e3 / 100),
      r = Math.floor(e % 100 / 10),
      i = e % 10,
      a = "";
    return n > 0 && (a += t[n] + "vatlh"), r > 0 && (a += ("" !== a ? " " : "") + t[r] + "maH"), i > 0 && (a += ("" !== a ? " " : "") + t[i]), "" === a ? "pagh" : a;
  }
  e.defineLocale("tlh", {
    months: "tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’".split("_"),
    monthsShort: "jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’".split("_"),
    monthsParseExact: !0,
    weekdays: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
    weekdaysShort: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
    weekdaysMin: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[DaHjaj] LT",
      nextDay: "[wa’leS] LT",
      nextWeek: "LLL",
      lastDay: "[wa’Hu’] LT",
      lastWeek: "LLL",
      sameElse: "L"
    },
    relativeTime: {
      future: n,
      past: r,
      s: "puS lup",
      ss: i,
      m: "wa’ tup",
      mm: i,
      h: "wa’ rep",
      hh: i,
      d: "wa’ jaj",
      dd: i,
      M: "wa’ jar",
      MM: i,
      y: "wa’ DIS",
      yy: i
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
