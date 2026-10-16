// Recovered from app.js:1436029-1438013.
import * as Eyes from "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import "../../styles/extracted/OptionsBlockStyles.js";
class OptionsBlock extends SolarSystemPublicApi.BaseContentBlock {
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
  onRouteChange(t, e = {}) {}
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
  _addDefaultOptions(t, e = null, i = {}) {}
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
