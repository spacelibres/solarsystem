/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 br 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1199748-1202050.；literal: munutenn
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1199748-1202050.
!function (e) {
  "use strict";

  function t(e, t, n) {
    return e + " " + i({
      mm: "munutenn",
      MM: "miz",
      dd: "devezh"
    }[n], e);
  }
  function n(e) {
    switch (r(e)) {
      case 1:
      case 3:
      case 4:
      case 5:
      case 9:
        return e + " bloaz";
      default:
        return e + " vloaz";
    }
  }
  function r(e) {
    return e > 9 ? r(e % 10) : e;
  }
  function i(e, t) {
    return 2 === t ? a(e) : e;
  }
  function a(e) {
    var t = {
      m: "v",
      b: "v",
      d: "z"
    };
    return void 0 === t[e.charAt(0)] ? e : t[e.charAt(0)] + e.substring(1);
  }
  var s = [/^gen/i, /^c[ʼ\']hwe/i, /^meu/i, /^ebr/i, /^mae/i, /^(mez|eve)/i, /^gou/i, /^eos/i, /^gwe/i, /^her/i, /^du/i, /^ker/i],
    o = /^(genver|c[ʼ\']hwevrer|meurzh|ebrel|mae|mezheven|gouere|eost|gwengolo|here|du|kerzu|gen|c[ʼ\']hwe|meu|ebr|mae|eve|gou|eos|gwe|her|du|ker)/i,
    c = /^(genver|c[ʼ\']hwevrer|meurzh|ebrel|mae|mezheven|gouere|eost|gwengolo|here|du|kerzu)/i,
    l = /^(gen|c[ʼ\']hwe|meu|ebr|mae|eve|gou|eos|gwe|her|du|ker)/i,
    u = [/^sul/i, /^lun/i, /^meurzh/i, /^merc[ʼ\']her/i, /^yaou/i, /^gwener/i, /^sadorn/i],
    d = [/^Sul/i, /^Lun/i, /^Meu/i, /^Mer/i, /^Yao/i, /^Gwe/i, /^Sad/i],
    h = [/^Su/i, /^Lu/i, /^Me([^r]|$)/i, /^Mer/i, /^Ya/i, /^Gw/i, /^Sa/i];
  e.defineLocale("br", {
    months: "Genver_Cʼhwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),
    monthsShort: "Gen_Cʼhwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),
    weekdays: "Sul_Lun_Meurzh_Mercʼher_Yaou_Gwener_Sadorn".split("_"),
    weekdaysShort: "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),
    weekdaysMin: "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),
    weekdaysParse: h,
    fullWeekdaysParse: u,
    shortWeekdaysParse: d,
    minWeekdaysParse: h,
    monthsRegex: o,
    monthsShortRegex: o,
    monthsStrictRegex: c,
    monthsShortStrictRegex: l,
    monthsParse: s,
    longMonthsParse: s,
    shortMonthsParse: s,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D [a viz] MMMM YYYY",
      LLL: "D [a viz] MMMM YYYY HH:mm",
      LLLL: "dddd, D [a viz] MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[Hiziv da] LT",
      nextDay: "[Warcʼhoazh da] LT",
      nextWeek: "dddd [da] LT",
      lastDay: "[Decʼh da] LT",
      lastWeek: "dddd [paset da] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "a-benn %s",
      past: "%s ʼzo",
      s: "un nebeud segondennoù",
      ss: "%d eilenn",
      m: "ur vunutenn",
      mm: t,
      h: "un eur",
      hh: "%d eur",
      d: "un devezh",
      dd: t,
      M: "ur miz",
      MM: t,
      y: "ur bloaz",
      yy: n
    },
    dayOfMonthOrdinalParse: /\d{1,2}(añ|vet)/,
    ordinal: function (e) {
      return e + (1 === e ? "añ" : "vet");
    },
    week: {
      dow: 1,
      doy: 4
    },
    meridiemParse: /a.m.|g.m./,
    isPM: function (e) {
      return "g.m." === e;
    },
    meridiem: function (e, t, n) {
      return e < 12 ? "a.m." : "g.m.";
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
