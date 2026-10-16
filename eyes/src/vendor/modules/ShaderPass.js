/** @eyes-analysis
 * 文件职责：把前序纹理绑定到 shader uniform 后绘制全屏通道
 * 依据：// Recovered from vendors.js:881347-882327.；exports: ShaderPass
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:881347-882327.
import * as ThreeCore from "../three/core.js";
import * as Pass from "./Pass.js";
/** @eyes-analysis
 * 类职责：把前序纹理绑定到 shader uniform 后绘制全屏通道
 * 继承：Pass.Pass；导出：ShaderPass。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ShaderPass extends Pass.Pass {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：_fsQuad、material、textureID、uniforms。
   * 调用线索：Object.assign、ThreeCore.UniformsUtils.clone、new Pass.FullScreenQuad、new ThreeCore.ShaderMaterial、super。
   */
  constructor(material, textureID = "tDiffuse") {
    super(), this.textureID = textureID, this.uniforms = null, this.material = null, material instanceof ThreeCore.ShaderMaterial ? (this.uniforms = material.uniforms, this.material = material) : material && (this.uniforms = ThreeCore.UniformsUtils.clone(material.uniforms), this.material = new ThreeCore.ShaderMaterial({
      name: void 0 !== material.name ? material.name : "unspecified",
      defines: Object.assign({}, material.defines),
      uniforms: this.uniforms,
      vertexShader: material.vertexShader,
      fragmentShader: material.fragmentShader
    })), this._fsQuad = new Pass.FullScreenQuad(this.material);
  }
  /** @eyes-analysis
   * 执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定
   * 状态写入：_fsQuad.material、uniforms[this.textureID].value。
   * 调用线索：e.clear、e.setRenderTarget、this._fsQuad.render。
   */
  render(e, t, n) {
    this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = n.texture), this._fsQuad.material = this.material, this.renderToScreen ? (e.setRenderTarget(null), this._fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this._fsQuad.render(e));
  }
  /** @eyes-analysis
   * 发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
   * 调用线索：this._fsQuad.dispose、this.material.dispose。
   */
  dispose() {
    this.material.dispose(), this._fsQuad.dispose();
  }
}
export { ShaderPass };
