// Recovered from vendors.js:900663-901775.
// Upstream correspondence: Three.js r185 examples/jsm/postprocessing/RenderPass.js; see docs/eyes-analysis/three-renderer-next.md.
import * as ThreeCore from "../three/core.js";
import * as Pass from "./Pass.js";
class RenderPass extends Pass.Pass {
  constructor(scene, camera, overrideMaterial = null, clearColor = null, clearAlpha = null) {
    super(), this.scene = scene, this.camera = camera, this.overrideMaterial = overrideMaterial, this.clearColor = clearColor, this.clearAlpha = clearAlpha, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this.isRenderPass = !0, this._oldClearColor = new ThreeCore.Color();
  }
  render(renderer, writeBuffer, readBuffer) {
    const r = renderer.autoClear;
    let i, a;
    renderer.autoClear = !1, null !== this.overrideMaterial && (a = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), null !== this.clearColor && (renderer.getClearColor(this._oldClearColor), renderer.setClearColor(this.clearColor, renderer.getClearAlpha())), null !== this.clearAlpha && (i = renderer.getClearAlpha(), renderer.setClearAlpha(this.clearAlpha)), 1 == this.clearDepth && renderer.clearDepth(), renderer.setRenderTarget(this.renderToScreen ? null : readBuffer), !0 === this.clear && renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil), renderer.render(this.scene, this.camera), null !== this.clearColor && renderer.setClearColor(this._oldClearColor), null !== this.clearAlpha && renderer.setClearAlpha(i), null !== this.overrideMaterial && (this.scene.overrideMaterial = a), renderer.autoClear = r;
  }
}
export { RenderPass };
