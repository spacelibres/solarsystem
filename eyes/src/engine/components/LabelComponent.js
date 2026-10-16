// 标签共享四边形与 shader 模板，每实例持有画布纹理和材质 clone；文字按设备像素比光栅化到二次幂画布，逐相机计算像素偏移与 normalSpaceBounds，卸载按 useCount 回收共享对象。
// Recovered from app.js:341095-349429.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class LabelComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._text = "<PLACEHOLDER>";
    this._fontFamily = "Arial";
    this._fontSize = 16;
    this._color = new PioneerPublicApi.Color();
    this._alignment = new PioneerPublicApi.Vector2(0, .5);
    this._pixelOffset = new PioneerPublicApi.Vector2(0, 0);
    this._pixelSize = new PioneerPublicApi.Vector2();
    this._devicePixelRatio = 1;
    this._canvas = null;
    this._normalSpaceBounds = new Map();
    this.setVisibleInterval(PioneerPublicApi.VisibleInterval.DefaultVisibleFar);
    const fontFamily = entity.getScene().getEngine().getConfig().getValue("fontFamily");
    if ("string" == typeof fontFamily) {
      this._fontFamily = fontFamily;
    }
    const fontSize = entity.getScene().getEngine().getConfig().getValue("fontSize");
    if ("number" == typeof fontSize) {
      this._fontSize = fontSize;
    }
    this.__setRadius(Number.POSITIVE_INFINITY);
  }
  getText() {
    return this._text;
  }
  setText(text) {
    this._text = text;
    this._updateText();
  }
  getFontFamily() {
    return this._fontFamily;
  }
  setFontFamily(fontFamily) {
    this._fontFamily = fontFamily;
    this._updateText();
  }
  getFontSize() {
    return this._fontSize;
  }
  setFontSize(fontSize) {
    this._fontSize = fontSize;
    this._updateText();
  }
  getColor() {
    return this._color;
  }
  setColor(color) {
    this._color.copy(color);
  }
  getAlignment() {
    return this._alignment;
  }
  setAlignment(alignment) {
    this._alignment.copy(alignment);
    this._updateText();
  }
  getPixelOffset() {
    return this._pixelOffset;
  }
  setPixelOffset(pixelOffset) {
    this._pixelOffset.copy(pixelOffset);
  }
  getNormalSpaceBounds(camera) {
    return this._normalSpaceBounds.get(camera);
  }
  __prepareForRender(camera) {
    let renderSize;
    PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), camera);
    PioneerPublicApi.ThreeJsHelper.setOrientation(this.getThreeJsObjects()[0], PioneerPublicApi.Quaternion.Identity);
    if (camera instanceof PioneerPublicApi.SpoutComponent) {
      PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "flipX", camera.getForGlobe() ? -1 : 1);
      renderSize = camera.getRenderWidth();
      renderSize /= 4;
    } else {
      PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "flipX", 1);
      const viewportSize = camera.getViewport()?.getBounds().size ?? PioneerPublicApi.Vector2.Zero;
      renderSize = Math.max(viewportSize.x, viewportSize.y);
    }
    if (!this._canvas) return;
    const pixelOffset = PioneerPublicApi.Vector2.pool.get();
    const pixelSize = PioneerPublicApi.Vector2.pool.get();
    const renderUp = PioneerPublicApi.Vector3.pool.get();
    const renderRight = PioneerPublicApi.Vector3.pool.get();
    pixelOffset.set(this._pixelOffset.x - this._alignment.x * this._canvas.width, this._pixelOffset.y - this._alignment.y * this._canvas.height);
    pixelSize.set(this._canvas.width, this._canvas.height);
    camera.getEntity().getOrientation().getAxis(renderUp, 2);
    camera.getEntity().getOrientation().getAxis(renderRight, 0);
    PioneerPublicApi.ThreeJsHelper.setUniformVector2(this.getThreeJsMaterials()[0], "pixelOffset", pixelOffset);
    PioneerPublicApi.ThreeJsHelper.setUniformVector2(this.getThreeJsMaterials()[0], "pixelSize", pixelSize);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "renderSize", renderSize);
    PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "renderUp", renderUp);
    PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "renderRight", renderRight);
    if (!(camera instanceof PioneerPublicApi.SpoutComponent)) {
      let bounds = this._normalSpaceBounds.get(camera);
      if (!bounds) {
        bounds = new PioneerPublicApi.Rect();
        this._normalSpaceBounds.set(camera, bounds);
      }
      const normalPosition = this.getEntity().getNormalSpacePosition(camera);
      bounds.origin.x = normalPosition.x + 2 * (this._pixelOffset.x - this._alignment.x * this._pixelSize.x) / renderSize;
      bounds.origin.y = normalPosition.y + 2 * (this._pixelOffset.y - this._alignment.y * this._pixelSize.y) / renderSize;
      bounds.size.x = 2 * this._pixelSize.x / renderSize;
      bounds.size.y = 2 * this._pixelSize.y / renderSize;
    }
    PioneerPublicApi.Vector2.pool.release(pixelSize);
    PioneerPublicApi.Vector2.pool.release(pixelOffset);
    PioneerPublicApi.Vector3.pool.release(renderUp);
    PioneerPublicApi.Vector3.pool.release(renderRight);
    const visibility = this._determineComponentVisibility(camera);
    const color = PioneerPublicApi.Color.pool.get();
    color.copy(this._color);
    color.a *= visibility;
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "colorMultiplier", color);
    PioneerPublicApi.Color.pool.release(color);
  }
  _determineComponentVisibility(camera) {
    const cameraPosition = this.getEntity().getCameraSpacePosition(camera);
    let visibility = 1;
    visibility *= this.getVisibleInterval().getFadeMultiplier(this.getEntity(), camera);
    if (camera.isPositionOccluded(cameraPosition)) {
      visibility = 0;
    }
    return visibility;
  }
  async __loadResources() {
    if (!LabelComponent._threeJsGeometry) {
      LabelComponent._threeJsGeometry = PioneerPublicApi.ThreeJsHelper.createGeometry([{
        name: "position",
        dimensions: 3
      }, {
        name: "uv",
        dimensions: 2
      }], false);
      PioneerPublicApi.ThreeJsHelper.setVertices(LabelComponent._threeJsGeometry, "position", new Float32Array([0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0]));
      PioneerPublicApi.ThreeJsHelper.setVertices(LabelComponent._threeJsGeometry, "uv", new Float32Array([0, 1, 1, 1, 1, 0, 0, 0]));
      PioneerPublicApi.ThreeJsHelper.setIndices(LabelComponent._threeJsGeometry, new Uint16Array([0, 1, 2, 2, 3, 0]));
    }
    LabelComponent._threeJsMaterial ??= new PioneerPublicApi.THREE.ShaderMaterial({
      uniforms: {
        colorMultiplier: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector4(1, 1, 1, 1)),
        colorTexture: new PioneerPublicApi.THREE.Uniform(null),
        pixelOffset: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector2(0, 0)),
        pixelSize: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector2(1, 1)),
        renderSize: new PioneerPublicApi.THREE.Uniform(1),
        renderUp: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector3(0, 1, 0)),
        renderRight: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector3(1, 0, 0)),
        flipX: new PioneerPublicApi.THREE.Uniform(1),
        ...PioneerPublicApi.ShaderChunkLogDepth.ThreeUniforms
      },
      vertexShader: `\n\t\t\t\tuniform vec2 pixelOffset;\n\t\t\t\tuniform vec2 pixelSize;\n\t\t\t\tuniform float renderSize;\n\t\t\t\tuniform vec3 renderUp;\n\t\t\t\tuniform vec3 renderRight;\n\t\t\t\tuniform float flipX;\n\t\t\t\tout vec2 fUV;\n\n\t\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.VertexHead}\n\n\t\t\t\tvoid main() {\n\t\t\t\t\t// Get a frame for the label to be on the x-y axis.\n\t\t\t\t\tvec3 forward = (modelMatrix * vec4(0, 0, 0, 1.)).xyz;\n\t\t\t\t\tfloat distance = length(forward);\n\t\t\t\t\tforward = normalize(forward);\n\t\t\t\t\tvec3 up = normalize(renderUp);\n\t\t\t\t\tvec3 right = normalize(cross(forward, up));\n\n\t\t\t\t\t// Setup the up and right vectors.\n\t\t\t\t\tup *= (position.y * pixelSize.y + pixelOffset.y) / renderSize * distance;\n\t\t\t\t\tright *= (position.x * pixelSize.x + pixelOffset.x) / renderSize * distance * flipX;\n\n\t\t\t\t\t// Do the transforms.\n\t\t\t\t\tvec4 viewPosition = modelViewMatrix * vec4(up + right, 1.);\n\t\t\t\t\tgl_Position = projectionMatrix * viewPosition;\n\n\t\t\t\t\tfUV = uv;\n\n\t\t\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.Vertex}\n\t\t\t\t}`,
      fragmentShader: `\n\t\t\t\tprecision highp float;\n\n\t\t\t\tuniform vec4 colorMultiplier;\n\t\t\t\tuniform sampler2D colorTexture;\n\t\t\t\tin vec2 fUV;\n\n\t\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.FragmentHead}\n\n\t\t\t\tvoid main(void) {\n\t\t\t\t\tpc_fragColor = texture(colorTexture, fUV);\n\t\t\t\t\tpc_fragColor *= colorMultiplier;\n\n\t\t\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.Fragment}\n\t\t\t\t}`,
      side: PioneerPublicApi.THREE.DoubleSide
    });
    LabelComponent._useCount += 1;
    const material = LabelComponent._threeJsMaterial.clone();
    this.getThreeJsMaterials().push(material);
    PioneerPublicApi.ThreeJsHelper.setTransparent(material, true);
    PioneerPublicApi.ThreeJsHelper.setOverlay(material, true);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(material, "colorMultiplier", this._color);
    const mesh = PioneerPublicApi.ThreeJsHelper.createMeshObjectGivenGeometry(this, material, LabelComponent._threeJsGeometry);
    this.getThreeJsObjects().push(mesh);
    this._canvas = document.createElement("canvas");
    this._canvas.width = 1;
    this._canvas.height = 1;
    this._updateText();
  }
  __unloadResources() {
    LabelComponent._useCount -= 1;
    if (0 === LabelComponent._useCount) {
      if (LabelComponent._threeJsGeometry) {
        PioneerPublicApi.ThreeJsHelper.destroyGeometry(LabelComponent._threeJsGeometry);
        LabelComponent._threeJsGeometry = null;
      }
      if (LabelComponent._threeJsMaterial) {
        PioneerPublicApi.ThreeJsHelper.destroyMaterial(LabelComponent._threeJsMaterial, true);
        LabelComponent._threeJsMaterial = null;
      }
    }
    const mesh = this.getThreeJsObjects()[0];
    if (null !== mesh.parent) {
      mesh.parent.remove(mesh);
    }
    PioneerPublicApi.ThreeJsHelper.destroyMaterial(this.getThreeJsMaterials()[0], true);
    this._canvas = null;
  }
  // 文字先按 CSS 字号测量，再乘设备像素比填充二次幂画布；对齐量同时分配画布留白。
  _updateText() {
    if (null === this._canvas) return;
    const context = this._canvas.getContext("2d");
    if (!context) return;
    this._devicePixelRatio = window.devicePixelRatio;
    context.font = `${this._fontSize}px ${this._fontFamily}`;
    const metrics = context.measureText(this._text);
    this._pixelSize.set(metrics.width * this._devicePixelRatio, this._fontSize * this._devicePixelRatio);
    const canvasWidth = PioneerPublicApi.MathUtils.ceilPow2(this._pixelSize.x);
    const canvasHeight = PioneerPublicApi.MathUtils.ceilPow2(this._pixelSize.y);
    if (!(canvasWidth === this._canvas.width && canvasHeight === this._canvas.height)) {
      this._canvas.width = canvasWidth;
      this._canvas.height = canvasHeight;
    }
    context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._canvas.style.width = canvasWidth / this._devicePixelRatio + "px";
    this._canvas.style.height = canvasHeight / this._devicePixelRatio + "px";
    context.font = `${this._pixelSize.y}px ${this._fontFamily}`;
    context.fillStyle = "rgba(255, 255, 255, 255)";
    context.fillText(this._text, (this._canvas.width - this._pixelSize.x) * PioneerPublicApi.MathUtils.clamp01(this._alignment.x), this._canvas.height - .1875 * this._pixelSize.y - (this._canvas.height - this._pixelSize.y) * PioneerPublicApi.MathUtils.clamp01(this._alignment.y));
    const material = this.getThreeJsMaterials()[0];
    PioneerPublicApi.ThreeJsHelper.setUniformTexture(material, "colorTexture", PioneerPublicApi.ThreeJsHelper.loadTextureFromCanvas(this._canvas));
  }
  _text;
  _fontFamily;
  _fontSize;
  _color;
  _alignment;
  _pixelOffset;
  _pixelSize;
  _devicePixelRatio;
  _canvas;
  _normalSpaceBounds;
  static _threeJsMaterial = null;
  static _threeJsGeometry = null;
  static _useCount = 0;
}
export { LabelComponent };
