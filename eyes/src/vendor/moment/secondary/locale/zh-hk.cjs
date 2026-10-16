/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 zh-hk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2158726-2159989.；literal: zh-hk
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2158726-2159989.
!function (e) {
  "use strict";

  e.defineLocale("zh-hk", {
    months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
    monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
    weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
    weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"),
    weekdaysMin: "日_一_二_三_四_五_六".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "YYYY/MM/DD",
      LL: "YYYY年M月D日",
      LLL: "YYYY年M月D日 HH:mm",
      LLLL: "YYYY年M月D日dddd HH:mm",
      l: "YYYY/M/D",
      ll: "YYYY年M月D日",
      lll: "YYYY年M月D日 HH:mm",
      llll: "YYYY年M月D日dddd HH:mm"
    },
    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
    meridiemHour: function (e, t) {
      return 12 === e && (e = 0), "凌晨" === t || "早上" === t || "上午" === t ? e : "中午" === t ? e >= 11 ? e : e + 12 : "下午" === t || "晚上" === t ? e + 12 : void 0;
    },
    meridiem: function (e, t, n) {
      var r = 100 * e + t;
      return r < 600 ? "凌晨" : r < 900 ? "早上" : r < 1200 ? "上午" : 1200 === r ? "中午" : r < 1800 ? "下午" : "晚上";
    },
    calendar: {
      sameDay: "[今天]LT",
      nextDay: "[明天]LT",
      nextWeek: "[下]ddddLT",
      lastDay: "[昨天]LT",
      lastWeek: "[上]ddddLT",
      sameElse: "L"
    },
    dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
    ordinal: function (e, t) {
      switch (t) {
        case "d":
        case "D":
        case "DDD":
          return e + "日";
        case "M":
          return e + "月";
        case "w":
        case "W":
          return e + "週";
        default:
          return e;
      }
    },
    relativeTime: {
      future: "%s後",
      past: "%s前",
      s: "幾秒",
      ss: "%d 秒",
      m: "1 分鐘",
      mm: "%d 分鐘",
      h: "1 小時",
      hh: "%d 小時",
      d: "1 天",
      dd: "%d 天",
      M: "1 個月",
      MM: "%d 個月",
      y: "1 年",
      yy: "%d 年"
    }
  });
}(require("../../../modules/MomentSecondary.cjs"));
