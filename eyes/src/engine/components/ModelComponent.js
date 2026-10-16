import { localDecoderUrl } from '../../runtime/decoder-paths.js';
// Recovered from app.js:350460-363613.
import * as PioneerPublicApi from "../pioneer/public-api.js";
import * as GLTFLoader from "../../vendor/modules/GLTFLoader.js";
import * as DRACOLoader from "../../vendor/modules/DRACOLoader.js";
import * as KTX2Loader from "../../vendor/modules/KTX2Loader.js";
class ModelComponent extends PioneerPublicApi.BaseComponent {
  constructor(t, e) {
    super(t, e);
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
  setHiddenObject(t, e) {
    e && !this._hiddenObjects.has(t) ? this._hiddenObjects.set(t, null) : !e && this._hiddenObjects.has(t) && this._hiddenObjects.delete(t);
  }
  getTranslation() {
    return this._translation;
  }
  setTranslation(t) {
    this._translation.copy(t);
  }
  getScale() {
    return this._scale;
  }
  setScale(t) {
    "number" == typeof t ? this._scale.set(t, t, t) : this._scale.copy(t);
    PioneerPublicApi.ThreeJsHelper.setScale(this.getThreeJsObjects()[0], this._scale);
    isNaN(this._modelRadius) ? this.__setRadius(this.getEntity().getExtentsRadius()) : this.__setRadius(Math.max(this._scale.x, this._scale.y, this._scale.z) * this._modelRadius);
  }
  getRotation() {
    return this._rotation;
  }
  setRotation(t) {
    this._rotation.copy(t);
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
    for (let t = 0, e = this.getThreeJsMaterials().length; t < e; t++) PioneerPublicApi.ThreeJsHelper.setUniformNumber(this.getThreeJsMaterials()[t], "environmentIntensity", this._environmentIntensity);
  }
  getEnvironmentCylindricalUrl() {
    return this._environmentCylindricalUrl;
  }
  setEnvironmentCylindricalUrl(environmentCylindricalUrl) {
    this._environmentCylindricalUrl = environmentCylindricalUrl;
  }
  setDynamicEnvironmentMapComponent(dynamicEnvironmentMapComponent) {
    this._dynamicEnvironmentMapComponent = dynamicEnvironmentMapComponent;
    for (let e = 0, i = this.getThreeJsMaterials().length; e < i; e++) {
      const i = this.getThreeJsMaterials()[e];
      void 0 !== i.uniforms.dynEnvTexture && (PioneerPublicApi.ThreeJsHelper.setDefine(i, "dynEnvMap", true), PioneerPublicApi.ThreeJsHelper.setUniformTexture(i, "dynEnvTexture", this._dynamicEnvironmentMapComponent.getTexture()), PioneerPublicApi.ThreeJsHelper.setUniformNumber(i, "dynEnvFaceSize", dynamicEnvironmentMapComponent.getFaceSize()));
    }
    null !== this._environmentCubemap && (PioneerPublicApi.ThreeJsHelper.destroyTexture(this._environmentCubemap), this._environmentCubemap = null);
  }
  setURLReferenceMap(t) {
    this._urlReferenceMap.clear();
    for (const e of t) this._urlReferenceMap.set(e[0], e[1]);
  }
  getAnimationClip(t) {
    return this._threeJsAnimationClips.get(t) ?? null;
  }
  getMaterial(t) {
    const e = this.getThreeJsMaterials();
    for (let i = 0, s = e.length; i < s; i++) {
      const s = e[i];
      if (s.name === t) return s;
    }
    return null;
  }
  updateMaterial(t, e) {
    const i = this.getThreeJsMaterials();
    let n;
    for (let s = 0; s < i.length; s++) {
      const o = i[s];
      if (o.name === t) {
        n = o;
        i.splice(s, 1);
        i.push(e);
        break;
      }
    }
    if (!n) throw new Error(`No material with the name ${t} was found in ${this}.`);
    for (let i = 0, o = this.getThreeJsObjects().length; i < o; i++) {
      const o = this.getThreeJsObjects()[i];
      o instanceof PioneerPublicApi.THREE.Mesh && o.material === n && (e.name = t, n = e);
    }
  }
  getNumShadowEntities() {
    return this._shadowEntities.length;
  }
  getShadowEntity(t) {
    return this._shadowEntities[t]?.getName();
  }
  setShadowEntities(t) {
    this._shadowEntities = [];
    for (const e of t) this._shadowEntities.push(new PioneerPublicApi.EntityRef(this.getEntity().getScene(), e));
    const e = t.length > 0;
    for (let t = 0, i = this.getThreeJsMaterials().length; t < i; t++) PioneerPublicApi.ThreeJsHelper.setDefine(this.getThreeJsMaterials()[t], "shadowEntities", e);
  }
  __prepareForRender(t) {
    for (let t = 0, e = this._hiddenObjects.getSize(); t < e; t++) {
      const e = this._hiddenObjects.getAt(t);
      e.value ??= this.getThreeJsObjectByName(e.key);
      null !== e.value && (e.value.visible = false);
    }
    let e = 1;
    (t.getViewport() ?? this.getEntity().getScene().getEngine().getViewportAt(0)) && (e *= this.getVisibleInterval().getFadeMultiplier(this.getEntity(), t));
    this.setAlphaFadeMultiplier(e);
    0 === e && this.__setVisible(false);
    PioneerPublicApi.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects()[0], this.getEntity(), t, this._translation, true);
    PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects()[0], this.getEntity(), this._rotation);
    PioneerPublicApi.MaterialUtils.setUniforms(this.getThreeJsMaterials(), t, this.getEntity(), this._shadowEntities, null, false);
  }
  async __loadResources() {
    const t = this.getEntity().getScene().getEngine();
    try {
      if (!this._url.endsWith(".gltf") && !this._url.endsWith(".glb") && !this._url.startsWith("blob:")) throw new Error("Unknown model format.");
      const e = this._url.startsWith("blob:") || this._url.endsWith(".glb") ? "binary" : "text";
      const i = await t.getResourceManager().acquire(this, this._url, e, -this.getEntity().getLeastCameraDepth());
      if ("loading" !== this.getLoadState().state) return;
      const loadingManager = new PioneerPublicApi.THREE.LoadingManager();
      const r = -this.getEntity().getLeastCameraDepth();
      const customThreeJsTextureLoader = new CustomThreeJsTextureLoader(this, this._urlReferenceMap, r, this.getLoadState());
      if (loadingManager.addHandler(/.$/u, customThreeJsTextureLoader), loadingManager.setURLModifier(t => {
        const e = t.substring(t.lastIndexOf("/") + 1);
        return this._urlReferenceMap.get(e) ?? t;
      }), !ModelComponent._dracoLoader && false !== t.getConfig().getValue("draco")) {
        ModelComponent._dracoLoader = new CustomDracoLoader(this, r, this.getLoadState());
        const e = t.getConfig().getValue("dracoPath");
        const i = t.getDownloader().processUrl("string" == typeof e ? e : localDecoderUrl("draco/"));
        ModelComponent._dracoLoader.setDecoderPath(i);
      }
      const gLTFLoader = new GLTFLoader.GLTFLoader(loadingManager);
      ModelComponent._dracoLoader && gLTFLoader.setDRACOLoader(ModelComponent._dracoLoader);
      const customThreeJsKTX2Loader = new CustomThreeJsKTX2Loader(customThreeJsTextureLoader);
      gLTFLoader.setKTX2Loader(customThreeJsKTX2Loader);
      await new Promise((e, n) => {
        const o = t.getDownloader().processUrl(this._url);
        gLTFLoader.parse(i, PioneerPublicApi.THREE.LoaderUtils.extractUrlBase(o), i => {
          if ("failed" === this.getLoadState().state) throw new Error(this.getLoadState().error);
          const o = i.scene;
          this._populateThreeJsObjectsAndMaterials(i.scene);
          "loading" !== this.getLoadState().state && PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this);
          this._clean();
          PioneerPublicApi.ThreeJsHelper.setupObject(this, o);
          PioneerPublicApi.ThreeJsHelper.setScale(o, this._scale);
          const r = new PioneerPublicApi.THREE.Box3().setFromObject(o);
          this._modelRadius = Math.max(r.min.length(), r.max.length());
          this.__setRadius(Math.max(this._scale.x, this._scale.y, this._scale.z) * this._modelRadius);
          for (let t = 0; t < i.animations.length; t++) {
            const e = i.animations[t];
            this._threeJsAnimationClips.set(e.name, e);
          }
          let a = Promise.resolve();
          null === this._dynamicEnvironmentMapComponent && null === this._environmentCubemap && ("" !== this._environmentCubemapUrl ? a = t.getTextureLoader().loadCubeTexture(this._environmentCubemapUrl, -this.getEntity().getLeastCameraDepth()).then(e => {
            this._environmentCubemap = t.getTextureLoader().generateEnvMap(e);
            PioneerPublicApi.ThreeJsHelper.destroyTexture(e);
          }) : "" !== this._environmentCylindricalUrl && (a = PioneerPublicApi.ThreeJsHelper.loadTexture(this, this._environmentCubemapUrl).then(e => {
            this._environmentCubemap = t.getTextureLoader().generateEnvMap(e);
            PioneerPublicApi.ThreeJsHelper.destroyTexture(e);
          })));
          a.catch(t => {
            t instanceof PioneerPublicApi.CanceledError || n(t instanceof Error ? t : new Error());
          }).then(() => {
            this._updateMaterials();
            this.getEntity().getScene().getEngine().getConfig().addEventListener("gammaCorrection", this._onConfigChanged);
            e();
          });
        }, t => {
          n(t instanceof Error ? t : new Error());
        });
      });
    } catch (t) {
      throw t instanceof Error && (t.message = `While loading model "${this._url}": ${t.message}`), t;
    }
  }
  __unloadResources() {
    for (let t = 0, e = this._hiddenObjects.getSize(); t < e; t++) this._hiddenObjects.getAt(t).value = null;
    this.getEntity().getScene().getEngine().getConfig().removeEventListener("gammaCorrection", this._onConfigChanged);
    this.getEngine().getResourceManager().releaseAllForEntityItem(this);
    this._environmentCubemap && (PioneerPublicApi.ThreeJsHelper.destroyTexture(this._environmentCubemap), this._environmentCubemap = null);
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this, false);
  }
  _populateThreeJsObjectsAndMaterials(t) {
    if (t.matrixAutoUpdate = false, t.frustumCulled = false, t.visible = false, this.getThreeJsObjects().push(t), t instanceof PioneerPublicApi.THREE.Mesh) {
      let e = t.material;
      Array.isArray(e) || (e = [e]);
      for (const t of e) {
        let e = false;
        for (let i = 0, s = this.getThreeJsMaterials().length; i < s; i++) if (this.getThreeJsMaterials()[i] === t) {
          e = true;
          break;
        }
        e || this.getThreeJsMaterials().push(t);
      }
    }
    for (let e = 0; e < t.children.length; e++) this._populateThreeJsObjectsAndMaterials(t.children[e]);
  }
  _clean() {
    const t = /_(?:lamp|hemi)/iu;
    for (let e = 0; e < this.getThreeJsObjects().length; e++) {
      const i = this.getThreeJsObjects()[e];
      i.name.match(t) && (i.parent && i.parent.remove(i), this.getThreeJsObjects().splice(e, 1), e--);
    }
    for (let t = 0, e = this.getThreeJsObjects().length; t < e; t++) {
      let e = false;
      const i = this.getThreeJsObjects()[t];
      i instanceof PioneerPublicApi.THREE.Mesh && i.geometry instanceof PioneerPublicApi.THREE.BufferGeometry && (i.name.startsWith("_root") && (e = true), i instanceof PioneerPublicApi.THREE.Mesh && i.material instanceof PioneerPublicApi.THREE.Material && "transparent" === i.material.name && (e = true), e && (i.geometry.deleteAttribute("position"), i.geometry.deleteAttribute("normal")));
    }
  }
  _onConfigChanged() {
    this._updateMaterials();
  }
  _updateMaterials() {
    for (let t = 0, e = this.getThreeJsMaterials().length; t < e; t++) {
      const e = this.getThreeJsMaterials()[t];
      if (!(e instanceof PioneerPublicApi.THREE.MeshStandardMaterial)) continue;
      const i = this._getNewPioneerMaterial(e);
      this.getThreeJsMaterials()[t] = i;
      let n = false;
      true === i.defines.normalMap && (n = true);
      for (const t of this.getThreeJsObjects()) if (t instanceof PioneerPublicApi.THREE.Mesh) {
        let o = false;
        if (Array.isArray(t.material)) for (let s = 0, n = t.material.length; s < n; s++) t.material[s] === e && (t.material[s] = i, o = true);else t.material === e && (t.material = i, o = true);
        o && n && t.geometry instanceof PioneerPublicApi.THREE.BufferGeometry && void 0 === t.geometry.getAttribute("tangent") && PioneerPublicApi.ThreeJsHelper.computeTangents(t.geometry);
      }
      PioneerPublicApi.ThreeJsHelper.destroyMaterial(e, true);
    }
  }
  _getNewPioneerMaterial(t) {
    const e = PioneerPublicApi.MaterialUtils.getPBR();
    if (e.name = t.name, e.transparent = t.transparent, e.alphaTest = t.alphaTest, e.defines.alphaTestEnabled = 0 !== t.alphaTest, e.depthWrite = t.depthWrite, e.side = t.side, null !== t.map) {
      e.uniforms.colorTexture.value = t.map;
      e.defines.colorMap = true;
      e.uniforms.uvTransform.value.setUvTransform(t.map.offset.x, t.map.offset.y, t.map.repeat.x, t.map.repeat.y, t.map.rotation, t.map.center.x, t.map.center.y);
      t.map = null;
    }
    t.roughnessMap && (e.uniforms.roughnessTexture.value = t.roughnessMap, e.defines.roughnessMap = true, t.roughnessMap = null);
    t.metalnessMap && (e.uniforms.metalnessTexture.value = t.metalnessMap, e.defines.metalnessMap = true, t.metalnessMap = null);
    null !== t.normalMap && (e.uniforms.normalTexture.value = t.normalMap, e.uniforms.normalScale.value = t.normalScale, e.defines.normalMap = true, t.normalMap = null);
    const i = e.uniforms.emissiveColor.value;
    if (i.copy(t.emissive), i.multiplyScalar(t.emissiveIntensity), null !== t.emissiveMap && (e.uniforms.emissiveTexture.value = t.emissiveMap, e.defines.emissiveMap = true, t.emissiveMap = null), e.uniforms.color.value = t.color, e.uniforms.roughness.value = t.roughness, e.uniforms.metalness.value = t.metalness, null !== this._dynamicEnvironmentMapComponent) {
      e.defines.dynEnvMap = true;
      e.uniforms.dynEnvTexture.value = this._dynamicEnvironmentMapComponent.getTexture();
      e.uniforms.dynEnvFaceSize.value = this._dynamicEnvironmentMapComponent.getFaceSize();
    } else if (null !== this._environmentCubemap) {
      e.defines.envMap = true;
      e.defines.envIsCubeUV = true;
      const t = this._environmentCubemap.image;
      e.uniforms.envTexture.value = this._environmentCubemap;
      e.uniforms.maxMipLevel.value = Math.log(t.height) * Math.LOG2E;
    }
    e.uniforms.environmentIntensity.value = this._environmentIntensity;
    e.uniforms.gammaCorrectionFactor.value = this.getEntity().getScene().getEngine().getConfig().getValue("gammaCorrection");
    this._shadowEntities.length > 0 && (e.defines.shadowEntities = true);
    e.needsUpdate = true;
    return e;
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
class CustomDracoLoader extends DRACOLoader.DRACOLoader {
  constructor(modelComponent, priority, loadState) {
    super();
    this._modelComponent = modelComponent;
    this._priority = priority;
    this._loadState = loadState;
  }
  load(t, e, i, n) {
    this._modelComponent.getEngine().getResourceManager().acquire(this._modelComponent, t, "binary", this._priority).then(t => {
      this.parse(t, e, n);
    }).catch(t => {
      t instanceof PioneerPublicApi.CanceledError || (t instanceof Error && (this._loadState.state = "failed", this._loadState.error = t.message), n?.(t));
    });
  }
  _modelComponent;
  _priority;
  _loadState;
}
class CustomThreeJsTextureLoader extends PioneerPublicApi.THREE.Loader {
  constructor(modelComponent, urlReferenceMap, downloadPriority, loadState) {
    super();
    this._modelComponent = modelComponent;
    this._urlReferenceMap = urlReferenceMap;
    this._downloadPriority = downloadPriority;
    this._loadState = loadState;
  }
  load(t, e, i, n) {
    let o;
    const r = t.substring(t.lastIndexOf("/") + 1);
    const a = this._urlReferenceMap.get(r);
    if (void 0 !== a && -1 === (t = a).substring(t.lastIndexOf("/") + 1).lastIndexOf(".")) {
      const t = r.lastIndexOf(".");
      -1 !== t && (o = r.substring(t + 1));
    }
    this._modelComponent.getEngine().getResourceManager().acquire(this._modelComponent, t, "texture", this._downloadPriority, {
      extension: o
    }).then(t => {
      e(t);
    }).catch(t => {
      t instanceof PioneerPublicApi.CanceledError || (t instanceof Error && (this._loadState.state = "failed", this._loadState.error = t.message), n?.(t));
    });
  }
  _modelComponent;
  _urlReferenceMap;
  _downloadPriority;
  _loadState;
}
class CustomThreeJsKTX2Loader extends KTX2Loader.KTX2Loader {
  constructor(customThreeJsTextureLoader) {
    super();
    this._customThreeJsTextureLoader = customThreeJsTextureLoader;
  }
  load(t, e, i, s) {
    this._customThreeJsTextureLoader.load(t, e, i, s);
  }
  _customThreeJsTextureLoader;
}
export { ModelComponent };
