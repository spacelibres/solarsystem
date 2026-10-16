// Recovered from app.js:198607-202549.
/* 缓存保存原材质及 useCount，每次 get/getPreloaded 返回克隆并登记反向来源；release 只降低已登记克隆的引用计数，计数归零才销毁缓存原材质。预加载材质额外持有一个引用；shader 描述的扩展前缀会原地写回 code，保留此既存行为。 */
import * as PioneerPublicApi from "../pioneer/public-api.js";
import * as BasicAlphaShader from "../core/BasicAlphaShader.js";
import * as BasicShader from "../core/BasicShader.js";
import * as ConnectedSpriteShader from "../core/ConnectedSpriteShader.js";
import * as LineShader from "../core/LineShader.js";
import * as PlumesShader from "../core/PlumesShader.js";
import * as SpriteParticlesShader from "../core/SpriteParticlesShader.js";
import * as SpriteShader from "../core/SpriteShader.js";
import * as TrailShader from "../core/TrailShader.js";
import * as assertIsShader from "../core/assertIsShader.js";
class Resource {
  value;
  useCount;
  constructor(value) {
    this.value = value;
    this.useCount = 0;
  }
}
class MaterialManager {
  constructor(downloader) {
    this._downloader = downloader;
    this._cache = new Map();
    this._clonedMaterials = new Map();
    this._promises = new Map();
    this._preload();
  }
  async get(materialUrl, priority) {
    let resource = this._cache.get(materialUrl);
    if (void 0 === resource) {
      const pendingLoad = this._promises.get(materialUrl);
      void 0 !== pendingLoad && (resource = await pendingLoad);
    }
    if (void 0 === resource) {
      const downloadedText = await this._downloader.download(materialUrl, "text", priority);
      const shaderInfo = JSON.parse(downloadedText.content);
      (0, assertIsShader.assertIsShader)(shaderInfo);
      resource = new Resource(this._load(materialUrl, shaderInfo));
      this._cache.set(materialUrl, resource);
    }
    resource.useCount += 1;
    const materialClone = PioneerPublicApi.ThreeJsHelper.cloneMaterial(resource.value);
    this._clonedMaterials.set(materialClone, materialUrl);
    return materialClone;
  }
  getPreloaded(materialName) {
    const resource = this._cache.get(materialName);
    if (void 0 === resource) throw new Error(`Invalid pre-loaded material "${materialName}".`);
    resource.useCount += 1;
    const materialClone = PioneerPublicApi.ThreeJsHelper.cloneMaterial(resource.value);
    this._clonedMaterials.set(materialClone, materialName);
    return materialClone;
  }
  release(materialClone) {
    const materialName = this._clonedMaterials.get(materialClone);
    if (void 0 === materialName) return;
    this._clonedMaterials.delete(materialClone);
    const resource = this._cache.get(materialName);
    resource && (resource.useCount -= 1, 0 === resource.useCount && (PioneerPublicApi.ThreeJsHelper.destroyMaterial(resource.value, true), this._cache.delete(materialName)));
  }
  _preload() {
    const map = new Map();
    map.set("basic", BasicShader.BasicShader);
    map.set("basic_alpha", BasicAlphaShader.BasicAlphaShader);
    map.set("connected_sprite", ConnectedSpriteShader.ConnectedSpriteShader);
    map.set("line", LineShader.LineShader);
    map.set("plumes", PlumesShader.PlumesShader);
    map.set("sprite", SpriteShader.SpriteShader);
    map.set("sprite_particles", SpriteParticlesShader.SpriteParticlesShader);
    map.set("trail", TrailShader.TrailShader);
    for (const [materialName, shaderInfo] of map) {
      const material = this._load(materialName, shaderInfo);
      const resource = new Resource(material);
      resource.useCount += 1;
      this._cache.set(materialName, resource);
    }
  }
  _load(materialName, shaderInfo) {
    try {
      const uniforms = {};
      for (const [uniformName, uniformType] of Object.entries(shaderInfo.uniforms)) ["modelMatrix", "modelViewMatrix", "projectionMatrix", "viewMatrix", "normalMatrix", "cameraPosition"].includes(uniformName) || (uniforms[uniformName] = new PioneerPublicApi.THREE.Uniform(this._getUniformValueFromType(uniformType)));
      let transparent = false;
      let depthWrite = true;
      let faceSide = PioneerPublicApi.THREE.FrontSide;
      let blendingMode = PioneerPublicApi.THREE.NoBlending;
      if (shaderInfo.properties) {
        switch (true === shaderInfo.properties.transparent && (transparent = true), false === shaderInfo.properties.depthWrite && (depthWrite = false), shaderInfo.properties.side) {
          case "front":
            faceSide = PioneerPublicApi.THREE.FrontSide;
            break;
          case "back":
            faceSide = PioneerPublicApi.THREE.BackSide;
            break;
          case "double":
            faceSide = PioneerPublicApi.THREE.DoubleSide;
        }
        switch (shaderInfo.properties.blending) {
          case "normal":
            blendingMode = PioneerPublicApi.THREE.NormalBlending;
            break;
          case "additive":
            blendingMode = PioneerPublicApi.THREE.AdditiveBlending;
            break;
          case "subtractive":
            blendingMode = PioneerPublicApi.THREE.SubtractiveBlending;
            break;
          case "multiply":
            blendingMode = PioneerPublicApi.THREE.MultiplyBlending;
            break;
          case "custom":
            blendingMode = PioneerPublicApi.THREE.CustomBlending;
        }
      }
      if (shaderInfo.vertex.extensions) {
        let vertexPreamble = "";
        for (const extensionName of shaderInfo.vertex.extensions) PioneerPublicApi.Capabilities.hasGLExtension(extensionName) && (vertexPreamble += `#extension GL_${extensionName}: enable\n`);
        for (const extensionName of shaderInfo.vertex.extensions) PioneerPublicApi.Capabilities.hasGLExtension(extensionName) && (vertexPreamble += `#define L_${extensionName} true\n`);
        shaderInfo.vertex.code = vertexPreamble + shaderInfo.vertex.code;
      }
      if (shaderInfo.fragment.extensions) {
        let fragmentPreamble = "";
        for (const extensionName of shaderInfo.fragment.extensions) PioneerPublicApi.Capabilities.hasGLExtension(extensionName) && (fragmentPreamble += `#extension GL_${extensionName}: enable\n`);
        for (const extensionName of shaderInfo.fragment.extensions) PioneerPublicApi.Capabilities.hasGLExtension(extensionName) && (fragmentPreamble += `#define L_${extensionName} true\n`);
        shaderInfo.fragment.code = fragmentPreamble + shaderInfo.fragment.code;
      }
      const rawShaderMaterial = new PioneerPublicApi.THREE.RawShaderMaterial({
        uniforms: uniforms,
        vertexShader: shaderInfo.vertex.code,
        fragmentShader: shaderInfo.fragment.code,
        glslVersion: PioneerPublicApi.THREE.GLSL3,
        depthWrite: depthWrite,
        transparent: transparent,
        side: faceSide,
        blending: blendingMode
      });
      rawShaderMaterial.needsUpdate = true;
      return rawShaderMaterial;
    } catch (materialError) {
      throw materialError instanceof Error && (materialError.message = `While processing material "${materialName}": ${materialError.message}`), materialError;
    }
  }
  _getUniformValueFromType(typeDeclaration) {
    const typeName = typeDeclaration.replace(/.* /u, "");
    switch (typeName) {
      case "int":
      case "float":
        return 0;
      case "ivec2":
      case "vec2":
        return new PioneerPublicApi.THREE.Vector2(0, 0);
      case "ivec3":
      case "vec3":
        return new PioneerPublicApi.THREE.Vector3(0, 0, 0);
      case "ivec4":
      case "vec4":
        return new PioneerPublicApi.THREE.Vector4(0, 0, 0, 0);
      case "mat3":
        return new PioneerPublicApi.THREE.Matrix3();
      case "mat4":
        return new PioneerPublicApi.THREE.Matrix4();
      case "sampler2D":
      case "samplerCube":
        return null;
    }
    if (typeName.endsWith("]")) {
      const arrayStart = typeName.indexOf("[");
      const arrayEnd = typeName.indexOf("]");
      const elementType = typeName.substring(0, arrayStart);
      const elementCount = Number.parseInt(typeName.substring(arrayStart + 1, arrayEnd));
      const uniformValues = [];
      for (let elementIndex = 0; elementIndex < elementCount; elementIndex++) uniformValues.push(this._getUniformValueFromType(elementType));
      return uniformValues;
    }
    throw new Error(`Unrecognized type: ${typeName}.`);
  }
  _downloader;
  _cache;
  _clonedMaterials;
  _promises;
}
export { MaterialManager };
