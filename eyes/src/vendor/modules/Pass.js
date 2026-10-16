/** @eyes-analysis
 * 文件职责：后处理通道契约与启停、清屏及交换缓冲标志；FullscreenTriangle 几何生成器；构建 position/normal/uv 属性及三角索引；使用全屏三角形绘制后处理材质
 * 依据：// Recovered from vendors.js:882328-883224.；exports: FullScreenQuad, Pass
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:882328-883224.
import * as ThreeCore from "../three/core.js";
/** @eyes-analysis
 * 类职责：后处理通道契约与启停、清屏及交换缓冲标志
 * 继承：无显式父类；导出：Pass。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Pass {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：clear、enabled、isPass、needsSwap、renderToScreen。
   */
  constructor() {
    this.isPass = !0, this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1;
  }
  /** @eyes-analysis
   * 更新像素尺寸及关联目标；后处理链需要同步所有通道
   */
  setSize() {}
  /** @eyes-analysis
   * 执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定
   * 调用线索：console.error。
   */
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
  /** @eyes-analysis
   * 发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
   */
  dispose() {}
}
const orthographicCamera = new ThreeCore.OrthographicCamera(-1, 1, 1, -1, 0, 1);
/** @eyes-analysis
 * 类职责：FullscreenTriangle 几何生成器；构建 position/normal/uv 属性及三角索引
 * 继承：ThreeCore.BufferGeometry；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class FullscreenTriangleGeometry extends ThreeCore.BufferGeometry {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 调用线索：new ThreeCore.Float32BufferAttribute、super、this.setAttribute。
   */
  constructor() {
    super(), this.setAttribute("position", new ThreeCore.Float32BufferAttribute([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute("uv", new ThreeCore.Float32BufferAttribute([0, 2, 0, 0, 2, 0], 2));
  }
}
const fullscreenTriangleGeometry = new FullscreenTriangleGeometry();
/** @eyes-analysis
 * 类职责：使用全屏三角形绘制后处理材质
 * 继承：无显式父类；导出：FullScreenQuad。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class FullScreenQuad {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：_mesh。
   * 调用线索：new ThreeCore.Mesh。
   */
  constructor(e) {
    this._mesh = new ThreeCore.Mesh(fullscreenTriangleGeometry, e);
  }
  /** @eyes-analysis
   * 发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
   * 调用线索：this._mesh.geometry.dispose。
   */
  dispose() {
    this._mesh.geometry.dispose();
  }
  /** @eyes-analysis
   * 执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定
   * 调用线索：e.render。
   */
  render(e) {
    e.render(this._mesh, orthographicCamera);
  }
  /** @eyes-analysis
   * 只读返回 this._mesh.material；此 getter 不执行对应 setter 的写入或更新通知
   */
  get material() {
    return this._mesh.material;
  }
  /** @eyes-analysis
   * 将输入值写入 this._mesh.material，实际变更发生在 setter 中
   * 状态写入：_mesh.material。
   */
  set material(e) {
    this._mesh.material = e;
  }
}
export { FullScreenQuad };
export { Pass };
