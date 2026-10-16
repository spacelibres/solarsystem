/** @eyes-analysis
 * 文件职责：以 Three.js 网格/线绘制实体坐标辅助标记。
 * 依据：import ../pioneer/public-api.js；GizmoComponent extends PioneerPublicApi.BaseComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:333520-336278.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：以 Three.js 网格/线绘制实体坐标辅助标记。
 * 继承：PioneerPublicApi.BaseComponent；导出：GizmoComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class GizmoComponent extends PioneerPublicApi.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_joint`、`_jointObject`、`_lineMesh`、`_model`、`_relativeToEntity`、`_size`；调用 `e.getExtentsRadius`、`super`、`this.__setRadius`、`this.__setUsesEntityOrientation`。
   * 状态写入：_joint、_jointObject、_lineMesh、_model、_relativeToEntity、_size。
   * 调用线索：e.getExtentsRadius、super、this.__setRadius、this.__setUsesEntityOrientation。
   */
  constructor(t, e) {
    super(t, e);
    this._size = void 0;
    this._relativeToEntity = true;
    this._joint = "";
    this._jointObject = null;
    this._model = null;
    this._lineMesh = null;
    this.__setRadius(2 * e.getExtentsRadius());
    this.__setUsesEntityOrientation(this._relativeToEntity);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void 0!==this._size?this._size:Math.max(1e-4,2*this.getEntity().getExtentsRadius())`；调用 `Math.max`、`this.getEntity`、`this.getEntity().getExtentsRadius`。
   * 调用线索：Math.max、this.getEntity、this.getEntity().getExtentsRadius。
   */
  getSize() {
    return void 0 !== this._size ? this._size : Math.max(1e-4, 2 * this.getEntity().getExtentsRadius());
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_size`；调用 `this.__setRadius`、`this.getSize`。
   * 状态写入：_size。
   * 调用线索：this.__setRadius、this.getSize。
   */
  setSize(size) {
    this._size = size;
    this.__setRadius(this.getSize());
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
   * 【结构证据】写入 `_joint`、`_model`；调用 `this.getEntity`、`this.getEntity().getComponent`。
   * 状态写入：_joint、_model。
   * 调用线索：this.getEntity、this.getEntity().getComponent。
   */
  setJoint(joint, model) {
    if (this._joint = joint, model) this._model = model;else {
      const t = this.getEntity().getComponent(PioneerPublicApi.ModelComponent);
      null !== t && (this._model = t);
    }
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_jointObject`；返回 `void`；调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.ThreeJsHelper.setOrientation`、`PioneerPublicApi.ThreeJsHelper.setOrientationToEntity`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`PioneerPublicApi.ThreeJsHelper.setScale`。
   * 状态写入：_jointObject。
   * 调用线索：PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、PioneerPublicApi.ThreeJsHelper.setOrientation、PioneerPublicApi.ThreeJsHelper.setOrientationToEntity、PioneerPublicApi.ThreeJsHelper.setPositionToEntity等。
   */
  __prepareForRender(t) {
    if (this._lineMesh) {
      if ("" !== this._joint) {
        if (!this._model) return;
        if (null !== this._jointObject && this._jointObject.name === this._joint || (this._jointObject = this._model.getThreeJsObjectByName(this._joint)), !this._jointObject) return;
        const e = PioneerPublicApi.Vector3.pool.get();
        const i = PioneerPublicApi.Quaternion.pool.get();
        this._model.getThreeJsPositionInObject(e, this._jointObject);
        this._model.getThreeJsOrientationInObject(i, this._jointObject);
        e.scale(e, this._model.getScale());
        e.rotate(this._model.getRotation(), e);
        e.add(this._model.getTranslation(), e);
        i.mult(this._model.getRotation(), i);
        PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), t, e, true);
        PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity(), i);
        PioneerPublicApi.Vector3.pool.release(e);
        PioneerPublicApi.Quaternion.pool.release(i);
      } else {
        this._relativeToEntity ? PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity()) : PioneerPublicApi.ThreeJsHelper.setOrientation(this.getThreeJsObjects()[0], PioneerPublicApi.Quaternion.Identity);
        PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), t);
      }
      PioneerPublicApi.ThreeJsHelper.setScale(this.getThreeJsObjects()[0], this.getSize());
      this._lineMesh.prepareForRender(t);
    }
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_lineMesh`；调用 `e.push`、`i.push`、`new PioneerPublicApi.Color`、`new PioneerPublicApi.LineMesh`、`new PioneerPublicApi.Vector3`、`t.push`。
   * 状态写入：_lineMesh。
   * 调用线索：e.push、i.push、new PioneerPublicApi.Color、new PioneerPublicApi.LineMesh、new PioneerPublicApi.Vector3等。
   */
  async __loadResources() {
    this._lineMesh = new PioneerPublicApi.LineMesh(this);
    const t = [];
    t.push(new PioneerPublicApi.Vector3(0, 0, 0));
    t.push(new PioneerPublicApi.Vector3(1, 0, 0));
    t.push(new PioneerPublicApi.Vector3(0, 0, 0));
    t.push(new PioneerPublicApi.Vector3(0, 1, 0));
    t.push(new PioneerPublicApi.Vector3(0, 0, 0));
    t.push(new PioneerPublicApi.Vector3(0, 0, 1));
    this._lineMesh.setPositions(t);
    const e = [];
    e.push(new PioneerPublicApi.Color(1, 0, 0));
    e.push(new PioneerPublicApi.Color(1, 0, 0));
    e.push(new PioneerPublicApi.Color(0, 1, 0));
    e.push(new PioneerPublicApi.Color(0, 1, 0));
    e.push(new PioneerPublicApi.Color(0, 0, 1));
    e.push(new PioneerPublicApi.Color(0, 0, 1));
    this._lineMesh.setColors(e);
    const i = [];
    i.push(2);
    i.push(2);
    i.push(2);
    i.push(2);
    i.push(2);
    i.push(2);
    this._lineMesh.setWidths(i);
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
  _size;
  _relativeToEntity;
  _joint;
  _jointObject;
  _model;
  _lineMesh;
}
export { GizmoComponent };
