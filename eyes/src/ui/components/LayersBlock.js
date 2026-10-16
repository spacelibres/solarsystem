// Recovered from app.js:1483581-1489081.
import "../../engine/pioneer/index.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import LayersBlockTemplate from "../templates/LayersBlockTemplate.html";
var getLayersBlockTemplate = () => LayersBlockTemplate;
class LayersBlock extends SolarSystemPublicApi.OptionsBlock {
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
  init() {
    super.init();
    this._callbackRegistry.push({
      emitter: this._app.getManager("layer"),
      event: "toggleLayer",
      callback: this.syncSpacecraftLayer
    });
  }
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
  syncAllLayerCheckboxes() {
    this._defaultLayers?.forEach(t => {
      const e = this._components.find(e => e.getConfig().key === t);
      e && this.syncCheckbox(e, t, this._app.getManager("layer").getLayer(t).visible);
    });
  }
  syncCheckbox(t, e, i) {
    t.getState("isChecked") !== i && (t.toggle(true, true), this._app.getManager("layer").getLayer(e).visible = i, t.setState({
      isChecked: i
    }));
  }
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
