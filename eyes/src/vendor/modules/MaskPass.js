// Recovered from vendors.js:883225-884484.
// Upstream correspondence: Three.js r185 examples/jsm/postprocessing/MaskPass.js; see docs/eyes-analysis/three-renderer-next.md.
import * as Pass from "./Pass.js";
class MaskPass extends Pass.Pass {
  constructor(scene, camera) {
    super(), this.scene = scene, this.camera = camera, this.clear = !0, this.needsSwap = !1, this.inverse = !1;
  }
  render(renderer, writeBuffer, readBuffer) {
    const r = renderer.getContext(),
      i = renderer.state;
    let a, s;
    i.buffers.color.setMask(!1), i.buffers.depth.setMask(!1), i.buffers.color.setLocked(!0), i.buffers.depth.setLocked(!0), this.inverse ? (a = 0, s = 1) : (a = 1, s = 0), i.buffers.stencil.setTest(!0), i.buffers.stencil.setOp(r.REPLACE, r.REPLACE, r.REPLACE), i.buffers.stencil.setFunc(r.ALWAYS, a, 4294967295), i.buffers.stencil.setClear(s), i.buffers.stencil.setLocked(!0), renderer.setRenderTarget(readBuffer), this.clear && renderer.clear(), renderer.render(this.scene, this.camera), renderer.setRenderTarget(writeBuffer), this.clear && renderer.clear(), renderer.render(this.scene, this.camera), i.buffers.color.setLocked(!1), i.buffers.depth.setLocked(!1), i.buffers.color.setMask(!0), i.buffers.depth.setMask(!0), i.buffers.stencil.setLocked(!1), i.buffers.stencil.setFunc(r.EQUAL, 1, 4294967295), i.buffers.stencil.setOp(r.KEEP, r.KEEP, r.KEEP), i.buffers.stencil.setLocked(!0);
  }
}
class ClearMaskPass extends Pass.Pass {
  constructor() {
    super(), this.needsSwap = !1;
  }
  render(renderer) {
    renderer.state.buffers.stencil.setLocked(!1), renderer.state.buffers.stencil.setTest(!1);
  }
}
export { ClearMaskPass };
export { MaskPass };
