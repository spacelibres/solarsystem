// 实例粒子共享四边形，offset/color/scale 分别为 3/4/1 分量；任一属性改变粒子数会一起重建三数组，随后只复制当前属性，保留原调用顺序要求。
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
  setParticleOffsets(offsets) {
    this._setAttribute("offset", offsets, 3);
  }
  setParticleColors(colors) {
    this._setAttribute("color", colors, 4);
  }
  setParticleScales(scales) {
    this._setAttribute("scale", scales, 1);
  }
  getRelativeToEntityOrientation() {
    return this._relativeToEntityOrientation;
  }
  setRelativeToEntityOrientation(relativeToEntityOrientation) {
    this._relativeToEntityOrientation = relativeToEntityOrientation;
  }
  prepareForRender(camera) {
    PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this._threeJsObject, this._component.getEntity(), camera);
    if (this._relativeToEntityOrientation) {
      PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this._threeJsObject, this._component.getEntity());
    }
  }
  _setAttribute(name, data, dimensions) {
    let attribute = this._threeJsGeometry.getAttribute(name);
    if (attribute instanceof PioneerPublicApi.THREE.InstancedBufferAttribute && attribute.count !== data.length / dimensions) {
      this._offsetArray = new Float32Array(data.length / dimensions * 3);
      this._colorArray = new Float32Array(data.length / dimensions * 4);
      this._scaleArray = new Float32Array(data.length / dimensions * 1);
      this._threeJsGeometry.instanceCount = data.length / dimensions;
      this._threeJsGeometry.setAttribute("offset", new PioneerPublicApi.THREE.InstancedBufferAttribute(this._offsetArray, 3));
      this._threeJsGeometry.setAttribute("color", new PioneerPublicApi.THREE.InstancedBufferAttribute(this._colorArray, 4));
      this._threeJsGeometry.setAttribute("scale", new PioneerPublicApi.THREE.InstancedBufferAttribute(this._scaleArray, 1));
    }
    attribute = this._threeJsGeometry.getAttribute(name);
    if (attribute instanceof PioneerPublicApi.THREE.InstancedBufferAttribute) {
      attribute.copyArray(data);
      attribute.needsUpdate = true;
    }
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
