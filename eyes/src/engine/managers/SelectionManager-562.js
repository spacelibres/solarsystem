// Recovered from app.js:689008-690603.
/* 通用选择管理器拥有当前选择 id 与一次性 suppress 标记；标签点击可抑制随后的三维拾取，处理后清除 suppress。选中 class 与路由导航同步，事件仍保持原回调参数。 */
import * as Pioneer from "../pioneer/index.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class SelectionManager extends EyesPublicApi.BaseManager {
  constructor(app, scene) {
    super(app);
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
  selectEntity(entityId) {
    const id = this._id;
    if (entityId !== id) {
      const customEvent = new CustomEvent("selectionupdate", {
        detail: {
          new: entityId,
          old: this._id
        }
      });
      window.dispatchEvent(customEvent);
      this._id = entityId;
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
  init3Dcallback(cameraManager) {
    cameraManager.setSelectionCallback(this.handle3DSelection);
  }
  _getLink(entityId) {
    return `/${entityId}`;
  }
  setSuppress(isSuppressed) {
    this._isSuppressed = isSuppressed;
  }
  handle3DSelection(pickedEntity) {
    if (this._isClickable) {
      if (!this._isSuppressed && null !== pickedEntity) {
        const routerManager = this._app.getManager("router");
        const entityId = pickedEntity.getName();
        const selectedLink = this._getLink(entityId);
        const routePath = "string" == typeof selectedLink ? selectedLink : selectedLink.path ?? "";
        const {
          options: navigationOptions = {
            keepTime: true
          },
          query: queryParams = {}
        } = "object" == typeof selectedLink && selectedLink;
        const navigationResult = routerManager.navigate(queryParams, routePath, navigationOptions);
        this.triggerCallbacks("3dselection", [navigationResult, pickedEntity]);
      }
      this._isSuppressed = false;
    }
  }
  _switchSelectionClass(newEntityId, oldEntityId) {
    if (null !== oldEntityId) {
      const oldEntity = this._scene.getEntity(oldEntityId);
      if (null !== oldEntity) {
        const oldLabel = oldEntity.getComponent(Pioneer.DivComponent).getDiv();
        oldLabel && oldLabel.classList.remove("selection");
      }
    }
    if (null !== newEntityId) {
      const newEntity = this._scene.getEntity(newEntityId);
      if (null !== newEntity) {
        const newLabel = newEntity.getComponent(Pioneer.DivComponent).getDiv();
        newLabel && newLabel.classList.add("selection");
      }
    }
  }
}
export { SelectionManager };
