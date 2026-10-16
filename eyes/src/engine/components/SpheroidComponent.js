// 椭球坐标区分行星地理纬度与地心纬度；射线求交先按赤道/极半径比缩放 Z 成球体，求交后还原。局部 up/east/north 与 AER 均从地理法线构建，保留迭代次数及原公式。
// Recovered from app.js:392139-397114.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class SpheroidComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._equatorialRadius = 1;
    this._polarRadius = 1;
    this._planetographic = false;
    this._changed = true;
    this._changedCallbacks = new PioneerPublicApi.FastSet();
    this.setIsGroundComponent(true);
    this.__setRadius(Math.max(this._polarRadius, this._equatorialRadius));
  }
  getEquatorialRadius() {
    return this._equatorialRadius;
  }
  setEquatorialRadius(equatorialRadius) {
    this._equatorialRadius = equatorialRadius;
    this.__setRadius(Math.max(this._polarRadius, this._equatorialRadius));
    this._changed = true;
  }
  getPolarRadius() {
    return this._polarRadius;
  }
  setPolarRadius(polarRadius) {
    this._polarRadius = polarRadius;
    this.__setRadius(Math.max(this._polarRadius, this._equatorialRadius));
    this._changed = true;
  }
  isPlanetographic() {
    return this._planetographic;
  }
  setPlanetographic(planetographic) {
    this._planetographic = planetographic;
    this._changed = true;
  }
  addChangedCallback(callback) {
    this._changedCallbacks.add(callback);
  }
  removeChangedCallback(callback) {
    this._changedCallbacks.delete(callback);
  }
  __update() {
    if (this._changed) {
      for (let callbackIndex = 0; callbackIndex < this._changedCallbacks.getSize(); callbackIndex++) this._changedCallbacks.getAt(callbackIndex)();
      this._changed = false;
    }
  }
  xyzFromLLA(output, geodetic) {
    const latitudeCos = Math.cos(geodetic.lat);
    const latitudeSin = Math.sin(geodetic.lat);
    if (this._planetographic) {
      const eccentricitySquared = 1 - this._polarRadius * this._polarRadius / (this._equatorialRadius * this._equatorialRadius);
      const primeVerticalRadius = this._equatorialRadius / Math.sqrt(1 - eccentricitySquared * latitudeSin * latitudeSin);
      output.x = (primeVerticalRadius + geodetic.alt) * latitudeCos * Math.cos(geodetic.lon);
      output.y = (primeVerticalRadius + geodetic.alt) * latitudeCos * Math.sin(geodetic.lon);
      output.z = ((1 - eccentricitySquared) * primeVerticalRadius + geodetic.alt) * latitudeSin;
    } else {
      const equatorialRadius = this._equatorialRadius;
      const polarRadius = this._polarRadius;
      const radialRadius = equatorialRadius * polarRadius / Math.sqrt(polarRadius * polarRadius * latitudeCos * latitudeCos + equatorialRadius * equatorialRadius * latitudeSin * latitudeSin);
      output.x = (radialRadius + geodetic.alt) * latitudeCos * Math.cos(geodetic.lon);
      output.y = (radialRadius + geodetic.alt) * latitudeCos * Math.sin(geodetic.lon);
      output.z = (radialRadius + geodetic.alt) * latitudeSin;
    }
  }
  // 地理纬度分支迭代求卯酉圈曲率半径；地心纬度分支直接按射线方向求椭球表面半径。
  radiusFromXYZ(position, iterations = 5) {
    if (this._planetographic) {
      const horizontalRadius = position.magnitudeXY();
      const eccentricitySquared = 1 - this._polarRadius * this._polarRadius / (this._equatorialRadius * this._equatorialRadius);
      let latitude = Math.atan(position.z / ((1 - eccentricitySquared) * horizontalRadius));
      let primeVerticalRadius = 0;
      for (let iteration = 0; iteration < iterations; iteration++) {
        const latitudeSin = Math.sin(latitude);
        primeVerticalRadius = this._equatorialRadius / Math.sqrt(1 - eccentricitySquared * latitudeSin * latitudeSin);
        latitude = Math.atan((position.z + primeVerticalRadius * eccentricitySquared * latitudeSin) / horizontalRadius);
      }
      return primeVerticalRadius;
    }
    const slopeSquared = position.z * position.z / (position.x * position.x + position.y * position.y);
    const latitudeCosSquared = 1 / (1 + slopeSquared);
    const latitudeSinSquared = slopeSquared * latitudeCosSquared;
    const equatorialRadius = this._equatorialRadius;
    const polarRadius = this._polarRadius;
    return equatorialRadius * polarRadius / Math.sqrt(polarRadius * polarRadius * latitudeCosSquared + equatorialRadius * equatorialRadius * latitudeSinSquared);
  }
  llaFromXYZ(output, position, iterations = 5) {
    if (this._planetographic) {
      output.lon = Math.atan2(position.y, position.x);
      const horizontalRadius = position.magnitudeXY();
      const eccentricitySquared = 1 - this._polarRadius * this._polarRadius / (this._equatorialRadius * this._equatorialRadius);
      output.lat = Math.atan(position.z / ((1 - eccentricitySquared) * horizontalRadius));
      let radiusFactor = 0;
      for (let iteration = 0; iteration < iterations; iteration++) {
        const latitudeSin = Math.sin(output.lat);
        radiusFactor = 1 / Math.sqrt(1 - eccentricitySquared * latitudeSin * latitudeSin);
        output.lat = Math.atan((position.z + this._equatorialRadius * radiusFactor * eccentricitySquared * latitudeSin) / horizontalRadius);
      }
      output.alt = horizontalRadius / Math.cos(output.lat) - this._equatorialRadius * radiusFactor;
    } else {
      const horizontalRadius = position.magnitudeXY();
      output.lon = Math.atan2(position.y, position.x);
      output.lat = Math.atan(position.z / horizontalRadius);
      const latitudeCos = Math.cos(output.lat);
      const latitudeSin = Math.sin(output.lat);
      const equatorialRadius = this._equatorialRadius;
      const polarRadius = this._polarRadius;
      const radialRadius = equatorialRadius * polarRadius / Math.sqrt(polarRadius * polarRadius * latitudeCos * latitudeCos + equatorialRadius * equatorialRadius * latitudeSin * latitudeSin);
      output.alt = position.magnitude() - radialRadius;
    }
  }
  llaToggleGraphicCentric(output, geodetic) {
    const position = PioneerPublicApi.Vector3.pool.get();
    this.xyzFromLLA(position, geodetic);
    this._planetographic = !this._planetographic;
    this.llaFromXYZ(output, position);
    this._planetographic = !this._planetographic;
    PioneerPublicApi.Vector3.pool.release(position);
  }
  upFromLLA(output, geodetic) {
    const graphicCoordinates = PioneerPublicApi.LatLonAlt.pool.get();
    if (this._planetographic) {
      graphicCoordinates.copy(geodetic);
    } else {
      this.llaToggleGraphicCentric(graphicCoordinates, geodetic);
    }
    output.x = Math.cos(graphicCoordinates.lat) * Math.cos(graphicCoordinates.lon);
    output.y = Math.cos(graphicCoordinates.lat) * Math.sin(graphicCoordinates.lon);
    output.z = Math.sin(graphicCoordinates.lat);
    PioneerPublicApi.LatLonAlt.pool.release(graphicCoordinates);
  }
  eastFromLLA(output, geodetic) {
    output.x = -Math.sin(geodetic.lon);
    output.y = Math.cos(geodetic.lon);
    output.z = 0;
  }
  northFromLLA(output, geodetic) {
    const graphicCoordinates = PioneerPublicApi.LatLonAlt.pool.get();
    if (this._planetographic) {
      graphicCoordinates.copy(geodetic);
    } else {
      this.llaToggleGraphicCentric(graphicCoordinates, geodetic);
    }
    output.x = -Math.sin(graphicCoordinates.lat) * Math.cos(graphicCoordinates.lon);
    output.y = -Math.sin(graphicCoordinates.lat) * Math.sin(graphicCoordinates.lon);
    output.z = Math.cos(graphicCoordinates.lat);
    PioneerPublicApi.LatLonAlt.pool.release(graphicCoordinates);
  }
  orientationFromLLA(output, geodetic) {
    const graphicCoordinates = PioneerPublicApi.LatLonAlt.pool.get();
    if (this._planetographic) {
      graphicCoordinates.copy(geodetic);
    } else {
      this.llaToggleGraphicCentric(graphicCoordinates, geodetic);
    }
    const latitudeSin = Math.sin(graphicCoordinates.lat);
    const longitudeSin = Math.sin(graphicCoordinates.lon);
    const longitudeCos = Math.cos(graphicCoordinates.lon);
    output.w = .5 * Math.sqrt((1 + latitudeSin) * (1 - longitudeSin));
    output.x = .5 * Math.sqrt((1 - latitudeSin) * (1 - longitudeSin));
    output.y = .5 * Math.sqrt((1 - latitudeSin) * (1 + longitudeSin)) * Math.sign(longitudeCos);
    output.z = .5 * Math.sqrt((1 + latitudeSin) * (1 + longitudeSin)) * Math.sign(longitudeCos);
    PioneerPublicApi.LatLonAlt.pool.release(graphicCoordinates);
  }
  aerFromXYZRelToLLA(output, position, observerGeodetic) {
    const direction = PioneerPublicApi.Vector3.pool.get();
    this.xyzFromLLA(direction, observerGeodetic);
    const observerCoordinates = PioneerPublicApi.LatLonAlt.pool.get();
    if (this._planetographic) {
      observerCoordinates.copy(observerGeodetic);
    } else {
      this.llaFromXYZ(observerCoordinates, direction);
    }
    direction.sub(position, direction);
    output.range = direction.magnitude();
    direction.mult(direction, 1 / output.range);
    const surfaceNormal = PioneerPublicApi.Vector3.pool.get();
    this.upFromLLA(surfaceNormal, observerCoordinates);
    const verticalProjection = direction.dot(surfaceNormal);
    output.elevation = PioneerPublicApi.MathUtils.HalfPi - Math.acos(verticalProjection);
    direction.addMult(direction, surfaceNormal, -verticalProjection);
    PioneerPublicApi.Vector3.pool.release(surfaceNormal);
    const north = PioneerPublicApi.Vector3.pool.get();
    this.northFromLLA(north, observerCoordinates);
    const east = PioneerPublicApi.Vector3.pool.get();
    this.eastFromLLA(east, observerCoordinates);
    output.azimuth = Math.atan2(direction.dot(east), direction.dot(north));
    PioneerPublicApi.Vector3.pool.release(north);
    PioneerPublicApi.Vector3.pool.release(east);
    PioneerPublicApi.LatLonAlt.pool.release(observerCoordinates);
    PioneerPublicApi.Vector3.pool.release(direction);
  }
  // 缩放 Z 后椭球化为赤道半径球；相同线参数仍适用，返回点最后撤销 Z 缩放。
  getRayIntersection(output, rayOrigin, rayDirection) {
    const polarScale = this._equatorialRadius / this._polarRadius;
    const scaledOrigin = PioneerPublicApi.Vector3.pool.get();
    const scaledDirection = PioneerPublicApi.Vector3.pool.get();
    scaledOrigin.set(rayOrigin.x, rayOrigin.y, rayOrigin.z * polarScale);
    scaledDirection.set(rayDirection.x, rayDirection.y, rayDirection.z * polarScale);
    const rayParameter = PioneerPublicApi.Geometry.getLineSphereIntersectionWithSphereAtOrigin(scaledOrigin, scaledDirection, this._equatorialRadius);
    output.addMult(scaledOrigin, scaledDirection, rayParameter);
    PioneerPublicApi.Vector3.pool.release(scaledOrigin);
    PioneerPublicApi.Vector3.pool.release(scaledDirection);
    output.z /= polarScale;
  }
  getGroundPosition(output, normal, position) {
    const geodetic = PioneerPublicApi.LatLonAlt.pool.get();
    this.llaFromXYZ(geodetic, position);
    geodetic.alt = 0;
    this.xyzFromLLA(output, geodetic);
    const scratchPosition = PioneerPublicApi.Vector3.pool.get();
    if (normal) {
      this.upFromLLA(normal, geodetic);
    }
    PioneerPublicApi.LatLonAlt.pool.release(geodetic);
    PioneerPublicApi.Vector3.pool.release(scratchPosition);
  }
  _equatorialRadius;
  _polarRadius;
  _planetographic;
  _changed;
  _changedCallbacks;
}
export { SpheroidComponent };
