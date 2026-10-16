// Recovered from app.js:673558-674563.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import CheckboxBlockTemplate from "../templates/CheckboxBlockTemplate.html";
import "../../styles/extracted/CheckboxBlockStyles.js";
var getCheckboxBlockTemplate = () => CheckboxBlockTemplate;
/* 故事提供 checkboxContent 和 onChange；此块只拥有生成的 label/input 节点，变更事件连同应用实例转交配置回调。 */
class CheckboxBlock extends EyesPublicApi.StoryBaseContentBlock {
  constructor(app, options = {}) {
    super(app, {
      ...options
    });
    app.pioneer.getScene("main").getLoadedPromise().then(() => (this.setUpHTML(options), true)).catch(loadError => {
      console.warn(loadError);
    });
    this.options = options;
  }
  async setUpHTML(options) {
    const {
      checkboxContent: checkboxContent
    } = options.config.info;
    const blockElement = document.getElementsByClassName("checkboxes-block")[0];
    checkboxContent.forEach(checkboxInfo => {
      const {
        id: id,
        label: label,
        onChange: onChange
      } = checkboxInfo;
      const labelElement = document.createElement("label");
      labelElement.classList.add("cb-container");
      labelElement.classList.add("clickable");
      const checkboxInput = document.createElement("input");
      checkboxInput.type = "checkbox";
      checkboxInput.checked = true;
      checkboxInput.id = `${id}-checkbox`;
      const checkmarkElement = document.createElement("span");
      checkmarkElement.classList.add("checkmark");
      labelElement.appendChild(document.createTextNode(label));
      labelElement.appendChild(checkboxInput);
      labelElement.appendChild(checkmarkElement);
      blockElement.appendChild(labelElement);
      checkboxInput.addEventListener("change", changeEvent => {
        onChange(changeEvent, this._app);
      });
    });
  }
  setChecked(checkboxId, isChecked) {
    const checkboxInput = document.getElementById(`${checkboxId}-checkbox`);
    checkboxInput && (checkboxInput.checked = isChecked);
  }
}
CheckboxBlock.html = getCheckboxBlockTemplate();
export { CheckboxBlock };
