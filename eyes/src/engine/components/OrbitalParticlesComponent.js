/** @eyes-analysis
 * 文件职责：通过轨道元素生成并更新一组轨道粒子。
 * 依据：import ../pioneer/public-api.js；OrbitalParticlesComponent extends PioneerPublicApi.BaseComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:363623-365892.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：通过轨道元素生成并更新一组轨道粒子。
 * 继承：PioneerPublicApi.BaseComponent；导出：OrbitalParticlesComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class OrbitalParticlesComponent extends PioneerPublicApi.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_loadFunction`、`_offsetArray`、`_orbitalElementsList`、`_scaleOfParticles`、`_spriteParticles`；调用 `new Float32Array`、`super`、`this.__setRadius`、`this.getEntity`、`this.getEntity().getExtentsRadius`。
   * 状态写入：_loadFunction、_offsetArray、_orbitalElementsList、_scaleOfParticles、_spriteParticles。
   * 调用线索：new Float32Array、super、this.__setRadius、this.getEntity、this.getEntity().getExtentsRadius。
   */
  constructor(t, e) {
    super(t, e);
    this._scaleOfParticles = 1;
    this._loadFunction = null;
    this._orbitalElementsList = [];
    this._offsetArray = new Float32Array(0);
    this._spriteParticles = null;
    this.__setRadius(100 * this.getEntity().getExtentsRadius());
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._scaleOfParticles`。
   */
  getScaleOfParticles() {
    return this._scaleOfParticles;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_scaleOfParticles`；调用 `this.resetResources`。
   * 状态写入：_scaleOfParticles。
   * 调用线索：this.resetResources。
   */
  setScaleOfParticles(scaleOfParticles) {
    this._scaleOfParticles = scaleOfParticles;
    this.resetResources();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_loadFunction`；调用 `this.resetResources`。
   * 状态写入：_loadFunction。
   * 调用线索：this.resetResources。
   */
  setLoadFunction(loadFunction) {
    this._loadFunction = loadFunction;
    this.resetResources();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_offsetArray[3*s+0]`、`_offsetArray[3*s+1]`、`_offsetArray[3*s+2]`；返回 `void`；调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`this._orbitalElementsList[s].project`、`this._spriteParticles.setParticleOffsets`、`this.getEntity`、`this.getEntity().getScene`。
   * 状态写入：_offsetArray[3*s+0]、_offsetArray[3*s+1]、_offsetArray[3*s+2]。
   * 调用线索：PioneerPublicApi.Vector3.pool.get、PioneerPublicApi.Vector3.pool.release、this._orbitalElementsList[s].project、this._spriteParticles.setParticleOffsets、this.getEntity等。
   */
  __update() {
    if (!this._spriteParticles) return;
    const t = PioneerPublicApi.Vector3.pool.get();
    const e = PioneerPublicApi.Vector3.pool.get();
    const i = this.getEntity().getScene().getEngine().getTime();
    for (let s = 0, n = this._orbitalElementsList.length; s < n; s++) {
      this._orbitalElementsList[s].project(t, e, i);
      this._offsetArray[3 * s + 0] = t.x;
      this._offsetArray[3 * s + 1] = t.y;
      this._offsetArray[3 * s + 2] = t.z;
    }
    PioneerPublicApi.Vector3.pool.release(t);
    PioneerPublicApi.Vector3.pool.release(e);
    this._spriteParticles.setParticleOffsets(this._offsetArray);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._spriteParticles.prepareForRender`。
   * 调用线索：this._spriteParticles.prepareForRender。
   */
  __prepareForRender(t) {
    this._spriteParticles && this._spriteParticles.prepareForRender(t);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_spriteParticles`；调用 `new PioneerPublicApi.SpriteParticles`、`this._initializeParticles`、`this._spriteParticles.getThreeJsMaterial`、`this._spriteParticles.getThreeJsObject`、`this.getThreeJsMaterials`、`this.getThreeJsMaterials().push`。
   * 状态写入：_spriteParticles。
   * 调用线索：new PioneerPublicApi.SpriteParticles、this._initializeParticles、this._spriteParticles.getThreeJsMaterial、this._spriteParticles.getThreeJsObject、this.getThreeJsMaterials等。
   */
  async __loadResources() {
    this._spriteParticles = new PioneerPublicApi.SpriteParticles(this);
    this.getThreeJsMaterials().push(this._spriteParticles.getThreeJsMaterial());
    this.getThreeJsObjects().push(this._spriteParticles.getThreeJsObject());
    await this._initializeParticles();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_spriteParticles`；调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`。
   * 状态写入：_spriteParticles。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials。
   */
  __unloadResources() {
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._spriteParticles = null;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_offsetArray`、`_orbitalElementsList`；返回 `void`；调用 `Math.max`、`new Float32Array`、`new PioneerPublicApi.OrbitalElements`、`orbitalElements.copy`、`this.__setRadius`、`this._loadFunction`。
   * 状态写入：_offsetArray、_orbitalElementsList。
   * 调用线索：Math.max、new Float32Array、new PioneerPublicApi.OrbitalElements、orbitalElements.copy、this.__setRadius等。
   */
  async _initializeParticles() {
    if (!this._loadFunction || !this._spriteParticles) return;
    const t = await this._loadFunction();
    const e = t.orbitalElements.length;
    this._orbitalElementsList = [];
    let i = 0;
    for (let n = 0, o = e; n < o; n++) {
      const orbitalElements = new PioneerPublicApi.OrbitalElements();
      orbitalElements.copy(t.orbitalElements[n]);
      this._orbitalElementsList.push(orbitalElements);
      const o = orbitalElements.semiMajorAxis * (1 + orbitalElements.eccentricity);
      i = Math.max(i, o);
    }
    this.__setRadius(i);
    this._offsetArray = new Float32Array(3 * e);
    const float32Array = new Float32Array(4 * e);
    const o = new Float32Array(1 * e);
    for (let i = 0, s = e; i < s; i++) {
      const e = t.colors[i];
      float32Array[4 * i + 0] = e.r;
      float32Array[4 * i + 1] = e.g;
      float32Array[4 * i + 2] = e.b;
      float32Array[4 * i + 3] = e.a;
      o[1 * i + 0] = t.scales[i] * this._scaleOfParticles;
    }
    this._spriteParticles.setParticleColors(float32Array);
    this._spriteParticles.setParticleScales(o);
  }
  _scaleOfParticles;
  _loadFunction;
  _orbitalElementsList;
  _offsetArray;
  _spriteParticles;
}
export { OrbitalParticlesComponent };
