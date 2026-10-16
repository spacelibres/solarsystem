// Recovered from app.js:1483581-1489081.
import "../../engine/pioneer/index.js";
import * as SolarSystemSceneExports from "../../engine/solar-system/public-api.js";
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import LayersBlockTemplate from "../templates/LayersBlockTemplate.html";
var getLayersBlockTemplate = () => LayersBlockTemplate;
/* 上下文图层工厂闭包保存父实体与卫星组；majorMoons 文本计算也更新 minorMoons 数量。主 spacecraft 图层事件同步 orbiters/landers 等子项，重置时沿用查询与默认可见性优先级。 */
class LayersBlock extends SolarSystemPublicApi.OptionsBlock {
  constructor(app) {
    super(app, null, {
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
      majorMoons: parentEntityId => ({
        id: "majorMoons",
        text: () => {
          let majorMoonLabel = "Major Moon";
          let majorMoonCount = 0;
          const contentManager = this._app.getManager("content");
          const moonIds = SolarSystemSceneExports.Entity.getEntityNamesInGroup(parentEntityId + ", moons");
          moonIds.forEach(moonId => {
            const moonInfo = contentManager.getEntityInfo(moonId);
            moonInfo && "Major Moon" === (moonInfo.subcategory || moonInfo.category) && majorMoonCount++;
          });
          this._state.numMinorMoons = moonIds.size - majorMoonCount;
          majorMoonCount > 1 && (majorMoonLabel = `Major Moons (${majorMoonCount})`);
          return majorMoonLabel;
        },
        function: () => {
          this._app.getManager("layer").toggleLayer("majorMoons", {
            parentId: parentEntityId
          });
        }
      }),
      minorMoons: parentEntityId => ({
        id: "minorMoons",
        text: () => `Minor Moons (${this._state.numMinorMoons})`,
        function: () => {
          this._app.getManager("layer").toggleLayer("minorMoons", {
            parentId: parentEntityId
          });
        }
      }),
      orbiters: (parentEntityId, satelliteGroup) => ({
        id: "orbiters",
        text: () => {
          const {
            iauName: iauName,
            displayName: displayName
          } = this._app.getManager("content").getEntityInfo(parentEntityId);
          const parentTitle = displayName ?? iauName;
          return parentTitle ? `${parentTitle} Orbiters` : "Orbiters";
        },
        function: () => {
          const allowSublayer = this._defaultLayers.includes("orbiters");
          this._app.getManager("layer").toggleLayer("orbiters", {
            parentId: parentEntityId,
            satelliteGroup: satelliteGroup,
            allowSublayer: allowSublayer
          });
        }
      }),
      landers: parentEntityId => ({
        id: "landers",
        text: () => "Landers",
        function: () => {
          this._app.getManager("layer").toggleLayer("landers", {
            parentId: parentEntityId
          });
        }
      }),
      satelliteGroup: (parentEntityId, satelliteGroup) => ({
        id: "satelliteGroup",
        text: () => "Satellite Group",
        function: () => {
          this._app.getManager("layer").toggleLayer("satelliteGroup", {
            satelliteGroup: satelliteGroup
          });
        }
      }),
      heliosphere: parentEntityId => ({
        id: "heliosphere",
        text: () => "Heliosphere",
        function: () => {
          this._app.getManager("layer").toggleLayer("heliosphere", {
            parentId: parentEntityId
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
  _addLayerOptions(layerOptions) {
    if (this._components.length !== layerOptions.length) {
      this._children.layersList.innerHTML = "";
      for (let optionIndex = 0; optionIndex < layerOptions.length; optionIndex++) {
        const layerOption = layerOptions[optionIndex];
        const isVisible = this._app.getManager("layer").getLayer(layerOption.id).visible;
        const checkbox = this._createCheckbox(layerOption, isVisible);
        checkbox.setEnabled(true);
        this._components.push(checkbox);
        this._children.layersList.appendChild(checkbox.element);
      }
    }
  }
  _addDefaultOptions(entityInfo, allowedLayers = null, childEntityInfo = {}) {
    const entityId = entityInfo.id;
    const contextualLayers = this._app.getManager("layer").getContextualLayers(entityId);
    const childContextualLayers = childEntityInfo?.id ? this._app.getManager("layer").getContextualLayers(childEntityInfo?.id) : [];
    if (0 === contextualLayers.length) {
      this._children.layersList.innerHTML = "";
      this.setState({
        showContextualLayers: this._class.showContextualLayers.false
      });
    } else {
      const layerOptions = [];
      childContextualLayers.forEach(layerName => {
        if (null === allowedLayers || allowedLayers.includes(layerName)) {
          const layerOption = this._layers[layerName](entityId, childEntityInfo?.constellation);
          layerOptions.push(layerOption);
          this._defaultLayers.push(layerOption.id);
        }
      });
      contextualLayers.forEach(layerName => {
        if (null === allowedLayers || allowedLayers.includes(layerName)) {
          const layerOption = this._layers[layerName](entityId, childEntityInfo?.constellation);
          layerOptions.push(layerOption);
          this._defaultLayers.includes(layerOption.id) || this._defaultLayers.push(layerOption.id);
        }
      });
      this._addLayerOptions(layerOptions);
      this.setState({
        showContextualLayers: this._class.showContextualLayers.true
      });
    }
    this._setVariables(this._children.layersBlock);
  }
  onRouteChange(entityInfo, entityName, allowedLayers = null, childEntityInfo = {}) {
    const {
      id: id
    } = entityInfo;
    const didEntityChange = this._previousEntity && this._app.scene.getEntity(this._previousEntity) && this._previousEntity !== id;
    (this._previousChildEntity !== childEntityInfo?.id || didEntityChange) && this.reset();
    this.setState({
      entityName: entityName,
      childEntityId: childEntityInfo?.id
    });
    this._addDefaultOptions(entityInfo, allowedLayers, childEntityInfo);
    const layerManager = this._app.getManager("layer");
    for (let layerIndex = 0; layerIndex < this._defaultLayers.length; layerIndex++) {
      const layerName = this._defaultLayers[layerIndex];
      let defaultVisibility = layerManager.getLayer(layerName).defaultVisibility;
      ["orbiters", "landers", "satelliteGroup"].includes(layerName) && (defaultVisibility = layerManager.getLayer("spacecraft").visible, "orbiters" === layerName && this._defaultLayers.includes("satelliteGroup") && (defaultVisibility = false));
      const checkbox = this._components.find(candidateCheckbox => candidateCheckbox.getConfig().key === layerName);
      const queryDiffersFromCheckbox = this._app.getManager("router").configs[layerName] !== checkbox?.getState("isChecked");
      checkbox && checkbox.getState("isChecked") !== defaultVisibility && queryDiffersFromCheckbox && checkbox?.toggle();
    }
    this._previousEntity = entityInfo.id;
    this._previousChildEntity = childEntityInfo?.id;
  }
  syncSpacecraftLayer(layerName, isVisible, layerOptions) {
    if ("spacecraft" === layerName) {
      const landersCheckbox = this._components.find(candidateCheckbox => "landers" === candidateCheckbox.getConfig().key);
      const orbitersCheckbox = this._components.find(candidateCheckbox => "orbiters" === candidateCheckbox.getConfig().key);
      const satelliteGroupCheckbox = this._components.find(candidateCheckbox => "satelliteGroup" === candidateCheckbox.getConfig().key);
      orbitersCheckbox?.isEnabled() && this.syncCheckbox(orbitersCheckbox, "orbiters", isVisible);
      landersCheckbox?.isEnabled() && this.syncCheckbox(landersCheckbox, "landers", isVisible);
      satelliteGroupCheckbox?.isEnabled() && (this.syncCheckbox(satelliteGroupCheckbox, "satelliteGroup", isVisible), this.syncCheckbox(orbitersCheckbox, "orbiters", isVisible));
    }
  }
  syncAllLayerCheckboxes() {
    this._defaultLayers?.forEach(layerName => {
      const checkbox = this._components.find(candidateCheckbox => candidateCheckbox.getConfig().key === layerName);
      checkbox && this.syncCheckbox(checkbox, layerName, this._app.getManager("layer").getLayer(layerName).visible);
    });
  }
  syncCheckbox(checkbox, layerName, isVisible) {
    checkbox.getState("isChecked") !== isVisible && (checkbox.toggle(true, true), this._app.getManager("layer").getLayer(layerName).visible = isVisible, checkbox.setState({
      isChecked: isVisible
    }));
  }
  reset() {
    for (let layerIndex = 0; layerIndex < this._defaultLayers.length; layerIndex++) {
      const layerName = this._defaultLayers[layerIndex];
      let defaultVisibility = this._app.getManager("layer").getLayer(layerName).defaultVisibility;
      ["orbiters", "landers", "satelliteGroup"].includes(layerName) && (defaultVisibility = this._app.getManager("layer").getLayer("spacecraft").visible);
      const checkbox = this._components.find(candidateCheckbox => candidateCheckbox.getConfig().key === layerName);
      const queryDiffersFromCheckbox = this._app.getManager("router").configs[layerName] !== checkbox?.getState("isChecked");
      checkbox && checkbox.getState("isChecked") !== defaultVisibility && queryDiffersFromCheckbox && (this._app.getManager("layer").getLayer(layerName).visible !== defaultVisibility ? checkbox?.toggle() : this.syncCheckbox(checkbox, "heliosphere", defaultVisibility));
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
