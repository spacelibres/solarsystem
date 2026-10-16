/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 ro 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2109980-2111080.；literal: de
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2109980-2111080.
!function (e) {
  "use strict";

  function t(e, t, n) {
    var r = " ";
    return (e % 100 >= 20 || e >= 100 && e % 100 == 0) && (r = " de "), e + r + {
      ss: "secunde",
      mm: "minute",
      hh: "ore",
      dd: "zile",
      ww: "săptămâni",
      MM: "luni",
      yy: "ani"
    }[n];
  }
  e.defineLocale("ro", {
    months: "ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split("_"),
    monthsShort: "ian._feb._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split("_"),
    monthsParseExact: !0,
    weekdays: "duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split("_"),
    weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
    weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY H:mm",
      LLLL: "dddd, D MMMM YYYY H:mm"
    },
    calendar: {
      sameDay: "[azi la] LT",
      nextDay: "[mâine la] LT",
      nextWeek: "dddd [la] LT",
      lastDay: "[ieri la] LT",
      lastWeek: "[fosta] dddd [la] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "peste %s",
      past: "%s în urmă",
      s: "câteva secunde",
      ss: t,
      m: "un minut",
      mm: t,
      h: "o oră",
      hh: t,
      d: "o zi",
      dd: t,
      w: "o săptămână",
      ww: t,
      M: "o lună",
      MM: t,
      y: "un an",
      yy: t
    },
    week: {
      dow: 1,
      doy: 7
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
