// Recovered from app.js:651707-653660.
import "../../framework/eyes/public-api.js";
import * as Checkbox from "./Checkbox.js";
import CheckboxMultistateTemplate from "../templates/CheckboxMultistateTemplate.html";
let defaultExport;
var getCheckboxMultistateTemplate = () => CheckboxMultistateTemplate;
class CheckboxMultistate extends Checkbox.Checkbox {
  constructor(t, e = {}) {
    super(t, {
      ...e,
      stateIndex: e.stateIndex ?? 0
    });
    this._numStates = 3;
    this._initStates();
    this.bindFunctions(["cycle"]);
  }
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
