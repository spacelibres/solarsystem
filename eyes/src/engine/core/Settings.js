// Recovered from app.js:1658608-1659147.
/* 应用设置扩展通用工具条，在移动端折叠菜单展开时收起工具条；折叠恢复配置的底部 padding，展开时清零。 */
import * as Eyes from "../../framework/eyes/index.js";
class Settings extends Eyes.Settings {
  constructor(app, options = {}) {
    super(app, options);
    Object.assign(this._state, {
      paddingBottom: "0px"
    });
  }
  init() {
    super.init();
    this._callbackRegistry.push({
      emitter: this._app.getComponent("collapsibleMenu"),
      event: "expandtoggle",
      callback: isExpanded => {
        Eyes.AppUtils.isMobile() && isExpanded && this.collapse();
      }
    });
  }
  collapse() {
    super.collapse();
    this._element.style.paddingBottom = this._state.paddingBottom;
  }
  expand() {
    super.expand();
    this._element.style.paddingBottom = "0px";
  }
}
export { Settings };
