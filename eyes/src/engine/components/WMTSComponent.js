// Recovered from app.js:763929-777991.
import * as Pioneer from "../pioneer/index.js";
import * as Capabilities from "../core/Capabilities-584.js";
class WMTSComponent extends Pioneer.BaseComponent {
  constructor(t, e) {
    super(t, e);
    this._capabilities = null;
    this._endPoint = "";
    this._layerIdentifier = "";
    this._tileMatrixSetIdentifier = "";
    this._style = "";
    this._dimensionValues = new Map();
    this._minLevel = Number.NEGATIVE_INFINITY;
    this._maxLevel = Number.POSITIVE_INFINITY;
    this._materialOptions = new Set();
    this._splitJoinThresholdFactor = 256;
    this._layer = null;
    this._tileMatrixSet = null;
    this._tileUrl = "";
    this._shadowEntities = [];
    this._engine = this.getEntity().getScene().getEngine();
    this._cameraPositions = [];
    this._cameraFieldsOfView = [];
    this._rootTile = null;
    this._loadedTiles = new Pioneer.FastSet();
    this._tilesLoadedPromise = null;
    this._transitionsCompleteCallback = null;
    this._loadsThisFrame = 0;
    this._atmosphereComponentRef = new Pioneer.ComponentRef(this.getEntity().getScene(), Pioneer.AtmosphereComponent, this.getEntity().getName());
    this._spheroidComponentRef = new Pioneer.ComponentRef(this.getEntity().getScene(), Pioneer.SpheroidComponent, this.getEntity().getName());
    this._spheroidComponentRef.setRefChangedCallback(this._spheroidRefChangedCallback.bind(this));
    this._spheroidChangedCallback = this._spheroidChangedCallback.bind(this);
    this.__setUsesEntityOrientation(true);
  }
  getEndPoint() {
    return this._endPoint;
  }
  setEndPoint(endPoint) {
    this._endPoint = endPoint;
    this.resetResources();
  }
  getLayer() {
    return this._layerIdentifier;
  }
  setLayer(layerIdentifier) {
    this._layerIdentifier = layerIdentifier;
    this.resetResources();
  }
  getTileMatrixSet() {
    return this._tileMatrixSetIdentifier;
  }
  setTileMatrixSet(tileMatrixSetIdentifier) {
    this._tileMatrixSetIdentifier = tileMatrixSetIdentifier;
    this.resetResources();
  }
  getStyle() {
    return this._style;
  }
  setStyle(style) {
    this._style = style;
    this.resetResources();
  }
  getDimensionValue(t) {
    return this._dimensionValues.get(t);
  }
  setDimensionValue(t, e) {
    this._dimensionValues.set(t, e);
    this.resetResources();
  }
  getLayers() {
    return null !== this._capabilities ? this._capabilities.layers : new Map();
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
  async getTilesLoadedPromise() {
    this._tilesLoadedPromise && (await this._tilesLoadedPromise);
  }
  setSpheroidReference(t) {
    this._spheroidComponentRef.set(this.getEntity().getName(), t);
  }
  __getLayer() {
    return this._layer;
  }
  __getTileMatrixSet() {
    return this._tileMatrixSet;
  }
  __getTileUrl() {
    return this._tileUrl;
  }
  __getMaxLevel() {
    return this._maxLevel;
  }
  __getMinLevel() {
    return this._minLevel;
  }
  __getSplitJoinFactor() {
    return this._splitJoinThresholdFactor;
  }
  __getLoadsThisFrame() {
    return this._loadsThisFrame;
  }
  __incLoadsThisFrame() {
    this._loadsThisFrame += 1;
  }
  __getCameraPositions() {
    return this._cameraPositions;
  }
  __getCameraFieldsOfView() {
    return this._cameraFieldsOfView;
  }
  __getSpheroidComponent() {
    return this._spheroidComponentRef.get();
  }
  __getMaterialOptions() {
    return this._materialOptions;
  }
  __addLoadedTile(t) {
    this._loadedTiles.add(t);
  }
  __removeLoadedTile(t) {
    this._loadedTiles.delete(t);
  }
  __destroy() {
    const t = this._spheroidComponentRef.get();
    null !== t && t.removeChangedCallback(this._spheroidChangedCallback);
    super.__destroy();
  }
  __update() {
    if (this._spheroidComponentRef.update(), null === this._rootTile) return;
    for (; this._cameraPositions.length > this._engine.getNumViewports();) {
      this._cameraPositions.pop();
      this._cameraFieldsOfView.pop();
    }
    for (; this._cameraPositions.length < this._engine.getNumViewports();) {
      this._cameraPositions.push(new Pioneer.Vector3());
      this._cameraFieldsOfView.push(1);
    }
    for (let t = 0, e = this._engine.getNumViewports(); t < e; t++) {
      const e = this._cameraPositions[t];
      const i = this._engine.getViewportAt(t).getCamera();
      i && (i.getEntity().getPositionRelativeToEntity(e, Pioneer.Vector3.Zero, this.getEntity()), e.rotateInverse(this.getEntity().getOrientation(), e), this._cameraFieldsOfView[t] = i.getFieldOfView());
    }
    this._loadsThisFrame = 0;
    const t = this._rootTile.update();
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
    Pioneer.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects(), this.getEntity());
    Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects(), this.getEntity(), t);
    for (let t = 0; t < this._loadedTiles.getSize(); t++) this._loadedTiles.getAt(t).prepareForRender();
    const e = this._atmosphereComponentRef.get();
    Pioneer.MaterialUtils.setUniforms(this.getThreeJsMaterials(), t, this.getEntity(), this._shadowEntities, e, true);
  }
  async __loadResources() {
    if ("" !== this._endPoint) {
      if (this._capabilities = new Capabilities.Capabilities(this._endPoint, this._engine, -this.getEntity().getLeastCameraDepth()), await this._capabilities.readyPromise, "loading" !== this.getLoadState().state) return void (this._capabilities = null);
      let layerIdentifier = this._layerIdentifier;
      if ("" === layerIdentifier) {
        const e = this._capabilities.layers;
        if (1 === e.size) for (const [, i] of e) layerIdentifier = i;
      }
      if ("" === layerIdentifier) return;
      if (this._layer = this._capabilities.getLayer(layerIdentifier), null === this._layer) throw new Error(`Invalid layer: "${layerIdentifier}".`);
      let tileMatrixSetIdentifier = this._tileMatrixSetIdentifier;
      if ("" === tileMatrixSetIdentifier) {
        const t = this._layer.tileMatrixSets;
        if (1 === t.size) for (const i of t) tileMatrixSetIdentifier = i;
      }
      if (this._tileMatrixSet = this._capabilities.getTileMatrixSet(tileMatrixSetIdentifier), !this._tileMatrixSet) throw new Error(`Invalid tile matrix set: "${tileMatrixSetIdentifier}".`);
      if (await this._tileMatrixSet.readyPromise, "loading" !== this.getLoadState().state) {
        this._capabilities = null;
        this._tileMatrixSet = null;
        return void (this._layer = null);
      }
      const rect = new Pioneer.Rect();
      rect.copy(this._tileMatrixSet.boundingBox);
      1 === this._tileMatrixSet.getNumTiles(0).x && (rect.size.x *= 2);
      1 === this._tileMatrixSet.getNumTiles(0).y && (rect.origin.y -= rect.size.y, rect.size.y *= 2);
      let style = this._style;
      "" === style && (style = this._layer.defaultStyle);
      for (const [t, e] of this._layer.dimensions) this._dimensionValues.has(t) || this._dimensionValues.set(t, e);
      this._tileUrl = this._layer.url;
      this._tileUrl = this._tileUrl.replace("{TileMatrixSet}", this._tileMatrixSet.identifier);
      this._tileUrl = this._tileUrl.replace("{Style}", style);
      this._dimensionValues.forEach((t, e) => {
        this._tileUrl = this._tileUrl.replace(`{${e}}`, t);
      });
      this._rootTile = new WMTSTile(this, null, -1, 0, 0, rect);
    }
  }
  __unloadResources() {
    this._capabilities = null;
    this._layer = null;
    this._tileMatrixSet = null;
    this._tileUrl = "";
    this._rootTile && (this._rootTile.destroy(), this._rootTile = null);
  }
  _spheroidRefChangedCallback(t, e) {
    null !== t && t.removeChangedCallback(this._spheroidChangedCallback);
    null !== e && e.addChangedCallback(this._spheroidChangedCallback);
    this._spheroidChangedCallback();
  }
  _spheroidChangedCallback() {
    const t = this._spheroidComponentRef.get();
    null !== t ? this.__setRadius(Math.max(t.getEquatorialRadius(), t.getPolarRadius())) : this.__setRadius(0);
    this.resetResources();
  }
  _capabilities;
  _endPoint;
  _layerIdentifier;
  _tileMatrixSetIdentifier;
  _style;
  _dimensionValues;
  _minLevel;
  _maxLevel;
  _materialOptions;
  _splitJoinThresholdFactor;
  _layer;
  _tileMatrixSet;
  _tileUrl;
  _shadowEntities;
  _engine;
  _cameraPositions;
  _cameraFieldsOfView;
  _rootTile;
  _loadedTiles;
  _tilesLoadedPromise;
  _transitionsCompleteCallback;
  _loadsThisFrame;
  _atmosphereComponentRef;
  _spheroidComponentRef;
}
class WMTSTile extends Pioneer.Tile {
  constructor(component, e, level, row, col, r) {
    super(e);
    this._component = component;
    this._level = level;
    this._row = row;
    this._col = col;
    this._tileBounds = new Pioneer.Rect();
    this._tileBounds.copy(r);
    this._center = new Pioneer.Vector3(NaN, NaN, NaN);
    this._radius = 0;
    this._threeJsMaterial = null;
    this._threeJsObject = null;
    this._visible = false;
    const a = component.__getSpheroidComponent();
    if (!this._component.__getTileMatrixSet() || !a) throw new Error(`Missing spheroid or tile matrix set in ${component}`);
  }
  createNewTile(t, e, i) {
    const n = t._level + 1;
    const o = 2 * t._row + e;
    const r = 2 * t._col + i;
    const a = t._component.__getTileMatrixSet();
    if (!a) return null;
    const l = a.getNumTiles(t._level + 1);
    if (void 0 === l || o >= l.y || r >= l.x) return null;
    const rect = new Pioneer.Rect();
    rect.origin.set(t._tileBounds.origin.x + .5 * i * t._tileBounds.size.x, t._tileBounds.origin.y + .5 * (1 - e) * t._tileBounds.size.y);
    rect.size.set(.5 * t._tileBounds.size.x, .5 * t._tileBounds.size.y);
    return new WMTSTile(t._component, t, n, o, r, rect);
  }
  checkSplit() {
    const t = this._component.__getTileMatrixSet();
    if (!t || this._level >= t.numLevels - 1) return false;
    const e = this._component.__getTileMatrixSet()?.boundingBox;
    return !(!e || !this._tileBounds.intersects(e)) && !(this._level >= this._component.__getMaxLevel()) && !(this._component.__getLoadsThisFrame() >= 4) && (this._level < this._component.__getMinLevel() || -1 === this._level || this._getNearestDistance() < this._component.__getSplitJoinFactor() * this._radius / t.maxPixelSize);
  }
  checkJoin() {
    if (-1 === this._level) return false;
    if (this._component.__getLoadsThisFrame() >= 1) return false;
    if (this._level > this._component.__getMaxLevel()) return true;
    if (this._level <= this._component.__getMinLevel()) return false;
    const t = this._component.__getTileMatrixSet();
    return !!t && this._getNearestDistance() > this._component.__getSplitJoinFactor() * this._radius * 4 / t.maxPixelSize;
  }
  async load() {
    if (-1 === this._level) return;
    if (this._component.__incLoadsThisFrame(), null !== this._threeJsMaterial) throw new Error("Tile already has material.");
    const t = this._component.__getLayer()?.boundingBox;
    if (!t) throw new Error("There is no layer bounds.");
    const e = this._component.getEngine().getResourceManager();
    if (!this._tileBounds.intersects(t)) return;
    this._threeJsMaterial = Pioneer.MaterialUtils.get();
    this._component.getThreeJsMaterials().push(this._threeJsMaterial);
    for (const t of this._component.__getMaterialOptions()) this._threeJsMaterial.defines[t] = true;
    let i;
    let n = this._component.__getTileUrl();
    n = n.replace("{TileMatrix}", `${this._level}`);
    n = n.replace("{TileRow}", `${this._row}`);
    n = n.replace("{TileCol}", `${this._col}`);
    try {
      i = await e.acquire(this._component, n, "texture", -this._component.getEntity().getLeastCameraDepth());
    } catch {
      i = await e.acquire(this._component, "gray", "texture", -this._component.getEntity().getLeastCameraDepth());
    }
    if (this._threeJsMaterial.uniforms.colorTexture.value = i, this.isDestroyed()) {
      e.release(this._component, i, "texture");
      const t = this._component.getThreeJsMaterials();
      for (let e = 0, i = t.length; e < i; e++) if (t[e] === this._threeJsMaterial) {
        t.splice(e, 1);
        break;
      }
      return void Pioneer.ThreeJsHelper.destroyMaterial(this._threeJsMaterial, false);
    }
    const o = this._component.__getLayer();
    const r = this._component.__getTileMatrixSet();
    const a = this._component.__getSpheroidComponent();
    if (!o || !r || !a) throw new Error("Missing layer or Three.js material.");
    this._threeJsObject = Pioneer.ThreeJsHelper.createMeshObject(this._component, this._threeJsMaterial, [{
      name: "position",
      dimensions: 3
    }, {
      name: "normal",
      dimensions: 3
    }, {
      name: "uv",
      dimensions: 2
    }], false);
    this._component.getThreeJsObjects().push(this._threeJsObject);
    Pioneer.ThreeJsHelper.useInDynEnvMap(this._threeJsObject, true);
    const l = 21;
    const c = 21;
    const float32Array = new Float32Array(1323);
    const d = new Float32Array(1323);
    const u = new Float32Array(882);
    const uint16Array = new Uint16Array(2520);
    const vector2 = new Pioneer.Vector2();
    const m = new Pioneer.Vector2();
    const latLonAlt = new Pioneer.LatLonAlt();
    const vector3 = new Pioneer.Vector3();
    const f = new Pioneer.Vector3();
    const T = new Pioneer.Vector3();
    for (let e = 0; e < l; e++) {
      let i = 1 - e / 20;
      vector2.y = Pioneer.MathUtils.lerp(this._tileBounds.origin.y, this._tileBounds.origin.y + this._tileBounds.size.y, i);
      m.y = Pioneer.MathUtils.clamp(vector2.y, t.origin.y, t.origin.y + t.size.y);
      i += (m.y - vector2.y) / this._tileBounds.size.y;
      for (let n = 0; n < c; n++) {
        let o = n / 20;
        vector2.x = Pioneer.MathUtils.lerp(this._tileBounds.origin.x, this._tileBounds.origin.x + this._tileBounds.size.x, o);
        m.x = Pioneer.MathUtils.clamp(vector2.x, t.origin.x, t.origin.x + t.size.x);
        o += (m.x - vector2.x) / this._tileBounds.size.x;
        r.crsUnitsToLLA(latLonAlt, m);
        a.xyzFromLLA(vector3, latLonAlt);
        f.set(Math.min(f.x, vector3.x), Math.min(f.y, vector3.y), Math.min(f.z, vector3.z));
        T.set(Math.max(T.x, vector3.x), Math.max(T.y, vector3.y), Math.max(T.z, vector3.z));
        const l = e * c + n;
        float32Array[3 * l + 0] = vector3.x;
        float32Array[3 * l + 1] = vector3.y;
        float32Array[3 * l + 2] = vector3.z;
        vector3.normalize(vector3);
        d[3 * l + 0] = vector3.x;
        d[3 * l + 1] = vector3.y;
        d[3 * l + 2] = vector3.z;
        u[2 * l + 0] = o;
        u[2 * l + 1] = 1 - i;
        const b = e * c + n;
        n < 20 && e < 20 && (uint16Array[6 * b + 0] = c * (e + 0) + (n + 0), uint16Array[6 * b + 1] = c * (e + 1) + (n + 0), uint16Array[6 * b + 2] = c * (e + 1) + (n + 1), uint16Array[6 * b + 3] = c * (e + 0) + (n + 0), uint16Array[6 * b + 4] = c * (e + 1) + (n + 1), uint16Array[6 * b + 5] = c * (e + 0) + (n + 1));
      }
    }
    const b = Math.floor(10.5) * c + Math.floor(10.5);
    this._center.set(float32Array[3 * b + 0], float32Array[3 * b + 1], float32Array[3 * b + 2]);
    const E = new Pioneer.Vector3();
    for (let t = 0; t < 5; t++) for (let e = 0; e < 5; e++) {
      const i = Math.floor(t / 4 * 20) * c + Math.floor(e / 4 * 20);
      E.set(float32Array[3 * i + 0], float32Array[3 * i + 1], float32Array[3 * i + 2]);
      const s = E.distance(this._center);
      this._radius = Math.max(this._radius, s);
    }
    Pioneer.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "position", float32Array);
    Pioneer.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "normal", d);
    Pioneer.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "uv", u);
    Pioneer.ThreeJsHelper.setIndices(this._threeJsObject.geometry, uint16Array);
    this._component.__addLoadedTile(this);
  }
  unload() {
    if (-1 === this._level) return;
    this._component.__removeLoadedTile(this);
    const t = this._component.getThreeJsObjects();
    for (let e = 0, i = t.length; e < i; e++) if (t[e] === this._threeJsObject) {
      t.splice(e, 1);
      break;
    }
    if (this._threeJsObject && Pioneer.ThreeJsHelper.destroyObject(this._threeJsObject), this._threeJsObject = null, null !== this._threeJsMaterial) {
      const t = this._component.getThreeJsMaterials();
      for (let e = 0, i = t.length; e < i; e++) if (t[e] === this._threeJsMaterial) {
        t.splice(e, 1);
        break;
      }
      const e = this._threeJsMaterial.uniforms.shadowRingsTexture;
      e && null !== e.value && (e.value = null);
      const i = this._threeJsMaterial.uniforms.colorTexture;
      i.value && this._component.getEngine().getResourceManager().release(this._component, i.value, "texture");
      Pioneer.ThreeJsHelper.destroyMaterial(this._threeJsMaterial, false);
      this._threeJsMaterial = null;
    }
  }
  prepareForRender() {
    this._threeJsObject && (this._threeJsObject.visible = this._visible);
  }
  setVisible(visible) {
    this._threeJsObject && (this._threeJsObject.visible = this._visible);
    this._visible = visible;
  }
  update() {
    let t = this.check();
    const e = this.getChildren();
    for (let i = 0, s = e.length; i < s; i++) t = e[i].update() || t;
    return t;
  }
  _getNearestDistance() {
    let t = Number.POSITIVE_INFINITY;
    const e = this._component.__getCameraPositions();
    const i = this._component.__getCameraFieldsOfView();
    const n = Pioneer.Vector3.pool.get();
    for (let s = 0, o = e.length; s < o; s++) {
      const o = e[s];
      const r = i[s];
      n.sub(o, this._center);
      const a = Math.max(0, n.magnitude() - this._radius) * Math.tan(r / 2);
      t > a && (t = a);
    }
    Pioneer.Vector3.pool.release(n);
    return t;
  }
  toString() {
    return `${this._level}-${this._row}-${this._col}`;
  }
  _component;
  _level;
  _row;
  _col;
  _tileBounds;
  _center;
  _radius;
  _visible;
  _threeJsMaterial;
  _threeJsObject;
}
export { WMTSComponent };
