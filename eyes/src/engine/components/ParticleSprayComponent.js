// 喷流每个实例保存横截面二维随机参数、寿命相位、颜色与尺寸；方向叉乘 X 轴为零时改用 Y 轴，保证垂直基可归一化。时间按长度/速度循环，GPU 负责展开粒子位置。
// Recovered from app.js:365893-374448.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class ParticleSprayComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._length = 1;
    this._spread = 30;
    this._numberOfParticles = 0;
    this._speedOfParticles = .1;
    this._sizeOfParticles = .1;
    this._particleSpacingRandom = true;
    this._colorOfParticles = new PioneerPublicApi.Color();
    this._originOffset = new PioneerPublicApi.Vector3();
    this._direction = new PioneerPublicApi.Vector3();
    this._relativeToEntityOrientation = true;
    this.__setRadius(this._length);
  }
  getLength() {
    return this._length;
  }
  setLength(length) {
    this._length = length;
    this.__setRadius(this._length);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "length", this._length);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "totalTime", this._length / this._speedOfParticles);
  }
  getSpread() {
    return this._spread;
  }
  setSpread(spread) {
    this._spread = spread;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "spread", PioneerPublicApi.MathUtils.degToRad(this._spread));
  }
  getNumberOfParticles() {
    return this._numberOfParticles;
  }
  setNumberOfParticles(numberOfParticles) {
    this._numberOfParticles = numberOfParticles;
    this.resetResources();
  }
  getSpeedOfParticles() {
    return this._speedOfParticles;
  }
  setSpeedOfParticles(speedOfParticles) {
    this._speedOfParticles = speedOfParticles;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "totalTime", this._length / this._speedOfParticles);
  }
  getSizeOfParticles() {
    return this._sizeOfParticles;
  }
  setSizeOfParticles(sizeOfParticles) {
    this._sizeOfParticles = sizeOfParticles;
    this.resetResources();
  }
  getParticleSpacingRandom() {
    return this._particleSpacingRandom;
  }
  setParticleSpacingRandom(particleSpacingRandom) {
    this._particleSpacingRandom = particleSpacingRandom;
    this.resetResources();
  }
  getColorOfParticles() {
    return this._colorOfParticles;
  }
  setColorOfParticles(color) {
    this._colorOfParticles.copy(color);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "globalColor", this._colorOfParticles);
  }
  getOriginOffset() {
    return this._originOffset;
  }
  setOriginOffset(offset) {
    this._originOffset.copy(offset);
    PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "originOffset", this._originOffset);
  }
  getDirection() {
    return this._direction;
  }
  setDirection(direction) {
    this._direction.normalize(direction);
    PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "direction", this._direction);
    const perpendicular = PioneerPublicApi.Vector3.pool.get();
    perpendicular.cross(this._direction, PioneerPublicApi.Vector3.XAxis);
    if (perpendicular.isZero()) {
      perpendicular.cross(this._direction, PioneerPublicApi.Vector3.YAxis);
    }
    perpendicular.normalize(perpendicular);
    PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "directionPerp", perpendicular);
    PioneerPublicApi.Vector3.pool.release(perpendicular);
  }
  getRelativeToEntityOrientation() {
    return this._relativeToEntityOrientation;
  }
  setRelativeToEntityOrientation(relativeToEntityOrientation) {
    this._relativeToEntityOrientation = relativeToEntityOrientation;
  }
  __prepareForRender(camera) {
    const time = PioneerPublicApi.MathUtils.wrap(this.getEntity().getScene().getEngine().getTime(), 0, this._length / this._speedOfParticles);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "time", time);
    if (this._relativeToEntityOrientation) {
      const origin = PioneerPublicApi.Vector3.pool.get();
      const direction = PioneerPublicApi.Vector3.pool.get();
      origin.rotate(this.getEntity().getOrientation(), this._originOffset);
      direction.rotate(this.getEntity().getOrientation(), this._direction);
      PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "originOffset", origin);
      PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "direction", direction);
      const perpendicular = PioneerPublicApi.Vector3.pool.get();
      perpendicular.cross(direction, PioneerPublicApi.Vector3.XAxis);
      if (perpendicular.isZero()) {
        perpendicular.cross(direction, PioneerPublicApi.Vector3.YAxis);
      }
      perpendicular.normalize(perpendicular);
      PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "directionPerp", perpendicular);
      PioneerPublicApi.Vector3.pool.release(perpendicular);
      PioneerPublicApi.Vector3.pool.release(origin);
      PioneerPublicApi.Vector3.pool.release(direction);
    }
    PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), camera);
  }
  async __loadResources() {
    const rawShaderMaterial = new PioneerPublicApi.THREE.RawShaderMaterial({
      uniforms: {
        spread: new PioneerPublicApi.THREE.Uniform(0),
        originOffset: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector3()),
        direction: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector3()),
        directionPerp: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector3()),
        length: new PioneerPublicApi.THREE.Uniform(0),
        time: new PioneerPublicApi.THREE.Uniform(0),
        totalTime: new PioneerPublicApi.THREE.Uniform(0),
        globalColor: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector4(1, 1, 1, 1)),
        ...PioneerPublicApi.ShaderChunkLogDepth.ThreeUniforms
      },
      vertexShader: ParticleSprayComponent.vertexShader,
      fragmentShader: ParticleSprayComponent.fragmentShader,
      glslVersion: PioneerPublicApi.THREE.GLSL3,
      transparent: true,
      depthWrite: false,
      blending: PioneerPublicApi.THREE.AdditiveBlending,
      side: PioneerPublicApi.THREE.DoubleSide
    });
    this.getThreeJsMaterials().push(rawShaderMaterial);
    const quadPositions = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]);
    const parameters = new Float32Array(3 * this._numberOfParticles);
    const colors = new Float32Array(4 * this._numberOfParticles);
    const sizes = new Float32Array(1 * this._numberOfParticles);
    const quadIndices = new Uint16Array([0, 1, 2, 2, 3, 0]);
    const instancedBufferGeometry = new PioneerPublicApi.THREE.InstancedBufferGeometry();
    instancedBufferGeometry.setAttribute("position", new PioneerPublicApi.THREE.BufferAttribute(quadPositions, 3));
    instancedBufferGeometry.setAttribute("params", new PioneerPublicApi.THREE.InstancedBufferAttribute(parameters, 3));
    instancedBufferGeometry.setAttribute("color", new PioneerPublicApi.THREE.InstancedBufferAttribute(colors, 4));
    instancedBufferGeometry.setAttribute("size", new PioneerPublicApi.THREE.InstancedBufferAttribute(sizes, 1));
    instancedBufferGeometry.setIndex(new PioneerPublicApi.THREE.BufferAttribute(quadIndices, 1));
    instancedBufferGeometry.instanceCount = this._numberOfParticles;
    const mesh = PioneerPublicApi.ThreeJsHelper.createMeshObjectGivenGeometry(this, rawShaderMaterial, instancedBufferGeometry);
    this.getThreeJsObjects().push(mesh);
    PioneerPublicApi.ThreeJsHelper.setOrientation(this.getThreeJsObjects()[0], PioneerPublicApi.Quaternion.Identity);
    this._initializeParticles();
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "length", this._length);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "spread", PioneerPublicApi.MathUtils.degToRad(this._spread));
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "totalTime", this._length / this._speedOfParticles);
    PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "originOffset", this._originOffset);
    PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "direction", this._direction);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "globalColor", this._colorOfParticles);
    const perpendicular = PioneerPublicApi.Vector3.pool.get();
    perpendicular.cross(this._direction, PioneerPublicApi.Vector3.XAxis);
    if (perpendicular.isZero()) {
      perpendicular.cross(this._direction, PioneerPublicApi.Vector3.YAxis);
    }
    perpendicular.normalize(perpendicular);
    PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "directionPerp", perpendicular);
    PioneerPublicApi.Vector3.pool.release(perpendicular);
  }
  __unloadResources() {
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
  }
  // params.xy 是横截面坐标，params.z 是初始寿命相位；颜色始终写 RGBA 四分量。
  _initializeParticles() {
    const parameterAttribute = this.getThreeJsObjects()[0].geometry.attributes.params;
    const colorAttribute = this.getThreeJsObjects()[0].geometry.attributes.color;
    const sizeAttribute = this.getThreeJsObjects()[0].geometry.attributes.size;
    const parameters = parameterAttribute.array;
    const colors = colorAttribute.array;
    const sizes = sizeAttribute.array;
    for (let particleIndex = 0, numberOfParticles = this._numberOfParticles; particleIndex < numberOfParticles; particleIndex++) {
      parameters[3 * particleIndex + 0] = 2 * Math.random() - 1;
      parameters[3 * particleIndex + 1] = 2 * Math.random() - 1;
      if (this._particleSpacingRandom) {
        parameters[3 * particleIndex + 2] = Math.random();
      } else {
        parameters[3 * particleIndex + 2] = particleIndex / this._numberOfParticles;
      }
      colors[4 * particleIndex + 0] = 1;
      colors[4 * particleIndex + 1] = 1;
      colors[4 * particleIndex + 2] = 1;
      colors[4 * particleIndex + 3] = 1;
      sizes[1 * particleIndex + 0] = this._sizeOfParticles;
    }
    parameterAttribute.needsUpdate = true;
    colorAttribute.needsUpdate = true;
    sizeAttribute.needsUpdate = true;
  }
  _length;
  _spread;
  _numberOfParticles;
  _speedOfParticles;
  _sizeOfParticles;
  _particleSpacingRandom;
  _colorOfParticles;
  _originOffset;
  _direction;
  _relativeToEntityOrientation;
  static vertexShader = `\n\t\tin vec3 position;\n\t\tin vec3 params; // x, y are in plane made by direction if z were 1, z is 0 to 1 where the particle is in the total length at time = 0\n\t\tin vec4 color;\n\t\tin float size;\n\n\t\tuniform float spread;\n\t\tuniform vec3 originOffset; // in model-space\n\t\tuniform vec3 direction; // in model-space\n\t\tuniform vec3 directionPerp; // in model-space\n\t\tuniform float length;\n\t\tuniform float time;\n\t\tuniform float totalTime;\n\n\t\tuniform mat4 modelViewMatrix;\n\t\tuniform mat4 projectionMatrix;\n\n\t\tout vec2 vPosition;\n\t\tout vec4 vColor;\n\n\t\t${PioneerPublicApi.ShaderChunkLogDepth.VertexHead}\n\n\t\tvoid main() {\n\t\t\tfloat u = mod(params.z + time / totalTime, 1.0);\n\t\t\tfloat sinSpread = sin(spread);\n\t\t\tfloat uSpread = sinSpread > 0.0 ? u : (1.0 - u);\n\t\t\tfloat sizeAtU = size * max(0.1, uSpread);\n\t\t\tvec3 directionPerp2 = cross(direction, directionPerp);\n\t\t\tvec3 modelPosition = originOffset + (directionPerp * params.x * sinSpread * uSpread + directionPerp2 * params.y * sinSpread * uSpread + direction * u) * length;\n\t\t\tvec4 viewPosition = vec4(position.x * sizeAtU, 0, position.y * sizeAtU, 1) + modelViewMatrix * vec4(modelPosition, 1.0);\n\t\t\tgl_Position = projectionMatrix * viewPosition;\n\t\t\tgl_Position.w = viewPosition.y;\n\n\t\t\t// Set the varying variables.\n\t\t\tvPosition = position.xy;\n\t\t\tvColor = color * (1.0 - u);\n\n\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.Vertex}\n\t\t}`;
  static fragmentShader = `\n\t\tprecision highp float;\n\n\t\tuniform vec4 globalColor;\n\n\t\tin vec2 vPosition;\n\t\tin vec4 vColor;\n\n\t\t// The output color.\n\t\tout vec4 outColor;\n\n\t\t${PioneerPublicApi.ShaderChunkLogDepth.FragmentHead}\n\n\t\tvoid main(void) {\n\t\t\t// Set the color to be a circle tinted by the color and globalColor.\n\t\t\toutColor = globalColor * vColor * max(0.0, 1.0 - dot(vPosition, vPosition));\n\n\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.Fragment}\n\t\t}`;
}
export { ParticleSprayComponent };
