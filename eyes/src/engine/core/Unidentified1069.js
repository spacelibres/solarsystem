/** @eyes-analysis
 * 文件职责：TelescopeHelper：建立地面观察相机目标、经纬地标、飞行过渡和方位/仰角读数。
 * 依据：import ../pioneer/index.js；import ../solar-system/public-api.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1648403-1652579.
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import "../../framework/eyes/index.js";
let defaultExport;
defaultExport = /** @eyes-analysis
                 * 类职责：TelescopeHelper：建立地面观察相机目标、经纬地标、飞行过渡和方位/仰角读数。
                 * 继承：无显式父类；导出：default。
                 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
                 */
                class TelescopeHelper {
  /** @eyes-analysis
   * 【结构证据】写入 `camera`、`cameraTarget`、`entity`、`fixedController`、`pioneer`、`scene`；调用 `t.scene.addEntity`、`t.scene.getEntity`、`this.cameraTarget.addController`、`this.cameraTarget.getController`。
   * 状态写入：camera、cameraTarget、entity、fixedController、pioneer、scene。
   * 调用线索：t.scene.addEntity、t.scene.getEntity、this.cameraTarget.addController、this.cameraTarget.getController。
   */
  constructor(t, entity) {
    this.pioneer = t.pioneer;
    this.scene = t.scene;
    this.camera = t.scene.getEntity("camera");
    this.cameraTarget = t.scene.getEntity("cameraTarget") || t.scene.addEntity("cameraTarget");
    this.fixedController = this.cameraTarget.getController(Pioneer.FixedController) || this.cameraTarget.addController(Pioneer.FixedController);
    this.cameraTarget.getController(Pioneer.RotateByEntityOrientationController) || this.cameraTarget.addController(Pioneer.RotateByEntityOrientationController);
    this.entity = entity;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `entity`；调用 `this.removePlacemark`、`this.scene.getEntity`、`this.scene.removeEntity`。
   * 状态写入：entity。
   * 调用线索：this.removePlacemark、this.scene.getEntity、this.scene.removeEntity。
   */
  reset() {
    this.entity = null;
    this.scene.getEntity("pickLocation") && this.scene.removeEntity("pickLocation");
    this.removePlacemark();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `e`；调用 `e.addController`、`e.getParent`、`e.setCanOcclude`、`e.setOcclusionRadius`、`e.setParent`、`t.getName`。
   * 调用线索：e.addController、e.getParent、e.getParent()?.getName、e.setCanOcclude、e.setOcclusionRadius等。
   */
  setPickedLocation(t) {
    let e = this.scene.getEntity("pickLocation");
    if (!e) {
      e = this.scene.addEntity("pickLocation");
      e.setCanOcclude(false);
      const t = e.addController(Pioneer.FixedController);
      t.setPosition(Pioneer.Vector3.Zero);
      t.setOrientation(Pioneer.Quaternion.Identity);
      e.addController(Pioneer.RotateByEntityOrientationController);
    }
    e.getParent()?.getName() !== t.getName() && (e.setParent(t), e.setOcclusionRadius(t.getOcclusionRadius()));
    return e;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `o`；调用 `SolarSystemSceneExports.Placemarks.addPlacemark`、`o.setParent`、`this.removePlacemark`、`this.scene.getEntity`、`this.scene.removeEntity`、`this.setPickedLocation`。
   * 调用线索：SolarSystemSceneExports.Placemarks.addPlacemark、o.setParent、this.removePlacemark、this.scene.getEntity、this.scene.removeEntity等。
   */
  addPlacemark(t, e, i) {
    const s = this.setPickedLocation(this.entity);
    this.removePlacemark();
    let o = this.scene.getEntity(i);
    o && this.scene.removeEntity(i);
    o = SolarSystemSceneExports.Placemarks.addPlacemark(i, i, this.entity, t, e, 10);
    o.setParent(s);
    return o;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.scene.getEntity`、`this.scene.removeEntity`。
   * 调用线索：this.scene.getEntity、this.scene.removeEntity。
   */
  removePlacemark(t = "placemark") {
    this.scene.getEntity(t) && this.scene.removeEntity(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.cos`、`Math.sin`、`SolarSystemSceneExports.Cameras.goToEntity`、`SolarSystemSceneExports.Cameras.goToEntity(this.camera,this.cameraTarget,{destination:h,up:true,zoom:false}).catch`、`d.setEnabled`、`h.rotate`。
   * 调用线索：Math.cos、Math.sin、SolarSystemSceneExports.Cameras.goToEntity、SolarSystemSceneExports.Cameras.goToEntity(this.camera,this.cameraTarget,{destination:h,up:true,zoom:false}).catch、d.setEnabled等。
   */
  async flyToSurface(t, e) {
    this.fixedController.getEntity().setParent(this.entity);
    const i = this.getPositionFromLatitudeLongitude(t, e);
    const quaternion = new Pioneer.Quaternion();
    const r = this.entity.getComponent(Pioneer.SpheroidComponent);
    const latLonAlt = new Pioneer.LatLonAlt();
    r.llaFromXYZ(latLonAlt, i);
    r.orientationFromLLA(quaternion, latLonAlt);
    this.fixedController.setOrientation(quaternion);
    const vector3 = new Pioneer.Vector3();
    r.upFromLLA(vector3, latLonAlt);
    vector3.mult(vector3, 25);
    i.add(i, vector3);
    this.fixedController.setPosition(i);
    await this.pioneer.waitUntilNextFrame();
    const c = this.camera.getComponent(Pioneer.CameraComponent).getVerticalFieldOfView() / 5;
    const h = new Pioneer.Vector3(0, -.001 * Math.cos(c), -.001 * Math.sin(c));
    h.rotate(this.cameraTarget.getOrientation(), h);
    const d = this.entity.getComponent(Pioneer.AtmosphereComponent);
    null !== d && d.setEnabled(false);
    await SolarSystemSceneExports.Cameras.goToEntity(this.camera, this.cameraTarget, {
      destination: h,
      up: true,
      zoom: false
    }).catch();
    const u = this.camera.getController(Pioneer.OrbitController);
    u && u.setPitchAngleLimits(new Pioneer.Interval(-Math.PI / 2, Math.PI / 72));
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t`；调用 `this.getAEFromEntity`。
   * 调用线索：this.getAEFromEntity。
   */
  readCameraAE() {
    const t = {
      azimuth: 0,
      elevation: 0
    };
    this.getAEFromEntity(this.camera, t);
    return t;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `(90-Pioneer.MathUtils.radToDeg(o.azimuth)).toFixed`、`Pioneer.AER.pool.get`、`Pioneer.AER.pool.release`、`Pioneer.MathUtils.radToDeg`、`Pioneer.MathUtils.radToDeg(o.elevation).toFixed`、`Pioneer.MathUtils.wrap`。
   * 调用线索：(90-Pioneer.MathUtils.radToDeg(o.azimuth)).toFixed、Pioneer.AER.pool.get、Pioneer.AER.pool.release、Pioneer.MathUtils.radToDeg、Pioneer.MathUtils.radToDeg(o.elevation).toFixed等。
   */
  getAEFromEntity(t, e) {
    const i = t.getParent();
    if (i) {
      const n = Pioneer.Vector3.pool.get();
      const o = Pioneer.AER.pool.get();
      const r = Pioneer.Quaternion.pool.get();
      r.inverse(i.getOrientation());
      t.getOrientation().getAxis(n, 1);
      n.rotate(r, n);
      o.setFromVector(n);
      e.azimuth = (90 - Pioneer.MathUtils.radToDeg(o.azimuth)).toFixed(2);
      e.azimuth = Pioneer.MathUtils.wrap(e.azimuth, 0, 360).toFixed(2);
      e.elevation = Pioneer.MathUtils.radToDeg(o.elevation).toFixed(2);
      Pioneer.Quaternion.pool.release(r);
      Pioneer.AER.pool.release(o);
      Pioneer.Vector3.pool.release(n);
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `null` 或 `{azimuth:azimuth,elevation:elevation}`；调用 `this.readCameraAE`。
   * 调用线索：this.readCameraAE。
   */
  getAzimuthElevation() {
    const t = this.readCameraAE();
    if (!t) return null;
    let {
      azimuth: azimuth,
      elevation: elevation
    } = t;
    elevation += "°";
    azimuth >= 157.5 && azimuth <= 202.5 && (azimuth += "°S");
    azimuth >= 247.5 && azimuth <= 292.5 && (azimuth += "°W");
    (azimuth >= 337.5 || azimuth <= 22.5) && (azimuth += "°N");
    azimuth >= 67.5 && azimuth <= 112.5 && (azimuth += "°E");
    azimuth > 202.5 && azimuth < 247.5 && (azimuth += "°SW");
    azimuth > 292.5 && azimuth < 337.5 && (azimuth += "°NW");
    azimuth > 22.5 && azimuth < 67.5 && (azimuth += "°NE");
    azimuth > 112.5 && azimuth < 157.5 && (azimuth += "°SE");
    return {
      azimuth: azimuth,
      elevation: elevation
    };
  }
  /** @eyes-analysis
   * 【结构证据】返回 `null` 或 `null==n.latitude||null==n.longitude?null:n`；调用 `Pioneer.LatLonAlt.pool.get`、`Pioneer.LatLonAlt.pool.release`、`Pioneer.MathUtils.radToDeg`、`e.llaFromXYZ`、`t.isNaN`、`this.entity.getComponent`。
   * 调用线索：Pioneer.LatLonAlt.pool.get、Pioneer.LatLonAlt.pool.release、Pioneer.MathUtils.radToDeg、e.llaFromXYZ、t.isNaN等。
   */
  getLatitudeLongitude(t) {
    const e = this.entity.getComponent(Pioneer.SpheroidComponent);
    if (null == e || null === parent || t.isNaN()) return null;
    const i = Pioneer.LatLonAlt.pool.get();
    e.llaFromXYZ(i, t);
    const n = {
      latitude: Pioneer.MathUtils.radToDeg(i.lat),
      longitude: Pioneer.MathUtils.radToDeg(i.lon)
    };
    Pioneer.LatLonAlt.pool.release(i);
    return null == n.latitude || null == n.longitude ? null : n;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `null` 或 `vector3`；调用 `Pioneer.MathUtils.degToRad`、`i.xyzFromLLA`、`new Pioneer.LatLonAlt`、`new Pioneer.Vector3`、`this.entity.getComponent`。
   * 调用线索：Pioneer.MathUtils.degToRad、i.xyzFromLLA、new Pioneer.LatLonAlt、new Pioneer.Vector3、this.entity.getComponent。
   */
  getPositionFromLatitudeLongitude(t, e) {
    const i = this.entity.getComponent(Pioneer.SpheroidComponent);
    if (null == i || null === parent) return null;
    const latLonAlt = new Pioneer.LatLonAlt();
    latLonAlt.lat = Pioneer.MathUtils.degToRad(t);
    latLonAlt.lon = Pioneer.MathUtils.degToRad(e);
    const vector3 = new Pioneer.Vector3();
    i.xyzFromLLA(vector3, latLonAlt);
    return vector3;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `{latitude:t<0?Math.abs(t).toFixed(2)+"°S":t.toFixed(2)+"°N",longitude:e<0?Math.abs(e).toFixed(2)+"°W":e.toFixed(2)+"°E"}`；调用 `Math.abs`、`Math.abs(e).toFixed`、`Math.abs(t).toFixed`、`e.toFixed`、`t.toFixed`。
   * 调用线索：Math.abs、Math.abs(e).toFixed、Math.abs(t).toFixed、e.toFixed、t.toFixed。
   */
  formatLatitudeLongitude(t, e) {
    return {
      latitude: t < 0 ? Math.abs(t).toFixed(2) + "°S" : t.toFixed(2) + "°N",
      longitude: e < 0 ? Math.abs(e).toFixed(2) + "°W" : e.toFixed(2) + "°E"
    };
  }
  /** @eyes-analysis
   * 【结构证据】返回 `s`；调用 `i.split`、`parseFloat`、`t.includes`、`t.replace`。
   * 调用线索：i.split、parseFloat、t.includes、t.replace。
   */
  getUnformattedLatOrLon(t, e) {
    const i = t.replace(/\s/g, "");
    let s = parseFloat(i.split("°")[0]);
    "lat" === e && t.includes("°S") && (s *= -1);
    "lon" === e && t.includes("°W") && (s *= -1);
    return s;
  }
};
export { defaultExport as default };
