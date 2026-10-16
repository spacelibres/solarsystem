// Recovered from app.js:665677-666695.
/* 故事配置持有 onEnter/onLeave/func，构造时把钩子适配到应用与当前块实例；模板参数来自 info，按钮组保留独立点击处理而不走通用 func。 */
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import "../../styles/extracted/StoryBaseContentBlockStyles.js";
class StoryBaseContentBlock extends EyesPublicApi.BaseComponent {
  constructor(app, options = {
    config: {
      info: {}
    }
  }) {
    options.isVisible = true;
    super(app, null, options);
    this._config.info.onEnter && (this.onEnter = async () => await this._config.info.onEnter(app, this));
    this._config.info.onLeave && (this.onLeave = async () => await this._config.info.onLeave(app, this));
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
