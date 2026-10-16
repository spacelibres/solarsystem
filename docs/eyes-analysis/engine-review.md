# 引擎当前源码逐文件参考

当前 233 个文件。所有签名、行号、读写证据来自当前源码；[架构研究基线](engine-architecture.md) 与 [实际语义进度](semantic-progress.json) 分开记录。完整短名、调用和反向依赖见 [总文档](README.md)。

## `eyes/src/engine/components/AnnulusComponent.js`

生成可调整内外半径的平面环带网格，按实体姿态定位并通过颜色透明度淡出。。[源码](../../eyes/src/engine/components/AnnulusComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-AnnulusComponent-js)

### `AnnulusComponent`

生成可调整内外半径的平面环带网格，按实体姿态定位并通过颜色透明度淡出。。父类 `Pioneer.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/AnnulusComponent.js#L5)：当前操作：写入 _alphaMultiplier、_color、_meshDirty、_numPointsOnCircle、_sizeInner、_sizeOuter；返回 无显式返回。
- `getInnerRadius()` [源码:16](../../eyes/src/engine/components/AnnulusComponent.js#L16)：当前操作：写入 无直接字段写入；返回 this._sizeInner。
- `setInnerRadius(sizeInner)` [源码:19](../../eyes/src/engine/components/AnnulusComponent.js#L19)：当前操作：写入 _meshDirty、_sizeInner；返回 无显式返回。
- `getOuterRadius()` [源码:23](../../eyes/src/engine/components/AnnulusComponent.js#L23)：当前操作：写入 无直接字段写入；返回 this._sizeOuter。
- `setOuterRadius(sizeOuter)` [源码:26](../../eyes/src/engine/components/AnnulusComponent.js#L26)：当前操作：写入 _meshDirty、_sizeOuter；返回 无显式返回。
- `getColor()` [源码:31](../../eyes/src/engine/components/AnnulusComponent.js#L31)：当前操作：写入 无直接字段写入；返回 this._color。
- `setColor(color)` [源码:34](../../eyes/src/engine/components/AnnulusComponent.js#L34)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__prepareForRender(camera)` [源码:38](../../eyes/src/engine/components/AnnulusComponent.js#L38)：当前操作：写入 _alphaMultiplier；返回 无显式返回。
- `__loadResources()` [源码:47](../../eyes/src/engine/components/AnnulusComponent.js#L47)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__unloadResources()` [源码:57](../../eyes/src/engine/components/AnnulusComponent.js#L57)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateMesh()` [源码:60](../../eyes/src/engine/components/AnnulusComponent.js#L60)：当前操作：写入 _meshDirty；返回 无显式返回。

## `eyes/src/engine/components/AtmosphereComponent.js`

依赖同实体 SpheroidComponent 的半径，以自定义散射材质渲染大气壳；同步密度、日落色和光源。。[源码](../../eyes/src/engine/components/AtmosphereComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-AtmosphereComponent-js)

### `AtmosphereComponent`

依赖同实体 SpheroidComponent 的半径，以自定义散射材质渲染大气壳；同步密度、日落色和光源。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/AtmosphereComponent.js#L5)：当前操作：写入 _color、_density、_emissivity、_scaleHeight、_spheroidChangedCallback、_spheroidComponentRef、_sunBrightness、_sunsetColor、_sunsetIntensity；返回 无显式返回。
- `getSpheroid()` [源码:19](../../eyes/src/engine/components/AtmosphereComponent.js#L19)：当前操作：写入 无直接字段写入；返回 this._spheroidComponentRef.get()。
- `getDensity()` [源码:22](../../eyes/src/engine/components/AtmosphereComponent.js#L22)：当前操作：写入 无直接字段写入；返回 this._density。
- `setDensity(density)` [源码:25](../../eyes/src/engine/components/AtmosphereComponent.js#L25)：当前操作：写入 _density；返回 无显式返回。
- `getScaleHeight()` [源码:29](../../eyes/src/engine/components/AtmosphereComponent.js#L29)：当前操作：写入 无直接字段写入；返回 this._scaleHeight。
- `setScaleHeight(scaleHeight)` [源码:32](../../eyes/src/engine/components/AtmosphereComponent.js#L32)：当前操作：写入 _scaleHeight；返回 无显式返回。
- `getEmissivity()` [源码:36](../../eyes/src/engine/components/AtmosphereComponent.js#L36)：当前操作：写入 无直接字段写入；返回 this._emissivity。
- `setEmissivity(emissivity)` [源码:39](../../eyes/src/engine/components/AtmosphereComponent.js#L39)：当前操作：写入 _emissivity；返回 无显式返回。
- `getColor()` [源码:43](../../eyes/src/engine/components/AtmosphereComponent.js#L43)：当前操作：写入 无直接字段写入；返回 this._color。
- `setColor(color)` [源码:46](../../eyes/src/engine/components/AtmosphereComponent.js#L46)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getSunBrightness()` [源码:50](../../eyes/src/engine/components/AtmosphereComponent.js#L50)：当前操作：写入 无直接字段写入；返回 this._sunBrightness。
- `setSunBrightness(sunBrightness)` [源码:53](../../eyes/src/engine/components/AtmosphereComponent.js#L53)：当前操作：写入 _sunBrightness；返回 无显式返回。
- `getSunsetColor()` [源码:57](../../eyes/src/engine/components/AtmosphereComponent.js#L57)：当前操作：写入 无直接字段写入；返回 this._sunsetColor。
- `setSunsetColor(color)` [源码:60](../../eyes/src/engine/components/AtmosphereComponent.js#L60)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getSunsetIntensity()` [源码:64](../../eyes/src/engine/components/AtmosphereComponent.js#L64)：当前操作：写入 无直接字段写入；返回 this._sunsetIntensity。
- `setSunsetIntensity(sunsetIntensity)` [源码:67](../../eyes/src/engine/components/AtmosphereComponent.js#L67)：当前操作：写入 _sunsetIntensity；返回 无显式返回。
- `setSpheroidReference(nameOrClassIndex)` [源码:71](../../eyes/src/engine/components/AtmosphereComponent.js#L71)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__destroy()` [源码:74](../../eyes/src/engine/components/AtmosphereComponent.js#L74)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:81](../../eyes/src/engine/components/AtmosphereComponent.js#L81)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__prepareForRender(camera)` [源码:84](../../eyes/src/engine/components/AtmosphereComponent.js#L84)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__loadResources()` [源码:95](../../eyes/src/engine/components/AtmosphereComponent.js#L95)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__unloadResources()` [源码:165](../../eyes/src/engine/components/AtmosphereComponent.js#L165)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_spheroidRefChangedCallback(previousSpheroid, nextSpheroid)` [源码:168](../../eyes/src/engine/components/AtmosphereComponent.js#L168)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_spheroidChangedCallback()` [源码:177](../../eyes/src/engine/components/AtmosphereComponent.js#L177)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/components/BaseComponent.js`

所有渲染组件的资源状态机、相机投影半径、可见性和 Three.js 对象所有权基类。。[源码](../../eyes/src/engine/components/BaseComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-BaseComponent-js)

### `BaseComponent`

渲染组件基类拥有加载状态与 Three.js 对象列表；派生类实现资源钩子，基类负责可见性、相机缓存与加载回调。。父类 `PioneerPublicApi.EntityItem`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/BaseComponent.js#L5)：当前操作：写入 _excludedCameras、_forceLoaded、_greatestPixelSpaceRadius、_isGroundComponent、_loadState、_pixelSpaceRadiusPerCamera、_radius、_renderingEnabled、_resourcesLoadedCallback、_resourcesUnloadedCallback、_threeJsMaterials、_threeJsObjects、_usesEntityOrientation、_visibleInterval；返回 无显式返回。
- `__destroy()` [源码:24](../../eyes/src/engine/components/BaseComponent.js#L24)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setEnabled(enabled)` [源码:28](../../eyes/src/engine/components/BaseComponent.js#L28)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getRadius()` [源码:32](../../eyes/src/engine/components/BaseComponent.js#L32)：当前操作：写入 无直接字段写入；返回 this._radius。
- `__setRadius(radius)` [源码:35](../../eyes/src/engine/components/BaseComponent.js#L35)：当前操作：写入 _radius；返回 无显式返回。
- `getPixelSpaceRadiusInCamera(camera)` [源码:38](../../eyes/src/engine/components/BaseComponent.js#L38)：当前操作：写入 无直接字段写入；返回 this._pixelSpaceRadiusPerCamera.get(camera)。
- `getGreatestPixelSpaceRadius()` [源码:41](../../eyes/src/engine/components/BaseComponent.js#L41)：当前操作：写入 无直接字段写入；返回 this._greatestPixelSpaceRadius。
- `isGroundComponent()` [源码:44](../../eyes/src/engine/components/BaseComponent.js#L44)：当前操作：写入 无直接字段写入；返回 this._isGroundComponent。
- `setIsGroundComponent(isGroundComponent)` [源码:47](../../eyes/src/engine/components/BaseComponent.js#L47)：当前操作：写入 _isGroundComponent；返回 无显式返回。
- `getThreeJsObjects()` [源码:50](../../eyes/src/engine/components/BaseComponent.js#L50)：当前操作：写入 无直接字段写入；返回 this._threeJsObjects。
- `getThreeJsMaterials()` [源码:53](../../eyes/src/engine/components/BaseComponent.js#L53)：当前操作：写入 无直接字段写入；返回 this._threeJsMaterials。
- `getThreeJsObjectByName(objectName)` [源码:56](../../eyes/src/engine/components/BaseComponent.js#L56)：当前操作：写入 无直接字段写入；返回 object、null。
- `getThreeJsPositionInObject(output, object)` [源码:63](../../eyes/src/engine/components/BaseComponent.js#L63)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getThreeJsOrientationInObject(output, object)` [源码:74](../../eyes/src/engine/components/BaseComponent.js#L74)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setAlphaFadeMultiplier(fadeMultiplier)` [源码:89](../../eyes/src/engine/components/BaseComponent.js#L89)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getLoadState()` [源码:95](../../eyes/src/engine/components/BaseComponent.js#L95)：当前操作：写入 无直接字段写入；返回 this._loadState。
- `isForceLoaded()` [源码:98](../../eyes/src/engine/components/BaseComponent.js#L98)：当前操作：写入 无直接字段写入；返回 this._forceLoaded。
- `setForceLoaded(forceLoaded)` [源码:101](../../eyes/src/engine/components/BaseComponent.js#L101)：当前操作：写入 _forceLoaded；返回 无显式返回。
- `__updateLoadState()` [源码:106](../../eyes/src/engine/components/BaseComponent.js#L106)：使用 0.5 像素装载、0.25 像素卸载的滞回区间，减少边界抖动；forceLoaded 仍要求实体和组件启用。
- `resetResources()` [源码:112](../../eyes/src/engine/components/BaseComponent.js#L112)：当前操作：写入 _loadState；返回 无显式返回。
- `setResourcesLoadedCallback(resourcesLoadedCallback)` [源码:117](../../eyes/src/engine/components/BaseComponent.js#L117)：当前操作：写入 _resourcesLoadedCallback；返回 无显式返回。
- `setResourcesUnloadedCallback(resourcesUnloadedCallback)` [源码:120](../../eyes/src/engine/components/BaseComponent.js#L120)：当前操作：写入 _resourcesUnloadedCallback；返回 无显式返回。
- `_loadResources()` [源码:124](../../eyes/src/engine/components/BaseComponent.js#L124)：异步期间 resetResources 可将状态换成 unloaded；结果到达后检查该状态，必要时立即走卸载钩子归还资源。
- `_unloadResources()` [源码:133](../../eyes/src/engine/components/BaseComponent.js#L133)：派生类先清理实际资源，再清空基类对象列表并通知外部；回调观察到的是 unloaded 状态。
- `__loadResources()` [源码:140](../../eyes/src/engine/components/BaseComponent.js#L140)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__unloadResources()` [源码:141](../../eyes/src/engine/components/BaseComponent.js#L141)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getLoadedPromise(forceLoaded=false, timeout=Number.POSITIVE_INFINITY)` [源码:143](../../eyes/src/engine/components/BaseComponent.js#L143)：先跨过一帧；forceLoaded=false 时 unloaded 也满足，不能据此断言 GPU 资源已建立。
- `__updateCameraVariablesBase(camera)` [源码:147](../../eyes/src/engine/components/BaseComponent.js#L147)：当前操作：写入 无直接字段写入；返回 void。
- `__updateBase()` [源码:155](../../eyes/src/engine/components/BaseComponent.js#L155)：当前操作：写入 _greatestPixelSpaceRadius；返回 无显式返回。
- `__prepareForRenderBase(camera)` [源码:164](../../eyes/src/engine/components/BaseComponent.js#L164)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateCameraVariables(camera)` [源码:175](../../eyes/src/engine/components/BaseComponent.js#L175)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__prepareForRender(camera)` [源码:176](../../eyes/src/engine/components/BaseComponent.js#L176)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getUsesEntityOrientation()` [源码:177](../../eyes/src/engine/components/BaseComponent.js#L177)：当前操作：写入 无直接字段写入；返回 this._usesEntityOrientation。
- `__setUsesEntityOrientation(usesEntityOrientation)` [源码:180](../../eyes/src/engine/components/BaseComponent.js#L180)：当前操作：写入 _usesEntityOrientation；返回 无显式返回。
- `isRendering(camera)` [源码:184](../../eyes/src/engine/components/BaseComponent.js#L184)：当前操作：写入 无直接字段写入；返回 "loaded"===this._loadState.state&&this._renderingEnabled&&(void 0===camera\|\|!this._excludedCameras.has(camera))。
- `getRenderingEnabled()` [源码:187](../../eyes/src/engine/components/BaseComponent.js#L187)：当前操作：写入 无直接字段写入；返回 this._renderingEnabled。
- `setRenderingEnabled(renderingEnabled)` [源码:190](../../eyes/src/engine/components/BaseComponent.js#L190)：当前操作：写入 _renderingEnabled；返回 无显式返回。
- `isExcludedFromCamera(camera)` [源码:194](../../eyes/src/engine/components/BaseComponent.js#L194)：当前操作：写入 无直接字段写入；返回 this._excludedCameras.has(camera)。
- `setExcludedFromCamera(camera, excluded)` [源码:197](../../eyes/src/engine/components/BaseComponent.js#L197)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getVisibleInterval()` [源码:200](../../eyes/src/engine/components/BaseComponent.js#L200)：当前操作：写入 无直接字段写入；返回 this._visibleInterval。
- `setVisibleInterval(visibleInterval)` [源码:203](../../eyes/src/engine/components/BaseComponent.js#L203)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__setVisible(visible)` [源码:206](../../eyes/src/engine/components/BaseComponent.js#L206)：当前操作：写入 _threeJsObjects[objectIndex].visible；返回 无显式返回。
- `__removeCameraDependentsBase(camera)` [源码:209](../../eyes/src/engine/components/BaseComponent.js#L209)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__clearCameraDependentsBase()` [源码:213](../../eyes/src/engine/components/BaseComponent.js#L213)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__removeCameraDependents(camera)` [源码:217](../../eyes/src/engine/components/BaseComponent.js#L217)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__clearCameraDependents()` [源码:218](../../eyes/src/engine/components/BaseComponent.js#L218)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toString()` [源码:219](../../eyes/src/engine/components/BaseComponent.js#L219)：当前操作：写入 无直接字段写入；返回 ˋ${this.getEntity().getName()}.${this.constructor.name}.${classIndex}ˋ。

## `eyes/src/engine/components/CMTSComponent.js`

按立方体面切分并异步细分地形瓦片，组合高程、颜色及辅助纹理，为地表夹持提供高度查询。。[源码](../../eyes/src/engine/components/CMTSComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-CMTSComponent-js)

### `CMTSComponent`

地面查询把椭球 LLA 方向转六面 UV，沿当前可见叶块采样高度；相机位置转实体局部系参与 LOD。端点配置和瓦片过渡分别跟踪完成状态。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/CMTSComponent.js#L5)：当前操作：写入 _atmosphereComponentRef、_cameraFieldsOfView、_cameraPositions、_colorTileSize、_endPoints、_engine、_heightOffset、_heightScale、_loadedTiles、_materialOptions、_maxLevel、_minLevel、_numEndPointsLoading、_rootTiles、_shadowEntities、_spheroidChangedCallback、_spheroidComponentRef、_splitJoinThresholdFactor、_threeJsScene、_tilesLoadedPromise、_transitionsCompleteCallback、_transparent；返回 无显式返回。
- `setBaseUrl(channel, baseUrl)` [源码:33](../../eyes/src/engine/components/CMTSComponent.js#L33)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getHeightOffset()` [源码:44](../../eyes/src/engine/components/CMTSComponent.js#L44)：当前操作：写入 无直接字段写入；返回 this._heightOffset。
- `setHeightOffset(heightOffset)` [源码:47](../../eyes/src/engine/components/CMTSComponent.js#L47)：当前操作：写入 _heightOffset；返回 无显式返回。
- `getHeightScale()` [源码:51](../../eyes/src/engine/components/CMTSComponent.js#L51)：当前操作：写入 无直接字段写入；返回 this._heightScale。
- `setHeightScale(heightScale)` [源码:54](../../eyes/src/engine/components/CMTSComponent.js#L54)：当前操作：写入 _heightScale；返回 无显式返回。
- `getMinLevel()` [源码:58](../../eyes/src/engine/components/CMTSComponent.js#L58)：当前操作：写入 无直接字段写入；返回 this._minLevel。
- `setMinLevel(minLevel)` [源码:61](../../eyes/src/engine/components/CMTSComponent.js#L61)：当前操作：写入 _minLevel；返回 无显式返回。
- `getMaxLevel()` [源码:64](../../eyes/src/engine/components/CMTSComponent.js#L64)：当前操作：写入 无直接字段写入；返回 this._maxLevel。
- `setMaxLevel(maxLevel)` [源码:67](../../eyes/src/engine/components/CMTSComponent.js#L67)：当前操作：写入 _maxLevel；返回 无显式返回。
- `getNumShadowEntities()` [源码:70](../../eyes/src/engine/components/CMTSComponent.js#L70)：当前操作：写入 无直接字段写入；返回 this._shadowEntities.length。
- `getShadowEntity(shadowIndex)` [源码:73](../../eyes/src/engine/components/CMTSComponent.js#L73)：当前操作：写入 无直接字段写入；返回 this._shadowEntities[shadowIndex]?.getName()。
- `setShadowEntities(entityNames)` [源码:76](../../eyes/src/engine/components/CMTSComponent.js#L76)：当前操作：写入 _shadowEntities；返回 无显式返回。
- `isMaterialOptionEnabled(option)` [源码:82](../../eyes/src/engine/components/CMTSComponent.js#L82)：当前操作：写入 无直接字段写入；返回 this._materialOptions.has(option)。
- `setMaterialOption(option, enabled)` [源码:85](../../eyes/src/engine/components/CMTSComponent.js#L85)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getGroundPosition(positionOut, normalOut, queryPosition)` [源码:103](../../eyes/src/engine/components/CMTSComponent.js#L103)：当前操作：写入 无直接字段写入；返回 void positionOut.copy(PioneerPublicApi.Vector3.NaN)。
- `areTilesLoaded()` [源码:134](../../eyes/src/engine/components/CMTSComponent.js#L134)：当前操作：写入 无直接字段写入；返回 null===this._tilesLoadedPromise。
- `getTilesLoadedPromise(pollIntervalSeconds=.25, timeoutSeconds=Number.POSITIVE_INFINITY)` [源码:137](../../eyes/src/engine/components/CMTSComponent.js#L137)：当前操作：写入 无直接字段写入；返回 (0,PioneerPublicApi.waitUntil)(()=>{for(let tileIndex=0,tileCount=this._loadedTiles.getSize();tileIndex<tileCount;tileIndex++){if(!this._loadedTiles.getAt(tileIndex).isFullyLoaded())return false;}return true;},pollInterv。
- `setSpheroidReference(componentName)` [源码:145](../../eyes/src/engine/components/CMTSComponent.js#L145)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setTransparent(transparent)` [源码:148](../../eyes/src/engine/components/CMTSComponent.js#L148)：当前操作：写入 _transparent；返回 无显式返回。
- `__destroy()` [源码:152](../../eyes/src/engine/components/CMTSComponent.js#L152)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:159](../../eyes/src/engine/components/CMTSComponent.js#L159)：当前操作：写入 _cameraFieldsOfView[viewportIndex]、_rootTiles、_tilesLoadedPromise、_transitionsCompleteCallback；返回 void。
- `__prepareForRender(camera)` [源码:207](../../eyes/src/engine/components/CMTSComponent.js#L207)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__loadResources()` [源码:215](../../eyes/src/engine/components/CMTSComponent.js#L215)：当前操作：写入 _colorTileSize、_numEndPointsLoading；返回 无显式返回。
- `__unloadResources()` [源码:233](../../eyes/src/engine/components/CMTSComponent.js#L233)：当前操作：写入 _rootTiles；返回 无显式返回。
- `__getEndPoints()` [源码:237](../../eyes/src/engine/components/CMTSComponent.js#L237)：当前操作：写入 无直接字段写入；返回 this._endPoints。
- `__endPointsAreLoaded()` [源码:240](../../eyes/src/engine/components/CMTSComponent.js#L240)：当前操作：写入 无直接字段写入；返回 0===this._numEndPointsLoading。
- `__getCameraPositions()` [源码:243](../../eyes/src/engine/components/CMTSComponent.js#L243)：当前操作：写入 无直接字段写入；返回 this._cameraPositions。
- `__getCameraFieldsOfView()` [源码:246](../../eyes/src/engine/components/CMTSComponent.js#L246)：当前操作：写入 无直接字段写入；返回 this._cameraFieldsOfView。
- `__getThreeJsScene()` [源码:249](../../eyes/src/engine/components/CMTSComponent.js#L249)：当前操作：写入 无直接字段写入；返回 this._threeJsScene。
- `__getSplitJoinThresholdFactor()` [源码:252](../../eyes/src/engine/components/CMTSComponent.js#L252)：当前操作：写入 无直接字段写入；返回 this._splitJoinThresholdFactor。
- `__getColorTileSize()` [源码:255](../../eyes/src/engine/components/CMTSComponent.js#L255)：当前操作：写入 无直接字段写入；返回 this._colorTileSize。
- `__getSpheroidComponent()` [源码:258](../../eyes/src/engine/components/CMTSComponent.js#L258)：当前操作：写入 无直接字段写入；返回 this._spheroidComponentRef.get()。
- `__addLoadedTile(tile)` [源码:261](../../eyes/src/engine/components/CMTSComponent.js#L261)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__removeLoadedTile(tile)` [源码:264](../../eyes/src/engine/components/CMTSComponent.js#L264)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__getTransparent()` [源码:267](../../eyes/src/engine/components/CMTSComponent.js#L267)：当前操作：写入 无直接字段写入；返回 this._transparent。
- `__getMaterialOptions()` [源码:270](../../eyes/src/engine/components/CMTSComponent.js#L270)：当前操作：写入 无直接字段写入；返回 this._materialOptions。
- `_spheroidRefChangedCallback(previousSpheroid, nextSpheroid)` [源码:273](../../eyes/src/engine/components/CMTSComponent.js#L273)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_spheroidChangedCallback()` [源码:282](../../eyes/src/engine/components/CMTSComponent.js#L282)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `CMTSTile`

每边网格含一圈裙边；内部索引跨度为 verticesPerSide−3。纹理有两像素边框（宽度 +4），UV 可来自祖先纹理；mesh 坐标减中心以保持浮点精度。。父类 `PioneerPublicApi.Tile`。

- `constructor(component, parentTile, face, level, tileCoord, row, col)` [源码:315](../../eyes/src/engine/components/CMTSComponent.js#L315)：当前操作：写入 _center、_col、_component、_face、_fullyLoaded、_heightData、_heightOffset、_heightScale、_isLeaf、_level、_levelPow、_meshIndices、_meshNormals、_meshPositions、_meshUVs、_numNonPositiveTexturesLoading、_numVertsPerSide、_positionIndexToUpdate、_radius、_resourceManager、_row、_tempMeshPositions、_tempNumVertsPerSide、_tempThreeJsMaterial、_tempThreeJsObject、_textureLevels、_threeJsMaterial、_threeJsObject、_tile、_uvOffsets、_uvScales、_visible；返回 无显式返回。
- `getLevel()` [源码:396](../../eyes/src/engine/components/CMTSComponent.js#L396)：当前操作：写入 无直接字段写入；返回 this._level。
- `getTileCoord()` [源码:399](../../eyes/src/engine/components/CMTSComponent.js#L399)：当前操作：写入 无直接字段写入；返回 this._tile。
- `hasHeightData()` [源码:402](../../eyes/src/engine/components/CMTSComponent.js#L402)：当前操作：写入 无直接字段写入；返回 null!==this._heightData。
- `isFullyLoaded()` [源码:405](../../eyes/src/engine/components/CMTSComponent.js#L405)：当前操作：写入 无直接字段写入；返回 this._fullyLoaded。
- `getHeight(faceUV)` [源码:409](../../eyes/src/engine/components/CMTSComponent.js#L409)：高度取当前正式或临时 mesh 的插值位置再反解 LLA；不是重复读取已释放的高度 ImageData。
- `createNewTile(parentTile, childRow, childColumn)` [源码:423](../../eyes/src/engine/components/CMTSComponent.js#L423)：当前操作：写入 无直接字段写入；返回 new CMTSTile(parentTile._component,this,this._face,childLevel,childTileCoord,childRow,childColumn)。
- `checkSplit()` [源码:428](../../eyes/src/engine/components/CMTSComponent.js#L428)：当前操作：写入 无直接字段写入；返回 false、true、this._getNearestDistance()<this._component.__getSplitJoinThresholdFactor()*this._radius/colorTileSize。
- `checkJoin()` [源码:435](../../eyes/src/engine/components/CMTSComponent.js#L435)：合并距离阈值是分裂阈值的四倍，保留 LOD 滞回，避免临界距离逐帧抖动。
- `load()` [源码:441](../../eyes/src/engine/components/CMTSComponent.js#L441)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `unload()` [源码:449](../../eyes/src/engine/components/CMTSComponent.js#L449)：当前操作：写入 _fullyLoaded、_heightData、_meshBitangents、_meshIndices、_meshNormals、_meshPositions、_meshTangents、_meshUVs、_tempMeshPositions、_tempThreeJsMaterial、_tempThreeJsObject、_threeJsMaterial、_threeJsObject；返回 无显式返回。
- `isVisible()` [源码:478](../../eyes/src/engine/components/CMTSComponent.js#L478)：当前操作：写入 无直接字段写入；返回 this._visible。
- `setVisible(visible)` [源码:481](../../eyes/src/engine/components/CMTSComponent.js#L481)：当前操作：写入 _visible；返回 无显式返回。
- `update()` [源码:484](../../eyes/src/engine/components/CMTSComponent.js#L484)：当前操作：写入 _numNonPositiveTexturesLoading；返回 false、this._numNonPositiveTexturesLoading>0\|\|transitionsActive。
- `_createTempObject()` [源码:526](../../eyes/src/engine/components/CMTSComponent.js#L526)：向祖先回溯到已完成 mesh，同时累积子象限 UV；低分辨率占位网格从祖先 mesh 插值，临时纹理仍独立 acquire。
- `_createObject()` [源码:666](../../eyes/src/engine/components/CMTSComponent.js#L666)：批量资源返回后先检查销毁并逐项 release；正式顶点以定时批次生成，结束后才发布 GPU 数组并释放临时 mesh 与高度图。
- `_destroyObject(meshObject)` [源码:801](../../eyes/src/engine/components/CMTSComponent.js#L801)：非 height 贴图逐项 release，再销毁 material/mesh 并从 component 数组移除；height ImageData 在独立生命周期释放。
- `_getFromData(output, outputOffset, sampleColumn, sampleRow, source, verticesPerSide)` [源码:826](../../eyes/src/engine/components/CMTSComponent.js#L826)：按连续列/行坐标双线性混合三分量数组，先沿行再沿列；边界与额外裙边由调用者保证可访问。
- `_updateVertex(vertexIndex, spheroid, hasNormalMap, heightUVOffset, heightUVScale)` [源码:840](../../eyes/src/engine/components/CMTSComponent.js#L840)：位置先在有效内区采样，高度法线用跨边界邻点差分；裙边另作径向下沉。tangent/bitangent 与贴图 UV 保留原面方向和 y 翻转。
- `_adjustForTagHeight(position)` [源码:913](../../eyes/src/engine/components/CMTSComponent.js#L913)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getNonPositiveLevel(channel)` [源码:916](../../eyes/src/engine/components/CMTSComponent.js#L916)：当前操作：写入 无直接字段写入；返回 NaN、endpoint.configuration.first_level、PioneerPublicApi.MathUtils.clamp(4-Math.floor(Math.log2(nearestProjectedDistance/this._radius/this._component.__getSplitJoinThresholdFactor()*textureSize*4)),endpoint.configuration.first_level,0)。
- `_getNearestDistance()` [源码:924](../../eyes/src/engine/components/CMTSComponent.js#L924)：当前操作：写入 无直接字段写入；返回 nearestProjectedDistance。
- `toString()` [源码:941](../../eyes/src/engine/components/CMTSComponent.js#L941)：当前操作：写入 无直接字段写入；返回 ˋ${this._face}/${this._level}/${this._tile.x}/${this._tile.y}ˋ。
- `prepareForRender(camera)` [源码:944](../../eyes/src/engine/components/CMTSComponent.js#L944)：当前操作：写入 无直接字段写入；返回 void(meshObject.visible=false)。
- `_loadTexture(channel, url, material)` [源码:961](../../eyes/src/engine/components/CMTSComponent.js#L961)：await 之后再次检查 tile 是否销毁：已销毁则 release，存活才安装，防止晚到资源取得新所有权。
- `_setTexture(channel, heightData, material)` [源码:971](../../eyes/src/engine/components/CMTSComponent.js#L971)：当前操作：写入 _heightData；返回 无显式返回。
- `static _isInABoundary(configuration, face, level, tileCoord)` [源码:1017](../../eyes/src/engine/components/CMTSComponent.js#L1017)：将配置最深级边界按 2^(last_level−level) 整数投影到当前层，行列上下界均包含端点。
- `static getHeightPos(position, normal, column, row, heightPixels, uvOffset, verticesPerSide, uvScale, interiorPixelSize, heightOffset, heightScale)` [源码:1030](../../eyes/src/engine/components/CMTSComponent.js#L1030)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static getLinearInterpolatedHeightPixel(pixelColumn, pixelRow, heightPixels, imageSize)` [源码:1037](../../eyes/src/engine/components/CMTSComponent.js#L1037)：像素中心在半整数，按距离中心选相邻像素权重；边缘像素索引由 getHeightFromPixel 截断。RGB 分别贡献 2^−8、2^−16、2^−24。
- `static getHeightFromPixel(column, row, heightPixels, imageSize)` [源码:1075](../../eyes/src/engine/components/CMTSComponent.js#L1075)：当前操作：写入 无直接字段写入；返回 heightPixels[pixelOffset+0]/256+heightPixels[pixelOffset+1]/65536+heightPixels[pixelOffset+2]/16777216。
- `static cmtsCoordToPosition(positionOut, face, levelScale, tileU, tileV, spheroid)` [源码:1081](../../eyes/src/engine/components/CMTSComponent.js#L1081)：先把 tile 坐标乘 2^−level 得面 UV；越界时逐步跨六面旋转/翻转坐标，直到落入 [0,1]，再由固定面基投影椭球。
- `static cmtsCoordToTangent(tangentOut, face, levelScale, tileU, tileV, spheroid)` [源码:1188](../../eyes/src/engine/components/CMTSComponent.js#L1188)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static cmtsCoordToBitangent(bitangentOut, face, levelScale, tileU, tileV, spheroid)` [源码:1193](../../eyes/src/engine/components/CMTSComponent.js#L1193)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/components/CameraComponent.js`

管理透视投影、拾取、遮挡检测、多段深度渲染及后处理的渲染相机组件。。[源码](../../eyes/src/engine/components/CameraComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-CameraComponent-js)

### `CameraComponent`

管理透视投影、拾取、遮挡检测、多段深度渲染及后处理的渲染相机组件。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:9](../../eyes/src/engine/components/CameraComponent.js#L9)：当前操作：写入 _aspectRatio、_autoMidDistance、_autoNearDistance、_fieldOfView、_invertDepth、_midDistance、_nearDistance、_occludingEntities、_outlinePass、_outlinePass.enabled、_renderSize、_threeJsCamera、_threeJsComposer、_threeJsRenderer、_threeJsScene、_threeJsUnrealBloomPass、_threeJsUnrealBloomPass.enabled、_viewport；返回 无显式返回。
- `getViewport()` [源码:39](../../eyes/src/engine/components/CameraComponent.js#L39)：当前操作：写入 无直接字段写入；返回 this._viewport。
- `getFieldOfView()` [源码:42](../../eyes/src/engine/components/CameraComponent.js#L42)：当前操作：写入 无直接字段写入；返回 this._fieldOfView。
- `getHorizontalFieldOfView()` [源码:45](../../eyes/src/engine/components/CameraComponent.js#L45)：当前操作：写入 无直接字段写入；返回 this._aspectRatio>=1?this._fieldOfView:2*Math.atan(Math.tan(this._fieldOfView/2)*this._aspectRatio)。
- `getVerticalFieldOfView()` [源码:48](../../eyes/src/engine/components/CameraComponent.js#L48)：当前操作：写入 无直接字段写入；返回 this._aspectRatio>1?2*Math.atan(Math.tan(this._fieldOfView/2)/this._aspectRatio):this._fieldOfView。
- `setFieldOfView(fieldOfView)` [源码:51](../../eyes/src/engine/components/CameraComponent.js#L51)：当前操作：写入 _fieldOfView；返回 无显式返回。
- `getInvertDepth()` [源码:54](../../eyes/src/engine/components/CameraComponent.js#L54)：当前操作：写入 无直接字段写入；返回 this._invertDepth。
- `setInvertDepth(invertDepth)` [源码:57](../../eyes/src/engine/components/CameraComponent.js#L57)：当前操作：写入 _invertDepth；返回 无显式返回。
- `getNearDistance()` [源码:60](../../eyes/src/engine/components/CameraComponent.js#L60)：当前操作：写入 无直接字段写入；返回 this._nearDistance。
- `setNearDistance(nearDistance)` [源码:63](../../eyes/src/engine/components/CameraComponent.js#L63)：当前操作：写入 _nearDistance；返回 无显式返回。
- `getAutoNearDistance()` [源码:66](../../eyes/src/engine/components/CameraComponent.js#L66)：当前操作：写入 无直接字段写入；返回 this._autoNearDistance。
- `getMidDistance()` [源码:69](../../eyes/src/engine/components/CameraComponent.js#L69)：当前操作：写入 无直接字段写入；返回 this._midDistance。
- `setMidDistance(midDistance)` [源码:72](../../eyes/src/engine/components/CameraComponent.js#L72)：当前操作：写入 _midDistance；返回 无显式返回。
- `getAutoMidDistance()` [源码:75](../../eyes/src/engine/components/CameraComponent.js#L75)：当前操作：写入 无直接字段写入；返回 this._autoMidDistance。
- `getNormalSpacePositionFromCameraSpacePosition(output, cameraPosition)` [源码:78](../../eyes/src/engine/components/CameraComponent.js#L78)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getNormalSpaceRadiusFromRadius(radius, distance)` [源码:86](../../eyes/src/engine/components/CameraComponent.js#L86)：当前操作：写入 无直接字段写入；返回 radius/Math.abs(distance)/Math.tan(this._fieldOfView/2)。
- `getCameraSpacePositionFromNormalSpacePosition(output, normalPosition)` [源码:89](../../eyes/src/engine/components/CameraComponent.js#L89)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getRadiusFromNormalSpaceRadius(normalRadius, distance)` [源码:97](../../eyes/src/engine/components/CameraComponent.js#L97)：当前操作：写入 无直接字段写入；返回 normalRadius*Math.abs(distance)*Math.tan(this._fieldOfView/2)。
- `getRaycast(rayOrigin, rayDirection, entity)` [源码:100](../../eyes/src/engine/components/CameraComponent.js#L100)：当前操作：写入 无直接字段写入；返回 hits。
- `getRaycastColor(rayOrigin, rayDirection, entity)` [源码:135](../../eyes/src/engine/components/CameraComponent.js#L135)：对同面连续命中去重后逐个纹理 uniform 采样；保留原来的像素跨距和 UV 取整规则。
- `isPositionOccluded(cameraPosition)` [源码:194](../../eyes/src/engine/components/CameraComponent.js#L194)：当前操作：写入 无直接字段写入；返回 true、false。
- `getNearestIntersectingEntity(rayDirection)` [源码:198](../../eyes/src/engine/components/CameraComponent.js#L198)：当前操作：写入 无直接字段写入；返回 nearestEntity。
- `setBloom(strength)` [源码:217](../../eyes/src/engine/components/CameraComponent.js#L217)：当前操作：写入 _threeJsUnrealBloomPass.enabled、_threeJsUnrealBloomPass.strength；返回 无显式返回。
- `setOutline(color, component, objectName)` [源码:221](../../eyes/src/engine/components/CameraComponent.js#L221)：当前操作：写入 _outlinePass.enabled、_outlinePass.selectedObjects；返回 无显式返回。
- `__addToOccludingEntities(entity)` [源码:242](../../eyes/src/engine/components/CameraComponent.js#L242)：当前操作：写入 无直接字段写入；返回 void。
- `__destroy()` [源码:246](../../eyes/src/engine/components/CameraComponent.js#L246)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateCameraVariablesForConnectedScene()` [源码:253](../../eyes/src/engine/components/CameraComponent.js#L253)：当前操作：写入 _aspectRatio、_autoMidDistance、_autoNearDistance；返回 无显式返回。
- `__prepareForRender()` [源码:301](../../eyes/src/engine/components/CameraComponent.js#L301)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__render()` [源码:314](../../eyes/src/engine/components/CameraComponent.js#L314)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__setViewport(viewport)` [源码:322](../../eyes/src/engine/components/CameraComponent.js#L322)：当前操作：写入 _viewport；返回 无显式返回。
- `_updateProjectionMatrix()` [源码:326](../../eyes/src/engine/components/CameraComponent.js#L326)：这里采用 Y 前向的投影排列，转换函数读取 elements[0/9/6/14]；逆矩阵必须同步更新。

## `eyes/src/engine/components/CometTailComponent.js`

基于历史运动及恒星加速度生成彗尾粒子，并按相机设置精灵材质。。[源码](../../eyes/src/engine/components/CometTailComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-CometTailComponent-js)

### `CometTailComponent`

基于历史运动及恒星加速度生成彗尾粒子，并按相机设置精灵材质。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/CometTailComponent.js#L5)：当前操作：写入 _color、_lightSource、_numberOfParticles、_starAccelerationMultiplier、_timeLength、_timeOfParticle0；返回 无显式返回。
- `getLightSource()` [源码:14](../../eyes/src/engine/components/CometTailComponent.js#L14)：当前操作：写入 无直接字段写入；返回 this._lightSource.getName()。
- `setLightSource(entityName)` [源码:17](../../eyes/src/engine/components/CometTailComponent.js#L17)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getTimeLength()` [源码:20](../../eyes/src/engine/components/CometTailComponent.js#L20)：当前操作：写入 无直接字段写入；返回 this._timeLength。
- `setTimeLength(timeLength)` [源码:23](../../eyes/src/engine/components/CometTailComponent.js#L23)：当前操作：写入 _timeLength；返回 无显式返回。
- `getStarAccelerationMultiplier()` [源码:27](../../eyes/src/engine/components/CometTailComponent.js#L27)：当前操作：写入 无直接字段写入；返回 this._starAccelerationMultiplier。
- `setStarAccelerationMultiplier(starAccelerationMultiplier)` [源码:30](../../eyes/src/engine/components/CometTailComponent.js#L30)：当前操作：写入 _starAccelerationMultiplier；返回 无显式返回。
- `getNumberOfParticles()` [源码:34](../../eyes/src/engine/components/CometTailComponent.js#L34)：当前操作：写入 无直接字段写入；返回 this._numberOfParticles。
- `setNumberOfParticles(numberOfParticles)` [源码:37](../../eyes/src/engine/components/CometTailComponent.js#L37)：当前操作：写入 _numberOfParticles；返回 无显式返回。
- `getColor()` [源码:41](../../eyes/src/engine/components/CometTailComponent.js#L41)：当前操作：写入 无直接字段写入；返回 this._color。
- `setColor(color)` [源码:44](../../eyes/src/engine/components/CometTailComponent.js#L44)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:48](../../eyes/src/engine/components/CometTailComponent.js#L48)：当前操作：写入 无直接字段写入；返回 void。
- `__prepareForRender(camera)` [源码:76](../../eyes/src/engine/components/CometTailComponent.js#L76)：当前操作：写入 getThreeJsMaterials()[0].uniforms.color.value.w；返回 无显式返回。
- `__loadResources()` [源码:86](../../eyes/src/engine/components/CometTailComponent.js#L86)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__unloadResources()` [源码:127](../../eyes/src/engine/components/CometTailComponent.js#L127)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_newParticle(particleIndex, timeOfParticle0)` [源码:131](../../eyes/src/engine/components/CometTailComponent.js#L131)：第零粒子决定浮点时间原点，重置它时给其他粒子偏移相反的差值以保持绝对出生时刻。

## `eyes/src/engine/components/ConnectedSpriteComponent.js`

把实体位置与屏幕偏移精灵连线，生成连接部分与图标的专用顶点和材质。。[源码](../../eyes/src/engine/components/ConnectedSpriteComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-ConnectedSpriteComponent-js)

### `ConnectedSpriteComponent`

把实体位置与屏幕偏移精灵连线，生成连接部分与图标的专用顶点和材质。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L5)：当前操作：写入 _blending、_colorMultiplier、_entity1、_entity1Offset、_entity2、_entity2Offset、_textureAspectRatio、_textureRepeat、_textureStretch、_textureUrl、_textureYOffset、_uOffsetEnd、_uOffsetStart、_width1、_width2、_widthUnits；返回 无显式返回。
- `getEntity1()` [源码:24](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L24)：当前操作：写入 无直接字段写入；返回 this._entity1.getName()。
- `setEntity1(entityName)` [源码:27](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L27)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getEntity1Offset()` [源码:30](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L30)：当前操作：写入 无直接字段写入；返回 this._entity1Offset。
- `setEntity1Offset(offset)` [源码:33](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L33)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getEntity2()` [源码:36](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L36)：当前操作：写入 无直接字段写入；返回 this._entity2.getName()。
- `setEntity2(entityName)` [源码:39](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L39)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getEntity2Offset()` [源码:42](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L42)：当前操作：写入 无直接字段写入；返回 this._entity2Offset。
- `setEntity2Offset(offset)` [源码:45](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L45)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getWidth1()` [源码:48](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L48)：当前操作：写入 无直接字段写入；返回 this._width1。
- `getWidth2()` [源码:51](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L51)：当前操作：写入 无直接字段写入；返回 this._width2。
- `setWidths(width1, width2)` [源码:54](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L54)：当前操作：写入 _width1、_width2；返回 无显式返回。
- `getWidthUnits()` [源码:58](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L58)：当前操作：写入 无直接字段写入；返回 this._widthUnits。
- `setWidthUnits(widthUnits)` [源码:61](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L61)：当前操作：写入 _widthUnits；返回 无显式返回。
- `getTextureUrl()` [源码:69](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L69)：当前操作：写入 无直接字段写入；返回 this._textureUrl。
- `setTextureUrl(textureUrl)` [源码:72](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L72)：当前操作：写入 _textureUrl；返回 无显式返回。
- `getTextureRepeat()` [源码:76](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L76)：当前操作：写入 无直接字段写入；返回 this._textureRepeat。
- `setTextureRepeat(textureRepeat)` [源码:79](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L79)：当前操作：写入 _textureRepeat；返回 无显式返回。
- `getTextureStretch()` [源码:82](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L82)：当前操作：写入 无直接字段写入；返回 this._textureStretch。
- `setTextureStretch(textureStretch)` [源码:85](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L85)：当前操作：写入 _textureStretch；返回 无显式返回。
- `getTextureYOffset()` [源码:88](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L88)：当前操作：写入 无直接字段写入；返回 this._textureYOffset。
- `setTextureYOffset(textureYOffset)` [源码:91](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L91)：当前操作：写入 _textureYOffset；返回 无显式返回。
- `getUOffsetStart()` [源码:94](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L94)：当前操作：写入 无直接字段写入；返回 this._uOffsetStart。
- `setUOffsetStart(uOffsetStart)` [源码:97](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L97)：当前操作：写入 _uOffsetStart；返回 无显式返回。
- `getUOffsetEnd()` [源码:100](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L100)：当前操作：写入 无直接字段写入；返回 this._uOffsetEnd。
- `setUOffsetEnd(uOffsetEnd)` [源码:103](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L103)：当前操作：写入 _uOffsetEnd；返回 无显式返回。
- `getColorMultiplier()` [源码:106](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L106)：当前操作：写入 无直接字段写入；返回 this._colorMultiplier。
- `setColorMultiplier(color)` [源码:109](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L109)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setBlending(blending)` [源码:113](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L113)：当前操作：写入 _blending；返回 无显式返回。
- `__update()` [源码:117](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L117)：当前操作：写入 无直接字段写入；返回 void。
- `__prepareForRender(camera)` [源码:127](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L127)：近端作为网格原点；超长连线裁到近端距离的千倍，以降低深度与投影数值跨度。
- `__loadResources()` [源码:208](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L208)：当前操作：写入 _textureAspectRatio；返回 void this.getEngine().getResourceManager().releaseAllForEntityItem(this)。
- `__unloadResources()` [源码:228](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L228)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/components/ConstellationsComponent.js`

载入星座连线/边界数据，在相机相关坐标中绘制星座辅助线。。[源码](../../eyes/src/engine/components/ConstellationsComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-ConstellationsComponent-js)

### `ConstellationsComponent`

载入星座连线/边界数据，在相机相关坐标中绘制星座辅助线。。父类 `Pioneer.BaseComponent`。

- `constructor(componentName, entity)` [源码:6](../../eyes/src/engine/components/ConstellationsComponent.js#L6)：当前操作：写入 _color、_database、_glowWidth、_highlightColor、_highlightWidth、_highlightedIndex、_labelEntities、_lineWidth、_meshes、_url；返回 无显式返回。
- `setColor(color)` [源码:20](../../eyes/src/engine/components/ConstellationsComponent.js#L20)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setLineWidth(lineWidth)` [源码:29](../../eyes/src/engine/components/ConstellationsComponent.js#L29)：当前操作：写入 _lineWidth；返回 无显式返回。
- `setGlowWidth(glowWidth)` [源码:33](../../eyes/src/engine/components/ConstellationsComponent.js#L33)：当前操作：写入 _glowWidth；返回 无显式返回。
- `setUrl(url)` [源码:37](../../eyes/src/engine/components/ConstellationsComponent.js#L37)：当前操作：写入 _url；返回 无显式返回。
- `getNames()` [源码:41](../../eyes/src/engine/components/ConstellationsComponent.js#L41)：当前操作：写入 无直接字段写入；返回 names。
- `setHighlight(highlightedIndex, highlightColor, highlightWidth)` [源码:46](../../eyes/src/engine/components/ConstellationsComponent.js#L46)：当前操作：写入 _highlightWidth、_highlightedIndex；返回 无显式返回。
- `getNearestConstellationIndex(pixelPosition, camera)` [源码:65](../../eyes/src/engine/components/ConstellationsComponent.js#L65)：当前操作：写入 无直接字段写入；返回 nearestIndex。
- `__prepareForRender(camera)` [源码:77](../../eyes/src/engine/components/ConstellationsComponent.js#L77)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__loadResources()` [源码:81](../../eyes/src/engine/components/ConstellationsComponent.js#L81)：当前操作：写入 _labelEntities、_meshes；返回 无显式返回。
- `__unloadResources()` [源码:176](../../eyes/src/engine/components/ConstellationsComponent.js#L176)：当前操作：写入 _database、_meshes；返回 无显式返回。

## `eyes/src/engine/components/DiscGridComponent.js`

生成平面圆盘经向/径向网格，为轨道或局部平面提供空间尺度参考。。[源码](../../eyes/src/engine/components/DiscGridComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-DiscGridComponent-js)

### `DiscGridComponent`

生成平面圆盘经向/径向网格，为轨道或局部平面提供空间尺度参考。。父类 `Pioneer.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/DiscGridComponent.js#L5)：当前操作：写入 _color、_lineMesh、_lineWidth、_meshDirty、_numCircles、_numSpokes、_radialPower、_size；返回 无显式返回。
- `getSize()` [源码:18](../../eyes/src/engine/components/DiscGridComponent.js#L18)：当前操作：写入 无直接字段写入；返回 this._size。
- `setSize(size)` [源码:21](../../eyes/src/engine/components/DiscGridComponent.js#L21)：当前操作：写入 _size；返回 无显式返回。
- `getColor()` [源码:28](../../eyes/src/engine/components/DiscGridComponent.js#L28)：当前操作：写入 无直接字段写入；返回 this._color。
- `setColor(color)` [源码:31](../../eyes/src/engine/components/DiscGridComponent.js#L31)：当前操作：写入 _meshDirty；返回 无显式返回。
- `getLineWidth()` [源码:35](../../eyes/src/engine/components/DiscGridComponent.js#L35)：当前操作：写入 无直接字段写入；返回 this._lineWidth。
- `setLineWidth(lineWidth)` [源码:38](../../eyes/src/engine/components/DiscGridComponent.js#L38)：当前操作：写入 _lineWidth；返回 无显式返回。
- `getNumCircles()` [源码:44](../../eyes/src/engine/components/DiscGridComponent.js#L44)：当前操作：写入 无直接字段写入；返回 this._numCircles。
- `setNumCircles(numCircles)` [源码:47](../../eyes/src/engine/components/DiscGridComponent.js#L47)：当前操作：写入 _meshDirty、_numCircles；返回 无显式返回。
- `getNumSpokes()` [源码:51](../../eyes/src/engine/components/DiscGridComponent.js#L51)：当前操作：写入 无直接字段写入；返回 this._numSpokes。
- `setNumSpokes(numSpokes)` [源码:54](../../eyes/src/engine/components/DiscGridComponent.js#L54)：当前操作：写入 _meshDirty、_numSpokes；返回 无显式返回。
- `getRadialPower()` [源码:58](../../eyes/src/engine/components/DiscGridComponent.js#L58)：当前操作：写入 无直接字段写入；返回 this._radialPower。
- `setRadialPower(radialPower)` [源码:61](../../eyes/src/engine/components/DiscGridComponent.js#L61)：当前操作：写入 _meshDirty、_radialPower；返回 无显式返回。
- `__prepareForRender(camera)` [源码:65](../../eyes/src/engine/components/DiscGridComponent.js#L65)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__loadResources()` [源码:77](../../eyes/src/engine/components/DiscGridComponent.js#L77)：当前操作：写入 _lineMesh；返回 无显式返回。
- `__unloadResources()` [源码:82](../../eyes/src/engine/components/DiscGridComponent.js#L82)：当前操作：写入 _lineMesh；返回 无显式返回。
- `_updateMesh()` [源码:86](../../eyes/src/engine/components/DiscGridComponent.js#L86)：当前操作：写入 _meshDirty；返回 void。

## `eyes/src/engine/components/DistanceLineComponent.js`

在引用实体之间更新带端点/颜色的距离线段。。[源码](../../eyes/src/engine/components/DistanceLineComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-DistanceLineComponent-js)

### `DistanceLineComponent`

在引用实体之间更新带端点/颜色的距离线段。。父类 `Pioneer.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/DistanceLineComponent.js#L5)：当前操作：写入 _animation、_color、_depthTest、_distance、_lineMesh、_sourceMpIsSurface、_sourceRelRadius、_switchStartPos、_targetEntity、_targetMpIsSurface、_targetRelRadius、_width；返回 无显式返回。
- `setTargetEntity(targetEntity)` [源码:26](../../eyes/src/engine/components/DistanceLineComponent.js#L26)：当前操作：写入 _targetEntity；返回 无显式返回。
- `setSourceMeasurePoint(measurePoint)` [源码:29](../../eyes/src/engine/components/DistanceLineComponent.js#L29)：当前操作：写入 _animation.isAnimating、_animation.sourceStartTime、_sourceMpIsSurface；返回 无显式返回。
- `setTargetMeasurePoint(measurePoint)` [源码:37](../../eyes/src/engine/components/DistanceLineComponent.js#L37)：当前操作：写入 _animation.isAnimating、_animation.targetStartTime、_targetMpIsSurface；返回 无显式返回。
- `setColor(color)` [源码:45](../../eyes/src/engine/components/DistanceLineComponent.js#L45)：当前操作：写入 _color；返回 无显式返回。
- `setWidth(width)` [源码:48](../../eyes/src/engine/components/DistanceLineComponent.js#L48)：当前操作：写入 _width；返回 无显式返回。
- `setDistanceProps({distance:distance,sourceRadius:sourceRadius,targetRadius:targetRadius})` [源码:51](../../eyes/src/engine/components/DistanceLineComponent.js#L51)：当前操作：写入 _distance、_sourceRelRadius、_targetRelRadius；返回 无显式返回。
- `_applyEasing(progress)` [源码:60](../../eyes/src/engine/components/DistanceLineComponent.js#L60)：当前操作：写入 无直接字段写入；返回 (doubledProgress<=1?Math.pow(doubledProgress,4):2-Math.pow(2-doubledProgress,4))/2。
- `_updateAnimation(startPosition, endPosition, startCenter, startSurface, endCenter, endSurface)` [源码:64](../../eyes/src/engine/components/DistanceLineComponent.js#L64)：当前操作：写入 _animation.isAnimating、_animation.sourceStartTime、_animation.targetStartTime；返回 void。
- `__loadResources()` [源码:118](../../eyes/src/engine/components/DistanceLineComponent.js#L118)：当前操作：写入 _lineMesh；返回 Promise.resolve()。
- `setOpacity(opacity)` [源码:125](../../eyes/src/engine/components/DistanceLineComponent.js#L125)：当前操作：写入 _color.a；返回 无显式返回。
- `setDepthTest(depthTest)` [源码:129](../../eyes/src/engine/components/DistanceLineComponent.js#L129)：当前操作：写入 _depthTest；返回 无显式返回。
- `__unloadResources()` [源码:132](../../eyes/src/engine/components/DistanceLineComponent.js#L132)：当前操作：写入 _lineMesh；返回 无显式返回。
- `__prepareForRender(camera)` [源码:136](../../eyes/src/engine/components/DistanceLineComponent.js#L136)：当前操作：写入 无直接字段写入；返回 void(object&&(object.visible=false))。
- `_calcStartPos(camera)` [源码:148](../../eyes/src/engine/components/DistanceLineComponent.js#L148)：当前操作：写入 _switchStartPos；返回 无显式返回。
- `_updatePoints(camera)` [源码:157](../../eyes/src/engine/components/DistanceLineComponent.js#L157)：当前操作：写入 无直接字段写入；返回 void。

## `eyes/src/engine/components/DivComponent.js`

把真实 DOM 元素投影到视口，处理遮挡、屏幕偏移、对齐和可见区间。。[源码](../../eyes/src/engine/components/DivComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-DivComponent-js)

### `DivComponent`

把真实 DOM 元素投影到视口，处理遮挡、屏幕偏移、对齐和可见区间。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/DivComponent.js#L5)：当前操作：写入 _activeCamera、_alignment、_bounds、_canBeOccluded、_currentHTML、_div、_div.style.position、_div.style.translate、_hiddenClass；返回 无显式返回。
- `getDiv()` [源码:19](../../eyes/src/engine/components/DivComponent.js#L19)：当前操作：写入 无直接字段写入；返回 this._div。
- `getActiveCamera()` [源码:22](../../eyes/src/engine/components/DivComponent.js#L22)：当前操作：写入 无直接字段写入；返回 this._activeCamera。
- `setActiveCamera(activeCamera)` [源码:25](../../eyes/src/engine/components/DivComponent.js#L25)：当前操作：写入 _activeCamera；返回 无显式返回。
- `getBounds()` [源码:29](../../eyes/src/engine/components/DivComponent.js#L29)：当前操作：写入 无直接字段写入；返回 this._bounds。
- `getCanBeOccluded()` [源码:32](../../eyes/src/engine/components/DivComponent.js#L32)：当前操作：写入 无直接字段写入；返回 this._canBeOccluded。
- `setCanBeOccluded(canBeOccluded)` [源码:35](../../eyes/src/engine/components/DivComponent.js#L35)：当前操作：写入 _canBeOccluded；返回 无显式返回。
- `getHiddenClass()` [源码:38](../../eyes/src/engine/components/DivComponent.js#L38)：当前操作：写入 无直接字段写入；返回 this._hiddenClass。
- `setHiddenClass(hiddenClass)` [源码:41](../../eyes/src/engine/components/DivComponent.js#L41)：当前操作：写入 _hiddenClass；返回 无显式返回。
- `getAlignment()` [源码:49](../../eyes/src/engine/components/DivComponent.js#L49)：当前操作：写入 无直接字段写入；返回 this._alignment。
- `setAlignment(alignment)` [源码:52](../../eyes/src/engine/components/DivComponent.js#L52)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__unloadResources()` [源码:55](../../eyes/src/engine/components/DivComponent.js#L55)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_determineComponentVisibility(camera)` [源码:60](../../eyes/src/engine/components/DivComponent.js#L60)：当前操作：写入 无直接字段写入；返回 hidden。
- `__prepareForRender(camera)` [源码:74](../../eyes/src/engine/components/DivComponent.js#L74)：当前操作：写入 _activeCamera、_bounds.origin.x、_bounds.origin.y、_bounds.size.x、_bounds.size.y、_currentHTML、_div.style.translate；返回 void、void this._div.remove()。
- `__setVisible(visible)` [源码:116](../../eyes/src/engine/components/DivComponent.js#L116)：当前操作：写入 _div.style.translate；返回 无显式返回。

## `eyes/src/engine/components/DynamicEnvironmentMapComponent.js`

用六面相机/渲染目标更新动态环境贴图，供模型材质采样。。[源码](../../eyes/src/engine/components/DynamicEnvironmentMapComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-DynamicEnvironmentMapComponent-js)

### `DynamicEnvironmentMapComponent`

用六面相机/渲染目标更新动态环境贴图，供模型材质采样。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/DynamicEnvironmentMapComponent.js#L5)：当前操作：写入 _envMapTexture、_faceSize、_invalidColor、_threeJsCubeCamera、_threeJsFaceCameras、_threeJsFaceRenderTargets、_threeJsQuad、_threeJsRenderer、_threeJsScene；返回 无显式返回。
- `getFaceSize()` [源码:27](../../eyes/src/engine/components/DynamicEnvironmentMapComponent.js#L27)：当前操作：写入 无直接字段写入；返回 this._faceSize。
- `setFaceSize(faceSize)` [源码:30](../../eyes/src/engine/components/DynamicEnvironmentMapComponent.js#L30)：当前操作：写入 _faceSize、_threeJsQuad.material.uniforms.faceSize.value；返回 无显式返回。
- `getTexture()` [源码:38](../../eyes/src/engine/components/DynamicEnvironmentMapComponent.js#L38)：当前操作：写入 无直接字段写入；返回 this._envMapTexture.texture。
- `__destroy()` [源码:41](../../eyes/src/engine/components/DynamicEnvironmentMapComponent.js#L41)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__render()` [源码:48](../../eyes/src/engine/components/DynamicEnvironmentMapComponent.js#L48)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setupFaceCameras()` [源码:72](../../eyes/src/engine/components/DynamicEnvironmentMapComponent.js#L72)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateProjectionMatrix()` [源码:90](../../eyes/src/engine/components/DynamicEnvironmentMapComponent.js#L90)：当前操作：写入 无直接字段写入；返回 void。
- `_setupQuad()` [源码:103](../../eyes/src/engine/components/DynamicEnvironmentMapComponent.js#L103)：当前操作：写入 _threeJsQuad、_threeJsQuad.frustumCulled；返回 无显式返回。

## `eyes/src/engine/components/FrustumComponent.js`

依据相机/视场参数构造可视化视锥，提供观察方向和覆盖范围辅助图形。。[源码](../../eyes/src/engine/components/FrustumComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-FrustumComponent-js)

### `FrustumComponent`

依据相机/视场参数构造可视化视锥，提供观察方向和覆盖范围辅助图形。。父类 `Pioneer.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/FrustumComponent.js#L5)：当前操作：写入 _color、_direction、_farBase、_frustumType、_hFOVRad、_hiddenPyramidEdges、_intersectionEntities、_keyframes、_length、_lineMesh、_lineWidth、_nearBase、_numConeLines、_numberOfCirclePoints、_originOffset、_relativeToEntityOrientation、_spinAngle、_useKeyframes、_vFOVRad；返回 无显式返回。
- `getFrustumType()` [源码:27](../../eyes/src/engine/components/FrustumComponent.js#L27)：当前操作：写入 无直接字段写入；返回 this._frustumType。
- `setFrustumType(frustumType)` [源码:30](../../eyes/src/engine/components/FrustumComponent.js#L30)：当前操作：写入 _frustumType；返回 无显式返回。
- `getIntersectionEntities()` [源码:33](../../eyes/src/engine/components/FrustumComponent.js#L33)：当前操作：写入 无直接字段写入；返回 this._intersectionEntities。
- `setIntersectionEntities(intersectionEntities)` [源码:36](../../eyes/src/engine/components/FrustumComponent.js#L36)：当前操作：写入 _intersectionEntities；返回 无显式返回。
- `getHorizontalFOV()` [源码:39](../../eyes/src/engine/components/FrustumComponent.js#L39)：当前操作：写入 无直接字段写入；返回 this._hFOVRad。
- `getVerticalFOV()` [源码:42](../../eyes/src/engine/components/FrustumComponent.js#L42)：当前操作：写入 无直接字段写入；返回 this._vFOVRad。
- `setFOVRadians(hFOVRad, vFOVRad=hFOVRad)` [源码:45](../../eyes/src/engine/components/FrustumComponent.js#L45)：当前操作：写入 _hFOVRad、_vFOVRad；返回 无显式返回。
- `setFOVDegrees(horizontalDegrees, verticalDegrees=horizontalDegrees)` [源码:50](../../eyes/src/engine/components/FrustumComponent.js#L50)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getLength()` [源码:53](../../eyes/src/engine/components/FrustumComponent.js#L53)：当前操作：写入 无直接字段写入；返回 this._length。
- `setLength(length)` [源码:56](../../eyes/src/engine/components/FrustumComponent.js#L56)：当前操作：写入 _length；返回 无显式返回。
- `getNearBase()` [源码:60](../../eyes/src/engine/components/FrustumComponent.js#L60)：当前操作：写入 无直接字段写入；返回 this._nearBase。
- `setNearBase(width, height=width)` [源码:63](../../eyes/src/engine/components/FrustumComponent.js#L63)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getFarBase()` [源码:67](../../eyes/src/engine/components/FrustumComponent.js#L67)：当前操作：写入 无直接字段写入；返回 this._farBase。
- `setFarBase(width, height=width)` [源码:70](../../eyes/src/engine/components/FrustumComponent.js#L70)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getColor()` [源码:74](../../eyes/src/engine/components/FrustumComponent.js#L74)：当前操作：写入 无直接字段写入；返回 this._color。
- `setColor(color)` [源码:77](../../eyes/src/engine/components/FrustumComponent.js#L77)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getOriginOffset()` [源码:80](../../eyes/src/engine/components/FrustumComponent.js#L80)：当前操作：写入 无直接字段写入；返回 this._originOffset。
- `setOriginOffset(offset)` [源码:83](../../eyes/src/engine/components/FrustumComponent.js#L83)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getDirection()` [源码:86](../../eyes/src/engine/components/FrustumComponent.js#L86)：当前操作：写入 无直接字段写入；返回 this._direction。
- `setDirection(direction)` [源码:89](../../eyes/src/engine/components/FrustumComponent.js#L89)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getSpinAngle()` [源码:92](../../eyes/src/engine/components/FrustumComponent.js#L92)：当前操作：写入 无直接字段写入；返回 this._spinAngle。
- `setSpinAngle(spinAngle)` [源码:95](../../eyes/src/engine/components/FrustumComponent.js#L95)：当前操作：写入 _spinAngle；返回 无显式返回。
- `getNumberOfCirclePoints()` [源码:98](../../eyes/src/engine/components/FrustumComponent.js#L98)：当前操作：写入 无直接字段写入；返回 this._numberOfCirclePoints。
- `setNumberOfCirclePoints(numberOfCirclePoints)` [源码:101](../../eyes/src/engine/components/FrustumComponent.js#L101)：当前操作：写入 _numberOfCirclePoints；返回 无显式返回。
- `getNumConeLines()` [源码:104](../../eyes/src/engine/components/FrustumComponent.js#L104)：当前操作：写入 无直接字段写入；返回 this._numConeLines。
- `setNumConeLines(numConeLines)` [源码:107](../../eyes/src/engine/components/FrustumComponent.js#L107)：当前操作：写入 _numConeLines；返回 无显式返回。
- `getHiddenPyramidEdges()` [源码:110](../../eyes/src/engine/components/FrustumComponent.js#L110)：当前操作：写入 无直接字段写入；返回 this._hiddenPyramidEdges。
- `setHiddenPyramidEdges(hiddenPyramidEdges)` [源码:113](../../eyes/src/engine/components/FrustumComponent.js#L113)：当前操作：写入 _hiddenPyramidEdges；返回 无显式返回。
- `getRelativeToEntityOrientation()` [源码:116](../../eyes/src/engine/components/FrustumComponent.js#L116)：当前操作：写入 无直接字段写入；返回 this._relativeToEntityOrientation。
- `getKeyframes()` [源码:119](../../eyes/src/engine/components/FrustumComponent.js#L119)：当前操作：写入 无直接字段写入；返回 this._keyframes。
- `setKeyframes(keyframes)` [源码:122](../../eyes/src/engine/components/FrustumComponent.js#L122)：当前操作：写入 _keyframes；返回 无显式返回。
- `getUseKeyframes()` [源码:126](../../eyes/src/engine/components/FrustumComponent.js#L126)：当前操作：写入 无直接字段写入；返回 this._useKeyframes。
- `setUseKeyframes(useKeyframes)` [源码:129](../../eyes/src/engine/components/FrustumComponent.js#L129)：当前操作：写入 _useKeyframes；返回 无显式返回。
- `setRelativeToEntityOrientation(relativeToEntityOrientation)` [源码:133](../../eyes/src/engine/components/FrustumComponent.js#L133)：当前操作：写入 _relativeToEntityOrientation；返回 无显式返回。
- `_farBaseFromLengthAndFOV(output, length, horizontalFov, verticalFov)` [源码:136](../../eyes/src/engine/components/FrustumComponent.js#L136)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateFOVFromBases()` [源码:140](../../eyes/src/engine/components/FrustumComponent.js#L140)：当前操作：写入 _hFOVRad、_vFOVRad；返回 无显式返回。
- `__loadResources()` [源码:147](../../eyes/src/engine/components/FrustumComponent.js#L147)：当前操作：写入 _lineMesh；返回 无显式返回。
- `__unloadResources()` [源码:151](../../eyes/src/engine/components/FrustumComponent.js#L151)：当前操作：写入 _lineMesh；返回 无显式返回。
- `__prepareForRender(camera)` [源码:155](../../eyes/src/engine/components/FrustumComponent.js#L155)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateMesh()` [源码:170](../../eyes/src/engine/components/FrustumComponent.js#L170)：当前操作：写入 无直接字段写入；返回 void、void this._updateLineMesh(positions)。
- `_calcPoint(center, right, verticalAxis, widthFactor, heightFactor, horizontalFactor, verticalFactor)` [源码:288](../../eyes/src/engine/components/FrustumComponent.js#L288)：当前操作：写入 无直接字段写入；返回 new Pioneer.Vector3(center.x+horizontalOffset*right.x+verticalOffset*verticalAxis.x,center.y+horizontalOffset*right.y+verticalOffset*verticalAxis.y,center.z+horizontalOffset*right.z+verticalOffset*verticalAxis.z)。
- `_updateLineMesh(positions)` [源码:293](../../eyes/src/engine/components/FrustumComponent.js#L293)：当前操作：写入 无直接字段写入；返回 void。

## `eyes/src/engine/components/GizmoComponent.js`

以 Three.js 网格/线绘制实体坐标辅助标记。。[源码](../../eyes/src/engine/components/GizmoComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-GizmoComponent-js)

### `GizmoComponent`

以 Three.js 网格/线绘制实体坐标辅助标记。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/GizmoComponent.js#L5)：当前操作：写入 _joint、_jointObject、_lineMesh、_model、_relativeToEntity、_size；返回 无显式返回。
- `getSize()` [源码:16](../../eyes/src/engine/components/GizmoComponent.js#L16)：当前操作：写入 无直接字段写入；返回 void 0!==this._size?this._size:Math.max(1e-4,2*this.getEntity().getExtentsRadius())。
- `setSize(size)` [源码:19](../../eyes/src/engine/components/GizmoComponent.js#L19)：当前操作：写入 _size；返回 无显式返回。
- `isRelativeToEntity()` [源码:23](../../eyes/src/engine/components/GizmoComponent.js#L23)：当前操作：写入 无直接字段写入；返回 this._relativeToEntity。
- `setRelativeToEntity(relativeToEntity)` [源码:26](../../eyes/src/engine/components/GizmoComponent.js#L26)：当前操作：写入 _relativeToEntity；返回 无显式返回。
- `setJoint(joint, model)` [源码:30](../../eyes/src/engine/components/GizmoComponent.js#L30)：当前操作：写入 _joint、_model；返回 无显式返回。
- `__prepareForRender(camera)` [源码:39](../../eyes/src/engine/components/GizmoComponent.js#L39)：当前操作：写入 _jointObject；返回 void。
- `__loadResources()` [源码:71](../../eyes/src/engine/components/GizmoComponent.js#L71)：当前操作：写入 _lineMesh；返回 无显式返回。
- `__unloadResources()` [源码:98](../../eyes/src/engine/components/GizmoComponent.js#L98)：当前操作：写入 _lineMesh；返回 无显式返回。

## `eyes/src/engine/components/IndicatorComponent.js`

在视口边缘/屏幕位置显示目标指示器，约束位置并处理遮挡与边距。。[源码](../../eyes/src/engine/components/IndicatorComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-IndicatorComponent-js)

### `IndicatorComponent`

在视口边缘/屏幕位置显示目标指示器，约束位置并处理遮挡与边距。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/IndicatorComponent.js#L5)：当前操作：写入 _activeCamera、_arrowClass、_bounds、_currentHTML、_div、_div.style.position、_div.style.translate、_hiddenClass、_padding、_sourceEntity；返回 无显式返回。
- `getDiv()` [源码:24](../../eyes/src/engine/components/IndicatorComponent.js#L24)：当前操作：写入 无直接字段写入；返回 this._div。
- `getActiveCamera()` [源码:27](../../eyes/src/engine/components/IndicatorComponent.js#L27)：当前操作：写入 无直接字段写入；返回 this._activeCamera。
- `setActiveCamera(activeCamera)` [源码:30](../../eyes/src/engine/components/IndicatorComponent.js#L30)：当前操作：写入 _activeCamera；返回 无显式返回。
- `getBounds()` [源码:34](../../eyes/src/engine/components/IndicatorComponent.js#L34)：当前操作：写入 无直接字段写入；返回 this._bounds。
- `getHiddenClass()` [源码:37](../../eyes/src/engine/components/IndicatorComponent.js#L37)：当前操作：写入 无直接字段写入；返回 this._hiddenClass。
- `setHiddenClass(hiddenClass)` [源码:40](../../eyes/src/engine/components/IndicatorComponent.js#L40)：当前操作：写入 _hiddenClass；返回 无显式返回。
- `getArrowClass()` [源码:48](../../eyes/src/engine/components/IndicatorComponent.js#L48)：当前操作：写入 无直接字段写入；返回 this._arrowClass。
- `setArrowClass(arrowClass)` [源码:51](../../eyes/src/engine/components/IndicatorComponent.js#L51)：当前操作：写入 _arrowClass；返回 无显式返回。
- `setPadding(left, right, top, bottom)` [源码:56](../../eyes/src/engine/components/IndicatorComponent.js#L56)：当前操作：写入 _padding.bottom、_padding.left、_padding.right、_padding.top；返回 无显式返回。
- `getSourceEntity()` [源码:62](../../eyes/src/engine/components/IndicatorComponent.js#L62)：当前操作：写入 无直接字段写入；返回 ""!==this._sourceEntity.getName()?this._sourceEntity.getName():void 0。
- `setSourceEntity(entityName)` [源码:65](../../eyes/src/engine/components/IndicatorComponent.js#L65)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__unloadResources()` [源码:68](../../eyes/src/engine/components/IndicatorComponent.js#L68)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__prepareForRender(camera)` [源码:73](../../eyes/src/engine/components/IndicatorComponent.js#L73)：当前操作：写入 _activeCamera、_bounds.origin.x、_bounds.origin.y、_bounds.size.x、_bounds.size.y、_currentHTML、_div.style.rotate、_div.style.transformOrigin、_div.style.translate；返回 void、void this._div.remove()、void(this._div.style.translate=ˋ${Math.round(100*viewportSize.x)}px ${Math.round(100*viewportSize.y)}pxˋ)。
- `__setVisible(visible)` [源码:153](../../eyes/src/engine/components/IndicatorComponent.js#L153)：当前操作：写入 _div.style.translate；返回 无显式返回。
- `_getPixelSpaceFromFrameSpace(output, framePosition, viewportSize, camera)` [源码:162](../../eyes/src/engine/components/IndicatorComponent.js#L162)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/components/LabelComponent.js`

将文字绘制到画布纹理并生成相机朝向的标签平面。。[源码](../../eyes/src/engine/components/LabelComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-LabelComponent-js)

### `LabelComponent`

将文字绘制到画布纹理并生成相机朝向的标签平面。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/LabelComponent.js#L5)：当前操作：写入 _alignment、_canvas、_color、_devicePixelRatio、_fontFamily、_fontSize、_normalSpaceBounds、_pixelOffset、_pixelSize、_text；返回 无显式返回。
- `getText()` [源码:28](../../eyes/src/engine/components/LabelComponent.js#L28)：当前操作：写入 无直接字段写入；返回 this._text。
- `setText(text)` [源码:31](../../eyes/src/engine/components/LabelComponent.js#L31)：当前操作：写入 _text；返回 无显式返回。
- `getFontFamily()` [源码:35](../../eyes/src/engine/components/LabelComponent.js#L35)：当前操作：写入 无直接字段写入；返回 this._fontFamily。
- `setFontFamily(fontFamily)` [源码:38](../../eyes/src/engine/components/LabelComponent.js#L38)：当前操作：写入 _fontFamily；返回 无显式返回。
- `getFontSize()` [源码:42](../../eyes/src/engine/components/LabelComponent.js#L42)：当前操作：写入 无直接字段写入；返回 this._fontSize。
- `setFontSize(fontSize)` [源码:45](../../eyes/src/engine/components/LabelComponent.js#L45)：当前操作：写入 _fontSize；返回 无显式返回。
- `getColor()` [源码:49](../../eyes/src/engine/components/LabelComponent.js#L49)：当前操作：写入 无直接字段写入；返回 this._color。
- `setColor(color)` [源码:52](../../eyes/src/engine/components/LabelComponent.js#L52)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getAlignment()` [源码:55](../../eyes/src/engine/components/LabelComponent.js#L55)：当前操作：写入 无直接字段写入；返回 this._alignment。
- `setAlignment(alignment)` [源码:58](../../eyes/src/engine/components/LabelComponent.js#L58)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getPixelOffset()` [源码:62](../../eyes/src/engine/components/LabelComponent.js#L62)：当前操作：写入 无直接字段写入；返回 this._pixelOffset。
- `setPixelOffset(pixelOffset)` [源码:65](../../eyes/src/engine/components/LabelComponent.js#L65)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getNormalSpaceBounds(camera)` [源码:68](../../eyes/src/engine/components/LabelComponent.js#L68)：当前操作：写入 无直接字段写入；返回 this._normalSpaceBounds.get(camera)。
- `__prepareForRender(camera)` [源码:71](../../eyes/src/engine/components/LabelComponent.js#L71)：当前操作：写入 无直接字段写入；返回 void。
- `_determineComponentVisibility(camera)` [源码:121](../../eyes/src/engine/components/LabelComponent.js#L121)：当前操作：写入 无直接字段写入；返回 visibility。
- `__loadResources()` [源码:130](../../eyes/src/engine/components/LabelComponent.js#L130)：当前操作：写入 _canvas、_canvas.height、_canvas.width；返回 无显式返回。
- `__unloadResources()` [源码:172](../../eyes/src/engine/components/LabelComponent.js#L172)：当前操作：写入 _canvas；返回 无显式返回。
- `_updateText()` [源码:192](../../eyes/src/engine/components/LabelComponent.js#L192)：文字先按 CSS 字号测量，再乘设备像素比填充二次幂画布；对齐量同时分配画布留白。

## `eyes/src/engine/components/LightSourceComponent.js`

向所属 Scene 注册实体光源，维护颜色/强度等供材质统一采样的参数。。[源码](../../eyes/src/engine/components/LightSourceComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-LightSourceComponent-js)

### `LightSourceComponent`

向所属 Scene 注册实体光源，维护颜色/强度等供材质统一采样的参数。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/LightSourceComponent.js#L5)：当前操作：写入 _absoluteMagnitude、_color；返回 无显式返回。
- `getColor()` [源码:11](../../eyes/src/engine/components/LightSourceComponent.js#L11)：当前操作：写入 无直接字段写入；返回 this._color。
- `setColor(color)` [源码:14](../../eyes/src/engine/components/LightSourceComponent.js#L14)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getAbsoluteMagnitude()` [源码:17](../../eyes/src/engine/components/LightSourceComponent.js#L17)：当前操作：写入 无直接字段写入；返回 this._absoluteMagnitude。
- `setAbsoluteMagnitude(absoluteMagnitude)` [源码:20](../../eyes/src/engine/components/LightSourceComponent.js#L20)：当前操作：写入 _absoluteMagnitude；返回 无显式返回。
- `__loadResources()` [源码:23](../../eyes/src/engine/components/LightSourceComponent.js#L23)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__unloadResources()` [源码:26](../../eyes/src/engine/components/LightSourceComponent.js#L26)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__setClassIndex(classIndex)` [源码:29](../../eyes/src/engine/components/LightSourceComponent.js#L29)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/components/ModelComponent.js`

解析 GLTF/GLB 模型，接入资源引用计数和 Draco/KTX2 解码，转换 PBR 材质并管理动画与环境纹理。。[源码](../../eyes/src/engine/components/ModelComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-ModelComponent-js)

### `ModelComponent`

解析 GLTF/GLB 模型，接入资源引用计数和 Draco/KTX2 解码，转换 PBR 材质并管理动画与环境纹理。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:9](../../eyes/src/engine/components/ModelComponent.js#L9)：当前操作：写入 _dynamicEnvironmentMapComponent、_environmentCubemap、_environmentCubemapUrl、_environmentCylindricalUrl、_environmentIntensity、_hiddenObjects、_modelRadius、_onConfigChanged、_rotation、_scale、_shadowEntities、_threeJsAnimationClips、_translation、_url、_urlReferenceMap；返回 无显式返回。
- `getUrl()` [源码:29](../../eyes/src/engine/components/ModelComponent.js#L29)：当前操作：写入 无直接字段写入；返回 this._url。
- `setUrl(url)` [源码:32](../../eyes/src/engine/components/ModelComponent.js#L32)：当前操作：写入 _modelRadius、_url；返回 无显式返回。
- `setHiddenObject(objectName, hidden)` [源码:37](../../eyes/src/engine/components/ModelComponent.js#L37)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getTranslation()` [源码:46](../../eyes/src/engine/components/ModelComponent.js#L46)：当前操作：写入 无直接字段写入；返回 this._translation。
- `setTranslation(translation)` [源码:49](../../eyes/src/engine/components/ModelComponent.js#L49)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getScale()` [源码:52](../../eyes/src/engine/components/ModelComponent.js#L52)：当前操作：写入 无直接字段写入；返回 this._scale。
- `setScale(scale)` [源码:55](../../eyes/src/engine/components/ModelComponent.js#L55)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getRotation()` [源码:68](../../eyes/src/engine/components/ModelComponent.js#L68)：当前操作：写入 无直接字段写入；返回 this._rotation。
- `setRotation(rotation)` [源码:71](../../eyes/src/engine/components/ModelComponent.js#L71)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getEnvironmentCubemapUrl()` [源码:74](../../eyes/src/engine/components/ModelComponent.js#L74)：当前操作：写入 无直接字段写入；返回 this._environmentCubemapUrl。
- `setEnvironmentCubemapUrl(environmentCubemapUrl)` [源码:77](../../eyes/src/engine/components/ModelComponent.js#L77)：当前操作：写入 _environmentCubemapUrl；返回 无显式返回。
- `getEnvironmentIntensity()` [源码:80](../../eyes/src/engine/components/ModelComponent.js#L80)：当前操作：写入 无直接字段写入；返回 this._environmentIntensity。
- `setEnvironmentIntensity(environmentIntensity)` [源码:83](../../eyes/src/engine/components/ModelComponent.js#L83)：当前操作：写入 _environmentIntensity；返回 无显式返回。
- `getEnvironmentCylindricalUrl()` [源码:87](../../eyes/src/engine/components/ModelComponent.js#L87)：当前操作：写入 无直接字段写入；返回 this._environmentCylindricalUrl。
- `setEnvironmentCylindricalUrl(environmentCylindricalUrl)` [源码:90](../../eyes/src/engine/components/ModelComponent.js#L90)：当前操作：写入 _environmentCylindricalUrl；返回 无显式返回。
- `setDynamicEnvironmentMapComponent(dynamicEnvironmentMapComponent)` [源码:93](../../eyes/src/engine/components/ModelComponent.js#L93)：当前操作：写入 _dynamicEnvironmentMapComponent、_environmentCubemap；返回 无显式返回。
- `setURLReferenceMap(urlReferences)` [源码:108](../../eyes/src/engine/components/ModelComponent.js#L108)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getAnimationClip(clipName)` [源码:112](../../eyes/src/engine/components/ModelComponent.js#L112)：当前操作：写入 无直接字段写入；返回 this._threeJsAnimationClips.get(clipName)??null。
- `getMaterial(materialName)` [源码:115](../../eyes/src/engine/components/ModelComponent.js#L115)：当前操作：写入 无直接字段写入；返回 material、null。
- `updateMaterial(materialName, replacementMaterial)` [源码:123](../../eyes/src/engine/components/ModelComponent.js#L123)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getNumShadowEntities()` [源码:144](../../eyes/src/engine/components/ModelComponent.js#L144)：当前操作：写入 无直接字段写入；返回 this._shadowEntities.length。
- `getShadowEntity(shadowIndex)` [源码:147](../../eyes/src/engine/components/ModelComponent.js#L147)：当前操作：写入 无直接字段写入；返回 this._shadowEntities[shadowIndex]?.getName()。
- `setShadowEntities(entityNames)` [源码:150](../../eyes/src/engine/components/ModelComponent.js#L150)：当前操作：写入 _shadowEntities；返回 无显式返回。
- `__prepareForRender(renderContext)` [源码:156](../../eyes/src/engine/components/ModelComponent.js#L156)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__loadResources()` [源码:177](../../eyes/src/engine/components/ModelComponent.js#L177)：主文件下载后检查组件状态，避免已卸载组件继续启动 GLTF 依赖解析。
- `__unloadResources()` [源码:260](../../eyes/src/engine/components/ModelComponent.js#L260)：监听器、共享资源引用与组件自有 GPU 对象必须在同一卸载阶段清理。
- `_populateThreeJsObjectsAndMaterials(object)` [源码:270](../../eyes/src/engine/components/ModelComponent.js#L270)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_clean()` [源码:293](../../eyes/src/engine/components/ModelComponent.js#L293)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onConfigChanged()` [源码:322](../../eyes/src/engine/components/ModelComponent.js#L322)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateMaterials()` [源码:325](../../eyes/src/engine/components/ModelComponent.js#L325)：当前操作：写入 getThreeJsMaterials()[materialIndex]；返回 无显式返回。
- `_getNewPioneerMaterial(standardMaterial)` [源码:356](../../eyes/src/engine/components/ModelComponent.js#L356)：贴图从旧材质移交到 Pioneer uniform 后置空旧字段，避免销毁旧材质时重复释放贴图。

### `CustomDracoLoader`

注意：静态共享 Draco 适配器保留首次模型的 owner、priority 和 loadState；这里保留原有生命周期。。父类 `DRACOLoader.DRACOLoader`。

- `constructor(modelComponent, priority, loadState)` [源码:434](../../eyes/src/engine/components/ModelComponent.js#L434)：当前操作：写入 _loadState、_modelComponent、_priority；返回 无显式返回。
- `load(url, onLoad, onProgress, onError)` [源码:440](../../eyes/src/engine/components/ModelComponent.js#L440)：当前操作：写入 _loadState.error、_loadState.state；返回 无显式返回。

### `CustomThreeJsTextureLoader`

GLTF 依赖纹理沿用模型组件作为资源所有者，失败写入同一 loadState，取消则不标记失败。。父类 `PioneerPublicApi.THREE.Loader`。

- `constructor(modelComponent, urlReferenceMap, downloadPriority, loadState)` [源码:459](../../eyes/src/engine/components/ModelComponent.js#L459)：当前操作：写入 _downloadPriority、_loadState、_modelComponent、_urlReferenceMap；返回 无显式返回。
- `load(url, onLoad, onProgress, onError)` [源码:466](../../eyes/src/engine/components/ModelComponent.js#L466)：当前操作：写入 _loadState.error、_loadState.state；返回 无显式返回。

### `CustomThreeJsKTX2Loader`

KTX2 的 GLTF 接口只转发到同一纹理资源通道，不另建一份下载所有权。。父类 `KTX2Loader.KTX2Loader`。

- `constructor(customThreeJsTextureLoader)` [源码:497](../../eyes/src/engine/components/ModelComponent.js#L497)：当前操作：写入 _customThreeJsTextureLoader；返回 无显式返回。
- `load(url, onLoad, onProgress, onError)` [源码:501](../../eyes/src/engine/components/ModelComponent.js#L501)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/components/OrbitLineComponent.js`

根据动力学控制器的轨道元素生成环形轨道线，按显示区间设置透明度。。[源码](../../eyes/src/engine/components/OrbitLineComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-OrbitLineComponent-js)

### `OrbitLineComponent`

根据动力学控制器的轨道元素生成环形轨道线，按显示区间设置透明度。。父类 `Pioneer.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/OrbitLineComponent.js#L5)：当前操作：写入 _color、_colors、_farSideAlphaFade、_glowWidth、_lineMesh、_lineWidth、_positions、_widths；返回 无显式返回。
- `getColor()` [源码:17](../../eyes/src/engine/components/OrbitLineComponent.js#L17)：当前操作：写入 无直接字段写入；返回 this._color。
- `setColor(color)` [源码:20](../../eyes/src/engine/components/OrbitLineComponent.js#L20)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getFarSideAlphaFade()` [源码:27](../../eyes/src/engine/components/OrbitLineComponent.js#L27)：当前操作：写入 无直接字段写入；返回 this._farSideAlphaFade。
- `setFarSideAlphaFade(farSideAlphaFade)` [源码:30](../../eyes/src/engine/components/OrbitLineComponent.js#L30)：当前操作：写入 _farSideAlphaFade；返回 无显式返回。
- `getLineWidth()` [源码:33](../../eyes/src/engine/components/OrbitLineComponent.js#L33)：当前操作：写入 无直接字段写入；返回 this._lineWidth。
- `setLineWidth(lineWidth)` [源码:36](../../eyes/src/engine/components/OrbitLineComponent.js#L36)：当前操作：写入 _lineWidth、_widths[vertexIndex]；返回 无显式返回。
- `setGlowWidth(glowWidth)` [源码:43](../../eyes/src/engine/components/OrbitLineComponent.js#L43)：当前操作：写入 _glowWidth；返回 无显式返回。
- `__prepareForRender(camera)` [源码:47](../../eyes/src/engine/components/OrbitLineComponent.js#L47)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__loadResources()` [源码:54](../../eyes/src/engine/components/OrbitLineComponent.js#L54)：当前操作：写入 _lineMesh；返回 无显式返回。
- `__unloadResources()` [源码:66](../../eyes/src/engine/components/OrbitLineComponent.js#L66)：当前操作：写入 _colors、_lineMesh、_positions、_widths；返回 无显式返回。
- `_updateMesh()` [源码:73](../../eyes/src/engine/components/OrbitLineComponent.js#L73)：当前操作：写入 _colors[this._colors.length-1].a、_colors[this._colors.length-2].a；返回 void。

## `eyes/src/engine/components/OrbitalParticlesComponent.js`

通过轨道元素生成并更新一组轨道粒子。。[源码](../../eyes/src/engine/components/OrbitalParticlesComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-OrbitalParticlesComponent-js)

### `OrbitalParticlesComponent`

通过轨道元素生成并更新一组轨道粒子。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/OrbitalParticlesComponent.js#L5)：当前操作：写入 _loadFunction、_offsetArray、_orbitalElementsList、_scaleOfParticles、_spriteParticles；返回 无显式返回。
- `getScaleOfParticles()` [源码:14](../../eyes/src/engine/components/OrbitalParticlesComponent.js#L14)：当前操作：写入 无直接字段写入；返回 this._scaleOfParticles。
- `setScaleOfParticles(scaleOfParticles)` [源码:17](../../eyes/src/engine/components/OrbitalParticlesComponent.js#L17)：当前操作：写入 _scaleOfParticles；返回 无显式返回。
- `setLoadFunction(loadFunction)` [源码:21](../../eyes/src/engine/components/OrbitalParticlesComponent.js#L21)：当前操作：写入 _loadFunction；返回 无显式返回。
- `__update()` [源码:25](../../eyes/src/engine/components/OrbitalParticlesComponent.js#L25)：当前操作：写入 _offsetArray[3*particleIndex+0]、_offsetArray[3*particleIndex+1]、_offsetArray[3*particleIndex+2]；返回 void。
- `__prepareForRender(camera)` [源码:40](../../eyes/src/engine/components/OrbitalParticlesComponent.js#L40)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__loadResources()` [源码:45](../../eyes/src/engine/components/OrbitalParticlesComponent.js#L45)：当前操作：写入 _spriteParticles；返回 无显式返回。
- `__unloadResources()` [源码:51](../../eyes/src/engine/components/OrbitalParticlesComponent.js#L51)：当前操作：写入 _spriteParticles；返回 无显式返回。
- `_initializeParticles()` [源码:55](../../eyes/src/engine/components/OrbitalParticlesComponent.js#L55)：当前操作：写入 _offsetArray、_orbitalElementsList；返回 void。

## `eyes/src/engine/components/OrbiterLineOfSightComponent.js`

计算轨道器与地面/目标的视线几何并绘制可见性辅助图形。。[源码](../../eyes/src/engine/components/OrbiterLineOfSightComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-OrbiterLineOfSightComponent-js)

### `OrbiterLineOfSightComponent`

计算轨道器与地面/目标的视线几何并绘制可见性辅助图形。。父类 `Pioneer.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/OrbiterLineOfSightComponent.js#L5)：当前操作：写入 _color、_colors、_distanceThreshold、_ignoreDistance、_lineMesh、_positions、_targetA、_targetB、_threeJsScene、_width、_widths；返回 无显式返回。
- `setTargets(targetA, targetB)` [源码:23](../../eyes/src/engine/components/OrbiterLineOfSightComponent.js#L23)：当前操作：写入 _targetA、_targetB；返回 无显式返回。
- `setColor(color)` [源码:33](../../eyes/src/engine/components/OrbiterLineOfSightComponent.js#L33)：当前操作：写入 _color；返回 无显式返回。
- `setWidth(width)` [源码:36](../../eyes/src/engine/components/OrbiterLineOfSightComponent.js#L36)：当前操作：写入 _width；返回 无显式返回。
- `__loadResources()` [源码:39](../../eyes/src/engine/components/OrbiterLineOfSightComponent.js#L39)：当前操作：写入 _lineMesh；返回 Promise.resolve()。
- `__unloadResources()` [源码:43](../../eyes/src/engine/components/OrbiterLineOfSightComponent.js#L43)：当前操作：写入 _lineMesh；返回 无显式返回。
- `__prepareForRender(camera)` [源码:47](../../eyes/src/engine/components/OrbiterLineOfSightComponent.js#L47)：当前操作：写入 _color.a、getThreeJsObjects()[0].visible；返回 void(this.getThreeJsObjects().length>0&&(this.getThreeJsObjects()[0].visible=false))。
- `_updatePoints()` [源码:58](../../eyes/src/engine/components/OrbiterLineOfSightComponent.js#L58)：当前操作：写入 _colors、_positions、_widths；返回 无显式返回。

## `eyes/src/engine/components/ParticleSprayComponent.js`

以发射方向、速率、寿命等参数更新喷射粒子系统。。[源码](../../eyes/src/engine/components/ParticleSprayComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-ParticleSprayComponent-js)

### `ParticleSprayComponent`

以发射方向、速率、寿命等参数更新喷射粒子系统。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/ParticleSprayComponent.js#L5)：当前操作：写入 _colorOfParticles、_direction、_length、_numberOfParticles、_originOffset、_particleSpacingRandom、_relativeToEntityOrientation、_sizeOfParticles、_speedOfParticles、_spread；返回 无显式返回。
- `getLength()` [源码:19](../../eyes/src/engine/components/ParticleSprayComponent.js#L19)：当前操作：写入 无直接字段写入；返回 this._length。
- `setLength(length)` [源码:22](../../eyes/src/engine/components/ParticleSprayComponent.js#L22)：当前操作：写入 _length；返回 无显式返回。
- `getSpread()` [源码:28](../../eyes/src/engine/components/ParticleSprayComponent.js#L28)：当前操作：写入 无直接字段写入；返回 this._spread。
- `setSpread(spread)` [源码:31](../../eyes/src/engine/components/ParticleSprayComponent.js#L31)：当前操作：写入 _spread；返回 无显式返回。
- `getNumberOfParticles()` [源码:35](../../eyes/src/engine/components/ParticleSprayComponent.js#L35)：当前操作：写入 无直接字段写入；返回 this._numberOfParticles。
- `setNumberOfParticles(numberOfParticles)` [源码:38](../../eyes/src/engine/components/ParticleSprayComponent.js#L38)：当前操作：写入 _numberOfParticles；返回 无显式返回。
- `getSpeedOfParticles()` [源码:42](../../eyes/src/engine/components/ParticleSprayComponent.js#L42)：当前操作：写入 无直接字段写入；返回 this._speedOfParticles。
- `setSpeedOfParticles(speedOfParticles)` [源码:45](../../eyes/src/engine/components/ParticleSprayComponent.js#L45)：当前操作：写入 _speedOfParticles；返回 无显式返回。
- `getSizeOfParticles()` [源码:49](../../eyes/src/engine/components/ParticleSprayComponent.js#L49)：当前操作：写入 无直接字段写入；返回 this._sizeOfParticles。
- `setSizeOfParticles(sizeOfParticles)` [源码:52](../../eyes/src/engine/components/ParticleSprayComponent.js#L52)：当前操作：写入 _sizeOfParticles；返回 无显式返回。
- `getParticleSpacingRandom()` [源码:56](../../eyes/src/engine/components/ParticleSprayComponent.js#L56)：当前操作：写入 无直接字段写入；返回 this._particleSpacingRandom。
- `setParticleSpacingRandom(particleSpacingRandom)` [源码:59](../../eyes/src/engine/components/ParticleSprayComponent.js#L59)：当前操作：写入 _particleSpacingRandom；返回 无显式返回。
- `getColorOfParticles()` [源码:63](../../eyes/src/engine/components/ParticleSprayComponent.js#L63)：当前操作：写入 无直接字段写入；返回 this._colorOfParticles。
- `setColorOfParticles(color)` [源码:66](../../eyes/src/engine/components/ParticleSprayComponent.js#L66)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getOriginOffset()` [源码:70](../../eyes/src/engine/components/ParticleSprayComponent.js#L70)：当前操作：写入 无直接字段写入；返回 this._originOffset。
- `setOriginOffset(offset)` [源码:73](../../eyes/src/engine/components/ParticleSprayComponent.js#L73)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getDirection()` [源码:77](../../eyes/src/engine/components/ParticleSprayComponent.js#L77)：当前操作：写入 无直接字段写入；返回 this._direction。
- `setDirection(direction)` [源码:80](../../eyes/src/engine/components/ParticleSprayComponent.js#L80)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getRelativeToEntityOrientation()` [源码:92](../../eyes/src/engine/components/ParticleSprayComponent.js#L92)：当前操作：写入 无直接字段写入；返回 this._relativeToEntityOrientation。
- `setRelativeToEntityOrientation(relativeToEntityOrientation)` [源码:95](../../eyes/src/engine/components/ParticleSprayComponent.js#L95)：当前操作：写入 _relativeToEntityOrientation；返回 无显式返回。
- `__prepareForRender(camera)` [源码:98](../../eyes/src/engine/components/ParticleSprayComponent.js#L98)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__loadResources()` [源码:121](../../eyes/src/engine/components/ParticleSprayComponent.js#L121)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__unloadResources()` [源码:174](../../eyes/src/engine/components/ParticleSprayComponent.js#L174)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_initializeParticles()` [源码:178](../../eyes/src/engine/components/ParticleSprayComponent.js#L178)：params.xy 是横截面坐标，params.z 是初始寿命相位；颜色始终写 RGBA 四分量。

## `eyes/src/engine/components/RingsComponent.js`

加载行星环颜色/透明度纹理并构造环平面网格，结合光源与阴影实体着色。。[源码](../../eyes/src/engine/components/RingsComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-RingsComponent-js)

### `RingsComponent`

加载行星环颜色/透明度纹理并构造环平面网格，结合光源与阴影实体着色。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/RingsComponent.js#L5)：当前操作：写入 _bottomTextureUrl、_innerRadius、_outerRadius、_shadowEntities、_spheroidChangedCallback、_spheroidComponentRef、_topTextureUrl；返回 无显式返回。
- `getTopTextureUrl()` [源码:17](../../eyes/src/engine/components/RingsComponent.js#L17)：当前操作：写入 无直接字段写入；返回 this._topTextureUrl。
- `setTopTextureUrl(topTextureUrl)` [源码:20](../../eyes/src/engine/components/RingsComponent.js#L20)：当前操作：写入 _topTextureUrl；返回 无显式返回。
- `getBottomTextureUrl()` [源码:32](../../eyes/src/engine/components/RingsComponent.js#L32)：当前操作：写入 无直接字段写入；返回 this._bottomTextureUrl。
- `setBottomTextureUrl(bottomTextureUrl)` [源码:35](../../eyes/src/engine/components/RingsComponent.js#L35)：当前操作：写入 _bottomTextureUrl；返回 无显式返回。
- `getInnerRadius()` [源码:47](../../eyes/src/engine/components/RingsComponent.js#L47)：当前操作：写入 无直接字段写入；返回 this._innerRadius。
- `setInnerRadius(innerRadius)` [源码:50](../../eyes/src/engine/components/RingsComponent.js#L50)：当前操作：写入 _innerRadius；返回 无显式返回。
- `getOuterRadius()` [源码:54](../../eyes/src/engine/components/RingsComponent.js#L54)：当前操作：写入 无直接字段写入；返回 this._outerRadius。
- `setOuterRadius(outerRadius)` [源码:57](../../eyes/src/engine/components/RingsComponent.js#L57)：当前操作：写入 _outerRadius；返回 无显式返回。
- `getTopTexture()` [源码:62](../../eyes/src/engine/components/RingsComponent.js#L62)：当前操作：写入 无直接字段写入；返回 material.uniforms.topTexture.value、null。
- `getShadowEntity(shadowIndex)` [源码:69](../../eyes/src/engine/components/RingsComponent.js#L69)：当前操作：写入 无直接字段写入；返回 this._shadowEntities[shadowIndex]?.getName()。
- `setShadowEntities(entityNames)` [源码:72](../../eyes/src/engine/components/RingsComponent.js#L72)：当前操作：写入 _shadowEntities；返回 无显式返回。
- `__destroy()` [源码:78](../../eyes/src/engine/components/RingsComponent.js#L78)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:85](../../eyes/src/engine/components/RingsComponent.js#L85)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__prepareForRender(camera)` [源码:88](../../eyes/src/engine/components/RingsComponent.js#L88)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__loadResources()` [源码:96](../../eyes/src/engine/components/RingsComponent.js#L96)：当前操作：写入 无直接字段写入；返回 void this.getEngine().getResourceManager().releaseAllForEntityItem(this)。
- `__unloadResources()` [源码:174](../../eyes/src/engine/components/RingsComponent.js#L174)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_spheroidRefChangedCallback(previousSpheroid, nextSpheroid)` [源码:178](../../eyes/src/engine/components/RingsComponent.js#L178)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_spheroidChangedCallback()` [源码:187](../../eyes/src/engine/components/RingsComponent.js#L187)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/components/ShadowConeComponent.js`

按源与目标半径/相对位置计算本影或半影锥并渲染截面几何。。[源码](../../eyes/src/engine/components/ShadowConeComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-ShadowConeComponent-js)

### `ShadowConeComponent`

按源与目标半径/相对位置计算本影或半影锥并渲染截面几何。。父类 `Pioneer.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/ShadowConeComponent.js#L5)：当前操作：写入 _color、_numberOfCirclePoints、_shadowType、_sourceEntity、_targetEntity；返回 无显式返回。
- `getColor()` [源码:14](../../eyes/src/engine/components/ShadowConeComponent.js#L14)：当前操作：写入 无直接字段写入；返回 this._color。
- `setColor(color)` [源码:17](../../eyes/src/engine/components/ShadowConeComponent.js#L17)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getSourceEntity()` [源码:20](../../eyes/src/engine/components/ShadowConeComponent.js#L20)：当前操作：写入 无直接字段写入；返回 this._sourceEntity.getName()。
- `setSourceEntity(entityName)` [源码:23](../../eyes/src/engine/components/ShadowConeComponent.js#L23)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getTargetEntity()` [源码:26](../../eyes/src/engine/components/ShadowConeComponent.js#L26)：当前操作：写入 无直接字段写入；返回 this._targetEntity.getName()。
- `setTargetEntity(entityName)` [源码:29](../../eyes/src/engine/components/ShadowConeComponent.js#L29)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getShadowType()` [源码:32](../../eyes/src/engine/components/ShadowConeComponent.js#L32)：当前操作：写入 无直接字段写入；返回 this._shadowType。
- `setShadowType(shadowType)` [源码:35](../../eyes/src/engine/components/ShadowConeComponent.js#L35)：当前操作：写入 _shadowType；返回 无显式返回。
- `__prepareForRender(camera)` [源码:39](../../eyes/src/engine/components/ShadowConeComponent.js#L39)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__loadResources()` [源码:45](../../eyes/src/engine/components/ShadowConeComponent.js#L45)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__unloadResources()` [源码:55](../../eyes/src/engine/components/ShadowConeComponent.js#L55)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_createMesh()` [源码:58](../../eyes/src/engine/components/ShadowConeComponent.js#L58)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateMesh()` [源码:75](../../eyes/src/engine/components/ShadowConeComponent.js#L75)：本影截断在锥顶之前；半影沿背光方向扩张。目标实体仅用于指定可视锥长度。

## `eyes/src/engine/components/SkyboxComponent.js`

从六面或全景纹理构建随相机移动的背景天空。。[源码](../../eyes/src/engine/components/SkyboxComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-SkyboxComponent-js)

### `SkyboxComponent`

从六面或全景纹理构建随相机移动的背景天空。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/SkyboxComponent.js#L5)：当前操作：写入 _numLatVerts、_textureUrl；返回 无显式返回。
- `getTextureUrl()` [源码:12](../../eyes/src/engine/components/SkyboxComponent.js#L12)：当前操作：写入 无直接字段写入；返回 this._textureUrl。
- `setTextureUrl(textureUrl)` [源码:15](../../eyes/src/engine/components/SkyboxComponent.js#L15)：当前操作：写入 _textureUrl；返回 无显式返回。
- `__prepareForRender(camera)` [源码:19](../../eyes/src/engine/components/SkyboxComponent.js#L19)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__loadResources()` [源码:23](../../eyes/src/engine/components/SkyboxComponent.js#L23)：当前操作：写入 无直接字段写入；返回 void this.getEngine().getResourceManager().releaseAllForEntityItem(this)。
- `__unloadResources()` [源码:78](../../eyes/src/engine/components/SkyboxComponent.js#L78)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/components/SphereGridComponent.js`

在球面生成经纬网格并以相机相关变换渲染。。[源码](../../eyes/src/engine/components/SphereGridComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-SphereGridComponent-js)

### `SphereGridComponent`

在球面生成经纬网格并以相机相关变换渲染。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/SphereGridComponent.js#L5)：当前操作：写入 _color、_degreesPerLine、_lineMesh、_meshDirty、_relativeToEntity；返回 无显式返回。
- `setRadius(radius)` [源码:13](../../eyes/src/engine/components/SphereGridComponent.js#L13)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getColor()` [源码:17](../../eyes/src/engine/components/SphereGridComponent.js#L17)：当前操作：写入 无直接字段写入；返回 this._color。
- `setColor(color)` [源码:20](../../eyes/src/engine/components/SphereGridComponent.js#L20)：当前操作：写入 _meshDirty；返回 无显式返回。
- `getDegreesPerLine()` [源码:24](../../eyes/src/engine/components/SphereGridComponent.js#L24)：当前操作：写入 无直接字段写入；返回 this._degreesPerLine。
- `setDegreesPerLine(degreesPerLine)` [源码:27](../../eyes/src/engine/components/SphereGridComponent.js#L27)：当前操作：写入 _degreesPerLine、_meshDirty；返回 无显式返回。
- `isRelativeToEntity()` [源码:31](../../eyes/src/engine/components/SphereGridComponent.js#L31)：当前操作：写入 无直接字段写入；返回 this._relativeToEntity。
- `setRelativeToEntity(relativeToEntity)` [源码:34](../../eyes/src/engine/components/SphereGridComponent.js#L34)：当前操作：写入 _relativeToEntity；返回 无显式返回。
- `__prepareForRender(camera)` [源码:38](../../eyes/src/engine/components/SphereGridComponent.js#L38)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__loadResources()` [源码:50](../../eyes/src/engine/components/SphereGridComponent.js#L50)：当前操作：写入 _lineMesh；返回 无显式返回。
- `__unloadResources()` [源码:54](../../eyes/src/engine/components/SphereGridComponent.js#L54)：当前操作：写入 _lineMesh；返回 无显式返回。
- `_updateMesh()` [源码:58](../../eyes/src/engine/components/SphereGridComponent.js#L58)：当前操作：写入 _meshDirty；返回 void。

## `eyes/src/engine/components/SpheroidComponent.js`

描述扁球体几何，负责 XYZ 与经纬高转换、地表法线和局部姿态求解；不负责贴图 LOD。。[源码](../../eyes/src/engine/components/SpheroidComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-SpheroidComponent-js)

### `SpheroidComponent`

描述扁球体几何，负责 XYZ 与经纬高转换、地表法线和局部姿态求解；不负责贴图 LOD。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/SpheroidComponent.js#L5)：当前操作：写入 _changed、_changedCallbacks、_equatorialRadius、_planetographic、_polarRadius；返回 无显式返回。
- `getEquatorialRadius()` [源码:15](../../eyes/src/engine/components/SpheroidComponent.js#L15)：当前操作：写入 无直接字段写入；返回 this._equatorialRadius。
- `setEquatorialRadius(equatorialRadius)` [源码:18](../../eyes/src/engine/components/SpheroidComponent.js#L18)：当前操作：写入 _changed、_equatorialRadius；返回 无显式返回。
- `getPolarRadius()` [源码:23](../../eyes/src/engine/components/SpheroidComponent.js#L23)：当前操作：写入 无直接字段写入；返回 this._polarRadius。
- `setPolarRadius(polarRadius)` [源码:26](../../eyes/src/engine/components/SpheroidComponent.js#L26)：当前操作：写入 _changed、_polarRadius；返回 无显式返回。
- `isPlanetographic()` [源码:31](../../eyes/src/engine/components/SpheroidComponent.js#L31)：当前操作：写入 无直接字段写入；返回 this._planetographic。
- `setPlanetographic(planetographic)` [源码:34](../../eyes/src/engine/components/SpheroidComponent.js#L34)：当前操作：写入 _changed、_planetographic；返回 无显式返回。
- `addChangedCallback(callback)` [源码:38](../../eyes/src/engine/components/SpheroidComponent.js#L38)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeChangedCallback(callback)` [源码:41](../../eyes/src/engine/components/SpheroidComponent.js#L41)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:44](../../eyes/src/engine/components/SpheroidComponent.js#L44)：当前操作：写入 _changed；返回 无显式返回。
- `xyzFromLLA(output, geodetic)` [源码:50](../../eyes/src/engine/components/SpheroidComponent.js#L50)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `radiusFromXYZ(position, iterations=5)` [源码:69](../../eyes/src/engine/components/SpheroidComponent.js#L69)：地理纬度分支迭代求卯酉圈曲率半径；地心纬度分支直接按射线方向求椭球表面半径。
- `llaFromXYZ(output, position, iterations=5)` [源码:89](../../eyes/src/engine/components/SpheroidComponent.js#L89)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `llaToggleGraphicCentric(output, geodetic)` [源码:114](../../eyes/src/engine/components/SpheroidComponent.js#L114)：当前操作：写入 _planetographic；返回 无显式返回。
- `upFromLLA(output, geodetic)` [源码:122](../../eyes/src/engine/components/SpheroidComponent.js#L122)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `eastFromLLA(output, geodetic)` [源码:134](../../eyes/src/engine/components/SpheroidComponent.js#L134)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `northFromLLA(output, geodetic)` [源码:139](../../eyes/src/engine/components/SpheroidComponent.js#L139)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `orientationFromLLA(output, geodetic)` [源码:151](../../eyes/src/engine/components/SpheroidComponent.js#L151)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `aerFromXYZRelToLLA(output, position, observerGeodetic)` [源码:167](../../eyes/src/engine/components/SpheroidComponent.js#L167)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getRayIntersection(output, rayOrigin, rayDirection)` [源码:196](../../eyes/src/engine/components/SpheroidComponent.js#L196)：缩放 Z 后椭球化为赤道半径球；相同线参数仍适用，返回点最后撤销 Z 缩放。
- `getGroundPosition(output, normal, position)` [源码:208](../../eyes/src/engine/components/SpheroidComponent.js#L208)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/components/SpheroidLODComponent.js`

以球体网格/立方体映射和 TextureLOD 为行星选择纹理分辨率，协调大气及阴影材质。。[源码](../../eyes/src/engine/components/SpheroidLODComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-SpheroidLODComponent-js)

### `SpheroidLODComponent`

以球体网格/立方体映射和 TextureLOD 为行星选择纹理分辨率，协调大气及阴影材质。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/SpheroidLODComponent.js#L5)：当前操作：写入 _atmosphereComponentRef、_cubeMapFaceFrames、_longitudinalRotation、_lowerLeftBounds、_mapping、_materialOptions、_numFaces、_shadowEntities、_spheroidChangedCallback、_spheroidComponentRef、_textureInfos、_upperRightBounds；返回 无显式返回。
- `getTextureNames()` [源码:22](../../eyes/src/engine/components/SpheroidLODComponent.js#L22)：当前操作：写入 无直接字段写入；返回 names。
- `getTextureUrl(textureName)` [源码:27](../../eyes/src/engine/components/SpheroidLODComponent.js#L27)：当前操作：写入 无直接字段写入；返回 this._textureInfos.get(textureName)?.url。
- `getTextureSizes(textureName)` [源码:30](../../eyes/src/engine/components/SpheroidLODComponent.js#L30)：当前操作：写入 无直接字段写入；返回 this._textureInfos.get(textureName)?.sizes。
- `setTexture(textureName, url, sizes=[4,512,4096])` [源码:33](../../eyes/src/engine/components/SpheroidLODComponent.js#L33)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `forceTextureSize(textureName, size)` [源码:69](../../eyes/src/engine/components/SpheroidLODComponent.js#L69)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `unsetTexture(textureName)` [源码:74](../../eyes/src/engine/components/SpheroidLODComponent.js#L74)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getTextureCurrentSize(textureName, faceIndex)` [源码:93](../../eyes/src/engine/components/SpheroidLODComponent.js#L93)：当前操作：写入 无直接字段写入；返回 textureInfo.lods[faceIndex].getCurrentSize()。
- `isMaterialOptionEnabled(option)` [源码:97](../../eyes/src/engine/components/SpheroidLODComponent.js#L97)：当前操作：写入 无直接字段写入；返回 this._materialOptions.has(option)。
- `setMaterialOption(option, enabled)` [源码:100](../../eyes/src/engine/components/SpheroidLODComponent.js#L100)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getMapping()` [源码:118](../../eyes/src/engine/components/SpheroidLODComponent.js#L118)：当前操作：写入 无直接字段写入；返回 this._mapping。
- `setMapping(mapping)` [源码:122](../../eyes/src/engine/components/SpheroidLODComponent.js#L122)：先归还旧 LOD 的 uniform 引用，再按新面数重建，避免旧纹理仍挂在已替换材质上。
- `setBounds(lowerLeft, upperRight)` [源码:140](../../eyes/src/engine/components/SpheroidLODComponent.js#L140)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setCubeMapLayout(layout)` [源码:145](../../eyes/src/engine/components/SpheroidLODComponent.js#L145)：当前操作：写入 _cubeMapFaceFrames；返回 无显式返回。
- `getNumShadowEntities()` [源码:166](../../eyes/src/engine/components/SpheroidLODComponent.js#L166)：当前操作：写入 无直接字段写入；返回 this._shadowEntities.length。
- `getShadowEntity(shadowIndex)` [源码:169](../../eyes/src/engine/components/SpheroidLODComponent.js#L169)：当前操作：写入 无直接字段写入；返回 this._shadowEntities[shadowIndex]?.getName()。
- `setShadowEntities(entityNames)` [源码:172](../../eyes/src/engine/components/SpheroidLODComponent.js#L172)：当前操作：写入 _shadowEntities；返回 无显式返回。
- `getLongitudeRotation()` [源码:178](../../eyes/src/engine/components/SpheroidLODComponent.js#L178)：当前操作：写入 无直接字段写入；返回 this._longitudinalRotation。
- `setLongitudeRotation(longitudinalRotation)` [源码:181](../../eyes/src/engine/components/SpheroidLODComponent.js#L181)：当前操作：写入 _longitudinalRotation；返回 无显式返回。
- `getLoadedPromise(forceLoaded=false, timeout=Number.POSITIVE_INFINITY)` [源码:184](../../eyes/src/engine/components/SpheroidLODComponent.js#L184)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getTexturesLoadedPromise(timeout=Number.POSITIVE_INFINITY)` [源码:190](../../eyes/src/engine/components/SpheroidLODComponent.js#L190)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setSpheroidReference(nameOrClassIndex)` [源码:199](../../eyes/src/engine/components/SpheroidLODComponent.js#L199)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__destroy()` [源码:202](../../eyes/src/engine/components/SpheroidLODComponent.js#L202)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:209](../../eyes/src/engine/components/SpheroidLODComponent.js#L209)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__prepareForRender(camera)` [源码:216](../../eyes/src/engine/components/SpheroidLODComponent.js#L216)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__loadResources()` [源码:228](../../eyes/src/engine/components/SpheroidLODComponent.js#L228)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__unloadResources()` [源码:268](../../eyes/src/engine/components/SpheroidLODComponent.js#L268)：LOD 负责归还纹理；销毁 mesh/material 时不再跟随销毁 uniform 中的共享纹理。
- `_updateMeshes()` [源码:285](../../eyes/src/engine/components/SpheroidLODComponent.js#L285)：当前操作：写入 无直接字段写入；返回 void。
- `_spheroidRefChangedCallback(previousSpheroid, nextSpheroid)` [源码:404](../../eyes/src/engine/components/SpheroidLODComponent.js#L404)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_spheroidChangedCallback()` [源码:413](../../eyes/src/engine/components/SpheroidLODComponent.js#L413)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/components/SpoutComponent.js`

将相机输出绘制到特定宽度的画布/投影输出，提供面向球幕的渲染路径。。[源码](../../eyes/src/engine/components/SpoutComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-SpoutComponent-js)

### `SpoutComponent`

将相机输出绘制到特定宽度的画布/投影输出，提供面向球幕的渲染路径。。父类 `PioneerPublicApi.CameraComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/SpoutComponent.js#L5)：当前操作：写入 _globeDistance、_renderWidth、_spoutTexture、_tagEnd、_tagSend、_tagStart、_threeJsCubeCamera、_threeJsFaceCameras、_threeJsFaceRenderTargets、_threeJsQuad、_threeJsSpoutScene；返回 无显式返回。
- `getRenderWidth()` [源码:42](../../eyes/src/engine/components/SpoutComponent.js#L42)：当前操作：写入 无直接字段写入；返回 this._renderWidth。
- `setRenderWidth(renderWidth)` [源码:45](../../eyes/src/engine/components/SpoutComponent.js#L45)：当前操作：写入 _renderWidth；返回 无显式返回。
- `getForGlobe()` [源码:52](../../eyes/src/engine/components/SpoutComponent.js#L52)：当前操作：写入 无直接字段写入；返回 1===this.getInvertDepth()。
- `setForGlobe(forGlobe, globeDistance)` [源码:55](../../eyes/src/engine/components/SpoutComponent.js#L55)：当前操作：写入 _globeDistance；返回 无显式返回。
- `__render()` [源码:59](../../eyes/src/engine/components/SpoutComponent.js#L59)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateProjectionMatrices()` [源码:107](../../eyes/src/engine/components/SpoutComponent.js#L107)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setupQuad()` [源码:122](../../eyes/src/engine/components/SpoutComponent.js#L122)：当前操作：写入 _threeJsQuad、_threeJsQuad.frustumCulled；返回 无显式返回。

## `eyes/src/engine/components/SpriteComponent.js`

载入图像纹理并渲染面向相机的可缩放精灵。。[源码](../../eyes/src/engine/components/SpriteComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-SpriteComponent-js)

### `SpriteComponent`

载入图像纹理并渲染面向相机的可缩放精灵。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/SpriteComponent.js#L5)：当前操作：写入 _alignment、_billboard、_blending、_colorMultiplier、_renderOrder、_size、_sizeUnits、_textureUrl、_transparent；返回 无显式返回。
- `getTextureUrl()` [源码:17](../../eyes/src/engine/components/SpriteComponent.js#L17)：当前操作：写入 无直接字段写入；返回 this._textureUrl。
- `setTextureUrl(textureUrl)` [源码:20](../../eyes/src/engine/components/SpriteComponent.js#L20)：当前操作：写入 _textureUrl；返回 无显式返回。
- `getSize()` [源码:24](../../eyes/src/engine/components/SpriteComponent.js#L24)：当前操作：写入 无直接字段写入；返回 this._size。
- `setSize(size)` [源码:27](../../eyes/src/engine/components/SpriteComponent.js#L27)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getSizeUnits()` [源码:31](../../eyes/src/engine/components/SpriteComponent.js#L31)：当前操作：写入 无直接字段写入；返回 this._sizeUnits。
- `setSizeUnits(sizeUnits)` [源码:34](../../eyes/src/engine/components/SpriteComponent.js#L34)：当前操作：写入 _sizeUnits；返回 无显式返回。
- `getColorMultiplier()` [源码:38](../../eyes/src/engine/components/SpriteComponent.js#L38)：当前操作：写入 无直接字段写入；返回 this._colorMultiplier。
- `setColorMultiplier(color)` [源码:41](../../eyes/src/engine/components/SpriteComponent.js#L41)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getAlignment()` [源码:45](../../eyes/src/engine/components/SpriteComponent.js#L45)：当前操作：写入 无直接字段写入；返回 this._alignment。
- `setAlignment(alignment)` [源码:48](../../eyes/src/engine/components/SpriteComponent.js#L48)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `isBillboard()` [源码:52](../../eyes/src/engine/components/SpriteComponent.js#L52)：当前操作：写入 无直接字段写入；返回 this._billboard。
- `setBillboard(billboard)` [源码:55](../../eyes/src/engine/components/SpriteComponent.js#L55)：当前操作：写入 _billboard；返回 无显式返回。
- `getTransparent()` [源码:58](../../eyes/src/engine/components/SpriteComponent.js#L58)：当前操作：写入 无直接字段写入；返回 this._transparent。
- `setTransparent(transparent)` [源码:61](../../eyes/src/engine/components/SpriteComponent.js#L61)：当前操作：写入 _transparent；返回 无显式返回。
- `setBlending(blending)` [源码:65](../../eyes/src/engine/components/SpriteComponent.js#L65)：当前操作：写入 _blending；返回 无显式返回。
- `getRenderOrder()` [源码:69](../../eyes/src/engine/components/SpriteComponent.js#L69)：当前操作：写入 无直接字段写入；返回 this._renderOrder。
- `setRenderOrder(renderOrder)` [源码:72](../../eyes/src/engine/components/SpriteComponent.js#L72)：当前操作：写入 _renderOrder；返回 无显式返回。
- `__prepareForRender(camera)` [源码:76](../../eyes/src/engine/components/SpriteComponent.js#L76)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__loadResources()` [源码:95](../../eyes/src/engine/components/SpriteComponent.js#L95)：当前操作：写入 无直接字段写入；返回 void this.getEngine().getResourceManager().releaseAllForEntityItem(this)。
- `__unloadResources()` [源码:138](../../eyes/src/engine/components/SpriteComponent.js#L138)：实例只销毁 clone 材质并归还纹理；共享模板与几何在最后一个使用者退出时销毁。
- `_updateSizeUniform()` [源码:155](../../eyes/src/engine/components/SpriteComponent.js#L155)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/components/StarfieldComponent.js`

解析星表并构造星点，按亮度/颜色和相机方向渲染背景恒星。。[源码](../../eyes/src/engine/components/StarfieldComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-StarfieldComponent-js)

### `Star`

星表单颗恒星的数据记录。。父类 `无`。

- `constructor()` [源码:9](../../eyes/src/engine/components/StarfieldComponent.js#L9)：当前操作：写入 absMag、color、mag、position；返回 无显式返回。

### `StarfieldComponent`

解析星表并构造星点，按亮度/颜色和相机方向渲染背景恒星。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:17](../../eyes/src/engine/components/StarfieldComponent.js#L17)：当前操作：写入 _particleSize、_url；返回 无显式返回。
- `getUrl()` [源码:23](../../eyes/src/engine/components/StarfieldComponent.js#L23)：当前操作：写入 无直接字段写入；返回 this._url。
- `setUrl(url)` [源码:26](../../eyes/src/engine/components/StarfieldComponent.js#L26)：当前操作：写入 _url；返回 无显式返回。
- `getParticleSize()` [源码:30](../../eyes/src/engine/components/StarfieldComponent.js#L30)：当前操作：写入 无直接字段写入；返回 this._particleSize。
- `setParticleSize(particleSize)` [源码:33](../../eyes/src/engine/components/StarfieldComponent.js#L33)：当前操作：写入 _particleSize；返回 无显式返回。
- `__prepareForRender(camera)` [源码:36](../../eyes/src/engine/components/StarfieldComponent.js#L36)：当前操作：写入 无直接字段写入；返回 void。
- `__loadResources()` [源码:48](../../eyes/src/engine/components/StarfieldComponent.js#L48)：当前操作：写入 无直接字段写入；返回 void。
- `__unloadResources()` [源码:89](../../eyes/src/engine/components/StarfieldComponent.js#L89)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_loadStars()` [源码:92](../../eyes/src/engine/components/StarfieldComponent.js#L92)：当前操作：写入 无直接字段写入；返回 stars。

## `eyes/src/engine/components/TorusComponent.js`

生成带主/次半径和分段参数的环面网格。。[源码](../../eyes/src/engine/components/TorusComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-TorusComponent-js)

### `TorusComponent`

生成带主/次半径和分段参数的环面网格。。父类 `Pioneer.BaseComponent`。

- `constructor(componentName, entity)` [源码:5](../../eyes/src/engine/components/TorusComponent.js#L5)：当前操作：写入 _color、_innerRadius、_outerRadius；返回 无显式返回。
- `getColor()` [源码:13](../../eyes/src/engine/components/TorusComponent.js#L13)：当前操作：写入 无直接字段写入；返回 this._color。
- `setColor(color)` [源码:16](../../eyes/src/engine/components/TorusComponent.js#L16)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getInnerRadius()` [源码:19](../../eyes/src/engine/components/TorusComponent.js#L19)：当前操作：写入 无直接字段写入；返回 this._innerRadius。
- `setInnerRadius(innerRadius)` [源码:22](../../eyes/src/engine/components/TorusComponent.js#L22)：当前操作：写入 _innerRadius；返回 无显式返回。
- `getOuterRadius()` [源码:26](../../eyes/src/engine/components/TorusComponent.js#L26)：当前操作：写入 无直接字段写入；返回 this._outerRadius。
- `setOuterRadius(outerRadius)` [源码:29](../../eyes/src/engine/components/TorusComponent.js#L29)：当前操作：写入 _outerRadius；返回 无显式返回。
- `__prepareForRender(camera)` [源码:34](../../eyes/src/engine/components/TorusComponent.js#L34)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__loadResources()` [源码:40](../../eyes/src/engine/components/TorusComponent.js#L40)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__unloadResources()` [源码:50](../../eyes/src/engine/components/TorusComponent.js#L50)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_createMesh()` [源码:53](../../eyes/src/engine/components/TorusComponent.js#L53)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/components/TrailComponent.js`

对实体按时间自适应采样，缓存轨迹点并生成带宽度、渐隐、虚线偏移的轨迹网格。。[源码](../../eyes/src/engine/components/TrailComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-TrailComponent-js)

### `Point`

轨迹缓存点：保存采样时间、位置和速度，供轨迹几何更新使用。。父类 `无`。

- `constructor()` [源码:8](../../eyes/src/engine/components/TrailComponent.js#L8)：当前操作：写入 position、time、velocity；返回 无显式返回。

### `TrailComponent`

对实体按时间自适应采样，缓存轨迹点并生成带宽度、渐隐、虚线偏移的轨迹网格。。父类 `PioneerPublicApi.BaseComponent`。

- `constructor(componentName, entity)` [源码:15](../../eyes/src/engine/components/TrailComponent.js#L15)：当前操作：写入 _alphaFade、_angleCurveThreshold、_color、_currentRelativeToEntity、_dashGapLength、_dashLength、_dashOffsetTime、_drawStartTime、_endTime、_endTimeMultiplier、_glowWidth、_initialTimeStep、_points、_pointsCount、_pointsPerFrame、_pointsStart、_relativeEndTime、_relativeStartTime、_relativeToEntity、_relativeToEntityOrientation、_startTime、_startTimeMultiplier、_updatePointPositions、_updatePointPositionsLastIndex、_widthMax、_widthMin；返回 无显式返回。
- `getColor()` [源码:46](../../eyes/src/engine/components/TrailComponent.js#L46)：当前操作：写入 无直接字段写入；返回 this._color。
- `setColor(color)` [源码:49](../../eyes/src/engine/components/TrailComponent.js#L49)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getAlphaFade()` [源码:53](../../eyes/src/engine/components/TrailComponent.js#L53)：当前操作：写入 无直接字段写入；返回 this._alphaFade。
- `setWidths(widthMin, widthMax)` [源码:56](../../eyes/src/engine/components/TrailComponent.js#L56)：当前操作：写入 _widthMax、_widthMin；返回 无显式返回。
- `setAlphaFade(alphaFade)` [源码:62](../../eyes/src/engine/components/TrailComponent.js#L62)：当前操作：写入 _alphaFade；返回 无显式返回。
- `setDashLength(dashLength, dashGapLength)` [源码:66](../../eyes/src/engine/components/TrailComponent.js#L66)：当前操作：写入 _dashGapLength、_dashLength；返回 无显式返回。
- `setGlowWidth(glowWidth)` [源码:72](../../eyes/src/engine/components/TrailComponent.js#L72)：当前操作：写入 _glowWidth；返回 无显式返回。
- `getStartTime()` [源码:76](../../eyes/src/engine/components/TrailComponent.js#L76)：当前操作：写入 无直接字段写入；返回 this._startTime。
- `setStartTime(startTime)` [源码:79](../../eyes/src/engine/components/TrailComponent.js#L79)：当前操作：写入 _startTime；返回 无显式返回。
- `getEndTime()` [源码:82](../../eyes/src/engine/components/TrailComponent.js#L82)：当前操作：写入 无直接字段写入；返回 this._endTime。
- `setEndTime(endTime)` [源码:85](../../eyes/src/engine/components/TrailComponent.js#L85)：当前操作：写入 _endTime；返回 无显式返回。
- `isRelativeStartTime()` [源码:88](../../eyes/src/engine/components/TrailComponent.js#L88)：当前操作：写入 无直接字段写入；返回 this._relativeStartTime。
- `setRelativeStartTime(relativeStartTime)` [源码:91](../../eyes/src/engine/components/TrailComponent.js#L91)：当前操作：写入 _relativeStartTime；返回 无显式返回。
- `isRelativeEndTime()` [源码:95](../../eyes/src/engine/components/TrailComponent.js#L95)：当前操作：写入 无直接字段写入；返回 this._relativeEndTime。
- `setRelativeEndTime(relativeEndTime)` [源码:98](../../eyes/src/engine/components/TrailComponent.js#L98)：当前操作：写入 _relativeEndTime；返回 无显式返回。
- `getStartTimeMultiplier()` [源码:102](../../eyes/src/engine/components/TrailComponent.js#L102)：当前操作：写入 无直接字段写入；返回 this._startTimeMultiplier。
- `setStartTimeMultiplier(startTimeMultiplier)` [源码:105](../../eyes/src/engine/components/TrailComponent.js#L105)：当前操作：写入 _startTimeMultiplier；返回 无显式返回。
- `getEndTimeMultiplier()` [源码:108](../../eyes/src/engine/components/TrailComponent.js#L108)：当前操作：写入 无直接字段写入；返回 this._endTimeMultiplier。
- `setEndTimeMultiplier(endTimeMultiplier)` [源码:111](../../eyes/src/engine/components/TrailComponent.js#L111)：当前操作：写入 _endTimeMultiplier；返回 无显式返回。
- `getRelativeToEntity()` [源码:114](../../eyes/src/engine/components/TrailComponent.js#L114)：当前操作：写入 无直接字段写入；返回 this._relativeToEntity.getName()。
- `setRelativeToEntity(entityName)` [源码:117](../../eyes/src/engine/components/TrailComponent.js#L117)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `isRelativeToEntityOrientation()` [源码:122](../../eyes/src/engine/components/TrailComponent.js#L122)：当前操作：写入 无直接字段写入；返回 this._relativeToEntityOrientation。
- `setRelativeToEntityOrientation(relativeToEntityOrientation)` [源码:125](../../eyes/src/engine/components/TrailComponent.js#L125)：当前操作：写入 _relativeToEntityOrientation；返回 无显式返回。
- `getAngleCurveThreshold()` [源码:132](../../eyes/src/engine/components/TrailComponent.js#L132)：当前操作：写入 无直接字段写入；返回 this._angleCurveThreshold。
- `setAngleCurveThreshold(angleCurveThreshold)` [源码:135](../../eyes/src/engine/components/TrailComponent.js#L135)：当前操作：写入 _angleCurveThreshold；返回 无显式返回。
- `getInitialTimeStep()` [源码:139](../../eyes/src/engine/components/TrailComponent.js#L139)：当前操作：写入 无直接字段写入；返回 this._initialTimeStep。
- `setInitialTimeStep(initialTimeStep)` [源码:142](../../eyes/src/engine/components/TrailComponent.js#L142)：当前操作：写入 _initialTimeStep；返回 无显式返回。
- `getDrawStartTime()` [源码:146](../../eyes/src/engine/components/TrailComponent.js#L146)：当前操作：写入 无直接字段写入；返回 this._drawStartTime。
- `setDrawStartTime(drawStartTime)` [源码:149](../../eyes/src/engine/components/TrailComponent.js#L149)：当前操作：写入 _drawStartTime；返回 无显式返回。
- `getPointsPerFrame()` [源码:152](../../eyes/src/engine/components/TrailComponent.js#L152)：当前操作：写入 无直接字段写入；返回 this._pointsPerFrame。
- `setPointsPerFrame(pointsPerFrame)` [源码:155](../../eyes/src/engine/components/TrailComponent.js#L155)：当前操作：写入 _pointsPerFrame；返回 无显式返回。
- `getUpdatePointPositions()` [源码:158](../../eyes/src/engine/components/TrailComponent.js#L158)：当前操作：写入 无直接字段写入；返回 this._updatePointPositions。
- `setUpdatePointPositions(updatePointPositions)` [源码:161](../../eyes/src/engine/components/TrailComponent.js#L161)：当前操作：写入 _updatePointPositions；返回 无显式返回。
- `resetPoints()` [源码:164](../../eyes/src/engine/components/TrailComponent.js#L164)：当前操作：写入 _points、_pointsCount、_pointsStart；返回 无显式返回。
- `__loadResources()` [源码:181](../../eyes/src/engine/components/TrailComponent.js#L181)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__unloadResources()` [源码:215](../../eyes/src/engine/components/TrailComponent.js#L215)：当前操作：写入 _points、_pointsCount、_pointsStart；返回 无显式返回。
- `__prepareForRender(camera)` [源码:222](../../eyes/src/engine/components/TrailComponent.js#L222)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updatePoints()` [源码:255](../../eyes/src/engine/components/TrailComponent.js#L255)：首尾各扩展到时间区间边界；曲率过大缩步，过小增步，最多试探 20 次并受每帧新增预算约束。
- `_getIntervalForUpdate(output, time)` [源码:405](../../eyes/src/engine/components/TrailComponent.js#L405)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_popFrontPoint(dirtyRange)` [源码:426](../../eyes/src/engine/components/TrailComponent.js#L426)：当前操作：写入 _pointsCount、_pointsStart、_points[this._pointsStart].position.x；返回 无显式返回。
- `_popBackPoint(dirtyRange)` [源码:438](../../eyes/src/engine/components/TrailComponent.js#L438)：当前操作：写入 _pointsCount、_points[(this._pointsStart+this._pointsCount)%this._points.length].position.x；返回 无显式返回。
- `_pushFrontPoint(dirtyRange)` [源码:449](../../eyes/src/engine/components/TrailComponent.js#L449)：当前操作：写入 _pointsCount、_pointsStart；返回 无显式返回。
- `_pushBackPoint(dirtyRange)` [源码:458](../../eyes/src/engine/components/TrailComponent.js#L458)：当前操作：写入 _pointsCount；返回 无显式返回。
- `_resize(pointCount, dirtyRange)` [源码:467](../../eyes/src/engine/components/TrailComponent.js#L467)：环形缓冲变容量时先按逻辑顺序复制已有点；两倍顶点数决定索引必须用 Uint16 还是 Uint32。
- `_getAutoLength(time)` [源码:507](../../eyes/src/engine/components/TrailComponent.js#L507)：当前操作：写入 无直接字段写入；返回 duration。
- `_getPositionAndVelocity(outputPosition, outputVelocity, time)` [源码:532](../../eyes/src/engine/components/TrailComponent.js#L532)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/components/WMTSComponent.js`

解析 WMTS 能力文档并按矩阵/图层/维度递归加载地理瓦片，叠加球面影像。。[源码](../../eyes/src/engine/components/WMTSComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-components-WMTSComponent-js)

### `WMTSComponent`

Capabilities 决定图层、矩阵集和 CRS；瓦片 URL 只替换原模板占位符。异步 ready 后再次检查 loading，卸载中的资源不发布为根瓦片。。父类 `Pioneer.BaseComponent`。

- `constructor(componentName, entity)` [源码:6](../../eyes/src/engine/components/WMTSComponent.js#L6)：当前操作：写入 _atmosphereComponentRef、_cameraFieldsOfView、_cameraPositions、_capabilities、_dimensionValues、_endPoint、_engine、_layer、_layerIdentifier、_loadedTiles、_loadsThisFrame、_materialOptions、_maxLevel、_minLevel、_rootTile、_shadowEntities、_spheroidChangedCallback、_spheroidComponentRef、_splitJoinThresholdFactor、_style、_tileMatrixSet、_tileMatrixSetIdentifier、_tileUrl、_tilesLoadedPromise、_transitionsCompleteCallback；返回 无显式返回。
- `getEndPoint()` [源码:36](../../eyes/src/engine/components/WMTSComponent.js#L36)：当前操作：写入 无直接字段写入；返回 this._endPoint。
- `setEndPoint(endPoint)` [源码:39](../../eyes/src/engine/components/WMTSComponent.js#L39)：当前操作：写入 _endPoint；返回 无显式返回。
- `getLayer()` [源码:43](../../eyes/src/engine/components/WMTSComponent.js#L43)：当前操作：写入 无直接字段写入；返回 this._layerIdentifier。
- `setLayer(layerIdentifier)` [源码:46](../../eyes/src/engine/components/WMTSComponent.js#L46)：当前操作：写入 _layerIdentifier；返回 无显式返回。
- `getTileMatrixSet()` [源码:50](../../eyes/src/engine/components/WMTSComponent.js#L50)：当前操作：写入 无直接字段写入；返回 this._tileMatrixSetIdentifier。
- `setTileMatrixSet(tileMatrixSetIdentifier)` [源码:53](../../eyes/src/engine/components/WMTSComponent.js#L53)：当前操作：写入 _tileMatrixSetIdentifier；返回 无显式返回。
- `getStyle()` [源码:57](../../eyes/src/engine/components/WMTSComponent.js#L57)：当前操作：写入 无直接字段写入；返回 this._style。
- `setStyle(style)` [源码:60](../../eyes/src/engine/components/WMTSComponent.js#L60)：当前操作：写入 _style；返回 无显式返回。
- `getDimensionValue(dimensionName)` [源码:64](../../eyes/src/engine/components/WMTSComponent.js#L64)：当前操作：写入 无直接字段写入；返回 this._dimensionValues.get(dimensionName)。
- `setDimensionValue(dimensionName, dimensionValue)` [源码:67](../../eyes/src/engine/components/WMTSComponent.js#L67)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getLayers()` [源码:71](../../eyes/src/engine/components/WMTSComponent.js#L71)：当前操作：写入 无直接字段写入；返回 null!==this._capabilities?this._capabilities.layers:new Map()。
- `getMinLevel()` [源码:74](../../eyes/src/engine/components/WMTSComponent.js#L74)：当前操作：写入 无直接字段写入；返回 this._minLevel。
- `setMinLevel(minLevel)` [源码:77](../../eyes/src/engine/components/WMTSComponent.js#L77)：当前操作：写入 _minLevel；返回 无显式返回。
- `getMaxLevel()` [源码:80](../../eyes/src/engine/components/WMTSComponent.js#L80)：当前操作：写入 无直接字段写入；返回 this._maxLevel。
- `setMaxLevel(maxLevel)` [源码:83](../../eyes/src/engine/components/WMTSComponent.js#L83)：当前操作：写入 _maxLevel；返回 无显式返回。
- `isMaterialOptionEnabled(option)` [源码:86](../../eyes/src/engine/components/WMTSComponent.js#L86)：当前操作：写入 无直接字段写入；返回 this._materialOptions.has(option)。
- `setMaterialOption(option, enabled)` [源码:89](../../eyes/src/engine/components/WMTSComponent.js#L89)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getTilesLoadedPromise()` [源码:107](../../eyes/src/engine/components/WMTSComponent.js#L107)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setSpheroidReference(componentName)` [源码:112](../../eyes/src/engine/components/WMTSComponent.js#L112)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__getLayer()` [源码:115](../../eyes/src/engine/components/WMTSComponent.js#L115)：当前操作：写入 无直接字段写入；返回 this._layer。
- `__getTileMatrixSet()` [源码:118](../../eyes/src/engine/components/WMTSComponent.js#L118)：当前操作：写入 无直接字段写入；返回 this._tileMatrixSet。
- `__getTileUrl()` [源码:121](../../eyes/src/engine/components/WMTSComponent.js#L121)：当前操作：写入 无直接字段写入；返回 this._tileUrl。
- `__getMaxLevel()` [源码:124](../../eyes/src/engine/components/WMTSComponent.js#L124)：当前操作：写入 无直接字段写入；返回 this._maxLevel。
- `__getMinLevel()` [源码:127](../../eyes/src/engine/components/WMTSComponent.js#L127)：当前操作：写入 无直接字段写入；返回 this._minLevel。
- `__getSplitJoinFactor()` [源码:130](../../eyes/src/engine/components/WMTSComponent.js#L130)：当前操作：写入 无直接字段写入；返回 this._splitJoinThresholdFactor。
- `__getLoadsThisFrame()` [源码:133](../../eyes/src/engine/components/WMTSComponent.js#L133)：当前操作：写入 无直接字段写入；返回 this._loadsThisFrame。
- `__incLoadsThisFrame()` [源码:136](../../eyes/src/engine/components/WMTSComponent.js#L136)：当前操作：写入 _loadsThisFrame；返回 无显式返回。
- `__getCameraPositions()` [源码:139](../../eyes/src/engine/components/WMTSComponent.js#L139)：当前操作：写入 无直接字段写入；返回 this._cameraPositions。
- `__getCameraFieldsOfView()` [源码:142](../../eyes/src/engine/components/WMTSComponent.js#L142)：当前操作：写入 无直接字段写入；返回 this._cameraFieldsOfView。
- `__getSpheroidComponent()` [源码:145](../../eyes/src/engine/components/WMTSComponent.js#L145)：当前操作：写入 无直接字段写入；返回 this._spheroidComponentRef.get()。
- `__getMaterialOptions()` [源码:148](../../eyes/src/engine/components/WMTSComponent.js#L148)：当前操作：写入 无直接字段写入；返回 this._materialOptions。
- `__addLoadedTile(tile)` [源码:151](../../eyes/src/engine/components/WMTSComponent.js#L151)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__removeLoadedTile(tile)` [源码:154](../../eyes/src/engine/components/WMTSComponent.js#L154)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__destroy()` [源码:157](../../eyes/src/engine/components/WMTSComponent.js#L157)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:164](../../eyes/src/engine/components/WMTSComponent.js#L164)：当前操作：写入 _cameraFieldsOfView[viewportIndex]、_loadsThisFrame、_tilesLoadedPromise、_transitionsCompleteCallback；返回 void。
- `__prepareForRender(camera)` [源码:200](../../eyes/src/engine/components/WMTSComponent.js#L200)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__loadResources()` [源码:207](../../eyes/src/engine/components/WMTSComponent.js#L207)：当前操作：写入 _capabilities、_layer、_rootTile、_tileMatrixSet、_tileUrl；返回 void(this._capabilities=null)、void、void(this._layer=null)。
- `__unloadResources()` [源码:258](../../eyes/src/engine/components/WMTSComponent.js#L258)：当前操作：写入 _capabilities、_layer、_rootTile、_tileMatrixSet、_tileUrl；返回 无显式返回。
- `_spheroidRefChangedCallback(previousSpheroid, nextSpheroid)` [源码:268](../../eyes/src/engine/components/WMTSComponent.js#L268)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_spheroidChangedCallback()` [源码:277](../../eyes/src/engine/components/WMTSComponent.js#L277)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `WMTSTile`

层级 −1 是无纹理虚根；子块 row 向下、CRS y 向上。真实瓦片固定 21×21 网格，范围截到图层边界，资源由 component 作为 acquire/release 所有者。。父类 `Pioneer.Tile`。

- `constructor(component, parentTile, level, row, col, tileBounds)` [源码:313](../../eyes/src/engine/components/WMTSComponent.js#L313)：当前操作：写入 _center、_col、_component、_level、_radius、_row、_threeJsMaterial、_threeJsObject、_tileBounds、_visible；返回 无显式返回。
- `createNewTile(parentTile, childRow, childColumn)` [源码:329](../../eyes/src/engine/components/WMTSComponent.js#L329)：当前操作：写入 无直接字段写入；返回 null、new WMTSTile(parentTile._component,parentTile,childLevel,row,column,childBounds)。
- `checkSplit()` [源码:342](../../eyes/src/engine/components/WMTSComponent.js#L342)：当前操作：写入 无直接字段写入；返回 false、!(!matrixBounds\|\|!this._tileBounds.intersects(matrixBounds))&&!(this._level>=this._component.__getMaxLevel())&&!(this._component.__getLoadsThisFrame()>=4)&&(this._level<this._component.__getMinLevel()\|\|-1===this._level\|\|。
- `checkJoin()` [源码:348](../../eyes/src/engine/components/WMTSComponent.js#L348)：当前操作：写入 无直接字段写入；返回 false、true、!!matrixSet&&this._getNearestDistance()>this._component.__getSplitJoinFactor()*this._radius*4/matrixSet.maxPixelSize。
- `load()` [源码:357](../../eyes/src/engine/components/WMTSComponent.js#L357)：纹理失败回退 gray；await 后若已销毁，移除并销毁材质且 release 纹理，不建立网格。CRS 坐标夹紧后同步修正 UV。
- `unload()` [源码:466](../../eyes/src/engine/components/WMTSComponent.js#L466)：当前操作：写入 _threeJsMaterial、_threeJsObject；返回 void。
- `prepareForRender()` [源码:496](../../eyes/src/engine/components/WMTSComponent.js#L496)：当前操作：写入 _threeJsObject.visible；返回 无显式返回。
- `setVisible(visible)` [源码:501](../../eyes/src/engine/components/WMTSComponent.js#L501)：当前操作：写入 _threeJsObject.visible、_visible；返回 无显式返回。
- `update()` [源码:507](../../eyes/src/engine/components/WMTSComponent.js#L507)：当前操作：写入 无直接字段写入；返回 transitionsActive。
- `_getNearestDistance()` [源码:513](../../eyes/src/engine/components/WMTSComponent.js#L513)：当前操作：写入 无直接字段写入；返回 nearestProjectedDistance。
- `toString()` [源码:530](../../eyes/src/engine/components/WMTSComponent.js#L530)：当前操作：写入 无直接字段写入；返回 ˋ${this._level}-${this._row}-${this._col}ˋ。

## `eyes/src/engine/controllers/AlignController.js`

依据主/次轴和目标的点向、速度或轴向约束计算实体姿态，并登记目标状态依赖。。[源码](../../eyes/src/engine/controllers/AlignController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-AlignController-js)

### `AlignController`

先将主轴对齐，再绕已对齐主轴修正次轴；关节模式先合成祖先局部旋转并在输出时还原，依赖状态随目标引用变更迁移。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:6](../../eyes/src/engine/controllers/AlignController.js#L6)：当前操作：写入 _joint、_jointObject、_model、_modelRootId、_primaryAlignType、_primaryAxis、_primaryTargetAxis、_primaryTargetEntity、_secondaryAlignType、_secondaryAxis、_secondaryTargetAxis、_secondaryTargetEntity；返回 无显式返回。
- `getPrimaryAlignType()` [源码:38](../../eyes/src/engine/controllers/AlignController.js#L38)：当前操作：写入 无直接字段写入；返回 this._primaryAlignType。
- `setPrimaryAlignType(primaryAlignType)` [源码:41](../../eyes/src/engine/controllers/AlignController.js#L41)：当前操作：写入 _primaryAlignType；返回 void。
- `getPrimaryAxis()` [源码:52](../../eyes/src/engine/controllers/AlignController.js#L52)：当前操作：写入 无直接字段写入；返回 this._primaryAxis。
- `setPrimaryAxis(primaryAxis)` [源码:55](../../eyes/src/engine/controllers/AlignController.js#L55)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getPrimaryTargetEntity()` [源码:58](../../eyes/src/engine/controllers/AlignController.js#L58)：当前操作：写入 无直接字段写入；返回 this._primaryTargetEntity.getName()。
- `setPrimaryTargetEntity(entityName)` [源码:61](../../eyes/src/engine/controllers/AlignController.js#L61)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getPrimaryTargetAxis()` [源码:64](../../eyes/src/engine/controllers/AlignController.js#L64)：当前操作：写入 无直接字段写入；返回 this._primaryTargetAxis。
- `setPrimaryTargetAxis(primaryTargetAxis)` [源码:67](../../eyes/src/engine/controllers/AlignController.js#L67)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getSecondaryAlignType()` [源码:70](../../eyes/src/engine/controllers/AlignController.js#L70)：当前操作：写入 无直接字段写入；返回 this._secondaryAlignType。
- `setSecondaryAlignType(secondaryAlignType)` [源码:73](../../eyes/src/engine/controllers/AlignController.js#L73)：当前操作：写入 _secondaryAlignType；返回 void。
- `getSecondaryAxis()` [源码:84](../../eyes/src/engine/controllers/AlignController.js#L84)：当前操作：写入 无直接字段写入；返回 this._secondaryAxis。
- `setSecondaryAxis(secondaryAxis)` [源码:87](../../eyes/src/engine/controllers/AlignController.js#L87)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getSecondaryTargetEntity()` [源码:90](../../eyes/src/engine/controllers/AlignController.js#L90)：当前操作：写入 无直接字段写入；返回 this._secondaryTargetEntity.getName()。
- `setSecondaryTargetEntity(entityName)` [源码:93](../../eyes/src/engine/controllers/AlignController.js#L93)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getSecondaryTargetAxis()` [源码:96](../../eyes/src/engine/controllers/AlignController.js#L96)：当前操作：写入 无直接字段写入；返回 this._secondaryTargetAxis。
- `setSecondaryTargetAxis(secondaryTargetAxis)` [源码:99](../../eyes/src/engine/controllers/AlignController.js#L99)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setJoint(joint, model)` [源码:102](../../eyes/src/engine/controllers/AlignController.js#L102)：当前操作：写入 _joint、_model；返回 无显式返回。
- `__updateOrientationAtTime(orientationOut, time)` [源码:118](../../eyes/src/engine/controllers/AlignController.js#L118)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:123](../../eyes/src/engine/controllers/AlignController.js#L123)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getOrientation(orientationOut, time)` [源码:136](../../eyes/src/engine/controllers/AlignController.js#L136)：当前操作：写入 _jointObject、_modelRootId；返回 void、void PioneerPublicApi.Quaternion.pool.release(jointParentOrientation)。
- `_getAxis(axisOut, alignType, targetRef, targetAxis, fallbackAxis, time)` [源码:209](../../eyes/src/engine/controllers/AlignController.js#L209)：当前操作：写入 无直接字段写入；返回 void axisOut.copy(PioneerPublicApi.Vector3.NaN)。
- `_removeDependentStates(targetEntity, alignType)` [源码:230](../../eyes/src/engine/controllers/AlignController.js#L230)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_addDependentStates(targetEntity, alignType)` [源码:248](../../eyes/src/engine/controllers/AlignController.js#L248)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/controllers/BaseController.js`

向场景依赖图登记控制器，声明覆盖时间、被修改状态与所依赖实体状态。。[源码](../../eyes/src/engine/controllers/BaseController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-BaseController-js)

### `BaseController`

控制器构造时加入场景依赖图、销毁时移除；modifiedStates 描述写入，dependentStates 描述跨实体读取依赖。 控制器在依赖图登记修改与依赖状态；位置或姿态修改集合变化时更新实体覆盖。时间查询钩子原地写入调用者输出。。父类 `PioneerPublicApi.EntityItem`。

- `constructor(controllerName, entity)` [源码:7](../../eyes/src/engine/controllers/BaseController.js#L7)：当前操作：写入 _coverage、_dependentStates、_modifiedStates；返回 无显式返回。
- `__destroy()` [源码:14](../../eyes/src/engine/controllers/BaseController.js#L14)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addModifiedState(stateName)` [源码:19](../../eyes/src/engine/controllers/BaseController.js#L19)：仅新增状态才触发重排；位置或朝向写入还会改变实体覆盖区间。
- `removeModifiedState(stateName)` [源码:28](../../eyes/src/engine/controllers/BaseController.js#L28)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hasModifiedState(stateName)` [源码:36](../../eyes/src/engine/controllers/BaseController.js#L36)：当前操作：写入 无直接字段写入；返回 this._modifiedStates.has(stateName)。
- `addDependentState(entityName, stateName)` [源码:39](../../eyes/src/engine/controllers/BaseController.js#L39)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeDependentState(entityName, stateName)` [源码:45](../../eyes/src/engine/controllers/BaseController.js#L45)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hasDependentState(entityName, stateName)` [源码:50](../../eyes/src/engine/controllers/BaseController.js#L50)：当前操作：写入 无直接字段写入；返回 this._dependentStates.has(ˋ${entityName}.${stateName}ˋ)。
- `__getModifiedStates()` [源码:53](../../eyes/src/engine/controllers/BaseController.js#L53)：当前操作：写入 无直接字段写入；返回 this._modifiedStates。
- `getCoverage()` [源码:56](../../eyes/src/engine/controllers/BaseController.js#L56)：当前操作：写入 无直接字段写入；返回 this._coverage。
- `setCoverage(coverage)` [源码:59](../../eyes/src/engine/controllers/BaseController.js#L59)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updatePositionAtTime(output, time)` [源码:64](../../eyes/src/engine/controllers/BaseController.js#L64)：时间采样钩子由派生控制器填充 output；基类保持空实现，不承诺所有控制器均支持历史采样。
- `__updateVelocityAtTime(output, time)` [源码:65](../../eyes/src/engine/controllers/BaseController.js#L65)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateOrientationAtTime(output, time)` [源码:66](../../eyes/src/engine/controllers/BaseController.js#L66)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toString()` [源码:67](../../eyes/src/engine/controllers/BaseController.js#L67)：当前操作：写入 无直接字段写入；返回 ˋ${this.getEntity().getName()}.${this.constructor.name}.${classIndex}ˋ。

## `eyes/src/engine/controllers/CoverageController.js`

在时间覆盖进入/退出与更新时调用用户函数，管理更新间隔。。[源码](../../eyes/src/engine/controllers/CoverageController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-CoverageController-js)

### `CoverageController`

coverage 使用场景时间，更新节流使用 Date.now 毫秒；同类首控制器先执行全部离开回调，再执行当前进入及更新回调。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:6](../../eyes/src/engine/controllers/CoverageController.js#L6)：当前操作：写入 active、coverage、enterFunction、exitFunction、lastUpdateTime、updateFunction、updateInterval；返回 无显式返回。
- `setCoverage(coverage)` [源码:16](../../eyes/src/engine/controllers/CoverageController.js#L16)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setEnterFunction(enterFunction)` [源码:19](../../eyes/src/engine/controllers/CoverageController.js#L19)：当前操作：写入 enterFunction；返回 无显式返回。
- `setExitFunction(exitFunction)` [源码:22](../../eyes/src/engine/controllers/CoverageController.js#L22)：当前操作：写入 exitFunction；返回 无显式返回。
- `setUpdateFunction(updateFunction)` [源码:25](../../eyes/src/engine/controllers/CoverageController.js#L25)：当前操作：写入 updateFunction；返回 无显式返回。
- `setUpdateInterval(seconds)` [源码:28](../../eyes/src/engine/controllers/CoverageController.js#L28)：当前操作：写入 updateInterval；返回 无显式返回。
- `__update()` [源码:31](../../eyes/src/engine/controllers/CoverageController.js#L31)：当前操作：写入 active、lastUpdateTime；返回 无显式返回。

## `eyes/src/engine/controllers/DynamoController.js`

读取 Dynamo v1/v2 定义与分层时间块，按五类样本插值驱动实体运动和姿态。。[源码](../../eyes/src/engine/controllers/DynamoController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-DynamoController-js)

### `Point`

样本时间来自文件的 Float64；calculate 的输出对象由控制器复用，不改写端点样本。。父类 `无`。

- `constructor()` [源码:6](../../eyes/src/engine/controllers/DynamoController.js#L6)：当前操作：写入 time；返回 无显式返回。
- `load(reader)` [源码:9](../../eyes/src/engine/controllers/DynamoController.js#L9)：当前操作：写入 time；返回 无显式返回。
- `calculate(samples, time, header, incremental)` [源码:12](../../eyes/src/engine/controllers/DynamoController.js#L12)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `apply(entity)` [源码:13](../../eyes/src/engine/controllers/DynamoController.js#L13)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setNaN(entity)` [源码:14](../../eyes/src/engine/controllers/DynamoController.js#L14)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static readHeader(reader)` [源码:15](../../eyes/src/engine/controllers/DynamoController.js#L15)：当前操作：写入 无直接字段写入；返回 {}。

### `PosPoint`

三次 Hermite 插值同时使用两端位置和速度；速度为同一多项式对时间的导数，比例不截断，因此允许外推。。父类 `Point`。

- `constructor()` [源码:23](../../eyes/src/engine/controllers/DynamoController.js#L23)：当前操作：写入 position、velocity；返回 无显式返回。
- `load(reader)` [源码:29](../../eyes/src/engine/controllers/DynamoController.js#L29)：记录为 time、position.xyz、velocity.xyz，共七个 Float64（56 字节）；各分量沿文件顺序读取。
- `calculate(samples, time, header, incremental)` [源码:34](../../eyes/src/engine/controllers/DynamoController.js#L34)：当前操作：写入 time；返回 无显式返回。
- `apply(entity)` [源码:59](../../eyes/src/engine/controllers/DynamoController.js#L59)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setNaN(entity)` [源码:63](../../eyes/src/engine/controllers/DynamoController.js#L63)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static readHeader(reader)` [源码:67](../../eyes/src/engine/controllers/DynamoController.js#L67)：当前操作：写入 无直接字段写入；返回 {}。

### `LinPoint`

位置按截断比例线性混合，速度为整段割线；时间不递增时使用末端位置和零速度。。父类 `Point`。

- `constructor()` [源码:75](../../eyes/src/engine/controllers/DynamoController.js#L75)：当前操作：写入 position、velocity；返回 无显式返回。
- `load(reader)` [源码:81](../../eyes/src/engine/controllers/DynamoController.js#L81)：记录为 time、position.xyz，共四个 Float64（32 字节）；文件不携带速度。
- `calculate(samples, time, header, incremental)` [源码:86](../../eyes/src/engine/controllers/DynamoController.js#L86)：当前操作：写入 time；返回 无显式返回。
- `apply(entity)` [源码:98](../../eyes/src/engine/controllers/DynamoController.js#L98)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setNaN(entity)` [源码:102](../../eyes/src/engine/controllers/DynamoController.js#L102)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static readHeader(reader)` [源码:106](../../eyes/src/engine/controllers/DynamoController.js#L106)：当前操作：写入 无直接字段写入；返回 {}。

### `OriPoint`

先按各端点角速度传播到查询时间，再球面混合姿态；临时四元数和向量均归还对象池。。父类 `Point`。

- `constructor()` [源码:114](../../eyes/src/engine/controllers/DynamoController.js#L114)：当前操作：写入 angularVelocity、orientation；返回 无显式返回。
- `load(reader)` [源码:120](../../eyes/src/engine/controllers/DynamoController.js#L120)：记录为 time、四元数四分量、angularVelocity.xyz，共八个 Float64（64 字节）；四元数顺序沿构造器约定。
- `calculate(samples, time, header, incremental)` [源码:125](../../eyes/src/engine/controllers/DynamoController.js#L125)：当前操作：写入 time；返回 无显式返回。
- `apply(entity)` [源码:139](../../eyes/src/engine/controllers/DynamoController.js#L139)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_project(orientationOut, time, incremental)` [源码:144](../../eyes/src/engine/controllers/DynamoController.js#L144)：角速度模长乘时间差得到轴角（弧度）；增量模式依赖调用者给定的输出初态，临时旋转从对象池借还。
- `setNaN(entity)` [源码:158](../../eyes/src/engine/controllers/DynamoController.js#L158)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static readHeader(reader)` [源码:162](../../eyes/src/engine/controllers/DynamoController.js#L162)：当前操作：写入 无直接字段写入；返回 {}。

### `QuatPoint`

仅对姿态样本做截断球面混合；应用到实体时角速度固定为零。。父类 `Point`。

- `constructor()` [源码:170](../../eyes/src/engine/controllers/DynamoController.js#L170)：当前操作：写入 angularVelocity、orientation；返回 无显式返回。
- `load(reader)` [源码:176](../../eyes/src/engine/controllers/DynamoController.js#L176)：记录为 time 和四元数四分量，共五个 Float64（40 字节）。
- `calculate(samples, time, header, incremental)` [源码:180](../../eyes/src/engine/controllers/DynamoController.js#L180)：当前操作：写入 time；返回 无显式返回。
- `apply(entity)` [源码:185](../../eyes/src/engine/controllers/DynamoController.js#L185)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setNaN(entity)` [源码:189](../../eyes/src/engine/controllers/DynamoController.js#L189)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static readHeader(reader)` [源码:193](../../eyes/src/engine/controllers/DynamoController.js#L193)：当前操作：写入 无直接字段写入；返回 {}。

### `OrbPoint`

两个轨道样本各自传播到同一时刻，再混合位置和速度；body 选择按引力参数比例缩放到质心参考系。。父类 `Point`。

- `constructor()` [源码:202](../../eyes/src/engine/controllers/DynamoController.js#L202)：当前操作：写入 oe、position、velocity；返回 无显式返回。
- `load(reader)` [源码:209](../../eyes/src/engine/controllers/DynamoController.js#L209)：记录为 time、a、e、n、M0、轨道四元数，共九个 Float64（72 字节）；样本时间同时作为轨道历元。
- `calculate(samples, time, header, incremental)` [源码:218](../../eyes/src/engine/controllers/DynamoController.js#L218)：当前操作：写入 oe.epoch、time；返回 无显式返回。
- `apply(entity)` [源码:235](../../eyes/src/engine/controllers/DynamoController.js#L235)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_project(positionOut, velocityOut, time, header, incremental)` [源码:240](../../eyes/src/engine/controllers/DynamoController.js#L240)：body=1/2 分别给相对轨道乘 μ2/(μ1+μ2) 或 −μ1/(μ1+μ2)；增量模式只累加位置，速度仍覆盖写入。
- `setNaN(entity)` [源码:261](../../eyes/src/engine/controllers/DynamoController.js#L261)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static readHeader(reader)` [源码:265](../../eyes/src/engine/controllers/DynamoController.js#L265)：当前操作：写入 无直接字段写入；返回 {gravitationalParameter1:reader.readFloat64(),gravitationalParameter2:reader.readFloat64()}。

### `PointSet`

块可包含样本或下级块。v1 索引存每段起止时间，v2 存连续边界并丢弃末尾哨兵；缓存索引先尝试相邻段再二分。。父类 `无`。

- `constructor(PointClass, version, numberOfDigits, name)` [源码:274](../../eyes/src/engine/controllers/DynamoController.js#L274)：当前操作：写入 _PointClass、_accessedTime、_hintIndex、_interval、_loadedState、_name、_numberOfDigits、_pointSets、_points、_version；返回 无显式返回。
- `getName()` [源码:286](../../eyes/src/engine/controllers/DynamoController.js#L286)：当前操作：写入 无直接字段写入；返回 this._name。
- `getInterval()` [源码:289](../../eyes/src/engine/controllers/DynamoController.js#L289)：当前操作：写入 无直接字段写入；返回 this._interval。
- `getLoadedState()` [源码:292](../../eyes/src/engine/controllers/DynamoController.js#L292)：当前操作：写入 无直接字段写入；返回 this._loadedState。
- `getLoadedTime()` [源码:295](../../eyes/src/engine/controllers/DynamoController.js#L295)：当前操作：写入 无直接字段写入；返回 this._accessedTime。
- `hasPointSets()` [源码:298](../../eyes/src/engine/controllers/DynamoController.js#L298)：当前操作：写入 无直接字段写入；返回 0!==this._pointSets.length。
- `hasPoints()` [源码:301](../../eyes/src/engine/controllers/DynamoController.js#L301)：当前操作：写入 无直接字段写入；返回 0!==this._points.length。
- `load(reader)` [源码:305](../../eyes/src/engine/controllers/DynamoController.js#L305)：版本标记决定后续是样本还是下级索引；叶节点供插值时要求至少两点且时间有序。v2 最后一个边界只封闭前段，不对应文件。
- `loadFromUrl(downloader, baseUrl, priority, currentDownloads)` [源码:350](../../eyes/src/engine/controllers/DynamoController.js#L350)：下载集合用于控制器取消请求；finally 先移除 URL，再处理内容。取消不会被改成 FAILED，保持原生命周期。
- `unloadOldPointSet()` [源码:367](../../eyes/src/engine/controllers/DynamoController.js#L367)：每次最多卸载一个超过 15 秒未访问的已载入子树，避免单帧集中清理。
- `unload()` [源码:382](../../eyes/src/engine/controllers/DynamoController.js#L382)：当前操作：写入 _accessedTime、_loadedState、_pointSets、_points；返回 无显式返回。
- `getPointSet(time)` [源码:389](../../eyes/src/engine/controllers/DynamoController.js#L389)：hint 命中后不移动；相邻命中只移动一格，否则以起始时间二分，保留原有越界查询行为。
- `getPoints(samplesOut, time)` [源码:415](../../eyes/src/engine/controllers/DynamoController.js#L415)：输出数组由调用者持有；空块清空两个槽。有序叶节点用左闭右开区间匹配，末端或外部时间由二分选择端段。

### `DynamoController`

场景查询时间减去 timeOffset 后才进入文件时间域；已公布覆盖区间反向加偏移。异步缺块时保留上次端点供每帧继续传播。。父类 `PioneerPublicApi.BaseController`。

- `constructor(name, entity)` [源码:462](../../eyes/src/engine/controllers/DynamoController.js#L462)：当前操作：写入 _PointClass、_baseUrl、_currentDownloads、_downloader、_header、_incremental、_lastPoints、_numberOfDigits、_pCalc、_pointSet、_pointType、_points、_timeOffset、_userCoverage、_version；返回 无显式返回。
- `getPointType()` [源码:483](../../eyes/src/engine/controllers/DynamoController.js#L483)：当前操作：写入 无直接字段写入；返回 this._pointType。
- `getHeaderValue(headerKey)` [源码:486](../../eyes/src/engine/controllers/DynamoController.js#L486)：当前操作：写入 无直接字段写入；返回 this._header[headerKey]。
- `setHeaderValue(headerKey, value)` [源码:489](../../eyes/src/engine/controllers/DynamoController.js#L489)：当前操作：写入 _header[headerKey]；返回 无显式返回。
- `isIncremental()` [源码:492](../../eyes/src/engine/controllers/DynamoController.js#L492)：当前操作：写入 无直接字段写入；返回 this._incremental。
- `setIncremental(incremental)` [源码:495](../../eyes/src/engine/controllers/DynamoController.js#L495)：当前操作：写入 _incremental；返回 无显式返回。
- `getBaseUrl()` [源码:498](../../eyes/src/engine/controllers/DynamoController.js#L498)：当前操作：写入 无直接字段写入；返回 this._baseUrl。
- `setBaseUrl(baseUrl)` [源码:502](../../eyes/src/engine/controllers/DynamoController.js#L502)：取消集合中的现有请求并清除旧类型状态后载入定义；保留原有异步流程，不新增世代令牌。
- `getTimeOffset()` [源码:519](../../eyes/src/engine/controllers/DynamoController.js#L519)：当前操作：写入 无直接字段写入；返回 this._timeOffset。
- `setTimeOffset(timeOffset)` [源码:523](../../eyes/src/engine/controllers/DynamoController.js#L523)：只按偏移差平移已发布 coverage；文件样本及其时间不变，查询路径会减去当前偏移。
- `setCoverage(coverage)` [源码:533](../../eyes/src/engine/controllers/DynamoController.js#L533)：用户覆盖与文件覆盖先取交，再加 timeOffset 发布到场景时间域；临时区间归还池。
- `getOrbitalElements(elementsOut, time)` [源码:547](../../eyes/src/engine/controllers/DynamoController.js#L547)：标量元素线性混合，平近点角跨周期混合，轨道姿态球面混合；这与传播后混合位置的 OrbPoint 路径不同。
- `getEccentricity(time)` [源码:571](../../eyes/src/engine/controllers/DynamoController.js#L571)：当前操作：写入 _lastPoints[0]、_lastPoints[1]；返回 PioneerPublicApi.MathUtils.lerp(this._lastPoints[0].oe.eccentricity,this._lastPoints[1].oe.eccentricity,fraction)、Number.NaN。
- `getSemiMajorAxis(time)` [源码:589](../../eyes/src/engine/controllers/DynamoController.js#L589)：当前操作：写入 _lastPoints[0]、_lastPoints[1]；返回 PioneerPublicApi.MathUtils.lerp(this._lastPoints[0].oe.semiMajorAxis,this._lastPoints[1].oe.semiMajorAxis,fraction)、Number.NaN。
- `getOrbitOrientation(orientationOut, time)` [源码:607](../../eyes/src/engine/controllers/DynamoController.js#L607)：当前操作：写入 _lastPoints[0]、_lastPoints[1]；返回 无显式返回。
- `__destroy()` [源码:624](../../eyes/src/engine/controllers/DynamoController.js#L624)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updatePositionAtTime(positionOut, time)` [源码:628](../../eyes/src/engine/controllers/DynamoController.js#L628)：当前操作：写入 无直接字段写入；返回 void。
- `__updateVelocityAtTime(velocityOut, time)` [源码:645](../../eyes/src/engine/controllers/DynamoController.js#L645)：当前操作：写入 无直接字段写入；返回 void。
- `__updateOrientationAtTime(orientationOut, time)` [源码:662](../../eyes/src/engine/controllers/DynamoController.js#L662)：当前操作：写入 无直接字段写入；返回 void。
- `__update()` [源码:680](../../eyes/src/engine/controllers/DynamoController.js#L680)：新块尚未可用时继续使用上次样本；根定义缺失时把实体状态设为 NaN。旧样本后备路径允许外推。
- `_loadDef()` [源码:703](../../eyes/src/engine/controllers/DynamoController.js#L703)：定义头只接受版本 1/2 与五种已知样本类型；v2 另含文件名补零位数，orb 类型另含两个引力参数。
- `_getPointsAtTime(samplesOut, time)` [源码:768](../../eyes/src/engine/controllers/DynamoController.js#L768)：逐层进入查询时间对应的块；缺块仅启动下载并清空输出，失败块触发根定义重载。

## `eyes/src/engine/controllers/FixedController.js`

把预设位置/速度/姿态写入实体，为固定参考系或表面点提供状态。。[源码](../../eyes/src/engine/controllers/FixedController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-FixedController-js)

### `FixedController`

非空固定值声明对应修改状态；位置固定时速度归零。查询在调用者输出上覆盖写入，空值不修改输出。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:6](../../eyes/src/engine/controllers/FixedController.js#L6)：当前操作：写入 _orientation、_position；返回 无显式返回。
- `getPosition()` [源码:11](../../eyes/src/engine/controllers/FixedController.js#L11)：当前操作：写入 无直接字段写入；返回 this._position。
- `setPosition(position)` [源码:14](../../eyes/src/engine/controllers/FixedController.js#L14)：当前操作：写入 _position；返回 无显式返回。
- `getOrientation()` [源码:29](../../eyes/src/engine/controllers/FixedController.js#L29)：当前操作：写入 无直接字段写入；返回 this._orientation。
- `setOrientation(orientation)` [源码:32](../../eyes/src/engine/controllers/FixedController.js#L32)：当前操作：写入 _orientation；返回 无显式返回。
- `__updatePositionAtTime(positionOut, time)` [源码:45](../../eyes/src/engine/controllers/FixedController.js#L45)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateVelocityAtTime(velocityOut, time)` [源码:50](../../eyes/src/engine/controllers/FixedController.js#L50)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateOrientationAtTime(orientationOut, time)` [源码:55](../../eyes/src/engine/controllers/FixedController.js#L55)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:60](../../eyes/src/engine/controllers/FixedController.js#L60)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/controllers/FixedToParentController.js`

按父实体状态维持相对固定的位置和姿态。。[源码](../../eyes/src/engine/controllers/FixedToParentController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-FixedToParentController-js)

### `FixedToParentController`

用上一父实体姿态到当前姿态的增量旋转位置与姿态；换父时先后转换位置参考系，最后更新缓存。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:6](../../eyes/src/engine/controllers/FixedToParentController.js#L6)：当前操作：写入 _lastParent、_lastParentOrientation；返回 无显式返回。
- `__update()` [源码:18](../../eyes/src/engine/controllers/FixedToParentController.js#L18)：当前操作：写入 _lastParent；返回 void(this._lastParent=lastParent)。

## `eyes/src/engine/controllers/FreeFlyController.js`

将键盘/指针输入转换为自由飞行相机位移、俯仰与偏航。。[源码](../../eyes/src/engine/controllers/FreeFlyController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-FreeFlyController-js)

### `FreeFlyController`

每帧最多扫描 20 个实体寻找最近表面距离；局部输入经平滑及实体姿态旋转后，按最近距离缩放到位置参考系。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:6](../../eyes/src/engine/controllers/FreeFlyController.js#L6)：当前操作：写入 _changeParentToNearestEntity、_dragSensitivity、_dragSmoothness、_forcedMoving、_isMoving、_moveSmoothedValue、_nearestEntity、_nearestEntityCheckIndex、_nearestEntityDistance；返回 无显式返回。
- `getDragSensitivity()` [源码:21](../../eyes/src/engine/controllers/FreeFlyController.js#L21)：当前操作：写入 无直接字段写入；返回 this._dragSensitivity。
- `setDragSensitivity(dragSensitivity)` [源码:24](../../eyes/src/engine/controllers/FreeFlyController.js#L24)：当前操作：写入 _dragSensitivity；返回 无显式返回。
- `getDragSmoothness()` [源码:27](../../eyes/src/engine/controllers/FreeFlyController.js#L27)：当前操作：写入 无直接字段写入；返回 this._dragSmoothness。
- `setDragSmoothness(dragSmoothness)` [源码:30](../../eyes/src/engine/controllers/FreeFlyController.js#L30)：当前操作：写入 _dragSmoothness；返回 无显式返回。
- `getChangeParentToNearestEntity()` [源码:33](../../eyes/src/engine/controllers/FreeFlyController.js#L33)：当前操作：写入 无直接字段写入；返回 this._changeParentToNearestEntity。
- `setChangeParentToNearestEntity(changeParentToNearestEntity)` [源码:36](../../eyes/src/engine/controllers/FreeFlyController.js#L36)：当前操作：写入 _changeParentToNearestEntity；返回 无显式返回。
- `getForcedMoving()` [源码:39](../../eyes/src/engine/controllers/FreeFlyController.js#L39)：当前操作：写入 无直接字段写入；返回 this._forcedMoving。
- `setForcedMoving(forcedMoving)` [源码:42](../../eyes/src/engine/controllers/FreeFlyController.js#L42)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:45](../../eyes/src/engine/controllers/FreeFlyController.js#L45)：当前操作：写入 _isMoving、_nearestEntity、_nearestEntityCheckIndex、_nearestEntityDistance；返回 void。

## `eyes/src/engine/controllers/GroundClampController.js`

引用地面组件查询地表位置，把实体位置限制到表面/给定高度。。[源码](../../eyes/src/engine/controllers/GroundClampController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-GroundClampController-js)

### `GroundClampController`

沿指定地面实体祖先寻找 ground；位置与 up 先转入地面局部系，按法线偏移后再转换回父参考系。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:6](../../eyes/src/engine/controllers/GroundClampController.js#L6)：当前操作：写入 _clampOnlyIfBelow、_distanceFromGround、_groundEntityRef、_up；返回 无显式返回。
- `setGroundEntityRef(entityName)` [源码:14](../../eyes/src/engine/controllers/GroundClampController.js#L14)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getDistanceFromGround()` [源码:21](../../eyes/src/engine/controllers/GroundClampController.js#L21)：当前操作：写入 无直接字段写入；返回 this._distanceFromGround。
- `setDistanceFromGround(distanceFromGround)` [源码:24](../../eyes/src/engine/controllers/GroundClampController.js#L24)：当前操作：写入 _distanceFromGround；返回 无显式返回。
- `getUp()` [源码:27](../../eyes/src/engine/controllers/GroundClampController.js#L27)：当前操作：写入 无直接字段写入；返回 this._up。
- `setUp(upVector)` [源码:30](../../eyes/src/engine/controllers/GroundClampController.js#L30)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getClampOnlyIfBelow()` [源码:33](../../eyes/src/engine/controllers/GroundClampController.js#L33)：当前操作：写入 无直接字段写入；返回 this._clampOnlyIfBelow。
- `setClampOnlyIfBelow(clampOnlyIfBelow)` [源码:36](../../eyes/src/engine/controllers/GroundClampController.js#L36)：当前操作：写入 _clampOnlyIfBelow；返回 无显式返回。
- `__updatePositionAtTime(positionOut, time)` [源码:39](../../eyes/src/engine/controllers/GroundClampController.js#L39)：当前操作：写入 无直接字段写入；返回 void。
- `__update()` [源码:80](../../eyes/src/engine/controllers/GroundClampController.js#L80)：当前操作：写入 无直接字段写入；返回 void。

## `eyes/src/engine/controllers/KeyframeController.js`

管理以时间排序的关键帧和插值区间，作为具体动画控制器基础。。[源码](../../eyes/src/engine/controllers/KeyframeController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-KeyframeController-js)

### `KeyframeController`

位置使用相邻关键帧及邻域切线做 Hermite，速度为导数除时间跨度；姿态用 slerp。实时模式以首次更新的墙钟秒为零点。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:6](../../eyes/src/engine/controllers/KeyframeController.js#L6)：当前操作：写入 _newOrientation、_newPosition、_newVelocity、_orientation0、_orientation1、_orientationKeyframes、_position0、_position1、_positionKeyframes、_tangent0、_tangent1、_tempA、_tempB、_timeOfFirstUpdate、_timesAreRealTime；返回 无显式返回。
- `addPositionKeyframe(time, position, positionReferenceName, positionReferenceTime, orientationReferenceName, orientationReferenceTime)` [源码:25](../../eyes/src/engine/controllers/KeyframeController.js#L25)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removePositionKeyframe(time)` [源码:42](../../eyes/src/engine/controllers/KeyframeController.js#L42)：当前操作：写入 无直接字段写入；返回 removed。
- `addOrientationKeyframe(time, orientation, orientationReferenceName, orientationReferenceTime)` [源码:53](../../eyes/src/engine/controllers/KeyframeController.js#L53)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeOrientationKeyframe(time)` [源码:67](../../eyes/src/engine/controllers/KeyframeController.js#L67)：当前操作：写入 无直接字段写入；返回 removed。
- `areTimesRealTime()` [源码:77](../../eyes/src/engine/controllers/KeyframeController.js#L77)：当前操作：写入 无直接字段写入；返回 this._timesAreRealTime。
- `setTimesAreRealTime(timesAreRealTime)` [源码:80](../../eyes/src/engine/controllers/KeyframeController.js#L80)：当前操作：写入 _timesAreRealTime；返回 无显式返回。
- `__updatePositionAtTime(positionOut, time)` [源码:84](../../eyes/src/engine/controllers/KeyframeController.js#L84)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateVelocityAtTime(velocityOut, time)` [源码:87](../../eyes/src/engine/controllers/KeyframeController.js#L87)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateOrientationAtTime(orientationOut, time)` [源码:90](../../eyes/src/engine/controllers/KeyframeController.js#L90)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:93](../../eyes/src/engine/controllers/KeyframeController.js#L93)：当前操作：写入 _timeOfFirstUpdate；返回 无显式返回。
- `_getPositionAtTime(positionOut, time)` [源码:115](../../eyes/src/engine/controllers/KeyframeController.js#L115)：当前操作：写入 无直接字段写入；返回 true、false。
- `_getVelocityAtTime(velocityOut, time)` [源码:159](../../eyes/src/engine/controllers/KeyframeController.js#L159)：当前操作：写入 无直接字段写入；返回 true、false。
- `_getOrientationAtTime(orientationOut, time)` [源码:212](../../eyes/src/engine/controllers/KeyframeController.js#L212)：当前操作：写入 无直接字段写入；返回 true、false。
- `_getPositionOfKeyframe(positionOut, keyframe)` [源码:237](../../eyes/src/engine/controllers/KeyframeController.js#L237)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getOrientationOfKeyframe(orientationOut, keyframe)` [源码:262](../../eyes/src/engine/controllers/KeyframeController.js#L262)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateCoverage()` [源码:275](../../eyes/src/engine/controllers/KeyframeController.js#L275)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_cubicHermiteSpline(positionOut, startPosition, endPosition, startTangent, endTangent, fraction)` [源码:289](../../eyes/src/engine/controllers/KeyframeController.js#L289)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_cubicHermiteSplineDerivative(derivativeOut, startPosition, endPosition, startTangent, endTangent, fraction)` [源码:300](../../eyes/src/engine/controllers/KeyframeController.js#L300)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static isLessAdd(leftKeyframe, rightKeyframe)` [源码:310](../../eyes/src/engine/controllers/KeyframeController.js#L310)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static isLess(leftKeyframe, time)` [源码:311](../../eyes/src/engine/controllers/KeyframeController.js#L311)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static isEqualAdd(leftKeyframe, rightKeyframe)` [源码:312](../../eyes/src/engine/controllers/KeyframeController.js#L312)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static isEqual(leftKeyframe, time)` [源码:313](../../eyes/src/engine/controllers/KeyframeController.js#L313)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/controllers/KeyframePointingController.js`

按关键帧目标向量/姿态计算朝向。。[源码](../../eyes/src/engine/controllers/KeyframePointingController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-KeyframePointingController-js)

### `KeyframePointingController`

关键帧目标可为位置、速度或带负号方向；查询时先在同一时刻求两端方向，再球面混合并相对输入姿态旋转。。父类 `Pioneer.BaseController`。

- `constructor(controllerName, entity)` [源码:6](../../eyes/src/engine/controllers/KeyframePointingController.js#L6)：当前操作：写入 _direction、_keyframes；返回 无显式返回。
- `setKeyframes(keyframes)` [源码:12](../../eyes/src/engine/controllers/KeyframePointingController.js#L12)：当前操作：写入 _keyframes；返回 无显式返回。
- `setDirection(direction)` [源码:40](../../eyes/src/engine/controllers/KeyframePointingController.js#L40)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateOrientationAtTime(orientationOut, time)` [源码:43](../../eyes/src/engine/controllers/KeyframePointingController.js#L43)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:49](../../eyes/src/engine/controllers/KeyframePointingController.js#L49)：当前操作：写入 无直接字段写入；返回 void。
- `_getNewOrientation(orientationOut, time, initialOrientation)` [源码:61](../../eyes/src/engine/controllers/KeyframePointingController.js#L61)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getDirection(directionOut, time, targetName)` [源码:94](../../eyes/src/engine/controllers/KeyframePointingController.js#L94)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/controllers/KeyframeSpinController.js`

根据关键帧的转速/轴和时间生成连续自转姿态。。[源码](../../eyes/src/engine/controllers/KeyframeSpinController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-KeyframeSpinController-js)

### `KeyframeSpinController`

关键帧预积累梯形角位移，查询时按原公式积分并 wrap 到 2π；轴先由输入姿态转到参考系再左乘旋转。。父类 `Pioneer.BaseController`。

- `constructor(controllerName, entity)` [源码:6](../../eyes/src/engine/controllers/KeyframeSpinController.js#L6)：当前操作：写入 _axis、_keyframes、_startingAngle；返回 无显式返回。
- `setKeyframes(keyframes)` [源码:13](../../eyes/src/engine/controllers/KeyframeSpinController.js#L13)：当前操作：写入 _keyframes；返回 无显式返回。
- `setAxis(axis)` [源码:26](../../eyes/src/engine/controllers/KeyframeSpinController.js#L26)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setStartingAngle(startingAngle)` [源码:29](../../eyes/src/engine/controllers/KeyframeSpinController.js#L29)：当前操作：写入 _startingAngle；返回 无显式返回。
- `__updateOrientationAtTime(orientationOut, time)` [源码:32](../../eyes/src/engine/controllers/KeyframeSpinController.js#L32)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:38](../../eyes/src/engine/controllers/KeyframeSpinController.js#L38)：当前操作：写入 无直接字段写入；返回 void。
- `_getNewOrientation(orientationOut, time, initialOrientation)` [源码:50](../../eyes/src/engine/controllers/KeyframeSpinController.js#L50)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/controllers/LookController.js`

消费鼠标/触摸输入以改变相机观察方向。。[源码](../../eyes/src/engine/controllers/LookController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-LookController-js)

### `LookController`

只有活动视口相机消费拖动；平滑 yaw/pitch 后先校正 up，再绕局部 pitch 轴及指定 yaw 轴旋转，保持位置。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:6](../../eyes/src/engine/controllers/LookController.js#L6)：当前操作：写入 _dragSensitivity、_dragSmoothness、_pitchAngleSmoothedValue、_yawAngleSmoothedValue、_yawAxisEntity、_yawAxisType；返回 无显式返回。
- `getDragSensitivity()` [源码:16](../../eyes/src/engine/controllers/LookController.js#L16)：当前操作：写入 无直接字段写入；返回 this._dragSensitivity。
- `setDragSensitivity(dragSensitivity)` [源码:19](../../eyes/src/engine/controllers/LookController.js#L19)：当前操作：写入 _dragSensitivity；返回 无显式返回。
- `getDragSmoothness()` [源码:22](../../eyes/src/engine/controllers/LookController.js#L22)：当前操作：写入 无直接字段写入；返回 this._dragSmoothness。
- `setDragSmoothness(dragSmoothness)` [源码:25](../../eyes/src/engine/controllers/LookController.js#L25)：当前操作：写入 _dragSmoothness；返回 无显式返回。
- `getYawAxisType()` [源码:28](../../eyes/src/engine/controllers/LookController.js#L28)：当前操作：写入 无直接字段写入；返回 this._yawAxisType。
- `setYawAxisType(yawAxisType)` [源码:31](../../eyes/src/engine/controllers/LookController.js#L31)：当前操作：写入 _yawAxisType；返回 无显式返回。
- `getYawAxisEntity()` [源码:54](../../eyes/src/engine/controllers/LookController.js#L54)：当前操作：写入 无直接字段写入；返回 this._yawAxisEntity。
- `setYawAxisEntity(yawAxisEntity)` [源码:57](../../eyes/src/engine/controllers/LookController.js#L57)：当前操作：写入 _yawAxisEntity；返回 无显式返回。
- `__update()` [源码:80](../../eyes/src/engine/controllers/LookController.js#L80)：当前操作：写入 _pitchAngleSmoothedValue、_yawAngleSmoothedValue、_yawAxisEntity；返回 无显式返回。

## `eyes/src/engine/controllers/ModelAnimateController.js`

取得模型动画片段并通过 Three.js 动画混合器按仿真时间播放。。[源码](../../eyes/src/engine/controllers/ModelAnimateController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-ModelAnimateController-js)

### `ModelAnimateController`

场景时间映射到动画区间，模型根更换时重建 clip/joint/mixer 缓存；clip 时间保留末轨道采样数量修正。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:6](../../eyes/src/engine/controllers/ModelAnimateController.js#L6)：当前操作：写入 _animations；返回 无显式返回。
- `setAnimation(model, jointName, animationName, interval)` [源码:10](../../eyes/src/engine/controllers/ModelAnimateController.js#L10)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:23](../../eyes/src/engine/controllers/ModelAnimateController.js#L23)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/controllers/OrbitController.js`

围绕焦点实体维护距离、偏航、俯仰和上方向，处理鼠标/触摸轨道相机输入及约束。。[源码](../../eyes/src/engine/controllers/OrbitController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-OrbitController-js)

### `OrbitController`

拖动映射为经纬变化；构建 yaw/pitch 轴坐标架，在球面局部系应用角度限制，靠近地面时降低灵敏度后转回参考系。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:6](../../eyes/src/engine/controllers/OrbitController.js#L6)：当前操作：写入 _dragSensitivity、_dragSmoothness、_pitchAngleLimits、_pitchAxisEntity、_pitchAxisType、_pitchChangeSmoothedValue、_yawAngleLimits、_yawAxisEntity、_yawAxisType、_yawChangeSmoothedValue；返回 无显式返回。
- `getDragSensitivity()` [源码:21](../../eyes/src/engine/controllers/OrbitController.js#L21)：当前操作：写入 无直接字段写入；返回 this._dragSensitivity。
- `setDragSensitivity(dragSensitivity)` [源码:24](../../eyes/src/engine/controllers/OrbitController.js#L24)：当前操作：写入 _dragSensitivity；返回 无显式返回。
- `getDragSmoothness()` [源码:27](../../eyes/src/engine/controllers/OrbitController.js#L27)：当前操作：写入 无直接字段写入；返回 this._dragSmoothness。
- `setDragSmoothness(dragSmoothness)` [源码:30](../../eyes/src/engine/controllers/OrbitController.js#L30)：当前操作：写入 _dragSmoothness；返回 无显式返回。
- `getYawAxisType()` [源码:33](../../eyes/src/engine/controllers/OrbitController.js#L33)：当前操作：写入 无直接字段写入；返回 this._yawAxisType。
- `setYawAxisType(yawAxisType)` [源码:36](../../eyes/src/engine/controllers/OrbitController.js#L36)：当前操作：写入 _yawAxisType；返回 无显式返回。
- `getPitchAxisType()` [源码:59](../../eyes/src/engine/controllers/OrbitController.js#L59)：当前操作：写入 无直接字段写入；返回 this._pitchAxisType。
- `setPitchAxisType(pitchAxisType)` [源码:62](../../eyes/src/engine/controllers/OrbitController.js#L62)：当前操作：写入 _pitchAxisType；返回 无显式返回。
- `getYawAxisEntity()` [源码:85](../../eyes/src/engine/controllers/OrbitController.js#L85)：当前操作：写入 无直接字段写入；返回 this._yawAxisEntity。
- `setYawAxisEntity(yawAxisEntity)` [源码:88](../../eyes/src/engine/controllers/OrbitController.js#L88)：当前操作：写入 _yawAxisEntity；返回 无显式返回。
- `getPitchAxisEntity()` [源码:111](../../eyes/src/engine/controllers/OrbitController.js#L111)：当前操作：写入 无直接字段写入；返回 this._pitchAxisEntity。
- `setPitchAxisEntity(pitchAxisEntity)` [源码:114](../../eyes/src/engine/controllers/OrbitController.js#L114)：当前操作：写入 _pitchAxisEntity；返回 无显式返回。
- `getYawAngleLimits()` [源码:137](../../eyes/src/engine/controllers/OrbitController.js#L137)：当前操作：写入 无直接字段写入；返回 this._yawAngleLimits。
- `setYawAngleLimits(yawAngleLimits)` [源码:140](../../eyes/src/engine/controllers/OrbitController.js#L140)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getPitchAngleLimits()` [源码:143](../../eyes/src/engine/controllers/OrbitController.js#L143)：当前操作：写入 无直接字段写入；返回 this._pitchAngleLimits。
- `setPitchAngleLimits(pitchAngleLimits)` [源码:146](../../eyes/src/engine/controllers/OrbitController.js#L146)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:149](../../eyes/src/engine/controllers/OrbitController.js#L149)：当前操作：写入 _pitchAxisEntity、_pitchChangeSmoothedValue、_yawAxisEntity、_yawChangeSmoothedValue；返回 void。

## `eyes/src/engine/controllers/OrbitKeyframeController.js`

把位置、焦点和上方向关键帧组合成轨道相机的连续运动。。[源码](../../eyes/src/engine/controllers/OrbitKeyframeController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-OrbitKeyframeController-js)

### `OrbitKeyframeController`

墙钟秒驱动位置、focus、up 三条关键帧轨道；位置段中点切换父参考系，距离曲线与方向混合保留原缓动及完成 Promise。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:5](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L5)：当前操作：写入 _directionOfFirstUpdate、_endPromise、_focusKeyframes、_positionKeyframes、_rejectPromise、_resolvePromise、_timeOfFirstUpdate、_upKeyframes；返回 无显式返回。
- `setPositionKeyframe(time, position, referenceEntityName)` [源码:23](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L23)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setFocusKeyframe(time, focusEntityName)` [源码:37](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L37)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setUpKeyframe(time, upVector)` [源码:50](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L50)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getEndPromise()` [源码:63](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L63)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__destroy()` [源码:66](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L66)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:72](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L72)：当前操作：写入 _rejectPromise、_timeOfFirstUpdate；返回 void。
- `static isLess(leftKeyframe, rightKeyframe)` [源码:243](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L243)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static isLessThanTime(leftKeyframe, time)` [源码:244](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L244)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static isEqual(leftKeyframe, rightKeyframe)` [源码:245](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L245)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `Keyframe`

轨道相机关键帧基类。。父类 `无`。

- `constructor()` [源码:257](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L257)：当前操作：写入 time；返回 无显式返回。

### `PositionKeyframe`

轨道相机位置关键帧。。父类 `Keyframe`。

- `constructor(scene)` [源码:264](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L264)：当前操作：写入 position、relativeTo；返回 无显式返回。

### `FocusKeyframe`

轨道相机焦点关键帧。。父类 `Keyframe`。

- `constructor(scene)` [源码:272](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L272)：当前操作：写入 focus；返回 无显式返回。

### `UpKeyframe`

轨道相机上方向关键帧。。父类 `Keyframe`。

- `constructor()` [源码:279](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L279)：当前操作：写入 up；返回 无显式返回。

## `eyes/src/engine/controllers/OrbitalElementsController.js`

保存轨道元素关键帧，在指定时间传播位置/速度并在相邻元素之间混合。。[源码](../../eyes/src/engine/controllers/OrbitalElementsController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-OrbitalElementsController-js)

### `OrbitalElementsController`

将两端轨道分别传播到查询时间，再对位置和速度做向量 slerp；不是先插值轨道元素。所有临时向量归还池。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:6](../../eyes/src/engine/controllers/OrbitalElementsController.js#L6)：当前操作：写入 _orbitalElementsKeyframes；返回 无显式返回。
- `getNumOrbitalElements()` [源码:12](../../eyes/src/engine/controllers/OrbitalElementsController.js#L12)：当前操作：写入 无直接字段写入；返回 this._orbitalElementsKeyframes.length。
- `getOrbitalElements(index)` [源码:15](../../eyes/src/engine/controllers/OrbitalElementsController.js#L15)：当前操作：写入 无直接字段写入；返回 this._orbitalElementsKeyframes[index]。
- `addOrbitalElements(time, elements)` [源码:18](../../eyes/src/engine/controllers/OrbitalElementsController.js#L18)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeOrbitalElements(index)` [源码:25](../../eyes/src/engine/controllers/OrbitalElementsController.js#L25)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updatePositionAtTime(positionOut, time)` [源码:29](../../eyes/src/engine/controllers/OrbitalElementsController.js#L29)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateVelocityAtTime(velocityOut, time)` [源码:32](../../eyes/src/engine/controllers/OrbitalElementsController.js#L32)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:35](../../eyes/src/engine/controllers/OrbitalElementsController.js#L35)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getPositionAndVelocityAtTime(positionOut, velocityOut, time)` [源码:46](../../eyes/src/engine/controllers/OrbitalElementsController.js#L46)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static _isLessAdd(leftKeyframe, rightKeyframe)` [源码:68](../../eyes/src/engine/controllers/OrbitalElementsController.js#L68)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static _isLess(leftKeyframe, time)` [源码:69](../../eyes/src/engine/controllers/OrbitalElementsController.js#L69)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static _isEqualAdd(leftKeyframe, rightKeyframe)` [源码:70](../../eyes/src/engine/controllers/OrbitalElementsController.js#L70)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `OrbitalElementsKeyframe`

按时间索引的一组轨道元素。。父类 `无`。

- `constructor()` [源码:76](../../eyes/src/engine/controllers/OrbitalElementsController.js#L76)：当前操作：写入 oe、time；返回 无显式返回。

## `eyes/src/engine/controllers/PickController.js`

将输入点经相机射线投到实体表面并调用拾取回调。。[源码](../../eyes/src/engine/controllers/PickController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-PickController-js)

### `PickController`

将像素游标转相机射线；椭球先按赤极比缩放为球求交，再恢复方向，命中点转换到被拾取实体参考系后延迟回调。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:5](../../eyes/src/engine/controllers/PickController.js#L5)：当前操作：写入 _callback、_pickedEntity、_pickedPosition、_triggerOnHover；返回 无显式返回。
- `getPickedEntity()` [源码:12](../../eyes/src/engine/controllers/PickController.js#L12)：当前操作：写入 无直接字段写入；返回 this._pickedEntity。
- `setPickedEntity(pickedEntity)` [源码:15](../../eyes/src/engine/controllers/PickController.js#L15)：当前操作：写入 _pickedEntity；返回 无显式返回。
- `getCallback()` [源码:18](../../eyes/src/engine/controllers/PickController.js#L18)：当前操作：写入 无直接字段写入；返回 this._callback。
- `setCallback(callback)` [源码:21](../../eyes/src/engine/controllers/PickController.js#L21)：当前操作：写入 _callback；返回 无显式返回。
- `getTriggerOnHover()` [源码:24](../../eyes/src/engine/controllers/PickController.js#L24)：当前操作：写入 无直接字段写入；返回 this._triggerOnHover。
- `setTriggerOnHover(triggerOnHover)` [源码:27](../../eyes/src/engine/controllers/PickController.js#L27)：当前操作：写入 _triggerOnHover；返回 无显式返回。
- `getPickedPosition()` [源码:30](../../eyes/src/engine/controllers/PickController.js#L30)：当前操作：写入 无直接字段写入；返回 this._pickedPosition。
- `__update()` [源码:33](../../eyes/src/engine/controllers/PickController.js#L33)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/controllers/PositionSumController.js`

将多个引用实体的相对位置叠加到当前实体。。[源码](../../eyes/src/engine/controllers/PositionSumController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-PositionSumController-js)

### `PositionSumController`

各源位置先转到本实体父参考系，按径向 multiplier 与 add 组合后累加；零距离时不除长度。。父类 `Pioneer.BaseController`。

- `constructor(controllerName, entity)` [源码:5](../../eyes/src/engine/controllers/PositionSumController.js#L5)：当前操作：写入 _entities；返回 无显式返回。
- `addEntity(entityName, radialMultiplier, radialOffset)` [源码:10](../../eyes/src/engine/controllers/PositionSumController.js#L10)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeEntity(entityName)` [源码:20](../../eyes/src/engine/controllers/PositionSumController.js#L20)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setEntityParams(entityName, radialMultiplier, radialOffset)` [源码:24](../../eyes/src/engine/controllers/PositionSumController.js#L24)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:34](../../eyes/src/engine/controllers/PositionSumController.js#L34)：当前操作：写入 无直接字段写入；返回 void。

## `eyes/src/engine/controllers/RollController.js`

响应输入或配置更新相机绕观察方向的滚转。。[源码](../../eyes/src/engine/controllers/RollController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-RollController-js)

### `RollController`

活动相机的滚转输入经限制与平滑后绕局部 Y 轴右乘；小于阈值时归零以停止尾随。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:5](../../eyes/src/engine/controllers/RollController.js#L5)：当前操作：写入 _rollAngleSmoothedValue、_rollSensitivity、_rollSmoothness；返回 无显式返回。
- `getRollSensitivity()` [源码:12](../../eyes/src/engine/controllers/RollController.js#L12)：当前操作：写入 无直接字段写入；返回 this._rollSensitivity。
- `setRollSensitivity(rollSensitivity)` [源码:15](../../eyes/src/engine/controllers/RollController.js#L15)：当前操作：写入 _rollSensitivity；返回 无显式返回。
- `getRollSmoothness()` [源码:18](../../eyes/src/engine/controllers/RollController.js#L18)：当前操作：写入 无直接字段写入；返回 this._rollSmoothness。
- `setRollSmoothness(rollSmoothness)` [源码:21](../../eyes/src/engine/controllers/RollController.js#L21)：当前操作：写入 _rollSmoothness；返回 无显式返回。
- `__update()` [源码:24](../../eyes/src/engine/controllers/RollController.js#L24)：当前操作：写入 _rollAngleSmoothedValue；返回 无显式返回。

## `eyes/src/engine/controllers/RotateByEntityOrientationController.js`

把位置/姿态按另一个实体的姿态旋转，补充父层级只做平移的参考系行为。。[源码](../../eyes/src/engine/controllers/RotateByEntityOrientationController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-RotateByEntityOrientationController-js)

### `RotateByEntityOrientationController`

选定实体或父实体姿态左乘 orientation 并旋转线/角速度与位置；时间查询选择该时刻的父参考，不增加平移。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:5](../../eyes/src/engine/controllers/RotateByEntityOrientationController.js#L5)：当前操作：写入 _entityRef、_rotatingOrientation、_rotatingPosition；返回 无显式返回。
- `setEntityForOrientation(entityName)` [源码:16](../../eyes/src/engine/controllers/RotateByEntityOrientationController.js#L16)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `isRotatingPosition()` [源码:29](../../eyes/src/engine/controllers/RotateByEntityOrientationController.js#L29)：当前操作：写入 无直接字段写入；返回 this._rotatingPosition。
- `setRotatingPosition(rotatingPosition)` [源码:32](../../eyes/src/engine/controllers/RotateByEntityOrientationController.js#L32)：当前操作：写入 _rotatingPosition；返回 无显式返回。
- `isRotatingOrientation()` [源码:42](../../eyes/src/engine/controllers/RotateByEntityOrientationController.js#L42)：当前操作：写入 无直接字段写入；返回 this._rotatingOrientation。
- `setRotatingOrientation(rotatingOrientation)` [源码:45](../../eyes/src/engine/controllers/RotateByEntityOrientationController.js#L45)：当前操作：写入 _rotatingOrientation；返回 无显式返回。
- `__updatePositionAtTime(positionOut, time)` [源码:55](../../eyes/src/engine/controllers/RotateByEntityOrientationController.js#L55)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateVelocityAtTime(velocityOut, time)` [源码:66](../../eyes/src/engine/controllers/RotateByEntityOrientationController.js#L66)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateOrientationAtTime(orientationOut, time)` [源码:77](../../eyes/src/engine/controllers/RotateByEntityOrientationController.js#L77)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:88](../../eyes/src/engine/controllers/RotateByEntityOrientationController.js#L88)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/controllers/RotateController.js`

按输入增量旋转实体或相机目标。。[源码](../../eyes/src/engine/controllers/RotateController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-RotateController-js)

### `RotateController`

固定旋转作用于位置/速度及姿态/角速度；关节模式只写模型关节，修改状态声明随模式切换。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:5](../../eyes/src/engine/controllers/RotateController.js#L5)：当前操作：写入 _joint、_jointObject、_jointObjectIndex、_model、_rotatingOrientation、_rotatingPosition、_rotation；返回 无显式返回。
- `getRotation()` [源码:19](../../eyes/src/engine/controllers/RotateController.js#L19)：当前操作：写入 无直接字段写入；返回 this._rotation。
- `setRotation(rotation)` [源码:22](../../eyes/src/engine/controllers/RotateController.js#L22)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `isRotatingPosition()` [源码:25](../../eyes/src/engine/controllers/RotateController.js#L25)：当前操作：写入 无直接字段写入；返回 this._rotatingPosition。
- `setRotatingPosition(rotatingPosition)` [源码:28](../../eyes/src/engine/controllers/RotateController.js#L28)：当前操作：写入 _rotatingPosition；返回 无显式返回。
- `isRotatingOrientation()` [源码:32](../../eyes/src/engine/controllers/RotateController.js#L32)：当前操作：写入 无直接字段写入；返回 this._rotatingOrientation。
- `setRotatingOrientation(rotatingOrientation)` [源码:35](../../eyes/src/engine/controllers/RotateController.js#L35)：当前操作：写入 _rotatingOrientation；返回 无显式返回。
- `setJoint(joint, model)` [源码:39](../../eyes/src/engine/controllers/RotateController.js#L39)：当前操作：写入 _joint、_model；返回 无显式返回。
- `__updatePositionAtTime(positionOut, time)` [源码:49](../../eyes/src/engine/controllers/RotateController.js#L49)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateVelocityAtTime(velocityOut, time)` [源码:54](../../eyes/src/engine/controllers/RotateController.js#L54)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateOrientationAtTime(orientationOut, time)` [源码:59](../../eyes/src/engine/controllers/RotateController.js#L59)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:64](../../eyes/src/engine/controllers/RotateController.js#L64)：当前操作：写入 _jointObject、_jointObjectIndex；返回 无显式返回。
- `_updateModifiedStates()` [源码:102](../../eyes/src/engine/controllers/RotateController.js#L102)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/controllers/ScaleController.js`

依据输入变化更新实体/目标的缩放量。。[源码](../../eyes/src/engine/controllers/ScaleController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-ScaleController-js)

### `ScaleController`

位置与时间查询速度按同一无量纲比例原地缩放；每帧更新只发布位置，保留原修改状态声明。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:5](../../eyes/src/engine/controllers/ScaleController.js#L5)：当前操作：写入 _scale；返回 无显式返回。
- `getScale()` [源码:10](../../eyes/src/engine/controllers/ScaleController.js#L10)：当前操作：写入 无直接字段写入；返回 this._scale。
- `setScale(scale)` [源码:13](../../eyes/src/engine/controllers/ScaleController.js#L13)：当前操作：写入 _scale；返回 无显式返回。
- `__updatePositionAtTime(positionOut, time)` [源码:16](../../eyes/src/engine/controllers/ScaleController.js#L16)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateVelocityAtTime(velocityOut, time)` [源码:19](../../eyes/src/engine/controllers/ScaleController.js#L19)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:22](../../eyes/src/engine/controllers/ScaleController.js#L22)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/controllers/SelectController.js`

对相机射线命中实体进行筛选并触发选择回调。。[源码](../../eyes/src/engine/controllers/SelectController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-SelectController-js)

### `SelectController`

先选命中标签矩形中距离相机最近的实体，再回退几何射线拾取；结果通过引擎回调队列交付。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:5](../../eyes/src/engine/controllers/SelectController.js#L5)：当前操作：写入 _callback；返回 无显式返回。
- `getCallback()` [源码:9](../../eyes/src/engine/controllers/SelectController.js#L9)：当前操作：写入 无直接字段写入；返回 this._callback。
- `setCallback(callback)` [源码:12](../../eyes/src/engine/controllers/SelectController.js#L12)：当前操作：写入 _callback；返回 无显式返回。
- `__update()` [源码:15](../../eyes/src/engine/controllers/SelectController.js#L15)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/controllers/SetParentController.js`

在控制器时间覆盖内切换父实体参考系。。[源码](../../eyes/src/engine/controllers/SetParentController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-SetParentController-js)

### `SetParentController`

父引用名称变更时迁移 position 依赖；每帧把解析后的引用交给实体 setParent，空引用行为保留。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:5](../../eyes/src/engine/controllers/SetParentController.js#L5)：当前操作：写入 _parent；返回 无显式返回。
- `getParent()` [源码:9](../../eyes/src/engine/controllers/SetParentController.js#L9)：当前操作：写入 无直接字段写入；返回 this._parent.getName()。
- `setParent(entityName)` [源码:12](../../eyes/src/engine/controllers/SetParentController.js#L12)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:21](../../eyes/src/engine/controllers/SetParentController.js#L21)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/controllers/SpinController.js`

围绕指定轴按参考时刻和角速率计算实体姿态。。[源码](../../eyes/src/engine/controllers/SpinController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-SpinController-js)

### `SpinController`

角速率乘模拟或实时秒得到弧度；可按参考历元绝对求角或按帧差增量旋转，关节/实体模式及轴所在参考系分别处理。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:5](../../eyes/src/engine/controllers/SpinController.js#L5)：当前操作：写入 _axis、_axisRelativeToEntity、_clampedToRealTime、_joint、_jointObject、_jointObjectIndex、_lastTime、_model、_rate、_referenceAngle、_referenceTime、_rotatingPosition、_usingRealTime；返回 无显式返回。
- `getAxis()` [源码:22](../../eyes/src/engine/controllers/SpinController.js#L22)：当前操作：写入 无直接字段写入；返回 this._axis。
- `isAxisRelativeToEntity()` [源码:25](../../eyes/src/engine/controllers/SpinController.js#L25)：当前操作：写入 无直接字段写入；返回 this._axisRelativeToEntity。
- `setAxis(axis, axisRelativeToEntity)` [源码:28](../../eyes/src/engine/controllers/SpinController.js#L28)：当前操作：写入 _axisRelativeToEntity；返回 无显式返回。
- `getRate()` [源码:32](../../eyes/src/engine/controllers/SpinController.js#L32)：当前操作：写入 无直接字段写入；返回 this._rate。
- `setRate(rate)` [源码:35](../../eyes/src/engine/controllers/SpinController.js#L35)：当前操作：写入 _rate；返回 无显式返回。
- `getReferenceAngle()` [源码:38](../../eyes/src/engine/controllers/SpinController.js#L38)：当前操作：写入 无直接字段写入；返回 this._referenceAngle。
- `setReferenceAngle(referenceAngle)` [源码:41](../../eyes/src/engine/controllers/SpinController.js#L41)：当前操作：写入 _referenceAngle；返回 无显式返回。
- `getReferenceTime()` [源码:44](../../eyes/src/engine/controllers/SpinController.js#L44)：当前操作：写入 无直接字段写入；返回 this._referenceTime。
- `setReferenceTime(referenceTime)` [源码:47](../../eyes/src/engine/controllers/SpinController.js#L47)：当前操作：写入 _referenceTime；返回 无显式返回。
- `isClampedToRealTime()` [源码:50](../../eyes/src/engine/controllers/SpinController.js#L50)：当前操作：写入 无直接字段写入；返回 this._clampedToRealTime。
- `setClampedToRealTime(clampedToRealTime)` [源码:53](../../eyes/src/engine/controllers/SpinController.js#L53)：当前操作：写入 _clampedToRealTime；返回 无显式返回。
- `isUsingRealTime()` [源码:56](../../eyes/src/engine/controllers/SpinController.js#L56)：当前操作：写入 无直接字段写入；返回 this._usingRealTime。
- `setUsingRealTime(usingRealTime)` [源码:59](../../eyes/src/engine/controllers/SpinController.js#L59)：当前操作：写入 _usingRealTime；返回 无显式返回。
- `isRotatingPosition()` [源码:62](../../eyes/src/engine/controllers/SpinController.js#L62)：当前操作：写入 无直接字段写入；返回 this._rotatingPosition。
- `setRotatingPosition(rotatingPosition)` [源码:65](../../eyes/src/engine/controllers/SpinController.js#L65)：当前操作：写入 _rotatingPosition；返回 无显式返回。
- `setJoint(joint, model)` [源码:73](../../eyes/src/engine/controllers/SpinController.js#L73)：当前操作：写入 _joint、_model；返回 无显式返回。
- `__updatePositionAtTime(positionOut, time)` [源码:91](../../eyes/src/engine/controllers/SpinController.js#L91)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateOrientationAtTime(orientationOut, time)` [源码:115](../../eyes/src/engine/controllers/SpinController.js#L115)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:138](../../eyes/src/engine/controllers/SpinController.js#L138)：当前操作：写入 _jointObject、_jointObjectIndex、_lastTime；返回 无显式返回。

## `eyes/src/engine/controllers/TapController.js`

把点击/触摸点转换为点击事件和回调。。[源码](../../eyes/src/engine/controllers/TapController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-TapController-js)

### `TapController`

选择或发生拖移时调用 tapCallback；保留原布尔触发条件和同步回调时机。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:5](../../eyes/src/engine/controllers/TapController.js#L5)：当前操作：写入 _tapCallback；返回 无显式返回。
- `getTapCallback()` [源码:9](../../eyes/src/engine/controllers/TapController.js#L9)：当前操作：写入 无直接字段写入；返回 this._tapCallback。
- `setTapCallback(tapCallback)` [源码:12](../../eyes/src/engine/controllers/TapController.js#L12)：当前操作：写入 _tapCallback；返回 无显式返回。
- `__update()` [源码:15](../../eyes/src/engine/controllers/TapController.js#L15)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/controllers/TimeController.js`

将交互输入映射到引擎仿真时间或时间速率。。[源码](../../eyes/src/engine/controllers/TimeController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-TimeController-js)

### `TimeController`

时间倍率通过路由写入时间管理器；显示换算使用固定 365 天年、30 天月，并只选可整除的最大单位。。父类 `EyesPublicApi.BaseComponent`。

- `constructor(app)` [源码:9](../../eyes/src/engine/controllers/TimeController.js#L9)：当前操作：写入 _class.fontSize.small、_class.isPlay、_manager、_rates、_router；返回 无显式返回。
- `init()` [源码:35](../../eyes/src/engine/controllers/TimeController.js#L35)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getRateLimits()` [源码:62](../../eyes/src/engine/controllers/TimeController.js#L62)：当前操作：写入 无直接字段写入；返回 this._rates。
- `setRateLimits(rates)` [源码:65](../../eyes/src/engine/controllers/TimeController.js#L65)：当前操作：写入 _rates；返回 无显式返回。
- `setRate(timeRate)` [源码:68](../../eyes/src/engine/controllers/TimeController.js#L68)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `decreaseRate()` [源码:75](../../eyes/src/engine/controllers/TimeController.js#L75)：沿既有倍率表寻找相邻值；当前倍率不在表中的索引 −1 行为原样保留。
- `increaseRate()` [源码:85](../../eyes/src/engine/controllers/TimeController.js#L85)：沿既有倍率表寻找相邻值；空表和末端不更新路由。
- `togglePlayPause()` [源码:94](../../eyes/src/engine/controllers/TimeController.js#L94)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setDefaultRate()` [源码:102](../../eyes/src/engine/controllers/TimeController.js#L102)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setRealRate()` [源码:105](../../eyes/src/engine/controllers/TimeController.js#L105)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onRateChange()` [源码:109](../../eyes/src/engine/controllers/TimeController.js#L109)：只有播放状态或倍率变化时刷新；不在允许表中的倍率通过路由回到默认值，空表允许任意倍率。
- `onForcedPause()` [源码:125](../../eyes/src/engine/controllers/TimeController.js#L125)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onForcedPauseResume()` [源码:128](../../eyes/src/engine/controllers/TimeController.js#L128)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getRateUnit(timeRate=null)` [源码:132](../../eyes/src/engine/controllers/TimeController.js#L132)：按年、月、周、日、时、分顺序选择整除单位；否则保留原有对 60 取余的秒显示规则。
- `getRateDisplay(timeRate)` [源码:170](../../eyes/src/engine/controllers/TimeController.js#L170)：当前操作：写入 无直接字段写入；返回 0!==rate?rate+unit+"(s)/sec":"paused"。

## `eyes/src/engine/controllers/TransitionController.js`

在起终状态/时间之间平滑过渡实体位置和姿态。。[源码](../../eyes/src/engine/controllers/TransitionController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-TransitionController-js)

### `TransitionController`

墙钟秒驱动过渡并在半程移除临时换父控制器；旧位置转入最终父参考系，完成/取消通过 Promise 及引擎延迟队列交付。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:5](../../eyes/src/engine/controllers/TransitionController.js#L5)：当前操作：写入 _endPromise、_initialOrientation、_initialParent、_initialPosition、_rejectPromise、_resolvePromise、_transitionFunction、_transitionStart、_transitionTime；返回 无显式返回。
- `getTransitionTime()` [源码:34](../../eyes/src/engine/controllers/TransitionController.js#L34)：当前操作：写入 无直接字段写入；返回 this._transitionTime。
- `setTransitionTime(transitionTime)` [源码:37](../../eyes/src/engine/controllers/TransitionController.js#L37)：当前操作：写入 _transitionTime；返回 无显式返回。
- `setTransitionFunction(transitionFunction)` [源码:40](../../eyes/src/engine/controllers/TransitionController.js#L40)：当前操作：写入 _transitionFunction；返回 无显式返回。
- `getParent()` [源码:43](../../eyes/src/engine/controllers/TransitionController.js#L43)：当前操作：写入 无直接字段写入；返回 setParentController.getName()、null!==parentEntity?parentEntity.getName():""。
- `setParent(parentName)` [源码:49](../../eyes/src/engine/controllers/TransitionController.js#L49)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getTimeRemaining()` [源码:55](../../eyes/src/engine/controllers/TransitionController.js#L55)：当前操作：写入 无直接字段写入；返回 Math.max(0,this._transitionTime-(Date.now()/1e3-this._transitionStart))。
- `getEndPromise()` [源码:58](../../eyes/src/engine/controllers/TransitionController.js#L58)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__destroy()` [源码:61](../../eyes/src/engine/controllers/TransitionController.js#L61)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:71](../../eyes/src/engine/controllers/TransitionController.js#L71)：当前操作：写入 _transitionStart、_transitionTime；返回 void this.getEntity().getScene().getEngine().addCallback(()=>{if(!this.isDestroyed()){this._transitionTime=0;this.getEntity().removeController(this);if(""!==this._initialParent.getName()){this._rejectPromise(new Error(ˋT。
- `_lerpTransitionFunction(entity, initialPosition, finalPosition, initialOrientation, finalOrientation, fraction)` [源码:121](../../eyes/src/engine/controllers/TransitionController.js#L121)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/controllers/TranslateController.js`

处理拖动输入并将屏幕/相机空间位移换算到实体位置。。[源码](../../eyes/src/engine/controllers/TranslateController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-TranslateController-js)

### `TranslateController`

平移在父参考系或经实体姿态旋转后相加；时间查询使用该时刻姿态，调用者输出只加偏移。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:5](../../eyes/src/engine/controllers/TranslateController.js#L5)：当前操作：写入 _relativeToOrientation、_translation；返回 无显式返回。
- `getTranslation()` [源码:11](../../eyes/src/engine/controllers/TranslateController.js#L11)：当前操作：写入 无直接字段写入；返回 this._translation。
- `setTranslation(translation)` [源码:14](../../eyes/src/engine/controllers/TranslateController.js#L14)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setRelativeToOrientation(relativeToOrientation)` [源码:17](../../eyes/src/engine/controllers/TranslateController.js#L17)：当前操作：写入 _relativeToOrientation；返回 无显式返回。
- `__updatePositionAtTime(positionOut, time)` [源码:20](../../eyes/src/engine/controllers/TranslateController.js#L20)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:31](../../eyes/src/engine/controllers/TranslateController.js#L31)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/controllers/ZoomController.js`

按滚轮/触摸缩放输入更新观察距离，并执行距离限制。。[源码](../../eyes/src/engine/controllers/ZoomController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-ZoomController-js)

### `ZoomController`

乘法缩放平滑后作用于离地高度；父姿态用于地面局部转换，距离限制到达边界时重置平滑倍率。。父类 `PioneerPublicApi.BaseController`。

- `constructor(controllerName, entity)` [源码:5](../../eyes/src/engine/controllers/ZoomController.js#L5)：当前操作：写入 _distanceClamp、_zoomSensitivity、_zoomSmoothedValue、_zoomSmoothness；返回 无显式返回。
- `getZoomSensitivity()` [源码:13](../../eyes/src/engine/controllers/ZoomController.js#L13)：当前操作：写入 无直接字段写入；返回 this._zoomSensitivity。
- `setZoomSensitivity(zoomSensitivity)` [源码:16](../../eyes/src/engine/controllers/ZoomController.js#L16)：当前操作：写入 _zoomSensitivity；返回 无显式返回。
- `getZoomSmoothness()` [源码:19](../../eyes/src/engine/controllers/ZoomController.js#L19)：当前操作：写入 无直接字段写入；返回 this._zoomSmoothness。
- `setZoomSmoothness(zoomSmoothness)` [源码:22](../../eyes/src/engine/controllers/ZoomController.js#L22)：当前操作：写入 _zoomSmoothness；返回 无显式返回。
- `getDistanceClamp()` [源码:25](../../eyes/src/engine/controllers/ZoomController.js#L25)：当前操作：写入 无直接字段写入；返回 this._distanceClamp。
- `setDistanceClamp(distanceClamp)` [源码:28](../../eyes/src/engine/controllers/ZoomController.js#L28)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__update()` [源码:31](../../eyes/src/engine/controllers/ZoomController.js#L31)：当前操作：写入 _zoomSmoothedValue；返回 void。

## `eyes/src/engine/controllers/ZoomFitController.js`

按实体包围半径与相机视场计算合适距离，执行自动取景。。[源码](../../eyes/src/engine/controllers/ZoomFitController.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-controllers-ZoomFitController-js)

### `ZoomFitController`

取较小视场角及边缘留白计算包络斜率；tightFit 分解视轴与横向距离，否则使用包围球，zoomOutOnly 禁止缩近。。父类 `Pioneer.BaseController`。

- `constructor(controllerName, entity)` [源码:5](../../eyes/src/engine/controllers/ZoomFitController.js#L5)：当前操作：写入 _edgeSize、_entities、_tightFit、_zoomOutOnly；返回 无显式返回。
- `addEntity(entityName)` [源码:13](../../eyes/src/engine/controllers/ZoomFitController.js#L13)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeEntity(entityName)` [源码:21](../../eyes/src/engine/controllers/ZoomFitController.js#L21)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setTightFit(tightFit)` [源码:25](../../eyes/src/engine/controllers/ZoomFitController.js#L25)：当前操作：写入 _tightFit；返回 无显式返回。
- `setZoomOutOnly(zoomOutOnly)` [源码:28](../../eyes/src/engine/controllers/ZoomFitController.js#L28)：当前操作：写入 _zoomOutOnly；返回 无显式返回。
- `setEdgeSize(edgeSize)` [源码:31](../../eyes/src/engine/controllers/ZoomFitController.js#L31)：当前操作：写入 _edgeSize；返回 无显式返回。
- `__update()` [源码:34](../../eyes/src/engine/controllers/ZoomFitController.js#L34)：当前操作：写入 无直接字段写入；返回 void。

## `eyes/src/engine/core/AER.js`

方位角、仰角、距离坐标与三维向量之间的转换值对象。。[源码](../../eyes/src/engine/core/AER.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-AER-js)

### `AER`

方位角与仰角内部用弧度，range 与向量长度同单位；零向量反解保留原 NaN，toString 可选择度显示。。父类 `无`。

- `constructor(azimuth=0, elevation=0, range=0)` [源码:7](../../eyes/src/engine/core/AER.js#L7)：当前操作：写入 _azimuth、_elevation、_range；返回 无显式返回。
- `get azimuth()` [源码:12](../../eyes/src/engine/core/AER.js#L12)：当前操作：写入 无直接字段写入；返回 this._azimuth。
- `set azimuth(azimuth)` [源码:15](../../eyes/src/engine/core/AER.js#L15)：当前操作：写入 _azimuth；返回 无显式返回。
- `get elevation()` [源码:18](../../eyes/src/engine/core/AER.js#L18)：当前操作：写入 无直接字段写入；返回 this._elevation。
- `set elevation(elevation)` [源码:21](../../eyes/src/engine/core/AER.js#L21)：当前操作：写入 _elevation；返回 无显式返回。
- `get range()` [源码:24](../../eyes/src/engine/core/AER.js#L24)：当前操作：写入 无直接字段写入；返回 this._range。
- `set range(range)` [源码:27](../../eyes/src/engine/core/AER.js#L27)：当前操作：写入 _range；返回 无显式返回。
- `toString(useDegrees=false)` [源码:30](../../eyes/src/engine/core/AER.js#L30)：当前操作：写入 无直接字段写入；返回 useDegrees?ˋ[${PioneerPublicApi.MathUtils.radToDeg(this._azimuth)}, ${PioneerPublicApi.MathUtils.radToDeg(this._elevation)}, ${this._range}]ˋ:ˋ[${this._azimuth}, ${this._elevation}, ${this._range}]ˋ。
- `copy(source)` [源码:33](../../eyes/src/engine/core/AER.js#L33)：当前操作：写入 _azimuth、_elevation、_range；返回 无显式返回。
- `set(azimuth, elevation, range)` [源码:38](../../eyes/src/engine/core/AER.js#L38)：当前操作：写入 _azimuth、_elevation、_range；返回 无显式返回。
- `setFromVector(vector)` [源码:43](../../eyes/src/engine/core/AER.js#L43)：当前操作：写入 _azimuth、_elevation、_range；返回 无显式返回。

## `eyes/src/engine/core/Animation.js`

基于时间/持续时长推进动画回调，保存播放和完成状态。。[源码](../../eyes/src/engine/core/Animation.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Animation-js)

### `Animation`

关键帧先原地按场景时间排序；可见性为阶梯变化，关节 Euler 分量线性插值，CoverageController 每帧驱动。。父类 `无`。

- `static makeSubobjectVisibleAnimation(model, objectName, initialVisible, keyframes)` [源码:5](../../eyes/src/engine/core/Animation.js#L5)：当前操作：写入 无直接字段写入；返回 controller。
- `static makeJointRotationAnimation(model, jointName, rotationAxis, keyframes)` [源码:20](../../eyes/src/engine/core/Animation.js#L20)：当前操作：写入 无直接字段写入；返回 controller。

## `eyes/src/engine/core/AnimationUtils.js`

为动画生成插值/缓动函数和组合操作。。[源码](../../eyes/src/engine/core/AnimationUtils.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-AnimationUtils-js)

### `AnimationUtils`

封装 Web Animations API；位移用元素百分比，方向控制起止偏移符号，timings 和原键名直接传给浏览器。。父类 `无`。


## `eyes/src/engine/core/AnnularSolarEclipseStory.js`

2023 日环食故事定义：图层进入/退出、地月日观察按钮、影锥/轮廓纹理开关与状态恢复。。[源码](../../eyes/src/engine/core/AnnularSolarEclipseStory.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-AnnularSolarEclipseStory-js)

## `eyes/src/engine/core/AppUtils.js`

连接设备模式、路由/内容和应用界面常用逻辑的工具集合。。[源码](../../eyes/src/engine/core/AppUtils.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-AppUtils-js)

### `AppUtils`

连接设备模式、路由/内容和应用界面常用逻辑的工具集合。。父类 `无`。

- `static isEmptyObject(object)` [源码:27](../../eyes/src/engine/core/AppUtils.js#L27)：当前操作：写入 无直接字段写入；返回 object.constructor===Object&&0===Object.keys(object).length。
- `static addStartToPath(path, prefix="/")` [源码:30](../../eyes/src/engine/core/AppUtils.js#L30)：当前操作：写入 无直接字段写入；返回 path.startsWith(prefix)?path:prefix+path。
- `static cleanPathDuplicate(path, repeatedPattern="/", replacement="/")` [源码:33](../../eyes/src/engine/core/AppUtils.js#L33)：当前操作：写入 无直接字段写入；返回 path.replace(regExp,replacement)。
- `static addEndToPath(path, suffix="/")` [源码:37](../../eyes/src/engine/core/AppUtils.js#L37)：当前操作：写入 无直接字段写入；返回 path.endsWith(suffix)?path:path+suffix。
- `static isElement(value)` [源码:40](../../eyes/src/engine/core/AppUtils.js#L40)：当前操作：写入 无直接字段写入；返回 value instanceof Element\|\|value instanceof Document。
- `static isHTML(value)` [源码:43](../../eyes/src/engine/core/AppUtils.js#L43)：当前操作：写入 无直接字段写入；返回 "string"==typeof value&&null!==value.match(/<[^/>]+>/gm)&&null!==value.match(/<\/[^>]+>/gm)。
- `static hasHTML(value)` [源码:46](../../eyes/src/engine/core/AppUtils.js#L46)：当前操作：写入 无直接字段写入；返回 false、Array.from(parsedDocument.body.childNodes).some(childNode=>1===childNode.nodeType)。
- `static loadJSON(url)` [源码:51](../../eyes/src/engine/core/AppUtils.js#L51)：当前操作：写入 无直接字段写入；返回 response.json()。
- `static msToTime(remainingTimeUnits=0)` [源码:60](../../eyes/src/engine/core/AppUtils.js#L60)：当前操作：写入 无直接字段写入；返回 {hour:(remainingTimeUnits-minutes)/60,minute:minutes,second:seconds,millisecond:milliseconds}。
- `static formatCountdownTime(totalDurationMillis, remainingMillis)` [源码:71](../../eyes/src/engine/core/AppUtils.js#L71)：当前操作：写入 无直接字段写入；返回 ˋ${totalDurationMillis>=36e5?timeParts.hour+":":""}${timeParts.minute\|\|"00"}:${timeParts.second}ˋ。
- `static minToSec(minutes)` [源码:78](../../eyes/src/engine/core/AppUtils.js#L78)：当前操作：写入 无直接字段写入；返回 60*minutes。
- `static minToMS(minutes)` [源码:81](../../eyes/src/engine/core/AppUtils.js#L81)：当前操作：写入 无直接字段写入；返回 6e4*minutes。
- `static isFutureMission(launchDate)` [源码:84](../../eyes/src/engine/core/AppUtils.js#L84)：当前操作：写入 无直接字段写入；返回 new Date(launchDate)>date。
- `static deepCopy(value)` [源码:88](../../eyes/src/engine/core/AppUtils.js#L88)：当前操作：写入 无直接字段写入；返回 JSON.parse(JSON.stringify(value))。
- `static deepClone(value)` [源码:91](../../eyes/src/engine/core/AppUtils.js#L91)：当前操作：写入 无直接字段写入；返回 clonedValue。
- `static deepMerge(target, source)` [源码:99](../../eyes/src/engine/core/AppUtils.js#L99)：当前操作：写入 无直接字段写入；返回 getUnidentified157()(target,source,mergeOptions)。
- `static deepEqual(leftObject, rightObject)` [源码:105](../../eyes/src/engine/core/AppUtils.js#L105)：当前操作：写入 无直接字段写入；返回 false、true。
- `static isObject(value)` [源码:119](../../eyes/src/engine/core/AppUtils.js#L119)：当前操作：写入 无直接字段写入；返回 null!==value&&"object"==typeof value。
- `static filterObject(object, predicate)` [源码:122](../../eyes/src/engine/core/AppUtils.js#L122)：当前操作：写入 无直接字段写入；返回 Object.fromEntries(Object.entries(object).filter(([propertyName,propertyValue])=>predicate(propertyValue,propertyName)))。
- `static debounce()` [源码:125](../../eyes/src/engine/core/AppUtils.js#L125)：当前操作：写入 无直接字段写入；返回 getUnidentified158()(...arguments)。
- `static throttle()` [源码:128](../../eyes/src/engine/core/AppUtils.js#L128)：当前操作：写入 无直接字段写入；返回 getUnidentified159()(...arguments)。
- `static waitFor(delayMillis)` [源码:131](../../eyes/src/engine/core/AppUtils.js#L131)：当前操作：写入 无直接字段写入；返回 new Promise(resolve=>{setTimeout(()=>{resolve();},delayMillis);})。
- `static isPortrait()` [源码:138](../../eyes/src/engine/core/AppUtils.js#L138)：当前操作：写入 无直接字段写入；返回 window.matchMedia("(orientation: portrait)").matches。
- `static isLandscape()` [源码:141](../../eyes/src/engine/core/AppUtils.js#L141)：当前操作：写入 无直接字段写入；返回 window.matchMedia("(orientation: landscape)").matches。
- `static isMobileLandscape()` [源码:144](../../eyes/src/engine/core/AppUtils.js#L144)：当前操作：写入 无直接字段写入；返回 window.matchMedia("(min-width: 320px) and (max-width: 915px) and (orientation: landscape)").matches。
- `static isMobilePortrait()` [源码:147](../../eyes/src/engine/core/AppUtils.js#L147)：当前操作：写入 无直接字段写入；返回 window.matchMedia("(min-width: 320px) and (max-width: 640px) and (orientation: portrait)").matches。
- `static isMobile()` [源码:150](../../eyes/src/engine/core/AppUtils.js#L150)：当前操作：写入 无直接字段写入；返回 AppUtils.isMobileLandscape()\|\|AppUtils.isMobilePortrait()。
- `static isAppleDevice()` [源码:153](../../eyes/src/engine/core/AppUtils.js#L153)：当前操作：写入 无直接字段写入；返回 true===AppUtils.isiPhone()\|\|true===AppUtils.isiPad()。
- `static isiPhone()` [源码:156](../../eyes/src/engine/core/AppUtils.js#L156)：当前操作：写入 无直接字段写入；返回 "iPhone"===(window.navigator?.userAgentData?.platform\|\|window.navigator?.platform\|\|"unknown")。
- `static isiPad()` [源码:159](../../eyes/src/engine/core/AppUtils.js#L159)：当前操作：写入 无直接字段写入；返回 "MacIntel"===platform&&hasMultipleTouchPoints。
- `static isTabletPortrait()` [源码:164](../../eyes/src/engine/core/AppUtils.js#L164)：当前操作：写入 无直接字段写入；返回 window.matchMedia("(min-width: 641px) and (max-width: 1024px) and (orientation: portrait)").matches。
- `static isTabletLandscape()` [源码:167](../../eyes/src/engine/core/AppUtils.js#L167)：当前操作：写入 无直接字段写入；返回 window.matchMedia("(min-width: 916px) and (max-width: 1024px) and (orientation: landscape)").matches。
- `static isTablet()` [源码:170](../../eyes/src/engine/core/AppUtils.js#L170)：当前操作：写入 无直接字段写入；返回 AppUtils.isTabletLandscape()\|\|AppUtils.isTabletPortrait()。
- `static isMobileMode()` [源码:173](../../eyes/src/engine/core/AppUtils.js#L173)：当前操作：写入 无直接字段写入；返回 AppUtils.isMobilePortrait()\|\|AppUtils.isMobileLandscape()\|\|AppUtils.isTabletLandscape()\|\|AppUtils.isTabletPortrait()\|\|AppUtils.isPanorama()。
- `static isDesktop()` [源码:176](../../eyes/src/engine/core/AppUtils.js#L176)：当前操作：写入 无直接字段写入；返回 window.matchMedia("(min-width: 1025px) and (min-height: 600px)").matches。
- `static isPanorama()` [源码:179](../../eyes/src/engine/core/AppUtils.js#L179)：当前操作：写入 无直接字段写入；返回 window.matchMedia("(min-width: 1025px) and (max-height: 599px) and (orientation: landscape)").matches。
- `static is2K()` [源码:182](../../eyes/src/engine/core/AppUtils.js#L182)：当前操作：写入 无直接字段写入；返回 window.matchMedia("(min-width: 2880px) and (min-height: 1620px)").matches。
- `static is4K()` [源码:185](../../eyes/src/engine/core/AppUtils.js#L185)：当前操作：写入 无直接字段写入；返回 window.matchMedia("(min-width: 3200px) and (min-height: 1800px)").matches。
- `static isTouch()` [源码:188](../../eyes/src/engine/core/AppUtils.js#L188)：当前操作：写入 无直接字段写入；返回 "ontouchstart"in window\|\|window.navigator.maxTouchPoints>0。
- `static isPrimaryTouch()` [源码:191](../../eyes/src/engine/core/AppUtils.js#L191)：当前操作：写入 无直接字段写入；返回 window.matchMedia("(pointer: coarse)").matches。
- `static canHover()` [源码:194](../../eyes/src/engine/core/AppUtils.js#L194)：当前操作：写入 无直接字段写入；返回 !matchMedia("(hover: none)").matches。
- `static htmlToElement(htmlText)` [源码:197](../../eyes/src/engine/core/AppUtils.js#L197)：当前操作：写入 无直接字段写入；返回 templateElement.content.firstElementChild。
- `static htmlToElements(htmlText)` [源码:202](../../eyes/src/engine/core/AppUtils.js#L202)：当前操作：写入 无直接字段写入；返回 templateElement.content.cloneNode(true).childNodes。
- `static insertParamsToHTML(htmlText, params={})` [源码:207](../../eyes/src/engine/core/AppUtils.js#L207)：当前操作：写入 无直接字段写入；返回 htmlText=htmlText.replaceAll(/{\$([A-Z])\w+}/gi,"")。
- `static htmlWithParamsToElement(htmlText, params={})` [源码:217](../../eyes/src/engine/core/AppUtils.js#L217)：当前操作：写入 无直接字段写入；返回 AppUtils.htmlToElement(htmlText)。
- `static onAttachElement(elementOrSelector, onAttached, {interval:intervalMillis=100,timeout:timeoutMillis=5e3}={})` [源码:221](../../eyes/src/engine/core/AppUtils.js#L221)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static appendWithCallback(parentElement, childElement, targetSelector, onAttached)` [源码:233](../../eyes/src/engine/core/AppUtils.js#L233)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static elementReady(selector, timeoutMillis=1e3)` [源码:246](../../eyes/src/engine/core/AppUtils.js#L246)：当前操作：写入 无直接字段写入；返回 new Promise((resolveElement,rejectElement)=>{const existingElement=document.querySelector(selector);if(existingElement)return void resolveElement(existingElement);const mutationObserver=new MutationObserver(()=>{const ma。
- `static addScrollbar(element, options={})` [源码:264](../../eyes/src/engine/core/AppUtils.js#L264)：当前操作：写入 无直接字段写入；返回 getUnidentified160()(element,scrollbarOptions)。
- `static formatNumber(numericValue, maximumFractionDigits=3, minimumFractionDigits=void 0)` [源码:285](../../eyes/src/engine/core/AppUtils.js#L285)：当前操作：写入 无直接字段写入；返回 numericValue.toLocaleString(void 0,{maximumFractionDigits:maximumFractionDigits,minimumFractionDigits:minimumFractionDigits})。
- `static formatDate(dateValue, formatOptions={})` [源码:291](../../eyes/src/engine/core/AppUtils.js#L291)：当前操作：写入 无直接字段写入；返回 dateValue.toLocaleString(void 0,{year:"numeric",month:"long",day:"numeric",...formatOptions})。
- `static tween(startState, endState, {onUpdate:onUpdate,onComplete:onComplete,duration:durationMillis=2e3}={})` [源码:299](../../eyes/src/engine/core/AppUtils.js#L299)：当前操作：写入 无直接字段写入；返回 tween。
- `static convertObjType(object)` [源码:318](../../eyes/src/engine/core/AppUtils.js#L318)：当前操作：写入 无直接字段写入；返回 object。

## `eyes/src/engine/core/BaseApp.js`

创建 Pioneer 引擎并组织应用管理器、UI 组件、场景与初始化流程。。[源码](../../eyes/src/engine/core/BaseApp.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-BaseApp-js)

### `BaseApp`

创建 Pioneer 引擎并组织应用管理器、UI 组件、场景与初始化流程。。父类 `无`。

- `static setAppClass()` [源码:13](../../eyes/src/engine/core/BaseApp.js#L13)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `constructor(componentTypes)` [源码:16](../../eyes/src/engine/core/BaseApp.js#L16)：当前操作：写入 _cameraScripts、_componentInfo、_componentTypes、_components、_dragging、_dynamicElement、_element、_entityInfo、_isSearching、_managers、_pioneer、_router、_scene、_sceneInfo、_scrollable、_timeInfo、_touchCount、_touchMax、_touchStartPos、_updates、_viewClasses、_viewInfo、_views、canHover、isTouch；返回 无显式返回。
- `init()` [源码:57](../../eyes/src/engine/core/BaseApp.js#L57)：当前操作：写入 _dynamicElement、_element、_pioneer、_staticElement；返回 无显式返回。
- `get pioneer()` [源码:94](../../eyes/src/engine/core/BaseApp.js#L94)：当前操作：写入 无直接字段写入；返回 this._pioneer。
- `get scene()` [源码:97](../../eyes/src/engine/core/BaseApp.js#L97)：当前操作：写入 无直接字段写入；返回 this._scene。
- `set scene(scene)` [源码:100](../../eyes/src/engine/core/BaseApp.js#L100)：当前操作：写入 _scene；返回 无显式返回。
- `get cameraScripts()` [源码:103](../../eyes/src/engine/core/BaseApp.js#L103)：当前操作：写入 无直接字段写入；返回 this._cameraScripts。
- `get dynamicElement()` [源码:106](../../eyes/src/engine/core/BaseApp.js#L106)：当前操作：写入 无直接字段写入；返回 this._dynamicElement。
- `get staticElement()` [源码:109](../../eyes/src/engine/core/BaseApp.js#L109)：当前操作：写入 无直接字段写入；返回 this._staticElement。
- `get sceneInfo()` [源码:112](../../eyes/src/engine/core/BaseApp.js#L112)：当前操作：写入 无直接字段写入；返回 this._sceneInfo。
- `get element()` [源码:115](../../eyes/src/engine/core/BaseApp.js#L115)：当前操作：写入 无直接字段写入；返回 this._element。
- `set element(element)` [源码:118](../../eyes/src/engine/core/BaseApp.js#L118)：当前操作：写入 _element；返回 无显式返回。
- `get isSearching()` [源码:121](../../eyes/src/engine/core/BaseApp.js#L121)：当前操作：写入 无直接字段写入；返回 this._isSearching。
- `set isSearching(isSearching)` [源码:124](../../eyes/src/engine/core/BaseApp.js#L124)：当前操作：写入 _isSearching；返回 无显式返回。
- `addManager(managerName, ManagerClass, ...constructorArgs)` [源码:127](../../eyes/src/engine/core/BaseApp.js#L127)：当前操作：写入 _managers[managerName]；返回 this._managers[managerName]。
- `removeManager(managerName)` [源码:131](../../eyes/src/engine/core/BaseApp.js#L131)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getManager(managerName)` [源码:134](../../eyes/src/engine/core/BaseApp.js#L134)：当前操作：写入 无直接字段写入；返回 void 0!==this._managers[managerName]?this._managers[managerName]:null。
- `createManagers()` [源码:137](../../eyes/src/engine/core/BaseApp.js#L137)：当前操作：写入 _scene；返回 无显式返回。
- `setUpManagers()` [源码:331](../../eyes/src/engine/core/BaseApp.js#L331)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addComponent(componentName, ComponentClass, ...constructorArgs)` [源码:349](../../eyes/src/engine/core/BaseApp.js#L349)：当前操作：写入 _components[componentName]；返回 component。
- `addComponentWithPlaceholder(componentInfo, searchRoot=document, placeholderElement=null)` [源码:356](../../eyes/src/engine/core/BaseApp.js#L356)：当前操作：写入 无直接字段写入；返回 Promise.reject(new Error(ˋaddComponentWithPlaceholder: There is no placeholder element for ${componentInfo.type}ˋ))、component。
- `removeComponent(componentName)` [源码:368](../../eyes/src/engine/core/BaseApp.js#L368)：当前操作：写入 无直接字段写入；返回 void 0!==this._components[componentName]&&(this._components[componentName].destroy(),delete this._components[componentName],true)。
- `removeComponents()` [源码:371](../../eyes/src/engine/core/BaseApp.js#L371)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getComponent(componentName)` [源码:374](../../eyes/src/engine/core/BaseApp.js#L374)：当前操作：写入 无直接字段写入；返回 void 0!==this._components[componentName]?this._components[componentName]:null。
- `getComponents()` [源码:377](../../eyes/src/engine/core/BaseApp.js#L377)：当前操作：写入 无直接字段写入；返回 this._components。
- `createComponents()` [源码:380](../../eyes/src/engine/core/BaseApp.js#L380)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addShortcuts()` [源码:405](../../eyes/src/engine/core/BaseApp.js#L405)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setUpComponents()` [源码:411](../../eyes/src/engine/core/BaseApp.js#L411)：当前操作：写入 dynamicElement.innerHTML；返回 无显式返回。
- `getViews()` [源码:427](../../eyes/src/engine/core/BaseApp.js#L427)：当前操作：写入 无直接字段写入；返回 this._views。
- `addViews()` [源码:430](../../eyes/src/engine/core/BaseApp.js#L430)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeViews()` [源码:436](../../eyes/src/engine/core/BaseApp.js#L436)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getView(viewName)` [源码:439](../../eyes/src/engine/core/BaseApp.js#L439)：当前操作：写入 无直接字段写入；返回 void 0!==this._views[viewName]?this._views[viewName]:null。
- `addView(viewName, ViewClass, ...constructorArgs)` [源码:442](../../eyes/src/engine/core/BaseApp.js#L442)：当前操作：写入 _views[viewName]；返回 this._views[viewName]。
- `removeView(viewName)` [源码:446](../../eyes/src/engine/core/BaseApp.js#L446)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setUpScene()` [源码:449](../../eyes/src/engine/core/BaseApp.js#L449)：当前操作：写入 getManager("camera").defaultMaxDistance、scene；返回 void console.error("App._sceneInfo needs to be set.")。
- `setUpViewportAndCamera()` [源码:466](../../eyes/src/engine/core/BaseApp.js#L466)：当前操作：写入 cameraScripts.cameraEntity、cameraScripts.scene；返回 无显式返回。
- `setUpUpdates()` [源码:473](../../eyes/src/engine/core/BaseApp.js#L473)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addUpdate(updateCallback)` [源码:478](../../eyes/src/engine/core/BaseApp.js#L478)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeUpdate(updateCallback)` [源码:481](../../eyes/src/engine/core/BaseApp.js#L481)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `update()` [源码:485](../../eyes/src/engine/core/BaseApp.js#L485)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `bindFunctions(methodNames=[])` [源码:490](../../eyes/src/engine/core/BaseApp.js#L490)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `endLoadingScreen()` [源码:497](../../eyes/src/engine/core/BaseApp.js#L497)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setUpRoutes()` [源码:508](../../eyes/src/engine/core/BaseApp.js#L508)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `isDragging()` [源码:509](../../eyes/src/engine/core/BaseApp.js#L509)：当前操作：写入 无直接字段写入；返回 this._dragging。
- `isTouchMax()` [源码:512](../../eyes/src/engine/core/BaseApp.js#L512)：当前操作：写入 无直接字段写入；返回 this._touchMax。
- `resize()` [源码:515](../../eyes/src/engine/core/BaseApp.js#L515)：当前操作：写入 canHover、isTouch；返回 无显式返回。
- `onTouchStart(touchEvent)` [源码:531](../../eyes/src/engine/core/BaseApp.js#L531)：当前操作：写入 _dragging、_scrollable、_touchCount、_touchMax、_touchStartPos.x、_touchStartPos.y；返回 无显式返回。
- `onTouchMove(touchEvent)` [源码:548](../../eyes/src/engine/core/BaseApp.js#L548)：当前操作：写入 _dragging；返回 无显式返回。
- `onTouchEnd(touchEvent)` [源码:553](../../eyes/src/engine/core/BaseApp.js#L553)：当前操作：写入 _dragging、_scrollable、_touchCount、_touchMax；返回 无显式返回。
- `getPioneerVersion()` [源码:559](../../eyes/src/engine/core/BaseApp.js#L559)：当前操作：写入 无直接字段写入；返回 this.pioneer.getVersion()。
- `getEyesVersion()` [源码:562](../../eyes/src/engine/core/BaseApp.js#L562)：当前操作：写入 无直接字段写入；返回 EyesPublicApi.EyesVersion。

## `eyes/src/engine/core/BaseContentBlock.js`

故事/信息面板内容块的 DOM 生命周期和公共设置基类。。[源码](../../eyes/src/engine/core/BaseContentBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-BaseContentBlock-js)

### `BaseContentBlock`

故事/信息面板内容块的 DOM 生命周期和公共设置基类。。父类 `Eyes.BaseComponent`。

- `constructor(app, element, options={})` [源码:6](../../eyes/src/engine/core/BaseContentBlock.js#L6)：当前操作：写入 _more；返回 无显式返回。
- `init()` [源码:27](../../eyes/src/engine/core/BaseContentBlock.js#L27)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `showMore()` [源码:32](../../eyes/src/engine/core/BaseContentBlock.js#L32)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hideMore()` [源码:38](../../eyes/src/engine/core/BaseContentBlock.js#L38)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleMore()` [源码:44](../../eyes/src/engine/core/BaseContentBlock.js#L44)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/BaseRef.js`

延迟引用基类：get 时刷新，过滤禁用对象，并只在引用身份变化时回调。。[源码](../../eyes/src/engine/core/BaseRef.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-BaseRef-js)

### `BaseRef`

延迟引用在 get() 时由子类 update() 解析；getRef() 仅查看缓存。禁用目标视为空引用，回调只在身份发生变化时运行。。父类 `无`。

- `constructor()` [源码:5](../../eyes/src/engine/core/BaseRef.js#L5)：当前操作：写入 _ref、_refChangedCallback；返回 无显式返回。
- `get()` [源码:9](../../eyes/src/engine/core/BaseRef.js#L9)：当前操作：写入 无直接字段写入；返回 this._ref。
- `setRefChangedCallback(refChangedCallback)` [源码:13](../../eyes/src/engine/core/BaseRef.js#L13)：当前操作：写入 _refChangedCallback；返回 无显式返回。
- `update()` [源码:16](../../eyes/src/engine/core/BaseRef.js#L16)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getRef()` [源码:17](../../eyes/src/engine/core/BaseRef.js#L17)：当前操作：写入 无直接字段写入；返回 this._ref。
- `_setRef(nextRef)` [源码:20](../../eyes/src/engine/core/BaseRef.js#L20)：当前操作：写入 _ref；返回 无显式返回。

## `eyes/src/engine/core/BasicAlphaShader.js`

声明 BasicAlphaShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。。[源码](../../eyes/src/engine/core/BasicAlphaShader.js)。语义状态：`verified-shader-source-format`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-BasicAlphaShader-js)

## `eyes/src/engine/core/BasicShader.js`

声明 BasicShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。。[源码](../../eyes/src/engine/core/BasicShader.js)。语义状态：`verified-shader-source-format`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-BasicShader-js)

## `eyes/src/engine/core/CameraScripts.js`

应用级观察脚本：解析实体/系统目标，协调 camera 管理器与场景过渡。。[源码](../../eyes/src/engine/core/CameraScripts.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-CameraScripts-js)

### `CameraScripts`

应用级观察脚本：解析实体/系统目标，协调 camera 管理器与场景过渡。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app)` [源码:7](../../eyes/src/engine/core/CameraScripts.js#L7)：当前操作：写入 _cameraManager、_customSystemDistances、_easeInOutExpoTransition、_easeOutExpoTransition、_onCameraTransition；返回 无显式返回。
- `setCameraManager(cameraManager)` [源码:29](../../eyes/src/engine/core/CameraScripts.js#L29)：当前操作：写入 _cameraManager；返回 无显式返回。
- `get scene()` [源码:32](../../eyes/src/engine/core/CameraScripts.js#L32)：当前操作：写入 无直接字段写入；返回 this._scene。
- `set scene(scene)` [源码:35](../../eyes/src/engine/core/CameraScripts.js#L35)：当前操作：写入 _scene；返回 无显式返回。
- `get cameraEntity()` [源码:38](../../eyes/src/engine/core/CameraScripts.js#L38)：当前操作：写入 无直接字段写入；返回 this._cameraEntity。
- `set cameraEntity(cameraEntity)` [源码:41](../../eyes/src/engine/core/CameraScripts.js#L41)：当前操作：写入 _cameraEntity；返回 无显式返回。
- `getNormalToEcliptic(outputNormal, planeEntityId)` [源码:44](../../eyes/src/engine/core/CameraScripts.js#L44)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `isBarycenter(entityId)` [源码:49](../../eyes/src/engine/core/CameraScripts.js#L49)：当前操作：写入 无直接字段写入；返回 !!entityId.includes("_barycenter")。
- `removeBarycenter(entityId)` [源码:52](../../eyes/src/engine/core/CameraScripts.js#L52)：当前操作：写入 无直接字段写入；返回 this.isBarycenter(entityId)?entityId.replace("_barycenter",""):entityId。
- `lookAtSurfaceLatLon(entityId, latitudeDegrees=0, longitudeDegrees=0, {scene:scene,cinematic=false,duration=1.5,distance:distanceMultiplier=1.3}={})` [源码:55](../../eyes/src/engine/core/CameraScripts.js#L55)：当前操作：写入 无直接字段写入；返回 void。
- `goToCelestialObject(entityId, {scene:scene,starId="sun",cinematic=true,duration=1.5,distance:distanceMultiplier=1.3,verticalOffset=0,horizontalOffset=0}={})` [源码:97](../../eyes/src/engine/core/CameraScripts.js#L97)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_easeOutExpoTransition(cameraEntity, startPosition, endPosition, startOrientation, endOrientation, progress)` [源码:149](../../eyes/src/engine/core/CameraScripts.js#L149)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_easeInOutExpoTransition(cameraEntity, startPosition, endPosition, startOrientation, endOrientation, progress)` [源码:161](../../eyes/src/engine/core/CameraScripts.js#L161)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `goToSpacecraft(entityId, {scene:scene,starId="sun",planeId="earth",distance:distance,cinematic=true,duration=1.5,verticalOffset=0,horizontalOffset=0}={})` [源码:173](../../eyes/src/engine/core/CameraScripts.js#L173)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `goToInstrument(entityId, {scene:scene,distance:distance,duration=1.5,upVector:upAxisName="z-axis",forwardVector:forwardAxisName="y-axis"}={})` [源码:226](../../eyes/src/engine/core/CameraScripts.js#L226)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `compareObjects(leftEntityId, rightEntityId, {cameraLeft:cameraLeft,cameraRight:cameraRight,cameraLeftPosition:cameraLeftPosition,cameraRightPosition:cameraRightPosition,cameraUp:cameraUp,scene:scene,minRadius:minRadius,maxRadius:maxRadius,duration=.75})` [源码:272](../../eyes/src/engine/core/CameraScripts.js#L272)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `showLocation(entityId, planeEntityId, referenceEntityId, planeMode="northPole", {duration=2,otherEntityNames=[],distance:distance,rotateByScreenRatio=true}={})` [源码:321](../../eyes/src/engine/core/CameraScripts.js#L321)：当前操作：写入 无直接字段写入；返回 void。
- `alignObjects(entityId, focusEntityId, {verticalOffset=0,horizontalOffset=0,duration=1.5,transitionDuration:transitionDuration,alignDuration:alignDuration,distance=1,cinematic=false,useEase=true}={})` [源码:390](../../eyes/src/engine/core/CameraScripts.js#L390)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `alignSpacecraftPlanet(entityId, {duration=1.5,minRadius:minimumRadius=50,distanceMultiplier=3}={})` [源码:440](../../eyes/src/engine/core/CameraScripts.js#L440)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `viewFromSide(entityId, {planeId="earth",distance:distance,cinematic=false,duration=.75,verticalOffset=0,horizontalOffset=0,forwardVector:forwardAxisName="x-axis",upVector:upAxisName=""}={})` [源码:471](../../eyes/src/engine/core/CameraScripts.js#L471)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `spacecraftLookAtTarget(entityId, targetEntityId)` [源码:532](../../eyes/src/engine/core/CameraScripts.js#L532)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `spacecraftLockedOnTarget(entityId, targetEntityId)` [源码:539](../../eyes/src/engine/core/CameraScripts.js#L539)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `goToSystemSideway(entityId, {distance:distance,minDistance:minimumDistance=0,duration=1,otherEntityNames=[],includeChildren=true,angleInDegree:angleDegrees=0,cinematic=false}={})` [源码:546](../../eyes/src/engine/core/CameraScripts.js#L546)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `goToSystem(entityId, options={})` [源码:605](../../eyes/src/engine/core/CameraScripts.js#L605)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_goToSystem(entityId, {distance:distance,angle:angleDegrees=25,minDistance:minimumDistance=0,duration=1,planeId="",otherEntityNames=[],includeChildren=true,isRelativeToPreviousCamera:relativeToPreviousCamera=true}={})` [源码:632](../../eyes/src/engine/core/CameraScripts.js#L632)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `goToCenter(entityIds, parentEntityId, sampleTime, options={})` [源码:707](../../eyes/src/engine/core/CameraScripts.js#L707)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `showLocationCenter(entityIds, parentEntityId, sampleTime, planeEntityId, referenceEntityId, planeMode, options={})` [源码:730](../../eyes/src/engine/core/CameraScripts.js#L730)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `showLocationInParentSystem(entityId, options={})` [源码:753](../../eyes/src/engine/core/CameraScripts.js#L753)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `showLocationInSolarSystem(entityId, options={})` [源码:759](../../eyes/src/engine/core/CameraScripts.js#L759)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/Cameras.js`

创建和切换用于实体观察、系统取景、跟踪和过渡的相机控制器组合。。[源码](../../eyes/src/engine/core/Cameras.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Cameras-js)

### `Cameras`

创建和切换用于实体观察、系统取景、跟踪和过渡的相机控制器组合。。父类 `无`。

- `static createFullSizeViewportAndCamera(scene, viewportName="main", cameraName="camera")` [源码:5](../../eyes/src/engine/core/Cameras.js#L5)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static focusOnEntity(cameraEntity, targetEntity, {up:alignUp=true,orbiter:isOrbiter=false})` [源码:12](../../eyes/src/engine/core/Cameras.js#L12)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static lookAtEntity(cameraEntity, targetEntity, {duration=.5,finalUp:finalUp,finalUpRelativeEntity:finalUpRelativeEntity,finalUpPosition:useUpPosition=false})` [源码:22](../../eyes/src/engine/core/Cameras.js#L22)：当前操作：写入 无直接字段写入；返回 void。
- `static goToEntity(cameraEntity, targetEntity, {up:alignUp=true,orbiter:isOrbiter=false,fixedToParent=false,duration=1,distance:distance,zoom:allowZoom=true,destination:destination,destinationUp:destinationUp,destinationInFocusFrame=false,transitionFunction:transitionFunction})` [源码:45](../../eyes/src/engine/core/Cameras.js#L45)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static pickOnEntity(cameraEntity, targetEntity, onPick)` [源码:106](../../eyes/src/engine/core/Cameras.js#L106)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static getDistanceToFitEntities(cameraEntity, viewOrientation, focusEntity, entities)` [源码:122](../../eyes/src/engine/core/Cameras.js#L122)：当前操作：写入 无直接字段写入；返回 NaN、requiredDistance。

## `eyes/src/engine/core/CancelToken.js`

维护可取消操作的取消标记/回调令牌。。[源码](../../eyes/src/engine/core/CancelToken.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-CancelToken-js)

### `CancelToken`

取消令牌只保存单向布尔状态；cancel 可重复调用，isCanceled 为只读 getter，不隐含中止网络请求或事件分发。。父类 `无`。

- `constructor()` [源码:4](../../eyes/src/engine/core/CancelToken.js#L4)：当前操作：写入 _isCanceled；返回 无显式返回。
- `cancel()` [源码:7](../../eyes/src/engine/core/CancelToken.js#L7)：当前操作：写入 _isCanceled；返回 无显式返回。
- `get isCanceled()` [源码:10](../../eyes/src/engine/core/CancelToken.js#L10)：当前操作：写入 无直接字段写入；返回 this._isCanceled。

## `eyes/src/engine/core/CanceledError.js`

用于区分主动取消与真实加载失败的错误类型。。[源码](../../eyes/src/engine/core/CanceledError.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-CanceledError-js)

### `CanceledError`

取消异常是资源异步链的类型标记，固定消息为 Canceled；上层以 instanceof 区分取消与真实加载失败。。父类 `Error`。

- `constructor()` [源码:4](../../eyes/src/engine/core/CanceledError.js#L4)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/Capabilities-58.js`

读取 WebGL 能力/扩展，通过静态上下文供材质与纹理能力判断。。[源码](../../eyes/src/engine/core/Capabilities-58.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Capabilities-58-js)

### `Capabilities`

WebGL 扩展能力按扩展名缓存布尔值；未设置 context 返回 false，context 更换时保留原有缓存行为。。父类 `无`。

- `static hasGLExtension(extensionName)` [源码:4](../../eyes/src/engine/core/Capabilities-58.js#L4)：当前操作：写入 无直接字段写入；返回 false、supported。
- `static __setContext(context)` [源码:13](../../eyes/src/engine/core/Capabilities-58.js#L13)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/Capabilities-584.js`

解析 WMTS Capabilities XML，提取 Layer 与 TileMatrixSet 的图层、维度、坐标矩阵和资源模板。。[源码](../../eyes/src/engine/core/Capabilities-584.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Capabilities-584-js)

### `Capabilities`

解析 WMTS Capabilities XML，提取 Layer 与 TileMatrixSet 的图层、维度、坐标矩阵和资源模板。。父类 `无`。

- `constructor(endPoint, engine, priority)` [源码:9](../../eyes/src/engine/core/Capabilities-584.js#L9)：当前操作：写入 _capabilitiesXML、endPoint、layers、readyPromise；返回 无显式返回。
- `getLayer(identifier)` [源码:25](../../eyes/src/engine/core/Capabilities-584.js#L25)：当前操作：写入 无直接字段写入；返回 layer。
- `getTileMatrixSet(identifier)` [源码:37](../../eyes/src/engine/core/Capabilities-584.js#L37)：当前操作：写入 无直接字段写入；返回 matrixSet。

### `Layer`

WMTS XML 图层：标识、格式、维度和资源模板。。父类 `无`。

- `constructor(layerNode, baseUrl)` [源码:59](../../eyes/src/engine/core/Capabilities-584.js#L59)：当前操作：写入 _baseUrl、boundingBox、defaultStyle、dimensions、identifier、tileMatrixSets、title、url；返回 无显式返回。

### `TileMatrixSet`

WMTS 坐标矩阵集合及每级矩阵尺寸。。父类 `无`。

- `constructor(matrixSetNode)` [源码:126](../../eyes/src/engine/core/Capabilities-584.js#L126)：当前操作：写入 _crs、_numTiles、_numTiles[numLevels]、boundingBox、boundingBox.origin.y、boundingBox.size.x、boundingBox.size.y、identifier、maxPixelSize、numLevels、readyPromise；返回 无显式返回。
- `getNumTiles(level)` [源码:193](../../eyes/src/engine/core/Capabilities-584.js#L193)：当前操作：写入 无直接字段写入；返回 this._numTiles[level]。
- `crsUnitsToLLA(output, position)` [源码:196](../../eyes/src/engine/core/Capabilities-584.js#L196)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static setCRS(crs)` [源码:203](../../eyes/src/engine/core/Capabilities-584.js#L203)：OGC URN 先去前缀；内置月球/火星/WGS84 定义优先，其他 EPSG 仍沿原 epsg.io 路径加载。

## `eyes/src/engine/core/CarouselEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。。[源码](../../eyes/src/engine/core/CarouselEntry.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-CarouselEntry-js)

## `eyes/src/engine/core/CarouselPanelEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。。[源码](../../eyes/src/engine/core/CarouselPanelEntry.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-CarouselPanelEntry-js)

## `eyes/src/engine/core/CheckboxMultistate.js`

复选框入口适配：副作用导入多态复选框，默认导出基础 Checkbox，另命名导出 CheckboxMultistate，并加载样式。。[源码](../../eyes/src/engine/core/CheckboxMultistate.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-CheckboxMultistate-js)

## `eyes/src/engine/core/ClockEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。。[源码](../../eyes/src/engine/core/ClockEntry.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-ClockEntry-js)

## `eyes/src/engine/core/ClockShortcutEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。。[源码](../../eyes/src/engine/core/ClockShortcutEntry.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-ClockShortcutEntry-js)

## `eyes/src/engine/core/CollectionItem.js`

带名称、启用与销毁生命周期的集合项，以及按名称/类型索引、移动和销毁项目的 Collection 容器。。[源码](../../eyes/src/engine/core/CollectionItem.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-CollectionItem-js)

### `CollectionItem`

集合同时维护顺序数组、名称映射和精确构造器分组；增删只重建受影响类型的 classIndex。移动先从源集合摘除，再加入目标并更换 parent；remove 才调用销毁钩子。。父类 `无`。

- `constructor(name, collectionParent)` [源码:4](../../eyes/src/engine/core/CollectionItem.js#L4)：当前操作：写入 _classIndex、_collectionParent、_index、_name；返回 无显式返回。
- `getIndex()` [源码:10](../../eyes/src/engine/core/CollectionItem.js#L10)：当前操作：写入 无直接字段写入；返回 this._index。
- `__setIndex(index)` [源码:13](../../eyes/src/engine/core/CollectionItem.js#L13)：当前操作：写入 _index；返回 无显式返回。
- `getClassIndex()` [源码:16](../../eyes/src/engine/core/CollectionItem.js#L16)：当前操作：写入 无直接字段写入；返回 this._classIndex。
- `__setClassIndex(classIndex)` [源码:19](../../eyes/src/engine/core/CollectionItem.js#L19)：当前操作：写入 _classIndex；返回 无显式返回。
- `getName()` [源码:22](../../eyes/src/engine/core/CollectionItem.js#L22)：当前操作：写入 无直接字段写入；返回 this._name。
- `__getCollectionParent()` [源码:25](../../eyes/src/engine/core/CollectionItem.js#L25)：当前操作：写入 无直接字段写入；返回 this._collectionParent。
- `__setCollectionParent(collectionParent)` [源码:28](../../eyes/src/engine/core/CollectionItem.js#L28)：当前操作：写入 _collectionParent；返回 无显式返回。
- `__destroy()` [源码:31](../../eyes/src/engine/core/CollectionItem.js#L31)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `Collection`

带名称、启用与销毁生命周期的集合项，以及按名称/类型索引、移动和销毁项目的 Collection 容器。。父类 `无`。

- `constructor(parent)` [源码:38](../../eyes/src/engine/core/CollectionItem.js#L38)：当前操作：写入 _items、_itemsByClass、_itemsByName、_parent；返回 无显式返回。
- `__destroy()` [源码:44](../../eyes/src/engine/core/CollectionItem.js#L44)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `get(itemType, nameOrClassIndex=0)` [源码:47](../../eyes/src/engine/core/CollectionItem.js#L47)：当前操作：写入 无直接字段写入；返回 classItems?classItems[nameOrClassIndex]??null:null、namedItem instanceof itemType?namedItem:null。
- `getAt(itemIndex)` [源码:57](../../eyes/src/engine/core/CollectionItem.js#L57)：当前操作：写入 无直接字段写入；返回 this._items[itemIndex]。
- `getSize()` [源码:60](../../eyes/src/engine/core/CollectionItem.js#L60)：当前操作：写入 无直接字段写入；返回 this._items.length。
- `getAny(nameOrType, classIndex)` [源码:63](../../eyes/src/engine/core/CollectionItem.js#L63)：当前操作：写入 无直接字段写入；返回 namedItem、classItems[classIndex??0]??null、null。
- `add(itemType, name="", beforeItem)` [源码:69](../../eyes/src/engine/core/CollectionItem.js#L69)：当前操作：写入 无直接字段写入；返回 item。
- `move(itemOrName, targetCollection, beforeItem)` [源码:81](../../eyes/src/engine/core/CollectionItem.js#L81)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `remove(itemOrName)` [源码:95](../../eyes/src/engine/core/CollectionItem.js#L95)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `clear()` [源码:106](../../eyes/src/engine/core/CollectionItem.js#L106)：当前操作：写入 _items；返回 无显式返回。
- `_addToLists(item, beforeItem)` [源码:112](../../eyes/src/engine/core/CollectionItem.js#L112)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_removeFromLists(itemIndex, item)` [源码:120](../../eyes/src/engine/core/CollectionItem.js#L120)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateIndices(startIndex, changedItem)` [源码:128](../../eyes/src/engine/core/CollectionItem.js#L128)：全局 index 从改动位置后移；classIndex 按同一精确构造器重新编号，继承类不会合并到父类分组。

## `eyes/src/engine/core/Color.js`

RGBA 颜色值、复制/混合与格式转换工具。。[源码](../../eyes/src/engine/core/Color.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Color-js)

### `Color`

RGBA 分量逐项运算，标量乘除同样作用于 alpha；不自动夹紧到 [0,1]，value/min/max 仅统计 RGB。。父类 `无`。

- `constructor(red=1, green=1, blue=1, alpha=1)` [源码:9](../../eyes/src/engine/core/Color.js#L9)：当前操作：写入 _a、_b、_g、_r；返回 无显式返回。
- `get r()` [源码:15](../../eyes/src/engine/core/Color.js#L15)：当前操作：写入 无直接字段写入；返回 this._r。
- `set r(red)` [源码:18](../../eyes/src/engine/core/Color.js#L18)：当前操作：写入 _r；返回 无显式返回。
- `get g()` [源码:21](../../eyes/src/engine/core/Color.js#L21)：当前操作：写入 无直接字段写入；返回 this._g。
- `set g(green)` [源码:24](../../eyes/src/engine/core/Color.js#L24)：当前操作：写入 _g；返回 无显式返回。
- `get b()` [源码:27](../../eyes/src/engine/core/Color.js#L27)：当前操作：写入 无直接字段写入；返回 this._b。
- `set b(blue)` [源码:30](../../eyes/src/engine/core/Color.js#L30)：当前操作：写入 _b；返回 无显式返回。
- `get a()` [源码:33](../../eyes/src/engine/core/Color.js#L33)：当前操作：写入 无直接字段写入；返回 this._a。
- `set a(alpha)` [源码:36](../../eyes/src/engine/core/Color.js#L36)：当前操作：写入 _a；返回 无显式返回。
- `toString()` [源码:39](../../eyes/src/engine/core/Color.js#L39)：当前操作：写入 无直接字段写入；返回 ˋ[${this._r}, ${this._g}, ${this._b}, ${this._a}]ˋ。
- `copy(source)` [源码:42](../../eyes/src/engine/core/Color.js#L42)：当前操作：写入 _a、_b、_g、_r；返回 无显式返回。
- `set(red, green, blue, alpha=1)` [源码:48](../../eyes/src/engine/core/Color.js#L48)：当前操作：写入 _a、_b、_g、_r；返回 无显式返回。
- `add(left, right)` [源码:54](../../eyes/src/engine/core/Color.js#L54)：当前操作：写入 _a、_b、_g、_r；返回 无显式返回。
- `sub(left, right)` [源码:60](../../eyes/src/engine/core/Color.js#L60)：当前操作：写入 _a、_b、_g、_r；返回 无显式返回。
- `mult(source, scalar)` [源码:66](../../eyes/src/engine/core/Color.js#L66)：当前操作：写入 _a、_b、_g、_r；返回 无显式返回。
- `addMult(base, direction, scalar)` [源码:72](../../eyes/src/engine/core/Color.js#L72)：当前操作：写入 _a、_b、_g、_r；返回 无显式返回。
- `div(source, scalar)` [源码:78](../../eyes/src/engine/core/Color.js#L78)：当前操作：写入 _a、_b、_g、_r；返回 无显式返回。
- `scale(left, right)` [源码:84](../../eyes/src/engine/core/Color.js#L84)：当前操作：写入 _a、_b、_g、_r；返回 无显式返回。
- `value()` [源码:90](../../eyes/src/engine/core/Color.js#L90)：当前操作：写入 无直接字段写入；返回 (this._r+this._g+this._b)/3。
- `min()` [源码:93](../../eyes/src/engine/core/Color.js#L93)：当前操作：写入 无直接字段写入；返回 Math.min(this._r,this._g,this._b)。
- `max()` [源码:96](../../eyes/src/engine/core/Color.js#L96)：当前操作：写入 无直接字段写入；返回 Math.max(this._r,this._g,this._b)。
- `lerp(start, end, fraction)` [源码:99](../../eyes/src/engine/core/Color.js#L99)：当前操作：写入 _a、_b、_g、_r；返回 无显式返回。

## `eyes/src/engine/core/ComponentRef.js`

按场景、实体名、组件类和名称/类序号重新解析可用组件引用。。[源码](../../eyes/src/engine/core/ComponentRef.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-ComponentRef-js)

### `ComponentRef`

按场景、实体名、组件类和名称/类序号重新解析可用组件引用。。父类 `PioneerPublicApi.BaseRef`。

- `constructor(scene, componentClass, entityName="", componentNameOrClassIndex=void 0)` [源码:5](../../eyes/src/engine/core/ComponentRef.js#L5)：当前操作：写入 _componentClass、_componentNameOrClassIndex、_entityName、_scene；返回 无显式返回。
- `getComponentClass()` [源码:12](../../eyes/src/engine/core/ComponentRef.js#L12)：当前操作：写入 无直接字段写入；返回 this._componentClass。
- `getEntityName()` [源码:15](../../eyes/src/engine/core/ComponentRef.js#L15)：当前操作：写入 无直接字段写入；返回 this._entityName。
- `getComponentNameOrClassIndex()` [源码:18](../../eyes/src/engine/core/ComponentRef.js#L18)：当前操作：写入 无直接字段写入；返回 this._componentNameOrClassIndex。
- `set(entityName, componentNameOrClassIndex=0)` [源码:21](../../eyes/src/engine/core/ComponentRef.js#L21)：当前操作：写入 _componentNameOrClassIndex、_entityName；返回 无显式返回。
- `update()` [源码:25](../../eyes/src/engine/core/ComponentRef.js#L25)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/Config.js`

保存引擎配置值并在配置项改变时通知监听者。。[源码](../../eyes/src/engine/core/Config.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Config-js)

### `Config`

配置值以严格身份比较触发通知；先保存新值，再按注册顺序以 key/value 调用监听器，移除时只删第一个匹配回调。。父类 `无`。

- `constructor()` [源码:4](../../eyes/src/engine/core/Config.js#L4)：当前操作：写入 _callbacksMap、_valueMap；返回 无显式返回。
- `getValue(key)` [源码:12](../../eyes/src/engine/core/Config.js#L12)：当前操作：写入 无直接字段写入；返回 this._valueMap.get(key)。
- `setValue(key, value)` [源码:15](../../eyes/src/engine/core/Config.js#L15)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addEventListener(key, callback)` [源码:22](../../eyes/src/engine/core/Config.js#L22)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeEventListener(key, callback)` [源码:30](../../eyes/src/engine/core/Config.js#L30)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/ConnectedSpriteShader.js`

声明 ConnectedSpriteShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。。[源码](../../eyes/src/engine/core/ConnectedSpriteShader.js)。语义状态：`verified-shader-source-format`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-ConnectedSpriteShader-js)

## `eyes/src/engine/core/ControllerRef.js`

按实体名、控制器类和名称/类序号重新解析可用控制器引用。。[源码](../../eyes/src/engine/core/ControllerRef.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-ControllerRef-js)

### `ControllerRef`

按实体名、控制器类和名称/类序号重新解析可用控制器引用。。父类 `PioneerPublicApi.BaseRef`。

- `constructor(scene, controllerClass, entityName="", controllerNameOrClassIndex=void 0)` [源码:5](../../eyes/src/engine/core/ControllerRef.js#L5)：当前操作：写入 _controllerClass、_controllerNameOrClassIndex、_entityName、_scene；返回 无显式返回。
- `getControllerClass()` [源码:12](../../eyes/src/engine/core/ControllerRef.js#L12)：当前操作：写入 无直接字段写入；返回 this._controllerClass。
- `getEntityName()` [源码:15](../../eyes/src/engine/core/ControllerRef.js#L15)：当前操作：写入 无直接字段写入；返回 this._entityName。
- `getControllerNameOrClassIndex()` [源码:18](../../eyes/src/engine/core/ControllerRef.js#L18)：当前操作：写入 无直接字段写入；返回 this._controllerNameOrClassIndex。
- `set(entityName, controllerNameOrClassIndex=0)` [源码:21](../../eyes/src/engine/core/ControllerRef.js#L21)：当前操作：写入 _controllerNameOrClassIndex、_entityName；返回 无显式返回。
- `update()` [源码:25](../../eyes/src/engine/core/ControllerRef.js#L25)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/CubeMap.js`

在三维方向与立方体六个面的 UV 坐标间转换。。[源码](../../eyes/src/engine/core/CubeMap.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-CubeMap-js)

### `CubeMap`

按绝对值最大分量选择面；并列时后遍历面覆盖前者。返回 x/y 为面 UV，z 为面号，面基是固定共享轴引用。。父类 `无`。

- `static xyzToUVFace(uvFaceOut, direction, faceFrames=CubeMap.defaultCubeMapFaceFrames)` [源码:5](../../eyes/src/engine/core/CubeMap.js#L5)：当前操作：写入 无直接字段写入；返回 void uvFaceOut.set(NaN,NaN,NaN)。

## `eyes/src/engine/core/DateTime.js`

组织日期/时间显示与输入转换的应用工具。。[源码](../../eyes/src/engine/core/DateTime.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-DateTime-js)

### `DateTime`

字段按 UTC 解释，month 为 1..12；ET/Unix 用 TimeUtils 闰秒表转换，second=60 单独补偿。共享 Date 暂存沿原设置顺序使用。。父类 `无`。

- `constructor(year=1, month=1, day=1, hour=0, minute=0, second=0, millisecond=0)` [源码:13](../../eyes/src/engine/core/DateTime.js#L13)：当前操作：写入 day、hour、millisecond、minute、month、second、year；返回 无显式返回。
- `copy(source)` [源码:22](../../eyes/src/engine/core/DateTime.js#L22)：当前操作：写入 day、hour、millisecond、minute、month、second、year；返回 无显式返回。
- `fromET(ephemerisSeconds)` [源码:31](../../eyes/src/engine/core/DateTime.js#L31)：当前操作：写入 day、hour、millisecond、minute、month、second、year；返回 无显式返回。
- `toET()` [源码:47](../../eyes/src/engine/core/DateTime.js#L47)：共享 Date 依次设置 UTC 字段，second=60 由 Unix 归一化后再回退一个 ET 秒；不在此轮改变月份溢出等旧顺序。
- `fromDOY(year, dayOfYear, hour=0, minute=0, second=0, millisecond=0)` [源码:63](../../eyes/src/engine/core/DateTime.js#L63)：当前操作：写入 day、hour、millisecond、minute、month、second、year；返回 无显式返回。
- `toDOY()` [源码:79](../../eyes/src/engine/core/DateTime.js#L79)：当前操作：写入 month；返回 dayOfYear。
- `isLeapYear()` [源码:87](../../eyes/src/engine/core/DateTime.js#L87)：当前操作：写入 无直接字段写入；返回 this.year%4==0&&this.year%100!=0\|\|this.year%400==0。
- `getDaysInMonth()` [源码:90](../../eyes/src/engine/core/DateTime.js#L90)：当前操作：写入 无直接字段写入；返回 daysInMonth。
- `parse(dateText)` [源码:97](../../eyes/src/engine/core/DateTime.js#L97)：当前操作：写入 day、hour、millisecond、minute、month、second、year；返回 无显式返回。
- `parseDOY(dateText)` [源码:127](../../eyes/src/engine/core/DateTime.js#L127)：当前操作：写入 hour、millisecond、minute、second；返回 无显式返回。
- `toString()` [源码:152](../../eyes/src/engine/core/DateTime.js#L152)：当前操作：写入 无直接字段写入；返回 ˋ${this.year.toString().padStart(4,"0")}-${this.month.toString().padStart(2,"0")}-${this.day.toString().padStart(2,"0")} ${this.hour.toString().padStart(2,"0")}:${this.minute.toString().padStart(2,"0")}:${this.second.toS。
- `toStringDOY()` [源码:155](../../eyes/src/engine/core/DateTime.js#L155)：当前操作：写入 无直接字段写入；返回 ˋ${this.year.toString().padStart(4,"0")}-${this.toDOY().toString().padStart(3,"0")}ˋ。

## `eyes/src/engine/core/DependencyGraph.js`

按依赖比较器深度优先排序节点，检测环并按排序结果更新控制器。。[源码](../../eyes/src/engine/core/DependencyGraph.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-DependencyGraph-js)

### `DependencyGraph`

依赖图仅在脏标志置位后重新深搜排序；临时标记检测回路、永久标记避免重复访问，递归错误逐层附加 item 形成依赖链。。父类 `无`。

- `constructor(updateItemCallback, compareItemCallback)` [源码:4](../../eyes/src/engine/core/DependencyGraph.js#L4)：当前操作：写入 _compareItemCallback、_needsSorting、_nodes、_sortedNodes、_updateItemCallback；返回 无显式返回。
- `addItem(item)` [源码:11](../../eyes/src/engine/core/DependencyGraph.js#L11)：当前操作：写入 _needsSorting；返回 无显式返回。
- `removeItem(item)` [源码:16](../../eyes/src/engine/core/DependencyGraph.js#L16)：当前操作：写入 _needsSorting；返回 无显式返回。
- `needsSorting()` [源码:21](../../eyes/src/engine/core/DependencyGraph.js#L21)：当前操作：写入 _needsSorting；返回 无显式返回。
- `update()` [源码:24](../../eyes/src/engine/core/DependencyGraph.js#L24)：当前操作：写入 _needsSorting、_sortedNodes；返回 无显式返回。
- `_visit(node)` [源码:41](../../eyes/src/engine/core/DependencyGraph.js#L41)：当前操作：写入 无直接字段写入；返回 true。

### `Node`

依赖图节点，保存 item 与 DFS 临时/永久标记。。父类 `无`。

- `constructor(item)` [源码:67](../../eyes/src/engine/core/DependencyGraph.js#L67)：当前操作：写入 item、permanentMark、temporaryMark；返回 无显式返回。

## `eyes/src/engine/core/Devices.js`

检测设备/浏览器特征供交互与移动模式选择。。[源码](../../eyes/src/engine/core/Devices.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Devices-js)

### `Devices`

平台识别优先 userAgentData.platform 再回退 navigator.platform；MacIntel 配合多触点被视为 iPad，Linux 和 Android 合并为同一平台分支。。父类 `无`。

- `static getPlatform()` [源码:4](../../eyes/src/engine/core/Devices.js#L4)：当前操作：写入 无直接字段写入；返回 "Windows"===platform\|\|"Win32"===platform\|\|"Win16"===platform?"Windows":"iPad"===platform\|\|"MacIntel"===platform&&navigator.maxTouchPoints>1?"iPad":"MacIntel"===platform?"Mac":platform.startsWith("Linux")\|\|"Android"===pla。

## `eyes/src/engine/core/Downloader.js`

替换资源 URL 变量，按优先级调度最多 20 个网络请求并提供取消/进度与内容类型解码。。[源码](../../eyes/src/engine/core/Downloader.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Downloader-js)

### `Downloader`

下载器按优先级排队，以替换后的 actualUrl 跟踪活动请求；记录拥有独立 Promise，完成、失败或取消后让出并发槽位。。父类 `无`。

- `constructor()` [源码:5](../../eyes/src/engine/core/Downloader.js#L5)：当前操作：写入 _currentDownloads、_downloadQueue、_maxCurrentDownloads、_replacementTypes、_replacements；返回 无显式返回。
- `getReplacement(replacementName)` [源码:12](../../eyes/src/engine/core/Downloader.js#L12)：当前操作：写入 无直接字段写入；返回 this._replacements.get(replacementName)。
- `setReplacement(replacementName, replacement)` [源码:15](../../eyes/src/engine/core/Downloader.js#L15)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getReplacementType(url)` [源码:18](../../eyes/src/engine/core/Downloader.js#L18)：当前操作：写入 无直接字段写入；返回 this._replacementTypes.get(url)。
- `setReplacementType(url, type)` [源码:21](../../eyes/src/engine/core/Downloader.js#L21)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `cancel(url)` [源码:25](../../eyes/src/engine/core/Downloader.js#L25)：XHR 活动请求可 abort；排队请求直接移除。图片和视频分支的取消能力保持原行为，未补造统一取消接口。
- `processUrl(url)` [源码:41](../../eyes/src/engine/core/Downloader.js#L41)：当前操作：写入 无直接字段写入；返回 actualUrl。
- `download(url, type, priority, onProgress)` [源码:46](../../eyes/src/engine/core/Downloader.js#L46)：当前操作：写入 无直接字段写入；返回 download.promise。
- `updatePriority(url, priority)` [源码:71](../../eyes/src/engine/core/Downloader.js#L71)：仅提升尚在队列的优先级，活动请求不重排；Math.max 保留已经取得的较高优先级。
- `_doRequest(download)` [源码:81](../../eyes/src/engine/core/Downloader.js#L81)：文本/二进制使用 XHR，图片/视频使用 DOM 元素，位图先下载 Blob 再异步解码；位图解码完成前仍占活动槽位。
- `_inProgressDownload(download, event)` [源码:156](../../eyes/src/engine/core/Downloader.js#L156)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_completeDownload(download, content, mimeType)` [源码:162](../../eyes/src/engine/core/Downloader.js#L162)：先移除活动记录并兑现调用者，再尝试启动一个排队请求；资源共享与引用计数属于上层 ResourceManager。
- `_failDownload(download, message)` [源码:171](../../eyes/src/engine/core/Downloader.js#L171)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_checkDownloadQueue()` [源码:176](../../eyes/src/engine/core/Downloader.js#L176)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/EnceladusDiscoveryStory.js`

土卫二发现故事定义：围绕 Enceladus 的幻灯片、介绍内容和相机/图层操作。。[源码](../../eyes/src/engine/core/EnceladusDiscoveryStory.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-EnceladusDiscoveryStory-js)

## `eyes/src/engine/core/Engine.js`

拥有 WebGL2 渲染器、时间、输入、场景和视口，按帧顺序推进状态与渲染。。[源码](../../eyes/src/engine/core/Engine.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Engine-js)

### `Engine`

引擎拥有渲染器、下载器与资源管理器；每帧先推进场景状态，再更新视口、视觉资源，最后渲染并执行回调。。父类 `无`。

- `constructor(rootDiv)` [源码:5](../../eyes/src/engine/core/Engine.js#L5)：当前操作：写入 _callbacks、_callbacksToRemove、_canvas、_canvas.style.height、_canvas.style.left、_canvas.style.position、_canvas.style.top、_canvas.style.width、_config、_downloader、_environment、_fps、_fpsLimit、_input、_lastAppTime、_materialManager、_realDeltaTime、_renderSize、_resourceManager、_rootDiv、_rootDiv.style.position、_rootDiv.style.touchAction、_rootDiv.style.userSelect、_scenes、_textureLoader、_thisLoop、_threeJsRenderer、_time、_timeRate、_viewportDiv、_viewportDiv.style.height、_viewportDiv.style.left、_viewportDiv.style.overflow、_viewportDiv.style.position、_viewportDiv.style.top、_viewportDiv.style.width、_viewports；返回 无显式返回。
- `getVersion()` [源码:20](../../eyes/src/engine/core/Engine.js#L20)：当前操作：写入 无直接字段写入；返回 PioneerPublicApi.Version。
- `getEnvironment()` [源码:23](../../eyes/src/engine/core/Engine.js#L23)：当前操作：写入 无直接字段写入；返回 this._environment。
- `setEnvironment(environment)` [源码:26](../../eyes/src/engine/core/Engine.js#L26)：当前操作：写入 _environment；返回 无显式返回。
- `getRootDiv()` [源码:29](../../eyes/src/engine/core/Engine.js#L29)：当前操作：写入 无直接字段写入；返回 this._rootDiv。
- `getRenderSize()` [源码:32](../../eyes/src/engine/core/Engine.js#L32)：当前操作：写入 无直接字段写入；返回 this._renderSize。
- `getCanvas()` [源码:35](../../eyes/src/engine/core/Engine.js#L35)：当前操作：写入 无直接字段写入；返回 this._canvas。
- `getViewportDiv()` [源码:38](../../eyes/src/engine/core/Engine.js#L38)：当前操作：写入 无直接字段写入；返回 this._viewportDiv。
- `getConfig()` [源码:41](../../eyes/src/engine/core/Engine.js#L41)：当前操作：写入 无直接字段写入；返回 this._config。
- `getInput()` [源码:44](../../eyes/src/engine/core/Engine.js#L44)：当前操作：写入 无直接字段写入；返回 this._input。
- `getDownloader()` [源码:47](../../eyes/src/engine/core/Engine.js#L47)：当前操作：写入 无直接字段写入；返回 this._downloader。
- `getTextureLoader()` [源码:50](../../eyes/src/engine/core/Engine.js#L50)：当前操作：写入 无直接字段写入；返回 this._textureLoader。
- `getResourceManager()` [源码:53](../../eyes/src/engine/core/Engine.js#L53)：当前操作：写入 无直接字段写入；返回 this._resourceManager。
- `getMaterialManager()` [源码:56](../../eyes/src/engine/core/Engine.js#L56)：当前操作：写入 无直接字段写入；返回 this._materialManager。
- `getScene(sceneName)` [源码:59](../../eyes/src/engine/core/Engine.js#L59)：当前操作：写入 无直接字段写入；返回 this._scenes.get(PioneerPublicApi.Scene,sceneName)。
- `getSceneAt(sceneIndex)` [源码:62](../../eyes/src/engine/core/Engine.js#L62)：当前操作：写入 无直接字段写入；返回 this._scenes.getAt(sceneIndex)。
- `getNumScenes()` [源码:65](../../eyes/src/engine/core/Engine.js#L65)：当前操作：写入 无直接字段写入；返回 this._scenes.getSize()。
- `addScene(sceneName)` [源码:68](../../eyes/src/engine/core/Engine.js#L68)：当前操作：写入 无直接字段写入；返回 this._scenes.add(PioneerPublicApi.Scene,sceneName)。
- `removeScene(sceneOrName)` [源码:71](../../eyes/src/engine/core/Engine.js#L71)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `get(sceneName, entityName, itemNameOrType, classIndex=0)` [源码:74](../../eyes/src/engine/core/Engine.js#L74)：当前操作：写入 无直接字段写入；返回 void 0===entityName\|\|null===scene?scene:scene.get(entityName,itemNameOrType,classIndex)。
- `getViewport(viewportName)` [源码:78](../../eyes/src/engine/core/Engine.js#L78)：当前操作：写入 无直接字段写入；返回 this._viewports.get(PioneerPublicApi.Viewport,viewportName)。
- `getViewportAt(viewportIndex)` [源码:81](../../eyes/src/engine/core/Engine.js#L81)：当前操作：写入 无直接字段写入；返回 this._viewports.getAt(viewportIndex)。
- `getNumViewports()` [源码:84](../../eyes/src/engine/core/Engine.js#L84)：当前操作：写入 无直接字段写入；返回 this._viewports.getSize()。
- `addViewport(viewportName)` [源码:87](../../eyes/src/engine/core/Engine.js#L87)：当前操作：写入 无直接字段写入；返回 this._viewports.add(PioneerPublicApi.Viewport,viewportName)。
- `removeViewport(viewportOrName)` [源码:90](../../eyes/src/engine/core/Engine.js#L90)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getTime()` [源码:93](../../eyes/src/engine/core/Engine.js#L93)：当前操作：写入 无直接字段写入；返回 this._time。
- `setTime(time)` [源码:96](../../eyes/src/engine/core/Engine.js#L96)：当前操作：写入 _time；返回 无显式返回。
- `getTimeRate()` [源码:99](../../eyes/src/engine/core/Engine.js#L99)：当前操作：写入 无直接字段写入；返回 this._timeRate。
- `setTimeRate(timeRate)` [源码:102](../../eyes/src/engine/core/Engine.js#L102)：当前操作：写入 _timeRate；返回 无显式返回。
- `getFPS()` [源码:105](../../eyes/src/engine/core/Engine.js#L105)：当前操作：写入 无直接字段写入；返回 this._fps.getFPS()。
- `getFPSLimit()` [源码:108](../../eyes/src/engine/core/Engine.js#L108)：当前操作：写入 无直接字段写入；返回 this._fpsLimit。
- `setFPSLimit(fpsLimit)` [源码:111](../../eyes/src/engine/core/Engine.js#L111)：当前操作：写入 _fpsLimit；返回 无显式返回。
- `getDeltaTime()` [源码:114](../../eyes/src/engine/core/Engine.js#L114)：当前操作：写入 无直接字段写入；返回 this._realDeltaTime。
- `waitUntilNextFrame()` [源码:118](../../eyes/src/engine/core/Engine.js#L118)：一次性回调在帧尾兑现，调用者随后观察的是本帧更新后的场景状态。
- `addCallback(callback, recurring)` [源码:125](../../eyes/src/engine/core/Engine.js#L125)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeCallback(callback)` [源码:131](../../eyes/src/engine/core/Engine.js#L131)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__getThreeJsRenderer()` [源码:134](../../eyes/src/engine/core/Engine.js#L134)：当前操作：写入 无直接字段写入；返回 this._threeJsRenderer。
- `_loop()` [源码:138](../../eyes/src/engine/core/Engine.js#L138)：限帧时不推进上一帧时间；真正执行帧时才更新时间与输入状态。回调删除延后到下一次回调遍历前，避免遍历中删项。

## `eyes/src/engine/core/Entity-567.js`

太阳系实体配置工厂：注册声明式实体，创建组件/控制器/父级时间表，按组创建，并在失败时回滚实体。。[源码](../../eyes/src/engine/core/Entity-567.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Entity-567-js)

### `Entity`

太阳系实体配置工厂：注册声明式实体，创建组件/控制器/父级时间表，按组创建，并在失败时回滚实体。。父类 `无`。

- `static register(entityOptionsByName)` [源码:5](../../eyes/src/engine/core/Entity-567.js#L5)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static create(entityName, scene, creationOptions)` [源码:8](../../eyes/src/engine/core/Entity-567.js#L8)：当前操作：写入 无直接字段写入；返回 this.createFromOptions(entityName,entityOptions,scene,creationOptions)。
- `static createFromOptions(entityName, entityOptions, scene, creationOptions)` [源码:13](../../eyes/src/engine/core/Entity-567.js#L13)：当前操作：写入 无直接字段写入；返回 entity。
- `static getEntityOptions(entityName)` [源码:182](../../eyes/src/engine/core/Entity-567.js#L182)：当前操作：写入 无直接字段写入；返回 Entity._entities.get(entityName)。
- `static getEntityNamesInGroup(groupQuery)` [源码:185](../../eyes/src/engine/core/Entity-567.js#L185)：当前操作：写入 无直接字段写入；返回 set。
- `static getGroups()` [源码:199](../../eyes/src/engine/core/Entity-567.js#L199)：当前操作：写入 无直接字段写入；返回 set。
- `static createGroup(groupQuery, scene, creationOptions)` [源码:207](../../eyes/src/engine/core/Entity-567.js#L207)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/Entity-62.js`

运行时场景实体：拥有父子层级、当前/上帧状态、控制器/组件集合、覆盖范围及各相机投影缓存。。[源码](../../eyes/src/engine/core/Entity-62.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Entity-62-js)

### `Entity`

实体拥有组件、控制器与父子关系；状态相对父级存储，相机缓存按 camera 分开，并在换父级时递归清理。。父类 `PioneerPublicApi.CollectionItem`。

- `constructor(entityName, scene)` [源码:5](../../eyes/src/engine/core/Entity-62.js#L5)：当前操作：写入 _cameraDepths、_cameraSpacePosition、_canOcclude、_childChangedCallbacks、_children、_components、_controllers、_destroyed、_disabledByAncestor、_enabled、_extentsRadius、_greatestPixelSpaceExtentsRadius、_groundComponent、_isInOrientationCoverage、_isInPositionCoverage、_lastParent、_lastState、_leastCameraDepth、_normalSpaceExtentsRadius、_normalSpacePosition、_occlusionRadius、_orientationCoverage、_parent、_parentChangedCallbacks、_parentingTable、_pixelSpaceExtentsRadius、_pixelSpacePosition、_positionCoverage、_state；返回 无显式返回。
- `getScene()` [源码:37](../../eyes/src/engine/core/Entity-62.js#L37)：当前操作：写入 无直接字段写入；返回 this.__getCollectionParent()。
- `isEnabled()` [源码:40](../../eyes/src/engine/core/Entity-62.js#L40)：当前操作：写入 无直接字段写入；返回 this._enabled&&!this._disabledByAncestor。
- `isDisabledByAncestor()` [源码:43](../../eyes/src/engine/core/Entity-62.js#L43)：当前操作：写入 无直接字段写入；返回 this._disabledByAncestor。
- `setEnabled(enabled)` [源码:46](../../eyes/src/engine/core/Entity-62.js#L46)：当前操作：写入 _enabled；返回 无显式返回。
- `_updateEnabled()` [源码:49](../../eyes/src/engine/core/Entity-62.js#L49)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateDisabledByAncestor()` [源码:54](../../eyes/src/engine/core/Entity-62.js#L54)：当前操作：写入 _disabledByAncestor；返回 无显式返回。
- `isDestroyed()` [源码:66](../../eyes/src/engine/core/Entity-62.js#L66)：当前操作：写入 无直接字段写入；返回 this._destroyed。
- `getPosition()` [源码:69](../../eyes/src/engine/core/Entity-62.js#L69)：当前操作：写入 无直接字段写入；返回 this._state.position。
- `setPosition(position)` [源码:72](../../eyes/src/engine/core/Entity-62.js#L72)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getVelocity()` [源码:75](../../eyes/src/engine/core/Entity-62.js#L75)：当前操作：写入 无直接字段写入；返回 this._state.velocity。
- `setVelocity(velocity)` [源码:78](../../eyes/src/engine/core/Entity-62.js#L78)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getOrientation()` [源码:81](../../eyes/src/engine/core/Entity-62.js#L81)：当前操作：写入 无直接字段写入；返回 this._state.orientation。
- `setOrientation(orientation)` [源码:84](../../eyes/src/engine/core/Entity-62.js#L84)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getAngularVelocity()` [源码:87](../../eyes/src/engine/core/Entity-62.js#L87)：当前操作：写入 无直接字段写入；返回 this._state.angularVelocity。
- `setAngularVelocity(angularVelocity)` [源码:90](../../eyes/src/engine/core/Entity-62.js#L90)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getLastPosition()` [源码:93](../../eyes/src/engine/core/Entity-62.js#L93)：当前操作：写入 无直接字段写入；返回 this._lastState.position。
- `getLastVelocity()` [源码:96](../../eyes/src/engine/core/Entity-62.js#L96)：当前操作：写入 无直接字段写入；返回 this._lastState.velocity。
- `getLastOrientation()` [源码:99](../../eyes/src/engine/core/Entity-62.js#L99)：当前操作：写入 无直接字段写入；返回 this._lastState.orientation。
- `getLastAngularVelocity()` [源码:102](../../eyes/src/engine/core/Entity-62.js#L102)：当前操作：写入 无直接字段写入；返回 this._lastState.angularVelocity。
- `getPositionRelativeToEntity(output, localPosition, targetEntity, time)` [源码:106](../../eyes/src/engine/core/Entity-62.js#L106)：先累加源端到共同祖先的偏移，再减去目标端偏移；显式时刻沿 parentingTable 查父级。池对象在各分支按原顺序归还。
- `getVelocityRelativeToEntity(output, localVelocity, targetEntity, time)` [源码:168](../../eyes/src/engine/core/Entity-62.js#L168)：输入局部速度，加减祖先链速度得到目标实体坐标系的速度；保留原有端点计入方式与早退路径。
- `getPositionAtTime(output, time)` [源码:211](../../eyes/src/engine/core/Entity-62.js#L211)：存在修改该状态的控制器时，只执行覆盖目标时刻的控制器；有控制器但不覆盖时刻时保留 NaN，而非回退当前状态。
- `getVelocityAtTime(output, time)` [源码:224](../../eyes/src/engine/core/Entity-62.js#L224)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getOrientationAtTime(output, time)` [源码:237](../../eyes/src/engine/core/Entity-62.js#L237)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getDistanceTo(targetEntity, fromSurface, time)` [源码:250](../../eyes/src/engine/core/Entity-62.js#L250)：当前操作：写入 无直接字段写入；返回 distance。
- `getOcclusionRadius()` [源码:284](../../eyes/src/engine/core/Entity-62.js#L284)：当前操作：写入 无直接字段写入；返回 this._occlusionRadius。
- `getExtentsRadius()` [源码:287](../../eyes/src/engine/core/Entity-62.js#L287)：当前操作：写入 无直接字段写入；返回 this._extentsRadius。
- `setOcclusionRadius(occlusionRadius)` [源码:290](../../eyes/src/engine/core/Entity-62.js#L290)：当前操作：写入 _occlusionRadius；返回 无显式返回。
- `setExtentsRadius(extentsRadius)` [源码:293](../../eyes/src/engine/core/Entity-62.js#L293)：当前操作：写入 _extentsRadius；返回 无显式返回。
- `getGroundComponent()` [源码:296](../../eyes/src/engine/core/Entity-62.js#L296)：当前操作：写入 无直接字段写入；返回 this._groundComponent。
- `__updateGroundComponent()` [源码:299](../../eyes/src/engine/core/Entity-62.js#L299)：当前操作：写入 _groundComponent；返回 无显式返回。
- `getPositionCoverage()` [源码:309](../../eyes/src/engine/core/Entity-62.js#L309)：当前操作：写入 无直接字段写入；返回 this._positionCoverage。
- `getOrientationCoverage()` [源码:312](../../eyes/src/engine/core/Entity-62.js#L312)：当前操作：写入 无直接字段写入；返回 this._orientationCoverage。
- `isInPositionCoverage()` [源码:315](../../eyes/src/engine/core/Entity-62.js#L315)：当前操作：写入 无直接字段写入；返回 this._isInPositionCoverage。
- `isInOrientationCoverage()` [源码:318](../../eyes/src/engine/core/Entity-62.js#L318)：当前操作：写入 无直接字段写入；返回 this._isInOrientationCoverage。
- `__updateLastState()` [源码:321](../../eyes/src/engine/core/Entity-62.js#L321)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateCoverage()` [源码:328](../../eyes/src/engine/core/Entity-62.js#L328)：合并启用控制器的覆盖；无对应控制器时使用无限覆盖，再由 parentingTable 的首尾空父级约束位置覆盖。
- `canOcclude()` [源码:355](../../eyes/src/engine/core/Entity-62.js#L355)：当前操作：写入 无直接字段写入；返回 this._canOcclude。
- `setCanOcclude(canOcclude)` [源码:358](../../eyes/src/engine/core/Entity-62.js#L358)：当前操作：写入 _canOcclude；返回 无显式返回。
- `isOccludingPosition(camera, cameraSpacePosition)` [源码:361](../../eyes/src/engine/core/Entity-62.js#L361)：当前操作：写入 无直接字段写入；返回 false、occludes。
- `getParent()` [源码:371](../../eyes/src/engine/core/Entity-62.js#L371)：当前操作：写入 无直接字段写入；返回 this._parent。
- `getParentAtTime(time)` [源码:374](../../eyes/src/engine/core/Entity-62.js#L374)：当前操作：写入 无直接字段写入；返回 entryIndex<this._parentingTable.length&&time===this._parentingTable[entryIndex][0]?this._parentingTable[entryIndex][1]:entryIndex>0?this._parentingTable[entryIndex-1][1]:this._parentingTable.length>0?"":null!==this._pare。
- `setParent(newParent)` [源码:379](../../eyes/src/engine/core/Entity-62.js#L379)：换父级前尽量保留世界位置；先更新父子集合与相机缓存，再按旧父级移除、新父级加入的顺序通知。
- `_clearCameraReferences()` [源码:399](../../eyes/src/engine/core/Entity-62.js#L399)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getNumChildren()` [源码:411](../../eyes/src/engine/core/Entity-62.js#L411)：当前操作：写入 无直接字段写入；返回 this._children.length。
- `getChild(childIndex)` [源码:414](../../eyes/src/engine/core/Entity-62.js#L414)：当前操作：写入 无直接字段写入；返回 this._children[childIndex]。
- `getLowestCommonAncestor(targetEntity)` [源码:417](../../eyes/src/engine/core/Entity-62.js#L417)：当前操作：写入 无直接字段写入；返回 null、sourceAncestor。
- `getLowestCommonAncestorAtTime(targetEntity, time)` [源码:452](../../eyes/src/engine/core/Entity-62.js#L452)：当前操作：写入 无直接字段写入；返回 null、sourceAncestor。
- `getNumParentingTableEntries()` [源码:500](../../eyes/src/engine/core/Entity-62.js#L500)：当前操作：写入 无直接字段写入；返回 this._parentingTable.length。
- `getParentingTableEntry(entryIndex)` [源码:503](../../eyes/src/engine/core/Entity-62.js#L503)：当前操作：写入 无直接字段写入；返回 this._parentingTable[entryIndex]。
- `addParentingTableEntry(startTime, parentName)` [源码:506](../../eyes/src/engine/core/Entity-62.js#L506)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeParentingTableEntry(entryIndex)` [源码:510](../../eyes/src/engine/core/Entity-62.js#L510)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `clearParentingTableEntries()` [源码:514](../../eyes/src/engine/core/Entity-62.js#L514)：当前操作：写入 _parentingTable；返回 无显式返回。
- `addParentChangedCallback(callback)` [源码:518](../../eyes/src/engine/core/Entity-62.js#L518)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeParentChangedCallback(callback)` [源码:521](../../eyes/src/engine/core/Entity-62.js#L521)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addChildChangedCallback(callback)` [源码:525](../../eyes/src/engine/core/Entity-62.js#L525)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeChildChangedCallback(callback)` [源码:528](../../eyes/src/engine/core/Entity-62.js#L528)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getComponent(componentType, nameOrClassIndex)` [源码:532](../../eyes/src/engine/core/Entity-62.js#L532)：当前操作：写入 无直接字段写入；返回 this._components.get(componentType,nameOrClassIndex)。
- `getComponentAt(componentIndex)` [源码:535](../../eyes/src/engine/core/Entity-62.js#L535)：当前操作：写入 无直接字段写入；返回 this._components.getAt(componentIndex)。
- `getNumComponents()` [源码:538](../../eyes/src/engine/core/Entity-62.js#L538)：当前操作：写入 无直接字段写入；返回 this._components.getSize()。
- `addComponent(componentType, componentName="")` [源码:541](../../eyes/src/engine/core/Entity-62.js#L541)：当前操作：写入 无直接字段写入；返回 component。
- `removeComponent(componentOrName)` [源码:546](../../eyes/src/engine/core/Entity-62.js#L546)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `clearComponents()` [源码:550](../../eyes/src/engine/core/Entity-62.js#L550)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getController(controllerType, nameOrClassIndex)` [源码:553](../../eyes/src/engine/core/Entity-62.js#L553)：当前操作：写入 无直接字段写入；返回 this._controllers.get(controllerType,nameOrClassIndex)。
- `getControllerAt(controllerIndex)` [源码:556](../../eyes/src/engine/core/Entity-62.js#L556)：当前操作：写入 无直接字段写入；返回 this._controllers.getAt(controllerIndex)。
- `getNumControllers()` [源码:559](../../eyes/src/engine/core/Entity-62.js#L559)：当前操作：写入 无直接字段写入；返回 this._controllers.getSize()。
- `addController(controllerType, controllerName="", beforeController)` [源码:562](../../eyes/src/engine/core/Entity-62.js#L562)：当前操作：写入 无直接字段写入；返回 controller。
- `removeController(controllerOrName)` [源码:567](../../eyes/src/engine/core/Entity-62.js#L567)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `clearControllers()` [源码:571](../../eyes/src/engine/core/Entity-62.js#L571)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getCameraSpacePosition(camera)` [源码:575](../../eyes/src/engine/core/Entity-62.js#L575)：当前操作：写入 无直接字段写入；返回 void 0!==position?position:PioneerPublicApi.Vector3.NaN。
- `getNormalSpacePosition(camera)` [源码:579](../../eyes/src/engine/core/Entity-62.js#L579)：当前操作：写入 无直接字段写入；返回 void 0!==position?position:PioneerPublicApi.Vector3.NaN。
- `getPixelSpacePosition(camera)` [源码:583](../../eyes/src/engine/core/Entity-62.js#L583)：当前操作：写入 无直接字段写入；返回 void 0!==position?position:PioneerPublicApi.Vector2.NaN。
- `getNormalSpaceOcclusionRadius(camera)` [源码:587](../../eyes/src/engine/core/Entity-62.js#L587)：当前操作：写入 无直接字段写入；返回 0!==this._extentsRadius?this.getNormalSpaceExtentsRadius(camera)*this._occlusionRadius/this._extentsRadius:0。
- `getNormalSpaceExtentsRadius(camera)` [源码:590](../../eyes/src/engine/core/Entity-62.js#L590)：当前操作：写入 无直接字段写入；返回 void 0!==radius?radius:Number.NaN。
- `getPixelSpaceOcclusionRadius(camera)` [源码:594](../../eyes/src/engine/core/Entity-62.js#L594)：当前操作：写入 无直接字段写入；返回 0!==this._extentsRadius?this.getPixelSpaceExtentsRadius(camera)*this._occlusionRadius/this._extentsRadius:0。
- `getPixelSpaceExtentsRadius(camera)` [源码:597](../../eyes/src/engine/core/Entity-62.js#L597)：当前操作：写入 无直接字段写入；返回 void 0!==radius?radius:Number.NaN。
- `getGreatestPixelSpaceOcclusionRadius()` [源码:601](../../eyes/src/engine/core/Entity-62.js#L601)：当前操作：写入 无直接字段写入；返回 0!==this._extentsRadius?this.getGreatestPixelSpaceExtentsRadius()*this._occlusionRadius/this._extentsRadius:0。
- `getGreatestPixelSpaceExtentsRadius()` [源码:604](../../eyes/src/engine/core/Entity-62.js#L604)：当前操作：写入 无直接字段写入；返回 this._greatestPixelSpaceExtentsRadius。
- `getLeastCameraDepth()` [源码:607](../../eyes/src/engine/core/Entity-62.js#L607)：当前操作：写入 无直接字段写入；返回 this._leastCameraDepth。
- `__setCameraDependentVariables(camera, cameraSpacePosition, cameraDepth)` [源码:610](../../eyes/src/engine/core/Entity-62.js#L610)：当前操作：写入 无直接字段写入；返回 void。
- `__removeCameraDependents(camera)` [源码:628](../../eyes/src/engine/core/Entity-62.js#L628)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `get(itemNameOrType, classIndex=0)` [源码:637](../../eyes/src/engine/core/Entity-62.js#L637)：当前操作：写入 无直接字段写入；返回 component\|\|this._controllers.getAny(itemNameOrType,classIndex)。
- `getLoadedPromise(forceLoaded=false, timeout=Number.POSITIVE_INFINITY)` [源码:641](../../eyes/src/engine/core/Entity-62.js#L641)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `waitTillInPlace(time, timeout=Number.POSITIVE_INFINITY)` [源码:656](../../eyes/src/engine/core/Entity-62.js#L656)：当前操作：写入 无直接字段写入；返回 (0,PioneerPublicApi.waitUntil)(()=>{if(this.getPositionCoverage().isNaN()\|\|this.getOrientationCoverage().isNaN())return false;time??=this.getScene().getEngine().getTime();if(!(this.getPositionCoverage().contains(time)&&t。
- `toString()` [源码:672](../../eyes/src/engine/core/Entity-62.js#L672)：当前操作：写入 无直接字段写入；返回 this.getName()。
- `__destroy()` [源码:676](../../eyes/src/engine/core/Entity-62.js#L676)：先解除层级关系，再销毁控制器和组件；这里保留原有遍历顺序，未混入子数组变动相关修复。
- `__updateParent(time)` [源码:684](../../eyes/src/engine/core/Entity-62.js#L684)：当前操作：写入 _lastParent；返回 无显式返回。
- `__updateIsInCoverages(time)` [源码:692](../../eyes/src/engine/core/Entity-62.js#L692)：当前操作：写入 _isInOrientationCoverage、_isInPositionCoverage；返回 无显式返回。
- `__updateVisuals()` [源码:697](../../eyes/src/engine/core/Entity-62.js#L697)：当前操作：写入 _greatestPixelSpaceExtentsRadius、_leastCameraDepth；返回 无显式返回。
- `__updateCameraVariables(camera, previousEntity, walkingToParent, cameraDepth)` [源码:714](../../eyes/src/engine/core/Entity-62.js#L714)：从相机实体沿父子树传播：向父级走时减去前一实体位置，向子级走时加自身位置；previousEntity 防止立即折返。
- `__prepareForRender(camera)` [源码:732](../../eyes/src/engine/core/Entity-62.js#L732)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static _isStartTimeLess(leftEntry, rightEntry)` [源码:738](../../eyes/src/engine/core/Entity-62.js#L738)：当前操作：写入 无直接字段写入；返回 leftEntry[0]<rightEntry[0]。
- `static _isStartTimeEqual(leftEntry, rightEntry)` [源码:741](../../eyes/src/engine/core/Entity-62.js#L741)：当前操作：写入 无直接字段写入；返回 leftEntry[0]===rightEntry[0]。
- `static isStartTimeLessThanTime(entry, time)` [源码:744](../../eyes/src/engine/core/Entity-62.js#L744)：当前操作：写入 无直接字段写入；返回 entry[0]<time。

### `EntityState`

运行时实体的位置、速度、姿态和角速度快照。。父类 `无`。

- `constructor()` [源码:782](../../eyes/src/engine/core/Entity-62.js#L782)：当前操作：写入 angularVelocity、orientation、position、velocity；返回 无显式返回。

## `eyes/src/engine/core/EntityEntry-699.js`

声明式实体目录，注册 1 个实体/参考系（如 moon），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/EntityEntry-699.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-EntityEntry-699-js)

## `eyes/src/engine/core/EntityEntry-700.js`

声明式实体目录，注册 8 个实体/参考系（如 adrastea、amalthea、callisto、europa、ganymede、io），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/EntityEntry-700.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-EntityEntry-700-js)

## `eyes/src/engine/core/EntityEntry-702.js`

声明式实体目录，注册 2 个实体/参考系（如 phobos、deimos），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/EntityEntry-702.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-EntityEntry-702-js)

## `eyes/src/engine/core/EntityEntry-706.js`

声明式实体目录，注册 5 个实体/参考系（如 ariel、miranda、oberon、titania、umbriel），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/EntityEntry-706.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-EntityEntry-706-js)

## `eyes/src/engine/core/EntityItem.js`

实体所属组件/控制器的公共持有关系和启用/销毁接口。。[源码](../../eyes/src/engine/core/EntityItem.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-EntityItem-js)

### `EntityItem`

实体所属组件/控制器的公共持有关系和启用/销毁接口。。父类 `PioneerPublicApi.CollectionItem`。

- `constructor(name, entity)` [源码:5](../../eyes/src/engine/core/EntityItem.js#L5)：当前操作：写入 _destroyed、_enabled；返回 无显式返回。
- `getEntity()` [源码:10](../../eyes/src/engine/core/EntityItem.js#L10)：当前操作：写入 无直接字段写入；返回 this.__getCollectionParent()。
- `getEngine()` [源码:13](../../eyes/src/engine/core/EntityItem.js#L13)：当前操作：写入 无直接字段写入；返回 this.getEntity().getScene().getEngine()。
- `isDestroyed()` [源码:16](../../eyes/src/engine/core/EntityItem.js#L16)：当前操作：写入 无直接字段写入；返回 this._destroyed。
- `__destroy()` [源码:19](../../eyes/src/engine/core/EntityItem.js#L19)：当前操作：写入 _destroyed；返回 无显式返回。
- `isEnabled()` [源码:23](../../eyes/src/engine/core/EntityItem.js#L23)：当前操作：写入 无直接字段写入；返回 this._enabled。
- `setEnabled(enabled)` [源码:26](../../eyes/src/engine/core/EntityItem.js#L26)：当前操作：写入 _enabled；返回 无显式返回。
- `__update()` [源码:29](../../eyes/src/engine/core/EntityItem.js#L29)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/EntityRef.js`

依据实体名懒解析引用，在对象销毁/禁用/改名后重新查找。。[源码](../../eyes/src/engine/core/EntityRef.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-EntityRef-js)

### `EntityRef`

依据实体名懒解析引用，在对象销毁/禁用/改名后重新查找。。父类 `PioneerPublicApi.BaseRef`。

- `constructor(scene, name="")` [源码:5](../../eyes/src/engine/core/EntityRef.js#L5)：当前操作：写入 _name、_scene；返回 无显式返回。
- `getName()` [源码:10](../../eyes/src/engine/core/EntityRef.js#L10)：当前操作：写入 无直接字段写入；返回 this._name。
- `setName(name)` [源码:13](../../eyes/src/engine/core/EntityRef.js#L13)：当前操作：写入 _name；返回 无显式返回。
- `update()` [源码:16](../../eyes/src/engine/core/EntityRef.js#L16)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/EntityUtils.js`

批量实体检索、层级和场景状态操作工具。。[源码](../../eyes/src/engine/core/EntityUtils.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-EntityUtils-js)

### `EntityUtils`

批量实体检索、层级和场景状态操作工具。。父类 `无`。

- `static addGeyser(entity, lengthScale, opacity, particleCount, speedScale, spreadScale, origin, direction)` [源码:5](../../eyes/src/engine/core/EntityUtils.js#L5)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static showSubObjectDuringInterval(entity, objectName, startTime, endTime)` [源码:17](../../eyes/src/engine/core/EntityUtils.js#L17)：当前操作：写入 无直接字段写入；返回 void。

## `eyes/src/engine/core/FPS.js`

累计帧时间计算刷新率。。[源码](../../eyes/src/engine/core/FPS.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-FPS-js)

### `FPS`

帧率使用固定长度循环采样数组，返回样本数除以累计秒数；未填满数组及更改样本数后的原初始化行为保持不变。。父类 `无`。

- `getNumberOfSamples()` [源码:4](../../eyes/src/engine/core/FPS.js#L4)：当前操作：写入 无直接字段写入；返回 this._numberOfSamples。
- `setNumberOfSamples(numberOfSamples)` [源码:7](../../eyes/src/engine/core/FPS.js#L7)：当前操作：写入 _numberOfSamples、_samples；返回 无显式返回。
- `getFPS()` [源码:11](../../eyes/src/engine/core/FPS.js#L11)：当前操作：写入 无直接字段写入；返回 this._samples.length/totalSeconds。
- `update(deltaSeconds)` [源码:16](../../eyes/src/engine/core/FPS.js#L16)：当前操作：写入 _index、_samples[this._index]；返回 无显式返回。

## `eyes/src/engine/core/FastIterable.js`

为数组式快速遍历容器提供索引取值/大小等基础接口。。[源码](../../eyes/src/engine/core/FastIterable.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-FastIterable-js)

### `FastIterable`

快速集合的空基类，仅作类型继承标记，不提供迭代协议或隐藏数据结构。。父类 `无`。


## `eyes/src/engine/core/FastMap.js`

组合键查找与连续数组遍历的映射容器。。[源码](../../eyes/src/engine/core/FastMap.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-FastMap-js)

### `FastMap`

连续 entries 数组与 key→index Map 同步；删除压紧数组并修正后续索引，sort 的交换回调即时更新索引。。父类 `PioneerPublicApi.FastIterable`。

- `constructor(initialEntries)` [源码:5](../../eyes/src/engine/core/FastMap.js#L5)：当前操作：写入 _entries、_keyMap；返回 无显式返回。
- `has(key)` [源码:17](../../eyes/src/engine/core/FastMap.js#L17)：当前操作：写入 无直接字段写入；返回 this._keyMap.has(key)。
- `get(key)` [源码:20](../../eyes/src/engine/core/FastMap.js#L20)：当前操作：写入 无直接字段写入；返回 this._entries[index].value。
- `set(key, value)` [源码:24](../../eyes/src/engine/core/FastMap.js#L24)：当前操作：写入 _entries[index].value；返回 无显式返回。
- `delete(key)` [源码:36](../../eyes/src/engine/core/FastMap.js#L36)：当前操作：写入 无直接字段写入；返回 true、false。
- `clear()` [源码:48](../../eyes/src/engine/core/FastMap.js#L48)：当前操作：写入 _entries；返回 无显式返回。
- `getAt(index)` [源码:52](../../eyes/src/engine/core/FastMap.js#L52)：当前操作：写入 无直接字段写入；返回 this._entries[index]。
- `getSize()` [源码:55](../../eyes/src/engine/core/FastMap.js#L55)：当前操作：写入 无直接字段写入；返回 this._entries.length。
- `sort(isLess)` [源码:58](../../eyes/src/engine/core/FastMap.js#L58)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/FastSet.js`

组合成员查找与连续数组遍历的集合容器。。[源码](../../eyes/src/engine/core/FastSet.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-FastSet-js)

### `FastSet`

连续 values 数组与 value→index Map 同步；add 去重且返回 this，删除压紧后修正索引，构造输入的既有重复行为保留。。父类 `PioneerPublicApi.FastIterable`。

- `constructor(initialValues)` [源码:5](../../eyes/src/engine/core/FastSet.js#L5)：当前操作：写入 _valueMap、_values；返回 无显式返回。
- `has(value)` [源码:14](../../eyes/src/engine/core/FastSet.js#L14)：当前操作：写入 无直接字段写入；返回 this._valueMap.has(value)。
- `add(value)` [源码:17](../../eyes/src/engine/core/FastSet.js#L17)：当前操作：写入 无直接字段写入；返回 this。
- `delete(value)` [源码:24](../../eyes/src/engine/core/FastSet.js#L24)：当前操作：写入 无直接字段写入；返回 true、false。
- `clear()` [源码:36](../../eyes/src/engine/core/FastSet.js#L36)：当前操作：写入 _values；返回 无显式返回。
- `getAt(index)` [源码:40](../../eyes/src/engine/core/FastSet.js#L40)：当前操作：写入 无直接字段写入；返回 this._values[index]。
- `getSize()` [源码:43](../../eyes/src/engine/core/FastSet.js#L43)：当前操作：写入 无直接字段写入；返回 this._values.length。
- `sort(isLess)` [源码:46](../../eyes/src/engine/core/FastSet.js#L46)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/Features.js`

创建行星/实体附加可视特征及其配置。。[源码](../../eyes/src/engine/core/Features.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Features-js)

### `Features`

创建行星/实体附加可视特征及其配置。。父类 `无`。

- `static setEnabled(scene, entityId, featureId, isEnabled)` [源码:6](../../eyes/src/engine/core/Features.js#L6)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static isEnabled(scene, entityId, featureId)` [源码:13](../../eyes/src/engine/core/Features.js#L13)：当前操作：写入 无直接字段写入；返回 getFeatureEnabled(scene)。
- `static setEnabledJupiterAuroras(scene, isEnabled)` [源码:20](../../eyes/src/engine/core/Features.js#L20)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static isEnabledJupiterAuroras(scene)` [源码:26](../../eyes/src/engine/core/Features.js#L26)：当前操作：写入 无直接字段写入；返回 !!jupiterEntity&&null!==jupiterEntity.getComponent(Pioneer.ModelComponent,"auroras")。
- `static setEnabledJupiterMagnetosphere(scene, isEnabled)` [源码:30](../../eyes/src/engine/core/Features.js#L30)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static isEnabledJupiterMagnetosphere(scene)` [源码:36](../../eyes/src/engine/core/Features.js#L36)：当前操作：写入 无直接字段写入；返回 !!jupiterEntity&&null!==jupiterEntity.getComponent(Pioneer.ModelComponent,"magnetosphere")。
- `static setEnabledJupiterRadiationBelt(scene, isEnabled)` [源码:40](../../eyes/src/engine/core/Features.js#L40)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static isEnabledJupiterRadiationBelt(scene)` [源码:46](../../eyes/src/engine/core/Features.js#L46)：当前操作：写入 无直接字段写入；返回 false、true。
- `static setEnabledSaturnMagnetosphere(scene, isEnabled)` [源码:52](../../eyes/src/engine/core/Features.js#L52)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static isEnabledSaturnMagnetosphere(scene)` [源码:97](../../eyes/src/engine/core/Features.js#L97)：当前操作：写入 无直接字段写入；返回 null!==scene.getEntity("saturn_magnetosphere")。
- `static _createJupiterModelComponent(scene, featureDirectory, modelBasename)` [源码:100](../../eyes/src/engine/core/Features.js#L100)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/Geometry.js`

球面、射线、平面和几何交点/坐标转换算法。。[源码](../../eyes/src/engine/core/Geometry.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Geometry-js)

### `Geometry`

线球求交返回射线参数而非距离，direction 不要求单位向量；球面 LLA 角量为弧度，alt 是径向长度减半径。。父类 `无`。

- `static getLineSphereIntersectionWithSphereAtOrigin(lineOrigin, lineDirection, sphereRadius)` [源码:5](../../eyes/src/engine/core/Geometry.js#L5)：当前操作：写入 无直接字段写入；返回 discriminant<0?Number.NaN:(-originDirectionDot-Math.sqrt(discriminant))/directionMagnitudeSquared。
- `static getLineSphereIntersectionWithLineStartAtOrigin(intersectionOut, lineDirection, sphereCenter, sphereRadius)` [源码:12](../../eyes/src/engine/core/Geometry.js#L12)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static getLLAFromXYZOnSphere(llaOut, position, sphereRadius)` [源码:25](../../eyes/src/engine/core/Geometry.js#L25)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static getXYZFromLLAOnSphere(positionOut, lla, sphereRadius)` [源码:31](../../eyes/src/engine/core/Geometry.js#L31)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/Input.js`

收集键盘、鼠标、滚轮与多点触摸状态，识别活动视口并在帧末复位瞬时输入。。[源码](../../eyes/src/engine/core/Input.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Input-js)

### `Touch`

单个触点的当前位置与帧内输入状态。。父类 `无`。

- `constructor()` [源码:10](../../eyes/src/engine/core/Input.js#L10)：当前操作：写入 identifier、lastFramePosition、pressedPosition、pressedTime、thisFramePosition；返回 无显式返回。

### `Input`

收集键盘、鼠标、滚轮与多点触摸状态，识别活动视口并在帧末复位瞬时输入。。父类 `无`。

- `constructor(engine)` [源码:19](../../eyes/src/engine/core/Input.js#L19)：当前操作：写入 _activeViewport、_cursorPosition、_draggedOffset、_engine、_keysPressed、_maxSelectDistance、_maxSelectTime、_modifierKeysPressed、_rotatedOffset、_selected、_selectedPosition、_shiftPressed、_touches、_zoomedOffset；返回 无显式返回。
- `getActiveViewport()` [源码:209](../../eyes/src/engine/core/Input.js#L209)：当前操作：写入 无直接字段写入；返回 this._activeViewport。
- `getDraggedOffset()` [源码:212](../../eyes/src/engine/core/Input.js#L212)：当前操作：写入 无直接字段写入；返回 this._draggedOffset。
- `getZoomedOffset()` [源码:215](../../eyes/src/engine/core/Input.js#L215)：当前操作：写入 无直接字段写入；返回 this._zoomedOffset。
- `getRotatedOffset()` [源码:218](../../eyes/src/engine/core/Input.js#L218)：当前操作：写入 无直接字段写入；返回 this._rotatedOffset。
- `isShiftPressed()` [源码:221](../../eyes/src/engine/core/Input.js#L221)：当前操作：写入 无直接字段写入；返回 this._shiftPressed。
- `isKeyPressed(key)` [源码:224](../../eyes/src/engine/core/Input.js#L224)：当前操作：写入 无直接字段写入；返回 this._keysPressed.has(key)。
- `isSelected()` [源码:227](../../eyes/src/engine/core/Input.js#L227)：当前操作：写入 无直接字段写入；返回 this._selected。
- `getSelectedPosition()` [源码:230](../../eyes/src/engine/core/Input.js#L230)：当前操作：写入 无直接字段写入；返回 this._selectedPosition。
- `getCursorPosition()` [源码:233](../../eyes/src/engine/core/Input.js#L233)：当前操作：写入 无直接字段写入；返回 this._cursorPosition。
- `__setActiveViewport(activeViewport)` [源码:236](../../eyes/src/engine/core/Input.js#L236)：当前操作：写入 _activeViewport；返回 无显式返回。
- `__resetStatesForNextFrame()` [源码:240](../../eyes/src/engine/core/Input.js#L240)：当前触点成为下一帧基准；每帧消费的点击/拖动/缩放/旋转清零，不清持续按键。
- `_updateActiveViewport()` [源码:250](../../eyes/src/engine/core/Input.js#L250)：当前操作：写入 _activeViewport；返回 无显式返回。

## `eyes/src/engine/core/Interval.js`

闭区间表示、包含/交集/并集和空值判定工具。。[源码](../../eyes/src/engine/core/Interval.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Interval-js)

### `Interval`

区间 contains 为左闭右开，接触端点不相交；空交集折叠到较大的下界，InfiniteNeg 用于累计包络。。父类 `无`。

- `constructor(min=0, max=0)` [源码:9](../../eyes/src/engine/core/Interval.js#L9)：当前操作：写入 _max、_min；返回 无显式返回。
- `get min()` [源码:13](../../eyes/src/engine/core/Interval.js#L13)：当前操作：写入 无直接字段写入；返回 this._min。
- `set min(min)` [源码:16](../../eyes/src/engine/core/Interval.js#L16)：当前操作：写入 _min；返回 无显式返回。
- `get max()` [源码:19](../../eyes/src/engine/core/Interval.js#L19)：当前操作：写入 无直接字段写入；返回 this._max。
- `set max(max)` [源码:22](../../eyes/src/engine/core/Interval.js#L22)：当前操作：写入 _max；返回 无显式返回。
- `toString()` [源码:25](../../eyes/src/engine/core/Interval.js#L25)：当前操作：写入 无直接字段写入；返回 ˋ[${this._min}, ${this._max}]ˋ。
- `isNaN()` [源码:28](../../eyes/src/engine/core/Interval.js#L28)：当前操作：写入 无直接字段写入；返回 this._min!=this._min\|\|this._max!=this._max。
- `copy(source)` [源码:31](../../eyes/src/engine/core/Interval.js#L31)：当前操作：写入 _max、_min；返回 无显式返回。
- `set(min, max)` [源码:35](../../eyes/src/engine/core/Interval.js#L35)：当前操作：写入 _max、_min；返回 无显式返回。
- `length()` [源码:39](../../eyes/src/engine/core/Interval.js#L39)：当前操作：写入 无直接字段写入；返回 this._max-this._min。
- `clamp(value)` [源码:42](../../eyes/src/engine/core/Interval.js#L42)：当前操作：写入 无直接字段写入；返回 Math.min(Math.max(this._min,value),this._max)。
- `expandTo(value)` [源码:45](../../eyes/src/engine/core/Interval.js#L45)：当前操作：写入 _max、_min；返回 无显式返回。
- `contains(value)` [源码:49](../../eyes/src/engine/core/Interval.js#L49)：当前操作：写入 无直接字段写入；返回 this._min<=value&&value<this._max。
- `intersects(other)` [源码:52](../../eyes/src/engine/core/Interval.js#L52)：当前操作：写入 无直接字段写入；返回 this._min<other.max&&other.min<this._max。
- `intersection(left, right)` [源码:55](../../eyes/src/engine/core/Interval.js#L55)：当前操作：写入 _max、_min；返回 无显式返回。
- `union(left, right)` [源码:62](../../eyes/src/engine/core/Interval.js#L62)：当前操作：写入 _max、_min；返回 无显式返回。

## `eyes/src/engine/core/JsonHelper.js`

将 JSON 风格配置转换到引擎对象并提取字段。。[源码](../../eyes/src/engine/core/JsonHelper.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-JsonHelper-js)

### `JsonHelper`

JSON 判定保持 JavaScript typeof 语义：number 不排除 NaN；对象排除 null 与数组，optional 属性只把 undefined 当缺省，集合检查逐项短路。。父类 `无`。

- `static isNumber(value)` [源码:4](../../eyes/src/engine/core/JsonHelper.js#L4)：当前操作：写入 无直接字段写入；返回 "number"==typeof value。
- `static isString(value)` [源码:7](../../eyes/src/engine/core/JsonHelper.js#L7)：当前操作：写入 无直接字段写入；返回 "string"==typeof value。
- `static isBoolean(value)` [源码:10](../../eyes/src/engine/core/JsonHelper.js#L10)：当前操作：写入 无直接字段写入；返回 "boolean"==typeof value。
- `static isObject(value)` [源码:13](../../eyes/src/engine/core/JsonHelper.js#L13)：当前操作：写入 无直接字段写入；返回 "object"==typeof value&&!JsonHelper.isArray(value)&&null!==value。
- `static isArray(value)` [源码:16](../../eyes/src/engine/core/JsonHelper.js#L16)：当前操作：写入 无直接字段写入；返回 Array.isArray(value)。
- `static isObjectOfStrings(object)` [源码:19](../../eyes/src/engine/core/JsonHelper.js#L19)：当前操作：写入 无直接字段写入；返回 false、true。
- `static isObjectOfNumbers(object)` [源码:24](../../eyes/src/engine/core/JsonHelper.js#L24)：当前操作：写入 无直接字段写入；返回 false、true。
- `static isObjectOfV(object, predicate)` [源码:29](../../eyes/src/engine/core/JsonHelper.js#L29)：当前操作：写入 无直接字段写入；返回 false、true。
- `static isArrayOfStrings(array)` [源码:34](../../eyes/src/engine/core/JsonHelper.js#L34)：当前操作：写入 无直接字段写入；返回 false、true。
- `static isArrayOfNumbers(array)` [源码:39](../../eyes/src/engine/core/JsonHelper.js#L39)：当前操作：写入 无直接字段写入；返回 false、true。
- `static isArrayOfBooleans(array)` [源码:44](../../eyes/src/engine/core/JsonHelper.js#L44)：当前操作：写入 无直接字段写入；返回 false、true。
- `static isArrayOfV(array, predicate)` [源码:49](../../eyes/src/engine/core/JsonHelper.js#L49)：当前操作：写入 无直接字段写入；返回 false、true。
- `static hasPropOfType(object, key, predicate)` [源码:54](../../eyes/src/engine/core/JsonHelper.js#L54)：当前操作：写入 无直接字段写入；返回 void 0!==propertyValue&&predicate(propertyValue)。
- `static hasOptionalPropOfType(object, key, predicate)` [源码:58](../../eyes/src/engine/core/JsonHelper.js#L58)：当前操作：写入 无直接字段写入；返回 void 0===propertyValue\|\|predicate(propertyValue)。

## `eyes/src/engine/core/KioskMode.js`

展台模式的界面及自动交互配置。。[源码](../../eyes/src/engine/core/KioskMode.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-KioskMode-js)

### `KioskMode`

展台模式的界面及自动交互配置。。父类 `Eyes.KioskBase`。

- `init()` [源码:6](../../eyes/src/engine/core/KioskMode.js#L6)：当前操作：写入 _router、camera；返回 无显式返回。
- `handleMaxInactivityTime()` [源码:16](../../eyes/src/engine/core/KioskMode.js#L16)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onWindowInteract()` [源码:20](../../eyes/src/engine/core/KioskMode.js#L20)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `startAutoplay()` [源码:24](../../eyes/src/engine/core/KioskMode.js#L24)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setupSpinController()` [源码:35](../../eyes/src/engine/core/KioskMode.js#L35)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/LabelQuadtree.js`

为空间标签布局维护四叉树并查询重叠区域。。[源码](../../eyes/src/engine/core/LabelQuadtree.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-LabelQuadtree-js)

### `LabelQuadtree`

为空间标签布局维护四叉树并查询重叠区域。。父类 `无`。

- `constructor(viewport)` [源码:6](../../eyes/src/engine/core/LabelQuadtree.js#L6)：当前操作：写入 _divBoundsAdjustmentFunction、_doOcclusions、_intersections、_isLessWeights、_isLessWeightsAndZ、_labelInfos、_labelNames、_labelNamesIndex、_quadtree、_viewport；返回 无显式返回。
- `destroy()` [源码:18](../../eyes/src/engine/core/LabelQuadtree.js#L18)：当前操作：写入 _labelInfos、_labelNames；返回 无显式返回。
- `getDoOcclusions()` [源码:26](../../eyes/src/engine/core/LabelQuadtree.js#L26)：当前操作：写入 无直接字段写入；返回 this._doOcclusions。
- `setDoOcclusions(doOcclusions)` [源码:29](../../eyes/src/engine/core/LabelQuadtree.js#L29)：当前操作：写入 _doOcclusions；返回 无显式返回。
- `addEntity(entity, weight)` [源码:35](../../eyes/src/engine/core/LabelQuadtree.js#L35)：当前操作：写入 _intersections[ˋ${entityName}-divˋ]、_intersections[entityName]、_labelInfos[entityName]；返回 void。
- `removeEntity(entityName)` [源码:51](../../eyes/src/engine/core/LabelQuadtree.js#L51)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getBounds(boundsName, outputBounds)` [源码:54](../../eyes/src/engine/core/LabelQuadtree.js#L54)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setBounds(boundsName, bounds)` [源码:57](../../eyes/src/engine/core/LabelQuadtree.js#L57)：当前操作：写入 _intersections[boundsName]；返回 无显式返回。
- `removeRect(boundsName)` [源码:63](../../eyes/src/engine/core/LabelQuadtree.js#L63)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setWeight(entityName, weight)` [源码:68](../../eyes/src/engine/core/LabelQuadtree.js#L68)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getIntersections(boundsName, outputIntersections)` [源码:74](../../eyes/src/engine/core/LabelQuadtree.js#L74)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setDivBoundsAdjustFunction(divBoundsAdjustmentFunction)` [源码:77](../../eyes/src/engine/core/LabelQuadtree.js#L77)：当前操作：写入 _divBoundsAdjustmentFunction；返回 无显式返回。
- `update()` [源码:80](../../eyes/src/engine/core/LabelQuadtree.js#L80)：当前操作：写入 _labelNamesIndex；返回 void。
- `_isLabelOccludedInDiv(divComponent)` [源码:130](../../eyes/src/engine/core/LabelQuadtree.js#L130)：当前操作：写入 无直接字段写入；返回 divComponent.getDiv().classList.contains(divComponent.getHiddenClass())。
- `_isLabelOccluded(divComponent)` [源码:133](../../eyes/src/engine/core/LabelQuadtree.js#L133)：当前操作：写入 无直接字段写入；返回 divComponent.getDiv().classList.contains(ˋ${divComponent.getHiddenClass()}ByLabelQuadtreeˋ)\|\|divComponent.getDiv().classList.contains(divComponent.getHiddenClass())。
- `_setLabelOcclusion(divComponent, isOccluded)` [源码:136](../../eyes/src/engine/core/LabelQuadtree.js#L136)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_isLessWeights(leftName, rightName)` [源码:139](../../eyes/src/engine/core/LabelQuadtree.js#L139)：当前操作：写入 无直接字段写入；返回 leftInfo.weight<rightInfo.weight。
- `_isLessWeightsAndZ(leftInfo, rightInfo)` [源码:144](../../eyes/src/engine/core/LabelQuadtree.js#L144)：当前操作：写入 无直接字段写入；返回 leftInfo.weight<rightInfo.weight、leftInfo.z>rightInfo.z、leftName.localeCompare(rightName)<0。

## `eyes/src/engine/core/LatLonAlt.js`

纬度、经度、高度值对象及其池化存储。。[源码](../../eyes/src/engine/core/LatLonAlt.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-LatLonAlt-js)

### `LatLonAlt`

lat/lon 内部为弧度，alt 长度单位由参考椭球决定；copy 只复制值，toString 可选择度显示。。父类 `无`。

- `constructor(lat=0, lon=0, alt=0)` [源码:7](../../eyes/src/engine/core/LatLonAlt.js#L7)：当前操作：写入 _alt、_lat、_lon；返回 无显式返回。
- `get lat()` [源码:12](../../eyes/src/engine/core/LatLonAlt.js#L12)：当前操作：写入 无直接字段写入；返回 this._lat。
- `set lat(lat)` [源码:15](../../eyes/src/engine/core/LatLonAlt.js#L15)：当前操作：写入 _lat；返回 无显式返回。
- `get lon()` [源码:18](../../eyes/src/engine/core/LatLonAlt.js#L18)：当前操作：写入 无直接字段写入；返回 this._lon。
- `set lon(lon)` [源码:21](../../eyes/src/engine/core/LatLonAlt.js#L21)：当前操作：写入 _lon；返回 无显式返回。
- `get alt()` [源码:24](../../eyes/src/engine/core/LatLonAlt.js#L24)：当前操作：写入 无直接字段写入；返回 this._alt。
- `set alt(alt)` [源码:27](../../eyes/src/engine/core/LatLonAlt.js#L27)：当前操作：写入 _alt；返回 无显式返回。
- `toString(useDegrees=false)` [源码:30](../../eyes/src/engine/core/LatLonAlt.js#L30)：当前操作：写入 无直接字段写入；返回 useDegrees?ˋ[${PioneerPublicApi.MathUtils.radToDeg(this._lat)}, ${PioneerPublicApi.MathUtils.radToDeg(this._lon)}, ${this._alt}]ˋ:ˋ[${this._lat}, ${this._lon}, ${this._alt}]ˋ。
- `copy(source)` [源码:33](../../eyes/src/engine/core/LatLonAlt.js#L33)：当前操作：写入 _alt、_lat、_lon；返回 无显式返回。
- `set(lat, lon, alt)` [源码:38](../../eyes/src/engine/core/LatLonAlt.js#L38)：当前操作：写入 _alt、_lat、_lon；返回 无显式返回。

## `eyes/src/engine/core/LineMesh.js`

构建宽线所需的顶点、索引和相邻点属性。。[源码](../../eyes/src/engine/core/LineMesh.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-LineMesh-js)

### `LineMesh`

构建宽线所需的顶点、索引和相邻点属性。。父类 `无`。

- `constructor(component)` [源码:5](../../eyes/src/engine/core/LineMesh.js#L5)：当前操作：写入 _component、_dashGapLength、_dashLength、_glowWidth、_orientation、_position、_scale、_threeJsMaterial、_threeJsMaterial.uniforms.dashGapLength.value、_threeJsMaterial.uniforms.dashLength.value、_threeJsMaterial.uniforms.glowWidth.value、_threeJsObjects；返回 无显式返回。
- `setPositions(positions)` [源码:21](../../eyes/src/engine/core/LineMesh.js#L21)：相邻线段端点相等时沿前后段连接，否则虚线累计长度从零开始；GPU 通过前后点扩展线宽。
- `setColors(colors)` [源码:87](../../eyes/src/engine/core/LineMesh.js#L87)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setWidths(widths)` [源码:107](../../eyes/src/engine/core/LineMesh.js#L107)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setDashLength(dashLength, dashGapLength)` [源码:131](../../eyes/src/engine/core/LineMesh.js#L131)：当前操作：写入 _dashGapLength、_dashLength；返回 无显式返回。
- `setGlowWidth(glowWidth)` [源码:137](../../eyes/src/engine/core/LineMesh.js#L137)：当前操作：写入 _glowWidth；返回 无显式返回。
- `setScale(scale)` [源码:141](../../eyes/src/engine/core/LineMesh.js#L141)：当前操作：写入 _scale；返回 无显式返回。
- `prepareForRender(camera)` [源码:145](../../eyes/src/engine/core/LineMesh.js#L145)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_adjustVerticesInGeometries(vertexCount)` [源码:158](../../eyes/src/engine/core/LineMesh.js#L158)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setupThreeJsGeometry(geometry, vertexCount)` [源码:193](../../eyes/src/engine/core/LineMesh.js#L193)：每线段四顶点、六索引；正负 width 区分同一端点的左右侧，dashOffset 使用空间累计距离。

## `eyes/src/engine/core/LineShader.js`

声明 LineShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。。[源码](../../eyes/src/engine/core/LineShader.js)。语义状态：`verified-shader-source-format`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-LineShader-js)

## `eyes/src/engine/core/LoadIconEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。。[源码](../../eyes/src/engine/core/LoadIconEntry.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-LoadIconEntry-js)

## `eyes/src/engine/core/Mapping.js`

球面/立方体等纹理映射模式的数据与转换接口。。[源码](../../eyes/src/engine/core/Mapping.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Mapping-js)

### `Mapping`

映射切换先禁用其他类型，再并行等待全部操作；CMTS 先隐藏渲染，等待资源和瓦片完成后显示，保留各天体端点与平台分支。。父类 `无`。

- `static getOptions()` [源码:6](../../eyes/src/engine/core/Mapping.js#L6)：当前操作：写入 无直接字段写入；返回 mappingOptions。
- `static set(scene, entityName, mappingType, options)` [源码:9](../../eyes/src/engine/core/Mapping.js#L9)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static setEnabled(scene, entityName, mappingType, enabled, options)` [源码:18](../../eyes/src/engine/core/Mapping.js#L18)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static setBasic(scene, entityName, enabled)` [源码:24](../../eyes/src/engine/core/Mapping.js#L24)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static setCMTS(scene, entityName, enabled, options)` [源码:36](../../eyes/src/engine/core/Mapping.js#L36)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/MaterialUtils.js`

为组件创建材质并更新相机、光源、阴影及大气通用 uniforms。。[源码](../../eyes/src/engine/core/MaterialUtils.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-MaterialUtils-js)

### `MaterialUtils`

为组件创建材质并更新相机、光源、阴影及大气通用 uniforms。。父类 `无`。

- `static setLightSourceUniforms(materials, entity, camera)` [源码:5](../../eyes/src/engine/core/MaterialUtils.js#L5)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static setUniforms(materials, camera, entity, shadowRefs, atmosphere, groundIsSpheroid)` [源码:39](../../eyes/src/engine/core/MaterialUtils.js#L39)：只对实际存在的大气/环组件开启对应 define；shader 改变时才标 needsUpdate，uniform 更新保留相机空间约定。

## `eyes/src/engine/core/MaterialUtilsPhong.js`

构建 Phong 光照路径的材质/着色器参数。。[源码](../../eyes/src/engine/core/MaterialUtilsPhong.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-MaterialUtilsPhong-js)

### `MaterialUtilsPhong`

构建 Phong 光照路径的材质/着色器参数。。父类 `无`。

- `static get()` [源码:5](../../eyes/src/engine/core/MaterialUtilsPhong.js#L5)：当前操作：写入 无直接字段写入；返回 material。

## `eyes/src/engine/core/MaterialUtilsStandard.js`

构建 PBR/标准光照路径的材质/着色器参数。。[源码](../../eyes/src/engine/core/MaterialUtilsStandard.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-MaterialUtilsStandard-js)

### `MaterialUtilsStandard`

构建 PBR/标准光照路径的材质/着色器参数。。父类 `无`。

- `static get()` [源码:5](../../eyes/src/engine/core/MaterialUtilsStandard.js#L5)：当前操作：写入 无直接字段写入；返回 material。

## `eyes/src/engine/core/MathUtils.js`

提供角度、插值、限制、周期包裹及数值辅助函数。。[源码](../../eyes/src/engine/core/MathUtils.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-MathUtils-js)

### `MathUtils`

wrap 采用 [minimum,maximum) 区间并修正负余数；角度插值先跨 2π 选择短路径，算术常数及非有限输入行为不变。。父类 `无`。

- `static radToDeg(radians)` [源码:8](../../eyes/src/engine/core/MathUtils.js#L8)：当前操作：写入 无直接字段写入；返回 57.29577951308232*radians。
- `static degToRad(degrees)` [源码:11](../../eyes/src/engine/core/MathUtils.js#L11)：当前操作：写入 无直接字段写入；返回 .017453292519943295*degrees。
- `static angle(firstAngle, secondAngle)` [源码:14](../../eyes/src/engine/core/MathUtils.js#L14)：当前操作：写入 无直接字段写入；返回 (secondAngle=this.wrap(secondAngle,0,this.TwoPi))-firstAngle>this.Pi?firstAngle-secondAngle+this.TwoPi:firstAngle-secondAngle>this.Pi?secondAngle-firstAngle+this.TwoPi:Math.abs(secondAngle-firstAngle)。
- `static clamp(value, minimum, maximum)` [源码:18](../../eyes/src/engine/core/MathUtils.js#L18)：当前操作：写入 无直接字段写入；返回 Math.min(Math.max(minimum,value),maximum)。
- `static clamp01(value)` [源码:21](../../eyes/src/engine/core/MathUtils.js#L21)：当前操作：写入 无直接字段写入；返回 Math.min(Math.max(0,value),1)。
- `static wrap(value, minimum, maximum)` [源码:24](../../eyes/src/engine/core/MathUtils.js#L24)：当前操作：写入 无直接字段写入；返回 wrappedValue。
- `static wrapAngle(angle)` [源码:31](../../eyes/src/engine/core/MathUtils.js#L31)：当前操作：写入 无直接字段写入；返回 wrappedAngle。
- `static lerp(start, end, fraction)` [源码:38](../../eyes/src/engine/core/MathUtils.js#L38)：当前操作：写入 无直接字段写入；返回 (1-fraction)*start+fraction*end。
- `static lerpAngle(startAngle, endAngle, fraction)` [源码:41](../../eyes/src/engine/core/MathUtils.js#L41)：当前操作：写入 无直接字段写入；返回 this.wrap(this.lerp(startAngle,endAngle,fraction),-this.Pi,+this.Pi)。
- `static ceilPow2(value)` [源码:51](../../eyes/src/engine/core/MathUtils.js#L51)：当前操作：写入 无直接字段写入；返回 2**Math.ceil(Math.log(value)/Math.log(2))。

## `eyes/src/engine/core/MomentLocalesPrimary.cjs`

Moment 主要语言区域的第三方本地化定义和注册副作用。。[源码](../../eyes/src/engine/core/MomentLocalesPrimary.cjs)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-MomentLocalesPrimary-cjs)

## `eyes/src/engine/core/MomentLocalesSecondary.cjs`

Moment 补充语言区域的第三方本地化定义和注册副作用。。[源码](../../eyes/src/engine/core/MomentLocalesSecondary.cjs)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-MomentLocalesSecondary-cjs)

## `eyes/src/engine/core/ObjectUtils.js`

以统一接口枚举/处理对象键值。。[源码](../../eyes/src/engine/core/ObjectUtils.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-ObjectUtils-js)

### `ObjectUtils`

对象枚举薄封装，直接保留 Object.entries/keys/values 的键顺序、可枚举性及异常语义，不额外过滤原型或复制值。。父类 `无`。

- `static entries(object)` [源码:4](../../eyes/src/engine/core/ObjectUtils.js#L4)：当前操作：写入 无直接字段写入；返回 Object.entries(object)。
- `static keys(object)` [源码:7](../../eyes/src/engine/core/ObjectUtils.js#L7)：当前操作：写入 无直接字段写入；返回 Object.keys(object)。
- `static values(object)` [源码:10](../../eyes/src/engine/core/ObjectUtils.js#L10)：当前操作：写入 无直接字段写入；返回 Object.values(object)。

## `eyes/src/engine/core/OptionsBlock.js`

建立内容面板的选项块并绑定用户操作。。[源码](../../eyes/src/engine/core/OptionsBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-OptionsBlock-js)

### `OptionsBlock`

建立内容面板的选项块并绑定用户操作。。父类 `SolarSystemPublicApi.BaseContentBlock`。

- `constructor(app, options={})` [源码:7](../../eyes/src/engine/core/OptionsBlock.js#L7)：当前操作：写入 _previousChildEntity、_previousEntity、_state；返回 无显式返回。
- `onRouteChange(entityInfo, routeOptions={})` [源码:27](../../eyes/src/engine/core/OptionsBlock.js#L27)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_createCheckbox(optionInfo, isChecked)` [源码:28](../../eyes/src/engine/core/OptionsBlock.js#L28)：当前操作：写入 无直接字段写入；返回 checkbox。
- `_createMultistateCheckbox(optionInfo, stateCount, stateIndex)` [源码:40](../../eyes/src/engine/core/OptionsBlock.js#L40)：当前操作：写入 无直接字段写入；返回 checkboxMultistate。
- `_createRadioButton(optionInfo)` [源码:53](../../eyes/src/engine/core/OptionsBlock.js#L53)：当前操作：写入 无直接字段写入；返回 listItem。
- `_createToggle(optionId, optionText)` [源码:77](../../eyes/src/engine/core/OptionsBlock.js#L77)：当前操作：写入 无直接字段写入；返回 {container:listItem,input:checkboxInput}。
- `_addDefaultOptions(entityInfo, allowedOptions=null, childEntityInfo={})` [源码:101](../../eyes/src/engine/core/OptionsBlock.js#L101)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `reset()` [源码:102](../../eyes/src/engine/core/OptionsBlock.js#L102)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__disable()` [源码:103](../../eyes/src/engine/core/OptionsBlock.js#L103)：当前操作：写入 _previousChildEntity、_previousEntity；返回 无显式返回。

## `eyes/src/engine/core/OrbitalElements.js`

椭圆/双曲轨道元素及开普勒传播，把时间转换为三维位置和速度。。[源码](../../eyes/src/engine/core/OrbitalElements.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-OrbitalElements-js)

### `OrbitalElements`

角量均为弧度；时间、长度和引力参数必须使用相容单位。此实现不额外处理抛物线或圆轨道的退化情况。。父类 `无`。

- `constructor(initialState)` [源码:12](../../eyes/src/engine/core/OrbitalElements.js#L12)：当前操作：写入 eccentricity、epoch、meanAngularMotion、meanAnomalyAtEpoch、orientation、semiMajorAxis；返回 无显式返回。
- `copy(sourceElements)` [源码:38](../../eyes/src/engine/core/OrbitalElements.js#L38)：当前操作：写入 eccentricity、epoch、meanAngularMotion、meanAnomalyAtEpoch、semiMajorAxis；返回 无显式返回。
- `projectFromMeanAnomaly(positionOut, velocityOut, meanAnomaly)` [源码:47](../../eyes/src/engine/core/OrbitalElements.js#L47)：先在轨道平面计算位置与速度，再用同一 orientation 转到参考系；输出参数可省略，函数不替调用者分配向量。
- `project(positionOut, velocityOut, time)` [源码:83](../../eyes/src/engine/core/OrbitalElements.js#L83)：M=M0+n·(time−epoch)；只对椭圆周期角归一化，双曲轨道保留非周期平近点角。
- `getTrueAnomalyFromPosition(position)` [源码:90](../../eyes/src/engine/core/OrbitalElements.js#L90)：当前操作：写入 无直接字段写入；返回 trueAnomaly。
- `getMeanAnomalyFromTrueAnomaly(trueAnomaly)` [源码:97](../../eyes/src/engine/core/OrbitalElements.js#L97)：当前操作：写入 无直接字段写入；返回 meanAnomaly。
- `getEccentricAnomalyFromMeanAnomaly(meanAnomaly)` [源码:109](../../eyes/src/engine/core/OrbitalElements.js#L109)：牛顿法解椭圆 E−e sin E=M 或双曲 e sinh H−H=M；最多 20 次，更新量小于 0.00174532925 弧度退出。
- `getMeanAnomalyFromEccentricAnomaly(eccentricAnomaly)` [源码:140](../../eyes/src/engine/core/OrbitalElements.js#L140)：当前操作：写入 无直接字段写入；返回 PioneerPublicApi.MathUtils.wrap(meanAnomaly,-Math.PI,+Math.PI)、this.eccentricity*Math.sinh(eccentricAnomaly)-eccentricAnomaly。
- `getTrueAnomalyFromEccentricAnomaly(eccentricAnomaly)` [源码:147](../../eyes/src/engine/core/OrbitalElements.js#L147)：当前操作：写入 无直接字段写入；返回 this.eccentricity<1?2*Math.atan(Math.sqrt((1+this.eccentricity)/(1-this.eccentricity))*Math.tan(eccentricAnomaly/2)):2*Math.atan(Math.sqrt((1+this.eccentricity)/(this.eccentricity-1))*Math.tanh(eccentricAnomaly/2))。
- `getEccentricAnomalyFromTrueAnomaly(trueAnomaly)` [源码:150](../../eyes/src/engine/core/OrbitalElements.js#L150)：当前操作：写入 无直接字段写入；返回 PioneerPublicApi.MathUtils.wrap(eccentricAnomaly,-Math.PI,+Math.PI)、2*Math.atanh(Math.sqrt((this.eccentricity-1)/(this.eccentricity+1))*Math.tan(trueAnomaly/2))。
- `getInclination()` [源码:157](../../eyes/src/engine/core/OrbitalElements.js#L157)：当前操作：写入 无直接字段写入；返回 inclination。
- `getLongitudeOfAscendingNode()` [源码:164](../../eyes/src/engine/core/OrbitalElements.js#L164)：当前操作：写入 无直接字段写入；返回 PioneerPublicApi.MathUtils.wrap(longitudeOfAscendingNode,0,PioneerPublicApi.MathUtils.TwoPi)。
- `getArgumentOfPeriapsis()` [源码:172](../../eyes/src/engine/core/OrbitalElements.js#L172)：升交点方向与近心点方向取向量夹角再 wrap；保留原实现的无符号夹角选择，不补造象限信息。
- `getPeriod()` [源码:183](../../eyes/src/engine/core/OrbitalElements.js#L183)：当前操作：写入 无直接字段写入；返回 PioneerPublicApi.MathUtils.TwoPi/this.meanAngularMotion。
- `getPeriapsis()` [源码:186](../../eyes/src/engine/core/OrbitalElements.js#L186)：当前操作：写入 无直接字段写入；返回 this.semiMajorAxis*(1-this.eccentricity)。
- `getApoapsis()` [源码:189](../../eyes/src/engine/core/OrbitalElements.js#L189)：当前操作：写入 无直接字段写入；返回 this.semiMajorAxis*(1+this.eccentricity)。
- `setOrientationFromElements(inclination, longitudeOfAscendingNode, argumentOfPeriapsis)` [源码:193](../../eyes/src/engine/core/OrbitalElements.js#L193)：升交点方向和轨道法线确定初始坐标架，再绕法线转近心点幅角；所有输入角均为弧度。
- `setFromPositionAndVelocity(position, velocity, epoch, gravitationalParameter)` [源码:207](../../eyes/src/engine/core/OrbitalElements.js#L207)：由 r×v 得轨道法线，由 (v×h)/μ−r̂ 得偏心率向量；长度和速度单位必须与 μ 相容。池内向量在建立姿态后释放。

## `eyes/src/engine/core/OverlayEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。。[源码](../../eyes/src/engine/core/OverlayEntry.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-OverlayEntry-js)

## `eyes/src/engine/core/Parenting.js`

处理实体父级时间表与父参考系切换。。[源码](../../eyes/src/engine/core/Parenting.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Parenting-js)

### `Parenting`

处理实体父级时间表与父参考系切换。。父类 `无`。

- `static getParentOfEntity(entityId, timeValue)` [源码:6](../../eyes/src/engine/core/Parenting.js#L6)：当前操作：写入 无直接字段写入；返回 insertionIndex<parentTimeline.length&&timeValue===parentTimeline[insertionIndex][0]?parentTimeline[insertionIndex][1]:insertionIndex>0?parentTimeline[insertionIndex-1][1]:""。
- `static getAllAncestorsOfEntity(entityId)` [源码:13](../../eyes/src/engine/core/Parenting.js#L13)：当前操作：写入 无直接字段写入；返回 set。
- `static _getAllAncestorsOfEntityRecursed(entityId, ancestors)` [源码:18](../../eyes/src/engine/core/Parenting.js#L18)：当前操作：写入 无直接字段写入；返回 void。
- `static _isStartTimeLessThanTime(parentEntry, timeValue)` [源码:27](../../eyes/src/engine/core/Parenting.js#L27)：当前操作：写入 无直接字段写入；返回 parentEntry[0]<timeValue。

## `eyes/src/engine/core/ParkerSolarProbePerihelionStory.js`

帕克太阳探测器近日点故事定义，协调 2024-12-24 事件时间和观察步骤。。[源码](../../eyes/src/engine/core/ParkerSolarProbePerihelionStory.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-ParkerSolarProbePerihelionStory-js)

## `eyes/src/engine/core/Placemarks.js`

在球面经纬位置创建具有标签的地表实体。。[源码](../../eyes/src/engine/core/Placemarks.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Placemarks-js)

### `Placemarks`

在球面经纬位置创建具有标签的地表实体。。父类 `无`。

- `static addPlacemark(placemarkId, contentHtml, parentEntity, latitudeDegrees, longitudeDegrees, groundDistance)` [源码:5](../../eyes/src/engine/core/Placemarks.js#L5)：当前操作：写入 无直接字段写入；返回 placemarkEntity。
- `static updateLLA(placemarkEntity, latitudeDegrees, longitudeDegrees, groundDistance)` [源码:19](../../eyes/src/engine/core/Placemarks.js#L19)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/PlumesShader.js`

声明 PlumesShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。。[源码](../../eyes/src/engine/core/PlumesShader.js)。语义状态：`verified-shader-source-format`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-PlumesShader-js)

## `eyes/src/engine/core/Pool.js`

复用临时对象以减少帧循环分配；借出和归还须配对。。[源码](../../eyes/src/engine/core/Pool.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Pool-js)

### `Pool`

空闲索引栈借还同一对象，不重置业务字段；clean 只销毁空闲项并修正其后索引，重复 release 与跨池使用的原限制不扩展。。父类 `无`。

- `constructor(constructorFunction)` [源码:4](../../eyes/src/engine/core/Pool.js#L4)：当前操作：写入 _constructorFunction；返回 无显式返回。
- `setConstructorFunction(constructorFunction)` [源码:7](../../eyes/src/engine/core/Pool.js#L7)：当前操作：写入 _constructorFunction；返回 无显式返回。
- `setDestructorFunction(destructorFunction)` [源码:10](../../eyes/src/engine/core/Pool.js#L10)：当前操作：写入 _destructorFunction；返回 无显式返回。
- `get()` [源码:13](../../eyes/src/engine/core/Pool.js#L13)：当前操作：写入 _freeLength、_objects[poolIndex]._poolIndex；返回 item。
- `release(item)` [源码:26](../../eyes/src/engine/core/Pool.js#L26)：当前操作：写入 _freeLength、_free[this._freeLength]；返回 无显式返回。
- `clean(maximumUsedRatio)` [源码:37](../../eyes/src/engine/core/Pool.js#L37)：当前操作：写入 _free、_freeLength、_free[laterFreeIndex]、_objects[shiftedObjectIndex]._poolIndex；返回 无显式返回。
- `getAsArray()` [源码:52](../../eyes/src/engine/core/Pool.js#L52)：当前操作：写入 无直接字段写入；返回 this._objects。
- `isUsed(item)` [源码:55](../../eyes/src/engine/core/Pool.js#L55)：当前操作：写入 无直接字段写入；返回 item._poolUsed。
- `areAnyUsed()` [源码:58](../../eyes/src/engine/core/Pool.js#L58)：当前操作：写入 无直接字段写入；返回 this._freeLength<this._objects.length。

## `eyes/src/engine/core/Quadtree.js`

二维矩形空间分区与交叠查询。。[源码](../../eyes/src/engine/core/Quadtree.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Quadtree-js)

### `Quadtree`

viewport 像素矩形建四叉树；仅完全包含的对象下降子节点，跨象限对象留父节点，深度上限 8。交集标记按查询增删同步。。父类 `无`。

- `constructor(viewport, maxValuesPerNode=8)` [源码:5](../../eyes/src/engine/core/Quadtree.js#L5)：当前操作：写入 _maxValuesPerNode、_nameArray、_root、_valueMap、_viewport；返回 无显式返回。
- `setBounds(name, bounds)` [源码:18](../../eyes/src/engine/core/Quadtree.js#L18)：当前操作：写入 _root、_valueMap[name]；返回 无显式返回。
- `removeBounds(name)` [源码:59](../../eyes/src/engine/core/Quadtree.js#L59)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getBounds(boundsOut, name)` [源码:67](../../eyes/src/engine/core/Quadtree.js#L67)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getIntersections(name, intersectionsOut)` [源码:75](../../eyes/src/engine/core/Quadtree.js#L75)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getNodeIntersections(entry, node, ascending)` [源码:92](../../eyes/src/engine/core/Quadtree.js#L92)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_insertValueInNode(entry, node)` [源码:105](../../eyes/src/engine/core/Quadtree.js#L105)：当前操作：写入 无直接字段写入；返回 void(entry.node=node)、void this._insertValueInNode(entry,childNode)。
- `_removeValueFromNode(entry)` [源码:151](../../eyes/src/engine/core/Quadtree.js#L151)：当前操作：写入 无直接字段写入；返回 void。

## `eyes/src/engine/core/Quaternion.js`

四元数乘法、逆、旋转轴、方向转换及球面插值；包含 Three.js 对接与对象池。。[源码](../../eyes/src/engine/core/Quaternion.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Quaternion-js)

### `Quaternion`

构造和 set 分量顺序为 w,x,y,z；inverse 是共轭，假定单位四元数。乘法先写池内临时对象，允许输出与任一输入别名。。父类 `无`。

- `constructor(scalar=1, vectorX=0, vectorY=0, vectorZ=0)` [源码:9](../../eyes/src/engine/core/Quaternion.js#L9)：当前操作：写入 _w、_x、_y、_z；返回 无显式返回。
- `get w()` [源码:15](../../eyes/src/engine/core/Quaternion.js#L15)：当前操作：写入 无直接字段写入；返回 this._w。
- `set w(scalar)` [源码:18](../../eyes/src/engine/core/Quaternion.js#L18)：当前操作：写入 _w；返回 无显式返回。
- `get x()` [源码:21](../../eyes/src/engine/core/Quaternion.js#L21)：当前操作：写入 无直接字段写入；返回 this._x。
- `set x(vectorX)` [源码:24](../../eyes/src/engine/core/Quaternion.js#L24)：当前操作：写入 _x；返回 无显式返回。
- `get y()` [源码:27](../../eyes/src/engine/core/Quaternion.js#L27)：当前操作：写入 无直接字段写入；返回 this._y。
- `set y(vectorY)` [源码:30](../../eyes/src/engine/core/Quaternion.js#L30)：当前操作：写入 _y；返回 无显式返回。
- `get z()` [源码:33](../../eyes/src/engine/core/Quaternion.js#L33)：当前操作：写入 无直接字段写入；返回 this._z。
- `set z(vectorZ)` [源码:36](../../eyes/src/engine/core/Quaternion.js#L36)：当前操作：写入 _z；返回 无显式返回。
- `getAngle()` [源码:39](../../eyes/src/engine/core/Quaternion.js#L39)：当前操作：写入 无直接字段写入；返回 2*Math.acos(this._w)。
- `copy(source)` [源码:42](../../eyes/src/engine/core/Quaternion.js#L42)：当前操作：写入 _w、_x、_y、_z；返回 无显式返回。
- `copyFromThreeJs(source)` [源码:48](../../eyes/src/engine/core/Quaternion.js#L48)：当前操作：写入 _w、_x、_y、_z；返回 无显式返回。
- `set(scalar, vectorX, vectorY, vectorZ)` [源码:54](../../eyes/src/engine/core/Quaternion.js#L54)：当前操作：写入 _w、_x、_y、_z；返回 无显式返回。
- `setFromAxisAngle(axis, angle)` [源码:60](../../eyes/src/engine/core/Quaternion.js#L60)：当前操作：写入 _w、_x、_y、_z；返回 无显式返回。
- `setFromAxes(xAxis, yAxis, zAxis)` [源码:68](../../eyes/src/engine/core/Quaternion.js#L68)：原分支要求恰有一根轴缺省，再由叉积补齐；输入正交/归一化由调用者保证。三根轴全给时仍按原实现抛错。
- `setFromEuler(xAngle, yAngle, zAngle)` [源码:112](../../eyes/src/engine/core/Quaternion.js#L112)：当前操作：写入 _w、_x、_y、_z；返回 无显式返回。
- `setFromVectorFromTo(fromDirection, toDirection)` [源码:127](../../eyes/src/engine/core/Quaternion.js#L127)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setFromAxis(axis, axisIndex)` [源码:138](../../eyes/src/engine/core/Quaternion.js#L138)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toString()` [源码:161](../../eyes/src/engine/core/Quaternion.js#L161)：当前操作：写入 无直接字段写入；返回 ˋ[${this._w}, ${this._x}, ${this._y}, ${this._z}]ˋ。
- `isNaN()` [源码:164](../../eyes/src/engine/core/Quaternion.js#L164)：当前操作：写入 无直接字段写入；返回 this._w!=this._w\|\|this._x!=this._x\|\|this._y!=this._y\|\|this._z!=this._z。
- `magnitude()` [源码:167](../../eyes/src/engine/core/Quaternion.js#L167)：当前操作：写入 无直接字段写入；返回 Math.sqrt(this._w*this._w+this._x*this._x+this._y*this._y+this._z*this._z)。
- `normalize(source)` [源码:170](../../eyes/src/engine/core/Quaternion.js#L170)：当前操作：写入 _w、_x、_y、_z；返回 无显式返回。
- `inverse(source)` [源码:179](../../eyes/src/engine/core/Quaternion.js#L179)：当前操作：写入 _w、_x、_y、_z；返回 无显式返回。
- `mult(left, right)` [源码:185](../../eyes/src/engine/core/Quaternion.js#L185)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `multInverseL(left, right)` [源码:194](../../eyes/src/engine/core/Quaternion.js#L194)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `multInverseR(left, right)` [源码:203](../../eyes/src/engine/core/Quaternion.js#L203)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `scaleAngle(source, angleScale)` [源码:212](../../eyes/src/engine/core/Quaternion.js#L212)：当前操作：写入 _w、_x、_y、_z；返回 void this.copy(source)。
- `angle(other)` [源码:222](../../eyes/src/engine/core/Quaternion.js#L222)：当前操作：写入 无直接字段写入；返回 2*Math.acos(this._w*other.w+this._x*other.x+this._y*other.y+this._z*other.z)。
- `slerp(startQuaternion, endQuaternion, fraction)` [源码:226](../../eyes/src/engine/core/Quaternion.js#L226)：点积负时选择等价半球；接近同向改用线性混合后归一化，阈值与符号落在起点权重的原约定保持。
- `getAxis(axisOut, axisIndex)` [源码:251](../../eyes/src/engine/core/Quaternion.js#L251)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static fromAxisAngle(axis, angle)` [源码:275](../../eyes/src/engine/core/Quaternion.js#L275)：当前操作：写入 无直接字段写入；返回 quaternion。
- `static fromAxes(xAxis, yAxis, zAxis)` [源码:280](../../eyes/src/engine/core/Quaternion.js#L280)：当前操作：写入 无直接字段写入；返回 quaternion。
- `static fromEuler(xAngle, yAngle, zAngle)` [源码:285](../../eyes/src/engine/core/Quaternion.js#L285)：当前操作：写入 无直接字段写入；返回 quaternion。
- `static fromVectorFromTo(fromDirection, toDirection)` [源码:290](../../eyes/src/engine/core/Quaternion.js#L290)：当前操作：写入 无直接字段写入；返回 quaternion。
- `static fromFromAxis(axis, axisIndex)` [源码:295](../../eyes/src/engine/core/Quaternion.js#L295)：当前操作：写入 无直接字段写入；返回 quaternion。

## `eyes/src/engine/core/RandomString.js`

生成随机字符串标识。。[源码](../../eyes/src/engine/core/RandomString.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-RandomString-js)

### `RandomString`

随机标识符使用 crypto.getRandomValues 填充字节并编码为补零十六进制；奇数字符长度在编码后截断，不改变熵来源。。父类 `无`。

- `static generate(length)` [源码:4](../../eyes/src/engine/core/RandomString.js#L4)：当前操作：写入 无直接字段写入；返回 Array.from(uint8Array,byte=>ˋ0${(255&byte).toString(16)}ˋ.slice(-2)).join("").slice(0,length)。

## `eyes/src/engine/core/Reader.js`

以小端序 DataView 游标读取二进制数值和 UTF-8 字符串；64 位整数超过安全范围返回 NaN。。[源码](../../eyes/src/engine/core/Reader.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Reader-js)

### `Reader`

二进制游标按字节前移；多字节数值固定小端。越界由 DataView 抛出，调用者负责提供完整记录。。父类 `无`。

- `constructor(buffer)` [源码:4](../../eyes/src/engine/core/Reader.js#L4)：当前操作：写入 _dataView、_offset；返回 无显式返回。
- `isAtEnd()` [源码:8](../../eyes/src/engine/core/Reader.js#L8)：当前操作：写入 无直接字段写入；返回 this._offset>=this._dataView.byteLength。
- `readByte()` [源码:11](../../eyes/src/engine/core/Reader.js#L11)：当前操作：写入 _offset；返回 value。
- `readFloat32()` [源码:16](../../eyes/src/engine/core/Reader.js#L16)：当前操作：写入 _offset；返回 value。
- `readFloat64()` [源码:21](../../eyes/src/engine/core/Reader.js#L21)：当前操作：写入 _offset；返回 value。
- `readUInt8()` [源码:26](../../eyes/src/engine/core/Reader.js#L26)：当前操作：写入 _offset；返回 value。
- `readUInt16()` [源码:31](../../eyes/src/engine/core/Reader.js#L31)：当前操作：写入 _offset；返回 value。
- `readUInt32()` [源码:36](../../eyes/src/engine/core/Reader.js#L36)：当前操作：写入 _offset；返回 value。
- `readUInt64()` [源码:42](../../eyes/src/engine/core/Reader.js#L42)：超过 Number 安全整数范围时返回 NaN，但仍消费八字节；不得静默舍入为可用 ID。
- `readInt8()` [源码:47](../../eyes/src/engine/core/Reader.js#L47)：当前操作：写入 _offset；返回 value。
- `readInt16()` [源码:52](../../eyes/src/engine/core/Reader.js#L52)：当前操作：写入 _offset；返回 value。
- `readInt32()` [源码:57](../../eyes/src/engine/core/Reader.js#L57)：当前操作：写入 _offset；返回 value。
- `readInt64()` [源码:63](../../eyes/src/engine/core/Reader.js#L63)：有符号值同样要求 Number 安全整数；越界精度用 NaN 表示，游标照常消费八字节。
- `readLine()` [源码:69](../../eyes/src/engine/core/Reader.js#L69)：忽略 CR，遇 LF 终止，再一次性按 UTF-8 解码；未找到 LF 时保留越界异常。
- `readString(byteLength)` [源码:86](../../eyes/src/engine/core/Reader.js#L86)：省略长度时以零字节终止；显式长度按字节计数。保留原有 length=0 行为，不把它改为空字符串。

## `eyes/src/engine/core/Rect.js`

二维矩形边界、包含和相交运算。。[源码](../../eyes/src/engine/core/Rect.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Rect-js)

### `Rect`

origin 与 size 是持有的二维向量；contains 左下闭右上开，intersects 需要正面积重叠，surrounds 包含边界。。父类 `无`。

- `constructor(originX=0, originY=0, width=0, height=0)` [源码:6](../../eyes/src/engine/core/Rect.js#L6)：当前操作：写入 _origin、_size；返回 无显式返回。
- `get origin()` [源码:10](../../eyes/src/engine/core/Rect.js#L10)：当前操作：写入 无直接字段写入；返回 this._origin。
- `get size()` [源码:13](../../eyes/src/engine/core/Rect.js#L13)：当前操作：写入 无直接字段写入；返回 this._size。
- `toString()` [源码:16](../../eyes/src/engine/core/Rect.js#L16)：当前操作：写入 无直接字段写入；返回 ˋ[Origin: (${this._origin.x}, ${this._origin.y}), Size: (${this._size.x}, ${this._size.y})]ˋ。
- `copy(source)` [源码:19](../../eyes/src/engine/core/Rect.js#L19)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `set(originX, originY, width, height)` [源码:23](../../eyes/src/engine/core/Rect.js#L23)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `contains(point)` [源码:27](../../eyes/src/engine/core/Rect.js#L27)：当前操作：写入 无直接字段写入；返回 this._origin.x<=point.x&&point.x<this._origin.x+this._size.x&&this._origin.y<=point.y&&point.y<this._origin.y+this._size.y。
- `intersects(otherRect)` [源码:30](../../eyes/src/engine/core/Rect.js#L30)：当前操作：写入 无直接字段写入；返回 this._origin.x+this._size.x>otherRect.origin.x&&otherRect.origin.x+otherRect.size.x>this._origin.x&&this._origin.y+this._size.y>otherRect.origin.y&&otherRect.origin.y+otherRect.size.y>this._origin.y。
- `surrounds(otherRect)` [源码:33](../../eyes/src/engine/core/Rect.js#L33)：当前操作：写入 无直接字段写入；返回 this._origin.x<=otherRect.origin.x&&this._origin.x+this._size.x>=otherRect.origin.x+otherRect.size.x&&this._origin.y<=otherRect.origin.y&&this._origin.y+this._size.y>=otherRect.origin.y+otherRect.size.y。

## `eyes/src/engine/core/STORIES.js`

把五个故事 id 映射到对应故事配置模块。。[源码](../../eyes/src/engine/core/STORIES.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-STORIES-js)

## `eyes/src/engine/core/Scene.js`

拥有实体和 Three.js 场景，维护光源和控制器依赖图，分离状态更新与视觉更新。。[源码](../../eyes/src/engine/core/Scene.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Scene-js)

### `Scene`

场景持有实体集合与控制器依赖图；实体先保存上一帧状态及切换父级，再由依赖图按顺序更新控制器。。父类 `PioneerPublicApi.CollectionItem`。

- `constructor(sceneName, engine)` [源码:5](../../eyes/src/engine/core/Scene.js#L5)：当前操作：写入 _ambientLightColor、_controllerDependencyGraph、_entities、_lightSources、_threeJsScene；返回 无显式返回。
- `getEngine()` [源码:13](../../eyes/src/engine/core/Scene.js#L13)：当前操作：写入 无直接字段写入；返回 this.__getCollectionParent()。
- `getEntity(entityName)` [源码:16](../../eyes/src/engine/core/Scene.js#L16)：当前操作：写入 无直接字段写入；返回 this._entities.get(PioneerPublicApi.Entity,entityName)。
- `getEntityAt(entityIndex)` [源码:19](../../eyes/src/engine/core/Scene.js#L19)：当前操作：写入 无直接字段写入；返回 this._entities.getAt(entityIndex)。
- `getNumEntities()` [源码:22](../../eyes/src/engine/core/Scene.js#L22)：当前操作：写入 无直接字段写入；返回 this._entities.getSize()。
- `addEntity(entityName)` [源码:25](../../eyes/src/engine/core/Scene.js#L25)：当前操作：写入 无直接字段写入；返回 this._entities.add(PioneerPublicApi.Entity,entityName)。
- `removeEntity(entityOrName)` [源码:28](../../eyes/src/engine/core/Scene.js#L28)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `moveEntity(entityOrName, targetScene)` [源码:32](../../eyes/src/engine/core/Scene.js#L32)：移动集合所有权时同步迁移控制器依赖图；灯光引用迁移保持原有实现，疑点见资源分析记录。
- `get(entityName, itemNameOrType, classIndex=0)` [源码:54](../../eyes/src/engine/core/Scene.js#L54)：当前操作：写入 无直接字段写入；返回 void 0===itemNameOrType\|\|null===entity?entity:entity.get(itemNameOrType,classIndex)。
- `getControllerDependencyGraph()` [源码:58](../../eyes/src/engine/core/Scene.js#L58)：当前操作：写入 无直接字段写入；返回 this._controllerDependencyGraph。
- `getAmbientLightColor()` [源码:61](../../eyes/src/engine/core/Scene.js#L61)：当前操作：写入 无直接字段写入；返回 this._ambientLightColor。
- `setAmbientLightColor(color)` [源码:64](../../eyes/src/engine/core/Scene.js#L64)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__addLightSource(entityName, componentClassIndex)` [源码:67](../../eyes/src/engine/core/Scene.js#L67)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__removeLightSource(entityName, componentClassIndex=0)` [源码:75](../../eyes/src/engine/core/Scene.js#L75)：当前操作：写入 无直接字段写入；返回 void this._lightSources.splice(lightIndex,1)。
- `getLightSourceAt(lightIndex)` [源码:82](../../eyes/src/engine/core/Scene.js#L82)：当前操作：写入 无直接字段写入；返回 this._lightSources[lightIndex]?.get()??null。
- `getNumLightSources()` [源码:85](../../eyes/src/engine/core/Scene.js#L85)：当前操作：写入 无直接字段写入；返回 this._lightSources.length。
- `getLoadedPromise(entityNames, forceLoaded=false, timeout=Number.POSITIVE_INFINITY)` [源码:89](../../eyes/src/engine/core/Scene.js#L89)：等待指定实体或全部实体；汇集失败后加上实体名，避免首个失败掩盖其余加载结果。
- `waitTillEntitiesInPlace(entityNames, time, timeout=Number.POSITIVE_INFINITY)` [源码:106](../../eyes/src/engine/core/Scene.js#L106)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__destroy()` [源码:119](../../eyes/src/engine/core/Scene.js#L119)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getThreeJsScene()` [源码:123](../../eyes/src/engine/core/Scene.js#L123)：当前操作：写入 无直接字段写入；返回 this._threeJsScene。
- `__update()` [源码:126](../../eyes/src/engine/core/Scene.js#L126)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateVisuals()` [源码:136](../../eyes/src/engine/core/Scene.js#L136)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__removeCameraDependents(camera)` [源码:142](../../eyes/src/engine/core/Scene.js#L142)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static _updateController(controller)` [源码:145](../../eyes/src/engine/core/Scene.js#L145)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static _compareControllers(dependentController, precedingController)` [源码:149](../../eyes/src/engine/core/Scene.js#L149)：同实体按集合顺序；跨实体按父级状态及显式 dependent-state 排序，禁用或时间不相交的控制器不建立边。

## `eyes/src/engine/core/SceneHelpers.js`

为场景建立/配置实体和辅助显示。。[源码](../../eyes/src/engine/core/SceneHelpers.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-SceneHelpers-js)

### `SceneHelpers`

为场景建立/配置实体和辅助显示。。父类 `无`。

- `static getEclipJ2000ToJ2000Rotation()` [源码:6](../../eyes/src/engine/core/SceneHelpers.js#L6)：当前操作：写入 无直接字段写入；返回 this.eclipJ2000ToJ2000Rotation。
- `static llaToXYZ(output, entity, geodetic, entityRelative)` [源码:9](../../eyes/src/engine/core/SceneHelpers.js#L9)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static xyzToLLA(output, entity, position, entityRelative)` [源码:18](../../eyes/src/engine/core/SceneHelpers.js#L18)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static getDependentEntities(entityName)` [源码:31](../../eyes/src/engine/core/SceneHelpers.js#L31)：当前操作：写入 无直接字段写入；返回 set。
- `static loadEntities(requestedNames, retainedNames, scene, options, onCreated, onRemoved)` [源码:37](../../eyes/src/engine/core/SceneHelpers.js#L37)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static _getDependentEntitiesRecursed(entityName, dependencies)` [源码:56](../../eyes/src/engine/core/SceneHelpers.js#L56)：当前操作：写入 无直接字段写入；返回 void。

## `eyes/src/engine/core/Search.js`

面向应用搜索界面的数据/查询协调。。[源码](../../eyes/src/engine/core/Search.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Search-js)

### `Search`

面向应用搜索界面的数据/查询协调。。父类 `Eyes.Search`。

- `_getLink(selectedLink)` [源码:5](../../eyes/src/engine/core/Search.js#L5)：当前操作：写入 无直接字段写入；返回 this._app.getManager("link")?.getParsedLink?.(selectedLink,searchType)\|\|selectedLink。
- `reset(resetEvent)` [源码:11](../../eyes/src/engine/core/Search.js#L11)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onInputFocus()` [源码:20](../../eyes/src/engine/core/Search.js#L20)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/SearchEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。。[源码](../../eyes/src/engine/core/SearchEntry.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-SearchEntry-js)

## `eyes/src/engine/core/Settings.js`

组织应用设置项及设置面板行为。。[源码](../../eyes/src/engine/core/Settings.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Settings-js)

### `Settings`

组织应用设置项及设置面板行为。。父类 `Eyes.Settings`。

- `constructor(app, options={})` [源码:5](../../eyes/src/engine/core/Settings.js#L5)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `init()` [源码:11](../../eyes/src/engine/core/Settings.js#L11)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `collapse()` [源码:21](../../eyes/src/engine/core/Settings.js#L21)：当前操作：写入 _element.style.paddingBottom；返回 无显式返回。
- `expand()` [源码:25](../../eyes/src/engine/core/Settings.js#L25)：当前操作：写入 _element.style.paddingBottom；返回 无显式返回。

## `eyes/src/engine/core/SettingsEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。。[源码](../../eyes/src/engine/core/SettingsEntry.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-SettingsEntry-js)

## `eyes/src/engine/core/ShaderChunkLogDepth.js`

提供对数深度和近/中距离分段深度的着色器片段。。[源码](../../eyes/src/engine/core/ShaderChunkLogDepth.js)。语义状态：`verified-shader-source-format`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-ShaderChunkLogDepth-js)

### `ShaderChunkLogDepth`

提供对数深度和近/中距离分段深度的着色器片段。。父类 `无`。


## `eyes/src/engine/core/ShareModalEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。。[源码](../../eyes/src/engine/core/ShareModalEntry.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-ShareModalEntry-js)

## `eyes/src/engine/core/Sort.js`

排序、二分查找和有序插入工具。。[源码](../../eyes/src/engine/core/Sort.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Sort-js)

### `Sort`

二分返回第一个不小于项；add 将重复项放在已有等值项后，remove 只移除一个。插入排序交换后立即通知 onSwap。。父类 `无`。

- `static getIndex(value, values)` [源码:4](../../eyes/src/engine/core/Sort.js#L4)：当前操作：写入 无直接字段写入；返回 lowerIndex。
- `static getIndexObject(value, values, isLess)` [源码:17](../../eyes/src/engine/core/Sort.js#L17)：当前操作：写入 无直接字段写入；返回 lowerIndex。
- `static add(value, values)` [源码:30](../../eyes/src/engine/core/Sort.js#L30)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static addObject(value, values, isLess, isEqual)` [源码:35](../../eyes/src/engine/core/Sort.js#L35)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static remove(value, values)` [源码:40](../../eyes/src/engine/core/Sort.js#L40)：当前操作：写入 无直接字段写入；返回 found。
- `static removeObject(value, values, isLess, isEqual)` [源码:51](../../eyes/src/engine/core/Sort.js#L51)：当前操作：写入 无直接字段写入；返回 found。
- `static sort(values, onSwap)` [源码:62](../../eyes/src/engine/core/Sort.js#L62)：当前操作：写入 无直接字段写入；返回 void。
- `static sortObject(values, isLess, onSwap)` [源码:79](../../eyes/src/engine/core/Sort.js#L79)：当前操作：写入 无直接字段写入；返回 void。

## `eyes/src/engine/core/SpriteParticles.js`

将粒子状态批量组织为可渲染精灵几何。。[源码](../../eyes/src/engine/core/SpriteParticles.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-SpriteParticles-js)

### `SpriteParticles`

将粒子状态批量组织为可渲染精灵几何。。父类 `无`。

- `constructor(component)` [源码:5](../../eyes/src/engine/core/SpriteParticles.js#L5)：当前操作：写入 _colorArray、_component、_offsetArray、_relativeToEntityOrientation、_scaleArray、_threeJsGeometry、_threeJsMaterial、_threeJsObject；返回 无显式返回。
- `getThreeJsObject()` [源码:20](../../eyes/src/engine/core/SpriteParticles.js#L20)：当前操作：写入 无直接字段写入；返回 this._threeJsObject。
- `getThreeJsMaterial()` [源码:23](../../eyes/src/engine/core/SpriteParticles.js#L23)：当前操作：写入 无直接字段写入；返回 this._threeJsMaterial。
- `setParticleOffsets(offsets)` [源码:26](../../eyes/src/engine/core/SpriteParticles.js#L26)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setParticleColors(colors)` [源码:29](../../eyes/src/engine/core/SpriteParticles.js#L29)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setParticleScales(scales)` [源码:32](../../eyes/src/engine/core/SpriteParticles.js#L32)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getRelativeToEntityOrientation()` [源码:35](../../eyes/src/engine/core/SpriteParticles.js#L35)：当前操作：写入 无直接字段写入；返回 this._relativeToEntityOrientation。
- `setRelativeToEntityOrientation(relativeToEntityOrientation)` [源码:38](../../eyes/src/engine/core/SpriteParticles.js#L38)：当前操作：写入 _relativeToEntityOrientation；返回 无显式返回。
- `prepareForRender(camera)` [源码:41](../../eyes/src/engine/core/SpriteParticles.js#L41)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setAttribute(name, data, dimensions)` [源码:47](../../eyes/src/engine/core/SpriteParticles.js#L47)：当前操作：写入 _colorArray、_offsetArray、_scaleArray、_threeJsGeometry.instanceCount；返回 无显式返回。

## `eyes/src/engine/core/SpriteParticlesShader.js`

声明 SpriteParticlesShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。。[源码](../../eyes/src/engine/core/SpriteParticlesShader.js)。语义状态：`verified-shader-source-format`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-SpriteParticlesShader-js)

## `eyes/src/engine/core/SpriteShader.js`

声明 SpriteShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。。[源码](../../eyes/src/engine/core/SpriteShader.js)。语义状态：`verified-shader-source-format`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-SpriteShader-js)

## `eyes/src/engine/core/Story.js`

管理故事进入/退出、幻灯片、摄像机步骤、时间限制及内容块。。[源码](../../eyes/src/engine/core/Story.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Story-js)

### `Story`

管理故事进入/退出、幻灯片、摄像机步骤、时间限制及内容块。。父类 `EyesPublicApi.Carousel`。

- `constructor(app, options)` [源码:6](../../eyes/src/engine/core/Story.js#L6)：当前操作：写入 _blocks、_config.navigationButtons.next.text、_id、_info、_onSlideChange；返回 无显式返回。
- `init()` [源码:26](../../eyes/src/engine/core/Story.js#L26)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setExpandToggleAriaLabel()` [源码:32](../../eyes/src/engine/core/Story.js#L32)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_toggleCollapse()` [源码:37](../../eyes/src/engine/core/Story.js#L37)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onRouteChange(info, {cancelToken:cancelToken,slide:slide,id:id}={})` [源码:41](../../eyes/src/engine/core/Story.js#L41)：当前操作：写入 _id、_info；返回 void。
- `onQueryChange({cancelToken:cancelToken,slide:slide}={})` [源码:60](../../eyes/src/engine/core/Story.js#L60)：当前操作：写入 无直接字段写入；返回 void。
- `createBlockContent(blockInfo, slideIndex)` [源码:69](../../eyes/src/engine/core/Story.js#L69)：当前操作：写入 _blocks[blockInfo.type]；返回 blockComponent.element。
- `getStoryBlock(blockType)` [源码:150](../../eyes/src/engine/core/Story.js#L150)：当前操作：写入 无直接字段写入；返回 this._blocks[blockType]\|\|console.warn(ˋBlock ${blockType} is not availableˋ)。
- `createSlideContent(slideInfo, slideIndex)` [源码:153](../../eyes/src/engine/core/Story.js#L153)：当前操作：写入 无直接字段写入；返回 contentFragment。
- `setUp()` [源码:164](../../eyes/src/engine/core/Story.js#L164)：当前操作：写入 _onEnter[slideIndex]、_onLeave[slideIndex]；返回 无显式返回。
- `close()` [源码:190](../../eyes/src/engine/core/Story.js#L190)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onLeave(slideIndex)` [源码:194](../../eyes/src/engine/core/Story.js#L194)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateTooltipsProps()` [源码:199](../../eyes/src/engine/core/Story.js#L199)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/StoryBaseContentBlock.js`

故事内容块的基础类型和渲染/事件接口。。[源码](../../eyes/src/engine/core/StoryBaseContentBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-StoryBaseContentBlock-js)

### `StoryBaseContentBlock`

故事内容块的基础类型和渲染/事件接口。。父类 `EyesPublicApi.BaseComponent`。

- `constructor(app, options={config:{info:{}}})` [源码:6](../../eyes/src/engine/core/StoryBaseContentBlock.js#L6)：当前操作：写入 onEnter、onLeave；返回 无显式返回。
- `init()` [源码:17](../../eyes/src/engine/core/StoryBaseContentBlock.js#L17)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onEnter()` [源码:24](../../eyes/src/engine/core/StoryBaseContentBlock.js#L24)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onLeave()` [源码:25](../../eyes/src/engine/core/StoryBaseContentBlock.js#L25)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onClick()` [源码:26](../../eyes/src/engine/core/StoryBaseContentBlock.js#L26)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/TextureLOD.js`

按实体屏幕半径或强制尺寸选择 $SIZE 纹理，以引用计数替换 shader uniform。。[源码](../../eyes/src/engine/core/TextureLOD.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-TextureLOD-js)

### `TextureLOD`

按实体屏幕半径或强制尺寸选择 $SIZE 纹理，以引用计数替换 shader uniform。。父类 `无`。

- `constructor(component)` [源码:5](../../eyes/src/engine/core/TextureLOD.js#L5)：当前操作：写入 _component、_currentSize、_enabled、_engine、_forcedSize、_loadState、_sizes、_uniform、_url；返回 无显式返回。
- `setEnabled(enabled)` [源码:18](../../eyes/src/engine/core/TextureLOD.js#L18)：当前操作：写入 _enabled、_uniform.value；返回 无显式返回。
- `getUrl()` [源码:25](../../eyes/src/engine/core/TextureLOD.js#L25)：当前操作：写入 无直接字段写入；返回 this._url。
- `setUrl(url)` [源码:28](../../eyes/src/engine/core/TextureLOD.js#L28)：当前操作：写入 _currentSize、_loadState、_url；返回 无显式返回。
- `getUniform()` [源码:37](../../eyes/src/engine/core/TextureLOD.js#L37)：当前操作：写入 无直接字段写入；返回 this._uniform。
- `setUniform(uniform)` [源码:40](../../eyes/src/engine/core/TextureLOD.js#L40)：当前操作：写入 _currentSize、_loadState、_uniform、_uniform.value；返回 无显式返回。
- `getSizes()` [源码:53](../../eyes/src/engine/core/TextureLOD.js#L53)：当前操作：写入 无直接字段写入；返回 this._sizes.slice()。
- `setSizes(sizes)` [源码:56](../../eyes/src/engine/core/TextureLOD.js#L56)：当前操作：写入 _currentSize、_loadState、_sizes；返回 无显式返回。
- `getCurrentSize()` [源码:65](../../eyes/src/engine/core/TextureLOD.js#L65)：当前操作：写入 无直接字段写入；返回 this._currentSize。
- `getForcedSize()` [源码:68](../../eyes/src/engine/core/TextureLOD.js#L68)：当前操作：写入 无直接字段写入；返回 this._forcedSize。
- `setForcedSize(forcedSize)` [源码:71](../../eyes/src/engine/core/TextureLOD.js#L71)：当前操作：写入 _forcedSize；返回 无显式返回。
- `getLoadedPromise(timeout=Number.POSITIVE_INFINITY)` [源码:74](../../eyes/src/engine/core/TextureLOD.js#L74)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `update()` [源码:81](../../eyes/src/engine/core/TextureLOD.js#L81)：当前操作：写入 _currentSize、_uniform.value；返回 void。
- `_loadTexture(size, previousSize)` [源码:111](../../eyes/src/engine/core/TextureLOD.js#L111)：正在加载时先归还旧 URL 的请求引用；成功回调再完成纹理所有权交接。

## `eyes/src/engine/core/TextureLoader.js`

将图像位图、视频与 KTX2 二进制转成 Three.js 纹理，提供纯色占位纹理、立方图和环境预滤波。。[源码](../../eyes/src/engine/core/TextureLoader.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-TextureLoader-js)

### `TextureLoader`

将图像位图、视频与 KTX2 二进制转成 Three.js 纹理，提供纯色占位纹理、立方图和环境预滤波。。父类 `无`。

- `constructor(engine)` [源码:7](../../eyes/src/engine/core/TextureLoader.js#L7)：当前操作：写入 _black、_clear、_engine、_gray、_pink、_white；返回 无显式返回。
- `loadCubeTexture(urlTemplate, priority, options)` [源码:16](../../eyes/src/engine/core/TextureLoader.js#L16)：立方图只接管各面 image；临时二维纹理包装在取出 image 后即可 dispose。
- `generateEnvMap(sourceTexture)` [源码:31](../../eyes/src/engine/core/TextureLoader.js#L31)：当前操作：写入 无直接字段写入；返回 pMREMGenerator.fromEquirectangular(environmentTexture).texture。
- `cancel(url)` [源码:47](../../eyes/src/engine/core/TextureLoader.js#L47)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `updatePriority(url, priority)` [源码:50](../../eyes/src/engine/core/TextureLoader.js#L50)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `loadTexture(url, priority, options)` [源码:54](../../eyes/src/engine/core/TextureLoader.js#L54)：扩展名提示用于映射到 blob 等无后缀 URL 的依赖；实际解码分支仍按返回内容类型判定。
- `getKTX2Loader()` [源码:91](../../eyes/src/engine/core/TextureLoader.js#L91)：解码器为静态共享实例，首次创建时固定路径和当前渲染器的压缩纹理支持能力。
- `static _newTexture(color)` [源码:101](../../eyes/src/engine/core/TextureLoader.js#L101)：当前操作：写入 无直接字段写入；返回 new PioneerPublicApi.THREE.CanvasTexture(canvas)。

## `eyes/src/engine/core/ThreeJsHelper.js`

集中创建/更新/销毁 Three.js 网格、属性、材质、纹理并把实体状态转换到相机坐标。。[源码](../../eyes/src/engine/core/ThreeJsHelper.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-ThreeJsHelper-js)

### `ThreeJsHelper`

集中创建/更新/销毁 Three.js 网格、属性、材质、纹理并把实体状态转换到相机坐标。。父类 `无`。

- `static createGeometry(attributes, interleaved)` [源码:5](../../eyes/src/engine/core/ThreeJsHelper.js#L5)：当前操作：写入 无直接字段写入；返回 bufferGeometry。
- `static setupObject(component, object)` [源码:24](../../eyes/src/engine/core/ThreeJsHelper.js#L24)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static createMeshObjectGivenGeometry(component, material, geometry)` [源码:31](../../eyes/src/engine/core/ThreeJsHelper.js#L31)：当前操作：写入 无直接字段写入；返回 mesh。
- `static createMeshObject(component, material, attributes, interleaved)` [源码:36](../../eyes/src/engine/core/ThreeJsHelper.js#L36)：当前操作：写入 无直接字段写入；返回 this.createMeshObjectGivenGeometry(component,material,geometry)。
- `static destroyGeometry(geometry, component)` [源码:40](../../eyes/src/engine/core/ThreeJsHelper.js#L40)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static destroyObject(object, component)` [源码:47](../../eyes/src/engine/core/ThreeJsHelper.js#L47)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static destroyMaterial(material, destroyTextures)` [源码:57](../../eyes/src/engine/core/ThreeJsHelper.js#L57)：只有调用者授予纹理所有权时才遍历 uniform 销毁贴图；材质本身始终 dispose。
- `static destroyTexture(texture)` [源码:69](../../eyes/src/engine/core/ThreeJsHelper.js#L69)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static destroyRenderTarget(renderTarget)` [源码:80](../../eyes/src/engine/core/ThreeJsHelper.js#L80)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static destroyAllObjectsAndMaterials(component, destroyTextures=true)` [源码:83](../../eyes/src/engine/core/ThreeJsHelper.js#L83)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static setPosition(objects, position)` [源码:89](../../eyes/src/engine/core/ThreeJsHelper.js#L89)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static setPositionToEntity(objects, entity, camera, offset, relativeToEntity)` [源码:92](../../eyes/src/engine/core/ThreeJsHelper.js#L92)：当前操作：写入 无直接字段写入；返回 void。
- `static setScale(objects, scale)` [源码:112](../../eyes/src/engine/core/ThreeJsHelper.js#L112)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static setOrientation(objects, orientation)` [源码:125](../../eyes/src/engine/core/ThreeJsHelper.js#L125)：当前操作：写入 无直接字段写入；返回 void。
- `static setOrientationToBillboard(objects, camera)` [源码:132](../../eyes/src/engine/core/ThreeJsHelper.js#L132)：当前操作：写入 无直接字段写入；返回 void。
- `static setOrientationToEntity(objects, entity, offset)` [源码:149](../../eyes/src/engine/core/ThreeJsHelper.js#L149)：当前操作：写入 无直接字段写入；返回 void。
- `static useInDynEnvMap(object, enabled)` [源码:162](../../eyes/src/engine/core/ThreeJsHelper.js#L162)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static createGLBufferAttribute(bufferKind, data, elementType, dimensions, component)` [源码:170](../../eyes/src/engine/core/ThreeJsHelper.js#L170)：分配 GPU 缓冲后保留 elementSize/count，后续上传以元素偏移换算字节；索引缓冲绑定按原条件恢复。
- `static updateGLBufferAttribute(attribute, bufferKind, data, offset, count, component)` [源码:201](../../eyes/src/engine/core/ThreeJsHelper.js#L201)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static setVertices(geometry, name, vertices)` [源码:214](../../eyes/src/engine/core/ThreeJsHelper.js#L214)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static setIndices(geometry, indices)` [源码:225](../../eyes/src/engine/core/ThreeJsHelper.js#L225)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static computeTangents(geometry)` [源码:234](../../eyes/src/engine/core/ThreeJsHelper.js#L234)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static setRenderOrder(object, renderOrder)` [源码:237](../../eyes/src/engine/core/ThreeJsHelper.js#L237)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static cloneMaterial(material)` [源码:243](../../eyes/src/engine/core/ThreeJsHelper.js#L243)：uniform 数字/null 直接复制，数组递归复制，其余对象调用 clone，避免实例共享可变向量。
- `static _cloneUniformValue(value)` [源码:252](../../eyes/src/engine/core/ThreeJsHelper.js#L252)：当前操作：写入 无直接字段写入；返回 null、value、elements、value.clone()。
- `static loadTexture(component, url, options)` [源码:262](../../eyes/src/engine/core/ThreeJsHelper.js#L262)：当前操作：写入 无直接字段写入；返回 component.getEntity().getScene().getEngine().getTextureLoader().loadTexture(url,-component.getEntity().getLeastCameraDepth(),options)。
- `static loadTextureFromCanvas(canvas)` [源码:265](../../eyes/src/engine/core/ThreeJsHelper.js#L265)：当前操作：写入 无直接字段写入；返回 canvasTexture。
- `static loadTextureIntoUniform(component, uniform, url, options)` [源码:273](../../eyes/src/engine/core/ThreeJsHelper.js#L273)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static setOverlay(material, overlay)` [源码:280](../../eyes/src/engine/core/ThreeJsHelper.js#L280)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static setTransparent(material, transparent)` [源码:285](../../eyes/src/engine/core/ThreeJsHelper.js#L285)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static setBlending(material, blending)` [源码:291](../../eyes/src/engine/core/ThreeJsHelper.js#L291)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static setDefine(material, name, enabled)` [源码:315](../../eyes/src/engine/core/ThreeJsHelper.js#L315)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static setUniformNumber(material, name, value)` [源码:326](../../eyes/src/engine/core/ThreeJsHelper.js#L326)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static setUniformVector2(material, name, vector)` [源码:331](../../eyes/src/engine/core/ThreeJsHelper.js#L331)：当前操作：写入 无直接字段写入；返回 void。
- `static setUniformVector3(material, name, vector)` [源码:335](../../eyes/src/engine/core/ThreeJsHelper.js#L335)：当前操作：写入 无直接字段写入；返回 void。
- `static setUniformColorRGB(material, name, color)` [源码:339](../../eyes/src/engine/core/ThreeJsHelper.js#L339)：当前操作：写入 无直接字段写入；返回 void。
- `static setUniformColorRGBA(material, name, color, alphaMultiplier=1)` [源码:343](../../eyes/src/engine/core/ThreeJsHelper.js#L343)：当前操作：写入 无直接字段写入；返回 void。
- `static setUniformQuaternion(material, name, orientation)` [源码:347](../../eyes/src/engine/core/ThreeJsHelper.js#L347)：当前操作：写入 无直接字段写入；返回 void。
- `static setUniformTexture(material, name, texture)` [源码:351](../../eyes/src/engine/core/ThreeJsHelper.js#L351)：当前操作：写入 无直接字段写入；返回 void。

## `eyes/src/engine/core/Tile.js`

异步四叉瓦片状态机：细分前保持父瓦片，子瓦片加载后切换；合并时先加载父瓦片再销毁后代。。[源码](../../eyes/src/engine/core/Tile.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Tile-js)

### `Tile`

异步四叉瓦片状态机：细分前保持父瓦片，子瓦片加载后切换；合并时先加载父瓦片再销毁后代。。父类 `无`。

- `constructor(parent)` [源码:9](../../eyes/src/engine/core/Tile.js#L9)：当前操作：写入 _children、_destroyed、_parent、_splitFailed、_state、_transitioning；返回 无显式返回。
- `getParent()` [源码:17](../../eyes/src/engine/core/Tile.js#L17)：当前操作：写入 无直接字段写入；返回 this._parent。
- `forceLoad()` [源码:20](../../eyes/src/engine/core/Tile.js#L20)：当前操作：写入 _state、_transitioning；返回 无显式返回。
- `check()` [源码:28](../../eyes/src/engine/core/Tile.js#L28)：当前操作：写入 无直接字段写入；返回 this._transitioning。
- `getChildren()` [源码:40](../../eyes/src/engine/core/Tile.js#L40)：当前操作：写入 无直接字段写入；返回 this._children。
- `destroy()` [源码:43](../../eyes/src/engine/core/Tile.js#L43)：当前操作：写入 _destroyed、_state；返回 无显式返回。
- `isDestroyed()` [源码:52](../../eyes/src/engine/core/Tile.js#L52)：当前操作：写入 无直接字段写入；返回 this._destroyed。
- `_split()` [源码:56](../../eyes/src/engine/core/Tile.js#L56)：叶级全部加载完成后统一显隐交接；过渡期间父级继续可见，避免中间帧出现空洞。
- `_join()` [源码:87](../../eyes/src/engine/core/Tile.js#L87)：已有后代若仍过渡则不合并；父级就绪后才清理后代，保留原失败处理和状态推进。
- `_splitAndGetNeedingLoad(descendants, leaves)` [源码:127](../../eyes/src/engine/core/Tile.js#L127)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getDescendentTiles(output)` [源码:141](../../eyes/src/engine/core/Tile.js#L141)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/core/TimeControllerEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。。[源码](../../eyes/src/engine/core/TimeControllerEntry.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-TimeControllerEntry-js)

## `eyes/src/engine/core/TimeUtils.js`

ET 与 Unix 时间换算及时间单位辅助。。[源码](../../eyes/src/engine/core/TimeUtils.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-TimeUtils-js)

### `TimeUtils`

输入输出均为秒；ET/Unix 使用固定基准 946727957.816 与已列出的闰秒，Date.now 先从毫秒换秒。。父类 `无`。

- `static now()` [源码:4](../../eyes/src/engine/core/TimeUtils.js#L4)：当前操作：写入 无直接字段写入；返回 TimeUtils.unixToEt(Date.now()/1e3)。
- `static etToUnix(ephemerisSeconds)` [源码:8](../../eyes/src/engine/core/TimeUtils.js#L8)：闰秒所在 ET 区间可映射到相同 Unix 秒；转换按表逐项修正，不把 Unix 时间当成可表示 second=60 的连续标尺。
- `static unixToEt(unixSeconds)` [源码:15](../../eyes/src/engine/core/TimeUtils.js#L15)：当前操作：写入 无直接字段写入；返回 unixSeconds-946727957.816+leapAdjustment。

## `eyes/src/engine/core/TotalSolarEclipseStory.js`

2024 日全食故事定义：地理城市/遮挡百分比标记、日食时间段、视角与贴图切换。。[源码](../../eyes/src/engine/core/TotalSolarEclipseStory.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-TotalSolarEclipseStory-js)

## `eyes/src/engine/core/TrailShader.js`

声明 TrailShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。。[源码](../../eyes/src/engine/core/TrailShader.js)。语义状态：`verified-shader-source-format`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-TrailShader-js)

## `eyes/src/engine/core/Transitions.js`

通过关键帧/插值构造实体与相机状态过渡。。[源码](../../eyes/src/engine/core/Transitions.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Transitions-js)

### `Transitions`

球面跳转先转到球体参考系，按轨道平面与经纬角弧长求抬升曲线，再换回父参考系；角量弧度，位置/半径/高度同单位。。父类 `无`。

- `static jumpToLocationOnSphere(arcScale, sphereRadius, keepSphereUp, sphereEntity, entity, initialPosition, finalPosition, initialOrientation, finalOrientation, fraction)` [源码:5](../../eyes/src/engine/core/Transitions.js#L5)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static easeInOut(fraction)` [源码:106](../../eyes/src/engine/core/Transitions.js#L106)：当前操作：写入 无直接字段写入；返回 fractionSquared/(2*(fractionSquared-fraction)+1)。
- `static _jumpOnCircle(coordinatesOut, arcLength, initialAltitude, finalAltitude, fraction)` [源码:111](../../eyes/src/engine/core/Transitions.js#L111)：输出 x 为剩余弧长、y 为高度；近竖直退回线性路径，fraction=1 强制精确落在最终高度。

## `eyes/src/engine/core/Tuple.js`

轻量二元组数据结构。。[源码](../../eyes/src/engine/core/Tuple.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Tuple-js)

### `Tuple`

按索引顺序调用工厂构造固定长度数组，每个槽都单独调用，绝不复用同一个返回对象。。父类 `无`。

- `static create2Tuple(factory)` [源码:4](../../eyes/src/engine/core/Tuple.js#L4)：当前操作：写入 无直接字段写入；返回 [factory(0),factory(1)]。
- `static create3Tuple(factory)` [源码:7](../../eyes/src/engine/core/Tuple.js#L7)：当前操作：写入 无直接字段写入；返回 [factory(0),factory(1),factory(2)]。
- `static create4Tuple(factory)` [源码:10](../../eyes/src/engine/core/Tuple.js#L10)：当前操作：写入 无直接字段写入；返回 [factory(0),factory(1),factory(2),factory(3)]。
- `static create5Tuple(factory)` [源码:13](../../eyes/src/engine/core/Tuple.js#L13)：当前操作：写入 无直接字段写入；返回 [factory(0),factory(1),factory(2),factory(3),factory(4)]。
- `static create6Tuple(factory)` [源码:16](../../eyes/src/engine/core/Tuple.js#L16)：当前操作：写入 无直接字段写入；返回 [factory(0),factory(1),factory(2),factory(3),factory(4),factory(5)]。

## `eyes/src/engine/core/TutorialOverlayEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。。[源码](../../eyes/src/engine/core/TutorialOverlayEntry.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-TutorialOverlayEntry-js)

## `eyes/src/engine/core/Types-1075.js`

用太阳系专用管理器/UI 覆盖框架 Types 注册项。。[源码](../../eyes/src/engine/core/Types-1075.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Types-1075-js)

## `eyes/src/engine/core/Types-754.js`

建立框架管理器和 UI 类型名称到构造函数的注册表。。[源码](../../eyes/src/engine/core/Types-754.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Types-754-js)

## `eyes/src/engine/core/Unidentified1069.js`

TelescopeHelper：建立地面观察相机目标、经纬地标、飞行过渡和方位/仰角读数。。[源码](../../eyes/src/engine/core/Unidentified1069.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified1069-js)

### `TelescopeHelper`

TelescopeHelper：建立地面观察相机目标、经纬地标、飞行过渡和方位/仰角读数。。父类 `无`。

- `constructor(app, entity)` [源码:8](../../eyes/src/engine/core/Unidentified1069.js#L8)：当前操作：写入 camera、cameraTarget、entity、fixedController、pioneer、scene；返回 无显式返回。
- `reset()` [源码:17](../../eyes/src/engine/core/Unidentified1069.js#L17)：当前操作：写入 entity；返回 无显式返回。
- `setPickedLocation(parentEntity)` [源码:22](../../eyes/src/engine/core/Unidentified1069.js#L22)：当前操作：写入 无直接字段写入；返回 pickedEntity。
- `addPlacemark(latitudeDegrees, longitudeDegrees, placemarkId)` [源码:35](../../eyes/src/engine/core/Unidentified1069.js#L35)：当前操作：写入 无直接字段写入；返回 placemarkEntity。
- `removePlacemark(placemarkId="placemark")` [源码:44](../../eyes/src/engine/core/Unidentified1069.js#L44)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `flyToSurface(latitudeDegrees, longitudeDegrees)` [源码:47](../../eyes/src/engine/core/Unidentified1069.js#L47)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `readCameraAE()` [源码:75](../../eyes/src/engine/core/Unidentified1069.js#L75)：当前操作：写入 无直接字段写入；返回 azimuthElevation。
- `getAEFromEntity(entity, outputAngles)` [源码:83](../../eyes/src/engine/core/Unidentified1069.js#L83)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getAzimuthElevation()` [源码:101](../../eyes/src/engine/core/Unidentified1069.js#L101)：当前操作：写入 无直接字段写入；返回 null、{azimuth:azimuth,elevation:elevation}。
- `getLatitudeLongitude(localPosition)` [源码:122](../../eyes/src/engine/core/Unidentified1069.js#L122)：当前操作：写入 无直接字段写入；返回 null、null==coordinates.latitude\|\|null==coordinates.longitude?null:coordinates。
- `getPositionFromLatitudeLongitude(latitudeDegrees, longitudeDegrees)` [源码:134](../../eyes/src/engine/core/Unidentified1069.js#L134)：当前操作：写入 无直接字段写入；返回 null、vector3。
- `formatLatitudeLongitude(latitudeDegrees, longitudeDegrees)` [源码:144](../../eyes/src/engine/core/Unidentified1069.js#L144)：当前操作：写入 无直接字段写入；返回 {latitude:latitudeDegrees<0?Math.abs(latitudeDegrees).toFixed(2)+"°S":latitudeDegrees.toFixed(2)+"°N",longitude:longitudeDegrees<0?Math.abs(longitudeDegrees).toFixed(2)+"°W":longitudeDegrees.toFixed(2)+"°E"}。
- `getUnformattedLatOrLon(coordinateText, coordinateType)` [源码:150](../../eyes/src/engine/core/Unidentified1069.js#L150)：当前操作：写入 无直接字段写入；返回 degrees。

## `eyes/src/engine/core/Unidentified511.js`

应用可配置设置项表，包含详情面板、NASA 标志、搜索、分享等开关。。[源码](../../eyes/src/engine/core/Unidentified511.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified511-js)

## `eyes/src/engine/core/Unidentified694.js`

声明式实体目录，注册 5 个实体/参考系（如 j2000_ecliptic、l1、l2、l4、l5），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified694.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified694-js)

## `eyes/src/engine/core/Unidentified695.js`

声明式实体目录，注册 11 个实体/参考系（如 observable_universe、milky_way、sun、mercury、venus、earth），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified695.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified695-js)

## `eyes/src/engine/core/Unidentified696.js`

声明式实体目录，注册 127 个实体/参考系（如 "1_ceres"、"101955_bennu"、"11351_leucus"、"12923_zephyr"、"134340_pluto"、"134340_pluto_barycenter"），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified696.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified696-js)

## `eyes/src/engine/core/Unidentified697.js`

声明式实体目录，注册 14 个实体/参考系（如 "1i_oumuamua"、"1p_halley"、"103p_hartley_2"、"9p_tempel_1"、"81p_wild_2"、"67p_churyumov_gerasimenko"），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified697.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified697-js)

## `eyes/src/engine/core/Unidentified701.js`

声明式实体目录，注册 93 个实体/参考系（如 aitne、ananke、aoede、arche、autonoe、callirrhoe），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified701.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified701-js)

## `eyes/src/engine/core/Unidentified703.js`

声明式实体目录，注册 16 个实体/参考系（如 despina、galatea、halimede、hippocamp、laomedeia、larissa），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified703.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified703-js)

## `eyes/src/engine/core/Unidentified704.js`

声明式实体目录，注册 8 个实体/参考系（如 dione、enceladus、hyperion、iapetus、mimas、rhea），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified704.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified704-js)

## `eyes/src/engine/core/Unidentified705.js`

声明式实体目录，注册 284 个实体/参考系（如 aegaeon、aegir、albiorix、alvaldi、angrboda、anthe），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified705.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified705-js)

## `eyes/src/engine/core/Unidentified707.js`

声明式实体目录，注册 24 个实体/参考系（如 belinda、bianca、caliban、cordelia、cressida、cupid），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified707.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified707-js)

## `eyes/src/engine/core/Unidentified708.js`

声明式实体目录，注册 152 个实体/参考系（如 sc_3d_winds、sc_ace、sc_acrimsat、sc_acs3、sc_aim、sc_aqua），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified708.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified708-js)

## `eyes/src/engine/core/Unidentified709.js`

声明式实体目录，注册 16 个实体/参考系（如 sc_artemis_1、sc_artemis_2、sc_capstone、sc_clementine、sc_danuri、sc_grail_a），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified709.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified709-js)

## `eyes/src/engine/core/Unidentified710.js`

声明式实体目录，注册 31 个实体/参考系（如 sc_escapade_blue、sc_escapade_gold、sc_mars_2020、sc_mars_2020_landing_site、sc_mars_science_laboratory、sc_mars_science_laboratory_landing_site），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified710.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified710-js)

## `eyes/src/engine/core/Unidentified711.js`

声明式实体目录，注册 2 个实体/参考系（如 sc_messenger、sc_messenger_impact_site），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified711.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified711-js)

## `eyes/src/engine/core/Unidentified712.js`

声明式实体目录，注册 12 个实体/参考系（如 sc_juno、sc_cassini、sc_europa_clipper、sc_galileo、sc_galileo_probe、sc_huygens），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified712.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified712-js)

## `eyes/src/engine/core/Unidentified713.js`

声明式实体目录，注册 19 个实体/参考系（如 sc_dart、sc_dawn、sc_deep_impact、sc_deep_impact_impactor、sc_deep_impact_impactor_impact_site、sc_deep_space_1），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified713.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified713-js)

## `eyes/src/engine/core/Unidentified715.js`

声明式实体目录，注册 9 个实体/参考系（如 sc_biosentinel、sc_kepler_space_telescope、sc_mariner_2、sc_parker_solar_probe、sc_spitzer、sc_stereo_ahead），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified715.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified715-js)

## `eyes/src/engine/core/Unidentified716.js`

声明式实体目录，注册 2 个实体/参考系（如 sc_magellan、sc_venus_express），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified716.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified716-js)

## `eyes/src/engine/core/Unidentified717.js`

声明式实体目录，注册 3 个实体/参考系（如 rose_bowl、school_bus、scientist），供 Entity-567 工厂创建半径、父级、几何与控制器。。[源码](../../eyes/src/engine/core/Unidentified717.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified717-js)

## `eyes/src/engine/core/Unidentified738.js`

通过副作用导入多组 extracted 样式，不导出业务类。。[源码](../../eyes/src/engine/core/Unidentified738.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified738-js)

## `eyes/src/engine/core/Unidentified752.js`

高清地表影像配置表，包含地球 VIIRS、火星 Viking、月球 LRO 的 WMTS 图源。。[源码](../../eyes/src/engine/core/Unidentified752.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified752-js)

## `eyes/src/engine/core/Unidentified753.js`

木星/土星磁场、极光和辐射带功能介绍表；部分描述仍为 DESCRIPTION 占位。。[源码](../../eyes/src/engine/core/Unidentified753.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Unidentified753-js)

## `eyes/src/engine/core/Vector2.js`

二维向量代数、插值和池化。。[源码](../../eyes/src/engine/core/Vector2.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Vector2-js)

### `Vector2`

算术方法原地写 this，允许逐分量输入别名；零向量 normalize 保留原输出而非强制清零，夹角缺失方向时返回 NaN。。父类 `无`。

- `constructor(coordinateX=0, coordinateY=0)` [源码:14](../../eyes/src/engine/core/Vector2.js#L14)：当前操作：写入 _x、_y；返回 无显式返回。
- `get x()` [源码:18](../../eyes/src/engine/core/Vector2.js#L18)：当前操作：写入 无直接字段写入；返回 this._x。
- `set x(coordinateX)` [源码:21](../../eyes/src/engine/core/Vector2.js#L21)：当前操作：写入 _x；返回 无显式返回。
- `get y()` [源码:24](../../eyes/src/engine/core/Vector2.js#L24)：当前操作：写入 无直接字段写入；返回 this._y。
- `set y(coordinateY)` [源码:27](../../eyes/src/engine/core/Vector2.js#L27)：当前操作：写入 _y；返回 无显式返回。
- `toString()` [源码:30](../../eyes/src/engine/core/Vector2.js#L30)：当前操作：写入 无直接字段写入；返回 ˋ[${this._x}, ${this._y}]ˋ。
- `equals(source)` [源码:33](../../eyes/src/engine/core/Vector2.js#L33)：当前操作：写入 无直接字段写入；返回 this._x===source.x&&this._y===source.y。
- `isZero()` [源码:36](../../eyes/src/engine/core/Vector2.js#L36)：当前操作：写入 无直接字段写入；返回 0===this._x&&0===this._y。
- `isNaN()` [源码:39](../../eyes/src/engine/core/Vector2.js#L39)：当前操作：写入 无直接字段写入；返回 this._x!=this._x\|\|this._y!=this._y。
- `copy(source)` [源码:42](../../eyes/src/engine/core/Vector2.js#L42)：当前操作：写入 _x、_y；返回 无显式返回。
- `copyFromThreeJs(source)` [源码:46](../../eyes/src/engine/core/Vector2.js#L46)：当前操作：写入 _x、_y；返回 无显式返回。
- `set(coordinateX, coordinateY)` [源码:50](../../eyes/src/engine/core/Vector2.js#L50)：当前操作：写入 _x、_y；返回 无显式返回。
- `neg(source)` [源码:54](../../eyes/src/engine/core/Vector2.js#L54)：当前操作：写入 _x、_y；返回 无显式返回。
- `add(left, right)` [源码:58](../../eyes/src/engine/core/Vector2.js#L58)：当前操作：写入 _x、_y；返回 无显式返回。
- `sub(left, right)` [源码:62](../../eyes/src/engine/core/Vector2.js#L62)：当前操作：写入 _x、_y；返回 无显式返回。
- `mult(source, scalar)` [源码:66](../../eyes/src/engine/core/Vector2.js#L66)：当前操作：写入 _x、_y；返回 无显式返回。
- `addMult(base, direction, scalar)` [源码:70](../../eyes/src/engine/core/Vector2.js#L70)：当前操作：写入 _x、_y；返回 无显式返回。
- `div(source, scalar)` [源码:74](../../eyes/src/engine/core/Vector2.js#L74)：当前操作：写入 _x、_y；返回 无显式返回。
- `scale(left, right)` [源码:78](../../eyes/src/engine/core/Vector2.js#L78)：当前操作：写入 _x、_y；返回 无显式返回。
- `scaleInv(left, right)` [源码:82](../../eyes/src/engine/core/Vector2.js#L82)：当前操作：写入 _x、_y；返回 无显式返回。
- `dot(source)` [源码:86](../../eyes/src/engine/core/Vector2.js#L86)：当前操作：写入 无直接字段写入；返回 this._x*source.x+this._y*source.y。
- `cross(other)` [源码:89](../../eyes/src/engine/core/Vector2.js#L89)：当前操作：写入 无直接字段写入；返回 this._x*other.y-this._y*other.x。
- `magnitudeSqr()` [源码:92](../../eyes/src/engine/core/Vector2.js#L92)：当前操作：写入 无直接字段写入；返回 this._x*this._x+this._y*this._y。
- `magnitude()` [源码:95](../../eyes/src/engine/core/Vector2.js#L95)：当前操作：写入 无直接字段写入；返回 Math.sqrt(this.magnitudeSqr())。
- `normalize(source)` [源码:98](../../eyes/src/engine/core/Vector2.js#L98)：当前操作：写入 _x、_y；返回 无显式返回。
- `setMagnitude(source, magnitude)` [源码:105](../../eyes/src/engine/core/Vector2.js#L105)：当前操作：写入 _x、_y；返回 无显式返回。
- `distance(other)` [源码:110](../../eyes/src/engine/core/Vector2.js#L110)：当前操作：写入 无直接字段写入；返回 Math.sqrt(deltaX*deltaX+deltaY*deltaY)。
- `angle(source)` [源码:115](../../eyes/src/engine/core/Vector2.js#L115)：当前操作：写入 无直接字段写入；返回 magnitudeProduct>0?Math.acos(PioneerPublicApi.MathUtils.clamp(this.dot(source)/magnitudeProduct,-1,1)):Number.NaN。
- `clamp(source, minimum, maximum)` [源码:119](../../eyes/src/engine/core/Vector2.js#L119)：当前操作：写入 _x、_y；返回 无显式返回。
- `lerp(start, end, fraction)` [源码:123](../../eyes/src/engine/core/Vector2.js#L123)：当前操作：写入 _x、_y；返回 无显式返回。

## `eyes/src/engine/core/Vector3.js`

三维向量代数、旋转、插值和池化。。[源码](../../eyes/src/engine/core/Vector3.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Vector3-js)

### `Vector3`

旋转与叉积先缓存全部分量再写输出，支持 this 与输入别名；零向量 normalize 复制输入，球面混合同时线性混合长度。。父类 `无`。

- `constructor(coordinateX=0, coordinateY=0, coordinateZ=0)` [源码:16](../../eyes/src/engine/core/Vector3.js#L16)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `get x()` [源码:21](../../eyes/src/engine/core/Vector3.js#L21)：当前操作：写入 无直接字段写入；返回 this._x。
- `set x(coordinateX)` [源码:24](../../eyes/src/engine/core/Vector3.js#L24)：当前操作：写入 _x；返回 无显式返回。
- `get y()` [源码:27](../../eyes/src/engine/core/Vector3.js#L27)：当前操作：写入 无直接字段写入；返回 this._y。
- `set y(coordinateY)` [源码:30](../../eyes/src/engine/core/Vector3.js#L30)：当前操作：写入 _y；返回 无显式返回。
- `get z()` [源码:33](../../eyes/src/engine/core/Vector3.js#L33)：当前操作：写入 无直接字段写入；返回 this._z。
- `set z(coordinateZ)` [源码:36](../../eyes/src/engine/core/Vector3.js#L36)：当前操作：写入 _z；返回 无显式返回。
- `toString()` [源码:39](../../eyes/src/engine/core/Vector3.js#L39)：当前操作：写入 无直接字段写入；返回 ˋ[${this._x}, ${this._y}, ${this._z}]ˋ。
- `equals(source)` [源码:42](../../eyes/src/engine/core/Vector3.js#L42)：当前操作：写入 无直接字段写入；返回 this._x===source.x&&this._y===source.y&&this._z===source.z。
- `isZero()` [源码:45](../../eyes/src/engine/core/Vector3.js#L45)：当前操作：写入 无直接字段写入；返回 0===this._x&&0===this._y&&0===this._z。
- `isNaN()` [源码:48](../../eyes/src/engine/core/Vector3.js#L48)：当前操作：写入 无直接字段写入；返回 this._x!=this._x\|\|this._y!=this._y\|\|this._z!=this._z。
- `copy(source)` [源码:51](../../eyes/src/engine/core/Vector3.js#L51)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `copyFromThreeJs(source)` [源码:56](../../eyes/src/engine/core/Vector3.js#L56)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `set(coordinateX, coordinateY, coordinateZ)` [源码:61](../../eyes/src/engine/core/Vector3.js#L61)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `setFromAER(aer)` [源码:66](../../eyes/src/engine/core/Vector3.js#L66)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `neg(source)` [源码:72](../../eyes/src/engine/core/Vector3.js#L72)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `add(left, right)` [源码:77](../../eyes/src/engine/core/Vector3.js#L77)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `sub(left, right)` [源码:82](../../eyes/src/engine/core/Vector3.js#L82)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `mult(source, scalar)` [源码:87](../../eyes/src/engine/core/Vector3.js#L87)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `addMult(base, direction, scalar)` [源码:92](../../eyes/src/engine/core/Vector3.js#L92)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `div(source, scalar)` [源码:97](../../eyes/src/engine/core/Vector3.js#L97)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `scale(left, right)` [源码:102](../../eyes/src/engine/core/Vector3.js#L102)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `scaleInv(left, right)` [源码:107](../../eyes/src/engine/core/Vector3.js#L107)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `dot(source)` [源码:112](../../eyes/src/engine/core/Vector3.js#L112)：当前操作：写入 无直接字段写入；返回 this._x*source.x+this._y*source.y+this._z*source.z。
- `cross(left, right)` [源码:115](../../eyes/src/engine/core/Vector3.js#L115)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `magnitudeSqr()` [源码:123](../../eyes/src/engine/core/Vector3.js#L123)：当前操作：写入 无直接字段写入；返回 this._x*this._x+this._y*this._y+this._z*this._z。
- `magnitude()` [源码:126](../../eyes/src/engine/core/Vector3.js#L126)：当前操作：写入 无直接字段写入；返回 Math.sqrt(this.magnitudeSqr())。
- `magnitudeXY()` [源码:129](../../eyes/src/engine/core/Vector3.js#L129)：当前操作：写入 无直接字段写入；返回 Math.sqrt(this._x*this._x+this._y*this._y)。
- `normalize(source)` [源码:132](../../eyes/src/engine/core/Vector3.js#L132)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `setMagnitude(source, magnitude)` [源码:142](../../eyes/src/engine/core/Vector3.js#L142)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `distance(other)` [源码:148](../../eyes/src/engine/core/Vector3.js#L148)：当前操作：写入 无直接字段写入；返回 Math.sqrt(deltaX*deltaX+deltaY*deltaY+deltaZ*deltaZ)。
- `angle(source)` [源码:154](../../eyes/src/engine/core/Vector3.js#L154)：当前操作：写入 无直接字段写入；返回 magnitudeProduct>0?Math.acos(PioneerPublicApi.MathUtils.clamp(this.dot(source)/magnitudeProduct,-1,1)):Number.NaN。
- `angleAroundAxis(targetVector, axis)` [源码:159](../../eyes/src/engine/core/Vector3.js#L159)：减去沿 axis 的投影后求有符号夹角；axis 假定单位向量，池向量在返回前归还。
- `clamp(source, minimum, maximum)` [源码:173](../../eyes/src/engine/core/Vector3.js#L173)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `lerp(start, end, fraction)` [源码:178](../../eyes/src/engine/core/Vector3.js#L178)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `slerp(startVector, endVector, fraction)` [源码:183](../../eyes/src/engine/core/Vector3.js#L183)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `rotate(rotation, vector)` [源码:197](../../eyes/src/engine/core/Vector3.js#L197)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `rotateInverse(rotation, vector)` [源码:206](../../eyes/src/engine/core/Vector3.js#L206)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `setNormalTo(normal, preferredDirection)` [源码:215](../../eyes/src/engine/core/Vector3.js#L215)：当前操作：写入 _x、_y、_z；返回 无显式返回。
- `static fromAER(aer)` [源码:224](../../eyes/src/engine/core/Vector3.js#L224)：当前操作：写入 无直接字段写入；返回 vector3。

## `eyes/src/engine/core/Version-84.js`

Pioneer 引擎版本字面量 70.1.0。。[源码](../../eyes/src/engine/core/Version-84.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Version-84-js)

## `eyes/src/engine/core/Viewport.js`

维护视口 DOM 和矩形、绑定相机、换算屏幕坐标并以 scissor 分区渲染。。[源码](../../eyes/src/engine/core/Viewport.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-Viewport-js)

### `Viewport`

维护视口 DOM 和矩形、绑定相机、换算屏幕坐标并以 scissor 分区渲染。。父类 `PioneerPublicApi.CollectionItem`。

- `constructor(viewportName, engine)` [源码:5](../../eyes/src/engine/core/Viewport.js#L5)：当前操作：写入 _backgroundColor、_bounds、_camera、_div、_div.id、_div.style.overflow、_div.style.position、_enabled、_threeJsBackgroundColor；返回 无显式返回。
- `getEngine()` [源码:25](../../eyes/src/engine/core/Viewport.js#L25)：当前操作：写入 无直接字段写入；返回 this.__getCollectionParent()。
- `getDiv()` [源码:28](../../eyes/src/engine/core/Viewport.js#L28)：当前操作：写入 无直接字段写入；返回 this._div。
- `getBounds()` [源码:31](../../eyes/src/engine/core/Viewport.js#L31)：当前操作：写入 无直接字段写入；返回 this._bounds。
- `getBackgroundColor()` [源码:34](../../eyes/src/engine/core/Viewport.js#L34)：当前操作：写入 无直接字段写入；返回 this._backgroundColor。
- `setBackgroundColor(color)` [源码:37](../../eyes/src/engine/core/Viewport.js#L37)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getCamera()` [源码:41](../../eyes/src/engine/core/Viewport.js#L41)：当前操作：写入 无直接字段写入；返回 this._camera。
- `setCamera(camera)` [源码:44](../../eyes/src/engine/core/Viewport.js#L44)：当前操作：写入 _camera；返回 无显式返回。
- `isEnabled()` [源码:53](../../eyes/src/engine/core/Viewport.js#L53)：当前操作：写入 无直接字段写入；返回 this._enabled。
- `setEnabled(enabled)` [源码:56](../../eyes/src/engine/core/Viewport.js#L56)：当前操作：写入 _div.style.display、_enabled；返回 无显式返回。
- `getNormalSpacePositionFromPixelSpacePosition(output, pixelPosition)` [源码:64](../../eyes/src/engine/core/Viewport.js#L64)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getPixelSpacePositionFromNormalSpacePosition(output, normalPosition)` [源码:69](../../eyes/src/engine/core/Viewport.js#L69)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getPixelSpaceRadiusFromNormalSpaceRadius(normalRadius)` [源码:77](../../eyes/src/engine/core/Viewport.js#L77)：当前操作：写入 无直接字段写入；返回 normalRadius*Math.max(this._bounds.size.x,this._bounds.size.y)。
- `getNormalSpaceRadiusFromPixelSpaceRadius(pixelRadius)` [源码:80](../../eyes/src/engine/core/Viewport.js#L80)：当前操作：写入 无直接字段写入；返回 pixelRadius/Math.max(this._bounds.size.x,this._bounds.size.y)。
- `getDirectionOfCursor(output)` [源码:83](../../eyes/src/engine/core/Viewport.js#L83)：当前操作：写入 无直接字段写入；返回 void output.copy(PioneerPublicApi.Vector3.NaN)。
- `__destroy()` [源码:95](../../eyes/src/engine/core/Viewport.js#L95)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__updateViewportVariables()` [源码:99](../../eyes/src/engine/core/Viewport.js#L99)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__render()` [源码:107](../../eyes/src/engine/core/Viewport.js#L107)：当前操作：写入 无直接字段写入；返回 void。

## `eyes/src/engine/core/VisibleInterval.js`

以距离、像素/法线半径等量计算组件可见范围及边缘透明度。。[源码](../../eyes/src/engine/core/VisibleInterval.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-VisibleInterval-js)

### `VisibleInterval`

最小与最大阈值可分别使用像素半径、标准化半径或 z 距离；各自归一化渐隐后取较小值，保留单位与零阈值分支。。父类 `无`。

- `constructor(min=0, max=0, minSpace="pixel-radius", maxSpace=minSpace, fadeBlur=.5)` [源码:8](../../eyes/src/engine/core/VisibleInterval.js#L8)：当前操作：写入 _fadeBlur、_max、_maxSpace、_min、_minSpace；返回 无显式返回。
- `get min()` [源码:15](../../eyes/src/engine/core/VisibleInterval.js#L15)：当前操作：写入 无直接字段写入；返回 this._min。
- `set min(min)` [源码:18](../../eyes/src/engine/core/VisibleInterval.js#L18)：当前操作：写入 _min；返回 无显式返回。
- `get max()` [源码:21](../../eyes/src/engine/core/VisibleInterval.js#L21)：当前操作：写入 无直接字段写入；返回 this._max。
- `set max(max)` [源码:24](../../eyes/src/engine/core/VisibleInterval.js#L24)：当前操作：写入 _max；返回 无显式返回。
- `get minSpace()` [源码:27](../../eyes/src/engine/core/VisibleInterval.js#L27)：当前操作：写入 无直接字段写入；返回 this._minSpace。
- `get maxSpace()` [源码:30](../../eyes/src/engine/core/VisibleInterval.js#L30)：当前操作：写入 无直接字段写入；返回 this._maxSpace。
- `get fadeBlur()` [源码:33](../../eyes/src/engine/core/VisibleInterval.js#L33)：当前操作：写入 无直接字段写入；返回 this._fadeBlur。
- `set fadeBlur(fadeBlur)` [源码:36](../../eyes/src/engine/core/VisibleInterval.js#L36)：当前操作：写入 _fadeBlur；返回 无显式返回。
- `toString()` [源码:39](../../eyes/src/engine/core/VisibleInterval.js#L39)：当前操作：写入 无直接字段写入；返回 ˋ[${this._min}, ${this._max}]ˋ。
- `copy(source)` [源码:42](../../eyes/src/engine/core/VisibleInterval.js#L42)：当前操作：写入 _fadeBlur、_max、_maxSpace、_min、_minSpace；返回 无显式返回。
- `set(min, max)` [源码:49](../../eyes/src/engine/core/VisibleInterval.js#L49)：当前操作：写入 _max、_min；返回 无显式返回。
- `length()` [源码:53](../../eyes/src/engine/core/VisibleInterval.js#L53)：当前操作：写入 无直接字段写入；返回 this._max-this._min。
- `clamp(value)` [源码:56](../../eyes/src/engine/core/VisibleInterval.js#L56)：当前操作：写入 无直接字段写入；返回 Math.min(Math.max(this._min,value),this._max)。
- `expandTo(value)` [源码:59](../../eyes/src/engine/core/VisibleInterval.js#L59)：当前操作：写入 _max、_min；返回 无显式返回。
- `contains(value)` [源码:63](../../eyes/src/engine/core/VisibleInterval.js#L63)：当前操作：写入 无直接字段写入；返回 this._min<=value&&value<this._max。
- `intersects(other)` [源码:66](../../eyes/src/engine/core/VisibleInterval.js#L66)：当前操作：写入 无直接字段写入；返回 this._min<other.max&&other.min<this._max。
- `intersection(left, right)` [源码:69](../../eyes/src/engine/core/VisibleInterval.js#L69)：当前操作：写入 _max、_min；返回 无显式返回。
- `union(left, right)` [源码:76](../../eyes/src/engine/core/VisibleInterval.js#L76)：当前操作：写入 _max、_min；返回 无显式返回。
- `getFadeMultiplier(entity, camera)` [源码:80](../../eyes/src/engine/core/VisibleInterval.js#L80)：当前操作：写入 无直接字段写入；返回 Math.min(minimumFade,maximumFade)。

## `eyes/src/engine/core/VoyagerGrandTourStory.js`

旅行者大巡游故事定义：任务阶段、时间和视角的叙事配置。。[源码](../../eyes/src/engine/core/VoyagerGrandTourStory.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-VoyagerGrandTourStory-js)

## `eyes/src/engine/core/assertIsShader.js`

检查对象是否满足着色器描述结构并在无效时抛错。。[源码](../../eyes/src/engine/core/assertIsShader.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-assertIsShader-js)

## `eyes/src/engine/core/version-8.js`

应用库版本字面量 v2.6.1。。[源码](../../eyes/src/engine/core/version-8.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-version-8-js)

## `eyes/src/engine/core/waitUntil.js`

按轮询间隔等待谓词满足并提供超时错误。。[源码](../../eyes/src/engine/core/waitUntil.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-core-waitUntil-js)

## `eyes/src/engine/managers/AutoplayManager.js`

按设定实体/时间/相机序列自动播放并响应暂停/交互。。[源码](../../eyes/src/engine/managers/AutoplayManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-AutoplayManager-js)

### `AutoplayManager`

按设定实体/时间/相机序列自动播放并响应暂停/交互。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app, url)` [源码:8](../../eyes/src/engine/managers/AutoplayManager.js#L8)：当前操作：写入 _currentIndex、_interval、_intervalTimer、_isPlaying、_resetStates、_slideTimer、_slides、_url；返回 无显式返回。
- `init()` [源码:26](../../eyes/src/engine/managers/AutoplayManager.js#L26)：当前操作：写入 _slides；返回 无显式返回。
- `get interval()` [源码:34](../../eyes/src/engine/managers/AutoplayManager.js#L34)：当前操作：写入 无直接字段写入；返回 this._interval。
- `set interval(intervalSeconds)` [源码:37](../../eyes/src/engine/managers/AutoplayManager.js#L37)：当前操作：写入 _interval；返回 无显式返回。
- `_isValidTime(durationValue)` [源码:40](../../eyes/src/engine/managers/AutoplayManager.js#L40)：当前操作：写入 无直接字段写入；返回 ""!==durationValue&&!isNaN(Number(durationValue))&&Number(durationValue)>0。
- `startAutoplay(cancelToken)` [源码:43](../../eyes/src/engine/managers/AutoplayManager.js#L43)：当前操作：写入 _isPlaying；返回 无显式返回。
- `_triggerInterval(cancelToken)` [源码:50](../../eyes/src/engine/managers/AutoplayManager.js#L50)：当前操作：写入 _intervalTimer；返回 无显式返回。
- `playNextSlide(cancelToken)` [源码:57](../../eyes/src/engine/managers/AutoplayManager.js#L57)：当前操作：写入 _currentIndex；返回 无显式返回。
- `playSlide(slideIndex, cancelToken)` [源码:62](../../eyes/src/engine/managers/AutoplayManager.js#L62)：当前操作：写入 _intervalTimer、_slideTimer；返回 void、void this._triggerInterval(cancelToken)、void(await this.stopAutoplay())。
- `_updateCamera(entityInfo, eventInfo={})` [源码:131](../../eyes/src/engine/managers/AutoplayManager.js#L131)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `stopAutoplay()` [源码:156](../../eyes/src/engine/managers/AutoplayManager.js#L156)：当前操作：写入 _currentIndex、_intervalTimer、_isPlaying、_slideTimer；返回 void。

## `eyes/src/engine/managers/BaseManager.js`

应用管理器基类：持有 app/pioneer，管理事件名、回调登记和函数绑定。。[源码](../../eyes/src/engine/managers/BaseManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-BaseManager-js)

### `BaseManager`

应用管理器基类：持有 app/pioneer，管理事件名、回调登记和函数绑定。。父类 `无`。

- `constructor(app)` [源码:6](../../eyes/src/engine/managers/BaseManager.js#L6)：当前操作：写入 _app、_callbacks、_eventNames、_pioneer；返回 无显式返回。
- `get pioneer()` [源码:12](../../eyes/src/engine/managers/BaseManager.js#L12)：当前操作：写入 无直接字段写入；返回 this._pioneer。
- `get app()` [源码:15](../../eyes/src/engine/managers/BaseManager.js#L15)：当前操作：写入 无直接字段写入；返回 this._app。
- `_initCallbacks()` [源码:18](../../eyes/src/engine/managers/BaseManager.js#L18)：当前操作：写入 _callbacks[this._eventNames[eventIndex]]；返回 无显式返回。
- `registerCallback(eventName, callback)` [源码:21](../../eyes/src/engine/managers/BaseManager.js#L21)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeCallback(eventName, callback)` [源码:24](../../eyes/src/engine/managers/BaseManager.js#L24)：当前操作：写入 无直接字段写入；返回 void。
- `triggerCallbacks(eventName, callbackArgs=[])` [源码:29](../../eyes/src/engine/managers/BaseManager.js#L29)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `bindFunctions(methodNames=[])` [源码:34](../../eyes/src/engine/managers/BaseManager.js#L34)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `destroy()` [源码:41](../../eyes/src/engine/managers/BaseManager.js#L41)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__destroy()` [源码:44](../../eyes/src/engine/managers/BaseManager.js#L44)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/managers/CameraFollowManager.js`

协调跟随实体及跟随选项，将焦点变化传递给相机脚本。。[源码](../../eyes/src/engine/managers/CameraFollowManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-CameraFollowManager-js)

### `CameraFollowManager`

协调跟随实体及跟随选项，将焦点变化传递给相机脚本。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app, options={})` [源码:9](../../eyes/src/engine/managers/CameraFollowManager.js#L9)：当前操作：写入 _hideSearchTimeout、_isEnabled、_offsetObserver、_options、_prevValues、_resizeObserver、_returnToPreviousCamView、_sumParent、followId、followName、optionElement、search；返回 无显式返回。
- `setFollowVars(followId)` [源码:52](../../eyes/src/engine/managers/CameraFollowManager.js#L52)：当前操作：写入 followEntity、followId、followName；返回 无显式返回。
- `setToastContent({reset=false}={})` [源码:68](../../eyes/src/engine/managers/CameraFollowManager.js#L68)：当前操作：写入 无直接字段写入；返回 void toastComponent.setContent("")。
- `showToast()` [源码:86](../../eyes/src/engine/managers/CameraFollowManager.js#L86)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `validateTimeLimits()` [源码:89](../../eyes/src/engine/managers/CameraFollowManager.js#L89)：当前操作：写入 无直接字段写入；返回 {isValid:false}、{isValid:true,minTime:overlapStart,maxTime:overlapEnd}。
- `follow(followId)` [源码:145](../../eyes/src/engine/managers/CameraFollowManager.js#L145)：当前操作：写入 _isEnabled；返回 void。
- `unfollow()` [源码:200](../../eyes/src/engine/managers/CameraFollowManager.js#L200)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `animateCamera(duration)` [源码:231](../../eyes/src/engine/managers/CameraFollowManager.js#L231)：当前操作：写入 无直接字段写入；返回 this.app.getManager("camera").followTheEntity(this.targetId,this.followId,this._sumParent.getName(),duration)。
- `setParentsChangedCallbacks({targetEntity=this.targetEntity,reset=false}={})` [源码:250](../../eyes/src/engine/managers/CameraFollowManager.js#L250)：当前操作：写入 无直接字段写入；返回 void this.followEntity?.removeParentChangedCallback(this.updateOccludedEntities)。
- `setLabelWeight(entityId, reset=false, followWeight="201")` [源码:261](../../eyes/src/engine/managers/CameraFollowManager.js#L261)：当前操作：写入 _prevValues.weights[entityId]；返回 void。
- `updateOccludedEntities({reset=false}={})` [源码:268](../../eyes/src/engine/managers/CameraFollowManager.js#L268)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getEntitiesToUnocclude()` [源码:274](../../eyes/src/engine/managers/CameraFollowManager.js#L274)：当前操作：写入 无直接字段写入；返回 [...new Set(entityIds)].filter(Boolean)。
- `setOcclusionProps(entityIds)` [源码:278](../../eyes/src/engine/managers/CameraFollowManager.js#L278)：当前操作：写入 _prevValues.occlusion、_prevValues.occlusion[unoccludedEntityId]；返回 无显式返回。
- `setTargetNotClickable(entityId, reset=false)` [源码:293](../../eyes/src/engine/managers/CameraFollowManager.js#L293)：当前操作：写入 无直接字段写入；返回 void。
- `_createReframeElement()` [源码:302](../../eyes/src/engine/managers/CameraFollowManager.js#L302)：当前操作：写入 _reframeElement；返回 无显式返回。
- `_createSumParent()` [源码:308](../../eyes/src/engine/managers/CameraFollowManager.js#L308)：当前操作：写入 无直接字段写入；返回 sumParent。
- `initSearch(searchParent)` [源码:316](../../eyes/src/engine/managers/CameraFollowManager.js#L316)：当前操作：写入 search、search._config.infoText.default；返回 无显式返回。
- `showSearch()` [源码:338](../../eyes/src/engine/managers/CameraFollowManager.js#L338)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hideSearch()` [源码:343](../../eyes/src/engine/managers/CameraFollowManager.js#L343)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setTimeLimits({minTime:minTime,maxTime:maxTime,reset=false}={})` [源码:347](../../eyes/src/engine/managers/CameraFollowManager.js#L347)：当前操作：写入 _prevValues.timeLimits；返回 无显式返回。
- `setYawPitchLimits()` [源码:372](../../eyes/src/engine/managers/CameraFollowManager.js#L372)：当前操作：写入 无直接字段写入；返回 void。
- `setSearchOptions({targetId=this.targetId,followId=this.followId,reset=false}={})` [源码:393](../../eyes/src/engine/managers/CameraFollowManager.js#L393)：当前操作：写入 无直接字段写入；返回 void this.search?.setExcludeResults([])、void。
- `entitiesInPlace()` [源码:457](../../eyes/src/engine/managers/CameraFollowManager.js#L457)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `update()` [源码:461](../../eyes/src/engine/managers/CameraFollowManager.js#L461)：当前操作：写入 无直接字段写入；返回 void。
- `setEnabled(enabled, {resetLimits=true,removeQueries:removedQueries=["followId","time","rate"]}={})` [源码:470](../../eyes/src/engine/managers/CameraFollowManager.js#L470)：当前操作：写入 _isEnabled；返回 无显式返回。
- `setHideTimeout()` [源码:492](../../eyes/src/engine/managers/CameraFollowManager.js#L492)：当前操作：写入 _hideSearchTimeout；返回 无显式返回。
- `stopHideTimeout()` [源码:499](../../eyes/src/engine/managers/CameraFollowManager.js#L499)：当前操作：写入 _hideSearchTimeout；返回 无显式返回。
- `get targetId()` [源码:503](../../eyes/src/engine/managers/CameraFollowManager.js#L503)：当前操作：写入 无直接字段写入；返回 _target。
- `get targetEntity()` [源码:512](../../eyes/src/engine/managers/CameraFollowManager.js#L512)：当前操作：写入 无直接字段写入；返回 this.app.scene.getEntity(this.targetId)。
- `get followInnerHtml()` [源码:515](../../eyes/src/engine/managers/CameraFollowManager.js#L515)：当前操作：写入 无直接字段写入；返回 this.followName?ˋFollowing <span class='camera-follow-name'>${this.followName}</span>ˋ:"Follow Target"。
- `get isEnabled()` [源码:518](../../eyes/src/engine/managers/CameraFollowManager.js#L518)：当前操作：写入 无直接字段写入；返回 this._isEnabled。

## `eyes/src/engine/managers/CameraManager.js`

拥有主相机目标/控制器配置，执行观察模式、相机定位、变焦和控制切换。。[源码](../../eyes/src/engine/managers/CameraManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-CameraManager-js)

### `CameraManager`

拥有主相机目标/控制器配置，执行观察模式、相机定位、变焦和控制切换。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app, defaultScene)` [源码:7](../../eyes/src/engine/managers/CameraManager.js#L7)：当前操作：写入 _cameraEntity、_context、_defaultMaxDistance、_defaultScene、_dynEnvMap、_fullLightColor、_id、_isFreeFly、_isTransitioning、_previousId、_selectionCallback、_shadowLightColor、_viewport、_zoomSensitivity；返回 无显式返回。
- `createViewportAndCamera(defaultScene)` [源码:33](../../eyes/src/engine/managers/CameraManager.js#L33)：当前操作：写入 _cameraEntity、_cameraLight、_defaultScene、_dynEnvMap、_viewport、_viewport.getDiv().style.height、_viewport.getDiv().style.left、_viewport.getDiv().style.top、_viewport.getDiv().style.width；返回 无显式返回。
- `getContext()` [源码:45](../../eyes/src/engine/managers/CameraManager.js#L45)：当前操作：写入 无直接字段写入；返回 this._context。
- `getIsTransitioning()` [源码:48](../../eyes/src/engine/managers/CameraManager.js#L48)：当前操作：写入 无直接字段写入；返回 this._isTransitioning。
- `setIsTransitioning(isTransitioning)` [源码:51](../../eyes/src/engine/managers/CameraManager.js#L51)：当前操作：写入 _isTransitioning；返回 无显式返回。
- `waitForTransitionComplete()` [源码:54](../../eyes/src/engine/managers/CameraManager.js#L54)：当前操作：写入 无直接字段写入；返回 new Promise(resolveTransition=>{let transitionPoll=setInterval(()=>{this._isTransitioning\|\|(clearInterval(transitionPoll),transitionPoll=null,resolveTransition(true));},1e3);})。
- `setContext(context)` [源码:61](../../eyes/src/engine/managers/CameraManager.js#L61)：当前操作：写入 _context、_id、_previousId；返回 无显式返回。
- `getCurrentId()` [源码:73](../../eyes/src/engine/managers/CameraManager.js#L73)：当前操作：写入 无直接字段写入；返回 this._id。
- `getShadowLightColor()` [源码:76](../../eyes/src/engine/managers/CameraManager.js#L76)：当前操作：写入 无直接字段写入；返回 this._shadowLightColor。
- `getFullLightColor()` [源码:79](../../eyes/src/engine/managers/CameraManager.js#L79)：当前操作：写入 无直接字段写入；返回 this._fullLightColor。
- `get defaultScene()` [源码:82](../../eyes/src/engine/managers/CameraManager.js#L82)：当前操作：写入 无直接字段写入；返回 this._defaultScene。
- `get cameraEntity()` [源码:85](../../eyes/src/engine/managers/CameraManager.js#L85)：当前操作：写入 无直接字段写入；返回 this._cameraEntity。
- `get cameraLight()` [源码:88](../../eyes/src/engine/managers/CameraManager.js#L88)：当前操作：写入 无直接字段写入；返回 this._cameraLight。
- `get dynamicEnvMap()` [源码:91](../../eyes/src/engine/managers/CameraManager.js#L91)：当前操作：写入 无直接字段写入；返回 this._dynEnvMap。
- `toggleCameraLight(enabled, lightColor)` [源码:94](../../eyes/src/engine/managers/CameraManager.js#L94)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `updateLighting(lightingMode)` [源码:97](../../eyes/src/engine/managers/CameraManager.js#L97)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getSelectionCallback()` [源码:100](../../eyes/src/engine/managers/CameraManager.js#L100)：当前操作：写入 无直接字段写入；返回 this._selectionCallback。
- `setSelectionCallback(selectionCallback)` [源码:103](../../eyes/src/engine/managers/CameraManager.js#L103)：当前操作：写入 _selectionCallback；返回 无显式返回。
- `getIsFreeFly()` [源码:106](../../eyes/src/engine/managers/CameraManager.js#L106)：当前操作：写入 无直接字段写入；返回 this._isFreeFly。
- `setUpFreeFlyCamera()` [源码:109](../../eyes/src/engine/managers/CameraManager.js#L109)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resetFreeFlyCamera()` [源码:116](../../eyes/src/engine/managers/CameraManager.js#L116)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `enableFreeFly()` [源码:146](../../eyes/src/engine/managers/CameraManager.js#L146)：当前操作：写入 _isFreeFly；返回 无显式返回。
- `disableFreeFly()` [源码:153](../../eyes/src/engine/managers/CameraManager.js#L153)：当前操作：写入 _isFreeFly；返回 无显式返回。
- `toggleFreeFly()` [源码:158](../../eyes/src/engine/managers/CameraManager.js#L158)：当前操作：写入 无直接字段写入；返回 void this.enableFreeFly()。
- `goToEntity(id, {camera:camera,scene:scene,destination:destination,distance:distance,cinematic=false,minRadius:minimumRadius=.001,maxRadius:maximumRadius=this._defaultMaxDistance,duration:transitionDuration=.75,destinationUp:destinationUp,zoom:enableZoom=true,select:enableSelection=true,useSpheroidRadiusForDistance=false,roll:enableRoll=false,keyframes:keyframes,transitionFunction:transitionFunction}={})` [源码:169](../../eyes/src/engine/managers/CameraManager.js#L169)：当前操作：写入 _id、_isTransitioning；返回 void(this._isTransitioning=false)。
- `followTheEntity(targetId, focusId, transitionParentId, transitionDuration)` [源码:252](../../eyes/src/engine/managers/CameraManager.js#L252)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `goToBetweenPos(focusEntity, {duration:duration,destination:destination,destinationUp:destinationUp,transitionFunction:transitionFunction,zoomInterval:zoomInterval})` [源码:315](../../eyes/src/engine/managers/CameraManager.js#L315)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `zoom(zoomMultiplier, cameraEntity=this._cameraEntity)` [源码:355](../../eyes/src/engine/managers/CameraManager.js#L355)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `zoomIn(isHeld=false)` [源码:365](../../eyes/src/engine/managers/CameraManager.js#L365)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `zoomOut(isHeld=false)` [源码:371](../../eyes/src/engine/managers/CameraManager.js#L371)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `get defaultMaxDistance()` [源码:377](../../eyes/src/engine/managers/CameraManager.js#L377)：当前操作：写入 无直接字段写入；返回 this._defaultMaxDistance。
- `set defaultMaxDistance(defaultMaxDistance)` [源码:380](../../eyes/src/engine/managers/CameraManager.js#L380)：当前操作：写入 _defaultMaxDistance；返回 无显式返回。
- `addDynamicEnvMap(entity)` [源码:383](../../eyes/src/engine/managers/CameraManager.js#L383)：当前操作：写入 无直接字段写入；返回 void。

## `eyes/src/engine/managers/ComparisonManager.js`

创建实体大小/属性比较场景，调整实体布局并在退出时恢复原场景状态。。[源码](../../eyes/src/engine/managers/ComparisonManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-ComparisonManager-js)

### `ComparisonManager`

创建实体大小/属性比较场景，调整实体布局并在退出时恢复原场景状态。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app)` [源码:7](../../eyes/src/engine/managers/ComparisonManager.js#L7)：当前操作：写入 _activeViewports、_anchorEntityLeft、_anchorEntityRight、_cameraEntityLeft、_cameraEntityRight、_cameraLeft、_cameraLightLeft、_cameraLightRight、_cameraRight、_customRotations、_entityLeft、_entityRight、_sceneLeft、_sceneRight、_sunLeft、_sunRight、_viewportLeft、_viewportLeft.getDiv().className、_viewportRight、_viewportRight.getDiv().className、_zoomSensitivity；返回 无显式返回。
- `get entityLeft()` [源码:81](../../eyes/src/engine/managers/ComparisonManager.js#L81)：当前操作：写入 无直接字段写入；返回 this._entityLeft。
- `get entityRight()` [源码:84](../../eyes/src/engine/managers/ComparisonManager.js#L84)：当前操作：写入 无直接字段写入；返回 this._entityRight。
- `zoomIn(isHeld=false)` [源码:87](../../eyes/src/engine/managers/ComparisonManager.js#L87)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `zoomOut(isHeld=false)` [源码:95](../../eyes/src/engine/managers/ComparisonManager.js#L95)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `compare(leftEntityId, rightEntityId)` [源码:103](../../eyes/src/engine/managers/ComparisonManager.js#L103)：当前操作：写入 _entityLeft、_entityRight；返回 无显式返回。
- `setCameraLight(enabled, lightColor)` [源码:199](../../eyes/src/engine/managers/ComparisonManager.js#L199)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `exit()` [源码:205](../../eyes/src/engine/managers/ComparisonManager.js#L205)：当前操作：写入 _activeViewports、_entityLeft、_entityRight；返回 无显式返回。
- `_updateSuns()` [源码:221](../../eyes/src/engine/managers/ComparisonManager.js#L221)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_adjustZoomFromViewport()` [源码:233](../../eyes/src/engine/managers/ComparisonManager.js#L233)：当前操作：写入 无直接字段写入；返回 void。
- `_getCustomRotation(outputRotation, entityId, side)` [源码:249](../../eyes/src/engine/managers/ComparisonManager.js#L249)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/managers/ContentManager.js`

读取实体说明数据库，组织标题、描述、媒体、高清贴图和功能选项。。[源码](../../eyes/src/engine/managers/ContentManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-ContentManager-js)

### `ContentManager`

读取实体说明数据库，组织标题、描述、媒体、高清贴图和功能选项。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app)` [源码:8](../../eyes/src/engine/managers/ContentManager.js#L8)：当前操作：写入 _categoryShapeMap、_context、_context.eventDesc、_context.events、_context.orderedEvents、_context.story、_entitiesByCategory、_entitiesBySubCategory、_entityList、_folders、_stories、_storyList、_target；返回 无显式返回。
- `getEntityList()` [源码:49](../../eyes/src/engine/managers/ContentManager.js#L49)：当前操作：写入 无直接字段写入；返回 this._entityList。
- `setEntityList(entityList)` [源码:52](../../eyes/src/engine/managers/ContentManager.js#L52)：当前操作：写入 _entitiesByCategory[category]、_entitiesBySubCategory[subcategory]、_entityList；返回 无显式返回。
- `getEntityInfo(entityId)` [源码:67](../../eyes/src/engine/managers/ContentManager.js#L67)：当前操作：写入 无直接字段写入；返回 entityId in this._entityList?this._entityList[entityId]:null。
- `getEntityDesc(entityId)` [源码:70](../../eyes/src/engine/managers/ContentManager.js#L70)：当前操作：写入 无直接字段写入；返回 description。
- `setFolders(folders={})` [源码:79](../../eyes/src/engine/managers/ContentManager.js#L79)：当前操作：写入 _folders[folderName]；返回 无显式返回。
- `getStoryList()` [源码:82](../../eyes/src/engine/managers/ContentManager.js#L82)：当前操作：写入 无直接字段写入；返回 this._storyList。
- `setStoryList(storyList)` [源码:85](../../eyes/src/engine/managers/ContentManager.js#L85)：当前操作：写入 _storyList；返回 无显式返回。
- `getStory(storyId)` [源码:88](../../eyes/src/engine/managers/ContentManager.js#L88)：当前操作：写入 _context.story；返回 this._context.story。
- `setStories(stories)` [源码:94](../../eyes/src/engine/managers/ContentManager.js#L94)：当前操作：写入 _stories；返回 无显式返回。
- `loadDescriptions(entityIds, cancelToken)` [源码:97](../../eyes/src/engine/managers/ContentManager.js#L97)：当前操作：写入 _context[entityId]；返回 void。
- `loadEvents(target, eventFiles={}, cancelToken)` [源码:105](../../eyes/src/engine/managers/ContentManager.js#L105)：当前操作：写入 _context.eventDesc、_context.events、_context.orderedEvents、_target；返回 void。
- `getSpheroidLayers(entityId)` [源码:137](../../eyes/src/engine/managers/ContentManager.js#L137)：当前操作：写入 无直接字段写入；返回 this._entityShperoidLayersList[entityId]。
- `setSpheroidLayers(entityShperoidLayersList)` [源码:140](../../eyes/src/engine/managers/ContentManager.js#L140)：当前操作：写入 _entityShperoidLayersList；返回 无显式返回。
- `getSpheroidDefaultTextureInformation(entityId, preservedFeatures=[])` [源码:143](../../eyes/src/engine/managers/ContentManager.js#L143)：当前操作：写入 无直接字段写入；返回 {id:"default",title:"Default Texture",type:"texture",features:preservedFeatures,textures:textures}。
- `getSpheroidFeatures(entityId)` [源码:160](../../eyes/src/engine/managers/ContentManager.js#L160)：当前操作：写入 无直接字段写入；返回 this._entityShperoidFeaturesList[entityId]\|\|[]。
- `setSpheroidFeatures(entityShperoidFeaturesList)` [源码:163](../../eyes/src/engine/managers/ContentManager.js#L163)：当前操作：写入 _entityShperoidFeaturesList；返回 无显式返回。
- `getSpheroidId(entityInfo)` [源码:166](../../eyes/src/engine/managers/ContentManager.js#L166)：当前操作：写入 无直接字段写入；返回 spheroidId。
- `getCategoryShapeMap()` [源码:175](../../eyes/src/engine/managers/ContentManager.js#L175)：当前操作：写入 无直接字段写入；返回 this._categoryShapeMap。
- `getColorClass(entityId)` [源码:178](../../eyes/src/engine/managers/ContentManager.js#L178)：当前操作：写入 无直接字段写入；返回 colorClass。
- `hasLanded(entityInfo)` [源码:212](../../eyes/src/engine/managers/ContentManager.js#L212)：当前操作：写入 无直接字段写入；返回 false、!!this._app.getManager("time").getTime().isSameOrAfter(landingTime)。
- `isLandingSite(entityId)` [源码:219](../../eyes/src/engine/managers/ContentManager.js#L219)：当前操作：写入 无直接字段写入；返回 !!entityInfo&&entityInfo.category.toLowerCase().includes("landing site")。
- `getClassName(entityId, categoryName)` [源码:223](../../eyes/src/engine/managers/ContentManager.js#L223)：当前操作：写入 无直接字段写入；返回 className。
- `hasKeyword(entityId, keyword)` [源码:232](../../eyes/src/engine/managers/ContentManager.js#L232)：当前操作：写入 无直接字段写入；返回 this.getEntityInfo(entityId).keywords.includes(keyword)。
- `resetContext()` [源码:235](../../eyes/src/engine/managers/ContentManager.js#L235)：当前操作：写入 _context、_context.eventDesc、_context.events、_context.orderedEvents、_context.story；返回 无显式返回。
- `hideExternalLinksInText(text)` [源码:242](../../eyes/src/engine/managers/ContentManager.js#L242)：当前操作：写入 无直接字段写入；返回 text?.replaceAll(/<a.*?href=['"](https?:)?\/\/[^>]*>(.*?)<\/a>/g,"$2")。
- `hideExternalLinkStoryList()` [源码:245](../../eyes/src/engine/managers/ContentManager.js#L245)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_handleError(error, messagePrefix="")` [源码:261](../../eyes/src/engine/managers/ContentManager.js#L261)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `get entitiesByCategory()` [源码:266](../../eyes/src/engine/managers/ContentManager.js#L266)：当前操作：写入 无直接字段写入；返回 this._entitiesByCategory。
- `get entitiesBySubCategory()` [源码:269](../../eyes/src/engine/managers/ContentManager.js#L269)：当前操作：写入 无直接字段写入；返回 this._entitiesBySubCategory。
- `get context()` [源码:272](../../eyes/src/engine/managers/ContentManager.js#L272)：当前操作：写入 无直接字段写入；返回 this._context。
- `get events()` [源码:275](../../eyes/src/engine/managers/ContentManager.js#L275)：当前操作：写入 无直接字段写入；返回 this._context.events。
- `get orderedEvents()` [源码:278](../../eyes/src/engine/managers/ContentManager.js#L278)：当前操作：写入 无直接字段写入；返回 this._context.orderedEvents。
- `get eventDesc()` [源码:281](../../eyes/src/engine/managers/ContentManager.js#L281)：当前操作：写入 无直接字段写入；返回 this._context.eventDesc。

## `eyes/src/engine/managers/DistanceManager.js`

管理距离/光行时面板所需的实体选择与距离计算。。[源码](../../eyes/src/engine/managers/DistanceManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-DistanceManager-js)

### `DistanceManager`

管理距离/光行时面板所需的实体选择与距离计算。。父类 `Eyes.BaseManager`。

- `constructor(app)` [源码:19](../../eyes/src/engine/managers/DistanceManager.js#L19)：当前操作：写入 _allowPlay、_allowRaycasting、_areClose、_areRelated、_bpAnimation、_bpParentIsSource、_currBetweenOffset、_currentSecond、_currentUnitSystem、_isBelowZero、_isTransitioning、_isWaitingForEntities、_on3dLineMouseMoveThrottled、_prevValues、_sourceDistanceEntity、_targetDistanceEntities、_tooltipOpts、_uValueCurrent、_uValueHold、_vectors、distanceInfo、distancePanel、errorResultTimeout、hasTarget、intersect、pionerEl；返回 无显式返回。
- `init()` [源码:64](../../eyes/src/engine/managers/DistanceManager.js#L64)：当前操作：写入 _betweenPosEntity、_bpController、distancePanel、pionerEl；返回 无显式返回。
- `deinit()` [源码:72](../../eyes/src/engine/managers/DistanceManager.js#L72)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hideSpacecraftLayer()` [源码:79](../../eyes/src/engine/managers/DistanceManager.js#L79)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `showSpacecraftLayer()` [源码:86](../../eyes/src/engine/managers/DistanceManager.js#L86)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addEvents()` [源码:93](../../eyes/src/engine/managers/DistanceManager.js#L93)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeEvents()` [源码:100](../../eyes/src/engine/managers/DistanceManager.js#L100)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resetEvents()` [源码:104](../../eyes/src/engine/managers/DistanceManager.js#L104)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateTooltip()` [源码:108](../../eyes/src/engine/managers/DistanceManager.js#L108)：当前操作：写入 _tooltipOpts.height、_tooltipOpts.instance、_tooltipOpts.isTouch；返回 void。
- `showTooltip()` [源码:134](../../eyes/src/engine/managers/DistanceManager.js#L134)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hideTooltip()` [源码:140](../../eyes/src/engine/managers/DistanceManager.js#L140)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `on3dLineMouseMove(event)` [源码:146](../../eyes/src/engine/managers/DistanceManager.js#L146)：当前操作：写入 intersect；返回 void、void(this.intersect=null)、void this.distancePanel.setLineGraphicDotOffset(null)。
- `getInterpolationU(interpolationU)` [源码:177](../../eyes/src/engine/managers/DistanceManager.js#L177)：当前操作：写入 无直接字段写入；返回 this._bpParentIsSource?surfaceInterpolation:1-surfaceInterpolation。
- `getOffsetU(graphicInterpolation)` [源码:186](../../eyes/src/engine/managers/DistanceManager.js#L186)：当前操作：写入 无直接字段写入；返回 .5!==graphicInterpolation?limitedU:minSurfaceU+(maxSurfaceU-minSurfaceU)*graphicInterpolation。
- `on3dLineClick(event, requestedU)` [源码:195](../../eyes/src/engine/managers/DistanceManager.js#L195)：当前操作：写入 intersect；返回 void。
- `onNewULimit()` [源码:238](../../eyes/src/engine/managers/DistanceManager.js#L238)：当前操作：写入 无直接字段写入；返回 void。
- `camToBetweenPos({targetU:targetU,duration=1.5,force=false}={})` [源码:256](../../eyes/src/engine/managers/DistanceManager.js#L256)：当前操作：写入 无直接字段写入；返回 void。
- `setBpAnimation({initialU:initialU,targetU:targetU,onUpdate:onUpdate,onEnd:onEnd,duration=1.5})` [源码:337](../../eyes/src/engine/managers/DistanceManager.js#L337)：当前操作：写入 _bpAnimation；返回 无显式返回。
- `_updateBpAnimation()` [源码:353](../../eyes/src/engine/managers/DistanceManager.js#L353)：当前操作：写入 _bpAnimation；返回 无显式返回。
- `pauseTime()` [源码:374](../../eyes/src/engine/managers/DistanceManager.js#L374)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `playTime()` [源码:381](../../eyes/src/engine/managers/DistanceManager.js#L381)：当前操作：写入 无直接字段写入；返回 void。
- `swapSourceAndTarget()` [源码:388](../../eyes/src/engine/managers/DistanceManager.js#L388)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setBetweenOffsetVars(offsetX, offsetY)` [源码:403](../../eyes/src/engine/managers/DistanceManager.js#L403)：当前操作：写入 _currBetweenOffset；返回 void。
- `getAccurateRadius(entity, reverseDirection=false)` [源码:417](../../eyes/src/engine/managers/DistanceManager.js#L417)：当前操作：写入 无直接字段写入；返回 accurateRadius。
- `measureDistance(forceUpdate=false, ephemerisTime=void 0)` [源码:436](../../eyes/src/engine/managers/DistanceManager.js#L436)：当前操作：写入 _isBelowZero、distanceInfo.measuredValue、sourceDistanceEntity.measurePoint.radius、targetDistanceEntities[0].measurePoint.radius；返回 null、this._getDistanceParams(this.measuredDistance)。
- `_getDistanceParams(distanceKilometers)` [源码:493](../../eyes/src/engine/managers/DistanceManager.js#L493)：当前操作：写入 无直接字段写入；返回 {prefix:prefix,value:displayValue,scale:scale,unit:unit,dps:precisionParts.length>1&&precisionParts[1].length>1?2:1,actualDistanceValue:actualDistanceValue}。
- `measureRelativeVelocity(ephemerisTime)` [源码:521](../../eyes/src/engine/managers/DistanceManager.js#L521)：当前操作：写入 无直接字段写入；返回 null、velocityParams。
- `_createDistanceEntity(entityId)` [源码:536](../../eyes/src/engine/managers/DistanceManager.js#L536)：当前操作：写入 无直接字段写入；返回 {id:entityId,entity:entity,info:entityInfo,measurePoint:measurePoint}。
- `_createBetweenEntity()` [源码:552](../../eyes/src/engine/managers/DistanceManager.js#L552)：当前操作：写入 无直接字段写入；返回 betweenEntity。
- `setBetweenEntityParent(parentEntity)` [源码:571](../../eyes/src/engine/managers/DistanceManager.js#L571)：当前操作：写入 _bpParentIsSource；返回 无显式返回。
- `toggleBetweenParent(interpolationU)` [源码:575](../../eyes/src/engine/managers/DistanceManager.js#L575)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setHoldU(uValueHold)` [源码:587](../../eyes/src/engine/managers/DistanceManager.js#L587)：当前操作：写入 _uValueHold；返回 无显式返回。
- `updateBetweenPoint(requestedU, applyLimit=true)` [源码:590](../../eyes/src/engine/managers/DistanceManager.js#L590)：当前操作：写入 _uValueCurrent；返回 void。
- `setBpControllerMults(interpolationU)` [源码:607](../../eyes/src/engine/managers/DistanceManager.js#L607)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resetUValue()` [源码:621](../../eyes/src/engine/managers/DistanceManager.js#L621)：当前操作：写入 _uValueCurrent；返回 无显式返回。
- `resetAreRelated()` [源码:624](../../eyes/src/engine/managers/DistanceManager.js#L624)：当前操作：写入 _areRelated；返回 无显式返回。
- `resetDistanceInfo()` [源码:627](../../eyes/src/engine/managers/DistanceManager.js#L627)：当前操作：写入 distanceInfo；返回 无显式返回。
- `setBetweenPosHidden(hidden)` [源码:634](../../eyes/src/engine/managers/DistanceManager.js#L634)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleCurrentUnitSystem()` [源码:638](../../eyes/src/engine/managers/DistanceManager.js#L638)：当前操作：写入 _currentUnitSystem；返回 无显式返回。
- `setMPPosition(distanceEntity, position=DEFAULT_MEASURE_POINT)` [源码:642](../../eyes/src/engine/managers/DistanceManager.js#L642)：当前操作：写入 无直接字段写入；返回 changed。
- `setMPAdjustable(distanceEntity, adjustable)` [源码:650](../../eyes/src/engine/managers/DistanceManager.js#L650)：当前操作：写入 无直接字段写入；返回 changed。
- `toggleSourceMeasurePoint()` [源码:658](../../eyes/src/engine/managers/DistanceManager.js#L658)：当前操作：写入 无直接字段写入；返回 void。
- `toggleTargetMeasurePoint()` [源码:668](../../eyes/src/engine/managers/DistanceManager.js#L668)：当前操作：写入 无直接字段写入；返回 void。
- `setSourceDistanceEntity(entityId)` [源码:678](../../eyes/src/engine/managers/DistanceManager.js#L678)：当前操作：写入 _distanceLine、_sourceDistanceEntity；返回 无显式返回。
- `setTargetDistanceEntities(entityIds)` [源码:695](../../eyes/src/engine/managers/DistanceManager.js#L695)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setTempErrorResult(errorText)` [源码:723](../../eyes/src/engine/managers/DistanceManager.js#L723)：当前操作：写入 errorResultTimeout；返回 new Promise(resolveTimeout=>{this.errorResultTimeout=setTimeout(()=>{this.distancePanel.setResult();resolveTimeout();},3e3);})。
- `setLabelWeight(entityId, reset=false, requestedWeight)` [源码:734](../../eyes/src/engine/managers/DistanceManager.js#L734)：当前操作：写入 _prevValues.weights[entityId]；返回 void。
- `setOcclusionRadius(entity, reset=false)` [源码:743](../../eyes/src/engine/managers/DistanceManager.js#L743)：当前操作：写入 _prevValues.occRadii[entityId]；返回 无显式返回。
- `setBetweenIntersectClass(intersects)` [源码:748](../../eyes/src/engine/managers/DistanceManager.js#L748)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleSourceIconClass(className, enabled)` [源码:751](../../eyes/src/engine/managers/DistanceManager.js#L751)：当前操作：写入 无直接字段写入；返回 void。
- `toggleTargetIconClass(className, enabled)` [源码:760](../../eyes/src/engine/managers/DistanceManager.js#L760)：当前操作：写入 无直接字段写入；返回 void。
- `calcMPPositions()` [源码:769](../../eyes/src/engine/managers/DistanceManager.js#L769)：当前操作：写入 _areClose、_areRelated；返回 void、changedPositions。
- `resetSourceDistanceEntity()` [源码:801](../../eyes/src/engine/managers/DistanceManager.js#L801)：当前操作：写入 _sourceDistanceEntity；返回 无显式返回。
- `addTargetDistanceEntity(entityId)` [源码:819](../../eyes/src/engine/managers/DistanceManager.js#L819)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resetTargetDistanceEntities()` [源码:826](../../eyes/src/engine/managers/DistanceManager.js#L826)：当前操作：写入 _targetDistanceEntities；返回 无显式返回。
- `valuesWithPrecisionAreEqual(leftValue, rightValue, precision=5)` [源码:848](../../eyes/src/engine/managers/DistanceManager.js#L848)：当前操作：写入 无直接字段写入；返回 null!=leftValue&&null!=rightValue&&(null==precision?leftValue===rightValue:leftValue.toPrecision(precision)===rightValue.toPrecision(precision))。
- `resetAllDistanceEntities()` [源码:851](../../eyes/src/engine/managers/DistanceManager.js#L851)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setHasTarget(hasTarget)` [源码:855](../../eyes/src/engine/managers/DistanceManager.js#L855)：当前操作：写入 hasTarget；返回 无显式返回。
- `setAllowRaycasting(allowRaycasting)` [源码:860](../../eyes/src/engine/managers/DistanceManager.js#L860)：当前操作：写入 _allowRaycasting；返回 无显式返回。
- `setAllowPlay(allowPlay)` [源码:863](../../eyes/src/engine/managers/DistanceManager.js#L863)：当前操作：写入 _allowPlay；返回 无显式返回。
- `setIsTransitioning(isTransitioning)` [源码:866](../../eyes/src/engine/managers/DistanceManager.js#L866)：当前操作：写入 _isTransitioning；返回 无显式返回。
- `setIsWaitingForEntities(isWaitingForEntities)` [源码:869](../../eyes/src/engine/managers/DistanceManager.js#L869)：当前操作：写入 _isWaitingForEntities；返回 无显式返回。
- `getEntitiesToLoad()` [源码:872](../../eyes/src/engine/managers/DistanceManager.js#L872)：当前操作：写入 无直接字段写入；返回 entityIds。
- `setDistanceInfo(ephemerisTime)` [源码:880](../../eyes/src/engine/managers/DistanceManager.js#L880)：当前操作：写入 distanceInfo.centerValue、distanceInfo.measuredValue、distanceInfo.sourceTargetDiff；返回 无显式返回。
- `isCloseEnough()` [源码:895](../../eyes/src/engine/managers/DistanceManager.js#L895)：当前操作：写入 无直接字段写入；返回 cameraDistanceRatio<5&&(cameraDistanceRatio<.5\|\|radiusDistanceRatio>1)、true。
- `updateMeasurement(time, forceUpdate=false)` [源码:909](../../eyes/src/engine/managers/DistanceManager.js#L909)：当前操作：写入 _currentSecond；返回 false、true。
- `calculateLightTime(distanceKilometers)` [源码:960](../../eyes/src/engine/managers/DistanceManager.js#L960)：当前操作：写入 无直接字段写入；返回 {timeHours:hours,timeMin:minutes,timeSec:seconds,timeMillisec:1e3*(fractionalSeconds-seconds)}。
- `_formatText(prefix, value, scale, unit, decimalPlaces)` [源码:974](../../eyes/src/engine/managers/DistanceManager.js#L974)：当前操作：写入 无直接字段写入；返回 ˋ${prefix}${formatNumber(value,"m"===unit\|\|"ft"===unit?0:decimalPlaces,"m"===unit\|\|"ft"===unit?0:decimalPlaces)} ${scale}ˋ。
- `calcIntersect()` [源码:977](../../eyes/src/engine/managers/DistanceManager.js#L977)：当前操作：写入 无直接字段写入；返回 null、{u:interpolationU,linePoint:closestPointOnLine}。
- `getLimitedU(interpolationU)` [源码:1037](../../eyes/src/engine/managers/DistanceManager.js#L1037)：当前操作：写入 无直接字段写入；返回 limits。
- `_grabVectors()` [源码:1065](../../eyes/src/engine/managers/DistanceManager.js#L1065)：当前操作：写入 _vectors；返回 无显式返回。
- `_releaseVectors()` [源码:1085](../../eyes/src/engine/managers/DistanceManager.js#L1085)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `update(time)` [源码:1088](../../eyes/src/engine/managers/DistanceManager.js#L1088)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `distanceIsValid(distance)` [源码:1107](../../eyes/src/engine/managers/DistanceManager.js#L1107)：当前操作：写入 无直接字段写入；返回 "number"==typeof distance&&!isNaN(distance)&&null!=distance&&distance!==1/0。
- `get centerDistance()` [源码:1110](../../eyes/src/engine/managers/DistanceManager.js#L1110)：当前操作：写入 无直接字段写入；返回 this.distanceInfo.centerValue。
- `get measuredDistance()` [源码:1113](../../eyes/src/engine/managers/DistanceManager.js#L1113)：当前操作：写入 无直接字段写入；返回 this.distanceInfo.measuredValue。
- `get sourceDisplayName()` [源码:1116](../../eyes/src/engine/managers/DistanceManager.js#L1116)：当前操作：写入 无直接字段写入；返回 info?.displayName\|\|info?.iauName。
- `get targetDisplayNames()` [源码:1122](../../eyes/src/engine/managers/DistanceManager.js#L1122)：当前操作：写入 无直接字段写入；返回 this.targetDistanceEntities.map(({info:info})=>info.displayName\|\|info.iauName)。
- `get targetDistanceEntities()` [源码:1127](../../eyes/src/engine/managers/DistanceManager.js#L1127)：当前操作：写入 无直接字段写入；返回 this._targetDistanceEntities。
- `get sourceDistanceEntity()` [源码:1130](../../eyes/src/engine/managers/DistanceManager.js#L1130)：当前操作：写入 无直接字段写入；返回 this._sourceDistanceEntity。

## `eyes/src/engine/managers/ERTManager.js`

计算地球接收时间/光程延迟并协调仿真时间显示。。[源码](../../eyes/src/engine/managers/ERTManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-ERTManager-js)

### `ERTManager`

计算地球接收时间/光程延迟并协调仿真时间显示。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app, {isERT=false,ertTarget="",sceneMgr=null}={})` [源码:5](../../eyes/src/engine/managers/ERTManager.js#L5)：当前操作：写入 _ertTarget、_isERT、_sceneMgr、getNow；返回 无显式返回。
- `isERT()` [源码:16](../../eyes/src/engine/managers/ERTManager.js#L16)：当前操作：写入 无直接字段写入；返回 this._isERT。
- `setERT(isERT)` [源码:19](../../eyes/src/engine/managers/ERTManager.js#L19)：当前操作：写入 _isERT；返回 无显式返回。
- `getERTTarget()` [源码:22](../../eyes/src/engine/managers/ERTManager.js#L22)：当前操作：写入 无直接字段写入；返回 this._ertTarget。
- `setERTTarget(ertTarget)` [源码:25](../../eyes/src/engine/managers/ERTManager.js#L25)：当前操作：写入 _ertTarget；返回 无显式返回。
- `getERTScene()` [源码:28](../../eyes/src/engine/managers/ERTManager.js#L28)：当前操作：写入 无直接字段写入；返回 this._sceneMgr。
- `setERTScene(sceneMgr)` [源码:31](../../eyes/src/engine/managers/ERTManager.js#L31)：当前操作：写入 _sceneMgr；返回 无显式返回。
- `getERTOffset()` [源码:34](../../eyes/src/engine/managers/ERTManager.js#L34)：当前操作：写入 无直接字段写入；返回 this._sceneMgr.getDistance(this._ertTarget,"earth",{subtractRadius:true})/EyesPublicApi.AppUtils.constants.speedOfLight、0。
- `getERTFromTime(timeValue)` [源码:43](../../eyes/src/engine/managers/ERTManager.js#L43)：当前操作：写入 无直接字段写入；返回 timeValue。
- `getTimeFromERT(timeValue)` [源码:48](../../eyes/src/engine/managers/ERTManager.js#L48)：当前操作：写入 无直接字段写入；返回 timeValue。
- `getNow(timeValue)` [源码:53](../../eyes/src/engine/managers/ERTManager.js#L53)：当前操作：写入 无直接字段写入；返回 this._isERT?this.getTimeFromERT(timeValue):timeValue。

## `eyes/src/engine/managers/LabelManager-563.js`

管理实体文字标签/图标的显示、样式和参考相机排除。。[源码](../../eyes/src/engine/managers/LabelManager-563.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-LabelManager-563-js)

### `LabelManager`

管理实体文字标签/图标的显示、样式和参考相机排除。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app, scene, viewport)` [源码:7](../../eyes/src/engine/managers/LabelManager-563.js#L7)：当前操作：写入 _exceptions、_focusIntersectionRects、_focusRect、_focusSize、_iconMap、_isClickable、_labelQuadtree、_labels、_scene、_viewport、_weightMap、_weights；返回 无显式返回。
- `update()` [源码:51](../../eyes/src/engine/managers/LabelManager-563.js#L51)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `initLabelWeights(weightDefinitions, resetExisting=true)` [源码:58](../../eyes/src/engine/managers/LabelManager-563.js#L58)：当前操作：写入 _weights、_weights[weightId]、_weights[weightId].weight；返回 无显式返回。
- `setWeight(entityId, weight)` [源码:68](../../eyes/src/engine/managers/LabelManager-563.js#L68)：当前操作：写入 无直接字段写入；返回 true、false。
- `resetWeight(entityId)` [源码:76](../../eyes/src/engine/managers/LabelManager-563.js#L76)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getDefaultWeight(entityId, category=void 0)` [源码:82](../../eyes/src/engine/managers/LabelManager-563.js#L82)：当前操作：写入 无直接字段写入；返回 entityId.startsWith("constellation_")?this._weightMap.Constellation:Object.keys(this._weights).length>0&&void 0!==this._weights[entityId]?this._weights[entityId].weight:void 0!==this._weightMap[category]?this._weightMap[。
- `getWeightMap()` [源码:85](../../eyes/src/engine/managers/LabelManager-563.js#L85)：当前操作：写入 无直接字段写入；返回 this._weightMap。
- `setWeightMap(weightMap)` [源码:88](../../eyes/src/engine/managers/LabelManager-563.js#L88)：当前操作：写入 _weightMap；返回 无显式返回。
- `setUpLabel(entity)` [源码:91](../../eyes/src/engine/managers/LabelManager-563.js#L91)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addLabel(entity, weight)` [源码:104](../../eyes/src/engine/managers/LabelManager-563.js#L104)：当前操作：写入 _labels[entity.getName()]；返回 无显式返回。
- `removeLabel(entityId)` [源码:111](../../eyes/src/engine/managers/LabelManager-563.js#L111)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setUpIcon(entity)` [源码:114](../../eyes/src/engine/managers/LabelManager-563.js#L114)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setLabelClickable(entityId, isClickable)` [源码:120](../../eyes/src/engine/managers/LabelManager-563.js#L120)：当前操作：写入 _labels[entityId].isClickable；返回 无显式返回。
- `setClickable(isClickable)` [源码:123](../../eyes/src/engine/managers/LabelManager-563.js#L123)：当前操作：写入 _isClickable；返回 无显式返回。
- `addException(entityId)` [源码:133](../../eyes/src/engine/managers/LabelManager-563.js#L133)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeException(entityId)` [源码:136](../../eyes/src/engine/managers/LabelManager-563.js#L136)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addExceptions(entityIds)` [源码:139](../../eyes/src/engine/managers/LabelManager-563.js#L139)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeExceptions(entityIds)` [源码:142](../../eyes/src/engine/managers/LabelManager-563.js#L142)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleLabels(visible, {scene:scene}={})` [源码:145](../../eyes/src/engine/managers/LabelManager-563.js#L145)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleLabelForEntity(visible, entityId, {scene:scene}={})` [源码:153](../../eyes/src/engine/managers/LabelManager-563.js#L153)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleIcons(visible, {scene:scene}={})` [源码:162](../../eyes/src/engine/managers/LabelManager-563.js#L162)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleIconForEntity(visible, entityId, {scene:scene}={})` [源码:170](../../eyes/src/engine/managers/LabelManager-563.js#L170)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getLink(entityId)` [源码:179](../../eyes/src/engine/managers/LabelManager-563.js#L179)：当前操作：写入 无直接字段写入；返回 ˋ/${entityId}ˋ。
- `_clickCallback(entity)` [源码:182](../../eyes/src/engine/managers/LabelManager-563.js#L182)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setLabelProps({getLabelClass:getLabelClass,getIconClass:getIconClass,getTextClass:getTextClass,handleClick:handleClick,handleTouch:handleTouch,handleMouseEnter:handleMouseEnter,handleMouseLeave:handleMouseLeave}={}, entityIds=Object.keys(this._labels), sceneOverride, cameraOverride)` [源码:194](../../eyes/src/engine/managers/LabelManager-563.js#L194)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addClassToLabels(className, entityIds)` [源码:257](../../eyes/src/engine/managers/LabelManager-563.js#L257)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeClassFromLabels(className, entityIds)` [源码:264](../../eyes/src/engine/managers/LabelManager-563.js#L264)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/managers/LabelManager-924.js`

扩展基础标签管理器，加入太阳系实体分类与应用标签策略。。[源码](../../eyes/src/engine/managers/LabelManager-924.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-LabelManager-924-js)

### `LabelManager`

扩展基础标签管理器，加入太阳系实体分类与应用标签策略。。父类 `Eyes.LabelManager`。

- `_getLink(entityId)` [源码:5](../../eyes/src/engine/managers/LabelManager-924.js#L5)：当前操作：写入 无直接字段写入；返回 this._app.getManager("link")?.getParsedLink?.(baseLink)\|\|baseLink。

## `eyes/src/engine/managers/LayerManager.js`

管理类别图层可见性、实体集合和界面复选框的同步。。[源码](../../eyes/src/engine/managers/LayerManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-LayerManager-js)

### `LayerManager`

管理类别图层可见性、实体集合和界面复选框的同步。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app)` [源码:7](../../eyes/src/engine/managers/LayerManager.js#L7)：当前操作：写入 _contentManager、_contextualLayersList、_currentSurfaceLayer、_dependencies、_layers、_previousDependencies、_previousTarget、_sceneManager、_targetId；返回 无显式返回。
- `addLayer(layerId, {name:displayName="",group:groupName="",categories=[],defaultVisibility=true,toggleCallback:toggleCallbacks=[],sublayers:sublayerIds=[]})` [源码:22](../../eyes/src/engine/managers/LayerManager.js#L22)：当前操作：写入 _layers[layerId]、_layers[layerId].categories、_layers[layerId].defaultVisibility、_layers[layerId].group、_layers[layerId].name、_layers[layerId].sublayers、_layers[layerId].toggleCallback、_layers[layerId].visible、_layers[sublayerId]、_layers[sublayerId].parent；返回 无显式返回。
- `addCallback(layerId, callback)` [源码:47](../../eyes/src/engine/managers/LayerManager.js#L47)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeCallback(layerId, callback)` [源码:51](../../eyes/src/engine/managers/LayerManager.js#L51)：当前操作：写入 无直接字段写入；返回 void。
- `getLayer(layerId)` [源码:57](../../eyes/src/engine/managers/LayerManager.js#L57)：当前操作：写入 无直接字段写入；返回 void 0===this._layers[layerId]?null:this._layers[layerId]。
- `getCurrentSurfaceLayer()` [源码:60](../../eyes/src/engine/managers/LayerManager.js#L60)：当前操作：写入 无直接字段写入；返回 this._currentSurfaceLayer。
- `changeSpheroidMap(entityId, mapInfo, options={})` [源码:63](../../eyes/src/engine/managers/LayerManager.js#L63)：当前操作：写入 _currentSurfaceLayer；返回 void console.error("This function does not yet handle CMTS texture")。
- `resetSpheroidMap(entityId)` [源码:77](../../eyes/src/engine/managers/LayerManager.js#L77)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleLayer(layerId, options={}, requestedVisibility)` [源码:84](../../eyes/src/engine/managers/LayerManager.js#L84)：当前操作：写入 _layers[layerId].visible、getLayer(this._layers[layerId].sublayers[sublayerIndex]).visible；返回 void。
- `syncLayerVisibilityWithQueries()` [源码:114](../../eyes/src/engine/managers/LayerManager.js#L114)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setTarget(targetId)` [源码:121](../../eyes/src/engine/managers/LayerManager.js#L121)：当前操作：写入 _dependencies、_previousDependencies、_targetId；返回 无显式返回。
- `resetTarget()` [源码:127](../../eyes/src/engine/managers/LayerManager.js#L127)：当前操作：写入 _previousTarget；返回 void。
- `resetContextualVisibility(contextId)` [源码:141](../../eyes/src/engine/managers/LayerManager.js#L141)：当前操作：写入 _contextId；返回 无显式返回。
- `getTarget()` [源码:170](../../eyes/src/engine/managers/LayerManager.js#L170)：当前操作：写入 无直接字段写入；返回 this._targetId。
- `getEntityLayer(entityId)` [源码:173](../../eyes/src/engine/managers/LayerManager.js#L173)：当前操作：写入 无直接字段写入；返回 null、this.getLayerFromCategory(subcategory)\|\|this.getLayerFromCategory(category)。
- `getLayerFromCategory(category)` [源码:180](../../eyes/src/engine/managers/LayerManager.js#L180)：当前操作：写入 无直接字段写入；返回 null、this._layers[layerId]。
- `getLayerFromSatelliteGroup(satelliteGroup)` [源码:185](../../eyes/src/engine/managers/LayerManager.js#L185)：当前操作：写入 无直接字段写入；返回 null、this._layers[layerId]。
- `getAllContextualLayerOptions()` [源码:190](../../eyes/src/engine/managers/LayerManager.js#L190)：当前操作：写入 无直接字段写入；返回 this._contextualLayersList。
- `getContextualLayers(entityId)` [源码:193](../../eyes/src/engine/managers/LayerManager.js#L193)：当前操作：写入 无直接字段写入；返回 contextualLayers。
- `resetContextualLayers(newParentId, oldParentId)` [源码:235](../../eyes/src/engine/managers/LayerManager.js#L235)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `isEntityVisibleWithCurrentLayers(entityId, options={})` [源码:245](../../eyes/src/engine/managers/LayerManager.js#L245)：当前操作：写入 无直接字段写入；返回 null!==satelliteLayer&&entityInfo.constellation===satelliteGroup?satelliteLayer.visible:null!==subcategoryLayer?!(subcategoryLayer.parent&&!this.getLayer(subcategoryLayer.parent)?.visible&&!allowSublayer)&&subcategoryLay、true。

## `eyes/src/engine/managers/LinkManager.js`

解析实体链接及路由目标，为选择/内容导航提供映射。。[源码](../../eyes/src/engine/managers/LinkManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-LinkManager-js)

### `LinkManager`

解析实体链接及路由目标，为选择/内容导航提供映射。。父类 `Eyes.BaseManager`。

- `getParsedLink(selectedLink, searchType)` [源码:5](../../eyes/src/engine/managers/LinkManager.js#L5)：当前操作：写入 无直接字段写入；返回 parsedLink。

## `eyes/src/engine/managers/MaterialManager.js`

预加载材质描述/着色器资源，创建可复用材质实例并维护 Resource 加载状态。。[源码](../../eyes/src/engine/managers/MaterialManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-MaterialManager-js)

### `Resource`

MaterialManager 单项材质/着色器资源的状态记录。。父类 `无`。

- `constructor(value)` [源码:16](../../eyes/src/engine/managers/MaterialManager.js#L16)：当前操作：写入 useCount、value；返回 无显式返回。

### `MaterialManager`

预加载材质描述/着色器资源，创建可复用材质实例并维护 Resource 加载状态。。父类 `无`。

- `constructor(downloader)` [源码:22](../../eyes/src/engine/managers/MaterialManager.js#L22)：当前操作：写入 _cache、_clonedMaterials、_downloader、_promises；返回 无显式返回。
- `get(materialUrl, priority)` [源码:29](../../eyes/src/engine/managers/MaterialManager.js#L29)：当前操作：写入 无直接字段写入；返回 materialClone。
- `getPreloaded(materialName)` [源码:47](../../eyes/src/engine/managers/MaterialManager.js#L47)：当前操作：写入 无直接字段写入；返回 materialClone。
- `release(materialClone)` [源码:55](../../eyes/src/engine/managers/MaterialManager.js#L55)：当前操作：写入 无直接字段写入；返回 void。
- `_preload()` [源码:62](../../eyes/src/engine/managers/MaterialManager.js#L62)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_load(materialName, shaderInfo)` [源码:79](../../eyes/src/engine/managers/MaterialManager.js#L79)：当前操作：写入 无直接字段写入；返回 rawShaderMaterial。
- `_getUniformValueFromType(typeDeclaration)` [源码:143](../../eyes/src/engine/managers/MaterialManager.js#L143)：当前操作：写入 无直接字段写入；返回 0、new PioneerPublicApi.THREE.Vector2(0,0)、new PioneerPublicApi.THREE.Vector3(0,0,0)、new PioneerPublicApi.THREE.Vector4(0,0,0,0)、new PioneerPublicApi.THREE.Matrix3()、new PioneerPublicApi.THREE.Matrix4()、null、uniformValues。

## `eyes/src/engine/managers/ResourceManager.js`

以资源类型+URL 共享 Promise/对象和引用计数，跟踪组件持有者，零引用后延时释放或取消未完成请求。。[源码](../../eyes/src/engine/managers/ResourceManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-ResourceManager-js)

### `ResourceManager`

以资源类型+URL 共享 Promise/对象和引用计数，跟踪组件持有者，零引用后延时释放或取消未完成请求。。父类 `无`。

- `constructor(engine)` [源码:5](../../eyes/src/engine/managers/ResourceManager.js#L5)：当前操作：写入 _engine；返回 无显式返回。
- `acquire(owner, url, type, priority, options)` [源码:9](../../eyes/src/engine/managers/ResourceManager.js#L9)：命中时连同未完成 Promise 一起复用；重新获得引用会撤销待卸载计时器。
- `release(owner, resource, type)` [源码:55](../../eyes/src/engine/managers/ResourceManager.js#L55)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `releaseByUrl(owner, url, type)` [源码:62](../../eyes/src/engine/managers/ResourceManager.js#L62)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `acquireMultiple(owner, resourceDescriptions, priority)` [源码:83](../../eyes/src/engine/managers/ResourceManager.js#L83)：allSettled 等齐所有结果后才回收成功项，避免部分成功的资源失去所有者。
- `releaseAllForEntityItem(owner)` [源码:123](../../eyes/src/engine/managers/ResourceManager.js#L123)：清理组件时逐条释放；传空 owner，避免遍历期间修改同一持有记录数组。
- `_addEntityItemReference(owner, url, type)` [源码:130](../../eyes/src/engine/managers/ResourceManager.js#L130)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_removeEntityItemReference(owner, url, type)` [源码:138](../../eyes/src/engine/managers/ResourceManager.js#L138)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_deleteEntry(owner, url, type, cache, entry)` [源码:148](../../eyes/src/engine/managers/ResourceManager.js#L148)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/managers/RouteManager.js`

解析路径与查询参数，推送导航并向应用广播路由变化。。[源码](../../eyes/src/engine/managers/RouteManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-RouteManager-js)

### `RouteManager`

解析路径与查询参数，推送导航并向应用广播路由变化。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app)` [源码:7](../../eyes/src/engine/managers/RouteManager.js#L7)：当前操作：写入 _alwaysHiddenComponents、_configs、_currentRoute、_currentView、_firstLoad、_homeRoute、_previousRoute、_previousView、_query、_queryCallbacks、_router、_validQueries；返回 无显式返回。
- `get homeRoute()` [源码:23](../../eyes/src/engine/managers/RouteManager.js#L23)：当前操作：写入 无直接字段写入；返回 this._homeRoute。
- `get previousRoute()` [源码:26](../../eyes/src/engine/managers/RouteManager.js#L26)：当前操作：写入 无直接字段写入；返回 this._previousRoute。
- `get currentRoute()` [源码:29](../../eyes/src/engine/managers/RouteManager.js#L29)：当前操作：写入 无直接字段写入；返回 this._currentRoute。
- `get query()` [源码:32](../../eyes/src/engine/managers/RouteManager.js#L32)：当前操作：写入 无直接字段写入；返回 this._query。
- `get configs()` [源码:35](../../eyes/src/engine/managers/RouteManager.js#L35)：当前操作：写入 无直接字段写入；返回 this._configs。
- `get currentView()` [源码:38](../../eyes/src/engine/managers/RouteManager.js#L38)：当前操作：写入 无直接字段写入；返回 this._currentView。
- `set currentView(currentView)` [源码:41](../../eyes/src/engine/managers/RouteManager.js#L41)：当前操作：写入 _currentView；返回 无显式返回。
- `get previousView()` [源码:44](../../eyes/src/engine/managers/RouteManager.js#L44)：当前操作：写入 无直接字段写入；返回 this._previousView。
- `init(beforeRoute, afterRoute)` [源码:47](../../eyes/src/engine/managers/RouteManager.js#L47)：当前操作：写入 _currentRoute、_currentRoute.url、_firstLoad、_previousRoute；返回 无显式返回。
- `leave(routeParams)` [源码:66](../../eyes/src/engine/managers/RouteManager.js#L66)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onRootRoute(queryParams)` [源码:69](../../eyes/src/engine/managers/RouteManager.js#L69)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onNotFound(queryString)` [源码:72](../../eyes/src/engine/managers/RouteManager.js#L72)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `replaceState(url)` [源码:77](../../eyes/src/engine/managers/RouteManager.js#L77)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `reroute(routePath, queryParams="")` [源码:80](../../eyes/src/engine/managers/RouteManager.js#L80)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addCancelToken(routeParams)` [源码:92](../../eyes/src/engine/managers/RouteManager.js#L92)：当前操作：写入 无直接字段写入；返回 paramsWithToken。
- `lastRouteResolved()` [源码:97](../../eyes/src/engine/managers/RouteManager.js#L97)：当前操作：写入 无直接字段写入；返回 this._router.lastRouteResolved()。
- `lastPathResolved()` [源码:100](../../eyes/src/engine/managers/RouteManager.js#L100)：当前操作：写入 无直接字段写入；返回 resolvedRoute.query?resolvedRoute.url+"?"+resolvedRoute.query:resolvedRoute.url。
- `getOnlyURL(url)` [源码:104](../../eyes/src/engine/managers/RouteManager.js#L104)：当前操作：写入 无直接字段写入；返回 routePath。
- `_cleanGETParam(routePath)` [源码:110](../../eyes/src/engine/managers/RouteManager.js#L110)：当前操作：写入 无直接字段写入；返回 routePath.split(/\?(.*)?$/)[0]。
- `getValidQueries()` [源码:113](../../eyes/src/engine/managers/RouteManager.js#L113)：当前操作：写入 无直接字段写入；返回 this._validQueries。
- `setValidQueries(validQueries)` [源码:116](../../eyes/src/engine/managers/RouteManager.js#L116)：当前操作：写入 _validQueries；返回 无显式返回。
- `parseQuery(queryString)` [源码:119](../../eyes/src/engine/managers/RouteManager.js#L119)：当前操作：写入 _configs[configKey]；返回 {}、queryString.split("&").reduce((parsedQuery,queryEntry)=>{const entryParts=queryEntry.split("=");if(entryParts.length>1){const queryName=decodeURIComponent(entryParts[0].trim());let queryValue=decodeURIComponent(entryPart。
- `buildQuery(queryParams)` [源码:157](../../eyes/src/engine/managers/RouteManager.js#L157)：当前操作：写入 无直接字段写入；返回 queryString。
- `addQuery(queryUpdates)` [源码:163](../../eyes/src/engine/managers/RouteManager.js#L163)：当前操作：写入 _query；返回 this._query。
- `removeQuery(queryNames=[])` [源码:170](../../eyes/src/engine/managers/RouteManager.js#L170)：当前操作：写入 无直接字段写入；返回 this._query。
- `addConfigs(configUpdates)` [源码:174](../../eyes/src/engine/managers/RouteManager.js#L174)：当前操作：写入 _configs；返回 this._configs。
- `setConfig(configName, configValue)` [源码:181](../../eyes/src/engine/managers/RouteManager.js#L181)：当前操作：写入 configs[configName]；返回 无显式返回。
- `removeConfigs(configNames=[])` [源码:184](../../eyes/src/engine/managers/RouteManager.js#L184)：当前操作：写入 无直接字段写入；返回 this._configs。
- `updateQuery(queryUpdates)` [源码:188](../../eyes/src/engine/managers/RouteManager.js#L188)：当前操作：写入 _query；返回 {...this.addQuery(queryUpdates),...activeConfigs}。
- `updateQueryPath(queryUpdates, routePath="")` [源码:196](../../eyes/src/engine/managers/RouteManager.js#L196)：当前操作：写入 无直接字段写入；返回 (routePath\|\|this._router.lastRouteResolved().url).replace(/(\/)(?=\/*\1)/,"")+this.buildQuery(this.updateQuery(queryUpdates))。
- `resetView(currentView, routeParams)` [源码:199](../../eyes/src/engine/managers/RouteManager.js#L199)：当前操作：写入 _currentView、_previousView；返回 无显式返回。
- `handleRoute(viewName, routeParams, queryString)` [源码:210](../../eyes/src/engine/managers/RouteManager.js#L210)：当前操作：写入 _currentRoute.params；返回 无显式返回。
- `stillOnRoute(routeName)` [源码:224](../../eyes/src/engine/managers/RouteManager.js#L224)：当前操作：写入 无直接字段写入；返回 null!==routeMatch&&void 0!==routeMatch[1]&&routeMatch[1]===routeName。
- `urlChanged(currentUrl, previousUrl)` [源码:228](../../eyes/src/engine/managers/RouteManager.js#L228)：当前操作：写入 无直接字段写入；返回 this.getOnlyURL(currentUrl)!==this.getOnlyURL(previousUrl)。
- `routeChanged(currentRoute, previousRoute)` [源码:231](../../eyes/src/engine/managers/RouteManager.js#L231)：当前操作：写入 无直接字段写入；返回 true、currentRoute.url!==previousRoute.url、!EyesPublicApi.AppUtils.deepEqual(currentSnapshot,previousSnapshot)。
- `queryChanged(currentQuery, previousQueryString)` [源码:239](../../eyes/src/engine/managers/RouteManager.js#L239)：当前操作：写入 无直接字段写入；返回 true、!EyesPublicApi.AppUtils.deepEqual(currentSnapshot,previousSnapshot)。
- `goToView(viewName, routeParams, queryParams)` [源码:250](../../eyes/src/engine/managers/RouteManager.js#L250)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addRoutes(routeDefinitions)` [源码:259](../../eyes/src/engine/managers/RouteManager.js#L259)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `before(continueRoute, routeParams, viewName)` [源码:275](../../eyes/src/engine/managers/RouteManager.js#L275)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `subscribeToQuery(queryName, callback)` [源码:286](../../eyes/src/engine/managers/RouteManager.js#L286)：当前操作：写入 _queryCallbacks[queryName]；返回 ()=>{const callbackIndex=this._queryCallbacks[queryName].indexOf(callback);this._queryCallbacks[queryName].splice(callbackIndex,1);}。
- `start()` [源码:296](../../eyes/src/engine/managers/RouteManager.js#L296)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `handleEmbedQueries()` [源码:300](../../eyes/src/engine/managers/RouteManager.js#L300)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `navigate(queryOrPath, routePath="", options={})` [源码:320](../../eyes/src/engine/managers/RouteManager.js#L320)：当前操作：写入 无直接字段写入；返回 this._navigate(queryOrPath,routePath)。
- `_navigate(queryOrPath, routePrefix="")` [源码:327](../../eyes/src/engine/managers/RouteManager.js#L327)：当前操作：写入 _query；返回 true、false、this.navigate(this.updateQueryPath(queryOrPath,routePrefix),routePrefix)。
- `returnHome(keepQuery=true)` [源码:345](../../eyes/src/engine/managers/RouteManager.js#L345)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `reload(queryOnly=true, ignoreQuery=false)` [源码:349](../../eyes/src/engine/managers/RouteManager.js#L349)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/managers/SceneManager.js`

从实体配置建立主场景，协调可见性、高清纹理/WMTS、临时实体和强制加载状态。。[源码](../../eyes/src/engine/managers/SceneManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-SceneManager-js)

### `SceneManager`

从实体配置建立主场景，协调可见性、高清纹理/WMTS、临时实体和强制加载状态。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app)` [源码:9](../../eyes/src/engine/managers/SceneManager.js#L9)：当前操作：写入 _componentTypesNotVisible、_entityExtraOptions、_entityLoadedCallbacks、_entityStatuses、_entityWillBeUnloadedCallbacks、_hdBreakpointSize、_hdToggleEntity、_hdWMTSMap、_isHD、_isLoading、_loadedComponents、_loadingItems、_maxTextureSize、_mobileTextureSize、_scene、_scenes、_tempEntities、_wmtsComponentStates、_wmtsServerStates；返回 无显式返回。
- `getHDToggleEntity()` [源码:34](../../eyes/src/engine/managers/SceneManager.js#L34)：当前操作：写入 无直接字段写入；返回 this._hdToggleEntity。
- `add(sceneName)` [源码:37](../../eyes/src/engine/managers/SceneManager.js#L37)：当前操作：写入 _scenes[sceneName]；返回 "main"===sceneName&&this._scene?this._scene:(this._scenes[sceneName]=this.pioneer.addScene(sceneName),this._scenes[sceneName].setAmbientLightColor(new Pioneer.Color(.005,.005,.005)),this._scenes[sceneName])。
- `addEntity(entityId, dynamic)` [源码:40](../../eyes/src/engine/managers/SceneManager.js#L40)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeEntity(entityId)` [源码:52](../../eyes/src/engine/managers/SceneManager.js#L52)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getEntityStatus(entityId)` [源码:60](../../eyes/src/engine/managers/SceneManager.js#L60)：当前操作：写入 无直接字段写入；返回 this._entityStatuses.get(entityId)。
- `addEntitiesFromSceneInfo(sceneInfo)` [源码:63](../../eyes/src/engine/managers/SceneManager.js#L63)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addEntityLoadedCallback(callback)` [源码:85](../../eyes/src/engine/managers/SceneManager.js#L85)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeEntityLoadedCallback(callback)` [源码:88](../../eyes/src/engine/managers/SceneManager.js#L88)：当前操作：写入 无直接字段写入；返回 void this._entityLoadedCallbacks.splice(callbackIndex,1)。
- `addEntityWillBeUnloadedCallback(callback)` [源码:91](../../eyes/src/engine/managers/SceneManager.js#L91)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeEntityWillBeUnloadedCallback(callback)` [源码:94](../../eyes/src/engine/managers/SceneManager.js#L94)：当前操作：写入 无直接字段写入；返回 void this._entityWillBeUnloadedCallbacks.splice(callbackIndex,1)。
- `setEntitiesForceVisible(entityIds, resetExisting, forceVisible=true)` [源码:97](../../eyes/src/engine/managers/SceneManager.js#L97)：当前操作：写入 _entityStatuses.getAt(statusIndex).value.forceVisible；返回 无显式返回。
- `setExtraEntityOptions(options)` [源码:109](../../eyes/src/engine/managers/SceneManager.js#L109)：当前操作：写入 _entityExtraOptions；返回 无显式返回。
- `updateEntityLayerVisibilityForChildren(layerOptions)` [源码:114](../../eyes/src/engine/managers/SceneManager.js#L114)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `updateEntityLayerVisibility(layerOptions)` [源码:122](../../eyes/src/engine/managers/SceneManager.js#L122)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `update()` [源码:129](../../eyes/src/engine/managers/SceneManager.js#L129)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_createEntity(entityId)` [源码:170](../../eyes/src/engine/managers/SceneManager.js#L170)：当前操作：写入 无直接字段写入；返回 entity。
- `_isAncestorOfCamera(cameraEntity, ancestorId)` [源码:182](../../eyes/src/engine/managers/SceneManager.js#L182)：当前操作：写入 无直接字段写入；返回 true、false。
- `setVisibility(visible, entityId)` [源码:191](../../eyes/src/engine/managers/SceneManager.js#L191)：当前操作：写入 无直接字段写入；返回 void。
- `_isEntityVisibleWithinParent(entityId)` [源码:210](../../eyes/src/engine/managers/SceneManager.js#L210)：当前操作：写入 无直接字段写入；返回 false、(parentOptions.systemRadius\|\|25*parentOptions.radius\|\|25*parentOptions.extentsRadius)/parentEntity.getExtentsRadius()*parentEntity.getGreatestPixelSpaceExtentsRadius()>=20。
- `get(sceneName)` [源码:217](../../eyes/src/engine/managers/SceneManager.js#L217)：当前操作：写入 无直接字段写入；返回 void 0!==this._scenes[sceneName]?this._scenes[sceneName]:null。
- `getEntitiesNames()` [源码:220](../../eyes/src/engine/managers/SceneManager.js#L220)：当前操作：写入 无直接字段写入；返回 entityNames。
- `getParent(entityId)` [源码:228](../../eyes/src/engine/managers/SceneManager.js#L228)：当前操作：写入 无直接字段写入；返回 parentEntity.getName()、null。
- `getParentList(entityId)` [源码:236](../../eyes/src/engine/managers/SceneManager.js#L236)：当前操作：写入 无直接字段写入；返回 parentIds。
- `getDependencies(entityId)` [源码:245](../../eyes/src/engine/managers/SceneManager.js#L245)：当前操作：写入 无直接字段写入；返回 Array.from(set)。
- `isReady(entityId, time)` [源码:263](../../eyes/src/engine/managers/SceneManager.js#L263)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `isListReady(entityIds, times)` [源码:267](../../eyes/src/engine/managers/SceneManager.js#L267)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `tileIsReady(component)` [源码:273](../../eyes/src/engine/managers/SceneManager.js#L273)：当前操作：写入 无直接字段写入；返回 new Promise((resolveReady,rejectReady)=>{const readinessPoll=setInterval(()=>{component.isEnabled()&&component.getEntity().isEnabled()\|\|(clearInterval(readinessPoll),rejectReady(new Error("disabled")));null===tilesPromis。
- `hasCMTS(entityId)` [源码:285](../../eyes/src/engine/managers/SceneManager.js#L285)：当前操作：写入 无直接字段写入；返回 !!SolarSystemSceneExports.Mapping.getOptions()[entityId]&&"cmts"in SolarSystemSceneExports.Mapping.getOptions()[entityId]。
- `getCMTSEntity(entityId)` [源码:288](../../eyes/src/engine/managers/SceneManager.js#L288)：当前操作：写入 无直接字段写入；返回 null、this._scene.getEntity(entityId)、this.hasCMTS(ancestorId)?this._scene.getEntity(ancestorId):null。
- `terrainIsReady(component)` [源码:295](../../eyes/src/engine/managers/SceneManager.js#L295)：当前操作：写入 无直接字段写入；返回 new Promise(resolveReady=>{const readinessPoll=setInterval(()=>{component.isEnabled()&&component.getEntity().isEnabled()\|\|(clearInterval(readinessPoll),resolveReady(true));null===tilesPromise&&null!==component._loadedPro。
- `componentIsReady(component)` [源码:307](../../eyes/src/engine/managers/SceneManager.js#L307)：当前操作：写入 无直接字段写入；返回 void、new Promise(resolveReady=>{const readinessPoll=setInterval(()=>{component.isEnabled()&&component.getEntity().isEnabled()\|\|(clearInterval(readinessPoll),resolveReady(true));"loaded"===component.getLoadState().state&&(clea。
- `toggleStarfield(enabled)` [源码:316](../../eyes/src/engine/managers/SceneManager.js#L316)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleHeliosphere(enabled)` [源码:319](../../eyes/src/engine/managers/SceneManager.js#L319)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleConstellations(enabled)` [源码:322](../../eyes/src/engine/managers/SceneManager.js#L322)：当前操作：写入 无直接字段写入；返回 void。
- `isHD()` [源码:361](../../eyes/src/engine/managers/SceneManager.js#L361)：当前操作：写入 无直接字段写入；返回 this._isHD。
- `hasHD(entityId)` [源码:364](../../eyes/src/engine/managers/SceneManager.js#L364)：当前操作：写入 无直接字段写入；返回 false、true。
- `setHDBreakpoints(hdBreakpointSize, maxTextureSize)` [源码:375](../../eyes/src/engine/managers/SceneManager.js#L375)：当前操作：写入 _hdBreakpointSize、_maxTextureSize；返回 无显式返回。
- `toggleHD()` [源码:379](../../eyes/src/engine/managers/SceneManager.js#L379)：当前操作：写入 _isHD；返回 无显式返回。
- `updateHDTarget(entityInfo, entityId)` [源码:397](../../eyes/src/engine/managers/SceneManager.js#L397)：当前操作：写入 _hdToggleEntity；返回 void(hdToggleEntity=this.app.getView("event")._eventInfo?.target)、void(hdToggleEntity=parentId)、void(hdToggleEntity=this.getParent(parentId))、parentId===closestSpaceObjectId?void(hdToggleEntity=parentId):void(hdToggleEntity=closestSpaceObjectId)。
- `findClosestSpaceObjectTo(entityId)` [源码:416](../../eyes/src/engine/managers/SceneManager.js#L416)：当前操作：写入 无直接字段写入；返回 scene.waitTillEntitiesInPlace(dependencyIds,this.app.pioneer.getTime(),3).then(async()=>{let closestEntityId="";let closestDistance=scene.getEntity(hdDependencyIds[0])?.getDistanceTo(scene.getEntity(entityId),false);hdDe。
- `forceTextureSizeForEntity(entityId, textureSize, textureRole="color")` [源码:433](../../eyes/src/engine/managers/SceneManager.js#L433)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `isEntityHD(entityId)` [源码:437](../../eyes/src/engine/managers/SceneManager.js#L437)：当前操作：写入 无直接字段写入；返回 !(null==lodComponent\|\|!lodComponent.isEnabled())&&(await lodComponent.getTexturesLoadedPromise(3).catch(()=>false),lodComponent.getTextureCurrentSize("color",0)>this._hdBreakpointSize)。
- `toggleHDTextureForEntity(entityId, requestedHD=null)` [源码:441](../../eyes/src/engine/managers/SceneManager.js#L441)：当前操作：写入 _isHD；返回 requestedHD、isHD。
- `createRing(ringId, radius, parentId, {orbitPlaneEntityName:orbitPlaneEntityName,color:color,numCircles:circleCount=1,numSpokes:spokeCount=0,labelPosition=new Pioneer.Vector3(-radius,0,0),labelText="",isEnable:enabled=true}={})` [源码:461](../../eyes/src/engine/managers/SceneManager.js#L461)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `createTorus(torusId, innerRadius, outerRadius, parentId, {orbitPlaneEntityName:orbitPlaneEntityName,color:color,visibleDistance=[Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY],labelPosition=new Pioneer.Vector3(-outerRadius,0,0),labelText="",isEnable:enabled=true}={})` [源码:491](../../eyes/src/engine/managers/SceneManager.js#L491)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setEntityHDWMTS(entityId, wmtsName)` [源码:519](../../eyes/src/engine/managers/SceneManager.js#L519)：当前操作：写入 _hdWMTSMap[entityId]；返回 无显式返回。
- `enableWMTSComponent(entityId, wmtsComponent)` [源码:522](../../eyes/src/engine/managers/SceneManager.js#L522)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addWMTSComponent(entityId, options)` [源码:532](../../eyes/src/engine/managers/SceneManager.js#L532)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `showWMTSError(entityId)` [源码:538](../../eyes/src/engine/managers/SceneManager.js#L538)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `loadWMTSFromJSON(wmtsDefinitions)` [源码:547](../../eyes/src/engine/managers/SceneManager.js#L547)：当前操作：写入 _hdWMTSMap[entityId]；返回 无显式返回。
- `setAlignPlane(entity, orbitPlaneEntityId)` [源码:566](../../eyes/src/engine/managers/SceneManager.js#L566)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `clearTempEntities()` [源码:572](../../eyes/src/engine/managers/SceneManager.js#L572)：当前操作：写入 _tempEntities；返回 void。
- `addTempEntity(entity)` [源码:583](../../eyes/src/engine/managers/SceneManager.js#L583)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addLoading(entityId, loadingKind)` [源码:586](../../eyes/src/engine/managers/SceneManager.js#L586)：当前操作：写入 _isLoading；返回 无显式返回。
- `removeLoading(entityId, loadingKind)` [源码:591](../../eyes/src/engine/managers/SceneManager.js#L591)：当前操作：写入 _isLoading；返回 无显式返回。
- `forceLoad(component)` [源码:599](../../eyes/src/engine/managers/SceneManager.js#L599)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeForceLoad(component)` [源码:603](../../eyes/src/engine/managers/SceneManager.js#L603)：当前操作：写入 _loadedComponents；返回 无显式返回。
- `clearForceLoad()` [源码:606](../../eyes/src/engine/managers/SceneManager.js#L606)：当前操作：写入 _loadedComponents；返回 无显式返回。
- `getDistance(entityId, relativeEntityId, {time:time,subtractRadius=false,precision=0}={})` [源码:612](../../eyes/src/engine/managers/SceneManager.js#L612)：当前操作：写入 无直接字段写入；返回 distance。
- `getSpeed(entityId, relativeEntityId, {time:time}={})` [源码:635](../../eyes/src/engine/managers/SceneManager.js#L635)：当前操作：写入 无直接字段写入；返回 relativeVelocity.magnitude()。
- `getCoverage(entityId, includeOrientation=true)` [源码:648](../../eyes/src/engine/managers/SceneManager.js#L648)：当前操作：写入 无直接字段写入；返回 coverage。
- `toggleRing(enabled)` [源码:670](../../eyes/src/engine/managers/SceneManager.js#L670)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `get main()` [源码:673](../../eyes/src/engine/managers/SceneManager.js#L673)：当前操作：写入 无直接字段写入；返回 this._scene。
- `get isLoading()` [源码:676](../../eyes/src/engine/managers/SceneManager.js#L676)：当前操作：写入 无直接字段写入；返回 this._isLoading。

## `eyes/src/engine/managers/SearchManager.js`

将可搜索数据库条目交给模糊搜索实例，按 id 取条目并限制搜索结果数量。。[源码](../../eyes/src/engine/managers/SearchManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-SearchManager-js)

### `SearchManager`

将可搜索数据库条目交给模糊搜索实例，按 id 取条目并限制搜索结果数量。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app, options={})` [源码:6](../../eyes/src/engine/managers/SearchManager.js#L6)：当前操作：写入 _database、_fuse、_maxEntries、_options；返回 无显式返回。
- `setOptions(options)` [源码:26](../../eyes/src/engine/managers/SearchManager.js#L26)：当前操作：写入 _fuse；返回 无显式返回。
- `setDatabase(database, options={})` [源码:30](../../eyes/src/engine/managers/SearchManager.js#L30)：当前操作：写入 _database、_fuse；返回 无显式返回。
- `getEntry(entityId)` [源码:40](../../eyes/src/engine/managers/SearchManager.js#L40)：当前操作：写入 无直接字段写入；返回 this._database.find(entry=>entry.id===entityId)。
- `find(searchText, maximumEntries=this._maxEntries)` [源码:43](../../eyes/src/engine/managers/SearchManager.js#L43)：当前操作：写入 无直接字段写入；返回 null、matches。

## `eyes/src/engine/managers/SelectionManager-562.js`

处理 3D 选择，更新 DOM 选中类并导航到实体链接。。[源码](../../eyes/src/engine/managers/SelectionManager-562.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-SelectionManager-562-js)

### `SelectionManager`

处理 3D 选择，更新 DOM 选中类并导航到实体链接。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app, scene)` [源码:6](../../eyes/src/engine/managers/SelectionManager-562.js#L6)：当前操作：写入 _id、_isClickable、_isSuppressed、_scene；返回 无显式返回。
- `setScene(scene)` [源码:16](../../eyes/src/engine/managers/SelectionManager-562.js#L16)：当前操作：写入 _scene；返回 无显式返回。
- `selectEntity(entityId)` [源码:19](../../eyes/src/engine/managers/SelectionManager-562.js#L19)：当前操作：写入 _id；返回 无显式返回。
- `unselect()` [源码:33](../../eyes/src/engine/managers/SelectionManager-562.js#L33)：当前操作：写入 _id；返回 无显式返回。
- `getCurrentId()` [源码:44](../../eyes/src/engine/managers/SelectionManager-562.js#L44)：当前操作：写入 无直接字段写入；返回 this._id。
- `setClickable(isClickable)` [源码:47](../../eyes/src/engine/managers/SelectionManager-562.js#L47)：当前操作：写入 _isClickable；返回 无显式返回。
- `init3Dcallback(cameraManager)` [源码:50](../../eyes/src/engine/managers/SelectionManager-562.js#L50)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getLink(entityId)` [源码:53](../../eyes/src/engine/managers/SelectionManager-562.js#L53)：当前操作：写入 无直接字段写入；返回 ˋ/${entityId}ˋ。
- `setSuppress(isSuppressed)` [源码:56](../../eyes/src/engine/managers/SelectionManager-562.js#L56)：当前操作：写入 _isSuppressed；返回 无显式返回。
- `handle3DSelection(pickedEntity)` [源码:59](../../eyes/src/engine/managers/SelectionManager-562.js#L59)：当前操作：写入 _isSuppressed；返回 无显式返回。
- `_switchSelectionClass(newEntityId, oldEntityId)` [源码:78](../../eyes/src/engine/managers/SelectionManager-562.js#L78)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/managers/SelectionManager-925.js`

扩展基础选择管理器，借助应用 LinkManager 解析太阳系专用链接。。[源码](../../eyes/src/engine/managers/SelectionManager-925.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-SelectionManager-925-js)

### `SelectionManager`

扩展基础选择管理器，借助应用 LinkManager 解析太阳系专用链接。。父类 `Eyes.SelectionManager`。

- `_getLink(entityId)` [源码:5](../../eyes/src/engine/managers/SelectionManager-925.js#L5)：当前操作：写入 无直接字段写入；返回 this._app.getManager("link")?.getParsedLink?.(baseLink)\|\|baseLink。

## `eyes/src/engine/managers/SpoutManager.js`

建立额外投影视口、地球/目标相机和标签以支持球幕/外部显示。。[源码](../../eyes/src/engine/managers/SpoutManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-SpoutManager-js)

### `SpoutManager`

建立额外投影视口、地球/目标相机和标签以支持球幕/外部显示。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app)` [源码:7](../../eyes/src/engine/managers/SpoutManager.js#L7)：当前操作：写入 _defaultTarget、_defaultTargetRadius、_scene；返回 无显式返回。
- `enableSpout(forGlobe=false, renderWidth=2048, globeDistance=2*this._defaultTargetRadius, targetEntityId=this._defaultTarget, fontSize=25, longitudeOffsetDegrees=0, alignToNorthPole=false)` [源码:13](../../eyes/src/engine/managers/SpoutManager.js#L13)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setUpSpoutCamera(forGlobe, targetEntity=this._defaultTarget, alignToNorthPole=false, longitudeOffsetDegrees=0)` [源码:27](../../eyes/src/engine/managers/SpoutManager.js#L27)：当前操作：写入 无直接字段写入；返回 cameraEntity。
- `setUpSpoutLabels(fontSize=25, suppliedTarget=null)` [源码:49](../../eyes/src/engine/managers/SpoutManager.js#L49)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getSpoutCameraTargetEntity(routeParams)` [源码:66](../../eyes/src/engine/managers/SpoutManager.js#L66)：当前操作：写入 无直接字段写入；返回 targetEntityId。

## `eyes/src/engine/managers/TimeManager-728.js`

在 Moment 时区时间与 Pioneer ET 之间转换，控制播放速率、上下限和时间事件。。[源码](../../eyes/src/engine/managers/TimeManager-728.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-TimeManager-728-js)

### `TimeManager`

在 Moment 时区时间与 Pioneer ET 之间转换，控制播放速率、上下限和时间事件。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app)` [源码:8](../../eyes/src/engine/managers/TimeManager-728.js#L8)：当前操作：写入 _dateFormats、_defaultLimits、_defaultRate、_ertMgr、_forcedPause、_isUTC、_localTimezone、_previousTimeRate、_rate、_startTime、_time、_timeLimits、_timezone、_utcTimezone；返回 无显式返回。
- `_onLimitReach(limitName)` [源码:57](../../eyes/src/engine/managers/TimeManager-728.js#L57)：当前操作：写入 _forcedPause、_previousTimeRate；返回 无显式返回。
- `setERTManager(ertMgr)` [源码:61](../../eyes/src/engine/managers/TimeManager-728.js#L61)：当前操作：写入 _ertMgr；返回 无显式返回。
- `isNow()` [源码:64](../../eyes/src/engine/managers/TimeManager-728.js#L64)：当前操作：写入 无直接字段写入；返回 1===this._rate&&Math.abs(this._time.valueOf()-this.getNow().valueOf())<1e3。
- `getNow()` [源码:67](../../eyes/src/engine/managers/TimeManager-728.js#L67)：当前操作：写入 无直接字段写入；返回 currentTime。
- `setToNow()` [源码:74](../../eyes/src/engine/managers/TimeManager-728.js#L74)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setStartTime(startTime)` [源码:77](../../eyes/src/engine/managers/TimeManager-728.js#L77)：当前操作：写入 _startTime；返回 无显式返回。
- `setToStart()` [源码:80](../../eyes/src/engine/managers/TimeManager-728.js#L80)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getTime()` [源码:83](../../eyes/src/engine/managers/TimeManager-728.js#L83)：当前操作：写入 无直接字段写入；返回 this._time。
- `setTime(timeValue)` [源码:86](../../eyes/src/engine/managers/TimeManager-728.js#L86)：当前操作：写入 _time；返回 无显式返回。
- `parseTime(timeValue, formatName="url")` [源码:93](../../eyes/src/engine/managers/TimeManager-728.js#L93)：当前操作：写入 无直接字段写入；返回 isUTC?getFollowName().utc(timeValue):getFollowName().tz(timeValue,inputFormat,true,this._localTimezone)。
- `etToMoment(ephemerisTime)` [源码:105](../../eyes/src/engine/managers/TimeManager-728.js#L105)：当前操作：写入 无直接字段写入；返回 null、timeValue.isValid()?timeValue:null。
- `momentToET(momentValue)` [源码:110](../../eyes/src/engine/managers/TimeManager-728.js#L110)：当前操作：写入 无直接字段写入；返回 Math.round(1e3*ephemerisTime)/1e3。
- `urlToET(timeUrl)` [源码:115](../../eyes/src/engine/managers/TimeManager-728.js#L115)：当前操作：写入 无直接字段写入；返回 this.momentToET(parsedTime)。
- `getTimezone()` [源码:119](../../eyes/src/engine/managers/TimeManager-728.js#L119)：当前操作：写入 无直接字段写入；返回 this._timezone。
- `getUTCTimezone()` [源码:122](../../eyes/src/engine/managers/TimeManager-728.js#L122)：当前操作：写入 无直接字段写入；返回 this._utcTimezone。
- `getLocalTimezone()` [源码:125](../../eyes/src/engine/managers/TimeManager-728.js#L125)：当前操作：写入 无直接字段写入；返回 this._localTimezone。
- `isUTC()` [源码:128](../../eyes/src/engine/managers/TimeManager-728.js#L128)：当前操作：写入 无直接字段写入；返回 this._isUTC。
- `setDisplayUTC(isUTC)` [源码:131](../../eyes/src/engine/managers/TimeManager-728.js#L131)：当前操作：写入 _isUTC、_timezone；返回 无显式返回。
- `getDateFormats()` [源码:136](../../eyes/src/engine/managers/TimeManager-728.js#L136)：当前操作：写入 无直接字段写入；返回 this._dateFormats。
- `setDateFormats(formatsByTimezone)` [源码:139](../../eyes/src/engine/managers/TimeManager-728.js#L139)：当前操作：写入 _dateFormats[formatGroup]；返回 无显式返回。
- `getDateFormat(formatName, formatGroup)` [源码:142](../../eyes/src/engine/managers/TimeManager-728.js#L142)：当前操作：写入 无直接字段写入；返回 this._dateFormats[formatGroup][formatName]。
- `setDateFormat(formatName, formatValue)` [源码:146](../../eyes/src/engine/managers/TimeManager-728.js#L146)：当前操作：写入 _dateFormats[formatName]；返回 无显式返回。
- `getLimits()` [源码:149](../../eyes/src/engine/managers/TimeManager-728.js#L149)：当前操作：写入 无直接字段写入；返回 this._timeLimits。
- `setLimits(limits)` [源码:152](../../eyes/src/engine/managers/TimeManager-728.js#L152)：当前操作：写入 _timeLimits.max、_timeLimits.min；返回 无显式返回。
- `getDefaultLimits()` [源码:156](../../eyes/src/engine/managers/TimeManager-728.js#L156)：当前操作：写入 无直接字段写入；返回 this._defaultLimits。
- `setDefaultLimits(limits)` [源码:159](../../eyes/src/engine/managers/TimeManager-728.js#L159)：当前操作：写入 _defaultLimits.max、_defaultLimits.min；返回 无显式返回。
- `resetLimits()` [源码:163](../../eyes/src/engine/managers/TimeManager-728.js#L163)：当前操作：写入 _timeLimits.max、_timeLimits.min；返回 无显式返回。
- `setMin(minimumTime)` [源码:167](../../eyes/src/engine/managers/TimeManager-728.js#L167)：当前操作：写入 _timeLimits.min；返回 无显式返回。
- `resetMin()` [源码:170](../../eyes/src/engine/managers/TimeManager-728.js#L170)：当前操作：写入 _timeLimits.min；返回 无显式返回。
- `setMax(maximumTime)` [源码:173](../../eyes/src/engine/managers/TimeManager-728.js#L173)：当前操作：写入 _timeLimits.max；返回 无显式返回。
- `resetMax()` [源码:176](../../eyes/src/engine/managers/TimeManager-728.js#L176)：当前操作：写入 _timeLimits.max；返回 无显式返回。
- `getTimeUrl(timeValue)` [源码:179](../../eyes/src/engine/managers/TimeManager-728.js#L179)：当前操作：写入 无直接字段写入；返回 utcTime.utc().format(this._dateFormats.utc.url)。
- `getDefaultTimeRate()` [源码:184](../../eyes/src/engine/managers/TimeManager-728.js#L184)：当前操作：写入 无直接字段写入；返回 this._defaultRate。
- `setDefaultTimeRate(defaultRate)` [源码:187](../../eyes/src/engine/managers/TimeManager-728.js#L187)：当前操作：写入 _defaultRate；返回 无显式返回。
- `resetTimeRate()` [源码:190](../../eyes/src/engine/managers/TimeManager-728.js#L190)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getTimeRate()` [源码:193](../../eyes/src/engine/managers/TimeManager-728.js#L193)：当前操作：写入 无直接字段写入；返回 this.pioneer.getTimeRate()。
- `setTimeRate(rate)` [源码:196](../../eyes/src/engine/managers/TimeManager-728.js#L196)：当前操作：写入 _rate；返回 无显式返回。
- `play()` [源码:201](../../eyes/src/engine/managers/TimeManager-728.js#L201)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `pause()` [源码:205](../../eyes/src/engine/managers/TimeManager-728.js#L205)：当前操作：写入 _previousTimeRate；返回 无显式返回。
- `getMidTime(startTime, endTime)` [源码:209](../../eyes/src/engine/managers/TimeManager-728.js#L209)：当前操作：写入 无直接字段写入；返回 getFollowName()(midpointUnixSeconds,"X")。
- `getEventNames()` [源码:213](../../eyes/src/engine/managers/TimeManager-728.js#L213)：当前操作：写入 无直接字段写入；返回 this._eventNames。
- `isWithinLimits(timeValue)` [源码:216](../../eyes/src/engine/managers/TimeManager-728.js#L216)：当前操作：写入 无直接字段写入；返回 this._timeLimits.min&&timeValue.isBefore(this._timeLimits.min)?-1:this._timeLimits.max&&timeValue.isAfter(this._timeLimits.max)?1:0。
- `get timeLimits()` [源码:219](../../eyes/src/engine/managers/TimeManager-728.js#L219)：当前操作：写入 无直接字段写入；返回 this._timeLimits。
- `get forcedPause()` [源码:222](../../eyes/src/engine/managers/TimeManager-728.js#L222)：当前操作：写入 无直接字段写入；返回 this._forcedPause。
- `get previousTimeRate()` [源码:225](../../eyes/src/engine/managers/TimeManager-728.js#L225)：当前操作：写入 无直接字段写入；返回 this._previousTimeRate。

## `eyes/src/engine/managers/TimeManager-922.js`

继承基础时间管理器，在触及边界时更新太阳系时钟提示、展开控件并处理路由。。[源码](../../eyes/src/engine/managers/TimeManager-922.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-TimeManager-922-js)

### `TimeManager`

继承基础时间管理器，在触及边界时更新太阳系时钟提示、展开控件并处理路由。。父类 `Eyes.TimeManager`。

- `_onLimitReach(limitName)` [源码:5](../../eyes/src/engine/managers/TimeManager-922.js#L5)：当前操作：写入 app.getView("distance")._redirect；返回 无显式返回。

## `eyes/src/engine/managers/TitleManager.js`

将路由交给标题解析函数并更新页面标题。。[源码](../../eyes/src/engine/managers/TitleManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-TitleManager-js)

### `TitleManager`

将路由交给标题解析函数并更新页面标题。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app, options)` [源码:5](../../eyes/src/engine/managers/TitleManager.js#L5)：当前操作：写入 _currentTitle、_fullTitle、_options、_parseFn；返回 无显式返回。
- `updateTitle(routeInfo)` [源码:12](../../eyes/src/engine/managers/TitleManager.js#L12)：当前操作：写入 _currentTitle、_fullTitle；返回 无显式返回。
- `_parseRoute(routeInfo)` [源码:21](../../eyes/src/engine/managers/TitleManager.js#L21)：当前操作：写入 无直接字段写入；返回 this._parseFn?this._parseFn(routeInfo):"Home"。
- `setParseFunction(parseFn)` [源码:24](../../eyes/src/engine/managers/TitleManager.js#L24)：当前操作：写入 _parseFn；返回 无显式返回。
- `get currentTitle()` [源码:27](../../eyes/src/engine/managers/TitleManager.js#L27)：当前操作：写入 无直接字段写入；返回 this._currentTitle。
- `get fullTitle()` [源码:30](../../eyes/src/engine/managers/TitleManager.js#L30)：当前操作：写入 无直接字段写入；返回 this._fullTitle。

## `eyes/src/engine/managers/TrailManager.js`

按图层与实体类别创建、显示、隐藏轨迹和轨道线，处理悬停宽度/颜色。。[源码](../../eyes/src/engine/managers/TrailManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-TrailManager-js)

### `TrailManager`

按图层与实体类别创建、显示、隐藏轨迹和轨道线，处理悬停宽度/颜色。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app, scene)` [源码:7](../../eyes/src/engine/managers/TrailManager.js#L7)：当前操作：写入 _colors、_hiddenIds、_ids、_opacity、_orbitLineEntityNames、_orbitLinesOpts、_scene、_width；返回 无显式返回。
- `setScene(scene)` [源码:46](../../eyes/src/engine/managers/TrailManager.js#L46)：当前操作：写入 _scene；返回 无显式返回。
- `create(entityId)` [源码:49](../../eyes/src/engine/managers/TrailManager.js#L49)：当前操作：写入 无直接字段写入；返回 void console.warn("Trail already exists for",entityId)、trailComponent。
- `setStartTime(entityIds, startTime)` [源码:55](../../eyes/src/engine/managers/TrailManager.js#L55)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setEndTime(entityIds, endTime)` [源码:62](../../eyes/src/engine/managers/TrailManager.js#L62)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onHoverChange(entityId, isHovered, updateFade=false)` [源码:69](../../eyes/src/engine/managers/TrailManager.js#L69)：当前操作：写入 无直接字段写入；返回 void。
- `setFade(entityIds, alphaFade)` [源码:99](../../eyes/src/engine/managers/TrailManager.js#L99)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setWidths(entityIds, startWidth, endWidth)` [源码:106](../../eyes/src/engine/managers/TrailManager.js#L106)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setMultipleWidths(entityIds, startWidth, endWidth)` [源码:113](../../eyes/src/engine/managers/TrailManager.js#L113)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getColor(entityId)` [源码:119](../../eyes/src/engine/managers/TrailManager.js#L119)：当前操作：写入 无直接字段写入；返回 trailComponent?trailComponent.getColor():null。
- `setColor(entityIds, suppliedColor=null)` [源码:123](../../eyes/src/engine/managers/TrailManager.js#L123)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setUpTrail(entity)` [源码:134](../../eyes/src/engine/managers/TrailManager.js#L134)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `show(entityIds=null)` [源码:143](../../eyes/src/engine/managers/TrailManager.js#L143)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hide(hiddenIds=null)` [源码:155](../../eyes/src/engine/managers/TrailManager.js#L155)：当前操作：写入 _hiddenIds；返回 无显式返回。
- `toggleTrails(isVisible, {scene:scene}={})` [源码:163](../../eyes/src/engine/managers/TrailManager.js#L163)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `createOrbitLine(entity)` [源码:184](../../eyes/src/engine/managers/TrailManager.js#L184)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleOrbits(isVisible)` [源码:201](../../eyes/src/engine/managers/TrailManager.js#L201)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `get ids()` [源码:207](../../eyes/src/engine/managers/TrailManager.js#L207)：当前操作：写入 无直接字段写入；返回 this._ids。
- `set ids(entityIds)` [源码:210](../../eyes/src/engine/managers/TrailManager.js#L210)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/managers/TrajectoryManager.js`

为定制任务创建按阶段控制的轨迹、指示器与 UI，进入/退出时保存恢复图层及时间控件。。[源码](../../eyes/src/engine/managers/TrajectoryManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-TrajectoryManager-js)

### `TrajectoryManager`

为定制任务创建按阶段控制的轨迹、指示器与 UI，进入/退出时保存恢复图层及时间控件。。父类 `Eyes.BaseManager`。

- `constructor(app)` [源码:6](../../eyes/src/engine/managers/TrajectoryManager.js#L6)：当前操作：写入 _app、_atSystem、_callbackEnabled、_entityId、_isEnabled、_offsetObserver、_prevEntityId、_resizeObserver、_urlMissionChoice、_wasAlreadyEnabled；返回 无显式返回。
- `getCustomMissions()` [源码:28](../../eyes/src/engine/managers/TrajectoryManager.js#L28)：当前操作：写入 无直接字段写入；返回 missionDefinitions。
- `createTrajectory(entity, missionId, startTimeOverride=null)` [源码:31](../../eyes/src/engine/managers/TrajectoryManager.js#L31)：当前操作：写入 无直接字段写入；返回 void。
- `hasTrajectoryOptions(entityId)` [源码:54](../../eyes/src/engine/managers/TrajectoryManager.js#L54)：当前操作：写入 无直接字段写入；返回 !!entityId&&Object.keys(this.getCustomMissions()).includes(entityId)。
- `setEnabled(isEnabled, entityId, removedQueries=["trajectory"])` [源码:57](../../eyes/src/engine/managers/TrajectoryManager.js#L57)：当前操作：写入 _entityId、_isEnabled、_prevEntityId、_urlMissionChoice、_wasAlreadyEnabled；返回 无显式返回。
- `_enterSelectedTrajectoryView(entityId, requestedMission)` [源码:78](../../eyes/src/engine/managers/TrajectoryManager.js#L78)：当前操作：写入 _atSystem、_entityId；返回 无显式返回。
- `_toggleLayers()` [源码:95](../../eyes/src/engine/managers/TrajectoryManager.js#L95)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onEnable()` [源码:104](../../eyes/src/engine/managers/TrajectoryManager.js#L104)：当前操作：写入 无直接字段写入；返回 void。
- `_onDisable()` [源码:124](../../eyes/src/engine/managers/TrajectoryManager.js#L124)：当前操作：写入 _atSystem；返回 无显式返回。
- `isEnabled()` [源码:162](../../eyes/src/engine/managers/TrajectoryManager.js#L162)：当前操作：写入 无直接字段写入；返回 this._isEnabled。
- `createUI(parentElement)` [源码:165](../../eyes/src/engine/managers/TrajectoryManager.js#L165)：当前操作：写入 无直接字段写入；返回 void。
- `_createExitButton()` [源码:175](../../eyes/src/engine/managers/TrajectoryManager.js#L175)：当前操作：写入 无直接字段写入；返回 exitButton。
- `_createCheckboxOptions(entity)` [源码:185](../../eyes/src/engine/managers/TrajectoryManager.js#L185)：当前操作：写入 _trajectoryViewId；返回 void、optionsElement。
- `customEngineLoopCallback()` [源码:225](../../eyes/src/engine/managers/TrajectoryManager.js#L225)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setEngineLoopCallback(enabled)` [源码:245](../../eyes/src/engine/managers/TrajectoryManager.js#L245)：当前操作：写入 _callbackEnabled；返回 无显式返回。
- `enableAssociatedEntities(entityId)` [源码:248](../../eyes/src/engine/managers/TrajectoryManager.js#L248)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setUpAssociatedEntities(entity, enabled=true)` [源码:254](../../eyes/src/engine/managers/TrajectoryManager.js#L254)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setUpAssociatedEntityTrails(entity, enabled=true)` [源码:258](../../eyes/src/engine/managers/TrajectoryManager.js#L258)：当前操作：写入 无直接字段写入；返回 void、void entity.getComponent(Pioneer.TrailComponent,missionId)?.setEnabled(false)。
- `_setUpIndicatorForEntity(entity, enabled=true)` [源码:278](../../eyes/src/engine/managers/TrajectoryManager.js#L278)：当前操作：写入 无直接字段写入；返回 void(existingIndicator&&entity.removeComponent(existingIndicator))。
- `_calcIndicatorPadding(entityId=this._entityId)` [源码:291](../../eyes/src/engine/managers/TrajectoryManager.js#L291)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setUpVoyagers(entityId, missionId)` [源码:315](../../eyes/src/engine/managers/TrajectoryManager.js#L315)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/engine/managers/WMTSManager.js`

获取 WMTS 配置，核验日期与后备图源，创建并配置 WMTSComponent。。[源码](../../eyes/src/engine/managers/WMTSManager.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-engine-managers-WMTSManager-js)

### `WMTSManager`

获取 WMTS 配置，核验日期与后备图源，创建并配置 WMTSComponent。。父类 `EyesPublicApi.BaseManager`。

- `constructor(app)` [源码:7](../../eyes/src/engine/managers/WMTSManager.js#L7)：当前操作：写入 _wmtsComponentStates；返回 无显式返回。
- `getWMTSComponentState(entityId)` [源码:12](../../eyes/src/engine/managers/WMTSManager.js#L12)：当前操作：写入 无直接字段写入；返回 this._wmtsComponentStates.get(entityId)。
- `setWMTSComponentState(entityId, componentState)` [源码:15](../../eyes/src/engine/managers/WMTSManager.js#L15)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getImageDate(requestedTime)` [源码:18](../../eyes/src/engine/managers/WMTSManager.js#L18)：当前操作：写入 无直接字段写入；返回 null、date.getFullYear()+"-"+String(date.getMonth()+1).padStart(2,"0")+"-"+String(date.getDate()).padStart(2,"0")。
- `verifyImageURL(endpoint, imageDate, tileMatrixSet)` [源码:26](../../eyes/src/engine/managers/WMTSManager.js#L26)：当前操作：写入 无直接字段写入；返回 await Promise.race([verificationPromise,promise])、false。
- `getValidWMTSData(wmtsOptions)` [源码:51](../../eyes/src/engine/managers/WMTSManager.js#L51)：当前操作：写入 无直接字段写入；返回 wmtsOptions、null、(await this.verifyImageURL(endpoint,imageDate,wmtsOptions.tile))?{...wmtsOptions,layer:layerId,endPoint:endpoint}:(console.warn(ˋInvalid layer for date ${imageDate}ˋ),null)。
- `initWMTS(entityId, wmtsOptions)` [源码:80](../../eyes/src/engine/managers/WMTSManager.js#L80)：当前操作：写入 无直接字段写入；返回 null、wmtsComponent。

## `eyes/src/engine/pioneer/index.js`

Pioneer 公共出口：转发引擎类型、控制器和组件；index 与 public-api 分隔内部命名空间和外部入口。。[源码](../../eyes/src/engine/pioneer/index.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-engine-pioneer-index-js)

## `eyes/src/engine/pioneer/public-api.js`

Pioneer 公共出口：转发引擎类型、控制器和组件；index 与 public-api 分隔内部命名空间和外部入口。。[源码](../../eyes/src/engine/pioneer/public-api.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-engine-pioneer-public-api-js)

## `eyes/src/engine/solar-system/public-api.js`

太阳系公共出口：转发实体配置工厂、场景工具、观察相机和应用使用的引擎类型。。[源码](../../eyes/src/engine/solar-system/public-api.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-engine-solar-system-public-api-js)
