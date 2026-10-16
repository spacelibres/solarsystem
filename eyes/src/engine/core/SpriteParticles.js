// Recovered from app.js:145350-147997.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class SpriteParticles {
  constructor(component) {
    this._component = component;
    this._relativeToEntityOrientation = true;
    this._offsetArray = new Float32Array(0);
    this._colorArray = new Float32Array(0);
    this._scaleArray = new Float32Array(0);
    this._threeJsGeometry = new PioneerPublicApi.THREE.InstancedBufferGeometry();
    this._threeJsGeometry.setAttribute("position", new PioneerPublicApi.THREE.BufferAttribute(new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]), 3));
    this._threeJsGeometry.setIndex(new PioneerPublicApi.THREE.BufferAttribute(new Uint16Array([0, 1, 2, 2, 3, 0]), 1));
    this._threeJsGeometry.setAttribute("offset", new PioneerPublicApi.THREE.InstancedBufferAttribute(this._offsetArray, 3));
    this._threeJsGeometry.setAttribute("color", new PioneerPublicApi.THREE.InstancedBufferAttribute(this._colorArray, 4));
    this._threeJsGeometry.setAttribute("scale", new PioneerPublicApi.THREE.InstancedBufferAttribute(this._scaleArray, 1));
    this._threeJsMaterial = this._component.getEntity().getScene().getEngine().getMaterialManager().getPreloaded("sprite_particles");
    this._threeJsObject = PioneerPublicApi.ThreeJsHelper.createMeshObjectGivenGeometry(component, this._threeJsMaterial, this._threeJsGeometry);
  }
  getThreeJsObject() {
    return this._threeJsObject;
  }
  getThreeJsMaterial() {
    return this._threeJsMaterial;
  }
  setParticleOffsets(t) {
    this._setAttribute("offset", t, 3);
  }
  setParticleColors(t) {
    this._setAttribute("color", t, 4);
  }
  setParticleScales(t) {
    this._setAttribute("scale", t, 1);
  }
  getRelativeToEntityOrientation() {
    return this._relativeToEntityOrientation;
  }
  setRelativeToEntityOrientation(relativeToEntityOrientation) {
    this._relativeToEntityOrientation = relativeToEntityOrientation;
  }
  prepareForRender(t) {
    PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this._threeJsObject, this._component.getEntity(), t);
    this._relativeToEntityOrientation && PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this._threeJsObject, this._component.getEntity());
  }
  _setAttribute(t, e, i) {
    let n = this._threeJsGeometry.getAttribute(t);
    n instanceof PioneerPublicApi.THREE.InstancedBufferAttribute && n.count !== e.length / i && (this._offsetArray = new Float32Array(e.length / i * 3), this._colorArray = new Float32Array(e.length / i * 4), this._scaleArray = new Float32Array(e.length / i * 1), this._threeJsGeometry.instanceCount = e.length / i, this._threeJsGeometry.setAttribute("offset", new PioneerPublicApi.THREE.InstancedBufferAttribute(this._offsetArray, 3)), this._threeJsGeometry.setAttribute("color", new PioneerPublicApi.THREE.InstancedBufferAttribute(this._colorArray, 4)), this._threeJsGeometry.setAttribute("scale", new PioneerPublicApi.THREE.InstancedBufferAttribute(this._scaleArray, 1)));
    n = this._threeJsGeometry.getAttribute(t);
    n instanceof PioneerPublicApi.THREE.InstancedBufferAttribute && (n.copyArray(e), n.needsUpdate = true);
  }
  _component;
  _relativeToEntityOrientation;
  _offsetArray;
  _colorArray;
  _scaleArray;
  _threeJsGeometry;
  _threeJsMaterial;
  _threeJsObject;
}
export { SpriteParticles };
