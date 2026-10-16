# Dynamo、二进制游标、轨道传播与时间倍率的语义整理

本轮直接修改执行代码的局部变量、参数和控制流。名称来自字段读写、调用约定、二进制读取顺序及公式；它们是可审查的语义名称，不声称等于 NASA 未发布源码中的原名。公共方法、导出、实例字段、文件字段顺序、算术运算顺序与数值阈值保持不变。

## 修改文件与命名证据

| 文件 | 改名绑定数 | 主要证据与新名称 |
| --- | ---: | --- |
| `eyes/src/engine/controllers/DynamoController.js` | 145 | `Reader` 调用者变为 `reader`；两端样本为 `samples`；Hermite 式中的 `sampleDuration`、`fraction`、`startPositionWeight`、`endVelocityDerivativeWeight` 分别由时间差、归一化时间、位置基函数和速度导数项确定；轨道和姿态传播临时量按端点、输出用途命名；分层索引使用 `entryCount`、`entryIndex`、`childName`、`lowerIndex`、`middleIndex`、`upperIndex`；异步下载区分 `definitionUrl`、`pointSetUrl`、`downloadResult`、`error`。 |
| `eyes/src/engine/core/Reader.js` | 18 | 构造参数是 `ArrayBuffer`，命名 `buffer`；数值读取结果统一 `value`；文本循环区分 `lineBytes`、`stringBytes`、`byte`、`character`、`byteLength`。 |
| `eyes/src/engine/core/OrbitalElements.js` | 57 | 输出向量为 `positionOut`、`velocityOut`；近点角区分 `meanAnomaly`、`eccentricAnomaly`、`trueAnomaly`；牛顿循环的 `iteration` 与内层 `newtonCorrection` 是不同词法绑定；`r×v` 为 `angularMomentum`，`(v×h)/μ−r̂` 为 `eccentricityVector`，`h²/μ` 为 `semiLatusRectum`；姿态构造区分升交点方向、轨道法线及近心点旋转。 |
| `eyes/src/engine/controllers/TimeController.js` | 17 | 输入是模拟秒/实秒的 `timeRate`；表索引是 `currentRateIndex`；布尔状态是 `isPlaying`；显示换算量为 `yearsPerSecond` 至 `minutesPerSecond`，后缀为 `unitSuffix`。 |

总计 237 个词法绑定改名。全部四个文件不再保留一至两字符的局部或参数绑定。公开的 `oe` 等字段和属性键保持原样。改名使用 Babel 的作用域绑定重命名，并先经临时名称避免名称互相覆盖；外层循环和内层同名计算量没有合并。

## 方法语义与控制流

`Reader` 的全部数值方法按对应字宽移动游标，多字节读取固定小端；64 位整数先转 `Number`，不安全时返回 `NaN`，仍消费八字节。`readLine` 去掉 CR、以 LF 终止后 UTF-8 解码。`readString` 无长度时以 NUL 终止，显式长度按字节计数。`isAtEnd` 比较字节游标与视图长度。

`Point` 定义时间及计算、应用、失效化协议。`PosPoint.load` 读取七个 Float64，`calculate` 做三次 Hermite 并计算同一多项式的时间导数。`LinPoint` 只读取位置，时间递增时位置截断插值而速度取整段割线，否则使用末端位置、零速度。`OriPoint` 读取姿态和角速度，将两个端点分别传播到查询时刻再球面混合；`_project` 区分增量与直接写入。`QuatPoint` 只读取、混合姿态，应用时写零角速度。`OrbPoint` 读取九个 Float64，把两个轨道各自传播后混合，并按 `body` 与两个引力参数选择质心缩放；增量模式仅累加位置，速度仍覆盖。各类型 `apply`、`setNaN` 保持实体字段写入协议，`readHeader` 只有 orb 读取两个引力参数。

`PointSet.load` 区分样本与索引、版本 1 的显式起止时间与版本 2 的连续边界哨兵；文件名补零和父子路径拼接不变。`loadFromUrl` 保留 finally 删除下载 URL、成功读取内容、非取消错误标记 FAILED 的次序。`unloadOldPointSet` 每次最多清理一个超过 15 秒未访问的已载入子树，`unload` 清空子树与样本。`getPointSet`、`getPoints` 优先命中缓存和相邻段，再按起始时间二分；输出数组归调用者持有。简单 getters 与状态枚举不变。

`DynamoController` 构造器绑定实体下载器、复用计算样本并建立空覆盖。header/type/baseUrl/incremental getters/setters 保留公开协议。`setBaseUrl` 取消旧请求、清除旧类型和修改状态、规范尾斜线并重载。`setTimeOffset` 只平移公布覆盖；`setCoverage` 先交文件覆盖，再加时间偏移。轨道元素/偏心率/半长轴/姿态查询先刷新可用端点，再按原规则使用缓存端点。三个 `__update*AtTime` 保留按覆盖与计算缓存读取输出、缺样本写 NaN 的行为。`__update` 保留缺块时使用上次端点继续传播、缺根时所有实体状态 NaN 的行为。`_loadDef` 保留版本/类型验证、类型头和根块加载、修改状态声明及覆盖发布。`_getPointsAtTime` 在文件时间域逐层查询，缺块启动下载，失败块重载根；`__destroy` 取消请求后调用父类。

`OrbitalElements` 构造器保留空初值、轨道元素初值与状态向量初值三个入口。`copy` 复制标量并复制姿态内容。`project` 用 M=M0+nΔt 传播，只归一化椭圆周期角；`projectFromMeanAnomaly` 区分椭圆和双曲参数，在轨道平面求位置/速度后统一旋转。六个近点角转换方法保留原公式、角度 wrap 与牛顿迭代阈值。倾角、升交点经度、近心点幅角 getters 从姿态轴求角，周期与拱点 getters 保留原式。`setOrientationFromElements` 建坐标架后转近心点幅角；`setFromPositionAndVelocity` 从角动量、偏心率向量构造轨道元素。池对象借还次序不变。

`TimeController` 构造器保留倍率表、时间/路由管理器和初始状态；`init` 保留 tooltip 和事件注册。倍率 get/set、增减、播放暂停、默认/真实倍率以及强制暂停回调的外部调用次序不变。`onRateChange` 将旧短路表达式展开为显式状态变化和允许表分支。`getRateUnit` 展开单位选择，使用固定 365 天年、30 天月，只选整除单位；`getRateDisplay` 保留暂停文本及 `(s)/sec` 格式。

表达式结果未被使用时，逗号、短路和三元语句展开为顺序语句与 `if/else`；复合轨道查询的副作用条件展开为嵌套守卫；`throw (标记失败, error)` 展开为先标记再抛出，`return void output.copy(...)` 展开为写入后返回。涉及返回值的三元表达式和数值公式没有随意改写。

## 验证证据

- `node tools/semantic-dynamo.node-check.cjs`：通过。独立 Node VM 直接执行实际模块体，仅隔离浏览器依赖。
- 同一套运行断言在修改前快照与最终模块上均通过，覆盖二进制/文本、Hermite 位置和导数、区间外传播、v1/v2 索引、近点角方程及时间倍率单位。
- 真实 fixtures：Earth orb 429 点、Mercury orb 37 点、Jupiter orb 35 点、Earth ori 3 点；全部恰好读至文件尾，时间严格递增，相邻查询输出正确。Earth μ 精确匹配 `398600.4355070226` 和 `132712440041.27939`，文件名位数为 4。
- 椭圆 e=0/0.3/0.9、双曲 e=1.4/2、正负 M 各组方程回代残差小于 1e-5。
- 改名单独阶段：四文件按词法绑定统一归一化后 AST 全等，确认 145/18/57/17 个改名没有改变引用归属。控制流整理另由运行回归验证，未把此证明夸大为最终全行为形式证明。
- 反向敏感性：只在忽略目录中的副本把 `readUInt16` 改为大端，同一测试立刻失败 `258 !== 513`；生产实现未做该变异。

## 保留的未知与限制

本轮没有修改格式解释、单位约定或数值算法。没有猜测缺失原始标识符，也没有宣称恢复 NASA 未公开工程。

`Reader.readString(0)` 的原行为仍会继续读取并最终可能越界。单点叶节点、非递增时间、过期 hint、超出区间查询等边界仍依赖原输入约束。牛顿法保留 20 次、约 0.1 度更新量阈值，无失败状态；e=1、圆轨道状态向量反解、退化角动量未新增保护。`getArgumentOfPeriapsis` 保留无符号向量夹角，不修正可能缺失的象限。状态向量构造入口对 orientation 的初始化假设原样保留。

异步取消没有新世代令牌，取消后的块状态、旧回调与新的 baseUrl 并发不在本轮修复范围。轨道公开 getters 的时间/缓存行为以及增量姿态依赖输出初态也原样保留。倍率不在表中时 indexOf=-1、秒显示取余等行为有明确记录，不在语义整理中悄悄纠正。运行检查不能替代真实浏览器场景和全生命周期覆盖；整仓构建与发布由主任务统一验证。

## 第二轮：其余 29 个控制器

以下文件均在 `eyes/src/engine/controllers/`。本轮处理其余全部控制器；`BaseController` 的压缩绑定此前已整理，本轮补充控制流及依赖图契约。其他 28 文件共 635 个压缩绑定改为具体名称，所有 29 文件的局部和参数绑定均长于两个字符；公开字段、比较器、方法与导出不变。

| 文件 | 本轮压缩绑定数 | 语义证据与方法契约 |
| --- | ---: | --- |
| AlignController.js | 42 | primary/secondary 轴与 targetAxis 分开；关节祖先旋转、参考系姿态、主轴对齐及次轴角分别命名，EntityRef 回调区分 previousTarget/nextTarget。 |
| BaseController.js | 0 | 修改/依赖状态集合与依赖图重排展开显式分支；覆盖更新仍只在相同状态变化处触发。 |
| CoverageController.js | 8 | 场景 time、同类 controllerIndex、isCovered 与墙钟更新节流分开；保留先退出、后进入的回调顺序。 |
| FixedController.js | 10 | position/orientation 参数及各类输出按类型命名；固定位置对应零速度，空值移除修改声明。 |
| FixedToParentController.js | 5 | parentRotationDelta、position、orientation 明确上一父姿态差及换父参考系转换。 |
| FreeFlyController.js | 16 | scene/entityCount/scanOffset、活动 viewport/camera、局部 inputMovement 与 movementInReference 区分；每帧最多扫描 20 项。 |
| GroundClampController.js | 27 | positionInGround、groundPosition、groundNormal、groundOrientation、upInGround 与 normalOffset 对应地面局部坐标及法线约束；up 参数明确为 upVector。 |
| KeyframeController.js | 115 | 起止/前后关键帧、参考实体及参考时刻、Hermite 位置与切线权重、导数权重明确区分；首帧与邻域的同名局部不混合。 |
| KeyframePointingController.js | 39 | 两端方向、目标名称、负向标志、参考实体、初始姿态和 pointingRotation 分开；保留 velocity/rel 语法与旧依赖迁移。 |
| KeyframeSpinController.js | 30 | integratedAngle、previousKeyframe、fraction、spinAngle 与 axisInReference 对应梯形预积分及查询时姿态组合。 |
| LookController.js | 17 | yaw/pitch 变化、yawAxis、currentUp、forwardDirection、upAlignmentAngle、pitchAxis 对应校正和旋转顺序。 |
| ModelAnimateController.js | 14 | animationIndex/animationCount、animation、jointObject、firstTrack、fraction、clipTime 区分；保留模型根变化时缓存重建。 |
| OrbitalElementsController.js | 30 | insertionIndex、两端轨道帧与两端传播位置/速度分开；输出是传播后 slerp。 |
| OrbitController.js | 24 | yaw/pitch 输入、orbitFrame、positionInOrbitFrame、地面半径/高度、altitudeSensitivity 和 latitudeLongitudeAltitude 对应球面轨道及近地减速。 |
| OrbitKeyframeController.js | 69 | 位置/focus/up 三轨道各自索引、完成标记与端点；起末父参考下四个离地高度、两种距离混合比例和缓动比例分开。 |
| PickController.js | 11 | rayDirection、intersectionDistances、equatorialPolarRatio、scaledPickedCenter 分别对应椭球转球求交及命中点变换。 |
| PositionSumController.js | 18 | entityName、radialMultiplier/radialOffset、entry、sourceEntity、relativePosition、positionSum 对应径向权重叠加。 |
| RollController.js | 10 | 输入 rollChange、rotationOffset、sensitivityScale 与 rollRotation 区分；保留局部 Y 轴右乘。 |
| RotateByEntityOrientationController.js | 20 | referenceEntity/referenceOrientation 与 position/velocity/orientation/angularVelocity 分开；时间查询选择当时父实体。 |
| RotateController.js | 14 | 固定 rotation 与四类状态输出分开；关节模式仍更新模型对象而非实体姿态。 |
| ScaleController.js | 7 | scaledPosition 与 positionOut/velocityOut 明确原地数值缩放；原修改状态声明不变。 |
| SelectController.js | 15 | selectionPoint/selectionDirection、candidateEntity、label、labelBounds、labelDistance 与 selectedEntity 对应先标签后射线的选择流程。 |
| SetParentController.js | 4 | entityName 与解析后的 parentEntity 区分，依赖名称与实际换父分别处理。 |
| SpinController.js | 22 | elapsedTime、realDeltaTime、spinRotation、entityOrientationAtTime、threeJsRotation 与 angularVelocity 明确时间源、坐标轴及实体/关节路径。 |
| TapController.js | 3 | input 来自引擎，保留选择或拖移触发原条件。 |
| TransitionController.js | 24 | initial/finalParent、setParentController、finalPosition/finalOrientation 和 fraction 对应半程换父及完成 Promise；插值函数六个参数分别表达端点与输出。 |
| TranslateController.js | 8 | translationInReference、orientationAtTime、translatedPosition 对应方向相对平移和查询时姿态。 |
| ZoomController.js | 15 | parentEntity、zoomFactor、positionInParentFrame、groundRadius、altitude 区分乘法缩放和离地距离限制。 |
| ZoomFitController.js | 18 | halfFieldOfViewTangent、fitSlope、viewDirection、axialDistance、entityRadius、entityFitDistance、requiredDistance 对应 tightFit/包围球两路径。 |

对上述每个最终文件执行 `bindingHash` 与修改前 `git HEAD` 对比均相等。父任务提供的 `tools/lib/semantic-source.cjs` 统一归一化词法绑定，以及结果被丢弃的逗号、短路、三元语句和顺序条件；因此此轮证明包含最终控制流整理，不只单独改名阶段。比较仍保留公共属性、自由全局、常量和执行顺序。`tools/semantic-dynamo.node-check.cjs` 保存了 29 个修改前基线 hash，并逐文件检查最终 hash、无模板注释、无压缩短绑定。

新增可读性断言先运行失败，准确指出 `GroundClampController.js` 尚有 `up` 参数；最终将其和关键帧 up 参数明确命名为 `upVector` 后通过。另直接运行真实 `KeyframeController` 的 Hermite 基函数和导数，验证零切线、u=0.25 时位置系数 0.15625、导数系数 1.125；运行真实 `KeyframeSpinController`，验证两段梯形角速率积分得 0、2、6 弧度。全部与前述 Dynamo/真实 fixture 检查同一命令通过。

本轮没有新增尚未解释的压缩绑定。仍未修复既有输入边界：空关键帧、同刻关键帧或未解析引用可能沿原路径返回 NaN 或抛错；关键帧自旋预积分发生在排序之前；OrbitKeyframe 的球面/线性混合、离地高度下限、对象池释放次序原样保留。Pick 的椭球组件来源、Select 的同步/延迟选择、ModelAnimate 的删除时循环上界、Spin 的零角速率参考角除法均未在重命名中纠正；它们需要独立行为变更与针对性回归。未把数学上“更标准”的公式替换进原代码。

## 第三轮：CMTS/WMTS 地形瓦片

只修改 `eyes/src/engine/components/CMTSComponent.js` 与 `WMTSComponent.js`，包括文件内部 `CMTSTile`、`WMTSTile`。前者 355、后者 103 个压缩绑定全部改名，共 458 个；另复核并细化端点索引、网格行列、配置条目、维度名/默认值及生成器的 `vector3`、`float32Array` 等角色。没有修改其他组件或 core。

| 文件/方法群 | 命名依据与不变量 |
| --- | --- |
| CMTSComponent 配置、材质、阴影与生命周期 | `channel/baseUrl` 区分端点键与运行时 URL；`entityName/hasShadows` 区分引用名称和材质宏布尔量；`viewportIndex/viewportCount`、`cameraPosition` 与 `tileIndex/tileCount` 区分视口和瓦片遍历；配置下载区分 `endpoint`、`downloadResult`、`configuration` 与 Promise。 |
| CMTSComponent.getGroundPosition | `positionOut/normalOut/queryPosition` 表达输出所有权；`spheroid/lla/unitDirection/faceUV` 表达方向变换链，`childTilesPerSide/childColumn/childRow/visibleTile` 表达六面树索引；失败回退仍只用 heightOffset。 |
| CMTSTile 构造与 LOD | `parentTile/tileCoord`、四角位置、`configuration/childRow/childColumn` 与 `endpointEntry/channel/textureLevel` 区分覆盖判断和纹理祖先；`ancestorScale` 决定 UV offset/scale；checkSplit/checkJoin 保留四倍距离滞回。 |
| CMTSTile.getHeight/_getFromData | mesh 行列是 `localU/localV/sampleColumn/sampleRow`，三分量数组由 `lowerLeftOffset/upperLeftOffset/lowerRightOffset/upperRightOffset` 先行后列混合；结果加 tile center，再反解椭球高度。 |
| CMTSTile._createTempObject | `ancestorTile/ancestorUVOffset/ancestorUVScale` 表达沿父链累计子象限；`ancestorU/ancestorV/ancestorColumn/ancestorRow` 对应祖先 mesh 采样；`positions/normals/tangents/bitangents/uvArrays/indices` 对应上传属性，额外外圈仍做裙边下沉。 |
| CMTSTile._createObject/_loadTexture/_setTexture/_destroyObject | `requests/resources/channel/resource/priority/resourceType` 区分批量和单项获取；销毁后晚到资源先 release；`resolveBatch/batchTimer/framesPerSecond/verticesPerBatch/batchEndIndex` 表达定时分批顶点构建。纹理与 ImageData 分开释放，component 始终作为资源所有者。 |
| CMTSTile._updateVertex | `column/row/tileU/tileV/clampedTileU/clampedTileV` 区分裙边和有效内区；`surfaceNormal`、列/行正负邻点和对角邻点表达跨面差分；`heightPixels/interiorPixelSize/heightUVOffset/heightUVScale` 表达带两像素边框的高度采样，UV y 翻转原样保留。 |
| CMTSTile 静态高度与跨面函数 | `pixelColumn/pixelRow/columnFraction/rowFraction/columnCenterDistance/rowCenterDistance` 明确像素中心在半整数；RGB 权重保留 2^-8、2^-16、2^-24。跨面先将 tileU/V 乘 levelScale 得 faceU/V，再循环换 face、旋转/翻转越界坐标；`previousFaceU` 保存交换前分量，`cubeU/cubeV/faceBasis` 构成立方体方向，最后投影到椭球。 |
| CMTS 模块暂存量 | `scratchPositionComponents/scratchPosition/scratchLLA`、各差分采样点和 `surfaceTangent/surfaceBitangent` 明确为模块复用对象；单次同步计算使用，不能跨 await 依赖内容。 |
| WMTSComponent 配置与生命周期 | `dimensionName/defaultDimensionValue/dimensionValue` 区分维度模板值；`availableLayers/matrixSetIdentifiers/identifier/rootBounds` 表达默认选择及虚根边界；所有 URL 原模板、CRS 与 loading 检查保持。 |
| WMTSTile.createNewTile/checkSplit/checkJoin | `parentTile/childRow/childColumn/childLevel/row/column/matrixSet/tileCounts/childBounds` 对应矩阵行向下、CRS y 向上的子象限转换；层级 -1 虚根、每帧 split/join 节流保留。 |
| WMTSTile.load | `resourceManager/texture/tileUrl/layerBounds` 表达资源链；`rowsPerSide/columnsPerSide/row/column/rowFraction/columnFraction/crsPosition/clampedCRSPosition/lla/position/positions/normals/uvs/indices` 明确 21×21 网格、CRS 裁剪和 UV 修正。中心与半径仍用原 5×5 抽样策略，未更换算法。 |
| WMTSTile.unload/update/render | `meshObjects/materials/itemIndex/itemCount/shadowRingsUniform/colorTextureUniform` 明确拆除与释放路径；`children/childIndex/childCount/transitionsActive` 明确递归更新，公开方法与回调次序不变。 |

两个最终文件的 `bindingHash` 与修改前 HEAD 完全相等，包含最终控制流展开及后续角色命名校准；已写入 `tools/semantic-terrain.node-check.cjs` 的固定基线。测试不依赖忽略目录或临时快照。该脚本逐文件检查 hash、模板注释零残留、短词法绑定零残留，并直接在 Node VM 执行真实模块体，隔离浏览器/Three.js 依赖。

`node tools/semantic-terrain.node-check.cjs` 覆盖 RGB 高度解码、边界像素截断、半整数像素中心和邻域插值、三分量 mesh 双线性插值，以及五条等价 cube-face 越界映射（含赤道面和两极面）。取消测试在 CMTS acquire 待决时销毁瓦片，确认资源返回后只 release、不安装；WMTS 测试确认精确层/行/列 URL 替换、失败回退 gray、随后销毁分支释放纹理并移除/销毁材质。新增可读性测试在整理前已因 CMTS 模板注释失败，整理后通过。两个模块 `node --check` 和差异空白检查通过。

这些 CPU 测试未渲染 GPU mesh；缝合方向公式与所有材质属性依靠最终等价 hash 保持原实现，没有宣称验证真实地图服务或全部六面所有远距离越界组合。未改动的边界包括：CMTS 配置加载失败时计数递减路径、`||=` 的既有短路更新行为、零 FPS 的分批进度、无效 face 或非有限坐标、动态资源晚到回调的其他生命周期。WMTS 既有网格索引长度/步幅、包围范围初始值、radial normal、setVisible 的先写旧可见值顺序保持不变，未在命名整理中修正。所有 NASA/runtime URL、格式与资源发布契约均未改变。

## 第四轮：25 个数学、时间、动画和集合 core 文件

范围仅为下表 `eyes/src/engine/core/` 文件，共整理 605 个压缩词法绑定。全部参数和局部名称均长于两个字符；公开 `x/y/z/w/r/g/b/a` 坐标或颜色属性、字段和方法名保持不变，未把它们误当成压缩变量改 API。

| 文件 | 压缩绑定数 | 命名证据与不变量 |
| --- | ---: | --- |
| AER.js | 3 | `useDegrees/source/vector` 区分显示选项、复制输入和反解向量；azimuth/elevation 弧度，range 与位置同单位。 |
| Color.js | 29 | RGBA 构造/set 参数为 `red/green/blue/alpha`；`source/left/right/base/direction/scalar/start/end/fraction` 区分逐分量运算、标量运算及混合。alpha 同样参与运算，RGB 统计不含 alpha。 |
| DateTime.js | 18 | `ephemerisSeconds/unixSeconds/leapIndex/leapCount` 区分时标；`dayOfYear/precedingDays/daysInMonth/dateText` 明确年积日与解析；共享 UTC Date 的设置次序原样保留。 |
| Geometry.js | 22 | `lineOrigin/lineDirection/sphereCenter/sphereRadius/directionMagnitudeSquared/discriminant/sqrtDiscriminant/intersectionOut` 对应完整二次方程；球面 `position/lla/sphereRadius/equatorialDistance` 单位明确。 |
| Interval.js | 9 | `source/value/other/left/right` 对应值与区间；半开 contains、严格正长度相交、空交折叠到大下界。 |
| LatLonAlt.js | 2 | `useDegrees/source` 区分输出转换与复制；lat/lon 为弧度，alt 随参考体系长度单位。 |
| Mapping.js | 24 | `scene/entityName/mappingType/options/enabled/operations` 区分 API 参数；`basicComponent/cmtsComponent/cloudComponent/otherMappingType` 区分等待、禁用及浮云分支；天体资产 URL 未改。 |
| MathUtils.js | 21 | `value/minimum/maximum/wrappedValue`、`radians/degrees`、`firstAngle/secondAngle`、`startAngle/endAngle/fraction` 表达 wrap、角差和跨周期插值；常量与计算顺序不变。 |
| Quaternion.js | 89 | 构造顺序 `scalar/vectorX/vectorY/vectorZ` = w,x,y,z；轴角半角、Euler 三轴半角和 sin/cos、矩阵 trace/分支 scale、左右乘积临时量、半球符号/混合权重分别命名；全分量临时存储维持别名安全。 |
| Rect.js | 12 | `originX/originY/width/height/source/point/otherRect` 明确矩形数据与查询；边界闭开约定不变。 |
| Sort.js | 40 | `values/value/isLess/isEqual/lowerIndex/upperIndex/middleIndex/insertionIndex/comparisonIndex/swappedValue/onSwap` 对应 lower-bound、稳定重复插入及交换通知；内层临时量不混同外层索引。 |
| TimeUtils.js | 6 | `ephemerisSeconds/unixSeconds/leapAdjustment/leapIndex` 对应固定基准和闰秒调整；Unix 无法唯一表示 leap second，ET 映射折叠行为保留。 |
| Tuple.js | 5 | `factory` 按 0..N−1 逐槽调用，保留调用数量和顺序。 |
| Vector2.js | 42 | 构造/set 使用 `coordinateX/coordinateY`；逐分量/标量输入、`magnitude/magnitudeProduct/deltaX/deltaY`、夹紧端点和混合比例清晰；零输入 normalize 不改输出。 |
| Vector3.js | 84 | 叉积缓存 `crossX/crossY/crossZ`，四元数乘向量缓存 `productX/Y/Z/W`；`projectedSource/projectedTarget/signedAngle/axis` 表达绕轴投影，`startMagnitude/endMagnitude/angle/startWeight/endWeight` 表达方向和长度混合；zero normalize 复制零输入。 |
| VisibleInterval.js | 19 | `entity/camera/minimumMetric/maximumMetric/pixelRadius/normalRadius/cameraLocalPosition/absoluteZDistance/minimumFade/maximumFade` 区分量纲和两侧淡入淡出。 |
| Animation.js | 28 | `model/objectName/initialVisible/jointName/rotationAxis/keyframes/controller/entity/time/insertionIndex/startKeyframe/endKeyframe/fraction` 对应模型子对象阶梯可见性与关节 Euler 分量插值；排序比较器局部独立命名。 |
| AnimationUtils.js | 11 | Web Animations 的 `element/keyframes/timings/direction/fade/xOffset/yOffset/endpoints` 直接映射浏览器参数和百分比平移，不更改 timing 原字段。 |
| Transitions.js | 46 | `arcScale/sphereRadius/keepSphereUp/sphereEntity/initialPosition/finalPosition` 明确球面跳转输入；轨道平面/经纬端点、弧长、剩余弧长、高度、焦点/up、输出姿态分别命名；圆弧子问题输出 x 为剩余弧长、y 为高度。 |
| CubeMap.js | 12 | `uvFaceOut/direction/faceFrames/selectedFrame/faceIndex/faceNormal/dominantComponent/secondaryComponent/tertiaryComponent/negativeFace/normalProjection` 对应选面及 UV 投影；并列面后者覆盖前者。 |
| Quadtree.js | 42 | `name/bounds/entry/node/childNode/childIndex/valueIndex/valueCount/previousValues/previousEntry/combinedCount/intersectionsOut/intersectionFlag/ascending` 区分空间归属与交集遍历；仅完整包含项下降，深度上限 8。 |
| Pool.js | 11 | `item/pooledItem/poolIndex/maximumUsedRatio/freeIndex/objectIndex/shiftedObjectIndex/laterFreeIndex/objectCount` 表达空闲栈及清理后的索引修正；clean 的阈值是允许清理的最大占用比例。 |
| FastIterable.js | 0 | 空基类只补实际类型标记契约，不新增 iterator 或隐藏状态。 |
| FastMap.js | 17 | `initialEntries/entry/key/value/index/indexedEntry/isLess/left/right/firstIndex/secondIndex` 区分数组条目、Map 索引以及排序交换；删除和排序维持索引表。 |
| FastSet.js | 13 | `initialValues/value/index/indexedEntry/isLess/left/right/firstIndex/secondIndex` 区分成员和索引；保留 add 去重返回 this、构造输入重复项等原行为。 |

所有公式和执行体已逐文件读取；调用约定同时核对了 SpheroidComponent 的线球求交、NASA 关节动画中的 x/z Euler 分量及弧度角、LayerPanel 的方向 fade 输入，以及前述控制器/地形中的向量、轴、矩形和池使用。此处没有借“恢复”名义发明原始 NASA 变量名。

每个最终文件均通过 `bindingHash` 与修改前 HEAD 的规范化等价检查，固定基线直接内联在 `tools/semantic-math.node-check.cjs`，无忽略目录依赖。先运行新增可读性检查，出现预期失败 `Compressed binding t`；整理后 25 文件的同一检查通过。短路、三元和逗号语句只在返回值被丢弃或工具可证明顺序等价的位置展开，未重排数值公式。

运行回归直接装载实际模块体，使用真实 Pool/MathUtils/Vector/Quaternion/Interval/Rect/Geometry/Sort/TimeUtils/DateTime/FastMap/FastSet/Quadtree 等相互依赖；仅 Three.js 静态池构造目标与浏览器外部环境隔离。验证包括：

- 叉积输出与左输入别名、旋转/逆旋转原地别名、四元数乘自身、向量 slerp 的长度和方向、二维/三维零 normalize 差异。
- 二轴坐标架得到单位姿态、原三轴输入抛错契约、零四元数 normalize 保留既有输出。
- 非单位射线方向的线球二次方程两根与未命中、球面 LLA 正反转换、区间与矩形半开边界。
- ET/Unix 正反转换、最后一条闰秒后的 ET 两秒跨度、1900/2000 闰年、2020 年积日以及毫秒文本/ET 日期往返。
- Pool 重用相同对象、空闲项析构及保留对象索引修正、拒绝未借出的普通对象；FastMap/FastSet 排序删除后索引仍正确。
- Sort 重复项 lower-bound 和单项删除、Tuple 工厂调用顺序、CubeMap 主轴及并列面、Quadtree 插入/移动/交集消失、圆弧跳转终点和缓动端点。

保留的数值和生命周期边界：Quaternion.inverse 仍仅共轭、需要单位输入；setFromAxes 三根轴全给仍抛错；from-to 反向向量的固定轴选择不修正；Vector2、Vector3、Quaternion 的零归一化规则互不统一。MathUtils 的 NaN/无穷和 wrap 零跨度、DateTime 共享 Date 的月份溢出顺序、固定历史闰秒表、Pool 重复 release 或跨池标记限制、FastSet/FastMap 构造重复输入、Quadtree viewport 重建与旧 node 引用等全部按原代码保留。Mapping 异步渲染切换、Web Animations 浏览器效果及球面完整场景仍须浏览器集成验证；本轮没有改资源/UI 其他所有者的文件。
