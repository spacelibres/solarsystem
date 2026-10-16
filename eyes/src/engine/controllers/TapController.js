/** @eyes-analysis
 * 文件职责：把点击/触摸点转换为点击事件和回调。
 * 依据：import ../pioneer/public-api.js；TapController extends PioneerPublicApi.BaseController @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:527919-528377.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：把点击/触摸点转换为点击事件和回调。
 * 继承：PioneerPublicApi.BaseController；导出：TapController。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TapController extends PioneerPublicApi.BaseController {
  /** @eyes-analysis
   * 【结构证据】写入 `_tapCallback`；调用 `super`。
   * 状态写入：_tapCallback。
   * 调用线索：super。
   */
  constructor(t, e) {
    super(t, e);
    this._tapCallback = null;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._tapCallback`。
   */
  getTapCallback() {
    return this._tapCallback;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_tapCallback`。
   * 状态写入：_tapCallback。
   */
  setTapCallback(tapCallback) {
    this._tapCallback = tapCallback;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.getDraggedOffset`、`t.getDraggedOffset().isZero`、`t.isSelected`、`this._tapCallback`、`this.getEntity`、`this.getEntity().getScene`。
   * 调用线索：t.getDraggedOffset、t.getDraggedOffset().isZero、t.isSelected、this._tapCallback、this.getEntity等。
   */
  __update() {
    const t = this.getEntity().getScene().getEngine().getInput();
    !t.isSelected() && t.getDraggedOffset().isZero() || null !== this._tapCallback && this._tapCallback();
  }
  _tapCallback;
}
export { TapController };
