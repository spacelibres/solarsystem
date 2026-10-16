// 连接精灵先把两端局部偏移旋转到相机空间，按远近交换端点以稳定投影；对应交换宽度并反转纹理偏移，像素宽度按各端深度单独换算，纹理重复数由长度与宽高比决定。
// Recovered from app.js:312076-318405.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class ConnectedSpriteComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
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
  setEntity1(entityName) {
    this._entity1.setName(entityName);
  }
  getEntity1Offset() {
    return this._entity1Offset;
  }
  setEntity1Offset(offset) {
    this._entity1Offset.copy(offset);
  }
  getEntity2() {
    return this._entity2.getName();
  }
  setEntity2(entityName) {
    this._entity2.setName(entityName);
  }
  getEntity2Offset() {
    return this._entity2Offset;
  }
  setEntity2Offset(offset) {
    this._entity2Offset.copy(offset);
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
    this._widthUnits = widthUnits;
    if ("loaded" === this.getLoadState().state) {
      const material = this.getThreeJsMaterials()[0];
      material.defines.PIXEL_BASED = "px" === widthUnits;
      material.needsUpdate = true;
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
  setColorMultiplier(color) {
    this._colorMultiplier.copy(color);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "color", this._colorMultiplier, 1);
  }
  setBlending(blending) {
    this._blending = blending;
    PioneerPublicApi.ThreeJsHelper.setBlending(this.getThreeJsMaterials()[0], blending);
  }
  __update() {
    const firstEntity = this._entity1.get();
    const secondEntity = this._entity2.get();
    if (null === firstEntity || null === secondEntity) return;
    const relativePosition = PioneerPublicApi.Vector3.pool.get();
    firstEntity.getPositionRelativeToEntity(relativePosition, PioneerPublicApi.Vector3.Zero, secondEntity);
    this.__setRadius(relativePosition.magnitude() + firstEntity.getExtentsRadius() + secondEntity.getExtentsRadius());
    PioneerPublicApi.Vector3.pool.release(relativePosition);
  }
  // 近端作为网格原点；超长连线裁到近端距离的千倍，以降低深度与投影数值跨度。
  __prepareForRender(camera) {
    const firstEntity = this._entity1.get();
    const secondEntity = this._entity2.get();
    if (null === firstEntity || null === secondEntity) return void this.__setVisible(false);
    const nearPosition = PioneerPublicApi.Vector3.pool.get();
    const farPosition = PioneerPublicApi.Vector3.pool.get();
    const swapPosition = PioneerPublicApi.Vector3.pool.get();
    nearPosition.rotate(firstEntity.getOrientation(), this._entity1Offset);
    nearPosition.add(firstEntity.getCameraSpacePosition(camera), nearPosition);
    farPosition.rotate(secondEntity.getOrientation(), this._entity2Offset);
    farPosition.add(secondEntity.getCameraSpacePosition(camera), farPosition);
    swapPosition.copy(nearPosition);
    nearPosition.lerp(nearPosition, farPosition, this._uOffsetStart);
    farPosition.lerp(swapPosition, farPosition, this._uOffsetEnd);
    let reversed = false;
    if (nearPosition.magnitude() > farPosition.magnitude()) {
      swapPosition.copy(nearPosition);
      nearPosition.copy(farPosition);
      farPosition.copy(swapPosition);
      reversed = true;
    }
    PioneerPublicApi.Vector3.pool.release(swapPosition);
    const axis = PioneerPublicApi.Vector3.pool.get();
    axis.sub(farPosition, nearPosition);
    if (axis.magnitude() / nearPosition.magnitude() > 1e3) {
      axis.setMagnitude(axis, 1e3 * nearPosition.magnitude());
      farPosition.add(nearPosition, axis);
    }
    let nearWidth = reversed ? this._width2 : this._width1;
    let farWidth = reversed ? this._width1 : this._width2;
    if ("px" === this._widthUnits) {
      const viewport = camera.getViewport();
      if (viewport) {
        const cameraForward = PioneerPublicApi.Vector3.pool.get();
        camera.getEntity().getOrientation().getAxis(cameraForward, 1);
        nearWidth = viewport.getNormalSpaceRadiusFromPixelSpaceRadius(nearWidth);
        farWidth = viewport.getNormalSpaceRadiusFromPixelSpaceRadius(farWidth);
        nearWidth = camera.getRadiusFromNormalSpaceRadius(nearWidth, nearPosition.dot(cameraForward));
        farWidth = camera.getRadiusFromNormalSpaceRadius(farWidth, farPosition.dot(cameraForward));
        PioneerPublicApi.Vector3.pool.release(cameraForward);
      }
    }
    let repeatAmount = 1 / this._textureStretch;
    if ("px" === this._widthUnits) {
      const viewport = camera.getViewport();
      if (viewport && this._textureRepeat) {
        const firstPixelPosition = PioneerPublicApi.Vector2.pool.get();
        const secondPixelPosition = PioneerPublicApi.Vector2.pool.get();
        const firstNormalPosition = PioneerPublicApi.Vector3.pool.get();
        const secondNormalPosition = PioneerPublicApi.Vector3.pool.get();
        camera.getNormalSpacePositionFromCameraSpacePosition(firstNormalPosition, nearPosition);
        camera.getNormalSpacePositionFromCameraSpacePosition(secondNormalPosition, farPosition);
        viewport.getPixelSpacePositionFromNormalSpacePosition(firstPixelPosition, firstNormalPosition);
        viewport.getPixelSpacePositionFromNormalSpacePosition(secondPixelPosition, secondNormalPosition);
        const pixelDelta = PioneerPublicApi.Vector2.pool.get();
        pixelDelta.sub(firstPixelPosition, secondPixelPosition);
        if (pixelDelta.isNaN()) {
          const viewportBounds = viewport.getBounds();
          pixelDelta.x = viewportBounds.size.x * (secondNormalPosition.x - firstNormalPosition.x) / 2;
          pixelDelta.y = viewportBounds.size.y * (secondNormalPosition.y - firstNormalPosition.y) / 2;
        }
        repeatAmount *= pixelDelta.magnitude() / Math.max(this._width1, this._width2) * this._textureAspectRatio;
        PioneerPublicApi.Vector2.pool.release(pixelDelta);
        PioneerPublicApi.Vector2.pool.release(firstPixelPosition);
        PioneerPublicApi.Vector2.pool.release(secondPixelPosition);
        PioneerPublicApi.Vector3.pool.release(firstNormalPosition);
        PioneerPublicApi.Vector3.pool.release(secondNormalPosition);
      }
    } else if (this._textureRepeat) {
      repeatAmount *= axis.magnitude() / Math.max(this._width1, this._width2) * this._textureAspectRatio;
    }
    PioneerPublicApi.ThreeJsHelper.setPosition(this.getThreeJsObjects(), nearPosition);
    PioneerPublicApi.ThreeJsHelper.setUniformVector3(this.getThreeJsMaterials()[0], "vAxis", axis);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "width1", nearWidth);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "width2", farWidth);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "textureYOffset", this._textureYOffset * (reversed ? -1 : 1));
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[0], "repeatAmount", repeatAmount);
    PioneerPublicApi.Vector3.pool.release(nearPosition);
    PioneerPublicApi.Vector3.pool.release(farPosition);
    PioneerPublicApi.Vector3.pool.release(axis);
  }
  async __loadResources() {
    const texture = await this.getEngine().getResourceManager().acquire(this, this._textureUrl, "texture", -this.getEntity().getLeastCameraDepth());
    texture.wrapT = PioneerPublicApi.THREE.RepeatWrapping;
    const image = texture.image;
    this._textureAspectRatio = image.width / image.height;
    if ("loading" !== this.getLoadState().state) return void this.getEngine().getResourceManager().releaseAllForEntityItem(this);
    const material = this.getEntity().getScene().getEngine().getMaterialManager().getPreloaded("connected_sprite");
    this.getThreeJsMaterials().push(material);
    PioneerPublicApi.ThreeJsHelper.setBlending(this.getThreeJsMaterials()[0], this._blending);
    PioneerPublicApi.ThreeJsHelper.setDefine(material, "PIXEL_BASED", "px" === this._widthUnits);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(material, "color", this._colorMultiplier, 1);
    PioneerPublicApi.ThreeJsHelper.setUniformTexture(material, "colorTexture", texture);
    const mesh = PioneerPublicApi.ThreeJsHelper.createMeshObject(this, material, [{
      name: "position",
      dimensions: 3
    }], false);
    this.getThreeJsObjects().push(mesh);
    PioneerPublicApi.ThreeJsHelper.setVertices(mesh.geometry, "position", new Float32Array([-1, -1, 0, 1, -1, 0, -1, -1, 1, 1, -1, 1]));
    PioneerPublicApi.ThreeJsHelper.setIndices(mesh.geometry, new Uint16Array([0, 2, 3, 3, 1, 0]));
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
