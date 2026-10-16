// Recovered from vendors.js:1992465-1995082.
!function (e) {
  "use strict";

  var t = "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"),
    n = "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_"),
    r = [/^led/i, /^úno/i, /^bře/i, /^dub/i, /^kvě/i, /^(čvn|červen$|června)/i, /^(čvc|červenec|července)/i, /^srp/i, /^zář/i, /^říj/i, /^lis/i, /^pro/i],
    i = /^(leden|únor|březen|duben|květen|červenec|července|červen|června|srpen|září|říjen|listopad|prosinec|led|úno|bře|dub|kvě|čvn|čvc|srp|zář|říj|lis|pro)/i;
  function a(e) {
    return e > 1 && e < 5 && 1 != ~~(e / 10);
  }
  function s(e, t, n, r) {
    var i = e + " ";
    switch (n) {
      case "s":
        return t || r ? "pár sekund" : "pár sekundami";
      case "ss":
        return t || r ? i + (a(e) ? "sekundy" : "sekund") : i + "sekundami";
      case "m":
        return t ? "minuta" : r ? "minutu" : "minutou";
      case "mm":
        return t || r ? i + (a(e) ? "minuty" : "minut") : i + "minutami";
      case "h":
        return t ? "hodina" : r ? "hodinu" : "hodinou";
      case "hh":
        return t || r ? i + (a(e) ? "hodiny" : "hodin") : i + "hodinami";
      case "d":
        return t || r ? "den" : "dnem";
      case "dd":
        return t || r ? i + (a(e) ? "dny" : "dní") : i + "dny";
      case "M":
        return t || r ? "měsíc" : "měsícem";
      case "MM":
        return t || r ? i + (a(e) ? "měsíce" : "měsíců") : i + "měsíci";
      case "y":
        return t || r ? "rok" : "rokem";
      case "yy":
        return t || r ? i + (a(e) ? "roky" : "let") : i + "lety";
    }
  }
  e.defineLocale("cs", {
    months: t,
    monthsShort: n,
    monthsRegex: i,
    monthsShortRegex: i,
    monthsStrictRegex: /^(leden|ledna|února|únor|březen|března|duben|dubna|květen|května|červenec|července|červen|června|srpen|srpna|září|říjen|října|listopadu|listopad|prosinec|prosince)/i,
    monthsShortStrictRegex: /^(led|úno|bře|dub|kvě|čvn|čvc|srp|zář|říj|lis|pro)/i,
    monthsParse: r,
    longMonthsParse: r,
    shortMonthsParse: r,
    weekdays: "neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),
    weekdaysShort: "ne_po_út_st_čt_pá_so".split("_"),
    weekdaysMin: "ne_po_út_st_čt_pá_so".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY H:mm",
      LLLL: "dddd D. MMMM YYYY H:mm",
      l: "D. M. YYYY"
    },
    calendar: {
      sameDay: "[dnes v] LT",
      nextDay: "[zítra v] LT",
      nextWeek: function () {
        switch (this.day()) {
          case 0:
            return "[v neděli v] LT";
          case 1:
          case 2:
            return "[v] dddd [v] LT";
          case 3:
            return "[ve středu v] LT";
          case 4:
            return "[ve čtvrtek v] LT";
          case 5:
            return "[v pátek v] LT";
          case 6:
            return "[v sobotu v] LT";
        }
      },
      lastDay: "[včera v] LT",
      lastWeek: function () {
        switch (this.day()) {
          case 0:
            return "[minulou neděli v] LT";
          case 1:
          case 2:
            return "[minulé] dddd [v] LT";
          case 3:
            return "[minulou středu v] LT";
          case 4:
          case 5:
            return "[minulý] dddd [v] LT";
          case 6:
            return "[minulou sobotu v] LT";
        }
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "za %s",
      past: "před %s",
      s: s,
      ss: s,
      m: s,
      mm: s,
      h: s,
      hh: s,
      d: s,
      dd: s,
      M: s,
      MM: s,
      y: s,
      yy: s
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
