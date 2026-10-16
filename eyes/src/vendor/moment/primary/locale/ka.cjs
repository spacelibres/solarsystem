/** @eyes-analysis
 * 文件职责：Moment primary 独立实例的 ka 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:1277574-1279015.；literal: იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1277574-1279015.
!function (e) {
  "use strict";

  e.defineLocale("ka", {
    months: "იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"),
    monthsShort: "იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),
    weekdays: {
      standalone: "კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),
      format: "კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split("_"),
      isFormat: /(წინა|შემდეგ)/
    },
    weekdaysShort: "კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),
    weekdaysMin: "კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm"
    },
    calendar: {
      sameDay: "[დღეს] LT[-ზე]",
      nextDay: "[ხვალ] LT[-ზე]",
      lastDay: "[გუშინ] LT[-ზე]",
      nextWeek: "[შემდეგ] dddd LT[-ზე]",
      lastWeek: "[წინა] dddd LT-ზე",
      sameElse: "L"
    },
    relativeTime: {
      future: function (e) {
        return e.replace(/(წამ|წუთ|საათ|წელ|დღ|თვ)(ი|ე)/, function (e, t, n) {
          return "ი" === n ? t + "ში" : t + n + "ში";
        });
      },
      past: function (e) {
        return /(წამი|წუთი|საათი|დღე|თვე)/.test(e) ? e.replace(/(ი|ე)$/, "ის წინ") : /წელი/.test(e) ? e.replace(/წელი$/, "წლის წინ") : e;
      },
      s: "რამდენიმე წამი",
      ss: "%d წამი",
      m: "წუთი",
      mm: "%d წუთი",
      h: "საათი",
      hh: "%d საათი",
      d: "დღე",
      dd: "%d დღე",
      M: "თვე",
      MM: "%d თვე",
      y: "წელი",
      yy: "%d წელი"
    },
    dayOfMonthOrdinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
    ordinal: function (e) {
      return 0 === e ? e : 1 === e ? e + "-ლი" : e < 20 || e <= 100 && e % 20 == 0 || e % 100 == 0 ? "მე-" + e : e + "-ე";
    },
    week: {
      dow: 1,
      doy: 7
    }
  });
}(require("../../../modules/MomentPrimary.cjs"));
