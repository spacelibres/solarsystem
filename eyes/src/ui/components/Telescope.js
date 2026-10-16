/** @eyes-analysis
 * 文件职责：望远镜观察目标、视场和相机控制
 * 依据：imports: ../../engine/pioneer/index.js, ../../framework/eyes/index.js, ../../styles/extracted/MobileExpandButtonStyles-928.js, ../../vendor/modules/animateFill-929.js, ../../engine/core/Unidentified1069.js, ../templates/TelescopeTemplate.html, ../../styles/extracted/TelescopeStyles.js；manager dependencies: label, selection, layer, router, scene, content
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1639433-1648402.
import * as Pioneer from "../../engine/pioneer/index.js";
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/MobileExpandButtonStyles-928.js";
import * as animateFill from "../../vendor/modules/animateFill-929.js";
import * as Unidentified1069 from "../../engine/core/Unidentified1069.js";
import TelescopeTemplate from "../templates/TelescopeTemplate.html";
import "../../styles/extracted/TelescopeStyles.js";
var getTelescopeTemplate = () => TelescopeTemplate;
/** @eyes-analysis
 * 类职责：望远镜观察目标、视场和相机控制；继承 Eyes.BaseComponent
 * 继承：Eyes.BaseComponent；导出：Telescope。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Telescope extends Eyes.BaseComponent {
  /** @eyes-analysis
   * 建立实例初始字段和依赖；调用 Eyes.AppUtils.isMobileMode, Fill.default.setDefaultProps；写入 _target, _targetEntity, longitude, latitude, helper, _firstLoad。
   * 状态写入：_firstLoad、_target、_targetEntity、helper、latitude、longitude。
   * 调用线索：Eyes.AppUtils.isMobileMode、animateFill.default.setDefaultProps、super。
   */
  constructor(t, e = {}) {
    super(t, null, {
      latitudeTitle: Eyes.AppUtils.isMobileMode() ? "Lat" : "Latitude",
      longitudeTitle: Eyes.AppUtils.isMobileMode() ? "Lon" : "Longitude",
      airClass: "",
      surfaceClass: "hidden",
      azimuth: 0,
      elevation: 0,
      formattedLatitude: "",
      formattedLongitude: "",
      inputTipVisibleClass: "hidden",
      constellationsClass: "",
      ...e
    });
    this._target = null;
    this._targetEntity = null;
    this.longitude = 0;
    this.latitude = 0;
    this.helper = null;
    this._firstLoad = true;
    animateFill.default.setDefaultProps({
      theme: "default",
      touch: ["hold", 2e3],
      delay: [600, null],
      plugins: [animateFill.followCursor]
    });
  }
  /** @eyes-analysis
   * 重排响应式界面；调用 super.resize, this.checkPlatform。
   * 调用线索：super.resize、this.checkPlatform。
   */
  resize() {
    super.resize();
    this.checkPlatform();
  }
  /** @eyes-analysis
   * 进入视图时准备界面和订阅；调用 this.app.getManager, this.app.getComponent, this.toggleConstellation, this._toggleSurfaceMaps；写入 lightType。
   * 状态写入：lightType。
   * 调用线索：0,animateFill.default、this._toggleSurfaceMaps、this.app.getComponent、this.app.getComponent("settings").getState、this.app.getComponent("settings").toggleLightOptions等。
   */
  async onEnter(t) {
    this.app.getManager("label").setClickable(false);
    this.app.getManager("selection").setClickable(false);
    this.lightType = this.app.getComponent("settings").getState("lightType");
    this.app.getComponent("settings").toggleLightOptions("flood");
    (0, animateFill.default)(this._children.constellationToggleButton, {
      content: "Toggle Constellations",
      placement: "top"
    });
    (0, animateFill.default)(this._children.coordinateInfo, {
      content: "Positive inputs are North and East. Negative inputs are South and West.",
      placement: "top"
    });
    this.toggleConstellation(false);
    this._toggleSurfaceMaps(true, t.spaceObject);
  }
  /** @eyes-analysis
   * 响应路径参数变化并刷新本模块；调用 this._children.tapHint.classList.remove, Unidentified1069.default, this.app.getManager, this.setLatitudeLongitude；写入 _target, _targetEntity, _firstLoad, helper, lyrManager, orbiterVisibility。
   * 状态写入：_firstLoad、_target、_targetEntity、helper、lyrManager、orbiterVisibility。
   * 调用线索：new Unidentified1069.default、this._children.tapHint.classList.remove、this.app.getManager、this.app?.scene.getEntity、this.lyrManager?.getLayer等。
   */
  async onRouteChange(t) {
    const {
      spaceObject: e
    } = t;
    if (this._target = e, this._targetEntity = this.app?.scene.getEntity(this._target), this._children.tapHint.classList.remove("hidden"), this._firstLoad = true, !this._targetEntity) return;
    this.helper = new Unidentified1069.default(this.app, this._targetEntity);
    this.lyrManager = this.app.getManager("layer");
    const i = this.lyrManager?.getLayer("orbiters");
    i && (this.orbiterVisibility = i.visible);
    this.setLatitudeLongitude(0, 0);
  }
  /** @eyes-analysis
   * 离开视图时恢复状态并解除订阅；调用 this.helper.reset, this.app.scene.getEntity, this.toggleConstellation, this.app.getManager, this.app.getComponent, this._targetEntity.setOcclusionRadius, this.lyrManager.toggleLayer, this._app.pioneer.getScene, this._toggleSurfaceMaps；写入 helper。
   * 状态写入：helper。
   * 调用线索：clearInterval、t?.setEnabled、this._app.pioneer.getScene、this._app.pioneer.getScene("main").getEntity、this._app.pioneer.getScene("main").getEntity(this._target)?.getComponent等。
   */
  onLeave() {
    this.helper.reset();
    this.helper = null;
    this.app.scene.getEntity("camera").getController(Pioneer.PickController) && this.app.scene.getEntity("camera").removeController(this._pickController);
    this.azimathelevationInterval && clearInterval(this.azimathelevationInterval);
    this.toggleConstellation(false);
    this.app.getManager("label").setClickable(true);
    this.app.getManager("selection").setClickable(true);
    void 0 !== this.lightType && this.app.getComponent("settings").toggleLightOptions(this.lightType);
    void 0 !== this.occlusionRadius && this._targetEntity.setOcclusionRadius(this.occlusionRadius);
    void 0 !== this.orbiterVisibility && this.lyrManager.toggleLayer("orbiters", {
      parentId: this._target
    }, this.orbiterVisibility);
    const t = this._app.pioneer.getScene("main").getEntity(this._target)?.getComponent(Pioneer.AtmosphereComponent);
    t && t?.setEnabled(true);
    this._toggleSurfaceMaps(false);
  }
  /** @eyes-analysis
   * 执行 exitTelescope 对应的组件业务步骤；调用 this._app.getManager。
   * 调用线索：console.warn、this._app.getManager、this._app.getManager("router").navigate。
   */
  exitTelescope() {
    this._target ? this._app.getManager("router").navigate(`/${this._target}`) : console.warn("Space object could not be located in the url");
  }
  /** @eyes-analysis
   * 把查询参数应用到时间、图层或模块状态；调用 this._children.tapHint.classList.add, this.setLatitudeLongitude, this.setView, this.helper.flyToSurface, this._children.tapHint.classList.remove, this._app.getManager, this.toggleConstellation；写入 latitude, longitude, _firstLoad。
   * 状态写入：_firstLoad、_placemarkEl.innerHTML、latitude、longitude。
   * 调用线索：this._app.getManager、this._app.getManager("layer").getLayer、this._children.tapHint.classList.add、this._children.tapHint.classList.remove、this.helper.flyToSurface等。
   */
  async processQuery(t) {
    const {
      globeLat: globeLat,
      globeLon: globeLon
    } = t;
    this._children.tapHint.classList.add("hidden");
    this.latitude || this.longitude || (this.latitude = globeLat || 0, this.longitude = globeLon || 0, this.setLatitudeLongitude(this.latitude, this.longitude));
    const s = void 0 !== globeLat && void 0 !== globeLon;
    await this.setView(s);
    s ? (await this.helper.flyToSurface(globeLat, globeLon), this._placemarkEl && (this._placemarkEl.innerHTML = ""), this._firstLoad = false) : this._children.tapHint.classList.remove("hidden");
    const n = this._app.getManager("layer").getLayer("constellations").visible;
    this.constellations !== n && this.toggleConstellation();
  }
  /** @eyes-analysis
   * 执行 checkPlatform 对应的组件业务步骤；调用 this.setState, Eyes.AppUtils.isMobileMode。
   * 调用线索：Eyes.AppUtils.isMobileMode、this.setState。
   */
  checkPlatform() {
    this.setState({
      latitudeTitle: Eyes.AppUtils.isMobileMode() ? "Lat" : "Latitude",
      longitudeTitle: Eyes.AppUtils.isMobileMode() ? "Lon" : "Longitude"
    });
  }
  /** @eyes-analysis
   * 执行 setView 对应的组件业务步骤；调用 this.setState, this.app.getManager, this.app.cameraScripts.goToCelestialObject, this.app.cameraScripts.lookAtSurfaceLatLon, this.app.pioneer.getScene, this.app.scene.getEntity, this._pickController.setPickedEntity, this._pickController.setCallback, Pioneer.Vector3, this.position.rotateInverse, this._targetEntity.getOrientation, this.helper.getLatitudeLongitude, this.addPickLocation, this.setLatitudeLongitude；写入 azimathelevationInterval, _firstLoad, _pickController, position, latitude, longitude。
   * 状态写入：_firstLoad、_pickController、_placemarkEl.innerHTML、azimathelevationInterval、latitude、longitude、position。
   * 调用线索：clearInterval、console.warn、new Pioneer.Vector3、setInterval、t.addController等。
   */
  async setView(t) {
    if (this.setState({
      airClass: t ? "hidden" : "",
      surfaceClass: t ? "" : "hidden"
    }), this._target && this.app) if (t) {
      this._placemarkEl && (this._placemarkEl.innerHTML = "");
      this.azimathelevationInterval && clearInterval(this.azimathelevationInterval);
      this.azimathelevationInterval = setInterval(() => {
        const {
          azimuth: azimuth,
          elevation: elevation
        } = this.helper?.getAzimuthElevation();
        this.setState({
          azimuth: azimuth,
          elevation: elevation
        });
      }, 300);
    } else {
      if (this.app.getManager("scene").addLoading(this._target, "camera"), this._firstLoad) {
        try {
          await this.app.cameraScripts.goToCelestialObject(this._target);
        } catch {
          console.warn("Camera did not finish transition.");
        }
        this._firstLoad = false;
      } else await this.app.cameraScripts.lookAtSurfaceLatLon(this._target, this.latitude, this.longitude);
      this.app.getManager("scene").removeLoading(this._target, "camera");
      await this.app.pioneer.getScene("main")?.waitTillEntitiesInPlace([this._target]);
      const t = this.app.scene.getEntity("camera");
      t.getController(Pioneer.PickController) && t.removeController(this._pickController);
      this._pickController = t.addController(Pioneer.PickController);
      this._pickController.setPickedEntity(this._targetEntity);
      this._pickController.setCallback(t => {
        this.position = new Pioneer.Vector3();
        this.position.rotateInverse(this._targetEntity.getOrientation(), t);
        const e = this.helper.getLatitudeLongitude(this.position);
        e && (this.latitude = e.latitude, this.longitude = e.longitude, this.addPickLocation(this.latitude, this.longitude), this.setLatitudeLongitude(this.latitude, this.longitude), this._children.tapHint.classList.add("hidden"));
      });
    }
  }
  /** @eyes-analysis
   * 执行 exitSurfaceMode 对应的组件业务步骤；调用 this.toggleConstellation, this.validateLatLong, this.addPickLocation, this.app.getManager。
   * 调用线索：this.addPickLocation、this.app.getManager、this.app.getManager("router").navigate、this.toggleConstellation、this.validateLatLong。
   */
  exitSurfaceMode() {
    this.toggleConstellation(false);
    this.validateLatLong() && this.addPickLocation(this.latitude, this.longitude);
    this._target && this.app.getManager("router").navigate(`/${this._target}/telescope`);
  }
  /** @eyes-analysis
   * 执行 toggleConstellation 对应的组件业务步骤；调用 this.setState, this.app.getManager；写入 constellations。
   * 状态写入：constellations。
   * 调用线索：this.app.getManager、this.app.getManager("layer").toggleLayer、this.setState。
   */
  toggleConstellation(t = true) {
    this.constellations = !!t && !this.constellations;
    this.setState({
      constellationsClass: this.constellations ? "enable-constellations" : ""
    });
    this.app.getManager("layer").toggleLayer("constellations", {}, this.constellations);
  }
  /** @eyes-analysis
   * 执行 latitudeInputChange 对应的组件业务步骤；调用 this.validateLatLong, this.addPickLocation；写入 latitude。
   * 状态写入：latitude。
   * 调用线索：e.includes、parseFloat、this.addPickLocation、this.validateLatLong。
   */
  latitudeInputChange(t) {
    let e = t?.target?.value;
    e && (e.includes("S") && (e = -1 * parseFloat(e)), this.latitude = parseFloat(e));
    this.validateLatLong() && this.addPickLocation(parseFloat(e), this.longitude);
  }
  /** @eyes-analysis
   * 执行 longitudeInputChange 对应的组件业务步骤；调用 this.validateLatLong, this.addPickLocation；写入 longitude。
   * 状态写入：longitude。
   * 调用线索：e.includes、parseFloat、this.addPickLocation、this.validateLatLong。
   */
  longitudeInputChange(t) {
    let e = t?.target?.value;
    e && (e.includes("W") && (e = -1 * parseFloat(e)), this.longitude = parseFloat(e));
    this.validateLatLong() && this.addPickLocation(this.latitude, parseFloat(e));
  }
  /** @eyes-analysis
   * 执行 validateLatLong 对应的组件业务步骤；调用 this._children.latitude.classList.remove, this._children.longitude.classList.remove, Math.abs, this._children.latitude.classList.add, this._children.longitude.classList.add。
   * 调用线索：Math.abs、isNaN、this._children.latitude.classList.add、this._children.latitude.classList.remove、this._children.longitude.classList.add等。
   */
  validateLatLong() {
    this._children.latitude.classList.remove("error");
    this._children.longitude.classList.remove("error");
    return null === this.latitude || void 0 === this.latitude || isNaN(this.latitude) || Math.abs(this.latitude) > 90 ? (this._children.latitude.classList.add("error"), false) : !(null === this.longitude || void 0 === this.longitude || isNaN(this.longitude) || Math.abs(this.longitude) > 180) || (this._children.longitude.classList.add("error"), false);
  }
  /** @eyes-analysis
   * 执行 goSurfaceViewClick 对应的组件业务步骤；调用 this.setLatitudeLongitude, this.validateLatLong, this.helper.removePlacemark, this._toggleSurfaceMaps, this.app.getManager。
   * 调用线索：t.preventDefault、t.stopPropagation、this._toggleSurfaceMaps、this.app.getManager、this.app.getManager("router").navigate等。
   */
  goSurfaceViewClick(t) {
    if (t.preventDefault(), t.stopPropagation(), this.setLatitudeLongitude(this.latitude, this.longitude), this.validateLatLong()) {
      this.helper.removePlacemark();
      const t = `/${this._target}/telescope?globeLat=${this.latitude}&globeLon=${this.longitude}`;
      this._toggleSurfaceMaps(true);
      this.app.getManager("router").navigate(t);
    }
  }
  /** @eyes-analysis
   * 执行 _toggleSurfaceMaps 对应的组件业务步骤；调用 this._app.pioneer.getScene, this._app.getManager, this.app.getManager。
   * 调用线索：t?.find、t?.setRenderingEnabled、this._app.getManager、this._app.getManager("content").getSpheroidDefaultTextureInformation、this._app.getManager("content").getSpheroidLayers等。
   */
  _toggleSurfaceMaps(t, e = this._target) {
    const i = this._app.pioneer.getScene("main").getEntity(e)?.getComponent(Pioneer.CMTSComponent);
    if (!i) if (t) {
      const t = this._app.getManager("content").getSpheroidLayers(e);
      const i = t?.find(t => "wmts" === t.type);
      if (!i) return;
      if ("earth" === e) {
        const t = this._app.pioneer.getScene("main").getEntity(e)?.getComponent(Pioneer.AtmosphereComponent);
        t?.setRenderingEnabled(false);
      }
      this._app.getManager("layer").changeSpheroidMap(e, i, {
        atmosphere: "earth" !== e
      });
    } else {
      const t = this._app.getManager("content").getSpheroidDefaultTextureInformation(e, ["shadowEntities", "atmosphere"]);
      const {
        surfaceMapTiling: surfaceMapTiling
      } = this.app.getManager("router").configs;
      if (t && true !== surfaceMapTiling) {
        if ("earth" === e) {
          const t = this._app.pioneer.getScene("main").getEntity(e)?.getComponent(Pioneer.AtmosphereComponent);
          t?.setRenderingEnabled(true);
        }
        this._app.getManager("layer").changeSpheroidMap(e, t);
      }
    }
  }
  /** @eyes-analysis
   * 执行 addPickLocation 对应的组件业务步骤；调用 this.helper.addPlacemark, Pioneer.Vector2, this._placemarkEl.classList.remove, this.helper.formatLatitudeLongitude, this._placemarkEl.appendChild, this._setEventHandlersFromAttributes；写入 _placemarkEl。
   * 状态写入：_placemarkEl、_placemarkEl.id、_placemarkEl.innerHTML。
   * 调用线索：document.createElement、n.getComponent、n.getComponent(Pioneer.DivComponent).getDiv、n.getComponent(Pioneer.DivComponent).setAlignment、new Pioneer.Vector2等。
   */
  addPickLocation(t, e) {
    const i = "placemark";
    const n = this.helper.addPlacemark(t, e, i);
    n.getComponent(Pioneer.DivComponent).setAlignment(new Pioneer.Vector2(.5, .5));
    this._placemarkEl = n.getComponent(Pioneer.DivComponent).getDiv();
    this._placemarkEl.classList.remove("pioneer-label-div");
    this._placemarkEl.id = i;
    this._placemarkEl.innerHTML = "";
    const o = this.helper.formatLatitudeLongitude(t, e);
    const r = document.createElement("div");
    r.className = "telescope pick";
    r.innerHTML = `\n\t\t\t<div>\n\t\t\t\t<span class="target icon latlong-target"></span>\n\t\t\t\t<span class="semi small">${o.latitude}</span>\n\t\t\t\t/\n\t\t\t\t<span class="semi small">${o.longitude}</span>\n\t\t\t</div>\n\t\t\t<button type="button" class="clickable active" ontouchstart="goSurfaceViewClick" onClick="goSurfaceViewClick">GO</button>\n\t\t`;
    this._placemarkEl.appendChild(r);
    r.addEventListener("mousedown", t => {
      t.stopPropagation();
    });
    r.addEventListener("mouseup", t => {
      t.stopPropagation();
    });
    this._setEventHandlersFromAttributes(this._placemarkEl);
  }
  /** @eyes-analysis
   * 执行 setLatitudeLongitude 对应的组件业务步骤；调用 this.validateLatLong, this.setState。
   * 状态写入：_children.latitude.value、_children.longitude.value。
   * 调用线索：this._pioneer?.waitUntilNextFrame、this.helper?.formatLatitudeLongitude、this.setState、this.validateLatLong。
   */
  async setLatitudeLongitude(t, e) {
    if (void 0 === t || void 0 === e) return;
    this.validateLatLong();
    const i = this.helper?.formatLatitudeLongitude(t, e);
    i && this.setState({
      formattedLatitude: i.latitude,
      formattedLongitude: i.longitude
    });
    await this._pioneer?.waitUntilNextFrame();
    this._children.latitude && this._children.longitude && (this._children.latitude.value = i.latitude, this._children.longitude.value = i.longitude);
  }
  /** @eyes-analysis
   * 执行 showCoordinateInputTip 对应的组件业务步骤；调用 this._children.coordinateTipPopup.classList.value.includes, this.setState。
   * 调用线索：this._children.coordinateTipPopup.classList.value.includes、this.setState。
   */
  showCoordinateInputTip() {
    const t = this._children.coordinateTipPopup.classList.value.includes("hidden");
    this.setState({
      inputTipVisibleClass: t ? "" : "hidden"
    });
  }
}
Telescope.html = getTelescopeTemplate();
export { Telescope };
