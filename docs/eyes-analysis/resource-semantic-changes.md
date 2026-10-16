# 资源与模型源码语义整理

本轮直接修改可执行源码，不再用 AST 索引代替可读实现。五个文件共改名 266 个词法绑定，保留类名、导出、方法名、实例字段、静态字段和资源协议。命名是基于现有调用与数据流的解释，不声称恢复 NASA 未公开原始名称。

## 逐文件改动和命名依据

- `eyes/src/engine/managers/ResourceManager.js`：106 个绑定。`owner` 进入 `_entityItemsToResources` 并作为组件资源持有者；`url/type/priority/options` 与 load/acquire 调用顺序相同。`cache` 持有 `urlsToEntries/resourcesToUrls`，`entry` 持有 Promise、resource、count、unloadTimeout；`resourceHandlers` 是 texture/imageData/binary/text 的分派表。批量分支使用 `results/resultIndex/loadedResources/errorMessages/resourcesByName` 对应 allSettled、成功回收与按名称返回结果。将复用、计时器撤销、零引用释放、失败清理和资源 handler 中的短路/逗号操作展开。
- `eyes/src/engine/core/TextureLoader.js`：29 个绑定。`faceIndex/faceUrl/faceImages/faceRequests` 来自六面 CubeTexture；`sourceTexture/environmentTexture/renderTargetOptions` 来自 PMREM 输入转换。`extension/downloadType/download/texture` 直接对应后缀分派、下载返回和 THREE 构造结果；`configuredPath/transcoderPath` 对应配置和 processUrl 后的解码器地址。中文注释说明临时面纹理包装、纯色 clone、返回纹理的销毁责任和静态 KTX2 首次初始化能力。
- `eyes/src/engine/core/TextureLOD.js`：19 个绑定。`targetSize` 来自 forcedSize 或实体屏幕半径，`selectedIndex/sizeIndex/sizeCount/maxTextureSize` 来自候选尺寸选择；`previousSize/previousUrl` 只用于归还被替换的未完成请求，`texture/error` 来自 Promise 结果。展开禁用释放、uniform 更换、尺寸重置、选择与异步结果处置。保留旧纹理直到新纹理成功的交接次序。
- `eyes/src/engine/core/BaseRef.js`：`nextRef` 来自 `_setRef` 输入，只有通过 isEnabled 后才写入缓存。展开禁用过滤与回调条件；保留 get 更新、getRef 不更新，以及回调参数 old/new 的顺序。
- `eyes/src/engine/components/ModelComponent.js`：111 个绑定。构造参数 `componentName/entity` 沿 BaseComponent → EntityItem → CollectionItem 继承链核实：CollectionItem 首参数写 `_name`，第二参数写 `_collectionParent`。`modelContent/resourceType` 来自主文件 acquire；`gltf/scene/bounds/clip` 对应 GLTF parse 结果、scene、Box3、animations。材质分支的 `standardMaterial/pioneerMaterial/materialReplaced/needsTangents/slotIndex` 对应旧材质向新 shader 的迁移和 mesh 替换。适配器统一 `url/onLoad/onProgress/onError`，Draco `buffer` 来自 binary acquire，纹理 `mappedUrl/extension` 来自文件名映射和扩展名提示。展开解析前配置、环境图选择、清理辅助节点、贴图所有权转移和失败回调。

所有重命名通过 Babel scope.rename：先改为唯一临时名，再改为语义名，避免外层与内层同名绑定捕获。检查确认五文件没有剩余单/双字符压缩绑定。生成脚本仅为临时编辑工具，没有引入运行时依赖。

## 保持的不变量与验证

`node tools/semantic-resource.node-check.cjs` 通过。先在整理前建立并运行 BaseRef、ResourceManager、TextureLOD 的行为基线，整理后重复通过；另补充 TextureLoader 分派及 ModelComponent 贴图移交检查。

- BaseRef：相同身份不重复回调、禁用对象折叠 null、get/getRef 的刷新区别。
- ResourceManager：同 URL 的共享下载及资源身份、引用计数、最后引用 15000ms 延迟销毁、重新 acquire 撤销销毁、按 owner 批量归还、错误 release 拒绝。
- TextureLOD：屏幕尺寸与上限选择、下载期间保留旧纹理、成功交接归还旧纹理、禁用后归还新纹理。
- TextureLoader：纯色返回独立 clone 且不下载；位图 mipmap 选项、视频 flipY、无后缀 URL 的 KTX2 extension 提示和 binary 解码通道。
- ModelComponent：旧材质 map 迁移到 colorTexture uniform 后置 null，保留纹理对象身份、环境强度和 needsUpdate。

测试通过 VM 装载实际源文件，隔离浏览器/GPU 依赖；它不证明真实 WebGL 解码器、浏览器事件或网络取消竞态全部正确。五文件通过 Babel 语法解析。

## 已观察但未混入修复的疑点

- ModelComponent 圆柱环境图分支检查 `_environmentCylindricalUrl`，实际 loadTexture 却传 `_environmentCubemapUrl`。
- 静态 `_dracoLoader` 捕获第一次模型的 component、priority、loadState，后续模型仍复用该所有者。
- `updateMaterial` 遍历 mesh 后只修改局部 `previousMaterial`，没有给 mesh.material 赋值。
- TextureLOD 异步回调没有请求代号/URL 比对；切换 URL、uniform 或连续 LOD 请求后的迟到结果可能覆盖较新的目标。
- ResourceManager `_removeEntityItemReference` 只按 URL 查找，没有同时比较 type；同 owner、同 URL、多种类型的持有记录可能匹配不精确。
- acquireMultiple 对非 Error rejection 的聚合，以及共享失败时其他 owner 的记录清理，仍保留原分支行为。
- TextureLoader PMREM/临时 render target 的额外 GPU 资源释放责任尚未被浏览器运行证据确认。

以上均保留原有行为，交由独立缺陷修复任务验证。

## 第二轮：引擎与实体生命周期

本轮追加 6 个实际运行文件，共 475 个词法绑定：Engine 27、Scene 82、Entity 232、BaseComponent 50、BaseController 22、Downloader 62。零剩余单/双字符压缩绑定。为提供严格可复核的等价证据，本轮只更改绑定名称、格式和注释，保留表达式树及短路求值结构；没有借整理改变状态机或采样算法。

- `eyes/src/engine/core/Engine.js`：场景/视口检索参数命名为 sceneName/viewportName、sceneIndex/viewportIndex；多层 get 参数依据 Engine→Scene→Entity 的调用链命名。帧循环区分 sceneIndex、viewportIndex、removalIndex、callbackIndex、callbackEntry，避免同一字母在相邻循环代表完全不同角色。注释说明状态更新→视口计算→视觉资源→渲染→帧尾回调→输入重置的依赖次序，以及限帧时不推进上一帧时钟。
- `eyes/src/engine/core/Scene.js`：sceneName/engine 沿 CollectionItem 构造链确认；moveEntity 使用 entityOrName/targetScene/entity/controller/lightRef 表达集合所有权与依赖图迁移。加载等待区分 entityNames、entities、requests、results、remainingEntityNames。比较器使用 dependentController/precedingController 和 modifiedState，明确父级位置/速度与显式依赖的排序含义。
- `eyes/src/engine/core/Entity-62.js`：这是 public-api 实际导出的运行时 Entity。相对位置和速度参数为 output、localPosition/localVelocity、targetEntity、time；ancestor/commonAncestor/targetOffset/ancestorPosition/ancestorVelocity 来自双方祖先链与池对象的数据流。共同祖先查找区分 sourceAncestor/targetAncestor、sourceDepth/targetDepth 和各端 parent。覆盖区间区分 positionControllerCount/orientationControllerCount、firstParentingEntry/lastParentingEntry。相机投影区分 cachedCameraPosition/normalPosition/pixelPosition、normalRadius/pixelRadius 和 previousEntity/walkingToParent。添加池对象归还、重新挂接时位置保持、缓存清理与父子回调顺序注释。getDistanceTo 的 sourceGround/targetGround、sourceOrientation/targetOrientation、surfaceOffset 和 direction 对应实际球面/地面距离计算。
- `eyes/src/engine/components/BaseComponent.js`：componentName/entity 沿继承链确认；output/object/ancestor/localPosition/localOrientation 来自 Three.js 局部变换累加。enabled/inCoverage 对应装卸条件；forceLoaded/timeout 对应等待语义；camera/viewport/normalRadius/pixelRadius 对应投影；classIndex 只统计当前组件之前同构造器的对象。注释写明 0.5/0.25 像素装卸滞回区间、异步 reset 后到达结果的卸载，以及 unloaded 在非强制等待时也满足条件。
- `eyes/src/engine/controllers/BaseController.js`：controllerName/entity 来自 CollectionItem；stateName/entityName 对应 modified/dependent 状态集合；output/time 对应时间采样钩子。说明依赖图构造注册、销毁注销、只有集合实际变动才重排，以及位置/方向写入对覆盖区间的影响。
- `eyes/src/engine/core/Downloader.js`：url/actualUrl、replacementName/replacement/type、download/queuedDownload/queueIndex 来自占位符处理与活动/排队 Map。resolveDownload/rejectDownload 与 Promise executor resolve/reject 分开命名；onProgress/event/progress/totalBytes 对应进度接口；leftDownload/rightDownload 对应排序回调。image/video/onReady/extension/mimeType/bitmap 对应各响应分支。说明并发槽位、取消范围、优先级只提升、Blob 解码完成前仍占槽，以及上层 ResourceManager 才负责共享所有权。

### 第二轮验证

新增 `tools/semantic-lifecycle.node-check.cjs`，执行通过：

- `node tools/semantic-lifecycle.node-check.cjs`：真实源码 VM 加载，验证引擎帧执行顺序和时间推进、控制器注册/重复状态写入/注销、异步加载期间 reset 的资源清理、实体共同祖先、下载队列优先级与取消/后续启动、Scene 父子控制器依赖。
- 当时的中间检查 `--compare-before <快照目录>`：第二轮完成时，六文件与临时快照的词法规范化 AST 相等。后续 BaseController 又做了控制流展开，此严格比较模式不接受该结构变化，因此不能作为最终源码的可重放证明。快照未入库；最终证据以仓库内冻结基线、`semantic-dynamo` 的控制器检查及此处默认 CPU 检查为准。词法规范化不保留函数名称反射，不能证明 `.name` 或源码字符串完全相同。
- `node tools/semantic-resource.node-check.cjs`：第一轮资源检查继续通过。

### 第二轮保留的原有疑点

- Scene.moveEntity 的灯光移除后重新添加调用仍在源 Scene 上；目标 Scene 的灯光列表可能没有完成迁移。
- Entity.removeParentingTableEntry 使用 splice(entryIndex) 删除从该项到末尾，是否符合调用者约定尚未确认。
- Entity.__destroy 正向遍历 children，而 setParent(null) 会修改同一 children 数组，可能跳过部分子实体。
- Entity.getVelocityRelativeToEntity 的显式时间路径在找不到中间父级时，早退未归还 ancestorVelocity 池对象；本轮未改动。
- Downloader 图片/视频分支没有写入 download.request，cancel 对这类活动请求可能按队列处理并报错；视频 onload 与 oncanplaythrough 共用完成回调而无幂等保护。
- Downloader 使用 actualUrl 作为活动记录键，但每个 download 都创建独立记录；同 URL 的并发请求可能覆盖 Map 槽位，通常由上层 ResourceManager 避免，未独立保证。
- BaseComponent.resetResources 只换状态对象而没有请求代号；若旧请求未结束就启动新加载，旧请求回调观察的仍是当前状态，可能与新加载交错。

## 第三轮：组件几何、投影与纹理所有权

追加整理 30 个组件，共 1052 个原压缩绑定，另把已有 `float32Array/uint16Array/vector3` 中可明确的数据角色改为 positions/indices/colors/quadPositions/threeOrigin/boundsMin 等。CMTSComponent 与 WMTSComponent 由另一任务处理，不在本轮统计。所有实例字段、静态字段、导出、shader 字符串、资源地址与公式不变；每个文件均直接改写源码，去除重复 @eyes-analysis 注释，加入对应数学/所有权约束的中文说明。

| 文件（均位于 eyes/src/engine/components/） | 命名依据与核心约束 |
| --- | --- |
| AnnulusComponent.js | positionOffset/indexOffset、currentOuterPoint/nextOuterPoint、innerRatio、startAngle/endAngle 对应四顶点双三角环段。 |
| TorusComponent.js | centerRadius/tubeRadius 来自内外半径平均/半差；ringIndex/tubeIndex 及各自角度、正弦余弦和取模邻点。 |
| DiscGridComponent.js | circleIndex/radius/segments、spokeIndex/angle、positions/colors 对应圆线段和辐条端点。 |
| SphereGridComponent.js | longitudeDegrees/latitudeDegrees、nextLongitude/nextLatitude 对应经纬线端点，极点不重复生成纬线。 |
| SkyboxComponent.js | latitudeStep/longitudeStep、geodetic、vertexIndex/cellIndex、uvs 对应带重复经度接缝的球面。 |
| LightSourceComponent.js | componentName/entity/color/classIndex 来自场景光源注册键，序号变化先移除再注册。 |
| OrbitalParticlesComponent.js | position/velocity/time 来自轨道投影；particleData/colors/scales/maxApoapsis 对应初始化数据与包围半径。 |
| OrbiterLineOfSightComponent.js | targetPositionA/B 为两目标相对当前实体的端点，alpha 为距离透明度。 |
| GizmoComponent.js | jointPosition/jointOrientation 来自模型关节累积变换，之后应用模型缩放、旋转、平移。 |
| ShadowConeComponent.js | sourceRadius/occluderRadius、shadowAxis、near/farRadius、near/farOffset、apexDistance 对应本影/半影截面及朝向。 |
| ConstellationsComponent.js | constellation/stars/segmentIndices 来自 Reader；boundsMin/boundsMax/radius/labelPosition 对应等距星点标签包围盒。 |
| DistanceLineComponent.js | start/endCenter、start/endSurface、start/endPosition 区分两端中心/表面与动画结果；progress/easedProgress 对应四次缓动。 |
| OrbitLineComponent.js | gravitationalParameter、true/eccentric/meanAnomaly、sampleTime 对应瞬时轨道反求及采样；previousInvalid 控制不连续段透明度。 |
| DivComponent.js | activeViewport/localBounds/pixelPosition、hidden/wasHidden 对应 DOM 挂载与屏幕定位。 |
| StarfieldComponent.js | stars/starCount/colors/particleScale 对应星表与点云；alpha 通道仍承载绝对星等。 |
| SpheroidComponent.js | latitudeSin/Cos、eccentricitySquared、primeVerticalRadius、graphicCoordinates 对应行星地理/地心纬度公式；scaledOrigin/Direction/polarScale 对应椭球射线求交。 |
| IndicatorComponent.js | left/right/top/bottomParameter 对应四个视锥边界求交，boundaryParameter 为最小正值；source/entityFramePosition 与 indicator/sourcePixelPosition 区分投影阶段。 |
| SpriteComponent.js | kilometersPerPixel/worldSize、texture/image/aspectRatio/resolvedSize 对应像素换算与缺省尺寸补齐；静态几何和模板按 useCount 回收。 |
| ConnectedSpriteComponent.js | near/farPosition、reversed、near/farWidth、repeatAmount 对应远近交换、分端深度宽度与纹理重复。 |
| LabelComponent.js | renderSize/pixelOffset/pixelSize、renderUp/Right、normalPosition/bounds 对应逐相机布局；context/metrics/canvasWidth/Height 对应文字光栅化。 |
| DynamicEnvironmentMapComponent.js | faceIndex/faceCamera、depthScale/Offset、inverseProjection、uniforms 对应六面渲染与 cube-UV 合成。 |
| SpoutComponent.js | entityOrientation/faceOrientation、renderer、nearDistance/depthScale/Offset 对应全景六面渲染与球幕深度。 |
| CameraComponent.js | framePosition、horizontal/verticalScale、depthScale/Offset/inverseProjection 对应 Y 前向投影；rayOrigin/Direction、intersection/previousIntersection、textureCoordinates/channels/pixelOffset 对应拾取与纹理采样。 |
| FrustumComponent.js | referenceUp/Right、right/verticalAxis、near/farHalfWidth/Height、farCenter/spinRotation 对应截面基与几何；intersection/hitDistance/clearance 对应长度截断。 |
| CometTailComponent.js | originTimes/originPositions、originTime、accelerationAttribute 对应实例布局；第零粒子重建时统一平移时间基准。 |
| ParticleSprayComponent.js | parameter/color/sizeAttribute、parameters/colors/sizes、perpendicular 对应实例数组和喷流正交基。 |
| RingsComponent.js | textures/uniform、rowIndex/columnIndex/vertexIndex、normals 对应环平面与上下纹理；previous/nextSpheroid 对应监听解绑/绑定。 |
| SpheroidLODComponent.js | textureName/Info、lod/faceIndex/uniform、latitude/longitudeSpan/Count/Step 对应逐通道逐面 LOD；faceFrame/reverseWinding/crossAxis 对应立方面手性与三角绕序。 |
| AtmosphereComponent.js | cameraLocalPosition、latitude/longitudeStep/Index、vertexIndex/cellIndex 对应单位球与实体局部视点；previous/nextSpheroid 对应半径监听。 |
| TrailComponent.js | interval/dirtyRange、initialStep/lowerStep/upperStep/timeStep/curveAngle/attempts 对应自适应采样；capacity/fillLimit/vertexData/indices 对应环形缓冲扩容和 12 分量交错布局。 |

### 组件验证与等价证据

`tools/semantic-components.node-check.cjs` 内保存 30 文件修改前的 bindingHash，默认运行直接校验当前源码与基线的规范化 AST 哈希相等；不是仅检查改名数量。工具还断言每个词法绑定名称长度大于 2，且无 @eyes-analysis 模板残留。

真实源码 VM 行为检查覆盖：Annulus 顶点/索引长度与内外半径、Torus 管面拓扑与索引范围、Spheroid 赤道/极点坐标及高度反算、Frustum 远截面尺寸、Camera 空间/归一化半径互逆、LightSource 注册与注销、ParticleSpray 参数/颜色/尺寸数组布局、Trail 首尾操作后的环形缓冲与失效标记。所有检查通过。`tools/semantic-lifecycle.node-check.cjs` 在其他代理进一步整理 BaseController 后仍通过运行时检查。

### 组件既有疑点（未修复）

- Sprite 共享资源 useCount 降到零时销毁静态几何和材质，但字段未归零；再次加载可能复用已 dispose 对象。
- Label 每次 _updateText 替换 colorTexture，旧画布纹理的释放责任需结合 ThreeJsHelper 确认。
- Starfield 无 viewport 早退前未归还 renderSize；ShadowCone 轴为 NaN 时早退前未归还 shadowAxis。
- OrbitalParticles 等待 _loadFunction 完成后未再次检查 _spriteParticles 是否仍存在；Rings 单独更换纹理的回调同样缺少加载代号校验。
- Trail.resetPoints 注册属性名 position，而 _updatePoints 使用 positionCurr；_resize 会注册后者，保留原来初始阶段行为。
- Camera 的颜色拾取按纹理 format 决定 RGB/RGBA 跨距，但 Canvas ImageData 数据通常为 RGBA；本轮只保留读取公式，不扩大为拾取修复。
- DynamicEnvironmentMap 与 Spout 的 render target/renderer 状态清理、归还责任保留原实现，VM 验证不能代替真实 GPU 生命周期测试。

本轮最终还使用 `tools/lib/semantic-source.cjs` 的 expandSource 展开 30 文件中结果被丢弃的逗号表达式、短路语句和三元语句，以及 if 测试中的前置操作；每个文件在写入前再次比较 bindingHash，全部相等。返回值依赖的表达式与 for 循环头不擅自重排。完整基线断言在展开后继续通过，因此注释、命名与可展开控制流是同一轮可执行源码整理，而非仅重排索引文档。

## 第四轮：core 剩余工具、材质、目录与 CommonJS context

本轮实际负责 56 文件，共改名 1004 个原压缩绑定；另 9 个无压缩绑定的独立 shader 模块由主任务负责，不计入此处。所有文件先保存本轮前快照，再逐一比较 `git show HEAD:<path>` 与修改后的 bindingHash，56 文件全部相等。最终使用 expandSource 展开可证明等价的弃值控制流，再次逐文件比较哈希。没有改写 shader 字符串、uniform 名、资源地址、任务数值表或路径。

### 工具与运行时的命名证据

| 文件 | 实际语义与命名证据 |
| --- | --- |
| CollectionItem.js | itemType/nameOrClassIndex/classItems/namedItem 区分按类序号与名称查询；beforeItem/insertIndex/sourceIndex 取自集合插入和迁移；全局 itemIndex 与构造器内 classIndex 分开更新。 |
| ComponentRef.js / ControllerRef.js / EntityRef.js | entity/component/controller、cachedEntity/resolvedEntity 对应场景查找与身份缓存；空名称、禁用及销毁分支保持原规则。 |
| Config.js | key/value/callbacks/callbackIndex 对应值映射与监听数组，严格比较后先存值再通知。 |
| DependencyGraph.js | node/dependency、nodeIterator/nextNode、temporary/permanent 标记对应 DFS 拓扑排序和回路诊断。 |
| EntityUtils.js | entity/lengthScale/opacity/particleCount/speedScale/spreadScale/origin/direction 直接来自喷流设置；startTime/endTime/model/controller 来自子对象覆盖显隐。 |
| JsonHelper.js | object/array/propertyValue/predicate/key/index/length 对应 JSON 结构校验，未将 typeof number 误改为有限数判定。 |
| FPS.js | totalSeconds/sampleIndex/deltaSeconds 对应循环帧时间采样。 |
| waitUntil.js | predicate/intervalSeconds/timeoutSeconds/elapsedSeconds/timer/resolve/reject 对应定时轮询，清理顺序和超时分支保留。 |
| Viewport.js | viewportName/engine/rootDiv/input、pixelPosition/normalPosition、renderer/bottomOffset 对应 DOM 与 WebGL 原点转换。 |
| Capabilities-58.js | extensionName/supported/context 来自 getExtension 的布尔缓存；与同名 WMTS 类明确区分。 |
| Capabilities-584.js | layerNode/titleNode/identifierNode/styleNodes/boundsNode/dimensionNodes/matrixSetNode 等对应 XML 标签；scale/previousScale/tileSpan/matrixSpan/unitsPerKilometer/crsDefinition 对应 WMTS 尺度及 CRS 换算。 |
| Devices.js | platform 来自 navigator userAgentData/platform，保留 MacIntel 多触点识别 iPad 的条件。 |
| ObjectUtils.js | object 是 Object.entries/keys/values 的直接输入；薄封装不增加过滤规则。 |
| RandomString.js | length/byte 对应 crypto 随机字节的十六进制编码与截断。 |
| assertIsShader.js | shader/side/blending 分别对应描述对象及属性枚举校验。 |
| Types-754.js | typeRegistry 为字符串到框架构造器的注册 Map，公开导出仍为 Types。 |
| Types-1075.js | 无压缩绑定；注释说明应用导入时覆写框架注册表的副作用，保留所有注册键。 |
| SpriteParticles.js | offsets/colors/scales/name/data/dimensions/attribute 对应实例缓冲的 3/4/1 分量布局及 resize。 |
| Tile.js | TileState/descendants/leaves/loadedTiles/requests、childColumn/Row 对应切分与合并队列；先加载替代再交接显隐。 |
| SceneHelpers.js | requestedNames/retainedNames、onCreated/onRemoved、dependencies/parents/controller 对应实体创建、删除及依赖闭包；地理转换区分 entityRelative。 |
| MaterialUtils.js | sourceCount/lightCount、lightPosition/lightRadius、materials/uniforms、shadowRefs/shadowCount、atmospherePosition/Orientation 等对应固定容量光照和遮影协议。 |
| MaterialUtilsPhong.js / MaterialUtilsStandard.js | 返回实例命名为 material；模板缓存与 clone 生命周期说明，GLSL 全文不变。 |
| MomentLocalesPrimary.cjs / MomentLocalesSecondary.cjs | localeModuleIds/loadLocale/request/moduleId/resolveLocale 来自 context 的映射、静态 require 分派及错误路径；两套独立 id 表保留。 |
| LineMesh.js | previous/nextPosition、segmentDelta/dashOffset、localPointIndex/pointIndex、vertexData、geometryCount/VertexCount 对应端点展开与 15 分量布局。 |
| ThreeJsHelper.js | component/material/geometry/attributes/interleaved/stride/offset、context/buffer/target/glType/bytesPerElement、objects/cameraPosition/rotatedOffset/threeOrientation、destroyTextures/previousTexture 等逐方法对应分配、变换、克隆和释放责任。 |
| CanceledError.js / CancelToken.js | 无压缩绑定；注释明确取消异常类型标记与单向令牌仅保存状态、不自动中止网络的区别。 |
| version-8.js / Version-84.js | 无压缩绑定；分别说明小写 version 与 Pioneer 大写 Version 是独立模块常量，未混作 package 版本。 |

### 注册目录：保留文件名，解释实际职责

目录只有导入注册副作用时，不为了制造 diff 而改变声明数据。含回调的目录已把所有词法绑定改为模型、轨迹、控制器、区间或任务关键帧角色。以下均为源码内容支持的职责说明，不声称得到了原仓库文件名：

| 文件 | 已确认内容与关键命名 |
| --- | --- |
| Unidentified511.js | UI 查询参数分组/默认值/反向复选框描述表，无压缩绑定；仅增加具体数据契约说明。 |
| Unidentified694.js | J2000 黄道与 L1/L2/L4/L5 参考实体注册，无压缩绑定。 |
| Unidentified695.js | 主天体目录；entity/options/atmosphere/rings/surface、poleRightAscension/Declination、galacticCenter、jupiterRotationTable/rotations/angularRate/hintIndex/textureLongitude 对应实际创建和木星经度插值。 |
| Unidentified696.js | 小行星/矮行星目录；entity/label/surface/material/spinController 对应少量外观和参考时刻回调。 |
| Unidentified697.js | 彗星及星际天体目录；entity 参数用于 67P 多股喷流创建。 |
| Unidentified701.js | 木星小卫星目录，无压缩绑定；原天体参数与资源地址未修改。 |
| Unidentified703.js | 海王星卫星目录，无压缩绑定。 |
| Unidentified704.js | 土星主要卫星目录；Enceladus 喷流 entity 和 Titan atmosphere。 |
| Unidentified705.js | 土星小卫星/临时编号目录，无压缩绑定。 |
| Unidentified707.js | 天王星小卫星目录，无压缩绑定。 |
| Unidentified708.js | 地球轨道任务目录；microwave/firstLaser/secondLaser、partnerEntity/linkEnabled/textureOffset、spinController/cowvrSpinController/model 对应 GRACE/ISS/JWST 回调。 |
| Unidentified709.js | 月球任务目录；entity/model/label 对应 Clementine 模型及 THEMIS/ARTEMIS 标签切换。 |
| Unidentified710.js | 火星任务目录；translation/groundClamp/rotation/orbitalController、model/trail/label、previousParent/nextParent/parentName/epoch 对应巡航、着陆和轨迹参考系切换。 |
| Unidentified711.js | MESSENGER 与撞击点目录，无压缩绑定。 |
| Unidentified712.js | 外行星任务目录；junoCoverIntervals/junoBurnIntervals/junoPointingKeyframes/junoSpinKeyframes、cassiniBurnIntervals、galileoSpinKeyframes、engineCover/openingFraction/burnActive 精确对应各时间表与控制器。 |
| Unidentified713.js | 小天体探测任务目录；model/trail/keyframeController/translationController、stardustModelParts/createCollectionKeyframes(angle,timeOffset,duration)/modelOffset 对应采样机构动画和返回舱定位。 |
| Unidentified715.js | 日心/深空任务目录，无压缩绑定。 |
| Unidentified716.js | Magellan/Venus Express 目录，无压缩绑定。 |
| Unidentified717.js | Rose Bowl/校车/科学家比例参照物目录，无压缩绑定。 |
| Unidentified738.js | 样式 739–751 的顺序聚合入口，无压缩绑定，未重排导入。 |
| Unidentified752.js | Earth/Mars/Moon WMTS 与 Titan/Venus 贴图目录；地球 manifest 和 NOAA 回退约定保持原样。 |
| Unidentified753.js | Jupiter/Saturn 附加图层 id 表；DESCRIPTION 原占位文本保持原样。 |

强证据的后续可读别名建议：Capabilities-584 可描述为 WmtsCapabilities；Unidentified695 可描述为 MajorBodiesCatalog，708 为 EarthMissionCatalog，710 为 MarsMissionCatalog，712 为 OuterPlanetMissionCatalog，713 为 SmallBodyMissionCatalog。它们只是职责标签，本轮没有更名文件或改变 import 图。

### core 检查与保留疑点

新增 `tools/semantic-core.node-check.cjs`：保存 56 文件 HEAD 对照哈希，默认逐一验证规范化 AST 相等、无压缩短绑定、无模板注释。CPU 检查直接 VM 装载实际源码，覆盖 Config 去重通知/解绑、Collection 跨集合移动及重编号/销毁、DependencyGraph 顺序和环错误、ComponentRef 禁用过滤、Tile 加载/显隐/销毁、ThreeJsHelper 旧纹理关闭/释放与 uniform 克隆/define 切换、waitUntil 成功/超时清理、Input 帧尾清零、JSON/schema 校验及两套真实 CommonJS locale context 的 keys/resolve/MODULE_NOT_FOUND。检查通过。

以下疑点保留，未以语义整理名义修复：

- Collection.add 的大小写约束使用字符串 match("/A-Z/")，并非通常的正则表达式。
- FPS 未填满采样数组时累加 undefined 可能得到 NaN，改样本数未重置 _index。
- Capabilities-58.__setContext 没有清空旧扩展支持缓存。
- Tile 切分/合并捕获 load 错误后仍将状态置 Loaded 并显示，destroy 与异步切换可交错。
- Input 构造器注册全局监听器而没有配对卸载，touchcancel 钩子为空。
- SceneHelpers._getDependentEntitiesRecursed 的输入是实体注册选项；缺失依赖静默跳过，非本轮改动。
- ThreeJsHelper.createGLBufferAttribute 分配 bufferData 但不在该方法上传 data；调用方需通过 updateGLBufferAttribute 完成上传。destroyObject 递归调用未转发 component，GLBufferAttribute 的上下文释放责任需另查。
- ThreeJsHelper.setUniformTexture 直接销毁旧贴图；若调用者传的是计数共享贴图，必须与 ResourceManager 所有权协调，工具本身不做计数。
- MaterialUtils 的阴影数组容量与 refs 数量没有统一裁剪，部分无效引用位置可能复用旧槽值。
- Unidentified710 的若干标签 innerHTML.replace 返回值未赋回，保留原行为。
- Moment context 的模块编号只在其对应静态 require 分派内有意义，不能跨主/次运行时混用。
