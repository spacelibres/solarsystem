/** @eyes-analysis
 * 文件职责：载入图像纹理并渲染面向相机的可缩放精灵。
 * 依据：import ../pioneer/public-api.js；SpriteComponent extends PioneerPublicApi.BaseComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:415157-421560.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：载入图像纹理并渲染面向相机的可缩放精灵。
 * 继承：PioneerPublicApi.BaseComponent；导出：SpriteComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class SpriteComponent extends PioneerPublicApi.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_alignment`、`_billboard`、`_blending`、`_colorMultiplier`、`_renderOrder`、`_size`、`_sizeUnits`、`_textureUrl`；调用 `new PioneerPublicApi.Color`、`new PioneerPublicApi.Vector2`、`super`。
   * 状态写入：_alignment、_billboard、_blending、_colorMultiplier、_renderOrder、_size、_sizeUnits、_textureUrl等；完整记录见索引。
   * 调用线索：new PioneerPublicApi.Color、new PioneerPublicApi.Vector2、super。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `this._textureUrl`。
   */
  getTextureUrl() {
    return this._textureUrl;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_textureUrl`；调用 `this.resetResources`。
   * 状态写入：_textureUrl。
   * 调用线索：this.resetResources。
   */
  setTextureUrl(textureUrl) {
    this._textureUrl = textureUrl;
    this.resetResources();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._size`。
   */
  getSize() {
    return this._size;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._size.copy`、`this._updateSizeUniform`。
   * 调用线索：this._size.copy、this._updateSizeUniform。
   */
  setSize(t) {
    this._size.copy(t);
    this._updateSizeUniform();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._sizeUnits`。
   */
  getSizeUnits() {
    return this._sizeUnits;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_sizeUnits`；调用 `this._updateSizeUniform`。
   * 状态写入：_sizeUnits。
   * 调用线索：this._updateSizeUniform。
   */
  setSizeUnits(sizeUnits) {
    this._sizeUnits = sizeUnits;
    this._updateSizeUniform();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._colorMultiplier`。
   */
  getColorMultiplier() {
    return this._colorMultiplier;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA`、`this._colorMultiplier.copy`、`this.getThreeJsMaterials`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA、this._colorMultiplier.copy、this.getThreeJsMaterials。
   */
  setColorMultiplier(t) {
    this._colorMultiplier.copy(t);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "colorMultiplier", t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._alignment`。
   */
  getAlignment() {
    return this._alignment;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformVector2`、`this._alignment.copy`、`this.getThreeJsMaterials`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setUniformVector2、this._alignment.copy、this.getThreeJsMaterials。
   */
  setAlignment(t) {
    this._alignment.copy(t);
    PioneerPublicApi.ThreeJsHelper.setUniformVector2(this.getThreeJsMaterials()[0], "origin", this._alignment);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._billboard`。
   */
  isBillboard() {
    return this._billboard;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_billboard`。
   * 状态写入：_billboard。
   */
  setBillboard(billboard) {
    this._billboard = billboard;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._transparent`。
   */
  getTransparent() {
    return this._transparent;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_transparent`；调用 `PioneerPublicApi.ThreeJsHelper.setTransparent`、`this.getThreeJsMaterials`。
   * 状态写入：_transparent。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setTransparent、this.getThreeJsMaterials。
   */
  setTransparent(transparent) {
    this._transparent = transparent;
    PioneerPublicApi.ThreeJsHelper.setTransparent(this.getThreeJsMaterials()[0], this._transparent);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_blending`；调用 `PioneerPublicApi.ThreeJsHelper.setBlending`、`this.getThreeJsMaterials`。
   * 状态写入：_blending。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setBlending、this.getThreeJsMaterials。
   */
  setBlending(blending) {
    this._blending = blending;
    PioneerPublicApi.ThreeJsHelper.setBlending(this.getThreeJsMaterials()[0], this._blending);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._renderOrder`。
   */
  getRenderOrder() {
    return this._renderOrder;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_renderOrder`；调用 `PioneerPublicApi.ThreeJsHelper.setRenderOrder`、`this.getThreeJsObjects`。
   * 状态写入：_renderOrder。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setRenderOrder、this.getThreeJsObjects。
   */
  setRenderOrder(renderOrder) {
    this._renderOrder = renderOrder;
    PioneerPublicApi.ThreeJsHelper.setRenderOrder(this.getThreeJsObjects()[0], this._renderOrder);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setOrientationToBillboard`、`PioneerPublicApi.ThreeJsHelper.setOrientationToEntity`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`PioneerPublicApi.ThreeJsHelper.setUniformVector2`、`PioneerPublicApi.Vector2.pool.get`、`PioneerPublicApi.Vector2.pool.release`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setOrientationToBillboard、PioneerPublicApi.ThreeJsHelper.setOrientationToEntity、PioneerPublicApi.ThreeJsHelper.setPositionToEntity、PioneerPublicApi.ThreeJsHelper.setUniformVector2、PioneerPublicApi.Vector2.pool.get等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `void this.getEngine().getResourceManager().releaseAllForEntityItem(this)`；调用 `PioneerPublicApi.ThreeJsHelper.createGeometry`、`PioneerPublicApi.ThreeJsHelper.createMeshObjectGivenGeometry`、`PioneerPublicApi.ThreeJsHelper.setBlending`、`PioneerPublicApi.ThreeJsHelper.setIndices`、`PioneerPublicApi.ThreeJsHelper.setRenderOrder`、`PioneerPublicApi.ThreeJsHelper.setTransparent`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.createGeometry、PioneerPublicApi.ThreeJsHelper.createMeshObjectGivenGeometry、PioneerPublicApi.ThreeJsHelper.setBlending、PioneerPublicApi.ThreeJsHelper.setIndices、PioneerPublicApi.ThreeJsHelper.setRenderOrder等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.destroyGeometry`、`PioneerPublicApi.ThreeJsHelper.destroyMaterial`、`t.parent.remove`、`this.getEngine`、`this.getEngine().getResourceManager`、`this.getEngine().getResourceManager().releaseAllForEntityItem`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.destroyGeometry、PioneerPublicApi.ThreeJsHelper.destroyMaterial、t.parent.remove、this.getEngine、this.getEngine().getResourceManager等。
   */
  __unloadResources() {
    this.getEngine().getResourceManager().releaseAllForEntityItem(this);
    PioneerPublicApi.ThreeJsHelper.destroyMaterial(this.getThreeJsMaterials()[0], false);
    const t = this.getThreeJsObjects()[0];
    null !== t.parent && t.parent.remove(t);
    SpriteComponent._useCount -= 1;
    0 === SpriteComponent._useCount && (SpriteComponent._threeJsGeometry && PioneerPublicApi.ThreeJsHelper.destroyGeometry(SpriteComponent._threeJsGeometry), SpriteComponent._threeJsMaterial && PioneerPublicApi.ThreeJsHelper.destroyMaterial(SpriteComponent._threeJsMaterial, false));
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.max`、`Number.isNaN`、`PioneerPublicApi.ThreeJsHelper.setUniformVector2`、`PioneerPublicApi.Vector2.pool.get`、`PioneerPublicApi.Vector2.pool.release`、`n.set`。
   * 调用线索：Math.max、Number.isNaN、PioneerPublicApi.ThreeJsHelper.setUniformVector2、PioneerPublicApi.Vector2.pool.get、PioneerPublicApi.Vector2.pool.release等。
   */
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
