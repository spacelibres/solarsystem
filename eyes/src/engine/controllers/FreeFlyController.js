/** @eyes-analysis
 * 文件职责：将键盘/指针输入转换为自由飞行相机位移、俯仰与偏航。
 * 依据：import ../pioneer/public-api.js；FreeFlyController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:473250-476553.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：将键盘/指针输入转换为自由飞行相机位移、俯仰与偏航。
 * 继承：PioneerPublicApi.BaseController；导出：FreeFlyController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class FreeFlyController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_changeParentToNearestEntity`、`_dragSensitivity`、`_dragSmoothness`、`_forcedMoving`、`_isMoving`、`_moveSmoothedValue`、`_nearestEntity`、`_nearestEntityCheckIndex`；调用 `new PioneerPublicApi.Vector3`、`super`、`this.addDependentState`、`this.addModifiedState`。
   * 状态写入：_changeParentToNearestEntity、_dragSensitivity、_dragSmoothness、_forcedMoving、_isMoving、_moveSmoothedValue、_nearestEntity、_nearestEntityCheckIndex等；完整记录见索引。
   * 调用线索：new PioneerPublicApi.Vector3、super、this.addDependentState、this.addModifiedState。
   */
  constructor(t, e) {
    super(t, e);
    this._dragSensitivity = .05;
    this._dragSmoothness = .8;
    this._moveSmoothedValue = new PioneerPublicApi.Vector3(0, 0, 0);
    this._changeParentToNearestEntity = true;
    this._nearestEntity = null;
    this._nearestEntityDistance = Number.POSITIVE_INFINITY;
    this._nearestEntityCheckIndex = 0;
    this._forcedMoving = new PioneerPublicApi.Vector3();
    this._isMoving = false;
    this.addModifiedState("position");
    this.addDependentState("parent", "orientation");
    this.addDependentState("parent", "ground");
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._dragSensitivity`。
   */
  getDragSensitivity() {
    return this._dragSensitivity;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_dragSensitivity`。
   * 状态写入：_dragSensitivity。
   */
  setDragSensitivity(dragSensitivity) {
    this._dragSensitivity = dragSensitivity;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._dragSmoothness`。
   */
  getDragSmoothness() {
    return this._dragSmoothness;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_dragSmoothness`。
   * 状态写入：_dragSmoothness。
   */
  setDragSmoothness(dragSmoothness) {
    this._dragSmoothness = dragSmoothness;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._changeParentToNearestEntity`。
   */
  getChangeParentToNearestEntity() {
    return this._changeParentToNearestEntity;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_changeParentToNearestEntity`。
   * 状态写入：_changeParentToNearestEntity。
   */
  setChangeParentToNearestEntity(changeParentToNearestEntity) {
    this._changeParentToNearestEntity = changeParentToNearestEntity;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._forcedMoving`。
   */
  getForcedMoving() {
    return this._forcedMoving;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._forcedMoving.copy`。
   * 调用线索：this._forcedMoving.copy。
   */
  setForcedMoving(t) {
    this._forcedMoving.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_isMoving`、`_nearestEntity`、`_nearestEntityCheckIndex`、`_nearestEntityDistance`；返回 `void`；调用 `Math.max`、`Math.min`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`c.rotate`、`l.addMult`。
   * 状态写入：_isMoving、_nearestEntity、_nearestEntityCheckIndex、_nearestEntityDistance。
   * 调用线索：Math.max、Math.min、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、c.rotate等。
   */
  __update() {
    if (null === this.getEntity().getParent()) return;
    this._nearestEntity && (this._nearestEntityDistance = this.getEntity().getDistanceTo(this._nearestEntity, true));
    const t = this.getEntity().getScene();
    const e = t.getNumEntities();
    const i = Math.min(20, e);
    for (let s = 0; s < i; s++) {
      const nearestEntity = t.getEntityAt((this._nearestEntityCheckIndex + s) % e);
      if (nearestEntity === this.getEntity()) continue;
      const nearestEntityDistance = this.getEntity().getDistanceTo(nearestEntity, true);
      nearestEntityDistance >= 0 && this._nearestEntityDistance > nearestEntityDistance && (this._nearestEntityDistance = nearestEntityDistance, this._nearestEntity = nearestEntity);
    }
    this._nearestEntityCheckIndex = (this._nearestEntityCheckIndex + i) % e;
    this._changeParentToNearestEntity && this._nearestEntity && this._nearestEntity !== this.getEntity().getParent() && this.getEntity().setParent(this._nearestEntity);
    this.getEntity().getOrientation().isNaN() && this.getEntity().setOrientation(PioneerPublicApi.Quaternion.Identity);
    this.getEntity().getPosition().isNaN() && this.getEntity().setPosition(new PioneerPublicApi.Vector3(0, -1, 0));
    const n = PioneerPublicApi.Vector3.pool.get();
    n.set(0, 0, 0);
    const o = this.getEntity().getScene().getEngine().getInput();
    const r = o.getActiveViewport();
    if (null !== r) {
      const t = r.getCamera();
      if (null !== t && t.getEntity() === this.getEntity()) {
        let t = 1;
        o.isKeyPressed("x") && (t = .05);
        o.isShiftPressed() && (t = 5);
        const e = o.getZoomedOffset();
        0 !== e && (n.y += -e * this._dragSensitivity * t);
        o.isKeyPressed("w") && (n.y += this._dragSensitivity * t);
        o.isKeyPressed("s") && (n.y -= this._dragSensitivity * t);
        o.isKeyPressed("d") && (n.x += this._dragSensitivity * t);
        o.isKeyPressed("a") && (n.x -= this._dragSensitivity * t);
        o.isKeyPressed("e") && (n.z += this._dragSensitivity * t);
        o.isKeyPressed("q") && (n.z -= this._dragSensitivity * t);
      }
    }
    n.add(n, this._forcedMoving);
    this._isMoving = n.magnitudeSqr() > 0;
    this._moveSmoothedValue.lerp(n, this._moveSmoothedValue, this._dragSmoothness);
    !this._isMoving && this._moveSmoothedValue.magnitudeSqr() < 1e-7 && this._moveSmoothedValue.set(0, 0, 0);
    PioneerPublicApi.Vector3.pool.release(n);
    const a = this.getEntity().getPosition();
    const l = PioneerPublicApi.Vector3.pool.get();
    const c = PioneerPublicApi.Vector3.pool.get();
    c.rotate(this.getEntity().getOrientation(), this._moveSmoothedValue);
    l.addMult(a, c, Math.max(1e-4, this._nearestEntityDistance));
    this.getEntity().setPosition(l);
    PioneerPublicApi.Vector3.pool.release(c);
    PioneerPublicApi.Vector3.pool.release(l);
  }
  _dragSensitivity;
  _dragSmoothness;
  _moveSmoothedValue;
  _changeParentToNearestEntity;
  _nearestEntity;
  _nearestEntityDistance;
  _nearestEntityCheckIndex;
  _forcedMoving;
  _isMoving;
}
export { FreeFlyController };
