// Recovered from app.js:1658608-1659147.
import * as Eyes from "../../framework/eyes/index.js";
class Settings extends Eyes.Settings {
  constructor(t, e = {}) {
    super(t, e);
    Object.assign(this._state, {
      paddingBottom: "0px"
    });
  }
  init() {
    super.init();
    this._callbackRegistry.push({
      emitter: this._app.getComponent("collapsibleMenu"),
      event: "expandtoggle",
      callback: t => {
        Eyes.AppUtils.isMobile() && t && this.collapse();
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
