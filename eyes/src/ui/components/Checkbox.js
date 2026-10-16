/** @eyes-analysis
 * 文件职责：复选输入状态与 change 回调
 * 依据：imports: ../../framework/eyes/public-api.js, ../templates/CheckboxMultistateTemplate.html
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:653661-654838.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import CheckboxMultistateTemplate from "../templates/CheckboxMultistateTemplate.html";
let defaultExport;
var getCheckboxMultistateTemplate = () => CheckboxMultistateTemplate;
/** @eyes-analysis
 * 类职责：复选输入状态与 change 回调；继承 EyesPublicApi.BaseComponent
 * 继承：EyesPublicApi.BaseComponent；导出：Checkbox, default。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Checkbox extends EyesPublicApi.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Object.assign, this.bindFunctions。
   * 调用线索：Object.assign、super、this.bindFunctions。
   */
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
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._element.setAttribute, this._element.addEventListener。
   * 调用线索：super.init、this._element.addEventListener、this._element.setAttribute。
   */
  init() {
    super.init();
    this._config.key && this._element.setAttribute("key", this._config.key);
    this._element.addEventListener("click", this.toggle);
  }
  /** @eyes-analysis
   * 执行 toggle 对应的组件业务步骤；调用 this.setState, this._config.function。
   * 调用线索：this._config.function、this.setState。
   */
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
