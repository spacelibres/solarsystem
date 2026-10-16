// Recovered from app.js:573118-573470.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import LoadIconTemplate from "../templates/LoadIconTemplate.html";
let defaultExport;
var getLoadIconTemplate = () => LoadIconTemplate;
class LoadIcon extends EyesPublicApi.BaseComponent {
  init() {
    super.init();
    this._callbackRegistry.push({
      emitter: this._app.getManager("scene"),
      event: "loading",
      callback: this.show
    }, {
      emitter: this._app.getManager("scene"),
      event: "loaded",
      callback: this.hide
    });
    this.hide();
  }
}
LoadIcon.html = getLoadIconTemplate();
defaultExport = LoadIcon;
export { defaultExport as default };
