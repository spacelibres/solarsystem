// Recovered from app.js:363623-365892.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class OrbitalParticlesComponent extends PioneerPublicApi.BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._scaleOfParticles = 1;
    this._loadFunction = null;
    this._orbitalElementsList = [];
    this._offsetArray = new Float32Array(0);
    this._spriteParticles = null;
    this.__setRadius(100 * this.getEntity().getExtentsRadius());
  }
  getScaleOfParticles() {
    return this._scaleOfParticles;
  }
  setScaleOfParticles(scaleOfParticles) {
    this._scaleOfParticles = scaleOfParticles;
    this.resetResources();
  }
  setLoadFunction(loadFunction) {
    this._loadFunction = loadFunction;
    this.resetResources();
  }
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
  __prepareForRender(t) {
    this._spriteParticles && this._spriteParticles.prepareForRender(t);
  }
  async __loadResources() {
    this._spriteParticles = new PioneerPublicApi.SpriteParticles(this);
    this.getThreeJsMaterials().push(this._spriteParticles.getThreeJsMaterial());
    this.getThreeJsObjects().push(this._spriteParticles.getThreeJsObject());
    await this._initializeParticles();
  }
  __unloadResources() {
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
    this._spriteParticles = null;
  }
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
