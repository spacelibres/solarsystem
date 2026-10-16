/** @eyes-analysis
 * 文件职责：生成平面圆盘经向/径向网格，为轨道或局部平面提供空间尺度参考。
 * 依据：import ../pioneer/index.js；DiscGridComponent extends Pioneer.BaseComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:744711-747097.
import * as Pioneer from "../pioneer/index.js";
/** @eyes-analysis
 * 类职责：生成平面圆盘经向/径向网格，为轨道或局部平面提供空间尺度参考。
 * 继承：Pioneer.BaseComponent；导出：DiscGridComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class DiscGridComponent extends Pioneer.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_color`、`_lineMesh`、`_lineWidth`、`_meshDirty`、`_numCircles`、`_numSpokes`、`_radialPower`、`_size`；调用 `new Pioneer.Color`、`super`、`this.__setRadius`、`this.__setUsesEntityOrientation`。
   * 状态写入：_color、_lineMesh、_lineWidth、_meshDirty、_numCircles、_numSpokes、_radialPower、_size。
   * 调用线索：new Pioneer.Color、super、this.__setRadius、this.__setUsesEntityOrientation。
   */
  constructor(t, e) {
    super(t, e);
    this._size = 1;
    this._color = new Pioneer.Color(1, 1, 1, 1);
    this._lineWidth = 1;
    this._numCircles = 10;
    this._numSpokes = 20;
    this._radialPower = 1;
    this._lineMesh = null;
    this._meshDirty = true;
    this.__setRadius(this._size);
    this.__setUsesEntityOrientation(true);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._size`。
   */
  getSize() {
    return this._size;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_size`；调用 `this.__setRadius`、`this._lineMesh.setScale`。
   * 状态写入：_size。
   * 调用线索：this.__setRadius、this._lineMesh.setScale。
   */
  setSize(size) {
    this._size = size;
    this.__setRadius(this._size);
    null !== this._lineMesh && this._lineMesh.setScale(this._size);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._color`。
   */
  getColor() {
    return this._color;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_meshDirty`；调用 `this._color.copy`。
   * 状态写入：_meshDirty。
   * 调用线索：this._color.copy。
   */
  setColor(t) {
    this._color.copy(t);
    this._meshDirty = true;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._lineWidth`。
   */
  getLineWidth() {
    return this._lineWidth;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lineWidth`；调用 `this._lineMesh.setWidths`。
   * 状态写入：_lineWidth。
   * 调用线索：this._lineMesh.setWidths。
   */
  setLineWidth(lineWidth) {
    this._lineWidth = lineWidth;
    null !== this._lineMesh && this._lineMesh.setWidths(this._lineWidth);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._numCircles`。
   */
  getNumCircles() {
    return this._numCircles;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_meshDirty`、`_numCircles`。
   * 状态写入：_meshDirty、_numCircles。
   */
  setNumCircles(numCircles) {
    this._numCircles = numCircles;
    this._meshDirty = true;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._numSpokes`。
   */
  getNumSpokes() {
    return this._numSpokes;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_meshDirty`、`_numSpokes`。
   * 状态写入：_meshDirty、_numSpokes。
   */
  setNumSpokes(numSpokes) {
    this._numSpokes = numSpokes;
    this._meshDirty = true;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._radialPower`。
   */
  getRadialPower() {
    return this._radialPower;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_meshDirty`、`_radialPower`。
   * 状态写入：_meshDirty、_radialPower。
   */
  setRadialPower(radialPower) {
    this._radialPower = radialPower;
    this._meshDirty = true;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.ThreeJsHelper.setOrientationToEntity`、`Pioneer.ThreeJsHelper.setPositionToEntity`、`this._lineMesh.prepareForRender`、`this._updateMesh`、`this.getEntity`、`this.getThreeJsObjects`。
   * 调用线索：Pioneer.ThreeJsHelper.setOrientationToEntity、Pioneer.ThreeJsHelper.setPositionToEntity、this._lineMesh.prepareForRender、this._updateMesh、this.getEntity等。
   */
  __prepareForRender(t) {
    if (this._lineMesh) {
      this._meshDirty && this._updateMesh();
      this._lineMesh.prepareForRender(t);
      for (let e = 0, i = this.getThreeJsObjects().length; e < i; e++) {
        Pioneer.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[e], this.getEntity());
        Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[e], this.getEntity(), t);
      }
    }
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lineMesh`；调用 `new Pioneer.LineMesh`、`this._lineMesh.setScale`、`this._updateMesh`。
   * 状态写入：_lineMesh。
   * 调用线索：new Pioneer.LineMesh、this._lineMesh.setScale、this._updateMesh。
   */
  async __loadResources() {
    this._lineMesh = new Pioneer.LineMesh(this);
    this._updateMesh();
    this._lineMesh.setScale(this._size);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lineMesh`；调用 `Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials`。
   * 状态写入：_lineMesh。
   * 调用线索：Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials。
   */
  __unloadResources() {
    Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._lineMesh = null;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_meshDirty`；返回 `void`；调用 `Math.cos`、`Math.sin`、`e.push`、`new Pioneer.Vector3`、`t.push`、`this._lineMesh.setColors`。
   * 状态写入：_meshDirty。
   * 调用线索：Math.cos、Math.sin、e.push、new Pioneer.Vector3、t.push等。
   */
  _updateMesh() {
    if (!this._lineMesh) return;
    const t = [];
    for (let e = 1; e <= this._numCircles; e++) {
      const i = 1 !== this._radialPower ? this._radialPower ** (e - this._numCircles) : e / this._numCircles;
      const n = 50;
      for (let e = 0; e < n; e++) {
        const o = e / n * Pioneer.MathUtils.TwoPi;
        const r = (e + 1) % n / n * Pioneer.MathUtils.TwoPi;
        t.push(new Pioneer.Vector3(i * Math.cos(o), i * Math.sin(o), 0));
        t.push(new Pioneer.Vector3(i * Math.cos(r), i * Math.sin(r), 0));
      }
    }
    for (let e = 0; e < this._numSpokes; e++) {
      const i = e / this._numSpokes * Pioneer.MathUtils.TwoPi;
      t.push(Pioneer.Vector3.Zero);
      t.push(new Pioneer.Vector3(Math.cos(i), Math.sin(i), 0));
    }
    const e = [];
    for (let i = 0, s = t.length; i < s; i++) e.push(this._color);
    this._lineMesh.setPositions(t);
    this._lineMesh.setColors(e);
    this._lineMesh.setWidths(this._lineWidth);
    this._meshDirty = false;
  }
  _size;
  _color;
  _lineWidth;
  _numCircles;
  _numSpokes;
  _radialPower;
  _lineMesh;
  _meshDirty;
}
export { DiscGridComponent };
