// Recovered from app.js:653661-654838.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import CheckboxMultistateTemplate from "../templates/CheckboxMultistateTemplate.html";
let defaultExport;
var getCheckboxMultistateTemplate = () => CheckboxMultistateTemplate;
/* 勾选状态与三个模板 class 同步更新；skipCallback 用于程序化同步显示而不重复执行外部业务动作。 */
class Checkbox extends EyesPublicApi.BaseComponent {
  constructor(app, options = {}) {
    super(app, null, {
      config: {
        key: "",
        colorClass: "",
        function: null
      },
      isChecked: false,
      text: "",
      checkboxClass: "",
      textClass: "",
      ...options
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
  async toggle(clickEvent, skipCallback = false) {
    if (!clickEvent) return;
    const isChecked = !this._state.isChecked;
    const checkedClass = this._class.checkbox[isChecked];
    const colorClass = this._class.color[isChecked];
    const checkmarkClass = this._class.checkmark[isChecked];
    this.setState({
      isChecked: isChecked,
      isCheckedClass: checkedClass,
      colorClass: colorClass,
      iconCheckmarkClass: checkmarkClass
    }, async () => {
      !skipCallback && this._config.function instanceof Function && (await this._config.function(clickEvent));
    });
  }
}
Checkbox.html = getCheckboxMultistateTemplate();
defaultExport = Checkbox;
export { Checkbox };
export { defaultExport as default };
