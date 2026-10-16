# 第三方当前源码逐文件参考

当前 633 个文件。所有签名、行号、读写证据来自当前源码；[架构研究基线](vendor-architecture.md) 与 [实际语义进度](semantic-progress.json) 分开记录。完整短名、调用和反向依赖见 [总文档](README.md)。

## `eyes/src/vendor/modules/A11y.js`

提供 A11y、Autoplay、Controller、EffectCards、EffectCoverflow、EffectCreative、EffectCube、EffectFade、EffectFlip、FreeMode、Grid、HashNavigation、History、Keyboard、Lazy、Manipulation、Mousewheel、Navigation、Pagination、Parallax、Scrollbar、Swiper、Thumbs、Virtual、Zoom、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/A11y.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-A11y-js)

## `eyes/src/vendor/modules/Ci.js`

解析 KTX2 层级、DFD、键值和二进制纹理元数据。[源码](../../eyes/src/vendor/modules/Ci.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Ci-js)

### `Ci`

解析 KTX2 层级、DFD、键值和二进制纹理元数据。父类 `无`。

- `constructor(e, t, n, littleEndian)` [源码:276](../../eyes/src/vendor/modules/Ci.js#L276)：当前操作：写入 _dataView、_littleEndian、_offset；返回 无显式返回。
- `_nextUint8()` [源码:279](../../eyes/src/vendor/modules/Ci.js#L279)：源码方法 _nextUint8；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_nextUint16()` [源码:283](../../eyes/src/vendor/modules/Ci.js#L283)：源码方法 _nextUint16；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_nextUint32()` [源码:287](../../eyes/src/vendor/modules/Ci.js#L287)：源码方法 _nextUint32；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_nextUint64()` [源码:291](../../eyes/src/vendor/modules/Ci.js#L291)：源码方法 _nextUint64；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_nextInt32()` [源码:295](../../eyes/src/vendor/modules/Ci.js#L295)：源码方法 _nextInt32；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_nextUint8Array(offset)` [源码:299](../../eyes/src/vendor/modules/Ci.js#L299)：源码方法 _nextUint8Array；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_skip(offset)` [源码:303](../../eyes/src/vendor/modules/Ci.js#L303)：源码方法 _skip；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_scan(e, t=0)` [源码:306](../../eyes/src/vendor/modules/Ci.js#L306)：源码方法 _scan；作用以类职责与源码实现为准，未猜测压缩参数含义

## `eyes/src/vendor/modules/CopyShader.js`

提供 CopyShader；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/CopyShader.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-CopyShader-js)

## `eyes/src/vendor/modules/D2R.js`

提供 D2R、EPSLN、FORTPI、HALF_PI、PJD_3PARAM、PJD_7PARAM、PJD_GRIDSHIFT、PJD_NODATUM、PJD_WGS84、R2D、RA4、RA6、SEC_TO_RAD、SIXTH、SPI、SRS_WGS84_ESQUARED、SRS_WGS84_SEMIMAJOR、SRS_WGS84_SEMIMINOR、TWO_PI；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/D2R.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-D2R-js)

## `eyes/src/vendor/modules/DRACOLoader.js`

DRACOLoader 对应资源的请求、解析与缓存协作。[源码](../../eyes/src/vendor/modules/DRACOLoader.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-DRACOLoader-js)

### `DRACOLoader`

DRACOLoader 对应资源的请求、解析与缓存协作。父类 `ThreeCore.Loader`。

- `constructor(e)` [源码:17](../../eyes/src/vendor/modules/DRACOLoader.js#L17)：当前操作：写入 decoderBinary、decoderConfig、decoderPaths、decoderPending、defaultAttributeIDs、defaultAttributeTypes、workerLimit、workerNextTaskID、workerPool、workerSourceURL；返回 无显式返回。
- `setDecoderPath(e)` [源码:34](../../eyes/src/vendor/modules/DRACOLoader.js#L34)：源码方法 setDecoderPath；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setDecoderConfig(decoderConfig)` [源码:40](../../eyes/src/vendor/modules/DRACOLoader.js#L40)：源码方法 setDecoderConfig；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setWorkerLimit(workerLimit)` [源码:43](../../eyes/src/vendor/modules/DRACOLoader.js#L43)：源码方法 setWorkerLimit；作用以类职责与源码实现为准，未猜测压缩参数含义
- `load(e, t, n, i)` [源码:46](../../eyes/src/vendor/modules/DRACOLoader.js#L46)：发起异步资源获取并交给解析路径；管理加载器回调和错误传播
- `parse(e, t, n=()=>{})` [源码:52](../../eyes/src/vendor/modules/DRACOLoader.js#L52)：把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调
- `decodeDracoFile(e, t, n, i, a=ThreeCore.LinearSRGBColorSpace, s=()=>{})` [源码:55](../../eyes/src/vendor/modules/DRACOLoader.js#L55)：源码方法 decodeDracoFile；作用以类职责与源码实现为准，未猜测压缩参数含义
- `decodeGeometry(e, t)` [源码:64](../../eyes/src/vendor/modules/DRACOLoader.js#L64)：源码方法 decodeGeometry；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_createGeometry(e)` [源码:92](../../eyes/src/vendor/modules/DRACOLoader.js#L92)：源码方法 _createGeometry；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_assignVertexColorSpace(e, t)` [源码:112](../../eyes/src/vendor/modules/DRACOLoader.js#L112)：源码方法 _assignVertexColorSpace；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_loadLibrary(e, t)` [源码:117](../../eyes/src/vendor/modules/DRACOLoader.js#L117)：源码方法 _loadLibrary；作用以类职责与源码实现为准，未猜测压缩参数含义
- `preload()` [源码:123](../../eyes/src/vendor/modules/DRACOLoader.js#L123)：源码方法 preload；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_initDecoder()` [源码:126](../../eyes/src/vendor/modules/DRACOLoader.js#L126)：源码方法 _initDecoder；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_getWorker(e, t)` [源码:145](../../eyes/src/vendor/modules/DRACOLoader.js#L145)：源码方法 _getWorker；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_releaseTask(e, t)` [源码:172](../../eyes/src/vendor/modules/DRACOLoader.js#L172)：源码方法 _releaseTask；作用以类职责与源码实现为准，未猜测压缩参数含义
- `debug()` [源码:175](../../eyes/src/vendor/modules/DRACOLoader.js#L175)：源码方法 debug；作用以类职责与源码实现为准，未猜测压缩参数含义
- `dispose()` [源码:178](../../eyes/src/vendor/modules/DRACOLoader.js#L178)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

## `eyes/src/vendor/modules/DisplayP3ColorSpace.js`

提供 DisplayP3ColorSpace、DisplayP3ColorSpaceImpl、ExtendedSRGBColorSpace、ExtendedSRGBColorSpaceImpl、LinearDisplayP3ColorSpace、LinearDisplayP3ColorSpaceImpl、LinearRec2020ColorSpace、LinearRec2020ColorSpaceImpl；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/DisplayP3ColorSpace.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-DisplayP3ColorSpace-js)

## `eyes/src/vendor/modules/Dom7.js`

提供链式 DOM 集合查询、样式、事件和节点操作。[源码](../../eyes/src/vendor/modules/Dom7.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Dom7-js)

### `Dom7`

提供链式 DOM 集合查询、样式、事件和节点操作。父类 `Array`。

- `constructor(e)` [源码:5](../../eyes/src/vendor/modules/Dom7.js#L5)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/vendor/modules/Dom7Entry.js`

将 DOM 方法装配到 Dom7 原型并导出查询入口。[源码](../../eyes/src/vendor/modules/Dom7Entry.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Dom7Entry-js)

## `eyes/src/vendor/modules/EQUIT.js`

提供 EQUIT、N_POLE、OBLIQ、S_POLE、forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/EQUIT.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-EQUIT-js)

## `eyes/src/vendor/modules/Easing.js`

Tween 插值动画工具 18.6.4：Easing 缓动族、Tween 状态、Group 更新、Interpolation 路径插值和递增 Sequence；并非仅缓动函数。[源码](../../eyes/src/vendor/modules/Easing.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Easing-js)

## `eyes/src/vendor/modules/EffectComposer.js`

串联后处理通道并在双渲染目标之间交换读写缓冲。[源码](../../eyes/src/vendor/modules/EffectComposer.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-EffectComposer-js)

### `EffectComposer`

串联后处理通道并在双渲染目标之间交换读写缓冲。父类 `无`。

- `constructor(renderer, renderTarget1)` [源码:7](../../eyes/src/vendor/modules/EffectComposer.js#L7)：当前操作：写入 _height、_pixelRatio、_width、copyPass、copyPass.material.blending、passes、readBuffer、renderTarget1、renderTarget2、renderTarget2.texture.name、renderToScreen、renderer、timer、writeBuffer；返回 无显式返回。
- `swapBuffers()` [源码:16](../../eyes/src/vendor/modules/EffectComposer.js#L16)：源码方法 swapBuffers；作用以类职责与源码实现为准，未猜测压缩参数含义
- `addPass(e)` [源码:20](../../eyes/src/vendor/modules/EffectComposer.js#L20)：源码方法 addPass；作用以类职责与源码实现为准，未猜测压缩参数含义
- `insertPass(e, t)` [源码:23](../../eyes/src/vendor/modules/EffectComposer.js#L23)：源码方法 insertPass；作用以类职责与源码实现为准，未猜测压缩参数含义
- `removePass(e)` [源码:26](../../eyes/src/vendor/modules/EffectComposer.js#L26)：源码方法 removePass；作用以类职责与源码实现为准，未猜测压缩参数含义
- `isLastEnabledPass(e)` [源码:30](../../eyes/src/vendor/modules/EffectComposer.js#L30)：源码方法 isLastEnabledPass；作用以类职责与源码实现为准，未猜测压缩参数含义
- `render(e)` [源码:34](../../eyes/src/vendor/modules/EffectComposer.js#L34)：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定
- `reset(renderTarget1)` [源码:54](../../eyes/src/vendor/modules/EffectComposer.js#L54)：源码方法 reset；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setSize(width, height)` [源码:61](../../eyes/src/vendor/modules/EffectComposer.js#L61)：更新像素尺寸及关联目标；后处理链需要同步所有通道
- `setPixelRatio(pixelRatio)` [源码:68](../../eyes/src/vendor/modules/EffectComposer.js#L68)：源码方法 setPixelRatio；作用以类职责与源码实现为准，未猜测压缩参数含义
- `dispose()` [源码:71](../../eyes/src/vendor/modules/EffectComposer.js#L71)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

## `eyes/src/vendor/modules/FollowName.cjs`

将对应压缩时区 JSON 加载进 Moment Timezone 实例并导出该实例。[源码](../../eyes/src/vendor/modules/FollowName.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-FollowName-cjs)

## `eyes/src/vendor/modules/GLTFLoader.js`

GLTFLoader 对应资源的请求、解析与缓存协作；glTF Lights 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsUnlit 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsEmissiveStrength 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsClearcoat 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsDispersion 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsIridescence 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsSheen 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsTransmission 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsVolume 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsIor 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsSpecular 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsBump 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsAnisotropy 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF TextureBasisU 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF TextureWebP 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF TextureAVIF 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MeshoptCompression 解析、缓存或插值组件；glTF MeshGpuInstancing 解析、缓存或插值组件；glTF Binary 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF DracoMeshCompression 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF TextureTransform 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MeshQuantization 扩展处理器；将扩展字段映射到 Three 对象或材质；GLTFCubicSpline 插值算法；对关键帧区间求连续或离散值；GLTFCubicSplineQuaternion 插值算法；对关键帧区间求连续或离散值；glTF Parser 解析、缓存或插值组件。[源码](../../eyes/src/vendor/modules/GLTFLoader.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-GLTFLoader-js)

### `GLTFLoader`

GLTFLoader 对应资源的请求、解析与缓存协作。父类 `ThreeCore.Loader`。

- `constructor(e)` [源码:6](../../eyes/src/vendor/modules/GLTFLoader.js#L6)：当前操作：写入 dracoLoader、ktx2Loader、meshoptDecoder、pluginCallbacks；返回 无显式返回。
- `load(e, t, n, i)` [源码:45](../../eyes/src/vendor/modules/GLTFLoader.js#L45)：发起异步资源获取并交给解析路径；管理加载器回调和错误传播
- `setDRACOLoader(dracoLoader)` [源码:67](../../eyes/src/vendor/modules/GLTFLoader.js#L67)：源码方法 setDRACOLoader；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setKTX2Loader(ktx2Loader)` [源码:70](../../eyes/src/vendor/modules/GLTFLoader.js#L70)：源码方法 setKTX2Loader；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setMeshoptDecoder(meshoptDecoder)` [源码:73](../../eyes/src/vendor/modules/GLTFLoader.js#L73)：源码方法 setMeshoptDecoder；作用以类职责与源码实现为准，未猜测压缩参数含义
- `register(e)` [源码:76](../../eyes/src/vendor/modules/GLTFLoader.js#L76)：源码方法 register；作用以类职责与源码实现为准，未猜测压缩参数含义
- `unregister(e)` [源码:79](../../eyes/src/vendor/modules/GLTFLoader.js#L79)：源码方法 unregister；作用以类职责与源码实现为准，未猜测压缩参数含义
- `parse(e, t, n, r)` [源码:82](../../eyes/src/vendor/modules/GLTFLoader.js#L82)：把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调
- `parseAsync(e, t)` [源码:133](../../eyes/src/vendor/modules/GLTFLoader.js#L133)：源码方法 parseAsync；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFLightsExtension`

glTF Lights 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:187](../../eyes/src/vendor/modules/GLTFLoader.js#L187)：当前操作：写入 cache、name、parser；返回 无显式返回。
- `_markDefs()` [源码:193](../../eyes/src/vendor/modules/GLTFLoader.js#L193)：源码方法 _markDefs；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_loadLight(e)` [源码:201](../../eyes/src/vendor/modules/GLTFLoader.js#L201)：源码方法 _loadLight；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getDependency(e, t)` [源码:227](../../eyes/src/vendor/modules/GLTFLoader.js#L227)：源码方法 getDependency；作用以类职责与源码实现为准，未猜测压缩参数含义
- `createNodeAttachment(e)` [源码:230](../../eyes/src/vendor/modules/GLTFLoader.js#L230)：源码方法 createNodeAttachment；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFMaterialsUnlitExtension`

glTF MaterialsUnlit 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor()` [源码:241](../../eyes/src/vendor/modules/GLTFLoader.js#L241)：当前操作：写入 name；返回 无显式返回。
- `getMaterialType()` [源码:244](../../eyes/src/vendor/modules/GLTFLoader.js#L244)：源码方法 getMaterialType；作用以类职责与源码实现为准，未猜测压缩参数含义
- `extendParams(e, t, n)` [源码:247](../../eyes/src/vendor/modules/GLTFLoader.js#L247)：源码方法 extendParams；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFMaterialsEmissiveStrengthExtension`

glTF MaterialsEmissiveStrength 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:262](../../eyes/src/vendor/modules/GLTFLoader.js#L262)：当前操作：写入 name、parser；返回 无显式返回。
- `extendMaterialParams(e, t)` [源码:265](../../eyes/src/vendor/modules/GLTFLoader.js#L265)：源码方法 extendMaterialParams；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFMaterialsClearcoatExtension`

glTF MaterialsClearcoat 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:271](../../eyes/src/vendor/modules/GLTFLoader.js#L271)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(e)` [源码:274](../../eyes/src/vendor/modules/GLTFLoader.js#L274)：源码方法 getMaterialType；作用以类职责与源码实现为准，未猜测压缩参数含义
- `extendMaterialParams(e, t)` [源码:277](../../eyes/src/vendor/modules/GLTFLoader.js#L277)：源码方法 extendMaterialParams；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFMaterialsDispersionExtension`

glTF MaterialsDispersion 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:289](../../eyes/src/vendor/modules/GLTFLoader.js#L289)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(e)` [源码:292](../../eyes/src/vendor/modules/GLTFLoader.js#L292)：源码方法 getMaterialType；作用以类职责与源码实现为准，未猜测压缩参数含义
- `extendMaterialParams(e, t)` [源码:295](../../eyes/src/vendor/modules/GLTFLoader.js#L295)：源码方法 extendMaterialParams；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFMaterialsIridescenceExtension`

glTF MaterialsIridescence 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:301](../../eyes/src/vendor/modules/GLTFLoader.js#L301)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(e)` [源码:304](../../eyes/src/vendor/modules/GLTFLoader.js#L304)：源码方法 getMaterialType；作用以类职责与源码实现为准，未猜测压缩参数含义
- `extendMaterialParams(e, t)` [源码:307](../../eyes/src/vendor/modules/GLTFLoader.js#L307)：源码方法 extendMaterialParams；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFMaterialsSheenExtension`

glTF MaterialsSheen 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:315](../../eyes/src/vendor/modules/GLTFLoader.js#L315)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(e)` [源码:318](../../eyes/src/vendor/modules/GLTFLoader.js#L318)：源码方法 getMaterialType；作用以类职责与源码实现为准，未猜测压缩参数含义
- `extendMaterialParams(e, t)` [源码:321](../../eyes/src/vendor/modules/GLTFLoader.js#L321)：源码方法 extendMaterialParams；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFMaterialsTransmissionExtension`

glTF MaterialsTransmission 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:333](../../eyes/src/vendor/modules/GLTFLoader.js#L333)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(e)` [源码:336](../../eyes/src/vendor/modules/GLTFLoader.js#L336)：源码方法 getMaterialType；作用以类职责与源码实现为准，未猜测压缩参数含义
- `extendMaterialParams(e, t)` [源码:339](../../eyes/src/vendor/modules/GLTFLoader.js#L339)：源码方法 extendMaterialParams；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFMaterialsVolumeExtension`

glTF MaterialsVolume 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:347](../../eyes/src/vendor/modules/GLTFLoader.js#L347)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(e)` [源码:350](../../eyes/src/vendor/modules/GLTFLoader.js#L350)：源码方法 getMaterialType；作用以类职责与源码实现为准，未猜测压缩参数含义
- `extendMaterialParams(e, t)` [源码:353](../../eyes/src/vendor/modules/GLTFLoader.js#L353)：源码方法 extendMaterialParams；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFMaterialsIorExtension`

glTF MaterialsIor 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:363](../../eyes/src/vendor/modules/GLTFLoader.js#L363)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(e)` [源码:366](../../eyes/src/vendor/modules/GLTFLoader.js#L366)：源码方法 getMaterialType；作用以类职责与源码实现为准，未猜测压缩参数含义
- `extendMaterialParams(e, t)` [源码:369](../../eyes/src/vendor/modules/GLTFLoader.js#L369)：源码方法 extendMaterialParams；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFMaterialsSpecularExtension`

glTF MaterialsSpecular 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:375](../../eyes/src/vendor/modules/GLTFLoader.js#L375)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(e)` [源码:378](../../eyes/src/vendor/modules/GLTFLoader.js#L378)：源码方法 getMaterialType；作用以类职责与源码实现为准，未猜测压缩参数含义
- `extendMaterialParams(e, t)` [源码:381](../../eyes/src/vendor/modules/GLTFLoader.js#L381)：源码方法 extendMaterialParams；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFMaterialsBumpExtension`

glTF MaterialsBump 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:391](../../eyes/src/vendor/modules/GLTFLoader.js#L391)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(e)` [源码:394](../../eyes/src/vendor/modules/GLTFLoader.js#L394)：源码方法 getMaterialType；作用以类职责与源码实现为准，未猜测压缩参数含义
- `extendMaterialParams(e, t)` [源码:397](../../eyes/src/vendor/modules/GLTFLoader.js#L397)：源码方法 extendMaterialParams；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFMaterialsAnisotropyExtension`

glTF MaterialsAnisotropy 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:405](../../eyes/src/vendor/modules/GLTFLoader.js#L405)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(e)` [源码:408](../../eyes/src/vendor/modules/GLTFLoader.js#L408)：源码方法 getMaterialType；作用以类职责与源码实现为准，未猜测压缩参数含义
- `extendMaterialParams(e, t)` [源码:411](../../eyes/src/vendor/modules/GLTFLoader.js#L411)：源码方法 extendMaterialParams；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFTextureBasisUExtension`

glTF TextureBasisU 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:419](../../eyes/src/vendor/modules/GLTFLoader.js#L419)：当前操作：写入 name、parser；返回 无显式返回。
- `loadTexture(e)` [源码:422](../../eyes/src/vendor/modules/GLTFLoader.js#L422)：源码方法 loadTexture；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFTextureWebPExtension`

glTF TextureWebP 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:437](../../eyes/src/vendor/modules/GLTFLoader.js#L437)：当前操作：写入 name、parser；返回 无显式返回。
- `loadTexture(e)` [源码:440](../../eyes/src/vendor/modules/GLTFLoader.js#L440)：源码方法 loadTexture；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFTextureAVIFExtension`

glTF TextureAVIF 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:457](../../eyes/src/vendor/modules/GLTFLoader.js#L457)：当前操作：写入 name、parser；返回 无显式返回。
- `loadTexture(e)` [源码:460](../../eyes/src/vendor/modules/GLTFLoader.js#L460)：源码方法 loadTexture；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFMeshoptCompression`

glTF MeshoptCompression 解析、缓存或插值组件。父类 `无`。

- `constructor(parser, name)` [源码:477](../../eyes/src/vendor/modules/GLTFLoader.js#L477)：当前操作：写入 name、parser；返回 无显式返回。
- `loadBufferView(e)` [源码:480](../../eyes/src/vendor/modules/GLTFLoader.js#L480)：源码方法 loadBufferView；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFMeshGpuInstancing`

glTF MeshGpuInstancing 解析、缓存或插值组件。父类 `无`。

- `constructor(parser)` [源码:509](../../eyes/src/vendor/modules/GLTFLoader.js#L509)：当前操作：写入 name、parser；返回 无显式返回。
- `createNodeMesh(e)` [源码:512](../../eyes/src/vendor/modules/GLTFLoader.js#L512)：源码方法 createNodeMesh；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFBinaryExtension`

glTF Binary 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(e)` [源码:548](../../eyes/src/vendor/modules/GLTFLoader.js#L548)：当前操作：写入 body、content、header、name；返回 无显式返回。

### `GLTFDracoMeshCompressionExtension`

glTF DracoMeshCompression 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(json, dracoLoader)` [源码:578](../../eyes/src/vendor/modules/GLTFLoader.js#L578)：当前操作：写入 dracoLoader、json、name；返回 无显式返回。
- `decodePrimitive(e, t)` [源码:582](../../eyes/src/vendor/modules/GLTFLoader.js#L582)：源码方法 decodePrimitive；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFTextureTransformExtension`

glTF TextureTransform 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor()` [源码:617](../../eyes/src/vendor/modules/GLTFLoader.js#L617)：当前操作：写入 name；返回 无显式返回。
- `extendTexture(e, t)` [源码:620](../../eyes/src/vendor/modules/GLTFLoader.js#L620)：源码方法 extendTexture；作用以类职责与源码实现为准，未猜测压缩参数含义

### `GLTFMeshQuantizationExtension`

glTF MeshQuantization 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor()` [源码:625](../../eyes/src/vendor/modules/GLTFLoader.js#L625)：当前操作：写入 name；返回 无显式返回。

### `GLTFCubicSplineInterpolant`

GLTFCubicSpline 插值算法；对关键帧区间求连续或离散值。父类 `ThreeCore.Interpolant`。

- `constructor(e, t, n, r)` [源码:630](../../eyes/src/vendor/modules/GLTFLoader.js#L630)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `copySampleValue_(e)` [源码:633](../../eyes/src/vendor/modules/GLTFLoader.js#L633)：源码方法 copySampleValue_；作用以类职责与源码实现为准，未猜测压缩参数含义
- `interpolate_(e, t, n, r)` [源码:641](../../eyes/src/vendor/modules/GLTFLoader.js#L641)：在当前时间区间执行特定插值算法

### `GLTFCubicSplineQuaternionInterpolant`

GLTFCubicSplineQuaternion 插值算法；对关键帧区间求连续或离散值。父类 `GLTFCubicSplineInterpolant`。

- `interpolate_(e, t, n, r)` [源码:669](../../eyes/src/vendor/modules/GLTFLoader.js#L669)：在当前时间区间执行特定插值算法

### `GLTFParser`

glTF Parser 解析、缓存或插值组件。父类 `无`。

- `constructor(json={}, options={})` [源码:805](../../eyes/src/vendor/modules/GLTFLoader.js#L805)：当前操作：写入 associations、cache、cameraCache、extensions、fileLoader、json、lightCache、meshCache、nodeCache、nodeNamesUsed、options、plugins、primitiveCache、sourceCache、textureCache、textureLoader；返回 无显式返回。
- `setExtensions(extensions)` [源码:828](../../eyes/src/vendor/modules/GLTFLoader.js#L828)：源码方法 setExtensions；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setPlugins(plugins)` [源码:831](../../eyes/src/vendor/modules/GLTFLoader.js#L831)：源码方法 setPlugins；作用以类职责与源码实现为准，未猜测压缩参数含义
- `parse(e, t)` [源码:834](../../eyes/src/vendor/modules/GLTFLoader.js#L834)：把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调
- `_markDefs()` [源码:862](../../eyes/src/vendor/modules/GLTFLoader.js#L862)：源码方法 _markDefs；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_addNodeRef(e, t)` [源码:875](../../eyes/src/vendor/modules/GLTFLoader.js#L875)：源码方法 _addNodeRef；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_getNodeRef(e, t, n)` [源码:878](../../eyes/src/vendor/modules/GLTFLoader.js#L878)：源码方法 _getNodeRef；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_invokeOne(e)` [源码:888](../../eyes/src/vendor/modules/GLTFLoader.js#L888)：源码方法 _invokeOne；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_invokeAll(e)` [源码:897](../../eyes/src/vendor/modules/GLTFLoader.js#L897)：源码方法 _invokeAll；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getDependency(e, t)` [源码:907](../../eyes/src/vendor/modules/GLTFLoader.js#L907)：源码方法 getDependency；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getDependencies(e)` [源码:966](../../eyes/src/vendor/modules/GLTFLoader.js#L966)：源码方法 getDependencies；作用以类职责与源码实现为准，未猜测压缩参数含义
- `loadBuffer(e)` [源码:977](../../eyes/src/vendor/modules/GLTFLoader.js#L977)：源码方法 loadBuffer；作用以类职责与源码实现为准，未猜测压缩参数含义
- `loadBufferView(e)` [源码:989](../../eyes/src/vendor/modules/GLTFLoader.js#L989)：源码方法 loadBufferView；作用以类职责与源码实现为准，未猜测压缩参数含义
- `loadAccessor(e)` [源码:997](../../eyes/src/vendor/modules/GLTFLoader.js#L997)：源码方法 loadAccessor；作用以类职责与源码实现为准，未猜测压缩参数含义
- `loadTexture(e)` [源码:1042](../../eyes/src/vendor/modules/GLTFLoader.js#L1042)：源码方法 loadTexture；作用以类职责与源码实现为准，未猜测压缩参数含义
- `loadTextureImage(e, t, n)` [源码:1054](../../eyes/src/vendor/modules/GLTFLoader.js#L1054)：源码方法 loadTextureImage；作用以类职责与源码实现为准，未猜测压缩参数含义
- `loadImageSource(e, t)` [源码:1072](../../eyes/src/vendor/modules/GLTFLoader.js#L1072)：源码方法 loadImageSource；作用以类职责与源码实现为准，未猜测压缩参数含义
- `assignTexture(e, t, n, r)` [源码:1104](../../eyes/src/vendor/modules/GLTFLoader.js#L1104)：源码方法 assignTexture；作用以类职责与源码实现为准，未猜测压缩参数含义
- `assignFinalMaterial(e)` [源码:1118](../../eyes/src/vendor/modules/GLTFLoader.js#L1118)：源码方法 assignFinalMaterial；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getMaterialType()` [源码:1141](../../eyes/src/vendor/modules/GLTFLoader.js#L1141)：源码方法 getMaterialType；作用以类职责与源码实现为准，未猜测压缩参数含义
- `loadMaterial(e)` [源码:1144](../../eyes/src/vendor/modules/GLTFLoader.js#L1144)：源码方法 loadMaterial；作用以类职责与源码实现为准，未猜测压缩参数含义
- `createUniqueName(e)` [源码:1184](../../eyes/src/vendor/modules/GLTFLoader.js#L1184)：源码方法 createUniqueName；作用以类职责与源码实现为准，未猜测压缩参数含义
- `loadGeometries(e)` [源码:1188](../../eyes/src/vendor/modules/GLTFLoader.js#L1188)：源码方法 loadGeometries；作用以类职责与源码实现为准，未猜测压缩参数含义
- `loadMesh(e)` [源码:1212](../../eyes/src/vendor/modules/GLTFLoader.js#L1212)：源码方法 loadMesh；作用以类职责与源码实现为准，未猜测压缩参数含义
- `loadCamera(e)` [源码:1251](../../eyes/src/vendor/modules/GLTFLoader.js#L1251)：源码方法 loadCamera；作用以类职责与源码实现为准，未猜测压缩参数含义
- `loadSkin(e)` [源码:1258](../../eyes/src/vendor/modules/GLTFLoader.js#L1258)：源码方法 loadSkin；作用以类职责与源码实现为准，未猜测压缩参数含义
- `loadAnimation(e)` [源码:1278](../../eyes/src/vendor/modules/GLTFLoader.js#L1278)：源码方法 loadAnimation；作用以类职责与源码实现为准，未猜测压缩参数含义
- `createNodeMesh(e)` [源码:1319](../../eyes/src/vendor/modules/GLTFLoader.js#L1319)：源码方法 createNodeMesh；作用以类职责与源码实现为准，未猜测压缩参数含义
- `loadNode(e)` [源码:1330](../../eyes/src/vendor/modules/GLTFLoader.js#L1330)：源码方法 loadNode；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_loadNodeShallow(e)` [源码:1354](../../eyes/src/vendor/modules/GLTFLoader.js#L1354)：源码方法 _loadNodeShallow；作用以类职责与源码实现为准，未猜测压缩参数含义
- `loadScene(e)` [源码:1389](../../eyes/src/vendor/modules/GLTFLoader.js#L1389)：源码方法 loadScene；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_createAnimationTracks(e, t, n, i, a)` [源码:1413](../../eyes/src/vendor/modules/GLTFLoader.js#L1413)：源码方法 _createAnimationTracks；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_getArrayFromAccessor(e)` [源码:1443](../../eyes/src/vendor/modules/GLTFLoader.js#L1443)：源码方法 _getArrayFromAccessor；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_createCubicSplineTrackInterpolant(e)` [源码:1453](../../eyes/src/vendor/modules/GLTFLoader.js#L1453)：源码方法 _createCubicSplineTrackInterpolant；作用以类职责与源码实现为准，未猜测压缩参数含义

## `eyes/src/vendor/modules/KTX2Loader.js`

KTX2Loader 对应资源的请求、解析与缓存协作。[源码](../../eyes/src/vendor/modules/KTX2Loader.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-KTX2Loader-js)

### `KTX2Loader`

KTX2Loader 对应资源的请求、解析与缓存协作。父类 `ThreeCore.Loader`。

- `constructor(e)` [源码:15](../../eyes/src/vendor/modules/KTX2Loader.js#L15)：当前操作：写入 transcoderBinary、transcoderPath、transcoderPending、workerConfig、workerPool、workerSourceURL；返回 无显式返回。
- `setTranscoderPath(transcoderPath)` [源码:18](../../eyes/src/vendor/modules/KTX2Loader.js#L18)：源码方法 setTranscoderPath；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setWorkerLimit(e)` [源码:21](../../eyes/src/vendor/modules/KTX2Loader.js#L21)：源码方法 setWorkerLimit；作用以类职责与源码实现为准，未猜测压缩参数含义
- `detectSupportAsync(e)` [源码:24](../../eyes/src/vendor/modules/KTX2Loader.js#L24)：源码方法 detectSupportAsync；作用以类职责与源码实现为准，未猜测压缩参数含义
- `detectSupport(e)` [源码:27](../../eyes/src/vendor/modules/KTX2Loader.js#L27)：源码方法 detectSupport；作用以类职责与源码实现为准，未猜测压缩参数含义
- `init()` [源码:46](../../eyes/src/vendor/modules/KTX2Loader.js#L46)：初始化延迟资源和运行时能力；必须先完成再使用依赖资源的方法
- `load(e, t, n, i)` [源码:68](../../eyes/src/vendor/modules/KTX2Loader.js#L68)：发起异步资源获取并交给解析路径；管理加载器回调和错误传播
- `parse(e, t, n)` [源码:75](../../eyes/src/vendor/modules/KTX2Loader.js#L75)：把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调
- `_createTextureFrom(e, t)` [源码:82](../../eyes/src/vendor/modules/KTX2Loader.js#L82)：源码方法 _createTextureFrom；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_createTexture(e, t={})` [源码:103](../../eyes/src/vendor/modules/KTX2Loader.js#L103)：源码方法 _createTexture；作用以类职责与源码实现为准，未猜测压缩参数含义
- `dispose()` [源码:153](../../eyes/src/vendor/modules/KTX2Loader.js#L153)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

## `eyes/src/vendor/modules/KeyStore.js`

规范化 Fuse 搜索字段的路径、权重和键标识；构建并维护字符串/对象的 Fuse 搜索索引；使用位运算的 Bitap 模糊匹配与阈值评分；扩展搜索匹配器的模式存储基类；扩展搜索中的模糊模式匹配；扩展搜索中的包含模式匹配；解析扩展搜索语法并组合多条件匹配；以索引和评分规则执行加权模糊搜索。[源码](../../eyes/src/vendor/modules/KeyStore.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-KeyStore-js)

### `KeyStore`

规范化 Fuse 搜索字段的路径、权重和键标识。父类 `无`。

- `constructor(e)` [源码:30](../../eyes/src/vendor/modules/KeyStore.js#L30)：当前操作：写入 _keyMap、_keyMap[n.id]、_keys；返回 无显式返回。
- `get(e)` [源码:40](../../eyes/src/vendor/modules/KeyStore.js#L40)：源码方法 get；作用以类职责与源码实现为准，未猜测压缩参数含义
- `keys()` [源码:43](../../eyes/src/vendor/modules/KeyStore.js#L43)：源码方法 keys；作用以类职责与源码实现为准，未猜测压缩参数含义
- `toJSON()` [源码:46](../../eyes/src/vendor/modules/KeyStore.js#L46)：序列化资源和引用；共享资源通过元数据缓存去重

### `FuseIndex`

构建并维护字符串/对象的 Fuse 搜索索引。父类 `无`。

- `constructor({getFn=m.getFn,fieldNormWeight:t=m.fieldNormWeight}={})` [源码:118](../../eyes/src/vendor/modules/KeyStore.js#L118)：当前操作：写入 getFn、isCreated、norm；返回 无显式返回。
- `setSources(docs=[])` [源码:139](../../eyes/src/vendor/modules/KeyStore.js#L139)：源码方法 setSources；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setIndexRecords(records=[])` [源码:142](../../eyes/src/vendor/modules/KeyStore.js#L142)：源码方法 setIndexRecords；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setKeys(keys=[])` [源码:145](../../eyes/src/vendor/modules/KeyStore.js#L145)：源码方法 setKeys；作用以类职责与源码实现为准，未猜测压缩参数含义
- `create()` [源码:150](../../eyes/src/vendor/modules/KeyStore.js#L150)：源码方法 create；作用以类职责与源码实现为准，未猜测压缩参数含义
- `add(e)` [源码:157](../../eyes/src/vendor/modules/KeyStore.js#L157)：源码方法 add；作用以类职责与源码实现为准，未猜测压缩参数含义
- `removeAt(e)` [源码:161](../../eyes/src/vendor/modules/KeyStore.js#L161)：源码方法 removeAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getValueForItemAtKeyId(e, t)` [源码:165](../../eyes/src/vendor/modules/KeyStore.js#L165)：源码方法 getValueForItemAtKeyId；作用以类职责与源码实现为准，未猜测压缩参数含义
- `size()` [源码:168](../../eyes/src/vendor/modules/KeyStore.js#L168)：源码方法 size；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_addString(e, t)` [源码:171](../../eyes/src/vendor/modules/KeyStore.js#L171)：源码方法 _addString；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_addObject(e, t)` [源码:180](../../eyes/src/vendor/modules/KeyStore.js#L180)：源码方法 _addObject；作用以类职责与源码实现为准，未猜测压缩参数含义
- `toJSON()` [源码:222](../../eyes/src/vendor/modules/KeyStore.js#L222)：序列化资源和引用；共享资源通过元数据缓存去重

### `BitapSearch`

使用位运算的 Bitap 模糊匹配与阈值评分。父类 `无`。

- `constructor(e, {location:t=m.location,threshold:n=m.threshold,distance:r=m.distance,includeMatches:i=m.includeMatches,findAllMatches:a=m.findAllMatches,minMatchCharLength:s=m.minMatchCharLength,isCaseSensitive:o=m.isCaseSensitive,ignoreLocation:c=m.ignoreLocation}={})` [源码:356](../../eyes/src/vendor/modules/KeyStore.js#L356)：当前操作：写入 chunks、options、pattern；返回 void。
- `searchIn(e)` [源码:395](../../eyes/src/vendor/modules/KeyStore.js#L395)：源码方法 searchIn；作用以类职责与源码实现为准，未猜测压缩参数含义

### `BaseMatch`

扩展搜索匹配器的模式存储基类。父类 `无`。

- `constructor(pattern)` [源码:446](../../eyes/src/vendor/modules/KeyStore.js#L446)：当前操作：写入 pattern；返回 无显式返回。
- `static isMultiMatch(e)` [源码:449](../../eyes/src/vendor/modules/KeyStore.js#L449)：源码方法 isMultiMatch；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static isSingleMatch(e)` [源码:452](../../eyes/src/vendor/modules/KeyStore.js#L452)：源码方法 isSingleMatch；作用以类职责与源码实现为准，未猜测压缩参数含义
- `search()` [源码:455](../../eyes/src/vendor/modules/KeyStore.js#L455)：源码方法 search；作用以类职责与源码实现为准，未猜测压缩参数含义

### `FuzzyMatch`

扩展搜索中的模糊模式匹配。父类 `BaseMatch`。

- `constructor(e, {location:t=m.location,threshold:n=m.threshold,distance:r=m.distance,includeMatches:i=m.includeMatches,findAllMatches:a=m.findAllMatches,minMatchCharLength:s=m.minMatchCharLength,isCaseSensitive:o=m.isCaseSensitive,ignoreLocation:c=m.ignoreLocation}={})` [源码:462](../../eyes/src/vendor/modules/KeyStore.js#L462)：当前操作：写入 _bitapSearch；返回 无显式返回。
- `static get type()` [源码:483](../../eyes/src/vendor/modules/KeyStore.js#L483)：只读返回 "fuzzy"；此 getter 不执行对应 setter 的写入或更新通知
- `static get multiRegex()` [源码:486](../../eyes/src/vendor/modules/KeyStore.js#L486)：只读返回 /^"(.*)"$/；此 getter 不执行对应 setter 的写入或更新通知
- `static get singleRegex()` [源码:489](../../eyes/src/vendor/modules/KeyStore.js#L489)：只读返回 /^(.*)$/；此 getter 不执行对应 setter 的写入或更新通知
- `search(e)` [源码:492](../../eyes/src/vendor/modules/KeyStore.js#L492)：源码方法 search；作用以类职责与源码实现为准，未猜测压缩参数含义

### `IncludeMatch`

扩展搜索中的包含模式匹配。父类 `BaseMatch`。

- `constructor(e)` [源码:497](../../eyes/src/vendor/modules/KeyStore.js#L497)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static get type()` [源码:500](../../eyes/src/vendor/modules/KeyStore.js#L500)：只读返回 "include"；此 getter 不执行对应 setter 的写入或更新通知
- `static get multiRegex()` [源码:503](../../eyes/src/vendor/modules/KeyStore.js#L503)：只读返回 /^'"(.*)"$/；此 getter 不执行对应 setter 的写入或更新通知
- `static get singleRegex()` [源码:506](../../eyes/src/vendor/modules/KeyStore.js#L506)：只读返回 /^'(.*)$/；此 getter 不执行对应 setter 的写入或更新通知
- `search(e)` [源码:509](../../eyes/src/vendor/modules/KeyStore.js#L509)：源码方法 search；作用以类职责与源码实现为准，未猜测压缩参数含义

### `ExactMatch`

精确业务语义尚未确认，以下提供声明与操作证据。。父类 `BaseMatch`。

- `constructor(e)` [源码:524](../../eyes/src/vendor/modules/KeyStore.js#L524)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static get type()` [源码:527](../../eyes/src/vendor/modules/KeyStore.js#L527)：当前操作：写入 无直接字段写入；返回 "exact"。
- `static get multiRegex()` [源码:530](../../eyes/src/vendor/modules/KeyStore.js#L530)：当前操作：写入 无直接字段写入；返回 /^="(.*)"$/。
- `static get singleRegex()` [源码:533](../../eyes/src/vendor/modules/KeyStore.js#L533)：当前操作：写入 无直接字段写入；返回 /^=(.*)$/。
- `search(e)` [源码:536](../../eyes/src/vendor/modules/KeyStore.js#L536)：当前操作：写入 无直接字段写入；返回 {isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}。

### `PrefixExactMatch`

精确业务语义尚未确认，以下提供声明与操作证据。。父类 `BaseMatch`。

- `constructor(e)` [源码:545](../../eyes/src/vendor/modules/KeyStore.js#L545)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static get type()` [源码:548](../../eyes/src/vendor/modules/KeyStore.js#L548)：当前操作：写入 无直接字段写入；返回 "prefix-exact"。
- `static get multiRegex()` [源码:551](../../eyes/src/vendor/modules/KeyStore.js#L551)：当前操作：写入 无直接字段写入；返回 /^\^"(.*)"$/。
- `static get singleRegex()` [源码:554](../../eyes/src/vendor/modules/KeyStore.js#L554)：当前操作：写入 无直接字段写入；返回 /^\^(.*)$/。
- `search(e)` [源码:557](../../eyes/src/vendor/modules/KeyStore.js#L557)：当前操作：写入 无直接字段写入；返回 {isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}。

### `InversePrefixExactMatch`

精确业务语义尚未确认，以下提供声明与操作证据。。父类 `BaseMatch`。

- `constructor(e)` [源码:566](../../eyes/src/vendor/modules/KeyStore.js#L566)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static get type()` [源码:569](../../eyes/src/vendor/modules/KeyStore.js#L569)：当前操作：写入 无直接字段写入；返回 "inverse-prefix-exact"。
- `static get multiRegex()` [源码:572](../../eyes/src/vendor/modules/KeyStore.js#L572)：当前操作：写入 无直接字段写入；返回 /^!\^"(.*)"$/。
- `static get singleRegex()` [源码:575](../../eyes/src/vendor/modules/KeyStore.js#L575)：当前操作：写入 无直接字段写入；返回 /^!\^(.*)$/。
- `search(e)` [源码:578](../../eyes/src/vendor/modules/KeyStore.js#L578)：当前操作：写入 无直接字段写入；返回 {isMatch:t,score:t?0:1,indices:[0,e.length-1]}。

### `InverseSuffixExactMatch`

精确业务语义尚未确认，以下提供声明与操作证据。。父类 `BaseMatch`。

- `constructor(e)` [源码:587](../../eyes/src/vendor/modules/KeyStore.js#L587)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static get type()` [源码:590](../../eyes/src/vendor/modules/KeyStore.js#L590)：当前操作：写入 无直接字段写入；返回 "inverse-suffix-exact"。
- `static get multiRegex()` [源码:593](../../eyes/src/vendor/modules/KeyStore.js#L593)：当前操作：写入 无直接字段写入；返回 /^!"(.*)"\$$/。
- `static get singleRegex()` [源码:596](../../eyes/src/vendor/modules/KeyStore.js#L596)：当前操作：写入 无直接字段写入；返回 /^!(.*)\$$/。
- `search(e)` [源码:599](../../eyes/src/vendor/modules/KeyStore.js#L599)：当前操作：写入 无直接字段写入；返回 {isMatch:t,score:t?0:1,indices:[0,e.length-1]}。

### `SuffixExactMatch`

精确业务语义尚未确认，以下提供声明与操作证据。。父类 `BaseMatch`。

- `constructor(e)` [源码:608](../../eyes/src/vendor/modules/KeyStore.js#L608)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static get type()` [源码:611](../../eyes/src/vendor/modules/KeyStore.js#L611)：当前操作：写入 无直接字段写入；返回 "suffix-exact"。
- `static get multiRegex()` [源码:614](../../eyes/src/vendor/modules/KeyStore.js#L614)：当前操作：写入 无直接字段写入；返回 /^"(.*)"\$$/。
- `static get singleRegex()` [源码:617](../../eyes/src/vendor/modules/KeyStore.js#L617)：当前操作：写入 无直接字段写入；返回 /^(.*)\$$/。
- `search(e)` [源码:620](../../eyes/src/vendor/modules/KeyStore.js#L620)：当前操作：写入 无直接字段写入；返回 {isMatch:t,score:t?0:1,indices:[e.length-this.pattern.length,e.length-1]}。

### `InverseExactMatch`

精确业务语义尚未确认，以下提供声明与操作证据。。父类 `BaseMatch`。

- `constructor(e)` [源码:629](../../eyes/src/vendor/modules/KeyStore.js#L629)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static get type()` [源码:632](../../eyes/src/vendor/modules/KeyStore.js#L632)：当前操作：写入 无直接字段写入；返回 "inverse-exact"。
- `static get multiRegex()` [源码:635](../../eyes/src/vendor/modules/KeyStore.js#L635)：当前操作：写入 无直接字段写入；返回 /^!"(.*)"$/。
- `static get singleRegex()` [源码:638](../../eyes/src/vendor/modules/KeyStore.js#L638)：当前操作：写入 无直接字段写入；返回 /^!(.*)$/。
- `search(e)` [源码:641](../../eyes/src/vendor/modules/KeyStore.js#L641)：当前操作：写入 无直接字段写入；返回 {isMatch:t,score:t?0:1,indices:[0,e.length-1]}。

### `ExtendedSearch`

解析扩展搜索语法并组合多条件匹配。父类 `无`。

- `constructor(e, {isCaseSensitive:t=m.isCaseSensitive,includeMatches:n=m.includeMatches,minMatchCharLength:r=m.minMatchCharLength,ignoreLocation:i=m.ignoreLocation,findAllMatches:a=m.findAllMatches,location:s=m.location,threshold:o=m.threshold,distance:c=m.distance}={})` [源码:654](../../eyes/src/vendor/modules/KeyStore.js#L654)：当前操作：写入 options、pattern、query；返回 无显式返回。
- `static condition(e, t)` [源码:699](../../eyes/src/vendor/modules/KeyStore.js#L699)：源码方法 condition；作用以类职责与源码实现为准，未猜测压缩参数含义
- `searchIn(e)` [源码:702](../../eyes/src/vendor/modules/KeyStore.js#L702)：源码方法 searchIn；作用以类职责与源码实现为准，未猜测压缩参数含义

### `Fuse`

以索引和评分规则执行加权模糊搜索。父类 `无`。

- `constructor(e, t={}, n)` [源码:816](../../eyes/src/vendor/modules/KeyStore.js#L816)：当前操作：写入 _keyStore、options；返回 无显式返回。
- `setCollection(docs, t)` [源码:822](../../eyes/src/vendor/modules/KeyStore.js#L822)：源码方法 setCollection；作用以类职责与源码实现为准，未猜测压缩参数含义
- `add(e)` [源码:829](../../eyes/src/vendor/modules/KeyStore.js#L829)：源码方法 add；作用以类职责与源码实现为准，未猜测压缩参数含义
- `remove(e=()=>!1)` [源码:832](../../eyes/src/vendor/modules/KeyStore.js#L832)：源码方法 remove；作用以类职责与源码实现为准，未猜测压缩参数含义
- `removeAt(e)` [源码:840](../../eyes/src/vendor/modules/KeyStore.js#L840)：源码方法 removeAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getIndex()` [源码:843](../../eyes/src/vendor/modules/KeyStore.js#L843)：源码方法 getIndex；作用以类职责与源码实现为准，未猜测压缩参数含义
- `search(e, {limit:t=-1}={})` [源码:846](../../eyes/src/vendor/modules/KeyStore.js#L846)：源码方法 search；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_searchStringList(e)` [源码:895](../../eyes/src/vendor/modules/KeyStore.js#L895)：源码方法 _searchStringList；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_searchLogical(e)` [源码:924](../../eyes/src/vendor/modules/KeyStore.js#L924)：源码方法 _searchLogical；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_searchObjectList(e)` [源码:972](../../eyes/src/vendor/modules/KeyStore.js#L972)：源码方法 _searchObjectList；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_findMatches({key:key,value:value,searcher:searcher})` [源码:998](../../eyes/src/vendor/modules/KeyStore.js#L998)：源码方法 _findMatches；作用以类职责与源码实现为准，未猜测压缩参数含义

## `eyes/src/vendor/modules/LuminosityHighPassShader.js`

提供 LuminosityHighPassShader；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/LuminosityHighPassShader.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-LuminosityHighPassShader-js)

## `eyes/src/vendor/modules/MaskPass.js`

通过 stencil buffer 写入后处理遮罩；关闭后续通道的 stencil 遮罩约束。[源码](../../eyes/src/vendor/modules/MaskPass.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-MaskPass-js)

### `MaskPass`

通过 stencil buffer 写入后处理遮罩。父类 `Pass.Pass`。

- `constructor(scene, camera)` [源码:4](../../eyes/src/vendor/modules/MaskPass.js#L4)：当前操作：写入 camera、clear、inverse、needsSwap、scene；返回 无显式返回。
- `render(e, t, n)` [源码:7](../../eyes/src/vendor/modules/MaskPass.js#L7)：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定

### `ClearMaskPass`

关闭后续通道的 stencil 遮罩约束。父类 `Pass.Pass`。

- `constructor()` [源码:15](../../eyes/src/vendor/modules/MaskPass.js#L15)：当前操作：写入 needsSwap；返回 无显式返回。
- `render(e)` [源码:18](../../eyes/src/vendor/modules/MaskPass.js#L18)：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定

## `eyes/src/vendor/modules/MomentPrimary.cjs`

Moment 2.29.1 日期解析、格式化、时长、语言区域及 UTC/偏移处理；此副本有独立 locale 注册状态。[源码](../../eyes/src/vendor/modules/MomentPrimary.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-MomentPrimary-cjs)

## `eyes/src/vendor/modules/MomentSecondary.cjs`

Moment 2.29.1 日期解析、格式化、时长、语言区域及 UTC/偏移处理；此副本有独立 locale 注册状态。[源码](../../eyes/src/vendor/modules/MomentSecondary.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-MomentSecondary-cjs)

## `eyes/src/vendor/modules/N.js`

将超出范围的经度按 2π 折回；允许 force 参数保留输入。[源码](../../eyes/src/vendor/modules/N.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-N-js)

## `eyes/src/vendor/modules/OutlinePass.js`

分离可见/遮挡边缘并以降采样模糊叠加选中对象轮廓。[源码](../../eyes/src/vendor/modules/OutlinePass.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-OutlinePass-js)

### `OutlinePass`

分离可见/遮挡边缘并以降采样模糊叠加选中对象轮廓。父类 `Pass.Pass`。

- `constructor(e, renderScene, renderCamera, s)` [源码:6](../../eyes/src/vendor/modules/OutlinePass.js#L6)：当前操作：写入 _fsQuad、_oldClearColor、_selectionCache、_visibilityCache、copyUniforms、depthMaterial、depthMaterial.blending、depthMaterial.depthPacking、depthMaterial.side、downSampleRatio、edgeDetectionMaterial、edgeGlow、edgeStrength、edgeThickness、enabled、hiddenEdgeColor、materialCopy、needsSwap、oldClearAlpha、overlayMaterial、patternTexture、prepareMaskMaterial、prepareMaskMaterial.fragmentShader、prepareMaskMaterial.side、pulsePeriod、renderCamera、renderScene、renderTargetBlurBuffer1、renderTargetBlurBuffer1.texture.generateMipmaps、renderTargetBlurBuffer1.texture.name、renderTargetBlurBuffer2、renderTargetBlurBuffer2.texture.generateMipmaps、renderTargetBlurBuffer2.texture.name、renderTargetDepthBuffer、renderTargetDepthBuffer.texture.generateMipmaps、renderTargetDepthBuffer.texture.name、renderTargetEdgeBuffer1、renderTargetEdgeBuffer1.texture.generateMipmaps、renderTargetEdgeBuffer1.texture.name、renderTargetEdgeBuffer2、renderTargetEdgeBuffer2.texture.generateMipmaps、renderTargetEdgeBuffer2.texture.name、renderTargetMaskBuffer、renderTargetMaskBuffer.texture.generateMipmaps、renderTargetMaskBuffer.texture.name、renderTargetMaskDownSampleBuffer、renderTargetMaskDownSampleBuffer.texture.generateMipmaps、renderTargetMaskDownSampleBuffer.texture.name、resolution、selectedObjects、separableBlurMaterial1、separableBlurMaterial1.uniforms.kernelRadius.value、separableBlurMaterial2、separableBlurMaterial2.uniforms.kernelRadius.value、tempPulseColor1、tempPulseColor2、textureMatrix、usePatternTexture、visibleEdgeColor；返回 无显式返回。
- `dispose()` [源码:37](../../eyes/src/vendor/modules/OutlinePass.js#L37)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `setSize(e, t)` [源码:40](../../eyes/src/vendor/modules/OutlinePass.js#L40)：更新像素尺寸及关联目标；后处理链需要同步所有通道
- `render(e, t, n, r, i)` [源码:46](../../eyes/src/vendor/modules/OutlinePass.js#L46)：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定
- `_updateSelectionCache()` [源码:61](../../eyes/src/vendor/modules/OutlinePass.js#L61)：源码方法 _updateSelectionCache；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_changeVisibilityOfSelectedObjects(e)` [源码:71](../../eyes/src/vendor/modules/OutlinePass.js#L71)：源码方法 _changeVisibilityOfSelectedObjects；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_changeVisibilityOfNonSelectedObjects(e)` [源码:75](../../eyes/src/vendor/modules/OutlinePass.js#L75)：源码方法 _changeVisibilityOfNonSelectedObjects；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_updateTextureMatrix()` [源码:85](../../eyes/src/vendor/modules/OutlinePass.js#L85)：源码方法 _updateTextureMatrix；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_getPrepareMaskMaterial()` [源码:88](../../eyes/src/vendor/modules/OutlinePass.js#L88)：源码方法 _getPrepareMaskMaterial；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_getEdgeDetectionMaterial()` [源码:105](../../eyes/src/vendor/modules/OutlinePass.js#L105)：源码方法 _getEdgeDetectionMaterial；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_getSeparableBlurMaterial(e)` [源码:125](../../eyes/src/vendor/modules/OutlinePass.js#L125)：源码方法 _getSeparableBlurMaterial；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_getOverlayMaterial()` [源码:148](../../eyes/src/vendor/modules/OutlinePass.js#L148)：源码方法 _getOverlayMaterial；作用以类职责与源码实现为准，未猜测压缩参数含义

## `eyes/src/vendor/modules/PROJJSONBuilder2015.js`

从 WKT 树构造 2015 规范的 PROJJSON 结构。[源码](../../eyes/src/vendor/modules/PROJJSONBuilder2015.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-PROJJSONBuilder2015-js)

### `PROJJSONBuilder2015`

从 WKT 树构造 2015 规范的 PROJJSON 结构。父类 `Unidentified599.default`。

- `static convert(e, t={})` [源码:5](../../eyes/src/vendor/modules/PROJJSONBuilder2015.js#L5)：源码方法 convert；作用以类职责与源码实现为准，未猜测压缩参数含义

## `eyes/src/vendor/modules/PROJJSONBuilder2019.js`

处理 WKT2:2019 的 USAGE/SCOPE/AREA/BBOX 元数据。[源码](../../eyes/src/vendor/modules/PROJJSONBuilder2019.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-PROJJSONBuilder2019-js)

### `PROJJSONBuilder2019`

处理 WKT2:2019 的 USAGE/SCOPE/AREA/BBOX 元数据。父类 `Unidentified599.default`。

- `static convert(e, t={})` [源码:5](../../eyes/src/vendor/modules/PROJJSONBuilder2019.js#L5)：源码方法 convert；作用以类职责与源码实现为准，未猜测压缩参数含义

## `eyes/src/vendor/modules/Pass.js`

后处理通道契约与启停、清屏及交换缓冲标志；FullscreenTriangle 几何生成器；构建 position/normal/uv 属性及三角索引；使用全屏三角形绘制后处理材质。[源码](../../eyes/src/vendor/modules/Pass.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Pass-js)

### `Pass`

后处理通道契约与启停、清屏及交换缓冲标志。父类 `无`。

- `constructor()` [源码:4](../../eyes/src/vendor/modules/Pass.js#L4)：当前操作：写入 clear、enabled、isPass、needsSwap、renderToScreen；返回 无显式返回。
- `setSize()` [源码:7](../../eyes/src/vendor/modules/Pass.js#L7)：更新像素尺寸及关联目标；后处理链需要同步所有通道
- `render()` [源码:8](../../eyes/src/vendor/modules/Pass.js#L8)：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定
- `dispose()` [源码:11](../../eyes/src/vendor/modules/Pass.js#L11)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

### `FullscreenTriangleGeometry`

FullscreenTriangle 几何生成器；构建 position/normal/uv 属性及三角索引。父类 `ThreeCore.BufferGeometry`。

- `constructor()` [源码:15](../../eyes/src/vendor/modules/Pass.js#L15)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `FullScreenQuad`

使用全屏三角形绘制后处理材质。父类 `无`。

- `constructor(e)` [源码:21](../../eyes/src/vendor/modules/Pass.js#L21)：当前操作：写入 _mesh；返回 无显式返回。
- `dispose()` [源码:24](../../eyes/src/vendor/modules/Pass.js#L24)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `render(e)` [源码:27](../../eyes/src/vendor/modules/Pass.js#L27)：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定
- `get material()` [源码:30](../../eyes/src/vendor/modules/Pass.js#L30)：只读返回 this._mesh.material；此 getter 不执行对应 setter 的写入或更新通知
- `set material(e)` [源码:33](../../eyes/src/vendor/modules/Pass.js#L33)：将输入值写入 this._mesh.material，实际变更发生在 setter 中

## `eyes/src/vendor/modules/RenderPass.js`

将场景和相机绘制到当前后处理目标。[源码](../../eyes/src/vendor/modules/RenderPass.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-RenderPass-js)

### `RenderPass`

将场景和相机绘制到当前后处理目标。父类 `Pass.Pass`。

- `constructor(scene, camera, overrideMaterial=null, clearColor=null, clearAlpha=null)` [源码:5](../../eyes/src/vendor/modules/RenderPass.js#L5)：当前操作：写入 _oldClearColor、camera、clear、clearAlpha、clearColor、clearDepth、isRenderPass、needsSwap、overrideMaterial、scene；返回 无显式返回。
- `render(e, t, n)` [源码:8](../../eyes/src/vendor/modules/RenderPass.js#L8)：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定

## `eyes/src/vendor/modules/ShaderPass.js`

把前序纹理绑定到 shader uniform 后绘制全屏通道。[源码](../../eyes/src/vendor/modules/ShaderPass.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-ShaderPass-js)

### `ShaderPass`

把前序纹理绑定到 shader uniform 后绘制全屏通道。父类 `Pass.Pass`。

- `constructor(material, textureID="tDiffuse")` [源码:5](../../eyes/src/vendor/modules/ShaderPass.js#L5)：当前操作：写入 _fsQuad、material、textureID、uniforms；返回 无显式返回。
- `render(e, t, n)` [源码:14](../../eyes/src/vendor/modules/ShaderPass.js#L14)：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定
- `dispose()` [源码:17](../../eyes/src/vendor/modules/ShaderPass.js#L17)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

## `eyes/src/vendor/modules/Swiper.js`

轮播实例，组合尺寸、事件、滑动、循环与扩展模块生命周期。[源码](../../eyes/src/vendor/modules/Swiper.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Swiper-js)

### `Swiper`

轮播实例，组合尺寸、事件、滑动、循环与扩展模块生命周期。父类 `无`。

- `constructor(...e)` [源码:41](../../eyes/src/vendor/modules/Swiper.js#L41)：当前操作：写入 无直接字段写入；返回 (0,Dom7Entry.default)(n.el).each(t=>{const r=(0,animateCSSModeScroll.extend)({},n,{el:t});e.push(new Swiper(r));}),e、r.params=(0,animateCSSModeScroll.extend)({},u,w,n),r.originalParams=(0,animateCSSModeScroll.extend)({},r.params),r.passedParams=(0,animateCSSModeScroll.extend)({},n),r.params&&r.params.on&&Object.keys(r.params.on).forEac。
- `enable()` [源码:139](../../eyes/src/vendor/modules/Swiper.js#L139)：源码方法 enable；作用以类职责与源码实现为准，未猜测压缩参数含义
- `disable()` [源码:143](../../eyes/src/vendor/modules/Swiper.js#L143)：源码方法 disable；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setProgress(e, t)` [源码:147](../../eyes/src/vendor/modules/Swiper.js#L147)：源码方法 setProgress；作用以类职责与源码实现为准，未猜测压缩参数含义
- `emitContainerClasses()` [源码:154](../../eyes/src/vendor/modules/Swiper.js#L154)：源码方法 emitContainerClasses；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getSlideClasses(e)` [源码:160](../../eyes/src/vendor/modules/Swiper.js#L160)：源码方法 getSlideClasses；作用以类职责与源码实现为准，未猜测压缩参数含义
- `emitSlidesClasses()` [源码:164](../../eyes/src/vendor/modules/Swiper.js#L164)：源码方法 emitSlidesClasses；作用以类职责与源码实现为准，未猜测压缩参数含义
- `slidesPerViewDynamic(e="current", t=!1)` [源码:176](../../eyes/src/vendor/modules/Swiper.js#L176)：源码方法 slidesPerViewDynamic；作用以类职责与源码实现为准，未猜测压缩参数含义
- `update()` [源码:198](../../eyes/src/vendor/modules/Swiper.js#L198)：按当前时间或场景状态推进对象并维护缓存失效
- `changeDirection(e, t=!0)` [源码:213](../../eyes/src/vendor/modules/Swiper.js#L213)：源码方法 changeDirection；作用以类职责与源码实现为准，未猜测压缩参数含义
- `mount(e)` [源码:220](../../eyes/src/vendor/modules/Swiper.js#L220)：源码方法 mount；作用以类职责与源码实现为准，未猜测压缩参数含义
- `init(e)` [源码:251](../../eyes/src/vendor/modules/Swiper.js#L251)：初始化延迟资源和运行时能力；必须先完成再使用依赖资源的方法
- `destroy(e=!0, t=!0)` [源码:256](../../eyes/src/vendor/modules/Swiper.js#L256)：源码方法 destroy；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static extendDefaults(e)` [源码:268](../../eyes/src/vendor/modules/Swiper.js#L268)：源码方法 extendDefaults；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static get extendedDefaults()` [源码:271](../../eyes/src/vendor/modules/Swiper.js#L271)：只读返回 w；此 getter 不执行对应 setter 的写入或更新通知
- `static get defaults()` [源码:274](../../eyes/src/vendor/modules/Swiper.js#L274)：只读返回 Unidentified460.default；此 getter 不执行对应 setter 的写入或更新通知
- `static installModule(e)` [源码:277](../../eyes/src/vendor/modules/Swiper.js#L277)：源码方法 installModule；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static use(e)` [源码:282](../../eyes/src/vendor/modules/Swiper.js#L282)：源码方法 use；作用以类职责与源码实现为准，未猜测压缩参数含义

## `eyes/src/vendor/modules/Unidentified112.cjs`

从 decoder manifest revision 构造打包 WASM/JS 资源路径；具体编解码器由 manifest 和调用方确定。[源码](../../eyes/src/vendor/modules/Unidentified112.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified112-cjs)

## `eyes/src/vendor/modules/Unidentified113.cjs`

从 decoder manifest revision 构造打包 WASM/JS 资源路径；具体编解码器由 manifest 和调用方确定。[源码](../../eyes/src/vendor/modules/Unidentified113.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified113-cjs)

## `eyes/src/vendor/modules/Unidentified114.cjs`

从 decoder manifest revision 构造打包 WASM/JS 资源路径；具体编解码器由 manifest 和调用方确定。[源码](../../eyes/src/vendor/modules/Unidentified114.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified114-cjs)

## `eyes/src/vendor/modules/Unidentified115.cjs`

从 decoder manifest revision 构造打包 WASM/JS 资源路径；具体编解码器由 manifest 和调用方确定。[源码](../../eyes/src/vendor/modules/Unidentified115.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified115-cjs)

## `eyes/src/vendor/modules/Unidentified116.cjs`

从 decoder manifest revision 构造打包 WASM/JS 资源路径；具体编解码器由 manifest 和调用方确定。[源码](../../eyes/src/vendor/modules/Unidentified116.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified116-cjs)

## `eyes/src/vendor/modules/Unidentified157.cjs`

递归比较对象、数组、日期和正则；兼容 React element 的循环字段。[源码](../../eyes/src/vendor/modules/Unidentified157.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified157-cjs)

## `eyes/src/vendor/modules/Unidentified158.cjs`

带 leading、trailing、maxWait 的调用防抖。[源码](../../eyes/src/vendor/modules/Unidentified158.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified158-cjs)

## `eyes/src/vendor/modules/Unidentified159.cjs`

限制函数调用频率，复用防抖和最大等待窗口。[源码](../../eyes/src/vendor/modules/Unidentified159.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified159-cjs)

## `eyes/src/vendor/modules/Unidentified160.cjs`

自定义滚动条实现，观察尺寸和 DOM 并管理原生滚动同步。[源码](../../eyes/src/vendor/modules/Unidentified160.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified160-cjs)

## `eyes/src/vendor/modules/Unidentified167.js`

封装不同浏览器前缀的全屏请求、退出与状态事件。[源码](../../eyes/src/vendor/modules/Unidentified167.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified167-js)

## `eyes/src/vendor/modules/Unidentified169.js`

Popper 浮层定位：把计算样式和属性应用到浮层、箭头、参考元素，并在清理时撤销。[源码](../../eyes/src/vendor/modules/Unidentified169.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified169-js)

## `eyes/src/vendor/modules/Unidentified170.js`

Popper 浮层定位：取得 DOM nodeName 的小写形式。[源码](../../eyes/src/vendor/modules/Unidentified170.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified170-js)

## `eyes/src/vendor/modules/Unidentified172.js`

Popper 浮层定位：取得节点所属 window，处理跨文档和无节点输入。[源码](../../eyes/src/vendor/modules/Unidentified172.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified172-js)

## `eyes/src/vendor/modules/Unidentified175.js`

Popper 浮层定位：计算相对 offsetParent 的参考矩形，补偿缩放、滚动和边框。[源码](../../eyes/src/vendor/modules/Unidentified175.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified175-js)

## `eyes/src/vendor/modules/Unidentified176.js`

Popper 浮层定位：归一化 boundingClientRect，补偿元素缩放和 visualViewport 偏移。[源码](../../eyes/src/vendor/modules/Unidentified176.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified176-js)

## `eyes/src/vendor/modules/Unidentified178.js`

Popper 浮层定位：根据 Safari UA 判断视口偏移策略。[源码](../../eyes/src/vendor/modules/Unidentified178.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified178-js)

## `eyes/src/vendor/modules/Unidentified179.js`

Popper 浮层定位：优先读取 User-Agent Client Hints，再回退 navigator.userAgent。[源码](../../eyes/src/vendor/modules/Unidentified179.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified179-js)

## `eyes/src/vendor/modules/Unidentified180.js`

Popper 浮层定位：按节点类型选择 window 或元素的滚动偏移。[源码](../../eyes/src/vendor/modules/Unidentified180.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified180-js)

## `eyes/src/vendor/modules/Unidentified181.js`

Popper 浮层定位：取得 window pageXOffset/pageYOffset。[源码](../../eyes/src/vendor/modules/Unidentified181.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified181-js)

## `eyes/src/vendor/modules/Unidentified182.js`

Popper 浮层定位：取得元素 scrollLeft/scrollTop。[源码](../../eyes/src/vendor/modules/Unidentified182.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified182-js)

## `eyes/src/vendor/modules/Unidentified183.js`

Popper 浮层定位：计算文档根元素与 window 滚动的横向差值。[源码](../../eyes/src/vendor/modules/Unidentified183.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified183-js)

## `eyes/src/vendor/modules/Unidentified184.js`

Popper 浮层定位：取得所属文档的 documentElement。[源码](../../eyes/src/vendor/modules/Unidentified184.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified184-js)

## `eyes/src/vendor/modules/Unidentified185.js`

Popper 浮层定位：依据 overflow/overflowX/overflowY 判断滚动裁剪祖先。[源码](../../eyes/src/vendor/modules/Unidentified185.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified185-js)

## `eyes/src/vendor/modules/Unidentified186.js`

Popper 浮层定位：通过节点所属 window 读取计算样式。[源码](../../eyes/src/vendor/modules/Unidentified186.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified186-js)

## `eyes/src/vendor/modules/Unidentified187.js`

Popper 浮层定位：返回 offset 布局矩形并校正一像素内的测量差。[源码](../../eyes/src/vendor/modules/Unidentified187.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified187-js)

## `eyes/src/vendor/modules/Unidentified188.js`

Popper 浮层定位：递归收集滚动祖先及 window/visualViewport。[源码](../../eyes/src/vendor/modules/Unidentified188.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified188-js)

## `eyes/src/vendor/modules/Unidentified189.js`

Popper 浮层定位：向上寻找最近的滚动祖先。[源码](../../eyes/src/vendor/modules/Unidentified189.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified189-js)

## `eyes/src/vendor/modules/Unidentified190.js`

Popper 浮层定位：处理 assignedSlot、parentNode、ShadowRoot host 的祖先遍历。[源码](../../eyes/src/vendor/modules/Unidentified190.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified190-js)

## `eyes/src/vendor/modules/Unidentified191.js`

Popper 浮层定位：跳过 static table，识别 transform/filter 等 containing block。[源码](../../eyes/src/vendor/modules/Unidentified191.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified191-js)

## `eyes/src/vendor/modules/Unidentified192.js`

Popper 浮层定位：判断 table、td、th 类型。[源码](../../eyes/src/vendor/modules/Unidentified192.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified192-js)

## `eyes/src/vendor/modules/Unidentified193.js`

Popper 浮层定位：按依赖拓扑和 read/main/write 阶段排序定位修饰器。[源码](../../eyes/src/vendor/modules/Unidentified193.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified193-js)

## `eyes/src/vendor/modules/Unidentified195.js`

Popper 浮层定位：把同一微任务前的重复请求合并为一个 Promise。[源码](../../eyes/src/vendor/modules/Unidentified195.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified195-js)

## `eyes/src/vendor/modules/Unidentified196.js`

Popper 浮层定位：按修饰器名称合并 options 和 data。[源码](../../eyes/src/vendor/modules/Unidentified196.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified196-js)

## `eyes/src/vendor/modules/Unidentified197.js`

Popper 浮层定位：比较参考或浮层边界与裁剪矩形，返回四边溢出量。[源码](../../eyes/src/vendor/modules/Unidentified197.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified197-js)

## `eyes/src/vendor/modules/Unidentified198.js`

Popper 浮层定位：求多个裁剪祖先与根边界矩形的交集。[源码](../../eyes/src/vendor/modules/Unidentified198.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified198-js)

## `eyes/src/vendor/modules/Unidentified199.js`

Popper 浮层定位：计算布局/视觉视口尺寸和偏移。[源码](../../eyes/src/vendor/modules/Unidentified199.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified199-js)

## `eyes/src/vendor/modules/Unidentified200.js`

Popper 浮层定位：计算完整文档滚动范围并补偿 RTL 横向位置。[源码](../../eyes/src/vendor/modules/Unidentified200.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified200-js)

## `eyes/src/vendor/modules/Unidentified201.js`

Popper 浮层定位：沿 Shadow DOM host 链执行包含关系判断。[源码](../../eyes/src/vendor/modules/Unidentified201.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified201-js)

## `eyes/src/vendor/modules/Unidentified202.js`

Popper 浮层定位：为 x/y/width/height 矩形补齐 top/right/bottom/left。[源码](../../eyes/src/vendor/modules/Unidentified202.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified202-js)

## `eyes/src/vendor/modules/Unidentified203.js`

Popper 浮层定位：根据 placement 和 start/end 对齐计算浮层位置。[源码](../../eyes/src/vendor/modules/Unidentified203.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified203-js)

## `eyes/src/vendor/modules/Unidentified204.js`

Popper 浮层定位：提取 placement 连字符前的方向。[源码](../../eyes/src/vendor/modules/Unidentified204.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified204-js)

## `eyes/src/vendor/modules/Unidentified205.js`

Popper 浮层定位：提取 placement 连字符后的 start/end 变化。[源码](../../eyes/src/vendor/modules/Unidentified205.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified205-js)

## `eyes/src/vendor/modules/Unidentified206.js`

Popper 浮层定位：将 top/bottom 映射到 x，left/right 映射到 y。[源码](../../eyes/src/vendor/modules/Unidentified206.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified206-js)

## `eyes/src/vendor/modules/Unidentified207.js`

Popper 浮层定位：用给定四边 padding 覆盖零值默认对象。[源码](../../eyes/src/vendor/modules/Unidentified207.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified207-js)

## `eyes/src/vendor/modules/Unidentified208.js`

Popper 浮层定位：创建上下左右全零的独立对象。[源码](../../eyes/src/vendor/modules/Unidentified208.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified208-js)

## `eyes/src/vendor/modules/Unidentified209.js`

Popper 浮层定位：将同一值分配给一组侧边键。[源码](../../eyes/src/vendor/modules/Unidentified209.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified209-js)

## `eyes/src/vendor/modules/Unidentified210.js`

Popper 浮层定位：注册滚动和 resize 更新监听并返回清理函数。[源码](../../eyes/src/vendor/modules/Unidentified210.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified210-js)

## `eyes/src/vendor/modules/Unidentified211.js`

Popper 浮层定位：在 read 阶段建立 popperOffsets 坐标。[源码](../../eyes/src/vendor/modules/Unidentified211.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified211-js)

## `eyes/src/vendor/modules/Unidentified214.js`

Popper 浮层定位：根据溢出程度切换首选方向及候选方向。[源码](../../eyes/src/vendor/modules/Unidentified214.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified214-js)

## `eyes/src/vendor/modules/Unidentified215.js`

Popper 浮层定位：交换 top/bottom 和 left/right。[源码](../../eyes/src/vendor/modules/Unidentified215.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified215-js)

## `eyes/src/vendor/modules/Unidentified216.js`

Popper 浮层定位：交换 start/end 对齐。[源码](../../eyes/src/vendor/modules/Unidentified216.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified216-js)

## `eyes/src/vendor/modules/Unidentified217.js`

Popper 浮层定位：按方向的溢出量排序自动定位候选。[源码](../../eyes/src/vendor/modules/Unidentified217.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified217-js)

## `eyes/src/vendor/modules/Unidentified218.js`

Popper 浮层定位：沿主轴/副轴约束浮层，结合 tether 保持参考联系。[源码](../../eyes/src/vendor/modules/Unidentified218.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified218-js)

## `eyes/src/vendor/modules/Unidentified219.js`

Popper 浮层定位：在 x 和 y 之间切换。[源码](../../eyes/src/vendor/modules/Unidentified219.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified219-js)

## `eyes/src/vendor/modules/Unidentified221.js`

Popper 浮层定位：计算箭头在浮层内的偏移及中心误差。[源码](../../eyes/src/vendor/modules/Unidentified221.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified221-js)

## `eyes/src/vendor/modules/Unidentified222.js`

Popper 浮层定位：识别参考被裁剪或浮层逃逸并设置 data 属性。[源码](../../eyes/src/vendor/modules/Unidentified222.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified222-js)

## `eyes/src/vendor/modules/Unidentified243.cjs`

Moment Timezone 0.5.33：时区数据库加载、偏移计算、时间转换与猜测。[源码](../../eyes/src/vendor/modules/Unidentified243.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified243-cjs)

## `eyes/src/vendor/modules/Unidentified404.js`

观察容器 ResizeObserver 或 window resize 并发射轮播尺寸事件。[源码](../../eyes/src/vendor/modules/Unidentified404.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified404-js)

## `eyes/src/vendor/modules/Unidentified405.js`

观察 DOM mutation 并通知轮播更新。[源码](../../eyes/src/vendor/modules/Unidentified405.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified405-js)

## `eyes/src/vendor/modules/Unidentified406.js`

实现 eventsEmitter；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified406.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified406-js)

## `eyes/src/vendor/modules/Unidentified407.js`

实现 update；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified407.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified407-js)

## `eyes/src/vendor/modules/Unidentified408.js`

实现 updateSize；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified408.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified408-js)

## `eyes/src/vendor/modules/Unidentified409.js`

实现 updateSlides；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified409.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified409-js)

## `eyes/src/vendor/modules/Unidentified410.js`

实现 updateAutoHeight；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified410.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified410-js)

## `eyes/src/vendor/modules/Unidentified411.js`

实现 updateSlidesOffset；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified411.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified411-js)

## `eyes/src/vendor/modules/Unidentified412.js`

实现 updateSlidesProgress；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified412.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified412-js)

## `eyes/src/vendor/modules/Unidentified413.js`

实现 updateProgress；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified413.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified413-js)

## `eyes/src/vendor/modules/Unidentified414.js`

实现 updateSlidesClasses；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified414.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified414-js)

## `eyes/src/vendor/modules/Unidentified415.js`

实现 updateActiveIndex；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified415.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified415-js)

## `eyes/src/vendor/modules/Unidentified416.js`

实现 updateClickedSlide；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified416.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified416-js)

## `eyes/src/vendor/modules/Unidentified417.js`

实现 translate；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified417.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified417-js)

## `eyes/src/vendor/modules/Unidentified418.js`

实现 getTranslate；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified418.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified418-js)

## `eyes/src/vendor/modules/Unidentified419.js`

实现 setTranslate；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified419.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified419-js)

## `eyes/src/vendor/modules/Unidentified420.js`

实现 minTranslate；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified420.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified420-js)

## `eyes/src/vendor/modules/Unidentified421.js`

实现 maxTranslate；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified421.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified421-js)

## `eyes/src/vendor/modules/Unidentified422.js`

实现 translateTo；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified422.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified422-js)

## `eyes/src/vendor/modules/Unidentified423.js`

实现 transition；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified423.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified423-js)

## `eyes/src/vendor/modules/Unidentified424.js`

实现 setTransition；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified424.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified424-js)

## `eyes/src/vendor/modules/Unidentified425.js`

实现 transitionStart；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified425.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified425-js)

## `eyes/src/vendor/modules/Unidentified426.js`

按当前/前一索引判断 next/prev/reset 并发射过渡阶段事件。[源码](../../eyes/src/vendor/modules/Unidentified426.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified426-js)

## `eyes/src/vendor/modules/Unidentified427.js`

实现 transitionEnd；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified427.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified427-js)

## `eyes/src/vendor/modules/Unidentified428.js`

实现 slide；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified428.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified428-js)

## `eyes/src/vendor/modules/Unidentified429.js`

实现 slideTo；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified429.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified429-js)

## `eyes/src/vendor/modules/Unidentified430.js`

实现 slideToLoop；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified430.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified430-js)

## `eyes/src/vendor/modules/Unidentified431.js`

实现 slideNext；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified431.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified431-js)

## `eyes/src/vendor/modules/Unidentified432.js`

实现 slidePrev；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified432.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified432-js)

## `eyes/src/vendor/modules/Unidentified433.js`

实现 slideReset；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified433.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified433-js)

## `eyes/src/vendor/modules/Unidentified434.js`

实现 slideToClosest；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified434.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified434-js)

## `eyes/src/vendor/modules/Unidentified435.js`

实现 slideToClickedSlide；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified435.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified435-js)

## `eyes/src/vendor/modules/Unidentified436.js`

实现 loop；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified436.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified436-js)

## `eyes/src/vendor/modules/Unidentified437.js`

实现 loopCreate；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified437.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified437-js)

## `eyes/src/vendor/modules/Unidentified438.js`

实现 loopFix；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified438.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified438-js)

## `eyes/src/vendor/modules/Unidentified439.js`

实现 loopDestroy；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified439.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified439-js)

## `eyes/src/vendor/modules/Unidentified440.js`

实现 grabCursor；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified440.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified440-js)

## `eyes/src/vendor/modules/Unidentified441.js`

实现 setGrabCursor；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified441.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified441-js)

## `eyes/src/vendor/modules/Unidentified442.js`

实现 unsetGrabCursor；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified442.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified442-js)

## `eyes/src/vendor/modules/Unidentified443.js`

实现 events；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified443.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified443-js)

## `eyes/src/vendor/modules/Unidentified444.js`

筛选有效触摸/指针起点，初始化拖动状态并发射 touchStart。[源码](../../eyes/src/vendor/modules/Unidentified444.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified444-js)

## `eyes/src/vendor/modules/Unidentified445.js`

判定滚动方向、阈值和嵌套拖动，更新平移及速度采样。[源码](../../eyes/src/vendor/modules/Unidentified445.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified445-js)

## `eyes/src/vendor/modules/Unidentified446.js`

结束拖动，处理点击/双击、惯性以及滑片吸附。[源码](../../eyes/src/vendor/modules/Unidentified446.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified446-js)

## `eyes/src/vendor/modules/Unidentified447.js`

重算响应式断点、容器与滑片尺寸，恢复索引和导航锁。[源码](../../eyes/src/vendor/modules/Unidentified447.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified447-js)

## `eyes/src/vendor/modules/Unidentified448.js`

拖动或动画期间按配置阻止点击默认行为及传播。[源码](../../eyes/src/vendor/modules/Unidentified448.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified448-js)

## `eyes/src/vendor/modules/Unidentified449.js`

CSS scroll 模式下同步 scrollLeft/Top 到平移、索引和进度。[源码](../../eyes/src/vendor/modules/Unidentified449.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified449-js)

## `eyes/src/vendor/modules/Unidentified450.js`

实现 breakpoints；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified450.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified450-js)

## `eyes/src/vendor/modules/Unidentified451.js`

实现 setBreakpoint；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified451.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified451-js)

## `eyes/src/vendor/modules/Unidentified452.js`

实现 getBreakpoint；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified452.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified452-js)

## `eyes/src/vendor/modules/Unidentified453.js`

实现 classes；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified453.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified453-js)

## `eyes/src/vendor/modules/Unidentified454.js`

实现 addClasses；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified454.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified454-js)

## `eyes/src/vendor/modules/Unidentified455.js`

实现 removeClasses；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified455.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified455-js)

## `eyes/src/vendor/modules/Unidentified456.js`

实现 images；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified456.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified456-js)

## `eyes/src/vendor/modules/Unidentified457.js`

实现 loadImage；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified457.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified457-js)

## `eyes/src/vendor/modules/Unidentified458.js`

实现 preloadImages；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified458.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified458-js)

## `eyes/src/vendor/modules/Unidentified459.js`

实现 checkOverflow；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/Unidentified459.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified459-js)

## `eyes/src/vendor/modules/Unidentified460.js`

轮播默认配置表：触摸、布局、类名、循环、断点与交互策略。[源码](../../eyes/src/vendor/modules/Unidentified460.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified460-js)

## `eyes/src/vendor/modules/Unidentified461.js`

扩展模块默认参数，并规范化 enabled/auto/navigation 等输入。[源码](../../eyes/src/vendor/modules/Unidentified461.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified461-js)

## `eyes/src/vendor/modules/Unidentified462.js`

Swiper 的 Virtual 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified462.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified462-js)

## `eyes/src/vendor/modules/Unidentified463.js`

Swiper 的 Keyboard 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified463.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified463-js)

## `eyes/src/vendor/modules/Unidentified464.js`

Swiper 的 Mousewheel 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified464.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified464-js)

## `eyes/src/vendor/modules/Unidentified465.js`

Swiper 的 Navigation 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified465.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified465-js)

## `eyes/src/vendor/modules/Unidentified466.js`

按 createElements/auto 配置创建缺失的导航等 DOM 并同步参数。[源码](../../eyes/src/vendor/modules/Unidentified466.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified466-js)

## `eyes/src/vendor/modules/Unidentified467.js`

Swiper 的 Pagination 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified467.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified467-js)

## `eyes/src/vendor/modules/Unidentified468.js`

将类名转换为选择器并转义特殊标点。[源码](../../eyes/src/vendor/modules/Unidentified468.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified468-js)

## `eyes/src/vendor/modules/Unidentified469.js`

Swiper 的 Scrollbar 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified469.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified469-js)

## `eyes/src/vendor/modules/Unidentified470.js`

Swiper 的 Parallax 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified470.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified470-js)

## `eyes/src/vendor/modules/Unidentified471.js`

Swiper 的 Zoom 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified471.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified471-js)

## `eyes/src/vendor/modules/Unidentified472.js`

Swiper 的 Lazy 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified472.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified472-js)

## `eyes/src/vendor/modules/Unidentified473.js`

Swiper 的 Controller 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified473.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified473-js)

## `eyes/src/vendor/modules/Unidentified474.js`

Swiper 的 A11y 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified474.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified474-js)

## `eyes/src/vendor/modules/Unidentified475.js`

Swiper 的 History 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified475.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified475-js)

## `eyes/src/vendor/modules/Unidentified476.js`

Swiper 的 HashNavigation 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified476.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified476-js)

## `eyes/src/vendor/modules/Unidentified477.js`

Swiper 的 Autoplay 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified477.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified477-js)

## `eyes/src/vendor/modules/Unidentified478.js`

Swiper 的 Thumbs 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified478.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified478-js)

## `eyes/src/vendor/modules/Unidentified479.js`

Swiper 的 FreeMode 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified479.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified479-js)

## `eyes/src/vendor/modules/Unidentified480.js`

Swiper 的 Grid 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified480.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified480-js)

## `eyes/src/vendor/modules/Unidentified481.js`

将滑片添加、插入、移除接口绑定到轮播实例。[源码](../../eyes/src/vendor/modules/Unidentified481.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified481-js)

## `eyes/src/vendor/modules/Unidentified482.js`

末尾添加滑片，重建循环并按 observer 状态更新。[源码](../../eyes/src/vendor/modules/Unidentified482.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified482-js)

## `eyes/src/vendor/modules/Unidentified483.js`

开头添加滑片，按新增数量修正当前索引并重建循环。[源码](../../eyes/src/vendor/modules/Unidentified483.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified483-js)

## `eyes/src/vendor/modules/Unidentified484.js`

在索引处插入滑片，移动尾部节点并维持当前滑片位置。[源码](../../eyes/src/vendor/modules/Unidentified484.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified484-js)

## `eyes/src/vendor/modules/Unidentified485.js`

移除一个或多个索引滑片并修正当前索引及循环副本。[源码](../../eyes/src/vendor/modules/Unidentified485.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified485-js)

## `eyes/src/vendor/modules/Unidentified486.js`

构造所有滑片索引并委托 removeSlide 删除。[源码](../../eyes/src/vendor/modules/Unidentified486.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified486-js)

## `eyes/src/vendor/modules/Unidentified487.js`

Swiper 的 EffectFade 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified487.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified487-js)

## `eyes/src/vendor/modules/Unidentified488.js`

在 beforeInit/setTranslate/setTransition 上装配视觉效果与透视类。[源码](../../eyes/src/vendor/modules/Unidentified488.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified488-js)

## `eyes/src/vendor/modules/Unidentified489.js`

选择效果 transformEl 并隐藏背面，否则返回原滑片。[源码](../../eyes/src/vendor/modules/Unidentified489.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified489-js)

## `eyes/src/vendor/modules/Unidentified490.js`

为虚拟平移模式监听效果目标的 transitionend 并结束动画。[源码](../../eyes/src/vendor/modules/Unidentified490.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified490-js)

## `eyes/src/vendor/modules/Unidentified491.js`

Swiper 的 EffectCube 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified491.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified491-js)

## `eyes/src/vendor/modules/Unidentified492.js`

Swiper 的 EffectFlip 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified492.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified492-js)

## `eyes/src/vendor/modules/Unidentified493.js`

创建或复用 swiper-slide-shadow 节点用于 3D 效果明暗。[源码](../../eyes/src/vendor/modules/Unidentified493.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified493-js)

## `eyes/src/vendor/modules/Unidentified494.js`

Swiper 的 EffectCoverflow 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified494.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified494-js)

## `eyes/src/vendor/modules/Unidentified495.js`

Swiper 的 EffectCreative 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified495.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified495-js)

## `eyes/src/vendor/modules/Unidentified496.js`

Swiper 的 EffectCards 功能插件；按初始化、更新和销毁事件管理状态及 DOM。[源码](../../eyes/src/vendor/modules/Unidentified496.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified496-js)

## `eyes/src/vendor/modules/Unidentified585.js`

组装 proj4 兼容坐标转换入口、投影注册表和定义 API。[源码](../../eyes/src/vendor/modules/Unidentified585.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified585-js)

## `eyes/src/vendor/modules/Unidentified586.js`

创建正反向坐标转换器并处理输入数组或点对象。[源码](../../eyes/src/vendor/modules/Unidentified586.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified586-js)

## `eyes/src/vendor/modules/Unidentified587.js`

解析坐标参考定义，建立椭球、基准面和投影实例。[源码](../../eyes/src/vendor/modules/Unidentified587.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified587-js)

## `eyes/src/vendor/modules/Unidentified588.js`

将 EPSG、WKT、PROJJSON 或 proj4 定义归一化。[源码](../../eyes/src/vendor/modules/Unidentified588.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified588-js)

## `eyes/src/vendor/modules/Unidentified589.js`

注册和读取 EPSG、ESRI、IAU2000 等命名坐标定义。[源码](../../eyes/src/vendor/modules/Unidentified589.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified589-js)

## `eyes/src/vendor/modules/Unidentified590.js`

初始化 WGS84、Web Mercator、UTM 和极区坐标参考定义。[源码](../../eyes/src/vendor/modules/Unidentified590.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified590-js)

## `eyes/src/vendor/modules/Unidentified591.js`

解析 +proj 参数并把角度转为弧度。[源码](../../eyes/src/vendor/modules/Unidentified591.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified591-js)

## `eyes/src/vendor/modules/Unidentified593.js`

本初子午线名称到相对格林尼治经度的常量表。[源码](../../eyes/src/vendor/modules/Unidentified593.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified593-js)

## `eyes/src/vendor/modules/Unidentified594.js`

线性单位名称到米的转换系数表。[源码](../../eyes/src/vendor/modules/Unidentified594.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified594-js)

## `eyes/src/vendor/modules/Unidentified595.js`

忽略大小写、空白和标点匹配投影参数名称。[源码](../../eyes/src/vendor/modules/Unidentified595.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified595-js)

## `eyes/src/vendor/modules/Unidentified596.js`

解析 WKT 坐标参考树并归一化投影属性。[源码](../../eyes/src/vendor/modules/Unidentified596.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified596-js)

## `eyes/src/vendor/modules/Unidentified599.js`

将 WKT2 坐标轴、单位和投影参数映射为内部表示。[源码](../../eyes/src/vendor/modules/Unidentified599.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified599-js)

### `PROJJSONBuilderBase`

精确业务语义尚未确认，以下提供声明与操作证据。。父类 `无`。

- `static getId(e)` [源码:4](../../eyes/src/vendor/modules/Unidentified599.js#L4)：当前操作：写入 无直接字段写入；返回 t&&t.length>=3?{authority:t[1],code:parseInt(t[2],10)}:null。
- `static convertUnit(e, t="unit")` [源码:11](../../eyes/src/vendor/modules/Unidentified599.js#L11)：当前操作：写入 无直接字段写入；返回 {type:t,name:"unknown",conversion_factor:null}、{type:t,name:n,conversion_factor:r,id:i?{authority:i[1],code:parseInt(i[2],10)}:null}。
- `static convertAxis(e)` [源码:30](../../eyes/src/vendor/modules/Unidentified599.js#L30)：当前操作：写入 无直接字段写入；返回 {name:t,direction:n,unit:this.convertUnit(s),order:a}。
- `static extractAxes(e)` [源码:51](../../eyes/src/vendor/modules/Unidentified599.js#L51)：当前操作：写入 无直接字段写入；返回 e.filter(e=>Array.isArray(e)&&"AXIS"===e[0]).map(e=>this.convertAxis(e)).sort((e,t)=>(e.order\|\|0)-(t.order\|\|0))。
- `static convert(e, t={})` [源码:54](../../eyes/src/vendor/modules/Unidentified599.js#L54)：当前操作：写入 无直接字段写入；返回 t。

## `eyes/src/vendor/modules/Unidentified602.js`

通过字符串状态机解析 WKT 关键字、引号、数值和嵌套结构。[源码](../../eyes/src/vendor/modules/Unidentified602.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified602-js)

## `eyes/src/vendor/modules/Unidentified606.js`

复制非 undefined 属性到目标对象。[源码](../../eyes/src/vendor/modules/Unidentified606.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified606-js)

## `eyes/src/vendor/modules/Unidentified609.js`

计算依偏心率和纬度正弦变化的椭球曲率半径。[源码](../../eyes/src/vendor/modules/Unidentified609.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified609-js)

## `eyes/src/vendor/modules/Unidentified611.js`

负数返回 -1，其余返回 1。[源码](../../eyes/src/vendor/modules/Unidentified611.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified611-js)

## `eyes/src/vendor/modules/Unidentified612.js`

计算椭球等角纬度的指数辅助量。[源码](../../eyes/src/vendor/modules/Unidentified612.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified612-js)

## `eyes/src/vendor/modules/Unidentified613.js`

最多 16 轮迭代反求等角纬度，失败返回 -9999。[源码](../../eyes/src/vendor/modules/Unidentified613.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified613-js)

## `eyes/src/vendor/modules/Unidentified616.js`

命名椭球长半轴、短半轴或反扁率表。[源码](../../eyes/src/vendor/modules/Unidentified616.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified616-js)

## `eyes/src/vendor/modules/Unidentified617.js`

命名大地基准、椭球和 Helmert/gridshift 参数表。[源码](../../eyes/src/vendor/modules/Unidentified617.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified617-js)

## `eyes/src/vendor/modules/Unidentified618.js`

构造基准参数；将角秒和 ppm 变换到内部单位。[源码](../../eyes/src/vendor/modules/Unidentified618.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified618-js)

## `eyes/src/vendor/modules/Unidentified624.js`

将坐标数组转换为 x/y/z 点对象。[源码](../../eyes/src/vendor/modules/Unidentified624.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified624-js)

## `eyes/src/vendor/modules/Unidentified625.js`

拒绝非有限数坐标。[源码](../../eyes/src/vendor/modules/Unidentified625.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified625-js)

## `eyes/src/vendor/modules/Unidentified626.js`

兼容数组、对象、逗号字符串的旧 proj4.Point 接口。[源码](../../eyes/src/vendor/modules/Unidentified626.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified626-js)

## `eyes/src/vendor/modules/Unidentified628.js`

向 Proj 注册各投影插件。[源码](../../eyes/src/vendor/modules/Unidentified628.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified628-js)

## `eyes/src/vendor/modules/Unidentified630.js`

展开偏心率的子午线弧长级数系数。[源码](../../eyes/src/vendor/modules/Unidentified630.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified630-js)

## `eyes/src/vendor/modules/Unidentified631.js`

使用纬度、正余弦和级数系数计算子午线弧长。[源码](../../eyes/src/vendor/modules/Unidentified631.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified631-js)

## `eyes/src/vendor/modules/Unidentified632.js`

最多 20 次 Newton 迭代反求子午线弧长对应纬度。[源码](../../eyes/src/vendor/modules/Unidentified632.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified632-js)

## `eyes/src/vendor/modules/Unidentified634.js`

通过指数函数计算双曲正弦。[源码](../../eyes/src/vendor/modules/Unidentified634.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified634-js)

## `eyes/src/vendor/modules/Unidentified635.js`

按最大分量缩放计算二元范数，降低溢出。[源码](../../eyes/src/vendor/modules/Unidentified635.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified635-js)

## `eyes/src/vendor/modules/Unidentified636.js`

组合稳定 log1p 和 hypot 计算反双曲正弦。[源码](../../eyes/src/vendor/modules/Unidentified636.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified636-js)

## `eyes/src/vendor/modules/Unidentified637.js`

对小量修正 log(1+x) 的舍入误差。[源码](../../eyes/src/vendor/modules/Unidentified637.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified637-js)

## `eyes/src/vendor/modules/Unidentified638.js`

Clenshaw 递推计算纬度级数。[源码](../../eyes/src/vendor/modules/Unidentified638.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified638-js)

## `eyes/src/vendor/modules/Unidentified639.js`

Clenshaw 递推计算实正弦级数。[源码](../../eyes/src/vendor/modules/Unidentified639.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified639-js)

## `eyes/src/vendor/modules/Unidentified640.js`

通过双曲函数计算复数形式的 Clenshaw 级数。[源码](../../eyes/src/vendor/modules/Unidentified640.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified640-js)

## `eyes/src/vendor/modules/Unidentified641.js`

通过指数函数计算双曲余弦。[源码](../../eyes/src/vendor/modules/Unidentified641.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified641-js)

## `eyes/src/vendor/modules/Unidentified643.js`

由经度推导并约束 UTM 分区。[源码](../../eyes/src/vendor/modules/Unidentified643.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified643-js)

## `eyes/src/vendor/modules/Unidentified646.js`

计算椭球共形转换的幂比值。[源码](../../eyes/src/vendor/modules/Unidentified646.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified646-js)

## `eyes/src/vendor/modules/Unidentified653.js`

使用四项三角级数计算子午线弧。[源码](../../eyes/src/vendor/modules/Unidentified653.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified653-js)

## `eyes/src/vendor/modules/Unidentified654.js`

子午线弧零阶系数。[源码](../../eyes/src/vendor/modules/Unidentified654.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified654-js)

## `eyes/src/vendor/modules/Unidentified655.js`

子午线弧二倍角系数。[源码](../../eyes/src/vendor/modules/Unidentified655.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified655-js)

## `eyes/src/vendor/modules/Unidentified656.js`

子午线弧四倍角系数。[源码](../../eyes/src/vendor/modules/Unidentified656.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified656-js)

## `eyes/src/vendor/modules/Unidentified657.js`

子午线弧六倍角系数。[源码](../../eyes/src/vendor/modules/Unidentified657.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified657-js)

## `eyes/src/vendor/modules/Unidentified658.js`

计算卯酉圈曲率半径。[源码](../../eyes/src/vendor/modules/Unidentified658.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified658-js)

## `eyes/src/vendor/modules/Unidentified659.js`

将超出半圆范围的纬度折回。[源码](../../eyes/src/vendor/modules/Unidentified659.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified659-js)

## `eyes/src/vendor/modules/Unidentified660.js`

最多 15 次迭代反求子午线弧纬度，失败返回 NaN。[源码](../../eyes/src/vendor/modules/Unidentified660.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified660-js)

## `eyes/src/vendor/modules/Unidentified662.js`

计算等积纬度辅助量 q。[源码](../../eyes/src/vendor/modules/Unidentified662.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified662-js)

## `eyes/src/vendor/modules/Unidentified663.js`

计算等积纬度逆变换级数系数。[源码](../../eyes/src/vendor/modules/Unidentified663.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified663-js)

## `eyes/src/vendor/modules/Unidentified664.js`

通过正弦级数恢复等积变换纬度。[源码](../../eyes/src/vendor/modules/Unidentified664.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified664-js)

## `eyes/src/vendor/modules/Unidentified666.js`

将舍入后越界的输入夹到 [-1,1] 再求反正弦。[源码](../../eyes/src/vendor/modules/Unidentified666.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified666-js)

## `eyes/src/vendor/modules/Unidentified669.js`

最多 30 次迭代反求等积纬度，极点特殊处理。[源码](../../eyes/src/vendor/modules/Unidentified669.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified669-js)

## `eyes/src/vendor/modules/Unidentified719.cjs`

使用 History API 或 hash 匹配路由，管理导航钩子及链接监听。[源码](../../eyes/src/vendor/modules/Unidentified719.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified719-cjs)

## `eyes/src/vendor/modules/Unidentified777.cjs`

将对应压缩时区 JSON 加载进 Moment Timezone 实例并导出该实例。[源码](../../eyes/src/vendor/modules/Unidentified777.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified777-cjs)

## `eyes/src/vendor/modules/Unidentified778.cjs`

Moment Timezone 0.5.33：时区数据库加载、偏移计算、时间转换与猜测。[源码](../../eyes/src/vendor/modules/Unidentified778.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified778-cjs)

## `eyes/src/vendor/modules/Unidentified78.cjs`

从 decoder manifest revision 构造打包 WASM/JS 资源路径；具体编解码器由 manifest 和调用方确定。[源码](../../eyes/src/vendor/modules/Unidentified78.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified78-cjs)

## `eyes/src/vendor/modules/Unidentified79.cjs`

从 decoder manifest revision 构造打包 WASM/JS 资源路径；具体编解码器由 manifest 和调用方确定。[源码](../../eyes/src/vendor/modules/Unidentified79.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified79-cjs)

## `eyes/src/vendor/modules/Unidentified930.js`

Popper 浮层定位：把计算样式和属性应用到浮层、箭头、参考元素，并在清理时撤销。[源码](../../eyes/src/vendor/modules/Unidentified930.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified930-js)

## `eyes/src/vendor/modules/Unidentified931.js`

Popper 浮层定位：取得 DOM nodeName 的小写形式。[源码](../../eyes/src/vendor/modules/Unidentified931.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified931-js)

## `eyes/src/vendor/modules/Unidentified933.js`

Popper 浮层定位：取得节点所属 window，处理跨文档和无节点输入。[源码](../../eyes/src/vendor/modules/Unidentified933.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified933-js)

## `eyes/src/vendor/modules/Unidentified936.js`

Popper 浮层定位：计算相对 offsetParent 的参考矩形，补偿缩放、滚动和边框。[源码](../../eyes/src/vendor/modules/Unidentified936.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified936-js)

## `eyes/src/vendor/modules/Unidentified937.js`

Popper 浮层定位：归一化 boundingClientRect，补偿元素缩放和 visualViewport 偏移。[源码](../../eyes/src/vendor/modules/Unidentified937.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified937-js)

## `eyes/src/vendor/modules/Unidentified939.js`

Popper 浮层定位：根据 Safari UA 判断视口偏移策略。[源码](../../eyes/src/vendor/modules/Unidentified939.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified939-js)

## `eyes/src/vendor/modules/Unidentified940.js`

Popper 浮层定位：优先读取 User-Agent Client Hints，再回退 navigator.userAgent。[源码](../../eyes/src/vendor/modules/Unidentified940.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified940-js)

## `eyes/src/vendor/modules/Unidentified941.js`

Popper 浮层定位：按节点类型选择 window 或元素的滚动偏移。[源码](../../eyes/src/vendor/modules/Unidentified941.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified941-js)

## `eyes/src/vendor/modules/Unidentified942.js`

Popper 浮层定位：取得 window pageXOffset/pageYOffset。[源码](../../eyes/src/vendor/modules/Unidentified942.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified942-js)

## `eyes/src/vendor/modules/Unidentified943.js`

Popper 浮层定位：取得元素 scrollLeft/scrollTop。[源码](../../eyes/src/vendor/modules/Unidentified943.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified943-js)

## `eyes/src/vendor/modules/Unidentified944.js`

Popper 浮层定位：计算文档根元素与 window 滚动的横向差值。[源码](../../eyes/src/vendor/modules/Unidentified944.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified944-js)

## `eyes/src/vendor/modules/Unidentified945.js`

Popper 浮层定位：取得所属文档的 documentElement。[源码](../../eyes/src/vendor/modules/Unidentified945.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified945-js)

## `eyes/src/vendor/modules/Unidentified946.js`

Popper 浮层定位：依据 overflow/overflowX/overflowY 判断滚动裁剪祖先。[源码](../../eyes/src/vendor/modules/Unidentified946.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified946-js)

## `eyes/src/vendor/modules/Unidentified947.js`

Popper 浮层定位：通过节点所属 window 读取计算样式。[源码](../../eyes/src/vendor/modules/Unidentified947.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified947-js)

## `eyes/src/vendor/modules/Unidentified948.js`

Popper 浮层定位：返回 offset 布局矩形并校正一像素内的测量差。[源码](../../eyes/src/vendor/modules/Unidentified948.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified948-js)

## `eyes/src/vendor/modules/Unidentified949.js`

Popper 浮层定位：递归收集滚动祖先及 window/visualViewport。[源码](../../eyes/src/vendor/modules/Unidentified949.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified949-js)

## `eyes/src/vendor/modules/Unidentified950.js`

Popper 浮层定位：向上寻找最近的滚动祖先。[源码](../../eyes/src/vendor/modules/Unidentified950.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified950-js)

## `eyes/src/vendor/modules/Unidentified951.js`

Popper 浮层定位：处理 assignedSlot、parentNode、ShadowRoot host 的祖先遍历。[源码](../../eyes/src/vendor/modules/Unidentified951.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified951-js)

## `eyes/src/vendor/modules/Unidentified952.js`

Popper 浮层定位：跳过 static table，识别 transform/filter 等 containing block。[源码](../../eyes/src/vendor/modules/Unidentified952.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified952-js)

## `eyes/src/vendor/modules/Unidentified953.js`

Popper 浮层定位：判断 table、td、th 类型。[源码](../../eyes/src/vendor/modules/Unidentified953.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified953-js)

## `eyes/src/vendor/modules/Unidentified954.js`

Popper 浮层定位：按依赖拓扑和 read/main/write 阶段排序定位修饰器。[源码](../../eyes/src/vendor/modules/Unidentified954.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified954-js)

## `eyes/src/vendor/modules/Unidentified956.js`

Popper 浮层定位：把同一微任务前的重复请求合并为一个 Promise。[源码](../../eyes/src/vendor/modules/Unidentified956.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified956-js)

## `eyes/src/vendor/modules/Unidentified957.js`

Popper 浮层定位：按修饰器名称合并 options 和 data。[源码](../../eyes/src/vendor/modules/Unidentified957.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified957-js)

## `eyes/src/vendor/modules/Unidentified958.js`

Popper 浮层定位：比较参考或浮层边界与裁剪矩形，返回四边溢出量。[源码](../../eyes/src/vendor/modules/Unidentified958.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified958-js)

## `eyes/src/vendor/modules/Unidentified959.js`

Popper 浮层定位：求多个裁剪祖先与根边界矩形的交集。[源码](../../eyes/src/vendor/modules/Unidentified959.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified959-js)

## `eyes/src/vendor/modules/Unidentified960.js`

Popper 浮层定位：计算布局/视觉视口尺寸和偏移。[源码](../../eyes/src/vendor/modules/Unidentified960.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified960-js)

## `eyes/src/vendor/modules/Unidentified961.js`

Popper 浮层定位：计算完整文档滚动范围并补偿 RTL 横向位置。[源码](../../eyes/src/vendor/modules/Unidentified961.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified961-js)

## `eyes/src/vendor/modules/Unidentified962.js`

Popper 浮层定位：沿 Shadow DOM host 链执行包含关系判断。[源码](../../eyes/src/vendor/modules/Unidentified962.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified962-js)

## `eyes/src/vendor/modules/Unidentified963.js`

Popper 浮层定位：为 x/y/width/height 矩形补齐 top/right/bottom/left。[源码](../../eyes/src/vendor/modules/Unidentified963.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified963-js)

## `eyes/src/vendor/modules/Unidentified964.js`

Popper 浮层定位：根据 placement 和 start/end 对齐计算浮层位置。[源码](../../eyes/src/vendor/modules/Unidentified964.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified964-js)

## `eyes/src/vendor/modules/Unidentified965.js`

Popper 浮层定位：提取 placement 连字符前的方向。[源码](../../eyes/src/vendor/modules/Unidentified965.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified965-js)

## `eyes/src/vendor/modules/Unidentified966.js`

Popper 浮层定位：提取 placement 连字符后的 start/end 变化。[源码](../../eyes/src/vendor/modules/Unidentified966.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified966-js)

## `eyes/src/vendor/modules/Unidentified967.js`

Popper 浮层定位：将 top/bottom 映射到 x，left/right 映射到 y。[源码](../../eyes/src/vendor/modules/Unidentified967.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified967-js)

## `eyes/src/vendor/modules/Unidentified968.js`

Popper 浮层定位：用给定四边 padding 覆盖零值默认对象。[源码](../../eyes/src/vendor/modules/Unidentified968.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified968-js)

## `eyes/src/vendor/modules/Unidentified969.js`

Popper 浮层定位：创建上下左右全零的独立对象。[源码](../../eyes/src/vendor/modules/Unidentified969.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified969-js)

## `eyes/src/vendor/modules/Unidentified970.js`

Popper 浮层定位：将同一值分配给一组侧边键。[源码](../../eyes/src/vendor/modules/Unidentified970.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified970-js)

## `eyes/src/vendor/modules/Unidentified971.js`

Popper 浮层定位：注册滚动和 resize 更新监听并返回清理函数。[源码](../../eyes/src/vendor/modules/Unidentified971.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified971-js)

## `eyes/src/vendor/modules/Unidentified972.js`

Popper 浮层定位：在 read 阶段建立 popperOffsets 坐标。[源码](../../eyes/src/vendor/modules/Unidentified972.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified972-js)

## `eyes/src/vendor/modules/Unidentified975.js`

Popper 浮层定位：根据溢出程度切换首选方向及候选方向。[源码](../../eyes/src/vendor/modules/Unidentified975.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified975-js)

## `eyes/src/vendor/modules/Unidentified976.js`

Popper 浮层定位：交换 top/bottom 和 left/right。[源码](../../eyes/src/vendor/modules/Unidentified976.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified976-js)

## `eyes/src/vendor/modules/Unidentified977.js`

Popper 浮层定位：交换 start/end 对齐。[源码](../../eyes/src/vendor/modules/Unidentified977.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified977-js)

## `eyes/src/vendor/modules/Unidentified978.js`

Popper 浮层定位：按方向的溢出量排序自动定位候选。[源码](../../eyes/src/vendor/modules/Unidentified978.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified978-js)

## `eyes/src/vendor/modules/Unidentified979.js`

Popper 浮层定位：沿主轴/副轴约束浮层，结合 tether 保持参考联系。[源码](../../eyes/src/vendor/modules/Unidentified979.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified979-js)

## `eyes/src/vendor/modules/Unidentified980.js`

Popper 浮层定位：在 x 和 y 之间切换。[源码](../../eyes/src/vendor/modules/Unidentified980.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified980-js)

## `eyes/src/vendor/modules/Unidentified982.js`

Popper 浮层定位：计算箭头在浮层内的偏移及中心误差。[源码](../../eyes/src/vendor/modules/Unidentified982.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified982-js)

## `eyes/src/vendor/modules/Unidentified983.js`

Popper 浮层定位：识别参考被裁剪或浮层逃逸并设置 data 属性。[源码](../../eyes/src/vendor/modules/Unidentified983.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified983-js)

## `eyes/src/vendor/modules/Unidentified989.cjs`

第二份自定义滚动条实现，保留独立模块状态。[源码](../../eyes/src/vendor/modules/Unidentified989.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Unidentified989-cjs)

## `eyes/src/vendor/modules/UnrealBloomPass.js`

阈值提亮、多级分离高斯模糊与加权合成辉光。[源码](../../eyes/src/vendor/modules/UnrealBloomPass.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-UnrealBloomPass-js)

### `UnrealBloomPass`

阈值提亮、多级分离高斯模糊与加权合成辉光。父类 `Pass.Pass`。

- `constructor(e, strength=1, radius, threshold)` [源码:7](../../eyes/src/vendor/modules/UnrealBloomPass.js#L7)：当前操作：写入 _basic、_fsQuad、_oldClearAlpha、_oldClearColor、blendMaterial、bloomTintColors、clearColor、compositeMaterial、compositeMaterial.uniforms.bloomFactors.value、compositeMaterial.uniforms.bloomRadius.value、compositeMaterial.uniforms.bloomStrength.value、compositeMaterial.uniforms.bloomTintColors.value、compositeMaterial.uniforms.blurTexture1.value、compositeMaterial.uniforms.blurTexture2.value、compositeMaterial.uniforms.blurTexture3.value、compositeMaterial.uniforms.blurTexture4.value、compositeMaterial.uniforms.blurTexture5.value、copyUniforms、highPassUniforms、highPassUniforms.luminosityThreshold.value、highPassUniforms.smoothWidth.value、materialHighPassFilter、nMips、needsSwap、radius、renderTargetBright、renderTargetBright.texture.generateMipmaps、renderTargetBright.texture.name、renderTargetsHorizontal、renderTargetsVertical、resolution、separableBlurMaterials、separableBlurMaterials[e].uniforms.invSize.value、strength、threshold；返回 无显式返回。
- `dispose()` [源码:45](../../eyes/src/vendor/modules/UnrealBloomPass.js#L45)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `setSize(e, t)` [源码:52](../../eyes/src/vendor/modules/UnrealBloomPass.js#L52)：更新像素尺寸及关联目标；后处理链需要同步所有通道
- `render(e, t, n, r, i)` [源码:58](../../eyes/src/vendor/modules/UnrealBloomPass.js#L58)：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定
- `_getSeparableBlurMaterial(e)` [源码:66](../../eyes/src/vendor/modules/UnrealBloomPass.js#L66)：源码方法 _getSeparableBlurMaterial；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_getCompositeMaterial(e)` [源码:92](../../eyes/src/vendor/modules/UnrealBloomPass.js#L92)：源码方法 _getCompositeMaterial；作用以类职责与源码实现为准，未猜测压缩参数含义

## `eyes/src/vendor/modules/WorkerPool.js`

限制 worker 并发，排队分发任务并复用空闲 worker。[源码](../../eyes/src/vendor/modules/WorkerPool.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-WorkerPool-js)

### `WorkerPool`

限制 worker 并发，排队分发任务并复用空闲 worker。父类 `无`。

- `constructor(pool=4)` [源码:3](../../eyes/src/vendor/modules/WorkerPool.js#L3)：当前操作：写入 pool、queue、workerCreator、workerStatus、workers、workersResolve；返回 无显式返回。
- `_initWorker(e)` [源码:6](../../eyes/src/vendor/modules/WorkerPool.js#L6)：源码方法 _initWorker；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_getIdleWorker()` [源码:12](../../eyes/src/vendor/modules/WorkerPool.js#L12)：源码方法 _getIdleWorker；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_onMessage(e, t)` [源码:16](../../eyes/src/vendor/modules/WorkerPool.js#L16)：源码方法 _onMessage；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setWorkerCreator(workerCreator)` [源码:27](../../eyes/src/vendor/modules/WorkerPool.js#L27)：源码方法 setWorkerCreator；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setWorkerLimit(pool)` [源码:30](../../eyes/src/vendor/modules/WorkerPool.js#L30)：源码方法 setWorkerLimit；作用以类职责与源码实现为准，未猜测压缩参数含义
- `postMessage(e, t)` [源码:33](../../eyes/src/vendor/modules/WorkerPool.js#L33)：源码方法 postMessage；作用以类职责与源码实现为准，未猜测压缩参数含义
- `dispose()` [源码:43](../../eyes/src/vendor/modules/WorkerPool.js#L43)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

## `eyes/src/vendor/modules/ZSTDDecoder.js`

初始化内嵌 WASM 模块并解压 Zstandard 数据。[源码](../../eyes/src/vendor/modules/ZSTDDecoder.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-ZSTDDecoder-js)

### `ZSTDDecoder`

初始化内嵌 WASM 模块并解压 Zstandard 数据。父类 `无`。

- `init()` [源码:11](../../eyes/src/vendor/modules/ZSTDDecoder.js#L11)：初始化延迟资源和运行时能力；必须先完成再使用依赖资源的方法
- `_init(e)` [源码:14](../../eyes/src/vendor/modules/ZSTDDecoder.js#L14)：源码方法 _init；作用以类职责与源码实现为准，未猜测压缩参数含义
- `decode(e, t=0)` [源码:17](../../eyes/src/vendor/modules/ZSTDDecoder.js#L17)：解码压缩数据；保留输入类型和 decoder 初始化约束

## `eyes/src/vendor/modules/add.js`

提供 add、get、getNormalizedProjName、start、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/add.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-add-js)

## `eyes/src/vendor/modules/adjustAxisFromEnu.js`

提供 adjustAxisFromEnu、adjustAxisToEnu；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/adjustAxisFromEnu.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-adjustAxisFromEnu-js)

## `eyes/src/vendor/modules/afterMain-194.js`

提供 afterMain、afterRead、afterWrite、auto、basePlacements、beforeMain、beforeRead、beforeWrite、bottom、clippingParents、end、left、main、modifierPhases、placements、popper、read、reference、right、start、top、variationPlacements、viewport、write；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/afterMain-194.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-afterMain-194-js)

## `eyes/src/vendor/modules/afterMain-955.js`

提供 afterMain、afterRead、afterWrite、auto、basePlacements、beforeMain、beforeRead、beforeWrite、bottom、clippingParents、end、left、main、modifierPhases、placements、popper、read、reference、right、start、top、variationPlacements、viewport、write；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/afterMain-955.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-afterMain-955-js)

## `eyes/src/vendor/modules/animateCSSModeScroll.js`

提供 animateCSSModeScroll、deleteProps、extend、getComputedStyle、getTranslate、isObject、nextTick、now、setCSSProperty；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/animateCSSModeScroll.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-animateCSSModeScroll-js)

## `eyes/src/vendor/modules/animateFill-168.js`

提供 animateFill、createSingleton、delegate、followCursor、hideAll、inlinePositioning、roundArrow、sticky、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/animateFill-168.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-animateFill-168-js)

## `eyes/src/vendor/modules/animateFill-929.js`

提供 animateFill、createSingleton、delegate、followCursor、hideAll、inlinePositioning、roundArrow、sticky、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/animateFill-929.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-animateFill-929-js)

## `eyes/src/vendor/modules/applyGridShift.js`

提供 applyGridShift、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/applyGridShift.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-applyGridShift-js)

## `eyes/src/vendor/modules/applyProjectionDefaults.js`

提供 applyProjectionDefaults、d2r；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/applyProjectionDefaults.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-applyProjectionDefaults-js)

## `eyes/src/vendor/modules/applyStyles-173.js`

提供 applyStyles、arrow、computeStyles、createPopper、createPopperLite、defaultModifiers、detectOverflow、eventListeners、flip、hide、offset、popperGenerator、popperOffsets、preventOverflow；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/applyStyles-173.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-applyStyles-173-js)

## `eyes/src/vendor/modules/applyStyles-224.js`

提供 applyStyles、arrow、computeStyles、eventListeners、flip、hide、offset、popperOffsets、preventOverflow；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/applyStyles-224.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-applyStyles-224-js)

## `eyes/src/vendor/modules/applyStyles-934.js`

提供 applyStyles、arrow、computeStyles、createPopper、createPopperLite、defaultModifiers、detectOverflow、eventListeners、flip、hide、offset、popperGenerator、popperOffsets、preventOverflow；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/applyStyles-934.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-applyStyles-934-js)

## `eyes/src/vendor/modules/applyStyles-985.js`

提供 applyStyles、arrow、computeStyles、eventListeners、flip、hide、offset、popperOffsets、preventOverflow；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/applyStyles-985.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-applyStyles-985-js)

## `eyes/src/vendor/modules/buildPROJJSON.js`

提供 buildPROJJSON；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/buildPROJJSON.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-buildPROJJSON-js)

## `eyes/src/vendor/modules/clone.js`

提供 clone、retarget、retargetClip；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/clone.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-clone-js)

## `eyes/src/vendor/modules/compareDatums.js`

提供 compareDatums、geocentricFromWgs84、geocentricToGeodetic、geocentricToWgs84、geodeticToGeocentric；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/compareDatums.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-compareDatums-js)

## `eyes/src/vendor/modules/computeMikkTSpaceTangents.js`

提供 computeMikkTSpaceTangents、computeMorphedAttributes、deepCloneAttribute、deinterleaveAttribute、deinterleaveGeometry、estimateBytesUsed、interleaveAttributes、mergeAttributes、mergeGeometries、mergeGroups、mergeVertices、toCreasedNormals、toTrianglesDrawMode；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/computeMikkTSpaceTangents.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-computeMikkTSpaceTangents-js)

## `eyes/src/vendor/modules/createPopper-174.js`

提供 createPopper、detectOverflow、popperGenerator；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/createPopper-174.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-createPopper-174-js)

## `eyes/src/vendor/modules/createPopper-223.js`

提供 createPopper、defaultModifiers、detectOverflow、popperGenerator；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/createPopper-223.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-createPopper-223-js)

## `eyes/src/vendor/modules/createPopper-935.js`

提供 createPopper、detectOverflow、popperGenerator；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/createPopper-935.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-createPopper-935-js)

## `eyes/src/vendor/modules/createPopper-984.js`

提供 createPopper、defaultModifiers、detectOverflow、popperGenerator；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/createPopper-984.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-createPopper-984-js)

## `eyes/src/vendor/modules/dependsOn.js`

提供 dependsOn、init、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/dependsOn.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-dependsOn-js)

## `eyes/src/vendor/modules/detectWKTVersion.js`

提供 detectWKTVersion；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/detectWKTVersion.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-detectWKTVersion-js)

## `eyes/src/vendor/modules/distanceAndSkiddingToXY-213.js`

提供 distanceAndSkiddingToXY、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/distanceAndSkiddingToXY-213.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-distanceAndSkiddingToXY-213-js)

## `eyes/src/vendor/modules/distanceAndSkiddingToXY-974.js`

提供 distanceAndSkiddingToXY、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/distanceAndSkiddingToXY-974.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-distanceAndSkiddingToXY-974-js)

## `eyes/src/vendor/modules/eccentricity.js`

提供 eccentricity、sphere；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/eccentricity.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-eccentricity-js)

## `eyes/src/vendor/modules/extend.js`

提供 extend、getDocument、getWindow、ssrDocument、ssrWindow；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/extend.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-extend-js)

## `eyes/src/vendor/modules/forward-608.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-608.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-608-js)

## `eyes/src/vendor/modules/forward-614.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-614.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-614-js)

## `eyes/src/vendor/modules/forward-627.js`

实现 mgrs；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/forward-627.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-627-js)

## `eyes/src/vendor/modules/forward-629.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-629.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-629-js)

## `eyes/src/vendor/modules/forward-633.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-633.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-633-js)

## `eyes/src/vendor/modules/forward-644.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-644.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-644-js)

## `eyes/src/vendor/modules/forward-645.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-645.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-645-js)

## `eyes/src/vendor/modules/forward-647.js`

提供 forward、init、inverse、names、ssfn_、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-647.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-647-js)

## `eyes/src/vendor/modules/forward-648.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-648.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-648-js)

## `eyes/src/vendor/modules/forward-649.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-649.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-649-js)

## `eyes/src/vendor/modules/forward-650.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-650.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-650-js)

## `eyes/src/vendor/modules/forward-651.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-651.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-651-js)

## `eyes/src/vendor/modules/forward-652.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-652.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-652-js)

## `eyes/src/vendor/modules/forward-665.js`

提供 forward、init、inverse、names、phi1z、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-665.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-665-js)

## `eyes/src/vendor/modules/forward-667.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-667.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-667-js)

## `eyes/src/vendor/modules/forward-668.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-668.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-668-js)

## `eyes/src/vendor/modules/forward-670.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-670.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-670-js)

## `eyes/src/vendor/modules/forward-671.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-671.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-671-js)

## `eyes/src/vendor/modules/forward-672.js`

提供 forward、init、inverse、iterations、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-672.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-672-js)

## `eyes/src/vendor/modules/forward-673.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-673.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-673-js)

## `eyes/src/vendor/modules/forward-674.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-674.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-674-js)

## `eyes/src/vendor/modules/forward-675.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-675.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-675-js)

## `eyes/src/vendor/modules/forward-676.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-676.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-676-js)

## `eyes/src/vendor/modules/forward-677.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-677.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-677-js)

## `eyes/src/vendor/modules/forward-678.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-678.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-678-js)

## `eyes/src/vendor/modules/forward-679.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-679.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-679-js)

## `eyes/src/vendor/modules/forward-681.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-681.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-681-js)

## `eyes/src/vendor/modules/forward-682.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-682.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-682-js)

## `eyes/src/vendor/modules/forward-683.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-683.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-683-js)

## `eyes/src/vendor/modules/forward-684.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-684.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-684-js)

## `eyes/src/vendor/modules/forward-685.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-685.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-685-js)

## `eyes/src/vendor/modules/forward-687.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-687.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-687-js)

## `eyes/src/vendor/modules/forward-689.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/forward-689.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-forward-689-js)

## `eyes/src/vendor/modules/getBrowser.js`

提供 getBrowser；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/getBrowser.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-getBrowser-js)

## `eyes/src/vendor/modules/getDevice.js`

提供 getDevice；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/getDevice.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-getDevice-js)

## `eyes/src/vendor/modules/getNadgrids.js`

实现 nadgrid；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/getNadgrids.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-getNadgrids-js)

## `eyes/src/vendor/modules/getSupport.js`

提供 getSupport；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/getSupport.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-getSupport-js)

## `eyes/src/vendor/modules/init-686.js`

提供 init、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/init-686.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-init-686-js)

## `eyes/src/vendor/modules/init-688.js`

提供 init、names、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/init-688.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-init-688-js)

## `eyes/src/vendor/modules/isElement-171.js`

提供 isElement、isHTMLElement、isShadowRoot；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/isElement-171.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-isElement-171-js)

## `eyes/src/vendor/modules/isElement-932.js`

提供 isElement、isHTMLElement、isShadowRoot；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/isElement-932.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-isElement-932-js)

## `eyes/src/vendor/modules/mapToStyles-212.js`

提供 mapToStyles、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/mapToStyles-212.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-mapToStyles-212-js)

## `eyes/src/vendor/modules/mapToStyles-973.js`

提供 mapToStyles、default；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/mapToStyles-973.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-mapToStyles-973-js)

## `eyes/src/vendor/modules/max-177.js`

提供 max、min、round；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/max-177.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-max-177-js)

## `eyes/src/vendor/modules/max-938.js`

提供 max、min、round；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/max-938.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-max-938-js)

## `eyes/src/vendor/modules/sExpr.js`

提供 sExpr；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/sExpr.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-sExpr-js)

## `eyes/src/vendor/modules/transformInternal.js`

实现 transform；调用方以这些语义键装配模块。[源码](../../eyes/src/vendor/modules/transformInternal.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-transformInternal-js)

## `eyes/src/vendor/modules/transformPROJJSON.js`

提供 transformPROJJSON；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/transformPROJJSON.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-transformPROJJSON-js)

## `eyes/src/vendor/modules/vincentyDirect.js`

提供 vincentyDirect、vincentyInverse；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/vincentyDirect.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-vincentyDirect-js)

## `eyes/src/vendor/modules/within-220.js`

提供 within、withinMaxClamp；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/within-220.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-within-220-js)

## `eyes/src/vendor/modules/within-981.js`

提供 within、withinMaxClamp；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/within-981.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-within-981-js)

## `eyes/src/vendor/moment/primary/locale/af.cjs`

Moment primary 独立实例的 af 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/af.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-af-cjs)

## `eyes/src/vendor/moment/primary/locale/ar-dz.cjs`

Moment primary 独立实例的 ar-dz 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ar-dz.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ar-dz-cjs)

## `eyes/src/vendor/moment/primary/locale/ar-kw.cjs`

Moment primary 独立实例的 ar-kw 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ar-kw.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ar-kw-cjs)

## `eyes/src/vendor/moment/primary/locale/ar-ly.cjs`

Moment primary 独立实例的 ar-ly 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ar-ly.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ar-ly-cjs)

## `eyes/src/vendor/moment/primary/locale/ar-ma.cjs`

Moment primary 独立实例的 ar-ma 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ar-ma.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ar-ma-cjs)

## `eyes/src/vendor/moment/primary/locale/ar-sa.cjs`

Moment primary 独立实例的 ar-sa 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ar-sa.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ar-sa-cjs)

## `eyes/src/vendor/moment/primary/locale/ar-tn.cjs`

Moment primary 独立实例的 ar-tn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ar-tn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ar-tn-cjs)

## `eyes/src/vendor/moment/primary/locale/ar.cjs`

Moment primary 独立实例的 ar 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ar.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ar-cjs)

## `eyes/src/vendor/moment/primary/locale/az.cjs`

Moment primary 独立实例的 az 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/az.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-az-cjs)

## `eyes/src/vendor/moment/primary/locale/be.cjs`

Moment primary 独立实例的 be 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/be.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-be-cjs)

## `eyes/src/vendor/moment/primary/locale/bg.cjs`

Moment primary 独立实例的 bg 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/bg.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-bg-cjs)

## `eyes/src/vendor/moment/primary/locale/bm.cjs`

Moment primary 独立实例的 bm 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/bm.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-bm-cjs)

## `eyes/src/vendor/moment/primary/locale/bn-bd.cjs`

Moment primary 独立实例的 bn-bd 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/bn-bd.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-bn-bd-cjs)

## `eyes/src/vendor/moment/primary/locale/bn.cjs`

Moment primary 独立实例的 bn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/bn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-bn-cjs)

## `eyes/src/vendor/moment/primary/locale/bo.cjs`

Moment primary 独立实例的 bo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/bo.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-bo-cjs)

## `eyes/src/vendor/moment/primary/locale/br.cjs`

Moment primary 独立实例的 br 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/br.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-br-cjs)

## `eyes/src/vendor/moment/primary/locale/bs.cjs`

Moment primary 独立实例的 bs 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/bs.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-bs-cjs)

## `eyes/src/vendor/moment/primary/locale/ca.cjs`

Moment primary 独立实例的 ca 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ca.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ca-cjs)

## `eyes/src/vendor/moment/primary/locale/cs.cjs`

Moment primary 独立实例的 cs 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/cs.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-cs-cjs)

## `eyes/src/vendor/moment/primary/locale/cv.cjs`

Moment primary 独立实例的 cv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/cv.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-cv-cjs)

## `eyes/src/vendor/moment/primary/locale/cy.cjs`

Moment primary 独立实例的 cy 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/cy.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-cy-cjs)

## `eyes/src/vendor/moment/primary/locale/da.cjs`

Moment primary 独立实例的 da 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/da.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-da-cjs)

## `eyes/src/vendor/moment/primary/locale/de-at.cjs`

Moment primary 独立实例的 de-at 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/de-at.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-de-at-cjs)

## `eyes/src/vendor/moment/primary/locale/de-ch.cjs`

Moment primary 独立实例的 de-ch 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/de-ch.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-de-ch-cjs)

## `eyes/src/vendor/moment/primary/locale/de.cjs`

Moment primary 独立实例的 de 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/de.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-de-cjs)

## `eyes/src/vendor/moment/primary/locale/dv.cjs`

Moment primary 独立实例的 dv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/dv.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-dv-cjs)

## `eyes/src/vendor/moment/primary/locale/el.cjs`

Moment primary 独立实例的 el 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/el.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-el-cjs)

## `eyes/src/vendor/moment/primary/locale/en-au.cjs`

Moment primary 独立实例的 en-au 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/en-au.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-en-au-cjs)

## `eyes/src/vendor/moment/primary/locale/en-ca.cjs`

Moment primary 独立实例的 en-ca 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/en-ca.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-en-ca-cjs)

## `eyes/src/vendor/moment/primary/locale/en-gb.cjs`

Moment primary 独立实例的 en-gb 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/en-gb.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-en-gb-cjs)

## `eyes/src/vendor/moment/primary/locale/en-ie.cjs`

Moment primary 独立实例的 en-ie 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/en-ie.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-en-ie-cjs)

## `eyes/src/vendor/moment/primary/locale/en-il.cjs`

Moment primary 独立实例的 en-il 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/en-il.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-en-il-cjs)

## `eyes/src/vendor/moment/primary/locale/en-in.cjs`

Moment primary 独立实例的 en-in 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/en-in.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-en-in-cjs)

## `eyes/src/vendor/moment/primary/locale/en-nz.cjs`

Moment primary 独立实例的 en-nz 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/en-nz.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-en-nz-cjs)

## `eyes/src/vendor/moment/primary/locale/en-sg.cjs`

Moment primary 独立实例的 en-sg 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/en-sg.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-en-sg-cjs)

## `eyes/src/vendor/moment/primary/locale/eo.cjs`

Moment primary 独立实例的 eo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/eo.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-eo-cjs)

## `eyes/src/vendor/moment/primary/locale/es-do.cjs`

Moment primary 独立实例的 es-do 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/es-do.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-es-do-cjs)

## `eyes/src/vendor/moment/primary/locale/es-mx.cjs`

Moment primary 独立实例的 es-mx 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/es-mx.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-es-mx-cjs)

## `eyes/src/vendor/moment/primary/locale/es-us.cjs`

Moment primary 独立实例的 es-us 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/es-us.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-es-us-cjs)

## `eyes/src/vendor/moment/primary/locale/es.cjs`

Moment primary 独立实例的 es 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/es.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-es-cjs)

## `eyes/src/vendor/moment/primary/locale/et.cjs`

Moment primary 独立实例的 et 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/et.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-et-cjs)

## `eyes/src/vendor/moment/primary/locale/eu.cjs`

Moment primary 独立实例的 eu 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/eu.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-eu-cjs)

## `eyes/src/vendor/moment/primary/locale/fa.cjs`

Moment primary 独立实例的 fa 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/fa.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-fa-cjs)

## `eyes/src/vendor/moment/primary/locale/fi.cjs`

Moment primary 独立实例的 fi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/fi.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-fi-cjs)

## `eyes/src/vendor/moment/primary/locale/fil.cjs`

Moment primary 独立实例的 fil 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/fil.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-fil-cjs)

## `eyes/src/vendor/moment/primary/locale/fo.cjs`

Moment primary 独立实例的 fo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/fo.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-fo-cjs)

## `eyes/src/vendor/moment/primary/locale/fr-ca.cjs`

Moment primary 独立实例的 fr-ca 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/fr-ca.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-fr-ca-cjs)

## `eyes/src/vendor/moment/primary/locale/fr-ch.cjs`

Moment primary 独立实例的 fr-ch 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/fr-ch.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-fr-ch-cjs)

## `eyes/src/vendor/moment/primary/locale/fr.cjs`

Moment primary 独立实例的 fr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/fr.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-fr-cjs)

## `eyes/src/vendor/moment/primary/locale/fy.cjs`

Moment primary 独立实例的 fy 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/fy.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-fy-cjs)

## `eyes/src/vendor/moment/primary/locale/ga.cjs`

Moment primary 独立实例的 ga 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ga.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ga-cjs)

## `eyes/src/vendor/moment/primary/locale/gd.cjs`

Moment primary 独立实例的 gd 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/gd.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-gd-cjs)

## `eyes/src/vendor/moment/primary/locale/gl.cjs`

Moment primary 独立实例的 gl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/gl.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-gl-cjs)

## `eyes/src/vendor/moment/primary/locale/gom-deva.cjs`

Moment primary 独立实例的 gom-deva 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/gom-deva.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-gom-deva-cjs)

## `eyes/src/vendor/moment/primary/locale/gom-latn.cjs`

Moment primary 独立实例的 gom-latn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/gom-latn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-gom-latn-cjs)

## `eyes/src/vendor/moment/primary/locale/gu.cjs`

Moment primary 独立实例的 gu 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/gu.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-gu-cjs)

## `eyes/src/vendor/moment/primary/locale/he.cjs`

Moment primary 独立实例的 he 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/he.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-he-cjs)

## `eyes/src/vendor/moment/primary/locale/hi.cjs`

Moment primary 独立实例的 hi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/hi.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-hi-cjs)

## `eyes/src/vendor/moment/primary/locale/hr.cjs`

Moment primary 独立实例的 hr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/hr.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-hr-cjs)

## `eyes/src/vendor/moment/primary/locale/hu.cjs`

Moment primary 独立实例的 hu 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/hu.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-hu-cjs)

## `eyes/src/vendor/moment/primary/locale/hy-am.cjs`

Moment primary 独立实例的 hy-am 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/hy-am.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-hy-am-cjs)

## `eyes/src/vendor/moment/primary/locale/id.cjs`

Moment primary 独立实例的 id 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/id.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-id-cjs)

## `eyes/src/vendor/moment/primary/locale/is.cjs`

Moment primary 独立实例的 is 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/is.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-is-cjs)

## `eyes/src/vendor/moment/primary/locale/it-ch.cjs`

Moment primary 独立实例的 it-ch 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/it-ch.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-it-ch-cjs)

## `eyes/src/vendor/moment/primary/locale/it.cjs`

Moment primary 独立实例的 it 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/it.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-it-cjs)

## `eyes/src/vendor/moment/primary/locale/ja.cjs`

Moment primary 独立实例的 ja 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ja.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ja-cjs)

## `eyes/src/vendor/moment/primary/locale/jv.cjs`

Moment primary 独立实例的 jv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/jv.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-jv-cjs)

## `eyes/src/vendor/moment/primary/locale/ka.cjs`

Moment primary 独立实例的 ka 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ka.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ka-cjs)

## `eyes/src/vendor/moment/primary/locale/kk.cjs`

Moment primary 独立实例的 kk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/kk.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-kk-cjs)

## `eyes/src/vendor/moment/primary/locale/km.cjs`

Moment primary 独立实例的 km 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/km.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-km-cjs)

## `eyes/src/vendor/moment/primary/locale/kn.cjs`

Moment primary 独立实例的 kn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/kn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-kn-cjs)

## `eyes/src/vendor/moment/primary/locale/ko.cjs`

Moment primary 独立实例的 ko 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ko.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ko-cjs)

## `eyes/src/vendor/moment/primary/locale/ku.cjs`

Moment primary 独立实例的 ku 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ku.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ku-cjs)

## `eyes/src/vendor/moment/primary/locale/ky.cjs`

Moment primary 独立实例的 ky 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ky.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ky-cjs)

## `eyes/src/vendor/moment/primary/locale/lb.cjs`

Moment primary 独立实例的 lb 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/lb.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-lb-cjs)

## `eyes/src/vendor/moment/primary/locale/lo.cjs`

Moment primary 独立实例的 lo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/lo.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-lo-cjs)

## `eyes/src/vendor/moment/primary/locale/lt.cjs`

Moment primary 独立实例的 lt 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/lt.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-lt-cjs)

## `eyes/src/vendor/moment/primary/locale/lv.cjs`

Moment primary 独立实例的 lv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/lv.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-lv-cjs)

## `eyes/src/vendor/moment/primary/locale/me.cjs`

Moment primary 独立实例的 me 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/me.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-me-cjs)

## `eyes/src/vendor/moment/primary/locale/mi.cjs`

Moment primary 独立实例的 mi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/mi.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-mi-cjs)

## `eyes/src/vendor/moment/primary/locale/mk.cjs`

Moment primary 独立实例的 mk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/mk.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-mk-cjs)

## `eyes/src/vendor/moment/primary/locale/ml.cjs`

Moment primary 独立实例的 ml 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ml.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ml-cjs)

## `eyes/src/vendor/moment/primary/locale/mn.cjs`

Moment primary 独立实例的 mn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/mn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-mn-cjs)

## `eyes/src/vendor/moment/primary/locale/mr.cjs`

Moment primary 独立实例的 mr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/mr.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-mr-cjs)

## `eyes/src/vendor/moment/primary/locale/ms-my.cjs`

Moment primary 独立实例的 ms-my 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ms-my.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ms-my-cjs)

## `eyes/src/vendor/moment/primary/locale/ms.cjs`

Moment primary 独立实例的 ms 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ms.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ms-cjs)

## `eyes/src/vendor/moment/primary/locale/mt.cjs`

Moment primary 独立实例的 mt 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/mt.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-mt-cjs)

## `eyes/src/vendor/moment/primary/locale/my.cjs`

Moment primary 独立实例的 my 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/my.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-my-cjs)

## `eyes/src/vendor/moment/primary/locale/nb.cjs`

Moment primary 独立实例的 nb 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/nb.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-nb-cjs)

## `eyes/src/vendor/moment/primary/locale/ne.cjs`

Moment primary 独立实例的 ne 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ne.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ne-cjs)

## `eyes/src/vendor/moment/primary/locale/nl-be.cjs`

Moment primary 独立实例的 nl-be 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/nl-be.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-nl-be-cjs)

## `eyes/src/vendor/moment/primary/locale/nl.cjs`

Moment primary 独立实例的 nl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/nl.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-nl-cjs)

## `eyes/src/vendor/moment/primary/locale/nn.cjs`

Moment primary 独立实例的 nn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/nn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-nn-cjs)

## `eyes/src/vendor/moment/primary/locale/oc-lnc.cjs`

Moment primary 独立实例的 oc-lnc 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/oc-lnc.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-oc-lnc-cjs)

## `eyes/src/vendor/moment/primary/locale/pa-in.cjs`

Moment primary 独立实例的 pa-in 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/pa-in.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-pa-in-cjs)

## `eyes/src/vendor/moment/primary/locale/pl.cjs`

Moment primary 独立实例的 pl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/pl.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-pl-cjs)

## `eyes/src/vendor/moment/primary/locale/pt-br.cjs`

Moment primary 独立实例的 pt-br 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/pt-br.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-pt-br-cjs)

## `eyes/src/vendor/moment/primary/locale/pt.cjs`

Moment primary 独立实例的 pt 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/pt.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-pt-cjs)

## `eyes/src/vendor/moment/primary/locale/ro.cjs`

Moment primary 独立实例的 ro 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ro.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ro-cjs)

## `eyes/src/vendor/moment/primary/locale/ru.cjs`

Moment primary 独立实例的 ru 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ru.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ru-cjs)

## `eyes/src/vendor/moment/primary/locale/sd.cjs`

Moment primary 独立实例的 sd 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/sd.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-sd-cjs)

## `eyes/src/vendor/moment/primary/locale/se.cjs`

Moment primary 独立实例的 se 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/se.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-se-cjs)

## `eyes/src/vendor/moment/primary/locale/si.cjs`

Moment primary 独立实例的 si 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/si.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-si-cjs)

## `eyes/src/vendor/moment/primary/locale/sk.cjs`

Moment primary 独立实例的 sk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/sk.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-sk-cjs)

## `eyes/src/vendor/moment/primary/locale/sl.cjs`

Moment primary 独立实例的 sl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/sl.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-sl-cjs)

## `eyes/src/vendor/moment/primary/locale/sq.cjs`

Moment primary 独立实例的 sq 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/sq.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-sq-cjs)

## `eyes/src/vendor/moment/primary/locale/sr-cyrl.cjs`

Moment primary 独立实例的 sr-cyrl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/sr-cyrl.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-sr-cyrl-cjs)

## `eyes/src/vendor/moment/primary/locale/sr.cjs`

Moment primary 独立实例的 sr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/sr.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-sr-cjs)

## `eyes/src/vendor/moment/primary/locale/ss.cjs`

Moment primary 独立实例的 ss 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ss.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ss-cjs)

## `eyes/src/vendor/moment/primary/locale/sv.cjs`

Moment primary 独立实例的 sv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/sv.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-sv-cjs)

## `eyes/src/vendor/moment/primary/locale/sw.cjs`

Moment primary 独立实例的 sw 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/sw.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-sw-cjs)

## `eyes/src/vendor/moment/primary/locale/ta.cjs`

Moment primary 独立实例的 ta 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ta.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ta-cjs)

## `eyes/src/vendor/moment/primary/locale/te.cjs`

Moment primary 独立实例的 te 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/te.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-te-cjs)

## `eyes/src/vendor/moment/primary/locale/tet.cjs`

Moment primary 独立实例的 tet 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/tet.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-tet-cjs)

## `eyes/src/vendor/moment/primary/locale/tg.cjs`

Moment primary 独立实例的 tg 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/tg.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-tg-cjs)

## `eyes/src/vendor/moment/primary/locale/th.cjs`

Moment primary 独立实例的 th 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/th.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-th-cjs)

## `eyes/src/vendor/moment/primary/locale/tk.cjs`

Moment primary 独立实例的 tk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/tk.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-tk-cjs)

## `eyes/src/vendor/moment/primary/locale/tl-ph.cjs`

Moment primary 独立实例的 tl-ph 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/tl-ph.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-tl-ph-cjs)

## `eyes/src/vendor/moment/primary/locale/tlh.cjs`

Moment primary 独立实例的 tlh 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/tlh.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-tlh-cjs)

## `eyes/src/vendor/moment/primary/locale/tr.cjs`

Moment primary 独立实例的 tr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/tr.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-tr-cjs)

## `eyes/src/vendor/moment/primary/locale/tzl.cjs`

Moment primary 独立实例的 tzl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/tzl.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-tzl-cjs)

## `eyes/src/vendor/moment/primary/locale/tzm-latn.cjs`

Moment primary 独立实例的 tzm-latn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/tzm-latn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-tzm-latn-cjs)

## `eyes/src/vendor/moment/primary/locale/tzm.cjs`

Moment primary 独立实例的 tzm 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/tzm.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-tzm-cjs)

## `eyes/src/vendor/moment/primary/locale/ug-cn.cjs`

Moment primary 独立实例的 ug-cn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ug-cn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ug-cn-cjs)

## `eyes/src/vendor/moment/primary/locale/uk.cjs`

Moment primary 独立实例的 uk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/uk.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-uk-cjs)

## `eyes/src/vendor/moment/primary/locale/ur.cjs`

Moment primary 独立实例的 ur 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/ur.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-ur-cjs)

## `eyes/src/vendor/moment/primary/locale/uz-latn.cjs`

Moment primary 独立实例的 uz-latn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/uz-latn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-uz-latn-cjs)

## `eyes/src/vendor/moment/primary/locale/uz.cjs`

Moment primary 独立实例的 uz 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/uz.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-uz-cjs)

## `eyes/src/vendor/moment/primary/locale/vi.cjs`

Moment primary 独立实例的 vi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/vi.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-vi-cjs)

## `eyes/src/vendor/moment/primary/locale/x-pseudo.cjs`

Moment primary 独立实例的 x-pseudo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/x-pseudo.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-x-pseudo-cjs)

## `eyes/src/vendor/moment/primary/locale/yo.cjs`

Moment primary 独立实例的 yo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/yo.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-yo-cjs)

## `eyes/src/vendor/moment/primary/locale/zh-cn.cjs`

Moment primary 独立实例的 zh-cn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/zh-cn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-zh-cn-cjs)

## `eyes/src/vendor/moment/primary/locale/zh-hk.cjs`

Moment primary 独立实例的 zh-hk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/zh-hk.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-zh-hk-cjs)

## `eyes/src/vendor/moment/primary/locale/zh-mo.cjs`

Moment primary 独立实例的 zh-mo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/zh-mo.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-zh-mo-cjs)

## `eyes/src/vendor/moment/primary/locale/zh-tw.cjs`

Moment primary 独立实例的 zh-tw 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/primary/locale/zh-tw.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-primary-locale-zh-tw-cjs)

## `eyes/src/vendor/moment/secondary/locale/af.cjs`

Moment secondary 独立实例的 af 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/af.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-af-cjs)

## `eyes/src/vendor/moment/secondary/locale/ar-dz.cjs`

Moment secondary 独立实例的 ar-dz 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ar-dz.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ar-dz-cjs)

## `eyes/src/vendor/moment/secondary/locale/ar-kw.cjs`

Moment secondary 独立实例的 ar-kw 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ar-kw.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ar-kw-cjs)

## `eyes/src/vendor/moment/secondary/locale/ar-ly.cjs`

Moment secondary 独立实例的 ar-ly 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ar-ly.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ar-ly-cjs)

## `eyes/src/vendor/moment/secondary/locale/ar-ma.cjs`

Moment secondary 独立实例的 ar-ma 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ar-ma.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ar-ma-cjs)

## `eyes/src/vendor/moment/secondary/locale/ar-sa.cjs`

Moment secondary 独立实例的 ar-sa 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ar-sa.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ar-sa-cjs)

## `eyes/src/vendor/moment/secondary/locale/ar-tn.cjs`

Moment secondary 独立实例的 ar-tn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ar-tn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ar-tn-cjs)

## `eyes/src/vendor/moment/secondary/locale/ar.cjs`

Moment secondary 独立实例的 ar 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ar.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ar-cjs)

## `eyes/src/vendor/moment/secondary/locale/az.cjs`

Moment secondary 独立实例的 az 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/az.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-az-cjs)

## `eyes/src/vendor/moment/secondary/locale/be.cjs`

Moment secondary 独立实例的 be 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/be.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-be-cjs)

## `eyes/src/vendor/moment/secondary/locale/bg.cjs`

Moment secondary 独立实例的 bg 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/bg.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-bg-cjs)

## `eyes/src/vendor/moment/secondary/locale/bm.cjs`

Moment secondary 独立实例的 bm 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/bm.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-bm-cjs)

## `eyes/src/vendor/moment/secondary/locale/bn-bd.cjs`

Moment secondary 独立实例的 bn-bd 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/bn-bd.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-bn-bd-cjs)

## `eyes/src/vendor/moment/secondary/locale/bn.cjs`

Moment secondary 独立实例的 bn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/bn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-bn-cjs)

## `eyes/src/vendor/moment/secondary/locale/bo.cjs`

Moment secondary 独立实例的 bo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/bo.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-bo-cjs)

## `eyes/src/vendor/moment/secondary/locale/br.cjs`

Moment secondary 独立实例的 br 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/br.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-br-cjs)

## `eyes/src/vendor/moment/secondary/locale/bs.cjs`

Moment secondary 独立实例的 bs 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/bs.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-bs-cjs)

## `eyes/src/vendor/moment/secondary/locale/ca.cjs`

Moment secondary 独立实例的 ca 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ca.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ca-cjs)

## `eyes/src/vendor/moment/secondary/locale/cs.cjs`

Moment secondary 独立实例的 cs 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/cs.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-cs-cjs)

## `eyes/src/vendor/moment/secondary/locale/cv.cjs`

Moment secondary 独立实例的 cv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/cv.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-cv-cjs)

## `eyes/src/vendor/moment/secondary/locale/cy.cjs`

Moment secondary 独立实例的 cy 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/cy.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-cy-cjs)

## `eyes/src/vendor/moment/secondary/locale/da.cjs`

Moment secondary 独立实例的 da 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/da.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-da-cjs)

## `eyes/src/vendor/moment/secondary/locale/de-at.cjs`

Moment secondary 独立实例的 de-at 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/de-at.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-de-at-cjs)

## `eyes/src/vendor/moment/secondary/locale/de-ch.cjs`

Moment secondary 独立实例的 de-ch 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/de-ch.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-de-ch-cjs)

## `eyes/src/vendor/moment/secondary/locale/de.cjs`

Moment secondary 独立实例的 de 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/de.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-de-cjs)

## `eyes/src/vendor/moment/secondary/locale/dv.cjs`

Moment secondary 独立实例的 dv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/dv.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-dv-cjs)

## `eyes/src/vendor/moment/secondary/locale/el.cjs`

Moment secondary 独立实例的 el 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/el.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-el-cjs)

## `eyes/src/vendor/moment/secondary/locale/en-au.cjs`

Moment secondary 独立实例的 en-au 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/en-au.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-en-au-cjs)

## `eyes/src/vendor/moment/secondary/locale/en-ca.cjs`

Moment secondary 独立实例的 en-ca 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/en-ca.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-en-ca-cjs)

## `eyes/src/vendor/moment/secondary/locale/en-gb.cjs`

Moment secondary 独立实例的 en-gb 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/en-gb.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-en-gb-cjs)

## `eyes/src/vendor/moment/secondary/locale/en-ie.cjs`

Moment secondary 独立实例的 en-ie 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/en-ie.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-en-ie-cjs)

## `eyes/src/vendor/moment/secondary/locale/en-il.cjs`

Moment secondary 独立实例的 en-il 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/en-il.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-en-il-cjs)

## `eyes/src/vendor/moment/secondary/locale/en-in.cjs`

Moment secondary 独立实例的 en-in 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/en-in.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-en-in-cjs)

## `eyes/src/vendor/moment/secondary/locale/en-nz.cjs`

Moment secondary 独立实例的 en-nz 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/en-nz.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-en-nz-cjs)

## `eyes/src/vendor/moment/secondary/locale/en-sg.cjs`

Moment secondary 独立实例的 en-sg 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/en-sg.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-en-sg-cjs)

## `eyes/src/vendor/moment/secondary/locale/eo.cjs`

Moment secondary 独立实例的 eo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/eo.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-eo-cjs)

## `eyes/src/vendor/moment/secondary/locale/es-do.cjs`

Moment secondary 独立实例的 es-do 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/es-do.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-es-do-cjs)

## `eyes/src/vendor/moment/secondary/locale/es-mx.cjs`

Moment secondary 独立实例的 es-mx 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/es-mx.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-es-mx-cjs)

## `eyes/src/vendor/moment/secondary/locale/es-us.cjs`

Moment secondary 独立实例的 es-us 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/es-us.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-es-us-cjs)

## `eyes/src/vendor/moment/secondary/locale/es.cjs`

Moment secondary 独立实例的 es 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/es.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-es-cjs)

## `eyes/src/vendor/moment/secondary/locale/et.cjs`

Moment secondary 独立实例的 et 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/et.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-et-cjs)

## `eyes/src/vendor/moment/secondary/locale/eu.cjs`

Moment secondary 独立实例的 eu 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/eu.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-eu-cjs)

## `eyes/src/vendor/moment/secondary/locale/fa.cjs`

Moment secondary 独立实例的 fa 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/fa.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-fa-cjs)

## `eyes/src/vendor/moment/secondary/locale/fi.cjs`

Moment secondary 独立实例的 fi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/fi.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-fi-cjs)

## `eyes/src/vendor/moment/secondary/locale/fil.cjs`

Moment secondary 独立实例的 fil 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/fil.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-fil-cjs)

## `eyes/src/vendor/moment/secondary/locale/fo.cjs`

Moment secondary 独立实例的 fo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/fo.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-fo-cjs)

## `eyes/src/vendor/moment/secondary/locale/fr-ca.cjs`

Moment secondary 独立实例的 fr-ca 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/fr-ca.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-fr-ca-cjs)

## `eyes/src/vendor/moment/secondary/locale/fr-ch.cjs`

Moment secondary 独立实例的 fr-ch 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/fr-ch.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-fr-ch-cjs)

## `eyes/src/vendor/moment/secondary/locale/fr.cjs`

Moment secondary 独立实例的 fr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/fr.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-fr-cjs)

## `eyes/src/vendor/moment/secondary/locale/fy.cjs`

Moment secondary 独立实例的 fy 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/fy.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-fy-cjs)

## `eyes/src/vendor/moment/secondary/locale/ga.cjs`

Moment secondary 独立实例的 ga 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ga.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ga-cjs)

## `eyes/src/vendor/moment/secondary/locale/gd.cjs`

Moment secondary 独立实例的 gd 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/gd.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-gd-cjs)

## `eyes/src/vendor/moment/secondary/locale/gl.cjs`

Moment secondary 独立实例的 gl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/gl.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-gl-cjs)

## `eyes/src/vendor/moment/secondary/locale/gom-deva.cjs`

Moment secondary 独立实例的 gom-deva 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/gom-deva.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-gom-deva-cjs)

## `eyes/src/vendor/moment/secondary/locale/gom-latn.cjs`

Moment secondary 独立实例的 gom-latn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/gom-latn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-gom-latn-cjs)

## `eyes/src/vendor/moment/secondary/locale/gu.cjs`

Moment secondary 独立实例的 gu 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/gu.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-gu-cjs)

## `eyes/src/vendor/moment/secondary/locale/he.cjs`

Moment secondary 独立实例的 he 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/he.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-he-cjs)

## `eyes/src/vendor/moment/secondary/locale/hi.cjs`

Moment secondary 独立实例的 hi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/hi.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-hi-cjs)

## `eyes/src/vendor/moment/secondary/locale/hr.cjs`

Moment secondary 独立实例的 hr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/hr.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-hr-cjs)

## `eyes/src/vendor/moment/secondary/locale/hu.cjs`

Moment secondary 独立实例的 hu 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/hu.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-hu-cjs)

## `eyes/src/vendor/moment/secondary/locale/hy-am.cjs`

Moment secondary 独立实例的 hy-am 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/hy-am.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-hy-am-cjs)

## `eyes/src/vendor/moment/secondary/locale/id.cjs`

Moment secondary 独立实例的 id 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/id.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-id-cjs)

## `eyes/src/vendor/moment/secondary/locale/is.cjs`

Moment secondary 独立实例的 is 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/is.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-is-cjs)

## `eyes/src/vendor/moment/secondary/locale/it-ch.cjs`

Moment secondary 独立实例的 it-ch 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/it-ch.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-it-ch-cjs)

## `eyes/src/vendor/moment/secondary/locale/it.cjs`

Moment secondary 独立实例的 it 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/it.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-it-cjs)

## `eyes/src/vendor/moment/secondary/locale/ja.cjs`

Moment secondary 独立实例的 ja 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ja.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ja-cjs)

## `eyes/src/vendor/moment/secondary/locale/jv.cjs`

Moment secondary 独立实例的 jv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/jv.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-jv-cjs)

## `eyes/src/vendor/moment/secondary/locale/ka.cjs`

Moment secondary 独立实例的 ka 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ka.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ka-cjs)

## `eyes/src/vendor/moment/secondary/locale/kk.cjs`

Moment secondary 独立实例的 kk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/kk.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-kk-cjs)

## `eyes/src/vendor/moment/secondary/locale/km.cjs`

Moment secondary 独立实例的 km 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/km.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-km-cjs)

## `eyes/src/vendor/moment/secondary/locale/kn.cjs`

Moment secondary 独立实例的 kn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/kn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-kn-cjs)

## `eyes/src/vendor/moment/secondary/locale/ko.cjs`

Moment secondary 独立实例的 ko 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ko.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ko-cjs)

## `eyes/src/vendor/moment/secondary/locale/ku.cjs`

Moment secondary 独立实例的 ku 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ku.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ku-cjs)

## `eyes/src/vendor/moment/secondary/locale/ky.cjs`

Moment secondary 独立实例的 ky 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ky.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ky-cjs)

## `eyes/src/vendor/moment/secondary/locale/lb.cjs`

Moment secondary 独立实例的 lb 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/lb.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-lb-cjs)

## `eyes/src/vendor/moment/secondary/locale/lo.cjs`

Moment secondary 独立实例的 lo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/lo.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-lo-cjs)

## `eyes/src/vendor/moment/secondary/locale/lt.cjs`

Moment secondary 独立实例的 lt 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/lt.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-lt-cjs)

## `eyes/src/vendor/moment/secondary/locale/lv.cjs`

Moment secondary 独立实例的 lv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/lv.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-lv-cjs)

## `eyes/src/vendor/moment/secondary/locale/me.cjs`

Moment secondary 独立实例的 me 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/me.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-me-cjs)

## `eyes/src/vendor/moment/secondary/locale/mi.cjs`

Moment secondary 独立实例的 mi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/mi.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-mi-cjs)

## `eyes/src/vendor/moment/secondary/locale/mk.cjs`

Moment secondary 独立实例的 mk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/mk.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-mk-cjs)

## `eyes/src/vendor/moment/secondary/locale/ml.cjs`

Moment secondary 独立实例的 ml 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ml.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ml-cjs)

## `eyes/src/vendor/moment/secondary/locale/mn.cjs`

Moment secondary 独立实例的 mn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/mn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-mn-cjs)

## `eyes/src/vendor/moment/secondary/locale/mr.cjs`

Moment secondary 独立实例的 mr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/mr.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-mr-cjs)

## `eyes/src/vendor/moment/secondary/locale/ms-my.cjs`

Moment secondary 独立实例的 ms-my 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ms-my.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ms-my-cjs)

## `eyes/src/vendor/moment/secondary/locale/ms.cjs`

Moment secondary 独立实例的 ms 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ms.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ms-cjs)

## `eyes/src/vendor/moment/secondary/locale/mt.cjs`

Moment secondary 独立实例的 mt 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/mt.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-mt-cjs)

## `eyes/src/vendor/moment/secondary/locale/my.cjs`

Moment secondary 独立实例的 my 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/my.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-my-cjs)

## `eyes/src/vendor/moment/secondary/locale/nb.cjs`

Moment secondary 独立实例的 nb 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/nb.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-nb-cjs)

## `eyes/src/vendor/moment/secondary/locale/ne.cjs`

Moment secondary 独立实例的 ne 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ne.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ne-cjs)

## `eyes/src/vendor/moment/secondary/locale/nl-be.cjs`

Moment secondary 独立实例的 nl-be 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/nl-be.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-nl-be-cjs)

## `eyes/src/vendor/moment/secondary/locale/nl.cjs`

Moment secondary 独立实例的 nl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/nl.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-nl-cjs)

## `eyes/src/vendor/moment/secondary/locale/nn.cjs`

Moment secondary 独立实例的 nn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/nn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-nn-cjs)

## `eyes/src/vendor/moment/secondary/locale/oc-lnc.cjs`

Moment secondary 独立实例的 oc-lnc 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/oc-lnc.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-oc-lnc-cjs)

## `eyes/src/vendor/moment/secondary/locale/pa-in.cjs`

Moment secondary 独立实例的 pa-in 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/pa-in.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-pa-in-cjs)

## `eyes/src/vendor/moment/secondary/locale/pl.cjs`

Moment secondary 独立实例的 pl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/pl.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-pl-cjs)

## `eyes/src/vendor/moment/secondary/locale/pt-br.cjs`

Moment secondary 独立实例的 pt-br 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/pt-br.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-pt-br-cjs)

## `eyes/src/vendor/moment/secondary/locale/pt.cjs`

Moment secondary 独立实例的 pt 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/pt.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-pt-cjs)

## `eyes/src/vendor/moment/secondary/locale/ro.cjs`

Moment secondary 独立实例的 ro 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ro.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ro-cjs)

## `eyes/src/vendor/moment/secondary/locale/ru.cjs`

Moment secondary 独立实例的 ru 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ru.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ru-cjs)

## `eyes/src/vendor/moment/secondary/locale/sd.cjs`

Moment secondary 独立实例的 sd 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/sd.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-sd-cjs)

## `eyes/src/vendor/moment/secondary/locale/se.cjs`

Moment secondary 独立实例的 se 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/se.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-se-cjs)

## `eyes/src/vendor/moment/secondary/locale/si.cjs`

Moment secondary 独立实例的 si 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/si.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-si-cjs)

## `eyes/src/vendor/moment/secondary/locale/sk.cjs`

Moment secondary 独立实例的 sk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/sk.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-sk-cjs)

## `eyes/src/vendor/moment/secondary/locale/sl.cjs`

Moment secondary 独立实例的 sl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/sl.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-sl-cjs)

## `eyes/src/vendor/moment/secondary/locale/sq.cjs`

Moment secondary 独立实例的 sq 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/sq.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-sq-cjs)

## `eyes/src/vendor/moment/secondary/locale/sr-cyrl.cjs`

Moment secondary 独立实例的 sr-cyrl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/sr-cyrl.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-sr-cyrl-cjs)

## `eyes/src/vendor/moment/secondary/locale/sr.cjs`

Moment secondary 独立实例的 sr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/sr.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-sr-cjs)

## `eyes/src/vendor/moment/secondary/locale/ss.cjs`

Moment secondary 独立实例的 ss 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ss.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ss-cjs)

## `eyes/src/vendor/moment/secondary/locale/sv.cjs`

Moment secondary 独立实例的 sv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/sv.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-sv-cjs)

## `eyes/src/vendor/moment/secondary/locale/sw.cjs`

Moment secondary 独立实例的 sw 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/sw.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-sw-cjs)

## `eyes/src/vendor/moment/secondary/locale/ta.cjs`

Moment secondary 独立实例的 ta 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ta.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ta-cjs)

## `eyes/src/vendor/moment/secondary/locale/te.cjs`

Moment secondary 独立实例的 te 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/te.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-te-cjs)

## `eyes/src/vendor/moment/secondary/locale/tet.cjs`

Moment secondary 独立实例的 tet 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/tet.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-tet-cjs)

## `eyes/src/vendor/moment/secondary/locale/tg.cjs`

Moment secondary 独立实例的 tg 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/tg.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-tg-cjs)

## `eyes/src/vendor/moment/secondary/locale/th.cjs`

Moment secondary 独立实例的 th 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/th.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-th-cjs)

## `eyes/src/vendor/moment/secondary/locale/tk.cjs`

Moment secondary 独立实例的 tk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/tk.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-tk-cjs)

## `eyes/src/vendor/moment/secondary/locale/tl-ph.cjs`

Moment secondary 独立实例的 tl-ph 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/tl-ph.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-tl-ph-cjs)

## `eyes/src/vendor/moment/secondary/locale/tlh.cjs`

Moment secondary 独立实例的 tlh 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/tlh.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-tlh-cjs)

## `eyes/src/vendor/moment/secondary/locale/tr.cjs`

Moment secondary 独立实例的 tr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/tr.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-tr-cjs)

## `eyes/src/vendor/moment/secondary/locale/tzl.cjs`

Moment secondary 独立实例的 tzl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/tzl.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-tzl-cjs)

## `eyes/src/vendor/moment/secondary/locale/tzm-latn.cjs`

Moment secondary 独立实例的 tzm-latn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/tzm-latn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-tzm-latn-cjs)

## `eyes/src/vendor/moment/secondary/locale/tzm.cjs`

Moment secondary 独立实例的 tzm 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/tzm.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-tzm-cjs)

## `eyes/src/vendor/moment/secondary/locale/ug-cn.cjs`

Moment secondary 独立实例的 ug-cn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ug-cn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ug-cn-cjs)

## `eyes/src/vendor/moment/secondary/locale/uk.cjs`

Moment secondary 独立实例的 uk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/uk.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-uk-cjs)

## `eyes/src/vendor/moment/secondary/locale/ur.cjs`

Moment secondary 独立实例的 ur 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/ur.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-ur-cjs)

## `eyes/src/vendor/moment/secondary/locale/uz-latn.cjs`

Moment secondary 独立实例的 uz-latn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/uz-latn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-uz-latn-cjs)

## `eyes/src/vendor/moment/secondary/locale/uz.cjs`

Moment secondary 独立实例的 uz 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/uz.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-uz-cjs)

## `eyes/src/vendor/moment/secondary/locale/vi.cjs`

Moment secondary 独立实例的 vi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/vi.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-vi-cjs)

## `eyes/src/vendor/moment/secondary/locale/x-pseudo.cjs`

Moment secondary 独立实例的 x-pseudo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/x-pseudo.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-x-pseudo-cjs)

## `eyes/src/vendor/moment/secondary/locale/yo.cjs`

Moment secondary 独立实例的 yo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/yo.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-yo-cjs)

## `eyes/src/vendor/moment/secondary/locale/zh-cn.cjs`

Moment secondary 独立实例的 zh-cn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/zh-cn.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-zh-cn-cjs)

## `eyes/src/vendor/moment/secondary/locale/zh-hk.cjs`

Moment secondary 独立实例的 zh-hk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/zh-hk.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-zh-hk-cjs)

## `eyes/src/vendor/moment/secondary/locale/zh-mo.cjs`

Moment secondary 独立实例的 zh-mo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/zh-mo.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-zh-mo-cjs)

## `eyes/src/vendor/moment/secondary/locale/zh-tw.cjs`

Moment secondary 独立实例的 zh-tw 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。[源码](../../eyes/src/vendor/moment/secondary/locale/zh-tw.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-moment-secondary-locale-zh-tw-cjs)

## `eyes/src/vendor/three/core.js`

Three.js REVISION 185 的数学、场景图、几何、材质、动画、加载、音频及公共基础设施。[源码](../../eyes/src/vendor/three/core.js)。语义状态：`partially-matched-upstream`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-three-core-js)

### `EventDispatcher`

对象级事件订阅、分发和移除。父类 `无`。

- `addEventListener(e, t)` [源码:341](../../eyes/src/vendor/three/core.js#L341)：源码方法 addEventListener；作用以类职责与源码实现为准，未猜测压缩参数含义
- `hasEventListener(e, t)` [源码:346](../../eyes/src/vendor/three/core.js#L346)：源码方法 hasEventListener；作用以类职责与源码实现为准，未猜测压缩参数含义
- `removeEventListener(e, t)` [源码:350](../../eyes/src/vendor/three/core.js#L350)：源码方法 removeEventListener；作用以类职责与源码实现为准，未猜测压缩参数含义
- `dispatchEvent(e)` [源码:359](../../eyes/src/vendor/three/core.js#L359)：源码方法 dispatchEvent；作用以类职责与源码实现为准，未猜测压缩参数含义

### `Vector2`

Class representing a 2D vector. A 2D vector is an ordered pair of numbers (labeled x and y), which can be used to represent a number of things, such as: - A point in 2D space (i.e. a position on a plane). - A direction and length across a plane. In three.js the length will always be the Euclidean distance(straight-line distance) from ˋ(0, 0)ˋ to ˋ(x, y)ˋ and the direction is also measured from ˋ(0, 0)ˋ towards ˋ(x, y)ˋ. - Any arbitrary ordered pair of numbers. There are other things a 2D vector can be used to represent, such as momentum vectors, complex numbers and so on, however these are the most common uses in three.js. Iterating through a vector instance will yield its components ˋ(x, y)ˋ in the corresponding order. ˋˋˋjs const a = new THREE.Vector2( 0, 1 ); //no arguments; will be initialised to (0, 0) const b = new THREE.Vector2( ); const d = a.distanceTo( b ); ˋˋˋ。父类 `无`。

- `static <static block>()` [源码:548](../../eyes/src/vendor/three/core.js#L548)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `constructor(x=0, y=0)` [源码:557](../../eyes/src/vendor/three/core.js#L557)：Constructs a new 2D vector. @param {number} [x=0] - The x value of this vector. @param {number} [y=0] - The y value of this vector.
- `get width()` [源码:560](../../eyes/src/vendor/three/core.js#L560)：只读返回 this.x；此 getter 不执行对应 setter 的写入或更新通知
- `set width(value)` [源码:563](../../eyes/src/vendor/three/core.js#L563)：将输入值写入 this.x，实际变更发生在 setter 中
- `get height()` [源码:566](../../eyes/src/vendor/three/core.js#L566)：只读返回 this.y；此 getter 不执行对应 setter 的写入或更新通知
- `set height(value)` [源码:569](../../eyes/src/vendor/three/core.js#L569)：将输入值写入 this.y，实际变更发生在 setter 中
- `set(x, y)` [源码:579](../../eyes/src/vendor/three/core.js#L579)：Sets the vector components. @param {number} x - The value of the x component. @param {number} y - The value of the y component. @return {Vector2} A reference to this vector.
- `setScalar(scalar)` [源码:588](../../eyes/src/vendor/three/core.js#L588)：Sets the vector components to the same value. @param {number} scalar - The value to set for all vector components. @return {Vector2} A reference to this vector.
- `setX(x)` [源码:597](../../eyes/src/vendor/three/core.js#L597)：Sets the vector's x component to the given value @param {number} x - The value to set. @return {Vector2} A reference to this vector.
- `setY(y)` [源码:606](../../eyes/src/vendor/three/core.js#L606)：Sets the vector's y component to the given value @param {number} y - The value to set. @return {Vector2} A reference to this vector.
- `setComponent(e, t)` [源码:609](../../eyes/src/vendor/three/core.js#L609)：源码方法 setComponent；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getComponent(e)` [源码:622](../../eyes/src/vendor/three/core.js#L622)：源码方法 getComponent；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clone()` [源码:637](../../eyes/src/vendor/three/core.js#L637)：Returns a new vector with copied values from this instance. @return {Vector2} A clone of this instance.
- `copy(v)` [源码:646](../../eyes/src/vendor/three/core.js#L646)：Copies the values of the given vector to this instance. @param {Vector2} v - The vector to copy. @return {Vector2} A reference to this vector.
- `add(v)` [源码:655](../../eyes/src/vendor/three/core.js#L655)：Adds the given vector to this instance. @param {Vector2} v - The vector to add. @return {Vector2} A reference to this vector.
- `addScalar(s)` [源码:664](../../eyes/src/vendor/three/core.js#L664)：Adds the given scalar value to all components of this instance. @param {number} s - The scalar to add. @return {Vector2} A reference to this vector.
- `addVectors(a, b)` [源码:674](../../eyes/src/vendor/three/core.js#L674)：Adds the given vectors and stores the result in this instance. @param {Vector2} a - The first vector. @param {Vector2} b - The second vector. @return {Vector2} A reference to this vector.
- `addScaledVector(v, s)` [源码:684](../../eyes/src/vendor/three/core.js#L684)：Adds the given vector scaled by the given factor to this instance. @param {Vector2} v - The vector. @param {number} s - The factor that scales ˋvˋ. @return {Vector2} A reference to this vector.
- `sub(v)` [源码:693](../../eyes/src/vendor/three/core.js#L693)：Subtracts the given vector from this instance. @param {Vector2} v - The vector to subtract. @return {Vector2} A reference to this vector.
- `subScalar(s)` [源码:702](../../eyes/src/vendor/three/core.js#L702)：Subtracts the given scalar value from all components of this instance. @param {number} s - The scalar to subtract. @return {Vector2} A reference to this vector.
- `subVectors(a, b)` [源码:712](../../eyes/src/vendor/three/core.js#L712)：Subtracts the given vectors and stores the result in this instance. @param {Vector2} a - The first vector. @param {Vector2} b - The second vector. @return {Vector2} A reference to this vector.
- `multiply(v)` [源码:721](../../eyes/src/vendor/three/core.js#L721)：Multiplies the given vector with this instance. @param {Vector2} v - The vector to multiply. @return {Vector2} A reference to this vector.
- `multiplyScalar(scalar)` [源码:730](../../eyes/src/vendor/three/core.js#L730)：Multiplies the given scalar value with all components of this instance. @param {number} scalar - The scalar to multiply. @return {Vector2} A reference to this vector.
- `divide(v)` [源码:739](../../eyes/src/vendor/three/core.js#L739)：Divides this instance by the given vector. @param {Vector2} v - The vector to divide. @return {Vector2} A reference to this vector.
- `divideScalar(scalar)` [源码:748](../../eyes/src/vendor/three/core.js#L748)：Divides this vector by the given scalar. @param {number} scalar - The scalar to divide. @return {Vector2} A reference to this vector.
- `applyMatrix3(m)` [源码:758](../../eyes/src/vendor/three/core.js#L758)：Multiplies this vector (with an implicit 1 as the 3rd component) by the given 3x3 matrix. @param {Matrix3} m - The matrix to apply. @return {Vector2} A reference to this vector.
- `min(v)` [源码:771](../../eyes/src/vendor/three/core.js#L771)：If this vector's x or y value is greater than the given vector's x or y value, replace that value with the corresponding min value. @param {Vector2} v - The vector. @return {Vector2} A reference to this vector.
- `max(v)` [源码:781](../../eyes/src/vendor/three/core.js#L781)：If this vector's x or y value is less than the given vector's x or y value, replace that value with the corresponding max value. @param {Vector2} v - The vector. @return {Vector2} A reference to this vector.
- `clamp(min, max)` [源码:794](../../eyes/src/vendor/three/core.js#L794)：If this vector's x or y value is greater than the max vector's x or y value, it is replaced by the corresponding value. If this vector's x or y value is less than the min vector's x or y value, it is replaced by the corresponding value. @param {Vector2} min - The minimum x and y values. @param {Vector2} max - The maximum x and y values in the desired range. @return {Vector2} A reference to this vector.
- `clampScalar(minVal, maxVal)` [源码:807](../../eyes/src/vendor/three/core.js#L807)：If this vector's x or y values are greater than the max value, they are replaced by the max value. If this vector's x or y values are less than the min value, they are replaced by the min value. @param {number} minVal - The minimum value the components will be clamped to. @param {number} maxVal - The maximum value the components will be clamped to. @return {Vector2} A reference to this vector.
- `clampLength(min, max)` [源码:820](../../eyes/src/vendor/three/core.js#L820)：If this vector's length is greater than the max value, it is replaced by the max value. If this vector's length is less than the min value, it is replaced by the min value. @param {number} min - The minimum value the vector length will be clamped to. @param {number} max - The maximum value the vector length will be clamped to. @return {Vector2} A reference to this vector.
- `floor()` [源码:829](../../eyes/src/vendor/three/core.js#L829)：The components of this vector are rounded down to the nearest integer value. @return {Vector2} A reference to this vector.
- `ceil()` [源码:837](../../eyes/src/vendor/three/core.js#L837)：The components of this vector are rounded up to the nearest integer value. @return {Vector2} A reference to this vector.
- `round()` [源码:845](../../eyes/src/vendor/three/core.js#L845)：The components of this vector are rounded to the nearest integer value @return {Vector2} A reference to this vector.
- `roundToZero()` [源码:854](../../eyes/src/vendor/three/core.js#L854)：The components of this vector are rounded towards zero (up if negative, down if positive) to an integer value. @return {Vector2} A reference to this vector.
- `negate()` [源码:862](../../eyes/src/vendor/three/core.js#L862)：Inverts this vector - i.e. sets x = -x and y = -y. @return {Vector2} A reference to this vector.
- `dot(v)` [源码:871](../../eyes/src/vendor/three/core.js#L871)：Calculates the dot product of the given vector with this instance. @param {Vector2} v - The vector to compute the dot product with. @return {number} The result of the dot product.
- `cross(v)` [源码:880](../../eyes/src/vendor/three/core.js#L880)：Calculates the cross product of the given vector with this instance. @param {Vector2} v - The vector to compute the cross product with. @return {number} The result of the cross product.
- `lengthSq()` [源码:890](../../eyes/src/vendor/three/core.js#L890)：Computes the square of the Euclidean length (straight-line length) from (0, 0) to (x, y). If you are comparing the lengths of vectors, you should compare the length squared instead as it is slightly more efficient to calculate. @return {number} The square length of this vector.
- `length()` [源码:898](../../eyes/src/vendor/three/core.js#L898)：Computes the Euclidean length (straight-line length) from (0, 0) to (x, y). @return {number} The length of this vector.
- `manhattanLength()` [源码:906](../../eyes/src/vendor/three/core.js#L906)：Computes the Manhattan length of this vector. @return {number} The length of this vector.
- `normalize()` [源码:915](../../eyes/src/vendor/three/core.js#L915)：Converts this vector to a unit vector - that is, sets it equal to a vector with the same direction as this one, but with a vector length of ˋ1ˋ. @return {Vector2} A reference to this vector.
- `angle()` [源码:918](../../eyes/src/vendor/three/core.js#L918)：源码方法 angle；作用以类职责与源码实现为准，未猜测压缩参数含义
- `angleTo(e)` [源码:921](../../eyes/src/vendor/three/core.js#L921)：源码方法 angleTo；作用以类职责与源码实现为准，未猜测压缩参数含义
- `distanceTo(v)` [源码:933](../../eyes/src/vendor/three/core.js#L933)：Computes the distance from the given vector to this instance. @param {Vector2} v - The vector to compute the distance to. @return {number} The distance.
- `distanceToSquared(v)` [源码:944](../../eyes/src/vendor/three/core.js#L944)：Computes the squared distance from the given vector to this instance. If you are just comparing the distance with another distance, you should compare the distance squared instead as it is slightly more efficient to calculate. @param {Vector2} v - The vector to compute the squared distance to. @return {number} The squared distance.
- `manhattanDistanceTo(v)` [源码:955](../../eyes/src/vendor/three/core.js#L955)：Computes the Manhattan distance from the given vector to this instance. @param {Vector2} v - The vector to compute the Manhattan distance to. @return {number} The Manhattan distance.
- `setLength(length)` [源码:965](../../eyes/src/vendor/three/core.js#L965)：Sets this vector to a vector with the same direction as this one, but with the specified length. @param {number} length - The new length of this vector. @return {Vector2} A reference to this vector.
- `lerp(v, alpha)` [源码:977](../../eyes/src/vendor/three/core.js#L977)：Linearly interpolates between the given vector and this instance, where alpha is the percent distance along the line - alpha = 0 will be this vector, and alpha = 1 will be the given one. @param {Vector2} v - The vector to interpolate towards. @param {number} alpha - The interpolation factor, typically in the closed interval ˋ[0, 1]ˋ. @return {Vector2} A reference to this vector.
- `lerpVectors(v1, v2, alpha)` [源码:990](../../eyes/src/vendor/three/core.js#L990)：Linearly interpolates between the given vectors, where alpha is the percent distance along the line - alpha = 0 will be first vector, and alpha = 1 will be the second one. The result is stored in this instance. @param {Vector2} v1 - The first vector. @param {Vector2} v2 - The second vector. @param {number} alpha - The interpolation factor, typically in the closed interval ˋ[0, 1]ˋ. @return {Vector2} A reference to this vector.
- `equals(v)` [源码:999](../../eyes/src/vendor/three/core.js#L999)：Returns ˋtrueˋ if this vector is equal with the given one. @param {Vector2} v - The vector to test for equality. @return {boolean} Whether this vector is equal with the given one.
- `fromArray(array, offset=0)` [源码:1010](../../eyes/src/vendor/three/core.js#L1010)：Sets this vector's x value to be ˋarray[ offset ]ˋ and y value to be ˋarray[ offset + 1 ]ˋ. @param {Array<number>} array - An array holding the vector component values. @param {number} [offset=0] - The offset into the array. @return {Vector2} A reference to this vector.
- `toArray(array=[], offset=0)` [源码:1021](../../eyes/src/vendor/three/core.js#L1021)：Writes the components of this vector to the given array. If no array is provided, the method returns a new instance. @param {Array<number>} [array=[]] - The target array holding the vector components. @param {number} [offset=0] - Index of the first element in the array. @return {Array<number>} The vector components.
- `fromBufferAttribute(attribute, index)` [源码:1031](../../eyes/src/vendor/three/core.js#L1031)：Sets the components of this vector from the given buffer attribute. @param {BufferAttribute} attribute - The buffer attribute holding vector data. @param {number} index - The index into the attribute. @return {Vector2} A reference to this vector.
- `rotateAround(center, angle)` [源码:1041](../../eyes/src/vendor/three/core.js#L1041)：Rotates this vector around the given center by the given angle. @param {Vector2} center - The point around which to rotate. @param {number} angle - The angle to rotate, in radians. @return {Vector2} A reference to this vector.
- `random()` [源码:1054](../../eyes/src/vendor/three/core.js#L1054)：Sets each component of this vector to a pseudo-random value between ˋ0ˋ and ˋ1ˋ, excluding ˋ1ˋ. @return {Vector2} A reference to this vector.
- `Symbol.iterator()` [源码:1057](../../eyes/src/vendor/three/core.js#L1057)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `Quaternion`

Class for representing a Quaternion. Quaternions are used in three.js to represent rotations. Iterating through a vector instance will yield its components ˋ(x, y, z, w)ˋ in the corresponding order. Note that three.js expects Quaternions to be normalized. ˋˋˋjs const quaternion = new THREE.Quaternion(); quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 ); const vector = new THREE.Vector3( 1, 0, 0 ); vector.applyQuaternion( quaternion ); ˋˋˋ。父类 `无`。

- `constructor(x=0, y=0, z=0, w=1)` [源码:1085](../../eyes/src/vendor/three/core.js#L1085)：Constructs a new quaternion. @param {number} [x=0] - The x value of this quaternion. @param {number} [y=0] - The y value of this quaternion. @param {number} [z=0] - The z value of this quaternion. @param {number} [w=1] - The w value of this quaternion.
- `static slerpFlat(e, t, n, r, i, a, s)` [源码:1088](../../eyes/src/vendor/three/core.js#L1088)：源码方法 slerpFlat；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1)` [源码:1126](../../eyes/src/vendor/three/core.js#L1126)：Multiplies two quaternions. This implementation assumes the quaternion data are managed in flat arrays. @param {Array<number>} dst - The destination array. @param {number} dstOffset - An offset into the destination array. @param {Array<number>} src0 - The source array of the first quaternion. @param {number} srcOffset0 - An offset into the first source array. @param {Array<number>} src1 - The source array of the second quaternion. @param {number} srcOffset1 - An offset into the second source array. @return {Array<number>} The destination array. @see {@link Quaternion#multiplyQuaternions}.
- `get x()` [源码:1137](../../eyes/src/vendor/three/core.js#L1137)：只读返回 this._x；此 getter 不执行对应 setter 的写入或更新通知
- `set x(value)` [源码:1140](../../eyes/src/vendor/three/core.js#L1140)：写入 _x，随后调用 _onChangeCallback 通知旋转状态变化
- `get y()` [源码:1143](../../eyes/src/vendor/three/core.js#L1143)：只读返回 this._y；此 getter 不执行对应 setter 的写入或更新通知
- `set y(value)` [源码:1146](../../eyes/src/vendor/three/core.js#L1146)：写入 _y，随后调用 _onChangeCallback 通知旋转状态变化
- `get z()` [源码:1149](../../eyes/src/vendor/three/core.js#L1149)：只读返回 this._z；此 getter 不执行对应 setter 的写入或更新通知
- `set z(value)` [源码:1152](../../eyes/src/vendor/three/core.js#L1152)：写入 _z，随后调用 _onChangeCallback 通知旋转状态变化
- `get w()` [源码:1155](../../eyes/src/vendor/three/core.js#L1155)：只读返回 this._w；此 getter 不执行对应 setter 的写入或更新通知
- `set w(value)` [源码:1158](../../eyes/src/vendor/three/core.js#L1158)：写入 _w，随后调用 _onChangeCallback 通知旋转状态变化
- `set(x, y, z, w)` [源码:1170](../../eyes/src/vendor/three/core.js#L1170)：Sets the quaternion components. @param {number} x - The x value of this quaternion. @param {number} y - The y value of this quaternion. @param {number} z - The z value of this quaternion. @param {number} w - The w value of this quaternion. @return {Quaternion} A reference to this quaternion.
- `clone()` [源码:1178](../../eyes/src/vendor/three/core.js#L1178)：Returns a new quaternion with copied values from this instance. @return {Quaternion} A clone of this instance.
- `copy(quaternion)` [源码:1187](../../eyes/src/vendor/three/core.js#L1187)：Copies the values of the given quaternion to this instance. @param {Quaternion} quaternion - The quaternion to copy. @return {Quaternion} A reference to this quaternion.
- `setFromEuler(e, t=!0)` [源码:1190](../../eyes/src/vendor/three/core.js#L1190)：源码方法 setFromEuler；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setFromAxisAngle(axis, angle)` [源码:1234](../../eyes/src/vendor/three/core.js#L1234)：Sets this quaternion from the given axis and angle. @param {Vector3} axis - The normalized axis. @param {number} angle - The angle in radians. @return {Quaternion} A reference to this quaternion.
- `setFromRotationMatrix(e)` [源码:1239](../../eyes/src/vendor/three/core.js#L1239)：源码方法 setFromRotationMatrix；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setFromUnitVectors(vFrom, vTo)` [源码:1274](../../eyes/src/vendor/three/core.js#L1274)：Sets this quaternion to the rotation required to rotate the direction vector ˋvFromˋ to the direction vector ˋvToˋ. @param {Vector3} vFrom - The first (normalized) direction vector. @param {Vector3} vTo - The second (normalized) direction vector. @return {Quaternion} A reference to this quaternion.
- `angleTo(q)` [源码:1284](../../eyes/src/vendor/three/core.js#L1284)：Returns the angle between this quaternion and the given one in radians. @param {Quaternion} q - The quaternion to compute the angle with. @return {number} The angle in radians.
- `rotateTowards(e, t)` [源码:1287](../../eyes/src/vendor/three/core.js#L1287)：源码方法 rotateTowards；作用以类职责与源码实现为准，未猜测压缩参数含义
- `identity()` [源码:1299](../../eyes/src/vendor/three/core.js#L1299)：Sets this quaternion to the identity quaternion; that is, to the quaternion that represents "no rotation". @return {Quaternion} A reference to this quaternion.
- `invert()` [源码:1308](../../eyes/src/vendor/three/core.js#L1308)：Inverts this quaternion via {@link Quaternion#conjugate}. The quaternion is assumed to have unit length. @return {Quaternion} A reference to this quaternion.
- `conjugate()` [源码:1318](../../eyes/src/vendor/three/core.js#L1318)：Returns the rotational conjugate of this quaternion. The conjugate of a quaternion represents the same rotation in the opposite direction about the rotational axis. @return {Quaternion} A reference to this quaternion.
- `dot(v)` [源码:1327](../../eyes/src/vendor/three/core.js#L1327)：Calculates the dot product of this quaternion and the given one. @param {Quaternion} v - The quaternion to compute the dot product with. @return {number} The result of the dot product.
- `lengthSq()` [源码:1338](../../eyes/src/vendor/three/core.js#L1338)：Computes the squared Euclidean length (straight-line length) of this quaternion, considered as a 4 dimensional vector. This can be useful if you are comparing the lengths of two quaternions, as this is a slightly more efficient calculation than {@link Quaternion#length}. @return {number} The squared Euclidean length.
- `length()` [源码:1347](../../eyes/src/vendor/three/core.js#L1347)：Computes the Euclidean length (straight-line length) of this quaternion, considered as a 4 dimensional vector. @return {number} The Euclidean length.
- `normalize()` [源码:1350](../../eyes/src/vendor/three/core.js#L1350)：源码方法 normalize；作用以类职责与源码实现为准，未猜测压缩参数含义
- `multiply(q)` [源码:1360](../../eyes/src/vendor/three/core.js#L1360)：Multiplies this quaternion by the given one. @param {Quaternion} q - The quaternion. @return {Quaternion} A reference to this quaternion.
- `premultiply(q)` [源码:1369](../../eyes/src/vendor/three/core.js#L1369)：Pre-multiplies this quaternion by the given one. @param {Quaternion} q - The quaternion. @return {Quaternion} A reference to this quaternion.
- `multiplyQuaternions(a, b)` [源码:1379](../../eyes/src/vendor/three/core.js#L1379)：Multiplies the given quaternions and stores the result in this instance. @param {Quaternion} a - The first quaternion. @param {Quaternion} b - The second quaternion. @return {Quaternion} A reference to this quaternion.
- `slerp(e, t)` [源码:1390](../../eyes/src/vendor/three/core.js#L1390)：源码方法 slerp；作用以类职责与源码实现为准，未猜测压缩参数含义
- `slerpQuaternions(qa, qb, t)` [源码:1414](../../eyes/src/vendor/three/core.js#L1414)：Performs a spherical linear interpolation between the given quaternions and stores the result in this quaternion. @param {Quaternion} qa - The source quaternion. @param {Quaternion} qb - The target quaternion. @param {number} t - The interpolation factor in the closed interval ˋ[0, 1]ˋ. @return {Quaternion} A reference to this quaternion.
- `random()` [源码:1422](../../eyes/src/vendor/three/core.js#L1422)：Sets this quaternion to a uniformly random, normalized quaternion. @return {Quaternion} A reference to this quaternion.
- `equals(quaternion)` [源码:1436](../../eyes/src/vendor/three/core.js#L1436)：Returns ˋtrueˋ if this quaternion is equal with the given one. @param {Quaternion} quaternion - The quaternion to test for equality. @return {boolean} Whether this quaternion is equal with the given one.
- `fromArray(array, offset=0)` [源码:1446](../../eyes/src/vendor/three/core.js#L1446)：Sets this quaternion's components from the given array. @param {Array<number>} array - An array holding the quaternion component values. @param {number} [offset=0] - The offset into the array. @return {Quaternion} A reference to this quaternion.
- `toArray(array=[], offset=0)` [源码:1457](../../eyes/src/vendor/three/core.js#L1457)：Writes the components of this quaternion to the given array. If no array is provided, the method returns a new instance. @param {Array<number>} [array=[]] - The target array holding the quaternion components. @param {number} [offset=0] - Index of the first element in the array. @return {Array<number>} The quaternion components.
- `fromBufferAttribute(attribute, index)` [源码:1467](../../eyes/src/vendor/three/core.js#L1467)：Sets the components of this quaternion from the given buffer attribute. @param {BufferAttribute} attribute - The buffer attribute holding quaternion data. @param {number} index - The index into the attribute. @return {Quaternion} A reference to this quaternion.
- `toJSON()` [源码:1476](../../eyes/src/vendor/three/core.js#L1476)：This methods defines the serialization result of this class. Returns the numerical elements of this quaternion in an array of format ˋ[x, y, z, w]ˋ. @return {Array<number>} The serialized quaternion.
- `_onChange(callback)` [源码:1479](../../eyes/src/vendor/three/core.js#L1479)：源码方法 _onChange；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_onChangeCallback()` [源码:1482](../../eyes/src/vendor/three/core.js#L1482)：源码方法 _onChangeCallback；作用以类职责与源码实现为准，未猜测压缩参数含义
- `Symbol.iterator()` [源码:1483](../../eyes/src/vendor/three/core.js#L1483)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `Vector3`

Class representing a 3D vector. A 3D vector is an ordered triplet of numbers (labeled x, y and z), which can be used to represent a number of things, such as: - A point in 3D space. - A direction and length in 3D space. In three.js the length will always be the Euclidean distance(straight-line distance) from ˋ(0, 0, 0)ˋ to ˋ(x, y, z)ˋ and the direction is also measured from ˋ(0, 0, 0)ˋ towards ˋ(x, y, z)ˋ. - Any arbitrary ordered triplet of numbers. There are other things a 3D vector can be used to represent, such as momentum vectors and so on, however these are the most common uses in three.js. Iterating through a vector instance will yield its components ˋ(x, y, z)ˋ in the corresponding order. ˋˋˋjs const a = new THREE.Vector3( 0, 1, 0 ); //no arguments; will be initialised to (0, 0, 0) const b = new THREE.Vector3( ); const d = a.distanceTo( b ); ˋˋˋ。父类 `无`。

- `static <static block>()` [源码:1513](../../eyes/src/vendor/three/core.js#L1513)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `constructor(x=0, y=0, z=0)` [源码:1523](../../eyes/src/vendor/three/core.js#L1523)：Constructs a new 3D vector. @param {number} [x=0] - The x value of this vector. @param {number} [y=0] - The y value of this vector. @param {number} [z=0] - The z value of this vector.
- `set(e, t, n)` [源码:1526](../../eyes/src/vendor/three/core.js#L1526)：源码方法 set；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setScalar(scalar)` [源码:1535](../../eyes/src/vendor/three/core.js#L1535)：Sets the vector components to the same value. @param {number} scalar - The value to set for all vector components. @return {Vector3} A reference to this vector.
- `setX(x)` [源码:1544](../../eyes/src/vendor/three/core.js#L1544)：Sets the vector's x component to the given value. @param {number} x - The value to set. @return {Vector3} A reference to this vector.
- `setY(y)` [源码:1553](../../eyes/src/vendor/three/core.js#L1553)：Sets the vector's y component to the given value. @param {number} y - The value to set. @return {Vector3} A reference to this vector.
- `setZ(z)` [源码:1562](../../eyes/src/vendor/three/core.js#L1562)：Sets the vector's z component to the given value. @param {number} z - The value to set. @return {Vector3} A reference to this vector.
- `setComponent(e, t)` [源码:1565](../../eyes/src/vendor/three/core.js#L1565)：源码方法 setComponent；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getComponent(e)` [源码:1581](../../eyes/src/vendor/three/core.js#L1581)：源码方法 getComponent；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clone()` [源码:1598](../../eyes/src/vendor/three/core.js#L1598)：Returns a new vector with copied values from this instance. @return {Vector3} A clone of this instance.
- `copy(v)` [源码:1607](../../eyes/src/vendor/three/core.js#L1607)：Copies the values of the given vector to this instance. @param {Vector3} v - The vector to copy. @return {Vector3} A reference to this vector.
- `add(v)` [源码:1616](../../eyes/src/vendor/three/core.js#L1616)：Adds the given vector to this instance. @param {Vector3} v - The vector to add. @return {Vector3} A reference to this vector.
- `addScalar(s)` [源码:1625](../../eyes/src/vendor/three/core.js#L1625)：Adds the given scalar value to all components of this instance. @param {number} s - The scalar to add. @return {Vector3} A reference to this vector.
- `addVectors(a, b)` [源码:1635](../../eyes/src/vendor/three/core.js#L1635)：Adds the given vectors and stores the result in this instance. @param {Vector3} a - The first vector. @param {Vector3} b - The second vector. @return {Vector3} A reference to this vector.
- `addScaledVector(v, s)` [源码:1645](../../eyes/src/vendor/three/core.js#L1645)：Adds the given vector scaled by the given factor to this instance. @param {Vector3\|Vector4} v - The vector. @param {number} s - The factor that scales ˋvˋ. @return {Vector3} A reference to this vector.
- `sub(v)` [源码:1654](../../eyes/src/vendor/three/core.js#L1654)：Subtracts the given vector from this instance. @param {Vector3} v - The vector to subtract. @return {Vector3} A reference to this vector.
- `subScalar(s)` [源码:1663](../../eyes/src/vendor/three/core.js#L1663)：Subtracts the given scalar value from all components of this instance. @param {number} s - The scalar to subtract. @return {Vector3} A reference to this vector.
- `subVectors(a, b)` [源码:1673](../../eyes/src/vendor/three/core.js#L1673)：Subtracts the given vectors and stores the result in this instance. @param {Vector3} a - The first vector. @param {Vector3} b - The second vector. @return {Vector3} A reference to this vector.
- `multiply(v)` [源码:1682](../../eyes/src/vendor/three/core.js#L1682)：Multiplies the given vector with this instance. @param {Vector3} v - The vector to multiply. @return {Vector3} A reference to this vector.
- `multiplyScalar(scalar)` [源码:1691](../../eyes/src/vendor/three/core.js#L1691)：Multiplies the given scalar value with all components of this instance. @param {number} scalar - The scalar to multiply. @return {Vector3} A reference to this vector.
- `multiplyVectors(a, b)` [源码:1701](../../eyes/src/vendor/three/core.js#L1701)：Multiplies the given vectors and stores the result in this instance. @param {Vector3} a - The first vector. @param {Vector3} b - The second vector. @return {Vector3} A reference to this vector.
- `applyEuler(euler)` [源码:1710](../../eyes/src/vendor/three/core.js#L1710)：Applies the given Euler rotation to this vector. @param {Euler} euler - The Euler angles. @return {Vector3} A reference to this vector.
- `applyAxisAngle(axis, angle)` [源码:1720](../../eyes/src/vendor/three/core.js#L1720)：Applies a rotation specified by an axis and an angle to this vector. @param {Vector3} axis - A normalized vector representing the rotation axis. @param {number} angle - The angle in radians. @return {Vector3} A reference to this vector.
- `applyMatrix3(m)` [源码:1729](../../eyes/src/vendor/three/core.js#L1729)：Multiplies this vector with the given 3x3 matrix. @param {Matrix3} m - The 3x3 matrix. @return {Vector3} A reference to this vector.
- `applyNormalMatrix(m)` [源码:1743](../../eyes/src/vendor/three/core.js#L1743)：Multiplies this vector by the given normal matrix and normalizes the result. @param {Matrix3} m - The normal matrix. @return {Vector3} A reference to this vector.
- `applyMatrix4(m)` [源码:1753](../../eyes/src/vendor/three/core.js#L1753)：Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and divides by perspective. @param {Matrix4} m - The matrix to apply. @return {Vector3} A reference to this vector.
- `applyQuaternion(q)` [源码:1767](../../eyes/src/vendor/three/core.js#L1767)：Applies the given Quaternion to this vector. @param {Quaternion} q - The Quaternion. @return {Vector3} A reference to this vector.
- `project(camera)` [源码:1787](../../eyes/src/vendor/three/core.js#L1787)：Projects this vector from world space into the camera's normalized device coordinate (NDC) space. @param {Camera} camera - The camera. @return {Vector3} A reference to this vector.
- `unproject(camera)` [源码:1797](../../eyes/src/vendor/three/core.js#L1797)：Unprojects this vector from the camera's normalized device coordinate (NDC) space into world space. @param {Camera} camera - The camera. @return {Vector3} A reference to this vector.
- `transformDirection(m)` [源码:1807](../../eyes/src/vendor/three/core.js#L1807)：Transforms the direction of this vector by a matrix (the upper left 3 x 3 subset of the given 4x4 matrix and then normalizes the result. @param {Matrix4} m - The matrix. @return {Vector3} A reference to this vector.
- `divide(v)` [源码:1820](../../eyes/src/vendor/three/core.js#L1820)：Divides this instance by the given vector. @param {Vector3} v - The vector to divide. @return {Vector3} A reference to this vector.
- `divideScalar(scalar)` [源码:1829](../../eyes/src/vendor/three/core.js#L1829)：Divides this vector by the given scalar. @param {number} scalar - The scalar to divide. @return {Vector3} A reference to this vector.
- `min(v)` [源码:1839](../../eyes/src/vendor/three/core.js#L1839)：If this vector's x, y or z value is greater than the given vector's x, y or z value, replace that value with the corresponding min value. @param {Vector3} v - The vector. @return {Vector3} A reference to this vector.
- `max(v)` [源码:1849](../../eyes/src/vendor/three/core.js#L1849)：If this vector's x, y or z value is less than the given vector's x, y or z value, replace that value with the corresponding max value. @param {Vector3} v - The vector. @return {Vector3} A reference to this vector.
- `clamp(min, max)` [源码:1862](../../eyes/src/vendor/three/core.js#L1862)：If this vector's x, y or z value is greater than the max vector's x, y or z value, it is replaced by the corresponding value. If this vector's x, y or z value is less than the min vector's x, y or z value, it is replaced by the corresponding value. @param {Vector3} min - The minimum x, y and z values. @param {Vector3} max - The maximum x, y and z values in the desired range. @return {Vector3} A reference to this vector.
- `clampScalar(minVal, maxVal)` [源码:1875](../../eyes/src/vendor/three/core.js#L1875)：If this vector's x, y or z values are greater than the max value, they are replaced by the max value. If this vector's x, y or z values are less than the min value, they are replaced by the min value. @param {number} minVal - The minimum value the components will be clamped to. @param {number} maxVal - The maximum value the components will be clamped to. @return {Vector3} A reference to this vector.
- `clampLength(min, max)` [源码:1888](../../eyes/src/vendor/three/core.js#L1888)：If this vector's length is greater than the max value, it is replaced by the max value. If this vector's length is less than the min value, it is replaced by the min value. @param {number} min - The minimum value the vector length will be clamped to. @param {number} max - The maximum value the vector length will be clamped to. @return {Vector3} A reference to this vector.
- `floor()` [源码:1897](../../eyes/src/vendor/three/core.js#L1897)：The components of this vector are rounded down to the nearest integer value. @return {Vector3} A reference to this vector.
- `ceil()` [源码:1905](../../eyes/src/vendor/three/core.js#L1905)：The components of this vector are rounded up to the nearest integer value. @return {Vector3} A reference to this vector.
- `round()` [源码:1913](../../eyes/src/vendor/three/core.js#L1913)：The components of this vector are rounded to the nearest integer value @return {Vector3} A reference to this vector.
- `roundToZero()` [源码:1922](../../eyes/src/vendor/three/core.js#L1922)：The components of this vector are rounded towards zero (up if negative, down if positive) to an integer value. @return {Vector3} A reference to this vector.
- `negate()` [源码:1930](../../eyes/src/vendor/three/core.js#L1930)：Inverts this vector - i.e. sets x = -x, y = -y and z = -z. @return {Vector3} A reference to this vector.
- `dot(v)` [源码:1939](../../eyes/src/vendor/three/core.js#L1939)：Calculates the dot product of the given vector with this instance. @param {Vector3} v - The vector to compute the dot product with. @return {number} The result of the dot product.
- `lengthSq()` [源码:1949](../../eyes/src/vendor/three/core.js#L1949)：Computes the square of the Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors, you should compare the length squared instead as it is slightly more efficient to calculate. @return {number} The square length of this vector.
- `length()` [源码:1957](../../eyes/src/vendor/three/core.js#L1957)：Computes the Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z). @return {number} The length of this vector.
- `manhattanLength()` [源码:1965](../../eyes/src/vendor/three/core.js#L1965)：Computes the Manhattan length of this vector. @return {number} The length of this vector.
- `normalize()` [源码:1974](../../eyes/src/vendor/three/core.js#L1974)：Converts this vector to a unit vector - that is, sets it equal to a vector with the same direction as this one, but with a vector length of ˋ1ˋ. @return {Vector3} A reference to this vector.
- `setLength(length)` [源码:1984](../../eyes/src/vendor/three/core.js#L1984)：Sets this vector to a vector with the same direction as this one, but with the specified length. @param {number} length - The new length of this vector. @return {Vector3} A reference to this vector.
- `lerp(v, alpha)` [源码:1996](../../eyes/src/vendor/three/core.js#L1996)：Linearly interpolates between the given vector and this instance, where alpha is the percent distance along the line - alpha = 0 will be this vector, and alpha = 1 will be the given one. @param {Vector3} v - The vector to interpolate towards. @param {number} alpha - The interpolation factor, typically in the closed interval ˋ[0, 1]ˋ. @return {Vector3} A reference to this vector.
- `lerpVectors(v1, v2, alpha)` [源码:2009](../../eyes/src/vendor/three/core.js#L2009)：Linearly interpolates between the given vectors, where alpha is the percent distance along the line - alpha = 0 will be first vector, and alpha = 1 will be the second one. The result is stored in this instance. @param {Vector3} v1 - The first vector. @param {Vector3} v2 - The second vector. @param {number} alpha - The interpolation factor, typically in the closed interval ˋ[0, 1]ˋ. @return {Vector3} A reference to this vector.
- `cross(v)` [源码:2018](../../eyes/src/vendor/three/core.js#L2018)：Calculates the cross product of the given vector with this instance. @param {Vector3} v - The vector to compute the cross product with. @return {Vector3} The result of the cross product.
- `crossVectors(a, b)` [源码:2029](../../eyes/src/vendor/three/core.js#L2029)：Calculates the cross product of the given vectors and stores the result in this instance. @param {Vector3} a - The first vector. @param {Vector3} b - The second vector. @return {Vector3} A reference to this vector.
- `projectOnVector(e)` [源码:2038](../../eyes/src/vendor/three/core.js#L2038)：源码方法 projectOnVector；作用以类职责与源码实现为准，未猜测压缩参数含义
- `projectOnPlane(planeNormal)` [源码:2051](../../eyes/src/vendor/three/core.js#L2051)：Projects this vector onto a plane by subtracting this vector projected onto the plane's normal from this vector. @param {Vector3} planeNormal - The plane normal. @return {Vector3} A reference to this vector.
- `reflect(normal)` [源码:2060](../../eyes/src/vendor/three/core.js#L2060)：Reflects this vector off a plane orthogonal to the given normal vector. @param {Vector3} normal - The (normalized) normal vector. @return {Vector3} A reference to this vector.
- `angleTo(e)` [源码:2063](../../eyes/src/vendor/three/core.js#L2063)：源码方法 angleTo；作用以类职责与源码实现为准，未猜测压缩参数含义
- `distanceTo(v)` [源码:2075](../../eyes/src/vendor/three/core.js#L2075)：Computes the distance from the given vector to this instance. @param {Vector3} v - The vector to compute the distance to. @return {number} The distance.
- `distanceToSquared(v)` [源码:2086](../../eyes/src/vendor/three/core.js#L2086)：Computes the squared distance from the given vector to this instance. If you are just comparing the distance with another distance, you should compare the distance squared instead as it is slightly more efficient to calculate. @param {Vector3} v - The vector to compute the squared distance to. @return {number} The squared distance.
- `manhattanDistanceTo(v)` [源码:2098](../../eyes/src/vendor/three/core.js#L2098)：Computes the Manhattan distance from the given vector to this instance. @param {Vector3} v - The vector to compute the Manhattan distance to. @return {number} The Manhattan distance.
- `setFromSpherical(s)` [源码:2107](../../eyes/src/vendor/three/core.js#L2107)：Sets the vector components from the given spherical coordinates. @param {Spherical} s - The spherical coordinates. @return {Vector3} A reference to this vector.
- `setFromSphericalCoords(radius, phi, theta)` [源码:2118](../../eyes/src/vendor/three/core.js#L2118)：Sets the vector components from the given spherical coordinates. @param {number} radius - The radius. @param {number} phi - The phi angle in radians. @param {number} theta - The theta angle in radians. @return {Vector3} A reference to this vector.
- `setFromCylindrical(c)` [源码:2128](../../eyes/src/vendor/three/core.js#L2128)：Sets the vector components from the given cylindrical coordinates. @param {Cylindrical} c - The cylindrical coordinates. @return {Vector3} A reference to this vector.
- `setFromCylindricalCoords(radius, theta, y)` [源码:2139](../../eyes/src/vendor/three/core.js#L2139)：Sets the vector components from the given cylindrical coordinates. @param {number} radius - The radius. @param {number} theta - The theta angle in radians. @param {number} y - The y value. @return {Vector3} A reference to this vector.
- `setFromMatrixPosition(m)` [源码:2149](../../eyes/src/vendor/three/core.js#L2149)：Sets the vector components to the position elements of the given transformation matrix. @param {Matrix4} m - The 4x4 matrix. @return {Vector3} A reference to this vector.
- `setFromMatrixScale(m)` [源码:2160](../../eyes/src/vendor/three/core.js#L2160)：Sets the vector components to the scale elements of the given transformation matrix. @param {Matrix4} m - The 4x4 matrix. @return {Vector3} A reference to this vector.
- `setFromMatrixColumn(e, t)` [源码:2166](../../eyes/src/vendor/three/core.js#L2166)：源码方法 setFromMatrixColumn；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setFromMatrix3Column(e, t)` [源码:2169](../../eyes/src/vendor/three/core.js#L2169)：源码方法 setFromMatrix3Column；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setFromEuler(e)` [源码:2178](../../eyes/src/vendor/three/core.js#L2178)：Sets the vector components from the given Euler angles. @param {Euler} e - The Euler angles to set. @return {Vector3} A reference to this vector.
- `setFromColor(c)` [源码:2188](../../eyes/src/vendor/three/core.js#L2188)：Sets the vector components from the RGB components of the given color. @param {Color} c - The color to set. @return {Vector3} A reference to this vector.
- `equals(v)` [源码:2197](../../eyes/src/vendor/three/core.js#L2197)：Returns ˋtrueˋ if this vector is equal with the given one. @param {Vector3} v - The vector to test for equality. @return {boolean} Whether this vector is equal with the given one.
- `fromArray(array, offset=0)` [源码:2208](../../eyes/src/vendor/three/core.js#L2208)：Sets this vector's x value to be ˋarray[ offset ]ˋ, y value to be ˋarray[ offset + 1 ]ˋ and z value to be ˋarray[ offset + 2 ]ˋ. @param {Array<number>} array - An array holding the vector component values. @param {number} [offset=0] - The offset into the array. @return {Vector3} A reference to this vector.
- `toArray(array=[], offset=0)` [源码:2219](../../eyes/src/vendor/three/core.js#L2219)：Writes the components of this vector to the given array. If no array is provided, the method returns a new instance. @param {Array<number>} [array=[]] - The target array holding the vector components. @param {number} [offset=0] - Index of the first element in the array. @return {Array<number>} The vector components.
- `fromBufferAttribute(attribute, index)` [源码:2229](../../eyes/src/vendor/three/core.js#L2229)：Sets the components of this vector from the given buffer attribute. @param {BufferAttribute} attribute - The buffer attribute holding vector data. @param {number} index - The index into the attribute. @return {Vector3} A reference to this vector.
- `random()` [源码:2238](../../eyes/src/vendor/three/core.js#L2238)：Sets each component of this vector to a pseudo-random value between ˋ0ˋ and ˋ1ˋ, excluding ˋ1ˋ. @return {Vector3} A reference to this vector.
- `randomDirection()` [源码:2241](../../eyes/src/vendor/three/core.js#L2241)：源码方法 randomDirection；作用以类职责与源码实现为准，未猜测压缩参数含义
- `Symbol.iterator()` [源码:2247](../../eyes/src/vendor/three/core.js#L2247)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `Matrix3`

Represents a 3x3 matrix. A Note on Row-Major and Column-Major Ordering: The constructor and {@link Matrix3#set} method take arguments in [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order) order, while internally they are stored in the {@link Matrix3#elements} array in column-major order. This means that calling: ˋˋˋjs const m = new THREE.Matrix(); m.set( 11, 12, 13, 21, 22, 23, 31, 32, 33 ); ˋˋˋ will result in the elements array containing: ˋˋˋjs m.elements = [ 11, 21, 31, 12, 22, 32, 13, 23, 33 ]; ˋˋˋ and internally all calculations are performed using column-major ordering. However, as the actual ordering makes no difference mathematically and most people are used to thinking about matrices in row-major order, the three.js documentation shows matrices in row-major order. Just bear in mind that if you are reading the source code, you'll have to take the transpose of any matrices outlined here to make sense of the calculations.。父类 `无`。

- `static <static block>()` [源码:2282](../../eyes/src/vendor/three/core.js#L2282)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `constructor(e, t, n, r, i, a, s, o, c)` [源码:2285](../../eyes/src/vendor/three/core.js#L2285)：当前操作：写入 elements；返回 无显式返回。
- `set(n11, n12, n13, n21, n22, n23, n31, n32, n33)` [源码:2303](../../eyes/src/vendor/three/core.js#L2303)：Sets the elements of the matrix.The arguments are supposed to be in row-major order. @param {number} [n11] - 1-1 matrix element. @param {number} [n12] - 1-2 matrix element. @param {number} [n13] - 1-3 matrix element. @param {number} [n21] - 2-1 matrix element. @param {number} [n22] - 2-2 matrix element. @param {number} [n23] - 2-3 matrix element. @param {number} [n31] - 3-1 matrix element. @param {number} [n32] - 3-2 matrix element. @param {number} [n33] - 3-3 matrix element. @return {Matrix3} A reference to this matrix.
- `identity()` [源码:2312](../../eyes/src/vendor/three/core.js#L2312)：Sets this matrix to the 3x3 identity matrix. @return {Matrix3} A reference to this matrix.
- `copy(m)` [源码:2321](../../eyes/src/vendor/three/core.js#L2321)：Copies the values of the given matrix to this instance. @param {Matrix3} m - The matrix to copy. @return {Matrix3} A reference to this matrix.
- `extractBasis(xAxis, yAxis, zAxis)` [源码:2334](../../eyes/src/vendor/three/core.js#L2334)：Extracts the basis of this matrix into the three axis vectors provided. @param {Vector3} xAxis - The basis's x axis. @param {Vector3} yAxis - The basis's y axis. @param {Vector3} zAxis - The basis's z axis. @return {Matrix3} A reference to this matrix.
- `setFromMatrix4(m)` [源码:2343](../../eyes/src/vendor/three/core.js#L2343)：Set this matrix to the upper 3x3 matrix of the given 4x4 matrix. @param {Matrix4} m - The 4x4 matrix. @return {Matrix3} A reference to this matrix.
- `multiply(m)` [源码:2353](../../eyes/src/vendor/three/core.js#L2353)：Post-multiplies this matrix by the given 3x3 matrix. @param {Matrix3} m - The matrix to multiply with. @return {Matrix3} A reference to this matrix.
- `premultiply(m)` [源码:2362](../../eyes/src/vendor/three/core.js#L2362)：Pre-multiplies this matrix by the given 3x3 matrix. @param {Matrix3} m - The matrix to multiply with. @return {Matrix3} A reference to this matrix.
- `multiplyMatrices(a, b)` [源码:2373](../../eyes/src/vendor/three/core.js#L2373)：Multiples the given 3x3 matrices and stores the result in this matrix. @param {Matrix3} a - The first matrix. @param {Matrix3} b - The second matrix. @return {Matrix3} A reference to this matrix.
- `multiplyScalar(s)` [源码:2403](../../eyes/src/vendor/three/core.js#L2403)：Multiplies every component of the matrix by the given scalar. @param {number} s - The scalar. @return {Matrix3} A reference to this matrix.
- `determinant()` [源码:2412](../../eyes/src/vendor/three/core.js#L2412)：Computes and returns the determinant of this matrix. @return {number} The determinant.
- `invert()` [源码:2425](../../eyes/src/vendor/three/core.js#L2425)：源码方法 invert；作用以类职责与源码实现为准，未猜测压缩参数含义
- `transpose()` [源码:2449](../../eyes/src/vendor/three/core.js#L2449)：Transposes this matrix in place. @return {Matrix3} A reference to this matrix.
- `getNormalMatrix(matrix4)` [源码:2461](../../eyes/src/vendor/three/core.js#L2461)：Computes the normal matrix which is the inverse transpose of the upper left 3x3 portion of the given 4x4 matrix. @param {Matrix4} matrix4 - The 4x4 matrix. @return {Matrix3} A reference to this matrix.
- `transposeIntoArray(r)` [源码:2470](../../eyes/src/vendor/three/core.js#L2470)：Transposes this matrix into the supplied array, and returns itself unchanged. @param {Array<number>} r - An array to store the transposed matrix elements. @return {Matrix3} A reference to this matrix.
- `setUvTransform(tx, ty, sx, sy, rotation, cx, cy)` [源码:2486](../../eyes/src/vendor/three/core.js#L2486)：Sets the UV transform matrix from offset, repeat, rotation, and center. @param {number} tx - Offset x. @param {number} ty - Offset y. @param {number} sx - Repeat x. @param {number} sy - Repeat y. @param {number} rotation - Rotation, in radians. Positive values rotate counterclockwise. @param {number} cx - Center x of rotation. @param {number} cy - Center y of rotation @return {Matrix3} A reference to this matrix.
- `scale(e, t)` [源码:2491](../../eyes/src/vendor/three/core.js#L2491)：源码方法 scale；作用以类职责与源码实现为准，未猜测压缩参数含义
- `rotate(e)` [源码:2494](../../eyes/src/vendor/three/core.js#L2494)：源码方法 rotate；作用以类职责与源码实现为准，未猜测压缩参数含义
- `translate(e, t)` [源码:2497](../../eyes/src/vendor/three/core.js#L2497)：源码方法 translate；作用以类职责与源码实现为准，未猜测压缩参数含义
- `makeTranslation(x, y)` [源码:2509](../../eyes/src/vendor/three/core.js#L2509)：for 2D Transforms Sets this matrix as a 2D translation transform. @param {number\|Vector2} x - The amount to translate in the X axis or alternatively a translation vector. @param {number} y - The amount to translate in the Y axis. @return {Matrix3} A reference to this matrix.
- `makeRotation(theta)` [源码:2518](../../eyes/src/vendor/three/core.js#L2518)：Sets this matrix as a 2D rotational transformation. @param {number} theta - The rotation in radians. @return {Matrix3} A reference to this matrix.
- `makeScale(x, y)` [源码:2530](../../eyes/src/vendor/three/core.js#L2530)：Sets this matrix as a 2D scale transform. @param {number} x - The amount to scale in the X axis. @param {number} y - The amount to scale in the Y axis. @return {Matrix3} A reference to this matrix.
- `equals(e)` [源码:2533](../../eyes/src/vendor/three/core.js#L2533)：源码方法 equals；作用以类职责与源码实现为准，未猜测压缩参数含义
- `fromArray(e, t=0)` [源码:2539](../../eyes/src/vendor/three/core.js#L2539)：源码方法 fromArray；作用以类职责与源码实现为准，未猜测压缩参数含义
- `toArray(array=[], offset=0)` [源码:2551](../../eyes/src/vendor/three/core.js#L2551)：Writes the elements of this matrix to the given array. If no array is provided, the method returns a new instance. @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order. @param {number} [offset=0] - Index of the first element in the array. @return {Array<number>} The matrix elements in column-major order.
- `clone()` [源码:2560](../../eyes/src/vendor/three/core.js#L2560)：Returns a matrix with copied values from this instance. @return {Matrix3} A clone of this instance.

### `ImageUtils`

图像像素处理及颜色空间转换。父类 `无`。

- `static getDataURL(e, t="image/png")` [源码:2652](../../eyes/src/vendor/three/core.js#L2652)：源码方法 getDataURL；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static sRGBToLinear(e)` [源码:2663](../../eyes/src/vendor/three/core.js#L2663)：源码方法 sRGBToLinear；作用以类职责与源码实现为准，未猜测压缩参数含义

### `Source`

共享纹理图像的数据源及更新版本。父类 `无`。

- `constructor(data=null)` [源码:2688](../../eyes/src/vendor/three/core.js#L2688)：当前操作：写入 data、dataReady、isSource、uuid、version；返回 无显式返回。
- `getSize(e)` [源码:2693](../../eyes/src/vendor/three/core.js#L2693)：源码方法 getSize；作用以类职责与源码实现为准，未猜测压缩参数含义
- `set needsUpdate(e)` [源码:2697](../../eyes/src/vendor/three/core.js#L2697)：仅输入 true 时递增 version，标记资源需要重新上传或刷新
- `toJSON(e)` [源码:2700](../../eyes/src/vendor/three/core.js#L2700)：序列化资源和引用；共享资源通过元数据缓存去重

### `Texture`

Base class for all textures. Note: After the initial use of a texture, its dimensions, format, and type cannot be changed. Instead, call {@link Texture#dispose} on the texture and instantiate a new one. @augments EventDispatcher。父类 `EventDispatcher`。

- `constructor(e=Texture.DEFAULT_IMAGE, mapping=Texture.DEFAULT_MAPPING, wrapS=ClampToEdgeWrapping, wrapT=ClampToEdgeWrapping, magFilter=LinearFilter, minFilter=LinearMipmapLinearFilter, format=RGBAFormat, type=UnsignedByteType, anisotropy=Texture.DEFAULT_ANISOTROPY, colorSpace=NoColorSpace)` [源码:2738](../../eyes/src/vendor/three/core.js#L2738)：当前操作：写入 anisotropy、center、channel、colorSpace、flipY、format、generateMipmaps、internalFormat、isArrayTexture、isRenderTargetTexture、isTexture、magFilter、mapping、matrix、matrixAutoUpdate、minFilter、mipmaps、name、normalized、offset、onUpdate、pmremVersion、premultiplyAlpha、renderTarget、repeat、rotation、source、type、unpackAlignment、updateRanges、userData、uuid、version、wrapS、wrapT；返回 无显式返回。
- `get width()` [源码:2743](../../eyes/src/vendor/three/core.js#L2743)：只读返回 this.source.getSize(Fr).x；此 getter 不执行对应 setter 的写入或更新通知
- `get height()` [源码:2746](../../eyes/src/vendor/three/core.js#L2746)：只读返回 this.source.getSize(Fr).y；此 getter 不执行对应 setter 的写入或更新通知
- `get depth()` [源码:2749](../../eyes/src/vendor/three/core.js#L2749)：只读返回 this.source.getSize(Fr).z；此 getter 不执行对应 setter 的写入或更新通知
- `get image()` [源码:2752](../../eyes/src/vendor/three/core.js#L2752)：只读返回 this.source.data；此 getter 不执行对应 setter 的写入或更新通知
- `set image(value)` [源码:2755](../../eyes/src/vendor/three/core.js#L2755)：将输入值写入 this.source.data，实际变更发生在 setter 中
- `updateMatrix()` [源码:2758](../../eyes/src/vendor/three/core.js#L2758)：源码方法 updateMatrix；作用以类职责与源码实现为准，未猜测压缩参数含义
- `addUpdateRange(start, count)` [源码:2767](../../eyes/src/vendor/three/core.js#L2767)：Adds a range of data in the data texture to be updated on the GPU. @param {number} start - Position at which to start update. @param {number} count - The number of components to update.
- `clearUpdateRanges()` [源码:2773](../../eyes/src/vendor/three/core.js#L2773)：源码方法 clearUpdateRanges；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clone()` [源码:2781](../../eyes/src/vendor/three/core.js#L2781)：Returns a new texture with copied values from this instance. @return {Texture} A clone of this instance.
- `copy(source)` [源码:2790](../../eyes/src/vendor/three/core.js#L2790)：Copies the values of the given texture to this instance. @param {Texture} source - The texture to copy. @return {Texture} A reference to this instance.
- `setValues(e)` [源码:2793](../../eyes/src/vendor/three/core.js#L2793)：源码方法 setValues；作用以类职责与源码实现为准，未猜测压缩参数含义
- `toJSON(e)` [源码:2804](../../eyes/src/vendor/three/core.js#L2804)：序列化资源和引用；共享资源通过元数据缓存去重
- `dispose()` [源码:2838](../../eyes/src/vendor/three/core.js#L2838)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `transformUv(e)` [源码:2843](../../eyes/src/vendor/three/core.js#L2843)：源码方法 transformUv；作用以类职责与源码实现为准，未猜测压缩参数含义
- `set needsUpdate(e)` [源码:2867](../../eyes/src/vendor/three/core.js#L2867)：仅输入 true 时递增 version，标记资源需要重新上传或刷新
- `set needsPMREMUpdate(e)` [源码:2870](../../eyes/src/vendor/three/core.js#L2870)：仅输入 true 时递增 pmremVersion，标记环境预过滤缓存失效

### `Vector4`

Class representing a 4D vector. A 4D vector is an ordered quadruplet of numbers (labeled x, y, z and w), which can be used to represent a number of things, such as: - A point in 4D space. - A direction and length in 4D space. In three.js the length will always be the Euclidean distance(straight-line distance) from ˋ(0, 0, 0, 0)ˋ to ˋ(x, y, z, w)ˋ and the direction is also measured from ˋ(0, 0, 0, 0)ˋ towards ˋ(x, y, z, w)ˋ. - Any arbitrary ordered quadruplet of numbers. There are other things a 4D vector can be used to represent, however these are the most common uses in *three.js*. Iterating through a vector instance will yield its components ˋ(x, y, z, w)ˋ in the corresponding order. ˋˋˋjs const a = new THREE.Vector4( 0, 1, 0, 0 ); //no arguments; will be initialised to (0, 0, 0, 1) const b = new THREE.Vector4( ); const d = a.dot( b ); ˋˋˋ。父类 `无`。

- `static <static block>()` [源码:2900](../../eyes/src/vendor/three/core.js#L2900)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `constructor(x=0, y=0, z=0, w=1)` [源码:2911](../../eyes/src/vendor/three/core.js#L2911)：Constructs a new 4D vector. @param {number} [x=0] - The x value of this vector. @param {number} [y=0] - The y value of this vector. @param {number} [z=0] - The z value of this vector. @param {number} [w=1] - The w value of this vector.
- `get width()` [源码:2914](../../eyes/src/vendor/three/core.js#L2914)：只读返回 this.z；此 getter 不执行对应 setter 的写入或更新通知
- `set width(value)` [源码:2917](../../eyes/src/vendor/three/core.js#L2917)：将输入值写入 this.z，实际变更发生在 setter 中
- `get height()` [源码:2920](../../eyes/src/vendor/three/core.js#L2920)：只读返回 this.w；此 getter 不执行对应 setter 的写入或更新通知
- `set height(value)` [源码:2923](../../eyes/src/vendor/three/core.js#L2923)：将输入值写入 this.w，实际变更发生在 setter 中
- `set(x, y, z, w)` [源码:2935](../../eyes/src/vendor/three/core.js#L2935)：Sets the vector components. @param {number} x - The value of the x component. @param {number} y - The value of the y component. @param {number} z - The value of the z component. @param {number} w - The value of the w component. @return {Vector4} A reference to this vector.
- `setScalar(scalar)` [源码:2944](../../eyes/src/vendor/three/core.js#L2944)：Sets the vector components to the same value. @param {number} scalar - The value to set for all vector components. @return {Vector4} A reference to this vector.
- `setX(x)` [源码:2953](../../eyes/src/vendor/three/core.js#L2953)：Sets the vector's x component to the given value @param {number} x - The value to set. @return {Vector4} A reference to this vector.
- `setY(y)` [源码:2962](../../eyes/src/vendor/three/core.js#L2962)：Sets the vector's y component to the given value @param {number} y - The value to set. @return {Vector4} A reference to this vector.
- `setZ(z)` [源码:2971](../../eyes/src/vendor/three/core.js#L2971)：Sets the vector's z component to the given value @param {number} z - The value to set. @return {Vector4} A reference to this vector.
- `setW(w)` [源码:2980](../../eyes/src/vendor/three/core.js#L2980)：Sets the vector's w component to the given value @param {number} w - The value to set. @return {Vector4} A reference to this vector.
- `setComponent(e, t)` [源码:2983](../../eyes/src/vendor/three/core.js#L2983)：源码方法 setComponent；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getComponent(e)` [源码:3002](../../eyes/src/vendor/three/core.js#L3002)：源码方法 getComponent；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clone()` [源码:3021](../../eyes/src/vendor/three/core.js#L3021)：Returns a new vector with copied values from this instance. @return {Vector4} A clone of this instance.
- `copy(e)` [源码:3024](../../eyes/src/vendor/three/core.js#L3024)：复制自身状态；需注意资源引用与深复制边界
- `add(v)` [源码:3033](../../eyes/src/vendor/three/core.js#L3033)：Adds the given vector to this instance. @param {Vector4} v - The vector to add. @return {Vector4} A reference to this vector.
- `addScalar(s)` [源码:3042](../../eyes/src/vendor/three/core.js#L3042)：Adds the given scalar value to all components of this instance. @param {number} s - The scalar to add. @return {Vector4} A reference to this vector.
- `addVectors(a, b)` [源码:3052](../../eyes/src/vendor/three/core.js#L3052)：Adds the given vectors and stores the result in this instance. @param {Vector4} a - The first vector. @param {Vector4} b - The second vector. @return {Vector4} A reference to this vector.
- `addScaledVector(v, s)` [源码:3062](../../eyes/src/vendor/three/core.js#L3062)：Adds the given vector scaled by the given factor to this instance. @param {Vector4} v - The vector. @param {number} s - The factor that scales ˋvˋ. @return {Vector4} A reference to this vector.
- `sub(v)` [源码:3071](../../eyes/src/vendor/three/core.js#L3071)：Subtracts the given vector from this instance. @param {Vector4} v - The vector to subtract. @return {Vector4} A reference to this vector.
- `subScalar(s)` [源码:3080](../../eyes/src/vendor/three/core.js#L3080)：Subtracts the given scalar value from all components of this instance. @param {number} s - The scalar to subtract. @return {Vector4} A reference to this vector.
- `subVectors(a, b)` [源码:3090](../../eyes/src/vendor/three/core.js#L3090)：Subtracts the given vectors and stores the result in this instance. @param {Vector4} a - The first vector. @param {Vector4} b - The second vector. @return {Vector4} A reference to this vector.
- `multiply(v)` [源码:3099](../../eyes/src/vendor/three/core.js#L3099)：Multiplies the given vector with this instance. @param {Vector4} v - The vector to multiply. @return {Vector4} A reference to this vector.
- `multiplyScalar(scalar)` [源码:3108](../../eyes/src/vendor/three/core.js#L3108)：Multiplies the given scalar value with all components of this instance. @param {number} scalar - The scalar to multiply. @return {Vector4} A reference to this vector.
- `applyMatrix4(m)` [源码:3117](../../eyes/src/vendor/three/core.js#L3117)：Multiplies this vector with the given 4x4 matrix. @param {Matrix4} m - The 4x4 matrix. @return {Vector4} A reference to this vector.
- `divide(v)` [源码:3131](../../eyes/src/vendor/three/core.js#L3131)：Divides this instance by the given vector. @param {Vector4} v - The vector to divide. @return {Vector4} A reference to this vector.
- `divideScalar(scalar)` [源码:3140](../../eyes/src/vendor/three/core.js#L3140)：Divides this vector by the given scalar. @param {number} scalar - The scalar to divide. @return {Vector4} A reference to this vector.
- `setAxisAngleFromQuaternion(e)` [源码:3143](../../eyes/src/vendor/three/core.js#L3143)：源码方法 setAxisAngleFromQuaternion；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setAxisAngleFromRotationMatrix(e)` [源码:3148](../../eyes/src/vendor/three/core.js#L3148)：源码方法 setAxisAngleFromRotationMatrix；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setFromMatrixPosition(m)` [源码:3183](../../eyes/src/vendor/three/core.js#L3183)：Sets the vector components to the position elements of the given transformation matrix. @param {Matrix4} m - The 4x4 matrix. @return {Vector4} A reference to this vector.
- `min(v)` [源码:3194](../../eyes/src/vendor/three/core.js#L3194)：If this vector's x, y, z or w value is greater than the given vector's x, y, z or w value, replace that value with the corresponding min value. @param {Vector4} v - The vector. @return {Vector4} A reference to this vector.
- `max(v)` [源码:3204](../../eyes/src/vendor/three/core.js#L3204)：If this vector's x, y, z or w value is less than the given vector's x, y, z or w value, replace that value with the corresponding max value. @param {Vector4} v - The vector. @return {Vector4} A reference to this vector.
- `clamp(min, max)` [源码:3217](../../eyes/src/vendor/three/core.js#L3217)：If this vector's x, y, z or w value is greater than the max vector's x, y, z or w value, it is replaced by the corresponding value. If this vector's x, y, z or w value is less than the min vector's x, y, z or w value, it is replaced by the corresponding value. @param {Vector4} min - The minimum x, y and z values. @param {Vector4} max - The maximum x, y and z values in the desired range. @return {Vector4} A reference to this vector.
- `clampScalar(minVal, maxVal)` [源码:3230](../../eyes/src/vendor/three/core.js#L3230)：If this vector's x, y, z or w values are greater than the max value, they are replaced by the max value. If this vector's x, y, z or w values are less than the min value, they are replaced by the min value. @param {number} minVal - The minimum value the components will be clamped to. @param {number} maxVal - The maximum value the components will be clamped to. @return {Vector4} A reference to this vector.
- `clampLength(min, max)` [源码:3243](../../eyes/src/vendor/three/core.js#L3243)：If this vector's length is greater than the max value, it is replaced by the max value. If this vector's length is less than the min value, it is replaced by the min value. @param {number} min - The minimum value the vector length will be clamped to. @param {number} max - The maximum value the vector length will be clamped to. @return {Vector4} A reference to this vector.
- `floor()` [源码:3252](../../eyes/src/vendor/three/core.js#L3252)：The components of this vector are rounded down to the nearest integer value. @return {Vector4} A reference to this vector.
- `ceil()` [源码:3260](../../eyes/src/vendor/three/core.js#L3260)：The components of this vector are rounded up to the nearest integer value. @return {Vector4} A reference to this vector.
- `round()` [源码:3268](../../eyes/src/vendor/three/core.js#L3268)：The components of this vector are rounded to the nearest integer value @return {Vector4} A reference to this vector.
- `roundToZero()` [源码:3277](../../eyes/src/vendor/three/core.js#L3277)：The components of this vector are rounded towards zero (up if negative, down if positive) to an integer value. @return {Vector4} A reference to this vector.
- `negate()` [源码:3285](../../eyes/src/vendor/three/core.js#L3285)：Inverts this vector - i.e. sets x = -x, y = -y, z = -z, w = -w. @return {Vector4} A reference to this vector.
- `dot(v)` [源码:3294](../../eyes/src/vendor/three/core.js#L3294)：Calculates the dot product of the given vector with this instance. @param {Vector4} v - The vector to compute the dot product with. @return {number} The result of the dot product.
- `lengthSq()` [源码:3304](../../eyes/src/vendor/three/core.js#L3304)：Computes the square of the Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w). If you are comparing the lengths of vectors, you should compare the length squared instead as it is slightly more efficient to calculate. @return {number} The square length of this vector.
- `length()` [源码:3312](../../eyes/src/vendor/three/core.js#L3312)：Computes the Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w). @return {number} The length of this vector.
- `manhattanLength()` [源码:3320](../../eyes/src/vendor/three/core.js#L3320)：Computes the Manhattan length of this vector. @return {number} The length of this vector.
- `normalize()` [源码:3329](../../eyes/src/vendor/three/core.js#L3329)：Converts this vector to a unit vector - that is, sets it equal to a vector with the same direction as this one, but with a vector length of ˋ1ˋ. @return {Vector4} A reference to this vector.
- `setLength(length)` [源码:3339](../../eyes/src/vendor/three/core.js#L3339)：Sets this vector to a vector with the same direction as this one, but with the specified length. @param {number} length - The new length of this vector. @return {Vector4} A reference to this vector.
- `lerp(v, alpha)` [源码:3351](../../eyes/src/vendor/three/core.js#L3351)：Linearly interpolates between the given vector and this instance, where alpha is the percent distance along the line - alpha = 0 will be this vector, and alpha = 1 will be the given one. @param {Vector4} v - The vector to interpolate towards. @param {number} alpha - The interpolation factor, typically in the closed interval ˋ[0, 1]ˋ. @return {Vector4} A reference to this vector.
- `lerpVectors(v1, v2, alpha)` [源码:3364](../../eyes/src/vendor/three/core.js#L3364)：Linearly interpolates between the given vectors, where alpha is the percent distance along the line - alpha = 0 will be first vector, and alpha = 1 will be the second one. The result is stored in this instance. @param {Vector4} v1 - The first vector. @param {Vector4} v2 - The second vector. @param {number} alpha - The interpolation factor, typically in the closed interval ˋ[0, 1]ˋ. @return {Vector4} A reference to this vector.
- `equals(v)` [源码:3373](../../eyes/src/vendor/three/core.js#L3373)：Returns ˋtrueˋ if this vector is equal with the given one. @param {Vector4} v - The vector to test for equality. @return {boolean} Whether this vector is equal with the given one.
- `fromArray(array, offset=0)` [源码:3384](../../eyes/src/vendor/three/core.js#L3384)：Sets this vector's x value to be ˋarray[ offset ]ˋ, y value to be ˋarray[ offset + 1 ]ˋ, z value to be ˋarray[ offset + 2 ]ˋ, w value to be ˋarray[ offset + 3 ]ˋ. @param {Array<number>} array - An array holding the vector component values. @param {number} [offset=0] - The offset into the array. @return {Vector4} A reference to this vector.
- `toArray(array=[], offset=0)` [源码:3395](../../eyes/src/vendor/three/core.js#L3395)：Writes the components of this vector to the given array. If no array is provided, the method returns a new instance. @param {Array<number>} [array=[]] - The target array holding the vector components. @param {number} [offset=0] - Index of the first element in the array. @return {Array<number>} The vector components.
- `fromBufferAttribute(attribute, index)` [源码:3405](../../eyes/src/vendor/three/core.js#L3405)：Sets the components of this vector from the given buffer attribute. @param {BufferAttribute} attribute - The buffer attribute holding vector data. @param {number} index - The index into the attribute. @return {Vector4} A reference to this vector.
- `random()` [源码:3414](../../eyes/src/vendor/three/core.js#L3414)：Sets each component of this vector to a pseudo-random value between ˋ0ˋ and ˋ1ˋ, excluding ˋ1ˋ. @return {Vector4} A reference to this vector.
- `Symbol.iterator()` [源码:3417](../../eyes/src/vendor/three/core.js#L3417)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `RenderTarget`

A render target is a buffer where the video card draws pixels for a scene that is being rendered in the background. It is used in different effects, such as applying postprocessing to a rendered image before displaying it on the screen. @augments EventDispatcher。父类 `EventDispatcher`。

- `constructor(width=1, height=1, options={})` [源码:3463](../../eyes/src/vendor/three/core.js#L3463)：Render target options. @typedef {Object} RenderTarget~Options @property {boolean} [generateMipmaps=false] - Whether to generate mipmaps or not. @property {number} [magFilter=LinearFilter] - The mag filter. @property {number} [minFilter=LinearFilter] - The min filter. @property {number} [format=RGBAFormat] - The texture format. @property {number} [type=UnsignedByteType] - The texture type. @property {?string} [internalFormat=null] - The texture's internal format. @property {number} [wrapS=ClampToEdgeWrapping] - The texture's uv wrapping mode. @property {number} [wrapT=ClampToEdgeWrapping] - The texture's uv wrapping mode. @property {number} [anisotropy=1] - The texture's anisotropy value. @property {string} [colorSpace=NoColorSpace] - The texture's color space. @property {boolean} [depthBuffer=true] - Whether to allocate a depth buffer or not. @property {boolean} [stencilBuffer=false] - Whether to allocate a stencil buffer or not. @property {boolean} [resolveDepthBuffer=true] - Whether to resolve the depth buffer or not. @property {boolean} [resolveStencilBuffer=true] - Whether to resolve the stencil buffer or not. @property {?Texture} [depthTexture=null] - Reference to a depth texture. @property {number} [samples=0] - The MSAA samples count. @property {number} [count=1] - Defines the number of color attachments . Must be at least ˋ1ˋ. @property {number} [depth=1] - The texture depth. @property {boolean} [multiview=false] - Whether this target is used for multiview rendering (WebGL OVR_multiview2 extension). @property {boolean} [useArrayDepthTexture=false] - Whether to create the depth texture as an array texture for per-layer depth testing. This is separate from multiview so layered render targets can use array depth without the multiview extension. Constructs a new render target. @param {number} [width=1] - The width of the render target. @param {number} [height=1] - The height of the render target. @param {RenderTarget~Options} [options] - The configuration object.
- `_setTextureOptions(e={})` [源码:3489](../../eyes/src/vendor/three/core.js#L3489)：源码方法 _setTextureOptions；作用以类职责与源码实现为准，未猜测压缩参数含义
- `get texture()` [源码:3501](../../eyes/src/vendor/three/core.js#L3501)：只读返回 this.textures[0]；此 getter 不执行对应 setter 的写入或更新通知
- `set texture(value)` [源码:3504](../../eyes/src/vendor/three/core.js#L3504)：将输入值写入 this.textures[0]，实际变更发生在 setter 中
- `set depthTexture(depthTexture)` [源码:3507](../../eyes/src/vendor/three/core.js#L3507)：写入深度纹理；先解除旧纹理 renderTarget 关联，再为新纹理设置反向关联
- `get depthTexture()` [源码:3510](../../eyes/src/vendor/three/core.js#L3510)：只读返回 this._depthTexture；此 getter 不执行对应 setter 的写入或更新通知
- `setSize(width, height, depth=1)` [源码:3513](../../eyes/src/vendor/three/core.js#L3513)：更新像素尺寸及关联目标；后处理链需要同步所有通道
- `clone()` [源码:3526](../../eyes/src/vendor/three/core.js#L3526)：Returns a new render target with copied values from this instance. @return {RenderTarget} A clone of this instance.
- `copy(e)` [源码:3529](../../eyes/src/vendor/three/core.js#L3529)：复制自身状态；需注意资源引用与深复制边界
- `dispose()` [源码:3538](../../eyes/src/vendor/three/core.js#L3538)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

### `WebGLRenderTarget`

A render target used in context of {@link WebGLRenderer}. @augments RenderTarget。父类 `RenderTarget`。

- `constructor(width=1, height=1, options={})` [源码:3557](../../eyes/src/vendor/three/core.js#L3557)：Constructs a new 3D render target. @param {number} [width=1] - The width of the render target. @param {number} [height=1] - The height of the render target. @param {RenderTarget~Options} [options] - The configuration object.

### `DataArrayTexture`

Creates an array of textures directly from raw buffer data. @augments Texture。父类 `Texture`。

- `constructor(data=null, width=1, height=1, depth=1)` [源码:3575](../../eyes/src/vendor/three/core.js#L3575)：Constructs a new data array texture. @param {?TypedArray} [data=null] - The buffer data. @param {number} [width=1] - The width of the texture. @param {number} [height=1] - The height of the texture. @param {number} [depth=1] - The depth of the texture.
- `addLayerUpdate(layerIndex)` [源码:3592](../../eyes/src/vendor/three/core.js#L3592)：Describes that a specific layer of the texture needs to be updated. Normally when {@link Texture#needsUpdate} is set to ˋtrueˋ, the entire data texture array is sent to the GPU. Marking specific layers will only transmit subsets of all mipmaps associated with a specific depth in the array which is often much more performant. @param {number} layerIndex - The layer index that should be updated.
- `clearLayerUpdates()` [源码:3595](../../eyes/src/vendor/three/core.js#L3595)：源码方法 clearLayerUpdates；作用以类职责与源码实现为准，未猜测压缩参数含义

### `WebGLArrayRenderTarget`

An array render target used in context of {@link WebGLRenderer}. @augments WebGLRenderTarget。父类 `WebGLRenderTarget`。

- `constructor(width=1, height=1, depth=1, options={})` [源码:3613](../../eyes/src/vendor/three/core.js#L3613)：Constructs a new array render target. @param {number} [width=1] - The width of the render target. @param {number} [height=1] - The height of the render target. @param {number} [depth=1] - The height of the render target. @param {RenderTarget~Options} [options] - The configuration object.

### `Data3DTexture`

Creates a three-dimensional texture from raw data, with parameters to divide it into width, height, and depth. @augments Texture。父类 `Texture`。

- `constructor(data=null, width=1, height=1, depth=1)` [源码:3632](../../eyes/src/vendor/three/core.js#L3632)：Constructs a new data array texture. @param {?TypedArray} [data=null] - The buffer data. @param {number} [width=1] - The width of the texture. @param {number} [height=1] - The height of the texture. @param {number} [depth=1] - The depth of the texture.

### `WebGL3DRenderTarget`

A 3D render target used in context of {@link WebGLRenderer}. @augments WebGLRenderTarget。父类 `WebGLRenderTarget`。

- `constructor(width=1, height=1, depth=1, options={})` [源码:3655](../../eyes/src/vendor/three/core.js#L3655)：Constructs a new 3D render target. @param {number} [width=1] - The width of the render target. @param {number} [height=1] - The height of the render target. @param {number} [depth=1] - The height of the render target. @param {RenderTarget~Options} [options] - The configuration object.

### `Matrix4`

Represents a 4x4 matrix. The most common use of a 4x4 matrix in 3D computer graphics is as a transformation matrix. For an introduction to transformation matrices as used in WebGL, check out [this tutorial](https://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices) This allows a 3D vector representing a point in 3D space to undergo transformations such as translation, rotation, shear, scale, reflection, orthogonal or perspective projection and so on, by being multiplied by the matrix. This is known as ˋapplyingˋ the matrix to the vector. A Note on Row-Major and Column-Major Ordering: The constructor and {@link Matrix3#set} method take arguments in [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order) order, while internally they are stored in the {@link Matrix3#elements} array in column-major order. This means that calling: ˋˋˋjs const m = new THREE.Matrix4(); m.set( 11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44 ); ˋˋˋ will result in the elements array containing: ˋˋˋjs m.elements = [ 11, 21, 31, 41, 12, 22, 32, 42, 13, 23, 33, 43, 14, 24, 34, 44 ]; ˋˋˋ and internally all calculations are performed using column-major ordering. However, as the actual ordering makes no difference mathematically and most people are used to thinking about matrices in row-major order, the three.js documentation shows matrices in row-major order. Just bear in mind that if you are reading the source code, you'll have to take the transpose of any matrices outlined here to make sense of the calculations.。父类 `无`。

- `static <static block>()` [源码:3698](../../eyes/src/vendor/three/core.js#L3698)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `constructor(e, t, n, r, i, a, s, o, c, l, u, d, h, p, f, m)` [源码:3701](../../eyes/src/vendor/three/core.js#L3701)：当前操作：写入 elements；返回 无显式返回。
- `set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44)` [源码:3726](../../eyes/src/vendor/three/core.js#L3726)：Sets the elements of the matrix.The arguments are supposed to be in row-major order. @param {number} [n11] - 1-1 matrix element. @param {number} [n12] - 1-2 matrix element. @param {number} [n13] - 1-3 matrix element. @param {number} [n14] - 1-4 matrix element. @param {number} [n21] - 2-1 matrix element. @param {number} [n22] - 2-2 matrix element. @param {number} [n23] - 2-3 matrix element. @param {number} [n24] - 2-4 matrix element. @param {number} [n31] - 3-1 matrix element. @param {number} [n32] - 3-2 matrix element. @param {number} [n33] - 3-3 matrix element. @param {number} [n34] - 3-4 matrix element. @param {number} [n41] - 4-1 matrix element. @param {number} [n42] - 4-2 matrix element. @param {number} [n43] - 4-3 matrix element. @param {number} [n44] - 4-4 matrix element. @return {Matrix4} A reference to this matrix.
- `identity()` [源码:3735](../../eyes/src/vendor/three/core.js#L3735)：Sets this matrix to the 4x4 identity matrix. @return {Matrix4} A reference to this matrix.
- `clone()` [源码:3743](../../eyes/src/vendor/three/core.js#L3743)：Returns a matrix with copied values from this instance. @return {Matrix4} A clone of this instance.
- `copy(m)` [源码:3752](../../eyes/src/vendor/three/core.js#L3752)：Copies the values of the given matrix to this instance. @param {Matrix4} m - The matrix to copy. @return {Matrix4} A reference to this matrix.
- `copyPosition(m)` [源码:3764](../../eyes/src/vendor/three/core.js#L3764)：Copies the translation component of the given matrix into this matrix's translation component. @param {Matrix4} m - The matrix to copy the translation component. @return {Matrix4} A reference to this matrix.
- `setFromMatrix3(m)` [源码:3775](../../eyes/src/vendor/three/core.js#L3775)：Set the upper 3x3 elements of this matrix to the values of given 3x3 matrix. @param {Matrix3} m - The 3x3 matrix. @return {Matrix4} A reference to this matrix.
- `extractBasis(e, t, n)` [源码:3779](../../eyes/src/vendor/three/core.js#L3779)：源码方法 extractBasis；作用以类职责与源码实现为准，未猜测压缩参数含义
- `makeBasis(xAxis, yAxis, zAxis)` [源码:3790](../../eyes/src/vendor/three/core.js#L3790)：Sets the given basis vectors to this matrix. @param {Vector3} xAxis - The basis's x axis. @param {Vector3} yAxis - The basis's y axis. @param {Vector3} zAxis - The basis's z axis. @return {Matrix4} A reference to this matrix.
- `extractRotation(e)` [源码:3793](../../eyes/src/vendor/three/core.js#L3793)：源码方法 extractRotation；作用以类职责与源码实现为准，未猜测压缩参数含义
- `makeRotationFromEuler(e)` [源码:3802](../../eyes/src/vendor/three/core.js#L3802)：源码方法 makeRotationFromEuler；作用以类职责与源码实现为准，未猜测压缩参数含义
- `makeRotationFromQuaternion(q)` [源码:3860](../../eyes/src/vendor/three/core.js#L3860)：Sets the rotation component of this matrix to the rotation specified by the given Quaternion as outlined [here](https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion) The rest of the matrix is set to the identity. @param {Quaternion} q - The Quaternion. @return {Matrix4} A reference to this matrix.
- `lookAt(e, t, n)` [源码:3863](../../eyes/src/vendor/three/core.js#L3863)：源码方法 lookAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `multiply(m)` [源码:3873](../../eyes/src/vendor/three/core.js#L3873)：Post-multiplies this matrix by the given 4x4 matrix. @param {Matrix4} m - The matrix to multiply with. @return {Matrix4} A reference to this matrix.
- `premultiply(m)` [源码:3882](../../eyes/src/vendor/three/core.js#L3882)：Pre-multiplies this matrix by the given 4x4 matrix. @param {Matrix4} m - The matrix to multiply with. @return {Matrix4} A reference to this matrix.
- `multiplyMatrices(a, b)` [源码:3893](../../eyes/src/vendor/three/core.js#L3893)：Multiples the given 4x4 matrices and stores the result in this matrix. @param {Matrix4} a - The first matrix. @param {Matrix4} b - The second matrix. @return {Matrix4} A reference to this matrix.
- `multiplyScalar(s)` [源码:3937](../../eyes/src/vendor/three/core.js#L3937)：Multiplies every component of the matrix by the given scalar. @param {number} s - The scalar. @return {Matrix4} A reference to this matrix.
- `determinant()` [源码:3948](../../eyes/src/vendor/three/core.js#L3948)：Computes and returns the determinant of this matrix. Based on the method outlined [here](http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.html). @return {number} The determinant.
- `determinantAffine()` [源码:3985](../../eyes/src/vendor/three/core.js#L3985)：Computes and returns the determinant of the 4x4 matrix, but assumes the matrix is affine, saving some computations. For affine matrices (like an object's world matrix), this value equals the full 4x4 {@link Matrix4#determinant} but is cheaper to compute. Assumes the bottom row is [0, 0, 0, 1]. @return {number} The determinant of the matrix.
- `transpose()` [源码:4003](../../eyes/src/vendor/three/core.js#L4003)：Transposes this matrix in place. @return {Matrix4} A reference to this matrix.
- `setPosition(x, y, z)` [源码:4017](../../eyes/src/vendor/three/core.js#L4017)：Sets the position component for this matrix from the given vector, without affecting the rest of the matrix. @param {number\|Vector3} x - The x component of the vector or alternatively the vector object. @param {number} y - The y component of the vector. @param {number} z - The z component of the vector. @return {Matrix4} A reference to this matrix.
- `invert()` [源码:4021](../../eyes/src/vendor/three/core.js#L4021)：源码方法 invert；作用以类职责与源码实现为准，未猜测压缩参数含义
- `scale(v)` [源码:4062](../../eyes/src/vendor/three/core.js#L4062)：Multiplies the columns of this matrix by the given vector. @param {Vector3} v - The scale vector. @return {Matrix4} A reference to this matrix.
- `getMaxScaleOnAxis()` [源码:4074](../../eyes/src/vendor/three/core.js#L4074)：Gets the maximum scale value of the three axes. @return {number} The maximum scale.
- `makeTranslation(x, y, z)` [源码:4089](../../eyes/src/vendor/three/core.js#L4089)：Sets this matrix as a translation transform from the given vector. @param {number\|Vector3} x - The amount to translate in the X axis or alternatively a translation vector. @param {number} y - The amount to translate in the Y axis. @param {number} z - The amount to translate in the z axis. @return {Matrix4} A reference to this matrix.
- `makeRotationX(theta)` [源码:4099](../../eyes/src/vendor/three/core.js#L4099)：Sets this matrix as a rotational transformation around the X axis by the given angle. @param {number} theta - The rotation in radians. @return {Matrix4} A reference to this matrix.
- `makeRotationY(theta)` [源码:4111](../../eyes/src/vendor/three/core.js#L4111)：Sets this matrix as a rotational transformation around the Y axis by the given angle. @param {number} theta - The rotation in radians. @return {Matrix4} A reference to this matrix.
- `makeRotationZ(theta)` [源码:4123](../../eyes/src/vendor/three/core.js#L4123)：Sets this matrix as a rotational transformation around the Z axis by the given angle. @param {number} theta - The rotation in radians. @return {Matrix4} A reference to this matrix.
- `makeRotationAxis(axis, angle)` [源码:4139](../../eyes/src/vendor/three/core.js#L4139)：Sets this matrix as a rotational transformation around the given axis by the given angle. This is a somewhat controversial but mathematically sound alternative to rotating via Quaternions. See the discussion [here](https://www.gamedev.net/articles/programming/math-and-physics/do-we-really-need-quaternions-r1199). @param {Vector3} axis - The normalized rotation axis. @param {number} angle - The rotation in radians. @return {Matrix4} A reference to this matrix.
- `makeScale(x, y, z)` [源码:4158](../../eyes/src/vendor/three/core.js#L4158)：Sets this matrix as a scale transformation. @param {number} x - The amount to scale in the X axis. @param {number} y - The amount to scale in the Y axis. @param {number} z - The amount to scale in the Z axis. @return {Matrix4} A reference to this matrix.
- `makeShear(xy, xz, yx, yz, zx, zy)` [源码:4172](../../eyes/src/vendor/three/core.js#L4172)：Sets this matrix as a shear transformation. @param {number} xy - The amount to shear X by Y. @param {number} xz - The amount to shear X by Z. @param {number} yx - The amount to shear Y by X. @param {number} yz - The amount to shear Y by Z. @param {number} zx - The amount to shear Z by X. @param {number} zy - The amount to shear Z by Y. @return {Matrix4} A reference to this matrix.
- `compose(position, quaternion, scale)` [源码:4184](../../eyes/src/vendor/three/core.js#L4184)：Sets this matrix to the transformation composed of the given position, rotation (Quaternion) and scale. @param {Vector3} position - The position vector. @param {Quaternion} quaternion - The rotation as a Quaternion. @param {Vector3} scale - The scale vector. @return {Matrix4} A reference to this matrix.
- `decompose(e, t, n)` [源码:4207](../../eyes/src/vendor/three/core.js#L4207)：源码方法 decompose；作用以类职责与源码实现为准，未猜测压缩参数含义
- `makePerspective(e, t, n, r, i, a, s=WebGLCoordinateSystem, o=!1)` [源码:4221](../../eyes/src/vendor/three/core.js#L4221)：源码方法 makePerspective；作用以类职责与源码实现为准，未猜测压缩参数含义
- `makeOrthographic(e, t, n, r, i, a, s=WebGLCoordinateSystem, o=!1)` [源码:4234](../../eyes/src/vendor/three/core.js#L4234)：源码方法 makeOrthographic；作用以类职责与源码实现为准，未猜测压缩参数含义
- `equals(e)` [源码:4247](../../eyes/src/vendor/three/core.js#L4247)：源码方法 equals；作用以类职责与源码实现为准，未猜测压缩参数含义
- `fromArray(e, t=0)` [源码:4253](../../eyes/src/vendor/three/core.js#L4253)：源码方法 fromArray；作用以类职责与源码实现为准，未猜测压缩参数含义
- `toArray(array=[], offset=0)` [源码:4265](../../eyes/src/vendor/three/core.js#L4265)：Writes the elements of this matrix to the given array. If no array is provided, the method returns a new instance. @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order. @param {number} [offset=0] - Index of the first element in the array. @return {Array<number>} The matrix elements in column-major order.

### `Euler`

A class representing Euler angles. Euler angles describe a rotational transformation by rotating an object on its various axes in specified amounts per axis, and a specified axis order. Iterating through an instance will yield its components (x, y, z, order) in the corresponding order. ˋˋˋjs const a = new THREE.Euler( 0, 1, 1.57, 'XYZ' ); const b = new THREE.Vector3( 1, 0, 1 ); b.applyEuler(a); ˋˋˋ。父类 `无`。

- `constructor(x=0, y=0, z=0, order=Euler.DEFAULT_ORDER)` [源码:4304](../../eyes/src/vendor/three/core.js#L4304)：Constructs a new euler instance. @param {number} [x=0] - The angle of the x axis in radians. @param {number} [y=0] - The angle of the y axis in radians. @param {number} [z=0] - The angle of the z axis in radians. @param {string} [order=Euler.DEFAULT_ORDER] - A string representing the order that the rotations are applied.
- `get x()` [源码:4307](../../eyes/src/vendor/three/core.js#L4307)：只读返回 this._x；此 getter 不执行对应 setter 的写入或更新通知
- `set x(value)` [源码:4310](../../eyes/src/vendor/three/core.js#L4310)：写入 _x，随后调用 _onChangeCallback 通知旋转状态变化
- `get y()` [源码:4313](../../eyes/src/vendor/three/core.js#L4313)：只读返回 this._y；此 getter 不执行对应 setter 的写入或更新通知
- `set y(value)` [源码:4316](../../eyes/src/vendor/three/core.js#L4316)：写入 _y，随后调用 _onChangeCallback 通知旋转状态变化
- `get z()` [源码:4319](../../eyes/src/vendor/three/core.js#L4319)：只读返回 this._z；此 getter 不执行对应 setter 的写入或更新通知
- `set z(value)` [源码:4322](../../eyes/src/vendor/three/core.js#L4322)：写入 _z，随后调用 _onChangeCallback 通知旋转状态变化
- `get order()` [源码:4325](../../eyes/src/vendor/three/core.js#L4325)：只读返回 this._order；此 getter 不执行对应 setter 的写入或更新通知
- `set order(value)` [源码:4328](../../eyes/src/vendor/three/core.js#L4328)：写入 _order，随后调用 _onChangeCallback 通知旋转状态变化
- `set(x, y, z, order=this._order)` [源码:4340](../../eyes/src/vendor/three/core.js#L4340)：Sets the Euler components. @param {number} x - The angle of the x axis in radians. @param {number} y - The angle of the y axis in radians. @param {number} z - The angle of the z axis in radians. @param {string} [order] - A string representing the order that the rotations are applied. @return {Euler} A reference to this Euler instance.
- `clone()` [源码:4348](../../eyes/src/vendor/three/core.js#L4348)：Returns a new Euler instance with copied values from this instance. @return {Euler} A clone of this instance.
- `copy(euler)` [源码:4357](../../eyes/src/vendor/three/core.js#L4357)：Copies the values of the given Euler instance to this instance. @param {Euler} euler - The Euler instance to copy. @return {Euler} A reference to this Euler instance.
- `setFromRotationMatrix(e, order=this._order, n=!0)` [源码:4360](../../eyes/src/vendor/three/core.js#L4360)：源码方法 setFromRotationMatrix；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setFromQuaternion(q, order, update)` [源码:4403](../../eyes/src/vendor/three/core.js#L4403)：Sets the angles of this Euler instance from a normalized quaternion. @param {Quaternion} q - A normalized Quaternion. @param {string} [order] - A string representing the order that the rotations are applied. @param {boolean} [update=true] - Whether the internal ˋonChangeˋ callback should be executed or not. @return {Euler} A reference to this Euler instance.
- `setFromVector3(v, order=this._order)` [源码:4413](../../eyes/src/vendor/three/core.js#L4413)：Sets the angles of this Euler instance from the given vector. @param {Vector3} v - The vector. @param {string} [order] - A string representing the order that the rotations are applied. @return {Euler} A reference to this Euler instance.
- `reorder(newOrder)` [源码:4426](../../eyes/src/vendor/three/core.js#L4426)：Resets the euler angle with a new order by creating a quaternion from this euler angle and then setting this euler angle with the quaternion and the new order. Warning: This discards revolution information. @param {string} [newOrder] - A string representing the new order that the rotations are applied. @return {Euler} A reference to this Euler instance.
- `equals(euler)` [源码:4435](../../eyes/src/vendor/three/core.js#L4435)：Returns ˋtrueˋ if this Euler instance is equal with the given one. @param {Euler} euler - The Euler instance to test for equality. @return {boolean} Whether this Euler instance is equal with the given one.
- `fromArray(e)` [源码:4438](../../eyes/src/vendor/three/core.js#L4438)：源码方法 fromArray；作用以类职责与源码实现为准，未猜测压缩参数含义
- `toArray(array=[], offset=0)` [源码:4449](../../eyes/src/vendor/three/core.js#L4449)：Writes the components of this Euler instance to the given array. If no array is provided, the method returns a new instance. @param {Array<number,number,number,string>} [array=[]] - The target array holding the Euler components. @param {number} [offset=0] - Index of the first element in the array. @return {Array<number,number,number,string>} The Euler components.
- `_onChange(callback)` [源码:4452](../../eyes/src/vendor/three/core.js#L4452)：源码方法 _onChange；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_onChangeCallback()` [源码:4455](../../eyes/src/vendor/three/core.js#L4455)：源码方法 _onChangeCallback；作用以类职责与源码实现为准，未猜测压缩参数含义
- `Symbol.iterator()` [源码:4456](../../eyes/src/vendor/three/core.js#L4456)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `Layers`

A layers object assigns an 3D object to 1 or more of 32 layers numbered ˋ0ˋ to ˋ31ˋ - internally the layers are stored as a bit mask], and by default all 3D objects are a member of layer ˋ0ˋ. This can be used to control visibility - an object must share a layer with a camera to be visible when that camera's view is rendered. All classes that inherit from {@link Object3D} have an ˋlayersˋ property which is an instance of this class.。父类 `无`。

- `constructor()` [源码:4474](../../eyes/src/vendor/three/core.js#L4474)：当前操作：写入 mask；返回 无显式返回。
- `set(e)` [源码:4477](../../eyes/src/vendor/three/core.js#L4477)：源码方法 set；作用以类职责与源码实现为准，未猜测压缩参数含义
- `enable(e)` [源码:4480](../../eyes/src/vendor/three/core.js#L4480)：源码方法 enable；作用以类职责与源码实现为准，未猜测压缩参数含义
- `enableAll()` [源码:4483](../../eyes/src/vendor/three/core.js#L4483)：源码方法 enableAll；作用以类职责与源码实现为准，未猜测压缩参数含义
- `toggle(e)` [源码:4486](../../eyes/src/vendor/three/core.js#L4486)：源码方法 toggle；作用以类职责与源码实现为准，未猜测压缩参数含义
- `disable(e)` [源码:4489](../../eyes/src/vendor/three/core.js#L4489)：源码方法 disable；作用以类职责与源码实现为准，未猜测压缩参数含义
- `disableAll()` [源码:4492](../../eyes/src/vendor/three/core.js#L4492)：源码方法 disableAll；作用以类职责与源码实现为准，未猜测压缩参数含义
- `test(e)` [源码:4495](../../eyes/src/vendor/three/core.js#L4495)：源码方法 test；作用以类职责与源码实现为准，未猜测压缩参数含义
- `isEnabled(e)` [源码:4498](../../eyes/src/vendor/three/core.js#L4498)：源码方法 isEnabled；作用以类职责与源码实现为准，未猜测压缩参数含义

### `Object3D`

This is the base class for most objects in three.js and provides a set of properties and methods for manipulating objects in 3D space. @augments EventDispatcher。父类 `EventDispatcher`。

- `constructor()` [源码:4534](../../eyes/src/vendor/three/core.js#L4534)：当前操作：写入 animations、castShadow、children、customDepthMaterial、customDistanceMaterial、frustumCulled、isObject3D、layers、matrix、matrixAutoUpdate、matrixWorld、matrixWorldAutoUpdate、matrixWorldNeedsUpdate、name、parent、pivot、receiveShadow、renderOrder、static、type、up、userData、uuid、visible；返回 无显式返回。
- `onBeforeShadow()` [源码:4586](../../eyes/src/vendor/three/core.js#L4586)：A callback that is executed immediately before a 3D object is rendered to a shadow map. @param {Renderer\|WebGLRenderer} renderer - The renderer. @param {Object3D} object - The 3D object. @param {Camera} camera - The camera that is used to render the scene. @param {Camera} shadowCamera - The shadow camera. @param {BufferGeometry} geometry - The 3D object's geometry. @param {Material} depthMaterial - The depth material. @param {Object} group - The geometry group data.
- `onAfterShadow()` [源码:4598](../../eyes/src/vendor/three/core.js#L4598)：A callback that is executed immediately after a 3D object is rendered to a shadow map. @param {Renderer\|WebGLRenderer} renderer - The renderer. @param {Object3D} object - The 3D object. @param {Camera} camera - The camera that is used to render the scene. @param {Camera} shadowCamera - The shadow camera. @param {BufferGeometry} geometry - The 3D object's geometry. @param {Material} depthMaterial - The depth material. @param {Object} group - The geometry group data.
- `onBeforeRender()` [源码:4609](../../eyes/src/vendor/three/core.js#L4609)：A callback that is executed immediately before a 3D object is rendered. @param {Renderer\|WebGLRenderer} renderer - The renderer. @param {Object3D} object - The 3D object. @param {Camera} camera - The camera that is used to render the scene. @param {BufferGeometry} geometry - The 3D object's geometry. @param {Material} material - The 3D object's material. @param {Object} group - The geometry group data.
- `onAfterRender()` [源码:4620](../../eyes/src/vendor/three/core.js#L4620)：A callback that is executed immediately after a 3D object is rendered. @param {Renderer\|WebGLRenderer} renderer - The renderer. @param {Object3D} object - The 3D object. @param {Camera} camera - The camera that is used to render the scene. @param {BufferGeometry} geometry - The 3D object's geometry. @param {Material} material - The 3D object's material. @param {Object} group - The geometry group data.
- `applyMatrix4(matrix)` [源码:4627](../../eyes/src/vendor/three/core.js#L4627)：Applies the given transformation matrix to the object and updates the object's position, rotation and scale. @param {Matrix4} matrix - The transformation matrix.
- `applyQuaternion(q)` [源码:4636](../../eyes/src/vendor/three/core.js#L4636)：Applies a rotation represented by given the quaternion to the 3D object. @param {Quaternion} q - The quaternion. @return {Object3D} A reference to this instance.
- `setRotationFromAxisAngle(axis, angle)` [源码:4645](../../eyes/src/vendor/three/core.js#L4645)：Sets the given rotation represented as an axis/angle couple to the 3D object. @param {Vector3} axis - The (normalized) axis vector. @param {number} angle - The angle in radians.
- `setRotationFromEuler(euler)` [源码:4653](../../eyes/src/vendor/three/core.js#L4653)：Sets the given rotation represented as Euler angles to the 3D object. @param {Euler} euler - The Euler angles.
- `setRotationFromMatrix(m)` [源码:4662](../../eyes/src/vendor/three/core.js#L4662)：Sets the given rotation represented as rotation matrix to the 3D object. @param {Matrix4} m - Although a 4x4 matrix is expected, the upper 3x3 portion must be a pure rotation matrix (i.e, unscaled).
- `setRotationFromQuaternion(q)` [源码:4670](../../eyes/src/vendor/three/core.js#L4670)：Sets the given rotation represented as a Quaternion to the 3D object. @param {Quaternion} q - The Quaternion
- `rotateOnAxis(axis, angle)` [源码:4680](../../eyes/src/vendor/three/core.js#L4680)：Rotates the 3D object along an axis in local space. @param {Vector3} axis - The (normalized) axis vector. @param {number} angle - The angle in radians. @return {Object3D} A reference to this instance.
- `rotateOnWorldAxis(axis, angle)` [源码:4690](../../eyes/src/vendor/three/core.js#L4690)：Rotates the 3D object along an axis in world space. @param {Vector3} axis - The (normalized) axis vector. @param {number} angle - The angle in radians. @return {Object3D} A reference to this instance.
- `rotateX(angle)` [源码:4699](../../eyes/src/vendor/three/core.js#L4699)：Rotates the 3D object around its X axis in local space. @param {number} angle - The angle in radians. @return {Object3D} A reference to this instance.
- `rotateY(angle)` [源码:4708](../../eyes/src/vendor/three/core.js#L4708)：Rotates the 3D object around its Y axis in local space. @param {number} angle - The angle in radians. @return {Object3D} A reference to this instance.
- `rotateZ(angle)` [源码:4717](../../eyes/src/vendor/three/core.js#L4717)：Rotates the 3D object around its Z axis in local space. @param {number} angle - The angle in radians. @return {Object3D} A reference to this instance.
- `translateOnAxis(axis, distance)` [源码:4727](../../eyes/src/vendor/three/core.js#L4727)：Translate the 3D object by a distance along the given axis in local space. @param {Vector3} axis - The (normalized) axis vector. @param {number} distance - The distance in world units. @return {Object3D} A reference to this instance.
- `translateX(distance)` [源码:4736](../../eyes/src/vendor/three/core.js#L4736)：Translate the 3D object by a distance along its X-axis in local space. @param {number} distance - The distance in world units. @return {Object3D} A reference to this instance.
- `translateY(distance)` [源码:4745](../../eyes/src/vendor/three/core.js#L4745)：Translate the 3D object by a distance along its Y-axis in local space. @param {number} distance - The distance in world units. @return {Object3D} A reference to this instance.
- `translateZ(distance)` [源码:4754](../../eyes/src/vendor/three/core.js#L4754)：Translate the 3D object by a distance along its Z-axis in local space. @param {number} distance - The distance in world units. @return {Object3D} A reference to this instance.
- `localToWorld(vector)` [源码:4763](../../eyes/src/vendor/three/core.js#L4763)：Converts the given vector from this 3D object's local space to world space. @param {Vector3} vector - The vector to convert. @return {Vector3} The converted vector.
- `worldToLocal(vector)` [源码:4772](../../eyes/src/vendor/three/core.js#L4772)：Converts the given vector from this 3D object's world space to local space. @param {Vector3} vector - The vector to convert. @return {Vector3} The converted vector.
- `lookAt(x, y, z)` [源码:4784](../../eyes/src/vendor/three/core.js#L4784)：Rotates the object to face a point in world space. This method does not support objects having non-uniformly-scaled parent(s). @param {number\|Vector3} x - The x coordinate in world space. Alternatively, a vector representing a position in world space @param {number} [y] - The y coordinate in world space. @param {number} [z] - The z coordinate in world space.
- `add(e)` [源码:4789](../../eyes/src/vendor/three/core.js#L4789)：源码方法 add；作用以类职责与源码实现为准，未猜测压缩参数含义
- `remove(e)` [源码:4796](../../eyes/src/vendor/three/core.js#L4796)：源码方法 remove；作用以类职责与源码实现为准，未猜测压缩参数含义
- `removeFromParent()` [源码:4804](../../eyes/src/vendor/three/core.js#L4804)：源码方法 removeFromParent；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clear()` [源码:4815](../../eyes/src/vendor/three/core.js#L4815)：Removes all child objects. @fires Object3D#removed @fires Object3D#childremoved @return {Object3D} A reference to this instance.
- `attach(e)` [源码:4818](../../eyes/src/vendor/three/core.js#L4818)：源码方法 attach；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getObjectById(e)` [源码:4821](../../eyes/src/vendor/three/core.js#L4821)：源码方法 getObjectById；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getObjectByName(e)` [源码:4824](../../eyes/src/vendor/three/core.js#L4824)：源码方法 getObjectByName；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getObjectByProperty(e, t)` [源码:4827](../../eyes/src/vendor/three/core.js#L4827)：源码方法 getObjectByProperty；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getObjectsByProperty(e, t, n=[])` [源码:4834](../../eyes/src/vendor/three/core.js#L4834)：源码方法 getObjectsByProperty；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getWorldPosition(target)` [源码:4846](../../eyes/src/vendor/three/core.js#L4846)：Returns a vector representing the position of the 3D object in world space. @param {Vector3} target - The target vector the result is stored to. @return {Vector3} The 3D object's position in world space.
- `getWorldQuaternion(target)` [源码:4855](../../eyes/src/vendor/three/core.js#L4855)：Returns a Quaternion representing the position of the 3D object in world space. @param {Quaternion} target - The target Quaternion the result is stored to. @return {Quaternion} The 3D object's rotation in world space.
- `getWorldScale(target)` [源码:4864](../../eyes/src/vendor/three/core.js#L4864)：Returns a vector representing the scale of the 3D object in world space. @param {Vector3} target - The target vector the result is stored to. @return {Vector3} The 3D object's scale in world space.
- `getWorldDirection(target)` [源码:4873](../../eyes/src/vendor/three/core.js#L4873)：Returns a vector representing the ("look") direction of the 3D object in world space. @param {Vector3} target - The target vector the result is stored to. @return {Vector3} The 3D object's direction in world space.
- `raycast()` [源码:4887](../../eyes/src/vendor/three/core.js#L4887)：Abstract method to get intersections between a casted ray and this 3D object. Renderable 3D objects such as {@link Mesh}, {@link Line} or {@link Points} implement this method in order to use raycasting. @abstract @param {Raycaster} raycaster - The raycaster. @param {Array<Object>} intersects - An array holding the result of the method.
- `traverse(e)` [源码:4888](../../eyes/src/vendor/three/core.js#L4888)：源码方法 traverse；作用以类职责与源码实现为准，未猜测压缩参数含义
- `traverseVisible(e)` [源码:4893](../../eyes/src/vendor/three/core.js#L4893)：源码方法 traverseVisible；作用以类职责与源码实现为准，未猜测压缩参数含义
- `traverseAncestors(e)` [源码:4899](../../eyes/src/vendor/three/core.js#L4899)：源码方法 traverseAncestors；作用以类职责与源码实现为准，未猜测压缩参数含义
- `updateMatrix()` [源码:4903](../../eyes/src/vendor/three/core.js#L4903)：源码方法 updateMatrix；作用以类职责与源码实现为准，未猜测压缩参数含义
- `updateMatrixWorld(e)` [源码:4915](../../eyes/src/vendor/three/core.js#L4915)：传播父级世界矩阵；matrixWorldNeedsUpdate 控制失效，递归更新子节点
- `updateWorldMatrix(e, t, n=!1)` [源码:4922](../../eyes/src/vendor/three/core.js#L4922)：按参数选择先更新祖先或继续更新后代，避免使用过期世界变换
- `toJSON(e)` [源码:4931](../../eyes/src/vendor/three/core.js#L4931)：序列化资源和引用；共享资源通过元数据缓存去重
- `clone(recursive)` [源码:5012](../../eyes/src/vendor/three/core.js#L5012)：Returns a new 3D object with copied values from this instance. @param {boolean} [recursive=true] - When set to ˋtrueˋ, descendants of the 3D object are also cloned. @return {Object3D} A clone of this instance.
- `copy(e, t=!0)` [源码:5015](../../eyes/src/vendor/three/core.js#L5015)：复制自身状态；需注意资源引用与深复制边界

### `Group`

将多个场景节点组织为共同变换的组。父类 `Object3D`。

- `constructor()` [源码:5025](../../eyes/src/vendor/three/core.js#L5025)：当前操作：写入 isGroup、type；返回 无显式返回。

### `WebXRController`

Class for representing a XR controller with its different coordinate systems. @private。父类 `无`。

- `constructor()` [源码:5039](../../eyes/src/vendor/three/core.js#L5039)：当前操作：写入 _grip、_hand、_targetRay；返回 无显式返回。
- `getHandSpace()` [源码:5042](../../eyes/src/vendor/three/core.js#L5042)：源码方法 getHandSpace；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getTargetRaySpace()` [源码:5047](../../eyes/src/vendor/three/core.js#L5047)：源码方法 getTargetRaySpace；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getGripSpace()` [源码:5050](../../eyes/src/vendor/three/core.js#L5050)：源码方法 getGripSpace；作用以类职责与源码实现为准，未猜测压缩参数含义
- `dispatchEvent(e)` [源码:5053](../../eyes/src/vendor/three/core.js#L5053)：源码方法 dispatchEvent；作用以类职责与源码实现为准，未猜测压缩参数含义
- `connect(e)` [源码:5056](../../eyes/src/vendor/three/core.js#L5056)：源码方法 connect；作用以类职责与源码实现为准，未猜测压缩参数含义
- `disconnect(e)` [源码:5066](../../eyes/src/vendor/three/core.js#L5066)：源码方法 disconnect；作用以类职责与源码实现为准，未猜测压缩参数含义
- `update(e, t, n)` [源码:5072](../../eyes/src/vendor/three/core.js#L5072)：按当前时间或场景状态推进对象并维护缓存失效
- `_getHandJoint(e, t)` [源码:5110](../../eyes/src/vendor/three/core.js#L5110)：源码方法 _getHandJoint；作用以类职责与源码实现为准，未猜测压缩参数含义

### `Color`

A Color instance is represented by RGB components in the linear <i>working color space</i>, which defaults to ˋLinearSRGBColorSpaceˋ. Inputs conventionally using ˋSRGBColorSpaceˋ (such as hexadecimals and CSS strings) are converted to the working color space automatically. ˋˋˋjs // converted automatically from SRGBColorSpace to LinearSRGBColorSpace const color = new THREE.Color().setHex( 0x112233 ); ˋˋˋ Source color spaces may be specified explicitly, to ensure correct conversions. ˋˋˋjs // assumed already LinearSRGBColorSpace; no conversion const color = new THREE.Color().setRGB( 0.5, 0.5, 0.5 ); // converted explicitly from SRGBColorSpace to LinearSRGBColorSpace const color = new THREE.Color().setRGB( 0.5, 0.5, 0.5, SRGBColorSpace ); ˋˋˋ If THREE.ColorManagement is disabled, no conversions occur. For details, see <i>Color management</i>. Iterating through a Color instance will yield its components (r, g, b) in the corresponding order. A Color can be initialised in any of the following ways: ˋˋˋjs //empty constructor - will default white const color1 = new THREE.Color(); //Hexadecimal color (recommended) const color2 = new THREE.Color( 0xff0000 ); //RGB string const color3 = new THREE.Color("rgb(255, 0, 0)"); const color4 = new THREE.Color("rgb(100%, 0%, 0%)"); //X11 color name - all 140 color names are supported. //Note the lack of CamelCase in the name const color5 = new THREE.Color( 'skyblue' ); //HSL string const color6 = new THREE.Color("hsl(0, 100%, 50%)"); //Separate RGB values between 0 and 1 const color7 = new THREE.Color( 1, 0, 0 ); ˋˋˋ。父类 `无`。

- `constructor(r, g, b)` [源码:5336](../../eyes/src/vendor/three/core.js#L5336)：Constructs a new color. Note that standard method of specifying color in three.js is with a hexadecimal triplet, and that method is used throughout the rest of the documentation. @param {(number\|string\|Color)} [r] - The red component of the color. If ˋgˋ and ˋbˋ are not provided, it can be hexadecimal triplet, a CSS-style string or another ˋColorˋ instance. @param {number} [g] - The green component. @param {number} [b] - The blue component.
- `set(e, t, n)` [源码:5339](../../eyes/src/vendor/three/core.js#L5339)：源码方法 set；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setScalar(scalar)` [源码:5352](../../eyes/src/vendor/three/core.js#L5352)：Sets the colors's components to the given scalar value. @param {number} scalar - The scalar value. @return {Color} A reference to this color.
- `setHex(e, t=SRGBColorSpace)` [源码:5355](../../eyes/src/vendor/three/core.js#L5355)：源码方法 setHex；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setRGB(r, g, b, colorSpace=ColorManagement.workingColorSpace)` [源码:5367](../../eyes/src/vendor/three/core.js#L5367)：Sets this color from RGB values. @param {number} r - Red channel value between ˋ0.0ˋ and ˋ1.0ˋ. @param {number} g - Green channel value between ˋ0.0ˋ and ˋ1.0ˋ. @param {number} b - Blue channel value between ˋ0.0ˋ and ˋ1.0ˋ. @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space. @return {Color} A reference to this color.
- `setHSL(e, t, n, r=ColorManagement.workingColorSpace)` [源码:5370](../../eyes/src/vendor/three/core.js#L5370)：源码方法 setHSL；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setStyle(e, t=SRGBColorSpace)` [源码:5378](../../eyes/src/vendor/three/core.js#L5378)：源码方法 setStyle；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setColorName(e, t=SRGBColorSpace)` [源码:5409](../../eyes/src/vendor/three/core.js#L5409)：源码方法 setColorName；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clone()` [源码:5418](../../eyes/src/vendor/three/core.js#L5418)：Returns a new color with copied values from this instance. @return {Color} A clone of this instance.
- `copy(color)` [源码:5427](../../eyes/src/vendor/three/core.js#L5427)：Copies the values of the given color to this instance. @param {Color} color - The color to copy. @return {Color} A reference to this color.
- `copySRGBToLinear(color)` [源码:5437](../../eyes/src/vendor/three/core.js#L5437)：Copies the given color into this color, and then converts this color from ˋSRGBColorSpaceˋ to ˋLinearSRGBColorSpaceˋ. @param {Color} color - The color to copy/convert. @return {Color} A reference to this color.
- `copyLinearToSRGB(color)` [源码:5447](../../eyes/src/vendor/three/core.js#L5447)：Copies the given color into this color, and then converts this color from ˋLinearSRGBColorSpaceˋ to ˋSRGBColorSpaceˋ. @param {Color} color - The color to copy/convert. @return {Color} A reference to this color.
- `convertSRGBToLinear()` [源码:5455](../../eyes/src/vendor/three/core.js#L5455)：Converts this color from ˋSRGBColorSpaceˋ to ˋLinearSRGBColorSpaceˋ. @return {Color} A reference to this color.
- `convertLinearToSRGB()` [源码:5463](../../eyes/src/vendor/three/core.js#L5463)：Converts this color from ˋLinearSRGBColorSpaceˋ to ˋSRGBColorSpaceˋ. @return {Color} A reference to this color.
- `getHex(e=SRGBColorSpace)` [源码:5466](../../eyes/src/vendor/three/core.js#L5466)：源码方法 getHex；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getHexString(e=SRGBColorSpace)` [源码:5469](../../eyes/src/vendor/three/core.js#L5469)：源码方法 getHexString；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getHSL(e, t=ColorManagement.workingColorSpace)` [源码:5472](../../eyes/src/vendor/three/core.js#L5472)：源码方法 getHSL；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getRGB(target, colorSpace=ColorManagement.workingColorSpace)` [源码:5504](../../eyes/src/vendor/three/core.js#L5504)：Returns the RGB values of this color and stores them into the given target object. @param {Color} target - The target color that is used to store the method's result. @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space. @return {Color} The RGB representation of this color.
- `getStyle(e=SRGBColorSpace)` [源码:5507](../../eyes/src/vendor/three/core.js#L5507)：源码方法 getStyle；作用以类职责与源码实现为准，未猜测压缩参数含义
- `offsetHSL(h, s, l)` [源码:5524](../../eyes/src/vendor/three/core.js#L5524)：Adds the given HSL values to this color's values. Internally, this converts the color's RGB values to HSL, adds HSL and then converts the color back to RGB. @param {number} h - Hue value between ˋ0.0ˋ and ˋ1.0ˋ. @param {number} s - Saturation value between ˋ0.0ˋ and ˋ1.0ˋ. @param {number} l - Lightness value between ˋ0.0ˋ and ˋ1.0ˋ. @return {Color} A reference to this color.
- `add(color)` [源码:5533](../../eyes/src/vendor/three/core.js#L5533)：Adds the RGB values of the given color to the RGB values of this color. @param {Color} color - The color to add. @return {Color} A reference to this color.
- `addColors(color1, color2)` [源码:5543](../../eyes/src/vendor/three/core.js#L5543)：Adds the RGB values of the given colors and stores the result in this instance. @param {Color} color1 - The first color. @param {Color} color2 - The second color. @return {Color} A reference to this color.
- `addScalar(s)` [源码:5552](../../eyes/src/vendor/three/core.js#L5552)：Adds the given scalar value to the RGB values of this color. @param {number} s - The scalar to add. @return {Color} A reference to this color.
- `sub(color)` [源码:5561](../../eyes/src/vendor/three/core.js#L5561)：Subtracts the RGB values of the given color from the RGB values of this color. @param {Color} color - The color to subtract. @return {Color} A reference to this color.
- `multiply(color)` [源码:5570](../../eyes/src/vendor/three/core.js#L5570)：Multiplies the RGB values of the given color with the RGB values of this color. @param {Color} color - The color to multiply. @return {Color} A reference to this color.
- `multiplyScalar(s)` [源码:5579](../../eyes/src/vendor/three/core.js#L5579)：Multiplies the given scalar value with the RGB values of this color. @param {number} s - The scalar to multiply. @return {Color} A reference to this color.
- `lerp(color, alpha)` [源码:5591](../../eyes/src/vendor/three/core.js#L5591)：Linearly interpolates this color's RGB values toward the RGB values of the given color. The alpha argument can be thought of as the ratio between the two colors, where ˋ0.0ˋ is this color and ˋ1.0ˋ is the first argument. @param {Color} color - The color to converge on. @param {number} alpha - The interpolation factor in the closed interval ˋ[0,1]ˋ. @return {Color} A reference to this color.
- `lerpColors(color1, color2, alpha)` [源码:5604](../../eyes/src/vendor/three/core.js#L5604)：Linearly interpolates between the given colors and stores the result in this instance. The alpha argument can be thought of as the ratio between the two colors, where ˋ0.0ˋ is the first and ˋ1.0ˋ is the second color. @param {Color} color1 - The first color. @param {Color} color2 - The second color. @param {number} alpha - The interpolation factor in the closed interval ˋ[0,1]ˋ. @return {Color} A reference to this color.
- `lerpHSL(color, alpha)` [源码:5618](../../eyes/src/vendor/three/core.js#L5618)：Linearly interpolates this color's HSL values toward the HSL values of the given color. It differs from {@link Color#lerp} by not interpolating straight from one color to the other, but instead going through all the hues in between those two colors. The alpha argument can be thought of as the ratio between the two colors, where 0.0 is this color and 1.0 is the first argument. @param {Color} color - The color to converge on. @param {number} alpha - The interpolation factor in the closed interval ˋ[0,1]ˋ. @return {Color} A reference to this color.
- `setFromVector3(v)` [源码:5631](../../eyes/src/vendor/three/core.js#L5631)：Sets the color's RGB components from the given 3D vector. @param {Vector3} v - The vector to set. @return {Color} A reference to this color.
- `applyMatrix3(m)` [源码:5640](../../eyes/src/vendor/three/core.js#L5640)：Transforms this color with the given 3x3 matrix. @param {Matrix3} m - The matrix. @return {Color} A reference to this color.
- `equals(c)` [源码:5653](../../eyes/src/vendor/three/core.js#L5653)：Returns ˋtrueˋ if this color is equal with the given one. @param {Color} c - The color to test for equality. @return {boolean} Whether this bounding color is equal with the given one.
- `fromArray(array, offset=0)` [源码:5663](../../eyes/src/vendor/three/core.js#L5663)：Sets this color's RGB components from the given array. @param {Array<number>} array - An array holding the RGB values. @param {number} [offset=0] - The offset into the array. @return {Color} A reference to this color.
- `toArray(array=[], offset=0)` [源码:5674](../../eyes/src/vendor/three/core.js#L5674)：Writes the RGB components of this color to the given array. If no array is provided, the method returns a new instance. @param {Array<number>} [array=[]] - The target array holding the color components. @param {number} [offset=0] - Index of the first element in the array. @return {Array<number>} The color components.
- `fromBufferAttribute(attribute, index)` [源码:5684](../../eyes/src/vendor/three/core.js#L5684)：Sets the components of this color from the given buffer attribute. @param {BufferAttribute} attribute - The buffer attribute holding color data. @param {number} index - The index into the attribute. @return {Color} A reference to this color.
- `toJSON()` [源码:5693](../../eyes/src/vendor/three/core.js#L5693)：This methods defines the serialization result of this class. Returns the color as a hexadecimal value. @return {number} The hexadecimal value.
- `Symbol.iterator()` [源码:5696](../../eyes/src/vendor/three/core.js#L5696)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `FogExp2`

This class can be used to define an exponential squared fog, which gives a clear view near the camera and a faster than exponentially densening fog farther from the camera. ˋˋˋjs const scene = new THREE.Scene(); scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 ); ˋˋˋ。父类 `无`。

- `constructor(e, density=25e-5)` [源码:5713](../../eyes/src/vendor/three/core.js#L5713)：当前操作：写入 color、density、isFogExp2、name；返回 无显式返回。
- `clone()` [源码:5721](../../eyes/src/vendor/three/core.js#L5721)：Returns a new fog with copied values from this instance. @return {FogExp2} A clone of this instance.
- `toJSON()` [源码:5724](../../eyes/src/vendor/three/core.js#L5724)：序列化资源和引用；共享资源通过元数据缓存去重

### `Fog`

This class can be used to define a linear fog that grows linearly denser with the distance. ˋˋˋjs const scene = new THREE.Scene(); scene.fog = new THREE.Fog( 0xcccccc, 10, 15 ); ˋˋˋ。父类 `无`。

- `constructor(e, near=1, far=1e3)` [源码:5743](../../eyes/src/vendor/three/core.js#L5743)：当前操作：写入 color、far、isFog、name、near；返回 无显式返回。
- `clone()` [源码:5751](../../eyes/src/vendor/three/core.js#L5751)：Returns a new fog with copied values from this instance. @return {Fog} A clone of this instance.
- `toJSON()` [源码:5754](../../eyes/src/vendor/three/core.js#L5754)：序列化资源和引用；共享资源通过元数据缓存去重

### `Scene`

根场景容器，维护环境、背景、雾和材质覆盖。父类 `Object3D`。

- `constructor()` [源码:5765](../../eyes/src/vendor/three/core.js#L5765)：当前操作：写入 background、backgroundBlurriness、backgroundIntensity、backgroundRotation、environment、environmentIntensity、environmentRotation、fog、isScene、overrideMaterial、type；返回 无显式返回。
- `copy(e, t)` [源码:5770](../../eyes/src/vendor/three/core.js#L5770)：复制自身状态；需注意资源引用与深复制边界
- `toJSON(e)` [源码:5773](../../eyes/src/vendor/three/core.js#L5773)：序列化资源和引用；共享资源通过元数据缓存去重

### `Triangle`

A geometric triangle as defined by three vectors representing its three corners.。父类 `无`。

- `constructor(a=new Vector3(), b=new Vector3(), c=new Vector3())` [源码:5802](../../eyes/src/vendor/three/core.js#L5802)：Constructs a new triangle. @param {Vector3} [a=(0,0,0)] - The first corner of the triangle. @param {Vector3} [b=(0,0,0)] - The second corner of the triangle. @param {Vector3} [c=(0,0,0)] - The third corner of the triangle.
- `static getNormal(e, t, n, r)` [源码:5805](../../eyes/src/vendor/three/core.js#L5805)：当前操作：写入 无直接字段写入；返回 i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)。
- `static getBarycoord(e, t, n, r, i)` [源码:5810](../../eyes/src/vendor/three/core.js#L5810)：当前操作：写入 无直接字段写入；返回 i.set(0,0,0),null、i.set(1-h-p,p,h)。
- `static containsPoint(e, t, n, r)` [源码:5824](../../eyes/src/vendor/three/core.js#L5824)：当前操作：写入 无直接字段写入；返回 null!==this.getBarycoord(e,t,n,r,yi)&&yi.x>=0&&yi.y>=0&&yi.x+yi.y<=1。
- `static getInterpolation(e, t, n, r, i, a, s, o)` [源码:5827](../../eyes/src/vendor/three/core.js#L5827)：当前操作：写入 无直接字段写入；返回 null===this.getBarycoord(e,t,n,r,yi)?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(i,yi.x),o.addScaledVector(a,yi.y),o.addScaledVector(s,yi.z),o)。
- `static getInterpolatedAttribute(attr, i1, i2, i3, barycoord, target)` [源码:5841](../../eyes/src/vendor/three/core.js#L5841)：Computes the value barycentrically interpolated for the given attribute and indices. @param {BufferAttribute} attr - The attribute to interpolate. @param {number} i1 - Index of first vertex. @param {number} i2 - Index of second vertex. @param {number} i3 - Index of third vertex. @param {Vector3} barycoord - The barycoordinate value to use to interpolate. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The interpolated attribute value.
- `static isFrontFacing(a, b, c, direction)` [源码:5853](../../eyes/src/vendor/three/core.js#L5853)：Returns ˋtrueˋ if the triangle is oriented towards the given direction. @param {Vector3} a - The first corner of the triangle. @param {Vector3} b - The second corner of the triangle. @param {Vector3} c - The third corner of the triangle. @param {Vector3} direction - The (normalized) direction vector. @return {boolean} Whether the triangle is oriented towards the given direction or not.
- `set(a, b, c)` [源码:5864](../../eyes/src/vendor/three/core.js#L5864)：Sets the triangle's vertices by copying the given values. @param {Vector3} a - The first corner of the triangle. @param {Vector3} b - The second corner of the triangle. @param {Vector3} c - The third corner of the triangle. @return {Triangle} A reference to this triangle.
- `setFromPointsAndIndices(points, i0, i1, i2)` [源码:5876](../../eyes/src/vendor/three/core.js#L5876)：Sets the triangle's vertices by copying the given array values. @param {Array<Vector3>} points - An array with 3D points. @param {number} i0 - The array index representing the first corner of the triangle. @param {number} i1 - The array index representing the second corner of the triangle. @param {number} i2 - The array index representing the third corner of the triangle. @return {Triangle} A reference to this triangle.
- `setFromAttributeAndIndices(attribute, i0, i1, i2)` [源码:5888](../../eyes/src/vendor/three/core.js#L5888)：Sets the triangle's vertices by copying the given attribute values. @param {BufferAttribute} attribute - A buffer attribute with 3D points data. @param {number} i0 - The attribute index representing the first corner of the triangle. @param {number} i1 - The attribute index representing the second corner of the triangle. @param {number} i2 - The attribute index representing the third corner of the triangle. @return {Triangle} A reference to this triangle.
- `clone()` [源码:5896](../../eyes/src/vendor/three/core.js#L5896)：Returns a new triangle with copied values from this instance. @return {Triangle} A clone of this instance.
- `copy(triangle)` [源码:5905](../../eyes/src/vendor/three/core.js#L5905)：Copies the values of the given triangle to this instance. @param {Triangle} triangle - The triangle to copy. @return {Triangle} A reference to this triangle.
- `getArea()` [源码:5908](../../eyes/src/vendor/three/core.js#L5908)：源码方法 getArea；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getMidpoint(target)` [源码:5917](../../eyes/src/vendor/three/core.js#L5917)：Computes the midpoint of the triangle. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The triangle's midpoint.
- `getNormal(target)` [源码:5926](../../eyes/src/vendor/three/core.js#L5926)：Computes the normal of the triangle. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The triangle's normal.
- `getPlane(target)` [源码:5935](../../eyes/src/vendor/three/core.js#L5935)：Computes a plane the triangle lies within. @param {Plane} target - The target vector that is used to store the method's result. @return {Plane} The plane the triangle lies within.
- `getBarycoord(point, target)` [源码:5946](../../eyes/src/vendor/three/core.js#L5946)：Computes a barycentric coordinates from the given vector. Returns ˋnullˋ if the triangle is degenerate. @param {Vector3} point - A point in 3D space. @param {Vector3} target - The target vector that is used to store the method's result. @return {?Vector3} The barycentric coordinates for the given point
- `getInterpolation(point, v1, v2, v3, target)` [源码:5960](../../eyes/src/vendor/three/core.js#L5960)：Computes the value barycentrically interpolated for the given point on the triangle. Returns ˋnullˋ if the triangle is degenerate. @param {Vector3} point - Position of interpolated point. @param {Vector3} v1 - Value to interpolate of first vertex. @param {Vector3} v2 - Value to interpolate of second vertex. @param {Vector3} v3 - Value to interpolate of third vertex. @param {Vector3} target - The target vector that is used to store the method's result. @return {?Vector3} The interpolated value.
- `containsPoint(point)` [源码:5971](../../eyes/src/vendor/three/core.js#L5971)：Returns ˋtrueˋ if the given point, when projected onto the plane of the triangle, lies within the triangle. @param {Vector3} point - The point in 3D space to test. @return {boolean} Whether the given point, when projected onto the plane of the triangle, lies within the triangle or not.
- `isFrontFacing(direction)` [源码:5980](../../eyes/src/vendor/three/core.js#L5980)：Returns ˋtrueˋ if the triangle is oriented towards the given direction. @param {Vector3} direction - The (normalized) direction vector. @return {boolean} Whether the triangle is oriented towards the given direction or not.
- `intersectsBox(box)` [源码:5989](../../eyes/src/vendor/three/core.js#L5989)：Returns ˋtrueˋ if this triangle intersects with the given box. @param {Box3} box - The box to intersect. @return {boolean} Whether this triangle intersects with the given box or not.
- `closestPointToPoint(p, target)` [源码:5999](../../eyes/src/vendor/three/core.js#L5999)：Returns the closest point on the triangle to the given point. @param {Vector3} p - The point to compute the closest point for. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The closest point on the triangle.
- `equals(triangle)` [源码:6031](../../eyes/src/vendor/three/core.js#L6031)：Returns ˋtrueˋ if this triangle is equal with the given one. @param {Triangle} triangle - The triangle to test for equality. @return {boolean} Whether this triangle is equal with the given one.

### `Box3`

Represents an axis-aligned bounding box (AABB) in 3D space.。父类 `无`。

- `constructor(min=new Vector3(1/0,1/0,1/0), max=new Vector3(-1/0,-1/0,-1/0))` [源码:6039](../../eyes/src/vendor/three/core.js#L6039)：当前操作：写入 isBox3、max、min；返回 无显式返回。
- `set(min, max)` [源码:6050](../../eyes/src/vendor/three/core.js#L6050)：Sets the lower and upper boundaries of this box. Please note that this method only copies the values from the given objects. @param {Vector3} min - The lower boundary of the box. @param {Vector3} max - The upper boundary of the box. @return {Box3} A reference to this bounding box.
- `setFromArray(e)` [源码:6053](../../eyes/src/vendor/three/core.js#L6053)：源码方法 setFromArray；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setFromBufferAttribute(e)` [源码:6058](../../eyes/src/vendor/three/core.js#L6058)：源码方法 setFromBufferAttribute；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setFromPoints(e)` [源码:6063](../../eyes/src/vendor/three/core.js#L6063)：源码方法 setFromPoints；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setFromCenterAndSize(e, t)` [源码:6068](../../eyes/src/vendor/three/core.js#L6068)：源码方法 setFromCenterAndSize；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setFromObject(object, precise=!1)` [源码:6087](../../eyes/src/vendor/three/core.js#L6087)：Computes the world-axis-aligned bounding box for the given 3D object (including its children), accounting for the object's, and children's, world transforms. The function may result in a larger box than strictly necessary. Note: To compute the correct bounding box, make sure the given 3D object has an up-to-date world matrix that reflects the current transformation of its ancestor nodes. Call ˋobject.updateWorldMatrix( true, false )ˋ beforehand if you're unsure. @param {Object3D} object - The 3D object to compute the bounding box for. @param {boolean} [precise=false] - If set to ˋtrueˋ, the method computes the smallest world-axis-aligned bounding box at the expense of more computation. @return {Box3} A reference to this bounding box.
- `clone()` [源码:6095](../../eyes/src/vendor/three/core.js#L6095)：Returns a new box with copied values from this instance. @return {Box3} A clone of this instance.
- `copy(box)` [源码:6104](../../eyes/src/vendor/three/core.js#L6104)：Copies the values of the given box to this instance. @param {Box3} box - The box to copy. @return {Box3} A reference to this bounding box.
- `makeEmpty()` [源码:6107](../../eyes/src/vendor/three/core.js#L6107)：源码方法 makeEmpty；作用以类职责与源码实现为准，未猜测压缩参数含义
- `isEmpty()` [源码:6117](../../eyes/src/vendor/three/core.js#L6117)：Returns true if this box includes zero points within its bounds. Note that a box with equal lower and upper bounds still includes one point, the one both bounds share. @return {boolean} Whether this box is empty or not.
- `getCenter(e)` [源码:6120](../../eyes/src/vendor/three/core.js#L6120)：源码方法 getCenter；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getSize(target)` [源码:6129](../../eyes/src/vendor/three/core.js#L6129)：Returns the dimensions of this box. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The size.
- `expandByPoint(point)` [源码:6138](../../eyes/src/vendor/three/core.js#L6138)：Expands the boundaries of this box to include the given point. @param {Vector3} point - The point that should be included by the bounding box. @return {Box3} A reference to this bounding box.
- `expandByVector(vector)` [源码:6151](../../eyes/src/vendor/three/core.js#L6151)：Expands this box equilaterally by the given vector. The width of this box will be expanded by the x component of the vector in both directions. The height of this box will be expanded by the y component of the vector in both directions. The depth of this box will be expanded by the z component of the vector in both directions. @param {Vector3} vector - The vector that should expand the bounding box. @return {Box3} A reference to this bounding box.
- `expandByScalar(scalar)` [源码:6161](../../eyes/src/vendor/three/core.js#L6161)：Expands each dimension of the box by the given scalar. If negative, the dimensions of the box will be contracted. @param {number} scalar - The scalar value that should expand the bounding box. @return {Box3} A reference to this bounding box.
- `expandByObject(e, t=!1)` [源码:6164](../../eyes/src/vendor/three/core.js#L6164)：源码方法 expandByObject；作用以类职责与源码实现为准，未猜测压缩参数含义
- `containsPoint(point)` [源码:6181](../../eyes/src/vendor/three/core.js#L6181)：Returns ˋtrueˋ if the given point lies within or on the boundaries of this box. @param {Vector3} point - The point to test. @return {boolean} Whether the bounding box contains the given point or not.
- `containsBox(box)` [源码:6191](../../eyes/src/vendor/three/core.js#L6191)：Returns ˋtrueˋ if this bounding box includes the entirety of the given bounding box. If this box and the given one are identical, this function also returns ˋtrueˋ. @param {Box3} box - The bounding box to test. @return {boolean} Whether the bounding box contains the given bounding box or not.
- `getParameter(point, target)` [源码:6201](../../eyes/src/vendor/three/core.js#L6201)：Returns a point as a proportion of this box's width, height and depth. @param {Vector3} point - A point in 3D space. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} A point as a proportion of this box's width, height and depth.
- `intersectsBox(box)` [源码:6210](../../eyes/src/vendor/three/core.js#L6210)：Returns ˋtrueˋ if the given bounding box intersects with this bounding box. @param {Box3} box - The bounding box to test. @return {boolean} Whether the given bounding box intersects with this bounding box.
- `intersectsSphere(sphere)` [源码:6219](../../eyes/src/vendor/three/core.js#L6219)：Returns ˋtrueˋ if the given bounding sphere intersects with this bounding box. @param {Sphere} sphere - The bounding sphere to test. @return {boolean} Whether the given bounding sphere intersects with this bounding box.
- `intersectsPlane(plane)` [源码:6228](../../eyes/src/vendor/three/core.js#L6228)：Returns ˋtrueˋ if the given plane intersects with this bounding box. @param {Plane} plane - The plane to test. @return {boolean} Whether the given plane intersects with this bounding box.
- `intersectsTriangle(e)` [源码:6232](../../eyes/src/vendor/three/core.js#L6232)：源码方法 intersectsTriangle；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clampPoint(point, target)` [源码:6245](../../eyes/src/vendor/three/core.js#L6245)：Clamps the given point within the bounds of this box. @param {Vector3} point - The point to clamp. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The clamped point.
- `distanceToPoint(point)` [源码:6255](../../eyes/src/vendor/three/core.js#L6255)：Returns the euclidean distance from any edge of this box to the specified point. If the given point lies inside of this box, the distance will be ˋ0ˋ. @param {Vector3} point - The point to compute the distance to. @return {number} The euclidean distance.
- `getBoundingSphere(e)` [源码:6258](../../eyes/src/vendor/three/core.js#L6258)：源码方法 getBoundingSphere；作用以类职责与源码实现为准，未猜测压缩参数含义
- `intersect(box)` [源码:6270](../../eyes/src/vendor/three/core.js#L6270)：Computes the intersection of this bounding box and the given one, setting the upper bound of this box to the lesser of the two boxes' upper bounds and the lower bound of this box to the greater of the two boxes' lower bounds. If there's no overlap, makes this box empty. @param {Box3} box - The bounding box to intersect with. @return {Box3} A reference to this bounding box.
- `union(box)` [源码:6281](../../eyes/src/vendor/three/core.js#L6281)：Computes the union of this box and another and the given one, setting the upper bound of this box to the greater of the two boxes' upper bounds and the lower bound of this box to the lesser of the two boxes' lower bounds. @param {Box3} box - The bounding box that will be unioned with this instance. @return {Box3} A reference to this bounding box.
- `applyMatrix4(e)` [源码:6284](../../eyes/src/vendor/three/core.js#L6284)：源码方法 applyMatrix4；作用以类职责与源码实现为准，未猜测压缩参数含义
- `translate(offset)` [源码:6294](../../eyes/src/vendor/three/core.js#L6294)：Adds the given offset to both the upper and lower bounds of this bounding box, effectively moving it in 3D space. @param {Vector3} offset - The offset that should be used to translate the bounding box. @return {Box3} A reference to this bounding box.
- `equals(box)` [源码:6303](../../eyes/src/vendor/three/core.js#L6303)：Returns ˋtrueˋ if this bounding box is equal with the given one. @param {Box3} box - The box to test for equality. @return {boolean} Whether this bounding box is equal with the given one.
- `toJSON()` [源码:6311](../../eyes/src/vendor/three/core.js#L6311)：Returns a serialized structure of the bounding box. @return {Object} Serialized structure with fields representing the object state.
- `fromJSON(json)` [源码:6323](../../eyes/src/vendor/three/core.js#L6323)：Returns a serialized structure of the bounding box. @param {Object} json - The serialized json to set the box from. @return {Box3} A reference to this bounding box.

### `DataUtils`

A class containing utility functions for data. @hideconstructor。父类 `无`。

- `static toHalfFloat(val)` [源码:6410](../../eyes/src/vendor/three/core.js#L6410)：Returns a half precision floating point value (FP16) from the given single precision floating point value (FP32). @param {number} val - A single precision floating point value. @return {number} The FP16 value.
- `static fromHalfFloat(val)` [源码:6420](../../eyes/src/vendor/three/core.js#L6420)：Returns a single precision floating point value (FP32) from the given half precision floating point value (FP16). @param {number} val - A half precision floating point value. @return {number} The FP32 value.

### `BufferAttribute`

This class stores data for an attribute (such as vertex positions, face indices, normals, colors, UVs, and any custom attributes ) associated with a geometry, which allows for more efficient passing of data to the GPU. When working with vector-like data, the ˋfromBufferAttribute( attribute, index )ˋ helper methods on vector and color class might be helpful. E.g. {@link Vector3#fromBufferAttribute}.。父类 `EventDispatcher`。

- `constructor(array, itemSize, normalized=!1)` [源码:6436](../../eyes/src/vendor/three/core.js#L6436)：当前操作：写入 array、count、gpuType、isBufferAttribute、itemSize、name、normalized、updateRanges、usage、version；返回 无显式返回。
- `onUploadCallback()` [源码:6442](../../eyes/src/vendor/three/core.js#L6442)：源码方法 onUploadCallback；作用以类职责与源码实现为准，未猜测压缩参数含义
- `set needsUpdate(e)` [源码:6443](../../eyes/src/vendor/three/core.js#L6443)：仅输入 true 时递增 version，标记资源需要重新上传或刷新
- `setUsage(value)` [源码:6452](../../eyes/src/vendor/three/core.js#L6452)：Sets the usage of this buffer attribute. @param {(StaticDrawUsage\|DynamicDrawUsage\|StreamDrawUsage\|StaticReadUsage\|DynamicReadUsage\|StreamReadUsage\|StaticCopyUsage\|DynamicCopyUsage\|StreamCopyUsage)} value - The usage to set. @return {BufferAttribute} A reference to this buffer attribute.
- `addUpdateRange(start, count)` [源码:6461](../../eyes/src/vendor/three/core.js#L6461)：Adds a range of data in the data array to be updated on the GPU. @param {number} start - Position at which to start update. @param {number} count - The number of components to update.
- `clearUpdateRanges()` [源码:6467](../../eyes/src/vendor/three/core.js#L6467)：源码方法 clearUpdateRanges；作用以类职责与源码实现为准，未猜测压缩参数含义
- `copy(source)` [源码:6476](../../eyes/src/vendor/three/core.js#L6476)：Copies the values of the given buffer attribute to this instance. @param {BufferAttribute} source - The buffer attribute to copy. @return {BufferAttribute} A reference to this instance.
- `copyAt(e, t, n)` [源码:6479](../../eyes/src/vendor/three/core.js#L6479)：源码方法 copyAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `copyArray(array)` [源码:6490](../../eyes/src/vendor/three/core.js#L6490)：Copies the given array data into this buffer attribute. @param {(TypedArray\|Array)} array - The array to copy. @return {BufferAttribute} A reference to this instance.
- `applyMatrix3(e)` [源码:6493](../../eyes/src/vendor/three/core.js#L6493)：源码方法 applyMatrix3；作用以类职责与源码实现为准，未猜测压缩参数含义
- `applyMatrix4(m)` [源码:6504](../../eyes/src/vendor/three/core.js#L6504)：Applies the given 4x4 matrix to the given attribute. Only works with item size ˋ3ˋ. @param {Matrix4} m - The matrix to apply. @return {BufferAttribute} A reference to this instance.
- `applyNormalMatrix(m)` [源码:6515](../../eyes/src/vendor/three/core.js#L6515)：Applies the given 3x3 normal matrix to the given attribute. Only works with item size ˋ3ˋ. @param {Matrix3} m - The normal matrix to apply. @return {BufferAttribute} A reference to this instance.
- `transformDirection(m)` [源码:6526](../../eyes/src/vendor/three/core.js#L6526)：Applies the given 4x4 matrix to the given attribute. Only works with item size ˋ3ˋ and with direction vectors. @param {Matrix4} m - The matrix to apply. @return {BufferAttribute} A reference to this instance.
- `set(value, offset=0)` [源码:6537](../../eyes/src/vendor/three/core.js#L6537)：Sets the given array data in the buffer attribute. @param {(TypedArray\|Array)} value - The array data to set. @param {number} [offset=0] - The offset in this buffer attribute's array. @return {BufferAttribute} A reference to this instance.
- `getComponent(index, component)` [源码:6547](../../eyes/src/vendor/three/core.js#L6547)：Returns the given component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} component - The component index. @return {number} The returned value.
- `setComponent(index, component, value)` [源码:6559](../../eyes/src/vendor/three/core.js#L6559)：Sets the given value to the given component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} component - The component index. @param {number} value - The value to set. @return {BufferAttribute} A reference to this instance.
- `getX(index)` [源码:6568](../../eyes/src/vendor/three/core.js#L6568)：Returns the x component of the vector at the given index. @param {number} index - The index into the buffer attribute. @return {number} The x component.
- `setX(index, x)` [源码:6579](../../eyes/src/vendor/three/core.js#L6579)：Sets the x component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} x - The value to set. @return {BufferAttribute} A reference to this instance.
- `getY(index)` [源码:6588](../../eyes/src/vendor/three/core.js#L6588)：Returns the y component of the vector at the given index. @param {number} index - The index into the buffer attribute. @return {number} The y component.
- `setY(index, y)` [源码:6599](../../eyes/src/vendor/three/core.js#L6599)：Sets the y component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} y - The value to set. @return {BufferAttribute} A reference to this instance.
- `getZ(index)` [源码:6608](../../eyes/src/vendor/three/core.js#L6608)：Returns the z component of the vector at the given index. @param {number} index - The index into the buffer attribute. @return {number} The z component.
- `setZ(index, z)` [源码:6619](../../eyes/src/vendor/three/core.js#L6619)：Sets the z component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} z - The value to set. @return {BufferAttribute} A reference to this instance.
- `getW(index)` [源码:6628](../../eyes/src/vendor/three/core.js#L6628)：Returns the w component of the vector at the given index. @param {number} index - The index into the buffer attribute. @return {number} The w component.
- `setW(index, w)` [源码:6639](../../eyes/src/vendor/three/core.js#L6639)：Sets the w component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} w - The value to set. @return {BufferAttribute} A reference to this instance.
- `setXY(index, x, y)` [源码:6650](../../eyes/src/vendor/three/core.js#L6650)：Sets the x and y component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} x - The value for the x component to set. @param {number} y - The value for the y component to set. @return {BufferAttribute} A reference to this instance.
- `setXYZ(index, x, y, z)` [源码:6662](../../eyes/src/vendor/three/core.js#L6662)：Sets the x, y and z component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} x - The value for the x component to set. @param {number} y - The value for the y component to set. @param {number} z - The value for the z component to set. @return {BufferAttribute} A reference to this instance.
- `setXYZW(index, x, y, z, w)` [源码:6675](../../eyes/src/vendor/three/core.js#L6675)：Sets the x, y, z and w component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} x - The value for the x component to set. @param {number} y - The value for the y component to set. @param {number} z - The value for the z component to set. @param {number} w - The value for the w component to set. @return {BufferAttribute} A reference to this instance.
- `onUpload(callback)` [源码:6686](../../eyes/src/vendor/three/core.js#L6686)：Sets the given callback function that is executed after the Renderer has transferred the attribute array data to the GPU. Can be used to perform clean-up operations after the upload when attribute data are not needed anymore on the CPU side. @param {Function} callback - The ˋonUpload()ˋ callback. @return {BufferAttribute} A reference to this instance.
- `clone()` [源码:6694](../../eyes/src/vendor/three/core.js#L6694)：Returns a new buffer attribute with copied values from this instance. @return {BufferAttribute} A clone of this instance.
- `toJSON()` [源码:6697](../../eyes/src/vendor/three/core.js#L6697)：序列化资源和引用；共享资源通过元数据缓存去重
- `dispose()` [源码:6706](../../eyes/src/vendor/three/core.js#L6706)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

### `Int8BufferAttribute`

Convenient class that can be used when creating a ˋInt8ˋ buffer attribute with a plain ˋArrayˋ instance. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6726](../../eyes/src/vendor/three/core.js#L6726)：Constructs a new buffer attribute. @param {(Array<number>\|Int8Array)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.

### `Uint8BufferAttribute`

Convenient class that can be used when creating a ˋUInt8ˋ buffer attribute with a plain ˋArrayˋ instance. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6744](../../eyes/src/vendor/three/core.js#L6744)：Constructs a new buffer attribute. @param {(Array<number>\|Uint8Array)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.

### `Uint8ClampedBufferAttribute`

Convenient class that can be used when creating a ˋUInt8Clampedˋ buffer attribute with a plain ˋArrayˋ instance. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6762](../../eyes/src/vendor/three/core.js#L6762)：Constructs a new buffer attribute. @param {(Array<number>\|Uint8ClampedArray)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.

### `Int16BufferAttribute`

Convenient class that can be used when creating a ˋInt16ˋ buffer attribute with a plain ˋArrayˋ instance. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6780](../../eyes/src/vendor/three/core.js#L6780)：Constructs a new buffer attribute. @param {(Array<number>\|Int16Array)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.

### `Uint16BufferAttribute`

Convenient class that can be used when creating a ˋUInt16ˋ buffer attribute with a plain ˋArrayˋ instance. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6798](../../eyes/src/vendor/three/core.js#L6798)：Constructs a new buffer attribute. @param {(Array<number>\|Uint16Array)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.

### `Int32BufferAttribute`

Convenient class that can be used when creating a ˋInt32ˋ buffer attribute with a plain ˋArrayˋ instance. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6816](../../eyes/src/vendor/three/core.js#L6816)：Constructs a new buffer attribute. @param {(Array<number>\|Int32Array)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.

### `Uint32BufferAttribute`

Convenient class that can be used when creating a ˋUInt32ˋ buffer attribute with a plain ˋArrayˋ instance. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6834](../../eyes/src/vendor/three/core.js#L6834)：Constructs a new buffer attribute. @param {(Array<number>\|Uint32Array)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.

### `Float16BufferAttribute`

Convenient class that can be used when creating a ˋFloat16ˋ buffer attribute with a plain ˋArrayˋ instance. This class automatically converts to and from FP16 via ˋUint16Arrayˋ since ˋFloat16Arrayˋ browser support is still problematic. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6855](../../eyes/src/vendor/three/core.js#L6855)：Constructs a new buffer attribute. @param {(Array<number>\|Uint16Array)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.
- `getX(index)` [源码:6858](../../eyes/src/vendor/three/core.js#L6858)：源码方法 getX；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setX(index, x)` [源码:6862](../../eyes/src/vendor/three/core.js#L6862)：源码方法 setX；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getY(index)` [源码:6865](../../eyes/src/vendor/three/core.js#L6865)：源码方法 getY；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setY(index, y)` [源码:6869](../../eyes/src/vendor/three/core.js#L6869)：源码方法 setY；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getZ(index)` [源码:6872](../../eyes/src/vendor/three/core.js#L6872)：源码方法 getZ；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setZ(index, z)` [源码:6876](../../eyes/src/vendor/three/core.js#L6876)：源码方法 setZ；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getW(index)` [源码:6879](../../eyes/src/vendor/three/core.js#L6879)：源码方法 getW；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setW(index, w)` [源码:6883](../../eyes/src/vendor/three/core.js#L6883)：源码方法 setW；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setXY(index, x, y)` [源码:6886](../../eyes/src/vendor/three/core.js#L6886)：源码方法 setXY；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setXYZ(index, x, y, z)` [源码:6889](../../eyes/src/vendor/three/core.js#L6889)：源码方法 setXYZ；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setXYZW(index, x, y, z, w)` [源码:6892](../../eyes/src/vendor/three/core.js#L6892)：源码方法 setXYZW；作用以类职责与源码实现为准，未猜测压缩参数含义

### `Float32BufferAttribute`

Convenient class that can be used when creating a ˋFloat32ˋ buffer attribute with a plain ˋArrayˋ instance. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6910](../../eyes/src/vendor/three/core.js#L6910)：Constructs a new buffer attribute. @param {(Array<number>\|Float32Array)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.

### `Sphere`

An analytical 3D sphere defined by a center and radius. This class is mainly used as a Bounding Sphere for 3D objects.。父类 `无`。

- `constructor(center=new Vector3(), radius=-1)` [源码:6928](../../eyes/src/vendor/three/core.js#L6928)：Constructs a new sphere. @param {Vector3} [center=(0,0,0)] - The center of the sphere @param {number} [radius=-1] - The radius of the sphere.
- `set(center, radius)` [源码:6938](../../eyes/src/vendor/three/core.js#L6938)：Sets the sphere's components by copying the given values. @param {Vector3} center - The center. @param {number} radius - The radius. @return {Sphere} A reference to this sphere.
- `setFromPoints(e, t)` [源码:6941](../../eyes/src/vendor/three/core.js#L6941)：源码方法 setFromPoints；作用以类职责与源码实现为准，未猜测压缩参数含义
- `copy(sphere)` [源码:6954](../../eyes/src/vendor/three/core.js#L6954)：Copies the values of the given sphere to this instance. @param {Sphere} sphere - The sphere to copy. @return {Sphere} A reference to this sphere.
- `isEmpty()` [源码:6965](../../eyes/src/vendor/three/core.js#L6965)：Returns ˋtrueˋ if the sphere is empty (the radius set to a negative number). Spheres with a radius of ˋ0ˋ contain only their center point and are not considered to be empty. @return {boolean} Whether this sphere is empty or not.
- `makeEmpty()` [源码:6973](../../eyes/src/vendor/three/core.js#L6973)：Makes this sphere empty which means in encloses a zero space in 3D. @return {Sphere} A reference to this sphere.
- `containsPoint(point)` [源码:6983](../../eyes/src/vendor/three/core.js#L6983)：Returns ˋtrueˋ if this sphere contains the given point inclusive of the surface of the sphere. @param {Vector3} point - The point to check. @return {boolean} Whether this sphere contains the given point or not.
- `distanceToPoint(point)` [源码:6994](../../eyes/src/vendor/three/core.js#L6994)：Returns the closest distance from the boundary of the sphere to the given point. If the sphere contains the point, the distance will be negative. @param {Vector3} point - The point to compute the distance to. @return {number} The distance to the point.
- `intersectsSphere(sphere)` [源码:7003](../../eyes/src/vendor/three/core.js#L7003)：Returns ˋtrueˋ if this sphere intersects with the given one. @param {Sphere} sphere - The sphere to test. @return {boolean} Whether this sphere intersects with the given one or not.
- `intersectsBox(box)` [源码:7013](../../eyes/src/vendor/three/core.js#L7013)：Returns ˋtrueˋ if this sphere intersects with the given box. @param {Box3} box - The box to test. @return {boolean} Whether this sphere intersects with the given box or not.
- `intersectsPlane(plane)` [源码:7022](../../eyes/src/vendor/three/core.js#L7022)：Returns ˋtrueˋ if this sphere intersects with the given plane. @param {Plane} plane - The plane to test. @return {boolean} Whether this sphere intersects with the given plane or not.
- `clampPoint(point, target)` [源码:7034](../../eyes/src/vendor/three/core.js#L7034)：Clamps a point within the sphere. If the point is outside the sphere, it will clamp it to the closest point on the edge of the sphere. Points already inside the sphere will not be affected. @param {Vector3} point - The plane to clamp. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The clamped point.
- `getBoundingBox(e)` [源码:7038](../../eyes/src/vendor/three/core.js#L7038)：源码方法 getBoundingBox；作用以类职责与源码实现为准，未猜测压缩参数含义
- `applyMatrix4(matrix)` [源码:7047](../../eyes/src/vendor/three/core.js#L7047)：Transforms this sphere with the given 4x4 transformation matrix. @param {Matrix4} matrix - The transformation matrix. @return {Sphere} A reference to this sphere.
- `translate(offset)` [源码:7056](../../eyes/src/vendor/three/core.js#L7056)：Translates the sphere's center by the given offset. @param {Vector3} offset - The offset. @return {Sphere} A reference to this sphere.
- `expandByPoint(e)` [源码:7059](../../eyes/src/vendor/three/core.js#L7059)：源码方法 expandByPoint；作用以类职责与源码实现为准，未猜测压缩参数含义
- `union(e)` [源码:7070](../../eyes/src/vendor/three/core.js#L7070)：源码方法 union；作用以类职责与源码实现为准，未猜测压缩参数含义
- `equals(sphere)` [源码:7079](../../eyes/src/vendor/three/core.js#L7079)：Returns ˋtrueˋ if this sphere is equal with the given one. @param {Sphere} sphere - The sphere to test for equality. @return {boolean} Whether this bounding sphere is equal with the given one.
- `clone()` [源码:7087](../../eyes/src/vendor/three/core.js#L7087)：Returns a new sphere with copied values from this instance. @return {Sphere} A clone of this instance.
- `toJSON()` [源码:7095](../../eyes/src/vendor/three/core.js#L7095)：Returns a serialized structure of the bounding sphere. @return {Object} Serialized structure with fields representing the object state.
- `fromJSON(json)` [源码:7107](../../eyes/src/vendor/three/core.js#L7107)：Returns a serialized structure of the bounding sphere. @param {Object} json - The serialized json to set the sphere from. @return {Sphere} A reference to this bounding sphere.

### `BufferGeometry`

A representation of mesh, line, or point geometry. Includes vertex positions, face indices, normals, colors, UVs, and custom attributes within buffers, reducing the cost of passing all this data to the GPU. ˋˋˋjs const geometry = new THREE.BufferGeometry(); // create a simple square shape. We duplicate the top left and bottom right // vertices because each vertex needs to appear once per triangle. const vertices = new Float32Array( [ -1.0, -1.0, 1.0, // v0 1.0, -1.0, 1.0, // v1 1.0, 1.0, 1.0, // v2 1.0, 1.0, 1.0, // v3 -1.0, 1.0, 1.0, // v4 -1.0, -1.0, 1.0 // v5 ] ); // itemSize = 3 because there are 3 values (components) per vertex geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) ); const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } ); const mesh = new THREE.Mesh( geometry, material ); ˋˋˋ @augments EventDispatcher。父类 `EventDispatcher`。

- `constructor()` [源码:7145](../../eyes/src/vendor/three/core.js#L7145)：当前操作：写入 _transformed、attributes、boundingBox、boundingSphere、drawRange、groups、index、indirect、indirectOffset、isBufferGeometry、morphAttributes、morphTargetsRelative、name、type、userData、uuid；返回 无显式返回。
- `getIndex()` [源码:7158](../../eyes/src/vendor/three/core.js#L7158)：Returns the index of this geometry. @return {?BufferAttribute} The index. Returns ˋnullˋ if no index is defined.
- `setIndex(index)` [源码:7161](../../eyes/src/vendor/three/core.js#L7161)：源码方法 setIndex；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setIndirect(indirect, indirectOffset=0)` [源码:7174](../../eyes/src/vendor/three/core.js#L7174)：Sets the given indirect attribute to this geometry. @param {BufferAttribute} indirect - The attribute holding indirect draw calls. @param {number\|Array<number>} [indirectOffset=0] - The offset, in bytes, into the indirect drawing buffer where the value data begins. If an array is provided, multiple indirect draw calls will be made for each offset. @return {BufferGeometry} A reference to this instance.
- `getIndirect()` [源码:7182](../../eyes/src/vendor/three/core.js#L7182)：Returns the indirect attribute of this geometry. @return {?BufferAttribute} The indirect attribute. Returns ˋnullˋ if no indirect attribute is defined.
- `getAttribute(name)` [源码:7192](../../eyes/src/vendor/three/core.js#L7192)：Returns the buffer attribute for the given name. @param {string} name - The attribute name. @return {BufferAttribute\|InterleavedBufferAttribute\|undefined} The buffer attribute. Returns ˋundefinedˋ if not attribute has been found.
- `setAttribute(name, attribute)` [源码:7202](../../eyes/src/vendor/three/core.js#L7202)：Sets the given attribute for the given name. @param {string} name - The attribute name. @param {BufferAttribute\|InterleavedBufferAttribute} attribute - The attribute to set. @return {BufferGeometry} A reference to this instance.
- `deleteAttribute(name)` [源码:7211](../../eyes/src/vendor/three/core.js#L7211)：Deletes the attribute for the given name. @param {string} name - The attribute name to delete. @return {BufferGeometry} A reference to this instance.
- `hasAttribute(e)` [源码:7214](../../eyes/src/vendor/three/core.js#L7214)：源码方法 hasAttribute；作用以类职责与源码实现为准，未猜测压缩参数含义
- `addGroup(start, count, materialIndex=0)` [源码:7225](../../eyes/src/vendor/three/core.js#L7225)：Adds a group to this geometry. @param {number} start - The first element in this draw call. That is the first vertex for non-indexed geometry, otherwise the first triangle index. @param {number} count - Specifies how many vertices (or indices) are part of this group. @param {number} [materialIndex=0] - The material array index to use.
- `clearGroups()` [源码:7232](../../eyes/src/vendor/three/core.js#L7232)：源码方法 clearGroups；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setDrawRange(start, count)` [源码:7242](../../eyes/src/vendor/three/core.js#L7242)：Sets the draw range for this geometry. @param {number} start - The first vertex for non-indexed geometry, otherwise the first triangle index. @param {number} count - For non-indexed BufferGeometry, ˋcountˋ is the number of vertices to render. For indexed BufferGeometry, ˋcountˋ is the number of indices to render.
- `applyMatrix4(e)` [源码:7245](../../eyes/src/vendor/three/core.js#L7245)：源码方法 applyMatrix4；作用以类职责与源码实现为准，未猜测压缩参数含义
- `applyQuaternion(q)` [源码:7262](../../eyes/src/vendor/three/core.js#L7262)：Applies the rotation represented by the Quaternion to the geometry. @param {Quaternion} q - The Quaternion to apply. @return {BufferGeometry} A reference to this instance.
- `rotateX(angle)` [源码:7273](../../eyes/src/vendor/three/core.js#L7273)：Rotates the geometry about the X axis. This is typically done as a one time operation, and not during a loop. Use {@link Object3D#rotation} for typical real-time mesh rotation. @param {number} angle - The angle in radians. @return {BufferGeometry} A reference to this instance.
- `rotateY(angle)` [源码:7284](../../eyes/src/vendor/three/core.js#L7284)：Rotates the geometry about the Y axis. This is typically done as a one time operation, and not during a loop. Use {@link Object3D#rotation} for typical real-time mesh rotation. @param {number} angle - The angle in radians. @return {BufferGeometry} A reference to this instance.
- `rotateZ(angle)` [源码:7295](../../eyes/src/vendor/three/core.js#L7295)：Rotates the geometry about the Z axis. This is typically done as a one time operation, and not during a loop. Use {@link Object3D#rotation} for typical real-time mesh rotation. @param {number} angle - The angle in radians. @return {BufferGeometry} A reference to this instance.
- `translate(x, y, z)` [源码:7308](../../eyes/src/vendor/three/core.js#L7308)：Translates the geometry. This is typically done as a one time operation, and not during a loop. Use {@link Object3D#position} for typical real-time mesh rotation. @param {number} x - The x offset. @param {number} y - The y offset. @param {number} z - The z offset. @return {BufferGeometry} A reference to this instance.
- `scale(x, y, z)` [源码:7321](../../eyes/src/vendor/three/core.js#L7321)：Scales the geometry. This is typically done as a one time operation, and not during a loop. Use {@link Object3D#scale} for typical real-time mesh rotation. @param {number} x - The x scale. @param {number} y - The y scale. @param {number} z - The z scale. @return {BufferGeometry} A reference to this instance.
- `lookAt(vector)` [源码:7332](../../eyes/src/vendor/three/core.js#L7332)：Rotates the geometry to face a point in 3D space. This is typically done as a one time operation, and not during a loop. Use {@link Object3D#lookAt} for typical real-time mesh rotation. @param {Vector3} vector - The target point. @return {BufferGeometry} A reference to this instance.
- `center()` [源码:7340](../../eyes/src/vendor/three/core.js#L7340)：Center the geometry based on its bounding box. @return {BufferGeometry} A reference to this instance.
- `setFromPoints(e)` [源码:7343](../../eyes/src/vendor/three/core.js#L7343)：源码方法 setFromPoints；作用以类职责与源码实现为准，未猜测压缩参数含义
- `computeBoundingBox()` [源码:7362](../../eyes/src/vendor/three/core.js#L7362)：扫描位置和 morph 属性得到轴对齐包围盒
- `computeBoundingSphere()` [源码:7375](../../eyes/src/vendor/three/core.js#L7375)：从顶点和 morph 属性建立包围球；变化后需再次计算
- `computeTangents()` [源码:7397](../../eyes/src/vendor/three/core.js#L7397)：源码方法 computeTangents；作用以类职责与源码实现为准，未猜测压缩参数含义
- `computeVertexNormals()` [源码:7450](../../eyes/src/vendor/three/core.js#L7450)：累加三角面法线后归一化，索引/非索引路径不同
- `normalizeNormals()` [源码:7473](../../eyes/src/vendor/three/core.js#L7473)：源码方法 normalizeNormals；作用以类职责与源码实现为准，未猜测压缩参数含义
- `toNonIndexed()` [源码:7477](../../eyes/src/vendor/three/core.js#L7477)：源码方法 toNonIndexed；作用以类职责与源码实现为准，未猜测压缩参数含义
- `toJSON()` [源码:7517](../../eyes/src/vendor/three/core.js#L7517)：序列化资源和引用；共享资源通过元数据缓存去重
- `clone()` [源码:7565](../../eyes/src/vendor/three/core.js#L7565)：Returns a new geometry with copied values from this instance. @return {BufferGeometry} A clone of this instance.
- `copy(e)` [源码:7568](../../eyes/src/vendor/three/core.js#L7568)：复制自身状态；需注意资源引用与深复制边界
- `dispose()` [源码:7597](../../eyes/src/vendor/three/core.js#L7597)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

### `InterleavedBuffer`

"Interleaved" means that multiple attributes, possibly of different types, (e.g., position, normal, uv, color) are packed into a single array buffer. An introduction into interleaved arrays can be found here: [Interleaved array basics](https://blog.tojicode.com/2011/05/interleaved-array-basics.html)。父类 `无`。

- `constructor(array, stride)` [源码:7610](../../eyes/src/vendor/three/core.js#L7610)：当前操作：写入 array、count、isInterleavedBuffer、stride、updateRanges、usage、uuid、version；返回 无显式返回。
- `onUploadCallback()` [源码:7613](../../eyes/src/vendor/three/core.js#L7613)：源码方法 onUploadCallback；作用以类职责与源码实现为准，未猜测压缩参数含义
- `set needsUpdate(e)` [源码:7614](../../eyes/src/vendor/three/core.js#L7614)：仅输入 true 时递增 version，标记资源需要重新上传或刷新
- `setUsage(value)` [源码:7623](../../eyes/src/vendor/three/core.js#L7623)：Sets the usage of this interleaved buffer. @param {(StaticDrawUsage\|DynamicDrawUsage\|StreamDrawUsage\|StaticReadUsage\|DynamicReadUsage\|StreamReadUsage\|StaticCopyUsage\|DynamicCopyUsage\|StreamCopyUsage)} value - The usage to set. @return {InterleavedBuffer} A reference to this interleaved buffer.
- `addUpdateRange(start, count)` [源码:7632](../../eyes/src/vendor/three/core.js#L7632)：Adds a range of data in the data array to be updated on the GPU. @param {number} start - Position at which to start update. @param {number} count - The number of components to update.
- `clearUpdateRanges()` [源码:7638](../../eyes/src/vendor/three/core.js#L7638)：源码方法 clearUpdateRanges；作用以类职责与源码实现为准，未猜测压缩参数含义
- `copy(source)` [源码:7647](../../eyes/src/vendor/three/core.js#L7647)：Copies the values of the given interleaved buffer to this instance. @param {InterleavedBuffer} source - The interleaved buffer to copy. @return {InterleavedBuffer} A reference to this instance.
- `copyAt(e, t, n)` [源码:7650](../../eyes/src/vendor/three/core.js#L7650)：源码方法 copyAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `set(value, offset=0)` [源码:7662](../../eyes/src/vendor/three/core.js#L7662)：Sets the given array data in the interleaved buffer. @param {(TypedArray\|Array)} value - The array data to set. @param {number} [offset=0] - The offset in this interleaved buffer's array. @return {InterleavedBuffer} A reference to this instance.
- `clone(e)` [源码:7665](../../eyes/src/vendor/three/core.js#L7665)：以构造器和 copy 建立副本，资源共享规则由 copy 决定
- `onUpload(callback)` [源码:7679](../../eyes/src/vendor/three/core.js#L7679)：Sets the given callback function that is executed after the Renderer has transferred the array data to the GPU. Can be used to perform clean-up operations after the upload when data are not needed anymore on the CPU side. @param {Function} callback - The ˋonUpload()ˋ callback. @return {InterleavedBuffer} A reference to this instance.
- `toJSON(e)` [源码:7682](../../eyes/src/vendor/three/core.js#L7682)：序列化资源和引用；共享资源通过元数据缓存去重

### `InterleavedBufferAttribute`

An alternative version of a buffer attribute with interleaved data. Interleaved attributes share a common interleaved data storage ({@link InterleavedBuffer}) and refer with different offsets into the buffer.。父类 `无`。

- `constructor(data, itemSize, offset, normalized=!1)` [源码:7698](../../eyes/src/vendor/three/core.js#L7698)：当前操作：写入 data、isInterleavedBufferAttribute、itemSize、name、normalized、offset；返回 无显式返回。
- `get count()` [源码:7701](../../eyes/src/vendor/three/core.js#L7701)：只读返回 this.data.count；此 getter 不执行对应 setter 的写入或更新通知
- `get array()` [源码:7704](../../eyes/src/vendor/three/core.js#L7704)：只读返回 this.data.array；此 getter 不执行对应 setter 的写入或更新通知
- `set needsUpdate(value)` [源码:7715](../../eyes/src/vendor/three/core.js#L7715)：Flag to indicate that this attribute has changed and should be re-sent to the GPU. Set this to ˋtrueˋ when you modify the value of the array. @type {number} @default false @param {boolean} value
- `applyMatrix4(m)` [源码:7725](../../eyes/src/vendor/three/core.js#L7725)：Applies the given 4x4 matrix to the given attribute. Only works with item size ˋ3ˋ. @param {Matrix4} m - The matrix to apply. @return {InterleavedBufferAttribute} A reference to this instance.
- `applyNormalMatrix(m)` [源码:7736](../../eyes/src/vendor/three/core.js#L7736)：Applies the given 3x3 normal matrix to the given attribute. Only works with item size ˋ3ˋ. @param {Matrix3} m - The normal matrix to apply. @return {InterleavedBufferAttribute} A reference to this instance.
- `transformDirection(m)` [源码:7747](../../eyes/src/vendor/three/core.js#L7747)：Applies the given 4x4 matrix to the given attribute. Only works with item size ˋ3ˋ and with direction vectors. @param {Matrix4} m - The matrix to apply. @return {InterleavedBufferAttribute} A reference to this instance.
- `getComponent(index, component)` [源码:7758](../../eyes/src/vendor/three/core.js#L7758)：Returns the given component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} component - The component index. @return {number} The returned value.
- `setComponent(index, component, value)` [源码:7770](../../eyes/src/vendor/three/core.js#L7770)：Sets the given value to the given component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} component - The component index. @param {number} value - The value to set. @return {InterleavedBufferAttribute} A reference to this instance.
- `setX(index, x)` [源码:7780](../../eyes/src/vendor/three/core.js#L7780)：Sets the x component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} x - The value to set. @return {InterleavedBufferAttribute} A reference to this instance.
- `setY(index, y)` [源码:7790](../../eyes/src/vendor/three/core.js#L7790)：Sets the y component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} y - The value to set. @return {InterleavedBufferAttribute} A reference to this instance.
- `setZ(index, z)` [源码:7800](../../eyes/src/vendor/three/core.js#L7800)：Sets the z component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} z - The value to set. @return {InterleavedBufferAttribute} A reference to this instance.
- `setW(index, w)` [源码:7810](../../eyes/src/vendor/three/core.js#L7810)：Sets the w component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} w - The value to set. @return {InterleavedBufferAttribute} A reference to this instance.
- `getX(index)` [源码:7819](../../eyes/src/vendor/three/core.js#L7819)：Returns the x component of the vector at the given index. @param {number} index - The index into the buffer attribute. @return {number} The x component.
- `getY(index)` [源码:7829](../../eyes/src/vendor/three/core.js#L7829)：Returns the y component of the vector at the given index. @param {number} index - The index into the buffer attribute. @return {number} The y component.
- `getZ(index)` [源码:7839](../../eyes/src/vendor/three/core.js#L7839)：Returns the z component of the vector at the given index. @param {number} index - The index into the buffer attribute. @return {number} The z component.
- `getW(index)` [源码:7849](../../eyes/src/vendor/three/core.js#L7849)：Returns the w component of the vector at the given index. @param {number} index - The index into the buffer attribute. @return {number} The w component.
- `setXY(index, x, y)` [源码:7861](../../eyes/src/vendor/three/core.js#L7861)：Sets the x and y component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} x - The value for the x component to set. @param {number} y - The value for the y component to set. @return {InterleavedBufferAttribute} A reference to this instance.
- `setXYZ(index, x, y, z)` [源码:7873](../../eyes/src/vendor/three/core.js#L7873)：Sets the x, y and z component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} x - The value for the x component to set. @param {number} y - The value for the y component to set. @param {number} z - The value for the z component to set. @return {InterleavedBufferAttribute} A reference to this instance.
- `setXYZW(index, x, y, z, w)` [源码:7886](../../eyes/src/vendor/three/core.js#L7886)：Sets the x, y, z and w component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} x - The value for the x component to set. @param {number} y - The value for the y component to set. @param {number} z - The value for the z component to set. @param {number} w - The value for the w component to set. @return {InterleavedBufferAttribute} A reference to this instance.
- `clone(e)` [源码:7889](../../eyes/src/vendor/three/core.js#L7889)：以构造器和 copy 建立副本，资源共享规则由 copy 决定
- `toJSON(e)` [源码:7901](../../eyes/src/vendor/three/core.js#L7901)：序列化资源和引用；共享资源通过元数据缓存去重

### `Material`

Abstract base class for materials. Materials define the appearance of renderable 3D objects. @abstract @augments EventDispatcher。父类 `EventDispatcher`。

- `constructor()` [源码:7936](../../eyes/src/vendor/three/core.js#L7936)：当前操作：写入 _alphaTest、allowOverride、alphaHash、alphaToCoverage、blendAlpha、blendColor、blendDst、blendDstAlpha、blendEquation、blendEquationAlpha、blendSrc、blendSrcAlpha、blending、clipIntersection、clipShadows、clippingPlanes、colorWrite、depthFunc、depthTest、depthWrite、dithering、forceSinglePass、isMaterial、name、opacity、polygonOffset、polygonOffsetFactor、polygonOffsetUnits、precision、premultipliedAlpha、shadowSide、side、stencilFail、stencilFunc、stencilFuncMask、stencilRef、stencilWrite、stencilWriteMask、stencilZFail、stencilZPass、toneMapped、transparent、type、userData、uuid、version、vertexColors、visible；返回 无显式返回。
- `get alphaTest()` [源码:7941](../../eyes/src/vendor/three/core.js#L7941)：只读返回 this._alphaTest；此 getter 不执行对应 setter 的写入或更新通知
- `set alphaTest(alphaTest)` [源码:7944](../../eyes/src/vendor/three/core.js#L7944)：写入 _alphaTest；当正值启用状态切换时递增 version 使 shader 特性失效
- `onBeforeRender()` [源码:7959](../../eyes/src/vendor/three/core.js#L7959)：An optional callback that is executed immediately before the material is used to render a 3D object. This method can only be used when rendering with {@link WebGLRenderer}. @param {WebGLRenderer} renderer - The renderer. @param {Scene} scene - The scene. @param {Camera} camera - The camera that is used to render the scene. @param {BufferGeometry} geometry - The 3D object's geometry. @param {Object3D} object - The 3D object. @param {Object} group - The geometry group data.
- `onBeforeCompile()` [源码:7972](../../eyes/src/vendor/three/core.js#L7972)：An optional callback that is executed immediately before the shader program is compiled. This function is called with the shader source code as a parameter. Useful for the modification of built-in materials. This method can only be used when rendering with {@link WebGLRenderer}. The recommended approach when customizing materials is to use ˋWebGPURendererˋ with the new Node Material system and [TSL](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language). @param {{vertexShader:string,fragmentShader:string,uniforms:Object}} shaderobject - The object holds the uniforms and the vertex and fragment shader source. @param {WebGLRenderer} renderer - A reference to the renderer.
- `customProgramCacheKey()` [源码:7982](../../eyes/src/vendor/three/core.js#L7982)：In case {@link Material#onBeforeCompile} is used, this callback can be used to identify values of settings used in ˋonBeforeCompile()ˋ, so three.js can reuse a cached shader or recompile the shader for this material as needed. This method can only be used when rendering with {@link WebGLRenderer}. @return {string} The custom program cache key.
- `setValues(e)` [源码:7985](../../eyes/src/vendor/three/core.js#L7985)：源码方法 setValues；作用以类职责与源码实现为准，未猜测压缩参数含义
- `toJSON(e)` [源码:7996](../../eyes/src/vendor/three/core.js#L7996)：序列化资源和引用；共享资源通过元数据缓存去重
- `fromJSON(e, t)` [源码:8024](../../eyes/src/vendor/three/core.js#L8024)：源码方法 fromJSON；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clone()` [源码:8036](../../eyes/src/vendor/three/core.js#L8036)：Returns a new material with copied values from this instance. @return {Material} A clone of this instance.
- `copy(e)` [源码:8039](../../eyes/src/vendor/three/core.js#L8039)：复制自身状态；需注意资源引用与深复制边界
- `dispose()` [源码:8050](../../eyes/src/vendor/three/core.js#L8050)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `set needsUpdate(e)` [源码:8055](../../eyes/src/vendor/three/core.js#L8055)：仅输入 true 时递增 version，标记资源需要重新上传或刷新

### `SpriteMaterial`

A material for rendering instances of {@link Sprite}. ˋˋˋjs const map = new THREE.TextureLoader().load( 'textures/sprite.png' ); const material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } ); const sprite = new THREE.Sprite( material ); sprite.scale.set(200, 200, 1) scene.add( sprite ); ˋˋˋ @augments Material。父类 `Material`。

- `constructor(e)` [源码:8074](../../eyes/src/vendor/three/core.js#L8074)：当前操作：写入 alphaMap、color、fog、isSpriteMaterial、map、rotation、sizeAttenuation、transparent、type；返回 无显式返回。
- `copy(source)` [源码:8077](../../eyes/src/vendor/three/core.js#L8077)：复制自身状态；需注意资源引用与深复制边界

### `Sprite`

始终朝向相机的二维精灵对象及射线求交。父类 `Object3D`。

- `constructor(material=new SpriteMaterial())` [源码:8094](../../eyes/src/vendor/three/core.js#L8094)：当前操作：写入 center、count、geometry、isSprite、material、type；返回 无显式返回。
- `raycast(e, t)` [源码:8103](../../eyes/src/vendor/three/core.js#L8103)：在几何/对象局部空间做相交测试并将命中结果变换回世界坐标
- `copy(e, t)` [源码:8121](../../eyes/src/vendor/three/core.js#L8121)：复制自身状态；需注意资源引用与深复制边界

### `LOD`

A component for providing a basic Level of Detail (LOD) mechanism. Every LOD level is associated with an object, and rendering can be switched between them at the distances specified. Typically you would create, say, three meshes, one for far away (low detail), one for mid range (medium detail) and one for close up (high detail). ˋˋˋjs const lod = new THREE.LOD(); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); //Create spheres with 3 levels of detail and create new LOD levels for them for( let i = 0; i < 3; i++ ) { const geometry = new THREE.IcosahedronGeometry( 10, 3 - i ); const mesh = new THREE.Mesh( geometry, material ); lod.addLevel( mesh, i * 75 ); } scene.add( lod ); ˋˋˋ @augments Object3D。父类 `Object3D`。

- `constructor()` [源码:8157](../../eyes/src/vendor/three/core.js#L8157)：当前操作：写入 _currentLevel、autoUpdate、isLOD、type；返回 无显式返回。
- `copy(source)` [源码:8165](../../eyes/src/vendor/three/core.js#L8165)：复制自身状态；需注意资源引用与深复制边界
- `addLevel(e, t=0, n=0)` [源码:8174](../../eyes/src/vendor/three/core.js#L8174)：源码方法 addLevel；作用以类职责与源码实现为准，未猜测压缩参数含义
- `removeLevel(e)` [源码:8185](../../eyes/src/vendor/three/core.js#L8185)：源码方法 removeLevel；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getCurrentLevel()` [源码:8198](../../eyes/src/vendor/three/core.js#L8198)：Returns the currently active LOD level index. @return {number} The current active LOD level index.
- `getObjectForDistance(e)` [源码:8201](../../eyes/src/vendor/three/core.js#L8201)：源码方法 getObjectForDistance；作用以类职责与源码实现为准，未猜测压缩参数含义
- `raycast(e, t)` [源码:8213](../../eyes/src/vendor/three/core.js#L8213)：在几何/对象局部空间做相交测试并将命中结果变换回世界坐标
- `update(e)` [源码:8220](../../eyes/src/vendor/three/core.js#L8220)：按当前时间或场景状态推进对象并维护缓存失效
- `toJSON(e)` [源码:8234](../../eyes/src/vendor/three/core.js#L8234)：序列化资源和引用；共享资源通过元数据缓存去重

### `Ray`

A ray that emits from an origin in a certain direction. The class is used by {@link Raycaster} to assist with raycasting. Raycasting is used for mouse picking (working out what objects in the 3D space the mouse is over) amongst other things.。父类 `无`。

- `constructor(origin=new Vector3(), direction=new Vector3(0,0,-1))` [源码:8269](../../eyes/src/vendor/three/core.js#L8269)：Constructs a new ray. @param {Vector3} [origin=(0,0,0)] - The origin of the ray. @param {Vector3} [direction=(0,0,-1)] - The (normalized) direction of the ray.
- `set(origin, direction)` [源码:8279](../../eyes/src/vendor/three/core.js#L8279)：Sets the ray's components by copying the given values. @param {Vector3} origin - The origin. @param {Vector3} direction - The direction. @return {Ray} A reference to this ray.
- `copy(ray)` [源码:8288](../../eyes/src/vendor/three/core.js#L8288)：Copies the values of the given ray to this instance. @param {Ray} ray - The ray to copy. @return {Ray} A reference to this ray.
- `at(t, target)` [源码:8298](../../eyes/src/vendor/three/core.js#L8298)：Returns a vector that is located at a given distance along this ray. @param {number} t - The distance along the ray to retrieve a position for. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} A position on the ray.
- `lookAt(v)` [源码:8307](../../eyes/src/vendor/three/core.js#L8307)：Adjusts the direction of the ray to point at the given vector in world space. @param {Vector3} v - The target position. @return {Ray} A reference to this ray.
- `recast(t)` [源码:8316](../../eyes/src/vendor/three/core.js#L8316)：Shift the origin of this ray along its direction by the given distance. @param {number} t - The distance along the ray to interpolate. @return {Ray} A reference to this ray.
- `closestPointToPoint(e, t)` [源码:8319](../../eyes/src/vendor/three/core.js#L8319)：源码方法 closestPointToPoint；作用以类职责与源码实现为准，未猜测压缩参数含义
- `distanceToPoint(point)` [源码:8330](../../eyes/src/vendor/three/core.js#L8330)：Returns the distance of the closest approach between this ray and the given point. @param {Vector3} point - A point in 3D space to compute the distance to. @return {number} The distance.
- `distanceSqToPoint(e)` [源码:8333](../../eyes/src/vendor/three/core.js#L8333)：源码方法 distanceSqToPoint；作用以类职责与源码实现为准，未猜测压缩参数含义
- `distanceSqToSegment(e, t, n, r)` [源码:8337](../../eyes/src/vendor/three/core.js#L8337)：源码方法 distanceSqToSegment；作用以类职责与源码实现为准，未猜测压缩参数含义
- `intersectSphere(e, t)` [源码:8358](../../eyes/src/vendor/three/core.js#L8358)：源码方法 intersectSphere；作用以类职责与源码实现为准，未猜测压缩参数含义
- `intersectsSphere(e)` [源码:8369](../../eyes/src/vendor/three/core.js#L8369)：源码方法 intersectsSphere；作用以类职责与源码实现为准，未猜测压缩参数含义
- `distanceToPlane(e)` [源码:8372](../../eyes/src/vendor/three/core.js#L8372)：源码方法 distanceToPlane；作用以类职责与源码实现为准，未猜测压缩参数含义
- `intersectPlane(e, t)` [源码:8378](../../eyes/src/vendor/three/core.js#L8378)：源码方法 intersectPlane；作用以类职责与源码实现为准，未猜测压缩参数含义
- `intersectsPlane(e)` [源码:8382](../../eyes/src/vendor/three/core.js#L8382)：源码方法 intersectsPlane；作用以类职责与源码实现为准，未猜测压缩参数含义
- `intersectBox(e, t)` [源码:8387](../../eyes/src/vendor/three/core.js#L8387)：源码方法 intersectBox；作用以类职责与源码实现为准，未猜测压缩参数含义
- `intersectsBox(e)` [源码:8395](../../eyes/src/vendor/three/core.js#L8395)：源码方法 intersectsBox；作用以类职责与源码实现为准，未猜测压缩参数含义
- `intersectTriangle(e, t, n, r, i)` [源码:8398](../../eyes/src/vendor/three/core.js#L8398)：源码方法 intersectTriangle；作用以类职责与源码实现为准，未猜测压缩参数含义
- `applyMatrix4(matrix4)` [源码:8424](../../eyes/src/vendor/three/core.js#L8424)：Transforms this ray with the given 4x4 transformation matrix. @param {Matrix4} matrix4 - The transformation matrix. @return {Ray} A reference to this ray.
- `equals(ray)` [源码:8433](../../eyes/src/vendor/three/core.js#L8433)：Returns ˋtrueˋ if this ray is equal with the given one. @param {Ray} ray - The ray to test for equality. @return {boolean} Whether this ray is equal with the given one.
- `clone()` [源码:8441](../../eyes/src/vendor/three/core.js#L8441)：Returns a new ray with copied values from this instance. @return {Ray} A clone of this instance.

### `MeshBasicMaterial`

A material for drawing geometries in a simple shaded (flat or wireframe) way. This material is not affected by lights. @augments Material @demo scenes/material-browser.html#MeshBasicMaterial。父类 `Material`。

- `constructor(e)` [源码:8454](../../eyes/src/vendor/three/core.js#L8454)：当前操作：写入 alphaMap、aoMap、aoMapIntensity、color、combine、envMap、envMapRotation、fog、isMeshBasicMaterial、lightMap、lightMapIntensity、map、reflectivity、refractionRatio、specularMap、type、wireframe、wireframeLinecap、wireframeLinejoin、wireframeLinewidth；返回 无显式返回。
- `copy(source)` [源码:8457](../../eyes/src/vendor/three/core.js#L8457)：复制自身状态；需注意资源引用与深复制边界

### `Mesh`

三角网格场景对象；绑定几何材质并执行射线求交。父类 `Object3D`。

- `constructor(e=new BufferGeometry(), material=new MeshBasicMaterial())` [源码:8473](../../eyes/src/vendor/three/core.js#L8473)：当前操作：写入 count、geometry、isMesh、material、morphTargetDictionary、morphTargetInfluences、type；返回 无显式返回。
- `copy(e, t)` [源码:8476](../../eyes/src/vendor/three/core.js#L8476)：复制自身状态；需注意资源引用与深复制边界
- `updateMorphTargets()` [源码:8479](../../eyes/src/vendor/three/core.js#L8479)：源码方法 updateMorphTargets；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getVertexPosition(e, t)` [源码:8493](../../eyes/src/vendor/three/core.js#L8493)：源码方法 getVertexPosition；作用以类职责与源码实现为准，未猜测压缩参数含义
- `raycast(e, t)` [源码:8511](../../eyes/src/vendor/three/core.js#L8511)：在几何/对象局部空间做相交测试并将命中结果变换回世界坐标
- `_computeIntersections(e, t, n)` [源码:8523](../../eyes/src/vendor/three/core.js#L8523)：源码方法 _computeIntersections；作用以类职责与源码实现为准，未猜测压缩参数含义

### `SkinnedMesh`

A mesh that has a {@link Skeleton} that can then be used to animate the vertices of the geometry with skinning/skeleton animation. Next to a valid skeleton, the skinned mesh requires skin indices and weights as buffer attributes in its geometry. These attribute define which bones affect a single vertex to a certain extend. Typically skinned meshes are not created manually but loaders like {@link GLTFLoader} or {@link FBXLoader } import respective models. @augments Mesh @demo scenes/bones-browser.html。父类 `Mesh`。

- `constructor(e, t)` [源码:8610](../../eyes/src/vendor/three/core.js#L8610)：当前操作：写入 bindMatrix、bindMatrixInverse、bindMode、boundingBox、boundingSphere、isSkinnedMesh、type；返回 无显式返回。
- `computeBoundingBox()` [源码:8613](../../eyes/src/vendor/three/core.js#L8613)：扫描位置和 morph 属性得到轴对齐包围盒
- `computeBoundingSphere()` [源码:8619](../../eyes/src/vendor/three/core.js#L8619)：从顶点和 morph 属性建立包围球；变化后需再次计算
- `copy(e, t)` [源码:8625](../../eyes/src/vendor/three/core.js#L8625)：复制自身状态；需注意资源引用与深复制边界
- `raycast(e, t)` [源码:8628](../../eyes/src/vendor/three/core.js#L8628)：在几何/对象局部空间做相交测试并将命中结果变换回世界坐标
- `getVertexPosition(index, target)` [源码:8633](../../eyes/src/vendor/three/core.js#L8633)：源码方法 getVertexPosition；作用以类职责与源码实现为准，未猜测压缩参数含义
- `bind(skeleton, t)` [源码:8636](../../eyes/src/vendor/three/core.js#L8636)：源码方法 bind；作用以类职责与源码实现为准，未猜测压缩参数含义
- `pose()` [源码:8639](../../eyes/src/vendor/three/core.js#L8639)：源码方法 pose；作用以类职责与源码实现为准，未猜测压缩参数含义
- `normalizeSkinWeights()` [源码:8642](../../eyes/src/vendor/three/core.js#L8642)：源码方法 normalizeSkinWeights；作用以类职责与源码实现为准，未猜测压缩参数含义
- `updateMatrixWorld(e)` [源码:8651](../../eyes/src/vendor/three/core.js#L8651)：传播父级世界矩阵；matrixWorldNeedsUpdate 控制失效，递归更新子节点
- `applyBoneTransform(e, t)` [源码:8654](../../eyes/src/vendor/three/core.js#L8654)：源码方法 applyBoneTransform；作用以类职责与源码实现为准，未猜测压缩参数含义

### `Bone`

骨架层级中的局部变换节点。父类 `Object3D`。

- `constructor()` [源码:8669](../../eyes/src/vendor/three/core.js#L8669)：当前操作：写入 isBone、type；返回 无显式返回。

### `DataTexture`

Creates a texture directly from raw buffer data. The interpretation of the data depends on type and format: If the type is ˋUnsignedByteTypeˋ, a ˋUint8Arrayˋ will be useful for addressing the texel data. If the format is ˋRGBAFormatˋ, data needs four values for one texel; Red, Green, Blue and Alpha (typically the opacity). @augments Texture。父类 `Texture`。

- `constructor(data=null, width=1, height=1, format, type, mapping, wrapS, wrapT, magFilter=NearestFilter, minFilter=NearestFilter, anisotropy, colorSpace)` [源码:8700](../../eyes/src/vendor/three/core.js#L8700)：Constructs a new data texture. @param {?TypedArray} [data=null] - The buffer data. @param {number} [width=1] - The width of the texture. @param {number} [height=1] - The height of the texture. @param {number} [format=RGBAFormat] - The texture format. @param {number} [type=UnsignedByteType] - The texture type. @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping. @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value. @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value. @param {number} [magFilter=NearestFilter] - The mag filter value. @param {number} [minFilter=NearestFilter] - The min filter value. @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value. @param {string} [colorSpace=NoColorSpace] - The color space.

### `Skeleton`

Class for representing the armatures in ˋthree.jsˋ. The skeleton is defined by a hierarchy of bones. ˋˋˋjs const bones = []; const shoulder = new THREE.Bone(); const elbow = new THREE.Bone(); const hand = new THREE.Bone(); shoulder.add( elbow ); elbow.add( hand ); bones.push( shoulder , elbow, hand); shoulder.position.y = -5; elbow.position.y = 0; hand.position.y = 5; const armSkeleton = new THREE.Skeleton( bones ); ˋˋˋ。父类 `无`。

- `constructor(bones=[], boneInverses=[])` [源码:8741](../../eyes/src/vendor/three/core.js#L8741)：Constructs a new skeleton. @param {Array<Bone>} [bones] - An array of bones. @param {Array<Matrix4>} [boneInverses] - An array of bone inverse matrices. If not provided, these matrices will be computed automatically via {@link Skeleton#calculateInverses}.
- `init()` [源码:8744](../../eyes/src/vendor/three/core.js#L8744)：初始化延迟资源和运行时能力；必须先完成再使用依赖资源的方法
- `calculateInverses()` [源码:8752](../../eyes/src/vendor/three/core.js#L8752)：源码方法 calculateInverses；作用以类职责与源码实现为准，未猜测压缩参数含义
- `pose()` [源码:8759](../../eyes/src/vendor/three/core.js#L8759)：源码方法 pose；作用以类职责与源码实现为准，未猜测压缩参数含义
- `update()` [源码:8769](../../eyes/src/vendor/three/core.js#L8769)：按当前时间或场景状态推进对象并维护缓存失效
- `clone()` [源码:8785](../../eyes/src/vendor/three/core.js#L8785)：Returns a new skeleton with copied values from this instance. @return {Skeleton} A clone of this instance.
- `computeBoneTexture()` [源码:8788](../../eyes/src/vendor/three/core.js#L8788)：源码方法 computeBoneTexture；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getBoneByName(e)` [源码:8796](../../eyes/src/vendor/three/core.js#L8796)：源码方法 getBoneByName；作用以类职责与源码实现为准，未猜测压缩参数含义
- `dispose()` [源码:8802](../../eyes/src/vendor/three/core.js#L8802)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `fromJSON(e, t)` [源码:8805](../../eyes/src/vendor/three/core.js#L8805)：源码方法 fromJSON；作用以类职责与源码实现为准，未猜测压缩参数含义
- `toJSON()` [源码:8814](../../eyes/src/vendor/three/core.js#L8814)：序列化资源和引用；共享资源通过元数据缓存去重

### `InstancedBufferAttribute`

An instanced version of a buffer attribute. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized, meshPerAttribute=1)` [源码:8850](../../eyes/src/vendor/three/core.js#L8850)：Constructs a new instanced buffer attribute. @param {TypedArray} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not. @param {number} [meshPerAttribute=1] - How often a value of this buffer attribute should be repeated.
- `copy(source)` [源码:8853](../../eyes/src/vendor/three/core.js#L8853)：复制自身状态；需注意资源引用与深复制边界
- `toJSON()` [源码:8856](../../eyes/src/vendor/three/core.js#L8856)：序列化资源和引用；共享资源通过元数据缓存去重

### `InstancedMesh`

A special version of a mesh with instanced rendering support. Use this class if you have to render a large number of objects with the same geometry and material(s) but with different world transformations. The usage of 'InstancedMesh' will help you to reduce the number of draw calls and thus improve the overall rendering performance in your application. @augments Mesh。父类 `Mesh`。

- `constructor(e, t, count)` [源码:8878](../../eyes/src/vendor/three/core.js#L8878)：当前操作：写入 boundingBox、boundingSphere、count、instanceColor、instanceMatrix、isInstancedMesh、morphTexture；返回 无显式返回。
- `computeBoundingBox()` [源码:8882](../../eyes/src/vendor/three/core.js#L8882)：扫描位置和 morph 属性得到轴对齐包围盒
- `computeBoundingSphere()` [源码:8888](../../eyes/src/vendor/three/core.js#L8888)：从顶点和 morph 属性建立包围球；变化后需再次计算
- `copy(e, t)` [源码:8894](../../eyes/src/vendor/three/core.js#L8894)：复制自身状态；需注意资源引用与深复制边界
- `getColorAt(e, t)` [源码:8897](../../eyes/src/vendor/three/core.js#L8897)：源码方法 getColorAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getMatrixAt(e, t)` [源码:8900](../../eyes/src/vendor/three/core.js#L8900)：源码方法 getMatrixAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getMorphAt(e, t)` [源码:8903](../../eyes/src/vendor/three/core.js#L8903)：源码方法 getMorphAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `raycast(e, t)` [源码:8909](../../eyes/src/vendor/three/core.js#L8909)：在几何/对象局部空间做相交测试并将命中结果变换回世界坐标
- `setColorAt(e, t)` [源码:8921](../../eyes/src/vendor/three/core.js#L8921)：源码方法 setColorAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setMatrixAt(e, t)` [源码:8924](../../eyes/src/vendor/three/core.js#L8924)：源码方法 setMatrixAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setMorphAt(e, t)` [源码:8927](../../eyes/src/vendor/three/core.js#L8927)：源码方法 setMorphAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `updateMorphTargets()` [源码:8938](../../eyes/src/vendor/three/core.js#L8938)：源码方法 updateMorphTargets；作用以类职责与源码实现为准，未猜测压缩参数含义
- `dispose()` [源码:8939](../../eyes/src/vendor/three/core.js#L8939)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

### `Plane`

A two dimensional surface that extends infinitely in 3D space, represented in [Hessian normal form](http://mathworld.wolfram.com/HessianNormalForm.html) by a unit length normal vector and a constant.。父类 `无`。

- `constructor(normal=new Vector3(1,0,0), constant=0)` [源码:8960](../../eyes/src/vendor/three/core.js#L8960)：Constructs a new plane. @param {Vector3} [normal=(1,0,0)] - A unit length vector defining the normal of the plane. @param {number} [constant=0] - The signed distance from the origin to the plane.
- `set(normal, constant)` [源码:8970](../../eyes/src/vendor/three/core.js#L8970)：Sets the plane components by copying the given values. @param {Vector3} normal - The normal. @param {number} constant - The constant. @return {Plane} A reference to this plane.
- `setComponents(x, y, z, w)` [源码:8983](../../eyes/src/vendor/three/core.js#L8983)：Sets the plane components by defining ˋxˋ, ˋyˋ, ˋzˋ as the plane normal and ˋwˋ as the constant. @param {number} x - The value for the normal's x component. @param {number} y - The value for the normal's y component. @param {number} z - The value for the normal's z component. @param {number} w - The constant value. @return {Plane} A reference to this plane.
- `setFromNormalAndCoplanarPoint(normal, point)` [源码:8994](../../eyes/src/vendor/three/core.js#L8994)：Sets the plane from the given normal and coplanar point (that is a point that lies onto the plane). @param {Vector3} normal - The normal. @param {Vector3} point - A coplanar point. @return {Plane} A reference to this plane.
- `setFromCoplanarPoints(a, b, c)` [源码:9007](../../eyes/src/vendor/three/core.js#L9007)：Sets the plane from three coplanar points. The winding order is assumed to be counter-clockwise, and determines the direction of the plane normal. @param {Vector3} a - The first coplanar point. @param {Vector3} b - The second coplanar point. @param {Vector3} c - The third coplanar point. @return {Plane} A reference to this plane.
- `copy(plane)` [源码:9017](../../eyes/src/vendor/three/core.js#L9017)：Copies the values of the given plane to this instance. @param {Plane} plane - The plane to copy. @return {Plane} A reference to this plane.
- `normalize()` [源码:9020](../../eyes/src/vendor/three/core.js#L9020)：源码方法 normalize；作用以类职责与源码实现为准，未猜测压缩参数含义
- `negate()` [源码:9029](../../eyes/src/vendor/three/core.js#L9029)：Negates both the plane normal and the constant. @return {Plane} A reference to this plane.
- `distanceToPoint(point)` [源码:9038](../../eyes/src/vendor/three/core.js#L9038)：Returns the signed distance from the given point to this plane. @param {Vector3} point - The point to compute the distance for. @return {number} The signed distance.
- `distanceToSphere(sphere)` [源码:9047](../../eyes/src/vendor/three/core.js#L9047)：Returns the signed distance from the given sphere to this plane. @param {Sphere} sphere - The sphere to compute the distance for. @return {number} The signed distance.
- `projectPoint(point, target)` [源码:9057](../../eyes/src/vendor/three/core.js#L9057)：Projects a the given point onto the plane. @param {Vector3} point - The point to project. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The projected point on the plane.
- `intersectLine(e, t, n=!0)` [源码:9060](../../eyes/src/vendor/three/core.js#L9060)：源码方法 intersectLine；作用以类职责与源码实现为准，未猜测压缩参数含义
- `intersectsLine(line)` [源码:9073](../../eyes/src/vendor/three/core.js#L9073)：Returns ˋtrueˋ if the given line segment intersects with (passes through) the plane. @param {Line3} line - The line to test. @return {boolean} Whether the given line segment intersects with the plane or not.
- `intersectsBox(box)` [源码:9084](../../eyes/src/vendor/three/core.js#L9084)：Returns ˋtrueˋ if the given bounding box intersects with the plane. @param {Box3} box - The bounding box to test. @return {boolean} Whether the given bounding box intersects with the plane or not.
- `intersectsSphere(sphere)` [源码:9093](../../eyes/src/vendor/three/core.js#L9093)：Returns ˋtrueˋ if the given bounding sphere intersects with the plane. @param {Sphere} sphere - The bounding sphere to test. @return {boolean} Whether the given bounding sphere intersects with the plane or not.
- `coplanarPoint(target)` [源码:9103](../../eyes/src/vendor/three/core.js#L9103)：Returns a coplanar vector to the plane, by calculating the projection of the normal at the origin onto the plane. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The coplanar point.
- `applyMatrix4(matrix, optionalNormalMatrix)` [源码:9118](../../eyes/src/vendor/three/core.js#L9118)：Apply a 4x4 matrix to the plane. The matrix must be an affine, homogeneous transform. The optional normal matrix can be pre-computed like so: ˋˋˋjs const optionalNormalMatrix = new THREE.Matrix3().getNormalMatrix( matrix ); ˋˋˋ @param {Matrix4} matrix - The transformation matrix. @param {Matrix4} [optionalNormalMatrix] - A pre-computed normal matrix. @return {Plane} A reference to this plane.
- `translate(offset)` [源码:9131](../../eyes/src/vendor/three/core.js#L9131)：Translates the plane by the distance defined by the given offset vector. Note that this only affects the plane constant and will not affect the normal vector. @param {Vector3} offset - The offset vector. @return {Plane} A reference to this plane.
- `equals(plane)` [源码:9140](../../eyes/src/vendor/three/core.js#L9140)：Returns ˋtrueˋ if this plane is equal with the given one. @param {Plane} plane - The plane to test for equality. @return {boolean} Whether this plane is equal with the given one.
- `clone()` [源码:9148](../../eyes/src/vendor/three/core.js#L9148)：Returns a new plane with copied values from this instance. @return {Plane} A clone of this instance.

### `Frustum`

Frustums are used to determine what is inside the camera's field of view. They help speed up the rendering process - objects which lie outside a camera's frustum can safely be excluded from rendering. This class is mainly intended for use internally by a renderer.。父类 `无`。

- `constructor(p0=new Plane(), p1=new Plane(), p2=new Plane(), p3=new Plane(), p4=new Plane(), p5=new Plane())` [源码:9173](../../eyes/src/vendor/three/core.js#L9173)：Constructs a new frustum. @param {Plane} [p0] - The first plane that encloses the frustum. @param {Plane} [p1] - The second plane that encloses the frustum. @param {Plane} [p2] - The third plane that encloses the frustum. @param {Plane} [p3] - The fourth plane that encloses the frustum. @param {Plane} [p4] - The fifth plane that encloses the frustum. @param {Plane} [p5] - The sixth plane that encloses the frustum.
- `set(p0, p1, p2, p3, p4, p5)` [源码:9187](../../eyes/src/vendor/three/core.js#L9187)：Sets the frustum planes by copying the given planes. @param {Plane} [p0] - The first plane that encloses the frustum. @param {Plane} [p1] - The second plane that encloses the frustum. @param {Plane} [p2] - The third plane that encloses the frustum. @param {Plane} [p3] - The fourth plane that encloses the frustum. @param {Plane} [p4] - The fifth plane that encloses the frustum. @param {Plane} [p5] - The sixth plane that encloses the frustum. @return {Frustum} A reference to this frustum.
- `copy(e)` [源码:9191](../../eyes/src/vendor/three/core.js#L9191)：复制自身状态；需注意资源引用与深复制边界
- `setFromProjectionMatrix(e, t=WebGLCoordinateSystem, n=!1)` [源码:9196](../../eyes/src/vendor/three/core.js#L9196)：源码方法 setFromProjectionMatrix；作用以类职责与源码实现为准，未猜测压缩参数含义
- `intersectsObject(e)` [源码:9221](../../eyes/src/vendor/three/core.js#L9221)：源码方法 intersectsObject；作用以类职责与源码实现为准，未猜测压缩参数含义
- `intersectsSprite(e)` [源码:9228](../../eyes/src/vendor/three/core.js#L9228)：源码方法 intersectsSprite；作用以类职责与源码实现为准，未猜测压缩参数含义
- `intersectsSphere(e)` [源码:9233](../../eyes/src/vendor/three/core.js#L9233)：源码方法 intersectsSphere；作用以类职责与源码实现为准，未猜测压缩参数含义
- `intersectsBox(e)` [源码:9242](../../eyes/src/vendor/three/core.js#L9242)：源码方法 intersectsBox；作用以类职责与源码实现为准，未猜测压缩参数含义
- `containsPoint(e)` [源码:9250](../../eyes/src/vendor/three/core.js#L9250)：源码方法 containsPoint；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clone()` [源码:9260](../../eyes/src/vendor/three/core.js#L9260)：Returns a new frustum with copied values from this instance. @return {Frustum} A clone of this instance.

### `FrustumArray`

FrustumArray is used to determine if an object is visible in at least one camera from an array of cameras. This is particularly useful for multi-view renderers.。父类 `无`。

- `constructor()` [源码:9270](../../eyes/src/vendor/three/core.js#L9270)：当前操作：写入 _count、_frustums、coordinateSystem；返回 无显式返回。
- `setFromArrayCamera(e)` [源码:9273](../../eyes/src/vendor/three/core.js#L9273)：源码方法 setFromArrayCamera；作用以类职责与源码实现为准，未猜测压缩参数含义
- `intersectsObject(e)` [源码:9282](../../eyes/src/vendor/three/core.js#L9282)：源码方法 intersectsObject；作用以类职责与源码实现为准，未猜测压缩参数含义
- `intersectsSprite(e)` [源码:9287](../../eyes/src/vendor/three/core.js#L9287)：源码方法 intersectsSprite；作用以类职责与源码实现为准，未猜测压缩参数含义
- `intersectsSphere(e)` [源码:9292](../../eyes/src/vendor/three/core.js#L9292)：源码方法 intersectsSphere；作用以类职责与源码实现为准，未猜测压缩参数含义
- `intersectsBox(e)` [源码:9297](../../eyes/src/vendor/three/core.js#L9297)：源码方法 intersectsBox；作用以类职责与源码实现为准，未猜测压缩参数含义
- `containsPoint(e)` [源码:9302](../../eyes/src/vendor/three/core.js#L9302)：源码方法 containsPoint；作用以类职责与源码实现为准，未猜测压缩参数含义
- `copy(e)` [源码:9307](../../eyes/src/vendor/three/core.js#L9307)：复制自身状态；需注意资源引用与深复制边界
- `clone()` [源码:9319](../../eyes/src/vendor/three/core.js#L9319)：Returns a new frustum array with copied values from this instance. @return {FrustumArray} A clone of this instance.

### `MultiDrawRenderList`

批量网格的多绘制调用计数和偏移列表。父类 `无`。

- `constructor()` [源码:9333](../../eyes/src/vendor/three/core.js#L9333)：当前操作：写入 index、list、pool；返回 无显式返回。
- `push(start, count, z, index)` [源码:9336](../../eyes/src/vendor/three/core.js#L9336)：源码方法 push；作用以类职责与源码实现为准，未猜测压缩参数含义
- `reset()` [源码:9348](../../eyes/src/vendor/three/core.js#L9348)：源码方法 reset；作用以类职责与源码实现为准，未猜测压缩参数含义

### `BatchedMesh`

A special version of a mesh with multi draw batch rendering support. Use this class if you have to render a large number of objects with the same material but with different geometries or world transformations. The usage of ˋBatchedMeshˋ will help you to reduce the number of draw calls and thus improve the overall rendering performance in your application. ˋˋˋjs const box = new THREE.BoxGeometry( 1, 1, 1 ); const sphere = new THREE.SphereGeometry( 1, 12, 12 ); const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); // initialize and add geometries into the batched mesh const batchedMesh = new BatchedMesh( 10, 5000, 10000, material ); const boxGeometryId = batchedMesh.addGeometry( box ); const sphereGeometryId = batchedMesh.addGeometry( sphere ); // create instances of those geometries const boxInstancedId1 = batchedMesh.addInstance( boxGeometryId ); const boxInstancedId2 = batchedMesh.addInstance( boxGeometryId ); const sphereInstancedId1 = batchedMesh.addInstance( sphereGeometryId ); const sphereInstancedId2 = batchedMesh.addInstance( sphereGeometryId ); // position the geometries batchedMesh.setMatrixAt( boxInstancedId1, boxMatrix1 ); batchedMesh.setMatrixAt( boxInstancedId2, boxMatrix2 ); batchedMesh.setMatrixAt( sphereInstancedId1, sphereMatrix1 ); batchedMesh.setMatrixAt( sphereInstancedId2, sphereMatrix2 ); scene.add( batchedMesh ); ˋˋˋ @augments Mesh。父类 `Mesh`。

- `constructor(maxInstanceCount, maxVertexCount, maxIndexCount=2*maxVertexCount, r)` [源码:9418](../../eyes/src/vendor/three/core.js#L9418)：当前操作：写入 _availableGeometryIds、_availableInstanceIds、_colorsTexture、_geometryCount、_geometryInfo、_geometryInitialized、_indirectTexture、_instanceInfo、_matricesTexture、_maxIndexCount、_maxInstanceCount、_maxVertexCount、_multiDrawCount、_multiDrawCounts、_multiDrawStarts、_nextIndexStart、_nextVertexStart、_visibilityChanged、boundingBox、boundingSphere、customSort、isBatchedMesh、perObjectFrustumCulled、sortObjects；返回 无显式返回。
- `get maxInstanceCount()` [源码:9421](../../eyes/src/vendor/three/core.js#L9421)：只读返回 this._maxInstanceCount；此 getter 不执行对应 setter 的写入或更新通知
- `get instanceCount()` [源码:9424](../../eyes/src/vendor/three/core.js#L9424)：只读返回 this._instanceInfo.length - this._availableInstanceIds.length；此 getter 不执行对应 setter 的写入或更新通知
- `get unusedVertexCount()` [源码:9427](../../eyes/src/vendor/three/core.js#L9427)：只读返回 this._maxVertexCount - this._nextVertexStart；此 getter 不执行对应 setter 的写入或更新通知
- `get unusedIndexCount()` [源码:9430](../../eyes/src/vendor/three/core.js#L9430)：只读返回 this._maxIndexCount - this._nextIndexStart；此 getter 不执行对应 setter 的写入或更新通知
- `_initMatricesTexture()` [源码:9433](../../eyes/src/vendor/three/core.js#L9433)：源码方法 _initMatricesTexture；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_initIndirectTexture()` [源码:9440](../../eyes/src/vendor/three/core.js#L9440)：源码方法 _initIndirectTexture；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_initColorsTexture()` [源码:9447](../../eyes/src/vendor/three/core.js#L9447)：源码方法 _initColorsTexture；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_initializeGeometry(e)` [源码:9454](../../eyes/src/vendor/three/core.js#L9454)：源码方法 _initializeGeometry；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_validateGeometry(e)` [源码:9477](../../eyes/src/vendor/three/core.js#L9477)：源码方法 _validateGeometry；作用以类职责与源码实现为准，未猜测压缩参数含义
- `validateInstanceId(e)` [源码:9487](../../eyes/src/vendor/three/core.js#L9487)：源码方法 validateInstanceId；作用以类职责与源码实现为准，未猜测压缩参数含义
- `validateGeometryId(e)` [源码:9491](../../eyes/src/vendor/three/core.js#L9491)：源码方法 validateGeometryId；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setCustomSort(func)` [源码:9502](../../eyes/src/vendor/three/core.js#L9502)：Takes a sort a function that is run before render. The function takes a list of instances to sort and a camera. The objects in the list include a "z" field to perform a depth-ordered sort with. @param {Function} func - The custom sort function. @return {BatchedMesh} A reference to this batched mesh.
- `computeBoundingBox()` [源码:9505](../../eyes/src/vendor/three/core.js#L9505)：扫描位置和 morph 属性得到轴对齐包围盒
- `computeBoundingSphere()` [源码:9516](../../eyes/src/vendor/three/core.js#L9516)：从顶点和 morph 属性建立包围球；变化后需再次计算
- `addInstance(e)` [源码:9527](../../eyes/src/vendor/three/core.js#L9527)：源码方法 addInstance；作用以类职责与源码实现为准，未猜测压缩参数含义
- `addGeometry(e, t=-1, n=-1)` [源码:9541](../../eyes/src/vendor/three/core.js#L9541)：源码方法 addGeometry；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setGeometryAt(e, t)` [源码:9563](../../eyes/src/vendor/three/core.js#L9563)：源码方法 setGeometryAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `deleteGeometry(e)` [源码:9596](../../eyes/src/vendor/three/core.js#L9596)：源码方法 deleteGeometry；作用以类职责与源码实现为准，未猜测压缩参数含义
- `deleteInstance(instanceId)` [源码:9609](../../eyes/src/vendor/three/core.js#L9609)：Deletes an existing instance from the batch using the given ID. @param {number} instanceId - The ID of the instance to remove from the batch. @return {BatchedMesh} A reference to this batched mesh.
- `optimize()` [源码:9612](../../eyes/src/vendor/three/core.js#L9612)：源码方法 optimize；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getBoundingBoxAt(e, t)` [源码:9658](../../eyes/src/vendor/three/core.js#L9658)：源码方法 getBoundingBoxAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getBoundingSphereAt(e, t)` [源码:9674](../../eyes/src/vendor/three/core.js#L9674)：源码方法 getBoundingSphereAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setMatrixAt(e, t)` [源码:9692](../../eyes/src/vendor/three/core.js#L9692)：源码方法 setMatrixAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getMatrixAt(e, t)` [源码:9698](../../eyes/src/vendor/three/core.js#L9698)：源码方法 getMatrixAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setColorAt(e, t)` [源码:9701](../../eyes/src/vendor/three/core.js#L9701)：源码方法 setColorAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getColorAt(e, t)` [源码:9704](../../eyes/src/vendor/three/core.js#L9704)：源码方法 getColorAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setVisibleAt(e, t)` [源码:9707](../../eyes/src/vendor/three/core.js#L9707)：源码方法 setVisibleAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getVisibleAt(instanceId)` [源码:9716](../../eyes/src/vendor/three/core.js#L9716)：Returns the visibility state of the defined instance. @param {number} instanceId - The ID of an instance to get the visibility state of. @return {boolean} Whether the instance is visible or not.
- `setGeometryIdAt(instanceId, geometryId)` [源码:9726](../../eyes/src/vendor/three/core.js#L9726)：Sets the geometry ID of the instance at the given index. @param {number} instanceId - The ID of the instance to set the geometry ID of. @param {number} geometryId - The geometry ID to be use by the instance. @return {BatchedMesh} A reference to this batched mesh.
- `getGeometryIdAt(instanceId)` [源码:9735](../../eyes/src/vendor/three/core.js#L9735)：Returns the geometry ID of the defined instance. @param {number} instanceId - The ID of an instance to get the geometry ID of. @return {number} The instance's geometry ID.
- `getGeometryRangeAt(geometryId, target={})` [源码:9750](../../eyes/src/vendor/three/core.js#L9750)：Get the range representing the subset of triangles related to the attached geometry, indicating the starting offset and count, or ˋnullˋ if invalid. @param {number} geometryId - The id of the geometry to get the range of. @param {Object} [target] - The target object that is used to store the method's result. @return {{ vertexStart:number,vertexCount:number,reservedVertexCount:number, indexStart:number,indexCount:number,reservedIndexCount:number, start:number,count:number }} The result object with range data.
- `setInstanceCount(maxInstanceCount)` [源码:9755](../../eyes/src/vendor/three/core.js#L9755)：源码方法 setInstanceCount；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setGeometrySize(maxVertexCount, maxIndexCount)` [源码:9768](../../eyes/src/vendor/three/core.js#L9768)：源码方法 setGeometrySize；作用以类职责与源码实现为准，未猜测压缩参数含义
- `raycast(e, t)` [源码:9780](../../eyes/src/vendor/three/core.js#L9780)：在几何/对象局部空间做相交测试并将命中结果变换回世界坐标
- `copy(e)` [源码:9799](../../eyes/src/vendor/three/core.js#L9799)：复制自身状态；需注意资源引用与深复制边界
- `dispose()` [源码:9808](../../eyes/src/vendor/three/core.js#L9808)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `onBeforeRender(e, t, n, r, i)` [源码:9811](../../eyes/src/vendor/three/core.js#L9811)：源码方法 onBeforeRender；作用以类职责与源码实现为准，未猜测压缩参数含义
- `onBeforeShadow(renderer, object, camera, shadowCamera, geometry, depthMaterial)` [源码:9857](../../eyes/src/vendor/three/core.js#L9857)：源码方法 onBeforeShadow；作用以类职责与源码实现为准，未猜测压缩参数含义

### `LineBasicMaterial`

A material for rendering line primitives. Materials define the appearance of renderable 3D objects. ˋˋˋjs const material = new THREE.LineBasicMaterial( { color: 0xffffff } ); ˋˋˋ @augments Material。父类 `Material`。

- `constructor(e)` [源码:9873](../../eyes/src/vendor/three/core.js#L9873)：当前操作：写入 color、fog、isLineBasicMaterial、linecap、linejoin、linewidth、map、type；返回 无显式返回。
- `copy(source)` [源码:9876](../../eyes/src/vendor/three/core.js#L9876)：复制自身状态；需注意资源引用与深复制边界

### `Line`

A continuous line. The line are rendered by connecting consecutive vertices with straight lines. ˋˋˋjs const material = new THREE.LineBasicMaterial( { color: 0x0000ff } ); const points = []; points.push( new THREE.Vector3( - 10, 0, 0 ) ); points.push( new THREE.Vector3( 0, 10, 0 ) ); points.push( new THREE.Vector3( 10, 0, 0 ) ); const geometry = new THREE.BufferGeometry().setFromPoints( points ); const line = new THREE.Line( geometry, material ); scene.add( line ); ˋˋˋ @augments Object3D。父类 `Object3D`。

- `constructor(e=new BufferGeometry(), material=new LineBasicMaterial())` [源码:9908](../../eyes/src/vendor/three/core.js#L9908)：当前操作：写入 geometry、isLine、material、morphTargetDictionary、morphTargetInfluences、type；返回 无显式返回。
- `copy(source, recursive)` [源码:9911](../../eyes/src/vendor/three/core.js#L9911)：复制自身状态；需注意资源引用与深复制边界
- `computeLineDistances()` [源码:9914](../../eyes/src/vendor/three/core.js#L9914)：源码方法 computeLineDistances；作用以类职责与源码实现为准，未猜测压缩参数含义
- `raycast(e, t)` [源码:9924](../../eyes/src/vendor/three/core.js#L9924)：在几何/对象局部空间做相交测试并将命中结果变换回世界坐标
- `updateMorphTargets()` [源码:9964](../../eyes/src/vendor/three/core.js#L9964)：源码方法 updateMorphTargets；作用以类职责与源码实现为准，未猜测压缩参数含义

### `LineSegments`

独立线段对形式的线对象。父类 `Line`。

- `constructor(e, t)` [源码:9998](../../eyes/src/vendor/three/core.js#L9998)：当前操作：写入 isLineSegments、type；返回 无显式返回。
- `computeLineDistances()` [源码:10001](../../eyes/src/vendor/three/core.js#L10001)：源码方法 computeLineDistances；作用以类职责与源码实现为准，未猜测压缩参数含义

### `LineLoop`

闭合首尾顶点的线对象。父类 `Line`。

- `constructor(e, t)` [源码:10013](../../eyes/src/vendor/three/core.js#L10013)：当前操作：写入 isLineLoop、type；返回 无显式返回。

### `PointsMaterial`

A material for rendering point primitives. Materials define the appearance of renderable 3D objects. ˋˋˋjs const vertices = []; for ( let i = 0; i < 10000; i ++ ) { const x = THREE.MathUtils.randFloatSpread( 2000 ); const y = THREE.MathUtils.randFloatSpread( 2000 ); const z = THREE.MathUtils.randFloatSpread( 2000 ); vertices.push( x, y, z ); } const geometry = new THREE.BufferGeometry(); geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) ); const material = new THREE.PointsMaterial( { color: 0x888888 } ); const points = new THREE.Points( geometry, material ); scene.add( points ); ˋˋˋ @augments Material。父类 `Material`。

- `constructor(e)` [源码:10043](../../eyes/src/vendor/three/core.js#L10043)：当前操作：写入 alphaMap、color、fog、isPointsMaterial、map、size、sizeAttenuation、type；返回 无显式返回。
- `copy(source)` [源码:10046](../../eyes/src/vendor/three/core.js#L10046)：复制自身状态；需注意资源引用与深复制边界

### `Points`

A class for displaying points or point clouds. @augments Object3D。父类 `Object3D`。

- `constructor(e=new BufferGeometry(), material=new PointsMaterial())` [源码:10060](../../eyes/src/vendor/three/core.js#L10060)：当前操作：写入 geometry、isPoints、material、morphTargetDictionary、morphTargetInfluences、type；返回 无显式返回。
- `copy(source, recursive)` [源码:10063](../../eyes/src/vendor/three/core.js#L10063)：复制自身状态；需注意资源引用与深复制边界
- `raycast(e, t)` [源码:10066](../../eyes/src/vendor/three/core.js#L10066)：在几何/对象局部空间做相交测试并将命中结果变换回世界坐标
- `updateMorphTargets()` [源码:10086](../../eyes/src/vendor/three/core.js#L10086)：源码方法 updateMorphTargets；作用以类职责与源码实现为准，未猜测压缩参数含义

### `VideoTexture`

A texture for use with a video. ˋˋˋjs // assuming you have created a HTML video element with id="video" const video = document.getElementById( 'video' ); const texture = new THREE.VideoTexture( video ); ˋˋˋ Note: When using video textures with {@link WebGPURenderer}, {@link Texture#colorSpace} must be set to THREE.SRGBColorSpace. Note: After the initial use of a texture, its dimensions, format, and type cannot be changed. Instead, call {@link Texture#dispose} on the texture and instantiate a new one. @augments Texture。父类 `Texture`。

- `constructor(e, t, n, r, i=LinearFilter, a=LinearFilter, s, o, c)` [源码:10138](../../eyes/src/vendor/three/core.js#L10138)：当前操作：写入 _requestVideoFrameCallbackId、generateMipmaps、isVideoTexture；返回 无显式返回。
- `clone()` [源码:10145](../../eyes/src/vendor/three/core.js#L10145)：以构造器和 copy 建立副本，资源共享规则由 copy 决定
- `update()` [源码:10148](../../eyes/src/vendor/three/core.js#L10148)：按当前时间或场景状态推进对象并维护缓存失效
- `dispose()` [源码:10152](../../eyes/src/vendor/three/core.js#L10152)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

### `VideoFrameTexture`

This class can be used as an alternative way to define video data. Instead of using an instance of ˋHTMLVideoElementˋ like with ˋVideoTextureˋ, ˋVideoFrameTextureˋ expects each frame is defined manually via {@link VideoFrameTexture#setFrame}. A typical use case for this module is when video frames are decoded with the WebCodecs API. ˋˋˋjs const texture = new THREE.VideoFrameTexture(); texture.setFrame( frame ); ˋˋˋ @augments VideoTexture。父类 `VideoTexture`。

- `constructor(mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy)` [源码:10182](../../eyes/src/vendor/three/core.js#L10182)：Constructs a new video frame texture. @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping. @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value. @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value. @param {number} [magFilter=LinearFilter] - The mag filter value. @param {number} [minFilter=LinearFilter] - The min filter value. @param {number} [format=RGBAFormat] - The texture format. @param {number} [type=UnsignedByteType] - The texture type. @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
- `update()` [源码:10185](../../eyes/src/vendor/three/core.js#L10185)：按当前时间或场景状态推进对象并维护缓存失效
- `clone()` [源码:10186](../../eyes/src/vendor/three/core.js#L10186)：以构造器和 copy 建立副本，资源共享规则由 copy 决定
- `setFrame(frame)` [源码:10195](../../eyes/src/vendor/three/core.js#L10195)：Sets the current frame of the video. This will automatically update the texture so the data can be used for rendering. @param {VideoFrame} frame - The video frame.

### `FramebufferTexture`

This class can only be used in combination with ˋcopyFramebufferToTexture()ˋ methods of renderers. It extracts the contents of the current bound framebuffer and provides it as a texture for further usage. ˋˋˋjs const pixelRatio = window.devicePixelRatio; const textureSize = 128 * pixelRatio; const frameTexture = new FramebufferTexture( textureSize, textureSize ); // calculate start position for copying part of the frame data const vector = new Vector2(); vector.x = ( window.innerWidth * pixelRatio / 2 ) - ( textureSize / 2 ); vector.y = ( window.innerHeight * pixelRatio / 2 ) - ( textureSize / 2 ); renderer.render( scene, camera ); // copy part of the rendered frame into the framebuffer texture renderer.copyFramebufferToTexture( frameTexture, vector ); ˋˋˋ @augments Texture。父类 `Texture`。

- `constructor(width, height)` [源码:10230](../../eyes/src/vendor/three/core.js#L10230)：Constructs a new framebuffer texture. @param {number} [width] - The width of the texture. @param {number} [height] - The height of the texture.

### `CompressedTexture`

Creates a texture based on data in compressed form. These texture are usually loaded with {@link CompressedTextureLoader}. @augments Texture。父类 `Texture`。

- `constructor(mipmaps, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, colorSpace)` [源码:10262](../../eyes/src/vendor/three/core.js#L10262)：Constructs a new compressed texture. @param {Array<Object>} mipmaps - This array holds for all mipmaps (including the bases mip) the data and dimensions. @param {number} width - The width of the texture. @param {number} height - The height of the texture. @param {number} [format=RGBAFormat] - The texture format. @param {number} [type=UnsignedByteType] - The texture type. @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping. @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value. @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value. @param {number} [magFilter=LinearFilter] - The mag filter value. @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value. @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value. @param {string} [colorSpace=NoColorSpace] - The color space.

### `CompressedArrayTexture`

Creates a texture 2D array based on data in compressed form. These texture are usually loaded with {@link CompressedTextureLoader}. @augments CompressedTexture。父类 `CompressedTexture`。

- `constructor(mipmaps, width, height, depth, format, type)` [源码:10288](../../eyes/src/vendor/three/core.js#L10288)：Constructs a new compressed array texture. @param {Array<Object>} mipmaps - This array holds for all mipmaps (including the bases mip) the data and dimensions. @param {number} width - The width of the texture. @param {number} height - The height of the texture. @param {number} depth - The depth of the texture. @param {number} [format=RGBAFormat] - The min filter value. @param {number} [type=UnsignedByteType] - The min filter value.
- `addLayerUpdate(layerIndex)` [源码:10300](../../eyes/src/vendor/three/core.js#L10300)：Describes that a specific layer of the texture needs to be updated. Normally when {@link Texture#needsUpdate} is set to ˋtrueˋ, the entire compressed texture array is sent to the GPU. Marking specific layers will only transmit subsets of all mipmaps associated with a specific depth in the array which is often much more performant. @param {number} layerIndex - The layer index that should be updated.
- `clearLayerUpdates()` [源码:10303](../../eyes/src/vendor/three/core.js#L10303)：源码方法 clearLayerUpdates；作用以类职责与源码实现为准，未猜测压缩参数含义

### `CompressedCubeTexture`

CompressedCube 纹理数据布局、格式和上传生命周期。父类 `CompressedTexture`。

- `constructor(image, t, n)` [源码:10308](../../eyes/src/vendor/three/core.js#L10308)：当前操作：写入 image、isCompressedCubeTexture、isCubeTexture；返回 无显式返回。

### `CubeTexture`

Creates a cube texture made up of six images. ˋˋˋjs const loader = new THREE.CubeTextureLoader(); loader.setPath( 'textures/cube/pisa/' ); const textureCube = loader.load( [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ] ); const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } ); ˋˋˋ @augments Texture。父类 `Texture`。

- `constructor(images=[], mapping=CubeReflectionMapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace)` [源码:10343](../../eyes/src/vendor/three/core.js#L10343)：Constructs a new cube texture. @param {Array<Image>} [images=[]] - An array holding a image for each side of a cube. @param {number} [mapping=CubeReflectionMapping] - The texture mapping. @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value. @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value. @param {number} [magFilter=LinearFilter] - The mag filter value. @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value. @param {number} [format=RGBAFormat] - The texture format. @param {number} [type=UnsignedByteType] - The texture type. @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value. @param {string} [colorSpace=NoColorSpace] - The color space value.
- `get images()` [源码:10346](../../eyes/src/vendor/three/core.js#L10346)：只读返回 this.image；此 getter 不执行对应 setter 的写入或更新通知
- `set images(value)` [源码:10349](../../eyes/src/vendor/three/core.js#L10349)：将输入值写入 this.image，实际变更发生在 setter 中

### `CanvasTexture`

Creates a texture from a canvas element. This is almost the same as the base texture class, except that it sets {@link Texture#needsUpdate} to ˋtrueˋ immediately since a canvas can directly be used for rendering. @augments Texture。父类 `Texture`。

- `constructor(canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy)` [源码:10375](../../eyes/src/vendor/three/core.js#L10375)：Constructs a new texture. @param {HTMLCanvasElement} [canvas] - The HTML canvas element. @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping. @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value. @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value. @param {number} [magFilter=LinearFilter] - The mag filter value. @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value. @param {number} [format=RGBAFormat] - The texture format. @param {number} [type=UnsignedByteType] - The texture type. @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.

### `HTMLTexture`

HTML 纹理数据布局、格式和上传生命周期。父类 `Texture`。

- `constructor(e, t, n, r, i, a, s, o, c)` [源码:10380](../../eyes/src/vendor/three/core.js#L10380)：当前操作：写入 generateMipmaps、isHTMLTexture、needsUpdate；返回 无显式返回。
- `dispose()` [源码:10387](../../eyes/src/vendor/three/core.js#L10387)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

### `DepthTexture`

This class can be used to automatically save the depth information of a rendering into a texture. @augments Texture。父类 `Texture`。

- `constructor(e, t, n=UnsignedIntType, r, i, a, s=NearestFilter, o=NearestFilter, c, l=DepthFormat, u=1)` [源码:10399](../../eyes/src/vendor/three/core.js#L10399)：当前操作：写入 compareFunction、flipY、generateMipmaps、isDepthTexture；返回 无显式返回。
- `copy(source)` [源码:10407](../../eyes/src/vendor/three/core.js#L10407)：复制自身状态；需注意资源引用与深复制边界
- `toJSON(e)` [源码:10410](../../eyes/src/vendor/three/core.js#L10410)：序列化资源和引用；共享资源通过元数据缓存去重

### `CubeDepthTexture`

This class can be used to automatically save the depth information of a cube rendering into a cube texture with depth format. Used for PointLight shadows. @augments DepthTexture。父类 `DepthTexture`。

- `constructor(size, type=UnsignedIntType, mapping=CubeReflectionMapping, wrapS, wrapT, magFilter=NearestFilter, minFilter=NearestFilter, anisotropy, format=DepthFormat)` [源码:10435](../../eyes/src/vendor/three/core.js#L10435)：Constructs a new cube depth texture. @param {number} size - The size (width and height) of each cube face. @param {number} [type=UnsignedIntType] - The texture type. @param {number} [mapping=CubeReflectionMapping] - The texture mapping. @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value. @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value. @param {number} [magFilter=NearestFilter] - The mag filter value. @param {number} [minFilter=NearestFilter] - The min filter value. @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value. @param {number} [format=DepthFormat] - The texture format.
- `get images()` [源码:10444](../../eyes/src/vendor/three/core.js#L10444)：只读返回 this.image；此 getter 不执行对应 setter 的写入或更新通知
- `set images(value)` [源码:10447](../../eyes/src/vendor/three/core.js#L10447)：将输入值写入 this.image，实际变更发生在 setter 中

### `ExternalTexture`

Represents a texture created externally with the same renderer context. This may be a texture from a protected media stream, device camera feed, or other data feeds like a depth sensor. @augments Texture。父类 `Texture`。

- `constructor(sourceTexture=null)` [源码:10465](../../eyes/src/vendor/three/core.js#L10465)：Creates a new raw texture. @param {?(WebGLTexture\|GPUTexture)} [sourceTexture=null] - The external texture.
- `copy(source)` [源码:10468](../../eyes/src/vendor/three/core.js#L10468)：复制自身状态；需注意资源引用与深复制边界

### `BoxGeometry`

A geometry class for a rectangular cuboid with a given width, height, and depth. On creation, the cuboid is centred on the origin, with each edge parallel to one of the axes. ˋˋˋjs const geometry = new THREE.BoxGeometry( 1, 1, 1 ); const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); const cube = new THREE.Mesh( geometry, material ); scene.add( cube ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#BoxGeometry。父类 `BufferGeometry`。

- `constructor(e=1, t=1, n=1, r=1, i=1, a=1)` [源码:10488](../../eyes/src/vendor/three/core.js#L10488)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:10534](../../eyes/src/vendor/three/core.js#L10534)：复制自身状态；需注意资源引用与深复制边界
- `static fromJSON(data)` [源码:10544](../../eyes/src/vendor/three/core.js#L10544)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {BoxGeometry} A new instance.

### `CapsuleGeometry`

A geometry class for representing a capsule. ˋˋˋjs const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8, 1 ); const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); const capsule = new THREE.Mesh( geometry, material ); scene.add( capsule ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#CapsuleGeometry。父类 `BufferGeometry`。

- `constructor(e=1, t=1, n=4, r=8, i=1)` [源码:10562](../../eyes/src/vendor/three/core.js#L10562)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:10622](../../eyes/src/vendor/three/core.js#L10622)：复制自身状态；需注意资源引用与深复制边界
- `static fromJSON(data)` [源码:10632](../../eyes/src/vendor/three/core.js#L10632)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {CapsuleGeometry} A new instance.

### `CircleGeometry`

A simple shape of Euclidean geometry. It is constructed from a number of triangular segments that are oriented around a central point and extend as far out as a given radius. It is built counter-clockwise from a start angle and a given central angle. It can also be used to create regular polygons, where the number of segments determines the number of sides. ˋˋˋjs const geometry = new THREE.CircleGeometry( 5, 32 ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const circle = new THREE.Mesh( geometry, material ); scene.add( circle ) ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#CircleGeometry。父类 `BufferGeometry`。

- `constructor(e=1, t=32, n=0, r=2*Math.PI)` [源码:10655](../../eyes/src/vendor/three/core.js#L10655)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:10676](../../eyes/src/vendor/three/core.js#L10676)：复制自身状态；需注意资源引用与深复制边界
- `static fromJSON(data)` [源码:10686](../../eyes/src/vendor/three/core.js#L10686)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {CircleGeometry} A new instance.

### `CylinderGeometry`

A geometry class for representing a cylinder. ˋˋˋjs const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const cylinder = new THREE.Mesh( geometry, material ); scene.add( cylinder ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#CylinderGeometry。父类 `BufferGeometry`。

- `constructor(e=1, t=1, n=1, r=32, i=1, a=!1, s=0, o=2*Math.PI)` [源码:10704](../../eyes/src/vendor/three/core.js#L10704)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:10775](../../eyes/src/vendor/three/core.js#L10775)：复制自身状态；需注意资源引用与深复制边界
- `static fromJSON(data)` [源码:10785](../../eyes/src/vendor/three/core.js#L10785)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {CylinderGeometry} A new instance.

### `ConeGeometry`

A geometry class for representing a cone. ˋˋˋjs const geometry = new THREE.ConeGeometry( 5, 20, 32 ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const cone = new THREE.Mesh(geometry, material ); scene.add( cone ); ˋˋˋ @augments CylinderGeometry @demo scenes/geometry-browser.html#ConeGeometry。父类 `CylinderGeometry`。

- `constructor(e=1, t=1, n=32, r=1, i=!1, a=0, s=2*Math.PI)` [源码:10803](../../eyes/src/vendor/three/core.js#L10803)：当前操作：写入 parameters、type；返回 无显式返回。
- `static fromJSON(data)` [源码:10821](../../eyes/src/vendor/three/core.js#L10821)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {ConeGeometry} A new instance.

### `PolyhedronGeometry`

A polyhedron is a solid in three dimensions with flat faces. This class will take an array of vertices, project them onto a sphere, and then divide them up to the desired level of detail. @augments BufferGeometry。父类 `BufferGeometry`。

- `constructor(e=[], t=[], n=1, r=0)` [源码:10833](../../eyes/src/vendor/three/core.js#L10833)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:10914](../../eyes/src/vendor/three/core.js#L10914)：复制自身状态；需注意资源引用与深复制边界
- `static fromJSON(data)` [源码:10924](../../eyes/src/vendor/three/core.js#L10924)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {PolyhedronGeometry} A new instance.

### `DodecahedronGeometry`

A geometry class for representing a dodecahedron. ˋˋˋjs const geometry = new THREE.DodecahedronGeometry(); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const dodecahedron = new THREE.Mesh( geometry, material ); scene.add( dodecahedron ); ˋˋˋ @augments PolyhedronGeometry @demo scenes/geometry-browser.html#DodecahedronGeometry。父类 `PolyhedronGeometry`。

- `constructor(e=1, t=0)` [源码:10942](../../eyes/src/vendor/three/core.js#L10942)：当前操作：写入 parameters、type；返回 无显式返回。
- `static fromJSON(data)` [源码:10957](../../eyes/src/vendor/three/core.js#L10957)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {DodecahedronGeometry} A new instance.

### `EdgesGeometry`

Can be used as a helper object to view the edges of a geometry. ˋˋˋjs const geometry = new THREE.BoxGeometry(); const edges = new THREE.EdgesGeometry( geometry ); const line = new THREE.LineSegments( edges ); scene.add( line ); ˋˋˋ Note: It is not yet possible to serialize/deserialize instances of this class. @augments BufferGeometry。父类 `BufferGeometry`。

- `constructor(e=null, t=1)` [源码:10980](../../eyes/src/vendor/three/core.js#L10980)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:11028](../../eyes/src/vendor/three/core.js#L11028)：复制自身状态；需注意资源引用与深复制边界

### `Curve`

An abstract base class for creating an analytic curve object that contains methods for interpolation. @abstract。父类 `无`。

- `constructor()` [源码:11039](../../eyes/src/vendor/three/core.js#L11039)：当前操作：写入 arcLengthDivisions、cacheArcLengths、needsUpdate、type；返回 无显式返回。
- `getPoint()` [源码:11042](../../eyes/src/vendor/three/core.js#L11042)：按参数 t 计算曲线位置，通常复用可选目标向量
- `getPointAt(u, optionalTarget)` [源码:11054](../../eyes/src/vendor/three/core.js#L11054)：This method returns a vector in 2D or 3D space (depending on the curve definition) for the given interpolation factor. Unlike {@link Curve#getPoint}, this method honors the length of the curve which equidistant samples. @param {number} u - A interpolation factor representing a position on the curve. Must be in the range ˋ[0,1]ˋ. @param {(Vector2\|Vector3)} [optionalTarget] - The optional target vector the result is written to. @return {(Vector2\|Vector3)} The position on the curve. It can be a 2D or 3D vector depending on the curve definition.
- `getPoints(e=5)` [源码:11058](../../eyes/src/vendor/three/core.js#L11058)：源码方法 getPoints；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getSpacedPoints(e=5)` [源码:11063](../../eyes/src/vendor/three/core.js#L11063)：源码方法 getSpacedPoints；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getLength()` [源码:11073](../../eyes/src/vendor/three/core.js#L11073)：Returns the total arc length of the curve. @return {number} The length of the curve.
- `getLengths(divisions=this.arcLengthDivisions)` [源码:11083](../../eyes/src/vendor/three/core.js#L11083)：Returns an array of cumulative segment lengths of the curve. @param {number} [divisions=this.arcLengthDivisions] - The number of divisions. @return {Array<number>} An array holding the cumulative segment lengths.
- `updateArcLengths()` [源码:11094](../../eyes/src/vendor/three/core.js#L11094)：源码方法 updateArcLengths；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getUtoTmapping(e, t=null)` [源码:11097](../../eyes/src/vendor/three/core.js#L11097)：源码方法 getUtoTmapping；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getTangent(e, t)` [源码:11117](../../eyes/src/vendor/three/core.js#L11117)：源码方法 getTangent；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getTangentAt(u, optionalTarget)` [源码:11135](../../eyes/src/vendor/three/core.js#L11135)：Same as {@link Curve#getTangent} but with equidistant samples. @param {number} u - The interpolation factor. @param {(Vector2\|Vector3)} [optionalTarget] - The optional target vector the result is written to. @return {(Vector2\|Vector3)} The tangent vector. @see {@link Curve#getPointAt}
- `computeFrenetFrames(e, t=!1)` [源码:11139](../../eyes/src/vendor/three/core.js#L11139)：源码方法 computeFrenetFrames；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clone()` [源码:11180](../../eyes/src/vendor/three/core.js#L11180)：Returns a new curve with copied values from this instance. @return {Curve} A clone of this instance.
- `copy(source)` [源码:11189](../../eyes/src/vendor/three/core.js#L11189)：Copies the values of the given curve to this instance. @param {Curve} source - The curve to copy. @return {Curve} A reference to this curve.
- `toJSON()` [源码:11192](../../eyes/src/vendor/three/core.js#L11192)：序列化资源和引用；共享资源通过元数据缓存去重
- `fromJSON(json)` [源码:11208](../../eyes/src/vendor/three/core.js#L11208)：Deserializes the curve from the given JSON. @param {Object} json - The JSON holding the serialized curve. @return {Curve} A reference to this curve.

### `EllipseCurve`

A curve representing an ellipse. ˋˋˋjs const curve = new THREE.EllipseCurve( 0, 0, 10, 10, 0, 2 * Math.PI, false, 0 ); const points = curve.getPoints( 50 ); const geometry = new THREE.BufferGeometry().setFromPoints( points ); const material = new THREE.LineBasicMaterial( { color: 0xff0000 } ); // Create the final object to add to the scene const ellipse = new THREE.Line( geometry, material ); ˋˋˋ @augments Curve。父类 `Curve`。

- `constructor(aX=0, aY=0, xRadius=1, yRadius=1, aStartAngle=0, aEndAngle=2*Math.PI, aClockwise=!1, aRotation=0)` [源码:11236](../../eyes/src/vendor/three/core.js#L11236)：当前操作：写入 aClockwise、aEndAngle、aRotation、aStartAngle、aX、aY、isEllipseCurve、type、xRadius、yRadius；返回 无显式返回。
- `getPoint(e, t=new Vector2())` [源码:11239](../../eyes/src/vendor/three/core.js#L11239)：按参数 t 计算曲线位置，通常复用可选目标向量
- `copy(source)` [源码:11259](../../eyes/src/vendor/three/core.js#L11259)：复制自身状态；需注意资源引用与深复制边界
- `toJSON()` [源码:11262](../../eyes/src/vendor/three/core.js#L11262)：序列化资源和引用；共享资源通过元数据缓存去重
- `fromJSON(json)` [源码:11266](../../eyes/src/vendor/three/core.js#L11266)：源码方法 fromJSON；作用以类职责与源码实现为准，未猜测压缩参数含义

### `ArcCurve`

ArcCurve 参数曲线的点/切线求值及端点控制。父类 `EllipseCurve`。

- `constructor(e, t, n, r, i, a)` [源码:11271](../../eyes/src/vendor/three/core.js#L11271)：当前操作：写入 isArcCurve、type；返回 无显式返回。

### `CatmullRomCurve3`

A curve representing a Catmull-Rom spline. ˋˋˋjs //Create a closed wavey loop const curve = new THREE.CatmullRomCurve3( [ new THREE.Vector3( -10, 0, 10 ), new THREE.Vector3( -5, 5, 5 ), new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 5, -5, 5 ), new THREE.Vector3( 10, 0, 10 ) ] ); const points = curve.getPoints( 50 ); const geometry = new THREE.BufferGeometry().setFromPoints( points ); const material = new THREE.LineBasicMaterial( { color: 0xff0000 } ); // Create the final object to add to the scene const curveObject = new THREE.Line( geometry, material ); ˋˋˋ @augments Curve。父类 `Curve`。

- `constructor(points=[], closed=!1, curveType="centripetal", tension=.5)` [源码:11328](../../eyes/src/vendor/three/core.js#L11328)：当前操作：写入 closed、curveType、isCatmullRomCurve3、points、tension、type；返回 无显式返回。
- `getPoint(e, t=new Vector3())` [源码:11331](../../eyes/src/vendor/three/core.js#L11331)：按参数 t 计算曲线位置，通常复用可选目标向量
- `copy(source)` [源码:11352](../../eyes/src/vendor/three/core.js#L11352)：复制自身状态；需注意资源引用与深复制边界
- `toJSON()` [源码:11360](../../eyes/src/vendor/three/core.js#L11360)：序列化资源和引用；共享资源通过元数据缓存去重
- `fromJSON(json)` [源码:11369](../../eyes/src/vendor/three/core.js#L11369)：源码方法 fromJSON；作用以类职责与源码实现为准，未猜测压缩参数含义

### `CubicBezierCurve`

A curve representing a 2D Cubic Bezier curve. ˋˋˋjs const curve = new THREE.CubicBezierCurve( new THREE.Vector2( - 0, 0 ), new THREE.Vector2( - 5, 15 ), new THREE.Vector2( 20, 15 ), new THREE.Vector2( 10, 0 ) ); const points = curve.getPoints( 50 ); const geometry = new THREE.BufferGeometry().setFromPoints( points ); const material = new THREE.LineBasicMaterial( { color: 0xff0000 } ); // Create the final object to add to the scene const curveObject = new THREE.Line( geometry, material ); ˋˋˋ @augments Curve。父类 `Curve`。

- `constructor(v0=new Vector2(), v1=new Vector2(), v2=new Vector2(), v3=new Vector2())` [源码:11430](../../eyes/src/vendor/three/core.js#L11430)：当前操作：写入 isCubicBezierCurve、type、v0、v1、v2、v3；返回 无显式返回。
- `getPoint(t, optionalTarget=new Vector2())` [源码:11440](../../eyes/src/vendor/three/core.js#L11440)：Returns a point on the curve. @param {number} t - A interpolation factor representing a position on the curve. Must be in the range ˋ[0,1]ˋ. @param {Vector2} [optionalTarget] - The optional target vector the result is written to. @return {Vector2} The position on the curve.
- `copy(source)` [源码:11448](../../eyes/src/vendor/three/core.js#L11448)：复制自身状态；需注意资源引用与深复制边界
- `toJSON()` [源码:11451](../../eyes/src/vendor/three/core.js#L11451)：序列化资源和引用；共享资源通过元数据缓存去重
- `fromJSON(json)` [源码:11455](../../eyes/src/vendor/three/core.js#L11455)：源码方法 fromJSON；作用以类职责与源码实现为准，未猜测压缩参数含义

### `CubicBezierCurve3`

A curve representing a 3D Cubic Bezier curve. @augments Curve。父类 `Curve`。

- `constructor(v0=new Vector3(), v1=new Vector3(), v2=new Vector3(), v3=new Vector3())` [源码:11465](../../eyes/src/vendor/three/core.js#L11465)：当前操作：写入 isCubicBezierCurve3、type、v0、v1、v2、v3；返回 无显式返回。
- `getPoint(t, optionalTarget=new Vector3())` [源码:11475](../../eyes/src/vendor/three/core.js#L11475)：Returns a point on the curve. @param {number} t - A interpolation factor representing a position on the curve. Must be in the range ˋ[0,1]ˋ. @param {Vector3} [optionalTarget] - The optional target vector the result is written to. @return {Vector3} The position on the curve.
- `copy(source)` [源码:11483](../../eyes/src/vendor/three/core.js#L11483)：复制自身状态；需注意资源引用与深复制边界
- `toJSON()` [源码:11486](../../eyes/src/vendor/three/core.js#L11486)：序列化资源和引用；共享资源通过元数据缓存去重
- `fromJSON(json)` [源码:11490](../../eyes/src/vendor/three/core.js#L11490)：源码方法 fromJSON；作用以类职责与源码实现为准，未猜测压缩参数含义

### `LineCurve`

A curve representing a 2D line segment. @augments Curve。父类 `Curve`。

- `constructor(v1=new Vector2(), v2=new Vector2())` [源码:11500](../../eyes/src/vendor/three/core.js#L11500)：当前操作：写入 isLineCurve、type、v1、v2；返回 无显式返回。
- `getPoint(e, t=new Vector2())` [源码:11503](../../eyes/src/vendor/three/core.js#L11503)：按参数 t 计算曲线位置，通常复用可选目标向量
- `getPointAt(u, optionalTarget)` [源码:11507](../../eyes/src/vendor/three/core.js#L11507)：源码方法 getPointAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getTangent(t, optionalTarget=new Vector2())` [源码:11510](../../eyes/src/vendor/three/core.js#L11510)：源码方法 getTangent；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getTangentAt(u, optionalTarget)` [源码:11513](../../eyes/src/vendor/three/core.js#L11513)：源码方法 getTangentAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `copy(source)` [源码:11516](../../eyes/src/vendor/three/core.js#L11516)：复制自身状态；需注意资源引用与深复制边界
- `toJSON()` [源码:11519](../../eyes/src/vendor/three/core.js#L11519)：序列化资源和引用；共享资源通过元数据缓存去重
- `fromJSON(json)` [源码:11523](../../eyes/src/vendor/three/core.js#L11523)：源码方法 fromJSON；作用以类职责与源码实现为准，未猜测压缩参数含义

### `LineCurve3`

A curve representing a 3D line segment. @augments Curve。父类 `Curve`。

- `constructor(v1=new Vector3(), v2=new Vector3())` [源码:11533](../../eyes/src/vendor/three/core.js#L11533)：当前操作：写入 isLineCurve3、type、v1、v2；返回 无显式返回。
- `getPoint(e, t=new Vector3())` [源码:11536](../../eyes/src/vendor/three/core.js#L11536)：按参数 t 计算曲线位置，通常复用可选目标向量
- `getPointAt(u, optionalTarget)` [源码:11540](../../eyes/src/vendor/three/core.js#L11540)：源码方法 getPointAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getTangent(t, optionalTarget=new Vector3())` [源码:11543](../../eyes/src/vendor/three/core.js#L11543)：源码方法 getTangent；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getTangentAt(u, optionalTarget)` [源码:11546](../../eyes/src/vendor/three/core.js#L11546)：源码方法 getTangentAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `copy(source)` [源码:11549](../../eyes/src/vendor/three/core.js#L11549)：复制自身状态；需注意资源引用与深复制边界
- `toJSON()` [源码:11552](../../eyes/src/vendor/three/core.js#L11552)：序列化资源和引用；共享资源通过元数据缓存去重
- `fromJSON(json)` [源码:11556](../../eyes/src/vendor/three/core.js#L11556)：源码方法 fromJSON；作用以类职责与源码实现为准，未猜测压缩参数含义

### `QuadraticBezierCurve`

A curve representing a 2D Quadratic Bezier curve. ˋˋˋjs const curve = new THREE.QuadraticBezierCurve( new THREE.Vector2( - 10, 0 ), new THREE.Vector2( 20, 15 ), new THREE.Vector2( 10, 0 ) ) const points = curve.getPoints( 50 ); const geometry = new THREE.BufferGeometry().setFromPoints( points ); const material = new THREE.LineBasicMaterial( { color: 0xff0000 } ); // Create the final object to add to the scene const curveObject = new THREE.Line( geometry, material ); ˋˋˋ @augments Curve。父类 `Curve`。

- `constructor(v0=new Vector2(), v1=new Vector2(), v2=new Vector2())` [源码:11582](../../eyes/src/vendor/three/core.js#L11582)：当前操作：写入 isQuadraticBezierCurve、type、v0、v1、v2；返回 无显式返回。
- `getPoint(t, optionalTarget=new Vector2())` [源码:11592](../../eyes/src/vendor/three/core.js#L11592)：Returns a point on the curve. @param {number} t - A interpolation factor representing a position on the curve. Must be in the range ˋ[0,1]ˋ. @param {Vector2} [optionalTarget] - The optional target vector the result is written to. @return {Vector2} The position on the curve.
- `copy(source)` [源码:11599](../../eyes/src/vendor/three/core.js#L11599)：复制自身状态；需注意资源引用与深复制边界
- `toJSON()` [源码:11602](../../eyes/src/vendor/three/core.js#L11602)：序列化资源和引用；共享资源通过元数据缓存去重
- `fromJSON(json)` [源码:11606](../../eyes/src/vendor/three/core.js#L11606)：源码方法 fromJSON；作用以类职责与源码实现为准，未猜测压缩参数含义

### `QuadraticBezierCurve3`

A curve representing a 3D Quadratic Bezier curve. @augments Curve。父类 `Curve`。

- `constructor(v0=new Vector3(), v1=new Vector3(), v2=new Vector3())` [源码:11616](../../eyes/src/vendor/three/core.js#L11616)：当前操作：写入 isQuadraticBezierCurve3、type、v0、v1、v2；返回 无显式返回。
- `getPoint(t, optionalTarget=new Vector3())` [源码:11626](../../eyes/src/vendor/three/core.js#L11626)：Returns a point on the curve. @param {number} t - A interpolation factor representing a position on the curve. Must be in the range ˋ[0,1]ˋ. @param {Vector3} [optionalTarget] - The optional target vector the result is written to. @return {Vector3} The position on the curve.
- `copy(source)` [源码:11633](../../eyes/src/vendor/three/core.js#L11633)：复制自身状态；需注意资源引用与深复制边界
- `toJSON()` [源码:11636](../../eyes/src/vendor/three/core.js#L11636)：序列化资源和引用；共享资源通过元数据缓存去重
- `fromJSON(json)` [源码:11640](../../eyes/src/vendor/three/core.js#L11640)：源码方法 fromJSON；作用以类职责与源码实现为准，未猜测压缩参数含义

### `SplineCurve`

A curve representing a 2D spline curve. ˋˋˋjs // Create a sine-like wave const curve = new THREE.SplineCurve( [ new THREE.Vector2( -10, 0 ), new THREE.Vector2( -5, 5 ), new THREE.Vector2( 0, 0 ), new THREE.Vector2( 5, -5 ), new THREE.Vector2( 10, 0 ) ] ); const points = curve.getPoints( 50 ); const geometry = new THREE.BufferGeometry().setFromPoints( points ); const material = new THREE.LineBasicMaterial( { color: 0xff0000 } ); // Create the final object to add to the scene const splineObject = new THREE.Line( geometry, material ); ˋˋˋ @augments Curve。父类 `Curve`。

- `constructor(points=[])` [源码:11669](../../eyes/src/vendor/three/core.js#L11669)：当前操作：写入 isSplineCurve、points、type；返回 无显式返回。
- `getPoint(e, t=new Vector2())` [源码:11672](../../eyes/src/vendor/three/core.js#L11672)：按参数 t 计算曲线位置，通常复用可选目标向量
- `copy(source)` [源码:11684](../../eyes/src/vendor/three/core.js#L11684)：复制自身状态；需注意资源引用与深复制边界
- `toJSON()` [源码:11692](../../eyes/src/vendor/three/core.js#L11692)：序列化资源和引用；共享资源通过元数据缓存去重
- `fromJSON(json)` [源码:11701](../../eyes/src/vendor/three/core.js#L11701)：源码方法 fromJSON；作用以类职责与源码实现为准，未猜测压缩参数含义

### `CurvePath`

A base class extending {@link Curve}. ˋCurvePathˋ is simply an array of connected curves, but retains the API of a curve. @augments Curve。父类 `Curve`。

- `constructor()` [源码:11730](../../eyes/src/vendor/three/core.js#L11730)：当前操作：写入 autoClose、curves、type；返回 无显式返回。
- `add(curve)` [源码:11738](../../eyes/src/vendor/three/core.js#L11738)：Adds a curve to this curve path. @param {Curve} curve - The curve to add.
- `closePath()` [源码:11741](../../eyes/src/vendor/three/core.js#L11741)：源码方法 closePath；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getPoint(e, t)` [源码:11750](../../eyes/src/vendor/three/core.js#L11750)：按参数 t 计算曲线位置，通常复用可选目标向量
- `getLength()` [源码:11766](../../eyes/src/vendor/three/core.js#L11766)：源码方法 getLength；作用以类职责与源码实现为准，未猜测压缩参数含义
- `updateArcLengths()` [源码:11770](../../eyes/src/vendor/three/core.js#L11770)：源码方法 updateArcLengths；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getCurveLengths()` [源码:11778](../../eyes/src/vendor/three/core.js#L11778)：Returns list of cumulative curve lengths of the defined curves. @return {Array<number>} The curve lengths.
- `getSpacedPoints(e=40)` [源码:11785](../../eyes/src/vendor/three/core.js#L11785)：源码方法 getSpacedPoints；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getPoints(e=12)` [源码:11790](../../eyes/src/vendor/three/core.js#L11790)：源码方法 getPoints；作用以类职责与源码实现为准，未猜测压缩参数含义
- `copy(source)` [源码:11804](../../eyes/src/vendor/three/core.js#L11804)：复制自身状态；需注意资源引用与深复制边界
- `toJSON()` [源码:11812](../../eyes/src/vendor/three/core.js#L11812)：序列化资源和引用；共享资源通过元数据缓存去重
- `fromJSON(json)` [源码:11821](../../eyes/src/vendor/three/core.js#L11821)：源码方法 fromJSON；作用以类职责与源码实现为准，未猜测压缩参数含义

### `Path`

A 2D path representation. The class provides methods for creating paths and contours of 2D shapes similar to the 2D Canvas API. ˋˋˋjs const path = new THREE.Path(); path.lineTo( 0, 0.8 ); path.quadraticCurveTo( 0, 1, 0.2, 1 ); path.lineTo( 1, 1 ); const points = path.getPoints(); const geometry = new THREE.BufferGeometry().setFromPoints( points ); const material = new THREE.LineBasicMaterial( { color: 0xffffff } ); const line = new THREE.Line( geometry, material ); scene.add( line ); ˋˋˋ @augments CurvePath。父类 `CurvePath`。

- `constructor(e)` [源码:11853](../../eyes/src/vendor/three/core.js#L11853)：当前操作：写入 currentPoint、type；返回 无显式返回。
- `setFromPoints(e)` [源码:11856](../../eyes/src/vendor/three/core.js#L11856)：源码方法 setFromPoints；作用以类职责与源码实现为准，未猜测压缩参数含义
- `moveTo(x, y)` [源码:11868](../../eyes/src/vendor/three/core.js#L11868)：Moves {@link Path#currentPoint} to the given point. @param {number} x - The x coordinate. @param {number} y - The y coordinate. @return {Path} A reference to this path.
- `lineTo(x, y)` [源码:11879](../../eyes/src/vendor/three/core.js#L11879)：Adds an instance of {@link LineCurve} to the path by connecting the current point with the given one. @param {number} x - The x coordinate of the end point. @param {number} y - The y coordinate of the end point. @return {Path} A reference to this path.
- `quadraticCurveTo(aCPx, aCPy, aX, aY)` [源码:11893](../../eyes/src/vendor/three/core.js#L11893)：Adds an instance of {@link QuadraticBezierCurve} to the path by connecting the current point with the given one. @param {number} aCPx - The x coordinate of the control point. @param {number} aCPy - The y coordinate of the control point. @param {number} aX - The x coordinate of the end point. @param {number} aY - The y coordinate of the end point. @return {Path} A reference to this path.
- `bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY)` [源码:11909](../../eyes/src/vendor/three/core.js#L11909)：Adds an instance of {@link CubicBezierCurve} to the path by connecting the current point with the given one. @param {number} aCP1x - The x coordinate of the first control point. @param {number} aCP1y - The y coordinate of the first control point. @param {number} aCP2x - The x coordinate of the second control point. @param {number} aCP2y - The y coordinate of the second control point. @param {number} aX - The x coordinate of the end point. @param {number} aY - The y coordinate of the end point. @return {Path} A reference to this path.
- `splineThru(pts)` [源码:11920](../../eyes/src/vendor/three/core.js#L11920)：Adds an instance of {@link SplineCurve} to the path by connecting the current point with the given list of points. @param {Array<Vector2>} pts - An array of points in 2D space. @return {Path} A reference to this path.
- `arc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise)` [源码:11937](../../eyes/src/vendor/three/core.js#L11937)：Adds an arc as an instance of {@link EllipseCurve} to the path, positioned relative to the current point. @param {number} [aX=0] - The x coordinate of the center of the arc offsetted from the previous curve. @param {number} [aY=0] - The y coordinate of the center of the arc offsetted from the previous curve. @param {number} [aRadius=1] - The radius of the arc. @param {number} [aStartAngle=0] - The start angle in radians. @param {number} [aEndAngle=Math.PI*2] - The end angle in radians. @param {boolean} [aClockwise=false] - Whether to sweep the arc clockwise or not. @return {Path} A reference to this path.
- `absarc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise)` [源码:11953](../../eyes/src/vendor/three/core.js#L11953)：Adds an absolutely positioned arc as an instance of {@link EllipseCurve} to the path. @param {number} [aX=0] - The x coordinate of the center of the arc. @param {number} [aY=0] - The y coordinate of the center of the arc. @param {number} [aRadius=1] - The radius of the arc. @param {number} [aStartAngle=0] - The start angle in radians. @param {number} [aEndAngle=Math.PI*2] - The end angle in radians. @param {boolean} [aClockwise=false] - Whether to sweep the arc clockwise or not. @return {Path} A reference to this path.
- `ellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation)` [源码:11970](../../eyes/src/vendor/three/core.js#L11970)：Adds an ellipse as an instance of {@link EllipseCurve} to the path, positioned relative to the current point @param {number} [aX=0] - The x coordinate of the center of the ellipse offsetted from the previous curve. @param {number} [aY=0] - The y coordinate of the center of the ellipse offsetted from the previous curve. @param {number} [xRadius=1] - The radius of the ellipse in the x axis. @param {number} [yRadius=1] - The radius of the ellipse in the y axis. @param {number} [aStartAngle=0] - The start angle in radians. @param {number} [aEndAngle=Math.PI*2] - The end angle in radians. @param {boolean} [aClockwise=false] - Whether to sweep the ellipse clockwise or not. @param {number} [aRotation=0] - The rotation angle of the ellipse in radians, counterclockwise from the positive X axis. @return {Path} A reference to this path.
- `absellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation)` [源码:11988](../../eyes/src/vendor/three/core.js#L11988)：Adds an absolutely positioned ellipse as an instance of {@link EllipseCurve} to the path. @param {number} [aX=0] - The x coordinate of the absolute center of the ellipse. @param {number} [aY=0] - The y coordinate of the absolute center of the ellipse. @param {number} [xRadius=1] - The radius of the ellipse in the x axis. @param {number} [yRadius=1] - The radius of the ellipse in the y axis. @param {number} [aStartAngle=0] - The start angle in radians. @param {number} [aEndAngle=Math.PI*2] - The end angle in radians. @param {boolean} [aClockwise=false] - Whether to sweep the ellipse clockwise or not. @param {number} [aRotation=0] - The rotation angle of the ellipse in radians, counterclockwise from the positive X axis. @return {Path} A reference to this path.
- `copy(source)` [源码:11998](../../eyes/src/vendor/three/core.js#L11998)：复制自身状态；需注意资源引用与深复制边界
- `toJSON()` [源码:12001](../../eyes/src/vendor/three/core.js#L12001)：序列化资源和引用；共享资源通过元数据缓存去重
- `fromJSON(json)` [源码:12005](../../eyes/src/vendor/three/core.js#L12005)：源码方法 fromJSON；作用以类职责与源码实现为准，未猜测压缩参数含义

### `Shape`

Defines an arbitrary 2d shape plane using paths with optional holes. It can be used with {@link ExtrudeGeometry}, {@link ShapeGeometry}, to get points, or to get triangulated faces. ˋˋˋjs const heartShape = new THREE.Shape(); heartShape.moveTo( 25, 25 ); heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 ); heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 ); heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 ); heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 ); heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 ); heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 ); const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 }; const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings ); const mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial() ); ˋˋˋ @augments Path。父类 `Path`。

- `constructor(e)` [源码:12041](../../eyes/src/vendor/three/core.js#L12041)：当前操作：写入 holes、type、uuid；返回 无显式返回。
- `getPointsHoles(e)` [源码:12044](../../eyes/src/vendor/three/core.js#L12044)：源码方法 getPointsHoles；作用以类职责与源码实现为准，未猜测压缩参数含义
- `extractPoints(divisions)` [源码:12058](../../eyes/src/vendor/three/core.js#L12058)：get points of shape and holes (keypoints based on segments parameter) Returns an object that holds contour data for the shape and its holes as arrays of 2D points. @param {number} divisions - The fineness of the result. @return {{shape:Array<Vector2>,holes:Array<Array<Vector2>>}} An object with contour data.
- `copy(source)` [源码:12064](../../eyes/src/vendor/three/core.js#L12064)：复制自身状态；需注意资源引用与深复制边界
- `toJSON()` [源码:12072](../../eyes/src/vendor/three/core.js#L12072)：序列化资源和引用；共享资源通过元数据缓存去重
- `fromJSON(json)` [源码:12081](../../eyes/src/vendor/three/core.js#L12081)：源码方法 fromJSON；作用以类职责与源码实现为准，未猜测压缩参数含义

### `Earcut`

An implementation of the earcut polygon triangulation algorithm. The code is a port of [mapbox/earcut](https://github.com/mapbox/earcut). @see https://github.com/mapbox/earcut。父类 `无`。

- `static triangulate(data, holeIndices, dim=2)` [源码:12404](../../eyes/src/vendor/three/core.js#L12404)：Triangulates the given shape definition by returning an array of triangles. @param {Array<number>} data - An array with 2D points. @param {Array<number>} holeIndices - An array with indices defining holes. @param {number} [dim=2] - The number of coordinates per vertex in the input array. @return {Array<number>} An array representing the triangulated faces. Each face is defined by three consecutive numbers representing vertex indices.

### `ShapeUtils`

A class containing utility functions for shapes. @hideconstructor。父类 `无`。

- `static area(e)` [源码:12414](../../eyes/src/vendor/three/core.js#L12414)：源码方法 area；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static isClockWise(pts)` [源码:12426](../../eyes/src/vendor/three/core.js#L12426)：Returns ˋtrueˋ if the given contour uses a clockwise winding order. @param {Array<Vector2>} pts - An array of 2D points defining a polygon. @return {boolean} Whether the given contour uses a clockwise winding order or not.
- `static triangulateShape(e, t)` [源码:12429](../../eyes/src/vendor/three/core.js#L12429)：源码方法 triangulateShape；作用以类职责与源码实现为准，未猜测压缩参数含义

### `ExtrudeGeometry`

Creates extruded geometry from a path shape. ˋˋˋjs const length = 12, width = 8; const shape = new THREE.Shape(); shape.moveTo( 0,0 ); shape.lineTo( 0, width ); shape.lineTo( length, width ); shape.lineTo( length, 0 ); shape.lineTo( 0, 0 ); const geometry = new THREE.ExtrudeGeometry( shape ); const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); const mesh = new THREE.Mesh( geometry, material ) ; scene.add( mesh ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#ExtrudeGeometry。父类 `BufferGeometry`。

- `constructor(e=new Shape([new Vector2(.5,.5),new Vector2(-.5,.5),new Vector2(-.5,-.5),new Vector2(.5,-.5)]), t={})` [源码:12472](../../eyes/src/vendor/three/core.js#L12472)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:12700](../../eyes/src/vendor/three/core.js#L12700)：复制自身状态；需注意资源引用与深复制边界
- `toJSON()` [源码:12703](../../eyes/src/vendor/three/core.js#L12703)：序列化资源和引用；共享资源通过元数据缓存去重
- `static fromJSON(e, t)` [源码:12714](../../eyes/src/vendor/three/core.js#L12714)：源码方法 fromJSON；作用以类职责与源码实现为准，未猜测压缩参数含义

### `IcosahedronGeometry`

A geometry class for representing an icosahedron. ˋˋˋjs const geometry = new THREE.IcosahedronGeometry(); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const icosahedron = new THREE.Mesh( geometry, material ); scene.add( icosahedron ); ˋˋˋ @augments PolyhedronGeometry @demo scenes/geometry-browser.html#IcosahedronGeometry。父类 `PolyhedronGeometry`。

- `constructor(e=1, t=0)` [源码:12764](../../eyes/src/vendor/three/core.js#L12764)：当前操作：写入 parameters、type；返回 无显式返回。
- `static fromJSON(data)` [源码:12778](../../eyes/src/vendor/three/core.js#L12778)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {IcosahedronGeometry} A new instance.

### `LatheGeometry`

Creates meshes with axial symmetry like vases. The lathe rotates around the Y axis. ˋˋˋjs const points = []; for ( let i = 0; i < 10; i ++ ) { points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) ); } const geometry = new THREE.LatheGeometry( points ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const lathe = new THREE.Mesh( geometry, material ); scene.add( lathe ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#LatheGeometry。父类 `BufferGeometry`。

- `constructor(e=[new Vector2(0,-.5),new Vector2(.5,0),new Vector2(0,.5)], t=12, n=0, r=2*Math.PI)` [源码:12800](../../eyes/src/vendor/three/core.js#L12800)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:12852](../../eyes/src/vendor/three/core.js#L12852)：复制自身状态；需注意资源引用与深复制边界
- `static fromJSON(data)` [源码:12862](../../eyes/src/vendor/three/core.js#L12862)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {LatheGeometry} A new instance.

### `OctahedronGeometry`

A geometry class for representing an octahedron. ˋˋˋjs const geometry = new THREE.OctahedronGeometry(); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const octahedron = new THREE.Mesh( geometry, material ); scene.add( octahedron ); ˋˋˋ @augments PolyhedronGeometry @demo scenes/geometry-browser.html#OctahedronGeometry。父类 `PolyhedronGeometry`。

- `constructor(e=1, t=0)` [源码:12880](../../eyes/src/vendor/three/core.js#L12880)：当前操作：写入 parameters、type；返回 无显式返回。
- `static fromJSON(data)` [源码:12893](../../eyes/src/vendor/three/core.js#L12893)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {OctahedronGeometry} A new instance.

### `PlaneGeometry`

A geometry class for representing a plane. ˋˋˋjs const geometry = new THREE.PlaneGeometry( 1, 1 ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } ); const plane = new THREE.Mesh( geometry, material ); scene.add( plane ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#PlaneGeometry。父类 `BufferGeometry`。

- `constructor(e=1, t=1, n=1, r=1)` [源码:12911](../../eyes/src/vendor/three/core.js#L12911)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:12946](../../eyes/src/vendor/three/core.js#L12946)：复制自身状态；需注意资源引用与深复制边界
- `static fromJSON(data)` [源码:12956](../../eyes/src/vendor/three/core.js#L12956)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {PlaneGeometry} A new instance.

### `RingGeometry`

A class for generating a two-dimensional ring geometry. ˋˋˋjs const geometry = new THREE.RingGeometry( 1, 5, 32 ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } ); const mesh = new THREE.Mesh( geometry, material ); scene.add( mesh ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#RingGeometry。父类 `BufferGeometry`。

- `constructor(e=.5, t=1, n=32, r=1, i=0, a=2*Math.PI)` [源码:12974](../../eyes/src/vendor/three/core.js#L12974)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:13011](../../eyes/src/vendor/three/core.js#L13011)：复制自身状态；需注意资源引用与深复制边界
- `static fromJSON(data)` [源码:13021](../../eyes/src/vendor/three/core.js#L13021)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {RingGeometry} A new instance.

### `ShapeGeometry`

Creates an one-sided polygonal geometry from one or more path shapes. ˋˋˋjs const arcShape = new THREE.Shape() .moveTo( 5, 1 ) .absarc( 1, 1, 4, 0, Math.PI * 2, false ); const geometry = new THREE.ShapeGeometry( arcShape ); const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.DoubleSide } ); const mesh = new THREE.Mesh( geometry, material ) ; scene.add( mesh ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#ShapeGeometry。父类 `BufferGeometry`。

- `constructor(e=new Shape([new Vector2(0,.5),new Vector2(-.5,-.5),new Vector2(.5,-.5)]), t=12)` [源码:13043](../../eyes/src/vendor/three/core.js#L13043)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:13084](../../eyes/src/vendor/three/core.js#L13084)：复制自身状态；需注意资源引用与深复制边界
- `toJSON()` [源码:13087](../../eyes/src/vendor/three/core.js#L13087)：序列化资源和引用；共享资源通过元数据缓存去重
- `static fromJSON(data, shapes)` [源码:13105](../../eyes/src/vendor/three/core.js#L13105)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @param {Array<Shape>} shapes - An array of shapes. @return {ShapeGeometry} A new instance.

### `SphereGeometry`

A class for generating a sphere geometry. ˋˋˋjs const geometry = new THREE.SphereGeometry( 15, 32, 16 ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const sphere = new THREE.Mesh( geometry, material ); scene.add( sphere ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#SphereGeometry。父类 `BufferGeometry`。

- `constructor(e=1, t=32, n=16, r=0, i=2*Math.PI, a=0, s=Math.PI)` [源码:13128](../../eyes/src/vendor/three/core.js#L13128)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:13171](../../eyes/src/vendor/three/core.js#L13171)：复制自身状态；需注意资源引用与深复制边界
- `static fromJSON(data)` [源码:13181](../../eyes/src/vendor/three/core.js#L13181)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {SphereGeometry} A new instance.

### `TetrahedronGeometry`

A geometry class for representing an tetrahedron. ˋˋˋjs const geometry = new THREE.TetrahedronGeometry(); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const tetrahedron = new THREE.Mesh( geometry, material ); scene.add( tetrahedron ); ˋˋˋ @augments PolyhedronGeometry @demo scenes/geometry-browser.html#TetrahedronGeometry。父类 `PolyhedronGeometry`。

- `constructor(e=1, t=0)` [源码:13199](../../eyes/src/vendor/three/core.js#L13199)：当前操作：写入 parameters、type；返回 无显式返回。
- `static fromJSON(data)` [源码:13212](../../eyes/src/vendor/three/core.js#L13212)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {TetrahedronGeometry} A new instance.

### `TorusGeometry`

A geometry class for representing an torus. ˋˋˋjs const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const torus = new THREE.Mesh( geometry, material ); scene.add( torus ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#TorusGeometry。父类 `BufferGeometry`。

- `constructor(e=1, t=.4, n=12, r=48, i=2*Math.PI, a=0, s=2*Math.PI)` [源码:13230](../../eyes/src/vendor/three/core.js#L13230)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:13263](../../eyes/src/vendor/three/core.js#L13263)：复制自身状态；需注意资源引用与深复制边界
- `static fromJSON(data)` [源码:13273](../../eyes/src/vendor/three/core.js#L13273)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {TorusGeometry} A new instance.

### `TorusKnotGeometry`

Creates a torus knot, the particular shape of which is defined by a pair of coprime integers, p and q. If p and q are not coprime, the result will be a torus link. ˋˋˋjs const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const torusKnot = new THREE.Mesh( geometry, material ); scene.add( torusKnot ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#TorusKnotGeometry。父类 `BufferGeometry`。

- `constructor(e=1, t=.4, n=64, r=8, i=2, a=3)` [源码:13293](../../eyes/src/vendor/three/core.js#L13293)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:13339](../../eyes/src/vendor/three/core.js#L13339)：复制自身状态；需注意资源引用与深复制边界
- `static fromJSON(data)` [源码:13349](../../eyes/src/vendor/three/core.js#L13349)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {TorusKnotGeometry} A new instance.

### `TubeGeometry`

Creates a tube that extrudes along a 3D curve. ˋˋˋjs class CustomSinCurve extends THREE.Curve { getPoint( t, optionalTarget = new THREE.Vector3() ) { const tx = t * 3 - 1.5; const ty = Math.sin( 2 * Math.PI * t ); const tz = 0; return optionalTarget.set( tx, ty, tz ); } } const path = new CustomSinCurve( 10 ); const geometry = new THREE.TubeGeometry( path, 20, 2, 8, false ); const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); const mesh = new THREE.Mesh( geometry, material ); scene.add( mesh ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#TubeGeometry。父类 `BufferGeometry`。

- `constructor(e=new QuadraticBezierCurve3(new Vector3(-1,-1,0),new Vector3(-1,1,0),new Vector3(1,1,0)), t=64, n=1, r=8, i=!1)` [源码:13381](../../eyes/src/vendor/three/core.js#L13381)：当前操作：写入 binormals、normals、parameters、tangents、type；返回 无显式返回。
- `copy(source)` [源码:13425](../../eyes/src/vendor/three/core.js#L13425)：复制自身状态；需注意资源引用与深复制边界
- `toJSON()` [源码:13428](../../eyes/src/vendor/three/core.js#L13428)：序列化资源和引用；共享资源通过元数据缓存去重
- `static fromJSON(data)` [源码:13439](../../eyes/src/vendor/three/core.js#L13439)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {TubeGeometry} A new instance.

### `WireframeGeometry`

Can be used as a helper object to visualize a geometry as a wireframe. ˋˋˋjs const geometry = new THREE.SphereGeometry(); const wireframe = new THREE.WireframeGeometry( geometry ); const line = new THREE.LineSegments( wireframe ); line.material.depthWrite = false; line.material.opacity = 0.25; line.material.transparent = true; scene.add( line ); ˋˋˋ Note: It is not yet possible to serialize/deserialize instances of this class. @augments BufferGeometry。父类 `BufferGeometry`。

- `constructor(e=null)` [源码:13464](../../eyes/src/vendor/three/core.js#L13464)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:13501](../../eyes/src/vendor/three/core.js#L13501)：复制自身状态；需注意资源引用与深复制边界

### `ShadowMaterial`

This material can receive shadows, but otherwise is completely transparent. ˋˋˋjs const geometry = new THREE.PlaneGeometry( 2000, 2000 ); geometry.rotateX( - Math.PI / 2 ); const material = new THREE.ShadowMaterial(); material.opacity = 0.2; const plane = new THREE.Mesh( geometry, material ); plane.position.y = -200; plane.receiveShadow = true; scene.add( plane ); ˋˋˋ @augments Material。父类 `Material`。

- `constructor(e)` [源码:13553](../../eyes/src/vendor/three/core.js#L13553)：当前操作：写入 color、fog、isShadowMaterial、transparent、type；返回 无显式返回。
- `copy(source)` [源码:13556](../../eyes/src/vendor/three/core.js#L13556)：复制自身状态；需注意资源引用与深复制边界

### `ShaderMaterial`

用户 GLSL shader 和自动内置声明材质；其参数由渲染器选择 shader 特性并上传 uniform。父类 `Material`。

- `constructor(e)` [源码:13597](../../eyes/src/vendor/three/core.js#L13597)：当前操作：写入 clipping、defaultAttributeValues、defines、extensions、fog、forceSinglePass、fragmentShader、glslVersion、index0AttributeName、isShaderMaterial、lights、linewidth、type、uniforms、uniformsGroups、uniformsNeedUpdate、vertexShader、wireframe、wireframeLinewidth；返回 无显式返回。
- `copy(e)` [源码:13607](../../eyes/src/vendor/three/core.js#L13607)：复制自身状态；需注意资源引用与深复制边界
- `toJSON(e)` [源码:13614](../../eyes/src/vendor/three/core.js#L13614)：序列化资源和引用；共享资源通过元数据缓存去重
- `fromJSON(e, t)` [源码:13649](../../eyes/src/vendor/three/core.js#L13649)：源码方法 fromJSON；作用以类职责与源码实现为准，未猜测压缩参数含义

### `RawShaderMaterial`

由用户完全控制 shader 声明材质；其参数由渲染器选择 shader 特性并上传 uniform。父类 `ShaderMaterial`。

- `constructor(e)` [源码:13683](../../eyes/src/vendor/three/core.js#L13683)：当前操作：写入 isRawShaderMaterial、type；返回 无显式返回。

### `MeshStandardMaterial`

金属度/粗糙度 PBR材质；其参数由渲染器选择 shader 特性并上传 uniform。父类 `Material`。

- `constructor(e)` [源码:13688](../../eyes/src/vendor/three/core.js#L13688)：当前操作：写入 alphaMap、aoMap、aoMapIntensity、bumpMap、bumpScale、color、defines、displacementBias、displacementMap、displacementScale、emissive、emissiveIntensity、emissiveMap、envMap、envMapIntensity、envMapRotation、flatShading、fog、isMeshStandardMaterial、lightMap、lightMapIntensity、map、metalness、metalnessMap、normalMap、normalMapType、normalScale、roughness、roughnessMap、type、wireframe、wireframeLinecap、wireframeLinejoin、wireframeLinewidth；返回 无显式返回。
- `copy(e)` [源码:13693](../../eyes/src/vendor/three/core.js#L13693)：复制自身状态；需注意资源引用与深复制边界

### `MeshPhysicalMaterial`

An extension of the {@link MeshStandardMaterial}, providing more advanced physically-based rendering properties: - Anisotropy: Ability to represent the anisotropic property of materials as observable with brushed metals. - Clearcoat: Some materials — like car paints, carbon fiber, and wet surfaces — require a clear, reflective layer on top of another layer that may be irregular or rough. Clearcoat approximates this effect, without the need for a separate transparent surface. - Iridescence: Allows to render the effect where hue varies depending on the viewing angle and illumination angle. This can be seen on soap bubbles, oil films, or on the wings of many insects. - Physically-based transparency: One limitation of {@link Material#opacity} is that highly transparent materials are less reflective. Physically-based transmission provides a more realistic option for thin, transparent surfaces like glass. - Advanced reflectivity: More flexible reflectivity for non-metallic materials. - Sheen: Can be used for representing cloth and fabric materials. As a result of these complex shading features, ˋMeshPhysicalMaterialˋ has a higher performance cost, per pixel, than other three.js materials. Most effects are disabled by default, and add cost as they are enabled. For best results, always specify an environment map when using this material. @augments MeshStandardMaterial @demo scenes/material-browser.html#MeshPhysicalMaterial。父类 `MeshStandardMaterial`。

- `constructor(e)` [源码:13726](../../eyes/src/vendor/three/core.js#L13726)：当前操作：写入 _anisotropy、_clearcoat、_dispersion、_iridescence、_sheen、_transmission、anisotropyMap、anisotropyRotation、attenuationColor、attenuationDistance、clearcoatMap、clearcoatNormalMap、clearcoatNormalScale、clearcoatRoughness、clearcoatRoughnessMap、defines、ior、iridescenceIOR、iridescenceMap、iridescenceThicknessMap、iridescenceThicknessRange、isMeshPhysicalMaterial、sheenColor、sheenColorMap、sheenRoughness、sheenRoughnessMap、specularColor、specularColorMap、specularIntensity、specularIntensityMap、thickness、thicknessMap、transmissionMap、type；返回 无显式返回。
- `get anisotropy()` [源码:13739](../../eyes/src/vendor/three/core.js#L13739)：只读返回 this._anisotropy；此 getter 不执行对应 setter 的写入或更新通知
- `set anisotropy(anisotropy)` [源码:13742](../../eyes/src/vendor/three/core.js#L13742)：写入 _anisotropy；当正值启用状态切换时递增 version 使 shader 特性失效
- `get clearcoat()` [源码:13745](../../eyes/src/vendor/three/core.js#L13745)：只读返回 this._clearcoat；此 getter 不执行对应 setter 的写入或更新通知
- `set clearcoat(clearcoat)` [源码:13748](../../eyes/src/vendor/three/core.js#L13748)：写入 _clearcoat；当正值启用状态切换时递增 version 使 shader 特性失效
- `get iridescence()` [源码:13751](../../eyes/src/vendor/three/core.js#L13751)：只读返回 this._iridescence；此 getter 不执行对应 setter 的写入或更新通知
- `set iridescence(iridescence)` [源码:13754](../../eyes/src/vendor/three/core.js#L13754)：写入 _iridescence；当正值启用状态切换时递增 version 使 shader 特性失效
- `get dispersion()` [源码:13757](../../eyes/src/vendor/three/core.js#L13757)：只读返回 this._dispersion；此 getter 不执行对应 setter 的写入或更新通知
- `set dispersion(dispersion)` [源码:13760](../../eyes/src/vendor/three/core.js#L13760)：写入 _dispersion；当正值启用状态切换时递增 version 使 shader 特性失效
- `get sheen()` [源码:13763](../../eyes/src/vendor/three/core.js#L13763)：只读返回 this._sheen；此 getter 不执行对应 setter 的写入或更新通知
- `set sheen(sheen)` [源码:13766](../../eyes/src/vendor/three/core.js#L13766)：写入 _sheen；当正值启用状态切换时递增 version 使 shader 特性失效
- `get transmission()` [源码:13769](../../eyes/src/vendor/three/core.js#L13769)：只读返回 this._transmission；此 getter 不执行对应 setter 的写入或更新通知
- `set transmission(transmission)` [源码:13772](../../eyes/src/vendor/three/core.js#L13772)：写入 _transmission；当正值启用状态切换时递增 version 使 shader 特性失效
- `copy(e)` [源码:13775](../../eyes/src/vendor/three/core.js#L13775)：复制自身状态；需注意资源引用与深复制边界

### `MeshPhongMaterial`

A material for shiny surfaces with specular highlights. The material uses a non-physically based [Blinn-Phong](https://en.wikipedia.org/wiki/Blinn-Phong_shading_model) model for calculating reflectance. Unlike the Lambertian model used in the {@link MeshLambertMaterial} this can simulate shiny surfaces with specular highlights (such as varnished wood). ˋMeshPhongMaterialˋ uses per-fragment shading. Performance will generally be greater when using this material over the {@link MeshStandardMaterial} or {@link MeshPhysicalMaterial}, at the cost of some graphical accuracy. @augments Material @demo scenes/material-browser.html#MeshPhongMaterial。父类 `Material`。

- `constructor(e)` [源码:13798](../../eyes/src/vendor/three/core.js#L13798)：当前操作：写入 alphaMap、aoMap、aoMapIntensity、bumpMap、bumpScale、color、combine、displacementBias、displacementMap、displacementScale、emissive、emissiveIntensity、emissiveMap、envMap、envMapIntensity、envMapRotation、flatShading、fog、isMeshPhongMaterial、lightMap、lightMapIntensity、map、normalMap、normalMapType、normalScale、reflectivity、refractionRatio、shininess、specular、specularMap、type、wireframe、wireframeLinecap、wireframeLinejoin、wireframeLinewidth；返回 无显式返回。
- `copy(source)` [源码:13801](../../eyes/src/vendor/three/core.js#L13801)：复制自身状态；需注意资源引用与深复制边界

### `MeshToonMaterial`

A material implementing toon shading. @augments Material @demo scenes/material-browser.html#MeshToonMaterial。父类 `Material`。

- `constructor(e)` [源码:13812](../../eyes/src/vendor/three/core.js#L13812)：当前操作：写入 alphaMap、aoMap、aoMapIntensity、bumpMap、bumpScale、color、defines、displacementBias、displacementMap、displacementScale、emissive、emissiveIntensity、emissiveMap、fog、gradientMap、isMeshToonMaterial、lightMap、lightMapIntensity、map、normalMap、normalMapType、normalScale、type、wireframe、wireframeLinecap、wireframeLinejoin、wireframeLinewidth；返回 无显式返回。
- `copy(source)` [源码:13817](../../eyes/src/vendor/three/core.js#L13817)：复制自身状态；需注意资源引用与深复制边界

### `MeshNormalMaterial`

A material that maps the normal vectors to RGB colors. @augments Material @demo scenes/material-browser.html#MeshNormalMaterial。父类 `Material`。

- `constructor(e)` [源码:13828](../../eyes/src/vendor/three/core.js#L13828)：当前操作：写入 bumpMap、bumpScale、displacementBias、displacementMap、displacementScale、flatShading、isMeshNormalMaterial、normalMap、normalMapType、normalScale、type、wireframe、wireframeLinewidth；返回 无显式返回。
- `copy(source)` [源码:13831](../../eyes/src/vendor/three/core.js#L13831)：复制自身状态；需注意资源引用与深复制边界

### `MeshLambertMaterial`

A material for non-shiny surfaces, without specular highlights. The material uses a non-physically based [Lambertian](https://en.wikipedia.org/wiki/Lambertian_reflectance) model for calculating reflectance. This can simulate some surfaces (such as untreated wood or stone) well, but cannot simulate shiny surfaces with specular highlights (such as varnished wood). ˋMeshLambertMaterialˋ uses per-fragment shading. Due to the simplicity of the reflectance and illumination models, performance will be greater when using this material over the {@link MeshPhongMaterial}, {@link MeshStandardMaterial} or {@link MeshPhysicalMaterial}, at the cost of some graphical accuracy. @augments Material @demo scenes/material-browser.html#MeshLambertMaterial。父类 `Material`。

- `constructor(e)` [源码:13853](../../eyes/src/vendor/three/core.js#L13853)：当前操作：写入 alphaMap、aoMap、aoMapIntensity、bumpMap、bumpScale、color、combine、displacementBias、displacementMap、displacementScale、emissive、emissiveIntensity、emissiveMap、envMap、envMapIntensity、envMapRotation、flatShading、fog、isMeshLambertMaterial、lightMap、lightMapIntensity、map、normalMap、normalMapType、normalScale、reflectivity、refractionRatio、specularMap、type、wireframe、wireframeLinecap、wireframeLinejoin、wireframeLinewidth；返回 无显式返回。
- `copy(source)` [源码:13856](../../eyes/src/vendor/three/core.js#L13856)：复制自身状态；需注意资源引用与深复制边界

### `MeshDepthMaterial`

A material for drawing geometry by depth. Depth is based off of the camera near and far plane. White is nearest, black is farthest. @augments Material @demo scenes/material-browser.html#MeshDepthMaterial。父类 `Material`。

- `constructor(e)` [源码:13868](../../eyes/src/vendor/three/core.js#L13868)：当前操作：写入 alphaMap、depthPacking、displacementBias、displacementMap、displacementScale、isMeshDepthMaterial、map、type、wireframe、wireframeLinewidth；返回 无显式返回。
- `copy(source)` [源码:13871](../../eyes/src/vendor/three/core.js#L13871)：复制自身状态；需注意资源引用与深复制边界

### `MeshDistanceMaterial`

A material used internally for implementing shadow mapping with point lights. Can also be used to customize the shadow casting of an object by assigning an instance of ˋMeshDistanceMaterialˋ to {@link Object3D#customDistanceMaterial}. The following examples demonstrates this approach in order to ensure transparent parts of objects do not cast shadows. @augments Material。父类 `Material`。

- `constructor(e)` [源码:13887](../../eyes/src/vendor/three/core.js#L13887)：当前操作：写入 alphaMap、displacementBias、displacementMap、displacementScale、isMeshDistanceMaterial、map、type；返回 无显式返回。
- `copy(source)` [源码:13890](../../eyes/src/vendor/three/core.js#L13890)：复制自身状态；需注意资源引用与深复制边界

### `MeshMatcapMaterial`

以视空间法线查表采样 Matcap材质；其参数由渲染器选择 shader 特性并上传 uniform。父类 `Material`。

- `constructor(e)` [源码:13895](../../eyes/src/vendor/three/core.js#L13895)：当前操作：写入 alphaMap、bumpMap、bumpScale、color、defines、displacementBias、displacementMap、displacementScale、flatShading、fog、isMeshMatcapMaterial、map、matcap、normalMap、normalMapType、normalScale、type、wireframe、wireframeLinewidth；返回 无显式返回。
- `copy(e)` [源码:13900](../../eyes/src/vendor/three/core.js#L13900)：复制自身状态；需注意资源引用与深复制边界

### `LineDashedMaterial`

A material for rendering line primitives. Materials define the appearance of renderable 3D objects. ˋˋˋjs const material = new THREE.LineDashedMaterial( { color: 0xffffff, scale: 1, dashSize: 3, gapSize: 1, } ); ˋˋˋ @augments LineBasicMaterial。父类 `LineBasicMaterial`。

- `constructor(e)` [源码:13923](../../eyes/src/vendor/three/core.js#L13923)：当前操作：写入 dashSize、gapSize、isLineDashedMaterial、scale、type；返回 无显式返回。
- `copy(source)` [源码:13926](../../eyes/src/vendor/three/core.js#L13926)：复制自身状态；需注意资源引用与深复制边界

### `AnimationUtils`

A class with various methods to assist with animations. @hideconstructor。父类 `无`。

- `static convertArray(array, type)` [源码:13978](../../eyes/src/vendor/three/core.js#L13978)：Converts an array to a specific type @static @param {TypedArray\|Array} array - The array to convert. @param {TypedArray.constructor} type - The constructor of a type array. @return {TypedArray} The converted array
- `static isTypedArray(object)` [源码:13988](../../eyes/src/vendor/three/core.js#L13988)：Returns ˋtrueˋ if the given object is a typed array. @static @param {any} object - The object to check. @return {boolean} Whether the given object is a typed array.
- `static getKeyframeOrder(times)` [源码:13998](../../eyes/src/vendor/three/core.js#L13998)：Returns an array by which times and values can be sorted. @static @param {Array<number>} times - The keyframe time values. @return {Array<number>} The array.
- `static sortedArray(values, stride, order)` [源码:14010](../../eyes/src/vendor/three/core.js#L14010)：Sorts the given array by the previously computed order via ˋgetKeyframeOrder()ˋ. @static @param {Array<number>} values - The values to sort. @param {number} stride - The stride. @param {Array<number>} order - The sort order. @return {Array<number>} The sorted values.
- `static flattenJSON(jsonKeys, times, values, valuePropertyName)` [源码:14022](../../eyes/src/vendor/three/core.js#L14022)：Used for parsing AOS keyframe formats. @static @param {Array<number>} jsonKeys - A list of JSON keyframes. @param {Array<number>} times - This array will be filled with keyframe times by this method. @param {Array<number>} values - This array will be filled with keyframe values by this method. @param {string} valuePropertyName - The name of the property to use.
- `static subclip(e, t, n, r, i=30)` [源码:14025](../../eyes/src/vendor/three/core.js#L14025)：源码方法 subclip；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static makeClipAdditive(e, t=0, n=e, r=30)` [源码:14051](../../eyes/src/vendor/three/core.js#L14051)：源码方法 makeClipAdditive；作用以类职责与源码实现为准，未猜测压缩参数含义

### `Interpolant`

Abstract base class of interpolants over parametric samples. The parameter domain is one dimensional, typically the time or a path along a curve defined by the data. The sample values can have any dimensionality and derived classes may apply special interpretations to the data. This class provides the interval seek in a Template Method, deferring the actual interpolation to derived classes. Time complexity is O(1) for linear access crossing at most two points and O(log N) for random access, where N is the number of positions. References: {@link http://www.oodesign.com/template-method-pattern.html} @abstract。父类 `无`。

- `constructor(parameterPositions, sampleValues, valueSize, r)` [源码:14120](../../eyes/src/vendor/three/core.js#L14120)：当前操作：写入 DefaultSettings_、_cachedIndex、parameterPositions、resultBuffer、sampleValues、settings、valueSize；返回 无显式返回。
- `evaluate(e)` [源码:14123](../../eyes/src/vendor/three/core.js#L14123)：定位关键帧区间并调用插值实现；结果复用内部缓冲
- `getSettings_()` [源码:14173](../../eyes/src/vendor/three/core.js#L14173)：Returns the interpolation settings. @return {Object} The interpolation settings.
- `copySampleValue_(e)` [源码:14176](../../eyes/src/vendor/three/core.js#L14176)：源码方法 copySampleValue_；作用以类职责与源码实现为准，未猜测压缩参数含义
- `interpolate_()` [源码:14184](../../eyes/src/vendor/three/core.js#L14184)：在当前时间区间执行特定插值算法
- `intervalChanged_()` [源码:14194](../../eyes/src/vendor/three/core.js#L14194)：Optional method that is executed when the interval has changed. @param {number} i1 - An index into the sample value buffer. @param {number} t0 - The previous interpolation factor. @param {number} t - The current interpolation factor.

### `CubicInterpolant`

Fast and simple cubic spline interpolant. It was derived from a Hermitian construction setting the first derivative at each sample position to the linear slope between neighboring positions over their parameter interval. @augments Interpolant。父类 `Interpolant`。

- `constructor(parameterPositions, sampleValues, sampleSize, resultBuffer)` [源码:14214](../../eyes/src/vendor/three/core.js#L14214)：Constructs a new cubic interpolant. @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors. @param {TypedArray} sampleValues - The sample values. @param {number} sampleSize - The sample size @param {TypedArray} [resultBuffer] - The result buffer.
- `intervalChanged_(e, t, n)` [源码:14220](../../eyes/src/vendor/three/core.js#L14220)：源码方法 intervalChanged_；作用以类职责与源码实现为准，未猜测压缩参数含义
- `interpolate_(e, t, n, r)` [源码:14250](../../eyes/src/vendor/three/core.js#L14250)：在当前时间区间执行特定插值算法

### `LinearInterpolant`

A basic linear interpolant. @augments Interpolant。父类 `Interpolant`。

- `constructor(parameterPositions, sampleValues, sampleSize, resultBuffer)` [源码:14285](../../eyes/src/vendor/three/core.js#L14285)：Constructs a new linear interpolant. @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors. @param {TypedArray} sampleValues - The sample values. @param {number} sampleSize - The sample size @param {TypedArray} [resultBuffer] - The result buffer.
- `interpolate_(e, t, n, r)` [源码:14288](../../eyes/src/vendor/three/core.js#L14288)：在当前时间区间执行特定插值算法

### `DiscreteInterpolant`

Interpolant that evaluates to the sample value at the position preceding the parameter. @augments Interpolant。父类 `Interpolant`。

- `constructor(parameterPositions, sampleValues, sampleSize, resultBuffer)` [源码:14315](../../eyes/src/vendor/three/core.js#L14315)：Constructs a new discrete interpolant. @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors. @param {TypedArray} sampleValues - The sample values. @param {number} sampleSize - The sample size @param {TypedArray} [resultBuffer] - The result buffer.
- `interpolate_(i1)` [源码:14318](../../eyes/src/vendor/three/core.js#L14318)：在当前时间区间执行特定插值算法

### `BezierInterpolant`

Bezier 插值算法；对关键帧区间求连续或离散值。父类 `Interpolant`。

- `interpolate_(e, t, n, r)` [源码:14323](../../eyes/src/vendor/three/core.js#L14323)：在当前时间区间执行特定插值算法

### `KeyframeTrack`

Represents a timed sequence of keyframes, which are composed of lists of times and related values, and which are used to animate a specific property of an object.。父类 `无`。

- `constructor(name, t, n, r)` [源码:14373](../../eyes/src/vendor/three/core.js#L14373)：当前操作：写入 name、times、values；返回 无显式返回。
- `static toJSON(e)` [源码:14378](../../eyes/src/vendor/three/core.js#L14378)：序列化资源和引用；共享资源通过元数据缓存去重
- `InterpolantFactoryMethodDiscrete(result)` [源码:14399](../../eyes/src/vendor/three/core.js#L14399)：Factory method for creating a new discrete interpolant. @static @param {TypedArray} [result] - The result buffer. @return {DiscreteInterpolant} The new interpolant.
- `InterpolantFactoryMethodLinear(result)` [源码:14409](../../eyes/src/vendor/three/core.js#L14409)：Factory method for creating a new linear interpolant. @static @param {TypedArray} [result] - The result buffer. @return {LinearInterpolant} The new interpolant.
- `InterpolantFactoryMethodSmooth(result)` [源码:14419](../../eyes/src/vendor/three/core.js#L14419)：Factory method for creating a new smooth interpolant. @static @param {TypedArray} [result] - The result buffer. @return {CubicInterpolant} The new interpolant.
- `InterpolantFactoryMethodBezier(result)` [源码:14434](../../eyes/src/vendor/three/core.js#L14434)：Factory method for creating a new Bezier interpolant. The Bezier interpolant requires tangent data to be set via the ˋsettingsˋ property on the track before creating the interpolant. The settings should contain: - ˋinTangentsˋ: Float32Array with [time, value] pairs per keyframe per component - ˋoutTangentsˋ: Float32Array with [time, value] pairs per keyframe per component @static @param {TypedArray} [result] - The result buffer. @return {BezierInterpolant} The new interpolant.
- `setInterpolation(e)` [源码:14438](../../eyes/src/vendor/three/core.js#L14438)：源码方法 setInterpolation；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getInterpolation()` [源码:14468](../../eyes/src/vendor/three/core.js#L14468)：Returns the current interpolation type. @return {(InterpolateLinear\|InterpolateDiscrete\|InterpolateSmooth\|InterpolateBezier)} The interpolation type.
- `getValueSize()` [源码:14485](../../eyes/src/vendor/three/core.js#L14485)：Returns the value size. @return {number} The value size.
- `shift(e)` [源码:14488](../../eyes/src/vendor/three/core.js#L14488)：源码方法 shift；作用以类职责与源码实现为准，未猜测压缩参数含义
- `scale(e)` [源码:14495](../../eyes/src/vendor/three/core.js#L14495)：源码方法 scale；作用以类职责与源码实现为准，未猜测压缩参数含义
- `trim(e, t)` [源码:14502](../../eyes/src/vendor/three/core.js#L14502)：源码方法 trim；作用以类职责与源码实现为准，未猜测压缩参数含义
- `validate()` [源码:14516](../../eyes/src/vendor/three/core.js#L14516)：源码方法 validate；作用以类职责与源码实现为准，未猜测压缩参数含义
- `optimize()` [源码:14546](../../eyes/src/vendor/three/core.js#L14546)：源码方法 optimize；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clone()` [源码:14585](../../eyes/src/vendor/three/core.js#L14585)：以构造器和 copy 建立副本，资源共享规则由 copy 决定

### `BooleanKeyframeTrack`

A track for boolean keyframe values. @augments KeyframeTrack。父类 `KeyframeTrack`。

- `constructor(name, times, values)` [源码:14609](../../eyes/src/vendor/three/core.js#L14609)：Constructs a new boolean keyframe track. This keyframe track type has no ˋinterpolationˋ parameter because the interpolation is always discrete. @param {string} name - The keyframe track's name. @param {Array<number>} times - A list of keyframe times. @param {Array<boolean>} values - A list of keyframe values.

### `ColorKeyframeTrack`

A track for color keyframe values. @augments KeyframeTrack。父类 `KeyframeTrack`。

- `constructor(name, times, values, interpolation)` [源码:14628](../../eyes/src/vendor/three/core.js#L14628)：Constructs a new color keyframe track. @param {string} name - The keyframe track's name. @param {Array<number>} times - A list of keyframe times. @param {Array<number>} values - A list of keyframe values. @param {(InterpolateLinear\|InterpolateDiscrete\|InterpolateSmooth)} [interpolation] - The interpolation type.

### `NumberKeyframeTrack`

A track for numeric keyframe values. @augments KeyframeTrack。父类 `KeyframeTrack`。

- `constructor(name, times, values, interpolation)` [源码:14647](../../eyes/src/vendor/three/core.js#L14647)：Constructs a new number keyframe track. @param {string} name - The keyframe track's name. @param {Array<number>} times - A list of keyframe times. @param {Array<number>} values - A list of keyframe values. @param {(InterpolateLinear\|InterpolateDiscrete\|InterpolateSmooth)} [interpolation] - The interpolation type.

### `QuaternionLinearInterpolant`

Spherical linear unit quaternion interpolant. @augments Interpolant。父类 `Interpolant`。

- `constructor(parameterPositions, sampleValues, sampleSize, resultBuffer)` [源码:14666](../../eyes/src/vendor/three/core.js#L14666)：Constructs a new SLERP interpolant. @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors. @param {TypedArray} sampleValues - The sample values. @param {number} sampleSize - The sample size @param {TypedArray} [resultBuffer] - The result buffer.
- `interpolate_(e, t, n, r)` [源码:14669](../../eyes/src/vendor/three/core.js#L14669)：在当前时间区间执行特定插值算法

### `QuaternionKeyframeTrack`

A track for Quaternion keyframe values. @augments KeyframeTrack。父类 `KeyframeTrack`。

- `constructor(name, times, values, interpolation)` [源码:14693](../../eyes/src/vendor/three/core.js#L14693)：Constructs a new Quaternion keyframe track. @param {string} name - The keyframe track's name. @param {Array<number>} times - A list of keyframe times. @param {Array<number>} values - A list of keyframe values. @param {(InterpolateLinear\|InterpolateDiscrete\|InterpolateSmooth)} [interpolation] - The interpolation type.
- `InterpolantFactoryMethodLinear(result)` [源码:14703](../../eyes/src/vendor/three/core.js#L14703)：Overwritten so the method returns Quaternion based interpolant. @static @param {TypedArray} [result] - The result buffer. @return {QuaternionLinearInterpolant} The new interpolant.

### `StringKeyframeTrack`

A track for string keyframe values. @augments KeyframeTrack。父类 `KeyframeTrack`。

- `constructor(name, times, values)` [源码:14724](../../eyes/src/vendor/three/core.js#L14724)：Constructs a new string keyframe track. This keyframe track type has no ˋinterpolationˋ parameter because the interpolation is always discrete. @param {string} name - The keyframe track's name. @param {Array<number>} times - A list of keyframe times. @param {Array<string>} values - A list of keyframe values.

### `VectorKeyframeTrack`

A track for vector keyframe values. @augments KeyframeTrack。父类 `KeyframeTrack`。

- `constructor(name, times, values, interpolation)` [源码:14743](../../eyes/src/vendor/three/core.js#L14743)：Constructs a new vector keyframe track. @param {string} name - The keyframe track's name. @param {Array<number>} times - A list of keyframe times. @param {Array<number>} values - A list of keyframe values. @param {(InterpolateLinear\|InterpolateDiscrete\|InterpolateSmooth)} [interpolation] - The interpolation type.

### `AnimationClip`

A reusable set of keyframe tracks which represent an animation.。父类 `无`。

- `constructor(name="", duration=-1, tracks=[], blendMode=NormalAnimationBlendMode)` [源码:14752](../../eyes/src/vendor/three/core.js#L14752)：当前操作：写入 blendMode、duration、name、tracks、userData、uuid；返回 无显式返回。
- `static parse(e)` [源码:14755](../../eyes/src/vendor/three/core.js#L14755)：把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调
- `static toJSON(e)` [源码:14763](../../eyes/src/vendor/three/core.js#L14763)：当前操作：写入 无直接字段写入；返回 r。
- `static CreateFromMorphTargetSequence(e, t, n, r)` [源码:14777](../../eyes/src/vendor/three/core.js#L14777)：源码方法 CreateFromMorphTargetSequence；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static findByName(e, t)` [源码:14789](../../eyes/src/vendor/three/core.js#L14789)：源码方法 findByName；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static CreateClipsFromMorphTargetSequences(e, t, n)` [源码:14798](../../eyes/src/vendor/three/core.js#L14798)：源码方法 CreateClipsFromMorphTargetSequences；作用以类职责与源码实现为准，未猜测压缩参数含义
- `resetDuration()` [源码:14814](../../eyes/src/vendor/three/core.js#L14814)：源码方法 resetDuration；作用以类职责与源码实现为准，未猜测压缩参数含义
- `trim()` [源码:14822](../../eyes/src/vendor/three/core.js#L14822)：源码方法 trim；作用以类职责与源码实现为准，未猜测压缩参数含义
- `validate()` [源码:14826](../../eyes/src/vendor/three/core.js#L14826)：源码方法 validate；作用以类职责与源码实现为准，未猜测压缩参数含义
- `optimize()` [源码:14831](../../eyes/src/vendor/three/core.js#L14831)：源码方法 optimize；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clone()` [源码:14835](../../eyes/src/vendor/three/core.js#L14835)：以构造器和 copy 建立副本，资源共享规则由 copy 决定
- `toJSON()` [源码:14846](../../eyes/src/vendor/three/core.js#L14846)：Serializes this animation clip into JSON. @return {Object} The JSON object.

### `LoadingManager`

Handles and keeps track of loaded and pending data. A default global instance of this class is created and used by loaders if not supplied manually. In general that should be sufficient, however there are times when it can be useful to have separate loaders - for example if you want to show separate loading bars for objects and textures. ˋˋˋjs const manager = new THREE.LoadingManager(); manager.onLoad = () => console.log( 'Loading complete!' ); const loader1 = new OBJLoader( manager ); const loader2 = new ColladaLoader( manager ); ˋˋˋ。父类 `无`。

- `constructor(onLoad, onProgress, onError)` [源码:14926](../../eyes/src/vendor/three/core.js#L14926)：当前操作：写入 _abortController、abort、addHandler、getHandler、itemEnd、itemError、itemStart、onError、onLoad、onProgress、onStart、removeHandler、resolveURL、setURLModifier；返回 无显式返回。
- `get abortController()` [源码:14959](../../eyes/src/vendor/three/core.js#L14959)：惰性创建并返回 AbortController；第一次读取会写入 _abortController，不能视为纯只读访问

### `Loader`

Abstract base class for loaders. @abstract。父类 `无`。

- `constructor(e)` [源码:14970](../../eyes/src/vendor/three/core.js#L14970)：当前操作：写入 crossOrigin、manager、path、requestHeader、resourcePath、withCredentials；返回 无显式返回。
- `load()` [源码:14985](../../eyes/src/vendor/three/core.js#L14985)：This method needs to be implemented by all concrete loaders. It holds the logic for loading assets from the backend. @abstract @param {string} url - The path/URL of the file to be loaded. @param {Function} onLoad - Executed when the loading process has been finished. @param {onProgressCallback} [onProgress] - Executed while the loading is in progress. @param {onErrorCallback} [onError] - Executed when errors occur.
- `loadAsync(url, onProgress)` [源码:14993](../../eyes/src/vendor/three/core.js#L14993)：A async version of {@link Loader#load}. @param {string} url - The path/URL of the file to be loaded. @param {onProgressCallback} [onProgress] - Executed while the loading is in progress. @return {Promise} A Promise that resolves when the asset has been loaded.
- `parse()` [源码:15006](../../eyes/src/vendor/three/core.js#L15006)：This method needs to be implemented by all concrete loaders. It holds the logic for parsing the asset into three.js entities. @abstract @param {any} data - The data to parse.
- `setCrossOrigin(crossOrigin)` [源码:15014](../../eyes/src/vendor/three/core.js#L15014)：Sets the ˋcrossOriginˋ String to implement CORS for loading the URL from a different domain that allows CORS. @param {string} crossOrigin - The ˋcrossOriginˋ value. @return {Loader} A reference to this instance.
- `setWithCredentials(value)` [源码:15026](../../eyes/src/vendor/three/core.js#L15026)：Whether the XMLHttpRequest uses credentials such as cookies, authorization headers or TLS client certificates, see [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials). Note: This setting has no effect if you are loading files locally or from the same domain. @param {boolean} value - The ˋwithCredentialsˋ value. @return {Loader} A reference to this instance.
- `setPath(path)` [源码:15035](../../eyes/src/vendor/three/core.js#L15035)：Sets the base path for the asset. @param {string} path - The base path. @return {Loader} A reference to this instance.
- `setResourcePath(resourcePath)` [源码:15044](../../eyes/src/vendor/three/core.js#L15044)：Sets the base path for dependent resources like textures. @param {string} resourcePath - The resource path. @return {Loader} A reference to this instance.
- `setRequestHeader(requestHeader)` [源码:15054](../../eyes/src/vendor/three/core.js#L15054)：Sets the given request header. @param {Object} requestHeader - A [request header](https://developer.mozilla.org/en-US/docs/Glossary/Request_header) for configuring the HTTP request. @return {Loader} A reference to this instance.
- `abort()` [源码:15063](../../eyes/src/vendor/three/core.js#L15063)：This method can be implemented in loaders for aborting ongoing requests. @abstract @return {Loader} A reference to this instance.

### `HttpError`

携带 HTTP 响应信息的资源加载异常。父类 `Error`。

- `constructor(message, response)` [源码:15070](../../eyes/src/vendor/three/core.js#L15070)：当前操作：写入 response；返回 无显式返回。

### `FileLoader`

A low level class for loading resources with the Fetch API, used internally by most loaders. It can also be used directly to load any file type that does not have a loader. This loader supports caching. If you want to use it, add ˋTHREE.Cache.enabled = true;ˋ once to your application. ˋˋˋjs const loader = new THREE.FileLoader(); const data = await loader.loadAsync( 'example.txt' ); ˋˋˋ @augments Loader。父类 `Loader`。

- `constructor(e)` [源码:15090](../../eyes/src/vendor/three/core.js#L15090)：当前操作：写入 _abortController、mimeType、responseType；返回 无显式返回。
- `load(e, t, n, r)` [源码:15093](../../eyes/src/vendor/three/core.js#L15093)：发起异步资源获取并交给解析路径；管理加载器回调和错误传播
- `setResponseType(value)` [源码:15200](../../eyes/src/vendor/three/core.js#L15200)：Sets the expected response type. @param {('arraybuffer'\|'blob'\|'document'\|'json'\|'')} value - The response type. @return {FileLoader} A reference to this file loader.
- `setMimeType(value)` [源码:15209](../../eyes/src/vendor/three/core.js#L15209)：Sets the expected mime type of the loaded file. @param {string} value - The mime type. @return {FileLoader} A reference to this file loader.
- `abort()` [源码:15217](../../eyes/src/vendor/three/core.js#L15217)：Aborts ongoing fetch requests. @return {FileLoader} A reference to this instance.

### `AnimationLoader`

Class for loading animation clips in the JSON format. The files are internally loaded via {@link FileLoader}. ˋˋˋjs const loader = new THREE.AnimationLoader(); const animations = await loader.loadAsync( 'animations/animation.js' ); ˋˋˋ @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:15238](../../eyes/src/vendor/three/core.js#L15238)：Constructs a new animation loader. @param {LoadingManager} [manager] - The loading manager.
- `load(url, onLoad, onProgress, onError)` [源码:15250](../../eyes/src/vendor/three/core.js#L15250)：Starts loading from the given URL and pass the loaded animations as an array holding instances of {@link AnimationClip} to the ˋonLoad()ˋ callback. @param {string} url - The path/URL of the file to be loaded. This can also be a data URI. @param {function(Array<AnimationClip>)} onLoad - Executed when the loading process has been finished. @param {onProgressCallback} onProgress - Executed while the loading is in progress. @param {onErrorCallback} onError - Executed when errors occur.
- `parse(json)` [源码:15267](../../eyes/src/vendor/three/core.js#L15267)：Parses the given JSON object and returns an array of animation clips. @param {Object} json - The serialized animation clips. @return {Array<AnimationClip>} The parsed animation clips.

### `CompressedTextureLoader`

Abstract base class for loading compressed texture formats S3TC, ASTC or ETC. Textures are internally loaded via {@link FileLoader}. Derived classes have to implement the ˋparse()ˋ method which holds the parsing for the respective format. @abstract @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:15292](../../eyes/src/vendor/three/core.js#L15292)：Constructs a new compressed texture loader. @param {LoadingManager} [manager] - The loading manager.
- `load(e, t, n, r)` [源码:15295](../../eyes/src/vendor/three/core.js#L15295)：发起异步资源获取并交给解析路径；管理加载器回调和错误传播

### `ImageLoader`

A loader for loading images. The class loads images with the HTML ˋImageˋ API. ˋˋˋjs const loader = new THREE.ImageLoader(); const image = await loader.loadAsync( 'image.png' ); ˋˋˋ Please note that ˋImageLoaderˋ has dropped support for progress events in ˋr84ˋ. For an ˋImageLoaderˋ that supports progress events, see [this thread](https://github.com/mrdoob/three.js/issues/10439#issuecomment-275785639). @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:15350](../../eyes/src/vendor/three/core.js#L15350)：Constructs a new image loader. @param {LoadingManager} [manager] - The loading manager.
- `load(e, t, n, r)` [源码:15353](../../eyes/src/vendor/three/core.js#L15353)：发起异步资源获取并交给解析路径；管理加载器回调和错误传播

### `CubeTextureLoader`

Class for loading cube textures. Images are internally loaded via {@link ImageLoader}. The loader returns an instance of {@link CubeTexture} and expects the cube map to be defined as six separate images representing the sides of a cube. Other cube map definitions like vertical and horizontal cross, column and row layouts are not supported. Note that, by convention, cube maps are specified in a coordinate system in which positive-x is to the right when looking up the positive-z axis -- in other words, using a left-handed coordinate system. Since three.js uses a right-handed coordinate system, environment maps used in three.js will have pos-x and neg-x swapped. The loaded cube texture is in sRGB color space. Meaning {@link Texture#colorSpace} is set to ˋSRGBColorSpaceˋ by default. ˋˋˋjs const loader = new THREE.CubeTextureLoader().setPath( 'textures/cubeMaps/' ); const cubeTexture = await loader.loadAsync( [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ] ); scene.background = cubeTexture; ˋˋˋ @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:15426](../../eyes/src/vendor/three/core.js#L15426)：Constructs a new cube texture loader. @param {LoadingManager} [manager] - The loading manager.
- `load(e, t, n, r)` [源码:15429](../../eyes/src/vendor/three/core.js#L15429)：发起异步资源获取并交给解析路径；管理加载器回调和错误传播

### `DataTextureLoader`

Abstract base class for loading binary texture formats RGBE, EXR or TGA. Textures are internally loaded via {@link FileLoader}. Derived classes have to implement the ˋparse()ˋ method which holds the parsing for the respective format. @abstract @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:15460](../../eyes/src/vendor/three/core.js#L15460)：Constructs a new data texture loader. @param {LoadingManager} [manager] - The loading manager.
- `load(e, t, n, r)` [源码:15463](../../eyes/src/vendor/three/core.js#L15463)：发起异步资源获取并交给解析路径；管理加载器回调和错误传播
- `createDataTexture(buffer)` [源码:15485](../../eyes/src/vendor/three/core.js#L15485)：Parses the given buffer and returns a configured data texture. Use this method for parsing texture data that is already in memory (e.g. drag and drop or data loaded from a server) without going through {@link DataTextureLoader#load}. @param {ArrayBuffer} buffer - The raw texture data. @return {DataTexture} The data texture.
- `_applyTexData(e, t)` [源码:15489](../../eyes/src/vendor/three/core.js#L15489)：源码方法 _applyTexData；作用以类职责与源码实现为准，未猜测压缩参数含义

### `TextureLoader`

Class for loading textures. Images are internally loaded via {@link ImageLoader}. ˋˋˋjs const loader = new THREE.TextureLoader(); const texture = await loader.loadAsync( 'textures/land_ocean_ice_cloud_2048.jpg' ); const material = new THREE.MeshBasicMaterial( { map:texture } ); ˋˋˋ Please note that ˋTextureLoaderˋ has dropped support for progress events in ˋr84ˋ. For a ˋTextureLoaderˋ that supports progress events, see [this thread](https://github.com/mrdoob/three.js/issues/10439#issuecomment-293260145). @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:15515](../../eyes/src/vendor/three/core.js#L15515)：Constructs a new texture loader. @param {LoadingManager} [manager] - The loading manager.
- `load(e, t, n, r)` [源码:15518](../../eyes/src/vendor/three/core.js#L15518)：发起异步资源获取并交给解析路径；管理加载器回调和错误传播

### `Light`

Abstract base class for lights - all other light types inherit the properties and methods described here. @abstract @augments Object3D。父类 `Object3D`。

- `constructor(e, intensity=1)` [源码:15534](../../eyes/src/vendor/three/core.js#L15534)：当前操作：写入 color、intensity、isLight、type；返回 无显式返回。
- `dispose()` [源码:15537](../../eyes/src/vendor/three/core.js#L15537)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `copy(source, recursive)` [源码:15542](../../eyes/src/vendor/three/core.js#L15542)：复制自身状态；需注意资源引用与深复制边界
- `toJSON(meta)` [源码:15545](../../eyes/src/vendor/three/core.js#L15545)：序列化资源和引用；共享资源通过元数据缓存去重

### `HemisphereLight`

A light source positioned directly above the scene, with color fading from the sky color to the ground color. This light cannot be used to cast shadows. ˋˋˋjs const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ); scene.add( light ); ˋˋˋ @augments Light。父类 `Light`。

- `constructor(e, t, n)` [源码:15564](../../eyes/src/vendor/three/core.js#L15564)：当前操作：写入 groundColor、isHemisphereLight、type；返回 无显式返回。
- `copy(source, recursive)` [源码:15567](../../eyes/src/vendor/three/core.js#L15567)：复制自身状态；需注意资源引用与深复制边界
- `toJSON(meta)` [源码:15570](../../eyes/src/vendor/three/core.js#L15570)：序列化资源和引用；共享资源通过元数据缓存去重

### `LightShadow`

Abstract base class for light shadow classes. These classes represent the shadow configuration for different light types. @abstract。父类 `无`。

- `constructor(camera)` [源码:15590](../../eyes/src/vendor/three/core.js#L15590)：Constructs a new light shadow. @param {Camera} camera - The light's view of the world.
- `getViewportCount()` [源码:15599](../../eyes/src/vendor/three/core.js#L15599)：Used internally by the renderer to get the number of viewports that need to be rendered for this shadow. @return {number} The viewport count.
- `getFrustum()` [源码:15607](../../eyes/src/vendor/three/core.js#L15607)：Gets the shadow cameras frustum. Used internally by the renderer to cull objects. @return {Frustum} The shadow camera frustum.
- `updateMatrices(e)` [源码:15610](../../eyes/src/vendor/three/core.js#L15610)：源码方法 updateMatrices；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getViewport(viewportIndex)` [源码:15621](../../eyes/src/vendor/three/core.js#L15621)：Returns a viewport definition for the given viewport index. @param {number} viewportIndex - The viewport index. @return {Vector4} The viewport.
- `getFrameExtents()` [源码:15629](../../eyes/src/vendor/three/core.js#L15629)：Returns the frame extends. @return {Vector2} The frame extends.
- `dispose()` [源码:15632](../../eyes/src/vendor/three/core.js#L15632)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `copy(source)` [源码:15641](../../eyes/src/vendor/three/core.js#L15641)：Copies the values of the given light shadow instance to this instance. @param {LightShadow} source - The light shadow to copy. @return {LightShadow} A reference to this light shadow instance.
- `clone()` [源码:15649](../../eyes/src/vendor/three/core.js#L15649)：Returns a new light shadow instance with copied values from this instance. @return {LightShadow} A clone of this instance.
- `toJSON()` [源码:15652](../../eyes/src/vendor/three/core.js#L15652)：序列化资源和引用；共享资源通过元数据缓存去重

### `Camera`

Abstract base class for cameras. This class should always be inherited when you build a new camera. @abstract @augments Object3D。父类 `Object3D`。

- `constructor()` [源码:15668](../../eyes/src/vendor/three/core.js#L15668)：当前操作：写入 _reversedDepth、coordinateSystem、isCamera、matrixWorldInverse、projectionMatrix、projectionMatrixInverse、type；返回 无显式返回。
- `get reversedDepth()` [源码:15671](../../eyes/src/vendor/three/core.js#L15671)：只读返回 this._reversedDepth；此 getter 不执行对应 setter 的写入或更新通知
- `copy(source, recursive)` [源码:15674](../../eyes/src/vendor/three/core.js#L15674)：复制自身状态；需注意资源引用与深复制边界
- `getWorldDirection(target)` [源码:15686](../../eyes/src/vendor/three/core.js#L15686)：Returns a vector representing the ("look") direction of the 3D object in world space. This method is overwritten since cameras have a different forward vector compared to other 3D objects. A camera looks down its local, negative z-axis by default. @param {Vector3} target - The target vector the result is stored to. @return {Vector3} The 3D object's direction in world space.
- `updateMatrixWorld(e)` [源码:15689](../../eyes/src/vendor/three/core.js#L15689)：传播父级世界矩阵；matrixWorldNeedsUpdate 控制失效，递归更新子节点
- `updateWorldMatrix(e, t, n=!1)` [源码:15692](../../eyes/src/vendor/three/core.js#L15692)：按参数选择先更新祖先或继续更新后代，避免使用过期世界变换
- `clone()` [源码:15695](../../eyes/src/vendor/three/core.js#L15695)：以构造器和 copy 建立副本，资源共享规则由 copy 决定

### `PerspectiveCamera`

Camera that uses [perspective projection](https://en.wikipedia.org/wiki/Perspective_(graphical)). This projection mode is designed to mimic the way the human eye sees. It is the most common projection mode used for rendering a 3D scene. ˋˋˋjs const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 ); scene.add( camera ); ˋˋˋ @augments Camera。父类 `Camera`。

- `constructor(fov=50, aspect=1, near=.1, far=2e3)` [源码:15716](../../eyes/src/vendor/three/core.js#L15716)：当前操作：写入 aspect、far、filmGauge、filmOffset、focus、fov、isPerspectiveCamera、near、type、view、zoom；返回 无显式返回。
- `copy(e, t)` [源码:15719](../../eyes/src/vendor/three/core.js#L15719)：复制自身状态；需注意资源引用与深复制边界
- `setFocalLength(e)` [源码:15722](../../eyes/src/vendor/three/core.js#L15722)：源码方法 setFocalLength；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getFocalLength()` [源码:15726](../../eyes/src/vendor/three/core.js#L15726)：源码方法 getFocalLength；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getEffectiveFOV()` [源码:15730](../../eyes/src/vendor/three/core.js#L15730)：源码方法 getEffectiveFOV；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getFilmWidth()` [源码:15739](../../eyes/src/vendor/three/core.js#L15739)：Returns the width of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}. @return {number} The film width.
- `getFilmHeight()` [源码:15748](../../eyes/src/vendor/three/core.js#L15748)：Returns the height of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}. @return {number} The film width.
- `getViewBounds(e, t, n)` [源码:15751](../../eyes/src/vendor/three/core.js#L15751)：源码方法 getViewBounds；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getViewSize(distance, target)` [源码:15761](../../eyes/src/vendor/three/core.js#L15761)：Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction. @param {number} distance - The viewing distance. @param {Vector2} target - The target vector that is used to store result where x is width and y is height. @returns {Vector2} The view size.
- `setViewOffset(e, t, n, r, i, a)` [源码:15764](../../eyes/src/vendor/three/core.js#L15764)：源码方法 setViewOffset；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clearViewOffset()` [源码:15775](../../eyes/src/vendor/three/core.js#L15775)：源码方法 clearViewOffset；作用以类职责与源码实现为准，未猜测压缩参数含义
- `updateProjectionMatrix()` [源码:15778](../../eyes/src/vendor/three/core.js#L15778)：源码方法 updateProjectionMatrix；作用以类职责与源码实现为准，未猜测压缩参数含义
- `toJSON(e)` [源码:15793](../../eyes/src/vendor/three/core.js#L15793)：序列化资源和引用；共享资源通过元数据缓存去重

### `SpotLightShadow`

Represents the shadow configuration of directional lights. @augments LightShadow。父类 `LightShadow`。

- `constructor()` [源码:15804](../../eyes/src/vendor/three/core.js#L15804)：当前操作：写入 aspect、focus、isSpotLightShadow；返回 无显式返回。
- `updateMatrices(e)` [源码:15807](../../eyes/src/vendor/three/core.js#L15807)：源码方法 updateMatrices；作用以类职责与源码实现为准，未猜测压缩参数含义
- `copy(source)` [源码:15814](../../eyes/src/vendor/three/core.js#L15814)：复制自身状态；需注意资源引用与深复制边界

### `SpotLight`

This light gets emitted from a single point in one direction, along a cone that increases in size the further from the light it gets. This light can cast shadows - see the {@link SpotLightShadow} for details. ˋˋˋjs // white spotlight shining from the side, modulated by a texture const spotLight = new THREE.SpotLight( 0xffffff ); spotLight.position.set( 100, 1000, 100 ); spotLight.map = new THREE.TextureLoader().load( url ); spotLight.castShadow = true; spotLight.shadow.mapSize.width = 1024; spotLight.shadow.mapSize.height = 1024; spotLight.shadow.camera.near = 500; spotLight.shadow.camera.far = 4000; spotLight.shadow.camera.fov = 30;s ˋˋˋ @augments Light。父类 `Light`。

- `constructor(e, t, distance=0, angle=Math.PI/3, penumbra=0, decay=2)` [源码:15841](../../eyes/src/vendor/three/core.js#L15841)：当前操作：写入 angle、decay、distance、isSpotLight、map、penumbra、shadow、target、type；返回 无显式返回。
- `get power()` [源码:15844](../../eyes/src/vendor/three/core.js#L15844)：只读返回 intensity × π，不修改强度
- `set power(power)` [源码:15847](../../eyes/src/vendor/three/core.js#L15847)：将输入光功率除以 π 后写入 intensity
- `dispose()` [源码:15850](../../eyes/src/vendor/three/core.js#L15850)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `copy(source, recursive)` [源码:15853](../../eyes/src/vendor/three/core.js#L15853)：复制自身状态；需注意资源引用与深复制边界
- `toJSON(meta)` [源码:15856](../../eyes/src/vendor/three/core.js#L15856)：序列化资源和引用；共享资源通过元数据缓存去重

### `PointLightShadow`

Point 光源阴影相机、贴图和投影矩阵。父类 `LightShadow`。

- `constructor()` [源码:15862](../../eyes/src/vendor/three/core.js#L15862)：当前操作：写入 isPointLightShadow；返回 无显式返回。

### `PointLight`

A light that gets emitted from a single point in all directions. A common use case for this is to replicate the light emitted from a bare lightbulb. This light can cast shadows - see the {@link PointLightShadow} for details. ˋˋˋjs const light = new THREE.PointLight( 0xff0000, 1, 100 ); light.position.set( 50, 50, 50 ); scene.add( light ); ˋˋˋ @augments Light。父类 `Light`。

- `constructor(e, t, distance=0, decay=2)` [源码:15882](../../eyes/src/vendor/three/core.js#L15882)：当前操作：写入 decay、distance、isPointLight、shadow、type；返回 无显式返回。
- `get power()` [源码:15885](../../eyes/src/vendor/three/core.js#L15885)：只读返回 intensity × 4π，不修改强度
- `set power(power)` [源码:15888](../../eyes/src/vendor/three/core.js#L15888)：将输入光功率除以 4π 后写入 intensity
- `dispose()` [源码:15891](../../eyes/src/vendor/three/core.js#L15891)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `copy(source, recursive)` [源码:15894](../../eyes/src/vendor/three/core.js#L15894)：复制自身状态；需注意资源引用与深复制边界
- `toJSON(meta)` [源码:15897](../../eyes/src/vendor/three/core.js#L15897)：序列化资源和引用；共享资源通过元数据缓存去重

### `OrthographicCamera`

正交投影相机；以左右上下边界和 zoom 生成不随距离缩放的投影。父类 `Camera`。

- `constructor(left=-1, right=1, top=1, bottom=-1, near=.1, far=2e3)` [源码:15903](../../eyes/src/vendor/three/core.js#L15903)：当前操作：写入 bottom、far、isOrthographicCamera、left、near、right、top、type、view、zoom；返回 无显式返回。
- `copy(e, t)` [源码:15906](../../eyes/src/vendor/three/core.js#L15906)：复制自身状态；需注意资源引用与深复制边界
- `setViewOffset(e, t, n, r, i, a)` [源码:15909](../../eyes/src/vendor/three/core.js#L15909)：源码方法 setViewOffset；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clearViewOffset()` [源码:15920](../../eyes/src/vendor/three/core.js#L15920)：源码方法 clearViewOffset；作用以类职责与源码实现为准，未猜测压缩参数含义
- `updateProjectionMatrix()` [源码:15923](../../eyes/src/vendor/three/core.js#L15923)：源码方法 updateProjectionMatrix；作用以类职责与源码实现为准，未猜测压缩参数含义
- `toJSON(e)` [源码:15939](../../eyes/src/vendor/three/core.js#L15939)：序列化资源和引用；共享资源通过元数据缓存去重

### `DirectionalLightShadow`

Directional 光源阴影相机、贴图和投影矩阵。父类 `LightShadow`。

- `constructor()` [源码:15945](../../eyes/src/vendor/three/core.js#L15945)：当前操作：写入 isDirectionalLightShadow；返回 无显式返回。

### `DirectionalLight`

A light that gets emitted in a specific direction. This light will behave as though it is infinitely far away and the rays produced from it are all parallel. The common use case for this is to simulate daylight; the sun is far enough away that its position can be considered to be infinite, and all light rays coming from it are parallel. A common point of confusion for directional lights is that setting the rotation has no effect. This is because three.js's DirectionalLight is the equivalent to what is often called a 'Target Direct Light' in other applications. This means that its direction is calculated as pointing from the light's {@link Object3D#position} to the {@link DirectionalLight#target} position (as opposed to a 'Free Direct Light' that just has a rotation component). This light can cast shadows - see the {@link DirectionalLightShadow} for details. ˋˋˋjs // White directional light at half intensity shining from the top. const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 ); scene.add( directionalLight ); ˋˋˋ @augments Light。父类 `Light`。

- `constructor(e, t)` [源码:15977](../../eyes/src/vendor/three/core.js#L15977)：当前操作：写入 isDirectionalLight、shadow、target、type；返回 无显式返回。
- `dispose()` [源码:15980](../../eyes/src/vendor/three/core.js#L15980)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `copy(source)` [源码:15983](../../eyes/src/vendor/three/core.js#L15983)：复制自身状态；需注意资源引用与深复制边界
- `toJSON(meta)` [源码:15986](../../eyes/src/vendor/three/core.js#L15986)：序列化资源和引用；共享资源通过元数据缓存去重

### `AmbientLight`

Ambient 光源颜色、强度及方向/衰减数据。父类 `Light`。

- `constructor(e, t)` [源码:15992](../../eyes/src/vendor/three/core.js#L15992)：当前操作：写入 isAmbientLight、type；返回 无显式返回。

### `RectAreaLight`

This class emits light uniformly across the face a rectangular plane. This light type can be used to simulate light sources such as bright windows or strip lighting. Important Notes: - There is no shadow support. - Only PBR materials are supported. - You have to include ˋRectAreaLightUniformsLibˋ (ˋWebGLRendererˋ) or ˋRectAreaLightTexturesLibˋ (ˋWebGPURendererˋ) into your app and init the uniforms/textures. ˋˋˋjs RectAreaLightUniformsLib.init(); // only relevant for WebGLRenderer THREE.RectAreaLightNode.setLTC( RectAreaLightTexturesLib.init() ); // only relevant for WebGPURenderer const intensity = 1; const width = 10; const height = 10; const rectLight = new THREE.RectAreaLight( 0xffffff, intensity, width, height ); rectLight.position.set( 5, 5, 0 ); rectLight.lookAt( 0, 0, 0 ); scene.add( rectLight ) ˋˋˋ @augments Light。父类 `Light`。

- `constructor(e, t, width=10, height=10)` [源码:16022](../../eyes/src/vendor/three/core.js#L16022)：当前操作：写入 height、isRectAreaLight、type、width；返回 无显式返回。
- `get power()` [源码:16025](../../eyes/src/vendor/three/core.js#L16025)：只读返回 intensity × width × height × π
- `set power(power)` [源码:16028](../../eyes/src/vendor/three/core.js#L16028)：将输入光功率除以 width × height × π 后写入 intensity
- `copy(source)` [源码:16031](../../eyes/src/vendor/three/core.js#L16031)：复制自身状态；需注意资源引用与深复制边界
- `toJSON(meta)` [源码:16034](../../eyes/src/vendor/three/core.js#L16034)：序列化资源和引用；共享资源通过元数据缓存去重

### `SphericalHarmonics3`

Represents a third-order spherical harmonics (SH). Light probes use this class to encode lighting information. - Primary reference: {@link https://graphics.stanford.edu/papers/envmap/envmap.pdf} - Secondary reference: {@link https://www.ppsloan.org/publications/StupidSH36.pdf}。父类 `无`。

- `constructor()` [源码:16047](../../eyes/src/vendor/three/core.js#L16047)：当前操作：写入 coefficients、isSphericalHarmonics3；返回 无显式返回。
- `set(e)` [源码:16051](../../eyes/src/vendor/three/core.js#L16051)：源码方法 set；作用以类职责与源码实现为准，未猜测压缩参数含义
- `zero()` [源码:16055](../../eyes/src/vendor/three/core.js#L16055)：源码方法 zero；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getAt(e, t)` [源码:16059](../../eyes/src/vendor/three/core.js#L16059)：源码方法 getAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getIrradianceAt(e, t)` [源码:16066](../../eyes/src/vendor/three/core.js#L16066)：源码方法 getIrradianceAt；作用以类职责与源码实现为准，未猜测压缩参数含义
- `add(e)` [源码:16073](../../eyes/src/vendor/three/core.js#L16073)：源码方法 add；作用以类职责与源码实现为准，未猜测压缩参数含义
- `addScaledSH(e, t)` [源码:16077](../../eyes/src/vendor/three/core.js#L16077)：源码方法 addScaledSH；作用以类职责与源码实现为准，未猜测压缩参数含义
- `scale(e)` [源码:16081](../../eyes/src/vendor/three/core.js#L16081)：源码方法 scale；作用以类职责与源码实现为准，未猜测压缩参数含义
- `lerp(e, t)` [源码:16085](../../eyes/src/vendor/three/core.js#L16085)：源码方法 lerp；作用以类职责与源码实现为准，未猜测压缩参数含义
- `equals(e)` [源码:16089](../../eyes/src/vendor/three/core.js#L16089)：源码方法 equals；作用以类职责与源码实现为准，未猜测压缩参数含义
- `copy(sh)` [源码:16099](../../eyes/src/vendor/three/core.js#L16099)：Copies the values of the given spherical harmonics to this instance. @param {SphericalHarmonics3} sh - The spherical harmonics to copy. @return {SphericalHarmonics3} A reference to this spherical harmonics.
- `clone()` [源码:16107](../../eyes/src/vendor/three/core.js#L16107)：Returns a new spherical harmonics with copied values from this instance. @return {SphericalHarmonics3} A clone of this instance.
- `fromArray(e, t=0)` [源码:16110](../../eyes/src/vendor/three/core.js#L16110)：源码方法 fromArray；作用以类职责与源码实现为准，未猜测压缩参数含义
- `toArray(e=[], t=0)` [源码:16115](../../eyes/src/vendor/three/core.js#L16115)：源码方法 toArray；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static getBasisAt(e, t)` [源码:16120](../../eyes/src/vendor/three/core.js#L16120)：源码方法 getBasisAt；作用以类职责与源码实现为准，未猜测压缩参数含义

### `LightProbe`

Light probes are an alternative way of adding light to a 3D scene. Unlike classical light sources (e.g. directional, point or spot lights), light probes do not emit light. Instead they store information about light passing through 3D space. During rendering, the light that hits a 3D object is approximated by using the data from the light probe. Light probes are usually created from (radiance) environment maps. The class {@link LightProbeGenerator} can be used to create light probes from cube textures or render targets. However, light estimation data could also be provided in other forms e.g. by WebXR. This enables the rendering of augmented reality content that reacts to real world lighting. The current probe implementation in three.js supports so-called diffuse light probes. This type of light probe is functionally equivalent to an irradiance environment map. @augments Light。父类 `Light`。

- `constructor(sh=new SphericalHarmonics3(), t=1)` [源码:16147](../../eyes/src/vendor/three/core.js#L16147)：当前操作：写入 isLightProbe、sh；返回 无显式返回。
- `copy(source)` [源码:16150](../../eyes/src/vendor/three/core.js#L16150)：复制自身状态；需注意资源引用与深复制边界
- `toJSON(meta)` [源码:16153](../../eyes/src/vendor/three/core.js#L16153)：序列化资源和引用；共享资源通过元数据缓存去重

### `MaterialLoader`

Class for loading materials. The files are internally loaded via {@link FileLoader}. ˋˋˋjs const loader = new THREE.MaterialLoader(); const material = await loader.loadAsync( 'material.json' ); ˋˋˋ This loader does not support node materials. Use {@link NodeMaterialLoader} instead. @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:16177](../../eyes/src/vendor/three/core.js#L16177)：Constructs a new material loader. @param {LoadingManager} [manager] - The loading manager.
- `load(url, onLoad, onProgress, onError)` [源码:16188](../../eyes/src/vendor/three/core.js#L16188)：Starts loading from the given URL and pass the loaded material to the ˋonLoad()ˋ callback. @param {string} url - The path/URL of the file to be loaded. This can also be a data URI. @param {function(Material)} onLoad - Executed when the loading process has been finished. @param {onProgressCallback} onProgress - Executed while the loading is in progress. @param {onErrorCallback} onError - Executed when errors occur.
- `parse(json)` [源码:16205](../../eyes/src/vendor/three/core.js#L16205)：Parses the given JSON object and returns a material. @param {Object} json - The serialized material. @return {Material} The parsed material.
- `setTextures(value)` [源码:16216](../../eyes/src/vendor/three/core.js#L16216)：Textures are not embedded in the material JSON so they have to be injected before the loading process starts. @param {Object} value - A dictionary holding textures for material properties. @return {MaterialLoader} A reference to this material loader.
- `createMaterialFromType(type)` [源码:16225](../../eyes/src/vendor/three/core.js#L16225)：Creates a material for the given type. @param {string} type - The material type. @return {Material} The new material.
- `static createMaterialFromType(e)` [源码:16228](../../eyes/src/vendor/three/core.js#L16228)：当前操作：写入 无直接字段写入；返回 void 0===t?(warnOnce(ˋMaterialLoader: Unknown material type "${e}". Use .registerMaterial() before starting the deserialization process.ˋ),n=new Material()):n=new t(),n。
- `static registerMaterial(type, materialClass)` [源码:16261](../../eyes/src/vendor/three/core.js#L16261)：Registers the given material at the internal material library. @static @param {string} type - The material type. @param {Material.constructor} materialClass - The material class.

### `LoaderUtils`

解析 URL 基路径、字符串和资源地址。父类 `无`。

- `static extractUrlBase(e)` [源码:16266](../../eyes/src/vendor/three/core.js#L16266)：源码方法 extractUrlBase；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static resolveURL(e, t)` [源码:16270](../../eyes/src/vendor/three/core.js#L16270)：源码方法 resolveURL；作用以类职责与源码实现为准，未猜测压缩参数含义

### `InstancedBufferGeometry`

InstancedBuffer 几何生成器；构建 position/normal/uv 属性及三角索引。父类 `BufferGeometry`。

- `constructor()` [源码:16275](../../eyes/src/vendor/three/core.js#L16275)：当前操作：写入 instanceCount、isInstancedBufferGeometry、type；返回 无显式返回。
- `copy(source)` [源码:16278](../../eyes/src/vendor/three/core.js#L16278)：复制自身状态；需注意资源引用与深复制边界
- `toJSON()` [源码:16281](../../eyes/src/vendor/three/core.js#L16281)：序列化资源和引用；共享资源通过元数据缓存去重

### `BufferGeometryLoader`

Class for loading geometries. The files are internally loaded via {@link FileLoader}. ˋˋˋjs const loader = new THREE.BufferGeometryLoader(); const geometry = await loader.loadAsync( 'models/json/pressure.json' ); const material = new THREE.MeshBasicMaterial( { color: 0xF5F5F5 } ); const object = new THREE.Mesh( geometry, material ); scene.add( object ); ˋˋˋ @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:16307](../../eyes/src/vendor/three/core.js#L16307)：Constructs a new geometry loader. @param {LoadingManager} [manager] - The loading manager.
- `load(url, onLoad, onProgress, onError)` [源码:16318](../../eyes/src/vendor/three/core.js#L16318)：Starts loading from the given URL and pass the loaded geometry to the ˋonLoad()ˋ callback. @param {string} url - The path/URL of the file to be loaded. This can also be a data URI. @param {function(BufferGeometry)} onLoad - Executed when the loading process has been finished. @param {onProgressCallback} onProgress - Executed while the loading is in progress. @param {onErrorCallback} onError - Executed when errors occur.
- `parse(e)` [源码:16329](../../eyes/src/vendor/three/core.js#L16329)：把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调

### `ObjectLoader`

A loader for loading a JSON resource in the [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4). The files are internally loaded via {@link FileLoader}. ˋˋˋjs const loader = new THREE.ObjectLoader(); const obj = await loader.loadAsync( 'models/json/example.json' ); scene.add( obj ); // Alternatively, to parse a previously loaded JSON structure const object = await loader.parseAsync( a_json_object ); scene.add( object ); ˋˋˋ @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:16416](../../eyes/src/vendor/three/core.js#L16416)：Constructs a new object loader. @param {LoadingManager} [manager] - The loading manager.
- `load(e, t, n, r)` [源码:16419](../../eyes/src/vendor/three/core.js#L16419)：发起异步资源获取并交给解析路径；管理加载器回调和错误传播
- `loadAsync(e, t)` [源码:16436](../../eyes/src/vendor/three/core.js#L16436)：源码方法 loadAsync；作用以类职责与源码实现为准，未猜测压缩参数含义
- `parse(e, t)` [源码:16452](../../eyes/src/vendor/three/core.js#L16452)：把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调
- `parseAsync(json)` [源码:16479](../../eyes/src/vendor/three/core.js#L16479)：Async version of {@link ObjectLoader#parse}. @param {Object} json - The serialized 3D object. @return {Promise<Object3D>} A Promise that resolves with the parsed 3D object.
- `static registerGeometry(type, geometryClass)` [源码:16498](../../eyes/src/vendor/three/core.js#L16498)：Registers the given geometry at the internal geometry library. @static @param {string} type - The geometry type. @param {BufferGeometry.constructor} geometryClass - The geometry class.
- `parseShapes(e)` [源码:16501](../../eyes/src/vendor/three/core.js#L16501)：源码方法 parseShapes；作用以类职责与源码实现为准，未猜测压缩参数含义
- `parseSkeletons(e, t)` [源码:16509](../../eyes/src/vendor/three/core.js#L16509)：源码方法 parseSkeletons；作用以类职责与源码实现为准，未猜测压缩参数含义
- `parseGeometries(e, t)` [源码:16520](../../eyes/src/vendor/three/core.js#L16520)：源码方法 parseGeometries；作用以类职责与源码实现为准，未猜测压缩参数含义
- `parseMaterials(e, t)` [源码:16540](../../eyes/src/vendor/three/core.js#L16540)：源码方法 parseMaterials；作用以类职责与源码实现为准，未猜测压缩参数含义
- `parseAnimations(e)` [源码:16553](../../eyes/src/vendor/three/core.js#L16553)：源码方法 parseAnimations；作用以类职责与源码实现为准，未猜测压缩参数含义
- `parseImages(e, t)` [源码:16562](../../eyes/src/vendor/three/core.js#L16562)：源码方法 parseImages；作用以类职责与源码实现为准，未猜测压缩参数含义
- `parseImagesAsync(e)` [源码:16604](../../eyes/src/vendor/three/core.js#L16604)：源码方法 parseImagesAsync；作用以类职责与源码实现为准，未猜测压缩参数含义
- `parseTextures(e, t)` [源码:16641](../../eyes/src/vendor/three/core.js#L16641)：源码方法 parseTextures；作用以类职责与源码实现为准，未猜测压缩参数含义
- `parseObject(e, t, n, r, i)` [源码:16656](../../eyes/src/vendor/three/core.js#L16656)：源码方法 parseObject；作用以类职责与源码实现为准，未猜测压缩参数含义
- `bindSkeletons(e, t)` [源码:16783](../../eyes/src/vendor/three/core.js#L16783)：源码方法 bindSkeletons；作用以类职责与源码实现为准，未猜测压缩参数含义
- `bindLightTargets(e)` [源码:16791](../../eyes/src/vendor/three/core.js#L16791)：源码方法 bindLightTargets；作用以类职责与源码实现为准，未猜测压缩参数含义

### `ImageBitmapLoader`

A loader for loading images as an [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap). An ˋImageBitmapˋ provides an asynchronous and resource efficient pathway to prepare textures for rendering. Note that {@link Texture#flipY} and {@link Texture#premultiplyAlpha} are ignored with image bitmaps. These options need to be configured via {@link ImageBitmapLoader#setOptions} prior to loading, unlike regular images which can be configured on the Texture to set these options on GPU upload instead. To match the default behaviour of {@link Texture}, the following options are needed: ˋˋˋjs { imageOrientation: 'flipY', premultiplyAlpha: 'none' } ˋˋˋ Also note that unlike {@link FileLoader}, this loader will only avoid multiple concurrent requests to the same URL if {@link Cache} is enabled. ˋˋˋjs const loader = new THREE.ImageBitmapLoader(); loader.setOptions( { imageOrientation: 'flipY' } ); // set options if needed const imageBitmap = await loader.loadAsync( 'image.png' ); const texture = new THREE.Texture( imageBitmap ); texture.needsUpdate = true; ˋˋˋ @augments Loader。父类 `Loader`。

- `constructor(e)` [源码:16852](../../eyes/src/vendor/three/core.js#L16852)：当前操作：写入 _abortController、isImageBitmapLoader、options；返回 无显式返回。
- `setOptions(options)` [源码:16867](../../eyes/src/vendor/three/core.js#L16867)：Sets the given loader options. The structure of the object must match the ˋoptionsˋ parameter of [createImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/Window/createImageBitmap). Note: When caching is enabled, the cache key is based on the URL only. Loading the same URL with different options will return the cached result of the first request. @param {Object} options - The loader options to set. @return {ImageBitmapLoader} A reference to this image bitmap loader.
- `load(e, t, n, r)` [源码:16870](../../eyes/src/vendor/three/core.js#L16870)：发起异步资源获取并交给解析路径；管理加载器回调和错误传播
- `abort()` [源码:16899](../../eyes/src/vendor/three/core.js#L16899)：Aborts ongoing fetch requests. @return {ImageBitmapLoader} A reference to this instance.

### `AudioContext`

共享 Web Audio 上下文访问入口。父类 `无`。

- `static getContext()` [源码:16905](../../eyes/src/vendor/three/core.js#L16905)：源码方法 getContext；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static setContext(e)` [源码:16908](../../eyes/src/vendor/three/core.js#L16908)：源码方法 setContext；作用以类职责与源码实现为准，未猜测压缩参数含义

### `AudioLoader`

Class for loading audio buffers. Audios are internally loaded via {@link FileLoader}. ˋˋˋjs const audioListener = new THREE.AudioListener(); const ambientSound = new THREE.Audio( audioListener ); const loader = new THREE.AudioLoader(); const audioBuffer = await loader.loadAsync( 'audio/ambient_ocean.ogg' ); ambientSound.setBuffer( audioBuffer ); ambientSound.play(); ˋˋˋ @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:16935](../../eyes/src/vendor/three/core.js#L16935)：Constructs a new audio loader. @param {LoadingManager} [manager] - The loading manager.
- `load(e, t, n, r)` [源码:16938](../../eyes/src/vendor/three/core.js#L16938)：发起异步资源获取并交给解析路径；管理加载器回调和错误传播

### `StereoCamera`

生成左右眼视差相机。父类 `无`。

- `constructor()` [源码:16964](../../eyes/src/vendor/three/core.js#L16964)：当前操作：写入 _cache、aspect、cameraL、cameraL.matrixAutoUpdate、cameraR、cameraR.matrixAutoUpdate、eyeSep、type；返回 无显式返回。
- `update(e)` [源码:16975](../../eyes/src/vendor/three/core.js#L16975)：按当前时间或场景状态推进对象并维护缓存失效

### `CubeCamera`

从六个方向采集环境立方纹理。父类 `Object3D`。

- `constructor(e, t, renderTarget)` [源码:16990](../../eyes/src/vendor/three/core.js#L16990)：当前操作：写入 activeMipmapLevel、coordinateSystem、renderTarget、type；返回 无显式返回。
- `updateCoordinateSystem()` [源码:17005](../../eyes/src/vendor/three/core.js#L17005)：源码方法 updateCoordinateSystem；作用以类职责与源码实现为准，未猜测压缩参数含义
- `update(e, t)` [源码:17016](../../eyes/src/vendor/three/core.js#L17016)：按当前时间或场景状态推进对象并维护缓存失效

### `ArrayCamera`

This type of camera can be used in order to efficiently render a scene with a predefined set of cameras. This is an important performance aspect for rendering VR scenes. An instance of ˋArrayCameraˋ always has an array of sub cameras. It's mandatory to define for each sub camera the ˋviewportˋ property which determines the part of the viewport that is rendered with this camera. @augments PerspectiveCamera。父类 `PerspectiveCamera`。

- `constructor(array=[])` [源码:17052](../../eyes/src/vendor/three/core.js#L17052)：Constructs a new array camera. @param {Array<PerspectiveCamera>} [array=[]] - An array of perspective sub cameras.

### `Timer`

This class is an alternative to {@link Clock} with a different API design and behavior. The goal is to avoid the conceptual flaws that became apparent in ˋClockˋ over time. - ˋTimerˋ has an ˋupdate()ˋ method that updates its internal state. That makes it possible to call ˋgetDelta()ˋ and ˋgetElapsed()ˋ multiple times per simulation step without getting different values. - The class can make use of the Page Visibility API to avoid large time delta values when the app is inactive (e.g. tab switched or browser hidden). ˋˋˋjs const timer = new Timer(); timer.connect( document ); // use Page Visibility API ˋˋˋ。父类 `无`。

- `constructor()` [源码:17071](../../eyes/src/vendor/three/core.js#L17071)：当前操作：写入 _currentTime、_delta、_document、_elapsed、_pageVisibilityHandler、_previousTime、_startTime、_timescale；返回 无显式返回。
- `connect(e)` [源码:17074](../../eyes/src/vendor/three/core.js#L17074)：源码方法 connect；作用以类职责与源码实现为准，未猜测压缩参数含义
- `disconnect()` [源码:17077](../../eyes/src/vendor/three/core.js#L17077)：源码方法 disconnect；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getDelta()` [源码:17080](../../eyes/src/vendor/three/core.js#L17080)：源码方法 getDelta；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getElapsed()` [源码:17083](../../eyes/src/vendor/three/core.js#L17083)：源码方法 getElapsed；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getTimescale()` [源码:17091](../../eyes/src/vendor/three/core.js#L17091)：Returns the timescale. @return {number} The timescale.
- `setTimescale(timescale)` [源码:17101](../../eyes/src/vendor/three/core.js#L17101)：Sets the given timescale which scale the time delta computation in ˋupdate()ˋ. @param {number} timescale - The timescale to set. @return {Timer} A reference to this timer.
- `reset()` [源码:17109](../../eyes/src/vendor/three/core.js#L17109)：Resets the time computation for the current simulation step. @return {Timer} A reference to this timer.
- `dispose()` [源码:17112](../../eyes/src/vendor/three/core.js#L17112)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `update(e)` [源码:17115](../../eyes/src/vendor/three/core.js#L17115)：按当前时间或场景状态推进对象并维护缓存失效

### `AudioListener`

The class represents a virtual listener of the all positional and non-positional audio effects in the scene. A three.js application usually creates a single listener. It is a mandatory constructor parameter for audios entities like {@link Audio} and {@link PositionalAudio}. In most cases, the listener object is a child of the camera. So the 3D transformation of the camera represents the 3D transformation of the listener. @augments Object3D。父类 `Object3D`。

- `constructor()` [源码:17138](../../eyes/src/vendor/three/core.js#L17138)：当前操作：写入 _timer、context、filter、gain、timeDelta、type；返回 无显式返回。
- `getInput()` [源码:17148](../../eyes/src/vendor/three/core.js#L17148)：Returns the listener's input node. This method is used by other audio nodes to connect to this listener. @return {GainNode} The input node.
- `removeFilter()` [源码:17151](../../eyes/src/vendor/three/core.js#L17151)：源码方法 removeFilter；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getFilter()` [源码:17159](../../eyes/src/vendor/three/core.js#L17159)：Returns the current set filter. @return {?AudioNode} The filter.
- `setFilter(filter)` [源码:17162](../../eyes/src/vendor/three/core.js#L17162)：源码方法 setFilter；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getMasterVolume()` [源码:17170](../../eyes/src/vendor/three/core.js#L17170)：Returns the applications master volume. @return {number} The master volume.
- `setMasterVolume(e)` [源码:17173](../../eyes/src/vendor/three/core.js#L17173)：源码方法 setMasterVolume；作用以类职责与源码实现为准，未猜测压缩参数含义
- `updateMatrixWorld(force)` [源码:17176](../../eyes/src/vendor/three/core.js#L17176)：传播父级世界矩阵；matrixWorldNeedsUpdate 控制失效，递归更新子节点

### `Audio`

Represents a non-positional ( global ) audio object. This and related audio modules make use of the [Web Audio API](https://www.w3.org/TR/webaudio-1.1/). ˋˋˋjs // create an AudioListener and add it to the camera const listener = new THREE.AudioListener(); camera.add( listener ); // create a global audio source const sound = new THREE.Audio( listener ); // load a sound and set it as the Audio object's buffer const audioLoader = new THREE.AudioLoader(); audioLoader.load( 'sounds/ambient.ogg', function( buffer ) { sound.setBuffer( buffer ); sound.setLoop( true ); sound.setVolume( 0.5 ); sound.play(); }); ˋˋˋ @augments Object3D。父类 `Object3D`。

- `constructor(listener)` [源码:17211](../../eyes/src/vendor/three/core.js#L17211)：当前操作：写入 _connected、_progress、_startedAt、autoplay、buffer、context、detune、duration、filters、gain、hasPlaybackControl、isPlaying、listener、loop、loopEnd、loopStart、offset、playbackRate、source、sourceType、type；返回 无显式返回。
- `getOutput()` [源码:17219](../../eyes/src/vendor/three/core.js#L17219)：Returns the output audio node. @return {GainNode} The output node.
- `setNodeSource(source)` [源码:17222](../../eyes/src/vendor/three/core.js#L17222)：源码方法 setNodeSource；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setMediaElementSource(e)` [源码:17225](../../eyes/src/vendor/three/core.js#L17225)：源码方法 setMediaElementSource；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setMediaStreamSource(e)` [源码:17228](../../eyes/src/vendor/three/core.js#L17228)：源码方法 setMediaStreamSource；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setBuffer(buffer)` [源码:17231](../../eyes/src/vendor/three/core.js#L17231)：源码方法 setBuffer；作用以类职责与源码实现为准，未猜测压缩参数含义
- `play(e=0)` [源码:17234](../../eyes/src/vendor/three/core.js#L17234)：源码方法 play；作用以类职责与源码实现为准，未猜测压缩参数含义
- `pause()` [源码:17241](../../eyes/src/vendor/three/core.js#L17241)：源码方法 pause；作用以类职责与源码实现为准，未猜测压缩参数含义
- `stop(e=0)` [源码:17245](../../eyes/src/vendor/three/core.js#L17245)：源码方法 stop；作用以类职责与源码实现为准，未猜测压缩参数含义
- `connect()` [源码:17249](../../eyes/src/vendor/three/core.js#L17249)：源码方法 connect；作用以类职责与源码实现为准，未猜测压缩参数含义
- `disconnect()` [源码:17257](../../eyes/src/vendor/three/core.js#L17257)：源码方法 disconnect；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getFilters()` [源码:17272](../../eyes/src/vendor/three/core.js#L17272)：Returns the current set filters. @return {Array<AudioNode>} The list of filters.
- `setFilters(e)` [源码:17275](../../eyes/src/vendor/three/core.js#L17275)：源码方法 setFilters；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setDetune(detune)` [源码:17278](../../eyes/src/vendor/three/core.js#L17278)：源码方法 setDetune；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getDetune()` [源码:17286](../../eyes/src/vendor/three/core.js#L17286)：Returns the detuning of oscillation in cents. @return {number} The detuning of oscillation in cents.
- `getFilter()` [源码:17294](../../eyes/src/vendor/three/core.js#L17294)：Returns the first filter in the list of filters. @return {AudioNode\|undefined} The first filter in the list of filters.
- `setFilter(filter)` [源码:17303](../../eyes/src/vendor/three/core.js#L17303)：Applies a single filter node to the audio. @param {AudioNode} [filter] - The filter to set. @return {Audio} A reference to this instance.
- `setPlaybackRate(playbackRate)` [源码:17306](../../eyes/src/vendor/three/core.js#L17306)：源码方法 setPlaybackRate；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getPlaybackRate()` [源码:17314](../../eyes/src/vendor/three/core.js#L17314)：Returns the current playback rate. @return {number} The playback rate.
- `onEnded()` [源码:17317](../../eyes/src/vendor/three/core.js#L17317)：源码方法 onEnded；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getLoop()` [源码:17320](../../eyes/src/vendor/three/core.js#L17320)：源码方法 getLoop；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setLoop(loop)` [源码:17323](../../eyes/src/vendor/three/core.js#L17323)：源码方法 setLoop；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setLoopStart(value)` [源码:17334](../../eyes/src/vendor/three/core.js#L17334)：Sets the loop start value which defines where in the audio buffer the replay should start, in seconds. @param {number} value - The loop start value. @return {Audio} A reference to this instance.
- `setLoopEnd(value)` [源码:17344](../../eyes/src/vendor/three/core.js#L17344)：Sets the loop end value which defines where in the audio buffer the replay should stop, in seconds. @param {number} value - The loop end value. @return {Audio} A reference to this instance.
- `getVolume()` [源码:17352](../../eyes/src/vendor/three/core.js#L17352)：Returns the volume. @return {number} The volume.
- `setVolume(e)` [源码:17355](../../eyes/src/vendor/three/core.js#L17355)：源码方法 setVolume；作用以类职责与源码实现为准，未猜测压缩参数含义
- `copy(e, t)` [源码:17358](../../eyes/src/vendor/three/core.js#L17358)：复制自身状态；需注意资源引用与深复制边界
- `clone(recursive)` [源码:17361](../../eyes/src/vendor/three/core.js#L17361)：以构造器和 copy 建立副本，资源共享规则由 copy 决定

### `PositionalAudio`

Represents a positional audio object. ˋˋˋjs // create an AudioListener and add it to the camera const listener = new THREE.AudioListener(); camera.add( listener ); // create the PositionalAudio object (passing in the listener) const sound = new THREE.PositionalAudio( listener ); // load a sound and set it as the PositionalAudio object's buffer const audioLoader = new THREE.AudioLoader(); audioLoader.load( 'sounds/song.ogg', function( buffer ) { sound.setBuffer( buffer ); sound.setRefDistance( 20 ); sound.play(); }); // create an object for the sound to play from const sphere = new THREE.SphereGeometry( 20, 32, 16 ); const material = new THREE.MeshPhongMaterial( { color: 0xff2200 } ); const mesh = new THREE.Mesh( sphere, material ); scene.add( mesh ); // finally add the sound to the mesh mesh.add( sound ); @augments Audio。父类 `Audio`。

- `constructor(e)` [源码:17400](../../eyes/src/vendor/three/core.js#L17400)：当前操作：写入 panner、panner.panningModel；返回 无显式返回。
- `connect()` [源码:17403](../../eyes/src/vendor/three/core.js#L17403)：源码方法 connect；作用以类职责与源码实现为准，未猜测压缩参数含义
- `disconnect()` [源码:17406](../../eyes/src/vendor/three/core.js#L17406)：源码方法 disconnect；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getOutput()` [源码:17409](../../eyes/src/vendor/three/core.js#L17409)：源码方法 getOutput；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getRefDistance()` [源码:17417](../../eyes/src/vendor/three/core.js#L17417)：Returns the current reference distance. @return {number} The reference distance.
- `setRefDistance(value)` [源码:17428](../../eyes/src/vendor/three/core.js#L17428)：Defines the reference distance for reducing volume as the audio source moves further from the listener – i.e. the distance at which the volume reduction starts taking effect. @param {number} value - The reference distance to set. @return {PositionalAudio} A reference to this instance.
- `getRolloffFactor()` [源码:17436](../../eyes/src/vendor/three/core.js#L17436)：Returns the current rolloff factor. @return {number} The rolloff factor.
- `setRolloffFactor(value)` [源码:17445](../../eyes/src/vendor/three/core.js#L17445)：Defines how quickly the volume is reduced as the source moves away from the listener. @param {number} value - The rolloff factor. @return {PositionalAudio} A reference to this instance.
- `getDistanceModel()` [源码:17453](../../eyes/src/vendor/three/core.js#L17453)：Returns the current distance model. @return {('linear'\|'inverse'\|'exponential')} The distance model.
- `setDistanceModel(value)` [源码:17466](../../eyes/src/vendor/three/core.js#L17466)：Defines which algorithm to use to reduce the volume of the audio source as it moves away from the listener. Read [the spec](https://www.w3.org/TR/webaudio-1.1/#enumdef-distancemodeltype) for more details. @param {('linear'\|'inverse'\|'exponential')} value - The distance model to set. @return {PositionalAudio} A reference to this instance.
- `getMaxDistance()` [源码:17474](../../eyes/src/vendor/three/core.js#L17474)：Returns the current max distance. @return {number} The max distance.
- `setMaxDistance(value)` [源码:17486](../../eyes/src/vendor/three/core.js#L17486)：Defines the maximum distance between the audio source and the listener, after which the volume is not reduced any further. This value is used only by the ˋlinearˋ distance model. @param {number} value - The max distance. @return {PositionalAudio} A reference to this instance.
- `setDirectionalCone(coneInnerAngle, coneOuterAngle, coneOuterGain)` [源码:17497](../../eyes/src/vendor/three/core.js#L17497)：Sets the directional cone in which the audio can be listened. @param {number} coneInnerAngle - An angle, in degrees, of a cone inside of which there will be no volume reduction. @param {number} coneOuterAngle - An angle, in degrees, of a cone outside of which the volume will be reduced by a constant value, defined by the ˋconeOuterGainˋ parameter. @param {number} coneOuterGain - The amount of volume reduction outside the cone defined by the ˋconeOuterAngleˋ. When set to ˋ0ˋ, no sound can be heard. @return {PositionalAudio} A reference to this instance.
- `updateMatrixWorld(e)` [源码:17500](../../eyes/src/vendor/three/core.js#L17500)：传播父级世界矩阵；matrixWorldNeedsUpdate 控制失效，递归更新子节点

### `AudioAnalyser`

This class can be used to analyse audio data. ˋˋˋjs // create an AudioListener and add it to the camera const listener = new THREE.AudioListener(); camera.add( listener ); // create an Audio source const sound = new THREE.Audio( listener ); // load a sound and set it as the Audio object's buffer const audioLoader = new THREE.AudioLoader(); audioLoader.load( 'sounds/ambient.ogg', function( buffer ) { sound.setBuffer( buffer ); sound.setLoop(true); sound.setVolume(0.5); sound.play(); }); // create an AudioAnalyser, passing in the sound and desired fftSize const analyser = new THREE.AudioAnalyser( sound, 32 ); // get the average frequency of the sound const data = analyser.getAverageFrequency(); ˋˋˋ。父类 `无`。

- `constructor(audio, fftSize=2048)` [源码:17544](../../eyes/src/vendor/three/core.js#L17544)：Constructs a new audio analyzer. @param {Audio} audio - The audio to analyze. @param {number} [fftSize=2048] - The window size in samples that is used when performing a Fast Fourier Transform (FFT) to get frequency domain data.
- `getFrequencyData()` [源码:17557](../../eyes/src/vendor/three/core.js#L17557)：Returns an array with frequency data of the audio. Each item in the array represents the decibel value for a specific frequency. The frequencies are spread linearly from 0 to 1/2 of the sample rate. For example, for 48000 sample rate, the last item of the array will represent the decibel value for 24000 Hz. @return {Uint8Array} The frequency data.
- `getAverageFrequency()` [源码:17560](../../eyes/src/vendor/three/core.js#L17560)：源码方法 getAverageFrequency；作用以类职责与源码实现为准，未猜测压缩参数含义

### `PropertyMixer`

Buffered scene graph property that allows weighted accumulation; used internally.。父类 `无`。

- `constructor(binding, t, valueSize)` [源码:17571](../../eyes/src/vendor/three/core.js#L17571)：当前操作：写入 _addIndex、_mixBufferRegion、_mixBufferRegionAdditive、_origIndex、_setIdentity、_workIndex、binding、buffer、cumulativeWeight、cumulativeWeightAdditive、referenceCount、useCount、valueSize；返回 无显式返回。
- `accumulate(e, t)` [源码:17586](../../eyes/src/vendor/three/core.js#L17586)：源码方法 accumulate；作用以类职责与源码实现为准，未猜测压缩参数含义
- `accumulateAdditive(cumulativeWeightAdditive)` [源码:17601](../../eyes/src/vendor/three/core.js#L17601)：源码方法 accumulateAdditive；作用以类职责与源码实现为准，未猜测压缩参数含义
- `apply(e)` [源码:17607](../../eyes/src/vendor/three/core.js#L17607)：源码方法 apply；作用以类职责与源码实现为准，未猜测压缩参数含义
- `saveOriginalState()` [源码:17624](../../eyes/src/vendor/three/core.js#L17624)：源码方法 saveOriginalState；作用以类职责与源码实现为准，未猜测压缩参数含义
- `restoreOriginalState()` [源码:17633](../../eyes/src/vendor/three/core.js#L17633)：源码方法 restoreOriginalState；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setAdditiveIdentityNumeric()` [源码:17637](../../eyes/src/vendor/three/core.js#L17637)：源码方法 _setAdditiveIdentityNumeric；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setAdditiveIdentityQuaternion()` [源码:17642](../../eyes/src/vendor/three/core.js#L17642)：源码方法 _setAdditiveIdentityQuaternion；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setAdditiveIdentityOther()` [源码:17645](../../eyes/src/vendor/three/core.js#L17645)：源码方法 _setAdditiveIdentityOther；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_select(e, t, n, r, i)` [源码:17650](../../eyes/src/vendor/three/core.js#L17650)：源码方法 _select；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_slerp(buffer, dstOffset, srcOffset, t)` [源码:17653](../../eyes/src/vendor/three/core.js#L17653)：源码方法 _slerp；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_slerpAdditive(buffer, dstOffset, srcOffset, t, stride)` [源码:17656](../../eyes/src/vendor/three/core.js#L17656)：源码方法 _slerpAdditive；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_lerp(buffer, dstOffset, srcOffset, t, stride)` [源码:17660](../../eyes/src/vendor/three/core.js#L17660)：源码方法 _lerp；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_lerpAdditive(buffer, dstOffset, srcOffset, t, stride)` [源码:17667](../../eyes/src/vendor/three/core.js#L17667)：源码方法 _lerpAdditive；作用以类职责与源码实现为准，未猜测压缩参数含义

### `PropertyBinding`

Note: This class uses a State pattern on a per-method basis: 'bind' sets 'this.getValue' / 'setValue' and shadows the prototype version of these methods with one that represents the bound state. When the property is not found, the methods become no-ops. This holds a reference to a real property in the scene graph; used internally.。父类 `无`。

- `constructor(rootNode, path, parsedPath)` [源码:17697](../../eyes/src/vendor/three/core.js#L17697)：Constructs a new property binding. @param {Object} rootNode - The root node. @param {string} path - The path. @param {?Object} [parsedPath] - The parsed path.
- `static create(e, t, n)` [源码:17700](../../eyes/src/vendor/three/core.js#L17700)：源码方法 create；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static sanitizeNodeName(e)` [源码:17703](../../eyes/src/vendor/three/core.js#L17703)：源码方法 sanitizeNodeName；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static parseTrackName(e)` [源码:17706](../../eyes/src/vendor/three/core.js#L17706)：源码方法 parseTrackName；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static findNode(e, t)` [源码:17724](../../eyes/src/vendor/three/core.js#L17724)：源码方法 findNode；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_getValue_unavailable()` [源码:17745](../../eyes/src/vendor/three/core.js#L17745)：源码方法 _getValue_unavailable；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setValue_unavailable()` [源码:17746](../../eyes/src/vendor/three/core.js#L17746)：源码方法 _setValue_unavailable；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_getValue_direct(buffer, offset)` [源码:17747](../../eyes/src/vendor/three/core.js#L17747)：源码方法 _getValue_direct；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_getValue_array(e, t)` [源码:17750](../../eyes/src/vendor/three/core.js#L17750)：源码方法 _getValue_array；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_getValue_arrayElement(buffer, offset)` [源码:17754](../../eyes/src/vendor/three/core.js#L17754)：源码方法 _getValue_arrayElement；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_getValue_toArray(buffer, offset)` [源码:17757](../../eyes/src/vendor/three/core.js#L17757)：源码方法 _getValue_toArray；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setValue_direct(buffer, offset)` [源码:17760](../../eyes/src/vendor/three/core.js#L17760)：源码方法 _setValue_direct；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setValue_direct_setNeedsUpdate(buffer, offset)` [源码:17763](../../eyes/src/vendor/three/core.js#L17763)：源码方法 _setValue_direct_setNeedsUpdate；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setValue_direct_setMatrixWorldNeedsUpdate(buffer, offset)` [源码:17766](../../eyes/src/vendor/three/core.js#L17766)：源码方法 _setValue_direct_setMatrixWorldNeedsUpdate；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setValue_array(e, t)` [源码:17769](../../eyes/src/vendor/three/core.js#L17769)：源码方法 _setValue_array；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setValue_array_setNeedsUpdate(e, t)` [源码:17773](../../eyes/src/vendor/three/core.js#L17773)：源码方法 _setValue_array_setNeedsUpdate；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setValue_array_setMatrixWorldNeedsUpdate(e, t)` [源码:17778](../../eyes/src/vendor/three/core.js#L17778)：源码方法 _setValue_array_setMatrixWorldNeedsUpdate；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setValue_arrayElement(buffer, offset)` [源码:17783](../../eyes/src/vendor/three/core.js#L17783)：源码方法 _setValue_arrayElement；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setValue_arrayElement_setNeedsUpdate(buffer, offset)` [源码:17786](../../eyes/src/vendor/three/core.js#L17786)：源码方法 _setValue_arrayElement_setNeedsUpdate；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setValue_arrayElement_setMatrixWorldNeedsUpdate(buffer, offset)` [源码:17789](../../eyes/src/vendor/three/core.js#L17789)：源码方法 _setValue_arrayElement_setMatrixWorldNeedsUpdate；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setValue_fromArray(buffer, offset)` [源码:17792](../../eyes/src/vendor/three/core.js#L17792)：源码方法 _setValue_fromArray；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setValue_fromArray_setNeedsUpdate(buffer, offset)` [源码:17795](../../eyes/src/vendor/three/core.js#L17795)：源码方法 _setValue_fromArray_setNeedsUpdate；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setValue_fromArray_setMatrixWorldNeedsUpdate(buffer, offset)` [源码:17798](../../eyes/src/vendor/three/core.js#L17798)：源码方法 _setValue_fromArray_setMatrixWorldNeedsUpdate；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_getValue_unbound(targetArray, offset)` [源码:17801](../../eyes/src/vendor/three/core.js#L17801)：源码方法 _getValue_unbound；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setValue_unbound(sourceArray, offset)` [源码:17804](../../eyes/src/vendor/three/core.js#L17804)：源码方法 _setValue_unbound；作用以类职责与源码实现为准，未猜测压缩参数含义
- `bind()` [源码:17807](../../eyes/src/vendor/three/core.js#L17807)：源码方法 bind；作用以类职责与源码实现为准，未猜测压缩参数含义
- `unbind()` [源码:17865](../../eyes/src/vendor/three/core.js#L17865)：源码方法 unbind；作用以类职责与源码实现为准，未猜测压缩参数含义

### `Composite`

精确业务语义尚未确认，以下提供声明与操作证据。。父类 `无`。

- `constructor(targetGroup, t, n)` [源码:17870](../../eyes/src/vendor/three/core.js#L17870)：当前操作：写入 _bindings、_targetGroup；返回 无显式返回。
- `getValue(e, t)` [源码:17874](../../eyes/src/vendor/three/core.js#L17874)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setValue(e, t)` [源码:17880](../../eyes/src/vendor/three/core.js#L17880)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `bind()` [源码:17884](../../eyes/src/vendor/three/core.js#L17884)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `unbind()` [源码:17888](../../eyes/src/vendor/three/core.js#L17888)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `AnimationObjectGroup`

让多个对象共享同一组动画绑定。父类 `无`。

- `constructor()` [源码:17903](../../eyes/src/vendor/three/core.js#L17903)：当前操作：写入 _bindings、_bindingsIndicesByPath、_indicesByUUID、_objects、_parsedPaths、_paths、isAnimationObjectGroup、nCachedObjects_、stats、uuid；返回 无显式返回。
- `add()` [源码:17924](../../eyes/src/vendor/three/core.js#L17924)：源码方法 add；作用以类职责与源码实现为准，未猜测压缩参数含义
- `remove()` [源码:17956](../../eyes/src/vendor/three/core.js#L17956)：源码方法 remove；作用以类职责与源码实现为准，未猜测压缩参数含义
- `uncache()` [源码:17980](../../eyes/src/vendor/three/core.js#L17980)：源码方法 uncache；作用以类职责与源码实现为准，未猜测压缩参数含义
- `subscribe_(e, t)` [源码:18014](../../eyes/src/vendor/three/core.js#L18014)：源码方法 subscribe_；作用以类职责与源码实现为准，未猜测压缩参数含义
- `unsubscribe_(e)` [源码:18032](../../eyes/src/vendor/three/core.js#L18032)：源码方法 unsubscribe_；作用以类职责与源码实现为准，未猜测压缩参数含义

### `AnimationAction`

An instance of ˋAnimationActionˋ schedules the playback of an animation which is stored in {@link AnimationClip}.。父类 `无`。

- `constructor(mixer, clip, localRoot=null, blendMode=clip.blendMode)` [源码:18050](../../eyes/src/vendor/three/core.js#L18050)：当前操作：写入 _byClipCacheIndex、_cacheIndex、_clip、_effectiveTimeScale、_effectiveWeight、_interpolantSettings、_interpolants、_localRoot、_loopCount、_mixer、_propertyBindings、_restoreTimeScale、_startTime、_timeScaleInterpolant、_weightInterpolant、blendMode、clampWhenFinished、enabled、loop、paused、repetitions、time、timeScale、weight、zeroSlopeAtEnd、zeroSlopeAtStart；返回 无显式返回。
- `play()` [源码:18070](../../eyes/src/vendor/three/core.js#L18070)：Starts the playback of the animation. @return {AnimationAction} A reference to this animation action.
- `stop()` [源码:18078](../../eyes/src/vendor/three/core.js#L18078)：Stops the playback of the animation. @return {AnimationAction} A reference to this animation action.
- `reset()` [源码:18086](../../eyes/src/vendor/three/core.js#L18086)：Resets the playback of the animation. @return {AnimationAction} A reference to this animation action.
- `isRunning()` [源码:18089](../../eyes/src/vendor/three/core.js#L18089)：源码方法 isRunning；作用以类职责与源码实现为准，未猜测压缩参数含义
- `isScheduled()` [源码:18097](../../eyes/src/vendor/three/core.js#L18097)：Returns ˋtrueˋ when {@link AnimationAction#play} has been called. @return {boolean} Whether the animation is scheduled or not.
- `startAt(time)` [源码:18106](../../eyes/src/vendor/three/core.js#L18106)：Defines the time when the animation should start. @param {number} time - The start time in seconds. @return {AnimationAction} A reference to this animation action.
- `setLoop(mode, repetitions)` [源码:18116](../../eyes/src/vendor/three/core.js#L18116)：Configures the loop settings for this action. @param {(LoopRepeat\|LoopOnce\|LoopPingPong)} mode - The loop mode. @param {number} repetitions - The number of repetitions. @return {AnimationAction} A reference to this animation action.
- `setEffectiveWeight(weight)` [源码:18128](../../eyes/src/vendor/three/core.js#L18128)：Sets the effective weight of this action. An action has no effect and thus an effective weight of zero when the action is disabled. @param {number} weight - The weight to set. @return {AnimationAction} A reference to this animation action.
- `getEffectiveWeight()` [源码:18136](../../eyes/src/vendor/three/core.js#L18136)：Returns the effective weight of this action. @return {number} The effective weight.
- `fadeIn(duration)` [源码:18146](../../eyes/src/vendor/three/core.js#L18146)：Fades the animation in by increasing its weight gradually from ˋ0ˋ to ˋ1ˋ, within the passed time interval. @param {number} duration - The duration of the fade. @return {AnimationAction} A reference to this animation action.
- `fadeOut(duration)` [源码:18156](../../eyes/src/vendor/three/core.js#L18156)：Fades the animation out by decreasing its weight gradually from ˋ1ˋ to ˋ0ˋ, within the passed time interval. @param {number} duration - The duration of the fade. @return {AnimationAction} A reference to this animation action.
- `crossFadeFrom(e, t, n=!1)` [源码:18159](../../eyes/src/vendor/three/core.js#L18159)：源码方法 crossFadeFrom；作用以类职责与源码实现为准，未猜测压缩参数含义
- `crossFadeTo(fadeInAction, duration, warp=!1)` [源码:18178](../../eyes/src/vendor/three/core.js#L18178)：Causes this action to fade out and the given action to fade in, within the passed time interval. @param {AnimationAction} fadeInAction - The animation action to fade in. @param {number} duration - The duration of the fade. @param {boolean} [warp=false] - Whether warping should be used or not. @return {AnimationAction} A reference to this animation action.
- `stopFading()` [源码:18181](../../eyes/src/vendor/three/core.js#L18181)：源码方法 stopFading；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setEffectiveTimeScale(timeScale)` [源码:18194](../../eyes/src/vendor/three/core.js#L18194)：Sets the effective time scale of this action. An action has no effect and thus an effective time scale of zero when the action is paused. @param {number} timeScale - The time scale to set. @return {AnimationAction} A reference to this animation action.
- `getEffectiveTimeScale()` [源码:18202](../../eyes/src/vendor/three/core.js#L18202)：Returns the effective time scale of this action. @return {number} The effective time scale.
- `setDuration(duration)` [源码:18211](../../eyes/src/vendor/three/core.js#L18211)：Sets the duration for a single loop of this action. @param {number} duration - The duration to set. @return {AnimationAction} A reference to this animation action.
- `syncWith(action)` [源码:18220](../../eyes/src/vendor/three/core.js#L18220)：Synchronizes this action with the passed other action. @param {AnimationAction} action - The action to sync with. @return {AnimationAction} A reference to this animation action.
- `halt(duration)` [源码:18229](../../eyes/src/vendor/three/core.js#L18229)：Decelerates this animation's speed to ˋ0ˋ within the passed time interval. @param {number} duration - The duration. @return {AnimationAction} A reference to this animation action.
- `warp(e, t, n)` [源码:18232](../../eyes/src/vendor/three/core.js#L18232)：源码方法 warp；作用以类职责与源码实现为准，未猜测压缩参数含义
- `stopWarping()` [源码:18242](../../eyes/src/vendor/three/core.js#L18242)：源码方法 stopWarping；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getMixer()` [源码:18251](../../eyes/src/vendor/three/core.js#L18251)：Returns the animation mixer of this animation action. @return {AnimationMixer} The animation mixer.
- `getClip()` [源码:18259](../../eyes/src/vendor/three/core.js#L18259)：Returns the animation clip of this animation action. @return {AnimationClip} The animation clip.
- `getRoot()` [源码:18267](../../eyes/src/vendor/three/core.js#L18267)：Returns the root object of this animation action. @return {Object3D} The root object.
- `_update(e, t, n, r)` [源码:18270](../../eyes/src/vendor/three/core.js#L18270)：源码方法 _update；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_updateWeight(e)` [源码:18286](../../eyes/src/vendor/three/core.js#L18286)：源码方法 _updateWeight；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_updateTimeScale(e)` [源码:18298](../../eyes/src/vendor/three/core.js#L18298)：源码方法 _updateTimeScale；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_updateTime(e)` [源码:18309](../../eyes/src/vendor/three/core.js#L18309)：源码方法 _updateTime；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_setEndings(e, t, n)` [源码:18357](../../eyes/src/vendor/three/core.js#L18357)：源码方法 _setEndings；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_scheduleFading(e, t, n)` [源码:18361](../../eyes/src/vendor/three/core.js#L18361)：源码方法 _scheduleFading；作用以类职责与源码实现为准，未猜测压缩参数含义

### `AnimationMixer`

ˋAnimationMixerˋ is a player for animations on a particular object in the scene. When multiple objects in the scene are animated independently, one ˋAnimationMixerˋ may be used for each object.。父类 `EventDispatcher`。

- `constructor(root)` [源码:18378](../../eyes/src/vendor/three/core.js#L18378)：当前操作：写入 _accuIndex、_root、time、timeScale；返回 无显式返回。
- `_bindAction(e, t)` [源码:18383](../../eyes/src/vendor/three/core.js#L18383)：源码方法 _bindAction；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_activateAction(e)` [源码:18408](../../eyes/src/vendor/three/core.js#L18408)：源码方法 _activateAction；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_deactivateAction(e)` [源码:18424](../../eyes/src/vendor/three/core.js#L18424)：源码方法 _deactivateAction；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_initMemoryManager()` [源码:18434](../../eyes/src/vendor/three/core.js#L18434)：源码方法 _initMemoryManager；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_isActiveAction(e)` [源码:18464](../../eyes/src/vendor/three/core.js#L18464)：源码方法 _isActiveAction；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_addInactiveAction(e, t, n)` [源码:18468](../../eyes/src/vendor/three/core.js#L18468)：源码方法 _addInactiveAction；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_removeInactiveAction(e)` [源码:18481](../../eyes/src/vendor/three/core.js#L18481)：源码方法 _removeInactiveAction；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_removeInactiveBindingsForAction(e)` [源码:18495](../../eyes/src/vendor/three/core.js#L18495)：源码方法 _removeInactiveBindingsForAction；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_lendAction(action)` [源码:18502](../../eyes/src/vendor/three/core.js#L18502)：源码方法 _lendAction；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_takeBackAction(action)` [源码:18509](../../eyes/src/vendor/three/core.js#L18509)：源码方法 _takeBackAction；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_addInactiveBinding(e, t, n)` [源码:18516](../../eyes/src/vendor/three/core.js#L18516)：源码方法 _addInactiveBinding；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_removeInactiveBinding(e)` [源码:18522](../../eyes/src/vendor/three/core.js#L18522)：源码方法 _removeInactiveBinding；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_lendBinding(binding)` [源码:18533](../../eyes/src/vendor/three/core.js#L18533)：源码方法 _lendBinding；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_takeBackBinding(binding)` [源码:18540](../../eyes/src/vendor/three/core.js#L18540)：源码方法 _takeBackBinding；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_lendControlInterpolant()` [源码:18547](../../eyes/src/vendor/three/core.js#L18547)：源码方法 _lendControlInterpolant；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_takeBackControlInterpolant(interpolant)` [源码:18553](../../eyes/src/vendor/three/core.js#L18553)：源码方法 _takeBackControlInterpolant；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clipAction(e, t, n)` [源码:18560](../../eyes/src/vendor/three/core.js#L18560)：源码方法 clipAction；作用以类职责与源码实现为准，未猜测压缩参数含义
- `existingAction(e, t)` [源码:18576](../../eyes/src/vendor/three/core.js#L18576)：源码方法 existingAction；作用以类职责与源码实现为准，未猜测压缩参数含义
- `stopAllAction()` [源码:18584](../../eyes/src/vendor/three/core.js#L18584)：源码方法 stopAllAction；作用以类职责与源码实现为准，未猜测压缩参数含义
- `update(time)` [源码:18589](../../eyes/src/vendor/three/core.js#L18589)：按当前时间或场景状态推进对象并维护缓存失效
- `setTime(e)` [源码:18604](../../eyes/src/vendor/three/core.js#L18604)：源码方法 setTime；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getRoot()` [源码:18614](../../eyes/src/vendor/three/core.js#L18614)：Returns this mixer's root object. @return {Object3D} The mixer's root object.
- `uncacheClip(e)` [源码:18617](../../eyes/src/vendor/three/core.js#L18617)：源码方法 uncacheClip；作用以类职责与源码实现为准，未猜测压缩参数含义
- `uncacheRoot(e)` [源码:18634](../../eyes/src/vendor/three/core.js#L18634)：源码方法 uncacheRoot；作用以类职责与源码实现为准，未猜测压缩参数含义
- `uncacheAction(e, t)` [源码:18647](../../eyes/src/vendor/three/core.js#L18647)：源码方法 uncacheAction；作用以类职责与源码实现为准，未猜测压缩参数含义

### `RenderTarget3D`

Represents a 3D render target. @augments RenderTarget。父类 `RenderTarget`。

- `constructor(width=1, height=1, depth=1, options={})` [源码:18666](../../eyes/src/vendor/three/core.js#L18666)：Constructs a new 3D render target. @param {number} [width=1] - The width of the render target. @param {number} [height=1] - The height of the render target. @param {number} [depth=1] - The height of the render target. @param {RenderTarget~Options} [options] - The configuration object.

### `Uniform`

Represents a uniform which is a global shader variable. They are passed to shader programs. When declaring a uniform of a {@link ShaderMaterial}, it is declared by value or by object. ˋˋˋjs uniforms: { time: { value: 1.0 }, resolution: new Uniform( new Vector2() ) }; ˋˋˋ Since this class can only be used in context of {@link ShaderMaterial}, it is only supported in {@link WebGLRenderer}.。父类 `无`。

- `constructor(value)` [源码:18689](../../eyes/src/vendor/three/core.js#L18689)：Constructs a new uniform. @param {any} value - The uniform value.
- `clone()` [源码:18692](../../eyes/src/vendor/three/core.js#L18692)：以构造器和 copy 建立副本，资源共享规则由 copy 决定

### `UniformsGroup`

A class for managing multiple uniforms in a single group. The renderer will process such a definition as a single UBO. Since this class can only be used in context of {@link ShaderMaterial}, it is only supported in {@link WebGLRenderer}. @augments EventDispatcher。父类 `EventDispatcher`。

- `constructor()` [源码:18707](../../eyes/src/vendor/three/core.js#L18707)：当前操作：写入 isUniformsGroup、name、uniforms、usage；返回 无显式返回。
- `add(uniform)` [源码:18718](../../eyes/src/vendor/three/core.js#L18718)：Adds the given uniform to this uniforms group. @param {Uniform} uniform - The uniform to add. @return {UniformsGroup} A reference to this uniforms group.
- `remove(e)` [源码:18721](../../eyes/src/vendor/three/core.js#L18721)：源码方法 remove；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setName(name)` [源码:18731](../../eyes/src/vendor/three/core.js#L18731)：Sets the name of this uniforms group. @param {string} name - The name to set. @return {UniformsGroup} A reference to this uniforms group.
- `setUsage(value)` [源码:18740](../../eyes/src/vendor/three/core.js#L18740)：Sets the usage of this uniforms group. @param {(StaticDrawUsage\|DynamicDrawUsage\|StreamDrawUsage\|StaticReadUsage\|DynamicReadUsage\|StreamReadUsage\|StaticCopyUsage\|DynamicCopyUsage\|StreamCopyUsage)} value - The usage to set. @return {UniformsGroup} A reference to this uniforms group.
- `dispose()` [源码:18743](../../eyes/src/vendor/three/core.js#L18743)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `copy(e)` [源码:18748](../../eyes/src/vendor/three/core.js#L18748)：复制自身状态；需注意资源引用与深复制边界
- `clone()` [源码:18763](../../eyes/src/vendor/three/core.js#L18763)：Returns a new uniforms group with copied values from this instance. @return {UniformsGroup} A clone of this instance.

### `InstancedInterleavedBuffer`

An instanced version of an interleaved buffer. @augments InterleavedBuffer。父类 `InterleavedBuffer`。

- `constructor(array, stride, meshPerAttribute=1)` [源码:18780](../../eyes/src/vendor/three/core.js#L18780)：Constructs a new instanced interleaved buffer. @param {TypedArray} array - A typed array with a shared buffer storing attribute data. @param {number} stride - The number of typed-array elements per vertex. @param {number} [meshPerAttribute=1] - Defines how often a value of this interleaved buffer should be repeated.
- `copy(source)` [源码:18783](../../eyes/src/vendor/three/core.js#L18783)：复制自身状态；需注意资源引用与深复制边界
- `clone(data)` [源码:18786](../../eyes/src/vendor/three/core.js#L18786)：以构造器和 copy 建立副本，资源共享规则由 copy 决定
- `toJSON(data)` [源码:18790](../../eyes/src/vendor/three/core.js#L18790)：序列化资源和引用；共享资源通过元数据缓存去重

### `GLBufferAttribute`

An alternative version of a buffer attribute with more control over the VBO. The renderer does not construct a VBO for this kind of attribute. Instead, it uses whatever VBO is passed in constructor and can later be altered via the ˋbufferˋ property. The most common use case for this class is when some kind of GPGPU calculation interferes or even produces the VBOs in question. Notice that this class can only be used with {@link WebGLRenderer}.。父类 `无`。

- `constructor(buffer, type, itemSize, elementSize, count, normalized=!1)` [源码:18807](../../eyes/src/vendor/three/core.js#L18807)：当前操作：写入 buffer、count、elementSize、isGLBufferAttribute、itemSize、name、normalized、type、version；返回 无显式返回。
- `set needsUpdate(e)` [源码:18810](../../eyes/src/vendor/three/core.js#L18810)：仅输入 true 时递增 version，标记资源需要重新上传或刷新
- `setBuffer(buffer)` [源码:18819](../../eyes/src/vendor/three/core.js#L18819)：Sets the given native WebGL buffer. @param {WebGLBuffer} buffer - The buffer to set. @return {BufferAttribute} A reference to this instance.
- `setType(type, elementSize)` [源码:18829](../../eyes/src/vendor/three/core.js#L18829)：Sets the given native data type and element size. @param {number} type - The native data type (e.g. ˋgl.FLOATˋ). @param {number} elementSize - The corresponding size (in bytes) for the given ˋtypeˋ parameter. @return {BufferAttribute} A reference to this instance.
- `setItemSize(itemSize)` [源码:18838](../../eyes/src/vendor/three/core.js#L18838)：Sets the item size. @param {number} itemSize - The item size. @return {BufferAttribute} A reference to this instance.
- `setCount(count)` [源码:18847](../../eyes/src/vendor/three/core.js#L18847)：Sets the count (the expected number of vertices in VBO). @param {number} count - The count. @return {BufferAttribute} A reference to this instance.

### `Raycaster`

This class is designed to assist with raycasting. Raycasting is used for mouse picking (working out what objects in the 3d space the mouse is over) amongst other things.。父类 `无`。

- `constructor(e, t, near=0, far=1/0)` [源码:18858](../../eyes/src/vendor/three/core.js#L18858)：当前操作：写入 camera、far、layers、near、params、ray；返回 无显式返回。
- `set(origin, direction)` [源码:18877](../../eyes/src/vendor/three/core.js#L18877)：Updates the ray with a new origin and direction by copying the values from the arguments. @param {Vector3} origin - The origin vector where the ray casts from. @param {Vector3} direction - The (normalized) direction vector that gives direction to the ray.
- `setFromCamera(e, camera)` [源码:18880](../../eyes/src/vendor/three/core.js#L18880)：源码方法 setFromCamera；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setFromXRController(controller)` [源码:18889](../../eyes/src/vendor/three/core.js#L18889)：Uses the given WebXR controller to compute a new origin and direction for the internal ray. @param {WebXRController} controller - The controller to copy the position and direction from. @return {Raycaster} A reference to this raycaster.
- `intersectObject(object, recursive=!0, intersects=[])` [源码:18928](../../eyes/src/vendor/three/core.js#L18928)：The intersection point of a raycaster intersection test. @typedef {Object} Raycaster~Intersection @property {number} distance - The distance from the ray's origin to the intersection point. @property {number} distanceToRay - Some 3D objects e.g. {@link Points} provide the distance of the intersection to the nearest point on the ray. For other objects it will be ˋundefinedˋ. @property {Vector3} point - The intersection point, in world coordinates. @property {Object} face - The face that has been intersected. @property {number} faceIndex - The face index. @property {Object3D} object - The 3D object that has been intersected. @property {Vector2} uv - U,V coordinates at point of intersection. @property {Vector2} uv1 - Second set of U,V coordinates at point of intersection. @property {Vector3} normal - Interpolated normal vector at point of intersection. @property {number} instanceId - The index number of the instance where the ray intersects the {@link InstancedMesh}. Checks all intersection between the ray and the object with or without the descendants. Intersections are returned sorted by distance, closest first. ˋRaycasterˋ delegates to the ˋraycast()ˋ method of the passed 3D object, when evaluating whether the ray intersects the object or not. This allows meshes to respond differently to ray casting than lines or points. Note that for meshes, faces must be pointed towards the origin of the ray in order to be detected; intersections of the ray passing through the back of a face will not be detected. To raycast against both faces of an object, you'll want to set {@link Material#side} to ˋTHREE.DoubleSideˋ. @param {Object3D} object - The 3D object to check for intersection with the ray. @param {boolean} [recursive=true] - If set to ˋtrueˋ, it also checks all descendants. Otherwise it only checks intersection with the object. @param {Array<Raycaster~Intersection>} [intersects=[]] The target array that holds the result of the method. @return {Array<Raycaster~Intersection>} An array holding the intersection points.
- `intersectObjects(e, t=!0, n=[])` [源码:18931](../../eyes/src/vendor/three/core.js#L18931)：源码方法 intersectObjects；作用以类职责与源码实现为准，未猜测压缩参数含义

### `Clock`

Class for keeping track of time. @deprecated since r183.。父类 `无`。

- `constructor(autoStart=!0)` [源码:18955](../../eyes/src/vendor/three/core.js#L18955)：当前操作：写入 autoStart、elapsedTime、oldTime、running、startTime；返回 无显式返回。
- `start()` [源码:18958](../../eyes/src/vendor/three/core.js#L18958)：源码方法 start；作用以类职责与源码实现为准，未猜测压缩参数含义
- `stop()` [源码:18961](../../eyes/src/vendor/three/core.js#L18961)：源码方法 stop；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getElapsedTime()` [源码:18969](../../eyes/src/vendor/three/core.js#L18969)：Returns the elapsed time in seconds. @return {number} The elapsed time.
- `getDelta()` [源码:18972](../../eyes/src/vendor/three/core.js#L18972)：源码方法 getDelta；作用以类职责与源码实现为准，未猜测压缩参数含义

### `Spherical`

This class can be used to represent points in 3D space as [Spherical coordinates](https://en.wikipedia.org/wiki/Spherical_coordinate_system).。父类 `无`。

- `constructor(radius=1, phi=0, theta=0)` [源码:18994](../../eyes/src/vendor/three/core.js#L18994)：Constructs a new spherical. @param {number} [radius=1] - The radius, or the Euclidean distance (straight-line distance) from the point to the origin. @param {number} [phi=0] - The polar angle in radians from the y (up) axis. @param {number} [theta=0] - The equator/azimuthal angle in radians around the y (up) axis.
- `set(radius, phi, theta)` [源码:19005](../../eyes/src/vendor/three/core.js#L19005)：Sets the spherical components by copying the given values. @param {number} radius - The radius. @param {number} phi - The polar angle. @param {number} theta - The azimuthal angle. @return {Spherical} A reference to this spherical.
- `copy(other)` [源码:19014](../../eyes/src/vendor/three/core.js#L19014)：Copies the values of the given spherical to this instance. @param {Spherical} other - The spherical to copy. @return {Spherical} A reference to this spherical.
- `makeSafe()` [源码:19017](../../eyes/src/vendor/three/core.js#L19017)：源码方法 makeSafe；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setFromVector3(v)` [源码:19028](../../eyes/src/vendor/three/core.js#L19028)：Sets the spherical components from the given vector which is assumed to hold Cartesian coordinates. @param {Vector3} v - The vector to set. @return {Spherical} A reference to this spherical.
- `setFromCartesianCoords(e, t, n)` [源码:19031](../../eyes/src/vendor/three/core.js#L19031)：源码方法 setFromCartesianCoords；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clone()` [源码:19039](../../eyes/src/vendor/three/core.js#L19039)：Returns a new spherical with copied values from this instance. @return {Spherical} A clone of this instance.

### `Cylindrical`

This class can be used to represent points in 3D space as [Cylindrical coordinates](https://en.wikipedia.org/wiki/Cylindrical_coordinate_system).。父类 `无`。

- `constructor(radius=1, theta=0, y=0)` [源码:19055](../../eyes/src/vendor/three/core.js#L19055)：Constructs a new cylindrical. @param {number} [radius=1] - The distance from the origin to a point in the x-z plane. @param {number} [theta=0] - A counterclockwise angle in the x-z plane measured in radians from the positive z-axis. @param {number} [y=0] - The height above the x-z plane.
- `set(radius, theta, y)` [源码:19066](../../eyes/src/vendor/three/core.js#L19066)：Sets the cylindrical components by copying the given values. @param {number} radius - The radius. @param {number} theta - The theta angle. @param {number} y - The height value. @return {Cylindrical} A reference to this cylindrical.
- `copy(other)` [源码:19075](../../eyes/src/vendor/three/core.js#L19075)：Copies the values of the given cylindrical to this instance. @param {Cylindrical} other - The cylindrical to copy. @return {Cylindrical} A reference to this cylindrical.
- `setFromVector3(v)` [源码:19085](../../eyes/src/vendor/three/core.js#L19085)：Sets the cylindrical components from the given vector which is assumed to hold Cartesian coordinates. @param {Vector3} v - The vector to set. @return {Cylindrical} A reference to this cylindrical.
- `setFromCartesianCoords(x, y, z)` [源码:19096](../../eyes/src/vendor/three/core.js#L19096)：Sets the cylindrical components from the given Cartesian coordinates. @param {number} x - The x value. @param {number} y - The x value. @param {number} z - The x value. @return {Cylindrical} A reference to this cylindrical.
- `clone()` [源码:19104](../../eyes/src/vendor/three/core.js#L19104)：Returns a new cylindrical with copied values from this instance. @return {Cylindrical} A clone of this instance.

### `Matrix2`

Represents a 2x2 matrix. A Note on Row-Major and Column-Major Ordering: The constructor and {@link Matrix2#set} method take arguments in [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order) order, while internally they are stored in the {@link Matrix2#elements} array in column-major order. This means that calling: ˋˋˋjs const m = new THREE.Matrix2(); m.set( 11, 12, 21, 22 ); ˋˋˋ will result in the elements array containing: ˋˋˋjs m.elements = [ 11, 21, 12, 22 ]; ˋˋˋ and internally all calculations are performed using column-major ordering. However, as the actual ordering makes no difference mathematically and most people are used to thinking about matrices in row-major order, the three.js documentation shows matrices in row-major order. Just bear in mind that if you are reading the source code, you'll have to take the transpose of any matrices outlined here to make sense of the calculations.。父类 `无`。

- `static <static block>()` [源码:19135](../../eyes/src/vendor/three/core.js#L19135)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `constructor(e, t, n, r)` [源码:19138](../../eyes/src/vendor/three/core.js#L19138)：当前操作：写入 elements；返回 无显式返回。
- `identity()` [源码:19146](../../eyes/src/vendor/three/core.js#L19146)：Sets this matrix to the 2x2 identity matrix. @return {Matrix2} A reference to this matrix.
- `fromArray(e, t=0)` [源码:19149](../../eyes/src/vendor/three/core.js#L19149)：源码方法 fromArray；作用以类职责与源码实现为准，未猜测压缩参数含义
- `set(n11, n12, n21, n22)` [源码:19163](../../eyes/src/vendor/three/core.js#L19163)：Sets the elements of the matrix.The arguments are supposed to be in row-major order. @param {number} n11 - 1-1 matrix element. @param {number} n12 - 1-2 matrix element. @param {number} n21 - 2-1 matrix element. @param {number} n22 - 2-2 matrix element. @return {Matrix2} A reference to this matrix.

### `Box2`

Represents an axis-aligned bounding box (AABB) in 2D space.。父类 `无`。

- `constructor(min=new Vector2(1/0,1/0), max=new Vector2(-1/0,-1/0))` [源码:19173](../../eyes/src/vendor/three/core.js#L19173)：当前操作：写入 isBox2、max、min；返回 无显式返回。
- `set(min, max)` [源码:19184](../../eyes/src/vendor/three/core.js#L19184)：Sets the lower and upper boundaries of this box. Please note that this method only copies the values from the given objects. @param {Vector2} min - The lower boundary of the box. @param {Vector2} max - The upper boundary of the box. @return {Box2} A reference to this bounding box.
- `setFromPoints(e)` [源码:19187](../../eyes/src/vendor/three/core.js#L19187)：源码方法 setFromPoints；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setFromCenterAndSize(e, t)` [源码:19192](../../eyes/src/vendor/three/core.js#L19192)：源码方法 setFromCenterAndSize；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clone()` [源码:19201](../../eyes/src/vendor/three/core.js#L19201)：Returns a new box with copied values from this instance. @return {Box2} A clone of this instance.
- `copy(box)` [源码:19210](../../eyes/src/vendor/three/core.js#L19210)：Copies the values of the given box to this instance. @param {Box2} box - The box to copy. @return {Box2} A reference to this bounding box.
- `makeEmpty()` [源码:19213](../../eyes/src/vendor/three/core.js#L19213)：源码方法 makeEmpty；作用以类职责与源码实现为准，未猜测压缩参数含义
- `isEmpty()` [源码:19223](../../eyes/src/vendor/three/core.js#L19223)：Returns true if this box includes zero points within its bounds. Note that a box with equal lower and upper bounds still includes one point, the one both bounds share. @return {boolean} Whether this box is empty or not.
- `getCenter(e)` [源码:19226](../../eyes/src/vendor/three/core.js#L19226)：源码方法 getCenter；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getSize(target)` [源码:19235](../../eyes/src/vendor/three/core.js#L19235)：Returns the dimensions of this box. @param {Vector2} target - The target vector that is used to store the method's result. @return {Vector2} The size.
- `expandByPoint(point)` [源码:19244](../../eyes/src/vendor/three/core.js#L19244)：Expands the boundaries of this box to include the given point. @param {Vector2} point - The point that should be included by the bounding box. @return {Box2} A reference to this bounding box.
- `expandByVector(vector)` [源码:19256](../../eyes/src/vendor/three/core.js#L19256)：Expands this box equilaterally by the given vector. The width of this box will be expanded by the x component of the vector in both directions. The height of this box will be expanded by the y component of the vector in both directions. @param {Vector2} vector - The vector that should expand the bounding box. @return {Box2} A reference to this bounding box.
- `expandByScalar(scalar)` [源码:19266](../../eyes/src/vendor/three/core.js#L19266)：Expands each dimension of the box by the given scalar. If negative, the dimensions of the box will be contracted. @param {number} scalar - The scalar value that should expand the bounding box. @return {Box2} A reference to this bounding box.
- `containsPoint(point)` [源码:19275](../../eyes/src/vendor/three/core.js#L19275)：Returns ˋtrueˋ if the given point lies within or on the boundaries of this box. @param {Vector2} point - The point to test. @return {boolean} Whether the bounding box contains the given point or not.
- `containsBox(box)` [源码:19285](../../eyes/src/vendor/three/core.js#L19285)：Returns ˋtrueˋ if this bounding box includes the entirety of the given bounding box. If this box and the given one are identical, this function also returns ˋtrueˋ. @param {Box2} box - The bounding box to test. @return {boolean} Whether the bounding box contains the given bounding box or not.
- `getParameter(point, target)` [源码:19295](../../eyes/src/vendor/three/core.js#L19295)：Returns a point as a proportion of this box's width and height. @param {Vector2} point - A point in 2D space. @param {Vector2} target - The target vector that is used to store the method's result. @return {Vector2} A point as a proportion of this box's width and height.
- `intersectsBox(box)` [源码:19304](../../eyes/src/vendor/three/core.js#L19304)：Returns ˋtrueˋ if the given bounding box intersects with this bounding box. @param {Box2} box - The bounding box to test. @return {boolean} Whether the given bounding box intersects with this bounding box.
- `clampPoint(point, target)` [源码:19314](../../eyes/src/vendor/three/core.js#L19314)：Clamps the given point within the bounds of this box. @param {Vector2} point - The point to clamp. @param {Vector2} target - The target vector that is used to store the method's result. @return {Vector2} The clamped point.
- `distanceToPoint(point)` [源码:19324](../../eyes/src/vendor/three/core.js#L19324)：Returns the euclidean distance from any edge of this box to the specified point. If the given point lies inside of this box, the distance will be ˋ0ˋ. @param {Vector2} point - The point to compute the distance to. @return {number} The euclidean distance.
- `intersect(box)` [源码:19336](../../eyes/src/vendor/three/core.js#L19336)：Computes the intersection of this bounding box and the given one, setting the upper bound of this box to the lesser of the two boxes' upper bounds and the lower bound of this box to the greater of the two boxes' lower bounds. If there's no overlap, makes this box empty. @param {Box2} box - The bounding box to intersect with. @return {Box2} A reference to this bounding box.
- `union(box)` [源码:19347](../../eyes/src/vendor/three/core.js#L19347)：Computes the union of this box and another and the given one, setting the upper bound of this box to the greater of the two boxes' upper bounds and the lower bound of this box to the lesser of the two boxes' lower bounds. @param {Box2} box - The bounding box that will be unioned with this instance. @return {Box2} A reference to this bounding box.
- `translate(offset)` [源码:19357](../../eyes/src/vendor/three/core.js#L19357)：Adds the given offset to both the upper and lower bounds of this bounding box, effectively moving it in 2D space. @param {Vector2} offset - The offset that should be used to translate the bounding box. @return {Box2} A reference to this bounding box.
- `equals(box)` [源码:19366](../../eyes/src/vendor/three/core.js#L19366)：Returns ˋtrueˋ if this bounding box is equal with the given one. @param {Box2} box - The box to test for equality. @return {boolean} Whether this bounding box is equal with the given one.

### `Line3`

An analytical line segment in 3D space represented by a start and end point.。父类 `无`。

- `constructor(start=new Vector3(), end=new Vector3())` [源码:19387](../../eyes/src/vendor/three/core.js#L19387)：Constructs a new line segment. @param {Vector3} [start=(0,0,0)] - Start of the line segment. @param {Vector3} [end=(0,0,0)] - End of the line segment.
- `set(start, end)` [源码:19397](../../eyes/src/vendor/three/core.js#L19397)：Sets the start and end values by copying the given vectors. @param {Vector3} start - The start point. @param {Vector3} end - The end point. @return {Line3} A reference to this line segment.
- `copy(line)` [源码:19406](../../eyes/src/vendor/three/core.js#L19406)：Copies the values of the given line segment to this instance. @param {Line3} line - The line segment to copy. @return {Line3} A reference to this line segment.
- `getCenter(e)` [源码:19409](../../eyes/src/vendor/three/core.js#L19409)：源码方法 getCenter；作用以类职责与源码实现为准，未猜测压缩参数含义
- `delta(target)` [源码:19418](../../eyes/src/vendor/three/core.js#L19418)：Returns the delta vector of the line segment's start and end point. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The delta vector.
- `distanceSq()` [源码:19426](../../eyes/src/vendor/three/core.js#L19426)：Returns the squared Euclidean distance between the line' start and end point. @return {number} The squared Euclidean distance.
- `distance()` [源码:19434](../../eyes/src/vendor/three/core.js#L19434)：Returns the Euclidean distance between the line' start and end point. @return {number} The Euclidean distance.
- `at(t, target)` [源码:19444](../../eyes/src/vendor/three/core.js#L19444)：Returns a vector at a certain position along the line segment. @param {number} t - A value between ˋ[0,1]ˋ to represent a position along the line segment. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The delta vector.
- `closestPointToPointParameter(e, t)` [源码:19447](../../eyes/src/vendor/three/core.js#L19447)：源码方法 closestPointToPointParameter；作用以类职责与源码实现为准，未猜测压缩参数含义
- `closestPointToPoint(point, clampToLine, target)` [源码:19462](../../eyes/src/vendor/three/core.js#L19462)：Returns the closest point on the line for a given point. @param {Vector3} point - The point to compute the closest point on the line for. @param {boolean} clampToLine - Whether to clamp the result to the range ˋ[0,1]ˋ or not. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The closest point on the line.
- `distanceSqToLine3(e, t=Qc, n=Kc)` [源码:19466](../../eyes/src/vendor/three/core.js#L19466)：源码方法 distanceSqToLine3；作用以类职责与源码实现为准，未猜测压缩参数含义
- `applyMatrix4(matrix)` [源码:19494](../../eyes/src/vendor/three/core.js#L19494)：Applies a 4x4 transformation matrix to this line segment. @param {Matrix4} matrix - The transformation matrix. @return {Line3} A reference to this line segment.
- `equals(line)` [源码:19503](../../eyes/src/vendor/three/core.js#L19503)：Returns ˋtrueˋ if this line segment is equal with the given one. @param {Line3} line - The line segment to test for equality. @return {boolean} Whether this line segment is equal with the given one.
- `clone()` [源码:19511](../../eyes/src/vendor/three/core.js#L19511)：Returns a new line segment with copied values from this instance. @return {Line3} A clone of this instance.

### `SpotLightHelper`

This displays a cone shaped helper object for a {@link SpotLight}. When the spot light or its target are transformed or light properties are changed, it's necessary to call the ˋupdate()ˋ method of the respective helper. ˋˋˋjs const spotLight = new THREE.SpotLight( 0xffffff ); spotLight.position.set( 10, 10, 10 ); scene.add( spotLight ); const spotLightHelper = new THREE.SpotLightHelper( spotLight ); scene.add( spotLightHelper ); ˋˋˋ @augments Object3D。父类 `Object3D`。

- `constructor(light, t)` [源码:19534](../../eyes/src/vendor/three/core.js#L19534)：当前操作：写入 color、cone、light、matrixAutoUpdate、type；返回 无显式返回。
- `dispose()` [源码:19550](../../eyes/src/vendor/three/core.js#L19550)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `update()` [源码:19553](../../eyes/src/vendor/three/core.js#L19553)：按当前时间或场景状态推进对象并维护缓存失效

### `SkeletonHelper`

A helper object to assist with visualizing a {@link Skeleton}. ˋˋˋjs const helper = new THREE.SkeletonHelper( skinnedMesh ); scene.add( helper ); ˋˋˋ @augments LineSegments。父类 `LineSegments`。

- `constructor(root)` [源码:19574](../../eyes/src/vendor/three/core.js#L19574)：当前操作：写入 bones、isSkeletonHelper、matrix、matrixAutoUpdate、root、type；返回 无显式返回。
- `updateMatrixWorld(e)` [源码:19595](../../eyes/src/vendor/three/core.js#L19595)：传播父级世界矩阵；matrixWorldNeedsUpdate 控制失效，递归更新子节点
- `setColors(e, t)` [源码:19606](../../eyes/src/vendor/three/core.js#L19606)：源码方法 setColors；作用以类职责与源码实现为准，未猜测压缩参数含义
- `dispose()` [源码:19611](../../eyes/src/vendor/three/core.js#L19611)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

### `PointLightHelper`

This displays a helper object consisting of a spherical mesh for visualizing an instance of {@link PointLight}. ˋˋˋjs const pointLight = new THREE.PointLight( 0xff0000, 1, 100 ); pointLight.position.set( 10, 10, 10 ); scene.add( pointLight ); const sphereSize = 1; const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize ); scene.add( pointLightHelper ); ˋˋˋ @augments Mesh。父类 `Mesh`。

- `constructor(light, t, n)` [源码:19638](../../eyes/src/vendor/three/core.js#L19638)：当前操作：写入 color、light、matrix、matrixAutoUpdate、type；返回 无显式返回。
- `dispose()` [源码:19645](../../eyes/src/vendor/three/core.js#L19645)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `update()` [源码:19648](../../eyes/src/vendor/three/core.js#L19648)：按当前时间或场景状态推进对象并维护缓存失效

### `HemisphereLightHelper`

Creates a visual aid consisting of a spherical mesh for a given {@link HemisphereLight}. When the hemisphere light is transformed or its light properties are changed, it's necessary to call the ˋupdate()ˋ method of the respective helper. ˋˋˋjs const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ); const helper = new THREE.HemisphereLightHelper( light, 5 ); scene.add( helper ); ˋˋˋ @augments Object3D。父类 `Object3D`。

- `constructor(light, t, n)` [源码:19671](../../eyes/src/vendor/three/core.js#L19671)：当前操作：写入 color、light、material、material.vertexColors、matrix、matrixAutoUpdate、type；返回 无显式返回。
- `dispose()` [源码:19683](../../eyes/src/vendor/three/core.js#L19683)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `update()` [源码:19686](../../eyes/src/vendor/three/core.js#L19686)：按当前时间或场景状态推进对象并维护缓存失效

### `GridHelper`

The helper is an object to define grids. Grids are two-dimensional arrays of lines. ˋˋˋjs const size = 10; const divisions = 10; const gridHelper = new THREE.GridHelper( size, divisions ); scene.add( gridHelper ); ˋˋˋ @augments LineSegments。父类 `LineSegments`。

- `constructor(e=10, t=10, n=4473924, r=8947848)` [源码:19715](../../eyes/src/vendor/three/core.js#L19715)：当前操作：写入 type；返回 无显式返回。
- `dispose()` [源码:19734](../../eyes/src/vendor/three/core.js#L19734)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

### `PolarGridHelper`

This helper is an object to define polar grids. Grids are two-dimensional arrays of lines. ˋˋˋjs const radius = 10; const sectors = 16; const rings = 8; const divisions = 64; const helper = new THREE.PolarGridHelper( radius, sectors, rings, divisions ); scene.add( helper ); ˋˋˋ @augments LineSegments。父类 `LineSegments`。

- `constructor(e=10, t=16, n=8, r=64, i=4473924, a=8947848)` [源码:19755](../../eyes/src/vendor/three/core.js#L19755)：当前操作：写入 type；返回 无显式返回。
- `dispose()` [源码:19784](../../eyes/src/vendor/three/core.js#L19784)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

### `DirectionalLightHelper`

Helper object to assist with visualizing a {@link DirectionalLight}'s effect on the scene. This consists of a plane and a line representing the light's position and direction. When the directional light or its target are transformed or light properties are changed, it's necessary to call the ˋupdate()ˋ method of the respective helper. ˋˋˋjs const light = new THREE.DirectionalLight( 0xFFFFFF ); scene.add( light ); const helper = new THREE.DirectionalLightHelper( light, 5 ); scene.add( helper ); ˋˋˋ @augments Object3D。父类 `Object3D`。

- `constructor(light, t, n)` [源码:19810](../../eyes/src/vendor/three/core.js#L19810)：当前操作：写入 color、light、lightPlane、matrix、matrixAutoUpdate、targetLine、type；返回 无显式返回。
- `dispose()` [源码:19820](../../eyes/src/vendor/three/core.js#L19820)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `update()` [源码:19823](../../eyes/src/vendor/three/core.js#L19823)：按当前时间或场景状态推进对象并维护缓存失效

### `CameraHelper`

This helps with visualizing what a camera contains in its frustum. It visualizes the frustum of a camera using a line segments. Based on frustum visualization in [lightgl.js shadowmap example](https://github.com/evanw/lightgl.js/blob/master/tests/shadowmap.html). ˋCameraHelperˋ must be a child of the scene. When the camera is transformed or its projection matrix is changed, it's necessary to call the ˋupdate()ˋ method of the respective helper. ˋˋˋjs const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); const helper = new THREE.CameraHelper( camera ); scene.add( helper ); ˋˋˋ @augments LineSegments。父类 `LineSegments`。

- `constructor(e)` [源码:19849](../../eyes/src/vendor/three/core.js#L19849)：当前操作：写入 camera、matrix、matrixAutoUpdate、pointMap、type；返回 无显式返回。
- `setColors(e, t, n, r, i)` [源码:19873](../../eyes/src/vendor/three/core.js#L19873)：源码方法 setColors；作用以类职责与源码实现为准，未猜测压缩参数含义
- `update()` [源码:19877](../../eyes/src/vendor/three/core.js#L19877)：按当前时间或场景状态推进对象并维护缓存失效
- `dispose()` [源码:19887](../../eyes/src/vendor/three/core.js#L19887)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

### `BoxHelper`

Helper object to graphically show the world-axis-aligned bounding box around an object. The actual bounding box is handled with {@link Box3}, this is just a visual helper for debugging. It can be automatically resized with {@link BoxHelper#update} when the object it's created from is transformed. Note that the object must have a geometry for this to work, so it won't work with sprites. ˋˋˋjs const sphere = new THREE.SphereGeometry(); const object = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( 0xff0000 ) ); const box = new THREE.BoxHelper( object, 0xffff00 ); scene.add( box ); ˋˋˋ @augments LineSegments。父类 `LineSegments`。

- `constructor(object, t=16776960)` [源码:19918](../../eyes/src/vendor/three/core.js#L19918)：当前操作：写入 matrixAutoUpdate、object、type；返回 无显式返回。
- `update()` [源码:19927](../../eyes/src/vendor/three/core.js#L19927)：按当前时间或场景状态推进对象并维护缓存失效
- `setFromObject(object)` [源码:19941](../../eyes/src/vendor/three/core.js#L19941)：Updates the wireframe box for the passed object. @param {Object3D} object - The 3D object to create the helper for. @return {BoxHelper} A reference to this instance.
- `copy(source, recursive)` [源码:19944](../../eyes/src/vendor/three/core.js#L19944)：复制自身状态；需注意资源引用与深复制边界
- `dispose()` [源码:19947](../../eyes/src/vendor/three/core.js#L19947)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

### `Box3Helper`

A helper object to visualize an instance of {@link Box3}. ˋˋˋjs const box = new THREE.Box3(); box.setFromCenterAndSize( new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( 2, 1, 3 ) ); const helper = new THREE.Box3Helper( box, 0xffff00 ); scene.add( helper ) ˋˋˋ @augments LineSegments。父类 `LineSegments`。

- `constructor(box, t=16776960)` [源码:19965](../../eyes/src/vendor/three/core.js#L19965)：当前操作：写入 box、type；返回 无显式返回。
- `updateMatrixWorld(e)` [源码:19973](../../eyes/src/vendor/three/core.js#L19973)：传播父级世界矩阵；matrixWorldNeedsUpdate 控制失效，递归更新子节点
- `dispose()` [源码:19977](../../eyes/src/vendor/three/core.js#L19977)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

### `PlaneHelper`

A helper object to visualize an instance of {@link Plane}. ˋˋˋjs const plane = new THREE.Plane( new THREE.Vector3( 1, 1, 0.2 ), 3 ); const helper = new THREE.PlaneHelper( plane, 1, 0xffff00 ); scene.add( helper ); ˋˋˋ @augments Line。父类 `Line`。

- `constructor(plane, size=1, n=16776960)` [源码:19993](../../eyes/src/vendor/three/core.js#L19993)：当前操作：写入 plane、size、type；返回 无显式返回。
- `updateMatrixWorld(e)` [源码:20009](../../eyes/src/vendor/three/core.js#L20009)：传播父级世界矩阵；matrixWorldNeedsUpdate 控制失效，递归更新子节点
- `dispose()` [源码:20012](../../eyes/src/vendor/three/core.js#L20012)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

### `ArrowHelper`

An 3D arrow object for visualizing directions. ˋˋˋjs const dir = new THREE.Vector3( 1, 2, 0 ); //normalize the direction vector (convert to vector of length 1) dir.normalize(); const origin = new THREE.Vector3( 0, 0, 0 ); const length = 1; const hex = 0xffff00; const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex ); scene.add( arrowHelper ); ˋˋˋ @augments Object3D。父类 `Object3D`。

- `constructor(e=new Vector3(0,0,1), t=new Vector3(0,0,0), n=1, r=16776960, i=.2*n, a=.2*i)` [源码:20038](../../eyes/src/vendor/three/core.js#L20038)：当前操作：写入 cone、cone.matrixAutoUpdate、line、line.matrixAutoUpdate、type；返回 无显式返回。
- `setDirection(e)` [源码:20047](../../eyes/src/vendor/three/core.js#L20047)：源码方法 setDirection；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setLength(e, t=.2*e, n=.2*t)` [源码:20054](../../eyes/src/vendor/three/core.js#L20054)：源码方法 setLength；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setColor(color)` [源码:20062](../../eyes/src/vendor/three/core.js#L20062)：Sets the color of the helper. @param {number\|Color\|string} color - The color to set.
- `copy(source)` [源码:20065](../../eyes/src/vendor/three/core.js#L20065)：复制自身状态；需注意资源引用与深复制边界
- `dispose()` [源码:20068](../../eyes/src/vendor/three/core.js#L20068)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

### `AxesHelper`

An axis object to visualize the 3 axes in a simple way. The X axis is red. The Y axis is green. The Z axis is blue. ˋˋˋjs const axesHelper = new THREE.AxesHelper( 5 ); scene.add( axesHelper ); ˋˋˋ @augments LineSegments。父类 `LineSegments`。

- `constructor(e=1)` [源码:20084](../../eyes/src/vendor/three/core.js#L20084)：当前操作：写入 type；返回 无显式返回。
- `setColors(xAxisColor, yAxisColor, zAxisColor)` [源码:20101](../../eyes/src/vendor/three/core.js#L20101)：Defines the colors of the axes helper. @param {number\|Color\|string} xAxisColor - The color for the x axis. @param {number\|Color\|string} yAxisColor - The color for the y axis. @param {number\|Color\|string} zAxisColor - The color for the z axis. @return {AxesHelper} A reference to this axes helper.
- `dispose()` [源码:20106](../../eyes/src/vendor/three/core.js#L20106)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用

### `ShapePath`

This class is used to convert a series of paths to an array of shapes. It is specifically used in context of fonts and SVG.。父类 `无`。

- `constructor()` [源码:20115](../../eyes/src/vendor/three/core.js#L20115)：当前操作：写入 color、currentPath、subPaths、type、userData；返回 无显式返回。
- `moveTo(x, y)` [源码:20125](../../eyes/src/vendor/three/core.js#L20125)：Creates a new path and moves it current point to the given one. @param {number} x - The x coordinate. @param {number} y - The y coordinate. @return {ShapePath} A reference to this shape path.
- `lineTo(x, y)` [源码:20136](../../eyes/src/vendor/three/core.js#L20136)：Adds an instance of {@link LineCurve} to the path by connecting the current point with the given one. @param {number} x - The x coordinate of the end point. @param {number} y - The y coordinate of the end point. @return {ShapePath} A reference to this shape path.
- `quadraticCurveTo(aCPx, aCPy, aX, aY)` [源码:20149](../../eyes/src/vendor/three/core.js#L20149)：Adds an instance of {@link QuadraticBezierCurve} to the path by connecting the current point with the given one. @param {number} aCPx - The x coordinate of the control point. @param {number} aCPy - The y coordinate of the control point. @param {number} aX - The x coordinate of the end point. @param {number} aY - The y coordinate of the end point. @return {ShapePath} A reference to this shape path.
- `bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY)` [源码:20164](../../eyes/src/vendor/three/core.js#L20164)：Adds an instance of {@link CubicBezierCurve} to the path by connecting the current point with the given one. @param {number} aCP1x - The x coordinate of the first control point. @param {number} aCP1y - The y coordinate of the first control point. @param {number} aCP2x - The x coordinate of the second control point. @param {number} aCP2y - The y coordinate of the second control point. @param {number} aX - The x coordinate of the end point. @param {number} aY - The y coordinate of the end point. @return {ShapePath} A reference to this shape path.
- `splineThru(pts)` [源码:20174](../../eyes/src/vendor/three/core.js#L20174)：Adds an instance of {@link SplineCurve} to the path by connecting the current point with the given list of points. @param {Array<Vector2>} pts - An array of points in 2D space. @return {ShapePath} A reference to this shape path.
- `toShapes()` [源码:20177](../../eyes/src/vendor/three/core.js#L20177)：源码方法 toShapes；作用以类职责与源码实现为准，未猜测压缩参数含义

### `Controls`

Abstract base class for controls. @abstract @augments EventDispatcher。父类 `EventDispatcher`。

- `constructor(object, domElement=null)` [源码:20271](../../eyes/src/vendor/three/core.js#L20271)：Constructs a new controls instance. @param {Object3D} object - The object that is managed by the controls. @param {?HTMLElement} domElement - The HTML element used for event listeners.
- `connect(domElement)` [源码:20281](../../eyes/src/vendor/three/core.js#L20281)：源码方法 connect；作用以类职责与源码实现为准，未猜测压缩参数含义
- `disconnect()` [源码:20284](../../eyes/src/vendor/three/core.js#L20284)：源码方法 disconnect；作用以类职责与源码实现为准，未猜测压缩参数含义
- `dispose()` [源码:20285](../../eyes/src/vendor/three/core.js#L20285)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `update()` [源码:20292](../../eyes/src/vendor/three/core.js#L20292)：Controls should implement this method if they have to update their internal state per simulation step. @param {number} [delta] - The time delta in seconds.

### `TextureUtils`

A class containing utility functions for textures. @hideconstructor。父类 `无`。

- `static contain(e, t)` [源码:20413](../../eyes/src/vendor/three/core.js#L20413)：源码方法 contain；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static cover(e, t)` [源码:20419](../../eyes/src/vendor/three/core.js#L20419)：源码方法 cover；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static fill(e)` [源码:20425](../../eyes/src/vendor/three/core.js#L20425)：源码方法 fill；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static getByteLength(width, height, format, type)` [源码:20439](../../eyes/src/vendor/three/core.js#L20439)：Determines how many bytes must be used to represent the texture. @param {number} width - The width of the texture. @param {number} height - The height of the texture. @param {number} format - The texture's format. @param {number} type - The texture's type. @return {number} The byte length.

## `eyes/src/vendor/three/index.js`

Three.js WebGL 渲染器和 GLSL shader chunks；重导出 core 并管理 GPU、阴影、环境贴图和 XR。[源码](../../eyes/src/vendor/three/index.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-three-index-js)

### `PMREMGenerator`

将环境纹理预滤波为多粗糙度立方 UV 辐照贴图。父类 `无`。

- `constructor(renderer)` [源码:1330](../../eyes/src/vendor/three/index.js#L1330)：当前操作：写入 _backgroundBox、_blurMaterial、_cubeSize、_cubemapMaterial、_equirectMaterial、_ggxMaterial、_lodMax、_lodMeshes、_pingPongRenderTarget、_renderer、_sigmas、_sizeLods；返回 无显式返回。
- `fromScene(e, t=0, n=.1, r=100, i={})` [源码:1333](../../eyes/src/vendor/three/index.js#L1333)：源码方法 fromScene；作用以类职责与源码实现为准，未猜测压缩参数含义
- `fromEquirectangular(e, t=null)` [源码:1342](../../eyes/src/vendor/three/index.js#L1342)：源码方法 fromEquirectangular；作用以类职责与源码实现为准，未猜测压缩参数含义
- `fromCubemap(e, t=null)` [源码:1345](../../eyes/src/vendor/three/index.js#L1345)：源码方法 fromCubemap；作用以类职责与源码实现为准，未猜测压缩参数含义
- `compileCubemapShader()` [源码:1348](../../eyes/src/vendor/three/index.js#L1348)：源码方法 compileCubemapShader；作用以类职责与源码实现为准，未猜测压缩参数含义
- `compileEquirectangularShader()` [源码:1351](../../eyes/src/vendor/three/index.js#L1351)：源码方法 compileEquirectangularShader；作用以类职责与源码实现为准，未猜测压缩参数含义
- `dispose()` [源码:1354](../../eyes/src/vendor/three/index.js#L1354)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `_setSize(e)` [源码:1357](../../eyes/src/vendor/three/index.js#L1357)：源码方法 _setSize；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_dispose()` [源码:1360](../../eyes/src/vendor/three/index.js#L1360)：源码方法 _dispose；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_cleanup(e)` [源码:1364](../../eyes/src/vendor/three/index.js#L1364)：源码方法 _cleanup；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_fromTexture(e, t)` [源码:1367](../../eyes/src/vendor/three/index.js#L1367)：源码方法 _fromTexture；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_allocateTargets()` [源码:1372](../../eyes/src/vendor/three/index.js#L1372)：源码方法 _allocateTargets；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_compileMaterial(e)` [源码:1505](../../eyes/src/vendor/three/index.js#L1505)：源码方法 _compileMaterial；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_sceneToCubeUV(e, t, n, i, a)` [源码:1509](../../eyes/src/vendor/three/index.js#L1509)：源码方法 _sceneToCubeUV；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_textureToCubeUV(e, t)` [源码:1536](../../eyes/src/vendor/three/index.js#L1536)：源码方法 _textureToCubeUV；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_applyPMREM(e)` [源码:1547](../../eyes/src/vendor/three/index.js#L1547)：源码方法 _applyPMREM；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_applyGGXFilter(e, t, n)` [源码:1555](../../eyes/src/vendor/three/index.js#L1555)：源码方法 _applyGGXFilter；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_blur(e, t, n, r, i)` [源码:1573](../../eyes/src/vendor/three/index.js#L1573)：源码方法 _blur；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_halfBlur(e, t, n, i, a, s, o)` [源码:1577](../../eyes/src/vendor/three/index.js#L1577)：源码方法 _halfBlur；作用以类职责与源码实现为准，未猜测压缩参数含义

### `WebGLCubeRenderTarget`

WebGLCube 离屏颜色/深度附件、尺寸和释放生命周期。父类 `ThreeCore.WebGLRenderTarget`。

- `constructor(e=1, t={})` [源码:1650](../../eyes/src/vendor/three/index.js#L1650)：当前操作：写入 isWebGLCubeRenderTarget、texture、texture.isRenderTargetTexture；返回 无显式返回。
- `fromEquirectangularTexture(e, t)` [源码:1660](../../eyes/src/vendor/three/index.js#L1660)：源码方法 fromEquirectangularTexture；作用以类职责与源码实现为准，未猜测压缩参数含义
- `clear(e, t=!0, n=!0, r=!0)` [源码:1686](../../eyes/src/vendor/three/index.js#L1686)：源码方法 clear；作用以类职责与源码实现为准，未猜测压缩参数含义

### `SingleUniform`

上传单个 GL uniform 并缓存前值。父类 `无`。

- `constructor(id, t, addr)` [源码:2313](../../eyes/src/vendor/three/index.js#L2313)：当前操作：写入 addr、cache、id、setValue、type；返回 无显式返回。

### `PureArrayUniform`

按类型上传连续 GL uniform 数组。父类 `无`。

- `constructor(id, t, addr)` [源码:2375](../../eyes/src/vendor/three/index.js#L2375)：当前操作：写入 addr、cache、id、setValue、size、type；返回 无显式返回。

### `StructuredUniform`

按树递归上传结构体 uniform。父类 `无`。

- `constructor(id)` [源码:2437](../../eyes/src/vendor/three/index.js#L2437)：当前操作：写入 id、map、seq；返回 无显式返回。
- `setValue(e, t, n)` [源码:2440](../../eyes/src/vendor/three/index.js#L2440)：源码方法 setValue；作用以类职责与源码实现为准，未猜测压缩参数含义

### `WebGLUniforms`

反射 GL uniform 类型并缓存上传值。父类 `无`。

- `constructor(e, t)` [源码:2472](../../eyes/src/vendor/three/index.js#L2472)：当前操作：写入 map、seq；返回 无显式返回。
- `setValue(e, t, n, r)` [源码:2484](../../eyes/src/vendor/three/index.js#L2484)：源码方法 setValue；作用以类职责与源码实现为准，未猜测压缩参数含义
- `setOptional(e, t, n)` [源码:2488](../../eyes/src/vendor/three/index.js#L2488)：源码方法 setOptional；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static upload(e, t, n, r)` [源码:2492](../../eyes/src/vendor/three/index.js#L2492)：源码方法 upload；作用以类职责与源码实现为准，未猜测压缩参数含义
- `static seqWithValue(e, t)` [源码:2499](../../eyes/src/vendor/three/index.js#L2499)：源码方法 seqWithValue；作用以类职责与源码实现为准，未猜测压缩参数含义

### `WebGLShaderCache`

以材质关联缓存 shader stage 源码及使用计数。父类 `无`。

- `constructor()` [源码:2731](../../eyes/src/vendor/three/index.js#L2731)：当前操作：写入 materialCache、shaderCache；返回 无显式返回。
- `update(e, t, n)` [源码:2734](../../eyes/src/vendor/three/index.js#L2734)：按当前时间或场景状态推进对象并维护缓存失效
- `remove(e)` [源码:2738](../../eyes/src/vendor/three/index.js#L2738)：源码方法 remove；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getVertexShaderStage(e)` [源码:2743](../../eyes/src/vendor/three/index.js#L2743)：源码方法 getVertexShaderStage；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getFragmentShaderStage(e)` [源码:2746](../../eyes/src/vendor/three/index.js#L2746)：源码方法 getFragmentShaderStage；作用以类职责与源码实现为准，未猜测压缩参数含义
- `dispose()` [源码:2749](../../eyes/src/vendor/three/index.js#L2749)：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
- `_getShaderCacheForMaterial(e)` [源码:2752](../../eyes/src/vendor/three/index.js#L2752)：源码方法 _getShaderCacheForMaterial；作用以类职责与源码实现为准，未猜测压缩参数含义
- `_getShaderStage(e)` [源码:2757](../../eyes/src/vendor/three/index.js#L2757)：源码方法 _getShaderStage；作用以类职责与源码实现为准，未猜测压缩参数含义

### `WebGLShaderStage`

保存 shader 源码与稳定 stage 标识。父类 `无`。

- `constructor(code)` [源码:2764](../../eyes/src/vendor/three/index.js#L2764)：当前操作：写入 code、id、usedTimes；返回 无显式返回。

### `WebXRDepthSensing`

将 XR 深度纹理整合到渲染器深度采样。父类 `无`。

- `constructor()` [源码:4697](../../eyes/src/vendor/three/index.js#L4697)：当前操作：写入 depthFar、depthNear、mesh、texture；返回 无显式返回。
- `init(e, t)` [源码:4700](../../eyes/src/vendor/three/index.js#L4700)：初始化延迟资源和运行时能力；必须先完成再使用依赖资源的方法
- `getMesh(e)` [源码:4706](../../eyes/src/vendor/three/index.js#L4706)：源码方法 getMesh；作用以类职责与源码实现为准，未猜测压缩参数含义
- `reset()` [源码:4728](../../eyes/src/vendor/three/index.js#L4728)：源码方法 reset；作用以类职责与源码实现为准，未猜测压缩参数含义
- `getDepthTexture()` [源码:4731](../../eyes/src/vendor/three/index.js#L4731)：源码方法 getDepthTexture；作用以类职责与源码实现为准，未猜测压缩参数含义

### `WebXRManager`

协调 XRSession、帧、相机、控制器和渲染目标生命周期。父类 `ThreeCore.EventDispatcher`。

- `constructor(e, t)` [源码:4736](../../eyes/src/vendor/three/index.js#L4736)：当前操作：写入 cameraAutoUpdate、dispose、enabled、getBaseLayer、getBinding、getCamera、getCameraTexture、getController、getControllerGrip、getDepthSensingMesh、getDepthTexture、getEnvironmentBlendMode、getFoveation、getFrame、getHand、getReferenceSpace、getSession、hasDepthSensing、isPresenting、setAnimationLoop、setFoveation、setFramebufferScaleFactor、setReferenceSpace、setReferenceSpaceType、setSession、updateCamera；返回 无显式返回。

### `WebGLRenderer`

WebGL 渲染主循环：更新对象、灯光、材质程序、排序和绘制并维护 GPU 资源。父类 `无`。

- `constructor(e={})` [源码:5172](../../eyes/src/vendor/three/index.js#L5172)：当前操作：写入 _outputColorSpace、autoClear、autoClearColor、autoClearDepth、autoClearStencil、clear、clearColor、clearDepth、clearStencil、clippingPlanes、compile、compileAsync、copyFramebufferToTexture、copyTextureToTexture、debug、dispose、domElement、forceContextLoss、forceContextRestore、getActiveCubeFace、getActiveMipmapLevel、getClearAlpha、getClearColor、getContext、getContextAttributes、getCurrentViewport、getDrawingBufferSize、getPixelRatio、getRenderTarget、getScissor、getScissorTest、getSize、getViewport、info.render.frame、initRenderTarget、initTexture、isWebGLRenderer、localClippingEnabled、readRenderTargetPixels、readRenderTargetPixelsAsync、render、renderBufferDirect、resetState、setAnimationLoop、setClearAlpha、setClearColor、setDrawingBufferSize、setEffects、setNodesHandler、setOpaqueSort、setPixelRatio、setRenderTarget、setRenderTargetFramebuffer、setRenderTargetTextures、setScissor、setScissorTest、setSize、setTransparentSort、setViewport、sortObjects、toneMapping、toneMappingExposure、transmissionResolutionScale、xr；返回 无显式返回。
- `get coordinateSystem()` [源码:5863](../../eyes/src/vendor/three/index.js#L5863)：只读返回 ThreeCore.WebGLCoordinateSystem；此 getter 不执行对应 setter 的写入或更新通知
- `get outputColorSpace()` [源码:5866](../../eyes/src/vendor/three/index.js#L5866)：只读返回 this._outputColorSpace；此 getter 不执行对应 setter 的写入或更新通知
- `set outputColorSpace(outputColorSpace)` [源码:5869](../../eyes/src/vendor/three/index.js#L5869)：写入输出颜色空间，同时更新 GL drawingBufferColorSpace 和 unpackColorSpace
