// Recovered from app.js:1639433-1648402.
import * as Pioneer from "../../engine/pioneer/index.js";
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/MobileExpandButtonStyles-928.js";
import * as animateFill from "../../vendor/modules/animateFill-929.js";
import * as Unidentified1069 from "../../engine/core/Unidentified1069.js";
import TelescopeTemplate from "../templates/TelescopeTemplate.html";
import "../../styles/extracted/TelescopeStyles.js";
var getTelescopeTemplate = () => TelescopeTemplate;
/* 进入望远镜模式临时接管对象点击、光照与表面地图，退出归还原状态并清理拾取控制器和方位角计时器。拾取位置先逆旋转到目标局部坐标，再换算经纬度写入标记与路由。 */
class Telescope extends Eyes.BaseComponent {
  constructor(app, options = {}) {
    super(app, null, {
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
      ...options
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
  resize() {
    super.resize();
    this.checkPlatform();
  }
  async onEnter(routeParams) {
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
    this._toggleSurfaceMaps(true, routeParams.spaceObject);
  }
  async onRouteChange(routeParams) {
    const {
      spaceObject: entityId
    } = routeParams;
    if (this._target = entityId, this._targetEntity = this.app?.scene.getEntity(this._target), this._children.tapHint.classList.remove("hidden"), this._firstLoad = true, !this._targetEntity) return;
    this.helper = new Unidentified1069.default(this.app, this._targetEntity);
    this.lyrManager = this.app.getManager("layer");
    const orbitersLayer = this.lyrManager?.getLayer("orbiters");
    orbitersLayer && (this.orbiterVisibility = orbitersLayer.visible);
    this.setLatitudeLongitude(0, 0);
  }
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
    const atmosphereComponent = this._app.pioneer.getScene("main").getEntity(this._target)?.getComponent(Pioneer.AtmosphereComponent);
    atmosphereComponent && atmosphereComponent?.setEnabled(true);
    this._toggleSurfaceMaps(false);
  }
  exitTelescope() {
    this._target ? this._app.getManager("router").navigate(`/${this._target}`) : console.warn("Space object could not be located in the url");
  }
  async processQuery(queryParams) {
    const {
      globeLat: globeLat,
      globeLon: globeLon
    } = queryParams;
    this._children.tapHint.classList.add("hidden");
    this.latitude || this.longitude || (this.latitude = globeLat || 0, this.longitude = globeLon || 0, this.setLatitudeLongitude(this.latitude, this.longitude));
    const hasSurfaceCoordinates = void 0 !== globeLat && void 0 !== globeLon;
    await this.setView(hasSurfaceCoordinates);
    hasSurfaceCoordinates ? (await this.helper.flyToSurface(globeLat, globeLon), this._placemarkEl && (this._placemarkEl.innerHTML = ""), this._firstLoad = false) : this._children.tapHint.classList.remove("hidden");
    const constellationsVisible = this._app.getManager("layer").getLayer("constellations").visible;
    this.constellations !== constellationsVisible && this.toggleConstellation();
  }
  checkPlatform() {
    this.setState({
      latitudeTitle: Eyes.AppUtils.isMobileMode() ? "Lat" : "Latitude",
      longitudeTitle: Eyes.AppUtils.isMobileMode() ? "Lon" : "Longitude"
    });
  }
  async setView(isSurfaceView) {
    if (this.setState({
      airClass: isSurfaceView ? "hidden" : "",
      surfaceClass: isSurfaceView ? "" : "hidden"
    }), this._target && this.app) if (isSurfaceView) {
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
      const cameraEntity = this.app.scene.getEntity("camera");
      cameraEntity.getController(Pioneer.PickController) && cameraEntity.removeController(this._pickController);
      this._pickController = cameraEntity.addController(Pioneer.PickController);
      this._pickController.setPickedEntity(this._targetEntity);
      this._pickController.setCallback(pickedPosition => {
        this.position = new Pioneer.Vector3();
        this.position.rotateInverse(this._targetEntity.getOrientation(), pickedPosition);
        const coordinates = this.helper.getLatitudeLongitude(this.position);
        coordinates && (this.latitude = coordinates.latitude, this.longitude = coordinates.longitude, this.addPickLocation(this.latitude, this.longitude), this.setLatitudeLongitude(this.latitude, this.longitude), this._children.tapHint.classList.add("hidden"));
      });
    }
  }
  exitSurfaceMode() {
    this.toggleConstellation(false);
    this.validateLatLong() && this.addPickLocation(this.latitude, this.longitude);
    this._target && this.app.getManager("router").navigate(`/${this._target}/telescope`);
  }
  toggleConstellation(allowToggle = true) {
    this.constellations = !!allowToggle && !this.constellations;
    this.setState({
      constellationsClass: this.constellations ? "enable-constellations" : ""
    });
    this.app.getManager("layer").toggleLayer("constellations", {}, this.constellations);
  }
  latitudeInputChange(inputEvent) {
    let latitudeText = inputEvent?.target?.value;
    latitudeText && (latitudeText.includes("S") && (latitudeText = -1 * parseFloat(latitudeText)), this.latitude = parseFloat(latitudeText));
    this.validateLatLong() && this.addPickLocation(parseFloat(latitudeText), this.longitude);
  }
  longitudeInputChange(inputEvent) {
    let longitudeText = inputEvent?.target?.value;
    longitudeText && (longitudeText.includes("W") && (longitudeText = -1 * parseFloat(longitudeText)), this.longitude = parseFloat(longitudeText));
    this.validateLatLong() && this.addPickLocation(this.latitude, parseFloat(longitudeText));
  }
  validateLatLong() {
    this._children.latitude.classList.remove("error");
    this._children.longitude.classList.remove("error");
    return null === this.latitude || void 0 === this.latitude || isNaN(this.latitude) || Math.abs(this.latitude) > 90 ? (this._children.latitude.classList.add("error"), false) : !(null === this.longitude || void 0 === this.longitude || isNaN(this.longitude) || Math.abs(this.longitude) > 180) || (this._children.longitude.classList.add("error"), false);
  }
  goSurfaceViewClick(clickEvent) {
    if (clickEvent.preventDefault(), clickEvent.stopPropagation(), this.setLatitudeLongitude(this.latitude, this.longitude), this.validateLatLong()) {
      this.helper.removePlacemark();
      const surfaceRoute = `/${this._target}/telescope?globeLat=${this.latitude}&globeLon=${this.longitude}`;
      this._toggleSurfaceMaps(true);
      this.app.getManager("router").navigate(surfaceRoute);
    }
  }
  _toggleSurfaceMaps(enableSurfaceMaps, entityId = this._target) {
    const terrainComponent = this._app.pioneer.getScene("main").getEntity(entityId)?.getComponent(Pioneer.CMTSComponent);
    if (!terrainComponent) if (enableSurfaceMaps) {
      const surfaceMaps = this._app.getManager("content").getSpheroidLayers(entityId);
      const tiledSurfaceMap = surfaceMaps?.find(surfaceMap => "wmts" === surfaceMap.type);
      if (!tiledSurfaceMap) return;
      if ("earth" === entityId) {
        const atmosphereComponent = this._app.pioneer.getScene("main").getEntity(entityId)?.getComponent(Pioneer.AtmosphereComponent);
        atmosphereComponent?.setRenderingEnabled(false);
      }
      this._app.getManager("layer").changeSpheroidMap(entityId, tiledSurfaceMap, {
        atmosphere: "earth" !== entityId
      });
    } else {
      const defaultTexture = this._app.getManager("content").getSpheroidDefaultTextureInformation(entityId, ["shadowEntities", "atmosphere"]);
      const {
        surfaceMapTiling: surfaceMapTiling
      } = this.app.getManager("router").configs;
      if (defaultTexture && true !== surfaceMapTiling) {
        if ("earth" === entityId) {
          const atmosphereComponent = this._app.pioneer.getScene("main").getEntity(entityId)?.getComponent(Pioneer.AtmosphereComponent);
          atmosphereComponent?.setRenderingEnabled(true);
        }
        this._app.getManager("layer").changeSpheroidMap(entityId, defaultTexture);
      }
    }
  }
  addPickLocation(latitude, longitude) {
    const placemarkId = "placemark";
    const placemarkEntity = this.helper.addPlacemark(latitude, longitude, placemarkId);
    placemarkEntity.getComponent(Pioneer.DivComponent).setAlignment(new Pioneer.Vector2(.5, .5));
    this._placemarkEl = placemarkEntity.getComponent(Pioneer.DivComponent).getDiv();
    this._placemarkEl.classList.remove("pioneer-label-div");
    this._placemarkEl.id = placemarkId;
    this._placemarkEl.innerHTML = "";
    const formattedCoordinates = this.helper.formatLatitudeLongitude(latitude, longitude);
    const placemarkContent = document.createElement("div");
    placemarkContent.className = "telescope pick";
    placemarkContent.innerHTML = `\n\t\t\t<div>\n\t\t\t\t<span class="target icon latlong-target"></span>\n\t\t\t\t<span class="semi small">${formattedCoordinates.latitude}</span>\n\t\t\t\t/\n\t\t\t\t<span class="semi small">${formattedCoordinates.longitude}</span>\n\t\t\t</div>\n\t\t\t<button type="button" class="clickable active" ontouchstart="goSurfaceViewClick" onClick="goSurfaceViewClick">GO</button>\n\t\t`;
    this._placemarkEl.appendChild(placemarkContent);
    placemarkContent.addEventListener("mousedown", mouseEvent => {
      mouseEvent.stopPropagation();
    });
    placemarkContent.addEventListener("mouseup", mouseEvent => {
      mouseEvent.stopPropagation();
    });
    this._setEventHandlersFromAttributes(this._placemarkEl);
  }
  async setLatitudeLongitude(latitude, longitude) {
    if (void 0 === latitude || void 0 === longitude) return;
    this.validateLatLong();
    const formattedCoordinates = this.helper?.formatLatitudeLongitude(latitude, longitude);
    formattedCoordinates && this.setState({
      formattedLatitude: formattedCoordinates.latitude,
      formattedLongitude: formattedCoordinates.longitude
    });
    await this._pioneer?.waitUntilNextFrame();
    this._children.latitude && this._children.longitude && (this._children.latitude.value = formattedCoordinates.latitude, this._children.longitude.value = formattedCoordinates.longitude);
  }
  showCoordinateInputTip() {
    const isTipHidden = this._children.coordinateTipPopup.classList.value.includes("hidden");
    this.setState({
      inputTipVisibleClass: isTipHidden ? "" : "hidden"
    });
  }
}
Telescope.html = getTelescopeTemplate();
export { Telescope };
