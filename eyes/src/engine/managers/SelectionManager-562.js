// Recovered from app.js:689008-690603.
import * as Pioneer from "../pioneer/index.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class SelectionManager extends EyesPublicApi.BaseManager {
  constructor(t, scene) {
    super(t);
    this._scene = scene;
    this._id = null;
    this._isClickable = true;
    this._isSuppressed = false;
    this._eventNames.push("3dselection");
    this._initCallbacks();
    this.bindFunctions(["setSuppress", "handle3DSelection"]);
  }
  setScene(scene) {
    this._scene = scene;
  }
  selectEntity(t) {
    const id = this._id;
    if (t !== id) {
      const customEvent = new CustomEvent("selectionupdate", {
        detail: {
          new: t,
          old: this._id
        }
      });
      window.dispatchEvent(customEvent);
      this._id = t;
      this._switchSelectionClass(this._id, id);
    }
  }
  unselect() {
    const id = this._id;
    if (null !== id) {
      const customEvent = new CustomEvent("unselect", {
        old: this._id
      });
      window.dispatchEvent(customEvent);
    }
    this._id = null;
    this._switchSelectionClass(this._id, id);
  }
  getCurrentId() {
    return this._id;
  }
  setClickable(isClickable) {
    this._isClickable = isClickable;
  }
  init3Dcallback(t) {
    t.setSelectionCallback(this.handle3DSelection);
  }
  _getLink(t) {
    return `/${t}`;
  }
  setSuppress(isSuppressed) {
    this._isSuppressed = isSuppressed;
  }
  handle3DSelection(t) {
    if (this._isClickable) {
      if (!this._isSuppressed && null !== t) {
        const routerManager = this._app.getManager("router");
        const i = t.getName();
        const s = this._getLink(i);
        const n = "string" == typeof s ? s : s.path ?? "";
        const {
          options: o = {
            keepTime: true
          },
          query: r = {}
        } = "object" == typeof s && s;
        const a = routerManager.navigate(r, n, o);
        this.triggerCallbacks("3dselection", [a, t]);
      }
      this._isSuppressed = false;
    }
  }
  _switchSelectionClass(t, e) {
    if (null !== e) {
      const t = this._scene.getEntity(e);
      if (null !== t) {
        const e = t.getComponent(Pioneer.DivComponent).getDiv();
        e && e.classList.remove("selection");
      }
    }
    if (null !== t) {
      const e = this._scene.getEntity(t);
      if (null !== e) {
        const t = e.getComponent(Pioneer.DivComponent).getDiv();
        t && t.classList.add("selection");
      }
    }
  }
}
export { SelectionManager };
