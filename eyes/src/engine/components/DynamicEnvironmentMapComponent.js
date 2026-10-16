// 动态环境图拥有六个面相机与渲染目标，先绘制六面再合成带 mip 区域的 cube-UV 图；投影深度系数跟随实体 CameraComponent，销毁时同时回收面目标、合成目标与四边形。
// Recovered from app.js:321593-333519.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class DynamicEnvironmentMapComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._faceSize = 64;
    this._invalidColor = new PioneerPublicApi.Color(0, 1, 64 / 255);
    if ("production" === this.getEntity().getScene().getEngine().getEnvironment()) {
      this._invalidColor.set(0, 0, 0);
    }
    this._threeJsRenderer = this.getEntity().getScene().getEngine().__getThreeJsRenderer();
    this._threeJsFaceCameras = [];
    this._threeJsFaceRenderTargets = [];
    this._threeJsQuad = new PioneerPublicApi.THREE.Mesh();
    this._threeJsScene = new PioneerPublicApi.THREE.Scene();
    this._threeJsCubeCamera = new PioneerPublicApi.THREE.OrthographicCamera(-1, 1, -1, 1, -1, 1);
    this._envMapTexture = new PioneerPublicApi.THREE.WebGLRenderTarget(4 * this._faceSize, 4 * this._faceSize, {
      minFilter: PioneerPublicApi.THREE.LinearFilter,
      magFilter: PioneerPublicApi.THREE.LinearFilter,
      wrapS: PioneerPublicApi.THREE.ClampToEdgeWrapping,
      wrapT: PioneerPublicApi.THREE.ClampToEdgeWrapping
    });
    this._setupFaceCameras();
    this._setupQuad();
  }
  getFaceSize() {
    return this._faceSize;
  }
  setFaceSize(faceSize) {
    this._faceSize = faceSize;
    if (this._envMapTexture.width !== 4 * this._faceSize) {
      this._envMapTexture.setSize(4 * this._faceSize, 4 * this._faceSize);
      this._threeJsQuad.material.uniforms.faceSize.value = this._faceSize;
    }
    for (let faceIndex = 0; faceIndex < 6; faceIndex++) this._threeJsFaceRenderTargets[faceIndex].setSize(this._faceSize, this._faceSize);
  }
  getTexture() {
    return this._envMapTexture.texture;
  }
  __destroy() {
    PioneerPublicApi.ThreeJsHelper.destroyMaterial(this._threeJsQuad.material, true);
    PioneerPublicApi.ThreeJsHelper.destroyObject(this._threeJsQuad);
    PioneerPublicApi.ThreeJsHelper.destroyRenderTarget(this._envMapTexture);
    for (let faceIndex = 0; faceIndex < this._threeJsFaceRenderTargets.length; faceIndex++) PioneerPublicApi.ThreeJsHelper.destroyRenderTarget(this._threeJsFaceRenderTargets[faceIndex]);
    super.__destroy();
  }
  __render() {
    this._updateProjectionMatrix();
    const halfSqrtTwo = .7071067811865476;
    const orientation = PioneerPublicApi.Quaternion.threeJsPool.get();
    orientation.set(0, 0, -halfSqrtTwo, halfSqrtTwo);
    this._threeJsFaceCameras[0].setRotationFromQuaternion(orientation);
    orientation.set(0, 0, 0, 1);
    this._threeJsFaceCameras[1].setRotationFromQuaternion(orientation);
    orientation.set(0, 0, halfSqrtTwo, halfSqrtTwo);
    this._threeJsFaceCameras[2].setRotationFromQuaternion(orientation);
    orientation.set(0, 0, 1, 0);
    this._threeJsFaceCameras[3].setRotationFromQuaternion(orientation);
    orientation.set(.5, -.5, -.5, .5);
    this._threeJsFaceCameras[4].setRotationFromQuaternion(orientation);
    orientation.set(-.5, .5, -.5, .5);
    this._threeJsFaceCameras[5].setRotationFromQuaternion(orientation);
    PioneerPublicApi.Quaternion.threeJsPool.release(orientation);
    for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
      this._threeJsRenderer.setRenderTarget(this._threeJsFaceRenderTargets[faceIndex]);
      this._threeJsRenderer.render(this.getEntity().getScene().getThreeJsScene(), this._threeJsFaceCameras[faceIndex]);
    }
    this._threeJsRenderer.setRenderTarget(this._envMapTexture);
    this._threeJsRenderer.render(this._threeJsScene, this._threeJsCubeCamera);
  }
  _setupFaceCameras() {
    for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
      const perspectiveCamera = new PioneerPublicApi.THREE.PerspectiveCamera(90, 1, .1, 1e3);
      this._threeJsFaceCameras.push(perspectiveCamera);
      const matrix4 = new PioneerPublicApi.THREE.Matrix4();
      matrix4.set(1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0);
      perspectiveCamera.projectionMatrix = matrix4;
      const inverseProjection = new PioneerPublicApi.THREE.Matrix4();
      inverseProjection.set(1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0);
      perspectiveCamera.projectionMatrixInverse = inverseProjection;
      perspectiveCamera.layers.set(1);
      const webGLRenderTarget = new PioneerPublicApi.THREE.WebGLRenderTarget(this._faceSize, this._faceSize, {
        minFilter: PioneerPublicApi.THREE.LinearFilter,
        magFilter: PioneerPublicApi.THREE.LinearFilter
      });
      this._threeJsFaceRenderTargets.push(webGLRenderTarget);
    }
  }
  _updateProjectionMatrix() {
    const camera = this.getEntity().getComponent(PioneerPublicApi.CameraComponent);
    if (null === camera) return;
    const depthScale = 1 - Number.EPSILON;
    const depthOffset = -camera.getAutoNearDistance() * (2 - Number.EPSILON);
    for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
      const faceCamera = this._threeJsFaceCameras[faceIndex];
      faceCamera.projectionMatrix.elements[6] = depthScale;
      faceCamera.projectionMatrix.elements[14] = depthOffset;
      faceCamera.projectionMatrixInverse.elements[11] = 1 / depthOffset;
      faceCamera.projectionMatrixInverse.elements[15] = -depthScale / depthOffset;
    }
  }
  _setupQuad() {
    const bufferGeometry = new PioneerPublicApi.THREE.BufferGeometry();
    const quadPositions = new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0]);
    const quadIndices = new Uint16Array([0, 1, 2, 0, 2, 3]);
    bufferGeometry.setAttribute("position", new PioneerPublicApi.THREE.BufferAttribute(quadPositions, 3));
    bufferGeometry.setIndex(new PioneerPublicApi.THREE.BufferAttribute(quadIndices, 1));
    const uniforms = {
      textures: new PioneerPublicApi.THREE.Uniform([]),
      faceSize: new PioneerPublicApi.THREE.Uniform(this._faceSize),
      invalidColor: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector3(this._invalidColor.r, this._invalidColor.g, this._invalidColor.b))
    };
    for (let faceIndex = 0; faceIndex < 6; faceIndex++) uniforms.textures.value.push(this._threeJsFaceRenderTargets[faceIndex].texture);
    const rawShaderMaterial = new PioneerPublicApi.THREE.RawShaderMaterial({
      uniforms: uniforms,
      vertexShader: "\n\t\t\t\tin vec3 position;\n\t\t\t\tout vec2 xy;\n\t\t\t\tvoid main() {\n\t\t\t\t\tgl_Position = vec4(position, 1.0);\n\t\t\t\t\txy = position.xy;\n\t\t\t\t}",
      fragmentShader: "\n\t\t\t\tprecision highp float;\n\n\t\t\t\tuniform sampler2D textures[6];\n\t\t\t\tuniform float faceSize;\n\t\t\t\tuniform vec3 invalidColor;\n\n\t\t\t\tin vec2 xy;\n\n\t\t\t\t// The output color.\n\t\t\t\tout vec4 outColor;\n\n\t\t\t\tvoid adjustTextureCoordsForBorders(inout int textureIndex, inout vec2 xyInTexture, in float pixelSize) {\n\t\t\t\t\t// Get the pixells in pixel-space.\n\t\t\t\t\tvec2 xyInPixels = xyInTexture * pixelSize;\n\n\t\t\t\t\t// Flip the x since this code is for surface cubes, but we're inside out.\n\t\t\t\t\txyInPixels.x = pixelSize - xyInPixels.x;\n\n\t\t\t\t\t// If it's a border, adjust the pixel it's reading the next pixel in one face over.\n\t\t\t\t\t// This allows for nice linear filtering to happen on the material side of things.\n\t\t\t\t\tif (xyInPixels.x < 0.6 || xyInPixels.x > pixelSize - 0.6 || xyInPixels.y < 0.6 || xyInPixels.y > pixelSize - 0.6) {\n\t\t\t\t\t\tif (0 <= textureIndex && textureIndex <= 3) { // One of the horizontal faces\n\t\t\t\t\t\t\tif (xyInPixels.x > pixelSize - 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.x = 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = (textureIndex + 1);\n\t\t\t\t\t\t\t\tif (textureIndex == 4) {\n\t\t\t\t\t\t\t\t\ttextureIndex = 0;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\telse if (xyInPixels.x < 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.x = pixelSize - 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = textureIndex - 1;\n\t\t\t\t\t\t\t\tif (textureIndex == -1) {\n\t\t\t\t\t\t\t\t\ttextureIndex = 3;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif (textureIndex == 0) {\n\t\t\t\t\t\t\tif (xyInPixels.y < 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.y = pixelSize - 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = 5;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\telse if (xyInPixels.y > pixelSize - 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.y = 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = 4;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif (textureIndex == 1) {\n\t\t\t\t\t\t\tif (xyInPixels.y < 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.y = pixelSize - xyInPixels.x;\n\t\t\t\t\t\t\t\txyInPixels.x = pixelSize - 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = 5;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\telse if (xyInPixels.y > pixelSize - 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.y = xyInPixels.x;\n\t\t\t\t\t\t\t\txyInPixels.x = pixelSize - 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = 4;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif (textureIndex == 2) {\n\t\t\t\t\t\t\tif (xyInPixels.y < 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.x = pixelSize - xyInPixels.x;\n\t\t\t\t\t\t\t\txyInPixels.y = 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = 5;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\telse if (xyInPixels.y > pixelSize - 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.x = pixelSize - xyInPixels.x;\n\t\t\t\t\t\t\t\txyInPixels.y = pixelSize - 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = 4;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif (textureIndex == 3) {\n\t\t\t\t\t\t\tif (xyInPixels.y < 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.y = xyInPixels.x;\n\t\t\t\t\t\t\t\txyInPixels.x = 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = 5;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\telse if (xyInPixels.y > pixelSize - 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.y = pixelSize - xyInPixels.x;\n\t\t\t\t\t\t\t\txyInPixels.x = 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = 4;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif (textureIndex == 4) {\n\t\t\t\t\t\t\tif (xyInPixels.x < 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.x = pixelSize - xyInPixels.y;\n\t\t\t\t\t\t\t\txyInPixels.y = pixelSize - 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = 3;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\telse if (xyInPixels.x > pixelSize - 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.x = xyInPixels.y;\n\t\t\t\t\t\t\t\txyInPixels.y = pixelSize - 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = 1;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tif (xyInPixels.y < 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.y = pixelSize - 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = 0;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\telse if (xyInPixels.y > pixelSize - 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.x = pixelSize - xyInPixels.x;\n\t\t\t\t\t\t\t\txyInPixels.y = pixelSize - 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = 2;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tif (textureIndex == 5) {\n\t\t\t\t\t\t\tif (xyInPixels.x < 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.x = xyInPixels.y;\n\t\t\t\t\t\t\t\txyInPixels.y = 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = 3;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\telse if (xyInPixels.x > pixelSize - 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.x = pixelSize - xyInPixels.y;\n\t\t\t\t\t\t\t\txyInPixels.y = 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = 1;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tif (xyInPixels.y < 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.x = pixelSize - xyInPixels.x;\n\t\t\t\t\t\t\t\txyInPixels.y = 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = 2;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\telse if (xyInPixels.y > pixelSize - 0.6) {\n\t\t\t\t\t\t\t\txyInPixels.y = 1.5;\n\t\t\t\t\t\t\t\ttextureIndex = 0;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\t// Shrink all pixels so that they fit within the border.\n\t\t\t\t\t// The border pixels have already been modified so that they work with this equation.\n\t\t\t\t\txyInPixels.x = ((pixelSize - 1.0) * xyInPixels.x - pixelSize) / (pixelSize - 3.0);\n\t\t\t\t\txyInPixels.y = ((pixelSize - 1.0) * xyInPixels.y - pixelSize) / (pixelSize - 3.0);\n\n\t\t\t\t\t// Flip the x back.\n\t\t\t\t\txyInPixels.x = pixelSize - xyInPixels.x;\n\n\t\t\t\t\t// Go back into unit-space.\n\t\t\t\t\txyInTexture = xyInPixels / pixelSize;\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\t\t\t\t\t// Make it pink everywhere else for easy debugging.\n\t\t\t\t\tvec3 color = invalidColor;\n\t\t\t\t\t// Get the mip level, size, and offset.\n\t\t\t\t\tfloat level = floor(1.0 - log2(1.0 - xy.y)); // 0 is base, then 1, etc.\n\t\t\t\t\tfloat mipSizeX = pow(2.0, -level); // 1, .5, .25, .125, etc.\n\t\t\t\t\tfloat mipOffsetY = 1.0 - pow(2.0, -level); // 0, .5, .75, .875, etc.\n\t\t\t\t\t// Get the xy within the mip level. Note the x value is * 3 for less computing further on.\n\t\t\t\t\tvec2 xyInMip;\n\t\t\t\t\txyInMip.x = 0.5 * (xy.x + 1.0) / mipSizeX * 4.0;\n\t\t\t\t\txyInMip.y = (xy.y + 1.0 - 2.0 * mipOffsetY) / mipSizeX;\n\t\t\t\t\tif (xyInMip.x <= 3.0) {\n\t\t\t\t\t\tint textureIndex = int(floor(xyInMip.y * 2.0) * 3.0 + floor(xyInMip.x));\n\t\t\t\t\t\t// Get the xy within the face/texture.\n\t\t\t\t\t\tvec2 xyInTexture;\n\t\t\t\t\t\txyInTexture.x = 1.0 - xyInMip.x + floor(xyInMip.x);\n\t\t\t\t\t\txyInTexture.y = 2.0 * (xyInMip.y - floor(xyInMip.y * 2.0) / 2.0);\n\t\t\t\t\t\t// Adjust the coordinates and face to account for borders.\n\t\t\t\t\t\tadjustTextureCoordsForBorders(textureIndex, xyInTexture, faceSize * mipSizeX);\n\t\t\t\t\t\t// Set the color based on the face (textureIndex) and the coords.\n\t\t\t\t\t\tif (textureIndex == 0) {\n\t\t\t\t\t\t\tcolor = texture(textures[0], xyInTexture).rgb;\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse if (textureIndex == 1) {\n\t\t\t\t\t\t\tcolor = texture(textures[1], xyInTexture).rgb;\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse if (textureIndex == 2) {\n\t\t\t\t\t\t\tcolor = texture(textures[2], xyInTexture).rgb;\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse if (textureIndex == 3) {\n\t\t\t\t\t\t\tcolor = texture(textures[3], xyInTexture).rgb;\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse if (textureIndex == 4) {\n\t\t\t\t\t\t\tcolor = texture(textures[4], xyInTexture).rgb;\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse if (textureIndex == 5) {\n\t\t\t\t\t\t\tcolor = texture(textures[5], xyInTexture).rgb;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\toutColor = vec4(color, 1.0);\n\t\t\t\t}",
      glslVersion: PioneerPublicApi.THREE.GLSL3,
      depthTest: false,
      depthWrite: false
    });
    this._threeJsQuad = new PioneerPublicApi.THREE.Mesh(bufferGeometry, rawShaderMaterial);
    this._threeJsQuad.frustumCulled = false;
    this._threeJsScene.add(this._threeJsQuad);
  }
  _faceSize;
  _invalidColor;
  _threeJsRenderer;
  _threeJsFaceCameras;
  _threeJsFaceRenderTargets;
  _threeJsQuad;
  _threeJsScene;
  _threeJsCubeCamera;
  _envMapTexture;
}
export { DynamicEnvironmentMapComponent };
