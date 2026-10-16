// Recovered from app.js:763929-777991.
import * as Pioneer from "../pioneer/index.js";
import * as Capabilities from "../core/Capabilities-584.js";
/** Capabilities 决定图层、矩阵集和 CRS；瓦片 URL 只替换原模板占位符。异步 ready 后再次检查 loading，卸载中的资源不发布为根瓦片。 */
class WMTSComponent extends Pioneer.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
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
  getDimensionValue(dimensionName) {
    return this._dimensionValues.get(dimensionName);
  }
  setDimensionValue(dimensionName, dimensionValue) {
    this._dimensionValues.set(dimensionName, dimensionValue);
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
  isMaterialOptionEnabled(option) {
    return this._materialOptions.has(option);
  }
  setMaterialOption(option, enabled) {
    const materials = this.getThreeJsMaterials();
    if (enabled && !this._materialOptions.has(option)) {
      this._materialOptions.add(option);
      for (let materialIndex = 0, materialCount = materials.length; materialIndex < materialCount; materialIndex++) {
        const material = materials[materialIndex];
        material.defines[option] = true;
        material.needsUpdate = true;
      }
    } else if (!enabled && this._materialOptions.has(option)) {
      this._materialOptions.delete(option);
      for (let materialIndex = 0, materialCount = materials.length; materialIndex < materialCount; materialIndex++) {
        const material = materials[materialIndex];
        delete material.defines[option];
        material.needsUpdate = true;
      }
    }
  }
  async getTilesLoadedPromise() {
    if (this._tilesLoadedPromise) {
      await this._tilesLoadedPromise;
    }
  }
  setSpheroidReference(componentName) {
    this._spheroidComponentRef.set(this.getEntity().getName(), componentName);
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
  __addLoadedTile(tile) {
    this._loadedTiles.add(tile);
  }
  __removeLoadedTile(tile) {
    this._loadedTiles.delete(tile);
  }
  __destroy() {
    const spheroid = this._spheroidComponentRef.get();
    if (null !== spheroid) {
      spheroid.removeChangedCallback(this._spheroidChangedCallback);
    }
    super.__destroy();
  }
  __update() {
    this._spheroidComponentRef.update();
    if (null === this._rootTile) return;
    for (; this._cameraPositions.length > this._engine.getNumViewports();) {
      this._cameraPositions.pop();
      this._cameraFieldsOfView.pop();
    }
    for (; this._cameraPositions.length < this._engine.getNumViewports();) {
      this._cameraPositions.push(new Pioneer.Vector3());
      this._cameraFieldsOfView.push(1);
    }
    for (let viewportIndex = 0, viewportCount = this._engine.getNumViewports(); viewportIndex < viewportCount; viewportIndex++) {
      const cameraPosition = this._cameraPositions[viewportIndex];
      const camera = this._engine.getViewportAt(viewportIndex).getCamera();
      if (camera) {
        camera.getEntity().getPositionRelativeToEntity(cameraPosition, Pioneer.Vector3.Zero, this.getEntity());
        cameraPosition.rotateInverse(this.getEntity().getOrientation(), cameraPosition);
        this._cameraFieldsOfView[viewportIndex] = camera.getFieldOfView();
      }
    }
    this._loadsThisFrame = 0;
    const transitionsActive = this._rootTile.update();
    if (null === this._tilesLoadedPromise && transitionsActive) {
      this._tilesLoadedPromise = new Promise(transitionsCompleteCallback => {
        this._transitionsCompleteCallback = transitionsCompleteCallback;
      });
    }
    if (null !== this._tilesLoadedPromise && !transitionsActive) {
      const transitionsCompleteCallback = this._transitionsCompleteCallback;
      this._tilesLoadedPromise = null;
      this._transitionsCompleteCallback = null;
      if (transitionsCompleteCallback) {
        transitionsCompleteCallback();
      }
    }
  }
  __prepareForRender(camera) {
    Pioneer.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects(), this.getEntity());
    Pioneer.ThreeJsHelper.setPositionToEntity(this.getThreeJsObjects(), this.getEntity(), camera);
    for (let tileIndex = 0; tileIndex < this._loadedTiles.getSize(); tileIndex++) this._loadedTiles.getAt(tileIndex).prepareForRender();
    const atmosphere = this._atmosphereComponentRef.get();
    Pioneer.MaterialUtils.setUniforms(this.getThreeJsMaterials(), camera, this.getEntity(), this._shadowEntities, atmosphere, true);
  }
  async __loadResources() {
    if ("" !== this._endPoint) {
      this._capabilities = new Capabilities.Capabilities(this._endPoint, this._engine, -this.getEntity().getLeastCameraDepth());
      await this._capabilities.readyPromise;
      if ("loading" !== this.getLoadState().state) return void (this._capabilities = null);
      let layerIdentifier = this._layerIdentifier;
      if ("" === layerIdentifier) {
        const availableLayers = this._capabilities.layers;
        if (1 === availableLayers.size) for (const [, identifier] of availableLayers) layerIdentifier = identifier;
      }
      if ("" === layerIdentifier) return;
      this._layer = this._capabilities.getLayer(layerIdentifier);
      if (null === this._layer) throw new Error(`Invalid layer: "${layerIdentifier}".`);
      let tileMatrixSetIdentifier = this._tileMatrixSetIdentifier;
      if ("" === tileMatrixSetIdentifier) {
        const matrixSetIdentifiers = this._layer.tileMatrixSets;
        if (1 === matrixSetIdentifiers.size) for (const identifier of matrixSetIdentifiers) tileMatrixSetIdentifier = identifier;
      }
      this._tileMatrixSet = this._capabilities.getTileMatrixSet(tileMatrixSetIdentifier);
      if (!this._tileMatrixSet) throw new Error(`Invalid tile matrix set: "${tileMatrixSetIdentifier}".`);
      await this._tileMatrixSet.readyPromise;
      if ("loading" !== this.getLoadState().state) {
        this._capabilities = null;
        this._tileMatrixSet = null;
        return void (this._layer = null);
      }
      const rootBounds = new Pioneer.Rect();
      rootBounds.copy(this._tileMatrixSet.boundingBox);
      if (1 === this._tileMatrixSet.getNumTiles(0).x) {
        rootBounds.size.x *= 2;
      }
      if (1 === this._tileMatrixSet.getNumTiles(0).y) {
        rootBounds.origin.y -= rootBounds.size.y;
        rootBounds.size.y *= 2;
      }
      let style = this._style;
      if ("" === style) {
        style = this._layer.defaultStyle;
      }
      for (const [dimensionName, defaultDimensionValue] of this._layer.dimensions) if (!this._dimensionValues.has(dimensionName)) {
        this._dimensionValues.set(dimensionName, defaultDimensionValue);
      }
      this._tileUrl = this._layer.url;
      this._tileUrl = this._tileUrl.replace("{TileMatrixSet}", this._tileMatrixSet.identifier);
      this._tileUrl = this._tileUrl.replace("{Style}", style);
      this._dimensionValues.forEach((dimensionValue, dimensionName) => {
        this._tileUrl = this._tileUrl.replace(`{${dimensionName}}`, dimensionValue);
      });
      this._rootTile = new WMTSTile(this, null, -1, 0, 0, rootBounds);
    }
  }
  __unloadResources() {
    this._capabilities = null;
    this._layer = null;
    this._tileMatrixSet = null;
    this._tileUrl = "";
    if (this._rootTile) {
      this._rootTile.destroy();
      this._rootTile = null;
    }
  }
  _spheroidRefChangedCallback(previousSpheroid, nextSpheroid) {
    if (null !== previousSpheroid) {
      previousSpheroid.removeChangedCallback(this._spheroidChangedCallback);
    }
    if (null !== nextSpheroid) {
      nextSpheroid.addChangedCallback(this._spheroidChangedCallback);
    }
    this._spheroidChangedCallback();
  }
  _spheroidChangedCallback() {
    const spheroid = this._spheroidComponentRef.get();
    if (null !== spheroid) {
      this.__setRadius(Math.max(spheroid.getEquatorialRadius(), spheroid.getPolarRadius()));
    } else {
      this.__setRadius(0);
    }
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
/** 层级 −1 是无纹理虚根；子块 row 向下、CRS y 向上。真实瓦片固定 21×21 网格，范围截到图层边界，资源由 component 作为 acquire/release 所有者。 */
class WMTSTile extends Pioneer.Tile {
  constructor(component, parentTile, level, row, col, tileBounds) {
    super(parentTile);
    this._component = component;
    this._level = level;
    this._row = row;
    this._col = col;
    this._tileBounds = new Pioneer.Rect();
    this._tileBounds.copy(tileBounds);
    this._center = new Pioneer.Vector3(NaN, NaN, NaN);
    this._radius = 0;
    this._threeJsMaterial = null;
    this._threeJsObject = null;
    this._visible = false;
    const spheroid = component.__getSpheroidComponent();
    if (!this._component.__getTileMatrixSet() || !spheroid) throw new Error(`Missing spheroid or tile matrix set in ${component}`);
  }
  createNewTile(parentTile, childRow, childColumn) {
    const childLevel = parentTile._level + 1;
    const row = 2 * parentTile._row + childRow;
    const column = 2 * parentTile._col + childColumn;
    const matrixSet = parentTile._component.__getTileMatrixSet();
    if (!matrixSet) return null;
    const tileCounts = matrixSet.getNumTiles(parentTile._level + 1);
    if (void 0 === tileCounts || row >= tileCounts.y || column >= tileCounts.x) return null;
    const childBounds = new Pioneer.Rect();
    childBounds.origin.set(parentTile._tileBounds.origin.x + .5 * childColumn * parentTile._tileBounds.size.x, parentTile._tileBounds.origin.y + .5 * (1 - childRow) * parentTile._tileBounds.size.y);
    childBounds.size.set(.5 * parentTile._tileBounds.size.x, .5 * parentTile._tileBounds.size.y);
    return new WMTSTile(parentTile._component, parentTile, childLevel, row, column, childBounds);
  }
  checkSplit() {
    const matrixSet = this._component.__getTileMatrixSet();
    if (!matrixSet || this._level >= matrixSet.numLevels - 1) return false;
    const matrixBounds = this._component.__getTileMatrixSet()?.boundingBox;
    return !(!matrixBounds || !this._tileBounds.intersects(matrixBounds)) && !(this._level >= this._component.__getMaxLevel()) && !(this._component.__getLoadsThisFrame() >= 4) && (this._level < this._component.__getMinLevel() || -1 === this._level || this._getNearestDistance() < this._component.__getSplitJoinFactor() * this._radius / matrixSet.maxPixelSize);
  }
  checkJoin() {
    if (-1 === this._level) return false;
    if (this._component.__getLoadsThisFrame() >= 1) return false;
    if (this._level > this._component.__getMaxLevel()) return true;
    if (this._level <= this._component.__getMinLevel()) return false;
    const matrixSet = this._component.__getTileMatrixSet();
    return !!matrixSet && this._getNearestDistance() > this._component.__getSplitJoinFactor() * this._radius * 4 / matrixSet.maxPixelSize;
  }
  /** 纹理失败回退 gray；await 后若已销毁，移除并销毁材质且 release 纹理，不建立网格。CRS 坐标夹紧后同步修正 UV。 */
  async load() {
    if (-1 === this._level) return;
    this._component.__incLoadsThisFrame();
    if (null !== this._threeJsMaterial) throw new Error("Tile already has material.");
    const layerBounds = this._component.__getLayer()?.boundingBox;
    if (!layerBounds) throw new Error("There is no layer bounds.");
    const resourceManager = this._component.getEngine().getResourceManager();
    if (!this._tileBounds.intersects(layerBounds)) return;
    this._threeJsMaterial = Pioneer.MaterialUtils.get();
    this._component.getThreeJsMaterials().push(this._threeJsMaterial);
    for (const option of this._component.__getMaterialOptions()) this._threeJsMaterial.defines[option] = true;
    let texture;
    let tileUrl = this._component.__getTileUrl();
    tileUrl = tileUrl.replace("{TileMatrix}", `${this._level}`);
    tileUrl = tileUrl.replace("{TileRow}", `${this._row}`);
    tileUrl = tileUrl.replace("{TileCol}", `${this._col}`);
    try {
      texture = await resourceManager.acquire(this._component, tileUrl, "texture", -this._component.getEntity().getLeastCameraDepth());
    } catch {
      texture = await resourceManager.acquire(this._component, "gray", "texture", -this._component.getEntity().getLeastCameraDepth());
    }
    this._threeJsMaterial.uniforms.colorTexture.value = texture;
    if (this.isDestroyed()) {
      resourceManager.release(this._component, texture, "texture");
      const materials = this._component.getThreeJsMaterials();
      for (let materialIndex = 0, materialCount = materials.length; materialIndex < materialCount; materialIndex++) if (materials[materialIndex] === this._threeJsMaterial) {
        materials.splice(materialIndex, 1);
        break;
      }
      return void Pioneer.ThreeJsHelper.destroyMaterial(this._threeJsMaterial, false);
    }
    const layer = this._component.__getLayer();
    const matrixSet = this._component.__getTileMatrixSet();
    const spheroid = this._component.__getSpheroidComponent();
    if (!layer || !matrixSet || !spheroid) throw new Error("Missing layer or Three.js material.");
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
    const rowsPerSide = 21;
    const columnsPerSide = 21;
    const positions = new Float32Array(1323);
    const normals = new Float32Array(1323);
    const uvs = new Float32Array(882);
    const indices = new Uint16Array(2520);
    const crsPosition = new Pioneer.Vector2();
    const clampedCRSPosition = new Pioneer.Vector2();
    const lla = new Pioneer.LatLonAlt();
    const position = new Pioneer.Vector3();
    const boundsMin = new Pioneer.Vector3();
    const boundsMax = new Pioneer.Vector3();
    for (let row = 0; row < rowsPerSide; row++) {
      let rowFraction = 1 - row / 20;
      crsPosition.y = Pioneer.MathUtils.lerp(this._tileBounds.origin.y, this._tileBounds.origin.y + this._tileBounds.size.y, rowFraction);
      clampedCRSPosition.y = Pioneer.MathUtils.clamp(crsPosition.y, layerBounds.origin.y, layerBounds.origin.y + layerBounds.size.y);
      rowFraction += (clampedCRSPosition.y - crsPosition.y) / this._tileBounds.size.y;
      for (let column = 0; column < columnsPerSide; column++) {
        let columnFraction = column / 20;
        crsPosition.x = Pioneer.MathUtils.lerp(this._tileBounds.origin.x, this._tileBounds.origin.x + this._tileBounds.size.x, columnFraction);
        clampedCRSPosition.x = Pioneer.MathUtils.clamp(crsPosition.x, layerBounds.origin.x, layerBounds.origin.x + layerBounds.size.x);
        columnFraction += (clampedCRSPosition.x - crsPosition.x) / this._tileBounds.size.x;
        matrixSet.crsUnitsToLLA(lla, clampedCRSPosition);
        spheroid.xyzFromLLA(position, lla);
        boundsMin.set(Math.min(boundsMin.x, position.x), Math.min(boundsMin.y, position.y), Math.min(boundsMin.z, position.z));
        boundsMax.set(Math.max(boundsMax.x, position.x), Math.max(boundsMax.y, position.y), Math.max(boundsMax.z, position.z));
        const vertexIndex = row * columnsPerSide + column;
        positions[3 * vertexIndex + 0] = position.x;
        positions[3 * vertexIndex + 1] = position.y;
        positions[3 * vertexIndex + 2] = position.z;
        position.normalize(position);
        normals[3 * vertexIndex + 0] = position.x;
        normals[3 * vertexIndex + 1] = position.y;
        normals[3 * vertexIndex + 2] = position.z;
        uvs[2 * vertexIndex + 0] = columnFraction;
        uvs[2 * vertexIndex + 1] = 1 - rowFraction;
        const cellIndex = row * columnsPerSide + column;
        if (column < 20 && row < 20) {
          indices[6 * cellIndex + 0] = columnsPerSide * (row + 0) + (column + 0);
          indices[6 * cellIndex + 1] = columnsPerSide * (row + 1) + (column + 0);
          indices[6 * cellIndex + 2] = columnsPerSide * (row + 1) + (column + 1);
          indices[6 * cellIndex + 3] = columnsPerSide * (row + 0) + (column + 0);
          indices[6 * cellIndex + 4] = columnsPerSide * (row + 1) + (column + 1);
          indices[6 * cellIndex + 5] = columnsPerSide * (row + 0) + (column + 1);
        }
      }
    }
    const centerVertexIndex = Math.floor(10.5) * columnsPerSide + Math.floor(10.5);
    this._center.set(positions[3 * centerVertexIndex + 0], positions[3 * centerVertexIndex + 1], positions[3 * centerVertexIndex + 2]);
    const radiusSamplePosition = new Pioneer.Vector3();
    for (let radiusSampleRow = 0; radiusSampleRow < 5; radiusSampleRow++) for (let sampleColumn = 0; sampleColumn < 5; sampleColumn++) {
      const sampleVertexIndex = Math.floor(radiusSampleRow / 4 * 20) * columnsPerSide + Math.floor(sampleColumn / 4 * 20);
      radiusSamplePosition.set(positions[3 * sampleVertexIndex + 0], positions[3 * sampleVertexIndex + 1], positions[3 * sampleVertexIndex + 2]);
      const sampleRadius = radiusSamplePosition.distance(this._center);
      this._radius = Math.max(this._radius, sampleRadius);
    }
    Pioneer.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "position", positions);
    Pioneer.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "normal", normals);
    Pioneer.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "uv", uvs);
    Pioneer.ThreeJsHelper.setIndices(this._threeJsObject.geometry, indices);
    this._component.__addLoadedTile(this);
  }
  unload() {
    if (-1 === this._level) return;
    this._component.__removeLoadedTile(this);
    const meshObjects = this._component.getThreeJsObjects();
    for (let itemIndex = 0, itemCount = meshObjects.length; itemIndex < itemCount; itemIndex++) if (meshObjects[itemIndex] === this._threeJsObject) {
      meshObjects.splice(itemIndex, 1);
      break;
    }
    if (this._threeJsObject) {
      Pioneer.ThreeJsHelper.destroyObject(this._threeJsObject);
    }
    this._threeJsObject = null;
    if (null !== this._threeJsMaterial) {
      const materials = this._component.getThreeJsMaterials();
      for (let itemIndex = 0, itemCount = materials.length; itemIndex < itemCount; itemIndex++) if (materials[itemIndex] === this._threeJsMaterial) {
        materials.splice(itemIndex, 1);
        break;
      }
      const itemIndex = this._threeJsMaterial.uniforms.shadowRingsTexture;
      if (itemIndex && null !== itemIndex.value) {
        itemIndex.value = null;
      }
      const itemCount = this._threeJsMaterial.uniforms.colorTexture;
      if (itemCount.value) {
        this._component.getEngine().getResourceManager().release(this._component, itemCount.value, "texture");
      }
      Pioneer.ThreeJsHelper.destroyMaterial(this._threeJsMaterial, false);
      this._threeJsMaterial = null;
    }
  }
  prepareForRender() {
    if (this._threeJsObject) {
      this._threeJsObject.visible = this._visible;
    }
  }
  setVisible(visible) {
    if (this._threeJsObject) {
      this._threeJsObject.visible = this._visible;
    }
    this._visible = visible;
  }
  update() {
    let transitionsActive = this.check();
    const children = this.getChildren();
    for (let childIndex = 0, childCount = children.length; childIndex < childCount; childIndex++) transitionsActive = children[childIndex].update() || transitionsActive;
    return transitionsActive;
  }
  _getNearestDistance() {
    let nearestProjectedDistance = Number.POSITIVE_INFINITY;
    const cameraPositions = this._component.__getCameraPositions();
    const cameraFieldsOfView = this._component.__getCameraFieldsOfView();
    const cameraOffset = Pioneer.Vector3.pool.get();
    for (let cameraIndex = 0, cameraCount = cameraPositions.length; cameraIndex < cameraCount; cameraIndex++) {
      const cameraPosition = cameraPositions[cameraIndex];
      const fieldOfView = cameraFieldsOfView[cameraIndex];
      cameraOffset.sub(cameraPosition, this._center);
      const projectedDistance = Math.max(0, cameraOffset.magnitude() - this._radius) * Math.tan(fieldOfView / 2);
      if (nearestProjectedDistance > projectedDistance) {
        nearestProjectedDistance = projectedDistance;
      }
    }
    Pioneer.Vector3.pool.release(cameraOffset);
    return nearestProjectedDistance;
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
