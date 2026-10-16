// 轨道粒子逐帧按引擎时间投影 OrbitalElements；偏移为三分量数组，颜色为四分量数组，半长轴乘以 1+偏心率决定包围半径。
// Recovered from app.js:363623-365892.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class OrbitalParticlesComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
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
    const position = PioneerPublicApi.Vector3.pool.get();
    const velocity = PioneerPublicApi.Vector3.pool.get();
    const time = this.getEntity().getScene().getEngine().getTime();
    for (let particleIndex = 0, particleCount = this._orbitalElementsList.length; particleIndex < particleCount; particleIndex++) {
      this._orbitalElementsList[particleIndex].project(position, velocity, time);
      this._offsetArray[3 * particleIndex + 0] = position.x;
      this._offsetArray[3 * particleIndex + 1] = position.y;
      this._offsetArray[3 * particleIndex + 2] = position.z;
    }
    PioneerPublicApi.Vector3.pool.release(position);
    PioneerPublicApi.Vector3.pool.release(velocity);
    this._spriteParticles.setParticleOffsets(this._offsetArray);
  }
  __prepareForRender(camera) {
    if (this._spriteParticles) {
      this._spriteParticles.prepareForRender(camera);
    }
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
    const particleData = await this._loadFunction();
    const particleCount = particleData.orbitalElements.length;
    this._orbitalElementsList = [];
    let maxApoapsis = 0;
    for (let particleIndex = 0, orbitalElementCount = particleCount; particleIndex < orbitalElementCount; particleIndex++) {
      const orbitalElements = new PioneerPublicApi.OrbitalElements();
      orbitalElements.copy(particleData.orbitalElements[particleIndex]);
      this._orbitalElementsList.push(orbitalElements);
      const apoapsis = orbitalElements.semiMajorAxis * (1 + orbitalElements.eccentricity);
      maxApoapsis = Math.max(maxApoapsis, apoapsis);
    }
    this.__setRadius(maxApoapsis);
    this._offsetArray = new Float32Array(3 * particleCount);
    const colors = new Float32Array(4 * particleCount);
    const scales = new Float32Array(1 * particleCount);
    for (let particleIndex = 0, colorCount = particleCount; particleIndex < colorCount; particleIndex++) {
      const color = particleData.colors[particleIndex];
      colors[4 * particleIndex + 0] = color.r;
      colors[4 * particleIndex + 1] = color.g;
      colors[4 * particleIndex + 2] = color.b;
      colors[4 * particleIndex + 3] = color.a;
      scales[1 * particleIndex + 0] = particleData.scales[particleIndex] * this._scaleOfParticles;
    }
    this._spriteParticles.setParticleColors(colors);
    this._spriteParticles.setParticleScales(scales);
  }
  _scaleOfParticles;
  _loadFunction;
  _orbitalElementsList;
  _offsetArray;
  _spriteParticles;
}
export { OrbitalParticlesComponent };
