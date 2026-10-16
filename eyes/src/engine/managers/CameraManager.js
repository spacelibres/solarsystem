// Recovered from app.js:1257303-1267846.
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class CameraManager extends EyesPublicApi.BaseManager {
  constructor(t, defaultScene) {
    super(t);
    this._viewport = null;
    this._defaultScene = defaultScene;
    this._cameraEntity = null;
    this._id = null;
    this._previousId = null;
    this._context = {
      id: ""
    };
    this._isTransitioning = false;
    this._defaultMaxDistance = 2e18;
    this._selectionCallback = null;
    this._dynEnvMap = null;
    this._isFreeFly = false;
    this._zoomSensitivity = {
      click: .3,
      hold: .1
    };
    this._fullLightColor = new Pioneer.Color(1, 1, 1, 1);
    this._shadowLightColor = new Pioneer.Color(.15, .15, .15, 1);
    this.bindFunctions(["zoomIn", "zoomOut", "addDynamicEnvMap", "getShadowLightColor", "getFullLightColor"]);
    window.addEventListener("keydown", t => {
      "k" === t.key && this.toggleFreeFly();
    });
  }
  createViewportAndCamera(defaultScene) {
    defaultScene && (this._defaultScene = defaultScene);
    null === this.pioneer.getViewport("main-viewport") && (this._viewport = this.pioneer.addViewport("main-viewport"), this._viewport.getDiv().style.width = "100%", this._viewport.getDiv().style.height = "100%", this._viewport.getDiv().style.left = "0", this._viewport.getDiv().style.top = "0");
    null === this._defaultScene.getEntity("camera") && (this._cameraEntity = this._defaultScene.addEntity("camera"));
    this._cameraEntity.setOrientation(Pioneer.Quaternion.Identity);
    let e = this._cameraEntity.getComponent(Pioneer.CameraComponent);
    null === e && (e = this._cameraEntity.addComponent(Pioneer.CameraComponent));
    this._viewport.setCamera(e);
    this._cameraLight = this._cameraEntity.getComponent(Pioneer.LightSourceComponent);
    null === this._cameraLight && (this._cameraLight = this._cameraEntity.addComponent(Pioneer.LightSourceComponent), this._cameraLight.setEnabled(false), this.toggleCameraLight(true, this._shadowLightColor));
    null === this._dynEnvMap && (this._dynEnvMap = this._cameraEntity.addComponent(Pioneer.DynamicEnvironmentMapComponent));
  }
  getContext() {
    return this._context;
  }
  getIsTransitioning() {
    return this._isTransitioning;
  }
  setIsTransitioning(isTransitioning) {
    this._isTransitioning = isTransitioning;
  }
  waitForTransitionComplete() {
    return new Promise(t => {
      let e = setInterval(() => {
        this._isTransitioning || (clearInterval(e), e = null, t(true));
      }, 1e3);
    });
  }
  setContext(context) {
    this._context = context;
    this._previousId = this._id;
    this._id = this._context.id;
    const customEvent = new CustomEvent("cameraupdate", {
      detail: {
        target: this._id,
        context: this._context
      }
    });
    window.dispatchEvent(customEvent);
  }
  getCurrentId() {
    return this._id;
  }
  getShadowLightColor() {
    return this._shadowLightColor;
  }
  getFullLightColor() {
    return this._fullLightColor;
  }
  get defaultScene() {
    return this._defaultScene;
  }
  get cameraEntity() {
    return this._cameraEntity;
  }
  get cameraLight() {
    return this._cameraLight;
  }
  get dynamicEnvMap() {
    return this._dynEnvMap;
  }
  toggleCameraLight(t, e) {
    null !== this._cameraLight && (this._cameraLight.setEnabled(t), void 0 !== e && this._cameraLight.setColor(e));
  }
  updateLighting(t) {
    "flood" === t ? this.toggleCameraLight(true, this._fullLightColor) : "natural" === t ? this.toggleCameraLight(false) : "shadow" === t && this.toggleCameraLight(true, this._shadowLightColor);
  }
  getSelectionCallback() {
    return this._selectionCallback;
  }
  setSelectionCallback(selectionCallback) {
    "function" == typeof selectionCallback && (this._selectionCallback = selectionCallback);
  }
  getIsFreeFly() {
    return this._isFreeFly;
  }
  setUpFreeFlyCamera() {
    this._cameraEntity.clearControllers();
    this._cameraEntity.addController(Pioneer.FreeFlyController);
    this._cameraEntity.addController(Pioneer.LookController);
    this._cameraEntity.addController(Pioneer.RollController);
    this._cameraEntity.addController(Pioneer.FixedToParentController);
  }
  async resetFreeFlyCamera() {
    switch (this._context.context) {
      case EyesPublicApi.CameraScripts.CONTEXT.CELESTIAL_OBJECT:
        await this.app.cameraScripts.goToCelestialObject(this._id);
        break;
      case EyesPublicApi.CameraScripts.CONTEXT.SPACECRAFT:
        await this.app.cameraScripts.goToSpacecraft(this._id);
        break;
      case EyesPublicApi.CameraScripts.CONTEXT.INSTRUMENT:
        await this.app.cameraScripts.goToInstrument(this._id);
        break;
      case EyesPublicApi.CameraScripts.CONTEXT.ALIGN_SPACECRAFT:
        await this.app.cameraScripts.alignSpacecraftPlanet(this._id);
        break;
      case EyesPublicApi.CameraScripts.CONTEXT.LOCATION:
        await this.app.cameraScripts.showLocation(this._id, "", "", this._context.options);
        break;
      case EyesPublicApi.CameraScripts.CONTEXT.SYSTEM:
        await this.app.cameraScripts.goToSystem(this._id);
        break;
      case EyesPublicApi.CameraScripts.CONTEXT.LOOK_AT:
        await this.app.cameraScripts.spacecraftLookAtTarget(this._id, this._context.target);
        break;
      case EyesPublicApi.CameraScripts.CONTEXT.LOCKED_ON:
        await this.app.cameraScripts.spacecraftLockedOnTarget(this._id, this._context.target);
        break;
      default:
        console.error(`resetFreeFlyCamera: Unsupported camera context - ${this._context.context}`);
    }
  }
  enableFreeFly() {
    this._isFreeFly = true;
    this.setUpFreeFlyCamera();
    const toastComponent = this.app.getComponent("toast");
    toastComponent?.setContent("Now in free fly camera mode. Press K again to exit this mode.");
    toastComponent?.show();
  }
  disableFreeFly() {
    this._isFreeFly = false;
    this.resetFreeFlyCamera();
    this.app.getComponent("toast")?.hide();
  }
  async toggleFreeFly() {
    if (this._app.getManager("cameraFollow").isEnabled) {
      this._app.getManager("cameraFollow").setEnabled(false, {
        resetLimits: false,
        removeQueries: ["followId"]
      });
      await this.waitForTransitionComplete();
      return void this.enableFreeFly();
    }
    this._isFreeFly ? this.disableFreeFly() : this.enableFreeFly();
  }
  async goToEntity(id, {
    camera: camera,
    scene: scene,
    destination: destination,
    distance: distance,
    cinematic: a = false,
    minRadius: l = .001,
    maxRadius: c = this._defaultMaxDistance,
    duration: h = .75,
    destinationUp: destinationUp,
    zoom: u = true,
    select: p = true,
    useSpheroidRadiusForDistance: _ = false,
    roll: m = false,
    keyframes: keyframes,
    transitionFunction: transitionFunction
  } = {}) {
    const f = camera || this._cameraEntity;
    const T = scene || this._defaultScene;
    if (this._id = id, await T.waitTillEntitiesInPlace([id]), this._isFreeFly && (await this.toggleFreeFly()), this._isTransitioning = true, void 0 !== destination) {
      const vector3 = new Pioneer.Vector3();
      vector3.sub(f.getPosition(), destination);
      const i = f.getParent();
      if (null !== i) {
        const n = i.getName();
        if (!isNaN(vector3.magnitude())) {
          const t = Pioneer.MathUtils.clamp01(vector3.magnitude() / f.getPosition().magnitude());
          h = Math.max(h / 5, h * t);
        }
        if (!isNaN(vector3.magnitude()) && vector3.magnitude() <= .001 && id === n) return void (this._isTransitioning = false);
      }
    }
    try {
      if (void 0 !== keyframes) {
        f.clearControllers();
        const t = f.addController(Pioneer.OrbitKeyframeController);
        if (keyframes.position) for (let e = 0; e < keyframes.position.length; e++) {
          const i = keyframes.position[e];
          t.setPositionKeyframe(i.frame, i.position, i.relativeTo);
        }
        if (keyframes.up) for (let e = 0; e < keyframes.up.length; e++) {
          const i = keyframes.up[e];
          t.setUpKeyframe(i.frame, i.up);
        }
        if (keyframes.focus) for (let e = 0; e < keyframes.focus.length; e++) {
          const i = keyframes.focus[e];
          t.setFocusKeyframe(i.frame, i.name);
        }
        await t.getEndPromise();
        f.clearControllers();
      }
      if (await SolarSystemSceneExports.Cameras.goToEntity(f, T.getEntity(id), {
        destination: destination,
        distance: distance,
        up: false,
        duration: h,
        destinationUp: destinationUp,
        zoom: u,
        transitionFunction: transitionFunction
      }), p) {
        const t = f.addController(Pioneer.SelectController);
        null !== this._selectionCallback && t.setCallback(this._selectionCallback);
      }
      const e = f.getController(Pioneer.ZoomController);
      if (e && e instanceof Pioneer.ZoomController && e.setDistanceClamp(new Pioneer.Interval(l, c)), m) {
        f.getController(Pioneer.RollController) instanceof Pioneer.RollController || f.addController(Pioneer.RollController);
      }
      if (a) {
        const t = f.getController(Pioneer.AlignController);
        const e = f.addController(Pioneer.SpinController, "", t);
        e instanceof Pioneer.SpinController && (e.setAxis(Pioneer.Vector3.ZAxis, true), e.setRate(.01), e.setUsingRealTime(true), e.setRotatingPosition(true));
        const i = f.addController(Pioneer.TapController);
        i instanceof Pioneer.TapController && i.setTapCallback(() => {
          f.removeController(e);
          f.removeController(i);
        });
      }
    } catch (t) {
      t instanceof Pioneer.CanceledError || console.error(t);
    } finally {
      this._isTransitioning = false;
    }
  }
  async followTheEntity(t, e, i, o) {
    const r = this._defaultScene.getEntity(t);
    const a = this._defaultScene.getEntity(e);
    this.cameraEntity.clearControllers();
    const vector3 = new Pioneer.Vector3();
    r.getPositionRelativeToEntity(vector3, Pioneer.Vector3.Zero, a);
    const c = 1.25 * r.getExtentsRadius();
    const h = vector3.magnitude();
    const d = Math.atan(c / h);
    const u = 5 * r.getExtentsRadius();
    const p = h + u;
    const _ = Math.tan(d) * p;
    vector3.normalize(vector3);
    const m = new Pioneer.Vector3(0, 0, 1);
    const g = r.getParent();
    if (g) if (g.getOrientation().getAxis(m, 2), g.getName() === e) {
      const quaternion = new Pioneer.Quaternion();
      const i = this.pioneer.getScene("main").getEntity(e).getController(Pioneer.DynamoController);
      i && (i.getOrbitOrientation(quaternion, this.pioneer.getTime()), quaternion.getAxis(m, 2));
      m.isNaN() && m.copy(new Pioneer.Vector3(0, 0, 1));
    } else g.getOrientation().getAxis(m, 2);
    m.normalize(m);
    vector3.magnitude() < 1e-4 && (r.getOrientation().getAxis(vector3, 0), vector3.normalize(vector3));
    m.mult(m, _);
    vector3.mult(vector3, u);
    vector3.add(vector3, m);
    m.normalize(m);
    const y = this.cameraEntity.addController(Pioneer.FixedController);
    y.setPosition(vector3);
    const f = new Pioneer.Vector3();
    const T = new Pioneer.Vector3();
    f.neg(vector3);
    f.normalize(f);
    T.setNormalTo(f, m);
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxes(void 0, f, T);
    y.setOrientation(quaternion);
    SolarSystemSceneExports.Cameras.focusOnEntity(this.cameraEntity, a, {
      up: false
    });
    const E = this.cameraEntity.addController(Pioneer.TransitionController);
    E.setTransitionTime(o);
    E.setParent(i);
    const {
      _easeOutExpoTransition: _easeOutExpoTransition
    } = this.app.cameraScripts;
    _easeOutExpoTransition && E.setTransitionFunction(_easeOutExpoTransition);
    await E.getEndPromise();
    this.cameraEntity.clearControllers();
    this.cameraEntity.addController(Pioneer.OrbitController).setDragSensitivity(5e-4);
    this.cameraEntity.addController(Pioneer.FixedToParentController);
    this.cameraEntity.addController(Pioneer.RollController);
    const v = 1e3;
    const C = r.getExtentsRadius();
    const x = Math.max(r.getExtentsRadius() * v, a.getExtentsRadius() * v, C * v);
    const interval = new Pioneer.Interval(C, x);
    this.cameraEntity.addController(Pioneer.ZoomController).setDistanceClamp(interval);
    const w = this.cameraEntity.addController(Pioneer.SelectController);
    null !== this._selectionCallback && w.setCallback(this._selectionCallback);
    SolarSystemSceneExports.Cameras.focusOnEntity(this.cameraEntity, a, {
      up: false
    });
  }
  async goToBetweenPos(t, {
    duration: duration,
    destination: destination,
    destinationUp: destinationUp,
    transitionFunction: transitionFunction,
    zoomInterval: zoomInterval
  }) {
    const cameraEntity = this._cameraEntity;
    cameraEntity.clearControllers();
    const c = cameraEntity.addController(Pioneer.FixedController);
    c.setPosition(destination);
    const vector3 = new Pioneer.Vector3();
    const d = new Pioneer.Vector3();
    vector3.neg(destination);
    vector3.normalize(vector3);
    d.setNormalTo(vector3, destinationUp);
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxes(void 0, vector3, d);
    c.setOrientation(quaternion);
    SolarSystemSceneExports.Cameras.focusOnEntity(cameraEntity, t, {
      up: false,
      orbiter: false
    });
    const p = cameraEntity.addController(Pioneer.TransitionController);
    p.setTransitionTime(duration);
    p.setParent(t.getName());
    transitionFunction && p.setTransitionFunction(transitionFunction);
    await p.getEndPromise();
    cameraEntity.clearControllers();
    const _ = cameraEntity.addController(Pioneer.SelectController);
    null !== this._selectionCallback && _.setCallback(this._selectionCallback);
    cameraEntity.addController(Pioneer.OrbitController);
    cameraEntity.addController(Pioneer.RollController);
    const m = cameraEntity.addController(Pioneer.ZoomController);
    zoomInterval && m.setDistanceClamp(zoomInterval);
    SolarSystemSceneExports.Cameras.focusOnEntity(cameraEntity, t, {
      up: false,
      orbiter: false
    });
  }
  zoom(t, e = this._cameraEntity) {
    let i = e.getPosition().magnitude();
    Number.isNaN(i) && (i = 1);
    i *= t;
    const n = Pioneer.Vector3.pool.get();
    n.normalize(e.getPosition());
    n.mult(n, i);
    e.setPosition(n);
    Pioneer.Vector3.pool.release(n);
  }
  zoomIn(t = false) {
    let e = 1;
    const i = t ? this._zoomSensitivity.hold : this._zoomSensitivity.click;
    e /= Math.pow(2, i);
    this.zoom(e);
  }
  zoomOut(t = false) {
    let e = 1;
    const i = t ? this._zoomSensitivity.hold : this._zoomSensitivity.click;
    e *= Math.pow(2, i);
    this.zoom(e);
  }
  get defaultMaxDistance() {
    return this._defaultMaxDistance;
  }
  set defaultMaxDistance(defaultMaxDistance) {
    this._defaultMaxDistance = defaultMaxDistance;
  }
  addDynamicEnvMap(t) {
    if (!this.dynamicEnvMap) return;
    const e = t.getComponent(Pioneer.ModelComponent);
    null !== e && e.setDynamicEnvironmentMapComponent(this.dynamicEnvMap);
  }
}
export { CameraManager };
