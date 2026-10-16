/** @eyes-analysis
 * 文件职责：生成带主/次半径和分段参数的环面网格。
 * 依据：import ../pioneer/index.js；TorusComponent extends Pioneer.BaseComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:761934-763928.
import * as Pioneer from "../pioneer/index.js";
/** @eyes-analysis
 * 类职责：生成带主/次半径和分段参数的环面网格。
 * 继承：Pioneer.BaseComponent；导出：TorusComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TorusComponent extends Pioneer.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_color`、`_innerRadius`、`_outerRadius`；调用 `new Pioneer.Color`、`super`、`this.__setRadius`、`this.__setUsesEntityOrientation`。
   * 状态写入：_color、_innerRadius、_outerRadius。
   * 调用线索：new Pioneer.Color、super、this.__setRadius、this.__setUsesEntityOrientation。
   */
  constructor(t, e) {
    super(t, e);
    this._color = new Pioneer.Color(1, 1, 1, 1);
    this._innerRadius = 1;
    this._outerRadius = 10;
    this.__setRadius(this._outerRadius);
    this.__setUsesEntityOrientation(true);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._color`。
   */
  getColor() {
    return this._color;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._color.copy`。
   * 调用线索：this._color.copy。
   */
  setColor(t) {
    this._color.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._innerRadius`。
   */
  getInnerRadius() {
    return this._innerRadius;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_innerRadius`；调用 `this.resetResources`。
   * 状态写入：_innerRadius。
   * 调用线索：this.resetResources。
   */
  setInnerRadius(innerRadius) {
    this._innerRadius = innerRadius;
    this.resetResources();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._outerRadius`。
   */
  getOuterRadius() {
    return this._outerRadius;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_outerRadius`；调用 `this.__setRadius`、`this.resetResources`。
   * 状态写入：_outerRadius。
   * 调用线索：this.__setRadius、this.resetResources。
   */
  setOuterRadius(outerRadius) {
    this._outerRadius = outerRadius;
    this.__setRadius(this._outerRadius);
    this.resetResources();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.ThreeJsHelper.setOrientationToEntity`、`Pioneer.ThreeJsHelper.setPositionToEntity`、`Pioneer.ThreeJsHelper.setUniformColorRGBA`、`this.getEntity`、`this.getThreeJsMaterials`、`this.getThreeJsObjects`。
   * 调用线索：Pioneer.ThreeJsHelper.setOrientationToEntity、Pioneer.ThreeJsHelper.setPositionToEntity、Pioneer.ThreeJsHelper.setUniformColorRGBA、this.getEntity、this.getThreeJsMaterials等。
   */
  __prepareForRender(t) {
    Pioneer.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity());
    Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), t);
    const e = this.getVisibleInterval().getFadeMultiplier(this.getEntity(), t);
    Pioneer.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "color", this._color, e);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.ThreeJsHelper.createMeshObject`、`this._createMesh`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getEngine`、`this.getEntity().getScene().getEngine().getMaterialManager`。
   * 调用线索：Pioneer.ThreeJsHelper.createMeshObject、this._createMesh、this.getEntity、this.getEntity().getScene、this.getEntity().getScene().getEngine等。
   */
  async __loadResources() {
    const t = this.getEntity().getScene().getEngine().getMaterialManager().getPreloaded("basic_alpha");
    this.getThreeJsMaterials().push(t);
    const e = Pioneer.ThreeJsHelper.createMeshObject(this, t, [{
      name: "position",
      dimensions: 3
    }], false);
    this.getThreeJsObjects().push(e);
    this._createMesh();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials`。
   * 调用线索：Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials。
   */
  __unloadResources() {
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.cos`、`Math.sin`、`Pioneer.ThreeJsHelper.setIndices`、`Pioneer.ThreeJsHelper.setVertices`、`new Float32Array`、`new Uint16Array`。
   * 调用线索：Math.cos、Math.sin、Pioneer.ThreeJsHelper.setIndices、Pioneer.ThreeJsHelper.setVertices、new Float32Array等。
   */
  _createMesh() {
    const t = 100;
    const e = 20;
    const float32Array = new Float32Array(6e3);
    const uint16Array = new Uint16Array(12e3);
    const o = (this._outerRadius + this._innerRadius) / 2;
    const r = (this._outerRadius - this._innerRadius) / 2;
    for (let a = 0; a < t; a++) {
      const l = a / t * Pioneer.MathUtils.TwoPi;
      const c = Math.cos(l);
      const h = Math.sin(l);
      for (let l = 0; l < e; l++) {
        const d = l / e * Pioneer.MathUtils.TwoPi;
        const u = Math.cos(d);
        const p = Math.sin(d);
        const _ = 3 * (a * e + l);
        float32Array[_ + 0] = c * (o + r * u);
        float32Array[_ + 1] = h * (o + r * u);
        float32Array[_ + 2] = r * p;
        const m = 6 * (a * e + l);
        const g = (a + 1) % t;
        const y = (l + 1) % e;
        uint16Array[m + 0] = a * e + l;
        uint16Array[m + 1] = g * e + l;
        uint16Array[m + 2] = a * e + y;
        uint16Array[m + 3] = g * e + y;
        uint16Array[m + 4] = a * e + y;
        uint16Array[m + 5] = g * e + l;
      }
    }
    const a = this.getThreeJsObjects()[0].geometry;
    Pioneer.ThreeJsHelper.setVertices(a, "position", float32Array);
    Pioneer.ThreeJsHelper.setIndices(a, uint16Array);
  }
  _color;
  _innerRadius;
  _outerRadius;
}
export { TorusComponent };
