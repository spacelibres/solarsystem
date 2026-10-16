// Recovered from app.js:527919-528377.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 选择或发生拖移时调用 tapCallback；保留原布尔触发条件和同步回调时机。 */
class TapController extends PioneerPublicApi.BaseController {
  constructor(controllerName, entity) {
    super(controllerName, entity);
    this._tapCallback = null;
  }
  getTapCallback() {
    return this._tapCallback;
  }
  setTapCallback(tapCallback) {
    this._tapCallback = tapCallback;
  }
  __update() {
    const input = this.getEntity().getScene().getEngine().getInput();
    if (!(!input.isSelected() && input.getDraggedOffset().isZero())) {
      if (null !== this._tapCallback) {
        this._tapCallback();
      }
    }
  }
  _tapCallback;
}
export { TapController };
