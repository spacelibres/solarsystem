// Recovered from vendors.js:900663-901775.
import * as ThreeCore from "../three/core.js";
import * as Pass from "./Pass.js";
class RenderPass extends Pass.Pass {
  constructor(scene, camera, overrideMaterial = null, clearColor = null, clearAlpha = null) {
    super(), this.scene = scene, this.camera = camera, this.overrideMaterial = overrideMaterial, this.clearColor = clearColor, this.clearAlpha = clearAlpha, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this.isRenderPass = !0, this._oldClearColor = new ThreeCore.Color();
  }
  render(e, t, n) {
    const r = e.autoClear;
    let i, a;
    e.autoClear = !1, null !== this.overrideMaterial && (a = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), null !== this.clearColor && (e.getClearColor(this._oldClearColor), e.setClearColor(this.clearColor, e.getClearAlpha())), null !== this.clearAlpha && (i = e.getClearAlpha(), e.setClearAlpha(this.clearAlpha)), 1 == this.clearDepth && e.clearDepth(), e.setRenderTarget(this.renderToScreen ? null : n), !0 === this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), e.render(this.scene, this.camera), null !== this.clearColor && e.setClearColor(this._oldClearColor), null !== this.clearAlpha && e.setClearAlpha(i), null !== this.overrideMaterial && (this.scene.overrideMaterial = a), e.autoClear = r;
  }
}
export { RenderPass };
