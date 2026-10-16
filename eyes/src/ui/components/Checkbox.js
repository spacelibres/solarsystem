// Recovered from app.js:653661-654838.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import CheckboxMultistateTemplate from "../templates/CheckboxMultistateTemplate.html";
let defaultExport;
var getCheckboxMultistateTemplate = () => CheckboxMultistateTemplate;
class Checkbox extends EyesPublicApi.BaseComponent {
  constructor(t, e = {}) {
    super(t, null, {
      config: {
        key: "",
        colorClass: "",
        function: null
      },
      isChecked: false,
      text: "",
      checkboxClass: "",
      textClass: "",
      ...e
    });
    Object.assign(this._class, {
      checkbox: {
        true: "checked",
        false: ""
      },
      color: {
        true: this._config.colorClass,
        false: ""
      },
      checkmark: {
        true: "icon-checkmark",
        false: "checkbox-hover"
      }
    });
    Object.assign(this._state, {
      isCheckedClass: this._class.checkbox[this._state.isChecked],
      colorClass: this._class.color[this._state.isChecked],
      iconCheckmarkClass: this._class.checkmark[this._state.isChecked]
    });
    this.bindFunctions(["toggle"]);
  }
  init() {
    super.init();
    this._config.key && this._element.setAttribute("key", this._config.key);
    this._element.addEventListener("click", this.toggle);
  }
  async toggle(t, e = false) {
    if (!t) return;
    const i = !this._state.isChecked;
    const s = this._class.checkbox[i];
    const n = this._class.color[i];
    const o = this._class.checkmark[i];
    this.setState({
      isChecked: i,
      isCheckedClass: s,
      colorClass: n,
      iconCheckmarkClass: o
    }, async () => {
      !e && this._config.function instanceof Function && (await this._config.function(t));
    });
  }
}
Checkbox.html = getCheckboxMultistateTemplate();
defaultExport = Checkbox;
export { Checkbox };
export { defaultExport as default };
