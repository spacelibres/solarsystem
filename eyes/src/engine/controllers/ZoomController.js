/** @eyes-analysis
 * 文件职责：按滚轮/触摸缩放输入更新观察距离，并执行距离限制。
 * 依据：import ../pioneer/public-api.js；ZoomController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:533214-535371.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：按滚轮/触摸缩放输入更新观察距离，并执行距离限制。
 * 继承：PioneerPublicApi.BaseController；导出：ZoomController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ZoomController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_distanceClamp`、`_zoomSensitivity`、`_zoomSmoothedValue`、`_zoomSmoothness`；调用 `new PioneerPublicApi.Interval`、`super`、`this.addModifiedState`。
   * 状态写入：_distanceClamp、_zoomSensitivity、_zoomSmoothedValue、_zoomSmoothness。
   * 调用线索：new PioneerPublicApi.Interval、super、this.addModifiedState。
   */
  constructor(t, e) {
    super(t, e);
    this._zoomSensitivity = .05;
    this._zoomSmoothness = .8;
    this._zoomSmoothedValue = 1;
    this._distanceClamp = new PioneerPublicApi.Interval(.001, Number.POSITIVE_INFINITY);
    this.addModifiedState("position");
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._zoomSensitivity`。
   */
  getZoomSensitivity() {
    return this._zoomSensitivity;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_zoomSensitivity`。
   * 状态写入：_zoomSensitivity。
   */
  setZoomSensitivity(zoomSensitivity) {
    this._zoomSensitivity = zoomSensitivity;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._zoomSmoothness`。
   */
  getZoomSmoothness() {
    return this._zoomSmoothness;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_zoomSmoothness`。
   * 状态写入：_zoomSmoothness。
   */
  setZoomSmoothness(zoomSmoothness) {
    this._zoomSmoothness = zoomSmoothness;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._distanceClamp`。
   */
  getDistanceClamp() {
    return this._distanceClamp;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._distanceClamp.copy`。
   * 调用线索：this._distanceClamp.copy。
   */
  setDistanceClamp(t) {
    this._distanceClamp.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_zoomSmoothedValue`；返回 `void`；调用 `Math.abs`、`Math.max`、`Number.isNaN`、`PioneerPublicApi.MathUtils.clamp`、`PioneerPublicApi.MathUtils.lerp`、`PioneerPublicApi.Vector3.pool.get`。
   * 状态写入：_zoomSmoothedValue。
   * 调用线索：Math.abs、Math.max、Number.isNaN、PioneerPublicApi.MathUtils.clamp、PioneerPublicApi.MathUtils.lerp等。
   */
  __update() {
    const t = this.getEntity().getParent();
    if (!t) return;
    const e = this.getEntity().getScene().getEngine().getInput();
    let i = 1;
    const n = e.getActiveViewport();
    if (null !== n) {
      const t = n.getCamera();
      if (null !== t && t.getEntity() === this.getEntity()) {
        let t = 1;
        e.isKeyPressed("x") && (t = .05);
        e.isShiftPressed() && (t = 5);
        const s = e.getZoomedOffset();
        0 !== s && (i *= 2 ** (s * this._zoomSensitivity * t));
        e.isKeyPressed("w") && (i /= 2 ** (this._zoomSensitivity * t));
        e.isKeyPressed("s") && (i *= 2 ** (this._zoomSensitivity * t));
      }
    }
    this._zoomSmoothedValue = PioneerPublicApi.MathUtils.clamp(PioneerPublicApi.MathUtils.lerp(i, this._zoomSmoothedValue, this._zoomSmoothness), .8, 1.25);
    Math.abs(1 - this._zoomSmoothedValue) < 1e-7 && (this._zoomSmoothedValue = 1);
    const o = PioneerPublicApi.Vector3.pool.get();
    o.rotateInverse(t.getOrientation(), this.getEntity().getPosition());
    let r = 0;
    const a = t.getGroundComponent();
    if (a) {
      const t = PioneerPublicApi.Vector3.pool.get();
      a.getGroundPosition(t, void 0, o);
      r = t.magnitude();
      PioneerPublicApi.Vector3.pool.release(t);
    }
    let l = Math.max(o.magnitude() - r, 0);
    Number.isNaN(l) && (l = 1);
    l *= this._zoomSmoothedValue;
    (0 === l || 0 === o.magnitude()) && this._zoomSmoothedValue > 1 && (0 === o.magnitude() && (this.getEntity().getOrientation().getAxis(o, 1), o.neg(o), o.rotateInverse(t.getOrientation(), o)), l = 1e-5);
    l < this._distanceClamp.min && (l = this._distanceClamp.min, this._zoomSmoothedValue = 1);
    l > this._distanceClamp.max && (l = this._distanceClamp.max, this._zoomSmoothedValue = 1);
    o.setMagnitude(o, r + l);
    o.rotate(t.getOrientation(), o);
    this.getEntity().setPosition(o);
    PioneerPublicApi.Vector3.pool.release(o);
  }
  _zoomSensitivity;
  _zoomSmoothness;
  _zoomSmoothedValue;
  _distanceClamp;
}
export { ZoomController };
