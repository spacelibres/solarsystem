/** @eyes-analysis
 * 文件职责：对象相关图层选项内容块
 * 依据：imports: ../../engine/pioneer/index.js, ../../engine/solar-system/public-api.js, ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/LayersBlockTemplate.html；manager dependencies: content, layer, router
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1483581-1489081.
import "../../engine/pioneer/index.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import LayersBlockTemplate from "../templates/LayersBlockTemplate.html";
var getLayersBlockTemplate = () => LayersBlockTemplate;
/** @eyes-analysis
 * 类职责：对象相关图层选项内容块；继承 SolarSystemPublicApi.OptionsBlock
 * 继承：SolarSystemPublicApi.OptionsBlock；导出：LayersBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class LayersBlock extends SolarSystemPublicApi.OptionsBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Object.assign, this._app.getManager, SolarSystemSceneExports.Entity.getEntityNamesInGroup, Manager.getEntityInfo, this._defaultLayers.includes, this.bindFunctions；写入 _layers, _previousEntity, _previousChildEntity, _defaultLayers。
   * 状态写入：_defaultLayers、_layers、_previousChildEntity、_previousEntity、_state.numMinorMoons。
   * 调用线索：Object.assign、SolarSystemSceneExports.Entity.getEntityNamesInGroup、contentManager.getEntityInfo、o.forEach、super等。
   */
  constructor(t) {
    super(t, null, {
      entityName: "",
      numMinorMoons: 0,
      childEntityId: null
    });
    Object.assign(this._class, {
      isVisible: {
        true: "",
        false: "hidden"
      },
      showContextualLayers: {
        true: "",
        false: "hidden"
      }
    });
    Object.assign(this._state, {
      showContextualLayers: this._class.showContextualLayers.false
    });
    this._layers = {
      majorMoons: t => ({
        id: "majorMoons",
        text: () => {
          let e = "Major Moon";
          let i = 0;
          const contentManager = this._app.getManager("content");
          const o = SolarSystemSceneExports.Entity.getEntityNamesInGroup(t + ", moons");
          o.forEach(t => {
            const e = contentManager.getEntityInfo(t);
            e && "Major Moon" === (e.subcategory || e.category) && i++;
          });
          this._state.numMinorMoons = o.size - i;
          i > 1 && (e = `Major Moons (${i})`);
          return e;
        },
        function: () => {
          this._app.getManager("layer").toggleLayer("majorMoons", {
            parentId: t
          });
        }
      }),
      minorMoons: t => ({
        id: "minorMoons",
        text: () => `Minor Moons (${this._state.numMinorMoons})`,
        function: () => {
          this._app.getManager("layer").toggleLayer("minorMoons", {
            parentId: t
          });
        }
      }),
      orbiters: (t, e) => ({
        id: "orbiters",
        text: () => {
          const {
            iauName: iauName,
            displayName: displayName
          } = this._app.getManager("content").getEntityInfo(t);
          const s = displayName ?? iauName;
          return s ? `${s} Orbiters` : "Orbiters";
        },
        function: () => {
          const i = this._defaultLayers.includes("orbiters");
          this._app.getManager("layer").toggleLayer("orbiters", {
            parentId: t,
            satelliteGroup: e,
            allowSublayer: i
          });
        }
      }),
      landers: t => ({
        id: "landers",
        text: () => "Landers",
        function: () => {
          this._app.getManager("layer").toggleLayer("landers", {
            parentId: t
          });
        }
      }),
      satelliteGroup: (t, e) => ({
        id: "satelliteGroup",
        text: () => "Satellite Group",
        function: () => {
          this._app.getManager("layer").toggleLayer("satelliteGroup", {
            satelliteGroup: e
          });
        }
      }),
      heliosphere: t => ({
        id: "heliosphere",
        text: () => "Heliosphere",
        function: () => {
          this._app.getManager("layer").toggleLayer("heliosphere", {
            parentId: t
          });
        }
      })
    };
    this._previousEntity = null;
    this._previousChildEntity = void 0;
    this._defaultLayers = [];
    this.bindFunctions(["syncSpacecraftLayer"]);
  }
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._callbackRegistry.push, this._app.getManager。
   * 调用线索：super.init、this._app.getManager、this._callbackRegistry.push。
   */
  init() {
    super.init();
    this._callbackRegistry.push({
      emitter: this._app.getManager("layer"),
      event: "toggleLayer",
      callback: this.syncSpacecraftLayer
    });
  }
  /** @eyes-analysis
   * 执行 _addLayerOptions 对应的组件业务步骤；调用 this._app.getManager, this._createCheckbox, this._components.push, this._children.layersList.appendChild。
   * 状态写入：_children.layersList.innerHTML。
   * 调用线索：n.setEnabled、this._app.getManager、this._app.getManager("layer").getLayer、this._children.layersList.appendChild、this._components.push等。
   */
  _addLayerOptions(t) {
    if (this._components.length !== t.length) {
      this._children.layersList.innerHTML = "";
      for (let e = 0; e < t.length; e++) {
        const i = t[e];
        const s = this._app.getManager("layer").getLayer(i.id).visible;
        const n = this._createCheckbox(i, s);
        n.setEnabled(true);
        this._components.push(n);
        this._children.layersList.appendChild(n.element);
      }
    }
  }
  /** @eyes-analysis
   * 执行 _addDefaultOptions 对应的组件业务步骤；调用 this._app.getManager, this.setState, this._defaultLayers.push, this._defaultLayers.includes, this._addLayerOptions, this._setVariables。
   * 状态写入：_children.layersList.innerHTML。
   * 调用线索：e.includes、n.forEach、o.forEach、t.push、this._addLayerOptions等。
   */
  _addDefaultOptions(t, e = null, i = {}) {
    const s = t.id;
    const n = this._app.getManager("layer").getContextualLayers(s);
    const o = i?.id ? this._app.getManager("layer").getContextualLayers(i?.id) : [];
    if (0 === n.length) {
      this._children.layersList.innerHTML = "";
      this.setState({
        showContextualLayers: this._class.showContextualLayers.false
      });
    } else {
      const t = [];
      o.forEach(n => {
        if (null === e || e.includes(n)) {
          const e = this._layers[n](s, i?.constellation);
          t.push(e);
          this._defaultLayers.push(e.id);
        }
      });
      n.forEach(n => {
        if (null === e || e.includes(n)) {
          const e = this._layers[n](s, i?.constellation);
          t.push(e);
          this._defaultLayers.includes(e.id) || this._defaultLayers.push(e.id);
        }
      });
      this._addLayerOptions(t);
      this.setState({
        showContextualLayers: this._class.showContextualLayers.true
      });
    }
    this._setVariables(this._children.layersBlock);
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this._app.scene.getEntity, this.reset, this.setState, this._addDefaultOptions, this._app.getManager, Manager.getLayer, this._defaultLayers.includes, this._components.find；写入 _previousEntity, _previousChildEntity。
   * 状态写入：_previousChildEntity、_previousEntity。
   * 调用线索：["orbiters","landers","satelliteGroup"].includes、layerManager.getLayer、s.getState、s?.getState、s?.toggle等。
   */
  onRouteChange(t, e, i = null, s = {}) {
    const {
      id: id
    } = t;
    const o = this._previousEntity && this._app.scene.getEntity(this._previousEntity) && this._previousEntity !== id;
    (this._previousChildEntity !== s?.id || o) && this.reset();
    this.setState({
      entityName: e,
      childEntityId: s?.id
    });
    this._addDefaultOptions(t, i, s);
    const layerManager = this._app.getManager("layer");
    for (let t = 0; t < this._defaultLayers.length; t++) {
      const e = this._defaultLayers[t];
      let i = layerManager.getLayer(e).defaultVisibility;
      ["orbiters", "landers", "satelliteGroup"].includes(e) && (i = layerManager.getLayer("spacecraft").visible, "orbiters" === e && this._defaultLayers.includes("satelliteGroup") && (i = false));
      const s = this._components.find(t => t.getConfig().key === e);
      const n = this._app.getManager("router").configs[e] !== s?.getState("isChecked");
      s && s.getState("isChecked") !== i && n && s?.toggle();
    }
    this._previousEntity = t.id;
    this._previousChildEntity = s?.id;
  }
  /** @eyes-analysis
   * 执行 syncSpacecraftLayer 对应的组件业务步骤；调用 this._components.find, this.syncCheckbox。
   * 调用线索：i?.isEnabled、s?.isEnabled、t.getConfig、t?.isEnabled、this._components.find等。
   */
  syncSpacecraftLayer(t, e, i) {
    if ("spacecraft" === t) {
      const t = this._components.find(t => "landers" === t.getConfig().key);
      const i = this._components.find(t => "orbiters" === t.getConfig().key);
      const s = this._components.find(t => "satelliteGroup" === t.getConfig().key);
      i?.isEnabled() && this.syncCheckbox(i, "orbiters", e);
      t?.isEnabled() && this.syncCheckbox(t, "landers", e);
      s?.isEnabled() && (this.syncCheckbox(s, "satelliteGroup", e), this.syncCheckbox(i, "orbiters", e));
    }
  }
  /** @eyes-analysis
   * 执行 syncAllLayerCheckboxes 对应的组件业务步骤；调用 this._components.find, this.syncCheckbox, this._app.getManager。
   * 调用线索：e.getConfig、this._app.getManager、this._app.getManager("layer").getLayer、this._components.find、this._defaultLayers?.forEach等。
   */
  syncAllLayerCheckboxes() {
    this._defaultLayers?.forEach(t => {
      const e = this._components.find(e => e.getConfig().key === t);
      e && this.syncCheckbox(e, t, this._app.getManager("layer").getLayer(t).visible);
    });
  }
  /** @eyes-analysis
   * 执行 syncCheckbox 对应的组件业务步骤；调用 this._app.getManager。
   * 状态写入：_app.getManager("layer").getLayer(e).visible。
   * 调用线索：t.getState、t.setState、t.toggle、this._app.getManager、this._app.getManager("layer").getLayer。
   */
  syncCheckbox(t, e, i) {
    t.getState("isChecked") !== i && (t.toggle(true, true), this._app.getManager("layer").getLayer(e).visible = i, t.setState({
      isChecked: i
    }));
  }
  /** @eyes-analysis
   * 执行 reset 对应的组件业务步骤；调用 this._app.getManager, this._components.find, this.syncCheckbox；写入 _defaultLayers, _components。
   * 状态写入：_components、_defaultLayers。
   * 调用线索：["orbiters","landers","satelliteGroup"].includes、s.getState、s?.getState、s?.toggle、t.getConfig等。
   */
  reset() {
    for (let t = 0; t < this._defaultLayers.length; t++) {
      const e = this._defaultLayers[t];
      let i = this._app.getManager("layer").getLayer(e).defaultVisibility;
      ["orbiters", "landers", "satelliteGroup"].includes(e) && (i = this._app.getManager("layer").getLayer("spacecraft").visible);
      const s = this._components.find(t => t.getConfig().key === e);
      const n = this._app.getManager("router").configs[e] !== s?.getState("isChecked");
      s && s.getState("isChecked") !== i && n && (this._app.getManager("layer").getLayer(e).visible !== i ? s?.toggle() : this.syncCheckbox(s, "heliosphere", i));
    }
    this._defaultLayers = [];
    this._components = [];
  }
  /** @eyes-analysis
   * 卸载 DOM 并取消业务订阅；调用 this.setState, super.__disable；写入 _previousEntity, _previousChildEntity。
   * 状态写入：_previousChildEntity、_previousEntity。
   * 调用线索：super.__disable、this.setState。
   */
  __disable() {
    this._previousEntity = null;
    this._previousChildEntity = null;
    this.setState({
      entityName: null,
      childEntityId: null
    });
    super.__disable();
  }
}
LayersBlock.html = getLayersBlockTemplate();
export { LayersBlock };
