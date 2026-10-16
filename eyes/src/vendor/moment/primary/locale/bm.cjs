/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 bm 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1193857-1194921.；literal: Zan_Few_Mar_Awi_Mɛ_Zuw_Zul_Uti_Sɛt_ɔku_Now_Des
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1193857-1194921.
!function (e) {
  "use strict";

  e.defineLocale("bm", {
    months: "Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_Mɛkalo_Zuwɛnkalo_Zuluyekalo_Utikalo_Sɛtanburukalo_ɔkutɔburukalo_Nowanburukalo_Desanburukalo".split("_"),
    monthsShort: "Zan_Few_Mar_Awi_Mɛ_Zuw_Zul_Uti_Sɛt_ɔku_Now_Des".split("_"),
    weekdays: "Kari_Ntɛnɛn_Tarata_Araba_Alamisa_Juma_Sibiri".split("_"),
    weekdaysShort: "Kar_Ntɛ_Tar_Ara_Ala_Jum_Sib".split("_"),
    weekdaysMin: "Ka_Nt_Ta_Ar_Al_Ju_Si".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "MMMM [tile] D [san] YYYY",
      LLL: "MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm",
      LLLL: "dddd MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm"
    },
    calendar: {
      sameDay: "[Bi lɛrɛ] LT",
      nextDay: "[Sini lɛrɛ] LT",
      nextWeek: "dddd [don lɛrɛ] LT",
      lastDay: "[Kunu lɛrɛ] LT",
      lastWeek: "dddd [tɛmɛnen lɛrɛ] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "%s kɔnɔ",
      past: "a bɛ %s bɔ",
      s: "sanga dama dama",
      ss: "sekondi %d",
      m: "miniti kelen",
      mm: "miniti %d",
      h: "lɛrɛ kelen",
      hh: "lɛrɛ %d",
      d: "tile kelen",
      dd: "tile %d",
      M: "kalo kelen",
      MM: "kalo %d",
      y: "san kelen",
      yy: "san %d"
    },
    week: {
      dow: 1,
      doy: 4
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
