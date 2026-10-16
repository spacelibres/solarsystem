// Recovered from app.js:735147-737637.
import * as Pioneer from "../pioneer/index.js";
/** 球面跳转先转到球体参考系，按轨道平面与经纬角弧长求抬升曲线，再换回父参考系；角量弧度，位置/半径/高度同单位。 */
class Transitions {
  static jumpToLocationOnSphere(arcScale, sphereRadius, keepSphereUp, sphereEntity, entity, initialPosition, finalPosition, initialOrientation, finalOrientation, fraction) {
    if (arcScale <= 0) {
      arcScale = .001;
    }
    fraction = Transitions.easeInOut(fraction);
    const parentEntity = entity.getParent();
    if (void 0 === sphereEntity) {
      if (!parentEntity) throw new Error("Needs entity parent or sphere entity.");
      sphereEntity = parentEntity;
    }
    const initialSpherePosition = Pioneer.Vector3.pool.get();
    const finalSpherePosition = Pioneer.Vector3.pool.get();
    if (parentEntity) {
      parentEntity.getPositionRelativeToEntity(initialSpherePosition, initialPosition, sphereEntity);
      parentEntity.getPositionRelativeToEntity(finalSpherePosition, finalPosition, sphereEntity);
    } else {
      initialSpherePosition.copy(initialPosition);
      finalSpherePosition.copy(finalPosition);
    }
    const initialAltitude = initialSpherePosition.magnitude() - sphereRadius;
    const finalAltitude = finalSpherePosition.magnitude() - sphereRadius;
    const orbitNormal = Pioneer.Vector3.pool.get();
    if (keepSphereUp) {
      sphereEntity.getOrientation().getAxis(orbitNormal, 2);
    } else {
      orbitNormal.cross(initialSpherePosition, finalSpherePosition);
    }
    orbitNormal.normalize(orbitNormal);
    if (orbitNormal.isZero()) {
      orbitNormal.set(0, 0, 1);
    }
    const initialOrbitPosition = Pioneer.Vector3.pool.get();
    const finalOrbitPosition = Pioneer.Vector3.pool.get();
    const orbitFrame = Pioneer.Quaternion.pool.get();
    orbitFrame.setFromAxis(orbitNormal, 2);
    initialOrbitPosition.rotateInverse(orbitFrame, initialSpherePosition);
    finalOrbitPosition.rotateInverse(orbitFrame, finalSpherePosition);
    const initialLLA = Pioneer.LatLonAlt.pool.get();
    const finalLLA = Pioneer.LatLonAlt.pool.get();
    Pioneer.Geometry.getLLAFromXYZOnSphere(initialLLA, initialOrbitPosition, 0);
    Pioneer.Geometry.getLLAFromXYZOnSphere(finalLLA, finalOrbitPosition, 0);
    Pioneer.Vector3.pool.release(finalOrbitPosition);
    Pioneer.Vector3.pool.release(initialOrbitPosition);
    let initialProjectedLongitude = initialLLA.lon * Math.cos(initialLLA.lat);
    let finalProjectedLongitude = finalLLA.lon * Math.cos(finalLLA.lat);
    if (initialProjectedLongitude + Math.PI < finalProjectedLongitude) {
      initialProjectedLongitude += 2 * Math.PI;
    }
    if (finalProjectedLongitude + Math.PI < initialProjectedLongitude) {
      finalProjectedLongitude += 2 * Math.PI;
    }
    const surfaceArcLength = sphereRadius * arcScale * Math.sqrt((finalProjectedLongitude - initialProjectedLongitude) * (finalProjectedLongitude - initialProjectedLongitude) + (finalLLA.lat - initialLLA.lat) * (finalLLA.lat - initialLLA.lat));
    const jumpCoordinates = Pioneer.Vector2.pool.get();
    Transitions._jumpOnCircle(jumpCoordinates, surfaceArcLength, initialAltitude, finalAltitude, fraction);
    const remainingArcLength = jumpCoordinates.x;
    const jumpAltitude = jumpCoordinates.y;
    Pioneer.Vector2.pool.release(jumpCoordinates);
    const position = Pioneer.Vector3.pool.get();
    position.normalize(initialSpherePosition);
    position.mult(position, jumpAltitude + sphereRadius);
    const interpolatedLLA = Pioneer.LatLonAlt.pool.get();
    let arcFraction;
    arcFraction = 0 !== surfaceArcLength ? (surfaceArcLength - remainingArcLength) / surfaceArcLength : 0;
    interpolatedLLA.lat = Pioneer.MathUtils.lerp(initialLLA.lat, finalLLA.lat, arcFraction);
    interpolatedLLA.lon = Pioneer.MathUtils.lerpAngle(initialLLA.lon, finalLLA.lon, arcFraction);
    interpolatedLLA.alt = jumpAltitude;
    Pioneer.Geometry.getXYZFromLLAOnSphere(position, interpolatedLLA, sphereRadius);
    position.rotate(orbitFrame, position);
    Pioneer.LatLonAlt.pool.release(interpolatedLLA);
    Pioneer.LatLonAlt.pool.release(initialLLA);
    Pioneer.LatLonAlt.pool.release(finalLLA);
    Pioneer.Quaternion.pool.release(orbitFrame);
    if (position.isNaN()) {
      position.copy(finalSpherePosition);
    }
    if (parentEntity) {
      sphereEntity.getPositionRelativeToEntity(position, position, parentEntity);
    }
    entity.setPosition(position);
    Pioneer.Vector3.pool.release(position);
    Pioneer.Vector3.pool.release(orbitNormal);
    const focusDirection = Pioneer.Vector3.pool.get();
    sphereEntity.getPositionRelativeToEntity(focusDirection, Pioneer.Vector3.Zero, entity);
    focusDirection.normalize(focusDirection);
    const upDirection = Pioneer.Vector3.pool.get();
    const orientation = Pioneer.Quaternion.pool.get();
    if (keepSphereUp) {
      sphereEntity.getOrientation().getAxis(upDirection, 2);
    } else {
      orientation.slerp(initialOrientation, finalOrientation, fraction);
      orientation.getAxis(upDirection, 2);
    }
    upDirection.setNormalTo(focusDirection, upDirection);
    orientation.setFromAxes(void 0, focusDirection, upDirection);
    entity.setOrientation(orientation);
    Pioneer.Vector3.pool.release(upDirection);
    Pioneer.Quaternion.pool.release(orientation);
    Pioneer.Vector3.pool.release(focusDirection);
    Pioneer.Vector3.pool.release(initialSpherePosition);
    Pioneer.Vector3.pool.release(finalSpherePosition);
  }
  static easeInOut(fraction) {
    const fractionSquared = fraction * fraction;
    return fractionSquared / (2 * (fractionSquared - fraction) + 1);
  }
  /** 输出 x 为剩余弧长、y 为高度；近竖直退回线性路径，fraction=1 强制精确落在最终高度。 */
  static _jumpOnCircle(coordinatesOut, arcLength, initialAltitude, finalAltitude, fraction) {
    let altitude;
    let remainingArcLength;
    if (Math.abs(arcLength / (finalAltitude - initialAltitude)) > 1e-6) {
      const circleCenter = (finalAltitude - initialAltitude) / -arcLength * (finalAltitude + initialAltitude) / 2 + arcLength / 2;
      const centralAngle = Math.sign(arcLength) * Math.acos((initialAltitude * finalAltitude + (arcLength - circleCenter) * -circleCenter) / Math.sqrt(initialAltitude * initialAltitude + (arcLength - circleCenter) * (arcLength - circleCenter)) / Math.sqrt(finalAltitude * finalAltitude + circleCenter * circleCenter));
      const cosAngle = Math.cos(fraction * centralAngle);
      const sinAngle = Math.sin(fraction * centralAngle);
      altitude = (arcLength - circleCenter) * sinAngle + initialAltitude * cosAngle;
      remainingArcLength = circleCenter + (arcLength - circleCenter) * cosAngle - initialAltitude * sinAngle;
    } else {
      altitude = fraction * finalAltitude + (1 - fraction) * initialAltitude;
      remainingArcLength = (1 - fraction) * arcLength;
    }
    if (1 === fraction) {
      altitude = finalAltitude;
      remainingArcLength = 0;
    }
    coordinatesOut.set(remainingArcLength, altitude);
  }
}
export { Transitions };
