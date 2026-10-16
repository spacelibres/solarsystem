// Recovered from app.js:655131-662755.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import LayerPanelTemplate from "../templates/LayerPanelTemplate.html";
import "../../styles/extracted/LayerPanelStyles.js";
var getLayerPanelTemplate = () => LayerPanelTemplate;
class LayerPanel extends EyesPublicApi.BaseComponent {
  constructor(t, e = {}) {
    e.config = {
      layers: e.layers || [],
      checkboxType: e.checkboxType || "default",
      ...e.config
    };
    super(t, null, {
      isVisible: false,
      ui: t.getManager("layer").getLayer("ui").defaultVisibility,
      planets: t.getManager("layer").getLayer("planets").defaultVisibility,
      asteroids: t.getManager("layer").getLayer("asteroids").defaultVisibility,
      comets: t.getManager("layer").getLayer("comets").defaultVisibility,
      dwarfPlanets: t.getManager("layer").getLayer("dwarfPlanets").defaultVisibility,
      spacecraft: t.getManager("layer").getLayer("spacecraft").defaultVisibility,
      trails: t.getManager("layer").getLayer("trails").defaultVisibility,
      orbits: t.getManager("layer").getLayer("orbits").defaultVisibility,
      labels: t.getManager("layer").getLayer("labels").defaultVisibility,
      icons: t.getManager("layer").getLayer("icons").defaultVisibility,
      starfield: t.getManager("layer").getLayer("starfield").defaultVisibility,
      constellations: t.getManager("layer").getLayer("constellations").defaultVisibility,
      ...e
    });
    this._eyesCheck = "eyes" === e.checkboxType;
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
    const t = this._children.layerPanelBody;
    if (t) {
      t.textContent = "";
      const e = document.createElement("div");
      e.className = "container";
      this._config.layers.forEach(t => {
        const i = document.createElement("div");
        i.classList.add("block");
        const n = document.createElement("ul");
        n.classList.add("layers");
        t.forEach(t => {
          if (this._eyesCheck) {
            const e = document.createElement("li");
            e.setAttribute("key", t);
            e.className = `layer-panel-layer item clickable {{${t}Class}}`;
            const i = document.createElement("div");
            i.classList.add("eyes-checkbox");
            i.innerHTML = `<input type="checkbox" id="layer-panel-checkbox-${t}" ${this._state[t] ? "checked" : ""}><label for="layer-panel-checkbox-${t}"></label>`;
            e.append(i);
            const s = document.createElement("span");
            s.classList.add("small");
            s.textContent = this._categoriesDisplay[t];
            e.append(s);
            e.addEventListener("click", this.toggleLayer);
            n.append(e);
          } else {
            const checkbox = new EyesPublicApi.Checkbox(this._app, {
              config: {
                key: t,
                colorClass: this._class.boxColor.true,
                function: this.toggleLayer
              },
              isChecked: this._app.getManager("layer").getLayer(t).defaultVisibility,
              text: this._categoriesDisplay[t],
              checkboxClass: "layer-panel-layer item",
              textClass: "small"
            });
            checkbox.init();
            this._components.push(checkbox);
            n.appendChild(checkbox.element);
          }
        });
        i.append(n);
        e.append(i);
      });
      t.append(e);
      this._setVariables(t);
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
  toggleLayer(t) {
    const e = t.target?.getAttribute("key") ?? t;
    this._app.getManager("layer").toggleLayer(e, {
      category: this._categories[e]
    });
  }
  handleLayerToggle(t, e, i) {
    const s = t + "Class";
    const n = t + "ColorClass";
    if (null !== this.getState(t) && (this.setState({
      [t]: e,
      [s]: this._class.checkbox[e],
      [n]: this._class.boxColor[e]
    }), this._eyesCheck)) {
      const i = document.getElementById(`layer-panel-checkbox-${t}`);
      i && (i.checked = e);
    }
    let o = this._components.find(e => e.getConfig().key === t);
    if (!o) {
      const e = this._app.getManager("layer").getLayer(t);
      e.parent && (o = this._components.find(t => t.getConfig().key === e.parent));
    }
    o && o.getState("isChecked") !== e && o.toggle(true, true);
  }
  isCategoryEnabled(t) {
    return !this._children[t]?.classList.contains("disabled");
  }
  setCategoryEnabled(t, e = true) {
    this._children[t]?.classList.toggle("disabled", !e);
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
