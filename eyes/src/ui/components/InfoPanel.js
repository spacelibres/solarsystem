// Recovered from app.js:1560561-1561194.
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/InfoPanelStyles.js";
import InfoPanelTemplate from "../templates/InfoPanelTemplate.html";
var getInfoPanelTemplate = () => InfoPanelTemplate;
/* 面板把自身根节点交给共享 overlay 挂载，show/hide 同时协调覆盖层；重复 hide 仅在原面板可见时执行。 */
class InfoPanel extends Eyes.BaseComponent {
  constructor(app, options = {}) {
    options.config = {
      ...options.config
    };
    super(app, null, {
      isVisible: false,
      ...options
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
