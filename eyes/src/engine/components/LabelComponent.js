// Recovered from app.js:341095-349429.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class LabelComponent extends PioneerPublicApi.BaseComponent {
  constructor(t, e) {
    super(t, e);
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
    const fontFamily = e.getScene().getEngine().getConfig().getValue("fontFamily");
    "string" == typeof fontFamily && (this._fontFamily = fontFamily);
    const fontSize = e.getScene().getEngine().getConfig().getValue("fontSize");
    "number" == typeof fontSize && (this._fontSize = fontSize);
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
  setColor(t) {
    this._color.copy(t);
  }
  getAlignment() {
    return this._alignment;
  }
  setAlignment(t) {
    this._alignment.copy(t);
    this._updateText();
  }
  getPixelOffset() {
    return this._pixelOffset;
  }
  setPixelOffset(t) {
    this._pixelOffset.copy(t);
  }
  getNormalSpaceBounds(t) {
    return this._normalSpaceBounds.get(t);
  }
  __prepareForRender(t) {
    let e;
    if (PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), t), PioneerPublicApi.ThreeJsHelper.setOrientation(this.getThreeJsObjects()[0], PioneerPublicApi.Quaternion.Identity), t instanceof PioneerPublicApi.SpoutComponent) {
      PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "flipX", t.getForGlobe() ? -1 : 1);
      e = t.getRenderWidth();
      e /= 4;
    } else {
      PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "flipX", 1);
      const i = t.getViewport()?.getBounds().size ?? PioneerPublicApi.Vector2.Zero;
      e = Math.max(i.x, i.y);
    }
    if (!this._canvas) return;
    const i = PioneerPublicApi.Vector2.pool.get();
    const n = PioneerPublicApi.Vector2.pool.get();
    const o = PioneerPublicApi.Vector3.pool.get();
    const r = PioneerPublicApi.Vector3.pool.get();
    if (i.set(this._pixelOffset.x - this._alignment.x * this._canvas.width, this._pixelOffset.y - this._alignment.y * this._canvas.height), n.set(this._canvas.width, this._canvas.height), t.getEntity().getOrientation().getAxis(o, 2), t.getEntity().getOrientation().getAxis(r, 0), PioneerPublicApi.ThreeJsHelper.setUniformVector2(this.getThreeJsMaterials()[0], "pixelOffset", i), PioneerPublicApi.ThreeJsHelper.setUniformVector2(this.getThreeJsMaterials()[0], "pixelSize", n), PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "renderSize", e), PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "renderUp", o), PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "renderRight", r), !(t instanceof PioneerPublicApi.SpoutComponent)) {
      let i = this._normalSpaceBounds.get(t);
      i || (i = new PioneerPublicApi.Rect(), this._normalSpaceBounds.set(t, i));
      const n = this.getEntity().getNormalSpacePosition(t);
      i.origin.x = n.x + 2 * (this._pixelOffset.x - this._alignment.x * this._pixelSize.x) / e;
      i.origin.y = n.y + 2 * (this._pixelOffset.y - this._alignment.y * this._pixelSize.y) / e;
      i.size.x = 2 * this._pixelSize.x / e;
      i.size.y = 2 * this._pixelSize.y / e;
    }
    PioneerPublicApi.Vector2.pool.release(n);
    PioneerPublicApi.Vector2.pool.release(i);
    PioneerPublicApi.Vector3.pool.release(o);
    PioneerPublicApi.Vector3.pool.release(r);
    const a = this._determineComponentVisibility(t);
    const l = PioneerPublicApi.Color.pool.get();
    l.copy(this._color);
    l.a *= a;
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "colorMultiplier", l);
    PioneerPublicApi.Color.pool.release(l);
  }
  _determineComponentVisibility(t) {
    const e = this.getEntity().getCameraSpacePosition(t);
    let i = 1;
    i *= this.getVisibleInterval().getFadeMultiplier(this.getEntity(), t);
    t.isPositionOccluded(e) && (i = 0);
    return i;
  }
  async __loadResources() {
    LabelComponent._threeJsGeometry || (LabelComponent._threeJsGeometry = PioneerPublicApi.ThreeJsHelper.createGeometry([{
      name: "position",
      dimensions: 3
    }, {
      name: "uv",
      dimensions: 2
    }], false), PioneerPublicApi.ThreeJsHelper.setVertices(LabelComponent._threeJsGeometry, "position", new Float32Array([0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0])), PioneerPublicApi.ThreeJsHelper.setVertices(LabelComponent._threeJsGeometry, "uv", new Float32Array([0, 1, 1, 1, 1, 0, 0, 0])), PioneerPublicApi.ThreeJsHelper.setIndices(LabelComponent._threeJsGeometry, new Uint16Array([0, 1, 2, 2, 3, 0])));
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
    const t = LabelComponent._threeJsMaterial.clone();
    this.getThreeJsMaterials().push(t);
    PioneerPublicApi.ThreeJsHelper.setTransparent(t, true);
    PioneerPublicApi.ThreeJsHelper.setOverlay(t, true);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(t, "colorMultiplier", this._color);
    const e = PioneerPublicApi.ThreeJsHelper.createMeshObjectGivenGeometry(this, t, LabelComponent._threeJsGeometry);
    this.getThreeJsObjects().push(e);
    this._canvas = document.createElement("canvas");
    this._canvas.width = 1;
    this._canvas.height = 1;
    this._updateText();
  }
  __unloadResources() {
    LabelComponent._useCount -= 1;
    0 === LabelComponent._useCount && (LabelComponent._threeJsGeometry && (PioneerPublicApi.ThreeJsHelper.destroyGeometry(LabelComponent._threeJsGeometry), LabelComponent._threeJsGeometry = null), LabelComponent._threeJsMaterial && (PioneerPublicApi.ThreeJsHelper.destroyMaterial(LabelComponent._threeJsMaterial, true), LabelComponent._threeJsMaterial = null));
    const t = this.getThreeJsObjects()[0];
    null !== t.parent && t.parent.remove(t);
    PioneerPublicApi.ThreeJsHelper.destroyMaterial(this.getThreeJsMaterials()[0], true);
    this._canvas = null;
  }
  _updateText() {
    if (null === this._canvas) return;
    const t = this._canvas.getContext("2d");
    if (!t) return;
    this._devicePixelRatio = window.devicePixelRatio;
    t.font = `${this._fontSize}px ${this._fontFamily}`;
    const e = t.measureText(this._text);
    this._pixelSize.set(e.width * this._devicePixelRatio, this._fontSize * this._devicePixelRatio);
    const i = PioneerPublicApi.MathUtils.ceilPow2(this._pixelSize.x);
    const n = PioneerPublicApi.MathUtils.ceilPow2(this._pixelSize.y);
    i === this._canvas.width && n === this._canvas.height || (this._canvas.width = i, this._canvas.height = n);
    t.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._canvas.style.width = i / this._devicePixelRatio + "px";
    this._canvas.style.height = n / this._devicePixelRatio + "px";
    t.font = `${this._pixelSize.y}px ${this._fontFamily}`;
    t.fillStyle = "rgba(255, 255, 255, 255)";
    t.fillText(this._text, (this._canvas.width - this._pixelSize.x) * PioneerPublicApi.MathUtils.clamp01(this._alignment.x), this._canvas.height - .1875 * this._pixelSize.y - (this._canvas.height - this._pixelSize.y) * PioneerPublicApi.MathUtils.clamp01(this._alignment.y));
    const o = this.getThreeJsMaterials()[0];
    PioneerPublicApi.ThreeJsHelper.setUniformTexture(o, "colorTexture", PioneerPublicApi.ThreeJsHelper.loadTextureFromCanvas(this._canvas));
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
