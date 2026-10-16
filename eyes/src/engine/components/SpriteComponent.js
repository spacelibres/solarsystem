// Sprite 共享静态四边形和材质模板，每实例克隆材质并由 ResourceManager 持有纹理；尺寸缺一轴时按纹理宽高比补齐，像素单位在逐相机渲染时转换成空间尺寸。
// Recovered from app.js:415157-421560.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class SpriteComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
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
  setSize(size) {
    this._size.copy(size);
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
  setColorMultiplier(color) {
    this._colorMultiplier.copy(color);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(this.getThreeJsMaterials()[0], "colorMultiplier", color);
  }
  getAlignment() {
    return this._alignment;
  }
  setAlignment(alignment) {
    this._alignment.copy(alignment);
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
  __prepareForRender(camera) {
    if ("pixels" === this._sizeUnits) {
      const worldSize = PioneerPublicApi.Vector2.pool.get();
      const kilometersPerPixel = this.getEntity().getExtentsRadius() / this.getEntity().getPixelSpaceExtentsRadius(camera);
      worldSize.mult(this._size, kilometersPerPixel);
      PioneerPublicApi.ThreeJsHelper.setUniformVector2(this.getThreeJsMaterials()[0], "size", worldSize);
      PioneerPublicApi.Vector2.pool.release(worldSize);
    }
    if (this.getThreeJsObjects().length > 0) {
      if (this._billboard) {
        PioneerPublicApi.ThreeJsHelper.setOrientationToBillboard(this.getThreeJsObjects()[0], camera);
      } else {
        PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity());
      }
    }
    const fadeMultiplier = this.getVisibleInterval().getFadeMultiplier(this.getEntity(), camera);
    this.setAlphaFadeMultiplier(fadeMultiplier);
    PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), camera);
  }
  async __loadResources() {
    const texture = await this.getEngine().getResourceManager().acquire(this, this._textureUrl, "texture", -this.getEntity().getLeastCameraDepth());
    if ("loading" !== this.getLoadState().state) return void this.getEngine().getResourceManager().releaseAllForEntityItem(this);
    if (!SpriteComponent._threeJsGeometry) {
      SpriteComponent._threeJsGeometry = PioneerPublicApi.ThreeJsHelper.createGeometry([{
        name: "position",
        dimensions: 3
      }, {
        name: "uv",
        dimensions: 2
      }], false);
      PioneerPublicApi.ThreeJsHelper.setVertices(SpriteComponent._threeJsGeometry, "position", new Float32Array([0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0]));
      PioneerPublicApi.ThreeJsHelper.setVertices(SpriteComponent._threeJsGeometry, "uv", new Float32Array([0, 1, 1, 1, 1, 0, 0, 0]));
      PioneerPublicApi.ThreeJsHelper.setIndices(SpriteComponent._threeJsGeometry, new Uint16Array([0, 1, 2, 2, 3, 0]));
    }
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
    const material = SpriteComponent._threeJsMaterial.clone();
    this.getThreeJsMaterials().push(material);
    PioneerPublicApi.ThreeJsHelper.setTransparent(material, this._transparent);
    PioneerPublicApi.ThreeJsHelper.setBlending(material, this._blending);
    PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA(material, "colorMultiplier", this._colorMultiplier);
    PioneerPublicApi.ThreeJsHelper.setUniformNumber(material, "alphaMultiplier", 1);
    PioneerPublicApi.ThreeJsHelper.setUniformVector2(material, "origin", this._alignment);
    PioneerPublicApi.ThreeJsHelper.setUniformTexture(material, "colorTexture", texture);
    const mesh = PioneerPublicApi.ThreeJsHelper.createMeshObjectGivenGeometry(this, material, SpriteComponent._threeJsGeometry);
    this.getThreeJsObjects().push(mesh);
    PioneerPublicApi.ThreeJsHelper.setRenderOrder(mesh, this._renderOrder);
    this._updateSizeUniform();
  }
  // 实例只销毁 clone 材质并归还纹理；共享模板与几何在最后一个使用者退出时销毁。
  __unloadResources() {
    this.getEngine().getResourceManager().releaseAllForEntityItem(this);
    PioneerPublicApi.ThreeJsHelper.destroyMaterial(this.getThreeJsMaterials()[0], false);
    const mesh = this.getThreeJsObjects()[0];
    if (null !== mesh.parent) {
      mesh.parent.remove(mesh);
    }
    SpriteComponent._useCount -= 1;
    if (0 === SpriteComponent._useCount) {
      if (SpriteComponent._threeJsGeometry) {
        PioneerPublicApi.ThreeJsHelper.destroyGeometry(SpriteComponent._threeJsGeometry);
      }
      if (SpriteComponent._threeJsMaterial) {
        PioneerPublicApi.ThreeJsHelper.destroyMaterial(SpriteComponent._threeJsMaterial, false);
      }
    }
  }
  _updateSizeUniform() {
    if (this.getThreeJsMaterials().length > 0) {
      const texture = this.getThreeJsMaterials()[0].uniforms.colorTexture.value;
      if (null !== texture) {
        const image = texture.image;
        const aspectRatio = image.width / image.height;
        const resolvedSize = PioneerPublicApi.Vector2.pool.get();
        if (Number.isNaN(this._size.x)) {
          resolvedSize.set(this._size.y * aspectRatio, this._size.y);
        } else {
          if (Number.isNaN(this._size.y)) {
            resolvedSize.set(this._size.x, this._size.x / aspectRatio);
          } else {
            resolvedSize.set(this._size.x, this._size.y);
          }
        }
        PioneerPublicApi.ThreeJsHelper.setUniformVector2(this.getThreeJsMaterials()[0], "size", resolvedSize);
        if ("km" === this._sizeUnits) {
          this.__setRadius(Math.max(resolvedSize.x, resolvedSize.y));
        } else {
          this.__setRadius(Number.POSITIVE_INFINITY);
        }
        PioneerPublicApi.Vector2.pool.release(resolvedSize);
      }
    } else if ("km" === this._sizeUnits) {
      if (Number.isNaN(this._size.x) || Number.isNaN(this._size.y)) {
        this.__setRadius(this._size.y);
      } else {
        this.__setRadius(Math.max(this._size.x, this._size.y));
      }
    } else {
      this.__setRadius(Number.POSITIVE_INFINITY);
    }
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
