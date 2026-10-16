/** @eyes-analysis
 * 文件职责：处理 3D 选择，更新 DOM 选中类并导航到实体链接。
 * 依据：import ../pioneer/index.js；import ../../framework/eyes/public-api.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:689008-690603.
import * as Pioneer from "../pioneer/index.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
/** @eyes-analysis
 * 类职责：处理 3D 选择，更新 DOM 选中类并导航到实体链接。
 * 继承：EyesPublicApi.BaseManager；导出：SelectionManager。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class SelectionManager extends EyesPublicApi.BaseManager {
  /** @eyes-analysis
   * 【结构证据】写入 `_id`、`_isClickable`、`_isSuppressed`、`_scene`；调用 `super`、`this._eventNames.push`、`this._initCallbacks`、`this.bindFunctions`。
   * 状态写入：_id、_isClickable、_isSuppressed、_scene。
   * 调用线索：super、this._eventNames.push、this._initCallbacks、this.bindFunctions。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_scene`。
   * 状态写入：_scene。
   */
  setScene(scene) {
    this._scene = scene;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_id`；调用 `new CustomEvent`、`this._switchSelectionClass`、`window.dispatchEvent`。
   * 状态写入：_id。
   * 调用线索：new CustomEvent、this._switchSelectionClass、window.dispatchEvent。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_id`；调用 `new CustomEvent`、`this._switchSelectionClass`、`window.dispatchEvent`。
   * 状态写入：_id。
   * 调用线索：new CustomEvent、this._switchSelectionClass、window.dispatchEvent。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `this._id`。
   */
  getCurrentId() {
    return this._id;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_isClickable`。
   * 状态写入：_isClickable。
   */
  setClickable(isClickable) {
    this._isClickable = isClickable;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.setSelectionCallback`。
   * 调用线索：t.setSelectionCallback。
   */
  init3Dcallback(t) {
    t.setSelectionCallback(this.handle3DSelection);
  }
  /** @eyes-analysis
   * 【结构证据】返回 ``/${t}``。
   */
  _getLink(t) {
    return `/${t}`;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_isSuppressed`。
   * 状态写入：_isSuppressed。
   */
  setSuppress(isSuppressed) {
    this._isSuppressed = isSuppressed;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_isSuppressed`；调用 `routerManager.navigate`、`t.getName`、`this._app.getManager`、`this._getLink`、`this.triggerCallbacks`。
   * 状态写入：_isSuppressed。
   * 调用线索：routerManager.navigate、t.getName、this._app.getManager、this._getLink、this.triggerCallbacks。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `e.classList.remove`、`e.getComponent`、`e.getComponent(Pioneer.DivComponent).getDiv`、`t.classList.add`、`t.getComponent`、`t.getComponent(Pioneer.DivComponent).getDiv`。
   * 调用线索：e.classList.remove、e.getComponent、e.getComponent(Pioneer.DivComponent).getDiv、t.classList.add、t.getComponent等。
   */
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
