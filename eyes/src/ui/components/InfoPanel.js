// Recovered from app.js:1560561-1561194.
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/InfoPanelStyles.js";
import InfoPanelTemplate from "../templates/InfoPanelTemplate.html";
var getInfoPanelTemplate = () => InfoPanelTemplate;
class InfoPanel extends Eyes.BaseComponent {
  constructor(t, e = {}) {
    e.config = {
      ...e.config
    };
    super(t, null, {
      isVisible: false,
      ...e
    });
    Object.assign(this._class, {
      isVisible: {
        true: "",
        false: "hidden"
      }
    });
    this.bindFunctions(["openPanel", "closePanel"]);
  }
  openPanel() {
    this.show();
  }
  closePanel() {
    this.hide();
  }
  hide() {
    this.getState("isVisible") && (super.hide(), this._app.getComponent("overlay").hide());
  }
  show() {
    super.show();
    this._app.getComponent("overlay").setContent(this._element);
    this._app.getComponent("overlay").show();
  }
}
InfoPanel.html = getInfoPanelTemplate();
export { InfoPanel };
