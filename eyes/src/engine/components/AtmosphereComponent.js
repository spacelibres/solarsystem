/** @eyes-analysis
 * 文件职责：依赖同实体 SpheroidComponent 的半径，以自定义散射材质渲染大气壳；同步密度、日落色和光源。
 * 依据：import ../pioneer/public-api.js；AtmosphereComponent extends PioneerPublicApi.BaseComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:244623-260848.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：依赖同实体 SpheroidComponent 的半径，以自定义散射材质渲染大气壳；同步密度、日落色和光源。
 * 继承：PioneerPublicApi.BaseComponent；导出：AtmosphereComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class AtmosphereComponent extends PioneerPublicApi.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_color`、`_density`、`_emissivity`、`_scaleHeight`、`_spheroidChangedCallback`、`_spheroidComponentRef`、`_sunBrightness`、`_sunsetColor`；调用 `new PioneerPublicApi.Color`、`new PioneerPublicApi.ComponentRef`、`super`、`this.__setUsesEntityOrientation`、`this._spheroidChangedCallback.bind`、`this._spheroidComponentRef.setRefChangedCallback`。
   * 状态写入：_color、_density、_emissivity、_scaleHeight、_spheroidChangedCallback、_spheroidComponentRef、_sunBrightness、_sunsetColor等；完整记录见索引。
   * 调用线索：new PioneerPublicApi.Color、new PioneerPublicApi.ComponentRef、super、this.__setUsesEntityOrientation、this._spheroidChangedCallback.bind等。
   */
  constructor(t, e) {
    super(t, e);
    this._density = 0;
    this._scaleHeight = 1;
    this._emissivity = 0;
    this._color = new PioneerPublicApi.Color();
    this._sunBrightness = 1;
    this._sunsetColor = new PioneerPublicApi.Color();
    this._sunsetIntensity = 0;
    this._spheroidComponentRef = new PioneerPublicApi.ComponentRef(this.getEntity().getScene(), PioneerPublicApi.SpheroidComponent, this.getEntity().getName());
    this._spheroidComponentRef.setRefChangedCallback(this._spheroidRefChangedCallback.bind(this));
    this._spheroidChangedCallback = this._spheroidChangedCallback.bind(this);
    this.__setUsesEntityOrientation(true);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._spheroidComponentRef.get()`；调用 `this._spheroidComponentRef.get`。
   * 调用线索：this._spheroidComponentRef.get。
   */
  getSpheroid() {
    return this._spheroidComponentRef.get();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._density`。
   */
  getDensity() {
    return this._density;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_density`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。
   * 状态写入：_density。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformNumber、this.getThreeJsMaterials。
   */
  setDensity(density) {
    this._density = density;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "density", density);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._scaleHeight`。
   */
  getScaleHeight() {
    return this._scaleHeight;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_scaleHeight`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。
   * 状态写入：_scaleHeight。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformNumber、this.getThreeJsMaterials。
   */
  setScaleHeight(scaleHeight) {
    this._scaleHeight = scaleHeight;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "scaleHeight", scaleHeight);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._emissivity`。
   */
  getEmissivity() {
    return this._emissivity;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_emissivity`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。
   * 状态写入：_emissivity。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformNumber、this.getThreeJsMaterials。
   */
  setEmissivity(emissivity) {
    this._emissivity = emissivity;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "emissivity", emissivity);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._color`。
   */
  getColor() {
    return this._color;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformColorRGB`、`this._color.copy`、`this.getThreeJsMaterials`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformColorRGB、this._color.copy、this.getThreeJsMaterials。
   */
  setColor(t) {
    this._color.copy(t);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGB(this.getThreeJsMaterials()[0], "color", t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._sunBrightness`。
   */
  getSunBrightness() {
    return this._sunBrightness;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_sunBrightness`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。
   * 状态写入：_sunBrightness。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformNumber、this.getThreeJsMaterials。
   */
  setSunBrightness(sunBrightness) {
    this._sunBrightness = sunBrightness;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "sunBrightness", sunBrightness);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._sunsetColor`。
   */
  getSunsetColor() {
    return this._sunsetColor;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformColorRGB`、`this._sunsetColor.copy`、`this.getThreeJsMaterials`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformColorRGB、this._sunsetColor.copy、this.getThreeJsMaterials。
   */
  setSunsetColor(t) {
    this._sunsetColor.copy(t);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGB(this.getThreeJsMaterials()[0], "sunsetColor", t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._sunsetIntensity`。
   */
  getSunsetIntensity() {
    return this._sunsetIntensity;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_sunsetIntensity`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。
   * 状态写入：_sunsetIntensity。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformNumber、this.getThreeJsMaterials。
   */
  setSunsetIntensity(sunsetIntensity) {
    this._sunsetIntensity = sunsetIntensity;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "sunsetIntensity", sunsetIntensity);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._spheroidComponentRef.set`、`this.getEntity`、`this.getEntity().getName`。
   * 调用线索：this._spheroidComponentRef.set、this.getEntity、this.getEntity().getName。
   */
  setSpheroidReference(t) {
    this._spheroidComponentRef.set(this.getEntity().getName(), t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `super.__destroy`、`t.removeChangedCallback`、`this._spheroidComponentRef.get`。
   * 调用线索：super.__destroy、t.removeChangedCallback、this._spheroidComponentRef.get。
   */
  __destroy() {
    const t = this._spheroidComponentRef.get();
    null !== t && t.removeChangedCallback(this._spheroidChangedCallback);
    super.__destroy();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._spheroidComponentRef.update`。
   * 调用线索：this._spheroidComponentRef.update。
   */
  __update() {
    this._spheroidComponentRef.update();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.MaterialUtils.setLightSourceUniforms`、`PioneerPublicApi.ThreeJsHelper.setOrientationToEntity`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`PioneerPublicApi.ThreeJsHelper.setUniformQuaternion`、`PioneerPublicApi.ThreeJsHelper.setUniformVector3`、`PioneerPublicApi.Vector3.pool.get`。
   * 调用线索：PioneerPublicApi.MaterialUtils.setLightSourceUniforms、PioneerPublicApi.ThreeJsHelper.setOrientationToEntity、PioneerPublicApi.ThreeJsHelper.setPositionToEntity、PioneerPublicApi.ThreeJsHelper.setUniformQuaternion、PioneerPublicApi.ThreeJsHelper.setUniformVector3等。
   */
  __prepareForRender(t) {
    const e = PioneerPublicApi.Vector3.pool.get();
    e.neg(this.getEntity().getCameraSpacePosition(t));
    e.rotateInverse(this.getEntity().getOrientation(), e);
    PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "cameraPosition", e);
    PioneerPublicApi.Vector3.pool.release(e);
    PioneerPublicApi.MaterialUtils.setLightSourceUniforms(this.getThreeJsMaterials(), this.getEntity(), t);
    PioneerPublicApi.ThreeJsHelper.setUniformQuaternion(this.getThreeJsMaterials()[0], "entityOrientation", this.getEntity().getOrientation());
    PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity());
    PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.cos`、`Math.sin`、`PioneerPublicApi.LatLonAlt.pool.get`、`PioneerPublicApi.LatLonAlt.pool.release`、`PioneerPublicApi.ThreeJsHelper.createMeshObject`、`PioneerPublicApi.ThreeJsHelper.setIndices`。
   * 调用线索：Math.cos、Math.sin、PioneerPublicApi.LatLonAlt.pool.get、PioneerPublicApi.LatLonAlt.pool.release、PioneerPublicApi.ThreeJsHelper.createMeshObject等。
   */
  async __loadResources() {
    const rawShaderMaterial = new PioneerPublicApi.THREE.RawShaderMaterial({
      uniforms: {
        lightPositions: new PioneerPublicApi.THREE.Uniform([new PioneerPublicApi.THREE.Vector3(1, 0, 0), new PioneerPublicApi.THREE.Vector3(1, 0, 0), new PioneerPublicApi.THREE.Vector3(1, 0, 0), new PioneerPublicApi.THREE.Vector3(1, 0, 0), new PioneerPublicApi.THREE.Vector3(1, 0, 0)]),
        lightColors: new PioneerPublicApi.THREE.Uniform([new PioneerPublicApi.THREE.Vector3(0, 0, 0), new PioneerPublicApi.THREE.Vector3(0, 0, 0), new PioneerPublicApi.THREE.Vector3(0, 0, 0), new PioneerPublicApi.THREE.Vector3(0, 0, 0), new PioneerPublicApi.THREE.Vector3(0, 0, 0)]),
        lightRadii: new PioneerPublicApi.THREE.Uniform([0, 0, 0, 0, 0]),
        numLights: new PioneerPublicApi.THREE.Uniform(0),
        density: new PioneerPublicApi.THREE.Uniform(this._density),
        scaleHeight: new PioneerPublicApi.THREE.Uniform(this._scaleHeight),
        emissivity: new PioneerPublicApi.THREE.Uniform(this._emissivity),
        equatorialRadius: new PioneerPublicApi.THREE.Uniform(1),
        polarRadius: new PioneerPublicApi.THREE.Uniform(1),
        cameraPosition: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector3(1, 0, 0)),
        entityOrientation: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector4(1, 0, 0, 0)),
        color: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector3(this._color.r, this._color.g, this._color.b)),
        sunBrightness: new PioneerPublicApi.THREE.Uniform(this._sunBrightness),
        sunsetColor: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector3(this._sunsetColor.r, this._sunsetColor.g, this._sunsetColor.b)),
        sunsetIntensity: new PioneerPublicApi.THREE.Uniform(this._sunsetIntensity),
        ...PioneerPublicApi.ShaderChunkLogDepth.ThreeUniforms
      },
      vertexShader: AtmosphereComponent._vertexShader,
      fragmentShader: AtmosphereComponent._fragmentShader,
      glslVersion: PioneerPublicApi.THREE.GLSL3,
      transparent: true,
      depthWrite: false,
      blending: PioneerPublicApi.THREE.NormalBlending
    });
    this.getThreeJsMaterials().push(rawShaderMaterial);
    const e = PioneerPublicApi.ThreeJsHelper.createMeshObject(this, rawShaderMaterial, [{
      name: "position",
      dimensions: 3
    }], false);
    this.getThreeJsObjects().push(e);
    const i = 128;
    const n = PioneerPublicApi.MathUtils.Pi / 63;
    const o = PioneerPublicApi.MathUtils.TwoPi / i;
    const float32Array = new Float32Array(24768);
    const uint16Array = new Uint16Array(48384);
    const l = PioneerPublicApi.Vector3.pool.get();
    const c = PioneerPublicApi.LatLonAlt.pool.get();
    for (let t = 0; t < 64; t++) {
      c.lat = t * n - PioneerPublicApi.MathUtils.HalfPi;
      c.alt = 0;
      const e = Math.cos(c.lat);
      const l = Math.sin(c.lat);
      for (let n = 0; n < 129; n++) {
        c.lon = n * o - PioneerPublicApi.MathUtils.Pi;
        const h = 129 * t + n;
        float32Array[3 * h + 0] = e * Math.cos(c.lon);
        float32Array[3 * h + 1] = e * Math.sin(c.lon);
        float32Array[3 * h + 2] = l;
        const d = t * i + n;
        t < 63 && n < i && (uint16Array[6 * d + 0] = 129 * (t + 0) + (n + 0), uint16Array[6 * d + 1] = 129 * (t + 1) + (n + 0), uint16Array[6 * d + 2] = 129 * (t + 1) + (n + 1), uint16Array[6 * d + 3] = 129 * (t + 0) + (n + 0), uint16Array[6 * d + 4] = 129 * (t + 1) + (n + 1), uint16Array[6 * d + 5] = 129 * (t + 0) + (n + 1));
      }
    }
    PioneerPublicApi.LatLonAlt.pool.release(c);
    PioneerPublicApi.Vector3.pool.release(l);
    PioneerPublicApi.ThreeJsHelper.setVertices(e.geometry, "position", float32Array);
    PioneerPublicApi.ThreeJsHelper.setIndices(e.geometry, uint16Array);
    PioneerPublicApi.ThreeJsHelper.setRenderOrder(e, -1);
    PioneerPublicApi.ThreeJsHelper.useInDynEnvMap(e, true);
    this._spheroidChangedCallback();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials。
   */
  __unloadResources() {
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.addChangedCallback`、`t.removeChangedCallback`、`this._spheroidChangedCallback`。
   * 调用线索：e.addChangedCallback、t.removeChangedCallback、this._spheroidChangedCallback。
   */
  _spheroidRefChangedCallback(t, e) {
    null !== t && t.removeChangedCallback(this._spheroidChangedCallback);
    null !== e && e.addChangedCallback(this._spheroidChangedCallback);
    this._spheroidChangedCallback();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.max`、`PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`t.getEquatorialRadius`、`t.getPolarRadius`、`this.__setRadius`、`this._spheroidComponentRef.get`。
   * 调用线索：Math.max、PioneerPublicApi.ThreeJsHelper.setUniformNumber、t.getEquatorialRadius、t.getPolarRadius、this.__setRadius等。
   */
  _spheroidChangedCallback() {
    const t = this._spheroidComponentRef.get();
    const e = this.getThreeJsMaterials()[0];
    null !== t ? (this.__setRadius(Math.max(t.getEquatorialRadius(), t.getPolarRadius())), e && (PioneerPublicApi.ThreeJsHelper.setUniformNumber(e, "equatorialRadius", t.getEquatorialRadius()), PioneerPublicApi.ThreeJsHelper.setUniformNumber(e, "polarRadius", t.getPolarRadius()))) : (this.__setRadius(0), e && (PioneerPublicApi.ThreeJsHelper.setUniformNumber(e, "equatorialRadius", 0), PioneerPublicApi.ThreeJsHelper.setUniformNumber(e, "polarRadius", 0)));
  }
  _density;
  _scaleHeight;
  _emissivity;
  _color;
  _sunBrightness;
  _sunsetColor;
  _sunsetIntensity;
  _spheroidComponentRef;
  static _vertexShader = `\n\t\tin vec3 position;\n\t\tuniform mat4 projectionMatrix;\n\t\tuniform mat4 modelViewMatrix;\n\n\t\tuniform float scaleHeight;\n\t\tuniform float equatorialRadius;\n\t\tuniform float polarRadius;\n\n\t\t${PioneerPublicApi.ShaderChunkLogDepth.VertexHead}\n\n\t\tout vec3 localPosition;\n\n\t\tvoid main() {\n\t\t\tfloat scaleHeightMultiplier = 20.0;\n\t\t\tlocalPosition = vec3(position.x * (equatorialRadius + scaleHeight * scaleHeightMultiplier), position.y * (equatorialRadius + scaleHeight * scaleHeightMultiplier), position.z * (polarRadius + scaleHeight * scaleHeightMultiplier));\n\t\t\tvec4 viewPosition = modelViewMatrix * vec4(localPosition, 1.);\n\t\t\tgl_Position = projectionMatrix * viewPosition;\n\t\t\tgl_Position.w = viewPosition.y;\n\n\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.Vertex}\n\t\t}`;
  static _fragmentShader = `\n\t\tprecision highp float;\n\n\t\tuniform vec3 lightPositions[5];\n\t\tuniform vec3 lightColors[5];\n\t\tuniform int numLights;\n\n\t\tuniform float density;\n\t\tuniform float scaleHeight;\n\t\tuniform float equatorialRadius;\n\t\tuniform float polarRadius;\n\t\tuniform vec3 cameraPosition;\n\t\tuniform vec4 entityOrientation;\n\t\tuniform vec3 color;\n\t\tuniform float emissivity;\n\t\tuniform float sunBrightness;\n\t\tuniform vec3 sunsetColor;\n\t\tuniform float sunsetIntensity;\n\n\t\t${PioneerPublicApi.ShaderChunkLogDepth.FragmentHead}\n\n\t\tin vec3 localPosition;\n\n\t\t// The output color.\n\t\tout vec4 outColor;\n\n\t\tconst int numIterations = 5;\n\n\t\t// Inverse rotate a vector by a quaternion.\n\t\tvec3 quatRotInv(vec4 q, vec3 v) {\n\t\t\tfloat tx = q.w * v.x - q.y * v.z + q.z * v.y;\n\t\t\tfloat ty = q.w * v.y - q.z * v.x + q.x * v.z;\n\t\t\tfloat tz = q.w * v.z - q.x * v.y + q.y * v.x;\n\t\t\tfloat tw = q.x * v.x + q.y * v.y + q.z * v.z;\n\t\t\tfloat x = tx * q.w + tw * q.x + ty * q.z - tz * q.y;\n\t\t\tfloat y = ty * q.w + tw * q.y + tz * q.x - tx * q.z;\n\t\t\tfloat z = tz * q.w + tw * q.z + tx * q.y - ty * q.x;\n\t\t\treturn vec3(x, y, z);\n\t\t}\n\n\t\t// Given an origin and direction, computes the sampling start and end as distance from the origin in the direction.\n\t\tvoid getStartEndSamples(out float start, out float end, vec3 origin, vec3 direction, float maxDistance, float groundRadius, float atmosphereScaleHeight) {\n\t\t\t// Get the along the ray perpendicular to the sphere.\n\t\t\tfloat perpD = -dot(origin, direction);\n\t\t\tvec3 perp = origin + direction * perpD;\n\n\t\t\t// Figure out the sample distance.\n\t\t\tfloat atmosphereRadius = groundRadius + atmosphereScaleHeight * 6.0;\n\t\t\tfloat chordHalfLength = sqrt(max(0.0, atmosphereRadius * atmosphereRadius - dot(perp, perp)));\n\n\t\t\t// Figure out starting and ending sample points, and step distance.\n\t\t\tstart = max(0.0, perpD - chordHalfLength);\n\t\t\tend = min(maxDistance, perpD + chordHalfLength);\n\t\t}\n\n\t\t// Gets the density of the atmosphere at a given position.\n\t\tfloat getDensity(vec3 position, float radius, float density, float atmosphereScaleHeight) {\n\t\t\treturn density * exp(min(radius - length(position), 0.0) / atmosphereScaleHeight);\n\t\t}\n\n\t\t// Returns 0 if the ray does not intersect and 1.0 if the ray very intersects (with a gradient inbetween).\n\t\tfloat getDayLevel(vec3 origin, vec3 direction, float radius, float scaleHeight) {\n\t\t\tfloat blendHeight = scaleHeight * radius / 200.0;\n\t\t\tfloat perpD = -dot(origin, direction);\n\t\t\tfloat depth = radius - sqrt(dot(origin, origin) - sign(perpD) * perpD * perpD);\n\t\t\tif (depth < 0.0) { // day\n\t\t\t\treturn 1.0 - max(0.0, 0.25 * depth / blendHeight + 0.25);\n\t\t\t}\n\t\t\telse { // night\n\t\t\t\treturn 1.0 - min(1.0, 0.75 * depth / blendHeight + 0.25);\n\t\t\t}\n\t\t}\n\n\t\tfloat easeInOut(float x, float sharpness) {\n\t\t\tfloat b = sharpness;\n\t\t\tif (x < 0.5) {\n\t\t\t\treturn max(0.0, (pow(b, 2.0 * x) - 1.0) / (2.0 * (b - 1.0)));\n\t\t\t}\n\t\t\telse {\n\t\t\t\treturn min(1.0, 1.0 - (pow(b, 2.0 * (1.0 - x)) - 1.0) / (2.0 * (b - 1.0)));\n\t\t\t}\n\t\t}\n\n\t\tvec3 adjustOverbrightness(vec3 color) {\n\t\t\tfloat maxColor = max(color.r, max(color.g, color.b));\n\t\t\tif (maxColor > 1.0) {\n\t\t\t\tfloat f = (maxColor - 1.0) / maxColor;\n\t\t\t\tcolor.r = min(1.0, pow(color.r / maxColor, 1.0 / maxColor));\n\t\t\t\tcolor.g = min(1.0, pow(color.g / maxColor, 1.0 / maxColor));\n\t\t\t\tcolor.b = min(1.0, pow(color.b / maxColor, 1.0 / maxColor));\n\t\t\t}\n\t\t\treturn color;\n\t\t}\n\n\t\t// Calculates a glow around the light direction (the star).\n\t\tfloat glow(float spread, float amount, float lightDotCamera) {\n\t\t\treturn amount * spread / (1.0 + spread - lightDotCamera);\n\t\t}\n\n\t\tvec4 getEmissiveColor(float totalDensity, vec3 cameraPositionS, vec3 color, float emissivity) {\n\n\t\t\t// The color that will be added onto outColor.\n\t\t\tvec4 emissiveColor;\n\n\t\t\t// Apply the total density to the transparency of the atmosphere.\n\t\t\temissiveColor.a = emissivity * clamp(totalDensity, 0.0, 1.0);\n\n\t\t\t// Multiply it all together with the source light color.\n\t\t\temissiveColor.rgb = emissivity * color * clamp(pow(15.0 * totalDensity / (density * equatorialRadius), 0.2), 0.75, 1.0);\n\n\t\t\t// Make it more opaque when lower down.\n\t\t\temissiveColor.a = mix(emissiveColor.a, emissivity, getDensity(cameraPositionS, equatorialRadius + scaleHeight, 1.0, 2.0 * scaleHeight));\n\n\t\t\t// Clamp it to make it clean for the day/night transition.\n\t\t\temissiveColor.a = clamp(emissiveColor.a, 0.0, 1.0);\n\n\t\t\treturn emissiveColor;\n\t\t}\n\n\t\t// Gets the color for an atmosphere for a light.\n\t\tvec4 getColor(float totalDensity, vec3 lightColor, vec3 lightPosition, float spheroidRatio, vec3 positionS, vec3 cameraPositionS, vec3 cameraToPositionUnit) {\n\n\t\t\t// The color starts out in full brightness (as if emissivity was 1.0).\n\t\t\tvec4 atmosphereColor = getEmissiveColor(totalDensity, cameraPositionS, lightColor * color, 1.0);\n\n\t\t\t// Make the alpha dependent on the brightness of the light.\n\t\t\tatmosphereColor.a *= length(lightColor) / sqrt(3.0);\n\n\t\t\t// Setup vectors.\n\t\t\thighp vec3 lightPositionS = quatRotInv(entityOrientation, lightPosition);\n\t\t\tlightPositionS.z *= spheroidRatio;\n\t\t\thighp vec3 lightToPosition = positionS - lightPositionS;\n\t\t\thighp vec3 lightToPositionUnit = normalize(lightToPosition / 1.0e8);\n\n\t\t\t// Get the day level, from 0 to 1, and apply it to the alpha. Lots of tricks to get it looking good on earth.\n\t\t\tvec3 dayRefUp = normalize(cameraPositionS - min(0.0, dot(cameraPositionS, cameraToPositionUnit)) * cameraToPositionUnit);\n\t\t\tfloat dayLevel = -dot(lightToPositionUnit, dayRefUp);\n\t\t\tatmosphereColor.rgb *= easeInOut(0.5 + 2.0 * dayLevel, 2.0);\n\t\t\tatmosphereColor.a *= easeInOut(1.0 + 2.0 * dayLevel, 2.0);\n\n\t\t\t// Brighten up the atmosphere when looking from space toward the sun.\n\t\t\tfloat lightDotCamera = max(0.0, -dot(lightToPositionUnit, cameraToPositionUnit));\n\t\t\tatmosphereColor.a = clamp(atmosphereColor.a * (1.0 + glow(0.004, 1.0, lightDotCamera)), 0.0, 1.0);\n\n\t\t\t// Add narrower sun glare.\n\t\t\tatmosphereColor.rgb *= lightColor * (1.0 + sunBrightness * atmosphereColor.a * glow(0.00004, 1.0, lightDotCamera));\n\n\t\t\t// Add broader sun glare.\n\t\t\tatmosphereColor.rgb *= lightColor * (1.0 + sunBrightness * atmosphereColor.a * glow(0.04, 0.125, lightDotCamera));\n\n\t\t\t// Apply the sunset.\n\t\t\tfloat lightDotHorizon = pow(clamp(1.0 - dot(lightToPositionUnit, dayRefUp), 0.0, 1.0), 2.0);\n\t\t\tfloat cameraDotHorizon = pow(clamp(1.0 - dot(cameraToPositionUnit, dayRefUp), 0.0, 1.0), 8.0);\n\t\t\tfloat sunsetAmount = sunsetIntensity * lightDotHorizon * cameraDotHorizon * glow(0.04, 0.5, lightDotCamera);\n\t\t\tatmosphereColor.rgb = mix(atmosphereColor.rgb, sunsetColor, clamp(sunsetAmount, 0.0, 1.0));\n\n\t\t\treturn atmosphereColor;\n\t\t}\n\n\t\tvoid main(void) {\n\t\t\t// Convert everything into a sphere frame.\n\t\t\tfloat spheroidRatio = equatorialRadius / polarRadius;\n\t\t\thighp vec3 positionS = localPosition;\n\t\t\thighp vec3 cameraPositionS = cameraPosition;\n\t\t\tpositionS.z *= spheroidRatio;\n\t\t\tcameraPositionS.z *= spheroidRatio;\n\n\t\t\thighp vec3 cameraToPosition = positionS - cameraPositionS;\n\t\t\tfloat cameraToPositionDist = length(cameraToPosition / 1.0e8) * 1.0e8;\n\t\t\thighp vec3 cameraToPositionUnit = cameraToPosition / cameraToPositionDist;\n\n\t\t\t// Get the start and end of the sampling from the camera to the position.\n\t\t\tfloat start;\n\t\t\tfloat end;\n\t\t\tgetStartEndSamples(start, end, cameraPositionS, cameraToPositionUnit, 1.0e24, equatorialRadius, scaleHeight);\n\t\t\tfloat fracPerStep = 1.0 / float(numIterations - 1);\n\t\t\tfloat stepDist = fracPerStep * (end - start);\n\n\t\t\t// Do the sampling.\n\t\t\tfloat totalDensity = 0.0;\n\t\t\tfloat segmentStart = start;\n\t\t\tfor (int j = 0; j < numIterations; j++) {\n\t\t\t\t// Get the distance that this segment covers.\n\t\t\t\tfloat segDist = stepDist;\n\t\t\t\tif (j == 0 || j == numIterations - 1) {\n\t\t\t\t\tsegDist *= 0.5;\n\t\t\t\t}\n\n\t\t\t\t// Get the segment start that we're looking at.\n\t\t\t\tvec3 p = cameraPositionS + segmentStart * cameraToPositionUnit;\n\n\t\t\t\t// Get the density at that segment start. It'll be the density for the whole segment.\n\t\t\t\tfloat densityAtP = getDensity(p, equatorialRadius, density, scaleHeight);\n\n\t\t\t\t// Add it to the total density.\n\t\t\t\ttotalDensity += densityAtP * segDist;\n\n\t\t\t\t// Next step.\n\t\t\t\tsegmentStart += stepDist;\n\t\t\t}\n\n\t\t\t// Add emissivity lightness.\n\t\t\toutColor += getEmissiveColor(totalDensity, cameraPositionS, color, emissivity);\n\n\t\t\t// For each light,\n\t\t\tfor (int i = 0; i < 5; i++) {\n\t\t\t\tif (i >= numLights) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\n\t\t\t\t// If it's not a camera light,\n\t\t\t\tif (length(lightPositions[i]) > 0.0) {\n\t\t\t\t\t// Add on the color for the light.\n\t\t\t\t\toutColor += getColor(totalDensity, lightColors[i], lightPositions[i], spheroidRatio, positionS, cameraPositionS, cameraToPositionUnit);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Adjust for values that are greater than one.\n\t\t\toutColor.rgb = adjustOverbrightness(outColor.rgb);\n\n\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.Fragment}\n\t\t}`;
}
export { AtmosphereComponent };
