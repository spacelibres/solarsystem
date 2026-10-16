/** @eyes-analysis
 * 文件职责：从六面或全景纹理构建随相机移动的背景天空。
 * 依据：import ../pioneer/public-api.js；SkyboxComponent extends PioneerPublicApi.BaseComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:387237-389792.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：从六面或全景纹理构建随相机移动的背景天空。
 * 继承：PioneerPublicApi.BaseComponent；导出：SkyboxComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class SkyboxComponent extends PioneerPublicApi.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_numLatVerts`、`_textureUrl`；调用 `super`、`this.__setRadius`、`this.__setUsesEntityOrientation`。
   * 状态写入：_numLatVerts、_textureUrl。
   * 调用线索：super、this.__setRadius、this.__setUsesEntityOrientation。
   */
  constructor(t, e) {
    super(t, e);
    this._numLatVerts = 20;
    this._textureUrl = "";
    this.__setRadius(1e24);
    this.__setUsesEntityOrientation(true);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._textureUrl`。
   */
  getTextureUrl() {
    return this._textureUrl;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_textureUrl`；调用 `this.resetResources`。
   * 状态写入：_textureUrl。
   * 调用线索：this.resetResources。
   */
  setTextureUrl(textureUrl) {
    this._textureUrl = textureUrl;
    this.resetResources();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setOrientationToEntity`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`this.getEntity`、`this.getThreeJsObjects`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setOrientationToEntity、PioneerPublicApi.ThreeJsHelper.setPositionToEntity、this.getEntity、this.getThreeJsObjects。
   */
  __prepareForRender(t) {
    PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity());
    PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void this.getEngine().getResourceManager().releaseAllForEntityItem(this)`；调用 `Math.cos`、`Math.sin`、`PioneerPublicApi.LatLonAlt.pool.get`、`PioneerPublicApi.LatLonAlt.pool.release`、`PioneerPublicApi.MaterialUtils.get`、`PioneerPublicApi.ThreeJsHelper.createMeshObject`。
   * 调用线索：Math.cos、Math.sin、PioneerPublicApi.LatLonAlt.pool.get、PioneerPublicApi.LatLonAlt.pool.release、PioneerPublicApi.MaterialUtils.get等。
   */
  async __loadResources() {
    const t = await this.getEngine().getResourceManager().acquire(this, this._textureUrl, "texture", 0);
    if ("loading" !== this.getLoadState().state) return void this.getEngine().getResourceManager().releaseAllForEntityItem(this);
    const e = PioneerPublicApi.MaterialUtils.get();
    this.getThreeJsMaterials().push(e);
    e.defines.colorMapEmissive = true;
    e.needsUpdate = true;
    e.uniforms.colorTexture.value = t;
    const i = PioneerPublicApi.ThreeJsHelper.createMeshObject(this, e, [{
      name: "position",
      dimensions: 3
    }, {
      name: "uv",
      dimensions: 2
    }], false);
    this.getThreeJsObjects().push(i);
    PioneerPublicApi.ThreeJsHelper.useInDynEnvMap(i, true);
    const n = PioneerPublicApi.MathUtils.Pi / (this._numLatVerts - 1);
    const o = PioneerPublicApi.MathUtils.Pi / this._numLatVerts;
    const r = (2 * this._numLatVerts + 1) * this._numLatVerts;
    const float32Array = new Float32Array(3 * r);
    const l = new Float32Array(2 * r);
    const uint16Array = new Uint16Array(this._numLatVerts * (this._numLatVerts - 1) * 12);
    const h = PioneerPublicApi.Vector3.pool.get();
    const d = PioneerPublicApi.LatLonAlt.pool.get();
    for (let t = 0; t < this._numLatVerts; t++) for (let e = 0; e < 2 * this._numLatVerts + 1; e++) {
      d.lat = t * n - PioneerPublicApi.MathUtils.HalfPi;
      d.lon = e * o - PioneerPublicApi.MathUtils.Pi;
      d.alt = 0;
      h.x = 5e23 * Math.cos(d.lat) * Math.cos(d.lon);
      h.y = 5e23 * Math.cos(d.lat) * Math.sin(d.lon);
      h.z = 5e23 * Math.sin(d.lat);
      const i = t * (2 * this._numLatVerts + 1) + e;
      float32Array[3 * i + 0] = h.x;
      float32Array[3 * i + 1] = h.y;
      float32Array[3 * i + 2] = h.z;
      l[2 * i + 0] = .5 - d.lon / PioneerPublicApi.MathUtils.TwoPi;
      l[2 * i + 1] = .5 - d.lat / PioneerPublicApi.MathUtils.Pi;
      const r = t * this._numLatVerts * 2 + e;
      t < this._numLatVerts - 1 && e < 2 * this._numLatVerts && (uint16Array[6 * r + 0] = (2 * this._numLatVerts + 1) * (t + 0) + (e + 0), uint16Array[6 * r + 1] = (2 * this._numLatVerts + 1) * (t + 1) + (e + 0), uint16Array[6 * r + 2] = (2 * this._numLatVerts + 1) * (t + 1) + (e + 1), uint16Array[6 * r + 3] = (2 * this._numLatVerts + 1) * (t + 0) + (e + 0), uint16Array[6 * r + 4] = (2 * this._numLatVerts + 1) * (t + 1) + (e + 1), uint16Array[6 * r + 5] = (2 * this._numLatVerts + 1) * (t + 0) + (e + 1));
    }
    PioneerPublicApi.LatLonAlt.pool.release(d);
    PioneerPublicApi.Vector3.pool.release(h);
    const u = this.getThreeJsObjects()[0].geometry;
    PioneerPublicApi.ThreeJsHelper.setVertices(u, "position", float32Array);
    PioneerPublicApi.ThreeJsHelper.setVertices(u, "uv", l);
    PioneerPublicApi.ThreeJsHelper.setIndices(u, uint16Array);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`、`this.getEngine`、`this.getEngine().getResourceManager`、`this.getEngine().getResourceManager().releaseByUrl`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials、this.getEngine、this.getEngine().getResourceManager、this.getEngine().getResourceManager().releaseByUrl。
   */
  __unloadResources() {
    this.getEngine().getResourceManager().releaseByUrl(this, this._textureUrl, "texture");
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this, false);
  }
  _numLatVerts;
  _textureUrl;
}
export { SkyboxComponent };
