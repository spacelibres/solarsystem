/** 线球求交返回射线参数而非距离，direction 不要求单位向量；球面 LLA 角量为弧度，alt 是径向长度减半径。 */

// Recovered from app.js:49525-50278.
class Geometry {
  static getLineSphereIntersectionWithSphereAtOrigin(lineOrigin, lineDirection, sphereRadius) {
    const originMagnitudeSquared = lineOrigin.dot(lineOrigin);
    const originDirectionDot = lineOrigin.dot(lineDirection);
    const directionMagnitudeSquared = lineDirection.dot(lineDirection);
    const discriminant = originDirectionDot * originDirectionDot + (sphereRadius * sphereRadius - originMagnitudeSquared) * directionMagnitudeSquared;
    return discriminant < 0 ? Number.NaN : (-originDirectionDot - Math.sqrt(discriminant)) / directionMagnitudeSquared;
  }
  static getLineSphereIntersectionWithLineStartAtOrigin(intersectionOut, lineDirection, sphereCenter, sphereRadius) {
    const directionMagnitudeSquared = lineDirection.dot(lineDirection);
    const directionCenterDot = lineDirection.dot(sphereCenter);
    const discriminant = directionCenterDot * directionCenterDot + (sphereRadius * sphereRadius - sphereCenter.dot(sphereCenter)) * directionMagnitudeSquared;
    if (discriminant < 0) {
      intersectionOut.min = Number.NaN;
      intersectionOut.max = Number.NaN;
    } else {
      const sqrtDiscriminant = Math.sqrt(discriminant);
      intersectionOut.min = (directionCenterDot - sqrtDiscriminant) / directionMagnitudeSquared;
      intersectionOut.max = (directionCenterDot + sqrtDiscriminant) / directionMagnitudeSquared;
    }
  }
  static getLLAFromXYZOnSphere(llaOut, position, sphereRadius) {
    const equatorialDistance = position.magnitudeXY();
    llaOut.lon = Math.atan2(position.y, position.x);
    llaOut.lat = Math.atan(position.z / equatorialDistance);
    llaOut.alt = position.magnitude() - sphereRadius;
  }
  static getXYZFromLLAOnSphere(positionOut, lla, sphereRadius) {
    positionOut.x = (sphereRadius + lla.alt) * Math.cos(lla.lat) * Math.cos(lla.lon);
    positionOut.y = (sphereRadius + lla.alt) * Math.cos(lla.lat) * Math.sin(lla.lon);
    positionOut.z = (sphereRadius + lla.alt) * Math.sin(lla.lat);
  }
}
export { Geometry };
