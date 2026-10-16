// Recovered from app.js:1436029-1438013.
/* 选项工厂创建复选框、三态复选框与原生 radio/toggle DOM；选项业务函数保存在配置中。停用清空前后目标引用与模板目标名，具体选项集合由派生块决定。 */
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import "../../styles/extracted/OptionsBlockStyles.js";
class OptionsBlock extends SolarSystemPublicApi.BaseContentBlock {
  constructor(app, options = {}) {
    super(app, null, {
      isVisible: true,
      title: "",
      subtitle: "",
      ...options
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
  onRouteChange(entityInfo, routeOptions = {}) {}
  _createCheckbox(optionInfo, isChecked) {
    const checkbox = new Eyes.Checkbox(this._app, {
      config: {
        key: optionInfo.id,
        function: optionInfo.function
      },
      isChecked: isChecked,
      text: optionInfo.text()
    });
    checkbox.init();
    return checkbox;
  }
  _createMultistateCheckbox(optionInfo, stateCount, stateIndex) {
    const checkboxMultistate = new Eyes.CheckboxMultistate(this._app, {
      config: {
        key: optionInfo.id,
        function: optionInfo.function
      },
      stateIndex: stateIndex,
      text: optionInfo.text()
    });
    checkboxMultistate.init();
    checkboxMultistate.setNumStates(stateCount);
    return checkboxMultistate;
  }
  _createRadioButton(optionInfo) {
    const {
      id: id,
      title: title
    } = optionInfo;
    const listItem = document.createElement("li");
    listItem.className = "option radio-option clickable";
    const radioId = `${id}-radio-button`;
    const labelElement = document.createElement("label");
    labelElement.innerText = title;
    labelElement.className = "layer-name";
    labelElement.setAttribute("for", radioId);
    const radioInput = document.createElement("input");
    radioInput.id = radioId;
    radioInput.className = "radio-button clickable";
    radioInput.type = "radio";
    radioInput.name = "radio-layers";
    listItem.appendChild(radioInput);
    listItem.appendChild(labelElement);
    const radioIcon = document.createElement("span");
    radioIcon.className = "radio-icon";
    listItem.appendChild(radioIcon);
    return listItem;
  }
  _createToggle(optionId, optionText) {
    const listItem = document.createElement("li");
    listItem.id = `${optionId}-container`;
    const toggleLabel = document.createElement("label");
    toggleLabel.classList.add("toggle");
    toggleLabel.id = `${optionId}-toggle-label-el`;
    listItem.appendChild(toggleLabel);
    const textElement = document.createElement("span");
    textElement.classList.add("toggle-label");
    textElement.innerHTML = optionText;
    listItem.appendChild(textElement);
    const checkboxInput = document.createElement("input");
    checkboxInput.id = optionId;
    checkboxInput.type = "checkbox";
    checkboxInput.classList.add("checkbox-input");
    toggleLabel.appendChild(checkboxInput);
    const sliderElement = document.createElement("span");
    sliderElement.classList.add("slider");
    toggleLabel.appendChild(sliderElement);
    return {
      container: listItem,
      input: checkboxInput
    };
  }
  _addDefaultOptions(entityInfo, allowedOptions = null, childEntityInfo = {}) {}
  reset() {}
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
