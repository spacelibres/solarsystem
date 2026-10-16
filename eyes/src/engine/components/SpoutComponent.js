/** @eyes-analysis
 * 文件职责：将相机输出绘制到特定宽度的画布/投影输出，提供面向球幕的渲染路径。
 * 依据：import ../pioneer/public-api.js；SpoutComponent extends PioneerPublicApi.CameraComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:407522-415156.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：将相机输出绘制到特定宽度的画布/投影输出，提供面向球幕的渲染路径。
 * 继承：PioneerPublicApi.CameraComponent；导出：SpoutComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class SpoutComponent extends PioneerPublicApi.CameraComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_globeDistance`、`_renderWidth`、`_spoutTexture`、`_tagEnd`、`_tagSend`、`_tagStart`、`_threeJsCubeCamera`、`_threeJsFaceCameras`；调用 `PioneerPublicApi.Tuple.create6Tuple`、`matrix4.set`、`new PioneerPublicApi.THREE.Matrix4`、`new PioneerPublicApi.THREE.Mesh`、`new PioneerPublicApi.THREE.OrthographicCamera`、`new PioneerPublicApi.THREE.PerspectiveCamera`。
   * 状态写入：_globeDistance、_renderWidth、_spoutTexture、_tagEnd、_tagSend、_tagStart、_threeJsCubeCamera、_threeJsFaceCameras等；完整记录见索引。
   * 调用线索：PioneerPublicApi.Tuple.create6Tuple、matrix4.set、new PioneerPublicApi.THREE.Matrix4、new PioneerPublicApi.THREE.Mesh、new PioneerPublicApi.THREE.OrthographicCamera等。
   */
  constructor(t, e) {
    super(t, e);
    this._renderWidth = 2048;
    this._globeDistance = 1;
    this._threeJsQuad = new PioneerPublicApi.THREE.Mesh();
    this._threeJsSpoutScene = new PioneerPublicApi.THREE.Scene();
    this._threeJsCubeCamera = new PioneerPublicApi.THREE.OrthographicCamera(-1, 1, -1, 1, -1, 1);
    this._tagStart = new PioneerPublicApi.THREE.WebGLRenderTarget(2, 3, {
      minFilter: PioneerPublicApi.THREE.LinearFilter,
      magFilter: PioneerPublicApi.THREE.NearestFilter
    });
    this._tagEnd = new PioneerPublicApi.THREE.WebGLRenderTarget(3, 2, {
      minFilter: PioneerPublicApi.THREE.LinearFilter,
      magFilter: PioneerPublicApi.THREE.NearestFilter
    });
    this._tagSend = new PioneerPublicApi.THREE.WebGLRenderTarget(3, 3, {
      minFilter: PioneerPublicApi.THREE.LinearFilter,
      magFilter: PioneerPublicApi.THREE.NearestFilter
    });
    this._spoutTexture = new PioneerPublicApi.THREE.WebGLRenderTarget(this._renderWidth, this._renderWidth / 2, {
      minFilter: PioneerPublicApi.THREE.LinearFilter,
      magFilter: PioneerPublicApi.THREE.NearestFilter
    });
    this._threeJsFaceCameras = PioneerPublicApi.Tuple.create6Tuple(() => {
      const perspectiveCamera = new PioneerPublicApi.THREE.PerspectiveCamera(90, 1, .1, 1e3);
      const matrix4 = new PioneerPublicApi.THREE.Matrix4();
      matrix4.set(1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0);
      perspectiveCamera.projectionMatrix = matrix4;
      perspectiveCamera.projectionMatrixInverse.copy(matrix4).invert();
      return perspectiveCamera;
    });
    this._threeJsFaceRenderTargets = PioneerPublicApi.Tuple.create6Tuple(() => new PioneerPublicApi.THREE.WebGLRenderTarget(this._renderWidth / 4, this._renderWidth / 4, {
      minFilter: PioneerPublicApi.THREE.LinearFilter,
      magFilter: PioneerPublicApi.THREE.LinearFilter
    }));
    this._setupQuad();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._renderWidth`。
   */
  getRenderWidth() {
    return this._renderWidth;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_renderWidth`；调用 `this._spoutTexture.setSize`、`this._threeJsFaceRenderTargets[t].setSize`。
   * 状态写入：_renderWidth。
   * 调用线索：this._spoutTexture.setSize、this._threeJsFaceRenderTargets[t].setSize。
   */
  setRenderWidth(renderWidth) {
    this._renderWidth = renderWidth;
    this._spoutTexture.width !== this._renderWidth && this._spoutTexture.setSize(this._renderWidth, this._renderWidth / 2);
    for (let t = 0; t < 6; t++) this._threeJsFaceRenderTargets[t].setSize(this._renderWidth / 4, this._renderWidth / 4);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `1===this.getInvertDepth()`；调用 `this.getInvertDepth`。
   * 调用线索：this.getInvertDepth。
   */
  getForGlobe() {
    return 1 === this.getInvertDepth();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_globeDistance`；调用 `this.setInvertDepth`。
   * 状态写入：_globeDistance。
   * 调用线索：this.setInvertDepth。
   */
  setForGlobe(t, globeDistance) {
    this.setInvertDepth(t ? 1 : 0);
    this._globeDistance = globeDistance;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.max`、`PioneerPublicApi.Quaternion.threeJsPool.get`、`PioneerPublicApi.Quaternion.threeJsPool.release`、`i.set`、`n.clearColor`、`n.render`。
   * 调用线索：Math.max、PioneerPublicApi.Quaternion.threeJsPool.get、PioneerPublicApi.Quaternion.threeJsPool.release、i.set、n.clearColor等。
   */
  __render() {
    if (this.getForGlobe()) {
      const t = this.getEntity().getParent();
      t && this.setNearDistance(Math.max(.1, .5 * t.getOcclusionRadius()));
      this.setMidDistance(this.getAutoNearDistance());
    }
    this._updateProjectionMatrices();
    const t = .7071067811865476;
    const e = this.getEntity().getOrientation();
    const i = PioneerPublicApi.Quaternion.threeJsPool.get();
    i.set(e.x, e.y, e.z, e.w);
    this._threeJsFaceCameras[0].setRotationFromQuaternion(i);
    i.set(t * (e.x - e.y), t * (e.x + e.y), t * (-e.w + e.z), t * (e.w + e.z));
    this._threeJsFaceCameras[1].setRotationFromQuaternion(i);
    i.set(e.y, -e.x, e.w, -e.z);
    this._threeJsFaceCameras[2].setRotationFromQuaternion(i);
    i.set(t * (e.x + e.y), t * (-e.x + e.y), t * (e.w + e.z), t * (e.w - e.z));
    this._threeJsFaceCameras[3].setRotationFromQuaternion(i);
    i.set(t * (e.w + e.x), t * (e.y + e.z), t * (-e.y + e.z), t * (e.w - e.x));
    this._threeJsFaceCameras[4].setRotationFromQuaternion(i);
    i.set(t * (-e.w + e.x), t * (e.y - e.z), t * (e.y + e.z), t * (e.w + e.x));
    this._threeJsFaceCameras[5].setRotationFromQuaternion(i);
    PioneerPublicApi.Quaternion.threeJsPool.release(i);
    const n = this.getEntity().getScene().getEngine().__getThreeJsRenderer();
    this.getForGlobe() && n.state.setCullFace(PioneerPublicApi.THREE.CullFaceFront);
    for (let t = 0; t < 6; t++) {
      n.setRenderTarget(this._threeJsFaceRenderTargets[t]);
      n.render(this.getEntity().getScene().getThreeJsScene(), this._threeJsFaceCameras[t]);
    }
    this.getForGlobe() && n.state.setCullFace(PioneerPublicApi.THREE.CullFaceBack);
    n.setRenderTarget(this._tagStart);
    n.clearColor();
    n.setRenderTarget(this._spoutTexture);
    n.clearColor();
    n.setRenderTarget(this._tagEnd);
    n.clearColor();
    n.setRenderTarget(this._spoutTexture);
    n.render(this._threeJsSpoutScene, this._threeJsCubeCamera);
    n.setRenderTarget(this._tagSend);
    n.clearColor();
    n.setRenderTarget(null);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this.getAutoNearDistance`、`this.getInvertDepth`。
   * 调用线索：this.getAutoNearDistance、this.getInvertDepth。
   */
  _updateProjectionMatrices() {
    const t = this.getAutoNearDistance();
    let e = Number.EPSILON - 1;
    let i = t * (2 - Number.EPSILON);
    if (1 === this.getInvertDepth()) {
      const globeDistance = this._globeDistance;
      e = (t + globeDistance) * (1 - Number.EPSILON) / (t - globeDistance);
      i = -2 * t * globeDistance * (1 - Number.EPSILON) / (t - globeDistance);
    }
    for (let t = 0; t < 6; t++) {
      const s = this._threeJsFaceCameras[t];
      s.projectionMatrix.elements[6] = e;
      s.projectionMatrix.elements[14] = i;
    }
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_threeJsQuad`、`_threeJsQuad.frustumCulled`；调用 `bufferGeometry.setAttribute`、`bufferGeometry.setIndex`、`n.textures.value.push`、`new Float32Array`、`new PioneerPublicApi.THREE.BufferAttribute`、`new PioneerPublicApi.THREE.BufferGeometry`。
   * 状态写入：_threeJsQuad、_threeJsQuad.frustumCulled。
   * 调用线索：bufferGeometry.setAttribute、bufferGeometry.setIndex、n.textures.value.push、new Float32Array、new PioneerPublicApi.THREE.BufferAttribute等。
   */
  _setupQuad() {
    const bufferGeometry = new PioneerPublicApi.THREE.BufferGeometry();
    const float32Array = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]);
    const uint16Array = new Uint16Array([0, 1, 2, 0, 2, 3]);
    bufferGeometry.setAttribute("position", new PioneerPublicApi.THREE.BufferAttribute(float32Array, 3));
    bufferGeometry.setIndex(new PioneerPublicApi.THREE.BufferAttribute(uint16Array, 1));
    const n = {
      textures: new PioneerPublicApi.THREE.Uniform([])
    };
    for (let t = 0; t < 6; t++) n.textures.value.push(this._threeJsFaceRenderTargets[t].texture);
    const rawShaderMaterial = new PioneerPublicApi.THREE.RawShaderMaterial({
      uniforms: n,
      vertexShader: "\n\t\t\t\tin vec3 position;\n\t\t\t\tout vec2 xy;\n\t\t\t\tvoid main() {\n\t\t\t\t\tgl_Position = vec4(position.x, position.y, 0.0, 1.0);\n\t\t\t\t\txy = position.xy;\n\t\t\t\t}",
      fragmentShader: "\n\t\t\t\tprecision highp float;\n\n\t\t\t\tuniform sampler2D textures[6];\n\n\t\t\t\tin vec2 xy;\n\n\t\t\t\t// The output color.\n\t\t\t\tout vec4 outColor;\n\n\t\t\t\tconst float PI = 3.1415926535897932384626433832795;\n\n\t\t\t\tvec3 xyToUvFace(vec2 xy) {\n\t\t\t\t\tvec3 xyz = vec3(\n\t\t\t\t\t\tcos(xy.y * PI / 2.0) * cos(xy.x * PI),\n\t\t\t\t\t\tcos(xy.y * PI / 2.0) * sin(xy.x * PI),\n\t\t\t\t\t\tsin(-xy.y * PI / 2.0));\n\n\t\t\t\t\tvec3 basis[3];\n\t\t\t\t\tfloat face;\n\t\t\t\t\tif (xyz.x * xyz.x >= xyz.y * xyz.y && xyz.x * xyz.x >= xyz.z * xyz.z) {\n\t\t\t\t\t\tif (xyz.x >= 0.0) {\n\t\t\t\t\t\t\tbasis[0] = vec3(0, 1, 0); basis[1] = vec3(0, 0, 1); basis[2] = vec3(1, 0, 0);\n\t\t\t\t\t\t\tface = 0.0;\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\tbasis[0] = vec3(0, -1, 0); basis[1] = vec3(0, 0, 1); basis[2] = vec3(-1, 0, 0);\n\t\t\t\t\t\t\tface = 2.0;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\telse if (xyz.y * xyz.y >= xyz.x * xyz.x && xyz.y * xyz.y >= xyz.z * xyz.z) {\n\t\t\t\t\t\tif (xyz.y >= 0.0) {\n\t\t\t\t\t\t\tbasis[0] = vec3(-1, 0, 0); basis[1] = vec3(0, 0, 1); basis[2] = vec3(0, 1, 0);\n\t\t\t\t\t\t\tface = 1.0;\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\tbasis[0] = vec3(1, 0, 0); basis[1] = vec3(0, 0, 1); basis[2] = vec3(0, -1, 0);\n\t\t\t\t\t\t\tface = 3.0;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\telse {\n\t\t\t\t\t\tif (xyz.z >= 0.0) {\n\t\t\t\t\t\t\tbasis[0] = vec3(0, 1, 0); basis[1] = vec3(-1, 0, 0); basis[2] = vec3(0, 0, 1);\n\t\t\t\t\t\t\tface = 4.0;\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\tbasis[0] = vec3(0, 1, 0); basis[1] = vec3(1, 0, 0); basis[2] = vec3(0, 0, -1);\n\t\t\t\t\t\t\tface = 5.0;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\tvec3 uv = vec3(\n\t\t\t\t\t\tbasis[0].x * xyz.x + basis[0].y * xyz.y + basis[0].z * xyz.z,\n\t\t\t\t\t\tbasis[1].x * xyz.x + basis[1].y * xyz.y + basis[1].z * xyz.z,\n\t\t\t\t\t\tbasis[2].x * xyz.x + basis[2].y * xyz.y + basis[2].z * xyz.z);\n\t\t\t\t\tuv.x /= uv.z;\n\t\t\t\t\tuv.y /= uv.z;\n\n\t\t\t\t\treturn vec3(0.5 * (uv.x + 1.0), 0.5 * (uv.y + 1.0), face);\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tvec3 uvFace = xyToUvFace(xy);\n\n\t\t\t\t\tvec4 pixel;\n\t\t\t\t\tint face = int(uvFace.z);\n\n\t\t\t\t\tif (face == 0) {\n\t\t\t\t\t\tpixel = texture(textures[0], vec2(uvFace.x, uvFace.y));\n\t\t\t\t\t}\n\t\t\t\t\telse if (face == 1) {\n\t\t\t\t\t\tpixel = texture(textures[1], vec2(uvFace.x, uvFace.y));\n\t\t\t\t\t}\n\t\t\t\t\telse if (face == 2) {\n\t\t\t\t\t\tpixel = texture(textures[2], vec2(uvFace.x, uvFace.y));\n\t\t\t\t\t}\n\t\t\t\t\telse if (face == 3) {\n\t\t\t\t\t\tpixel = texture(textures[3], vec2(uvFace.x, uvFace.y));\n\t\t\t\t\t}\n\t\t\t\t\telse if (face == 4) {\n\t\t\t\t\t\tpixel = texture(textures[4], vec2(uvFace.x, uvFace.y));\n\t\t\t\t\t}\n\t\t\t\t\telse if (face == 5) {\n\t\t\t\t\t\tpixel = texture(textures[5], vec2(uvFace.x, uvFace.y));\n\t\t\t\t\t}\n\n\t\t\t\t\toutColor = pixel;\n\t\t\t\t}",
      glslVersion: PioneerPublicApi.THREE.GLSL3,
      depthTest: false,
      depthWrite: false,
      side: PioneerPublicApi.THREE.DoubleSide
    });
    this._threeJsQuad = new PioneerPublicApi.THREE.Mesh(bufferGeometry, rawShaderMaterial);
    this._threeJsQuad.frustumCulled = false;
    this._threeJsSpoutScene.add(this._threeJsQuad);
  }
  _renderWidth;
  _globeDistance;
  _threeJsFaceCameras;
  _threeJsFaceRenderTargets;
  _threeJsQuad;
  _threeJsSpoutScene;
  _threeJsCubeCamera;
  _tagStart;
  _tagEnd;
  _tagSend;
  _spoutTexture;
}
export { SpoutComponent };
