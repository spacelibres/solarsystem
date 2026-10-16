// Recovered from app.js:732069-733451.
/* 地标实体归父实体场景所有，局部位置由球面经纬度生成，朝向以东/北轴构造。所有临时向量、经纬高和四元数均从池借用并在提交控制器后释放。 */
import * as Pioneer from "../pioneer/index.js";
class Placemarks {
  static addPlacemark(placemarkId, contentHtml, parentEntity, latitudeDegrees, longitudeDegrees, groundDistance) {
    const placemarkEntity = parentEntity.getScene().addEntity(placemarkId);
    placemarkEntity.setParent(parentEntity);
    placemarkEntity.setCanOcclude(false);
    placemarkEntity.setExtentsRadius(.001);
    const labelElement = placemarkEntity.addComponent(Pioneer.DivComponent).getDiv();
    labelElement.innerHTML = contentHtml;
    labelElement.classList.add("pioneer-label-div");
    placemarkEntity.addController(Pioneer.FixedController);
    placemarkEntity.addController(Pioneer.RotateByEntityOrientationController);
    placemarkEntity.addController(Pioneer.GroundClampController);
    this.updateLLA(placemarkEntity, latitudeDegrees, longitudeDegrees, groundDistance);
    return placemarkEntity;
  }
  static updateLLA(placemarkEntity, latitudeDegrees, longitudeDegrees, groundDistance) {
    const parentEntity = placemarkEntity.getParent();
    const fixedController = placemarkEntity.getController(Pioneer.FixedController);
    const groundClamp = placemarkEntity.getController(Pioneer.GroundClampController);
    if (null === parentEntity || null === fixedController || null === groundClamp) throw new Error("There must be a parent and fixed and ground clamp controllers.");
    const spheroidComponent = parentEntity.getComponent(Pioneer.SpheroidComponent);
    if (null === spheroidComponent) throw new Error("There must be a spheroid for the placemark's parent.");
    const latitudeLongitudeAltitude = Pioneer.LatLonAlt.pool.get();
    const position = Pioneer.Vector3.pool.get();
    latitudeLongitudeAltitude.set(Pioneer.MathUtils.degToRad(latitudeDegrees), Pioneer.MathUtils.degToRad(longitudeDegrees), 0);
    spheroidComponent.xyzFromLLA(position, latitudeLongitudeAltitude);
    fixedController.setPosition(position);
    Pioneer.Vector3.pool.release(position);
    const orientation = Pioneer.Quaternion.pool.get();
    const eastDirection = Pioneer.Vector3.pool.get();
    const northDirection = Pioneer.Vector3.pool.get();
    spheroidComponent.eastFromLLA(eastDirection, latitudeLongitudeAltitude);
    spheroidComponent.northFromLLA(northDirection, latitudeLongitudeAltitude);
    orientation.setFromAxes(eastDirection, northDirection, void 0);
    fixedController.setOrientation(orientation);
    Pioneer.Vector3.pool.release(eastDirection);
    Pioneer.Vector3.pool.release(northDirection);
    Pioneer.Quaternion.pool.release(orientation);
    Pioneer.LatLonAlt.pool.release(latitudeLongitudeAltitude);
    groundClamp.setGroundEntityRef(parentEntity.getName());
    groundClamp.setDistanceFromGround(groundDistance);
  }
}
export { Placemarks };
