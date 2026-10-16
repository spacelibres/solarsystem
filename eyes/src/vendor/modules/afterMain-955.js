/** @eyes-analysis
 * 文件职责：提供 afterMain、afterRead、afterWrite、auto、basePlacements、beforeMain、beforeRead、beforeWrite、bottom、clippingParents、end、left、main、modifierPhases、placements、popper、read、reference、right、start、top、variationPlacements、viewport、write；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:2385926-2387121.；exports: afterMain, afterRead, afterWrite, auto, basePlacements, beforeMain, beforeRead, beforeWrite, bottom, clippingParents, end, left, main, modifierPhases, placements, popper, read, reference, right, start, top, variationPlacements, viewport, write
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:2385926-2387121.
var top = "top",
  bottom = "bottom",
  right = "right",
  left = "left",
  auto = "auto",
  basePlacements = [top, bottom, right, left],
  start = "start",
  end = "end",
  clippingParents = "clippingParents",
  viewport = "viewport",
  popper = "popper",
  reference = "reference",
  variationPlacements = basePlacements.reduce(function (e, t) {
    return e.concat([t + "-" + start, t + "-" + end]);
  }, []),
  placements = [].concat(basePlacements, [auto]).reduce(function (e, t) {
    return e.concat([t, t + "-" + start, t + "-" + end]);
  }, []),
  beforeRead = "beforeRead",
  read = "read",
  afterRead = "afterRead",
  beforeMain = "beforeMain",
  main = "main",
  afterMain = "afterMain",
  beforeWrite = "beforeWrite",
  write = "write",
  afterWrite = "afterWrite",
  modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
export { afterMain };
export { afterRead };
export { afterWrite };
export { auto };
export { basePlacements };
export { beforeMain };
export { beforeRead };
export { beforeWrite };
export { bottom };
export { clippingParents };
export { end };
export { left };
export { main };
export { modifierPhases };
export { placements };
export { popper };
export { read };
export { reference };
export { right };
export { start };
export { top };
export { variationPlacements };
export { viewport };
export { write };
