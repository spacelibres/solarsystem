// Recovered from app.js:312076-318405.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class ConnectedSpriteComponent extends PioneerPublicApi.BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._entity1 = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._entity1Offset = new PioneerPublicApi.Vector3();
    this._entity2 = new PioneerPublicApi.EntityRef(this.getEntity().getScene());
    this._entity2Offset = new PioneerPublicApi.Vector3();
    this._width1 = 1;
    this._width2 = 1;
    this._widthUnits = "km";
    this._textureUrl = "";
    this._textureAspectRatio = 1;
    this._textureRepeat = true;
    this._textureStretch = 1;
    this._textureYOffset = 0;
    this._uOffsetStart = 0;
    this._uOffsetEnd = 1;
    this._colorMultiplier = new PioneerPublicApi.Color(1, 1, 1, 1);
    this._blending = "normal";
  }
  getEntity1() {
    return this._entity1.getName();
  }
  setEntity1(t) {
    this._entity1.setName(t);
  }
  getEntity1Offset() {
    return this._entity1Offset;
  }
  setEntity1Offset(t) {
    this._entity1Offset.copy(t);
  }
  getEntity2() {
    return this._entity2.getName();
  }
  setEntity2(t) {
    this._entity2.setName(t);
  }
  getEntity2Offset() {
    return this._entity2Offset;
  }
  setEntity2Offset(t) {
    this._entity2Offset.copy(t);
  }
  getWidth1() {
    return this._width1;
  }
  getWidth2() {
    return this._width2;
  }
  setWidths(width1, width2) {
    this._width1 = width1;
    this._width2 = width2;
  }
  getWidthUnits() {
    return this._widthUnits;
  }
  setWidthUnits(widthUnits) {
    if (this._widthUnits = widthUnits, "loaded" === this.getLoadState().state) {
      const e = this.getThreeJsMaterials()[0];
      e.defines.PIXEL_BASED = "px" === widthUnits;
      e.needsUpdate = true;
    }
  }
  getTextureUrl() {
    return this._textureUrl;
  }
  setTextureUrl(textureUrl) {
    this._textureUrl = textureUrl;
    this.resetResources();
  }
  getTextureRepeat() {
    return this._textureRepeat;
  }
  setTextureRepeat(textureRepeat) {
    this._textureRepeat = textureRepeat;
  }
  getTextureStretch() {
    return this._textureStretch;
  }
  setTextureStretch(textureStretch) {
    this._textureStretch = textureStretch;
  }
  getTextureYOffset() {
    return this._textureYOffset;
  }
  setTextureYOffset(textureYOffset) {
    this._textureYOffset = textureYOffset;
  }
  getUOffsetStart() {
    return this._uOffsetStart;
  }
  setUOffsetStart(uOffsetStart) {
    this._uOffsetStart = uOffsetStart;
  }
  getUOffsetEnd() {
    return this._uOffsetEnd;
  }
  setUOffsetEnd(uOffsetEnd) {
    this._uOffsetEnd = uOffsetEnd;
  }
  getColorMultiplier() {
    return this._colorMultiplier;
  }
  setColorMultiplier(t) {
    this._colorMultiplier.copy(t);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "color", this._colorMultiplier, 1);
  }
  setBlending(blending) {
    this._blending = blending;
    PioneerPublicApi.ThreeJsHelper.setBlending(this.getThreeJsMaterials()[0], blending);
  }
  __update() {
    const t = this._entity1.get();
    const e = this._entity2.get();
    if (null === t || null === e) return;
    const i = PioneerPublicApi.Vector3.pool.get();
    t.getPositionRelativeToEntity(i, PioneerPublicApi.Vector3.Zero, e);
    this.__setRadius(i.magnitude() + t.getExtentsRadius() + e.getExtentsRadius());
    PioneerPublicApi.Vector3.pool.release(i);
  }
  __prepareForRender(t) {
    const e = this._entity1.get();
    const i = this._entity2.get();
    if (null === e || null === i) return void this.__setVisible(false);
    const n = PioneerPublicApi.Vector3.pool.get();
    const o = PioneerPublicApi.Vector3.pool.get();
    const r = PioneerPublicApi.Vector3.pool.get();
    n.rotate(e.getOrientation(), this._entity1Offset);
    n.add(e.getCameraSpacePosition(t), n);
    o.rotate(i.getOrientation(), this._entity2Offset);
    o.add(i.getCameraSpacePosition(t), o);
    r.copy(n);
    n.lerp(n, o, this._uOffsetStart);
    o.lerp(r, o, this._uOffsetEnd);
    let a = false;
    n.magnitude() > o.magnitude() && (r.copy(n), n.copy(o), o.copy(r), a = true);
    PioneerPublicApi.Vector3.pool.release(r);
    const l = PioneerPublicApi.Vector3.pool.get();
    l.sub(o, n);
    l.magnitude() / n.magnitude() > 1e3 && (l.setMagnitude(l, 1e3 * n.magnitude()), o.add(n, l));
    let c = a ? this._width2 : this._width1;
    let h = a ? this._width1 : this._width2;
    if ("px" === this._widthUnits) {
      const e = t.getViewport();
      if (e) {
        const i = PioneerPublicApi.Vector3.pool.get();
        t.getEntity().getOrientation().getAxis(i, 1);
        c = e.getNormalSpaceRadiusFromPixelSpaceRadius(c);
        h = e.getNormalSpaceRadiusFromPixelSpaceRadius(h);
        c = t.getRadiusFromNormalSpaceRadius(c, n.dot(i));
        h = t.getRadiusFromNormalSpaceRadius(h, o.dot(i));
        PioneerPublicApi.Vector3.pool.release(i);
      }
    }
    let d = 1 / this._textureStretch;
    if ("px" === this._widthUnits) {
      const e = t.getViewport();
      if (e && this._textureRepeat) {
        const i = PioneerPublicApi.Vector2.pool.get();
        const r = PioneerPublicApi.Vector2.pool.get();
        const a = PioneerPublicApi.Vector3.pool.get();
        const l = PioneerPublicApi.Vector3.pool.get();
        t.getNormalSpacePositionFromCameraSpacePosition(a, n);
        t.getNormalSpacePositionFromCameraSpacePosition(l, o);
        e.getPixelSpacePositionFromNormalSpacePosition(i, a);
        e.getPixelSpacePositionFromNormalSpacePosition(r, l);
        const c = PioneerPublicApi.Vector2.pool.get();
        if (c.sub(i, r), c.isNaN()) {
          const t = e.getBounds();
          c.x = t.size.x * (l.x - a.x) / 2;
          c.y = t.size.y * (l.y - a.y) / 2;
        }
        d *= c.magnitude() / Math.max(this._width1, this._width2) * this._textureAspectRatio;
        PioneerPublicApi.Vector2.pool.release(c);
        PioneerPublicApi.Vector2.pool.release(i);
        PioneerPublicApi.Vector2.pool.release(r);
        PioneerPublicApi.Vector3.pool.release(a);
        PioneerPublicApi.Vector3.pool.release(l);
      }
    } else this._textureRepeat && (d *= l.magnitude() / Math.max(this._width1, this._width2) * this._textureAspectRatio);
    PioneerPublicApi.ThreeJsHelper.setPosition(this.getThreeJsObjects(), n);
    PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "vAxis", l);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "width1", c);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "width2", h);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "textureYOffset", this._textureYOffset * (a ? -1 : 1));
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "repeatAmount", d);
    PioneerPublicApi.Vector3.pool.release(n);
    PioneerPublicApi.Vector3.pool.release(o);
    PioneerPublicApi.Vector3.pool.release(l);
  }
  async __loadResources() {
    const t = await this.getEngine().getResourceManager().acquire(this, this._textureUrl, "texture", -this.getEntity().getLeastCameraDepth());
    t.wrapT = PioneerPublicApi.THREE.RepeatWrapping;
    const e = t.image;
    if (this._textureAspectRatio = e.width / e.height, "loading" !== this.getLoadState().state) return void this.getEngine().getResourceManager().releaseAllForEntityItem(this);
    const i = this.getEntity().getScene().getEngine().getMaterialManager().getPreloaded("connected_sprite");
    this.getThreeJsMaterials().push(i);
    PioneerPublicApi.ThreeJsHelper.setBlending(this.getThreeJsMaterials()[0], this._blending);
    PioneerPublicApi.ThreeJsHelper.setDefine(i, "PIXEL_BASED", "px" === this._widthUnits);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(i, "color", this._colorMultiplier, 1);
    PioneerPublicApi.ThreeJsHelper.setUniformTexture(i, "colorTexture", t);
    const n = PioneerPublicApi.ThreeJsHelper.createMeshObject(this, i, [{
      name: "position",
      dimensions: 3
    }], false);
    this.getThreeJsObjects().push(n);
    PioneerPublicApi.ThreeJsHelper.setVertices(n.geometry, "position", new Float32Array([-1, -1, 0, 1, -1, 0, -1, -1, 1, 1, -1, 1]));
    PioneerPublicApi.ThreeJsHelper.setIndices(n.geometry, new Uint16Array([0, 2, 3, 3, 1, 0]));
  }
  __unloadResources() {
    this.getEngine().getResourceManager().releaseAllForEntityItem(this);
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this, false);
  }
  _entity1;
  _entity1Offset;
  _entity2;
  _entity2Offset;
  _width1;
  _width2;
  _widthUnits;
  _textureUrl;
  _textureAspectRatio;
  _textureRepeat;
  _textureStretch;
  _textureYOffset;
  _uOffsetStart;
  _uOffsetEnd;
  _colorMultiplier;
  _blending;
}
export { ConnectedSpriteComponent };
