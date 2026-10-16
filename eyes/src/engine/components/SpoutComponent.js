// Spout 相机将实体朝向乘六个固定面旋转，输出等距柱状全景；球幕模式反转深度与剔除方向，标签 render target 的清空顺序属于既有输出协议，保持不变。
// Recovered from app.js:407522-415156.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class SpoutComponent extends PioneerPublicApi.CameraComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
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
  getRenderWidth() {
    return this._renderWidth;
  }
  setRenderWidth(renderWidth) {
    this._renderWidth = renderWidth;
    if (this._spoutTexture.width !== this._renderWidth) {
      this._spoutTexture.setSize(this._renderWidth, this._renderWidth / 2);
    }
    for (let faceIndex = 0; faceIndex < 6; faceIndex++) this._threeJsFaceRenderTargets[faceIndex].setSize(this._renderWidth / 4, this._renderWidth / 4);
  }
  getForGlobe() {
    return 1 === this.getInvertDepth();
  }
  setForGlobe(forGlobe, globeDistance) {
    this.setInvertDepth(forGlobe ? 1 : 0);
    this._globeDistance = globeDistance;
  }
  __render() {
    if (this.getForGlobe()) {
      const parentEntity = this.getEntity().getParent();
      if (parentEntity) {
        this.setNearDistance(Math.max(.1, .5 * parentEntity.getOcclusionRadius()));
      }
      this.setMidDistance(this.getAutoNearDistance());
    }
    this._updateProjectionMatrices();
    const halfSqrtTwo = .7071067811865476;
    const entityOrientation = this.getEntity().getOrientation();
    const faceOrientation = PioneerPublicApi.Quaternion.threeJsPool.get();
    faceOrientation.set(entityOrientation.x, entityOrientation.y, entityOrientation.z, entityOrientation.w);
    this._threeJsFaceCameras[0].setRotationFromQuaternion(faceOrientation);
    faceOrientation.set(halfSqrtTwo * (entityOrientation.x - entityOrientation.y), halfSqrtTwo * (entityOrientation.x + entityOrientation.y), halfSqrtTwo * (-entityOrientation.w + entityOrientation.z), halfSqrtTwo * (entityOrientation.w + entityOrientation.z));
    this._threeJsFaceCameras[1].setRotationFromQuaternion(faceOrientation);
    faceOrientation.set(entityOrientation.y, -entityOrientation.x, entityOrientation.w, -entityOrientation.z);
    this._threeJsFaceCameras[2].setRotationFromQuaternion(faceOrientation);
    faceOrientation.set(halfSqrtTwo * (entityOrientation.x + entityOrientation.y), halfSqrtTwo * (-entityOrientation.x + entityOrientation.y), halfSqrtTwo * (entityOrientation.w + entityOrientation.z), halfSqrtTwo * (entityOrientation.w - entityOrientation.z));
    this._threeJsFaceCameras[3].setRotationFromQuaternion(faceOrientation);
    faceOrientation.set(halfSqrtTwo * (entityOrientation.w + entityOrientation.x), halfSqrtTwo * (entityOrientation.y + entityOrientation.z), halfSqrtTwo * (-entityOrientation.y + entityOrientation.z), halfSqrtTwo * (entityOrientation.w - entityOrientation.x));
    this._threeJsFaceCameras[4].setRotationFromQuaternion(faceOrientation);
    faceOrientation.set(halfSqrtTwo * (-entityOrientation.w + entityOrientation.x), halfSqrtTwo * (entityOrientation.y - entityOrientation.z), halfSqrtTwo * (entityOrientation.y + entityOrientation.z), halfSqrtTwo * (entityOrientation.w + entityOrientation.x));
    this._threeJsFaceCameras[5].setRotationFromQuaternion(faceOrientation);
    PioneerPublicApi.Quaternion.threeJsPool.release(faceOrientation);
    const renderer = this.getEntity().getScene().getEngine().__getThreeJsRenderer();
    if (this.getForGlobe()) {
      renderer.state.setCullFace(PioneerPublicApi.THREE.CullFaceFront);
    }
    for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
      renderer.setRenderTarget(this._threeJsFaceRenderTargets[faceIndex]);
      renderer.render(this.getEntity().getScene().getThreeJsScene(), this._threeJsFaceCameras[faceIndex]);
    }
    if (this.getForGlobe()) {
      renderer.state.setCullFace(PioneerPublicApi.THREE.CullFaceBack);
    }
    renderer.setRenderTarget(this._tagStart);
    renderer.clearColor();
    renderer.setRenderTarget(this._spoutTexture);
    renderer.clearColor();
    renderer.setRenderTarget(this._tagEnd);
    renderer.clearColor();
    renderer.setRenderTarget(this._spoutTexture);
    renderer.render(this._threeJsSpoutScene, this._threeJsCubeCamera);
    renderer.setRenderTarget(this._tagSend);
    renderer.clearColor();
    renderer.setRenderTarget(null);
  }
  _updateProjectionMatrices() {
    const nearDistance = this.getAutoNearDistance();
    let depthScale = Number.EPSILON - 1;
    let depthOffset = nearDistance * (2 - Number.EPSILON);
    if (1 === this.getInvertDepth()) {
      const globeDistance = this._globeDistance;
      depthScale = (nearDistance + globeDistance) * (1 - Number.EPSILON) / (nearDistance - globeDistance);
      depthOffset = -2 * nearDistance * globeDistance * (1 - Number.EPSILON) / (nearDistance - globeDistance);
    }
    for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
      const faceCamera = this._threeJsFaceCameras[faceIndex];
      faceCamera.projectionMatrix.elements[6] = depthScale;
      faceCamera.projectionMatrix.elements[14] = depthOffset;
    }
  }
  _setupQuad() {
    const bufferGeometry = new PioneerPublicApi.THREE.BufferGeometry();
    const quadPositions = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]);
    const quadIndices = new Uint16Array([0, 1, 2, 0, 2, 3]);
    bufferGeometry.setAttribute("position", new PioneerPublicApi.THREE.BufferAttribute(quadPositions, 3));
    bufferGeometry.setIndex(new PioneerPublicApi.THREE.BufferAttribute(quadIndices, 1));
    const uniforms = {
      textures: new PioneerPublicApi.THREE.Uniform([])
    };
    for (let faceIndex = 0; faceIndex < 6; faceIndex++) uniforms.textures.value.push(this._threeJsFaceRenderTargets[faceIndex].texture);
    const rawShaderMaterial = new PioneerPublicApi.THREE.RawShaderMaterial({
      uniforms: uniforms,
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
