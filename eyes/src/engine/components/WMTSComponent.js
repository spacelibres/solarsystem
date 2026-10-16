/** @eyes-analysis
 * 文件职责：解析 WMTS 能力文档并按矩阵/图层/维度递归加载地理瓦片，叠加球面影像。
 * 依据：import ../pioneer/index.js；import ../core/Capabilities-584.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:763929-777991.
import * as Pioneer from "../pioneer/index.js";
import * as Capabilities from "../core/Capabilities-584.js";
/** @eyes-analysis
 * 类职责：解析 WMTS 能力文档并按矩阵/图层/维度递归加载地理瓦片，叠加球面影像。
 * 继承：Pioneer.BaseComponent；导出：WMTSComponent。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class WMTSComponent extends Pioneer.BaseComponent {
  /** @eyes-analysis
   * 【结构证据】写入 `_atmosphereComponentRef`、`_cameraFieldsOfView`、`_cameraPositions`、`_capabilities`、`_dimensionValues`、`_endPoint`、`_engine`、`_layer`；调用 `new Map`、`new Pioneer.ComponentRef`、`new Pioneer.FastSet`、`new Set`、`super`、`this.__setUsesEntityOrientation`。
   * 状态写入：_atmosphereComponentRef、_cameraFieldsOfView、_cameraPositions、_capabilities、_dimensionValues、_endPoint、_engine、_layer等；完整记录见索引。
   * 调用线索：new Map、new Pioneer.ComponentRef、new Pioneer.FastSet、new Set、super等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `this._endPoint`。
   */
  getEndPoint() {
    return this._endPoint;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_endPoint`；调用 `this.resetResources`。
   * 状态写入：_endPoint。
   * 调用线索：this.resetResources。
   */
  setEndPoint(endPoint) {
    this._endPoint = endPoint;
    this.resetResources();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._layerIdentifier`。
   */
  getLayer() {
    return this._layerIdentifier;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_layerIdentifier`；调用 `this.resetResources`。
   * 状态写入：_layerIdentifier。
   * 调用线索：this.resetResources。
   */
  setLayer(layerIdentifier) {
    this._layerIdentifier = layerIdentifier;
    this.resetResources();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._tileMatrixSetIdentifier`。
   */
  getTileMatrixSet() {
    return this._tileMatrixSetIdentifier;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_tileMatrixSetIdentifier`；调用 `this.resetResources`。
   * 状态写入：_tileMatrixSetIdentifier。
   * 调用线索：this.resetResources。
   */
  setTileMatrixSet(tileMatrixSetIdentifier) {
    this._tileMatrixSetIdentifier = tileMatrixSetIdentifier;
    this.resetResources();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._style`。
   */
  getStyle() {
    return this._style;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_style`；调用 `this.resetResources`。
   * 状态写入：_style。
   * 调用线索：this.resetResources。
   */
  setStyle(style) {
    this._style = style;
    this.resetResources();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._dimensionValues.get(t)`；调用 `this._dimensionValues.get`。
   * 调用线索：this._dimensionValues.get。
   */
  getDimensionValue(t) {
    return this._dimensionValues.get(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._dimensionValues.set`、`this.resetResources`。
   * 调用线索：this._dimensionValues.set、this.resetResources。
   */
  setDimensionValue(t, e) {
    this._dimensionValues.set(t, e);
    this.resetResources();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `null!==this._capabilities?this._capabilities.layers:new Map()`；调用 `new Map`。
   * 调用线索：new Map。
   */
  getLayers() {
    return null !== this._capabilities ? this._capabilities.layers : new Map();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._minLevel`。
   */
  getMinLevel() {
    return this._minLevel;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_minLevel`。
   * 状态写入：_minLevel。
   */
  setMinLevel(minLevel) {
    this._minLevel = minLevel;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._maxLevel`。
   */
  getMaxLevel() {
    return this._maxLevel;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_maxLevel`。
   * 状态写入：_maxLevel。
   */
  setMaxLevel(maxLevel) {
    this._maxLevel = maxLevel;
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
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  async getTilesLoadedPromise() {
    this._tilesLoadedPromise && (await this._tilesLoadedPromise);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._spheroidComponentRef.set`、`this.getEntity`、`this.getEntity().getName`。
   * 调用线索：this._spheroidComponentRef.set、this.getEntity、this.getEntity().getName。
   */
  setSpheroidReference(t) {
    this._spheroidComponentRef.set(this.getEntity().getName(), t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._layer`。
   */
  __getLayer() {
    return this._layer;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._tileMatrixSet`。
   */
  __getTileMatrixSet() {
    return this._tileMatrixSet;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._tileUrl`。
   */
  __getTileUrl() {
    return this._tileUrl;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._maxLevel`。
   */
  __getMaxLevel() {
    return this._maxLevel;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._minLevel`。
   */
  __getMinLevel() {
    return this._minLevel;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._splitJoinThresholdFactor`。
   */
  __getSplitJoinFactor() {
    return this._splitJoinThresholdFactor;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._loadsThisFrame`。
   */
  __getLoadsThisFrame() {
    return this._loadsThisFrame;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_loadsThisFrame`。
   * 状态写入：_loadsThisFrame。
   */
  __incLoadsThisFrame() {
    this._loadsThisFrame += 1;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._cameraPositions`。
   */
  __getCameraPositions() {
    return this._cameraPositions;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._cameraFieldsOfView`。
   */
  __getCameraFieldsOfView() {
    return this._cameraFieldsOfView;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._spheroidComponentRef.get()`；调用 `this._spheroidComponentRef.get`。
   * 调用线索：this._spheroidComponentRef.get。
   */
  __getSpheroidComponent() {
    return this._spheroidComponentRef.get();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._materialOptions`。
   */
  __getMaterialOptions() {
    return this._materialOptions;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._loadedTiles.add`。
   * 调用线索：this._loadedTiles.add。
   */
  __addLoadedTile(t) {
    this._loadedTiles.add(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._loadedTiles.delete`。
   * 调用线索：this._loadedTiles.delete。
   */
  __removeLoadedTile(t) {
    this._loadedTiles.delete(t);
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
   * 【结构证据】写入 `_cameraFieldsOfView[t]`、`_loadsThisFrame`、`_tilesLoadedPromise`、`_transitionsCompleteCallback`；返回 `void`；调用 `e.rotateInverse`、`i.getEntity`、`i.getEntity().getPositionRelativeToEntity`、`i.getFieldOfView`、`new Pioneer.Vector3`、`new Promise`。
   * 状态写入：_cameraFieldsOfView[t]、_loadsThisFrame、_tilesLoadedPromise、_transitionsCompleteCallback。
   * 调用线索：e.rotateInverse、i.getEntity、i.getEntity().getPositionRelativeToEntity、i.getFieldOfView、new Pioneer.Vector3等。
   */
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
  /** @eyes-analysis
   * 【结构证据】调用 `Pioneer.MaterialUtils.setUniforms`、`Pioneer.ThreeJsHelper.setOrientationToEntity`、`Pioneer.ThreeJsHelper.setPositionToEntity`、`this._atmosphereComponentRef.get`、`this._loadedTiles.getAt`、`this._loadedTiles.getAt(t).prepareForRender`。
   * 调用线索：Pioneer.MaterialUtils.setUniforms、Pioneer.ThreeJsHelper.setOrientationToEntity、Pioneer.ThreeJsHelper.setPositionToEntity、this._atmosphereComponentRef.get、this._loadedTiles.getAt等。
   */
  __prepareForRender(t) {
    Pioneer.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects(), this.getEntity());
    Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects(), this.getEntity(), t);
    for (let t = 0; t < this._loadedTiles.getSize(); t++) this._loadedTiles.getAt(t).prepareForRender();
    const e = this._atmosphereComponentRef.get();
    Pioneer.MaterialUtils.setUniforms(this.getThreeJsMaterials(), t, this.getEntity(), this._shadowEntities, e, true);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_capabilities`、`_layer`、`_rootTile`、`_tileMatrixSet`、`_tileUrl`；返回 `void(this._capabilities=null)` 或 `void`；调用 `new Capabilities.Capabilities`、`new Error`、`new Pioneer.Rect`、`new WMTSTile`、`rect.copy`、`this._capabilities.getLayer`；含显式错误分支。
   * 状态写入：_capabilities、_layer、_rootTile、_tileMatrixSet、_tileUrl。
   * 调用线索：new Capabilities.Capabilities、new Error、new Pioneer.Rect、new WMTSTile、rect.copy等。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_capabilities`、`_layer`、`_rootTile`、`_tileMatrixSet`、`_tileUrl`；调用 `this._rootTile.destroy`。
   * 状态写入：_capabilities、_layer、_rootTile、_tileMatrixSet、_tileUrl。
   * 调用线索：this._rootTile.destroy。
   */
  __unloadResources() {
    this._capabilities = null;
    this._layer = null;
    this._tileMatrixSet = null;
    this._tileUrl = "";
    this._rootTile && (this._rootTile.destroy(), this._rootTile = null);
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
/** @eyes-analysis
 * 类职责：WMTS 地理子瓦片：按矩阵行列下载影像并控制球面瓦片显示。
 * 继承：Pioneer.Tile；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class WMTSTile extends Pioneer.Tile {
  /** @eyes-analysis
   * 【结构证据】写入 `_center`、`_col`、`_component`、`_level`、`_radius`、`_row`、`_threeJsMaterial`、`_threeJsObject`；调用 `component.__getSpheroidComponent`、`new Error`、`new Pioneer.Rect`、`new Pioneer.Vector3`、`super`、`this._component.__getTileMatrixSet`；含显式错误分支。
   * 状态写入：_center、_col、_component、_level、_radius、_row、_threeJsMaterial、_threeJsObject等；完整记录见索引。
   * 调用线索：component.__getSpheroidComponent、new Error、new Pioneer.Rect、new Pioneer.Vector3、super等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `null` 或 `new WMTSTile(t._component,t,n,o,r,rect)`；调用 `a.getNumTiles`、`new Pioneer.Rect`、`new WMTSTile`、`rect.origin.set`、`rect.size.set`、`t._component.__getTileMatrixSet`。
   * 调用线索：a.getNumTiles、new Pioneer.Rect、new WMTSTile、rect.origin.set、rect.size.set等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `false` 或 `!(!e||!this._tileBounds.intersects(e))&&!(this._level>=this._component.__getMaxLevel())&&!(this._component.__getLoadsThisFrame()>=4)&&(this._level<thi`；调用 `this._component.__getLoadsThisFrame`、`this._component.__getMaxLevel`、`this._component.__getMinLevel`、`this._component.__getSplitJoinFactor`、`this._component.__getTileMatrixSet`、`this._getNearestDistance`。
   * 调用线索：this._component.__getLoadsThisFrame、this._component.__getMaxLevel、this._component.__getMinLevel、this._component.__getSplitJoinFactor、this._component.__getTileMatrixSet等。
   */
  checkSplit() {
    const t = this._component.__getTileMatrixSet();
    if (!t || this._level >= t.numLevels - 1) return false;
    const e = this._component.__getTileMatrixSet()?.boundingBox;
    return !(!e || !this._tileBounds.intersects(e)) && !(this._level >= this._component.__getMaxLevel()) && !(this._component.__getLoadsThisFrame() >= 4) && (this._level < this._component.__getMinLevel() || -1 === this._level || this._getNearestDistance() < this._component.__getSplitJoinFactor() * this._radius / t.maxPixelSize);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `false` 或 `true`；调用 `this._component.__getLoadsThisFrame`、`this._component.__getMaxLevel`、`this._component.__getMinLevel`、`this._component.__getSplitJoinFactor`、`this._component.__getTileMatrixSet`、`this._getNearestDistance`。
   * 调用线索：this._component.__getLoadsThisFrame、this._component.__getMaxLevel、this._component.__getMinLevel、this._component.__getSplitJoinFactor、this._component.__getTileMatrixSet等。
   */
  checkJoin() {
    if (-1 === this._level) return false;
    if (this._component.__getLoadsThisFrame() >= 1) return false;
    if (this._level > this._component.__getMaxLevel()) return true;
    if (this._level <= this._component.__getMinLevel()) return false;
    const t = this._component.__getTileMatrixSet();
    return !!t && this._getNearestDistance() > this._component.__getSplitJoinFactor() * this._radius * 4 / t.maxPixelSize;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_radius`、`_threeJsMaterial`、`_threeJsMaterial.defines[t]`、`_threeJsMaterial.uniforms.colorTexture.value`、`_threeJsObject`；返回 `void` 或 `void Pioneer.ThreeJsHelper.destroyMaterial(this._threeJsMaterial,false)`；调用 `E.distance`、`E.set`、`Math.floor`、`Math.max`、`Math.min`、`Pioneer.MaterialUtils.get`；含显式错误分支。
   * 状态写入：_radius、_threeJsMaterial、_threeJsMaterial.defines[t]、_threeJsMaterial.uniforms.colorTexture.value、_threeJsObject。
   * 调用线索：E.distance、E.set、Math.floor、Math.max、Math.min等。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_threeJsMaterial`、`_threeJsObject`；返回 `void`；调用 `Pioneer.ThreeJsHelper.destroyMaterial`、`Pioneer.ThreeJsHelper.destroyObject`、`t.splice`、`this._component.__removeLoadedTile`、`this._component.getEngine`、`this._component.getEngine().getResourceManager`。
   * 状态写入：_threeJsMaterial、_threeJsObject。
   * 调用线索：Pioneer.ThreeJsHelper.destroyMaterial、Pioneer.ThreeJsHelper.destroyObject、t.splice、this._component.__removeLoadedTile、this._component.getEngine等。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_threeJsObject.visible`。
   * 状态写入：_threeJsObject.visible。
   */
  prepareForRender() {
    this._threeJsObject && (this._threeJsObject.visible = this._visible);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_threeJsObject.visible`、`_visible`。
   * 状态写入：_threeJsObject.visible、_visible。
   */
  setVisible(visible) {
    this._threeJsObject && (this._threeJsObject.visible = this._visible);
    this._visible = visible;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t`；调用 `e[i].update`、`this.check`、`this.getChildren`。
   * 调用线索：e[i].update、this.check、this.getChildren。
   */
  update() {
    let t = this.check();
    const e = this.getChildren();
    for (let i = 0, s = e.length; i < s; i++) t = e[i].update() || t;
    return t;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `t`；调用 `Math.max`、`Math.tan`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`n.magnitude`、`n.sub`。
   * 调用线索：Math.max、Math.tan、Pioneer.Vector3.pool.get、Pioneer.Vector3.pool.release、n.magnitude等。
   */
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
  /** @eyes-analysis
   * 【结构证据】本访问器没有 AST 可见的 this 字段直接赋值。
   */
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
