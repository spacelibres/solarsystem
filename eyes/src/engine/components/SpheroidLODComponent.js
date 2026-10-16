/** @eyes-analysis
 * 文件职责：以球体网格/立方体映射和 TextureLOD 为行星选择纹理分辨率，协调大气及阴影材质。
 * 依据：import ../pioneer/public-api.js；SpheroidLODComponent extends PioneerPublicApi.BaseComponent @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:397115-407521.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：以球体网格/立方体映射和 TextureLOD 为行星选择纹理分辨率，协调大气及阴影材质。
 * 继承：PioneerPublicApi.BaseComponent；导出：SpheroidLODComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class SpheroidLODComponent extends PioneerPublicApi.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_atmosphereComponentRef`、`_cubeMapFaceFrames`、`_longitudinalRotation`、`_lowerLeftBounds`、`_mapping`、`_materialOptions`、`_numFaces`、`_shadowEntities`；调用 `new PioneerPublicApi.ComponentRef`、`new PioneerPublicApi.FastMap`、`new PioneerPublicApi.LatLonAlt`、`new Set`、`super`、`this.__setUsesEntityOrientation`。
   * 状态写入：_atmosphereComponentRef、_cubeMapFaceFrames、_longitudinalRotation、_lowerLeftBounds、_mapping、_materialOptions、_numFaces、_shadowEntities等；完整记录见索引。
   * 调用线索：new PioneerPublicApi.ComponentRef、new PioneerPublicApi.FastMap、new PioneerPublicApi.LatLonAlt、new Set、super等。
   */
  constructor(t, e) {
    super(t, e);
    this._textureInfos = new PioneerPublicApi.FastMap();
    this._mapping = "cylinder";
    this._longitudinalRotation = 0;
    this._numFaces = 1;
    this._lowerLeftBounds = new PioneerPublicApi.LatLonAlt(-PioneerPublicApi.MathUtils.HalfPi, -PioneerPublicApi.MathUtils.Pi, 0);
    this._upperRightBounds = new PioneerPublicApi.LatLonAlt(+PioneerPublicApi.MathUtils.HalfPi, PioneerPublicApi.MathUtils.Pi, 0);
    this._cubeMapFaceFrames = PioneerPublicApi.CubeMap.defaultCubeMapFaceFrames;
    this._shadowEntities = [];
    this._materialOptions = new Set();
    this._atmosphereComponentRef = new PioneerPublicApi.ComponentRef(this.getEntity().getScene(), PioneerPublicApi.AtmosphereComponent, this.getEntity().getName());
    this._spheroidComponentRef = new PioneerPublicApi.ComponentRef(this.getEntity().getScene(), PioneerPublicApi.SpheroidComponent, this.getEntity().getName());
    this._spheroidComponentRef.setRefChangedCallback(this._spheroidRefChangedCallback.bind(this));
    this._spheroidChangedCallback = this._spheroidChangedCallback.bind(this);
    this.__setUsesEntityOrientation(true);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t`；调用 `t.push`、`this._textureInfos.getAt`、`this._textureInfos.getSize`。
   * 调用线索：t.push、this._textureInfos.getAt、this._textureInfos.getSize。
   */
  getTextureNames() {
    const t = [];
    for (let e = 0; e < this._textureInfos.getSize(); e++) t.push(this._textureInfos.getAt(e).key);
    return t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._textureInfos.get(t)?.url`；调用 `this._textureInfos.get`。
   * 调用线索：this._textureInfos.get。
   */
  getTextureUrl(t) {
    return this._textureInfos.get(t)?.url;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._textureInfos.get(t)?.sizes`；调用 `this._textureInfos.get`。
   * 调用线索：this._textureInfos.get。
   */
  getTextureSizes(t) {
    return this._textureInfos.get(t)?.sizes;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.replace`、`new PioneerPublicApi.TextureLOD`、`o.lods.push`、`s.setSizes`、`s.setUrl`、`t.toString`。
   * 调用线索：e.replace、new PioneerPublicApi.TextureLOD、o.lods.push、s.setSizes、s.setUrl等。
   */
  setTexture(t, e, i = [4, 512, 4096]) {
    const n = this.getThreeJsMaterials();
    for (let e = 0, i = n.length; e < i; e++) {
      const i = n[e];
      i.defines[`${t}Map`] = true;
      i.needsUpdate = true;
    }
    let o = this._textureInfos.get(t);
    if (o) {
      o.url = e;
      o.sizes = [...i];
    } else {
      o = {
        url: e,
        sizes: [...i],
        lods: []
      };
      for (let e = 0, numFaces = this._numFaces; e < numFaces; e++) {
        const textureLOD = new PioneerPublicApi.TextureLOD(this);
        const r = n[e]?.uniforms[`${t}Texture`];
        void 0 !== r && textureLOD.setUniform(r);
        o.lods.push(textureLOD);
      }
      this._textureInfos.set(t, o);
    }
    for (let t = 0, numFaces = this._numFaces; t < numFaces; t++) {
      const s = o.lods[t];
      s.setUrl(e.replace("$FACE", t.toString()));
      s.setSizes(i);
    }
    "normal" === t && this._updateMeshes();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `i.lods[t].setForcedSize`、`new Error`、`this._textureInfos.get`；含显式错误分支。
   * 调用线索：i.lods[t].setForcedSize、new Error、this._textureInfos.get。
   */
  forceTextureSize(t, e) {
    const i = this._textureInfos.get(t);
    if (void 0 === i) throw new Error(`No texture named "${t}" has been defined.`);
    for (let t = 0; t < i.lods.length; t++) i.lods[t].setForcedSize(e);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._textureInfos.delete`、`this._updateMeshes`、`this.getEngine`、`this.getEngine().getResourceManager`、`this.getEngine().getResourceManager().release`、`this.getThreeJsMaterials`。
   * 调用线索：this._textureInfos.delete、this._updateMeshes、this.getEngine、this.getEngine().getResourceManager、this.getEngine().getResourceManager().release等。
   */
  unsetTexture(t) {
    const e = this.getThreeJsMaterials();
    for (let i = 0, s = e.length; i < s; i++) {
      const s = e[i];
      delete s.defines[`${t}Map`];
      s.needsUpdate = true;
    }
    this._textureInfos.delete(t);
    for (let i = 0, n = e.length; i < n; i++) {
      const n = e[i].uniforms[`${t}Texture`];
      n?.value instanceof PioneerPublicApi.THREE.Texture && (this.getEngine().getResourceManager().release(this, n.value, "texture"), n.value = null);
    }
    "normal" === t && this._updateMeshes();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `i.lods[e].getCurrentSize()`；调用 `i.lods[e].getCurrentSize`、`this._textureInfos.get`。
   * 调用线索：i.lods[e].getCurrentSize、this._textureInfos.get。
   */
  getTextureCurrentSize(t, e) {
    const i = this._textureInfos.get(t);
    if (void 0 !== i?.lods[e]) return i.lods[e].getCurrentSize();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._materialOptions.has(t)`；调用 `this._materialOptions.has`。
   * 调用线索：this._materialOptions.has。
   */
  isMaterialOptionEnabled(t) {
    return this._materialOptions.has(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._materialOptions.add`、`this._materialOptions.delete`、`this._materialOptions.has`、`this.getThreeJsMaterials`。
   * 调用线索：this._materialOptions.add、this._materialOptions.delete、this._materialOptions.has、this.getThreeJsMaterials。
   */
  setMaterialOption(t, e) {
    const i = this.getThreeJsMaterials();
    if (e && !this._materialOptions.has(t)) {
      this._materialOptions.add(t);
      for (let e = 0, s = i.length; e < s; e++) {
        const s = i[e];
        s.defines[t] = true;
        s.needsUpdate = true;
      }
    } else if (!e && this._materialOptions.has(t)) {
      this._materialOptions.delete(t);
      for (let e = 0, s = i.length; e < s; e++) {
        const s = i[e];
        delete s.defines[t];
        s.needsUpdate = true;
      }
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._mapping`。
   */
  getMapping() {
    return this._mapping;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_mapping`、`_numFaces`；调用 `e.lods.push`、`e.lods[t].setEnabled`、`e.url.replace`、`new PioneerPublicApi.TextureLOD`、`t.toString`、`textureLOD.setSizes`。
   * 状态写入：_mapping、_numFaces。
   * 调用线索：e.lods.push、e.lods[t].setEnabled、e.url.replace、new PioneerPublicApi.TextureLOD、t.toString等。
   */
  setMapping(mapping) {
    if (this._mapping !== mapping) {
      this._numFaces = "cylinder" === mapping ? 1 : 6;
      for (let t = 0; t < this._textureInfos.getSize(); t++) {
        const e = this._textureInfos.getAt(t).value;
        for (let t = 0; t < e.lods.length; t++) e.lods[t].setEnabled(false);
        e.lods = [];
        for (let t = 0, numFaces = this._numFaces; t < numFaces; t++) {
          const textureLOD = new PioneerPublicApi.TextureLOD(this);
          textureLOD.setUrl(e.url.replace("$FACE", t.toString()));
          textureLOD.setSizes(e.sizes);
          e.lods.push(textureLOD);
        }
      }
      this.resetResources();
      this._mapping = mapping;
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._lowerLeftBounds.copy`、`this._updateMeshes`、`this._upperRightBounds.copy`。
   * 调用线索：this._lowerLeftBounds.copy、this._updateMeshes、this._upperRightBounds.copy。
   */
  setBounds(t, e) {
    this._lowerLeftBounds.copy(t);
    this._upperRightBounds.copy(e);
    this._updateMeshes();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_cubeMapFaceFrames`；调用 `PioneerPublicApi.Tuple.create3Tuple`、`PioneerPublicApi.Tuple.create6Tuple`、`new Error`、`this._updateMeshes`；含显式错误分支。
   * 状态写入：_cubeMapFaceFrames。
   * 调用线索：PioneerPublicApi.Tuple.create3Tuple、PioneerPublicApi.Tuple.create6Tuple、new Error、this._updateMeshes。
   */
  setCubeMapLayout(t) {
    this._cubeMapFaceFrames = PioneerPublicApi.Tuple.create6Tuple(e => PioneerPublicApi.Tuple.create3Tuple(i => {
      switch (t[e][i]) {
        case "+x":
          return PioneerPublicApi.Vector3.XAxis;
        case "-x":
          return PioneerPublicApi.Vector3.XAxisNeg;
        case "+y":
          return PioneerPublicApi.Vector3.YAxis;
        case "-y":
          return PioneerPublicApi.Vector3.YAxisNeg;
        case "+z":
          return PioneerPublicApi.Vector3.ZAxis;
        case "-z":
          return PioneerPublicApi.Vector3.ZAxisNeg;
        default:
          throw new Error("Invalid cubemap layout component.");
      }
    }));
    this._updateMeshes();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._shadowEntities.length`。
   */
  getNumShadowEntities() {
    return this._shadowEntities.length;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._shadowEntities[t]?.getName()`。
   * 调用线索：this._shadowEntities[t]?.getName。
   */
  getShadowEntity(t) {
    return this._shadowEntities[t]?.getName();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_shadowEntities`；调用 `PioneerPublicApi.ThreeJsHelper.setDefine`、`new PioneerPublicApi.EntityRef`、`this._shadowEntities.push`、`this.getEntity`、`this.getEntity().getScene`、`this.getThreeJsMaterials`。
   * 状态写入：_shadowEntities。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.setDefine、new PioneerPublicApi.EntityRef、this._shadowEntities.push、this.getEntity、this.getEntity().getScene等。
   */
  setShadowEntities(t) {
    this._shadowEntities = [];
    for (const e of t) this._shadowEntities.push(new PioneerPublicApi.EntityRef(this.getEntity().getScene(), e));
    const e = t.length > 0;
    for (let t = 0, i = this.getThreeJsMaterials().length; t < i; t++) PioneerPublicApi.ThreeJsHelper.setDefine(this.getThreeJsMaterials()[t], "shadowEntities", e);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._longitudinalRotation`。
   */
  getLongitudeRotation() {
    return this._longitudinalRotation;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_longitudinalRotation`。
   * 状态写入：_longitudinalRotation。
   */
  setLongitudeRotation(longitudinalRotation) {
    this._longitudinalRotation = longitudinalRotation;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `super.getLoadedPromise`、`this.getLoadState`、`this.getTexturesLoadedPromise`。
   * 调用线索：super.getLoadedPromise、this.getLoadState、this.getTexturesLoadedPromise。
   */
  async getLoadedPromise(t = false, e = Number.POSITIVE_INFINITY) {
    await super.getLoadedPromise(t, e);
    "loaded" === this.getLoadState().state && (await this.getTexturesLoadedPromise(e));
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Promise.allSettled`、`e.push`、`i.every`、`i.filter`、`new Error`、`s.lods[i].getLoadedPromise`；含显式错误分支。
   * 调用线索：Promise.allSettled、e.push、i.every、i.filter、i.filter(t=>"rejected"===t.status).map等。
   */
  async getTexturesLoadedPromise(t = Number.POSITIVE_INFINITY) {
    const e = [];
    for (let i = 0; i < this._textureInfos.getSize(); i++) {
      const s = this._textureInfos.getAt(i).value;
      for (let i = 0, n = s.lods.length; i < n; i++) e.push(s.lods[i].getLoadedPromise(t));
    }
    const i = await Promise.allSettled(e);
    if (!i.every(t => "fulfilled" === t.status)) throw new Error(i.filter(t => "rejected" === t.status).map(t => t.reason instanceof Error ? t.reason.message : "").filter(t => "" !== t).reduce((t, e) => `${t}\n${e}`, ""));
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._spheroidComponentRef.set`、`this.getEntity`、`this.getEntity().getName`。
   * 调用线索：this._spheroidComponentRef.set、this.getEntity、this.getEntity().getName。
   */
  setSpheroidReference(t) {
    this._spheroidComponentRef.set(this.getEntity().getName(), t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `super.__destroy`、`t.removeChangedCallback`、`this._spheroidComponentRef.get`。
   * 调用线索：super.__destroy、t.removeChangedCallback、this._spheroidComponentRef.get。
   */
  __destroy() {
    const t = this._spheroidComponentRef.get();
    null !== t && t.removeChangedCallback(this._spheroidChangedCallback);
    super.__destroy();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.lods[t].update`、`this._spheroidComponentRef.update`、`this._textureInfos.getAt`、`this._textureInfos.getSize`。
   * 调用线索：e.lods[t].update、this._spheroidComponentRef.update、this._textureInfos.getAt、this._textureInfos.getSize。
   */
  __update() {
    for (let t = 0; t < this._textureInfos.getSize(); t++) {
      const e = this._textureInfos.getAt(t).value;
      for (let t = 0, i = e.lods.length; t < i; t++) e.lods[t].update();
    }
    this._spheroidComponentRef.update();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.MaterialUtils.setUniforms`、`PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.ThreeJsHelper.setOrientationToEntity`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`i.setFromAxisAngle`。
   * 调用线索：PioneerPublicApi.MaterialUtils.setUniforms、PioneerPublicApi.Quaternion.pool.get、PioneerPublicApi.Quaternion.pool.release、PioneerPublicApi.ThreeJsHelper.setOrientationToEntity、PioneerPublicApi.ThreeJsHelper.setPositionToEntity等。
   */
  __prepareForRender(t) {
    const e = this.getThreeJsObjects();
    const i = PioneerPublicApi.Quaternion.pool.get();
    i.setFromAxisAngle(PioneerPublicApi.Vector3.ZAxis, this._longitudinalRotation);
    for (let n = 0; n < e.length; n++) {
      PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(e[n], this.getEntity(), i);
      PioneerPublicApi.ThreeJsHelper.setPositionToEntity(e[n], this.getEntity(), t);
    }
    PioneerPublicApi.Quaternion.pool.release(i);
    const n = this._atmosphereComponentRef.get();
    PioneerPublicApi.MaterialUtils.setUniforms(this.getThreeJsMaterials(), t, this.getEntity(), this._shadowEntities, n, true);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.MaterialUtils.get`、`PioneerPublicApi.ThreeJsHelper.createMeshObject`、`PioneerPublicApi.ThreeJsHelper.useInDynEnvMap`、`e.setEnabled`、`e.setUniform`、`this._textureInfos.getAt`。
   * 调用线索：PioneerPublicApi.MaterialUtils.get、PioneerPublicApi.ThreeJsHelper.createMeshObject、PioneerPublicApi.ThreeJsHelper.useInDynEnvMap、e.setEnabled、e.setUniform等。
   */
  async __loadResources() {
    for (let t = 0; t < this._numFaces; t++) {
      const e = PioneerPublicApi.MaterialUtils.get();
      this.getThreeJsMaterials().push(e);
      for (const t of this._materialOptions) {
        e.defines[t] = true;
        e.needsUpdate = true;
      }
      e.defines.shadowEntities = this.getNumShadowEntities() > 0;
      e.defines.nightMapEmissive = this._textureInfos.has("night");
      const i = PioneerPublicApi.ThreeJsHelper.createMeshObject(this, e, [{
        name: "position",
        dimensions: 3
      }, {
        name: "normal",
        dimensions: 3
      }, {
        name: "uv",
        dimensions: 2
      }], false);
      this.getThreeJsObjects().push(i);
      PioneerPublicApi.ThreeJsHelper.useInDynEnvMap(i, true);
      for (let i = 0; i < this._textureInfos.getSize(); i++) {
        const {
          key: key,
          value: value
        } = this._textureInfos.getAt(i);
        const o = e.uniforms[`${key}Texture`];
        if (void 0 !== o) {
          const e = value.lods[t];
          e.setEnabled(true);
          e.setUniform(o);
        }
        e.defines[`${key}Map`] = true;
        e.needsUpdate = true;
      }
    }
    this._updateMeshes();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`、`i.setEnabled`、`i.setUniform`、`this._textureInfos.getAt`、`this._textureInfos.getSize`、`this.getThreeJsMaterials`。
   * 调用线索：PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials、i.setEnabled、i.setUniform、this._textureInfos.getAt、this._textureInfos.getSize等。
   */
  __unloadResources() {
    for (let t = 0; t < this.getThreeJsMaterials().length; t++) {
      const e = this.getThreeJsMaterials()[t];
      e.uniforms.shadowRingsTexture && null !== e.uniforms.shadowRingsTexture.value && (e.uniforms.shadowRingsTexture.value = null);
    }
    for (let t = 0; t < this._textureInfos.getSize(); t++) {
      const e = this._textureInfos.getAt(t).value;
      for (let t = 0; t < e.lods.length; t++) {
        const i = e.lods[t];
        i.setEnabled(false);
        i.setUniform(null);
      }
    }
    PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials(this, false);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `void`；调用 `Math.ceil`、`Math.max`、`PioneerPublicApi.Geometry.getLLAFromXYZOnSphere`、`PioneerPublicApi.LatLonAlt.pool.get`、`PioneerPublicApi.LatLonAlt.pool.release`、`PioneerPublicApi.ThreeJsHelper.computeTangents`。
   * 调用线索：Math.ceil、Math.max、PioneerPublicApi.Geometry.getLLAFromXYZOnSphere、PioneerPublicApi.LatLonAlt.pool.get、PioneerPublicApi.LatLonAlt.pool.release等。
   */
  _updateMeshes() {
    if (0 === this.getThreeJsObjects().length) return;
    const t = this._spheroidComponentRef.get();
    if (null !== t) if ("cylinder" === this._mapping) {
      const e = this._upperRightBounds.lat - this._lowerLeftBounds.lat;
      const i = this._upperRightBounds.lon - this._lowerLeftBounds.lon;
      const n = Math.max(Math.ceil(100 * e / PioneerPublicApi.MathUtils.Pi), 4);
      const o = Math.max(Math.ceil(200 * i / PioneerPublicApi.MathUtils.TwoPi), 4);
      const r = e / (n - 1);
      const a = i / (o - 1);
      const l = o * n;
      const float32Array = new Float32Array(3 * l);
      const h = new Float32Array(3 * l);
      const d = new Float32Array(2 * l);
      const uint16Array = new Uint16Array((o - 1) * (n - 1) * 6);
      const p = PioneerPublicApi.Vector3.pool.get();
      const _ = PioneerPublicApi.LatLonAlt.pool.get();
      for (let e = 0; e < n; e++) for (let i = 0; i < o; i++) {
        _.lat = this._lowerLeftBounds.lat + e * r;
        _.lon = this._lowerLeftBounds.lon + i * a;
        _.alt = 0;
        const s = e * o + i;
        if (t.xyzFromLLA(p, _), float32Array[3 * s + 0] = p.x, float32Array[3 * s + 1] = p.y, float32Array[3 * s + 2] = p.z, t.upFromLLA(p, _), h[3 * s + 0] = p.x, h[3 * s + 1] = p.y, h[3 * s + 2] = p.z, d[2 * s + 0] = i / (o - 1), d[2 * s + 1] = 1 - e / (n - 1), e + 1 < n && i + 1 < o) {
          const t = e * (o - 1) + i;
          uint16Array[6 * t + 0] = o * (e + 0) + (i + 0);
          uint16Array[6 * t + 1] = o * (e + 1) + (i + 1);
          uint16Array[6 * t + 2] = o * (e + 1) + (i + 0);
          uint16Array[6 * t + 3] = o * (e + 0) + (i + 0);
          uint16Array[6 * t + 4] = o * (e + 0) + (i + 1);
          uint16Array[6 * t + 5] = o * (e + 1) + (i + 1);
        }
      }
      PioneerPublicApi.LatLonAlt.pool.release(_);
      PioneerPublicApi.Vector3.pool.release(p);
      const m = this.getThreeJsObjects()[0];
      PioneerPublicApi.ThreeJsHelper.setVertices(m.geometry, "position", float32Array);
      PioneerPublicApi.ThreeJsHelper.setVertices(m.geometry, "normal", h);
      PioneerPublicApi.ThreeJsHelper.setVertices(m.geometry, "uv", d);
      PioneerPublicApi.ThreeJsHelper.setIndices(m.geometry, uint16Array);
      this._textureInfos.has("normal") && PioneerPublicApi.ThreeJsHelper.computeTangents(m.geometry);
    } else {
      const e = 50;
      const i = PioneerPublicApi.Vector3.pool.get();
      const n = PioneerPublicApi.LatLonAlt.pool.get();
      for (let o = 0; o < 6; o++) {
        const r = this._cubeMapFaceFrames[o];
        const float32Array = new Float32Array(e * e * 3);
        const l = new Float32Array(e * e * 3);
        const c = new Float32Array(e * e * 2);
        const uint16Array = new Uint16Array((e - 1) * (e - 1) * 6);
        let d = false;
        const u = PioneerPublicApi.Vector3.pool.get();
        u.cross(r[0], r[1]);
        u.x === r[2].x && u.y === r[2].y && u.z === r[2].z || (d = true);
        PioneerPublicApi.Vector3.pool.release(u);
        let p = 0;
        let _ = 0;
        for (let o = 0; o < e; o++) for (let u = 0; u < e; u++) {
          i.mult(r[0], 2 * u / (e - 1) - 1);
          i.addMult(i, r[1], 2 * o / (e - 1) - 1);
          i.addMult(i, r[2], 1);
          i.normalize(i);
          PioneerPublicApi.Geometry.getLLAFromXYZOnSphere(n, i, 0);
          n.alt = 0;
          t.xyzFromLLA(i, n);
          float32Array[3 * p + 0] = i.x;
          float32Array[3 * p + 1] = i.y;
          float32Array[3 * p + 2] = i.z;
          t.upFromLLA(i, n);
          l[3 * p + 0] = i.x;
          l[3 * p + 1] = i.y;
          l[3 * p + 2] = i.z;
          c[2 * p + 0] = u / (e - 1);
          c[2 * p + 1] = 1 - o / (e - 1);
          u < e - 1 && o < e - 1 && (uint16Array[6 * _ + 0] = (o + 0) * e + (u + 0), uint16Array[6 * _ + 3] = (o + 1) * e + (u + 1), d ? (uint16Array[6 * _ + 1] = (o + 1) * e + (u + 1), uint16Array[6 * _ + 2] = (o + 0) * e + (u + 1), uint16Array[6 * _ + 4] = (o + 0) * e + (u + 0), uint16Array[6 * _ + 5] = (o + 1) * e + (u + 0)) : (uint16Array[6 * _ + 1] = (o + 0) * e + (u + 1), uint16Array[6 * _ + 2] = (o + 1) * e + (u + 1), uint16Array[6 * _ + 4] = (o + 1) * e + (u + 0), uint16Array[6 * _ + 5] = (o + 0) * e + (u + 0)), _ += 1);
          p += 1;
        }
        const m = this.getThreeJsObjects()[o];
        PioneerPublicApi.ThreeJsHelper.setVertices(m.geometry, "position", float32Array);
        PioneerPublicApi.ThreeJsHelper.setVertices(m.geometry, "normal", l);
        PioneerPublicApi.ThreeJsHelper.setVertices(m.geometry, "uv", c);
        PioneerPublicApi.ThreeJsHelper.setIndices(m.geometry, uint16Array);
        this._textureInfos.has("normal") && PioneerPublicApi.ThreeJsHelper.computeTangents(m.geometry);
      }
      PioneerPublicApi.LatLonAlt.pool.release(n);
      PioneerPublicApi.Vector3.pool.release(i);
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.addChangedCallback`、`t.removeChangedCallback`、`this._spheroidChangedCallback`。
   * 调用线索：e.addChangedCallback、t.removeChangedCallback、this._spheroidChangedCallback。
   */
  _spheroidRefChangedCallback(t, e) {
    null !== t && t.removeChangedCallback(this._spheroidChangedCallback);
    null !== e && e.addChangedCallback(this._spheroidChangedCallback);
    this._spheroidChangedCallback();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Math.max`、`t.getEquatorialRadius`、`t.getPolarRadius`、`this.__setRadius`、`this._spheroidComponentRef.get`、`this.resetResources`。
   * 调用线索：Math.max、t.getEquatorialRadius、t.getPolarRadius、this.__setRadius、this._spheroidComponentRef.get等。
   */
  _spheroidChangedCallback() {
    const t = this._spheroidComponentRef.get();
    null !== t ? this.__setRadius(Math.max(t.getEquatorialRadius(), t.getPolarRadius())) : this.__setRadius(0);
    this.resetResources();
  }
  _textureInfos;
  _mapping;
  _longitudinalRotation;
  _numFaces;
  _lowerLeftBounds;
  _upperRightBounds;
  _cubeMapFaceFrames;
  _shadowEntities;
  _materialOptions;
  _atmosphereComponentRef;
  _spheroidComponentRef;
}
export { SpheroidLODComponent };
