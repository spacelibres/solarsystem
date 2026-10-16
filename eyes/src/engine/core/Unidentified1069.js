// Recovered from app.js:1648403-1652579.
/* 望远镜辅助对象持有相机目标与拾取地标；着陆时按球面法线抬高位置并临时关闭大气。方位角/仰角转换使用父实体逆朝向，池对象用后归还。原全局 parent 检查与字符串方位角比较保持原状，不夹带行为修复。 */
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
import "../../framework/eyes/index.js";
let defaultExport;
defaultExport = class TelescopeHelper {
  constructor(app, entity) {
    this.pioneer = app.pioneer;
    this.scene = app.scene;
    this.camera = app.scene.getEntity("camera");
    this.cameraTarget = app.scene.getEntity("cameraTarget") || app.scene.addEntity("cameraTarget");
    this.fixedController = this.cameraTarget.getController(Pioneer.FixedController) || this.cameraTarget.addController(Pioneer.FixedController);
    this.cameraTarget.getController(Pioneer.RotateByEntityOrientationController) || this.cameraTarget.addController(Pioneer.RotateByEntityOrientationController);
    this.entity = entity;
  }
  reset() {
    this.entity = null;
    this.scene.getEntity("pickLocation") && this.scene.removeEntity("pickLocation");
    this.removePlacemark();
  }
  setPickedLocation(parentEntity) {
    let pickedEntity = this.scene.getEntity("pickLocation");
    if (!pickedEntity) {
      pickedEntity = this.scene.addEntity("pickLocation");
      pickedEntity.setCanOcclude(false);
      const fixedController = pickedEntity.addController(Pioneer.FixedController);
      fixedController.setPosition(Pioneer.Vector3.Zero);
      fixedController.setOrientation(Pioneer.Quaternion.Identity);
      pickedEntity.addController(Pioneer.RotateByEntityOrientationController);
    }
    pickedEntity.getParent()?.getName() !== parentEntity.getName() && (pickedEntity.setParent(parentEntity), pickedEntity.setOcclusionRadius(parentEntity.getOcclusionRadius()));
    return pickedEntity;
  }
  addPlacemark(latitudeDegrees, longitudeDegrees, placemarkId) {
    const pickedEntity = this.setPickedLocation(this.entity);
    this.removePlacemark();
    let placemarkEntity = this.scene.getEntity(placemarkId);
    placemarkEntity && this.scene.removeEntity(placemarkId);
    placemarkEntity = SolarSystemSceneExports.Placemarks.addPlacemark(placemarkId, placemarkId, this.entity, latitudeDegrees, longitudeDegrees, 10);
    placemarkEntity.setParent(pickedEntity);
    return placemarkEntity;
  }
  removePlacemark(placemarkId = "placemark") {
    this.scene.getEntity(placemarkId) && this.scene.removeEntity(placemarkId);
  }
  async flyToSurface(latitudeDegrees, longitudeDegrees) {
    this.fixedController.getEntity().setParent(this.entity);
    const surfacePosition = this.getPositionFromLatitudeLongitude(latitudeDegrees, longitudeDegrees);
    const quaternion = new Pioneer.Quaternion();
    const spheroidComponent = this.entity.getComponent(Pioneer.SpheroidComponent);
    const latLonAlt = new Pioneer.LatLonAlt();
    spheroidComponent.llaFromXYZ(latLonAlt, surfacePosition);
    spheroidComponent.orientationFromLLA(quaternion, latLonAlt);
    this.fixedController.setOrientation(quaternion);
    const vector3 = new Pioneer.Vector3();
    spheroidComponent.upFromLLA(vector3, latLonAlt);
    vector3.mult(vector3, 25);
    surfacePosition.add(surfacePosition, vector3);
    this.fixedController.setPosition(surfacePosition);
    await this.pioneer.waitUntilNextFrame();
    const lookDownAngle = this.camera.getComponent(Pioneer.CameraComponent).getVerticalFieldOfView() / 5;
    const cameraDestination = new Pioneer.Vector3(0, -.001 * Math.cos(lookDownAngle), -.001 * Math.sin(lookDownAngle));
    cameraDestination.rotate(this.cameraTarget.getOrientation(), cameraDestination);
    const atmosphereComponent = this.entity.getComponent(Pioneer.AtmosphereComponent);
    null !== atmosphereComponent && atmosphereComponent.setEnabled(false);
    await SolarSystemSceneExports.Cameras.goToEntity(this.camera, this.cameraTarget, {
      destination: cameraDestination,
      up: true,
      zoom: false
    }).catch();
    const orbitController = this.camera.getController(Pioneer.OrbitController);
    orbitController && orbitController.setPitchAngleLimits(new Pioneer.Interval(-Math.PI / 2, Math.PI / 72));
  }
  readCameraAE() {
    const azimuthElevation = {
      azimuth: 0,
      elevation: 0
    };
    this.getAEFromEntity(this.camera, azimuthElevation);
    return azimuthElevation;
  }
  getAEFromEntity(entity, outputAngles) {
    const parentEntity = entity.getParent();
    if (parentEntity) {
      const lookDirection = Pioneer.Vector3.pool.get();
      const azimuthElevationRange = Pioneer.AER.pool.get();
      const inverseParentOrientation = Pioneer.Quaternion.pool.get();
      inverseParentOrientation.inverse(parentEntity.getOrientation());
      entity.getOrientation().getAxis(lookDirection, 1);
      lookDirection.rotate(inverseParentOrientation, lookDirection);
      azimuthElevationRange.setFromVector(lookDirection);
      outputAngles.azimuth = (90 - Pioneer.MathUtils.radToDeg(azimuthElevationRange.azimuth)).toFixed(2);
      outputAngles.azimuth = Pioneer.MathUtils.wrap(outputAngles.azimuth, 0, 360).toFixed(2);
      outputAngles.elevation = Pioneer.MathUtils.radToDeg(azimuthElevationRange.elevation).toFixed(2);
      Pioneer.Quaternion.pool.release(inverseParentOrientation);
      Pioneer.AER.pool.release(azimuthElevationRange);
      Pioneer.Vector3.pool.release(lookDirection);
    }
  }
  getAzimuthElevation() {
    const cameraAngles = this.readCameraAE();
    if (!cameraAngles) return null;
    let {
      azimuth: azimuth,
      elevation: elevation
    } = cameraAngles;
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
  getLatitudeLongitude(localPosition) {
    const spheroidComponent = this.entity.getComponent(Pioneer.SpheroidComponent);
    if (null == spheroidComponent || null === parent || localPosition.isNaN()) return null;
    const latitudeLongitudeAltitude = Pioneer.LatLonAlt.pool.get();
    spheroidComponent.llaFromXYZ(latitudeLongitudeAltitude, localPosition);
    const coordinates = {
      latitude: Pioneer.MathUtils.radToDeg(latitudeLongitudeAltitude.lat),
      longitude: Pioneer.MathUtils.radToDeg(latitudeLongitudeAltitude.lon)
    };
    Pioneer.LatLonAlt.pool.release(latitudeLongitudeAltitude);
    return null == coordinates.latitude || null == coordinates.longitude ? null : coordinates;
  }
  getPositionFromLatitudeLongitude(latitudeDegrees, longitudeDegrees) {
    const spheroidComponent = this.entity.getComponent(Pioneer.SpheroidComponent);
    if (null == spheroidComponent || null === parent) return null;
    const latLonAlt = new Pioneer.LatLonAlt();
    latLonAlt.lat = Pioneer.MathUtils.degToRad(latitudeDegrees);
    latLonAlt.lon = Pioneer.MathUtils.degToRad(longitudeDegrees);
    const vector3 = new Pioneer.Vector3();
    spheroidComponent.xyzFromLLA(vector3, latLonAlt);
    return vector3;
  }
  formatLatitudeLongitude(latitudeDegrees, longitudeDegrees) {
    return {
      latitude: latitudeDegrees < 0 ? Math.abs(latitudeDegrees).toFixed(2) + "°S" : latitudeDegrees.toFixed(2) + "°N",
      longitude: longitudeDegrees < 0 ? Math.abs(longitudeDegrees).toFixed(2) + "°W" : longitudeDegrees.toFixed(2) + "°E"
    };
  }
  getUnformattedLatOrLon(coordinateText, coordinateType) {
    const compactText = coordinateText.replace(/\s/g, "");
    let degrees = parseFloat(compactText.split("°")[0]);
    "lat" === coordinateType && coordinateText.includes("°S") && (degrees *= -1);
    "lon" === coordinateType && coordinateText.includes("°W") && (degrees *= -1);
    return degrees;
  }
};
export { defaultExport as default };
