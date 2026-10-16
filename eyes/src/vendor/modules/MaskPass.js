/** @eyes-analysis
 * 文件职责：通过 stencil buffer 写入后处理遮罩；关闭后续通道的 stencil 遮罩约束
 * 依据：// Recovered from vendors.js:883225-884484.；exports: ClearMaskPass, MaskPass
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:883225-884484.
import * as Pass from "./Pass.js";
/** @eyes-analysis
 * 类职责：通过 stencil buffer 写入后处理遮罩
 * 继承：Pass.Pass；导出：MaskPass。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class MaskPass extends Pass.Pass {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：camera、clear、inverse、needsSwap、scene。
   * 调用线索：super。
   */
  constructor(scene, camera) {
    super(), this.scene = scene, this.camera = camera, this.clear = !0, this.needsSwap = !1, this.inverse = !1;
  }
  /** @eyes-analysis
   * 执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定
   * 调用线索：e.clear、e.getContext、e.render、e.setRenderTarget、i.buffers.color.setLocked等。
   */
  render(e, t, n) {
    const r = e.getContext(),
      i = e.state;
    let a, s;
    i.buffers.color.setMask(!1), i.buffers.depth.setMask(!1), i.buffers.color.setLocked(!0), i.buffers.depth.setLocked(!0), this.inverse ? (a = 0, s = 1) : (a = 1, s = 0), i.buffers.stencil.setTest(!0), i.buffers.stencil.setOp(r.REPLACE, r.REPLACE, r.REPLACE), i.buffers.stencil.setFunc(r.ALWAYS, a, 4294967295), i.buffers.stencil.setClear(s), i.buffers.stencil.setLocked(!0), e.setRenderTarget(n), this.clear && e.clear(), e.render(this.scene, this.camera), e.setRenderTarget(t), this.clear && e.clear(), e.render(this.scene, this.camera), i.buffers.color.setLocked(!1), i.buffers.depth.setLocked(!1), i.buffers.color.setMask(!0), i.buffers.depth.setMask(!0), i.buffers.stencil.setLocked(!1), i.buffers.stencil.setFunc(r.EQUAL, 1, 4294967295), i.buffers.stencil.setOp(r.KEEP, r.KEEP, r.KEEP), i.buffers.stencil.setLocked(!0);
  }
}
/** @eyes-analysis
 * 类职责：关闭后续通道的 stencil 遮罩约束
 * 继承：Pass.Pass；导出：ClearMaskPass。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ClearMaskPass extends Pass.Pass {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：needsSwap。
   * 调用线索：super。
   */
  constructor() {
    super(), this.needsSwap = !1;
  }
  /** @eyes-analysis
   * 执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定
   * 调用线索：e.state.buffers.stencil.setLocked、e.state.buffers.stencil.setTest。
   */
  render(e) {
    e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1);
  }
}
export { ClearMaskPass };
export { MaskPass };
