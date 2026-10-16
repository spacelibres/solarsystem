/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 sk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2117797-2119733.；literal: január_február_marec_apríl_máj_jún_júl_august_september_október_november_december
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2117797-2119733.
!function (e) {
  "use strict";

  var t = "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"),
    n = "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_");
  function r(e) {
    return e > 1 && e < 5;
  }
  function i(e, t, n, i) {
    var a = e + " ";
    switch (n) {
      case "s":
        return t || i ? "pár sekúnd" : "pár sekundami";
      case "ss":
        return t || i ? a + (r(e) ? "sekundy" : "sekúnd") : a + "sekundami";
      case "m":
        return t ? "minúta" : i ? "minútu" : "minútou";
      case "mm":
        return t || i ? a + (r(e) ? "minúty" : "minút") : a + "minútami";
      case "h":
        return t ? "hodina" : i ? "hodinu" : "hodinou";
      case "hh":
        return t || i ? a + (r(e) ? "hodiny" : "hodín") : a + "hodinami";
      case "d":
        return t || i ? "deň" : "dňom";
      case "dd":
        return t || i ? a + (r(e) ? "dni" : "dní") : a + "dňami";
      case "M":
        return t || i ? "mesiac" : "mesiacom";
      case "MM":
        return t || i ? a + (r(e) ? "mesiace" : "mesiacov") : a + "mesiacmi";
      case "y":
        return t || i ? "rok" : "rokom";
      case "yy":
        return t || i ? a + (r(e) ? "roky" : "rokov") : a + "rokmi";
    }
  }
  e.defineLocale("sk", {
    months: t,
    monthsShort: n,
    weekdays: "nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),
    weekdaysShort: "ne_po_ut_st_št_pi_so".split("_"),
    weekdaysMin: "ne_po_ut_st_št_pi_so".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY H:mm",
      LLLL: "dddd D. MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[dnes o] LT",
      nextDay: "[zajtra o] LT",
      nextWeek: function () {
        switch (this.day()) {
          case 0:
            return "[v nedeľu o] LT";
          case 1:
          case 2:
            return "[v] dddd [o] LT";
          case 3:
            return "[v stredu o] LT";
          case 4:
            return "[vo štvrtok o] LT";
          case 5:
            return "[v piatok o] LT";
          case 6:
            return "[v sobotu o] LT";
        }
      },
      lastDay: "[včera o] LT",
      lastWeek: function () {
        switch (this.day()) {
          case 0:
            return "[minulú nedeľu o] LT";
          case 1:
          case 2:
          case 4:
          case 5:
            return "[minulý] dddd [o] LT";
          case 3:
            return "[minulú stredu o] LT";
          case 6:
            return "[minulú sobotu o] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "za %s",
      past: "pred %s",
      s: i,
      ss: i,
      m: i,
      mm: i,
      h: i,
      hh: i,
      d: i,
      dd: i,
      M: i,
      MM: i,
      y: i,
      yy: i
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
