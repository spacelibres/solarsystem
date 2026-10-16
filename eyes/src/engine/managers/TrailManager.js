/** @eyes-analysis
 * 文件职责：按图层与实体类别创建、显示、隐藏轨迹和轨道线，处理悬停宽度/颜色。
 * 依据：import ../pioneer/index.js；import ../solar-system/public-api.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1252118-1257302.
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
/** @eyes-analysis
 * 类职责：按图层与实体类别创建、显示、隐藏轨迹和轨道线，处理悬停宽度/颜色。
 * 继承：EyesPublicApi.BaseManager；导出：TrailManager。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class TrailManager extends EyesPublicApi.BaseManager {
  /** @eyes-analysis
   * 【结构证据】写入 `_colors`、`_hiddenIds`、`_ids`、`_opacity`、`_orbitLineEntityNames`、`_orbitLinesOpts`、`_scene`、`_width`；调用 `SolarSystemSceneExports.Entity.getEntityNamesInGroup`、`SolarSystemSceneExports.Entity.getEntityNamesInGroup("planets").add`、`new Pioneer.Color`、`super`、`this.bindFunctions`。
   * 状态写入：_colors、_hiddenIds、_ids、_opacity、_orbitLineEntityNames、_orbitLinesOpts、_scene、_width。
   * 调用线索：SolarSystemSceneExports.Entity.getEntityNamesInGroup、SolarSystemSceneExports.Entity.getEntityNamesInGroup("planets").add、new Pioneer.Color、super、this.bindFunctions。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_scene`。
   * 状态写入：_scene。
   */
  setScene(scene) {
    this._scene = scene;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void console.warn("Trail already exists for",t)` 或 `e`；调用 `console.warn`、`this._ids.push`、`this._scene.getEntity`、`this._scene.getEntity(t).addComponent`、`this._scene.getEntity(t).getComponent`。
   * 调用线索：console.warn、this._ids.push、this._scene.getEntity、this._scene.getEntity(t).addComponent、this._scene.getEntity(t).getComponent。
   */
  create(t) {
    if (this._scene.getEntity(t).getComponent(Pioneer.TrailComponent)) return void console.warn("Trail already exists for", t);
    const e = this._scene.getEntity(t).addComponent(Pioneer.TrailComponent);
    this._ids.push(t);
    return e;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Array.isArray`、`n.setStartTime`、`this._scene.getEntity`、`this._scene.getEntity(t[i]).getComponent`。
   * 调用线索：Array.isArray、n.setStartTime、this._scene.getEntity、this._scene.getEntity(t[i]).getComponent。
   */
  setStartTime(t, e) {
    Array.isArray(t) || (t = [t]);
    for (let i = 0; i < t.length; i++) {
      const n = this._scene.getEntity(t[i]).getComponent(Pioneer.TrailComponent);
      n && n.setStartTime(e);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Array.isArray`、`n.setEndTime`、`this._scene.getEntity`、`this._scene.getEntity(t[i]).getComponent`。
   * 调用线索：Array.isArray、n.setEndTime、this._scene.getEntity、this._scene.getEntity(t[i]).getComponent。
   */
  setEndTime(t, e) {
    Array.isArray(t) || (t = [t]);
    for (let i = 0; i < t.length; i++) {
      const n = this._scene.getEntity(t[i]).getComponent(Pioneer.TrailComponent);
      n && n.setEndTime(e);
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `a.setGlowWidth`、`a.setLineWidth`、`c.getColor`、`c.setColor`、`color.copy`、`new Pioneer.Color`。
   * 调用线索：a.setGlowWidth、a.setLineWidth、c.getColor、c.setColor、color.copy等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `Array.isArray`、`n.setAlphaFade`、`this._scene.getEntity`、`this._scene.getEntity(t[i]).getComponent`。
   * 调用线索：Array.isArray、n.setAlphaFade、this._scene.getEntity、this._scene.getEntity(t[i]).getComponent。
   */
  setFade(t, e) {
    Array.isArray(t) || (t = [t]);
    for (let i = 0; i < t.length; i++) {
      const n = this._scene.getEntity(t[i]).getComponent(Pioneer.TrailComponent);
      n && n.setAlphaFade(e);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Array.isArray`、`o.setWidths`、`this._scene.getEntity`、`this._scene.getEntity(t[n]).getComponent`。
   * 调用线索：Array.isArray、o.setWidths、this._scene.getEntity、this._scene.getEntity(t[n]).getComponent。
   */
  setWidths(t, e, i) {
    Array.isArray(t) || (t = [t]);
    for (let n = 0; n < t.length; n++) {
      const o = this._scene.getEntity(t[n]).getComponent(Pioneer.TrailComponent);
      o && o.setWidths(e, i);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `t.setWidths`、`this._scene.getEntity`、`this._scene.getEntity(n).getComponent`。
   * 调用线索：t.setWidths、this._scene.getEntity、this._scene.getEntity(n).getComponent。
   */
  setMultipleWidths(t, e, i) {
    for (const n of t) {
      const t = this._scene.getEntity(n).getComponent(Pioneer.TrailComponent);
      t && t.setWidths(e, i);
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e?e.getColor():null`；调用 `e.getColor`、`this._scene.getEntity`、`this._scene.getEntity(t).getComponent`。
   * 调用线索：e.getColor、this._scene.getEntity、this._scene.getEntity(t).getComponent。
   */
  getColor(t) {
    const e = this._scene.getEntity(t).getComponent(Pioneer.TrailComponent);
    return e ? e.getColor() : null;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Array.isArray`、`o.setColor`、`this._scene.getEntity`、`this._scene.getEntity(n).getComponent`。
   * 调用线索：Array.isArray、o.setColor、this._scene.getEntity、this._scene.getEntity(n).getComponent。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `layerManager.getLayer`、`sceneManager.setVisibility`、`t.getName`、`this._app.getManager`、`this._orbitLineEntityNames.has`、`this.createOrbitLine`。
   * 调用线索：layerManager.getLayer、sceneManager.setVisibility、t.getName、this._app.getManager、this._orbitLineEntityNames.has等。
   */
  setUpTrail(t) {
    const layerManager = this._app.getManager("layer");
    const sceneManager = this._app.getManager("scene");
    const s = t.getName();
    const n = layerManager.getLayer("trails");
    const o = this._orbitLineEntityNames.has(s);
    o && this.createOrbitLine(t);
    (null !== n && !n.visible || o) && sceneManager.setVisibility(false, s);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Array.isArray`、`console.warn`、`n.setEnabled`、`this._hiddenIds.indexOf`、`this._hiddenIds.splice`、`this._scene.getEntity`。
   * 调用线索：Array.isArray、console.warn、n.setEnabled、this._hiddenIds.indexOf、this._hiddenIds.splice等。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_hiddenIds`；调用 `Array.isArray`、`i.setEnabled`、`this._scene.getEntity`、`this._scene.getEntity(hiddenIds[e]).getComponent`。
   * 状态写入：_hiddenIds。
   * 调用线索：Array.isArray、i.setEnabled、this._scene.getEntity、this._scene.getEntity(hiddenIds[e]).getComponent。
   */
  hide(hiddenIds = null) {
    null === hiddenIds ? hiddenIds = this._ids : Array.isArray(hiddenIds) || (hiddenIds = [hiddenIds]);
    this._hiddenIds = hiddenIds;
    for (let e = 0; e < hiddenIds.length; e++) {
      const i = this._scene.getEntity(hiddenIds[e]).getComponent(Pioneer.TrailComponent);
      i && i.setEnabled(false);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `n.getComponent`、`n.getName`、`o.setEnabled`、`scene.getEntityAt`、`scene.getNumEntities`、`this._app.getManager`。
   * 调用线索：n.getComponent、n.getName、o.setEnabled、scene.getEntityAt、scene.getNumEntities等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `i.setColor`、`i.setEnabled`、`i.setGlowWidth`、`i.setLineWidth`、`i.setVisibleInterval`、`t.addComponent`。
   * 调用线索：i.setColor、i.setEnabled、i.setGlowWidth、i.setLineWidth、i.setVisibleInterval等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `this._orbitLineEntityNames.forEach`、`this._scene.getEntity`。
   * 调用线索：i?.setEnabled、this._orbitLineEntityNames.forEach、this._scene.getEntity、this._scene.getEntity(e)?.getComponent。
   */
  toggleOrbits(t) {
    this._orbitLineEntityNames.forEach(e => {
      const i = this._scene.getEntity(e)?.getComponent(SolarSystemSceneExports.OrbitLineComponent);
      i?.setEnabled(t);
    });
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._ids`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get ids() {
    return this._ids;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (t)；本访问器没有 AST 可见的 this 字段直接赋值；调用 `Array.isArray`、`this._ids.includes`、`this._ids.push`、`this._scene.getEntity`、`this._scene.getEntity(i).getComponent`。
   * 调用线索：Array.isArray、this._ids.includes、this._ids.push、this._scene.getEntity、this._scene.getEntity(i).getComponent。
   */
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
