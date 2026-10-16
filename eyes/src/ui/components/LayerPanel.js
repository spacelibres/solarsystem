// Recovered from app.js:655131-662755.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import LayerPanelTemplate from "../templates/LayerPanelTemplate.html";
import "../../styles/extracted/LayerPanelStyles.js";
var getLayerPanelTemplate = () => LayerPanelTemplate;
/* 两种复选框实现共享 layer 管理器事件：NASA eyes 原生 input 与组件 Checkbox。事件回流只同步 UI 状态，程序化 toggle 传 skipCallback 避免再次发出图层切换。 */
class LayerPanel extends EyesPublicApi.BaseComponent {
  constructor(app, options = {}) {
    options.config = {
      layers: options.layers || [],
      checkboxType: options.checkboxType || "default",
      ...options.config
    };
    super(app, null, {
      isVisible: false,
      ui: app.getManager("layer").getLayer("ui").defaultVisibility,
      planets: app.getManager("layer").getLayer("planets").defaultVisibility,
      asteroids: app.getManager("layer").getLayer("asteroids").defaultVisibility,
      comets: app.getManager("layer").getLayer("comets").defaultVisibility,
      dwarfPlanets: app.getManager("layer").getLayer("dwarfPlanets").defaultVisibility,
      spacecraft: app.getManager("layer").getLayer("spacecraft").defaultVisibility,
      trails: app.getManager("layer").getLayer("trails").defaultVisibility,
      orbits: app.getManager("layer").getLayer("orbits").defaultVisibility,
      labels: app.getManager("layer").getLayer("labels").defaultVisibility,
      icons: app.getManager("layer").getLayer("icons").defaultVisibility,
      starfield: app.getManager("layer").getLayer("starfield").defaultVisibility,
      constellations: app.getManager("layer").getLayer("constellations").defaultVisibility,
      ...options
    });
    this._eyesCheck = "eyes" === options.checkboxType;
    Object.assign(this._class, {
      checkbox: {
        true: this._eyesCheck ? "active" : "active icon-checkmark",
        false: this._eyesCheck ? "" : "checkbox-hover"
      },
      boxColor: {
        true: "settings-alt",
        false: ""
      },
      isVisible: {
        true: "",
        false: ""
      }
    });
    Object.assign(this._state, {
      uiClass: this._class.checkbox[this._state.ui],
      uiColorClass: this._class.boxColor[this._state.ui],
      planetsClass: this._class.checkbox[this._state.planets],
      planetsColorClass: this._class.boxColor[this._state.planets],
      asteroidsClass: this._class.checkbox[this._state.asteroids],
      asteroidsColorClass: this._class.boxColor[this._state.asteroids],
      cometsClass: this._class.checkbox[this._state.comets],
      cometsColorClass: this._class.boxColor[this._state.comets],
      dwarfPlanetsClass: this._class.checkbox[this._state.dwarfPlanets],
      dwarfPlanetsColorClass: this._class.boxColor[this._state.dwarfPlanets],
      constellationsClass: this._class.checkbox[this._state.constellations],
      constellationsColorClass: this._class.boxColor[this._state.constellations],
      spacecraftClass: this._class.checkbox[this._state.spacecraft],
      spacecraftColorClass: this._class.boxColor[this._state.spacecraft],
      trailsClass: this._class.checkbox[this._state.trails],
      trailsColorClass: this._class.boxColor[this._state.trails],
      orbitsClass: this._class.checkbox[this._state.orbits],
      orbitsColorClass: this._class.boxColor[this._state.orbits],
      labelsClass: this._class.checkbox[this._state.labels],
      labelsColorClass: this._class.boxColor[this._state.labels],
      iconsClass: this._class.checkbox[this._state.icons],
      iconsColorClass: this._class.boxColor[this._state.icons],
      starfieldClass: this._class.checkbox[this._state.starfield],
      starfieldColorClass: this._class.boxColor[this._state.starfield]
    });
    this._categories = {
      ui: "User Interface",
      planets: "Planet",
      asteroids: "Asteroid",
      comets: "Comet",
      dwarfPlanets: "Dwarf Planet",
      spacecraft: "Spacecraft",
      trails: "Trail",
      labels: "Label",
      icons: "Icons",
      starfield: "Star Field",
      constellations: "Constellations"
    };
    this._categoriesDisplay = {
      ui: "User Interface",
      planets: "Planets",
      asteroids: "Asteroids",
      comets: "Comets",
      dwarfPlanets: "Dwarf Planets",
      constellations: "Constellations",
      spacecraft: "Spacecraft",
      trails: "Trails",
      orbits: "Orbits",
      labels: "Labels",
      icons: "Icons",
      starfield: "Star Field"
    };
    this.bindFunctions(["toggleLayer", "handleLayerToggle"]);
    this._fadeInRight = null;
    this._fadeOutRight = null;
    this._fadeInBottom = null;
    this._fadeOutBottom = null;
    this._lastMode = EyesPublicApi.AppUtils.isMobileMode();
    this._initCallbacks();
  }
  getCategoriesDisplay() {
    return this._categoriesDisplay;
  }
  resize() {
    super.resize();
    this._updatePosition();
  }
  init() {
    super.init();
    this._callbackRegistry.push({
      emitter: this._app.getManager("layer"),
      event: "toggleLayer",
      callback: this.handleLayerToggle
    });
    const panelBody = this._children.layerPanelBody;
    if (panelBody) {
      panelBody.textContent = "";
      const panelContainer = document.createElement("div");
      panelContainer.className = "container";
      this._config.layers.forEach(layerGroup => {
        const groupBlock = document.createElement("div");
        groupBlock.classList.add("block");
        const layerList = document.createElement("ul");
        layerList.classList.add("layers");
        layerGroup.forEach(layerName => {
          if (this._eyesCheck) {
            const listItem = document.createElement("li");
            listItem.setAttribute("key", layerName);
            listItem.className = `layer-panel-layer item clickable {{${layerName}Class}}`;
            const checkboxContainer = document.createElement("div");
            checkboxContainer.classList.add("eyes-checkbox");
            checkboxContainer.innerHTML = `<input type="checkbox" id="layer-panel-checkbox-${layerName}" ${this._state[layerName] ? "checked" : ""}><label for="layer-panel-checkbox-${layerName}"></label>`;
            listItem.append(checkboxContainer);
            const labelElement = document.createElement("span");
            labelElement.classList.add("small");
            labelElement.textContent = this._categoriesDisplay[layerName];
            listItem.append(labelElement);
            listItem.addEventListener("click", this.toggleLayer);
            layerList.append(listItem);
          } else {
            const checkbox = new EyesPublicApi.Checkbox(this._app, {
              config: {
                key: layerName,
                colorClass: this._class.boxColor.true,
                function: this.toggleLayer
              },
              isChecked: this._app.getManager("layer").getLayer(layerName).defaultVisibility,
              text: this._categoriesDisplay[layerName],
              checkboxClass: "layer-panel-layer item",
              textClass: "small"
            });
            checkbox.init();
            this._components.push(checkbox);
            layerList.appendChild(checkbox.element);
          }
        });
        groupBlock.append(layerList);
        panelContainer.append(groupBlock);
      });
      panelBody.append(panelContainer);
      this._setVariables(panelBody);
    }
  }
  _createAnimations() {
    this._fadeOutRight = EyesPublicApi.AnimationUtils.directionalFade(this._element, {
      direction: "right",
      fade: "out",
      yOffset: 0
    });
    this._fadeInRight = EyesPublicApi.AnimationUtils.directionalFade(this._element, {
      direction: "right",
      fade: "in",
      yOffset: 0
    });
    this._fadeOutBottom = EyesPublicApi.AnimationUtils.directionalFade(this._element, {
      direction: "down",
      fade: "out",
      yOffset: 0
    });
    this._fadeInBottom = EyesPublicApi.AnimationUtils.directionalFade(this._element, {
      direction: "down",
      fade: "in",
      yOffset: 0
    });
  }
  _resetAnimations() {
    this._fadeInRight.currentTime = 0;
    this._fadeOutRight.currentTime = 0;
    this._fadeInBottom.currentTime = 0;
    this._fadeOutBottom.currentTime = 0;
    this._fadeInRight.pause();
    this._fadeOutRight.pause();
    this._fadeInBottom.pause();
    this._fadeOutBottom.pause();
  }
  toggleLayer(eventOrLayerName) {
    const layerName = eventOrLayerName.target?.getAttribute("key") ?? eventOrLayerName;
    this._app.getManager("layer").toggleLayer(layerName, {
      category: this._categories[layerName]
    });
  }
  handleLayerToggle(layerName, isVisible, layerOptions) {
    const checkedClassKey = layerName + "Class";
    const colorClassKey = layerName + "ColorClass";
    if (null !== this.getState(layerName) && (this.setState({
      [layerName]: isVisible,
      [checkedClassKey]: this._class.checkbox[isVisible],
      [colorClassKey]: this._class.boxColor[isVisible]
    }), this._eyesCheck)) {
      const checkboxInput = document.getElementById(`layer-panel-checkbox-${layerName}`);
      checkboxInput && (checkboxInput.checked = isVisible);
    }
    let checkbox = this._components.find(candidateCheckbox => candidateCheckbox.getConfig().key === layerName);
    if (!checkbox) {
      const layerInfo = this._app.getManager("layer").getLayer(layerName);
      layerInfo.parent && (checkbox = this._components.find(candidateCheckbox => candidateCheckbox.getConfig().key === layerInfo.parent));
    }
    checkbox && checkbox.getState("isChecked") !== isVisible && checkbox.toggle(true, true);
  }
  isCategoryEnabled(categoryName) {
    return !this._children[categoryName]?.classList.contains("disabled");
  }
  setCategoryEnabled(categoryName, isEnabled = true) {
    this._children[categoryName]?.classList.toggle("disabled", !isEnabled);
  }
  hide() {
    this.getState("isVisible") && (super.hide(), document.body.style.setProperty("--settings-z-index", "40"), EyesPublicApi.AppUtils.isMobileMode() ? (this._fadeOutBottom = EyesPublicApi.AnimationUtils.directionalFade(this._element, {
      direction: "down",
      fade: "out",
      yOffset: 0
    }), this._fadeOutBottom.play()) : (this._fadeOutRight = EyesPublicApi.AnimationUtils.directionalFade(this._element, {
      direction: "right",
      fade: "out",
      yOffset: 0
    }), this._fadeOutRight.play()));
  }
  show() {
    super.show();
    document.body.style.setProperty("--settings-z-index", "50");
    EyesPublicApi.AppUtils.isMobileMode() ? (this._fadeInBottom = EyesPublicApi.AnimationUtils.directionalFade(this._element, {
      direction: "down",
      fade: "in",
      yOffset: 0
    }), this._fadeInBottom.play()) : (this._fadeInRight = EyesPublicApi.AnimationUtils.directionalFade(this._element, {
      direction: "right",
      fade: "in",
      yOffset: 0
    }), this._fadeInRight.play());
  }
  _updatePosition() {
    const lastMode = EyesPublicApi.AppUtils.isMobileMode();
    lastMode !== this._lastMode && (this._lastMode = lastMode, this._state.isVisible && this.show());
  }
  __enable() {
    super.__enable();
    this._createAnimations();
  }
  __disable() {
    super.__disable();
    this._fadeInRight = null;
    this._fadeOutRight = null;
    this._fadeInBottom = null;
    this._fadeOutBottom = null;
  }
}
LayerPanel.html = getLayerPanelTemplate();
export { LayerPanel };
