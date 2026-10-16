/** @eyes-analysis
 * 文件职责：图层分组与可见性开关面板
 * 依据：imports: ../../framework/eyes/public-api.js, ../templates/LayerPanelTemplate.html, ../../styles/extracted/LayerPanelStyles.js；manager dependencies: layer
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:655131-662755.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import LayerPanelTemplate from "../templates/LayerPanelTemplate.html";
import "../../styles/extracted/LayerPanelStyles.js";
var getLayerPanelTemplate = () => LayerPanelTemplate;
/** @eyes-analysis
 * 类职责：图层分组与可见性开关面板；继承 EyesPublicApi.BaseComponent
 * 继承：EyesPublicApi.BaseComponent；导出：LayerPanel。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class LayerPanel extends EyesPublicApi.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Object.assign, this.bindFunctions, EyesPublicApi.AppUtils.isMobileMode, this._initCallbacks；写入 _eyesCheck, _categories, _categoriesDisplay, _fadeInRight, _fadeOutRight, _fadeInBottom, _fadeOutBottom, _lastMode。
   * 状态写入：_categories、_categoriesDisplay、_eyesCheck、_fadeInBottom、_fadeInRight、_fadeOutBottom、_fadeOutRight、_lastMode。
   * 调用线索：EyesPublicApi.AppUtils.isMobileMode、Object.assign、super、t.getManager、t.getManager("layer").getLayer等。
   */
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
  /** @eyes-analysis
   * 执行 getCategoriesDisplay 对应的组件业务步骤。
   */
  getCategoriesDisplay() {
    return this._categoriesDisplay;
  }
  /** @eyes-analysis
   * 重排响应式界面；调用 super.resize, this._updatePosition。
   * 调用线索：super.resize、this._updatePosition。
   */
  resize() {
    super.resize();
    this._updatePosition();
  }
  /** @eyes-analysis
   * 初始化模板与关联资源；调用 super.init, this._callbackRegistry.push, this._app.getManager, this._config.layers.forEach, List.add, EyesPublicApi.Checkbox, this._components.push, this._setVariables。
   * 调用线索：checkbox.init、document.createElement、e.addEventListener、e.append、e.setAttribute等。
   */
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
  /** @eyes-analysis
   * 执行 _createAnimations 对应的组件业务步骤；调用 EyesPublicApi.AnimationUtils.directionalFade；写入 _fadeOutRight, _fadeInRight, _fadeOutBottom, _fadeInBottom。
   * 状态写入：_fadeInBottom、_fadeInRight、_fadeOutBottom、_fadeOutRight。
   * 调用线索：EyesPublicApi.AnimationUtils.directionalFade。
   */
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
  /** @eyes-analysis
   * 执行 _resetAnimations 对应的组件业务步骤；调用 this._fadeInRight.pause, this._fadeOutRight.pause, this._fadeInBottom.pause, this._fadeOutBottom.pause。
   * 状态写入：_fadeInBottom.currentTime、_fadeInRight.currentTime、_fadeOutBottom.currentTime、_fadeOutRight.currentTime。
   * 调用线索：this._fadeInBottom.pause、this._fadeInRight.pause、this._fadeOutBottom.pause、this._fadeOutRight.pause。
   */
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
  /** @eyes-analysis
   * 执行 toggleLayer 对应的组件业务步骤；调用 this._app.getManager。
   * 调用线索：t.target?.getAttribute、this._app.getManager、this._app.getManager("layer").toggleLayer。
   */
  toggleLayer(t) {
    const e = t.target?.getAttribute("key") ?? t;
    this._app.getManager("layer").toggleLayer(e, {
      category: this._categories[e]
    });
  }
  /** @eyes-analysis
   * 执行 handleLayerToggle 对应的组件业务步骤；调用 this.getState, this.setState, this._components.find, this._app.getManager。
   * 调用线索：document.getElementById、e.getConfig、o.getState、o.toggle、t.getConfig等。
   */
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
  /** @eyes-analysis
   * 执行 isCategoryEnabled 对应的组件业务步骤；调用 List.contains。
   * 调用线索：this._children[t]?.classList.contains。
   */
  isCategoryEnabled(t) {
    return !this._children[t]?.classList.contains("disabled");
  }
  /** @eyes-analysis
   * 执行 setCategoryEnabled 对应的组件业务步骤；调用 List.toggle。
   * 调用线索：this._children[t]?.classList.toggle。
   */
  setCategoryEnabled(t, e = true) {
    this._children[t]?.classList.toggle("disabled", !e);
  }
  /** @eyes-analysis
   * 执行 hide 对应的组件业务步骤；调用 this.getState, super.hide, EyesPublicApi.AppUtils.isMobileMode, EyesPublicApi.AnimationUtils.directionalFade, this._fadeOutBottom.play, this._fadeOutRight.play；写入 _fadeOutBottom, _fadeOutRight。
   * 状态写入：_fadeOutBottom、_fadeOutRight。
   * 调用线索：EyesPublicApi.AnimationUtils.directionalFade、EyesPublicApi.AppUtils.isMobileMode、document.body.style.setProperty、super.hide、this._fadeOutBottom.play等。
   */
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
  /** @eyes-analysis
   * 执行 show 对应的组件业务步骤；调用 super.show, EyesPublicApi.AppUtils.isMobileMode, EyesPublicApi.AnimationUtils.directionalFade, this._fadeInBottom.play, this._fadeInRight.play；写入 _fadeInBottom, _fadeInRight。
   * 状态写入：_fadeInBottom、_fadeInRight。
   * 调用线索：EyesPublicApi.AnimationUtils.directionalFade、EyesPublicApi.AppUtils.isMobileMode、document.body.style.setProperty、super.show、this._fadeInBottom.play等。
   */
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
  /** @eyes-analysis
   * 执行 _updatePosition 对应的组件业务步骤；调用 EyesPublicApi.AppUtils.isMobileMode, this.show；写入 _lastMode。
   * 状态写入：_lastMode。
   * 调用线索：EyesPublicApi.AppUtils.isMobileMode、this.show。
   */
  _updatePosition() {
    const lastMode = EyesPublicApi.AppUtils.isMobileMode();
    lastMode !== this._lastMode && (this._lastMode = lastMode, this._state.isVisible && this.show());
  }
  /** @eyes-analysis
   * 挂载 DOM 并登记窗口和业务订阅；调用 super.__enable, this._createAnimations。
   * 调用线索：super.__enable、this._createAnimations。
   */
  __enable() {
    super.__enable();
    this._createAnimations();
  }
  /** @eyes-analysis
   * 卸载 DOM 并取消业务订阅；调用 super.__disable；写入 _fadeInRight, _fadeOutRight, _fadeInBottom, _fadeOutBottom。
   * 状态写入：_fadeInBottom、_fadeInRight、_fadeOutBottom、_fadeOutRight。
   * 调用线索：super.__disable。
   */
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
