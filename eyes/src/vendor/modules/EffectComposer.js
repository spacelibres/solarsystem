/** @eyes-analysis
 * 文件职责：串联后处理通道并在双渲染目标之间交换读写缓冲
 * 依据：// Recovered from vendors.js:877933-880789.；exports: EffectComposer
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:877933-880789.
import * as ThreeCore from "../three/core.js";
import * as CopyShader from "./CopyShader.js";
import * as ShaderPass from "./ShaderPass.js";
import * as MaskPass from "./MaskPass.js";
/** @eyes-analysis
 * 类职责：串联后处理通道并在双渲染目标之间交换读写缓冲
 * 继承：无显式父类；导出：EffectComposer。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class EffectComposer {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：_height、_pixelRatio、_width、copyPass、copyPass.material.blending、passes、readBuffer、renderTarget1等；完整记录见索引。
   * 调用线索：new ShaderPass.ShaderPass、new ThreeCore.Timer、new ThreeCore.Vector2、new ThreeCore.WebGLRenderTarget、renderTarget1.clone等。
   */
  constructor(renderer, renderTarget1) {
    if (this.renderer = renderer, this._pixelRatio = renderer.getPixelRatio(), void 0 === renderTarget1) {
      const n = renderer.getSize(new ThreeCore.Vector2());
      this._width = n.width, this._height = n.height, (renderTarget1 = new ThreeCore.WebGLRenderTarget(this._width * this._pixelRatio, this._height * this._pixelRatio, {
        type: ThreeCore.HalfFloatType
      })).texture.name = "EffectComposer.rt1";
    } else this._width = renderTarget1.width, this._height = renderTarget1.height;
    this.renderTarget1 = renderTarget1, this.renderTarget2 = renderTarget1.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], this.copyPass = new ShaderPass.ShaderPass(CopyShader.CopyShader), this.copyPass.material.blending = ThreeCore.NoBlending, this.timer = new ThreeCore.Timer();
  }
  /** @eyes-analysis
   * 源码方法 swapBuffers；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：readBuffer、writeBuffer。
   */
  swapBuffers() {
    const e = this.readBuffer;
    this.readBuffer = this.writeBuffer, this.writeBuffer = e;
  }
  /** @eyes-analysis
   * 源码方法 addPass；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：e.setSize、this.passes.push。
   */
  addPass(e) {
    this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  /** @eyes-analysis
   * 源码方法 insertPass；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：e.setSize、this.passes.splice。
   */
  insertPass(e, t) {
    this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  /** @eyes-analysis
   * 源码方法 removePass；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：this.passes.indexOf、this.passes.splice。
   */
  removePass(e) {
    const t = this.passes.indexOf(e);
    -1 !== t && this.passes.splice(t, 1);
  }
  /** @eyes-analysis
   * 源码方法 isLastEnabledPass；作用以类职责与源码实现为准，未猜测压缩参数含义
   */
  isLastEnabledPass(e) {
    for (let t = e + 1; t < this.passes.length; t++) if (this.passes[t].enabled) return !1;
    return !0;
  }
  /** @eyes-analysis
   * 执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定
   * 调用线索：n.setFunc、r.render、this.copyPass.render、this.isLastEnabledPass、this.renderer.getContext等。
   */
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
  /** @eyes-analysis
   * 源码方法 reset；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：_height、_pixelRatio、_width、readBuffer、renderTarget1、renderTarget2、writeBuffer。
   * 调用线索：(renderTarget1=this.renderTarget1.clone()).setSize、new ThreeCore.Vector2、renderTarget1.clone、this.renderTarget1.clone、this.renderTarget1.dispose等。
   */
  reset(renderTarget1) {
    if (void 0 === renderTarget1) {
      const t = this.renderer.getSize(new ThreeCore.Vector2());
      this._pixelRatio = this.renderer.getPixelRatio(), this._width = t.width, this._height = t.height, (renderTarget1 = this.renderTarget1.clone()).setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = renderTarget1, this.renderTarget2 = renderTarget1.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2;
  }
  /** @eyes-analysis
   * 更新像素尺寸及关联目标；后处理链需要同步所有通道
   * 状态写入：_height、_width。
   * 调用线索：this.passes[e].setSize、this.renderTarget1.setSize、this.renderTarget2.setSize。
   */
  setSize(width, height) {
    this._width = width, this._height = height;
    const n = this._width * this._pixelRatio,
      r = this._height * this._pixelRatio;
    this.renderTarget1.setSize(n, r), this.renderTarget2.setSize(n, r);
    for (let e = 0; e < this.passes.length; e++) this.passes[e].setSize(n, r);
  }
  /** @eyes-analysis
   * 源码方法 setPixelRatio；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：_pixelRatio。
   * 调用线索：this.setSize。
   */
  setPixelRatio(pixelRatio) {
    this._pixelRatio = pixelRatio, this.setSize(this._width, this._height);
  }
  /** @eyes-analysis
   * 发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
   * 调用线索：this.copyPass.dispose、this.renderTarget1.dispose、this.renderTarget2.dispose。
   */
  dispose() {
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose();
  }
}
export { EffectComposer };
