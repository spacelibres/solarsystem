/** @eyes-analysis
 * 文件职责：扩展复选框以表示多个状态
 * 依据：imports: ../../framework/eyes/public-api.js, ./Checkbox.js, ../templates/CheckboxMultistateTemplate.html
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:651707-653660.
import "../../framework/eyes/public-api.js";
import * as Checkbox from "./Checkbox.js";
import CheckboxMultistateTemplate from "../templates/CheckboxMultistateTemplate.html";
let defaultExport;
var getCheckboxMultistateTemplate = () => CheckboxMultistateTemplate;
/** @eyes-analysis
 * 类职责：扩展复选框以表示多个状态；继承 Checkbox.Checkbox
 * 继承：Checkbox.Checkbox；导出：CheckboxMultistate, default。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class CheckboxMultistate extends Checkbox.Checkbox {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this._initStates, this.bindFunctions；写入 _numStates。
   * 状态写入：_numStates。
   * 调用线索：super、this._initStates、this.bindFunctions。
   */
  constructor(t, e = {}) {
    super(t, {
      ...e,
      stateIndex: e.stateIndex ?? 0
    });
    this._numStates = 3;
    this._initStates();
    this.bindFunctions(["cycle"]);
  }
  /** @eyes-analysis
   * 执行 _initStates 对应的组件业务步骤；调用 Object.assign, Array.from, this.setState。
   * 调用线索：Array.from、Object.assign、this.setState。
   */
  _initStates() {
    Object.assign(this._class, {
      checkbox: Array.from({
        length: this._numStates
      }, (t, e) => 0 === e ? "" : e === this._numStates - 1 ? "checked" : `checkbox-state-${e}`),
      text: Array.from({
        length: this._numStates
      }, (t, e) => 0 === e || e === this._numStates - 1 ? "" : `text-state-${e}`),
      icon: Array.from({
        length: this._numStates
      }, (t, e) => 0 === e ? "checkbox-hover" : e === this._numStates - 1 ? "icon-checkmark" : `icon-state-${e}`)
    });
    this.setState({
      isCheckedClass: this._class.checkbox[this._state.stateIndex],
      textClass: this._class.text[this._state.stateIndex],
      iconCheckmarkClass: this._class.icon[this._state.stateIndex]
    });
  }
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._element.setAttribute, this._element.removeEventListener, this._element.addEventListener。
   * 调用线索：super.init、this._element.addEventListener、this._element.removeEventListener、this._element.setAttribute。
   */
  init() {
    super.init();
    this._config.key && this._element.setAttribute("key", this._config.key);
    this._element.removeEventListener("click", this.toggle);
    this._element.addEventListener("click", this.cycle);
  }
  /** @eyes-analysis
   * 执行 setNumStates 对应的组件业务步骤；调用 this._initStates；写入 _numStates。
   * 状态写入：_numStates。
   * 调用线索：console.warn、this._initStates。
   */
  setNumStates(numStates) {
    numStates < 2 ? console.warn("Number of states must be at least 2") : (this._numStates = numStates, this._initStates());
  }
  /** @eyes-analysis
   * 执行 getCurrentStateIndex 对应的组件业务步骤。
   */
  getCurrentStateIndex() {
    return this._state.stateIndex;
  }
  /** @eyes-analysis
   * 执行 setClassesForIndex 对应的组件业务步骤；调用 Object.keys, Array.from, this.setState。
   * 状态写入：_class[i]、_class[i][e]。
   * 调用线索：Array.from、Object.keys、Object.keys(t).forEach、this.setState。
   */
  setClassesForIndex(t, e) {
    Object.keys(t).forEach(i => {
      this._class[i] || (this._class[i] = Array.from({
        length: this._numStates
      }, () => ""));
      this._class[i][e] = t[i];
    });
    this.setState({
      isCheckedClass: this._class.checkbox[this._state.stateIndex],
      textClass: this._class.text[this._state.stateIndex],
      iconCheckmarkClass: this._class.icon[this._state.stateIndex]
    });
  }
  /** @eyes-analysis
   * 执行 cycle 对应的组件业务步骤；调用 this.setState, this._config.function。
   * 调用线索：this._config.function、this.setState。
   */
  async cycle(t, e = false, i = null) {
    const s = i ?? (this._state.stateIndex + 1) % this._numStates;
    this.setState({
      stateIndex: s,
      isCheckedClass: this._class.checkbox[s],
      textClass: this._class.text[s],
      iconCheckmarkClass: this._class.icon[s]
    }, async () => {
      e || "function" != typeof this._config.function || (await this._config.function(t, s));
    });
  }
}
CheckboxMultistate.html = getCheckboxMultistateTemplate();
defaultExport = CheckboxMultistate;
export { CheckboxMultistate };
export { defaultExport as default };
