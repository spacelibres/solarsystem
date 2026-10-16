// Recovered from vendors.js:1626505-1626929.
function r(e) {
  const t = this;
  if (t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
  const n = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
  n.style.cursor = "move", n.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", n.style.cursor = e ? "-moz-grabbin" : "-moz-grab", n.style.cursor = e ? "grabbing" : "grab";
}
export { r as default };
