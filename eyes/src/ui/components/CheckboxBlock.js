// Recovered from app.js:673558-674563.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import CheckboxBlockTemplate from "../templates/CheckboxBlockTemplate.html";
import "../../styles/extracted/CheckboxBlockStyles.js";
var getCheckboxBlockTemplate = () => CheckboxBlockTemplate;
class CheckboxBlock extends EyesPublicApi.StoryBaseContentBlock {
  constructor(t, options = {}) {
    super(t, {
      ...options
    });
    t.pioneer.getScene("main").getLoadedPromise().then(() => (this.setUpHTML(options), true)).catch(t => {
      console.warn(t);
    });
    this.options = options;
  }
  async setUpHTML(t) {
    const {
      checkboxContent: checkboxContent
    } = t.config.info;
    const i = document.getElementsByClassName("checkboxes-block")[0];
    checkboxContent.forEach(t => {
      const {
        id: id,
        label: label,
        onChange: onChange
      } = t;
      const o = document.createElement("label");
      o.classList.add("cb-container");
      o.classList.add("clickable");
      const r = document.createElement("input");
      r.type = "checkbox";
      r.checked = true;
      r.id = `${id}-checkbox`;
      const a = document.createElement("span");
      a.classList.add("checkmark");
      o.appendChild(document.createTextNode(label));
      o.appendChild(r);
      o.appendChild(a);
      i.appendChild(o);
      r.addEventListener("change", t => {
        onChange(t, this._app);
      });
    });
  }
  setChecked(t, e) {
    const i = document.getElementById(`${t}-checkbox`);
    i && (i.checked = e);
  }
}
CheckboxBlock.html = getCheckboxBlockTemplate();
export { CheckboxBlock };
