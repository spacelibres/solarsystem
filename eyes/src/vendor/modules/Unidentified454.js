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
