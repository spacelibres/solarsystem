// Recovered from app.js:1405627-1405885.
import * as Eyes from "../../framework/eyes/index.js";
class SelectionManager extends Eyes.SelectionManager {
  _getLink(t) {
    const e = super._getLink(t);
    return this._app.getManager("link")?.getParsedLink?.(e) || e;
  }
}
export { SelectionManager };
