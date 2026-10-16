/** @eyes-analysis
 * 文件职责：将输入点经相机射线投到实体表面并调用拾取回调。
 * 依据：import ../pioneer/public-api.js；PickController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:511102-513193.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：将输入点经相机射线投到实体表面并调用拾取回调。
 * 继承：PioneerPublicApi.BaseController；导出：PickController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class PickController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_callback`、`_pickedEntity`、`_pickedPosition`、`_triggerOnHover`；调用 `new PioneerPublicApi.Vector3`、`super`。
   * 状态写入：_callback、_pickedEntity、_pickedPosition、_triggerOnHover。
   * 调用线索：new PioneerPublicApi.Vector3、super。
   */
  constructor(t, e) {
    super(t, e);
    this._pickedEntity = null;
    this._callback = null;
    this._triggerOnHover = false;
    this._pickedPosition = new PioneerPublicApi.Vector3();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._pickedEntity`。
   */
  getPickedEntity() {
    return this._pickedEntity;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_pickedEntity`。
   * 状态写入：_pickedEntity。
   */
  setPickedEntity(pickedEntity) {
    this._pickedEntity = pickedEntity;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._callback`。
   */
  getCallback() {
    return this._callback;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_callback`。
   * 状态写入：_callback。
   */
  setCallback(callback) {
    this._callback = callback;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._triggerOnHover`。
   */
  getTriggerOnHover() {
    return this._triggerOnHover;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_triggerOnHover`。
   * 状态写入：_triggerOnHover。
   */
  setTriggerOnHover(triggerOnHover) {
    this._triggerOnHover = triggerOnHover;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._pickedPosition`。
   */
  getPickedPosition() {
    return this._pickedPosition;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Number.isNaN`、`PioneerPublicApi.Geometry.getLineSphereIntersectionWithLineStartAtOrigin`、`PioneerPublicApi.Interval.pool.get`、`PioneerPublicApi.Interval.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`。
   * 调用线索：Number.isNaN、PioneerPublicApi.Geometry.getLineSphereIntersectionWithLineStartAtOrigin、PioneerPublicApi.Interval.pool.get、PioneerPublicApi.Interval.pool.release、PioneerPublicApi.Vector3.pool.get等。
   */
  __update() {
    const t = this.getEntity().getScene().getEngine().getInput();
    if ((t.isSelected() || this._triggerOnHover) && null !== this._callback && null !== this._pickedEntity) {
      const e = t.getActiveViewport();
      if (null !== e) {
        const i = e.getCamera();
        if (null !== i && i.getEntity() === this.getEntity()) {
          const n = PioneerPublicApi.Vector3.pool.get();
          e.getNormalSpacePositionFromPixelSpacePosition(n, t.getCursorPosition());
          i.getCameraSpacePositionFromNormalSpacePosition(n, n);
          n.normalize(n);
          const o = PioneerPublicApi.Interval.pool.get();
          const r = this.getEntity().getParent()?.getComponent(PioneerPublicApi.SpheroidComponent);
          if (r) {
            const t = r.getEquatorialRadius() / r.getPolarRadius();
            n.rotateInverse(this._pickedEntity.getOrientation(), n);
            n.z *= t;
            const e = PioneerPublicApi.Vector3.pool.get();
            e.copy(this._pickedEntity.getCameraSpacePosition(i));
            e.rotateInverse(this._pickedEntity.getOrientation(), e);
            e.z *= t;
            PioneerPublicApi.Geometry.getLineSphereIntersectionWithLineStartAtOrigin(o, n, e, r.getEquatorialRadius());
            n.z /= t;
            n.rotate(this._pickedEntity.getOrientation(), n);
            PioneerPublicApi.Vector3.pool.release(e);
          } else {
            const t = this._pickedEntity.getCameraSpacePosition(i);
            PioneerPublicApi.Geometry.getLineSphereIntersectionWithLineStartAtOrigin(o, n, t, this._pickedEntity.getOcclusionRadius());
          }
          Number.isNaN(o.min) || (this._pickedPosition.mult(n, o.min), i.getEntity().getPositionRelativeToEntity(this._pickedPosition, this._pickedPosition, this._pickedEntity), this.getEntity().getScene().getEngine().addCallback(this._callback.bind(void 0, this._pickedPosition), false));
          PioneerPublicApi.Interval.pool.release(o);
          PioneerPublicApi.Vector3.pool.release(n);
        }
      }
    }
  }
  _pickedEntity;
  _callback;
  _triggerOnHover;
  _pickedPosition;
}
export { PickController };
