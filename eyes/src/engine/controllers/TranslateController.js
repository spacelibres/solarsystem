/** @eyes-analysis
 * 文件职责：处理拖动输入并将屏幕/相机空间位移换算到实体位置。
 * 依据：import ../pioneer/public-api.js；TranslateController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:532188-533213.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：处理拖动输入并将屏幕/相机空间位移换算到实体位置。
 * 继承：PioneerPublicApi.BaseController；导出：TranslateController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TranslateController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_relativeToOrientation`、`_translation`；调用 `new PioneerPublicApi.Vector3`、`super`、`this.addModifiedState`。
   * 状态写入：_relativeToOrientation、_translation。
   * 调用线索：new PioneerPublicApi.Vector3、super、this.addModifiedState。
   */
  constructor(t, e) {
    super(t, e);
    this._translation = new PioneerPublicApi.Vector3(0, 0, 0);
    this._relativeToOrientation = false;
    this.addModifiedState("position");
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._translation`。
   */
  getTranslation() {
    return this._translation;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._translation.copy`。
   * 调用线索：this._translation.copy。
   */
  setTranslation(t) {
    this._translation.copy(t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_relativeToOrientation`。
   * 状态写入：_relativeToOrientation。
   */
  setRelativeToOrientation(relativeToOrientation) {
    this._relativeToOrientation = relativeToOrientation;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`i.copy`、`i.rotate`。
   * 调用线索：PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、i.copy等。
   */
  __updatePositionAtTime(t, e) {
    const i = PioneerPublicApi.Vector3.pool.get();
    if (this._relativeToOrientation) {
      const t = PioneerPublicApi.Quaternion.pool.get();
      this.getEntity().getOrientationAtTime(t, e);
      i.rotate(t, this._translation);
      PioneerPublicApi.Quaternion.pool.release(t);
    } else i.copy(this._translation);
    t.add(i, t);
    PioneerPublicApi.Vector3.pool.release(i);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`t.add`、`t.copy`、`t.rotate`、`this.getEntity`。
   * 调用线索：PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、t.add、t.copy、t.rotate等。
   */
  __update() {
    const t = PioneerPublicApi.Vector3.pool.get();
    this._relativeToOrientation ? t.rotate(this.getEntity().getOrientation(), this._translation) : t.copy(this._translation);
    t.add(t, this.getEntity().getPosition());
    this.getEntity().setPosition(t);
    PioneerPublicApi.Vector3.pool.release(t);
  }
  _translation;
  _relativeToOrientation;
}
export { TranslateController };
