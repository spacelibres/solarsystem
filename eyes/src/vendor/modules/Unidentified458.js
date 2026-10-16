// Recovered from vendors.js:1641436-1641953.
function r() {
  const e = this;
  function t() {
    null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")));
  }
  e.imagesToLoad = e.$el.find("img");
  for (let n = 0; n < e.imagesToLoad.length; n += 1) {
    const r = e.imagesToLoad[n];
    e.loadImage(r, r.currentSrc || r.getAttribute("src"), r.srcset || r.getAttribute("srcset"), r.sizes || r.getAttribute("sizes"), !0, t);
  }
}
export { r as default };
