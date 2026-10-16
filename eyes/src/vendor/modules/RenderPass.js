/** @eyes-analysis
 * 文件职责：将场景和相机绘制到当前后处理目标
 * 依据：// Recovered from vendors.js:900663-901775.；exports: RenderPass
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:900663-901775.
import * as ThreeCore from "../three/core.js";
import * as Pass from "./Pass.js";
/** @eyes-analysis
 * 类职责：将场景和相机绘制到当前后处理目标
 * 继承：Pass.Pass；导出：RenderPass。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class RenderPass extends Pass.Pass {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：_oldClearColor、camera、clear、clearAlpha、clearColor、clearDepth、isRenderPass、needsSwap等；完整记录见索引。
   * 调用线索：new ThreeCore.Color、super。
   */
  constructor(scene, camera, overrideMaterial = null, clearColor = null, clearAlpha = null) {
    super(), this.scene = scene, this.camera = camera, this.overrideMaterial = overrideMaterial, this.clearColor = clearColor, this.clearAlpha = clearAlpha, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this.isRenderPass = !0, this._oldClearColor = new ThreeCore.Color();
  }
  /** @eyes-analysis
   * 执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定
   * 状态写入：scene.overrideMaterial。
   * 调用线索：e.clear、e.clearDepth、e.getClearAlpha、e.getClearColor、e.render等。
   */
  render(e, t, n) {
    const r = e.autoClear;
    let i, a;
    e.autoClear = !1, null !== this.overrideMaterial && (a = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), null !== this.clearColor && (e.getClearColor(this._oldClearColor), e.setClearColor(this.clearColor, e.getClearAlpha())), null !== this.clearAlpha && (i = e.getClearAlpha(), e.setClearAlpha(this.clearAlpha)), 1 == this.clearDepth && e.clearDepth(), e.setRenderTarget(this.renderToScreen ? null : n), !0 === this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), e.render(this.scene, this.camera), null !== this.clearColor && e.setClearColor(this._oldClearColor), null !== this.clearAlpha && e.setClearAlpha(i), null !== this.overrideMaterial && (this.scene.overrideMaterial = a), e.autoClear = r;
  }
}
export { RenderPass };
