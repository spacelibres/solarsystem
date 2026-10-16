/** @eyes-analysis
 * 文件职责：建立内容面板的选项块并绑定用户操作。
 * 依据：import ../../framework/eyes/index.js；import ../../app/public-api.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1436029-1438013.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import "../../styles/extracted/OptionsBlockStyles.js";
/** @eyes-analysis
 * 类职责：建立内容面板的选项块并绑定用户操作。
 * 继承：SolarSystemPublicApi.BaseContentBlock；导出：OptionsBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class OptionsBlock extends SolarSystemPublicApi.BaseContentBlock {
  /** @eyes-analysis
   * 【结构证据】写入 `_previousChildEntity`、`_previousEntity`、`_state`；调用 `Object.assign`、`super`。
   * 状态写入：_previousChildEntity、_previousEntity、_state。
   * 调用线索：Object.assign、super。
   */
  constructor(t, e = {}) {
    super(t, null, {
      isVisible: true,
      title: "",
      subtitle: "",
      ...e
    });
    this._state = {
      ...this._state,
      isVisibleClass: this._class.isVisible[this._state.isVisible]
    };
    Object.assign(this._class, {
      isVisible: {
        true: "",
        false: "hidden"
      }
    });
    this._previousEntity = null;
    this._previousChildEntity = void 0;
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  onRouteChange(t, e = {}) {}
  /** @eyes-analysis
   * 【结构证据】返回 `checkbox`；调用 `checkbox.init`、`new Eyes.Checkbox`、`t.text`。
   * 调用线索：checkbox.init、new Eyes.Checkbox、t.text。
   */
  _createCheckbox(t, e) {
    const checkbox = new Eyes.Checkbox(this._app, {
      config: {
        key: t.id,
        function: t.function
      },
      isChecked: e,
      text: t.text()
    });
    checkbox.init();
    return checkbox;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `checkboxMultistate`；调用 `checkboxMultistate.init`、`checkboxMultistate.setNumStates`、`new Eyes.CheckboxMultistate`、`t.text`。
   * 调用线索：checkboxMultistate.init、checkboxMultistate.setNumStates、new Eyes.CheckboxMultistate、t.text。
   */
  _createMultistateCheckbox(t, e, i) {
    const checkboxMultistate = new Eyes.CheckboxMultistate(this._app, {
      config: {
        key: t.id,
        function: t.function
      },
      stateIndex: i,
      text: t.text()
    });
    checkboxMultistate.init();
    checkboxMultistate.setNumStates(e);
    return checkboxMultistate;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `s`；调用 `document.createElement`、`o.setAttribute`、`s.appendChild`。
   * 调用线索：document.createElement、o.setAttribute、s.appendChild。
   */
  _createRadioButton(t) {
    const {
      id: id,
      title: title
    } = t;
    const s = document.createElement("li");
    s.className = "option radio-option clickable";
    const n = `${id}-radio-button`;
    const o = document.createElement("label");
    o.innerText = title;
    o.className = "layer-name";
    o.setAttribute("for", n);
    const r = document.createElement("input");
    r.id = n;
    r.className = "radio-button clickable";
    r.type = "radio";
    r.name = "radio-layers";
    s.appendChild(r);
    s.appendChild(o);
    const a = document.createElement("span");
    a.className = "radio-icon";
    s.appendChild(a);
    return s;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `{container:i,input:o}`；调用 `document.createElement`、`i.appendChild`、`n.classList.add`、`o.classList.add`、`r.classList.add`、`s.appendChild`。
   * 调用线索：document.createElement、i.appendChild、n.classList.add、o.classList.add、r.classList.add等。
   */
  _createToggle(t, e) {
    const i = document.createElement("li");
    i.id = `${t}-container`;
    const s = document.createElement("label");
    s.classList.add("toggle");
    s.id = `${t}-toggle-label-el`;
    i.appendChild(s);
    const n = document.createElement("span");
    n.classList.add("toggle-label");
    n.innerHTML = e;
    i.appendChild(n);
    const o = document.createElement("input");
    o.id = t;
    o.type = "checkbox";
    o.classList.add("checkbox-input");
    s.appendChild(o);
    const r = document.createElement("span");
    r.classList.add("slider");
    s.appendChild(r);
    return {
      container: i,
      input: o
    };
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  _addDefaultOptions(t, e = null, i = {}) {}
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  reset() {}
  /** @eyes-analysis
   * 【结构证据】写入 `_previousChildEntity`、`_previousEntity`；调用 `super.__disable`、`this.setState`。
   * 状态写入：_previousChildEntity、_previousEntity。
   * 调用线索：super.__disable、this.setState。
   */
  __disable() {
    this._previousEntity = null;
    this._previousChildEntity = null;
    this.setState({
      entityName: null,
      childEntityId: null
    });
    super.__disable();
  }
}
export { OptionsBlock };
