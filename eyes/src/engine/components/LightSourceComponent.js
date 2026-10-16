/** @eyes-analysis
 * 文件职责：向所属 Scene 注册实体光源，维护颜色/强度等供材质统一采样的参数。
 * 依据：import ../pioneer/public-api.js；LightSourceComponent extends PioneerPublicApi.BaseComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:349430-350459.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：向所属 Scene 注册实体光源，维护颜色/强度等供材质统一采样的参数。
 * 继承：PioneerPublicApi.BaseComponent；导出：LightSourceComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class LightSourceComponent extends PioneerPublicApi.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_absoluteMagnitude`、`_color`；调用 `new PioneerPublicApi.Color`、`super`、`this.__setRadius`。
   * 状态写入：_absoluteMagnitude、_color。
   * 调用线索：new PioneerPublicApi.Color、super、this.__setRadius。
   */
  constructor(t, e) {
    super(t, e);
    this._color = new PioneerPublicApi.Color();
    this._absoluteMagnitude = 1;
    this.__setRadius(Number.POSITIVE_INFINITY);
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
   * 【结构证据】返回 `this._absoluteMagnitude`。
   */
  getAbsoluteMagnitude() {
    return this._absoluteMagnitude;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_absoluteMagnitude`。
   * 状态写入：_absoluteMagnitude。
   */
  setAbsoluteMagnitude(absoluteMagnitude) {
    this._absoluteMagnitude = absoluteMagnitude;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.getClassIndex`、`this.getEntity`、`this.getEntity().getName`、`this.getEntity().getScene`、`this.getEntity().getScene().__addLightSource`。
   * 调用线索：this.getClassIndex、this.getEntity、this.getEntity().getName、this.getEntity().getScene、this.getEntity().getScene().__addLightSource。
   */
  async __loadResources() {
    this.getEntity().getScene().__addLightSource(this.getEntity().getName(), this.getClassIndex());
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.getClassIndex`、`this.getEntity`、`this.getEntity().getName`、`this.getEntity().getScene`、`this.getEntity().getScene().__removeLightSource`。
   * 调用线索：this.getClassIndex、this.getEntity、this.getEntity().getName、this.getEntity().getScene、this.getEntity().getScene().__removeLightSource。
   */
  __unloadResources() {
    this.getEntity().getScene().__removeLightSource(this.getEntity().getName(), this.getClassIndex());
  }
  /** @eyes-analysis
   * 【结构证据】调用 `super.__setClassIndex`、`this.getClassIndex`、`this.getEntity`、`this.getEntity().getName`、`this.getEntity().getScene`、`this.getEntity().getScene().__addLightSource`。
   * 调用线索：super.__setClassIndex、this.getClassIndex、this.getEntity、this.getEntity().getName、this.getEntity().getScene等。
   */
  __setClassIndex(t) {
    "loaded" === this.getLoadState().state && this.getEntity().getScene().__removeLightSource(this.getEntity().getName(), this.getClassIndex());
    super.__setClassIndex(t);
    "loaded" === this.getLoadState().state && this.getEntity().getScene().__addLightSource(this.getEntity().getName(), this.getClassIndex());
  }
  _color;
  _absoluteMagnitude;
}
export { LightSourceComponent };
