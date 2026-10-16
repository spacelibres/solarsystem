/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 dv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1215687-1216800.；literal: ޖެނުއަރީ
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1215687-1216800.
!function (e) {
  "use strict";

  var t = ["ޖެނުއަރީ", "ފެބްރުއަރީ", "މާރިޗު", "އޭޕްރީލު", "މޭ", "ޖޫން", "ޖުލައި", "އޯގަސްޓު", "ސެޕްޓެމްބަރު", "އޮކްޓޯބަރު", "ނޮވެމްބަރު", "ޑިސެމްބަރު"],
    n = ["އާދިއްތަ", "ހޯމަ", "އަންގާރަ", "ބުދަ", "ބުރާސްފަތި", "ހުކުރު", "ހޮނިހިރު"];
  e.defineLocale("dv", {
    months: t,
    monthsShort: t,
    weekdays: n,
    weekdaysShort: n,
    weekdaysMin: "އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "D/M/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm"
    },
    meridiemParse: /މކ|މފ/,
    isPM: function (e) {
      return "މފ" === e;
    },
    meridiem: function (e, t, n) {
      return e < 12 ? "މކ" : "މފ";
    },
    calendar: {
      sameDay: "[މިއަދު] LT",
      nextDay: "[މާދަމާ] LT",
      nextWeek: "dddd LT",
      lastDay: "[އިއްޔެ] LT",
      lastWeek: "[ފާއިތުވި] dddd LT",
      sameElse: "L"
    },
    relativeTime: {
      future: "ތެރޭގައި %s",
      past: "ކުރިން %s",
      s: "ސިކުންތުކޮޅެއް",
      ss: "d% ސިކުންތު",
      m: "މިނިޓެއް",
      mm: "މިނިޓު %d",
      h: "ގަޑިއިރެއް",
      hh: "ގަޑިއިރު %d",
      d: "ދުވަހެއް",
      dd: "ދުވަސް %d",
      M: "މަހެއް",
      MM: "މަސް %d",
      y: "އަހަރެއް",
      yy: "އަހަރު %d"
    },
    preparse: function (e) {
      return e.replace(/،/g, ",");
    },
    postformat: function (e) {
      return e.replace(/,/g, "،");
    },
    week: {
      dow: 7,
      doy: 12
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
