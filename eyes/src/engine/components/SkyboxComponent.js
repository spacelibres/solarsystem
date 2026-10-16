// 天空球纹理由 ResourceManager 计数持有；异步加载后若组件不再 loading 则立即归还。经度接缝保留重复顶点，使 UV 两端分别落在纹理边界。
// Recovered from app.js:387237-389792.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class SkyboxComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._numLatVerts = 20;
    this._textureUrl = "";
    this.__setRadius(1e24);
    this.__setUsesEntityOrientation(true);
  }
  getTextureUrl() {
    return this._textureUrl;
  }
  setTextureUrl(textureUrl) {
    this._textureUrl = textureUrl;
    this.resetResources();
  }
  __prepareForRender(camera) {
    PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity());
    PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), camera);
  }
  async __loadResources() {
    const texture = await this.getEngine().getResourceManager().acquire(this, this._textureUrl, "texture", 0);
    if ("loading" !== this.getLoadState().state) return void this.getEngine().getResourceManager().releaseAllForEntityItem(this);
    const material = PioneerPublicApi.MaterialUtils.get();
    this.getThreeJsMaterials().push(material);
    material.defines.colorMapEmissive = true;
    material.needsUpdate = true;
    material.uniforms.colorTexture.value = texture;
    const mesh = PioneerPublicApi.ThreeJsHelper.createMeshObject(this, material, [{
      name: "position",
      dimensions: 3
    }, {
      name: "uv",
      dimensions: 2
    }], false);
    this.getThreeJsObjects().push(mesh);
    PioneerPublicApi.ThreeJsHelper.useInDynEnvMap(mesh, true);
    const latitudeStep = PioneerPublicApi.MathUtils.Pi / (this._numLatVerts - 1);
    const longitudeStep = PioneerPublicApi.MathUtils.Pi / this._numLatVerts;
    const vertexCount = (2 * this._numLatVerts + 1) * this._numLatVerts;
    const positions = new Float32Array(3 * vertexCount);
    const uvs = new Float32Array(2 * vertexCount);
    const indices = new Uint16Array(this._numLatVerts * (this._numLatVerts - 1) * 12);
    const position = PioneerPublicApi.Vector3.pool.get();
    const geodetic = PioneerPublicApi.LatLonAlt.pool.get();
    for (let latitudeIndex = 0; latitudeIndex < this._numLatVerts; latitudeIndex++) for (let longitudeIndex = 0; longitudeIndex < 2 * this._numLatVerts + 1; longitudeIndex++) {
      geodetic.lat = latitudeIndex * latitudeStep - PioneerPublicApi.MathUtils.HalfPi;
      geodetic.lon = longitudeIndex * longitudeStep - PioneerPublicApi.MathUtils.Pi;
      geodetic.alt = 0;
      position.x = 5e23 * Math.cos(geodetic.lat) * Math.cos(geodetic.lon);
      position.y = 5e23 * Math.cos(geodetic.lat) * Math.sin(geodetic.lon);
      position.z = 5e23 * Math.sin(geodetic.lat);
      const vertexIndex = latitudeIndex * (2 * this._numLatVerts + 1) + longitudeIndex;
      positions[3 * vertexIndex + 0] = position.x;
      positions[3 * vertexIndex + 1] = position.y;
      positions[3 * vertexIndex + 2] = position.z;
      uvs[2 * vertexIndex + 0] = .5 - geodetic.lon / PioneerPublicApi.MathUtils.TwoPi;
      uvs[2 * vertexIndex + 1] = .5 - geodetic.lat / PioneerPublicApi.MathUtils.Pi;
      const cellIndex = latitudeIndex * this._numLatVerts * 2 + longitudeIndex;
      if (latitudeIndex < this._numLatVerts - 1 && longitudeIndex < 2 * this._numLatVerts) {
        indices[6 * cellIndex + 0] = (2 * this._numLatVerts + 1) * (latitudeIndex + 0) + (longitudeIndex + 0);
        indices[6 * cellIndex + 1] = (2 * this._numLatVerts + 1) * (latitudeIndex + 1) + (longitudeIndex + 0);
        indices[6 * cellIndex + 2] = (2 * this._numLatVerts + 1) * (latitudeIndex + 1) + (longitudeIndex + 1);
        indices[6 * cellIndex + 3] = (2 * this._numLatVerts + 1) * (latitudeIndex + 0) + (longitudeIndex + 0);
        indices[6 * cellIndex + 4] = (2 * this._numLatVerts + 1) * (latitudeIndex + 1) + (longitudeIndex + 1);
        indices[6 * cellIndex + 5] = (2 * this._numLatVerts + 1) * (latitudeIndex + 0) + (longitudeIndex + 1);
      }
    }
    PioneerPublicApi.LatLonAlt.pool.release(geodetic);
    PioneerPublicApi.Vector3.pool.release(position);
    const geometry = this.getThreeJsObjects()[0].geometry;
    PioneerPublicApi.ThreeJsHelper.setVertices(geometry, "position", positions);
    PioneerPublicApi.ThreeJsHelper.setVertices(geometry, "uv", uvs);
    PioneerPublicApi.ThreeJsHelper.setIndices(geometry, indices);
  }
  __unloadResources() {
    this.getEngine().getResourceManager().releaseByUrl(this, this._textureUrl, "texture");
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this, false);
  }
  _numLatVerts;
  _textureUrl;
}
export { SkyboxComponent };
