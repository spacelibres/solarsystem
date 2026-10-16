/** @eyes-analysis
 * 文件职责：实现 addClasses；调用方以这些语义键装配模块
 * 依据：// Recovered from vendors.js:1640098-1640826.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1640098-1640826.
function r() {
  const e = this,
    {
      classNames: classNames,
      params: params,
      rtl: rtl,
      $el: $el,
      device: device,
      support: support
    } = e,
    o = function (e, t) {
      const n = [];
      return e.forEach(e => {
        "object" == typeof e ? Object.keys(e).forEach(r => {
          e[r] && n.push(t + r);
        }) : "string" == typeof e && n.push(t + e);
      }), n;
    }(["initialized", params.direction, {
      "pointer-events": !support.touch
    }, {
      "free-mode": e.params.freeMode && params.freeMode.enabled
    }, {
      autoheight: params.autoHeight
    }, {
      rtl: rtl
    }, {
      grid: params.grid && params.grid.rows > 1
    }, {
      "grid-column": params.grid && params.grid.rows > 1 && "column" === params.grid.fill
    }, {
      android: device.android
    }, {
      ios: device.ios
    }, {
      "css-mode": params.cssMode
    }, {
      centered: params.cssMode && params.centeredSlides
    }], params.containerModifierClass);
  classNames.push(...o), $el.addClass([...classNames].join(" ")), e.emitContainerClasses();
}
export { r as default };
