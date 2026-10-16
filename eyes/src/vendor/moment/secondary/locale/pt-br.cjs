/** @eyes-analysis
 * 文件职责：Moment secondary 独立实例的 pt-br 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则
 * 依据：// Recovered from vendors.js:2108813-2109979.；literal: pt-br
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2108813-2109979.
!function (e) {
  "use strict";

  e.defineLocale("pt-br", {
    months: "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
    monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
    weekdays: "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"),
    weekdaysShort: "dom_seg_ter_qua_qui_sex_sáb".split("_"),
    weekdaysMin: "do_2ª_3ª_4ª_5ª_6ª_sá".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D [de] MMMM [de] YYYY",
      LLL: "D [de] MMMM [de] YYYY [às] HH:mm",
      LLLL: "dddd, D [de] MMMM [de] YYYY [às] HH:mm"
    },
    calendar: {
      sameDay: "[Hoje às] LT",
      nextDay: "[Amanhã às] LT",
      nextWeek: "dddd [às] LT",
      lastDay: "[Ontem às] LT",
      lastWeek: function () {
        return 0 === this.day() || 6 === this.day() ? "[Último] dddd [às] LT" : "[Última] dddd [às] LT";
      },
      sameElse: "L"
    },
    relativeTime: {
      future: "em %s",
      past: "há %s",
      s: "poucos segundos",
      ss: "%d segundos",
      m: "um minuto",
      mm: "%d minutos",
      h: "uma hora",
      hh: "%d horas",
      d: "um dia",
      dd: "%d dias",
      M: "um mês",
      MM: "%d meses",
      y: "um ano",
      yy: "%d anos"
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: "%dº",
    invalidDate: "Data inválida"
  });
}(require("../../../modules/MomentSecondary.cjs"));
