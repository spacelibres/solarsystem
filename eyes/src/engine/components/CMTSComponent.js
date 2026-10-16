// Recovered from app.js:270137-303107.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 地面查询把椭球 LLA 方向转六面 UV，沿当前可见叶块采样高度；相机位置转实体局部系参与 LOD。端点配置和瓦片过渡分别跟踪完成状态。 */
class CMTSComponent extends PioneerPublicApi.BaseComponent {
  constructor(componentName, entity) {
    super(componentName, entity);
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
  setBaseUrl(channel, baseUrl) {
    this.resetResources();
    if (void 0 !== baseUrl) {
      this._endPoints.set(channel, {
        url: baseUrl,
        configuration: null
      });
    } else {
      this._endPoints.delete(channel);
    }
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
  getShadowEntity(shadowIndex) {
    return this._shadowEntities[shadowIndex]?.getName();
  }
  setShadowEntities(entityNames) {
    this._shadowEntities = [];
    for (const entityName of entityNames) this._shadowEntities.push(new PioneerPublicApi.EntityRef(this.getEntity().getScene(), entityName));
    const hasShadows = entityNames.length > 0;
    for (let materialIndex = 0, materialCount = this.getThreeJsMaterials().length; materialIndex < materialCount; materialIndex++) PioneerPublicApi.ThreeJsHelper.setDefine(this.getThreeJsMaterials()[materialIndex], "shadowEntities", hasShadows);
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
  getGroundPosition(positionOut, normalOut, queryPosition) {
    const spheroid = this._spheroidComponentRef.get();
    if (null === spheroid) return void positionOut.copy(PioneerPublicApi.Vector3.NaN);
    const lla = PioneerPublicApi.LatLonAlt.pool.get();
    spheroid.llaFromXYZ(lla, queryPosition);
    if (void 0 !== this._endPoints.get("height") && this._rootTiles) {
      const faceUV = PioneerPublicApi.Vector3.pool.get();
      const unitDirection = PioneerPublicApi.Vector3.pool.get();
      lla.alt = 1;
      PioneerPublicApi.Geometry.getXYZFromLLAOnSphere(unitDirection, lla, 0);
      PioneerPublicApi.CubeMap.xyzToUVFace(faceUV, unitDirection);
      let visibleTile = this._rootTiles[faceUV.z];
      for (; visibleTile && !visibleTile.isVisible() && visibleTile.getChildren().length > 0;) {
        const childTilesPerSide = 1 << visibleTile.getLevel() + 1;
        const childColumn = Math.floor(faceUV.x * childTilesPerSide - 2 * visibleTile.getTileCoord().x);
        const childRow = Math.floor(faceUV.y * childTilesPerSide - 2 * visibleTile.getTileCoord().y);
        visibleTile = visibleTile.getChildren()[2 * childRow + childColumn];
      }
      if (visibleTile && visibleTile.isVisible()) {
        const height = visibleTile.getHeight(faceUV);
        lla.alt = height;
      } else lla.alt = this._heightOffset;
      PioneerPublicApi.Vector3.pool.release(unitDirection);
      PioneerPublicApi.Vector3.pool.release(faceUV);
    } else lla.alt = this._heightOffset;
    spheroid.xyzFromLLA(positionOut, lla);
    if (normalOut) {
      spheroid.upFromLLA(normalOut, lla);
    }
    PioneerPublicApi.LatLonAlt.pool.release(lla);
  }
  areTilesLoaded() {
    return null === this._tilesLoadedPromise;
  }
  async getTilesLoadedPromise(pollIntervalSeconds = .25, timeoutSeconds = Number.POSITIVE_INFINITY) {
    return (0, PioneerPublicApi.waitUntil)(() => {
      for (let tileIndex = 0, tileCount = this._loadedTiles.getSize(); tileIndex < tileCount; tileIndex++) {
        if (!this._loadedTiles.getAt(tileIndex).isFullyLoaded()) return false;
      }
      return true;
    }, pollIntervalSeconds, timeoutSeconds);
  }
  setSpheroidReference(componentName) {
    this._spheroidComponentRef.set(this.getEntity().getName(), componentName);
  }
  setTransparent(transparent) {
    this._transparent = transparent;
    this.resetResources();
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
    if ("loaded" !== this.getLoadState().state || null === this._spheroidComponentRef.get()) return;
    if (null === this._rootTiles) {
      if (this._numEndPointsLoading > 0) return;
      this._rootTiles = [];
      for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
        const cMTSTile = new CMTSTile(this, null, faceIndex, 0, new PioneerPublicApi.Vector2(0, 0), 0, 0);
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
    for (let viewportIndex = 0, viewportCount = this._engine.getNumViewports(); viewportIndex < viewportCount; viewportIndex++) {
      const cameraPosition = this._cameraPositions[viewportIndex];
      const camera = this._engine.getViewportAt(viewportIndex).getCamera();
      if (camera) {
        camera.getEntity().getPositionRelativeToEntity(cameraPosition, PioneerPublicApi.Vector3.Zero, this.getEntity());
        cameraPosition.rotateInverse(this.getEntity().getOrientation(), cameraPosition);
        this._cameraFieldsOfView[viewportIndex] = camera.getFieldOfView();
      }
    }
    let transitionsActive = false;
    for (let tileIndex = 0, tileCount = this._loadedTiles.getSize(); tileIndex < tileCount; tileIndex++) {
      const tile = this._loadedTiles.getAt(tileIndex);
      transitionsActive ||= tile.update();
    }
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
    for (let tileIndex = 0, tileCount = this._loadedTiles.getSize(); tileIndex < tileCount; tileIndex++) {
      this._loadedTiles.getAt(tileIndex).prepareForRender(camera);
    }
    PioneerPublicApi.ThreeJsHelper.setOrientationToEntity(this.getThreeJsObjects(), this.getEntity());
    const atmosphere = this._atmosphereComponentRef.get();
    PioneerPublicApi.MaterialUtils.setUniforms(this.getThreeJsMaterials(), camera, this.getEntity(), this._shadowEntities, atmosphere, true);
  }
  async __loadResources() {
    const configurationPromises = [];
    for (let endpointIndex = 0, endpointCount = this._endPoints.getSize(); endpointIndex < endpointCount; endpointIndex++) {
      const endpoint = this._endPoints.getAt(endpointIndex);
      const baseUrl = endpoint.value.url;
      this._numEndPointsLoading += 1;
      const configurationPromise = this.getEntity().getScene().getEngine().getDownloader().download(`${baseUrl}/configuration.json`, "text", -this.getEntity().getLeastCameraDepth()).then(downloadResult => {
        const configuration = JSON.parse(downloadResult.content);
        endpoint.value.configuration = configuration;
        if ("color" === endpoint.key) {
          this._colorTileSize = configuration.tile_size;
        }
        this._numEndPointsLoading -= 1;
      });
      configurationPromises.push(configurationPromise);
    }
    await Promise.allSettled(configurationPromises);
  }
  __unloadResources() {
    if (this._rootTiles) for (let faceIndex = 0; faceIndex < 6; faceIndex++) this._rootTiles[faceIndex].destroy();
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
  __addLoadedTile(tile) {
    this._loadedTiles.add(tile);
  }
  __removeLoadedTile(tile) {
    this._loadedTiles.delete(tile);
  }
  __getTransparent() {
    return this._transparent;
  }
  __getMaterialOptions() {
    return this._materialOptions;
  }
  _spheroidRefChangedCallback(previousSpheroid, nextSpheroid) {
    if (previousSpheroid) {
      previousSpheroid.removeChangedCallback(this._spheroidChangedCallback);
    }
    if (nextSpheroid) {
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
/** 每边网格含一圈裙边；内部索引跨度为 verticesPerSide−3。纹理有两像素边框（宽度 +4），UV 可来自祖先纹理；mesh 坐标减中心以保持浮点精度。 */
class CMTSTile extends PioneerPublicApi.Tile {
  constructor(component, parentTile, face, level, tileCoord, row, col) {
    super(parentTile);
    this._component = component;
    this._resourceManager = component.getEngine().getResourceManager();
    this._face = face;
    this._level = level;
    this._levelPow = 2 ** -Math.max(0, level);
    this._tile = new PioneerPublicApi.Vector2();
    this._tile.copy(tileCoord);
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
    for (let endpointIndex = 0; endpointIndex < this._component.__getEndPoints().getSize(); endpointIndex++) {
      const configuration = this._component.__getEndPoints().getAt(endpointIndex).value.configuration;
      if (configuration) for (let childRow = 0; childRow < 2; childRow++) for (let childColumn = 0; childColumn < 2; childColumn++) this._isLeaf &&= !CMTSTile._isInABoundary(configuration, this._face, this._level + 1, new PioneerPublicApi.Vector2(2 * this._tile.x + childColumn, 2 * this._tile.y + childRow));
    }
    const spheroid = component.__getSpheroidComponent();
    if (!spheroid) throw new Error(`No spheroid component on the ${component}!`);
    CMTSTile.cmtsCoordToPosition(this._center, this._face, this._levelPow, this._tile.x + .5, this._tile.y + .5, spheroid);
    const lowerLeftCorner = new PioneerPublicApi.Vector3();
    const lowerRightCorner = new PioneerPublicApi.Vector3();
    const upperRightCorner = new PioneerPublicApi.Vector3();
    const upperLeftCorner = new PioneerPublicApi.Vector3();
    CMTSTile.cmtsCoordToPosition(lowerLeftCorner, this._face, this._levelPow, this._tile.x, this._tile.y, spheroid);
    CMTSTile.cmtsCoordToPosition(lowerRightCorner, this._face, this._levelPow, this._tile.x + 1, this._tile.y, spheroid);
    CMTSTile.cmtsCoordToPosition(upperRightCorner, this._face, this._levelPow, this._tile.x + 1, this._tile.y + 1, spheroid);
    CMTSTile.cmtsCoordToPosition(upperLeftCorner, this._face, this._levelPow, this._tile.x, this._tile.y + 1, spheroid);
    this._radius = Math.max(lowerLeftCorner.distance(this._center), lowerRightCorner.distance(this._center), upperRightCorner.distance(this._center), upperLeftCorner.distance(this._center));
    const endpoints = this._component.__getEndPoints();
    for (let endpointIndex = 0; endpointIndex < endpoints.getSize(); endpointIndex++) {
      const endpointEntry = endpoints.getAt(endpointIndex);
      const channel = endpointEntry.key;
      const endpoint = endpointEntry.value;
      let textureLevel;
      if (endpoint.configuration && CMTSTile._isInABoundary(endpoint.configuration, this._face, this._level, this._tile)) {
        const rootTextureLevel = 0 === this._level && "height" !== channel ? this._getNonPositiveLevel(channel) : 0;
        textureLevel = 0 === this._level ? rootTextureLevel : this._level;
        if (!isNaN(textureLevel)) {
          this._textureLevels.set(channel, textureLevel);
        }
      } else textureLevel = this.getParent()?._textureLevels.getAt(endpointIndex).value ?? 0;
      this._textureLevels.set(channel, textureLevel);
    }
    for (let channelIndex = 0; channelIndex < this._textureLevels.getSize(); channelIndex++) {
      const {
        key: channel,
        value: textureLevel
      } = this._textureLevels.getAt(channelIndex);
      const ancestorScale = 1 << this._level - Math.max(0, textureLevel);
      this._uvOffsets.set(channel, new PioneerPublicApi.Vector2((this._tile.x - Math.floor(this._tile.x / ancestorScale) * ancestorScale) / ancestorScale, (this._tile.y - Math.floor(this._tile.y / ancestorScale) * ancestorScale) / ancestorScale));
      this._uvScales.set(channel, 1 / ancestorScale);
    }
    const heightConfiguration = this._component.__getEndPoints().get("height")?.configuration;
    this._numVertsPerSide = 1 << Math.max(5 - this._level, 0) + 3;
    if (heightConfiguration) {
      this._numVertsPerSide = Math.max(heightConfiguration.tile_size * this._uvScales.get("height") + 3, this._numVertsPerSide);
    }
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
  /** 高度取当前正式或临时 mesh 的插值位置再反解 LLA；不是重复读取已释放的高度 ImageData。 */
  getHeight(faceUV) {
    const tilesPerSide = 1 << this._level;
    const localU = faceUV.x * tilesPerSide - this._tile.x;
    const localV = faceUV.y * tilesPerSide - this._tile.y;
    const verticesPerSide = this._fullyLoaded ? this._numVertsPerSide : this._tempNumVertsPerSide;
    const sampleColumn = localU * (verticesPerSide - 3) + 1;
    const sampleRow = localV * (verticesPerSide - 3) + 1;
    const positions = this._fullyLoaded ? this._meshPositions : this._tempMeshPositions;
    this._getFromData(scratchPositionComponents, 0, sampleColumn, sampleRow, positions, verticesPerSide);
    scratchPosition.set(scratchPositionComponents[0], scratchPositionComponents[1], scratchPositionComponents[2]);
    scratchPosition.add(scratchPosition, this._center);
    const spheroid = this._component.__getSpheroidComponent();
    return spheroid ? (spheroid.llaFromXYZ(scratchLLA, scratchPosition), scratchLLA.alt) : 0;
  }
  createNewTile(parentTile, childRow, childColumn) {
    const childLevel = this._level + 1;
    const childTileCoord = new PioneerPublicApi.Vector2(2 * parentTile._tile.x + childColumn, 2 * parentTile._tile.y + childRow);
    return new CMTSTile(parentTile._component, this, this._face, childLevel, childTileCoord, childRow, childColumn);
  }
  checkSplit() {
    if (this._isLeaf || this._level >= this._component.getMaxLevel()) return false;
    if (this._level < this._component.getMinLevel()) return true;
    const colorTileSize = this._component.__getColorTileSize();
    return this._getNearestDistance() < this._component.__getSplitJoinThresholdFactor() * this._radius / colorTileSize;
  }
  /** 合并距离阈值是分裂阈值的四倍，保留 LOD 滞回，避免临界距离逐帧抖动。 */
  checkJoin() {
    if (this._level >= this._component.getMaxLevel()) return true;
    if (this._level < this._component.getMinLevel()) return false;
    const colorTileSize = this._component.__getColorTileSize();
    return this._getNearestDistance() > this._component.__getSplitJoinThresholdFactor() * this._radius / colorTileSize * 4;
  }
  async load() {
    if (await this._createTempObject()) {
      this._createObject();
    } else {
      await this._createObject();
    }
    this._component.__addLoadedTile(this);
  }
  unload() {
    this._component.__removeLoadedTile(this);
    this._fullyLoaded = false;
    if (this._tempThreeJsObject) {
      this._tempMeshPositions = new Float32Array(0);
      this._destroyObject(this._tempThreeJsObject);
      this._tempThreeJsMaterial = null;
      this._tempThreeJsObject = null;
    }
    if (this._threeJsObject) {
      this._meshPositions = new Float32Array(0);
      this._meshNormals = new Float32Array(0);
      if (this._meshTangents) {
        this._meshTangents = new Float32Array(0);
      }
      if (this._meshBitangents) {
        this._meshBitangents = new Float32Array(0);
      }
      this._meshUVs = new PioneerPublicApi.FastMap();
      this._meshIndices = new Uint16Array(0);
      this._destroyObject(this._threeJsObject);
      this._threeJsMaterial = null;
      this._threeJsObject = null;
    }
    if (this._heightData) {
      this._resourceManager.release(this._component, this._heightData, "imageData");
      this._heightData = null;
    }
  }
  isVisible() {
    return this._visible;
  }
  setVisible(visible) {
    this._visible = visible;
  }
  update() {
    if (!this._component.__endPointsAreLoaded()) return false;
    let transitionsActive = this.check();
    const parentTile = this.getParent();
    if (!(transitionsActive || parentTile?.getChildren()[0] !== this)) {
      transitionsActive ||= parentTile.check();
    }
    if (!transitionsActive && this._fullyLoaded && this._threeJsMaterial && 0 === this._numNonPositiveTexturesLoading && 0 === this._level && 0 === this.getChildren().length) {
      const endpoints = this._component.__getEndPoints();
      for (let endpointIndex = 0; endpointIndex < endpoints.getSize(); endpointIndex++) {
        const endpointEntry = endpoints.getAt(endpointIndex);
        const channel = endpointEntry.key;
        if ("height" === channel) continue;
        const endpoint = endpointEntry.value;
        if (!endpoint.configuration) continue;
        const textureLevel = this._getNonPositiveLevel(channel);
        if (isFinite(textureLevel) && textureLevel !== this._textureLevels.get(channel)) {
          this._textureLevels.set(channel, textureLevel);
          this._numNonPositiveTexturesLoading += 1;
          const textureUrl = `${endpoint.url}/${this._face}/${textureLevel}/0/0.${endpoint.configuration.extension}`;
          this._loadTexture(channel, textureUrl, this._threeJsMaterial).then(() => {
            const uvOffset = this._uvOffsets.get(channel);
            const uvScale = this._uvScales.get(channel);
            const uvs = this._meshUVs.get(channel);
            if (this._fullyLoaded && this._threeJsObject && uvOffset && void 0 !== uvScale && uvs) {
              const textureSize = this._component.__getColorTileSize() >> -textureLevel;
              for (let row = 0, numVertsPerSide = this._numVertsPerSide; row < numVertsPerSide; row++) for (let column = 0, columnsPerSide = this._numVertsPerSide; column < columnsPerSide; column++) {
                const vertexIndex = row * this._numVertsPerSide + column;
                uvs[2 * vertexIndex + 0] = ((uvOffset.x + uvScale * (column - 1) / (this._numVertsPerSide - 3)) * textureSize + 2) / (textureSize + 4);
                uvs[2 * vertexIndex + 1] = 1 - ((uvOffset.y + uvScale * (row - 1) / (this._numVertsPerSide - 3)) * textureSize + 2) / (textureSize + 4);
              }
              PioneerPublicApi.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "color" === channel ? "uv" : `${channel}UV`, uvs);
            }
          }).finally(() => {
            this._numNonPositiveTexturesLoading -= 1;
          });
        }
      }
    }
    return this._numNonPositiveTexturesLoading > 0 || transitionsActive;
  }
  /** 向祖先回溯到已完成 mesh，同时累积子象限 UV；低分辨率占位网格从祖先 mesh 插值，临时纹理仍独立 acquire。 */
  async _createTempObject() {
    let ancestorTile = this;
    const ancestorUVOffset = new PioneerPublicApi.Vector2(0, 0);
    let ancestorUVScale = 1;
    for (; ancestorTile && !ancestorTile._fullyLoaded;) {
      ancestorUVOffset.set((ancestorTile._col + ancestorUVOffset.x) / 2, (ancestorTile._row + ancestorUVOffset.y) / 2);
      ancestorUVScale *= .5;
      ancestorTile = ancestorTile.getParent();
    }
    if (!ancestorTile) return false;
    this._tempThreeJsMaterial = PioneerPublicApi.MaterialUtils.get();
    this._component.getThreeJsMaterials().push(this._tempThreeJsMaterial);
    this._tempThreeJsMaterial.defines.shadowEntities = this._component.getNumShadowEntities() > 0;
    for (const option of this._component.__getMaterialOptions()) this._tempThreeJsMaterial.defines[option] = true;
    const endpoints = this._component.__getEndPoints();
    const texturePromises = [];
    for (let endpointIndex = 0; endpointIndex < endpoints.getSize(); endpointIndex++) {
      const endpointEntry = endpoints.getAt(endpointIndex);
      const channel = endpointEntry.key;
      const endpoint = endpointEntry.value;
      if (!endpoint.configuration) continue;
      const textureLevel = ancestorTile._textureLevels.get(channel);
      if (void 0 === textureLevel || !isFinite(textureLevel)) continue;
      const textureColumn = ancestorTile._tile.x >> ancestorTile._level - textureLevel;
      const textureRow = ancestorTile._tile.y >> ancestorTile._level - textureLevel;
      const textureUrl = `${endpoint.url}/${ancestorTile._face}/${textureLevel}/${textureColumn}/${textureRow}.${endpoint.configuration.extension}`;
      texturePromises.push(this._loadTexture(channel, textureUrl, this._tempThreeJsMaterial));
    }
    await Promise.allSettled(texturePromises);
    const attributes = [];
    this._tempNumVertsPerSide = 3 + (this._numVertsPerSide - 3 >> 3);
    const vertexCount = this._tempNumVertsPerSide * this._tempNumVertsPerSide;
    const positions = new Float32Array(3 * vertexCount);
    this._tempMeshPositions = positions;
    attributes.push({
      name: "position",
      dimensions: 3
    });
    const normals = new Float32Array(3 * vertexCount);
    let tangents;
    let bitangents;
    attributes.push({
      name: "normal",
      dimensions: 3
    });
    if (this._textureLevels.has("normal")) {
      tangents = new Float32Array(3 * vertexCount);
      attributes.push({
        name: "tangent",
        dimensions: 3
      });
      bitangents = new Float32Array(3 * vertexCount);
      attributes.push({
        name: "bitangent",
        dimensions: 3
      });
    }
    const uvArrays = new Map();
    for (let channelIndex = 0; channelIndex < this._textureLevels.getSize(); channelIndex++) {
      const channel = this._textureLevels.getAt(channelIndex).key;
      if ("height" !== channel) {
        uvArrays.set(channel, new Float32Array(2 * vertexCount));
        attributes.push({
          name: "color" === channel ? "uv" : `${channel}UV`,
          dimensions: 2
        });
      }
    }
    const indexCount = (this._tempNumVertsPerSide - 1) * (this._tempNumVertsPerSide - 1) * 6;
    let indices;
    indices = indexCount <= 65536 ? new Uint16Array(indexCount) : new Uint32Array(indexCount);
    for (let row = 0, tempNumVertsPerSide = this._tempNumVertsPerSide; row < tempNumVertsPerSide; row++) for (let column = 0, columnsPerSide = this._tempNumVertsPerSide; column < columnsPerSide; column++) {
      const ancestorU = ancestorUVOffset.x + PioneerPublicApi.MathUtils.clamp01((column - 1) / (this._tempNumVertsPerSide - 3)) * ancestorUVScale;
      const ancestorV = ancestorUVOffset.y + PioneerPublicApi.MathUtils.clamp01((row - 1) / (this._tempNumVertsPerSide - 3)) * ancestorUVScale;
      const ancestorColumn = ancestorU * (ancestorTile._numVertsPerSide - 3) + 1;
      const ancestorRow = ancestorV * (ancestorTile._numVertsPerSide - 3) + 1;
      const vertexIndex = row * this._tempNumVertsPerSide + column;
      const positionOffset = 3 * vertexIndex;
      this._getFromData(positions, positionOffset, ancestorColumn, ancestorRow, ancestorTile._meshPositions, ancestorTile._numVertsPerSide);
      scratchPosition.set(positions[positionOffset + 0] + ancestorTile._center.x, positions[positionOffset + 1] + ancestorTile._center.y, positions[positionOffset + 2] + ancestorTile._center.z);
      if (!this._component.__getTransparent() && (0 === column || 0 === row || column >= this._tempNumVertsPerSide - 1 || row >= this._tempNumVertsPerSide - 1)) {
        this._adjustForTagHeight(scratchPosition);
      }
      positions[positionOffset + 0] = scratchPosition.x - this._center.x;
      positions[positionOffset + 1] = scratchPosition.y - this._center.y;
      positions[positionOffset + 2] = scratchPosition.z - this._center.z;
      this._getFromData(normals, positionOffset, ancestorColumn, ancestorRow, ancestorTile._meshNormals, ancestorTile._numVertsPerSide);
      if (tangents) {
        this._getFromData(tangents, positionOffset, ancestorColumn, ancestorRow, ancestorTile._meshTangents, ancestorTile._numVertsPerSide);
      }
      if (bitangents) {
        this._getFromData(bitangents, positionOffset, ancestorColumn, ancestorRow, ancestorTile._meshBitangents, ancestorTile._numVertsPerSide);
      }
      for (let channelIndex = 0; channelIndex < ancestorTile._textureLevels.getSize(); channelIndex++) {
        const {
          key: channel,
          value: textureLevel
        } = ancestorTile._textureLevels.getAt(channelIndex);
        if ("height" === channel) continue;
        const uvs = uvArrays.get(channel);
        const ancestorUVs = ancestorTile._meshUVs.get(channel);
        if (uvs && ancestorUVs) {
          const uvOffset = ancestorTile._uvOffsets.get(channel);
          const uvScale = ancestorTile._uvScales.get(channel);
          const textureSize = this._component.__getColorTileSize() >> Math.max(0, -textureLevel);
          uvs[2 * vertexIndex + 0] = ((uvOffset.x + uvScale * ancestorU) * textureSize + 2) / (textureSize + 4);
          uvs[2 * vertexIndex + 1] = 1 - ((uvOffset.y + uvScale * ancestorV) * textureSize + 2) / (textureSize + 4);
        }
      }
    }
    for (let row = 0, tempNumVertsPerSide = this._tempNumVertsPerSide; row < tempNumVertsPerSide; row++) for (let column = 0, columnsPerSide = this._tempNumVertsPerSide; column < columnsPerSide; column++) {
      const cellIndex = row * (this._tempNumVertsPerSide - 1) + column;
      indices[6 * cellIndex + 0] = this._tempNumVertsPerSide * (row + 0) + (column + 0);
      indices[6 * cellIndex + 1] = this._tempNumVertsPerSide * (row + 0) + (column + 1);
      indices[6 * cellIndex + 2] = this._tempNumVertsPerSide * (row + 1) + (column + 1);
      indices[6 * cellIndex + 3] = this._tempNumVertsPerSide * (row + 0) + (column + 0);
      indices[6 * cellIndex + 4] = this._tempNumVertsPerSide * (row + 1) + (column + 1);
      indices[6 * cellIndex + 5] = this._tempNumVertsPerSide * (row + 1) + (column + 0);
    }
    this._tempThreeJsObject = PioneerPublicApi.ThreeJsHelper.createMeshObject(this._component, this._tempThreeJsMaterial, attributes, false);
    this._component.getThreeJsObjects().push(this._tempThreeJsObject);
    PioneerPublicApi.ThreeJsHelper.useInDynEnvMap(this._tempThreeJsObject, true);
    PioneerPublicApi.ThreeJsHelper.setVertices(this._tempThreeJsObject.geometry, "position", positions);
    PioneerPublicApi.ThreeJsHelper.setVertices(this._tempThreeJsObject.geometry, "normal", normals);
    if (tangents) {
      PioneerPublicApi.ThreeJsHelper.setVertices(this._tempThreeJsObject.geometry, "tangent", tangents);
    }
    if (bitangents) {
      PioneerPublicApi.ThreeJsHelper.setVertices(this._tempThreeJsObject.geometry, "bitangent", bitangents);
    }
    for (let channelIndex = 0; channelIndex < this._textureLevels.getSize(); channelIndex++) {
      const channel = this._textureLevels.getAt(channelIndex).key;
      if ("height" === channel) continue;
      const uvs = uvArrays.get(channel);
      PioneerPublicApi.ThreeJsHelper.setVertices(this._tempThreeJsObject.geometry, "color" === channel ? "uv" : `${channel}UV`, uvs);
    }
    PioneerPublicApi.ThreeJsHelper.setIndices(this._tempThreeJsObject.geometry, indices);
    return true;
  }
  /** 批量资源返回后先检查销毁并逐项 release；正式顶点以定时批次生成，结束后才发布 GPU 数组并释放临时 mesh 与高度图。 */
  async _createObject() {
    const endpoints = this._component.__getEndPoints();
    const requests = {};
    for (let endpointIndex = 0; endpointIndex < endpoints.getSize(); endpointIndex++) {
      const endpointEntry = endpoints.getAt(endpointIndex);
      const channel = endpointEntry.key;
      const endpoint = endpointEntry.value;
      if (!endpoint.configuration) continue;
      const textureLevel = this._textureLevels.get(channel);
      if (void 0 === textureLevel || !isFinite(textureLevel)) continue;
      const textureColumn = this._tile.x >> this._level - Math.max(0, textureLevel);
      const textureRow = this._tile.y >> this._level - Math.max(0, textureLevel);
      const textureUrl = `${endpoint.url}/${this._face}/${textureLevel}/${textureColumn}/${textureRow}.${endpoint.configuration.extension}`;
      requests[channel] = "height" === channel ? {
        url: textureUrl,
        type: "imageData"
      } : {
        url: textureUrl,
        type: "texture"
      };
    }
    const priority = -this._component.getEntity().getLeastCameraDepth() + this._level / 100;
    const resources = await this._resourceManager.acquireMultiple(this._component, requests, priority);
    if (this.isDestroyed()) {
      for (const [channel, resource] of PioneerPublicApi.ObjectUtils.entries(resources)) this._resourceManager.release(this._component, resource, "height" === channel ? "imageData" : "texture");
      return;
    }
    const hasNormalMap = this._textureLevels.has("normal");
    const heightUVOffset = this._uvOffsets.get("height");
    const heightUVScale = this._uvScales.get("height");
    this._heightOffset = this._component.getHeightOffset();
    const heightConfiguration = this._component.__getEndPoints().get("height")?.configuration;
    if (heightConfiguration) {
      this._heightOffset += heightConfiguration.height_range.min * this._component.getHeightScale();
      this._heightScale = (heightConfiguration.height_range.max - heightConfiguration.height_range.min) * this._component.getHeightScale();
    }
    this._threeJsMaterial = PioneerPublicApi.MaterialUtils.get();
    this._component.getThreeJsMaterials().push(this._threeJsMaterial);
    this._threeJsMaterial.defines.shadowEntities = this._component.getNumShadowEntities() > 0;
    for (const option of this._component.__getMaterialOptions()) this._threeJsMaterial.defines[option] = true;
    for (const [channel, resource] of PioneerPublicApi.ObjectUtils.entries(resources)) this._setTexture(channel, resource, this._threeJsMaterial);
    const attributes = [];
    const vertexCount = this._numVertsPerSide * this._numVertsPerSide;
    this._meshPositions = new Float32Array(3 * vertexCount);
    attributes.push({
      name: "position",
      dimensions: 3
    });
    this._meshNormals = new Float32Array(3 * vertexCount);
    attributes.push({
      name: "normal",
      dimensions: 3
    });
    if (this._textureLevels.has("normal")) {
      this._meshTangents = new Float32Array(3 * vertexCount);
      attributes.push({
        name: "tangent",
        dimensions: 3
      });
      this._meshBitangents = new Float32Array(3 * vertexCount);
      attributes.push({
        name: "bitangent",
        dimensions: 3
      });
    }
    for (let channelIndex = 0; channelIndex < this._textureLevels.getSize(); channelIndex++) {
      const channel = this._textureLevels.getAt(channelIndex).key;
      this._meshUVs.set(channel, new Float32Array(2 * vertexCount));
      attributes.push({
        name: "color" === channel ? "uv" : `${channel}UV`,
        dimensions: 2
      });
    }
    const indexCount = (this._numVertsPerSide - 1) * (this._numVertsPerSide - 1) * 6;
    this._meshIndices = indexCount <= 65536 ? new Uint16Array(indexCount) : new Uint32Array(indexCount);
    this._threeJsObject = PioneerPublicApi.ThreeJsHelper.createMeshObject(this._component, this._threeJsMaterial, attributes, false);
    this._component.getThreeJsObjects().push(this._threeJsObject);
    PioneerPublicApi.ThreeJsHelper.useInDynEnvMap(this._threeJsObject, true);
    for (let row = 0, numVertsPerSide = this._numVertsPerSide; row < numVertsPerSide; row++) for (let column = 0, columnsPerSide = this._numVertsPerSide; column < columnsPerSide; column++) {
      const cellIndex = row * (this._numVertsPerSide - 1) + column;
      this._meshIndices[6 * cellIndex + 0] = this._numVertsPerSide * (row + 0) + (column + 0);
      this._meshIndices[6 * cellIndex + 1] = this._numVertsPerSide * (row + 0) + (column + 1);
      this._meshIndices[6 * cellIndex + 2] = this._numVertsPerSide * (row + 1) + (column + 1);
      this._meshIndices[6 * cellIndex + 3] = this._numVertsPerSide * (row + 0) + (column + 0);
      this._meshIndices[6 * cellIndex + 4] = this._numVertsPerSide * (row + 1) + (column + 1);
      this._meshIndices[6 * cellIndex + 5] = this._numVertsPerSide * (row + 1) + (column + 0);
    }
    PioneerPublicApi.ThreeJsHelper.setIndices(this._threeJsObject.geometry, this._meshIndices);
    const spheroid = this._component.__getSpheroidComponent();
    if (spheroid) {
      await new Promise(resolveBatch => {
        this._positionIndexToUpdate = 0;
        const batchTimer = setInterval(() => {
          const framesPerSecond = this._component.getEntity().getScene().getEngine().getFPS();
          const verticesPerBatch = Math.floor(50 * framesPerSecond);
          const batchEndIndex = this._positionIndexToUpdate + verticesPerBatch;
          for (; this._positionIndexToUpdate < batchEndIndex; this._positionIndexToUpdate++) {
            if (this.isDestroyed() || !this._threeJsObject || this._positionIndexToUpdate >= vertexCount) {
              clearInterval(batchTimer);
              resolveBatch();
              break;
            }
            this._updateVertex(this._positionIndexToUpdate, spheroid, hasNormalMap, heightUVOffset, heightUVScale);
          }
        }, 0);
      });
      if (!this.isDestroyed() && this._threeJsObject) {
        PioneerPublicApi.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "position", this._meshPositions);
        PioneerPublicApi.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "normal", this._meshNormals);
        if (this._meshTangents) {
          PioneerPublicApi.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "tangent", this._meshTangents);
        }
        if (this._meshBitangents) {
          PioneerPublicApi.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "bitangent", this._meshBitangents);
        }
        for (let channelIndex = 0; channelIndex < this._textureLevels.getSize(); channelIndex++) {
          const channel = this._textureLevels.getAt(channelIndex).key;
          const uvs = this._meshUVs.get(channel);
          PioneerPublicApi.ThreeJsHelper.setVertices(this._threeJsObject.geometry, "color" === channel ? "uv" : `${channel}UV`, uvs);
        }
        if (this._tempThreeJsObject) {
          this._tempMeshPositions = new Float32Array(0);
          this._destroyObject(this._tempThreeJsObject);
          this._tempThreeJsMaterial = null;
          this._tempThreeJsObject = null;
        }
        if (this._heightData) {
          this._resourceManager.release(this._component, this._heightData, "imageData");
          this._heightData = null;
        }
        this._fullyLoaded = true;
      } else this.unload();
    } else this.unload();
  }
  /** 非 height 贴图逐项 release，再销毁 material/mesh 并从 component 数组移除；height ImageData 在独立生命周期释放。 */
  _destroyObject(meshObject) {
    const material = meshObject.material;
    const endpoints = this._component.__getEndPoints();
    for (let endpointIndex = 0; endpointIndex < endpoints.getSize(); endpointIndex++) {
      const channel = endpoints.getAt(endpointIndex).key;
      if ("height" === channel) continue;
      const texture = material.uniforms[`${channel}Texture`].value;
      if (texture instanceof PioneerPublicApi.THREE.Texture) {
        this._resourceManager.release(this._component, texture, "texture");
      }
    }
    PioneerPublicApi.ThreeJsHelper.destroyMaterial(material, false);
    const materials = this._component.getThreeJsMaterials();
    for (let materialIndex = 0, itemCount = materials.length; materialIndex < itemCount; materialIndex++) if (materials[materialIndex] === material) {
      materials.splice(materialIndex, 1);
      break;
    }
    PioneerPublicApi.ThreeJsHelper.destroyObject(meshObject, this._component);
    const meshObjects = this._component.getThreeJsObjects();
    for (let objectIndex = 0, itemCount = meshObjects.length; objectIndex < itemCount; objectIndex++) if (meshObjects[objectIndex] === meshObject) {
      meshObjects.splice(objectIndex, 1);
      break;
    }
  }
  /** 按连续列/行坐标双线性混合三分量数组，先沿行再沿列；边界与额外裙边由调用者保证可访问。 */
  _getFromData(output, outputOffset, sampleColumn, sampleRow, source, verticesPerSide) {
    const column = Math.floor(sampleColumn);
    const row = Math.floor(sampleRow);
    const columnFraction = sampleColumn - column;
    const rowFraction = sampleRow - row;
    const lowerLeftOffset = 3 * (row * verticesPerSide + column);
    const upperLeftOffset = 3 * ((row + 1) * verticesPerSide + column);
    const lowerRightOffset = 3 * (row * verticesPerSide + (column + 1));
    const upperRightOffset = 3 * ((row + 1) * verticesPerSide + (column + 1));
    output[outputOffset + 0] = PioneerPublicApi.MathUtils.lerp(PioneerPublicApi.MathUtils.lerp(source[lowerLeftOffset + 0], source[upperLeftOffset + 0], rowFraction), PioneerPublicApi.MathUtils.lerp(source[lowerRightOffset + 0], source[upperRightOffset + 0], rowFraction), columnFraction);
    output[outputOffset + 1] = PioneerPublicApi.MathUtils.lerp(PioneerPublicApi.MathUtils.lerp(source[lowerLeftOffset + 1], source[upperLeftOffset + 1], rowFraction), PioneerPublicApi.MathUtils.lerp(source[lowerRightOffset + 1], source[upperRightOffset + 1], rowFraction), columnFraction);
    output[outputOffset + 2] = PioneerPublicApi.MathUtils.lerp(PioneerPublicApi.MathUtils.lerp(source[lowerLeftOffset + 2], source[upperLeftOffset + 2], rowFraction), PioneerPublicApi.MathUtils.lerp(source[lowerRightOffset + 2], source[upperRightOffset + 2], rowFraction), columnFraction);
  }
  /** 位置先在有效内区采样，高度法线用跨边界邻点差分；裙边另作径向下沉。tangent/bitangent 与贴图 UV 保留原面方向和 y 翻转。 */
  _updateVertex(vertexIndex, spheroid, hasNormalMap, heightUVOffset, heightUVScale) {
    const column = vertexIndex % this._numVertsPerSide;
    const row = Math.floor(vertexIndex / this._numVertsPerSide);
    const tileU = this._tile.x + (column - 1) / (this._numVertsPerSide - 3);
    const tileV = this._tile.y + (row - 1) / (this._numVertsPerSide - 3);
    const clampedTileU = this._tile.x + PioneerPublicApi.MathUtils.clamp01((column - 1) / (this._numVertsPerSide - 3));
    const clampedTileV = this._tile.y + PioneerPublicApi.MathUtils.clamp01((row - 1) / (this._numVertsPerSide - 3));
    CMTSTile.cmtsCoordToPosition(scratchPosition, this._face, this._levelPow, clampedTileU, clampedTileV, spheroid);
    spheroid.llaFromXYZ(scratchLLA, scratchPosition);
    spheroid.upFromLLA(surfaceNormal, scratchLLA);
    if (!spheroid.isPlanetographic()) {
      surfaceNormal.normalize(scratchPosition);
    }
    if (this._heightData && heightUVOffset && void 0 !== heightUVScale) {
      const heightPixels = this._heightData.data;
      const interiorPixelSize = this._heightData.width - 4;
      CMTSTile.getHeightPos(scratchPosition, surfaceNormal, PioneerPublicApi.MathUtils.clamp(column, 1, this._numVertsPerSide - 2), PioneerPublicApi.MathUtils.clamp(row, 1, this._numVertsPerSide - 2), heightPixels, heightUVOffset, this._numVertsPerSide, heightUVScale, interiorPixelSize, this._heightOffset, this._heightScale);
      if (!hasNormalMap) {
        CMTSTile.cmtsCoordToPosition(columnMinusPosition, this._face, this._levelPow, tileU - 1 / (this._numVertsPerSide - 3), tileV, spheroid);
        CMTSTile.getHeightPos(columnMinusPosition, surfaceNormal, column - 1, row, heightPixels, heightUVOffset, this._numVertsPerSide, heightUVScale, interiorPixelSize, this._heightOffset, this._heightScale);
        CMTSTile.cmtsCoordToPosition(columnPlusPosition, this._face, this._levelPow, tileU + 1 / (this._numVertsPerSide - 3), tileV, spheroid);
        CMTSTile.getHeightPos(columnPlusPosition, surfaceNormal, column + 1, row, heightPixels, heightUVOffset, this._numVertsPerSide, heightUVScale, interiorPixelSize, this._heightOffset, this._heightScale);
        CMTSTile.cmtsCoordToPosition(rowMinusPosition, this._face, this._levelPow, tileU, tileV - 1 / (this._numVertsPerSide - 3), spheroid);
        CMTSTile.getHeightPos(rowMinusPosition, surfaceNormal, column, row - 1, heightPixels, heightUVOffset, this._numVertsPerSide, heightUVScale, interiorPixelSize, this._heightOffset, this._heightScale);
        CMTSTile.cmtsCoordToPosition(rowPlusPosition, this._face, this._levelPow, tileU, tileV + 1 / (this._numVertsPerSide - 3), spheroid);
        CMTSTile.getHeightPos(rowPlusPosition, surfaceNormal, column, row + 1, heightPixels, heightUVOffset, this._numVertsPerSide, heightUVScale, interiorPixelSize, this._heightOffset, this._heightScale);
        CMTSTile.cmtsCoordToPosition(diagonalMinusPosition, this._face, this._levelPow, tileU - 1 / (this._numVertsPerSide - 3), tileV - 1 / (this._numVertsPerSide - 3), spheroid);
        CMTSTile.getHeightPos(diagonalMinusPosition, surfaceNormal, column - 1, row - 1, heightPixels, heightUVOffset, this._numVertsPerSide, heightUVScale, interiorPixelSize, this._heightOffset, this._heightScale);
        CMTSTile.cmtsCoordToPosition(diagonalPlusPosition, this._face, this._levelPow, tileU + 1 / (this._numVertsPerSide - 3), tileV + 1 / (this._numVertsPerSide - 3), spheroid);
        CMTSTile.getHeightPos(diagonalPlusPosition, surfaceNormal, column + 1, row + 1, heightPixels, heightUVOffset, this._numVertsPerSide, heightUVScale, interiorPixelSize, this._heightOffset, this._heightScale);
        columnMinusPosition.sub(columnPlusPosition, columnMinusPosition);
        rowMinusPosition.sub(rowPlusPosition, rowMinusPosition);
        surfaceNormal.cross(columnMinusPosition, rowMinusPosition);
        surfaceNormal.normalize(surfaceNormal);
      }
    } else scratchPosition.addMult(scratchPosition, surfaceNormal, this._heightOffset);
    if (!(this._component.__getTransparent() || 0 !== column && 0 !== row && column !== this._numVertsPerSide - 1 && row !== this._numVertsPerSide - 1)) {
      this._adjustForTagHeight(scratchPosition);
    }
    scratchPosition.sub(scratchPosition, this._center);
    this._meshPositions[3 * vertexIndex + 0] = scratchPosition.x;
    this._meshPositions[3 * vertexIndex + 1] = scratchPosition.y;
    this._meshPositions[3 * vertexIndex + 2] = scratchPosition.z;
    this._meshNormals[3 * vertexIndex + 0] = surfaceNormal.x;
    this._meshNormals[3 * vertexIndex + 1] = surfaceNormal.y;
    this._meshNormals[3 * vertexIndex + 2] = surfaceNormal.z;
    if (this._meshTangents) {
      CMTSTile.cmtsCoordToTangent(surfaceTangent, this._face, this._levelPow, tileU, tileV, spheroid);
      this._meshTangents[3 * vertexIndex + 0] = surfaceTangent.x;
      this._meshTangents[3 * vertexIndex + 1] = surfaceTangent.y;
      this._meshTangents[3 * vertexIndex + 2] = surfaceTangent.z;
    }
    if (this._meshBitangents) {
      CMTSTile.cmtsCoordToBitangent(surfaceBitangent, this._face, this._levelPow, tileU, tileV, spheroid);
      this._meshBitangents[3 * vertexIndex + 0] = surfaceBitangent.x;
      this._meshBitangents[3 * vertexIndex + 1] = surfaceBitangent.y;
      this._meshBitangents[3 * vertexIndex + 2] = surfaceBitangent.z;
    }
    for (let channelIndex = 0; channelIndex < this._textureLevels.getSize(); channelIndex++) {
      const {
        key: channel,
        value: textureLevel
      } = this._textureLevels.getAt(channelIndex);
      const uvOffset = this._uvOffsets.get(channel);
      const uvScale = this._uvScales.get(channel);
      const uvs = this._meshUVs.get(channel);
      if (uvOffset && void 0 !== uvScale && uvs) {
        const textureSize = this._component.__getColorTileSize() >> Math.max(0, -textureLevel);
        uvs[2 * vertexIndex + 0] = ((uvOffset.x + uvScale * (column - 1) / (this._numVertsPerSide - 3)) * textureSize + 2) / (textureSize + 4);
        uvs[2 * vertexIndex + 1] = 1 - ((uvOffset.y + uvScale * (row - 1) / (this._numVertsPerSide - 3)) * textureSize + 2) / (textureSize + 4);
      }
    }
  }
  _adjustForTagHeight(position) {
    position.setMagnitude(position, position.magnitude() - PioneerPublicApi.MathUtils.clamp(2 * this._heightScale * this._levelPow, .01 * this._radius, .05 * this._radius));
  }
  _getNonPositiveLevel(channel) {
    const endpoint = this._component.__getEndPoints().get(channel);
    if (!endpoint?.configuration) return NaN;
    const nearestProjectedDistance = this._getNearestDistance();
    if (!Number.isFinite(nearestProjectedDistance)) return endpoint.configuration.first_level;
    const textureSize = endpoint.configuration.tile_size;
    return PioneerPublicApi.MathUtils.clamp(4 - Math.floor(Math.log2(nearestProjectedDistance / this._radius / this._component.__getSplitJoinThresholdFactor() * textureSize * 4)), endpoint.configuration.first_level, 0);
  }
  _getNearestDistance() {
    let nearestProjectedDistance = Number.POSITIVE_INFINITY;
    const cameraPositions = this._component.__getCameraPositions();
    const cameraFieldsOfView = this._component.__getCameraFieldsOfView();
    const cameraOffset = PioneerPublicApi.Vector3.pool.get();
    for (let cameraIndex = 0, cameraCount = cameraPositions.length; cameraIndex < cameraCount; cameraIndex++) {
      const cameraPosition = cameraPositions[cameraIndex];
      const fieldOfView = cameraFieldsOfView[cameraIndex];
      cameraOffset.sub(cameraPosition, this._center);
      const projectedDistance = Math.max(0, cameraOffset.magnitude() - this._radius) * Math.tan(fieldOfView / 2);
      if (nearestProjectedDistance > projectedDistance) {
        nearestProjectedDistance = projectedDistance;
      }
    }
    PioneerPublicApi.Vector3.pool.release(cameraOffset);
    return nearestProjectedDistance;
  }
  toString() {
    return `${this._face}/${this._level}/${this._tile.x}/${this._tile.y}`;
  }
  prepareForRender(camera) {
    const meshObject = this._fullyLoaded ? this._threeJsObject : this._tempThreeJsObject;
    if (meshObject) {
      if (!this._visible) return void (meshObject.visible = false);
      if (!this._component.__getTransparent()) {
        const entity = this._component.getEntity();
        const cameraSpacePosition = entity.getCameraSpacePosition(camera);
        const centerInReference = PioneerPublicApi.Vector3.pool.get();
        centerInReference.rotate(entity.getOrientation(), this._center);
        const horizonAngle = Math.acos(centerInReference.dot(cameraSpacePosition) / centerInReference.magnitude() / cameraSpacePosition.magnitude());
        PioneerPublicApi.Vector3.pool.release(centerInReference);
        if (horizonAngle < Math.PI / 2 - Math.PI / 4 * this._levelPow) return void (meshObject.visible = false);
      }
      PioneerPublicApi.ThreeJsHelper.setPositionToEntity(meshObject, this._component.getEntity(), camera, this._center, true);
    }
  }
  /** await 之后再次检查 tile 是否销毁：已销毁则 release，存活才安装，防止晚到资源取得新所有权。 */
  async _loadTexture(channel, url, material) {
    const priority = -this._component.getEntity().getLeastCameraDepth() + this._level / 100;
    const resourceType = "height" === channel ? "imageData" : "texture";
    const resource = await this._resourceManager.acquire(this._component, url, resourceType, priority);
    if (this.isDestroyed()) {
      this._resourceManager.release(this._component, resource, resourceType);
    } else {
      this._setTexture(channel, resource, material);
    }
  }
  _setTexture(channel, heightData, material) {
    if ("height" === channel && heightData instanceof ImageData) {
      if (this._heightData) {
        this._resourceManager.release(this._component, this._heightData, "imageData");
      }
      this._heightData = heightData;
    } else if (heightData instanceof PioneerPublicApi.THREE.Texture) {
      const textureUniform = material.uniforms[`${channel}Texture`];
      if (textureUniform.value) {
        this._resourceManager.release(this._component, textureUniform.value, "texture");
      }
      textureUniform.value = heightData;
      if ("normal" === channel) {
        material.defines.normalMap = true;
        material.defines.normalUVs = true;
        material.defines.hasBitangents = true;
        material.needsUpdate = true;
        material.uniforms.normalScale.value.set(this._component.getHeightScale(), this._component.getHeightScale());
        material.uniforms.specularIntensity.value = 0;
        material.uniforms.specularHardness.value = 100;
      } else if ("specular" === channel) {
        material.defines.specularMap = true;
        material.defines.specularUVs = true;
        material.needsUpdate = true;
      } else {
        if ("night" === channel) {
          material.defines.nightMap = true;
          material.defines.nightUVs = true;
          material.defines.nightMapEmissive = true;
          material.needsUpdate = true;
        } else {
          if ("decal" === channel) {
            material.defines.decalMap = true;
            material.defines.decalUVs = true;
            material.needsUpdate = true;
          }
        }
      }
      if (this._component.__getTransparent()) {
        PioneerPublicApi.ThreeJsHelper.setTransparent(material, true);
        material.side = PioneerPublicApi.THREE.DoubleSide;
        material.needsUpdate = true;
      }
    }
  }
  /** 将配置最深级边界按 2^(last_level−level) 整数投影到当前层，行列上下界均包含端点。 */
  static _isInABoundary(configuration, face, level, tileCoord) {
    let covered = false;
    for (let boundaryIndex = 0, boundaryCount = configuration.boundaries.length; boundaryIndex < boundaryCount; boundaryIndex++) {
      const boundary = configuration.boundaries[boundaryIndex];
      if (boundary.face !== face) continue;
      if (boundary.last_level < level) continue;
      const boundaryScale = 1 << boundary.last_level - level;
      if (!(tileCoord.x < Math.floor(boundary.min[0] / boundaryScale) || Math.floor(boundary.max[0] / boundaryScale) < tileCoord.x || tileCoord.y < Math.floor(boundary.min[1] / boundaryScale) || Math.floor(boundary.max[1] / boundaryScale) < tileCoord.y)) {
        covered = true;
      }
    }
    return covered;
  }
  static getHeightPos(position, normal, column, row, heightPixels, uvOffset, verticesPerSide, uvScale, interiorPixelSize, heightOffset, heightScale) {
    const pixelColumn = (uvOffset.x + (column - 1) / (verticesPerSide - 3) * uvScale) * interiorPixelSize + 2;
    const pixelRow = interiorPixelSize + 4 - ((uvOffset.y + (row - 1) / (verticesPerSide - 3) * uvScale) * interiorPixelSize + 2);
    const normalizedHeight = this.getLinearInterpolatedHeightPixel(pixelColumn, pixelRow, heightPixels, interiorPixelSize + 4);
    position.addMult(position, normal, heightOffset + normalizedHeight * heightScale);
  }
  /** 像素中心在半整数，按距离中心选相邻像素权重；边缘像素索引由 getHeightFromPixel 截断。RGB 分别贡献 2^−8、2^−16、2^−24。 */
  static getLinearInterpolatedHeightPixel(pixelColumn, pixelRow, heightPixels, imageSize) {
    const column = Math.floor(pixelColumn);
    const row = Math.floor(pixelRow);
    const columnFraction = pixelColumn - column;
    const rowFraction = pixelRow - row;
    const columnCenterDistance = Math.abs(columnFraction - .5);
    const rowCenterDistance = Math.abs(rowFraction - .5);
    let height = this.getHeightFromPixel(column, row, heightPixels, imageSize) * ((1 - columnCenterDistance) * (1 - rowCenterDistance));
    if (columnFraction >= .5) {
      height += this.getHeightFromPixel(column + 1, row, heightPixels, imageSize) * (columnCenterDistance * (1 - rowCenterDistance));
      if (rowFraction < .5) {
        height += this.getHeightFromPixel(column + 1, row - 1, heightPixels, imageSize) * (columnCenterDistance * rowCenterDistance);
      } else {
        if (rowFraction >= .5) {
          height += this.getHeightFromPixel(column + 1, row + 1, heightPixels, imageSize) * (columnCenterDistance * rowCenterDistance);
        }
      }
    } else {
      if (columnFraction < .5) {
        height += this.getHeightFromPixel(column - 1, row, heightPixels, imageSize) * (columnCenterDistance * (1 - rowCenterDistance));
        if (rowFraction < .5) {
          height += this.getHeightFromPixel(column - 1, row - 1, heightPixels, imageSize) * (columnCenterDistance * rowCenterDistance);
        } else {
          if (rowFraction >= .5) {
            height += this.getHeightFromPixel(column - 1, row + 1, heightPixels, imageSize) * (columnCenterDistance * rowCenterDistance);
          }
        }
      }
    }
    if (rowFraction >= .5) {
      height += this.getHeightFromPixel(column, row + 1, heightPixels, imageSize) * ((1 - columnCenterDistance) * rowCenterDistance);
    } else {
      if (rowFraction < .5) {
        height += this.getHeightFromPixel(column, row - 1, heightPixels, imageSize) * ((1 - columnCenterDistance) * rowCenterDistance);
      }
    }
    return height;
  }
  static getHeightFromPixel(column, row, heightPixels, imageSize) {
    column = PioneerPublicApi.MathUtils.clamp(column, 0, imageSize - 1);
    const pixelOffset = 4 * ((row = PioneerPublicApi.MathUtils.clamp(row, 0, imageSize - 1)) * imageSize + column);
    return heightPixels[pixelOffset + 0] / 256 + heightPixels[pixelOffset + 1] / 65536 + heightPixels[pixelOffset + 2] / 16777216;
  }
  /** 先把 tile 坐标乘 2^−level 得面 UV；越界时逐步跨六面旋转/翻转坐标，直到落入 [0,1]，再由固定面基投影椭球。 */
  static cmtsCoordToPosition(positionOut, face, levelScale, tileU, tileV, spheroid) {
    let faceU = tileU * levelScale;
    let faceV = tileV * levelScale;
    for (; faceU < 0 || faceU > 1 || faceV < 0 || faceV > 1;) if (0 <= face && face <= 3) {
      if (faceU > 1) {
        faceU -= 1;
        face = (face + 1) % 4;
      } else if (faceU < 0) {
        faceU += 1;
        face = (face + 3) % 4;
      } else if (0 === face) {
        if (faceV < 0) {
          faceV += 1;
          face = 5;
        } else {
          if (faceV > 1) {
            faceV -= 1;
            face = 4;
          }
        }
      } else if (1 === face) {
        if (faceV < 0) {
          const previousFaceU = faceU;
          faceU = faceV + 1;
          faceV = 1 - previousFaceU;
          face = 5;
        } else if (faceV > 1) {
          const previousFaceU = faceU;
          faceU = 2 - faceV;
          faceV = previousFaceU;
          face = 4;
        }
      } else if (2 === face) {
        if (faceV < 0) {
          faceU = 1 - faceU;
          faceV = 0 - faceV;
          face = 5;
        } else {
          if (faceV > 1) {
            faceU = 1 - faceU;
            faceV = 2 - faceV;
            face = 4;
          }
        }
      } else if (3 === face) if (faceV < 0) {
        const previousFaceU = faceU;
        faceU = 0 - faceV;
        faceV = previousFaceU;
        face = 5;
      } else if (faceV > 1) {
        const previousFaceU = faceU;
        faceU = faceV - 1;
        faceV = 1 - previousFaceU;
        face = 4;
      }
    } else if (4 === face) {
      if (faceU < 0) {
        const previousFaceU = faceU;
        faceU = 1 - faceV;
        faceV = previousFaceU + 1;
        face = 3;
      } else if (faceU > 1) {
        const previousFaceU = faceU;
        faceU = faceV;
        faceV = 2 - previousFaceU;
        face = 1;
      } else if (faceV < 0) {
        faceV += 1;
        face = 0;
      } else {
        if (faceV > 1) {
          faceU = 1 - faceU;
          faceV = 2 - faceV;
          face = 2;
        }
      }
    } else if (5 === face) if (faceU < 0) {
      const previousFaceU = faceU;
      faceU = faceV;
      faceV = 0 - previousFaceU;
      face = 3;
    } else if (faceU > 1) {
      const previousFaceU = faceU;
      faceU = 1 - faceV;
      faceV = previousFaceU - 1;
      face = 1;
    } else if (faceV < 0) {
      faceU = 1 - faceU;
      faceV = 0 - faceV;
      face = 2;
    } else {
      if (faceV > 1) {
        faceV -= 1;
        face = 0;
      }
    }
    const cubeU = 2 * faceU - 1;
    const cubeV = 2 * faceV - 1;
    const faceBasis = this._basis[face];
    positionOut.set(faceBasis[0].x * cubeU + faceBasis[1].x * cubeV + faceBasis[2].x, faceBasis[0].y * cubeU + faceBasis[1].y * cubeV + faceBasis[2].y, faceBasis[0].z * cubeU + faceBasis[1].z * cubeV + faceBasis[2].z);
    positionOut.normalize(positionOut);
    const lla = PioneerPublicApi.LatLonAlt.pool.get();
    PioneerPublicApi.Geometry.getLLAFromXYZOnSphere(lla, positionOut, 0);
    lla.alt = 0;
    spheroid.xyzFromLLA(positionOut, lla);
    PioneerPublicApi.LatLonAlt.pool.release(lla);
  }
  static cmtsCoordToTangent(tangentOut, face, levelScale, tileU, tileV, spheroid) {
    this.cmtsCoordToPosition(tangentOut, face, levelScale, tileU, tileV, spheroid);
    const faceBasis = this._basis[face];
    tangentOut.setNormalTo(tangentOut, faceBasis[0]);
  }
  static cmtsCoordToBitangent(bitangentOut, face, levelScale, tileU, tileV, spheroid) {
    this.cmtsCoordToPosition(bitangentOut, face, levelScale, tileU, tileV, spheroid);
    const faceBasis = this._basis[face];
    bitangentOut.setNormalTo(bitangentOut, faceBasis[1]);
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
// 单次顶点和高度计算同步复用这些暂存量；不得跨 await 保存其内容或向调用者暴露引用。
const scratchPositionComponents = new Float32Array(3);
const scratchPosition = new PioneerPublicApi.Vector3();
const surfaceNormal = new PioneerPublicApi.Vector3();
const scratchLLA = new PioneerPublicApi.LatLonAlt();
const columnMinusPosition = new PioneerPublicApi.Vector3();
const columnPlusPosition = new PioneerPublicApi.Vector3();
const rowMinusPosition = new PioneerPublicApi.Vector3();
const rowPlusPosition = new PioneerPublicApi.Vector3();
const diagonalMinusPosition = new PioneerPublicApi.Vector3();
const diagonalPlusPosition = new PioneerPublicApi.Vector3();
const surfaceTangent = new PioneerPublicApi.Vector3();
const surfaceBitangent = new PioneerPublicApi.Vector3();
export { CMTSComponent };
