// 模型组件持有 GLTF 主文件和解码依赖的资源引用。解析后接管场景对象、动画和材质；卸载时归还共享资源并销毁组件拥有的 Three.js 对象。
import { localDecoderUrl } from '../../runtime/decoder-paths.js';
// Recovered from app.js:350460-363613.
import * as PioneerPublicApi from "../pioneer/public-api.js";
import * as GLTFLoader from "../../vendor/modules/GLTFLoader.js";
import * as DRACOLoader from "../../vendor/modules/DRACOLoader.js";
import * as KTX2Loader from "../../vendor/modules/KTX2Loader.js";
class ModelComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
    this._url = "";
    this._shadowEntities = [];
    this._translation = new PioneerPublicApi.Vector3();
    this._rotation = new PioneerPublicApi.Quaternion();
    this._urlReferenceMap = new Map();
    this._threeJsAnimationClips = new Map();
    this._hiddenObjects = new PioneerPublicApi.FastMap();
    this._scale = new PioneerPublicApi.Vector3(.001, .001, .001);
    this._modelRadius = NaN;
    this._environmentCubemapUrl = "";
    this._environmentCylindricalUrl = "";
    this._environmentCubemap = null;
    this._environmentIntensity = .5;
    this._dynamicEnvironmentMapComponent = null;
    this.setVisibleInterval(PioneerPublicApi.VisibleInterval.AlwaysVisible);
    this._onConfigChanged = this._onConfigChanged.bind(this);
    this.__setRadius(this.getEntity().getExtentsRadius());
  }
  getUrl() {
    return this._url;
  }
  setUrl(url) {
    this.resetResources();
    this._modelRadius = NaN;
    this._url = url;
  }
  setHiddenObject(objectName, hidden) {
    if (hidden && !this._hiddenObjects.has(objectName)) {
      this._hiddenObjects.set(objectName, null);
    } else {
      if (!hidden && this._hiddenObjects.has(objectName)) {
        this._hiddenObjects.delete(objectName);
      }
    }
  }
  getTranslation() {
    return this._translation;
  }
  setTranslation(translation) {
    this._translation.copy(translation);
  }
  getScale() {
    return this._scale;
  }
  setScale(scale) {
    if ("number" == typeof scale) {
      this._scale.set(scale, scale, scale);
    } else {
      this._scale.copy(scale);
    }
    PioneerPublicApi.ThreeJsHelper.setScale(this.getThreeJsObjects()[0], this._scale);
    if (isNaN(this._modelRadius)) {
      this.__setRadius(this.getEntity().getExtentsRadius());
    } else {
      this.__setRadius(Math.max(this._scale.x, this._scale.y, this._scale.z) * this._modelRadius);
    }
  }
  getRotation() {
    return this._rotation;
  }
  setRotation(rotation) {
    this._rotation.copy(rotation);
  }
  getEnvironmentCubemapUrl() {
    return this._environmentCubemapUrl;
  }
  setEnvironmentCubemapUrl(environmentCubemapUrl) {
    this._environmentCubemapUrl = environmentCubemapUrl;
  }
  getEnvironmentIntensity() {
    return this._environmentIntensity;
  }
  setEnvironmentIntensity(environmentIntensity) {
    this._environmentIntensity = environmentIntensity;
    for (let materialIndex = 0, materialCount = this.getThreeJsMaterials().length; materialIndex < materialCount; materialIndex++) PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[materialIndex], "environmentIntensity", this._environmentIntensity);
  }
  getEnvironmentCylindricalUrl() {
    return this._environmentCylindricalUrl;
  }
  setEnvironmentCylindricalUrl(environmentCylindricalUrl) {
    this._environmentCylindricalUrl = environmentCylindricalUrl;
  }
  setDynamicEnvironmentMapComponent(dynamicEnvironmentMapComponent) {
    this._dynamicEnvironmentMapComponent = dynamicEnvironmentMapComponent;
    for (let materialIndex = 0, materialCount = this.getThreeJsMaterials().length; materialIndex < materialCount; materialIndex++) {
      const material = this.getThreeJsMaterials()[materialIndex];
      if (void 0 !== material.uniforms.dynEnvTexture) {
        PioneerPublicApi.ThreeJsHelper.setDefine(material, "dynEnvMap", true);
        PioneerPublicApi.ThreeJsHelper.setUniformTexture(material, "dynEnvTexture", this._dynamicEnvironmentMapComponent.getTexture());
        PioneerPublicApi.ThreeJsHelper.setUniformNumber(material, "dynEnvFaceSize", dynamicEnvironmentMapComponent.getFaceSize());
      }
    }
    if (null !== this._environmentCubemap) {
      PioneerPublicApi.ThreeJsHelper.destroyTexture(this._environmentCubemap);
      this._environmentCubemap = null;
    }
  }
  setURLReferenceMap(urlReferences) {
    this._urlReferenceMap.clear();
    for (const urlReference of urlReferences) this._urlReferenceMap.set(urlReference[0], urlReference[1]);
  }
  getAnimationClip(clipName) {
    return this._threeJsAnimationClips.get(clipName) ?? null;
  }
  getMaterial(materialName) {
    const materials = this.getThreeJsMaterials();
    for (let materialIndex = 0, materialCount = materials.length; materialIndex < materialCount; materialIndex++) {
      const material = materials[materialIndex];
      if (material.name === materialName) return material;
    }
    return null;
  }
  updateMaterial(materialName, replacementMaterial) {
    const materials = this.getThreeJsMaterials();
    let previousMaterial;
    for (let materialIndex = 0; materialIndex < materials.length; materialIndex++) {
      const material = materials[materialIndex];
      if (material.name === materialName) {
        previousMaterial = material;
        materials.splice(materialIndex, 1);
        materials.push(replacementMaterial);
        break;
      }
    }
    if (!previousMaterial) throw new Error(`No material with the name ${materialName} was found in ${this}.`);
    for (let objectIndex = 0, objectCount = this.getThreeJsObjects().length; objectIndex < objectCount; objectIndex++) {
      const object = this.getThreeJsObjects()[objectIndex];
      if (object instanceof PioneerPublicApi.THREE.Mesh && object.material === previousMaterial) {
        replacementMaterial.name = materialName;
        previousMaterial = replacementMaterial;
      }
    }
  }
  getNumShadowEntities() {
    return this._shadowEntities.length;
  }
  getShadowEntity(shadowIndex) {
    return this._shadowEntities[shadowIndex]?.getName();
  }
  setShadowEntities(entityNames) {
    this._shadowEntities = [];
    for (const entityName of entityNames) this._shadowEntities.push(new PioneerPublicApi.EntityRef(this.getEntity().getScene(), entityName));
    const hasShadowEntities = entityNames.length > 0;
    for (let materialIndex = 0, materialCount = this.getThreeJsMaterials().length; materialIndex < materialCount; materialIndex++) PioneerPublicApi.ThreeJsHelper.setDefine(this.getThreeJsMaterials()[materialIndex], "shadowEntities", hasShadowEntities);
  }
  __prepareForRender(renderContext) {
    for (let hiddenIndex = 0, hiddenCount = this._hiddenObjects.getSize(); hiddenIndex < hiddenCount; hiddenIndex++) {
      const hiddenEntry = this._hiddenObjects.getAt(hiddenIndex);
      hiddenEntry.value ??= this.getThreeJsObjectByName(hiddenEntry.key);
      if (null !== hiddenEntry.value) {
        hiddenEntry.value.visible = false;
      }
    }
    let fadeMultiplier = 1;
    if (renderContext.getViewport() ?? this.getEntity().getScene().getEngine().getViewportAt(0)) {
      fadeMultiplier *= this.getVisibleInterval().getFadeMultiplier(this.getEntity(), renderContext);
    }
    this.setAlphaFadeMultiplier(fadeMultiplier);
    if (0 === fadeMultiplier) {
      this.__setVisible(false);
    }
    PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), renderContext, this._translation, true);
    PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity(), this._rotation);
    PioneerPublicApi.MaterialUtils.setUniforms(this.getThreeJsMaterials(), renderContext, this.getEntity(), this._shadowEntities, null, false);
  }
  // 主文件下载后检查组件状态，避免已卸载组件继续启动 GLTF 依赖解析。
  async __loadResources() {
    const engine = this.getEntity().getScene().getEngine();
    try {
      if (!this._url.endsWith(".gltf") && !this._url.endsWith(".glb") && !this._url.startsWith("blob:")) throw new Error("Unknown model format.");
      const resourceType = this._url.startsWith("blob:") || this._url.endsWith(".glb") ? "binary" : "text";
      const modelContent = await engine.getResourceManager().acquire(this, this._url, resourceType, -this.getEntity().getLeastCameraDepth());
      if ("loading" !== this.getLoadState().state) return;
      const loadingManager = new PioneerPublicApi.THREE.LoadingManager();
      const priority = -this.getEntity().getLeastCameraDepth();
      const customThreeJsTextureLoader = new CustomThreeJsTextureLoader(this, this._urlReferenceMap, priority, this.getLoadState());
      loadingManager.addHandler(/.$/u, customThreeJsTextureLoader);
      loadingManager.setURLModifier(dependencyUrl => {
        const fileName = dependencyUrl.substring(dependencyUrl.lastIndexOf("/") + 1);
        return this._urlReferenceMap.get(fileName) ?? dependencyUrl;
      });
      if (!ModelComponent._dracoLoader && false !== engine.getConfig().getValue("draco")) {
        ModelComponent._dracoLoader = new CustomDracoLoader(this, priority, this.getLoadState());
        const configuredDecoderPath = engine.getConfig().getValue("dracoPath");
        const decoderPath = engine.getDownloader().processUrl("string" == typeof configuredDecoderPath ? configuredDecoderPath : localDecoderUrl("draco/"));
        ModelComponent._dracoLoader.setDecoderPath(decoderPath);
      }
      const gLTFLoader = new GLTFLoader.GLTFLoader(loadingManager);
      if (ModelComponent._dracoLoader) {
        gLTFLoader.setDRACOLoader(ModelComponent._dracoLoader);
      }
      const customThreeJsKTX2Loader = new CustomThreeJsKTX2Loader(customThreeJsTextureLoader);
      gLTFLoader.setKTX2Loader(customThreeJsKTX2Loader);
      await new Promise((resolve, reject) => {
        const modelUrl = engine.getDownloader().processUrl(this._url);
        gLTFLoader.parse(modelContent, PioneerPublicApi.THREE.LoaderUtils.extractUrlBase(modelUrl), gltf => {
          if ("failed" === this.getLoadState().state) throw new Error(this.getLoadState().error);
          const scene = gltf.scene;
          this._populateThreeJsObjectsAndMaterials(gltf.scene);
          if ("loading" !== this.getLoadState().state) {
            PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
          }
          this._clean();
          PioneerPublicApi.ThreeJsHelper.setupObject(this, scene);
          PioneerPublicApi.ThreeJsHelper.setScale(scene, this._scale);
          const bounds = new PioneerPublicApi.THREE.Box3().setFromObject(scene);
          this._modelRadius = Math.max(bounds.min.length(), bounds.max.length());
          this.__setRadius(Math.max(this._scale.x, this._scale.y, this._scale.z) * this._modelRadius);
          for (let animationIndex = 0; animationIndex < gltf.animations.length; animationIndex++) {
            const clip = gltf.animations[animationIndex];
            this._threeJsAnimationClips.set(clip.name, clip);
          }
          let environmentRequest = Promise.resolve();
          if (null === this._dynamicEnvironmentMapComponent && null === this._environmentCubemap) {
            if ("" !== this._environmentCubemapUrl) {
              environmentRequest = engine.getTextureLoader().loadCubeTexture(this._environmentCubemapUrl, -this.getEntity().getLeastCameraDepth()).then(environmentTexture => {
                this._environmentCubemap = engine.getTextureLoader().generateEnvMap(environmentTexture);
                PioneerPublicApi.ThreeJsHelper.destroyTexture(environmentTexture);
              });
            } else {
              if ("" !== this._environmentCylindricalUrl) {
                environmentRequest = PioneerPublicApi.ThreeJsHelper.loadTexture(this, this._environmentCubemapUrl).then(environmentTexture => {
                  this._environmentCubemap = engine.getTextureLoader().generateEnvMap(environmentTexture);
                  PioneerPublicApi.ThreeJsHelper.destroyTexture(environmentTexture);
                });
              }
            }
          }
          environmentRequest.catch(error => {
            if (!(error instanceof PioneerPublicApi.CanceledError)) {
              reject(error instanceof Error ? error : new Error());
            }
          }).then(() => {
            this._updateMaterials();
            this.getEntity().getScene().getEngine().getConfig().addEventListener("gammaCorrection", this._onConfigChanged);
            resolve();
          });
        }, error => {
          reject(error instanceof Error ? error : new Error());
        });
      });
    } catch (error) {
      if (error instanceof Error) {
        error.message = `While loading model "${this._url}": ${error.message}`;
      }
      throw error;
    }
  }
  // 监听器、共享资源引用与组件自有 GPU 对象必须在同一卸载阶段清理。
  __unloadResources() {
    for (let hiddenIndex = 0, hiddenCount = this._hiddenObjects.getSize(); hiddenIndex < hiddenCount; hiddenIndex++) this._hiddenObjects.getAt(hiddenIndex).value = null;
    this.getEntity().getScene().getEngine().getConfig().removeEventListener("gammaCorrection", this._onConfigChanged);
    this.getEngine().getResourceManager().releaseAllForEntityItem(this);
    if (this._environmentCubemap) {
      PioneerPublicApi.ThreeJsHelper.destroyTexture(this._environmentCubemap);
      this._environmentCubemap = null;
    }
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this, false);
  }
  _populateThreeJsObjectsAndMaterials(object) {
    object.matrixAutoUpdate = false;
    object.frustumCulled = false;
    object.visible = false;
    this.getThreeJsObjects().push(object);
    if (object instanceof PioneerPublicApi.THREE.Mesh) {
      let materials = object.material;
      if (!Array.isArray(materials)) {
        materials = [materials];
      }
      for (const material of materials) {
        let alreadyRegistered = false;
        for (let materialIndex = 0, materialCount = this.getThreeJsMaterials().length; materialIndex < materialCount; materialIndex++) if (this.getThreeJsMaterials()[materialIndex] === material) {
          alreadyRegistered = true;
          break;
        }
        if (!alreadyRegistered) {
          this.getThreeJsMaterials().push(material);
        }
      }
    }
    for (let childIndex = 0; childIndex < object.children.length; childIndex++) this._populateThreeJsObjectsAndMaterials(object.children[childIndex]);
  }
  _clean() {
    const helperNamePattern = /_(?:lamp|hemi)/iu;
    for (let objectIndex = 0; objectIndex < this.getThreeJsObjects().length; objectIndex++) {
      const object = this.getThreeJsObjects()[objectIndex];
      if (object.name.match(helperNamePattern)) {
        if (object.parent) {
          object.parent.remove(object);
        }
        this.getThreeJsObjects().splice(objectIndex, 1);
        objectIndex--;
      }
    }
    for (let objectIndex = 0, objectCount = this.getThreeJsObjects().length; objectIndex < objectCount; objectIndex++) {
      let removeGeometry = false;
      const object = this.getThreeJsObjects()[objectIndex];
      if (object instanceof PioneerPublicApi.THREE.Mesh && object.geometry instanceof PioneerPublicApi.THREE.BufferGeometry) {
        if (object.name.startsWith("_root")) {
          removeGeometry = true;
        }
        if (object instanceof PioneerPublicApi.THREE.Mesh && object.material instanceof PioneerPublicApi.THREE.Material && "transparent" === object.material.name) {
          removeGeometry = true;
        }
        if (removeGeometry) {
          object.geometry.deleteAttribute("position");
          object.geometry.deleteAttribute("normal");
        }
      }
    }
  }
  _onConfigChanged() {
    this._updateMaterials();
  }
  _updateMaterials() {
    for (let materialIndex = 0, materialCount = this.getThreeJsMaterials().length; materialIndex < materialCount; materialIndex++) {
      const standardMaterial = this.getThreeJsMaterials()[materialIndex];
      if (!(standardMaterial instanceof PioneerPublicApi.THREE.MeshStandardMaterial)) continue;
      const pioneerMaterial = this._getNewPioneerMaterial(standardMaterial);
      this.getThreeJsMaterials()[materialIndex] = pioneerMaterial;
      let needsTangents = false;
      if (true === pioneerMaterial.defines.normalMap) {
        needsTangents = true;
      }
      for (const object of this.getThreeJsObjects()) if (object instanceof PioneerPublicApi.THREE.Mesh) {
        let materialReplaced = false;
        if (Array.isArray(object.material)) for (let slotIndex = 0, slotCount = object.material.length; slotIndex < slotCount; slotIndex++) {
          if (object.material[slotIndex] === standardMaterial) {
            object.material[slotIndex] = pioneerMaterial;
            materialReplaced = true;
          }
        } else {
          if (object.material === standardMaterial) {
            object.material = pioneerMaterial;
            materialReplaced = true;
          }
        }
        if (materialReplaced && needsTangents && object.geometry instanceof PioneerPublicApi.THREE.BufferGeometry && void 0 === object.geometry.getAttribute("tangent")) {
          PioneerPublicApi.ThreeJsHelper.computeTangents(object.geometry);
        }
      }
      PioneerPublicApi.ThreeJsHelper.destroyMaterial(standardMaterial, true);
    }
  }
  // 贴图从旧材质移交到 Pioneer uniform 后置空旧字段，避免销毁旧材质时重复释放贴图。
  _getNewPioneerMaterial(standardMaterial) {
    const pioneerMaterial = PioneerPublicApi.MaterialUtils.getPBR();
    pioneerMaterial.name = standardMaterial.name;
    pioneerMaterial.transparent = standardMaterial.transparent;
    pioneerMaterial.alphaTest = standardMaterial.alphaTest;
    pioneerMaterial.defines.alphaTestEnabled = 0 !== standardMaterial.alphaTest;
    pioneerMaterial.depthWrite = standardMaterial.depthWrite;
    pioneerMaterial.side = standardMaterial.side;
    if (null !== standardMaterial.map) {
      pioneerMaterial.uniforms.colorTexture.value = standardMaterial.map;
      pioneerMaterial.defines.colorMap = true;
      pioneerMaterial.uniforms.uvTransform.value.setUvTransform(standardMaterial.map.offset.x, standardMaterial.map.offset.y, standardMaterial.map.repeat.x, standardMaterial.map.repeat.y, standardMaterial.map.rotation, standardMaterial.map.center.x, standardMaterial.map.center.y);
      standardMaterial.map = null;
    }
    if (standardMaterial.roughnessMap) {
      pioneerMaterial.uniforms.roughnessTexture.value = standardMaterial.roughnessMap;
      pioneerMaterial.defines.roughnessMap = true;
      standardMaterial.roughnessMap = null;
    }
    if (standardMaterial.metalnessMap) {
      pioneerMaterial.uniforms.metalnessTexture.value = standardMaterial.metalnessMap;
      pioneerMaterial.defines.metalnessMap = true;
      standardMaterial.metalnessMap = null;
    }
    if (null !== standardMaterial.normalMap) {
      pioneerMaterial.uniforms.normalTexture.value = standardMaterial.normalMap;
      pioneerMaterial.uniforms.normalScale.value = standardMaterial.normalScale;
      pioneerMaterial.defines.normalMap = true;
      standardMaterial.normalMap = null;
    }
    const emissiveColor = pioneerMaterial.uniforms.emissiveColor.value;
    emissiveColor.copy(standardMaterial.emissive);
    emissiveColor.multiplyScalar(standardMaterial.emissiveIntensity);
    if (null !== standardMaterial.emissiveMap) {
      pioneerMaterial.uniforms.emissiveTexture.value = standardMaterial.emissiveMap;
      pioneerMaterial.defines.emissiveMap = true;
      standardMaterial.emissiveMap = null;
    }
    pioneerMaterial.uniforms.color.value = standardMaterial.color;
    pioneerMaterial.uniforms.roughness.value = standardMaterial.roughness;
    pioneerMaterial.uniforms.metalness.value = standardMaterial.metalness;
    if (null !== this._dynamicEnvironmentMapComponent) {
      pioneerMaterial.defines.dynEnvMap = true;
      pioneerMaterial.uniforms.dynEnvTexture.value = this._dynamicEnvironmentMapComponent.getTexture();
      pioneerMaterial.uniforms.dynEnvFaceSize.value = this._dynamicEnvironmentMapComponent.getFaceSize();
    } else if (null !== this._environmentCubemap) {
      pioneerMaterial.defines.envMap = true;
      pioneerMaterial.defines.envIsCubeUV = true;
      const environmentImage = this._environmentCubemap.image;
      pioneerMaterial.uniforms.envTexture.value = this._environmentCubemap;
      pioneerMaterial.uniforms.maxMipLevel.value = Math.log(environmentImage.height) * Math.LOG2E;
    }
    pioneerMaterial.uniforms.environmentIntensity.value = this._environmentIntensity;
    pioneerMaterial.uniforms.gammaCorrectionFactor.value = this.getEntity().getScene().getEngine().getConfig().getValue("gammaCorrection");
    if (this._shadowEntities.length > 0) {
      pioneerMaterial.defines.shadowEntities = true;
    }
    pioneerMaterial.needsUpdate = true;
    return pioneerMaterial;
  }
  _url;
  _shadowEntities;
  _translation;
  _rotation;
  _urlReferenceMap;
  _threeJsAnimationClips;
  _hiddenObjects;
  _scale;
  _modelRadius;
  _environmentCubemapUrl;
  _environmentCylindricalUrl;
  _environmentCubemap;
  _environmentIntensity;
  _dynamicEnvironmentMapComponent;
  static _dracoLoader;
}
// 注意：静态共享 Draco 适配器保留首次模型的 owner、priority 和 loadState；这里保留原有生命周期。
class CustomDracoLoader extends DRACOLoader.DRACOLoader {
  constructor(modelComponent, priority, loadState) {
    super();
    this._modelComponent = modelComponent;
    this._priority = priority;
    this._loadState = loadState;
  }
  load(url, onLoad, onProgress, onError) {
    this._modelComponent.getEngine().getResourceManager().acquire(this._modelComponent, url, "binary", this._priority).then(buffer => {
      this.parse(buffer, onLoad, onError);
    }).catch(error => {
      if (!(error instanceof PioneerPublicApi.CanceledError)) {
        if (error instanceof Error) {
          this._loadState.state = "failed";
          this._loadState.error = error.message;
        }
        onError?.(error);
      }
    });
  }
  _modelComponent;
  _priority;
  _loadState;
}
// GLTF 依赖纹理沿用模型组件作为资源所有者，失败写入同一 loadState，取消则不标记失败。
class CustomThreeJsTextureLoader extends PioneerPublicApi.THREE.Loader {
  constructor(modelComponent, urlReferenceMap, downloadPriority, loadState) {
    super();
    this._modelComponent = modelComponent;
    this._urlReferenceMap = urlReferenceMap;
    this._downloadPriority = downloadPriority;
    this._loadState = loadState;
  }
  load(url, onLoad, onProgress, onError) {
    let extension;
    const fileName = url.substring(url.lastIndexOf("/") + 1);
    const mappedUrl = this._urlReferenceMap.get(fileName);
    if (void 0 !== mappedUrl && -1 === (url = mappedUrl).substring(url.lastIndexOf("/") + 1).lastIndexOf(".")) {
      const extensionIndex = fileName.lastIndexOf(".");
      if (-1 !== extensionIndex) {
        extension = fileName.substring(extensionIndex + 1);
      }
    }
    this._modelComponent.getEngine().getResourceManager().acquire(this._modelComponent, url, "texture", this._downloadPriority, {
      extension: extension
    }).then(texture => {
      onLoad(texture);
    }).catch(error => {
      if (!(error instanceof PioneerPublicApi.CanceledError)) {
        if (error instanceof Error) {
          this._loadState.state = "failed";
          this._loadState.error = error.message;
        }
        onError?.(error);
      }
    });
  }
  _modelComponent;
  _urlReferenceMap;
  _downloadPriority;
  _loadState;
}
// KTX2 的 GLTF 接口只转发到同一纹理资源通道，不另建一份下载所有权。
class CustomThreeJsKTX2Loader extends KTX2Loader.KTX2Loader {
  constructor(customThreeJsTextureLoader) {
    super();
    this._customThreeJsTextureLoader = customThreeJsTextureLoader;
  }
  load(url, onLoad, onProgress, onError) {
    this._customThreeJsTextureLoader.load(url, onLoad, onProgress, onError);
  }
  _customThreeJsTextureLoader;
}
export { ModelComponent };
