/** @eyes-analysis
 * 文件职责：对象内容中的相机视角选项
 * 依据：imports: ../../engine/pioneer/index.js, ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/CameraViewBlockTemplate.html, ../../styles/extracted/CameraViewBlockStyles.js；manager dependencies: content, scene, camera, cameraFollow, trajectory, router
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1465881-1476838.
import * as Pioneer from "../../engine/pioneer/index.js";
import "../../framework/eyes/index.js";
import * as SolarSystemPublicApi from "../../app/public-api.js";
import CameraViewBlockTemplate from "../templates/CameraViewBlockTemplate.html";
import "../../styles/extracted/CameraViewBlockStyles.js";
var getCameraViewBlockTemplate = () => CameraViewBlockTemplate;
/** @eyes-analysis
 * 类职责：对象内容中的相机视角选项；继承 SolarSystemPublicApi.BaseContentBlock
 * 继承：SolarSystemPublicApi.BaseContentBlock；导出：CameraViewBlock。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class CameraViewBlock extends SolarSystemPublicApi.BaseContentBlock {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 this._app.cameraScripts.goToCelestialObject, this._app.getManager, this._app.cameraScripts.goToSpacecraft, this._app.pioneer.getScene, this.app.getView, this._app.cameraScripts.alignObjects, this._app.cameraScripts.alignSpacecraftPlanet, this._app.cameraScripts.goToInstrument, this._app.cameraScripts.goToSystem, this._app.cameraScripts.showLocationInParentSystem, this._app.cameraScripts.showLocationInSolarSystem, this.app.getManager, FollowManager.initSearch, FollowManager.registerCallback；写入 onLoaded, _cameraOptions, _followId, _activeCameraOptions, _currentCameraView, _prevCameraView, _activeCamOptIndex, _prevCamOptIndex, _optionIndexMap, _trajectoryViewId, _defaultViewIndex…
   * 状态写入：_activeCamOptIndex、_activeCameraOptions、_cameraOptions、_currentCameraView、_defaultViewIndexOverride、_entityId、_followId、_optionIndexMap等；完整记录见索引。
   * 调用线索：cameraFollowManager.initSearch、cameraFollowManager.registerCallback、e.addController、e.getController、e?.getController等。
   */
  constructor(t, e = {}) {
    e.config = {
      defaultSelectionIndex: 0,
      ...e.config
    };
    super(t, null, {
      category: "",
      ...e
    });
    this.onLoaded = [];
    this._cameraOptions = {
      nearObject: (t, e) => ({
        type: "nearby",
        text: "Nearby",
        id: "nearObject-" + e,
        onSelect: async () => {
          await this._app.cameraScripts.goToCelestialObject(e);
        }
      }),
      nearSpacecraft: (t, e) => ({
        type: "nearby",
        text: "Nearby",
        id: "nearSpacecraft-" + e,
        onSelect: async () => {
          const t = this._app.getManager("content").getEntityInfo(e);
          const i = this._app.getManager("scene").getCMTSEntity(e);
          const n = i?.getComponent(Pioneer.CMTSComponent);
          if (i && n && (this._app.getManager("scene").addLoading(i.getName(), "cmts"), this._app.getManager("camera").updateLighting("flood")), await this._app.cameraScripts.goToSpacecraft(e, {
            planeId: i?.getName() ?? "earth",
            horizontalOffset: t?.horizontalOffset ?? 0,
            verticalOffset: t?.verticalOffset ?? 0
          }), i) {
            const e = this._app.pioneer.getScene("main").getEntity("camera");
            if (e) {
              const n = e?.getController(Pioneer.GroundClampController);
              n && e?.removeController(n);
              const o = e.addController(Pioneer.GroundClampController, "groundClampLander", e.getController(Pioneer.AlignController));
              o.setGroundEntityRef(i.getName());
              o.setClampOnlyIfBelow(true);
              const r = "Landing site" === t?.category ? .05 : .001;
              o.setDistanceFromGround(r);
            }
            n && (i.getComponent(Pioneer.SpheroidLODComponent, "basic").setEnabled(false), n.setMaxLevel(12), await this._app.getManager("scene").terrainIsReady(n), this._app.getManager("scene").removeLoading(i.getName(), "cmts"));
          }
        }
      }),
      nearEvent: (t, e) => ({
        type: "nearby",
        text: "Nearby",
        id: "nearEvent-" + e,
        onSelect: async () => {
          const {
            _eventDesc: _eventDesc,
            _eventInfo: _eventInfo
          } = this.app.getView("event");
          const s = {
            ..._eventDesc,
            ..._eventInfo
          };
          const {
            target: target,
            duration: duration,
            distance: distance,
            horizontalOffset: horizontalOffset,
            verticalOffset: verticalOffset
          } = s;
          target && (await this._app.cameraScripts.alignObjects(e, target, {
            duration: duration,
            distance: distance,
            horizontalOffset: horizontalOffset,
            verticalOffset: verticalOffset
          }));
        }
      }),
      alignSpacecraftPlanet: (t, e) => ({
        type: "nearby",
        text: "Nearby ",
        id: "alignSpacecraftPlanet-" + e,
        onSelect: async () => {
          await this._app.cameraScripts.alignSpacecraftPlanet(e);
        }
      }),
      nearInstrument: (t, e, i) => ({
        type: "nearby",
        text: "Nearby",
        id: "nearInstrument-" + e,
        onSelect: async () => {
          await this._app.cameraScripts.goToInstrument(e, i);
        }
      }),
      system: (t, e) => ({
        type: "system",
        text: e || "System",
        id: "system-" + t,
        onSelect: async () => {
          await this._app.cameraScripts.goToSystem(t);
        }
      }),
      aboveParent: (t, e) => ({
        type: "system",
        text: e || "System",
        id: "aboveParent-" + t,
        onSelect: async () => {
          await this._app.cameraScripts.showLocationInParentSystem(t);
        }
      }),
      aboveSun: (t, e) => ({
        type: "system",
        text: "Outer",
        id: "aboveSun-" + t,
        onSelect: async () => {
          await this._app.cameraScripts.showLocationInSolarSystem(t, e);
        }
      }),
      cameraFollow: () => ({
        type: "follow",
        text: "Follow",
        id: "cameraFollow",
        onCreate: t => {
          const cameraFollowManager = this.app.getManager("cameraFollow");
          cameraFollowManager.initSearch(this._element);
          cameraFollowManager.registerCallback("cameraFollowUndo", this.goBackToPreviousView);
          cameraFollowManager.registerCallback("cameraFollowSelect", this.goToFollowCameraView);
        },
        onSelect: () => {
          this.app.getManager("cameraFollow").isEnabled || this.app.getManager("cameraFollow").setEnabled(true);
        },
        onDeselect: () => {
          this._followId = "";
          this.app.getManager("cameraFollow").setEnabled(false, {
            resetLimits: false,
            removeQueries: ["followId"]
          });
        }
      }),
      trajectory: t => ({
        type: "trajectory",
        text: "Trajectory",
        id: "trajectory",
        onCreate: async () => {
          this.app.getManager("trajectory").registerCallback("trajectorySelect", this.goToTrajectoryView);
        },
        onSelect: async () => {
          const e = this.app.pioneer.getScene("main")?.getEntity(t);
          e && (this.app.getManager("trajectory").setEnabled(true, t), this.app.getManager("trajectory").createUI(this._element));
        },
        onDeselect: () => {
          this.app.getManager("trajectory").setEnabled(false, this._entityId);
        }
      })
    };
    this._activeCameraOptions = [];
    this._currentCameraView = null;
    this._prevCameraView = null;
    this._activeCamOptIndex = -1;
    this._prevCamOptIndex = -1;
    this._optionIndexMap = {};
    this._followId = "";
    this._trajectoryViewId = "";
    this._defaultViewIndexOverride = void 0;
    this._entityId = "";
    this.bindFunctions(["goBackToPreviousView", "goToFollowCameraView", "goToTrajectoryView"]);
  }
  /** @eyes-analysis
   * 执行 _renderOptions 对应的组件业务步骤；调用 Text.toLowerCase, this._goToView, this._activeCameraOptions.push, this._children.cameraOptions.appendChild, this._setVariables；写入 _activeCameraOptions, _currentCameraView, _prevCameraView, _activeCamOptIndex, _prevCamOptIndex, _optionIndexMap。
   * 状态写入：_activeCamOptIndex、_activeCameraOptions、_children.cameraOptions.innerHTML、_currentCameraView、_optionIndexMap、_optionIndexMap[id]、_prevCamOptIndex、_prevCameraView。
   * 调用线索：d.innerText.toLowerCase、d.innerText.toLowerCase().split、d.innerText.toLowerCase().split(" ").join、d.setAttribute、document.createElement等。
   */
  _renderOptions(t, e = false) {
    this._children.cameraOptions.innerHTML = "";
    this._activeCameraOptions = [];
    this._currentCameraView = null;
    this._prevCameraView = null;
    this._activeCamOptIndex = -1;
    this._prevCamOptIndex = -1;
    this._optionIndexMap = {};
    for (let e = 0; e < t.length; e++) {
      let {
        text: text,
        id: id,
        onCreate: onCreate,
        onSelect: onSelect,
        onDeselect: onDeselect,
        type: type
      } = t[e];
      const l = e;
      void 0 !== this._optionIndexMap[id] && (id = id + "-" + e);
      this._optionIndexMap[id] = l;
      const c = "function" == typeof text ? text() : text;
      const h = document.createElement("li");
      h.className = "option clickable";
      const d = document.createElement("label");
      d.innerHTML = c;
      const u = `${d.innerText.toLowerCase().split(" ").join("-")}-radio-button`;
      d.setAttribute("for", u);
      const p = document.createElement("input");
      p.id = u;
      p.type = "radio";
      p.name = "camera-view";
      const _ = document.createElement("div");
      _.className = "icon " + type;
      _.ariaHidden = "true";
      h.appendChild(p);
      h.appendChild(_);
      h.appendChild(d);
      h.addEventListener("click", t => {
        this._activeCamOptIndex !== l ? this._goToView(id) : onSelect();
        p.blur();
      });
      const m = c;
      this._activeCameraOptions.push({
        id: id,
        optionTitle: m,
        option: h,
        radioButtonLabel: d,
        radioButton: p,
        onSelect: onSelect,
        onDeselect: onDeselect
      });
      this._children.cameraOptions.appendChild(h);
      "function" == typeof onCreate && onCreate(h);
    }
    this._setVariables(this._children.cameraOptions);
  }
  /** @eyes-analysis
   * 执行 _addPlanetOptions 对应的组件业务步骤；调用 this._cameraOptions.nearObject, this._cameraOptions.system, this._cameraOptions.cameraFollow, this._renderOptions。
   * 调用线索：this._cameraOptions.cameraFollow、this._cameraOptions.nearObject、this._cameraOptions.system、this._renderOptions。
   */
  _addPlanetOptions(t, e = false) {
    const i = t.displayName || t.iauName;
    const s = t.id;
    const n = [this._cameraOptions.nearObject(i, s), this._cameraOptions.system(s), this._cameraOptions.cameraFollow()];
    this._renderOptions(n, e);
  }
  /** @eyes-analysis
   * 执行 _addMoonOptions 对应的组件业务步骤；调用 this._app.getManager, this._cameraOptions.nearObject, this._cameraOptions.system, this._cameraOptions.cameraFollow, this._renderOptions。
   * 调用线索：this._app.getManager、this._app.getManager("scene").getParent、this._cameraOptions.cameraFollow、this._cameraOptions.nearObject、this._cameraOptions.system等。
   */
  _addMoonOptions(t, e = false) {
    const i = t.displayName || t.iauName;
    const s = t.id;
    const n = this._app.getManager("scene").getParent(s);
    const o = [this._cameraOptions.nearObject(i, s), this._cameraOptions.system(n), this._cameraOptions.cameraFollow()];
    this._renderOptions(o, e);
  }
  /** @eyes-analysis
   * 执行 _addStarOptions 对应的组件业务步骤；调用 this._cameraOptions.nearObject, this._cameraOptions.system, this._cameraOptions.cameraFollow, this._renderOptions。
   * 调用线索：this._cameraOptions.cameraFollow、this._cameraOptions.nearObject、this._cameraOptions.system、this._renderOptions。
   */
  _addStarOptions(t, e = false) {
    const i = t.displayName || t.iauName;
    const s = t.id;
    const n = [this._cameraOptions.nearObject(i, s), this._cameraOptions.system("inner_solar_system", "Inner"), this._cameraOptions.system("outer_solar_system", "Outer"), this._cameraOptions.cameraFollow()];
    this._renderOptions(n, e);
  }
  /** @eyes-analysis
   * 执行 _addSpacecraftOptions 对应的组件业务步骤；调用 this._app.getManager, this._app.getView, Manager.getEntityInfo, this._app.pioneer.getScene, Manager.hasLanded, this._cameraOptions.nearEvent, this._cameraOptions.cameraFollow, this._cameraOptions.nearInstrument, this._cameraOptions.nearSpacecraft, this._cameraOptions.aboveParent, this.app.getManager, Manager.hasTrajectoryOptions, this._cameraOptions.trajectory, this._cameraOptions.alignSpacecraftPlanet。
   * 调用线索：contentManager.getEntityInfo、contentManager.hasLanded、this._app.getManager、this._app.getManager("scene").getParent、this._app.getManager("scene").isReady等。
   */
  async _addSpacecraftOptions(t, e = false) {
    const contentManager = this._app.getManager("content");
    const trajectoryManager = this._app.getManager("trajectory");
    const {
      currentView: currentView
    } = this._app.getManager("router");
    const r = t.displayName || t.iauName;
    const a = t.id;
    if (await this._app.getManager("scene").isReady(a), a !== this._app.getView(currentView)?._target) return;
    const l = this._app.getManager("scene").getParent(a);
    let c = null;
    let h = false;
    if (l) {
      const t = contentManager.getEntityInfo(l);
      c = t?.displayName || t?.iauName;
      let e = l;
      "Landing site" === t?.category && (e = this._app.getManager("scene").getParent(l));
      h = this._app.pioneer.getScene("main").getEntity(e).getComponent(Pioneer.CMTSComponent);
    }
    const d = contentManager.hasLanded(t);
    const u = [];
    if ("event" === currentView) u.push(this._cameraOptions.nearEvent(r, a), this._cameraOptions.cameraFollow());else if (h || !d && "Landing site" !== t.category) {
      if ("Instrument" === t.category) u.push(this._cameraOptions.nearInstrument(r, a, t.cameraOptions), this._cameraOptions.nearSpacecraft(c, l));else {
        u.push(this._cameraOptions.nearSpacecraft(r, a), this._cameraOptions.aboveParent(a));
        u.push(this._cameraOptions.cameraFollow());
        const t = this.app.getManager("trajectory").getCustomMissions();
        trajectoryManager.hasTrajectoryOptions(a) && !t[a].disable && u.push(this._cameraOptions.trajectory(a));
      }
    } else u.push(this._cameraOptions.alignSpacecraftPlanet(r, a), this._cameraOptions.aboveParent(a));
    this._renderOptions(u, e);
  }
  /** @eyes-analysis
   * 执行 _addFeatureOptions 对应的组件业务步骤；调用 this._cameraOptions.nearObject, this._cameraOptions.system, this._renderOptions。
   * 调用线索：this._cameraOptions.nearObject、this._cameraOptions.system、this._renderOptions。
   */
  _addFeatureOptions(t, e = false) {
    const i = t.displayName || t.iauName;
    const s = t.id;
    const n = [this._cameraOptions.nearObject(i, s), this._cameraOptions.system(s)];
    this._renderOptions(n, e);
  }
  /** @eyes-analysis
   * 执行 _addDefaultOptions 对应的组件业务步骤；调用 this._app.getManager, Manager.getEntityInfo, this._cameraOptions.nearObject, this._cameraOptions.aboveParent, this._cameraOptions.cameraFollow, this._cameraOptions.aboveSun, this._renderOptions。
   * 调用线索：a.push、contentManager.getEntityInfo、this._app.getManager、this._app.getManager("scene").getParent、this._app.getManager("scene").isReady等。
   */
  async _addDefaultOptions(t, e) {
    const contentManager = this._app.getManager("content");
    const s = t.displayName || t.iauName;
    const n = t.id;
    await this._app.getManager("scene").isReady(n);
    const o = this._app.getManager("scene").getParent(n);
    const r = contentManager.getEntityInfo(o);
    const a = (r.displayName || r.iauName, [this._cameraOptions.nearObject(s, n), this._cameraOptions.aboveParent(n), this._cameraOptions.cameraFollow()]);
    "sun" !== o && a.push(this._cameraOptions.aboveSun(n));
    this._renderOptions(a, e);
  }
  /** @eyes-analysis
   * 执行 _goToView 对应的组件业务步骤；调用 List.remove, List.add；写入 _prevCameraView, _currentCameraView, _prevCamOptIndex, _activeCamOptIndex。
   * 状态写入：_activeCamOptIndex、_currentCameraView、_prevCamOptIndex、_prevCameraView。
   * 调用线索：i.onDeselect、i?.option.classList.remove、s.onSelect、s?.option.classList.add。
   */
  _goToView(currentCameraView) {
    const activeCamOptIndex = this._optionIndexMap[currentCameraView];
    if (activeCamOptIndex !== this._activeCamOptIndex) {
      this._prevCameraView = this._currentCameraView;
      this._currentCameraView = currentCameraView;
      this._prevCamOptIndex = this._activeCamOptIndex;
      this._activeCamOptIndex = activeCamOptIndex;
      const i = this._activeCameraOptions[this._prevCamOptIndex];
      "function" == typeof i?.onDeselect && i.onDeselect();
      i?.option.classList.remove("selected");
      const s = this._activeCameraOptions[this._activeCamOptIndex];
      "function" == typeof s?.onSelect && s.onSelect();
      s?.option.classList.add("selected");
    }
  }
  /** @eyes-analysis
   * 执行 goBackToPreviousView 对应的组件业务步骤；调用 this._selectDefaultView, this._goToView。
   * 调用线索：this._goToView、this._selectDefaultView。
   */
  goBackToPreviousView() {
    null == this._prevCameraView ? this._selectDefaultView() : this._goToView(this._prevCameraView);
  }
  /** @eyes-analysis
   * 执行 goToFollowCameraView 对应的组件业务步骤；调用 this._goToView；写入 _followId。
   * 状态写入：_followId。
   * 调用线索：this._goToView。
   */
  goToFollowCameraView(followId) {
    this._goToView("cameraFollow");
    this._followId = followId;
  }
  /** @eyes-analysis
   * 执行 goToTrajectoryView 对应的组件业务步骤；调用 this._goToView。
   * 调用线索：this._goToView。
   */
  goToTrajectoryView() {
    this._goToView("trajectory");
  }
  /** @eyes-analysis
   * 执行 goToDefaultView 对应的组件业务步骤；调用 this._selectDefaultView。
   * 调用线索：this._selectDefaultView。
   */
  goToDefaultView() {
    this._selectDefaultView();
  }
  /** @eyes-analysis
   * 执行 getCameraView 对应的组件业务步骤。
   */
  getCameraView() {
    return this._currentCameraView;
  }
  /** @eyes-analysis
   * 执行 _selectDefaultView 对应的组件业务步骤；调用 this._goToView。
   * 调用线索：this._goToView。
   */
  _selectDefaultView() {
    const {
      defaultSelectionIndex: defaultSelectionIndex
    } = this._config;
    const e = this._activeCameraOptions[this._defaultViewIndexOverride || defaultSelectionIndex];
    this._goToView(e.id);
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this.app.getManager, FollowManager.setEnabled, this._app.getManager, this.setState, List.remove, this._addPlanetOptions, this._addMoonOptions, this._addStarOptions, this._addSpacecraftOptions, this._addFeatureOptions, this._addDefaultOptions, this._activeCameraOptions.find, this._processQuery, this._selectDefaultView；写入 _entityId, _defaultViewIndexOverride, onLoaded。
   * 状态写入：_defaultViewIndexOverride、_entityId、onLoaded。
   * 调用线索：cameraFollowManager.setEnabled、e.category.toLowerCase、e.onDeselect、e?.option.classList.remove、t等。
   */
  async onRouteChange(t) {
    const e = t.entityInfo;
    const {
      currentView: currentView
    } = this.app.getManager("router");
    const {
      followId: followId,
      trajectory: trajectory
    } = this.app.getManager("router")?.query || {};
    if (!followId) {
      const cameraFollowManager = this.app.getManager("cameraFollow");
      cameraFollowManager.isEnabled && cameraFollowManager.setEnabled(false, {
        resetLimits: false,
        removeQueries: []
      });
    }
    this._entityId = e.id;
    this._defaultViewIndexOverride = t.defaultView || void 0;
    const o = e.category.toLowerCase();
    const r = this._app.getManager("content").getColorClass(e.id);
    this.setState({
      category: "landing site" === o ? "spacecraft" : r
    });
    let a = o;
    "feature" === currentView && (a = "feature");
    for (let t = 0; t < this._activeCameraOptions.length; t++) {
      const e = this._activeCameraOptions[t];
      "function" == typeof e?.onDeselect && e.onDeselect();
      e?.option.classList.remove("selected");
    }
    switch (a) {
      case "planet":
        this._addPlanetOptions(e);
        break;
      case "moon":
        this._addMoonOptions(e);
        break;
      case "star":
        this._addStarOptions(e);
        break;
      case "spacecraft":
      case "landing site":
      case "instrument":
        await this._addSpacecraftOptions(e);
        break;
      case "feature":
        await this._addFeatureOptions(e);
        break;
      default:
        await this._addDefaultOptions(e);
    }
    void 0 !== (followId && this._activeCameraOptions.find(({
      id: id
    }) => "cameraFollow" === id)) || void 0 !== trajectory ? this._processQuery(t) : this._selectDefaultView();
    this.onLoaded.forEach(t => t());
    this.onLoaded = [];
  }
  /** @eyes-analysis
   * 响应查询参数变化；调用 this._processQuery。
   * 调用线索：this._processQuery。
   */
  async onQueryChange(t) {
    this._processQuery(t);
  }
  /** @eyes-analysis
   * 执行 _processQuery 对应的组件业务步骤；调用 this.app.getManager, Manager.parseQuery, Manager.setEntitiesForceVisible, FollowManager.follow, FollowManager.setEnabled, this._selectDefaultView, Manager.hasTrajectoryOptions, this._app.getManager, Manager.setEnabled。
   * 调用线索：cameraFollowManager.follow、cameraFollowManager.setEnabled、routerManager.parseQuery、sceneManager.setEntitiesForceVisible、this._app.getManager等。
   */
  _processQuery(t) {
    const routerManager = this.app.getManager("router");
    const sceneManager = this.app.getManager("scene");
    const cameraFollowManager = this.app.getManager("cameraFollow");
    const trajectoryManager = this.app.getManager("trajectory");
    const {
      query: query,
      params: params
    } = routerManager.previousRoute;
    const {
      query: a,
      params: l
    } = routerManager.currentRoute;
    const {
      followId: followId
    } = routerManager.parseQuery(query);
    const {
      followId: h,
      trajectory: trajectory
    } = routerManager.parseQuery(a);
    const {
      spaceObject: spaceObject
    } = params || {};
    let {
      followId: p,
      spaceObject: _
    } = t;
    p = p || h;
    (p !== followId || _ !== spaceObject) && (void 0 !== followId && sceneManager.setEntitiesForceVisible([followId], false, false), p ? (sceneManager.setEntitiesForceVisible([p], false, true), cameraFollowManager.follow(p)) : (cameraFollowManager.setEnabled(false, {
      resetLimits: false,
      removeQueries: false
    }), "cameraFollow" === this._currentCameraView && this._selectDefaultView()));
    if (trajectoryManager.hasTrajectoryOptions(this._entityId) && trajectory) {
      if (this._app.getManager("router").parseQuery(query).trajectory === trajectory && params?.spaceObject === l?.spaceObject) return;
      trajectoryManager.setEnabled(true, this._entityId);
    } else this._currentCameraView || this._selectDefaultView();
  }
  /** @eyes-analysis
   * 执行 isLoaded 对应的组件业务步骤。
   */
  get isLoaded() {
    return this._activeCameraOptions.length > 0;
  }
}
CameraViewBlock.html = getCameraViewBlockTemplate();
export { CameraViewBlock };
