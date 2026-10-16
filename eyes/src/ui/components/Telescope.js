// Recovered from app.js:1639433-1648402.
import * as Pioneer from "../../engine/pioneer/index.js";
import * as Eyes from "../../framework/eyes/index.js";
import "../../styles/extracted/MobileExpandButtonStyles-928.js";
import * as animateFill from "../../vendor/modules/animateFill-929.js";
import * as Unidentified1069 from "../../engine/core/Unidentified1069.js";
import TelescopeTemplate from "../templates/TelescopeTemplate.html";
import "../../styles/extracted/TelescopeStyles.js";
var getTelescopeTemplate = () => TelescopeTemplate;
class Telescope extends Eyes.BaseComponent {
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
  resize() {
    super.resize();
    this.checkPlatform();
  }
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
  exitTelescope() {
    this._target ? this._app.getManager("router").navigate(`/${this._target}`) : console.warn("Space object could not be located in the url");
  }
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
  checkPlatform() {
    this.setState({
      latitudeTitle: Eyes.AppUtils.isMobileMode() ? "Lat" : "Latitude",
      longitudeTitle: Eyes.AppUtils.isMobileMode() ? "Lon" : "Longitude"
    });
  }
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
  exitSurfaceMode() {
    this.toggleConstellation(false);
    this.validateLatLong() && this.addPickLocation(this.latitude, this.longitude);
    this._target && this.app.getManager("router").navigate(`/${this._target}/telescope`);
  }
  toggleConstellation(t = true) {
    this.constellations = !!t && !this.constellations;
    this.setState({
      constellationsClass: this.constellations ? "enable-constellations" : ""
    });
    this.app.getManager("layer").toggleLayer("constellations", {}, this.constellations);
  }
  latitudeInputChange(t) {
    let e = t?.target?.value;
    e && (e.includes("S") && (e = -1 * parseFloat(e)), this.latitude = parseFloat(e));
    this.validateLatLong() && this.addPickLocation(parseFloat(e), this.longitude);
  }
  longitudeInputChange(t) {
    let e = t?.target?.value;
    e && (e.includes("W") && (e = -1 * parseFloat(e)), this.longitude = parseFloat(e));
    this.validateLatLong() && this.addPickLocation(this.latitude, parseFloat(e));
  }
  validateLatLong() {
    this._children.latitude.classList.remove("error");
    this._children.longitude.classList.remove("error");
    return null === this.latitude || void 0 === this.latitude || isNaN(this.latitude) || Math.abs(this.latitude) > 90 ? (this._children.latitude.classList.add("error"), false) : !(null === this.longitude || void 0 === this.longitude || isNaN(this.longitude) || Math.abs(this.longitude) > 180) || (this._children.longitude.classList.add("error"), false);
  }
  goSurfaceViewClick(t) {
    if (t.preventDefault(), t.stopPropagation(), this.setLatitudeLongitude(this.latitude, this.longitude), this.validateLatLong()) {
      this.helper.removePlacemark();
      const t = `/${this._target}/telescope?globeLat=${this.latitude}&globeLon=${this.longitude}`;
      this._toggleSurfaceMaps(true);
      this.app.getManager("router").navigate(t);
    }
  }
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
  showCoordinateInputTip() {
    const t = this._children.coordinateTipPopup.classList.value.includes("hidden");
    this.setState({
      inputTipVisibleClass: t ? "" : "hidden"
    });
  }
}
Telescope.html = getTelescopeTemplate();
export { Telescope };
