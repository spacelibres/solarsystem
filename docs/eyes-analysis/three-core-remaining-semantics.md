# Three core 保留项的实际语义

本文逐项阅读本地 `eyes/src/vendor/three/core.js` 与官方 npm 0.185.0 的同类同方法实现；0.185.1 用于核对 patch 差异。范围是本轮报告的 131 个未获完整结构匹配的方法与 33 个未获完整结构匹配、经人工完整对读定位角色的顶层函数。这里的“理解”指具体输入、输出、状态和算法；不等于证明执行完全等价，更不等于恢复被 minifier 擦除的原始名称。参考文件是本地已有发布物，阅读未执行应用、未访问 NASA 资产。

每节保留报告键，后接本地及两版官方的精确起始行。方法键是稳定定位入口；行链接对应本文核对时的源码，后续排版变化可按类/方法键重新定位。辅助函数中“角色对应”根据完整操作和调用关系人工核对，名称定位与全量结构等价是不同的证据层级。

## 数学、纹理与场景基础

### Quaternion.static:method:slerpFlat

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:1108) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:3926) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:3926)

输入两个平铺数组中的四元数、各自偏移、目标数组偏移和插值量。先读取全部分量，所以支持源与目标重叠；点积为负就翻转第二四元数，选择短弧。点积小于 0.9995 时用 acos/sin 的球面权重，否则线性混合后归一化；最后覆盖目标四项，没有返回数组。没有 clamp 插值量，也没有对非法/零长度四元数修复。官方把第二权重赋值独立为语句，本地嵌入第一次分量计算，不能据此猜局部原名。

### Texture.method:setValues

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:2818) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:7745) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:7745)

遍历输入可枚举属性，undefined 值和实例不存在的属性只警告。Vector2、Vector3、Matrix3 的新旧对象类型标志相符时调用旧对象.copy，保持持有者的引用；其他值直接替换字段。没有自动置 needsUpdate，没有深拷贝任意对象，返回 undefined。

### Texture.method:transformUv

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:2869) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:7883) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:7883)

仅 UVMapping 对传入 Vector2 原位变换：乘 matrix，分别按 wrapS/wrapT 处理越出 [0,1] 的分量。Repeat 减 floor；Clamp 取 0 或 1；Mirror 根据 floor 的奇偶反射，因此也覆盖负坐标；最后按 flipY 翻转 y。返回输入本身；恰好为 0/1 时不进入 wrapping 分支。

### Matrix4.method:makePerspective

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:4248) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:10992) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:10992)

用 left/right/top/bottom/near/far 覆盖列主序 16 个 elements，x/y 比例为 2near/跨度、偏心项为边界和/跨度，w 行为 [0,0,-1,0]。标准 WebGL 深度映射到 [-1,1]，WebGPU 到 [0,1]；reversedDepth 用 near/(far-near)、far*near/(far-near)。只在非 reversed 分支验证坐标系统。返回 this；没有防止零跨度、near=far 或无限 far 的数值退化。

### Matrix4.method:makeOrthographic

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:4262) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:11052) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:11052)

同样完整覆盖矩阵，但横纵比例为 2/跨度，平移为负边界和/跨度，齐次 w=1。WebGL z 比例 -2/(far-near)，WebGPU 为 -1/(far-near)，反向深度为正 1/(far-near) 且平移 far/(far-near)。无除零保护，返回 this。官方的嵌套 else-if 与本地 guard-throw 是结构差异，不能省略 reversed 分支绕过坐标验证这一行为。

### Object3D.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:4563) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:11804) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:11804)

建立递增只读 id、随机 uuid、parent=null、独有 children/userData/animations、克隆 DEFAULT_UP。position/rotation/quaternion/scale 是新对象；Euler 和 quaternion 的 change 回调双向同步，传 false 避免递归通知。本地回调匿名内联，官方具名。建立局部/世界矩阵、modelViewMatrix/normalMatrix、Layers 与默认自动更新、可见、阴影、裁剪标志；pivot=null、static=false。children 不共享，父子关系此时为空；这里只初始化，不计算世界变换。

### Color.method:setStyle

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:5409) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:14165) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:14165)

解析 rgb/rgba 整数或百分比、hsl/hsla、3/6 位 hex，否则走颜色名。RGB 分别以 255/100 上限截断并归一化，HSL 角度除 360；颜色空间默认 SRGBColorSpace，经 setRGB/setHSL 转入工作空间。alpha 小于 1 只警告而不保存透明度；未知模型、坏 hex 警告后返回 this。正则不是现代 CSS 任意语法解析器。

### Color.method:getHSL

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:5504) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:14446) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:14446)

把 this 复制到共享临时 Color 并转换到请求空间，避免改 this。max/min 给 lightness=(max+min)/2；灰阶 h=s=0；其余按亮度选择 saturation 分母、按最大通道选择 hue 扇区，再除 6。写 target.h/s/l 并返回 target。数值不是强制 clamp，不能把工作空间原始 RGB 直接当成 sRGB。

### Box3.method:intersectsTriangle

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:6265) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:16243) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:16243)

空盒直接 false。将三角形平移到盒中心坐标，使用盒半径和三条边构造分离轴：9 个边×坐标轴、3 个盒轴、1 个三角形法线；任一投影分离就 false。调用 satForAxes，返回布尔，不改盒或三角形；复用模块 Vector3 临时量，因此不是可重入的局部纯计算。边界接触按非严格分离保留。

### BufferGeometry.method:setIndex

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:7199) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:18404) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:18404)

Array 输入从尾向前检查，任一值 >=65535 选 Uint32BufferAttribute，否则 Uint16，itemSize=1；注意阈值包含 65535。非 Array 输入直接作为 index（包括 null），不克隆现有 attribute。返回 this；内联的判宽函数对应官方 arrayNeedsUint32 的操作，不代表所有输入都验证为合法索引。

### BufferGeometry.method:computeTangents

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:7436) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:19011) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:19011)

缺少 index/position/normal/uv 时记录 error 并退出。新建或复用 count 相符的四分量 tangent。每三角形用位置边和 UV 差解切线/副切线；UV 行列式倒数非有限时跳过该三角形。累加到各顶点，随后对 normal 做 Gram-Schmidt 正交化并 normalize，cross(normal,tangent) 与副切线点积决定 w 的 ±1。按 groups 遍历，空 groups 用全部索引，不是 drawRange；最后 _transformed=true。生成值写 attribute，返回 undefined。

### BufferGeometry.method:toNonIndexed

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:7517) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:19297) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:19297)

有 index 时新建 BufferGeometry，按 index 逐项展开所有 attributes 和 morphAttributes；交错属性从 data.stride+offset 取数据，保留原 typed-array 构造类型、itemSize、normalized。复制 morphTargetsRelative 和组范围，新缓冲独立持有数据；没有复制任意元数据。已非索引时警告并返回 this，而非克隆。

### Material.method:setValues

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:8026) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:21031) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:21031)

undefined 输入直接结束；逐属性跳过 undefined/未知属性并警告。已有 Color 调 set，已有同类型 Vector2/Euler/Vector3 调 copy，否则替换引用。与 Texture.setValues 不同，Color 可以接受数字或字符串值，也支持 Euler；不自动深拷贝纹理，不统一置 needsUpdate。

## 拾取、层级与批处理

### Sprite.method:raycast

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:8145) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:21943) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:21943)

根据 raycaster.camera 的世界矩阵构建朝向相机的四边形，采用 matrixWorld 尺度、center 和 material.rotation。透视相机且 sizeAttenuation=false 时乘相机空间负 z 保持屏幕尺寸。先测一个三角形，不中再测另一个；命中后以世界距离过滤 near/far，追加 point 克隆、插值 uv、face:null、object:this。camera=null 只记录错误后仍继续访问，不能说是安全返回。

### LOD.method:addLevel

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:8218) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:22171) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:22171)

distance 先取绝对值，再按 distance 升序插入 {distance,hysteresis,object}；同距离插在已有同距离后面。this.add(object) 建立父子关系，返回 this；未对 hysteresis 进行范围限制。

### LOD.method:raycast

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:8258) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:22283) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:22283)

有 level 时取 LOD 的世界位置，与射线原点计算距离，getObjectForDistance 选择对象后委派 raycast，向同一命中数组追加。不按相机 zoom 修正，此处与 update 的选级距离不同。

### LOD.method:update

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:8266) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:22305) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:22305)

超过一个 level 时，世界相机到 LOD 距离除 camera.zoom。首级先可见；按距离提升，原本可见的候选阈值减去 distance*hysteresis，减少跳变。保存 _currentLevel，把更远的级别隐藏。0/1 级分支不改状态；不返回选中对象。

### Ray.method:intersectsPlane

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:8429) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:22797) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:22797)

起点在平面上立即 true；否则 plane.normal·direction 与起点有符号距离异号才 true。平行且不共面返回 false，交点在反向也 false；只判断，不写目标点。

### Ray.method:intersectTriangle

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:8446) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:22920) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:22920)

边向量叉积得法线，direction 点积判平行及背面剔除。通过两个带符号三重积检查重心坐标非负、和不超过分母，再检查射线参数非负。成功调用 at(t,target) 写 target 并返回，失败 null；边界允许相等。复用共享临时量，不把退化三角形当命中。

### Mesh.method:updateMorphTargets

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:8528) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:23428) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:23428)

取 geometry.morphAttributes 的第一个键的数组，重建零权重 morphTargetInfluences 和 name→index 的 morphTargetDictionary；无名项用字符串索引，重名覆盖字典前项。没有 morph 数据时保持旧字段，未清空。Line/Points 的独立同名实现见各节。

### Mesh.method:raycast

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:8561) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:23517) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:23517)

material undefined 退出。必要时计算几何包围球，转世界空间；射线先从 near 处 recast，若起点不在球内再测球交点且限制剩余 far-near 范围。逆 matrixWorld 把原射线转局部，已有 boundingBox 且不中则退出，最后委派 _computeIntersections。球测试是粗筛，三角形命中还有世界 near/far 过滤。

### Mesh.method:_computeIntersections

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:8574) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:23563) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:23563)

遍历 indexed 或 non-indexed 三角形，步长 3；多材质模式必须按 groups 选 materialIndex，并与 drawRange 和实际 attribute/index count 取交。每次调用 Ga 获取实际顶点（包含 getVertexPosition 的变形语义），成功写 faceIndex=floor(绘制位置/3)，组模式补 face.materialIndex 并追加。单材质不依赖 groups；本地把索引三项读取内联，不能由局部数量推断缺少逻辑。

### SkinnedMesh.method:raycast

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:8681) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:23954) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:23954)

使用自身 boundingSphere/boundingBox 而非 geometry 的静态边界，必要时 computeBoundingSphere（反映皮肤变形）。球转世界空间粗筛后，逆世界矩阵得到局部射线，盒若存在再筛，再调用继承的 _computeIntersections。最终 getVertexPosition 负责蒙皮顶点；此处不主动计算 boundingBox，不承诺随每帧骨骼变化重建边界。

### InstancedMesh.method:getMorphAt

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:8957) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:24935) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:24935)

输入实例索引和带 morphTargetInfluences 的目标对象。从 morphTexture.source.data.data 读取一行；步幅为目标权重数+1，跳过该行第一项（基础 influence），覆盖目标数组。不创建数组、不返回 mesh、不检查索引与数组长度。

### InstancedMesh.method:raycast

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:8964) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:24953) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:24953)

共享临时 mesh 使用此 geometry/material。整体实例包围球世界粗筛后，逐实例读取矩阵，与 matrixWorld 相乘；委派临时 mesh.raycast。命中补 instanceId，object 改为此 InstancedMesh，然后转移到输出数组并清空临时结果。count 控制实例范围；整体球没更新会影响粗筛。

### Frustum.method:setFromProjectionMatrix

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:9252) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:25558) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:25558)

从组合投影矩阵的行加减提取左右上下四平面并 normalize。标准 far 用第4行-第3行；WebGL near 用第4行+第3行，WebGPU near 直接第3行；反向深度交换相应 near/far 组合。非法坐标系统在标准分支抛错。覆盖已有 planes，返回 this，不分配新视锥。

### Frustum.method:intersectsSphere

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:9290) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:25656) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:25656)

逐个六平面检查 center 的有符号距离是否小于 -radius；任一在外即 false，否则 true。依赖法线已归一化，边界相切保留；这是保守视锥球相交判断，不是求交点。

### BatchedMesh.method:addInstance

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:9590) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:26515) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:26515)

没有空闲 ID 且已达到 maxInstanceCount 时抛错。重用最小空闲 ID 或追加 instanceInfo，标记 visible/active 与 geometryIndex；矩阵纹理对应 16 项写 identity，颜色纹理若存在写默认颜色四项，并置纹理 needsUpdate、_visibilityChanged。返回实例 ID，不克隆独立 Mesh，也没有在此验证 geometry ID。

### BatchedMesh.method:addGeometry

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:9605) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:26581) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:26581)

初始化/验证兼容的布局。为顶点及可选 index 保存起点、实际数、保留容量与 null 边界缓存；-1 容量用输入 count，超总容量抛错。重用最小 geometry ID 或递增 _geometryCount，setGeometryAt 复制实际数据，推进 next 起点并返回 ID。预留容量区别于实际 draw count，供以后替换几何体。

### BatchedMesh.method:optimize

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:9677) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:26833) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:26833)

按 vertexStart 排列 geometry ID，跳过 inactive，向前压紧活跃保留区。index 搬移时修正基址差，copyWithin 搬移 index/每项 attribute，加入 updateRange 并标 needsUpdate，刷新每个范围 start 与最终 _next*Start/_visibilityChanged，返回 this。ID 与实例引用保持，改变的是存储位置；本地和官方都在 indexStart 改变分支内修正索引。

### BatchedMesh.method:setInstanceCount

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:9821) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:27219) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:27219)

先移除末尾连续空闲 ID；若新上限仍覆盖不了有效 instanceInfo 则抛错。新建 multiDraw counts/starts 数组并复制内容，更新上限；dispose 旧 indirect/matrix/可选 color 纹理后重建并拷贝旧数据。资源所有权属于 BatchedMesh，不是只改 count 数字；返回 undefined。

### BatchedMesh.method:setGeometrySize

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:9835) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:27280) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:27280)

按所有 active 范围的 start+reservedCount 检查新顶点/index 容量，不能截掉已保留范围。dispose 旧 geometry，更新上限，已初始化则用旧布局重建 BufferGeometry，再复制 index 和 attributes。没有自动 optimize；删除留下的孔仍可能阻止缩小。错误字符串顶点分支也插入 maxIndexCount，这是两份代码可见的现状，不替作者修正。

### Line.method:raycast

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:9992) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:27916) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:27916)

世界包围球半径加 threshold 粗筛；逆世界射线，threshold 除本地 scale 三分量均值后平方。indexed/non-indexed 都与 drawRange 交集，LineSegments 步长 2、普通线步长 1，LineLoop 额外闭合最后与首点；Fs 求射线到线段距离并做世界 near/far。平均尺度是近似，不能宣称非均匀缩放下严格等距。

### Line.method:updateMorphTargets

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:10033) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:28019) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:28019)

与 Mesh 的独立实现一样，按首个 morph 属性数组重建零 influences 和名称字典；无属性时不清旧值，重名末项胜出。这不是从 Mesh 继承的同一函数，已单独检查。

### Points.method:raycast

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:10137) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:28418) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:28418)

世界包围球加 Points.threshold 粗筛，射线转局部、阈值除平均 scale。indexed 遍历索引值，non-indexed 遍历位置下标，均遵守 drawRange，调用 testPoint 测射线距离并追加含 index 的世界命中。不是把点看成带屏幕像素尺寸的 sprite。

### Points.method:updateMorphTargets

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:10158) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:28483) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:28483)

单独实现首个 morph 属性驱动的 influences/dictionary 初始化；权重全 0，名称缺失用索引，空数据不主动删除旧状态。与 Line 和 Mesh 的三处都已阅读。

## 纹理资源与曲面生成

### VideoTexture.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:10212) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:28580) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:28580)

向 Texture 传视频和 mapping/wrap/filter/type 参数，默认 min/mag 为 LinearFilter，禁止 mipmaps。若视频支持 requestVideoFrameCallback，注册自续回调，每帧置 needsUpdate 并保存最新 callback ID。只调度视频更新，未在构造时上传 GPU；回调闭包持有此纹理与视频。

### VideoTexture.method:update

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:10223) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:28642) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:28642)

仅当视频没有 requestVideoFrameCallback 且 readyState>=HAVE_CURRENT_DATA 时标 needsUpdate，避免有逐帧 API 时每个渲染帧重复更新。函数不返回帧或纹理，旧浏览器 fallback 没有比较时间戳。

### DepthTexture.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:10475) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:29246) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:29246)

输入 width,height、默认 UnsignedIntType、采样/映射参数及默认 DepthFormat、depth=1。只接受 DepthFormat/DepthStencilFormat，否则构造前抛错；image 是新 {width,height,depth} 描述，不是像素数组。flipY=false、generateMipmaps=false、compareFunction=null，默认最近采样，父类建立其余纹理状态。

### CapsuleGeometry.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:10639) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:29682) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:29682)

参数半径、圆柱高度、每端 capSegments、radialSegments、heightSegments。高度至少 0，分段取整并分别至少 1/3/1；沿剖面先下半球、圆柱、上半球生成 radialSegments+1 的闭合环。法线从剖面半径和球心偏移归一化，v 按半球弧长+柱长分配，两个极点 u 加减半格。相邻环每格两个三角形，生成 position/normal/uv 和 index。radius=height=0 没有总弧长除零保护；参数对象保存输入而非裁剪后的值。本地 profileY 加法次序与官方不同，数学说明不是浮点逐位等价证明。

### CylinderGeometry.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:10782) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:30034) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:30034)

输入上下半径、高度、周向/高度段、openEnded、角起点和范围；段数 floor。侧壁半径线性变化，法线 (sinθ,(bottom-top)/height,cosθ) 归一化，锥尖跳过退化一半三角形。非 openEnded 且对应半径>0 才建端盖：每扇面独有中心顶点及周边 UV，顶/底反转绕序和法线。groups 材质索引侧0、顶1、底2；写 index 与三个浮点属性。

### PolyhedronGeometry.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:10912) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:30416) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:30416)

输入 xyz 平铺顶点、三角索引、radius、detail。每面分成 detail+1 列三角网，展开为非索引三角形，归一化投到半径球面；用 atan2 方位/倾角给 UV，再修极点方位与跨 seam 的 u+1。normal 初始为位置副本，detail=0 重算面法线，否则归一化为平滑径向法线。生成自有 position/normal/uv；保留参数引用但不直接改原输入数组。

### DodecahedronGeometry.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:11022) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:30762) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:30762)

radius=1/detail=0，20 个种子顶点（立方角点及黄金比/倒数坐标），36 个三角形即十二个五边面三角化；传 PolyhedronGeometry 完成细分/投球/UV。重置 type 与仅含 radius/detail 的 parameters。与其他多面体仅共享父算法，种子拓扑不同，不能折为同一个“几何体构造器”。

### EdgesGeometry.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:11061) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:30864) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:30864)

输入 geometry 可空与角阈值（度，默认1）。逐三角形将位置四舍五入到 1e-4 作 hash，退化三角形跳过；建立有向边表，遇反向边时比较面法线点积<=cos阈值才输出，随后标该边已消费。未配对边作为轮廓输出。结果只有非索引 position 线段；与 Wireframe 的所有唯一边不同，焊接精度是固定的。

### Curve.method:getUtoTmapping

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:11179) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:31210) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:31210)

从缓存/生成的弧长表 getLengths 读取累计距离；distance 为真值时用它，否则 u*总长（distance=0 走 u 分支）。二分找精确项或前一项，再在两个累计值间线性插值得参数 t。返回标量，不改 curve 控制点；没有 clamp 超出范围输入，对零长表区间除法不另作保护。

### EllipseCurve.method:getPoint

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:11322) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:31645) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:31645)

输入 t 与可复用 Vector2 target。将 end-start 角差按 2π 规整，EPSILON 区分零角与整圈；clockwise 反转角差，按椭圆半径求坐标，再绕 (aX,aY) 用 aRotation 旋转。覆盖 target 并返回；不限制 t 到 [0,1]。

### CatmullRomCurve3.method:getPoint

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:11416) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:31979) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:31979)

由 t 得段索引与段内权重；closed 循环取点，开放曲线两端线性外推虚拟控制点，并特判 t=1 的最后段。centripetal/chordal 对距离平方分别用 1/4、1/2 次幂，dt<1e-4 做退化修复，再初始化 x/y/z 三个三次多项式；catmullrom 分支用 tension。求值写 target，复用模块多项式状态；不验证足够点数。

### CurvePath.method:getPoint

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:11839) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:33225) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:33225)

把 t*总长转成路径距离，顺序找到第一个累计子曲线长度>=距离的段；换算该段内弧长比例并调用 getPointAt，零长子段用0。传透 optionalTarget，超出所有子段返回 null；不是按曲线条数等分 t。

### ExtrudeGeometry.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:12590) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34720) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34720)

shape 或 shape 数组+options，默认单位方形。extractPoints 后规范轮廓/洞绕序，以相对坐标尺度的 1e-10 距离阈值合并重叠点；由邻边求 bevel 位移，超过长度平方2时缩短尖角，平行边另分同/反向。bevel 默认真、thickness=.2、size=thickness-.1、segments=3；steps/depth 默认1。extrudePath 分支取等弧长点与 Frenet frames，关闭 bevel，用 normal/binormal 把二维点铺到路径。底/顶盖用 ShapeUtils.triangulateShape，侧面把相邻轮廓层四边形拆成两三角，输出非索引 position/uv 并算 vertex normals；groups 盖0、侧1。UVGenerator 可注入。原 shapes/options 在 parameters 保留引用，没有复制任意路径对象。

### ExtrudeGeometry.method:toJSON

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:12822) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:35443) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:35443)

先取 BufferGeometry 序列化结果；shapes 只存 UUID 数组，options 做 Object.assign 浅拷贝，extrudePath 若存在改为路径.toJSON。原 options 不被这次替换改变，其他对象值仍共享引用；不会把 Shape 实例本体内嵌。

### IcosahedronGeometry.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:12884) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:35595) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:35595)

radius/detail 输入，12 个含黄金比的种子顶点、20 个三角面传 PolyhedronGeometry，随后设自身 type 和 radius/detail parameters。与 Dodecahedron 的20顶点/36三角种子不同；细分与球面 UV 由父类执行。

### OctahedronGeometry.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:13001) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:35888) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:35888)

6 个轴向 ±1 种子顶点、8 个三角面，radius/detail 传父类；参数及 type 记录为 OctahedronGeometry。不是直接生成经纬线球，detail=0 保留三角面法线。

### RingGeometry.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:13096) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:36088) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:36088)

innerRadius=.5/outerRadius=1、thetaSegments>=3、phiSegments>=1、thetaStart/Length 定义 XY 平面的扇形环。半径按 phi 线性增长，每行 theta+1 顶点，法线固定+Z，UV 以 outerRadius 归一到中心 .5；每格两个索引三角形。不 floor 这两个分段参数，不验证 outerRadius 非零或半径顺序。

### ShapeGeometry.method:toJSON

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:13210) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:36387) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:36387)

在 super.toJSON 结果中填 shapes UUID 数组，单 Shape 同样转为数组。不会复制曲线数据或洞坐标；反序列化需要外部 shapes 字典。与 Extrude 的区别是不包含 options/extrudePath。

### TetrahedronGeometry.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:13323) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:36643) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:36643)

4 个交错立方角种子顶点、4 个三角面，调用 PolyhedronGeometry(radius,detail)，再设置自身 type 与 parameters。与 Octahedron/ Icosahedron / Dodecahedron 的顶点面数逐项不同。

### TubeGeometry.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:13506) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:37081) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:37081)

path、tubularSegments=64、radius=1、radialSegments=8、closed=false。沿 path.getPointAt（弧长参数）采样，Frenet normals/binormals 组合 -cos 和 sin 得径向法线，顶点=路径点+radius*法线；每圈重复 seam 顶点。closed 最后一圈直接重复第0圈，非闭合采末端；UV 是纵/周向比例，相邻格两三角。this.tangents/normals/binormals 持有 frame 数组，输入 path 保留引用。

### WireframeGeometry.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:13590) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:37315) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:37315)

对 indexed geometry 按 groups（空则全范围）、non-indexed 按每三位置为面，提取三条边。Yo 用两端点完整坐标字符串同时记录正反 hash，首次边才输出两个顶点；不进行角阈值或 1e-4 焊接。结果自有非索引 position；geometry=null 生成空对象。

## 材质、复制与序列化

### ShaderMaterial.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:13729) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:37770) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:37770)

初始化新 defines/uniforms/uniformsGroups，默认顶点 shader 为投影*modelView*position、片元为不透明红色；line/wireframe 默认宽1，fog/lights/clipping=false，forceSinglePass=true。extensions 两个布尔开关默认false，缺省 color=[1,1,1]、uv/uv1=[0,0]，glslVersion=null。最后 setValues(parameters)，不会编译 shader。官方引用默认 shader 常量，本地内嵌同样文字。

### ShaderMaterial.method:copy

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:13740) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:37992) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:37992)

先父类复制；uniforms 用 cloneUniforms，uniformsGroups 每组.clone，避免这些容器直接共享；defines/extensions/defaultAttributeValues 仅 Object.assign 浅拷贝（嵌套缺省数组仍共享）。shader 字符串与线框、灯光、裁剪、GLSL 等标志赋值，返回 this。不能把“copy”描述为所有纹理和数组均深拷贝。

### ShaderMaterial.method:toJSON

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:13748) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:38025) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:38025)

为每个 uniform.value 按 Texture/Color/Vector2/3/4/Matrix3/4 写 type t/c/v2/v3/v4/m3/m4 与 UUID/hex/数组，其余保留 value。纹理通过 toJSON(meta) 进入资源缓存。非空 defines、shader 字符串、lights/clipping 与仅 true 的 extensions 保存；返回父结果扩展对象，不保存 uniform 的其他任意字段。

### ShaderMaterial.method:fromJSON

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:13784) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:38127) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:38127)

先父类恢复；按 uniform type 新建 Color/向量/矩阵，texture 按传入纹理 UUID 字典取共享引用，缺失为 null；无 type 直接赋 value。可选 defines 直接引用 json 对象，extensions 合并现有对象，shader/glsl/lights/clipping 有字段才替换。返回 this，不清除 JSON 未列出的已有 uniforms。

### MeshStandardMaterial.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:13824) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:38286) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:38286)

STANDARD define，白 color、roughness=1、metalness=0、黑 emissive；所有 map 默认null，normalScale=(1,1)，切线空间 normalMap，displacementScale=1/bias=0，光照/环境强度1，独有 envMapRotation Euler，fog=true、wireframe/flatShading=false。setValues 应用参数；不是在构造时加载或拥有贴图像素。

### MeshStandardMaterial.method:copy

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:13830) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:38642) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:38642)

重置 STANDARD define，color/emissive/normalScale/envMapRotation 使用已有对象.copy 保持目的引用；map、lightMap、aoMap、emissiveMap、normal/roughness/metalness/alpha/env 等纹理字段直接共享源引用。数值/线框/fog 标志赋值并返回 this；不会 clone 或 dispose 贴图。

### MeshPhysicalMaterial.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:13864) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:38737) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:38737)

基于 Standard，增加 STANDARD+PHYSICAL，ior=1.5、reflectivity getter=clamp(2.5*(ior-1)/(ior+1),0,1)，setter 反算 ior。薄膜 IOR=1.3、厚度范围[100,400]，clearcoatNormalScale=(1,1)、sheenColor黑、attenuationColor/specularColor白、attenuationDistance=Infinity；内部 anisotropy/clearcoat/dispersion/iridescence/sheen/transmission 初值0，maps 为null，最后 setValues。反射率不是独立存储字段。

### MeshPhysicalMaterial.method:copy

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:13914) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:39212) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:39212)

先 Standard.copy，重置两 define；通过公开属性赋 anisotropy/clearcoat/dispersion/iridescence/sheen/transmission（会走各 setter），复制 ior、厚度、衰减与 specular 标量。颜色与 clearcoatNormalScale 用 copy，iridescenceThicknessRange 展开成新数组，所有 map 共享引用。返回 this，不把整个物理材质字段统称深拷贝。

### MeshToonMaterial.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:13952) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:39738) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:39738)

TOON define、白 color、黑 emissive，新增 gradientMap=null；保留 map/lightMap/ao/emissive/bump/normal/displacement/alpha 贴图字段与强度/尺度，normalScale=(1,1)，fog=true、wireframe=false，最后 setValues。没有 Standard 的 roughness/metalness/envMap 参数系统。

### MeshMatcapMaterial.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14036) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:40984) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:40984)

MATCAP define，白 color，matcap 与 map/bump/normal/displacement/alphaMap 为null，切线空间法线与 normalScale=(1,1)，wireframe=false、flatShading=false、fog=true，setValues 应用参数。matcap 是引用而非生成的环境立方纹理。

### MeshMatcapMaterial.method:copy

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14042) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:41186) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:41186)

父类复制后重建 MATCAP define；color/normalScale 原位.copy，其余 matcap 和各贴图引用直接赋值，复制 bump/displacement、线宽、flatShading/fog 等标量，返回 this。不会克隆 matcap Texture。

## 关键帧与动画时间

### AnimationUtils.static:method:subclip

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14172) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:41764) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:41764)

克隆 sourceClip、改 name，逐轨选择 times*fps 在 [startFrame,endFrame) 的键，按 getValueSize 复制对应值，剔除没有键的轨道并保持原 times/values 构造类型。求所有首键最小时间，所有轨统一 shift 到该时间为0，再 resetDuration。返回新 clip，不改源；不在剪切边界插入补偿采样。

### AnimationUtils.static:method:makeClipAdditive

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14199) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:41780) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:41780)

原位修改 targetClip，referenceFrame/fps（fps<=0回退30）选参考时刻，按 name+ValueTypeName 匹配轨道，bool/string 跳过。越界用端点，否则插值参考值；GLTF cubic spline 跳过两侧切线槽。四元数参考先 normalize/conjugate，再左乘各目标四元数；数值减参考，最后设 AdditiveAnimationBlendMode 并返回 target。referenceClip 默认 target，调用会改变目标 values。

### Interpolant.method:evaluate

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14272) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:41879) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:41879)

维护 _cachedIndex；从缓存区间向前/后最多短扫，远跳再二分有序 parameterPositions。范围外复制首/末采样值，区间改变才 intervalChanged_，有效区间交给 interpolate_。返回复用 resultBuffer，不分配每帧结果；输入样本排序是前提。本地单字母 label 对应控制流跳转，不能因 label 名差异称为算法差异。

### BezierInterpolant.method:interpolate_

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14473) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:42358) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:42358)

输入右键索引、两端时间和请求时间；缺 in/outTangents 时按时间线性插值。每分量切线是控制点(time,value)对；以归一时间初值解 x(s)=t，最多8次 Newton，残差/导数阈值1e-10，每步 clamp s∈[0,1]，再以 cubic Bernstein 求 y。写复用 resultBuffer。没有二分兜底或保证任意非单调时间控制点收敛。

### KeyframeTrack.static:method:toJSON

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14529) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:42496) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:42496)

若具体构造器有自己的 toJSON 则委派；否则保存 name 及转换成普通 Array 的 times/values，插值非默认才保存 interpolation；最后补 ValueTypeName 为 type。返回对象，typed array 转换不是 JSON 字符串化。

### KeyframeTrack.method:setInterpolation

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14590) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:42606) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:42606)

枚举 Discrete/Linear/Smooth/Bezier 选实例插值工厂。不可用时，若还没工厂且请求非默认则递归设默认；默认也不支持时抛错，否则警告保留已有工厂。成功设 createInterpolant 并返回 this；不是立即创建插值器。

### KeyframeTrack.method:trim

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14655) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:42767) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:42767)

去掉 startTime 前、endTime 后的键，端点等于边界保留；times.slice 与 values 按 valueSize 切片。若区间空，强制至少保留一个键（已有轨道的边界邻近项），避免产生空轨。返回 this，不将剩余时间归零，不生成边界插值键。

### KeyframeTrack.method:validate

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14670) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:42815) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:42815)

检查 values/time 个数比为整数、times 非空、时间数值不是 NaN且非降序；typed array 的 values 逐个检查 NaN。发现错误记录 error 并返回 false，否则 true。不要求严格递增、不拒绝 Infinity，也不是完整类型/维度 schema 验证。

### KeyframeTrack.method:optimize

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14701) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:42897) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:42897)

先复制 times/values，再用读写指针删除同一时间冗余键和中间连续相等值。Smooth 模式保留值相同的中间关键点以免改曲线；首尾规则单独保留最后键。按 stride 搬值、裁掉尾部，赋回新的数组，返回 this，不修改调用前数组本体。

### KeyframeTrack.method:clone

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14741) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:43015) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:43015)

times/values 分别.slice，新建 this.constructor(name,times,values)，再保留源 createInterpolant 工厂引用。返回新具体轨道，不只是基类；构造器的其他附加自定义状态不在这里统一复制。

### AnimationClip.static:method:toJSON

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14920) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:43459) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:43459)

保存 name/duration/uuid/blendMode 与逐轨 KeyframeTrack.toJSON；userData 特别用 JSON.stringify 写成字符串。返回对象而非完整 JSON 文本；不能把 userData 描述成直接共享对象。

### AnimationClip.static:method:CreateFromMorphTargetSequence

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14935) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:43499) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:43499)

每个 morph 名创建权重轨道，循环前一/本/后一帧权重0/1/0，先按时间排序；允许循环且首时间0时补 numMorphTargets 帧首值，再 scale(1/fps) 从帧变秒。轨道路径是 .morphTargetInfluences[name]，新 clip duration=-1 由构造计算；不插入网格或 morph 几何数据。

### AnimationClip.method:resetDuration

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14973) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:43639) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:43639)

从0开始取每个轨道最后 times 项的最大值，写 this.duration 并返回 this。依赖轨道时间有序非空；不是扫描全部键，空轨可能传播 NaN。

## 加载、资源重建与相机

### LoadingManager.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:15088) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:43966) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:43966)

闭包维护 isLoading/loaded/total、URL modifier 和正则/loader 成对数组。itemStart 增总数且首项触发 onStart；itemEnd 增完成数、报 progress，完成等总数触发 onLoad；itemError 只通知。resolveURL 先 normalize NFC 再 modifier。getHandler 重置 global 正则 lastIndex；abort 取消惰性 controller 并清缓存。这里加载批次数累计，不是每次 onLoad 后把计数清零。

### FileLoader.method:load

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:15256) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:44565) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:44565)

path 拼接后经 manager.resolveURL；file: 缓存命中异步 setTimeout 回调，正在请求同 URL 则合并回调队列。新 Request 带 headers/credentials，支持时合并本 loader 与 manager 的 abort signals。fetch 只接受200/0；可读流逐块累计字节，Content-Length/X-File-Size 作总数，广播 ProgressEvent。responseType 转 arraybuffer/blob/document/json 或指定 charset 的文本；成功缓存、删队列、广播 onLoad，失败广播 onError并通知 manager，finally itemEnd。返回 undefined，不把 Promise 作为此接口的返回值。

### ImageLoader.method:load

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:15517) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:45132) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:45132)

image: 缓存完整图用异步回调，未完成的缓存图用 WeakMap 合并回调并返回同 img。新建 img、安装 load/error，非 data URL 才设 crossOrigin，缓存后 itemStart 再设 src；成功清监听、广播并 itemEnd，失败还删除缓存/报 itemError。onProgress 参数未参与图片进度。函数返回 HTMLImageElement，不返回解码后的像素。

### LightShadow.method:toJSON

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:15817) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:46067) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:46067)

仅写非默认 intensity/bias/normalBias/radius/mapSize；camera.toJSON(false).object 后删除 camera.matrix。返回轻量配置，不保存 shadow map/render target 或实时 shadow 矩阵，不修改 camera 原实例。

### SpotLightShadow.method:updateMatrices

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:15973) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:46682) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:46682)

fov=2*RAD2DEG*light.angle*focus，aspect=mapSize.width/height*this.aspect，far=light.distance||camera.far；任一变化才更新投影，随后 super.updateMatrices 更新位置/方向与 shadow matrix。distance=0 表示沿用 far，不是将 far 设0；函数没有返回矩阵。

### MaterialLoader.static:method:createMaterialFromType

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:16395) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:48120) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:48120)

在内建材质构造器表后展开 _customMaterials，自定义键可覆盖内建。未知类型 warnOnce 并回退 new Material，已知无参构造对应类型；返回实例，尚未填 JSON 内容。

### LoaderUtils.static:method:resolveURL

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:16438) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:48209) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:48209)

非字符串/空 URL 返回空串；当 base 是 http(s) 且 URL 以 / 开头，先把 base 截到 origin。http(s)/协议相对、data:（匹配含逗号）、blob: 保持；其余直接 path+url。不是完整 new URL 归一化：不解析 ../、不替换所有协议。

### BufferGeometryLoader.method:parse

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:16498) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:48370) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:48370)

由 isInstancedBufferGeometry 选实例；还原 index typed array、普通/实例/交错 attributes、morphAttributes/name/usage/normalized。交错 buffer 与底层 ArrayBuffer 按 UUID 两级缓存，保留共享存储关系；序列化 words 经 Uint32Array(...).buffer 复原，再按声明 type 建 view。兼容 groups/drawcalls/offsets，恢复 sphere/name/userData与 morphTargetsRelative。返回 geometry，不计算缺失 normal 或 bounds，也不上传 GPU。

### ObjectLoader.method:loadAsync

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:16606) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:48617) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:48617)

确定 resourcePath（优先已有值，否则 this.path 或请求目录），配置 FileLoader 的 path/header/credentials，await 文本并 JSON.parse；坏 JSON 包装含 URL 错误，metadata 缺 type 或 type=geometry 拒绝，最终 await parseAsync。返回完整对象 Promise，区别于仅 callback 的 FileLoader.load。

### ObjectLoader.method:parseImages

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:16733) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:48909) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:48909)

字符串 URL 按 resourcePath 补相对路径，经 manager.resolveURL 与父 manager 的 itemStart/End 计数；独立 LoadingManager(onLoad)+ImageLoader 跟踪图完成。内嵌 data 对象重建 typed array/width/height；cube 数组将内嵌数据包装为 DataTexture，HTMLImageElement 保持。每 UUID 包成 Source，返回字典；字符串图片此时可仍在加载，不意味着像素已可用。

### ObjectLoader.method:parseTextures

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:16813) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:49123) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:49123)

按 Source.data 判断 CubeTexture、DataTexture 或 Texture，关联共享 Source 与 UUID。cube 六面或普通非空图标 needsUpdate；恢复 channel、UV变换、wrap/filter/mapping、像素type/format/colorSpace、mipmap/flipY/compare 等字段，历史字符串常量查表且警告。返回纹理字典；缺 Source 虽先 warn，但后续直接 source.data，未做可恢复 fallback。

### ObjectLoader.method:bindLightTargets

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:16964) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:49710) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:49710)

遍历对象树，只处理 directional/spot light，把 child.target 暂存的 UUID 用树内 getObjectByProperty 解成对象；找不到则 new Object3D。修补引用而非复制目标坐标，不自动 add fallback 到场景。

### StereoCamera.method:update

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:17149) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:50200) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:50200)

缓存 focus/fov/aspect*本身aspect/near/far/zoom/eyeSep，变化才重算左右非对称视锥，眼间距/2 给±X平移，投影偏移按 near/focus。每次都以相机 matrixWorld 乘对应眼平移写 cameraL/R.matrix，置 matrixWorldNeedsUpdate。此方法不渲染，两子相机的投影对象独立。

### CubeCamera.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:17165) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:50306) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:50306)

持有外部 renderTarget，创建六个 FOV=-90°、aspect=1、给定 near/far 的 PerspectiveCamera 子对象。六相机.layers 共享此 CubeCamera.layers，coordinateSystem=null、activeMipmapLevel=0；构造时尚未选定每面的方向，也不分配 renderTarget。

### CubeCamera.method:updateCoordinateSystem

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:17181) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:50364) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:50364)

复制 children 并暂时 remove，按六面次序设置 up/lookAt。WebGL±X/+Y/-Y/±Z 用上方+Y及极点±Z；WebGPU X方向互换、常规 up=-Y、极点符号相反。正常分支随后重新 add 并 updateMatrixWorld，暂时移除避免 lookAt 被父变换影响；非法系统在 remove 后抛错，六相机此时不会被重新 add，children 已改变。

### CubeCamera.method:update

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:17193) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:50437) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:50437)

同步坐标系统，保存 renderer 当前 target/cubeFace/mip/XR，禁用XR与前五面 mip 生成；每面设目标后渲染，reversed depth 且 autoClear=false 时单独 clearDepth。最后一面恢复 generateMipmaps以触发整立方纹理 mip，再还原目标/XR并标 needsPMREMUpdate。没有 try/finally，渲染抛错时此函数不保证状态恢复；正常路径不 dispose 外部 target。

## 音频、属性绑定与动作缓存

### Audio.method:pause

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:17420) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:51317) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:51317)

hasPlaybackControl=false 警告并返回 undefined；若播放中，把 max(currentTime-startedAt,0)*playbackRate 加入 _progress，循环按 duration||buffer.duration 取模。停止 source、清 onended、isPlaying=false，返回 this，保留进度供继续。非播放中不停止 source。

### Audio.method:stop

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:17425) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:51359) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:51359)

无控制权同样警告退出；进度归0，source 非null才在 currentTime+delay 调 stop并清 onended，立即设 isPlaying=false，返回 this。delay 影响真实声源停止时间，不推迟该对象状态修改。

### Audio.method:setPlaybackRate

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:17487) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:51552) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:51552)

无控制权退出；存 playbackRate，播放中对 AudioParam 用 setTargetAtTime(value,currentTime,.01) 平滑趋近。返回 this，不校验正负或重算已积累 _progress。

### Audio.method:setLoop

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:17505) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:51622) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:51622)

无控制权退出；存 loop，播放时同步 source.loop，否则只保留以供下次播放。返回 this；不会在此更改 loopStart/loopEnd 或进度。

### PropertyMixer.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:17754) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:52093) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:52093)

输入 binding、typeName、valueSize，四元数选 slerp/slerpAdditive 与单位四元数 identity，Float64Array 六区、workIndex=5；bool/string 用普通 Array 五区与选择函数；数值 Float64Array 五区与 lerp/加法。origIndex=3/addIndex=4，权重/使用/引用计数归0。buffer 的不同区保存输入、累积、原值和 additive，不是一个独立值数组。

### PropertyBinding.static:method:create

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:17884) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:52624) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:52624)

root 有 isAnimationObjectGroup 标志则返回 Composite，否则普通 PropertyBinding；path/parsedPath 透传。此处不强制 root 非null，也不自己解析或立刻写入目标。

### PropertyBinding.method:bind

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:17992) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:52947) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:52947)

找不到缓存 node 时从 root/path 寻找；先把 getter/setter 置 unavailable，缺节点/对象/属性报错后保持不可用。支持 materials、bones 按名转索引、map 在节点或材质上解析，普通 objectName/index 逐层访问。morphTargetInfluences 名称通过字典转索引；按直接值、数组元素、整个数组、fromArray/toArray 对象选四种 binding，按材质 needsUpdate或Object3D.matrixWorldNeedsUpdate选版本 setter。记录 target/resolvedProperty，不克隆目标。

### AnimationObjectGroup.method:add

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:18110) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:53350) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:53350)

维护 _objects 的缓存前缀 [0,nCachedObjects_) 与活跃后缀、UUID→索引以及每条 path 对齐 bindings。新对象追加并建绑定；缓存对象与最后缓存交换进入活跃区，缺绑定补建；发现重复 UUID 对象则 error。最终保存缓存界线。本地和官方都用 knownObject 临时变量参与重复检查，本文记录现状而不宣称逻辑完美。

### AnimationObjectGroup.method:uncache

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:18167) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:53497) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:53497)

永久删指定 UUID 的索引；缓存对象先与最后缓存交换，再把最后对象填入活跃边界，活跃对象直接以尾部 swap-pop。同步所有 bindings 数组与 UUID 反向表，减少 nCachedObjects_。不是仅把对象移进缓存，也不 dispose 场景对象。

### AnimationObjectGroup.method:unsubscribe_

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:18220) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:53625) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:53625)

查 path 的 binding 索引，将最后一组 bindings、parsedPaths、paths 填洞再 pop。特别是实际代码用参数 path[lastBindingsIndex] 更新索引表，不是 paths[lastBindingsIndex]，也没有在此 delete 原键；两版官方都有这个写法。不能把期望的正确缓存维护行为冒充实际行为，是否可触发错误仍需单独运行场景验证。

### AnimationAction.method:_update

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:18459) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:54216) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:54216)

disabled 时只更新权重；等待 startTime 时用 timeDirection 算是否到时，再乘有效 timeScale，得到 clipTime 与有效 weight。weight>0 才 evaluate 每轨 interpolant；Additive 调 accumulateAdditive，否则调用 accumulate(accuIndex,weight)。这里累加到 PropertyMixer，不直接 set 场景属性；mixer 后续统一 apply。

### AnimationAction.method:_updateTimeScale

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:18488) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:54331) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:54331)

paused 时有效速度0；否则 timeScale 乘可选 warp interpolant。过其末时刻，零速设 paused，非零可恢复 _restoreTimeScale 并存回 timeScale，stopWarping 释放控制插值器。写 _effectiveTimeScale 并返回标量；结束判定用严格大于末时间。

### AnimationAction.method:_updateTime

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:18500) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:54380) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:54380)

把 delta 加 this.time；delta=0 返回当前或奇数 pingpong 周期的镜像时间。LoopOnce 截到0/duration并 paused或disabled，发 finished(direction)。重复模式以 floor(time/duration) 跨任意多个圈、累计绝对次数，与 repetitions 比较；剩余1圈调整端点，发 loop(loopDelta)，耗尽发 finished。pingpong 奇数圈返回 duration-time，存储时间仍是圈内 time。没有替 duration=0 特设除零分支。

### AnimationAction.method:_setEndings

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:18549) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:54538) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:54538)

修改共享 _interpolantSettings.endingStart/End；pingpong 两端固定 ZeroSlope，普通模式的真实起止按 zeroSlopeAtStart/End 选 ZeroSlope/ZeroCurvature，循环内部用 WrapAround。仅配置插值边界，不改变动作时间。

### AnimationMixer.method:_removeInactiveAction

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:18674) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:54903) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:54903)

要求 action 已在 inactive 区。对全 actions 与 clip.knownActions 两级 swap-pop，并修被搬动作 _cacheIndex/_byClipCacheIndex；移除 root→action，空 clip 表删除，最后释放此 action 的 inactive bindings。动作本体留在外部仍可引用；不自动 stop 活跃动作。

### AnimationMixer.method:clipAction

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:18754) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:55149) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:55149)

按 optionalRoot或默认 root、clip 名/对象解析 UUID，blendMode 默认 clip值。相同 clip/root且模式相同返回缓存动作；可用 knownActions 首项为绑定原型，必要时从它取 clip。找不到 clip 返回null，否则 new AnimationAction，_bindAction、_addInactiveAction 后返回，尚未 play。

### AnimationMixer.method:existingAction

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:18771) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:55217) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:55217)

同样解析 root/clip查 actionsByClip.actionByRoot，返回已有或null；没有构造、绑定或激活副作用。只按 root/clip查，不带 blendMode 参数过滤。

### AnimationMixer.method:stopAllAction

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:18780) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:55244) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:55244)

从 _nActiveActions-1 向0遍历并 stop，避免 stop 的活跃区交换导致漏项；返回 mixer。不是遍历所有缓存 action，也不删除缓存对象。

### AnimationMixer.method:uncacheRoot

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:18831) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:55393) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:55393)

逐 clip 找此 root动作，先 deactivate 再 removeInactive；随后对该 root所有属性绑定 restoreOriginalState，再 removeInactiveBinding。恢复动画前值而不是 dispose root/geometry/material，其他 root 动作可继续共享同 clip。

## 线段、辅助图元、路径填充

### Line3.method:closestPointToPointParameter

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:19647) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:57251) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:57251)

返回 (end-start)·(point-start)/|end-start|²；零长度返回0，clampToLine 为真时夹到[0,1]。只给参数不写最近点，也不改变端点。

### Line3.method:distanceSqToLine3

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:19667) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:57298) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:57298)

两线段最近点解，长度平方<=1e-16 作退化，先处理两点/单点情况，其余解二元投影并将 s/t夹到[0,1]，平行分母0先取s=0再修边界。通常写 c1/c2为最近点并返回平方距离；两条都退化时实际把 c1减去c2，c1最终是差向量，这是代码可见的边界。默认输出是共享模块临时量。

### SkeletonHelper.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:19776) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:57616) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:57616)

递归收集 bones，仅 bone-parent也是Bone的边预留两个 position/color顶点。新 LineBasicMaterial 开 vertexColors、禁深度测/写与toneMapping、透明；root/bones保存引用，matrix直接引用root.matrixWorld，matrixAutoUpdate=false，端色蓝/绿。此时位置全0，后续 update才填骨骼端点。

### PointLightHelper.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:19842) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:57804) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:57804)

创建低分辨率 SphereGeometry(sphereSize,4,2)+wireframe MeshBasicMaterial，fog/toneMapped=false。保存 light和可选覆盖色，matrix共享light.matrixWorld、禁自动本地矩阵，立即 update同步颜色。构造拥有辅助几何/材质，不拥有被观察的light。

### GridHelper.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:19920) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:58031) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:58031)

size/divisions 决定XZ网格：每个刻度生成两条互相垂直线，中心刻度用color1，其余color2；顶点与颜色为新 Float32 attributes。材质vertexColors=true、toneMapped=false。奇数divisions没有整数中心刻度；无divisions=0保护。

### PolarGridHelper.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:19961) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:58109) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:58109)

XZ平面 radius，sectors>1才建中心到边的径向线，再建 rings个从外往内圆，每圆divisions段，交替两色。生成 position/color线段属性与不做toneMapping的顶点色材质；不是闭合索引圆，也不生成半径0的中心环。

### CameraHelper.method:update

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:20084) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:58559) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:58559)

复制被观察相机 projectionMatrixInverse 到共享临时 camera。near/far NDC z反深度为1/0，标准WebGL为-1/1、WebGPU为0/1，非法坐标抛错。setPoint 对近远角、中心、上方向箭头和十字反投影，并按pointMap更新所有重复顶点，position.needsUpdate=true；不更新被观察相机投影。

### Box3Helper.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:20174) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:58837) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:58837)

8个±1立方角与12条边（24个Uint16索引），新 line材质默认黄且toneMapped=false；保存外部box引用并计算辅助几何sphere。构造不把box尺寸烘焙进顶点，后续更新通过变换呈现范围。

### PlaneHelper.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:20203) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:58913) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:58913)

保存外部plane与size，创建XY平面的轮廓/法线线段以及两三角填充子Mesh。填充同色opacity=.2、transparent=true、depthWrite=false，两个材质toneMapped=false，各几何算sphere。构造只建标准形状，后续方向/位置更新从plane取值。

### AxesHelper.constructor:constructor

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:20295) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:59159) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:59159)

三条从原点到+X/+Y/+Z、长度size的线，端点分别红到橙、绿到黄绿、蓝到青渐变；新position/color属性与vertexColors线材质、toneMapped=false。这里保留官方诊断图元色，不是新spacelibre产品表面或品牌资产。

### ShapePath.method:toShapes

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:20389) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:59366) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:59366)

按userData.style.fillRule选nonzero（累计绕数非0）或evenodd（奇偶），未知警告回退。每subPath取点，少于3或面积0跳过；计算Box2、内部点、面积绝对值与方向；面积降序后寻找最近包含轮廓，累计winding，填充状态未改变的边界exclude。由容器outer/hole角色交替建立Shape与Path洞，曲线数组直接引用原subPath.curves。关键patch差异：0.185.0先 containsPoint(interiorPoint)，本地及0.185.1用 containsBox(子boundingBox)再做点在多边形测试；因此不能说两patch逐项相同。内部点先试盒中心，不在内则取水平交点前两项中点，不是通用复杂自交面片布尔求解。

### Controls.method:connect

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:20494) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:59654) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:59655)

undefined element只警告；有值时若旧domElement非null先disconnect，再存新元素。基类不安装事件监听器，也不限制元素具体DOM类型；返回undefined。

### TextureUtils.static:method:contain

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:20628) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:59934) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:59935)

图像有width时取width/height，否则图像比例1；与目标aspect比，调整repeat使一轴=1、另一轴>=1，offset=(1-repeat)/2居中，完整图像落入框内且边缘由wrapping行为决定。修改同一Texture的repeat/offset并返回，不生成新像素、不改wrap。

### TextureUtils.static:method:cover

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:20635) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:59949) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:59950)

同一比例比较，但将裁剪轴repeat设为<=1，offset居中，让框被图覆盖并裁掉超出部分。原位返回texture；没有非正aspect或image.height=0保护。

### TextureUtils.static:method:fill

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:20642) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:59961) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:59962)

把repeat=(1,1)、offset=(0,0)，返回同纹理；不改center/rotation/matrix，也不主动updateMatrix，因此称为“清除所有纹理变换”不准确。

## 未匹配顶层函数：按实际操作而非最近前缀理解

以下名称只用于定位当前本地函数。人工角色说明不能替代 matcher 的完整结构/作用域证明；尤其最近候选的“共同前缀”不是算法相同证据。

### helper:warn

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:300) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:1981) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:1981)

当前源码名称：`warn`；本节标题保留分析清单旧键。

先enhanceLogMessage处理参数、首项加THREE.前缀；自定义console hook存在则调用(level,message,...rest)，否则首剩余参数为StackTrace时getError(message)后console.warn，普通情况直接console.warn。返回undefined，不创建自定义错误异常。

### helper:error

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:308) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:2019) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:2019)

当前源码名称：`error`；本节标题保留分析清单旧键。

与warn的分派完全对应但level=error且console.error；它只记录而非throw，因此上层error后继续执行的分支必须按实际代码看，不能假设中断。

### helper:yieldToMain

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:321) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:2074) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:2074)

当前源码名称：`yieldToMain`；本节标题保留分析清单旧键。

存在self.scheduler.yield时直接返回它的Promise，否则new Promise由requestAnimationFrame resolve。不是setTimeout兜底；没有self时安全进入RAF兜底；若兜底环境也没有requestAnimationFrame则失败。本地使用属性!==undefined，官方使用typeof属性!==undefined，尚不宣称对所有宿主代理逐位等价。

### helper:probeAsync

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:327) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:2104) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:2104)

当前源码名称：`probeAsync`；本节标题保留分析清单旧键。

输入WebGL上下文、sync、轮询间隔。setTimeout后clientWaitSync(sync,SYNC_FLUSH_COMMANDS_BIT,0)，WAIT_FAILED reject（无错误值），TIMEOUT_EXPIRED再timeout，其余resolve。返回Promise；不自己deleteSync，没有超时总上限。

### helper:Dr

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:2588) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:6680) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:6680)

当前源码名称：`createColorManagement`；本节标题保留分析清单旧键。

角色对应createColorManagement工厂。返回可扩展spaces注册表，默认LinearSRGB工作空间；convert原位先sRGB解码，再需时toXYZ/fromXYZ转换，最后按目标transfer编码，disabled/同空间/缺空间名直接返回。内建REC709 primaries、D65白点、亮度系数；提供workingTo/colorSpaceTo、drawing/unpack配置查询与旧接口warnOnce代理。spaces的primaries以引用是否相同决定是否跳矩阵，不是逐元素比较；未知space未保护会报错。

### helper:ji

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:6387) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:16531) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:16531)

当前源码名称：`_generateTables`；本节标题保留分析清单旧键。

角色对应半浮点转换查表生成。共享4字节buffer的Float32/Uint32 view做位重解释，生成512项符号/指数base/shift表，2048项mantissa表与64项exponent/offset表。对极小指数映射有符号0、中间范围映射非正规/正规half、溢出映射Inf位模式，特殊指数保留尾数处理空间；返回这些数组/视图，不直接转换输入数。NaN/舍入的完整行为还需由调用者toHalfFloat/fromHalfFloat共同决定。

### helper:Ga

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:8611) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:23731) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:23731)

当前源码名称：`checkGeometryIntersection`；本节标题保留分析清单旧键。

角色对应checkGeometryIntersection，内部内联三角相交助手：object.getVertexPosition取三个可变形顶点，按BackSide反序/FrontSide背剔，局部交点转世界再near/far过滤。成功算barycoord，按属性插值uv/uv1/normal（normal朝射线反向），补face顶点索引/几何法线/materialIndex=0，返回命中对象或null。面法线及插值normal在局部坐标，point为世界坐标，不可混称全世界数据。

### helper:Fs

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:10049) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:28052) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:28052)

当前源码名称：`checkIntersection`；本节标题保留分析清单旧键。

角色对应Line的checkIntersection。按两个位置索引读线段，ray.distanceSqToSegment输出射线和线段最近点；距离平方>局部thresholdSq返回undefined。射线最近点转世界用于near/far距离，返回point则是线段最近点世界克隆，并带index/face:null/faceIndex:null/barycoord:null/object。

### helper:Zs

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:11359) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:31808) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:31808)

当前源码名称：`CubicPoly`；本节标题保留分析清单旧键。

角色对应CubicPoly闭包；四个系数初值0，init以端点及切线形成Hermite三次系数。initCatmullRom用tension*(邻点差)，非均匀模式按dt差商求切线并乘中间dt。calc(t)=c0+c1t+c2t²+c3t³。闭包每次init覆盖状态，不是无状态函数或三维向量。

### helper:ao

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:11464) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:32149) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:32149)

当前源码名称：`CatmullRom`；本节标题保留分析清单旧键。

角色对应标量CatmullRom，输入t与p0..p3，用半邻点差为两端切线，展开三次多项式求p1到p2插值。无状态、不clamp t；该函数与Zs的可配置tension工厂并非同一接口。

### helper:so

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:11471) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:32189) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:32189)

当前源码名称：`QuadraticBezier`；本节标题保留分析清单旧键。

实际为二次Bézier标量：(1-t)²p0+2(1-t)tp1+t²p2，三段基函数内联相加。报告最近候选damp不可信：这里没有指数衰减、时间步或目标速度。官方应对读QuadraticBezier及P0/P1/P2，而非给damp原名。

### helper:oo

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:11482) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:32234) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:32234)

当前源码名称：`CubicBezier`；本节标题保留分析清单旧键。

实际为三次Bézier：(1-t)³p0+3(1-t)²tp1+3(1-t)t²p2+t³p3，四个内联函数分别贡献控制点项。最近mapLinear候选错误，官方角色对应CubicBezier及四个P函数；无状态，不clamp t。

### helper:lo

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:12180) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:33922) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:33922)

当前源码名称：`earcut`；本节标题保留分析清单旧键。

角色对应earcut：平铺坐标data、洞的顶点索引holeIndices、dim默认2，建外轮廓循环链，洞按最左点排序桥接；不足三点返回空三角索引。data.length>80*dim时按外轮廓bbox将坐标缩放到0..32767的Morton范围，再po切耳。输出原顶点索引数组，修改的是新链表，不改输入坐标。

### helper:uo

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:12210) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:33962) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:33962)

当前源码名称：`linkedList`；本节标题保留分析清单旧键。

角色对应linkedList。按signedArea与要求clockwise决定正/逆序遍历坐标，以顶点序号i/dim|0建循环双链，尾首重合删除一项，返回尾节点。节点含prev/next供切耳修改，输入数组仍原样。

### helper:ho

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:12220) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:33980) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:33980)

当前源码名称：`filterPoints`；本节标题保留分析清单旧键。

角色对应filterPoints。从start到end循环，删除非steiner且与next重合或prev/当前/next面积0的节点，回退前一项重新检查，直至稳定或只剩一节点；返回更新后的end。修改链表连接，不输出独立点数组。

### helper:po

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:12234) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34004) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34004)

当前源码名称：`earcutLinked`；本节标题保留分析清单旧键。

角色对应earcutLinked。首轮可构建按Z顺序链表（内联indexCurve与归并排序），每次耳成立输出prev.i/current.i/next.i并removeNode，跳过下一点减少细长三角。完整绕一圈无耳时依次filterPoints、cureLocalIntersections、splitEarcut三种恢复pass。输出追加到传入triangles；递归切分而非返回新三角数组。

### helper:fo

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:12273) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34053) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34053)

当前源码名称：`isEar`；本节标题保留分析清单旧键。

角色对应isEar。area(prev,ear,next)>=0拒绝非凸耳，计算候选三角bbox，再扫描其他节点；落bbox且位于三角内并为反射/平角节点时拒绝，否则true。只判定不摘链，pointInTriangleExceptFirst避免首顶点重合判定问题。

### helper:mo

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:12296) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34080) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34080)

当前源码名称：`isEarHashed`；本节标题保留分析清单旧键。

角色对应isEarHashed，同凸性/点在三角检验，但以bbox的minZ/maxZ只走prevZ/nextZ范围，排除候选三角两端点。两侧同步走后处理剩余一侧；依赖Z链已建立。返回bool，不更改三角输出。

### helper:_o

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:12341) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34154) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34154)

当前源码名称：`splitEarcut`；本节标题保留分析清单旧键。

角色对应splitEarcut。枚举非相邻、不同原索引节点对，So验证对角线；splitPolygon分成两链，各filterPoints后递归po(pass0)。找到首条成功对角线即返回；不是所有对角线全枚举输出。

### helper:Ao

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:12356) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34201) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34201)

当前源码名称：`compareXYSlope`；本节标题保留分析清单旧键。

角色对应compareXYSlope排序比较器：先x差、再y差，同位置再比较到next的斜率。输入链节点，返回数值用于洞最左点排序；垂直边除零/同点NaN没有额外修复。

### helper:go

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:12364) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34217) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34217)

当前源码名称：`eliminateHole`；本节标题保留分析清单旧键。

实际对应eliminateHole，内部内联findHoleBridge。从洞最左点沿水平射线向左找最近外边交点，选可见候选并用切线斜率/locallyInside/sectorContainsSector细化桥端；无桥原样返回outer。splitPolygon复制桥端、拼接洞/外链，清两边共线点并返回过滤后桥节点。报告候选QuadraticBezierP0完全不描述这里的链表/几何操作。

### helper:yo

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:12404) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34363) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34363)

当前源码名称：`zOrder`；本节标题保留分析清单旧键。

实际对应zOrder。输入x,y,minX,minY,invSize，平移缩放后|0取32位整数，依次用0x00ff00ff、0x0f0f0f0f、0x33333333、0x55555555扩位，返回x|(y<<1)的Morton编码。用于空间排序；报告mapLinear候选仅共享算术前缀，不是完整角色。

### helper:So

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:12425) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34406) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34406)

当前源码名称：`isValidDiagonal`；本节标题保留分析清单旧键。

角色对应isValidDiagonal。排除相邻原索引，内联intersectsPolygon逐边拒绝交叉；要求两端locallyInside、中点射线法在多边形内且非退化方向，或允许重合节点且双方局部面积正的特例。返回布尔，没有在此切链。

### helper:xo

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:12453) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34424) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34424)

当前源码名称：`intersects`；本节标题保留分析清单旧键。

角色对应二维线段intersects。四次有符号面积取sign，普通情况两对方向异号即相交；四个共线分支用onSegment覆盖接触/重叠。返回布尔，使用精确0比较，无EPSILON容差。

### helper:Do

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:12481) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:34508) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:34508)

当前源码名称：`insertNode`；本节标题保留分析清单旧键。

角色对应insertNode。createNode(i,x,y)，有last就插在last与last.next之间并修四条链接；无last令prev/next都指自身。返回新节点，原轮廓链会改变，i只是原始顶点索引。

### helper:Yo

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:13632) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:37442) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:37442)

当前源码名称：`isUniqueEdge`；本节标题保留分析清单旧键。

角色对应isUniqueEdge。把start/end完整坐标字符串及反向字符串查Set；任一已存在返回false，否则两向都add并true。没有浮点round或几何距离容差，不以顶点索引判唯一。

### helper:Xo

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14073) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:41314) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:41314)

当前源码名称：`convertArray`；本节标题保留分析清单旧键。

实际对应convertArray：输入falsy或constructor===type直接返回原对象；目标type.BYTES_PER_ELEMENT为number时new type(array)，否则Array.prototype.slice.call复制普通数组。既可能共享也可能分配；最近copyArrayContents不描述该返回/分配语义。

### helper:jo

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14077) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:41334) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:41334)

当前源码名称：`getKeyframeOrder`；本节标题保留分析清单旧键。

实际对应getKeyframeOrder。创建0..times.length-1索引数组，再按times[i]-times[j]排序返回；times本身不排序、不删重。报告removeDupEndPts候选错误，无点相等或删除操作。

### helper:Qo

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:14096) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:41389) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:41389)

当前源码名称：`flattenJSON`；本节标题保留分析清单旧键。

角色对应flattenJSON。找首个带valuePropertyName的key，根据首值是数组、带toArray对象还是标量选展平方式；逐键只对该属性非undefined者追加key.time及值到传入times/values。返回undefined，修改输出数组；不会为缺值键插补样本，后续值类型假定与首值兼容。

### helper:Ko

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:15010) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:43791) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:43791)

当前源码名称：`parseKeyframeTrack`；本节标题保留分析清单旧键。

角色对应parseKeyframeTrack。type必需且大小写归一，将scalar/double/float/number/integer、vector2/3/4、color/quaternion/bool/string映射具体Track类；旧keys经Qo展平并写回json.times/values。类型构造器有parse就委派，否则new具体类(name,times,values,interpolation)。未知类型抛错，此函数会修改旧格式输入JSON。

### helper:$o

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:15061) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:43922) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:43922)

当前源码名称：`isBlobURL`；本节标题保留分析清单旧键。

角色对应isBlobURL：剥离缓存键首个冒号前缀，用new URL解析其余部分，protocol==='blob:'为true；任何解析异常false。不只是测试原字符串以blob:开头，因为输入可能file:blob:...缓存键。

### helper:qc

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:19138) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:56188) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:56188)

当前源码名称：`intersect`；本节标题保留分析清单旧键。

角色对应Raycaster递归intersect。对象layers匹配才调用raycast；raycast显式false阻止向children传播，否则recursive===true就遍历孩子。层不匹配只跳当前raycast，不自动跳孩子；向同intersects数组追加，不在这里排序。

### helper:getByteLength

来源：[本地](/C:/Users/stone/Documents/solarsystem/eyes/src/vendor/three/core.js:20508) · [0.185.0](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1850/package/build/three.core.js:59787) · [0.185.1](/C:/Users/stone/Documents/solarsystem/artifacts/upstream/r1851/package/build/three.core.js:59788)

当前源码名称：`getByteLength`；本节标题保留分析清单旧键。

输入width,height,format,type，先解type的字节数与打包components：byte1、short/half2、int/float4，4444/5551每2字节4分量，5999/101111每4字节3分量。普通Red/RG/RGB/RGBA按像素*通道/components*byteLength，Alpha特例仅width*height。DXT/ETC/EAC按4×4块8或16字节；ASTC按格式块宽高向上取整、每块16；PVRTC有最小宽高与2/4bpp；BPTC/RGTC按ceil4块。未知type/format抛错，无mip层、depth或行对齐计算，不是整个GPU纹理占用。

## 覆盖与明确边界

上述每个方法键各有独立语义条目：131/131；顶层未匹配函数33/33。不是仅保留“首差异”目录。方法按已知公开类/方法定位，helper角色则以本地完整操作与官方完整函数交叉阅读；so/oo/go/yo/Xo/jo明确纠正最近候选的误导。

仍未证明：这些保留方法及helper在所有副作用、宿主对象、代理/getter、异常、浮点舍入边界上的全量执行等价；局部原始词法名称、作者源码注释、原始构建仓库与 bundled准确patch。ShapePath明确有0.185.0/0.185.1真实差异，本地行为更接近后者的containsBox守卫，但不足以据单一方法判定全包patch。Audio/loader/WebGL同步等说明来自静态阅读，没有执行浏览器、音频、GPU或网络验证。

已暴露但未擅自修复的可疑边界：AnimationObjectGroup.unsubscribe_的path字符索引表更新、Line3两段均退化时输出c1成为差向量、parseTextures缺失Source后继续解引用、CubeCamera渲染异常未finally恢复。它们是可审查的实际操作，不是已复现产品缺陷；本任务只写此说明，不改变实现。
