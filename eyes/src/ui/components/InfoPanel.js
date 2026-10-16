/** @eyes-analysis
 * 文件职责：辅助对象信息面板
 * 依据：imports: ../../framework/eyes/index.js, ../../styles/extracted/InfoPanelStyles.js, ../templates/InfoPanelTemplate.html；component dependencies: overlay
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1560561-1561194.
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/InfoPanelStyles.js";
import InfoPanelTemplate from "../templates/InfoPanelTemplate.html";
var getInfoPanelTemplate = () => InfoPanelTemplate;
/** @eyes-analysis
 * 类职责：辅助对象信息面板；继承 Eyes.BaseComponent
 * 继承：Eyes.BaseComponent；导出：InfoPanel。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class InfoPanel extends Eyes.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Object.assign, this.bindFunctions。
   * 调用线索：Object.assign、super、this.bindFunctions。
   */
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
  /** @eyes-analysis
   * 执行 openPanel 对应的组件业务步骤；调用 this.show。
   * 调用线索：this.show。
   */
  openPanel() {
    this.show();
  }
  /** @eyes-analysis
   * 执行 closePanel 对应的组件业务步骤；调用 this.hide。
   * 调用线索：this.hide。
   */
  closePanel() {
    this.hide();
  }
  /** @eyes-analysis
   * 执行 hide 对应的组件业务步骤；调用 this.getState, super.hide, this._app.getComponent。
   * 调用线索：super.hide、this._app.getComponent、this._app.getComponent("overlay").hide、this.getState。
   */
  hide() {
    this.getState("isVisible") && (super.hide(), this._app.getComponent("overlay").hide());
  }
  /** @eyes-analysis
   * 执行 show 对应的组件业务步骤；调用 super.show, this._app.getComponent。
   * 调用线索：super.show、this._app.getComponent、this._app.getComponent("overlay").setContent、this._app.getComponent("overlay").show。
   */
  show() {
    super.show();
    this._app.getComponent("overlay").setContent(this._element);
    this._app.getComponent("overlay").show();
  }
}
InfoPanel.html = getInfoPanelTemplate();
export { InfoPanel };
