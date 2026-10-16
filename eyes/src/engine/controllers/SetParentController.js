// Recovered from app.js:522776-523362.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class SetParentController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._parent = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
  }
  getParent() {
    return this._parent.getName();
  }
  setParent(t) {
    "" !== this._parent.getName() && this.removeDependentState(this._parent.getName(), "position");
    this._parent.setName(t);
    "" !== this._parent.getName() && this.addDependentState(this._parent.getName(), "position");
  }
  __update() {
    const t = this._parent.get();
    this.getEntity().setParent(t);
  }
  _parent;
}
export { SetParentController };
