// Recovered from app.js:671248-671742.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import ReplayButtonBlockTemplate from "../templates/ReplayButtonBlockTemplate.html";
import "../../styles/extracted/ReplayButtonBlockStyles.js";
var getReplayButtonBlockTemplate = () => ReplayButtonBlockTemplate;
class ReplayButtonBlock extends EyesPublicApi.StoryBaseContentBlock {
  init() {
    this._config.info.text || (this._config.info.text = this._config.info.fromStart ? "Restart Story" : "Replay Animation");
    super.init(this._config.info);
  }
  async onClick() {
    const routerManager = this._app.getManager("router");
    this._config.info.fromStart ? routerManager.navigate(routerManager.currentRoute.url) : routerManager.reload();
  }
}
ReplayButtonBlock.html = getReplayButtonBlockTemplate();
export { ReplayButtonBlock };
