/** @eyes-analysis
 * 文件职责：应用级观察脚本：解析实体/系统目标，协调 camera 管理器与场景过渡。
 * 依据：import ../pioneer/index.js；import ../solar-system/public-api.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1267847-1285874.
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
/** @eyes-analysis
 * 类职责：应用级观察脚本：解析实体/系统目标，协调 camera 管理器与场景过渡。
 * 继承：EyesPublicApi.BaseManager；导出：CameraScripts。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class CameraScripts extends EyesPublicApi.BaseManager {
  /** @eyes-analysis
   * 【结构证据】写入 `_cameraManager`、`_customSystemDistances`、`_easeInOutExpoTransition`、`_easeOutExpoTransition`、`_onCameraTransition`；调用 `super`、`this._easeInOutExpoTransition.bind`、`this._easeOutExpoTransition.bind`。
   * 状态写入：_cameraManager、_customSystemDistances、_easeInOutExpoTransition、_easeOutExpoTransition、_onCameraTransition。
   * 调用线索：super、this._easeInOutExpoTransition.bind、this._easeOutExpoTransition.bind。
   */
  constructor(t) {
    super(t);
    this._cameraManager = null;
    this._customSystemDistances = {
      mercury: 425648,
      venus: 862136,
      earth: 1040264,
      mars: 8e4,
      jupiter: 7157638,
      saturn: 4869142,
      uranus: 1886367,
      neptune: 2407045,
      "134340_pluto": 122231,
      "136199_eris": 180309,
      "1_ceres": 87225,
      "136108_haumea": 126609,
      "136472_makemake": 118584
    };
    this._onCameraTransition = null;
    this._easeInOutExpoTransition = this._easeInOutExpoTransition.bind(this);
    this._easeOutExpoTransition = this._easeOutExpoTransition.bind(this);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_cameraManager`。
   * 状态写入：_cameraManager。
   */
  setCameraManager(cameraManager) {
    this._cameraManager = cameraManager;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._scene`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get scene() {
    return this._scene;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (scene)；实际写入 `_scene`。
   * 状态写入：_scene。
   */
  set scene(scene) {
    this._scene = scene;
  }
  /** @eyes-analysis
   * 【结构证据】读取访问器，返回 `this._cameraEntity`；本访问器没有 AST 可见的 this 字段直接赋值。
   */
  get cameraEntity() {
    return this._cameraEntity;
  }
  /** @eyes-analysis
   * 【结构证据】写入访问器，接收参数 (cameraEntity)；实际写入 `_cameraEntity`。
   * 状态写入：_cameraEntity。
   */
  set cameraEntity(cameraEntity) {
    this._cameraEntity = cameraEntity;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `new Pioneer.Quaternion`、`quaternion.getAxis`、`this._cameraManager.pioneer.getScene`、`this._cameraManager.pioneer.getScene("main").getEntity`、`this._cameraManager.pioneer.getScene("main").getEntity(e).getController`、`this._cameraManager.pioneer.getScene("main").getEntity(e).getController(Pioneer.DynamoController).getOrbitOrientation`。
   * 调用线索：new Pioneer.Quaternion、quaternion.getAxis、this._cameraManager.pioneer.getScene、this._cameraManager.pioneer.getScene("main").getEntity、this._cameraManager.pioneer.getScene("main").getEntity(e).getController等。
   */
  getNormalToEcliptic(t, e) {
    const quaternion = new Pioneer.Quaternion();
    this._cameraManager.pioneer.getScene("main").getEntity(e).getController(Pioneer.DynamoController).getOrbitOrientation(quaternion, this._cameraManager.pioneer.getTime());
    quaternion.getAxis(t, 2);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `!!t.includes("_barycenter")`；调用 `t.includes`。
   * 调用线索：t.includes。
   */
  isBarycenter(t) {
    return !!t.includes("_barycenter");
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this.isBarycenter(t)?t.replace("_barycenter",""):t`；调用 `t.replace`、`this.isBarycenter`。
   * 调用线索：t.replace、this.isBarycenter。
   */
  removeBarycenter(t) {
    return this.isBarycenter(t) ? t.replace("_barycenter", "") : t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `Pioneer.MathUtils.degToRad`、`SolarSystemSceneExports.Cameras.getDistanceToFitEntities`、`c.getComponent`、`c.getComponent(Pioneer.SpheroidComponent).getEquatorialRadius`、`c.getOcclusionRadius`、`c.getOrientation`。
   * 调用线索：Pioneer.MathUtils.degToRad、SolarSystemSceneExports.Cameras.getDistanceToFitEntities、c.getComponent、c.getComponent(Pioneer.SpheroidComponent).getEquatorialRadius、c.getOcclusionRadius等。
   */
  async lookAtSurfaceLatLon(t, e = 0, i = 0, {
    scene: scene,
    cinematic: r = false,
    duration: a = 1.5,
    distance: l = 1.3
  } = {}) {
    this._cameraManager.setContext({
      id: "id",
      context: CameraScripts.CONTEXT.LOOK_SURFACE_LAT_LON
    });
    void 0 === scene && (scene = this._scene);
    const c = scene.getEntity(t);
    const h = c.getComponent(Pioneer.SpheroidComponent);
    if (null === h) return;
    const vector3 = new Pioneer.Vector3();
    const latLonAlt = new Pioneer.LatLonAlt();
    latLonAlt.lat = Pioneer.MathUtils.degToRad(e);
    latLonAlt.lon = Pioneer.MathUtils.degToRad(i);
    latLonAlt.alt = 0;
    h.xyzFromLLA(vector3, latLonAlt);
    const p = new Pioneer.Vector3();
    c.getOrientation().getAxis(p, 2);
    vector3.normalize(vector3);
    vector3.rotate(c.getOrientation(), vector3);
    let _ = c.getOcclusionRadius();
    null !== h && (_ = c.getComponent(Pioneer.SpheroidComponent).getEquatorialRadius());
    const m = 1.2 * _;
    const g = 15 * _;
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxes(void 0, vector3, p);
    let f = SolarSystemSceneExports.Cameras.getDistanceToFitEntities(this._cameraEntity, quaternion, c, [c]);
    f *= l;
    vector3.mult(vector3, f);
    await this._cameraManager.goToEntity(t, {
      destination: vector3,
      cinematic: r,
      minRadius: m,
      destinationUp: p,
      duration: a / 2,
      maxRadius: g
    });
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.MathUtils.degToRad`、`SolarSystemSceneExports.Cameras.getDistanceToFitEntities`、`T.setFromAxes`、`h.getComponent`、`h.getOcclusionRadius`、`h.getOrientation`。
   * 调用线索：Pioneer.MathUtils.degToRad、SolarSystemSceneExports.Cameras.getDistanceToFitEntities、T.setFromAxes、h.getComponent、h.getOcclusionRadius等。
   */
  async goToCelestialObject(t, {
    scene: scene,
    starId: i = "sun",
    cinematic: o = true,
    duration: r = 1.5,
    distance: a = 1.3,
    verticalOffset: l = 0,
    horizontalOffset: c = 0
  } = {}) {
    this._cameraManager.setContext({
      id: t,
      context: CameraScripts.CONTEXT.CELESTIAL_OBJECT
    });
    void 0 === scene && (scene = this._scene);
    const h = scene.getEntity(t);
    const d = scene.getEntity(i);
    let vector3 = new Pioneer.Vector3();
    h.getPositionRelativeToEntity(vector3, Pioneer.Vector3.Zero, d);
    0 === vector3.magnitude() && (vector3 = new Pioneer.Vector3(0, 1, 0));
    const p = new Pioneer.Vector3();
    h.getOrientation().getAxis(p, 2);
    vector3.neg(vector3);
    vector3.normalize(vector3);
    let _ = h.getOcclusionRadius();
    const m = h.getComponent(Pioneer.SpheroidComponent);
    null !== m && (_ = m.getEquatorialRadius());
    const g = .25 * _;
    const y = new Pioneer.Vector3();
    y.cross(vector3, p);
    y.normalize(y);
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxisAngle(y, Pioneer.MathUtils.degToRad(l));
    vector3.rotate(quaternion, vector3);
    quaternion.setFromAxisAngle(p, Pioneer.MathUtils.degToRad(c));
    vector3.rotate(quaternion, vector3);
    const T = new Pioneer.Quaternion();
    T.setFromAxes(void 0, vector3, p);
    let b = SolarSystemSceneExports.Cameras.getDistanceToFitEntities(this._cameraEntity, T, h, [h]);
    b *= a;
    vector3.mult(vector3, b);
    await this._cameraManager.goToEntity(t, {
      distance: b,
      duration: r / 2
    });
    await this._cameraManager.goToEntity(t, {
      destination: vector3,
      cinematic: o,
      minRadius: g,
      destinationUp: p,
      duration: r / 2
    });
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.pow`、`Pioneer.Quaternion.pool.get`、`Pioneer.Quaternion.pool.release`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`a.lerp`。
   * 调用线索：Math.pow、Pioneer.Quaternion.pool.get、Pioneer.Quaternion.pool.release、Pioneer.Vector3.pool.get、Pioneer.Vector3.pool.release等。
   */
  _easeOutExpoTransition(t, e, i, n, o, r) {
    const a = Pioneer.Vector3.pool.get();
    const l = Pioneer.Quaternion.pool.get();
    const c = 1 - Math.pow(1 - r, 4);
    a.lerp(e, i, c);
    l.slerp(n, o, c);
    this._onCameraTransition?.(c);
    t.setPosition(a);
    t.setOrientation(l);
    Pioneer.Vector3.pool.release(a);
    Pioneer.Quaternion.pool.release(l);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.pow`、`Pioneer.Quaternion.pool.get`、`Pioneer.Quaternion.pool.release`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`a.lerp`。
   * 调用线索：Math.pow、Pioneer.Quaternion.pool.get、Pioneer.Quaternion.pool.release、Pioneer.Vector3.pool.get、Pioneer.Vector3.pool.release等。
   */
  _easeInOutExpoTransition(t, e, i, n, o, r) {
    const a = Pioneer.Vector3.pool.get();
    const l = Pioneer.Quaternion.pool.get();
    const c = ((r *= 2) <= 1 ? Math.pow(r, 4) : 2 - Math.pow(2 - r, 4)) / 2;
    a.lerp(e, i, c);
    l.slerp(n, o, c);
    this._onCameraTransition?.(c);
    t.setPosition(a);
    t.setOrientation(l);
    Pioneer.Vector3.pool.release(a);
    Pioneer.Quaternion.pool.release(l);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.MathUtils.degToRad`、`SolarSystemSceneExports.Cameras.getDistanceToFitEntities`、`f.cross`、`f.normalize`、`g.copy`、`g.isNaN`。
   * 调用线索：Pioneer.MathUtils.degToRad、SolarSystemSceneExports.Cameras.getDistanceToFitEntities、f.cross、f.normalize、g.copy等。
   */
  async goToSpacecraft(t, {
    scene: scene,
    starId: i = "sun",
    planeId: o = "earth",
    distance: distance,
    cinematic: a = true,
    duration: l = 1.5,
    verticalOffset: c = 0,
    horizontalOffset: h = 0
  } = {}) {
    this._cameraManager.setContext({
      id: t,
      context: CameraScripts.CONTEXT.SPACECRAFT
    });
    void 0 === scene && (scene = this._scene);
    const d = this._app.getManager("content").getEntityInfo(t);
    const u = d?.customDistance || distance;
    await scene.waitTillEntitiesInPlace([t]);
    const p = scene.getEntity(t);
    const _ = 1.2 * p.getOcclusionRadius();
    const vector3 = new Pioneer.Vector3();
    vector3.normalize(p.getPosition());
    const g = new Pioneer.Vector3();
    const y = p.getParent();
    y && (y.getName() === i && null !== scene.getEntity(o) ? (this.getNormalToEcliptic(g, o), g.isNaN() && g.copy(new Pioneer.Vector3(0, 0, 1))) : y.getOrientation().getAxis(g, 2));
    g.normalize(g);
    vector3.magnitude() < 1e-4 && (p.getOrientation().getAxis(vector3, 0), vector3.normalize(vector3));
    const f = new Pioneer.Vector3();
    f.cross(vector3, g);
    f.normalize(f);
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxisAngle(f, Pioneer.MathUtils.degToRad(c));
    vector3.rotate(quaternion, vector3);
    quaternion.setFromAxisAngle(g, Pioneer.MathUtils.degToRad(h));
    vector3.rotate(quaternion, vector3);
    let b = 0;
    if (void 0 !== u) b = u;else {
      const t = new Pioneer.Quaternion();
      t.setFromAxes(void 0, vector3, g);
      b = 1.3 * SolarSystemSceneExports.Cameras.getDistanceToFitEntities(this._cameraEntity, t, p, [p]);
    }
    vector3.mult(vector3, b);
    await this._cameraManager.goToEntity(t, {
      distance: b
    });
    await this._cameraManager.goToEntity(t, {
      destination: vector3,
      cinematic: a,
      minRadius: _,
      destinationUp: g,
      duration: l
    });
  }
  /** @eyes-analysis
   * 【结构证据】调用 `c.getOcclusionRadius`、`c.getParent`、`c.getPositionRelativeToEntity`、`h.getName`、`h.getOcclusionRadius`、`h.getOrientation`。
   * 调用线索：c.getOcclusionRadius、c.getParent、c.getPositionRelativeToEntity、h.getName、h.getOcclusionRadius等。
   */
  async goToInstrument(t, {
    scene: scene,
    distance: distance,
    duration: n = 1.5,
    upVector: o = "z-axis",
    forwardVector: r = "y-axis"
  } = {}) {
    this._cameraManager.setContext({
      id: t,
      context: CameraScripts.CONTEXT.INSTRUMENT
    });
    void 0 === scene && (scene = this._scene);
    const a = this._app.getManager("content").getEntityInfo(t);
    const l = a?.customDistance || distance;
    const c = scene.getEntity(t);
    const h = c.getParent();
    await scene.waitTillEntitiesInPlace([h.getName(), t]);
    const d = c.getOcclusionRadius();
    const u = h.getOcclusionRadius();
    const p = 1.2 * d;
    const vector3 = new Pioneer.Vector3();
    c.getPositionRelativeToEntity(vector3, Pioneer.Vector3.Zero, h);
    const m = new Pioneer.Vector3();
    const g = r.endsWith("y-axis") ? 1 : r.endsWith("z-axis") ? 2 : 0;
    h.getOrientation().getAxis(m, g);
    r.startsWith("-") && m.mult(m, -1);
    vector3.mult(m, -1);
    const y = new Pioneer.Vector3();
    let f = r.endsWith("y-axis") ? 2 : 1;
    o.endsWith("x-axis") ? f = 0 : o.endsWith("z-axis") && (f = 2);
    h.getOrientation().getAxis(y, f);
    o.startsWith("-") && y.mult(y, -1);
    let T = 4 * p;
    void 0 !== l && (T = l);
    vector3.mult(vector3, T);
    await this._cameraManager.goToEntity(h.getName(), {
      destinationUp: y,
      distance: 1.2 * u
    });
    await this._cameraManager.goToEntity(t, {
      destination: vector3,
      minRadius: p,
      destinationUp: y,
      duration: n
    });
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Promise.all`、`new CustomEvent`、`this._cameraManager.goToEntity`、`this._cameraManager.setContext`、`window.dispatchEvent`。
   * 调用线索：Promise.all、new CustomEvent、this._cameraManager.goToEntity、this._cameraManager.setContext、window.dispatchEvent。
   */
  async compareObjects(t, e, {
    cameraLeft: cameraLeft,
    cameraRight: cameraRight,
    cameraLeftPosition: cameraLeftPosition,
    cameraRightPosition: cameraRightPosition,
    cameraUp: cameraUp,
    scene: scene,
    minRadius: minRadius,
    maxRadius: maxRadius,
    duration: h = .75
  }) {
    this._cameraManager.setContext({
      id: t,
      context: CameraScripts.CONTEXT.COMPARE,
      to: e
    });
    const customEvent = new CustomEvent("cameracompare", {
      detail: {
        left: t,
        right: e
      }
    });
    window.dispatchEvent(customEvent);
    const u = this._cameraManager.goToEntity(t, {
      minRadius: minRadius,
      maxRadius: maxRadius,
      camera: cameraLeft,
      destination: cameraLeftPosition,
      destinationUp: cameraUp,
      scene: scene,
      select: false,
      duration: h,
      zoom: true,
      cinematic: true
    });
    const p = this._cameraManager.goToEntity(e, {
      minRadius: minRadius,
      maxRadius: maxRadius,
      camera: cameraRight,
      destination: cameraRightPosition,
      destinationUp: cameraUp,
      scene: scene,
      select: false,
      duration: h,
      zoom: true,
      cinematic: true
    });
    await Promise.all([u, p]);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `SolarSystemSceneExports.Cameras.getDistanceToFitEntities`、`d.getOrientation`、`d.getOrientation().getAxis`、`d.getPosition`、`d.getVelocity`、`g.cross`。
   * 调用线索：SolarSystemSceneExports.Cameras.getDistanceToFitEntities、d.getOrientation、d.getOrientation().getAxis、d.getPosition、d.getVelocity等。
   */
  async showLocation(t, e, i, o = "northPole", {
    duration: r = 2,
    otherEntityNames: a = [],
    distance: distance,
    rotateByScreenRatio: c = true
  } = {}) {
    this._cameraManager.setContext({
      id: "",
      targetEntityName: t,
      context: CameraScripts.CONTEXT.LOCATION,
      options: {
        otherEntityNames: a
      }
    });
    const h = this._scene.getEntity(t);
    const d = this._scene.getEntity(e);
    const u = this._scene.getEntity(i);
    if (null === h || null === d || null === u) return;
    const p = [];
    p.push(h);
    p.push(d);
    p.push(u);
    for (let t = 0, e = a.length; t < e; t++) {
      const e = this._scene.getEntity(a[t]);
      null !== e && p.push(e);
    }
    const vector3 = new Pioneer.Vector3();
    "northPole" === o ? d.getOrientation().getAxis(vector3, 2) : "planeNormal" === o && (vector3.cross(d.getPosition(), d.getVelocity()), vector3.normalize(vector3));
    const m = new Pioneer.Vector3();
    m.neg(vector3);
    const g = new Pioneer.Vector3();
    h.getPositionRelativeToEntity(g, Pioneer.Vector3.Zero, u);
    g.normalize(g);
    g.setNormalTo(m, g);
    g.neg(g);
    const y = this._cameraEntity.getComponent(Pioneer.CameraComponent);
    c && y.getHorizontalFieldOfView() > y.getVerticalFieldOfView() && g.cross(g, m);
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxes(void 0, m, g);
    let T = distance || SolarSystemSceneExports.Cameras.getDistanceToFitEntities(this._cameraEntity, quaternion, h, p);
    y.getHorizontalFieldOfView() < y.getVerticalFieldOfView() && (T *= 1.3 * y.getVerticalFieldOfView());
    T *= 2;
    vector3.setMagnitude(vector3, T);
    null === this._cameraEntity.getParent() && (await this._cameraManager.goToEntity(t, {
      distance: T
    }));
    const b = {
      up: [{
        frame: r,
        up: g
      }],
      position: [{
        frame: r,
        position: vector3,
        relativeTo: h.getName()
      }],
      focus: [{
        frame: r,
        name: t
      }]
    };
    await this._cameraManager.goToEntity(t, {
      keyframes: b,
      destination: vector3,
      destinationUp: g,
      cinematic: false,
      duration: .2
    });
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.MathUtils.degToRad`、`d.getOcclusionRadius`、`d.getPositionRelativeToEntity`、`new Pioneer.Quaternion`、`new Pioneer.Vector3`、`quaternion.setFromAxisAngle`。
   * 调用线索：Pioneer.MathUtils.degToRad、d.getOcclusionRadius、d.getPositionRelativeToEntity、new Pioneer.Quaternion、new Pioneer.Vector3等。
   */
  async alignObjects(t, e, {
    verticalOffset: i = 0,
    horizontalOffset: n = 0,
    duration: o = 1.5,
    transitionDuration: transitionDuration,
    alignDuration: alignDuration,
    distance: l = 1,
    cinematic: c = false,
    useEase: h = true
  } = {}) {
    this._cameraManager.setContext({
      id: "",
      targetEntityName: t,
      context: CameraScripts.CONTEXT.ALIGN_OBJECTS,
      focus: e
    });
    const d = this._scene.getEntity(t);
    const u = this._scene.getEntity(e);
    await this._scene.waitTillEntitiesInPlace([t, e]);
    const p = d.getOcclusionRadius();
    const vector3 = new Pioneer.Vector3();
    const m = this._cameraManager.pioneer.getTime();
    d.getPositionRelativeToEntity(vector3, Pioneer.Vector3.Zero, u, m);
    vector3.isNaN() ? vector3.copy(new Pioneer.Vector3(0, -1, 0)) : vector3.normalize(vector3);
    vector3.mult(vector3, l);
    const g = new Pioneer.Vector3();
    u.getOrientation().getAxis(g, 2);
    const y = new Pioneer.Vector3();
    y.cross(vector3, g);
    y.normalize(y);
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxisAngle(y, Pioneer.MathUtils.degToRad(i));
    vector3.rotate(quaternion, vector3);
    quaternion.setFromAxisAngle(g, Pioneer.MathUtils.degToRad(n));
    vector3.rotate(quaternion, vector3);
    await this._cameraManager.goToEntity(t, {
      distance: l,
      destinationUp: g,
      duration: transitionDuration || .5 * o,
      transitionFunction: h ? this._easeOutExpoTransition : void 0
    });
    await this._cameraManager.goToEntity(t, {
      destination: vector3,
      cinematic: c,
      minRadius: p,
      destinationUp: g,
      duration: alignDuration || .5 * o,
      transitionFunction: h ? this._easeOutExpoTransition : void 0
    });
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.max`、`Math.min`、`l.getEquatorialRadius`、`new Pioneer.Vector3`、`o.getOrientation`、`o.getOrientation().getAxis`。
   * 调用线索：Math.max、Math.min、l.getEquatorialRadius、new Pioneer.Vector3、o.getOrientation等。
   */
  async alignSpacecraftPlanet(t, {
    duration: e = 1.5,
    minRadius: i = 50,
    distanceMultiplier: n = 3
  } = {}) {
    this._cameraManager.setContext({
      id: t,
      context: CameraScripts.CONTEXT.ALIGN_SPACECRAFT
    });
    const o = this._scene.getEntity(t);
    let r = o.getParent();
    for (; null !== r && null === r.getComponent(Pioneer.SpheroidComponent) && null === r.getComponent(Pioneer.ModelComponent);) r = r.getParent();
    let a = r.getOcclusionRadius();
    const l = r.getComponent(Pioneer.SpheroidComponent);
    null !== l && (a = l.getEquatorialRadius());
    const vector3 = new Pioneer.Vector3();
    o.getPositionRelativeToEntity(vector3, Pioneer.Vector3.Zero, r);
    vector3.normalize(vector3);
    vector3.magnitude() < 1e-4 && (o.getOrientation().getAxis(vector3, 0), vector3.normalize(vector3));
    vector3.mult(vector3, Math.max(i, n * a));
    const h = new Pioneer.Vector3();
    r.getOrientation().getAxis(h, 2);
    await this._cameraManager.goToEntity(r.getName());
    await this._cameraManager.goToEntity(t, {
      destination: vector3,
      cinematic: false,
      minRadius: Math.min(a, i),
      destinationUp: h,
      duration: e
    });
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.MathUtils.degToRad`、`T.cross`、`T.normalize`、`c.includes`、`c.startsWith`、`f.cross`。
   * 调用线索：Pioneer.MathUtils.degToRad、T.cross、T.normalize、c.includes、c.startsWith等。
   */
  async viewFromSide(t, {
    planeId: e = "earth",
    distance: distance,
    cinematic: n = false,
    duration: o = .75,
    verticalOffset: r = 0,
    horizontalOffset: a = 0,
    forwardVector: l = "x-axis",
    upVector: c = ""
  } = {}) {
    const h = this._scene.getEntity(t);
    const d = this._scene.getEntity(e) || h.getParent();
    await this._scene.waitTillEntitiesInPlace([t, e]);
    const u = h.getOcclusionRadius();
    const p = 1.2 * u;
    const vector3 = new Pioneer.Vector3();
    const m = new Pioneer.Vector3();
    let g = 0;
    "z-axis" === l ? g = 2 : "y-axis" === l && (g = 1);
    h.getOrientation().getAxis(m, g);
    m.normalize(m);
    const y = new Pioneer.Vector3();
    h.getPositionRelativeToEntity(y, Pioneer.Vector3.Zero, d);
    y.normalize(y);
    vector3.cross(m, y);
    vector3.normalize(vector3);
    vector3.mult(vector3, -1);
    const f = new Pioneer.Vector3();
    if (c) {
      let t = 1;
      c.includes("x-axis") ? t = 0 : c.includes("z-axis") && (t = 2);
      h.getOrientation().getAxis(f, t);
      c.startsWith("-") && f.mult(f, -1);
    } else {
      h.getPositionRelativeToEntity(f, Pioneer.Vector3.Zero, d);
      f.normalize(f);
    }
    const T = new Pioneer.Vector3();
    if (T.cross(vector3, f), T.normalize(T), f.cross(T, vector3), 0 !== r) {
      const quaternion = new Pioneer.Quaternion();
      const e = Pioneer.MathUtils.degToRad(r);
      quaternion.setFromAxisAngle(T, e);
      vector3.rotate(quaternion, vector3);
    }
    if (f.cross(T, vector3), 0 !== a) {
      const quaternion = new Pioneer.Quaternion();
      const e = Pioneer.MathUtils.degToRad(a);
      quaternion.setFromAxisAngle(f, e);
      vector3.rotate(quaternion, vector3);
    }
    T.cross(vector3, f);
    T.normalize(T);
    void 0 === distance ? vector3.mult(vector3, 10 * u) : vector3.mult(vector3, distance);
    await this._cameraManager.goToEntity(t, {
      destination: vector3,
      cinematic: n,
      minRadius: p,
      destinationUp: f,
      duration: o
    });
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._cameraManager.setContext`。
   * 调用线索：this._cameraManager.setContext。
   */
  async spacecraftLookAtTarget(t, e) {
    this._cameraManager.setContext({
      id: t,
      context: CameraScripts.CONTEXT.LOOK_AT,
      target: e
    });
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._cameraManager.setContext`。
   * 调用线索：this._cameraManager.setContext。
   */
  async spacecraftLockedOnTarget(t, e) {
    this._cameraManager.setContext({
      id: t,
      context: CameraScripts.CONTEXT.LOCKED_ON,
      target: e
    });
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.max`、`Math.tan`、`Pioneer.MathUtils.degToRad`、`S.getHorizontalFieldOfView`、`S.getVerticalFieldOfView`、`SolarSystemSceneExports.Cameras.getDistanceToFitEntities`。
   * 调用线索：Math.max、Math.tan、Pioneer.MathUtils.degToRad、S.getHorizontalFieldOfView、S.getVerticalFieldOfView等。
   */
  async goToSystemSideway(t, {
    distance: distance,
    minDistance: i = 0,
    duration: o = 1,
    otherEntityNames: r = [],
    includeChildren: a = true,
    angleInDegree: l = 0,
    cinematic: c = false
  } = {}) {
    this._cameraManager.setContext({
      id: t,
      context: CameraScripts.CONTEXT.SYSTEM
    });
    const h = this._scene.getEntity(t);
    const d = this.isBarycenter(t) ? this.removeBarycenter(t) : t;
    const u = d in this._customSystemDistances ? this._customSystemDistances[d] : 0;
    const p = [h];
    for (let t = 0; t < r.length; t++) p.push(this._scene.getEntity(r[t]));
    if (a) for (let t = 0; t < h.getNumChildren(); t++) {
      const e = h.getChild(t);
      null === e.getComponent(Pioneer.CameraComponent) && (e.getName().startsWith("sc") || e.getPosition().isNaN() || p.push(e));
    }
    const vector3 = new Pioneer.Vector3();
    vector3.normalize(h.getVelocity());
    const m = new Pioneer.Vector3();
    m.normalize(h.getPosition());
    m.setNormalTo(vector3, m);
    const g = new Pioneer.Vector3();
    g.cross(m, vector3);
    const y = new Pioneer.Vector3();
    y.mult(vector3, -1);
    y.addMult(y, g, Math.tan(Pioneer.MathUtils.degToRad(l)));
    let f = h.getOcclusionRadius();
    const T = h.getComponent(Pioneer.SpheroidComponent);
    if (null !== T) f = T.getEquatorialRadius();else if (this.isBarycenter(t)) {
      const e = this.removeBarycenter(t);
      const i = this._scene.getEntity(e).getComponent(Pioneer.SpheroidComponent);
      null !== T && (f = i.getEquatorialRadius());
    }
    const b = 1.2 * f;
    let E = distance;
    if (void 0 === E) {
      const quaternion = new Pioneer.Quaternion();
      quaternion.setFromAxes(m, y, void 0);
      E = SolarSystemSceneExports.Cameras.getDistanceToFitEntities(this._cameraEntity, quaternion, h, p);
      E *= 1.3;
    }
    E = Math.max(u, E);
    const S = this._cameraEntity.getComponent(Pioneer.CameraComponent);
    S.getHorizontalFieldOfView() < S.getVerticalFieldOfView() && (E *= 1.3 * S.getVerticalFieldOfView());
    y.setMagnitude(y, E);
    await this._cameraManager.goToEntity(t, {
      destination: y,
      cinematic: c,
      minRadius: b,
      destinationUp: g,
      duration: o
    });
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Object.assign`、`this._app.getManager`、`this._app.getManager("content").getEntityInfo`、`this._goToSystem`、`this.isBarycenter`、`this.removeBarycenter`。
   * 调用线索：Object.assign、this._app.getManager、this._app.getManager("content").getEntityInfo、this._goToSystem、this.isBarycenter等。
   */
  async goToSystem(t, e = {}) {
    if ("inner_solar_system" === t) {
      Object.assign(e, {
        distance: 7e8,
        angle: 25,
        planeId: "earth"
      });
      await this._goToSystem("sun", e);
    } else if ("outer_solar_system" === t) {
      Object.assign(e, {
        distance: 1e10,
        angle: 25,
        planeId: "earth"
      });
      await this._goToSystem("sun", e);
    } else {
      const i = this.isBarycenter(t) ? this.removeBarycenter(t) : t;
      const s = i in this._customSystemDistances ? this._customSystemDistances[i] : 0;
      const n = this._app.getManager("content").getEntityInfo(t);
      const o = "planeId" in e ? e.planeId : n?.planeEntity || "";
      Object.assign(e, {
        minDistance: s,
        planeId: o
      });
      await this._goToSystem(t, e);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.max`、`Pioneer.MathUtils.degToRad`、`S.getHorizontalFieldOfView`、`S.getVerticalFieldOfView`、`SolarSystemSceneExports.Cameras.getDistanceToFitEntities`、`T.getEquatorialRadius`。
   * 调用线索：Math.max、Pioneer.MathUtils.degToRad、S.getHorizontalFieldOfView、S.getVerticalFieldOfView、SolarSystemSceneExports.Cameras.getDistanceToFitEntities等。
   */
  async _goToSystem(t, {
    distance: distance,
    angle: i = 25,
    minDistance: o = 0,
    duration: r = 1,
    planeId: a = "",
    otherEntityNames: l = [],
    includeChildren: c = true,
    isRelativeToPreviousCamera: h = true
  } = {}) {
    this._cameraManager.setContext({
      id: t,
      context: CameraScripts.CONTEXT.SYSTEM
    });
    this.app.getManager("camera").setIsTransitioning(true);
    const d = this._scene.getEntity(t);
    const u = [d];
    for (let t = 0; t < l.length; t++) u.push(this._scene.getEntity(l[t]));
    if (c) for (let t = 0; t < d.getNumChildren(); t++) {
      const e = d.getChild(t);
      null === e.getComponent(Pioneer.CameraComponent) && (e.getName().startsWith("sc") || e.getPosition().isNaN() || u.push(e));
    }
    const vector3 = new Pioneer.Vector3();
    const _ = new Pioneer.Vector3();
    h ? (this._cameraEntity.getPositionRelativeToEntity(_, Pioneer.Vector3.Zero, d), _.isNaN() ? (vector3.copy(new Pioneer.Vector3(0, -1, 0)), vector3.mult(vector3, 1e10)) : vector3.copy(_)) : (vector3.normalize(d.getPosition()), vector3.mult(vector3, -1));
    const m = new Pioneer.Vector3();
    "" !== a && null !== this._scene.getEntity(a) ? (this.getNormalToEcliptic(m, a), m.isNaN() && m.copy(new Pioneer.Vector3(0, 0, 1))) : d.getOrientation().getAxis(m, 2);
    const g = new Pioneer.Vector3();
    g.cross(vector3, m);
    g.normalize(g);
    vector3.setNormalTo(m, vector3);
    vector3.normalize(vector3);
    const quaternion = new Pioneer.Quaternion();
    quaternion.setFromAxisAngle(g, Pioneer.MathUtils.degToRad(i));
    vector3.rotate(quaternion, vector3);
    let f = d.getOcclusionRadius();
    const T = d.getComponent(Pioneer.SpheroidComponent);
    if (null !== T) f = T.getEquatorialRadius();else if (this.isBarycenter(t)) {
      const e = this.removeBarycenter(t);
      const i = this._scene.getEntity(e).getComponent(Pioneer.SpheroidComponent);
      null !== T && (f = i.getEquatorialRadius());
    }
    const b = 1.2 * f;
    let E = distance;
    if (void 0 === E) {
      const t = new Pioneer.Quaternion();
      t.setFromAxes(g, vector3, void 0);
      E = SolarSystemSceneExports.Cameras.getDistanceToFitEntities(this._cameraEntity, t, d, u);
      E *= 1.3;
    }
    E = Math.max(o, E);
    const S = this._cameraEntity.getComponent(Pioneer.CameraComponent);
    if (S.getHorizontalFieldOfView() < S.getVerticalFieldOfView() && (E *= 1.3 * S.getVerticalFieldOfView()), h) {
      const e = new Pioneer.Vector3();
      this._cameraEntity.getPositionRelativeToEntity(_, Pioneer.Vector3.Zero, d);
      _.isNaN() ? (e.copy(new Pioneer.Vector3(0, -1, 0)), e.setNormalTo(m, e), e.mult(e, 1e10), e.rotate(quaternion, e)) : e.copy(_);
      await this._cameraManager.goToEntity(t, {
        destination: e,
        destinationUp: m,
        duration: r
      });
    } else await this._cameraManager.goToEntity(t, {
      distance: distance,
      duration: r / 2
    });
    vector3.mult(vector3, E);
    await this._cameraManager.goToEntity(t, {
      destination: vector3,
      cinematic: false,
      minRadius: b,
      destinationUp: m,
      duration: r
    });
    this.app.getManager("camera").setIsTransitioning(false);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `c.getName`、`c.setOrientation`、`c.setParent`、`c.setPosition`、`l.push`、`n.getPositionRelativeToEntity`。
   * 调用线索：c.getName、c.setOrientation、c.setParent、c.setPosition、l.push等。
   */
  async goToCenter(t, e, i, n = {}) {
    this._cameraManager.setContext({
      id: "centerSystem",
      context: CameraScripts.CONTEXT.CENTER_SYSTEM
    });
    const vector3 = new Pioneer.Vector3();
    const r = this._scene.getEntity(e);
    const a = new Pioneer.Vector3();
    const l = [];
    for (let e = 0; e < t.length; e++) {
      const n = this._scene.getEntity(t[e]);
      l.push(n);
      n.getPositionRelativeToEntity(a, Pioneer.Vector3.Zero, r, i);
      vector3.addMult(vector3, a, 1 / t.length);
    }
    let c = this._scene.getEntity("center");
    null === c && (c = this._scene.addEntity("center"), c.setOrientation(Pioneer.Quaternion.Identity));
    c.setParent(r);
    c.setPosition(vector3);
    await this._scene.getLoadedPromise();
    n.otherEntityNames = t;
    await this._goToSystem(c.getName(), n);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `d.push`、`n.getPositionRelativeToEntity`、`new Pioneer.Vector3`、`this._cameraManager.setContext`、`this._scene.addEntity`、`this._scene.getEntity`。
   * 调用线索：d.push、n.getPositionRelativeToEntity、new Pioneer.Vector3、this._cameraManager.setContext、this._scene.addEntity等。
   */
  async showLocationCenter(t, e, i, n, o, r, a = {}) {
    this._cameraManager.setContext({
      id: "centerLocation",
      context: CameraScripts.CONTEXT.CENTER_LOCATION
    });
    const vector3 = new Pioneer.Vector3();
    const c = this._scene.getEntity(e);
    const h = new Pioneer.Vector3();
    const d = [];
    for (let e = 0; e < t.length; e++) {
      const n = this._scene.getEntity(t[e]);
      d.push(n);
      n.getPositionRelativeToEntity(h, Pioneer.Vector3.Zero, c, i);
      vector3.addMult(vector3, h, 1 / t.length);
    }
    let u = this._scene.getEntity("center");
    null === u && (u = this._scene.addEntity("center"), u.setOrientation(Pioneer.Quaternion.Identity));
    u.setParent(c);
    u.setPosition(vector3);
    await this._scene.getLoadedPromise();
    a.otherEntityNames = t;
    await this.showLocation(u.getName(), n, o, r, a);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `contentManager.getEntityInfo`、`this._app.getManager`、`this._app.getManager("scene").getParent`、`this.showLocation`。
   * 调用线索：contentManager.getEntityInfo、this._app.getManager、this._app.getManager("scene").getParent、this.showLocation。
   */
  async showLocationInParentSystem(t, e = {}) {
    const contentManager = this._app.getManager("content");
    let s = this._app.getManager("scene").getParent(t);
    s = "Landing site" === contentManager.getEntityInfo(s).category ? this._app.getManager("scene").getParent(s) : s;
    await this.showLocation(t, s, s, "northPole", e);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `i.getName`、`i.getParent`、`i.getParent().getName`、`this._scene.getEntity`、`this._scene.getEntity(t).getParent`、`this.showLocation`。
   * 调用线索：i.getName、i.getParent、i.getParent().getName、this._scene.getEntity、this._scene.getEntity(t).getParent等。
   */
  async showLocationInSolarSystem(t, e = {}) {
    let i = this._scene.getEntity(t).getParent();
    if ("sun" !== i.getName()) for (; "sun" !== i.getParent().getName();) i = i.getParent();else i = this._scene.getEntity("earth");
    await this.showLocation(t, i.getName(), "sun", "planeNormal", e);
  }
}
CameraScripts.CONTEXT = {
  CELESTIAL_OBJECT: 0,
  SPACECRAFT: 1,
  ALIGN_SPACECRAFT: 2,
  LOCATION: 3,
  SYSTEM: 4,
  COMPARE: 5,
  LOOK_AT: 6,
  LOCKED_ON: 7,
  INSTRUMENT: 8,
  ALIGN_OBJECTS: 9,
  CENTER_SYSTEM: 10,
  CENTER_LOCATION: 11,
  LOOK_SURFACE_LAT_LON: 12
};
export { CameraScripts };
