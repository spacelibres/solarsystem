/** @eyes-analysis
 * 文件职责：对相机射线命中实体进行筛选并触发选择回调。
 * 依据：import ../pioneer/public-api.js；SelectController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:521462-522775.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：对相机射线命中实体进行筛选并触发选择回调。
 * 继承：PioneerPublicApi.BaseController；导出：SelectController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class SelectController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_callback`；调用 `super`。
   * 状态写入：_callback。
   * 调用线索：super。
   */
  constructor(t, e) {
    super(t, e);
    this._callback = null;
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
   * 【结构证据】调用 `PioneerPublicApi.Vector2.pool.get`、`PioneerPublicApi.Vector2.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`a.set`、`e.getCamera`。
   * 调用线索：PioneerPublicApi.Vector2.pool.get、PioneerPublicApi.Vector2.pool.release、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、a.set等。
   */
  __update() {
    const t = this.getEntity().getScene().getEngine().getInput();
    if (t.isSelected() && null !== this._callback) {
      const e = t.getActiveViewport();
      if (null !== e) {
        const i = e.getCamera();
        if (null !== i && i.getEntity() === this.getEntity()) {
          const n = PioneerPublicApi.Vector3.pool.get();
          e.getNormalSpacePositionFromPixelSpacePosition(n, t.getSelectedPosition());
          let o = null;
          let r = 0;
          const a = PioneerPublicApi.Vector2.pool.get();
          a.set(n.x, n.y);
          const l = this.getEntity().getScene().getNumEntities();
          for (let t = 0; t < l; t++) {
            const e = this.getEntity().getScene().getEntityAt(t);
            if (e.isEnabled()) {
              const t = e.getComponent(PioneerPublicApi.LabelComponent);
              if (null !== t && "loaded" === t.getLoadState().state) {
                const s = t.getNormalSpaceBounds(i);
                if (void 0 !== s && s.contains(a)) {
                  const t = e.getCameraSpacePosition(i).magnitude();
                  (null === o || r > t) && (o = e, r = t);
                }
              }
            }
          }
          PioneerPublicApi.Vector2.pool.release(a);
          null === o && (i.getCameraSpacePositionFromNormalSpacePosition(n, n), n.mult(n, 1 / n.magnitude()), o = i.getNearestIntersectingEntity(n));
          PioneerPublicApi.Vector3.pool.release(n);
          this.getEntity().getScene().getEngine().addCallback(this._callback.bind(void 0, o), false);
        }
      }
    }
  }
  _callback;
}
export { SelectController };
