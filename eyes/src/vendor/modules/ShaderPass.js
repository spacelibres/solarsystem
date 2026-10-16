// Recovered from vendors.js:881347-882327.
// Upstream correspondence: Three.js r185 examples/jsm/postprocessing/ShaderPass.js; see docs/eyes-analysis/three-renderer-next.md.
import * as ThreeCore from "../three/core.js";
import * as Pass from "./Pass.js";
class ShaderPass extends Pass.Pass {
  constructor(shader, textureID = "tDiffuse") {
    super(), this.textureID = textureID, this.uniforms = null, this.material = null, shader instanceof ThreeCore.ShaderMaterial ? (this.uniforms = shader.uniforms, this.material = shader) : shader && (this.uniforms = ThreeCore.UniformsUtils.clone(shader.uniforms), this.material = new ThreeCore.ShaderMaterial({
      name: void 0 !== shader.name ? shader.name : "unspecified",
      defines: Object.assign({}, shader.defines),
      uniforms: this.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader
    })), this._fsQuad = new Pass.FullScreenQuad(this.material);
  }
  render(renderer, writeBuffer, readBuffer) {
    this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = readBuffer.texture), this._fsQuad.material = this.material, this.renderToScreen ? (renderer.setRenderTarget(null), this._fsQuad.render(renderer)) : (renderer.setRenderTarget(writeBuffer), this.clear && renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil), this._fsQuad.render(renderer));
  }
  dispose() {
    this.material.dispose(), this._fsQuad.dispose();
  }
}
export { ShaderPass };
