/** @eyes-analysis
 * 文件职责：在球面生成经纬网格并以相机相关变换渲染。
 * 依据：import ../pioneer/public-api.js；SphereGridComponent extends PioneerPublicApi.BaseComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:389793-392138.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：在球面生成经纬网格并以相机相关变换渲染。
 * 继承：PioneerPublicApi.BaseComponent；导出：SphereGridComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class SphereGridComponent extends PioneerPublicApi.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_color`、`_degreesPerLine`、`_lineMesh`、`_meshDirty`、`_relativeToEntity`；调用 `new PioneerPublicApi.Color`、`super`。
   * 状态写入：_color、_degreesPerLine、_lineMesh、_meshDirty、_relativeToEntity。
   * 调用线索：new PioneerPublicApi.Color、super。
   */
  constructor(t, e) {
    super(t, e);
    this._degreesPerLine = 10;
    this._color = new PioneerPublicApi.Color(1, 1, 1, 1);
    this._relativeToEntity = true;
    this._lineMesh = null;
    this._meshDirty = true;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setScale`、`this.__setRadius`、`this.getRadius`、`this.getThreeJsObjects`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setScale、this.__setRadius、this.getRadius、this.getThreeJsObjects。
   */
  setRadius(t) {
    this.__setRadius(t);
    PioneerPublicApi.ThreeJsHelper.setScale(this.getThreeJsObjects(), this.getRadius());
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
   * 【结构证据】返回 `this._degreesPerLine`。
   */
  getDegreesPerLine() {
    return this._degreesPerLine;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_degreesPerLine`、`_meshDirty`。
   * 状态写入：_degreesPerLine、_meshDirty。
   */
  setDegreesPerLine(degreesPerLine) {
    this._degreesPerLine = degreesPerLine;
    this._meshDirty = true;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._relativeToEntity`。
   */
  isRelativeToEntity() {
    return this._relativeToEntity;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_relativeToEntity`；调用 `this.__setUsesEntityOrientation`。
   * 状态写入：_relativeToEntity。
   * 调用线索：this.__setUsesEntityOrientation。
   */
  setRelativeToEntity(relativeToEntity) {
    this._relativeToEntity = relativeToEntity;
    this.__setUsesEntityOrientation(this._relativeToEntity);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setOrientationToEntity`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`this._lineMesh.prepareForRender`、`this._updateMesh`、`this.getEntity`、`this.getThreeJsObjects`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setOrientationToEntity、PioneerPublicApi.ThreeJsHelper.setPositionToEntity、this._lineMesh.prepareForRender、this._updateMesh、this.getEntity等。
   */
  __prepareForRender(t) {
    this._lineMesh && (this._meshDirty && this._updateMesh(), this._relativeToEntity && PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity()), PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects(), this.getEntity(), t), this._lineMesh.prepareForRender(t));
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lineMesh`；调用 `new PioneerPublicApi.LineMesh`、`this._updateMesh`。
   * 状态写入：_lineMesh。
   * 调用线索：new PioneerPublicApi.LineMesh、this._updateMesh。
   */
  async __loadResources() {
    this._lineMesh = new PioneerPublicApi.LineMesh(this);
    this._updateMesh();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lineMesh`；调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`。
   * 状态写入：_lineMesh。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials。
   */
  __unloadResources() {
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._lineMesh = null;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_meshDirty`；返回 `void`；调用 `Math.cos`、`Math.min`、`Math.sin`、`PioneerPublicApi.MathUtils.degToRad`、`PioneerPublicApi.ThreeJsHelper.setOrientation`、`PioneerPublicApi.ThreeJsHelper.setScale`。
   * 状态写入：_meshDirty。
   * 调用线索：Math.cos、Math.min、Math.sin、PioneerPublicApi.MathUtils.degToRad、PioneerPublicApi.ThreeJsHelper.setOrientation等。
   */
  _updateMesh() {
    if (!this._lineMesh) return;
    const t = [];
    for (let e = 0; e < 360; e += this._degreesPerLine) {
      const i = Math.min(e + this._degreesPerLine, 360);
      const n = PioneerPublicApi.MathUtils.degToRad(e);
      const o = PioneerPublicApi.MathUtils.degToRad(i);
      for (let e = -90; e < 90; e += this._degreesPerLine) {
        const i = Math.min(e + this._degreesPerLine, 90);
        const r = PioneerPublicApi.MathUtils.degToRad(e);
        const a = PioneerPublicApi.MathUtils.degToRad(i);
        -90 < e && e < 90 && (t.push(new PioneerPublicApi.Vector3(Math.sin(n) * Math.cos(r), Math.cos(n) * Math.cos(r), Math.sin(r))), t.push(new PioneerPublicApi.Vector3(Math.sin(o) * Math.cos(r), Math.cos(o) * Math.cos(r), Math.sin(r))));
        t.push(new PioneerPublicApi.Vector3(Math.sin(n) * Math.cos(r), Math.cos(n) * Math.cos(r), Math.sin(r)));
        t.push(new PioneerPublicApi.Vector3(Math.sin(n) * Math.cos(a), Math.cos(n) * Math.cos(a), Math.sin(a)));
      }
    }
    const e = [];
    for (let i = 0, s = t.length; i < s; i++) e.push(this._color);
    const i = [];
    for (let e = 0, s = t.length; e < s; e++) i.push(2);
    this._lineMesh.setPositions(t);
    this._lineMesh.setColors(e);
    this._lineMesh.setWidths(i);
    PioneerPublicApi.ThreeJsHelper.setOrientation(this.getThreeJsObjects(), PioneerPublicApi.Quaternion.Identity);
    PioneerPublicApi.ThreeJsHelper.setScale(this.getThreeJsObjects(), this.getRadius());
    this._meshDirty = false;
  }
  _degreesPerLine;
  _color;
  _relativeToEntity;
  _lineMesh;
  _meshDirty;
}
export { SphereGridComponent };
