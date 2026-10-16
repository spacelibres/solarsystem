// Recovered from app.js:527919-528377.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class TapController extends PioneerPublicApi.BaseController {
  constructor(t, e) {
    super(t, e);
    this._tapCallback = null;
  }
  getTapCallback() {
    return this._tapCallback;
  }
  setTapCallback(tapCallback) {
    this._tapCallback = tapCallback;
  }
  __update() {
    const t = this.getEntity().getScene().getEngine().getInput();
    !t.isSelected() && t.getDraggedOffset().isZero() || null !== this._tapCallback && this._tapCallback();
  }
  _tapCallback;
}
export { TapController };
