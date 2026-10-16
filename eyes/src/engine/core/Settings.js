/** @eyes-analysis
 * 文件职责：组织应用设置项及设置面板行为。
 * 依据：import ../../framework/eyes/index.js；Settings extends Eyes.Settings @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1658608-1659147.
import * as Eyes from "../../framework/eyes/index.js";
/** @eyes-analysis
 * 类职责：组织应用设置项及设置面板行为。
 * 继承：Eyes.Settings；导出：Settings。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Settings extends Eyes.Settings {
  /** @eyes-analysis
   * 【结构证据】调用 `Object.assign`、`super`。
   * 调用线索：Object.assign、super。
   */
  constructor(t, e = {}) {
    super(t, e);
    Object.assign(this._state, {
      paddingBottom: "0px"
    });
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Eyes.AppUtils.isMobile`、`super.init`、`this._app.getComponent`、`this._callbackRegistry.push`、`this.collapse`。
   * 调用线索：Eyes.AppUtils.isMobile、super.init、this._app.getComponent、this._callbackRegistry.push、this.collapse。
   */
  init() {
    super.init();
    this._callbackRegistry.push({
      emitter: this._app.getComponent("collapsibleMenu"),
      event: "expandtoggle",
      callback: t => {
        Eyes.AppUtils.isMobile() && t && this.collapse();
      }
    });
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_element.style.paddingBottom`；调用 `super.collapse`。
   * 状态写入：_element.style.paddingBottom。
   * 调用线索：super.collapse。
   */
  collapse() {
    super.collapse();
    this._element.style.paddingBottom = this._state.paddingBottom;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_element.style.paddingBottom`；调用 `super.expand`。
   * 状态写入：_element.style.paddingBottom。
   * 调用线索：super.expand。
   */
  expand() {
    super.expand();
    this._element.style.paddingBottom = "0px";
  }
}
export { Settings };
