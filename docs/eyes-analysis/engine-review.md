# eyes 引擎域源码审阅（中文）

本报告覆盖 git 跟踪的 `eyes/src/engine` 全部 233 个文件、196 个类声明、2588 个方法声明。逐文件通过 JavaScript AST 读取正文并提取字段读写、调用、返回和副作用；关键生命周期与 Dynamo 算法另作人工语义审阅。标为「结构证据」的段落是实际代码行为摘要，不等于已恢复所有压缩变量的业务含义。没有执行 NASA 运行时、访问远程资产或验证所有边界场景；已知风险与运行时缺陷严格区分。源码行号是本次分析时的位置，后续插入注释可能使行号变化。

## 运行时链条与所有权

Engine 拥有渲染器、Downloader、ResourceManager、TextureLoader、MaterialManager、Scene 集合和 Viewport 集合。Scene 拥有 Entity；Entity 拥有 Controller/Component。Controller 改变位置、速度、姿态等仿真状态，Component 把状态转换成实际图形。相机也是实体的组件，而视口只是指定用哪个相机渲染哪一块 DOM/画布区域。Entity-62 是运行时实体；Entity-567 是声明式配置注册工厂，两者不应因同名而混为一类。

每帧：真实时间差 → 推进仿真时间 → 保存上一帧 EntityState → 按时间表更新父级与覆盖 → 依赖拓扑排序更新控制器 → 更新视口/相机投影缓存 → 更新组件资源/视觉 → 清屏并逐视口渲染 → 回调 → 复位输入。依赖图 DFS 临时标记检测环；同实体控制器按集合顺序，跨实体通过 modified/dependent state 和父级关系排序。

渲染组件以 0.5px 加载、0.25px 卸载形成迟滞。资源 acquire 不是对象创建的同义词：相同 type+URL 共享 Promise 和引用计数。最后一个使用者 release 后，已加载资源延迟 15 秒销毁，未完成资源立即取消。Dynamo 的 15 秒块回收是另一套独立机制。组件卸载必须处理 Three.js 对象、材质、纹理引用以及配置/引用回调；不能单靠移除场景节点代替释放。

## Dynamo：二进制协议与计算

`def.dyn` 首先读取小端 Int16 版本和零终止类型串；仅允许 v1/v2 和 pos/lin/ori/quat/orb。v2 额外含块名数字宽度，orb 类型头含两项引力参数。PointSet 是递归时间索引/叶样本树，v2 最后起点是区间哨兵而非真实子块。按 hintIndex 及前后邻居快速定位，退化后二分。网络尚未返回时 __update 使用上一对样本继续计算。

| 类型 | Float64 字段顺序 | 每点字节 | 算法/实体影响 |
|---|---|---:|---|
| pos | time, position.xyz, velocity.xyz | 56 | 三次 Hermite；同时输出位置及导数速度 |
| lin | time, position.xyz | 32 | 夹紧比例线性位置，差分速度 |
| ori | time, quaternion(4), angularVelocity.xyz | 64 | 两端角速度外推，再四元数 slerp；旋转角速度 |
| quat | time, quaternion(4) | 40 | 夹紧比例 slerp，应用时角速度零 |
| orb | time, a, e, meanAngularMotion, meanAnomalyAtEpoch, orientation(4) | 72 | 分别传播两端元素到目标时刻，再混合位置/速度 |

以上步长由当前源码实际读操作计算；本次未重新解码真实 NASA 文件，所以不能据此宣称完成资产协议验证。timeOffset 在查询时扣除，在暴露 coverage 时加回；用户覆盖与原始区间先求交。orb 的 body=1/2 按两引力参数把相对轨道拆成质心两侧状态，incremental 控制累加而不是覆盖。

## 解码器、纹理与 LOD

TextureLoader 只做下载内容到 GPU 纹理的转换；共享缓存实际在 ResourceManager。KTX2Loader 是静态共享对象，并以首个创建时的 renderer 检测支持。ModelComponent 的 GLTF LoadingManager 重定向依赖 URL，将图像/KTX2/Draco 请求接入资源引用计数。模型标准材质转换为 Pioneer PBR 时移交贴图并清空旧材质贴图字段，避免旧材质销毁时连带释放已转移纹理。模型动画片段独立缓存为 clip map。TextureLOD 按最大屏幕半径选尺寸，下载完成后才释放旧纹理。

## 需单独复现的静态风险

1. ModelComponent 静态 DracoLoader 捕获首次模型的 owner/loadState/priority，后续模型可能给错误组件记账/报告错误。
2. 圆柱环境贴图分支检查 cylindrical URL，却加载 cubemap URL；updateMaterial 只改局部变量而未给 mesh.material 赋值。
3. TextureLOD 没有显式请求代际校验，较旧异步结果可能覆盖较新的 uniform。
4. ResourceManager 持有者移除只匹配 URL，没有同时匹配 type；缓存键也没有包含纹理加载选项。
5. PointSet 假设叶至少两点且时间单调；Reader 没有自定义边界校验，依赖 DataView RangeError。
6. Tile._split 捕获加载异常后仍在 finally 把状态设 Loaded；该状态不能直接解释为资源全部成功。

这些只是当前源码直接暴露的行为/风险，本次不改变运行逻辑，也不把未复现风险写成已确认运行故障。

## 逐文件、逐类、逐方法证据

### `eyes/src/engine/components/AnnulusComponent.js`

生成可调整内外半径的平面环带网格，按实体姿态定位并通过颜色透明度淡出。

- 证据：`import ../pioneer/index.js`。
- 证据：`AnnulusComponent extends Pioneer.BaseComponent @3`。

#### AnnulusComponent

生成可调整内外半径的平面环带网格，按实体姿态定位并通过颜色透明度淡出。 继承：`Pioneer.BaseComponent`。源码 [eyes/src/engine/components/AnnulusComponent.js:3](../../eyes/src/engine/components/AnnulusComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_alphaMultiplier`、`_color`、`_meshDirty`、`_numPointsOnCircle`、`_sizeInner`、`_sizeOuter`；调用 `new Pioneer.Color`、`super`、`this.__setRadius`、`this.__setUsesEntityOrientation`。 源码 eyes/src/engine/components/AnnulusComponent.js:4；参数 (t, e)。
- `getInnerRadius()`：【结构证据】返回 `this._sizeInner`。 源码 eyes/src/engine/components/AnnulusComponent.js:15；参数 ()。
- `setInnerRadius(sizeInner)`：【结构证据】写入 `_meshDirty`、`_sizeInner`。 源码 eyes/src/engine/components/AnnulusComponent.js:18；参数 (sizeInner)。
- `getOuterRadius()`：【结构证据】返回 `this._sizeOuter`。 源码 eyes/src/engine/components/AnnulusComponent.js:22；参数 ()。
- `setOuterRadius(sizeOuter)`：【结构证据】写入 `_meshDirty`、`_sizeOuter`；调用 `this.__setRadius`。 源码 eyes/src/engine/components/AnnulusComponent.js:25；参数 (sizeOuter)。
- `getColor()`：【结构证据】返回 `this._color`。 源码 eyes/src/engine/components/AnnulusComponent.js:30；参数 ()。
- `setColor(t)`：【结构证据】调用 `Pioneer.ThreeJsHelper.setUniformColorRGBA`、`this._color.copy`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/AnnulusComponent.js:33；参数 (t)。
- `__prepareForRender(t)`：【结构证据】写入 `_alphaMultiplier`；调用 `Pioneer.ThreeJsHelper.setOrientationToEntity`、`Pioneer.ThreeJsHelper.setPositionToEntity`、`Pioneer.ThreeJsHelper.setUniformColorRGBA`、`this._updateMesh`、`this.getEntity`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/AnnulusComponent.js:37；参数 (t)。
- `__loadResources()`：【结构证据】调用 `Pioneer.ThreeJsHelper.createMeshObject`、`Pioneer.ThreeJsHelper.setUniformColorRGBA`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getEngine`、`this.getEntity().getScene().getEngine().getMaterialManager`。 源码 eyes/src/engine/components/AnnulusComponent.js:44；参数 ()。
- `__unloadResources()`：【结构证据】调用 `Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials`。 源码 eyes/src/engine/components/AnnulusComponent.js:54；参数 ()。
- `_updateMesh()`：【结构证据】写入 `_meshDirty`；调用 `Math.cos`、`Math.sin`、`Pioneer.ThreeJsHelper.setIndices`、`Pioneer.ThreeJsHelper.setVertices`、`new Float32Array`、`new Pioneer.Vector3`。 源码 eyes/src/engine/components/AnnulusComponent.js:57；参数 ()。

### `eyes/src/engine/components/AtmosphereComponent.js`

依赖同实体 SpheroidComponent 的半径，以自定义散射材质渲染大气壳；同步密度、日落色和光源。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`AtmosphereComponent extends PioneerPublicApi.BaseComponent @3`。

#### AtmosphereComponent

依赖同实体 SpheroidComponent 的半径，以自定义散射材质渲染大气壳；同步密度、日落色和光源。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/AtmosphereComponent.js:3](../../eyes/src/engine/components/AtmosphereComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_color`、`_density`、`_emissivity`、`_scaleHeight`、`_spheroidChangedCallback`、`_spheroidComponentRef`、`_sunBrightness`、`_sunsetColor`；调用 `new PioneerPublicApi.Color`、`new PioneerPublicApi.ComponentRef`、`super`、`this.__setUsesEntityOrientation`、`this._spheroidChangedCallback.bind`、`this._spheroidComponentRef.setRefChangedCallback`。 源码 eyes/src/engine/components/AtmosphereComponent.js:4；参数 (t, e)。
- `getSpheroid()`：【结构证据】返回 `this._spheroidComponentRef.get()`；调用 `this._spheroidComponentRef.get`。 源码 eyes/src/engine/components/AtmosphereComponent.js:18；参数 ()。
- `getDensity()`：【结构证据】返回 `this._density`。 源码 eyes/src/engine/components/AtmosphereComponent.js:21；参数 ()。
- `setDensity(density)`：【结构证据】写入 `_density`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/AtmosphereComponent.js:24；参数 (density)。
- `getScaleHeight()`：【结构证据】返回 `this._scaleHeight`。 源码 eyes/src/engine/components/AtmosphereComponent.js:28；参数 ()。
- `setScaleHeight(scaleHeight)`：【结构证据】写入 `_scaleHeight`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/AtmosphereComponent.js:31；参数 (scaleHeight)。
- `getEmissivity()`：【结构证据】返回 `this._emissivity`。 源码 eyes/src/engine/components/AtmosphereComponent.js:35；参数 ()。
- `setEmissivity(emissivity)`：【结构证据】写入 `_emissivity`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/AtmosphereComponent.js:38；参数 (emissivity)。
- `getColor()`：【结构证据】返回 `this._color`。 源码 eyes/src/engine/components/AtmosphereComponent.js:42；参数 ()。
- `setColor(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformColorRGB`、`this._color.copy`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/AtmosphereComponent.js:45；参数 (t)。
- `getSunBrightness()`：【结构证据】返回 `this._sunBrightness`。 源码 eyes/src/engine/components/AtmosphereComponent.js:49；参数 ()。
- `setSunBrightness(sunBrightness)`：【结构证据】写入 `_sunBrightness`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/AtmosphereComponent.js:52；参数 (sunBrightness)。
- `getSunsetColor()`：【结构证据】返回 `this._sunsetColor`。 源码 eyes/src/engine/components/AtmosphereComponent.js:56；参数 ()。
- `setSunsetColor(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformColorRGB`、`this._sunsetColor.copy`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/AtmosphereComponent.js:59；参数 (t)。
- `getSunsetIntensity()`：【结构证据】返回 `this._sunsetIntensity`。 源码 eyes/src/engine/components/AtmosphereComponent.js:63；参数 ()。
- `setSunsetIntensity(sunsetIntensity)`：【结构证据】写入 `_sunsetIntensity`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/AtmosphereComponent.js:66；参数 (sunsetIntensity)。
- `setSpheroidReference(t)`：【结构证据】调用 `this._spheroidComponentRef.set`、`this.getEntity`、`this.getEntity().getName`。 源码 eyes/src/engine/components/AtmosphereComponent.js:70；参数 (t)。
- `__destroy()`：【结构证据】调用 `super.__destroy`、`t.removeChangedCallback`、`this._spheroidComponentRef.get`。 源码 eyes/src/engine/components/AtmosphereComponent.js:73；参数 ()。
- `__update()`：【结构证据】调用 `this._spheroidComponentRef.update`。 源码 eyes/src/engine/components/AtmosphereComponent.js:78；参数 ()。
- `__prepareForRender(t)`：【结构证据】调用 `PioneerPublicApi.MaterialUtils.setLightSourceUniforms`、`PioneerPublicApi.ThreeJsHelper.setOrientationToEntity`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`PioneerPublicApi.ThreeJsHelper.setUniformQuaternion`、`PioneerPublicApi.ThreeJsHelper.setUniformVector3`、`PioneerPublicApi.Vector3.pool.get`。 源码 eyes/src/engine/components/AtmosphereComponent.js:81；参数 (t)。
- `__loadResources()`：【结构证据】调用 `Math.cos`、`Math.sin`、`PioneerPublicApi.LatLonAlt.pool.get`、`PioneerPublicApi.LatLonAlt.pool.release`、`PioneerPublicApi.ThreeJsHelper.createMeshObject`、`PioneerPublicApi.ThreeJsHelper.setIndices`。 源码 eyes/src/engine/components/AtmosphereComponent.js:92；参数 ()。
- `__unloadResources()`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`。 源码 eyes/src/engine/components/AtmosphereComponent.js:155；参数 ()。
- `_spheroidRefChangedCallback(t, e)`：【结构证据】调用 `e.addChangedCallback`、`t.removeChangedCallback`、`this._spheroidChangedCallback`。 源码 eyes/src/engine/components/AtmosphereComponent.js:158；参数 (t, e)。
- `_spheroidChangedCallback()`：【结构证据】调用 `Math.max`、`PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`t.getEquatorialRadius`、`t.getPolarRadius`、`this.__setRadius`、`this._spheroidComponentRef.get`。 源码 eyes/src/engine/components/AtmosphereComponent.js:163；参数 ()。

### `eyes/src/engine/components/BaseComponent.js`

所有渲染组件的资源状态机、相机投影半径、可见性和 Three.js 对象所有权基类。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`BaseComponent extends PioneerPublicApi.EntityItem @3`。

#### BaseComponent

所有渲染组件的资源状态机、相机投影半径、可见性和 Three.js 对象所有权基类。 继承：`PioneerPublicApi.EntityItem`。源码 [eyes/src/engine/components/BaseComponent.js:3](../../eyes/src/engine/components/BaseComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_excludedCameras`、`_forceLoaded`、`_greatestPixelSpaceRadius`、`_isGroundComponent`、`_loadState`、`_pixelSpaceRadiusPerCamera`、`_radius`、`_renderingEnabled`；调用 `new PioneerPublicApi.FastMap`、`new PioneerPublicApi.VisibleInterval`、`new Set`、`super`。 源码 eyes/src/engine/components/BaseComponent.js:4；参数 (t, e)。
- `__destroy()`：【结构证据】调用 `super.__destroy`、`this._unloadResources`。 源码 eyes/src/engine/components/BaseComponent.js:23；参数 ()。
- `setEnabled(t)`：【结构证据】调用 `super.setEnabled`、`this.__updateLoadState`。 源码 eyes/src/engine/components/BaseComponent.js:27；参数 (t)。
- `getRadius()`：【结构证据】返回 `this._radius`。 源码 eyes/src/engine/components/BaseComponent.js:31；参数 ()。
- `__setRadius(radius)`：【结构证据】写入 `_radius`。 源码 eyes/src/engine/components/BaseComponent.js:34；参数 (radius)。
- `getPixelSpaceRadiusInCamera(t)`：【结构证据】返回 `this._pixelSpaceRadiusPerCamera.get(t)`；调用 `this._pixelSpaceRadiusPerCamera.get`。 源码 eyes/src/engine/components/BaseComponent.js:37；参数 (t)。
- `getGreatestPixelSpaceRadius()`：【结构证据】返回 `this._greatestPixelSpaceRadius`。 源码 eyes/src/engine/components/BaseComponent.js:40；参数 ()。
- `isGroundComponent()`：【结构证据】返回 `this._isGroundComponent`。 源码 eyes/src/engine/components/BaseComponent.js:43；参数 ()。
- `setIsGroundComponent(isGroundComponent)`：【结构证据】写入 `_isGroundComponent`；调用 `this.getEntity`、`this.getEntity().__updateGroundComponent`。 源码 eyes/src/engine/components/BaseComponent.js:46；参数 (isGroundComponent)。
- `getThreeJsObjects()`：【结构证据】返回 `this._threeJsObjects`。 源码 eyes/src/engine/components/BaseComponent.js:49；参数 ()。
- `getThreeJsMaterials()`：【结构证据】返回 `this._threeJsMaterials`。 源码 eyes/src/engine/components/BaseComponent.js:52；参数 ()。
- `getThreeJsObjectByName(t)`：【结构证据】返回 `i` 或 `null`。 源码 eyes/src/engine/components/BaseComponent.js:55；参数 (t)。
- `getThreeJsPositionInObject(t, e)`：【结构证据】调用 `PioneerPublicApi.Vector3.threeJsPool.get`、`PioneerPublicApi.Vector3.threeJsPool.release`、`i.applyMatrix4`、`i.set`、`t.copyFromThreeJs`。 源码 eyes/src/engine/components/BaseComponent.js:62；参数 (t, e)。
- `getThreeJsOrientationInObject(t, e)`：【结构证据】调用 `PioneerPublicApi.Quaternion.threeJsPool.get`、`PioneerPublicApi.Quaternion.threeJsPool.release`、`PioneerPublicApi.Vector3.threeJsPool.get`、`PioneerPublicApi.Vector3.threeJsPool.release`、`i.applyMatrix4`、`i.set`。 源码 eyes/src/engine/components/BaseComponent.js:73；参数 (t, e)。
- `setAlphaFadeMultiplier(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/BaseComponent.js:88；参数 (t)。
- `getLoadState()`：【结构证据】返回 `this._loadState`。 源码 eyes/src/engine/components/BaseComponent.js:94；参数 ()。
- `isForceLoaded()`：【结构证据】返回 `this._forceLoaded`。 源码 eyes/src/engine/components/BaseComponent.js:97；参数 ()。
- `setForceLoaded(forceLoaded)`：【结构证据】写入 `_forceLoaded`；调用 `this._loadResources`。 源码 eyes/src/engine/components/BaseComponent.js:100；参数 (forceLoaded)。
- `__updateLoadState()`：实体和组件启用、覆盖有效且投影半径 >0.5px 时开始加载；半径 <0.25px 才卸载，构成迟滞，forceLoaded 可绕过尺寸/覆盖约束。 源码 eyes/src/engine/components/BaseComponent.js:104；参数 ()。
- `resetResources()`：【结构证据】写入 `_loadState`；调用 `this._unloadResources`。 源码 eyes/src/engine/components/BaseComponent.js:110；参数 ()。
- `setResourcesLoadedCallback(resourcesLoadedCallback)`：【结构证据】写入 `_resourcesLoadedCallback`。 源码 eyes/src/engine/components/BaseComponent.js:115；参数 (resourcesLoadedCallback)。
- `setResourcesUnloadedCallback(resourcesUnloadedCallback)`：【结构证据】写入 `_resourcesUnloadedCallback`。 源码 eyes/src/engine/components/BaseComponent.js:118；参数 (resourcesUnloadedCallback)。
- `_loadResources()`：置 loading，等待子类 __loadResources；若期间 reset 为 unloaded，则完成后立刻卸载；否则置 loaded 并回调。异常写 failed/error。 源码 eyes/src/engine/components/BaseComponent.js:121；参数 ()。
- `_unloadResources()`：【结构证据】写入 `_loadState.state`、`_threeJsMaterials`、`_threeJsObjects`；调用 `this.__unloadResources`、`this._resourcesUnloadedCallback`。 源码 eyes/src/engine/components/BaseComponent.js:129；参数 ()。
- `__loadResources()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/components/BaseComponent.js:136；参数 ()。
- `__unloadResources()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/components/BaseComponent.js:137；参数 ()。
- `getLoadedPromise(t=false, e=Number.POSITIVE_INFINITY)`：先等待下一帧再轮询；force=false 时 unloaded 也算满足，不能把此 Promise 的成功解释为 GPU 资源必已加载。 源码 eyes/src/engine/components/BaseComponent.js:138；参数 (t=false, e=Number.POSITIVE_INFINITY)。
- `__updateCameraVariablesBase(t)`：【结构证据】返回 `void`；调用 `e.getPixelSpaceRadiusFromNormalSpaceRadius`、`t.getNormalSpaceRadiusFromRadius`、`t.getViewport`、`this.__updateCameraVariables`、`this._pixelSpaceRadiusPerCamera.set`、`this.getEntity`。 源码 eyes/src/engine/components/BaseComponent.js:142；参数 (t)。
- `__updateBase()`：【结构证据】写入 `_greatestPixelSpaceRadius`；调用 `this.__update`、`this.__updateLoadState`、`this._pixelSpaceRadiusPerCamera.getAt`、`this._pixelSpaceRadiusPerCamera.getSize`。 源码 eyes/src/engine/components/BaseComponent.js:150；参数 ()。
- `__prepareForRenderBase(t)`：【结构证据】调用 `t.getAutoMidDistance`、`t.getAutoNearDistance`、`t.getInvertDepth`、`this.__prepareForRender`、`this.__setVisible`、`this._excludedCameras.has`。 源码 eyes/src/engine/components/BaseComponent.js:159；参数 (t)。
- `__updateCameraVariables(t)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/components/BaseComponent.js:170；参数 (t)。
- `__prepareForRender(t)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/components/BaseComponent.js:171；参数 (t)。
- `getUsesEntityOrientation()`：【结构证据】返回 `this._usesEntityOrientation`。 源码 eyes/src/engine/components/BaseComponent.js:172；参数 ()。
- `__setUsesEntityOrientation(usesEntityOrientation)`：【结构证据】写入 `_usesEntityOrientation`；调用 `this.__updateLoadState`。 源码 eyes/src/engine/components/BaseComponent.js:175；参数 (usesEntityOrientation)。
- `isRendering(t)`：【结构证据】返回 `"loaded"===this._loadState.state&&this._renderingEnabled&&(void 0===t||!this._excludedCameras.has(t))`；调用 `this._excludedCameras.has`。 源码 eyes/src/engine/components/BaseComponent.js:179；参数 (t)。
- `getRenderingEnabled()`：【结构证据】返回 `this._renderingEnabled`。 源码 eyes/src/engine/components/BaseComponent.js:182；参数 ()。
- `setRenderingEnabled(renderingEnabled)`：【结构证据】写入 `_renderingEnabled`；调用 `this.__clearCameraDependentsBase`。 源码 eyes/src/engine/components/BaseComponent.js:185；参数 (renderingEnabled)。
- `isExcludedFromCamera(t)`：【结构证据】返回 `this._excludedCameras.has(t)`；调用 `this._excludedCameras.has`。 源码 eyes/src/engine/components/BaseComponent.js:189；参数 (t)。
- `setExcludedFromCamera(t, e)`：【结构证据】调用 `this.__removeCameraDependentsBase`、`this._excludedCameras.add`、`this._excludedCameras.delete`、`this._excludedCameras.has`。 源码 eyes/src/engine/components/BaseComponent.js:192；参数 (t, e)。
- `getVisibleInterval()`：【结构证据】返回 `this._visibleInterval`。 源码 eyes/src/engine/components/BaseComponent.js:195；参数 ()。
- `setVisibleInterval(t)`：【结构证据】调用 `this._visibleInterval.copy`。 源码 eyes/src/engine/components/BaseComponent.js:198；参数 (t)。
- `__setVisible(t)`：【结构证据】写入 `_threeJsObjects[e].visible`。 源码 eyes/src/engine/components/BaseComponent.js:201；参数 (t)。
- `__removeCameraDependentsBase(t)`：【结构证据】调用 `this.__removeCameraDependents`、`this._pixelSpaceRadiusPerCamera.delete`。 源码 eyes/src/engine/components/BaseComponent.js:204；参数 (t)。
- `__clearCameraDependentsBase()`：【结构证据】调用 `this.__clearCameraDependents`、`this._pixelSpaceRadiusPerCamera.clear`。 源码 eyes/src/engine/components/BaseComponent.js:208；参数 ()。
- `__removeCameraDependents(t)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/components/BaseComponent.js:212；参数 (t)。
- `__clearCameraDependents()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/components/BaseComponent.js:213；参数 ()。
- `method toString()`：【结构证据】本访问器没有 AST 可见的 this 字段直接赋值；调用 `this.getEntity`、`this.getEntity().getComponentAt`、`this.getEntity().getName`、`this.getEntity().getNumComponents`。源码 eyes/src/engine/components/BaseComponent.js:405；参数 ()。

### `eyes/src/engine/components/CMTSComponent.js`

按立方体面切分并异步细分地形瓦片，组合高程、颜色及辅助纹理，为地表夹持提供高度查询。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`CMTSComponent extends PioneerPublicApi.BaseComponent @3`。
- 证据：`CMTSTile extends PioneerPublicApi.Tile @284`。

#### CMTSComponent

按立方体面切分并异步细分地形瓦片，组合高程、颜色及辅助纹理，为地表夹持提供高度查询。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/CMTSComponent.js:3](../../eyes/src/engine/components/CMTSComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_atmosphereComponentRef`、`_cameraFieldsOfView`、`_cameraPositions`、`_colorTileSize`、`_endPoints`、`_engine`、`_heightOffset`、`_heightScale`；调用 `new PioneerPublicApi.ComponentRef`、`new PioneerPublicApi.FastMap`、`new PioneerPublicApi.FastSet`、`new Set`、`super`、`this.__setUsesEntityOrientation`。 源码 eyes/src/engine/components/CMTSComponent.js:4；参数 (t, e)。
- `setBaseUrl(t, e)`：【结构证据】调用 `this._endPoints.delete`、`this._endPoints.set`、`this.resetResources`。 源码 eyes/src/engine/components/CMTSComponent.js:32；参数 (t, e)。
- `getHeightOffset()`：【结构证据】返回 `this._heightOffset`。 源码 eyes/src/engine/components/CMTSComponent.js:39；参数 ()。
- `setHeightOffset(heightOffset)`：【结构证据】写入 `_heightOffset`；调用 `this.resetResources`。 源码 eyes/src/engine/components/CMTSComponent.js:42；参数 (heightOffset)。
- `getHeightScale()`：【结构证据】返回 `this._heightScale`。 源码 eyes/src/engine/components/CMTSComponent.js:46；参数 ()。
- `setHeightScale(heightScale)`：【结构证据】写入 `_heightScale`；调用 `this.resetResources`。 源码 eyes/src/engine/components/CMTSComponent.js:49；参数 (heightScale)。
- `getMinLevel()`：【结构证据】返回 `this._minLevel`。 源码 eyes/src/engine/components/CMTSComponent.js:53；参数 ()。
- `setMinLevel(minLevel)`：【结构证据】写入 `_minLevel`。 源码 eyes/src/engine/components/CMTSComponent.js:56；参数 (minLevel)。
- `getMaxLevel()`：【结构证据】返回 `this._maxLevel`。 源码 eyes/src/engine/components/CMTSComponent.js:59；参数 ()。
- `setMaxLevel(maxLevel)`：【结构证据】写入 `_maxLevel`。 源码 eyes/src/engine/components/CMTSComponent.js:62；参数 (maxLevel)。
- `getNumShadowEntities()`：【结构证据】返回 `this._shadowEntities.length`。 源码 eyes/src/engine/components/CMTSComponent.js:65；参数 ()。
- `getShadowEntity(t)`：【结构证据】返回 `this._shadowEntities[t]?.getName()`。 源码 eyes/src/engine/components/CMTSComponent.js:68；参数 (t)。
- `setShadowEntities(t)`：【结构证据】写入 `_shadowEntities`；调用 `PioneerPublicApi.ThreeJsHelper.setDefine`、`new PioneerPublicApi.EntityRef`、`this._shadowEntities.push`、`this.getEntity`、`this.getEntity().getScene`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/CMTSComponent.js:71；参数 (t)。
- `isMaterialOptionEnabled(t)`：【结构证据】返回 `this._materialOptions.has(t)`；调用 `this._materialOptions.has`。 源码 eyes/src/engine/components/CMTSComponent.js:77；参数 (t)。
- `setMaterialOption(t, e)`：【结构证据】调用 `this._materialOptions.add`、`this._materialOptions.delete`、`this._materialOptions.has`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/CMTSComponent.js:80；参数 (t, e)。
- `getGroundPosition(t, e, i)`：【结构证据】返回 `void t.copy(PioneerPublicApi.Vector3.NaN)`；调用 `Math.floor`、`PioneerPublicApi.CubeMap.xyzToUVFace`、`PioneerPublicApi.Geometry.getXYZFromLLAOnSphere`、`PioneerPublicApi.LatLonAlt.pool.get`、`PioneerPublicApi.LatLonAlt.pool.release`、`PioneerPublicApi.Vector3.pool.get`。 源码 eyes/src/engine/components/CMTSComponent.js:98；参数 (t, e, i)。
- `areTilesLoaded()`：【结构证据】返回 `null===this._tilesLoadedPromise`。 源码 eyes/src/engine/components/CMTSComponent.js:127；参数 ()。
- `getTilesLoadedPromise(t=.25, e=Number.POSITIVE_INFINITY)`：【结构证据】返回 `(0,PioneerPublicApi.waitUntil)(()=>{for(let t=0,e=this._loadedTiles.getSize();t<e;t++){if(!this._loadedTiles.getAt(t).isFullyLoaded())return false;}re`；调用 `0,PioneerPublicApi.waitUntil`、`this._loadedTiles.getAt`、`this._loadedTiles.getAt(t).isFullyLoaded`、`this._loadedTiles.getSize`。 源码 eyes/src/engine/components/CMTSComponent.js:130；参数 (t=.25, e=Number.POSITIVE_INFINITY)。
- `setSpheroidReference(t)`：【结构证据】调用 `this._spheroidComponentRef.set`、`this.getEntity`、`this.getEntity().getName`。 源码 eyes/src/engine/components/CMTSComponent.js:138；参数 (t)。
- `setTransparent(transparent)`：【结构证据】写入 `_transparent`；调用 `this.resetResources`。 源码 eyes/src/engine/components/CMTSComponent.js:141；参数 (transparent)。
- `__destroy()`：【结构证据】调用 `super.__destroy`、`t.removeChangedCallback`、`this._spheroidComponentRef.get`。 源码 eyes/src/engine/components/CMTSComponent.js:145；参数 ()。
- `__update()`：【结构证据】写入 `_cameraFieldsOfView[t]`、`_rootTiles`、`_tilesLoadedPromise`、`_transitionsCompleteCallback`；返回 `void`；调用 `cMTSTile.forceLoad`、`e.rotateInverse`、`i.getEntity`、`i.getEntity().getPositionRelativeToEntity`、`i.getFieldOfView`、`i.update`。 源码 eyes/src/engine/components/CMTSComponent.js:150；参数 ()。
- `__prepareForRender(t)`：【结构证据】调用 `PioneerPublicApi.MaterialUtils.setUniforms`、`PioneerPublicApi.ThreeJsHelper.setOrientationToEntity`、`this._atmosphereComponentRef.get`、`this._loadedTiles.getAt`、`this._loadedTiles.getAt(e).prepareForRender`、`this._loadedTiles.getSize`。 源码 eyes/src/engine/components/CMTSComponent.js:188；参数 (t)。
- `__loadResources()`：【结构证据】写入 `_colorTileSize`、`_numEndPointsLoading`；调用 `JSON.parse`、`Promise.allSettled`、`t.push`、`this._endPoints.getAt`、`this._endPoints.getSize`、`this.getEntity`。 源码 eyes/src/engine/components/CMTSComponent.js:196；参数 ()。
- `__unloadResources()`：【结构证据】写入 `_rootTiles`；调用 `this._rootTiles[t].destroy`。 源码 eyes/src/engine/components/CMTSComponent.js:212；参数 ()。
- `__getEndPoints()`：【结构证据】返回 `this._endPoints`。 源码 eyes/src/engine/components/CMTSComponent.js:216；参数 ()。
- `__endPointsAreLoaded()`：【结构证据】返回 `0===this._numEndPointsLoading`。 源码 eyes/src/engine/components/CMTSComponent.js:219；参数 ()。
- `__getCameraPositions()`：【结构证据】返回 `this._cameraPositions`。 源码 eyes/src/engine/components/CMTSComponent.js:222；参数 ()。
- `__getCameraFieldsOfView()`：【结构证据】返回 `this._cameraFieldsOfView`。 源码 eyes/src/engine/components/CMTSComponent.js:225；参数 ()。
- `__getThreeJsScene()`：【结构证据】返回 `this._threeJsScene`。 源码 eyes/src/engine/components/CMTSComponent.js:228；参数 ()。
- `__getSplitJoinThresholdFactor()`：【结构证据】返回 `this._splitJoinThresholdFactor`。 源码 eyes/src/engine/components/CMTSComponent.js:231；参数 ()。
- `__getColorTileSize()`：【结构证据】返回 `this._colorTileSize`。 源码 eyes/src/engine/components/CMTSComponent.js:234；参数 ()。
- `__getSpheroidComponent()`：【结构证据】返回 `this._spheroidComponentRef.get()`；调用 `this._spheroidComponentRef.get`。 源码 eyes/src/engine/components/CMTSComponent.js:237；参数 ()。
- `__addLoadedTile(t)`：【结构证据】调用 `this._loadedTiles.add`。 源码 eyes/src/engine/components/CMTSComponent.js:240；参数 (t)。
- `__removeLoadedTile(t)`：【结构证据】调用 `this._loadedTiles.delete`。 源码 eyes/src/engine/components/CMTSComponent.js:243；参数 (t)。
- `__getTransparent()`：【结构证据】返回 `this._transparent`。 源码 eyes/src/engine/components/CMTSComponent.js:246；参数 ()。
- `__getMaterialOptions()`：【结构证据】返回 `this._materialOptions`。 源码 eyes/src/engine/components/CMTSComponent.js:249；参数 ()。
- `_spheroidRefChangedCallback(t, e)`：【结构证据】调用 `e.addChangedCallback`、`t.removeChangedCallback`、`this._spheroidChangedCallback`。 源码 eyes/src/engine/components/CMTSComponent.js:252；参数 (t, e)。
- `_spheroidChangedCallback()`：【结构证据】调用 `Math.max`、`t.getEquatorialRadius`、`t.getPolarRadius`、`this.__setRadius`、`this._spheroidComponentRef.get`、`this.resetResources`。 源码 eyes/src/engine/components/CMTSComponent.js:257；参数 ()。

#### CMTSTile

CMTS 地形子瓦片：网格、高程采样、边界接缝与多图层纹理所有权。 继承：`PioneerPublicApi.Tile`。源码 [eyes/src/engine/components/CMTSComponent.js:284](../../eyes/src/engine/components/CMTSComponent.js#L284)。

- `constructor(component, e, face, level, o, row, col)`：【结构证据】写入 `_center`、`_col`、`_component`、`_face`、`_fullyLoaded`、`_heightData`、`_heightOffset`、`_heightScale`；调用 `CMTSTile._isInABoundary`、`CMTSTile.cmtsCoordToPosition`、`Math.floor`、`Math.max`、`component.__getSpheroidComponent`、`component.getEngine`；含显式错误分支。 源码 eyes/src/engine/components/CMTSComponent.js:285；参数 (component, e, face, level, o, row, col)。
- `getLevel()`：【结构证据】返回 `this._level`。 源码 eyes/src/engine/components/CMTSComponent.js:362；参数 ()。
- `getTileCoord()`：【结构证据】返回 `this._tile`。 源码 eyes/src/engine/components/CMTSComponent.js:365；参数 ()。
- `hasHeightData()`：【结构证据】返回 `null!==this._heightData`。 源码 eyes/src/engine/components/CMTSComponent.js:368；参数 ()。
- `isFullyLoaded()`：【结构证据】返回 `this._fullyLoaded`。 源码 eyes/src/engine/components/CMTSComponent.js:371；参数 ()。
- `getHeight(t)`：【结构证据】返回 `d?(d.llaFromXYZ(latLonAlt,vector3),latLonAlt.alt):0`；调用 `d.llaFromXYZ`、`this._component.__getSpheroidComponent`、`this._getFromData`、`vector3.add`、`vector3.set`。 源码 eyes/src/engine/components/CMTSComponent.js:374；参数 (t)。
- `createNewTile(t, e, i)`：【结构证据】返回 `new CMTSTile(t._component,this,this._face,n,vector2,e,i)`；调用 `new CMTSTile`、`new PioneerPublicApi.Vector2`。 源码 eyes/src/engine/components/CMTSComponent.js:388；参数 (t, e, i)。
- `checkSplit()`：【结构证据】返回 `false` 或 `true`；调用 `this._component.__getColorTileSize`、`this._component.__getSplitJoinThresholdFactor`、`this._component.getMaxLevel`、`this._component.getMinLevel`、`this._getNearestDistance`。 源码 eyes/src/engine/components/CMTSComponent.js:393；参数 ()。
- `checkJoin()`：【结构证据】返回 `true` 或 `false`；调用 `this._component.__getColorTileSize`、`this._component.__getSplitJoinThresholdFactor`、`this._component.getMaxLevel`、`this._component.getMinLevel`、`this._getNearestDistance`。 源码 eyes/src/engine/components/CMTSComponent.js:399；参数 ()。
- `load()`：【结构证据】调用 `this._component.__addLoadedTile`、`this._createObject`、`this._createTempObject`。 源码 eyes/src/engine/components/CMTSComponent.js:405；参数 ()。
- `unload()`：【结构证据】写入 `_fullyLoaded`、`_heightData`、`_meshBitangents`、`_meshIndices`、`_meshNormals`、`_meshPositions`、`_meshTangents`、`_meshUVs`；调用 `new Float32Array`、`new PioneerPublicApi.FastMap`、`new Uint16Array`、`this._component.__removeLoadedTile`、`this._destroyObject`、`this._resourceManager.release`。 源码 eyes/src/engine/components/CMTSComponent.js:409；参数 ()。
- `isVisible()`：【结构证据】返回 `this._visible`。 源码 eyes/src/engine/components/CMTSComponent.js:416；参数 ()。
- `setVisible(visible)`：【结构证据】写入 `_visible`。 源码 eyes/src/engine/components/CMTSComponent.js:419；参数 (visible)。
- `update()`：【结构证据】写入 `_numNonPositiveTexturesLoading`；返回 `false` 或 `this._numNonPositiveTexturesLoading>0||t`；调用 `PioneerPublicApi.ThreeJsHelper.setVertices`、`e.check`、`isFinite`、`t.getAt`、`t.getSize`、`this._component.__endPointsAreLoaded`。 源码 eyes/src/engine/components/CMTSComponent.js:422；参数 ()。
- `_createTempObject()`：【结构证据】写入 `_tempMeshPositions`、`_tempNumVertsPerSide`、`_tempThreeJsMaterial`、`_tempThreeJsMaterial.defines.shadowEntities`、`_tempThreeJsMaterial.defines[t]`、`_tempThreeJsObject`；返回 `false` 或 `true`；调用 `Math.max`、`PioneerPublicApi.MaterialUtils.get`、`PioneerPublicApi.MathUtils.clamp01`、`PioneerPublicApi.ThreeJsHelper.createMeshObject`、`PioneerPublicApi.ThreeJsHelper.setIndices`、`PioneerPublicApi.ThreeJsHelper.setVertices`。 源码 eyes/src/engine/components/CMTSComponent.js:460；参数 ()。
- `_createObject()`：【结构证据】写入 `_fullyLoaded`、`_heightData`、`_heightOffset`、`_heightScale`、`_meshBitangents`、`_meshIndices`、`_meshIndices[6*i+0]`、`_meshIndices[6*i+1]`；返回 `void`；调用 `Math.floor`、`Math.max`、`PioneerPublicApi.MaterialUtils.get`、`PioneerPublicApi.ObjectUtils.entries`、`PioneerPublicApi.ThreeJsHelper.createMeshObject`、`PioneerPublicApi.ThreeJsHelper.setIndices`。 源码 eyes/src/engine/components/CMTSComponent.js:581；参数 ()。
- `_destroyObject(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.destroyMaterial`、`PioneerPublicApi.ThreeJsHelper.destroyObject`、`i.getAt`、`i.getSize`、`n.splice`、`o.splice`。 源码 eyes/src/engine/components/CMTSComponent.js:694；参数 (t)。
- `_getFromData(t, e, i, n, o, r)`：【结构证据】调用 `Math.floor`、`PioneerPublicApi.MathUtils.lerp`。 源码 eyes/src/engine/components/CMTSComponent.js:716；参数 (t, e, i, n, o, r)。
- `_updateVertex(t, e, i, n, g)`：【结构证据】写入 `_meshBitangents[3*t+0]`、`_meshBitangents[3*t+1]`、`_meshBitangents[3*t+2]`、`_meshNormals[3*t+0]`、`_meshNormals[3*t+1]`、`_meshNormals[3*t+2]`、`_meshPositions[3*t+0]`、`_meshPositions[3*t+1]`；调用 `CMTSTile.cmtsCoordToBitangent`、`CMTSTile.cmtsCoordToPosition`、`CMTSTile.cmtsCoordToTangent`、`CMTSTile.getHeightPos`、`Math.floor`、`Math.max`。 源码 eyes/src/engine/components/CMTSComponent.js:729；参数 (t, e, i, n, g)。
- `_adjustForTagHeight(t)`：【结构证据】调用 `PioneerPublicApi.MathUtils.clamp`、`t.magnitude`、`t.setMagnitude`。 源码 eyes/src/engine/components/CMTSComponent.js:767；参数 (t)。
- `_getNonPositiveLevel(t)`：【结构证据】返回 `NaN` 或 `e.configuration.first_level`；调用 `Math.floor`、`Math.log2`、`Number.isFinite`、`PioneerPublicApi.MathUtils.clamp`、`this._component.__getEndPoints`、`this._component.__getEndPoints().get`。 源码 eyes/src/engine/components/CMTSComponent.js:770；参数 (t)。
- `_getNearestDistance()`：【结构证据】返回 `t`；调用 `Math.max`、`Math.tan`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`n.magnitude`、`n.sub`。 源码 eyes/src/engine/components/CMTSComponent.js:778；参数 ()。
- `method toString()`：【结构证据】本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/components/CMTSComponent.js:1049；参数 ()。
- `prepareForRender(t)`：【结构证据】返回 `void(e.visible=false)`；调用 `Math.acos`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`i.getCameraSpacePosition`、`i.getOrientation`。 源码 eyes/src/engine/components/CMTSComponent.js:796；参数 (t)。
- `_loadTexture(t, e, i)`：【结构证据】调用 `this._component.getEntity`、`this._component.getEntity().getLeastCameraDepth`、`this._resourceManager.acquire`、`this._resourceManager.release`、`this._setTexture`、`this.isDestroyed`。 源码 eyes/src/engine/components/CMTSComponent.js:811；参数 (t, e, i)。
- `_setTexture(t, heightData, i)`：【结构证据】写入 `_heightData`；调用 `PioneerPublicApi.ThreeJsHelper.setTransparent`、`i.uniforms.normalScale.value.set`、`this._component.__getTransparent`、`this._component.getHeightScale`、`this._resourceManager.release`。 源码 eyes/src/engine/components/CMTSComponent.js:817；参数 (t, heightData, i)。
- `_isInABoundary(t, e, i, s)`：【结构证据】返回 `n`；调用 `Math.floor`。 源码 eyes/src/engine/components/CMTSComponent.js:835；参数 (t, e, i, s)。
- `getHeightPos(t, e, i, s, n, o, r, a, l, c, h)`：【结构证据】调用 `t.addMult`、`this.getLinearInterpolatedHeightPixel`。 源码 eyes/src/engine/components/CMTSComponent.js:846；参数 (t, e, i, s, n, o, r, a, l, c, h)。
- `getLinearInterpolatedHeightPixel(t, e, i, s)`：【结构证据】返回 `h`；调用 `Math.abs`、`Math.floor`、`this.getHeightFromPixel`。 源码 eyes/src/engine/components/CMTSComponent.js:852；参数 (t, e, i, s)。
- `getHeightFromPixel(t, e, i, n)`：【结构证据】返回 `i[o+0]/256+i[o+1]/65536+i[o+2]/16777216`；调用 `PioneerPublicApi.MathUtils.clamp`。 源码 eyes/src/engine/components/CMTSComponent.js:864；参数 (t, e, i, n)。
- `cmtsCoordToPosition(t, e, i, n, o, r)`：【结构证据】调用 `PioneerPublicApi.Geometry.getLLAFromXYZOnSphere`、`PioneerPublicApi.LatLonAlt.pool.get`、`PioneerPublicApi.LatLonAlt.pool.release`、`r.xyzFromLLA`、`t.normalize`、`t.set`。 源码 eyes/src/engine/components/CMTSComponent.js:869；参数 (t, e, i, n, o, r)。
- `cmtsCoordToTangent(t, e, i, s, n, o)`：【结构证据】调用 `t.setNormalTo`、`this.cmtsCoordToPosition`。 源码 eyes/src/engine/components/CMTSComponent.js:936；参数 (t, e, i, s, n, o)。
- `cmtsCoordToBitangent(t, e, i, s, n, o)`：【结构证据】调用 `t.setNormalTo`、`this.cmtsCoordToPosition`。 源码 eyes/src/engine/components/CMTSComponent.js:941；参数 (t, e, i, s, n, o)。

### `eyes/src/engine/components/CameraComponent.js`

管理透视投影、拾取、遮挡检测、多段深度渲染及后处理的渲染相机组件。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`import ../../vendor/modules/EffectComposer.js`。
- 证据：`import ../../vendor/modules/OutlinePass.js`。
- 证据：`import ../../vendor/modules/RenderPass.js`。
- 证据：`CameraComponent extends PioneerPublicApi.BaseComponent @7`。

#### CameraComponent

管理透视投影、拾取、遮挡检测、多段深度渲染及后处理的渲染相机组件。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/CameraComponent.js:7](../../eyes/src/engine/components/CameraComponent.js#L7)。

- `constructor(t, e)`：【结构证据】写入 `_aspectRatio`、`_autoMidDistance`、`_autoNearDistance`、`_fieldOfView`、`_invertDepth`、`_midDistance`、`_nearDistance`、`_occludingEntities`；调用 `e.getScene`、`e.getScene().getThreeJsScene`、`new EffectComposer.EffectComposer`、`new OutlinePass.OutlinePass`、`new PioneerPublicApi.THREE.PerspectiveCamera`、`new PioneerPublicApi.THREE.Vector2`。 源码 eyes/src/engine/components/CameraComponent.js:8；参数 (t, e)。
- `getViewport()`：【结构证据】返回 `this._viewport`。 源码 eyes/src/engine/components/CameraComponent.js:38；参数 ()。
- `getFieldOfView()`：【结构证据】返回 `this._fieldOfView`。 源码 eyes/src/engine/components/CameraComponent.js:41；参数 ()。
- `getHorizontalFieldOfView()`：【结构证据】返回 `this._aspectRatio>=1?this._fieldOfView:2*Math.atan(Math.tan(this._fieldOfView/2)*this._aspectRatio)`；调用 `Math.atan`、`Math.tan`。 源码 eyes/src/engine/components/CameraComponent.js:44；参数 ()。
- `getVerticalFieldOfView()`：【结构证据】返回 `this._aspectRatio>1?2*Math.atan(Math.tan(this._fieldOfView/2)/this._aspectRatio):this._fieldOfView`；调用 `Math.atan`、`Math.tan`。 源码 eyes/src/engine/components/CameraComponent.js:47；参数 ()。
- `setFieldOfView(fieldOfView)`：【结构证据】写入 `_fieldOfView`。 源码 eyes/src/engine/components/CameraComponent.js:50；参数 (fieldOfView)。
- `getInvertDepth()`：【结构证据】返回 `this._invertDepth`。 源码 eyes/src/engine/components/CameraComponent.js:53；参数 ()。
- `setInvertDepth(invertDepth)`：【结构证据】写入 `_invertDepth`。 源码 eyes/src/engine/components/CameraComponent.js:56；参数 (invertDepth)。
- `getNearDistance()`：【结构证据】返回 `this._nearDistance`。 源码 eyes/src/engine/components/CameraComponent.js:59；参数 ()。
- `setNearDistance(nearDistance)`：【结构证据】写入 `_nearDistance`。 源码 eyes/src/engine/components/CameraComponent.js:62；参数 (nearDistance)。
- `getAutoNearDistance()`：【结构证据】返回 `this._autoNearDistance`。 源码 eyes/src/engine/components/CameraComponent.js:65；参数 ()。
- `getMidDistance()`：【结构证据】返回 `this._midDistance`。 源码 eyes/src/engine/components/CameraComponent.js:68；参数 ()。
- `setMidDistance(midDistance)`：【结构证据】写入 `_midDistance`。 源码 eyes/src/engine/components/CameraComponent.js:71；参数 (midDistance)。
- `getAutoMidDistance()`：【结构证据】返回 `this._autoMidDistance`。 源码 eyes/src/engine/components/CameraComponent.js:74；参数 ()。
- `getNormalSpacePositionFromCameraSpacePosition(t, e)`：【结构证据】调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`i.rotateInverse`、`this.getEntity`、`this.getEntity().getOrientation`。 源码 eyes/src/engine/components/CameraComponent.js:77；参数 (t, e)。
- `getNormalSpaceRadiusFromRadius(t, e)`：【结构证据】返回 `t/Math.abs(e)/Math.tan(this._fieldOfView/2)`；调用 `Math.abs`、`Math.tan`。 源码 eyes/src/engine/components/CameraComponent.js:85；参数 (t, e)。
- `getCameraSpacePositionFromNormalSpacePosition(t, e)`：【结构证据】调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`t.rotate`、`this.getEntity`、`this.getEntity().getOrientation`。 源码 eyes/src/engine/components/CameraComponent.js:88；参数 (t, e)。
- `getRadiusFromNormalSpaceRadius(t, e)`：【结构证据】返回 `t*Math.abs(e)*Math.tan(this._fieldOfView/2)`；调用 `Math.abs`、`Math.tan`。 源码 eyes/src/engine/components/CameraComponent.js:96；参数 (t, e)。
- `getRaycast(t, e, i)`：【结构证据】返回 `a`；调用 `a.push`、`e.getEntity`、`e.getEntity().getOrientation`、`e.getThreeJsObjects`、`e.isRendering`、`i.__prepareForRender`。 源码 eyes/src/engine/components/CameraComponent.js:99；参数 (t, e, i)。
- `getRaycastColor(t, e, i)`：【结构证据】返回 `a`；调用 `Array.isArray`、`Math.floor`、`Object.entries`、`a.push`、`color.set`、`d.drawImage`。 源码 eyes/src/engine/components/CameraComponent.js:133；参数 (t, e, i)。
- `isPositionOccluded(t)`：【结构证据】返回 `true` 或 `false`；调用 `this._occludingEntities[e].isOccludingPosition`。 源码 eyes/src/engine/components/CameraComponent.js:189；参数 (t)。
- `getNearestIntersectingEntity(t)`：【结构证据】返回 `i`；调用 `Number.isNaN`、`PioneerPublicApi.Geometry.getLineSphereIntersectionWithLineStartAtOrigin`、`PioneerPublicApi.Interval.pool.get`、`PioneerPublicApi.Interval.pool.release`、`a.magnitude`、`r.getCameraSpacePosition`。 源码 eyes/src/engine/components/CameraComponent.js:193；参数 (t)。
- `setBloom(t)`：【结构证据】写入 `_threeJsUnrealBloomPass.enabled`、`_threeJsUnrealBloomPass.strength`。 源码 eyes/src/engine/components/CameraComponent.js:208；参数 (t)。
- `setOutline(t, e, i)`：【结构证据】写入 `_outlinePass.enabled`、`_outlinePass.selectedObjects`；调用 `e.getThreeJsObjectByName`、`e.getThreeJsObjects`、`new Error`、`this._outlinePass.hiddenEdgeColor.setRGB`、`this._outlinePass.selectedObjects.push`、`this._outlinePass.visibleEdgeColor.setRGB`；含显式错误分支。 源码 eyes/src/engine/components/CameraComponent.js:212；参数 (t, e, i)。
- `__addToOccludingEntities(t)`：【结构证据】返回 `void`；调用 `this._occludingEntities.push`。 源码 eyes/src/engine/components/CameraComponent.js:230；参数 (t)。
- `__destroy()`：【结构证据】调用 `super.__destroy`、`this._viewport.setCamera`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().__removeCameraDependents`。 源码 eyes/src/engine/components/CameraComponent.js:234；参数 ()。
- `__updateCameraVariablesForConnectedScene()`：【结构证据】写入 `_aspectRatio`、`_autoMidDistance`、`_autoNearDistance`；调用 `Math.max`、`Math.min`、`e.canOcclude`、`e.getGroundComponent`、`e.getName`、`e.getParent`。 源码 eyes/src/engine/components/CameraComponent.js:239；参数 ()。
- `__prepareForRender()`：【结构证据】调用 `e.__render`、`i.__prepareForRender`、`i.isEnabled`、`t.getEntityAt`、`t.getNumEntities`、`this.getEntity`。 源码 eyes/src/engine/components/CameraComponent.js:268；参数 ()。
- `__render()`：【结构证据】调用 `PioneerPublicApi.Quaternion.threeJsPool.get`、`PioneerPublicApi.Quaternion.threeJsPool.release`、`e.set`、`this._threeJsCamera.setRotationFromQuaternion`、`this._threeJsComposer.render`、`this.getEntity`。 源码 eyes/src/engine/components/CameraComponent.js:277；参数 ()。
- `__setViewport(viewport)`：【结构证据】写入 `_viewport`。 源码 eyes/src/engine/components/CameraComponent.js:285；参数 (viewport)。
- `_updateProjectionMatrix()`：【结构证据】写入 `_threeJsCamera.projectionMatrix`、`_threeJsCamera.projectionMatrixInverse`；调用 `Math.tan`、`a.set`、`matrix4.set`、`new PioneerPublicApi.THREE.Matrix4`。 源码 eyes/src/engine/components/CameraComponent.js:288；参数 ()。

### `eyes/src/engine/components/CometTailComponent.js`

基于历史运动及恒星加速度生成彗尾粒子，并按相机设置精灵材质。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`CometTailComponent extends PioneerPublicApi.BaseComponent @3`。

#### CometTailComponent

基于历史运动及恒星加速度生成彗尾粒子，并按相机设置精灵材质。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/CometTailComponent.js:3](../../eyes/src/engine/components/CometTailComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_color`、`_lightSource`、`_numberOfParticles`、`_starAccelerationMultiplier`、`_timeLength`、`_timeOfParticle0`；调用 `new PioneerPublicApi.Color`、`new PioneerPublicApi.EntityRef`、`super`、`this.getEntity`、`this.getEntity().getScene`。 源码 eyes/src/engine/components/CometTailComponent.js:4；参数 (t, e)。
- `getLightSource()`：【结构证据】返回 `this._lightSource.getName()`；调用 `this._lightSource.getName`。 源码 eyes/src/engine/components/CometTailComponent.js:13；参数 ()。
- `setLightSource(t)`：【结构证据】调用 `this._lightSource.setName`。 源码 eyes/src/engine/components/CometTailComponent.js:16；参数 (t)。
- `getTimeLength()`：【结构证据】返回 `this._timeLength`。 源码 eyes/src/engine/components/CometTailComponent.js:19；参数 ()。
- `setTimeLength(timeLength)`：【结构证据】写入 `_timeLength`；调用 `this.resetResources`。 源码 eyes/src/engine/components/CometTailComponent.js:22；参数 (timeLength)。
- `getStarAccelerationMultiplier()`：【结构证据】返回 `this._starAccelerationMultiplier`。 源码 eyes/src/engine/components/CometTailComponent.js:26；参数 ()。
- `setStarAccelerationMultiplier(starAccelerationMultiplier)`：【结构证据】写入 `_starAccelerationMultiplier`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/CometTailComponent.js:29；参数 (starAccelerationMultiplier)。
- `getNumberOfParticles()`：【结构证据】返回 `this._numberOfParticles`。 源码 eyes/src/engine/components/CometTailComponent.js:33；参数 ()。
- `setNumberOfParticles(numberOfParticles)`：【结构证据】写入 `_numberOfParticles`；调用 `this.resetResources`。 源码 eyes/src/engine/components/CometTailComponent.js:36；参数 (numberOfParticles)。
- `getColor()`：【结构证据】返回 `this._color`。 源码 eyes/src/engine/components/CometTailComponent.js:40；参数 ()。
- `setColor(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA`、`this._color.copy`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/CometTailComponent.js:43；参数 (t)。
- `__update()`：【结构证据】返回 `void`；调用 `Math.max`、`PioneerPublicApi.MathUtils.wrap`、`PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`PioneerPublicApi.ThreeJsHelper.setUniformVector3`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`。 源码 eyes/src/engine/components/CometTailComponent.js:47；参数 ()。
- `__prepareForRender(t)`：【结构证据】写入 `getThreeJsMaterials()[0].uniforms.color.value.w`；调用 `PioneerPublicApi.MathUtils.clamp01`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`PioneerPublicApi.ThreeJsHelper.setUniformVector3`、`e.magnitude`、`this.__setVisible`、`this.getEntity`。 源码 eyes/src/engine/components/CometTailComponent.js:66；参数 (t)。
- `__loadResources()`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.createMeshObjectGivenGeometry`、`PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA`、`PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`instancedBufferGeometry.setAttribute`、`instancedBufferGeometry.setIndex`、`new Float32Array`。 源码 eyes/src/engine/components/CometTailComponent.js:75；参数 ()。
- `__unloadResources()`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`。 源码 eyes/src/engine/components/CometTailComponent.js:116；参数 ()。
- `_newParticle(t, timeOfParticle0)`：【结构证据】写入 `_timeOfParticle0`；调用 `Math.random`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`this._lightSource.get`、`this.getEntity`、`this.getEntity().getPositionRelativeToEntity`。 源码 eyes/src/engine/components/CometTailComponent.js:119；参数 (t, timeOfParticle0)。

### `eyes/src/engine/components/ConnectedSpriteComponent.js`

把实体位置与屏幕偏移精灵连线，生成连接部分与图标的专用顶点和材质。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`ConnectedSpriteComponent extends PioneerPublicApi.BaseComponent @3`。

#### ConnectedSpriteComponent

把实体位置与屏幕偏移精灵连线，生成连接部分与图标的专用顶点和材质。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/ConnectedSpriteComponent.js:3](../../eyes/src/engine/components/ConnectedSpriteComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_blending`、`_colorMultiplier`、`_entity1`、`_entity1Offset`、`_entity2`、`_entity2Offset`、`_textureAspectRatio`、`_textureRepeat`；调用 `new PioneerPublicApi.Color`、`new PioneerPublicApi.EntityRef`、`new PioneerPublicApi.Vector3`、`super`、`this.getEntity`、`this.getEntity().getScene`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:4；参数 (t, e)。
- `getEntity1()`：【结构证据】返回 `this._entity1.getName()`；调用 `this._entity1.getName`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:23；参数 ()。
- `setEntity1(t)`：【结构证据】调用 `this._entity1.setName`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:26；参数 (t)。
- `getEntity1Offset()`：【结构证据】返回 `this._entity1Offset`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:29；参数 ()。
- `setEntity1Offset(t)`：【结构证据】调用 `this._entity1Offset.copy`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:32；参数 (t)。
- `getEntity2()`：【结构证据】返回 `this._entity2.getName()`；调用 `this._entity2.getName`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:35；参数 ()。
- `setEntity2(t)`：【结构证据】调用 `this._entity2.setName`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:38；参数 (t)。
- `getEntity2Offset()`：【结构证据】返回 `this._entity2Offset`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:41；参数 ()。
- `setEntity2Offset(t)`：【结构证据】调用 `this._entity2Offset.copy`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:44；参数 (t)。
- `getWidth1()`：【结构证据】返回 `this._width1`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:47；参数 ()。
- `getWidth2()`：【结构证据】返回 `this._width2`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:50；参数 ()。
- `setWidths(width1, width2)`：【结构证据】写入 `_width1`、`_width2`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:53；参数 (width1, width2)。
- `getWidthUnits()`：【结构证据】返回 `this._widthUnits`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:57；参数 ()。
- `setWidthUnits(widthUnits)`：【结构证据】写入 `_widthUnits`；调用 `this.getLoadState`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:60；参数 (widthUnits)。
- `getTextureUrl()`：【结构证据】返回 `this._textureUrl`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:67；参数 ()。
- `setTextureUrl(textureUrl)`：【结构证据】写入 `_textureUrl`；调用 `this.resetResources`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:70；参数 (textureUrl)。
- `getTextureRepeat()`：【结构证据】返回 `this._textureRepeat`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:74；参数 ()。
- `setTextureRepeat(textureRepeat)`：【结构证据】写入 `_textureRepeat`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:77；参数 (textureRepeat)。
- `getTextureStretch()`：【结构证据】返回 `this._textureStretch`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:80；参数 ()。
- `setTextureStretch(textureStretch)`：【结构证据】写入 `_textureStretch`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:83；参数 (textureStretch)。
- `getTextureYOffset()`：【结构证据】返回 `this._textureYOffset`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:86；参数 ()。
- `setTextureYOffset(textureYOffset)`：【结构证据】写入 `_textureYOffset`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:89；参数 (textureYOffset)。
- `getUOffsetStart()`：【结构证据】返回 `this._uOffsetStart`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:92；参数 ()。
- `setUOffsetStart(uOffsetStart)`：【结构证据】写入 `_uOffsetStart`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:95；参数 (uOffsetStart)。
- `getUOffsetEnd()`：【结构证据】返回 `this._uOffsetEnd`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:98；参数 ()。
- `setUOffsetEnd(uOffsetEnd)`：【结构证据】写入 `_uOffsetEnd`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:101；参数 (uOffsetEnd)。
- `getColorMultiplier()`：【结构证据】返回 `this._colorMultiplier`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:104；参数 ()。
- `setColorMultiplier(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA`、`this._colorMultiplier.copy`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:107；参数 (t)。
- `setBlending(blending)`：【结构证据】写入 `_blending`；调用 `PioneerPublicApi.ThreeJsHelper.setBlending`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:111；参数 (blending)。
- `__update()`：【结构证据】返回 `void`；调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.getExtentsRadius`、`i.magnitude`、`t.getExtentsRadius`、`t.getPositionRelativeToEntity`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:115；参数 ()。
- `__prepareForRender(t)`：【结构证据】返回 `void this.__setVisible(false)`；调用 `Math.max`、`PioneerPublicApi.ThreeJsHelper.setPosition`、`PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`PioneerPublicApi.ThreeJsHelper.setUniformVector3`、`PioneerPublicApi.Vector2.pool.get`、`PioneerPublicApi.Vector2.pool.release`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:124；参数 (t)。
- `__loadResources()`：【结构证据】写入 `_textureAspectRatio`；返回 `void this.getEngine().getResourceManager().releaseAllForEntityItem(this)`；调用 `PioneerPublicApi.ThreeJsHelper.createMeshObject`、`PioneerPublicApi.ThreeJsHelper.setBlending`、`PioneerPublicApi.ThreeJsHelper.setDefine`、`PioneerPublicApi.ThreeJsHelper.setIndices`、`PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA`、`PioneerPublicApi.ThreeJsHelper.setUniformTexture`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:194；参数 ()。
- `__unloadResources()`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`、`this.getEngine`、`this.getEngine().getResourceManager`、`this.getEngine().getResourceManager().releaseAllForEntityItem`。 源码 eyes/src/engine/components/ConnectedSpriteComponent.js:213；参数 ()。

### `eyes/src/engine/components/ConstellationsComponent.js`

载入星座连线/边界数据，在相机相关坐标中绘制星座辅助线。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ../core/SceneHelpers.js`。
- 证据：`ConstellationsComponent extends Pioneer.BaseComponent @4`。

#### ConstellationsComponent

载入星座连线/边界数据，在相机相关坐标中绘制星座辅助线。 继承：`Pioneer.BaseComponent`。源码 [eyes/src/engine/components/ConstellationsComponent.js:4](../../eyes/src/engine/components/ConstellationsComponent.js#L4)。

- `constructor(t, e)`：【结构证据】写入 `_color`、`_database`、`_glowWidth`、`_highlightColor`、`_highlightWidth`、`_highlightedIndex`、`_labelEntities`、`_lineWidth`；调用 `new Pioneer.Color`、`super`、`this.__setRadius`。 源码 eyes/src/engine/components/ConstellationsComponent.js:5；参数 (t, e)。
- `setColor(t)`：【结构证据】调用 `e.lineMesh.setColors`、`i.push`、`this._color.copy`。 源码 eyes/src/engine/components/ConstellationsComponent.js:19；参数 (t)。
- `setLineWidth(lineWidth)`：【结构证据】写入 `_lineWidth`；调用 `this._meshes[e].lineMesh.setWidths`。 源码 eyes/src/engine/components/ConstellationsComponent.js:28；参数 (lineWidth)。
- `setGlowWidth(glowWidth)`：【结构证据】写入 `_glowWidth`；调用 `this._meshes[t].lineMesh.setGlowWidth`。 源码 eyes/src/engine/components/ConstellationsComponent.js:32；参数 (glowWidth)。
- `setUrl(url)`：【结构证据】写入 `_url`；调用 `this.resetResources`。 源码 eyes/src/engine/components/ConstellationsComponent.js:36；参数 (url)。
- `getNames()`：【结构证据】返回 `t`；调用 `t.push`。 源码 eyes/src/engine/components/ConstellationsComponent.js:40；参数 ()。
- `setHighlight(highlightedIndex, e, highlightWidth)`：【结构证据】写入 `_highlightWidth`、`_highlightedIndex`；调用 `s.lineMesh.setColors`、`s.lineMesh.setWidths`、`t.push`、`this._highlightColor.copy`。 源码 eyes/src/engine/components/ConstellationsComponent.js:45；参数 (highlightedIndex, e, highlightWidth)。
- `getNearestConstellationIndex(t, e)`：【结构证据】返回 `i`；调用 `t.distance`、`this._labelEntities[n].getPixelSpacePosition`。 源码 eyes/src/engine/components/ConstellationsComponent.js:60；参数 (t, e)。
- `__prepareForRender(t)`：【结构证据】调用 `Pioneer.ThreeJsHelper.setPositionToEntity`、`this._meshes[e].lineMesh.prepareForRender`、`this.getEntity`、`this.getThreeJsObjects`。 源码 eyes/src/engine/components/ConstellationsComponent.js:69；参数 (t)。
- `__loadResources()`：【结构证据】写入 `_labelEntities`、`_meshes`；调用 `Math.sqrt`、`Pioneer.ThreeJsHelper.setOrientation`、`SceneHelpers.SceneHelpers.getEclipJ2000ToJ2000Rotation`、`a.push`、`c.add`、`c.mult`。 源码 eyes/src/engine/components/ConstellationsComponent.js:73；参数 ()。
- `__unloadResources()`：【结构证据】写入 `_database`、`_meshes`；调用 `Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().removeEntity`。 源码 eyes/src/engine/components/ConstellationsComponent.js:152；参数 ()。

### `eyes/src/engine/components/DiscGridComponent.js`

生成平面圆盘经向/径向网格，为轨道或局部平面提供空间尺度参考。

- 证据：`import ../pioneer/index.js`。
- 证据：`DiscGridComponent extends Pioneer.BaseComponent @3`。

#### DiscGridComponent

生成平面圆盘经向/径向网格，为轨道或局部平面提供空间尺度参考。 继承：`Pioneer.BaseComponent`。源码 [eyes/src/engine/components/DiscGridComponent.js:3](../../eyes/src/engine/components/DiscGridComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_color`、`_lineMesh`、`_lineWidth`、`_meshDirty`、`_numCircles`、`_numSpokes`、`_radialPower`、`_size`；调用 `new Pioneer.Color`、`super`、`this.__setRadius`、`this.__setUsesEntityOrientation`。 源码 eyes/src/engine/components/DiscGridComponent.js:4；参数 (t, e)。
- `getSize()`：【结构证据】返回 `this._size`。 源码 eyes/src/engine/components/DiscGridComponent.js:17；参数 ()。
- `setSize(size)`：【结构证据】写入 `_size`；调用 `this.__setRadius`、`this._lineMesh.setScale`。 源码 eyes/src/engine/components/DiscGridComponent.js:20；参数 (size)。
- `getColor()`：【结构证据】返回 `this._color`。 源码 eyes/src/engine/components/DiscGridComponent.js:25；参数 ()。
- `setColor(t)`：【结构证据】写入 `_meshDirty`；调用 `this._color.copy`。 源码 eyes/src/engine/components/DiscGridComponent.js:28；参数 (t)。
- `getLineWidth()`：【结构证据】返回 `this._lineWidth`。 源码 eyes/src/engine/components/DiscGridComponent.js:32；参数 ()。
- `setLineWidth(lineWidth)`：【结构证据】写入 `_lineWidth`；调用 `this._lineMesh.setWidths`。 源码 eyes/src/engine/components/DiscGridComponent.js:35；参数 (lineWidth)。
- `getNumCircles()`：【结构证据】返回 `this._numCircles`。 源码 eyes/src/engine/components/DiscGridComponent.js:39；参数 ()。
- `setNumCircles(numCircles)`：【结构证据】写入 `_meshDirty`、`_numCircles`。 源码 eyes/src/engine/components/DiscGridComponent.js:42；参数 (numCircles)。
- `getNumSpokes()`：【结构证据】返回 `this._numSpokes`。 源码 eyes/src/engine/components/DiscGridComponent.js:46；参数 ()。
- `setNumSpokes(numSpokes)`：【结构证据】写入 `_meshDirty`、`_numSpokes`。 源码 eyes/src/engine/components/DiscGridComponent.js:49；参数 (numSpokes)。
- `getRadialPower()`：【结构证据】返回 `this._radialPower`。 源码 eyes/src/engine/components/DiscGridComponent.js:53；参数 ()。
- `setRadialPower(radialPower)`：【结构证据】写入 `_meshDirty`、`_radialPower`。 源码 eyes/src/engine/components/DiscGridComponent.js:56；参数 (radialPower)。
- `__prepareForRender(t)`：【结构证据】调用 `Pioneer.ThreeJsHelper.setOrientationToEntity`、`Pioneer.ThreeJsHelper.setPositionToEntity`、`this._lineMesh.prepareForRender`、`this._updateMesh`、`this.getEntity`、`this.getThreeJsObjects`。 源码 eyes/src/engine/components/DiscGridComponent.js:60；参数 (t)。
- `__loadResources()`：【结构证据】写入 `_lineMesh`；调用 `new Pioneer.LineMesh`、`this._lineMesh.setScale`、`this._updateMesh`。 源码 eyes/src/engine/components/DiscGridComponent.js:70；参数 ()。
- `__unloadResources()`：【结构证据】写入 `_lineMesh`；调用 `Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials`。 源码 eyes/src/engine/components/DiscGridComponent.js:75；参数 ()。
- `_updateMesh()`：【结构证据】写入 `_meshDirty`；返回 `void`；调用 `Math.cos`、`Math.sin`、`e.push`、`new Pioneer.Vector3`、`t.push`、`this._lineMesh.setColors`。 源码 eyes/src/engine/components/DiscGridComponent.js:79；参数 ()。

### `eyes/src/engine/components/DistanceLineComponent.js`

在引用实体之间更新带端点/颜色的距离线段。

- 证据：`import ../pioneer/index.js`。
- 证据：`DistanceLineComponent extends Pioneer.BaseComponent @3`。

#### DistanceLineComponent

在引用实体之间更新带端点/颜色的距离线段。 继承：`Pioneer.BaseComponent`。源码 [eyes/src/engine/components/DistanceLineComponent.js:3](../../eyes/src/engine/components/DistanceLineComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_animation`、`_color`、`_depthTest`、`_distance`、`_lineMesh`、`_sourceMpIsSurface`、`_sourceRelRadius`、`_switchStartPos`；调用 `new Pioneer.Color`、`super`、`this.__setRadius`。 源码 eyes/src/engine/components/DistanceLineComponent.js:4；参数 (t, e)。
- `setTargetEntity(targetEntity)`：【结构证据】写入 `_targetEntity`。 源码 eyes/src/engine/components/DistanceLineComponent.js:25；参数 (targetEntity)。
- `setSourceMeasurePoint(t)`：【结构证据】写入 `_animation.isAnimating`、`_animation.sourceStartTime`、`_sourceMpIsSurface`；调用 `Date.now`。 源码 eyes/src/engine/components/DistanceLineComponent.js:28；参数 (t)。
- `setTargetMeasurePoint(t)`：【结构证据】写入 `_animation.isAnimating`、`_animation.targetStartTime`、`_targetMpIsSurface`；调用 `Date.now`。 源码 eyes/src/engine/components/DistanceLineComponent.js:32；参数 (t)。
- `setColor(color)`：【结构证据】写入 `_color`。 源码 eyes/src/engine/components/DistanceLineComponent.js:36；参数 (color)。
- `setWidth(width)`：【结构证据】写入 `_width`。 源码 eyes/src/engine/components/DistanceLineComponent.js:39；参数 (width)。
- `setDistanceProps({distance:distance,sourceRadius:sourceRadius,targetRadius:targetRadius})`：【结构证据】写入 `_distance`、`_sourceRelRadius`、`_targetRelRadius`；调用 `Math.max`、`Math.min`。 源码 eyes/src/engine/components/DistanceLineComponent.js:42；参数 ({distance:distance,sourceRadius:sourceRadius,targetRadius:targetRadius})。
- `_applyEasing(t)`：【结构证据】返回 `(e<=1?Math.pow(e,4):2-Math.pow(2-e,4))/2`；调用 `Math.pow`。 源码 eyes/src/engine/components/DistanceLineComponent.js:51；参数 (t)。
- `_updateAnimation(t, e, i, s, n, o)`：【结构证据】写入 `_animation.isAnimating`、`_animation.sourceStartTime`、`_animation.targetStartTime`；返回 `void`；调用 `Date.now`、`e.lerp`、`t.lerp`、`this._applyEasing`。 源码 eyes/src/engine/components/DistanceLineComponent.js:55；参数 (t, e, i, s, n, o)。
- `__loadResources()`：【结构证据】写入 `_lineMesh`；返回 `Promise.resolve()`；调用 `Promise.resolve`、`new Pioneer.LineMesh`、`this._lineMesh.setColors`、`this._lineMesh.setWidths`、`this.setOpacity`。 源码 eyes/src/engine/components/DistanceLineComponent.js:85；参数 ()。
- `setOpacity(t)`：【结构证据】写入 `_color.a`；调用 `this._lineMesh.setColors`。 源码 eyes/src/engine/components/DistanceLineComponent.js:92；参数 (t)。
- `setDepthTest(depthTest)`：【结构证据】写入 `_depthTest`。 源码 eyes/src/engine/components/DistanceLineComponent.js:96；参数 (depthTest)。
- `__unloadResources()`：【结构证据】写入 `_lineMesh`；调用 `Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials`。 源码 eyes/src/engine/components/DistanceLineComponent.js:99；参数 ()。
- `__prepareForRender(t)`：【结构证据】返回 `void(e&&(e.visible=false))`；调用 `Pioneer.ThreeJsHelper.setPositionToEntity`、`this._calcStartPos`、`this._lineMesh.prepareForRender`、`this._updatePoints`、`this.getEntity`、`this.getThreeJsObjects`。 源码 eyes/src/engine/components/DistanceLineComponent.js:103；参数 (t)。
- `_calcStartPos(t)`：【结构证据】写入 `_switchStartPos`；调用 `Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`e.magnitude`、`t.getEntity`、`t.getEntity().getPositionRelativeToEntity`。 源码 eyes/src/engine/components/DistanceLineComponent.js:113；参数 (t)。
- `_updatePoints(t)`：【结构证据】返回 `void`；调用 `Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`e.copy`、`i.lerp`、`n.lerp`、`o.neg`。 源码 eyes/src/engine/components/DistanceLineComponent.js:120；参数 (t)。

### `eyes/src/engine/components/DivComponent.js`

把真实 DOM 元素投影到视口，处理遮挡、屏幕偏移、对齐和可见区间。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`DivComponent extends PioneerPublicApi.BaseComponent @3`。

#### DivComponent

把真实 DOM 元素投影到视口，处理遮挡、屏幕偏移、对齐和可见区间。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/DivComponent.js:3](../../eyes/src/engine/components/DivComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_activeCamera`、`_alignment`、`_bounds`、`_canBeOccluded`、`_currentHTML`、`_div`、`_div.style.position`、`_div.style.translate`；调用 `document.createElement`、`new PioneerPublicApi.Rect`、`new PioneerPublicApi.Vector2`、`super`、`this.__setRadius`、`this.setVisibleInterval`。 源码 eyes/src/engine/components/DivComponent.js:4；参数 (t, e)。
- `getDiv()`：【结构证据】返回 `this._div`。 源码 eyes/src/engine/components/DivComponent.js:18；参数 ()。
- `getActiveCamera()`：【结构证据】返回 `this._activeCamera`。 源码 eyes/src/engine/components/DivComponent.js:21；参数 ()。
- `setActiveCamera(activeCamera)`：【结构证据】写入 `_activeCamera`；调用 `this.resetResources`。 源码 eyes/src/engine/components/DivComponent.js:24；参数 (activeCamera)。
- `getBounds()`：【结构证据】返回 `this._bounds`。 源码 eyes/src/engine/components/DivComponent.js:28；参数 ()。
- `getCanBeOccluded()`：【结构证据】返回 `this._canBeOccluded`。 源码 eyes/src/engine/components/DivComponent.js:31；参数 ()。
- `setCanBeOccluded(canBeOccluded)`：【结构证据】写入 `_canBeOccluded`。 源码 eyes/src/engine/components/DivComponent.js:34；参数 (canBeOccluded)。
- `getHiddenClass()`：【结构证据】返回 `this._hiddenClass`。 源码 eyes/src/engine/components/DivComponent.js:37；参数 ()。
- `setHiddenClass(hiddenClass)`：【结构证据】写入 `_hiddenClass`；调用 `this._div.classList.add`、`this._div.classList.contains`、`this._div.classList.remove`。 源码 eyes/src/engine/components/DivComponent.js:40；参数 (hiddenClass)。
- `getAlignment()`：【结构证据】返回 `this._alignment`。 源码 eyes/src/engine/components/DivComponent.js:46；参数 ()。
- `setAlignment(t)`：【结构证据】调用 `this._alignment.copy`。 源码 eyes/src/engine/components/DivComponent.js:49；参数 (t)。
- `__unloadResources()`：【结构证据】调用 `this._div.parentNode.removeChild`。 源码 eyes/src/engine/components/DivComponent.js:52；参数 ()。
- `_determineComponentVisibility(t)`：【结构证据】返回 `e`；调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`n.dot`、`t.getEntity`、`t.getEntity().getOrientation`、`t.getEntity().getOrientation().getAxis`。 源码 eyes/src/engine/components/DivComponent.js:55；参数 (t)。
- `__prepareForRender(t)`：【结构证据】写入 `_activeCamera`、`_bounds.origin.x`、`_bounds.origin.y`、`_bounds.size.x`、`_bounds.size.y`、`_currentHTML`、`_div.style.translate`；返回 `void` 或 `void this._div.remove()`；调用 `Math.floor`、`Math.round`、`PioneerPublicApi.Rect.pool.get`、`PioneerPublicApi.Rect.pool.release`、`PioneerPublicApi.Vector2.pool.get`、`PioneerPublicApi.Vector2.pool.release`。 源码 eyes/src/engine/components/DivComponent.js:66；参数 (t)。
- `__setVisible(t)`：【结构证据】写入 `_div.style.translate`；调用 `Math.round`、`t.getBounds`、`this._activeCamera.getViewport`。 源码 eyes/src/engine/components/DivComponent.js:96；参数 (t)。

### `eyes/src/engine/components/DynamicEnvironmentMapComponent.js`

用六面相机/渲染目标更新动态环境贴图，供模型材质采样。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`DynamicEnvironmentMapComponent extends PioneerPublicApi.BaseComponent @3`。

#### DynamicEnvironmentMapComponent

用六面相机/渲染目标更新动态环境贴图，供模型材质采样。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/DynamicEnvironmentMapComponent.js:3](../../eyes/src/engine/components/DynamicEnvironmentMapComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_envMapTexture`、`_faceSize`、`_invalidColor`、`_threeJsCubeCamera`、`_threeJsFaceCameras`、`_threeJsFaceRenderTargets`、`_threeJsQuad`、`_threeJsRenderer`；调用 `new PioneerPublicApi.Color`、`new PioneerPublicApi.THREE.Mesh`、`new PioneerPublicApi.THREE.OrthographicCamera`、`new PioneerPublicApi.THREE.Scene`、`new PioneerPublicApi.THREE.WebGLRenderTarget`、`super`。 源码 eyes/src/engine/components/DynamicEnvironmentMapComponent.js:4；参数 (t, e)。
- `getFaceSize()`：【结构证据】返回 `this._faceSize`。 源码 eyes/src/engine/components/DynamicEnvironmentMapComponent.js:24；参数 ()。
- `setFaceSize(faceSize)`：【结构证据】写入 `_faceSize`、`_threeJsQuad.material.uniforms.faceSize.value`；调用 `this._envMapTexture.setSize`、`this._threeJsFaceRenderTargets[t].setSize`。 源码 eyes/src/engine/components/DynamicEnvironmentMapComponent.js:27；参数 (faceSize)。
- `getTexture()`：【结构证据】返回 `this._envMapTexture.texture`。 源码 eyes/src/engine/components/DynamicEnvironmentMapComponent.js:32；参数 ()。
- `__destroy()`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.destroyMaterial`、`PioneerPublicApi.ThreeJsHelper.destroyObject`、`PioneerPublicApi.ThreeJsHelper.destroyRenderTarget`、`super.__destroy`。 源码 eyes/src/engine/components/DynamicEnvironmentMapComponent.js:35；参数 ()。
- `__render()`：【结构证据】调用 `PioneerPublicApi.Quaternion.threeJsPool.get`、`PioneerPublicApi.Quaternion.threeJsPool.release`、`e.set`、`this._threeJsFaceCameras[0].setRotationFromQuaternion`、`this._threeJsFaceCameras[1].setRotationFromQuaternion`、`this._threeJsFaceCameras[2].setRotationFromQuaternion`。 源码 eyes/src/engine/components/DynamicEnvironmentMapComponent.js:42；参数 ()。
- `_setupFaceCameras()`：【结构证据】调用 `i.set`、`matrix4.set`、`new PioneerPublicApi.THREE.Matrix4`、`new PioneerPublicApi.THREE.PerspectiveCamera`、`new PioneerPublicApi.THREE.WebGLRenderTarget`、`perspectiveCamera.layers.set`。 源码 eyes/src/engine/components/DynamicEnvironmentMapComponent.js:66；参数 ()。
- `_updateProjectionMatrix()`：【结构证据】返回 `void`；调用 `t.getAutoNearDistance`、`this.getEntity`、`this.getEntity().getComponent`。 源码 eyes/src/engine/components/DynamicEnvironmentMapComponent.js:84；参数 ()。
- `_setupQuad()`：【结构证据】写入 `_threeJsQuad`、`_threeJsQuad.frustumCulled`；调用 `bufferGeometry.setAttribute`、`bufferGeometry.setIndex`、`n.textures.value.push`、`new Float32Array`、`new PioneerPublicApi.THREE.BufferAttribute`、`new PioneerPublicApi.THREE.BufferGeometry`。 源码 eyes/src/engine/components/DynamicEnvironmentMapComponent.js:97；参数 ()。

### `eyes/src/engine/components/FrustumComponent.js`

依据相机/视场参数构造可视化视锥，提供观察方向和覆盖范围辅助图形。

- 证据：`import ../pioneer/index.js`。
- 证据：`FrustumComponent extends Pioneer.BaseComponent @3`。

#### FrustumComponent

依据相机/视场参数构造可视化视锥，提供观察方向和覆盖范围辅助图形。 继承：`Pioneer.BaseComponent`。源码 [eyes/src/engine/components/FrustumComponent.js:3](../../eyes/src/engine/components/FrustumComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_color`、`_direction`、`_farBase`、`_frustumType`、`_hFOVRad`、`_hiddenPyramidEdges`、`_intersectionEntities`、`_keyframes`；调用 `new Pioneer.Color`、`new Pioneer.Vector2`、`new Pioneer.Vector3`、`super`。 源码 eyes/src/engine/components/FrustumComponent.js:4；参数 (t, e)。
- `getFrustumType()`：【结构证据】返回 `this._frustumType`。 源码 eyes/src/engine/components/FrustumComponent.js:26；参数 ()。
- `setFrustumType(frustumType)`：【结构证据】写入 `_frustumType`。 源码 eyes/src/engine/components/FrustumComponent.js:29；参数 (frustumType)。
- `getIntersectionEntities()`：【结构证据】返回 `this._intersectionEntities`。 源码 eyes/src/engine/components/FrustumComponent.js:32；参数 ()。
- `setIntersectionEntities(intersectionEntities)`：【结构证据】写入 `_intersectionEntities`。 源码 eyes/src/engine/components/FrustumComponent.js:35；参数 (intersectionEntities)。
- `getHorizontalFOV()`：【结构证据】返回 `this._hFOVRad`。 源码 eyes/src/engine/components/FrustumComponent.js:38；参数 ()。
- `getVerticalFOV()`：【结构证据】返回 `this._vFOVRad`。 源码 eyes/src/engine/components/FrustumComponent.js:41；参数 ()。
- `setFOVRadians(hFOVRad, vFOVRad=hFOVRad)`：【结构证据】写入 `_hFOVRad`、`_vFOVRad`；调用 `this._farBaseFromLengthAndFOV`。 源码 eyes/src/engine/components/FrustumComponent.js:44；参数 (hFOVRad, vFOVRad=hFOVRad)。
- `setFOVDegrees(t, e=t)`：【结构证据】调用 `Pioneer.MathUtils.degToRad`、`this.setFOVRadians`。 源码 eyes/src/engine/components/FrustumComponent.js:49；参数 (t, e=t)。
- `getLength()`：【结构证据】返回 `this._length`。 源码 eyes/src/engine/components/FrustumComponent.js:52；参数 ()。
- `setLength(length)`：【结构证据】写入 `_length`；调用 `this.setFOVRadians`。 源码 eyes/src/engine/components/FrustumComponent.js:55；参数 (length)。
- `getNearBase()`：【结构证据】返回 `this._nearBase`。 源码 eyes/src/engine/components/FrustumComponent.js:59；参数 ()。
- `setNearBase(t, e=t)`：【结构证据】调用 `this._nearBase.set`、`this._updateFOVFromBases`。 源码 eyes/src/engine/components/FrustumComponent.js:62；参数 (t, e=t)。
- `getFarBase()`：【结构证据】返回 `this._farBase`。 源码 eyes/src/engine/components/FrustumComponent.js:66；参数 ()。
- `setFarBase(t, e=t)`：【结构证据】调用 `this._farBase.set`、`this._updateFOVFromBases`。 源码 eyes/src/engine/components/FrustumComponent.js:69；参数 (t, e=t)。
- `getColor()`：【结构证据】返回 `this._color`。 源码 eyes/src/engine/components/FrustumComponent.js:73；参数 ()。
- `setColor(t)`：【结构证据】调用 `this._color.copy`。 源码 eyes/src/engine/components/FrustumComponent.js:76；参数 (t)。
- `getOriginOffset()`：【结构证据】返回 `this._originOffset`。 源码 eyes/src/engine/components/FrustumComponent.js:79；参数 ()。
- `setOriginOffset(t)`：【结构证据】调用 `this._originOffset.copy`。 源码 eyes/src/engine/components/FrustumComponent.js:82；参数 (t)。
- `getDirection()`：【结构证据】返回 `this._direction`。 源码 eyes/src/engine/components/FrustumComponent.js:85；参数 ()。
- `setDirection(t)`：【结构证据】调用 `this._direction.normalize`。 源码 eyes/src/engine/components/FrustumComponent.js:88；参数 (t)。
- `getSpinAngle()`：【结构证据】返回 `this._spinAngle`。 源码 eyes/src/engine/components/FrustumComponent.js:91；参数 ()。
- `setSpinAngle(spinAngle)`：【结构证据】写入 `_spinAngle`。 源码 eyes/src/engine/components/FrustumComponent.js:94；参数 (spinAngle)。
- `getNumberOfCirclePoints()`：【结构证据】返回 `this._numberOfCirclePoints`。 源码 eyes/src/engine/components/FrustumComponent.js:97；参数 ()。
- `setNumberOfCirclePoints(numberOfCirclePoints)`：【结构证据】写入 `_numberOfCirclePoints`。 源码 eyes/src/engine/components/FrustumComponent.js:100；参数 (numberOfCirclePoints)。
- `getNumConeLines()`：【结构证据】返回 `this._numConeLines`。 源码 eyes/src/engine/components/FrustumComponent.js:103；参数 ()。
- `setNumConeLines(numConeLines)`：【结构证据】写入 `_numConeLines`。 源码 eyes/src/engine/components/FrustumComponent.js:106；参数 (numConeLines)。
- `getHiddenPyramidEdges()`：【结构证据】返回 `this._hiddenPyramidEdges`。 源码 eyes/src/engine/components/FrustumComponent.js:109；参数 ()。
- `setHiddenPyramidEdges(hiddenPyramidEdges)`：【结构证据】写入 `_hiddenPyramidEdges`。 源码 eyes/src/engine/components/FrustumComponent.js:112；参数 (hiddenPyramidEdges)。
- `getRelativeToEntityOrientation()`：【结构证据】返回 `this._relativeToEntityOrientation`。 源码 eyes/src/engine/components/FrustumComponent.js:115；参数 ()。
- `getKeyframes()`：【结构证据】返回 `this._keyframes`。 源码 eyes/src/engine/components/FrustumComponent.js:118；参数 ()。
- `setKeyframes(keyframes)`：【结构证据】写入 `_keyframes`；调用 `this._updateMesh`。 源码 eyes/src/engine/components/FrustumComponent.js:121；参数 (keyframes)。
- `getUseKeyframes()`：【结构证据】返回 `this._useKeyframes`。 源码 eyes/src/engine/components/FrustumComponent.js:125；参数 ()。
- `setUseKeyframes(useKeyframes)`：【结构证据】写入 `_useKeyframes`；调用 `this._updateMesh`。 源码 eyes/src/engine/components/FrustumComponent.js:128；参数 (useKeyframes)。
- `setRelativeToEntityOrientation(relativeToEntityOrientation)`：【结构证据】写入 `_relativeToEntityOrientation`。 源码 eyes/src/engine/components/FrustumComponent.js:132；参数 (relativeToEntityOrientation)。
- `_farBaseFromLengthAndFOV(t, e, i, s)`：【结构证据】调用 `Math.tan`、`t.set`。 源码 eyes/src/engine/components/FrustumComponent.js:135；参数 (t, e, i, s)。
- `_updateFOVFromBases()`：【结构证据】写入 `_hFOVRad`、`_vFOVRad`；调用 `Math.atan`、`Math.tan`。 源码 eyes/src/engine/components/FrustumComponent.js:139；参数 ()。
- `__loadResources()`：【结构证据】写入 `_lineMesh`；调用 `new Pioneer.LineMesh`、`this._updateMesh`。 源码 eyes/src/engine/components/FrustumComponent.js:146；参数 ()。
- `__unloadResources()`：【结构证据】写入 `_lineMesh`；调用 `Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials`。 源码 eyes/src/engine/components/FrustumComponent.js:150；参数 ()。
- `__prepareForRender(t)`：【结构证据】调用 `Pioneer.ThreeJsHelper.setPositionToEntity`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`e.rotate`、`t.rotate`、`this._lineMesh.prepareForRender`。 源码 eyes/src/engine/components/FrustumComponent.js:154；参数 (t)。
- `_updateMesh()`：【结构证据】返回 `void` 或 `void this._updateLineMesh(t)`；调用 `Math.cos`、`Math.min`、`Math.sin`、`Pioneer.Geometry.getLineSphereIntersectionWithLineStartAtOrigin`、`Pioneer.Interval.pool.get`、`Pioneer.Interval.pool.release`。 源码 eyes/src/engine/components/FrustumComponent.js:168；参数 ()。
- `_calcPoint(t, e, i, n, o, r, a)`：【结构证据】返回 `new Pioneer.Vector3(t.x+l*e.x+c*i.x,t.y+l*e.y+c*i.y,t.z+l*e.z+c*i.z)`；调用 `new Pioneer.Vector3`。 源码 eyes/src/engine/components/FrustumComponent.js:274；参数 (t, e, i, n, o, r, a)。
- `_updateLineMesh(t)`：【结构证据】返回 `void`；调用 `e.push`、`i.push`、`this._lineMesh.setColors`、`this._lineMesh.setPositions`、`this._lineMesh.setWidths`。 源码 eyes/src/engine/components/FrustumComponent.js:279；参数 (t)。

### `eyes/src/engine/components/GizmoComponent.js`

以 Three.js 网格/线绘制实体坐标辅助标记。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`GizmoComponent extends PioneerPublicApi.BaseComponent @3`。

#### GizmoComponent

以 Three.js 网格/线绘制实体坐标辅助标记。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/GizmoComponent.js:3](../../eyes/src/engine/components/GizmoComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_joint`、`_jointObject`、`_lineMesh`、`_model`、`_relativeToEntity`、`_size`；调用 `e.getExtentsRadius`、`super`、`this.__setRadius`、`this.__setUsesEntityOrientation`。 源码 eyes/src/engine/components/GizmoComponent.js:4；参数 (t, e)。
- `getSize()`：【结构证据】返回 `void 0!==this._size?this._size:Math.max(1e-4,2*this.getEntity().getExtentsRadius())`；调用 `Math.max`、`this.getEntity`、`this.getEntity().getExtentsRadius`。 源码 eyes/src/engine/components/GizmoComponent.js:15；参数 ()。
- `setSize(size)`：【结构证据】写入 `_size`；调用 `this.__setRadius`、`this.getSize`。 源码 eyes/src/engine/components/GizmoComponent.js:18；参数 (size)。
- `isRelativeToEntity()`：【结构证据】返回 `this._relativeToEntity`。 源码 eyes/src/engine/components/GizmoComponent.js:22；参数 ()。
- `setRelativeToEntity(relativeToEntity)`：【结构证据】写入 `_relativeToEntity`；调用 `this.__setUsesEntityOrientation`。 源码 eyes/src/engine/components/GizmoComponent.js:25；参数 (relativeToEntity)。
- `setJoint(joint, model)`：【结构证据】写入 `_joint`、`_model`；调用 `this.getEntity`、`this.getEntity().getComponent`。 源码 eyes/src/engine/components/GizmoComponent.js:29；参数 (joint, model)。
- `__prepareForRender(t)`：【结构证据】写入 `_jointObject`；返回 `void`；调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.ThreeJsHelper.setOrientation`、`PioneerPublicApi.ThreeJsHelper.setOrientationToEntity`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`PioneerPublicApi.ThreeJsHelper.setScale`。 源码 eyes/src/engine/components/GizmoComponent.js:35；参数 (t)。
- `__loadResources()`：【结构证据】写入 `_lineMesh`；调用 `e.push`、`i.push`、`new PioneerPublicApi.Color`、`new PioneerPublicApi.LineMesh`、`new PioneerPublicApi.Vector3`、`t.push`。 源码 eyes/src/engine/components/GizmoComponent.js:60；参数 ()。
- `__unloadResources()`：【结构证据】写入 `_lineMesh`；调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`。 源码 eyes/src/engine/components/GizmoComponent.js:87；参数 ()。

### `eyes/src/engine/components/IndicatorComponent.js`

在视口边缘/屏幕位置显示目标指示器，约束位置并处理遮挡与边距。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`IndicatorComponent extends PioneerPublicApi.BaseComponent @3`。

#### IndicatorComponent

在视口边缘/屏幕位置显示目标指示器，约束位置并处理遮挡与边距。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/IndicatorComponent.js:3](../../eyes/src/engine/components/IndicatorComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_activeCamera`、`_arrowClass`、`_bounds`、`_currentHTML`、`_div`、`_div.style.position`、`_div.style.translate`、`_hiddenClass`；调用 `document.createElement`、`new PioneerPublicApi.EntityRef`、`new PioneerPublicApi.Rect`、`super`、`this.__setRadius`、`this.getEntity`。 源码 eyes/src/engine/components/IndicatorComponent.js:4；参数 (t, e)。
- `getDiv()`：【结构证据】返回 `this._div`。 源码 eyes/src/engine/components/IndicatorComponent.js:23；参数 ()。
- `getActiveCamera()`：【结构证据】返回 `this._activeCamera`。 源码 eyes/src/engine/components/IndicatorComponent.js:26；参数 ()。
- `setActiveCamera(activeCamera)`：【结构证据】写入 `_activeCamera`；调用 `this.resetResources`。 源码 eyes/src/engine/components/IndicatorComponent.js:29；参数 (activeCamera)。
- `getBounds()`：【结构证据】返回 `this._bounds`。 源码 eyes/src/engine/components/IndicatorComponent.js:33；参数 ()。
- `getHiddenClass()`：【结构证据】返回 `this._hiddenClass`。 源码 eyes/src/engine/components/IndicatorComponent.js:36；参数 ()。
- `setHiddenClass(hiddenClass)`：【结构证据】写入 `_hiddenClass`；调用 `this._div.classList.add`、`this._div.classList.contains`、`this._div.classList.remove`。 源码 eyes/src/engine/components/IndicatorComponent.js:39；参数 (hiddenClass)。
- `getArrowClass()`：【结构证据】返回 `this._arrowClass`。 源码 eyes/src/engine/components/IndicatorComponent.js:45；参数 ()。
- `setArrowClass(arrowClass)`：【结构证据】写入 `_arrowClass`；调用 `this._div.classList.remove`。 源码 eyes/src/engine/components/IndicatorComponent.js:48；参数 (arrowClass)。
- `setPadding(t, e, i, s)`：【结构证据】写入 `_padding.bottom`、`_padding.left`、`_padding.right`、`_padding.top`。 源码 eyes/src/engine/components/IndicatorComponent.js:53；参数 (t, e, i, s)。
- `getSourceEntity()`：【结构证据】返回 `""!==this._sourceEntity.getName()?this._sourceEntity.getName():void 0`；调用 `this._sourceEntity.getName`。 源码 eyes/src/engine/components/IndicatorComponent.js:59；参数 ()。
- `setSourceEntity(t)`：【结构证据】调用 `this._sourceEntity.setName`。 源码 eyes/src/engine/components/IndicatorComponent.js:62；参数 (t)。
- `__unloadResources()`：【结构证据】调用 `this._div.parentNode.removeChild`。 源码 eyes/src/engine/components/IndicatorComponent.js:65；参数 ()。
- `__prepareForRender(t)`：【结构证据】写入 `_activeCamera`、`_bounds.origin.x`、`_bounds.origin.y`、`_bounds.size.x`、`_bounds.size.y`、`_currentHTML`、`_div.style.rotate`、`_div.style.transformOrigin`；返回 `void` 或 `void this._div.remove()`；调用 `Math.atan`、`Math.cos`、`Math.floor`、`Math.min`、`Math.round`、`Math.sin`。 源码 eyes/src/engine/components/IndicatorComponent.js:68；参数 (t)。
- `__setVisible(t)`：【结构证据】写入 `_div.style.translate`；调用 `Math.round`、`t.getBounds`、`this._activeCamera.getViewport`。 源码 eyes/src/engine/components/IndicatorComponent.js:133；参数 (t)。
- `_getPixelSpaceFromFrameSpace(t, e, i, n)`：【结构证据】调用 `Math.tan`、`PioneerPublicApi.Vector2.pool.get`、`PioneerPublicApi.Vector2.pool.release`、`n.getHorizontalFieldOfView`、`n.getVerticalFieldOfView`。 源码 eyes/src/engine/components/IndicatorComponent.js:142；参数 (t, e, i, n)。

### `eyes/src/engine/components/LabelComponent.js`

将文字绘制到画布纹理并生成相机朝向的标签平面。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`LabelComponent extends PioneerPublicApi.BaseComponent @3`。

#### LabelComponent

将文字绘制到画布纹理并生成相机朝向的标签平面。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/LabelComponent.js:3](../../eyes/src/engine/components/LabelComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_alignment`、`_canvas`、`_color`、`_devicePixelRatio`、`_fontFamily`、`_fontSize`、`_normalSpaceBounds`、`_pixelOffset`；调用 `e.getScene`、`e.getScene().getEngine`、`e.getScene().getEngine().getConfig`、`e.getScene().getEngine().getConfig().getValue`、`new Map`、`new PioneerPublicApi.Color`。 源码 eyes/src/engine/components/LabelComponent.js:4；参数 (t, e)。
- `getText()`：【结构证据】返回 `this._text`。 源码 eyes/src/engine/components/LabelComponent.js:23；参数 ()。
- `setText(text)`：【结构证据】写入 `_text`；调用 `this._updateText`。 源码 eyes/src/engine/components/LabelComponent.js:26；参数 (text)。
- `getFontFamily()`：【结构证据】返回 `this._fontFamily`。 源码 eyes/src/engine/components/LabelComponent.js:30；参数 ()。
- `setFontFamily(fontFamily)`：【结构证据】写入 `_fontFamily`；调用 `this._updateText`。 源码 eyes/src/engine/components/LabelComponent.js:33；参数 (fontFamily)。
- `getFontSize()`：【结构证据】返回 `this._fontSize`。 源码 eyes/src/engine/components/LabelComponent.js:37；参数 ()。
- `setFontSize(fontSize)`：【结构证据】写入 `_fontSize`；调用 `this._updateText`。 源码 eyes/src/engine/components/LabelComponent.js:40；参数 (fontSize)。
- `getColor()`：【结构证据】返回 `this._color`。 源码 eyes/src/engine/components/LabelComponent.js:44；参数 ()。
- `setColor(t)`：【结构证据】调用 `this._color.copy`。 源码 eyes/src/engine/components/LabelComponent.js:47；参数 (t)。
- `getAlignment()`：【结构证据】返回 `this._alignment`。 源码 eyes/src/engine/components/LabelComponent.js:50；参数 ()。
- `setAlignment(t)`：【结构证据】调用 `this._alignment.copy`、`this._updateText`。 源码 eyes/src/engine/components/LabelComponent.js:53；参数 (t)。
- `getPixelOffset()`：【结构证据】返回 `this._pixelOffset`。 源码 eyes/src/engine/components/LabelComponent.js:57；参数 ()。
- `setPixelOffset(t)`：【结构证据】调用 `this._pixelOffset.copy`。 源码 eyes/src/engine/components/LabelComponent.js:60；参数 (t)。
- `getNormalSpaceBounds(t)`：【结构证据】返回 `this._normalSpaceBounds.get(t)`；调用 `this._normalSpaceBounds.get`。 源码 eyes/src/engine/components/LabelComponent.js:63；参数 (t)。
- `__prepareForRender(t)`：【结构证据】返回 `void`；调用 `Math.max`、`PioneerPublicApi.Color.pool.get`、`PioneerPublicApi.Color.pool.release`、`PioneerPublicApi.ThreeJsHelper.setOrientation`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA`。 源码 eyes/src/engine/components/LabelComponent.js:66；参数 (t)。
- `_determineComponentVisibility(t)`：【结构证据】返回 `i`；调用 `t.isPositionOccluded`、`this.getEntity`、`this.getEntity().getCameraSpacePosition`、`this.getVisibleInterval`、`this.getVisibleInterval().getFadeMultiplier`。 源码 eyes/src/engine/components/LabelComponent.js:102；参数 (t)。
- `__loadResources()`：【结构证据】写入 `_canvas`、`_canvas.height`、`_canvas.width`；调用 `LabelComponent._threeJsMaterial.clone`、`PioneerPublicApi.ThreeJsHelper.createGeometry`、`PioneerPublicApi.ThreeJsHelper.createMeshObjectGivenGeometry`、`PioneerPublicApi.ThreeJsHelper.setIndices`、`PioneerPublicApi.ThreeJsHelper.setOverlay`、`PioneerPublicApi.ThreeJsHelper.setTransparent`。 源码 eyes/src/engine/components/LabelComponent.js:109；参数 ()。
- `__unloadResources()`：【结构证据】写入 `_canvas`；调用 `PioneerPublicApi.ThreeJsHelper.destroyGeometry`、`PioneerPublicApi.ThreeJsHelper.destroyMaterial`、`t.parent.remove`、`this.getThreeJsMaterials`、`this.getThreeJsObjects`。 源码 eyes/src/engine/components/LabelComponent.js:146；参数 ()。
- `_updateText()`：【结构证据】写入 `_canvas.height`、`_canvas.style.height`、`_canvas.style.width`、`_canvas.width`、`_devicePixelRatio`；返回 `void`；调用 `PioneerPublicApi.MathUtils.ceilPow2`、`PioneerPublicApi.MathUtils.clamp01`、`PioneerPublicApi.ThreeJsHelper.loadTextureFromCanvas`、`PioneerPublicApi.ThreeJsHelper.setUniformTexture`、`t.clearRect`、`t.fillText`。 源码 eyes/src/engine/components/LabelComponent.js:154；参数 ()。

### `eyes/src/engine/components/LightSourceComponent.js`

向所属 Scene 注册实体光源，维护颜色/强度等供材质统一采样的参数。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`LightSourceComponent extends PioneerPublicApi.BaseComponent @3`。

#### LightSourceComponent

向所属 Scene 注册实体光源，维护颜色/强度等供材质统一采样的参数。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/LightSourceComponent.js:3](../../eyes/src/engine/components/LightSourceComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_absoluteMagnitude`、`_color`；调用 `new PioneerPublicApi.Color`、`super`、`this.__setRadius`。 源码 eyes/src/engine/components/LightSourceComponent.js:4；参数 (t, e)。
- `getColor()`：【结构证据】返回 `this._color`。 源码 eyes/src/engine/components/LightSourceComponent.js:10；参数 ()。
- `setColor(t)`：【结构证据】调用 `this._color.copy`。 源码 eyes/src/engine/components/LightSourceComponent.js:13；参数 (t)。
- `getAbsoluteMagnitude()`：【结构证据】返回 `this._absoluteMagnitude`。 源码 eyes/src/engine/components/LightSourceComponent.js:16；参数 ()。
- `setAbsoluteMagnitude(absoluteMagnitude)`：【结构证据】写入 `_absoluteMagnitude`。 源码 eyes/src/engine/components/LightSourceComponent.js:19；参数 (absoluteMagnitude)。
- `__loadResources()`：【结构证据】调用 `this.getClassIndex`、`this.getEntity`、`this.getEntity().getName`、`this.getEntity().getScene`、`this.getEntity().getScene().__addLightSource`。 源码 eyes/src/engine/components/LightSourceComponent.js:22；参数 ()。
- `__unloadResources()`：【结构证据】调用 `this.getClassIndex`、`this.getEntity`、`this.getEntity().getName`、`this.getEntity().getScene`、`this.getEntity().getScene().__removeLightSource`。 源码 eyes/src/engine/components/LightSourceComponent.js:25；参数 ()。
- `__setClassIndex(t)`：【结构证据】调用 `super.__setClassIndex`、`this.getClassIndex`、`this.getEntity`、`this.getEntity().getName`、`this.getEntity().getScene`、`this.getEntity().getScene().__addLightSource`。 源码 eyes/src/engine/components/LightSourceComponent.js:28；参数 (t)。

### `eyes/src/engine/components/ModelComponent.js`

解析 GLTF/GLB 模型，接入资源引用计数和 Draco/KTX2 解码，转换 PBR 材质并管理动画与环境纹理。

- 证据：`import ../../runtime/decoder-paths.js`。
- 证据：`import ../pioneer/public-api.js`。
- 证据：`import ../../vendor/modules/GLTFLoader.js`。
- 证据：`import ../../vendor/modules/DRACOLoader.js`。
- 证据：`ModelComponent extends PioneerPublicApi.BaseComponent @7`。
- 证据：`CustomDracoLoader extends DRACOLoader.DRACOLoader @306`。
- 证据：`CustomThreeJsTextureLoader extends PioneerPublicApi.THREE.Loader @324`。
- 证据：`CustomThreeJsKTX2Loader extends KTX2Loader.KTX2Loader @353`。

#### ModelComponent

解析 GLTF/GLB 模型，接入资源引用计数和 Draco/KTX2 解码，转换 PBR 材质并管理动画与环境纹理。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/ModelComponent.js:7](../../eyes/src/engine/components/ModelComponent.js#L7)。

- `constructor(t, e)`：【结构证据】写入 `_dynamicEnvironmentMapComponent`、`_environmentCubemap`、`_environmentCubemapUrl`、`_environmentCylindricalUrl`、`_environmentIntensity`、`_hiddenObjects`、`_modelRadius`、`_onConfigChanged`；调用 `new Map`、`new PioneerPublicApi.FastMap`、`new PioneerPublicApi.Quaternion`、`new PioneerPublicApi.Vector3`、`super`、`this.__setRadius`。 源码 eyes/src/engine/components/ModelComponent.js:8；参数 (t, e)。
- `getUrl()`：【结构证据】返回 `this._url`。 源码 eyes/src/engine/components/ModelComponent.js:28；参数 ()。
- `setUrl(url)`：【结构证据】写入 `_modelRadius`、`_url`；调用 `this.resetResources`。 源码 eyes/src/engine/components/ModelComponent.js:31；参数 (url)。
- `setHiddenObject(t, e)`：【结构证据】调用 `this._hiddenObjects.delete`、`this._hiddenObjects.has`、`this._hiddenObjects.set`。 源码 eyes/src/engine/components/ModelComponent.js:36；参数 (t, e)。
- `getTranslation()`：【结构证据】返回 `this._translation`。 源码 eyes/src/engine/components/ModelComponent.js:39；参数 ()。
- `setTranslation(t)`：【结构证据】调用 `this._translation.copy`。 源码 eyes/src/engine/components/ModelComponent.js:42；参数 (t)。
- `getScale()`：【结构证据】返回 `this._scale`。 源码 eyes/src/engine/components/ModelComponent.js:45；参数 ()。
- `setScale(t)`：【结构证据】调用 `Math.max`、`PioneerPublicApi.ThreeJsHelper.setScale`、`isNaN`、`this.__setRadius`、`this._scale.copy`、`this._scale.set`。 源码 eyes/src/engine/components/ModelComponent.js:48；参数 (t)。
- `getRotation()`：【结构证据】返回 `this._rotation`。 源码 eyes/src/engine/components/ModelComponent.js:53；参数 ()。
- `setRotation(t)`：【结构证据】调用 `this._rotation.copy`。 源码 eyes/src/engine/components/ModelComponent.js:56；参数 (t)。
- `getEnvironmentCubemapUrl()`：【结构证据】返回 `this._environmentCubemapUrl`。 源码 eyes/src/engine/components/ModelComponent.js:59；参数 ()。
- `setEnvironmentCubemapUrl(environmentCubemapUrl)`：【结构证据】写入 `_environmentCubemapUrl`。 源码 eyes/src/engine/components/ModelComponent.js:62；参数 (environmentCubemapUrl)。
- `getEnvironmentIntensity()`：【结构证据】返回 `this._environmentIntensity`。 源码 eyes/src/engine/components/ModelComponent.js:65；参数 ()。
- `setEnvironmentIntensity(environmentIntensity)`：【结构证据】写入 `_environmentIntensity`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/ModelComponent.js:68；参数 (environmentIntensity)。
- `getEnvironmentCylindricalUrl()`：【结构证据】返回 `this._environmentCylindricalUrl`。 源码 eyes/src/engine/components/ModelComponent.js:72；参数 ()。
- `setEnvironmentCylindricalUrl(environmentCylindricalUrl)`：【结构证据】写入 `_environmentCylindricalUrl`。 源码 eyes/src/engine/components/ModelComponent.js:75；参数 (environmentCylindricalUrl)。
- `setDynamicEnvironmentMapComponent(dynamicEnvironmentMapComponent)`：【结构证据】写入 `_dynamicEnvironmentMapComponent`、`_environmentCubemap`；调用 `PioneerPublicApi.ThreeJsHelper.destroyTexture`、`PioneerPublicApi.ThreeJsHelper.setDefine`、`PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`PioneerPublicApi.ThreeJsHelper.setUniformTexture`、`dynamicEnvironmentMapComponent.getFaceSize`、`this._dynamicEnvironmentMapComponent.getTexture`。 源码 eyes/src/engine/components/ModelComponent.js:78；参数 (dynamicEnvironmentMapComponent)。
- `setURLReferenceMap(t)`：【结构证据】调用 `this._urlReferenceMap.clear`、`this._urlReferenceMap.set`。 源码 eyes/src/engine/components/ModelComponent.js:86；参数 (t)。
- `getAnimationClip(t)`：【结构证据】返回 `this._threeJsAnimationClips.get(t)??null`；调用 `this._threeJsAnimationClips.get`。 源码 eyes/src/engine/components/ModelComponent.js:90；参数 (t)。
- `getMaterial(t)`：【结构证据】返回 `s` 或 `null`；调用 `this.getThreeJsMaterials`。 源码 eyes/src/engine/components/ModelComponent.js:93；参数 (t)。
- `updateMaterial(t, e)`：【结构证据】调用 `i.push`、`i.splice`、`new Error`、`this.getThreeJsMaterials`、`this.getThreeJsObjects`；含显式错误分支。 源码 eyes/src/engine/components/ModelComponent.js:101；参数 (t, e)。
- `getNumShadowEntities()`：【结构证据】返回 `this._shadowEntities.length`。 源码 eyes/src/engine/components/ModelComponent.js:119；参数 ()。
- `getShadowEntity(t)`：【结构证据】返回 `this._shadowEntities[t]?.getName()`。 源码 eyes/src/engine/components/ModelComponent.js:122；参数 (t)。
- `setShadowEntities(t)`：【结构证据】写入 `_shadowEntities`；调用 `PioneerPublicApi.ThreeJsHelper.setDefine`、`new PioneerPublicApi.EntityRef`、`this._shadowEntities.push`、`this.getEntity`、`this.getEntity().getScene`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/ModelComponent.js:125；参数 (t)。
- `__prepareForRender(t)`：【结构证据】调用 `PioneerPublicApi.MaterialUtils.setUniforms`、`PioneerPublicApi.ThreeJsHelper.setOrientationToEntity`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`t.getViewport`、`this.__setVisible`、`this._hiddenObjects.getAt`。 源码 eyes/src/engine/components/ModelComponent.js:131；参数 (t)。
- `__loadResources()`：acquire glTF 文本或 GLB 二进制，设置 URL 重定向/纹理 handler、共享 Draco 与 KTX2 适配器；parse 后收集对象/材质/动画，清除辅助节点，换 PBR 材质并注册 gammaCorrection 监听。 源码 eyes/src/engine/components/ModelComponent.js:145；参数 ()。
- `__unloadResources()`：清空隐藏节点缓存，注销 gamma 监听，releaseAllForEntityItem，销毁环境纹理和 Three.js 对象材质。 源码 eyes/src/engine/components/ModelComponent.js:208；参数 ()。
- `_populateThreeJsObjectsAndMaterials(t)`：【结构证据】调用 `Array.isArray`、`this._populateThreeJsObjectsAndMaterials`、`this.getThreeJsMaterials`、`this.getThreeJsMaterials().push`、`this.getThreeJsObjects`、`this.getThreeJsObjects().push`。 源码 eyes/src/engine/components/ModelComponent.js:215；参数 (t)。
- `_clean()`：【结构证据】调用 `i.geometry.deleteAttribute`、`i.name.match`、`i.name.startsWith`、`i.parent.remove`、`this.getThreeJsObjects`、`this.getThreeJsObjects().splice`。 源码 eyes/src/engine/components/ModelComponent.js:230；参数 ()。
- `_onConfigChanged()`：【结构证据】调用 `this._updateMaterials`。 源码 eyes/src/engine/components/ModelComponent.js:242；参数 ()。
- `_updateMaterials()`：【结构证据】写入 `getThreeJsMaterials()[t]`；调用 `Array.isArray`、`PioneerPublicApi.ThreeJsHelper.computeTangents`、`PioneerPublicApi.ThreeJsHelper.destroyMaterial`、`t.geometry.getAttribute`、`this._getNewPioneerMaterial`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/ModelComponent.js:245；参数 ()。
- `_getNewPioneerMaterial(t)`：把标准材质的贴图/颜色/粗糙度/金属度迁移到 Pioneer uniforms，把原贴图字段设 null 防止随旧材质销毁；接入动态或静态环境与阴影。 源码 eyes/src/engine/components/ModelComponent.js:261；参数 (t)。

#### CustomDracoLoader

把 Draco 二进制加载接入组件所有权和 ResourceManager 的适配器。 继承：`DRACOLoader.DRACOLoader`。源码 [eyes/src/engine/components/ModelComponent.js:306](../../eyes/src/engine/components/ModelComponent.js#L306)。

- `constructor(modelComponent, priority, loadState)`：【结构证据】写入 `_loadState`、`_modelComponent`、`_priority`；调用 `super`。 源码 eyes/src/engine/components/ModelComponent.js:307；参数 (modelComponent, priority, loadState)。
- `load(t, e, i, n)`：用首次构造时持有的 modelComponent 和 priority 取得 binary，再调用 Draco.parse；错误写入捕获的 loadState。静态共享实例可能继续使用首次模型所有权。 源码 eyes/src/engine/components/ModelComponent.js:313；参数 (t, e, i, n)。

#### CustomThreeJsTextureLoader

把 GLTF 依赖纹理加载接入 URL 映射和 ResourceManager 的适配器。 继承：`PioneerPublicApi.THREE.Loader`。源码 [eyes/src/engine/components/ModelComponent.js:324](../../eyes/src/engine/components/ModelComponent.js#L324)。

- `constructor(modelComponent, urlReferenceMap, downloadPriority, loadState)`：【结构证据】写入 `_downloadPriority`、`_loadState`、`_modelComponent`、`_urlReferenceMap`；调用 `super`。 源码 eyes/src/engine/components/ModelComponent.js:325；参数 (modelComponent, urlReferenceMap, downloadPriority, loadState)。
- `load(t, e, i, n)`：以原文件 basename 查 URL 映射；映射后若扩展名消失则从原名保留 extension 提示，交由 ResourceManager 取得 texture 并回调。 源码 eyes/src/engine/components/ModelComponent.js:332；参数 (t, e, i, n)。

#### CustomThreeJsKTX2Loader

将 KTX2Loader.load 转发到自定义纹理资源通道。 继承：`KTX2Loader.KTX2Loader`。源码 [eyes/src/engine/components/ModelComponent.js:353](../../eyes/src/engine/components/ModelComponent.js#L353)。

- `constructor(customThreeJsTextureLoader)`：【结构证据】写入 `_customThreeJsTextureLoader`；调用 `super`。 源码 eyes/src/engine/components/ModelComponent.js:354；参数 (customThreeJsTextureLoader)。
- `load(t, e, i, s)`：【结构证据】调用 `this._customThreeJsTextureLoader.load`。 源码 eyes/src/engine/components/ModelComponent.js:358；参数 (t, e, i, s)。

注意：静态 _dracoLoader 保存首次构造的 modelComponent/priority/loadState，后续模型复用时所有权与错误状态可能错误。 environmentCylindricalUrl 非空分支却将 _environmentCubemapUrl 传给 loadTexture；源码可见疑似错字段。 updateMaterial 遍历 mesh 后只重新赋值局部变量 n=e，没有写 o.material；替换效果可疑，需运行验证。

### `eyes/src/engine/components/OrbitLineComponent.js`

根据动力学控制器的轨道元素生成环形轨道线，按显示区间设置透明度。

- 证据：`import ../pioneer/index.js`。
- 证据：`OrbitLineComponent extends Pioneer.BaseComponent @3`。

#### OrbitLineComponent

根据动力学控制器的轨道元素生成环形轨道线，按显示区间设置透明度。 继承：`Pioneer.BaseComponent`。源码 [eyes/src/engine/components/OrbitLineComponent.js:3](../../eyes/src/engine/components/OrbitLineComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_color`、`_colors`、`_farSideAlphaFade`、`_glowWidth`、`_lineMesh`、`_lineWidth`、`_positions`、`_widths`；调用 `new Pioneer.Color`、`super`、`this.__setRadius`。 源码 eyes/src/engine/components/OrbitLineComponent.js:4；参数 (t, e)。
- `getColor()`：【结构证据】返回 `this._color`。 源码 eyes/src/engine/components/OrbitLineComponent.js:16；参数 ()。
- `setColor(t)`：【结构证据】调用 `this._color.copy`、`this._colors[t].copy`、`this._lineMesh.setColors`。 源码 eyes/src/engine/components/OrbitLineComponent.js:19；参数 (t)。
- `getFarSideAlphaFade()`：【结构证据】返回 `this._farSideAlphaFade`。 源码 eyes/src/engine/components/OrbitLineComponent.js:25；参数 ()。
- `setFarSideAlphaFade(farSideAlphaFade)`：【结构证据】写入 `_farSideAlphaFade`。 源码 eyes/src/engine/components/OrbitLineComponent.js:28；参数 (farSideAlphaFade)。
- `getLineWidth()`：【结构证据】返回 `this._lineWidth`。 源码 eyes/src/engine/components/OrbitLineComponent.js:31；参数 ()。
- `setLineWidth(lineWidth)`：【结构证据】写入 `_lineWidth`、`_widths[t]`；调用 `this._lineMesh.setWidths`。 源码 eyes/src/engine/components/OrbitLineComponent.js:34；参数 (lineWidth)。
- `setGlowWidth(glowWidth)`：【结构证据】写入 `_glowWidth`；调用 `Pioneer.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/OrbitLineComponent.js:40；参数 (glowWidth)。
- `__prepareForRender(t)`：【结构证据】调用 `Pioneer.ThreeJsHelper.setPositionToEntity`、`this._lineMesh.prepareForRender`、`this._updateMesh`、`this.getEntity`、`this.getThreeJsObjects`。 源码 eyes/src/engine/components/OrbitLineComponent.js:44；参数 (t)。
- `__loadResources()`：【结构证据】写入 `_lineMesh`；调用 `new Pioneer.Color`、`new Pioneer.LineMesh`、`new Pioneer.Vector3`、`this._colors.push`、`this._colors[t].copy`、`this._lineMesh.setColors`。 源码 eyes/src/engine/components/OrbitLineComponent.js:47；参数 ()。
- `__unloadResources()`：【结构证据】写入 `_colors`、`_lineMesh`、`_positions`、`_widths`；调用 `Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials`。 源码 eyes/src/engine/components/OrbitLineComponent.js:59；参数 ()。
- `_updateMesh()`：【结构证据】写入 `_colors[this._colors.length-1].a`、`_colors[this._colors.length-2].a`；返回 `void`；调用 `OrbitLineComponent.orbitalElements.getEccentricAnomalyFromTrueAnomaly`、`OrbitLineComponent.orbitalElements.getMeanAnomalyFromEccentricAnomaly`、`OrbitLineComponent.orbitalElements.getTrueAnomalyFromPosition`、`OrbitLineComponent.orbitalElements.project`、`OrbitLineComponent.orbitalElements.setFromPositionAndVelocity`、`Pioneer.MathUtils.angle`。 源码 eyes/src/engine/components/OrbitLineComponent.js:66；参数 ()。

### `eyes/src/engine/components/OrbitalParticlesComponent.js`

通过轨道元素生成并更新一组轨道粒子。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`OrbitalParticlesComponent extends PioneerPublicApi.BaseComponent @3`。

#### OrbitalParticlesComponent

通过轨道元素生成并更新一组轨道粒子。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/OrbitalParticlesComponent.js:3](../../eyes/src/engine/components/OrbitalParticlesComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_loadFunction`、`_offsetArray`、`_orbitalElementsList`、`_scaleOfParticles`、`_spriteParticles`；调用 `new Float32Array`、`super`、`this.__setRadius`、`this.getEntity`、`this.getEntity().getExtentsRadius`。 源码 eyes/src/engine/components/OrbitalParticlesComponent.js:4；参数 (t, e)。
- `getScaleOfParticles()`：【结构证据】返回 `this._scaleOfParticles`。 源码 eyes/src/engine/components/OrbitalParticlesComponent.js:13；参数 ()。
- `setScaleOfParticles(scaleOfParticles)`：【结构证据】写入 `_scaleOfParticles`；调用 `this.resetResources`。 源码 eyes/src/engine/components/OrbitalParticlesComponent.js:16；参数 (scaleOfParticles)。
- `setLoadFunction(loadFunction)`：【结构证据】写入 `_loadFunction`；调用 `this.resetResources`。 源码 eyes/src/engine/components/OrbitalParticlesComponent.js:20；参数 (loadFunction)。
- `__update()`：【结构证据】写入 `_offsetArray[3*s+0]`、`_offsetArray[3*s+1]`、`_offsetArray[3*s+2]`；返回 `void`；调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`this._orbitalElementsList[s].project`、`this._spriteParticles.setParticleOffsets`、`this.getEntity`、`this.getEntity().getScene`。 源码 eyes/src/engine/components/OrbitalParticlesComponent.js:24；参数 ()。
- `__prepareForRender(t)`：【结构证据】调用 `this._spriteParticles.prepareForRender`。 源码 eyes/src/engine/components/OrbitalParticlesComponent.js:39；参数 (t)。
- `__loadResources()`：【结构证据】写入 `_spriteParticles`；调用 `new PioneerPublicApi.SpriteParticles`、`this._initializeParticles`、`this._spriteParticles.getThreeJsMaterial`、`this._spriteParticles.getThreeJsObject`、`this.getThreeJsMaterials`、`this.getThreeJsMaterials().push`。 源码 eyes/src/engine/components/OrbitalParticlesComponent.js:42；参数 ()。
- `__unloadResources()`：【结构证据】写入 `_spriteParticles`；调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`。 源码 eyes/src/engine/components/OrbitalParticlesComponent.js:48；参数 ()。
- `_initializeParticles()`：【结构证据】写入 `_offsetArray`、`_orbitalElementsList`；返回 `void`；调用 `Math.max`、`new Float32Array`、`new PioneerPublicApi.OrbitalElements`、`orbitalElements.copy`、`this.__setRadius`、`this._loadFunction`。 源码 eyes/src/engine/components/OrbitalParticlesComponent.js:52；参数 ()。

### `eyes/src/engine/components/OrbiterLineOfSightComponent.js`

计算轨道器与地面/目标的视线几何并绘制可见性辅助图形。

- 证据：`import ../pioneer/index.js`。
- 证据：`OrbiterLineOfSightComponent extends Pioneer.BaseComponent @3`。

#### OrbiterLineOfSightComponent

计算轨道器与地面/目标的视线几何并绘制可见性辅助图形。 继承：`Pioneer.BaseComponent`。源码 [eyes/src/engine/components/OrbiterLineOfSightComponent.js:3](../../eyes/src/engine/components/OrbiterLineOfSightComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_color`、`_colors`、`_distanceThreshold`、`_ignoreDistance`、`_lineMesh`、`_positions`、`_targetA`、`_targetB`；调用 `e.getScene`、`e.getScene().getThreeJsScene`、`new Pioneer.Color`、`super`、`this.__setRadius`。 源码 eyes/src/engine/components/OrbiterLineOfSightComponent.js:4；参数 (t, e)。
- `setTargets(targetA, targetB)`：【结构证据】写入 `_targetA`、`_targetB`；调用 `this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getEntity`。 源码 eyes/src/engine/components/OrbiterLineOfSightComponent.js:22；参数 (targetA, targetB)。
- `setColor(color)`：【结构证据】写入 `_color`。 源码 eyes/src/engine/components/OrbiterLineOfSightComponent.js:28；参数 (color)。
- `setWidth(width)`：【结构证据】写入 `_width`。 源码 eyes/src/engine/components/OrbiterLineOfSightComponent.js:31；参数 (width)。
- `__loadResources()`：【结构证据】写入 `_lineMesh`；返回 `Promise.resolve()`；调用 `Promise.resolve`、`new Pioneer.LineMesh`。 源码 eyes/src/engine/components/OrbiterLineOfSightComponent.js:34；参数 ()。
- `__unloadResources()`：【结构证据】写入 `_lineMesh`；调用 `Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials`。 源码 eyes/src/engine/components/OrbiterLineOfSightComponent.js:38；参数 ()。
- `__prepareForRender(t)`：【结构证据】写入 `_color.a`、`getThreeJsObjects()[0].visible`；返回 `void(this.getThreeJsObjects().length>0&&(this.getThreeJsObjects()[0].visible=false))`；调用 `Pioneer.ThreeJsHelper.setPositionToEntity`、`t.getEntity`、`t.getEntity().getPosition`、`t.getEntity().getPosition().magnitude`、`this._lineMesh.prepareForRender`、`this._updatePoints`。 源码 eyes/src/engine/components/OrbiterLineOfSightComponent.js:42；参数 (t)。
- `_updatePoints()`：【结构证据】写入 `_colors`、`_positions`、`_widths`；调用 `Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`this._colors.push`、`this._lineMesh.setColors`、`this._lineMesh.setPositions`、`this._lineMesh.setWidths`。 源码 eyes/src/engine/components/OrbiterLineOfSightComponent.js:53；参数 ()。

### `eyes/src/engine/components/ParticleSprayComponent.js`

以发射方向、速率、寿命等参数更新喷射粒子系统。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`ParticleSprayComponent extends PioneerPublicApi.BaseComponent @3`。

#### ParticleSprayComponent

以发射方向、速率、寿命等参数更新喷射粒子系统。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/ParticleSprayComponent.js:3](../../eyes/src/engine/components/ParticleSprayComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_colorOfParticles`、`_direction`、`_length`、`_numberOfParticles`、`_originOffset`、`_particleSpacingRandom`、`_relativeToEntityOrientation`、`_sizeOfParticles`；调用 `new PioneerPublicApi.Color`、`new PioneerPublicApi.Vector3`、`super`、`this.__setRadius`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:4；参数 (t, e)。
- `getLength()`：【结构证据】返回 `this._length`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:18；参数 ()。
- `setLength(length)`：【结构证据】写入 `_length`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.__setRadius`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:21；参数 (length)。
- `getSpread()`：【结构证据】返回 `this._spread`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:27；参数 ()。
- `setSpread(spread)`：【结构证据】写入 `_spread`；调用 `PioneerPublicApi.MathUtils.degToRad`、`PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:30；参数 (spread)。
- `getNumberOfParticles()`：【结构证据】返回 `this._numberOfParticles`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:34；参数 ()。
- `setNumberOfParticles(numberOfParticles)`：【结构证据】写入 `_numberOfParticles`；调用 `this.resetResources`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:37；参数 (numberOfParticles)。
- `getSpeedOfParticles()`：【结构证据】返回 `this._speedOfParticles`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:41；参数 ()。
- `setSpeedOfParticles(speedOfParticles)`：【结构证据】写入 `_speedOfParticles`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:44；参数 (speedOfParticles)。
- `getSizeOfParticles()`：【结构证据】返回 `this._sizeOfParticles`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:48；参数 ()。
- `setSizeOfParticles(sizeOfParticles)`：【结构证据】写入 `_sizeOfParticles`；调用 `this.resetResources`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:51；参数 (sizeOfParticles)。
- `getParticleSpacingRandom()`：【结构证据】返回 `this._particleSpacingRandom`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:55；参数 ()。
- `setParticleSpacingRandom(particleSpacingRandom)`：【结构证据】写入 `_particleSpacingRandom`；调用 `this.resetResources`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:58；参数 (particleSpacingRandom)。
- `getColorOfParticles()`：【结构证据】返回 `this._colorOfParticles`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:62；参数 ()。
- `setColorOfParticles(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA`、`this._colorOfParticles.copy`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:65；参数 (t)。
- `getOriginOffset()`：【结构证据】返回 `this._originOffset`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:69；参数 ()。
- `setOriginOffset(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformVector3`、`this._originOffset.copy`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:72；参数 (t)。
- `getDirection()`：【结构证据】返回 `this._direction`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:76；参数 ()。
- `setDirection(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformVector3`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.cross`、`e.isZero`、`e.normalize`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:79；参数 (t)。
- `getRelativeToEntityOrientation()`：【结构证据】返回 `this._relativeToEntityOrientation`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:89；参数 ()。
- `setRelativeToEntityOrientation(relativeToEntityOrientation)`：【结构证据】写入 `_relativeToEntityOrientation`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:92；参数 (relativeToEntityOrientation)。
- `__prepareForRender(t)`：【结构证据】调用 `PioneerPublicApi.MathUtils.wrap`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`PioneerPublicApi.ThreeJsHelper.setUniformVector3`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:95；参数 (t)。
- `__loadResources()`：【结构证据】调用 `PioneerPublicApi.MathUtils.degToRad`、`PioneerPublicApi.ThreeJsHelper.createMeshObjectGivenGeometry`、`PioneerPublicApi.ThreeJsHelper.setOrientation`、`PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA`、`PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`PioneerPublicApi.ThreeJsHelper.setUniformVector3`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:115；参数 ()。
- `__unloadResources()`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:166；参数 ()。
- `_initializeParticles()`：【结构证据】调用 `Math.random`、`this.getThreeJsObjects`。 源码 eyes/src/engine/components/ParticleSprayComponent.js:169；参数 ()。

### `eyes/src/engine/components/RingsComponent.js`

加载行星环颜色/透明度纹理并构造环平面网格，结合光源与阴影实体着色。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`RingsComponent extends PioneerPublicApi.BaseComponent @3`。

#### RingsComponent

加载行星环颜色/透明度纹理并构造环平面网格，结合光源与阴影实体着色。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/RingsComponent.js:3](../../eyes/src/engine/components/RingsComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_bottomTextureUrl`、`_innerRadius`、`_outerRadius`、`_shadowEntities`、`_spheroidChangedCallback`、`_spheroidComponentRef`、`_topTextureUrl`；调用 `new PioneerPublicApi.ComponentRef`、`super`、`this.__setUsesEntityOrientation`、`this._spheroidChangedCallback.bind`、`this._spheroidComponentRef.setRefChangedCallback`、`this._spheroidRefChangedCallback.bind`。 源码 eyes/src/engine/components/RingsComponent.js:4；参数 (t, e)。
- `getTopTextureUrl()`：【结构证据】返回 `this._topTextureUrl`。 源码 eyes/src/engine/components/RingsComponent.js:16；参数 ()。
- `setTopTextureUrl(topTextureUrl)`：【结构证据】写入 `_topTextureUrl`；调用 `this.getEngine`、`this.getEngine().getResourceManager`、`this.getEngine().getResourceManager().acquire`、`this.getEngine().getResourceManager().acquire(this,this._topTextureUrl,"texture",-this.getEntity().getLeastCameraDepth()).then`、`this.getEngine().getResourceManager().release`、`this.getEntity`。 源码 eyes/src/engine/components/RingsComponent.js:19；参数 (topTextureUrl)。
- `getBottomTextureUrl()`：【结构证据】返回 `this._bottomTextureUrl`。 源码 eyes/src/engine/components/RingsComponent.js:27；参数 ()。
- `setBottomTextureUrl(bottomTextureUrl)`：【结构证据】写入 `_bottomTextureUrl`；调用 `this.getEngine`、`this.getEngine().getResourceManager`、`this.getEngine().getResourceManager().acquire`、`this.getEngine().getResourceManager().acquire(this,this._bottomTextureUrl,"texture",-this.getEntity().getLeastCameraDepth()).then`、`this.getEngine().getResourceManager().release`、`this.getEntity`。 源码 eyes/src/engine/components/RingsComponent.js:30；参数 (bottomTextureUrl)。
- `getInnerRadius()`：【结构证据】返回 `this._innerRadius`。 源码 eyes/src/engine/components/RingsComponent.js:38；参数 ()。
- `setInnerRadius(innerRadius)`：【结构证据】写入 `_innerRadius`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/RingsComponent.js:41；参数 (innerRadius)。
- `getOuterRadius()`：【结构证据】返回 `this._outerRadius`。 源码 eyes/src/engine/components/RingsComponent.js:45；参数 ()。
- `setOuterRadius(outerRadius)`：【结构证据】写入 `_outerRadius`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.__setRadius`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/RingsComponent.js:48；参数 (outerRadius)。
- `getTopTexture()`：【结构证据】返回 `t.uniforms.topTexture.value` 或 `null`；调用 `this.getThreeJsMaterials`。 源码 eyes/src/engine/components/RingsComponent.js:53；参数 ()。
- `getShadowEntity(t)`：【结构证据】返回 `this._shadowEntities[t]?.getName()`。 源码 eyes/src/engine/components/RingsComponent.js:60；参数 (t)。
- `setShadowEntities(t)`：【结构证据】写入 `_shadowEntities`；调用 `PioneerPublicApi.ThreeJsHelper.setDefine`、`new PioneerPublicApi.EntityRef`、`this._shadowEntities.push`、`this.getEntity`、`this.getEntity().getScene`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/RingsComponent.js:63；参数 (t)。
- `__destroy()`：【结构证据】调用 `super.__destroy`、`t.removeChangedCallback`、`this._spheroidComponentRef.get`。 源码 eyes/src/engine/components/RingsComponent.js:69；参数 ()。
- `__update()`：【结构证据】调用 `this._spheroidComponentRef.update`。 源码 eyes/src/engine/components/RingsComponent.js:74；参数 ()。
- `__prepareForRender(t)`：【结构证据】调用 `PioneerPublicApi.MaterialUtils.setLightSourceUniforms`、`PioneerPublicApi.MaterialUtils.setUniforms`、`PioneerPublicApi.ThreeJsHelper.setOrientationToEntity`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`this.getEntity`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/RingsComponent.js:77；参数 (t)。
- `__loadResources()`：【结构证据】返回 `void this.getEngine().getResourceManager().releaseAllForEntityItem(this)`；调用 `PioneerPublicApi.ThreeJsHelper.createMeshObject`、`PioneerPublicApi.ThreeJsHelper.setDefine`、`PioneerPublicApi.ThreeJsHelper.setIndices`、`PioneerPublicApi.ThreeJsHelper.setVertices`、`new Float32Array`、`new PioneerPublicApi.THREE.Color`。 源码 eyes/src/engine/components/RingsComponent.js:85；参数 ()。
- `__unloadResources()`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`、`this.getEngine`、`this.getEngine().getResourceManager`、`this.getEngine().getResourceManager().releaseAllForEntityItem`。 源码 eyes/src/engine/components/RingsComponent.js:156；参数 ()。
- `_spheroidRefChangedCallback(t, e)`：【结构证据】调用 `e.addChangedCallback`、`t.removeChangedCallback`、`this._spheroidChangedCallback`。 源码 eyes/src/engine/components/RingsComponent.js:160；参数 (t, e)。
- `_spheroidChangedCallback()`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`e.getEquatorialRadius`、`e.getPolarRadius`、`this._spheroidComponentRef.get`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/RingsComponent.js:165；参数 ()。

### `eyes/src/engine/components/ShadowConeComponent.js`

按源与目标半径/相对位置计算本影或半影锥并渲染截面几何。

- 证据：`import ../pioneer/index.js`。
- 证据：`ShadowConeComponent extends Pioneer.BaseComponent @3`。

#### ShadowConeComponent

按源与目标半径/相对位置计算本影或半影锥并渲染截面几何。 继承：`Pioneer.BaseComponent`。源码 [eyes/src/engine/components/ShadowConeComponent.js:3](../../eyes/src/engine/components/ShadowConeComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_color`、`_numberOfCirclePoints`、`_shadowType`、`_sourceEntity`、`_targetEntity`；调用 `new Pioneer.Color`、`new Pioneer.EntityRef`、`super`、`this.__setRadius`、`this.getEntity`、`this.getEntity().getScene`。 源码 eyes/src/engine/components/ShadowConeComponent.js:4；参数 (t, e)。
- `getColor()`：【结构证据】返回 `this._color`。 源码 eyes/src/engine/components/ShadowConeComponent.js:13；参数 ()。
- `setColor(t)`：【结构证据】调用 `this._color.copy`。 源码 eyes/src/engine/components/ShadowConeComponent.js:16；参数 (t)。
- `getSourceEntity()`：【结构证据】返回 `this._sourceEntity.getName()`；调用 `this._sourceEntity.getName`。 源码 eyes/src/engine/components/ShadowConeComponent.js:19；参数 ()。
- `setSourceEntity(t)`：【结构证据】调用 `this._sourceEntity.setName`。 源码 eyes/src/engine/components/ShadowConeComponent.js:22；参数 (t)。
- `getTargetEntity()`：【结构证据】返回 `this._targetEntity.getName()`；调用 `this._targetEntity.getName`。 源码 eyes/src/engine/components/ShadowConeComponent.js:25；参数 ()。
- `setTargetEntity(t)`：【结构证据】调用 `this._targetEntity.setName`。 源码 eyes/src/engine/components/ShadowConeComponent.js:28；参数 (t)。
- `getShadowType()`：【结构证据】返回 `this._shadowType`。 源码 eyes/src/engine/components/ShadowConeComponent.js:31；参数 ()。
- `setShadowType(shadowType)`：【结构证据】写入 `_shadowType`；调用 `this.resetResources`。 源码 eyes/src/engine/components/ShadowConeComponent.js:34；参数 (shadowType)。
- `__prepareForRender(t)`：【结构证据】调用 `Pioneer.ThreeJsHelper.setPositionToEntity`、`Pioneer.ThreeJsHelper.setUniformColorRGBA`、`this._updateMesh`、`this.getEntity`、`this.getThreeJsMaterials`、`this.getThreeJsObjects`。 源码 eyes/src/engine/components/ShadowConeComponent.js:38；参数 (t)。
- `__loadResources()`：【结构证据】调用 `Pioneer.ThreeJsHelper.createMeshObject`、`this._createMesh`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getEngine`、`this.getEntity().getScene().getEngine().getMaterialManager`。 源码 eyes/src/engine/components/ShadowConeComponent.js:44；参数 ()。
- `__unloadResources()`：【结构证据】调用 `Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials`。 源码 eyes/src/engine/components/ShadowConeComponent.js:54；参数 ()。
- `_createMesh()`：【结构证据】调用 `Pioneer.ThreeJsHelper.setIndices`、`Pioneer.ThreeJsHelper.setVertices`、`new Float32Array`、`new Uint16Array`、`this.getThreeJsObjects`。 源码 eyes/src/engine/components/ShadowConeComponent.js:57；参数 ()。
- `_updateMesh()`：【结构证据】返回 `void`；调用 `Math.cos`、`Math.min`、`Math.sin`、`Math.sqrt`、`Pioneer.Quaternion.pool.get`、`Pioneer.Quaternion.pool.release`。 源码 eyes/src/engine/components/ShadowConeComponent.js:73；参数 ()。

### `eyes/src/engine/components/SkyboxComponent.js`

从六面或全景纹理构建随相机移动的背景天空。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`SkyboxComponent extends PioneerPublicApi.BaseComponent @3`。

#### SkyboxComponent

从六面或全景纹理构建随相机移动的背景天空。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/SkyboxComponent.js:3](../../eyes/src/engine/components/SkyboxComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_numLatVerts`、`_textureUrl`；调用 `super`、`this.__setRadius`、`this.__setUsesEntityOrientation`。 源码 eyes/src/engine/components/SkyboxComponent.js:4；参数 (t, e)。
- `getTextureUrl()`：【结构证据】返回 `this._textureUrl`。 源码 eyes/src/engine/components/SkyboxComponent.js:11；参数 ()。
- `setTextureUrl(textureUrl)`：【结构证据】写入 `_textureUrl`；调用 `this.resetResources`。 源码 eyes/src/engine/components/SkyboxComponent.js:14；参数 (textureUrl)。
- `__prepareForRender(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setOrientationToEntity`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`this.getEntity`、`this.getThreeJsObjects`。 源码 eyes/src/engine/components/SkyboxComponent.js:18；参数 (t)。
- `__loadResources()`：【结构证据】返回 `void this.getEngine().getResourceManager().releaseAllForEntityItem(this)`；调用 `Math.cos`、`Math.sin`、`PioneerPublicApi.LatLonAlt.pool.get`、`PioneerPublicApi.LatLonAlt.pool.release`、`PioneerPublicApi.MaterialUtils.get`、`PioneerPublicApi.ThreeJsHelper.createMeshObject`。 源码 eyes/src/engine/components/SkyboxComponent.js:22；参数 ()。
- `__unloadResources()`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`、`this.getEngine`、`this.getEngine().getResourceManager`、`this.getEngine().getResourceManager().releaseByUrl`。 源码 eyes/src/engine/components/SkyboxComponent.js:70；参数 ()。

### `eyes/src/engine/components/SphereGridComponent.js`

在球面生成经纬网格并以相机相关变换渲染。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`SphereGridComponent extends PioneerPublicApi.BaseComponent @3`。

#### SphereGridComponent

在球面生成经纬网格并以相机相关变换渲染。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/SphereGridComponent.js:3](../../eyes/src/engine/components/SphereGridComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_color`、`_degreesPerLine`、`_lineMesh`、`_meshDirty`、`_relativeToEntity`；调用 `new PioneerPublicApi.Color`、`super`。 源码 eyes/src/engine/components/SphereGridComponent.js:4；参数 (t, e)。
- `setRadius(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setScale`、`this.__setRadius`、`this.getRadius`、`this.getThreeJsObjects`。 源码 eyes/src/engine/components/SphereGridComponent.js:12；参数 (t)。
- `getColor()`：【结构证据】返回 `this._color`。 源码 eyes/src/engine/components/SphereGridComponent.js:16；参数 ()。
- `setColor(t)`：【结构证据】写入 `_meshDirty`；调用 `this._color.copy`。 源码 eyes/src/engine/components/SphereGridComponent.js:19；参数 (t)。
- `getDegreesPerLine()`：【结构证据】返回 `this._degreesPerLine`。 源码 eyes/src/engine/components/SphereGridComponent.js:23；参数 ()。
- `setDegreesPerLine(degreesPerLine)`：【结构证据】写入 `_degreesPerLine`、`_meshDirty`。 源码 eyes/src/engine/components/SphereGridComponent.js:26；参数 (degreesPerLine)。
- `isRelativeToEntity()`：【结构证据】返回 `this._relativeToEntity`。 源码 eyes/src/engine/components/SphereGridComponent.js:30；参数 ()。
- `setRelativeToEntity(relativeToEntity)`：【结构证据】写入 `_relativeToEntity`；调用 `this.__setUsesEntityOrientation`。 源码 eyes/src/engine/components/SphereGridComponent.js:33；参数 (relativeToEntity)。
- `__prepareForRender(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setOrientationToEntity`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`this._lineMesh.prepareForRender`、`this._updateMesh`、`this.getEntity`、`this.getThreeJsObjects`。 源码 eyes/src/engine/components/SphereGridComponent.js:37；参数 (t)。
- `__loadResources()`：【结构证据】写入 `_lineMesh`；调用 `new PioneerPublicApi.LineMesh`、`this._updateMesh`。 源码 eyes/src/engine/components/SphereGridComponent.js:40；参数 ()。
- `__unloadResources()`：【结构证据】写入 `_lineMesh`；调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`。 源码 eyes/src/engine/components/SphereGridComponent.js:44；参数 ()。
- `_updateMesh()`：【结构证据】写入 `_meshDirty`；返回 `void`；调用 `Math.cos`、`Math.min`、`Math.sin`、`PioneerPublicApi.MathUtils.degToRad`、`PioneerPublicApi.ThreeJsHelper.setOrientation`、`PioneerPublicApi.ThreeJsHelper.setScale`。 源码 eyes/src/engine/components/SphereGridComponent.js:48；参数 ()。

### `eyes/src/engine/components/SpheroidComponent.js`

描述扁球体几何，负责 XYZ 与经纬高转换、地表法线和局部姿态求解；不负责贴图 LOD。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`SpheroidComponent extends PioneerPublicApi.BaseComponent @3`。

#### SpheroidComponent

描述扁球体几何，负责 XYZ 与经纬高转换、地表法线和局部姿态求解；不负责贴图 LOD。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/SpheroidComponent.js:3](../../eyes/src/engine/components/SpheroidComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_changed`、`_changedCallbacks`、`_equatorialRadius`、`_planetographic`、`_polarRadius`；调用 `Math.max`、`new PioneerPublicApi.FastSet`、`super`、`this.__setRadius`、`this.setIsGroundComponent`。 源码 eyes/src/engine/components/SpheroidComponent.js:4；参数 (t, e)。
- `getEquatorialRadius()`：【结构证据】返回 `this._equatorialRadius`。 源码 eyes/src/engine/components/SpheroidComponent.js:14；参数 ()。
- `setEquatorialRadius(equatorialRadius)`：【结构证据】写入 `_changed`、`_equatorialRadius`；调用 `Math.max`、`this.__setRadius`。 源码 eyes/src/engine/components/SpheroidComponent.js:17；参数 (equatorialRadius)。
- `getPolarRadius()`：【结构证据】返回 `this._polarRadius`。 源码 eyes/src/engine/components/SpheroidComponent.js:22；参数 ()。
- `setPolarRadius(polarRadius)`：【结构证据】写入 `_changed`、`_polarRadius`；调用 `Math.max`、`this.__setRadius`。 源码 eyes/src/engine/components/SpheroidComponent.js:25；参数 (polarRadius)。
- `isPlanetographic()`：【结构证据】返回 `this._planetographic`。 源码 eyes/src/engine/components/SpheroidComponent.js:30；参数 ()。
- `setPlanetographic(planetographic)`：【结构证据】写入 `_changed`、`_planetographic`。 源码 eyes/src/engine/components/SpheroidComponent.js:33；参数 (planetographic)。
- `addChangedCallback(t)`：【结构证据】调用 `this._changedCallbacks.add`。 源码 eyes/src/engine/components/SpheroidComponent.js:37；参数 (t)。
- `removeChangedCallback(t)`：【结构证据】调用 `this._changedCallbacks.delete`。 源码 eyes/src/engine/components/SpheroidComponent.js:40；参数 (t)。
- `__update()`：【结构证据】写入 `_changed`；调用 `this._changedCallbacks.getAt`、`this._changedCallbacks.getAt(t)`、`this._changedCallbacks.getSize`。 源码 eyes/src/engine/components/SpheroidComponent.js:43；参数 ()。
- `xyzFromLLA(t, e)`：【结构证据】调用 `Math.cos`、`Math.sin`、`Math.sqrt`。 源码 eyes/src/engine/components/SpheroidComponent.js:49；参数 (t, e)。
- `radiusFromXYZ(t, e=5)`：【结构证据】返回 `o` 或 `equatorialRadius*polarRadius/Math.sqrt(polarRadius*polarRadius*s+equatorialRadius*equatorialRadius*n)`；调用 `Math.atan`、`Math.sin`、`Math.sqrt`、`t.magnitudeXY`。 源码 eyes/src/engine/components/SpheroidComponent.js:67；参数 (t, e=5)。
- `llaFromXYZ(t, e, i=5)`：【结构证据】调用 `Math.atan`、`Math.atan2`、`Math.cos`、`Math.sin`、`Math.sqrt`、`e.magnitude`。 源码 eyes/src/engine/components/SpheroidComponent.js:87；参数 (t, e, i=5)。
- `llaToggleGraphicCentric(t, e)`：【结构证据】写入 `_planetographic`；调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`this.llaFromXYZ`、`this.xyzFromLLA`。 源码 eyes/src/engine/components/SpheroidComponent.js:112；参数 (t, e)。
- `upFromLLA(t, e)`：【结构证据】调用 `Math.cos`、`Math.sin`、`PioneerPublicApi.LatLonAlt.pool.get`、`PioneerPublicApi.LatLonAlt.pool.release`、`i.copy`、`this.llaToggleGraphicCentric`。 源码 eyes/src/engine/components/SpheroidComponent.js:120；参数 (t, e)。
- `eastFromLLA(t, e)`：【结构证据】调用 `Math.cos`、`Math.sin`。 源码 eyes/src/engine/components/SpheroidComponent.js:128；参数 (t, e)。
- `northFromLLA(t, e)`：【结构证据】调用 `Math.cos`、`Math.sin`、`PioneerPublicApi.LatLonAlt.pool.get`、`PioneerPublicApi.LatLonAlt.pool.release`、`i.copy`、`this.llaToggleGraphicCentric`。 源码 eyes/src/engine/components/SpheroidComponent.js:133；参数 (t, e)。
- `orientationFromLLA(t, e)`：【结构证据】调用 `Math.cos`、`Math.sign`、`Math.sin`、`Math.sqrt`、`PioneerPublicApi.LatLonAlt.pool.get`、`PioneerPublicApi.LatLonAlt.pool.release`。 源码 eyes/src/engine/components/SpheroidComponent.js:141；参数 (t, e)。
- `aerFromXYZRelToLLA(t, e, i)`：【结构证据】调用 `Math.acos`、`Math.atan2`、`PioneerPublicApi.LatLonAlt.pool.get`、`PioneerPublicApi.LatLonAlt.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`。 源码 eyes/src/engine/components/SpheroidComponent.js:153；参数 (t, e, i)。
- `getRayIntersection(t, e, i)`：【结构证据】调用 `PioneerPublicApi.Geometry.getLineSphereIntersectionWithSphereAtOrigin`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`o.set`、`r.set`、`t.addMult`。 源码 eyes/src/engine/components/SpheroidComponent.js:177；参数 (t, e, i)。
- `getGroundPosition(t, e, i)`：【结构证据】调用 `PioneerPublicApi.LatLonAlt.pool.get`、`PioneerPublicApi.LatLonAlt.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`this.llaFromXYZ`、`this.upFromLLA`。 源码 eyes/src/engine/components/SpheroidComponent.js:189；参数 (t, e, i)。

### `eyes/src/engine/components/SpheroidLODComponent.js`

以球体网格/立方体映射和 TextureLOD 为行星选择纹理分辨率，协调大气及阴影材质。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`SpheroidLODComponent extends PioneerPublicApi.BaseComponent @3`。

#### SpheroidLODComponent

以球体网格/立方体映射和 TextureLOD 为行星选择纹理分辨率，协调大气及阴影材质。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/SpheroidLODComponent.js:3](../../eyes/src/engine/components/SpheroidLODComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_atmosphereComponentRef`、`_cubeMapFaceFrames`、`_longitudinalRotation`、`_lowerLeftBounds`、`_mapping`、`_materialOptions`、`_numFaces`、`_shadowEntities`；调用 `new PioneerPublicApi.ComponentRef`、`new PioneerPublicApi.FastMap`、`new PioneerPublicApi.LatLonAlt`、`new Set`、`super`、`this.__setUsesEntityOrientation`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:4；参数 (t, e)。
- `getTextureNames()`：【结构证据】返回 `t`；调用 `t.push`、`this._textureInfos.getAt`、`this._textureInfos.getSize`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:21；参数 ()。
- `getTextureUrl(t)`：【结构证据】返回 `this._textureInfos.get(t)?.url`；调用 `this._textureInfos.get`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:26；参数 (t)。
- `getTextureSizes(t)`：【结构证据】返回 `this._textureInfos.get(t)?.sizes`；调用 `this._textureInfos.get`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:29；参数 (t)。
- `setTexture(t, e, i=[4,512,4096])`：【结构证据】调用 `e.replace`、`new PioneerPublicApi.TextureLOD`、`o.lods.push`、`s.setSizes`、`s.setUrl`、`t.toString`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:32；参数 (t, e, i=[4,512,4096])。
- `forceTextureSize(t, e)`：【结构证据】调用 `i.lods[t].setForcedSize`、`new Error`、`this._textureInfos.get`；含显式错误分支。 源码 eyes/src/engine/components/SpheroidLODComponent.js:64；参数 (t, e)。
- `unsetTexture(t)`：【结构证据】调用 `this._textureInfos.delete`、`this._updateMeshes`、`this.getEngine`、`this.getEngine().getResourceManager`、`this.getEngine().getResourceManager().release`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:69；参数 (t)。
- `getTextureCurrentSize(t, e)`：【结构证据】返回 `i.lods[e].getCurrentSize()`；调用 `i.lods[e].getCurrentSize`、`this._textureInfos.get`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:83；参数 (t, e)。
- `isMaterialOptionEnabled(t)`：【结构证据】返回 `this._materialOptions.has(t)`；调用 `this._materialOptions.has`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:87；参数 (t)。
- `setMaterialOption(t, e)`：【结构证据】调用 `this._materialOptions.add`、`this._materialOptions.delete`、`this._materialOptions.has`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:90；参数 (t, e)。
- `getMapping()`：【结构证据】返回 `this._mapping`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:108；参数 ()。
- `setMapping(mapping)`：【结构证据】写入 `_mapping`、`_numFaces`；调用 `e.lods.push`、`e.lods[t].setEnabled`、`e.url.replace`、`new PioneerPublicApi.TextureLOD`、`t.toString`、`textureLOD.setSizes`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:111；参数 (mapping)。
- `setBounds(t, e)`：【结构证据】调用 `this._lowerLeftBounds.copy`、`this._updateMeshes`、`this._upperRightBounds.copy`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:129；参数 (t, e)。
- `setCubeMapLayout(t)`：【结构证据】写入 `_cubeMapFaceFrames`；调用 `PioneerPublicApi.Tuple.create3Tuple`、`PioneerPublicApi.Tuple.create6Tuple`、`new Error`、`this._updateMeshes`；含显式错误分支。 源码 eyes/src/engine/components/SpheroidLODComponent.js:134；参数 (t)。
- `getNumShadowEntities()`：【结构证据】返回 `this._shadowEntities.length`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:155；参数 ()。
- `getShadowEntity(t)`：【结构证据】返回 `this._shadowEntities[t]?.getName()`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:158；参数 (t)。
- `setShadowEntities(t)`：【结构证据】写入 `_shadowEntities`；调用 `PioneerPublicApi.ThreeJsHelper.setDefine`、`new PioneerPublicApi.EntityRef`、`this._shadowEntities.push`、`this.getEntity`、`this.getEntity().getScene`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:161；参数 (t)。
- `getLongitudeRotation()`：【结构证据】返回 `this._longitudinalRotation`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:167；参数 ()。
- `setLongitudeRotation(longitudinalRotation)`：【结构证据】写入 `_longitudinalRotation`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:170；参数 (longitudinalRotation)。
- `getLoadedPromise(t=false, e=Number.POSITIVE_INFINITY)`：【结构证据】调用 `super.getLoadedPromise`、`this.getLoadState`、`this.getTexturesLoadedPromise`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:173；参数 (t=false, e=Number.POSITIVE_INFINITY)。
- `getTexturesLoadedPromise(t=Number.POSITIVE_INFINITY)`：【结构证据】调用 `Promise.allSettled`、`e.push`、`i.every`、`i.filter`、`new Error`、`s.lods[i].getLoadedPromise`；含显式错误分支。 源码 eyes/src/engine/components/SpheroidLODComponent.js:177；参数 (t=Number.POSITIVE_INFINITY)。
- `setSpheroidReference(t)`：【结构证据】调用 `this._spheroidComponentRef.set`、`this.getEntity`、`this.getEntity().getName`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:186；参数 (t)。
- `__destroy()`：【结构证据】调用 `super.__destroy`、`t.removeChangedCallback`、`this._spheroidComponentRef.get`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:189；参数 ()。
- `__update()`：【结构证据】调用 `e.lods[t].update`、`this._spheroidComponentRef.update`、`this._textureInfos.getAt`、`this._textureInfos.getSize`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:194；参数 ()。
- `__prepareForRender(t)`：【结构证据】调用 `PioneerPublicApi.MaterialUtils.setUniforms`、`PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.ThreeJsHelper.setOrientationToEntity`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`i.setFromAxisAngle`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:201；参数 (t)。
- `__loadResources()`：【结构证据】调用 `PioneerPublicApi.MaterialUtils.get`、`PioneerPublicApi.ThreeJsHelper.createMeshObject`、`PioneerPublicApi.ThreeJsHelper.useInDynEnvMap`、`e.setEnabled`、`e.setUniform`、`this._textureInfos.getAt`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:213；参数 ()。
- `__unloadResources()`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`、`i.setEnabled`、`i.setUniform`、`this._textureInfos.getAt`、`this._textureInfos.getSize`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:252；参数 ()。
- `_updateMeshes()`：【结构证据】返回 `void`；调用 `Math.ceil`、`Math.max`、`PioneerPublicApi.Geometry.getLLAFromXYZOnSphere`、`PioneerPublicApi.LatLonAlt.pool.get`、`PioneerPublicApi.LatLonAlt.pool.release`、`PioneerPublicApi.ThreeJsHelper.computeTangents`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:267；参数 ()。
- `_spheroidRefChangedCallback(t, e)`：【结构证据】调用 `e.addChangedCallback`、`t.removeChangedCallback`、`this._spheroidChangedCallback`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:355；参数 (t, e)。
- `_spheroidChangedCallback()`：【结构证据】调用 `Math.max`、`t.getEquatorialRadius`、`t.getPolarRadius`、`this.__setRadius`、`this._spheroidComponentRef.get`、`this.resetResources`。 源码 eyes/src/engine/components/SpheroidLODComponent.js:360；参数 ()。

### `eyes/src/engine/components/SpoutComponent.js`

将相机输出绘制到特定宽度的画布/投影输出，提供面向球幕的渲染路径。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`SpoutComponent extends PioneerPublicApi.CameraComponent @3`。

#### SpoutComponent

将相机输出绘制到特定宽度的画布/投影输出，提供面向球幕的渲染路径。 继承：`PioneerPublicApi.CameraComponent`。源码 [eyes/src/engine/components/SpoutComponent.js:3](../../eyes/src/engine/components/SpoutComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_globeDistance`、`_renderWidth`、`_spoutTexture`、`_tagEnd`、`_tagSend`、`_tagStart`、`_threeJsCubeCamera`、`_threeJsFaceCameras`；调用 `PioneerPublicApi.Tuple.create6Tuple`、`matrix4.set`、`new PioneerPublicApi.THREE.Matrix4`、`new PioneerPublicApi.THREE.Mesh`、`new PioneerPublicApi.THREE.OrthographicCamera`、`new PioneerPublicApi.THREE.PerspectiveCamera`。 源码 eyes/src/engine/components/SpoutComponent.js:4；参数 (t, e)。
- `getRenderWidth()`：【结构证据】返回 `this._renderWidth`。 源码 eyes/src/engine/components/SpoutComponent.js:41；参数 ()。
- `setRenderWidth(renderWidth)`：【结构证据】写入 `_renderWidth`；调用 `this._spoutTexture.setSize`、`this._threeJsFaceRenderTargets[t].setSize`。 源码 eyes/src/engine/components/SpoutComponent.js:44；参数 (renderWidth)。
- `getForGlobe()`：【结构证据】返回 `1===this.getInvertDepth()`；调用 `this.getInvertDepth`。 源码 eyes/src/engine/components/SpoutComponent.js:49；参数 ()。
- `setForGlobe(t, globeDistance)`：【结构证据】写入 `_globeDistance`；调用 `this.setInvertDepth`。 源码 eyes/src/engine/components/SpoutComponent.js:52；参数 (t, globeDistance)。
- `__render()`：【结构证据】调用 `Math.max`、`PioneerPublicApi.Quaternion.threeJsPool.get`、`PioneerPublicApi.Quaternion.threeJsPool.release`、`i.set`、`n.clearColor`、`n.render`。 源码 eyes/src/engine/components/SpoutComponent.js:56；参数 ()。
- `_updateProjectionMatrices()`：【结构证据】调用 `this.getAutoNearDistance`、`this.getInvertDepth`。 源码 eyes/src/engine/components/SpoutComponent.js:98；参数 ()。
- `_setupQuad()`：【结构证据】写入 `_threeJsQuad`、`_threeJsQuad.frustumCulled`；调用 `bufferGeometry.setAttribute`、`bufferGeometry.setIndex`、`n.textures.value.push`、`new Float32Array`、`new PioneerPublicApi.THREE.BufferAttribute`、`new PioneerPublicApi.THREE.BufferGeometry`。 源码 eyes/src/engine/components/SpoutComponent.js:113；参数 ()。

### `eyes/src/engine/components/SpriteComponent.js`

载入图像纹理并渲染面向相机的可缩放精灵。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`SpriteComponent extends PioneerPublicApi.BaseComponent @3`。

#### SpriteComponent

载入图像纹理并渲染面向相机的可缩放精灵。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/SpriteComponent.js:3](../../eyes/src/engine/components/SpriteComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_alignment`、`_billboard`、`_blending`、`_colorMultiplier`、`_renderOrder`、`_size`、`_sizeUnits`、`_textureUrl`；调用 `new PioneerPublicApi.Color`、`new PioneerPublicApi.Vector2`、`super`。 源码 eyes/src/engine/components/SpriteComponent.js:4；参数 (t, e)。
- `getTextureUrl()`：【结构证据】返回 `this._textureUrl`。 源码 eyes/src/engine/components/SpriteComponent.js:16；参数 ()。
- `setTextureUrl(textureUrl)`：【结构证据】写入 `_textureUrl`；调用 `this.resetResources`。 源码 eyes/src/engine/components/SpriteComponent.js:19；参数 (textureUrl)。
- `getSize()`：【结构证据】返回 `this._size`。 源码 eyes/src/engine/components/SpriteComponent.js:23；参数 ()。
- `setSize(t)`：【结构证据】调用 `this._size.copy`、`this._updateSizeUniform`。 源码 eyes/src/engine/components/SpriteComponent.js:26；参数 (t)。
- `getSizeUnits()`：【结构证据】返回 `this._sizeUnits`。 源码 eyes/src/engine/components/SpriteComponent.js:30；参数 ()。
- `setSizeUnits(sizeUnits)`：【结构证据】写入 `_sizeUnits`；调用 `this._updateSizeUniform`。 源码 eyes/src/engine/components/SpriteComponent.js:33；参数 (sizeUnits)。
- `getColorMultiplier()`：【结构证据】返回 `this._colorMultiplier`。 源码 eyes/src/engine/components/SpriteComponent.js:37；参数 ()。
- `setColorMultiplier(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA`、`this._colorMultiplier.copy`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/SpriteComponent.js:40；参数 (t)。
- `getAlignment()`：【结构证据】返回 `this._alignment`。 源码 eyes/src/engine/components/SpriteComponent.js:44；参数 ()。
- `setAlignment(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformVector2`、`this._alignment.copy`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/SpriteComponent.js:47；参数 (t)。
- `isBillboard()`：【结构证据】返回 `this._billboard`。 源码 eyes/src/engine/components/SpriteComponent.js:51；参数 ()。
- `setBillboard(billboard)`：【结构证据】写入 `_billboard`。 源码 eyes/src/engine/components/SpriteComponent.js:54；参数 (billboard)。
- `getTransparent()`：【结构证据】返回 `this._transparent`。 源码 eyes/src/engine/components/SpriteComponent.js:57；参数 ()。
- `setTransparent(transparent)`：【结构证据】写入 `_transparent`；调用 `PioneerPublicApi.ThreeJsHelper.setTransparent`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/SpriteComponent.js:60；参数 (transparent)。
- `setBlending(blending)`：【结构证据】写入 `_blending`；调用 `PioneerPublicApi.ThreeJsHelper.setBlending`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/SpriteComponent.js:64；参数 (blending)。
- `getRenderOrder()`：【结构证据】返回 `this._renderOrder`。 源码 eyes/src/engine/components/SpriteComponent.js:68；参数 ()。
- `setRenderOrder(renderOrder)`：【结构证据】写入 `_renderOrder`；调用 `PioneerPublicApi.ThreeJsHelper.setRenderOrder`、`this.getThreeJsObjects`。 源码 eyes/src/engine/components/SpriteComponent.js:71；参数 (renderOrder)。
- `__prepareForRender(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setOrientationToBillboard`、`PioneerPublicApi.ThreeJsHelper.setOrientationToEntity`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`PioneerPublicApi.ThreeJsHelper.setUniformVector2`、`PioneerPublicApi.Vector2.pool.get`、`PioneerPublicApi.Vector2.pool.release`。 源码 eyes/src/engine/components/SpriteComponent.js:75；参数 (t)。
- `__loadResources()`：【结构证据】返回 `void this.getEngine().getResourceManager().releaseAllForEntityItem(this)`；调用 `PioneerPublicApi.ThreeJsHelper.createGeometry`、`PioneerPublicApi.ThreeJsHelper.createMeshObjectGivenGeometry`、`PioneerPublicApi.ThreeJsHelper.setBlending`、`PioneerPublicApi.ThreeJsHelper.setIndices`、`PioneerPublicApi.ThreeJsHelper.setRenderOrder`、`PioneerPublicApi.ThreeJsHelper.setTransparent`。 源码 eyes/src/engine/components/SpriteComponent.js:88；参数 ()。
- `__unloadResources()`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.destroyGeometry`、`PioneerPublicApi.ThreeJsHelper.destroyMaterial`、`t.parent.remove`、`this.getEngine`、`this.getEngine().getResourceManager`、`this.getEngine().getResourceManager().releaseAllForEntityItem`。 源码 eyes/src/engine/components/SpriteComponent.js:125；参数 ()。
- `_updateSizeUniform()`：【结构证据】调用 `Math.max`、`Number.isNaN`、`PioneerPublicApi.ThreeJsHelper.setUniformVector2`、`PioneerPublicApi.Vector2.pool.get`、`PioneerPublicApi.Vector2.pool.release`、`n.set`。 源码 eyes/src/engine/components/SpriteComponent.js:133；参数 ()。

### `eyes/src/engine/components/StarfieldComponent.js`

解析星表并构造星点，按亮度/颜色和相机方向渲染背景恒星。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`Star @3`。
- 证据：`StarfieldComponent extends PioneerPublicApi.BaseComponent @15`。

#### Star

星表单颗恒星的数据记录。 继承：`无显式继承`。源码 [eyes/src/engine/components/StarfieldComponent.js:3](../../eyes/src/engine/components/StarfieldComponent.js#L3)。

- `constructor()`：【结构证据】写入 `absMag`、`color`、`mag`、`position`；调用 `new PioneerPublicApi.Color`、`new PioneerPublicApi.Vector3`。 源码 eyes/src/engine/components/StarfieldComponent.js:8；参数 ()。

#### StarfieldComponent

解析星表并构造星点，按亮度/颜色和相机方向渲染背景恒星。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/StarfieldComponent.js:15](../../eyes/src/engine/components/StarfieldComponent.js#L15)。

- `constructor(t, e)`：【结构证据】写入 `_particleSize`、`_url`；调用 `super`、`this.__setRadius`。 源码 eyes/src/engine/components/StarfieldComponent.js:16；参数 (t, e)。
- `getUrl()`：【结构证据】返回 `this._url`。 源码 eyes/src/engine/components/StarfieldComponent.js:22；参数 ()。
- `setUrl(url)`：【结构证据】写入 `_url`；调用 `this.resetResources`。 源码 eyes/src/engine/components/StarfieldComponent.js:25；参数 (url)。
- `getParticleSize()`：【结构证据】返回 `this._particleSize`。 源码 eyes/src/engine/components/StarfieldComponent.js:29；参数 ()。
- `setParticleSize(particleSize)`：【结构证据】写入 `_particleSize`。 源码 eyes/src/engine/components/StarfieldComponent.js:32；参数 (particleSize)。
- `__prepareForRender(t)`：【结构证据】返回 `void`；调用 `Math.max`、`Math.sqrt`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`PioneerPublicApi.Vector2.pool.get`、`PioneerPublicApi.Vector2.pool.release`。 源码 eyes/src/engine/components/StarfieldComponent.js:35；参数 (t)。
- `__loadResources()`：【结构证据】返回 `void`；调用 `PioneerPublicApi.ThreeJsHelper.setIndices`、`PioneerPublicApi.ThreeJsHelper.setVertices`、`PioneerPublicApi.ThreeJsHelper.setupObject`、`bufferGeometry.setAttribute`、`bufferGeometry.setIndex`、`new Float32Array`。 源码 eyes/src/engine/components/StarfieldComponent.js:47；参数 ()。
- `__unloadResources()`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`。 源码 eyes/src/engine/components/StarfieldComponent.js:88；参数 ()。
- `_loadStars()`：【结构证据】返回 `n`；调用 `n.push`、`new PioneerPublicApi.Reader`、`new Star`、`reader.readByte`、`reader.readFloat32`、`reader.readInt32`。 源码 eyes/src/engine/components/StarfieldComponent.js:91；参数 ()。

### `eyes/src/engine/components/TorusComponent.js`

生成带主/次半径和分段参数的环面网格。

- 证据：`import ../pioneer/index.js`。
- 证据：`TorusComponent extends Pioneer.BaseComponent @3`。

#### TorusComponent

生成带主/次半径和分段参数的环面网格。 继承：`Pioneer.BaseComponent`。源码 [eyes/src/engine/components/TorusComponent.js:3](../../eyes/src/engine/components/TorusComponent.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_color`、`_innerRadius`、`_outerRadius`；调用 `new Pioneer.Color`、`super`、`this.__setRadius`、`this.__setUsesEntityOrientation`。 源码 eyes/src/engine/components/TorusComponent.js:4；参数 (t, e)。
- `getColor()`：【结构证据】返回 `this._color`。 源码 eyes/src/engine/components/TorusComponent.js:12；参数 ()。
- `setColor(t)`：【结构证据】调用 `this._color.copy`。 源码 eyes/src/engine/components/TorusComponent.js:15；参数 (t)。
- `getInnerRadius()`：【结构证据】返回 `this._innerRadius`。 源码 eyes/src/engine/components/TorusComponent.js:18；参数 ()。
- `setInnerRadius(innerRadius)`：【结构证据】写入 `_innerRadius`；调用 `this.resetResources`。 源码 eyes/src/engine/components/TorusComponent.js:21；参数 (innerRadius)。
- `getOuterRadius()`：【结构证据】返回 `this._outerRadius`。 源码 eyes/src/engine/components/TorusComponent.js:25；参数 ()。
- `setOuterRadius(outerRadius)`：【结构证据】写入 `_outerRadius`；调用 `this.__setRadius`、`this.resetResources`。 源码 eyes/src/engine/components/TorusComponent.js:28；参数 (outerRadius)。
- `__prepareForRender(t)`：【结构证据】调用 `Pioneer.ThreeJsHelper.setOrientationToEntity`、`Pioneer.ThreeJsHelper.setPositionToEntity`、`Pioneer.ThreeJsHelper.setUniformColorRGBA`、`this.getEntity`、`this.getThreeJsMaterials`、`this.getThreeJsObjects`。 源码 eyes/src/engine/components/TorusComponent.js:33；参数 (t)。
- `__loadResources()`：【结构证据】调用 `Pioneer.ThreeJsHelper.createMeshObject`、`this._createMesh`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getEngine`、`this.getEntity().getScene().getEngine().getMaterialManager`。 源码 eyes/src/engine/components/TorusComponent.js:39；参数 ()。
- `__unloadResources()`：【结构证据】调用 `Pioneer.ThreeJsHelper.destroyAllObjectsAndMaterials`。 源码 eyes/src/engine/components/TorusComponent.js:49；参数 ()。
- `_createMesh()`：【结构证据】调用 `Math.cos`、`Math.sin`、`Pioneer.ThreeJsHelper.setIndices`、`Pioneer.ThreeJsHelper.setVertices`、`new Float32Array`、`new Uint16Array`。 源码 eyes/src/engine/components/TorusComponent.js:52；参数 ()。

### `eyes/src/engine/components/TrailComponent.js`

对实体按时间自适应采样，缓存轨迹点并生成带宽度、渐隐、虚线偏移的轨迹网格。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`Point @3`。
- 证据：`TrailComponent extends PioneerPublicApi.BaseComponent @13`。

#### Point

轨迹缓存点：保存采样时间、位置和速度，供轨迹几何更新使用。 继承：`无显式继承`。源码 [eyes/src/engine/components/TrailComponent.js:3](../../eyes/src/engine/components/TrailComponent.js#L3)。

- `constructor()`：【结构证据】写入 `position`、`time`、`velocity`；调用 `new PioneerPublicApi.Vector3`。 源码 eyes/src/engine/components/TrailComponent.js:7；参数 ()。

#### TrailComponent

对实体按时间自适应采样，缓存轨迹点并生成带宽度、渐隐、虚线偏移的轨迹网格。 继承：`PioneerPublicApi.BaseComponent`。源码 [eyes/src/engine/components/TrailComponent.js:13](../../eyes/src/engine/components/TrailComponent.js#L13)。

- `constructor(t, e)`：【结构证据】写入 `_alphaFade`、`_angleCurveThreshold`、`_color`、`_currentRelativeToEntity`、`_dashGapLength`、`_dashLength`、`_dashOffsetTime`、`_drawStartTime`；调用 `new PioneerPublicApi.Color`、`new PioneerPublicApi.EntityRef`、`super`、`this.__setRadius`、`this.getEntity`、`this.getEntity().getScene`。 源码 eyes/src/engine/components/TrailComponent.js:14；参数 (t, e)。
- `getColor()`：【结构证据】返回 `this._color`。 源码 eyes/src/engine/components/TrailComponent.js:45；参数 ()。
- `setColor(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformColorRGBA`、`this._color.copy`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/TrailComponent.js:48；参数 (t)。
- `getAlphaFade()`：【结构证据】返回 `this._alphaFade`。 源码 eyes/src/engine/components/TrailComponent.js:52；参数 ()。
- `setWidths(widthMin, widthMax)`：【结构证据】写入 `_widthMax`、`_widthMin`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/TrailComponent.js:55；参数 (widthMin, widthMax)。
- `setAlphaFade(alphaFade)`：【结构证据】写入 `_alphaFade`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/TrailComponent.js:61；参数 (alphaFade)。
- `setDashLength(dashLength, dashGapLength)`：【结构证据】写入 `_dashGapLength`、`_dashLength`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/TrailComponent.js:65；参数 (dashLength, dashGapLength)。
- `setGlowWidth(glowWidth)`：【结构证据】写入 `_glowWidth`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/TrailComponent.js:71；参数 (glowWidth)。
- `getStartTime()`：【结构证据】返回 `this._startTime`。 源码 eyes/src/engine/components/TrailComponent.js:75；参数 ()。
- `setStartTime(startTime)`：【结构证据】写入 `_startTime`。 源码 eyes/src/engine/components/TrailComponent.js:78；参数 (startTime)。
- `getEndTime()`：【结构证据】返回 `this._endTime`。 源码 eyes/src/engine/components/TrailComponent.js:81；参数 ()。
- `setEndTime(endTime)`：【结构证据】写入 `_endTime`。 源码 eyes/src/engine/components/TrailComponent.js:84；参数 (endTime)。
- `isRelativeStartTime()`：【结构证据】返回 `this._relativeStartTime`。 源码 eyes/src/engine/components/TrailComponent.js:87；参数 ()。
- `setRelativeStartTime(relativeStartTime)`：【结构证据】写入 `_relativeStartTime`；调用 `this.resetPoints`。 源码 eyes/src/engine/components/TrailComponent.js:90；参数 (relativeStartTime)。
- `isRelativeEndTime()`：【结构证据】返回 `this._relativeEndTime`。 源码 eyes/src/engine/components/TrailComponent.js:94；参数 ()。
- `setRelativeEndTime(relativeEndTime)`：【结构证据】写入 `_relativeEndTime`；调用 `this.resetPoints`。 源码 eyes/src/engine/components/TrailComponent.js:97；参数 (relativeEndTime)。
- `getStartTimeMultiplier()`：【结构证据】返回 `this._startTimeMultiplier`。 源码 eyes/src/engine/components/TrailComponent.js:101；参数 ()。
- `setStartTimeMultiplier(startTimeMultiplier)`：【结构证据】写入 `_startTimeMultiplier`。 源码 eyes/src/engine/components/TrailComponent.js:104；参数 (startTimeMultiplier)。
- `getEndTimeMultiplier()`：【结构证据】返回 `this._endTimeMultiplier`。 源码 eyes/src/engine/components/TrailComponent.js:107；参数 ()。
- `setEndTimeMultiplier(endTimeMultiplier)`：【结构证据】写入 `_endTimeMultiplier`。 源码 eyes/src/engine/components/TrailComponent.js:110；参数 (endTimeMultiplier)。
- `getRelativeToEntity()`：【结构证据】返回 `this._relativeToEntity.getName()`；调用 `this._relativeToEntity.getName`。 源码 eyes/src/engine/components/TrailComponent.js:113；参数 ()。
- `setRelativeToEntity(t)`：【结构证据】调用 `this._currentRelativeToEntity.setName`、`this._relativeToEntity.setName`、`this.resetPoints`。 源码 eyes/src/engine/components/TrailComponent.js:116；参数 (t)。
- `isRelativeToEntityOrientation()`：【结构证据】返回 `this._relativeToEntityOrientation`。 源码 eyes/src/engine/components/TrailComponent.js:121；参数 ()。
- `setRelativeToEntityOrientation(relativeToEntityOrientation)`：【结构证据】写入 `_relativeToEntityOrientation`；调用 `PioneerPublicApi.ThreeJsHelper.setOrientation`、`this.getThreeJsObjects`、`this.resetPoints`。 源码 eyes/src/engine/components/TrailComponent.js:124；参数 (relativeToEntityOrientation)。
- `getAngleCurveThreshold()`：【结构证据】返回 `this._angleCurveThreshold`。 源码 eyes/src/engine/components/TrailComponent.js:129；参数 ()。
- `setAngleCurveThreshold(angleCurveThreshold)`：【结构证据】写入 `_angleCurveThreshold`；调用 `this.resetPoints`。 源码 eyes/src/engine/components/TrailComponent.js:132；参数 (angleCurveThreshold)。
- `getInitialTimeStep()`：【结构证据】返回 `this._initialTimeStep`。 源码 eyes/src/engine/components/TrailComponent.js:136；参数 ()。
- `setInitialTimeStep(initialTimeStep)`：【结构证据】写入 `_initialTimeStep`；调用 `this.resetPoints`。 源码 eyes/src/engine/components/TrailComponent.js:139；参数 (initialTimeStep)。
- `getDrawStartTime()`：【结构证据】返回 `this._drawStartTime`。 源码 eyes/src/engine/components/TrailComponent.js:143；参数 ()。
- `setDrawStartTime(drawStartTime)`：【结构证据】写入 `_drawStartTime`。 源码 eyes/src/engine/components/TrailComponent.js:146；参数 (drawStartTime)。
- `getPointsPerFrame()`：【结构证据】返回 `this._pointsPerFrame`。 源码 eyes/src/engine/components/TrailComponent.js:149；参数 ()。
- `setPointsPerFrame(pointsPerFrame)`：【结构证据】写入 `_pointsPerFrame`。 源码 eyes/src/engine/components/TrailComponent.js:152；参数 (pointsPerFrame)。
- `getUpdatePointPositions()`：【结构证据】返回 `this._updatePointPositions`。 源码 eyes/src/engine/components/TrailComponent.js:155；参数 ()。
- `setUpdatePointPositions(updatePointPositions)`：【结构证据】写入 `_updatePointPositions`。 源码 eyes/src/engine/components/TrailComponent.js:158；参数 (updatePointPositions)。
- `resetPoints()`：【结构证据】写入 `_points`、`_pointsCount`、`_pointsStart`；调用 `new Float32Array`、`new PioneerPublicApi.THREE.BufferAttribute`、`new PioneerPublicApi.THREE.InterleavedBuffer`、`new PioneerPublicApi.THREE.InterleavedBufferAttribute`、`new Uint16Array`、`t.setAttribute`。 源码 eyes/src/engine/components/TrailComponent.js:161；参数 ()。
- `__loadResources()`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.createMeshObject`、`t.uniforms.color.value.set`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getEngine`、`this.getEntity().getScene().getEngine().getMaterialManager`。 源码 eyes/src/engine/components/TrailComponent.js:175；参数 ()。
- `__unloadResources()`：【结构证据】写入 `_points`、`_pointsCount`、`_pointsStart`；调用 `PioneerPublicApi.ThreeJsHelper.destroyAllObjectsAndMaterials`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getEngine`、`this.getEntity().getScene().getEngine().getMaterialManager`、`this.getEntity().getScene().getEngine().getMaterialManager().release`。 源码 eyes/src/engine/components/TrailComponent.js:209；参数 ()。
- `__prepareForRender(t)`：【结构证据】调用 `PioneerPublicApi.MathUtils.clamp01`、`PioneerPublicApi.ThreeJsHelper.setOrientation`、`PioneerPublicApi.ThreeJsHelper.setPosition`、`PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`PioneerPublicApi.ThreeJsHelper.setUniformVector2`、`PioneerPublicApi.Vector2.pool.get`。 源码 eyes/src/engine/components/TrailComponent.js:216；参数 (t)。
- `_updatePoints()`：【结构证据】写入 `_updatePointPositionsLastIndex`；返回 `void PioneerPublicApi.Interval.pool.release(t)`；调用 `Math.min`、`PioneerPublicApi.Interval.pool.get`、`PioneerPublicApi.Interval.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.position.copy`。 源码 eyes/src/engine/components/TrailComponent.js:238；参数 ()。
- `_getIntervalForUpdate(t, e)`：【结构证据】调用 `t.intersection`、`this._getAutoLength`、`this.getEntity`、`this.getEntity().getPositionCoverage`。 源码 eyes/src/engine/components/TrailComponent.js:352；参数 (t, e)。
- `_popFrontPoint(t)`：【结构证据】写入 `_pointsCount`、`_pointsStart`、`_points[this._pointsStart].position.x`；调用 `t.expandTo`、`this._resize`。 源码 eyes/src/engine/components/TrailComponent.js:357；参数 (t)。
- `_popBackPoint(t)`：【结构证据】写入 `_pointsCount`、`_points[(this._pointsStart+this._pointsCount)%this._points.length].position.x`；调用 `t.expandTo`、`this._resize`。 源码 eyes/src/engine/components/TrailComponent.js:360；参数 (t)。
- `_pushFrontPoint(t)`：【结构证据】写入 `_pointsCount`、`_pointsStart`；调用 `t.expandTo`、`this._resize`。 源码 eyes/src/engine/components/TrailComponent.js:363；参数 (t)。
- `_pushBackPoint(t)`：【结构证据】写入 `_pointsCount`；调用 `t.expandTo`、`this._resize`。 源码 eyes/src/engine/components/TrailComponent.js:370；参数 (t)。
- `_resize(t, e)`：【结构证据】写入 `_dashOffsetTime`、`_points`、`_pointsStart`；调用 `Math.max`、`PioneerPublicApi.MathUtils.ceilPow2`、`new Float32Array`、`new PioneerPublicApi.THREE.BufferAttribute`、`new PioneerPublicApi.THREE.InterleavedBuffer`、`new PioneerPublicApi.THREE.InterleavedBufferAttribute`。 源码 eyes/src/engine/components/TrailComponent.js:376；参数 (t, e)。
- `_getAutoLength(t)`：【结构证据】返回 `o`；调用 `Math.abs`、`Math.min`、`Math.sqrt`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.getEccentricity`。 源码 eyes/src/engine/components/TrailComponent.js:413；参数 (t)。
- `_getPositionAndVelocity(t, e, i)`：【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`e.copy`、`e.rotateInverse`、`n.getOrientationAtTime`、`o.getName`。 源码 eyes/src/engine/components/TrailComponent.js:433；参数 (t, e, i)。

### `eyes/src/engine/components/WMTSComponent.js`

解析 WMTS 能力文档并按矩阵/图层/维度递归加载地理瓦片，叠加球面影像。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ../core/Capabilities-584.js`。
- 证据：`WMTSComponent extends Pioneer.BaseComponent @4`。
- 证据：`WMTSTile extends Pioneer.Tile @271`。

#### WMTSComponent

解析 WMTS 能力文档并按矩阵/图层/维度递归加载地理瓦片，叠加球面影像。 继承：`Pioneer.BaseComponent`。源码 [eyes/src/engine/components/WMTSComponent.js:4](../../eyes/src/engine/components/WMTSComponent.js#L4)。

- `constructor(t, e)`：【结构证据】写入 `_atmosphereComponentRef`、`_cameraFieldsOfView`、`_cameraPositions`、`_capabilities`、`_dimensionValues`、`_endPoint`、`_engine`、`_layer`；调用 `new Map`、`new Pioneer.ComponentRef`、`new Pioneer.FastSet`、`new Set`、`super`、`this.__setUsesEntityOrientation`。 源码 eyes/src/engine/components/WMTSComponent.js:5；参数 (t, e)。
- `getEndPoint()`：【结构证据】返回 `this._endPoint`。 源码 eyes/src/engine/components/WMTSComponent.js:35；参数 ()。
- `setEndPoint(endPoint)`：【结构证据】写入 `_endPoint`；调用 `this.resetResources`。 源码 eyes/src/engine/components/WMTSComponent.js:38；参数 (endPoint)。
- `getLayer()`：【结构证据】返回 `this._layerIdentifier`。 源码 eyes/src/engine/components/WMTSComponent.js:42；参数 ()。
- `setLayer(layerIdentifier)`：【结构证据】写入 `_layerIdentifier`；调用 `this.resetResources`。 源码 eyes/src/engine/components/WMTSComponent.js:45；参数 (layerIdentifier)。
- `getTileMatrixSet()`：【结构证据】返回 `this._tileMatrixSetIdentifier`。 源码 eyes/src/engine/components/WMTSComponent.js:49；参数 ()。
- `setTileMatrixSet(tileMatrixSetIdentifier)`：【结构证据】写入 `_tileMatrixSetIdentifier`；调用 `this.resetResources`。 源码 eyes/src/engine/components/WMTSComponent.js:52；参数 (tileMatrixSetIdentifier)。
- `getStyle()`：【结构证据】返回 `this._style`。 源码 eyes/src/engine/components/WMTSComponent.js:56；参数 ()。
- `setStyle(style)`：【结构证据】写入 `_style`；调用 `this.resetResources`。 源码 eyes/src/engine/components/WMTSComponent.js:59；参数 (style)。
- `getDimensionValue(t)`：【结构证据】返回 `this._dimensionValues.get(t)`；调用 `this._dimensionValues.get`。 源码 eyes/src/engine/components/WMTSComponent.js:63；参数 (t)。
- `setDimensionValue(t, e)`：【结构证据】调用 `this._dimensionValues.set`、`this.resetResources`。 源码 eyes/src/engine/components/WMTSComponent.js:66；参数 (t, e)。
- `getLayers()`：【结构证据】返回 `null!==this._capabilities?this._capabilities.layers:new Map()`；调用 `new Map`。 源码 eyes/src/engine/components/WMTSComponent.js:70；参数 ()。
- `getMinLevel()`：【结构证据】返回 `this._minLevel`。 源码 eyes/src/engine/components/WMTSComponent.js:73；参数 ()。
- `setMinLevel(minLevel)`：【结构证据】写入 `_minLevel`。 源码 eyes/src/engine/components/WMTSComponent.js:76；参数 (minLevel)。
- `getMaxLevel()`：【结构证据】返回 `this._maxLevel`。 源码 eyes/src/engine/components/WMTSComponent.js:79；参数 ()。
- `setMaxLevel(maxLevel)`：【结构证据】写入 `_maxLevel`。 源码 eyes/src/engine/components/WMTSComponent.js:82；参数 (maxLevel)。
- `isMaterialOptionEnabled(t)`：【结构证据】返回 `this._materialOptions.has(t)`；调用 `this._materialOptions.has`。 源码 eyes/src/engine/components/WMTSComponent.js:85；参数 (t)。
- `setMaterialOption(t, e)`：【结构证据】调用 `this._materialOptions.add`、`this._materialOptions.delete`、`this._materialOptions.has`、`this.getThreeJsMaterials`。 源码 eyes/src/engine/components/WMTSComponent.js:88；参数 (t, e)。
- `getTilesLoadedPromise()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/components/WMTSComponent.js:106；参数 ()。
- `setSpheroidReference(t)`：【结构证据】调用 `this._spheroidComponentRef.set`、`this.getEntity`、`this.getEntity().getName`。 源码 eyes/src/engine/components/WMTSComponent.js:109；参数 (t)。
- `__getLayer()`：【结构证据】返回 `this._layer`。 源码 eyes/src/engine/components/WMTSComponent.js:112；参数 ()。
- `__getTileMatrixSet()`：【结构证据】返回 `this._tileMatrixSet`。 源码 eyes/src/engine/components/WMTSComponent.js:115；参数 ()。
- `__getTileUrl()`：【结构证据】返回 `this._tileUrl`。 源码 eyes/src/engine/components/WMTSComponent.js:118；参数 ()。
- `__getMaxLevel()`：【结构证据】返回 `this._maxLevel`。 源码 eyes/src/engine/components/WMTSComponent.js:121；参数 ()。
- `__getMinLevel()`：【结构证据】返回 `this._minLevel`。 源码 eyes/src/engine/components/WMTSComponent.js:124；参数 ()。
- `__getSplitJoinFactor()`：【结构证据】返回 `this._splitJoinThresholdFactor`。 源码 eyes/src/engine/components/WMTSComponent.js:127；参数 ()。
- `__getLoadsThisFrame()`：【结构证据】返回 `this._loadsThisFrame`。 源码 eyes/src/engine/components/WMTSComponent.js:130；参数 ()。
- `__incLoadsThisFrame()`：【结构证据】写入 `_loadsThisFrame`。 源码 eyes/src/engine/components/WMTSComponent.js:133；参数 ()。
- `__getCameraPositions()`：【结构证据】返回 `this._cameraPositions`。 源码 eyes/src/engine/components/WMTSComponent.js:136；参数 ()。
- `__getCameraFieldsOfView()`：【结构证据】返回 `this._cameraFieldsOfView`。 源码 eyes/src/engine/components/WMTSComponent.js:139；参数 ()。
- `__getSpheroidComponent()`：【结构证据】返回 `this._spheroidComponentRef.get()`；调用 `this._spheroidComponentRef.get`。 源码 eyes/src/engine/components/WMTSComponent.js:142；参数 ()。
- `__getMaterialOptions()`：【结构证据】返回 `this._materialOptions`。 源码 eyes/src/engine/components/WMTSComponent.js:145；参数 ()。
- `__addLoadedTile(t)`：【结构证据】调用 `this._loadedTiles.add`。 源码 eyes/src/engine/components/WMTSComponent.js:148；参数 (t)。
- `__removeLoadedTile(t)`：【结构证据】调用 `this._loadedTiles.delete`。 源码 eyes/src/engine/components/WMTSComponent.js:151；参数 (t)。
- `__destroy()`：【结构证据】调用 `super.__destroy`、`t.removeChangedCallback`、`this._spheroidComponentRef.get`。 源码 eyes/src/engine/components/WMTSComponent.js:154；参数 ()。
- `__update()`：【结构证据】写入 `_cameraFieldsOfView[t]`、`_loadsThisFrame`、`_tilesLoadedPromise`、`_transitionsCompleteCallback`；返回 `void`；调用 `e.rotateInverse`、`i.getEntity`、`i.getEntity().getPositionRelativeToEntity`、`i.getFieldOfView`、`new Pioneer.Vector3`、`new Promise`。 源码 eyes/src/engine/components/WMTSComponent.js:159；参数 ()。
- `__prepareForRender(t)`：【结构证据】调用 `Pioneer.MaterialUtils.setUniforms`、`Pioneer.ThreeJsHelper.setOrientationToEntity`、`Pioneer.ThreeJsHelper.setPositionToEntity`、`this._atmosphereComponentRef.get`、`this._loadedTiles.getAt`、`this._loadedTiles.getAt(t).prepareForRender`。 源码 eyes/src/engine/components/WMTSComponent.js:185；参数 (t)。
- `__loadResources()`：【结构证据】写入 `_capabilities`、`_layer`、`_rootTile`、`_tileMatrixSet`、`_tileUrl`；返回 `void(this._capabilities=null)` 或 `void`；调用 `new Capabilities.Capabilities`、`new Error`、`new Pioneer.Rect`、`new WMTSTile`、`rect.copy`、`this._capabilities.getLayer`；含显式错误分支。 源码 eyes/src/engine/components/WMTSComponent.js:192；参数 ()。
- `__unloadResources()`：【结构证据】写入 `_capabilities`、`_layer`、`_rootTile`、`_tileMatrixSet`、`_tileUrl`；调用 `this._rootTile.destroy`。 源码 eyes/src/engine/components/WMTSComponent.js:229；参数 ()。
- `_spheroidRefChangedCallback(t, e)`：【结构证据】调用 `e.addChangedCallback`、`t.removeChangedCallback`、`this._spheroidChangedCallback`。 源码 eyes/src/engine/components/WMTSComponent.js:236；参数 (t, e)。
- `_spheroidChangedCallback()`：【结构证据】调用 `Math.max`、`t.getEquatorialRadius`、`t.getPolarRadius`、`this.__setRadius`、`this._spheroidComponentRef.get`、`this.resetResources`。 源码 eyes/src/engine/components/WMTSComponent.js:241；参数 ()。

#### WMTSTile

WMTS 地理子瓦片：按矩阵行列下载影像并控制球面瓦片显示。 继承：`Pioneer.Tile`。源码 [eyes/src/engine/components/WMTSComponent.js:271](../../eyes/src/engine/components/WMTSComponent.js#L271)。

- `constructor(component, e, level, row, col, r)`：【结构证据】写入 `_center`、`_col`、`_component`、`_level`、`_radius`、`_row`、`_threeJsMaterial`、`_threeJsObject`；调用 `component.__getSpheroidComponent`、`new Error`、`new Pioneer.Rect`、`new Pioneer.Vector3`、`super`、`this._component.__getTileMatrixSet`；含显式错误分支。 源码 eyes/src/engine/components/WMTSComponent.js:272；参数 (component, e, level, row, col, r)。
- `createNewTile(t, e, i)`：【结构证据】返回 `null` 或 `new WMTSTile(t._component,t,n,o,r,rect)`；调用 `a.getNumTiles`、`new Pioneer.Rect`、`new WMTSTile`、`rect.origin.set`、`rect.size.set`、`t._component.__getTileMatrixSet`。 源码 eyes/src/engine/components/WMTSComponent.js:288；参数 (t, e, i)。
- `checkSplit()`：【结构证据】返回 `false` 或 `!(!e||!this._tileBounds.intersects(e))&&!(this._level>=this._component.__getMaxLevel())&&!(this._component.__getLoadsThisFrame()>=4)&&(this._level<thi`；调用 `this._component.__getLoadsThisFrame`、`this._component.__getMaxLevel`、`this._component.__getMinLevel`、`this._component.__getSplitJoinFactor`、`this._component.__getTileMatrixSet`、`this._getNearestDistance`。 源码 eyes/src/engine/components/WMTSComponent.js:301；参数 ()。
- `checkJoin()`：【结构证据】返回 `false` 或 `true`；调用 `this._component.__getLoadsThisFrame`、`this._component.__getMaxLevel`、`this._component.__getMinLevel`、`this._component.__getSplitJoinFactor`、`this._component.__getTileMatrixSet`、`this._getNearestDistance`。 源码 eyes/src/engine/components/WMTSComponent.js:307；参数 ()。
- `load()`：【结构证据】写入 `_radius`、`_threeJsMaterial`、`_threeJsMaterial.defines[t]`、`_threeJsMaterial.uniforms.colorTexture.value`、`_threeJsObject`；返回 `void` 或 `void Pioneer.ThreeJsHelper.destroyMaterial(this._threeJsMaterial,false)`；调用 `E.distance`、`E.set`、`Math.floor`、`Math.max`、`Math.min`、`Pioneer.MaterialUtils.get`；含显式错误分支。 源码 eyes/src/engine/components/WMTSComponent.js:315；参数 ()。
- `unload()`：【结构证据】写入 `_threeJsMaterial`、`_threeJsObject`；返回 `void`；调用 `Pioneer.ThreeJsHelper.destroyMaterial`、`Pioneer.ThreeJsHelper.destroyObject`、`t.splice`、`this._component.__removeLoadedTile`、`this._component.getEngine`、`this._component.getEngine().getResourceManager`。 源码 eyes/src/engine/components/WMTSComponent.js:415；参数 ()。
- `prepareForRender()`：【结构证据】写入 `_threeJsObject.visible`。 源码 eyes/src/engine/components/WMTSComponent.js:437；参数 ()。
- `setVisible(visible)`：【结构证据】写入 `_threeJsObject.visible`、`_visible`。 源码 eyes/src/engine/components/WMTSComponent.js:440；参数 (visible)。
- `update()`：【结构证据】返回 `t`；调用 `e[i].update`、`this.check`、`this.getChildren`。 源码 eyes/src/engine/components/WMTSComponent.js:444；参数 ()。
- `_getNearestDistance()`：【结构证据】返回 `t`；调用 `Math.max`、`Math.tan`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`n.magnitude`、`n.sub`。 源码 eyes/src/engine/components/WMTSComponent.js:450；参数 ()。
- `method toString()`：【结构证据】本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/components/WMTSComponent.js:682；参数 ()。

### `eyes/src/engine/controllers/AlignController.js`

依据主/次轴和目标的点向、速度或轴向约束计算实体姿态，并登记目标状态依赖。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`AlignController extends PioneerPublicApi.BaseController @3`。

#### AlignController

依据主/次轴和目标的点向、速度或轴向约束计算实体姿态，并登记目标状态依赖。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/AlignController.js:3](../../eyes/src/engine/controllers/AlignController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_joint`、`_jointObject`、`_model`、`_modelRootId`、`_primaryAlignType`、`_primaryAxis`、`_primaryTargetAxis`、`_primaryTargetEntity`；调用 `new PioneerPublicApi.EntityRef`、`new PioneerPublicApi.Vector3`、`super`、`this._addDependentStates`、`this._primaryTargetEntity.setRefChangedCallback`、`this._removeDependentStates`。 源码 eyes/src/engine/controllers/AlignController.js:4；参数 (t, e)。
- `getPrimaryAlignType()`：【结构证据】返回 `this._primaryAlignType`。 源码 eyes/src/engine/controllers/AlignController.js:28；参数 ()。
- `setPrimaryAlignType(primaryAlignType)`：【结构证据】写入 `_primaryAlignType`；返回 `void`；调用 `this._addDependentStates`、`this._primaryTargetEntity.get`、`this._removeDependentStates`。 源码 eyes/src/engine/controllers/AlignController.js:31；参数 (primaryAlignType)。
- `getPrimaryAxis()`：【结构证据】返回 `this._primaryAxis`。 源码 eyes/src/engine/controllers/AlignController.js:38；参数 ()。
- `setPrimaryAxis(t)`：【结构证据】调用 `this._primaryAxis.copy`。 源码 eyes/src/engine/controllers/AlignController.js:41；参数 (t)。
- `getPrimaryTargetEntity()`：【结构证据】返回 `this._primaryTargetEntity.getName()`；调用 `this._primaryTargetEntity.getName`。 源码 eyes/src/engine/controllers/AlignController.js:44；参数 ()。
- `setPrimaryTargetEntity(t)`：【结构证据】调用 `this._primaryTargetEntity.setName`。 源码 eyes/src/engine/controllers/AlignController.js:47；参数 (t)。
- `getPrimaryTargetAxis()`：【结构证据】返回 `this._primaryTargetAxis`。 源码 eyes/src/engine/controllers/AlignController.js:50；参数 ()。
- `setPrimaryTargetAxis(t)`：【结构证据】调用 `this._primaryTargetAxis.copy`。 源码 eyes/src/engine/controllers/AlignController.js:53；参数 (t)。
- `getSecondaryAlignType()`：【结构证据】返回 `this._secondaryAlignType`。 源码 eyes/src/engine/controllers/AlignController.js:56；参数 ()。
- `setSecondaryAlignType(secondaryAlignType)`：【结构证据】写入 `_secondaryAlignType`；返回 `void`；调用 `this._addDependentStates`、`this._removeDependentStates`、`this._secondaryTargetEntity.get`。 源码 eyes/src/engine/controllers/AlignController.js:59；参数 (secondaryAlignType)。
- `getSecondaryAxis()`：【结构证据】返回 `this._secondaryAxis`。 源码 eyes/src/engine/controllers/AlignController.js:66；参数 ()。
- `setSecondaryAxis(t)`：【结构证据】调用 `this._secondaryAxis.copy`。 源码 eyes/src/engine/controllers/AlignController.js:69；参数 (t)。
- `getSecondaryTargetEntity()`：【结构证据】返回 `this._secondaryTargetEntity.getName()`；调用 `this._secondaryTargetEntity.getName`。 源码 eyes/src/engine/controllers/AlignController.js:72；参数 ()。
- `setSecondaryTargetEntity(t)`：【结构证据】调用 `this._secondaryTargetEntity.setName`。 源码 eyes/src/engine/controllers/AlignController.js:75；参数 (t)。
- `getSecondaryTargetAxis()`：【结构证据】返回 `this._secondaryTargetAxis`。 源码 eyes/src/engine/controllers/AlignController.js:78；参数 ()。
- `setSecondaryTargetAxis(t)`：【结构证据】调用 `this._secondaryTargetAxis.copy`。 源码 eyes/src/engine/controllers/AlignController.js:81；参数 (t)。
- `setJoint(joint, model)`：【结构证据】写入 `_joint`、`_model`；调用 `this.addDependentState`、`this.addModifiedState`、`this.getEntity`、`this.getEntity().getComponent`、`this.getEntity().getName`、`this.removeDependentState`。 源码 eyes/src/engine/controllers/AlignController.js:84；参数 (joint, model)。
- `__updateOrientationAtTime(t, e)`：【结构证据】调用 `this._getOrientation`。 源码 eyes/src/engine/controllers/AlignController.js:91；参数 (t, e)。
- `__update()`：【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`t.copy`、`t.isNaN`、`this._getOrientation`、`this._jointObject.quaternion.set`。 源码 eyes/src/engine/controllers/AlignController.js:94；参数 ()。
- `_getOrientation(t, e)`：【结构证据】写入 `_jointObject`、`_modelRootId`；返回 `void` 或 `void PioneerPublicApi.Quaternion.pool.release(n)`；调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Quaternion.threeJsPool.get`、`PioneerPublicApi.Quaternion.threeJsPool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`。 源码 eyes/src/engine/controllers/AlignController.js:101；参数 (t, e)。
- `_getAxis(t, e, i, n, o, r)`：【结构证据】返回 `void t.copy(PioneerPublicApi.Vector3.NaN)`；调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`a.getOrientationAtTime`、`a.getPosition`、`a.getPositionRelativeToEntity`、`a.getVelocityAtTime`。 源码 eyes/src/engine/controllers/AlignController.js:159；参数 (t, e, i, n, o, r)。
- `_removeDependentStates(t, e)`：【结构证据】调用 `t.getName`、`this.getEntity`、`this.getEntity().getName`、`this.removeDependentState`。 源码 eyes/src/engine/controllers/AlignController.js:180；参数 (t, e)。
- `_addDependentStates(t, e)`：【结构证据】调用 `t.getName`、`this.addDependentState`、`this.getEntity`、`this.getEntity().getName`。 源码 eyes/src/engine/controllers/AlignController.js:183；参数 (t, e)。

### `eyes/src/engine/controllers/BaseController.js`

向场景依赖图登记控制器，声明覆盖时间、被修改状态与所依赖实体状态。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`BaseController extends PioneerPublicApi.EntityItem @3`。

#### BaseController

向场景依赖图登记控制器，声明覆盖时间、被修改状态与所依赖实体状态。 继承：`PioneerPublicApi.EntityItem`。源码 [eyes/src/engine/controllers/BaseController.js:3](../../eyes/src/engine/controllers/BaseController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_coverage`、`_dependentStates`、`_modifiedStates`；调用 `new PioneerPublicApi.Interval`、`new Set`、`super`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getControllerDependencyGraph`。 源码 eyes/src/engine/controllers/BaseController.js:4；参数 (t, e)。
- `__destroy()`：【结构证据】调用 `super.__destroy`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getControllerDependencyGraph`、`this.getEntity().getScene().getControllerDependencyGraph().removeItem`。 源码 eyes/src/engine/controllers/BaseController.js:11；参数 ()。
- `addModifiedState(t)`：【结构证据】调用 `this._modifiedStates.add`、`this._modifiedStates.has`、`this.getEntity`、`this.getEntity().__updateCoverage`、`this.getEntity().getScene`、`this.getEntity().getScene().getControllerDependencyGraph`。 源码 eyes/src/engine/controllers/BaseController.js:15；参数 (t)。
- `removeModifiedState(t)`：【结构证据】调用 `this._modifiedStates.delete`、`this.getEntity`、`this.getEntity().__updateCoverage`、`this.getEntity().getScene`、`this.getEntity().getScene().getControllerDependencyGraph`、`this.getEntity().getScene().getControllerDependencyGraph().needsSorting`。 源码 eyes/src/engine/controllers/BaseController.js:18；参数 (t)。
- `hasModifiedState(t)`：【结构证据】返回 `this._modifiedStates.has(t)`；调用 `this._modifiedStates.has`。 源码 eyes/src/engine/controllers/BaseController.js:21；参数 (t)。
- `addDependentState(t, e)`：【结构证据】调用 `this._dependentStates.add`、`this._dependentStates.has`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getControllerDependencyGraph`、`this.getEntity().getScene().getControllerDependencyGraph().needsSorting`。 源码 eyes/src/engine/controllers/BaseController.js:24；参数 (t, e)。
- `removeDependentState(t, e)`：【结构证据】调用 `this._dependentStates.delete`、`this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getControllerDependencyGraph`、`this.getEntity().getScene().getControllerDependencyGraph().needsSorting`。 源码 eyes/src/engine/controllers/BaseController.js:27；参数 (t, e)。
- `hasDependentState(t, e)`：【结构证据】返回 `this._dependentStates.has(`${t}.${e}`)`；调用 `this._dependentStates.has`。 源码 eyes/src/engine/controllers/BaseController.js:30；参数 (t, e)。
- `__getModifiedStates()`：【结构证据】返回 `this._modifiedStates`。 源码 eyes/src/engine/controllers/BaseController.js:33；参数 ()。
- `getCoverage()`：【结构证据】返回 `this._coverage`。 源码 eyes/src/engine/controllers/BaseController.js:36；参数 ()。
- `setCoverage(t)`：【结构证据】调用 `this._coverage.copy`、`this.getEntity`、`this.getEntity().__updateCoverage`。 源码 eyes/src/engine/controllers/BaseController.js:39；参数 (t)。
- `__updatePositionAtTime(t, e)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/controllers/BaseController.js:43；参数 (t, e)。
- `__updateVelocityAtTime(t, e)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/controllers/BaseController.js:44；参数 (t, e)。
- `__updateOrientationAtTime(t, e)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/controllers/BaseController.js:45；参数 (t, e)。
- `method toString()`：【结构证据】本访问器没有 AST 可见的 this 字段直接赋值；调用 `this.getEntity`、`this.getEntity().getControllerAt`、`this.getEntity().getName`、`this.getEntity().getNumControllers`。源码 eyes/src/engine/controllers/BaseController.js:113；参数 ()。

### `eyes/src/engine/controllers/CoverageController.js`

在时间覆盖进入/退出与更新时调用用户函数，管理更新间隔。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`CoverageController extends PioneerPublicApi.BaseController @3`。

#### CoverageController

在时间覆盖进入/退出与更新时调用用户函数，管理更新间隔。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/CoverageController.js:3](../../eyes/src/engine/controllers/CoverageController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `active`、`coverage`、`enterFunction`、`exitFunction`、`lastUpdateTime`、`updateFunction`、`updateInterval`；调用 `new PioneerPublicApi.Interval`、`super`。 源码 eyes/src/engine/controllers/CoverageController.js:4；参数 (t, e)。
- `setCoverage(t)`：【结构证据】调用 `this.coverage.copy`。 源码 eyes/src/engine/controllers/CoverageController.js:14；参数 (t)。
- `setEnterFunction(enterFunction)`：【结构证据】写入 `enterFunction`。 源码 eyes/src/engine/controllers/CoverageController.js:17；参数 (enterFunction)。
- `setExitFunction(exitFunction)`：【结构证据】写入 `exitFunction`。 源码 eyes/src/engine/controllers/CoverageController.js:20；参数 (exitFunction)。
- `setUpdateFunction(updateFunction)`：【结构证据】写入 `updateFunction`。 源码 eyes/src/engine/controllers/CoverageController.js:23；参数 (updateFunction)。
- `setUpdateInterval(t)`：【结构证据】写入 `updateInterval`。 源码 eyes/src/engine/controllers/CoverageController.js:26；参数 (t)。
- `__update()`：【结构证据】写入 `active`、`lastUpdateTime`；调用 `Date.now`、`i.coverage.contains`、`i.exitFunction`、`this.coverage.contains`、`this.enterFunction`、`this.getClassIndex`。 源码 eyes/src/engine/controllers/CoverageController.js:29；参数 ()。

### `eyes/src/engine/controllers/DynamoController.js`

读取 Dynamo v1/v2 定义与分层时间块，按五类样本插值驱动实体运动和姿态。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`Point @3`。
- 证据：`PosPoint extends Point @18`。
- 证据：`LinPoint extends Point @68`。
- 证据：`OriPoint extends Point @104`。
- 证据：`QuatPoint extends Point @152`。
- 证据：`OrbPoint extends Point @181`。
- 证据：`PointSet @245`。
- 证据：`DynamoController extends PioneerPublicApi.BaseController @384`。

#### Point

Dynamo 时间样本协议基类：读取 time，定义计算、应用与无效化钩子，由具体点类型实现状态计算。 继承：`无显式继承`。源码 [eyes/src/engine/controllers/DynamoController.js:3](../../eyes/src/engine/controllers/DynamoController.js#L3)。

- `constructor()`：【结构证据】写入 `time`。 源码 eyes/src/engine/controllers/DynamoController.js:5；参数 ()。
- `load(t)`：从 Reader 读取样本时间 Float64；该基类本身不产生实体状态。 源码 eyes/src/engine/controllers/DynamoController.js:8；参数 (t)。
- `calculate(t, e, i, s)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/controllers/DynamoController.js:11；参数 (t, e, i, s)。
- `apply(t)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/controllers/DynamoController.js:12；参数 (t)。
- `setNaN(t)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/controllers/DynamoController.js:13；参数 (t)。
- `readHeader(t)`：【结构证据】返回 `{}`。 源码 eyes/src/engine/controllers/DynamoController.js:14；参数 (t)。

#### PosPoint

带位置和速度的 Hermite 动力学样本。 继承：`Point`。源码 [eyes/src/engine/controllers/DynamoController.js:18](../../eyes/src/engine/controllers/DynamoController.js#L18)。

- `constructor()`：【结构证据】写入 `position`、`velocity`；调用 `new PioneerPublicApi.Vector3`、`super`。 源码 eyes/src/engine/controllers/DynamoController.js:21；参数 ()。
- `load(t)`：依次读取 time、position.xyz、velocity.xyz，全部为 Float64；可从字段读取数证明每点 56 字节。 源码 eyes/src/engine/controllers/DynamoController.js:26；参数 (t)。
- `calculate(t, time, i, s)`：以两端位置和速度做三次 Hermite 插值：归一化时间 u=(time-t0)/duration，速度项乘 duration；输出速度是同一多项式对时间的导数。 源码 eyes/src/engine/controllers/DynamoController.js:31；参数 (t, time, i, s)。
- `apply(t)`：【结构证据】调用 `t.setPosition`、`t.setVelocity`。 源码 eyes/src/engine/controllers/DynamoController.js:56；参数 (t)。
- `setNaN(t)`：【结构证据】调用 `t.setPosition`、`t.setVelocity`。 源码 eyes/src/engine/controllers/DynamoController.js:60；参数 (t)。
- `readHeader(t)`：【结构证据】返回 `{}`。 源码 eyes/src/engine/controllers/DynamoController.js:64；参数 (t)。

#### LinPoint

只带位置的线性样本。 继承：`Point`。源码 [eyes/src/engine/controllers/DynamoController.js:68](../../eyes/src/engine/controllers/DynamoController.js#L68)。

- `constructor()`：【结构证据】写入 `position`、`velocity`；调用 `new PioneerPublicApi.Vector3`、`super`。 源码 eyes/src/engine/controllers/DynamoController.js:71；参数 ()。
- `load(t)`：读取 time 和 position.xyz（32 字节），速度初始化为零。 源码 eyes/src/engine/controllers/DynamoController.js:76；参数 (t)。
- `calculate(t, time, i, n)`：夹紧归一化时间后线性混合位置，速度为端点差/时间差；非递增时间退回右端位置与零速度。 源码 eyes/src/engine/controllers/DynamoController.js:81；参数 (t, time, i, n)。
- `apply(t)`：【结构证据】调用 `t.setPosition`、`t.setVelocity`。 源码 eyes/src/engine/controllers/DynamoController.js:92；参数 (t)。
- `setNaN(t)`：【结构证据】调用 `t.setPosition`、`t.setVelocity`。 源码 eyes/src/engine/controllers/DynamoController.js:96；参数 (t)。
- `readHeader(t)`：【结构证据】返回 `{}`。 源码 eyes/src/engine/controllers/DynamoController.js:100；参数 (t)。

#### OriPoint

带角速度的姿态样本。 继承：`Point`。源码 [eyes/src/engine/controllers/DynamoController.js:104](../../eyes/src/engine/controllers/DynamoController.js#L104)。

- `constructor()`：【结构证据】写入 `angularVelocity`、`orientation`；调用 `new PioneerPublicApi.Quaternion`、`new PioneerPublicApi.Vector3`、`super`。 源码 eyes/src/engine/controllers/DynamoController.js:107；参数 ()。
- `load(t)`：读取 time、四元数四个分量、角速度.xyz（64 字节），分量顺序以 Quaternion 构造调用为依据。 源码 eyes/src/engine/controllers/DynamoController.js:112；参数 (t)。
- `calculate(t, time, i, n)`：分别用两端角速度外推到目标时间，再对投影四元数 slerp；角速度 slerp 后取负并转到插值姿态空间。临时向量/四元数须归还池。 源码 eyes/src/engine/controllers/DynamoController.js:117；参数 (t, time, i, n)。
- `apply(t)`：【结构证据】调用 `t.setAngularVelocity`、`t.setOrientation`。 源码 eyes/src/engine/controllers/DynamoController.js:131；参数 (t)。
- `_project(t, e, i)`：由 angularVelocity 的方向/模长和时间差建立轴角旋转；incremental 决定与传入累计姿态相乘还是直接写投影姿态。 源码 eyes/src/engine/controllers/DynamoController.js:135；参数 (t, e, i)。
- `setNaN(t)`：【结构证据】调用 `t.setAngularVelocity`、`t.setOrientation`。 源码 eyes/src/engine/controllers/DynamoController.js:144；参数 (t)。
- `readHeader(t)`：【结构证据】返回 `{}`。 源码 eyes/src/engine/controllers/DynamoController.js:148；参数 (t)。

#### QuatPoint

仅四元数姿态样本。 继承：`Point`。源码 [eyes/src/engine/controllers/DynamoController.js:152](../../eyes/src/engine/controllers/DynamoController.js#L152)。

- `constructor()`：【结构证据】写入 `angularVelocity`、`orientation`；调用 `new PioneerPublicApi.Quaternion`、`new PioneerPublicApi.Vector3`、`super`。 源码 eyes/src/engine/controllers/DynamoController.js:155；参数 ()。
- `load(t)`：只读取 time 和四元数四分量（40 字节）。 源码 eyes/src/engine/controllers/DynamoController.js:160；参数 (t)。
- `calculate(t, time, i, n)`：夹紧目标时间比例后在端点四元数间 slerp；apply 总把角速度写零。 源码 eyes/src/engine/controllers/DynamoController.js:164；参数 (t, time, i, n)。
- `apply(t)`：【结构证据】调用 `t.setAngularVelocity`、`t.setOrientation`。 源码 eyes/src/engine/controllers/DynamoController.js:169；参数 (t)。
- `setNaN(t)`：【结构证据】调用 `t.setAngularVelocity`、`t.setOrientation`。 源码 eyes/src/engine/controllers/DynamoController.js:173；参数 (t)。
- `readHeader(t)`：【结构证据】返回 `{}`。 源码 eyes/src/engine/controllers/DynamoController.js:177；参数 (t)。

#### OrbPoint

带轨道元素的传播样本。 继承：`Point`。源码 [eyes/src/engine/controllers/DynamoController.js:181](../../eyes/src/engine/controllers/DynamoController.js#L181)。

- `constructor()`：【结构证据】写入 `oe`、`position`、`velocity`；调用 `new PioneerPublicApi.OrbitalElements`、`new PioneerPublicApi.Vector3`、`super`。 源码 eyes/src/engine/controllers/DynamoController.js:185；参数 ()。
- `load(t)`：以样本时间为 epoch，读取半长轴、偏心率、平均角运动、历元平近点角与轨道姿态四元数（72 字节）。 源码 eyes/src/engine/controllers/DynamoController.js:191；参数 (t)。
- `calculate(t, time, i, n)`：分别传播左右两组轨道元素至同一目标时刻，再按时间比例线性混合位置和速度；不是简单直接插值轨道元素后传播。 源码 eyes/src/engine/controllers/DynamoController.js:200；参数 (t, time, i, n)。
- `apply(t)`：【结构证据】调用 `t.setPosition`、`t.setVelocity`。 源码 eyes/src/engine/controllers/DynamoController.js:217；参数 (t)。
- `_project(t, e, i, n, o)`：OrbitalElements.project 得相对轨道状态，body=1/2 时按两引力参数比例拆分成质心两侧状态；incremental 时将传播位置加到输出已有值。 源码 eyes/src/engine/controllers/DynamoController.js:221；参数 (t, e, i, n, o)。
- `setNaN(t)`：【结构证据】调用 `t.setPosition`、`t.setVelocity`。 源码 eyes/src/engine/controllers/DynamoController.js:234；参数 (t)。
- `readHeader(t)`：轨道点类型头额外读取 gravitationalParameter1 与 gravitationalParameter2 两个 Float64。 源码 eyes/src/engine/controllers/DynamoController.js:238；参数 (t)。

#### PointSet

分层 Dynamo 时间块；索引块定位叶块，叶块保存相邻可插值样本。 继承：`无显式继承`。源码 [eyes/src/engine/controllers/DynamoController.js:245](../../eyes/src/engine/controllers/DynamoController.js#L245)。

- `constructor(PointClass, version, numberOfDigits, name)`：【结构证据】写入 `_PointClass`、`_accessedTime`、`_hintIndex`、`_interval`、`_loadedState`、`_name`、`_numberOfDigits`、`_pointSets`；调用 `new PioneerPublicApi.Interval`。 源码 eyes/src/engine/controllers/DynamoController.js:246；参数 (PointClass, version, numberOfDigits, name)。
- `getName()`：【结构证据】返回 `this._name`。 源码 eyes/src/engine/controllers/DynamoController.js:258；参数 ()。
- `getInterval()`：【结构证据】返回 `this._interval`。 源码 eyes/src/engine/controllers/DynamoController.js:261；参数 ()。
- `getLoadedState()`：【结构证据】返回 `this._loadedState`。 源码 eyes/src/engine/controllers/DynamoController.js:264；参数 ()。
- `getLoadedTime()`：【结构证据】返回 `this._accessedTime`。 源码 eyes/src/engine/controllers/DynamoController.js:267；参数 ()。
- `hasPointSets()`：【结构证据】返回 `0!==this._pointSets.length`。 源码 eyes/src/engine/controllers/DynamoController.js:270；参数 ()。
- `hasPoints()`：【结构证据】返回 `0!==this._points.length`。 源码 eyes/src/engine/controllers/DynamoController.js:273；参数 ()。
- `load(t)`：v1 def/v2 先读取叶标记。叶节点读取点数和样本；索引节点读取子块起点/范围。v2 最后一个起点只作右边界哨兵，删去对应空子块。 源码 eyes/src/engine/controllers/DynamoController.js:276；参数 (t)。
- `loadFromUrl(t, e, i, n)`：【结构证据】写入 `_loadedState`；调用 `n.add`、`n.delete`、`new PioneerPublicApi.Reader`、`t.download`、`t.download(o,"binary",i).finally`、`this.load`；含显式错误分支。 源码 eyes/src/engine/controllers/DynamoController.js:303；参数 (t, e, i, n)。
- `unloadOldPointSet()`：深度遍历已载入子块，一次最多卸载一个超过 15000ms 未访问的子树；根定义保持。 源码 eyes/src/engine/controllers/DynamoController.js:316；参数 ()。
- `unload()`：【结构证据】写入 `_accessedTime`、`_loadedState`、`_pointSets`、`_points`。 源码 eyes/src/engine/controllers/DynamoController.js:329；参数 ()。
- `getPointSet(t)`：优先命中 hintIndex 及邻块，否则二分定位 interval.min；访问即更新 _accessedTime。 源码 eyes/src/engine/controllers/DynamoController.js:335；参数 (t)。
- `getPoints(t, e)`：返回夹住查询时间的相邻两个样本，先尝试缓存 hintIndex 及邻居，失败才二分；依赖叶节点至少有两点且时间有序。 源码 eyes/src/engine/controllers/DynamoController.js:349；参数 (t, e)。

#### DynamoController

读取 Dynamo v1/v2 定义与分层时间块，按五类样本插值驱动实体运动和姿态。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/DynamoController.js:384](../../eyes/src/engine/controllers/DynamoController.js#L384)。

- `constructor(t, e)`：【结构证据】写入 `_PointClass`、`_baseUrl`、`_currentDownloads`、`_downloader`、`_header`、`_incremental`、`_lastPoints`、`_numberOfDigits`；调用 `e.getScene`、`e.getScene().getEngine`、`e.getScene().getEngine().getDownloader`、`new PioneerPublicApi.Interval`、`new PosPoint`、`new Set`。 源码 eyes/src/engine/controllers/DynamoController.js:385；参数 (t, e)。
- `getPointType()`：【结构证据】返回 `this._pointType`。 源码 eyes/src/engine/controllers/DynamoController.js:406；参数 ()。
- `getHeaderValue(t)`：【结构证据】返回 `this._header[t]`。 源码 eyes/src/engine/controllers/DynamoController.js:409；参数 (t)。
- `setHeaderValue(t, e)`：【结构证据】写入 `_header[t]`。 源码 eyes/src/engine/controllers/DynamoController.js:412；参数 (t, e)。
- `isIncremental()`：【结构证据】返回 `this._incremental`。 源码 eyes/src/engine/controllers/DynamoController.js:415；参数 ()。
- `setIncremental(incremental)`：【结构证据】写入 `_incremental`。 源码 eyes/src/engine/controllers/DynamoController.js:418；参数 (incremental)。
- `getBaseUrl()`：【结构证据】返回 `this._baseUrl`。 源码 eyes/src/engine/controllers/DynamoController.js:421；参数 ()。
- `setBaseUrl(baseUrl)`：取消所有进行中块请求，清理旧类型/覆盖/modifiedStates，规范末尾斜线并重新 _loadDef；异步旧回调没有显式 generation token。 源码 eyes/src/engine/controllers/DynamoController.js:424；参数 (baseUrl)。
- `getTimeOffset()`：【结构证据】返回 `this._timeOffset`。 源码 eyes/src/engine/controllers/DynamoController.js:431；参数 ()。
- `setTimeOffset(t)`：按偏移差平移已发布 coverage；真实查询时间再减 offset，不修改二进制样本时间。 源码 eyes/src/engine/controllers/DynamoController.js:434；参数 (t)。
- `setCoverage(t)`：【结构证据】调用 `PioneerPublicApi.Interval.pool.get`、`PioneerPublicApi.Interval.pool.release`、`e.copy`、`e.intersection`、`new PioneerPublicApi.Interval`、`super.setCoverage`。 源码 eyes/src/engine/controllers/DynamoController.js:443；参数 (t)。
- `getOrbitalElements(t, e)`：对相邻 OrbPoint 的标量元素线性混合，平近点角按角度混合、轨道姿态 slerp；与 OrbPoint.calculate 的位置传播路径不同。 源码 eyes/src/engine/controllers/DynamoController.js:452；参数 (t, e)。
- `getEccentricity(t)`：【结构证据】写入 `_lastPoints[0]`、`_lastPoints[1]`；返回 `PioneerPublicApi.MathUtils.lerp(this._lastPoints[0].oe.eccentricity,this._lastPoints[1].oe.eccentricity,e)` 或 `Number.NaN`；调用 `PioneerPublicApi.MathUtils.clamp01`、`PioneerPublicApi.MathUtils.lerp`、`this._getPointsAtTime`。 源码 eyes/src/engine/controllers/DynamoController.js:465；参数 (t)。
- `getSemiMajorAxis(t)`：【结构证据】写入 `_lastPoints[0]`、`_lastPoints[1]`；返回 `PioneerPublicApi.MathUtils.lerp(this._lastPoints[0].oe.semiMajorAxis,this._lastPoints[1].oe.semiMajorAxis,e)` 或 `Number.NaN`；调用 `PioneerPublicApi.MathUtils.clamp01`、`PioneerPublicApi.MathUtils.lerp`、`this._getPointsAtTime`。 源码 eyes/src/engine/controllers/DynamoController.js:472；参数 (t)。
- `getOrbitOrientation(t, e)`：【结构证据】写入 `_lastPoints[0]`、`_lastPoints[1]`；调用 `PioneerPublicApi.MathUtils.clamp01`、`t.slerp`、`this._getPointsAtTime`。 源码 eyes/src/engine/controllers/DynamoController.js:479；参数 (t, e)。
- `__destroy()`：【结构证据】调用 `super.__destroy`、`this._downloader.cancel`。 源码 eyes/src/engine/controllers/DynamoController.js:485；参数 ()。
- `__updatePositionAtTime(t, e)`：【结构证据】返回 `void t.copy(PioneerPublicApi.Vector3.NaN)`；调用 `t.copy`、`this._getPointsAtTime`、`this._pCalc.calculate`、`this.getCoverage`、`this.getCoverage().contains`。 源码 eyes/src/engine/controllers/DynamoController.js:489；参数 (t, e)。
- `__updateVelocityAtTime(t, e)`：【结构证据】返回 `void t.copy(PioneerPublicApi.Vector3.NaN)`；调用 `t.copy`、`this._getPointsAtTime`、`this._pCalc.calculate`、`this.getCoverage`、`this.getCoverage().contains`。 源码 eyes/src/engine/controllers/DynamoController.js:500；参数 (t, e)。
- `__updateOrientationAtTime(t, e)`：【结构证据】返回 `void t.copy(PioneerPublicApi.Quaternion.NaN)`；调用 `t.copy`、`this._getPointsAtTime`、`this._pCalc.calculate`、`this.getCoverage`、`this.getCoverage().contains`。 源码 eyes/src/engine/controllers/DynamoController.js:511；参数 (t, e)。
- `__update()`：每帧尝试获得新样本并插值；暂未载入时用 _lastPoints 继续推算，根未载入时将四类状态设 NaN；因此后备路径可外推越过旧时间段。 源码 eyes/src/engine/controllers/DynamoController.js:522；参数 ()。
- `_loadDef()`：下载 baseUrl/def.dyn，校验版本只允许 1/2，按 pos/lin/ori/quat/orb 选 PointClass；设置 modifiedStates、类型头和根 PointSet，coverage 与用户覆盖取交再加 timeOffset。 源码 eyes/src/engine/controllers/DynamoController.js:527；参数 ()。
- `_getPointsAtTime(t, e)`：查询时统一减 timeOffset，逐层进入 PointSet；未加载块异步启动下载并返回 null；FAILED 重新 setBaseUrl 载入根定义。 源码 eyes/src/engine/controllers/DynamoController.js:564；参数 (t, e)。

注意：五种采样记录的字节数由实际 Reader 调用数计算，不是对真实资产再次解码验证。 样本时间单位应由 TimeUtils/调用链确认；文件本身只存 Float64。 PointSet.getPoints 假设至少两个有序点，未见显式长度/单调校验。 __update*AtTime 比较 _pCalc.time 与外部时间，但 calculate 写入减偏移时间，非零 timeOffset 可能导致重复计算。

有证据支持的局部命名建议（并非原始 NASA 命名）：

- `Point.load@8:2` 的 `t` → `reader`：局部绑定 line 8；直接用途 t.readFloat64。
- `PosPoint.load@26:2` 的 `t` → `reader`：局部绑定 line 26；直接用途 super.load(t)；t.readFloat64。
- `LinPoint.load@76:2` 的 `t` → `reader`：局部绑定 line 76；直接用途 super.load(t)；t.readFloat64。
- `OriPoint.load@112:2` 的 `t` → `reader`：局部绑定 line 112；直接用途 super.load(t)；t.readFloat64。
- `QuatPoint.load@160:2` 的 `t` → `reader`：局部绑定 line 160；直接用途 super.load(t)；t.readFloat64。
- `OrbPoint.load@191:2` 的 `t` → `reader`：局部绑定 line 191；直接用途 super.load(t)；t.readFloat64。
- `OrbPoint.readHeader@238:2` 的 `t` → `reader`：局部绑定 line 238；直接用途 t.readFloat64。
- `PointSet.load@276:2` 的 `t` → `reader`：局部绑定 line 276；直接用途 t.readByte；t.readInt32。
- `DynamoController.setTimeOffset@434:2` 的 `t` → `timeOffset`：局部绑定 line 434；直接用途 this._timeOffset=t。

### `eyes/src/engine/controllers/FixedController.js`

把预设位置/速度/姿态写入实体，为固定参考系或表面点提供状态。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`FixedController extends PioneerPublicApi.BaseController @3`。

#### FixedController

把预设位置/速度/姿态写入实体，为固定参考系或表面点提供状态。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/FixedController.js:3](../../eyes/src/engine/controllers/FixedController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_orientation`、`_position`；调用 `super`。 源码 eyes/src/engine/controllers/FixedController.js:4；参数 (t, e)。
- `getPosition()`：【结构证据】返回 `this._position`。 源码 eyes/src/engine/controllers/FixedController.js:9；参数 ()。
- `setPosition(t)`：【结构证据】写入 `_position`；调用 `new PioneerPublicApi.Vector3`、`this._position.copy`、`this.addModifiedState`、`this.removeModifiedState`。 源码 eyes/src/engine/controllers/FixedController.js:12；参数 (t)。
- `getOrientation()`：【结构证据】返回 `this._orientation`。 源码 eyes/src/engine/controllers/FixedController.js:16；参数 ()。
- `setOrientation(t)`：【结构证据】写入 `_orientation`；调用 `new PioneerPublicApi.Quaternion`、`this._orientation.copy`、`this.addModifiedState`、`this.removeModifiedState`。 源码 eyes/src/engine/controllers/FixedController.js:19；参数 (t)。
- `__updatePositionAtTime(t, e)`：【结构证据】调用 `t.copy`。 源码 eyes/src/engine/controllers/FixedController.js:23；参数 (t, e)。
- `__updateVelocityAtTime(t, e)`：【结构证据】调用 `t.set`。 源码 eyes/src/engine/controllers/FixedController.js:26；参数 (t, e)。
- `__updateOrientationAtTime(t, e)`：【结构证据】调用 `t.copy`。 源码 eyes/src/engine/controllers/FixedController.js:29；参数 (t, e)。
- `__update()`：【结构证据】调用 `this.getEntity`、`this.getEntity().setOrientation`、`this.getEntity().setPosition`、`this.getEntity().setVelocity`。 源码 eyes/src/engine/controllers/FixedController.js:32；参数 ()。

### `eyes/src/engine/controllers/FixedToParentController.js`

按父实体状态维持相对固定的位置和姿态。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`FixedToParentController extends PioneerPublicApi.BaseController @3`。

#### FixedToParentController

按父实体状态维持相对固定的位置和姿态。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/FixedToParentController.js:3](../../eyes/src/engine/controllers/FixedToParentController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_lastParent`、`_lastParentOrientation`；调用 `new PioneerPublicApi.Quaternion`、`super`、`this._lastParent.getOrientation`、`this._lastParentOrientation.copy`、`this.addDependentState`、`this.addModifiedState`。 源码 eyes/src/engine/controllers/FixedToParentController.js:4；参数 (t, e)。
- `__update()`：【结构证据】写入 `_lastParent`；返回 `void(this._lastParent=lastParent)`；调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.inverse`、`e.isNaN`。 源码 eyes/src/engine/controllers/FixedToParentController.js:14；参数 ()。

### `eyes/src/engine/controllers/FreeFlyController.js`

将键盘/指针输入转换为自由飞行相机位移、俯仰与偏航。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`FreeFlyController extends PioneerPublicApi.BaseController @3`。

#### FreeFlyController

将键盘/指针输入转换为自由飞行相机位移、俯仰与偏航。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/FreeFlyController.js:3](../../eyes/src/engine/controllers/FreeFlyController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_changeParentToNearestEntity`、`_dragSensitivity`、`_dragSmoothness`、`_forcedMoving`、`_isMoving`、`_moveSmoothedValue`、`_nearestEntity`、`_nearestEntityCheckIndex`；调用 `new PioneerPublicApi.Vector3`、`super`、`this.addDependentState`、`this.addModifiedState`。 源码 eyes/src/engine/controllers/FreeFlyController.js:4；参数 (t, e)。
- `getDragSensitivity()`：【结构证据】返回 `this._dragSensitivity`。 源码 eyes/src/engine/controllers/FreeFlyController.js:19；参数 ()。
- `setDragSensitivity(dragSensitivity)`：【结构证据】写入 `_dragSensitivity`。 源码 eyes/src/engine/controllers/FreeFlyController.js:22；参数 (dragSensitivity)。
- `getDragSmoothness()`：【结构证据】返回 `this._dragSmoothness`。 源码 eyes/src/engine/controllers/FreeFlyController.js:25；参数 ()。
- `setDragSmoothness(dragSmoothness)`：【结构证据】写入 `_dragSmoothness`。 源码 eyes/src/engine/controllers/FreeFlyController.js:28；参数 (dragSmoothness)。
- `getChangeParentToNearestEntity()`：【结构证据】返回 `this._changeParentToNearestEntity`。 源码 eyes/src/engine/controllers/FreeFlyController.js:31；参数 ()。
- `setChangeParentToNearestEntity(changeParentToNearestEntity)`：【结构证据】写入 `_changeParentToNearestEntity`。 源码 eyes/src/engine/controllers/FreeFlyController.js:34；参数 (changeParentToNearestEntity)。
- `getForcedMoving()`：【结构证据】返回 `this._forcedMoving`。 源码 eyes/src/engine/controllers/FreeFlyController.js:37；参数 ()。
- `setForcedMoving(t)`：【结构证据】调用 `this._forcedMoving.copy`。 源码 eyes/src/engine/controllers/FreeFlyController.js:40；参数 (t)。
- `__update()`：【结构证据】写入 `_isMoving`、`_nearestEntity`、`_nearestEntityCheckIndex`、`_nearestEntityDistance`；返回 `void`；调用 `Math.max`、`Math.min`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`c.rotate`、`l.addMult`。 源码 eyes/src/engine/controllers/FreeFlyController.js:43；参数 ()。

### `eyes/src/engine/controllers/GroundClampController.js`

引用地面组件查询地表位置，把实体位置限制到表面/给定高度。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`GroundClampController extends PioneerPublicApi.BaseController @3`。

#### GroundClampController

引用地面组件查询地表位置，把实体位置限制到表面/给定高度。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/GroundClampController.js:3](../../eyes/src/engine/controllers/GroundClampController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_clampOnlyIfBelow`、`_distanceFromGround`、`_groundEntityRef`、`_up`；调用 `new PioneerPublicApi.EntityRef`、`new PioneerPublicApi.Vector3`、`super`、`this.addModifiedState`、`this.getEntity`、`this.getEntity().getScene`。 源码 eyes/src/engine/controllers/GroundClampController.js:4；参数 (t, e)。
- `setGroundEntityRef(t)`：【结构证据】调用 `this._groundEntityRef.getName`、`this._groundEntityRef.setName`、`this.addDependentState`、`this.removeDependentState`。 源码 eyes/src/engine/controllers/GroundClampController.js:12；参数 (t)。
- `getDistanceFromGround()`：【结构证据】返回 `this._distanceFromGround`。 源码 eyes/src/engine/controllers/GroundClampController.js:19；参数 ()。
- `setDistanceFromGround(distanceFromGround)`：【结构证据】写入 `_distanceFromGround`。 源码 eyes/src/engine/controllers/GroundClampController.js:22；参数 (distanceFromGround)。
- `getUp()`：【结构证据】返回 `this._up`。 源码 eyes/src/engine/controllers/GroundClampController.js:25；参数 ()。
- `setUp(t)`：【结构证据】调用 `this._up.copy`。 源码 eyes/src/engine/controllers/GroundClampController.js:28；参数 (t)。
- `getClampOnlyIfBelow()`：【结构证据】返回 `this._clampOnlyIfBelow`。 源码 eyes/src/engine/controllers/GroundClampController.js:31；参数 ()。
- `setClampOnlyIfBelow(clampOnlyIfBelow)`：【结构证据】写入 `_clampOnlyIfBelow`。 源码 eyes/src/engine/controllers/GroundClampController.js:34；参数 (clampOnlyIfBelow)。
- `__updatePositionAtTime(t, e)`：【结构证据】返回 `void`；调用 `Math.abs`、`Math.min`、`PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`。 源码 eyes/src/engine/controllers/GroundClampController.js:37；参数 (t, e)。
- `__update()`：【结构证据】返回 `void`；调用 `Math.abs`、`Math.min`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.dot`、`e.getGroundPosition`。 源码 eyes/src/engine/controllers/GroundClampController.js:70；参数 ()。

### `eyes/src/engine/controllers/KeyframeController.js`

管理以时间排序的关键帧和插值区间，作为具体动画控制器基础。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`KeyframeController extends PioneerPublicApi.BaseController @3`。

#### KeyframeController

管理以时间排序的关键帧和插值区间，作为具体动画控制器基础。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/KeyframeController.js:3](../../eyes/src/engine/controllers/KeyframeController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_newOrientation`、`_newPosition`、`_newVelocity`、`_orientation0`、`_orientation1`、`_orientationKeyframes`、`_position0`、`_position1`；调用 `new PioneerPublicApi.Quaternion`、`new PioneerPublicApi.Vector3`、`super`、`this.setCoverage`。 源码 eyes/src/engine/controllers/KeyframeController.js:4；参数 (t, e)。
- `addPositionKeyframe(t, e, i, n, o, r)`：【结构证据】调用 `PioneerPublicApi.Sort.addObject`、`new PioneerPublicApi.EntityRef`、`new PioneerPublicApi.Vector3`、`this._updateCoverage`、`this.addModifiedState`、`this.getEntity`。 源码 eyes/src/engine/controllers/KeyframeController.js:23；参数 (t, e, i, n, o, r)。
- `removePositionKeyframe(t)`：【结构证据】返回 `e`；调用 `PioneerPublicApi.Sort.removeObject`、`this._updateCoverage`、`this.removeModifiedState`。 源码 eyes/src/engine/controllers/KeyframeController.js:37；参数 (t)。
- `addOrientationKeyframe(t, e, i, n)`：【结构证据】调用 `PioneerPublicApi.Sort.addObject`、`new PioneerPublicApi.EntityRef`、`new PioneerPublicApi.Quaternion`、`quaternion.copy`、`this._updateCoverage`、`this.addModifiedState`。 源码 eyes/src/engine/controllers/KeyframeController.js:42；参数 (t, e, i, n)。
- `removeOrientationKeyframe(t)`：【结构证据】返回 `e`；调用 `PioneerPublicApi.Sort.removeObject`、`this._updateCoverage`、`this.removeModifiedState`。 源码 eyes/src/engine/controllers/KeyframeController.js:54；参数 (t)。
- `areTimesRealTime()`：【结构证据】返回 `this._timesAreRealTime`。 源码 eyes/src/engine/controllers/KeyframeController.js:59；参数 ()。
- `setTimesAreRealTime(timesAreRealTime)`：【结构证据】写入 `_timesAreRealTime`；调用 `this._updateCoverage`。 源码 eyes/src/engine/controllers/KeyframeController.js:62；参数 (timesAreRealTime)。
- `__updatePositionAtTime(t, e)`：【结构证据】调用 `this._getPositionAtTime`。 源码 eyes/src/engine/controllers/KeyframeController.js:66；参数 (t, e)。
- `__updateVelocityAtTime(t, e)`：【结构证据】调用 `this._getVelocityAtTime`。 源码 eyes/src/engine/controllers/KeyframeController.js:69；参数 (t, e)。
- `__updateOrientationAtTime(t, e)`：【结构证据】调用 `this._getOrientationAtTime`。 源码 eyes/src/engine/controllers/KeyframeController.js:72；参数 (t, e)。
- `__update()`：【结构证据】写入 `_timeOfFirstUpdate`；调用 `Date.now`、`isNaN`、`t.getTime`、`this._getOrientationAtTime`、`this._getPositionAtTime`、`this._getVelocityAtTime`。 源码 eyes/src/engine/controllers/KeyframeController.js:75；参数 ()。
- `_getPositionAtTime(t, e)`：【结构证据】返回 `true` 或 `false`；调用 `PioneerPublicApi.Sort.getIndexObject`、`this._cubicHermiteSpline`、`this._getPositionOfKeyframe`、`this._tangent0.addMult`、`this._tangent0.sub`、`this._tangent1.addMult`。 源码 eyes/src/engine/controllers/KeyframeController.js:83；参数 (t, e)。
- `_getVelocityAtTime(t, e)`：【结构证据】返回 `true` 或 `false`；调用 `PioneerPublicApi.Sort.getIndexObject`、`t.div`、`t.set`、`t.sub`、`this._cubicHermiteSplineDerivative`、`this._getPositionOfKeyframe`。 源码 eyes/src/engine/controllers/KeyframeController.js:125；参数 (t, e)。
- `_getOrientationAtTime(t, e)`：【结构证据】返回 `true` 或 `false`；调用 `PioneerPublicApi.Sort.getIndexObject`、`t.slerp`、`this._getOrientationOfKeyframe`。 源码 eyes/src/engine/controllers/KeyframeController.js:176；参数 (t, e)。
- `_getPositionOfKeyframe(t, e)`：【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`i.relativeToEntityOrientation.get`、`i.relativeToEntityPosition.get`。 源码 eyes/src/engine/controllers/KeyframeController.js:201；参数 (t, e)。
- `_getOrientationOfKeyframe(t, e)`：【结构证据】调用 `i.relativeToEntityOrientation.get`、`o.getOrientationAtTime`、`t.copy`、`t.mult`。 源码 eyes/src/engine/controllers/KeyframeController.js:225；参数 (t, e)。
- `_updateCoverage()`：【结构证据】调用 `Math.max`、`Math.min`、`new PioneerPublicApi.Interval`、`this.setCoverage`。 源码 eyes/src/engine/controllers/KeyframeController.js:233；参数 ()。
- `_cubicHermiteSpline(t, e, i, s, n, o)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/controllers/KeyframeController.js:241；参数 (t, e, i, s, n, o)。
- `_cubicHermiteSplineDerivative(t, e, i, s, n, o)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/controllers/KeyframeController.js:252；参数 (t, e, i, s, n, o)。

### `eyes/src/engine/controllers/KeyframePointingController.js`

按关键帧目标向量/姿态计算朝向。

- 证据：`import ../pioneer/index.js`。
- 证据：`KeyframePointingController extends Pioneer.BaseController @3`。

#### KeyframePointingController

按关键帧目标向量/姿态计算朝向。 继承：`Pioneer.BaseController`。源码 [eyes/src/engine/controllers/KeyframePointingController.js:3](../../eyes/src/engine/controllers/KeyframePointingController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_direction`、`_keyframes`；调用 `new Pioneer.Vector3`、`super`、`this.addModifiedState`。 源码 eyes/src/engine/controllers/KeyframePointingController.js:4；参数 (t, e)。
- `setKeyframes(t)`：【结构证据】写入 `_keyframes`；调用 `e.startsWith`、`e.substring`、`s.startsWith`、`s.substring`、`this._keyframes.push`、`this._keyframes.sort`。 源码 eyes/src/engine/controllers/KeyframePointingController.js:10；参数 (t)。
- `setDirection(t)`：【结构证据】调用 `this._direction.copy`。 源码 eyes/src/engine/controllers/KeyframePointingController.js:26；参数 (t)。
- `__updateOrientationAtTime(t, e)`：【结构证据】调用 `t.copy`、`t.isNaN`、`this._getNewOrientation`。 源码 eyes/src/engine/controllers/KeyframePointingController.js:29；参数 (t, e)。
- `__update()`：【结构证据】返回 `void`；调用 `Pioneer.Quaternion.pool.get`、`Pioneer.Quaternion.pool.release`、`t.getOrientation`、`t.getOrientation().isNaN`、`t.getScene`、`t.getScene().getEngine`。 源码 eyes/src/engine/controllers/KeyframePointingController.js:33；参数 ()。
- `_getNewOrientation(t, e, i)`：【结构证据】调用 `Pioneer.Quaternion.pool.get`、`Pioneer.Quaternion.pool.release`、`Pioneer.Sort.getIndexObject`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`d.normalize`。 源码 eyes/src/engine/controllers/KeyframePointingController.js:43；参数 (t, e, i)。
- `_getDirection(t, e, i)`：【结构证据】调用 `(i=i.substring(8)).startsWith`、`i.startsWith`、`i.substring`、`n.getScene`、`n.getScene().getEntity`、`n.getVelocityAtTime`。 源码 eyes/src/engine/controllers/KeyframePointingController.js:66；参数 (t, e, i)。

### `eyes/src/engine/controllers/KeyframeSpinController.js`

根据关键帧的转速/轴和时间生成连续自转姿态。

- 证据：`import ../pioneer/index.js`。
- 证据：`KeyframeSpinController extends Pioneer.BaseController @3`。

#### KeyframeSpinController

根据关键帧的转速/轴和时间生成连续自转姿态。 继承：`Pioneer.BaseController`。源码 [eyes/src/engine/controllers/KeyframeSpinController.js:3](../../eyes/src/engine/controllers/KeyframeSpinController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_axis`、`_keyframes`、`_startingAngle`；调用 `new Pioneer.Vector3`、`super`、`this.addModifiedState`。 源码 eyes/src/engine/controllers/KeyframeSpinController.js:4；参数 (t, e)。
- `setKeyframes(t)`：【结构证据】写入 `_keyframes`；调用 `Pioneer.MathUtils.wrap`、`this._keyframes.push`、`this._keyframes.sort`。 源码 eyes/src/engine/controllers/KeyframeSpinController.js:11；参数 (t)。
- `setAxis(t)`：【结构证据】调用 `this._axis.copy`。 源码 eyes/src/engine/controllers/KeyframeSpinController.js:24；参数 (t)。
- `setStartingAngle(startingAngle)`：【结构证据】写入 `_startingAngle`。 源码 eyes/src/engine/controllers/KeyframeSpinController.js:27；参数 (startingAngle)。
- `__updateOrientationAtTime(t, e)`：【结构证据】调用 `t.copy`、`t.isNaN`、`this._getNewOrientation`。 源码 eyes/src/engine/controllers/KeyframeSpinController.js:30；参数 (t, e)。
- `__update()`：【结构证据】返回 `void`；调用 `Pioneer.Quaternion.pool.get`、`Pioneer.Quaternion.pool.release`、`t.getOrientation`、`t.getOrientation().isNaN`、`t.getScene`、`t.getScene().getEngine`。 源码 eyes/src/engine/controllers/KeyframeSpinController.js:34；参数 ()。
- `_getNewOrientation(t, e, i)`：【结构证据】调用 `Pioneer.MathUtils.wrap`、`Pioneer.Quaternion.pool.get`、`Pioneer.Quaternion.pool.release`、`Pioneer.Sort.getIndexObject`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`。 源码 eyes/src/engine/controllers/KeyframeSpinController.js:44；参数 (t, e, i)。

### `eyes/src/engine/controllers/LookController.js`

消费鼠标/触摸输入以改变相机观察方向。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`LookController extends PioneerPublicApi.BaseController @3`。

#### LookController

消费鼠标/触摸输入以改变相机观察方向。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/LookController.js:3](../../eyes/src/engine/controllers/LookController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_dragSensitivity`、`_dragSmoothness`、`_pitchAngleSmoothedValue`、`_yawAngleSmoothedValue`、`_yawAxisEntity`、`_yawAxisType`；调用 `super`、`this.addModifiedState`。 源码 eyes/src/engine/controllers/LookController.js:4；参数 (t, e)。
- `getDragSensitivity()`：【结构证据】返回 `this._dragSensitivity`。 源码 eyes/src/engine/controllers/LookController.js:14；参数 ()。
- `setDragSensitivity(dragSensitivity)`：【结构证据】写入 `_dragSensitivity`。 源码 eyes/src/engine/controllers/LookController.js:17；参数 (dragSensitivity)。
- `getDragSmoothness()`：【结构证据】返回 `this._dragSmoothness`。 源码 eyes/src/engine/controllers/LookController.js:20；参数 ()。
- `setDragSmoothness(dragSmoothness)`：【结构证据】写入 `_dragSmoothness`。 源码 eyes/src/engine/controllers/LookController.js:23；参数 (dragSmoothness)。
- `getYawAxisType()`：【结构证据】返回 `this._yawAxisType`。 源码 eyes/src/engine/controllers/LookController.js:26；参数 ()。
- `setYawAxisType(yawAxisType)`：【结构证据】写入 `_yawAxisType`；调用 `["x-axis","y-axis","z-axis"].includes`、`this._yawAxisEntity.getName`、`this.addDependentState`、`this.removeDependentState`。 源码 eyes/src/engine/controllers/LookController.js:29；参数 (yawAxisType)。
- `getYawAxisEntity()`：【结构证据】返回 `this._yawAxisEntity`。 源码 eyes/src/engine/controllers/LookController.js:32；参数 ()。
- `setYawAxisEntity(yawAxisEntity)`：【结构证据】写入 `_yawAxisEntity`；调用 `["x-axis","y-axis","z-axis"].includes`、`this._yawAxisEntity.getName`、`this.addDependentState`、`this.removeDependentState`。 源码 eyes/src/engine/controllers/LookController.js:35；参数 (yawAxisEntity)。
- `__update()`：【结构证据】写入 `_pitchAngleSmoothedValue`、`_yawAngleSmoothedValue`、`_yawAxisEntity`；调用 `Math.abs`、`Math.min`、`PioneerPublicApi.MathUtils.lerp`、`PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Vector3.pool.get`。 源码 eyes/src/engine/controllers/LookController.js:38；参数 ()。

### `eyes/src/engine/controllers/ModelAnimateController.js`

取得模型动画片段并通过 Three.js 动画混合器按仿真时间播放。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`ModelAnimateController extends PioneerPublicApi.BaseController @3`。

#### ModelAnimateController

取得模型动画片段并通过 Three.js 动画混合器按仿真时间播放。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/ModelAnimateController.js:3](../../eyes/src/engine/controllers/ModelAnimateController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_animations`；调用 `super`。 源码 eyes/src/engine/controllers/ModelAnimateController.js:4；参数 (t, e)。
- `setAnimation(t, e, i, s)`：【结构证据】调用 `new Error`、`this._animations.push`；含显式错误分支。 源码 eyes/src/engine/controllers/ModelAnimateController.js:8；参数 (t, e, i, s)。
- `__update()`：【结构证据】调用 `PioneerPublicApi.MathUtils.clamp01`、`i.animationMixer.clipAction`、`i.animationMixer.clipAction(i.animationClip).play`、`i.animationMixer.setTime`、`i.animationMixer.update`、`i.model.getAnimationClip`。 源码 eyes/src/engine/controllers/ModelAnimateController.js:21；参数 ()。

### `eyes/src/engine/controllers/OrbitController.js`

围绕焦点实体维护距离、偏航、俯仰和上方向，处理鼠标/触摸轨道相机输入及约束。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`OrbitController extends PioneerPublicApi.BaseController @3`。

#### OrbitController

围绕焦点实体维护距离、偏航、俯仰和上方向，处理鼠标/触摸轨道相机输入及约束。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/OrbitController.js:3](../../eyes/src/engine/controllers/OrbitController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_dragSensitivity`、`_dragSmoothness`、`_pitchAngleLimits`、`_pitchAxisEntity`、`_pitchAxisType`、`_pitchChangeSmoothedValue`、`_yawAngleLimits`、`_yawAxisEntity`；调用 `new PioneerPublicApi.Interval`、`super`、`this.addModifiedState`。 源码 eyes/src/engine/controllers/OrbitController.js:4；参数 (t, e)。
- `getDragSensitivity()`：【结构证据】返回 `this._dragSensitivity`。 源码 eyes/src/engine/controllers/OrbitController.js:19；参数 ()。
- `setDragSensitivity(dragSensitivity)`：【结构证据】写入 `_dragSensitivity`。 源码 eyes/src/engine/controllers/OrbitController.js:22；参数 (dragSensitivity)。
- `getDragSmoothness()`：【结构证据】返回 `this._dragSmoothness`。 源码 eyes/src/engine/controllers/OrbitController.js:25；参数 ()。
- `setDragSmoothness(dragSmoothness)`：【结构证据】写入 `_dragSmoothness`。 源码 eyes/src/engine/controllers/OrbitController.js:28；参数 (dragSmoothness)。
- `getYawAxisType()`：【结构证据】返回 `this._yawAxisType`。 源码 eyes/src/engine/controllers/OrbitController.js:31；参数 ()。
- `setYawAxisType(yawAxisType)`：【结构证据】写入 `_yawAxisType`；调用 `["x-axis","y-axis","z-axis"].includes`、`this._yawAxisEntity.getName`、`this.addDependentState`、`this.removeDependentState`。 源码 eyes/src/engine/controllers/OrbitController.js:34；参数 (yawAxisType)。
- `getPitchAxisType()`：【结构证据】返回 `this._pitchAxisType`。 源码 eyes/src/engine/controllers/OrbitController.js:37；参数 ()。
- `setPitchAxisType(pitchAxisType)`：【结构证据】写入 `_pitchAxisType`；调用 `["x-axis","y-axis","z-axis"].includes`、`this._pitchAxisEntity.getName`、`this.addDependentState`、`this.removeDependentState`。 源码 eyes/src/engine/controllers/OrbitController.js:40；参数 (pitchAxisType)。
- `getYawAxisEntity()`：【结构证据】返回 `this._yawAxisEntity`。 源码 eyes/src/engine/controllers/OrbitController.js:43；参数 ()。
- `setYawAxisEntity(yawAxisEntity)`：【结构证据】写入 `_yawAxisEntity`；调用 `["x-axis","y-axis","z-axis"].includes`、`this._yawAxisEntity.getName`、`this.addDependentState`、`this.removeDependentState`。 源码 eyes/src/engine/controllers/OrbitController.js:46；参数 (yawAxisEntity)。
- `getPitchAxisEntity()`：【结构证据】返回 `this._pitchAxisEntity`。 源码 eyes/src/engine/controllers/OrbitController.js:49；参数 ()。
- `setPitchAxisEntity(pitchAxisEntity)`：【结构证据】写入 `_pitchAxisEntity`；调用 `["x-axis","y-axis","z-axis"].includes`、`this._pitchAxisEntity.getName`、`this.addDependentState`、`this.removeDependentState`。 源码 eyes/src/engine/controllers/OrbitController.js:52；参数 (pitchAxisEntity)。
- `getYawAngleLimits()`：【结构证据】返回 `this._yawAngleLimits`。 源码 eyes/src/engine/controllers/OrbitController.js:55；参数 ()。
- `setYawAngleLimits(t)`：【结构证据】调用 `this._yawAngleLimits.copy`。 源码 eyes/src/engine/controllers/OrbitController.js:58；参数 (t)。
- `getPitchAngleLimits()`：【结构证据】返回 `this._pitchAngleLimits`。 源码 eyes/src/engine/controllers/OrbitController.js:61；参数 ()。
- `setPitchAngleLimits(t)`：【结构证据】调用 `this._pitchAngleLimits.copy`。 源码 eyes/src/engine/controllers/OrbitController.js:64；参数 (t)。
- `__update()`：【结构证据】写入 `_pitchAxisEntity`、`_pitchChangeSmoothedValue`、`_yawAxisEntity`、`_yawChangeSmoothedValue`；返回 `void`；调用 `Math.abs`、`Math.min`、`PioneerPublicApi.Geometry.getLLAFromXYZOnSphere`、`PioneerPublicApi.Geometry.getXYZFromLLAOnSphere`、`PioneerPublicApi.LatLonAlt.pool.get`、`PioneerPublicApi.LatLonAlt.pool.release`。 源码 eyes/src/engine/controllers/OrbitController.js:67；参数 ()。

### `eyes/src/engine/controllers/OrbitKeyframeController.js`

把位置、焦点和上方向关键帧组合成轨道相机的连续运动。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`OrbitKeyframeController extends PioneerPublicApi.BaseController @3`。
- 证据：`Keyframe @197`。
- 证据：`PositionKeyframe extends Keyframe @203`。
- 证据：`FocusKeyframe extends Keyframe @212`。
- 证据：`UpKeyframe extends Keyframe @219`。

#### OrbitKeyframeController

把位置、焦点和上方向关键帧组合成轨道相机的连续运动。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/OrbitKeyframeController.js:3](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_directionOfFirstUpdate`、`_endPromise`、`_focusKeyframes`、`_positionKeyframes`、`_rejectPromise`、`_resolvePromise`、`_timeOfFirstUpdate`、`_upKeyframes`；调用 `new PioneerPublicApi.Vector3`、`new Promise`、`super`、`this.addModifiedState`。 源码 eyes/src/engine/controllers/OrbitKeyframeController.js:4；参数 (t, e)。
- `setPositionKeyframe(t, e, i)`：【结构证据】调用 `PioneerPublicApi.Sort.addObject`、`PioneerPublicApi.Sort.getIndexObject`、`new PositionKeyframe`、`positionKeyframe.position.copy`、`positionKeyframe.relativeTo.setName`、`this._positionKeyframes.splice`。 源码 eyes/src/engine/controllers/OrbitKeyframeController.js:22；参数 (t, e, i)。
- `setFocusKeyframe(t, e)`：【结构证据】调用 `PioneerPublicApi.Sort.addObject`、`PioneerPublicApi.Sort.getIndexObject`、`focusKeyframe.focus.setName`、`new FocusKeyframe`、`this._focusKeyframes.splice`、`this.getEntity`。 源码 eyes/src/engine/controllers/OrbitKeyframeController.js:34；参数 (t, e)。
- `setUpKeyframe(t, e)`：【结构证据】调用 `PioneerPublicApi.Sort.addObject`、`PioneerPublicApi.Sort.getIndexObject`、`new UpKeyframe`、`this._upKeyframes.splice`、`upKeyframe.up.copy`。 源码 eyes/src/engine/controllers/OrbitKeyframeController.js:45；参数 (t, e)。
- `getEndPromise()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/controllers/OrbitKeyframeController.js:56；参数 ()。
- `__destroy()`：【结构证据】调用 `new Error`、`super.__destroy`、`this._rejectPromise`。 源码 eyes/src/engine/controllers/OrbitKeyframeController.js:59；参数 ()。
- `__update()`：【结构证据】写入 `_rejectPromise`、`_timeOfFirstUpdate`；返回 `void`；调用 `Date.now`、`Math.max`、`PioneerPublicApi.MathUtils.lerp`、`PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Sort.addObject`。 源码 eyes/src/engine/controllers/OrbitKeyframeController.js:63；参数 ()。

#### Keyframe

轨道相机关键帧基类。 继承：`无显式继承`。源码 [eyes/src/engine/controllers/OrbitKeyframeController.js:197](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L197)。

- `constructor()`：【结构证据】写入 `time`。 源码 eyes/src/engine/controllers/OrbitKeyframeController.js:199；参数 ()。

#### PositionKeyframe

轨道相机位置关键帧。 继承：`Keyframe`。源码 [eyes/src/engine/controllers/OrbitKeyframeController.js:203](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L203)。

- `constructor(t)`：【结构证据】写入 `position`、`relativeTo`；调用 `new PioneerPublicApi.EntityRef`、`new PioneerPublicApi.Vector3`、`super`。 源码 eyes/src/engine/controllers/OrbitKeyframeController.js:206；参数 (t)。

#### FocusKeyframe

轨道相机焦点关键帧。 继承：`Keyframe`。源码 [eyes/src/engine/controllers/OrbitKeyframeController.js:212](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L212)。

- `constructor(t)`：【结构证据】写入 `focus`；调用 `new PioneerPublicApi.EntityRef`、`super`。 源码 eyes/src/engine/controllers/OrbitKeyframeController.js:214；参数 (t)。

#### UpKeyframe

轨道相机上方向关键帧。 继承：`Keyframe`。源码 [eyes/src/engine/controllers/OrbitKeyframeController.js:219](../../eyes/src/engine/controllers/OrbitKeyframeController.js#L219)。

- `constructor()`：【结构证据】写入 `up`；调用 `new PioneerPublicApi.Vector3`、`super`。 源码 eyes/src/engine/controllers/OrbitKeyframeController.js:221；参数 ()。

### `eyes/src/engine/controllers/OrbitalElementsController.js`

保存轨道元素关键帧，在指定时间传播位置/速度并在相邻元素之间混合。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`OrbitalElementsController extends PioneerPublicApi.BaseController @3`。
- 证据：`OrbitalElementsKeyframe @67`。

#### OrbitalElementsController

保存轨道元素关键帧，在指定时间传播位置/速度并在相邻元素之间混合。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/OrbitalElementsController.js:3](../../eyes/src/engine/controllers/OrbitalElementsController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_orbitalElementsKeyframes`；调用 `super`、`this.addModifiedState`。 源码 eyes/src/engine/controllers/OrbitalElementsController.js:4；参数 (t, e)。
- `getNumOrbitalElements()`：【结构证据】返回 `this._orbitalElementsKeyframes.length`。 源码 eyes/src/engine/controllers/OrbitalElementsController.js:10；参数 ()。
- `getOrbitalElements(t)`：【结构证据】返回 `this._orbitalElementsKeyframes[t]`。 源码 eyes/src/engine/controllers/OrbitalElementsController.js:13；参数 (t)。
- `addOrbitalElements(t, e)`：【结构证据】调用 `PioneerPublicApi.Sort.addObject`、`new PioneerPublicApi.OrbitalElements`。 源码 eyes/src/engine/controllers/OrbitalElementsController.js:16；参数 (t, e)。
- `removeOrbitalElements(t)`：【结构证据】调用 `new Error`、`this._orbitalElementsKeyframes.splice`；含显式错误分支。 源码 eyes/src/engine/controllers/OrbitalElementsController.js:23；参数 (t)。
- `__updatePositionAtTime(t, e)`：【结构证据】调用 `this._getPositionAndVelocityAtTime`。 源码 eyes/src/engine/controllers/OrbitalElementsController.js:27；参数 (t, e)。
- `__updateVelocityAtTime(t, e)`：【结构证据】调用 `this._getPositionAndVelocityAtTime`。 源码 eyes/src/engine/controllers/OrbitalElementsController.js:30；参数 (t, e)。
- `__update()`：【结构证据】调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`new Error`、`this._getPositionAndVelocityAtTime`、`this.getEntity`、`this.getEntity().getScene`；含显式错误分支。 源码 eyes/src/engine/controllers/OrbitalElementsController.js:33；参数 ()。
- `_getPositionAndVelocityAtTime(t, e, i)`：【结构证据】调用 `Math.max`、`Math.min`、`PioneerPublicApi.MathUtils.clamp01`、`PioneerPublicApi.Sort.getIndexObject`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`。 源码 eyes/src/engine/controllers/OrbitalElementsController.js:44；参数 (t, e, i)。

#### OrbitalElementsKeyframe

按时间索引的一组轨道元素。 继承：`无显式继承`。源码 [eyes/src/engine/controllers/OrbitalElementsController.js:67](../../eyes/src/engine/controllers/OrbitalElementsController.js#L67)。

- `constructor()`：【结构证据】写入 `oe`、`time`；调用 `new PioneerPublicApi.OrbitalElements`。 源码 eyes/src/engine/controllers/OrbitalElementsController.js:70；参数 ()。

### `eyes/src/engine/controllers/PickController.js`

将输入点经相机射线投到实体表面并调用拾取回调。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`PickController extends PioneerPublicApi.BaseController @3`。

#### PickController

将输入点经相机射线投到实体表面并调用拾取回调。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/PickController.js:3](../../eyes/src/engine/controllers/PickController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_callback`、`_pickedEntity`、`_pickedPosition`、`_triggerOnHover`；调用 `new PioneerPublicApi.Vector3`、`super`。 源码 eyes/src/engine/controllers/PickController.js:4；参数 (t, e)。
- `getPickedEntity()`：【结构证据】返回 `this._pickedEntity`。 源码 eyes/src/engine/controllers/PickController.js:11；参数 ()。
- `setPickedEntity(pickedEntity)`：【结构证据】写入 `_pickedEntity`。 源码 eyes/src/engine/controllers/PickController.js:14；参数 (pickedEntity)。
- `getCallback()`：【结构证据】返回 `this._callback`。 源码 eyes/src/engine/controllers/PickController.js:17；参数 ()。
- `setCallback(callback)`：【结构证据】写入 `_callback`。 源码 eyes/src/engine/controllers/PickController.js:20；参数 (callback)。
- `getTriggerOnHover()`：【结构证据】返回 `this._triggerOnHover`。 源码 eyes/src/engine/controllers/PickController.js:23；参数 ()。
- `setTriggerOnHover(triggerOnHover)`：【结构证据】写入 `_triggerOnHover`。 源码 eyes/src/engine/controllers/PickController.js:26；参数 (triggerOnHover)。
- `getPickedPosition()`：【结构证据】返回 `this._pickedPosition`。 源码 eyes/src/engine/controllers/PickController.js:29；参数 ()。
- `__update()`：【结构证据】调用 `Number.isNaN`、`PioneerPublicApi.Geometry.getLineSphereIntersectionWithLineStartAtOrigin`、`PioneerPublicApi.Interval.pool.get`、`PioneerPublicApi.Interval.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`。 源码 eyes/src/engine/controllers/PickController.js:32；参数 ()。

### `eyes/src/engine/controllers/PositionSumController.js`

将多个引用实体的相对位置叠加到当前实体。

- 证据：`import ../pioneer/index.js`。
- 证据：`PositionSumController extends Pioneer.BaseController @3`。

#### PositionSumController

将多个引用实体的相对位置叠加到当前实体。 继承：`Pioneer.BaseController`。源码 [eyes/src/engine/controllers/PositionSumController.js:3](../../eyes/src/engine/controllers/PositionSumController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_entities`；调用 `new Pioneer.FastMap`、`super`、`this.addModifiedState`。 源码 eyes/src/engine/controllers/PositionSumController.js:4；参数 (t, e)。
- `addEntity(t, e, i)`：【结构证据】调用 `entityRef.setName`、`new Pioneer.EntityRef`、`this._entities.set`、`this.addDependentState`、`this.getEntity`、`this.getEntity().getScene`。 源码 eyes/src/engine/controllers/PositionSumController.js:9；参数 (t, e, i)。
- `removeEntity(t)`：【结构证据】调用 `this._entities.delete`、`this.removeDependentState`。 源码 eyes/src/engine/controllers/PositionSumController.js:19；参数 (t)。
- `setEntityParams(t, e, i)`：【结构证据】调用 `new Error`、`this._entities.get`；含显式错误分支。 源码 eyes/src/engine/controllers/PositionSumController.js:23；参数 (t, e, i)。
- `__update()`：【结构证据】返回 `void`；调用 `Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`e.addMult`、`e.set`、`i.magnitude`、`o.ref.get`。 源码 eyes/src/engine/controllers/PositionSumController.js:29；参数 ()。

### `eyes/src/engine/controllers/RollController.js`

响应输入或配置更新相机绕观察方向的滚转。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`RollController extends PioneerPublicApi.BaseController @3`。

#### RollController

响应输入或配置更新相机绕观察方向的滚转。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/RollController.js:3](../../eyes/src/engine/controllers/RollController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_rollAngleSmoothedValue`、`_rollSensitivity`、`_rollSmoothness`；调用 `super`、`this.addModifiedState`。 源码 eyes/src/engine/controllers/RollController.js:4；参数 (t, e)。
- `getRollSensitivity()`：【结构证据】返回 `this._rollSensitivity`。 源码 eyes/src/engine/controllers/RollController.js:11；参数 ()。
- `setRollSensitivity(rollSensitivity)`：【结构证据】写入 `_rollSensitivity`。 源码 eyes/src/engine/controllers/RollController.js:14；参数 (rollSensitivity)。
- `getRollSmoothness()`：【结构证据】返回 `this._rollSmoothness`。 源码 eyes/src/engine/controllers/RollController.js:17；参数 ()。
- `setRollSmoothness(rollSmoothness)`：【结构证据】写入 `_rollSmoothness`。 源码 eyes/src/engine/controllers/RollController.js:20；参数 (rollSmoothness)。
- `__update()`：【结构证据】写入 `_rollAngleSmoothedValue`；调用 `Math.abs`、`PioneerPublicApi.MathUtils.clamp`、`PioneerPublicApi.MathUtils.lerp`、`PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`e.getActiveViewport`。 源码 eyes/src/engine/controllers/RollController.js:23；参数 ()。

### `eyes/src/engine/controllers/RotateByEntityOrientationController.js`

把位置/姿态按另一个实体的姿态旋转，补充父层级只做平移的参考系行为。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`RotateByEntityOrientationController extends PioneerPublicApi.BaseController @3`。

#### RotateByEntityOrientationController

把位置/姿态按另一个实体的姿态旋转，补充父层级只做平移的参考系行为。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/RotateByEntityOrientationController.js:3](../../eyes/src/engine/controllers/RotateByEntityOrientationController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_entityRef`、`_rotatingOrientation`、`_rotatingPosition`；调用 `new PioneerPublicApi.EntityRef`、`super`、`this.addDependentState`、`this.addModifiedState`、`this.getEntity`、`this.getEntity().getScene`。 源码 eyes/src/engine/controllers/RotateByEntityOrientationController.js:4；参数 (t, e)。
- `setEntityForOrientation(t)`：【结构证据】调用 `this._entityRef.getName`、`this._entityRef.setName`、`this.addDependentState`、`this.removeDependentState`。 源码 eyes/src/engine/controllers/RotateByEntityOrientationController.js:15；参数 (t)。
- `isRotatingPosition()`：【结构证据】返回 `this._rotatingPosition`。 源码 eyes/src/engine/controllers/RotateByEntityOrientationController.js:20；参数 ()。
- `setRotatingPosition(rotatingPosition)`：【结构证据】写入 `_rotatingPosition`；调用 `this.addModifiedState`、`this.removeModifiedState`。 源码 eyes/src/engine/controllers/RotateByEntityOrientationController.js:23；参数 (rotatingPosition)。
- `isRotatingOrientation()`：【结构证据】返回 `this._rotatingOrientation`。 源码 eyes/src/engine/controllers/RotateByEntityOrientationController.js:27；参数 ()。
- `setRotatingOrientation(rotatingOrientation)`：【结构证据】写入 `_rotatingOrientation`；调用 `this.addModifiedState`、`this.removeModifiedState`。 源码 eyes/src/engine/controllers/RotateByEntityOrientationController.js:30；参数 (rotatingOrientation)。
- `__updatePositionAtTime(t, e)`：【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`i.getOrientationAtTime`、`t.rotate`、`this._entityRef.get`、`this._entityRef.getName`。 源码 eyes/src/engine/controllers/RotateByEntityOrientationController.js:34；参数 (t, e)。
- `__updateVelocityAtTime(t, e)`：【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`i.getOrientationAtTime`、`t.rotate`、`this._entityRef.get`、`this._entityRef.getName`。 源码 eyes/src/engine/controllers/RotateByEntityOrientationController.js:45；参数 (t, e)。
- `__updateOrientationAtTime(t, e)`：【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`i.getOrientationAtTime`、`t.mult`、`this._entityRef.get`、`this._entityRef.getName`。 源码 eyes/src/engine/controllers/RotateByEntityOrientationController.js:56；参数 (t, e)。
- `__update()`：【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.mult`、`e.rotate`。 源码 eyes/src/engine/controllers/RotateByEntityOrientationController.js:67；参数 ()。

### `eyes/src/engine/controllers/RotateController.js`

按输入增量旋转实体或相机目标。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`RotateController extends PioneerPublicApi.BaseController @3`。

#### RotateController

按输入增量旋转实体或相机目标。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/RotateController.js:3](../../eyes/src/engine/controllers/RotateController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_joint`、`_jointObject`、`_jointObjectIndex`、`_model`、`_rotatingOrientation`、`_rotatingPosition`、`_rotation`；调用 `new PioneerPublicApi.Quaternion`、`super`、`this.addModifiedState`。 源码 eyes/src/engine/controllers/RotateController.js:4；参数 (t, e)。
- `getRotation()`：【结构证据】返回 `this._rotation`。 源码 eyes/src/engine/controllers/RotateController.js:18；参数 ()。
- `setRotation(t)`：【结构证据】调用 `this._rotation.copy`。 源码 eyes/src/engine/controllers/RotateController.js:21；参数 (t)。
- `isRotatingPosition()`：【结构证据】返回 `this._rotatingPosition`。 源码 eyes/src/engine/controllers/RotateController.js:24；参数 ()。
- `setRotatingPosition(rotatingPosition)`：【结构证据】写入 `_rotatingPosition`；调用 `this._updateModifiedStates`。 源码 eyes/src/engine/controllers/RotateController.js:27；参数 (rotatingPosition)。
- `isRotatingOrientation()`：【结构证据】返回 `this._rotatingOrientation`。 源码 eyes/src/engine/controllers/RotateController.js:31；参数 ()。
- `setRotatingOrientation(rotatingOrientation)`：【结构证据】写入 `_rotatingOrientation`；调用 `this._updateModifiedStates`。 源码 eyes/src/engine/controllers/RotateController.js:34；参数 (rotatingOrientation)。
- `setJoint(joint, model)`：【结构证据】写入 `_joint`、`_model`；调用 `this._updateModifiedStates`、`this.getEntity`、`this.getEntity().getComponent`。 源码 eyes/src/engine/controllers/RotateController.js:38；参数 (joint, model)。
- `__updatePositionAtTime(t, e)`：【结构证据】调用 `t.rotate`。 源码 eyes/src/engine/controllers/RotateController.js:45；参数 (t, e)。
- `__updateVelocityAtTime(t, e)`：【结构证据】调用 `t.rotate`。 源码 eyes/src/engine/controllers/RotateController.js:48；参数 (t, e)。
- `__updateOrientationAtTime(t, e)`：【结构证据】调用 `t.mult`。 源码 eyes/src/engine/controllers/RotateController.js:51；参数 (t, e)。
- `__update()`：【结构证据】写入 `_jointObject`、`_jointObjectIndex`；调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.ThreeJsHelper.setOrientation`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.rotate`。 源码 eyes/src/engine/controllers/RotateController.js:54；参数 ()。
- `_updateModifiedStates()`：【结构证据】调用 `this.addModifiedState`、`this.removeModifiedState`。 源码 eyes/src/engine/controllers/RotateController.js:84；参数 ()。

### `eyes/src/engine/controllers/ScaleController.js`

依据输入变化更新实体/目标的缩放量。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`ScaleController extends PioneerPublicApi.BaseController @3`。

#### ScaleController

依据输入变化更新实体/目标的缩放量。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/ScaleController.js:3](../../eyes/src/engine/controllers/ScaleController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_scale`；调用 `super`、`this.addModifiedState`。 源码 eyes/src/engine/controllers/ScaleController.js:4；参数 (t, e)。
- `getScale()`：【结构证据】返回 `this._scale`。 源码 eyes/src/engine/controllers/ScaleController.js:9；参数 ()。
- `setScale(scale)`：【结构证据】写入 `_scale`。 源码 eyes/src/engine/controllers/ScaleController.js:12；参数 (scale)。
- `__updatePositionAtTime(t, e)`：【结构证据】调用 `t.mult`。 源码 eyes/src/engine/controllers/ScaleController.js:15；参数 (t, e)。
- `__updateVelocityAtTime(t, e)`：【结构证据】调用 `t.mult`。 源码 eyes/src/engine/controllers/ScaleController.js:18；参数 (t, e)。
- `__update()`：【结构证据】调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`t.mult`、`this.getEntity`、`this.getEntity().getPosition`、`this.getEntity().setPosition`。 源码 eyes/src/engine/controllers/ScaleController.js:21；参数 ()。

### `eyes/src/engine/controllers/SelectController.js`

对相机射线命中实体进行筛选并触发选择回调。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`SelectController extends PioneerPublicApi.BaseController @3`。

#### SelectController

对相机射线命中实体进行筛选并触发选择回调。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/SelectController.js:3](../../eyes/src/engine/controllers/SelectController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_callback`；调用 `super`。 源码 eyes/src/engine/controllers/SelectController.js:4；参数 (t, e)。
- `getCallback()`：【结构证据】返回 `this._callback`。 源码 eyes/src/engine/controllers/SelectController.js:8；参数 ()。
- `setCallback(callback)`：【结构证据】写入 `_callback`。 源码 eyes/src/engine/controllers/SelectController.js:11；参数 (callback)。
- `__update()`：【结构证据】调用 `PioneerPublicApi.Vector2.pool.get`、`PioneerPublicApi.Vector2.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`a.set`、`e.getCamera`。 源码 eyes/src/engine/controllers/SelectController.js:14；参数 ()。

### `eyes/src/engine/controllers/SetParentController.js`

在控制器时间覆盖内切换父实体参考系。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`SetParentController extends PioneerPublicApi.BaseController @3`。

#### SetParentController

在控制器时间覆盖内切换父实体参考系。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/SetParentController.js:3](../../eyes/src/engine/controllers/SetParentController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_parent`；调用 `new PioneerPublicApi.EntityRef`、`super`、`this.getEntity`、`this.getEntity().getScene`。 源码 eyes/src/engine/controllers/SetParentController.js:4；参数 (t, e)。
- `getParent()`：【结构证据】返回 `this._parent.getName()`；调用 `this._parent.getName`。 源码 eyes/src/engine/controllers/SetParentController.js:8；参数 ()。
- `setParent(t)`：【结构证据】调用 `this._parent.getName`、`this._parent.setName`、`this.addDependentState`、`this.removeDependentState`。 源码 eyes/src/engine/controllers/SetParentController.js:11；参数 (t)。
- `__update()`：【结构证据】调用 `this._parent.get`、`this.getEntity`、`this.getEntity().setParent`。 源码 eyes/src/engine/controllers/SetParentController.js:16；参数 ()。

### `eyes/src/engine/controllers/SpinController.js`

围绕指定轴按参考时刻和角速率计算实体姿态。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`SpinController extends PioneerPublicApi.BaseController @3`。

#### SpinController

围绕指定轴按参考时刻和角速率计算实体姿态。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/SpinController.js:3](../../eyes/src/engine/controllers/SpinController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_axis`、`_axisRelativeToEntity`、`_clampedToRealTime`、`_joint`、`_jointObject`、`_jointObjectIndex`、`_lastTime`、`_model`；调用 `e.getScene`、`e.getScene().getEngine`、`e.getScene().getEngine().getTime`、`new PioneerPublicApi.Vector3`、`super`、`this.addModifiedState`。 源码 eyes/src/engine/controllers/SpinController.js:4；参数 (t, e)。
- `getAxis()`：【结构证据】返回 `this._axis`。 源码 eyes/src/engine/controllers/SpinController.js:21；参数 ()。
- `isAxisRelativeToEntity()`：【结构证据】返回 `this._axisRelativeToEntity`。 源码 eyes/src/engine/controllers/SpinController.js:24；参数 ()。
- `setAxis(t, axisRelativeToEntity)`：【结构证据】写入 `_axisRelativeToEntity`；调用 `this._axis.copy`。 源码 eyes/src/engine/controllers/SpinController.js:27；参数 (t, axisRelativeToEntity)。
- `getRate()`：【结构证据】返回 `this._rate`。 源码 eyes/src/engine/controllers/SpinController.js:31；参数 ()。
- `setRate(rate)`：【结构证据】写入 `_rate`。 源码 eyes/src/engine/controllers/SpinController.js:34；参数 (rate)。
- `getReferenceAngle()`：【结构证据】返回 `this._referenceAngle`。 源码 eyes/src/engine/controllers/SpinController.js:37；参数 ()。
- `setReferenceAngle(referenceAngle)`：【结构证据】写入 `_referenceAngle`。 源码 eyes/src/engine/controllers/SpinController.js:40；参数 (referenceAngle)。
- `getReferenceTime()`：【结构证据】返回 `this._referenceTime`。 源码 eyes/src/engine/controllers/SpinController.js:43；参数 ()。
- `setReferenceTime(referenceTime)`：【结构证据】写入 `_referenceTime`。 源码 eyes/src/engine/controllers/SpinController.js:46；参数 (referenceTime)。
- `isClampedToRealTime()`：【结构证据】返回 `this._clampedToRealTime`。 源码 eyes/src/engine/controllers/SpinController.js:49；参数 ()。
- `setClampedToRealTime(clampedToRealTime)`：【结构证据】写入 `_clampedToRealTime`。 源码 eyes/src/engine/controllers/SpinController.js:52；参数 (clampedToRealTime)。
- `isUsingRealTime()`：【结构证据】返回 `this._usingRealTime`。 源码 eyes/src/engine/controllers/SpinController.js:55；参数 ()。
- `setUsingRealTime(usingRealTime)`：【结构证据】写入 `_usingRealTime`。 源码 eyes/src/engine/controllers/SpinController.js:58；参数 (usingRealTime)。
- `isRotatingPosition()`：【结构证据】返回 `this._rotatingPosition`。 源码 eyes/src/engine/controllers/SpinController.js:61；参数 ()。
- `setRotatingPosition(rotatingPosition)`：【结构证据】写入 `_rotatingPosition`；调用 `this.addModifiedState`、`this.removeModifiedState`。 源码 eyes/src/engine/controllers/SpinController.js:64；参数 (rotatingPosition)。
- `setJoint(joint, model)`：【结构证据】写入 `_joint`、`_model`；调用 `this.addModifiedState`、`this.getEntity`、`this.getEntity().getComponent`、`this.removeModifiedState`。 源码 eyes/src/engine/controllers/SpinController.js:68；参数 (joint, model)。
- `__updatePositionAtTime(t, e)`：【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`n.mult`、`n.multInverseR`、`n.setFromAxisAngle`、`t.rotate`。 源码 eyes/src/engine/controllers/SpinController.js:75；参数 (t, e)。
- `__updateOrientationAtTime(t, e)`：【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`n.mult`、`n.multInverseR`、`n.setFromAxisAngle`、`t.copy`。 源码 eyes/src/engine/controllers/SpinController.js:93；参数 (t, e)。
- `__update()`：【结构证据】写入 `_jointObject`、`_jointObjectIndex`、`_lastTime`；调用 `PioneerPublicApi.MathUtils.clamp`、`PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Quaternion.threeJsPool.get`、`PioneerPublicApi.Quaternion.threeJsPool.release`、`PioneerPublicApi.Vector3.pool.get`。 源码 eyes/src/engine/controllers/SpinController.js:102；参数 ()。

### `eyes/src/engine/controllers/TapController.js`

把点击/触摸点转换为点击事件和回调。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`TapController extends PioneerPublicApi.BaseController @3`。

#### TapController

把点击/触摸点转换为点击事件和回调。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/TapController.js:3](../../eyes/src/engine/controllers/TapController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_tapCallback`；调用 `super`。 源码 eyes/src/engine/controllers/TapController.js:4；参数 (t, e)。
- `getTapCallback()`：【结构证据】返回 `this._tapCallback`。 源码 eyes/src/engine/controllers/TapController.js:8；参数 ()。
- `setTapCallback(tapCallback)`：【结构证据】写入 `_tapCallback`。 源码 eyes/src/engine/controllers/TapController.js:11；参数 (tapCallback)。
- `__update()`：【结构证据】调用 `t.getDraggedOffset`、`t.getDraggedOffset().isZero`、`t.isSelected`、`this._tapCallback`、`this.getEntity`、`this.getEntity().getScene`。 源码 eyes/src/engine/controllers/TapController.js:14；参数 ()。

### `eyes/src/engine/controllers/TimeController.js`

将交互输入映射到引擎仿真时间或时间速率。

- 证据：`import ../../vendor/modules/animateFill-168.js`。
- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`import ../../ui/templates/TimeControllerTemplate.html`。
- 证据：`顶层副作用 TimeController.html=getTimeControllerTemplate()`。
- 证据：`顶层副作用 defaultExport=TimeController`。
- 证据：`TimeController extends EyesPublicApi.BaseComponent @7`。

#### TimeController

将交互输入映射到引擎仿真时间或时间速率。 继承：`EyesPublicApi.BaseComponent`。源码 [eyes/src/engine/controllers/TimeController.js:7](../../eyes/src/engine/controllers/TimeController.js#L7)。

- `constructor(t)`：【结构证据】写入 `_class.fontSize.small`、`_class.isPlay`、`_manager`、`_rates`、`_router`；调用 `super`、`this._app.getManager`、`this._manager.getTimeRate`、`this._manager.setDefaultTimeRate`、`this.bindFunctions`、`this.getRateDisplay`。 源码 eyes/src/engine/controllers/TimeController.js:8；参数 (t)。
- `init()`：【结构证据】调用 `0,animateFill.default`、`animateFill.default.setDefaultProps`、`super.init`、`this._app.getManager`、`this._callbackRegistry.push`、`this._children.decreaseContainer.classList.add`。 源码 eyes/src/engine/controllers/TimeController.js:34；参数 ()。
- `getRateLimits()`：【结构证据】返回 `this._rates`。 源码 eyes/src/engine/controllers/TimeController.js:61；参数 ()。
- `setRateLimits(rates)`：【结构证据】写入 `_rates`。 源码 eyes/src/engine/controllers/TimeController.js:64；参数 (rates)。
- `setRate(t)`：【结构证据】调用 `this._manager.getTimeUrl`、`this._router.navigate`。 源码 eyes/src/engine/controllers/TimeController.js:67；参数 (t)。
- `decreaseRate()`：【结构证据】返回 `void`；调用 `this._manager.getTimeRate`、`this._rates.indexOf`、`this.setRate`。 源码 eyes/src/engine/controllers/TimeController.js:73；参数 ()。
- `increaseRate()`：【结构证据】返回 `void`；调用 `this._manager.getTimeRate`、`this._rates.indexOf`、`this.setRate`。 源码 eyes/src/engine/controllers/TimeController.js:78；参数 ()。
- `togglePlayPause()`：【结构证据】调用 `this._manager.getTimeRate`、`this._manager.pause`、`this._manager.play`、`this.setRate`。 源码 eyes/src/engine/controllers/TimeController.js:83；参数 ()。
- `setDefaultRate()`：【结构证据】调用 `this._manager.getDefaultTimeRate`、`this.setRate`。 源码 eyes/src/engine/controllers/TimeController.js:87；参数 ()。
- `setRealRate()`：【结构证据】调用 `this.setRate`。 源码 eyes/src/engine/controllers/TimeController.js:90；参数 ()。
- `onRateChange()`：【结构证据】调用 `this._manager.getDefaultTimeRate`、`this._manager.getTimeRate`、`this._rates.includes`、`this.getRateDisplay`、`this.setRate`、`this.setState`。 源码 eyes/src/engine/controllers/TimeController.js:93；参数 ()。
- `onForcedPause()`：【结构证据】调用 `this.setRate`。 源码 eyes/src/engine/controllers/TimeController.js:103；参数 ()。
- `onForcedPauseResume()`：【结构证据】调用 `this.setDefaultRate`。 源码 eyes/src/engine/controllers/TimeController.js:106；参数 ()。
- `getRateUnit(t=null)`：【结构证据】返回 `{rate:t,unit:a}`；调用 `this._manager.getTimeRate`。 源码 eyes/src/engine/controllers/TimeController.js:109；参数 (t=null)。
- `getRateDisplay(t)`：【结构证据】返回 `0!==rate?rate+unit+"(s)/sec":"paused"`；调用 `this.getRateUnit`。 源码 eyes/src/engine/controllers/TimeController.js:124；参数 (t)。

### `eyes/src/engine/controllers/TransitionController.js`

在起终状态/时间之间平滑过渡实体位置和姿态。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`TransitionController extends PioneerPublicApi.BaseController @3`。

#### TransitionController

在起终状态/时间之间平滑过渡实体位置和姿态。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/TransitionController.js:3](../../eyes/src/engine/controllers/TransitionController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_endPromise`、`_initialOrientation`、`_initialParent`、`_initialPosition`、`_rejectPromise`、`_resolvePromise`、`_transitionFunction`、`_transitionStart`；调用 `e.getOrientation`、`e.getPosition`、`i.getName`、`new PioneerPublicApi.EntityRef`、`new PioneerPublicApi.Quaternion`、`new PioneerPublicApi.Vector3`。 源码 eyes/src/engine/controllers/TransitionController.js:4；参数 (t, e)。
- `getTransitionTime()`：【结构证据】返回 `this._transitionTime`。 源码 eyes/src/engine/controllers/TransitionController.js:27；参数 ()。
- `setTransitionTime(transitionTime)`：【结构证据】写入 `_transitionTime`。 源码 eyes/src/engine/controllers/TransitionController.js:30；参数 (transitionTime)。
- `setTransitionFunction(transitionFunction)`：【结构证据】写入 `_transitionFunction`。 源码 eyes/src/engine/controllers/TransitionController.js:33；参数 (transitionFunction)。
- `getParent()`：【结构证据】返回 `t.getName()` 或 `null!==e?e.getName():""`；调用 `e.getName`、`t.getName`、`this.getEntity`、`this.getEntity().getController`、`this.getEntity().getParent`。 源码 eyes/src/engine/controllers/TransitionController.js:36；参数 ()。
- `setParent(t)`：【结构证据】调用 `e.setParent`、`this.getEntity`、`this.getEntity().getController`。 源码 eyes/src/engine/controllers/TransitionController.js:42；参数 (t)。
- `getTimeRemaining()`：【结构证据】返回 `Math.max(0,this._transitionTime-(Date.now()/1e3-this._transitionStart))`；调用 `Date.now`、`Math.max`。 源码 eyes/src/engine/controllers/TransitionController.js:46；参数 ()。
- `getEndPromise()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/controllers/TransitionController.js:49；参数 ()。
- `__destroy()`：【结构证据】调用 `new PioneerPublicApi.CanceledError`、`super.__destroy`、`this._rejectPromise`、`this.getEntity`、`this.getEntity().getController`、`this.getEntity().removeController`。 源码 eyes/src/engine/controllers/TransitionController.js:52；参数 ()。
- `__update()`：【结构证据】写入 `_transitionStart`、`_transitionTime`；返回 `void this.getEntity().getScene().getEngine().addCallback(()=>{this.isDestroyed()||(this._transitionTime=0,this.getEntity().removeController(this),""!=`；调用 `Date.now`、`Number.isNaN`、`PioneerPublicApi.MathUtils.clamp01`、`new Error`、`t.getPositionRelativeToEntity`、`this._initialParent.get`。 源码 eyes/src/engine/controllers/TransitionController.js:58；参数 ()。
- `_lerpTransitionFunction(t, e, i, n, o, r)`：【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`a.lerp`、`l.slerp`。 源码 eyes/src/engine/controllers/TransitionController.js:79；参数 (t, e, i, n, o, r)。

### `eyes/src/engine/controllers/TranslateController.js`

处理拖动输入并将屏幕/相机空间位移换算到实体位置。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`TranslateController extends PioneerPublicApi.BaseController @3`。

#### TranslateController

处理拖动输入并将屏幕/相机空间位移换算到实体位置。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/TranslateController.js:3](../../eyes/src/engine/controllers/TranslateController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_relativeToOrientation`、`_translation`；调用 `new PioneerPublicApi.Vector3`、`super`、`this.addModifiedState`。 源码 eyes/src/engine/controllers/TranslateController.js:4；参数 (t, e)。
- `getTranslation()`：【结构证据】返回 `this._translation`。 源码 eyes/src/engine/controllers/TranslateController.js:10；参数 ()。
- `setTranslation(t)`：【结构证据】调用 `this._translation.copy`。 源码 eyes/src/engine/controllers/TranslateController.js:13；参数 (t)。
- `setRelativeToOrientation(relativeToOrientation)`：【结构证据】写入 `_relativeToOrientation`。 源码 eyes/src/engine/controllers/TranslateController.js:16；参数 (relativeToOrientation)。
- `__updatePositionAtTime(t, e)`：【结构证据】调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`i.copy`、`i.rotate`。 源码 eyes/src/engine/controllers/TranslateController.js:19；参数 (t, e)。
- `__update()`：【结构证据】调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`t.add`、`t.copy`、`t.rotate`、`this.getEntity`。 源码 eyes/src/engine/controllers/TranslateController.js:30；参数 ()。

### `eyes/src/engine/controllers/ZoomController.js`

按滚轮/触摸缩放输入更新观察距离，并执行距离限制。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`ZoomController extends PioneerPublicApi.BaseController @3`。

#### ZoomController

按滚轮/触摸缩放输入更新观察距离，并执行距离限制。 继承：`PioneerPublicApi.BaseController`。源码 [eyes/src/engine/controllers/ZoomController.js:3](../../eyes/src/engine/controllers/ZoomController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_distanceClamp`、`_zoomSensitivity`、`_zoomSmoothedValue`、`_zoomSmoothness`；调用 `new PioneerPublicApi.Interval`、`super`、`this.addModifiedState`。 源码 eyes/src/engine/controllers/ZoomController.js:4；参数 (t, e)。
- `getZoomSensitivity()`：【结构证据】返回 `this._zoomSensitivity`。 源码 eyes/src/engine/controllers/ZoomController.js:12；参数 ()。
- `setZoomSensitivity(zoomSensitivity)`：【结构证据】写入 `_zoomSensitivity`。 源码 eyes/src/engine/controllers/ZoomController.js:15；参数 (zoomSensitivity)。
- `getZoomSmoothness()`：【结构证据】返回 `this._zoomSmoothness`。 源码 eyes/src/engine/controllers/ZoomController.js:18；参数 ()。
- `setZoomSmoothness(zoomSmoothness)`：【结构证据】写入 `_zoomSmoothness`。 源码 eyes/src/engine/controllers/ZoomController.js:21；参数 (zoomSmoothness)。
- `getDistanceClamp()`：【结构证据】返回 `this._distanceClamp`。 源码 eyes/src/engine/controllers/ZoomController.js:24；参数 ()。
- `setDistanceClamp(t)`：【结构证据】调用 `this._distanceClamp.copy`。 源码 eyes/src/engine/controllers/ZoomController.js:27；参数 (t)。
- `__update()`：【结构证据】写入 `_zoomSmoothedValue`；返回 `void`；调用 `Math.abs`、`Math.max`、`Number.isNaN`、`PioneerPublicApi.MathUtils.clamp`、`PioneerPublicApi.MathUtils.lerp`、`PioneerPublicApi.Vector3.pool.get`。 源码 eyes/src/engine/controllers/ZoomController.js:30；参数 ()。

### `eyes/src/engine/controllers/ZoomFitController.js`

按实体包围半径与相机视场计算合适距离，执行自动取景。

- 证据：`import ../pioneer/index.js`。
- 证据：`ZoomFitController extends Pioneer.BaseController @3`。

#### ZoomFitController

按实体包围半径与相机视场计算合适距离，执行自动取景。 继承：`Pioneer.BaseController`。源码 [eyes/src/engine/controllers/ZoomFitController.js:3](../../eyes/src/engine/controllers/ZoomFitController.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_edgeSize`、`_entities`、`_tightFit`、`_zoomOutOnly`；调用 `new Pioneer.FastMap`、`super`、`this.addModifiedState`。 源码 eyes/src/engine/controllers/ZoomFitController.js:4；参数 (t, e)。
- `addEntity(t)`：【结构证据】调用 `entityRef.setName`、`new Pioneer.EntityRef`、`this._entities.set`、`this.addDependentState`、`this.getEntity`、`this.getEntity().getScene`。 源码 eyes/src/engine/controllers/ZoomFitController.js:12；参数 (t)。
- `removeEntity(t)`：【结构证据】调用 `this._entities.delete`、`this.removeDependentState`。 源码 eyes/src/engine/controllers/ZoomFitController.js:20；参数 (t)。
- `setTightFit(tightFit)`：【结构证据】写入 `_tightFit`。 源码 eyes/src/engine/controllers/ZoomFitController.js:24；参数 (tightFit)。
- `setZoomOutOnly(zoomOutOnly)`：【结构证据】写入 `_zoomOutOnly`。 源码 eyes/src/engine/controllers/ZoomFitController.js:27；参数 (zoomOutOnly)。
- `setEdgeSize(edgeSize)`：【结构证据】写入 `_edgeSize`。 源码 eyes/src/engine/controllers/ZoomFitController.js:30；参数 (edgeSize)。
- `__update()`：【结构证据】返回 `void`；调用 `Math.max`、`Math.min`、`Math.sqrt`、`Math.tan`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`。 源码 eyes/src/engine/controllers/ZoomFitController.js:33；参数 ()。

### `eyes/src/engine/core/AER.js`

方位角、仰角、距离坐标与三维向量之间的转换值对象。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`AER @3`。

#### AER

方位角、仰角、距离坐标与三维向量之间的转换值对象。 继承：`无显式继承`。源码 [eyes/src/engine/core/AER.js:3](../../eyes/src/engine/core/AER.js#L3)。

- `constructor(azimuth=0, elevation=0, range=0)`：【结构证据】写入 `_azimuth`、`_elevation`、`_range`。 源码 eyes/src/engine/core/AER.js:5；参数 (azimuth=0, elevation=0, range=0)。
- `get azimuth()`：【结构证据】读取访问器，返回 `this._azimuth`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/AER.js:29；参数 ()。
- `set azimuth(azimuth)`：【结构证据】写入访问器，接收参数 (azimuth)；实际写入 `_azimuth`。源码 eyes/src/engine/core/AER.js:36；参数 (azimuth)。
- `get elevation()`：【结构证据】读取访问器，返回 `this._elevation`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/AER.js:43；参数 ()。
- `set elevation(elevation)`：【结构证据】写入访问器，接收参数 (elevation)；实际写入 `_elevation`。源码 eyes/src/engine/core/AER.js:50；参数 (elevation)。
- `get range()`：【结构证据】读取访问器，返回 `this._range`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/AER.js:57；参数 ()。
- `set range(range)`：【结构证据】写入访问器，接收参数 (range)；实际写入 `_range`。源码 eyes/src/engine/core/AER.js:64；参数 (range)。
- `method toString(t=false)`：【结构证据】本访问器没有 AST 可见的 this 字段直接赋值；调用 `PioneerPublicApi.MathUtils.radToDeg`。源码 eyes/src/engine/core/AER.js:71；参数 (t=false)。
- `copy(t)`：【结构证据】写入 `_azimuth`、`_elevation`、`_range`。 源码 eyes/src/engine/core/AER.js:31；参数 (t)。
- `set(azimuth, elevation, range)`：【结构证据】写入 `_azimuth`、`_elevation`、`_range`。 源码 eyes/src/engine/core/AER.js:36；参数 (azimuth, elevation, range)。
- `setFromVector(t)`：【结构证据】写入 `_azimuth`、`_elevation`、`_range`；调用 `Math.asin`、`Math.atan2`、`t.magnitude`。 源码 eyes/src/engine/core/AER.js:41；参数 (t)。

### `eyes/src/engine/core/Animation.js`

基于时间/持续时长推进动画回调，保存播放和完成状态。

- 证据：`import ../pioneer/index.js`。
- 证据：`Animation @3`。

#### Animation

基于时间/持续时长推进动画回调，保存播放和完成状态。 继承：`无显式继承`。源码 [eyes/src/engine/core/Animation.js:3](../../eyes/src/engine/core/Animation.js#L3)。

- `makeSubobjectVisibleAnimation(t, e, i, n)`：【结构证据】返回 `o`；调用 `Pioneer.Sort.getIndexObject`、`n.sort`、`new Pioneer.Interval`、`o.getScene`、`o.getScene().getEngine`、`o.getScene().getEngine().getTime`。 源码 eyes/src/engine/core/Animation.js:4；参数 (t, e, i, n)。
- `makeJointRotationAnimation(t, e, i, n)`：【结构证据】返回 `o`；调用 `Pioneer.MathUtils.lerp`、`Pioneer.Sort.getIndexObject`、`n.sort`、`new Pioneer.Interval`、`o.getScene`、`o.getScene().getEngine`。 源码 eyes/src/engine/core/Animation.js:15；参数 (t, e, i, n)。

### `eyes/src/engine/core/AnimationUtils.js`

为动画生成插值/缓动函数和组合操作。

- 证据：`顶层副作用 AnimationUtils.createAnimation=(t,e,i)=>{const keyframeEffect=new KeyframeEffect(t,e,i);return new Animation(keyframeEffect,t.ownerDocument.timeline);}`。
- 证据：`顶层副作用 AnimationUtils.directionalFade=(t,{direction:e="up",fade:i="in",yOffset:s=0,xOffset:n=0,timings:o=AnimationUtils.defaultTimings})=>{const r={x:{ori:0,dest:0},y:{ori:0,dest:0},opacity:{ori:1,dest:0}};"up"===e||"down"===e?`。
- 证据：`顶层副作用 AnimationUtils.defaultTimings={duration:1e3,iteration:1,fill:"forwards",easing:"ease"}`。
- 证据：`AnimationUtils @2`。

#### AnimationUtils

为动画生成插值/缓动函数和组合操作。 继承：`无显式继承`。源码 [eyes/src/engine/core/AnimationUtils.js:2](../../eyes/src/engine/core/AnimationUtils.js#L2)。


### `eyes/src/engine/core/AppUtils.js`

连接设备模式、路由/内容和应用界面常用逻辑的工具集合。

- 证据：`import ../../vendor/modules/Unidentified157.cjs`。
- 证据：`import ../../vendor/modules/Unidentified158.cjs`。
- 证据：`import ../../vendor/modules/Unidentified159.cjs`。
- 证据：`import ../../vendor/modules/Unidentified160.cjs`。
- 证据：`AppUtils @12`。

#### AppUtils

连接设备模式、路由/内容和应用界面常用逻辑的工具集合。 继承：`无显式继承`。源码 [eyes/src/engine/core/AppUtils.js:12](../../eyes/src/engine/core/AppUtils.js#L12)。

- `isEmptyObject(t)`：【结构证据】返回 `t.constructor===Object&&0===Object.keys(t).length`；调用 `Object.keys`。 源码 eyes/src/engine/core/AppUtils.js:26；参数 (t)。
- `addStartToPath(t, e="/")`：【结构证据】返回 `t.startsWith(e)?t:e+t`；调用 `t.startsWith`。 源码 eyes/src/engine/core/AppUtils.js:29；参数 (t, e="/")。
- `cleanPathDuplicate(t, e="/", i="/")`：【结构证据】返回 `t.replace(regExp,i)`；调用 `new RegExp`、`t.replace`。 源码 eyes/src/engine/core/AppUtils.js:32；参数 (t, e="/", i="/")。
- `addEndToPath(t, e="/")`：【结构证据】返回 `t.endsWith(e)?t:t+e`；调用 `t.endsWith`。 源码 eyes/src/engine/core/AppUtils.js:36；参数 (t, e="/")。
- `isElement(t)`：【结构证据】返回 `t instanceof Element||t instanceof Document`。 源码 eyes/src/engine/core/AppUtils.js:39；参数 (t)。
- `isHTML(t)`：【结构证据】返回 `"string"==typeof t&&null!==t.match(/<[^/>]+>/gm)&&null!==t.match(/<\/[^>]+>/gm)`；调用 `t.match`。 源码 eyes/src/engine/core/AppUtils.js:42；参数 (t)。
- `hasHTML(t)`：【结构证据】返回 `false` 或 `Array.from(e.body.childNodes).some(t=>1===t.nodeType)`；调用 `Array.from`、`Array.from(e.body.childNodes).some`、`new DOMParser`、`new DOMParser().parseFromString`。 源码 eyes/src/engine/core/AppUtils.js:45；参数 (t)。
- `loadJSON(t)`：【结构证据】返回 `e.json()`；调用 `AppUtils.addEndToPath`、`e.json`、`fetch`、`new Error`；含显式错误分支。 源码 eyes/src/engine/core/AppUtils.js:50；参数 (t)。
- `msToTime(t=0)`：【结构证据】返回 `{hour:(t-s)/60,minute:s,second:i,millisecond:e}`。 源码 eyes/src/engine/core/AppUtils.js:59；参数 (t=0)。
- `formatCountdownTime(t, e)`：【结构证据】返回 ``${t>=36e5?i.hour+":":""}${i.minute||"00"}:${i.second}``；调用 `i.hour.toString`、`i.hour.toString().padStart`、`i.minute.toString`、`i.minute.toString().padStart`、`i.second.toString`、`i.second.toString().padStart`。 源码 eyes/src/engine/core/AppUtils.js:70；参数 (t, e)。
- `minToSec(t)`：【结构证据】返回 `60*t`。 源码 eyes/src/engine/core/AppUtils.js:77；参数 (t)。
- `minToMS(t)`：【结构证据】返回 `6e4*t`。 源码 eyes/src/engine/core/AppUtils.js:80；参数 (t)。
- `isFutureMission(t)`：【结构证据】返回 `new Date(t)>date`；调用 `new Date`。 源码 eyes/src/engine/core/AppUtils.js:83；参数 (t)。
- `deepCopy(t)`：【结构证据】返回 `JSON.parse(JSON.stringify(t))`；调用 `JSON.parse`、`JSON.stringify`。 源码 eyes/src/engine/core/AppUtils.js:87；参数 (t)。
- `deepClone(t)`：【结构证据】返回 `e`；调用 `AppUtils.deepClone`、`Array.isArray`。 源码 eyes/src/engine/core/AppUtils.js:90；参数 (t)。
- `deepMerge(t, e)`：【结构证据】返回 `getUnidentified157()(t,e,i)`；调用 `Boolean`、`getUnidentified157`、`getUnidentified157()`。 源码 eyes/src/engine/core/AppUtils.js:98；参数 (t, e)。
- `deepEqual(t, e)`：【结构证据】返回 `false` 或 `true`；调用 `AppUtils.deepEqual`、`AppUtils.isObject`、`Object.keys`。 源码 eyes/src/engine/core/AppUtils.js:104；参数 (t, e)。
- `isObject(t)`：【结构证据】返回 `null!==t&&"object"==typeof t`。 源码 eyes/src/engine/core/AppUtils.js:118；参数 (t)。
- `filterObject(t, e)`：【结构证据】返回 `Object.fromEntries(Object.entries(t).filter(([t,i])=>e(i,t)))`；调用 `Object.entries`、`Object.entries(t).filter`、`Object.fromEntries`、`e`。 源码 eyes/src/engine/core/AppUtils.js:121；参数 (t, e)。
- `debounce()`：【结构证据】返回 `getUnidentified158()(...arguments)`；调用 `getUnidentified158`、`getUnidentified158()`。 源码 eyes/src/engine/core/AppUtils.js:124；参数 ()。
- `throttle()`：【结构证据】返回 `getUnidentified159()(...arguments)`；调用 `getUnidentified159`、`getUnidentified159()`。 源码 eyes/src/engine/core/AppUtils.js:127；参数 ()。
- `waitFor(t)`：【结构证据】返回 `new Promise(e=>{setTimeout(()=>{e();},t);})`；调用 `e`、`new Promise`、`setTimeout`。 源码 eyes/src/engine/core/AppUtils.js:130；参数 (t)。
- `isPortrait()`：【结构证据】返回 `window.matchMedia("(orientation: portrait)").matches`；调用 `window.matchMedia`。 源码 eyes/src/engine/core/AppUtils.js:137；参数 ()。
- `isLandscape()`：【结构证据】返回 `window.matchMedia("(orientation: landscape)").matches`；调用 `window.matchMedia`。 源码 eyes/src/engine/core/AppUtils.js:140；参数 ()。
- `isMobileLandscape()`：【结构证据】返回 `window.matchMedia("(min-width: 320px) and (max-width: 915px) and (orientation: landscape)").matches`；调用 `window.matchMedia`。 源码 eyes/src/engine/core/AppUtils.js:143；参数 ()。
- `isMobilePortrait()`：【结构证据】返回 `window.matchMedia("(min-width: 320px) and (max-width: 640px) and (orientation: portrait)").matches`；调用 `window.matchMedia`。 源码 eyes/src/engine/core/AppUtils.js:146；参数 ()。
- `isMobile()`：【结构证据】返回 `AppUtils.isMobileLandscape()||AppUtils.isMobilePortrait()`；调用 `AppUtils.isMobileLandscape`、`AppUtils.isMobilePortrait`。 源码 eyes/src/engine/core/AppUtils.js:149；参数 ()。
- `isAppleDevice()`：【结构证据】返回 `true===AppUtils.isiPhone()||true===AppUtils.isiPad()`；调用 `AppUtils.isiPad`、`AppUtils.isiPhone`。 源码 eyes/src/engine/core/AppUtils.js:152；参数 ()。
- `isiPhone()`：【结构证据】返回 `"iPhone"===(window.navigator?.userAgentData?.platform||window.navigator?.platform||"unknown")`。 源码 eyes/src/engine/core/AppUtils.js:155；参数 ()。
- `isiPad()`：【结构证据】返回 `"MacIntel"===t&&e`。 源码 eyes/src/engine/core/AppUtils.js:158；参数 ()。
- `isTabletPortrait()`：【结构证据】返回 `window.matchMedia("(min-width: 641px) and (max-width: 1024px) and (orientation: portrait)").matches`；调用 `window.matchMedia`。 源码 eyes/src/engine/core/AppUtils.js:163；参数 ()。
- `isTabletLandscape()`：【结构证据】返回 `window.matchMedia("(min-width: 916px) and (max-width: 1024px) and (orientation: landscape)").matches`；调用 `window.matchMedia`。 源码 eyes/src/engine/core/AppUtils.js:166；参数 ()。
- `isTablet()`：【结构证据】返回 `AppUtils.isTabletLandscape()||AppUtils.isTabletPortrait()`；调用 `AppUtils.isTabletLandscape`、`AppUtils.isTabletPortrait`。 源码 eyes/src/engine/core/AppUtils.js:169；参数 ()。
- `isMobileMode()`：【结构证据】返回 `AppUtils.isMobilePortrait()||AppUtils.isMobileLandscape()||AppUtils.isTabletLandscape()||AppUtils.isTabletPortrait()||AppUtils.isPanorama()`；调用 `AppUtils.isMobileLandscape`、`AppUtils.isMobilePortrait`、`AppUtils.isPanorama`、`AppUtils.isTabletLandscape`、`AppUtils.isTabletPortrait`。 源码 eyes/src/engine/core/AppUtils.js:172；参数 ()。
- `isDesktop()`：【结构证据】返回 `window.matchMedia("(min-width: 1025px) and (min-height: 600px)").matches`；调用 `window.matchMedia`。 源码 eyes/src/engine/core/AppUtils.js:175；参数 ()。
- `isPanorama()`：【结构证据】返回 `window.matchMedia("(min-width: 1025px) and (max-height: 599px) and (orientation: landscape)").matches`；调用 `window.matchMedia`。 源码 eyes/src/engine/core/AppUtils.js:178；参数 ()。
- `is2K()`：【结构证据】返回 `window.matchMedia("(min-width: 2880px) and (min-height: 1620px)").matches`；调用 `window.matchMedia`。 源码 eyes/src/engine/core/AppUtils.js:181；参数 ()。
- `is4K()`：【结构证据】返回 `window.matchMedia("(min-width: 3200px) and (min-height: 1800px)").matches`；调用 `window.matchMedia`。 源码 eyes/src/engine/core/AppUtils.js:184；参数 ()。
- `isTouch()`：【结构证据】返回 `"ontouchstart"in window||window.navigator.maxTouchPoints>0`。 源码 eyes/src/engine/core/AppUtils.js:187；参数 ()。
- `isPrimaryTouch()`：【结构证据】返回 `window.matchMedia("(pointer: coarse)").matches`；调用 `window.matchMedia`。 源码 eyes/src/engine/core/AppUtils.js:190；参数 ()。
- `canHover()`：【结构证据】返回 `!matchMedia("(hover: none)").matches`；调用 `matchMedia`。 源码 eyes/src/engine/core/AppUtils.js:193；参数 ()。
- `htmlToElement(t)`：【结构证据】返回 `e.content.firstElementChild`；调用 `document.createElement`、`t.replace`、`t.replace(/[\t\n]+/g,"").trim`。 源码 eyes/src/engine/core/AppUtils.js:196；参数 (t)。
- `htmlToElements(t)`：【结构证据】返回 `e.content.cloneNode(true).childNodes`；调用 `document.createElement`、`e.content.cloneNode`、`t.replace`、`t.replace(/[\t\n]+/g,"").trim`。 源码 eyes/src/engine/core/AppUtils.js:201；参数 (t)。
- `insertParamsToHTML(t, e={})`：【结构证据】返回 `t=t.replaceAll(/{\$([A-Z])\w+}/gi,"")`；调用 `Object.keys`、`t.replace`、`t.replace(/[\t\n]+/g,"").trim`、`t.replaceAll`。 源码 eyes/src/engine/core/AppUtils.js:206；参数 (t, e={})。
- `htmlWithParamsToElement(t, e={})`：【结构证据】返回 `AppUtils.htmlToElement(t)`；调用 `AppUtils.htmlToElement`、`AppUtils.insertParamsToHTML`。 源码 eyes/src/engine/core/AppUtils.js:216；参数 (t, e={})。
- `onAttachElement(t, e, {interval:i=100,timeout:s=5e3}={})`：【结构证据】调用 `clearInterval`、`clearTimeout`、`console.error`、`document.body.contains`、`document.querySelector`、`e`。 源码 eyes/src/engine/core/AppUtils.js:220；参数 (t, e, {interval:i=100,timeout:s=5e3}={})。
- `appendWithCallback(t, e, i, s)`：【结构证据】调用 `document.querySelector`、`mutationObserver.disconnect`、`mutationObserver.observe`、`new MutationObserver`、`new Promise`、`t`。 源码 eyes/src/engine/core/AppUtils.js:232；参数 (t, e, i, s)。
- `elementReady(t, e=1e3)`：【结构证据】返回 `new Promise((i,s)=>{const n=document.querySelector(t);if(n)return void i(n);const mutationObserver=new MutationObserver(()=>{const e=document.querySel`；调用 `clearTimeout`、`console.warn`、`document.querySelector`、`i`、`mutationObserver.disconnect`、`mutationObserver.observe`。 源码 eyes/src/engine/core/AppUtils.js:245；参数 (t, e=1e3)。
- `addScrollbar(t, e={})`：【结构证据】返回 `getUnidentified160()(t,i)`；调用 `getUnidentified160`、`getUnidentified160()`。 源码 eyes/src/engine/core/AppUtils.js:263；参数 (t, e={})。
- `formatNumber(t, e=3, i=void 0)`：【结构证据】返回 `t.toLocaleString(void 0,{maximumFractionDigits:e,minimumFractionDigits:i})`；调用 `t.toLocaleString`。 源码 eyes/src/engine/core/AppUtils.js:284；参数 (t, e=3, i=void 0)。
- `formatDate(t, e={})`：【结构证据】返回 `t.toLocaleString(void 0,{year:"numeric",month:"long",day:"numeric",...e})`；调用 `t.toLocaleString`。 源码 eyes/src/engine/core/AppUtils.js:290；参数 (t, e={})。
- `tween(t, e, {onUpdate:onUpdate,onComplete:onComplete,duration:n=2e3}={})`：【结构证据】返回 `r`；调用 `0,Easing.update`、`a`、`cancelAnimationFrame`、`new Easing.Tween`、`new Easing.Tween(t).to`、`new Easing.Tween(t).to(e,n).onUpdate`。 源码 eyes/src/engine/core/AppUtils.js:298；参数 (t, e, {onUpdate:onUpdate,onComplete:onComplete,duration:n=2e3}={})。
- `convertObjType(t)`：【结构证据】返回 `t`；调用 `Object.entries`、`Object.entries(t).forEach`、`i.trim`、`isNaN`、`parseFloat`。 源码 eyes/src/engine/core/AppUtils.js:317；参数 (t)。

### `eyes/src/engine/core/BaseApp.js`

创建 Pioneer 引擎并组织应用管理器、UI 组件、场景与初始化流程。

- 证据：`import ../../vendor/modules/FollowName.cjs`。
- 证据：`import ../pioneer/index.js`。
- 证据：`import ../solar-system/public-api.js`。
- 证据：`import ./Unidentified738.js`。
- 证据：`顶层副作用 window.addEventListener("load",async()=>{try{new BaseApp._appClass().init();}catch(t){throw document.body.innerHTML="",t;}})`。
- 证据：`顶层副作用 BaseApp._appClass=BaseApp`。
- 证据：`顶层副作用 window.Pioneer=Pioneer`。
- 证据：`BaseApp @11`。

#### BaseApp

创建 Pioneer 引擎并组织应用管理器、UI 组件、场景与初始化流程。 继承：`无显式继承`。源码 [eyes/src/engine/core/BaseApp.js:11](../../eyes/src/engine/core/BaseApp.js#L11)。

- `setAppClass()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/BaseApp.js:12；参数 ()。
- `constructor(componentTypes)`：【结构证据】写入 `_cameraScripts`、`_componentInfo`、`_componentTypes`、`_components`、`_dragging`、`_dynamicElement`、`_element`、`_entityInfo`；调用 `document.documentElement.style.setProperty`、`new EyesPublicApi.CameraScripts`、`this.bindFunctions`、`this.resize`、`window.addEventListener`。 源码 eyes/src/engine/core/BaseApp.js:15；参数 (componentTypes)。
- `init()`：【结构证据】写入 `_dynamicElement`、`_element`、`_pioneer`、`_staticElement`；调用 `Pioneer.TimeUtils.now`、`document.getElementById`、`new Pioneer.Engine`、`this._pioneer.getConfig`、`this._pioneer.getConfig().setValue`、`this._pioneer.getDownloader`。 源码 eyes/src/engine/core/BaseApp.js:56；参数 ()。
- `pioneer()`：【结构证据】返回 `this._pioneer`。 源码 eyes/src/engine/core/BaseApp.js:93；参数 ()。
- `get scene()`：【结构证据】读取访问器，返回 `this._scene`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/BaseApp.js:127；参数 ()。
- `set scene(scene)`：【结构证据】写入访问器，接收参数 (scene)；实际写入 `_scene`。源码 eyes/src/engine/core/BaseApp.js:134；参数 (scene)。
- `cameraScripts()`：【结构证据】返回 `this._cameraScripts`。 源码 eyes/src/engine/core/BaseApp.js:102；参数 ()。
- `dynamicElement()`：【结构证据】返回 `this._dynamicElement`。 源码 eyes/src/engine/core/BaseApp.js:105；参数 ()。
- `staticElement()`：【结构证据】返回 `this._staticElement`。 源码 eyes/src/engine/core/BaseApp.js:108；参数 ()。
- `sceneInfo()`：【结构证据】返回 `this._sceneInfo`。 源码 eyes/src/engine/core/BaseApp.js:111；参数 ()。
- `get element()`：【结构证据】读取访问器，返回 `this._element`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/BaseApp.js:165；参数 ()。
- `set element(element)`：【结构证据】写入访问器，接收参数 (element)；实际写入 `_element`。源码 eyes/src/engine/core/BaseApp.js:172；参数 (element)。
- `get isSearching()`：【结构证据】读取访问器，返回 `this._isSearching`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/BaseApp.js:179；参数 ()。
- `set isSearching(isSearching)`：【结构证据】写入访问器，接收参数 (isSearching)；实际写入 `_isSearching`。源码 eyes/src/engine/core/BaseApp.js:186；参数 (isSearching)。
- `addManager(t, e, ...i)`：【结构证据】写入 `_managers[t]`；返回 `this._managers[t]`；调用 `new e`。 源码 eyes/src/engine/core/BaseApp.js:126；参数 (t, e, ...i)。
- `removeManager(t)`：【结构证据】调用 `this._managers[t].destroy`。 源码 eyes/src/engine/core/BaseApp.js:130；参数 (t)。
- `getManager(t)`：【结构证据】返回 `void 0!==this._managers[t]?this._managers[t]:null`。 源码 eyes/src/engine/core/BaseApp.js:133；参数 (t)。
- `createManagers()`：【结构证据】写入 `_scene`；调用 `EyesPublicApi.Types.get`、`Object.keys`、`_.initLabelWeights`、`_.registerCallback`、`d.addCallback`、`d.addLayer`。 源码 eyes/src/engine/core/BaseApp.js:136；参数 ()。
- `setUpManagers()`：【结构证据】调用 `Array.from`、`getFollowName`、`getFollowName()`、`this.getManager`、`this.getManager("scene").getEntitiesNames`、`this.getManager("selection").setScene`。 源码 eyes/src/engine/core/BaseApp.js:330；参数 ()。
- `addComponent(t, e, ...i)`：【结构证据】写入 `_components[t]`；返回 `s`；调用 `new Error`、`new e`、`s.init`；含显式错误分支。 源码 eyes/src/engine/core/BaseApp.js:348；参数 (t, e, ...i)。
- `addComponentWithPlaceholder(t, e=document, i=null)`：【结构证据】返回 `Promise.reject(new Error(`addComponentWithPlaceholder: There is no placeholder element for ${t.type}`))` 或 `s`；调用 `Array.from`、`EyesPublicApi.AppUtils.convertObjType`、`Object.assign`、`Promise.reject`、`e.getElementsByTagName`、`new Error`。 源码 eyes/src/engine/core/BaseApp.js:355；参数 (t, e=document, i=null)。
- `removeComponent(t)`：【结构证据】返回 `void 0!==this._components[t]&&(this._components[t].destroy(),delete this._components[t],true)`；调用 `this._components[t].destroy`。 源码 eyes/src/engine/core/BaseApp.js:367；参数 (t)。
- `removeComponents()`：【结构证据】调用 `this.removeComponent`。 源码 eyes/src/engine/core/BaseApp.js:370；参数 ()。
- `getComponent(t)`：【结构证据】返回 `void 0!==this._components[t]?this._components[t]:null`。 源码 eyes/src/engine/core/BaseApp.js:373；参数 (t)。
- `getComponents()`：【结构证据】返回 `this._components`。 源码 eyes/src/engine/core/BaseApp.js:376；参数 ()。
- `createComponents()`：【结构证据】调用 `EyesPublicApi.Types.get`、`l.create`、`postCreationFunction`。 源码 eyes/src/engine/core/BaseApp.js:379；参数 ()。
- `addShortcuts()`：【结构证据】调用 `document.addEventListener`、`searchDesktopComponent._children.input.focus`、`searchDesktopComponent.open`、`this.getComponent`。 源码 eyes/src/engine/core/BaseApp.js:404；参数 ()。
- `setUpComponents()`：【结构证据】写入 `dynamicElement.innerHTML`；调用 `EyesPublicApi.Types.get`、`a.create`、`postCreationFunction`。 源码 eyes/src/engine/core/BaseApp.js:410；参数 ()。
- `getViews()`：【结构证据】返回 `this._views`。 源码 eyes/src/engine/core/BaseApp.js:426；参数 ()。
- `addViews()`：【结构证据】调用 `this.addView`。 源码 eyes/src/engine/core/BaseApp.js:429；参数 ()。
- `removeViews()`：【结构证据】调用 `this.removeView`。 源码 eyes/src/engine/core/BaseApp.js:435；参数 ()。
- `getView(t)`：【结构证据】返回 `void 0!==this._views[t]?this._views[t]:null`。 源码 eyes/src/engine/core/BaseApp.js:438；参数 (t)。
- `addView(t, e, ...i)`：【结构证据】写入 `_views[t]`；返回 `this._views[t]`；调用 `new e`。 源码 eyes/src/engine/core/BaseApp.js:441；参数 (t, e, ...i)。
- `removeView(t)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/BaseApp.js:445；参数 (t)。
- `setUpScene()`：【结构证据】写入 `getManager("camera").defaultMaxDistance`、`scene`；返回 `void console.error("App._sceneInfo needs to be set.")`；调用 `console.error`、`sceneManager.addEntitiesFromSceneInfo`、`sceneManager.addEntityLoadedCallback`、`sceneManager.addEntityWillBeUnloadedCallback`、`sceneManager.update`、`this.getManager`。 源码 eyes/src/engine/core/BaseApp.js:448；参数 ()。
- `setUpViewportAndCamera()`：【结构证据】写入 `cameraScripts.cameraEntity`、`cameraScripts.scene`；调用 `cameraManager.createViewportAndCamera`、`this.getManager`。 源码 eyes/src/engine/core/BaseApp.js:465；参数 ()。
- `setUpUpdates()`：【结构证据】调用 `this.addUpdate`、`this.getManager`。 源码 eyes/src/engine/core/BaseApp.js:472；参数 ()。
- `addUpdate(t)`：【结构证据】调用 `this._updates.push`。 源码 eyes/src/engine/core/BaseApp.js:477；参数 (t)。
- `removeUpdate(t)`：【结构证据】调用 `this._updates.indexOf`、`this._updates.splice`。 源码 eyes/src/engine/core/BaseApp.js:480；参数 (t)。
- `update()`：【结构证据】调用 `0,this._updates[t]`。 源码 eyes/src/engine/core/BaseApp.js:484；参数 ()。
- `bindFunctions(t=[])`：【结构证据】调用 `e[s].bind`。 源码 eyes/src/engine/core/BaseApp.js:489；参数 (t=[])。
- `endLoadingScreen()`：【结构证据】调用 `document.getElementById`、`setTimeout`、`t.remove`。 源码 eyes/src/engine/core/BaseApp.js:496；参数 ()。
- `setUpRoutes()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/BaseApp.js:507；参数 ()。
- `isDragging()`：【结构证据】返回 `this._dragging`。 源码 eyes/src/engine/core/BaseApp.js:508；参数 ()。
- `isTouchMax()`：【结构证据】返回 `this._touchMax`。 源码 eyes/src/engine/core/BaseApp.js:511；参数 ()。
- `resize()`：【结构证据】写入 `canHover`、`isTouch`；调用 `EyesPublicApi.AppUtils.canHover`、`EyesPublicApi.AppUtils.isTouch`、`document.body.classList.toggle`、`document.documentElement.style.setProperty`、`setTimeout`。 源码 eyes/src/engine/core/BaseApp.js:514；参数 ()。
- `onTouchStart(t)`：【结构证据】写入 `_dragging`、`_scrollable`、`_touchCount`、`_touchMax`、`_touchStartPos.x`、`_touchStartPos.y`；调用 `i.classList.contains`。 源码 eyes/src/engine/core/BaseApp.js:530；参数 (t)。
- `onTouchMove(t)`：【结构证据】写入 `_dragging`；调用 `Math.abs`、`Math.max`、`t.preventDefault`。 源码 eyes/src/engine/core/BaseApp.js:547；参数 (t)。
- `onTouchEnd(t)`：【结构证据】写入 `_dragging`、`_scrollable`、`_touchCount`、`_touchMax`。 源码 eyes/src/engine/core/BaseApp.js:552；参数 (t)。
- `getPioneerVersion()`：【结构证据】返回 `this.pioneer.getVersion()`；调用 `this.pioneer.getVersion`。 源码 eyes/src/engine/core/BaseApp.js:558；参数 ()。
- `getEyesVersion()`：【结构证据】返回 `EyesPublicApi.EyesVersion`。 源码 eyes/src/engine/core/BaseApp.js:561；参数 ()。

### `eyes/src/engine/core/BaseContentBlock.js`

故事/信息面板内容块的 DOM 生命周期和公共设置基类。

- 证据：`import ../../framework/eyes/index.js`。
- 证据：`import ../../styles/extracted/BaseContentBlockStyles.js`。
- 证据：`BaseContentBlock extends Eyes.BaseComponent @4`。

#### BaseContentBlock

故事/信息面板内容块的 DOM 生命周期和公共设置基类。 继承：`Eyes.BaseComponent`。源码 [eyes/src/engine/core/BaseContentBlock.js:4](../../eyes/src/engine/core/BaseContentBlock.js#L4)。

- `constructor(t, e, i={})`：【结构证据】写入 `_more`；调用 `Object.assign`、`super`。 源码 eyes/src/engine/core/BaseContentBlock.js:5；参数 (t, e, i={})。
- `init()`：【结构证据】调用 `super.init`、`this._element.classList.add`、`this._setVariables`。 源码 eyes/src/engine/core/BaseContentBlock.js:26；参数 ()。
- `showMore()`：【结构证据】调用 `this.setState`。 源码 eyes/src/engine/core/BaseContentBlock.js:31；参数 ()。
- `hideMore()`：【结构证据】调用 `this.setState`。 源码 eyes/src/engine/core/BaseContentBlock.js:37；参数 ()。
- `toggleMore()`：【结构证据】调用 `this.hideMore`、`this.showMore`。 源码 eyes/src/engine/core/BaseContentBlock.js:43；参数 ()。

### `eyes/src/engine/core/BaseRef.js`

延迟引用基类：get 时刷新，过滤禁用对象，并只在引用身份变化时回调。

- 证据：`BaseRef @2`。

#### BaseRef

延迟引用基类：get 时刷新，过滤禁用对象，并只在引用身份变化时回调。 继承：`无显式继承`。源码 [eyes/src/engine/core/BaseRef.js:2](../../eyes/src/engine/core/BaseRef.js#L2)。

- `constructor()`：【结构证据】写入 `_ref`、`_refChangedCallback`。 源码 eyes/src/engine/core/BaseRef.js:3；参数 ()。
- `get()`：先调用虚方法 update 再返回缓存；getRef 只返回缓存，不主动解析。 源码 eyes/src/engine/core/BaseRef.js:7；参数 ()。
- `setRefChangedCallback(refChangedCallback)`：【结构证据】写入 `_refChangedCallback`。 源码 eyes/src/engine/core/BaseRef.js:11；参数 (refChangedCallback)。
- `update()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/BaseRef.js:14；参数 ()。
- `getRef()`：【结构证据】返回 `this._ref`。 源码 eyes/src/engine/core/BaseRef.js:15；参数 ()。
- `_setRef(t)`：先将禁用目标折叠为 null，仅身份改变才保存新值并以 (oldRef,newRef) 调用回调；避免每帧重复触发资源绑定。 源码 eyes/src/engine/core/BaseRef.js:18；参数 (t)。

### `eyes/src/engine/core/BasicAlphaShader.js`

声明 BasicAlphaShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。

- 证据：`import ./ShaderChunkLogDepth.js`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/BasicShader.js`

声明 BasicShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。

- 证据：`import ./ShaderChunkLogDepth.js`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/CameraScripts.js`

应用级观察脚本：解析实体/系统目标，协调 camera 管理器与场景过渡。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ../solar-system/public-api.js`。
- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`顶层副作用 CameraScripts.CONTEXT={CELESTIAL_OBJECT:0,SPACECRAFT:1,ALIGN_SPACECRAFT:2,LOCATION:3,SYSTEM:4,COMPARE:5,LOOK_AT:6,LOCKED_ON:7,INSTRUMENT:8,ALIGN_OBJECTS:9,CENTER_SYSTEM:10,CENTER_LOCATION:11,LOOK_SURFACE_LAT_LON:12}`。
- 证据：`CameraScripts extends EyesPublicApi.BaseManager @5`。

#### CameraScripts

应用级观察脚本：解析实体/系统目标，协调 camera 管理器与场景过渡。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/core/CameraScripts.js:5](../../eyes/src/engine/core/CameraScripts.js#L5)。

- `constructor(t)`：【结构证据】写入 `_cameraManager`、`_customSystemDistances`、`_easeInOutExpoTransition`、`_easeOutExpoTransition`、`_onCameraTransition`；调用 `super`、`this._easeInOutExpoTransition.bind`、`this._easeOutExpoTransition.bind`。 源码 eyes/src/engine/core/CameraScripts.js:6；参数 (t)。
- `setCameraManager(cameraManager)`：【结构证据】写入 `_cameraManager`。 源码 eyes/src/engine/core/CameraScripts.js:28；参数 (cameraManager)。
- `get scene()`：【结构证据】读取访问器，返回 `this._scene`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/CameraScripts.js:55；参数 ()。
- `set scene(scene)`：【结构证据】写入访问器，接收参数 (scene)；实际写入 `_scene`。源码 eyes/src/engine/core/CameraScripts.js:62；参数 (scene)。
- `get cameraEntity()`：【结构证据】读取访问器，返回 `this._cameraEntity`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/CameraScripts.js:69；参数 ()。
- `set cameraEntity(cameraEntity)`：【结构证据】写入访问器，接收参数 (cameraEntity)；实际写入 `_cameraEntity`。源码 eyes/src/engine/core/CameraScripts.js:76；参数 (cameraEntity)。
- `getNormalToEcliptic(t, e)`：【结构证据】调用 `new Pioneer.Quaternion`、`quaternion.getAxis`、`this._cameraManager.pioneer.getScene`、`this._cameraManager.pioneer.getScene("main").getEntity`、`this._cameraManager.pioneer.getScene("main").getEntity(e).getController`、`this._cameraManager.pioneer.getScene("main").getEntity(e).getController(Pioneer.DynamoController).getOrbitOrientation`。 源码 eyes/src/engine/core/CameraScripts.js:43；参数 (t, e)。
- `isBarycenter(t)`：【结构证据】返回 `!!t.includes("_barycenter")`；调用 `t.includes`。 源码 eyes/src/engine/core/CameraScripts.js:48；参数 (t)。
- `removeBarycenter(t)`：【结构证据】返回 `this.isBarycenter(t)?t.replace("_barycenter",""):t`；调用 `t.replace`、`this.isBarycenter`。 源码 eyes/src/engine/core/CameraScripts.js:51；参数 (t)。
- `lookAtSurfaceLatLon(t, e=0, i=0, {scene:scene,cinematic:r=false,duration:a=1.5,distance:l=1.3}={})`：【结构证据】返回 `void`；调用 `Pioneer.MathUtils.degToRad`、`SolarSystemSceneExports.Cameras.getDistanceToFitEntities`、`c.getComponent`、`c.getComponent(Pioneer.SpheroidComponent).getEquatorialRadius`、`c.getOcclusionRadius`、`c.getOrientation`。 源码 eyes/src/engine/core/CameraScripts.js:54；参数 (t, e=0, i=0, {scene:scene,cinematic:r=false,duration:a=1.5,distance:l=1.3}={})。
- `goToCelestialObject(t, {scene:scene,starId:i="sun",cinematic:o=true,duration:r=1.5,distance:a=1.3,verticalOffset:l=0,horizontalOffset:c=0}={})`：【结构证据】调用 `Pioneer.MathUtils.degToRad`、`SolarSystemSceneExports.Cameras.getDistanceToFitEntities`、`T.setFromAxes`、`h.getComponent`、`h.getOcclusionRadius`、`h.getOrientation`。 源码 eyes/src/engine/core/CameraScripts.js:96；参数 (t, {scene:scene,starId:i="sun",cinematic:o=true,duration:r=1.5,distance:a=1.3,verticalOffset:l=0,horizontalOffset:c=0}={})。
- `_easeOutExpoTransition(t, e, i, n, o, r)`：【结构证据】调用 `Math.pow`、`Pioneer.Quaternion.pool.get`、`Pioneer.Quaternion.pool.release`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`a.lerp`。 源码 eyes/src/engine/core/CameraScripts.js:148；参数 (t, e, i, n, o, r)。
- `_easeInOutExpoTransition(t, e, i, n, o, r)`：【结构证据】调用 `Math.pow`、`Pioneer.Quaternion.pool.get`、`Pioneer.Quaternion.pool.release`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`a.lerp`。 源码 eyes/src/engine/core/CameraScripts.js:160；参数 (t, e, i, n, o, r)。
- `goToSpacecraft(t, {scene:scene,starId:i="sun",planeId:o="earth",distance:distance,cinematic:a=true,duration:l=1.5,verticalOffset:c=0,horizontalOffset:h=0}={})`：【结构证据】调用 `Pioneer.MathUtils.degToRad`、`SolarSystemSceneExports.Cameras.getDistanceToFitEntities`、`f.cross`、`f.normalize`、`g.copy`、`g.isNaN`。 源码 eyes/src/engine/core/CameraScripts.js:172；参数 (t, {scene:scene,starId:i="sun",planeId:o="earth",distance:distance,cinematic:a=true,duration:l=1.5,verticalOffset:c=0,horizontalOffset:h=0}={})。
- `goToInstrument(t, {scene:scene,distance:distance,duration:n=1.5,upVector:o="z-axis",forwardVector:r="y-axis"}={})`：【结构证据】调用 `c.getOcclusionRadius`、`c.getParent`、`c.getPositionRelativeToEntity`、`h.getName`、`h.getOcclusionRadius`、`h.getOrientation`。 源码 eyes/src/engine/core/CameraScripts.js:225；参数 (t, {scene:scene,distance:distance,duration:n=1.5,upVector:o="z-axis",forwardVector:r="y-axis"}={})。
- `compareObjects(t, e, {cameraLeft:cameraLeft,cameraRight:cameraRight,cameraLeftPosition:cameraLeftPosition,cameraRightPosition:cameraRightPosition,cameraUp:cameraUp,scene:scene,minRadius:minRadius,maxRadius:maxRadius,duration:h=.75})`：【结构证据】调用 `Promise.all`、`new CustomEvent`、`this._cameraManager.goToEntity`、`this._cameraManager.setContext`、`window.dispatchEvent`。 源码 eyes/src/engine/core/CameraScripts.js:271；参数 (t, e, {cameraLeft:cameraLeft,cameraRight:cameraRight,cameraLeftPosition:cameraLeftPosition,cameraRightPosition:cameraRightPosition,cameraUp:cameraUp,scene:scene,minRadius:minRadius,maxRadius:maxRadius,duration:h=.75})。
- `showLocation(t, e, i, o="northPole", {duration:r=2,otherEntityNames:a=[],distance:distance,rotateByScreenRatio:c=true}={})`：【结构证据】返回 `void`；调用 `SolarSystemSceneExports.Cameras.getDistanceToFitEntities`、`d.getOrientation`、`d.getOrientation().getAxis`、`d.getPosition`、`d.getVelocity`、`g.cross`。 源码 eyes/src/engine/core/CameraScripts.js:320；参数 (t, e, i, o="northPole", {duration:r=2,otherEntityNames:a=[],distance:distance,rotateByScreenRatio:c=true}={})。
- `alignObjects(t, e, {verticalOffset:i=0,horizontalOffset:n=0,duration:o=1.5,transitionDuration:transitionDuration,alignDuration:alignDuration,distance:l=1,cinematic:c=false,useEase:h=true}={})`：【结构证据】调用 `Pioneer.MathUtils.degToRad`、`d.getOcclusionRadius`、`d.getPositionRelativeToEntity`、`new Pioneer.Quaternion`、`new Pioneer.Vector3`、`quaternion.setFromAxisAngle`。 源码 eyes/src/engine/core/CameraScripts.js:389；参数 (t, e, {verticalOffset:i=0,horizontalOffset:n=0,duration:o=1.5,transitionDuration:transitionDuration,alignDuration:alignDuration,distance:l=1,cinematic:c=false,useEase:h=true}={})。
- `alignSpacecraftPlanet(t, {duration:e=1.5,minRadius:i=50,distanceMultiplier:n=3}={})`：【结构证据】调用 `Math.max`、`Math.min`、`l.getEquatorialRadius`、`new Pioneer.Vector3`、`o.getOrientation`、`o.getOrientation().getAxis`。 源码 eyes/src/engine/core/CameraScripts.js:439；参数 (t, {duration:e=1.5,minRadius:i=50,distanceMultiplier:n=3}={})。
- `viewFromSide(t, {planeId:e="earth",distance:distance,cinematic:n=false,duration:o=.75,verticalOffset:r=0,horizontalOffset:a=0,forwardVector:l="x-axis",upVector:c=""}={})`：【结构证据】调用 `Pioneer.MathUtils.degToRad`、`T.cross`、`T.normalize`、`c.includes`、`c.startsWith`、`f.cross`。 源码 eyes/src/engine/core/CameraScripts.js:470；参数 (t, {planeId:e="earth",distance:distance,cinematic:n=false,duration:o=.75,verticalOffset:r=0,horizontalOffset:a=0,forwardVector:l="x-axis",upVector:c=""}={})。
- `spacecraftLookAtTarget(t, e)`：【结构证据】调用 `this._cameraManager.setContext`。 源码 eyes/src/engine/core/CameraScripts.js:531；参数 (t, e)。
- `spacecraftLockedOnTarget(t, e)`：【结构证据】调用 `this._cameraManager.setContext`。 源码 eyes/src/engine/core/CameraScripts.js:538；参数 (t, e)。
- `goToSystemSideway(t, {distance:distance,minDistance:i=0,duration:o=1,otherEntityNames:r=[],includeChildren:a=true,angleInDegree:l=0,cinematic:c=false}={})`：【结构证据】调用 `Math.max`、`Math.tan`、`Pioneer.MathUtils.degToRad`、`S.getHorizontalFieldOfView`、`S.getVerticalFieldOfView`、`SolarSystemSceneExports.Cameras.getDistanceToFitEntities`。 源码 eyes/src/engine/core/CameraScripts.js:545；参数 (t, {distance:distance,minDistance:i=0,duration:o=1,otherEntityNames:r=[],includeChildren:a=true,angleInDegree:l=0,cinematic:c=false}={})。
- `goToSystem(t, e={})`：【结构证据】调用 `Object.assign`、`this._app.getManager`、`this._app.getManager("content").getEntityInfo`、`this._goToSystem`、`this.isBarycenter`、`this.removeBarycenter`。 源码 eyes/src/engine/core/CameraScripts.js:604；参数 (t, e={})。
- `_goToSystem(t, {distance:distance,angle:i=25,minDistance:o=0,duration:r=1,planeId:a="",otherEntityNames:l=[],includeChildren:c=true,isRelativeToPreviousCamera:h=true}={})`：【结构证据】调用 `Math.max`、`Pioneer.MathUtils.degToRad`、`S.getHorizontalFieldOfView`、`S.getVerticalFieldOfView`、`SolarSystemSceneExports.Cameras.getDistanceToFitEntities`、`T.getEquatorialRadius`。 源码 eyes/src/engine/core/CameraScripts.js:631；参数 (t, {distance:distance,angle:i=25,minDistance:o=0,duration:r=1,planeId:a="",otherEntityNames:l=[],includeChildren:c=true,isRelativeToPreviousCamera:h=true}={})。
- `goToCenter(t, e, i, n={})`：【结构证据】调用 `c.getName`、`c.setOrientation`、`c.setParent`、`c.setPosition`、`l.push`、`n.getPositionRelativeToEntity`。 源码 eyes/src/engine/core/CameraScripts.js:706；参数 (t, e, i, n={})。
- `showLocationCenter(t, e, i, n, o, r, a={})`：【结构证据】调用 `d.push`、`n.getPositionRelativeToEntity`、`new Pioneer.Vector3`、`this._cameraManager.setContext`、`this._scene.addEntity`、`this._scene.getEntity`。 源码 eyes/src/engine/core/CameraScripts.js:729；参数 (t, e, i, n, o, r, a={})。
- `showLocationInParentSystem(t, e={})`：【结构证据】调用 `contentManager.getEntityInfo`、`this._app.getManager`、`this._app.getManager("scene").getParent`、`this.showLocation`。 源码 eyes/src/engine/core/CameraScripts.js:752；参数 (t, e={})。
- `showLocationInSolarSystem(t, e={})`：【结构证据】调用 `i.getName`、`i.getParent`、`i.getParent().getName`、`this._scene.getEntity`、`this._scene.getEntity(t).getParent`、`this.showLocation`。 源码 eyes/src/engine/core/CameraScripts.js:758；参数 (t, e={})。

### `eyes/src/engine/core/Cameras.js`

创建和切换用于实体观察、系统取景、跟踪和过渡的相机控制器组合。

- 证据：`import ../pioneer/index.js`。
- 证据：`Cameras @3`。

#### Cameras

创建和切换用于实体观察、系统取景、跟踪和过渡的相机控制器组合。 继承：`无显式继承`。源码 [eyes/src/engine/core/Cameras.js:3](../../eyes/src/engine/core/Cameras.js#L3)。

- `createFullSizeViewportAndCamera(t, e="main", i="camera")`：【结构证据】调用 `n.getDiv`、`n.setCamera`、`t.addEntity`、`t.addEntity(i).addComponent`、`t.getEngine`、`t.getEngine().addViewport`。 源码 eyes/src/engine/core/Cameras.js:4；参数 (t, e="main", i="camera")。
- `focusOnEntity(t, e, {up:i=true,orbiter:n=false})`：【结构证据】调用 `e.getName`、`o.setPrimaryAlignType`、`o.setPrimaryAxis`、`o.setPrimaryTargetEntity`、`o.setSecondaryAlignType`、`o.setSecondaryAxis`。 源码 eyes/src/engine/core/Cameras.js:11；参数 (t, e, {up:i=true,orbiter:n=false})。
- `lookAtEntity(t, e, {duration:i=.5,finalUp:finalUp,finalUpRelativeEntity:finalUpRelativeEntity,finalUpPosition:r=false})`：【结构证据】返回 `void`；调用 `c.getEndPromise`、`c.setTransitionTime`、`e.getName`、`e.getPositionRelativeToEntity`、`finalUpRelativeEntity.getName`、`i.hasModifiedState`。 源码 eyes/src/engine/core/Cameras.js:21；参数 (t, e, {duration:i=.5,finalUp:finalUp,finalUpRelativeEntity:finalUpRelativeEntity,finalUpPosition:r=false})。
- `goToEntity(t, e, {up:i=true,orbiter:n=false,fixedToParent:o=false,duration:r=1,distance:distance,zoom:l=true,destination:destination,destinationUp:destinationUp,destinationInFocusFrame:d=false,transitionFunction:transitionFunction})`：【结构证据】调用 `_.getEndPromise`、`_.setParent`、`_.setTransitionFunction`、`_.setTransitionTime`、`e.getExtentsRadius`、`e.getName`。 源码 eyes/src/engine/core/Cameras.js:44；参数 (t, e, {up:i=true,orbiter:n=false,fixedToParent:o=false,duration:r=1,distance:distance,zoom:l=true,destination:destination,destinationUp:destinationUp,destinationInFocusFrame:d=false,transitionFunction:transitionFunction})。
- `pickOnEntity(t, e, i)`：【结构证据】调用 `Pioneer.LatLonAlt.pool.get`、`Pioneer.LatLonAlt.pool.release`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`e.getComponent`、`e.getOrientation`。 源码 eyes/src/engine/core/Cameras.js:105；参数 (t, e, i)。
- `getDistanceToFitEntities(t, e, i, n)`：【结构证据】返回 `NaN` 或 `r`；调用 `Math.abs`、`Math.max`、`Math.sin`、`Math.tan`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`。 源码 eyes/src/engine/core/Cameras.js:121；参数 (t, e, i, n)。

### `eyes/src/engine/core/CancelToken.js`

维护可取消操作的取消标记/回调令牌。

- 证据：`CancelToken @2`。

#### CancelToken

维护可取消操作的取消标记/回调令牌。 继承：`无显式继承`。源码 [eyes/src/engine/core/CancelToken.js:2](../../eyes/src/engine/core/CancelToken.js#L2)。

- `constructor()`：【结构证据】写入 `_isCanceled`。 源码 eyes/src/engine/core/CancelToken.js:3；参数 ()。
- `cancel()`：【结构证据】写入 `_isCanceled`。 源码 eyes/src/engine/core/CancelToken.js:6；参数 ()。
- `isCanceled()`：【结构证据】返回 `this._isCanceled`。 源码 eyes/src/engine/core/CancelToken.js:9；参数 ()。

### `eyes/src/engine/core/CanceledError.js`

用于区分主动取消与真实加载失败的错误类型。

- 证据：`CanceledError extends Error @2`。

#### CanceledError

用于区分主动取消与真实加载失败的错误类型。 继承：`Error`。源码 [eyes/src/engine/core/CanceledError.js:2](../../eyes/src/engine/core/CanceledError.js#L2)。

- `constructor()`：【结构证据】调用 `super`。 源码 eyes/src/engine/core/CanceledError.js:3；参数 ()。

### `eyes/src/engine/core/Capabilities-58.js`

读取 WebGL 能力/扩展，通过静态上下文供材质与纹理能力判断。

- 证据：`Capabilities @2`。

#### Capabilities

读取 WebGL 能力/扩展，通过静态上下文供材质与纹理能力判断。 继承：`无显式继承`。源码 [eyes/src/engine/core/Capabilities-58.js:2](../../eyes/src/engine/core/Capabilities-58.js#L2)。

- `hasGLExtension(t)`：【结构证据】返回 `false` 或 `e`；调用 `Capabilities._cache.get`、`Capabilities._cache.set`、`Capabilities._context.getExtension`。 源码 eyes/src/engine/core/Capabilities-58.js:3；参数 (t)。
- `__setContext(t)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/Capabilities-58.js:9；参数 (t)。

### `eyes/src/engine/core/Capabilities-584.js`

解析 WMTS Capabilities XML，提取 Layer 与 TileMatrixSet 的图层、维度、坐标矩阵和资源模板。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ../../vendor/modules/Unidentified585.js`。
- 证据：`Capabilities @4`。
- 证据：`Layer @46`。
- 证据：`TileMatrixSet @108`。

#### Capabilities

解析 WMTS Capabilities XML，提取 Layer 与 TileMatrixSet 的图层、维度、坐标矩阵和资源模板。 继承：`无显式继承`。源码 [eyes/src/engine/core/Capabilities-584.js:4](../../eyes/src/engine/core/Capabilities-584.js#L4)。

- `constructor(endPoint, e, i)`：【结构证据】写入 `_capabilitiesXML`、`endPoint`、`layers`、`readyPromise`；调用 `e.getDownloader`、`e.getDownloader().download`、`e.getDownloader().download(s,"text",i).then`、`new DOMParser`、`new DOMParser().parseFromString`、`new Document`；含显式错误分支。 源码 eyes/src/engine/core/Capabilities-584.js:8；参数 (endPoint, e, i)。
- `getLayer(t)`：【结构证据】返回 `e`；调用 `new Layer`、`s.querySelector`、`this._capabilitiesXML.querySelectorAll`。 源码 eyes/src/engine/core/Capabilities-584.js:24；参数 (t)。
- `getTileMatrixSet(t)`：【结构证据】返回 `e`；调用 `new TileMatrixSet`、`s.querySelector`、`this._capabilitiesXML.querySelectorAll`。 源码 eyes/src/engine/core/Capabilities-584.js:34；参数 (t)。

#### Layer

WMTS XML 图层：标识、格式、维度和资源模板。 继承：`无显式继承`。源码 [eyes/src/engine/core/Capabilities-584.js:46](../../eyes/src/engine/core/Capabilities-584.js#L46)。

- `constructor(t, baseUrl)`：【结构证据】写入 `_baseUrl`、`boundingBox`、`defaultStyle`、`dimensions`、`identifier`、`tileMatrixSets`、`title`、`url`；调用 `/^(?:[a-z]+:)?\/\//iu.test`、`Number.parseFloat`、`a.textContent.split`、`l.textContent.split`、`new Error`、`new Map`；含显式错误分支。 源码 eyes/src/engine/core/Capabilities-584.js:54；参数 (t, baseUrl)。

#### TileMatrixSet

WMTS 坐标矩阵集合及每级矩阵尺寸。 继承：`无显式继承`。源码 [eyes/src/engine/core/Capabilities-584.js:108](../../eyes/src/engine/core/Capabilities-584.js#L108)。

- `constructor(t)`：【结构证据】写入 `_crs`、`_numTiles`、`_numTiles[numLevels]`、`boundingBox`、`boundingBox.origin.y`、`boundingBox.size.x`、`boundingBox.size.y`、`identifier`；调用 `Math.abs`、`Math.max`、`Math.round`、`Number.parseFloat`、`Promise.resolve`、`TileMatrixSet.setCRS`；含显式错误分支。 源码 eyes/src/engine/core/Capabilities-584.js:114；参数 (t)。
- `getNumTiles(t)`：【结构证据】返回 `this._numTiles[t]`。 源码 eyes/src/engine/core/Capabilities-584.js:169；参数 (t)。
- `crsUnitsToLLA(t, e)`：【结构证据】调用 `0,Unidentified585.default`、`Pioneer.MathUtils.clamp`、`Pioneer.MathUtils.degToRad`、`Pioneer.MathUtils.wrapAngle`、`t.set`。 源码 eyes/src/engine/core/Capabilities-584.js:172；参数 (t, e)。
- `setCRS(t)`：【结构证据】返回 `t`；调用 `TileMatrixSet.crsToWKT.get`、`Unidentified585.default.defs`、`fetch`、`new Error`、`s.text`、`t.match`；含显式错误分支。 源码 eyes/src/engine/core/Capabilities-584.js:178；参数 (t)。

### `eyes/src/engine/core/CarouselEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。

- 证据：`import ../../ui/components/Carousel.js`。
- 证据：`import ../../styles/extracted/Unidentified226.js`。
- 证据：`import ../../styles/extracted/Unidentified392.js`。
- 证据：`顶层副作用 defaultExport=Carousel.default`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/CarouselPanelEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。

- 证据：`import ../../ui/components/CarouselPanel.js`。
- 证据：`import ../../styles/extracted/TutorialOverlayStyles-497.js`。
- 证据：`import ../../styles/extracted/TutorialOverlayStyles-498.js`。
- 证据：`import ../../styles/extracted/Unidentified506.js`。
- 证据：`顶层副作用 defaultExport=CarouselPanel.default`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/CheckboxMultistate.js`

待进一步业务确认；当前源码可观测接口：CheckboxMultistate、default。

- 证据：`import ../../ui/components/CheckboxMultistate.js`。
- 证据：`import ../../ui/components/Checkbox.js`。
- 证据：`import ../../styles/extracted/Unidentified521.js`。
- 证据：`顶层副作用 defaultExport=Checkbox.default`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/ClockEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。

- 证据：`import ../../ui/components/Clock.js`。
- 证据：`import ../../styles/extracted/Unidentified383.js`。
- 证据：`顶层副作用 defaultExport=Clock.default`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/ClockShortcutEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。

- 证据：`import ../../ui/components/ClockShortcut.js`。
- 证据：`import ../../styles/extracted/Unidentified226.js`。
- 证据：`import ../../styles/extracted/Unidentified387.js`。
- 证据：`顶层副作用 defaultExport=ClockShortcut.default`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/CollectionItem.js`

带名称、启用与销毁生命周期的集合项，以及按名称/类型索引、移动和销毁项目的 Collection 容器。

- 证据：`CollectionItem @2`。
- 证据：`Collection @36`。

#### CollectionItem

带名称、启用与销毁生命周期的集合项，以及按名称/类型索引、移动和销毁项目的 Collection 容器。 继承：`无显式继承`。源码 [eyes/src/engine/core/CollectionItem.js:2](../../eyes/src/engine/core/CollectionItem.js#L2)。

- `constructor(name, collectionParent)`：【结构证据】写入 `_classIndex`、`_collectionParent`、`_index`、`_name`。 源码 eyes/src/engine/core/CollectionItem.js:3；参数 (name, collectionParent)。
- `getIndex()`：【结构证据】返回 `this._index`。 源码 eyes/src/engine/core/CollectionItem.js:9；参数 ()。
- `__setIndex(index)`：【结构证据】写入 `_index`。 源码 eyes/src/engine/core/CollectionItem.js:12；参数 (index)。
- `getClassIndex()`：【结构证据】返回 `this._classIndex`。 源码 eyes/src/engine/core/CollectionItem.js:15；参数 ()。
- `__setClassIndex(classIndex)`：【结构证据】写入 `_classIndex`。 源码 eyes/src/engine/core/CollectionItem.js:18；参数 (classIndex)。
- `getName()`：【结构证据】返回 `this._name`。 源码 eyes/src/engine/core/CollectionItem.js:21；参数 ()。
- `__getCollectionParent()`：【结构证据】返回 `this._collectionParent`。 源码 eyes/src/engine/core/CollectionItem.js:24；参数 ()。
- `__setCollectionParent(collectionParent)`：【结构证据】写入 `_collectionParent`。 源码 eyes/src/engine/core/CollectionItem.js:27；参数 (collectionParent)。
- `__destroy()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/CollectionItem.js:30；参数 ()。

#### Collection

带名称、启用与销毁生命周期的集合项，以及按名称/类型索引、移动和销毁项目的 Collection 容器。 继承：`无显式继承`。源码 [eyes/src/engine/core/CollectionItem.js:36](../../eyes/src/engine/core/CollectionItem.js#L36)。

- `constructor(parent)`：【结构证据】写入 `_items`、`_itemsByClass`、`_itemsByName`、`_parent`；调用 `new Map`。 源码 eyes/src/engine/core/CollectionItem.js:37；参数 (parent)。
- `__destroy()`：【结构证据】调用 `this._items[t].__destroy`。 源码 eyes/src/engine/core/CollectionItem.js:43；参数 ()。
- `get(t, e=0)`：【结构证据】返回 `i?i[e]??null:null` 或 `i instanceof t?i:null`；调用 `this._itemsByClass.get`、`this._itemsByName.get`。 源码 eyes/src/engine/core/CollectionItem.js:46；参数 (t, e=0)。
- `getAt(t)`：【结构证据】返回 `this._items[t]`。 源码 eyes/src/engine/core/CollectionItem.js:56；参数 (t)。
- `getSize()`：【结构证据】返回 `this._items.length`。 源码 eyes/src/engine/core/CollectionItem.js:59；参数 ()。
- `getAny(t, e)`：【结构证据】返回 `i` 或 `s[e??0]??null`；调用 `this._itemsByName.get`。 源码 eyes/src/engine/core/CollectionItem.js:62；参数 (t, e)。
- `add(t, e="", i)`：【结构证据】返回 `s`；调用 `e[0].match`、`i.getIndex`、`new Error`、`new t`、`this._addToLists`、`this._itemsByName.has`；含显式错误分支。 源码 eyes/src/engine/core/CollectionItem.js:68；参数 (t, e="", i)。
- `move(t, e, i)`：【结构证据】调用 `e._addToLists`、`e._itemsByName.has`、`new Error`、`s.__setCollectionParent`、`s.getIndex`、`s.getName`；含显式错误分支。 源码 eyes/src/engine/core/CollectionItem.js:80；参数 (t, e, i)。
- `remove(t)`：【结构证据】调用 `e.__destroy`、`e.getIndex`、`new Error`、`this._itemsByName.get`、`this._removeFromLists`；含显式错误分支。 源码 eyes/src/engine/core/CollectionItem.js:93；参数 (t)。
- `clear()`：【结构证据】写入 `_items`；调用 `this._itemsByClass.clear`、`this._itemsByName.clear`、`this._items[t].__destroy`。 源码 eyes/src/engine/core/CollectionItem.js:103；参数 ()。
- `_addToLists(t, e)`：【结构证据】调用 `e.getIndex`、`t.getName`、`this._items.splice`、`this._itemsByName.set`、`this._updateIndices`。 源码 eyes/src/engine/core/CollectionItem.js:109；参数 (t, e)。
- `_removeFromLists(t, e)`：【结构证据】调用 `e.getName`、`this._items.splice`、`this._itemsByName.delete`、`this._updateIndices`。 源码 eyes/src/engine/core/CollectionItem.js:115；参数 (t, e)。
- `_updateIndices(t, e)`：【结构证据】调用 `e.__setClassIndex`、`s.push`、`this._itemsByClass.delete`、`this._itemsByClass.set`、`this._items[e].__setIndex`。 源码 eyes/src/engine/core/CollectionItem.js:120；参数 (t, e)。

### `eyes/src/engine/core/Color.js`

RGBA 颜色值、复制/混合与格式转换工具。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`Color @3`。

#### Color

RGBA 颜色值、复制/混合与格式转换工具。 继承：`无显式继承`。源码 [eyes/src/engine/core/Color.js:3](../../eyes/src/engine/core/Color.js#L3)。

- `constructor(t=1, e=1, i=1, s=1)`：【结构证据】写入 `_a`、`_b`、`_g`、`_r`。 源码 eyes/src/engine/core/Color.js:7；参数 (t=1, e=1, i=1, s=1)。
- `get r()`：【结构证据】读取访问器，返回 `this._r`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Color.js:32；参数 ()。
- `set r(t)`：【结构证据】写入访问器，接收参数 (t)；实际写入 `_r`。源码 eyes/src/engine/core/Color.js:39；参数 (t)。
- `get g()`：【结构证据】读取访问器，返回 `this._g`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Color.js:46；参数 ()。
- `set g(t)`：【结构证据】写入访问器，接收参数 (t)；实际写入 `_g`。源码 eyes/src/engine/core/Color.js:53；参数 (t)。
- `get b()`：【结构证据】读取访问器，返回 `this._b`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Color.js:60；参数 ()。
- `set b(t)`：【结构证据】写入访问器，接收参数 (t)；实际写入 `_b`。源码 eyes/src/engine/core/Color.js:67；参数 (t)。
- `get a()`：【结构证据】读取访问器，返回 `this._a`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Color.js:74；参数 ()。
- `set a(t)`：【结构证据】写入访问器，接收参数 (t)；实际写入 `_a`。源码 eyes/src/engine/core/Color.js:81；参数 (t)。
- `method toString()`：【结构证据】本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Color.js:87；参数 ()。
- `copy(t)`：【结构证据】写入 `_a`、`_b`、`_g`、`_r`。 源码 eyes/src/engine/core/Color.js:40；参数 (t)。
- `set(t, e, i, s=1)`：【结构证据】写入 `_a`、`_b`、`_g`、`_r`。 源码 eyes/src/engine/core/Color.js:46；参数 (t, e, i, s=1)。
- `add(t, e)`：【结构证据】写入 `_a`、`_b`、`_g`、`_r`。 源码 eyes/src/engine/core/Color.js:52；参数 (t, e)。
- `sub(t, e)`：【结构证据】写入 `_a`、`_b`、`_g`、`_r`。 源码 eyes/src/engine/core/Color.js:58；参数 (t, e)。
- `mult(t, e)`：【结构证据】写入 `_a`、`_b`、`_g`、`_r`。 源码 eyes/src/engine/core/Color.js:64；参数 (t, e)。
- `addMult(t, e, i)`：【结构证据】写入 `_a`、`_b`、`_g`、`_r`。 源码 eyes/src/engine/core/Color.js:70；参数 (t, e, i)。
- `div(t, e)`：【结构证据】写入 `_a`、`_b`、`_g`、`_r`。 源码 eyes/src/engine/core/Color.js:76；参数 (t, e)。
- `scale(t, e)`：【结构证据】写入 `_a`、`_b`、`_g`、`_r`。 源码 eyes/src/engine/core/Color.js:82；参数 (t, e)。
- `value()`：【结构证据】返回 `(this._r+this._g+this._b)/3`。 源码 eyes/src/engine/core/Color.js:88；参数 ()。
- `min()`：【结构证据】返回 `Math.min(this._r,this._g,this._b)`；调用 `Math.min`。 源码 eyes/src/engine/core/Color.js:91；参数 ()。
- `max()`：【结构证据】返回 `Math.max(this._r,this._g,this._b)`；调用 `Math.max`。 源码 eyes/src/engine/core/Color.js:94；参数 ()。
- `lerp(t, e, i)`：【结构证据】写入 `_a`、`_b`、`_g`、`_r`；调用 `PioneerPublicApi.MathUtils.lerp`。 源码 eyes/src/engine/core/Color.js:97；参数 (t, e, i)。

### `eyes/src/engine/core/ComponentRef.js`

按场景、实体名、组件类和名称/类序号重新解析可用组件引用。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`ComponentRef extends PioneerPublicApi.BaseRef @3`。

#### ComponentRef

按场景、实体名、组件类和名称/类序号重新解析可用组件引用。 继承：`PioneerPublicApi.BaseRef`。源码 [eyes/src/engine/core/ComponentRef.js:3](../../eyes/src/engine/core/ComponentRef.js#L3)。

- `constructor(scene, componentClass, entityName="", componentNameOrClassIndex=void 0)`：【结构证据】写入 `_componentClass`、`_componentNameOrClassIndex`、`_entityName`、`_scene`；调用 `super`。 源码 eyes/src/engine/core/ComponentRef.js:4；参数 (scene, componentClass, entityName="", componentNameOrClassIndex=void 0)。
- `getComponentClass()`：【结构证据】返回 `this._componentClass`。 源码 eyes/src/engine/core/ComponentRef.js:11；参数 ()。
- `getEntityName()`：【结构证据】返回 `this._entityName`。 源码 eyes/src/engine/core/ComponentRef.js:14；参数 ()。
- `getComponentNameOrClassIndex()`：【结构证据】返回 `this._componentNameOrClassIndex`。 源码 eyes/src/engine/core/ComponentRef.js:17；参数 ()。
- `set(entityName, componentNameOrClassIndex=0)`：【结构证据】写入 `_componentNameOrClassIndex`、`_entityName`。 源码 eyes/src/engine/core/ComponentRef.js:20；参数 (entityName, componentNameOrClassIndex=0)。
- `update()`：【结构证据】调用 `t.getComponent`、`t.isEnabled`、`this._scene.getEntity`、`this._setRef`。 源码 eyes/src/engine/core/ComponentRef.js:24；参数 ()。

### `eyes/src/engine/core/Config.js`

保存引擎配置值并在配置项改变时通知监听者。

- 证据：`Config @2`。

#### Config

保存引擎配置值并在配置项改变时通知监听者。 继承：`无显式继承`。源码 [eyes/src/engine/core/Config.js:2](../../eyes/src/engine/core/Config.js#L2)。

- `constructor()`：【结构证据】写入 `_callbacksMap`、`_valueMap`；调用 `new Map`、`this.setValue`。 源码 eyes/src/engine/core/Config.js:3；参数 ()。
- `getValue(t)`：【结构证据】返回 `this._valueMap.get(t)`；调用 `this._valueMap.get`。 源码 eyes/src/engine/core/Config.js:11；参数 (t)。
- `setValue(t, e)`：【结构证据】调用 `i[s]`、`this._callbacksMap.get`、`this._valueMap.get`、`this._valueMap.set`。 源码 eyes/src/engine/core/Config.js:14；参数 (t, e)。
- `addEventListener(t, e)`：【结构证据】调用 `i.push`、`this._callbacksMap.get`、`this._callbacksMap.set`。 源码 eyes/src/engine/core/Config.js:21；参数 (t, e)。
- `removeEventListener(t, e)`：【结构证据】调用 `i.splice`、`this._callbacksMap.get`。 源码 eyes/src/engine/core/Config.js:26；参数 (t, e)。

### `eyes/src/engine/core/ConnectedSpriteShader.js`

声明 ConnectedSpriteShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。

- 证据：`import ./ShaderChunkLogDepth.js`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/ControllerRef.js`

按实体名、控制器类和名称/类序号重新解析可用控制器引用。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`ControllerRef extends PioneerPublicApi.BaseRef @3`。

#### ControllerRef

按实体名、控制器类和名称/类序号重新解析可用控制器引用。 继承：`PioneerPublicApi.BaseRef`。源码 [eyes/src/engine/core/ControllerRef.js:3](../../eyes/src/engine/core/ControllerRef.js#L3)。

- `constructor(scene, controllerClass, entityName="", controllerNameOrClassIndex=void 0)`：【结构证据】写入 `_controllerClass`、`_controllerNameOrClassIndex`、`_entityName`、`_scene`；调用 `super`。 源码 eyes/src/engine/core/ControllerRef.js:4；参数 (scene, controllerClass, entityName="", controllerNameOrClassIndex=void 0)。
- `getControllerClass()`：【结构证据】返回 `this._controllerClass`。 源码 eyes/src/engine/core/ControllerRef.js:11；参数 ()。
- `getEntityName()`：【结构证据】返回 `this._entityName`。 源码 eyes/src/engine/core/ControllerRef.js:14；参数 ()。
- `getControllerNameOrClassIndex()`：【结构证据】返回 `this._controllerNameOrClassIndex`。 源码 eyes/src/engine/core/ControllerRef.js:17；参数 ()。
- `set(entityName, controllerNameOrClassIndex=0)`：【结构证据】写入 `_controllerNameOrClassIndex`、`_entityName`。 源码 eyes/src/engine/core/ControllerRef.js:20；参数 (entityName, controllerNameOrClassIndex=0)。
- `update()`：【结构证据】调用 `t.getController`、`t.isEnabled`、`this._scene.getEntity`、`this._setRef`。 源码 eyes/src/engine/core/ControllerRef.js:24；参数 ()。

### `eyes/src/engine/core/CubeMap.js`

在三维方向与立方体六个面的 UV 坐标间转换。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`CubeMap @3`。

#### CubeMap

在三维方向与立方体六个面的 UV 坐标间转换。 继承：`无显式继承`。源码 [eyes/src/engine/core/CubeMap.js:3](../../eyes/src/engine/core/CubeMap.js#L3)。

- `xyzToUVFace(t, e, i=CubeMap.defaultCubeMapFaceFrames)`：【结构证据】返回 `void t.set(NaN,NaN,NaN)`；调用 `Math.abs`、`t.set`。 源码 eyes/src/engine/core/CubeMap.js:4；参数 (t, e, i=CubeMap.defaultCubeMapFaceFrames)。

### `eyes/src/engine/core/DateTime.js`

组织日期/时间显示与输入转换的应用工具。

- 证据：`import ../pioneer/index.js`。
- 证据：`DateTime @3`。

#### DateTime

组织日期/时间显示与输入转换的应用工具。 继承：`无显式继承`。源码 [eyes/src/engine/core/DateTime.js:3](../../eyes/src/engine/core/DateTime.js#L3)。

- `constructor(year=1, month=1, day=1, hour=0, minute=0, second=0, millisecond=0)`：【结构证据】写入 `day`、`hour`、`millisecond`、`minute`、`month`、`second`、`year`。 源码 eyes/src/engine/core/DateTime.js:11；参数 (year=1, month=1, day=1, hour=0, minute=0, second=0, millisecond=0)。
- `copy(t)`：【结构证据】写入 `day`、`hour`、`millisecond`、`minute`、`month`、`second`、`year`。 源码 eyes/src/engine/core/DateTime.js:20；参数 (t)。
- `fromET(t)`：【结构证据】写入 `day`、`hour`、`millisecond`、`minute`、`month`、`second`、`year`；调用 `DateTime._date.getUTCDate`、`DateTime._date.getUTCFullYear`、`DateTime._date.getUTCHours`、`DateTime._date.getUTCMilliseconds`、`DateTime._date.getUTCMinutes`、`DateTime._date.getUTCMonth`。 源码 eyes/src/engine/core/DateTime.js:29；参数 (t)。
- `toET()`：【结构证据】返回 `e`；调用 `DateTime._date.getTime`、`DateTime._date.setUTCDate`、`DateTime._date.setUTCFullYear`、`DateTime._date.setUTCHours`、`DateTime._date.setUTCMilliseconds`、`DateTime._date.setUTCMinutes`。 源码 eyes/src/engine/core/DateTime.js:44；参数 ()。
- `fromDOY(year, e, hour=0, minute=0, second=0, millisecond=0)`：【结构证据】写入 `day`、`hour`、`millisecond`、`minute`、`month`、`second`、`year`；调用 `this.getDaysInMonth`。 源码 eyes/src/engine/core/DateTime.js:60；参数 (year, e, hour=0, minute=0, second=0, millisecond=0)。
- `toDOY()`：【结构证据】写入 `month`；返回 `e`；调用 `this.getDaysInMonth`。 源码 eyes/src/engine/core/DateTime.js:76；参数 ()。
- `isLeapYear()`：【结构证据】返回 `this.year%4==0&&this.year%100!=0||this.year%400==0`。 源码 eyes/src/engine/core/DateTime.js:84；参数 ()。
- `getDaysInMonth()`：【结构证据】返回 `t`；调用 `Pioneer.MathUtils.wrap`、`this.isLeapYear`。 源码 eyes/src/engine/core/DateTime.js:87；参数 ()。
- `parse(t)`：【结构证据】写入 `day`、`hour`、`millisecond`、`minute`、`month`、`second`、`year`；调用 `parseInt`、`t.substring`。 源码 eyes/src/engine/core/DateTime.js:92；参数 (t)。
- `parseDOY(t)`：【结构证据】写入 `hour`、`millisecond`、`minute`、`second`；调用 `parseInt`、`t.substring`、`this.fromDOY`。 源码 eyes/src/engine/core/DateTime.js:100；参数 (t)。
- `method toString()`：【结构证据】本访问器没有 AST 可见的 this 字段直接赋值；调用 `Math.floor`、`Math.floor(1e3*this.millisecond).toString`、`Math.floor(1e3*this.millisecond).toString().padStart`、`this.day.toString`、`this.day.toString().padStart`、`this.hour.toString`、`this.hour.toString().padStart`、`this.minute.toString`、`this.minute.toString().padStart`、`this.month.toString`、`this.month.toString().padStart`、`this.second.toString`、`this.second.toString().padStart`、`this.year.toString`、`this.year.toString().padStart`。源码 eyes/src/engine/core/DateTime.js:168；参数 ()。
- `toStringDOY()`：【结构证据】返回 ``${this.year.toString().padStart(4,"0")}-${this.toDOY().toString().padStart(3,"0")}``；调用 `this.toDOY`、`this.toDOY().toString`、`this.toDOY().toString().padStart`、`this.year.toString`、`this.year.toString().padStart`。 源码 eyes/src/engine/core/DateTime.js:112；参数 ()。

### `eyes/src/engine/core/DependencyGraph.js`

按依赖比较器深度优先排序节点，检测环并按排序结果更新控制器。

- 证据：`DependencyGraph @2`。
- 证据：`Node @60`。

#### DependencyGraph

按依赖比较器深度优先排序节点，检测环并按排序结果更新控制器。 继承：`无显式继承`。源码 [eyes/src/engine/core/DependencyGraph.js:2](../../eyes/src/engine/core/DependencyGraph.js#L2)。

- `constructor(updateItemCallback, compareItemCallback)`：【结构证据】写入 `_compareItemCallback`、`_needsSorting`、`_nodes`、`_sortedNodes`、`_updateItemCallback`；调用 `new Map`。 源码 eyes/src/engine/core/DependencyGraph.js:3；参数 (updateItemCallback, compareItemCallback)。
- `addItem(t)`：【结构证据】写入 `_needsSorting`；调用 `new Node`、`this._nodes.set`。 源码 eyes/src/engine/core/DependencyGraph.js:10；参数 (t)。
- `removeItem(t)`：【结构证据】写入 `_needsSorting`；调用 `this._nodes.delete`。 源码 eyes/src/engine/core/DependencyGraph.js:15；参数 (t)。
- `needsSorting()`：【结构证据】写入 `_needsSorting`。 源码 eyes/src/engine/core/DependencyGraph.js:18；参数 ()。
- `update()`：【结构证据】写入 `_needsSorting`、`_sortedNodes`；调用 `t.next`、`this._nodes.values`、`this._updateItemCallback`、`this._visit`。 源码 eyes/src/engine/core/DependencyGraph.js:21；参数 ()。
- `_visit(t)`：DFS temporaryMark 检测依赖环并抛包含 item 路径的错误；永久标记避免重复，依赖先入 sortedNodes。 源码 eyes/src/engine/core/DependencyGraph.js:38；参数 (t)。

#### Node

依赖图节点，保存 item 与 DFS 临时/永久标记。 继承：`无显式继承`。源码 [eyes/src/engine/core/DependencyGraph.js:60](../../eyes/src/engine/core/DependencyGraph.js#L60)。

- `constructor(item)`：【结构证据】写入 `item`、`permanentMark`、`temporaryMark`。 源码 eyes/src/engine/core/DependencyGraph.js:64；参数 (item)。

### `eyes/src/engine/core/Devices.js`

检测设备/浏览器特征供交互与移动模式选择。

- 证据：`Devices @2`。

#### Devices

检测设备/浏览器特征供交互与移动模式选择。 继承：`无显式继承`。源码 [eyes/src/engine/core/Devices.js:2](../../eyes/src/engine/core/Devices.js#L2)。

- `getPlatform()`：【结构证据】返回 `"Windows"===t||"Win32"===t||"Win16"===t?"Windows":"iPad"===t||"MacIntel"===t&&navigator.maxTouchPoints>1?"iPad":"MacIntel"===t?"Mac":t.startsWith("Lin`；调用 `t.startsWith`。 源码 eyes/src/engine/core/Devices.js:3；参数 ()。

### `eyes/src/engine/core/Downloader.js`

替换资源 URL 变量，按优先级调度最多 20 个网络请求并提供取消/进度与内容类型解码。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`Downloader @3`。

#### Downloader

替换资源 URL 变量，按优先级调度最多 20 个网络请求并提供取消/进度与内容类型解码。 继承：`无显式继承`。源码 [eyes/src/engine/core/Downloader.js:3](../../eyes/src/engine/core/Downloader.js#L3)。

- `constructor()`：【结构证据】写入 `_currentDownloads`、`_downloadQueue`、`_maxCurrentDownloads`、`_replacementTypes`、`_replacements`；调用 `new Map`。 源码 eyes/src/engine/core/Downloader.js:4；参数 ()。
- `getReplacement(t)`：【结构证据】返回 `this._replacements.get(t)`；调用 `this._replacements.get`。 源码 eyes/src/engine/core/Downloader.js:11；参数 (t)。
- `setReplacement(t, e)`：【结构证据】调用 `this._replacements.set`。 源码 eyes/src/engine/core/Downloader.js:14；参数 (t, e)。
- `getReplacementType(t)`：【结构证据】返回 `this._replacementTypes.get(t)`；调用 `this._replacementTypes.get`。 源码 eyes/src/engine/core/Downloader.js:17；参数 (t)。
- `setReplacementType(t, e)`：【结构证据】调用 `this._replacementTypes.delete`、`this._replacementTypes.set`。 源码 eyes/src/engine/core/Downloader.js:20；参数 (t, e)。
- `cancel(t)`：【结构证据】调用 `i.reject`、`i.request.abort`、`new Error`、`new PioneerPublicApi.CanceledError`、`this._checkDownloadQueue`、`this._currentDownloads.delete`；含显式错误分支。 源码 eyes/src/engine/core/Downloader.js:23；参数 (t)。
- `processUrl(t)`：【结构证据】返回 `e`；调用 `e.replace`。 源码 eyes/src/engine/core/Downloader.js:39；参数 (t)。
- `download(t, e, i, n)`：创建独立 Promise 和下载记录，按 priority 降序插入队列并尝试启动；URL 替换后是 actualUrl。此层本身不合并重复 URL 请求。 源码 eyes/src/engine/core/Downloader.js:44；参数 (t, e, i, n)。
- `updatePriority(t, e)`：仅调整仍在队列的请求，Math.max 保证优先级只提高；活动下载不重排。 源码 eyes/src/engine/core/Downloader.js:68；参数 (t, e)。
- `_doRequest(t)`：【结构证据】调用 `createImageBitmap`、`createImageBitmap(xMLHttpRequest.response,{premultiplyAlpha:"none",colorSpaceConversion:"none"}).then`、`document.createElement`、`e.load`、`new XMLHttpRequest`、`t.actualUrl.match`。 源码 eyes/src/engine/core/Downloader.js:77；参数 (t)。
- `_inProgressDownload(t, e)`：【结构证据】调用 `e`。 源码 eyes/src/engine/core/Downloader.js:152；参数 (t, e)。
- `_completeDownload(t, e, i)`：【结构证据】调用 `t.resolve`、`this._checkDownloadQueue`、`this._currentDownloads.delete`。 源码 eyes/src/engine/core/Downloader.js:157；参数 (t, e, i)。
- `_failDownload(t, e)`：【结构证据】调用 `new Error`、`t.reject`、`this._checkDownloadQueue`、`this._currentDownloads.delete`。 源码 eyes/src/engine/core/Downloader.js:166；参数 (t, e)。
- `_checkDownloadQueue()`：【结构证据】调用 `this._currentDownloads.set`、`this._doRequest`、`this._downloadQueue.shift`。 源码 eyes/src/engine/core/Downloader.js:171；参数 ()。

### `eyes/src/engine/core/Engine.js`

拥有 WebGL2 渲染器、时间、输入、场景和视口，按帧顺序推进状态与渲染。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`Engine @3`。

#### Engine

拥有 WebGL2 渲染器、时间、输入、场景和视口，按帧顺序推进状态与渲染。 继承：`无显式继承`。源码 [eyes/src/engine/core/Engine.js:3](../../eyes/src/engine/core/Engine.js#L3)。

- `constructor(rootDiv)`：【结构证据】写入 `_callbacks`、`_callbacksToRemove`、`_canvas`、`_canvas.style.height`、`_canvas.style.left`、`_canvas.style.position`、`_canvas.style.top`、`_canvas.style.width`；调用 `Date.now`、`PioneerPublicApi.Capabilities.__setContext`、`document.createElement`、`new Error`、`new PioneerPublicApi.Collection`、`new PioneerPublicApi.Config`；含显式错误分支。 源码 eyes/src/engine/core/Engine.js:4；参数 (rootDiv)。
- `getVersion()`：【结构证据】返回 `PioneerPublicApi.Version`。 源码 eyes/src/engine/core/Engine.js:19；参数 ()。
- `getEnvironment()`：【结构证据】返回 `this._environment`。 源码 eyes/src/engine/core/Engine.js:22；参数 ()。
- `setEnvironment(environment)`：【结构证据】写入 `_environment`。 源码 eyes/src/engine/core/Engine.js:25；参数 (environment)。
- `getRootDiv()`：【结构证据】返回 `this._rootDiv`。 源码 eyes/src/engine/core/Engine.js:28；参数 ()。
- `getRenderSize()`：【结构证据】返回 `this._renderSize`。 源码 eyes/src/engine/core/Engine.js:31；参数 ()。
- `getCanvas()`：【结构证据】返回 `this._canvas`。 源码 eyes/src/engine/core/Engine.js:34；参数 ()。
- `getViewportDiv()`：【结构证据】返回 `this._viewportDiv`。 源码 eyes/src/engine/core/Engine.js:37；参数 ()。
- `getConfig()`：【结构证据】返回 `this._config`。 源码 eyes/src/engine/core/Engine.js:40；参数 ()。
- `getInput()`：【结构证据】返回 `this._input`。 源码 eyes/src/engine/core/Engine.js:43；参数 ()。
- `getDownloader()`：【结构证据】返回 `this._downloader`。 源码 eyes/src/engine/core/Engine.js:46；参数 ()。
- `getTextureLoader()`：【结构证据】返回 `this._textureLoader`。 源码 eyes/src/engine/core/Engine.js:49；参数 ()。
- `getResourceManager()`：【结构证据】返回 `this._resourceManager`。 源码 eyes/src/engine/core/Engine.js:52；参数 ()。
- `getMaterialManager()`：【结构证据】返回 `this._materialManager`。 源码 eyes/src/engine/core/Engine.js:55；参数 ()。
- `getScene(t)`：【结构证据】返回 `this._scenes.get(PioneerPublicApi.Scene,t)`；调用 `this._scenes.get`。 源码 eyes/src/engine/core/Engine.js:58；参数 (t)。
- `getSceneAt(t)`：【结构证据】返回 `this._scenes.getAt(t)`；调用 `this._scenes.getAt`。 源码 eyes/src/engine/core/Engine.js:61；参数 (t)。
- `getNumScenes()`：【结构证据】返回 `this._scenes.getSize()`；调用 `this._scenes.getSize`。 源码 eyes/src/engine/core/Engine.js:64；参数 ()。
- `addScene(t)`：【结构证据】返回 `this._scenes.add(PioneerPublicApi.Scene,t)`；调用 `this._scenes.add`。 源码 eyes/src/engine/core/Engine.js:67；参数 (t)。
- `removeScene(t)`：【结构证据】调用 `this._scenes.remove`。 源码 eyes/src/engine/core/Engine.js:70；参数 (t)。
- `get(t, e, i, s=0)`：【结构证据】返回 `void 0===e||null===n?n:n.get(e,i,s)`；调用 `n.get`、`this._scenes.getAny`。 源码 eyes/src/engine/core/Engine.js:73；参数 (t, e, i, s=0)。
- `getViewport(t)`：【结构证据】返回 `this._viewports.get(PioneerPublicApi.Viewport,t)`；调用 `this._viewports.get`。 源码 eyes/src/engine/core/Engine.js:77；参数 (t)。
- `getViewportAt(t)`：【结构证据】返回 `this._viewports.getAt(t)`；调用 `this._viewports.getAt`。 源码 eyes/src/engine/core/Engine.js:80；参数 (t)。
- `getNumViewports()`：【结构证据】返回 `this._viewports.getSize()`；调用 `this._viewports.getSize`。 源码 eyes/src/engine/core/Engine.js:83；参数 ()。
- `addViewport(t)`：【结构证据】返回 `this._viewports.add(PioneerPublicApi.Viewport,t)`；调用 `this._viewports.add`。 源码 eyes/src/engine/core/Engine.js:86；参数 (t)。
- `removeViewport(t)`：【结构证据】调用 `this._viewports.remove`。 源码 eyes/src/engine/core/Engine.js:89；参数 (t)。
- `getTime()`：【结构证据】返回 `this._time`。 源码 eyes/src/engine/core/Engine.js:92；参数 ()。
- `setTime(time)`：【结构证据】写入 `_time`。 源码 eyes/src/engine/core/Engine.js:95；参数 (time)。
- `getTimeRate()`：【结构证据】返回 `this._timeRate`。 源码 eyes/src/engine/core/Engine.js:98；参数 ()。
- `setTimeRate(timeRate)`：【结构证据】写入 `_timeRate`。 源码 eyes/src/engine/core/Engine.js:101；参数 (timeRate)。
- `getFPS()`：【结构证据】返回 `this._fps.getFPS()`；调用 `this._fps.getFPS`。 源码 eyes/src/engine/core/Engine.js:104；参数 ()。
- `getFPSLimit()`：【结构证据】返回 `this._fpsLimit`。 源码 eyes/src/engine/core/Engine.js:107；参数 ()。
- `setFPSLimit(fpsLimit)`：【结构证据】写入 `_fpsLimit`。 源码 eyes/src/engine/core/Engine.js:110；参数 (fpsLimit)。
- `getDeltaTime()`：【结构证据】返回 `this._realDeltaTime`。 源码 eyes/src/engine/core/Engine.js:113；参数 ()。
- `waitUntilNextFrame()`：【结构证据】调用 `new Promise`、`t`、`this.addCallback`。 源码 eyes/src/engine/core/Engine.js:116；参数 ()。
- `addCallback(t, e)`：【结构证据】调用 `this._callbacks.push`。 源码 eyes/src/engine/core/Engine.js:123；参数 (t, e)。
- `removeCallback(t)`：【结构证据】调用 `this._callbacksToRemove.push`。 源码 eyes/src/engine/core/Engine.js:129；参数 (t)。
- `__getThreeJsRenderer()`：【结构证据】返回 `this._threeJsRenderer`。 源码 eyes/src/engine/core/Engine.js:132；参数 ()。
- `_loop()`：以真实秒差推进 time += timeRate * delta；先 Scene.__update，再视口投影变量，再 Scene.__updateVisuals，清屏并依次渲染视口；执行/移除回调后重置输入瞬时态，继续 requestAnimationFrame。FPS 限制分支跳过整帧工作。 源码 eyes/src/engine/core/Engine.js:135；参数 ()。

### `eyes/src/engine/core/Entity-567.js`

太阳系实体配置工厂：注册声明式实体，创建组件/控制器/父级时间表，按组创建，并在失败时回滚实体。

- 证据：`import ../pioneer/index.js`。
- 证据：`Entity @3`。

#### Entity

太阳系实体配置工厂：注册声明式实体，创建组件/控制器/父级时间表，按组创建，并在失败时回滚实体。 继承：`无显式继承`。源码 [eyes/src/engine/core/Entity-567.js:3](../../eyes/src/engine/core/Entity-567.js#L3)。

- `register(t)`：【结构证据】调用 `Object.entries`、`this._entities.set`。 源码 eyes/src/engine/core/Entity-567.js:4；参数 (t)。
- `create(t, e, i)`：【结构证据】返回 `this.createFromOptions(t,s,e,i)`；调用 `Entity._entities.get`、`new Error`、`this.createFromOptions`；含显式错误分支。 源码 eyes/src/engine/core/Entity-567.js:7；参数 (t, e, i)。
- `createFromOptions(t, e, i, n)`：【结构证据】返回 `r`；调用 `Array.isArray`、`Object.keys`、`Pioneer.MathUtils.degToRad`、`a.addOrbitalElements`、`a.setAxis`、`a.setBaseUrl`；含显式错误分支。 源码 eyes/src/engine/core/Entity-567.js:12；参数 (t, e, i, n)。
- `getEntityOptions(t)`：【结构证据】返回 `Entity._entities.get(t)`；调用 `Entity._entities.get`。 源码 eyes/src/engine/core/Entity-567.js:181；参数 (t)。
- `getEntityNamesInGroup(t)`：【结构证据】返回 `set`；调用 `Entity._entities.keys`、`n.includes`、`new Set`、`set.add`、`t.split`、`t.split(",").map`。 源码 eyes/src/engine/core/Entity-567.js:184；参数 (t)。
- `getGroups()`：【结构证据】返回 `set`；调用 `new Set`、`set.add`、`this._entities.values`。 源码 eyes/src/engine/core/Entity-567.js:198；参数 ()。
- `createGroup(t, e, i)`：【结构证据】调用 `this.create`、`this.getEntityNamesInGroup`。 源码 eyes/src/engine/core/Entity-567.js:206；参数 (t, e, i)。

### `eyes/src/engine/core/Entity-62.js`

运行时场景实体：拥有父子层级、当前/上帧状态、控制器/组件集合、覆盖范围及各相机投影缓存。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`Entity extends PioneerPublicApi.CollectionItem @3`。
- 证据：`EntityState @769`。

#### Entity

运行时场景实体：拥有父子层级、当前/上帧状态、控制器/组件集合、覆盖范围及各相机投影缓存。 继承：`PioneerPublicApi.CollectionItem`。源码 [eyes/src/engine/core/Entity-62.js:3](../../eyes/src/engine/core/Entity-62.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_cameraDepths`、`_cameraSpacePosition`、`_canOcclude`、`_childChangedCallbacks`、`_children`、`_components`、`_controllers`、`_destroyed`；调用 `new EntityState`、`new PioneerPublicApi.Collection`、`new PioneerPublicApi.FastMap`、`new PioneerPublicApi.Interval`、`super`。 源码 eyes/src/engine/core/Entity-62.js:4；参数 (t, e)。
- `getScene()`：【结构证据】返回 `this.__getCollectionParent()`；调用 `this.__getCollectionParent`。 源码 eyes/src/engine/core/Entity-62.js:36；参数 ()。
- `isEnabled()`：【结构证据】返回 `this._enabled&&!this._disabledByAncestor`。 源码 eyes/src/engine/core/Entity-62.js:39；参数 ()。
- `isDisabledByAncestor()`：【结构证据】返回 `this._disabledByAncestor`。 源码 eyes/src/engine/core/Entity-62.js:42；参数 ()。
- `setEnabled(enabled)`：【结构证据】写入 `_enabled`；调用 `this._updateEnabled`。 源码 eyes/src/engine/core/Entity-62.js:45；参数 (enabled)。
- `_updateEnabled()`：【结构证据】调用 `this._children[t]._updateDisabledByAncestor`、`this._components.getAt`、`this._components.getAt(t).__updateLoadState`、`this._components.getSize`、`this.getScene`、`this.getScene().getControllerDependencyGraph`。 源码 eyes/src/engine/core/Entity-62.js:48；参数 ()。
- `_updateDisabledByAncestor()`：【结构证据】写入 `_disabledByAncestor`；调用 `this._updateEnabled`。 源码 eyes/src/engine/core/Entity-62.js:53；参数 ()。
- `isDestroyed()`：【结构证据】返回 `this._destroyed`。 源码 eyes/src/engine/core/Entity-62.js:65；参数 ()。
- `getPosition()`：【结构证据】返回 `this._state.position`。 源码 eyes/src/engine/core/Entity-62.js:68；参数 ()。
- `setPosition(t)`：【结构证据】调用 `this._state.position.copy`。 源码 eyes/src/engine/core/Entity-62.js:71；参数 (t)。
- `getVelocity()`：【结构证据】返回 `this._state.velocity`。 源码 eyes/src/engine/core/Entity-62.js:74；参数 ()。
- `setVelocity(t)`：【结构证据】调用 `this._state.velocity.copy`。 源码 eyes/src/engine/core/Entity-62.js:77；参数 (t)。
- `getOrientation()`：【结构证据】返回 `this._state.orientation`。 源码 eyes/src/engine/core/Entity-62.js:80；参数 ()。
- `setOrientation(t)`：【结构证据】调用 `this._state.orientation.copy`。 源码 eyes/src/engine/core/Entity-62.js:83；参数 (t)。
- `getAngularVelocity()`：【结构证据】返回 `this._state.angularVelocity`。 源码 eyes/src/engine/core/Entity-62.js:86；参数 ()。
- `setAngularVelocity(t)`：【结构证据】调用 `this._state.angularVelocity.copy`。 源码 eyes/src/engine/core/Entity-62.js:89；参数 (t)。
- `getLastPosition()`：【结构证据】返回 `this._lastState.position`。 源码 eyes/src/engine/core/Entity-62.js:92；参数 ()。
- `getLastVelocity()`：【结构证据】返回 `this._lastState.velocity`。 源码 eyes/src/engine/core/Entity-62.js:95；参数 ()。
- `getLastOrientation()`：【结构证据】返回 `this._lastState.orientation`。 源码 eyes/src/engine/core/Entity-62.js:98；参数 ()。
- `getLastAngularVelocity()`：【结构证据】返回 `this._lastState.angularVelocity`。 源码 eyes/src/engine/core/Entity-62.js:101；参数 ()。
- `getPositionRelativeToEntity(t, e, i, n)`：【结构证据】返回 `void t.copy(PioneerPublicApi.Vector3.NaN)` 或 `void PioneerPublicApi.Vector3.pool.release(n)`；调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.getEntity`、`l.add`、`l.copy`、`n.add`。 源码 eyes/src/engine/core/Entity-62.js:104；参数 (t, e, i, n)。
- `getVelocityRelativeToEntity(t, e, i, n)`：【结构证据】返回 `void t.copy(PioneerPublicApi.Vector3.NaN)`；调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`a.getVelocityAtTime`、`e.getEntity`、`e.getVelocity`、`o.getParent`。 源码 eyes/src/engine/core/Entity-62.js:165；参数 (t, e, i, n)。
- `getPositionAtTime(t, e)`：【结构证据】调用 `n.__updatePositionAtTime`、`n.getCoverage`、`n.getCoverage().contains`、`n.hasModifiedState`、`n.isEnabled`、`t.copy`。 源码 eyes/src/engine/core/Entity-62.js:207；参数 (t, e)。
- `getVelocityAtTime(t, e)`：【结构证据】调用 `n.__updateVelocityAtTime`、`n.getCoverage`、`n.getCoverage().contains`、`n.hasModifiedState`、`n.isEnabled`、`t.copy`。 源码 eyes/src/engine/core/Entity-62.js:220；参数 (t, e)。
- `getOrientationAtTime(t, e)`：【结构证据】调用 `n.__updateOrientationAtTime`、`n.getCoverage`、`n.getCoverage().contains`、`n.hasModifiedState`、`n.isEnabled`、`t.copy`。 源码 eyes/src/engine/core/Entity-62.js:233；参数 (t, e)。
- `getDistanceTo(t, e, i)`：【结构证据】返回 `r`；调用 `PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.getGroundPosition`、`n.dot`。 源码 eyes/src/engine/core/Entity-62.js:246；参数 (t, e, i)。
- `getOcclusionRadius()`：【结构证据】返回 `this._occlusionRadius`。 源码 eyes/src/engine/core/Entity-62.js:280；参数 ()。
- `getExtentsRadius()`：【结构证据】返回 `this._extentsRadius`。 源码 eyes/src/engine/core/Entity-62.js:283；参数 ()。
- `setOcclusionRadius(occlusionRadius)`：【结构证据】写入 `_occlusionRadius`。 源码 eyes/src/engine/core/Entity-62.js:286；参数 (occlusionRadius)。
- `setExtentsRadius(extentsRadius)`：【结构证据】写入 `_extentsRadius`。 源码 eyes/src/engine/core/Entity-62.js:289；参数 (extentsRadius)。
- `getGroundComponent()`：【结构证据】返回 `this._groundComponent`。 源码 eyes/src/engine/core/Entity-62.js:292；参数 ()。
- `__updateGroundComponent()`：【结构证据】写入 `_groundComponent`；调用 `groundComponent.isGroundComponent`、`this._components.getAt`、`this._components.getSize`。 源码 eyes/src/engine/core/Entity-62.js:295；参数 ()。
- `getPositionCoverage()`：【结构证据】返回 `this._positionCoverage`。 源码 eyes/src/engine/core/Entity-62.js:305；参数 ()。
- `getOrientationCoverage()`：【结构证据】返回 `this._orientationCoverage`。 源码 eyes/src/engine/core/Entity-62.js:308；参数 ()。
- `isInPositionCoverage()`：【结构证据】返回 `this._isInPositionCoverage`。 源码 eyes/src/engine/core/Entity-62.js:311；参数 ()。
- `isInOrientationCoverage()`：【结构证据】返回 `this._isInOrientationCoverage`。 源码 eyes/src/engine/core/Entity-62.js:314；参数 ()。
- `__updateLastState()`：【结构证据】调用 `this._lastState.angularVelocity.copy`、`this._lastState.orientation.copy`、`this._lastState.position.copy`、`this._lastState.velocity.copy`。 源码 eyes/src/engine/core/Entity-62.js:317；参数 ()。
- `__updateCoverage()`：【结构证据】写入 `_positionCoverage.max`、`_positionCoverage.min`；调用 `Math.max`、`Math.min`、`s.getCoverage`、`s.getCoverage().isNaN`、`s.hasModifiedState`、`s.isEnabled`。 源码 eyes/src/engine/core/Entity-62.js:323；参数 ()。
- `canOcclude()`：【结构证据】返回 `this._canOcclude`。 源码 eyes/src/engine/core/Entity-62.js:350；参数 ()。
- `setCanOcclude(canOcclude)`：【结构证据】写入 `_canOcclude`。 源码 eyes/src/engine/core/Entity-62.js:353；参数 (canOcclude)。
- `isOccludingPosition(t, e)`：【结构证据】返回 `false` 或 `r`；调用 `Math.min`、`PioneerPublicApi.Geometry.getLineSphereIntersectionWithLineStartAtOrigin`、`PioneerPublicApi.Interval.pool.get`、`PioneerPublicApi.Interval.pool.release`、`this.getCameraSpacePosition`、`this.getCameraSpacePosition(t).magnitude`。 源码 eyes/src/engine/core/Entity-62.js:356；参数 (t, e)。
- `getParent()`：【结构证据】返回 `this._parent`。 源码 eyes/src/engine/core/Entity-62.js:366；参数 ()。
- `getParentAtTime(t)`：【结构证据】返回 `e<this._parentingTable.length&&t===this._parentingTable[e][0]?this._parentingTable[e][1]:e>0?this._parentingTable[e-1][1]:this._parentingTable.length>`；调用 `PioneerPublicApi.Sort.getIndexObject`、`this._parent.getName`。 源码 eyes/src/engine/core/Entity-62.js:369；参数 (t)。
- `setParent(t)`：【结构证据】写入 `_parent`；返回 `void`；调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.isNaN`、`parent._childChangedCallbacks[t]`、`this._clearCameraReferences`、`this._parent._childChangedCallbacks[t]`。 源码 eyes/src/engine/core/Entity-62.js:373；参数 (t)。
- `_clearCameraReferences()`：【结构证据】调用 `this._cameraDepths.clear`、`this._cameraSpacePosition.clear`、`this._children[t]._clearCameraReferences`、`this._components.getAt`、`this._components.getAt(t).__clearCameraDependentsBase`、`this._components.getSize`。 源码 eyes/src/engine/core/Entity-62.js:393；参数 ()。
- `getNumChildren()`：【结构证据】返回 `this._children.length`。 源码 eyes/src/engine/core/Entity-62.js:405；参数 ()。
- `getChild(t)`：【结构证据】返回 `this._children[t]`。 源码 eyes/src/engine/core/Entity-62.js:408；参数 (t)。
- `getLowestCommonAncestor(t)`：【结构证据】返回 `null` 或 `e`；调用 `e.getParent`、`i.getParent`。 源码 eyes/src/engine/core/Entity-62.js:411；参数 (t)。
- `getLowestCommonAncestorAtTime(t, e)`：【结构证据】返回 `null` 或 `i`；调用 `i.getParentAtTime`、`r.getEntity`、`s.getParentAtTime`、`this.getScene`。 源码 eyes/src/engine/core/Entity-62.js:446；参数 (t, e)。
- `getNumParentingTableEntries()`：【结构证据】返回 `this._parentingTable.length`。 源码 eyes/src/engine/core/Entity-62.js:494；参数 ()。
- `getParentingTableEntry(t)`：【结构证据】返回 `this._parentingTable[t]`。 源码 eyes/src/engine/core/Entity-62.js:497；参数 (t)。
- `addParentingTableEntry(t, e)`：【结构证据】调用 `PioneerPublicApi.Sort.addObject`、`this.__updateCoverage`。 源码 eyes/src/engine/core/Entity-62.js:500；参数 (t, e)。
- `removeParentingTableEntry(t)`：【结构证据】调用 `this.__updateCoverage`、`this._parentingTable.splice`。 源码 eyes/src/engine/core/Entity-62.js:504；参数 (t)。
- `clearParentingTableEntries()`：【结构证据】写入 `_parentingTable`；调用 `this.__updateCoverage`。 源码 eyes/src/engine/core/Entity-62.js:508；参数 ()。
- `addParentChangedCallback(t)`：【结构证据】调用 `this._parentChangedCallbacks.push`。 源码 eyes/src/engine/core/Entity-62.js:512；参数 (t)。
- `removeParentChangedCallback(t)`：【结构证据】调用 `this._parentChangedCallbacks.indexOf`、`this._parentChangedCallbacks.splice`。 源码 eyes/src/engine/core/Entity-62.js:515；参数 (t)。
- `addChildChangedCallback(t)`：【结构证据】调用 `this._childChangedCallbacks.push`。 源码 eyes/src/engine/core/Entity-62.js:519；参数 (t)。
- `removeChildChangedCallback(t)`：【结构证据】调用 `this._childChangedCallbacks.indexOf`、`this._childChangedCallbacks.splice`。 源码 eyes/src/engine/core/Entity-62.js:522；参数 (t)。
- `getComponent(t, e)`：【结构证据】返回 `this._components.get(t,e)`；调用 `this._components.get`。 源码 eyes/src/engine/core/Entity-62.js:526；参数 (t, e)。
- `getComponentAt(t)`：【结构证据】返回 `this._components.getAt(t)`；调用 `this._components.getAt`。 源码 eyes/src/engine/core/Entity-62.js:529；参数 (t)。
- `getNumComponents()`：【结构证据】返回 `this._components.getSize()`；调用 `this._components.getSize`。 源码 eyes/src/engine/core/Entity-62.js:532；参数 ()。
- `addComponent(t, e="")`：【结构证据】返回 `i`；调用 `this.__updateGroundComponent`、`this._components.add`。 源码 eyes/src/engine/core/Entity-62.js:535；参数 (t, e="")。
- `removeComponent(t)`：【结构证据】调用 `this.__updateGroundComponent`、`this._components.remove`。 源码 eyes/src/engine/core/Entity-62.js:540；参数 (t)。
- `clearComponents()`：【结构证据】调用 `this._components.clear`。 源码 eyes/src/engine/core/Entity-62.js:544；参数 ()。
- `getController(t, e)`：【结构证据】返回 `this._controllers.get(t,e)`；调用 `this._controllers.get`。 源码 eyes/src/engine/core/Entity-62.js:547；参数 (t, e)。
- `getControllerAt(t)`：【结构证据】返回 `this._controllers.getAt(t)`；调用 `this._controllers.getAt`。 源码 eyes/src/engine/core/Entity-62.js:550；参数 (t)。
- `getNumControllers()`：【结构证据】返回 `this._controllers.getSize()`；调用 `this._controllers.getSize`。 源码 eyes/src/engine/core/Entity-62.js:553；参数 ()。
- `addController(t, e="", i)`：【结构证据】返回 `s`；调用 `this.__updateCoverage`、`this._controllers.add`。 源码 eyes/src/engine/core/Entity-62.js:556；参数 (t, e="", i)。
- `removeController(t)`：【结构证据】调用 `this.__updateCoverage`、`this._controllers.remove`。 源码 eyes/src/engine/core/Entity-62.js:561；参数 (t)。
- `clearControllers()`：【结构证据】调用 `this.__updateCoverage`、`this._controllers.clear`。 源码 eyes/src/engine/core/Entity-62.js:565；参数 ()。
- `getCameraSpacePosition(t)`：【结构证据】返回 `void 0!==e?e:PioneerPublicApi.Vector3.NaN`；调用 `this._cameraSpacePosition.get`。 源码 eyes/src/engine/core/Entity-62.js:569；参数 (t)。
- `getNormalSpacePosition(t)`：【结构证据】返回 `void 0!==e?e:PioneerPublicApi.Vector3.NaN`；调用 `this._normalSpacePosition.get`。 源码 eyes/src/engine/core/Entity-62.js:573；参数 (t)。
- `getPixelSpacePosition(t)`：【结构证据】返回 `void 0!==e?e:PioneerPublicApi.Vector2.NaN`；调用 `this._pixelSpacePosition.get`。 源码 eyes/src/engine/core/Entity-62.js:577；参数 (t)。
- `getNormalSpaceOcclusionRadius(t)`：【结构证据】返回 `0!==this._extentsRadius?this.getNormalSpaceExtentsRadius(t)*this._occlusionRadius/this._extentsRadius:0`；调用 `this.getNormalSpaceExtentsRadius`。 源码 eyes/src/engine/core/Entity-62.js:581；参数 (t)。
- `getNormalSpaceExtentsRadius(t)`：【结构证据】返回 `void 0!==e?e:Number.NaN`；调用 `this._normalSpaceExtentsRadius.get`。 源码 eyes/src/engine/core/Entity-62.js:584；参数 (t)。
- `getPixelSpaceOcclusionRadius(t)`：【结构证据】返回 `0!==this._extentsRadius?this.getPixelSpaceExtentsRadius(t)*this._occlusionRadius/this._extentsRadius:0`；调用 `this.getPixelSpaceExtentsRadius`。 源码 eyes/src/engine/core/Entity-62.js:588；参数 (t)。
- `getPixelSpaceExtentsRadius(t)`：【结构证据】返回 `void 0!==e?e:Number.NaN`；调用 `this._pixelSpaceExtentsRadius.get`。 源码 eyes/src/engine/core/Entity-62.js:591；参数 (t)。
- `getGreatestPixelSpaceOcclusionRadius()`：【结构证据】返回 `0!==this._extentsRadius?this.getGreatestPixelSpaceExtentsRadius()*this._occlusionRadius/this._extentsRadius:0`；调用 `this.getGreatestPixelSpaceExtentsRadius`。 源码 eyes/src/engine/core/Entity-62.js:595；参数 ()。
- `getGreatestPixelSpaceExtentsRadius()`：【结构证据】返回 `this._greatestPixelSpaceExtentsRadius`。 源码 eyes/src/engine/core/Entity-62.js:598；参数 ()。
- `getLeastCameraDepth()`：【结构证据】返回 `this._leastCameraDepth`。 源码 eyes/src/engine/core/Entity-62.js:601；参数 ()。
- `__setCameraDependentVariables(t, e, i)`：【结构证据】返回 `void`；调用 `n.getPixelSpacePositionFromNormalSpacePosition`、`n.getPixelSpaceRadiusFromNormalSpaceRadius`、`new PioneerPublicApi.Vector2`、`new PioneerPublicApi.Vector3`、`o.copy`、`o.magnitude`。 源码 eyes/src/engine/core/Entity-62.js:604；参数 (t, e, i)。
- `__removeCameraDependents(t)`：【结构证据】调用 `this._cameraDepths.delete`、`this._cameraSpacePosition.delete`、`this._components.getAt`、`this._components.getAt(e).__removeCameraDependentsBase`、`this._components.getSize`、`this._normalSpaceExtentsRadius.delete`。 源码 eyes/src/engine/core/Entity-62.js:622；参数 (t)。
- `get(t, e=0)`：【结构证据】返回 `i||this._controllers.getAny(t,e)`；调用 `this._components.getAny`、`this._controllers.getAny`。 源码 eyes/src/engine/core/Entity-62.js:631；参数 (t, e=0)。
- `getLoadedPromise(t=false, e=Number.POSITIVE_INFINITY)`：【结构证据】调用 `0,PioneerPublicApi.waitUntil`、`Promise.allSettled`、`i.push`、`n.every`、`n.filter`、`n.getCoverage`；含显式错误分支。 源码 eyes/src/engine/core/Entity-62.js:635；参数 (t=false, e=Number.POSITIVE_INFINITY)。
- `waitTillInPlace(t, e=Number.POSITIVE_INFINITY)`：【结构证据】返回 `(0,PioneerPublicApi.waitUntil)(()=>{if(this.getPositionCoverage().isNaN()||this.getOrientationCoverage().isNaN())return false;t??=this.getScene().getE`；调用 `0,PioneerPublicApi.waitUntil`、`PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.isNaN`。 源码 eyes/src/engine/core/Entity-62.js:650；参数 (t, e=Number.POSITIVE_INFINITY)。
- `method toString()`：【结构证据】本访问器没有 AST 可见的 this 字段直接赋值；调用 `this.getName`。源码 eyes/src/engine/core/Entity-62.js:1002；参数 ()。
- `__destroy()`：【结构证据】写入 `_destroyed`；调用 `super.__destroy`、`this._children[t].setParent`、`this._components.__destroy`、`this._controllers.__destroy`、`this.setParent`。 源码 eyes/src/engine/core/Entity-62.js:669；参数 ()。
- `__updateParent(t)`：【结构证据】写入 `_lastParent`；调用 `this.getParentAtTime`、`this.getScene`、`this.getScene().getControllerDependencyGraph`、`this.getScene().getControllerDependencyGraph().needsSorting`、`this.getScene().getEntity`、`this.setParent`。 源码 eyes/src/engine/core/Entity-62.js:677；参数 (t)。
- `__updateIsInCoverages(t)`：【结构证据】写入 `_isInOrientationCoverage`、`_isInPositionCoverage`；调用 `this._components.getAt`、`this._components.getAt(t).__updateLoadState`、`this._components.getSize`、`this._orientationCoverage.contains`、`this._positionCoverage.contains`。 源码 eyes/src/engine/core/Entity-62.js:685；参数 (t)。
- `__updateVisuals()`：【结构证据】写入 `_greatestPixelSpaceExtentsRadius`、`_leastCameraDepth`；调用 `Math.min`、`e.__updateBase`、`e.isEnabled`、`this._cameraDepths.getAt`、`this._cameraDepths.getSize`、`this._components.getAt`。 源码 eyes/src/engine/core/Entity-62.js:690；参数 ()。
- `__updateCameraVariables(t, e, i, n)`：【结构证据】调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.getCameraSpacePosition`、`e.getPosition`、`i.__updateCameraVariablesBase`、`i.isEnabled`。 源码 eyes/src/engine/core/Entity-62.js:706；参数 (t, e, i, n)。
- `__prepareForRender(t)`：【结构证据】调用 `i.__prepareForRenderBase`、`this._components.getAt`、`this._components.getSize`。 源码 eyes/src/engine/core/Entity-62.js:724；参数 (t)。
- `_isStartTimeLess(t, e)`：【结构证据】返回 `t[0]<e[0]`。 源码 eyes/src/engine/core/Entity-62.js:730；参数 (t, e)。
- `_isStartTimeEqual(t, e)`：【结构证据】返回 `t[0]===e[0]`。 源码 eyes/src/engine/core/Entity-62.js:733；参数 (t, e)。
- `isStartTimeLessThanTime(t, e)`：【结构证据】返回 `t[0]<e`。 源码 eyes/src/engine/core/Entity-62.js:736；参数 (t, e)。

#### EntityState

运行时实体的位置、速度、姿态和角速度快照。 继承：`无显式继承`。源码 [eyes/src/engine/core/Entity-62.js:769](../../eyes/src/engine/core/Entity-62.js#L769)。

- `constructor()`：【结构证据】写入 `angularVelocity`、`orientation`、`position`、`velocity`；调用 `new PioneerPublicApi.Quaternion`、`new PioneerPublicApi.Vector3`。 源码 eyes/src/engine/core/Entity-62.js:774；参数 ()。

### `eyes/src/engine/core/EntityEntry-699.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。

- 证据：`import ./Entity-567.js`。
- 证据：`顶层副作用 Entity.Entity.register({moon:{groups:["earth","moons"],radius:1737.4,label:"Moon",parents:[[Number.NEGATIVE_INFINITY,"earth"]],trail:{length:void 0,color:[0,.6,.8,.7]},spheroid:{equatorialRadius:1737.4,polarRadius:1737.4`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/EntityEntry-700.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。

- 证据：`import ./Entity-567.js`。
- 证据：`顶层副作用 Entity.Entity.register({adrastea:{groups:["jupiter","moons","amalthea","inner","regular"],radius:8.2,label:"Adrastea",parents:[[Number.NEGATIVE_INFINITY,"jupiter"]],trail:{length:void 0,color:[.95,.71,.64,.7]},model:{url`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/EntityEntry-702.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。

- 证据：`import ./Entity-567.js`。
- 证据：`顶层副作用 Entity.Entity.register({phobos:{groups:["mars","moons"],radius:14,label:"Phobos",parents:[[Number.NEGATIVE_INFINITY,"mars"]],trail:{length:void 0,color:[.89,.51,.35,.7]},model:{url:"$STATIC_ASSETS_URL/models/phobos/phobo`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/EntityEntry-706.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。

- 证据：`import ./Entity-567.js`。
- 证据：`顶层副作用 Entity.Entity.register({ariel:{groups:["uranus","moons","major"],radius:578.9,label:"Ariel",parents:[[Number.NEGATIVE_INFINITY,"uranus"]],trail:{length:void 0,color:[.67,.92,1,.7]},spheroid:{equatorialRadius:578.9,polarR`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/EntityItem.js`

实体所属组件/控制器的公共持有关系和启用/销毁接口。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`EntityItem extends PioneerPublicApi.CollectionItem @3`。

#### EntityItem

实体所属组件/控制器的公共持有关系和启用/销毁接口。 继承：`PioneerPublicApi.CollectionItem`。源码 [eyes/src/engine/core/EntityItem.js:3](../../eyes/src/engine/core/EntityItem.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_destroyed`、`_enabled`；调用 `super`。 源码 eyes/src/engine/core/EntityItem.js:4；参数 (t, e)。
- `getEntity()`：【结构证据】返回 `this.__getCollectionParent()`；调用 `this.__getCollectionParent`。 源码 eyes/src/engine/core/EntityItem.js:9；参数 ()。
- `getEngine()`：【结构证据】返回 `this.getEntity().getScene().getEngine()`；调用 `this.getEntity`、`this.getEntity().getScene`、`this.getEntity().getScene().getEngine`。 源码 eyes/src/engine/core/EntityItem.js:12；参数 ()。
- `isDestroyed()`：【结构证据】返回 `this._destroyed`。 源码 eyes/src/engine/core/EntityItem.js:15；参数 ()。
- `__destroy()`：【结构证据】写入 `_destroyed`；调用 `super.__destroy`。 源码 eyes/src/engine/core/EntityItem.js:18；参数 ()。
- `isEnabled()`：【结构证据】返回 `this._enabled`。 源码 eyes/src/engine/core/EntityItem.js:22；参数 ()。
- `setEnabled(enabled)`：【结构证据】写入 `_enabled`。 源码 eyes/src/engine/core/EntityItem.js:25；参数 (enabled)。
- `__update()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/EntityItem.js:28；参数 ()。

### `eyes/src/engine/core/EntityRef.js`

依据实体名懒解析引用，在对象销毁/禁用/改名后重新查找。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`EntityRef extends PioneerPublicApi.BaseRef @3`。

#### EntityRef

依据实体名懒解析引用，在对象销毁/禁用/改名后重新查找。 继承：`PioneerPublicApi.BaseRef`。源码 [eyes/src/engine/core/EntityRef.js:3](../../eyes/src/engine/core/EntityRef.js#L3)。

- `constructor(scene, name="")`：【结构证据】写入 `_name`、`_scene`；调用 `super`。 源码 eyes/src/engine/core/EntityRef.js:4；参数 (scene, name="")。
- `getName()`：【结构证据】返回 `this._name`。 源码 eyes/src/engine/core/EntityRef.js:9；参数 ()。
- `setName(name)`：【结构证据】写入 `_name`。 源码 eyes/src/engine/core/EntityRef.js:12；参数 (name)。
- `update()`：【结构证据】调用 `t.getName`、`t.isDestroyed`、`t.isEnabled`、`this._scene.getEntity`、`this._setRef`、`this.getRef`。 源码 eyes/src/engine/core/EntityRef.js:15；参数 ()。

### `eyes/src/engine/core/EntityUtils.js`

批量实体检索、层级和场景状态操作工具。

- 证据：`import ../pioneer/index.js`。
- 证据：`EntityUtils @3`。

#### EntityUtils

批量实体检索、层级和场景状态操作工具。 继承：`无显式继承`。源码 [eyes/src/engine/core/EntityUtils.js:3](../../eyes/src/engine/core/EntityUtils.js#L3)。

- `addGeyser(t, e, i, n, o, r, a, l)`：【结构证据】调用 `c.setColorOfParticles`、`c.setDirection`、`c.setLength`、`c.setNumberOfParticles`、`c.setOriginOffset`、`c.setParticleSpacingRandom`。 源码 eyes/src/engine/core/EntityUtils.js:4；参数 (t, e, i, n, o, r, a, l)。
- `showSubObjectDuringInterval(t, e, i, n)`：【结构证据】返回 `void`；调用 `i.setHiddenObject`、`new Pioneer.Interval`、`o.setHiddenObject`、`r.setCoverage`、`r.setEnterFunction`、`r.setExitFunction`。 源码 eyes/src/engine/core/EntityUtils.js:16；参数 (t, e, i, n)。

### `eyes/src/engine/core/FPS.js`

累计帧时间计算刷新率。

- 证据：`FPS @2`。

#### FPS

累计帧时间计算刷新率。 继承：`无显式继承`。源码 [eyes/src/engine/core/FPS.js:2](../../eyes/src/engine/core/FPS.js#L2)。

- `getNumberOfSamples()`：【结构证据】返回 `this._numberOfSamples`。 源码 eyes/src/engine/core/FPS.js:3；参数 ()。
- `setNumberOfSamples(numberOfSamples)`：【结构证据】写入 `_numberOfSamples`、`_samples`；调用 `new Array`。 源码 eyes/src/engine/core/FPS.js:6；参数 (numberOfSamples)。
- `getFPS()`：【结构证据】返回 `this._samples.length/t`。 源码 eyes/src/engine/core/FPS.js:10；参数 ()。
- `update(t)`：【结构证据】写入 `_index`、`_samples[this._index]`。 源码 eyes/src/engine/core/FPS.js:15；参数 (t)。

### `eyes/src/engine/core/FastIterable.js`

为数组式快速遍历容器提供索引取值/大小等基础接口。

- 证据：`FastIterable @2`。

#### FastIterable

为数组式快速遍历容器提供索引取值/大小等基础接口。 继承：`无显式继承`。源码 [eyes/src/engine/core/FastIterable.js:2](../../eyes/src/engine/core/FastIterable.js#L2)。


### `eyes/src/engine/core/FastMap.js`

组合键查找与连续数组遍历的映射容器。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`FastMap extends PioneerPublicApi.FastIterable @3`。

#### FastMap

组合键查找与连续数组遍历的映射容器。 继承：`PioneerPublicApi.FastIterable`。源码 [eyes/src/engine/core/FastMap.js:3](../../eyes/src/engine/core/FastMap.js#L3)。

- `constructor(t)`：【结构证据】写入 `_entries`、`_keyMap`；调用 `new Map`、`super`、`this._entries.push`、`this._keyMap.set`。 源码 eyes/src/engine/core/FastMap.js:4；参数 (t)。
- `has(t)`：【结构证据】返回 `this._keyMap.has(t)`；调用 `this._keyMap.has`。 源码 eyes/src/engine/core/FastMap.js:13；参数 (t)。
- `get(t)`：【结构证据】返回 `this._entries[e].value`；调用 `this._keyMap.get`。 源码 eyes/src/engine/core/FastMap.js:16；参数 (t)。
- `set(t, e)`：【结构证据】写入 `_entries[i].value`；调用 `this._entries.push`、`this._keyMap.get`、`this._keyMap.set`。 源码 eyes/src/engine/core/FastMap.js:20；参数 (t, e)。
- `delete(t)`：【结构证据】返回 `true` 或 `false`；调用 `this._entries.splice`、`this._keyMap.delete`、`this._keyMap.get`、`this._keyMap.set`。 源码 eyes/src/engine/core/FastMap.js:27；参数 (t)。
- `clear()`：【结构证据】写入 `_entries`；调用 `this._keyMap.clear`。 源码 eyes/src/engine/core/FastMap.js:37；参数 ()。
- `getAt(t)`：【结构证据】返回 `this._entries[t]`。 源码 eyes/src/engine/core/FastMap.js:41；参数 (t)。
- `getSize()`：【结构证据】返回 `this._entries.length`。 源码 eyes/src/engine/core/FastMap.js:44；参数 ()。
- `sort(t)`：【结构证据】调用 `PioneerPublicApi.Sort.sortObject`、`t`、`this._keyMap.set`。 源码 eyes/src/engine/core/FastMap.js:47；参数 (t)。

### `eyes/src/engine/core/FastSet.js`

组合成员查找与连续数组遍历的集合容器。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`FastSet extends PioneerPublicApi.FastIterable @3`。

#### FastSet

组合成员查找与连续数组遍历的集合容器。 继承：`PioneerPublicApi.FastIterable`。源码 [eyes/src/engine/core/FastSet.js:3](../../eyes/src/engine/core/FastSet.js#L3)。

- `constructor(t)`：【结构证据】写入 `_valueMap`、`_values`；调用 `new Map`、`super`、`this._valueMap.set`、`this._values.push`。 源码 eyes/src/engine/core/FastSet.js:4；参数 (t)。
- `has(t)`：【结构证据】返回 `this._valueMap.has(t)`；调用 `this._valueMap.has`。 源码 eyes/src/engine/core/FastSet.js:10；参数 (t)。
- `add(t)`：【结构证据】返回 `this`；调用 `this._valueMap.get`、`this._valueMap.set`、`this._values.push`。 源码 eyes/src/engine/core/FastSet.js:13；参数 (t)。
- `delete(t)`：【结构证据】返回 `true` 或 `false`；调用 `this._valueMap.delete`、`this._valueMap.get`、`this._valueMap.set`、`this._values.splice`。 源码 eyes/src/engine/core/FastSet.js:17；参数 (t)。
- `clear()`：【结构证据】写入 `_values`；调用 `this._valueMap.clear`。 源码 eyes/src/engine/core/FastSet.js:27；参数 ()。
- `getAt(t)`：【结构证据】返回 `this._values[t]`。 源码 eyes/src/engine/core/FastSet.js:31；参数 (t)。
- `getSize()`：【结构证据】返回 `this._values.length`。 源码 eyes/src/engine/core/FastSet.js:34；参数 ()。
- `sort(t)`：【结构证据】调用 `PioneerPublicApi.Sort.sortObject`、`t`、`this._valueMap.set`。 源码 eyes/src/engine/core/FastSet.js:37；参数 (t)。

### `eyes/src/engine/core/Features.js`

创建行星/实体附加可视特征及其配置。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`Features @4`。

#### Features

创建行星/实体附加可视特征及其配置。 继承：`无显式继承`。源码 [eyes/src/engine/core/Features.js:4](../../eyes/src/engine/core/Features.js#L4)。

- `setEnabled(t, e, i, s)`：【结构证据】调用 `new Error`、`o`；含显式错误分支。 源码 eyes/src/engine/core/Features.js:5；参数 (t, e, i, s)。
- `isEnabled(t, e, i)`：【结构证据】返回 `n(t)`；调用 `n`、`new Error`；含显式错误分支。 源码 eyes/src/engine/core/Features.js:12；参数 (t, e, i)。
- `setEnabledJupiterAuroras(t, e)`：【结构证据】调用 `Features._createJupiterModelComponent`、`e.removeComponent`、`t.getEntity`。 源码 eyes/src/engine/core/Features.js:19；参数 (t, e)。
- `isEnabledJupiterAuroras(t)`：【结构证据】返回 `!!e&&null!==e.getComponent(Pioneer.ModelComponent,"auroras")`；调用 `e.getComponent`、`t.getEntity`。 源码 eyes/src/engine/core/Features.js:25；参数 (t)。
- `setEnabledJupiterMagnetosphere(t, e)`：【结构证据】调用 `Features._createJupiterModelComponent`、`e.removeComponent`、`t.getEntity`。 源码 eyes/src/engine/core/Features.js:29；参数 (t, e)。
- `isEnabledJupiterMagnetosphere(t)`：【结构证据】返回 `!!e&&null!==e.getComponent(Pioneer.ModelComponent,"magnetosphere")`；调用 `e.getComponent`、`t.getEntity`。 源码 eyes/src/engine/core/Features.js:35；参数 (t)。
- `setEnabledJupiterRadiationBelt(t, e)`：【结构证据】调用 `Features._createJupiterModelComponent`、`e.removeComponent`、`t.getEntity`。 源码 eyes/src/engine/core/Features.js:39；参数 (t, e)。
- `isEnabledJupiterRadiationBelt(t)`：【结构证据】返回 `false` 或 `true`；调用 `e.getComponent`、`t.getEntity`。 源码 eyes/src/engine/core/Features.js:45；参数 (t)。
- `setEnabledSaturnMagnetosphere(t, e)`：【结构证据】调用 `Entity.Entity.createFromOptions`、`Math.sqrt`、`e.getThreeJsObjects`、`e.setResourcesLoadedCallback`、`e.setRotation`、`e.setScale`。 源码 eyes/src/engine/core/Features.js:51；参数 (t, e)。
- `isEnabledSaturnMagnetosphere(t)`：【结构证据】返回 `null!==t.getEntity("saturn_magnetosphere")`；调用 `t.getEntity`。 源码 eyes/src/engine/core/Features.js:96；参数 (t)。
- `_createJupiterModelComponent(t, e, i)`：【结构证据】调用 `n.addComponent`、`new Error`、`new Pioneer.Quaternion`、`o.setRotation`、`o.setScale`、`o.setUrl`；含显式错误分支。 源码 eyes/src/engine/core/Features.js:99；参数 (t, e, i)。

### `eyes/src/engine/core/Geometry.js`

球面、射线、平面和几何交点/坐标转换算法。

- 证据：`Geometry @2`。

#### Geometry

球面、射线、平面和几何交点/坐标转换算法。 继承：`无显式继承`。源码 [eyes/src/engine/core/Geometry.js:2](../../eyes/src/engine/core/Geometry.js#L2)。

- `getLineSphereIntersectionWithSphereAtOrigin(t, e, i)`：【结构证据】返回 `r<0?Number.NaN:(-n-Math.sqrt(r))/o`；调用 `Math.sqrt`、`e.dot`、`t.dot`。 源码 eyes/src/engine/core/Geometry.js:3；参数 (t, e, i)。
- `getLineSphereIntersectionWithLineStartAtOrigin(t, e, i, s)`：【结构证据】调用 `Math.sqrt`、`e.dot`、`i.dot`。 源码 eyes/src/engine/core/Geometry.js:10；参数 (t, e, i, s)。
- `getLLAFromXYZOnSphere(t, e, i)`：【结构证据】调用 `Math.atan`、`Math.atan2`、`e.magnitude`、`e.magnitudeXY`。 源码 eyes/src/engine/core/Geometry.js:23；参数 (t, e, i)。
- `getXYZFromLLAOnSphere(t, e, i)`：【结构证据】调用 `Math.cos`、`Math.sin`。 源码 eyes/src/engine/core/Geometry.js:29；参数 (t, e, i)。

### `eyes/src/engine/core/Input.js`

收集键盘、鼠标、滚轮与多点触摸状态，识别活动视口并在帧末复位瞬时输入。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`Touch @3`。
- 证据：`Input @17`。

#### Touch

单个触点的当前位置与帧内输入状态。 继承：`无显式继承`。源码 [eyes/src/engine/core/Input.js:3](../../eyes/src/engine/core/Input.js#L3)。

- `constructor()`：【结构证据】写入 `identifier`、`lastFramePosition`、`pressedPosition`、`pressedTime`、`thisFramePosition`；调用 `new PioneerPublicApi.Vector2`。 源码 eyes/src/engine/core/Input.js:9；参数 ()。

#### Input

收集键盘、鼠标、滚轮与多点触摸状态，识别活动视口并在帧末复位瞬时输入。 继承：`无显式继承`。源码 [eyes/src/engine/core/Input.js:17](../../eyes/src/engine/core/Input.js#L17)。

- `constructor(engine)`：【结构证据】写入 `_activeViewport`、`_cursorPosition`、`_draggedOffset`、`_engine`、`_keysPressed`、`_maxSelectDistance`、`_maxSelectTime`、`_modifierKeysPressed`；调用 `Date.now`、`Input._modifierKeys.has`、`Math.abs`、`Math.max`、`PioneerPublicApi.Vector2.pool.get`、`PioneerPublicApi.Vector2.pool.release`。 源码 eyes/src/engine/core/Input.js:18；参数 (engine)。
- `getActiveViewport()`：【结构证据】返回 `this._activeViewport`。 源码 eyes/src/engine/core/Input.js:151；参数 ()。
- `getDraggedOffset()`：【结构证据】返回 `this._draggedOffset`。 源码 eyes/src/engine/core/Input.js:154；参数 ()。
- `getZoomedOffset()`：【结构证据】返回 `this._zoomedOffset`。 源码 eyes/src/engine/core/Input.js:157；参数 ()。
- `getRotatedOffset()`：【结构证据】返回 `this._rotatedOffset`。 源码 eyes/src/engine/core/Input.js:160；参数 ()。
- `isShiftPressed()`：【结构证据】返回 `this._shiftPressed`。 源码 eyes/src/engine/core/Input.js:163；参数 ()。
- `isKeyPressed(t)`：【结构证据】返回 `this._keysPressed.has(t)`；调用 `this._keysPressed.has`。 源码 eyes/src/engine/core/Input.js:166；参数 (t)。
- `isSelected()`：【结构证据】返回 `this._selected`。 源码 eyes/src/engine/core/Input.js:169；参数 ()。
- `getSelectedPosition()`：【结构证据】返回 `this._selectedPosition`。 源码 eyes/src/engine/core/Input.js:172；参数 ()。
- `getCursorPosition()`：【结构证据】返回 `this._cursorPosition`。 源码 eyes/src/engine/core/Input.js:175；参数 ()。
- `__setActiveViewport(activeViewport)`：【结构证据】写入 `_activeViewport`。 源码 eyes/src/engine/core/Input.js:178；参数 (activeViewport)。
- `__resetStatesForNextFrame()`：【结构证据】写入 `_rotatedOffset`、`_selected`、`_zoomedOffset`；调用 `e.lastFramePosition.copy`、`this._draggedOffset.set`。 源码 eyes/src/engine/core/Input.js:181；参数 ()。
- `_updateActiveViewport()`：【结构证据】写入 `_activeViewport`；调用 `activeViewport.getBounds`、`activeViewport.isEnabled`、`i.contains`、`this._engine.getNumViewports`、`this._engine.getViewportAt`。 源码 eyes/src/engine/core/Input.js:191；参数 ()。

### `eyes/src/engine/core/Interval.js`

闭区间表示、包含/交集/并集和空值判定工具。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`Interval @3`。

#### Interval

闭区间表示、包含/交集/并集和空值判定工具。 继承：`无显式继承`。源码 [eyes/src/engine/core/Interval.js:3](../../eyes/src/engine/core/Interval.js#L3)。

- `constructor(min=0, max=0)`：【结构证据】写入 `_max`、`_min`。 源码 eyes/src/engine/core/Interval.js:7；参数 (min=0, max=0)。
- `get min()`：【结构证据】读取访问器，返回 `this._min`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Interval.js:30；参数 ()。
- `set min(min)`：【结构证据】写入访问器，接收参数 (min)；实际写入 `_min`。源码 eyes/src/engine/core/Interval.js:37；参数 (min)。
- `get max()`：【结构证据】读取访问器，返回 `this._max`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Interval.js:44；参数 ()。
- `set max(max)`：【结构证据】写入访问器，接收参数 (max)；实际写入 `_max`。源码 eyes/src/engine/core/Interval.js:51；参数 (max)。
- `method toString()`：【结构证据】本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Interval.js:57；参数 ()。
- `isNaN()`：【结构证据】返回 `this._min!=this._min||this._max!=this._max`。 源码 eyes/src/engine/core/Interval.js:26；参数 ()。
- `copy(t)`：【结构证据】写入 `_max`、`_min`。 源码 eyes/src/engine/core/Interval.js:29；参数 (t)。
- `set(min, max)`：【结构证据】写入 `_max`、`_min`。 源码 eyes/src/engine/core/Interval.js:33；参数 (min, max)。
- `length()`：【结构证据】返回 `this._max-this._min`。 源码 eyes/src/engine/core/Interval.js:37；参数 ()。
- `clamp(t)`：【结构证据】返回 `Math.min(Math.max(this._min,t),this._max)`；调用 `Math.max`、`Math.min`。 源码 eyes/src/engine/core/Interval.js:40；参数 (t)。
- `expandTo(t)`：【结构证据】写入 `_max`、`_min`；调用 `Math.max`、`Math.min`。 源码 eyes/src/engine/core/Interval.js:43；参数 (t)。
- `contains(t)`：【结构证据】返回 `this._min<=t&&t<this._max`。 源码 eyes/src/engine/core/Interval.js:47；参数 (t)。
- `intersects(t)`：【结构证据】返回 `this._min<t.max&&t.min<this._max`。 源码 eyes/src/engine/core/Interval.js:50；参数 (t)。
- `intersection(t, e)`：【结构证据】写入 `_max`、`_min`；调用 `Math.max`、`Math.min`。 源码 eyes/src/engine/core/Interval.js:53；参数 (t, e)。
- `union(t, e)`：【结构证据】写入 `_max`、`_min`；调用 `Math.max`、`Math.min`。 源码 eyes/src/engine/core/Interval.js:58；参数 (t, e)。

### `eyes/src/engine/core/JsonHelper.js`

将 JSON 风格配置转换到引擎对象并提取字段。

- 证据：`JsonHelper @2`。

#### JsonHelper

将 JSON 风格配置转换到引擎对象并提取字段。 继承：`无显式继承`。源码 [eyes/src/engine/core/JsonHelper.js:2](../../eyes/src/engine/core/JsonHelper.js#L2)。

- `isNumber(t)`：【结构证据】返回 `"number"==typeof t`。 源码 eyes/src/engine/core/JsonHelper.js:3；参数 (t)。
- `isString(t)`：【结构证据】返回 `"string"==typeof t`。 源码 eyes/src/engine/core/JsonHelper.js:6；参数 (t)。
- `isBoolean(t)`：【结构证据】返回 `"boolean"==typeof t`。 源码 eyes/src/engine/core/JsonHelper.js:9；参数 (t)。
- `isObject(t)`：【结构证据】返回 `"object"==typeof t&&!JsonHelper.isArray(t)&&null!==t`；调用 `JsonHelper.isArray`。 源码 eyes/src/engine/core/JsonHelper.js:12；参数 (t)。
- `isArray(t)`：【结构证据】返回 `Array.isArray(t)`；调用 `Array.isArray`。 源码 eyes/src/engine/core/JsonHelper.js:15；参数 (t)。
- `isObjectOfStrings(t)`：【结构证据】返回 `false` 或 `true`；调用 `JsonHelper.isObject`、`JsonHelper.isString`、`Object.values`。 源码 eyes/src/engine/core/JsonHelper.js:18；参数 (t)。
- `isObjectOfNumbers(t)`：【结构证据】返回 `false` 或 `true`；调用 `JsonHelper.isNumber`、`JsonHelper.isObject`、`Object.values`。 源码 eyes/src/engine/core/JsonHelper.js:23；参数 (t)。
- `isObjectOfV(t, e)`：【结构证据】返回 `false` 或 `true`；调用 `JsonHelper.isObject`、`Object.values`、`e`。 源码 eyes/src/engine/core/JsonHelper.js:28；参数 (t, e)。
- `isArrayOfStrings(t)`：【结构证据】返回 `false` 或 `true`；调用 `JsonHelper.isArray`、`JsonHelper.isString`。 源码 eyes/src/engine/core/JsonHelper.js:33；参数 (t)。
- `isArrayOfNumbers(t)`：【结构证据】返回 `false` 或 `true`；调用 `JsonHelper.isArray`、`JsonHelper.isNumber`。 源码 eyes/src/engine/core/JsonHelper.js:38；参数 (t)。
- `isArrayOfBooleans(t)`：【结构证据】返回 `false` 或 `true`；调用 `JsonHelper.isArray`、`JsonHelper.isBoolean`。 源码 eyes/src/engine/core/JsonHelper.js:43；参数 (t)。
- `isArrayOfV(t, e)`：【结构证据】返回 `false` 或 `true`；调用 `JsonHelper.isArray`、`e`。 源码 eyes/src/engine/core/JsonHelper.js:48；参数 (t, e)。
- `hasPropOfType(t, e, i)`：【结构证据】返回 `void 0!==s&&i(s)`；调用 `i`。 源码 eyes/src/engine/core/JsonHelper.js:53；参数 (t, e, i)。
- `hasOptionalPropOfType(t, e, i)`：【结构证据】返回 `void 0===s||i(s)`；调用 `i`。 源码 eyes/src/engine/core/JsonHelper.js:57；参数 (t, e, i)。

### `eyes/src/engine/core/KioskMode.js`

展台模式的界面及自动交互配置。

- 证据：`import ../../framework/eyes/index.js`。
- 证据：`import ../pioneer/index.js`。
- 证据：`KioskMode extends Eyes.KioskBase @4`。

#### KioskMode

展台模式的界面及自动交互配置。 继承：`Eyes.KioskBase`。源码 [eyes/src/engine/core/KioskMode.js:4](../../eyes/src/engine/core/KioskMode.js#L4)。

- `init()`：【结构证据】写入 `_router`、`camera`；调用 `document.addEventListener`、`super.init`、`this.app.getManager`、`this.onWindowInteract`。 源码 eyes/src/engine/core/KioskMode.js:5；参数 ()。
- `handleMaxInactivityTime()`：【结构证据】调用 `Math.ceil`、`Pioneer.TimeUtils.now`、`super.handleMaxInactivityTime`、`this.startAutoplay`。 源码 eyes/src/engine/core/KioskMode.js:15；参数 ()。
- `onWindowInteract()`：【结构证据】调用 `super.onWindowInteract`、`this._app.getManager`、`this._app.getManager("autoplay").stopAutoplay`。 源码 eyes/src/engine/core/KioskMode.js:19；参数 ()。
- `startAutoplay()`：【结构证据】调用 `console.warn`、`layerManager.getLayer`、`layerManager.toggleLayer`、`super.startAutoplay`、`this._app.getManager`、`this._app.getManager("autoplay").startAutoplay`。 源码 eyes/src/engine/core/KioskMode.js:23；参数 ()。
- `setupSpinController()`：【结构证据】调用 `i.setAxis`、`i.setRate`、`i.setRotatingPosition`、`i.setUsingRealTime`、`new Pioneer.Vector3`、`t.getPosition`。 源码 eyes/src/engine/core/KioskMode.js:34；参数 ()。

### `eyes/src/engine/core/LabelQuadtree.js`

为空间标签布局维护四叉树并查询重叠区域。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Quadtree.js`。
- 证据：`LabelQuadtree @4`。

#### LabelQuadtree

为空间标签布局维护四叉树并查询重叠区域。 继承：`无显式继承`。源码 [eyes/src/engine/core/LabelQuadtree.js:4](../../eyes/src/engine/core/LabelQuadtree.js#L4)。

- `constructor(viewport)`：【结构证据】写入 `_divBoundsAdjustmentFunction`、`_doOcclusions`、`_intersections`、`_isLessWeights`、`_isLessWeightsAndZ`、`_labelInfos`、`_labelNames`、`_labelNamesIndex`；调用 `new Quadtree.Quadtree`、`this._isLessWeights.bind`、`this._isLessWeightsAndZ.bind`。 源码 eyes/src/engine/core/LabelQuadtree.js:5；参数 (viewport)。
- `destroy()`：【结构证据】写入 `_labelInfos`、`_labelNames`；调用 `this._setLabelOcclusion`。 源码 eyes/src/engine/core/LabelQuadtree.js:17；参数 ()。
- `getDoOcclusions()`：【结构证据】返回 `this._doOcclusions`。 源码 eyes/src/engine/core/LabelQuadtree.js:25；参数 ()。
- `setDoOcclusions(doOcclusions)`：【结构证据】写入 `_doOcclusions`；调用 `this._setLabelOcclusion`。 源码 eyes/src/engine/core/LabelQuadtree.js:28；参数 (doOcclusions)。
- `addEntity(t, e)`：【结构证据】写入 `_intersections[`${i}-div`]`、`_intersections[i]`、`_labelInfos[i]`；返回 `void`；调用 `Pioneer.Sort.sortObject`、`new Error`、`new Pioneer.FastSet`、`t.getComponent`、`t.getName`、`this._labelNames.push`；含显式错误分支。 源码 eyes/src/engine/core/LabelQuadtree.js:34；参数 (t, e)。
- `removeEntity(t)`：【结构证据】调用 `this._labelNames.findIndex`、`this._labelNames.splice`、`this._quadtree.removeBounds`。 源码 eyes/src/engine/core/LabelQuadtree.js:50；参数 (t)。
- `getBounds(t, e)`：【结构证据】调用 `this._quadtree.getBounds`。 源码 eyes/src/engine/core/LabelQuadtree.js:53；参数 (t, e)。
- `setBounds(t, e)`：【结构证据】写入 `_intersections[t]`；调用 `new Error`、`new Pioneer.FastSet`、`t.endsWith`、`this._labelNames.includes`、`this._quadtree.setBounds`；含显式错误分支。 源码 eyes/src/engine/core/LabelQuadtree.js:56；参数 (t, e)。
- `removeRect(t)`：【结构证据】调用 `new Error`、`this._quadtree.removeBounds`；含显式错误分支。 源码 eyes/src/engine/core/LabelQuadtree.js:62；参数 (t)。
- `setWeight(t, e)`：【结构证据】调用 `Pioneer.Sort.sortObject`、`new Error`；含显式错误分支。 源码 eyes/src/engine/core/LabelQuadtree.js:67；参数 (t, e)。
- `getIntersections(t, e)`：【结构证据】调用 `this._quadtree.getIntersections`。 源码 eyes/src/engine/core/LabelQuadtree.js:73；参数 (t, e)。
- `setDivBoundsAdjustFunction(divBoundsAdjustmentFunction)`：【结构证据】写入 `_divBoundsAdjustmentFunction`。 源码 eyes/src/engine/core/LabelQuadtree.js:76；参数 (divBoundsAdjustmentFunction)。
- `update()`：【结构证据】写入 `_labelNamesIndex`；返回 `void`；调用 `Math.min`、`Pioneer.Rect.pool.get`、`Pioneer.Rect.pool.release`、`c.origin.copy`、`c.size.set`、`e.endsWith`。 源码 eyes/src/engine/core/LabelQuadtree.js:79；参数 ()。
- `_isLabelOccludedInDiv(t)`：【结构证据】返回 `t.getDiv().classList.contains(t.getHiddenClass())`；调用 `t.getDiv`、`t.getDiv().classList.contains`、`t.getHiddenClass`。 源码 eyes/src/engine/core/LabelQuadtree.js:129；参数 (t)。
- `_isLabelOccluded(t)`：【结构证据】返回 `t.getDiv().classList.contains(`${t.getHiddenClass()}ByLabelQuadtree`)||t.getDiv().classList.contains(t.getHiddenClass())`；调用 `t.getDiv`、`t.getDiv().classList.contains`、`t.getHiddenClass`。 源码 eyes/src/engine/core/LabelQuadtree.js:132；参数 (t)。
- `_setLabelOcclusion(t, e)`：【结构证据】调用 `t.getDiv`、`t.getDiv().classList.toggle`、`t.getHiddenClass`。 源码 eyes/src/engine/core/LabelQuadtree.js:135；参数 (t, e)。
- `_isLessWeights(t, e)`：【结构证据】返回 `i.weight<s.weight`。 源码 eyes/src/engine/core/LabelQuadtree.js:138；参数 (t, e)。
- `_isLessWeightsAndZ(t, e)`：【结构证据】返回 `t.weight<e.weight` 或 `t.z>e.z`；调用 `e.divComponent.getEntity`、`e.divComponent.getEntity().getName`、`i.localeCompare`、`t.divComponent.getEntity`、`t.divComponent.getEntity().getName`。 源码 eyes/src/engine/core/LabelQuadtree.js:143；参数 (t, e)。

### `eyes/src/engine/core/LatLonAlt.js`

纬度、经度、高度值对象及其池化存储。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`LatLonAlt @3`。

#### LatLonAlt

纬度、经度、高度值对象及其池化存储。 继承：`无显式继承`。源码 [eyes/src/engine/core/LatLonAlt.js:3](../../eyes/src/engine/core/LatLonAlt.js#L3)。

- `constructor(lat=0, lon=0, alt=0)`：【结构证据】写入 `_alt`、`_lat`、`_lon`。 源码 eyes/src/engine/core/LatLonAlt.js:5；参数 (lat=0, lon=0, alt=0)。
- `get lat()`：【结构证据】读取访问器，返回 `this._lat`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/LatLonAlt.js:29；参数 ()。
- `set lat(lat)`：【结构证据】写入访问器，接收参数 (lat)；实际写入 `_lat`。源码 eyes/src/engine/core/LatLonAlt.js:36；参数 (lat)。
- `get lon()`：【结构证据】读取访问器，返回 `this._lon`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/LatLonAlt.js:43；参数 ()。
- `set lon(lon)`：【结构证据】写入访问器，接收参数 (lon)；实际写入 `_lon`。源码 eyes/src/engine/core/LatLonAlt.js:50；参数 (lon)。
- `get alt()`：【结构证据】读取访问器，返回 `this._alt`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/LatLonAlt.js:57；参数 ()。
- `set alt(alt)`：【结构证据】写入访问器，接收参数 (alt)；实际写入 `_alt`。源码 eyes/src/engine/core/LatLonAlt.js:64；参数 (alt)。
- `method toString(t=false)`：【结构证据】本访问器没有 AST 可见的 this 字段直接赋值；调用 `PioneerPublicApi.MathUtils.radToDeg`。源码 eyes/src/engine/core/LatLonAlt.js:71；参数 (t=false)。
- `copy(t)`：【结构证据】写入 `_alt`、`_lat`、`_lon`。 源码 eyes/src/engine/core/LatLonAlt.js:31；参数 (t)。
- `set(lat, lon, alt)`：【结构证据】写入 `_alt`、`_lat`、`_lon`。 源码 eyes/src/engine/core/LatLonAlt.js:36；参数 (lat, lon, alt)。

### `eyes/src/engine/core/LineMesh.js`

构建宽线所需的顶点、索引和相邻点属性。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`LineMesh @3`。

#### LineMesh

构建宽线所需的顶点、索引和相邻点属性。 继承：`无显式继承`。源码 [eyes/src/engine/core/LineMesh.js:3](../../eyes/src/engine/core/LineMesh.js#L3)。

- `constructor(component)`：【结构证据】写入 `_component`、`_dashGapLength`、`_dashLength`、`_glowWidth`、`_orientation`、`_position`、`_scale`、`_threeJsMaterial`；调用 `component.getEntity`、`component.getEntity().getScene`、`component.getEntity().getScene().getEngine`、`component.getEntity().getScene().getEngine().getMaterialManager`、`component.getEntity().getScene().getEngine().getMaterialManager().getPreloaded`、`component.getThreeJsMaterials`。 源码 eyes/src/engine/core/LineMesh.js:4；参数 (component)。
- `setPositions(t)`：【结构证据】调用 `PioneerPublicApi.MathUtils.wrap`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.copy`、`h.equals`、`i.copy`；含显式错误分支。 源码 eyes/src/engine/core/LineMesh.js:19；参数 (t)。
- `setColors(t)`：【结构证据】调用 `new Error`、`this._adjustVerticesInGeometries`、`this._threeJsObjects[e].geometry.getAttribute`；含显式错误分支。 源码 eyes/src/engine/core/LineMesh.js:64；参数 (t)。
- `setWidths(t)`：【结构证据】调用 `new Error`、`this._adjustVerticesInGeometries`、`this._threeJsObjects[e].geometry.getAttribute`；含显式错误分支。 源码 eyes/src/engine/core/LineMesh.js:84；参数 (t)。
- `setDashLength(dashLength, dashGapLength)`：【结构证据】写入 `_dashGapLength`、`_dashLength`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`。 源码 eyes/src/engine/core/LineMesh.js:108；参数 (dashLength, dashGapLength)。
- `setGlowWidth(glowWidth)`：【结构证据】写入 `_glowWidth`；调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`。 源码 eyes/src/engine/core/LineMesh.js:114；参数 (glowWidth)。
- `setScale(scale)`：【结构证据】写入 `_scale`；调用 `PioneerPublicApi.ThreeJsHelper.setScale`。 源码 eyes/src/engine/core/LineMesh.js:118；参数 (scale)。
- `prepareForRender(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setUniformNumber`、`PioneerPublicApi.ThreeJsHelper.setUniformVector2`、`PioneerPublicApi.Vector2.pool.get`、`PioneerPublicApi.Vector2.pool.release`、`e.copy`、`e.set`。 源码 eyes/src/engine/core/LineMesh.js:122；参数 (t)。
- `_adjustVerticesInGeometries(t)`：【结构证据】调用 `Math.ceil`、`Math.min`、`PioneerPublicApi.ThreeJsHelper.createMeshObject`、`PioneerPublicApi.ThreeJsHelper.destroyObject`、`PioneerPublicApi.ThreeJsHelper.setOrientation`、`PioneerPublicApi.ThreeJsHelper.setPosition`。 源码 eyes/src/engine/core/LineMesh.js:133；参数 (t)。
- `_setupThreeJsGeometry(t, e)`：【结构证据】调用 `new Float32Array`、`new PioneerPublicApi.THREE.BufferAttribute`、`new PioneerPublicApi.THREE.InterleavedBuffer`、`new PioneerPublicApi.THREE.InterleavedBufferAttribute`、`new Uint16Array`、`t.setAttribute`。 源码 eyes/src/engine/core/LineMesh.js:163；参数 (t, e)。

### `eyes/src/engine/core/LineShader.js`

声明 LineShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。

- 证据：`import ./ShaderChunkLogDepth.js`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/LoadIconEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。

- 证据：`import ../../ui/components/LoadIcon.js`。
- 证据：`import ../../styles/extracted/Unidentified231.js`。
- 证据：`顶层副作用 defaultExport=LoadIcon.default`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Mapping.js`

球面/立方体等纹理映射模式的数据与转换接口。

- 证据：`import ../pioneer/index.js`。
- 证据：`Mapping @3`。

#### Mapping

球面/立方体等纹理映射模式的数据与转换接口。 继承：`无显式继承`。源码 [eyes/src/engine/core/Mapping.js:3](../../eyes/src/engine/core/Mapping.js#L3)。

- `getOptions()`：【结构证据】返回 `mappingOptions`。 源码 eyes/src/engine/core/Mapping.js:4；参数 ()。
- `set(t, e, i, o)`：【结构证据】调用 `Mapping.setEnabled`、`Pioneer.ObjectUtils.keys`、`Promise.allSettled`、`new Error`、`r.push`；含显式错误分支。 源码 eyes/src/engine/core/Mapping.js:7；参数 (t, e, i, o)。
- `setEnabled(t, e, i, s, n)`：【结构证据】调用 `Mapping.setBasic`、`Mapping.setCMTS`、`i.startsWith`、`new Error`；含显式错误分支。 源码 eyes/src/engine/core/Mapping.js:14；参数 (t, e, i, s, n)。
- `setBasic(t, e, i)`：【结构证据】调用 `n.getComponent`、`new Error`、`o.getLoadedPromise`、`o.setEnabled`、`o.setRenderingEnabled`、`t.getEntity`；含显式错误分支。 源码 eyes/src/engine/core/Mapping.js:20；参数 (t, e, i)。
- `setCMTS(t, e, i, n)`：【结构证据】调用 `Pioneer.Devices.getPlatform`、`new Error`、`o.addComponent`、`o.getComponent`、`o.removeComponent`、`r.getLoadedPromise`；含显式错误分支。 源码 eyes/src/engine/core/Mapping.js:28；参数 (t, e, i, n)。

### `eyes/src/engine/core/MaterialUtils.js`

为组件创建材质并更新相机、光源、阴影及大气通用 uniforms。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`MaterialUtils @3`。

#### MaterialUtils

为组件创建材质并更新相机、光源、阴影及大气通用 uniforms。 继承：`无显式继承`。源码 [eyes/src/engine/core/MaterialUtils.js:3](../../eyes/src/engine/core/MaterialUtils.js#L3)。

- `setLightSourceUniforms(t, e, i)`：【结构证据】调用 `Math.min`、`PioneerPublicApi.Color.pool.get`、`PioneerPublicApi.Color.pool.release`、`e.getComponent`、`e.getScene`、`i[r].set`。 源码 eyes/src/engine/core/MaterialUtils.js:4；参数 (t, e, i)。
- `setUniforms(t, e, i, n, o, r)`：【结构证据】调用 `MaterialUtils.setLightSourceUniforms`、`PioneerPublicApi.MathUtils.wrap`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`c.set`、`d.ambientLightColor.value.setRGB`。 源码 eyes/src/engine/core/MaterialUtils.js:35；参数 (t, e, i, n, o, r)。

### `eyes/src/engine/core/MaterialUtilsPhong.js`

构建 Phong 光照路径的材质/着色器参数。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`MaterialUtilsPhong @3`。

#### MaterialUtilsPhong

构建 Phong 光照路径的材质/着色器参数。 继承：`无显式继承`。源码 [eyes/src/engine/core/MaterialUtilsPhong.js:3](../../eyes/src/engine/core/MaterialUtilsPhong.js#L3)。

- `get()`：【结构证据】返回 `t`；调用 `PioneerPublicApi.ThreeJsHelper.cloneMaterial`、`new PioneerPublicApi.THREE.Color`、`new PioneerPublicApi.THREE.ShaderMaterial`、`new PioneerPublicApi.THREE.Uniform`、`new PioneerPublicApi.THREE.Vector2`、`new PioneerPublicApi.THREE.Vector3`。 源码 eyes/src/engine/core/MaterialUtilsPhong.js:4；参数 ()。

### `eyes/src/engine/core/MaterialUtilsStandard.js`

构建 PBR/标准光照路径的材质/着色器参数。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`MaterialUtilsStandard @3`。

#### MaterialUtilsStandard

构建 PBR/标准光照路径的材质/着色器参数。 继承：`无显式继承`。源码 [eyes/src/engine/core/MaterialUtilsStandard.js:3](../../eyes/src/engine/core/MaterialUtilsStandard.js#L3)。

- `get()`：【结构证据】返回 `t`；调用 `PioneerPublicApi.ThreeJsHelper.cloneMaterial`、`new PioneerPublicApi.THREE.Color`、`new PioneerPublicApi.THREE.Matrix3`、`new PioneerPublicApi.THREE.ShaderMaterial`、`new PioneerPublicApi.THREE.Uniform`、`new PioneerPublicApi.THREE.Vector2`。 源码 eyes/src/engine/core/MaterialUtilsStandard.js:4；参数 ()。

### `eyes/src/engine/core/MathUtils.js`

提供角度、插值、限制、周期包裹及数值辅助函数。

- 证据：`MathUtils @2`。

#### MathUtils

提供角度、插值、限制、周期包裹及数值辅助函数。 继承：`无显式继承`。源码 [eyes/src/engine/core/MathUtils.js:2](../../eyes/src/engine/core/MathUtils.js#L2)。

- `radToDeg(t)`：【结构证据】返回 `57.29577951308232*t`。 源码 eyes/src/engine/core/MathUtils.js:6；参数 (t)。
- `degToRad(t)`：【结构证据】返回 `.017453292519943295*t`。 源码 eyes/src/engine/core/MathUtils.js:9；参数 (t)。
- `angle(t, e)`：【结构证据】返回 `(e=this.wrap(e,0,this.TwoPi))-t>this.Pi?t-e+this.TwoPi:t-e>this.Pi?e-t+this.TwoPi:Math.abs(e-t)`；调用 `Math.abs`、`this.wrap`。 源码 eyes/src/engine/core/MathUtils.js:12；参数 (t, e)。
- `clamp(t, e, i)`：【结构证据】返回 `Math.min(Math.max(e,t),i)`；调用 `Math.max`、`Math.min`。 源码 eyes/src/engine/core/MathUtils.js:16；参数 (t, e, i)。
- `clamp01(t)`：【结构证据】返回 `Math.min(Math.max(0,t),1)`；调用 `Math.max`、`Math.min`。 源码 eyes/src/engine/core/MathUtils.js:19；参数 (t)。
- `wrap(t, e, i)`：【结构证据】返回 `s`。 源码 eyes/src/engine/core/MathUtils.js:22；参数 (t, e, i)。
- `wrapAngle(t)`：【结构证据】返回 `e`。 源码 eyes/src/engine/core/MathUtils.js:27；参数 (t)。
- `lerp(t, e, i)`：【结构证据】返回 `(1-i)*t+i*e`。 源码 eyes/src/engine/core/MathUtils.js:32；参数 (t, e, i)。
- `lerpAngle(t, e, i)`：【结构证据】返回 `this.wrap(this.lerp(t,e,i),-this.Pi,+this.Pi)`；调用 `this.lerp`、`this.wrap`。 源码 eyes/src/engine/core/MathUtils.js:35；参数 (t, e, i)。
- `ceilPow2(t)`：【结构证据】返回 `2**Math.ceil(Math.log(t)/Math.log(2))`；调用 `Math.ceil`、`Math.log`。 源码 eyes/src/engine/core/MathUtils.js:41；参数 (t)。

### `eyes/src/engine/core/MomentLocalesPrimary.cjs`

Moment 主要语言区域的第三方本地化定义和注册副作用。

- 证据：`import ../../vendor/moment/primary/locale/af.cjs`。
- 证据：`import ../../vendor/moment/primary/locale/ar.cjs`。
- 证据：`import ../../vendor/moment/primary/locale/ar-dz.cjs`。
- 证据：`import ../../vendor/moment/primary/locale/ar-kw.cjs`。
- 证据：`顶层副作用 n.keys=function(){return Object.keys(s);}`。
- 证据：`顶层副作用 n.resolve=o`。
- 证据：`顶层副作用 module.exports=n`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/MomentLocalesSecondary.cjs`

Moment 补充语言区域的第三方本地化定义和注册副作用。

- 证据：`import ../../vendor/moment/secondary/locale/af.cjs`。
- 证据：`import ../../vendor/moment/secondary/locale/ar.cjs`。
- 证据：`import ../../vendor/moment/secondary/locale/ar-dz.cjs`。
- 证据：`import ../../vendor/moment/secondary/locale/ar-kw.cjs`。
- 证据：`顶层副作用 n.keys=function(){return Object.keys(s);}`。
- 证据：`顶层副作用 n.resolve=o`。
- 证据：`顶层副作用 module.exports=n`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/ObjectUtils.js`

以统一接口枚举/处理对象键值。

- 证据：`ObjectUtils @2`。

#### ObjectUtils

以统一接口枚举/处理对象键值。 继承：`无显式继承`。源码 [eyes/src/engine/core/ObjectUtils.js:2](../../eyes/src/engine/core/ObjectUtils.js#L2)。

- `entries(t)`：【结构证据】返回 `Object.entries(t)`；调用 `Object.entries`。 源码 eyes/src/engine/core/ObjectUtils.js:3；参数 (t)。
- `keys(t)`：【结构证据】返回 `Object.keys(t)`；调用 `Object.keys`。 源码 eyes/src/engine/core/ObjectUtils.js:6；参数 (t)。
- `values(t)`：【结构证据】返回 `Object.values(t)`；调用 `Object.values`。 源码 eyes/src/engine/core/ObjectUtils.js:9；参数 (t)。

### `eyes/src/engine/core/OptionsBlock.js`

建立内容面板的选项块并绑定用户操作。

- 证据：`import ../../framework/eyes/index.js`。
- 证据：`import ../../app/public-api.js`。
- 证据：`import ../../styles/extracted/OptionsBlockStyles.js`。
- 证据：`OptionsBlock extends SolarSystemPublicApi.BaseContentBlock @5`。

#### OptionsBlock

建立内容面板的选项块并绑定用户操作。 继承：`SolarSystemPublicApi.BaseContentBlock`。源码 [eyes/src/engine/core/OptionsBlock.js:5](../../eyes/src/engine/core/OptionsBlock.js#L5)。

- `constructor(t, e={})`：【结构证据】写入 `_previousChildEntity`、`_previousEntity`、`_state`；调用 `Object.assign`、`super`。 源码 eyes/src/engine/core/OptionsBlock.js:6；参数 (t, e={})。
- `onRouteChange(t, e={})`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/OptionsBlock.js:26；参数 (t, e={})。
- `_createCheckbox(t, e)`：【结构证据】返回 `checkbox`；调用 `checkbox.init`、`new Eyes.Checkbox`、`t.text`。 源码 eyes/src/engine/core/OptionsBlock.js:27；参数 (t, e)。
- `_createMultistateCheckbox(t, e, i)`：【结构证据】返回 `checkboxMultistate`；调用 `checkboxMultistate.init`、`checkboxMultistate.setNumStates`、`new Eyes.CheckboxMultistate`、`t.text`。 源码 eyes/src/engine/core/OptionsBlock.js:39；参数 (t, e, i)。
- `_createRadioButton(t)`：【结构证据】返回 `s`；调用 `document.createElement`、`o.setAttribute`、`s.appendChild`。 源码 eyes/src/engine/core/OptionsBlock.js:52；参数 (t)。
- `_createToggle(t, e)`：【结构证据】返回 `{container:i,input:o}`；调用 `document.createElement`、`i.appendChild`、`n.classList.add`、`o.classList.add`、`r.classList.add`、`s.appendChild`。 源码 eyes/src/engine/core/OptionsBlock.js:76；参数 (t, e)。
- `_addDefaultOptions(t, e=null, i={})`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/OptionsBlock.js:100；参数 (t, e=null, i={})。
- `reset()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/OptionsBlock.js:101；参数 ()。
- `__disable()`：【结构证据】写入 `_previousChildEntity`、`_previousEntity`；调用 `super.__disable`、`this.setState`。 源码 eyes/src/engine/core/OptionsBlock.js:102；参数 ()。

### `eyes/src/engine/core/OrbitalElements.js`

椭圆/双曲轨道元素及开普勒传播，把时间转换为三维位置和速度。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`OrbitalElements @3`。

#### OrbitalElements

椭圆/双曲轨道元素及开普勒传播，把时间转换为三维位置和速度。 继承：`无显式继承`。源码 [eyes/src/engine/core/OrbitalElements.js:3](../../eyes/src/engine/core/OrbitalElements.js#L3)。

- `constructor(t)`：【结构证据】写入 `eccentricity`、`epoch`、`meanAngularMotion`、`meanAnomalyAtEpoch`、`orientation`、`semiMajorAxis`；调用 `new PioneerPublicApi.Quaternion`、`this.orientation.copy`、`this.setFromPositionAndVelocity`、`this.setOrientationFromElements`。 源码 eyes/src/engine/core/OrbitalElements.js:11；参数 (t)。
- `copy(t)`：【结构证据】写入 `eccentricity`、`epoch`、`meanAngularMotion`、`meanAnomalyAtEpoch`、`semiMajorAxis`；调用 `this.orientation.copy`。 源码 eyes/src/engine/core/OrbitalElements.js:14；参数 (t)。
- `projectFromMeanAnomaly(t, e, i)`：【结构证据】调用 `Math.cos`、`Math.cosh`、`Math.sin`、`Math.sinh`、`Math.sqrt`、`e.rotate`。 源码 eyes/src/engine/core/OrbitalElements.js:22；参数 (t, e, i)。
- `project(t, e, i)`：【结构证据】调用 `PioneerPublicApi.MathUtils.wrap`、`this.projectFromMeanAnomaly`。 源码 eyes/src/engine/core/OrbitalElements.js:39；参数 (t, e, i)。
- `getTrueAnomalyFromPosition(t)`：【结构证据】返回 `i`；调用 `Math.atan2`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`e.rotateInverse`。 源码 eyes/src/engine/core/OrbitalElements.js:44；参数 (t)。
- `getMeanAnomalyFromTrueAnomaly(t)`：【结构证据】返回 `e`；调用 `Math.atan`、`Math.atanh`、`Math.sin`、`Math.sinh`、`Math.sqrt`、`Math.tan`。 源码 eyes/src/engine/core/OrbitalElements.js:51；参数 (t)。
- `getEccentricAnomalyFromMeanAnomaly(t)`：【结构证据】返回 `e`；调用 `Math.abs`、`Math.cos`、`Math.cosh`、`Math.log`、`Math.sign`、`Math.sin`。 源码 eyes/src/engine/core/OrbitalElements.js:62；参数 (t)。
- `getMeanAnomalyFromEccentricAnomaly(t)`：【结构证据】返回 `PioneerPublicApi.MathUtils.wrap(e,-Math.PI,+Math.PI)` 或 `this.eccentricity*Math.sinh(t)-t`；调用 `Math.sin`、`Math.sinh`、`PioneerPublicApi.MathUtils.wrap`。 源码 eyes/src/engine/core/OrbitalElements.js:81；参数 (t)。
- `getTrueAnomalyFromEccentricAnomaly(t)`：【结构证据】返回 `this.eccentricity<1?2*Math.atan(Math.sqrt((1+this.eccentricity)/(1-this.eccentricity))*Math.tan(t/2)):2*Math.atan(Math.sqrt((1+this.eccentricity)/(thi`；调用 `Math.atan`、`Math.sqrt`、`Math.tan`、`Math.tanh`。 源码 eyes/src/engine/core/OrbitalElements.js:88；参数 (t)。
- `getEccentricAnomalyFromTrueAnomaly(t)`：【结构证据】返回 `PioneerPublicApi.MathUtils.wrap(e,-Math.PI,+Math.PI)` 或 `2*Math.atanh(Math.sqrt((this.eccentricity-1)/(this.eccentricity+1))*Math.tan(t/2))`；调用 `Math.atan2`、`Math.atanh`、`Math.sqrt`、`Math.tan`、`PioneerPublicApi.MathUtils.wrap`。 源码 eyes/src/engine/core/OrbitalElements.js:91；参数 (t)。
- `getInclination()`：【结构证据】返回 `e`；调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`t.angle`、`this.orientation.getAxis`。 源码 eyes/src/engine/core/OrbitalElements.js:98；参数 ()。
- `getLongitudeOfAscendingNode()`：【结构证据】返回 `PioneerPublicApi.MathUtils.wrap(e,0,PioneerPublicApi.MathUtils.TwoPi)`；调用 `Math.atan2`、`PioneerPublicApi.MathUtils.wrap`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`this.orientation.getAxis`。 源码 eyes/src/engine/core/OrbitalElements.js:105；参数 ()。
- `getArgumentOfPeriapsis()`：【结构证据】返回 `PioneerPublicApi.MathUtils.wrap(i,0,PioneerPublicApi.MathUtils.TwoPi)`；调用 `PioneerPublicApi.MathUtils.wrap`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`t.angle`、`t.set`、`this.orientation.getAxis`。 源码 eyes/src/engine/core/OrbitalElements.js:112；参数 ()。
- `getPeriod()`：【结构证据】返回 `PioneerPublicApi.MathUtils.TwoPi/this.meanAngularMotion`。 源码 eyes/src/engine/core/OrbitalElements.js:123；参数 ()。
- `getPeriapsis()`：【结构证据】返回 `this.semiMajorAxis*(1-this.eccentricity)`。 源码 eyes/src/engine/core/OrbitalElements.js:126；参数 ()。
- `getApoapsis()`：【结构证据】返回 `this.semiMajorAxis*(1+this.eccentricity)`。 源码 eyes/src/engine/core/OrbitalElements.js:129；参数 ()。
- `setOrientationFromElements(t, e, i)`：【结构证据】调用 `Math.cos`、`Math.sin`、`PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`。 源码 eyes/src/engine/core/OrbitalElements.js:132；参数 (t, e, i)。
- `setFromPositionAndVelocity(t, e, epoch, n)`：【结构证据】写入 `eccentricity`、`epoch`、`meanAngularMotion`、`meanAnomalyAtEpoch`、`semiMajorAxis`；调用 `Math.acos`、`Math.sqrt`、`PioneerPublicApi.MathUtils.clamp`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`a.cross`。 源码 eyes/src/engine/core/OrbitalElements.js:145；参数 (t, e, epoch, n)。

### `eyes/src/engine/core/OverlayEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。

- 证据：`import ../../ui/components/Overlay.js`。
- 证据：`import ../../styles/extracted/Unidentified235.js`。
- 证据：`顶层副作用 defaultExport=Overlay.default`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Parenting.js`

处理实体父级时间表与父参考系切换。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`Parenting @4`。

#### Parenting

处理实体父级时间表与父参考系切换。 继承：`无显式继承`。源码 [eyes/src/engine/core/Parenting.js:4](../../eyes/src/engine/core/Parenting.js#L4)。

- `getParentOfEntity(t, e)`：【结构证据】返回 `r<o.length&&e===o[r][0]?o[r][1]:r>0?o[r-1][1]:""`；调用 `Entity.Entity.getEntityOptions`、`Pioneer.Sort.getIndexObject`、`new Error`；含显式错误分支。 源码 eyes/src/engine/core/Parenting.js:5；参数 (t, e)。
- `getAllAncestorsOfEntity(t)`：【结构证据】返回 `set`；调用 `new Set`、`this._getAllAncestorsOfEntityRecursed`。 源码 eyes/src/engine/core/Parenting.js:12；参数 (t)。
- `_getAllAncestorsOfEntityRecursed(t, e)`：【结构证据】返回 `void`；调用 `Entity.Entity.getEntityOptions`、`e.add`、`e.has`、`this._getAllAncestorsOfEntityRecursed`。 源码 eyes/src/engine/core/Parenting.js:17；参数 (t, e)。
- `_isStartTimeLessThanTime(t, e)`：【结构证据】返回 `t[0]<e`。 源码 eyes/src/engine/core/Parenting.js:26；参数 (t, e)。

### `eyes/src/engine/core/Placemarks.js`

在球面经纬位置创建具有标签的地表实体。

- 证据：`import ../pioneer/index.js`。
- 证据：`Placemarks @3`。

#### Placemarks

在球面经纬位置创建具有标签的地表实体。 继承：`无显式继承`。源码 [eyes/src/engine/core/Placemarks.js:3](../../eyes/src/engine/core/Placemarks.js#L3)。

- `addPlacemark(t, e, i, n, o, r)`：【结构证据】返回 `a`；调用 `a.addComponent`、`a.addComponent(Pioneer.DivComponent).getDiv`、`a.addController`、`a.setCanOcclude`、`a.setExtentsRadius`、`a.setParent`。 源码 eyes/src/engine/core/Placemarks.js:4；参数 (t, e, i, n, o, r)。
- `updateLLA(t, e, i, n)`：【结构证据】调用 `Pioneer.LatLonAlt.pool.get`、`Pioneer.LatLonAlt.pool.release`、`Pioneer.MathUtils.degToRad`、`Pioneer.Quaternion.pool.get`、`Pioneer.Quaternion.pool.release`、`Pioneer.Vector3.pool.get`；含显式错误分支。 源码 eyes/src/engine/core/Placemarks.js:18；参数 (t, e, i, n)。

### `eyes/src/engine/core/PlumesShader.js`

声明 PlumesShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。

- 证据：`import ./ShaderChunkLogDepth.js`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Pool.js`

复用临时对象以减少帧循环分配；借出和归还须配对。

- 证据：`Pool @2`。

#### Pool

复用临时对象以减少帧循环分配；借出和归还须配对。 继承：`无显式继承`。源码 [eyes/src/engine/core/Pool.js:2](../../eyes/src/engine/core/Pool.js#L2)。

- `constructor(constructorFunction)`：【结构证据】写入 `_constructorFunction`。 源码 eyes/src/engine/core/Pool.js:3；参数 (constructorFunction)。
- `setConstructorFunction(constructorFunction)`：【结构证据】写入 `_constructorFunction`。 源码 eyes/src/engine/core/Pool.js:6；参数 (constructorFunction)。
- `setDestructorFunction(destructorFunction)`：【结构证据】写入 `_destructorFunction`。 源码 eyes/src/engine/core/Pool.js:9；参数 (destructorFunction)。
- `get()`：【结构证据】写入 `_freeLength`、`_objects[e]._poolIndex`；返回 `t`；调用 `new this._constructorFunction`、`this._objects.push`。 源码 eyes/src/engine/core/Pool.js:12；参数 ()。
- `release(t)`：【结构证据】写入 `_freeLength`、`_free[this._freeLength]`；调用 `new Error`、`this._free.push`；含显式错误分支。 源码 eyes/src/engine/core/Pool.js:25；参数 (t)。
- `clean(t)`：【结构证据】写入 `_free`、`_freeLength`、`_free[i]`、`_objects[t]._poolIndex`；调用 `this._objects.splice`。 源码 eyes/src/engine/core/Pool.js:32；参数 (t)。
- `getAsArray()`：【结构证据】返回 `this._objects`。 源码 eyes/src/engine/core/Pool.js:45；参数 ()。
- `isUsed(t)`：【结构证据】返回 `t._poolUsed`。 源码 eyes/src/engine/core/Pool.js:48；参数 (t)。
- `areAnyUsed()`：【结构证据】返回 `this._freeLength<this._objects.length`。 源码 eyes/src/engine/core/Pool.js:51；参数 ()。

### `eyes/src/engine/core/Quadtree.js`

二维矩形空间分区与交叠查询。

- 证据：`import ../pioneer/index.js`。
- 证据：`Quadtree @3`。

#### Quadtree

二维矩形空间分区与交叠查询。 继承：`无显式继承`。源码 [eyes/src/engine/core/Quadtree.js:3](../../eyes/src/engine/core/Quadtree.js#L3)。

- `constructor(viewport, maxValuesPerNode=8)`：【结构证据】写入 `_maxValuesPerNode`、`_nameArray`、`_root`、`_valueMap`、`_viewport`；调用 `new Pioneer.Rect`、`this._viewport.getBounds`。 源码 eyes/src/engine/core/Quadtree.js:4；参数 (viewport, maxValuesPerNode=8)。
- `setBounds(t, e)`：【结构证据】写入 `_root`、`_valueMap[t]`；调用 `e.bounds.surrounds`、`i.bounds.copy`、`i.node.bounds.surrounds`、`new Pioneer.FastMap`、`new Pioneer.Rect`、`this._insertValueInNode`。 源码 eyes/src/engine/core/Quadtree.js:17；参数 (t, e)。
- `removeBounds(t)`：【结构证据】调用 `this._nameArray.findIndex`、`this._nameArray.splice`、`this._removeValueFromNode`。 源码 eyes/src/engine/core/Quadtree.js:51；参数 (t)。
- `getBounds(t, e)`：【结构证据】调用 `t.copy`、`t.set`。 源码 eyes/src/engine/core/Quadtree.js:55；参数 (t, e)。
- `getIntersections(t, e)`：【结构证据】调用 `e.add`、`e.clear`、`e.delete`、`i.intersectionFlags.delete`、`i.intersectionFlags.getAt`、`i.intersectionFlags.getSize`。 源码 eyes/src/engine/core/Quadtree.js:59；参数 (t, e)。
- `_getNodeIntersections(t, e, i)`：【结构证据】调用 `s.bounds.intersects`、`t.intersectionFlags.set`、`this._getNodeIntersections`。 源码 eyes/src/engine/core/Quadtree.js:70；参数 (t, e, i)。
- `_insertValueInNode(t, e)`：【结构证据】返回 `void(t.node=e)` 或 `void this._insertValueInNode(t,s)`；调用 `e.values.push`、`new Pioneer.Rect`、`s.bounds.surrounds`、`this._insertValueInNode`。 源码 eyes/src/engine/core/Quadtree.js:77；参数 (t, e)。
- `_removeValueFromNode(t)`：【结构证据】返回 `void`；调用 `e.values.findIndex`、`e.values.push`、`e.values.splice`。 源码 eyes/src/engine/core/Quadtree.js:123；参数 (t)。

### `eyes/src/engine/core/Quaternion.js`

四元数乘法、逆、旋转轴、方向转换及球面插值；包含 Three.js 对接与对象池。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`Quaternion @3`。

#### Quaternion

四元数乘法、逆、旋转轴、方向转换及球面插值；包含 Three.js 对接与对象池。 继承：`无显式继承`。源码 [eyes/src/engine/core/Quaternion.js:3](../../eyes/src/engine/core/Quaternion.js#L3)。

- `constructor(t=1, e=0, i=0, s=0)`：【结构证据】写入 `_w`、`_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Quaternion.js:8；参数 (t=1, e=0, i=0, s=0)。
- `get w()`：【结构证据】读取访问器，返回 `this._w`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Quaternion.js:33；参数 ()。
- `set w(t)`：【结构证据】写入访问器，接收参数 (t)；实际写入 `_w`。源码 eyes/src/engine/core/Quaternion.js:40；参数 (t)。
- `get x()`：【结构证据】读取访问器，返回 `this._x`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Quaternion.js:47；参数 ()。
- `set x(t)`：【结构证据】写入访问器，接收参数 (t)；实际写入 `_x`。源码 eyes/src/engine/core/Quaternion.js:54；参数 (t)。
- `get y()`：【结构证据】读取访问器，返回 `this._y`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Quaternion.js:61；参数 ()。
- `set y(t)`：【结构证据】写入访问器，接收参数 (t)；实际写入 `_y`。源码 eyes/src/engine/core/Quaternion.js:68；参数 (t)。
- `get z()`：【结构证据】读取访问器，返回 `this._z`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Quaternion.js:75；参数 ()。
- `set z(t)`：【结构证据】写入访问器，接收参数 (t)；实际写入 `_z`。源码 eyes/src/engine/core/Quaternion.js:82；参数 (t)。
- `getAngle()`：【结构证据】返回 `2*Math.acos(this._w)`；调用 `Math.acos`。 源码 eyes/src/engine/core/Quaternion.js:38；参数 ()。
- `copy(t)`：【结构证据】写入 `_w`、`_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Quaternion.js:41；参数 (t)。
- `copyFromThreeJs(t)`：【结构证据】写入 `_w`、`_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Quaternion.js:47；参数 (t)。
- `set(t, e, i, s)`：【结构证据】写入 `_w`、`_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Quaternion.js:53；参数 (t, e, i, s)。
- `setFromAxisAngle(t, e)`：【结构证据】写入 `_w`、`_x`、`_y`、`_z`；调用 `Math.cos`、`Math.sin`。 源码 eyes/src/engine/core/Quaternion.js:59；参数 (t, e)。
- `setFromAxes(t, e, i)`：【结构证据】写入 `_w`、`_x`、`_y`、`_z`；调用 `Math.sqrt`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`n.cross`、`new Error`；含显式错误分支。 源码 eyes/src/engine/core/Quaternion.js:66；参数 (t, e, i)。
- `setFromEuler(t, e, i)`：【结构证据】写入 `_w`、`_x`、`_y`、`_z`；调用 `Math.cos`、`Math.sin`。 源码 eyes/src/engine/core/Quaternion.js:110；参数 (t, e, i)。
- `setFromVectorFromTo(t, e)`：【结构证据】调用 `Math.acos`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`i.cross`、`i.normalize`、`t.dot`。 源码 eyes/src/engine/core/Quaternion.js:125；参数 (t, e)。
- `setFromAxis(t, e)`：【结构证据】调用 `PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`i.normalize`、`n.cross`、`n.isZero`、`n.normalize`。 源码 eyes/src/engine/core/Quaternion.js:136；参数 (t, e)。
- `method toString()`：【结构证据】本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Quaternion.js:236；参数 ()。
- `isNaN()`：【结构证据】返回 `this._w!=this._w||this._x!=this._x||this._y!=this._y||this._z!=this._z`。 源码 eyes/src/engine/core/Quaternion.js:150；参数 ()。
- `magnitude()`：【结构证据】返回 `Math.sqrt(this._w*this._w+this._x*this._x+this._y*this._y+this._z*this._z)`；调用 `Math.sqrt`。 源码 eyes/src/engine/core/Quaternion.js:153；参数 ()。
- `normalize(t)`：【结构证据】写入 `_w`、`_x`、`_y`、`_z`；调用 `t.magnitude`。 源码 eyes/src/engine/core/Quaternion.js:156；参数 (t)。
- `inverse(t)`：【结构证据】写入 `_w`、`_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Quaternion.js:160；参数 (t)。
- `mult(t, e)`：【结构证据】调用 `Quaternion.pool.get`、`Quaternion.pool.release`、`this.copy`。 源码 eyes/src/engine/core/Quaternion.js:166；参数 (t, e)。
- `multInverseL(t, e)`：【结构证据】调用 `Quaternion.pool.get`、`Quaternion.pool.release`、`this.copy`。 源码 eyes/src/engine/core/Quaternion.js:175；参数 (t, e)。
- `multInverseR(t, e)`：【结构证据】调用 `Quaternion.pool.get`、`Quaternion.pool.release`、`this.copy`。 源码 eyes/src/engine/core/Quaternion.js:184；参数 (t, e)。
- `scaleAngle(t, e)`：【结构证据】写入 `_w`、`_x`、`_y`、`_z`；返回 `void this.copy(t)`；调用 `Math.acos`、`Math.cos`、`Math.sin`、`this.copy`。 源码 eyes/src/engine/core/Quaternion.js:193；参数 (t, e)。
- `angle(t)`：【结构证据】返回 `2*Math.acos(this._w*t.w+this._x*t.x+this._y*t.y+this._z*t.z)`；调用 `Math.acos`。 源码 eyes/src/engine/core/Quaternion.js:203；参数 (t)。
- `slerp(t, e, i)`：【结构证据】写入 `_w`、`_x`、`_y`、`_z`；调用 `Math.acos`、`Math.sin`、`this.normalize`。 源码 eyes/src/engine/core/Quaternion.js:206；参数 (t, e, i)。
- `getAxis(t, e)`：【结构证据】调用 `t.normalize`、`t.set`。 源码 eyes/src/engine/core/Quaternion.js:227；参数 (t, e)。
- `fromAxisAngle(t, e)`：【结构证据】返回 `quaternion`；调用 `new Quaternion`、`quaternion.setFromAxisAngle`。 源码 eyes/src/engine/core/Quaternion.js:230；参数 (t, e)。
- `fromAxes(t, e, i)`：【结构证据】返回 `quaternion`；调用 `new Quaternion`、`quaternion.setFromAxes`。 源码 eyes/src/engine/core/Quaternion.js:235；参数 (t, e, i)。
- `fromEuler(t, e, i)`：【结构证据】返回 `quaternion`；调用 `new Quaternion`、`quaternion.setFromEuler`。 源码 eyes/src/engine/core/Quaternion.js:240；参数 (t, e, i)。
- `fromVectorFromTo(t, e)`：【结构证据】返回 `quaternion`；调用 `new Quaternion`、`quaternion.setFromVectorFromTo`。 源码 eyes/src/engine/core/Quaternion.js:245；参数 (t, e)。
- `fromFromAxis(t, e)`：【结构证据】返回 `quaternion`；调用 `new Quaternion`、`quaternion.setFromAxis`。 源码 eyes/src/engine/core/Quaternion.js:250；参数 (t, e)。

### `eyes/src/engine/core/RandomString.js`

生成随机字符串标识。

- 证据：`RandomString @2`。

#### RandomString

生成随机字符串标识。 继承：`无显式继承`。源码 [eyes/src/engine/core/RandomString.js:2](../../eyes/src/engine/core/RandomString.js#L2)。

- `generate(t)`：【结构证据】返回 `Array.from(uint8Array,t=>`0${(255&t).toString(16)}`.slice(-2)).join("").slice(0,t)`；调用 `(255&t).toString`、`Array.from`、`Math.ceil`、``0${(255&t).toString(16)}`.slice`、`crypto.getRandomValues`、`new Uint8Array`。 源码 eyes/src/engine/core/RandomString.js:3；参数 (t)。

### `eyes/src/engine/core/Reader.js`

以小端序 DataView 游标读取二进制数值和 UTF-8 字符串；64 位整数超过安全范围返回 NaN。

- 证据：`Reader @2`。

#### Reader

以小端序 DataView 游标读取二进制数值和 UTF-8 字符串；64 位整数超过安全范围返回 NaN。 继承：`无显式继承`。源码 [eyes/src/engine/core/Reader.js:2](../../eyes/src/engine/core/Reader.js#L2)。

- `constructor(t)`：【结构证据】写入 `_dataView`、`_offset`；调用 `new DataView`。 源码 eyes/src/engine/core/Reader.js:3；参数 (t)。
- `isAtEnd()`：【结构证据】返回 `this._offset>=this._dataView.byteLength`。 源码 eyes/src/engine/core/Reader.js:7；参数 ()。
- `readByte()`：【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getUint8`。 源码 eyes/src/engine/core/Reader.js:10；参数 ()。
- `readFloat32()`：【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getFloat32`。 源码 eyes/src/engine/core/Reader.js:15；参数 ()。
- `readFloat64()`：【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getFloat64`。 源码 eyes/src/engine/core/Reader.js:20；参数 ()。
- `readUInt8()`：【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getUint8`。 源码 eyes/src/engine/core/Reader.js:25；参数 ()。
- `readUInt16()`：【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getUint16`。 源码 eyes/src/engine/core/Reader.js:30；参数 ()。
- `readUInt32()`：【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getUint32`。 源码 eyes/src/engine/core/Reader.js:35；参数 ()。
- `readUInt64()`：小端读取 BigUint64 后转 Number；若超出安全整数范围返回 NaN，避免静默精度损失。 源码 eyes/src/engine/core/Reader.js:40；参数 ()。
- `readInt8()`：【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getInt8`。 源码 eyes/src/engine/core/Reader.js:45；参数 ()。
- `readInt16()`：【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getInt16`。 源码 eyes/src/engine/core/Reader.js:50；参数 ()。
- `readInt32()`：【结构证据】写入 `_offset`；返回 `t`；调用 `this._dataView.getInt32`。 源码 eyes/src/engine/core/Reader.js:55；参数 ()。
- `readInt64()`：小端读取 BigInt64 后转 Number；若超出安全整数范围返回 NaN。 源码 eyes/src/engine/core/Reader.js:60；参数 ()。
- `readLine()`：逐字节读取到 LF，丢弃 CR，再 UTF-8 解码；缺少 LF 会由 DataView 越界异常终止。 源码 eyes/src/engine/core/Reader.js:65；参数 ()。
- `readString(t)`：未传 length 时读取到零字节；传 length 时恰好读该字节数，再由 TextDecoder 解码。不是前缀长度字符串。length=0 的特殊情况未单独处理。 源码 eyes/src/engine/core/Reader.js:79；参数 (t)。

注意：DataView 自动越界抛 RangeError；没有独立 ensureBytes、长度上限或检查和。

### `eyes/src/engine/core/Rect.js`

二维矩形边界、包含和相交运算。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`Rect @3`。

#### Rect

二维矩形边界、包含和相交运算。 继承：`无显式继承`。源码 [eyes/src/engine/core/Rect.js:3](../../eyes/src/engine/core/Rect.js#L3)。

- `constructor(t=0, e=0, i=0, n=0)`：【结构证据】写入 `_origin`、`_size`；调用 `new PioneerPublicApi.Vector2`。 源码 eyes/src/engine/core/Rect.js:5；参数 (t=0, e=0, i=0, n=0)。
- `origin()`：【结构证据】返回 `this._origin`。 源码 eyes/src/engine/core/Rect.js:9；参数 ()。
- `size()`：【结构证据】返回 `this._size`。 源码 eyes/src/engine/core/Rect.js:12；参数 ()。
- `method toString()`：【结构证据】本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Rect.js:40；参数 ()。
- `copy(t)`：【结构证据】调用 `this._origin.copy`、`this._size.copy`。 源码 eyes/src/engine/core/Rect.js:18；参数 (t)。
- `set(t, e, i, s)`：【结构证据】调用 `this._origin.set`、`this._size.set`。 源码 eyes/src/engine/core/Rect.js:22；参数 (t, e, i, s)。
- `contains(t)`：【结构证据】返回 `this._origin.x<=t.x&&t.x<this._origin.x+this._size.x&&this._origin.y<=t.y&&t.y<this._origin.y+this._size.y`。 源码 eyes/src/engine/core/Rect.js:26；参数 (t)。
- `intersects(t)`：【结构证据】返回 `this._origin.x+this._size.x>t.origin.x&&t.origin.x+t.size.x>this._origin.x&&this._origin.y+this._size.y>t.origin.y&&t.origin.y+t.size.y>this._origin.y`。 源码 eyes/src/engine/core/Rect.js:29；参数 (t)。
- `surrounds(t)`：【结构证据】返回 `this._origin.x<=t.origin.x&&this._origin.x+this._size.x>=t.origin.x+t.size.x&&this._origin.y<=t.origin.y&&this._origin.y+this._size.y>=t.origin.y+t.si`。 源码 eyes/src/engine/core/Rect.js:32；参数 (t)。

### `eyes/src/engine/core/STORIES.js`

把五个故事 id 映射到对应故事配置模块。

- 证据：`import ./Unidentified1081.js`。
- 证据：`import ./Unidentified1082.js`。
- 证据：`import ./Unidentified1083.js`。
- 证据：`import ./Unidentified1084.js`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Scene.js`

拥有实体和 Three.js 场景，维护光源和控制器依赖图，分离状态更新与视觉更新。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`Scene extends PioneerPublicApi.CollectionItem @3`。

#### Scene

拥有实体和 Three.js 场景，维护光源和控制器依赖图，分离状态更新与视觉更新。 继承：`PioneerPublicApi.CollectionItem`。源码 [eyes/src/engine/core/Scene.js:3](../../eyes/src/engine/core/Scene.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_ambientLightColor`、`_controllerDependencyGraph`、`_entities`、`_lightSources`、`_threeJsScene`；调用 `new PioneerPublicApi.Collection`、`new PioneerPublicApi.Color`、`new PioneerPublicApi.DependencyGraph`、`new PioneerPublicApi.THREE.Scene`、`super`。 源码 eyes/src/engine/core/Scene.js:4；参数 (t, e)。
- `getEngine()`：【结构证据】返回 `this.__getCollectionParent()`；调用 `this.__getCollectionParent`。 源码 eyes/src/engine/core/Scene.js:12；参数 ()。
- `getEntity(t)`：【结构证据】返回 `this._entities.get(PioneerPublicApi.Entity,t)`；调用 `this._entities.get`。 源码 eyes/src/engine/core/Scene.js:15；参数 (t)。
- `getEntityAt(t)`：【结构证据】返回 `this._entities.getAt(t)`；调用 `this._entities.getAt`。 源码 eyes/src/engine/core/Scene.js:18；参数 (t)。
- `getNumEntities()`：【结构证据】返回 `this._entities.getSize()`；调用 `this._entities.getSize`。 源码 eyes/src/engine/core/Scene.js:21；参数 ()。
- `addEntity(t)`：【结构证据】返回 `this._entities.add(PioneerPublicApi.Entity,t)`；调用 `this._entities.add`。 源码 eyes/src/engine/core/Scene.js:24；参数 (t)。
- `removeEntity(t)`：【结构证据】调用 `this._entities.remove`。 源码 eyes/src/engine/core/Scene.js:27；参数 (t)。
- `moveEntity(t, e)`：【结构证据】调用 `e._controllerDependencyGraph.addItem`、`e._entities.get`、`e.getClassIndex`、`e.getLoadState`、`i.getComponent`、`i.getControllerAt`。 源码 eyes/src/engine/core/Scene.js:30；参数 (t, e)。
- `get(t, e, i=0)`：【结构证据】返回 `void 0===e||null===s?s:s.get(e,i)`；调用 `s.get`、`this._entities.getAny`。 源码 eyes/src/engine/core/Scene.js:52；参数 (t, e, i=0)。
- `getControllerDependencyGraph()`：【结构证据】返回 `this._controllerDependencyGraph`。 源码 eyes/src/engine/core/Scene.js:56；参数 ()。
- `getAmbientLightColor()`：【结构证据】返回 `this._ambientLightColor`。 源码 eyes/src/engine/core/Scene.js:59；参数 ()。
- `setAmbientLightColor(t)`：【结构证据】调用 `this._ambientLightColor.copy`。 源码 eyes/src/engine/core/Scene.js:62；参数 (t)。
- `__addLightSource(t, e)`：【结构证据】调用 `new Error`、`new PioneerPublicApi.ComponentRef`、`s.getComponentNameOrClassIndex`、`s.getEntityName`、`this._lightSources.push`；含显式错误分支。 源码 eyes/src/engine/core/Scene.js:65；参数 (t, e)。
- `__removeLightSource(t, e=0)`：【结构证据】返回 `void this._lightSources.splice(i,1)`；调用 `new Error`、`s.getComponentNameOrClassIndex`、`s.getEntityName`、`this._lightSources.splice`；含显式错误分支。 源码 eyes/src/engine/core/Scene.js:73；参数 (t, e=0)。
- `getLightSourceAt(t)`：【结构证据】返回 `this._lightSources[t]?.get()??null`。 源码 eyes/src/engine/core/Scene.js:80；参数 (t)。
- `getNumLightSources()`：【结构证据】返回 `this._lightSources.length`。 源码 eyes/src/engine/core/Scene.js:83；参数 ()。
- `getLoadedPromise(t, e=false, i=Number.POSITIVE_INFINITY)`：【结构证据】调用 `Promise.allSettled`、`n.push`、`new Error`、`o.push`、`r.every`、`r.filter`；含显式错误分支。 源码 eyes/src/engine/core/Scene.js:86；参数 (t, e=false, i=Number.POSITIVE_INFINITY)。
- `waitTillEntitiesInPlace(t, e, i=Number.POSITIVE_INFINITY)`：【结构证据】调用 `(await Promise.allSettled(o)).filter`、`Promise.allSettled`、`n.map`、`n.push`、`new Error`、`r.join`；含显式错误分支。 源码 eyes/src/engine/core/Scene.js:103；参数 (t, e, i=Number.POSITIVE_INFINITY)。
- `__destroy()`：【结构证据】调用 `super.__destroy`、`this._entities.__destroy`。 源码 eyes/src/engine/core/Scene.js:116；参数 ()。
- `getThreeJsScene()`：【结构证据】返回 `this._threeJsScene`。 源码 eyes/src/engine/core/Scene.js:120；参数 ()。
- `__update()`：先保存每个实体上一帧状态，再按当前仿真时间切换父级和覆盖标记，最后更新控制器依赖图，保证状态依赖先于视觉。 源码 eyes/src/engine/core/Scene.js:123；参数 ()。
- `__updateVisuals()`：【结构证据】调用 `e.__updateVisuals`、`e.isEnabled`、`e.isInPositionCoverage`、`this._entities.getAt`、`this._entities.getSize`。 源码 eyes/src/engine/core/Scene.js:133；参数 ()。
- `__removeCameraDependents(t)`：【结构证据】调用 `this._entities.getAt`、`this._entities.getAt(e).__removeCameraDependents`、`this._entities.getSize`。 源码 eyes/src/engine/core/Scene.js:139；参数 (t)。
- `_updateController(t)`：【结构证据】调用 `t.__update`、`t.getCoverage`、`t.getCoverage().contains`、`t.getEntity`、`t.getEntity().getScene`、`t.getEntity().getScene().getEngine`。 源码 eyes/src/engine/core/Scene.js:142；参数 (t)。
- `_compareControllers(t, e)`：同实体以集合顺序排序；父实体位置/速度和显式 dependent-state 构成跨实体依赖；禁用或时间覆盖不相交的控制器不产生边。 源码 eyes/src/engine/core/Scene.js:145；参数 (t, e)。

### `eyes/src/engine/core/SceneHelpers.js`

为场景建立/配置实体和辅助显示。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`SceneHelpers @4`。

#### SceneHelpers

为场景建立/配置实体和辅助显示。 继承：`无显式继承`。源码 [eyes/src/engine/core/SceneHelpers.js:4](../../eyes/src/engine/core/SceneHelpers.js#L4)。

- `getEclipJ2000ToJ2000Rotation()`：【结构证据】返回 `this.eclipJ2000ToJ2000Rotation`。 源码 eyes/src/engine/core/SceneHelpers.js:5；参数 ()。
- `llaToXYZ(t, e, i, n)`：【结构证据】调用 `e.getComponent`、`e.getOrientation`、`o.xyzFromLLA`、`t.rotate`。 源码 eyes/src/engine/core/SceneHelpers.js:8；参数 (t, e, i, n)。
- `xyzToLLA(t, e, i, n)`：【结构证据】调用 `Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`e.getComponent`、`e.getOrientation`、`o.llaFromXYZ`、`r.copy`。 源码 eyes/src/engine/core/SceneHelpers.js:12；参数 (t, e, i, n)。
- `getDependentEntities(t)`：【结构证据】返回 `set`；调用 `new Set`、`set.delete`、`this._getDependentEntitiesRecursed`。 源码 eyes/src/engine/core/SceneHelpers.js:21；参数 (t)。
- `loadEntities(t, e, i, s, o, r)`：【结构证据】调用 `Entity.Entity.create`、`SceneHelpers.getDependentEntities`、`e.has`、`i.getEntityAt`、`i.getNumEntities`、`i.removeEntity`。 源码 eyes/src/engine/core/SceneHelpers.js:27；参数 (t, e, i, s, o, r)。
- `_getDependentEntitiesRecursed(t, e)`：【结构证据】返回 `void`；调用 `Entity.Entity.getEntityOptions`、`e.add`、`e.has`、`new Set`、`set.add`、`this._getDependentEntitiesRecursed`。 源码 eyes/src/engine/core/SceneHelpers.js:42；参数 (t, e)。

### `eyes/src/engine/core/Search.js`

面向应用搜索界面的数据/查询协调。

- 证据：`import ../../framework/eyes/index.js`。
- 证据：`Search extends Eyes.Search @3`。

#### Search

面向应用搜索界面的数据/查询协调。 继承：`Eyes.Search`。源码 [eyes/src/engine/core/Search.js:3](../../eyes/src/engine/core/Search.js#L3)。

- `_getLink(t)`：【结构证据】返回 `this._app.getManager("link")?.getParsedLink?.(t,searchType)||t`；调用 `this._app.getManager`。 源码 eyes/src/engine/core/Search.js:4；参数 (t)。
- `reset(t)`：【结构证据】调用 `onReset`、`t.stopPropagation`、`this.close`、`this.eraseInput`。 源码 eyes/src/engine/core/Search.js:10；参数 (t)。
- `onInputFocus()`：【结构证据】调用 `onSearchFocus`、`super.onInputFocus`。 源码 eyes/src/engine/core/Search.js:19；参数 ()。

### `eyes/src/engine/core/SearchEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。

- 证据：`import ../../ui/components/Search.js`。
- 证据：`import ../../styles/extracted/Unidentified239.js`。
- 证据：`顶层副作用 defaultExport=Search.default`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Settings.js`

组织应用设置项及设置面板行为。

- 证据：`import ../../framework/eyes/index.js`。
- 证据：`Settings extends Eyes.Settings @3`。

#### Settings

组织应用设置项及设置面板行为。 继承：`Eyes.Settings`。源码 [eyes/src/engine/core/Settings.js:3](../../eyes/src/engine/core/Settings.js#L3)。

- `constructor(t, e={})`：【结构证据】调用 `Object.assign`、`super`。 源码 eyes/src/engine/core/Settings.js:4；参数 (t, e={})。
- `init()`：【结构证据】调用 `Eyes.AppUtils.isMobile`、`super.init`、`this._app.getComponent`、`this._callbackRegistry.push`、`this.collapse`。 源码 eyes/src/engine/core/Settings.js:10；参数 ()。
- `collapse()`：【结构证据】写入 `_element.style.paddingBottom`；调用 `super.collapse`。 源码 eyes/src/engine/core/Settings.js:20；参数 ()。
- `expand()`：【结构证据】写入 `_element.style.paddingBottom`；调用 `super.expand`。 源码 eyes/src/engine/core/Settings.js:24；参数 ()。

### `eyes/src/engine/core/SettingsEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。

- 证据：`import ../../ui/components/Settings.js`。
- 证据：`import ../../styles/extracted/Unidentified226.js`。
- 证据：`import ../../styles/extracted/Unidentified227.js`。
- 证据：`顶层副作用 defaultExport=Settings.default`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/ShaderChunkLogDepth.js`

提供对数深度和近/中距离分段深度的着色器片段。

- 证据：`import ../../vendor/three/core.js`。
- 证据：`ShaderChunkLogDepth @3`。

#### ShaderChunkLogDepth

提供对数深度和近/中距离分段深度的着色器片段。 继承：`无显式继承`。源码 [eyes/src/engine/core/ShaderChunkLogDepth.js:3](../../eyes/src/engine/core/ShaderChunkLogDepth.js#L3)。


### `eyes/src/engine/core/ShareModalEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。

- 证据：`import ../../ui/components/ShareModal.js`。
- 证据：`import ../../styles/extracted/Unidentified512.js`。
- 证据：`顶层副作用 defaultExport=ShareModal.default`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Sort.js`

排序、二分查找和有序插入工具。

- 证据：`Sort @2`。

#### Sort

排序、二分查找和有序插入工具。 继承：`无显式继承`。源码 [eyes/src/engine/core/Sort.js:2](../../eyes/src/engine/core/Sort.js#L2)。

- `getIndex(t, e)`：【结构证据】返回 `i`。 源码 eyes/src/engine/core/Sort.js:3；参数 (t, e)。
- `getIndexObject(t, e, i)`：【结构证据】返回 `s`；调用 `i`。 源码 eyes/src/engine/core/Sort.js:12；参数 (t, e, i)。
- `add(t, e)`：【结构证据】调用 `e.splice`、`this.getIndex`。 源码 eyes/src/engine/core/Sort.js:21；参数 (t, e)。
- `addObject(t, e, i, s)`：【结构证据】调用 `e.splice`、`s`、`this.getIndexObject`。 源码 eyes/src/engine/core/Sort.js:26；参数 (t, e, i, s)。
- `remove(t, e)`：【结构证据】返回 `s`；调用 `e.splice`、`this.getIndex`。 源码 eyes/src/engine/core/Sort.js:31；参数 (t, e)。
- `removeObject(t, e, i, s)`：【结构证据】返回 `o`；调用 `e.splice`、`s`、`this.getIndexObject`。 源码 eyes/src/engine/core/Sort.js:38；参数 (t, e, i, s)。
- `sort(t, e)`：【结构证据】返回 `void`；调用 `e`。 源码 eyes/src/engine/core/Sort.js:45；参数 (t, e)。
- `sortObject(t, e, i)`：【结构证据】返回 `void`；调用 `e`、`i`。 源码 eyes/src/engine/core/Sort.js:60；参数 (t, e, i)。

### `eyes/src/engine/core/SpriteParticles.js`

将粒子状态批量组织为可渲染精灵几何。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`SpriteParticles @3`。

#### SpriteParticles

将粒子状态批量组织为可渲染精灵几何。 继承：`无显式继承`。源码 [eyes/src/engine/core/SpriteParticles.js:3](../../eyes/src/engine/core/SpriteParticles.js#L3)。

- `constructor(component)`：【结构证据】写入 `_colorArray`、`_component`、`_offsetArray`、`_relativeToEntityOrientation`、`_scaleArray`、`_threeJsGeometry`、`_threeJsMaterial`、`_threeJsObject`；调用 `PioneerPublicApi.ThreeJsHelper.createMeshObjectGivenGeometry`、`new Float32Array`、`new PioneerPublicApi.THREE.BufferAttribute`、`new PioneerPublicApi.THREE.InstancedBufferAttribute`、`new PioneerPublicApi.THREE.InstancedBufferGeometry`、`new Uint16Array`。 源码 eyes/src/engine/core/SpriteParticles.js:4；参数 (component)。
- `getThreeJsObject()`：【结构证据】返回 `this._threeJsObject`。 源码 eyes/src/engine/core/SpriteParticles.js:19；参数 ()。
- `getThreeJsMaterial()`：【结构证据】返回 `this._threeJsMaterial`。 源码 eyes/src/engine/core/SpriteParticles.js:22；参数 ()。
- `setParticleOffsets(t)`：【结构证据】调用 `this._setAttribute`。 源码 eyes/src/engine/core/SpriteParticles.js:25；参数 (t)。
- `setParticleColors(t)`：【结构证据】调用 `this._setAttribute`。 源码 eyes/src/engine/core/SpriteParticles.js:28；参数 (t)。
- `setParticleScales(t)`：【结构证据】调用 `this._setAttribute`。 源码 eyes/src/engine/core/SpriteParticles.js:31；参数 (t)。
- `getRelativeToEntityOrientation()`：【结构证据】返回 `this._relativeToEntityOrientation`。 源码 eyes/src/engine/core/SpriteParticles.js:34；参数 ()。
- `setRelativeToEntityOrientation(relativeToEntityOrientation)`：【结构证据】写入 `_relativeToEntityOrientation`。 源码 eyes/src/engine/core/SpriteParticles.js:37；参数 (relativeToEntityOrientation)。
- `prepareForRender(t)`：【结构证据】调用 `PioneerPublicApi.ThreeJsHelper.setOrientationToEntity`、`PioneerPublicApi.ThreeJsHelper.setPositionToEntity`、`this._component.getEntity`。 源码 eyes/src/engine/core/SpriteParticles.js:40；参数 (t)。
- `_setAttribute(t, e, i)`：【结构证据】写入 `_colorArray`、`_offsetArray`、`_scaleArray`、`_threeJsGeometry.instanceCount`；调用 `n.copyArray`、`new Float32Array`、`new PioneerPublicApi.THREE.InstancedBufferAttribute`、`this._threeJsGeometry.getAttribute`、`this._threeJsGeometry.setAttribute`。 源码 eyes/src/engine/core/SpriteParticles.js:44；参数 (t, e, i)。

### `eyes/src/engine/core/SpriteParticlesShader.js`

声明 SpriteParticlesShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。

- 证据：`import ./ShaderChunkLogDepth.js`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/SpriteShader.js`

声明 SpriteShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。

- 证据：`import ./ShaderChunkLogDepth.js`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Story.js`

管理故事进入/退出、幻灯片、摄像机步骤、时间限制及内容块。

- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`import ../../styles/extracted/StoryStyles.js`。
- 证据：`Story extends EyesPublicApi.Carousel @4`。

#### Story

管理故事进入/退出、幻灯片、摄像机步骤、时间限制及内容块。 继承：`EyesPublicApi.Carousel`。源码 [eyes/src/engine/core/Story.js:4](../../eyes/src/engine/core/Story.js#L4)。

- `constructor(t, e)`：【结构证据】写入 `_blocks`、`_config.navigationButtons.next.text`、`_id`、`_info`、`_onSlideChange`；调用 `EyesPublicApi.AppUtils.isPrimaryTouch`、`routerManager.navigate`、`super`、`this._app.getManager`、`this._app.getManager("time").getTimeUrl`。 源码 eyes/src/engine/core/Story.js:5；参数 (t, e)。
- `init()`：【结构证据】调用 `super.init`、`this._element.querySelector`、`this._setVariables`。 源码 eyes/src/engine/core/Story.js:25；参数 ()。
- `_setExpandToggleAriaLabel()`：【结构证据】调用 `t.forEach`、`t.setAttribute`、`this._element.querySelectorAll`。 源码 eyes/src/engine/core/Story.js:31；参数 ()。
- `_toggleCollapse()`：【结构证据】调用 `super._toggleCollapse`、`this._setExpandToggleAriaLabel`。 源码 eyes/src/engine/core/Story.js:36；参数 ()。
- `onRouteChange(info, {cancelToken:cancelToken,slide:slide,id:id}={})`：【结构证据】写入 `_id`、`_info`；返回 `void`；调用 `this._app.getManager`、`this._app.getManager("time").setTimeRate`、`this._children.slides.findIndex`、`this._setExpandToggleAriaLabel`、`this.clear`、`this.goToSlide`。 源码 eyes/src/engine/core/Story.js:40；参数 (info, {cancelToken:cancelToken,slide:slide,id:id}={})。
- `onQueryChange({cancelToken:cancelToken,slide:slide}={})`：【结构证据】返回 `void`；调用 `this._app.getManager`、`this._app.getManager("time").setTimeRate`、`this._children.slides.findIndex`、`this.goToSlide`。 源码 eyes/src/engine/core/Story.js:59；参数 ({cancelToken:cancelToken,slide:slide}={})。
- `createBlockContent(t, e)`：【结构证据】写入 `_blocks[t.type]`；返回 `n.element`；调用 `n.init`、`new EyesPublicApi.ButtonsBlock`、`new EyesPublicApi.CheckboxBlock`、`new EyesPublicApi.DescriptionBlock`、`new EyesPublicApi.HintBlock`、`new EyesPublicApi.ImageBlock`。 源码 eyes/src/engine/core/Story.js:68；参数 (t, e)。
- `getStoryBlock(t)`：【结构证据】返回 `this._blocks[t]||console.warn(`Block ${t} is not available`)`；调用 `console.warn`。 源码 eyes/src/engine/core/Story.js:149；参数 (t)。
- `createSlideContent(t, e)`：【结构证据】返回 `i`；调用 `document.createDocumentFragment`、`i.appendChild`、`this.createBlockContent`。 源码 eyes/src/engine/core/Story.js:152；参数 (t, e)。
- `setUp()`：【结构证据】写入 `_onEnter[t]`、`_onLeave[t]`；调用 `onEnter`、`onLeave`、`s.push`、`this._onEnter[t].push`、`this._onLeave[t].push`、`this.addSlide`。 源码 eyes/src/engine/core/Story.js:163；参数 ()。
- `close()`：【结构证据】调用 `routerManager.navigate`、`this._app.getManager`。 源码 eyes/src/engine/core/Story.js:189；参数 ()。
- `onLeave(t)`：【结构证据】调用 `super.onLeave`、`this._app.getManager`、`this._app.getManager("router").removeQuery`。 源码 eyes/src/engine/core/Story.js:193；参数 (t)。
- `_updateTooltipsProps()`：【结构证据】调用 `e.getPropertyValue`、`getComputedStyle`、`parseFloat`、`this._progressTooltip.setProps`。 源码 eyes/src/engine/core/Story.js:198；参数 ()。

### `eyes/src/engine/core/StoryBaseContentBlock.js`

故事内容块的基础类型和渲染/事件接口。

- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`import ../../styles/extracted/StoryBaseContentBlockStyles.js`。
- 证据：`StoryBaseContentBlock extends EyesPublicApi.BaseComponent @4`。

#### StoryBaseContentBlock

故事内容块的基础类型和渲染/事件接口。 继承：`EyesPublicApi.BaseComponent`。源码 [eyes/src/engine/core/StoryBaseContentBlock.js:4](../../eyes/src/engine/core/StoryBaseContentBlock.js#L4)。

- `constructor(t, e={config:{info:{}}})`：【结构证据】写入 `onEnter`、`onLeave`；调用 `super`、`this._config.info.onEnter`、`this._config.info.onLeave`、`this.bindFunctions`。 源码 eyes/src/engine/core/StoryBaseContentBlock.js:5；参数 (t, e={config:{info:{}}})。
- `init()`：【结构证据】调用 `Array.isArray`、`super.init`、`this._element.addEventListener`、`this._element.classList.add`、`this._setVariables`。 源码 eyes/src/engine/core/StoryBaseContentBlock.js:16；参数 ()。
- `onEnter()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/StoryBaseContentBlock.js:23；参数 ()。
- `onLeave()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/StoryBaseContentBlock.js:24；参数 ()。
- `onClick()`：【结构证据】调用 `this._config.info.func`。 源码 eyes/src/engine/core/StoryBaseContentBlock.js:25；参数 ()。

### `eyes/src/engine/core/TextureLOD.js`

按实体屏幕半径或强制尺寸选择 $SIZE 纹理，以引用计数替换 shader uniform。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`TextureLOD @3`。

#### TextureLOD

按实体屏幕半径或强制尺寸选择 $SIZE 纹理，以引用计数替换 shader uniform。 继承：`无显式继承`。源码 [eyes/src/engine/core/TextureLOD.js:3](../../eyes/src/engine/core/TextureLOD.js#L3)。

- `constructor(component)`：【结构证据】写入 `_component`、`_currentSize`、`_enabled`、`_engine`、`_forcedSize`、`_loadState`、`_sizes`、`_uniform`；调用 `component.getEntity`、`component.getEntity().getScene`、`component.getEntity().getScene().getEngine`。 源码 eyes/src/engine/core/TextureLOD.js:4；参数 (component)。
- `setEnabled(enabled)`：【结构证据】写入 `_enabled`、`_uniform.value`；调用 `this._component.getEngine`、`this._component.getEngine().getResourceManager`、`this._component.getEngine().getResourceManager().release`。 源码 eyes/src/engine/core/TextureLOD.js:17；参数 (enabled)。
- `getUrl()`：【结构证据】返回 `this._url`。 源码 eyes/src/engine/core/TextureLOD.js:21；参数 ()。
- `setUrl(url)`：【结构证据】写入 `_currentSize`、`_loadState`、`_url`。 源码 eyes/src/engine/core/TextureLOD.js:24；参数 (url)。
- `getUniform()`：【结构证据】返回 `this._uniform`。 源码 eyes/src/engine/core/TextureLOD.js:29；参数 ()。
- `setUniform(uniform)`：【结构证据】写入 `_currentSize`、`_loadState`、`_uniform`、`_uniform.value`；调用 `this._component.getEngine`、`this._component.getEngine().getResourceManager`、`this._component.getEngine().getResourceManager().release`。 源码 eyes/src/engine/core/TextureLOD.js:32；参数 (uniform)。
- `getSizes()`：【结构证据】返回 `this._sizes.slice()`；调用 `this._sizes.slice`。 源码 eyes/src/engine/core/TextureLOD.js:37；参数 ()。
- `setSizes(t)`：【结构证据】写入 `_currentSize`、`_loadState`、`_sizes`；调用 `this._sizes.map`。 源码 eyes/src/engine/core/TextureLOD.js:40；参数 (t)。
- `getCurrentSize()`：【结构证据】返回 `this._currentSize`。 源码 eyes/src/engine/core/TextureLOD.js:45；参数 ()。
- `getForcedSize()`：【结构证据】返回 `this._forcedSize`。 源码 eyes/src/engine/core/TextureLOD.js:48；参数 ()。
- `setForcedSize(forcedSize)`：【结构证据】写入 `_forcedSize`。 源码 eyes/src/engine/core/TextureLOD.js:51；参数 (forcedSize)。
- `getLoadedPromise(t=Number.POSITIVE_INFINITY)`：【结构证据】调用 `0,PioneerPublicApi.waitUntil`、`new Error`；含显式错误分支。 源码 eyes/src/engine/core/TextureLOD.js:54；参数 (t=Number.POSITIVE_INFINITY)。
- `update()`：从 sizes 选择首个不小于实体最大屏幕半径的尺寸，受 maxTextureSize 影响；forcedSize 跳过默认装载条件及尺寸上限。currentSize 变化才触发加载。 源码 eyes/src/engine/core/TextureLOD.js:61；参数 ()。
- `_loadTexture(t, e)`：替换 $SIZE 并按负相机深度提交 acquire；旧纹理保留到新纹理成功，然后 release 旧 uniform；若期间禁用/无 uniform 则释放新资源。 源码 eyes/src/engine/core/TextureLOD.js:78；参数 (t, e)。

注意：异步 _loadTexture 成功回调没有显式 URL/尺寸代际校验，旧请求完成顺序可能覆盖较新 uniform；目前仅记录静态风险。

### `eyes/src/engine/core/TextureLoader.js`

将图像位图、视频与 KTX2 二进制转成 Three.js 纹理，提供纯色占位纹理、立方图和环境预滤波。

- 证据：`import ../../runtime/decoder-paths.js`。
- 证据：`import ../pioneer/public-api.js`。
- 证据：`import ../../vendor/modules/KTX2Loader.js`。
- 证据：`TextureLoader @5`。

#### TextureLoader

将图像位图、视频与 KTX2 二进制转成 Three.js 纹理，提供纯色占位纹理、立方图和环境预滤波。 继承：`无显式继承`。源码 [eyes/src/engine/core/TextureLoader.js:5](../../eyes/src/engine/core/TextureLoader.js#L5)。

- `constructor(engine)`：【结构证据】写入 `_black`、`_clear`、`_engine`、`_gray`、`_pink`、`_white`；调用 `TextureLoader._newTexture`、`new PioneerPublicApi.Color`。 源码 eyes/src/engine/core/TextureLoader.js:6；参数 (engine)。
- `loadCubeTexture(t, e, i)`：【结构证据】返回 `cubeTexture`；调用 `Promise.all`、`new PioneerPublicApi.THREE.CubeTexture`、`r.push`、`t.dispose`、`t.replace`、`this.loadTexture`。 源码 eyes/src/engine/core/TextureLoader.js:14；参数 (t, e, i)。
- `generateEnvMap(t)`：【结构证据】返回 `pMREMGenerator.fromEquirectangular(e).texture`；调用 `new PioneerPublicApi.THREE.PMREMGenerator`、`new PioneerPublicApi.THREE.WebGLCubeRenderTarget`、`new PioneerPublicApi.THREE.WebGLCubeRenderTarget(512,i).fromEquirectangularTexture`、`pMREMGenerator.compileEquirectangularShader`、`pMREMGenerator.fromEquirectangular`、`this._engine.__getThreeJsRenderer`。 源码 eyes/src/engine/core/TextureLoader.js:29；参数 (t)。
- `cancel(t)`：【结构证据】调用 `this._engine.getDownloader`、`this._engine.getDownloader().cancel`。 源码 eyes/src/engine/core/TextureLoader.js:45；参数 (t)。
- `updatePriority(t, e)`：【结构证据】调用 `this._engine.getDownloader`、`this._engine.getDownloader().updatePriority`。 源码 eyes/src/engine/core/TextureLoader.js:48；参数 (t, e)。
- `loadTexture(t, e, i)`：纯色关键字返回占位纹理 clone；mp4/webm 下载 video，ktx2 下载 binary，其他下载 imageBitmap；依内容建立 VideoTexture、CanvasTexture 或 KTX2 _createTexture。 源码 eyes/src/engine/core/TextureLoader.js:51；参数 (t, e, i)。
- `getKTX2Loader()`：按需创建静态共享 KTX2Loader，使用配置路径或 localDecoderUrl(ktx2/)，经 processUrl 处理并以当前渲染器 detectSupport。 源码 eyes/src/engine/core/TextureLoader.js:81；参数 ()。
- `_newTexture(t)`：【结构证据】返回 `new PioneerPublicApi.THREE.CanvasTexture(e)`；调用 `document.createElement`、`e.getContext`、`i.fillRect`、`new Error`、`new PioneerPublicApi.THREE.CanvasTexture`；含显式错误分支。 源码 eyes/src/engine/core/TextureLoader.js:91；参数 (t)。

### `eyes/src/engine/core/ThreeJsHelper.js`

集中创建/更新/销毁 Three.js 网格、属性、材质、纹理并把实体状态转换到相机坐标。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`ThreeJsHelper @3`。

#### ThreeJsHelper

集中创建/更新/销毁 Three.js 网格、属性、材质、纹理并把实体状态转换到相机坐标。 继承：`无显式继承`。源码 [eyes/src/engine/core/ThreeJsHelper.js:3](../../eyes/src/engine/core/ThreeJsHelper.js#L3)。

- `createGeometry(t, e)`：【结构证据】返回 `bufferGeometry`；调用 `bufferGeometry.setAttribute`、`bufferGeometry.setIndex`、`new Float32Array`、`new PioneerPublicApi.THREE.BufferAttribute`、`new PioneerPublicApi.THREE.BufferGeometry`、`new PioneerPublicApi.THREE.InterleavedBuffer`。 源码 eyes/src/engine/core/ThreeJsHelper.js:4；参数 (t, e)。
- `setupObject(t, e)`：【结构证据】调用 `Math.floor`、`Math.random`、`t.getEntity`、`t.getEntity().getScene`、`t.getEntity().getScene().getThreeJsScene`、`t.getEntity().getScene().getThreeJsScene().add`。 源码 eyes/src/engine/core/ThreeJsHelper.js:23；参数 (t, e)。
- `createMeshObjectGivenGeometry(t, e, i)`：【结构证据】返回 `mesh`；调用 `new PioneerPublicApi.THREE.Mesh`、`this.setupObject`。 源码 eyes/src/engine/core/ThreeJsHelper.js:30；参数 (t, e, i)。
- `createMeshObject(t, e, i, s)`：【结构证据】返回 `this.createMeshObjectGivenGeometry(t,e,n)`；调用 `this.createGeometry`、`this.createMeshObjectGivenGeometry`。 源码 eyes/src/engine/core/ThreeJsHelper.js:35；参数 (t, e, i, s)。
- `destroyGeometry(t, e)`：【结构证据】调用 `Object.values`、`t.dispose`。 源码 eyes/src/engine/core/ThreeJsHelper.js:39；参数 (t, e)。
- `destroyObject(t, e)`：【结构证据】调用 `t.parent.remove`、`this.destroyGeometry`、`this.destroyObject`。 源码 eyes/src/engine/core/ThreeJsHelper.js:44；参数 (t, e)。
- `destroyMaterial(t, e)`：【结构证据】调用 `Object.hasOwn`、`ThreeJsHelper.destroyTexture`、`t.dispose`。 源码 eyes/src/engine/core/ThreeJsHelper.js:49；参数 (t, e)。
- `destroyTexture(t)`：【结构证据】调用 `Array.isArray`、`i.close`、`t.dispose`、`t.source.data.close`。 源码 eyes/src/engine/core/ThreeJsHelper.js:59；参数 (t)。
- `destroyRenderTarget(t)`：【结构证据】调用 `t.dispose`。 源码 eyes/src/engine/core/ThreeJsHelper.js:66；参数 (t)。
- `destroyAllObjectsAndMaterials(t, e=true)`：【结构证据】调用 `t.getThreeJsMaterials`、`t.getThreeJsObjects`、`this.destroyMaterial`、`this.destroyObject`。 源码 eyes/src/engine/core/ThreeJsHelper.js:69；参数 (t, e=true)。
- `setPosition(t, e)`：【结构证据】调用 `Array.isArray`、`t.position.set`、`t[i].position.set`。 源码 eyes/src/engine/core/ThreeJsHelper.js:75；参数 (t, e)。
- `setPositionToEntity(t, e, i, n, o)`：【结构证据】返回 `void`；调用 `Array.isArray`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`PioneerPublicApi.Vector3.threeJsPool.get`、`PioneerPublicApi.Vector3.threeJsPool.release`、`a.set`。 源码 eyes/src/engine/core/ThreeJsHelper.js:78；参数 (t, e, i, n, o)。
- `setScale(t, e)`：【结构证据】调用 `Array.isArray`、`t.scale.set`、`t[i].scale.set`。 源码 eyes/src/engine/core/ThreeJsHelper.js:93；参数 (t, e)。
- `setOrientation(t, e)`：【结构证据】返回 `void`；调用 `Array.isArray`、`PioneerPublicApi.Quaternion.threeJsPool.get`、`PioneerPublicApi.Quaternion.threeJsPool.release`、`i.set`、`t.setRotationFromQuaternion`、`t[e].setRotationFromQuaternion`。 源码 eyes/src/engine/core/ThreeJsHelper.js:96；参数 (t, e)。
- `setOrientationToBillboard(t, e)`：【结构证据】返回 `void`；调用 `Array.isArray`、`PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Quaternion.threeJsPool.get`、`PioneerPublicApi.Quaternion.threeJsPool.release`、`PioneerPublicApi.Vector3.pool.get`。 源码 eyes/src/engine/core/ThreeJsHelper.js:102；参数 (t, e)。
- `setOrientationToEntity(t, e, i)`：【结构证据】返回 `void`；调用 `Array.isArray`、`PioneerPublicApi.Quaternion.pool.get`、`PioneerPublicApi.Quaternion.pool.release`、`PioneerPublicApi.Quaternion.threeJsPool.get`、`PioneerPublicApi.Quaternion.threeJsPool.release`、`e.getOrientation`。 源码 eyes/src/engine/core/ThreeJsHelper.js:118；参数 (t, e, i)。
- `useInDynEnvMap(t, e)`：【结构证据】调用 `t.layers.disable`、`t.layers.enable`。 源码 eyes/src/engine/core/ThreeJsHelper.js:131；参数 (t, e)。
- `createGLBufferAttribute(t, e, i, n, o)`：【结构证据】返回 `new PioneerPublicApi.THREE.GLBufferAttribute(a,h,n,d,e.length/n)`；调用 `new PioneerPublicApi.THREE.GLBufferAttribute`、`o.getEntity`、`o.getEntity().getScene`、`o.getEntity().getScene().getEngine`、`o.getEntity().getScene().getEngine().__getThreeJsRenderer`、`o.getEntity().getScene().getEngine().__getThreeJsRenderer().getContext`。 源码 eyes/src/engine/core/ThreeJsHelper.js:134；参数 (t, e, i, n, o)。
- `updateGLBufferAttribute(t, e, i, s, n, o)`：【结构证据】调用 `o.getEntity`、`o.getEntity().getScene`、`o.getEntity().getScene().getEngine`、`o.getEntity().getScene().getEngine().__getThreeJsRenderer`、`o.getEntity().getScene().getEngine().__getThreeJsRenderer().getContext`、`r.bindBuffer`。 源码 eyes/src/engine/core/ThreeJsHelper.js:148；参数 (t, e, i, s, n, o)。
- `setVertices(t, e, i)`：【结构证据】调用 `n.copyArray`、`new PioneerPublicApi.THREE.BufferAttribute`、`t.getAttribute`、`t.setAttribute`。 源码 eyes/src/engine/core/ThreeJsHelper.js:157；参数 (t, e, i)。
- `setIndices(t, e)`：【结构证据】调用 `i.copyArray`、`new PioneerPublicApi.THREE.BufferAttribute`、`t.getIndex`、`t.setIndex`。 源码 eyes/src/engine/core/ThreeJsHelper.js:161；参数 (t, e)。
- `computeTangents(t)`：【结构证据】调用 `t.computeTangents`。 源码 eyes/src/engine/core/ThreeJsHelper.js:165；参数 (t)。
- `setRenderOrder(t, e)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/ThreeJsHelper.js:168；参数 (t, e)。
- `cloneMaterial(t)`：【结构证据】返回 `e`；调用 `Object.entries`、`t.clone`、`this._cloneUniformValue`。 源码 eyes/src/engine/core/ThreeJsHelper.js:171；参数 (t)。
- `_cloneUniformValue(t)`：【结构证据】返回 `null` 或 `t`；调用 `Array.isArray`、`e.push`、`t.clone`、`this._cloneUniformValue`。 源码 eyes/src/engine/core/ThreeJsHelper.js:180；参数 (t)。
- `loadTexture(t, e, i)`：【结构证据】返回 `t.getEntity().getScene().getEngine().getTextureLoader().loadTexture(e,-t.getEntity().getLeastCameraDepth(),i)`；调用 `t.getEntity`、`t.getEntity().getLeastCameraDepth`、`t.getEntity().getScene`、`t.getEntity().getScene().getEngine`、`t.getEntity().getScene().getEngine().getTextureLoader`、`t.getEntity().getScene().getEngine().getTextureLoader().loadTexture`。 源码 eyes/src/engine/core/ThreeJsHelper.js:190；参数 (t, e, i)。
- `loadTextureFromCanvas(t)`：【结构证据】返回 `canvasTexture`；调用 `new PioneerPublicApi.THREE.CanvasTexture`。 源码 eyes/src/engine/core/ThreeJsHelper.js:193；参数 (t)。
- `loadTextureIntoUniform(t, e, i, s)`：【结构证据】调用 `ThreeJsHelper.destroyTexture`、`this.loadTexture`。 源码 eyes/src/engine/core/ThreeJsHelper.js:201；参数 (t, e, i, s)。
- `setOverlay(t, e)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/ThreeJsHelper.js:206；参数 (t, e)。
- `setTransparent(t, e)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/ThreeJsHelper.js:209；参数 (t, e)。
- `setBlending(t, e)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/ThreeJsHelper.js:212；参数 (t, e)。
- `setDefine(t, e, i)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/ThreeJsHelper.js:236；参数 (t, e, i)。
- `setUniformNumber(t, e, i)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/ThreeJsHelper.js:239；参数 (t, e, i)。
- `setUniformVector2(t, e, i)`：【结构证据】返回 `void`；调用 `t.uniforms[e].value.set`。 源码 eyes/src/engine/core/ThreeJsHelper.js:242；参数 (t, e, i)。
- `setUniformVector3(t, e, i)`：【结构证据】返回 `void`；调用 `t.uniforms[e].value.set`。 源码 eyes/src/engine/core/ThreeJsHelper.js:246；参数 (t, e, i)。
- `setUniformColorRGB(t, e, i)`：【结构证据】返回 `void`；调用 `t.uniforms[e].value.set`。 源码 eyes/src/engine/core/ThreeJsHelper.js:250；参数 (t, e, i)。
- `setUniformColorRGBA(t, e, i, s=1)`：【结构证据】返回 `void`；调用 `t.uniforms[e].value.set`。 源码 eyes/src/engine/core/ThreeJsHelper.js:254；参数 (t, e, i, s=1)。
- `setUniformQuaternion(t, e, i)`：【结构证据】返回 `void`；调用 `t.uniforms[e].value.set`。 源码 eyes/src/engine/core/ThreeJsHelper.js:258；参数 (t, e, i)。
- `setUniformTexture(t, e, i)`：【结构证据】返回 `void`；调用 `ThreeJsHelper.destroyTexture`。 源码 eyes/src/engine/core/ThreeJsHelper.js:262；参数 (t, e, i)。

### `eyes/src/engine/core/Tile.js`

异步四叉瓦片状态机：细分前保持父瓦片，子瓦片加载后切换；合并时先加载父瓦片再销毁后代。

- 证据：`Tile @7`。

#### Tile

异步四叉瓦片状态机：细分前保持父瓦片，子瓦片加载后切换；合并时先加载父瓦片再销毁后代。 继承：`无显式继承`。源码 [eyes/src/engine/core/Tile.js:7](../../eyes/src/engine/core/Tile.js#L7)。

- `constructor(parent)`：【结构证据】写入 `_children`、`_destroyed`、`_parent`、`_splitFailed`、`_state`、`_transitioning`。 源码 eyes/src/engine/core/Tile.js:8；参数 (parent)。
- `getParent()`：【结构证据】返回 `this._parent`。 源码 eyes/src/engine/core/Tile.js:16；参数 ()。
- `forceLoad()`：【结构证据】写入 `_state`、`_transitioning`；调用 `this.load`、`this.setVisible`。 源码 eyes/src/engine/core/Tile.js:19；参数 ()。
- `check()`：【结构证据】返回 `this._transitioning`；调用 `this._join`、`this._split`、`this.checkJoin`、`this.checkSplit`。 源码 eyes/src/engine/core/Tile.js:27；参数 ()。
- `getChildren()`：【结构证据】返回 `this._children`。 源码 eyes/src/engine/core/Tile.js:31；参数 ()。
- `destroy()`：【结构证据】写入 `_destroyed`、`_state`；调用 `this._children[t].destroy`、`this.setVisible`、`this.unload`。 源码 eyes/src/engine/core/Tile.js:34；参数 ()。
- `isDestroyed()`：【结构证据】返回 `this._destroyed`。 源码 eyes/src/engine/core/Tile.js:39；参数 ()。
- `_split()`：递归构造需要的四个象限后代，设置 transitioning 防重入；等待新叶资源后显示叶并卸载父。catch 后 finally 仍设 Loaded，Loaded 不代表子类全部成功。 源码 eyes/src/engine/core/Tile.js:42；参数 ()。
- `_join()`：若任一后代 transitioning 则推迟；先加载当前父瓦片，再隐藏卸载后代并标记 destroyed，最后清空 children。 源码 eyes/src/engine/core/Tile.js:66；参数 ()。
- `_splitAndGetNeedingLoad(t, e)`：【结构证据】调用 `e.push`、`n._splitAndGetNeedingLoad`、`n.checkSplit`、`t.push`、`this._children.push`、`this.createNewTile`。 源码 eyes/src/engine/core/Tile.js:94；参数 (t, e)。
- `_getDescendentTiles(t)`：【结构证据】调用 `i._getDescendentTiles`、`t.push`。 源码 eyes/src/engine/core/Tile.js:100；参数 (t)。

### `eyes/src/engine/core/TimeControllerEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。

- 证据：`import ../controllers/TimeController.js`。
- 证据：`import ../../styles/extracted/Unidentified226.js`。
- 证据：`import ../../styles/extracted/Unidentified516.js`。
- 证据：`顶层副作用 defaultExport=TimeController.default`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/TimeUtils.js`

ET 与 Unix 时间换算及时间单位辅助。

- 证据：`TimeUtils @2`。

#### TimeUtils

ET 与 Unix 时间换算及时间单位辅助。 继承：`无显式继承`。源码 [eyes/src/engine/core/TimeUtils.js:2](../../eyes/src/engine/core/TimeUtils.js#L2)。

- `now()`：【结构证据】返回 `TimeUtils.unixToEt(Date.now()/1e3)`；调用 `Date.now`、`TimeUtils.unixToEt`。 源码 eyes/src/engine/core/TimeUtils.js:3；参数 ()。
- `etToUnix(t)`：【结构证据】返回 `t+946727957.816+e`。 源码 eyes/src/engine/core/TimeUtils.js:6；参数 (t)。
- `unixToEt(t)`：【结构证据】返回 `t-946727957.816+e`。 源码 eyes/src/engine/core/TimeUtils.js:11；参数 (t)。

### `eyes/src/engine/core/TrailShader.js`

声明 TrailShader 的 uniforms/properties 与顶点、片元 GLSL 源码，供材质系统创建实际 GPU 程序。

- 证据：`import ./ShaderChunkLogDepth.js`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Transitions.js`

通过关键帧/插值构造实体与相机状态过渡。

- 证据：`import ../pioneer/index.js`。
- 证据：`Transitions @3`。

#### Transitions

通过关键帧/插值构造实体与相机状态过渡。 继承：`无显式继承`。源码 [eyes/src/engine/core/Transitions.js:3](../../eyes/src/engine/core/Transitions.js#L3)。

- `jumpToLocationOnSphere(t, e, i, n, o, r, a, l, c, h)`：【结构证据】调用 `A.copy`、`A.isNaN`、`A.mult`、`A.normalize`、`A.rotate`、`L.normalize`；含显式错误分支。 源码 eyes/src/engine/core/Transitions.js:4；参数 (t, e, i, n, o, r, a, l, c, h)。
- `easeInOut(t)`：【结构证据】返回 `e/(2*(e-t)+1)`。 源码 eyes/src/engine/core/Transitions.js:78；参数 (t)。
- `_jumpOnCircle(t, e, i, s, n)`：【结构证据】调用 `Math.abs`、`Math.acos`、`Math.cos`、`Math.sign`、`Math.sin`、`Math.sqrt`。 源码 eyes/src/engine/core/Transitions.js:82；参数 (t, e, i, s, n)。

### `eyes/src/engine/core/Tuple.js`

轻量二元组数据结构。

- 证据：`Tuple @2`。

#### Tuple

轻量二元组数据结构。 继承：`无显式继承`。源码 [eyes/src/engine/core/Tuple.js:2](../../eyes/src/engine/core/Tuple.js#L2)。

- `create2Tuple(t)`：【结构证据】返回 `[t(0),t(1)]`；调用 `t`。 源码 eyes/src/engine/core/Tuple.js:3；参数 (t)。
- `create3Tuple(t)`：【结构证据】返回 `[t(0),t(1),t(2)]`；调用 `t`。 源码 eyes/src/engine/core/Tuple.js:6；参数 (t)。
- `create4Tuple(t)`：【结构证据】返回 `[t(0),t(1),t(2),t(3)]`；调用 `t`。 源码 eyes/src/engine/core/Tuple.js:9；参数 (t)。
- `create5Tuple(t)`：【结构证据】返回 `[t(0),t(1),t(2),t(3),t(4)]`；调用 `t`。 源码 eyes/src/engine/core/Tuple.js:12；参数 (t)。
- `create6Tuple(t)`：【结构证据】返回 `[t(0),t(1),t(2),t(3),t(4),t(5)]`；调用 `t`。 源码 eyes/src/engine/core/Tuple.js:15；参数 (t)。

### `eyes/src/engine/core/TutorialOverlayEntry.js`

UI 入口适配模块：重新导出实际组件并副作用加载配套 extracted 样式；实际交互逻辑在其导入目标。

- 证据：`import ../../ui/components/TutorialOverlay.js`。
- 证据：`import ../../styles/extracted/Unidentified502.js`。
- 证据：`顶层副作用 defaultExport=TutorialOverlay.default`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Types-1075.js`

用太阳系专用管理器/UI 覆盖框架 Types 注册项。

- 证据：`import ../../framework/eyes/index.js`。
- 证据：`import ../../app/public-api.js`。
- 证据：`顶层副作用 Eyes.Types.set("TimeManager",SolarSystemPublicApi.TimeManager)`。
- 证据：`顶层副作用 Eyes.Types.set("LinkManager",SolarSystemPublicApi.LinkManager)`。
- 证据：`顶层副作用 Eyes.Types.set("LabelManager",SolarSystemPublicApi.LabelManager)`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Types-754.js`

建立框架管理器和 UI 类型名称到构造函数的注册表。

- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`顶层副作用 n.set("TimeManager",EyesPublicApi.TimeManager)`。
- 证据：`顶层副作用 n.set("SelectionManager",EyesPublicApi.SelectionManager)`。
- 证据：`顶层副作用 n.set("LabelManager",EyesPublicApi.LabelManager)`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified1069.js`

TelescopeHelper：建立地面观察相机目标、经纬地标、飞行过渡和方位/仰角读数。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ../solar-system/public-api.js`。
- 证据：`import ../../framework/eyes/index.js`。
- 证据：`顶层副作用 defaultExport=class TelescopeHelper{constructor(t,entity){this.pioneer=t.pioneer;this.scene=t.scene;this.camera=t.scene.getEntity("camera");this.cameraTarget=t.scene.getEntity("cameraTarget")||t.scene.addEntity("cameraTa`。
- 证据：`TelescopeHelper @6`。

#### TelescopeHelper

TelescopeHelper：建立地面观察相机目标、经纬地标、飞行过渡和方位/仰角读数。 继承：`无显式继承`。源码 [eyes/src/engine/core/Unidentified1069.js:6](../../eyes/src/engine/core/Unidentified1069.js#L6)。

- `constructor(t, entity)`：【结构证据】写入 `camera`、`cameraTarget`、`entity`、`fixedController`、`pioneer`、`scene`；调用 `t.scene.addEntity`、`t.scene.getEntity`、`this.cameraTarget.addController`、`this.cameraTarget.getController`。 源码 eyes/src/engine/core/Unidentified1069.js:7；参数 (t, entity)。
- `reset()`：【结构证据】写入 `entity`；调用 `this.removePlacemark`、`this.scene.getEntity`、`this.scene.removeEntity`。 源码 eyes/src/engine/core/Unidentified1069.js:16；参数 ()。
- `setPickedLocation(t)`：【结构证据】返回 `e`；调用 `e.addController`、`e.getParent`、`e.setCanOcclude`、`e.setOcclusionRadius`、`e.setParent`、`t.getName`。 源码 eyes/src/engine/core/Unidentified1069.js:21；参数 (t)。
- `addPlacemark(t, e, i)`：【结构证据】返回 `o`；调用 `SolarSystemSceneExports.Placemarks.addPlacemark`、`o.setParent`、`this.removePlacemark`、`this.scene.getEntity`、`this.scene.removeEntity`、`this.setPickedLocation`。 源码 eyes/src/engine/core/Unidentified1069.js:34；参数 (t, e, i)。
- `removePlacemark(t="placemark")`：【结构证据】调用 `this.scene.getEntity`、`this.scene.removeEntity`。 源码 eyes/src/engine/core/Unidentified1069.js:43；参数 (t="placemark")。
- `flyToSurface(t, e)`：【结构证据】调用 `Math.cos`、`Math.sin`、`SolarSystemSceneExports.Cameras.goToEntity`、`SolarSystemSceneExports.Cameras.goToEntity(this.camera,this.cameraTarget,{destination:h,up:true,zoom:false}).catch`、`d.setEnabled`、`h.rotate`。 源码 eyes/src/engine/core/Unidentified1069.js:46；参数 (t, e)。
- `readCameraAE()`：【结构证据】返回 `t`；调用 `this.getAEFromEntity`。 源码 eyes/src/engine/core/Unidentified1069.js:74；参数 ()。
- `getAEFromEntity(t, e)`：【结构证据】调用 `(90-Pioneer.MathUtils.radToDeg(o.azimuth)).toFixed`、`Pioneer.AER.pool.get`、`Pioneer.AER.pool.release`、`Pioneer.MathUtils.radToDeg`、`Pioneer.MathUtils.radToDeg(o.elevation).toFixed`、`Pioneer.MathUtils.wrap`。 源码 eyes/src/engine/core/Unidentified1069.js:82；参数 (t, e)。
- `getAzimuthElevation()`：【结构证据】返回 `null` 或 `{azimuth:azimuth,elevation:elevation}`；调用 `this.readCameraAE`。 源码 eyes/src/engine/core/Unidentified1069.js:100；参数 ()。
- `getLatitudeLongitude(t)`：【结构证据】返回 `null` 或 `null==n.latitude||null==n.longitude?null:n`；调用 `Pioneer.LatLonAlt.pool.get`、`Pioneer.LatLonAlt.pool.release`、`Pioneer.MathUtils.radToDeg`、`e.llaFromXYZ`、`t.isNaN`、`this.entity.getComponent`。 源码 eyes/src/engine/core/Unidentified1069.js:121；参数 (t)。
- `getPositionFromLatitudeLongitude(t, e)`：【结构证据】返回 `null` 或 `vector3`；调用 `Pioneer.MathUtils.degToRad`、`i.xyzFromLLA`、`new Pioneer.LatLonAlt`、`new Pioneer.Vector3`、`this.entity.getComponent`。 源码 eyes/src/engine/core/Unidentified1069.js:133；参数 (t, e)。
- `formatLatitudeLongitude(t, e)`：【结构证据】返回 `{latitude:t<0?Math.abs(t).toFixed(2)+"°S":t.toFixed(2)+"°N",longitude:e<0?Math.abs(e).toFixed(2)+"°W":e.toFixed(2)+"°E"}`；调用 `Math.abs`、`Math.abs(e).toFixed`、`Math.abs(t).toFixed`、`e.toFixed`、`t.toFixed`。 源码 eyes/src/engine/core/Unidentified1069.js:143；参数 (t, e)。
- `getUnformattedLatOrLon(t, e)`：【结构证据】返回 `s`；调用 `i.split`、`parseFloat`、`t.includes`、`t.replace`。 源码 eyes/src/engine/core/Unidentified1069.js:149；参数 (t, e)。

### `eyes/src/engine/core/Unidentified1081.js`

2023 日环食故事定义：图层进入/退出、地月日观察按钮、影锥/轮廓纹理开关与状态恢复。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ../solar-system/public-api.js`。
- 证据：`顶层副作用 defaultExport={type:"nonsequential",entities:["moon"],onEnter:async t=>{const layerManager=t.getManager("layer");const layerPanelComponent=t.getComponent("layerPanel");t.getManager("time").resetLimits();["asteroids","com`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified1082.js`

2024 日全食故事定义：地理城市/遮挡百分比标记、日食时间段、视角与贴图切换。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ../solar-system/public-api.js`。
- 证据：`顶层副作用 defaultExport={type:"nonsequential",entities:["earth","moon"],onEnter:async t=>{const layerManager=t.getManager("layer");const layerPanelComponent=t.getComponent("layerPanel");t.getManager("time").resetLimits();const r=t`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified1083.js`

土卫二发现故事定义：围绕 Enceladus 的幻灯片、介绍内容和相机/图层操作。

- 证据：`import ../pioneer/index.js`。
- 证据：`顶层副作用 defaultExport={type:"nonsequential",entities:["sc_cassini","enceladus"],onEnter:async t=>{const layerManager=t.getManager("layer");const layerPanelComponent=t.getComponent("layerPanel");["asteroids","comets","dwarfPlanet`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified1084.js`

旅行者大巡游故事定义：任务阶段、时间和视角的叙事配置。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ../solar-system/public-api.js`。
- 证据：`顶层副作用 defaultExport={type:"nonsequential",entities:["sc_voyager_1","sc_voyager_2"],onEnter:async t=>{const layerManager=t.getManager("layer");const layerPanelComponent=t.getComponent("layerPanel");["asteroids","comets","dwarfP`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified1085.js`

帕克太阳探测器近日点故事定义，协调 2024-12-24 事件时间和观察步骤。

- 证据：`顶层副作用 defaultExport={type:"nonsequential",entities:["sc_parker_solar_probe"],onEnter:async t=>{t.getManager("layer").toggleLayer("spacecraft",{},false);},slides:[{id:"slide_1",type:"overlay",classList:["opaque","black"],conten`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified511.js`

应用可配置设置项表，包含详情面板、NASA 标志、搜索、分享等开关。

- 证据：`顶层副作用 defaultExport=[{groupName:"User Interface",isAdvanced:false,items:[{name:"Show Detail Panel",description:"Displays the detail panel for an entity on the left side of the screen",query:"detailPanel",type:"checkbox",inputD`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified694.js`

实体注册数据模块：调用 Entity.register 声明 j2000_ecliptic 等 天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`顶层副作用 Entity.Entity.register({j2000_ecliptic:{label:"J2000 Ecliptic",extentsRadius:1e-5,parents:[[Number.NEGATIVE_INFINITY,"sun"]],controllers:[{type:"fixed",position:Pioneer.Vector3.Zero,orientation:new Pioneer.Quaternion(.97`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified695.js`

实体注册数据模块：调用 Entity.register 声明 observable_universe 等 天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`import ./SceneHelpers.js`。
- 证据：`顶层副作用 Entity.Entity.register({observable_universe:{groups:["stars"],radius:5e23,systemRadius:5e23,label:"Observable Universe",parents:[],controllers:[{type:"fixed",position:Pioneer.Vector3.Zero,orientation:Pioneer.Quaternion.I`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified696.js`

实体注册数据模块：调用 Entity.register 声明  天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`顶层副作用 Entity.Entity.register({"1_ceres":{groups:["dwarf planets"],radius:473,label:"Ceres",parents:[[Number.NEGATIVE_INFINITY,"sun"]],trail:{length:void 0},spheroid:{equatorialRadius:482.6,polarRadius:445.6,planetographic:fals`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified697.js`

实体注册数据模块：调用 Entity.register 声明  天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`import ./EntityUtils.js`。
- 证据：`顶层副作用 Entity.Entity.register({"1i_oumuamua":{groups:["comets"],occlusionRadius:.03,extentsRadius:.225,label:"ʻOumuamua",parents:[[Number.NEGATIVE_INFINITY,"sun"]],trail:{length:void 0},model:{url:"$STATIC_ASSETS_URL/models/1i_`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified701.js`

实体注册数据模块：调用 Entity.register 声明 aitne 等 天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`顶层副作用 Entity.Entity.register({aitne:{groups:["jupiter","moons","irregular","carme"],radius:1.5,label:"Aitne",parents:[[Number.NEGATIVE_INFINITY,"jupiter"]],trail:{length:void 0,color:[.95,.71,.64,.7]},model:{url:"$STATIC_ASSET`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified703.js`

实体注册数据模块：调用 Entity.register 声明 despina 等 天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`顶层副作用 Entity.Entity.register({despina:{groups:["neptune","moons","regular"],radius:90,label:"Despina",parents:[[Number.NEGATIVE_INFINITY,"neptune"]],trail:{length:void 0,color:[.48,.69,1,.7]},model:{url:"$STATIC_ASSETS_URL/mod`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified704.js`

实体注册数据模块：调用 Entity.register 声明 dione 等 天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`import ./EntityUtils.js`。
- 证据：`顶层副作用 Entity.Entity.register({dione:{groups:["saturn","moons","inner","major"],radius:561.7,label:"Dione",parents:[[Number.NEGATIVE_INFINITY,"saturn"]],trail:{length:void 0,color:[.72,.65,.52,.7]},spheroid:{equatorialRadius:56`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified705.js`

实体注册数据模块：调用 Entity.register 声明 aegaeon 等 天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`顶层副作用 Entity.Entity.register({aegaeon:{groups:["saturn","moons","minor","ring moonlet"],radius:.12,label:"Aegaeon",parents:[[Number.NEGATIVE_INFINITY,"saturn"]],trail:{length:void 0,color:[.72,.65,.52,.7]},model:{url:"$STATIC_`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified707.js`

实体注册数据模块：调用 Entity.register 声明 belinda 等 天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`顶层副作用 Entity.Entity.register({belinda:{groups:["uranus","moons","minor","inner"],radius:45,label:"Belinda",parents:[[Number.NEGATIVE_INFINITY,"uranus"]],trail:{length:void 0,color:[.67,.92,1,.7]},model:{url:"$STATIC_ASSETS_URL`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified708.js`

实体注册数据模块：调用 Entity.register 声明 sc_3d_winds 等 天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`import ./EntityUtils.js`。
- 证据：`顶层副作用 Entity.Entity.register({sc_3d_winds:{groups:["earth","spacecraft"],occlusionRadius:.002,extentsRadius:.0025,label:"3D-Winds",parents:[[347025366.1839032,"earth"]],trail:{length:5573},controllers:[{type:"dynamo",url:"sc_3`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified709.js`

实体注册数据模块：调用 Entity.register 声明 sc_artemis_1 等 天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`顶层副作用 Entity.Entity.register({sc_artemis_1:{groups:["moon","spacecraft"],radius:.005,label:"Artemis I",parents:[[721860361,"earth"],[724052473,""]],trail:{length:void 0},model:{url:"$STATIC_ASSETS_URL/models/sc_artemis/artemis`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified710.js`

实体注册数据模块：调用 Entity.register 声明 sc_escapade_blue 等 天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`顶层副作用 Entity.Entity.register({sc_escapade_blue:{groups:["mars","spacecraft"],radius:.001,label:"ESCAPADE Blue",parents:[[816342898,"earth"],[847971260,"sun"],[873517951,"mars"]],trail:{length:2419200},model:{url:"$STATIC_ASSET`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified711.js`

实体注册数据模块：调用 Entity.register 声明 sc_messenger 等 天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`顶层副作用 Entity.Entity.register({sc_messenger:{groups:["mercury","spacecraft"],occlusionRadius:.00133,extentsRadius:.0035,label:"MESSENGER",parents:[[144789279.39320505,"earth"],[145066469,"sun"],[175801890,"earth"],[176659095,"s`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified712.js`

实体注册数据模块：调用 Entity.register 声明 sc_juno 等 天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`import ../controllers/KeyframePointingController.js`。
- 证据：`import ../controllers/KeyframeSpinController.js`。
- 证据：`顶层副作用 Entity.Entity.register({sc_juno:{groups:["jupiter","spacecraft"],occlusionRadius:.001732,extentsRadius:.01,label:"Juno",parents:[[365836752.1832,"earth"],[366088266.183,"sun"],[434433667.182,"earth"],[434793667.182,"sun"`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified713.js`

实体注册数据模块：调用 Entity.register 声明 sc_dart 等 天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Animation.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`顶层副作用 Entity.Entity.register({sc_dart:{groups:["small body spacecraft","asteroid spacecraft","65803_didymos","dimorphos","spacecraft"],occlusionRadius:.0012,extentsRadius:.00625,label:"DART",parents:[[691007069,"earth"],[69141`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified715.js`

实体注册数据模块：调用 Entity.register 声明 sc_biosentinel 等 天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`顶层副作用 Entity.Entity.register({sc_biosentinel:{groups:["sun","spacecraft"],occlusionRadius:2e-4,extentsRadius:5e-4,label:"BioSentinel",parents:[[721866289,"earth"],[722273637,"moon"],[722923565,"sun"]],trail:{length:void 0},mod`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified716.js`

实体注册数据模块：调用 Entity.register 声明 sc_magellan 等 天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`顶层副作用 Entity.Entity.register({sc_magellan:{groups:["venus","spacecraft"],occlusionRadius:.0032,extentsRadius:.006,label:"Magellan",parents:[[-336388283.36,"sun"],[-296448521.457,"venus"],[-164631538.81763855,""]],trail:{length`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified717.js`

实体注册数据模块：调用 Entity.register 声明 rose_bowl 等 天体/参考系的父级、半径、组件和运动控制器；是运行时工厂输入而不是新实体类。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ./Entity-567.js`。
- 证据：`顶层副作用 Entity.Entity.register({rose_bowl:{groups:["comparison"],radius:.15,label:"Rose Bowl",parents:[],model:{url:"$STATIC_ASSETS_URL/models/comparison/rose_bowl/rose_bowl.gltf",rotate:[{x:90},{z:-90}]},controllers:[{type:"fix`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified738.js`

通过副作用导入多组 extracted 样式，不导出业务类。

- 证据：`import ../../styles/extracted/Unidentified739.js`。
- 证据：`import ../../styles/extracted/Unidentified740.js`。
- 证据：`import ../../styles/extracted/Unidentified741.js`。
- 证据：`import ../../styles/extracted/Unidentified742.js`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified752.js`

高清地表影像配置表，包含地球 VIIRS、火星 Viking、月球 LRO 的 WMTS 图源。

- 证据：`顶层副作用 defaultExport={earth:[{id:"viirs",title:"High-quality global mosaic from yesterday",description:"This daily global mosaic is from the Visible Infrared Imaging Radiometer Suite (VIIRS), which is one of the key instruments`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Unidentified753.js`

木星/土星磁场、极光和辐射带功能介绍表；部分描述仍为 DESCRIPTION 占位。

- 证据：`顶层副作用 defaultExport={jupiter:[{id:"magnetosphere",title:"Jupiter's Magnetic Field",description:"DESCRIPTION"},{id:"auroras",title:"Jupiter's Auroras",description:"DESCRIPTION"},{id:"radiationBelt",title:"Jupiter's Radiation Be`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Vector2.js`

二维向量代数、插值和池化。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`Vector2 @3`。

#### Vector2

二维向量代数、插值和池化。 继承：`无显式继承`。源码 [eyes/src/engine/core/Vector2.js:3](../../eyes/src/engine/core/Vector2.js#L3)。

- `constructor(t=0, e=0)`：【结构证据】写入 `_x`、`_y`。 源码 eyes/src/engine/core/Vector2.js:13；参数 (t=0, e=0)。
- `get x()`：【结构证据】读取访问器，返回 `this._x`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Vector2.js:36；参数 ()。
- `set x(t)`：【结构证据】写入访问器，接收参数 (t)；实际写入 `_x`。源码 eyes/src/engine/core/Vector2.js:43；参数 (t)。
- `get y()`：【结构证据】读取访问器，返回 `this._y`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Vector2.js:50；参数 ()。
- `set y(t)`：【结构证据】写入访问器，接收参数 (t)；实际写入 `_y`。源码 eyes/src/engine/core/Vector2.js:57；参数 (t)。
- `method toString()`：【结构证据】本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Vector2.js:63；参数 ()。
- `equals(t)`：【结构证据】返回 `this._x===t.x&&this._y===t.y`。 源码 eyes/src/engine/core/Vector2.js:32；参数 (t)。
- `isZero()`：【结构证据】返回 `0===this._x&&0===this._y`。 源码 eyes/src/engine/core/Vector2.js:35；参数 ()。
- `isNaN()`：【结构证据】返回 `this._x!=this._x||this._y!=this._y`。 源码 eyes/src/engine/core/Vector2.js:38；参数 ()。
- `copy(t)`：【结构证据】写入 `_x`、`_y`。 源码 eyes/src/engine/core/Vector2.js:41；参数 (t)。
- `copyFromThreeJs(t)`：【结构证据】写入 `_x`、`_y`。 源码 eyes/src/engine/core/Vector2.js:45；参数 (t)。
- `set(t, e)`：【结构证据】写入 `_x`、`_y`。 源码 eyes/src/engine/core/Vector2.js:49；参数 (t, e)。
- `neg(t)`：【结构证据】写入 `_x`、`_y`。 源码 eyes/src/engine/core/Vector2.js:53；参数 (t)。
- `add(t, e)`：【结构证据】写入 `_x`、`_y`。 源码 eyes/src/engine/core/Vector2.js:57；参数 (t, e)。
- `sub(t, e)`：【结构证据】写入 `_x`、`_y`。 源码 eyes/src/engine/core/Vector2.js:61；参数 (t, e)。
- `mult(t, e)`：【结构证据】写入 `_x`、`_y`。 源码 eyes/src/engine/core/Vector2.js:65；参数 (t, e)。
- `addMult(t, e, i)`：【结构证据】写入 `_x`、`_y`。 源码 eyes/src/engine/core/Vector2.js:69；参数 (t, e, i)。
- `div(t, e)`：【结构证据】写入 `_x`、`_y`。 源码 eyes/src/engine/core/Vector2.js:73；参数 (t, e)。
- `scale(t, e)`：【结构证据】写入 `_x`、`_y`。 源码 eyes/src/engine/core/Vector2.js:77；参数 (t, e)。
- `scaleInv(t, e)`：【结构证据】写入 `_x`、`_y`。 源码 eyes/src/engine/core/Vector2.js:81；参数 (t, e)。
- `dot(t)`：【结构证据】返回 `this._x*t.x+this._y*t.y`。 源码 eyes/src/engine/core/Vector2.js:85；参数 (t)。
- `cross(t)`：【结构证据】返回 `this._x*t.y-this._y*t.x`。 源码 eyes/src/engine/core/Vector2.js:88；参数 (t)。
- `magnitudeSqr()`：【结构证据】返回 `this._x*this._x+this._y*this._y`。 源码 eyes/src/engine/core/Vector2.js:91；参数 ()。
- `magnitude()`：【结构证据】返回 `Math.sqrt(this.magnitudeSqr())`；调用 `Math.sqrt`、`this.magnitudeSqr`。 源码 eyes/src/engine/core/Vector2.js:94；参数 ()。
- `normalize(t)`：【结构证据】写入 `_x`、`_y`；调用 `t.magnitude`。 源码 eyes/src/engine/core/Vector2.js:97；参数 (t)。
- `setMagnitude(t, e)`：【结构证据】写入 `_x`、`_y`；调用 `this.normalize`。 源码 eyes/src/engine/core/Vector2.js:101；参数 (t, e)。
- `distance(t)`：【结构证据】返回 `Math.sqrt(e*e+i*i)`；调用 `Math.sqrt`。 源码 eyes/src/engine/core/Vector2.js:106；参数 (t)。
- `angle(t)`：【结构证据】返回 `e>0?Math.acos(PioneerPublicApi.MathUtils.clamp(this.dot(t)/e,-1,1)):Number.NaN`；调用 `Math.acos`、`PioneerPublicApi.MathUtils.clamp`、`t.magnitude`、`this.dot`、`this.magnitude`。 源码 eyes/src/engine/core/Vector2.js:111；参数 (t)。
- `clamp(t, e, i)`：【结构证据】写入 `_x`、`_y`；调用 `PioneerPublicApi.MathUtils.clamp`。 源码 eyes/src/engine/core/Vector2.js:115；参数 (t, e, i)。
- `lerp(t, e, i)`：【结构证据】写入 `_x`、`_y`；调用 `PioneerPublicApi.MathUtils.lerp`。 源码 eyes/src/engine/core/Vector2.js:119；参数 (t, e, i)。

### `eyes/src/engine/core/Vector3.js`

三维向量代数、旋转、插值和池化。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`Vector3 @3`。

#### Vector3

三维向量代数、旋转、插值和池化。 继承：`无显式继承`。源码 [eyes/src/engine/core/Vector3.js:3](../../eyes/src/engine/core/Vector3.js#L3)。

- `constructor(t=0, e=0, i=0)`：【结构证据】写入 `_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Vector3.js:15；参数 (t=0, e=0, i=0)。
- `get x()`：【结构证据】读取访问器，返回 `this._x`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Vector3.js:39；参数 ()。
- `set x(t)`：【结构证据】写入访问器，接收参数 (t)；实际写入 `_x`。源码 eyes/src/engine/core/Vector3.js:46；参数 (t)。
- `get y()`：【结构证据】读取访问器，返回 `this._y`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Vector3.js:53；参数 ()。
- `set y(t)`：【结构证据】写入访问器，接收参数 (t)；实际写入 `_y`。源码 eyes/src/engine/core/Vector3.js:60；参数 (t)。
- `get z()`：【结构证据】读取访问器，返回 `this._z`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Vector3.js:67；参数 ()。
- `set z(t)`：【结构证据】写入访问器，接收参数 (t)；实际写入 `_z`。源码 eyes/src/engine/core/Vector3.js:74；参数 (t)。
- `method toString()`：【结构证据】本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/Vector3.js:80；参数 ()。
- `equals(t)`：【结构证据】返回 `this._x===t.x&&this._y===t.y&&this._z===t.z`。 源码 eyes/src/engine/core/Vector3.js:41；参数 (t)。
- `isZero()`：【结构证据】返回 `0===this._x&&0===this._y&&0===this._z`。 源码 eyes/src/engine/core/Vector3.js:44；参数 ()。
- `isNaN()`：【结构证据】返回 `this._x!=this._x||this._y!=this._y||this._z!=this._z`。 源码 eyes/src/engine/core/Vector3.js:47；参数 ()。
- `copy(t)`：【结构证据】写入 `_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Vector3.js:50；参数 (t)。
- `copyFromThreeJs(t)`：【结构证据】写入 `_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Vector3.js:55；参数 (t)。
- `set(t, e, i)`：【结构证据】写入 `_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Vector3.js:60；参数 (t, e, i)。
- `setFromAER(t)`：【结构证据】写入 `_x`、`_y`、`_z`；调用 `Math.cos`、`Math.sin`。 源码 eyes/src/engine/core/Vector3.js:65；参数 (t)。
- `neg(t)`：【结构证据】写入 `_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Vector3.js:71；参数 (t)。
- `add(t, e)`：【结构证据】写入 `_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Vector3.js:76；参数 (t, e)。
- `sub(t, e)`：【结构证据】写入 `_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Vector3.js:81；参数 (t, e)。
- `mult(t, e)`：【结构证据】写入 `_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Vector3.js:86；参数 (t, e)。
- `addMult(t, e, i)`：【结构证据】写入 `_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Vector3.js:91；参数 (t, e, i)。
- `div(t, e)`：【结构证据】写入 `_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Vector3.js:96；参数 (t, e)。
- `scale(t, e)`：【结构证据】写入 `_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Vector3.js:101；参数 (t, e)。
- `scaleInv(t, e)`：【结构证据】写入 `_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Vector3.js:106；参数 (t, e)。
- `dot(t)`：【结构证据】返回 `this._x*t.x+this._y*t.y+this._z*t.z`。 源码 eyes/src/engine/core/Vector3.js:111；参数 (t)。
- `cross(t, e)`：【结构证据】写入 `_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Vector3.js:114；参数 (t, e)。
- `magnitudeSqr()`：【结构证据】返回 `this._x*this._x+this._y*this._y+this._z*this._z`。 源码 eyes/src/engine/core/Vector3.js:122；参数 ()。
- `magnitude()`：【结构证据】返回 `Math.sqrt(this.magnitudeSqr())`；调用 `Math.sqrt`、`this.magnitudeSqr`。 源码 eyes/src/engine/core/Vector3.js:125；参数 ()。
- `magnitudeXY()`：【结构证据】返回 `Math.sqrt(this._x*this._x+this._y*this._y)`；调用 `Math.sqrt`。 源码 eyes/src/engine/core/Vector3.js:128；参数 ()。
- `normalize(t)`：【结构证据】写入 `_x`、`_y`、`_z`；调用 `t.magnitude`、`this.copy`。 源码 eyes/src/engine/core/Vector3.js:131；参数 (t)。
- `setMagnitude(t, e)`：【结构证据】写入 `_x`、`_y`、`_z`；调用 `this.normalize`。 源码 eyes/src/engine/core/Vector3.js:135；参数 (t, e)。
- `distance(t)`：【结构证据】返回 `Math.sqrt(e*e+i*i+s*s)`；调用 `Math.sqrt`。 源码 eyes/src/engine/core/Vector3.js:141；参数 (t)。
- `angle(t)`：【结构证据】返回 `e>0?Math.acos(PioneerPublicApi.MathUtils.clamp(this.dot(t)/e,-1,1)):Number.NaN`；调用 `Math.acos`、`PioneerPublicApi.MathUtils.clamp`、`t.magnitude`、`this.dot`、`this.magnitude`。 源码 eyes/src/engine/core/Vector3.js:147；参数 (t)。
- `angleAroundAxis(t, e)`：【结构证据】返回 `n`；调用 `Vector3.pool.get`、`Vector3.pool.release`、`i.addMult`、`i.angle`、`i.cross`、`i.dot`。 源码 eyes/src/engine/core/Vector3.js:151；参数 (t, e)。
- `clamp(t, e, i)`：【结构证据】写入 `_x`、`_y`、`_z`；调用 `PioneerPublicApi.MathUtils.clamp`。 源码 eyes/src/engine/core/Vector3.js:163；参数 (t, e, i)。
- `lerp(t, e, i)`：【结构证据】写入 `_x`、`_y`、`_z`；调用 `PioneerPublicApi.MathUtils.lerp`。 源码 eyes/src/engine/core/Vector3.js:168；参数 (t, e, i)。
- `slerp(t, e, i)`：【结构证据】调用 `Math.abs`、`Math.acos`、`Math.sin`、`PioneerPublicApi.MathUtils.clamp`、`e.magnitude`、`t.dot`。 源码 eyes/src/engine/core/Vector3.js:173；参数 (t, e, i)。
- `rotate(t, e)`：【结构证据】写入 `_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Vector3.js:187；参数 (t, e)。
- `rotateInverse(t, e)`：【结构证据】写入 `_x`、`_y`、`_z`。 源码 eyes/src/engine/core/Vector3.js:196；参数 (t, e)。
- `setNormalTo(t, e)`：【结构证据】写入 `_x`、`_y`、`_z`；调用 `this.normalize`。 源码 eyes/src/engine/core/Vector3.js:205；参数 (t, e)。
- `fromAER(t)`：【结构证据】返回 `vector3`；调用 `new Vector3`、`vector3.setFromAER`。 源码 eyes/src/engine/core/Vector3.js:214；参数 (t)。

### `eyes/src/engine/core/Version-84.js`

Pioneer 引擎版本字面量 70.1.0。


无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/Viewport.js`

维护视口 DOM 和矩形、绑定相机、换算屏幕坐标并以 scissor 分区渲染。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`Viewport extends PioneerPublicApi.CollectionItem @3`。

#### Viewport

维护视口 DOM 和矩形、绑定相机、换算屏幕坐标并以 scissor 分区渲染。 继承：`PioneerPublicApi.CollectionItem`。源码 [eyes/src/engine/core/Viewport.js:3](../../eyes/src/engine/core/Viewport.js#L3)。

- `constructor(t, e)`：【结构证据】写入 `_backgroundColor`、`_bounds`、`_camera`、`_div`、`_div.id`、`_div.style.overflow`、`_div.style.position`、`_enabled`；调用 `document.createElement`、`n.__setActiveViewport`、`n.getActiveViewport`、`new PioneerPublicApi.Color`、`new PioneerPublicApi.Rect`、`new PioneerPublicApi.THREE.Color`。 源码 eyes/src/engine/core/Viewport.js:4；参数 (t, e)。
- `getEngine()`：【结构证据】返回 `this.__getCollectionParent()`；调用 `this.__getCollectionParent`。 源码 eyes/src/engine/core/Viewport.js:22；参数 ()。
- `getDiv()`：【结构证据】返回 `this._div`。 源码 eyes/src/engine/core/Viewport.js:25；参数 ()。
- `getBounds()`：【结构证据】返回 `this._bounds`。 源码 eyes/src/engine/core/Viewport.js:28；参数 ()。
- `getBackgroundColor()`：【结构证据】返回 `this._backgroundColor`。 源码 eyes/src/engine/core/Viewport.js:31；参数 ()。
- `setBackgroundColor(t)`：【结构证据】调用 `this._backgroundColor.copy`、`this._threeJsBackgroundColor.setRGB`。 源码 eyes/src/engine/core/Viewport.js:34；参数 (t)。
- `getCamera()`：【结构证据】返回 `this._camera`。 源码 eyes/src/engine/core/Viewport.js:38；参数 ()。
- `setCamera(camera)`：【结构证据】写入 `_camera`；调用 `this._camera.__setViewport`。 源码 eyes/src/engine/core/Viewport.js:41；参数 (camera)。
- `isEnabled()`：【结构证据】返回 `this._enabled`。 源码 eyes/src/engine/core/Viewport.js:46；参数 ()。
- `setEnabled(enabled)`：【结构证据】写入 `_div.style.display`、`_enabled`。 源码 eyes/src/engine/core/Viewport.js:49；参数 (enabled)。
- `getNormalSpacePositionFromPixelSpacePosition(t, e)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/core/Viewport.js:53；参数 (t, e)。
- `getPixelSpacePositionFromNormalSpacePosition(t, e)`：【结构证据】调用 `t.copy`。 源码 eyes/src/engine/core/Viewport.js:58；参数 (t, e)。
- `getPixelSpaceRadiusFromNormalSpaceRadius(t)`：【结构证据】返回 `t*Math.max(this._bounds.size.x,this._bounds.size.y)`；调用 `Math.max`。 源码 eyes/src/engine/core/Viewport.js:61；参数 (t)。
- `getNormalSpaceRadiusFromPixelSpaceRadius(t)`：【结构证据】返回 `t/Math.max(this._bounds.size.x,this._bounds.size.y)`；调用 `Math.max`。 源码 eyes/src/engine/core/Viewport.js:64；参数 (t)。
- `getDirectionOfCursor(t)`：【结构证据】返回 `void t.copy(PioneerPublicApi.Vector3.NaN)`；调用 `e.getCameraSpacePositionFromNormalSpacePosition`、`i.getCursorPosition`、`t.copy`、`t.normalize`、`this.getCamera`、`this.getEngine`。 源码 eyes/src/engine/core/Viewport.js:67；参数 (t)。
- `__destroy()`：【结构证据】调用 `super.__destroy`、`this._div.remove`。 源码 eyes/src/engine/core/Viewport.js:74；参数 ()。
- `__updateViewportVariables()`：【结构证据】调用 `this._bounds.set`、`this._camera.__updateCameraVariablesForConnectedScene`。 源码 eyes/src/engine/core/Viewport.js:78；参数 ()。
- `__render()`：【结构证据】返回 `void`；调用 `t.setClearColor`、`t.setScissor`、`t.setViewport`、`this._camera.__prepareForRender`、`this._camera.__render`、`this._threeJsBackgroundColor.setRGB`。 源码 eyes/src/engine/core/Viewport.js:81；参数 ()。

### `eyes/src/engine/core/VisibleInterval.js`

以距离、像素/法线半径等量计算组件可见范围及边缘透明度。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`VisibleInterval @3`。

#### VisibleInterval

以距离、像素/法线半径等量计算组件可见范围及边缘透明度。 继承：`无显式继承`。源码 [eyes/src/engine/core/VisibleInterval.js:3](../../eyes/src/engine/core/VisibleInterval.js#L3)。

- `constructor(min=0, max=0, minSpace="pixel-radius", maxSpace=minSpace, fadeBlur=.5)`：【结构证据】写入 `_fadeBlur`、`_max`、`_maxSpace`、`_min`、`_minSpace`。 源码 eyes/src/engine/core/VisibleInterval.js:7；参数 (min=0, max=0, minSpace="pixel-radius", maxSpace=minSpace, fadeBlur=.5)。
- `get min()`：【结构证据】读取访问器，返回 `this._min`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/VisibleInterval.js:33；参数 ()。
- `set min(min)`：【结构证据】写入访问器，接收参数 (min)；实际写入 `_min`。源码 eyes/src/engine/core/VisibleInterval.js:40；参数 (min)。
- `get max()`：【结构证据】读取访问器，返回 `this._max`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/VisibleInterval.js:47；参数 ()。
- `set max(max)`：【结构证据】写入访问器，接收参数 (max)；实际写入 `_max`。源码 eyes/src/engine/core/VisibleInterval.js:54；参数 (max)。
- `minSpace()`：【结构证据】返回 `this._minSpace`。 源码 eyes/src/engine/core/VisibleInterval.js:26；参数 ()。
- `maxSpace()`：【结构证据】返回 `this._maxSpace`。 源码 eyes/src/engine/core/VisibleInterval.js:29；参数 ()。
- `get fadeBlur()`：【结构证据】读取访问器，返回 `this._fadeBlur`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/VisibleInterval.js:73；参数 ()。
- `set fadeBlur(fadeBlur)`：【结构证据】写入访问器，接收参数 (fadeBlur)；实际写入 `_fadeBlur`。源码 eyes/src/engine/core/VisibleInterval.js:80；参数 (fadeBlur)。
- `method toString()`：【结构证据】本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/core/VisibleInterval.js:86；参数 ()。
- `copy(t)`：【结构证据】写入 `_fadeBlur`、`_max`、`_maxSpace`、`_min`、`_minSpace`。 源码 eyes/src/engine/core/VisibleInterval.js:41；参数 (t)。
- `set(min, max)`：【结构证据】写入 `_max`、`_min`。 源码 eyes/src/engine/core/VisibleInterval.js:48；参数 (min, max)。
- `length()`：【结构证据】返回 `this._max-this._min`。 源码 eyes/src/engine/core/VisibleInterval.js:52；参数 ()。
- `clamp(t)`：【结构证据】返回 `Math.min(Math.max(this._min,t),this._max)`；调用 `Math.max`、`Math.min`。 源码 eyes/src/engine/core/VisibleInterval.js:55；参数 (t)。
- `expandTo(t)`：【结构证据】写入 `_max`、`_min`；调用 `Math.max`、`Math.min`。 源码 eyes/src/engine/core/VisibleInterval.js:58；参数 (t)。
- `contains(t)`：【结构证据】返回 `this._min<=t&&t<this._max`。 源码 eyes/src/engine/core/VisibleInterval.js:62；参数 (t)。
- `intersects(t)`：【结构证据】返回 `this._min<t.max&&t.min<this._max`。 源码 eyes/src/engine/core/VisibleInterval.js:65；参数 (t)。
- `intersection(t, e)`：【结构证据】写入 `_max`、`_min`；调用 `Math.max`、`Math.min`。 源码 eyes/src/engine/core/VisibleInterval.js:68；参数 (t, e)。
- `union(t, e)`：【结构证据】写入 `_max`、`_min`；调用 `Math.max`、`Math.min`。 源码 eyes/src/engine/core/VisibleInterval.js:73；参数 (t, e)。
- `getFadeMultiplier(t, e)`：【结构证据】返回 `Math.min(o,r)`；调用 `Math.abs`、`Math.min`、`PioneerPublicApi.MathUtils.clamp01`、`PioneerPublicApi.Vector3.pool.get`、`PioneerPublicApi.Vector3.pool.release`、`o.rotateInverse`。 源码 eyes/src/engine/core/VisibleInterval.js:77；参数 (t, e)。

### `eyes/src/engine/core/assertIsShader.js`

检查对象是否满足着色器描述结构并在无效时抛错。

- 证据：`import ./JsonHelper.js`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/version-8.js`

应用库版本字面量 v2.6.1。


无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/core/waitUntil.js`

按轮询间隔等待谓词满足并提供超时错误。


无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/managers/AutoplayManager.js`

按设定实体/时间/相机序列自动播放并响应暂停/交互。

- 证据：`import ../../vendor/modules/FollowName.cjs`。
- 证据：`import ../pioneer/index.js`。
- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`AutoplayManager extends EyesPublicApi.BaseManager @6`。

#### AutoplayManager

按设定实体/时间/相机序列自动播放并响应暂停/交互。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/managers/AutoplayManager.js:6](../../eyes/src/engine/managers/AutoplayManager.js#L6)。

- `constructor(t, url)`：【结构证据】写入 `_currentIndex`、`_interval`、`_intervalTimer`、`_isPlaying`、`_resetStates`、`_slideTimer`、`_slides`、`_url`；调用 `super`、`this._eventNames.push`、`this._initCallbacks`、`this.bindFunctions`。 源码 eyes/src/engine/managers/AutoplayManager.js:7；参数 (t, url)。
- `init()`：【结构证据】写入 `_slides`；调用 `EyesPublicApi.AppUtils.loadJSON`、`console.error`。 源码 eyes/src/engine/managers/AutoplayManager.js:25；参数 ()。
- `get interval()`：【结构证据】读取访问器，返回 `this._interval`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/managers/AutoplayManager.js:58；参数 ()。
- `set interval(t)`：【结构证据】写入访问器，接收参数 (t)；实际写入 `_interval`；调用 `this._isValidTime`。源码 eyes/src/engine/managers/AutoplayManager.js:66；参数 (t)。
- `_isValidTime(t)`：【结构证据】返回 `""!==t&&!isNaN(Number(t))&&Number(t)>0`；调用 `Number`、`isNaN`。 源码 eyes/src/engine/managers/AutoplayManager.js:39；参数 (t)。
- `startAutoplay(t)`：【结构证据】写入 `_isPlaying`；调用 `this._app.getManager`、`this._app.getManager("time").resetLimits`、`this._triggerInterval`、`this.playNextSlide`、`this.triggerCallbacks`。 源码 eyes/src/engine/managers/AutoplayManager.js:42；参数 (t)。
- `_triggerInterval(t)`：【结构证据】写入 `_intervalTimer`；调用 `clearInterval`、`setInterval`、`this.playNextSlide`、`this.stopAutoplay`。 源码 eyes/src/engine/managers/AutoplayManager.js:49；参数 (t)。
- `playNextSlide(t)`：【结构证据】写入 `_currentIndex`；调用 `this.playSlide`。 源码 eyes/src/engine/managers/AutoplayManager.js:56；参数 (t)。
- `playSlide(t, e)`：【结构证据】写入 `_intervalTimer`、`_slideTimer`；返回 `void` 或 `void this._triggerInterval(e)`；调用 `EyesPublicApi.AppUtils.deepCopy`、`cameraManager.updateLighting`、`clearInterval`、`clearTimeout`、`console.error`、`contentManager.getEntityInfo`。 源码 eyes/src/engine/managers/AutoplayManager.js:61；参数 (t, e)。
- `_updateCamera(t, e={})`：【结构证据】调用 `t.category.toLowerCase`、`this._app.cameraScripts.alignObjects`、`this._app.cameraScripts.alignSpacecraftPlanet`、`this._app.cameraScripts.goToCelestialObject`、`this._app.cameraScripts.goToInstrument`、`this._app.cameraScripts.goToSpacecraft`。 源码 eyes/src/engine/managers/AutoplayManager.js:130；参数 (t, e={})。
- `stopAutoplay()`：【结构证据】写入 `_currentIndex`、`_intervalTimer`、`_isPlaying`、`_slideTimer`；返回 `void`；调用 `cameraManager.updateLighting`、`clearInterval`、`clearTimeout`、`contentManager.getEntityInfo`、`contentManager.getSpheroidId`、`layerManager.resetSpheroidMap`。 源码 eyes/src/engine/managers/AutoplayManager.js:155；参数 ()。

### `eyes/src/engine/managers/BaseManager.js`

应用管理器基类：持有 app/pioneer，管理事件名、回调登记和函数绑定。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`BaseManager @4`。

#### BaseManager

应用管理器基类：持有 app/pioneer，管理事件名、回调登记和函数绑定。 继承：`无显式继承`。源码 [eyes/src/engine/managers/BaseManager.js:4](../../eyes/src/engine/managers/BaseManager.js#L4)。

- `constructor(app)`：【结构证据】写入 `_app`、`_callbacks`、`_eventNames`、`_pioneer`。 源码 eyes/src/engine/managers/BaseManager.js:5；参数 (app)。
- `pioneer()`：【结构证据】返回 `this._pioneer`。 源码 eyes/src/engine/managers/BaseManager.js:11；参数 ()。
- `app()`：【结构证据】返回 `this._app`。 源码 eyes/src/engine/managers/BaseManager.js:14；参数 ()。
- `_initCallbacks()`：【结构证据】写入 `_callbacks[this._eventNames[t]]`。 源码 eyes/src/engine/managers/BaseManager.js:17；参数 ()。
- `registerCallback(t, e)`：【结构证据】调用 `this._callbacks[t].includes`、`this._callbacks[t].push`、`this._eventNames.indexOf`。 源码 eyes/src/engine/managers/BaseManager.js:20；参数 (t, e)。
- `removeCallback(t, e)`：【结构证据】返回 `void`；调用 `this._callbacks[t].indexOf`、`this._callbacks[t].splice`、`this._eventNames.indexOf`。 源码 eyes/src/engine/managers/BaseManager.js:23；参数 (t, e)。
- `triggerCallbacks(t, e=[])`：【结构证据】调用 `0,this._callbacks[t][i]`。 源码 eyes/src/engine/managers/BaseManager.js:28；参数 (t, e=[])。
- `bindFunctions(t=[])`：【结构证据】调用 `e[s].bind`。 源码 eyes/src/engine/managers/BaseManager.js:33；参数 (t=[])。
- `destroy()`：【结构证据】调用 `this.__destroy`。 源码 eyes/src/engine/managers/BaseManager.js:40；参数 ()。
- `__destroy()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/managers/BaseManager.js:43；参数 ()。

### `eyes/src/engine/managers/CameraFollowManager.js`

协调跟随实体及跟随选项，将焦点变化传递给相机脚本。

- 证据：`import ../solar-system/public-api.js`。
- 证据：`import ../pioneer/index.js`。
- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`import ../../vendor/modules/FollowName.cjs`。
- 证据：`CameraFollowManager extends EyesPublicApi.BaseManager @7`。

#### CameraFollowManager

协调跟随实体及跟随选项，将焦点变化传递给相机脚本。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/managers/CameraFollowManager.js:7](../../eyes/src/engine/managers/CameraFollowManager.js#L7)。

- `constructor(t, e={})`：【结构证据】写入 `_hideSearchTimeout`、`_isEnabled`、`_offsetObserver`、`_options`、`_prevValues`、`_resizeObserver`、`_returnToPreviousCamView`、`_sumParent`；调用 `new MutationObserver`、`new ResizeObserver`、`routerManager.getValidQueries`、`routerManager.setValidQueries`、`super`、`t.forEach`。 源码 eyes/src/engine/managers/CameraFollowManager.js:8；参数 (t, e={})。
- `setFollowVars(followId)`：【结构证据】写入 `followEntity`、`followId`、`followName`；调用 `contentManager.getEntityInfo`、`this.app.getManager`、`this.app.scene.getEntity`。 源码 eyes/src/engine/managers/CameraFollowManager.js:51；参数 (followId)。
- `setToastContent({reset:t=false}={})`：【结构证据】返回 `void toastComponent.setContent("")`；调用 `["Sun","Moon","ISS"].includes`、`this.app.getComponent`、`this.triggerCallbacks`、`toastComponent.hide`、`toastComponent.setContent`、`toastContent.querySelector`。 源码 eyes/src/engine/managers/CameraFollowManager.js:67；参数 ({reset:t=false}={})。
- `showToast()`：【结构证据】调用 `this.app.getComponent`、`this.app.getComponent("toast").show`。 源码 eyes/src/engine/managers/CameraFollowManager.js:85；参数 ()。
- `validateTimeLimits()`：【结构证据】返回 `{isValid:false}` 或 `{isValid:true,minTime:u,maxTime:p}`；调用 `c.valueOf`、`d.valueOf`、`e.valueOf`、`getFollowName`、`getFollowName().max`、`getFollowName().min`。 源码 eyes/src/engine/managers/CameraFollowManager.js:88；参数 ()。
- `follow(t)`：【结构证据】写入 `_isEnabled`；返回 `void`；调用 `d`、`onLoaded.push`、`this._offsetObserver.observe`、`this._resizeObserver.observe`、`this.animateCamera`、`this.animateCamera(cameraDuration).then`。 源码 eyes/src/engine/managers/CameraFollowManager.js:144；参数 (t)。
- `unfollow()`：【结构证据】调用 `this._offsetObserver.disconnect`、`this._resizeObserver.disconnect`、`this.app.getManager`、`this.app.scene.getEntity`、`this.setFollowVars`、`this.setLabelWeight`。 源码 eyes/src/engine/managers/CameraFollowManager.js:199；参数 ()。
- `animateCamera(t)`：【结构证据】返回 `this.app.getManager("camera").followTheEntity(this.targetId,this.followId,this._sumParent.getName(),t)`；调用 `i.addEntity`、`o.setPrimaryAlignType`、`o.setPrimaryAxis`、`o.setPrimaryTargetEntity`、`r.setParent`、`r.setTransitionFunction`。 源码 eyes/src/engine/managers/CameraFollowManager.js:230；参数 (t)。
- `setParentsChangedCallbacks({targetEntity:t=this.targetEntity,reset:e=false}={})`：【结构证据】返回 `void this.followEntity?.removeParentChangedCallback(this.updateOccludedEntities)`。 源码 eyes/src/engine/managers/CameraFollowManager.js:249；参数 ({targetEntity:t=this.targetEntity,reset:e=false}={})。
- `setLabelWeight(t, e=false, i="201")`：【结构证据】写入 `_prevValues.weights[t]`；返回 `void`；调用 `labelManager.getDefaultWeight`、`labelManager.setWeight`、`this.app.getManager`。 源码 eyes/src/engine/managers/CameraFollowManager.js:260；参数 (t, e=false, i="201")。
- `updateOccludedEntities({reset:t=false}={})`：【结构证据】调用 `this.getEntitiesToUnocclude`、`this.setOcclusionProps`。 源码 eyes/src/engine/managers/CameraFollowManager.js:267；参数 ({reset:t=false}={})。
- `getEntitiesToUnocclude()`：【结构证据】返回 `[...new Set(t)].filter(Boolean)`；调用 `[...new Set(t)].filter`、`new Set`。 源码 eyes/src/engine/managers/CameraFollowManager.js:273；参数 ()。
- `setOcclusionProps(t)`：【结构证据】写入 `_prevValues.occlusion`、`_prevValues.occlusion[t]`；调用 `Object.keys`、`Object.keys(occlusion).forEach`、`e.canOcclude`、`t.forEach`、`this.app.scene.getEntity`。 源码 eyes/src/engine/managers/CameraFollowManager.js:277；参数 (t)。
- `setTargetNotClickable(t, e=false)`：【结构证据】返回 `void`；调用 `labelManager.setLabelClickable`、`this.app.getManager`。 源码 eyes/src/engine/managers/CameraFollowManager.js:292；参数 (t, e=false)。
- `_createReframeElement()`：【结构证据】写入 `_reframeElement`；调用 `document.createElement`、`staticElement.appendChild`、`staticElement.querySelector`、`this._reframeElement.classList.add`。 源码 eyes/src/engine/managers/CameraFollowManager.js:301；参数 ()。
- `_createSumParent()`：【结构证据】返回 `t`；调用 `SolarSystemSceneExports.Entity.createFromOptions`、`t.setOrientation`、`t.setPosition`。 源码 eyes/src/engine/managers/CameraFollowManager.js:307；参数 ()。
- `initSearch(t)`：【结构证据】写入 `search`、`search._config.infoText.default`；调用 `input.setAttribute`、`t.appendChild`、`t.stopPropagation`、`this.app.getComponent`、`this.search.element.addEventListener`、`this.search.element.classList.add`。 源码 eyes/src/engine/managers/CameraFollowManager.js:315；参数 (t)。
- `showSearch()`：【结构证据】调用 `this.stopHideTimeout`。 源码 eyes/src/engine/managers/CameraFollowManager.js:337；参数 ()。
- `hideSearch()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/managers/CameraFollowManager.js:342；参数 ()。
- `setTimeLimits({minTime:minTime,maxTime:maxTime,reset:i=false}={})`：【结构证据】写入 `_prevValues.timeLimits`；调用 `this.app.getManager`、`timeManager.getLimits`、`timeManager.setMax`、`timeManager.setMin`。 源码 eyes/src/engine/managers/CameraFollowManager.js:346；参数 ({minTime:minTime,maxTime:maxTime,reset:i=false}={})。
- `setYawPitchLimits()`：【结构证据】返回 `void`；调用 `a.setPitchAngleLimits`、`a.setYawAngleLimits`、`document.body.classList.contains`、`i.getComponent`、`i.getController`、`new Pioneer.Interval`。 源码 eyes/src/engine/managers/CameraFollowManager.js:371；参数 ()。
- `setSearchOptions({targetId:t=this.targetId,followId:e=this.followId,reset:i=false}={})`：【结构证据】返回 `void this.search?.setExcludeResults([])` 或 `void`；调用 `[...new Set(o)].filter`、`[t,e].filter`、`[t,e].includes`、`contentManager.getEntityDesc`、`contentManager.getEntityDesc(u).catch`、`d.getLowestCommonAncestorAtTime`。 源码 eyes/src/engine/managers/CameraFollowManager.js:392；参数 ({targetId:t=this.targetId,followId:e=this.followId,reset:i=false}={})。
- `entitiesInPlace()`：【结构证据】调用 `[this.targetId,this.followId].filter`、`this.app.scene.waitTillEntitiesInPlace`。 源码 eyes/src/engine/managers/CameraFollowManager.js:456；参数 ()。
- `update()`：【结构证据】返回 `void`；调用 `staticElement.classList.toggle`、`this._pioneer.getInput`、`this._pioneer.getInput().getDraggedOffset`、`this._pioneer.getInput().getDraggedOffset().isZero`、`this.showToast`。 源码 eyes/src/engine/managers/CameraFollowManager.js:460；参数 ()。
- `setEnabled(t, {resetLimits:e=true,removeQueries:i=["followId","time","rate"]}={})`：【结构证据】写入 `_isEnabled`；调用 `Array.isArray`、`this.app.getManager`、`this.app.getManager("router").navigate`、`this.hideSearch`、`this.initSearch`、`this.setTimeLimits`。 源码 eyes/src/engine/managers/CameraFollowManager.js:469；参数 (t, {resetLimits:e=true,removeQueries:i=["followId","time","rate"]}={})。
- `setHideTimeout()`：【结构证据】写入 `_hideSearchTimeout`；调用 `setTimeout`、`this.hideSearch`、`this.stopHideTimeout`。 源码 eyes/src/engine/managers/CameraFollowManager.js:491；参数 ()。
- `stopHideTimeout()`：【结构证据】写入 `_hideSearchTimeout`；调用 `clearTimeout`。 源码 eyes/src/engine/managers/CameraFollowManager.js:498；参数 ()。
- `targetId()`：【结构证据】返回 `_target`；调用 `this.app.getManager`、`this.app.getView`。 源码 eyes/src/engine/managers/CameraFollowManager.js:502；参数 ()。
- `targetEntity()`：【结构证据】返回 `this.app.scene.getEntity(this.targetId)`；调用 `this.app.scene.getEntity`。 源码 eyes/src/engine/managers/CameraFollowManager.js:511；参数 ()。
- `followInnerHtml()`：【结构证据】返回 `this.followName?`Following <span class='camera-follow-name'>${this.followName}</span>`:"Follow Target"`。 源码 eyes/src/engine/managers/CameraFollowManager.js:514；参数 ()。
- `isEnabled()`：【结构证据】返回 `this._isEnabled`。 源码 eyes/src/engine/managers/CameraFollowManager.js:517；参数 ()。

### `eyes/src/engine/managers/CameraManager.js`

拥有主相机目标/控制器配置，执行观察模式、相机定位、变焦和控制切换。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ../solar-system/public-api.js`。
- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`CameraManager extends EyesPublicApi.BaseManager @5`。

#### CameraManager

拥有主相机目标/控制器配置，执行观察模式、相机定位、变焦和控制切换。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/managers/CameraManager.js:5](../../eyes/src/engine/managers/CameraManager.js#L5)。

- `constructor(t, defaultScene)`：【结构证据】写入 `_cameraEntity`、`_context`、`_defaultMaxDistance`、`_defaultScene`、`_dynEnvMap`、`_fullLightColor`、`_id`、`_isFreeFly`；调用 `new Pioneer.Color`、`super`、`this.bindFunctions`、`this.toggleFreeFly`、`window.addEventListener`。 源码 eyes/src/engine/managers/CameraManager.js:6；参数 (t, defaultScene)。
- `createViewportAndCamera(defaultScene)`：【结构证据】写入 `_cameraEntity`、`_cameraLight`、`_defaultScene`、`_dynEnvMap`、`_viewport`、`_viewport.getDiv().style.height`、`_viewport.getDiv().style.left`、`_viewport.getDiv().style.top`；调用 `this._cameraEntity.addComponent`、`this._cameraEntity.getComponent`、`this._cameraEntity.setOrientation`、`this._cameraLight.setEnabled`、`this._defaultScene.addEntity`、`this._defaultScene.getEntity`。 源码 eyes/src/engine/managers/CameraManager.js:32；参数 (defaultScene)。
- `getContext()`：【结构证据】返回 `this._context`。 源码 eyes/src/engine/managers/CameraManager.js:44；参数 ()。
- `getIsTransitioning()`：【结构证据】返回 `this._isTransitioning`。 源码 eyes/src/engine/managers/CameraManager.js:47；参数 ()。
- `setIsTransitioning(isTransitioning)`：【结构证据】写入 `_isTransitioning`。 源码 eyes/src/engine/managers/CameraManager.js:50；参数 (isTransitioning)。
- `waitForTransitionComplete()`：【结构证据】返回 `new Promise(t=>{let e=setInterval(()=>{this._isTransitioning||(clearInterval(e),e=null,t(true));},1e3);})`；调用 `clearInterval`、`new Promise`、`setInterval`、`t`。 源码 eyes/src/engine/managers/CameraManager.js:53；参数 ()。
- `setContext(context)`：【结构证据】写入 `_context`、`_id`、`_previousId`；调用 `new CustomEvent`、`window.dispatchEvent`。 源码 eyes/src/engine/managers/CameraManager.js:60；参数 (context)。
- `getCurrentId()`：【结构证据】返回 `this._id`。 源码 eyes/src/engine/managers/CameraManager.js:72；参数 ()。
- `getShadowLightColor()`：【结构证据】返回 `this._shadowLightColor`。 源码 eyes/src/engine/managers/CameraManager.js:75；参数 ()。
- `getFullLightColor()`：【结构证据】返回 `this._fullLightColor`。 源码 eyes/src/engine/managers/CameraManager.js:78；参数 ()。
- `defaultScene()`：【结构证据】返回 `this._defaultScene`。 源码 eyes/src/engine/managers/CameraManager.js:81；参数 ()。
- `cameraEntity()`：【结构证据】返回 `this._cameraEntity`。 源码 eyes/src/engine/managers/CameraManager.js:84；参数 ()。
- `cameraLight()`：【结构证据】返回 `this._cameraLight`。 源码 eyes/src/engine/managers/CameraManager.js:87；参数 ()。
- `dynamicEnvMap()`：【结构证据】返回 `this._dynEnvMap`。 源码 eyes/src/engine/managers/CameraManager.js:90；参数 ()。
- `toggleCameraLight(t, e)`：【结构证据】调用 `this._cameraLight.setColor`、`this._cameraLight.setEnabled`。 源码 eyes/src/engine/managers/CameraManager.js:93；参数 (t, e)。
- `updateLighting(t)`：【结构证据】调用 `this.toggleCameraLight`。 源码 eyes/src/engine/managers/CameraManager.js:96；参数 (t)。
- `getSelectionCallback()`：【结构证据】返回 `this._selectionCallback`。 源码 eyes/src/engine/managers/CameraManager.js:99；参数 ()。
- `setSelectionCallback(selectionCallback)`：【结构证据】写入 `_selectionCallback`。 源码 eyes/src/engine/managers/CameraManager.js:102；参数 (selectionCallback)。
- `getIsFreeFly()`：【结构证据】返回 `this._isFreeFly`。 源码 eyes/src/engine/managers/CameraManager.js:105；参数 ()。
- `setUpFreeFlyCamera()`：【结构证据】调用 `this._cameraEntity.addController`、`this._cameraEntity.clearControllers`。 源码 eyes/src/engine/managers/CameraManager.js:108；参数 ()。
- `resetFreeFlyCamera()`：【结构证据】调用 `console.error`、`this.app.cameraScripts.alignSpacecraftPlanet`、`this.app.cameraScripts.goToCelestialObject`、`this.app.cameraScripts.goToInstrument`、`this.app.cameraScripts.goToSpacecraft`、`this.app.cameraScripts.goToSystem`。 源码 eyes/src/engine/managers/CameraManager.js:115；参数 ()。
- `enableFreeFly()`：【结构证据】写入 `_isFreeFly`；调用 `this.app.getComponent`、`this.setUpFreeFlyCamera`。 源码 eyes/src/engine/managers/CameraManager.js:145；参数 ()。
- `disableFreeFly()`：【结构证据】写入 `_isFreeFly`；调用 `this.app.getComponent`、`this.resetFreeFlyCamera`。 源码 eyes/src/engine/managers/CameraManager.js:152；参数 ()。
- `toggleFreeFly()`：【结构证据】返回 `void this.enableFreeFly()`；调用 `this._app.getManager`、`this._app.getManager("cameraFollow").setEnabled`、`this.disableFreeFly`、`this.enableFreeFly`、`this.waitForTransitionComplete`。 源码 eyes/src/engine/managers/CameraManager.js:157；参数 ()。
- `goToEntity(id, {camera:camera,scene:scene,destination:destination,distance:distance,cinematic:a=false,minRadius:l=.001,maxRadius:c=this._defaultMaxDistance,duration:h=.75,destinationUp:destinationUp,zoom:u=true,select:p=true,useSpheroidRadiusForDistance:_=false,roll:m=false,keyframes:keyframes,transitionFunction:transitionFunction}={})`：【结构证据】写入 `_id`、`_isTransitioning`；返回 `void(this._isTransitioning=false)`；调用 `Math.max`、`Pioneer.MathUtils.clamp01`、`SolarSystemSceneExports.Cameras.goToEntity`、`T.getEntity`、`T.waitTillEntitiesInPlace`、`console.error`。 源码 eyes/src/engine/managers/CameraManager.js:168；参数 (id, {camera:camera,scene:scene,destination:destination,distance:distance,cinematic:a=false,minRadius:l=.001,maxRadius:c=this._defaultMaxDistance,duration:h=.75,destinationUp:destinationUp,zoom:u=true,select:p=true,useSpheroidRadiusForDistance:_=false,roll:m=false,keyframes:keyframes,transitionFunction:transitionFunction}={})。
- `followTheEntity(t, e, i, o)`：【结构证据】调用 `E.getEndPromise`、`E.setParent`、`E.setTransitionFunction`、`E.setTransitionTime`、`Math.atan`、`Math.max`。 源码 eyes/src/engine/managers/CameraManager.js:251；参数 (t, e, i, o)。
- `goToBetweenPos(t, {duration:duration,destination:destination,destinationUp:destinationUp,transitionFunction:transitionFunction,zoomInterval:zoomInterval})`：【结构证据】调用 `SolarSystemSceneExports.Cameras.focusOnEntity`、`_.setCallback`、`c.setOrientation`、`c.setPosition`、`cameraEntity.addController`、`cameraEntity.clearControllers`。 源码 eyes/src/engine/managers/CameraManager.js:314；参数 (t, {duration:duration,destination:destination,destinationUp:destinationUp,transitionFunction:transitionFunction,zoomInterval:zoomInterval})。
- `zoom(t, e=this._cameraEntity)`：【结构证据】调用 `Number.isNaN`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`e.getPosition`、`e.getPosition().magnitude`、`e.setPosition`。 源码 eyes/src/engine/managers/CameraManager.js:354；参数 (t, e=this._cameraEntity)。
- `zoomIn(t=false)`：【结构证据】调用 `Math.pow`、`this.zoom`。 源码 eyes/src/engine/managers/CameraManager.js:364；参数 (t=false)。
- `zoomOut(t=false)`：【结构证据】调用 `Math.pow`、`this.zoom`。 源码 eyes/src/engine/managers/CameraManager.js:370；参数 (t=false)。
- `get defaultMaxDistance()`：【结构证据】读取访问器，返回 `this._defaultMaxDistance`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/managers/CameraManager.js:506；参数 ()。
- `set defaultMaxDistance(defaultMaxDistance)`：【结构证据】写入访问器，接收参数 (defaultMaxDistance)；实际写入 `_defaultMaxDistance`。源码 eyes/src/engine/managers/CameraManager.js:513；参数 (defaultMaxDistance)。
- `addDynamicEnvMap(t)`：【结构证据】返回 `void`；调用 `e.setDynamicEnvironmentMapComponent`、`t.getComponent`。 源码 eyes/src/engine/managers/CameraManager.js:382；参数 (t)。

### `eyes/src/engine/managers/ComparisonManager.js`

创建实体大小/属性比较场景，调整实体布局并在退出时恢复原场景状态。

- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`import ../pioneer/index.js`。
- 证据：`import ../solar-system/public-api.js`。
- 证据：`ComparisonManager extends EyesPublicApi.BaseManager @5`。

#### ComparisonManager

创建实体大小/属性比较场景，调整实体布局并在退出时恢复原场景状态。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/managers/ComparisonManager.js:5](../../eyes/src/engine/managers/ComparisonManager.js#L5)。

- `constructor(t)`：【结构证据】写入 `_activeViewports`、`_anchorEntityLeft`、`_anchorEntityRight`、`_cameraEntityLeft`、`_cameraEntityRight`、`_cameraLeft`、`_cameraLightLeft`、`_cameraLightRight`；调用 `SolarSystemSceneExports.Entity.create`、`new Pioneer.Color`、`new Pioneer.Vector3`、`super`、`this._adjustZoomFromViewport.bind`、`this._anchorEntityLeft.setOrientation`。 源码 eyes/src/engine/managers/ComparisonManager.js:6；参数 (t)。
- `entityLeft()`：【结构证据】返回 `this._entityLeft`。 源码 eyes/src/engine/managers/ComparisonManager.js:80；参数 ()。
- `entityRight()`：【结构证据】返回 `this._entityRight`。 源码 eyes/src/engine/managers/ComparisonManager.js:83；参数 ()。
- `zoomIn(t=false)`：【结构证据】调用 `Math.pow`、`cameraManager.zoom`、`this.app.getManager`。 源码 eyes/src/engine/managers/ComparisonManager.js:86；参数 (t=false)。
- `zoomOut(t=false)`：【结构证据】调用 `Math.pow`、`cameraManager.zoom`、`this.app.getManager`。 源码 eyes/src/engine/managers/ComparisonManager.js:94；参数 (t=false)。
- `compare(t, e)`：【结构证据】写入 `_entityLeft`、`_entityRight`；调用 `Math.max`、`Promise.all`、`SolarSystemSceneExports.Cameras.getDistanceToFitEntities`、`SolarSystemSceneExports.Entity.create`、`cameraManager.goToEntity`、`contentManager.getClassName`。 源码 eyes/src/engine/managers/ComparisonManager.js:102；参数 (t, e)。
- `setCameraLight(t, e)`：【结构证据】调用 `this._cameraLightLeft.setColor`、`this._cameraLightLeft.setEnabled`、`this._cameraLightRight.setColor`、`this._cameraLightRight.setEnabled`、`this._updateSuns`。 源码 eyes/src/engine/managers/ComparisonManager.js:198；参数 (t, e)。
- `exit()`：【结构证据】写入 `_activeViewports`、`_entityLeft`、`_entityRight`；调用 `new CustomEvent`、`this._sceneLeft.removeEntity`、`this._sceneRight.removeEntity`、`this._viewportLeft.setEnabled`、`this._viewportRight.setEnabled`、`this.app.getManager`。 源码 eyes/src/engine/managers/ComparisonManager.js:204；参数 ()。
- `_updateSuns()`：【结构证据】调用 `this._cameraLightLeft.getColor`、`this._cameraLightLeft.getColor().min`、`this._cameraLightLeft.isEnabled`、`this._cameraLightRight.getColor`、`this._cameraLightRight.getColor().min`、`this._cameraLightRight.isEnabled`。 源码 eyes/src/engine/managers/ComparisonManager.js:220；参数 ()。
- `_adjustZoomFromViewport()`：【结构证据】返回 `void`；调用 `Number.isNaN`、`Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`e.getName`、`i.setMagnitude`、`s.setMagnitude`。 源码 eyes/src/engine/managers/ComparisonManager.js:232；参数 ()。
- `_getCustomRotation(t, e, i)`：【结构证据】调用 `Pioneer.MathUtils.degToRad`、`new Error`、`new Pioneer.Quaternion`、`quaternion.setFromAxisAngle`、`t.mult`、`t.set`；含显式错误分支。 源码 eyes/src/engine/managers/ComparisonManager.js:248；参数 (t, e, i)。

### `eyes/src/engine/managers/ContentManager.js`

读取实体说明数据库，组织标题、描述、媒体、高清贴图和功能选项。

- 证据：`import ../../vendor/modules/FollowName.cjs`。
- 证据：`import ../pioneer/index.js`。
- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`ContentManager extends EyesPublicApi.BaseManager @6`。

#### ContentManager

读取实体说明数据库，组织标题、描述、媒体、高清贴图和功能选项。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/managers/ContentManager.js:6](../../eyes/src/engine/managers/ContentManager.js#L6)。

- `constructor(t)`：【结构证据】写入 `_categoryShapeMap`、`_context`、`_context.eventDesc`、`_context.events`、`_context.orderedEvents`、`_context.story`、`_entitiesByCategory`、`_entitiesBySubCategory`；调用 `super`。 源码 eyes/src/engine/managers/ContentManager.js:7；参数 (t)。
- `getEntityList()`：【结构证据】返回 `this._entityList`。 源码 eyes/src/engine/managers/ContentManager.js:48；参数 ()。
- `setEntityList(entityList)`：【结构证据】写入 `_entitiesByCategory[category]`、`_entitiesBySubCategory[subcategory]`、`_entityList`；调用 `Object.entries`、`Object.keys`、`Object.keys(this._entityList).forEach`、`this._entitiesByCategory[category].push`、`this._entitiesBySubCategory[subcategory].push`。 源码 eyes/src/engine/managers/ContentManager.js:51；参数 (entityList)。
- `getEntityInfo(t)`：【结构证据】返回 `t in this._entityList?this._entityList[t]:null`。 源码 eyes/src/engine/managers/ContentManager.js:66；参数 (t)。
- `getEntityDesc(t)`：【结构证据】返回 `e`；调用 `EyesPublicApi.AppUtils.loadJSON`。 源码 eyes/src/engine/managers/ContentManager.js:69；参数 (t)。
- `setFolders(t={})`：【结构证据】写入 `_folders[e]`；调用 `EyesPublicApi.AppUtils.addEndToPath`、`Object.prototype.hasOwnProperty.call`。 源码 eyes/src/engine/managers/ContentManager.js:78；参数 (t={})。
- `getStoryList()`：【结构证据】返回 `this._storyList`。 源码 eyes/src/engine/managers/ContentManager.js:81；参数 ()。
- `setStoryList(storyList)`：【结构证据】写入 `_storyList`。 源码 eyes/src/engine/managers/ContentManager.js:84；参数 (storyList)。
- `getStory(t)`：【结构证据】写入 `_context.story`；返回 `this._context.story`；调用 `new Error`；含显式错误分支。 源码 eyes/src/engine/managers/ContentManager.js:87；参数 (t)。
- `setStories(stories)`：【结构证据】写入 `_stories`。 源码 eyes/src/engine/managers/ContentManager.js:93；参数 (stories)。
- `loadDescriptions(t, e)`：【结构证据】写入 `_context[s]`；返回 `void`；调用 `this.getEntityDesc`。 源码 eyes/src/engine/managers/ContentManager.js:96；参数 (t, e)。
- `loadEvents(target, e={}, i)`：【结构证据】写入 `_context.eventDesc`、`_context.events`、`_context.orderedEvents`、`_target`；返回 `void`；调用 `EyesPublicApi.AppUtils.addEndToPath`、`EyesPublicApi.AppUtils.isEmptyObject`、`EyesPublicApi.AppUtils.loadJSON`、`Object.entries`、`console.error`、`e.push`。 源码 eyes/src/engine/managers/ContentManager.js:104；参数 (target, e={}, i)。
- `getSpheroidLayers(t)`：【结构证据】返回 `this._entityShperoidLayersList[t]`。 源码 eyes/src/engine/managers/ContentManager.js:136；参数 (t)。
- `setSpheroidLayers(entityShperoidLayersList)`：【结构证据】写入 `_entityShperoidLayersList`。 源码 eyes/src/engine/managers/ContentManager.js:139；参数 (entityShperoidLayersList)。
- `getSpheroidDefaultTextureInformation(t, e=[])`：【结构证据】返回 `{id:"default",title:"Default Texture",type:"texture",features:e,textures:i}`；调用 `s.getTextureSizes`、`s.getTextureUrl`、`s.getTextureUrl(t).replace`、`this.app.pioneer.getScene`、`this.app.pioneer.getScene("main").getEntity`、`this.app.pioneer.getScene("main").getEntity(t).getComponent`。 源码 eyes/src/engine/managers/ContentManager.js:142；参数 (t, e=[])。
- `getSpheroidFeatures(t)`：【结构证据】返回 `this._entityShperoidFeaturesList[t]||[]`。 源码 eyes/src/engine/managers/ContentManager.js:159；参数 (t)。
- `setSpheroidFeatures(entityShperoidFeaturesList)`：【结构证据】写入 `_entityShperoidFeaturesList`。 源码 eyes/src/engine/managers/ContentManager.js:162；参数 (entityShperoidFeaturesList)。
- `getSpheroidId(t)`：【结构证据】返回 `i`；调用 `sceneManager.getParent`、`this._app.getManager`。 源码 eyes/src/engine/managers/ContentManager.js:165；参数 (t)。
- `getCategoryShapeMap()`：【结构证据】返回 `this._categoryShapeMap`。 源码 eyes/src/engine/managers/ContentManager.js:174；参数 ()。
- `getColorClass(t)`：【结构证据】返回 `e`；调用 `this.getEntityInfo`。 源码 eyes/src/engine/managers/ContentManager.js:177；参数 (t)。
- `hasLanded(t)`：【结构证据】返回 `false` 或 `!!this._app.getManager("time").getTime().isSameOrAfter(e)`；调用 `["Lander","Rover"].indexOf`、`this._app.getManager`、`this._app.getManager("time").getTime`、`this._app.getManager("time").getTime().isSameOrAfter`、`this._app.getManager("time").parseTime`。 源码 eyes/src/engine/managers/ContentManager.js:211；参数 (t)。
- `isLandingSite(t)`：【结构证据】返回 `!!e&&e.category.toLowerCase().includes("landing site")`；调用 `e.category.toLowerCase`、`e.category.toLowerCase().includes`、`this.getEntityInfo`。 源码 eyes/src/engine/managers/ContentManager.js:218；参数 (t)。
- `getClassName(t, e)`：【结构证据】返回 `s`；调用 `e.toLowerCase`、`e.toLowerCase().replace`、`i.category.toLowerCase`、`i.category.toLowerCase().replace`、`s.match`、`this.getEntityInfo`。 源码 eyes/src/engine/managers/ContentManager.js:222；参数 (t, e)。
- `hasKeyword(t, e)`：【结构证据】返回 `this.getEntityInfo(t).keywords.includes(e)`；调用 `this.getEntityInfo`、`this.getEntityInfo(t).keywords.includes`。 源码 eyes/src/engine/managers/ContentManager.js:231；参数 (t, e)。
- `resetContext()`：【结构证据】写入 `_context`、`_context.eventDesc`、`_context.events`、`_context.orderedEvents`、`_context.story`。 源码 eyes/src/engine/managers/ContentManager.js:234；参数 ()。
- `hideExternalLinksInText(t)`：【结构证据】返回 `t?.replaceAll(/<a.*?href=['"](https?:)?\/\/[^>]*>(.*?)<\/a>/g,"$2")`。 源码 eyes/src/engine/managers/ContentManager.js:241；参数 (t)。
- `hideExternalLinkStoryList()`：【结构证据】调用 `Array.isArray`、`Object.entries`、`Object.keys`、`Object.keys(n).filter`、`i.includes`、`n.filter`。 源码 eyes/src/engine/managers/ContentManager.js:244；参数 ()。
- `_handleError(t, e="")`：【结构证据】调用 `console.error`、`this.app.getManager`；含显式错误分支。 源码 eyes/src/engine/managers/ContentManager.js:260；参数 (t, e="")。
- `entitiesByCategory()`：【结构证据】返回 `this._entitiesByCategory`。 源码 eyes/src/engine/managers/ContentManager.js:265；参数 ()。
- `entitiesBySubCategory()`：【结构证据】返回 `this._entitiesBySubCategory`。 源码 eyes/src/engine/managers/ContentManager.js:268；参数 ()。
- `context()`：【结构证据】返回 `this._context`。 源码 eyes/src/engine/managers/ContentManager.js:271；参数 ()。
- `events()`：【结构证据】返回 `this._context.events`。 源码 eyes/src/engine/managers/ContentManager.js:274；参数 ()。
- `orderedEvents()`：【结构证据】返回 `this._context.orderedEvents`。 源码 eyes/src/engine/managers/ContentManager.js:277；参数 ()。
- `eventDesc()`：【结构证据】返回 `this._context.eventDesc`。 源码 eyes/src/engine/managers/ContentManager.js:280；参数 ()。

### `eyes/src/engine/managers/DistanceManager.js`

管理距离/光行时面板所需的实体选择与距离计算。

- 证据：`import ../../framework/eyes/index.js`。
- 证据：`import ../pioneer/index.js`。
- 证据：`import ../solar-system/public-api.js`。
- 证据：`import ../../vendor/modules/animateFill-929.js`。
- 证据：`DistanceManager extends Eyes.BaseManager @17`。

#### DistanceManager

管理距离/光行时面板所需的实体选择与距离计算。 继承：`Eyes.BaseManager`。源码 [eyes/src/engine/managers/DistanceManager.js:17](../../eyes/src/engine/managers/DistanceManager.js#L17)。

- `constructor(t)`：【结构证据】写入 `_allowPlay`、`_allowRaycasting`、`_areClose`、`_areRelated`、`_bpAnimation`、`_bpParentIsSource`、`_currBetweenOffset`、`_currentSecond`；调用 `super`、`this.bindFunctions`、`throttle`。 源码 eyes/src/engine/managers/DistanceManager.js:18；参数 (t)。
- `init()`：【结构证据】写入 `_betweenPosEntity`、`_bpController`、`distancePanel`、`pionerEl`；调用 `document.getElementById`、`this._betweenPosEntity.addController`、`this._createBetweenEntity`、`this._grabVectors`、`this.addEvents`、`this.app.getComponent`。 源码 eyes/src/engine/managers/DistanceManager.js:63；参数 ()。
- `deinit()`：【结构证据】调用 `this._releaseVectors`、`this.removeEvents`、`this.resetAllDistanceEntities`、`this.resetUValue`、`this.setBetweenPosHidden`。 源码 eyes/src/engine/managers/DistanceManager.js:71；参数 ()。
- `hideSpacecraftLayer()`：【结构证据】调用 `layerManager.getLayer`、`layerManager.toggleLayer`、`this.app.getManager`。 源码 eyes/src/engine/managers/DistanceManager.js:78；参数 ()。
- `showSpacecraftLayer()`：【结构证据】调用 `layerManager.getLayer`、`layerManager.toggleLayer`、`this.app.getManager`。 源码 eyes/src/engine/managers/DistanceManager.js:85；参数 ()。
- `addEvents()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/managers/DistanceManager.js:92；参数 ()。
- `removeEvents()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/managers/DistanceManager.js:99；参数 ()。
- `resetEvents()`：【结构证据】调用 `this.addEvents`、`this.removeEvents`。 源码 eyes/src/engine/managers/DistanceManager.js:103；参数 ()。
- `_updateTooltip()`：【结构证据】写入 `_tooltipOpts.height`、`_tooltipOpts.instance`、`_tooltipOpts.isTouch`；返回 `void`；调用 `0,animateFill.default`、`instance.setProps`、`this._betweenPosEntity.getComponent`、`this._betweenPosEntity.getComponent(Pioneer.DivComponent).getDiv`。 源码 eyes/src/engine/managers/DistanceManager.js:107；参数 ()。
- `showTooltip()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/managers/DistanceManager.js:133；参数 ()。
- `hideTooltip()`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/managers/DistanceManager.js:139；参数 ()。
- `on3dLineMouseMove(t)`：【结构证据】写入 `intersect`；返回 `void` 或 `void(this.intersect=null)`；调用 `Boolean`、`i.getNormalSpacePositionFromCameraSpacePosition`、`i.getViewport`、`i.getViewport().getPixelSpacePositionFromNormalSpacePosition`、`this.app.getManager`、`this.app.getManager("time").getTimeRate`。 源码 eyes/src/engine/managers/DistanceManager.js:145；参数 (t)。
- `getInterpolationU(t)`：【结构证据】返回 `this._bpParentIsSource?n:1-n`；调用 `this.getLimitedU`。 源码 eyes/src/engine/managers/DistanceManager.js:176；参数 (t)。
- `getOffsetU(t)`：【结构证据】返回 `.5!==t?limitedU:minSurfaceU+(maxSurfaceU-minSurfaceU)*t`；调用 `this.getLimitedU`。 源码 eyes/src/engine/managers/DistanceManager.js:185；参数 (t)。
- `on3dLineClick(t, e)`：【结构证据】写入 `intersect`；返回 `void`；调用 `Math.abs`、`Math.max`、`Math.pow`、`parseFloat`、`t.toFixed`、`this.calcIntersect`。 源码 eyes/src/engine/managers/DistanceManager.js:194；参数 (t, e)。
- `onNewULimit()`：【结构证据】返回 `void`；调用 `this.getLimitedU`、`this.setBpAnimation`、`this.setHoldU`、`this.setIsTransitioning`、`this.toggleBetweenParent`。 源码 eyes/src/engine/managers/DistanceManager.js:237；参数 ()。
- `camToBetweenPos({targetU:targetU,duration:e=1.5,force:i=false}={})`：【结构证据】返回 `void`；调用 `L.lerp`、`Math.abs`、`Math.max`、`Math.min`、`O.copy`、`O.neg`。 源码 eyes/src/engine/managers/DistanceManager.js:255；参数 ({targetU:targetU,duration:e=1.5,force:i=false}={})。
- `setBpAnimation({initialU:initialU,targetU:targetU,onUpdate:onUpdate,onEnd:onEnd,duration:n=1.5})`：【结构证据】写入 `_bpAnimation`；调用 `Date.now`。 源码 eyes/src/engine/managers/DistanceManager.js:336；参数 ({initialU:initialU,targetU:targetU,onUpdate:onUpdate,onEnd:onEnd,duration:n=1.5})。
- `_updateBpAnimation()`：【结构证据】写入 `_bpAnimation`；调用 `Date.now`、`Math.pow`、`onEnd`、`onUpdate`、`this.updateBetweenPoint`。 源码 eyes/src/engine/managers/DistanceManager.js:352；参数 ()。
- `pauseTime()`：【结构证据】调用 `this.app.getComponent`、`this.app.getManager`、`this.setAllowPlay`、`timeControlsComponent.playPauseRate`、`timeManager.getTimeRate`、`timeManager.pause`。 源码 eyes/src/engine/managers/DistanceManager.js:373；参数 ()。
- `playTime()`：【结构证据】返回 `void`；调用 `this.app.getComponent`、`this.app.getManager`、`timeControlsComponent.playPauseRate`、`timeManager.getTimeRate`、`timeManager.play`。 源码 eyes/src/engine/managers/DistanceManager.js:380；参数 ()。
- `swapSourceAndTarget()`：【结构证据】调用 `this.app.getManager`。 源码 eyes/src/engine/managers/DistanceManager.js:387；参数 ()。
- `setBetweenOffsetVars(t, e)`：【结构证据】写入 `_currBetweenOffset`；返回 `void`；调用 `o.style.setProperty`。 源码 eyes/src/engine/managers/DistanceManager.js:402；参数 (t, e)。
- `getAccurateRadius(t, e=false)`：【结构证据】返回 `r`；调用 `Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`i.copy`、`i.magnitude`、`i.neg`、`i.rotateInverse`。 源码 eyes/src/engine/managers/DistanceManager.js:416；参数 (t, e=false)。
- `measureDistance(t=false, e=void 0)`：【结构证据】写入 `_isBelowZero`、`distanceInfo.measuredValue`、`sourceDistanceEntity.measurePoint.radius`、`targetDistanceEntities[0].measurePoint.radius`；返回 `null` 或 `this._getDistanceParams(this.measuredDistance)`；调用 `this._distanceLine.setRenderingEnabled`、`this._getDistanceParams`、`this.calcMPPositions`、`this.distanceIsValid`、`this.distancePanel.setSourceMpState`、`this.distancePanel.setTargetMpState`。 源码 eyes/src/engine/managers/DistanceManager.js:435；参数 (t=false, e=void 0)。
- `_getDistanceParams(t)`：【结构证据】返回 `{prefix:d,value:h,scale:u,unit:p,dps:g.length>1&&g[1].length>1?2:1,actualDistanceValue:m}`；调用 `Math.max`、`h.toPrecision`、`h.toPrecision(4).split`。 源码 eyes/src/engine/managers/DistanceManager.js:492；参数 (t)。
- `measureRelativeVelocity(t)`：【结构证据】返回 `null` 或 `o`；调用 `Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`entity.getVelocityRelativeToEntity`、`s.magnitude`、`this._getDistanceParams`。 源码 eyes/src/engine/managers/DistanceManager.js:520；参数 (t)。
- `_createDistanceEntity(t)`：【结构证据】返回 `{id:t,entity:i,info:e,measurePoint:s}`；调用 `Error`、`i.getExtentsRadius`、`this.app.getManager`、`this.app.getManager("content").getEntityInfo`、`this.app.scene.getEntity`；含显式错误分支。 源码 eyes/src/engine/managers/DistanceManager.js:535；参数 (t)。
- `_createBetweenEntity()`：【结构证据】返回 `i`；调用 `SolarSystemSceneExports.Entity.createFromOptions`、`i.setExtentsRadius`、`i.setOcclusionRadius`、`i.setOrientation`、`i.setPosition`、`labelManager.addLabel`。 源码 eyes/src/engine/managers/DistanceManager.js:551；参数 ()。
- `setBetweenEntityParent(t)`：【结构证据】写入 `_bpParentIsSource`；调用 `this._betweenPosEntity.setParent`。 源码 eyes/src/engine/managers/DistanceManager.js:570；参数 (t)。
- `toggleBetweenParent(t)`：【结构证据】调用 `this.setBetweenEntityParent`、`this.setDistanceInfo`、`this.updateBetweenPoint`。 源码 eyes/src/engine/managers/DistanceManager.js:574；参数 (t)。
- `setHoldU(uValueHold)`：【结构证据】写入 `_uValueHold`。 源码 eyes/src/engine/managers/DistanceManager.js:586；参数 (uValueHold)。
- `updateBetweenPoint(t, e=true)`：【结构证据】写入 `_uValueCurrent`；返回 `void`；调用 `this.distancePanel.setLineGraphicDotPos`、`this.getInterpolationU`、`this.getLimitedU`、`this.getOffsetU`、`this.setBpControllerMults`。 源码 eyes/src/engine/managers/DistanceManager.js:589；参数 (t, e=true)。
- `setBpControllerMults(t)`：【结构证据】调用 `this._bpController._entities.get`。 源码 eyes/src/engine/managers/DistanceManager.js:606；参数 (t)。
- `resetUValue()`：【结构证据】写入 `_uValueCurrent`。 源码 eyes/src/engine/managers/DistanceManager.js:620；参数 ()。
- `resetAreRelated()`：【结构证据】写入 `_areRelated`。 源码 eyes/src/engine/managers/DistanceManager.js:623；参数 ()。
- `resetDistanceInfo()`：【结构证据】写入 `distanceInfo`。 源码 eyes/src/engine/managers/DistanceManager.js:626；参数 ()。
- `setBetweenPosHidden(t)`：【结构证据】调用 `e.classList.toggle`。 源码 eyes/src/engine/managers/DistanceManager.js:633；参数 (t)。
- `toggleCurrentUnitSystem()`：【结构证据】写入 `_currentUnitSystem`。 源码 eyes/src/engine/managers/DistanceManager.js:637；参数 ()。
- `setMPPosition(t, e=u)`：【结构证据】返回 `s`。 源码 eyes/src/engine/managers/DistanceManager.js:641；参数 (t, e=u)。
- `setMPAdjustable(t, e)`：【结构证据】返回 `s`。 源码 eyes/src/engine/managers/DistanceManager.js:649；参数 (t, e)。
- `toggleSourceMeasurePoint()`：【结构证据】返回 `void`；调用 `this.setMPPosition`、`this.updateMeasurement`。 源码 eyes/src/engine/managers/DistanceManager.js:657；参数 ()。
- `toggleTargetMeasurePoint()`：【结构证据】返回 `void`；调用 `this.setMPPosition`、`this.updateMeasurement`。 源码 eyes/src/engine/managers/DistanceManager.js:667；参数 ()。
- `setSourceDistanceEntity(t)`：【结构证据】写入 `_distanceLine`、`_sourceDistanceEntity`；调用 `entity.addComponent`、`this._bpController.addEntity`、`this._createDistanceEntity`、`this.distancePanel.setSourceText`、`this.resetSourceDistanceEntity`、`this.setBetweenEntityParent`。 源码 eyes/src/engine/managers/DistanceManager.js:677；参数 (t)。
- `setTargetDistanceEntities(t)`：【结构证据】调用 `Boolean`、`t.forEach`、`this._bpController.addEntity`、`this._distanceLine.setTargetEntity`、`this.addTargetDistanceEntity`、`this.distancePanel.setResult`。 源码 eyes/src/engine/managers/DistanceManager.js:694；参数 (t)。
- `setTempErrorResult(t)`：【结构证据】写入 `errorResultTimeout`；返回 `new Promise(t=>{this.errorResultTimeout=setTimeout(()=>{this.distancePanel.setResult();t();},3e3);})`；调用 `new Promise`、`setTimeout`、`t`、`this.distancePanel.setResult`。 源码 eyes/src/engine/managers/DistanceManager.js:722；参数 (t)。
- `setLabelWeight(t, e=false, i)`：【结构证据】写入 `_prevValues.weights[t]`；返回 `void`；调用 `labelManager.getDefaultWeight`、`labelManager.setWeight`、`this.app.getManager`、`this.app.scene.getEntity`。 源码 eyes/src/engine/managers/DistanceManager.js:733；参数 (t, e=false, i)。
- `setOcclusionRadius(t, e=false)`：【结构证据】写入 `_prevValues.occRadii[i]`；调用 `t.getName`、`t.getOcclusionRadius`、`t.setOcclusionRadius`。 源码 eyes/src/engine/managers/DistanceManager.js:742；参数 (t, e=false)。
- `setBetweenIntersectClass(t)`：【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。 源码 eyes/src/engine/managers/DistanceManager.js:747；参数 (t)。
- `toggleSourceIconClass(t, e)`：【结构证据】返回 `void`；调用 `o.classList.toggle`。 源码 eyes/src/engine/managers/DistanceManager.js:750；参数 (t, e)。
- `toggleTargetIconClass(t, e)`：【结构证据】返回 `void`；调用 `o.classList.toggle`。 源码 eyes/src/engine/managers/DistanceManager.js:759；参数 (t, e)。
- `calcMPPositions()`：【结构证据】写入 `_areClose`、`_areRelated`；返回 `void` 或 `h`；调用 `this.setMPPosition`。 源码 eyes/src/engine/managers/DistanceManager.js:768；参数 ()。
- `resetSourceDistanceEntity()`：【结构证据】写入 `_sourceDistanceEntity`；调用 `entity.removeComponent`、`this._bpController.removeEntity`、`this.distancePanel.setSourceMpState`、`this.distancePanel.setSourceText`、`this.resetAreRelated`、`this.resetDistanceInfo`。 源码 eyes/src/engine/managers/DistanceManager.js:800；参数 ()。
- `addTargetDistanceEntity(t)`：【结构证据】调用 `console.error`、`this._createDistanceEntity`、`this._targetDistanceEntities.push`、`this.targetDistanceEntities.find`。 源码 eyes/src/engine/managers/DistanceManager.js:818；参数 (t)。
- `resetTargetDistanceEntities()`：【结构证据】写入 `_targetDistanceEntities`；调用 `this._bpController.removeEntity`、`this.distancePanel.setResult`、`this.distancePanel.setSourceMpState`、`this.distancePanel.setTargetMpState`、`this.distancePanel.setTargetText`、`this.resetAreRelated`。 源码 eyes/src/engine/managers/DistanceManager.js:825；参数 ()。
- `valuesWithPrecisionAreEqual(t, e, i=5)`：【结构证据】返回 `null!=t&&null!=e&&(null==i?t===e:t.toPrecision(i)===e.toPrecision(i))`；调用 `e.toPrecision`、`t.toPrecision`。 源码 eyes/src/engine/managers/DistanceManager.js:847；参数 (t, e, i=5)。
- `resetAllDistanceEntities()`：【结构证据】调用 `this.resetSourceDistanceEntity`、`this.resetTargetDistanceEntities`。 源码 eyes/src/engine/managers/DistanceManager.js:850；参数 ()。
- `setHasTarget(hasTarget)`：【结构证据】写入 `hasTarget`；调用 `this.distancePanel.setCanMinimize`、`this.distancePanel.setSwapButtonVisible`。 源码 eyes/src/engine/managers/DistanceManager.js:854；参数 (hasTarget)。
- `setAllowRaycasting(allowRaycasting)`：【结构证据】写入 `_allowRaycasting`。 源码 eyes/src/engine/managers/DistanceManager.js:859；参数 (allowRaycasting)。
- `setAllowPlay(allowPlay)`：【结构证据】写入 `_allowPlay`。 源码 eyes/src/engine/managers/DistanceManager.js:862；参数 (allowPlay)。
- `setIsTransitioning(isTransitioning)`：【结构证据】写入 `_isTransitioning`。 源码 eyes/src/engine/managers/DistanceManager.js:865；参数 (isTransitioning)。
- `setIsWaitingForEntities(isWaitingForEntities)`：【结构证据】写入 `_isWaitingForEntities`。 源码 eyes/src/engine/managers/DistanceManager.js:868；参数 (isWaitingForEntities)。
- `getEntitiesToLoad()`：【结构证据】返回 `t`；调用 `t.push`、`this.targetDistanceEntities.map`。 源码 eyes/src/engine/managers/DistanceManager.js:871；参数 ()。
- `setDistanceInfo(t)`：【结构证据】写入 `distanceInfo.centerValue`、`distanceInfo.measuredValue`、`distanceInfo.sourceTargetDiff`；调用 `(this._bpParentIsSource?i:entity).getPositionRelativeToEntity`、`sourceTargetDiff.magnitude`、`this.distanceIsValid`。 源码 eyes/src/engine/managers/DistanceManager.js:879；参数 (t)。
- `isCloseEnough()`：【结构证据】返回 `s<5&&(s<.5||i>1)` 或 `true`；调用 `Math.max`、`this.app.getManager`、`this.app.getManager("camera").cameraEntity.getPosition`、`this.app.getManager("camera").cameraEntity.getPosition().magnitude`、`this.distanceIsValid`。 源码 eyes/src/engine/managers/DistanceManager.js:894；参数 ()。
- `updateMeasurement(t, e=false)`：【结构证据】写入 `_currentSecond`；返回 `false` 或 `true`；调用 `_.split`、`parseInt`、`t.valueOf`、`this._formatText`、`this.calculateLightTime`、`this.distancePanel.setLightTime`。 源码 eyes/src/engine/managers/DistanceManager.js:908；参数 (t, e=false)。
- `calculateLightTime(t)`：【结构证据】返回 `{timeHours:i,timeMin:n,timeSec:r,timeMillisec:1e3*(o-r)}`；调用 `Math.floor`。 源码 eyes/src/engine/managers/DistanceManager.js:959；参数 (t)。
- `_formatText(t, e, i, s, n)`：【结构证据】返回 ``${t}${formatNumber(e,"m"===s||"ft"===s?0:n,"m"===s||"ft"===s?0:n)} ${i}``；调用 `formatNumber`。 源码 eyes/src/engine/managers/DistanceManager.js:973；参数 (t, e, i, s, n)。
- `calcIntersect()`：【结构证据】返回 `null` 或 `{u:S,linePoint:closestPointOnLine}`；调用 `Math.pow`、`a.getCameraSpacePosition`、`closestPointOnLine.lerp`、`intersectToSource.dot`、`intersectToSource.sub`、`intersectionPoint.copy`。 源码 eyes/src/engine/managers/DistanceManager.js:976；参数 ()。
- `getLimitedU(t)`：【结构证据】返回 `s`；调用 `Math.max`、`Math.min`。 源码 eyes/src/engine/managers/DistanceManager.js:1036；参数 (t)。
- `_grabVectors()`：【结构证据】写入 `_vectors`；调用 `e.get`、`pool.get`。 源码 eyes/src/engine/managers/DistanceManager.js:1064；参数 ()。
- `_releaseVectors()`：【结构证据】调用 `Object.values`、`Pioneer.Vector3.pool.release`。 源码 eyes/src/engine/managers/DistanceManager.js:1084；参数 ()。
- `update(t)`：【结构证据】调用 `Math.abs`、`e.getDraggedOffset`、`e.getDraggedOffset().isZero`、`e.getZoomedOffset`、`this._updateBpAnimation`、`this._updateTooltip`。 源码 eyes/src/engine/managers/DistanceManager.js:1087；参数 (t)。
- `distanceIsValid(t)`：【结构证据】返回 `"number"==typeof t&&!isNaN(t)&&null!=t&&t!==1/0`；调用 `isNaN`。 源码 eyes/src/engine/managers/DistanceManager.js:1106；参数 (t)。
- `centerDistance()`：【结构证据】返回 `this.distanceInfo.centerValue`。 源码 eyes/src/engine/managers/DistanceManager.js:1109；参数 ()。
- `measuredDistance()`：【结构证据】返回 `this.distanceInfo.measuredValue`。 源码 eyes/src/engine/managers/DistanceManager.js:1112；参数 ()。
- `sourceDisplayName()`：【结构证据】返回 `info?.displayName||info?.iauName`。 源码 eyes/src/engine/managers/DistanceManager.js:1115；参数 ()。
- `targetDisplayNames()`：【结构证据】返回 `this.targetDistanceEntities.map(({info:info})=>info.displayName||info.iauName)`；调用 `this.targetDistanceEntities.map`。 源码 eyes/src/engine/managers/DistanceManager.js:1121；参数 ()。
- `targetDistanceEntities()`：【结构证据】返回 `this._targetDistanceEntities`。 源码 eyes/src/engine/managers/DistanceManager.js:1126；参数 ()。
- `sourceDistanceEntity()`：【结构证据】返回 `this._sourceDistanceEntity`。 源码 eyes/src/engine/managers/DistanceManager.js:1129；参数 ()。

### `eyes/src/engine/managers/ERTManager.js`

计算地球接收时间/光程延迟并协调仿真时间显示。

- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`ERTManager extends EyesPublicApi.BaseManager @3`。

#### ERTManager

计算地球接收时间/光程延迟并协调仿真时间显示。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/managers/ERTManager.js:3](../../eyes/src/engine/managers/ERTManager.js#L3)。

- `constructor(t, {isERT=false,ertTarget="",sceneMgr=null}={})`：【结构证据】写入 `_ertTarget`、`_isERT`、`_sceneMgr`、`getNow`；调用 `super`、`this.getNow.bind`。 源码 eyes/src/engine/managers/ERTManager.js:4；参数 (t, {isERT=false,ertTarget="",sceneMgr=null}={})。
- `isERT()`：【结构证据】返回 `this._isERT`。 源码 eyes/src/engine/managers/ERTManager.js:15；参数 ()。
- `setERT(isERT)`：【结构证据】写入 `_isERT`。 源码 eyes/src/engine/managers/ERTManager.js:18；参数 (isERT)。
- `getERTTarget()`：【结构证据】返回 `this._ertTarget`。 源码 eyes/src/engine/managers/ERTManager.js:21；参数 ()。
- `setERTTarget(ertTarget)`：【结构证据】写入 `_ertTarget`。 源码 eyes/src/engine/managers/ERTManager.js:24；参数 (ertTarget)。
- `getERTScene()`：【结构证据】返回 `this._sceneMgr`。 源码 eyes/src/engine/managers/ERTManager.js:27；参数 ()。
- `setERTScene(sceneMgr)`：【结构证据】写入 `_sceneMgr`。 源码 eyes/src/engine/managers/ERTManager.js:30；参数 (sceneMgr)。
- `getERTOffset()`：【结构证据】返回 `this._sceneMgr.getDistance(this._ertTarget,"earth",{subtractRadius:true})/EyesPublicApi.AppUtils.constants.speedOfLight` 或 `0`；调用 `console.warn`、`this._sceneMgr.getDistance`。 源码 eyes/src/engine/managers/ERTManager.js:33；参数 ()。
- `getERTFromTime(t)`：【结构证据】返回 `t`；调用 `t.add`、`this.getERTOffset`。 源码 eyes/src/engine/managers/ERTManager.js:42；参数 (t)。
- `getTimeFromERT(t)`：【结构证据】返回 `t`；调用 `t.subtract`、`this.getERTOffset`。 源码 eyes/src/engine/managers/ERTManager.js:47；参数 (t)。
- `getNow(t)`：【结构证据】返回 `this._isERT?this.getTimeFromERT(t):t`；调用 `this.getTimeFromERT`。 源码 eyes/src/engine/managers/ERTManager.js:52；参数 (t)。

### `eyes/src/engine/managers/LabelManager-563.js`

管理实体文字标签/图标的显示、样式和参考相机排除。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ../solar-system/public-api.js`。
- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`LabelManager extends EyesPublicApi.BaseManager @5`。

#### LabelManager

管理实体文字标签/图标的显示、样式和参考相机排除。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/managers/LabelManager-563.js:5](../../eyes/src/engine/managers/LabelManager-563.js#L5)。

- `constructor(t, scene, viewport)`：【结构证据】写入 `_exceptions`、`_focusIntersectionRects`、`_focusRect`、`_focusSize`、`_iconMap`、`_isClickable`、`_labelQuadtree`、`_labels`；调用 `new Pioneer.FastMap`、`new Pioneer.Rect`、`new Set`、`new SolarSystemSceneExports.LabelQuadtree`、`super`、`this._eventNames.push`。 源码 eyes/src/engine/managers/LabelManager-563.js:6；参数 (t, scene, viewport)。
- `update()`：【结构证据】调用 `Math.max`、`this._focusRect.set`、`this._labelQuadtree.setBounds`、`this._labelQuadtree.update`、`this._viewport.getBounds`。 源码 eyes/src/engine/managers/LabelManager-563.js:50；参数 ()。
- `initLabelWeights(t, e=true)`：【结构证据】写入 `_weights`、`_weights[s]`、`_weights[s].weight`；调用 `Object.keys`、`labelManager.setWeight`、`this._app.getManager`。 源码 eyes/src/engine/managers/LabelManager-563.js:57；参数 (t, e=true)。
- `setWeight(t, e)`：【结构证据】返回 `true` 或 `false`；调用 `this._labelQuadtree.setWeight`。 源码 eyes/src/engine/managers/LabelManager-563.js:67；参数 (t, e)。
- `resetWeight(t)`：【结构证据】调用 `this._app.getManager`、`this._labelQuadtree.setWeight`、`this.getDefaultWeight`。 源码 eyes/src/engine/managers/LabelManager-563.js:75；参数 (t)。
- `getDefaultWeight(t, e=void 0)`：【结构证据】返回 `t.startsWith("constellation_")?this._weightMap.Constellation:Object.keys(this._weights).length>0&&void 0!==this._weights[t]?this._weights[t].weight:vo`；调用 `Object.keys`、`t.startsWith`。 源码 eyes/src/engine/managers/LabelManager-563.js:81；参数 (t, e=void 0)。
- `getWeightMap()`：【结构证据】返回 `this._weightMap`。 源码 eyes/src/engine/managers/LabelManager-563.js:84；参数 ()。
- `setWeightMap(weightMap)`：【结构证据】写入 `_weightMap`。 源码 eyes/src/engine/managers/LabelManager-563.js:87；参数 (weightMap)。
- `setUpLabel(t)`：【结构证据】调用 `contentManager.getClassName`、`contentManager.getEntityInfo`、`layerManager.getLayer`、`t.getName`、`this._app.getManager`、`this.addLabel`。 源码 eyes/src/engine/managers/LabelManager-563.js:90；参数 (t)。
- `addLabel(t, e)`：【结构证据】写入 `_labels[t.getName()]`；调用 `t.getComponent`、`t.getComponent(Pioneer.DivComponent).getDiv`、`t.getName`、`this._labelQuadtree.addEntity`。 源码 eyes/src/engine/managers/LabelManager-563.js:103；参数 (t, e)。
- `removeLabel(t)`：【结构证据】调用 `t.getComponent`、`t.getName`、`this._labelQuadtree.removeEntity`。 源码 eyes/src/engine/managers/LabelManager-563.js:110；参数 (t)。
- `setUpIcon(t)`：【结构证据】调用 `layerManager.getLayer`、`t.getName`、`this._app.getManager`、`this.toggleIconForEntity`。 源码 eyes/src/engine/managers/LabelManager-563.js:113；参数 (t)。
- `setLabelClickable(t, e)`：【结构证据】写入 `_labels[t].isClickable`；调用 `this._labels[t].el.classList.toggle`。 源码 eyes/src/engine/managers/LabelManager-563.js:119；参数 (t, e)。
- `setClickable(isClickable)`：【结构证据】写入 `_isClickable`；调用 `e.classList.add`、`e.classList.remove`、`i.getDiv`、`this._scene.getEntityAt`、`this._scene.getEntityAt(e).getComponent`、`this._scene.getNumEntities`。 源码 eyes/src/engine/managers/LabelManager-563.js:122；参数 (isClickable)。
- `addException(t)`：【结构证据】调用 `this._exceptions.add`。 源码 eyes/src/engine/managers/LabelManager-563.js:132；参数 (t)。
- `removeException(t)`：【结构证据】调用 `this._exceptions.delete`。 源码 eyes/src/engine/managers/LabelManager-563.js:135；参数 (t)。
- `addExceptions(t)`：【结构证据】调用 `t.forEach`、`this._exceptions.add`。 源码 eyes/src/engine/managers/LabelManager-563.js:138；参数 (t)。
- `removeExceptions(t)`：【结构证据】调用 `t.forEach`、`this._exceptions.delete`。 源码 eyes/src/engine/managers/LabelManager-563.js:141；参数 (t)。
- `toggleLabels(t, {scene:scene}={})`：【结构证据】调用 `scene.getEntityAt`、`scene.getEntityAt(i).getName`、`scene.getNumEntities`、`this.toggleLabelForEntity`。 源码 eyes/src/engine/managers/LabelManager-563.js:144；参数 (t, {scene:scene}={})。
- `toggleLabelForEntity(t, e, {scene:scene}={})`：【结构证据】调用 `n.getEntity`、`o.getComponent`、`o.getName`、`r.getDiv`、`this._exceptions.has`。 源码 eyes/src/engine/managers/LabelManager-563.js:152；参数 (t, e, {scene:scene}={})。
- `toggleIcons(t, {scene:scene}={})`：【结构证据】调用 `scene.getEntityAt`、`scene.getEntityAt(i).getName`、`scene.getNumEntities`、`this.toggleIconForEntity`。 源码 eyes/src/engine/managers/LabelManager-563.js:161；参数 (t, {scene:scene}={})。
- `toggleIconForEntity(t, e, {scene:scene}={})`：【结构证据】调用 `n.getEntity`、`o.getComponent`、`o.getName`、`r.getDiv`、`this._exceptions.has`。 源码 eyes/src/engine/managers/LabelManager-563.js:169；参数 (t, e, {scene:scene}={})。
- `_getLink(t)`：【结构证据】返回 ``/${t}``。 源码 eyes/src/engine/managers/LabelManager-563.js:178；参数 (t)。
- `_clickCallback(t)`：【结构证据】调用 `routerManager.navigate`、`t.getName`、`this._app.getManager`、`this._getLink`。 源码 eyes/src/engine/managers/LabelManager-563.js:181；参数 (t)。
- `setLabelProps({getLabelClass:getLabelClass,getIconClass:getIconClass,getTextClass:getTextClass,handleClick:handleClick,handleTouch:handleTouch,handleMouseEnter:handleMouseEnter,handleMouseLeave:handleMouseLeave}={}, l=Object.keys(this._labels), c, h)`：【结构证据】调用 `Object.keys`、`_.addEventListener`、`_.appendChild`、`_.getAttribute`、`_.setAttribute`、`d.getEntity`。 源码 eyes/src/engine/managers/LabelManager-563.js:193；参数 ({getLabelClass:getLabelClass,getIconClass:getIconClass,getTextClass:getTextClass,handleClick:handleClick,handleTouch:handleTouch,handleMouseEnter:handleMouseEnter,handleMouseLeave:handleMouseLeave}={}, l=Object.keys(this._labels), c, h)。
- `addClassToLabels(t, e)`：【结构证据】调用 `this._scene.getEntity`。 源码 eyes/src/engine/managers/LabelManager-563.js:256；参数 (t, e)。
- `removeClassFromLabels(t, e)`：【结构证据】调用 `this._scene.getEntity`。 源码 eyes/src/engine/managers/LabelManager-563.js:263；参数 (t, e)。

### `eyes/src/engine/managers/LabelManager-924.js`

扩展基础标签管理器，加入太阳系实体分类与应用标签策略。

- 证据：`import ../../framework/eyes/index.js`。
- 证据：`LabelManager extends Eyes.LabelManager @3`。

#### LabelManager

扩展基础标签管理器，加入太阳系实体分类与应用标签策略。 继承：`Eyes.LabelManager`。源码 [eyes/src/engine/managers/LabelManager-924.js:3](../../eyes/src/engine/managers/LabelManager-924.js#L3)。

- `_getLink(t)`：【结构证据】返回 `this._app.getManager("link")?.getParsedLink?.(e)||e`；调用 `super._getLink`、`this._app.getManager`。 源码 eyes/src/engine/managers/LabelManager-924.js:4；参数 (t)。

### `eyes/src/engine/managers/LayerManager.js`

管理类别图层可见性、实体集合和界面复选框的同步。

- 证据：`import ../solar-system/public-api.js`。
- 证据：`import ../pioneer/index.js`。
- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`LayerManager extends EyesPublicApi.BaseManager @5`。

#### LayerManager

管理类别图层可见性、实体集合和界面复选框的同步。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/managers/LayerManager.js:5](../../eyes/src/engine/managers/LayerManager.js#L5)。

- `constructor(t)`：【结构证据】写入 `_contentManager`、`_contextualLayersList`、`_currentSurfaceLayer`、`_dependencies`、`_layers`、`_previousDependencies`、`_previousTarget`、`_sceneManager`；调用 `new Set`、`super`、`t.getManager`、`this._eventNames.push`、`this._initCallbacks`、`this.bindFunctions`。 源码 eyes/src/engine/managers/LayerManager.js:6；参数 (t)。
- `addLayer(t, {name:e="",group:i="",categories:s=[],defaultVisibility:n=true,toggleCallback:o=[],sublayers:r=[]})`：【结构证据】写入 `_layers[i]`、`_layers[i].parent`、`_layers[t]`、`_layers[t].categories`、`_layers[t].defaultVisibility`、`_layers[t].group`、`_layers[t].name`、`_layers[t].sublayers`；调用 `Array.isArray`。 源码 eyes/src/engine/managers/LayerManager.js:21；参数 (t, {name:e="",group:i="",categories:s=[],defaultVisibility:n=true,toggleCallback:o=[],sublayers:r=[]})。
- `addCallback(t, e)`：【结构证据】调用 `i.toggleCallback.push`、`this.getLayer`。 源码 eyes/src/engine/managers/LayerManager.js:46；参数 (t, e)。
- `removeCallback(t, e)`：【结构证据】返回 `void`；调用 `i.toggleCallback.indexOf`、`i.toggleCallback.splice`、`this.getLayer`。 源码 eyes/src/engine/managers/LayerManager.js:50；参数 (t, e)。
- `getLayer(t)`：【结构证据】返回 `void 0===this._layers[t]?null:this._layers[t]`。 源码 eyes/src/engine/managers/LayerManager.js:56；参数 (t)。
- `getCurrentSurfaceLayer()`：【结构证据】返回 `this._currentSurfaceLayer`。 源码 eyes/src/engine/managers/LayerManager.js:59；参数 ()。
- `changeSpheroidMap(t, e, i={})`：【结构证据】写入 `_currentSurfaceLayer`；返回 `void console.error("This function does not yet handle CMTS texture")`；调用 `Object.keys`、`Object.keys(e.textures).forEach`、`a.getLoadedPromise`、`a.setEnabled`、`a.setTexture`、`c.getName`。 源码 eyes/src/engine/managers/LayerManager.js:62；参数 (t, e, i={})。
- `resetSpheroidMap(t)`：【结构证据】调用 `this._app.getManager`、`this._app.getManager("content").getSpheroidDefaultTextureInformation`、`this._app.pioneer.getScene`、`this._app.pioneer.getScene("main").getEntity`、`this.changeSpheroidMap`。 源码 eyes/src/engine/managers/LayerManager.js:76；参数 (t)。
- `toggleLayer(t, e={}, i)`：【结构证据】写入 `_layers[t].visible`、`getLayer(this._layers[t].sublayers[i]).visible`；返回 `void`；调用 `0,this._layers[t].toggleCallback[i]`、`e.push`、`sceneManager.updateEntityLayerVisibility`、`sceneManager.updateEntityLayerVisibilityForChildren`、`t.toLowerCase`、`t.toLowerCase().includes`。 源码 eyes/src/engine/managers/LayerManager.js:83；参数 (t, e={}, i)。
- `syncLayerVisibilityWithQueries()`：【结构证据】调用 `this._app.getManager`、`this._app.getManager("layer").getLayer`、`this._contextualLayersList.forEach`、`this.app.getManager`、`this.toggleLayer`。 源码 eyes/src/engine/managers/LayerManager.js:113；参数 ()。
- `setTarget(targetId)`：【结构证据】写入 `_dependencies`、`_previousDependencies`、`_targetId`；调用 `new Set`、`this._dependencies.clear`、`this._previousTarget.push`、`this._sceneManager.getDependencies`。 源码 eyes/src/engine/managers/LayerManager.js:120；参数 (targetId)。
- `resetTarget()`：【结构证据】写入 `_previousTarget`；返回 `void`；调用 `i.getParent`、`i.getParent().getName`、`this._previousDependencies.clear`、`this.app.getManager`、`this.resetContextualVisibility`。 源码 eyes/src/engine/managers/LayerManager.js:126；参数 ()。
- `resetContextualVisibility(contextId)`：【结构证据】写入 `_contextId`；调用 `SolarSystemSceneExports.Parenting.getParentOfEntity`、`this._sceneManager.main.getEngine`、`this._sceneManager.main.getEngine().getTime`、`this.getContextualLayers`、`this.getLayer`、`this.toggleLayer`。 源码 eyes/src/engine/managers/LayerManager.js:140；参数 (contextId)。
- `getTarget()`：【结构证据】返回 `this._targetId`。 源码 eyes/src/engine/managers/LayerManager.js:169；参数 ()。
- `getEntityLayer(t)`：【结构证据】返回 `null` 或 `this.getLayerFromCategory(s)||this.getLayerFromCategory(i)`；调用 `this._contentManager.getEntityInfo`、`this.getLayerFromCategory`。 源码 eyes/src/engine/managers/LayerManager.js:172；参数 (t)。
- `getLayerFromCategory(t)`：【结构证据】返回 `null` 或 `this._layers[e]`；调用 `Object.entries`、`i.categories.includes`。 源码 eyes/src/engine/managers/LayerManager.js:179；参数 (t)。
- `getLayerFromSatelliteGroup(t)`：【结构证据】返回 `null` 或 `this._layers[e]`；调用 `Object.entries`、`i.categories.includes`。 源码 eyes/src/engine/managers/LayerManager.js:184；参数 (t)。
- `getAllContextualLayerOptions()`：【结构证据】返回 `this._contextualLayersList`。 源码 eyes/src/engine/managers/LayerManager.js:189；参数 ()。
- `getContextualLayers(t)`：【结构证据】返回 `e`；调用 `Object.keys`、`SolarSystemSceneExports.Entity.getEntityNamesInGroup`、`SolarSystemSceneExports.Parenting.getParentOfEntity`、`contentManager.getEntityInfo`、`e.includes`、`e.push`。 源码 eyes/src/engine/managers/LayerManager.js:192；参数 (t)。
- `resetContextualLayers(t, e)`：【结构证据】调用 `i.includes`、`this._contextualLayersList.forEach`、`this.getContextualLayers`、`this.getLayer`、`this.toggleLayer`。 源码 eyes/src/engine/managers/LayerManager.js:234；参数 (t, e)。
- `isEntityVisibleWithCurrentLayers(t, e={})`：【结构证据】返回 `null!==o&&n.constellation===satelliteGroup?o.visible:null!==e?!(e.parent&&!this.getLayer(e.parent)?.visible&&!allowSublayer)&&e.visible:null!==t?t.vis` 或 `true`；调用 `this._contentManager.getEntityInfo`、`this.getLayer`、`this.getLayerFromCategory`、`this.getLayerFromSatelliteGroup`。 源码 eyes/src/engine/managers/LayerManager.js:244；参数 (t, e={})。

### `eyes/src/engine/managers/LinkManager.js`

解析实体链接及路由目标，为选择/内容导航提供映射。

- 证据：`import ../../framework/eyes/index.js`。
- 证据：`LinkManager extends Eyes.BaseManager @3`。

#### LinkManager

解析实体链接及路由目标，为选择/内容导航提供映射。 继承：`Eyes.BaseManager`。源码 [eyes/src/engine/managers/LinkManager.js:3](../../eyes/src/engine/managers/LinkManager.js#L3)。

- `getParsedLink(t, e)`：【结构证据】返回 `r`；调用 `t.slice`、`t.startsWith`、`this._app.getManager`、`this.app.getManager`。 源码 eyes/src/engine/managers/LinkManager.js:4；参数 (t, e)。

### `eyes/src/engine/managers/MaterialManager.js`

预加载材质描述/着色器资源，创建可复用材质实例并维护 Resource 加载状态。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`import ../core/BasicAlphaShader.js`。
- 证据：`import ../core/BasicShader.js`。
- 证据：`import ../core/ConnectedSpriteShader.js`。
- 证据：`Resource @12`。
- 证据：`MaterialManager @20`。

#### Resource

MaterialManager 单项材质/着色器资源的状态记录。 继承：`无显式继承`。源码 [eyes/src/engine/managers/MaterialManager.js:12](../../eyes/src/engine/managers/MaterialManager.js#L12)。

- `constructor(value)`：【结构证据】写入 `useCount`、`value`。 源码 eyes/src/engine/managers/MaterialManager.js:15；参数 (value)。

#### MaterialManager

预加载材质描述/着色器资源，创建可复用材质实例并维护 Resource 加载状态。 继承：`无显式继承`。源码 [eyes/src/engine/managers/MaterialManager.js:20](../../eyes/src/engine/managers/MaterialManager.js#L20)。

- `constructor(downloader)`：【结构证据】写入 `_cache`、`_clonedMaterials`、`_downloader`、`_promises`；调用 `new Map`、`this._preload`。 源码 eyes/src/engine/managers/MaterialManager.js:21；参数 (downloader)。
- `get(t, e)`：【结构证据】返回 `n`；调用 `0,assertIsShader.assertIsShader`、`JSON.parse`、`PioneerPublicApi.ThreeJsHelper.cloneMaterial`、`new Resource`、`this._cache.get`、`this._cache.set`。 源码 eyes/src/engine/managers/MaterialManager.js:28；参数 (t, e)。
- `getPreloaded(t)`：【结构证据】返回 `i`；调用 `PioneerPublicApi.ThreeJsHelper.cloneMaterial`、`new Error`、`this._cache.get`、`this._clonedMaterials.set`；含显式错误分支。 源码 eyes/src/engine/managers/MaterialManager.js:46；参数 (t)。
- `release(t)`：【结构证据】返回 `void`；调用 `PioneerPublicApi.ThreeJsHelper.destroyMaterial`、`this._cache.delete`、`this._cache.get`、`this._clonedMaterials.delete`、`this._clonedMaterials.get`。 源码 eyes/src/engine/managers/MaterialManager.js:54；参数 (t)。
- `_preload()`：【结构证据】调用 `map.set`、`new Map`、`new Resource`、`this._cache.set`、`this._load`。 源码 eyes/src/engine/managers/MaterialManager.js:61；参数 ()。
- `_load(t, e)`：【结构证据】返回 `rawShaderMaterial`；调用 `Object.entries`、`PioneerPublicApi.Capabilities.hasGLExtension`、`["modelMatrix","modelViewMatrix","projectionMatrix","viewMatrix","normalMatrix","cameraPosition"].includes`、`new PioneerPublicApi.THREE.RawShaderMaterial`、`new PioneerPublicApi.THREE.Uniform`、`this._getUniformValueFromType`；含显式错误分支。 源码 eyes/src/engine/managers/MaterialManager.js:78；参数 (t, e)。
- `_getUniformValueFromType(t)`：【结构证据】返回 `0` 或 `new PioneerPublicApi.THREE.Vector2(0,0)`；调用 `Number.parseInt`、`e.endsWith`、`e.indexOf`、`e.substring`、`new Error`、`new PioneerPublicApi.THREE.Matrix3`；含显式错误分支。 源码 eyes/src/engine/managers/MaterialManager.js:142；参数 (t)。

### `eyes/src/engine/managers/ResourceManager.js`

以资源类型+URL 共享 Promise/对象和引用计数，跟踪组件持有者，零引用后延时释放或取消未完成请求。

- 证据：`import ../pioneer/public-api.js`。
- 证据：`ResourceManager @3`。

#### ResourceManager

以资源类型+URL 共享 Promise/对象和引用计数，跟踪组件持有者，零引用后延时释放或取消未完成请求。 继承：`无显式继承`。源码 [eyes/src/engine/managers/ResourceManager.js:3](../../eyes/src/engine/managers/ResourceManager.js#L3)。

- `constructor(engine)`：【结构证据】写入 `_engine`。 源码 eyes/src/engine/managers/ResourceManager.js:4；参数 (engine)。
- `acquire(t, e, i, o, r)`：按 type+url 查共享条目，命中时增加 count、取消待卸载定时器并提升排队优先级；首次调用建立共享 Promise，成功建立资源反向索引并记录持有 EntityItem。 源码 eyes/src/engine/managers/ResourceManager.js:7；参数 (t, e, i, o, r)。
- `release(t, e, i)`：【结构证据】调用 `new Error`、`s.resourcesToUrls.get`、`this.releaseByUrl`；含显式错误分支。 源码 eyes/src/engine/managers/ResourceManager.js:33；参数 (t, e, i)。
- `releaseByUrl(t, e, i)`：检查 acquire/release 配对并减计数；零引用时已加载资源延迟 15000ms 销毁，未完成请求立即删除/取消。 源码 eyes/src/engine/managers/ResourceManager.js:40；参数 (t, e, i)。
- `acquireMultiple(t, e, i)`：并行获取命名资源，allSettled 检查结果；任一真实失败时释放已成功部分并汇总错误，取消以 CanceledError 向上传播。 源码 eyes/src/engine/managers/ResourceManager.js:52；参数 (t, e, i)。
- `releaseAllForEntityItem(t)`：遍历该组件/控制器的 URL+类型持有记录逐项释放，然后移除其所有权记录。 源码 eyes/src/engine/managers/ResourceManager.js:84；参数 (t)。
- `_addEntityItemReference(t, e, i)`：【结构证据】调用 `s.push`、`this._entityItemsToResources.get`、`this._entityItemsToResources.set`。 源码 eyes/src/engine/managers/ResourceManager.js:91；参数 (t, e, i)。
- `_removeEntityItemReference(t, e, i)`：【结构证据】调用 `new Error`、`s.findIndex`、`s.splice`、`this._entityItemsToResources.delete`、`this._entityItemsToResources.get`；含显式错误分支。 源码 eyes/src/engine/managers/ResourceManager.js:96；参数 (t, e, i)。
- `_deleteEntry(t, e, i, s, o)`：【结构证据】调用 `n[i].cancel`、`n[i].unload`、`s.resourcesToUrls.delete`、`s.urlsToEntries.delete`、`window.clearTimeout`。 源码 eyes/src/engine/managers/ResourceManager.js:104；参数 (t, e, i, s, o)。

注意：_removeEntityItemReference 用 URL findIndex 未同时比对 type；相同 URL 不同资源类型需要验证持有者记账是否配对。 缓存键不含 extension/useMipMaps 等加载选项，同 URL 不同选项共享首个结果。

### `eyes/src/engine/managers/RouteManager.js`

解析路径与查询参数，推送导航并向应用广播路由变化。

- 证据：`import ../../vendor/modules/Unidentified719.cjs`。
- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`RouteManager extends EyesPublicApi.BaseManager @5`。

#### RouteManager

解析路径与查询参数，推送导航并向应用广播路由变化。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/managers/RouteManager.js:5](../../eyes/src/engine/managers/RouteManager.js#L5)。

- `constructor(t)`：【结构证据】写入 `_alwaysHiddenComponents`、`_configs`、`_currentRoute`、`_currentView`、`_firstLoad`、`_homeRoute`、`_previousRoute`、`_previousView`；调用 `getUnidentified719`、`new getUnidentified719()`、`super`、`this.bindFunctions`。 源码 eyes/src/engine/managers/RouteManager.js:6；参数 (t)。
- `homeRoute()`：【结构证据】返回 `this._homeRoute`。 源码 eyes/src/engine/managers/RouteManager.js:22；参数 ()。
- `previousRoute()`：【结构证据】返回 `this._previousRoute`。 源码 eyes/src/engine/managers/RouteManager.js:25；参数 ()。
- `currentRoute()`：【结构证据】返回 `this._currentRoute`。 源码 eyes/src/engine/managers/RouteManager.js:28；参数 ()。
- `query()`：【结构证据】返回 `this._query`。 源码 eyes/src/engine/managers/RouteManager.js:31；参数 ()。
- `configs()`：【结构证据】返回 `this._configs`。 源码 eyes/src/engine/managers/RouteManager.js:34；参数 ()。
- `get currentView()`：【结构证据】读取访问器，返回 `this._currentView`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/managers/RouteManager.js:72；参数 ()。
- `set currentView(currentView)`：【结构证据】写入访问器，接收参数 (currentView)；实际写入 `_currentView`。源码 eyes/src/engine/managers/RouteManager.js:79；参数 (currentView)。
- `previousView()`：【结构证据】返回 `this._previousView`。 源码 eyes/src/engine/managers/RouteManager.js:43；参数 ()。
- `init(t, e)`：【结构证据】写入 `_currentRoute`、`_currentRoute.url`、`_firstLoad`、`_previousRoute`；调用 `e`、`t`、`this._currentRoute.url.replace`、`this._router.hooks`、`this._router.lastRouteResolved`、`this._router.on`。 源码 eyes/src/engine/managers/RouteManager.js:46；参数 (t, e)。
- `leave(t)`：【结构证据】调用 `t.cancelToken.cancel`。 源码 eyes/src/engine/managers/RouteManager.js:65；参数 (t)。
- `onRootRoute(t)`：【结构证据】调用 `this.reroute`。 源码 eyes/src/engine/managers/RouteManager.js:68；参数 (t)。
- `onNotFound(t)`：【结构证据】调用 `this._router.navigate`。 源码 eyes/src/engine/managers/RouteManager.js:71；参数 (t)。
- `replaceState(t)`：【结构证据】调用 `history.replaceState`。 源码 eyes/src/engine/managers/RouteManager.js:76；参数 (t)。
- `reroute(t, e="")`：【结构证据】调用 `EyesPublicApi.AppUtils.filterObject`、`history.replaceState`、`this._router.resolve`、`this.buildQuery`、`this.parseQuery`。 源码 eyes/src/engine/managers/RouteManager.js:79；参数 (t, e="")。
- `addCancelToken(t)`：【结构证据】返回 `e`；调用 `new EyesPublicApi.CancelToken`。 源码 eyes/src/engine/managers/RouteManager.js:91；参数 (t)。
- `lastRouteResolved()`：【结构证据】返回 `this._router.lastRouteResolved()`；调用 `this._router.lastRouteResolved`。 源码 eyes/src/engine/managers/RouteManager.js:96；参数 ()。
- `lastPathResolved()`：【结构证据】返回 `t.query?t.url+"?"+t.query:t.url`；调用 `this._router.lastRouteResolved`。 源码 eyes/src/engine/managers/RouteManager.js:99；参数 ()。
- `getOnlyURL(t)`：【结构证据】返回 `e`；调用 `t.split`、`this._cleanGETParam`。 源码 eyes/src/engine/managers/RouteManager.js:103；参数 (t)。
- `_cleanGETParam(t)`：【结构证据】返回 `t.split(/\?(.*)?$/)[0]`；调用 `t.split`。 源码 eyes/src/engine/managers/RouteManager.js:109；参数 (t)。
- `getValidQueries()`：【结构证据】返回 `this._validQueries`。 源码 eyes/src/engine/managers/RouteManager.js:112；参数 ()。
- `setValidQueries(validQueries)`：【结构证据】写入 `_validQueries`。 源码 eyes/src/engine/managers/RouteManager.js:115；参数 (validQueries)。
- `parseQuery(t)`：【结构证据】写入 `_configs[o]`；返回 `{}` 或 `t.split("&").reduce((t,e)=>{const i=e.split("=");if(i.length>1){const e=decodeURIComponent(i[0].trim());let s=decodeURIComponent(i[1].trim());const n=`；调用 `Number`、`Number.isNaN`、`Object.keys`、`Object.keys(this.configs).includes`、`decodeURIComponent`、`e.split`。 源码 eyes/src/engine/managers/RouteManager.js:118；参数 (t)。
- `buildQuery(t)`：【结构证据】返回 `e`；调用 `Object.entries`、`e.replace`。 源码 eyes/src/engine/managers/RouteManager.js:156；参数 (t)。
- `addQuery(t)`：【结构证据】写入 `_query`；返回 `this._query`。 源码 eyes/src/engine/managers/RouteManager.js:162；参数 (t)。
- `removeQuery(t=[])`：【结构证据】返回 `this._query`；调用 `t.forEach`。 源码 eyes/src/engine/managers/RouteManager.js:169；参数 (t=[])。
- `addConfigs(t)`：【结构证据】写入 `_configs`；返回 `this._configs`。 源码 eyes/src/engine/managers/RouteManager.js:173；参数 (t)。
- `setConfig(t, e)`：【结构证据】写入 `configs[t]`。 源码 eyes/src/engine/managers/RouteManager.js:180；参数 (t, e)。
- `removeConfigs(t=[])`：【结构证据】返回 `this._configs`；调用 `t.forEach`。 源码 eyes/src/engine/managers/RouteManager.js:183；参数 (t=[])。
- `updateQuery(t)`：【结构证据】写入 `_query`；返回 `{...this.addQuery(t),...e}`；调用 `EyesPublicApi.AppUtils.filterObject`、`this.addQuery`、`this.removeQuery`。 源码 eyes/src/engine/managers/RouteManager.js:187；参数 (t)。
- `updateQueryPath(t, e="")`：【结构证据】返回 `(e||this._router.lastRouteResolved().url).replace(/(\/)(?=\/*\1)/,"")+this.buildQuery(this.updateQuery(t))`；调用 `(e||this._router.lastRouteResolved().url).replace`、`this._router.lastRouteResolved`、`this.buildQuery`、`this.updateQuery`。 源码 eyes/src/engine/managers/RouteManager.js:195；参数 (t, e="")。
- `resetView(currentView, e)`：【结构证据】写入 `_currentView`、`_previousView`；调用 `this._app.getView`、`this._app.getView(s).setEnabled`、`this._app.getView(this._currentView).onEnter`、`this._app.getView(this._previousView).onLeave`、`this._app.getViews`。 源码 eyes/src/engine/managers/RouteManager.js:198；参数 (currentView, e)。
- `handleRoute(t, e, i)`：【结构证据】写入 `_currentRoute.params`；调用 `this.addCancelToken`、`this.goToView`、`this.parseQuery`、`this.resetView`。 源码 eyes/src/engine/managers/RouteManager.js:209；参数 (t, e, i)。
- `stillOnRoute(t)`：【结构证据】返回 `null!==e&&void 0!==e[1]&&e[1]===t`；调用 `this._currentRoute.url.match`。 源码 eyes/src/engine/managers/RouteManager.js:223；参数 (t)。
- `urlChanged(t, e)`：【结构证据】返回 `this.getOnlyURL(t)!==this.getOnlyURL(e)`；调用 `this.getOnlyURL`。 源码 eyes/src/engine/managers/RouteManager.js:227；参数 (t, e)。
- `routeChanged(t, e)`：【结构证据】返回 `true` 或 `t.url!==e.url`；调用 `EyesPublicApi.AppUtils.deepCopy`、`EyesPublicApi.AppUtils.deepEqual`、`EyesPublicApi.AppUtils.isEmptyObject`。 源码 eyes/src/engine/managers/RouteManager.js:230；参数 (t, e)。
- `queryChanged(t, e)`：【结构证据】返回 `true` 或 `!EyesPublicApi.AppUtils.deepEqual(i,s)`；调用 `EyesPublicApi.AppUtils.deepCopy`、`EyesPublicApi.AppUtils.deepEqual`、`e.split`、`e.split("&").forEach`、`i[t].toString`、`t.split`。 源码 eyes/src/engine/managers/RouteManager.js:238；参数 (t, e)。
- `goToView(t, e, i)`：【结构证据】调用 `this._app.getView`、`this._app.getView(t).onQueryChange`、`this._app.getView(t).onRouteChange`、`this.queryChanged`、`this.routeChanged`。 源码 eyes/src/engine/managers/RouteManager.js:249；参数 (t, e, i)。
- `addRoutes(t)`：【结构证据】调用 `this._router.on`、`this.before`、`this.handleRoute`。 源码 eyes/src/engine/managers/RouteManager.js:258；参数 (t)。
- `before(t, e, i)`：【结构证据】调用 `e.cancelToken.cancel`、`t`、`this._app.getView`、`this.addCancelToken`、`this.parseQuery`。 源码 eyes/src/engine/managers/RouteManager.js:274；参数 (t, e, i)。
- `subscribeToQuery(t, e)`：【结构证据】写入 `_queryCallbacks[t]`；返回 `()=>{const i=this._queryCallbacks[t].indexOf(e);this._queryCallbacks[t].splice(i,1);}`；调用 `this._queryCallbacks[t].includes`、`this._queryCallbacks[t].indexOf`、`this._queryCallbacks[t].push`、`this._queryCallbacks[t].splice`。 源码 eyes/src/engine/managers/RouteManager.js:285；参数 (t, e)。
- `start()`：【结构证据】调用 `this._router.resolve`、`this.handleEmbedQueries`。 源码 eyes/src/engine/managers/RouteManager.js:295；参数 ()。
- `handleEmbedQueries()`：【结构证据】调用 `t.description.replace`、`this._alwaysHiddenComponents.push`、`this.app.getComponent`。 源码 eyes/src/engine/managers/RouteManager.js:299；参数 ()。
- `navigate(t, e="", i={})`：【结构证据】返回 `this._navigate(t,e)`；调用 `EyesPublicApi.AppUtils.cleanPathDuplicate`、`EyesPublicApi.AppUtils.isEmptyObject`、`e.includes`、`this._app.getManager`、`this._navigate`、`timeManager.getTimeRate`。 源码 eyes/src/engine/managers/RouteManager.js:319；参数 (t, e="", i={})。
- `_navigate(t, e="")`：【结构证据】写入 `_query`；返回 `true` 或 `false`；调用 `EyesPublicApi.AppUtils.filterObject`、`s.split`、`t.includes`、`t.startsWith`、`this._router.navigate`、`this.buildQuery`。 源码 eyes/src/engine/managers/RouteManager.js:326；参数 (t, e="")。
- `returnHome(t=true)`：【结构证据】调用 `this.buildQuery`、`this.navigate`。 源码 eyes/src/engine/managers/RouteManager.js:344；参数 (t=true)。
- `reload(t=true, e=false)`：【结构证据】调用 `i.onQueryChange`、`i.onRouteChange`、`this._app.getView`、`this._router.lastRouteResolved`、`this.parseQuery`。 源码 eyes/src/engine/managers/RouteManager.js:348；参数 (t=true, e=false)。

### `eyes/src/engine/managers/SceneManager.js`

从实体配置建立主场景，协调可见性、高清纹理/WMTS、临时实体和强制加载状态。

- 证据：`import ../../vendor/modules/FollowName.cjs`。
- 证据：`import ../pioneer/index.js`。
- 证据：`import ../solar-system/public-api.js`。
- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`SceneManager extends EyesPublicApi.BaseManager @7`。

#### SceneManager

从实体配置建立主场景，协调可见性、高清纹理/WMTS、临时实体和强制加载状态。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/managers/SceneManager.js:7](../../eyes/src/engine/managers/SceneManager.js#L7)。

- `constructor(t)`：【结构证据】写入 `_componentTypesNotVisible`、`_entityExtraOptions`、`_entityLoadedCallbacks`、`_entityStatuses`、`_entityWillBeUnloadedCallbacks`、`_hdBreakpointSize`、`_hdToggleEntity`、`_hdWMTSMap`；调用 `new Map`、`new Pioneer.FastMap`、`new Set`、`super`、`this._eventNames.push`、`this._initCallbacks`。 源码 eyes/src/engine/managers/SceneManager.js:8；参数 (t)。
- `getHDToggleEntity()`：【结构证据】返回 `this._hdToggleEntity`。 源码 eyes/src/engine/managers/SceneManager.js:33；参数 ()。
- `add(t)`：【结构证据】写入 `_scenes[t]`；返回 `"main"===t&&this._scene?this._scene:(this._scenes[t]=this.pioneer.addScene(t),this._scenes[t].setAmbientLightColor(new Pioneer.Color(.005,.005,.005)),`；调用 `new Pioneer.Color`、`this._scenes[t].setAmbientLightColor`、`this.pioneer.addScene`。 源码 eyes/src/engine/managers/SceneManager.js:36；参数 (t)。
- `addEntity(t, e)`：【结构证据】调用 `new Error`、`new Set`、`this._entityStatuses.has`、`this._entityStatuses.set`、`this.app.getManager`、`this.app.getManager("layer").isEntityVisibleWithCurrentLayers`；含显式错误分支。 源码 eyes/src/engine/managers/SceneManager.js:39；参数 (t, e)。
- `removeEntity(t)`：【结构证据】调用 `new Error`、`this._entityStatuses.delete`、`this._entityWillBeUnloadedCallbacks[t]`、`this._scene.getEntity`、`this._scene.removeEntity`；含显式错误分支。 源码 eyes/src/engine/managers/SceneManager.js:51；参数 (t)。
- `getEntityStatus(t)`：【结构证据】返回 `this._entityStatuses.get(t)`；调用 `this._entityStatuses.get`。 源码 eyes/src/engine/managers/SceneManager.js:59；参数 (t)。
- `addEntitiesFromSceneInfo(t)`：【结构证据】调用 `SolarSystemSceneExports.Entity.getEntityNamesInGroup`、`SolarSystemSceneExports.Entity.getEntityNamesInGroup("").forEach`、`SolarSystemSceneExports.Entity.getEntityNamesInGroup(t).forEach`、`contentManager.getEntityInfo`、`map.delete`、`map.forEach`。 源码 eyes/src/engine/managers/SceneManager.js:62；参数 (t)。
- `addEntityLoadedCallback(t)`：【结构证据】调用 `this._entityLoadedCallbacks.push`。 源码 eyes/src/engine/managers/SceneManager.js:84；参数 (t)。
- `removeEntityLoadedCallback(t)`：【结构证据】返回 `void this._entityLoadedCallbacks.splice(e,1)`；调用 `this._entityLoadedCallbacks.splice`。 源码 eyes/src/engine/managers/SceneManager.js:87；参数 (t)。
- `addEntityWillBeUnloadedCallback(t)`：【结构证据】调用 `this._entityWillBeUnloadedCallbacks.push`。 源码 eyes/src/engine/managers/SceneManager.js:90；参数 (t)。
- `removeEntityWillBeUnloadedCallback(t)`：【结构证据】返回 `void this._entityWillBeUnloadedCallbacks.splice(e,1)`；调用 `this._entityWillBeUnloadedCallbacks.splice`。 源码 eyes/src/engine/managers/SceneManager.js:93；参数 (t)。
- `setEntitiesForceVisible(t, e, i=true)`：【结构证据】写入 `_entityStatuses.getAt(t).value.forceVisible`；调用 `new Error`、`this._entityStatuses.get`、`this._entityStatuses.getAt`、`this._entityStatuses.getSize`、`this.update`；含显式错误分支。 源码 eyes/src/engine/managers/SceneManager.js:96；参数 (t, e, i=true)。
- `setExtraEntityOptions(t)`：【结构证据】写入 `_entityExtraOptions`。 源码 eyes/src/engine/managers/SceneManager.js:108；参数 (t)。
- `updateEntityLayerVisibilityForChildren(t)`：【结构证据】调用 `SolarSystemSceneExports.Parenting.getAllAncestorsOfEntity`、`SolarSystemSceneExports.Parenting.getAllAncestorsOfEntity(n.key,i).has`、`layerManager.isEntityVisibleWithCurrentLayers`、`this._entityStatuses.getAt`、`this._entityStatuses.getSize`、`this._scene.getEngine`。 源码 eyes/src/engine/managers/SceneManager.js:113；参数 (t)。
- `updateEntityLayerVisibility(t)`：【结构证据】调用 `layerManager.isEntityVisibleWithCurrentLayers`、`this._entityStatuses.getAt`、`this._entityStatuses.getSize`、`this.app.getManager`。 源码 eyes/src/engine/managers/SceneManager.js:121；参数 (t)。
- `update()`：【结构证据】调用 `SolarSystemSceneExports.SceneHelpers.getDependentEntities`、`contentManager.getEntityInfo`、`t.getParent`、`this._createEntity`、`this._entityStatuses.get`、`this._entityStatuses.getAt`。 源码 eyes/src/engine/managers/SceneManager.js:128；参数 ()。
- `_createEntity(t)`：【结构证据】返回 `e`；调用 `SolarSystemSceneExports.Entity.create`、`SolarSystemSceneExports.SceneHelpers.getDependentEntities`、`i.dependentEntities.push`、`this._entityLoadedCallbacks[t]`、`this._entityStatuses.get`、`this.addEntity`。 源码 eyes/src/engine/managers/SceneManager.js:169；参数 (t)。
- `_isAncestorOfCamera(t, e)`：【结构证据】返回 `true` 或 `false`；调用 `i.getName`、`i.getNumParentingTableEntries`、`i.getParent`、`i.getParentingTableEntry`。 源码 eyes/src/engine/managers/SceneManager.js:181；参数 (t, e)。
- `setVisibility(t, e)`：【结构证据】返回 `void`；调用 `Array.from`、`Array.from(i.componentTypesNotVisible).some`、`i.componentTypesNotVisible.has`、`layerManager.getLayer`、`n.setEnabled`、`new Error`；含显式错误分支。 源码 eyes/src/engine/managers/SceneManager.js:190；参数 (t, e)。
- `_isEntityVisibleWithinParent(t)`：【结构证据】返回 `false` 或 `(s.systemRadius||25*s.radius||25*s.extentsRadius)/i.getExtentsRadius()*i.getGreatestPixelSpaceExtentsRadius()>=20`；调用 `SolarSystemSceneExports.Entity.getEntityOptions`、`SolarSystemSceneExports.Parenting.getParentOfEntity`、`i.getExtentsRadius`、`i.getGreatestPixelSpaceExtentsRadius`、`this._scene.getEngine`、`this._scene.getEngine().getTime`。 源码 eyes/src/engine/managers/SceneManager.js:209；参数 (t)。
- `get(t)`：【结构证据】返回 `void 0!==this._scenes[t]?this._scenes[t]:null`。 源码 eyes/src/engine/managers/SceneManager.js:216；参数 (t)。
- `getEntitiesNames()`：【结构证据】返回 `t`；调用 `i.getName`、`t.push`、`this._scene.getEntityAt`、`this._scene.getNumEntities`。 源码 eyes/src/engine/managers/SceneManager.js:219；参数 ()。
- `getParent(t)`：【结构证据】返回 `t.getName()` 或 `null`；调用 `e.getParent`、`t.getName`、`this._scene.getEntity`。 源码 eyes/src/engine/managers/SceneManager.js:227；参数 (t)。
- `getParentList(t)`：【结构证据】返回 `i`；调用 `i.push`、`this.getParent`。 源码 eyes/src/engine/managers/SceneManager.js:235；参数 (t)。
- `getDependencies(t)`：【结构证据】返回 `Array.from(set)`；调用 `Array.from`、`Object.keys`、`SolarSystemSceneExports.Entity.getEntityOptions`、`e.getNumParentingTableEntries`、`e.getParentingTableEntry`、`new Set`。 源码 eyes/src/engine/managers/SceneManager.js:244；参数 (t)。
- `isReady(t, e)`：【结构证据】调用 `this._scene.waitTillEntitiesInPlace`、`this.app.getManager`、`this.app.getManager("time").momentToET`、`this.pioneer.getTime`。 源码 eyes/src/engine/managers/SceneManager.js:262；参数 (t, e)。
- `isListReady(t, e)`：【结构证据】调用 `Promise.all`、`i.push`、`this.isReady`。 源码 eyes/src/engine/managers/SceneManager.js:266；参数 (t, e)。
- `tileIsReady(t)`：【结构证据】返回 `new Promise((i,s)=>{const n=setInterval(()=>{t.isEnabled()&&t.getEntity().isEnabled()||(clearInterval(n),s(new Error("disabled")));null===e&&null!==t.`；调用 `clearInterval`、`i`、`new Error`、`new Promise`、`s`、`setInterval`。 源码 eyes/src/engine/managers/SceneManager.js:272；参数 (t)。
- `hasCMTS(t)`：【结构证据】返回 `!!SolarSystemSceneExports.Mapping.getOptions()[t]&&"cmts"in SolarSystemSceneExports.Mapping.getOptions()[t]`；调用 `SolarSystemSceneExports.Mapping.getOptions`。 源码 eyes/src/engine/managers/SceneManager.js:284；参数 (t)。
- `getCMTSEntity(t)`：【结构证据】返回 `null` 或 `this._scene.getEntity(t)`；调用 `e.includes`、`this._scene.getEntity`、`this.hasCMTS`。 源码 eyes/src/engine/managers/SceneManager.js:287；参数 (t)。
- `terrainIsReady(t)`：【结构证据】返回 `new Promise(i=>{const s=setInterval(()=>{t.isEnabled()&&t.getEntity().isEnabled()||(clearInterval(s),i(true));null===e&&null!==t._loadedPromise&&(e=t.`；调用 `clearInterval`、`i`、`new Promise`、`setInterval`、`t.getEntity`、`t.getEntity().isEnabled`。 源码 eyes/src/engine/managers/SceneManager.js:294；参数 (t)。
- `componentIsReady(t)`：【结构证据】返回 `void` 或 `new Promise(e=>{const i=setInterval(()=>{t.isEnabled()&&t.getEntity().isEnabled()||(clearInterval(i),e(true));"loaded"===t.getLoadState().state&&(clea`；调用 `clearInterval`、`e`、`new Promise`、`setInterval`、`t.getEntity`、`t.getEntity().isEnabled`。 源码 eyes/src/engine/managers/SceneManager.js:306；参数 (t)。
- `toggleStarfield(t)`：【结构证据】调用 `this._scene.getEntity`、`this._scene.getEntity("sun").getComponent`、`this._scene.getEntity("sun").getComponent(Pioneer.StarfieldComponent,e).setEnabled`。 源码 eyes/src/engine/managers/SceneManager.js:315；参数 (t)。
- `toggleHeliosphere(t)`：【结构证据】调用 `this._scene.getEntity`、`this._scene.getEntity("sun").getComponent`、`this._scene.getEntity("sun").getComponent(Pioneer.ModelComponent).setEnabled`。 源码 eyes/src/engine/managers/SceneManager.js:318；参数 (t)。
- `toggleConstellations(t)`：【结构证据】返回 `void`；调用 `contentManager.getClassName`、`e.addComponent`、`e.getComponent`、`e.removeComponent`、`i.getLoadedPromise`、`i.getNames`。 源码 eyes/src/engine/managers/SceneManager.js:321；参数 (t)。
- `isHD()`：【结构证据】返回 `this._isHD`。 源码 eyes/src/engine/managers/SceneManager.js:360；参数 ()。
- `hasHD(t)`：【结构证据】返回 `false` 或 `true`；调用 `Object.prototype.hasOwnProperty.call`、`e.getComponent`、`e.getComponent(Pioneer.SpheroidLODComponent).getTextureSizes`、`e.getParent`、`e.getParent().getName`、`this._scene.getEntity`。 源码 eyes/src/engine/managers/SceneManager.js:363；参数 (t)。
- `setHDBreakpoints(hdBreakpointSize, maxTextureSize)`：【结构证据】写入 `_hdBreakpointSize`、`_maxTextureSize`。 源码 eyes/src/engine/managers/SceneManager.js:374；参数 (hdBreakpointSize, maxTextureSize)。
- `toggleHD()`：【结构证据】写入 `_isHD`；调用 `EyesPublicApi.AppUtils.isMobileMode`、`i.getComponent`、`n.setEnabled`、`n.setMaxLevel`、`s.setEnabled`、`this._scene.getEntity`。 源码 eyes/src/engine/managers/SceneManager.js:378；参数 ()。
- `updateHDTarget(t, e)`：【结构证据】写入 `_hdToggleEntity`；返回 `void(hdToggleEntity=this.app.getView("event")._eventInfo?.target)` 或 `void(hdToggleEntity=t)`；调用 `contentManager.getEntityInfo`、`this.app.getManager`、`this.app.getView`、`this.findClosestSpaceObjectTo`、`this.getParent`、`this.hasHD`。 源码 eyes/src/engine/managers/SceneManager.js:396；参数 (t, e)。
- `findClosestSpaceObjectTo(t)`：【结构证据】返回 `e.waitTillEntitiesInPlace(s,this.app.pioneer.getTime(),3).then(async()=>{let i="";let s=e.getEntity(n[0])?.getDistanceTo(e.getEntity(t),false);n.forEa`；调用 `Array.from`、`SolarSystemSceneExports.SceneHelpers.getDependentEntities`、`console.warn`、`e.getEntity`、`e.getEntity(n).getDistanceTo`、`e.waitTillEntitiesInPlace`。 源码 eyes/src/engine/managers/SceneManager.js:415；参数 (t)。
- `forceTextureSizeForEntity(t, e, i="color")`：【结构证据】调用 `s.forceTextureSize`、`this.app.pioneer.getScene`、`this.app.pioneer.getScene("main").getEntity`、`this.app.pioneer.getScene("main").getEntity(t).getComponent`。 源码 eyes/src/engine/managers/SceneManager.js:432；参数 (t, e, i="color")。
- `isEntityHD(t)`：【结构证据】返回 `!(null==e||!e.isEnabled())&&(await e.getTexturesLoadedPromise(3).catch(()=>false),e.getTextureCurrentSize("color",0)>this._hdBreakpointSize)`；调用 `e.getTextureCurrentSize`、`e.getTexturesLoadedPromise`、`e.getTexturesLoadedPromise(3).catch`、`e.isEnabled`、`this.app.pioneer.getScene`、`this.app.pioneer.getScene("main").getEntity`。 源码 eyes/src/engine/managers/SceneManager.js:436；参数 (t)。
- `toggleHDTextureForEntity(t, e=null)`：【结构证据】写入 `_isHD`；返回 `e` 或 `isHD`；调用 `EyesPublicApi.AppUtils.isiPhone`、`s.getTextureNames`、`s.getTextureNames().forEach`、`this.addLoading`、`this.app.getManager`、`this.app.getManager("content").getSpheroidDefaultTextureInformation`。 源码 eyes/src/engine/managers/SceneManager.js:440；参数 (t, e=null)。
- `createRing(t, e, i, {orbitPlaneEntityName:orbitPlaneEntityName,color:color,numCircles:a=1,numSpokes:l=0,labelPosition:c=new Pioneer.Vector3(-e,0,0),labelText:h="",isEnable:d=true}={})`：【结构证据】调用 `_.setColor`、`_.setLineWidth`、`_.setNumCircles`、`_.setNumSpokes`、`_.setSize`、`g.getDiv`。 源码 eyes/src/engine/managers/SceneManager.js:460；参数 (t, e, i, {orbitPlaneEntityName:orbitPlaneEntityName,color:color,numCircles:a=1,numSpokes:l=0,labelPosition:c=new Pioneer.Vector3(-e,0,0),labelText:h="",isEnable:d=true}={})。
- `createTorus(t, e, i, s, {orbitPlaneEntityName:orbitPlaneEntityName,color:color,visibleDistance:l=[Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY],labelPosition:c=new Pioneer.Vector3(-i,0,0),labelText:h="",isEnable:d=true}={})`：【结构证据】调用 `_.setColor`、`_.setInnerRadius`、`_.setOuterRadius`、`_.setVisibleInterval`、`g.getDiv`、`g.getDiv().classList.add`。 源码 eyes/src/engine/managers/SceneManager.js:490；参数 (t, e, i, s, {orbitPlaneEntityName:orbitPlaneEntityName,color:color,visibleDistance:l=[Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY],labelPosition:c=new Pioneer.Vector3(-i,0,0),labelText:h="",isEnable:d=true}={})。
- `setEntityHDWMTS(t, e)`：【结构证据】写入 `_hdWMTSMap[t]`。 源码 eyes/src/engine/managers/SceneManager.js:518；参数 (t, e)。
- `enableWMTSComponent(t, e)`：【结构证据】调用 `EyesPublicApi.AppUtils.isMobileMode`、`e.setEnabled`、`e.setMaxLevel`、`i.setEnabled`、`this.addLoading`、`this.get`。 源码 eyes/src/engine/managers/SceneManager.js:521；参数 (t, e)。
- `addWMTSComponent(t, e)`：【结构证据】调用 `this.addLoading`、`this.app.getManager`、`this.enableWMTSComponent`、`this.removeLoading`、`this.showWMTSError`、`wmtsManager.initWMTS`。 源码 eyes/src/engine/managers/SceneManager.js:531；参数 (t, e)。
- `showWMTSError(t)`：【结构证据】调用 `this.app.getComponent`、`this.hasHD`、`this.isHD`、`this.removeLoading`、`this.toggleHDTextureForEntity`、`toastComponent.setContent`。 源码 eyes/src/engine/managers/SceneManager.js:537；参数 (t)。
- `loadWMTSFromJSON(t)`：【结构证据】写入 `_hdWMTSMap[e]`；调用 `String`、`String(date.getDate()).padStart`、`String(date.getMonth()+1).padStart`、`date.getDate`、`date.getFullYear`、`date.getMonth`。 源码 eyes/src/engine/managers/SceneManager.js:546；参数 (t)。
- `setAlignPlane(t, e)`：【结构证据】调用 `i.getController`、`i.getController(Pioneer.DynamoController).getOrbitOrientation`、`new Pioneer.Quaternion`、`t.setOrientation`、`this._scene.getEntity`、`this.app.pioneer.getTime`。 源码 eyes/src/engine/managers/SceneManager.js:565；参数 (t, e)。
- `clearTempEntities()`：【结构证据】写入 `_tempEntities`；返回 `void`；调用 `t.getName`、`t.getParent`、`t.getParent().getName`、`this._scene.removeEntity`、`this._tempEntities.filter`、`this.app.getManager`。 源码 eyes/src/engine/managers/SceneManager.js:571；参数 ()。
- `addTempEntity(t)`：【结构证据】调用 `this._tempEntities.push`。 源码 eyes/src/engine/managers/SceneManager.js:582；参数 (t)。
- `addLoading(t, e)`：【结构证据】写入 `_isLoading`；调用 `this._loadingItems.indexOf`、`this._loadingItems.push`、`this.triggerCallbacks`。 源码 eyes/src/engine/managers/SceneManager.js:585；参数 (t, e)。
- `removeLoading(t, e)`：【结构证据】写入 `_isLoading`；调用 `this._loadingItems.indexOf`、`this._loadingItems.splice`、`this._loadingItems[t].includes`、`this.triggerCallbacks`。 源码 eyes/src/engine/managers/SceneManager.js:590；参数 (t, e)。
- `forceLoad(t)`：【结构证据】调用 `t.setForceLoaded`、`this._loadedComponents.push`。 源码 eyes/src/engine/managers/SceneManager.js:598；参数 (t)。
- `removeForceLoad(t)`：【结构证据】写入 `_loadedComponents`；调用 `t.setForceLoaded`、`this._loadedComponents.filter`。 源码 eyes/src/engine/managers/SceneManager.js:602；参数 (t)。
- `clearForceLoad()`：【结构证据】写入 `_loadedComponents`；调用 `this._loadedComponents[t].setForceLoaded`。 源码 eyes/src/engine/managers/SceneManager.js:605；参数 ()。
- `getDistance(t, e, {time:time,subtractRadius:s=false,precision:n=0}={})`：【结构证据】返回 `c`；调用 `Math.floor`、`Math.log10`、`Math.pow`、`Math.round`、`Pioneer.TimeUtils.unixToEt`、`Pioneer.Vector3.pool.get`。 源码 eyes/src/engine/managers/SceneManager.js:611；参数 (t, e, {time:time,subtractRadius:s=false,precision:n=0}={})。
- `getSpeed(t, e, {time:time}={})`：【结构证据】返回 `s.magnitude()`；调用 `Pioneer.Vector3.pool.get`、`Pioneer.Vector3.pool.release`、`n.getParent`、`n.getVelocityRelativeToEntity`、`s.magnitude`、`this._scene.getEntity`。 源码 eyes/src/engine/managers/SceneManager.js:634；参数 (t, e, {time:time}={})。
- `getCoverage(t, e=true)`：【结构证据】返回 `i`；调用 `Math.ceil`、`Math.floor`、`Math.max`、`Math.min`、`Pioneer.TimeUtils.etToUnix`、`getFollowName`。 源码 eyes/src/engine/managers/SceneManager.js:647；参数 (t, e=true)。
- `toggleRing(t)`：【结构证据】调用 `console.log`。 源码 eyes/src/engine/managers/SceneManager.js:669；参数 (t)。
- `main()`：【结构证据】返回 `this._scene`。 源码 eyes/src/engine/managers/SceneManager.js:672；参数 ()。
- `isLoading()`：【结构证据】返回 `this._isLoading`。 源码 eyes/src/engine/managers/SceneManager.js:675；参数 ()。

### `eyes/src/engine/managers/SearchManager.js`

将可搜索数据库条目交给模糊搜索实例，按 id 取条目并限制搜索结果数量。

- 证据：`import ../../vendor/modules/KeyStore.js`。
- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`SearchManager extends EyesPublicApi.BaseManager @4`。

#### SearchManager

将可搜索数据库条目交给模糊搜索实例，按 id 取条目并限制搜索结果数量。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/managers/SearchManager.js:4](../../eyes/src/engine/managers/SearchManager.js#L4)。

- `constructor(t, e={})`：【结构证据】写入 `_database`、`_fuse`、`_maxEntries`、`_options`；调用 `super`。 源码 eyes/src/engine/managers/SearchManager.js:5；参数 (t, e={})。
- `setOptions(t)`：【结构证据】写入 `_fuse`；调用 `Object.assign`、`new KeyStore.default`。 源码 eyes/src/engine/managers/SearchManager.js:25；参数 (t)。
- `setDatabase(t, e={})`：【结构证据】写入 `_database`、`_fuse`；调用 `Array.isArray`、`Object.assign`、`Object.keys`、`Object.keys(t).filter`、`console.error`、`i.map`。 源码 eyes/src/engine/managers/SearchManager.js:29；参数 (t, e={})。
- `getEntry(t)`：【结构证据】返回 `this._database.find(e=>e.id===t)`；调用 `this._database.find`。 源码 eyes/src/engine/managers/SearchManager.js:39；参数 (t)。
- `find(t, e=this._maxEntries)`：【结构证据】返回 `null` 或 `i`；调用 `i.slice`、`this._fuse.search`。 源码 eyes/src/engine/managers/SearchManager.js:42；参数 (t, e=this._maxEntries)。

### `eyes/src/engine/managers/SelectionManager-562.js`

处理 3D 选择，更新 DOM 选中类并导航到实体链接。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`SelectionManager extends EyesPublicApi.BaseManager @4`。

#### SelectionManager

处理 3D 选择，更新 DOM 选中类并导航到实体链接。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/managers/SelectionManager-562.js:4](../../eyes/src/engine/managers/SelectionManager-562.js#L4)。

- `constructor(t, scene)`：【结构证据】写入 `_id`、`_isClickable`、`_isSuppressed`、`_scene`；调用 `super`、`this._eventNames.push`、`this._initCallbacks`、`this.bindFunctions`。 源码 eyes/src/engine/managers/SelectionManager-562.js:5；参数 (t, scene)。
- `setScene(scene)`：【结构证据】写入 `_scene`。 源码 eyes/src/engine/managers/SelectionManager-562.js:15；参数 (scene)。
- `selectEntity(t)`：【结构证据】写入 `_id`；调用 `new CustomEvent`、`this._switchSelectionClass`、`window.dispatchEvent`。 源码 eyes/src/engine/managers/SelectionManager-562.js:18；参数 (t)。
- `unselect()`：【结构证据】写入 `_id`；调用 `new CustomEvent`、`this._switchSelectionClass`、`window.dispatchEvent`。 源码 eyes/src/engine/managers/SelectionManager-562.js:32；参数 ()。
- `getCurrentId()`：【结构证据】返回 `this._id`。 源码 eyes/src/engine/managers/SelectionManager-562.js:43；参数 ()。
- `setClickable(isClickable)`：【结构证据】写入 `_isClickable`。 源码 eyes/src/engine/managers/SelectionManager-562.js:46；参数 (isClickable)。
- `init3Dcallback(t)`：【结构证据】调用 `t.setSelectionCallback`。 源码 eyes/src/engine/managers/SelectionManager-562.js:49；参数 (t)。
- `_getLink(t)`：【结构证据】返回 ``/${t}``。 源码 eyes/src/engine/managers/SelectionManager-562.js:52；参数 (t)。
- `setSuppress(isSuppressed)`：【结构证据】写入 `_isSuppressed`。 源码 eyes/src/engine/managers/SelectionManager-562.js:55；参数 (isSuppressed)。
- `handle3DSelection(t)`：【结构证据】写入 `_isSuppressed`；调用 `routerManager.navigate`、`t.getName`、`this._app.getManager`、`this._getLink`、`this.triggerCallbacks`。 源码 eyes/src/engine/managers/SelectionManager-562.js:58；参数 (t)。
- `_switchSelectionClass(t, e)`：【结构证据】调用 `e.classList.remove`、`e.getComponent`、`e.getComponent(Pioneer.DivComponent).getDiv`、`t.classList.add`、`t.getComponent`、`t.getComponent(Pioneer.DivComponent).getDiv`。 源码 eyes/src/engine/managers/SelectionManager-562.js:77；参数 (t, e)。

### `eyes/src/engine/managers/SelectionManager-925.js`

扩展基础选择管理器，借助应用 LinkManager 解析太阳系专用链接。

- 证据：`import ../../framework/eyes/index.js`。
- 证据：`SelectionManager extends Eyes.SelectionManager @3`。

#### SelectionManager

扩展基础选择管理器，借助应用 LinkManager 解析太阳系专用链接。 继承：`Eyes.SelectionManager`。源码 [eyes/src/engine/managers/SelectionManager-925.js:3](../../eyes/src/engine/managers/SelectionManager-925.js#L3)。

- `_getLink(t)`：【结构证据】返回 `this._app.getManager("link")?.getParsedLink?.(e)||e`；调用 `super._getLink`、`this._app.getManager`。 源码 eyes/src/engine/managers/SelectionManager-925.js:4；参数 (t)。

### `eyes/src/engine/managers/SpoutManager.js`

建立额外投影视口、地球/目标相机和标签以支持球幕/外部显示。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ../solar-system/public-api.js`。
- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`SpoutManager extends EyesPublicApi.BaseManager @5`。

#### SpoutManager

建立额外投影视口、地球/目标相机和标签以支持球幕/外部显示。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/managers/SpoutManager.js:5](../../eyes/src/engine/managers/SpoutManager.js#L5)。

- `constructor(t)`：【结构证据】写入 `_defaultTarget`、`_defaultTargetRadius`、`_scene`；调用 `super`、`this._scene.getEntity`、`this._scene.getEntity("earth").getExtentsRadius`、`this.app.getManager`、`this.app.pioneer.getScene`、`this.getSpoutCameraTargetEntity`。 源码 eyes/src/engine/managers/SpoutManager.js:6；参数 (t)。
- `enableSpout(t=false, e=2048, i=2*this._defaultTargetRadius, n=this._defaultTarget, o=25, r=0, a=false)`：【结构证据】调用 `c.getComponent`、`c.getExtentsRadius`、`d.setForGlobe`、`d.setNearDistance`、`d.setRenderWidth`、`h.addComponent`。 源码 eyes/src/engine/managers/SpoutManager.js:12；参数 (t=false, e=2048, i=2*this._defaultTargetRadius, n=this._defaultTarget, o=25, r=0, a=false)。
- `setUpSpoutCamera(t, e=this._defaultTarget, i=false, n=0)`：【结构证据】返回 `o`；调用 `Pioneer.Geometry.getXYZFromLLAOnSphere`、`Pioneer.MathUtils.degToRad`、`e.getName`、`new Pioneer.LatLonAlt`、`new Pioneer.Vector3`、`o.addController`。 源码 eyes/src/engine/managers/SpoutManager.js:26；参数 (t, e=this._defaultTarget, i=false, n=0)。
- `setUpSpoutLabels(t=25, e=null)`：【结构证据】调用 `e.setAlignment`、`e.setColor`、`e.setExcludedFromCamera`、`e.setFontSize`、`e.setPixelOffset`、`e.setText`。 源码 eyes/src/engine/managers/SpoutManager.js:48；参数 (t=25, e=null)。
- `getSpoutCameraTargetEntity(t)`：【结构证据】返回 `e`；调用 `EyesPublicApi.AppUtils.isFutureMission`、`contentManager.getEntityDesc`、`contentManager.getEntityInfo`、`o.getParent`、`o.getParent().getName`、`o.getParent().getName().includes`。 源码 eyes/src/engine/managers/SpoutManager.js:65；参数 (t)。

### `eyes/src/engine/managers/TimeManager-728.js`

在 Moment 时区时间与 Pioneer ET 之间转换，控制播放速率、上下限和时间事件。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ../../vendor/modules/FollowName.cjs`。
- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`TimeManager extends EyesPublicApi.BaseManager @6`。

#### TimeManager

在 Moment 时区时间与 Pioneer ET 之间转换，控制播放速率、上下限和时间事件。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/managers/TimeManager-728.js:6](../../eyes/src/engine/managers/TimeManager-728.js#L6)。

- `constructor(t)`：【结构证据】写入 `_dateFormats`、`_defaultLimits`、`_defaultRate`、`_ertMgr`、`_forcedPause`、`_isUTC`、`_localTimezone`、`_previousTimeRate`；调用 `Pioneer.TimeUtils.etToUnix`、`console.warn`、`getFollowName`、`getFollowName().tz`、`getFollowName().tz.guess`、`i.valueOf`。 源码 eyes/src/engine/managers/TimeManager-728.js:7；参数 (t)。
- `_onLimitReach(t)`：【结构证据】写入 `_forcedPause`、`_previousTimeRate`；调用 `this.getTimeRate`、`this.pause`、`this.setTime`、`this.triggerCallbacks`。 源码 eyes/src/engine/managers/TimeManager-728.js:56；参数 (t)。
- `setERTManager(ertMgr)`：【结构证据】写入 `_ertMgr`。 源码 eyes/src/engine/managers/TimeManager-728.js:60；参数 (ertMgr)。
- `isNow()`：【结构证据】返回 `1===this._rate&&Math.abs(this._time.valueOf()-this.getNow().valueOf())<1e3`；调用 `Math.abs`、`this._time.valueOf`、`this.getNow`、`this.getNow().valueOf`。 源码 eyes/src/engine/managers/TimeManager-728.js:63；参数 ()。
- `getNow()`：【结构证据】返回 `t`；调用 `0,this._callbacks.getnow[e]`、`getFollowName`、`getFollowName()`、`getFollowName()().tz`。 源码 eyes/src/engine/managers/TimeManager-728.js:66；参数 ()。
- `setToNow()`：【结构证据】调用 `this.getNow`、`this.setTime`。 源码 eyes/src/engine/managers/TimeManager-728.js:73；参数 ()。
- `setStartTime(startTime)`：【结构证据】写入 `_startTime`。 源码 eyes/src/engine/managers/TimeManager-728.js:76；参数 (startTime)。
- `setToStart()`：【结构证据】调用 `this.setTime`。 源码 eyes/src/engine/managers/TimeManager-728.js:79；参数 ()。
- `getTime()`：【结构证据】返回 `this._time`。 源码 eyes/src/engine/managers/TimeManager-728.js:82；参数 ()。
- `setTime(t)`：【结构证据】写入 `_time`；调用 `Pioneer.TimeUtils.etToUnix`、`getFollowName`、`getFollowName().tz`、`this.momentToET`、`this.parseTime`、`this.pioneer.getTime`。 源码 eyes/src/engine/managers/TimeManager-728.js:85；参数 (t)。
- `parseTime(t, e="url")`：【结构证据】返回 `isUTC?getFollowName().utc(t):getFollowName().tz(t,s,true,this._localTimezone)`；调用 `getFollowName`、`getFollowName().tz`、`getFollowName().utc`、`t.match`、`this.getDateFormat`。 源码 eyes/src/engine/managers/TimeManager-728.js:92；参数 (t, e="url")。
- `etToMoment(t)`：【结构证据】返回 `null` 或 `e.isValid()?e:null`；调用 `Pioneer.TimeUtils.etToUnix`、`e.isValid`、`getFollowName`、`getFollowName().tz`、`isFinite`。 源码 eyes/src/engine/managers/TimeManager-728.js:104；参数 (t)。
- `momentToET(t)`：【结构证据】返回 `Math.round(1e3*i)/1e3`；调用 `Math.round`、`Pioneer.TimeUtils.unixToEt`、`t.valueOf`。 源码 eyes/src/engine/managers/TimeManager-728.js:109；参数 (t)。
- `urlToET(t)`：【结构证据】返回 `this.momentToET(e)`；调用 `this.momentToET`、`this.parseTime`。 源码 eyes/src/engine/managers/TimeManager-728.js:114；参数 (t)。
- `getTimezone()`：【结构证据】返回 `this._timezone`。 源码 eyes/src/engine/managers/TimeManager-728.js:118；参数 ()。
- `getUTCTimezone()`：【结构证据】返回 `this._utcTimezone`。 源码 eyes/src/engine/managers/TimeManager-728.js:121；参数 ()。
- `getLocalTimezone()`：【结构证据】返回 `this._localTimezone`。 源码 eyes/src/engine/managers/TimeManager-728.js:124；参数 ()。
- `isUTC()`：【结构证据】返回 `this._isUTC`。 源码 eyes/src/engine/managers/TimeManager-728.js:127；参数 ()。
- `setDisplayUTC(isUTC)`：【结构证据】写入 `_isUTC`、`_timezone`；调用 `this.triggerCallbacks`。 源码 eyes/src/engine/managers/TimeManager-728.js:130；参数 (isUTC)。
- `getDateFormats()`：【结构证据】返回 `this._dateFormats`。 源码 eyes/src/engine/managers/TimeManager-728.js:135；参数 ()。
- `setDateFormats(t)`：【结构证据】写入 `_dateFormats[e]`；调用 `Object.assign`、`Object.entries`。 源码 eyes/src/engine/managers/TimeManager-728.js:138；参数 (t)。
- `getDateFormat(t, e)`：【结构证据】返回 `this._dateFormats[e][t]`。 源码 eyes/src/engine/managers/TimeManager-728.js:141；参数 (t, e)。
- `setDateFormat(t, e)`：【结构证据】写入 `_dateFormats[t]`。 源码 eyes/src/engine/managers/TimeManager-728.js:145；参数 (t, e)。
- `getLimits()`：【结构证据】返回 `this._timeLimits`。 源码 eyes/src/engine/managers/TimeManager-728.js:148；参数 ()。
- `setLimits(t)`：【结构证据】写入 `_timeLimits.max`、`_timeLimits.min`；调用 `t.max.clone`、`t.min.clone`。 源码 eyes/src/engine/managers/TimeManager-728.js:151；参数 (t)。
- `getDefaultLimits()`：【结构证据】返回 `this._defaultLimits`。 源码 eyes/src/engine/managers/TimeManager-728.js:155；参数 ()。
- `setDefaultLimits(t)`：【结构证据】写入 `_defaultLimits.max`、`_defaultLimits.min`；调用 `t.max.clone`、`t.min.clone`。 源码 eyes/src/engine/managers/TimeManager-728.js:158；参数 (t)。
- `resetLimits()`：【结构证据】写入 `_timeLimits.max`、`_timeLimits.min`；调用 `this._defaultLimits.max.clone`、`this._defaultLimits.min.clone`。 源码 eyes/src/engine/managers/TimeManager-728.js:162；参数 ()。
- `setMin(t)`：【结构证据】写入 `_timeLimits.min`；调用 `getFollowName`、`getFollowName().tz`。 源码 eyes/src/engine/managers/TimeManager-728.js:166；参数 (t)。
- `resetMin()`：【结构证据】写入 `_timeLimits.min`；调用 `this._defaultLimits.min.clone`。 源码 eyes/src/engine/managers/TimeManager-728.js:169；参数 ()。
- `setMax(t)`：【结构证据】写入 `_timeLimits.max`；调用 `getFollowName`、`getFollowName().tz`。 源码 eyes/src/engine/managers/TimeManager-728.js:172；参数 (t)。
- `resetMax()`：【结构证据】写入 `_timeLimits.max`；调用 `this._defaultLimits.max.clone`。 源码 eyes/src/engine/managers/TimeManager-728.js:175；参数 ()。
- `getTimeUrl(t)`：【结构证据】返回 `e.utc().format(this._dateFormats.utc.url)`；调用 `e.utc`、`e.utc().format`、`getFollowName`、`getFollowName().tz`、`getFollowName().utc`。 源码 eyes/src/engine/managers/TimeManager-728.js:178；参数 (t)。
- `getDefaultTimeRate()`：【结构证据】返回 `this._defaultRate`。 源码 eyes/src/engine/managers/TimeManager-728.js:183；参数 ()。
- `setDefaultTimeRate(defaultRate)`：【结构证据】写入 `_defaultRate`。 源码 eyes/src/engine/managers/TimeManager-728.js:186；参数 (defaultRate)。
- `resetTimeRate()`：【结构证据】调用 `this.setTimeRate`。 源码 eyes/src/engine/managers/TimeManager-728.js:189；参数 ()。
- `getTimeRate()`：【结构证据】返回 `this.pioneer.getTimeRate()`；调用 `this.pioneer.getTimeRate`。 源码 eyes/src/engine/managers/TimeManager-728.js:192；参数 ()。
- `setTimeRate(rate)`：【结构证据】写入 `_rate`；调用 `this.pioneer.setTimeRate`、`this.triggerCallbacks`。 源码 eyes/src/engine/managers/TimeManager-728.js:195；参数 (rate)。
- `play()`：【结构证据】调用 `this.setTimeRate`。 源码 eyes/src/engine/managers/TimeManager-728.js:200；参数 ()。
- `pause()`：【结构证据】写入 `_previousTimeRate`；调用 `this.getTimeRate`、`this.setTimeRate`。 源码 eyes/src/engine/managers/TimeManager-728.js:204；参数 ()。
- `getMidTime(t, e)`：【结构证据】返回 `getFollowName()(i,"X")`；调用 `e.unix`、`getFollowName`、`getFollowName()`、`t.unix`。 源码 eyes/src/engine/managers/TimeManager-728.js:208；参数 (t, e)。
- `getEventNames()`：【结构证据】返回 `this._eventNames`。 源码 eyes/src/engine/managers/TimeManager-728.js:212；参数 ()。
- `isWithinLimits(t)`：【结构证据】返回 `this._timeLimits.min&&t.isBefore(this._timeLimits.min)?-1:this._timeLimits.max&&t.isAfter(this._timeLimits.max)?1:0`；调用 `t.isAfter`、`t.isBefore`。 源码 eyes/src/engine/managers/TimeManager-728.js:215；参数 (t)。
- `timeLimits()`：【结构证据】返回 `this._timeLimits`。 源码 eyes/src/engine/managers/TimeManager-728.js:218；参数 ()。
- `forcedPause()`：【结构证据】返回 `this._forcedPause`。 源码 eyes/src/engine/managers/TimeManager-728.js:221；参数 ()。
- `previousTimeRate()`：【结构证据】返回 `this._previousTimeRate`。 源码 eyes/src/engine/managers/TimeManager-728.js:224；参数 ()。

### `eyes/src/engine/managers/TimeManager-922.js`

继承基础时间管理器，在触及边界时更新太阳系时钟提示、展开控件并处理路由。

- 证据：`import ../../framework/eyes/index.js`。
- 证据：`TimeManager extends Eyes.TimeManager @3`。

#### TimeManager

继承基础时间管理器，在触及边界时更新太阳系时钟提示、展开控件并处理路由。 继承：`Eyes.TimeManager`。源码 [eyes/src/engine/managers/TimeManager-922.js:3](../../eyes/src/engine/managers/TimeManager-922.js#L3)。

- `_onLimitReach(t)`：【结构证据】写入 `app.getView("distance")._redirect`；调用 `i.add`、`i.subtract`、`this._app.getComponent`、`this._app.getManager`、`this.app.getComponent`、`this.app.getView`。 源码 eyes/src/engine/managers/TimeManager-922.js:4；参数 (t)。

### `eyes/src/engine/managers/TitleManager.js`

将路由交给标题解析函数并更新页面标题。

- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`TitleManager extends EyesPublicApi.BaseManager @3`。

#### TitleManager

将路由交给标题解析函数并更新页面标题。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/managers/TitleManager.js:3](../../eyes/src/engine/managers/TitleManager.js#L3)。

- `constructor(t, options)`：【结构证据】写入 `_currentTitle`、`_fullTitle`、`_options`、`_parseFn`；调用 `super`。 源码 eyes/src/engine/managers/TitleManager.js:4；参数 (t, options)。
- `updateTitle(t)`：【结构证据】写入 `_currentTitle`、`_fullTitle`；调用 `this._parseRoute`。 源码 eyes/src/engine/managers/TitleManager.js:11；参数 (t)。
- `_parseRoute(t)`：【结构证据】返回 `this._parseFn?this._parseFn(t):"Home"`；调用 `this._parseFn`。 源码 eyes/src/engine/managers/TitleManager.js:20；参数 (t)。
- `setParseFunction(parseFn)`：【结构证据】写入 `_parseFn`。 源码 eyes/src/engine/managers/TitleManager.js:23；参数 (parseFn)。
- `currentTitle()`：【结构证据】返回 `this._currentTitle`。 源码 eyes/src/engine/managers/TitleManager.js:26；参数 ()。
- `fullTitle()`：【结构证据】返回 `this._fullTitle`。 源码 eyes/src/engine/managers/TitleManager.js:29；参数 ()。

### `eyes/src/engine/managers/TrailManager.js`

按图层与实体类别创建、显示、隐藏轨迹和轨道线，处理悬停宽度/颜色。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ../solar-system/public-api.js`。
- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`TrailManager extends EyesPublicApi.BaseManager @5`。

#### TrailManager

按图层与实体类别创建、显示、隐藏轨迹和轨道线，处理悬停宽度/颜色。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/managers/TrailManager.js:5](../../eyes/src/engine/managers/TrailManager.js#L5)。

- `constructor(t, scene)`：【结构证据】写入 `_colors`、`_hiddenIds`、`_ids`、`_opacity`、`_orbitLineEntityNames`、`_orbitLinesOpts`、`_scene`、`_width`；调用 `SolarSystemSceneExports.Entity.getEntityNamesInGroup`、`SolarSystemSceneExports.Entity.getEntityNamesInGroup("planets").add`、`new Pioneer.Color`、`super`、`this.bindFunctions`。 源码 eyes/src/engine/managers/TrailManager.js:6；参数 (t, scene)。
- `setScene(scene)`：【结构证据】写入 `_scene`。 源码 eyes/src/engine/managers/TrailManager.js:45；参数 (scene)。
- `create(t)`：【结构证据】返回 `void console.warn("Trail already exists for",t)` 或 `e`；调用 `console.warn`、`this._ids.push`、`this._scene.getEntity`、`this._scene.getEntity(t).addComponent`、`this._scene.getEntity(t).getComponent`。 源码 eyes/src/engine/managers/TrailManager.js:48；参数 (t)。
- `setStartTime(t, e)`：【结构证据】调用 `Array.isArray`、`n.setStartTime`、`this._scene.getEntity`、`this._scene.getEntity(t[i]).getComponent`。 源码 eyes/src/engine/managers/TrailManager.js:54；参数 (t, e)。
- `setEndTime(t, e)`：【结构证据】调用 `Array.isArray`、`n.setEndTime`、`this._scene.getEntity`、`this._scene.getEntity(t[i]).getComponent`。 源码 eyes/src/engine/managers/TrailManager.js:61；参数 (t, e)。
- `onHoverChange(t, e, i=false)`：【结构证据】返回 `void`；调用 `a.setGlowWidth`、`a.setLineWidth`、`c.getColor`、`c.setColor`、`color.copy`、`new Pioneer.Color`。 源码 eyes/src/engine/managers/TrailManager.js:68；参数 (t, e, i=false)。
- `setFade(t, e)`：【结构证据】调用 `Array.isArray`、`n.setAlphaFade`、`this._scene.getEntity`、`this._scene.getEntity(t[i]).getComponent`。 源码 eyes/src/engine/managers/TrailManager.js:98；参数 (t, e)。
- `setWidths(t, e, i)`：【结构证据】调用 `Array.isArray`、`o.setWidths`、`this._scene.getEntity`、`this._scene.getEntity(t[n]).getComponent`。 源码 eyes/src/engine/managers/TrailManager.js:105；参数 (t, e, i)。
- `setMultipleWidths(t, e, i)`：【结构证据】调用 `t.setWidths`、`this._scene.getEntity`、`this._scene.getEntity(n).getComponent`。 源码 eyes/src/engine/managers/TrailManager.js:112；参数 (t, e, i)。
- `getColor(t)`：【结构证据】返回 `e?e.getColor():null`；调用 `e.getColor`、`this._scene.getEntity`、`this._scene.getEntity(t).getComponent`。 源码 eyes/src/engine/managers/TrailManager.js:118；参数 (t)。
- `setColor(t, e=null)`：【结构证据】调用 `Array.isArray`、`o.setColor`、`this._scene.getEntity`、`this._scene.getEntity(n).getComponent`。 源码 eyes/src/engine/managers/TrailManager.js:122；参数 (t, e=null)。
- `setUpTrail(t)`：【结构证据】调用 `layerManager.getLayer`、`sceneManager.setVisibility`、`t.getName`、`this._app.getManager`、`this._orbitLineEntityNames.has`、`this.createOrbitLine`。 源码 eyes/src/engine/managers/TrailManager.js:133；参数 (t)。
- `show(t=null)`：【结构证据】调用 `Array.isArray`、`console.warn`、`n.setEnabled`、`this._hiddenIds.indexOf`、`this._hiddenIds.splice`、`this._scene.getEntity`。 源码 eyes/src/engine/managers/TrailManager.js:142；参数 (t=null)。
- `hide(hiddenIds=null)`：【结构证据】写入 `_hiddenIds`；调用 `Array.isArray`、`i.setEnabled`、`this._scene.getEntity`、`this._scene.getEntity(hiddenIds[e]).getComponent`。 源码 eyes/src/engine/managers/TrailManager.js:154；参数 (hiddenIds=null)。
- `toggleTrails(t, {scene:scene}={})`：【结构证据】调用 `n.getComponent`、`n.getName`、`o.setEnabled`、`scene.getEntityAt`、`scene.getNumEntities`、`this._app.getManager`。 源码 eyes/src/engine/managers/TrailManager.js:162；参数 (t, {scene:scene}={})。
- `createOrbitLine(t)`：【结构证据】调用 `i.setColor`、`i.setEnabled`、`i.setGlowWidth`、`i.setLineWidth`、`i.setVisibleInterval`、`t.addComponent`。 源码 eyes/src/engine/managers/TrailManager.js:183；参数 (t)。
- `toggleOrbits(t)`：【结构证据】调用 `this._orbitLineEntityNames.forEach`、`this._scene.getEntity`。 源码 eyes/src/engine/managers/TrailManager.js:200；参数 (t)。
- `get ids()`：【结构证据】读取访问器，返回 `this._ids`；本访问器没有 AST 可见的 this 字段直接赋值。源码 eyes/src/engine/managers/TrailManager.js:291；参数 ()。
- `set ids(t)`：【结构证据】写入访问器，接收参数 (t)；本访问器没有 AST 可见的 this 字段直接赋值；调用 `Array.isArray`、`this._ids.includes`、`this._ids.push`、`this._scene.getEntity`、`this._scene.getEntity(i).getComponent`。源码 eyes/src/engine/managers/TrailManager.js:298；参数 (t)。

### `eyes/src/engine/managers/TrajectoryManager.js`

为定制任务创建按阶段控制的轨迹、指示器与 UI，进入/退出时保存恢复图层及时间控件。

- 证据：`import ../../framework/eyes/index.js`。
- 证据：`import ../pioneer/index.js`。
- 证据：`TrajectoryManager extends Eyes.BaseManager @4`。

#### TrajectoryManager

为定制任务创建按阶段控制的轨迹、指示器与 UI，进入/退出时保存恢复图层及时间控件。 继承：`Eyes.BaseManager`。源码 [eyes/src/engine/managers/TrajectoryManager.js:4](../../eyes/src/engine/managers/TrajectoryManager.js#L4)。

- `constructor(app)`：【结构证据】写入 `_app`、`_atSystem`、`_callbackEnabled`、`_entityId`、`_isEnabled`、`_offsetObserver`、`_prevEntityId`、`_resizeObserver`；调用 `new MutationObserver`、`new ResizeObserver`、`super`、`t.forEach`、`this._calcIndicatorPadding`、`this._eventNames.push`。 源码 eyes/src/engine/managers/TrajectoryManager.js:5；参数 (app)。
- `getCustomMissions()`：【结构证据】返回 `r`。 源码 eyes/src/engine/managers/TrajectoryManager.js:27；参数 ()。
- `createTrajectory(t, e, i=null)`：【结构证据】返回 `void`；调用 `new Pioneer.Color`、`p.setAlphaFade`、`p.setColor`、`p.setDrawStartTime`、`p.setEnabled`、`p.setEndTime`。 源码 eyes/src/engine/managers/TrajectoryManager.js:30；参数 (t, e, i=null)。
- `hasTrajectoryOptions(t)`：【结构证据】返回 `!!t&&Object.keys(this.getCustomMissions()).includes(t)`；调用 `Object.keys`、`Object.keys(this.getCustomMissions()).includes`、`this.getCustomMissions`。 源码 eyes/src/engine/managers/TrajectoryManager.js:53；参数 (t)。
- `setEnabled(isEnabled, entityId, i=["trajectory"])`：【结构证据】写入 `_entityId`、`_isEnabled`、`_prevEntityId`、`_urlMissionChoice`、`_wasAlreadyEnabled`；调用 `Object.keys`、`o.includes`、`this._app.getManager`、`this._app.getManager("router").navigate`、`this._enterSelectedTrajectoryView`、`this._offsetObserver.disconnect`。 源码 eyes/src/engine/managers/TrajectoryManager.js:56；参数 (isEnabled, entityId, i=["trajectory"])。
- `_enterSelectedTrajectoryView(entityId, e)`：【结构证据】写入 `_atSystem`、`_entityId`；调用 `Object.keys`、`Object.keys(r[entityId].missionOptions).forEach`、`document.getElementById`、`this._toggleLayers`、`this.app.cameraScripts.goToSystem`、`this.triggerCallbacks`。 源码 eyes/src/engine/managers/TrajectoryManager.js:77；参数 (entityId, e)。
- `_toggleLayers()`：【结构证据】调用 `this._app.getComponent`、`this._app.getManager`、`this._app.getManager("layer").toggleLayer`。 源码 eyes/src/engine/managers/TrajectoryManager.js:94；参数 ()。
- `_onEnable()`：【结构证据】返回 `void`；调用 `Eyes.AppUtils.isMobile`、`document.getElementById`、`this._app.getComponent`、`this._app.getManager`、`this._app.getManager("label").setClickable`、`this._app.getManager("selection").setClickable`。 源码 eyes/src/engine/managers/TrajectoryManager.js:103；参数 ()。
- `_onDisable()`：【结构证据】写入 `_atSystem`；调用 `Eyes.AppUtils.isMobile`、`Object.keys`、`Object.keys(r[e].missionOptions).forEach`、`document.getElementById`、`r[e].associatedEntities.forEach`、`this._app.getComponent`。 源码 eyes/src/engine/managers/TrajectoryManager.js:123；参数 ()。
- `isEnabled()`：【结构证据】返回 `this._isEnabled`。 源码 eyes/src/engine/managers/TrajectoryManager.js:161；参数 ()。
- `createUI(t)`：【结构证据】返回 `void`；调用 `Array.from`、`Array.from(t.children).filter`、`t.appendChild`、`t.classList.contains`、`this._app.pioneer.getScene`、`this._app.pioneer.getScene("main").getEntity`。 源码 eyes/src/engine/managers/TrajectoryManager.js:164；参数 (t)。
- `_createExitButton()`：【结构证据】返回 `t`；调用 `document.createElement`、`t.addEventListener`、`this._app.getComponent`、`this._app.getComponent("cameraViewBlock").goToDefaultView`、`this.setEnabled`。 源码 eyes/src/engine/managers/TrajectoryManager.js:174；参数 ()。
- `_createCheckboxOptions(t)`：【结构证据】写入 `_trajectoryViewId`；返回 `void` 或 `e`；调用 `Object.keys`、`Object.keys(r[t.getName()].missionOptions).forEach`、`a.appendChild`、`document.createElement`、`e.appendChild`、`h.setAttribute`。 源码 eyes/src/engine/managers/TrajectoryManager.js:184；参数 (t)。
- `customEngineLoopCallback()`：【结构证据】调用 `Math.min`、`Math.round`、`Object.keys`、`Object.keys(l).forEach`、`isNaN`、`this._app.getManager`。 源码 eyes/src/engine/managers/TrajectoryManager.js:224；参数 ()。
- `setEngineLoopCallback(t)`：【结构证据】写入 `_callbackEnabled`；调用 `this._app.pioneer.addCallback`、`this._app.pioneer.removeCallback`。 源码 eyes/src/engine/managers/TrajectoryManager.js:244；参数 (t)。
- `enableAssociatedEntities(t)`：【结构证据】调用 `r[t].associatedEntities.forEach`、`this._app.getManager`、`this._app.getManager("scene").setEntitiesForceVisible`、`this._app.pioneer.getScene`、`this._app.pioneer.getScene("main").getEntity`、`this._app.pioneer.getScene("main").getEntity(t).setEnabled`。 源码 eyes/src/engine/managers/TrajectoryManager.js:247；参数 (t)。
- `setUpAssociatedEntities(t, e=true)`：【结构证据】调用 `this._setUpAssociatedEntityTrails`、`this._setUpIndicatorForEntity`。 源码 eyes/src/engine/managers/TrajectoryManager.js:253；参数 (t, e=true)。
- `_setUpAssociatedEntityTrails(t, e=true)`：【结构证据】返回 `void` 或 `void t.getComponent(Pioneer.TrailComponent,i)?.setEnabled(false)`；调用 `Math.abs`、`Object.keys`、`t.getComponent`、`t.getName`、`this.createTrajectory`。 源码 eyes/src/engine/managers/TrajectoryManager.js:257；参数 (t, e=true)。
- `_setUpIndicatorForEntity(t, e=true)`：【结构证据】返回 `void(e&&t.removeComponent(e))`；调用 `s.getDiv`、`s.getDiv().classList.add`、`t.addComponent`、`t.getComponent`、`t.getName`、`t.removeComponent`。 源码 eyes/src/engine/managers/TrajectoryManager.js:277；参数 (t, e=true)。
- `_calcIndicatorPadding(t=this._entityId)`：【结构证据】调用 `Eyes.AppUtils.isMobile`、`Eyes.AppUtils.isTablet`、`Math.round`、`[t,...(r[t]?.associatedEntities??[])].forEach`、`document.body.classList.contains`、`this._app.getComponent`。 源码 eyes/src/engine/managers/TrajectoryManager.js:290；参数 (t=this._entityId)。
- `setUpVoyagers(t, e)`：【结构证据】调用 `Math.abs`、`c.addComponent`、`c.getComponent`、`d.setDrawStartTime`、`d.setEnabled`、`d.setEndTime`。 源码 eyes/src/engine/managers/TrajectoryManager.js:314；参数 (t, e)。

### `eyes/src/engine/managers/WMTSManager.js`

获取 WMTS 配置，核验日期与后备图源，创建并配置 WMTSComponent。

- 证据：`import ../pioneer/index.js`。
- 证据：`import ../solar-system/public-api.js`。
- 证据：`import ../../framework/eyes/public-api.js`。
- 证据：`WMTSManager extends EyesPublicApi.BaseManager @5`。

#### WMTSManager

获取 WMTS 配置，核验日期与后备图源，创建并配置 WMTSComponent。 继承：`EyesPublicApi.BaseManager`。源码 [eyes/src/engine/managers/WMTSManager.js:5](../../eyes/src/engine/managers/WMTSManager.js#L5)。

- `constructor(t)`：【结构证据】写入 `_wmtsComponentStates`；调用 `new Map`、`super`、`this.bindFunctions`。 源码 eyes/src/engine/managers/WMTSManager.js:6；参数 (t)。
- `getWMTSComponentState(t)`：【结构证据】返回 `this._wmtsComponentStates.get(t)`；调用 `this._wmtsComponentStates.get`。 源码 eyes/src/engine/managers/WMTSManager.js:11；参数 (t)。
- `setWMTSComponentState(t, e)`：【结构证据】调用 `this._wmtsComponentStates.set`。 源码 eyes/src/engine/managers/WMTSManager.js:14；参数 (t, e)。
- `getImageDate(t)`：【结构证据】返回 `null` 或 `date.getFullYear()+"-"+String(date.getMonth()+1).padStart(2,"0")+"-"+String(date.getDate()).padStart(2,"0")`；调用 `String`、`String(date.getDate()).padStart`、`String(date.getMonth()+1).padStart`、`console.warn`、`date.getDate`、`date.getFullYear`。 源码 eyes/src/engine/managers/WMTSManager.js:17；参数 (t)。
- `verifyImageURL(t, e, i)`：【结构证据】返回 `await Promise.race([n,promise])` 或 `false`；调用 `Promise.race`、`a.startsWith`、`console.error`、`e`、`fetch`、`n.querySelector`；含显式错误分支。 源码 eyes/src/engine/managers/WMTSManager.js:25；参数 (t, e, i)。
- `getValidWMTSData(t)`：【结构证据】返回 `t` 或 `null`；调用 `JSON.parse`、`[t,...fallbacks].find`、`console.error`、`console.warn`、`t.content.toString`、`this.app.pioneer.getDownloader`。 源码 eyes/src/engine/managers/WMTSManager.js:50；参数 (t)。
- `initWMTS(t, e)`：【结构证据】返回 `null` 或 `n`；调用 `i.addComponent`、`i.getComponent`、`i.removeComponent`、`n.setDimensionValue`、`n.setEnabled`、`n.setEndPoint`。 源码 eyes/src/engine/managers/WMTSManager.js:79；参数 (t, e)。

### `eyes/src/engine/pioneer/index.js`

Pioneer 公共出口：转发引擎类型、控制器和组件；index 与 public-api 分隔内部命名空间和外部入口。

- 证据：`import ./public-api.js`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/pioneer/public-api.js`

Pioneer 公共出口：转发引擎类型、控制器和组件；index 与 public-api 分隔内部命名空间和外部入口。

- 证据：`import ../../vendor/three/index.js`。
- 证据：`import ../core/ShaderChunkLogDepth.js`。
- 证据：`import ../core/BaseRef.js`。
- 证据：`import ../core/CanceledError.js`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。

### `eyes/src/engine/solar-system/public-api.js`

太阳系公共出口：转发实体配置工厂、场景工具、观察相机和应用使用的引擎类型。

- 证据：`import ../core/Cameras.js`。
- 证据：`import ../core/DateTime.js`。
- 证据：`import ../core/Entity-567.js`。
- 证据：`import ../core/Features.js`。

无类声明；这是配置、导出、模板入口、着色器或注册副作用模块。

注意：本文件无 class 声明；不能以文件名凭空补造类。顶层效果/配置项见 evidence。


## 补充人工语义审阅

- `Entity.getPositionRelativeToEntity`：参数为 output、localPosition、targetEntity、optionalTime。沿双方到最近共同祖先的父链分别累加并相减；此路径只平移，不自动旋转父姿态。指定时间则查询历史父级和控制器状态，断链写 NaN。
- `Entity.getVelocityRelativeToEntity`：沿源和目标到共同祖先的链加减速度，optionalTime 决定当前值或按时刻求值；不包含额外刚体旋转速度项。
- `Entity.getPositionAtTime`：启用时按顺序调用所有修改 position 且覆盖该时刻的控制器。若没有相关控制器才返回当前状态；有相关控制器但该时刻无覆盖则保留 NaN。
- `Entity.__destroy`：销毁组件/控制器集合并清理父子关系和相机缓存；Collection.remove 的生命周期入口应调用此方法，而不是只从 Three.js 移除网格。
- `OrbitalElements.project`：meanAnomaly=meanAnomalyAtEpoch+meanAngularMotion*(time-epoch)，椭圆分支将角度 wrap 到 [-π,π]，再调用 projectFromMeanAnomaly 输出位置/速度。
- `OrbitalElements.projectFromMeanAnomaly`：eccentricity<1 使用 sin/cos 椭圆参数，否则使用 sinh/cosh 双曲参数；先计算轨道平面位置/速度，设 z=0 后按 orientation 旋转到实体参考系。
- `OrbitalElements.getEccentricAnomalyFromMeanAnomaly`：分别解 E-e*sin(E)=M 或 e*sinh(H)-H=M。最多 20 次牛顿迭代，以更新量绝对值小于 0.00174532925 退出；未提供额外收敛失败标记。
- `OrbitalElements.setFromPositionAndVelocity`：用 r×v 得角动量，(v×h)/gm-r/|r| 得偏心率向量，推导半长轴、真近点角与姿态，再算历元平近点角和平均角运动；圆轨道/奇异输入应另做数值验证。
- `CameraComponent.__updateCameraVariablesForConnectedScene`：根据 viewport bounds 调整 composer 尺寸和 aspectRatio；以相机距父实体/地面的距离推导 near 与 mid，更新投影并递归刷新实体相机缓存；移除小于 1px、禁用或已删除遮挡体。
- `CameraComponent._updateProjectionMatrix`：按 fieldOfView 与宽高比手工构建投影矩阵和逆矩阵；这里采用自定义轴布局，不能直接套 Three.js 常规 -Z 相机假设。
- `CameraComponent.getRaycast`：强制准备目标实体，逐个可渲染组件更新世界矩阵并 intersectObjects；跳过重复三角面命中，把命中点转回目标实体局部姿态坐标。
- `CameraComponent.getRaycastColor`：在射线命中 UV 处逐个 shader texture uniform 画到临时 canvas 再采样像素；返回 textureName+color，并非最终光照后屏幕颜色。
- `CameraComponent.__destroy`：调用组件销毁，再让 Scene 清除对该相机的缓存依赖，若绑定 viewport 则解绑。
- `CMTSTile._getNearestDistance`：读取所有视口相机的局部位置与视场，对瓦片距离按 tan(FOV/2) 归一以便屏幕尺度细分判定。
- `CMTSTile._getFromData`：对高程/纹理数据网格做索引与插值采样；应遵循该文件像素边界和裙边布局，不能假定原始影像无边框。
- `CMTSComponent.getGroundPosition`：将输入 XYZ 转 LLA，在可见瓦片层级寻找高程，再由 spheroid.xyzFromLLA 转回地表位置；细分纹理状态会影响可用地形细节。
- `TrailComponent.__update`：推进轨迹采样与几何缓存，具体 timeStart/end、相对参考实体和每帧点数影响工作量；与 Dynamo 样本加载解耦。

## 数据模块的实际注册范围

- `eyes/src/engine/core/EntityEntry-699.js`：Entity.register 顶层键：moon。
- `eyes/src/engine/core/EntityEntry-700.js`：Entity.register 顶层键：adrastea, amalthea, callisto, europa, ganymede, io, metis, thebe。
- `eyes/src/engine/core/EntityEntry-702.js`：Entity.register 顶层键：phobos, deimos。
- `eyes/src/engine/core/EntityEntry-706.js`：Entity.register 顶层键：ariel, miranda, oberon, titania, umbriel。
- `eyes/src/engine/core/Unidentified694.js`：Entity.register 顶层键：j2000_ecliptic, l1, l2, l4, l5。
- `eyes/src/engine/core/Unidentified695.js`：Entity.register 顶层键：observable_universe, milky_way, sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune。
- `eyes/src/engine/core/Unidentified696.js`：Entity.register 顶层键："1_ceres", "101955_bennu", "11351_leucus", "12923_zephyr", "134340_pluto", "134340_pluto_barycenter", "136108_haumea", "136199_eris", "136472_makemake", "14827_hypnos", "15094_polymele", "1566_icarus", "16_psyche", "1620_geographos", "162173_ryugu", "1862_apollo", "1981_midas", "1991_vg", "1993_hd", "1994_cc_a", "1996_xb27", "1998_ky26", "1998_ml14", "1998_qe2", "1999_ao10", "1999_cg9", "1999_vx25", "2_pallas", "2000_ae205", "2000_lg6", "2000_sg344", "2001_bb16", "2001_fr85", "2001_gp2", "2001_qj142", "2001_sn263_a", "2003_sm84", "2003_uv11", "2003_yn107", "2005_er95", "2005_lc", "2005_qp87", "2005_yu55", "2006_bz147", "2006_jy26", "2006_qq56", "2006_rh120", "2006_ub17", "2007_tf15", "2007_un12", "2007_vu6", "2008_bt2", "2008_cx118", "2008_ea9", "2008_el", "2008_hu4", "2008_jl24", "2008_kt", "2008_tc3", "2008_ts10", "2008_ua202", "2009_bd", "2009_os5", "2009_rt1", "2009_yf", "2010_an61", "2010_dj", "2010_jw34", "2010_tg19", "2010_tn167", "2010_ub", "2063_bacchus", "21_lutetia", "2101_adonis", "2102_tantalus", "2135_aristaeus", "216_kleopatra", "21900_orus", "225088_gonggong", "225088_gonggong_i_xiangliu", "2340_hathor", "243_ida", "25143_itokawa", "253_mathilde", "2867_steins", "3_juno", "3122_florence", "3200_phaethon", "3362_khufu", "3548_eurybates", "367943_duende", "37655_illapa", "4_vesta", "4015_wilson-harrington", "4179_toutatis", "4183_cuno", "433_eros", "4450_pan", "4486_mithra", "4769_castalia", "486958_arrokoth", "5011_ptah", "52246_donaldjohanson", "5535_annefrank", "617_patroclus", "617_patroclus_barycenter", "6239_minos", "6489_golevka", "65803_didymos", "66391_moshup", "69230_hermes", "90377_sedna", "951_gaspra", "9969_braille", "99942_apophis", "152830_dinkinesh", charon, dactyl, dimorphos, dysnomia, hiiaka, hydra, kerberos, menoetius, namaka, nix, styx。
- `eyes/src/engine/core/Unidentified697.js`：Entity.register 顶层键："1i_oumuamua", "1p_halley", "103p_hartley_2", "9p_tempel_1", "81p_wild_2", "67p_churyumov_gerasimenko", "19p_borrelly", c_1995_o1, c_2010_x1, c_2012_s1, c_2013_a1, c_2019_y4, c_2020_f3, c_2025_n1。
- `eyes/src/engine/core/Unidentified701.js`：Entity.register 顶层键：aitne, ananke, aoede, arche, autonoe, callirrhoe, carme, carpo, chaldene, cyllene, dia, eirene, elara, erinome, ersa, euanthe, eukelade, eupheme, euporie, eurydome, harpalyke, hegemone, helike, hermippe, herse, himalia, iocaste, isonoe, jupiter_li, jupiter_lii, jupiter_liv, jupiter_lv, jupiter_lvi, jupiter_lix, jupiter_lxi, jupiter_lxiii, jupiter_lxiv, jupiter_lxvi, jupiter_lxvii, jupiter_lxviii, jupiter_lxix, jupiter_lxx, jupiter_lxxii, kale, kallichore, kalyke, kore, leda, lysithea, megaclite, mneme, orthosie, pandia, pasiphae, pasithee, philophrosyne, praxidike, s_2003_j_2, s_2003_j_4, s_2003_j_9, s_2003_j_10, s_2003_j_12, s_2003_j_16, s_2003_j_23, s_2003_j_24, s_2011_j_3, s_2011_j_4, s_2011_j_5, s_2016_j_3, s_2016_j_4, s_2017_j_10, s_2017_j_11, s_2018_j_2, s_2018_j_3, s_2018_j_4, s_2018_j_5, s_2021_j_1, s_2021_j_2, s_2021_j_3, s_2021_j_4, s_2021_j_5, s_2021_j_6, s_2022_j_1, s_2022_j_2, s_2022_j_3, s_2024_j_1, sinope, sponde, taygete, thelxinoe, themisto, thyone, valetudo。
- `eyes/src/engine/core/Unidentified703.js`：Entity.register 顶层键：despina, galatea, halimede, hippocamp, laomedeia, larissa, naiad, nereid, neso, proteus, psamathe, sao, s_2002_n_5, s_2021_n_1, thalassa, triton。
- `eyes/src/engine/core/Unidentified704.js`：Entity.register 顶层键：dione, enceladus, hyperion, iapetus, mimas, rhea, tethys, titan。
- `eyes/src/engine/core/Unidentified705.js`：Entity.register 顶层键：aegaeon, aegir, albiorix, alvaldi, angrboda, anthe, atlas, bebhionn, beli, bergelmir, bestla, calypso, daphnis, eggther, epimetheus, erriapus, farbauti, fenrir, fornjot, geirrod, gerd, greip, gridr, gunnlod, hati, helene, hyrrokkin, ijiraq, janus, jarnsaxa, kari, kiviuq, loge, methone, mundilfari, narvi, paaliaq, pallene, pan, pandora, phoebe, polydeuces, prometheus, s_2004_s_7, s_2004_s_12, s_2004_s_13, s_2004_s_17, s_2004_s_21, s_2004_s_24, s_2004_s_28, s_2004_s_31, s_2004_s_36, s_2004_s_37, s_2004_s_39, s_2006_s_1, s_2006_s_3, s_2007_s_2, s_2007_s_3, s_2009_s_1, s_2019_s_1, saturn_lviii, saturn_lx, saturn_lxiv, siarnaq, skathi, skoll, skrymir, surtur, suttungr, tarqeq, tarvos, telesto, thiazzi, thrymr, ymir, s_2004_s_40, s_2004_s_41, s_2004_s_42, s_2004_s_43, s_2004_s_44, s_2004_s_45, s_2004_s_46, s_2004_s_47, s_2004_s_48, s_2004_s_49, s_2004_s_50, s_2004_s_51, s_2004_s_52, s_2004_s_53, s_2004_s_54, s_2004_s_55, s_2004_s_56, s_2004_s_57, s_2004_s_58, s_2004_s_59, s_2004_s_60, s_2004_s_61, s_2005_s_4, s_2005_s_5, s_2005_s_6, s_2005_s_7, s_2006_s_10, s_2006_s_11, s_2006_s_12, s_2006_s_13, s_2006_s_14, s_2006_s_15, s_2006_s_16, s_2006_s_17, s_2006_s_18, s_2006_s_19, s_2006_s_20, s_2006_s_21, s_2006_s_22, s_2006_s_23, s_2006_s_24, s_2006_s_25, s_2006_s_26, s_2006_s_27, s_2006_s_28, s_2006_s_29, s_2006_s_9, s_2007_s_5, s_2007_s_6, s_2007_s_7, s_2007_s_8, s_2007_s_9, s_2007_s_10, s_2007_s_11, s_2019_s_10, s_2019_s_11, s_2019_s_12, s_2019_s_13, s_2019_s_14, s_2019_s_15, s_2019_s_16, s_2019_s_17, s_2019_s_18, s_2019_s_19, s_2019_s_2, s_2019_s_20, s_2019_s_21, s_2019_s_22, s_2019_s_23, s_2019_s_24, s_2019_s_25, s_2019_s_26, s_2019_s_27, s_2019_s_28, s_2019_s_29, s_2019_s_3, s_2019_s_30, s_2019_s_31, s_2019_s_32, s_2019_s_33, s_2019_s_34, s_2019_s_35, s_2019_s_36, s_2019_s_37, s_2019_s_38, s_2019_s_39, s_2019_s_4, s_2019_s_40, s_2019_s_41, s_2019_s_42, s_2019_s_43, s_2019_s_44, s_2019_s_5, s_2019_s_6, s_2019_s_7, s_2019_s_8, s_2019_s_9, s_2020_s_1, s_2020_s_10, s_2020_s_11, s_2020_s_12, s_2020_s_13, s_2020_s_14, s_2020_s_15, s_2020_s_16, s_2020_s_17, s_2020_s_18, s_2020_s_19, s_2020_s_2, s_2020_s_20, s_2020_s_21, s_2020_s_22, s_2020_s_23, s_2020_s_24, s_2020_s_25, s_2020_s_26, s_2020_s_27, s_2020_s_28, s_2020_s_29, s_2020_s_3, s_2020_s_30, s_2020_s_31, s_2020_s_32, s_2020_s_33, s_2020_s_34, s_2020_s_35, s_2020_s_36, s_2020_s_37, s_2020_s_38, s_2020_s_39, s_2020_s_4, s_2020_s_40, s_2020_s_41, s_2020_s_42, s_2020_s_43, s_2020_s_44, s_2020_s_45, s_2020_s_46, s_2020_s_47, s_2020_s_48, s_2020_s_49, s_2020_s_5, s_2020_s_6, s_2020_s_7, s_2020_s_8, s_2020_s_9, s_2023_s_1, s_2023_s_2, s_2023_s_3, s_2023_s_4, s_2023_s_5, s_2023_s_6, s_2023_s_7, s_2023_s_8, s_2023_s_9, s_2023_s_10, s_2023_s_11, s_2023_s_12, s_2023_s_13, s_2023_s_14, s_2023_s_15, s_2023_s_16, s_2023_s_17, s_2023_s_18, s_2023_s_19, s_2023_s_20, s_2023_s_21, s_2023_s_22, s_2023_s_23, s_2023_s_24, s_2023_s_25, s_2023_s_26, s_2023_s_27, s_2023_s_28, s_2023_s_29, s_2023_s_30, s_2023_s_31, s_2023_s_32, s_2023_s_33, s_2023_s_34, s_2023_s_35, s_2023_s_36, s_2023_s_37, s_2023_s_38, s_2023_s_39, s_2023_s_40, s_2023_s_41, s_2023_s_42, s_2023_s_43, s_2023_s_44, s_2023_s_45, s_2023_s_46, s_2023_s_47, s_2023_s_48, s_2023_s_49, s_2023_s_50, s_2023_s_51, s_2023_s_52, s_2023_s_53, s_2023_s_54, s_2023_s_55, s_2023_s_56, s_2023_s_57, s_2023_s_58, s_2023_s_59, s_2023_s_60, s_2023_s_61, s_2023_s_62, s_2023_s_63。
- `eyes/src/engine/core/Unidentified707.js`：Entity.register 顶层键：belinda, bianca, caliban, cordelia, cressida, cupid, desdemona, ferdinand, francisco, juliet, mab, margaret, ophelia, perdita, portia, prospero, puck, rosalind, setebos, stephano, sycorax, s_2023_u_1, s_2025_u_1, trinculo。
- `eyes/src/engine/core/Unidentified708.js`：Entity.register 顶层键：sc_3d_winds, sc_ace, sc_acrimsat, sc_acs3, sc_aim, sc_aqua, sc_ascends, sc_aura, sc_c_nofs, sc_calipso, sc_chandra, sc_clarreo, sc_cloudsat, sc_cluster_ii_fm5, sc_cluster_ii_fm6, sc_cluster_ii_fm7, sc_cluster_ii_fm8, sc_cygnss_1, sc_cygnss_2, sc_cygnss_3, sc_cygnss_4, sc_cygnss_5, sc_cygnss_6, sc_cygnss_7, sc_cygnss_8, sc_dscovr, sc_eo_1, sc_euclid, sc_explorer_1, sc_face, sc_fgrst, sc_gacm, sc_galex, sc_geo_cape, sc_geotail, sc_goes_12, sc_goes_13, sc_goes_14, sc_goes_15, sc_gpm, sc_grace_1, sc_grace_2, sc_grace_fo1, sc_grace_fo2, sc_grifex, sc_hubble_space_telescope, sc_hyspiri, sc_ibex, sc_icesat_2, sc_image, sc_imap, sc_integral, sc_ipex, sc_iss, sc_iss_cowvr_tempest, sc_iss_ecostress, sc_iss_emit, sc_iss_oco_3, sc_iss_rapidscat, sc_ixpe, sc_jason_1, sc_jason_2, sc_jason_3, sc_jwst, sc_landsat_1, sc_landsat_2, sc_landsat_3, sc_landsat_4, sc_landsat_5, sc_landsat_7, sc_landsat_8, sc_landsat_9, sc_list, sc_m_cubed, sc_mcubed_2, sc_mms_1, sc_mms_2, sc_mms_3, sc_mms_4, sc_neo_surveyor, sc_nisar, sc_noaa_14, sc_noaa_15, sc_noaa_16, sc_noaa_17, sc_noaa_18, sc_noaa_19, sc_noaa_20, sc_noaa_21, sc_nustar, sc_oco_2, sc_pace, sc_path, sc_polar, sc_prefire_1, sc_prefire_2, sc_quikscat, sc_race, sc_raincube, sc_rax_2, sc_rbsp_a, sc_rbsp_b, sc_roman_space_telescope, sc_sac_d, sc_sclp, sc_sdo, sc_sentinel_6, sc_sentinel_6b, sc_smap, sc_soho, sc_solar_1, sc_sorce, sc_spherex, sc_starling_1, sc_starling_2, sc_starling_3, sc_starling_4, sc_sunrise_faye, sc_sunrise_jet, sc_sunrise_ein, sc_sunrise_edward, sc_sunrise_spike, sc_sunrise_bebop, sc_suomi_npp, sc_swift, sc_swot, sc_tdrs_3, sc_tdrs_5, sc_tdrs_6, sc_tdrs_7, sc_tdrs_8, sc_tdrs_9, sc_tdrs_10, sc_tdrs_11, sc_tdrs_12, sc_tdrs_13, sc_tempo, sc_terra, sc_tess, sc_themis_a, sc_themis_d, sc_themis_e, sc_timed, sc_trmm, sc_tropics_01, sc_tropics_03, sc_tropics_05, sc_tropics_06, sc_tropics_07, sc_uars, sc_wind, sc_wise。
- `eyes/src/engine/core/Unidentified709.js`：Entity.register 顶层键：sc_artemis_1, sc_artemis_2, sc_capstone, sc_clementine, sc_danuri, sc_grail_a, sc_grail_b, sc_ladee, sc_lcross, sc_lcross_impact_site, sc_lunar_flashlight, sc_lunar_prospector, sc_lunar_reconnaissance_orbiter, sc_smart_1, sc_themis_b, sc_themis_c。
- `eyes/src/engine/core/Unidentified710.js`：Entity.register 顶层键：sc_escapade_blue, sc_escapade_gold, sc_mars_2020, sc_mars_2020_landing_site, sc_mars_science_laboratory, sc_mars_science_laboratory_landing_site, sc_mars_exploration_rover_1, sc_mars_exploration_rover_1_landing_site, sc_mars_exploration_rover_2, sc_mars_exploration_rover_2_landing_site, sc_insight, sc_insight_landing_site, sc_marco_a, sc_marco_b, sc_mars_odyssey, sc_mars_reconnaissance_orbiter, sc_maven, sc_mars_express, sc_phoenix, sc_phoenix_landing_site, sc_trace_gas_orbiter, sc_mars_orbiter_mission, sc_mars_global_surveyor, sc_mars_climate_orbiter, sc_mars_pathfinder, sc_mars_pathfinder_landing_site, sc_mars_polar_lander, sc_viking_1_orbiter, sc_viking_1_lander_landing_site, sc_viking_2_orbiter, sc_viking_2_lander_landing_site。
- `eyes/src/engine/core/Unidentified711.js`：Entity.register 顶层键：sc_messenger, sc_messenger_impact_site。
- `eyes/src/engine/core/Unidentified712.js`：Entity.register 顶层键：sc_juno, sc_cassini, sc_europa_clipper, sc_galileo, sc_galileo_probe, sc_huygens, sc_huygens_landing_site, sc_juice, sc_pioneer_10, sc_pioneer_11, sc_voyager_1, sc_voyager_2。
- `eyes/src/engine/core/Unidentified713.js`：Entity.register 顶层键：sc_dart, sc_dawn, sc_deep_impact, sc_deep_impact_impactor, sc_deep_impact_impactor_impact_site, sc_deep_space_1, sc_near_shoemaker, sc_near_shoemaker_landing_site, sc_lucy, sc_new_horizons, sc_rosetta, sc_rosetta_impact_site, sc_osiris_rex, sc_osiris_rex_src, sc_philae, sc_philae_landing_site, sc_psyche, sc_stardust, sc_stardust_src。
- `eyes/src/engine/core/Unidentified715.js`：Entity.register 顶层键：sc_biosentinel, sc_kepler_space_telescope, sc_mariner_2, sc_parker_solar_probe, sc_spitzer, sc_stereo_ahead, sc_stereo_behind, sc_ulysses, sc_wmap。
- `eyes/src/engine/core/Unidentified716.js`：Entity.register 顶层键：sc_magellan, sc_venus_express。
- `eyes/src/engine/core/Unidentified717.js`：Entity.register 顶层键：rose_bowl, school_bus, scientist。

`CheckboxMultistate.js` 既默认导出基础 Checkbox，也单独命名导出多态 CheckboxMultistate；不是空类，也不是类实现主体。
