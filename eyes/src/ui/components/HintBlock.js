// Recovered from app.js:666733-667255.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import HintBlockTemplate from "../templates/HintBlockTemplate.html";
import "../../styles/extracted/HintBlockStyles.js";
var getHintBlockTemplate = () => HintBlockTemplate;
/* 提示正文与前后图标来自故事 info；构造时写入模板状态，滚动叙事行为继续由 StoryBaseContentBlock 管理。 */
class HintBlock extends EyesPublicApi.StoryBaseContentBlock {
  constructor(app, options = {}) {
    super(app, {
      iconBefore: "icon-greater",
      iconAfter: "icon-greater",
      ...options
    });
    Object.assign(this._state, {
      text: this._config.info.text || "Scroll to continue",
      isIconBeforeVisibleClass: this._class.isVisible[this._config.info.iconBeforeText || false],
      isIconAfterVisibleClass: this._class.isVisible[this._config.info.iconAfterText || false]
    });
  }
}
HintBlock.html = getHintBlockTemplate();
export { HintBlock };
