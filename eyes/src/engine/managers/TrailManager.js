// Recovered from app.js:1252118-1257302.
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class TrailManager extends EyesPublicApi.BaseManager {
  constructor(t, scene) {
    super(t);
    this._scene = scene;
    this._ids = [];
    this._hiddenIds = [];
    this._opacity = {
      primary: .75,
      secondary: .35,
      hover: 1
    };
    this._width = {
      default: [0, 2],
      hover: [2, 4]
    };
    this._orbitLinesOpts = {
      lineWidth: {
        default: 1.2,
        hover: 2
      },
      glowWidth: {
        default: 0,
        hover: 0
      },
      visibleInterval: Pioneer.VisibleInterval.DefaultVisibleFar
    };
    this._orbitLineEntityNames = SolarSystemSceneExports.Entity.getEntityNamesInGroup("planets").add("moon");
    this._colors = {
      default: new Pioneer.Color(1, 1, 1, this._opacity.secondary),
      mercury: new Pioneer.Color(151 / 255, 104 / 255, 172 / 255, this._opacity.primary),
      venus: new Pioneer.Color(176 / 255, 121 / 255, 25 / 255, this._opacity.primary),
      earth: new Pioneer.Color(0, .6, .8, this._opacity.primary),
      mars: new Pioneer.Color(154 / 255, 78 / 255, 25 / 255, this._opacity.primary),
      jupiter: new Pioneer.Color(218 / 255, 139 / 255, 114 / 255, this._opacity.primary),
      saturn: new Pioneer.Color(213 / 255, 193 / 255, 135 / 255, this._opacity.primary),
      uranus: new Pioneer.Color(104 / 255, .8, 218 / 255, this._opacity.primary),
      neptune: new Pioneer.Color(112 / 255, 140 / 255, 227 / 255, this._opacity.primary)
    };
    this.bindFunctions(["onHoverChange", "setUpTrail", "toggleTrails", "toggleOrbits"]);
  }
  setScene(scene) {
    this._scene = scene;
  }
  create(t) {
    if (this._scene.getEntity(t).getComponent(Pioneer.TrailComponent)) return void console.warn("Trail already exists for", t);
    const e = this._scene.getEntity(t).addComponent(Pioneer.TrailComponent);
    this._ids.push(t);
    return e;
  }
  setStartTime(t, e) {
    Array.isArray(t) || (t = [t]);
    for (let i = 0; i < t.length; i++) {
      const n = this._scene.getEntity(t[i]).getComponent(Pioneer.TrailComponent);
      n && n.setStartTime(e);
    }
  }
  setEndTime(t, e) {
    Array.isArray(t) || (t = [t]);
    for (let i = 0; i < t.length; i++) {
      const n = this._scene.getEntity(t[i]).getComponent(Pioneer.TrailComponent);
      n && n.setEndTime(e);
    }
  }
  onHoverChange(t, e, i = false) {
    const o = this._scene.getEntity(t);
    const r = this._scene.getEntity(t).getComponent(Pioneer.TrailComponent);
    const a = o?.getComponent(SolarSystemSceneExports.OrbitLineComponent);
    if (!o || !r && !a) return;
    const color = new Pioneer.Color();
    const c = r ?? a;
    const h = e ? "hover" : "default";
    if (a) {
      const {
        lineWidth: lineWidth,
        glowWidth: glowWidth
      } = this._orbitLinesOpts;
      a.setLineWidth(lineWidth[h]);
      a.setGlowWidth(glowWidth[h]);
    } else if (r) {
      const t = o.trailHover?.width?.[h] ?? this._width[h];
      r.setWidths(...t);
    }
    const {
      primary: primary,
      secondary: secondary,
      hover: hover
    } = this._opacity;
    const _ = e ? hover : this._colors[t] ? primary : secondary;
    color.copy(c.getColor());
    color.a = _;
    c.setColor(color);
    i && r.setAlphaFade(color.a);
  }
  setFade(t, e) {
    Array.isArray(t) || (t = [t]);
    for (let i = 0; i < t.length; i++) {
      const n = this._scene.getEntity(t[i]).getComponent(Pioneer.TrailComponent);
      n && n.setAlphaFade(e);
    }
  }
  setWidths(t, e, i) {
    Array.isArray(t) || (t = [t]);
    for (let n = 0; n < t.length; n++) {
      const o = this._scene.getEntity(t[n]).getComponent(Pioneer.TrailComponent);
      o && o.setWidths(e, i);
    }
  }
  setMultipleWidths(t, e, i) {
    for (const n of t) {
      const t = this._scene.getEntity(n).getComponent(Pioneer.TrailComponent);
      t && t.setWidths(e, i);
    }
  }
  getColor(t) {
    const e = this._scene.getEntity(t).getComponent(Pioneer.TrailComponent);
    return e ? e.getColor() : null;
  }
  setColor(t, e = null) {
    Array.isArray(t) || (t = [t]);
    for (let i = 0; i < t.length; i++) {
      const n = t[i];
      const o = this._scene.getEntity(n).getComponent(Pioneer.TrailComponent);
      if (o) {
        const t = e instanceof Pioneer.Color ? e : this._colors[n] || this._colors.default;
        o.setColor(t);
      }
    }
  }
  setUpTrail(t) {
    const layerManager = this._app.getManager("layer");
    const sceneManager = this._app.getManager("scene");
    const s = t.getName();
    const n = layerManager.getLayer("trails");
    const o = this._orbitLineEntityNames.has(s);
    o && this.createOrbitLine(t);
    (null !== n && !n.visible || o) && sceneManager.setVisibility(false, s);
  }
  show(t = null) {
    null === t ? t = this._hiddenIds.length > 0 ? this._hiddenIds : this._ids : Array.isArray(t) || (t = [t]);
    for (let e = 0; e < t.length; e++) {
      const i = t[e];
      const n = this._scene.getEntity(i).getComponent(Pioneer.TrailComponent);
      if (n) {
        const t = this._hiddenIds.indexOf(i);
        -1 !== t && this._hiddenIds.splice(t, 1);
        n.setEnabled(true);
      } else console.warn("TrailManager.show: Trail does not exist - ", i);
    }
  }
  hide(hiddenIds = null) {
    null === hiddenIds ? hiddenIds = this._ids : Array.isArray(hiddenIds) || (hiddenIds = [hiddenIds]);
    this._hiddenIds = hiddenIds;
    for (let e = 0; e < hiddenIds.length; e++) {
      const i = this._scene.getEntity(hiddenIds[e]).getComponent(Pioneer.TrailComponent);
      i && i.setEnabled(false);
    }
  }
  toggleTrails(t, {
    scene: scene
  } = {}) {
    void 0 === scene && (scene = this._scene);
    for (let i = 0; i < scene.getNumEntities(); i++) {
      const n = scene.getEntityAt(i);
      const o = n.getComponent(Pioneer.TrailComponent);
      if (null !== o) {
        const e = this._app.getManager("content").getEntityInfo(n.getName());
        if (e) {
          const i = e.category;
          const s = e.subcategory;
          const r = this._app.getManager("layer").getLayerFromCategory(s) || this._app.getManager("layer").getLayerFromCategory(i);
          const {
            forceVisible: a = false
          } = this.app.getManager("scene").getEntityStatus(n.getName()) || {};
          null === r || r.visible || a ? o.setEnabled(t) : o.setEnabled(false);
        } else o.setEnabled(t);
      }
    }
  }
  createOrbitLine(t) {
    const e = t.getComponent(Pioneer.TrailComponent);
    e && t.removeComponent(e);
    const i = t.addComponent(SolarSystemSceneExports.OrbitLineComponent);
    const {
      lineWidth: lineWidth,
      glowWidth: glowWidth,
      visibleInterval: visibleInterval
    } = this._orbitLinesOpts;
    const l = this._colors[t.getName()] ?? this._colors.default;
    i.setColor(l);
    i.setVisibleInterval(visibleInterval);
    i.setLineWidth(lineWidth.default);
    i.setGlowWidth(glowWidth.default);
    const c = this._app.getManager("layer").getLayer("orbits").visible;
    i.setEnabled(c);
  }
  toggleOrbits(t) {
    this._orbitLineEntityNames.forEach(e => {
      const i = this._scene.getEntity(e)?.getComponent(SolarSystemSceneExports.OrbitLineComponent);
      i?.setEnabled(t);
    });
  }
  get ids() {
    return this._ids;
  }
  set ids(t) {
    Array.isArray(t) || (t = [t]);
    for (let e = 0; e < t.length; e++) {
      const i = t[e];
      if (this._ids.includes(i)) continue;
      this._scene.getEntity(i).getComponent(Pioneer.TrailComponent) && this._ids.push(i);
    }
  }
}
export { TrailManager };
