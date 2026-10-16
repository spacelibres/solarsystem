// Recovered from app.js:415157-421560.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class SpriteComponent extends PioneerPublicApi.BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._textureUrl = "";
    this._size = new PioneerPublicApi.Vector2(1, Number.NaN);
    this._sizeUnits = "km";
    this._colorMultiplier = new PioneerPublicApi.Color(1, 1, 1, 1);
    this._alignment = new PioneerPublicApi.Vector2(.5, .5);
    this._transparent = false;
    this._blending = "normal";
    this._billboard = false;
    this._renderOrder = 0;
  }
  getTextureUrl() {
    return this._textureUrl;
  }
  setTextureUrl(textureUrl) {
    this._textureUrl = textureUrl;
    this.resetResources();
  }
  getSize() {
    return this._size;
  }
  setSize(t) {
    this._size.copy(t);
    this._updateSizeUniform();
  }
  getSizeUnits() {
    return this._sizeUnits;
  }
  setSizeUnits(sizeUnits) {
    this._sizeUnits = sizeUnits;
    this._updateSizeUniform();
  }
  getColorMultiplier() {
    return this._colorMultiplier;
  }
  setColorMultiplier(t) {
    this._colorMultiplier.copy(t);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "colorMultiplier", t);
  }
  getAlignment() {
    return this._alignment;
  }
  setAlignment(t) {
    this._alignment.copy(t);
    PioneerPublicApi.ThreeJsHelper.setUniformVector2(this.getThreeJsMaterials()[0], "origin", this._alignment);
  }
  isBillboard() {
    return this._billboard;
  }
  setBillboard(billboard) {
    this._billboard = billboard;
  }
  getTransparent() {
    return this._transparent;
  }
  setTransparent(transparent) {
    this._transparent = transparent;
    PioneerPublicApi.ThreeJsHelper.setTransparent(this.getThreeJsMaterials()[0], this._transparent);
  }
  setBlending(blending) {
    this._blending = blending;
    PioneerPublicApi.ThreeJsHelper.setBlending(this.getThreeJsMaterials()[0], this._blending);
  }
  getRenderOrder() {
    return this._renderOrder;
  }
  setRenderOrder(renderOrder) {
    this._renderOrder = renderOrder;
    PioneerPublicApi.ThreeJsHelper.setRenderOrder(this.getThreeJsObjects()[0], this._renderOrder);
  }
  __prepareForRender(t) {
    if ("pixels" === this._sizeUnits) {
      const e = PioneerPublicApi.Vector2.pool.get();
      const i = this.getEntity().getExtentsRadius() / this.getEntity().getPixelSpaceExtentsRadius(t);
      e.mult(this._size, i);
      PioneerPublicApi.ThreeJsHelper.setUniformVector2(this.getThreeJsMaterials()[0], "size", e);
      PioneerPublicApi.Vector2.pool.release(e);
    }
    this.getThreeJsObjects().length > 0 && (this._billboard ? PioneerPublicApi.ThreeJsHelper.setOrientationToBillboard(this.getThreeJsObjects()[0], t) : PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity()));
    const e = this.getVisibleInterval().getFadeMultiplier(this.getEntity(), t);
    this.setAlphaFadeMultiplier(e);
    PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), t);
  }
  async __loadResources() {
    const t = await this.getEngine().getResourceManager().acquire(this, this._textureUrl, "texture", -this.getEntity().getLeastCameraDepth());
    if ("loading" !== this.getLoadState().state) return void this.getEngine().getResourceManager().releaseAllForEntityItem(this);
    SpriteComponent._threeJsGeometry || (SpriteComponent._threeJsGeometry = PioneerPublicApi.ThreeJsHelper.createGeometry([{
      name: "position",
      dimensions: 3
    }, {
      name: "uv",
      dimensions: 2
    }], false), PioneerPublicApi.ThreeJsHelper.setVertices(SpriteComponent._threeJsGeometry, "position", new Float32Array([0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0])), PioneerPublicApi.ThreeJsHelper.setVertices(SpriteComponent._threeJsGeometry, "uv", new Float32Array([0, 1, 1, 1, 1, 0, 0, 0])), PioneerPublicApi.ThreeJsHelper.setIndices(SpriteComponent._threeJsGeometry, new Uint16Array([0, 1, 2, 2, 3, 0])));
    SpriteComponent._threeJsMaterial ??= new PioneerPublicApi.THREE.ShaderMaterial({
      uniforms: {
        colorMultiplier: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector4(1, 1, 1, 1)),
        alphaMultiplier: new PioneerPublicApi.THREE.Uniform(1),
        size: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector2(1, 1)),
        colorTexture: new PioneerPublicApi.THREE.Uniform(null),
        origin: new PioneerPublicApi.THREE.Uniform(new PioneerPublicApi.THREE.Vector2(0, 0)),
        ...PioneerPublicApi.ShaderChunkLogDepth.ThreeUniforms
      },
      vertexShader: `\n\t\t\t\tuniform vec2 size;\n\t\t\t\tuniform vec2 origin;\n\t\t\t\tout vec2 fUV;\n\n\t\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.VertexHead}\n\n\t\t\t\tvoid main() {\n\t\t\t\t\tvec4 viewPosition = modelViewMatrix * vec4((position.x - origin.x) * size.x, (position.y - origin.y) * size.y, 0.0, 1.0);\n\t\t\t\t\tgl_Position = projectionMatrix * viewPosition;\n\t\t\t\t\tfUV = uv;\n\n\t\t\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.Vertex}\n\t\t\t\t}`,
      fragmentShader: `\n\t\t\t\tprecision highp float;\n\n\t\t\t\tuniform vec4 colorMultiplier;\n\t\t\t\tuniform float alphaMultiplier;\n\t\t\t\tuniform sampler2D colorTexture;\n\t\t\t\tin vec2 fUV;\n\n\t\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.FragmentHead}\n\n\t\t\t\tvoid main(void) {\n\t\t\t\t\tpc_fragColor = texture(colorTexture, fUV);\n\t\t\t\t\tpc_fragColor *= colorMultiplier;\n\t\t\t\t\tpc_fragColor.a *= alphaMultiplier;\n\n\t\t\t\t\t${PioneerPublicApi.ShaderChunkLogDepth.Fragment}\n\t\t\t\t}`,
      side: PioneerPublicApi.THREE.DoubleSide
    });
    SpriteComponent._useCount += 1;
    const e = SpriteComponent._threeJsMaterial.clone();
    this.getThreeJsMaterials().push(e);
    PioneerPublicApi.ThreeJsHelper.setTransparent(e, this._transparent);
    PioneerPublicApi.ThreeJsHelper.setBlending(e, this._blending);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(e, "colorMultiplier", this._colorMultiplier);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(e, "alphaMultiplier", 1);
    PioneerPublicApi.ThreeJsHelper.setUniformVector2(e, "origin", this._alignment);
    PioneerPublicApi.ThreeJsHelper.setUniformTexture(e, "colorTexture", t);
    const i = PioneerPublicApi.ThreeJsHelper.createMeshObjectGivenGeometry(this, e, SpriteComponent._threeJsGeometry);
    this.getThreeJsObjects().push(i);
    PioneerPublicApi.ThreeJsHelper.setRenderOrder(i, this._renderOrder);
    this._updateSizeUniform();
  }
  __unloadResources() {
    this.getEngine().getResourceManager().releaseAllForEntityItem(this);
    PioneerPublicApi.ThreeJsHelper.destroyMaterial(this.getThreeJsMaterials()[0], false);
    const t = this.getThreeJsObjects()[0];
    null !== t.parent && t.parent.remove(t);
    SpriteComponent._useCount -= 1;
    0 === SpriteComponent._useCount && (SpriteComponent._threeJsGeometry && PioneerPublicApi.ThreeJsHelper.destroyGeometry(SpriteComponent._threeJsGeometry), SpriteComponent._threeJsMaterial && PioneerPublicApi.ThreeJsHelper.destroyMaterial(SpriteComponent._threeJsMaterial, false));
  }
  _updateSizeUniform() {
    if (this.getThreeJsMaterials().length > 0) {
      const t = this.getThreeJsMaterials()[0].uniforms.colorTexture.value;
      if (null !== t) {
        const e = t.image;
        const i = e.width / e.height;
        const n = PioneerPublicApi.Vector2.pool.get();
        Number.isNaN(this._size.x) ? n.set(this._size.y * i, this._size.y) : Number.isNaN(this._size.y) ? n.set(this._size.x, this._size.x / i) : n.set(this._size.x, this._size.y);
        PioneerPublicApi.ThreeJsHelper.setUniformVector2(this.getThreeJsMaterials()[0], "size", n);
        "km" === this._sizeUnits ? this.__setRadius(Math.max(n.x, n.y)) : this.__setRadius(Number.POSITIVE_INFINITY);
        PioneerPublicApi.Vector2.pool.release(n);
      }
    } else "km" === this._sizeUnits ? Number.isNaN(this._size.x) || Number.isNaN(this._size.y) ? this.__setRadius(this._size.y) : this.__setRadius(Math.max(this._size.x, this._size.y)) : this.__setRadius(Number.POSITIVE_INFINITY);
  }
  _textureUrl;
  _size;
  _sizeUnits;
  _colorMultiplier;
  _alignment;
  _transparent;
  _blending;
  _billboard;
  _renderOrder;
  static _threeJsMaterial = null;
  static _threeJsGeometry = null;
  static _useCount = 0;
}
export { SpriteComponent };
