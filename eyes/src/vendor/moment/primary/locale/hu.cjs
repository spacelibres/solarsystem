/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 hu 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1265646-1267493.；literal: vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1265646-1267493.
!function (e) {
  "use strict";

  var t = "vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(" ");
  function n(e, t, n, r) {
    var i = e;
    switch (n) {
      case "s":
        return r || t ? "néhány másodperc" : "néhány másodperce";
      case "ss":
        return i + (r || t) ? " másodperc" : " másodperce";
      case "m":
        return "egy" + (r || t ? " perc" : " perce");
      case "mm":
        return i + (r || t ? " perc" : " perce");
      case "h":
        return "egy" + (r || t ? " óra" : " órája");
      case "hh":
        return i + (r || t ? " óra" : " órája");
      case "d":
        return "egy" + (r || t ? " nap" : " napja");
      case "dd":
        return i + (r || t ? " nap" : " napja");
      case "M":
        return "egy" + (r || t ? " hónap" : " hónapja");
      case "MM":
        return i + (r || t ? " hónap" : " hónapja");
      case "y":
        return "egy" + (r || t ? " év" : " éve");
      case "yy":
        return i + (r || t ? " év" : " éve");
    }
    return "";
  }
  function r(e) {
    return (e ? "" : "[múlt] ") + "[" + t[this.day()] + "] LT[-kor]";
  }
  e.defineLocale("hu", {
    months: "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),
    monthsShort: "jan._feb._márc._ápr._máj._jún._júl._aug._szept._okt._nov._dec.".split("_"),
    monthsParseExact: !0,
    weekdays: "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
    weekdaysShort: "vas_hét_kedd_sze_csüt_pén_szo".split("_"),
    weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "YYYY.MM.DD.",
      LL: "YYYY. MMMM D.",
      LLL: "YYYY. MMMM D. H:mm",
      LLLL: "YYYY. MMMM D., dddd H:mm"
    },
    meridiemParse: /de|du/i,
    isPM: function (e) {
      return "u" === e.charAt(1).toLowerCase();
    },
    meridiem: function (e, t, n) {
      return e < 12 ? !0 === n ? "de" : "DE" : !0 === n ? "du" : "DU";
    },
    calendar: {
      sameDay: "[ma] LT[-kor]",
      nextDay: "[holnap] LT[-kor]",
      nextWeek: function () {
        return r.call(this, !0);
      },
      lastDay: "[tegnap] LT[-kor]",
      lastWeek: function () {
        return r.call(this, !1);
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "%s múlva",
      past: "%s",
      s: n,
      ss: n,
      m: n,
      mm: n,
      h: n,
      hh: n,
      d: n,
      dd: n,
      M: n,
      MM: n,
      y: n,
      yy: n
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
