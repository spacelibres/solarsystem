// Recovered from app.js:665677-666695.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import "../../styles/extracted/StoryBaseContentBlockStyles.js";
class StoryBaseContentBlock extends EyesPublicApi.BaseComponent {
  constructor(t, e = {
    config: {
      info: {}
    }
  }) {
    e.isVisible = true;
    super(t, null, e);
    this._config.info.onEnter && (this.onEnter = async () => await this._config.info.onEnter(t, this));
    this._config.info.onLeave && (this.onLeave = async () => await this._config.info.onLeave(t, this));
    this.bindFunctions(["onEnter", "onLeave", "onClick"]);
  }
  init() {
    super.init(this._config.info);
    this._element.classList.add("content-block", "{{isVisibleClass}}");
    Array.isArray(this._config.info.classList) && this._element.classList.add(...this._config.info.classList);
    this._setVariables(this._element, false);
    (this._config.info.clickable || this._config.info.func) && (this._element.classList.add("clickable"), this._element.addEventListener("click", this.onClick));
  }
  async onEnter() {}
  async onLeave() {}
  async onClick() {
    const {
      type: type
    } = this._config.info;
    "buttons" !== type && (await this._config.info.func(this._app, this));
  }
}
export { StoryBaseContentBlock };
