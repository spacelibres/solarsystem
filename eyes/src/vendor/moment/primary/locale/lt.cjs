/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 lt 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1290062-1292177.；literal: sekundė_sekundžių_sekundes
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1290062-1292177.
!function (e) {
  "use strict";

  var t = {
    ss: "sekundė_sekundžių_sekundes",
    m: "minutė_minutės_minutę",
    mm: "minutės_minučių_minutes",
    h: "valanda_valandos_valandą",
    hh: "valandos_valandų_valandas",
    d: "diena_dienos_dieną",
    dd: "dienos_dienų_dienas",
    M: "mėnuo_mėnesio_mėnesį",
    MM: "mėnesiai_mėnesių_mėnesius",
    y: "metai_metų_metus",
    yy: "metai_metų_metus"
  };
  function n(e, t, n, r) {
    return t ? "kelios sekundės" : r ? "kelių sekundžių" : "kelias sekundes";
  }
  function r(e, t, n, r) {
    return t ? a(n)[0] : r ? a(n)[1] : a(n)[2];
  }
  function i(e) {
    return e % 10 == 0 || e > 10 && e < 20;
  }
  function a(e) {
    return t[e].split("_");
  }
  function s(e, t, n, s) {
    var o = e + " ";
    return 1 === e ? o + r(e, t, n[0], s) : t ? o + (i(e) ? a(n)[1] : a(n)[0]) : s ? o + a(n)[1] : o + (i(e) ? a(n)[1] : a(n)[2]);
  }
  e.defineLocale("lt", {
    months: {
      format: "sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),
      standalone: "sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_"),
      isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
    },
    monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
    weekdays: {
      format: "sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį".split("_"),
      standalone: "sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"),
      isFormat: /dddd HH:mm/
    },
    weekdaysShort: "Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),
    weekdaysMin: "S_P_A_T_K_Pn_Š".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "YYYY-MM-DD",
      LL: "YYYY [m.] MMMM D [d.]",
      LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
      LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
      l: "YYYY-MM-DD",
      ll: "YYYY [m.] MMMM D [d.]",
      lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
      llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"
    },
    calendar: {
      sameDay: "[Šiandien] LT",
      nextDay: "[Rytoj] LT",
      nextWeek: "dddd LT",
      lastDay: "[Vakar] LT",
      lastWeek: "[Praėjusį] dddd LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "po %s",
      past: "prieš %s",
      s: n,
      ss: s,
      m: r,
      mm: s,
      h: r,
      hh: s,
      d: r,
      dd: s,
      M: r,
      MM: s,
      y: r,
      yy: s
    },
    dayOfMonthOrdinalParse: /\d{1,2}-oji/,
    ordinal: function (e) {
      return e + "-oji";
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
