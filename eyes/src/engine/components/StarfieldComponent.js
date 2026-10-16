/** @eyes-analysis
 * 文件职责：解析星表并构造星点，按亮度/颜色和相机方向渲染背景恒星。
 * 依据：import ../pioneer/public-api.js；Star @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:421561-426233.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：星表单颗恒星的数据记录。
 * 继承：无显式父类；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Star {
  mag;
  absMag;
  color;
  position;
  /** @eyes-analysis
   * 【结构证据】写入 `absMag`、`color`、`mag`、`position`；调用 `new PioneerPublicApi.Color`、`new PioneerPublicApi.Vector3`。
   * 状态写入：absMag、color、mag、position。
   * 调用线索：new PioneerPublicApi.Color、new PioneerPublicApi.Vector3。
   */
  constructor() {
    this.mag = 0;
    this.absMag = 0;
    this.color = new PioneerPublicApi.Color();
    this.position = new PioneerPublicApi.Vector3();
  }
}
/** @eyes-analysis
 * 类职责：解析星表并构造星点，按亮度/颜色和相机方向渲染背景恒星。
 * 继承：PioneerPublicApi.BaseComponent；导出：StarfieldComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class StarfieldComponent extends PioneerPublicApi.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_particleSize`、`_url`；调用 `super`、`this.__setRadius`。
   * 状态写入：_particleSize、_url。
   * 调用线索：super、this.__setRadius。
   */
  constructor(t, e) {
    super(t, e);
    this._url = "";
    this._particleSize = 1;
    this.__setRadius(1e24);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._url`。
   */
  getUrl() {
    return this._url;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_url`；调用 `this.resetResources`。
   * 状态写入：_url。
   * 调用线索：this.resetResources。
   */
  setUrl(url) {
    this._url = url;
    this.resetResources();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._particleSize`。
   */
  getParticleSize() {
    return this._particleSize;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_particleSize`。
   * 状态写入：_particleSize。
   */
  setParticleSize(particleSize) {
    this._particleSize = particleSize;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `Math.max`、`Math.sqrt`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`PioneerPublicApi.Vector2.pool.get`、`PioneerPublicApi.Vector2.pool.release`。
   * 调用线索：Math.max、Math.sqrt、PioneerPublicApi.ThreeJsHelper.setPositionToEntity、PioneerPublicApi.ThreeJsHelper.setUniformNumber、PioneerPublicApi.Vector2.pool.get等。
   */
  __prepareForRender(t) {
    const e = PioneerPublicApi.Vector2.pool.get();
    if (t instanceof PioneerPublicApi.SpoutComponent) e.set(t.getRenderWidth(), .5 * t.getRenderWidth());else {
      const i = t.getViewport();
      if (!i) return;
      e.copy(i.getBounds().size);
    }
    const i = Math.sqrt(Math.max(e.x, e.y) * window.devicePixelRatio) / 60;
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "particleSize", this._particleSize * i);
    PioneerPublicApi.Vector2.pool.release(e);
    PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `PioneerPublicApi.ThreeJsHelper.setIndices`、`PioneerPublicApi.ThreeJsHelper.setVertices`、`PioneerPublicApi.ThreeJsHelper.setupObject`、`bufferGeometry.setAttribute`、`bufferGeometry.setIndex`、`new Float32Array`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setIndices、PioneerPublicApi.ThreeJsHelper.setVertices、PioneerPublicApi.ThreeJsHelper.setupObject、bufferGeometry.setAttribute、bufferGeometry.setIndex等。
   */
  async __loadResources() {
    const t = await this._loadStars();
    if (this.isDestroyed()) return;
    const shaderMaterial = new PioneerPublicApi.THREE.ShaderMaterial({
      vertexShader: StarfieldComponent.vertexShader,
      fragmentShader: StarfieldComponent.fragmentShader,
      transparent: true,
      blending: PioneerPublicApi.THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        particleSize: new PioneerPublicApi.THREE.Uniform(1),
        ...PioneerPublicApi.ShaderChunkLogDepth.ThreeUniforms
      }
    });
    this.getThreeJsMaterials().push(shaderMaterial);
    const bufferGeometry = new PioneerPublicApi.THREE.BufferGeometry();
    bufferGeometry.setAttribute("position", new PioneerPublicApi.THREE.BufferAttribute(new Float32Array(0), 3));
    bufferGeometry.setAttribute("color", new PioneerPublicApi.THREE.BufferAttribute(new Float32Array(0), 4));
    bufferGeometry.setIndex(new PioneerPublicApi.THREE.BufferAttribute(new Uint16Array(0), 1));
    const points = new PioneerPublicApi.THREE.Points(bufferGeometry, shaderMaterial);
    PioneerPublicApi.ThreeJsHelper.setupObject(this, points);
    points.renderOrder = -2;
    this.getThreeJsObjects().push(points);
    const float32Array = new Float32Array(3 * t.length);
    const r = new Float32Array(4 * t.length);
    const uint16Array = new Uint16Array(t.length);
    for (let e = 0; e < t.length; e++) {
      const i = t[e];
      float32Array[3 * e + 0] = i.position.x;
      float32Array[3 * e + 1] = i.position.y;
      float32Array[3 * e + 2] = i.position.z;
      r[4 * e + 0] = i.color.r;
      r[4 * e + 1] = i.color.g;
      r[4 * e + 2] = i.color.b;
      r[4 * e + 3] = i.absMag;
      uint16Array[e] = e;
    }
    PioneerPublicApi.ThreeJsHelper.setVertices(bufferGeometry, "position", float32Array);
    PioneerPublicApi.ThreeJsHelper.setVertices(bufferGeometry, "color", r);
    PioneerPublicApi.ThreeJsHelper.setIndices(bufferGeometry, uint16Array);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials。
   */
  __unloadResources() {
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `n`；调用 `n.push`、`new PioneerPublicApi.Reader`、`new Star`、`reader.readByte`、`reader.readFloat32`、`reader.readInt32`。
   * 调用线索：n.push、new PioneerPublicApi.Reader、new Star、reader.readByte、reader.readFloat32等。
   */
  async _loadStars() {
    const t = await this.getEntity().getScene().getEngine().getDownloader().download(this._url, "binary", -this.getEntity().getLeastCameraDepth());
    const reader = new PioneerPublicApi.Reader(t.content);
    const i = reader.readInt32();
    const n = [];
    for (let t = 0; t < i; t++) {
      const star = new Star();
      star.mag = reader.readFloat32();
      star.absMag = reader.readFloat32();
      star.color.r = reader.readByte() / 255;
      star.color.g = reader.readByte() / 255;
      star.color.b = reader.readByte() / 255;
      star.color.div(star.color, star.color.max());
      star.position.y = -reader.readFloat32();
      star.position.z = reader.readFloat32();
      star.position.x = reader.readFloat32();
      star.position.rotate(StarfieldComponent.eclipJ2000ToJ2000Rotation, star.position);
      n.push(star);
    }
    return n;
  }
  _url;
  _particleSize;
  static eclipJ2000ToJ2000Rotation = new PioneerPublicApi.Quaternion(.9791532214288992, .2031230389823101, 0, 0);
  static vertexShader = `\n\t\t#define PI 3.1415926538\n\n\t\tin vec4 color;\n\t\tout vec4 fColor;\n\n\t\tuniform float particleSize;\n\n\t\t${PioneerPublicApi.ShaderChunkLogDepth.VertexHead}\n\n\t\t// Returns the watts per km^2.\n\t\tfloat absoluteMagnitudeToFlux(float absoluteMagnitude, float distance) {\n\t\t\tfloat luminosityInWatts = 3.0128e28 * pow(10.0, absoluteMagnitude / -2.5);\n\t\t\treturn luminosityInWatts / (4.0 * PI * distance * distance);\n\t\t}\n\n\t\tvoid main() {\n\t\t\tvec4 viewPosition = modelViewMatrix * vec4(position, 1.0);\n\t\t\tgl_Position = projectionMatrix * viewPosition;\n\t\t\tgl_Position.w = viewPosition.y;\n\t\t\tfColor = color;\n\n\t\t\t// Get the flux and brightness of the star at the camera's point.\n\t\t\tfloat absMag = color.a;\n\t\t\tfloat distance = length(viewPosition);\n\t\t\tfloat flux = absoluteMagnitudeToFlux(absMag, distance);\n\t\t\tfloat brightness = 2.0 * log(1.0 + flux * 1e4);\n\n\t\t\t// Adjust the color and size so that it is visually pleasing.\n\t\t\tfColor.a = clamp(brightness * particleSize, 0.05, 1.0);\n\t\t\tgl_PointSize = clamp(brightness * 4.0 * particleSize, 5.0, 50.0);\n\n\t\t\t// If it is too close, fade the star.\n\t\t\tfColor.a = mix(0.0, fColor.a, clamp((distance - 1.0e12) / 9.0e12, 0.0, 1.0));\n\n\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.Vertex}\n\t\t}`;
  static fragmentShader = `\n\t\tprecision highp float;\n\n\t\tin vec4 fColor;\n\n\t\t${PioneerPublicApi.ShaderChunkLogDepth.FragmentHead}\n\n\t\tvoid main(void) {\n\t\t\tfloat distanceFromEdge = clamp(1.0 - 2.0 * length(gl_PointCoord - vec2(0.5, 0.5)), 0.0, 1.0);\n\t\t\tfloat a = pow(distanceFromEdge, 5.0);\n\t\t\tpc_fragColor.rgb = fColor.rgb;\n\t\t\tpc_fragColor.a = fColor.a * a;\n\n\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.Fragment}\n\t\t}`;
}
export { StarfieldComponent };
