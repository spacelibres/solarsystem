// Recovered from app.js:666733-667255.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import HintBlockTemplate from "../templates/HintBlockTemplate.html";
import "../../styles/extracted/HintBlockStyles.js";
var getHintBlockTemplate = () => HintBlockTemplate;
class HintBlock extends EyesPublicApi.StoryBaseContentBlock {
  constructor(t, e = {}) {
    super(t, {
      iconBefore: "icon-greater",
      iconAfter: "icon-greater",
      ...e
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
