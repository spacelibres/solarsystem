/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 lo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2075818-2076983.；literal: ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2075818-2076983.
!function (e) {
  "use strict";

  e.defineLocale("lo", {
    months: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),
    monthsShort: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),
    weekdays: "ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),
    weekdaysShort: "ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),
    weekdaysMin: "ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "ວັນdddd D MMMM YYYY HH:mm"
    },
    meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
    isPM: function (e) {
      return "ຕອນແລງ" === e;
    },
    meridiem: function (e, t, n) {
      return e < 12 ? "ຕອນເຊົ້າ" : "ຕອນແລງ";
    },
    calendar: {
      sameDay: "[ມື້ນີ້ເວລາ] LT",
      nextDay: "[ມື້ອື່ນເວລາ] LT",
      nextWeek: "[ວັນ]dddd[ໜ້າເວລາ] LT",
      lastDay: "[ມື້ວານນີ້ເວລາ] LT",
      lastWeek: "[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "ອີກ %s",
      past: "%sຜ່ານມາ",
      s: "ບໍ່ເທົ່າໃດວິນາທີ",
      ss: "%d ວິນາທີ",
      m: "1 ນາທີ",
      mm: "%d ນາທີ",
      h: "1 ຊົ່ວໂມງ",
      hh: "%d ຊົ່ວໂມງ",
      d: "1 ມື້",
      dd: "%d ມື້",
      M: "1 ເດືອນ",
      MM: "%d ເດືອນ",
      y: "1 ປີ",
      yy: "%d ປີ"
    },
    dayOfMonthOrdinalParse: /(ທີ່)\d{1,2}/,
    ordinal: function (e) {
      return "ທີ່" + e;
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
