// Recovered from vendors.js:881347-882327.
import * as ThreeCore from "../three/core.js";
import * as Pass from "./Pass.js";
class ShaderPass extends Pass.Pass {
  constructor(material, textureID = "tDiffuse") {
    super(), this.textureID = textureID, this.uniforms = null, this.material = null, material instanceof ThreeCore.ShaderMaterial ? (this.uniforms = material.uniforms, this.material = material) : material && (this.uniforms = ThreeCore.UniformsUtils.clone(material.uniforms), this.material = new ThreeCore.ShaderMaterial({
      name: void 0 !== material.name ? material.name : "unspecified",
      defines: Object.assign({}, material.defines),
      uniforms: this.uniforms,
      vertexShader: material.vertexShader,
      fragmentShader: material.fragmentShader
    })), this._fsQuad = new Pass.FullScreenQuad(this.material);
  }
  render(e, t, n) {
    this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = n.texture), this._fsQuad.material = this.material, this.renderToScreen ? (e.setRenderTarget(null), this._fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this._fsQuad.render(e));
  }
  dispose() {
    this.material.dispose(), this._fsQuad.dispose();
  }
}
export { ShaderPass };
