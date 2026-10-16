// Recovered from app.js:270137-303107.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class CMTSComponent extends PioneerPublicApi.BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._threeJsScene = this.getEntity().getScene().getThreeJsScene();
    this._endPoints = new PioneerPublicApi.FastMap();
    this._heightOffset = 0;
    this._heightScale = 1;
    this._numEndPointsLoading = 0;
    this._minLevel = Number.NEGATIVE_INFINITY;
    this._maxLevel = Number.POSITIVE_INFINITY;
    this._splitJoinThresholdFactor = 256;
    this._colorTileSize = NaN;
    this._shadowEntities = [];
    this._materialOptions = new Set();
    this._transparent = false;
    this._engine = this.getEntity().getScene().getEngine();
    this._cameraPositions = [];
    this._cameraFieldsOfView = [];
    this._rootTiles = null;
    this._loadedTiles = new PioneerPublicApi.FastSet();
    this._tilesLoadedPromise = null;
    this._transitionsCompleteCallback = null;
    this._atmosphereComponentRef = new PioneerPublicApi.ComponentRef(this.getEntity().getScene(), PioneerPublicApi.AtmosphereComponent, this.getEntity().getName());
    this._spheroidComponentRef = new PioneerPublicApi.ComponentRef(this.getEntity().getScene(), PioneerPublicApi.SpheroidComponent, this.getEntity().getName());
    this._spheroidComponentRef.setRefChangedCallback(this._spheroidRefChangedCallback.bind(this));
    this._spheroidChangedCallback = this._spheroidChangedCallback.bind(this);
    this.__setUsesEntityOrientation(true);
    this.setIsGroundComponent(true);
  }
  setBaseUrl(t, e) {
    this.resetResources();
    void 0 !== e ? this._endPoints.set(t, {
      url: e,
      configuration: null
    }) : this._endPoints.delete(t);
  }
  getHeightOffset() {
    return this._heightOffset;
  }
  setHeightOffset(heightOffset) {
    this._heightOffset = heightOffset;
    this.resetResources();
  }
  getHeightScale() {
    return this._heightScale;
  }
  setHeightScale(heightScale) {
    this._heightScale = heightScale;
    this.resetResources();
  }
  getMinLevel() {
    return this._minLevel;
  }
  setMinLevel(minLevel) {
    this._minLevel = minLevel;
  }
  getMaxLevel() {
    return this._maxLevel;
  }
  setMaxLevel(maxLevel) {
    this._maxLevel = maxLevel;
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
  isMaterialOptionEnabled(t) {
    return this._materialOptions.has(t);
  }
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
  getGroundPosition(t, e, i) {
    const n = this._spheroidComponentRef.get();
    if (null === n) return void t.copy(PioneerPublicApi.Vector3.NaN);
    const o = PioneerPublicApi.LatLonAlt.pool.get();
    n.llaFromXYZ(o, i);
    if (void 0 !== this._endPoints.get("height") && this._rootTiles) {
      const t = PioneerPublicApi.Vector3.pool.get();
      const e = PioneerPublicApi.Vector3.pool.get();
      o.alt = 1;
      PioneerPublicApi.Geometry.getXYZFromLLAOnSphere(e, o, 0);
      PioneerPublicApi.CubeMap.xyzToUVFace(t, e);
      let i = this._rootTiles[t.z];
      for (; i && !i.isVisible() && i.getChildren().length > 0;) {
        const e = 1 << i.getLevel() + 1;
        const s = Math.floor(t.x * e - 2 * i.getTileCoord().x);
        const n = Math.floor(t.y * e - 2 * i.getTileCoord().y);
        i = i.getChildren()[2 * n + s];
      }
      if (i && i.isVisible()) {
        const e = i.getHeight(t);
        o.alt = e;
      } else o.alt = this._heightOffset;
      PioneerPublicApi.Vector3.pool.release(e);
      PioneerPublicApi.Vector3.pool.release(t);
    } else o.alt = this._heightOffset;
    n.xyzFromLLA(t, o);
    e && n.upFromLLA(e, o);
    PioneerPublicApi.LatLonAlt.pool.release(o);
  }
  areTilesLoaded() {
    return null === this._tilesLoadedPromise;
  }
  async getTilesLoadedPromise(t = .25, e = Number.POSITIVE_INFINITY) {
    return (0, PioneerPublicApi.waitUntil)(() => {
      for (let t = 0, e = this._loadedTiles.getSize(); t < e; t++) {
        if (!this._loadedTiles.getAt(t).isFullyLoaded()) return false;
      }
      return true;
    }, t, e);
  }
  setSpheroidReference(t) {
    this._spheroidComponentRef.set(this.getEntity().getName(), t);
  }
  setTransparent(transparent) {
    this._transparent = transparent;
    this.resetResources();
  }
  __destroy() {
    const t = this._spheroidComponentRef.get();
    null !== t && t.removeChangedCallback(this._spheroidChangedCallback);
    super.__destroy();
  }
  __update() {
    if (this._spheroidComponentRef.update(), "loaded" !== this.getLoadState().state || null === this._spheroidComponentRef.get()) return;
    if (null === this._rootTiles) {
      if (this._numEndPointsLoading > 0) return;
      this._rootTiles = [];
      for (let t = 0; t < 6; t++) {
        const cMTSTile = new CMTSTile(this, null, t, 0, new PioneerPublicApi.Vector2(0, 0), 0, 0);
        this._rootTiles.push(cMTSTile);
        cMTSTile.forceLoad();
      }
    }
    for (; this._cameraPositions.length > this._engine.getNumViewports();) {
      this._cameraPositions.pop();
      this._cameraFieldsOfView.pop();
    }
    for (; this._cameraPositions.length < this._engine.getNumViewports();) {
      this._cameraPositions.push(new PioneerPublicApi.Vector3());
      this._cameraFieldsOfView.push(1);
    }
    for (let t = 0, e = this._engine.getNumViewports(); t < e; t++) {
      const e = this._cameraPositions[t];
      const i = this._engine.getViewportAt(t).getCamera();
      i && (i.getEntity().getPositionRelativeToEntity(e, PioneerPublicApi.Vector3.Zero, this.getEntity()), e.rotateInverse(this.getEntity().getOrientation(), e), this._cameraFieldsOfView[t] = i.getFieldOfView());
    }
    let t = false;
    for (let e = 0, i = this._loadedTiles.getSize(); e < i; e++) {
      const i = this._loadedTiles.getAt(e);
      t ||= i.update();
    }
    if (null === this._tilesLoadedPromise && t && (this._tilesLoadedPromise = new Promise(transitionsCompleteCallback => {
      this._transitionsCompleteCallback = transitionsCompleteCallback;
    })), null !== this._tilesLoadedPromise && !t) {
      const transitionsCompleteCallback = this._transitionsCompleteCallback;
      this._tilesLoadedPromise = null;
      this._transitionsCompleteCallback = null;
      transitionsCompleteCallback && transitionsCompleteCallback();
    }
  }
  __prepareForRender(t) {
    for (let e = 0, i = this._loadedTiles.getSize(); e < i; e++) {
      this._loadedTiles.getAt(e).prepareForRender(t);
    }
    PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects(), this.getEntity());
    const e = this._atmosphereComponentRef.get();
    PioneerPublicApi.MaterialUtils.setUniforms(this.getThreeJsMaterials(), t, this.getEntity(), this._shadowEntities, e, true);
  }
  async __loadResources() {
    const t = [];
    for (let e = 0, i = this._endPoints.getSize(); e < i; e++) {
      const i = this._endPoints.getAt(e);
      const s = i.value.url;
      this._numEndPointsLoading += 1;
      const n = this.getEntity().getScene().getEngine().getDownloader().download(`${s}/configuration.json`, "text", -this.getEntity().getLeastCameraDepth()).then(t => {
        const e = JSON.parse(t.content);
        i.value.configuration = e;
        "color" === i.key && (this._colorTileSize = e.tile_size);
        this._numEndPointsLoading -= 1;
      });
      t.push(n);
    }
    await Promise.allSettled(t);
  }
  __unloadResources() {
    if (this._rootTiles) for (let t = 0; t < 6; t++) this._rootTiles[t].destroy();
    this._rootTiles = null;
  }
  __getEndPoints() {
    return this._endPoints;
  }
  __endPointsAreLoaded() {
    return 0 === this._numEndPointsLoading;
  }
  __getCameraPositions() {
    return this._cameraPositions;
  }
  __getCameraFieldsOfView() {
    return this._cameraFieldsOfView;
  }
  __getThreeJsScene() {
    return this._threeJsScene;
  }
  __getSplitJoinThresholdFactor() {
    return this._splitJoinThresholdFactor;
  }
  __getColorTileSize() {
    return this._colorTileSize;
  }
  __getSpheroidComponent() {
    return this._spheroidComponentRef.get();
  }
  __addLoadedTile(t) {
    this._loadedTiles.add(t);
  }
  __removeLoadedTile(t) {
    this._loadedTiles.delete(t);
  }
  __getTransparent() {
    return this._transparent;
  }
  __getMaterialOptions() {
    return this._materialOptions;
  }
  _spheroidRefChangedCallback(t, e) {
    t && t.removeChangedCallback(this._spheroidChangedCallback);
    e && e.addChangedCallback(this._spheroidChangedCallback);
    this._spheroidChangedCallback();
  }
  _spheroidChangedCallback() {
    const t = this._spheroidComponentRef.get();
    null !== t ? this.__setRadius(Math.max(t.getEquatorialRadius(), t.getPolarRadius())) : this.__setRadius(0);
    this.resetResources();
  }
  _threeJsScene;
  _endPoints;
  _heightOffset;
  _heightScale;
  _numEndPointsLoading;
  _minLevel;
  _maxLevel;
  _splitJoinThresholdFactor;
  _colorTileSize;
  _shadowEntities;
  _materialOptions;
  _transparent;
  _engine;
  _cameraPositions;
  _cameraFieldsOfView;
  _rootTiles;
  _loadedTiles;
  _tilesLoadedPromise;
  _transitionsCompleteCallback;
  _atmosphereComponentRef;
  _spheroidComponentRef;
}
class CMTSTile extends PioneerPublicApi.Tile {
  constructor(component, e, face, level, o, row, col) {
    super(e);
    this._component = component;
    this._resourceManager = component.getEngine().getResourceManager();
    this._face = face;
    this._level = level;
    this._levelPow = 2 ** -Math.max(0, level);
    this._tile = new PioneerPublicApi.Vector2();
    this._tile.copy(o);
    this._row = row;
    this._col = col;
    this._isLeaf = true;
    this._center = new PioneerPublicApi.Vector3();
    this._radius = 0;
    this._textureLevels = new PioneerPublicApi.FastMap();
    this._numNonPositiveTexturesLoading = 0;
    this._tempNumVertsPerSide = 0;
    this._tempThreeJsMaterial = null;
    this._tempThreeJsObject = null;
    this._threeJsMaterial = null;
    this._threeJsObject = null;
    this._positionIndexToUpdate = 0;
    this._heightData = null;
    this._numVertsPerSide = 0;
    this._uvOffsets = new PioneerPublicApi.FastMap();
    this._uvScales = new PioneerPublicApi.FastMap();
    this._heightOffset = 0;
    this._heightScale = 1;
    this._tempMeshPositions = new Float32Array(0);
    this._meshPositions = new Float32Array(0);
    this._meshNormals = new Float32Array(0);
    this._meshUVs = new PioneerPublicApi.FastMap();
    this._meshIndices = new Uint16Array(0);
    this._fullyLoaded = false;
    this._visible = false;
    for (let t = 0; t < this._component.__getEndPoints().getSize(); t++) {
      const e = this._component.__getEndPoints().getAt(t).value.configuration;
      if (e) for (let t = 0; t < 2; t++) for (let i = 0; i < 2; i++) this._isLeaf &&= !CMTSTile._isInABoundary(e, this._face, this._level + 1, new PioneerPublicApi.Vector2(2 * this._tile.x + i, 2 * this._tile.y + t));
    }
    const l = component.__getSpheroidComponent();
    if (!l) throw new Error(`No spheroid component on the ${component}!`);
    CMTSTile.cmtsCoordToPosition(this._center, this._face, this._levelPow, this._tile.x + .5, this._tile.y + .5, l);
    const vector3 = new PioneerPublicApi.Vector3();
    const h = new PioneerPublicApi.Vector3();
    const d = new PioneerPublicApi.Vector3();
    const u = new PioneerPublicApi.Vector3();
    CMTSTile.cmtsCoordToPosition(vector3, this._face, this._levelPow, this._tile.x, this._tile.y, l);
    CMTSTile.cmtsCoordToPosition(h, this._face, this._levelPow, this._tile.x + 1, this._tile.y, l);
    CMTSTile.cmtsCoordToPosition(d, this._face, this._levelPow, this._tile.x + 1, this._tile.y + 1, l);
    CMTSTile.cmtsCoordToPosition(u, this._face, this._levelPow, this._tile.x, this._tile.y + 1, l);
    this._radius = Math.max(vector3.distance(this._center), h.distance(this._center), d.distance(this._center), u.distance(this._center));
    const p = this._component.__getEndPoints();
    for (let t = 0; t < p.getSize(); t++) {
      const e = p.getAt(t);
      const i = e.key;
      const s = e.value;
      let n;
      if (s.configuration && CMTSTile._isInABoundary(s.configuration, this._face, this._level, this._tile)) {
        const t = 0 === this._level && "height" !== i ? this._getNonPositiveLevel(i) : 0;
        n = 0 === this._level ? t : this._level;
        isNaN(n) || this._textureLevels.set(i, n);
      } else n = this.getParent()?._textureLevels.getAt(t).value ?? 0;
      this._textureLevels.set(i, n);
    }
    for (let t = 0; t < this._textureLevels.getSize(); t++) {
      const {
        key: key,
        value: value
      } = this._textureLevels.getAt(t);
      const n = 1 << this._level - Math.max(0, value);
      this._uvOffsets.set(key, new PioneerPublicApi.Vector2((this._tile.x - Math.floor(this._tile.x / n) * n) / n, (this._tile.y - Math.floor(this._tile.y / n) * n) / n));
      this._uvScales.set(key, 1 / n);
    }
    const _ = this._component.__getEndPoints().get("height")?.configuration;
    this._numVertsPerSide = 1 << Math.max(5 - this._level, 0) + 3;
    _ && (this._numVertsPerSide = Math.max(_.tile_size * this._uvScales.get("height") + 3, this._numVertsPerSide));
  }
  getLevel() {
    return this._level;
  }
  getTileCoord() {
    return this._tile;
  }
  hasHeightData() {
    return null !== this._heightData;
  }
  isFullyLoaded() {
    return this._fullyLoaded;
  }
  getHeight(t) {
    const e = 1 << this._level;
    const i = t.x * e - this._tile.x;
    const s = t.y * e - this._tile.y;
    const r = this._fullyLoaded ? this._numVertsPerSide : this._tempNumVertsPerSide;
    const l = i * (r - 3) + 1;
    const c = s * (r - 3) + 1;
    const h = this._fullyLoaded ? this._meshPositions : this._tempMeshPositions;
    this._getFromData(float32Array, 0, l, c, h, r);
    vector3.set(float32Array[0], float32Array[1], float32Array[2]);
    vector3.add(vector3, this._center);
    const d = this._component.__getSpheroidComponent();
    return d ? (d.llaFromXYZ(latLonAlt, vector3), latLonAlt.alt) : 0;
  }
  createNewTile(t, e, i) {
    const n = this._level + 1;
    const vector2 = new PioneerPublicApi.Vector2(2 * t._tile.x + i, 2 * t._tile.y + e);
    return new CMTSTile(t._component, this, this._face, n, vector2, e, i);
  }
  checkSplit() {
    if (this._isLeaf || this._level >= this._component.getMaxLevel()) return false;
    if (this._level < this._component.getMinLevel()) return true;
    const t = this._component.__getColorTileSize();
    return this._getNearestDistance() < this._component.__getSplitJoinThresholdFactor() * this._radius / t;
  }
  checkJoin() {
    if (this._level >= this._component.getMaxLevel()) return true;
    if (this._level < this._component.getMinLevel()) return false;
    const t = this._component.__getColorTileSize();
    return this._getNearestDistance() > this._component.__getSplitJoinThresholdFactor() * this._radius / t * 4;
  }
  async load() {
    (await this._createTempObject()) ? this._createObject() : await this._createObject();
    this._component.__addLoadedTile(this);
  }
  unload() {
    this._component.__removeLoadedTile(this);
    this._fullyLoaded = false;
    this._tempThreeJsObject && (this._tempMeshPositions = new Float32Array(0), this._destroyObject(this._tempThreeJsObject), this._tempThreeJsMaterial = null, this._tempThreeJsObject = null);
    this._threeJsObject && (this._meshPositions = new Float32Array(0), this._meshNormals = new Float32Array(0), this._meshTangents && (this._meshTangents = new Float32Array(0)), this._meshBitangents && (this._meshBitangents = new Float32Array(0)), this._meshUVs = new PioneerPublicApi.FastMap(), this._meshIndices = new Uint16Array(0), this._destroyObject(this._threeJsObject), this._threeJsMaterial = null, this._threeJsObject = null);
    this._heightData && (this._resourceManager.release(this._component, this._heightData, "imageData"), this._heightData = null);
  }
  isVisible() {
    return this._visible;
  }
  setVisible(visible) {
    this._visible = visible;
  }
  update() {
    if (!this._component.__endPointsAreLoaded()) return false;
    let t = this.check();
    const e = this.getParent();
    if (t || e?.getChildren()[0] !== this || (t ||= e.check()), !t && this._fullyLoaded && this._threeJsMaterial && 0 === this._numNonPositiveTexturesLoading && 0 === this._level && 0 === this.getChildren().length) {
      const t = this._component.__getEndPoints();
      for (let e = 0; e < t.getSize(); e++) {
        const i = t.getAt(e);
        const n = i.key;
        if ("height" === n) continue;
        const o = i.value;
        if (!o.configuration) continue;
        const r = this._getNonPositiveLevel(n);
        if (isFinite(r) && r !== this._textureLevels.get(n)) {
          this._textureLevels.set(n, r);
          this._numNonPositiveTexturesLoading += 1;
          const t = `${o.url}/${this._face}/${r}/0/0.${o.configuration.extension}`;
          this._loadTexture(n, t, this._threeJsMaterial).then(() => {
            const t = this._uvOffsets.get(n);
            const e = this._uvScales.get(n);
            const i = this._meshUVs.get(n);
            if (this._fullyLoaded && this._threeJsObject && t && void 0 !== e && i) {
              const o = this._component.__getColorTileSize() >> -r;
              for (let s = 0, numVertsPerSide = this._numVertsPerSide; s < numVertsPerSide; s++) for (let n = 0, r = this._numVertsPerSide; n < r; n++) {
                const r = s * this._numVertsPerSide + n;
                i[2 * r + 0] = ((t.x + e * (n - 1) / (this._numVertsPerSide - 3)) * o + 2) / (o + 4);
                i[2 * r + 1] = 1 - ((t.y + e * (s - 1) / (this._numVertsPerSide - 3)) * o + 2) / (o + 4);
              }
              PioneerPublicApi.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "color" === n ? "uv" : `${n}UV`, i);
            }
          }).finally(() => {
            this._numNonPositiveTexturesLoading -= 1;
          });
        }
      }
    }
    return this._numNonPositiveTexturesLoading > 0 || t;
  }
  async _createTempObject() {
    let t = this;
    const vector2 = new PioneerPublicApi.Vector2(0, 0);
    let i = 1;
    for (; t && !t._fullyLoaded;) {
      vector2.set((t._col + vector2.x) / 2, (t._row + vector2.y) / 2);
      i *= .5;
      t = t.getParent();
    }
    if (!t) return false;
    this._tempThreeJsMaterial = PioneerPublicApi.MaterialUtils.get();
    this._component.getThreeJsMaterials().push(this._tempThreeJsMaterial);
    this._tempThreeJsMaterial.defines.shadowEntities = this._component.getNumShadowEntities() > 0;
    for (const t of this._component.__getMaterialOptions()) this._tempThreeJsMaterial.defines[t] = true;
    const n = this._component.__getEndPoints();
    const r = [];
    for (let e = 0; e < n.getSize(); e++) {
      const i = n.getAt(e);
      const s = i.key;
      const o = i.value;
      if (!o.configuration) continue;
      const a = t._textureLevels.get(s);
      if (void 0 === a || !isFinite(a)) continue;
      const l = t._tile.x >> t._level - a;
      const c = t._tile.y >> t._level - a;
      const h = `${o.url}/${t._face}/${a}/${l}/${c}.${o.configuration.extension}`;
      r.push(this._loadTexture(s, h, this._tempThreeJsMaterial));
    }
    await Promise.allSettled(r);
    const a = [];
    this._tempNumVertsPerSide = 3 + (this._numVertsPerSide - 3 >> 3);
    const l = this._tempNumVertsPerSide * this._tempNumVertsPerSide;
    const c = new Float32Array(3 * l);
    this._tempMeshPositions = c;
    a.push({
      name: "position",
      dimensions: 3
    });
    const float32Array = new Float32Array(3 * l);
    let d;
    let u;
    a.push({
      name: "normal",
      dimensions: 3
    });
    this._textureLevels.has("normal") && (d = new Float32Array(3 * l), a.push({
      name: "tangent",
      dimensions: 3
    }), u = new Float32Array(3 * l), a.push({
      name: "bitangent",
      dimensions: 3
    }));
    const map = new Map();
    for (let t = 0; t < this._textureLevels.getSize(); t++) {
      const e = this._textureLevels.getAt(t).key;
      "height" !== e && (map.set(e, new Float32Array(2 * l)), a.push({
        name: "color" === e ? "uv" : `${e}UV`,
        dimensions: 2
      }));
    }
    const _ = (this._tempNumVertsPerSide - 1) * (this._tempNumVertsPerSide - 1) * 6;
    let m;
    m = _ <= 65536 ? new Uint16Array(_) : new Uint32Array(_);
    for (let n = 0, tempNumVertsPerSide = this._tempNumVertsPerSide; n < tempNumVertsPerSide; n++) for (let r = 0, a = this._tempNumVertsPerSide; r < a; r++) {
      const a = vector2.x + PioneerPublicApi.MathUtils.clamp01((r - 1) / (this._tempNumVertsPerSide - 3)) * i;
      const l = vector2.y + PioneerPublicApi.MathUtils.clamp01((n - 1) / (this._tempNumVertsPerSide - 3)) * i;
      const _ = a * (t._numVertsPerSide - 3) + 1;
      const m = l * (t._numVertsPerSide - 3) + 1;
      const g = n * this._tempNumVertsPerSide + r;
      const y = 3 * g;
      this._getFromData(c, y, _, m, t._meshPositions, t._numVertsPerSide);
      vector3.set(c[y + 0] + t._center.x, c[y + 1] + t._center.y, c[y + 2] + t._center.z);
      !this._component.__getTransparent() && (0 === r || 0 === n || r >= this._tempNumVertsPerSide - 1 || n >= this._tempNumVertsPerSide - 1) && this._adjustForTagHeight(vector3);
      c[y + 0] = vector3.x - this._center.x;
      c[y + 1] = vector3.y - this._center.y;
      c[y + 2] = vector3.z - this._center.z;
      this._getFromData(float32Array, y, _, m, t._meshNormals, t._numVertsPerSide);
      d && this._getFromData(d, y, _, m, t._meshTangents, t._numVertsPerSide);
      u && this._getFromData(u, y, _, m, t._meshBitangents, t._numVertsPerSide);
      for (let e = 0; e < t._textureLevels.getSize(); e++) {
        const {
          key: key,
          value: value
        } = t._textureLevels.getAt(e);
        if ("height" === key) continue;
        const n = map.get(key);
        const o = t._meshUVs.get(key);
        if (n && o) {
          const e = t._uvOffsets.get(key);
          const o = t._uvScales.get(key);
          const r = this._component.__getColorTileSize() >> Math.max(0, -value);
          n[2 * g + 0] = ((e.x + o * a) * r + 2) / (r + 4);
          n[2 * g + 1] = 1 - ((e.y + o * l) * r + 2) / (r + 4);
        }
      }
    }
    for (let t = 0, tempNumVertsPerSide = this._tempNumVertsPerSide; t < tempNumVertsPerSide; t++) for (let e = 0, i = this._tempNumVertsPerSide; e < i; e++) {
      const i = t * (this._tempNumVertsPerSide - 1) + e;
      m[6 * i + 0] = this._tempNumVertsPerSide * (t + 0) + (e + 0);
      m[6 * i + 1] = this._tempNumVertsPerSide * (t + 0) + (e + 1);
      m[6 * i + 2] = this._tempNumVertsPerSide * (t + 1) + (e + 1);
      m[6 * i + 3] = this._tempNumVertsPerSide * (t + 0) + (e + 0);
      m[6 * i + 4] = this._tempNumVertsPerSide * (t + 1) + (e + 1);
      m[6 * i + 5] = this._tempNumVertsPerSide * (t + 1) + (e + 0);
    }
    this._tempThreeJsObject = PioneerPublicApi.ThreeJsHelper.createMeshObject(this._component, this._tempThreeJsMaterial, a, false);
    this._component.getThreeJsObjects().push(this._tempThreeJsObject);
    PioneerPublicApi.ThreeJsHelper.useInDynEnvMap(this._tempThreeJsObject, true);
    PioneerPublicApi.ThreeJsHelper.setVertices(this._tempThreeJsObject.geometry, "position", c);
    PioneerPublicApi.ThreeJsHelper.setVertices(this._tempThreeJsObject.geometry, "normal", float32Array);
    d && PioneerPublicApi.ThreeJsHelper.setVertices(this._tempThreeJsObject.geometry, "tangent", d);
    u && PioneerPublicApi.ThreeJsHelper.setVertices(this._tempThreeJsObject.geometry, "bitangent", u);
    for (let t = 0; t < this._textureLevels.getSize(); t++) {
      const e = this._textureLevels.getAt(t).key;
      if ("height" === e) continue;
      const i = map.get(e);
      PioneerPublicApi.ThreeJsHelper.setVertices(this._tempThreeJsObject.geometry, "color" === e ? "uv" : `${e}UV`, i);
    }
    PioneerPublicApi.ThreeJsHelper.setIndices(this._tempThreeJsObject.geometry, m);
    return true;
  }
  async _createObject() {
    const t = this._component.__getEndPoints();
    const e = {};
    for (let i = 0; i < t.getSize(); i++) {
      const s = t.getAt(i);
      const n = s.key;
      const o = s.value;
      if (!o.configuration) continue;
      const r = this._textureLevels.get(n);
      if (void 0 === r || !isFinite(r)) continue;
      const a = this._tile.x >> this._level - Math.max(0, r);
      const l = this._tile.y >> this._level - Math.max(0, r);
      const c = `${o.url}/${this._face}/${r}/${a}/${l}.${o.configuration.extension}`;
      e[n] = "height" === n ? {
        url: c,
        type: "imageData"
      } : {
        url: c,
        type: "texture"
      };
    }
    const i = -this._component.getEntity().getLeastCameraDepth() + this._level / 100;
    const n = await this._resourceManager.acquireMultiple(this._component, e, i);
    if (this.isDestroyed()) {
      for (const [t, e] of PioneerPublicApi.ObjectUtils.entries(n)) this._resourceManager.release(this._component, e, "height" === t ? "imageData" : "texture");
      return;
    }
    const o = this._textureLevels.has("normal");
    const r = this._uvOffsets.get("height");
    const a = this._uvScales.get("height");
    this._heightOffset = this._component.getHeightOffset();
    const l = this._component.__getEndPoints().get("height")?.configuration;
    l && (this._heightOffset += l.height_range.min * this._component.getHeightScale(), this._heightScale = (l.height_range.max - l.height_range.min) * this._component.getHeightScale());
    this._threeJsMaterial = PioneerPublicApi.MaterialUtils.get();
    this._component.getThreeJsMaterials().push(this._threeJsMaterial);
    this._threeJsMaterial.defines.shadowEntities = this._component.getNumShadowEntities() > 0;
    for (const t of this._component.__getMaterialOptions()) this._threeJsMaterial.defines[t] = true;
    for (const [t, e] of PioneerPublicApi.ObjectUtils.entries(n)) this._setTexture(t, e, this._threeJsMaterial);
    const c = [];
    const h = this._numVertsPerSide * this._numVertsPerSide;
    this._meshPositions = new Float32Array(3 * h);
    c.push({
      name: "position",
      dimensions: 3
    });
    this._meshNormals = new Float32Array(3 * h);
    c.push({
      name: "normal",
      dimensions: 3
    });
    this._textureLevels.has("normal") && (this._meshTangents = new Float32Array(3 * h), c.push({
      name: "tangent",
      dimensions: 3
    }), this._meshBitangents = new Float32Array(3 * h), c.push({
      name: "bitangent",
      dimensions: 3
    }));
    for (let t = 0; t < this._textureLevels.getSize(); t++) {
      const e = this._textureLevels.getAt(t).key;
      this._meshUVs.set(e, new Float32Array(2 * h));
      c.push({
        name: "color" === e ? "uv" : `${e}UV`,
        dimensions: 2
      });
    }
    const d = (this._numVertsPerSide - 1) * (this._numVertsPerSide - 1) * 6;
    this._meshIndices = d <= 65536 ? new Uint16Array(d) : new Uint32Array(d);
    this._threeJsObject = PioneerPublicApi.ThreeJsHelper.createMeshObject(this._component, this._threeJsMaterial, c, false);
    this._component.getThreeJsObjects().push(this._threeJsObject);
    PioneerPublicApi.ThreeJsHelper.useInDynEnvMap(this._threeJsObject, true);
    for (let t = 0, numVertsPerSide = this._numVertsPerSide; t < numVertsPerSide; t++) for (let e = 0, i = this._numVertsPerSide; e < i; e++) {
      const i = t * (this._numVertsPerSide - 1) + e;
      this._meshIndices[6 * i + 0] = this._numVertsPerSide * (t + 0) + (e + 0);
      this._meshIndices[6 * i + 1] = this._numVertsPerSide * (t + 0) + (e + 1);
      this._meshIndices[6 * i + 2] = this._numVertsPerSide * (t + 1) + (e + 1);
      this._meshIndices[6 * i + 3] = this._numVertsPerSide * (t + 0) + (e + 0);
      this._meshIndices[6 * i + 4] = this._numVertsPerSide * (t + 1) + (e + 1);
      this._meshIndices[6 * i + 5] = this._numVertsPerSide * (t + 1) + (e + 0);
    }
    PioneerPublicApi.ThreeJsHelper.setIndices(this._threeJsObject.geometry, this._meshIndices);
    const u = this._component.__getSpheroidComponent();
    if (u) {
      if (await new Promise(t => {
        this._positionIndexToUpdate = 0;
        const e = setInterval(() => {
          const i = this._component.getEntity().getScene().getEngine().getFPS();
          const s = Math.floor(50 * i);
          const n = this._positionIndexToUpdate + s;
          for (; this._positionIndexToUpdate < n; this._positionIndexToUpdate++) {
            if (this.isDestroyed() || !this._threeJsObject || this._positionIndexToUpdate >= h) {
              clearInterval(e);
              t();
              break;
            }
            this._updateVertex(this._positionIndexToUpdate, u, o, r, a);
          }
        }, 0);
      }), !this.isDestroyed() && this._threeJsObject) {
        PioneerPublicApi.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "position", this._meshPositions);
        PioneerPublicApi.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "normal", this._meshNormals);
        this._meshTangents && PioneerPublicApi.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "tangent", this._meshTangents);
        this._meshBitangents && PioneerPublicApi.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "bitangent", this._meshBitangents);
        for (let t = 0; t < this._textureLevels.getSize(); t++) {
          const e = this._textureLevels.getAt(t).key;
          const i = this._meshUVs.get(e);
          PioneerPublicApi.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "color" === e ? "uv" : `${e}UV`, i);
        }
        this._tempThreeJsObject && (this._tempMeshPositions = new Float32Array(0), this._destroyObject(this._tempThreeJsObject), this._tempThreeJsMaterial = null, this._tempThreeJsObject = null);
        this._heightData && (this._resourceManager.release(this._component, this._heightData, "imageData"), this._heightData = null);
        this._fullyLoaded = true;
      } else this.unload();
    } else this.unload();
  }
  _destroyObject(t) {
    const e = t.material;
    const i = this._component.__getEndPoints();
    for (let t = 0; t < i.getSize(); t++) {
      const n = i.getAt(t).key;
      if ("height" === n) continue;
      const o = e.uniforms[`${n}Texture`].value;
      o instanceof PioneerPublicApi.THREE.Texture && this._resourceManager.release(this._component, o, "texture");
    }
    PioneerPublicApi.ThreeJsHelper.destroyMaterial(e, false);
    const n = this._component.getThreeJsMaterials();
    for (let t = 0, i = n.length; t < i; t++) if (n[t] === e) {
      n.splice(t, 1);
      break;
    }
    PioneerPublicApi.ThreeJsHelper.destroyObject(t, this._component);
    const o = this._component.getThreeJsObjects();
    for (let e = 0, i = o.length; e < i; e++) if (o[e] === t) {
      o.splice(e, 1);
      break;
    }
  }
  _getFromData(t, e, i, n, o, r) {
    const a = Math.floor(i);
    const l = Math.floor(n);
    const c = i - a;
    const h = n - l;
    const d = 3 * (l * r + a);
    const u = 3 * ((l + 1) * r + a);
    const p = 3 * (l * r + (a + 1));
    const _ = 3 * ((l + 1) * r + (a + 1));
    t[e + 0] = PioneerPublicApi.MathUtils.lerp(PioneerPublicApi.MathUtils.lerp(o[d + 0], o[u + 0], h), PioneerPublicApi.MathUtils.lerp(o[p + 0], o[_ + 0], h), c);
    t[e + 1] = PioneerPublicApi.MathUtils.lerp(PioneerPublicApi.MathUtils.lerp(o[d + 1], o[u + 1], h), PioneerPublicApi.MathUtils.lerp(o[p + 1], o[_ + 1], h), c);
    t[e + 2] = PioneerPublicApi.MathUtils.lerp(PioneerPublicApi.MathUtils.lerp(o[d + 2], o[u + 2], h), PioneerPublicApi.MathUtils.lerp(o[p + 2], o[_ + 2], h), c);
  }
  _updateVertex(t, e, i, n, g) {
    const y = t % this._numVertsPerSide;
    const f = Math.floor(t / this._numVertsPerSide);
    const T = this._tile.x + (y - 1) / (this._numVertsPerSide - 3);
    const b = this._tile.y + (f - 1) / (this._numVertsPerSide - 3);
    const E = this._tile.x + PioneerPublicApi.MathUtils.clamp01((y - 1) / (this._numVertsPerSide - 3));
    const S = this._tile.y + PioneerPublicApi.MathUtils.clamp01((f - 1) / (this._numVertsPerSide - 3));
    if (CMTSTile.cmtsCoordToPosition(vector3, this._face, this._levelPow, E, S, e), e.llaFromXYZ(latLonAlt, vector3), e.upFromLLA(r, latLonAlt), e.isPlanetographic() || r.normalize(vector3), this._heightData && n && void 0 !== g) {
      const t = this._heightData.data;
      const a = this._heightData.width - 4;
      CMTSTile.getHeightPos(vector3, r, PioneerPublicApi.MathUtils.clamp(y, 1, this._numVertsPerSide - 2), PioneerPublicApi.MathUtils.clamp(f, 1, this._numVertsPerSide - 2), t, n, this._numVertsPerSide, g, a, this._heightOffset, this._heightScale);
      i || (CMTSTile.cmtsCoordToPosition(l, this._face, this._levelPow, T - 1 / (this._numVertsPerSide - 3), b, e), CMTSTile.getHeightPos(l, r, y - 1, f, t, n, this._numVertsPerSide, g, a, this._heightOffset, this._heightScale), CMTSTile.cmtsCoordToPosition(c, this._face, this._levelPow, T + 1 / (this._numVertsPerSide - 3), b, e), CMTSTile.getHeightPos(c, r, y + 1, f, t, n, this._numVertsPerSide, g, a, this._heightOffset, this._heightScale), CMTSTile.cmtsCoordToPosition(h, this._face, this._levelPow, T, b - 1 / (this._numVertsPerSide - 3), e), CMTSTile.getHeightPos(h, r, y, f - 1, t, n, this._numVertsPerSide, g, a, this._heightOffset, this._heightScale), CMTSTile.cmtsCoordToPosition(d, this._face, this._levelPow, T, b + 1 / (this._numVertsPerSide - 3), e), CMTSTile.getHeightPos(d, r, y, f + 1, t, n, this._numVertsPerSide, g, a, this._heightOffset, this._heightScale), CMTSTile.cmtsCoordToPosition(u, this._face, this._levelPow, T - 1 / (this._numVertsPerSide - 3), b - 1 / (this._numVertsPerSide - 3), e), CMTSTile.getHeightPos(u, r, y - 1, f - 1, t, n, this._numVertsPerSide, g, a, this._heightOffset, this._heightScale), CMTSTile.cmtsCoordToPosition(p, this._face, this._levelPow, T + 1 / (this._numVertsPerSide - 3), b + 1 / (this._numVertsPerSide - 3), e), CMTSTile.getHeightPos(p, r, y + 1, f + 1, t, n, this._numVertsPerSide, g, a, this._heightOffset, this._heightScale), l.sub(c, l), h.sub(d, h), r.cross(l, h), r.normalize(r));
    } else vector3.addMult(vector3, r, this._heightOffset);
    this._component.__getTransparent() || 0 !== y && 0 !== f && y !== this._numVertsPerSide - 1 && f !== this._numVertsPerSide - 1 || this._adjustForTagHeight(vector3);
    vector3.sub(vector3, this._center);
    this._meshPositions[3 * t + 0] = vector3.x;
    this._meshPositions[3 * t + 1] = vector3.y;
    this._meshPositions[3 * t + 2] = vector3.z;
    this._meshNormals[3 * t + 0] = r.x;
    this._meshNormals[3 * t + 1] = r.y;
    this._meshNormals[3 * t + 2] = r.z;
    this._meshTangents && (CMTSTile.cmtsCoordToTangent(_, this._face, this._levelPow, T, b, e), this._meshTangents[3 * t + 0] = _.x, this._meshTangents[3 * t + 1] = _.y, this._meshTangents[3 * t + 2] = _.z);
    this._meshBitangents && (CMTSTile.cmtsCoordToBitangent(m, this._face, this._levelPow, T, b, e), this._meshBitangents[3 * t + 0] = m.x, this._meshBitangents[3 * t + 1] = m.y, this._meshBitangents[3 * t + 2] = m.z);
    for (let e = 0; e < this._textureLevels.getSize(); e++) {
      const {
        key: key,
        value: value
      } = this._textureLevels.getAt(e);
      const n = this._uvOffsets.get(key);
      const o = this._uvScales.get(key);
      const r = this._meshUVs.get(key);
      if (n && void 0 !== o && r) {
        const e = this._component.__getColorTileSize() >> Math.max(0, -value);
        r[2 * t + 0] = ((n.x + o * (y - 1) / (this._numVertsPerSide - 3)) * e + 2) / (e + 4);
        r[2 * t + 1] = 1 - ((n.y + o * (f - 1) / (this._numVertsPerSide - 3)) * e + 2) / (e + 4);
      }
    }
  }
  _adjustForTagHeight(t) {
    t.setMagnitude(t, t.magnitude() - PioneerPublicApi.MathUtils.clamp(2 * this._heightScale * this._levelPow, .01 * this._radius, .05 * this._radius));
  }
  _getNonPositiveLevel(t) {
    const e = this._component.__getEndPoints().get(t);
    if (!e?.configuration) return NaN;
    const i = this._getNearestDistance();
    if (!Number.isFinite(i)) return e.configuration.first_level;
    const n = e.configuration.tile_size;
    return PioneerPublicApi.MathUtils.clamp(4 - Math.floor(Math.log2(i / this._radius / this._component.__getSplitJoinThresholdFactor() * n * 4)), e.configuration.first_level, 0);
  }
  _getNearestDistance() {
    let t = Number.POSITIVE_INFINITY;
    const e = this._component.__getCameraPositions();
    const i = this._component.__getCameraFieldsOfView();
    const n = PioneerPublicApi.Vector3.pool.get();
    for (let s = 0, o = e.length; s < o; s++) {
      const o = e[s];
      const r = i[s];
      n.sub(o, this._center);
      const a = Math.max(0, n.magnitude() - this._radius) * Math.tan(r / 2);
      t > a && (t = a);
    }
    PioneerPublicApi.Vector3.pool.release(n);
    return t;
  }
  toString() {
    return `${this._face}/${this._level}/${this._tile.x}/${this._tile.y}`;
  }
  prepareForRender(t) {
    const e = this._fullyLoaded ? this._threeJsObject : this._tempThreeJsObject;
    if (e) {
      if (!this._visible) return void (e.visible = false);
      if (!this._component.__getTransparent()) {
        const i = this._component.getEntity();
        const n = i.getCameraSpacePosition(t);
        const o = PioneerPublicApi.Vector3.pool.get();
        o.rotate(i.getOrientation(), this._center);
        const r = Math.acos(o.dot(n) / o.magnitude() / n.magnitude());
        if (PioneerPublicApi.Vector3.pool.release(o), r < Math.PI / 2 - Math.PI / 4 * this._levelPow) return void (e.visible = false);
      }
      PioneerPublicApi.ThreeJsHelper.setPositionToEntity(e, this._component.getEntity(), t, this._center, true);
    }
  }
  async _loadTexture(t, e, i) {
    const s = -this._component.getEntity().getLeastCameraDepth() + this._level / 100;
    const n = "height" === t ? "imageData" : "texture";
    const o = await this._resourceManager.acquire(this._component, e, n, s);
    this.isDestroyed() ? this._resourceManager.release(this._component, o, n) : this._setTexture(t, o, i);
  }
  _setTexture(t, heightData, i) {
    if ("height" === t && heightData instanceof ImageData) {
      this._heightData && this._resourceManager.release(this._component, this._heightData, "imageData");
      this._heightData = heightData;
    } else if (heightData instanceof PioneerPublicApi.THREE.Texture) {
      const n = i.uniforms[`${t}Texture`];
      if (n.value && this._resourceManager.release(this._component, n.value, "texture"), n.value = heightData, "normal" === t) {
        i.defines.normalMap = true;
        i.defines.normalUVs = true;
        i.defines.hasBitangents = true;
        i.needsUpdate = true;
        i.uniforms.normalScale.value.set(this._component.getHeightScale(), this._component.getHeightScale());
        i.uniforms.specularIntensity.value = 0;
        i.uniforms.specularHardness.value = 100;
      } else "specular" === t ? (i.defines.specularMap = true, i.defines.specularUVs = true, i.needsUpdate = true) : "night" === t ? (i.defines.nightMap = true, i.defines.nightUVs = true, i.defines.nightMapEmissive = true, i.needsUpdate = true) : "decal" === t && (i.defines.decalMap = true, i.defines.decalUVs = true, i.needsUpdate = true);
      this._component.__getTransparent() && (PioneerPublicApi.ThreeJsHelper.setTransparent(i, true), i.side = PioneerPublicApi.THREE.DoubleSide, i.needsUpdate = true);
    }
  }
  static _isInABoundary(t, e, i, s) {
    let n = false;
    for (let o = 0, r = t.boundaries.length; o < r; o++) {
      const r = t.boundaries[o];
      if (r.face !== e) continue;
      if (r.last_level < i) continue;
      const a = 1 << r.last_level - i;
      s.x < Math.floor(r.min[0] / a) || Math.floor(r.max[0] / a) < s.x || s.y < Math.floor(r.min[1] / a) || Math.floor(r.max[1] / a) < s.y || (n = true);
    }
    return n;
  }
  static getHeightPos(t, e, i, s, n, o, r, a, l, c, h) {
    const d = (o.x + (i - 1) / (r - 3) * a) * l + 2;
    const u = l + 4 - ((o.y + (s - 1) / (r - 3) * a) * l + 2);
    const p = this.getLinearInterpolatedHeightPixel(d, u, n, l + 4);
    t.addMult(t, e, c + p * h);
  }
  static getLinearInterpolatedHeightPixel(t, e, i, s) {
    const n = Math.floor(t);
    const o = Math.floor(e);
    const r = t - n;
    const a = e - o;
    const l = Math.abs(r - .5);
    const c = Math.abs(a - .5);
    let h = this.getHeightFromPixel(n, o, i, s) * ((1 - l) * (1 - c));
    r >= .5 ? (h += this.getHeightFromPixel(n + 1, o, i, s) * (l * (1 - c)), a < .5 ? h += this.getHeightFromPixel(n + 1, o - 1, i, s) * (l * c) : a >= .5 && (h += this.getHeightFromPixel(n + 1, o + 1, i, s) * (l * c))) : r < .5 && (h += this.getHeightFromPixel(n - 1, o, i, s) * (l * (1 - c)), a < .5 ? h += this.getHeightFromPixel(n - 1, o - 1, i, s) * (l * c) : a >= .5 && (h += this.getHeightFromPixel(n - 1, o + 1, i, s) * (l * c)));
    a >= .5 ? h += this.getHeightFromPixel(n, o + 1, i, s) * ((1 - l) * c) : a < .5 && (h += this.getHeightFromPixel(n, o - 1, i, s) * ((1 - l) * c));
    return h;
  }
  static getHeightFromPixel(t, e, i, n) {
    t = PioneerPublicApi.MathUtils.clamp(t, 0, n - 1);
    const o = 4 * ((e = PioneerPublicApi.MathUtils.clamp(e, 0, n - 1)) * n + t);
    return i[o + 0] / 256 + i[o + 1] / 65536 + i[o + 2] / 16777216;
  }
  static cmtsCoordToPosition(t, e, i, n, o, r) {
    let a = n * i;
    let l = o * i;
    for (; a < 0 || a > 1 || l < 0 || l > 1;) if (0 <= e && e <= 3) {
      if (a > 1) {
        a -= 1;
        e = (e + 1) % 4;
      } else if (a < 0) {
        a += 1;
        e = (e + 3) % 4;
      } else if (0 === e) l < 0 ? (l += 1, e = 5) : l > 1 && (l -= 1, e = 4);else if (1 === e) {
        if (l < 0) {
          const t = a;
          a = l + 1;
          l = 1 - t;
          e = 5;
        } else if (l > 1) {
          const t = a;
          a = 2 - l;
          l = t;
          e = 4;
        }
      } else if (2 === e) l < 0 ? (a = 1 - a, l = 0 - l, e = 5) : l > 1 && (a = 1 - a, l = 2 - l, e = 4);else if (3 === e) if (l < 0) {
        const t = a;
        a = 0 - l;
        l = t;
        e = 5;
      } else if (l > 1) {
        const t = a;
        a = l - 1;
        l = 1 - t;
        e = 4;
      }
    } else if (4 === e) {
      if (a < 0) {
        const t = a;
        a = 1 - l;
        l = t + 1;
        e = 3;
      } else if (a > 1) {
        const t = a;
        a = l;
        l = 2 - t;
        e = 1;
      } else l < 0 ? (l += 1, e = 0) : l > 1 && (a = 1 - a, l = 2 - l, e = 2);
    } else if (5 === e) if (a < 0) {
      const t = a;
      a = l;
      l = 0 - t;
      e = 3;
    } else if (a > 1) {
      const t = a;
      a = 1 - l;
      l = t - 1;
      e = 1;
    } else l < 0 ? (a = 1 - a, l = 0 - l, e = 2) : l > 1 && (l -= 1, e = 0);
    const c = 2 * a - 1;
    const h = 2 * l - 1;
    const d = this._basis[e];
    t.set(d[0].x * c + d[1].x * h + d[2].x, d[0].y * c + d[1].y * h + d[2].y, d[0].z * c + d[1].z * h + d[2].z);
    t.normalize(t);
    const u = PioneerPublicApi.LatLonAlt.pool.get();
    PioneerPublicApi.Geometry.getLLAFromXYZOnSphere(u, t, 0);
    u.alt = 0;
    r.xyzFromLLA(t, u);
    PioneerPublicApi.LatLonAlt.pool.release(u);
  }
  static cmtsCoordToTangent(t, e, i, s, n, o) {
    this.cmtsCoordToPosition(t, e, i, s, n, o);
    const r = this._basis[e];
    t.setNormalTo(t, r[0]);
  }
  static cmtsCoordToBitangent(t, e, i, s, n, o) {
    this.cmtsCoordToPosition(t, e, i, s, n, o);
    const r = this._basis[e];
    t.setNormalTo(t, r[1]);
  }
  _component;
  _resourceManager;
  _face;
  _level;
  _levelPow;
  _tile;
  _row;
  _col;
  _isLeaf;
  _center;
  _radius;
  _textureLevels;
  _numNonPositiveTexturesLoading;
  _numVertsPerSide;
  _uvOffsets;
  _uvScales;
  _heightOffset;
  _heightScale;
  _tempMeshPositions;
  _meshPositions;
  _meshNormals;
  _meshTangents;
  _meshBitangents;
  _meshUVs;
  _meshIndices;
  _tempNumVertsPerSide;
  _tempThreeJsMaterial;
  _tempThreeJsObject;
  _threeJsMaterial;
  _threeJsObject;
  _positionIndexToUpdate;
  _heightData;
  _fullyLoaded;
  _visible;
  static _basis = [[PioneerPublicApi.Vector3.YAxis, PioneerPublicApi.Vector3.ZAxis, PioneerPublicApi.Vector3.XAxis], [PioneerPublicApi.Vector3.XAxisNeg, PioneerPublicApi.Vector3.ZAxis, PioneerPublicApi.Vector3.YAxis], [PioneerPublicApi.Vector3.YAxisNeg, PioneerPublicApi.Vector3.ZAxis, PioneerPublicApi.Vector3.XAxisNeg], [PioneerPublicApi.Vector3.XAxis, PioneerPublicApi.Vector3.ZAxis, PioneerPublicApi.Vector3.YAxisNeg], [PioneerPublicApi.Vector3.YAxis, PioneerPublicApi.Vector3.XAxisNeg, PioneerPublicApi.Vector3.ZAxis], [PioneerPublicApi.Vector3.YAxis, PioneerPublicApi.Vector3.XAxis, PioneerPublicApi.Vector3.ZAxisNeg]];
}
const float32Array = new Float32Array(3);
const vector3 = new PioneerPublicApi.Vector3();
const r = new PioneerPublicApi.Vector3();
const latLonAlt = new PioneerPublicApi.LatLonAlt();
const l = new PioneerPublicApi.Vector3();
const c = new PioneerPublicApi.Vector3();
const h = new PioneerPublicApi.Vector3();
const d = new PioneerPublicApi.Vector3();
const u = new PioneerPublicApi.Vector3();
const p = new PioneerPublicApi.Vector3();
const _ = new PioneerPublicApi.Vector3();
const m = new PioneerPublicApi.Vector3();
export { CMTSComponent };
