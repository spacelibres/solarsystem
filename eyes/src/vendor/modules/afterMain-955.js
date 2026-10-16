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
