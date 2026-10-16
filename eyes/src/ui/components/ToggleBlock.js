// Recovered from app.js:667559-668537.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import ToggleBlockTemplate from "../templates/ToggleBlockTemplate.html";
import "../../styles/extracted/ToggleBlockStyles.js";
var getToggleBlockTemplate = () => ToggleBlockTemplate;
class ToggleBlock extends EyesPublicApi.StoryBaseContentBlock {
  constructor(t, e = {}) {
    super(t, {
      isSelected: false,
      ...e
    });
    this._class.isSelectedClass = {
      true: "selected",
      false: ""
    };
    this._config.info.selected = Boolean(this._config.info.selected);
    Object.assign(this._state, {
      isSelectedClass: this._class.isSelectedClass[this._state.isSelected]
    });
  }
  async onEnter() {
    await super.onEnter();
    this._config.info.selected !== this._state.isSelected && (await this.onClick());
  }
  async onLeave() {
    await super.onLeave();
    this._state.isSelected && (await this.onClick());
  }
  async onClick() {
    await super.onClick();
    this._state.isSelected ? (this.unselect(), console.log("unselect")) : (this.select(), console.log("select"));
  }
  select() {
    this.setState({
      isSelected: true,
      isSelectedClass: this._class.isSelectedClass.true
    });
  }
  unselect() {
    this.setState({
      isSelected: false,
      isSelectedClass: this._class.isSelectedClass.false
    });
  }
}
ToggleBlock.html = getToggleBlockTemplate();
export { ToggleBlock };
