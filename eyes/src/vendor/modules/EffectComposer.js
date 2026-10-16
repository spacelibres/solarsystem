// Recovered from vendors.js:877933-880789.
import * as ThreeCore from "../three/core.js";
import * as CopyShader from "./CopyShader.js";
import * as ShaderPass from "./ShaderPass.js";
import * as MaskPass from "./MaskPass.js";
class EffectComposer {
  constructor(renderer, renderTarget1) {
    if (this.renderer = renderer, this._pixelRatio = renderer.getPixelRatio(), void 0 === renderTarget1) {
      const n = renderer.getSize(new ThreeCore.Vector2());
      this._width = n.width, this._height = n.height, (renderTarget1 = new ThreeCore.WebGLRenderTarget(this._width * this._pixelRatio, this._height * this._pixelRatio, {
        type: ThreeCore.HalfFloatType
      })).texture.name = "EffectComposer.rt1";
    } else this._width = renderTarget1.width, this._height = renderTarget1.height;
    this.renderTarget1 = renderTarget1, this.renderTarget2 = renderTarget1.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], this.copyPass = new ShaderPass.ShaderPass(CopyShader.CopyShader), this.copyPass.material.blending = ThreeCore.NoBlending, this.timer = new ThreeCore.Timer();
  }
  swapBuffers() {
    const e = this.readBuffer;
    this.readBuffer = this.writeBuffer, this.writeBuffer = e;
  }
  addPass(e) {
    this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  insertPass(e, t) {
    this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  removePass(e) {
    const t = this.passes.indexOf(e);
    -1 !== t && this.passes.splice(t, 1);
  }
  isLastEnabledPass(e) {
    for (let t = e + 1; t < this.passes.length; t++) if (this.passes[t].enabled) return !1;
    return !0;
  }
  render(e) {
    this.timer.update(), void 0 === e && (e = this.timer.getDelta());
    const t = this.renderer.getRenderTarget();
    let n = !1;
    for (let t = 0, r = this.passes.length; t < r; t++) {
      const r = this.passes[t];
      if (!1 !== r.enabled) {
        if (r.renderToScreen = this.renderToScreen && this.isLastEnabledPass(t), r.render(this.renderer, this.writeBuffer, this.readBuffer, e, n), r.needsSwap) {
          if (n) {
            const t = this.renderer.getContext(),
              n = this.renderer.state.buffers.stencil;
            n.setFunc(t.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), n.setFunc(t.EQUAL, 1, 4294967295);
          }
          this.swapBuffers();
        }
        void 0 !== MaskPass.MaskPass && (r instanceof MaskPass.MaskPass ? n = !0 : r instanceof MaskPass.ClearMaskPass && (n = !1));
      }
    }
    this.renderer.setRenderTarget(t);
  }
  reset(renderTarget1) {
    if (void 0 === renderTarget1) {
      const t = this.renderer.getSize(new ThreeCore.Vector2());
      this._pixelRatio = this.renderer.getPixelRatio(), this._width = t.width, this._height = t.height, (renderTarget1 = this.renderTarget1.clone()).setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = renderTarget1, this.renderTarget2 = renderTarget1.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2;
  }
  setSize(width, height) {
    this._width = width, this._height = height;
    const n = this._width * this._pixelRatio,
      r = this._height * this._pixelRatio;
    this.renderTarget1.setSize(n, r), this.renderTarget2.setSize(n, r);
    for (let e = 0; e < this.passes.length; e++) this.passes[e].setSize(n, r);
  }
  setPixelRatio(pixelRatio) {
    this._pixelRatio = pixelRatio, this.setSize(this._width, this._height);
  }
  dispose() {
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose();
  }
}
export { EffectComposer };
