// Recovered from app.js:303108-312075.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class CometTailComponent extends PioneerPublicApi.BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._lightSource = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._timeLength = 6e5;
    this._numberOfParticles = 200;
    this._color = new PioneerPublicApi.Color();
    this._starAccelerationMultiplier = 1;
    this._timeOfParticle0 = 0;
  }
  getLightSource() {
    return this._lightSource.getName();
  }
  setLightSource(t) {
    this._lightSource.setName(t);
  }
  getTimeLength() {
    return this._timeLength;
  }
  setTimeLength(timeLength) {
    this._timeLength = timeLength;
    this.resetResources();
  }
  getStarAccelerationMultiplier() {
    return this._starAccelerationMultiplier;
  }
  setStarAccelerationMultiplier(starAccelerationMultiplier) {
    this._starAccelerationMultiplier = starAccelerationMultiplier;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "starAccelerationMultiplier", this._starAccelerationMultiplier);
  }
  getNumberOfParticles() {
    return this._numberOfParticles;
  }
  setNumberOfParticles(numberOfParticles) {
    this._numberOfParticles = numberOfParticles;
    this.resetResources();
  }
  getColor() {
    return this._color;
  }
  setColor(t) {
    this._color.copy(t);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "color", this._color);
  }
  __update() {
    if (this.__setRadius(Math.max(this.getEntity().getExtentsRadius(), this._timeLength * this.getEntity().getVelocity().magnitude())), "loaded" !== this.getLoadState().state) return;
    const t = this.getEntity().getScene().getEngine().getTime();
    const e = this.getThreeJsObjects()[0].geometry.attributes.originTime.array;
    for (let i = 0, numberOfParticles = this._numberOfParticles; i < numberOfParticles; i++) {
      const n = e[i] + this._timeOfParticle0;
      (n < t - this._timeLength || n > t) && this._newParticle(i, PioneerPublicApi.MathUtils.wrap(n, t - this._timeLength, t));
    }
    this._numberOfParticles > 1 ? PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "time", t - this._timeOfParticle0) : PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "time", 0);
    const i = this._lightSource.get();
    if (null !== i) {
      const t = i.getComponent(PioneerPublicApi.LightSourceComponent);
      null !== t && PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "starAbsoluteMagnitude", t.getAbsoluteMagnitude());
      const e = PioneerPublicApi.Vector3.pool.get();
      this.getEntity().getPositionRelativeToEntity(e, PioneerPublicApi.Vector3.Zero, i);
      PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "positionOfEntity", e);
      PioneerPublicApi.Vector3.pool.release(e);
    }
  }
  __prepareForRender(t) {
    PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects(), this.getEntity(), t);
    const e = this.getEntity().getCameraSpacePosition(t);
    if (PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "positionInCamera", e), e.magnitude() < 4e4) this.__setVisible(false);else {
      const t = (e.magnitude() - 4e4) / 4e5;
      this.getThreeJsMaterials()[0].uniforms.color.value.w = this._color.a * PioneerPublicApi.MathUtils.clamp01(t);
      this.__setVisible(true);
    }
  }
  async __loadResources() {
    const rawShaderMaterial = new PioneerPublicApi.THREE.RawShaderMaterial({
      uniforms: {
        time: new PioneerPublicApi.THREE.Uniform(0),
        timeLength: new PioneerPublicApi.THREE.Uniform(0),
        positionInCamera: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector3()),
        starAbsoluteMagnitude: new PioneerPublicApi.THREE.Uniform(0),
        starAccelerationMultiplier: new PioneerPublicApi.THREE.Uniform(0),
        positionOfEntity: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector3()),
        color: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector4()),
        ...PioneerPublicApi.ShaderChunkLogDepth.ThreeUniforms
      },
      vertexShader: CometTailComponent._vertexShader,
      fragmentShader: CometTailComponent._fragmentShader,
      glslVersion: PioneerPublicApi.THREE.GLSL3,
      transparent: true,
      depthWrite: false,
      blending: PioneerPublicApi.THREE.AdditiveBlending,
      side: PioneerPublicApi.THREE.DoubleSide
    });
    this.getThreeJsMaterials().push(rawShaderMaterial);
    const float32Array = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]);
    const uint16Array = new Uint16Array([0, 1, 2, 2, 3, 0]);
    const n = new Float32Array(1 * this._numberOfParticles);
    const o = new Float32Array(3 * this._numberOfParticles);
    const r = new Float32Array(1 * this._numberOfParticles);
    const instancedBufferGeometry = new PioneerPublicApi.THREE.InstancedBufferGeometry();
    instancedBufferGeometry.setAttribute("position", new PioneerPublicApi.THREE.BufferAttribute(float32Array, 3));
    instancedBufferGeometry.setAttribute("originTime", new PioneerPublicApi.THREE.InstancedBufferAttribute(n, 1));
    instancedBufferGeometry.setAttribute("originPosition", new PioneerPublicApi.THREE.InstancedBufferAttribute(o, 3));
    instancedBufferGeometry.setAttribute("accelerationMultiplier", new PioneerPublicApi.THREE.InstancedBufferAttribute(r, 1));
    instancedBufferGeometry.setIndex(new PioneerPublicApi.THREE.BufferAttribute(uint16Array, 1));
    instancedBufferGeometry.instanceCount = this._numberOfParticles;
    const l = PioneerPublicApi.ThreeJsHelper.createMeshObjectGivenGeometry(this, rawShaderMaterial, instancedBufferGeometry);
    this.getThreeJsObjects().push(l);
    const c = this.getEntity().getScene().getEngine().getTime();
    for (let t = 0, numberOfParticles = this._numberOfParticles; t < numberOfParticles; t++) this._newParticle(t, c - t / numberOfParticles * this._timeLength);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "timeLength", this._timeLength);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "starAccelerationMultiplier", this._starAccelerationMultiplier);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "color", this._color);
  }
  __unloadResources() {
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
  }
  _newParticle(t, timeOfParticle0) {
    const i = this.getThreeJsObjects()[0].geometry.attributes.originTime;
    const n = i.array;
    if (t > 0) n[t] = timeOfParticle0 - this._timeOfParticle0;else {
      for (let t = 1, numberOfParticles = this._numberOfParticles; t < numberOfParticles; t++) n[t] += this._timeOfParticle0 - timeOfParticle0;
      this._timeOfParticle0 = timeOfParticle0;
      n[0] = 0;
    }
    i.needsUpdate = true;
    const o = PioneerPublicApi.Vector3.pool.get();
    const r = this._lightSource.get();
    null !== r && this.getEntity().getPositionRelativeToEntity(o, PioneerPublicApi.Vector3.Zero, r, timeOfParticle0);
    const a = this.getThreeJsObjects()[0].geometry.attributes.originPosition;
    const l = a.array;
    l[3 * t + 0] = o.x;
    l[3 * t + 1] = o.y;
    l[3 * t + 2] = o.z;
    a.needsUpdate = true;
    PioneerPublicApi.Vector3.pool.release(o);
    const c = this.getThreeJsObjects()[0].geometry.attributes.accelerationMultiplier;
    c.array[t] = 0 + 1 * Math.random();
    c.needsUpdate = true;
  }
  _lightSource;
  _timeLength;
  _numberOfParticles;
  _color;
  _starAccelerationMultiplier;
  _timeOfParticle0;
  static _vertexShader = `\n\t\tin vec3 position;\n\t\tin float originTime;\n\t\tin vec3 originPosition;\n\t\tin vec3 originStarPosition;\n\t\tin vec3 originExternalAcceleration;\n\t\tin float accelerationMultiplier;\n\n\t\tuniform float time;\n\t\tuniform float timeLength;\n\t\tuniform vec3 positionInCamera;\n\t\tuniform float starAbsoluteMagnitude;\n\t\tuniform float starAccelerationMultiplier;\n\t\tuniform vec3 positionOfEntity;\n\t\tuniform mat4 viewMatrix;\n\t\tuniform mat4 modelViewMatrix;\n\t\tuniform mat4 projectionMatrix;\n\n\t\tout vec2 vPosition;\n\t\tout float vAlpha;\n\n\t\t${PioneerPublicApi.ShaderChunkLogDepth.VertexHead}\n\n\t\tvoid main() {\n\t\t\t// Get the position of the center point of the quad in model space.\n\t\t\tfloat deltaTime = time - originTime;\n\t\t\tvec3 externalAcceleration = starAccelerationMultiplier * accelerationMultiplier * normalize(originPosition) * 5.0e7 * pow(2.51188643151, 20.0 - starAbsoluteMagnitude) / dot(originPosition, originPosition);\n\t\t\tvec3 modelPosition = externalAcceleration * pow(deltaTime, 1.5);\n\n\t\t\t// Get a general expansion scale in all directions.\n\t\t\tfloat expansion = 0.2 * max(1.0e5, length(modelPosition));\n\n\t\t\t// Get the stretch direction in view space.\n\t\t\tvec3 modelStretch = modelPosition;\n\t\t\tvec3 cameraDirection = normalize(positionInCamera);\n\t\t\tmodelStretch = modelStretch - dot(cameraDirection, modelStretch) * cameraDirection;\n\t\t\tvec4 viewStretch = viewMatrix * vec4(modelStretch, 1.0);\n\n\t\t\t// Get the stretch amounts in the x and y directions.\n\t\t\tvec2 stretch2d = vec2(max(expansion, 2.0 * length(viewStretch.xz)), expansion);\n\n\t\t\t// Do the stretch calculation on the vertex position in view space.\n\t\t\t// It translates it, rotates it, stretches it, and unrotates it.\n\t\t\tvec2 translate = 0.5 * normalize(vec2(viewStretch.xz));\n\t\t\tfloat angle = length(viewStretch.xz) > 0.0 ? atan(viewStretch.z, viewStretch.x) : 0.0;\n\t\t\tfloat cosAngle = cos(angle);\n\t\t\tfloat sinAngle = sin(angle);\n\t\t\tfloat stretchedX = (stretch2d.x * cosAngle * cosAngle + stretch2d.y * sinAngle * sinAngle) * 0.5 * (position.x + translate.x) + (stretch2d.x - stretch2d.y) * sinAngle * cosAngle * 0.5 * (position.y + translate.y);\n\t\t\tfloat stretchedY = (stretch2d.x - stretch2d.y) * sinAngle * cosAngle * 0.5 * (position.x + translate.x) + (stretch2d.x * sinAngle * sinAngle + stretch2d.y * cosAngle * cosAngle) * 0.5 * (position.y + translate.y);\n\n\t\t\t// Get the position in view space and then in normalized space.\n\t\t\tvec4 viewPosition = vec4(stretchedX, 0.0, stretchedY, 0.0) + modelViewMatrix * vec4(modelPosition, 1.0);\n\t\t\tgl_Position = projectionMatrix * viewPosition;\n\t\t\tgl_Position.w = viewPosition.y;\n\n\t\t\t// Set the varying variables for adjusting te\n\t\t\tvPosition = vec2(cosAngle * position.x + sinAngle * position.y, -sinAngle * position.x + cosAngle * position.y);\n\t\t\tvAlpha = sqrt(1.0 - sqrt(deltaTime / timeLength));\n\n\t\t\t// Make the gas fade far from the star.\n\t\t\tvAlpha *= min(1.0, 1.0 - length(originPosition) / 7.0e8);\n\n\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.Vertex}\n\t\t}`;
  static _fragmentShader = `\n\t\tprecision highp float;\n\n\t\tuniform vec4 color;\n\n\t\tin vec2 vPosition;\n\t\tin float vAlpha;\n\n\t\t// The output color.\n\t\tout vec4 outColor;\n\n\t\t${PioneerPublicApi.ShaderChunkLogDepth.FragmentHead}\n\n\t\tvoid main(void) {\n\t\t\t// Set the color to be a circle tinted by the color.\n\t\t\toutColor = vec4(color.rgb, 0.5 * color.a) * max(0.0, 1.0 - dot(vPosition, vPosition)) * vAlpha;\n\n\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.Fragment}\n\t\t}`;
}
export { CometTailComponent };
