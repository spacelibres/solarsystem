// Recovered from app.js:651707-653660.
import "../../framework/eyes/public-api.js";
import * as Checkbox from "./Checkbox.js";
import CheckboxMultistateTemplate from "../templates/CheckboxMultistateTemplate.html";
let defaultExport;
var getCheckboxMultistateTemplate = () => CheckboxMultistateTemplate;
/* 多态复选框替换父类的二态点击监听；状态索引循环，显式 requestedStateIndex 优先，class 表与回调收到同一新索引。 */
class CheckboxMultistate extends Checkbox.Checkbox {
  constructor(app, options = {}) {
    super(app, {
      ...options,
      stateIndex: options.stateIndex ?? 0
    });
    this._numStates = 3;
    this._initStates();
    this.bindFunctions(["cycle"]);
  }
  _initStates() {
    Object.assign(this._class, {
      checkbox: Array.from({
        length: this._numStates
      }, (unusedEntry, stateIndex) => 0 === stateIndex ? "" : stateIndex === this._numStates - 1 ? "checked" : `checkbox-state-${stateIndex}`),
      text: Array.from({
        length: this._numStates
      }, (unusedEntry, stateIndex) => 0 === stateIndex || stateIndex === this._numStates - 1 ? "" : `text-state-${stateIndex}`),
      icon: Array.from({
        length: this._numStates
      }, (unusedEntry, stateIndex) => 0 === stateIndex ? "checkbox-hover" : stateIndex === this._numStates - 1 ? "icon-checkmark" : `icon-state-${stateIndex}`)
    });
    this.setState({
      isCheckedClass: this._class.checkbox[this._state.stateIndex],
      textClass: this._class.text[this._state.stateIndex],
      iconCheckmarkClass: this._class.icon[this._state.stateIndex]
    });
  }
  init() {
    super.init();
    this._config.key && this._element.setAttribute("key", this._config.key);
    this._element.removeEventListener("click", this.toggle);
    this._element.addEventListener("click", this.cycle);
  }
  setNumStates(numStates) {
    numStates < 2 ? console.warn("Number of states must be at least 2") : (this._numStates = numStates, this._initStates());
  }
  getCurrentStateIndex() {
    return this._state.stateIndex;
  }
  setClassesForIndex(stateClasses, stateIndex) {
    Object.keys(stateClasses).forEach(classRole => {
      this._class[classRole] || (this._class[classRole] = Array.from({
        length: this._numStates
      }, () => ""));
      this._class[classRole][stateIndex] = stateClasses[classRole];
    });
    this.setState({
      isCheckedClass: this._class.checkbox[this._state.stateIndex],
      textClass: this._class.text[this._state.stateIndex],
      iconCheckmarkClass: this._class.icon[this._state.stateIndex]
    });
  }
  async cycle(clickEvent, skipCallback = false, requestedStateIndex = null) {
    const nextStateIndex = requestedStateIndex ?? (this._state.stateIndex + 1) % this._numStates;
    this.setState({
      stateIndex: nextStateIndex,
      isCheckedClass: this._class.checkbox[nextStateIndex],
      textClass: this._class.text[nextStateIndex],
      iconCheckmarkClass: this._class.icon[nextStateIndex]
    }, async () => {
      skipCallback || "function" != typeof this._config.function || (await this._config.function(clickEvent, nextStateIndex));
    });
  }
}
CheckboxMultistate.html = getCheckboxMultistateTemplate();
defaultExport = CheckboxMultistate;
export { CheckboxMultistate };
export { defaultExport as default };
