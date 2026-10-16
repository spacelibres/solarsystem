// Recovered from app.js:690604-698144.
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class LabelManager extends EyesPublicApi.BaseManager {
  constructor(t, scene, viewport) {
    super(t);
    this._scene = scene;
    this._eventNames.push("hoverchange", "labelclicked");
    this._initCallbacks();
    this._viewport = viewport;
    this._labelQuadtree = new SolarSystemSceneExports.LabelQuadtree(viewport);
    this._focusRect = new Pioneer.Rect();
    this._focusSize = .05;
    this._focusIntersectionRects = new Pioneer.FastMap();
    this._iconMap = {
      Universe: "no-icon",
      Galaxy: "no-icon",
      Star: "no-icon",
      Barycenter: "icon-circle-white-small",
      "Landing site": "icon-hexagon",
      Moon: "icon-circle-white-small",
      Asteroid: "icon-circle-white-small",
      "Dwarf Planet": "icon-circle-white-small",
      Comet: "icon-circle-white-small",
      Spacecraft: "icon-hexagon",
      Planet: "icon-circle-",
      Default: "icon-circle-white-small"
    };
    this._weightMap = {
      Universe: 100,
      Galaxy: 100,
      Star: 100,
      Barycenter: 0,
      "Landing site": 5,
      Asteroid: 15,
      Comet: 15,
      Moon: 25,
      "Dwarf Planet": 28,
      Spacecraft: 30,
      Planet: 50,
      Constellation: 10
    };
    this._weights = {};
    this._labels = {};
    this._isClickable = true;
    this._exceptions = new Set();
    this.bindFunctions(["update", "addLabel", "removeLabel", "toggleLabels", "toggleLabelForEntity", "toggleIcons", "toggleIconForEntity", "_clickCallback", "setUpLabel", "setUpIcon"]);
  }
  update() {
    const t = this._viewport.getBounds().size;
    const e = Math.max(t.x, t.y) * this._focusSize;
    this._focusRect.set((t.x - e) / 2, (t.y - e) / 2, e, e);
    this._labelQuadtree.setBounds("__focus", this._focusRect);
    this._labelQuadtree.update();
  }
  initLabelWeights(t, e = true) {
    e && (this._weights = {});
    const labelManager = this._app.getManager("label");
    for (const s of Object.keys(t)) {
      const n = t[s].category;
      this._weights[s] = {};
      void 0 !== this._weightMap[n] ? this._weights[s].weight = this._weightMap[n] : this._weights[s].weight = 1;
      e && labelManager._labels[s] && labelManager.setWeight(s, this._weights[s].weight);
    }
  }
  setWeight(t, e) {
    try {
      this._labelQuadtree.setWeight(t, e);
      return true;
    } catch (t) {
      return false;
    }
  }
  resetWeight(t) {
    const contentManager = this._app.getManager("content");
    const i = contentManager?.getEntityInfo(t)?.category;
    const s = this.getDefaultWeight(t, i);
    this._labelQuadtree.setWeight(t, s);
  }
  getDefaultWeight(t, e = void 0) {
    return t.startsWith("constellation_") ? this._weightMap.Constellation : Object.keys(this._weights).length > 0 && void 0 !== this._weights[t] ? this._weights[t].weight : void 0 !== this._weightMap[e] ? this._weightMap[e] : 0;
  }
  getWeightMap() {
    return this._weightMap;
  }
  setWeightMap(weightMap) {
    this._weightMap = weightMap;
  }
  setUpLabel(t) {
    const contentManager = this._app.getManager("content");
    const layerManager = this._app.getManager("layer");
    const s = contentManager.getEntityInfo(t.getName())?.category;
    const n = this.getDefaultWeight(t.getName(), s);
    this.addLabel(t, n);
    this.setLabelProps({
      getLabelClass: t => `no-select ${contentManager.getClassName(t) ?? ""}`
    }, [t.getName()]);
    const o = t.getName();
    const r = layerManager.getLayer("labels");
    null === r || r.visible || this.toggleLabelForEntity(false, o);
  }
  addLabel(t, e) {
    t.getComponent(Pioneer.DivComponent) && (this._labels[t.getName()] = {
      name: t.getName(),
      el: t.getComponent(Pioneer.DivComponent).getDiv(),
      isClickable: true
    }, this._labelQuadtree.addEntity(t, e));
  }
  removeLabel(t) {
    t.getComponent(Pioneer.DivComponent) && (delete this._labels[t.getName()], this._labelQuadtree.removeEntity(t.getName()));
  }
  setUpIcon(t) {
    const layerManager = this._app.getManager("layer");
    const i = t.getName();
    const s = layerManager.getLayer("icons");
    null === s || s.visible || this.toggleIconForEntity(false, i);
  }
  setLabelClickable(t, e) {
    this._labels[t] && (this._labels[t].isClickable = e, this._labels[t].el.classList.toggle("clickable", e));
  }
  setClickable(isClickable) {
    this._isClickable = isClickable;
    for (let e = 0, i = this._scene.getNumEntities(); e < i; e++) {
      const i = this._scene.getEntityAt(e).getComponent(Pioneer.DivComponent);
      if (null !== i) {
        const e = i.getDiv();
        isClickable ? e.classList.remove("unclickable") : e.classList.add("unclickable");
      }
    }
  }
  addException(t) {
    this._exceptions.add(t);
  }
  removeException(t) {
    this._exceptions.delete(t);
  }
  addExceptions(t) {
    t.forEach(t => this._exceptions.add(t));
  }
  removeExceptions(t) {
    t.forEach(t => this._exceptions.delete(t));
  }
  toggleLabels(t, {
    scene: scene
  } = {}) {
    void 0 === scene && (scene = this._scene);
    for (let i = 0; i < scene.getNumEntities(); i++) this.toggleLabelForEntity(t, scene.getEntityAt(i).getName(), {
      scene: scene
    });
  }
  toggleLabelForEntity(t, e, {
    scene: scene
  } = {}) {
    let n = scene;
    void 0 === n && (n = this._scene);
    const o = n.getEntity(e);
    const r = o.getComponent(Pioneer.DivComponent);
    this._exceptions.has(o.getName()) || null !== r && (t ? r.getDiv().lastElementChild?.classList.remove("hidden") : r.getDiv().lastElementChild?.classList.add("hidden"));
  }
  toggleIcons(t, {
    scene: scene
  } = {}) {
    void 0 === scene && (scene = this._scene);
    for (let i = 0; i < scene.getNumEntities(); i++) this.toggleIconForEntity(t, scene.getEntityAt(i).getName(), {
      scene: scene
    });
  }
  toggleIconForEntity(t, e, {
    scene: scene
  } = {}) {
    let n = scene;
    void 0 === n && (n = this._scene);
    const o = n.getEntity(e);
    const r = o.getComponent(Pioneer.DivComponent);
    this._exceptions.has(o.getName()) || null !== r && (t ? r.getDiv().firstElementChild?.classList.remove("hidden") : r.getDiv().firstElementChild?.classList.add("hidden"));
  }
  _getLink(t) {
    return `/${t}`;
  }
  _clickCallback(t) {
    const routerManager = this._app.getManager("router");
    const i = this._getLink(t.getName());
    const s = "string" == typeof i ? i : i.path ?? "";
    const {
      options: n = {
        keepTime: true
      },
      query: o = {}
    } = "object" == typeof i && i;
    routerManager.navigate(o, s, n);
  }
  setLabelProps({
    getLabelClass: getLabelClass,
    getIconClass: getIconClass,
    getTextClass: getTextClass,
    handleClick: handleClick,
    handleTouch: handleTouch,
    handleMouseEnter: handleMouseEnter,
    handleMouseLeave: handleMouseLeave
  } = {}, l = Object.keys(this._labels), c, h) {
    let d = c;
    d || (d = this._scene);
    let u = h;
    u || (u = d.getEntity("camera"));
    const p = u.getComponent(Pioneer.CameraComponent);
    for (const c of l) {
      const l = d.getEntity(c);
      const h = this._app.getManager("content").getEntityInfo(c);
      const u = l.getComponent(Pioneer.DivComponent);
      if (null === u) continue;
      u.setActiveCamera(p);
      const _ = u.getDiv();
      const m = "function" == typeof getLabelClass ? getLabelClass(c) : "";
      _.className += ` ${m} clickable`;
      const g = document.createElement("span");
      const y = document.createElement("span");
      const f = this._iconMap[h?.category] ?? this._iconMap.Default;
      const T = "Planet" === h?.category ? c : "";
      const b = "function" == typeof getIconClass ? getIconClass(c) : "";
      g.className = `icon ${f}${T} ${b}`;
      y.className = `text ${"function" == typeof getTextClass ? getTextClass(c) : ""}`;
      y.innerHTML = h?.displayName || h?.iauName || _.innerHTML;
      _.innerHTML = "";
      _.appendChild(g);
      _.appendChild(y);
      const E = async t => {
        const e = this._labels[c];
        this._isClickable && e?.isClickable && null !== this._clickCallback && (this._clickCallback(l), t.preventDefault(), this.triggerCallbacks("labelclicked", [true]));
      };
      const S = async t => {
        const e = this._labels[c];
        this._isClickable && e?.isClickable && (this.app.isDragging() || this.app.isTouchMax() || null === this._clickCallback || (this._clickCallback(l), t.preventDefault(), this.triggerCallbacks("labelclicked", [true])));
      };
      _.addEventListener("mousedown", t => {
        t.preventDefault();
        this.triggerCallbacks("labelclicked", [false]);
      });
      _.addEventListener("touchstart", t => {
        t.preventDefault();
        this.triggerCallbacks("labelclicked", [false]);
      });
      const v = "function" == typeof handleClick ? t => handleClick(t, c) : E;
      const C = "function" == typeof handleTouch ? t => handleTouch(t, c) : S;
      const x = "function" == typeof handleMouseEnter ? t => handleMouseEnter(t, c) : () => this.triggerCallbacks("hoverchange", [c, true]);
      const I = "function" == typeof handleMouseLeave ? t => handleMouseLeave(t, c) : () => this.triggerCallbacks("hoverchange", [c, false]);
      null !== handleClick && "true" !== _.getAttribute("hasClickListener") && (_.setAttribute("hasClickListener", "true"), _.addEventListener("click", v));
      null !== handleTouch && "true" !== _.getAttribute("hasTouchEndListener") && (_.setAttribute("hasTouchEndListener", "true"), _.addEventListener("touchend", C));
      null !== handleMouseEnter && "true" !== _.getAttribute("hasMouseEnterListener") && (_.setAttribute("hasMouseEnterListener", "true"), _.addEventListener("mouseenter", x));
      null !== handleMouseLeave && "true" !== _.getAttribute("hasMouseLeaveListener") && (_.setAttribute("hasMouseLeaveListener", "true"), _.addEventListener("mouseleave", I));
      "true" !== _.getAttribute("hasMouseMoveListener") && (_.setAttribute("hasMouseMoveListener", "true"), _.addEventListener("mousemove", t => {
        t.preventDefault();
      }, true));
    }
  }
  addClassToLabels(t, e) {
    for (const i of e) {
      const e = this._scene.getEntity(i);
      const n = e?.getComponent(Pioneer.DivComponent)?.getDiv();
      n?.classList.add(t);
    }
  }
  removeClassFromLabels(t, e) {
    for (const i of e) {
      const e = this._scene.getEntity(i);
      const n = e?.getComponent(Pioneer.DivComponent)?.getDiv();
      n?.classList.remove(t);
    }
  }
}
export { LabelManager };
