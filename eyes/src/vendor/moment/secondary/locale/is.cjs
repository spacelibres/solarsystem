// Recovered from vendors.js:2057112-2058810.
!function (e) {
  "use strict";

  function t(e) {
    return e % 100 == 11 || e % 10 != 1;
  }
  function n(e, n, r, i) {
    var a = e + " ";
    switch (r) {
      case "s":
        return n || i ? "nokkrar sekúndur" : "nokkrum sekúndum";
      case "ss":
        return t(e) ? a + (n || i ? "sekúndur" : "sekúndum") : a + "sekúnda";
      case "m":
        return n ? "mínúta" : "mínútu";
      case "mm":
        return t(e) ? a + (n || i ? "mínútur" : "mínútum") : n ? a + "mínúta" : a + "mínútu";
      case "hh":
        return t(e) ? a + (n || i ? "klukkustundir" : "klukkustundum") : a + "klukkustund";
      case "d":
        return n ? "dagur" : i ? "dag" : "degi";
      case "dd":
        return t(e) ? n ? a + "dagar" : a + (i ? "daga" : "dögum") : n ? a + "dagur" : a + (i ? "dag" : "degi");
      case "M":
        return n ? "mánuður" : i ? "mánuð" : "mánuði";
      case "MM":
        return t(e) ? n ? a + "mánuðir" : a + (i ? "mánuði" : "mánuðum") : n ? a + "mánuður" : a + (i ? "mánuð" : "mánuði");
      case "y":
        return n || i ? "ár" : "ári";
      case "yy":
        return t(e) ? a + (n || i ? "ár" : "árum") : a + (n || i ? "ár" : "ári");
    }
  }
  e.defineLocale("is", {
    months: "janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),
    monthsShort: "jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),
    weekdays: "sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),
    weekdaysShort: "sun_mán_þri_mið_fim_fös_lau".split("_"),
    weekdaysMin: "Su_Má_Þr_Mi_Fi_Fö_La".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY [kl.] H:mm",
      LLLL: "dddd, D. MMMM YYYY [kl.] H:mm"
    },
    calendar: {
      sameDay: "[í dag kl.] LT",
      nextDay: "[á morgun kl.] LT",
      nextWeek: "dddd [kl.] LT",
      lastDay: "[í gær kl.] LT",
      lastWeek: "[síðasta] dddd [kl.] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "eftir %s",
      past: "fyrir %s síðan",
      s: n,
      ss: n,
      m: n,
      mm: n,
      h: "klukkustund",
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
}(require("../../../modules/MomentSecondary.cjs"));
