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

提供 CopyShader；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/CopyShader.js)。语义状态：`partially-matched-upstream`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-CopyShader-js)

## `eyes/src/vendor/modules/D2R.js`

提供 D2R、EPSLN、FORTPI、HALF_PI、PJD_3PARAM、PJD_7PARAM、PJD_GRIDSHIFT、PJD_NODATUM、PJD_WGS84、R2D、RA4、RA6、SEC_TO_RAD、SIXTH、SPI、SRS_WGS84_ESQUARED、SRS_WGS84_SEMIMAJOR、SRS_WGS84_SEMIMINOR、TWO_PI；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/D2R.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-D2R-js)

## `eyes/src/vendor/modules/DRACOLoader.js`

DRACOLoader 对应资源的请求、解析与缓存协作。[源码](../../eyes/src/vendor/modules/DRACOLoader.js)。语义状态：`partially-matched-upstream`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-DRACOLoader-js)

### `DRACOLoader`

DRACOLoader 对应资源的请求、解析与缓存协作。父类 `ThreeCore.Loader`。

- `constructor(manager)` [源码:18](../../eyes/src/vendor/modules/DRACOLoader.js#L18)：当前操作：写入 decoderBinary、decoderConfig、decoderPaths、decoderPending、defaultAttributeIDs、defaultAttributeTypes、workerLimit、workerNextTaskID、workerPool、workerSourceURL；返回 无显式返回。
- `setDecoderPath(path)` [源码:35](../../eyes/src/vendor/modules/DRACOLoader.js#L35)：当前操作：写入 无直接字段写入；返回 "object"==typeof path?(decoderPaths.js=path.js,decoderPaths.wasm=path.wasm,decoderPaths.dep_js=null):(decoderPaths.js=ThreeCore.LoaderUtils.resolveURL("draco_wasm_wrapper.js",path),decoderPaths.wasm=ThreeCore.LoaderUtils。
- `setDecoderConfig(config)` [源码:41](../../eyes/src/vendor/modules/DRACOLoader.js#L41)：当前操作：写入 decoderConfig；返回 console.warn("THREE.DRACOLoader: setDecoderConfig to has been deprecated and will be removed in r194."),this.decoderConfig=config,this。
- `setWorkerLimit(workerLimit)` [源码:44](../../eyes/src/vendor/modules/DRACOLoader.js#L44)：当前操作：写入 workerLimit；返回 this.workerLimit=workerLimit,this。
- `load(url, onLoad, onProgress, onError)` [源码:47](../../eyes/src/vendor/modules/DRACOLoader.js#L47)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `parse(buffer, onLoad, n=()=>{})` [源码:53](../../eyes/src/vendor/modules/DRACOLoader.js#L53)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `decodeDracoFile(buffer, callback, attributeIDs, attributeTypes, a=ThreeCore.LinearSRGBColorSpace, s=()=>{})` [源码:56](../../eyes/src/vendor/modules/DRACOLoader.js#L56)：当前操作：写入 无直接字段写入；返回 this.decodeGeometry(buffer,o).then(callback).catch(s)。
- `decodeGeometry(buffer, taskConfig)` [源码:65](../../eyes/src/vendor/modules/DRACOLoader.js#L65)：当前操作：写入 workerNextTaskID；返回 t.promise、o.catch(()=>!0).then(()=>{r&&a&&this._releaseTask(r,a);}),weakMap.set(buffer,{key:n,promise:o}),o。
- `_createGeometry(geometryData)` [源码:93](../../eyes/src/vendor/modules/DRACOLoader.js#L93)：当前操作：写入 无直接字段写入；返回 bufferGeometry。
- `_assignVertexColorSpace(attribute, inputColorSpace)` [源码:113](../../eyes/src/vendor/modules/DRACOLoader.js#L113)：当前操作：写入 无直接字段写入；返回 void。
- `_loadLibrary(url, responseType)` [源码:118](../../eyes/src/vendor/modules/DRACOLoader.js#L118)：当前操作：写入 无直接字段写入；返回 fileLoader.setResponseType(responseType),fileLoader.setWithCredentials(this.withCredentials),new Promise((t,r)=>{fileLoader.load(url,t,void 0,r);})。
- `preload()` [源码:124](../../eyes/src/vendor/modules/DRACOLoader.js#L124)：当前操作：写入 无直接字段写入；返回 this._initDecoder(),this。
- `_initDecoder()` [源码:127](../../eyes/src/vendor/modules/DRACOLoader.js#L127)：当前操作：写入 decoderConfig.wasmBinary、decoderPending、workerSourceURL；返回 this.decoderPending、this.decoderPending=Promise.all(t).then(t=>{const n=t[0];e\|\|(this.decoderConfig.wasmBinary=t[1]);const r=DRACOWorker.toString(),i=["/* draco decoder * /",n,"","/* worker * /",r.substring(r.indexOf("{")+1,r.lastIndexOf("}")。
- `_getWorker(taskID, taskCost)` [源码:146](../../eyes/src/vendor/modules/DRACOLoader.js#L146)：当前操作：写入 无直接字段写入；返回 this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const worker=new Worker(this.workerSourceURL);worker._callbacks={},worker._taskCosts={},worker._taskLoad=0,worker.postMessage({type:"init",decoder。
- `_releaseTask(worker, taskID)` [源码:173](../../eyes/src/vendor/modules/DRACOLoader.js#L173)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `debug()` [源码:176](../../eyes/src/vendor/modules/DRACOLoader.js#L176)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `dispose()` [源码:179](../../eyes/src/vendor/modules/DRACOLoader.js#L179)：当前操作：写入 workerPool.length；返回 this.workerPool.length=0,""!==this.workerSourceURL&&URL.revokeObjectURL(this.workerSourceURL),this。

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

串联后处理通道并在双渲染目标之间交换读写缓冲。[源码](../../eyes/src/vendor/modules/EffectComposer.js)。语义状态：`partially-matched-upstream`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-EffectComposer-js)

### `EffectComposer`

串联后处理通道并在双渲染目标之间交换读写缓冲。父类 `无`。

- `constructor(renderer, renderTarget)` [源码:8](../../eyes/src/vendor/modules/EffectComposer.js#L8)：当前操作：写入 _height、_pixelRatio、_width、copyPass、copyPass.material.blending、passes、readBuffer、renderTarget1、renderTarget2、renderTarget2.texture.name、renderToScreen、renderer、timer、writeBuffer；返回 无显式返回。
- `swapBuffers()` [源码:17](../../eyes/src/vendor/modules/EffectComposer.js#L17)：当前操作：写入 readBuffer、writeBuffer；返回 无显式返回。
- `addPass(pass)` [源码:21](../../eyes/src/vendor/modules/EffectComposer.js#L21)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `insertPass(pass, index)` [源码:24](../../eyes/src/vendor/modules/EffectComposer.js#L24)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removePass(pass)` [源码:27](../../eyes/src/vendor/modules/EffectComposer.js#L27)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `isLastEnabledPass(passIndex)` [源码:31](../../eyes/src/vendor/modules/EffectComposer.js#L31)：当前操作：写入 无直接字段写入；返回 !1、!0。
- `render(deltaTime)` [源码:35](../../eyes/src/vendor/modules/EffectComposer.js#L35)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `reset(renderTarget)` [源码:55](../../eyes/src/vendor/modules/EffectComposer.js#L55)：当前操作：写入 _height、_pixelRatio、_width、readBuffer、renderTarget1、renderTarget2、writeBuffer；返回 无显式返回。
- `setSize(width, height)` [源码:62](../../eyes/src/vendor/modules/EffectComposer.js#L62)：当前操作：写入 _height、_width；返回 无显式返回。
- `setPixelRatio(pixelRatio)` [源码:69](../../eyes/src/vendor/modules/EffectComposer.js#L69)：当前操作：写入 _pixelRatio；返回 无显式返回。
- `dispose()` [源码:72](../../eyes/src/vendor/modules/EffectComposer.js#L72)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/vendor/modules/FollowName.cjs`

将对应压缩时区 JSON 加载进 Moment Timezone 实例并导出该实例。[源码](../../eyes/src/vendor/modules/FollowName.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-FollowName-cjs)

## `eyes/src/vendor/modules/GLTFLoader.js`

GLTFLoader 对应资源的请求、解析与缓存协作；glTF Lights 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsUnlit 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsEmissiveStrength 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsClearcoat 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsDispersion 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsIridescence 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsSheen 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsTransmission 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsVolume 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsIor 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsSpecular 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsBump 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsAnisotropy 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF TextureBasisU 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF TextureWebP 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF TextureAVIF 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MeshoptCompression 解析、缓存或插值组件；glTF MeshGpuInstancing 解析、缓存或插值组件；glTF Binary 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF DracoMeshCompression 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF TextureTransform 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MeshQuantization 扩展处理器；将扩展字段映射到 Three 对象或材质；GLTFCubicSpline 插值算法；对关键帧区间求连续或离散值；GLTFCubicSplineQuaternion 插值算法；对关键帧区间求连续或离散值；glTF Parser 解析、缓存或插值组件。[源码](../../eyes/src/vendor/modules/GLTFLoader.js)。语义状态：`partially-matched-upstream`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-GLTFLoader-js)

### `GLTFLoader`

GLTFLoader 对应资源的请求、解析与缓存协作。父类 `ThreeCore.Loader`。

- `constructor(manager)` [源码:7](../../eyes/src/vendor/modules/GLTFLoader.js#L7)：当前操作：写入 dracoLoader、ktx2Loader、meshoptDecoder、pluginCallbacks；返回 无显式返回。
- `load(url, onLoad, onProgress, onError)` [源码:46](../../eyes/src/vendor/modules/GLTFLoader.js#L46)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setDRACOLoader(dracoLoader)` [源码:68](../../eyes/src/vendor/modules/GLTFLoader.js#L68)：当前操作：写入 dracoLoader；返回 this.dracoLoader=dracoLoader,this。
- `setKTX2Loader(ktx2Loader)` [源码:71](../../eyes/src/vendor/modules/GLTFLoader.js#L71)：当前操作：写入 ktx2Loader；返回 this.ktx2Loader=ktx2Loader,this。
- `setMeshoptDecoder(meshoptDecoder)` [源码:74](../../eyes/src/vendor/modules/GLTFLoader.js#L74)：当前操作：写入 meshoptDecoder；返回 this.meshoptDecoder=meshoptDecoder,this。
- `register(callback)` [源码:77](../../eyes/src/vendor/modules/GLTFLoader.js#L77)：当前操作：写入 无直接字段写入；返回 -1===this.pluginCallbacks.indexOf(callback)&&this.pluginCallbacks.push(callback),this。
- `unregister(callback)` [源码:80](../../eyes/src/vendor/modules/GLTFLoader.js#L80)：当前操作：写入 无直接字段写入；返回 -1!==this.pluginCallbacks.indexOf(callback)&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(callback),1),this。
- `parse(data, path, onLoad, onError)` [源码:83](../../eyes/src/vendor/modules/GLTFLoader.js#L83)：当前操作：写入 无直接字段写入；返回 void(onError&&onError(e))、void(onError&&onError(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.")))。
- `parseAsync(data, path)` [源码:134](../../eyes/src/vendor/modules/GLTFLoader.js#L134)：当前操作：写入 无直接字段写入；返回 new Promise(function(r,i){n.parse(data,path,r,i);})。

### `GLTFLightsExtension`

glTF Lights 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:188](../../eyes/src/vendor/modules/GLTFLoader.js#L188)：当前操作：写入 cache、name、parser；返回 无显式返回。
- `_markDefs()` [源码:194](../../eyes/src/vendor/modules/GLTFLoader.js#L194)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_loadLight(lightIndex)` [源码:202](../../eyes/src/vendor/modules/GLTFLoader.js#L202)：当前操作：写入 无直接字段写入；返回 i、o.position.set(0,0,0),assignExtrasToUserData(o,s),void 0!==s.intensity&&(o.intensity=s.intensity),o.name=parser.createUniqueName(s.name\|\|"light_"+lightIndex),i=Promise.resolve(o),parser.cache.add(n,i),i。
- `getDependency(type, index)` [源码:228](../../eyes/src/vendor/modules/GLTFLoader.js#L228)：当前操作：写入 无直接字段写入；返回 this._loadLight(index)。
- `createNodeAttachment(nodeIndex)` [源码:231](../../eyes/src/vendor/modules/GLTFLoader.js#L231)：当前操作：写入 无直接字段写入；返回 void 0===i?null:this._loadLight(i).then(function(e){return parser._getNodeRef(t.cache,i,e);})。

### `GLTFMaterialsUnlitExtension`

glTF MaterialsUnlit 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor()` [源码:242](../../eyes/src/vendor/modules/GLTFLoader.js#L242)：当前操作：写入 name；返回 无显式返回。
- `getMaterialType()` [源码:245](../../eyes/src/vendor/modules/GLTFLoader.js#L245)：当前操作：写入 无直接字段写入；返回 ThreeCore.MeshBasicMaterial。
- `extendParams(materialParams, materialDef, parser)` [源码:248](../../eyes/src/vendor/modules/GLTFLoader.js#L248)：当前操作：写入 无直接字段写入；返回 Promise.all(i)。

### `GLTFMaterialsEmissiveStrengthExtension`

glTF MaterialsEmissiveStrength 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:263](../../eyes/src/vendor/modules/GLTFLoader.js#L263)：当前操作：写入 name、parser；返回 无显式返回。
- `extendMaterialParams(materialIndex, materialParams)` [源码:266](../../eyes/src/vendor/modules/GLTFLoader.js#L266)：当前操作：写入 无直接字段写入；返回 null===n\|\|void 0!==n.emissiveStrength&&(materialParams.emissiveIntensity=n.emissiveStrength),Promise.resolve()。

### `GLTFMaterialsClearcoatExtension`

glTF MaterialsClearcoat 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:272](../../eyes/src/vendor/modules/GLTFLoader.js#L272)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(materialIndex)` [源码:275](../../eyes/src/vendor/modules/GLTFLoader.js#L275)：当前操作：写入 无直接字段写入；返回 null!==getMaterialExtension(this.parser,materialIndex,this.name)?ThreeCore.MeshPhysicalMaterial:null。
- `extendMaterialParams(materialIndex, materialParams)` [源码:278](../../eyes/src/vendor/modules/GLTFLoader.js#L278)：当前操作：写入 无直接字段写入；返回 Promise.resolve()、Promise.all(i)。

### `GLTFMaterialsDispersionExtension`

glTF MaterialsDispersion 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:290](../../eyes/src/vendor/modules/GLTFLoader.js#L290)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(materialIndex)` [源码:293](../../eyes/src/vendor/modules/GLTFLoader.js#L293)：当前操作：写入 无直接字段写入；返回 null!==getMaterialExtension(this.parser,materialIndex,this.name)?ThreeCore.MeshPhysicalMaterial:null。
- `extendMaterialParams(materialIndex, materialParams)` [源码:296](../../eyes/src/vendor/modules/GLTFLoader.js#L296)：当前操作：写入 无直接字段写入；返回 null===n\|\|(materialParams.dispersion=void 0!==n.dispersion?n.dispersion:0),Promise.resolve()。

### `GLTFMaterialsIridescenceExtension`

glTF MaterialsIridescence 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:302](../../eyes/src/vendor/modules/GLTFLoader.js#L302)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(materialIndex)` [源码:305](../../eyes/src/vendor/modules/GLTFLoader.js#L305)：当前操作：写入 无直接字段写入；返回 null!==getMaterialExtension(this.parser,materialIndex,this.name)?ThreeCore.MeshPhysicalMaterial:null。
- `extendMaterialParams(materialIndex, materialParams)` [源码:308](../../eyes/src/vendor/modules/GLTFLoader.js#L308)：当前操作：写入 无直接字段写入；返回 Promise.resolve()、void 0!==n.iridescenceFactor&&(materialParams.iridescence=n.iridescenceFactor),void 0!==n.iridescenceTexture&&r.push(this.parser.assignTexture(materialParams,"iridescenceMap",n.iridescenceTexture)),void 0!==n.iridescence。

### `GLTFMaterialsSheenExtension`

glTF MaterialsSheen 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:316](../../eyes/src/vendor/modules/GLTFLoader.js#L316)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(materialIndex)` [源码:319](../../eyes/src/vendor/modules/GLTFLoader.js#L319)：当前操作：写入 无直接字段写入；返回 null!==getMaterialExtension(this.parser,materialIndex,this.name)?ThreeCore.MeshPhysicalMaterial:null。
- `extendMaterialParams(materialIndex, materialParams)` [源码:322](../../eyes/src/vendor/modules/GLTFLoader.js#L322)：当前操作：写入 无直接字段写入；返回 Promise.resolve()、void 0!==n.sheenRoughnessFactor&&(materialParams.sheenRoughness=n.sheenRoughnessFactor),void 0!==n.sheenColorTexture&&i.push(this.parser.assignTexture(materialParams,"sheenColorMap",n.sheenColorTexture,ThreeCore.SRGBColo。

### `GLTFMaterialsTransmissionExtension`

glTF MaterialsTransmission 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:334](../../eyes/src/vendor/modules/GLTFLoader.js#L334)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(materialIndex)` [源码:337](../../eyes/src/vendor/modules/GLTFLoader.js#L337)：当前操作：写入 无直接字段写入；返回 null!==getMaterialExtension(this.parser,materialIndex,this.name)?ThreeCore.MeshPhysicalMaterial:null。
- `extendMaterialParams(materialIndex, materialParams)` [源码:340](../../eyes/src/vendor/modules/GLTFLoader.js#L340)：当前操作：写入 无直接字段写入；返回 Promise.resolve()、void 0!==n.transmissionFactor&&(materialParams.transmission=n.transmissionFactor),void 0!==n.transmissionTexture&&r.push(this.parser.assignTexture(materialParams,"transmissionMap",n.transmissionTexture)),Promise.all(r)。

### `GLTFMaterialsVolumeExtension`

glTF MaterialsVolume 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:348](../../eyes/src/vendor/modules/GLTFLoader.js#L348)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(materialIndex)` [源码:351](../../eyes/src/vendor/modules/GLTFLoader.js#L351)：当前操作：写入 无直接字段写入；返回 null!==getMaterialExtension(this.parser,materialIndex,this.name)?ThreeCore.MeshPhysicalMaterial:null。
- `extendMaterialParams(materialIndex, materialParams)` [源码:354](../../eyes/src/vendor/modules/GLTFLoader.js#L354)：当前操作：写入 无直接字段写入；返回 Promise.resolve()、materialParams.attenuationColor=new ThreeCore.Color().setRGB(a[0],a[1],a[2],ThreeCore.LinearSRGBColorSpace),Promise.all(i)。

### `GLTFMaterialsIorExtension`

glTF MaterialsIor 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:364](../../eyes/src/vendor/modules/GLTFLoader.js#L364)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(materialIndex)` [源码:367](../../eyes/src/vendor/modules/GLTFLoader.js#L367)：当前操作：写入 无直接字段写入；返回 null!==getMaterialExtension(this.parser,materialIndex,this.name)?ThreeCore.MeshPhysicalMaterial:null。
- `extendMaterialParams(materialIndex, materialParams)` [源码:370](../../eyes/src/vendor/modules/GLTFLoader.js#L370)：当前操作：写入 无直接字段写入；返回 null===n\|\|(materialParams.ior=void 0!==n.ior?n.ior:1.5,0===materialParams.ior&&(materialParams.ior=1e3)),Promise.resolve()。

### `GLTFMaterialsSpecularExtension`

glTF MaterialsSpecular 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:376](../../eyes/src/vendor/modules/GLTFLoader.js#L376)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(materialIndex)` [源码:379](../../eyes/src/vendor/modules/GLTFLoader.js#L379)：当前操作：写入 无直接字段写入；返回 null!==getMaterialExtension(this.parser,materialIndex,this.name)?ThreeCore.MeshPhysicalMaterial:null。
- `extendMaterialParams(materialIndex, materialParams)` [源码:382](../../eyes/src/vendor/modules/GLTFLoader.js#L382)：当前操作：写入 无直接字段写入；返回 Promise.resolve()、materialParams.specularColor=new ThreeCore.Color().setRGB(a[0],a[1],a[2],ThreeCore.LinearSRGBColorSpace),void 0!==n.specularColorTexture&&i.push(this.parser.assignTexture(materialParams,"specularColorMap",n.specularColor。

### `GLTFMaterialsBumpExtension`

glTF MaterialsBump 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:392](../../eyes/src/vendor/modules/GLTFLoader.js#L392)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(materialIndex)` [源码:395](../../eyes/src/vendor/modules/GLTFLoader.js#L395)：当前操作：写入 无直接字段写入；返回 null!==getMaterialExtension(this.parser,materialIndex,this.name)?ThreeCore.MeshPhysicalMaterial:null。
- `extendMaterialParams(materialIndex, materialParams)` [源码:398](../../eyes/src/vendor/modules/GLTFLoader.js#L398)：当前操作：写入 无直接字段写入；返回 Promise.resolve()、materialParams.bumpScale=void 0!==n.bumpFactor?n.bumpFactor:1,void 0!==n.bumpTexture&&r.push(this.parser.assignTexture(materialParams,"bumpMap",n.bumpTexture)),Promise.all(r)。

### `GLTFMaterialsAnisotropyExtension`

glTF MaterialsAnisotropy 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:406](../../eyes/src/vendor/modules/GLTFLoader.js#L406)：当前操作：写入 name、parser；返回 无显式返回。
- `getMaterialType(materialIndex)` [源码:409](../../eyes/src/vendor/modules/GLTFLoader.js#L409)：当前操作：写入 无直接字段写入；返回 null!==getMaterialExtension(this.parser,materialIndex,this.name)?ThreeCore.MeshPhysicalMaterial:null。
- `extendMaterialParams(materialIndex, materialParams)` [源码:412](../../eyes/src/vendor/modules/GLTFLoader.js#L412)：当前操作：写入 无直接字段写入；返回 Promise.resolve()、void 0!==n.anisotropyStrength&&(materialParams.anisotropy=n.anisotropyStrength),void 0!==n.anisotropyRotation&&(materialParams.anisotropyRotation=n.anisotropyRotation),void 0!==n.anisotropyTexture&&r.push(this.parser.ass。

### `GLTFTextureBasisUExtension`

glTF TextureBasisU 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:420](../../eyes/src/vendor/modules/GLTFLoader.js#L420)：当前操作：写入 name、parser；返回 无显式返回。
- `loadTexture(textureIndex)` [源码:423](../../eyes/src/vendor/modules/GLTFLoader.js#L423)：当前操作：写入 无直接字段写入；返回 null、parser.loadTextureImage(textureIndex,i.source,a)。

### `GLTFTextureWebPExtension`

glTF TextureWebP 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:438](../../eyes/src/vendor/modules/GLTFLoader.js#L438)：当前操作：写入 name、parser；返回 无显式返回。
- `loadTexture(textureIndex)` [源码:441](../../eyes/src/vendor/modules/GLTFLoader.js#L441)：当前操作：写入 无直接字段写入；返回 null、parser.loadTextureImage(textureIndex,a.source,o)。

### `GLTFTextureAVIFExtension`

glTF TextureAVIF 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(parser)` [源码:458](../../eyes/src/vendor/modules/GLTFLoader.js#L458)：当前操作：写入 name、parser；返回 无显式返回。
- `loadTexture(textureIndex)` [源码:461](../../eyes/src/vendor/modules/GLTFLoader.js#L461)：当前操作：写入 无直接字段写入；返回 null、parser.loadTextureImage(textureIndex,a.source,o)。

### `GLTFMeshoptCompression`

glTF MeshoptCompression 解析、缓存或插值组件。父类 `无`。

- `constructor(parser, name)` [源码:478](../../eyes/src/vendor/modules/GLTFLoader.js#L478)：当前操作：写入 name、parser；返回 无显式返回。
- `loadBufferView(index)` [源码:481](../../eyes/src/vendor/modules/GLTFLoader.js#L481)：当前操作：写入 无直接字段写入；返回 null、r.then(function(t){const n=e.byteOffset\|\|0,r=e.byteLength\|\|0,a=e.count,s=e.byteStride,uint8Array=new Uint8Array(t,n,r);return i.decodeGltfBufferAsync?i.decodeGltfBufferAsync(a,s,uint8Array,e.mode,e.filter).then(function(。

### `GLTFMeshGpuInstancing`

glTF MeshGpuInstancing 解析、缓存或插值组件。父类 `无`。

- `constructor(parser)` [源码:510](../../eyes/src/vendor/modules/GLTFLoader.js#L510)：当前操作：写入 name、parser；返回 无显式返回。
- `createNodeMesh(nodeIndex)` [源码:513](../../eyes/src/vendor/modules/GLTFLoader.js#L513)：当前操作：写入 无直接字段写入；返回 null、s.length<1?null:(s.push(this.parser.createNodeMesh(nodeIndex)),Promise.all(s).then(e=>{const t=e.pop(),n=t.isGroup?t.children:[t],i=e[0].count,a=[];for(const e of n){const matrix4=new ThreeCore.Matrix4(),vector3=new Thre。

### `GLTFBinaryExtension`

glTF Binary 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(data)` [源码:549](../../eyes/src/vendor/modules/GLTFLoader.js#L549)：当前操作：写入 body、content、header、name；返回 无显式返回。

### `GLTFDracoMeshCompressionExtension`

glTF DracoMeshCompression 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor(json, dracoLoader)` [源码:579](../../eyes/src/vendor/modules/GLTFLoader.js#L579)：当前操作：写入 dracoLoader、json、name；返回 无显式返回。
- `decodePrimitive(primitive, parser)` [源码:583](../../eyes/src/vendor/modules/GLTFLoader.js#L583)：当前操作：写入 无直接字段写入；返回 parser.getDependency("bufferView",a).then(function(e){return new Promise(function(t,n){dracoLoader.decodeDracoFile(e,function(e){for(const t in e.attributes){const n=e.attributes[t],r=c[t];void 0!==r&&(n.normalized=r);}t。

### `GLTFTextureTransformExtension`

glTF TextureTransform 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor()` [源码:618](../../eyes/src/vendor/modules/GLTFLoader.js#L618)：当前操作：写入 name；返回 无显式返回。
- `extendTexture(texture, transform)` [源码:621](../../eyes/src/vendor/modules/GLTFLoader.js#L621)：当前操作：写入 无直接字段写入；返回 void 0!==transform.texCoord&&transform.texCoord!==texture.channel\|\|void 0!==transform.offset\|\|void 0!==transform.rotation\|\|void 0!==transform.scale?(texture=texture.clone(),void 0!==transform.texCoord&&(texture.channel=t。

### `GLTFMeshQuantizationExtension`

glTF MeshQuantization 扩展处理器；将扩展字段映射到 Three 对象或材质。父类 `无`。

- `constructor()` [源码:626](../../eyes/src/vendor/modules/GLTFLoader.js#L626)：当前操作：写入 name；返回 无显式返回。

### `GLTFCubicSplineInterpolant`

GLTFCubicSpline 插值算法；对关键帧区间求连续或离散值。父类 `ThreeCore.Interpolant`。

- `constructor(parameterPositions, sampleValues, sampleSize, resultBuffer)` [源码:631](../../eyes/src/vendor/modules/GLTFLoader.js#L631)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `copySampleValue_(index)` [源码:634](../../eyes/src/vendor/modules/GLTFLoader.js#L634)：当前操作：写入 无直接字段写入；返回 resultBuffer。
- `interpolate_(i1, t0, n, t1)` [源码:642](../../eyes/src/vendor/modules/GLTFLoader.js#L642)：当前操作：写入 无直接字段写入；返回 resultBuffer。

### `GLTFCubicSplineQuaternionInterpolant`

GLTFCubicSplineQuaternion 插值算法；对关键帧区间求连续或离散值。父类 `GLTFCubicSplineInterpolant`。

- `interpolate_(i1, t0, n, t1)` [源码:670](../../eyes/src/vendor/modules/GLTFLoader.js#L670)：当前操作：写入 无直接字段写入；返回 quaternion.fromArray(i).normalize().toArray(i),i。

### `GLTFParser`

glTF Parser 解析、缓存或插值组件。父类 `无`。

- `constructor(json={}, options={})` [源码:806](../../eyes/src/vendor/modules/GLTFLoader.js#L806)：当前操作：写入 associations、cache、cameraCache、extensions、fileLoader、json、lightCache、meshCache、nodeCache、nodeNamesUsed、options、plugins、primitiveCache、sourceCache、textureCache、textureLoader；返回 无显式返回。
- `setExtensions(extensions)` [源码:829](../../eyes/src/vendor/modules/GLTFLoader.js#L829)：当前操作：写入 extensions；返回 无显式返回。
- `setPlugins(plugins)` [源码:832](../../eyes/src/vendor/modules/GLTFLoader.js#L832)：当前操作：写入 plugins；返回 无显式返回。
- `parse(onLoad, onError)` [源码:835](../../eyes/src/vendor/modules/GLTFLoader.js#L835)：当前操作：写入 nodeCache；返回 无显式返回。
- `_markDefs()` [源码:863](../../eyes/src/vendor/modules/GLTFLoader.js#L863)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_addNodeRef(cache, index)` [源码:876](../../eyes/src/vendor/modules/GLTFLoader.js#L876)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getNodeRef(cache, index, object)` [源码:879](../../eyes/src/vendor/modules/GLTFLoader.js#L879)：当前操作：写入 无直接字段写入；返回 object、i(object,r),r.name+="_instance_"+cache.uses[index]++,r。
- `_invokeOne(func)` [源码:889](../../eyes/src/vendor/modules/GLTFLoader.js#L889)：当前操作：写入 无直接字段写入；返回 r、null。
- `_invokeAll(func)` [源码:898](../../eyes/src/vendor/modules/GLTFLoader.js#L898)：当前操作：写入 无直接字段写入；返回 n。
- `getDependency(type, index)` [源码:908](../../eyes/src/vendor/modules/GLTFLoader.js#L908)：当前操作：写入 无直接字段写入；返回 r。
- `getDependencies(type)` [源码:967](../../eyes/src/vendor/modules/GLTFLoader.js#L967)：当前操作：写入 无直接字段写入；返回 t。
- `loadBuffer(bufferIndex)` [源码:978](../../eyes/src/vendor/modules/GLTFLoader.js#L978)：当前操作：写入 无直接字段写入；返回 Promise.resolve(this.extensions[c.KHR_BINARY_GLTF].body)、new Promise(function(e,a){fileLoader.load(ThreeCore.LoaderUtils.resolveURL(t.uri,options.path),e,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'));});})。
- `loadBufferView(bufferViewIndex)` [源码:990](../../eyes/src/vendor/modules/GLTFLoader.js#L990)：当前操作：写入 无直接字段写入；返回 this.getDependency("buffer",t.buffer).then(function(e){const n=t.byteLength\|\|0,r=t.byteOffset\|\|0;return e.slice(r,r+n);})。
- `loadAccessor(accessorIndex)` [源码:998](../../eyes/src/vendor/modules/GLTFLoader.js#L998)：当前操作：写入 无直接字段写入；返回 Promise.resolve(new ThreeCore.BufferAttribute(a,e,n))、void 0!==i.bufferView?a.push(this.getDependency("bufferView",i.bufferView)):a.push(null),void 0!==i.sparse&&(a.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),a.push(this.getDependency("bufferView",i.s。
- `loadTexture(textureIndex)` [源码:1043](../../eyes/src/vendor/modules/GLTFLoader.js#L1043)：当前操作：写入 无直接字段写入；返回 this.loadTextureImage(textureIndex,r,textureLoader)。
- `loadTextureImage(textureIndex, sourceIndex, loader)` [源码:1055](../../eyes/src/vendor/modules/GLTFLoader.js#L1055)：当前操作：写入 textureCache[c]；返回 this.textureCache[c]、this.textureCache[c]=l,l。
- `loadImageSource(sourceIndex, loader)` [源码:1073](../../eyes/src/vendor/modules/GLTFLoader.js#L1073)：当前操作：写入 sourceCache[sourceIndex]；返回 this.sourceCache[sourceIndex].then(e=>e.clone())、this.sourceCache[sourceIndex]=u,u。
- `assignTexture(materialParams, mapName, mapDef, colorSpace)` [源码:1105](../../eyes/src/vendor/modules/GLTFLoader.js#L1105)：当前操作：写入 无直接字段写入；返回 this.getDependency("texture",mapDef.index).then(function(a){if(!a)return null;if(void 0!==mapDef.texCoord&&mapDef.texCoord>0&&((a=a.clone()).channel=mapDef.texCoord),i.extensions[c.KHR_TEXTURE_TRANSFORM]){const e=void 0!。
- `assignFinalMaterial(mesh)` [源码:1119](../../eyes/src/vendor/modules/GLTFLoader.js#L1119)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getMaterialType()` [源码:1142](../../eyes/src/vendor/modules/GLTFLoader.js#L1142)：当前操作：写入 无直接字段写入；返回 ThreeCore.MeshStandardMaterial。
- `loadMaterial(materialIndex)` [源码:1145](../../eyes/src/vendor/modules/GLTFLoader.js#L1145)：当前操作：写入 无直接字段写入；返回 void 0!==a.emissiveTexture&&s!==ThreeCore.MeshBasicMaterial&&l.push(t.assignTexture(o,"emissiveMap",a.emissiveTexture,ThreeCore.SRGBColorSpace)),Promise.all(l).then(function(){const n=new s(o);return a.name&&(n.name=a.na。
- `createUniqueName(originalName)` [源码:1185](../../eyes/src/vendor/modules/GLTFLoader.js#L1185)：当前操作：写入 nodeNamesUsed[t]；返回 t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)。
- `loadGeometries(primitives)` [源码:1189](../../eyes/src/vendor/modules/GLTFLoader.js#L1189)：当前操作：写入 无直接字段写入；返回 Promise.all(s)。
- `loadMesh(meshIndex)` [源码:1213](../../eyes/src/vendor/modules/GLTFLoader.js#L1213)：当前操作：写入 无直接字段写入；返回 c.push(t.loadGeometries(o)),Promise.all(c).then(function(n){const c=n.slice(0,n.length-1),l=n[n.length-1],u=[];for(let n=0,d=l.length;n<d;n++){const d=l[n],h=o[n];let f;const m=c[n];if(h.mode===p.TRIANGLES\|\|h.mode===p.TR。
- `loadCamera(cameraIndex)` [源码:1252](../../eyes/src/vendor/modules/GLTFLoader.js#L1252)：当前操作：写入 无直接字段写入；返回 "perspective"===n.type?t=new ThreeCore.PerspectiveCamera(ThreeCore.MathUtils.radToDeg(i.yfov),i.aspectRatio\|\|1,i.znear\|\|1,i.zfar\|\|2e6):"orthographic"===n.type&&(t=new ThreeCore.OrthographicCamera(-i.xmag,i.xmag,i.ymag,-i。
- `loadSkin(skinIndex)` [源码:1259](../../eyes/src/vendor/modules/GLTFLoader.js#L1259)：当前操作：写入 无直接字段写入；返回 void 0!==t.inverseBindMatrices?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(e){const n=e.pop(),i=e,a=[],s=[];for(let e=0,o=i.length;e<o;e++){const o=i[e];if(o){a.。
- `loadAnimation(animationIndex)` [源码:1279](../../eyes/src/vendor/modules/GLTFLoader.js#L1279)：当前操作：写入 无直接字段写入；返回 Promise.all([Promise.all(s),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(e){const t=e[0],s=e[1],o=e[2],c=e[3],l=e[4],u=[];for(let e=0,r=t.length;e<r;e++){const r=t[e],i=s[e],a=o[e],d=c[e],h。
- `createNodeMesh(nodeIndex)` [源码:1320](../../eyes/src/vendor/modules/GLTFLoader.js#L1320)：当前操作：写入 无直接字段写入；返回 void 0===r.mesh?null:n.getDependency("mesh",r.mesh).then(function(e){const t=n._getNodeRef(n.meshCache,r.mesh,e);return void 0!==r.weights&&t.traverse(function(e){if(e.isMesh)for(let t=0,n=r.weights.length;t<n;t++)e.morp。
- `loadNode(nodeIndex)` [源码:1331](../../eyes/src/vendor/modules/GLTFLoader.js#L1331)：当前操作：写入 无直接字段写入；返回 Promise.all([i,Promise.all(a),o]).then(function(e){const t=e[0],n=e[1],i=e[2];null!==i&&t.traverse(function(e){e.isSkinnedMesh&&e.bind(i,matrix4);});for(let e=0,r=n.length;e<r;e++)t.add(n[e]);if(void 0!==t.userData.pivot。
- `_loadNodeShallow(nodeIndex)` [源码:1355](../../eyes/src/vendor/modules/GLTFLoader.js#L1355)：当前操作：写入 nodeCache[nodeIndex]；返回 this.nodeCache[nodeIndex]、c&&o.push(c),void 0!==a.camera&&o.push(i.getDependency("camera",a.camera).then(function(e){return i._getNodeRef(i.cameraCache,a.camera,e);})),i._invokeAll(function(t){return t.createNodeAttachment&&t.createNodeAttachment。
- `loadScene(sceneIndex)` [源码:1390](../../eyes/src/vendor/modules/GLTFLoader.js#L1390)：当前操作：写入 无直接字段写入；返回 Promise.all(c).then(function(e){for(let t=0,n=e.length;t<n;t++){const n=e[t];null!==n.parent?group.add((0,clone.clone)(n)):group.add(n);}return i.associations=(e=>{const map=new Map();for(const[e,n]of i.associations)(e i。
- `_createAnimationTracks(node, inputAccessor, outputAccessor, sampler, target)` [源码:1414](../../eyes/src/vendor/modules/GLTFLoader.js#L1414)：当前操作：写入 无直接字段写入；返回 s。
- `_getArrayFromAccessor(accessor)` [源码:1444](../../eyes/src/vendor/modules/GLTFLoader.js#L1444)：当前操作：写入 无直接字段写入；返回 t。
- `_createCubicSplineTrackInterpolant(track)` [源码:1454](../../eyes/src/vendor/modules/GLTFLoader.js#L1454)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/vendor/modules/KTX2Loader.js`

KTX2Loader 对应资源的请求、解析与缓存协作。[源码](../../eyes/src/vendor/modules/KTX2Loader.js)。语义状态：`partially-matched-upstream`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-KTX2Loader-js)

### `KTX2Loader`

KTX2Loader 对应资源的请求、解析与缓存协作。父类 `ThreeCore.Loader`。

- `constructor(manager)` [源码:16](../../eyes/src/vendor/modules/KTX2Loader.js#L16)：当前操作：写入 transcoderBinary、transcoderPath、transcoderPending、workerConfig、workerPool、workerSourceURL；返回 无显式返回。
- `setTranscoderPath(path)` [源码:19](../../eyes/src/vendor/modules/KTX2Loader.js#L19)：当前操作：写入 transcoderPath；返回 this.transcoderPath=path,this。
- `setWorkerLimit(workerLimit)` [源码:22](../../eyes/src/vendor/modules/KTX2Loader.js#L22)：当前操作：写入 无直接字段写入；返回 this.workerPool.setWorkerLimit(workerLimit),this。
- `detectSupportAsync(renderer)` [源码:25](../../eyes/src/vendor/modules/KTX2Loader.js#L25)：当前操作：写入 无直接字段写入；返回 console.warn('KTX2Loader: "detectSupportAsync()" has been deprecated. Use "detectSupport()" and "await renderer.init();" when creating the renderer.'),await renderer.init(),this.detectSupport(renderer)。
- `detectSupport(renderer)` [源码:28](../../eyes/src/vendor/modules/KTX2Loader.js#L28)：当前操作：写入 workerConfig、workerConfig.astcSupported、workerConfig.etc1Supported、workerConfig.etc2Supported；返回 !0===renderer.isWebGPURenderer?this.workerConfig={astcSupported:renderer.hasFeature("texture-compression-astc"),astcHDRSupported:!1,etc1Supported:renderer.hasFeature("texture-compression-etc1"),etc2Supported:renderer.has。
- `init()` [源码:47](../../eyes/src/vendor/modules/KTX2Loader.js#L47)：当前操作：写入 transcoderBinary、transcoderPending、workerSourceURL；返回 this.transcoderPending。
- `load(url, onLoad, onProgress, onError)` [源码:69](../../eyes/src/vendor/modules/KTX2Loader.js#L69)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `parse(buffer, onLoad, onError)` [源码:76](../../eyes/src/vendor/modules/KTX2Loader.js#L76)：当前操作：写入 无直接字段写入；返回 weakMap.get(buffer).promise.then(onLoad).catch(onError)。
- `_createTextureFrom(transcodeResult, container)` [源码:83](../../eyes/src/vendor/modules/KTX2Loader.js#L83)：当前操作：写入 无直接字段写入；返回 Promise.reject(error)、h.minFilter=1===faces[0].mipmaps.length?ThreeCore.LinearFilter:ThreeCore.LinearMipmapLinearFilter,h.magFilter=ThreeCore.LinearFilter,h.generateMipmaps=!1,h.needsUpdate=!0,h.colorSpace=parseColorSpace(container),h.premult。
- `_createTexture(buffer, t={})` [源码:104](../../eyes/src/vendor/modules/KTX2Loader.js#L104)：当前操作：写入 无直接字段写入；返回 async function(e){const{vkFormat:vkFormat}=e;if(void 0===m[vkFormat])throw new Error("THREE.KTX2Loader: Unsupported vkFormat: "+vkFormat);void 0===M[vkFormat]&&console.warn('THREE.KTX2Loader: Missing ".type" for vkFormat、weakMap.set(buffer,{promise:c}),c。
- `dispose()` [源码:154](../../eyes/src/vendor/modules/KTX2Loader.js#L154)：当前操作：写入 无直接字段写入；返回 无显式返回。

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

提供 LuminosityHighPassShader；实现由这些导出命名的第三方工具/常量。[源码](../../eyes/src/vendor/modules/LuminosityHighPassShader.js)。语义状态：`partially-matched-upstream`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-LuminosityHighPassShader-js)

## `eyes/src/vendor/modules/MaskPass.js`

通过 stencil buffer 写入后处理遮罩；关闭后续通道的 stencil 遮罩约束。[源码](../../eyes/src/vendor/modules/MaskPass.js)。语义状态：`partially-matched-upstream`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-MaskPass-js)

### `MaskPass`

通过 stencil buffer 写入后处理遮罩。父类 `Pass.Pass`。

- `constructor(scene, camera)` [源码:5](../../eyes/src/vendor/modules/MaskPass.js#L5)：当前操作：写入 camera、clear、inverse、needsSwap、scene；返回 无显式返回。
- `render(renderer, writeBuffer, readBuffer)` [源码:8](../../eyes/src/vendor/modules/MaskPass.js#L8)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `ClearMaskPass`

关闭后续通道的 stencil 遮罩约束。父类 `Pass.Pass`。

- `constructor()` [源码:16](../../eyes/src/vendor/modules/MaskPass.js#L16)：当前操作：写入 needsSwap；返回 无显式返回。
- `render(renderer)` [源码:19](../../eyes/src/vendor/modules/MaskPass.js#L19)：当前操作：写入 无直接字段写入；返回 无显式返回。

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

分离可见/遮挡边缘并以降采样模糊叠加选中对象轮廓。[源码](../../eyes/src/vendor/modules/OutlinePass.js)。语义状态：`partially-matched-upstream`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-OutlinePass-js)

### `OutlinePass`

分离可见/遮挡边缘并以降采样模糊叠加选中对象轮廓。父类 `Pass.Pass`。

- `constructor(resolution, scene, camera, selectedObjects)` [源码:7](../../eyes/src/vendor/modules/OutlinePass.js#L7)：当前操作：写入 _fsQuad、_oldClearColor、_selectionCache、_visibilityCache、copyUniforms、depthMaterial、depthMaterial.blending、depthMaterial.depthPacking、depthMaterial.side、downSampleRatio、edgeDetectionMaterial、edgeGlow、edgeStrength、edgeThickness、enabled、hiddenEdgeColor、materialCopy、needsSwap、oldClearAlpha、overlayMaterial、patternTexture、prepareMaskMaterial、prepareMaskMaterial.fragmentShader、prepareMaskMaterial.side、pulsePeriod、renderCamera、renderScene、renderTargetBlurBuffer1、renderTargetBlurBuffer1.texture.generateMipmaps、renderTargetBlurBuffer1.texture.name、renderTargetBlurBuffer2、renderTargetBlurBuffer2.texture.generateMipmaps、renderTargetBlurBuffer2.texture.name、renderTargetDepthBuffer、renderTargetDepthBuffer.texture.generateMipmaps、renderTargetDepthBuffer.texture.name、renderTargetEdgeBuffer1、renderTargetEdgeBuffer1.texture.generateMipmaps、renderTargetEdgeBuffer1.texture.name、renderTargetEdgeBuffer2、renderTargetEdgeBuffer2.texture.generateMipmaps、renderTargetEdgeBuffer2.texture.name、renderTargetMaskBuffer、renderTargetMaskBuffer.texture.generateMipmaps、renderTargetMaskBuffer.texture.name、renderTargetMaskDownSampleBuffer、renderTargetMaskDownSampleBuffer.texture.generateMipmaps、renderTargetMaskDownSampleBuffer.texture.name、resolution、selectedObjects、separableBlurMaterial1、separableBlurMaterial1.uniforms.kernelRadius.value、separableBlurMaterial2、separableBlurMaterial2.uniforms.kernelRadius.value、tempPulseColor1、tempPulseColor2、textureMatrix、usePatternTexture、visibleEdgeColor；返回 无显式返回。
- `dispose()` [源码:38](../../eyes/src/vendor/modules/OutlinePass.js#L38)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setSize(width, height)` [源码:41](../../eyes/src/vendor/modules/OutlinePass.js#L41)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `render(renderer, writeBuffer, readBuffer, deltaTime, maskActive)` [源码:47](../../eyes/src/vendor/modules/OutlinePass.js#L47)：当前操作：写入 _fsQuad.material、copyUniforms.tDiffuse.value、edgeDetectionMaterial.uniforms.hiddenEdgeColor.value、edgeDetectionMaterial.uniforms.maskTexture.value、edgeDetectionMaterial.uniforms.visibleEdgeColor.value、oldClearAlpha、overlayMaterial.uniforms.edgeGlow.value、overlayMaterial.uniforms.edgeStrength.value、overlayMaterial.uniforms.edgeTexture1.value、overlayMaterial.uniforms.edgeTexture2.value、overlayMaterial.uniforms.maskTexture.value、overlayMaterial.uniforms.patternTexture.value、overlayMaterial.uniforms.usePatternTexture.value、prepareMaskMaterial.uniforms.depthTexture.value、prepareMaskMaterial.uniforms.textureMatrix.value、renderScene.background、renderScene.overrideMaterial、separableBlurMaterial1.uniforms.colorTexture.value、separableBlurMaterial1.uniforms.direction.value、separableBlurMaterial1.uniforms.kernelRadius.value、separableBlurMaterial2.uniforms.colorTexture.value、separableBlurMaterial2.uniforms.direction.value；返回 无显式返回。
- `_updateSelectionCache()` [源码:62](../../eyes/src/vendor/modules/OutlinePass.js#L62)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_changeVisibilityOfSelectedObjects(bVisible)` [源码:72](../../eyes/src/vendor/modules/OutlinePass.js#L72)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_changeVisibilityOfNonSelectedObjects(bVisible)` [源码:76](../../eyes/src/vendor/modules/OutlinePass.js#L76)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateTextureMatrix()` [源码:86](../../eyes/src/vendor/modules/OutlinePass.js#L86)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getPrepareMaskMaterial()` [源码:89](../../eyes/src/vendor/modules/OutlinePass.js#L89)：当前操作：写入 无直接字段写入；返回 new ThreeCore.ShaderMaterial({uniforms:{depthTexture:{value:null},cameraNearFar:{value:new ThreeCore.Vector2(.5,.5)},textureMatrix:{value:null}},vertexShader:"#include <batching_pars_vertex>\n\t\t\t\t#include <morphtarge。
- `_getEdgeDetectionMaterial()` [源码:106](../../eyes/src/vendor/modules/OutlinePass.js#L106)：当前操作：写入 无直接字段写入；返回 new ThreeCore.ShaderMaterial({uniforms:{maskTexture:{value:null},texSize:{value:new ThreeCore.Vector2(.5,.5)},visibleEdgeColor:{value:new ThreeCore.Vector3(1,1,1)},hiddenEdgeColor:{value:new ThreeCore.Vector3(1,1,1)}},ve。
- `_getSeparableBlurMaterial(maxRadius)` [源码:126](../../eyes/src/vendor/modules/OutlinePass.js#L126)：当前操作：写入 无直接字段写入；返回 new ThreeCore.ShaderMaterial({defines:{MAX_RADIUS:maxRadius},uniforms:{colorTexture:{value:null},texSize:{value:new ThreeCore.Vector2(.5,.5)},direction:{value:new ThreeCore.Vector2(.5,.5)},kernelRadius:{value:1}},vertexS。
- `_getOverlayMaterial()` [源码:149](../../eyes/src/vendor/modules/OutlinePass.js#L149)：当前操作：写入 无直接字段写入；返回 new ThreeCore.ShaderMaterial({uniforms:{maskTexture:{value:null},edgeTexture1:{value:null},edgeTexture2:{value:null},patternTexture:{value:null},edgeStrength:{value:1},edgeGlow:{value:1},usePatternTexture:{value:0}},vert。

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

后处理通道契约与启停、清屏及交换缓冲标志；FullscreenTriangle 几何生成器；构建 position/normal/uv 属性及三角索引；使用全屏三角形绘制后处理材质。[源码](../../eyes/src/vendor/modules/Pass.js)。语义状态：`partially-matched-upstream`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-Pass-js)

### `Pass`

后处理通道契约与启停、清屏及交换缓冲标志。父类 `无`。

- `constructor()` [源码:5](../../eyes/src/vendor/modules/Pass.js#L5)：当前操作：写入 clear、enabled、isPass、needsSwap、renderToScreen；返回 无显式返回。
- `setSize()` [源码:8](../../eyes/src/vendor/modules/Pass.js#L8)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `render()` [源码:9](../../eyes/src/vendor/modules/Pass.js#L9)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `dispose()` [源码:12](../../eyes/src/vendor/modules/Pass.js#L12)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `FullscreenTriangleGeometry`

FullscreenTriangle 几何生成器；构建 position/normal/uv 属性及三角索引。父类 `ThreeCore.BufferGeometry`。

- `constructor()` [源码:16](../../eyes/src/vendor/modules/Pass.js#L16)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `FullScreenQuad`

使用全屏三角形绘制后处理材质。父类 `无`。

- `constructor(material)` [源码:22](../../eyes/src/vendor/modules/Pass.js#L22)：当前操作：写入 _mesh；返回 无显式返回。
- `dispose()` [源码:25](../../eyes/src/vendor/modules/Pass.js#L25)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `render(renderer)` [源码:28](../../eyes/src/vendor/modules/Pass.js#L28)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `get material()` [源码:31](../../eyes/src/vendor/modules/Pass.js#L31)：当前操作：写入 无直接字段写入；返回 this._mesh.material。
- `set material(value)` [源码:34](../../eyes/src/vendor/modules/Pass.js#L34)：当前操作：写入 _mesh.material；返回 无显式返回。

## `eyes/src/vendor/modules/RenderPass.js`

将场景和相机绘制到当前后处理目标。[源码](../../eyes/src/vendor/modules/RenderPass.js)。语义状态：`partially-matched-upstream`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-RenderPass-js)

### `RenderPass`

将场景和相机绘制到当前后处理目标。父类 `Pass.Pass`。

- `constructor(scene, camera, overrideMaterial=null, clearColor=null, clearAlpha=null)` [源码:6](../../eyes/src/vendor/modules/RenderPass.js#L6)：当前操作：写入 _oldClearColor、camera、clear、clearAlpha、clearColor、clearDepth、isRenderPass、needsSwap、overrideMaterial、scene；返回 无显式返回。
- `render(renderer, writeBuffer, readBuffer)` [源码:9](../../eyes/src/vendor/modules/RenderPass.js#L9)：当前操作：写入 scene.overrideMaterial；返回 无显式返回。

## `eyes/src/vendor/modules/ShaderPass.js`

把前序纹理绑定到 shader uniform 后绘制全屏通道。[源码](../../eyes/src/vendor/modules/ShaderPass.js)。语义状态：`partially-matched-upstream`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-ShaderPass-js)

### `ShaderPass`

把前序纹理绑定到 shader uniform 后绘制全屏通道。父类 `Pass.Pass`。

- `constructor(shader, textureID="tDiffuse")` [源码:6](../../eyes/src/vendor/modules/ShaderPass.js#L6)：当前操作：写入 _fsQuad、material、textureID、uniforms；返回 无显式返回。
- `render(renderer, writeBuffer, readBuffer)` [源码:15](../../eyes/src/vendor/modules/ShaderPass.js#L15)：当前操作：写入 _fsQuad.material、uniforms[this.textureID].value；返回 无显式返回。
- `dispose()` [源码:18](../../eyes/src/vendor/modules/ShaderPass.js#L18)：当前操作：写入 无直接字段写入；返回 无显式返回。

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

阈值提亮、多级分离高斯模糊与加权合成辉光。[源码](../../eyes/src/vendor/modules/UnrealBloomPass.js)。语义状态：`partially-matched-upstream`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-modules-UnrealBloomPass-js)

### `UnrealBloomPass`

阈值提亮、多级分离高斯模糊与加权合成辉光。父类 `Pass.Pass`。

- `constructor(resolution, strength=1, radius, threshold)` [源码:8](../../eyes/src/vendor/modules/UnrealBloomPass.js#L8)：当前操作：写入 _basic、_fsQuad、_oldClearAlpha、_oldClearColor、blendMaterial、bloomTintColors、clearColor、compositeMaterial、compositeMaterial.uniforms.bloomFactors.value、compositeMaterial.uniforms.bloomRadius.value、compositeMaterial.uniforms.bloomStrength.value、compositeMaterial.uniforms.bloomTintColors.value、compositeMaterial.uniforms.blurTexture1.value、compositeMaterial.uniforms.blurTexture2.value、compositeMaterial.uniforms.blurTexture3.value、compositeMaterial.uniforms.blurTexture4.value、compositeMaterial.uniforms.blurTexture5.value、copyUniforms、highPassUniforms、highPassUniforms.luminosityThreshold.value、highPassUniforms.smoothWidth.value、materialHighPassFilter、nMips、needsSwap、radius、renderTargetBright、renderTargetBright.texture.generateMipmaps、renderTargetBright.texture.name、renderTargetsHorizontal、renderTargetsVertical、resolution、separableBlurMaterials、separableBlurMaterials[e].uniforms.invSize.value、strength、threshold；返回 无显式返回。
- `dispose()` [源码:46](../../eyes/src/vendor/modules/UnrealBloomPass.js#L46)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setSize(width, height)` [源码:53](../../eyes/src/vendor/modules/UnrealBloomPass.js#L53)：当前操作：写入 separableBlurMaterials[e].uniforms.invSize.value；返回 无显式返回。
- `render(renderer, writeBuffer, readBuffer, deltaTime, maskActive)` [源码:59](../../eyes/src/vendor/modules/UnrealBloomPass.js#L59)：当前操作：写入 _basic.map、_fsQuad.material、_oldClearAlpha、compositeMaterial.uniforms.bloomRadius.value、compositeMaterial.uniforms.bloomStrength.value、compositeMaterial.uniforms.bloomTintColors.value、copyUniforms.tDiffuse.value、highPassUniforms.luminosityThreshold.value、highPassUniforms.tDiffuse.value、separableBlurMaterials[t].uniforms.colorTexture.value、separableBlurMaterials[t].uniforms.direction.value；返回 无显式返回。
- `_getSeparableBlurMaterial(kernelRadius)` [源码:67](../../eyes/src/vendor/modules/UnrealBloomPass.js#L67)：当前操作：写入 无直接字段写入；返回 new ThreeCore.ShaderMaterial({defines:{KERNEL_RADIUS:kernelRadius},uniforms:{colorTexture:{value:null},invSize:{value:new ThreeCore.Vector2(.5,.5)},direction:{value:new ThreeCore.Vector2(.5,.5)},gaussianCoefficients:{val。
- `_getCompositeMaterial(nMips)` [源码:93](../../eyes/src/vendor/modules/UnrealBloomPass.js#L93)：当前操作：写入 无直接字段写入；返回 new ThreeCore.ShaderMaterial({defines:{NUM_MIPS:nMips},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},b。

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

- `addEventListener(type, listener)` [源码:354](../../eyes/src/vendor/three/core.js#L354)：当前操作：写入 _listeners；返回 无显式返回。
- `hasEventListener(type, listener)` [源码:359](../../eyes/src/vendor/three/core.js#L359)：当前操作：写入 无直接字段写入；返回 void 0!==listeners&&void 0!==listeners[type]&&-1!==listeners[type].indexOf(listener)。
- `removeEventListener(type, listener)` [源码:363](../../eyes/src/vendor/three/core.js#L363)：当前操作：写入 无直接字段写入；返回 void。
- `dispatchEvent(event)` [源码:372](../../eyes/src/vendor/three/core.js#L372)：当前操作：写入 无直接字段写入；返回 void。

### `Vector2`

Class representing a 2D vector. A 2D vector is an ordered pair of numbers (labeled x and y), which can be used to represent a number of things, such as: - A point in 2D space (i.e. a position on a plane). - A direction and length across a plane. In three.js the length will always be the Euclidean distance(straight-line distance) from ˋ(0, 0)ˋ to ˋ(x, y)ˋ and the direction is also measured from ˋ(0, 0)ˋ towards ˋ(x, y)ˋ. - Any arbitrary ordered pair of numbers. There are other things a 2D vector can be used to represent, such as momentum vectors, complex numbers and so on, however these are the most common uses in three.js. Iterating through a vector instance will yield its components ˋ(x, y)ˋ in the corresponding order. ˋˋˋjs const a = new THREE.Vector2( 0, 1 ); //no arguments; will be initialised to (0, 0) const b = new THREE.Vector2( ); const d = a.distanceTo( b ); ˋˋˋ。父类 `无`。

- `static <static block>()` [源码:567](../../eyes/src/vendor/three/core.js#L567)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `constructor(x=0, y=0)` [源码:576](../../eyes/src/vendor/three/core.js#L576)：Constructs a new 2D vector. @param {number} [x=0] - The x value of this vector. @param {number} [y=0] - The y value of this vector.
- `get width()` [源码:579](../../eyes/src/vendor/three/core.js#L579)：当前操作：写入 无直接字段写入；返回 this.x。
- `set width(value)` [源码:582](../../eyes/src/vendor/three/core.js#L582)：当前操作：写入 x；返回 无显式返回。
- `get height()` [源码:585](../../eyes/src/vendor/three/core.js#L585)：当前操作：写入 无直接字段写入；返回 this.y。
- `set height(value)` [源码:588](../../eyes/src/vendor/three/core.js#L588)：当前操作：写入 y；返回 无显式返回。
- `set(x, y)` [源码:598](../../eyes/src/vendor/three/core.js#L598)：Sets the vector components. @param {number} x - The value of the x component. @param {number} y - The value of the y component. @return {Vector2} A reference to this vector.
- `setScalar(scalar)` [源码:607](../../eyes/src/vendor/three/core.js#L607)：Sets the vector components to the same value. @param {number} scalar - The value to set for all vector components. @return {Vector2} A reference to this vector.
- `setX(x)` [源码:616](../../eyes/src/vendor/three/core.js#L616)：Sets the vector's x component to the given value @param {number} x - The value to set. @return {Vector2} A reference to this vector.
- `setY(y)` [源码:625](../../eyes/src/vendor/three/core.js#L625)：Sets the vector's y component to the given value @param {number} y - The value to set. @return {Vector2} A reference to this vector.
- `setComponent(index, value)` [源码:628](../../eyes/src/vendor/three/core.js#L628)：当前操作：写入 x、y；返回 this。
- `getComponent(index)` [源码:641](../../eyes/src/vendor/three/core.js#L641)：当前操作：写入 无直接字段写入；返回 this.x、this.y。
- `clone()` [源码:656](../../eyes/src/vendor/three/core.js#L656)：Returns a new vector with copied values from this instance. @return {Vector2} A clone of this instance.
- `copy(v)` [源码:665](../../eyes/src/vendor/three/core.js#L665)：Copies the values of the given vector to this instance. @param {Vector2} v - The vector to copy. @return {Vector2} A reference to this vector.
- `add(v)` [源码:674](../../eyes/src/vendor/three/core.js#L674)：Adds the given vector to this instance. @param {Vector2} v - The vector to add. @return {Vector2} A reference to this vector.
- `addScalar(s)` [源码:683](../../eyes/src/vendor/three/core.js#L683)：Adds the given scalar value to all components of this instance. @param {number} s - The scalar to add. @return {Vector2} A reference to this vector.
- `addVectors(a, b)` [源码:693](../../eyes/src/vendor/three/core.js#L693)：Adds the given vectors and stores the result in this instance. @param {Vector2} a - The first vector. @param {Vector2} b - The second vector. @return {Vector2} A reference to this vector.
- `addScaledVector(v, s)` [源码:703](../../eyes/src/vendor/three/core.js#L703)：Adds the given vector scaled by the given factor to this instance. @param {Vector2} v - The vector. @param {number} s - The factor that scales ˋvˋ. @return {Vector2} A reference to this vector.
- `sub(v)` [源码:712](../../eyes/src/vendor/three/core.js#L712)：Subtracts the given vector from this instance. @param {Vector2} v - The vector to subtract. @return {Vector2} A reference to this vector.
- `subScalar(s)` [源码:721](../../eyes/src/vendor/three/core.js#L721)：Subtracts the given scalar value from all components of this instance. @param {number} s - The scalar to subtract. @return {Vector2} A reference to this vector.
- `subVectors(a, b)` [源码:731](../../eyes/src/vendor/three/core.js#L731)：Subtracts the given vectors and stores the result in this instance. @param {Vector2} a - The first vector. @param {Vector2} b - The second vector. @return {Vector2} A reference to this vector.
- `multiply(v)` [源码:740](../../eyes/src/vendor/three/core.js#L740)：Multiplies the given vector with this instance. @param {Vector2} v - The vector to multiply. @return {Vector2} A reference to this vector.
- `multiplyScalar(scalar)` [源码:749](../../eyes/src/vendor/three/core.js#L749)：Multiplies the given scalar value with all components of this instance. @param {number} scalar - The scalar to multiply. @return {Vector2} A reference to this vector.
- `divide(v)` [源码:758](../../eyes/src/vendor/three/core.js#L758)：Divides this instance by the given vector. @param {Vector2} v - The vector to divide. @return {Vector2} A reference to this vector.
- `divideScalar(scalar)` [源码:767](../../eyes/src/vendor/three/core.js#L767)：Divides this vector by the given scalar. @param {number} scalar - The scalar to divide. @return {Vector2} A reference to this vector.
- `applyMatrix3(m)` [源码:777](../../eyes/src/vendor/three/core.js#L777)：Multiplies this vector (with an implicit 1 as the 3rd component) by the given 3x3 matrix. @param {Matrix3} m - The matrix to apply. @return {Vector2} A reference to this vector.
- `min(v)` [源码:790](../../eyes/src/vendor/three/core.js#L790)：If this vector's x or y value is greater than the given vector's x or y value, replace that value with the corresponding min value. @param {Vector2} v - The vector. @return {Vector2} A reference to this vector.
- `max(v)` [源码:800](../../eyes/src/vendor/three/core.js#L800)：If this vector's x or y value is less than the given vector's x or y value, replace that value with the corresponding max value. @param {Vector2} v - The vector. @return {Vector2} A reference to this vector.
- `clamp(min, max)` [源码:813](../../eyes/src/vendor/three/core.js#L813)：If this vector's x or y value is greater than the max vector's x or y value, it is replaced by the corresponding value. If this vector's x or y value is less than the min vector's x or y value, it is replaced by the corresponding value. @param {Vector2} min - The minimum x and y values. @param {Vector2} max - The maximum x and y values in the desired range. @return {Vector2} A reference to this vector.
- `clampScalar(minVal, maxVal)` [源码:826](../../eyes/src/vendor/three/core.js#L826)：If this vector's x or y values are greater than the max value, they are replaced by the max value. If this vector's x or y values are less than the min value, they are replaced by the min value. @param {number} minVal - The minimum value the components will be clamped to. @param {number} maxVal - The maximum value the components will be clamped to. @return {Vector2} A reference to this vector.
- `clampLength(min, max)` [源码:839](../../eyes/src/vendor/three/core.js#L839)：If this vector's length is greater than the max value, it is replaced by the max value. If this vector's length is less than the min value, it is replaced by the min value. @param {number} min - The minimum value the vector length will be clamped to. @param {number} max - The maximum value the vector length will be clamped to. @return {Vector2} A reference to this vector.
- `floor()` [源码:848](../../eyes/src/vendor/three/core.js#L848)：The components of this vector are rounded down to the nearest integer value. @return {Vector2} A reference to this vector.
- `ceil()` [源码:856](../../eyes/src/vendor/three/core.js#L856)：The components of this vector are rounded up to the nearest integer value. @return {Vector2} A reference to this vector.
- `round()` [源码:864](../../eyes/src/vendor/three/core.js#L864)：The components of this vector are rounded to the nearest integer value @return {Vector2} A reference to this vector.
- `roundToZero()` [源码:873](../../eyes/src/vendor/three/core.js#L873)：The components of this vector are rounded towards zero (up if negative, down if positive) to an integer value. @return {Vector2} A reference to this vector.
- `negate()` [源码:881](../../eyes/src/vendor/three/core.js#L881)：Inverts this vector - i.e. sets x = -x and y = -y. @return {Vector2} A reference to this vector.
- `dot(v)` [源码:890](../../eyes/src/vendor/three/core.js#L890)：Calculates the dot product of the given vector with this instance. @param {Vector2} v - The vector to compute the dot product with. @return {number} The result of the dot product.
- `cross(v)` [源码:899](../../eyes/src/vendor/three/core.js#L899)：Calculates the cross product of the given vector with this instance. @param {Vector2} v - The vector to compute the cross product with. @return {number} The result of the cross product.
- `lengthSq()` [源码:909](../../eyes/src/vendor/three/core.js#L909)：Computes the square of the Euclidean length (straight-line length) from (0, 0) to (x, y). If you are comparing the lengths of vectors, you should compare the length squared instead as it is slightly more efficient to calculate. @return {number} The square length of this vector.
- `length()` [源码:917](../../eyes/src/vendor/three/core.js#L917)：Computes the Euclidean length (straight-line length) from (0, 0) to (x, y). @return {number} The length of this vector.
- `manhattanLength()` [源码:925](../../eyes/src/vendor/three/core.js#L925)：Computes the Manhattan length of this vector. @return {number} The length of this vector.
- `normalize()` [源码:934](../../eyes/src/vendor/three/core.js#L934)：Converts this vector to a unit vector - that is, sets it equal to a vector with the same direction as this one, but with a vector length of ˋ1ˋ. @return {Vector2} A reference to this vector.
- `angle()` [源码:937](../../eyes/src/vendor/three/core.js#L937)：当前操作：写入 无直接字段写入；返回 Math.atan2(-this.y,-this.x)+Math.PI。
- `angleTo(v)` [源码:940](../../eyes/src/vendor/three/core.js#L940)：当前操作：写入 无直接字段写入；返回 Math.PI/2、Math.acos(clamp(theta,-1,1))。
- `distanceTo(v)` [源码:952](../../eyes/src/vendor/three/core.js#L952)：Computes the distance from the given vector to this instance. @param {Vector2} v - The vector to compute the distance to. @return {number} The distance.
- `distanceToSquared(v)` [源码:963](../../eyes/src/vendor/three/core.js#L963)：Computes the squared distance from the given vector to this instance. If you are just comparing the distance with another distance, you should compare the distance squared instead as it is slightly more efficient to calculate. @param {Vector2} v - The vector to compute the squared distance to. @return {number} The squared distance.
- `manhattanDistanceTo(v)` [源码:974](../../eyes/src/vendor/three/core.js#L974)：Computes the Manhattan distance from the given vector to this instance. @param {Vector2} v - The vector to compute the Manhattan distance to. @return {number} The Manhattan distance.
- `setLength(length)` [源码:984](../../eyes/src/vendor/three/core.js#L984)：Sets this vector to a vector with the same direction as this one, but with the specified length. @param {number} length - The new length of this vector. @return {Vector2} A reference to this vector.
- `lerp(v, alpha)` [源码:996](../../eyes/src/vendor/three/core.js#L996)：Linearly interpolates between the given vector and this instance, where alpha is the percent distance along the line - alpha = 0 will be this vector, and alpha = 1 will be the given one. @param {Vector2} v - The vector to interpolate towards. @param {number} alpha - The interpolation factor, typically in the closed interval ˋ[0, 1]ˋ. @return {Vector2} A reference to this vector.
- `lerpVectors(v1, v2, alpha)` [源码:1009](../../eyes/src/vendor/three/core.js#L1009)：Linearly interpolates between the given vectors, where alpha is the percent distance along the line - alpha = 0 will be first vector, and alpha = 1 will be the second one. The result is stored in this instance. @param {Vector2} v1 - The first vector. @param {Vector2} v2 - The second vector. @param {number} alpha - The interpolation factor, typically in the closed interval ˋ[0, 1]ˋ. @return {Vector2} A reference to this vector.
- `equals(v)` [源码:1018](../../eyes/src/vendor/three/core.js#L1018)：Returns ˋtrueˋ if this vector is equal with the given one. @param {Vector2} v - The vector to test for equality. @return {boolean} Whether this vector is equal with the given one.
- `fromArray(array, offset=0)` [源码:1029](../../eyes/src/vendor/three/core.js#L1029)：Sets this vector's x value to be ˋarray[ offset ]ˋ and y value to be ˋarray[ offset + 1 ]ˋ. @param {Array<number>} array - An array holding the vector component values. @param {number} [offset=0] - The offset into the array. @return {Vector2} A reference to this vector.
- `toArray(array=[], offset=0)` [源码:1040](../../eyes/src/vendor/three/core.js#L1040)：Writes the components of this vector to the given array. If no array is provided, the method returns a new instance. @param {Array<number>} [array=[]] - The target array holding the vector components. @param {number} [offset=0] - Index of the first element in the array. @return {Array<number>} The vector components.
- `fromBufferAttribute(attribute, index)` [源码:1050](../../eyes/src/vendor/three/core.js#L1050)：Sets the components of this vector from the given buffer attribute. @param {BufferAttribute} attribute - The buffer attribute holding vector data. @param {number} index - The index into the attribute. @return {Vector2} A reference to this vector.
- `rotateAround(center, angle)` [源码:1060](../../eyes/src/vendor/three/core.js#L1060)：Rotates this vector around the given center by the given angle. @param {Vector2} center - The point around which to rotate. @param {number} angle - The angle to rotate, in radians. @return {Vector2} A reference to this vector.
- `random()` [源码:1073](../../eyes/src/vendor/three/core.js#L1073)：Sets each component of this vector to a pseudo-random value between ˋ0ˋ and ˋ1ˋ, excluding ˋ1ˋ. @return {Vector2} A reference to this vector.
- `Symbol.iterator()` [源码:1076](../../eyes/src/vendor/three/core.js#L1076)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `Quaternion`

Class for representing a Quaternion. Quaternions are used in three.js to represent rotations. Iterating through a vector instance will yield its components ˋ(x, y, z, w)ˋ in the corresponding order. Note that three.js expects Quaternions to be normalized. ˋˋˋjs const quaternion = new THREE.Quaternion(); quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 ); const vector = new THREE.Vector3( 1, 0, 0 ); vector.applyQuaternion( quaternion ); ˋˋˋ。父类 `无`。

- `constructor(x=0, y=0, z=0, w=1)` [源码:1104](../../eyes/src/vendor/three/core.js#L1104)：Constructs a new quaternion. @param {number} [x=0] - The x value of this quaternion. @param {number} [y=0] - The y value of this quaternion. @param {number} [z=0] - The z value of this quaternion. @param {number} [w=1] - The w value of this quaternion.
- `static slerpFlat(e, t, n, r, i, a, s)` [源码:1108](../../eyes/src/vendor/three/core.js#L1108)：输入两个平铺数组中的四元数、各自偏移、目标数组偏移和插值量。先读取全部分量，所以支持源与目标重叠；点积为负就翻转第二四元数，选择短弧。官方把第二权重赋值独立为语句，本地嵌入第一次分量计算，不能据此猜局部原名。
- `static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1)` [源码:1146](../../eyes/src/vendor/three/core.js#L1146)：Multiplies two quaternions. This implementation assumes the quaternion data are managed in flat arrays. @param {Array<number>} dst - The destination array. @param {number} dstOffset - An offset into the destination array. @param {Array<number>} src0 - The source array of the first quaternion. @param {number} srcOffset0 - An offset into the first source array. @param {Array<number>} src1 - The source array of the second quaternion. @param {number} srcOffset1 - An offset into the second source array. @return {Array<number>} The destination array. @see {@link Quaternion#multiplyQuaternions}.
- `get x()` [源码:1157](../../eyes/src/vendor/three/core.js#L1157)：当前操作：写入 无直接字段写入；返回 this._x。
- `set x(value)` [源码:1160](../../eyes/src/vendor/three/core.js#L1160)：当前操作：写入 _x；返回 无显式返回。
- `get y()` [源码:1163](../../eyes/src/vendor/three/core.js#L1163)：当前操作：写入 无直接字段写入；返回 this._y。
- `set y(value)` [源码:1166](../../eyes/src/vendor/three/core.js#L1166)：当前操作：写入 _y；返回 无显式返回。
- `get z()` [源码:1169](../../eyes/src/vendor/three/core.js#L1169)：当前操作：写入 无直接字段写入；返回 this._z。
- `set z(value)` [源码:1172](../../eyes/src/vendor/three/core.js#L1172)：当前操作：写入 _z；返回 无显式返回。
- `get w()` [源码:1175](../../eyes/src/vendor/three/core.js#L1175)：当前操作：写入 无直接字段写入；返回 this._w。
- `set w(value)` [源码:1178](../../eyes/src/vendor/three/core.js#L1178)：当前操作：写入 _w；返回 无显式返回。
- `set(x, y, z, w)` [源码:1190](../../eyes/src/vendor/three/core.js#L1190)：Sets the quaternion components. @param {number} x - The x value of this quaternion. @param {number} y - The y value of this quaternion. @param {number} z - The z value of this quaternion. @param {number} w - The w value of this quaternion. @return {Quaternion} A reference to this quaternion.
- `clone()` [源码:1198](../../eyes/src/vendor/three/core.js#L1198)：Returns a new quaternion with copied values from this instance. @return {Quaternion} A clone of this instance.
- `copy(quaternion)` [源码:1207](../../eyes/src/vendor/three/core.js#L1207)：Copies the values of the given quaternion to this instance. @param {Quaternion} quaternion - The quaternion to copy. @return {Quaternion} A reference to this quaternion.
- `setFromEuler(euler, update=!0)` [源码:1210](../../eyes/src/vendor/three/core.js#L1210)：当前操作：写入 _w、_x、_y、_z；返回 !0===update&&this._onChangeCallback(),this。
- `setFromAxisAngle(axis, angle)` [源码:1254](../../eyes/src/vendor/three/core.js#L1254)：Sets this quaternion from the given axis and angle. @param {Vector3} axis - The normalized axis. @param {number} angle - The angle in radians. @return {Quaternion} A reference to this quaternion.
- `setFromRotationMatrix(m)` [源码:1259](../../eyes/src/vendor/three/core.js#L1259)：当前操作：写入 _w、_x、_y、_z；返回 this._onChangeCallback(),this。
- `setFromUnitVectors(vFrom, vTo)` [源码:1294](../../eyes/src/vendor/three/core.js#L1294)：Sets this quaternion to the rotation required to rotate the direction vector ˋvFromˋ to the direction vector ˋvToˋ. @param {Vector3} vFrom - The first (normalized) direction vector. @param {Vector3} vTo - The second (normalized) direction vector. @return {Quaternion} A reference to this quaternion.
- `angleTo(q)` [源码:1304](../../eyes/src/vendor/three/core.js#L1304)：Returns the angle between this quaternion and the given one in radians. @param {Quaternion} q - The quaternion to compute the angle with. @return {number} The angle in radians.
- `rotateTowards(q, step)` [源码:1307](../../eyes/src/vendor/three/core.js#L1307)：当前操作：写入 无直接字段写入；返回 this、this.slerp(q,t),this。
- `identity()` [源码:1319](../../eyes/src/vendor/three/core.js#L1319)：Sets this quaternion to the identity quaternion; that is, to the quaternion that represents "no rotation". @return {Quaternion} A reference to this quaternion.
- `invert()` [源码:1328](../../eyes/src/vendor/three/core.js#L1328)：Inverts this quaternion via {@link Quaternion#conjugate}. The quaternion is assumed to have unit length. @return {Quaternion} A reference to this quaternion.
- `conjugate()` [源码:1338](../../eyes/src/vendor/three/core.js#L1338)：Returns the rotational conjugate of this quaternion. The conjugate of a quaternion represents the same rotation in the opposite direction about the rotational axis. @return {Quaternion} A reference to this quaternion.
- `dot(v)` [源码:1347](../../eyes/src/vendor/three/core.js#L1347)：Calculates the dot product of this quaternion and the given one. @param {Quaternion} v - The quaternion to compute the dot product with. @return {number} The result of the dot product.
- `lengthSq()` [源码:1358](../../eyes/src/vendor/three/core.js#L1358)：Computes the squared Euclidean length (straight-line length) of this quaternion, considered as a 4 dimensional vector. This can be useful if you are comparing the lengths of two quaternions, as this is a slightly more efficient calculation than {@link Quaternion#length}. @return {number} The squared Euclidean length.
- `length()` [源码:1367](../../eyes/src/vendor/three/core.js#L1367)：Computes the Euclidean length (straight-line length) of this quaternion, considered as a 4 dimensional vector. @return {number} The Euclidean length.
- `normalize()` [源码:1370](../../eyes/src/vendor/three/core.js#L1370)：当前操作：写入 _w、_x、_y、_z；返回 0===l?(this._x=0,this._y=0,this._z=0,this._w=1):(l=1/l,this._x=this._x*l,this._y=this._y*l,this._z=this._z*l,this._w=this._w*l),this._onChangeCallback(),this。
- `multiply(q)` [源码:1380](../../eyes/src/vendor/three/core.js#L1380)：Multiplies this quaternion by the given one. @param {Quaternion} q - The quaternion. @return {Quaternion} A reference to this quaternion.
- `premultiply(q)` [源码:1389](../../eyes/src/vendor/three/core.js#L1389)：Pre-multiplies this quaternion by the given one. @param {Quaternion} q - The quaternion. @return {Quaternion} A reference to this quaternion.
- `multiplyQuaternions(a, b)` [源码:1399](../../eyes/src/vendor/three/core.js#L1399)：Multiplies the given quaternions and stores the result in this instance. @param {Quaternion} a - The first quaternion. @param {Quaternion} b - The second quaternion. @return {Quaternion} A reference to this quaternion.
- `slerp(qb, t)` [源码:1410](../../eyes/src/vendor/three/core.js#L1410)：当前操作：写入 _w、_x、_y、_z；返回 this。
- `slerpQuaternions(qa, qb, t)` [源码:1434](../../eyes/src/vendor/three/core.js#L1434)：Performs a spherical linear interpolation between the given quaternions and stores the result in this quaternion. @param {Quaternion} qa - The source quaternion. @param {Quaternion} qb - The target quaternion. @param {number} t - The interpolation factor in the closed interval ˋ[0, 1]ˋ. @return {Quaternion} A reference to this quaternion.
- `random()` [源码:1442](../../eyes/src/vendor/three/core.js#L1442)：Sets this quaternion to a uniformly random, normalized quaternion. @return {Quaternion} A reference to this quaternion.
- `equals(quaternion)` [源码:1456](../../eyes/src/vendor/three/core.js#L1456)：Returns ˋtrueˋ if this quaternion is equal with the given one. @param {Quaternion} quaternion - The quaternion to test for equality. @return {boolean} Whether this quaternion is equal with the given one.
- `fromArray(array, offset=0)` [源码:1466](../../eyes/src/vendor/three/core.js#L1466)：Sets this quaternion's components from the given array. @param {Array<number>} array - An array holding the quaternion component values. @param {number} [offset=0] - The offset into the array. @return {Quaternion} A reference to this quaternion.
- `toArray(array=[], offset=0)` [源码:1477](../../eyes/src/vendor/three/core.js#L1477)：Writes the components of this quaternion to the given array. If no array is provided, the method returns a new instance. @param {Array<number>} [array=[]] - The target array holding the quaternion components. @param {number} [offset=0] - Index of the first element in the array. @return {Array<number>} The quaternion components.
- `fromBufferAttribute(attribute, index)` [源码:1487](../../eyes/src/vendor/three/core.js#L1487)：Sets the components of this quaternion from the given buffer attribute. @param {BufferAttribute} attribute - The buffer attribute holding quaternion data. @param {number} index - The index into the attribute. @return {Quaternion} A reference to this quaternion.
- `toJSON()` [源码:1496](../../eyes/src/vendor/three/core.js#L1496)：This methods defines the serialization result of this class. Returns the numerical elements of this quaternion in an array of format ˋ[x, y, z, w]ˋ. @return {Array<number>} The serialized quaternion.
- `_onChange(callback)` [源码:1499](../../eyes/src/vendor/three/core.js#L1499)：当前操作：写入 _onChangeCallback；返回 this._onChangeCallback=callback,this。
- `_onChangeCallback()` [源码:1502](../../eyes/src/vendor/three/core.js#L1502)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `Symbol.iterator()` [源码:1503](../../eyes/src/vendor/three/core.js#L1503)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `Vector3`

Class representing a 3D vector. A 3D vector is an ordered triplet of numbers (labeled x, y and z), which can be used to represent a number of things, such as: - A point in 3D space. - A direction and length in 3D space. In three.js the length will always be the Euclidean distance(straight-line distance) from ˋ(0, 0, 0)ˋ to ˋ(x, y, z)ˋ and the direction is also measured from ˋ(0, 0, 0)ˋ towards ˋ(x, y, z)ˋ. - Any arbitrary ordered triplet of numbers. There are other things a 3D vector can be used to represent, such as momentum vectors and so on, however these are the most common uses in three.js. Iterating through a vector instance will yield its components ˋ(x, y, z)ˋ in the corresponding order. ˋˋˋjs const a = new THREE.Vector3( 0, 1, 0 ); //no arguments; will be initialised to (0, 0, 0) const b = new THREE.Vector3( ); const d = a.distanceTo( b ); ˋˋˋ。父类 `无`。

- `static <static block>()` [源码:1533](../../eyes/src/vendor/three/core.js#L1533)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `constructor(x=0, y=0, z=0)` [源码:1543](../../eyes/src/vendor/three/core.js#L1543)：Constructs a new 3D vector. @param {number} [x=0] - The x value of this vector. @param {number} [y=0] - The y value of this vector. @param {number} [z=0] - The z value of this vector.
- `set(x, y, z)` [源码:1546](../../eyes/src/vendor/three/core.js#L1546)：当前操作：写入 x、y、z；返回 void 0===z&&(z=this.z),this.x=x,this.y=y,this.z=z,this。
- `setScalar(scalar)` [源码:1555](../../eyes/src/vendor/three/core.js#L1555)：Sets the vector components to the same value. @param {number} scalar - The value to set for all vector components. @return {Vector3} A reference to this vector.
- `setX(x)` [源码:1564](../../eyes/src/vendor/three/core.js#L1564)：Sets the vector's x component to the given value. @param {number} x - The value to set. @return {Vector3} A reference to this vector.
- `setY(y)` [源码:1573](../../eyes/src/vendor/three/core.js#L1573)：Sets the vector's y component to the given value. @param {number} y - The value to set. @return {Vector3} A reference to this vector.
- `setZ(z)` [源码:1582](../../eyes/src/vendor/three/core.js#L1582)：Sets the vector's z component to the given value. @param {number} z - The value to set. @return {Vector3} A reference to this vector.
- `setComponent(index, value)` [源码:1585](../../eyes/src/vendor/three/core.js#L1585)：当前操作：写入 x、y、z；返回 this。
- `getComponent(index)` [源码:1601](../../eyes/src/vendor/three/core.js#L1601)：当前操作：写入 无直接字段写入；返回 this.x、this.y、this.z。
- `clone()` [源码:1618](../../eyes/src/vendor/three/core.js#L1618)：Returns a new vector with copied values from this instance. @return {Vector3} A clone of this instance.
- `copy(v)` [源码:1627](../../eyes/src/vendor/three/core.js#L1627)：Copies the values of the given vector to this instance. @param {Vector3} v - The vector to copy. @return {Vector3} A reference to this vector.
- `add(v)` [源码:1636](../../eyes/src/vendor/three/core.js#L1636)：Adds the given vector to this instance. @param {Vector3} v - The vector to add. @return {Vector3} A reference to this vector.
- `addScalar(s)` [源码:1645](../../eyes/src/vendor/three/core.js#L1645)：Adds the given scalar value to all components of this instance. @param {number} s - The scalar to add. @return {Vector3} A reference to this vector.
- `addVectors(a, b)` [源码:1655](../../eyes/src/vendor/three/core.js#L1655)：Adds the given vectors and stores the result in this instance. @param {Vector3} a - The first vector. @param {Vector3} b - The second vector. @return {Vector3} A reference to this vector.
- `addScaledVector(v, s)` [源码:1665](../../eyes/src/vendor/three/core.js#L1665)：Adds the given vector scaled by the given factor to this instance. @param {Vector3\|Vector4} v - The vector. @param {number} s - The factor that scales ˋvˋ. @return {Vector3} A reference to this vector.
- `sub(v)` [源码:1674](../../eyes/src/vendor/three/core.js#L1674)：Subtracts the given vector from this instance. @param {Vector3} v - The vector to subtract. @return {Vector3} A reference to this vector.
- `subScalar(s)` [源码:1683](../../eyes/src/vendor/three/core.js#L1683)：Subtracts the given scalar value from all components of this instance. @param {number} s - The scalar to subtract. @return {Vector3} A reference to this vector.
- `subVectors(a, b)` [源码:1693](../../eyes/src/vendor/three/core.js#L1693)：Subtracts the given vectors and stores the result in this instance. @param {Vector3} a - The first vector. @param {Vector3} b - The second vector. @return {Vector3} A reference to this vector.
- `multiply(v)` [源码:1702](../../eyes/src/vendor/three/core.js#L1702)：Multiplies the given vector with this instance. @param {Vector3} v - The vector to multiply. @return {Vector3} A reference to this vector.
- `multiplyScalar(scalar)` [源码:1711](../../eyes/src/vendor/three/core.js#L1711)：Multiplies the given scalar value with all components of this instance. @param {number} scalar - The scalar to multiply. @return {Vector3} A reference to this vector.
- `multiplyVectors(a, b)` [源码:1721](../../eyes/src/vendor/three/core.js#L1721)：Multiplies the given vectors and stores the result in this instance. @param {Vector3} a - The first vector. @param {Vector3} b - The second vector. @return {Vector3} A reference to this vector.
- `applyEuler(euler)` [源码:1730](../../eyes/src/vendor/three/core.js#L1730)：Applies the given Euler rotation to this vector. @param {Euler} euler - The Euler angles. @return {Vector3} A reference to this vector.
- `applyAxisAngle(axis, angle)` [源码:1740](../../eyes/src/vendor/three/core.js#L1740)：Applies a rotation specified by an axis and an angle to this vector. @param {Vector3} axis - A normalized vector representing the rotation axis. @param {number} angle - The angle in radians. @return {Vector3} A reference to this vector.
- `applyMatrix3(m)` [源码:1749](../../eyes/src/vendor/three/core.js#L1749)：Multiplies this vector with the given 3x3 matrix. @param {Matrix3} m - The 3x3 matrix. @return {Vector3} A reference to this vector.
- `applyNormalMatrix(m)` [源码:1763](../../eyes/src/vendor/three/core.js#L1763)：Multiplies this vector by the given normal matrix and normalizes the result. @param {Matrix3} m - The normal matrix. @return {Vector3} A reference to this vector.
- `applyMatrix4(m)` [源码:1773](../../eyes/src/vendor/three/core.js#L1773)：Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and divides by perspective. @param {Matrix4} m - The matrix to apply. @return {Vector3} A reference to this vector.
- `applyQuaternion(q)` [源码:1787](../../eyes/src/vendor/three/core.js#L1787)：Applies the given Quaternion to this vector. @param {Quaternion} q - The Quaternion. @return {Vector3} A reference to this vector.
- `project(camera)` [源码:1807](../../eyes/src/vendor/three/core.js#L1807)：Projects this vector from world space into the camera's normalized device coordinate (NDC) space. @param {Camera} camera - The camera. @return {Vector3} A reference to this vector.
- `unproject(camera)` [源码:1817](../../eyes/src/vendor/three/core.js#L1817)：Unprojects this vector from the camera's normalized device coordinate (NDC) space into world space. @param {Camera} camera - The camera. @return {Vector3} A reference to this vector.
- `transformDirection(m)` [源码:1827](../../eyes/src/vendor/three/core.js#L1827)：Transforms the direction of this vector by a matrix (the upper left 3 x 3 subset of the given 4x4 matrix and then normalizes the result. @param {Matrix4} m - The matrix. @return {Vector3} A reference to this vector.
- `divide(v)` [源码:1840](../../eyes/src/vendor/three/core.js#L1840)：Divides this instance by the given vector. @param {Vector3} v - The vector to divide. @return {Vector3} A reference to this vector.
- `divideScalar(scalar)` [源码:1849](../../eyes/src/vendor/three/core.js#L1849)：Divides this vector by the given scalar. @param {number} scalar - The scalar to divide. @return {Vector3} A reference to this vector.
- `min(v)` [源码:1859](../../eyes/src/vendor/three/core.js#L1859)：If this vector's x, y or z value is greater than the given vector's x, y or z value, replace that value with the corresponding min value. @param {Vector3} v - The vector. @return {Vector3} A reference to this vector.
- `max(v)` [源码:1869](../../eyes/src/vendor/three/core.js#L1869)：If this vector's x, y or z value is less than the given vector's x, y or z value, replace that value with the corresponding max value. @param {Vector3} v - The vector. @return {Vector3} A reference to this vector.
- `clamp(min, max)` [源码:1882](../../eyes/src/vendor/three/core.js#L1882)：If this vector's x, y or z value is greater than the max vector's x, y or z value, it is replaced by the corresponding value. If this vector's x, y or z value is less than the min vector's x, y or z value, it is replaced by the corresponding value. @param {Vector3} min - The minimum x, y and z values. @param {Vector3} max - The maximum x, y and z values in the desired range. @return {Vector3} A reference to this vector.
- `clampScalar(minVal, maxVal)` [源码:1895](../../eyes/src/vendor/three/core.js#L1895)：If this vector's x, y or z values are greater than the max value, they are replaced by the max value. If this vector's x, y or z values are less than the min value, they are replaced by the min value. @param {number} minVal - The minimum value the components will be clamped to. @param {number} maxVal - The maximum value the components will be clamped to. @return {Vector3} A reference to this vector.
- `clampLength(min, max)` [源码:1908](../../eyes/src/vendor/three/core.js#L1908)：If this vector's length is greater than the max value, it is replaced by the max value. If this vector's length is less than the min value, it is replaced by the min value. @param {number} min - The minimum value the vector length will be clamped to. @param {number} max - The maximum value the vector length will be clamped to. @return {Vector3} A reference to this vector.
- `floor()` [源码:1917](../../eyes/src/vendor/three/core.js#L1917)：The components of this vector are rounded down to the nearest integer value. @return {Vector3} A reference to this vector.
- `ceil()` [源码:1925](../../eyes/src/vendor/three/core.js#L1925)：The components of this vector are rounded up to the nearest integer value. @return {Vector3} A reference to this vector.
- `round()` [源码:1933](../../eyes/src/vendor/three/core.js#L1933)：The components of this vector are rounded to the nearest integer value @return {Vector3} A reference to this vector.
- `roundToZero()` [源码:1942](../../eyes/src/vendor/three/core.js#L1942)：The components of this vector are rounded towards zero (up if negative, down if positive) to an integer value. @return {Vector3} A reference to this vector.
- `negate()` [源码:1950](../../eyes/src/vendor/three/core.js#L1950)：Inverts this vector - i.e. sets x = -x, y = -y and z = -z. @return {Vector3} A reference to this vector.
- `dot(v)` [源码:1959](../../eyes/src/vendor/three/core.js#L1959)：Calculates the dot product of the given vector with this instance. @param {Vector3} v - The vector to compute the dot product with. @return {number} The result of the dot product.
- `lengthSq()` [源码:1969](../../eyes/src/vendor/three/core.js#L1969)：Computes the square of the Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors, you should compare the length squared instead as it is slightly more efficient to calculate. @return {number} The square length of this vector.
- `length()` [源码:1977](../../eyes/src/vendor/three/core.js#L1977)：Computes the Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z). @return {number} The length of this vector.
- `manhattanLength()` [源码:1985](../../eyes/src/vendor/three/core.js#L1985)：Computes the Manhattan length of this vector. @return {number} The length of this vector.
- `normalize()` [源码:1994](../../eyes/src/vendor/three/core.js#L1994)：Converts this vector to a unit vector - that is, sets it equal to a vector with the same direction as this one, but with a vector length of ˋ1ˋ. @return {Vector3} A reference to this vector.
- `setLength(length)` [源码:2004](../../eyes/src/vendor/three/core.js#L2004)：Sets this vector to a vector with the same direction as this one, but with the specified length. @param {number} length - The new length of this vector. @return {Vector3} A reference to this vector.
- `lerp(v, alpha)` [源码:2016](../../eyes/src/vendor/three/core.js#L2016)：Linearly interpolates between the given vector and this instance, where alpha is the percent distance along the line - alpha = 0 will be this vector, and alpha = 1 will be the given one. @param {Vector3} v - The vector to interpolate towards. @param {number} alpha - The interpolation factor, typically in the closed interval ˋ[0, 1]ˋ. @return {Vector3} A reference to this vector.
- `lerpVectors(v1, v2, alpha)` [源码:2029](../../eyes/src/vendor/three/core.js#L2029)：Linearly interpolates between the given vectors, where alpha is the percent distance along the line - alpha = 0 will be first vector, and alpha = 1 will be the second one. The result is stored in this instance. @param {Vector3} v1 - The first vector. @param {Vector3} v2 - The second vector. @param {number} alpha - The interpolation factor, typically in the closed interval ˋ[0, 1]ˋ. @return {Vector3} A reference to this vector.
- `cross(v)` [源码:2038](../../eyes/src/vendor/three/core.js#L2038)：Calculates the cross product of the given vector with this instance. @param {Vector3} v - The vector to compute the cross product with. @return {Vector3} The result of the cross product.
- `crossVectors(a, b)` [源码:2049](../../eyes/src/vendor/three/core.js#L2049)：Calculates the cross product of the given vectors and stores the result in this instance. @param {Vector3} a - The first vector. @param {Vector3} b - The second vector. @return {Vector3} A reference to this vector.
- `projectOnVector(v)` [源码:2058](../../eyes/src/vendor/three/core.js#L2058)：当前操作：写入 无直接字段写入；返回 this.set(0,0,0)、this.copy(v).multiplyScalar(scalar)。
- `projectOnPlane(planeNormal)` [源码:2071](../../eyes/src/vendor/three/core.js#L2071)：Projects this vector onto a plane by subtracting this vector projected onto the plane's normal from this vector. @param {Vector3} planeNormal - The plane normal. @return {Vector3} A reference to this vector.
- `reflect(normal)` [源码:2080](../../eyes/src/vendor/three/core.js#L2080)：Reflects this vector off a plane orthogonal to the given normal vector. @param {Vector3} normal - The (normalized) normal vector. @return {Vector3} A reference to this vector.
- `angleTo(v)` [源码:2083](../../eyes/src/vendor/three/core.js#L2083)：当前操作：写入 无直接字段写入；返回 Math.PI/2、Math.acos(clamp(theta,-1,1))。
- `distanceTo(v)` [源码:2095](../../eyes/src/vendor/three/core.js#L2095)：Computes the distance from the given vector to this instance. @param {Vector3} v - The vector to compute the distance to. @return {number} The distance.
- `distanceToSquared(v)` [源码:2106](../../eyes/src/vendor/three/core.js#L2106)：Computes the squared distance from the given vector to this instance. If you are just comparing the distance with another distance, you should compare the distance squared instead as it is slightly more efficient to calculate. @param {Vector3} v - The vector to compute the squared distance to. @return {number} The squared distance.
- `manhattanDistanceTo(v)` [源码:2118](../../eyes/src/vendor/three/core.js#L2118)：Computes the Manhattan distance from the given vector to this instance. @param {Vector3} v - The vector to compute the Manhattan distance to. @return {number} The Manhattan distance.
- `setFromSpherical(s)` [源码:2127](../../eyes/src/vendor/three/core.js#L2127)：Sets the vector components from the given spherical coordinates. @param {Spherical} s - The spherical coordinates. @return {Vector3} A reference to this vector.
- `setFromSphericalCoords(radius, phi, theta)` [源码:2138](../../eyes/src/vendor/three/core.js#L2138)：Sets the vector components from the given spherical coordinates. @param {number} radius - The radius. @param {number} phi - The phi angle in radians. @param {number} theta - The theta angle in radians. @return {Vector3} A reference to this vector.
- `setFromCylindrical(c)` [源码:2148](../../eyes/src/vendor/three/core.js#L2148)：Sets the vector components from the given cylindrical coordinates. @param {Cylindrical} c - The cylindrical coordinates. @return {Vector3} A reference to this vector.
- `setFromCylindricalCoords(radius, theta, y)` [源码:2159](../../eyes/src/vendor/three/core.js#L2159)：Sets the vector components from the given cylindrical coordinates. @param {number} radius - The radius. @param {number} theta - The theta angle in radians. @param {number} y - The y value. @return {Vector3} A reference to this vector.
- `setFromMatrixPosition(m)` [源码:2169](../../eyes/src/vendor/three/core.js#L2169)：Sets the vector components to the position elements of the given transformation matrix. @param {Matrix4} m - The 4x4 matrix. @return {Vector3} A reference to this vector.
- `setFromMatrixScale(m)` [源码:2180](../../eyes/src/vendor/three/core.js#L2180)：Sets the vector components to the scale elements of the given transformation matrix. @param {Matrix4} m - The 4x4 matrix. @return {Vector3} A reference to this vector.
- `setFromMatrixColumn(m, index)` [源码:2186](../../eyes/src/vendor/three/core.js#L2186)：当前操作：写入 无直接字段写入；返回 this.fromArray(m.elements,4*index)。
- `setFromMatrix3Column(m, index)` [源码:2189](../../eyes/src/vendor/three/core.js#L2189)：当前操作：写入 无直接字段写入；返回 this.fromArray(m.elements,3*index)。
- `setFromEuler(e)` [源码:2198](../../eyes/src/vendor/three/core.js#L2198)：Sets the vector components from the given Euler angles. @param {Euler} e - The Euler angles to set. @return {Vector3} A reference to this vector.
- `setFromColor(c)` [源码:2208](../../eyes/src/vendor/three/core.js#L2208)：Sets the vector components from the RGB components of the given color. @param {Color} c - The color to set. @return {Vector3} A reference to this vector.
- `equals(v)` [源码:2217](../../eyes/src/vendor/three/core.js#L2217)：Returns ˋtrueˋ if this vector is equal with the given one. @param {Vector3} v - The vector to test for equality. @return {boolean} Whether this vector is equal with the given one.
- `fromArray(array, offset=0)` [源码:2228](../../eyes/src/vendor/three/core.js#L2228)：Sets this vector's x value to be ˋarray[ offset ]ˋ, y value to be ˋarray[ offset + 1 ]ˋ and z value to be ˋarray[ offset + 2 ]ˋ. @param {Array<number>} array - An array holding the vector component values. @param {number} [offset=0] - The offset into the array. @return {Vector3} A reference to this vector.
- `toArray(array=[], offset=0)` [源码:2239](../../eyes/src/vendor/three/core.js#L2239)：Writes the components of this vector to the given array. If no array is provided, the method returns a new instance. @param {Array<number>} [array=[]] - The target array holding the vector components. @param {number} [offset=0] - Index of the first element in the array. @return {Array<number>} The vector components.
- `fromBufferAttribute(attribute, index)` [源码:2249](../../eyes/src/vendor/three/core.js#L2249)：Sets the components of this vector from the given buffer attribute. @param {BufferAttribute} attribute - The buffer attribute holding vector data. @param {number} index - The index into the attribute. @return {Vector3} A reference to this vector.
- `random()` [源码:2258](../../eyes/src/vendor/three/core.js#L2258)：Sets each component of this vector to a pseudo-random value between ˋ0ˋ and ˋ1ˋ, excluding ˋ1ˋ. @return {Vector3} A reference to this vector.
- `randomDirection()` [源码:2261](../../eyes/src/vendor/three/core.js#L2261)：当前操作：写入 x、y、z；返回 this.x=c*Math.cos(theta),this.y=u,this.z=c*Math.sin(theta),this。
- `Symbol.iterator()` [源码:2267](../../eyes/src/vendor/three/core.js#L2267)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `Matrix3`

Represents a 3x3 matrix. A Note on Row-Major and Column-Major Ordering: The constructor and {@link Matrix3#set} method take arguments in [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order) order, while internally they are stored in the {@link Matrix3#elements} array in column-major order. This means that calling: ˋˋˋjs const m = new THREE.Matrix(); m.set( 11, 12, 13, 21, 22, 23, 31, 32, 33 ); ˋˋˋ will result in the elements array containing: ˋˋˋjs m.elements = [ 11, 21, 31, 12, 22, 32, 13, 23, 33 ]; ˋˋˋ and internally all calculations are performed using column-major ordering. However, as the actual ordering makes no difference mathematically and most people are used to thinking about matrices in row-major order, the three.js documentation shows matrices in row-major order. Just bear in mind that if you are reading the source code, you'll have to take the transpose of any matrices outlined here to make sense of the calculations.。父类 `无`。

- `static <static block>()` [源码:2302](../../eyes/src/vendor/three/core.js#L2302)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `constructor(n11, n12, n13, n21, n22, n23, n31, n32, n33)` [源码:2305](../../eyes/src/vendor/three/core.js#L2305)：当前操作：写入 elements；返回 无显式返回。
- `set(n11, n12, n13, n21, n22, n23, n31, n32, n33)` [源码:2323](../../eyes/src/vendor/three/core.js#L2323)：Sets the elements of the matrix.The arguments are supposed to be in row-major order. @param {number} [n11] - 1-1 matrix element. @param {number} [n12] - 1-2 matrix element. @param {number} [n13] - 1-3 matrix element. @param {number} [n21] - 2-1 matrix element. @param {number} [n22] - 2-2 matrix element. @param {number} [n23] - 2-3 matrix element. @param {number} [n31] - 3-1 matrix element. @param {number} [n32] - 3-2 matrix element. @param {number} [n33] - 3-3 matrix element. @return {Matrix3} A reference to this matrix.
- `identity()` [源码:2332](../../eyes/src/vendor/three/core.js#L2332)：Sets this matrix to the 3x3 identity matrix. @return {Matrix3} A reference to this matrix.
- `copy(m)` [源码:2341](../../eyes/src/vendor/three/core.js#L2341)：Copies the values of the given matrix to this instance. @param {Matrix3} m - The matrix to copy. @return {Matrix3} A reference to this matrix.
- `extractBasis(xAxis, yAxis, zAxis)` [源码:2354](../../eyes/src/vendor/three/core.js#L2354)：Extracts the basis of this matrix into the three axis vectors provided. @param {Vector3} xAxis - The basis's x axis. @param {Vector3} yAxis - The basis's y axis. @param {Vector3} zAxis - The basis's z axis. @return {Matrix3} A reference to this matrix.
- `setFromMatrix4(m)` [源码:2363](../../eyes/src/vendor/three/core.js#L2363)：Set this matrix to the upper 3x3 matrix of the given 4x4 matrix. @param {Matrix4} m - The 4x4 matrix. @return {Matrix3} A reference to this matrix.
- `multiply(m)` [源码:2373](../../eyes/src/vendor/three/core.js#L2373)：Post-multiplies this matrix by the given 3x3 matrix. @param {Matrix3} m - The matrix to multiply with. @return {Matrix3} A reference to this matrix.
- `premultiply(m)` [源码:2382](../../eyes/src/vendor/three/core.js#L2382)：Pre-multiplies this matrix by the given 3x3 matrix. @param {Matrix3} m - The matrix to multiply with. @return {Matrix3} A reference to this matrix.
- `multiplyMatrices(a, b)` [源码:2393](../../eyes/src/vendor/three/core.js#L2393)：Multiples the given 3x3 matrices and stores the result in this matrix. @param {Matrix3} a - The first matrix. @param {Matrix3} b - The second matrix. @return {Matrix3} A reference to this matrix.
- `multiplyScalar(s)` [源码:2423](../../eyes/src/vendor/three/core.js#L2423)：Multiplies every component of the matrix by the given scalar. @param {number} s - The scalar. @return {Matrix3} A reference to this matrix.
- `determinant()` [源码:2432](../../eyes/src/vendor/three/core.js#L2432)：Computes and returns the determinant of this matrix. @return {number} The determinant.
- `invert()` [源码:2445](../../eyes/src/vendor/three/core.js#L2445)：当前操作：写入 无直接字段写入；返回 this.set(0,0,0,0,0,0,0,0,0)、te[0]=t11*detInv,te[1]=(n31*n23-n33*n21)*detInv,te[2]=(n32*n21-n31*n22)*detInv,te[3]=t12*detInv,te[4]=(n33*n11-n31*n13)*detInv,te[5]=(n31*n12-n32*n11)*detInv,te[6]=t13*detInv,te[7]=(n21*n13-n23*n11)*detInv,te[8]=(n22*n11。
- `transpose()` [源码:2469](../../eyes/src/vendor/three/core.js#L2469)：Transposes this matrix in place. @return {Matrix3} A reference to this matrix.
- `getNormalMatrix(matrix4)` [源码:2481](../../eyes/src/vendor/three/core.js#L2481)：Computes the normal matrix which is the inverse transpose of the upper left 3x3 portion of the given 4x4 matrix. @param {Matrix4} matrix4 - The 4x4 matrix. @return {Matrix3} A reference to this matrix.
- `transposeIntoArray(r)` [源码:2490](../../eyes/src/vendor/three/core.js#L2490)：Transposes this matrix into the supplied array, and returns itself unchanged. @param {Array<number>} r - An array to store the transposed matrix elements. @return {Matrix3} A reference to this matrix.
- `setUvTransform(tx, ty, sx, sy, rotation, cx, cy)` [源码:2506](../../eyes/src/vendor/three/core.js#L2506)：Sets the UV transform matrix from offset, repeat, rotation, and center. @param {number} tx - Offset x. @param {number} ty - Offset y. @param {number} sx - Repeat x. @param {number} sy - Repeat y. @param {number} rotation - Rotation, in radians. Positive values rotate counterclockwise. @param {number} cx - Center x of rotation. @param {number} cy - Center y of rotation @return {Matrix3} A reference to this matrix.
- `scale(sx, sy)` [源码:2511](../../eyes/src/vendor/three/core.js#L2511)：当前操作：写入 无直接字段写入；返回 warnOnce("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(matrix3.makeScale(sx,sy)),this。
- `rotate(theta)` [源码:2514](../../eyes/src/vendor/three/core.js#L2514)：当前操作：写入 无直接字段写入；返回 warnOnce("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(matrix3.makeRotation(-theta)),this。
- `translate(tx, ty)` [源码:2517](../../eyes/src/vendor/three/core.js#L2517)：当前操作：写入 无直接字段写入；返回 warnOnce("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(matrix3.makeTranslation(tx,ty)),this。
- `makeTranslation(x, y)` [源码:2529](../../eyes/src/vendor/three/core.js#L2529)：for 2D Transforms Sets this matrix as a 2D translation transform. @param {number\|Vector2} x - The amount to translate in the X axis or alternatively a translation vector. @param {number} y - The amount to translate in the Y axis. @return {Matrix3} A reference to this matrix.
- `makeRotation(theta)` [源码:2538](../../eyes/src/vendor/three/core.js#L2538)：Sets this matrix as a 2D rotational transformation. @param {number} theta - The rotation in radians. @return {Matrix3} A reference to this matrix.
- `makeScale(x, y)` [源码:2550](../../eyes/src/vendor/three/core.js#L2550)：Sets this matrix as a 2D scale transform. @param {number} x - The amount to scale in the X axis. @param {number} y - The amount to scale in the Y axis. @return {Matrix3} A reference to this matrix.
- `equals(matrix)` [源码:2553](../../eyes/src/vendor/three/core.js#L2553)：当前操作：写入 无直接字段写入；返回 !1、!0。
- `fromArray(array, offset=0)` [源码:2559](../../eyes/src/vendor/three/core.js#L2559)：当前操作：写入 elements[i]；返回 this。
- `toArray(array=[], offset=0)` [源码:2571](../../eyes/src/vendor/three/core.js#L2571)：Writes the elements of this matrix to the given array. If no array is provided, the method returns a new instance. @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order. @param {number} [offset=0] - Index of the first element in the array. @return {Array<number>} The matrix elements in column-major order.
- `clone()` [源码:2580](../../eyes/src/vendor/three/core.js#L2580)：Returns a matrix with copied values from this instance. @return {Matrix3} A clone of this instance.

### `ImageUtils`

图像像素处理及颜色空间转换。父类 `无`。

- `static getDataURL(image, type="image/png")` [源码:2675](../../eyes/src/vendor/three/core.js#L2675)：当前操作：写入 无直接字段写入；返回 image.src、canvas.toDataURL(type)。
- `static sRGBToLinear(image)` [源码:2686](../../eyes/src/vendor/three/core.js#L2686)：当前操作：写入 无直接字段写入；返回 context.putImageData(imageData,0,0),canvas、{data:data,width:image.width,height:image.height}、warn("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),image。

### `Source`

共享纹理图像的数据源及更新版本。父类 `无`。

- `constructor(data=null)` [源码:2711](../../eyes/src/vendor/three/core.js#L2711)：当前操作：写入 data、dataReady、isSource、uuid、version；返回 无显式返回。
- `getSize(target)` [源码:2716](../../eyes/src/vendor/three/core.js#L2716)：当前操作：写入 无直接字段写入；返回 "undefined"!=typeof HTMLVideoElement&&data instanceof HTMLVideoElement?target.set(data.videoWidth,data.videoHeight,0):"undefined"!=typeof VideoFrame&&data instanceof VideoFrame?target.set(data.displayWidth,data.displayHe。
- `set needsUpdate(value)` [源码:2720](../../eyes/src/vendor/three/core.js#L2720)：当前操作：写入 version；返回 无显式返回。
- `toJSON(meta)` [源码:2723](../../eyes/src/vendor/three/core.js#L2723)：当前操作：写入 无直接字段写入；返回 meta.images[this.uuid]、isRootObject\|\|(meta.images[this.uuid]=output),output。

### `Texture`

Base class for all textures. Note: After the initial use of a texture, its dimensions, format, and type cannot be changed. Instead, call {@link Texture#dispose} on the texture and instantiate a new one. @augments EventDispatcher。父类 `EventDispatcher`。

- `constructor(image=Texture.DEFAULT_IMAGE, mapping=Texture.DEFAULT_MAPPING, wrapS=ClampToEdgeWrapping, wrapT=ClampToEdgeWrapping, magFilter=LinearFilter, minFilter=LinearMipmapLinearFilter, format=RGBAFormat, type=UnsignedByteType, anisotropy=Texture.DEFAULT_ANISOTROPY, colorSpace=NoColorSpace)` [源码:2762](../../eyes/src/vendor/three/core.js#L2762)：当前操作：写入 anisotropy、center、channel、colorSpace、flipY、format、generateMipmaps、internalFormat、isArrayTexture、isRenderTargetTexture、isTexture、magFilter、mapping、matrix、matrixAutoUpdate、minFilter、mipmaps、name、normalized、offset、onUpdate、pmremVersion、premultiplyAlpha、renderTarget、repeat、rotation、source、type、unpackAlignment、updateRanges、userData、uuid、version、wrapS、wrapT；返回 无显式返回。
- `get width()` [源码:2767](../../eyes/src/vendor/three/core.js#L2767)：当前操作：写入 无直接字段写入；返回 this.source.getSize(_tempVec3).x。
- `get height()` [源码:2770](../../eyes/src/vendor/three/core.js#L2770)：当前操作：写入 无直接字段写入；返回 this.source.getSize(_tempVec3).y。
- `get depth()` [源码:2773](../../eyes/src/vendor/three/core.js#L2773)：当前操作：写入 无直接字段写入；返回 this.source.getSize(_tempVec3).z。
- `get image()` [源码:2776](../../eyes/src/vendor/three/core.js#L2776)：当前操作：写入 无直接字段写入；返回 this.source.data。
- `set image(value)` [源码:2779](../../eyes/src/vendor/three/core.js#L2779)：当前操作：写入 source.data；返回 无显式返回。
- `updateMatrix()` [源码:2782](../../eyes/src/vendor/three/core.js#L2782)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addUpdateRange(start, count)` [源码:2791](../../eyes/src/vendor/three/core.js#L2791)：Adds a range of data in the data texture to be updated on the GPU. @param {number} start - Position at which to start update. @param {number} count - The number of components to update.
- `clearUpdateRanges()` [源码:2797](../../eyes/src/vendor/three/core.js#L2797)：当前操作：写入 updateRanges.length；返回 无显式返回。
- `clone()` [源码:2805](../../eyes/src/vendor/three/core.js#L2805)：Returns a new texture with copied values from this instance. @return {Texture} A clone of this instance.
- `copy(source)` [源码:2814](../../eyes/src/vendor/three/core.js#L2814)：Copies the values of the given texture to this instance. @param {Texture} source - The texture to copy. @return {Texture} A reference to this instance.
- `setValues(e)` [源码:2818](../../eyes/src/vendor/three/core.js#L2818)：遍历输入可枚举属性，undefined 值和实例不存在的属性只警告。Vector2、Vector3、Matrix3 的新旧对象类型标志相符时调用旧对象.copy，保持持有者的引用；其他值直接替换字段。没有自动置 needsUpdate，没有深拷贝任意对象，返回 undefined。
- `toJSON(meta)` [源码:2829](../../eyes/src/vendor/three/core.js#L2829)：当前操作：写入 无直接字段写入；返回 meta.textures[this.uuid]、Object.keys(this.userData).length>0&&(output.userData=this.userData),isRootObject\|\|(meta.textures[this.uuid]=output),output。
- `dispose()` [源码:2863](../../eyes/src/vendor/three/core.js#L2863)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `transformUv(e)` [源码:2869](../../eyes/src/vendor/three/core.js#L2869)：仅 UVMapping 对传入 Vector2 原位变换：乘 matrix，分别按 wrapS/wrapT 处理越出 [0,1] 的分量。Repeat 减 floor；Clamp 取 0 或 1；Mirror 根据 floor 的奇偶反射，因此也覆盖负坐标；最后按 flipY 翻转 y。返回输入本身；恰好为 0/1 时不进入 wrapping 分支。
- `set needsUpdate(value)` [源码:2893](../../eyes/src/vendor/three/core.js#L2893)：当前操作：写入 source.needsUpdate、version；返回 无显式返回。
- `set needsPMREMUpdate(value)` [源码:2896](../../eyes/src/vendor/three/core.js#L2896)：当前操作：写入 pmremVersion；返回 无显式返回。

### `Vector4`

Class representing a 4D vector. A 4D vector is an ordered quadruplet of numbers (labeled x, y, z and w), which can be used to represent a number of things, such as: - A point in 4D space. - A direction and length in 4D space. In three.js the length will always be the Euclidean distance(straight-line distance) from ˋ(0, 0, 0, 0)ˋ to ˋ(x, y, z, w)ˋ and the direction is also measured from ˋ(0, 0, 0, 0)ˋ towards ˋ(x, y, z, w)ˋ. - Any arbitrary ordered quadruplet of numbers. There are other things a 4D vector can be used to represent, however these are the most common uses in *three.js*. Iterating through a vector instance will yield its components ˋ(x, y, z, w)ˋ in the corresponding order. ˋˋˋjs const a = new THREE.Vector4( 0, 1, 0, 0 ); //no arguments; will be initialised to (0, 0, 0, 1) const b = new THREE.Vector4( ); const d = a.dot( b ); ˋˋˋ。父类 `无`。

- `static <static block>()` [源码:2926](../../eyes/src/vendor/three/core.js#L2926)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `constructor(x=0, y=0, z=0, w=1)` [源码:2937](../../eyes/src/vendor/three/core.js#L2937)：Constructs a new 4D vector. @param {number} [x=0] - The x value of this vector. @param {number} [y=0] - The y value of this vector. @param {number} [z=0] - The z value of this vector. @param {number} [w=1] - The w value of this vector.
- `get width()` [源码:2940](../../eyes/src/vendor/three/core.js#L2940)：当前操作：写入 无直接字段写入；返回 this.z。
- `set width(value)` [源码:2943](../../eyes/src/vendor/three/core.js#L2943)：当前操作：写入 z；返回 无显式返回。
- `get height()` [源码:2946](../../eyes/src/vendor/three/core.js#L2946)：当前操作：写入 无直接字段写入；返回 this.w。
- `set height(value)` [源码:2949](../../eyes/src/vendor/three/core.js#L2949)：当前操作：写入 w；返回 无显式返回。
- `set(x, y, z, w)` [源码:2961](../../eyes/src/vendor/three/core.js#L2961)：Sets the vector components. @param {number} x - The value of the x component. @param {number} y - The value of the y component. @param {number} z - The value of the z component. @param {number} w - The value of the w component. @return {Vector4} A reference to this vector.
- `setScalar(scalar)` [源码:2970](../../eyes/src/vendor/three/core.js#L2970)：Sets the vector components to the same value. @param {number} scalar - The value to set for all vector components. @return {Vector4} A reference to this vector.
- `setX(x)` [源码:2979](../../eyes/src/vendor/three/core.js#L2979)：Sets the vector's x component to the given value @param {number} x - The value to set. @return {Vector4} A reference to this vector.
- `setY(y)` [源码:2988](../../eyes/src/vendor/three/core.js#L2988)：Sets the vector's y component to the given value @param {number} y - The value to set. @return {Vector4} A reference to this vector.
- `setZ(z)` [源码:2997](../../eyes/src/vendor/three/core.js#L2997)：Sets the vector's z component to the given value @param {number} z - The value to set. @return {Vector4} A reference to this vector.
- `setW(w)` [源码:3006](../../eyes/src/vendor/three/core.js#L3006)：Sets the vector's w component to the given value @param {number} w - The value to set. @return {Vector4} A reference to this vector.
- `setComponent(index, value)` [源码:3009](../../eyes/src/vendor/three/core.js#L3009)：当前操作：写入 w、x、y、z；返回 this。
- `getComponent(index)` [源码:3028](../../eyes/src/vendor/three/core.js#L3028)：当前操作：写入 无直接字段写入；返回 this.x、this.y、this.z、this.w。
- `clone()` [源码:3047](../../eyes/src/vendor/three/core.js#L3047)：Returns a new vector with copied values from this instance. @return {Vector4} A clone of this instance.
- `copy(v)` [源码:3050](../../eyes/src/vendor/three/core.js#L3050)：当前操作：写入 w、x、y、z；返回 this.x=v.x,this.y=v.y,this.z=v.z,this.w=void 0!==v.w?v.w:1,this。
- `add(v)` [源码:3059](../../eyes/src/vendor/three/core.js#L3059)：Adds the given vector to this instance. @param {Vector4} v - The vector to add. @return {Vector4} A reference to this vector.
- `addScalar(s)` [源码:3068](../../eyes/src/vendor/three/core.js#L3068)：Adds the given scalar value to all components of this instance. @param {number} s - The scalar to add. @return {Vector4} A reference to this vector.
- `addVectors(a, b)` [源码:3078](../../eyes/src/vendor/three/core.js#L3078)：Adds the given vectors and stores the result in this instance. @param {Vector4} a - The first vector. @param {Vector4} b - The second vector. @return {Vector4} A reference to this vector.
- `addScaledVector(v, s)` [源码:3088](../../eyes/src/vendor/three/core.js#L3088)：Adds the given vector scaled by the given factor to this instance. @param {Vector4} v - The vector. @param {number} s - The factor that scales ˋvˋ. @return {Vector4} A reference to this vector.
- `sub(v)` [源码:3097](../../eyes/src/vendor/three/core.js#L3097)：Subtracts the given vector from this instance. @param {Vector4} v - The vector to subtract. @return {Vector4} A reference to this vector.
- `subScalar(s)` [源码:3106](../../eyes/src/vendor/three/core.js#L3106)：Subtracts the given scalar value from all components of this instance. @param {number} s - The scalar to subtract. @return {Vector4} A reference to this vector.
- `subVectors(a, b)` [源码:3116](../../eyes/src/vendor/three/core.js#L3116)：Subtracts the given vectors and stores the result in this instance. @param {Vector4} a - The first vector. @param {Vector4} b - The second vector. @return {Vector4} A reference to this vector.
- `multiply(v)` [源码:3125](../../eyes/src/vendor/three/core.js#L3125)：Multiplies the given vector with this instance. @param {Vector4} v - The vector to multiply. @return {Vector4} A reference to this vector.
- `multiplyScalar(scalar)` [源码:3134](../../eyes/src/vendor/three/core.js#L3134)：Multiplies the given scalar value with all components of this instance. @param {number} scalar - The scalar to multiply. @return {Vector4} A reference to this vector.
- `applyMatrix4(m)` [源码:3143](../../eyes/src/vendor/three/core.js#L3143)：Multiplies this vector with the given 4x4 matrix. @param {Matrix4} m - The 4x4 matrix. @return {Vector4} A reference to this vector.
- `divide(v)` [源码:3157](../../eyes/src/vendor/three/core.js#L3157)：Divides this instance by the given vector. @param {Vector4} v - The vector to divide. @return {Vector4} A reference to this vector.
- `divideScalar(scalar)` [源码:3166](../../eyes/src/vendor/three/core.js#L3166)：Divides this vector by the given scalar. @param {number} scalar - The scalar to divide. @return {Vector4} A reference to this vector.
- `setAxisAngleFromQuaternion(q)` [源码:3169](../../eyes/src/vendor/three/core.js#L3169)：当前操作：写入 w、x、y、z；返回 s<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=q.x/s,this.y=q.y/s,this.z=q.z/s),this。
- `setAxisAngleFromRotationMatrix(m)` [源码:3174](../../eyes/src/vendor/three/core.js#L3174)：当前操作：写入 w、x、y、z；返回 this.set(1,0,0,0),this、xx>yy&&xx>zz?xx<epsilon?(x=0,y=.707106781,z=.707106781):(x=Math.sqrt(xx),y=xy/x,z=xz/x):yy>zz?yy<epsilon?(x=.707106781,y=0,z=.707106781):(y=Math.sqrt(yy),x=xy/y,z=yz/y):zz<epsilon?(x=.707106781,y=.707106781,z=0):(z=Math.、Math.abs(s)<.001&&(s=1),this.x=(m32-m23)/s,this.y=(m13-m31)/s,this.z=(m21-m12)/s,this.w=Math.acos((m11+m22+m33-1)/2),this。
- `setFromMatrixPosition(m)` [源码:3209](../../eyes/src/vendor/three/core.js#L3209)：Sets the vector components to the position elements of the given transformation matrix. @param {Matrix4} m - The 4x4 matrix. @return {Vector4} A reference to this vector.
- `min(v)` [源码:3220](../../eyes/src/vendor/three/core.js#L3220)：If this vector's x, y, z or w value is greater than the given vector's x, y, z or w value, replace that value with the corresponding min value. @param {Vector4} v - The vector. @return {Vector4} A reference to this vector.
- `max(v)` [源码:3230](../../eyes/src/vendor/three/core.js#L3230)：If this vector's x, y, z or w value is less than the given vector's x, y, z or w value, replace that value with the corresponding max value. @param {Vector4} v - The vector. @return {Vector4} A reference to this vector.
- `clamp(min, max)` [源码:3243](../../eyes/src/vendor/three/core.js#L3243)：If this vector's x, y, z or w value is greater than the max vector's x, y, z or w value, it is replaced by the corresponding value. If this vector's x, y, z or w value is less than the min vector's x, y, z or w value, it is replaced by the corresponding value. @param {Vector4} min - The minimum x, y and z values. @param {Vector4} max - The maximum x, y and z values in the desired range. @return {Vector4} A reference to this vector.
- `clampScalar(minVal, maxVal)` [源码:3256](../../eyes/src/vendor/three/core.js#L3256)：If this vector's x, y, z or w values are greater than the max value, they are replaced by the max value. If this vector's x, y, z or w values are less than the min value, they are replaced by the min value. @param {number} minVal - The minimum value the components will be clamped to. @param {number} maxVal - The maximum value the components will be clamped to. @return {Vector4} A reference to this vector.
- `clampLength(min, max)` [源码:3269](../../eyes/src/vendor/three/core.js#L3269)：If this vector's length is greater than the max value, it is replaced by the max value. If this vector's length is less than the min value, it is replaced by the min value. @param {number} min - The minimum value the vector length will be clamped to. @param {number} max - The maximum value the vector length will be clamped to. @return {Vector4} A reference to this vector.
- `floor()` [源码:3278](../../eyes/src/vendor/three/core.js#L3278)：The components of this vector are rounded down to the nearest integer value. @return {Vector4} A reference to this vector.
- `ceil()` [源码:3286](../../eyes/src/vendor/three/core.js#L3286)：The components of this vector are rounded up to the nearest integer value. @return {Vector4} A reference to this vector.
- `round()` [源码:3294](../../eyes/src/vendor/three/core.js#L3294)：The components of this vector are rounded to the nearest integer value @return {Vector4} A reference to this vector.
- `roundToZero()` [源码:3303](../../eyes/src/vendor/three/core.js#L3303)：The components of this vector are rounded towards zero (up if negative, down if positive) to an integer value. @return {Vector4} A reference to this vector.
- `negate()` [源码:3311](../../eyes/src/vendor/three/core.js#L3311)：Inverts this vector - i.e. sets x = -x, y = -y, z = -z, w = -w. @return {Vector4} A reference to this vector.
- `dot(v)` [源码:3320](../../eyes/src/vendor/three/core.js#L3320)：Calculates the dot product of the given vector with this instance. @param {Vector4} v - The vector to compute the dot product with. @return {number} The result of the dot product.
- `lengthSq()` [源码:3330](../../eyes/src/vendor/three/core.js#L3330)：Computes the square of the Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w). If you are comparing the lengths of vectors, you should compare the length squared instead as it is slightly more efficient to calculate. @return {number} The square length of this vector.
- `length()` [源码:3338](../../eyes/src/vendor/three/core.js#L3338)：Computes the Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w). @return {number} The length of this vector.
- `manhattanLength()` [源码:3346](../../eyes/src/vendor/three/core.js#L3346)：Computes the Manhattan length of this vector. @return {number} The length of this vector.
- `normalize()` [源码:3355](../../eyes/src/vendor/three/core.js#L3355)：Converts this vector to a unit vector - that is, sets it equal to a vector with the same direction as this one, but with a vector length of ˋ1ˋ. @return {Vector4} A reference to this vector.
- `setLength(length)` [源码:3365](../../eyes/src/vendor/three/core.js#L3365)：Sets this vector to a vector with the same direction as this one, but with the specified length. @param {number} length - The new length of this vector. @return {Vector4} A reference to this vector.
- `lerp(v, alpha)` [源码:3377](../../eyes/src/vendor/three/core.js#L3377)：Linearly interpolates between the given vector and this instance, where alpha is the percent distance along the line - alpha = 0 will be this vector, and alpha = 1 will be the given one. @param {Vector4} v - The vector to interpolate towards. @param {number} alpha - The interpolation factor, typically in the closed interval ˋ[0, 1]ˋ. @return {Vector4} A reference to this vector.
- `lerpVectors(v1, v2, alpha)` [源码:3390](../../eyes/src/vendor/three/core.js#L3390)：Linearly interpolates between the given vectors, where alpha is the percent distance along the line - alpha = 0 will be first vector, and alpha = 1 will be the second one. The result is stored in this instance. @param {Vector4} v1 - The first vector. @param {Vector4} v2 - The second vector. @param {number} alpha - The interpolation factor, typically in the closed interval ˋ[0, 1]ˋ. @return {Vector4} A reference to this vector.
- `equals(v)` [源码:3399](../../eyes/src/vendor/three/core.js#L3399)：Returns ˋtrueˋ if this vector is equal with the given one. @param {Vector4} v - The vector to test for equality. @return {boolean} Whether this vector is equal with the given one.
- `fromArray(array, offset=0)` [源码:3410](../../eyes/src/vendor/three/core.js#L3410)：Sets this vector's x value to be ˋarray[ offset ]ˋ, y value to be ˋarray[ offset + 1 ]ˋ, z value to be ˋarray[ offset + 2 ]ˋ, w value to be ˋarray[ offset + 3 ]ˋ. @param {Array<number>} array - An array holding the vector component values. @param {number} [offset=0] - The offset into the array. @return {Vector4} A reference to this vector.
- `toArray(array=[], offset=0)` [源码:3421](../../eyes/src/vendor/three/core.js#L3421)：Writes the components of this vector to the given array. If no array is provided, the method returns a new instance. @param {Array<number>} [array=[]] - The target array holding the vector components. @param {number} [offset=0] - Index of the first element in the array. @return {Array<number>} The vector components.
- `fromBufferAttribute(attribute, index)` [源码:3431](../../eyes/src/vendor/three/core.js#L3431)：Sets the components of this vector from the given buffer attribute. @param {BufferAttribute} attribute - The buffer attribute holding vector data. @param {number} index - The index into the attribute. @return {Vector4} A reference to this vector.
- `random()` [源码:3440](../../eyes/src/vendor/three/core.js#L3440)：Sets each component of this vector to a pseudo-random value between ˋ0ˋ and ˋ1ˋ, excluding ˋ1ˋ. @return {Vector4} A reference to this vector.
- `Symbol.iterator()` [源码:3443](../../eyes/src/vendor/three/core.js#L3443)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `RenderTarget`

A render target is a buffer where the video card draws pixels for a scene that is being rendered in the background. It is used in different effects, such as applying postprocessing to a rendered image before displaying it on the screen. @augments EventDispatcher。父类 `EventDispatcher`。

- `constructor(width=1, height=1, options={})` [源码:3489](../../eyes/src/vendor/three/core.js#L3489)：Render target options. @typedef {Object} RenderTarget~Options @property {boolean} [generateMipmaps=false] - Whether to generate mipmaps or not. @property {number} [magFilter=LinearFilter] - The mag filter. @property {number} [minFilter=LinearFilter] - The min filter. @property {number} [format=RGBAFormat] - The texture format. @property {number} [type=UnsignedByteType] - The texture type. @property {?string} [internalFormat=null] - The texture's internal format. @property {number} [wrapS=ClampToEdgeWrapping] - The texture's uv wrapping mode. @property {number} [wrapT=ClampToEdgeWrapping] - The texture's uv wrapping mode. @property {number} [anisotropy=1] - The texture's anisotropy value. @property {string} [colorSpace=NoColorSpace] - The texture's color space. @property {boolean} [depthBuffer=true] - Whether to allocate a depth buffer or not. @property {boolean} [stencilBuffer=false] - Whether to allocate a stencil buffer or not. @property {boolean} [resolveDepthBuffer=true] - Whether to resolve the depth buffer or not. @property {boolean} [resolveStencilBuffer=true] - Whether to resolve the stencil buffer or not. @property {?Texture} [depthTexture=null] - Reference to a depth texture. @property {number} [samples=0] - The MSAA samples count. @property {number} [count=1] - Defines the number of color attachments . Must be at least ˋ1ˋ. @property {number} [depth=1] - The texture depth. @property {boolean} [multiview=false] - Whether this target is used for multiview rendering (WebGL OVR_multiview2 extension). @property {boolean} [useArrayDepthTexture=false] - Whether to create the depth texture as an array texture for per-layer depth testing. This is separate from multiview so layered render targets can use array depth without the multiview extension. Constructs a new render target. @param {number} [width=1] - The width of the render target. @param {number} [height=1] - The height of the render target. @param {RenderTarget~Options} [options] - The configuration object.
- `_setTextureOptions(options={})` [源码:3515](../../eyes/src/vendor/three/core.js#L3515)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `get texture()` [源码:3527](../../eyes/src/vendor/three/core.js#L3527)：当前操作：写入 无直接字段写入；返回 this.textures[0]。
- `set texture(value)` [源码:3530](../../eyes/src/vendor/three/core.js#L3530)：当前操作：写入 textures[0]；返回 无显式返回。
- `set depthTexture(current)` [源码:3533](../../eyes/src/vendor/three/core.js#L3533)：当前操作：写入 _depthTexture、_depthTexture.renderTarget；返回 无显式返回。
- `get depthTexture()` [源码:3536](../../eyes/src/vendor/three/core.js#L3536)：当前操作：写入 无直接字段写入；返回 this._depthTexture。
- `setSize(width, height, depth=1)` [源码:3539](../../eyes/src/vendor/three/core.js#L3539)：当前操作：写入 depth、height、textures[i].image.depth、textures[i].image.height、textures[i].image.width、textures[i].isArrayTexture、width；返回 无显式返回。
- `clone()` [源码:3552](../../eyes/src/vendor/three/core.js#L3552)：Returns a new render target with copied values from this instance. @return {RenderTarget} A clone of this instance.
- `copy(source)` [源码:3555](../../eyes/src/vendor/three/core.js#L3555)：当前操作：写入 depth、depthBuffer、depthTexture、height、multiview、resolveDepthBuffer、resolveStencilBuffer、samples、scissorTest、stencilBuffer、textures.length、textures[i]、textures[i].isRenderTargetTexture、textures[i].renderTarget、textures[i].source、useArrayDepthTexture、width；返回 this.depthBuffer=source.depthBuffer,this.stencilBuffer=source.stencilBuffer,this.resolveDepthBuffer=source.resolveDepthBuffer,this.resolveStencilBuffer=source.resolveStencilBuffer,null!==source.depthTexture&&(this.depthT。
- `dispose()` [源码:3564](../../eyes/src/vendor/three/core.js#L3564)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `WebGLRenderTarget`

A render target used in context of {@link WebGLRenderer}. @augments RenderTarget。父类 `RenderTarget`。

- `constructor(width=1, height=1, options={})` [源码:3583](../../eyes/src/vendor/three/core.js#L3583)：Constructs a new 3D render target. @param {number} [width=1] - The width of the render target. @param {number} [height=1] - The height of the render target. @param {RenderTarget~Options} [options] - The configuration object.

### `DataArrayTexture`

Creates an array of textures directly from raw buffer data. @augments Texture。父类 `Texture`。

- `constructor(data=null, width=1, height=1, depth=1)` [源码:3601](../../eyes/src/vendor/three/core.js#L3601)：Constructs a new data array texture. @param {?TypedArray} [data=null] - The buffer data. @param {number} [width=1] - The width of the texture. @param {number} [height=1] - The height of the texture. @param {number} [depth=1] - The depth of the texture.
- `addLayerUpdate(layerIndex)` [源码:3618](../../eyes/src/vendor/three/core.js#L3618)：Describes that a specific layer of the texture needs to be updated. Normally when {@link Texture#needsUpdate} is set to ˋtrueˋ, the entire data texture array is sent to the GPU. Marking specific layers will only transmit subsets of all mipmaps associated with a specific depth in the array which is often much more performant. @param {number} layerIndex - The layer index that should be updated.
- `clearLayerUpdates()` [源码:3621](../../eyes/src/vendor/three/core.js#L3621)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `WebGLArrayRenderTarget`

An array render target used in context of {@link WebGLRenderer}. @augments WebGLRenderTarget。父类 `WebGLRenderTarget`。

- `constructor(width=1, height=1, depth=1, options={})` [源码:3639](../../eyes/src/vendor/three/core.js#L3639)：Constructs a new array render target. @param {number} [width=1] - The width of the render target. @param {number} [height=1] - The height of the render target. @param {number} [depth=1] - The height of the render target. @param {RenderTarget~Options} [options] - The configuration object.

### `Data3DTexture`

Creates a three-dimensional texture from raw data, with parameters to divide it into width, height, and depth. @augments Texture。父类 `Texture`。

- `constructor(data=null, width=1, height=1, depth=1)` [源码:3658](../../eyes/src/vendor/three/core.js#L3658)：Constructs a new data array texture. @param {?TypedArray} [data=null] - The buffer data. @param {number} [width=1] - The width of the texture. @param {number} [height=1] - The height of the texture. @param {number} [depth=1] - The depth of the texture.

### `WebGL3DRenderTarget`

A 3D render target used in context of {@link WebGLRenderer}. @augments WebGLRenderTarget。父类 `WebGLRenderTarget`。

- `constructor(width=1, height=1, depth=1, options={})` [源码:3681](../../eyes/src/vendor/three/core.js#L3681)：Constructs a new 3D render target. @param {number} [width=1] - The width of the render target. @param {number} [height=1] - The height of the render target. @param {number} [depth=1] - The height of the render target. @param {RenderTarget~Options} [options] - The configuration object.

### `Matrix4`

Represents a 4x4 matrix. The most common use of a 4x4 matrix in 3D computer graphics is as a transformation matrix. For an introduction to transformation matrices as used in WebGL, check out [this tutorial](https://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices) This allows a 3D vector representing a point in 3D space to undergo transformations such as translation, rotation, shear, scale, reflection, orthogonal or perspective projection and so on, by being multiplied by the matrix. This is known as ˋapplyingˋ the matrix to the vector. A Note on Row-Major and Column-Major Ordering: The constructor and {@link Matrix3#set} method take arguments in [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order) order, while internally they are stored in the {@link Matrix3#elements} array in column-major order. This means that calling: ˋˋˋjs const m = new THREE.Matrix4(); m.set( 11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44 ); ˋˋˋ will result in the elements array containing: ˋˋˋjs m.elements = [ 11, 21, 31, 41, 12, 22, 32, 42, 13, 23, 33, 43, 14, 24, 34, 44 ]; ˋˋˋ and internally all calculations are performed using column-major ordering. However, as the actual ordering makes no difference mathematically and most people are used to thinking about matrices in row-major order, the three.js documentation shows matrices in row-major order. Just bear in mind that if you are reading the source code, you'll have to take the transpose of any matrices outlined here to make sense of the calculations.。父类 `无`。

- `static <static block>()` [源码:3724](../../eyes/src/vendor/three/core.js#L3724)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `constructor(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44)` [源码:3727](../../eyes/src/vendor/three/core.js#L3727)：当前操作：写入 elements；返回 无显式返回。
- `set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44)` [源码:3752](../../eyes/src/vendor/three/core.js#L3752)：Sets the elements of the matrix.The arguments are supposed to be in row-major order. @param {number} [n11] - 1-1 matrix element. @param {number} [n12] - 1-2 matrix element. @param {number} [n13] - 1-3 matrix element. @param {number} [n14] - 1-4 matrix element. @param {number} [n21] - 2-1 matrix element. @param {number} [n22] - 2-2 matrix element. @param {number} [n23] - 2-3 matrix element. @param {number} [n24] - 2-4 matrix element. @param {number} [n31] - 3-1 matrix element. @param {number} [n32] - 3-2 matrix element. @param {number} [n33] - 3-3 matrix element. @param {number} [n34] - 3-4 matrix element. @param {number} [n41] - 4-1 matrix element. @param {number} [n42] - 4-2 matrix element. @param {number} [n43] - 4-3 matrix element. @param {number} [n44] - 4-4 matrix element. @return {Matrix4} A reference to this matrix.
- `identity()` [源码:3761](../../eyes/src/vendor/three/core.js#L3761)：Sets this matrix to the 4x4 identity matrix. @return {Matrix4} A reference to this matrix.
- `clone()` [源码:3769](../../eyes/src/vendor/three/core.js#L3769)：Returns a matrix with copied values from this instance. @return {Matrix4} A clone of this instance.
- `copy(m)` [源码:3778](../../eyes/src/vendor/three/core.js#L3778)：Copies the values of the given matrix to this instance. @param {Matrix4} m - The matrix to copy. @return {Matrix4} A reference to this matrix.
- `copyPosition(m)` [源码:3790](../../eyes/src/vendor/three/core.js#L3790)：Copies the translation component of the given matrix into this matrix's translation component. @param {Matrix4} m - The matrix to copy the translation component. @return {Matrix4} A reference to this matrix.
- `setFromMatrix3(m)` [源码:3801](../../eyes/src/vendor/three/core.js#L3801)：Set the upper 3x3 elements of this matrix to the values of given 3x3 matrix. @param {Matrix3} m - The 3x3 matrix. @return {Matrix4} A reference to this matrix.
- `extractBasis(xAxis, yAxis, zAxis)` [源码:3805](../../eyes/src/vendor/three/core.js#L3805)：当前操作：写入 无直接字段写入；返回 0===this.determinantAffine()?(xAxis.set(1,0,0),yAxis.set(0,1,0),zAxis.set(0,0,1),this):(xAxis.setFromMatrixColumn(this,0),yAxis.setFromMatrixColumn(this,1),zAxis.setFromMatrixColumn(this,2),this)。
- `makeBasis(xAxis, yAxis, zAxis)` [源码:3816](../../eyes/src/vendor/three/core.js#L3816)：Sets the given basis vectors to this matrix. @param {Vector3} xAxis - The basis's x axis. @param {Vector3} yAxis - The basis's y axis. @param {Vector3} zAxis - The basis's z axis. @return {Matrix4} A reference to this matrix.
- `extractRotation(m)` [源码:3819](../../eyes/src/vendor/three/core.js#L3819)：当前操作：写入 无直接字段写入；返回 this.identity()、te[0]=me[0]*scaleX,te[1]=me[1]*scaleX,te[2]=me[2]*scaleX,te[3]=0,te[4]=me[4]*scaleY,te[5]=me[5]*scaleY,te[6]=me[6]*scaleY,te[7]=0,te[8]=me[8]*scaleZ,te[9]=me[9]*scaleZ,te[10]=me[10]*scaleZ,te[11]=0,te[12]=0,te[13]=0,te[1。
- `makeRotationFromEuler(euler)` [源码:3828](../../eyes/src/vendor/three/core.js#L3828)：当前操作：写入 无直接字段写入；返回 te[3]=0,te[7]=0,te[11]=0,te[12]=0,te[13]=0,te[14]=0,te[15]=1,this。
- `makeRotationFromQuaternion(q)` [源码:3886](../../eyes/src/vendor/three/core.js#L3886)：Sets the rotation component of this matrix to the rotation specified by the given Quaternion as outlined [here](https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion) The rest of the matrix is set to the identity. @param {Quaternion} q - The Quaternion. @return {Matrix4} A reference to this matrix.
- `lookAt(eye, target, up)` [源码:3889](../../eyes/src/vendor/three/core.js#L3889)：当前操作：写入 无直接字段写入；返回 Vr.subVectors(eye,target),0===Vr.lengthSq()&&(Vr.z=1),Vr.normalize(),Xr.crossVectors(up,Vr),0===Xr.lengthSq()&&(1===Math.abs(up.z)?Vr.x+=1e-4:Vr.z+=1e-4,Vr.normalize(),Xr.crossVectors(up,Vr)),Xr.normalize(),jr.crossVecto。
- `multiply(m)` [源码:3899](../../eyes/src/vendor/three/core.js#L3899)：Post-multiplies this matrix by the given 4x4 matrix. @param {Matrix4} m - The matrix to multiply with. @return {Matrix4} A reference to this matrix.
- `premultiply(m)` [源码:3908](../../eyes/src/vendor/three/core.js#L3908)：Pre-multiplies this matrix by the given 4x4 matrix. @param {Matrix4} m - The matrix to multiply with. @return {Matrix4} A reference to this matrix.
- `multiplyMatrices(a, b)` [源码:3919](../../eyes/src/vendor/three/core.js#L3919)：Multiples the given 4x4 matrices and stores the result in this matrix. @param {Matrix4} a - The first matrix. @param {Matrix4} b - The second matrix. @return {Matrix4} A reference to this matrix.
- `multiplyScalar(s)` [源码:3963](../../eyes/src/vendor/three/core.js#L3963)：Multiplies every component of the matrix by the given scalar. @param {number} s - The scalar. @return {Matrix4} A reference to this matrix.
- `determinant()` [源码:3974](../../eyes/src/vendor/three/core.js#L3974)：Computes and returns the determinant of this matrix. Based on the method outlined [here](http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.html). @return {number} The determinant.
- `determinantAffine()` [源码:4011](../../eyes/src/vendor/three/core.js#L4011)：Computes and returns the determinant of the 4x4 matrix, but assumes the matrix is affine, saving some computations. For affine matrices (like an object's world matrix), this value equals the full 4x4 {@link Matrix4#determinant} but is cheaper to compute. Assumes the bottom row is [0, 0, 0, 1]. @return {number} The determinant of the matrix.
- `transpose()` [源码:4029](../../eyes/src/vendor/three/core.js#L4029)：Transposes this matrix in place. @return {Matrix4} A reference to this matrix.
- `setPosition(x, y, z)` [源码:4043](../../eyes/src/vendor/three/core.js#L4043)：Sets the position component for this matrix from the given vector, without affecting the rest of the matrix. @param {number\|Vector3} x - The x component of the vector or alternatively the vector object. @param {number} y - The y component of the vector. @param {number} z - The z component of the vector. @return {Matrix4} A reference to this matrix.
- `invert()` [源码:4047](../../eyes/src/vendor/three/core.js#L4047)：当前操作：写入 无直接字段写入；返回 this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)、te[0]=(n22*t12-n32*t11+n42*t10)*detInv,te[1]=(n31*t11-n21*t12-n41*t10)*detInv,te[2]=(n24*t6-n34*t5+n44*t4)*detInv,te[3]=(n33*t5-n23*t6-n43*t4)*detInv,te[4]=(n32*t9-n12*t12-n42*t8)*detInv,te[5]=(n11*t12-n31*t9+n41*t8)*det。
- `scale(v)` [源码:4088](../../eyes/src/vendor/three/core.js#L4088)：Multiplies the columns of this matrix by the given vector. @param {Vector3} v - The scale vector. @return {Matrix4} A reference to this matrix.
- `getMaxScaleOnAxis()` [源码:4100](../../eyes/src/vendor/three/core.js#L4100)：Gets the maximum scale value of the three axes. @return {number} The maximum scale.
- `makeTranslation(x, y, z)` [源码:4115](../../eyes/src/vendor/three/core.js#L4115)：Sets this matrix as a translation transform from the given vector. @param {number\|Vector3} x - The amount to translate in the X axis or alternatively a translation vector. @param {number} y - The amount to translate in the Y axis. @param {number} z - The amount to translate in the z axis. @return {Matrix4} A reference to this matrix.
- `makeRotationX(theta)` [源码:4125](../../eyes/src/vendor/three/core.js#L4125)：Sets this matrix as a rotational transformation around the X axis by the given angle. @param {number} theta - The rotation in radians. @return {Matrix4} A reference to this matrix.
- `makeRotationY(theta)` [源码:4137](../../eyes/src/vendor/three/core.js#L4137)：Sets this matrix as a rotational transformation around the Y axis by the given angle. @param {number} theta - The rotation in radians. @return {Matrix4} A reference to this matrix.
- `makeRotationZ(theta)` [源码:4149](../../eyes/src/vendor/three/core.js#L4149)：Sets this matrix as a rotational transformation around the Z axis by the given angle. @param {number} theta - The rotation in radians. @return {Matrix4} A reference to this matrix.
- `makeRotationAxis(axis, angle)` [源码:4165](../../eyes/src/vendor/three/core.js#L4165)：Sets this matrix as a rotational transformation around the given axis by the given angle. This is a somewhat controversial but mathematically sound alternative to rotating via Quaternions. See the discussion [here](https://www.gamedev.net/articles/programming/math-and-physics/do-we-really-need-quaternions-r1199). @param {Vector3} axis - The normalized rotation axis. @param {number} angle - The rotation in radians. @return {Matrix4} A reference to this matrix.
- `makeScale(x, y, z)` [源码:4184](../../eyes/src/vendor/three/core.js#L4184)：Sets this matrix as a scale transformation. @param {number} x - The amount to scale in the X axis. @param {number} y - The amount to scale in the Y axis. @param {number} z - The amount to scale in the Z axis. @return {Matrix4} A reference to this matrix.
- `makeShear(xy, xz, yx, yz, zx, zy)` [源码:4198](../../eyes/src/vendor/three/core.js#L4198)：Sets this matrix as a shear transformation. @param {number} xy - The amount to shear X by Y. @param {number} xz - The amount to shear X by Z. @param {number} yx - The amount to shear Y by X. @param {number} yz - The amount to shear Y by Z. @param {number} zx - The amount to shear Z by X. @param {number} zy - The amount to shear Z by Y. @return {Matrix4} A reference to this matrix.
- `compose(position, quaternion, scale)` [源码:4210](../../eyes/src/vendor/three/core.js#L4210)：Sets this matrix to the transformation composed of the given position, rotation (Quaternion) and scale. @param {Vector3} position - The position vector. @param {Quaternion} quaternion - The rotation as a Quaternion. @param {Vector3} scale - The scale vector. @return {Matrix4} A reference to this matrix.
- `decompose(position, quaternion, scale)` [源码:4233](../../eyes/src/vendor/three/core.js#L4233)：当前操作：写入 无直接字段写入；返回 scale.set(1,1,1),quaternion.identity(),this、matrix4.elements[0]*=invSX,matrix4.elements[1]*=invSX,matrix4.elements[2]*=invSX,matrix4.elements[4]*=invSY,matrix4.elements[5]*=invSY,matrix4.elements[6]*=invSY,matrix4.elements[8]*=invSZ,matrix4.elements[9]*=invSZ,matr。
- `makePerspective(e, t, n, r, i, a, s=WebGLCoordinateSystem, o=!1)` [源码:4248](../../eyes/src/vendor/three/core.js#L4248)：用 left/right/top/bottom/near/far 覆盖列主序 16 个 elements，x/y 比例为 2near/跨度、偏心项为边界和/跨度，w 行为 [0,0,-1,0]。标准 WebGL 深度映射到 [-1,1]，WebGPU 到 [0,1]；reversedDepth 用 near/(far-near)、far*near/(far-near)。返回 this；没有防止零跨度、near=far 或无限 far 的数值退化。
- `makeOrthographic(e, t, n, r, i, a, s=WebGLCoordinateSystem, o=!1)` [源码:4262](../../eyes/src/vendor/three/core.js#L4262)：同样完整覆盖矩阵，但横纵比例为 2/跨度，平移为负边界和/跨度，齐次 w=1。WebGL z 比例 -2/(far-near)，WebGPU 为 -1/(far-near)，反向深度为正 1/(far-near) 且平移 far/(far-near)。官方的嵌套 else-if 与本地 guard-throw 是结构差异，不能省略 reversed 分支绕过坐标验证这一行为。
- `equals(matrix)` [源码:4275](../../eyes/src/vendor/three/core.js#L4275)：当前操作：写入 无直接字段写入；返回 !1、!0。
- `fromArray(array, offset=0)` [源码:4281](../../eyes/src/vendor/three/core.js#L4281)：当前操作：写入 elements[i]；返回 this。
- `toArray(array=[], offset=0)` [源码:4293](../../eyes/src/vendor/three/core.js#L4293)：Writes the elements of this matrix to the given array. If no array is provided, the method returns a new instance. @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order. @param {number} [offset=0] - Index of the first element in the array. @return {Array<number>} The matrix elements in column-major order.

### `Euler`

A class representing Euler angles. Euler angles describe a rotational transformation by rotating an object on its various axes in specified amounts per axis, and a specified axis order. Iterating through an instance will yield its components (x, y, z, order) in the corresponding order. ˋˋˋjs const a = new THREE.Euler( 0, 1, 1.57, 'XYZ' ); const b = new THREE.Vector3( 1, 0, 1 ); b.applyEuler(a); ˋˋˋ。父类 `无`。

- `constructor(x=0, y=0, z=0, order=Euler.DEFAULT_ORDER)` [源码:4332](../../eyes/src/vendor/three/core.js#L4332)：Constructs a new euler instance. @param {number} [x=0] - The angle of the x axis in radians. @param {number} [y=0] - The angle of the y axis in radians. @param {number} [z=0] - The angle of the z axis in radians. @param {string} [order=Euler.DEFAULT_ORDER] - A string representing the order that the rotations are applied.
- `get x()` [源码:4335](../../eyes/src/vendor/three/core.js#L4335)：当前操作：写入 无直接字段写入；返回 this._x。
- `set x(value)` [源码:4338](../../eyes/src/vendor/three/core.js#L4338)：当前操作：写入 _x；返回 无显式返回。
- `get y()` [源码:4341](../../eyes/src/vendor/three/core.js#L4341)：当前操作：写入 无直接字段写入；返回 this._y。
- `set y(value)` [源码:4344](../../eyes/src/vendor/three/core.js#L4344)：当前操作：写入 _y；返回 无显式返回。
- `get z()` [源码:4347](../../eyes/src/vendor/three/core.js#L4347)：当前操作：写入 无直接字段写入；返回 this._z。
- `set z(value)` [源码:4350](../../eyes/src/vendor/three/core.js#L4350)：当前操作：写入 _z；返回 无显式返回。
- `get order()` [源码:4353](../../eyes/src/vendor/three/core.js#L4353)：当前操作：写入 无直接字段写入；返回 this._order。
- `set order(value)` [源码:4356](../../eyes/src/vendor/three/core.js#L4356)：当前操作：写入 _order；返回 无显式返回。
- `set(x, y, z, order=this._order)` [源码:4368](../../eyes/src/vendor/three/core.js#L4368)：Sets the Euler components. @param {number} x - The angle of the x axis in radians. @param {number} y - The angle of the y axis in radians. @param {number} z - The angle of the z axis in radians. @param {string} [order] - A string representing the order that the rotations are applied. @return {Euler} A reference to this Euler instance.
- `clone()` [源码:4376](../../eyes/src/vendor/three/core.js#L4376)：Returns a new Euler instance with copied values from this instance. @return {Euler} A clone of this instance.
- `copy(euler)` [源码:4385](../../eyes/src/vendor/three/core.js#L4385)：Copies the values of the given Euler instance to this instance. @param {Euler} euler - The Euler instance to copy. @return {Euler} A reference to this Euler instance.
- `setFromRotationMatrix(m, order=this._order, update=!0)` [源码:4388](../../eyes/src/vendor/three/core.js#L4388)：当前操作：写入 _order、_x、_y、_z；返回 this._order=order,!0===update&&this._onChangeCallback(),this。
- `setFromQuaternion(q, order, update)` [源码:4431](../../eyes/src/vendor/three/core.js#L4431)：Sets the angles of this Euler instance from a normalized quaternion. @param {Quaternion} q - A normalized Quaternion. @param {string} [order] - A string representing the order that the rotations are applied. @param {boolean} [update=true] - Whether the internal ˋonChangeˋ callback should be executed or not. @return {Euler} A reference to this Euler instance.
- `setFromVector3(v, order=this._order)` [源码:4441](../../eyes/src/vendor/three/core.js#L4441)：Sets the angles of this Euler instance from the given vector. @param {Vector3} v - The vector. @param {string} [order] - A string representing the order that the rotations are applied. @return {Euler} A reference to this Euler instance.
- `reorder(newOrder)` [源码:4454](../../eyes/src/vendor/three/core.js#L4454)：Resets the euler angle with a new order by creating a quaternion from this euler angle and then setting this euler angle with the quaternion and the new order. Warning: This discards revolution information. @param {string} [newOrder] - A string representing the new order that the rotations are applied. @return {Euler} A reference to this Euler instance.
- `equals(euler)` [源码:4463](../../eyes/src/vendor/three/core.js#L4463)：Returns ˋtrueˋ if this Euler instance is equal with the given one. @param {Euler} euler - The Euler instance to test for equality. @return {boolean} Whether this Euler instance is equal with the given one.
- `fromArray(array)` [源码:4466](../../eyes/src/vendor/three/core.js#L4466)：当前操作：写入 _order、_x、_y、_z；返回 this._x=array[0],this._y=array[1],this._z=array[2],void 0!==array[3]&&(this._order=array[3]),this._onChangeCallback(),this。
- `toArray(array=[], offset=0)` [源码:4477](../../eyes/src/vendor/three/core.js#L4477)：Writes the components of this Euler instance to the given array. If no array is provided, the method returns a new instance. @param {Array<number,number,number,string>} [array=[]] - The target array holding the Euler components. @param {number} [offset=0] - Index of the first element in the array. @return {Array<number,number,number,string>} The Euler components.
- `_onChange(callback)` [源码:4480](../../eyes/src/vendor/three/core.js#L4480)：当前操作：写入 _onChangeCallback；返回 this._onChangeCallback=callback,this。
- `_onChangeCallback()` [源码:4483](../../eyes/src/vendor/three/core.js#L4483)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `Symbol.iterator()` [源码:4484](../../eyes/src/vendor/three/core.js#L4484)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `Layers`

A layers object assigns an 3D object to 1 or more of 32 layers numbered ˋ0ˋ to ˋ31ˋ - internally the layers are stored as a bit mask], and by default all 3D objects are a member of layer ˋ0ˋ. This can be used to control visibility - an object must share a layer with a camera to be visible when that camera's view is rendered. All classes that inherit from {@link Object3D} have an ˋlayersˋ property which is an instance of this class.。父类 `无`。

- `constructor()` [源码:4502](../../eyes/src/vendor/three/core.js#L4502)：当前操作：写入 mask；返回 无显式返回。
- `set(layer)` [源码:4505](../../eyes/src/vendor/three/core.js#L4505)：当前操作：写入 mask；返回 无显式返回。
- `enable(layer)` [源码:4508](../../eyes/src/vendor/three/core.js#L4508)：当前操作：写入 mask；返回 无显式返回。
- `enableAll()` [源码:4511](../../eyes/src/vendor/three/core.js#L4511)：当前操作：写入 mask；返回 无显式返回。
- `toggle(layer)` [源码:4514](../../eyes/src/vendor/three/core.js#L4514)：当前操作：写入 mask；返回 无显式返回。
- `disable(layer)` [源码:4517](../../eyes/src/vendor/three/core.js#L4517)：当前操作：写入 mask；返回 无显式返回。
- `disableAll()` [源码:4520](../../eyes/src/vendor/three/core.js#L4520)：当前操作：写入 mask；返回 无显式返回。
- `test(layers)` [源码:4523](../../eyes/src/vendor/three/core.js#L4523)：当前操作：写入 无直接字段写入；返回 0!==(this.mask&layers.mask)。
- `isEnabled(layer)` [源码:4526](../../eyes/src/vendor/three/core.js#L4526)：当前操作：写入 无直接字段写入；返回 !!(this.mask&1<<layer)。

### `Object3D`

This is the base class for most objects in three.js and provides a set of properties and methods for manipulating objects in 3D space. @augments EventDispatcher。父类 `EventDispatcher`。

- `constructor()` [源码:4563](../../eyes/src/vendor/three/core.js#L4563)：建立递增只读 id、随机 uuid、parent=null、独有 children/userData/animations、克隆 DEFAULT_UP。position/rotation/quaternion/scale 是新对象；Euler 和 quaternion 的 change 回调双向同步，传 false 避免递归通知。children 不共享，父子关系此时为空；这里只初始化，不计算世界变换。
- `onBeforeShadow()` [源码:4615](../../eyes/src/vendor/three/core.js#L4615)：A callback that is executed immediately before a 3D object is rendered to a shadow map. @param {Renderer\|WebGLRenderer} renderer - The renderer. @param {Object3D} object - The 3D object. @param {Camera} camera - The camera that is used to render the scene. @param {Camera} shadowCamera - The shadow camera. @param {BufferGeometry} geometry - The 3D object's geometry. @param {Material} depthMaterial - The depth material. @param {Object} group - The geometry group data.
- `onAfterShadow()` [源码:4627](../../eyes/src/vendor/three/core.js#L4627)：A callback that is executed immediately after a 3D object is rendered to a shadow map. @param {Renderer\|WebGLRenderer} renderer - The renderer. @param {Object3D} object - The 3D object. @param {Camera} camera - The camera that is used to render the scene. @param {Camera} shadowCamera - The shadow camera. @param {BufferGeometry} geometry - The 3D object's geometry. @param {Material} depthMaterial - The depth material. @param {Object} group - The geometry group data.
- `onBeforeRender()` [源码:4638](../../eyes/src/vendor/three/core.js#L4638)：A callback that is executed immediately before a 3D object is rendered. @param {Renderer\|WebGLRenderer} renderer - The renderer. @param {Object3D} object - The 3D object. @param {Camera} camera - The camera that is used to render the scene. @param {BufferGeometry} geometry - The 3D object's geometry. @param {Material} material - The 3D object's material. @param {Object} group - The geometry group data.
- `onAfterRender()` [源码:4649](../../eyes/src/vendor/three/core.js#L4649)：A callback that is executed immediately after a 3D object is rendered. @param {Renderer\|WebGLRenderer} renderer - The renderer. @param {Object3D} object - The 3D object. @param {Camera} camera - The camera that is used to render the scene. @param {BufferGeometry} geometry - The 3D object's geometry. @param {Material} material - The 3D object's material. @param {Object} group - The geometry group data.
- `applyMatrix4(matrix)` [源码:4656](../../eyes/src/vendor/three/core.js#L4656)：Applies the given transformation matrix to the object and updates the object's position, rotation and scale. @param {Matrix4} matrix - The transformation matrix.
- `applyQuaternion(q)` [源码:4665](../../eyes/src/vendor/three/core.js#L4665)：Applies a rotation represented by given the quaternion to the 3D object. @param {Quaternion} q - The quaternion. @return {Object3D} A reference to this instance.
- `setRotationFromAxisAngle(axis, angle)` [源码:4674](../../eyes/src/vendor/three/core.js#L4674)：Sets the given rotation represented as an axis/angle couple to the 3D object. @param {Vector3} axis - The (normalized) axis vector. @param {number} angle - The angle in radians.
- `setRotationFromEuler(euler)` [源码:4682](../../eyes/src/vendor/three/core.js#L4682)：Sets the given rotation represented as Euler angles to the 3D object. @param {Euler} euler - The Euler angles.
- `setRotationFromMatrix(m)` [源码:4691](../../eyes/src/vendor/three/core.js#L4691)：Sets the given rotation represented as rotation matrix to the 3D object. @param {Matrix4} m - Although a 4x4 matrix is expected, the upper 3x3 portion must be a pure rotation matrix (i.e, unscaled).
- `setRotationFromQuaternion(q)` [源码:4699](../../eyes/src/vendor/three/core.js#L4699)：Sets the given rotation represented as a Quaternion to the 3D object. @param {Quaternion} q - The Quaternion
- `rotateOnAxis(axis, angle)` [源码:4709](../../eyes/src/vendor/three/core.js#L4709)：Rotates the 3D object along an axis in local space. @param {Vector3} axis - The (normalized) axis vector. @param {number} angle - The angle in radians. @return {Object3D} A reference to this instance.
- `rotateOnWorldAxis(axis, angle)` [源码:4719](../../eyes/src/vendor/three/core.js#L4719)：Rotates the 3D object along an axis in world space. @param {Vector3} axis - The (normalized) axis vector. @param {number} angle - The angle in radians. @return {Object3D} A reference to this instance.
- `rotateX(angle)` [源码:4728](../../eyes/src/vendor/three/core.js#L4728)：Rotates the 3D object around its X axis in local space. @param {number} angle - The angle in radians. @return {Object3D} A reference to this instance.
- `rotateY(angle)` [源码:4737](../../eyes/src/vendor/three/core.js#L4737)：Rotates the 3D object around its Y axis in local space. @param {number} angle - The angle in radians. @return {Object3D} A reference to this instance.
- `rotateZ(angle)` [源码:4746](../../eyes/src/vendor/three/core.js#L4746)：Rotates the 3D object around its Z axis in local space. @param {number} angle - The angle in radians. @return {Object3D} A reference to this instance.
- `translateOnAxis(axis, distance)` [源码:4756](../../eyes/src/vendor/three/core.js#L4756)：Translate the 3D object by a distance along the given axis in local space. @param {Vector3} axis - The (normalized) axis vector. @param {number} distance - The distance in world units. @return {Object3D} A reference to this instance.
- `translateX(distance)` [源码:4765](../../eyes/src/vendor/three/core.js#L4765)：Translate the 3D object by a distance along its X-axis in local space. @param {number} distance - The distance in world units. @return {Object3D} A reference to this instance.
- `translateY(distance)` [源码:4774](../../eyes/src/vendor/three/core.js#L4774)：Translate the 3D object by a distance along its Y-axis in local space. @param {number} distance - The distance in world units. @return {Object3D} A reference to this instance.
- `translateZ(distance)` [源码:4783](../../eyes/src/vendor/three/core.js#L4783)：Translate the 3D object by a distance along its Z-axis in local space. @param {number} distance - The distance in world units. @return {Object3D} A reference to this instance.
- `localToWorld(vector)` [源码:4792](../../eyes/src/vendor/three/core.js#L4792)：Converts the given vector from this 3D object's local space to world space. @param {Vector3} vector - The vector to convert. @return {Vector3} The converted vector.
- `worldToLocal(vector)` [源码:4801](../../eyes/src/vendor/three/core.js#L4801)：Converts the given vector from this 3D object's world space to local space. @param {Vector3} vector - The vector to convert. @return {Vector3} The converted vector.
- `lookAt(x, y, z)` [源码:4813](../../eyes/src/vendor/three/core.js#L4813)：Rotates the object to face a point in world space. This method does not support objects having non-uniformly-scaled parent(s). @param {number\|Vector3} x - The x coordinate in world space. Alternatively, a vector representing a position in world space @param {number} [y] - The y coordinate in world space. @param {number} [z] - The z coordinate in world space.
- `add(object)` [源码:4818](../../eyes/src/vendor/three/core.js#L4818)：当前操作：写入 无直接字段写入；返回 this、object===this?(error("Object3D.add: object can't be added as a child of itself.",object),this):(object&&object.isObject3D?(object.removeFromParent(),object.parent=this,this.children.push(object),object.dispatchEvent(ci),。
- `remove(object)` [源码:4825](../../eyes/src/vendor/three/core.js#L4825)：当前操作：写入 无直接字段写入；返回 this、-1!==index&&(object.parent=null,this.children.splice(index,1),object.dispatchEvent(li),di.child=object,this.dispatchEvent(di),di.child=null),this。
- `removeFromParent()` [源码:4833](../../eyes/src/vendor/three/core.js#L4833)：当前操作：写入 无直接字段写入；返回 null!==parent&&parent.remove(this),this。
- `clear()` [源码:4844](../../eyes/src/vendor/three/core.js#L4844)：Removes all child objects. @fires Object3D#removed @fires Object3D#childremoved @return {Object3D} A reference to this instance.
- `attach(object)` [源码:4847](../../eyes/src/vendor/three/core.js#L4847)：当前操作：写入 无直接字段写入；返回 this.updateWorldMatrix(!0,!1),_m1$1.copy(this.matrixWorld).invert(),null!==object.parent&&(object.parent.updateWorldMatrix(!0,!1),_m1$1.multiply(object.parent.matrixWorld)),object.applyMatrix4(_m1$1),object.removeFromPar。
- `getObjectById(id)` [源码:4850](../../eyes/src/vendor/three/core.js#L4850)：当前操作：写入 无直接字段写入；返回 this.getObjectByProperty("id",id)。
- `getObjectByName(name)` [源码:4853](../../eyes/src/vendor/three/core.js#L4853)：当前操作：写入 无直接字段写入；返回 this.getObjectByProperty("name",name)。
- `getObjectByProperty(name, value)` [源码:4856](../../eyes/src/vendor/three/core.js#L4856)：当前操作：写入 无直接字段写入；返回 this、object。
- `getObjectsByProperty(name, value, result=[])` [源码:4863](../../eyes/src/vendor/three/core.js#L4863)：当前操作：写入 无直接字段写入；返回 result。
- `getWorldPosition(target)` [源码:4875](../../eyes/src/vendor/three/core.js#L4875)：Returns a vector representing the position of the 3D object in world space. @param {Vector3} target - The target vector the result is stored to. @return {Vector3} The 3D object's position in world space.
- `getWorldQuaternion(target)` [源码:4884](../../eyes/src/vendor/three/core.js#L4884)：Returns a Quaternion representing the position of the 3D object in world space. @param {Quaternion} target - The target Quaternion the result is stored to. @return {Quaternion} The 3D object's rotation in world space.
- `getWorldScale(target)` [源码:4893](../../eyes/src/vendor/three/core.js#L4893)：Returns a vector representing the scale of the 3D object in world space. @param {Vector3} target - The target vector the result is stored to. @return {Vector3} The 3D object's scale in world space.
- `getWorldDirection(target)` [源码:4902](../../eyes/src/vendor/three/core.js#L4902)：Returns a vector representing the ("look") direction of the 3D object in world space. @param {Vector3} target - The target vector the result is stored to. @return {Vector3} The 3D object's direction in world space.
- `raycast()` [源码:4916](../../eyes/src/vendor/three/core.js#L4916)：Abstract method to get intersections between a casted ray and this 3D object. Renderable 3D objects such as {@link Mesh}, {@link Line} or {@link Points} implement this method in order to use raycasting. @abstract @param {Raycaster} raycaster - The raycaster. @param {Array<Object>} intersects - An array holding the result of the method.
- `traverse(callback)` [源码:4917](../../eyes/src/vendor/three/core.js#L4917)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `traverseVisible(callback)` [源码:4922](../../eyes/src/vendor/three/core.js#L4922)：当前操作：写入 无直接字段写入；返回 void。
- `traverseAncestors(callback)` [源码:4928](../../eyes/src/vendor/three/core.js#L4928)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `updateMatrix()` [源码:4932](../../eyes/src/vendor/three/core.js#L4932)：当前操作：写入 matrixWorldNeedsUpdate；返回 无显式返回。
- `updateMatrixWorld(force)` [源码:4944](../../eyes/src/vendor/three/core.js#L4944)：当前操作：写入 matrixWorldNeedsUpdate；返回 无显式返回。
- `updateWorldMatrix(updateParents, updateChildren, force=!1)` [源码:4951](../../eyes/src/vendor/three/core.js#L4951)：当前操作：写入 matrixWorldNeedsUpdate；返回 无显式返回。
- `toJSON(meta)` [源码:4960](../../eyes/src/vendor/three/core.js#L4960)：当前操作：写入 无直接字段写入；返回 output.object=object,output。
- `clone(recursive)` [源码:5041](../../eyes/src/vendor/three/core.js#L5041)：Returns a new 3D object with copied values from this instance. @param {boolean} [recursive=true] - When set to ˋtrueˋ, descendants of the 3D object are also cloned. @return {Object3D} A clone of this instance.
- `copy(source, recursive=!0)` [源码:5044](../../eyes/src/vendor/three/core.js#L5044)：当前操作：写入 animations、castShadow、frustumCulled、layers.mask、matrixAutoUpdate、matrixWorldAutoUpdate、matrixWorldNeedsUpdate、name、pivot、receiveShadow、renderOrder、rotation.order、static、userData、visible；返回 this。

### `Group`

将多个场景节点组织为共同变换的组。父类 `Object3D`。

- `constructor()` [源码:5054](../../eyes/src/vendor/three/core.js#L5054)：当前操作：写入 isGroup、type；返回 无显式返回。

### `WebXRController`

Class for representing a XR controller with its different coordinate systems. @private。父类 `无`。

- `constructor()` [源码:5068](../../eyes/src/vendor/three/core.js#L5068)：当前操作：写入 _grip、_hand、_targetRay；返回 无显式返回。
- `getHandSpace()` [源码:5071](../../eyes/src/vendor/three/core.js#L5071)：当前操作：写入 _hand、_hand.inputState、_hand.joints、_hand.matrixAutoUpdate、_hand.visible；返回 null===this._hand&&(this._hand=new Group(),this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand。
- `getTargetRaySpace()` [源码:5076](../../eyes/src/vendor/three/core.js#L5076)：当前操作：写入 _targetRay、_targetRay.angularVelocity、_targetRay.hasAngularVelocity、_targetRay.hasLinearVelocity、_targetRay.linearVelocity、_targetRay.matrixAutoUpdate、_targetRay.visible；返回 null===this._targetRay&&(this._targetRay=new Group(),this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Vector3(),this._targetRay.hasAng。
- `getGripSpace()` [源码:5079](../../eyes/src/vendor/three/core.js#L5079)：当前操作：写入 _grip、_grip.angularVelocity、_grip.eventsEnabled、_grip.hasAngularVelocity、_grip.hasLinearVelocity、_grip.linearVelocity、_grip.matrixAutoUpdate、_grip.visible；返回 null===this._grip&&(this._grip=new Group(),this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Vector3(),this._grip.hasAngularVelocity=!1,this._grip.angularV。
- `dispatchEvent(event)` [源码:5082](../../eyes/src/vendor/three/core.js#L5082)：当前操作：写入 无直接字段写入；返回 null!==this._targetRay&&this._targetRay.dispatchEvent(event),null!==this._grip&&this._grip.dispatchEvent(event),null!==this._hand&&this._hand.dispatchEvent(event),this。
- `connect(inputSource)` [源码:5085](../../eyes/src/vendor/three/core.js#L5085)：当前操作：写入 无直接字段写入；返回 this.dispatchEvent({type:"connected",data:inputSource}),this。
- `disconnect(inputSource)` [源码:5095](../../eyes/src/vendor/three/core.js#L5095)：当前操作：写入 _grip.visible、_hand.visible、_targetRay.visible；返回 this.dispatchEvent({type:"disconnected",data:inputSource}),null!==this._targetRay&&(this._targetRay.visible=!1),null!==this._grip&&(this._grip.visible=!1),null!==this._hand&&(this._hand.visible=!1),this。
- `update(inputSource, frame, referenceSpace)` [源码:5101](../../eyes/src/vendor/three/core.js#L5101)：当前操作：写入 无直接字段写入；返回 null!==targetRay&&(targetRay.visible=null!==inputPose),null!==grip&&(grip.visible=null!==gripPose),null!==hand&&(hand.visible=null!==handPose),this。
- `_getHandJoint(hand, inputjoint)` [源码:5139](../../eyes/src/vendor/three/core.js#L5139)：当前操作：写入 无直接字段写入；返回 hand.joints[inputjoint.jointName]。

### `Color`

A Color instance is represented by RGB components in the linear <i>working color space</i>, which defaults to ˋLinearSRGBColorSpaceˋ. Inputs conventionally using ˋSRGBColorSpaceˋ (such as hexadecimals and CSS strings) are converted to the working color space automatically. ˋˋˋjs // converted automatically from SRGBColorSpace to LinearSRGBColorSpace const color = new THREE.Color().setHex( 0x112233 ); ˋˋˋ Source color spaces may be specified explicitly, to ensure correct conversions. ˋˋˋjs // assumed already LinearSRGBColorSpace; no conversion const color = new THREE.Color().setRGB( 0.5, 0.5, 0.5 ); // converted explicitly from SRGBColorSpace to LinearSRGBColorSpace const color = new THREE.Color().setRGB( 0.5, 0.5, 0.5, SRGBColorSpace ); ˋˋˋ If THREE.ColorManagement is disabled, no conversions occur. For details, see <i>Color management</i>. Iterating through a Color instance will yield its components (r, g, b) in the corresponding order. A Color can be initialised in any of the following ways: ˋˋˋjs //empty constructor - will default white const color1 = new THREE.Color(); //Hexadecimal color (recommended) const color2 = new THREE.Color( 0xff0000 ); //RGB string const color3 = new THREE.Color("rgb(255, 0, 0)"); const color4 = new THREE.Color("rgb(100%, 0%, 0%)"); //X11 color name - all 140 color names are supported. //Note the lack of CamelCase in the name const color5 = new THREE.Color( 'skyblue' ); //HSL string const color6 = new THREE.Color("hsl(0, 100%, 50%)"); //Separate RGB values between 0 and 1 const color7 = new THREE.Color( 1, 0, 0 ); ˋˋˋ。父类 `无`。

- `constructor(r, g, b)` [源码:5366](../../eyes/src/vendor/three/core.js#L5366)：Constructs a new color. Note that standard method of specifying color in three.js is with a hexadecimal triplet, and that method is used throughout the rest of the documentation. @param {(number\|string\|Color)} [r] - The red component of the color. If ˋgˋ and ˋbˋ are not provided, it can be hexadecimal triplet, a CSS-style string or another ˋColorˋ instance. @param {number} [g] - The green component. @param {number} [b] - The blue component.
- `set(r, g, b)` [源码:5369](../../eyes/src/vendor/three/core.js#L5369)：当前操作：写入 无直接字段写入；返回 this。
- `setScalar(scalar)` [源码:5382](../../eyes/src/vendor/three/core.js#L5382)：Sets the colors's components to the given scalar value. @param {number} scalar - The scalar value. @return {Color} A reference to this color.
- `setHex(hex, colorSpace=SRGBColorSpace)` [源码:5385](../../eyes/src/vendor/three/core.js#L5385)：当前操作：写入 b、g、r；返回 hex=Math.floor(hex),this.r=(hex>>16&255)/255,this.g=(hex>>8&255)/255,this.b=(255&hex)/255,ColorManagement.colorSpaceToWorking(this,colorSpace),this。
- `setRGB(r, g, b, colorSpace=ColorManagement.workingColorSpace)` [源码:5397](../../eyes/src/vendor/three/core.js#L5397)：Sets this color from RGB values. @param {number} r - Red channel value between ˋ0.0ˋ and ˋ1.0ˋ. @param {number} g - Green channel value between ˋ0.0ˋ and ˋ1.0ˋ. @param {number} b - Blue channel value between ˋ0.0ˋ and ˋ1.0ˋ. @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space. @return {Color} A reference to this color.
- `setHSL(h, s, l, colorSpace=ColorManagement.workingColorSpace)` [源码:5400](../../eyes/src/vendor/three/core.js#L5400)：当前操作：写入 b、g、r；返回 ColorManagement.colorSpaceToWorking(this,colorSpace),this。
- `setStyle(e, t=SRGBColorSpace)` [源码:5409](../../eyes/src/vendor/three/core.js#L5409)：解析 rgb/rgba 整数或百分比、hsl/hsla、3/6 位 hex，否则走颜色名。RGB 分别以 255/100 上限截断并归一化，HSL 角度除 360；颜色空间默认 SRGBColorSpace，经 setRGB/setHSL 转入工作空间。正则不是现代 CSS 任意语法解析器。
- `setColorName(style, colorSpace=SRGBColorSpace)` [源码:5440](../../eyes/src/vendor/three/core.js#L5440)：当前操作：写入 无直接字段写入；返回 void 0!==hex?this.setHex(hex,colorSpace):warn("Color: Unknown color "+style),this。
- `clone()` [源码:5449](../../eyes/src/vendor/three/core.js#L5449)：Returns a new color with copied values from this instance. @return {Color} A clone of this instance.
- `copy(color)` [源码:5458](../../eyes/src/vendor/three/core.js#L5458)：Copies the values of the given color to this instance. @param {Color} color - The color to copy. @return {Color} A reference to this color.
- `copySRGBToLinear(color)` [源码:5468](../../eyes/src/vendor/three/core.js#L5468)：Copies the given color into this color, and then converts this color from ˋSRGBColorSpaceˋ to ˋLinearSRGBColorSpaceˋ. @param {Color} color - The color to copy/convert. @return {Color} A reference to this color.
- `copyLinearToSRGB(color)` [源码:5478](../../eyes/src/vendor/three/core.js#L5478)：Copies the given color into this color, and then converts this color from ˋLinearSRGBColorSpaceˋ to ˋSRGBColorSpaceˋ. @param {Color} color - The color to copy/convert. @return {Color} A reference to this color.
- `convertSRGBToLinear()` [源码:5486](../../eyes/src/vendor/three/core.js#L5486)：Converts this color from ˋSRGBColorSpaceˋ to ˋLinearSRGBColorSpaceˋ. @return {Color} A reference to this color.
- `convertLinearToSRGB()` [源码:5494](../../eyes/src/vendor/three/core.js#L5494)：Converts this color from ˋLinearSRGBColorSpaceˋ to ˋSRGBColorSpaceˋ. @return {Color} A reference to this color.
- `getHex(colorSpace=SRGBColorSpace)` [源码:5497](../../eyes/src/vendor/three/core.js#L5497)：当前操作：写入 无直接字段写入；返回 ColorManagement.workingToColorSpace(_color.copy(this),colorSpace),65536*Math.round(clamp(255*_color.r,0,255))+256*Math.round(clamp(255*_color.g,0,255))+Math.round(clamp(255*_color.b,0,255))。
- `getHexString(colorSpace=SRGBColorSpace)` [源码:5500](../../eyes/src/vendor/three/core.js#L5500)：当前操作：写入 无直接字段写入；返回 ("000000"+this.getHex(colorSpace).toString(16)).slice(-6)。
- `getHSL(e, t=ColorManagement.workingColorSpace)` [源码:5504](../../eyes/src/vendor/three/core.js#L5504)：把 this 复制到共享临时 Color 并转换到请求空间，避免改 this。max/min 给 lightness=(max+min)/2；灰阶 h=s=0；其余按亮度选择 saturation 分母、按最大通道选择 hue 扇区，再除 6。数值不是强制 clamp，不能把工作空间原始 RGB 直接当成 sRGB。
- `getRGB(target, colorSpace=ColorManagement.workingColorSpace)` [源码:5536](../../eyes/src/vendor/three/core.js#L5536)：Returns the RGB values of this color and stores them into the given target object. @param {Color} target - The target color that is used to store the method's result. @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space. @return {Color} The RGB representation of this color.
- `getStyle(colorSpace=SRGBColorSpace)` [源码:5539](../../eyes/src/vendor/three/core.js#L5539)：当前操作：写入 无直接字段写入；返回 colorSpace!==SRGBColorSpace?ˋcolor(${colorSpace} ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)})ˋ:ˋrgb(${Math.round(255*r)},${Math.round(255*g)},${Math.round(255*b)})ˋ。
- `offsetHSL(h, s, l)` [源码:5556](../../eyes/src/vendor/three/core.js#L5556)：Adds the given HSL values to this color's values. Internally, this converts the color's RGB values to HSL, adds HSL and then converts the color back to RGB. @param {number} h - Hue value between ˋ0.0ˋ and ˋ1.0ˋ. @param {number} s - Saturation value between ˋ0.0ˋ and ˋ1.0ˋ. @param {number} l - Lightness value between ˋ0.0ˋ and ˋ1.0ˋ. @return {Color} A reference to this color.
- `add(color)` [源码:5565](../../eyes/src/vendor/three/core.js#L5565)：Adds the RGB values of the given color to the RGB values of this color. @param {Color} color - The color to add. @return {Color} A reference to this color.
- `addColors(color1, color2)` [源码:5575](../../eyes/src/vendor/three/core.js#L5575)：Adds the RGB values of the given colors and stores the result in this instance. @param {Color} color1 - The first color. @param {Color} color2 - The second color. @return {Color} A reference to this color.
- `addScalar(s)` [源码:5584](../../eyes/src/vendor/three/core.js#L5584)：Adds the given scalar value to the RGB values of this color. @param {number} s - The scalar to add. @return {Color} A reference to this color.
- `sub(color)` [源码:5593](../../eyes/src/vendor/three/core.js#L5593)：Subtracts the RGB values of the given color from the RGB values of this color. @param {Color} color - The color to subtract. @return {Color} A reference to this color.
- `multiply(color)` [源码:5602](../../eyes/src/vendor/three/core.js#L5602)：Multiplies the RGB values of the given color with the RGB values of this color. @param {Color} color - The color to multiply. @return {Color} A reference to this color.
- `multiplyScalar(s)` [源码:5611](../../eyes/src/vendor/three/core.js#L5611)：Multiplies the given scalar value with the RGB values of this color. @param {number} s - The scalar to multiply. @return {Color} A reference to this color.
- `lerp(color, alpha)` [源码:5623](../../eyes/src/vendor/three/core.js#L5623)：Linearly interpolates this color's RGB values toward the RGB values of the given color. The alpha argument can be thought of as the ratio between the two colors, where ˋ0.0ˋ is this color and ˋ1.0ˋ is the first argument. @param {Color} color - The color to converge on. @param {number} alpha - The interpolation factor in the closed interval ˋ[0,1]ˋ. @return {Color} A reference to this color.
- `lerpColors(color1, color2, alpha)` [源码:5636](../../eyes/src/vendor/three/core.js#L5636)：Linearly interpolates between the given colors and stores the result in this instance. The alpha argument can be thought of as the ratio between the two colors, where ˋ0.0ˋ is the first and ˋ1.0ˋ is the second color. @param {Color} color1 - The first color. @param {Color} color2 - The second color. @param {number} alpha - The interpolation factor in the closed interval ˋ[0,1]ˋ. @return {Color} A reference to this color.
- `lerpHSL(color, alpha)` [源码:5650](../../eyes/src/vendor/three/core.js#L5650)：Linearly interpolates this color's HSL values toward the HSL values of the given color. It differs from {@link Color#lerp} by not interpolating straight from one color to the other, but instead going through all the hues in between those two colors. The alpha argument can be thought of as the ratio between the two colors, where 0.0 is this color and 1.0 is the first argument. @param {Color} color - The color to converge on. @param {number} alpha - The interpolation factor in the closed interval ˋ[0,1]ˋ. @return {Color} A reference to this color.
- `setFromVector3(v)` [源码:5663](../../eyes/src/vendor/three/core.js#L5663)：Sets the color's RGB components from the given 3D vector. @param {Vector3} v - The vector to set. @return {Color} A reference to this color.
- `applyMatrix3(m)` [源码:5672](../../eyes/src/vendor/three/core.js#L5672)：Transforms this color with the given 3x3 matrix. @param {Matrix3} m - The matrix. @return {Color} A reference to this color.
- `equals(c)` [源码:5685](../../eyes/src/vendor/three/core.js#L5685)：Returns ˋtrueˋ if this color is equal with the given one. @param {Color} c - The color to test for equality. @return {boolean} Whether this bounding color is equal with the given one.
- `fromArray(array, offset=0)` [源码:5695](../../eyes/src/vendor/three/core.js#L5695)：Sets this color's RGB components from the given array. @param {Array<number>} array - An array holding the RGB values. @param {number} [offset=0] - The offset into the array. @return {Color} A reference to this color.
- `toArray(array=[], offset=0)` [源码:5706](../../eyes/src/vendor/three/core.js#L5706)：Writes the RGB components of this color to the given array. If no array is provided, the method returns a new instance. @param {Array<number>} [array=[]] - The target array holding the color components. @param {number} [offset=0] - Index of the first element in the array. @return {Array<number>} The color components.
- `fromBufferAttribute(attribute, index)` [源码:5716](../../eyes/src/vendor/three/core.js#L5716)：Sets the components of this color from the given buffer attribute. @param {BufferAttribute} attribute - The buffer attribute holding color data. @param {number} index - The index into the attribute. @return {Color} A reference to this color.
- `toJSON()` [源码:5725](../../eyes/src/vendor/three/core.js#L5725)：This methods defines the serialization result of this class. Returns the color as a hexadecimal value. @return {number} The hexadecimal value.
- `Symbol.iterator()` [源码:5728](../../eyes/src/vendor/three/core.js#L5728)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `FogExp2`

This class can be used to define an exponential squared fog, which gives a clear view near the camera and a faster than exponentially densening fog farther from the camera. ˋˋˋjs const scene = new THREE.Scene(); scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 ); ˋˋˋ。父类 `无`。

- `constructor(color, density=25e-5)` [源码:5745](../../eyes/src/vendor/three/core.js#L5745)：当前操作：写入 color、density、isFogExp2、name；返回 无显式返回。
- `clone()` [源码:5753](../../eyes/src/vendor/three/core.js#L5753)：Returns a new fog with copied values from this instance. @return {FogExp2} A clone of this instance.
- `toJSON()` [源码:5756](../../eyes/src/vendor/three/core.js#L5756)：当前操作：写入 无直接字段写入；返回 {type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}。

### `Fog`

This class can be used to define a linear fog that grows linearly denser with the distance. ˋˋˋjs const scene = new THREE.Scene(); scene.fog = new THREE.Fog( 0xcccccc, 10, 15 ); ˋˋˋ。父类 `无`。

- `constructor(color, near=1, far=1e3)` [源码:5775](../../eyes/src/vendor/three/core.js#L5775)：当前操作：写入 color、far、isFog、name、near；返回 无显式返回。
- `clone()` [源码:5783](../../eyes/src/vendor/three/core.js#L5783)：Returns a new fog with copied values from this instance. @return {Fog} A clone of this instance.
- `toJSON()` [源码:5786](../../eyes/src/vendor/three/core.js#L5786)：当前操作：写入 无直接字段写入；返回 {type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}。

### `Scene`

根场景容器，维护环境、背景、雾和材质覆盖。父类 `Object3D`。

- `constructor()` [源码:5797](../../eyes/src/vendor/three/core.js#L5797)：当前操作：写入 background、backgroundBlurriness、backgroundIntensity、backgroundRotation、environment、environmentIntensity、environmentRotation、fog、isScene、overrideMaterial、type；返回 无显式返回。
- `copy(source, recursive)` [源码:5802](../../eyes/src/vendor/three/core.js#L5802)：当前操作：写入 background、backgroundBlurriness、backgroundIntensity、environment、environmentIntensity、fog、matrixAutoUpdate、overrideMaterial；返回 super.copy(source,recursive),null!==source.background&&(this.background=source.background.clone()),null!==source.environment&&(this.environment=source.environment.clone()),null!==source.fog&&(this.fog=source.fog.clone())。
- `toJSON(meta)` [源码:5805](../../eyes/src/vendor/three/core.js#L5805)：当前操作：写入 无直接字段写入；返回 null!==this.fog&&(data.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(data.object.backgroundBlurriness=this.backgroundBlurriness),1!==this.backgroundIntensity&&(data.object.backgroundIntensity=this.backgroun。

### `Triangle`

A geometric triangle as defined by three vectors representing its three corners.。父类 `无`。

- `constructor(a=new Vector3(), b=new Vector3(), c=new Vector3())` [源码:5834](../../eyes/src/vendor/three/core.js#L5834)：Constructs a new triangle. @param {Vector3} [a=(0,0,0)] - The first corner of the triangle. @param {Vector3} [b=(0,0,0)] - The second corner of the triangle. @param {Vector3} [c=(0,0,0)] - The third corner of the triangle.
- `static getNormal(a, b, c, target)` [源码:5837](../../eyes/src/vendor/three/core.js#L5837)：当前操作：写入 无直接字段写入；返回 targetLengthSq>0?target.multiplyScalar(1/Math.sqrt(targetLengthSq)):target.set(0,0,0)。
- `static getBarycoord(point, a, b, c, target)` [源码:5842](../../eyes/src/vendor/three/core.js#L5842)：当前操作：写入 无直接字段写入；返回 target.set(0,0,0),null、target.set(1-u-v,v,u)。
- `static containsPoint(point, a, b, c)` [源码:5856](../../eyes/src/vendor/three/core.js#L5856)：当前操作：写入 无直接字段写入；返回 null!==this.getBarycoord(point,a,b,c,yi)&&yi.x>=0&&yi.y>=0&&yi.x+yi.y<=1。
- `static getInterpolation(point, p1, p2, p3, v1, v2, v3, target)` [源码:5859](../../eyes/src/vendor/three/core.js#L5859)：当前操作：写入 无直接字段写入；返回 null===this.getBarycoord(point,p1,p2,p3,yi)?(target.x=0,target.y=0,"z"in target&&(target.z=0),"w"in target&&(target.w=0),null):(target.setScalar(0),target.addScaledVector(v1,yi.x),target.addScaledVector(v2,yi.y),target.a。
- `static getInterpolatedAttribute(attr, i1, i2, i3, barycoord, target)` [源码:5873](../../eyes/src/vendor/three/core.js#L5873)：Computes the value barycentrically interpolated for the given attribute and indices. @param {BufferAttribute} attr - The attribute to interpolate. @param {number} i1 - Index of first vertex. @param {number} i2 - Index of second vertex. @param {number} i3 - Index of third vertex. @param {Vector3} barycoord - The barycoordinate value to use to interpolate. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The interpolated attribute value.
- `static isFrontFacing(a, b, c, direction)` [源码:5885](../../eyes/src/vendor/three/core.js#L5885)：Returns ˋtrueˋ if the triangle is oriented towards the given direction. @param {Vector3} a - The first corner of the triangle. @param {Vector3} b - The second corner of the triangle. @param {Vector3} c - The third corner of the triangle. @param {Vector3} direction - The (normalized) direction vector. @return {boolean} Whether the triangle is oriented towards the given direction or not.
- `set(a, b, c)` [源码:5896](../../eyes/src/vendor/three/core.js#L5896)：Sets the triangle's vertices by copying the given values. @param {Vector3} a - The first corner of the triangle. @param {Vector3} b - The second corner of the triangle. @param {Vector3} c - The third corner of the triangle. @return {Triangle} A reference to this triangle.
- `setFromPointsAndIndices(points, i0, i1, i2)` [源码:5908](../../eyes/src/vendor/three/core.js#L5908)：Sets the triangle's vertices by copying the given array values. @param {Array<Vector3>} points - An array with 3D points. @param {number} i0 - The array index representing the first corner of the triangle. @param {number} i1 - The array index representing the second corner of the triangle. @param {number} i2 - The array index representing the third corner of the triangle. @return {Triangle} A reference to this triangle.
- `setFromAttributeAndIndices(attribute, i0, i1, i2)` [源码:5920](../../eyes/src/vendor/three/core.js#L5920)：Sets the triangle's vertices by copying the given attribute values. @param {BufferAttribute} attribute - A buffer attribute with 3D points data. @param {number} i0 - The attribute index representing the first corner of the triangle. @param {number} i1 - The attribute index representing the second corner of the triangle. @param {number} i2 - The attribute index representing the third corner of the triangle. @return {Triangle} A reference to this triangle.
- `clone()` [源码:5928](../../eyes/src/vendor/three/core.js#L5928)：Returns a new triangle with copied values from this instance. @return {Triangle} A clone of this instance.
- `copy(triangle)` [源码:5937](../../eyes/src/vendor/three/core.js#L5937)：Copies the values of the given triangle to this instance. @param {Triangle} triangle - The triangle to copy. @return {Triangle} A reference to this triangle.
- `getArea()` [源码:5940](../../eyes/src/vendor/three/core.js#L5940)：当前操作：写入 无直接字段写入；返回 _v0$2.subVectors(this.c,this.b),_v1$5.subVectors(this.a,this.b),.5*_v0$2.cross(_v1$5).length()。
- `getMidpoint(target)` [源码:5949](../../eyes/src/vendor/three/core.js#L5949)：Computes the midpoint of the triangle. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The triangle's midpoint.
- `getNormal(target)` [源码:5958](../../eyes/src/vendor/three/core.js#L5958)：Computes the normal of the triangle. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The triangle's normal.
- `getPlane(target)` [源码:5967](../../eyes/src/vendor/three/core.js#L5967)：Computes a plane the triangle lies within. @param {Plane} target - The target vector that is used to store the method's result. @return {Plane} The plane the triangle lies within.
- `getBarycoord(point, target)` [源码:5978](../../eyes/src/vendor/three/core.js#L5978)：Computes a barycentric coordinates from the given vector. Returns ˋnullˋ if the triangle is degenerate. @param {Vector3} point - A point in 3D space. @param {Vector3} target - The target vector that is used to store the method's result. @return {?Vector3} The barycentric coordinates for the given point
- `getInterpolation(point, v1, v2, v3, target)` [源码:5992](../../eyes/src/vendor/three/core.js#L5992)：Computes the value barycentrically interpolated for the given point on the triangle. Returns ˋnullˋ if the triangle is degenerate. @param {Vector3} point - Position of interpolated point. @param {Vector3} v1 - Value to interpolate of first vertex. @param {Vector3} v2 - Value to interpolate of second vertex. @param {Vector3} v3 - Value to interpolate of third vertex. @param {Vector3} target - The target vector that is used to store the method's result. @return {?Vector3} The interpolated value.
- `containsPoint(point)` [源码:6003](../../eyes/src/vendor/three/core.js#L6003)：Returns ˋtrueˋ if the given point, when projected onto the plane of the triangle, lies within the triangle. @param {Vector3} point - The point in 3D space to test. @return {boolean} Whether the given point, when projected onto the plane of the triangle, lies within the triangle or not.
- `isFrontFacing(direction)` [源码:6012](../../eyes/src/vendor/three/core.js#L6012)：Returns ˋtrueˋ if the triangle is oriented towards the given direction. @param {Vector3} direction - The (normalized) direction vector. @return {boolean} Whether the triangle is oriented towards the given direction or not.
- `intersectsBox(box)` [源码:6021](../../eyes/src/vendor/three/core.js#L6021)：Returns ˋtrueˋ if this triangle intersects with the given box. @param {Box3} box - The box to intersect. @return {boolean} Whether this triangle intersects with the given box or not.
- `closestPointToPoint(p, target)` [源码:6031](../../eyes/src/vendor/three/core.js#L6031)：Returns the closest point on the triangle to the given point. @param {Vector3} p - The point to compute the closest point for. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The closest point on the triangle.
- `equals(triangle)` [源码:6063](../../eyes/src/vendor/three/core.js#L6063)：Returns ˋtrueˋ if this triangle is equal with the given one. @param {Triangle} triangle - The triangle to test for equality. @return {boolean} Whether this triangle is equal with the given one.

### `Box3`

Represents an axis-aligned bounding box (AABB) in 3D space.。父类 `无`。

- `constructor(min=new Vector3(1/0,1/0,1/0), max=new Vector3(-1/0,-1/0,-1/0))` [源码:6071](../../eyes/src/vendor/three/core.js#L6071)：当前操作：写入 isBox3、max、min；返回 无显式返回。
- `set(min, max)` [源码:6082](../../eyes/src/vendor/three/core.js#L6082)：Sets the lower and upper boundaries of this box. Please note that this method only copies the values from the given objects. @param {Vector3} min - The lower boundary of the box. @param {Vector3} max - The upper boundary of the box. @return {Box3} A reference to this bounding box.
- `setFromArray(array)` [源码:6085](../../eyes/src/vendor/three/core.js#L6085)：当前操作：写入 无直接字段写入；返回 this。
- `setFromBufferAttribute(attribute)` [源码:6090](../../eyes/src/vendor/three/core.js#L6090)：当前操作：写入 无直接字段写入；返回 this。
- `setFromPoints(points)` [源码:6095](../../eyes/src/vendor/three/core.js#L6095)：当前操作：写入 无直接字段写入；返回 this。
- `setFromCenterAndSize(center, size)` [源码:6100](../../eyes/src/vendor/three/core.js#L6100)：当前操作：写入 无直接字段写入；返回 this.min.copy(center).sub(halfSize),this.max.copy(center).add(halfSize),this。
- `setFromObject(object, precise=!1)` [源码:6119](../../eyes/src/vendor/three/core.js#L6119)：Computes the world-axis-aligned bounding box for the given 3D object (including its children), accounting for the object's, and children's, world transforms. The function may result in a larger box than strictly necessary. Note: To compute the correct bounding box, make sure the given 3D object has an up-to-date world matrix that reflects the current transformation of its ancestor nodes. Call ˋobject.updateWorldMatrix( true, false )ˋ beforehand if you're unsure. @param {Object3D} object - The 3D object to compute the bounding box for. @param {boolean} [precise=false] - If set to ˋtrueˋ, the method computes the smallest world-axis-aligned bounding box at the expense of more computation. @return {Box3} A reference to this bounding box.
- `clone()` [源码:6127](../../eyes/src/vendor/three/core.js#L6127)：Returns a new box with copied values from this instance. @return {Box3} A clone of this instance.
- `copy(box)` [源码:6136](../../eyes/src/vendor/three/core.js#L6136)：Copies the values of the given box to this instance. @param {Box3} box - The box to copy. @return {Box3} A reference to this bounding box.
- `makeEmpty()` [源码:6139](../../eyes/src/vendor/three/core.js#L6139)：当前操作：写入 max.x、max.y、max.z、min.x、min.y、min.z；返回 this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this。
- `isEmpty()` [源码:6149](../../eyes/src/vendor/three/core.js#L6149)：Returns true if this box includes zero points within its bounds. Note that a box with equal lower and upper bounds still includes one point, the one both bounds share. @return {boolean} Whether this box is empty or not.
- `getCenter(target)` [源码:6152](../../eyes/src/vendor/three/core.js#L6152)：当前操作：写入 无直接字段写入；返回 this.isEmpty()?target.set(0,0,0):target.addVectors(this.min,this.max).multiplyScalar(.5)。
- `getSize(target)` [源码:6161](../../eyes/src/vendor/three/core.js#L6161)：Returns the dimensions of this box. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The size.
- `expandByPoint(point)` [源码:6170](../../eyes/src/vendor/three/core.js#L6170)：Expands the boundaries of this box to include the given point. @param {Vector3} point - The point that should be included by the bounding box. @return {Box3} A reference to this bounding box.
- `expandByVector(vector)` [源码:6183](../../eyes/src/vendor/three/core.js#L6183)：Expands this box equilaterally by the given vector. The width of this box will be expanded by the x component of the vector in both directions. The height of this box will be expanded by the y component of the vector in both directions. The depth of this box will be expanded by the z component of the vector in both directions. @param {Vector3} vector - The vector that should expand the bounding box. @return {Box3} A reference to this bounding box.
- `expandByScalar(scalar)` [源码:6193](../../eyes/src/vendor/three/core.js#L6193)：Expands each dimension of the box by the given scalar. If negative, the dimensions of the box will be contracted. @param {number} scalar - The scalar value that should expand the bounding box. @return {Box3} A reference to this bounding box.
- `expandByObject(object, precise=!1)` [源码:6196](../../eyes/src/vendor/three/core.js#L6196)：当前操作：写入 无直接字段写入；返回 this。
- `containsPoint(point)` [源码:6213](../../eyes/src/vendor/three/core.js#L6213)：Returns ˋtrueˋ if the given point lies within or on the boundaries of this box. @param {Vector3} point - The point to test. @return {boolean} Whether the bounding box contains the given point or not.
- `containsBox(box)` [源码:6223](../../eyes/src/vendor/three/core.js#L6223)：Returns ˋtrueˋ if this bounding box includes the entirety of the given bounding box. If this box and the given one are identical, this function also returns ˋtrueˋ. @param {Box3} box - The bounding box to test. @return {boolean} Whether the bounding box contains the given bounding box or not.
- `getParameter(point, target)` [源码:6233](../../eyes/src/vendor/three/core.js#L6233)：Returns a point as a proportion of this box's width, height and depth. @param {Vector3} point - A point in 3D space. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} A point as a proportion of this box's width, height and depth.
- `intersectsBox(box)` [源码:6242](../../eyes/src/vendor/three/core.js#L6242)：Returns ˋtrueˋ if the given bounding box intersects with this bounding box. @param {Box3} box - The bounding box to test. @return {boolean} Whether the given bounding box intersects with this bounding box.
- `intersectsSphere(sphere)` [源码:6251](../../eyes/src/vendor/three/core.js#L6251)：Returns ˋtrueˋ if the given bounding sphere intersects with this bounding box. @param {Sphere} sphere - The bounding sphere to test. @return {boolean} Whether the given bounding sphere intersects with this bounding box.
- `intersectsPlane(plane)` [源码:6260](../../eyes/src/vendor/three/core.js#L6260)：Returns ˋtrueˋ if the given plane intersects with this bounding box. @param {Plane} plane - The plane to test. @return {boolean} Whether the given plane intersects with this bounding box.
- `intersectsTriangle(e)` [源码:6265](../../eyes/src/vendor/three/core.js#L6265)：空盒直接 false。将三角形平移到盒中心坐标，使用盒半径和三条边构造分离轴：9 个边×坐标轴、3 个盒轴、1 个三角形法线；任一投影分离就 false。边界接触按非严格分离保留。
- `clampPoint(point, target)` [源码:6278](../../eyes/src/vendor/three/core.js#L6278)：Clamps the given point within the bounds of this box. @param {Vector3} point - The point to clamp. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The clamped point.
- `distanceToPoint(point)` [源码:6288](../../eyes/src/vendor/three/core.js#L6288)：Returns the euclidean distance from any edge of this box to the specified point. If the given point lies inside of this box, the distance will be ˋ0ˋ. @param {Vector3} point - The point to compute the distance to. @return {number} The euclidean distance.
- `getBoundingSphere(target)` [源码:6291](../../eyes/src/vendor/three/core.js#L6291)：当前操作：写入 无直接字段写入；返回 this.isEmpty()?target.makeEmpty():(this.getCenter(target.center),target.radius=.5*this.getSize(_vector$b).length()),target。
- `intersect(box)` [源码:6303](../../eyes/src/vendor/three/core.js#L6303)：Computes the intersection of this bounding box and the given one, setting the upper bound of this box to the lesser of the two boxes' upper bounds and the lower bound of this box to the greater of the two boxes' lower bounds. If there's no overlap, makes this box empty. @param {Box3} box - The bounding box to intersect with. @return {Box3} A reference to this bounding box.
- `union(box)` [源码:6314](../../eyes/src/vendor/three/core.js#L6314)：Computes the union of this box and another and the given one, setting the upper bound of this box to the greater of the two boxes' upper bounds and the lower bound of this box to the lesser of the two boxes' lower bounds. @param {Box3} box - The bounding box that will be unioned with this instance. @return {Box3} A reference to this bounding box.
- `applyMatrix4(matrix)` [源码:6317](../../eyes/src/vendor/three/core.js#L6317)：当前操作：写入 无直接字段写入；返回 this.isEmpty()\|\|(Bi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(matrix),Bi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(matrix),Bi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(matrix),Bi[3].se。
- `translate(offset)` [源码:6327](../../eyes/src/vendor/three/core.js#L6327)：Adds the given offset to both the upper and lower bounds of this bounding box, effectively moving it in 3D space. @param {Vector3} offset - The offset that should be used to translate the bounding box. @return {Box3} A reference to this bounding box.
- `equals(box)` [源码:6336](../../eyes/src/vendor/three/core.js#L6336)：Returns ˋtrueˋ if this bounding box is equal with the given one. @param {Box3} box - The box to test for equality. @return {boolean} Whether this bounding box is equal with the given one.
- `toJSON()` [源码:6344](../../eyes/src/vendor/three/core.js#L6344)：Returns a serialized structure of the bounding box. @return {Object} Serialized structure with fields representing the object state.
- `fromJSON(json)` [源码:6356](../../eyes/src/vendor/three/core.js#L6356)：Returns a serialized structure of the bounding box. @param {Object} json - The serialized json to set the box from. @return {Box3} A reference to this bounding box.

### `DataUtils`

A class containing utility functions for data. @hideconstructor。父类 `无`。

- `static toHalfFloat(val)` [源码:6447](../../eyes/src/vendor/three/core.js#L6447)：Returns a half precision floating point value (FP16) from the given single precision floating point value (FP32). @param {number} val - A single precision floating point value. @return {number} The FP16 value.
- `static fromHalfFloat(val)` [源码:6457](../../eyes/src/vendor/three/core.js#L6457)：Returns a single precision floating point value (FP32) from the given half precision floating point value (FP16). @param {number} val - A half precision floating point value. @return {number} The FP32 value.

### `BufferAttribute`

This class stores data for an attribute (such as vertex positions, face indices, normals, colors, UVs, and any custom attributes ) associated with a geometry, which allows for more efficient passing of data to the GPU. When working with vector-like data, the ˋfromBufferAttribute( attribute, index )ˋ helper methods on vector and color class might be helpful. E.g. {@link Vector3#fromBufferAttribute}.。父类 `EventDispatcher`。

- `constructor(array, itemSize, normalized=!1)` [源码:6473](../../eyes/src/vendor/three/core.js#L6473)：当前操作：写入 array、count、gpuType、isBufferAttribute、itemSize、name、normalized、updateRanges、usage、version；返回 无显式返回。
- `onUploadCallback()` [源码:6479](../../eyes/src/vendor/three/core.js#L6479)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `set needsUpdate(value)` [源码:6480](../../eyes/src/vendor/three/core.js#L6480)：当前操作：写入 version；返回 无显式返回。
- `setUsage(value)` [源码:6489](../../eyes/src/vendor/three/core.js#L6489)：Sets the usage of this buffer attribute. @param {(StaticDrawUsage\|DynamicDrawUsage\|StreamDrawUsage\|StaticReadUsage\|DynamicReadUsage\|StreamReadUsage\|StaticCopyUsage\|DynamicCopyUsage\|StreamCopyUsage)} value - The usage to set. @return {BufferAttribute} A reference to this buffer attribute.
- `addUpdateRange(start, count)` [源码:6498](../../eyes/src/vendor/three/core.js#L6498)：Adds a range of data in the data array to be updated on the GPU. @param {number} start - Position at which to start update. @param {number} count - The number of components to update.
- `clearUpdateRanges()` [源码:6504](../../eyes/src/vendor/three/core.js#L6504)：当前操作：写入 updateRanges.length；返回 无显式返回。
- `copy(source)` [源码:6513](../../eyes/src/vendor/three/core.js#L6513)：Copies the values of the given buffer attribute to this instance. @param {BufferAttribute} source - The buffer attribute to copy. @return {BufferAttribute} A reference to this instance.
- `copyAt(index1, attribute, index2)` [源码:6516](../../eyes/src/vendor/three/core.js#L6516)：当前操作：写入 array[index1+i]；返回 this。
- `copyArray(array)` [源码:6527](../../eyes/src/vendor/three/core.js#L6527)：Copies the given array data into this buffer attribute. @param {(TypedArray\|Array)} array - The array to copy. @return {BufferAttribute} A reference to this instance.
- `applyMatrix3(m)` [源码:6530](../../eyes/src/vendor/three/core.js#L6530)：当前操作：写入 无直接字段写入；返回 this。
- `applyMatrix4(m)` [源码:6541](../../eyes/src/vendor/three/core.js#L6541)：Applies the given 4x4 matrix to the given attribute. Only works with item size ˋ3ˋ. @param {Matrix4} m - The matrix to apply. @return {BufferAttribute} A reference to this instance.
- `applyNormalMatrix(m)` [源码:6552](../../eyes/src/vendor/three/core.js#L6552)：Applies the given 3x3 normal matrix to the given attribute. Only works with item size ˋ3ˋ. @param {Matrix3} m - The normal matrix to apply. @return {BufferAttribute} A reference to this instance.
- `transformDirection(m)` [源码:6563](../../eyes/src/vendor/three/core.js#L6563)：Applies the given 4x4 matrix to the given attribute. Only works with item size ˋ3ˋ and with direction vectors. @param {Matrix4} m - The matrix to apply. @return {BufferAttribute} A reference to this instance.
- `set(value, offset=0)` [源码:6574](../../eyes/src/vendor/three/core.js#L6574)：Sets the given array data in the buffer attribute. @param {(TypedArray\|Array)} value - The array data to set. @param {number} [offset=0] - The offset in this buffer attribute's array. @return {BufferAttribute} A reference to this instance.
- `getComponent(index, component)` [源码:6584](../../eyes/src/vendor/three/core.js#L6584)：Returns the given component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} component - The component index. @return {number} The returned value.
- `setComponent(index, component, value)` [源码:6596](../../eyes/src/vendor/three/core.js#L6596)：Sets the given value to the given component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} component - The component index. @param {number} value - The value to set. @return {BufferAttribute} A reference to this instance.
- `getX(index)` [源码:6605](../../eyes/src/vendor/three/core.js#L6605)：Returns the x component of the vector at the given index. @param {number} index - The index into the buffer attribute. @return {number} The x component.
- `setX(index, x)` [源码:6616](../../eyes/src/vendor/three/core.js#L6616)：Sets the x component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} x - The value to set. @return {BufferAttribute} A reference to this instance.
- `getY(index)` [源码:6625](../../eyes/src/vendor/three/core.js#L6625)：Returns the y component of the vector at the given index. @param {number} index - The index into the buffer attribute. @return {number} The y component.
- `setY(index, y)` [源码:6636](../../eyes/src/vendor/three/core.js#L6636)：Sets the y component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} y - The value to set. @return {BufferAttribute} A reference to this instance.
- `getZ(index)` [源码:6645](../../eyes/src/vendor/three/core.js#L6645)：Returns the z component of the vector at the given index. @param {number} index - The index into the buffer attribute. @return {number} The z component.
- `setZ(index, z)` [源码:6656](../../eyes/src/vendor/three/core.js#L6656)：Sets the z component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} z - The value to set. @return {BufferAttribute} A reference to this instance.
- `getW(index)` [源码:6665](../../eyes/src/vendor/three/core.js#L6665)：Returns the w component of the vector at the given index. @param {number} index - The index into the buffer attribute. @return {number} The w component.
- `setW(index, w)` [源码:6676](../../eyes/src/vendor/three/core.js#L6676)：Sets the w component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} w - The value to set. @return {BufferAttribute} A reference to this instance.
- `setXY(index, x, y)` [源码:6687](../../eyes/src/vendor/three/core.js#L6687)：Sets the x and y component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} x - The value for the x component to set. @param {number} y - The value for the y component to set. @return {BufferAttribute} A reference to this instance.
- `setXYZ(index, x, y, z)` [源码:6699](../../eyes/src/vendor/three/core.js#L6699)：Sets the x, y and z component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} x - The value for the x component to set. @param {number} y - The value for the y component to set. @param {number} z - The value for the z component to set. @return {BufferAttribute} A reference to this instance.
- `setXYZW(index, x, y, z, w)` [源码:6712](../../eyes/src/vendor/three/core.js#L6712)：Sets the x, y, z and w component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} x - The value for the x component to set. @param {number} y - The value for the y component to set. @param {number} z - The value for the z component to set. @param {number} w - The value for the w component to set. @return {BufferAttribute} A reference to this instance.
- `onUpload(callback)` [源码:6723](../../eyes/src/vendor/three/core.js#L6723)：Sets the given callback function that is executed after the Renderer has transferred the attribute array data to the GPU. Can be used to perform clean-up operations after the upload when attribute data are not needed anymore on the CPU side. @param {Function} callback - The ˋonUpload()ˋ callback. @return {BufferAttribute} A reference to this instance.
- `clone()` [源码:6731](../../eyes/src/vendor/three/core.js#L6731)：Returns a new buffer attribute with copied values from this instance. @return {BufferAttribute} A clone of this instance.
- `toJSON()` [源码:6734](../../eyes/src/vendor/three/core.js#L6734)：当前操作：写入 无直接字段写入；返回 ""!==this.name&&(data.name=this.name),this.usage!==StaticDrawUsage&&(data.usage=this.usage),data。
- `dispose()` [源码:6743](../../eyes/src/vendor/three/core.js#L6743)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `Int8BufferAttribute`

Convenient class that can be used when creating a ˋInt8ˋ buffer attribute with a plain ˋArrayˋ instance. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6763](../../eyes/src/vendor/three/core.js#L6763)：Constructs a new buffer attribute. @param {(Array<number>\|Int8Array)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.

### `Uint8BufferAttribute`

Convenient class that can be used when creating a ˋUInt8ˋ buffer attribute with a plain ˋArrayˋ instance. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6781](../../eyes/src/vendor/three/core.js#L6781)：Constructs a new buffer attribute. @param {(Array<number>\|Uint8Array)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.

### `Uint8ClampedBufferAttribute`

Convenient class that can be used when creating a ˋUInt8Clampedˋ buffer attribute with a plain ˋArrayˋ instance. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6799](../../eyes/src/vendor/three/core.js#L6799)：Constructs a new buffer attribute. @param {(Array<number>\|Uint8ClampedArray)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.

### `Int16BufferAttribute`

Convenient class that can be used when creating a ˋInt16ˋ buffer attribute with a plain ˋArrayˋ instance. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6817](../../eyes/src/vendor/three/core.js#L6817)：Constructs a new buffer attribute. @param {(Array<number>\|Int16Array)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.

### `Uint16BufferAttribute`

Convenient class that can be used when creating a ˋUInt16ˋ buffer attribute with a plain ˋArrayˋ instance. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6835](../../eyes/src/vendor/three/core.js#L6835)：Constructs a new buffer attribute. @param {(Array<number>\|Uint16Array)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.

### `Int32BufferAttribute`

Convenient class that can be used when creating a ˋInt32ˋ buffer attribute with a plain ˋArrayˋ instance. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6853](../../eyes/src/vendor/three/core.js#L6853)：Constructs a new buffer attribute. @param {(Array<number>\|Int32Array)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.

### `Uint32BufferAttribute`

Convenient class that can be used when creating a ˋUInt32ˋ buffer attribute with a plain ˋArrayˋ instance. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6871](../../eyes/src/vendor/three/core.js#L6871)：Constructs a new buffer attribute. @param {(Array<number>\|Uint32Array)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.

### `Float16BufferAttribute`

Convenient class that can be used when creating a ˋFloat16ˋ buffer attribute with a plain ˋArrayˋ instance. This class automatically converts to and from FP16 via ˋUint16Arrayˋ since ˋFloat16Arrayˋ browser support is still problematic. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6892](../../eyes/src/vendor/three/core.js#L6892)：Constructs a new buffer attribute. @param {(Array<number>\|Uint16Array)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.
- `getX(index)` [源码:6895](../../eyes/src/vendor/three/core.js#L6895)：当前操作：写入 无直接字段写入；返回 this.normalized&&(x=denormalize(x,this.array)),x。
- `setX(index, x)` [源码:6899](../../eyes/src/vendor/three/core.js#L6899)：当前操作：写入 array[index*this.itemSize]；返回 this.normalized&&(x=normalize(x,this.array)),this.array[index*this.itemSize]=toHalfFloat(x),this。
- `getY(index)` [源码:6902](../../eyes/src/vendor/three/core.js#L6902)：当前操作：写入 无直接字段写入；返回 this.normalized&&(y=denormalize(y,this.array)),y。
- `setY(index, y)` [源码:6906](../../eyes/src/vendor/three/core.js#L6906)：当前操作：写入 array[index*this.itemSize+1]；返回 this.normalized&&(y=normalize(y,this.array)),this.array[index*this.itemSize+1]=toHalfFloat(y),this。
- `getZ(index)` [源码:6909](../../eyes/src/vendor/three/core.js#L6909)：当前操作：写入 无直接字段写入；返回 this.normalized&&(z=denormalize(z,this.array)),z。
- `setZ(index, z)` [源码:6913](../../eyes/src/vendor/three/core.js#L6913)：当前操作：写入 array[index*this.itemSize+2]；返回 this.normalized&&(z=normalize(z,this.array)),this.array[index*this.itemSize+2]=toHalfFloat(z),this。
- `getW(index)` [源码:6916](../../eyes/src/vendor/three/core.js#L6916)：当前操作：写入 无直接字段写入；返回 this.normalized&&(w=denormalize(w,this.array)),w。
- `setW(index, w)` [源码:6920](../../eyes/src/vendor/three/core.js#L6920)：当前操作：写入 array[index*this.itemSize+3]；返回 this.normalized&&(w=normalize(w,this.array)),this.array[index*this.itemSize+3]=toHalfFloat(w),this。
- `setXY(index, x, y)` [源码:6923](../../eyes/src/vendor/three/core.js#L6923)：当前操作：写入 array[index+0]、array[index+1]；返回 index*=this.itemSize,this.normalized&&(x=normalize(x,this.array),y=normalize(y,this.array)),this.array[index+0]=toHalfFloat(x),this.array[index+1]=toHalfFloat(y),this。
- `setXYZ(index, x, y, z)` [源码:6926](../../eyes/src/vendor/three/core.js#L6926)：当前操作：写入 array[index+0]、array[index+1]、array[index+2]；返回 index*=this.itemSize,this.normalized&&(x=normalize(x,this.array),y=normalize(y,this.array),z=normalize(z,this.array)),this.array[index+0]=toHalfFloat(x),this.array[index+1]=toHalfFloat(y),this.array[index+2]=toHalfFloat(。
- `setXYZW(index, x, y, z, w)` [源码:6929](../../eyes/src/vendor/three/core.js#L6929)：当前操作：写入 array[index+0]、array[index+1]、array[index+2]、array[index+3]；返回 index*=this.itemSize,this.normalized&&(x=normalize(x,this.array),y=normalize(y,this.array),z=normalize(z,this.array),w=normalize(w,this.array)),this.array[index+0]=toHalfFloat(x),this.array[index+1]=toHalfFloat(y),this.a。

### `Float32BufferAttribute`

Convenient class that can be used when creating a ˋFloat32ˋ buffer attribute with a plain ˋArrayˋ instance. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized)` [源码:6947](../../eyes/src/vendor/three/core.js#L6947)：Constructs a new buffer attribute. @param {(Array<number>\|Float32Array)} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not.

### `Sphere`

An analytical 3D sphere defined by a center and radius. This class is mainly used as a Bounding Sphere for 3D objects.。父类 `无`。

- `constructor(center=new Vector3(), radius=-1)` [源码:6965](../../eyes/src/vendor/three/core.js#L6965)：Constructs a new sphere. @param {Vector3} [center=(0,0,0)] - The center of the sphere @param {number} [radius=-1] - The radius of the sphere.
- `set(center, radius)` [源码:6975](../../eyes/src/vendor/three/core.js#L6975)：Sets the sphere's components by copying the given values. @param {Vector3} center - The center. @param {number} radius - The radius. @return {Sphere} A reference to this sphere.
- `setFromPoints(points, optionalCenter)` [源码:6978](../../eyes/src/vendor/three/core.js#L6978)：当前操作：写入 radius；返回 this.radius=Math.sqrt(maxRadiusSq),this。
- `copy(sphere)` [源码:6991](../../eyes/src/vendor/three/core.js#L6991)：Copies the values of the given sphere to this instance. @param {Sphere} sphere - The sphere to copy. @return {Sphere} A reference to this sphere.
- `isEmpty()` [源码:7002](../../eyes/src/vendor/three/core.js#L7002)：Returns ˋtrueˋ if the sphere is empty (the radius set to a negative number). Spheres with a radius of ˋ0ˋ contain only their center point and are not considered to be empty. @return {boolean} Whether this sphere is empty or not.
- `makeEmpty()` [源码:7010](../../eyes/src/vendor/three/core.js#L7010)：Makes this sphere empty which means in encloses a zero space in 3D. @return {Sphere} A reference to this sphere.
- `containsPoint(point)` [源码:7020](../../eyes/src/vendor/three/core.js#L7020)：Returns ˋtrueˋ if this sphere contains the given point inclusive of the surface of the sphere. @param {Vector3} point - The point to check. @return {boolean} Whether this sphere contains the given point or not.
- `distanceToPoint(point)` [源码:7031](../../eyes/src/vendor/three/core.js#L7031)：Returns the closest distance from the boundary of the sphere to the given point. If the sphere contains the point, the distance will be negative. @param {Vector3} point - The point to compute the distance to. @return {number} The distance to the point.
- `intersectsSphere(sphere)` [源码:7040](../../eyes/src/vendor/three/core.js#L7040)：Returns ˋtrueˋ if this sphere intersects with the given one. @param {Sphere} sphere - The sphere to test. @return {boolean} Whether this sphere intersects with the given one or not.
- `intersectsBox(box)` [源码:7050](../../eyes/src/vendor/three/core.js#L7050)：Returns ˋtrueˋ if this sphere intersects with the given box. @param {Box3} box - The box to test. @return {boolean} Whether this sphere intersects with the given box or not.
- `intersectsPlane(plane)` [源码:7059](../../eyes/src/vendor/three/core.js#L7059)：Returns ˋtrueˋ if this sphere intersects with the given plane. @param {Plane} plane - The plane to test. @return {boolean} Whether this sphere intersects with the given plane or not.
- `clampPoint(point, target)` [源码:7071](../../eyes/src/vendor/three/core.js#L7071)：Clamps a point within the sphere. If the point is outside the sphere, it will clamp it to the closest point on the edge of the sphere. Points already inside the sphere will not be affected. @param {Vector3} point - The plane to clamp. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The clamped point.
- `getBoundingBox(target)` [源码:7075](../../eyes/src/vendor/three/core.js#L7075)：当前操作：写入 无直接字段写入；返回 this.isEmpty()?(target.makeEmpty(),target):(target.set(this.center,this.center),target.expandByScalar(this.radius),target)。
- `applyMatrix4(matrix)` [源码:7084](../../eyes/src/vendor/three/core.js#L7084)：Transforms this sphere with the given 4x4 transformation matrix. @param {Matrix4} matrix - The transformation matrix. @return {Sphere} A reference to this sphere.
- `translate(offset)` [源码:7093](../../eyes/src/vendor/three/core.js#L7093)：Translates the sphere's center by the given offset. @param {Vector3} offset - The offset. @return {Sphere} A reference to this sphere.
- `expandByPoint(point)` [源码:7096](../../eyes/src/vendor/three/core.js#L7096)：当前操作：写入 radius；返回 this.center.copy(point),this.radius=0,this、this。
- `union(sphere)` [源码:7107](../../eyes/src/vendor/three/core.js#L7107)：当前操作：写入 radius；返回 sphere.isEmpty()?this:this.isEmpty()?(this.copy(sphere),this):(!0===this.center.equals(sphere.center)?this.radius=Math.max(this.radius,sphere.radius):(ta.subVectors(sphere.center,this.center).setLength(sphere.radius),thi。
- `equals(sphere)` [源码:7116](../../eyes/src/vendor/three/core.js#L7116)：Returns ˋtrueˋ if this sphere is equal with the given one. @param {Sphere} sphere - The sphere to test for equality. @return {boolean} Whether this bounding sphere is equal with the given one.
- `clone()` [源码:7124](../../eyes/src/vendor/three/core.js#L7124)：Returns a new sphere with copied values from this instance. @return {Sphere} A clone of this instance.
- `toJSON()` [源码:7132](../../eyes/src/vendor/three/core.js#L7132)：Returns a serialized structure of the bounding sphere. @return {Object} Serialized structure with fields representing the object state.
- `fromJSON(json)` [源码:7144](../../eyes/src/vendor/three/core.js#L7144)：Returns a serialized structure of the bounding sphere. @param {Object} json - The serialized json to set the sphere from. @return {Sphere} A reference to this bounding sphere.

### `BufferGeometry`

A representation of mesh, line, or point geometry. Includes vertex positions, face indices, normals, colors, UVs, and custom attributes within buffers, reducing the cost of passing all this data to the GPU. ˋˋˋjs const geometry = new THREE.BufferGeometry(); // create a simple square shape. We duplicate the top left and bottom right // vertices because each vertex needs to appear once per triangle. const vertices = new Float32Array( [ -1.0, -1.0, 1.0, // v0 1.0, -1.0, 1.0, // v1 1.0, 1.0, 1.0, // v2 1.0, 1.0, 1.0, // v3 -1.0, 1.0, 1.0, // v4 -1.0, -1.0, 1.0 // v5 ] ); // itemSize = 3 because there are 3 values (components) per vertex geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) ); const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } ); const mesh = new THREE.Mesh( geometry, material ); ˋˋˋ @augments EventDispatcher。父类 `EventDispatcher`。

- `constructor()` [源码:7182](../../eyes/src/vendor/three/core.js#L7182)：当前操作：写入 _transformed、attributes、boundingBox、boundingSphere、drawRange、groups、index、indirect、indirectOffset、isBufferGeometry、morphAttributes、morphTargetsRelative、name、type、userData、uuid；返回 无显式返回。
- `getIndex()` [源码:7195](../../eyes/src/vendor/three/core.js#L7195)：Returns the index of this geometry. @return {?BufferAttribute} The index. Returns ˋnullˋ if no index is defined.
- `setIndex(index)` [源码:7199](../../eyes/src/vendor/three/core.js#L7199)：Array 输入从尾向前检查，任一值 >=65535 选 Uint32BufferAttribute，否则 Uint16，itemSize=1；注意阈值包含 65535。非 Array 输入直接作为 index（包括 null），不克隆现有 attribute。返回 this；内联的判宽函数对应官方 arrayNeedsUint32 的操作，不代表所有输入都验证为合法索引。
- `setIndirect(indirect, indirectOffset=0)` [源码:7212](../../eyes/src/vendor/three/core.js#L7212)：Sets the given indirect attribute to this geometry. @param {BufferAttribute} indirect - The attribute holding indirect draw calls. @param {number\|Array<number>} [indirectOffset=0] - The offset, in bytes, into the indirect drawing buffer where the value data begins. If an array is provided, multiple indirect draw calls will be made for each offset. @return {BufferGeometry} A reference to this instance.
- `getIndirect()` [源码:7220](../../eyes/src/vendor/three/core.js#L7220)：Returns the indirect attribute of this geometry. @return {?BufferAttribute} The indirect attribute. Returns ˋnullˋ if no indirect attribute is defined.
- `getAttribute(name)` [源码:7230](../../eyes/src/vendor/three/core.js#L7230)：Returns the buffer attribute for the given name. @param {string} name - The attribute name. @return {BufferAttribute\|InterleavedBufferAttribute\|undefined} The buffer attribute. Returns ˋundefinedˋ if not attribute has been found.
- `setAttribute(name, attribute)` [源码:7240](../../eyes/src/vendor/three/core.js#L7240)：Sets the given attribute for the given name. @param {string} name - The attribute name. @param {BufferAttribute\|InterleavedBufferAttribute} attribute - The attribute to set. @return {BufferGeometry} A reference to this instance.
- `deleteAttribute(name)` [源码:7249](../../eyes/src/vendor/three/core.js#L7249)：Deletes the attribute for the given name. @param {string} name - The attribute name to delete. @return {BufferGeometry} A reference to this instance.
- `hasAttribute(name)` [源码:7252](../../eyes/src/vendor/three/core.js#L7252)：当前操作：写入 无直接字段写入；返回 void 0!==this.attributes[name]。
- `addGroup(start, count, materialIndex=0)` [源码:7263](../../eyes/src/vendor/three/core.js#L7263)：Adds a group to this geometry. @param {number} start - The first element in this draw call. That is the first vertex for non-indexed geometry, otherwise the first triangle index. @param {number} count - Specifies how many vertices (or indices) are part of this group. @param {number} [materialIndex=0] - The material array index to use.
- `clearGroups()` [源码:7270](../../eyes/src/vendor/three/core.js#L7270)：当前操作：写入 groups；返回 无显式返回。
- `setDrawRange(start, count)` [源码:7280](../../eyes/src/vendor/three/core.js#L7280)：Sets the draw range for this geometry. @param {number} start - The first vertex for non-indexed geometry, otherwise the first triangle index. @param {number} count - For non-indexed BufferGeometry, ˋcountˋ is the number of vertices to render. For indexed BufferGeometry, ˋcountˋ is the number of indices to render.
- `applyMatrix4(matrix)` [源码:7283](../../eyes/src/vendor/three/core.js#L7283)：当前操作：写入 _transformed；返回 void 0!==tangent&&(tangent.transformDirection(matrix),tangent.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this._transformed=!0,this。
- `applyQuaternion(q)` [源码:7300](../../eyes/src/vendor/three/core.js#L7300)：Applies the rotation represented by the Quaternion to the geometry. @param {Quaternion} q - The Quaternion to apply. @return {BufferGeometry} A reference to this instance.
- `rotateX(angle)` [源码:7311](../../eyes/src/vendor/three/core.js#L7311)：Rotates the geometry about the X axis. This is typically done as a one time operation, and not during a loop. Use {@link Object3D#rotation} for typical real-time mesh rotation. @param {number} angle - The angle in radians. @return {BufferGeometry} A reference to this instance.
- `rotateY(angle)` [源码:7322](../../eyes/src/vendor/three/core.js#L7322)：Rotates the geometry about the Y axis. This is typically done as a one time operation, and not during a loop. Use {@link Object3D#rotation} for typical real-time mesh rotation. @param {number} angle - The angle in radians. @return {BufferGeometry} A reference to this instance.
- `rotateZ(angle)` [源码:7333](../../eyes/src/vendor/three/core.js#L7333)：Rotates the geometry about the Z axis. This is typically done as a one time operation, and not during a loop. Use {@link Object3D#rotation} for typical real-time mesh rotation. @param {number} angle - The angle in radians. @return {BufferGeometry} A reference to this instance.
- `translate(x, y, z)` [源码:7346](../../eyes/src/vendor/three/core.js#L7346)：Translates the geometry. This is typically done as a one time operation, and not during a loop. Use {@link Object3D#position} for typical real-time mesh rotation. @param {number} x - The x offset. @param {number} y - The y offset. @param {number} z - The z offset. @return {BufferGeometry} A reference to this instance.
- `scale(x, y, z)` [源码:7359](../../eyes/src/vendor/three/core.js#L7359)：Scales the geometry. This is typically done as a one time operation, and not during a loop. Use {@link Object3D#scale} for typical real-time mesh rotation. @param {number} x - The x scale. @param {number} y - The y scale. @param {number} z - The z scale. @return {BufferGeometry} A reference to this instance.
- `lookAt(vector)` [源码:7370](../../eyes/src/vendor/three/core.js#L7370)：Rotates the geometry to face a point in 3D space. This is typically done as a one time operation, and not during a loop. Use {@link Object3D#lookAt} for typical real-time mesh rotation. @param {Vector3} vector - The target point. @return {BufferGeometry} A reference to this instance.
- `center()` [源码:7378](../../eyes/src/vendor/three/core.js#L7378)：Center the geometry based on its bounding box. @return {BufferGeometry} A reference to this instance.
- `setFromPoints(points)` [源码:7381](../../eyes/src/vendor/three/core.js#L7381)：当前操作：写入 无直接字段写入；返回 this。
- `computeBoundingBox()` [源码:7400](../../eyes/src/vendor/three/core.js#L7400)：当前操作：写入 boundingBox；返回 error("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new Vector3(-1/0,-1/0,-1/0),new Vector3(1/0,1/0,1/0))。
- `computeBoundingSphere()` [源码:7413](../../eyes/src/vendor/three/core.js#L7413)：当前操作：写入 boundingSphere、boundingSphere.radius；返回 error("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new Vector3(),1/0)。
- `computeTangents()` [源码:7436](../../eyes/src/vendor/three/core.js#L7436)：缺少 index/position/normal/uv 时记录 error 并退出。新建或复用 count 相符的四分量 tangent。生成值写 attribute，返回 undefined。
- `computeVertexNormals()` [源码:7489](../../eyes/src/vendor/three/core.js#L7489)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `normalizeNormals()` [源码:7512](../../eyes/src/vendor/three/core.js#L7512)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toNonIndexed()` [源码:7517](../../eyes/src/vendor/three/core.js#L7517)：有 index 时新建 BufferGeometry，按 index 逐项展开所有 attributes 和 morphAttributes；交错属性从 data.stride+offset 取数据，保留原 typed-array 构造类型、itemSize、normalized。复制 morphTargetsRelative 和组范围，新缓冲独立持有数据；没有复制任意元数据。已非索引时警告并返回 this，而非克隆。
- `toJSON()` [源码:7557](../../eyes/src/vendor/three/core.js#L7557)：当前操作：写入 无直接字段写入；返回 data、null!==boundingSphere&&(data.data.boundingSphere=boundingSphere.toJSON()),data。
- `clone()` [源码:7605](../../eyes/src/vendor/three/core.js#L7605)：Returns a new geometry with copied values from this instance. @return {BufferGeometry} A clone of this instance.
- `copy(source)` [源码:7608](../../eyes/src/vendor/three/core.js#L7608)：当前操作：写入 _transformed、attributes、boundingBox、boundingSphere、drawRange.count、drawRange.start、groups、index、morphAttributes、morphAttributes[name]、morphTargetsRelative、name、userData；返回 null!==boundingSphere&&(this.boundingSphere=boundingSphere.clone()),this.drawRange.start=source.drawRange.start,this.drawRange.count=source.drawRange.count,this.userData=source.userData,this._transformed=source._transfor。
- `dispose()` [源码:7637](../../eyes/src/vendor/three/core.js#L7637)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `InterleavedBuffer`

"Interleaved" means that multiple attributes, possibly of different types, (e.g., position, normal, uv, color) are packed into a single array buffer. An introduction into interleaved arrays can be found here: [Interleaved array basics](https://blog.tojicode.com/2011/05/interleaved-array-basics.html)。父类 `无`。

- `constructor(array, stride)` [源码:7650](../../eyes/src/vendor/three/core.js#L7650)：当前操作：写入 array、count、isInterleavedBuffer、stride、updateRanges、usage、uuid、version；返回 无显式返回。
- `onUploadCallback()` [源码:7653](../../eyes/src/vendor/three/core.js#L7653)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `set needsUpdate(value)` [源码:7654](../../eyes/src/vendor/three/core.js#L7654)：当前操作：写入 version；返回 无显式返回。
- `setUsage(value)` [源码:7663](../../eyes/src/vendor/three/core.js#L7663)：Sets the usage of this interleaved buffer. @param {(StaticDrawUsage\|DynamicDrawUsage\|StreamDrawUsage\|StaticReadUsage\|DynamicReadUsage\|StreamReadUsage\|StaticCopyUsage\|DynamicCopyUsage\|StreamCopyUsage)} value - The usage to set. @return {InterleavedBuffer} A reference to this interleaved buffer.
- `addUpdateRange(start, count)` [源码:7672](../../eyes/src/vendor/three/core.js#L7672)：Adds a range of data in the data array to be updated on the GPU. @param {number} start - Position at which to start update. @param {number} count - The number of components to update.
- `clearUpdateRanges()` [源码:7678](../../eyes/src/vendor/three/core.js#L7678)：当前操作：写入 updateRanges.length；返回 无显式返回。
- `copy(source)` [源码:7687](../../eyes/src/vendor/three/core.js#L7687)：Copies the values of the given interleaved buffer to this instance. @param {InterleavedBuffer} source - The interleaved buffer to copy. @return {InterleavedBuffer} A reference to this instance.
- `copyAt(index1, interleavedBuffer, index2)` [源码:7690](../../eyes/src/vendor/three/core.js#L7690)：当前操作：写入 array[index1+i]；返回 this。
- `set(value, offset=0)` [源码:7702](../../eyes/src/vendor/three/core.js#L7702)：Sets the given array data in the interleaved buffer. @param {(TypedArray\|Array)} value - The array data to set. @param {number} [offset=0] - The offset in this interleaved buffer's array. @return {InterleavedBuffer} A reference to this instance.
- `clone(data)` [源码:7705](../../eyes/src/vendor/three/core.js#L7705)：当前操作：写入 array.buffer._uuid；返回 ib.setUsage(this.usage),ib。
- `onUpload(callback)` [源码:7719](../../eyes/src/vendor/three/core.js#L7719)：Sets the given callback function that is executed after the Renderer has transferred the array data to the GPU. Can be used to perform clean-up operations after the upload when data are not needed anymore on the CPU side. @param {Function} callback - The ˋonUpload()ˋ callback. @return {InterleavedBuffer} A reference to this instance.
- `toJSON(data)` [源码:7722](../../eyes/src/vendor/three/core.js#L7722)：当前操作：写入 array.buffer._uuid；返回 void 0===data.arrayBuffers&&(data.arrayBuffers={}),void 0===this.array.buffer._uuid&&(this.array.buffer._uuid=generateUUID()),void 0===data.arrayBuffers[this.array.buffer._uuid]&&(data.arrayBuffers[this.array.buffer._uui。

### `InterleavedBufferAttribute`

An alternative version of a buffer attribute with interleaved data. Interleaved attributes share a common interleaved data storage ({@link InterleavedBuffer}) and refer with different offsets into the buffer.。父类 `无`。

- `constructor(interleavedBuffer, itemSize, offset, normalized=!1)` [源码:7738](../../eyes/src/vendor/three/core.js#L7738)：当前操作：写入 data、isInterleavedBufferAttribute、itemSize、name、normalized、offset；返回 无显式返回。
- `get count()` [源码:7741](../../eyes/src/vendor/three/core.js#L7741)：当前操作：写入 无直接字段写入；返回 this.data.count。
- `get array()` [源码:7744](../../eyes/src/vendor/three/core.js#L7744)：当前操作：写入 无直接字段写入；返回 this.data.array。
- `set needsUpdate(value)` [源码:7755](../../eyes/src/vendor/three/core.js#L7755)：Flag to indicate that this attribute has changed and should be re-sent to the GPU. Set this to ˋtrueˋ when you modify the value of the array. @type {number} @default false @param {boolean} value
- `applyMatrix4(m)` [源码:7765](../../eyes/src/vendor/three/core.js#L7765)：Applies the given 4x4 matrix to the given attribute. Only works with item size ˋ3ˋ. @param {Matrix4} m - The matrix to apply. @return {InterleavedBufferAttribute} A reference to this instance.
- `applyNormalMatrix(m)` [源码:7776](../../eyes/src/vendor/three/core.js#L7776)：Applies the given 3x3 normal matrix to the given attribute. Only works with item size ˋ3ˋ. @param {Matrix3} m - The normal matrix to apply. @return {InterleavedBufferAttribute} A reference to this instance.
- `transformDirection(m)` [源码:7787](../../eyes/src/vendor/three/core.js#L7787)：Applies the given 4x4 matrix to the given attribute. Only works with item size ˋ3ˋ and with direction vectors. @param {Matrix4} m - The matrix to apply. @return {InterleavedBufferAttribute} A reference to this instance.
- `getComponent(index, component)` [源码:7798](../../eyes/src/vendor/three/core.js#L7798)：Returns the given component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} component - The component index. @return {number} The returned value.
- `setComponent(index, component, value)` [源码:7810](../../eyes/src/vendor/three/core.js#L7810)：Sets the given value to the given component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} component - The component index. @param {number} value - The value to set. @return {InterleavedBufferAttribute} A reference to this instance.
- `setX(index, x)` [源码:7820](../../eyes/src/vendor/three/core.js#L7820)：Sets the x component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} x - The value to set. @return {InterleavedBufferAttribute} A reference to this instance.
- `setY(index, y)` [源码:7830](../../eyes/src/vendor/three/core.js#L7830)：Sets the y component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} y - The value to set. @return {InterleavedBufferAttribute} A reference to this instance.
- `setZ(index, z)` [源码:7840](../../eyes/src/vendor/three/core.js#L7840)：Sets the z component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} z - The value to set. @return {InterleavedBufferAttribute} A reference to this instance.
- `setW(index, w)` [源码:7850](../../eyes/src/vendor/three/core.js#L7850)：Sets the w component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} w - The value to set. @return {InterleavedBufferAttribute} A reference to this instance.
- `getX(index)` [源码:7859](../../eyes/src/vendor/three/core.js#L7859)：Returns the x component of the vector at the given index. @param {number} index - The index into the buffer attribute. @return {number} The x component.
- `getY(index)` [源码:7869](../../eyes/src/vendor/three/core.js#L7869)：Returns the y component of the vector at the given index. @param {number} index - The index into the buffer attribute. @return {number} The y component.
- `getZ(index)` [源码:7879](../../eyes/src/vendor/three/core.js#L7879)：Returns the z component of the vector at the given index. @param {number} index - The index into the buffer attribute. @return {number} The z component.
- `getW(index)` [源码:7889](../../eyes/src/vendor/three/core.js#L7889)：Returns the w component of the vector at the given index. @param {number} index - The index into the buffer attribute. @return {number} The w component.
- `setXY(index, x, y)` [源码:7901](../../eyes/src/vendor/three/core.js#L7901)：Sets the x and y component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} x - The value for the x component to set. @param {number} y - The value for the y component to set. @return {InterleavedBufferAttribute} A reference to this instance.
- `setXYZ(index, x, y, z)` [源码:7913](../../eyes/src/vendor/three/core.js#L7913)：Sets the x, y and z component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} x - The value for the x component to set. @param {number} y - The value for the y component to set. @param {number} z - The value for the z component to set. @return {InterleavedBufferAttribute} A reference to this instance.
- `setXYZW(index, x, y, z, w)` [源码:7926](../../eyes/src/vendor/three/core.js#L7926)：Sets the x, y, z and w component of the vector at the given index. @param {number} index - The index into the buffer attribute. @param {number} x - The value for the x component to set. @param {number} y - The value for the y component to set. @param {number} z - The value for the z component to set. @param {number} w - The value for the w component to set. @return {InterleavedBufferAttribute} A reference to this instance.
- `clone(data)` [源码:7929](../../eyes/src/vendor/three/core.js#L7929)：当前操作：写入 无直接字段写入；返回 new BufferAttribute(new this.array.constructor(array),this.itemSize,this.normalized)、void 0===data.interleavedBuffers&&(data.interleavedBuffers={}),void 0===data.interleavedBuffers[this.data.uuid]&&(data.interleavedBuffers[this.data.uuid]=this.data.clone(data)),new InterleavedBufferAttribute(data.interle。
- `toJSON(data)` [源码:7941](../../eyes/src/vendor/three/core.js#L7941)：当前操作：写入 无直接字段写入；返回 {itemSize:this.itemSize,type:this.array.constructor.name,array:array,normalized:this.normalized}、void 0===data.interleavedBuffers&&(data.interleavedBuffers={}),void 0===data.interleavedBuffers[this.data.uuid]&&(data.interleavedBuffers[this.data.uuid]=this.data.toJSON(data)),{isInterleavedBufferAttribute:!0,itemSize:。

### `Material`

Abstract base class for materials. Materials define the appearance of renderable 3D objects. @abstract @augments EventDispatcher。父类 `EventDispatcher`。

- `constructor()` [源码:7976](../../eyes/src/vendor/three/core.js#L7976)：当前操作：写入 _alphaTest、allowOverride、alphaHash、alphaToCoverage、blendAlpha、blendColor、blendDst、blendDstAlpha、blendEquation、blendEquationAlpha、blendSrc、blendSrcAlpha、blending、clipIntersection、clipShadows、clippingPlanes、colorWrite、depthFunc、depthTest、depthWrite、dithering、forceSinglePass、isMaterial、name、opacity、polygonOffset、polygonOffsetFactor、polygonOffsetUnits、precision、premultipliedAlpha、shadowSide、side、stencilFail、stencilFunc、stencilFuncMask、stencilRef、stencilWrite、stencilWriteMask、stencilZFail、stencilZPass、toneMapped、transparent、type、userData、uuid、version、vertexColors、visible；返回 无显式返回。
- `get alphaTest()` [源码:7981](../../eyes/src/vendor/three/core.js#L7981)：当前操作：写入 无直接字段写入；返回 this._alphaTest。
- `set alphaTest(value)` [源码:7984](../../eyes/src/vendor/three/core.js#L7984)：当前操作：写入 _alphaTest、version；返回 无显式返回。
- `onBeforeRender()` [源码:7999](../../eyes/src/vendor/three/core.js#L7999)：An optional callback that is executed immediately before the material is used to render a 3D object. This method can only be used when rendering with {@link WebGLRenderer}. @param {WebGLRenderer} renderer - The renderer. @param {Scene} scene - The scene. @param {Camera} camera - The camera that is used to render the scene. @param {BufferGeometry} geometry - The 3D object's geometry. @param {Object3D} object - The 3D object. @param {Object} group - The geometry group data.
- `onBeforeCompile()` [源码:8012](../../eyes/src/vendor/three/core.js#L8012)：An optional callback that is executed immediately before the shader program is compiled. This function is called with the shader source code as a parameter. Useful for the modification of built-in materials. This method can only be used when rendering with {@link WebGLRenderer}. The recommended approach when customizing materials is to use ˋWebGPURendererˋ with the new Node Material system and [TSL](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language). @param {{vertexShader:string,fragmentShader:string,uniforms:Object}} shaderobject - The object holds the uniforms and the vertex and fragment shader source. @param {WebGLRenderer} renderer - A reference to the renderer.
- `customProgramCacheKey()` [源码:8022](../../eyes/src/vendor/three/core.js#L8022)：In case {@link Material#onBeforeCompile} is used, this callback can be used to identify values of settings used in ˋonBeforeCompile()ˋ, so three.js can reuse a cached shader or recompile the shader for this material as needed. This method can only be used when rendering with {@link WebGLRenderer}. @return {string} The custom program cache key.
- `setValues(e)` [源码:8026](../../eyes/src/vendor/three/core.js#L8026)：undefined 输入直接结束；逐属性跳过 undefined/未知属性并警告。已有 Color 调 set，已有同类型 Vector2/Euler/Vector3 调 copy，否则替换引用。与 Texture.setValues 不同，Color 可以接受数字或字符串值，也支持 Euler；不自动深拷贝纹理，不统一置 needsUpdate。
- `toJSON(meta)` [源码:8037](../../eyes/src/vendor/three/core.js#L8037)：当前操作：写入 无直接字段写入；返回 data。
- `fromJSON(json, textures)` [源码:8065](../../eyes/src/vendor/three/core.js#L8065)：当前操作：写入 allowOverride、alphaHash、alphaMap、alphaTest、alphaToCoverage、anisotropy、anisotropyMap、anisotropyRotation、aoMap、aoMapIntensity、attenuationDistance、blendAlpha、blendDst、blendDstAlpha、blendEquation、blendEquationAlpha、blendSrc、blendSrcAlpha、blending、bumpMap、bumpScale、clearcoat、clearcoatMap、clearcoatNormalMap、clearcoatNormalScale、clearcoatRoughness、clearcoatRoughnessMap、colorWrite、combine、dashSize、depthFunc、depthTest、depthWrite、dispersion、displacementBias、displacementMap、displacementScale、dithering、emissiveIntensity、emissiveMap、envMap、envMapIntensity、flatShading、fog、forceSinglePass、gapSize、gradientMap、iridescence、iridescenceIOR、iridescenceMap、iridescenceThicknessMap、iridescenceThicknessRange、lightMap、lightMapIntensity、linewidth、map、matcap、metalness、metalnessMap、name、normalMap、normalMapType、normalScale、opacity、polygonOffset、polygonOffsetFactor、polygonOffsetUnits、premultipliedAlpha、reflectivity、refractionRatio、rotation、roughness、roughnessMap、scale、shadowSide、sheen、sheenColor、sheenColorMap、sheenRoughness、sheenRoughnessMap、shininess、side、size、sizeAttenuation、specularColorMap、specularIntensity、specularIntensityMap、specularMap、stencilFail、stencilFunc、stencilFuncMask、stencilRef、stencilWrite、stencilWriteMask、stencilZFail、stencilZPass、thickness、thicknessMap、toneMapped、transmission、transmissionMap、transparent、userData、uuid、vertexColors、visible、wireframe、wireframeLinecap、wireframeLinejoin、wireframeLinewidth；返回 void 0!==json.displacementMap&&(this.displacementMap=textures[json.displacementMap]\|\|null),void 0!==json.displacementScale&&(this.displacementScale=json.displacementScale),void 0!==json.displacementBias&&(this.displaceme。
- `clone()` [源码:8077](../../eyes/src/vendor/three/core.js#L8077)：Returns a new material with copied values from this instance. @return {Material} A clone of this instance.
- `copy(source)` [源码:8080](../../eyes/src/vendor/three/core.js#L8080)：当前操作：写入 allowOverride、alphaHash、alphaTest、alphaToCoverage、blendAlpha、blendDst、blendDstAlpha、blendEquation、blendEquationAlpha、blendSrc、blendSrcAlpha、blending、clipIntersection、clipShadows、clippingPlanes、colorWrite、depthFunc、depthTest、depthWrite、dithering、forceSinglePass、name、opacity、polygonOffset、polygonOffsetFactor、polygonOffsetUnits、precision、premultipliedAlpha、shadowSide、side、stencilFail、stencilFunc、stencilFuncMask、stencilRef、stencilWrite、stencilWriteMask、stencilZFail、stencilZPass、toneMapped、transparent、userData、vertexColors、visible；返回 this.clippingPlanes=dstPlanes,this.clipIntersection=source.clipIntersection,this.clipShadows=source.clipShadows,this.shadowSide=source.shadowSide,this.colorWrite=source.colorWrite,this.precision=source.precision,this.pol。
- `dispose()` [源码:8091](../../eyes/src/vendor/three/core.js#L8091)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `set needsUpdate(value)` [源码:8096](../../eyes/src/vendor/three/core.js#L8096)：当前操作：写入 version；返回 无显式返回。

### `SpriteMaterial`

A material for rendering instances of {@link Sprite}. ˋˋˋjs const map = new THREE.TextureLoader().load( 'textures/sprite.png' ); const material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } ); const sprite = new THREE.Sprite( material ); sprite.scale.set(200, 200, 1) scene.add( sprite ); ˋˋˋ @augments Material。父类 `Material`。

- `constructor(parameters)` [源码:8115](../../eyes/src/vendor/three/core.js#L8115)：当前操作：写入 alphaMap、color、fog、isSpriteMaterial、map、rotation、sizeAttenuation、transparent、type；返回 无显式返回。
- `copy(source)` [源码:8118](../../eyes/src/vendor/three/core.js#L8118)：当前操作：写入 alphaMap、fog、map、rotation、sizeAttenuation；返回 super.copy(source),this.color.copy(source.color),this.map=source.map,this.alphaMap=source.alphaMap,this.rotation=source.rotation,this.sizeAttenuation=source.sizeAttenuation,this.fog=source.fog,this。

### `Sprite`

始终朝向相机的二维精灵对象及射线求交。父类 `Object3D`。

- `constructor(material=new SpriteMaterial())` [源码:8135](../../eyes/src/vendor/three/core.js#L8135)：当前操作：写入 center、count、geometry、isSprite、material、type；返回 无显式返回。
- `raycast(e, t)` [源码:8145](../../eyes/src/vendor/three/core.js#L8145)：根据 raycaster.camera 的世界矩阵构建朝向相机的四边形，采用 matrixWorld 尺度、center 和 material.rotation。透视相机且 sizeAttenuation=false 时乘相机空间负 z 保持屏幕尺寸。camera=null 只记录错误后仍继续访问，不能说是安全返回。
- `copy(source, recursive)` [源码:8163](../../eyes/src/vendor/three/core.js#L8163)：当前操作：写入 material；返回 super.copy(source,recursive),void 0!==source.center&&this.center.copy(source.center),this.material=source.material,this。

### `LOD`

A component for providing a basic Level of Detail (LOD) mechanism. Every LOD level is associated with an object, and rendering can be switched between them at the distances specified. Typically you would create, say, three meshes, one for far away (low detail), one for mid range (medium detail) and one for close up (high detail). ˋˋˋjs const lod = new THREE.LOD(); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); //Create spheres with 3 levels of detail and create new LOD levels for them for( let i = 0; i < 3; i++ ) { const geometry = new THREE.IcosahedronGeometry( 10, 3 - i ); const mesh = new THREE.Mesh( geometry, material ); lod.addLevel( mesh, i * 75 ); } scene.add( lod ); ˋˋˋ @augments Object3D。父类 `Object3D`。

- `constructor()` [源码:8200](../../eyes/src/vendor/three/core.js#L8200)：当前操作：写入 _currentLevel、autoUpdate、isLOD、type；返回 无显式返回。
- `copy(source)` [源码:8208](../../eyes/src/vendor/three/core.js#L8208)：当前操作：写入 autoUpdate；返回 this.autoUpdate=source.autoUpdate,this。
- `addLevel(e, t=0, n=0)` [源码:8218](../../eyes/src/vendor/three/core.js#L8218)：distance 先取绝对值，再按 distance 升序插入 {distance,hysteresis,object}；同距离插在已有同距离后面。this.add(object) 建立父子关系，返回 this；未对 hysteresis 进行范围限制。
- `removeLevel(distance)` [源码:8229](../../eyes/src/vendor/three/core.js#L8229)：当前操作：写入 无直接字段写入；返回 this.remove(removedElements[0].object),!0、!1。
- `getCurrentLevel()` [源码:8242](../../eyes/src/vendor/three/core.js#L8242)：Returns the currently active LOD level index. @return {number} The current active LOD level index.
- `getObjectForDistance(distance)` [源码:8245](../../eyes/src/vendor/three/core.js#L8245)：当前操作：写入 无直接字段写入；返回 levels[i-1].object、null。
- `raycast(e, t)` [源码:8258](../../eyes/src/vendor/three/core.js#L8258)：有 level 时取 LOD 的世界位置，与射线原点计算距离，getObjectForDistance 选择对象后委派 raycast，向同一命中数组追加。不按相机 zoom 修正，此处与 update 的选级距离不同。
- `update(e)` [源码:8266](../../eyes/src/vendor/three/core.js#L8266)：超过一个 level 时，世界相机到 LOD 距离除 camera.zoom。首级先可见；按距离提升，原本可见的候选阈值减去 distance*hysteresis，减少跳变。0/1 级分支不改状态；不返回选中对象。
- `toJSON(meta)` [源码:8280](../../eyes/src/vendor/three/core.js#L8280)：当前操作：写入 无直接字段写入；返回 data。

### `Ray`

A ray that emits from an origin in a certain direction. The class is used by {@link Raycaster} to assist with raycasting. Raycasting is used for mouse picking (working out what objects in the 3D space the mouse is over) amongst other things.。父类 `无`。

- `constructor(origin=new Vector3(), direction=new Vector3(0,0,-1))` [源码:8315](../../eyes/src/vendor/three/core.js#L8315)：Constructs a new ray. @param {Vector3} [origin=(0,0,0)] - The origin of the ray. @param {Vector3} [direction=(0,0,-1)] - The (normalized) direction of the ray.
- `set(origin, direction)` [源码:8325](../../eyes/src/vendor/three/core.js#L8325)：Sets the ray's components by copying the given values. @param {Vector3} origin - The origin. @param {Vector3} direction - The direction. @return {Ray} A reference to this ray.
- `copy(ray)` [源码:8334](../../eyes/src/vendor/three/core.js#L8334)：Copies the values of the given ray to this instance. @param {Ray} ray - The ray to copy. @return {Ray} A reference to this ray.
- `at(t, target)` [源码:8344](../../eyes/src/vendor/three/core.js#L8344)：Returns a vector that is located at a given distance along this ray. @param {number} t - The distance along the ray to retrieve a position for. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} A position on the ray.
- `lookAt(v)` [源码:8353](../../eyes/src/vendor/three/core.js#L8353)：Adjusts the direction of the ray to point at the given vector in world space. @param {Vector3} v - The target position. @return {Ray} A reference to this ray.
- `recast(t)` [源码:8362](../../eyes/src/vendor/three/core.js#L8362)：Shift the origin of this ray along its direction by the given distance. @param {number} t - The distance along the ray to interpolate. @return {Ray} A reference to this ray.
- `closestPointToPoint(point, target)` [源码:8365](../../eyes/src/vendor/three/core.js#L8365)：当前操作：写入 无直接字段写入；返回 directionDistance<0?target.copy(this.origin):target.copy(this.origin).addScaledVector(this.direction,directionDistance)。
- `distanceToPoint(point)` [源码:8376](../../eyes/src/vendor/three/core.js#L8376)：Returns the distance of the closest approach between this ray and the given point. @param {Vector3} point - A point in 3D space to compute the distance to. @return {number} The distance.
- `distanceSqToPoint(point)` [源码:8379](../../eyes/src/vendor/three/core.js#L8379)：当前操作：写入 无直接字段写入；返回 directionDistance<0?this.origin.distanceToSquared(point):(_vector$7.copy(this.origin).addScaledVector(this.direction,directionDistance),_vector$7.distanceToSquared(point))。
- `distanceSqToSegment(v0, v1, optionalPointOnRay, optionalPointOnSegment)` [源码:8383](../../eyes/src/vendor/three/core.js#L8383)：当前操作：写入 无直接字段写入；返回 optionalPointOnRay&&optionalPointOnRay.copy(this.origin).addScaledVector(this.direction,s0),optionalPointOnSegment&&optionalPointOnSegment.copy(xa).addScaledVector(Ca,s1),sqrDist。
- `intersectSphere(sphere, target)` [源码:8404](../../eyes/src/vendor/three/core.js#L8404)：当前操作：写入 无直接字段写入；返回 null、t1<0?null:t0<0?this.at(t1,target):this.at(t0,target)。
- `intersectsSphere(sphere)` [源码:8415](../../eyes/src/vendor/three/core.js#L8415)：当前操作：写入 无直接字段写入；返回 !(sphere.radius<0)&&this.distanceSqToPoint(sphere.center)<=sphere.radius*sphere.radius。
- `distanceToPlane(plane)` [源码:8418](../../eyes/src/vendor/three/core.js#L8418)：当前操作：写入 无直接字段写入；返回 0===plane.distanceToPoint(this.origin)?0:null、t>=0?t:null。
- `intersectPlane(plane, target)` [源码:8424](../../eyes/src/vendor/three/core.js#L8424)：当前操作：写入 无直接字段写入；返回 null===t?null:this.at(t,target)。
- `intersectsPlane(e)` [源码:8429](../../eyes/src/vendor/three/core.js#L8429)：起点在平面上立即 true；否则 plane.normal·direction 与起点有符号距离异号才 true。平行且不共面返回 false，交点在反向也 false；只判断，不写目标点。
- `intersectBox(box, target)` [源码:8434](../../eyes/src/vendor/three/core.js#L8434)：当前操作：写入 无直接字段写入；返回 invdirx>=0?(tmin=(box.min.x-origin.x)*invdirx,tmax=(box.max.x-origin.x)*invdirx):(tmin=(box.max.x-origin.x)*invdirx,tmax=(box.min.x-origin.x)*invdirx),invdiry>=0?(tymin=(box.min.y-origin.y)*invdiry,tymax=(box.max.y-origi。
- `intersectsBox(box)` [源码:8442](../../eyes/src/vendor/three/core.js#L8442)：当前操作：写入 无直接字段写入；返回 null!==this.intersectBox(box,_vector$7)。
- `intersectTriangle(e, t, n, r, i)` [源码:8446](../../eyes/src/vendor/three/core.js#L8446)：边向量叉积得法线，direction 点积判平行及背面剔除。通过两个带符号三重积检查重心坐标非负、和不超过分母，再检查射线参数非负。复用共享临时量，不把退化三角形当命中。
- `applyMatrix4(matrix4)` [源码:8472](../../eyes/src/vendor/three/core.js#L8472)：Transforms this ray with the given 4x4 transformation matrix. @param {Matrix4} matrix4 - The transformation matrix. @return {Ray} A reference to this ray.
- `equals(ray)` [源码:8481](../../eyes/src/vendor/three/core.js#L8481)：Returns ˋtrueˋ if this ray is equal with the given one. @param {Ray} ray - The ray to test for equality. @return {boolean} Whether this ray is equal with the given one.
- `clone()` [源码:8489](../../eyes/src/vendor/three/core.js#L8489)：Returns a new ray with copied values from this instance. @return {Ray} A clone of this instance.

### `MeshBasicMaterial`

A material for drawing geometries in a simple shaded (flat or wireframe) way. This material is not affected by lights. @augments Material @demo scenes/material-browser.html#MeshBasicMaterial。父类 `Material`。

- `constructor(parameters)` [源码:8502](../../eyes/src/vendor/three/core.js#L8502)：当前操作：写入 alphaMap、aoMap、aoMapIntensity、color、combine、envMap、envMapRotation、fog、isMeshBasicMaterial、lightMap、lightMapIntensity、map、reflectivity、refractionRatio、specularMap、type、wireframe、wireframeLinecap、wireframeLinejoin、wireframeLinewidth；返回 无显式返回。
- `copy(source)` [源码:8505](../../eyes/src/vendor/three/core.js#L8505)：当前操作：写入 alphaMap、aoMap、aoMapIntensity、combine、envMap、fog、lightMap、lightMapIntensity、map、reflectivity、refractionRatio、specularMap、wireframe、wireframeLinecap、wireframeLinejoin、wireframeLinewidth；返回 super.copy(source),this.color.copy(source.color),this.map=source.map,this.lightMap=source.lightMap,this.lightMapIntensity=source.lightMapIntensity,this.aoMap=source.aoMap,this.aoMapIntensity=source.aoMapIntensity,this.sp。

### `Mesh`

三角网格场景对象；绑定几何材质并执行射线求交。父类 `Object3D`。

- `constructor(geometry=new BufferGeometry(), material=new MeshBasicMaterial())` [源码:8521](../../eyes/src/vendor/three/core.js#L8521)：当前操作：写入 count、geometry、isMesh、material、morphTargetDictionary、morphTargetInfluences、type；返回 无显式返回。
- `copy(source, recursive)` [源码:8524](../../eyes/src/vendor/three/core.js#L8524)：当前操作：写入 geometry、material、morphTargetDictionary、morphTargetInfluences；返回 super.copy(source,recursive),void 0!==source.morphTargetInfluences&&(this.morphTargetInfluences=source.morphTargetInfluences.slice()),void 0!==source.morphTargetDictionary&&(this.morphTargetDictionary=Object.assign({},so。
- `updateMorphTargets()` [源码:8528](../../eyes/src/vendor/three/core.js#L8528)：取 geometry.morphAttributes 的第一个键的数组，重建零权重 morphTargetInfluences 和 name→index 的 morphTargetDictionary；无名项用字符串索引，重名覆盖字典前项。没有 morph 数据时保持旧字段，未清空。Line/Points 的独立同名实现见各节。
- `getVertexPosition(index, target)` [源码:8542](../../eyes/src/vendor/three/core.js#L8542)：当前操作：写入 无直接字段写入；返回 target。
- `raycast(e, t)` [源码:8561](../../eyes/src/vendor/three/core.js#L8561)：material undefined 退出。必要时计算几何包围球，转世界空间；射线先从 near 处 recast，若起点不在球内再测球交点且限制剩余 far-near 范围。球测试是粗筛，三角形命中还有世界 near/far 过滤。
- `_computeIntersections(e, t, n)` [源码:8574](../../eyes/src/vendor/three/core.js#L8574)：遍历 indexed 或 non-indexed 三角形，步长 3；多材质模式必须按 groups 选 materialIndex，并与 drawRange 和实际 attribute/index count 取交。每次调用 Ga 获取实际顶点（包含 getVertexPosition 的变形语义），成功写 faceIndex=floor(绘制位置/3)，组模式补 face.materialIndex 并追加。单材质不依赖 groups；本地把索引三项读取内联，不能由局部数量推断缺少逻辑。

### `SkinnedMesh`

A mesh that has a {@link Skeleton} that can then be used to animate the vertices of the geometry with skinning/skeleton animation. Next to a valid skeleton, the skinned mesh requires skin indices and weights as buffer attributes in its geometry. These attribute define which bones affect a single vertex to a certain extend. Typically skinned meshes are not created manually but loaders like {@link GLTFLoader} or {@link FBXLoader } import respective models. @augments Mesh @demo scenes/bones-browser.html。父类 `Mesh`。

- `constructor(geometry, material)` [源码:8662](../../eyes/src/vendor/three/core.js#L8662)：当前操作：写入 bindMatrix、bindMatrixInverse、bindMode、boundingBox、boundingSphere、isSkinnedMesh、type；返回 无显式返回。
- `computeBoundingBox()` [源码:8665](../../eyes/src/vendor/three/core.js#L8665)：当前操作：写入 boundingBox；返回 无显式返回。
- `computeBoundingSphere()` [源码:8671](../../eyes/src/vendor/three/core.js#L8671)：当前操作：写入 boundingSphere；返回 无显式返回。
- `copy(source, recursive)` [源码:8677](../../eyes/src/vendor/three/core.js#L8677)：当前操作：写入 bindMode、boundingBox、boundingSphere、skeleton；返回 super.copy(source,recursive),this.bindMode=source.bindMode,this.bindMatrix.copy(source.bindMatrix),this.bindMatrixInverse.copy(source.bindMatrixInverse),this.skeleton=source.skeleton,null!==source.boundingBox&&(this.boun。
- `raycast(e, t)` [源码:8681](../../eyes/src/vendor/three/core.js#L8681)：使用自身 boundingSphere/boundingBox 而非 geometry 的静态边界，必要时 computeBoundingSphere（反映皮肤变形）。球转世界空间粗筛后，逆世界矩阵得到局部射线，盒若存在再筛，再调用继承的 _computeIntersections。最终 getVertexPosition 负责蒙皮顶点；此处不主动计算 boundingBox，不承诺随每帧骨骼变化重建边界。
- `getVertexPosition(index, target)` [源码:8686](../../eyes/src/vendor/three/core.js#L8686)：当前操作：写入 无直接字段写入；返回 super.getVertexPosition(index,target),this.applyBoneTransform(index,target),target。
- `bind(skeleton, bindMatrix)` [源码:8689](../../eyes/src/vendor/three/core.js#L8689)：当前操作：写入 skeleton；返回 无显式返回。
- `pose()` [源码:8692](../../eyes/src/vendor/three/core.js#L8692)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `normalizeSkinWeights()` [源码:8695](../../eyes/src/vendor/three/core.js#L8695)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `updateMatrixWorld(force)` [源码:8704](../../eyes/src/vendor/three/core.js#L8704)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `applyBoneTransform(index, target)` [源码:8707](../../eyes/src/vendor/three/core.js#L8707)：当前操作：写入 无直接字段写入；返回 target.isVector4&&(target.w=Xa.w),target.applyMatrix4(this.bindMatrixInverse)。

### `Bone`

骨架层级中的局部变换节点。父类 `Object3D`。

- `constructor()` [源码:8722](../../eyes/src/vendor/three/core.js#L8722)：当前操作：写入 isBone、type；返回 无显式返回。

### `DataTexture`

Creates a texture directly from raw buffer data. The interpretation of the data depends on type and format: If the type is ˋUnsignedByteTypeˋ, a ˋUint8Arrayˋ will be useful for addressing the texel data. If the format is ˋRGBAFormatˋ, data needs four values for one texel; Red, Green, Blue and Alpha (typically the opacity). @augments Texture。父类 `Texture`。

- `constructor(data=null, width=1, height=1, format, type, mapping, wrapS, wrapT, magFilter=NearestFilter, minFilter=NearestFilter, anisotropy, colorSpace)` [源码:8753](../../eyes/src/vendor/three/core.js#L8753)：Constructs a new data texture. @param {?TypedArray} [data=null] - The buffer data. @param {number} [width=1] - The width of the texture. @param {number} [height=1] - The height of the texture. @param {number} [format=RGBAFormat] - The texture format. @param {number} [type=UnsignedByteType] - The texture type. @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping. @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value. @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value. @param {number} [magFilter=NearestFilter] - The mag filter value. @param {number} [minFilter=NearestFilter] - The min filter value. @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value. @param {string} [colorSpace=NoColorSpace] - The color space.

### `Skeleton`

Class for representing the armatures in ˋthree.jsˋ. The skeleton is defined by a hierarchy of bones. ˋˋˋjs const bones = []; const shoulder = new THREE.Bone(); const elbow = new THREE.Bone(); const hand = new THREE.Bone(); shoulder.add( elbow ); elbow.add( hand ); bones.push( shoulder , elbow, hand); shoulder.position.y = -5; elbow.position.y = 0; hand.position.y = 5; const armSkeleton = new THREE.Skeleton( bones ); ˋˋˋ。父类 `无`。

- `constructor(bones=[], boneInverses=[])` [源码:8794](../../eyes/src/vendor/three/core.js#L8794)：Constructs a new skeleton. @param {Array<Bone>} [bones] - An array of bones. @param {Array<Matrix4>} [boneInverses] - An array of bone inverse matrices. If not provided, these matrices will be computed automatically via {@link Skeleton#calculateInverses}.
- `init()` [源码:8797](../../eyes/src/vendor/three/core.js#L8797)：当前操作：写入 boneInverses、boneMatrices；返回 无显式返回。
- `calculateInverses()` [源码:8805](../../eyes/src/vendor/three/core.js#L8805)：当前操作：写入 boneInverses.length；返回 无显式返回。
- `pose()` [源码:8812](../../eyes/src/vendor/three/core.js#L8812)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `update()` [源码:8822](../../eyes/src/vendor/three/core.js#L8822)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `clone()` [源码:8838](../../eyes/src/vendor/three/core.js#L8838)：Returns a new skeleton with copied values from this instance. @return {Skeleton} A clone of this instance.
- `computeBoneTexture()` [源码:8841](../../eyes/src/vendor/three/core.js#L8841)：当前操作：写入 boneMatrices、boneTexture；返回 boneTexture.needsUpdate=!0,this.boneMatrices=boneMatrices,this.boneTexture=boneTexture,this。
- `getBoneByName(name)` [源码:8849](../../eyes/src/vendor/three/core.js#L8849)：当前操作：写入 无直接字段写入；返回 bone。
- `dispose()` [源码:8855](../../eyes/src/vendor/three/core.js#L8855)：当前操作：写入 boneTexture；返回 无显式返回。
- `fromJSON(json, bones)` [源码:8858](../../eyes/src/vendor/three/core.js#L8858)：当前操作：写入 uuid；返回 this.init(),this。
- `toJSON()` [源码:8867](../../eyes/src/vendor/three/core.js#L8867)：当前操作：写入 无直接字段写入；返回 data。

### `InstancedBufferAttribute`

An instanced version of a buffer attribute. @augments BufferAttribute。父类 `BufferAttribute`。

- `constructor(array, itemSize, normalized, meshPerAttribute=1)` [源码:8903](../../eyes/src/vendor/three/core.js#L8903)：Constructs a new instanced buffer attribute. @param {TypedArray} array - The array holding the attribute data. @param {number} itemSize - The item size. @param {boolean} [normalized=false] - Whether the data are normalized or not. @param {number} [meshPerAttribute=1] - How often a value of this buffer attribute should be repeated.
- `copy(source)` [源码:8906](../../eyes/src/vendor/three/core.js#L8906)：当前操作：写入 meshPerAttribute；返回 super.copy(source),this.meshPerAttribute=source.meshPerAttribute,this。
- `toJSON()` [源码:8909](../../eyes/src/vendor/three/core.js#L8909)：当前操作：写入 无直接字段写入；返回 data.meshPerAttribute=this.meshPerAttribute,data.isInstancedBufferAttribute=!0,data。

### `InstancedMesh`

A special version of a mesh with instanced rendering support. Use this class if you have to render a large number of objects with the same geometry and material(s) but with different world transformations. The usage of 'InstancedMesh' will help you to reduce the number of draw calls and thus improve the overall rendering performance in your application. @augments Mesh。父类 `Mesh`。

- `constructor(geometry, material, count)` [源码:8931](../../eyes/src/vendor/three/core.js#L8931)：当前操作：写入 boundingBox、boundingSphere、count、instanceColor、instanceMatrix、isInstancedMesh、morphTexture；返回 无显式返回。
- `computeBoundingBox()` [源码:8935](../../eyes/src/vendor/three/core.js#L8935)：当前操作：写入 boundingBox；返回 无显式返回。
- `computeBoundingSphere()` [源码:8941](../../eyes/src/vendor/three/core.js#L8941)：当前操作：写入 boundingSphere；返回 无显式返回。
- `copy(source, recursive)` [源码:8947](../../eyes/src/vendor/three/core.js#L8947)：当前操作：写入 boundingBox、boundingSphere、count、instanceColor、morphTexture；返回 super.copy(source,recursive),this.instanceMatrix.copy(source.instanceMatrix),null!==source.morphTexture&&(this.morphTexture=source.morphTexture.clone()),null!==source.instanceColor&&(this.instanceColor=source.instanceCol。
- `getColorAt(index, color)` [源码:8950](../../eyes/src/vendor/three/core.js#L8950)：当前操作：写入 无直接字段写入；返回 null===this.instanceColor?color.setRGB(1,1,1):color.fromArray(this.instanceColor.array,3*index)。
- `getMatrixAt(index, matrix)` [源码:8953](../../eyes/src/vendor/three/core.js#L8953)：当前操作：写入 无直接字段写入；返回 matrix.fromArray(this.instanceMatrix.array,16*index)。
- `getMorphAt(e, t)` [源码:8957](../../eyes/src/vendor/three/core.js#L8957)：输入实例索引和带 morphTargetInfluences 的目标对象。从 morphTexture.source.data.data 读取一行；步幅为目标权重数+1，跳过该行第一项（基础 influence），覆盖目标数组。不创建数组、不返回 mesh、不检查索引与数组长度。
- `raycast(e, t)` [源码:8964](../../eyes/src/vendor/three/core.js#L8964)：共享临时 mesh 使用此 geometry/material。整体实例包围球世界粗筛后，逐实例读取矩阵，与 matrixWorld 相乘；委派临时 mesh.raycast。count 控制实例范围；整体球没更新会影响粗筛。
- `setColorAt(index, color)` [源码:8976](../../eyes/src/vendor/three/core.js#L8976)：当前操作：写入 instanceColor；返回 null===this.instanceColor&&(this.instanceColor=new InstancedBufferAttribute(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),color.toArray(this.instanceColor.array,3*index),this。
- `setMatrixAt(index, matrix)` [源码:8979](../../eyes/src/vendor/three/core.js#L8979)：当前操作：写入 无直接字段写入；返回 matrix.toArray(this.instanceMatrix.array,16*index),this。
- `setMorphAt(index, object)` [源码:8982](../../eyes/src/vendor/three/core.js#L8982)：当前操作：写入 morphTexture；返回 array[dataIndex]=morphBaseInfluence,array.set(objectInfluences,dataIndex+1),this。
- `updateMorphTargets()` [源码:8993](../../eyes/src/vendor/three/core.js#L8993)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `dispose()` [源码:8994](../../eyes/src/vendor/three/core.js#L8994)：当前操作：写入 morphTexture；返回 无显式返回。

### `Plane`

A two dimensional surface that extends infinitely in 3D space, represented in [Hessian normal form](http://mathworld.wolfram.com/HessianNormalForm.html) by a unit length normal vector and a constant.。父类 `无`。

- `constructor(normal=new Vector3(1,0,0), constant=0)` [源码:9015](../../eyes/src/vendor/three/core.js#L9015)：Constructs a new plane. @param {Vector3} [normal=(1,0,0)] - A unit length vector defining the normal of the plane. @param {number} [constant=0] - The signed distance from the origin to the plane.
- `set(normal, constant)` [源码:9025](../../eyes/src/vendor/three/core.js#L9025)：Sets the plane components by copying the given values. @param {Vector3} normal - The normal. @param {number} constant - The constant. @return {Plane} A reference to this plane.
- `setComponents(x, y, z, w)` [源码:9038](../../eyes/src/vendor/three/core.js#L9038)：Sets the plane components by defining ˋxˋ, ˋyˋ, ˋzˋ as the plane normal and ˋwˋ as the constant. @param {number} x - The value for the normal's x component. @param {number} y - The value for the normal's y component. @param {number} z - The value for the normal's z component. @param {number} w - The constant value. @return {Plane} A reference to this plane.
- `setFromNormalAndCoplanarPoint(normal, point)` [源码:9049](../../eyes/src/vendor/three/core.js#L9049)：Sets the plane from the given normal and coplanar point (that is a point that lies onto the plane). @param {Vector3} normal - The normal. @param {Vector3} point - A coplanar point. @return {Plane} A reference to this plane.
- `setFromCoplanarPoints(a, b, c)` [源码:9062](../../eyes/src/vendor/three/core.js#L9062)：Sets the plane from three coplanar points. The winding order is assumed to be counter-clockwise, and determines the direction of the plane normal. @param {Vector3} a - The first coplanar point. @param {Vector3} b - The second coplanar point. @param {Vector3} c - The third coplanar point. @return {Plane} A reference to this plane.
- `copy(plane)` [源码:9072](../../eyes/src/vendor/three/core.js#L9072)：Copies the values of the given plane to this instance. @param {Plane} plane - The plane to copy. @return {Plane} A reference to this plane.
- `normalize()` [源码:9075](../../eyes/src/vendor/three/core.js#L9075)：当前操作：写入 constant；返回 this.normal.multiplyScalar(inverseNormalLength),this.constant*=inverseNormalLength,this。
- `negate()` [源码:9084](../../eyes/src/vendor/three/core.js#L9084)：Negates both the plane normal and the constant. @return {Plane} A reference to this plane.
- `distanceToPoint(point)` [源码:9093](../../eyes/src/vendor/three/core.js#L9093)：Returns the signed distance from the given point to this plane. @param {Vector3} point - The point to compute the distance for. @return {number} The signed distance.
- `distanceToSphere(sphere)` [源码:9102](../../eyes/src/vendor/three/core.js#L9102)：Returns the signed distance from the given sphere to this plane. @param {Sphere} sphere - The sphere to compute the distance for. @return {number} The signed distance.
- `projectPoint(point, target)` [源码:9112](../../eyes/src/vendor/three/core.js#L9112)：Projects a the given point onto the plane. @param {Vector3} point - The point to project. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The projected point on the plane.
- `intersectLine(line, target, clampToLine=!0)` [源码:9115](../../eyes/src/vendor/three/core.js#L9115)：当前操作：写入 无直接字段写入；返回 0===this.distanceToPoint(line.start)?target.copy(line.start):null、!0===clampToLine&&(t<0\|\|t>1)?null:target.copy(line.start).addScaledVector(direction,t)。
- `intersectsLine(line)` [源码:9128](../../eyes/src/vendor/three/core.js#L9128)：Returns ˋtrueˋ if the given line segment intersects with (passes through) the plane. @param {Line3} line - The line to test. @return {boolean} Whether the given line segment intersects with the plane or not.
- `intersectsBox(box)` [源码:9139](../../eyes/src/vendor/three/core.js#L9139)：Returns ˋtrueˋ if the given bounding box intersects with the plane. @param {Box3} box - The bounding box to test. @return {boolean} Whether the given bounding box intersects with the plane or not.
- `intersectsSphere(sphere)` [源码:9148](../../eyes/src/vendor/three/core.js#L9148)：Returns ˋtrueˋ if the given bounding sphere intersects with the plane. @param {Sphere} sphere - The bounding sphere to test. @return {boolean} Whether the given bounding sphere intersects with the plane or not.
- `coplanarPoint(target)` [源码:9158](../../eyes/src/vendor/three/core.js#L9158)：Returns a coplanar vector to the plane, by calculating the projection of the normal at the origin onto the plane. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The coplanar point.
- `applyMatrix4(matrix, optionalNormalMatrix)` [源码:9173](../../eyes/src/vendor/three/core.js#L9173)：Apply a 4x4 matrix to the plane. The matrix must be an affine, homogeneous transform. The optional normal matrix can be pre-computed like so: ˋˋˋjs const optionalNormalMatrix = new THREE.Matrix3().getNormalMatrix( matrix ); ˋˋˋ @param {Matrix4} matrix - The transformation matrix. @param {Matrix4} [optionalNormalMatrix] - A pre-computed normal matrix. @return {Plane} A reference to this plane.
- `translate(offset)` [源码:9186](../../eyes/src/vendor/three/core.js#L9186)：Translates the plane by the distance defined by the given offset vector. Note that this only affects the plane constant and will not affect the normal vector. @param {Vector3} offset - The offset vector. @return {Plane} A reference to this plane.
- `equals(plane)` [源码:9195](../../eyes/src/vendor/three/core.js#L9195)：Returns ˋtrueˋ if this plane is equal with the given one. @param {Plane} plane - The plane to test for equality. @return {boolean} Whether this plane is equal with the given one.
- `clone()` [源码:9203](../../eyes/src/vendor/three/core.js#L9203)：Returns a new plane with copied values from this instance. @return {Plane} A clone of this instance.

### `Frustum`

Frustums are used to determine what is inside the camera's field of view. They help speed up the rendering process - objects which lie outside a camera's frustum can safely be excluded from rendering. This class is mainly intended for use internally by a renderer.。父类 `无`。

- `constructor(p0=new Plane(), p1=new Plane(), p2=new Plane(), p3=new Plane(), p4=new Plane(), p5=new Plane())` [源码:9228](../../eyes/src/vendor/three/core.js#L9228)：Constructs a new frustum. @param {Plane} [p0] - The first plane that encloses the frustum. @param {Plane} [p1] - The second plane that encloses the frustum. @param {Plane} [p2] - The third plane that encloses the frustum. @param {Plane} [p3] - The fourth plane that encloses the frustum. @param {Plane} [p4] - The fifth plane that encloses the frustum. @param {Plane} [p5] - The sixth plane that encloses the frustum.
- `set(p0, p1, p2, p3, p4, p5)` [源码:9242](../../eyes/src/vendor/three/core.js#L9242)：Sets the frustum planes by copying the given planes. @param {Plane} [p0] - The first plane that encloses the frustum. @param {Plane} [p1] - The second plane that encloses the frustum. @param {Plane} [p2] - The third plane that encloses the frustum. @param {Plane} [p3] - The fourth plane that encloses the frustum. @param {Plane} [p4] - The fifth plane that encloses the frustum. @param {Plane} [p5] - The sixth plane that encloses the frustum. @return {Frustum} A reference to this frustum.
- `copy(frustum)` [源码:9246](../../eyes/src/vendor/three/core.js#L9246)：当前操作：写入 无直接字段写入；返回 this。
- `setFromProjectionMatrix(e, t=WebGLCoordinateSystem, n=!1)` [源码:9252](../../eyes/src/vendor/three/core.js#L9252)：从组合投影矩阵的行加减提取左右上下四平面并 normalize。标准 far 用第4行-第3行；WebGL near 用第4行+第3行，WebGPU near 直接第3行；反向深度交换相应 near/far 组合。覆盖已有 planes，返回 this，不分配新视锥。
- `intersectsObject(object)` [源码:9277](../../eyes/src/vendor/three/core.js#L9277)：当前操作：写入 无直接字段写入；返回 this.intersectsSphere(ps)。
- `intersectsSprite(sprite)` [源码:9284](../../eyes/src/vendor/three/core.js#L9284)：当前操作：写入 无直接字段写入；返回 ps.radius=.7071067811865476+offset,ps.applyMatrix4(sprite.matrixWorld),this.intersectsSphere(ps)。
- `intersectsSphere(e)` [源码:9290](../../eyes/src/vendor/three/core.js#L9290)：逐个六平面检查 center 的有符号距离是否小于 -radius；任一在外即 false，否则 true。依赖法线已归一化，边界相切保留；这是保守视锥球相交判断，不是求交点。
- `intersectsBox(box)` [源码:9299](../../eyes/src/vendor/three/core.js#L9299)：当前操作：写入 无直接字段写入；返回 !1、!0。
- `containsPoint(point)` [源码:9307](../../eyes/src/vendor/three/core.js#L9307)：当前操作：写入 无直接字段写入；返回 !1、!0。
- `clone()` [源码:9317](../../eyes/src/vendor/three/core.js#L9317)：Returns a new frustum with copied values from this instance. @return {Frustum} A clone of this instance.

### `FrustumArray`

FrustumArray is used to determine if an object is visible in at least one camera from an array of cameras. This is particularly useful for multi-view renderers.。父类 `无`。

- `constructor()` [源码:9327](../../eyes/src/vendor/three/core.js#L9327)：当前操作：写入 _count、_frustums、coordinateSystem；返回 无显式返回。
- `setFromArrayCamera(cameraArray)` [源码:9330](../../eyes/src/vendor/three/core.js#L9330)：当前操作：写入 _count；返回 this._count=cameras.length,this。
- `intersectsObject(object)` [源码:9339](../../eyes/src/vendor/three/core.js#L9339)：当前操作：写入 无直接字段写入；返回 !0、!1。
- `intersectsSprite(sprite)` [源码:9344](../../eyes/src/vendor/three/core.js#L9344)：当前操作：写入 无直接字段写入；返回 !0、!1。
- `intersectsSphere(sphere)` [源码:9349](../../eyes/src/vendor/three/core.js#L9349)：当前操作：写入 无直接字段写入；返回 !0、!1。
- `intersectsBox(box)` [源码:9354](../../eyes/src/vendor/three/core.js#L9354)：当前操作：写入 无直接字段写入；返回 !0、!1。
- `containsPoint(point)` [源码:9359](../../eyes/src/vendor/three/core.js#L9359)：当前操作：写入 无直接字段写入；返回 !0、!1。
- `copy(source)` [源码:9364](../../eyes/src/vendor/three/core.js#L9364)：当前操作：写入 _count、coordinateSystem；返回 this._count=source._count,this。
- `clone()` [源码:9376](../../eyes/src/vendor/three/core.js#L9376)：Returns a new frustum array with copied values from this instance. @return {FrustumArray} A clone of this instance.

### `MultiDrawRenderList`

批量网格的多绘制调用计数和偏移列表。父类 `无`。

- `constructor()` [源码:9393](../../eyes/src/vendor/three/core.js#L9393)：当前操作：写入 index、list、pool；返回 无显式返回。
- `push(start, count, z, index)` [源码:9396](../../eyes/src/vendor/three/core.js#L9396)：当前操作：写入 index；返回 无显式返回。
- `reset()` [源码:9408](../../eyes/src/vendor/three/core.js#L9408)：当前操作：写入 index、list.length；返回 无显式返回。

### `BatchedMesh`

A special version of a mesh with multi draw batch rendering support. Use this class if you have to render a large number of objects with the same material but with different geometries or world transformations. The usage of ˋBatchedMeshˋ will help you to reduce the number of draw calls and thus improve the overall rendering performance in your application. ˋˋˋjs const box = new THREE.BoxGeometry( 1, 1, 1 ); const sphere = new THREE.SphereGeometry( 1, 12, 12 ); const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); // initialize and add geometries into the batched mesh const batchedMesh = new BatchedMesh( 10, 5000, 10000, material ); const boxGeometryId = batchedMesh.addGeometry( box ); const sphereGeometryId = batchedMesh.addGeometry( sphere ); // create instances of those geometries const boxInstancedId1 = batchedMesh.addInstance( boxGeometryId ); const boxInstancedId2 = batchedMesh.addInstance( boxGeometryId ); const sphereInstancedId1 = batchedMesh.addInstance( sphereGeometryId ); const sphereInstancedId2 = batchedMesh.addInstance( sphereGeometryId ); // position the geometries batchedMesh.setMatrixAt( boxInstancedId1, boxMatrix1 ); batchedMesh.setMatrixAt( boxInstancedId2, boxMatrix2 ); batchedMesh.setMatrixAt( sphereInstancedId1, sphereMatrix1 ); batchedMesh.setMatrixAt( sphereInstancedId2, sphereMatrix2 ); scene.add( batchedMesh ); ˋˋˋ @augments Mesh。父类 `Mesh`。

- `constructor(maxInstanceCount, maxVertexCount, maxIndexCount=2*maxVertexCount, material)` [源码:9480](../../eyes/src/vendor/three/core.js#L9480)：当前操作：写入 _availableGeometryIds、_availableInstanceIds、_colorsTexture、_geometryCount、_geometryInfo、_geometryInitialized、_indirectTexture、_instanceInfo、_matricesTexture、_maxIndexCount、_maxInstanceCount、_maxVertexCount、_multiDrawCount、_multiDrawCounts、_multiDrawStarts、_nextIndexStart、_nextVertexStart、_visibilityChanged、boundingBox、boundingSphere、customSort、isBatchedMesh、perObjectFrustumCulled、sortObjects；返回 无显式返回。
- `get maxInstanceCount()` [源码:9483](../../eyes/src/vendor/three/core.js#L9483)：当前操作：写入 无直接字段写入；返回 this._maxInstanceCount。
- `get instanceCount()` [源码:9486](../../eyes/src/vendor/three/core.js#L9486)：当前操作：写入 无直接字段写入；返回 this._instanceInfo.length-this._availableInstanceIds.length。
- `get unusedVertexCount()` [源码:9489](../../eyes/src/vendor/three/core.js#L9489)：当前操作：写入 无直接字段写入；返回 this._maxVertexCount-this._nextVertexStart。
- `get unusedIndexCount()` [源码:9492](../../eyes/src/vendor/three/core.js#L9492)：当前操作：写入 无直接字段写入；返回 this._maxIndexCount-this._nextIndexStart。
- `_initMatricesTexture()` [源码:9495](../../eyes/src/vendor/three/core.js#L9495)：当前操作：写入 _matricesTexture；返回 无显式返回。
- `_initIndirectTexture()` [源码:9502](../../eyes/src/vendor/three/core.js#L9502)：当前操作：写入 _indirectTexture；返回 无显式返回。
- `_initColorsTexture()` [源码:9509](../../eyes/src/vendor/three/core.js#L9509)：当前操作：写入 _colorsTexture；返回 无显式返回。
- `_initializeGeometry(reference)` [源码:9516](../../eyes/src/vendor/three/core.js#L9516)：当前操作：写入 _geometryInitialized；返回 无显式返回。
- `_validateGeometry(geometry)` [源码:9539](../../eyes/src/vendor/three/core.js#L9539)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `validateInstanceId(instanceId)` [源码:9549](../../eyes/src/vendor/three/core.js#L9549)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `validateGeometryId(geometryId)` [源码:9553](../../eyes/src/vendor/three/core.js#L9553)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setCustomSort(func)` [源码:9564](../../eyes/src/vendor/three/core.js#L9564)：Takes a sort a function that is run before render. The function takes a list of instances to sort and a camera. The objects in the list include a "z" field to perform a depth-ordered sort with. @param {Function} func - The custom sort function. @return {BatchedMesh} A reference to this batched mesh.
- `computeBoundingBox()` [源码:9567](../../eyes/src/vendor/three/core.js#L9567)：当前操作：写入 boundingBox；返回 无显式返回。
- `computeBoundingSphere()` [源码:9578](../../eyes/src/vendor/three/core.js#L9578)：当前操作：写入 boundingSphere；返回 无显式返回。
- `addInstance(e)` [源码:9590](../../eyes/src/vendor/three/core.js#L9590)：没有空闲 ID 且已达到 maxInstanceCount 时抛错。重用最小空闲 ID 或追加 instanceInfo，标记 visible/active 与 geometryIndex；矩阵纹理对应 16 项写 identity，颜色纹理若存在写默认颜色四项，并置纹理 needsUpdate、_visibilityChanged。返回实例 ID，不克隆独立 Mesh，也没有在此验证 geometry ID。
- `addGeometry(e, t=-1, n=-1)` [源码:9605](../../eyes/src/vendor/three/core.js#L9605)：初始化/验证兼容的布局。为顶点及可选 index 保存起点、实际数、保留容量与 null 边界缓存；-1 容量用输入 count，超总容量抛错。预留容量区别于实际 draw count，供以后替换几何体。
- `setGeometryAt(geometryId, geometry)` [源码:9627](../../eyes/src/vendor/three/core.js#L9627)：当前操作：写入 _visibilityChanged；返回 geometryInfo.start=hasIndex?geometryInfo.indexStart:geometryInfo.vertexStart,geometryInfo.count=hasIndex?geometryInfo.indexCount:geometryInfo.vertexCount,geometryInfo.boundingBox=null,null!==geometry.boundingBox&&(geomet。
- `deleteGeometry(geometryId)` [源码:9660](../../eyes/src/vendor/three/core.js#L9660)：当前操作：写入 _visibilityChanged；返回 this、geometryInfoList[geometryId].active=!1,this._availableGeometryIds.push(geometryId),this._visibilityChanged=!0,this。
- `deleteInstance(instanceId)` [源码:9673](../../eyes/src/vendor/three/core.js#L9673)：Deletes an existing instance from the batch using the given ID. @param {number} instanceId - The ID of the instance to remove from the batch. @return {BatchedMesh} A reference to this batched mesh.
- `optimize()` [源码:9677](../../eyes/src/vendor/three/core.js#L9677)：按 vertexStart 排列 geometry ID，跳过 inactive，向前压紧活跃保留区。index 搬移时修正基址差，copyWithin 搬移 index/每项 attribute，加入 updateRange 并标 needsUpdate，刷新每个范围 start 与最终 _next*Start/_visibilityChanged，返回 this。ID 与实例引用保持，改变的是存储位置；本地和官方都在 indexStart 改变分支内修正索引。
- `getBoundingBoxAt(geometryId, target)` [源码:9723](../../eyes/src/vendor/three/core.js#L9723)：当前操作：写入 无直接字段写入；返回 null、target.copy(geometryInfo.boundingBox),target。
- `getBoundingSphereAt(geometryId, target)` [源码:9739](../../eyes/src/vendor/three/core.js#L9739)：当前操作：写入 无直接字段写入；返回 null、target.copy(geometryInfo.boundingSphere),target。
- `setMatrixAt(instanceId, matrix)` [源码:9757](../../eyes/src/vendor/three/core.js#L9757)：当前操作：写入 无直接字段写入；返回 matrix.toArray(matricesArray,16*instanceId),matricesTexture.needsUpdate=!0,this。
- `getMatrixAt(instanceId, matrix)` [源码:9763](../../eyes/src/vendor/three/core.js#L9763)：当前操作：写入 无直接字段写入；返回 this.validateInstanceId(instanceId),matrix.fromArray(this._matricesTexture.image.data,16*instanceId)。
- `setColorAt(instanceId, color)` [源码:9766](../../eyes/src/vendor/three/core.js#L9766)：当前操作：写入 _colorsTexture.needsUpdate；返回 this.validateInstanceId(instanceId),null===this._colorsTexture&&this._initColorsTexture(),color.toArray(this._colorsTexture.image.data,4*instanceId),this._colorsTexture.needsUpdate=!0,this。
- `getColorAt(instanceId, color)` [源码:9769](../../eyes/src/vendor/three/core.js#L9769)：当前操作：写入 无直接字段写入；返回 this.validateInstanceId(instanceId),null===this._colorsTexture?color.isVector4?color.set(1,1,1,1):color.setRGB(1,1,1):color.fromArray(this._colorsTexture.image.data,4*instanceId)。
- `setVisibleAt(instanceId, visible)` [源码:9772](../../eyes/src/vendor/three/core.js#L9772)：当前操作：写入 _instanceInfo[instanceId].visible、_visibilityChanged；返回 this.validateInstanceId(instanceId),this._instanceInfo[instanceId].visible===visible\|\|(this._instanceInfo[instanceId].visible=visible,this._visibilityChanged=!0),this。
- `getVisibleAt(instanceId)` [源码:9781](../../eyes/src/vendor/three/core.js#L9781)：Returns the visibility state of the defined instance. @param {number} instanceId - The ID of an instance to get the visibility state of. @return {boolean} Whether the instance is visible or not.
- `setGeometryIdAt(instanceId, geometryId)` [源码:9791](../../eyes/src/vendor/three/core.js#L9791)：Sets the geometry ID of the instance at the given index. @param {number} instanceId - The ID of the instance to set the geometry ID of. @param {number} geometryId - The geometry ID to be use by the instance. @return {BatchedMesh} A reference to this batched mesh.
- `getGeometryIdAt(instanceId)` [源码:9800](../../eyes/src/vendor/three/core.js#L9800)：Returns the geometry ID of the defined instance. @param {number} instanceId - The ID of an instance to get the geometry ID of. @return {number} The instance's geometry ID.
- `getGeometryRangeAt(geometryId, target={})` [源码:9815](../../eyes/src/vendor/three/core.js#L9815)：Get the range representing the subset of triangles related to the attached geometry, indicating the starting offset and count, or ˋnullˋ if invalid. @param {number} geometryId - The id of the geometry to get the range of. @param {Object} [target] - The target object that is used to store the method's result. @return {{ vertexStart:number,vertexCount:number,reservedVertexCount:number, indexStart:number,indexCount:number,reservedIndexCount:number, start:number,count:number }} The result object with range data.
- `setInstanceCount(maxInstanceCount)` [源码:9821](../../eyes/src/vendor/three/core.js#L9821)：先移除末尾连续空闲 ID；若新上限仍覆盖不了有效 instanceInfo 则抛错。新建 multiDraw counts/starts 数组并复制内容，更新上限；dispose 旧 indirect/matrix/可选 color 纹理后重建并拷贝旧数据。资源所有权属于 BatchedMesh，不是只改 count 数字；返回 undefined。
- `setGeometrySize(maxVertexCount, maxIndexCount)` [源码:9835](../../eyes/src/vendor/three/core.js#L9835)：按所有 active 范围的 start+reservedCount 检查新顶点/index 容量，不能截掉已保留范围。dispose 旧 geometry，更新上限，已初始化则用旧布局重建 BufferGeometry，再复制 index 和 attributes。错误字符串顶点分支也插入 maxIndexCount，这是两份代码可见的现状，不替作者修正。
- `raycast(raycaster, intersects)` [源码:9847](../../eyes/src/vendor/three/core.js#L9847)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `copy(source)` [源码:9866](../../eyes/src/vendor/three/core.js#L9866)：当前操作：写入 _availableGeometryIds、_availableInstanceIds、_colorsTexture、_colorsTexture.image.data、_geometryCount、_geometryInfo、_geometryInitialized、_indirectTexture、_indirectTexture.image.data、_instanceInfo、_matricesTexture、_matricesTexture.image.data、_maxIndexCount、_maxInstanceCount、_maxVertexCount、_multiDrawCounts、_multiDrawStarts、_nextIndexStart、_nextVertexStart、boundingBox、boundingSphere、geometry、perObjectFrustumCulled、sortObjects；返回 super.copy(source),this.geometry=source.geometry.clone(),this.perObjectFrustumCulled=source.perObjectFrustumCulled,this.sortObjects=source.sortObjects,this.boundingBox=null!==source.boundingBox?source.boundingBox.clone()。
- `dispose()` [源码:9875](../../eyes/src/vendor/three/core.js#L9875)：当前操作：写入 _colorsTexture、_indirectTexture、_matricesTexture；返回 无显式返回。
- `onBeforeRender(renderer, scene, camera, geometry, material)` [源码:9878](../../eyes/src/vendor/three/core.js#L9878)：当前操作：写入 _multiDrawCount、_visibilityChanged；返回 void。
- `onBeforeShadow(renderer, object, camera, shadowCamera, geometry, depthMaterial)` [源码:9924](../../eyes/src/vendor/three/core.js#L9924)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `LineBasicMaterial`

A material for rendering line primitives. Materials define the appearance of renderable 3D objects. ˋˋˋjs const material = new THREE.LineBasicMaterial( { color: 0xffffff } ); ˋˋˋ @augments Material。父类 `Material`。

- `constructor(parameters)` [源码:9940](../../eyes/src/vendor/three/core.js#L9940)：当前操作：写入 color、fog、isLineBasicMaterial、linecap、linejoin、linewidth、map、type；返回 无显式返回。
- `copy(source)` [源码:9943](../../eyes/src/vendor/three/core.js#L9943)：当前操作：写入 fog、linecap、linejoin、linewidth、map；返回 super.copy(source),this.color.copy(source.color),this.map=source.map,this.linewidth=source.linewidth,this.linecap=source.linecap,this.linejoin=source.linejoin,this.fog=source.fog,this。

### `Line`

A continuous line. The line are rendered by connecting consecutive vertices with straight lines. ˋˋˋjs const material = new THREE.LineBasicMaterial( { color: 0x0000ff } ); const points = []; points.push( new THREE.Vector3( - 10, 0, 0 ) ); points.push( new THREE.Vector3( 0, 10, 0 ) ); points.push( new THREE.Vector3( 10, 0, 0 ) ); const geometry = new THREE.BufferGeometry().setFromPoints( points ); const line = new THREE.Line( geometry, material ); scene.add( line ); ˋˋˋ @augments Object3D。父类 `Object3D`。

- `constructor(geometry=new BufferGeometry(), material=new LineBasicMaterial())` [源码:9975](../../eyes/src/vendor/three/core.js#L9975)：当前操作：写入 geometry、isLine、material、morphTargetDictionary、morphTargetInfluences、type；返回 无显式返回。
- `copy(source, recursive)` [源码:9978](../../eyes/src/vendor/three/core.js#L9978)：当前操作：写入 geometry、material；返回 super.copy(source,recursive),this.material=Array.isArray(source.material)?source.material.slice():source.material,this.geometry=source.geometry,this。
- `computeLineDistances()` [源码:9981](../../eyes/src/vendor/three/core.js#L9981)：当前操作：写入 无直接字段写入；返回 this。
- `raycast(e, t)` [源码:9992](../../eyes/src/vendor/three/core.js#L9992)：世界包围球半径加 threshold 粗筛；逆世界射线，threshold 除本地 scale 三分量均值后平方。indexed/non-indexed 都与 drawRange 交集，LineSegments 步长 2、普通线步长 1，LineLoop 额外闭合最后与首点；Fs 求射线到线段距离并做世界 near/far。平均尺度是近似，不能宣称非均匀缩放下严格等距。
- `updateMorphTargets()` [源码:10033](../../eyes/src/vendor/three/core.js#L10033)：与 Mesh 的独立实现一样，按首个 morph 属性数组重建零 influences 和名称字典；无属性时不清旧值，重名末项胜出。这不是从 Mesh 继承的同一函数，已单独检查。

### `LineSegments`

独立线段对形式的线对象。父类 `Line`。

- `constructor(geometry, material)` [源码:10068](../../eyes/src/vendor/three/core.js#L10068)：当前操作：写入 isLineSegments、type；返回 无显式返回。
- `computeLineDistances()` [源码:10071](../../eyes/src/vendor/three/core.js#L10071)：当前操作：写入 无直接字段写入；返回 this。

### `LineLoop`

闭合首尾顶点的线对象。父类 `Line`。

- `constructor(geometry, material)` [源码:10083](../../eyes/src/vendor/three/core.js#L10083)：当前操作：写入 isLineLoop、type；返回 无显式返回。

### `PointsMaterial`

A material for rendering point primitives. Materials define the appearance of renderable 3D objects. ˋˋˋjs const vertices = []; for ( let i = 0; i < 10000; i ++ ) { const x = THREE.MathUtils.randFloatSpread( 2000 ); const y = THREE.MathUtils.randFloatSpread( 2000 ); const z = THREE.MathUtils.randFloatSpread( 2000 ); vertices.push( x, y, z ); } const geometry = new THREE.BufferGeometry(); geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) ); const material = new THREE.PointsMaterial( { color: 0x888888 } ); const points = new THREE.Points( geometry, material ); scene.add( points ); ˋˋˋ @augments Material。父类 `Material`。

- `constructor(parameters)` [源码:10113](../../eyes/src/vendor/three/core.js#L10113)：当前操作：写入 alphaMap、color、fog、isPointsMaterial、map、size、sizeAttenuation、type；返回 无显式返回。
- `copy(source)` [源码:10116](../../eyes/src/vendor/three/core.js#L10116)：当前操作：写入 alphaMap、fog、map、size、sizeAttenuation；返回 super.copy(source),this.color.copy(source.color),this.map=source.map,this.alphaMap=source.alphaMap,this.size=source.size,this.sizeAttenuation=source.sizeAttenuation,this.fog=source.fog,this。

### `Points`

A class for displaying points or point clouds. @augments Object3D。父类 `Object3D`。

- `constructor(geometry=new BufferGeometry(), material=new PointsMaterial())` [源码:10130](../../eyes/src/vendor/three/core.js#L10130)：当前操作：写入 geometry、isPoints、material、morphTargetDictionary、morphTargetInfluences、type；返回 无显式返回。
- `copy(source, recursive)` [源码:10133](../../eyes/src/vendor/three/core.js#L10133)：当前操作：写入 geometry、material；返回 super.copy(source,recursive),this.material=Array.isArray(source.material)?source.material.slice():source.material,this.geometry=source.geometry,this。
- `raycast(e, t)` [源码:10137](../../eyes/src/vendor/three/core.js#L10137)：世界包围球加 Points.threshold 粗筛，射线转局部、阈值除平均 scale。indexed 遍历索引值，non-indexed 遍历位置下标，均遵守 drawRange，调用 testPoint 测射线距离并追加含 index 的世界命中。不是把点看成带屏幕像素尺寸的 sprite。
- `updateMorphTargets()` [源码:10158](../../eyes/src/vendor/three/core.js#L10158)：单独实现首个 morph 属性驱动的 influences/dictionary 初始化；权重全 0，名称缺失用索引，空数据不主动删除旧状态。与 Line 和 Mesh 的三处都已阅读。

### `VideoTexture`

A texture for use with a video. ˋˋˋjs // assuming you have created a HTML video element with id="video" const video = document.getElementById( 'video' ); const texture = new THREE.VideoTexture( video ); ˋˋˋ Note: When using video textures with {@link WebGPURenderer}, {@link Texture#colorSpace} must be set to THREE.SRGBColorSpace. Note: After the initial use of a texture, its dimensions, format, and type cannot be changed. Instead, call {@link Texture#dispose} on the texture and instantiate a new one. @augments Texture。父类 `Texture`。

- `constructor(e, t, n, r, i=LinearFilter, a=LinearFilter, s, o, c)` [源码:10212](../../eyes/src/vendor/three/core.js#L10212)：向 Texture 传视频和 mapping/wrap/filter/type 参数，默认 min/mag 为 LinearFilter，禁止 mipmaps。若视频支持 requestVideoFrameCallback，注册自续回调，每帧置 needsUpdate 并保存最新 callback ID。只调度视频更新，未在构造时上传 GPU；回调闭包持有此纹理与视频。
- `clone()` [源码:10219](../../eyes/src/vendor/three/core.js#L10219)：当前操作：写入 无直接字段写入；返回 new this.constructor(this.image).copy(this)。
- `update()` [源码:10223](../../eyes/src/vendor/three/core.js#L10223)：仅当视频没有 requestVideoFrameCallback 且 readyState>=HAVE_CURRENT_DATA 时标 needsUpdate，避免有逐帧 API 时每个渲染帧重复更新。函数不返回帧或纹理，旧浏览器 fallback 没有比较时间戳。
- `dispose()` [源码:10227](../../eyes/src/vendor/three/core.js#L10227)：当前操作：写入 _requestVideoFrameCallbackId；返回 无显式返回。

### `VideoFrameTexture`

This class can be used as an alternative way to define video data. Instead of using an instance of ˋHTMLVideoElementˋ like with ˋVideoTextureˋ, ˋVideoFrameTextureˋ expects each frame is defined manually via {@link VideoFrameTexture#setFrame}. A typical use case for this module is when video frames are decoded with the WebCodecs API. ˋˋˋjs const texture = new THREE.VideoFrameTexture(); texture.setFrame( frame ); ˋˋˋ @augments VideoTexture。父类 `VideoTexture`。

- `constructor(mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy)` [源码:10257](../../eyes/src/vendor/three/core.js#L10257)：Constructs a new video frame texture. @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping. @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value. @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value. @param {number} [magFilter=LinearFilter] - The mag filter value. @param {number} [minFilter=LinearFilter] - The min filter value. @param {number} [format=RGBAFormat] - The texture format. @param {number} [type=UnsignedByteType] - The texture type. @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
- `update()` [源码:10260](../../eyes/src/vendor/three/core.js#L10260)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `clone()` [源码:10261](../../eyes/src/vendor/three/core.js#L10261)：当前操作：写入 无直接字段写入；返回 new this.constructor().copy(this)。
- `setFrame(frame)` [源码:10270](../../eyes/src/vendor/three/core.js#L10270)：Sets the current frame of the video. This will automatically update the texture so the data can be used for rendering. @param {VideoFrame} frame - The video frame.

### `FramebufferTexture`

This class can only be used in combination with ˋcopyFramebufferToTexture()ˋ methods of renderers. It extracts the contents of the current bound framebuffer and provides it as a texture for further usage. ˋˋˋjs const pixelRatio = window.devicePixelRatio; const textureSize = 128 * pixelRatio; const frameTexture = new FramebufferTexture( textureSize, textureSize ); // calculate start position for copying part of the frame data const vector = new Vector2(); vector.x = ( window.innerWidth * pixelRatio / 2 ) - ( textureSize / 2 ); vector.y = ( window.innerHeight * pixelRatio / 2 ) - ( textureSize / 2 ); renderer.render( scene, camera ); // copy part of the rendered frame into the framebuffer texture renderer.copyFramebufferToTexture( frameTexture, vector ); ˋˋˋ @augments Texture。父类 `Texture`。

- `constructor(width, height)` [源码:10305](../../eyes/src/vendor/three/core.js#L10305)：Constructs a new framebuffer texture. @param {number} [width] - The width of the texture. @param {number} [height] - The height of the texture.

### `CompressedTexture`

Creates a texture based on data in compressed form. These texture are usually loaded with {@link CompressedTextureLoader}. @augments Texture。父类 `Texture`。

- `constructor(mipmaps, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, colorSpace)` [源码:10337](../../eyes/src/vendor/three/core.js#L10337)：Constructs a new compressed texture. @param {Array<Object>} mipmaps - This array holds for all mipmaps (including the bases mip) the data and dimensions. @param {number} width - The width of the texture. @param {number} height - The height of the texture. @param {number} [format=RGBAFormat] - The texture format. @param {number} [type=UnsignedByteType] - The texture type. @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping. @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value. @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value. @param {number} [magFilter=LinearFilter] - The mag filter value. @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value. @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value. @param {string} [colorSpace=NoColorSpace] - The color space.

### `CompressedArrayTexture`

Creates a texture 2D array based on data in compressed form. These texture are usually loaded with {@link CompressedTextureLoader}. @augments CompressedTexture。父类 `CompressedTexture`。

- `constructor(mipmaps, width, height, depth, format, type)` [源码:10363](../../eyes/src/vendor/three/core.js#L10363)：Constructs a new compressed array texture. @param {Array<Object>} mipmaps - This array holds for all mipmaps (including the bases mip) the data and dimensions. @param {number} width - The width of the texture. @param {number} height - The height of the texture. @param {number} depth - The depth of the texture. @param {number} [format=RGBAFormat] - The min filter value. @param {number} [type=UnsignedByteType] - The min filter value.
- `addLayerUpdate(layerIndex)` [源码:10375](../../eyes/src/vendor/three/core.js#L10375)：Describes that a specific layer of the texture needs to be updated. Normally when {@link Texture#needsUpdate} is set to ˋtrueˋ, the entire compressed texture array is sent to the GPU. Marking specific layers will only transmit subsets of all mipmaps associated with a specific depth in the array which is often much more performant. @param {number} layerIndex - The layer index that should be updated.
- `clearLayerUpdates()` [源码:10378](../../eyes/src/vendor/three/core.js#L10378)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `CompressedCubeTexture`

CompressedCube 纹理数据布局、格式和上传生命周期。父类 `CompressedTexture`。

- `constructor(images, format, type)` [源码:10383](../../eyes/src/vendor/three/core.js#L10383)：当前操作：写入 image、isCompressedCubeTexture、isCubeTexture；返回 无显式返回。

### `CubeTexture`

Creates a cube texture made up of six images. ˋˋˋjs const loader = new THREE.CubeTextureLoader(); loader.setPath( 'textures/cube/pisa/' ); const textureCube = loader.load( [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ] ); const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } ); ˋˋˋ @augments Texture。父类 `Texture`。

- `constructor(images=[], mapping=CubeReflectionMapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace)` [源码:10418](../../eyes/src/vendor/three/core.js#L10418)：Constructs a new cube texture. @param {Array<Image>} [images=[]] - An array holding a image for each side of a cube. @param {number} [mapping=CubeReflectionMapping] - The texture mapping. @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value. @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value. @param {number} [magFilter=LinearFilter] - The mag filter value. @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value. @param {number} [format=RGBAFormat] - The texture format. @param {number} [type=UnsignedByteType] - The texture type. @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value. @param {string} [colorSpace=NoColorSpace] - The color space value.
- `get images()` [源码:10421](../../eyes/src/vendor/three/core.js#L10421)：当前操作：写入 无直接字段写入；返回 this.image。
- `set images(value)` [源码:10424](../../eyes/src/vendor/three/core.js#L10424)：当前操作：写入 image；返回 无显式返回。

### `CanvasTexture`

Creates a texture from a canvas element. This is almost the same as the base texture class, except that it sets {@link Texture#needsUpdate} to ˋtrueˋ immediately since a canvas can directly be used for rendering. @augments Texture。父类 `Texture`。

- `constructor(canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy)` [源码:10450](../../eyes/src/vendor/three/core.js#L10450)：Constructs a new texture. @param {HTMLCanvasElement} [canvas] - The HTML canvas element. @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping. @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value. @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value. @param {number} [magFilter=LinearFilter] - The mag filter value. @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value. @param {number} [format=RGBAFormat] - The texture format. @param {number} [type=UnsignedByteType] - The texture type. @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.

### `HTMLTexture`

HTML 纹理数据布局、格式和上传生命周期。父类 `Texture`。

- `constructor(element, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy)` [源码:10455](../../eyes/src/vendor/three/core.js#L10455)：当前操作：写入 generateMipmaps、isHTMLTexture、needsUpdate；返回 无显式返回。
- `dispose()` [源码:10462](../../eyes/src/vendor/three/core.js#L10462)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `DepthTexture`

This class can be used to automatically save the depth information of a rendering into a texture. @augments Texture。父类 `Texture`。

- `constructor(e, t, n=UnsignedIntType, r, i, a, s=NearestFilter, o=NearestFilter, c, l=DepthFormat, u=1)` [源码:10475](../../eyes/src/vendor/three/core.js#L10475)：输入 width,height、默认 UnsignedIntType、采样/映射参数及默认 DepthFormat、depth=1。只接受 DepthFormat/DepthStencilFormat，否则构造前抛错；image 是新 {width,height,depth} 描述，不是像素数组。flipY=false、generateMipmaps=false、compareFunction=null，默认最近采样，父类建立其余纹理状态。
- `copy(source)` [源码:10483](../../eyes/src/vendor/three/core.js#L10483)：当前操作：写入 compareFunction、source；返回 super.copy(source),this.source=new Source(Object.assign({},source.image)),this.compareFunction=source.compareFunction,this。
- `toJSON(meta)` [源码:10486](../../eyes/src/vendor/three/core.js#L10486)：当前操作：写入 无直接字段写入；返回 null!==this.compareFunction&&(data.compareFunction=this.compareFunction),data。

### `CubeDepthTexture`

This class can be used to automatically save the depth information of a cube rendering into a cube texture with depth format. Used for PointLight shadows. @augments DepthTexture。父类 `DepthTexture`。

- `constructor(size, type=UnsignedIntType, mapping=CubeReflectionMapping, wrapS, wrapT, magFilter=NearestFilter, minFilter=NearestFilter, anisotropy, format=DepthFormat)` [源码:10511](../../eyes/src/vendor/three/core.js#L10511)：Constructs a new cube depth texture. @param {number} size - The size (width and height) of each cube face. @param {number} [type=UnsignedIntType] - The texture type. @param {number} [mapping=CubeReflectionMapping] - The texture mapping. @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value. @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value. @param {number} [magFilter=NearestFilter] - The mag filter value. @param {number} [minFilter=NearestFilter] - The min filter value. @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value. @param {number} [format=DepthFormat] - The texture format.
- `get images()` [源码:10520](../../eyes/src/vendor/three/core.js#L10520)：当前操作：写入 无直接字段写入；返回 this.image。
- `set images(value)` [源码:10523](../../eyes/src/vendor/three/core.js#L10523)：当前操作：写入 image；返回 无显式返回。

### `ExternalTexture`

Represents a texture created externally with the same renderer context. This may be a texture from a protected media stream, device camera feed, or other data feeds like a depth sensor. @augments Texture。父类 `Texture`。

- `constructor(sourceTexture=null)` [源码:10541](../../eyes/src/vendor/three/core.js#L10541)：Creates a new raw texture. @param {?(WebGLTexture\|GPUTexture)} [sourceTexture=null] - The external texture.
- `copy(source)` [源码:10544](../../eyes/src/vendor/three/core.js#L10544)：当前操作：写入 sourceTexture；返回 super.copy(source),this.sourceTexture=source.sourceTexture,this。

### `BoxGeometry`

A geometry class for a rectangular cuboid with a given width, height, and depth. On creation, the cuboid is centred on the origin, with each edge parallel to one of the axes. ˋˋˋjs const geometry = new THREE.BoxGeometry( 1, 1, 1 ); const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); const cube = new THREE.Mesh( geometry, material ); scene.add( cube ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#BoxGeometry。父类 `BufferGeometry`。

- `constructor(width=1, height=1, depth=1, widthSegments=1, heightSegments=1, depthSegments=1)` [源码:10564](../../eyes/src/vendor/three/core.js#L10564)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:10610](../../eyes/src/vendor/three/core.js#L10610)：当前操作：写入 parameters；返回 super.copy(source),this.parameters=Object.assign({},source.parameters),this。
- `static fromJSON(data)` [源码:10620](../../eyes/src/vendor/three/core.js#L10620)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {BoxGeometry} A new instance.

### `CapsuleGeometry`

A geometry class for representing a capsule. ˋˋˋjs const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8, 1 ); const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); const capsule = new THREE.Mesh( geometry, material ); scene.add( capsule ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#CapsuleGeometry。父类 `BufferGeometry`。

- `constructor(e=1, t=1, n=4, r=8, i=1)` [源码:10639](../../eyes/src/vendor/three/core.js#L10639)：参数半径、圆柱高度、每端 capSegments、radialSegments、heightSegments。高度至少 0，分段取整并分别至少 1/3/1；沿剖面先下半球、圆柱、上半球生成 radialSegments+1 的闭合环。本地 profileY 加法次序与官方不同，数学说明不是浮点逐位等价证明。
- `copy(source)` [源码:10699](../../eyes/src/vendor/three/core.js#L10699)：当前操作：写入 parameters；返回 super.copy(source),this.parameters=Object.assign({},source.parameters),this。
- `static fromJSON(data)` [源码:10709](../../eyes/src/vendor/three/core.js#L10709)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {CapsuleGeometry} A new instance.

### `CircleGeometry`

A simple shape of Euclidean geometry. It is constructed from a number of triangular segments that are oriented around a central point and extend as far out as a given radius. It is built counter-clockwise from a start angle and a given central angle. It can also be used to create regular polygons, where the number of segments determines the number of sides. ˋˋˋjs const geometry = new THREE.CircleGeometry( 5, 32 ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const circle = new THREE.Mesh( geometry, material ); scene.add( circle ) ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#CircleGeometry。父类 `BufferGeometry`。

- `constructor(radius=1, segments=32, thetaStart=0, thetaLength=2*Math.PI)` [源码:10732](../../eyes/src/vendor/three/core.js#L10732)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:10753](../../eyes/src/vendor/three/core.js#L10753)：当前操作：写入 parameters；返回 super.copy(source),this.parameters=Object.assign({},source.parameters),this。
- `static fromJSON(data)` [源码:10763](../../eyes/src/vendor/three/core.js#L10763)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {CircleGeometry} A new instance.

### `CylinderGeometry`

A geometry class for representing a cylinder. ˋˋˋjs const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const cylinder = new THREE.Mesh( geometry, material ); scene.add( cylinder ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#CylinderGeometry。父类 `BufferGeometry`。

- `constructor(e=1, t=1, n=1, r=32, i=1, a=!1, s=0, o=2*Math.PI)` [源码:10782](../../eyes/src/vendor/three/core.js#L10782)：输入上下半径、高度、周向/高度段、openEnded、角起点和范围；段数 floor。侧壁半径线性变化，法线 (sinθ,(bottom-top)/height,cosθ) 归一化，锥尖跳过退化一半三角形。groups 材质索引侧0、顶1、底2；写 index 与三个浮点属性。
- `copy(source)` [源码:10853](../../eyes/src/vendor/three/core.js#L10853)：当前操作：写入 parameters；返回 super.copy(source),this.parameters=Object.assign({},source.parameters),this。
- `static fromJSON(data)` [源码:10863](../../eyes/src/vendor/three/core.js#L10863)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {CylinderGeometry} A new instance.

### `ConeGeometry`

A geometry class for representing a cone. ˋˋˋjs const geometry = new THREE.ConeGeometry( 5, 20, 32 ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const cone = new THREE.Mesh(geometry, material ); scene.add( cone ); ˋˋˋ @augments CylinderGeometry @demo scenes/geometry-browser.html#ConeGeometry。父类 `CylinderGeometry`。

- `constructor(radius=1, height=1, radialSegments=32, heightSegments=1, openEnded=!1, thetaStart=0, thetaLength=2*Math.PI)` [源码:10881](../../eyes/src/vendor/three/core.js#L10881)：当前操作：写入 parameters、type；返回 无显式返回。
- `static fromJSON(data)` [源码:10899](../../eyes/src/vendor/three/core.js#L10899)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {ConeGeometry} A new instance.

### `PolyhedronGeometry`

A polyhedron is a solid in three dimensions with flat faces. This class will take an array of vertices, project them onto a sphere, and then divide them up to the desired level of detail. @augments BufferGeometry。父类 `BufferGeometry`。

- `constructor(e=[], t=[], n=1, r=0)` [源码:10912](../../eyes/src/vendor/three/core.js#L10912)：输入 xyz 平铺顶点、三角索引、radius、detail。每面分成 detail+1 列三角网，展开为非索引三角形，归一化投到半径球面；用 atan2 方位/倾角给 UV，再修极点方位与跨 seam 的 u+1。生成自有 position/normal/uv；保留参数引用但不直接改原输入数组。
- `copy(source)` [源码:10993](../../eyes/src/vendor/three/core.js#L10993)：当前操作：写入 parameters；返回 super.copy(source),this.parameters=Object.assign({},source.parameters),this。
- `static fromJSON(data)` [源码:11003](../../eyes/src/vendor/three/core.js#L11003)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {PolyhedronGeometry} A new instance.

### `DodecahedronGeometry`

A geometry class for representing a dodecahedron. ˋˋˋjs const geometry = new THREE.DodecahedronGeometry(); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const dodecahedron = new THREE.Mesh( geometry, material ); scene.add( dodecahedron ); ˋˋˋ @augments PolyhedronGeometry @demo scenes/geometry-browser.html#DodecahedronGeometry。父类 `PolyhedronGeometry`。

- `constructor(e=1, t=0)` [源码:11022](../../eyes/src/vendor/three/core.js#L11022)：radius=1/detail=0，20 个种子顶点（立方角点及黄金比/倒数坐标），36 个三角形即十二个五边面三角化；传 PolyhedronGeometry 完成细分/投球/UV。重置 type 与仅含 radius/detail 的 parameters。与其他多面体仅共享父算法，种子拓扑不同，不能折为同一个“几何体构造器”。
- `static fromJSON(data)` [源码:11037](../../eyes/src/vendor/three/core.js#L11037)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {DodecahedronGeometry} A new instance.

### `EdgesGeometry`

Can be used as a helper object to view the edges of a geometry. ˋˋˋjs const geometry = new THREE.BoxGeometry(); const edges = new THREE.EdgesGeometry( geometry ); const line = new THREE.LineSegments( edges ); scene.add( line ); ˋˋˋ Note: It is not yet possible to serialize/deserialize instances of this class. @augments BufferGeometry。父类 `BufferGeometry`。

- `constructor(e=null, t=1)` [源码:11061](../../eyes/src/vendor/three/core.js#L11061)：输入 geometry 可空与角阈值（度，默认1）。逐三角形将位置四舍五入到 1e-4 作 hash，退化三角形跳过；建立有向边表，遇反向边时比较面法线点积<=cos阈值才输出，随后标该边已消费。结果只有非索引 position 线段；与 Wireframe 的所有唯一边不同，焊接精度是固定的。
- `copy(source)` [源码:11109](../../eyes/src/vendor/three/core.js#L11109)：当前操作：写入 parameters；返回 super.copy(source),this.parameters=Object.assign({},source.parameters),this。

### `Curve`

An abstract base class for creating an analytic curve object that contains methods for interpolation. @abstract。父类 `无`。

- `constructor()` [源码:11120](../../eyes/src/vendor/three/core.js#L11120)：当前操作：写入 arcLengthDivisions、cacheArcLengths、needsUpdate、type；返回 无显式返回。
- `getPoint()` [源码:11123](../../eyes/src/vendor/three/core.js#L11123)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getPointAt(u, optionalTarget)` [源码:11135](../../eyes/src/vendor/three/core.js#L11135)：This method returns a vector in 2D or 3D space (depending on the curve definition) for the given interpolation factor. Unlike {@link Curve#getPoint}, this method honors the length of the curve which equidistant samples. @param {number} u - A interpolation factor representing a position on the curve. Must be in the range ˋ[0,1]ˋ. @param {(Vector2\|Vector3)} [optionalTarget] - The optional target vector the result is written to. @return {(Vector2\|Vector3)} The position on the curve. It can be a 2D or 3D vector depending on the curve definition.
- `getPoints(divisions=5)` [源码:11139](../../eyes/src/vendor/three/core.js#L11139)：当前操作：写入 无直接字段写入；返回 points。
- `getSpacedPoints(divisions=5)` [源码:11144](../../eyes/src/vendor/three/core.js#L11144)：当前操作：写入 无直接字段写入；返回 points。
- `getLength()` [源码:11154](../../eyes/src/vendor/three/core.js#L11154)：Returns the total arc length of the curve. @return {number} The length of the curve.
- `getLengths(divisions=this.arcLengthDivisions)` [源码:11164](../../eyes/src/vendor/three/core.js#L11164)：Returns an array of cumulative segment lengths of the curve. @param {number} [divisions=this.arcLengthDivisions] - The number of divisions. @return {Array<number>} An array holding the cumulative segment lengths.
- `updateArcLengths()` [源码:11175](../../eyes/src/vendor/three/core.js#L11175)：当前操作：写入 needsUpdate；返回 无显式返回。
- `getUtoTmapping(e, t=null)` [源码:11179](../../eyes/src/vendor/three/core.js#L11179)：从缓存/生成的弧长表 getLengths 读取累计距离；distance 为真值时用它，否则 u*总长（distance=0 走 u 分支）。二分找精确项或前一项，再在两个累计值间线性插值得参数 t。返回标量，不改 curve 控制点；没有 clamp 超出范围输入，对零长表区间除法不另作保护。
- `getTangent(t, optionalTarget)` [源码:11199](../../eyes/src/vendor/three/core.js#L11199)：当前操作：写入 无直接字段写入；返回 tangent.copy(pt2).sub(pt1).normalize(),tangent。
- `getTangentAt(u, optionalTarget)` [源码:11217](../../eyes/src/vendor/three/core.js#L11217)：Same as {@link Curve#getTangent} but with equidistant samples. @param {number} u - The interpolation factor. @param {(Vector2\|Vector3)} [optionalTarget] - The optional target vector the result is written to. @return {(Vector2\|Vector3)} The tangent vector. @see {@link Curve#getPointAt}
- `computeFrenetFrames(segments, closed=!1)` [源码:11221](../../eyes/src/vendor/three/core.js#L11221)：当前操作：写入 无直接字段写入；返回 {tangents:tangents,normals:normals,binormals:binormals}。
- `clone()` [源码:11262](../../eyes/src/vendor/three/core.js#L11262)：Returns a new curve with copied values from this instance. @return {Curve} A clone of this instance.
- `copy(source)` [源码:11271](../../eyes/src/vendor/three/core.js#L11271)：Copies the values of the given curve to this instance. @param {Curve} source - The curve to copy. @return {Curve} A reference to this curve.
- `toJSON()` [源码:11274](../../eyes/src/vendor/three/core.js#L11274)：当前操作：写入 无直接字段写入；返回 data.arcLengthDivisions=this.arcLengthDivisions,data.type=this.type,data。
- `fromJSON(json)` [源码:11290](../../eyes/src/vendor/three/core.js#L11290)：Deserializes the curve from the given JSON. @param {Object} json - The JSON holding the serialized curve. @return {Curve} A reference to this curve.

### `EllipseCurve`

A curve representing an ellipse. ˋˋˋjs const curve = new THREE.EllipseCurve( 0, 0, 10, 10, 0, 2 * Math.PI, false, 0 ); const points = curve.getPoints( 50 ); const geometry = new THREE.BufferGeometry().setFromPoints( points ); const material = new THREE.LineBasicMaterial( { color: 0xff0000 } ); // Create the final object to add to the scene const ellipse = new THREE.Line( geometry, material ); ˋˋˋ @augments Curve。父类 `Curve`。

- `constructor(aX=0, aY=0, xRadius=1, yRadius=1, aStartAngle=0, aEndAngle=2*Math.PI, aClockwise=!1, aRotation=0)` [源码:11318](../../eyes/src/vendor/three/core.js#L11318)：当前操作：写入 aClockwise、aEndAngle、aRotation、aStartAngle、aX、aY、isEllipseCurve、type、xRadius、yRadius；返回 无显式返回。
- `getPoint(e, t=new Vector2())` [源码:11322](../../eyes/src/vendor/three/core.js#L11322)：输入 t 与可复用 Vector2 target。将 end-start 角差按 2π 规整，EPSILON 区分零角与整圈；clockwise 反转角差，按椭圆半径求坐标，再绕 (aX,aY) 用 aRotation 旋转。覆盖 target 并返回；不限制 t 到 [0,1]。
- `copy(source)` [源码:11342](../../eyes/src/vendor/three/core.js#L11342)：当前操作：写入 aClockwise、aEndAngle、aRotation、aStartAngle、aX、aY、xRadius、yRadius；返回 super.copy(source),this.aX=source.aX,this.aY=source.aY,this.xRadius=source.xRadius,this.yRadius=source.yRadius,this.aStartAngle=source.aStartAngle,this.aEndAngle=source.aEndAngle,this.aClockwise=source.aClockwise,this.aR。
- `toJSON()` [源码:11345](../../eyes/src/vendor/three/core.js#L11345)：当前操作：写入 无直接字段写入；返回 data.aX=this.aX,data.aY=this.aY,data.xRadius=this.xRadius,data.yRadius=this.yRadius,data.aStartAngle=this.aStartAngle,data.aEndAngle=this.aEndAngle,data.aClockwise=this.aClockwise,data.aRotation=this.aRotation,data。
- `fromJSON(json)` [源码:11349](../../eyes/src/vendor/three/core.js#L11349)：当前操作：写入 aClockwise、aEndAngle、aRotation、aStartAngle、aX、aY、xRadius、yRadius；返回 super.fromJSON(json),this.aX=json.aX,this.aY=json.aY,this.xRadius=json.xRadius,this.yRadius=json.yRadius,this.aStartAngle=json.aStartAngle,this.aEndAngle=json.aEndAngle,this.aClockwise=json.aClockwise,this.aRotation=json。

### `ArcCurve`

ArcCurve 参数曲线的点/切线求值及端点控制。父类 `EllipseCurve`。

- `constructor(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise)` [源码:11354](../../eyes/src/vendor/three/core.js#L11354)：当前操作：写入 isArcCurve、type；返回 无显式返回。

### `CatmullRomCurve3`

A curve representing a Catmull-Rom spline. ˋˋˋjs //Create a closed wavey loop const curve = new THREE.CatmullRomCurve3( [ new THREE.Vector3( -10, 0, 10 ), new THREE.Vector3( -5, 5, 5 ), new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 5, -5, 5 ), new THREE.Vector3( 10, 0, 10 ) ] ); const points = curve.getPoints( 50 ); const geometry = new THREE.BufferGeometry().setFromPoints( points ); const material = new THREE.LineBasicMaterial( { color: 0xff0000 } ); // Create the final object to add to the scene const curveObject = new THREE.Line( geometry, material ); ˋˋˋ @augments Curve。父类 `Curve`。

- `constructor(points=[], closed=!1, curveType="centripetal", tension=.5)` [源码:11412](../../eyes/src/vendor/three/core.js#L11412)：当前操作：写入 closed、curveType、isCatmullRomCurve3、points、tension、type；返回 无显式返回。
- `getPoint(e, t=new Vector3())` [源码:11416](../../eyes/src/vendor/three/core.js#L11416)：由 t 得段索引与段内权重；closed 循环取点，开放曲线两端线性外推虚拟控制点，并特判 t=1 的最后段。centripetal/chordal 对距离平方分别用 1/4、1/2 次幂，dt<1e-4 做退化修复，再初始化 x/y/z 三个三次多项式；catmullrom 分支用 tension。求值写 target，复用模块多项式状态；不验证足够点数。
- `copy(source)` [源码:11437](../../eyes/src/vendor/three/core.js#L11437)：当前操作：写入 closed、curveType、points、tension；返回 this.closed=source.closed,this.curveType=source.curveType,this.tension=source.tension,this。
- `toJSON()` [源码:11445](../../eyes/src/vendor/three/core.js#L11445)：当前操作：写入 无直接字段写入；返回 data.closed=this.closed,data.curveType=this.curveType,data.tension=this.tension,data。
- `fromJSON(json)` [源码:11454](../../eyes/src/vendor/three/core.js#L11454)：当前操作：写入 closed、curveType、points、tension；返回 this.closed=json.closed,this.curveType=json.curveType,this.tension=json.tension,this。

### `CubicBezierCurve`

A curve representing a 2D Cubic Bezier curve. ˋˋˋjs const curve = new THREE.CubicBezierCurve( new THREE.Vector2( - 0, 0 ), new THREE.Vector2( - 5, 15 ), new THREE.Vector2( 20, 15 ), new THREE.Vector2( 10, 0 ) ); const points = curve.getPoints( 50 ); const geometry = new THREE.BufferGeometry().setFromPoints( points ); const material = new THREE.LineBasicMaterial( { color: 0xff0000 } ); // Create the final object to add to the scene const curveObject = new THREE.Line( geometry, material ); ˋˋˋ @augments Curve。父类 `Curve`。

- `constructor(v0=new Vector2(), v1=new Vector2(), v2=new Vector2(), v3=new Vector2())` [源码:11518](../../eyes/src/vendor/three/core.js#L11518)：当前操作：写入 isCubicBezierCurve、type、v0、v1、v2、v3；返回 无显式返回。
- `getPoint(t, optionalTarget=new Vector2())` [源码:11528](../../eyes/src/vendor/three/core.js#L11528)：Returns a point on the curve. @param {number} t - A interpolation factor representing a position on the curve. Must be in the range ˋ[0,1]ˋ. @param {Vector2} [optionalTarget] - The optional target vector the result is written to. @return {Vector2} The position on the curve.
- `copy(source)` [源码:11536](../../eyes/src/vendor/three/core.js#L11536)：当前操作：写入 无直接字段写入；返回 super.copy(source),this.v0.copy(source.v0),this.v1.copy(source.v1),this.v2.copy(source.v2),this.v3.copy(source.v3),this。
- `toJSON()` [源码:11539](../../eyes/src/vendor/three/core.js#L11539)：当前操作：写入 无直接字段写入；返回 data.v0=this.v0.toArray(),data.v1=this.v1.toArray(),data.v2=this.v2.toArray(),data.v3=this.v3.toArray(),data。
- `fromJSON(json)` [源码:11543](../../eyes/src/vendor/three/core.js#L11543)：当前操作：写入 无直接字段写入；返回 super.fromJSON(json),this.v0.fromArray(json.v0),this.v1.fromArray(json.v1),this.v2.fromArray(json.v2),this.v3.fromArray(json.v3),this。

### `CubicBezierCurve3`

A curve representing a 3D Cubic Bezier curve. @augments Curve。父类 `Curve`。

- `constructor(v0=new Vector3(), v1=new Vector3(), v2=new Vector3(), v3=new Vector3())` [源码:11553](../../eyes/src/vendor/three/core.js#L11553)：当前操作：写入 isCubicBezierCurve3、type、v0、v1、v2、v3；返回 无显式返回。
- `getPoint(t, optionalTarget=new Vector3())` [源码:11563](../../eyes/src/vendor/three/core.js#L11563)：Returns a point on the curve. @param {number} t - A interpolation factor representing a position on the curve. Must be in the range ˋ[0,1]ˋ. @param {Vector3} [optionalTarget] - The optional target vector the result is written to. @return {Vector3} The position on the curve.
- `copy(source)` [源码:11571](../../eyes/src/vendor/three/core.js#L11571)：当前操作：写入 无直接字段写入；返回 super.copy(source),this.v0.copy(source.v0),this.v1.copy(source.v1),this.v2.copy(source.v2),this.v3.copy(source.v3),this。
- `toJSON()` [源码:11574](../../eyes/src/vendor/three/core.js#L11574)：当前操作：写入 无直接字段写入；返回 data.v0=this.v0.toArray(),data.v1=this.v1.toArray(),data.v2=this.v2.toArray(),data.v3=this.v3.toArray(),data。
- `fromJSON(json)` [源码:11578](../../eyes/src/vendor/three/core.js#L11578)：当前操作：写入 无直接字段写入；返回 super.fromJSON(json),this.v0.fromArray(json.v0),this.v1.fromArray(json.v1),this.v2.fromArray(json.v2),this.v3.fromArray(json.v3),this。

### `LineCurve`

A curve representing a 2D line segment. @augments Curve。父类 `Curve`。

- `constructor(v1=new Vector2(), v2=new Vector2())` [源码:11588](../../eyes/src/vendor/three/core.js#L11588)：当前操作：写入 isLineCurve、type、v1、v2；返回 无显式返回。
- `getPoint(t, optionalTarget=new Vector2())` [源码:11591](../../eyes/src/vendor/three/core.js#L11591)：当前操作：写入 无直接字段写入；返回 1===t?point.copy(this.v2):(point.copy(this.v2).sub(this.v1),point.multiplyScalar(t).add(this.v1)),point。
- `getPointAt(u, optionalTarget)` [源码:11595](../../eyes/src/vendor/three/core.js#L11595)：当前操作：写入 无直接字段写入；返回 this.getPoint(u,optionalTarget)。
- `getTangent(t, optionalTarget=new Vector2())` [源码:11598](../../eyes/src/vendor/three/core.js#L11598)：当前操作：写入 无直接字段写入；返回 optionalTarget.subVectors(this.v2,this.v1).normalize()。
- `getTangentAt(u, optionalTarget)` [源码:11601](../../eyes/src/vendor/three/core.js#L11601)：当前操作：写入 无直接字段写入；返回 this.getTangent(u,optionalTarget)。
- `copy(source)` [源码:11604](../../eyes/src/vendor/three/core.js#L11604)：当前操作：写入 无直接字段写入；返回 super.copy(source),this.v1.copy(source.v1),this.v2.copy(source.v2),this。
- `toJSON()` [源码:11607](../../eyes/src/vendor/three/core.js#L11607)：当前操作：写入 无直接字段写入；返回 data.v1=this.v1.toArray(),data.v2=this.v2.toArray(),data。
- `fromJSON(json)` [源码:11611](../../eyes/src/vendor/three/core.js#L11611)：当前操作：写入 无直接字段写入；返回 super.fromJSON(json),this.v1.fromArray(json.v1),this.v2.fromArray(json.v2),this。

### `LineCurve3`

A curve representing a 3D line segment. @augments Curve。父类 `Curve`。

- `constructor(v1=new Vector3(), v2=new Vector3())` [源码:11621](../../eyes/src/vendor/three/core.js#L11621)：当前操作：写入 isLineCurve3、type、v1、v2；返回 无显式返回。
- `getPoint(t, optionalTarget=new Vector3())` [源码:11624](../../eyes/src/vendor/three/core.js#L11624)：当前操作：写入 无直接字段写入；返回 1===t?point.copy(this.v2):(point.copy(this.v2).sub(this.v1),point.multiplyScalar(t).add(this.v1)),point。
- `getPointAt(u, optionalTarget)` [源码:11628](../../eyes/src/vendor/three/core.js#L11628)：当前操作：写入 无直接字段写入；返回 this.getPoint(u,optionalTarget)。
- `getTangent(t, optionalTarget=new Vector3())` [源码:11631](../../eyes/src/vendor/three/core.js#L11631)：当前操作：写入 无直接字段写入；返回 optionalTarget.subVectors(this.v2,this.v1).normalize()。
- `getTangentAt(u, optionalTarget)` [源码:11634](../../eyes/src/vendor/three/core.js#L11634)：当前操作：写入 无直接字段写入；返回 this.getTangent(u,optionalTarget)。
- `copy(source)` [源码:11637](../../eyes/src/vendor/three/core.js#L11637)：当前操作：写入 无直接字段写入；返回 super.copy(source),this.v1.copy(source.v1),this.v2.copy(source.v2),this。
- `toJSON()` [源码:11640](../../eyes/src/vendor/three/core.js#L11640)：当前操作：写入 无直接字段写入；返回 data.v1=this.v1.toArray(),data.v2=this.v2.toArray(),data。
- `fromJSON(json)` [源码:11644](../../eyes/src/vendor/three/core.js#L11644)：当前操作：写入 无直接字段写入；返回 super.fromJSON(json),this.v1.fromArray(json.v1),this.v2.fromArray(json.v2),this。

### `QuadraticBezierCurve`

A curve representing a 2D Quadratic Bezier curve. ˋˋˋjs const curve = new THREE.QuadraticBezierCurve( new THREE.Vector2( - 10, 0 ), new THREE.Vector2( 20, 15 ), new THREE.Vector2( 10, 0 ) ) const points = curve.getPoints( 50 ); const geometry = new THREE.BufferGeometry().setFromPoints( points ); const material = new THREE.LineBasicMaterial( { color: 0xff0000 } ); // Create the final object to add to the scene const curveObject = new THREE.Line( geometry, material ); ˋˋˋ @augments Curve。父类 `Curve`。

- `constructor(v0=new Vector2(), v1=new Vector2(), v2=new Vector2())` [源码:11670](../../eyes/src/vendor/three/core.js#L11670)：当前操作：写入 isQuadraticBezierCurve、type、v0、v1、v2；返回 无显式返回。
- `getPoint(t, optionalTarget=new Vector2())` [源码:11680](../../eyes/src/vendor/three/core.js#L11680)：Returns a point on the curve. @param {number} t - A interpolation factor representing a position on the curve. Must be in the range ˋ[0,1]ˋ. @param {Vector2} [optionalTarget] - The optional target vector the result is written to. @return {Vector2} The position on the curve.
- `copy(source)` [源码:11687](../../eyes/src/vendor/three/core.js#L11687)：当前操作：写入 无直接字段写入；返回 super.copy(source),this.v0.copy(source.v0),this.v1.copy(source.v1),this.v2.copy(source.v2),this。
- `toJSON()` [源码:11690](../../eyes/src/vendor/three/core.js#L11690)：当前操作：写入 无直接字段写入；返回 data.v0=this.v0.toArray(),data.v1=this.v1.toArray(),data.v2=this.v2.toArray(),data。
- `fromJSON(json)` [源码:11694](../../eyes/src/vendor/three/core.js#L11694)：当前操作：写入 无直接字段写入；返回 super.fromJSON(json),this.v0.fromArray(json.v0),this.v1.fromArray(json.v1),this.v2.fromArray(json.v2),this。

### `QuadraticBezierCurve3`

A curve representing a 3D Quadratic Bezier curve. @augments Curve。父类 `Curve`。

- `constructor(v0=new Vector3(), v1=new Vector3(), v2=new Vector3())` [源码:11704](../../eyes/src/vendor/three/core.js#L11704)：当前操作：写入 isQuadraticBezierCurve3、type、v0、v1、v2；返回 无显式返回。
- `getPoint(t, optionalTarget=new Vector3())` [源码:11714](../../eyes/src/vendor/three/core.js#L11714)：Returns a point on the curve. @param {number} t - A interpolation factor representing a position on the curve. Must be in the range ˋ[0,1]ˋ. @param {Vector3} [optionalTarget] - The optional target vector the result is written to. @return {Vector3} The position on the curve.
- `copy(source)` [源码:11721](../../eyes/src/vendor/three/core.js#L11721)：当前操作：写入 无直接字段写入；返回 super.copy(source),this.v0.copy(source.v0),this.v1.copy(source.v1),this.v2.copy(source.v2),this。
- `toJSON()` [源码:11724](../../eyes/src/vendor/three/core.js#L11724)：当前操作：写入 无直接字段写入；返回 data.v0=this.v0.toArray(),data.v1=this.v1.toArray(),data.v2=this.v2.toArray(),data。
- `fromJSON(json)` [源码:11728](../../eyes/src/vendor/three/core.js#L11728)：当前操作：写入 无直接字段写入；返回 super.fromJSON(json),this.v0.fromArray(json.v0),this.v1.fromArray(json.v1),this.v2.fromArray(json.v2),this。

### `SplineCurve`

A curve representing a 2D spline curve. ˋˋˋjs // Create a sine-like wave const curve = new THREE.SplineCurve( [ new THREE.Vector2( -10, 0 ), new THREE.Vector2( -5, 5 ), new THREE.Vector2( 0, 0 ), new THREE.Vector2( 5, -5 ), new THREE.Vector2( 10, 0 ) ] ); const points = curve.getPoints( 50 ); const geometry = new THREE.BufferGeometry().setFromPoints( points ); const material = new THREE.LineBasicMaterial( { color: 0xff0000 } ); // Create the final object to add to the scene const splineObject = new THREE.Line( geometry, material ); ˋˋˋ @augments Curve。父类 `Curve`。

- `constructor(points=[])` [源码:11757](../../eyes/src/vendor/three/core.js#L11757)：当前操作：写入 isSplineCurve、points、type；返回 无显式返回。
- `getPoint(t, optionalTarget=new Vector2())` [源码:11760](../../eyes/src/vendor/three/core.js#L11760)：当前操作：写入 无直接字段写入；返回 point.set(CatmullRom(weight,p0.x,p1.x,p2.x,p3.x),CatmullRom(weight,p0.y,p1.y,p2.y,p3.y)),point。
- `copy(source)` [源码:11772](../../eyes/src/vendor/three/core.js#L11772)：当前操作：写入 points；返回 this。
- `toJSON()` [源码:11780](../../eyes/src/vendor/three/core.js#L11780)：当前操作：写入 无直接字段写入；返回 data。
- `fromJSON(json)` [源码:11789](../../eyes/src/vendor/three/core.js#L11789)：当前操作：写入 points；返回 this。

### `CurvePath`

A base class extending {@link Curve}. ˋCurvePathˋ is simply an array of connected curves, but retains the API of a curve. @augments Curve。父类 `Curve`。

- `constructor()` [源码:11818](../../eyes/src/vendor/three/core.js#L11818)：当前操作：写入 autoClose、curves、type；返回 无显式返回。
- `add(curve)` [源码:11826](../../eyes/src/vendor/three/core.js#L11826)：Adds a curve to this curve path. @param {Curve} curve - The curve to add.
- `closePath()` [源码:11829](../../eyes/src/vendor/three/core.js#L11829)：当前操作：写入 无直接字段写入；返回 this。
- `getPoint(e, t)` [源码:11839](../../eyes/src/vendor/three/core.js#L11839)：把 t*总长转成路径距离，顺序找到第一个累计子曲线长度>=距离的段；换算该段内弧长比例并调用 getPointAt，零长子段用0。传透 optionalTarget，超出所有子段返回 null；不是按曲线条数等分 t。
- `getLength()` [源码:11855](../../eyes/src/vendor/three/core.js#L11855)：当前操作：写入 无直接字段写入；返回 lens[lens.length-1]。
- `updateArcLengths()` [源码:11859](../../eyes/src/vendor/three/core.js#L11859)：当前操作：写入 cacheLengths、needsUpdate；返回 无显式返回。
- `getCurveLengths()` [源码:11867](../../eyes/src/vendor/three/core.js#L11867)：Returns list of cumulative curve lengths of the defined curves. @return {Array<number>} The curve lengths.
- `getSpacedPoints(divisions=40)` [源码:11874](../../eyes/src/vendor/three/core.js#L11874)：当前操作：写入 无直接字段写入；返回 this.autoClose&&points.push(points[0]),points。
- `getPoints(divisions=12)` [源码:11879](../../eyes/src/vendor/three/core.js#L11879)：当前操作：写入 无直接字段写入；返回 this.autoClose&&points.length>1&&!points[points.length-1].equals(points[0])&&points.push(points[0]),points。
- `copy(source)` [源码:11893](../../eyes/src/vendor/three/core.js#L11893)：当前操作：写入 autoClose、curves；返回 this.autoClose=source.autoClose,this。
- `toJSON()` [源码:11901](../../eyes/src/vendor/three/core.js#L11901)：当前操作：写入 无直接字段写入；返回 data。
- `fromJSON(json)` [源码:11910](../../eyes/src/vendor/three/core.js#L11910)：当前操作：写入 autoClose、curves；返回 this。

### `Path`

A 2D path representation. The class provides methods for creating paths and contours of 2D shapes similar to the 2D Canvas API. ˋˋˋjs const path = new THREE.Path(); path.lineTo( 0, 0.8 ); path.quadraticCurveTo( 0, 1, 0.2, 1 ); path.lineTo( 1, 1 ); const points = path.getPoints(); const geometry = new THREE.BufferGeometry().setFromPoints( points ); const material = new THREE.LineBasicMaterial( { color: 0xffffff } ); const line = new THREE.Line( geometry, material ); scene.add( line ); ˋˋˋ @augments CurvePath。父类 `CurvePath`。

- `constructor(points)` [源码:11942](../../eyes/src/vendor/three/core.js#L11942)：当前操作：写入 currentPoint、type；返回 无显式返回。
- `setFromPoints(points)` [源码:11945](../../eyes/src/vendor/three/core.js#L11945)：当前操作：写入 无直接字段写入；返回 this。
- `moveTo(x, y)` [源码:11957](../../eyes/src/vendor/three/core.js#L11957)：Moves {@link Path#currentPoint} to the given point. @param {number} x - The x coordinate. @param {number} y - The y coordinate. @return {Path} A reference to this path.
- `lineTo(x, y)` [源码:11968](../../eyes/src/vendor/three/core.js#L11968)：Adds an instance of {@link LineCurve} to the path by connecting the current point with the given one. @param {number} x - The x coordinate of the end point. @param {number} y - The y coordinate of the end point. @return {Path} A reference to this path.
- `quadraticCurveTo(aCPx, aCPy, aX, aY)` [源码:11982](../../eyes/src/vendor/three/core.js#L11982)：Adds an instance of {@link QuadraticBezierCurve} to the path by connecting the current point with the given one. @param {number} aCPx - The x coordinate of the control point. @param {number} aCPy - The y coordinate of the control point. @param {number} aX - The x coordinate of the end point. @param {number} aY - The y coordinate of the end point. @return {Path} A reference to this path.
- `bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY)` [源码:11998](../../eyes/src/vendor/three/core.js#L11998)：Adds an instance of {@link CubicBezierCurve} to the path by connecting the current point with the given one. @param {number} aCP1x - The x coordinate of the first control point. @param {number} aCP1y - The y coordinate of the first control point. @param {number} aCP2x - The x coordinate of the second control point. @param {number} aCP2y - The y coordinate of the second control point. @param {number} aX - The x coordinate of the end point. @param {number} aY - The y coordinate of the end point. @return {Path} A reference to this path.
- `splineThru(pts)` [源码:12009](../../eyes/src/vendor/three/core.js#L12009)：Adds an instance of {@link SplineCurve} to the path by connecting the current point with the given list of points. @param {Array<Vector2>} pts - An array of points in 2D space. @return {Path} A reference to this path.
- `arc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise)` [源码:12026](../../eyes/src/vendor/three/core.js#L12026)：Adds an arc as an instance of {@link EllipseCurve} to the path, positioned relative to the current point. @param {number} [aX=0] - The x coordinate of the center of the arc offsetted from the previous curve. @param {number} [aY=0] - The y coordinate of the center of the arc offsetted from the previous curve. @param {number} [aRadius=1] - The radius of the arc. @param {number} [aStartAngle=0] - The start angle in radians. @param {number} [aEndAngle=Math.PI*2] - The end angle in radians. @param {boolean} [aClockwise=false] - Whether to sweep the arc clockwise or not. @return {Path} A reference to this path.
- `absarc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise)` [源码:12042](../../eyes/src/vendor/three/core.js#L12042)：Adds an absolutely positioned arc as an instance of {@link EllipseCurve} to the path. @param {number} [aX=0] - The x coordinate of the center of the arc. @param {number} [aY=0] - The y coordinate of the center of the arc. @param {number} [aRadius=1] - The radius of the arc. @param {number} [aStartAngle=0] - The start angle in radians. @param {number} [aEndAngle=Math.PI*2] - The end angle in radians. @param {boolean} [aClockwise=false] - Whether to sweep the arc clockwise or not. @return {Path} A reference to this path.
- `ellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation)` [源码:12059](../../eyes/src/vendor/three/core.js#L12059)：Adds an ellipse as an instance of {@link EllipseCurve} to the path, positioned relative to the current point @param {number} [aX=0] - The x coordinate of the center of the ellipse offsetted from the previous curve. @param {number} [aY=0] - The y coordinate of the center of the ellipse offsetted from the previous curve. @param {number} [xRadius=1] - The radius of the ellipse in the x axis. @param {number} [yRadius=1] - The radius of the ellipse in the y axis. @param {number} [aStartAngle=0] - The start angle in radians. @param {number} [aEndAngle=Math.PI*2] - The end angle in radians. @param {boolean} [aClockwise=false] - Whether to sweep the ellipse clockwise or not. @param {number} [aRotation=0] - The rotation angle of the ellipse in radians, counterclockwise from the positive X axis. @return {Path} A reference to this path.
- `absellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation)` [源码:12077](../../eyes/src/vendor/three/core.js#L12077)：Adds an absolutely positioned ellipse as an instance of {@link EllipseCurve} to the path. @param {number} [aX=0] - The x coordinate of the absolute center of the ellipse. @param {number} [aY=0] - The y coordinate of the absolute center of the ellipse. @param {number} [xRadius=1] - The radius of the ellipse in the x axis. @param {number} [yRadius=1] - The radius of the ellipse in the y axis. @param {number} [aStartAngle=0] - The start angle in radians. @param {number} [aEndAngle=Math.PI*2] - The end angle in radians. @param {boolean} [aClockwise=false] - Whether to sweep the ellipse clockwise or not. @param {number} [aRotation=0] - The rotation angle of the ellipse in radians, counterclockwise from the positive X axis. @return {Path} A reference to this path.
- `copy(source)` [源码:12087](../../eyes/src/vendor/three/core.js#L12087)：当前操作：写入 无直接字段写入；返回 super.copy(source),this.currentPoint.copy(source.currentPoint),this。
- `toJSON()` [源码:12090](../../eyes/src/vendor/three/core.js#L12090)：当前操作：写入 无直接字段写入；返回 data.currentPoint=this.currentPoint.toArray(),data。
- `fromJSON(json)` [源码:12094](../../eyes/src/vendor/three/core.js#L12094)：当前操作：写入 无直接字段写入；返回 super.fromJSON(json),this.currentPoint.fromArray(json.currentPoint),this。

### `Shape`

Defines an arbitrary 2d shape plane using paths with optional holes. It can be used with {@link ExtrudeGeometry}, {@link ShapeGeometry}, to get points, or to get triangulated faces. ˋˋˋjs const heartShape = new THREE.Shape(); heartShape.moveTo( 25, 25 ); heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 ); heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 ); heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 ); heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 ); heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 ); heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 ); const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 }; const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings ); const mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial() ); ˋˋˋ @augments Path。父类 `Path`。

- `constructor(points)` [源码:12130](../../eyes/src/vendor/three/core.js#L12130)：当前操作：写入 holes、type、uuid；返回 无显式返回。
- `getPointsHoles(divisions)` [源码:12133](../../eyes/src/vendor/three/core.js#L12133)：当前操作：写入 无直接字段写入；返回 holesPts。
- `extractPoints(divisions)` [源码:12147](../../eyes/src/vendor/three/core.js#L12147)：get points of shape and holes (keypoints based on segments parameter) Returns an object that holds contour data for the shape and its holes as arrays of 2D points. @param {number} divisions - The fineness of the result. @return {{shape:Array<Vector2>,holes:Array<Array<Vector2>>}} An object with contour data.
- `copy(source)` [源码:12153](../../eyes/src/vendor/three/core.js#L12153)：当前操作：写入 holes；返回 this。
- `toJSON()` [源码:12161](../../eyes/src/vendor/three/core.js#L12161)：当前操作：写入 无直接字段写入；返回 data。
- `fromJSON(json)` [源码:12170](../../eyes/src/vendor/three/core.js#L12170)：当前操作：写入 holes、uuid；返回 this。

### `Earcut`

An implementation of the earcut polygon triangulation algorithm. The code is a port of [mapbox/earcut](https://github.com/mapbox/earcut). @see https://github.com/mapbox/earcut。父类 `无`。

- `static triangulate(data, holeIndices, dim=2)` [源码:12519](../../eyes/src/vendor/three/core.js#L12519)：Triangulates the given shape definition by returning an array of triangles. @param {Array<number>} data - An array with 2D points. @param {Array<number>} holeIndices - An array with indices defining holes. @param {number} [dim=2] - The number of coordinates per vertex in the input array. @return {Array<number>} An array representing the triangulated faces. Each face is defined by three consecutive numbers representing vertex indices.

### `ShapeUtils`

A class containing utility functions for shapes. @hideconstructor。父类 `无`。

- `static area(contour)` [源码:12529](../../eyes/src/vendor/three/core.js#L12529)：当前操作：写入 无直接字段写入；返回 .5*a。
- `static isClockWise(pts)` [源码:12541](../../eyes/src/vendor/three/core.js#L12541)：Returns ˋtrueˋ if the given contour uses a clockwise winding order. @param {Array<Vector2>} pts - An array of 2D points defining a polygon. @return {boolean} Whether the given contour uses a clockwise winding order or not.
- `static triangulateShape(contour, holes)` [源码:12544](../../eyes/src/vendor/three/core.js#L12544)：当前操作：写入 无直接字段写入；返回 faces。

### `ExtrudeGeometry`

Creates extruded geometry from a path shape. ˋˋˋjs const length = 12, width = 8; const shape = new THREE.Shape(); shape.moveTo( 0,0 ); shape.lineTo( 0, width ); shape.lineTo( length, width ); shape.lineTo( length, 0 ); shape.lineTo( 0, 0 ); const geometry = new THREE.ExtrudeGeometry( shape ); const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); const mesh = new THREE.Mesh( geometry, material ) ; scene.add( mesh ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#ExtrudeGeometry。父类 `BufferGeometry`。

- `constructor(e=new Shape([new Vector2(.5,.5),new Vector2(-.5,.5),new Vector2(-.5,-.5),new Vector2(.5,-.5)]), t={})` [源码:12590](../../eyes/src/vendor/three/core.js#L12590)：shape 或 shape 数组+options，默认单位方形。extractPoints 后规范轮廓/洞绕序，以相对坐标尺度的 1e-10 距离阈值合并重叠点；由邻边求 bevel 位移，超过长度平方2时缩短尖角，平行边另分同/反向。原 shapes/options 在 parameters 保留引用，没有复制任意路径对象。
- `copy(source)` [源码:12818](../../eyes/src/vendor/three/core.js#L12818)：当前操作：写入 parameters；返回 super.copy(source),this.parameters=Object.assign({},source.parameters),this。
- `toJSON()` [源码:12822](../../eyes/src/vendor/three/core.js#L12822)：先取 BufferGeometry 序列化结果；shapes 只存 UUID 数组，options 做 Object.assign 浅拷贝，extrudePath 若存在改为路径.toJSON。原 options 不被这次替换改变，其他对象值仍共享引用；不会把 Shape 实例本体内嵌。
- `static fromJSON(data, shapes)` [源码:12833](../../eyes/src/vendor/three/core.js#L12833)：当前操作：写入 无直接字段写入；返回 void 0!==extrudePath&&(data.options.extrudePath=new Curves[extrudePath.type]().fromJSON(extrudePath)),new ExtrudeGeometry(geometryShapes,data.options)。

### `IcosahedronGeometry`

A geometry class for representing an icosahedron. ˋˋˋjs const geometry = new THREE.IcosahedronGeometry(); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const icosahedron = new THREE.Mesh( geometry, material ); scene.add( icosahedron ); ˋˋˋ @augments PolyhedronGeometry @demo scenes/geometry-browser.html#IcosahedronGeometry。父类 `PolyhedronGeometry`。

- `constructor(e=1, t=0)` [源码:12884](../../eyes/src/vendor/three/core.js#L12884)：radius/detail 输入，12 个含黄金比的种子顶点、20 个三角面传 PolyhedronGeometry，随后设自身 type 和 radius/detail parameters。与 Dodecahedron 的20顶点/36三角种子不同；细分与球面 UV 由父类执行。
- `static fromJSON(data)` [源码:12898](../../eyes/src/vendor/three/core.js#L12898)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {IcosahedronGeometry} A new instance.

### `LatheGeometry`

Creates meshes with axial symmetry like vases. The lathe rotates around the Y axis. ˋˋˋjs const points = []; for ( let i = 0; i < 10; i ++ ) { points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) ); } const geometry = new THREE.LatheGeometry( points ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const lathe = new THREE.Mesh( geometry, material ); scene.add( lathe ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#LatheGeometry。父类 `BufferGeometry`。

- `constructor(points=[new Vector2(0,-.5),new Vector2(.5,0),new Vector2(0,.5)], segments=12, phiStart=0, phiLength=2*Math.PI)` [源码:12920](../../eyes/src/vendor/three/core.js#L12920)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:12972](../../eyes/src/vendor/three/core.js#L12972)：当前操作：写入 parameters；返回 super.copy(source),this.parameters=Object.assign({},source.parameters),this。
- `static fromJSON(data)` [源码:12982](../../eyes/src/vendor/three/core.js#L12982)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {LatheGeometry} A new instance.

### `OctahedronGeometry`

A geometry class for representing an octahedron. ˋˋˋjs const geometry = new THREE.OctahedronGeometry(); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const octahedron = new THREE.Mesh( geometry, material ); scene.add( octahedron ); ˋˋˋ @augments PolyhedronGeometry @demo scenes/geometry-browser.html#OctahedronGeometry。父类 `PolyhedronGeometry`。

- `constructor(e=1, t=0)` [源码:13001](../../eyes/src/vendor/three/core.js#L13001)：6 个轴向 ±1 种子顶点、8 个三角面，radius/detail 传父类；参数及 type 记录为 OctahedronGeometry。不是直接生成经纬线球，detail=0 保留三角面法线。
- `static fromJSON(data)` [源码:13014](../../eyes/src/vendor/three/core.js#L13014)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {OctahedronGeometry} A new instance.

### `PlaneGeometry`

A geometry class for representing a plane. ˋˋˋjs const geometry = new THREE.PlaneGeometry( 1, 1 ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } ); const plane = new THREE.Mesh( geometry, material ); scene.add( plane ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#PlaneGeometry。父类 `BufferGeometry`。

- `constructor(width=1, height=1, widthSegments=1, heightSegments=1)` [源码:13032](../../eyes/src/vendor/three/core.js#L13032)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:13067](../../eyes/src/vendor/three/core.js#L13067)：当前操作：写入 parameters；返回 super.copy(source),this.parameters=Object.assign({},source.parameters),this。
- `static fromJSON(data)` [源码:13077](../../eyes/src/vendor/three/core.js#L13077)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {PlaneGeometry} A new instance.

### `RingGeometry`

A class for generating a two-dimensional ring geometry. ˋˋˋjs const geometry = new THREE.RingGeometry( 1, 5, 32 ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } ); const mesh = new THREE.Mesh( geometry, material ); scene.add( mesh ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#RingGeometry。父类 `BufferGeometry`。

- `constructor(e=.5, t=1, n=32, r=1, i=0, a=2*Math.PI)` [源码:13096](../../eyes/src/vendor/three/core.js#L13096)：innerRadius=.5/outerRadius=1、thetaSegments>=3、phiSegments>=1、thetaStart/Length 定义 XY 平面的扇形环。半径按 phi 线性增长，每行 theta+1 顶点，法线固定+Z，UV 以 outerRadius 归一到中心 .5；每格两个索引三角形。不 floor 这两个分段参数，不验证 outerRadius 非零或半径顺序。
- `copy(source)` [源码:13133](../../eyes/src/vendor/three/core.js#L13133)：当前操作：写入 parameters；返回 super.copy(source),this.parameters=Object.assign({},source.parameters),this。
- `static fromJSON(data)` [源码:13143](../../eyes/src/vendor/three/core.js#L13143)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {RingGeometry} A new instance.

### `ShapeGeometry`

Creates an one-sided polygonal geometry from one or more path shapes. ˋˋˋjs const arcShape = new THREE.Shape() .moveTo( 5, 1 ) .absarc( 1, 1, 4, 0, Math.PI * 2, false ); const geometry = new THREE.ShapeGeometry( arcShape ); const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.DoubleSide } ); const mesh = new THREE.Mesh( geometry, material ) ; scene.add( mesh ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#ShapeGeometry。父类 `BufferGeometry`。

- `constructor(shapes=new Shape([new Vector2(0,.5),new Vector2(-.5,-.5),new Vector2(.5,-.5)]), curveSegments=12)` [源码:13165](../../eyes/src/vendor/three/core.js#L13165)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:13206](../../eyes/src/vendor/three/core.js#L13206)：当前操作：写入 parameters；返回 super.copy(source),this.parameters=Object.assign({},source.parameters),this。
- `toJSON()` [源码:13210](../../eyes/src/vendor/three/core.js#L13210)：在 super.toJSON 结果中填 shapes UUID 数组，单 Shape 同样转为数组。不会复制曲线数据或洞坐标；反序列化需要外部 shapes 字典。与 Extrude 的区别是不包含 options/extrudePath。
- `static fromJSON(data, shapes)` [源码:13228](../../eyes/src/vendor/three/core.js#L13228)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @param {Array<Shape>} shapes - An array of shapes. @return {ShapeGeometry} A new instance.

### `SphereGeometry`

A class for generating a sphere geometry. ˋˋˋjs const geometry = new THREE.SphereGeometry( 15, 32, 16 ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const sphere = new THREE.Mesh( geometry, material ); scene.add( sphere ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#SphereGeometry。父类 `BufferGeometry`。

- `constructor(radius=1, widthSegments=32, heightSegments=16, phiStart=0, phiLength=2*Math.PI, thetaStart=0, thetaLength=Math.PI)` [源码:13251](../../eyes/src/vendor/three/core.js#L13251)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:13294](../../eyes/src/vendor/three/core.js#L13294)：当前操作：写入 parameters；返回 super.copy(source),this.parameters=Object.assign({},source.parameters),this。
- `static fromJSON(data)` [源码:13304](../../eyes/src/vendor/three/core.js#L13304)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {SphereGeometry} A new instance.

### `TetrahedronGeometry`

A geometry class for representing an tetrahedron. ˋˋˋjs const geometry = new THREE.TetrahedronGeometry(); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const tetrahedron = new THREE.Mesh( geometry, material ); scene.add( tetrahedron ); ˋˋˋ @augments PolyhedronGeometry @demo scenes/geometry-browser.html#TetrahedronGeometry。父类 `PolyhedronGeometry`。

- `constructor(e=1, t=0)` [源码:13323](../../eyes/src/vendor/three/core.js#L13323)：4 个交错立方角种子顶点、4 个三角面，调用 PolyhedronGeometry(radius,detail)，再设置自身 type 与 parameters。与 Octahedron/ Icosahedron / Dodecahedron 的顶点面数逐项不同。
- `static fromJSON(data)` [源码:13336](../../eyes/src/vendor/three/core.js#L13336)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {TetrahedronGeometry} A new instance.

### `TorusGeometry`

A geometry class for representing an torus. ˋˋˋjs const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const torus = new THREE.Mesh( geometry, material ); scene.add( torus ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#TorusGeometry。父类 `BufferGeometry`。

- `constructor(radius=1, tube=.4, radialSegments=12, tubularSegments=48, arc=2*Math.PI, thetaStart=0, thetaLength=2*Math.PI)` [源码:13354](../../eyes/src/vendor/three/core.js#L13354)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:13387](../../eyes/src/vendor/three/core.js#L13387)：当前操作：写入 parameters；返回 super.copy(source),this.parameters=Object.assign({},source.parameters),this。
- `static fromJSON(data)` [源码:13397](../../eyes/src/vendor/three/core.js#L13397)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {TorusGeometry} A new instance.

### `TorusKnotGeometry`

Creates a torus knot, the particular shape of which is defined by a pair of coprime integers, p and q. If p and q are not coprime, the result will be a torus link. ˋˋˋjs const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 ); const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); const torusKnot = new THREE.Mesh( geometry, material ); scene.add( torusKnot ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#TorusKnotGeometry。父类 `BufferGeometry`。

- `constructor(radius=1, tube=.4, tubularSegments=64, radialSegments=8, p=2, q=3)` [源码:13417](../../eyes/src/vendor/three/core.js#L13417)：当前操作：写入 parameters、type；返回 无显式返回。
- `copy(source)` [源码:13463](../../eyes/src/vendor/three/core.js#L13463)：当前操作：写入 parameters；返回 super.copy(source),this.parameters=Object.assign({},source.parameters),this。
- `static fromJSON(data)` [源码:13473](../../eyes/src/vendor/three/core.js#L13473)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {TorusKnotGeometry} A new instance.

### `TubeGeometry`

Creates a tube that extrudes along a 3D curve. ˋˋˋjs class CustomSinCurve extends THREE.Curve { getPoint( t, optionalTarget = new THREE.Vector3() ) { const tx = t * 3 - 1.5; const ty = Math.sin( 2 * Math.PI * t ); const tz = 0; return optionalTarget.set( tx, ty, tz ); } } const path = new CustomSinCurve( 10 ); const geometry = new THREE.TubeGeometry( path, 20, 2, 8, false ); const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); const mesh = new THREE.Mesh( geometry, material ); scene.add( mesh ); ˋˋˋ @augments BufferGeometry @demo scenes/geometry-browser.html#TubeGeometry。父类 `BufferGeometry`。

- `constructor(e=new QuadraticBezierCurve3(new Vector3(-1,-1,0),new Vector3(-1,1,0),new Vector3(1,1,0)), t=64, n=1, r=8, i=!1)` [源码:13506](../../eyes/src/vendor/three/core.js#L13506)：path、tubularSegments=64、radius=1、radialSegments=8、closed=false。沿 path.getPointAt（弧长参数）采样，Frenet normals/binormals 组合 -cos 和 sin 得径向法线，顶点=路径点+radius*法线；每圈重复 seam 顶点。this.tangents/normals/binormals 持有 frame 数组，输入 path 保留引用。
- `copy(source)` [源码:13550](../../eyes/src/vendor/three/core.js#L13550)：当前操作：写入 parameters；返回 super.copy(source),this.parameters=Object.assign({},source.parameters),this。
- `toJSON()` [源码:13553](../../eyes/src/vendor/three/core.js#L13553)：当前操作：写入 无直接字段写入；返回 data.path=this.parameters.path.toJSON(),data。
- `static fromJSON(data)` [源码:13564](../../eyes/src/vendor/three/core.js#L13564)：Factory method for creating an instance of this class from the given JSON object. @param {Object} data - A JSON object representing the serialized geometry. @return {TubeGeometry} A new instance.

### `WireframeGeometry`

Can be used as a helper object to visualize a geometry as a wireframe. ˋˋˋjs const geometry = new THREE.SphereGeometry(); const wireframe = new THREE.WireframeGeometry( geometry ); const line = new THREE.LineSegments( wireframe ); line.material.depthWrite = false; line.material.opacity = 0.25; line.material.transparent = true; scene.add( line ); ˋˋˋ Note: It is not yet possible to serialize/deserialize instances of this class. @augments BufferGeometry。父类 `BufferGeometry`。

- `constructor(e=null)` [源码:13590](../../eyes/src/vendor/three/core.js#L13590)：对 indexed geometry 按 groups（空则全范围）、non-indexed 按每三位置为面，提取三条边。Yo 用两端点完整坐标字符串同时记录正反 hash，首次边才输出两个顶点；不进行角阈值或 1e-4 焊接。结果自有非索引 position；geometry=null 生成空对象。
- `copy(source)` [源码:13627](../../eyes/src/vendor/three/core.js#L13627)：当前操作：写入 parameters；返回 super.copy(source),this.parameters=Object.assign({},source.parameters),this。

### `ShadowMaterial`

This material can receive shadows, but otherwise is completely transparent. ˋˋˋjs const geometry = new THREE.PlaneGeometry( 2000, 2000 ); geometry.rotateX( - Math.PI / 2 ); const material = new THREE.ShadowMaterial(); material.opacity = 0.2; const plane = new THREE.Mesh( geometry, material ); plane.position.y = -200; plane.receiveShadow = true; scene.add( plane ); ˋˋˋ @augments Material。父类 `Material`。

- `constructor(parameters)` [源码:13680](../../eyes/src/vendor/three/core.js#L13680)：当前操作：写入 color、fog、isShadowMaterial、transparent、type；返回 无显式返回。
- `copy(source)` [源码:13683](../../eyes/src/vendor/three/core.js#L13683)：当前操作：写入 fog；返回 super.copy(source),this.color.copy(source.color),this.fog=source.fog,this。

### `ShaderMaterial`

用户 GLSL shader 和自动内置声明材质；其参数由渲染器选择 shader 特性并上传 uniform。父类 `Material`。

- `constructor(e)` [源码:13729](../../eyes/src/vendor/three/core.js#L13729)：初始化新 defines/uniforms/uniformsGroups，默认顶点 shader 为投影*modelView*position、片元为不透明红色；line/wireframe 默认宽1，fog/lights/clipping=false，forceSinglePass=true。extensions 两个布尔开关默认false，缺省 color=[1,1,1]、uv/uv1=[0,0]，glslVersion=null。官方引用默认 shader 常量，本地内嵌同样文字。
- `copy(e)` [源码:13740](../../eyes/src/vendor/three/core.js#L13740)：先父类复制；uniforms 用 cloneUniforms，uniformsGroups 每组.clone，避免这些容器直接共享；defines/extensions/defaultAttributeValues 仅 Object.assign 浅拷贝（嵌套缺省数组仍共享）。shader 字符串与线框、灯光、裁剪、GLSL 等标志赋值，返回 this。不能把“copy”描述为所有纹理和数组均深拷贝。
- `toJSON(e)` [源码:13748](../../eyes/src/vendor/three/core.js#L13748)：为每个 uniform.value 按 Texture/Color/Vector2/3/4/Matrix3/4 写 type t/c/v2/v3/v4/m3/m4 与 UUID/hex/数组，其余保留 value。纹理通过 toJSON(meta) 进入资源缓存。非空 defines、shader 字符串、lights/clipping 与仅 true 的 extensions 保存；返回父结果扩展对象，不保存 uniform 的其他任意字段。
- `fromJSON(e, t)` [源码:13784](../../eyes/src/vendor/three/core.js#L13784)：先父类恢复；按 uniform type 新建 Color/向量/矩阵，texture 按传入纹理 UUID 字典取共享引用，缺失为 null；无 type 直接赋 value。可选 defines 直接引用 json 对象，extensions 合并现有对象，shader/glsl/lights/clipping 有字段才替换。返回 this，不清除 JSON 未列出的已有 uniforms。

### `RawShaderMaterial`

由用户完全控制 shader 声明材质；其参数由渲染器选择 shader 特性并上传 uniform。父类 `ShaderMaterial`。

- `constructor(parameters)` [源码:13818](../../eyes/src/vendor/three/core.js#L13818)：当前操作：写入 isRawShaderMaterial、type；返回 无显式返回。

### `MeshStandardMaterial`

金属度/粗糙度 PBR材质；其参数由渲染器选择 shader 特性并上传 uniform。父类 `Material`。

- `constructor(e)` [源码:13824](../../eyes/src/vendor/three/core.js#L13824)：STANDARD define，白 color、roughness=1、metalness=0、黑 emissive；所有 map 默认null，normalScale=(1,1)，切线空间 normalMap，displacementScale=1/bias=0，光照/环境强度1，独有 envMapRotation Euler，fog=true、wireframe/flatShading=false。setValues 应用参数；不是在构造时加载或拥有贴图像素。
- `copy(e)` [源码:13830](../../eyes/src/vendor/three/core.js#L13830)：重置 STANDARD define，color/emissive/normalScale/envMapRotation 使用已有对象.copy 保持目的引用；map、lightMap、aoMap、emissiveMap、normal/roughness/metalness/alpha/env 等纹理字段直接共享源引用。数值/线框/fog 标志赋值并返回 this；不会 clone 或 dispose 贴图。

### `MeshPhysicalMaterial`

An extension of the {@link MeshStandardMaterial}, providing more advanced physically-based rendering properties: - Anisotropy: Ability to represent the anisotropic property of materials as observable with brushed metals. - Clearcoat: Some materials — like car paints, carbon fiber, and wet surfaces — require a clear, reflective layer on top of another layer that may be irregular or rough. Clearcoat approximates this effect, without the need for a separate transparent surface. - Iridescence: Allows to render the effect where hue varies depending on the viewing angle and illumination angle. This can be seen on soap bubbles, oil films, or on the wings of many insects. - Physically-based transparency: One limitation of {@link Material#opacity} is that highly transparent materials are less reflective. Physically-based transmission provides a more realistic option for thin, transparent surfaces like glass. - Advanced reflectivity: More flexible reflectivity for non-metallic materials. - Sheen: Can be used for representing cloth and fabric materials. As a result of these complex shading features, ˋMeshPhysicalMaterialˋ has a higher performance cost, per pixel, than other three.js materials. Most effects are disabled by default, and add cost as they are enabled. For best results, always specify an environment map when using this material. @augments MeshStandardMaterial @demo scenes/material-browser.html#MeshPhysicalMaterial。父类 `MeshStandardMaterial`。

- `constructor(e)` [源码:13864](../../eyes/src/vendor/three/core.js#L13864)：基于 Standard，增加 STANDARD+PHYSICAL，ior=1.5、reflectivity getter=clamp(2.5*(ior-1)/(ior+1),0,1)，setter 反算 ior。薄膜 IOR=1.3、厚度范围[100,400]，clearcoatNormalScale=(1,1)、sheenColor黑、attenuationColor/specularColor白、attenuationDistance=Infinity；内部 anisotropy/clearcoat/dispersion/iridescence/sheen/transmission 初值0，maps 为null，最后 setValues。反射率不是独立存储字段。
- `get anisotropy()` [源码:13877](../../eyes/src/vendor/three/core.js#L13877)：当前操作：写入 无直接字段写入；返回 this._anisotropy。
- `set anisotropy(value)` [源码:13880](../../eyes/src/vendor/three/core.js#L13880)：当前操作：写入 _anisotropy、version；返回 无显式返回。
- `get clearcoat()` [源码:13883](../../eyes/src/vendor/three/core.js#L13883)：当前操作：写入 无直接字段写入；返回 this._clearcoat。
- `set clearcoat(value)` [源码:13886](../../eyes/src/vendor/three/core.js#L13886)：当前操作：写入 _clearcoat、version；返回 无显式返回。
- `get iridescence()` [源码:13889](../../eyes/src/vendor/three/core.js#L13889)：当前操作：写入 无直接字段写入；返回 this._iridescence。
- `set iridescence(value)` [源码:13892](../../eyes/src/vendor/three/core.js#L13892)：当前操作：写入 _iridescence、version；返回 无显式返回。
- `get dispersion()` [源码:13895](../../eyes/src/vendor/three/core.js#L13895)：当前操作：写入 无直接字段写入；返回 this._dispersion。
- `set dispersion(value)` [源码:13898](../../eyes/src/vendor/three/core.js#L13898)：当前操作：写入 _dispersion、version；返回 无显式返回。
- `get sheen()` [源码:13901](../../eyes/src/vendor/three/core.js#L13901)：当前操作：写入 无直接字段写入；返回 this._sheen。
- `set sheen(value)` [源码:13904](../../eyes/src/vendor/three/core.js#L13904)：当前操作：写入 _sheen、version；返回 无显式返回。
- `get transmission()` [源码:13907](../../eyes/src/vendor/three/core.js#L13907)：当前操作：写入 无直接字段写入；返回 this._transmission。
- `set transmission(value)` [源码:13910](../../eyes/src/vendor/three/core.js#L13910)：当前操作：写入 _transmission、version；返回 无显式返回。
- `copy(e)` [源码:13914](../../eyes/src/vendor/three/core.js#L13914)：先 Standard.copy，重置两 define；通过公开属性赋 anisotropy/clearcoat/dispersion/iridescence/sheen/transmission（会走各 setter），复制 ior、厚度、衰减与 specular 标量。颜色与 clearcoatNormalScale 用 copy，iridescenceThicknessRange 展开成新数组，所有 map 共享引用。返回 this，不把整个物理材质字段统称深拷贝。

### `MeshPhongMaterial`

A material for shiny surfaces with specular highlights. The material uses a non-physically based [Blinn-Phong](https://en.wikipedia.org/wiki/Blinn-Phong_shading_model) model for calculating reflectance. Unlike the Lambertian model used in the {@link MeshLambertMaterial} this can simulate shiny surfaces with specular highlights (such as varnished wood). ˋMeshPhongMaterialˋ uses per-fragment shading. Performance will generally be greater when using this material over the {@link MeshStandardMaterial} or {@link MeshPhysicalMaterial}, at the cost of some graphical accuracy. @augments Material @demo scenes/material-browser.html#MeshPhongMaterial。父类 `Material`。

- `constructor(parameters)` [源码:13937](../../eyes/src/vendor/three/core.js#L13937)：当前操作：写入 alphaMap、aoMap、aoMapIntensity、bumpMap、bumpScale、color、combine、displacementBias、displacementMap、displacementScale、emissive、emissiveIntensity、emissiveMap、envMap、envMapIntensity、envMapRotation、flatShading、fog、isMeshPhongMaterial、lightMap、lightMapIntensity、map、normalMap、normalMapType、normalScale、reflectivity、refractionRatio、shininess、specular、specularMap、type、wireframe、wireframeLinecap、wireframeLinejoin、wireframeLinewidth；返回 无显式返回。
- `copy(source)` [源码:13940](../../eyes/src/vendor/three/core.js#L13940)：当前操作：写入 alphaMap、aoMap、aoMapIntensity、bumpMap、bumpScale、combine、displacementBias、displacementMap、displacementScale、emissiveIntensity、emissiveMap、envMap、envMapIntensity、flatShading、fog、lightMap、lightMapIntensity、map、normalMap、normalMapType、reflectivity、refractionRatio、shininess、specularMap、wireframe、wireframeLinecap、wireframeLinejoin、wireframeLinewidth；返回 super.copy(source),this.color.copy(source.color),this.specular.copy(source.specular),this.shininess=source.shininess,this.map=source.map,this.lightMap=source.lightMap,this.lightMapIntensity=source.lightMapIntensity,this.。

### `MeshToonMaterial`

A material implementing toon shading. @augments Material @demo scenes/material-browser.html#MeshToonMaterial。父类 `Material`。

- `constructor(e)` [源码:13952](../../eyes/src/vendor/three/core.js#L13952)：TOON define、白 color、黑 emissive，新增 gradientMap=null；保留 map/lightMap/ao/emissive/bump/normal/displacement/alpha 贴图字段与强度/尺度，normalScale=(1,1)，fog=true、wireframe=false，最后 setValues。没有 Standard 的 roughness/metalness/envMap 参数系统。
- `copy(source)` [源码:13957](../../eyes/src/vendor/three/core.js#L13957)：当前操作：写入 alphaMap、aoMap、aoMapIntensity、bumpMap、bumpScale、displacementBias、displacementMap、displacementScale、emissiveIntensity、emissiveMap、fog、gradientMap、lightMap、lightMapIntensity、map、normalMap、normalMapType、wireframe、wireframeLinecap、wireframeLinejoin、wireframeLinewidth；返回 super.copy(source),this.color.copy(source.color),this.map=source.map,this.gradientMap=source.gradientMap,this.lightMap=source.lightMap,this.lightMapIntensity=source.lightMapIntensity,this.aoMap=source.aoMap,this.aoMapInt。

### `MeshNormalMaterial`

A material that maps the normal vectors to RGB colors. @augments Material @demo scenes/material-browser.html#MeshNormalMaterial。父类 `Material`。

- `constructor(parameters)` [源码:13968](../../eyes/src/vendor/three/core.js#L13968)：当前操作：写入 bumpMap、bumpScale、displacementBias、displacementMap、displacementScale、flatShading、isMeshNormalMaterial、normalMap、normalMapType、normalScale、type、wireframe、wireframeLinewidth；返回 无显式返回。
- `copy(source)` [源码:13971](../../eyes/src/vendor/three/core.js#L13971)：当前操作：写入 bumpMap、bumpScale、displacementBias、displacementMap、displacementScale、flatShading、normalMap、normalMapType、wireframe、wireframeLinewidth；返回 super.copy(source),this.bumpMap=source.bumpMap,this.bumpScale=source.bumpScale,this.normalMap=source.normalMap,this.normalMapType=source.normalMapType,this.normalScale.copy(source.normalScale),this.displacementMap=source。

### `MeshLambertMaterial`

A material for non-shiny surfaces, without specular highlights. The material uses a non-physically based [Lambertian](https://en.wikipedia.org/wiki/Lambertian_reflectance) model for calculating reflectance. This can simulate some surfaces (such as untreated wood or stone) well, but cannot simulate shiny surfaces with specular highlights (such as varnished wood). ˋMeshLambertMaterialˋ uses per-fragment shading. Due to the simplicity of the reflectance and illumination models, performance will be greater when using this material over the {@link MeshPhongMaterial}, {@link MeshStandardMaterial} or {@link MeshPhysicalMaterial}, at the cost of some graphical accuracy. @augments Material @demo scenes/material-browser.html#MeshLambertMaterial。父类 `Material`。

- `constructor(parameters)` [源码:13993](../../eyes/src/vendor/three/core.js#L13993)：当前操作：写入 alphaMap、aoMap、aoMapIntensity、bumpMap、bumpScale、color、combine、displacementBias、displacementMap、displacementScale、emissive、emissiveIntensity、emissiveMap、envMap、envMapIntensity、envMapRotation、flatShading、fog、isMeshLambertMaterial、lightMap、lightMapIntensity、map、normalMap、normalMapType、normalScale、reflectivity、refractionRatio、specularMap、type、wireframe、wireframeLinecap、wireframeLinejoin、wireframeLinewidth；返回 无显式返回。
- `copy(source)` [源码:13996](../../eyes/src/vendor/three/core.js#L13996)：当前操作：写入 alphaMap、aoMap、aoMapIntensity、bumpMap、bumpScale、combine、displacementBias、displacementMap、displacementScale、emissiveIntensity、emissiveMap、envMap、envMapIntensity、flatShading、fog、lightMap、lightMapIntensity、map、normalMap、normalMapType、reflectivity、refractionRatio、specularMap、wireframe、wireframeLinecap、wireframeLinejoin、wireframeLinewidth；返回 super.copy(source),this.color.copy(source.color),this.map=source.map,this.lightMap=source.lightMap,this.lightMapIntensity=source.lightMapIntensity,this.aoMap=source.aoMap,this.aoMapIntensity=source.aoMapIntensity,this.em。

### `MeshDepthMaterial`

A material for drawing geometry by depth. Depth is based off of the camera near and far plane. White is nearest, black is farthest. @augments Material @demo scenes/material-browser.html#MeshDepthMaterial。父类 `Material`。

- `constructor(parameters)` [源码:14008](../../eyes/src/vendor/three/core.js#L14008)：当前操作：写入 alphaMap、depthPacking、displacementBias、displacementMap、displacementScale、isMeshDepthMaterial、map、type、wireframe、wireframeLinewidth；返回 无显式返回。
- `copy(source)` [源码:14011](../../eyes/src/vendor/three/core.js#L14011)：当前操作：写入 alphaMap、depthPacking、displacementBias、displacementMap、displacementScale、map、wireframe、wireframeLinewidth；返回 super.copy(source),this.depthPacking=source.depthPacking,this.map=source.map,this.alphaMap=source.alphaMap,this.displacementMap=source.displacementMap,this.displacementScale=source.displacementScale,this.displacementBias。

### `MeshDistanceMaterial`

A material used internally for implementing shadow mapping with point lights. Can also be used to customize the shadow casting of an object by assigning an instance of ˋMeshDistanceMaterialˋ to {@link Object3D#customDistanceMaterial}. The following examples demonstrates this approach in order to ensure transparent parts of objects do not cast shadows. @augments Material。父类 `Material`。

- `constructor(parameters)` [源码:14027](../../eyes/src/vendor/three/core.js#L14027)：当前操作：写入 alphaMap、displacementBias、displacementMap、displacementScale、isMeshDistanceMaterial、map、type；返回 无显式返回。
- `copy(source)` [源码:14030](../../eyes/src/vendor/three/core.js#L14030)：当前操作：写入 alphaMap、displacementBias、displacementMap、displacementScale、map；返回 super.copy(source),this.map=source.map,this.alphaMap=source.alphaMap,this.displacementMap=source.displacementMap,this.displacementScale=source.displacementScale,this.displacementBias=source.displacementBias,this。

### `MeshMatcapMaterial`

以视空间法线查表采样 Matcap材质；其参数由渲染器选择 shader 特性并上传 uniform。父类 `Material`。

- `constructor(e)` [源码:14036](../../eyes/src/vendor/three/core.js#L14036)：MATCAP define，白 color，matcap 与 map/bump/normal/displacement/alphaMap 为null，切线空间法线与 normalScale=(1,1)，wireframe=false、flatShading=false、fog=true，setValues 应用参数。matcap 是引用而非生成的环境立方纹理。
- `copy(e)` [源码:14042](../../eyes/src/vendor/three/core.js#L14042)：父类复制后重建 MATCAP define；color/normalScale 原位.copy，其余 matcap 和各贴图引用直接赋值，复制 bump/displacement、线宽、flatShading/fog 等标量，返回 this。不会克隆 matcap Texture。

### `LineDashedMaterial`

A material for rendering line primitives. Materials define the appearance of renderable 3D objects. ˋˋˋjs const material = new THREE.LineDashedMaterial( { color: 0xffffff, scale: 1, dashSize: 3, gapSize: 1, } ); ˋˋˋ @augments LineBasicMaterial。父类 `LineBasicMaterial`。

- `constructor(parameters)` [源码:14065](../../eyes/src/vendor/three/core.js#L14065)：当前操作：写入 dashSize、gapSize、isLineDashedMaterial、scale、type；返回 无显式返回。
- `copy(source)` [源码:14068](../../eyes/src/vendor/three/core.js#L14068)：当前操作：写入 dashSize、gapSize、scale；返回 super.copy(source),this.scale=source.scale,this.dashSize=source.dashSize,this.gapSize=source.gapSize,this。

### `AnimationUtils`

A class with various methods to assist with animations. @hideconstructor。父类 `无`。

- `static convertArray(array, type)` [源码:14124](../../eyes/src/vendor/three/core.js#L14124)：Converts an array to a specific type @static @param {TypedArray\|Array} array - The array to convert. @param {TypedArray.constructor} type - The constructor of a type array. @return {TypedArray} The converted array
- `static isTypedArray(object)` [源码:14134](../../eyes/src/vendor/three/core.js#L14134)：Returns ˋtrueˋ if the given object is a typed array. @static @param {any} object - The object to check. @return {boolean} Whether the given object is a typed array.
- `static getKeyframeOrder(times)` [源码:14144](../../eyes/src/vendor/three/core.js#L14144)：Returns an array by which times and values can be sorted. @static @param {Array<number>} times - The keyframe time values. @return {Array<number>} The array.
- `static sortedArray(values, stride, order)` [源码:14156](../../eyes/src/vendor/three/core.js#L14156)：Sorts the given array by the previously computed order via ˋgetKeyframeOrder()ˋ. @static @param {Array<number>} values - The values to sort. @param {number} stride - The stride. @param {Array<number>} order - The sort order. @return {Array<number>} The sorted values.
- `static flattenJSON(jsonKeys, times, values, valuePropertyName)` [源码:14168](../../eyes/src/vendor/three/core.js#L14168)：Used for parsing AOS keyframe formats. @static @param {Array<number>} jsonKeys - A list of JSON keyframes. @param {Array<number>} times - This array will be filled with keyframe times by this method. @param {Array<number>} values - This array will be filled with keyframe values by this method. @param {string} valuePropertyName - The name of the property to use.
- `static subclip(e, t, n, r, i=30)` [源码:14172](../../eyes/src/vendor/three/core.js#L14172)：克隆 sourceClip、改 name，逐轨选择 times*fps 在 [startFrame,endFrame) 的键，按 getValueSize 复制对应值，剔除没有键的轨道并保持原 times/values 构造类型。求所有首键最小时间，所有轨统一 shift 到该时间为0，再 resetDuration。返回新 clip，不改源；不在剪切边界插入补偿采样。
- `static makeClipAdditive(e, t=0, n=e, r=30)` [源码:14199](../../eyes/src/vendor/three/core.js#L14199)：原位修改 targetClip，referenceFrame/fps（fps<=0回退30）选参考时刻，按 name+ValueTypeName 匹配轨道，bool/string 跳过。越界用端点，否则插值参考值；GLTF cubic spline 跳过两侧切线槽。referenceClip 默认 target，调用会改变目标 values。

### `Interpolant`

Abstract base class of interpolants over parametric samples. The parameter domain is one dimensional, typically the time or a path along a curve defined by the data. The sample values can have any dimensionality and derived classes may apply special interpretations to the data. This class provides the interval seek in a Template Method, deferring the actual interpolation to derived classes. Time complexity is O(1) for linear access crossing at most two points and O(log N) for random access, where N is the number of positions. References: {@link http://www.oodesign.com/template-method-pattern.html} @abstract。父类 `无`。

- `constructor(parameterPositions, sampleValues, sampleSize, resultBuffer)` [源码:14268](../../eyes/src/vendor/three/core.js#L14268)：当前操作：写入 DefaultSettings_、_cachedIndex、parameterPositions、resultBuffer、sampleValues、settings、valueSize；返回 无显式返回。
- `evaluate(e)` [源码:14272](../../eyes/src/vendor/three/core.js#L14272)：维护 _cachedIndex；从缓存区间向前/后最多短扫，远跳再二分有序 parameterPositions。范围外复制首/末采样值，区间改变才 intervalChanged_，有效区间交给 interpolate_。本地单字母 label 对应控制流跳转，不能因 label 名差异称为算法差异。
- `getSettings_()` [源码:14322](../../eyes/src/vendor/three/core.js#L14322)：Returns the interpolation settings. @return {Object} The interpolation settings.
- `copySampleValue_(index)` [源码:14325](../../eyes/src/vendor/three/core.js#L14325)：当前操作：写入 无直接字段写入；返回 result。
- `interpolate_()` [源码:14333](../../eyes/src/vendor/three/core.js#L14333)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `intervalChanged_()` [源码:14343](../../eyes/src/vendor/three/core.js#L14343)：Optional method that is executed when the interval has changed. @param {number} i1 - An index into the sample value buffer. @param {number} t0 - The previous interpolation factor. @param {number} t - The current interpolation factor.

### `CubicInterpolant`

Fast and simple cubic spline interpolant. It was derived from a Hermitian construction setting the first derivative at each sample position to the linear slope between neighboring positions over their parameter interval. @augments Interpolant。父类 `Interpolant`。

- `constructor(parameterPositions, sampleValues, sampleSize, resultBuffer)` [源码:14363](../../eyes/src/vendor/three/core.js#L14363)：Constructs a new cubic interpolant. @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors. @param {TypedArray} sampleValues - The sample values. @param {number} sampleSize - The sample size @param {TypedArray} [resultBuffer] - The result buffer.
- `intervalChanged_(i1, t0, t1)` [源码:14369](../../eyes/src/vendor/three/core.js#L14369)：当前操作：写入 _offsetNext、_offsetPrev、_weightNext、_weightPrev；返回 无显式返回。
- `interpolate_(i1, t0, t, t1)` [源码:14399](../../eyes/src/vendor/three/core.js#L14399)：当前操作：写入 无直接字段写入；返回 result。

### `LinearInterpolant`

A basic linear interpolant. @augments Interpolant。父类 `Interpolant`。

- `constructor(parameterPositions, sampleValues, sampleSize, resultBuffer)` [源码:14434](../../eyes/src/vendor/three/core.js#L14434)：Constructs a new linear interpolant. @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors. @param {TypedArray} sampleValues - The sample values. @param {number} sampleSize - The sample size @param {TypedArray} [resultBuffer] - The result buffer.
- `interpolate_(i1, t0, t, t1)` [源码:14437](../../eyes/src/vendor/three/core.js#L14437)：当前操作：写入 无直接字段写入；返回 result。

### `DiscreteInterpolant`

Interpolant that evaluates to the sample value at the position preceding the parameter. @augments Interpolant。父类 `Interpolant`。

- `constructor(parameterPositions, sampleValues, sampleSize, resultBuffer)` [源码:14464](../../eyes/src/vendor/three/core.js#L14464)：Constructs a new discrete interpolant. @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors. @param {TypedArray} sampleValues - The sample values. @param {number} sampleSize - The sample size @param {TypedArray} [resultBuffer] - The result buffer.
- `interpolate_(i1)` [源码:14467](../../eyes/src/vendor/three/core.js#L14467)：当前操作：写入 无直接字段写入；返回 this.copySampleValue_(i1-1)。

### `BezierInterpolant`

Bezier 插值算法；对关键帧区间求连续或离散值。父类 `Interpolant`。

- `interpolate_(e, t, n, r)` [源码:14473](../../eyes/src/vendor/three/core.js#L14473)：输入右键索引、两端时间和请求时间；缺 in/outTangents 时按时间线性插值。每分量切线是控制点(time,value)对；以归一时间初值解 x(s)=t，最多8次 Newton，残差/导数阈值1e-10，每步 clamp s∈[0,1]，再以 cubic Bernstein 求 y。没有二分兜底或保证任意非单调时间控制点收敛。

### `KeyframeTrack`

Represents a timed sequence of keyframes, which are composed of lists of times and related values, and which are used to animate a specific property of an object.。父类 `无`。

- `constructor(name, times, values, interpolation)` [源码:14523](../../eyes/src/vendor/three/core.js#L14523)：当前操作：写入 name、times、values；返回 无显式返回。
- `static toJSON(e)` [源码:14529](../../eyes/src/vendor/three/core.js#L14529)：若具体构造器有自己的 toJSON 则委派；否则保存 name 及转换成普通 Array 的 times/values，插值非默认才保存 interpolation；最后补 ValueTypeName 为 type。返回对象，typed array 转换不是 JSON 字符串化。
- `InterpolantFactoryMethodDiscrete(result)` [源码:14550](../../eyes/src/vendor/three/core.js#L14550)：Factory method for creating a new discrete interpolant. @static @param {TypedArray} [result] - The result buffer. @return {DiscreteInterpolant} The new interpolant.
- `InterpolantFactoryMethodLinear(result)` [源码:14560](../../eyes/src/vendor/three/core.js#L14560)：Factory method for creating a new linear interpolant. @static @param {TypedArray} [result] - The result buffer. @return {LinearInterpolant} The new interpolant.
- `InterpolantFactoryMethodSmooth(result)` [源码:14570](../../eyes/src/vendor/three/core.js#L14570)：Factory method for creating a new smooth interpolant. @static @param {TypedArray} [result] - The result buffer. @return {CubicInterpolant} The new interpolant.
- `InterpolantFactoryMethodBezier(result)` [源码:14585](../../eyes/src/vendor/three/core.js#L14585)：Factory method for creating a new Bezier interpolant. The Bezier interpolant requires tangent data to be set via the ˋsettingsˋ property on the track before creating the interpolant. The settings should contain: - ˋinTangentsˋ: Float32Array with [time, value] pairs per keyframe per component - ˋoutTangentsˋ: Float32Array with [time, value] pairs per keyframe per component @static @param {TypedArray} [result] - The result buffer. @return {BezierInterpolant} The new interpolant.
- `setInterpolation(e)` [源码:14590](../../eyes/src/vendor/three/core.js#L14590)：枚举 Discrete/Linear/Smooth/Bezier 选实例插值工厂。不可用时，若还没工厂且请求非默认则递归设默认；默认也不支持时抛错，否则警告保留已有工厂。成功设 createInterpolant 并返回 this；不是立即创建插值器。
- `getInterpolation()` [源码:14620](../../eyes/src/vendor/three/core.js#L14620)：Returns the current interpolation type. @return {(InterpolateLinear\|InterpolateDiscrete\|InterpolateSmooth\|InterpolateBezier)} The interpolation type.
- `getValueSize()` [源码:14637](../../eyes/src/vendor/three/core.js#L14637)：Returns the value size. @return {number} The value size.
- `shift(timeOffset)` [源码:14640](../../eyes/src/vendor/three/core.js#L14640)：当前操作：写入 无直接字段写入；返回 this。
- `scale(timeScale)` [源码:14647](../../eyes/src/vendor/three/core.js#L14647)：当前操作：写入 无直接字段写入；返回 this。
- `trim(e, t)` [源码:14655](../../eyes/src/vendor/three/core.js#L14655)：去掉 startTime 前、endTime 后的键，端点等于边界保留；times.slice 与 values 按 valueSize 切片。若区间空，强制至少保留一个键（已有轨道的边界邻近项），避免产生空轨。返回 this，不将剩余时间归零，不生成边界插值键。
- `validate()` [源码:14670](../../eyes/src/vendor/three/core.js#L14670)：检查 values/time 个数比为整数、times 非空、时间数值不是 NaN且非降序；typed array 的 values 逐个检查 NaN。发现错误记录 error 并返回 false，否则 true。不要求严格递增、不拒绝 Infinity，也不是完整类型/维度 schema 验证。
- `optimize()` [源码:14701](../../eyes/src/vendor/three/core.js#L14701)：先复制 times/values，再用读写指针删除同一时间冗余键和中间连续相等值。Smooth 模式保留值相同的中间关键点以免改曲线；首尾规则单独保留最后键。按 stride 搬值、裁掉尾部，赋回新的数组，返回 this，不修改调用前数组本体。
- `clone()` [源码:14741](../../eyes/src/vendor/three/core.js#L14741)：times/values 分别.slice，新建 this.constructor(name,times,values)，再保留源 createInterpolant 工厂引用。返回新具体轨道，不只是基类；构造器的其他附加自定义状态不在这里统一复制。

### `BooleanKeyframeTrack`

A track for boolean keyframe values. @augments KeyframeTrack。父类 `KeyframeTrack`。

- `constructor(name, times, values)` [源码:14765](../../eyes/src/vendor/three/core.js#L14765)：Constructs a new boolean keyframe track. This keyframe track type has no ˋinterpolationˋ parameter because the interpolation is always discrete. @param {string} name - The keyframe track's name. @param {Array<number>} times - A list of keyframe times. @param {Array<boolean>} values - A list of keyframe values.

### `ColorKeyframeTrack`

A track for color keyframe values. @augments KeyframeTrack。父类 `KeyframeTrack`。

- `constructor(name, times, values, interpolation)` [源码:14784](../../eyes/src/vendor/three/core.js#L14784)：Constructs a new color keyframe track. @param {string} name - The keyframe track's name. @param {Array<number>} times - A list of keyframe times. @param {Array<number>} values - A list of keyframe values. @param {(InterpolateLinear\|InterpolateDiscrete\|InterpolateSmooth)} [interpolation] - The interpolation type.

### `NumberKeyframeTrack`

A track for numeric keyframe values. @augments KeyframeTrack。父类 `KeyframeTrack`。

- `constructor(name, times, values, interpolation)` [源码:14803](../../eyes/src/vendor/three/core.js#L14803)：Constructs a new number keyframe track. @param {string} name - The keyframe track's name. @param {Array<number>} times - A list of keyframe times. @param {Array<number>} values - A list of keyframe values. @param {(InterpolateLinear\|InterpolateDiscrete\|InterpolateSmooth)} [interpolation] - The interpolation type.

### `QuaternionLinearInterpolant`

Spherical linear unit quaternion interpolant. @augments Interpolant。父类 `Interpolant`。

- `constructor(parameterPositions, sampleValues, sampleSize, resultBuffer)` [源码:14822](../../eyes/src/vendor/three/core.js#L14822)：Constructs a new SLERP interpolant. @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors. @param {TypedArray} sampleValues - The sample values. @param {number} sampleSize - The sample size @param {TypedArray} [resultBuffer] - The result buffer.
- `interpolate_(i1, t0, t, t1)` [源码:14825](../../eyes/src/vendor/three/core.js#L14825)：当前操作：写入 无直接字段写入；返回 result。

### `QuaternionKeyframeTrack`

A track for Quaternion keyframe values. @augments KeyframeTrack。父类 `KeyframeTrack`。

- `constructor(name, times, values, interpolation)` [源码:14849](../../eyes/src/vendor/three/core.js#L14849)：Constructs a new Quaternion keyframe track. @param {string} name - The keyframe track's name. @param {Array<number>} times - A list of keyframe times. @param {Array<number>} values - A list of keyframe values. @param {(InterpolateLinear\|InterpolateDiscrete\|InterpolateSmooth)} [interpolation] - The interpolation type.
- `InterpolantFactoryMethodLinear(result)` [源码:14859](../../eyes/src/vendor/three/core.js#L14859)：Overwritten so the method returns Quaternion based interpolant. @static @param {TypedArray} [result] - The result buffer. @return {QuaternionLinearInterpolant} The new interpolant.

### `StringKeyframeTrack`

A track for string keyframe values. @augments KeyframeTrack。父类 `KeyframeTrack`。

- `constructor(name, times, values)` [源码:14880](../../eyes/src/vendor/three/core.js#L14880)：Constructs a new string keyframe track. This keyframe track type has no ˋinterpolationˋ parameter because the interpolation is always discrete. @param {string} name - The keyframe track's name. @param {Array<number>} times - A list of keyframe times. @param {Array<string>} values - A list of keyframe values.

### `VectorKeyframeTrack`

A track for vector keyframe values. @augments KeyframeTrack。父类 `KeyframeTrack`。

- `constructor(name, times, values, interpolation)` [源码:14899](../../eyes/src/vendor/three/core.js#L14899)：Constructs a new vector keyframe track. @param {string} name - The keyframe track's name. @param {Array<number>} times - A list of keyframe times. @param {Array<number>} values - A list of keyframe values. @param {(InterpolateLinear\|InterpolateDiscrete\|InterpolateSmooth)} [interpolation] - The interpolation type.

### `AnimationClip`

A reusable set of keyframe tracks which represent an animation.。父类 `无`。

- `constructor(name="", duration=-1, tracks=[], blendMode=NormalAnimationBlendMode)` [源码:14908](../../eyes/src/vendor/three/core.js#L14908)：当前操作：写入 blendMode、duration、name、tracks、userData、uuid；返回 无显式返回。
- `static parse(json)` [源码:14911](../../eyes/src/vendor/three/core.js#L14911)：当前操作：写入 无直接字段写入；返回 clip.uuid=json.uuid,clip.userData=JSON.parse(json.userData\|\|"{}"),clip。
- `static toJSON(e)` [源码:14920](../../eyes/src/vendor/three/core.js#L14920)：保存 name/duration/uuid/blendMode 与逐轨 KeyframeTrack.toJSON；userData 特别用 JSON.stringify 写成字符串。返回对象而非完整 JSON 文本；不能把 userData 描述成直接共享对象。
- `static CreateFromMorphTargetSequence(e, t, n, r)` [源码:14935](../../eyes/src/vendor/three/core.js#L14935)：每个 morph 名创建权重轨道，循环前一/本/后一帧权重0/1/0，先按时间排序；允许循环且首时间0时补 numMorphTargets 帧首值，再 scale(1/fps) 从帧变秒。轨道路径是 .morphTargetInfluences[name]，新 clip duration=-1 由构造计算；不插入网格或 morph 几何数据。
- `static findByName(objectOrClipArray, name)` [源码:14947](../../eyes/src/vendor/three/core.js#L14947)：当前操作：写入 无直接字段写入；返回 clipArray[i]、null。
- `static CreateClipsFromMorphTargetSequences(morphTargets, fps, noLoop)` [源码:14956](../../eyes/src/vendor/three/core.js#L14956)：当前操作：写入 无直接字段写入；返回 clips。
- `resetDuration()` [源码:14973](../../eyes/src/vendor/three/core.js#L14973)：从0开始取每个轨道最后 times 项的最大值，写 this.duration 并返回 this。依赖轨道时间有序非空；不是扫描全部键，空轨可能传播 NaN。
- `trim()` [源码:14981](../../eyes/src/vendor/three/core.js#L14981)：当前操作：写入 无直接字段写入；返回 this。
- `validate()` [源码:14985](../../eyes/src/vendor/three/core.js#L14985)：当前操作：写入 无直接字段写入；返回 valid。
- `optimize()` [源码:14990](../../eyes/src/vendor/three/core.js#L14990)：当前操作：写入 无直接字段写入；返回 this。
- `clone()` [源码:14994](../../eyes/src/vendor/three/core.js#L14994)：当前操作：写入 无直接字段写入；返回 clip.userData=JSON.parse(JSON.stringify(this.userData)),clip。
- `toJSON()` [源码:15005](../../eyes/src/vendor/three/core.js#L15005)：Serializes this animation clip into JSON. @return {Object} The JSON object.

### `LoadingManager`

Handles and keeps track of loaded and pending data. A default global instance of this class is created and used by loaders if not supplied manually. In general that should be sufficient, however there are times when it can be useful to have separate loaders - for example if you want to show separate loading bars for objects and textures. ˋˋˋjs const manager = new THREE.LoadingManager(); manager.onLoad = () => console.log( 'Loading complete!' ); const loader1 = new OBJLoader( manager ); const loader2 = new ColladaLoader( manager ); ˋˋˋ。父类 `无`。

- `constructor(onLoad, onProgress, onError)` [源码:15088](../../eyes/src/vendor/three/core.js#L15088)：闭包维护 isLoading/loaded/total、URL modifier 和正则/loader 成对数组。itemStart 增总数且首项触发 onStart；itemEnd 增完成数、报 progress，完成等总数触发 onLoad；itemError 只通知。这里加载批次数累计，不是每次 onLoad 后把计数清零。
- `get abortController()` [源码:15121](../../eyes/src/vendor/three/core.js#L15121)：当前操作：写入 _abortController；返回 this._abortController\|\|(this._abortController=new AbortController()),this._abortController。

### `Loader`

Abstract base class for loaders. @abstract。父类 `无`。

- `constructor(manager)` [源码:15132](../../eyes/src/vendor/three/core.js#L15132)：当前操作：写入 crossOrigin、manager、path、requestHeader、resourcePath、withCredentials；返回 无显式返回。
- `load()` [源码:15147](../../eyes/src/vendor/three/core.js#L15147)：This method needs to be implemented by all concrete loaders. It holds the logic for loading assets from the backend. @abstract @param {string} url - The path/URL of the file to be loaded. @param {Function} onLoad - Executed when the loading process has been finished. @param {onProgressCallback} [onProgress] - Executed while the loading is in progress. @param {onErrorCallback} [onError] - Executed when errors occur.
- `loadAsync(url, onProgress)` [源码:15155](../../eyes/src/vendor/three/core.js#L15155)：A async version of {@link Loader#load}. @param {string} url - The path/URL of the file to be loaded. @param {onProgressCallback} [onProgress] - Executed while the loading is in progress. @return {Promise} A Promise that resolves when the asset has been loaded.
- `parse()` [源码:15168](../../eyes/src/vendor/three/core.js#L15168)：This method needs to be implemented by all concrete loaders. It holds the logic for parsing the asset into three.js entities. @abstract @param {any} data - The data to parse.
- `setCrossOrigin(crossOrigin)` [源码:15176](../../eyes/src/vendor/three/core.js#L15176)：Sets the ˋcrossOriginˋ String to implement CORS for loading the URL from a different domain that allows CORS. @param {string} crossOrigin - The ˋcrossOriginˋ value. @return {Loader} A reference to this instance.
- `setWithCredentials(value)` [源码:15188](../../eyes/src/vendor/three/core.js#L15188)：Whether the XMLHttpRequest uses credentials such as cookies, authorization headers or TLS client certificates, see [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials). Note: This setting has no effect if you are loading files locally or from the same domain. @param {boolean} value - The ˋwithCredentialsˋ value. @return {Loader} A reference to this instance.
- `setPath(path)` [源码:15197](../../eyes/src/vendor/three/core.js#L15197)：Sets the base path for the asset. @param {string} path - The base path. @return {Loader} A reference to this instance.
- `setResourcePath(resourcePath)` [源码:15206](../../eyes/src/vendor/three/core.js#L15206)：Sets the base path for dependent resources like textures. @param {string} resourcePath - The resource path. @return {Loader} A reference to this instance.
- `setRequestHeader(requestHeader)` [源码:15216](../../eyes/src/vendor/three/core.js#L15216)：Sets the given request header. @param {Object} requestHeader - A [request header](https://developer.mozilla.org/en-US/docs/Glossary/Request_header) for configuring the HTTP request. @return {Loader} A reference to this instance.
- `abort()` [源码:15225](../../eyes/src/vendor/three/core.js#L15225)：This method can be implemented in loaders for aborting ongoing requests. @abstract @return {Loader} A reference to this instance.

### `HttpError`

携带 HTTP 响应信息的资源加载异常。父类 `Error`。

- `constructor(message, response)` [源码:15232](../../eyes/src/vendor/three/core.js#L15232)：当前操作：写入 response；返回 无显式返回。

### `FileLoader`

A low level class for loading resources with the Fetch API, used internally by most loaders. It can also be used directly to load any file type that does not have a loader. This loader supports caching. If you want to use it, add ˋTHREE.Cache.enabled = true;ˋ once to your application. ˋˋˋjs const loader = new THREE.FileLoader(); const data = await loader.loadAsync( 'example.txt' ); ˋˋˋ @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:15252](../../eyes/src/vendor/three/core.js#L15252)：当前操作：写入 _abortController、mimeType、responseType；返回 无显式返回。
- `load(e, t, n, r)` [源码:15256](../../eyes/src/vendor/three/core.js#L15256)：path 拼接后经 manager.resolveURL；file: 缓存命中异步 setTimeout 回调，正在请求同 URL 则合并回调队列。新 Request 带 headers/credentials，支持时合并本 loader 与 manager 的 abort signals。返回 undefined，不把 Promise 作为此接口的返回值。
- `setResponseType(value)` [源码:15363](../../eyes/src/vendor/three/core.js#L15363)：Sets the expected response type. @param {('arraybuffer'\|'blob'\|'document'\|'json'\|'')} value - The response type. @return {FileLoader} A reference to this file loader.
- `setMimeType(value)` [源码:15372](../../eyes/src/vendor/three/core.js#L15372)：Sets the expected mime type of the loaded file. @param {string} value - The mime type. @return {FileLoader} A reference to this file loader.
- `abort()` [源码:15380](../../eyes/src/vendor/three/core.js#L15380)：Aborts ongoing fetch requests. @return {FileLoader} A reference to this instance.

### `AnimationLoader`

Class for loading animation clips in the JSON format. The files are internally loaded via {@link FileLoader}. ˋˋˋjs const loader = new THREE.AnimationLoader(); const animations = await loader.loadAsync( 'animations/animation.js' ); ˋˋˋ @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:15401](../../eyes/src/vendor/three/core.js#L15401)：Constructs a new animation loader. @param {LoadingManager} [manager] - The loading manager.
- `load(url, onLoad, onProgress, onError)` [源码:15413](../../eyes/src/vendor/three/core.js#L15413)：Starts loading from the given URL and pass the loaded animations as an array holding instances of {@link AnimationClip} to the ˋonLoad()ˋ callback. @param {string} url - The path/URL of the file to be loaded. This can also be a data URI. @param {function(Array<AnimationClip>)} onLoad - Executed when the loading process has been finished. @param {onProgressCallback} onProgress - Executed while the loading is in progress. @param {onErrorCallback} onError - Executed when errors occur.
- `parse(json)` [源码:15430](../../eyes/src/vendor/three/core.js#L15430)：Parses the given JSON object and returns an array of animation clips. @param {Object} json - The serialized animation clips. @return {Array<AnimationClip>} The parsed animation clips.

### `CompressedTextureLoader`

Abstract base class for loading compressed texture formats S3TC, ASTC or ETC. Textures are internally loaded via {@link FileLoader}. Derived classes have to implement the ˋparse()ˋ method which holds the parsing for the respective format. @abstract @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:15455](../../eyes/src/vendor/three/core.js#L15455)：Constructs a new compressed texture loader. @param {LoadingManager} [manager] - The loading manager.
- `load(url, onLoad, onProgress, onError)` [源码:15458](../../eyes/src/vendor/three/core.js#L15458)：当前操作：写入 无直接字段写入；返回 texture。

### `ImageLoader`

A loader for loading images. The class loads images with the HTML ˋImageˋ API. ˋˋˋjs const loader = new THREE.ImageLoader(); const image = await loader.loadAsync( 'image.png' ); ˋˋˋ Please note that ˋImageLoaderˋ has dropped support for progress events in ˋr84ˋ. For an ˋImageLoaderˋ that supports progress events, see [this thread](https://github.com/mrdoob/three.js/issues/10439#issuecomment-275785639). @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:15513](../../eyes/src/vendor/three/core.js#L15513)：Constructs a new image loader. @param {LoadingManager} [manager] - The loading manager.
- `load(e, t, n, r)` [源码:15517](../../eyes/src/vendor/three/core.js#L15517)：image: 缓存完整图用异步回调，未完成的缓存图用 WeakMap 合并回调并返回同 img。新建 img、安装 load/error，非 data URL 才设 crossOrigin，缓存后 itemStart 再设 src；成功清监听、广播并 itemEnd，失败还删除缓存/报 itemError。函数返回 HTMLImageElement，不返回解码后的像素。

### `CubeTextureLoader`

Class for loading cube textures. Images are internally loaded via {@link ImageLoader}. The loader returns an instance of {@link CubeTexture} and expects the cube map to be defined as six separate images representing the sides of a cube. Other cube map definitions like vertical and horizontal cross, column and row layouts are not supported. Note that, by convention, cube maps are specified in a coordinate system in which positive-x is to the right when looking up the positive-z axis -- in other words, using a left-handed coordinate system. Since three.js uses a right-handed coordinate system, environment maps used in three.js will have pos-x and neg-x swapped. The loaded cube texture is in sRGB color space. Meaning {@link Texture#colorSpace} is set to ˋSRGBColorSpaceˋ by default. ˋˋˋjs const loader = new THREE.CubeTextureLoader().setPath( 'textures/cubeMaps/' ); const cubeTexture = await loader.loadAsync( [ 'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png' ] ); scene.background = cubeTexture; ˋˋˋ @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:15590](../../eyes/src/vendor/three/core.js#L15590)：Constructs a new cube texture loader. @param {LoadingManager} [manager] - The loading manager.
- `load(urls, onLoad, onProgress, onError)` [源码:15593](../../eyes/src/vendor/three/core.js#L15593)：当前操作：写入 无直接字段写入；返回 texture。

### `DataTextureLoader`

Abstract base class for loading binary texture formats RGBE, EXR or TGA. Textures are internally loaded via {@link FileLoader}. Derived classes have to implement the ˋparse()ˋ method which holds the parsing for the respective format. @abstract @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:15624](../../eyes/src/vendor/three/core.js#L15624)：Constructs a new data texture loader. @param {LoadingManager} [manager] - The loading manager.
- `load(url, onLoad, onProgress, onError)` [源码:15627](../../eyes/src/vendor/three/core.js#L15627)：当前操作：写入 无直接字段写入；返回 loader.setResponseType("arraybuffer"),loader.setRequestHeader(this.requestHeader),loader.setPath(this.path),loader.setWithCredentials(scope.withCredentials),loader.load(url,function(buffer){let texData;try{texData=scope.。
- `createDataTexture(buffer)` [源码:15649](../../eyes/src/vendor/three/core.js#L15649)：Parses the given buffer and returns a configured data texture. Use this method for parsing texture data that is already in memory (e.g. drag and drop or data loaded from a server) without going through {@link DataTextureLoader#load}. @param {ArrayBuffer} buffer - The raw texture data. @return {DataTexture} The data texture.
- `_applyTexData(texture, texData)` [源码:15653](../../eyes/src/vendor/three/core.js#L15653)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `TextureLoader`

Class for loading textures. Images are internally loaded via {@link ImageLoader}. ˋˋˋjs const loader = new THREE.TextureLoader(); const texture = await loader.loadAsync( 'textures/land_ocean_ice_cloud_2048.jpg' ); const material = new THREE.MeshBasicMaterial( { map:texture } ); ˋˋˋ Please note that ˋTextureLoaderˋ has dropped support for progress events in ˋr84ˋ. For a ˋTextureLoaderˋ that supports progress events, see [this thread](https://github.com/mrdoob/three.js/issues/10439#issuecomment-293260145). @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:15679](../../eyes/src/vendor/three/core.js#L15679)：Constructs a new texture loader. @param {LoadingManager} [manager] - The loading manager.
- `load(url, onLoad, onProgress, onError)` [源码:15682](../../eyes/src/vendor/three/core.js#L15682)：当前操作：写入 无直接字段写入；返回 loader.setCrossOrigin(this.crossOrigin),loader.setPath(this.path),loader.load(url,function(image){texture.image=image,texture.needsUpdate=!0,void 0!==onLoad&&onLoad(texture);},onProgress,onError),texture。

### `Light`

Abstract base class for lights - all other light types inherit the properties and methods described here. @abstract @augments Object3D。父类 `Object3D`。

- `constructor(color, intensity=1)` [源码:15698](../../eyes/src/vendor/three/core.js#L15698)：当前操作：写入 color、intensity、isLight、type；返回 无显式返回。
- `dispose()` [源码:15701](../../eyes/src/vendor/three/core.js#L15701)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `copy(source, recursive)` [源码:15706](../../eyes/src/vendor/three/core.js#L15706)：当前操作：写入 intensity；返回 super.copy(source,recursive),this.color.copy(source.color),this.intensity=source.intensity,this。
- `toJSON(meta)` [源码:15709](../../eyes/src/vendor/three/core.js#L15709)：当前操作：写入 无直接字段写入；返回 data.object.color=this.color.getHex(),data.object.intensity=this.intensity,data。

### `HemisphereLight`

A light source positioned directly above the scene, with color fading from the sky color to the ground color. This light cannot be used to cast shadows. ˋˋˋjs const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ); scene.add( light ); ˋˋˋ @augments Light。父类 `Light`。

- `constructor(skyColor, groundColor, intensity)` [源码:15728](../../eyes/src/vendor/three/core.js#L15728)：当前操作：写入 groundColor、isHemisphereLight、type；返回 无显式返回。
- `copy(source, recursive)` [源码:15731](../../eyes/src/vendor/three/core.js#L15731)：当前操作：写入 无直接字段写入；返回 super.copy(source,recursive),this.groundColor.copy(source.groundColor),this。
- `toJSON(meta)` [源码:15734](../../eyes/src/vendor/three/core.js#L15734)：当前操作：写入 无直接字段写入；返回 data.object.groundColor=this.groundColor.getHex(),data。

### `LightShadow`

Abstract base class for light shadow classes. These classes represent the shadow configuration for different light types. @abstract。父类 `无`。

- `constructor(camera)` [源码:15754](../../eyes/src/vendor/three/core.js#L15754)：Constructs a new light shadow. @param {Camera} camera - The light's view of the world.
- `getViewportCount()` [源码:15763](../../eyes/src/vendor/three/core.js#L15763)：Used internally by the renderer to get the number of viewports that need to be rendered for this shadow. @return {number} The viewport count.
- `getFrustum()` [源码:15771](../../eyes/src/vendor/three/core.js#L15771)：Gets the shadow cameras frustum. Used internally by the renderer to cull objects. @return {Frustum} The shadow camera frustum.
- `updateMatrices(light)` [源码:15774](../../eyes/src/vendor/three/core.js#L15774)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getViewport(viewportIndex)` [源码:15785](../../eyes/src/vendor/three/core.js#L15785)：Returns a viewport definition for the given viewport index. @param {number} viewportIndex - The viewport index. @return {Vector4} The viewport.
- `getFrameExtents()` [源码:15793](../../eyes/src/vendor/three/core.js#L15793)：Returns the frame extends. @return {Vector2} The frame extends.
- `dispose()` [源码:15796](../../eyes/src/vendor/three/core.js#L15796)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `copy(source)` [源码:15805](../../eyes/src/vendor/three/core.js#L15805)：Copies the values of the given light shadow instance to this instance. @param {LightShadow} source - The light shadow to copy. @return {LightShadow} A reference to this light shadow instance.
- `clone()` [源码:15813](../../eyes/src/vendor/three/core.js#L15813)：Returns a new light shadow instance with copied values from this instance. @return {LightShadow} A clone of this instance.
- `toJSON()` [源码:15817](../../eyes/src/vendor/three/core.js#L15817)：仅写非默认 intensity/bias/normalBias/radius/mapSize；camera.toJSON(false).object 后删除 camera.matrix。返回轻量配置，不保存 shadow map/render target 或实时 shadow 矩阵，不修改 camera 原实例。

### `Camera`

Abstract base class for cameras. This class should always be inherited when you build a new camera. @abstract @augments Object3D。父类 `Object3D`。

- `constructor()` [源码:15833](../../eyes/src/vendor/three/core.js#L15833)：当前操作：写入 _reversedDepth、coordinateSystem、isCamera、matrixWorldInverse、projectionMatrix、projectionMatrixInverse、type；返回 无显式返回。
- `get reversedDepth()` [源码:15836](../../eyes/src/vendor/three/core.js#L15836)：当前操作：写入 无直接字段写入；返回 this._reversedDepth。
- `copy(source, recursive)` [源码:15839](../../eyes/src/vendor/three/core.js#L15839)：当前操作：写入 coordinateSystem；返回 super.copy(source,recursive),this.matrixWorldInverse.copy(source.matrixWorldInverse),this.projectionMatrix.copy(source.projectionMatrix),this.projectionMatrixInverse.copy(source.projectionMatrixInverse),this.coordinateSy。
- `getWorldDirection(target)` [源码:15851](../../eyes/src/vendor/three/core.js#L15851)：Returns a vector representing the ("look") direction of the 3D object in world space. This method is overwritten since cameras have a different forward vector compared to other 3D objects. A camera looks down its local, negative z-axis by default. @param {Vector3} target - The target vector the result is stored to. @return {Vector3} The 3D object's direction in world space.
- `updateMatrixWorld(force)` [源码:15854](../../eyes/src/vendor/three/core.js#L15854)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `updateWorldMatrix(updateParents, updateChildren, force=!1)` [源码:15857](../../eyes/src/vendor/three/core.js#L15857)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `clone()` [源码:15860](../../eyes/src/vendor/three/core.js#L15860)：当前操作：写入 无直接字段写入；返回 new this.constructor().copy(this)。

### `PerspectiveCamera`

Camera that uses [perspective projection](https://en.wikipedia.org/wiki/Perspective_(graphical)). This projection mode is designed to mimic the way the human eye sees. It is the most common projection mode used for rendering a 3D scene. ˋˋˋjs const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 ); scene.add( camera ); ˋˋˋ @augments Camera。父类 `Camera`。

- `constructor(fov=50, aspect=1, near=.1, far=2e3)` [源码:15881](../../eyes/src/vendor/three/core.js#L15881)：当前操作：写入 aspect、far、filmGauge、filmOffset、focus、fov、isPerspectiveCamera、near、type、view、zoom；返回 无显式返回。
- `copy(source, recursive)` [源码:15884](../../eyes/src/vendor/three/core.js#L15884)：当前操作：写入 aspect、far、filmGauge、filmOffset、focus、fov、near、view、zoom；返回 super.copy(source,recursive),this.fov=source.fov,this.zoom=source.zoom,this.near=source.near,this.far=source.far,this.focus=source.focus,this.aspect=source.aspect,this.view=null===source.view?null:Object.assign({},source。
- `setFocalLength(focalLength)` [源码:15887](../../eyes/src/vendor/three/core.js#L15887)：当前操作：写入 fov；返回 无显式返回。
- `getFocalLength()` [源码:15891](../../eyes/src/vendor/three/core.js#L15891)：当前操作：写入 无直接字段写入；返回 .5*this.getFilmHeight()/vExtentSlope。
- `getEffectiveFOV()` [源码:15895](../../eyes/src/vendor/three/core.js#L15895)：当前操作：写入 无直接字段写入；返回 2*RAD2DEG*Math.atan(Math.tan(.5*gr*this.fov)/this.zoom)。
- `getFilmWidth()` [源码:15904](../../eyes/src/vendor/three/core.js#L15904)：Returns the width of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}. @return {number} The film width.
- `getFilmHeight()` [源码:15913](../../eyes/src/vendor/three/core.js#L15913)：Returns the height of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}. @return {number} The film width.
- `getViewBounds(distance, minTarget, maxTarget)` [源码:15916](../../eyes/src/vendor/three/core.js#L15916)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getViewSize(distance, target)` [源码:15926](../../eyes/src/vendor/three/core.js#L15926)：Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction. @param {number} distance - The viewing distance. @param {Vector2} target - The target vector that is used to store result where x is width and y is height. @returns {Vector2} The view size.
- `setViewOffset(fullWidth, fullHeight, x, y, width, height)` [源码:15929](../../eyes/src/vendor/three/core.js#L15929)：当前操作：写入 aspect、view、view.enabled、view.fullHeight、view.fullWidth、view.height、view.offsetX、view.offsetY、view.width；返回 无显式返回。
- `clearViewOffset()` [源码:15940](../../eyes/src/vendor/three/core.js#L15940)：当前操作：写入 view.enabled；返回 无显式返回。
- `updateProjectionMatrix()` [源码:15943](../../eyes/src/vendor/three/core.js#L15943)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toJSON(meta)` [源码:15958](../../eyes/src/vendor/three/core.js#L15958)：当前操作：写入 无直接字段写入；返回 data.object.fov=this.fov,data.object.zoom=this.zoom,data.object.near=this.near,data.object.far=this.far,data.object.focus=this.focus,data.object.aspect=this.aspect,null!==this.view&&(data.object.view=Object.assign({},thi。

### `SpotLightShadow`

Represents the shadow configuration of directional lights. @augments LightShadow。父类 `LightShadow`。

- `constructor()` [源码:15969](../../eyes/src/vendor/three/core.js#L15969)：当前操作：写入 aspect、focus、isSpotLightShadow；返回 无显式返回。
- `updateMatrices(e)` [源码:15973](../../eyes/src/vendor/three/core.js#L15973)：fov=2*RAD2DEG*light.angle*focus，aspect=mapSize.width/height*this.aspect，far=light.distance\|\|camera.far；任一变化才更新投影，随后 super.updateMatrices 更新位置/方向与 shadow matrix。distance=0 表示沿用 far，不是将 far 设0；函数没有返回矩阵。
- `copy(source)` [源码:15980](../../eyes/src/vendor/three/core.js#L15980)：当前操作：写入 focus；返回 super.copy(source),this.focus=source.focus,this。

### `SpotLight`

This light gets emitted from a single point in one direction, along a cone that increases in size the further from the light it gets. This light can cast shadows - see the {@link SpotLightShadow} for details. ˋˋˋjs // white spotlight shining from the side, modulated by a texture const spotLight = new THREE.SpotLight( 0xffffff ); spotLight.position.set( 100, 1000, 100 ); spotLight.map = new THREE.TextureLoader().load( url ); spotLight.castShadow = true; spotLight.shadow.mapSize.width = 1024; spotLight.shadow.mapSize.height = 1024; spotLight.shadow.camera.near = 500; spotLight.shadow.camera.far = 4000; spotLight.shadow.camera.fov = 30;s ˋˋˋ @augments Light。父类 `Light`。

- `constructor(color, intensity, distance=0, angle=Math.PI/3, penumbra=0, decay=2)` [源码:16007](../../eyes/src/vendor/three/core.js#L16007)：当前操作：写入 angle、decay、distance、isSpotLight、map、penumbra、shadow、target、type；返回 无显式返回。
- `get power()` [源码:16010](../../eyes/src/vendor/three/core.js#L16010)：当前操作：写入 无直接字段写入；返回 this.intensity*Math.PI。
- `set power(power)` [源码:16013](../../eyes/src/vendor/three/core.js#L16013)：当前操作：写入 intensity；返回 无显式返回。
- `dispose()` [源码:16016](../../eyes/src/vendor/three/core.js#L16016)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `copy(source, recursive)` [源码:16019](../../eyes/src/vendor/three/core.js#L16019)：当前操作：写入 angle、decay、distance、map、penumbra、shadow、target；返回 super.copy(source,recursive),this.distance=source.distance,this.angle=source.angle,this.penumbra=source.penumbra,this.decay=source.decay,this.target=source.target.clone(),this.map=source.map,this.shadow=source.shadow.clo。
- `toJSON(meta)` [源码:16022](../../eyes/src/vendor/three/core.js#L16022)：当前操作：写入 无直接字段写入；返回 data.object.distance=this.distance,data.object.angle=this.angle,data.object.decay=this.decay,data.object.penumbra=this.penumbra,data.object.target=this.target.uuid,this.map&&this.map.isTexture&&(data.object.map=this.map.。

### `PointLightShadow`

Point 光源阴影相机、贴图和投影矩阵。父类 `LightShadow`。

- `constructor()` [源码:16028](../../eyes/src/vendor/three/core.js#L16028)：当前操作：写入 isPointLightShadow；返回 无显式返回。

### `PointLight`

A light that gets emitted from a single point in all directions. A common use case for this is to replicate the light emitted from a bare lightbulb. This light can cast shadows - see the {@link PointLightShadow} for details. ˋˋˋjs const light = new THREE.PointLight( 0xff0000, 1, 100 ); light.position.set( 50, 50, 50 ); scene.add( light ); ˋˋˋ @augments Light。父类 `Light`。

- `constructor(color, intensity, distance=0, decay=2)` [源码:16048](../../eyes/src/vendor/three/core.js#L16048)：当前操作：写入 decay、distance、isPointLight、shadow、type；返回 无显式返回。
- `get power()` [源码:16051](../../eyes/src/vendor/three/core.js#L16051)：当前操作：写入 无直接字段写入；返回 4*this.intensity*Math.PI。
- `set power(power)` [源码:16054](../../eyes/src/vendor/three/core.js#L16054)：当前操作：写入 intensity；返回 无显式返回。
- `dispose()` [源码:16057](../../eyes/src/vendor/three/core.js#L16057)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `copy(source, recursive)` [源码:16060](../../eyes/src/vendor/three/core.js#L16060)：当前操作：写入 decay、distance、shadow；返回 super.copy(source,recursive),this.distance=source.distance,this.decay=source.decay,this.shadow=source.shadow.clone(),this。
- `toJSON(meta)` [源码:16063](../../eyes/src/vendor/three/core.js#L16063)：当前操作：写入 无直接字段写入；返回 data.object.distance=this.distance,data.object.decay=this.decay,data.object.shadow=this.shadow.toJSON(),data。

### `OrthographicCamera`

正交投影相机；以左右上下边界和 zoom 生成不随距离缩放的投影。父类 `Camera`。

- `constructor(left=-1, right=1, top=1, bottom=-1, near=.1, far=2e3)` [源码:16069](../../eyes/src/vendor/three/core.js#L16069)：当前操作：写入 bottom、far、isOrthographicCamera、left、near、right、top、type、view、zoom；返回 无显式返回。
- `copy(source, recursive)` [源码:16072](../../eyes/src/vendor/three/core.js#L16072)：当前操作：写入 bottom、far、left、near、right、top、view、zoom；返回 super.copy(source,recursive),this.left=source.left,this.right=source.right,this.top=source.top,this.bottom=source.bottom,this.near=source.near,this.far=source.far,this.zoom=source.zoom,this.view=null===source.view?null:O。
- `setViewOffset(fullWidth, fullHeight, x, y, width, height)` [源码:16075](../../eyes/src/vendor/three/core.js#L16075)：当前操作：写入 view、view.enabled、view.fullHeight、view.fullWidth、view.height、view.offsetX、view.offsetY、view.width；返回 无显式返回。
- `clearViewOffset()` [源码:16086](../../eyes/src/vendor/three/core.js#L16086)：当前操作：写入 view.enabled；返回 无显式返回。
- `updateProjectionMatrix()` [源码:16089](../../eyes/src/vendor/three/core.js#L16089)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toJSON(meta)` [源码:16105](../../eyes/src/vendor/three/core.js#L16105)：当前操作：写入 无直接字段写入；返回 data.object.zoom=this.zoom,data.object.left=this.left,data.object.right=this.right,data.object.top=this.top,data.object.bottom=this.bottom,data.object.near=this.near,data.object.far=this.far,null!==this.view&&(data.objec。

### `DirectionalLightShadow`

Directional 光源阴影相机、贴图和投影矩阵。父类 `LightShadow`。

- `constructor()` [源码:16111](../../eyes/src/vendor/three/core.js#L16111)：当前操作：写入 isDirectionalLightShadow；返回 无显式返回。

### `DirectionalLight`

A light that gets emitted in a specific direction. This light will behave as though it is infinitely far away and the rays produced from it are all parallel. The common use case for this is to simulate daylight; the sun is far enough away that its position can be considered to be infinite, and all light rays coming from it are parallel. A common point of confusion for directional lights is that setting the rotation has no effect. This is because three.js's DirectionalLight is the equivalent to what is often called a 'Target Direct Light' in other applications. This means that its direction is calculated as pointing from the light's {@link Object3D#position} to the {@link DirectionalLight#target} position (as opposed to a 'Free Direct Light' that just has a rotation component). This light can cast shadows - see the {@link DirectionalLightShadow} for details. ˋˋˋjs // White directional light at half intensity shining from the top. const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 ); scene.add( directionalLight ); ˋˋˋ @augments Light。父类 `Light`。

- `constructor(color, intensity)` [源码:16143](../../eyes/src/vendor/three/core.js#L16143)：当前操作：写入 isDirectionalLight、shadow、target、type；返回 无显式返回。
- `dispose()` [源码:16146](../../eyes/src/vendor/three/core.js#L16146)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `copy(source)` [源码:16149](../../eyes/src/vendor/three/core.js#L16149)：当前操作：写入 shadow、target；返回 super.copy(source),this.target=source.target.clone(),this.shadow=source.shadow.clone(),this。
- `toJSON(meta)` [源码:16152](../../eyes/src/vendor/three/core.js#L16152)：当前操作：写入 无直接字段写入；返回 data.object.shadow=this.shadow.toJSON(),data.object.target=this.target.uuid,data。

### `AmbientLight`

Ambient 光源颜色、强度及方向/衰减数据。父类 `Light`。

- `constructor(color, intensity)` [源码:16158](../../eyes/src/vendor/three/core.js#L16158)：当前操作：写入 isAmbientLight、type；返回 无显式返回。

### `RectAreaLight`

This class emits light uniformly across the face a rectangular plane. This light type can be used to simulate light sources such as bright windows or strip lighting. Important Notes: - There is no shadow support. - Only PBR materials are supported. - You have to include ˋRectAreaLightUniformsLibˋ (ˋWebGLRendererˋ) or ˋRectAreaLightTexturesLibˋ (ˋWebGPURendererˋ) into your app and init the uniforms/textures. ˋˋˋjs RectAreaLightUniformsLib.init(); // only relevant for WebGLRenderer THREE.RectAreaLightNode.setLTC( RectAreaLightTexturesLib.init() ); // only relevant for WebGPURenderer const intensity = 1; const width = 10; const height = 10; const rectLight = new THREE.RectAreaLight( 0xffffff, intensity, width, height ); rectLight.position.set( 5, 5, 0 ); rectLight.lookAt( 0, 0, 0 ); scene.add( rectLight ) ˋˋˋ @augments Light。父类 `Light`。

- `constructor(color, intensity, width=10, height=10)` [源码:16188](../../eyes/src/vendor/three/core.js#L16188)：当前操作：写入 height、isRectAreaLight、type、width；返回 无显式返回。
- `get power()` [源码:16191](../../eyes/src/vendor/three/core.js#L16191)：当前操作：写入 无直接字段写入；返回 this.intensity*this.width*this.height*Math.PI。
- `set power(power)` [源码:16194](../../eyes/src/vendor/three/core.js#L16194)：当前操作：写入 intensity；返回 无显式返回。
- `copy(source)` [源码:16197](../../eyes/src/vendor/three/core.js#L16197)：当前操作：写入 height、width；返回 super.copy(source),this.width=source.width,this.height=source.height,this。
- `toJSON(meta)` [源码:16200](../../eyes/src/vendor/three/core.js#L16200)：当前操作：写入 无直接字段写入；返回 data.object.width=this.width,data.object.height=this.height,data。

### `SphericalHarmonics3`

Represents a third-order spherical harmonics (SH). Light probes use this class to encode lighting information. - Primary reference: {@link https://graphics.stanford.edu/papers/envmap/envmap.pdf} - Secondary reference: {@link https://www.ppsloan.org/publications/StupidSH36.pdf}。父类 `无`。

- `constructor()` [源码:16213](../../eyes/src/vendor/three/core.js#L16213)：当前操作：写入 coefficients、isSphericalHarmonics3；返回 无显式返回。
- `set(coefficients)` [源码:16217](../../eyes/src/vendor/three/core.js#L16217)：当前操作：写入 无直接字段写入；返回 this。
- `zero()` [源码:16221](../../eyes/src/vendor/three/core.js#L16221)：当前操作：写入 无直接字段写入；返回 this。
- `getAt(normal, target)` [源码:16225](../../eyes/src/vendor/three/core.js#L16225)：当前操作：写入 无直接字段写入；返回 target.copy(coeff[0]).multiplyScalar(.282095),target.addScaledVector(coeff[1],.488603*y),target.addScaledVector(coeff[2],.488603*z),target.addScaledVector(coeff[3],.488603*x),target.addScaledVector(coeff[4],x*y*1.092548)。
- `getIrradianceAt(normal, target)` [源码:16232](../../eyes/src/vendor/three/core.js#L16232)：当前操作：写入 无直接字段写入；返回 target.copy(coeff[0]).multiplyScalar(.886227),target.addScaledVector(coeff[1],1.023328*y),target.addScaledVector(coeff[2],1.023328*z),target.addScaledVector(coeff[3],1.023328*x),target.addScaledVector(coeff[4],.858086*x*。
- `add(sh)` [源码:16239](../../eyes/src/vendor/three/core.js#L16239)：当前操作：写入 无直接字段写入；返回 this。
- `addScaledSH(sh, s)` [源码:16243](../../eyes/src/vendor/three/core.js#L16243)：当前操作：写入 无直接字段写入；返回 this。
- `scale(s)` [源码:16247](../../eyes/src/vendor/three/core.js#L16247)：当前操作：写入 无直接字段写入；返回 this。
- `lerp(sh, alpha)` [源码:16251](../../eyes/src/vendor/three/core.js#L16251)：当前操作：写入 无直接字段写入；返回 this。
- `equals(sh)` [源码:16255](../../eyes/src/vendor/three/core.js#L16255)：当前操作：写入 无直接字段写入；返回 !1、!0。
- `copy(sh)` [源码:16265](../../eyes/src/vendor/three/core.js#L16265)：Copies the values of the given spherical harmonics to this instance. @param {SphericalHarmonics3} sh - The spherical harmonics to copy. @return {SphericalHarmonics3} A reference to this spherical harmonics.
- `clone()` [源码:16273](../../eyes/src/vendor/three/core.js#L16273)：Returns a new spherical harmonics with copied values from this instance. @return {SphericalHarmonics3} A clone of this instance.
- `fromArray(array, offset=0)` [源码:16276](../../eyes/src/vendor/three/core.js#L16276)：当前操作：写入 无直接字段写入；返回 this。
- `toArray(array=[], offset=0)` [源码:16281](../../eyes/src/vendor/three/core.js#L16281)：当前操作：写入 无直接字段写入；返回 array。
- `static getBasisAt(normal, shBasis)` [源码:16286](../../eyes/src/vendor/three/core.js#L16286)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `LightProbe`

Light probes are an alternative way of adding light to a 3D scene. Unlike classical light sources (e.g. directional, point or spot lights), light probes do not emit light. Instead they store information about light passing through 3D space. During rendering, the light that hits a 3D object is approximated by using the data from the light probe. Light probes are usually created from (radiance) environment maps. The class {@link LightProbeGenerator} can be used to create light probes from cube textures or render targets. However, light estimation data could also be provided in other forms e.g. by WebXR. This enables the rendering of augmented reality content that reacts to real world lighting. The current probe implementation in three.js supports so-called diffuse light probes. This type of light probe is functionally equivalent to an irradiance environment map. @augments Light。父类 `Light`。

- `constructor(sh=new SphericalHarmonics3(), intensity=1)` [源码:16313](../../eyes/src/vendor/three/core.js#L16313)：当前操作：写入 isLightProbe、sh；返回 无显式返回。
- `copy(source)` [源码:16316](../../eyes/src/vendor/three/core.js#L16316)：当前操作：写入 无直接字段写入；返回 super.copy(source),this.sh.copy(source.sh),this。
- `toJSON(meta)` [源码:16319](../../eyes/src/vendor/three/core.js#L16319)：当前操作：写入 无直接字段写入；返回 data.object.sh=this.sh.toArray(),data。

### `MaterialLoader`

Class for loading materials. The files are internally loaded via {@link FileLoader}. ˋˋˋjs const loader = new THREE.MaterialLoader(); const material = await loader.loadAsync( 'material.json' ); ˋˋˋ This loader does not support node materials. Use {@link NodeMaterialLoader} instead. @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:16343](../../eyes/src/vendor/three/core.js#L16343)：Constructs a new material loader. @param {LoadingManager} [manager] - The loading manager.
- `load(url, onLoad, onProgress, onError)` [源码:16354](../../eyes/src/vendor/three/core.js#L16354)：Starts loading from the given URL and pass the loaded material to the ˋonLoad()ˋ callback. @param {string} url - The path/URL of the file to be loaded. This can also be a data URI. @param {function(Material)} onLoad - Executed when the loading process has been finished. @param {onProgressCallback} onProgress - Executed while the loading is in progress. @param {onErrorCallback} onError - Executed when errors occur.
- `parse(json)` [源码:16371](../../eyes/src/vendor/three/core.js#L16371)：Parses the given JSON object and returns a material. @param {Object} json - The serialized material. @return {Material} The parsed material.
- `setTextures(value)` [源码:16382](../../eyes/src/vendor/three/core.js#L16382)：Textures are not embedded in the material JSON so they have to be injected before the loading process starts. @param {Object} value - A dictionary holding textures for material properties. @return {MaterialLoader} A reference to this material loader.
- `createMaterialFromType(type)` [源码:16391](../../eyes/src/vendor/three/core.js#L16391)：Creates a material for the given type. @param {string} type - The material type. @return {Material} The new material.
- `static createMaterialFromType(e)` [源码:16395](../../eyes/src/vendor/three/core.js#L16395)：在内建材质构造器表后展开 _customMaterials，自定义键可覆盖内建。未知类型 warnOnce 并回退 new Material，已知无参构造对应类型；返回实例，尚未填 JSON 内容。
- `static registerMaterial(type, materialClass)` [源码:16428](../../eyes/src/vendor/three/core.js#L16428)：Registers the given material at the internal material library. @static @param {string} type - The material type. @param {Material.constructor} materialClass - The material class.

### `LoaderUtils`

解析 URL 基路径、字符串和资源地址。父类 `无`。

- `static extractUrlBase(url)` [源码:16433](../../eyes/src/vendor/three/core.js#L16433)：当前操作：写入 无直接字段写入；返回 -1===index?"./":url.slice(0,index+1)。
- `static resolveURL(e, t)` [源码:16438](../../eyes/src/vendor/three/core.js#L16438)：非字符串/空 URL 返回空串；当 base 是 http(s) 且 URL 以 / 开头，先把 base 截到 origin。http(s)/协议相对、data:（匹配含逗号）、blob: 保持；其余直接 path+url。不是完整 new URL 归一化：不解析 ../、不替换所有协议。

### `InstancedBufferGeometry`

InstancedBuffer 几何生成器；构建 position/normal/uv 属性及三角索引。父类 `BufferGeometry`。

- `constructor()` [源码:16443](../../eyes/src/vendor/three/core.js#L16443)：当前操作：写入 instanceCount、isInstancedBufferGeometry、type；返回 无显式返回。
- `copy(source)` [源码:16446](../../eyes/src/vendor/three/core.js#L16446)：当前操作：写入 instanceCount；返回 super.copy(source),this.instanceCount=source.instanceCount,this。
- `toJSON()` [源码:16449](../../eyes/src/vendor/three/core.js#L16449)：当前操作：写入 无直接字段写入；返回 data.instanceCount=this.instanceCount,data.isInstancedBufferGeometry=!0,data。

### `BufferGeometryLoader`

Class for loading geometries. The files are internally loaded via {@link FileLoader}. ˋˋˋjs const loader = new THREE.BufferGeometryLoader(); const geometry = await loader.loadAsync( 'models/json/pressure.json' ); const material = new THREE.MeshBasicMaterial( { color: 0xF5F5F5 } ); const object = new THREE.Mesh( geometry, material ); scene.add( object ); ˋˋˋ @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:16475](../../eyes/src/vendor/three/core.js#L16475)：Constructs a new geometry loader. @param {LoadingManager} [manager] - The loading manager.
- `load(url, onLoad, onProgress, onError)` [源码:16486](../../eyes/src/vendor/three/core.js#L16486)：Starts loading from the given URL and pass the loaded geometry to the ˋonLoad()ˋ callback. @param {string} url - The path/URL of the file to be loaded. This can also be a data URI. @param {function(BufferGeometry)} onLoad - Executed when the loading process has been finished. @param {onProgressCallback} onProgress - Executed while the loading is in progress. @param {onErrorCallback} onError - Executed when errors occur.
- `parse(e)` [源码:16498](../../eyes/src/vendor/three/core.js#L16498)：由 isInstancedBufferGeometry 选实例；还原 index typed array、普通/实例/交错 attributes、morphAttributes/name/usage/normalized。交错 buffer 与底层 ArrayBuffer 按 UUID 两级缓存，保留共享存储关系；序列化 words 经 Uint32Array(...).buffer 复原，再按声明 type 建 view。返回 geometry，不计算缺失 normal 或 bounds，也不上传 GPU。

### `ObjectLoader`

A loader for loading a JSON resource in the [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4). The files are internally loaded via {@link FileLoader}. ˋˋˋjs const loader = new THREE.ObjectLoader(); const obj = await loader.loadAsync( 'models/json/example.json' ); scene.add( obj ); // Alternatively, to parse a previously loaded JSON structure const object = await loader.parseAsync( a_json_object ); scene.add( object ); ˋˋˋ @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:16585](../../eyes/src/vendor/three/core.js#L16585)：Constructs a new object loader. @param {LoadingManager} [manager] - The loading manager.
- `load(url, onLoad, onProgress, onError)` [源码:16588](../../eyes/src/vendor/three/core.js#L16588)：当前操作：写入 resourcePath；返回 无显式返回。
- `loadAsync(e, t)` [源码:16606](../../eyes/src/vendor/three/core.js#L16606)：确定 resourcePath（优先已有值，否则 this.path 或请求目录），配置 FileLoader 的 path/header/credentials，await 文本并 JSON.parse；坏 JSON 包装含 URL 错误，metadata 缺 type 或 type=geometry 拒绝，最终 await parseAsync。返回完整对象 Promise，区别于仅 callback 的 FileLoader.load。
- `parse(json, onLoad)` [源码:16622](../../eyes/src/vendor/three/core.js#L16622)：当前操作：写入 无直接字段写入；返回 object。
- `parseAsync(json)` [源码:16649](../../eyes/src/vendor/three/core.js#L16649)：Async version of {@link ObjectLoader#parse}. @param {Object} json - The serialized 3D object. @return {Promise<Object3D>} A Promise that resolves with the parsed 3D object.
- `static registerGeometry(type, geometryClass)` [源码:16668](../../eyes/src/vendor/three/core.js#L16668)：Registers the given geometry at the internal geometry library. @static @param {string} type - The geometry type. @param {BufferGeometry.constructor} geometryClass - The geometry class.
- `parseShapes(json)` [源码:16671](../../eyes/src/vendor/three/core.js#L16671)：当前操作：写入 无直接字段写入；返回 shapes。
- `parseSkeletons(json, object)` [源码:16679](../../eyes/src/vendor/three/core.js#L16679)：当前操作：写入 无直接字段写入；返回 skeletons。
- `parseGeometries(json, shapes)` [源码:16690](../../eyes/src/vendor/three/core.js#L16690)：当前操作：写入 无直接字段写入；返回 geometries。
- `parseMaterials(json, textures)` [源码:16710](../../eyes/src/vendor/three/core.js#L16710)：当前操作：写入 无直接字段写入；返回 materials。
- `parseAnimations(json)` [源码:16723](../../eyes/src/vendor/three/core.js#L16723)：当前操作：写入 无直接字段写入；返回 animations。
- `parseImages(e, t)` [源码:16733](../../eyes/src/vendor/three/core.js#L16733)：字符串 URL 按 resourcePath 补相对路径，经 manager.resolveURL 与父 manager 的 itemStart/End 计数；独立 LoadingManager(onLoad)+ImageLoader 跟踪图完成。内嵌 data 对象重建 typed array/width/height；cube 数组将内嵌数据包装为 DataTexture，HTMLImageElement 保持。每 UUID 包成 Source，返回字典；字符串图片此时可仍在加载，不意味着像素已可用。
- `parseImagesAsync(json)` [源码:16775](../../eyes/src/vendor/three/core.js#L16775)：当前操作：写入 无直接字段写入；返回 images。
- `parseTextures(e, t)` [源码:16813](../../eyes/src/vendor/three/core.js#L16813)：按 Source.data 判断 CubeTexture、DataTexture 或 Texture，关联共享 Source 与 UUID。cube 六面或普通非空图标 needsUpdate；恢复 channel、UV变换、wrap/filter/mapping、像素type/format/colorSpace、mipmap/flipY/compare 等字段，历史字符串常量查表且警告。返回纹理字典；缺 Source 虽先 warn，但后续直接 source.data，未做可恢复 fallback。
- `parseObject(data, geometries, materials, textures, animations)` [源码:16828](../../eyes/src/vendor/three/core.js#L16828)：当前操作：写入 无直接字段写入；返回 object。
- `bindSkeletons(object, skeletons)` [源码:16955](../../eyes/src/vendor/three/core.js#L16955)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `bindLightTargets(e)` [源码:16964](../../eyes/src/vendor/three/core.js#L16964)：遍历对象树，只处理 directional/spot light，把 child.target 暂存的 UUID 用树内 getObjectByProperty 解成对象；找不到则 new Object3D。修补引用而非复制目标坐标，不自动 add fallback 到场景。

### `ImageBitmapLoader`

A loader for loading images as an [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap). An ˋImageBitmapˋ provides an asynchronous and resource efficient pathway to prepare textures for rendering. Note that {@link Texture#flipY} and {@link Texture#premultiplyAlpha} are ignored with image bitmaps. These options need to be configured via {@link ImageBitmapLoader#setOptions} prior to loading, unlike regular images which can be configured on the Texture to set these options on GPU upload instead. To match the default behaviour of {@link Texture}, the following options are needed: ˋˋˋjs { imageOrientation: 'flipY', premultiplyAlpha: 'none' } ˋˋˋ Also note that unlike {@link FileLoader}, this loader will only avoid multiple concurrent requests to the same URL if {@link Cache} is enabled. ˋˋˋjs const loader = new THREE.ImageBitmapLoader(); loader.setOptions( { imageOrientation: 'flipY' } ); // set options if needed const imageBitmap = await loader.loadAsync( 'image.png' ); const texture = new THREE.Texture( imageBitmap ); texture.needsUpdate = true; ˋˋˋ @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:17025](../../eyes/src/vendor/three/core.js#L17025)：当前操作：写入 _abortController、isImageBitmapLoader、options；返回 无显式返回。
- `setOptions(options)` [源码:17040](../../eyes/src/vendor/three/core.js#L17040)：Sets the given loader options. The structure of the object must match the ˋoptionsˋ parameter of [createImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/Window/createImageBitmap). Note: When caching is enabled, the cache key is based on the URL only. Loading the same URL with different options will return the cached result of the first request. @param {Object} options - The loader options to set. @return {ImageBitmapLoader} A reference to this image bitmap loader.
- `load(url, onLoad, onProgress, onError)` [源码:17043](../../eyes/src/vendor/three/core.js#L17043)：当前操作：写入 无直接字段写入；返回 scope.manager.itemStart(url),cached.then?void cached.then(imageBitmap=>{!0===Mc.has(cached)?(onError&&onError(Mc.get(cached)),scope.manager.itemError(url),scope.manager.itemEnd(url)):(onLoad&&onLoad(imageBitmap),scope.ma。
- `abort()` [源码:17072](../../eyes/src/vendor/three/core.js#L17072)：Aborts ongoing fetch requests. @return {ImageBitmapLoader} A reference to this instance.

### `AudioContext`

共享 Web Audio 上下文访问入口。父类 `无`。

- `static getContext()` [源码:17078](../../eyes/src/vendor/three/core.js#L17078)：当前操作：写入 无直接字段写入；返回 void 0===_c&&(_c=new(window.AudioContext\|\|window.webkitAudioContext)()),_c。
- `static setContext(value)` [源码:17081](../../eyes/src/vendor/three/core.js#L17081)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `AudioLoader`

Class for loading audio buffers. Audios are internally loaded via {@link FileLoader}. ˋˋˋjs const audioListener = new THREE.AudioListener(); const ambientSound = new THREE.Audio( audioListener ); const loader = new THREE.AudioLoader(); const audioBuffer = await loader.loadAsync( 'audio/ambient_ocean.ogg' ); ambientSound.setBuffer( audioBuffer ); ambientSound.play(); ˋˋˋ @augments Loader。父类 `Loader`。

- `constructor(manager)` [源码:17108](../../eyes/src/vendor/three/core.js#L17108)：Constructs a new audio loader. @param {LoadingManager} [manager] - The loading manager.
- `load(url, onLoad, onProgress, onError)` [源码:17111](../../eyes/src/vendor/three/core.js#L17111)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `StereoCamera`

生成左右眼视差相机。父类 `无`。

- `constructor()` [源码:17137](../../eyes/src/vendor/three/core.js#L17137)：当前操作：写入 _cache、aspect、cameraL、cameraL.matrixAutoUpdate、cameraR、cameraR.matrixAutoUpdate、eyeSep、type；返回 无显式返回。
- `update(e)` [源码:17149](../../eyes/src/vendor/three/core.js#L17149)：缓存 focus/fov/aspect*本身aspect/near/far/zoom/eyeSep，变化才重算左右非对称视锥，眼间距/2 给±X平移，投影偏移按 near/focus。每次都以相机 matrixWorld 乘对应眼平移写 cameraL/R.matrix，置 matrixWorldNeedsUpdate。此方法不渲染，两子相机的投影对象独立。

### `CubeCamera`

从六个方向采集环境立方纹理。父类 `Object3D`。

- `constructor(e, t, renderTarget)` [源码:17165](../../eyes/src/vendor/three/core.js#L17165)：持有外部 renderTarget，创建六个 FOV=-90°、aspect=1、给定 near/far 的 PerspectiveCamera 子对象。六相机.layers 共享此 CubeCamera.layers，coordinateSystem=null、activeMipmapLevel=0；构造时尚未选定每面的方向，也不分配 renderTarget。
- `updateCoordinateSystem()` [源码:17181](../../eyes/src/vendor/three/core.js#L17181)：先移除六个子相机，按 WebGL/WebGPU 设置各面的 up/lookAt，再重新 add 并 updateMatrixWorld，避免父变换影响定向。非法坐标系统在移除后抛错，children 保持被移除状态。
- `update(e, t)` [源码:17193](../../eyes/src/vendor/three/core.js#L17193)：同步坐标系统，保存 renderer 当前 target/cubeFace/mip/XR，禁用XR与前五面 mip 生成；每面设目标后渲染，reversed depth 且 autoClear=false 时单独 clearDepth。最后一面恢复 generateMipmaps以触发整立方纹理 mip，再还原目标/XR并标 needsPMREMUpdate。没有 try/finally，渲染抛错时此函数不保证状态恢复；正常路径不 dispose 外部 target。

### `ArrayCamera`

This type of camera can be used in order to efficiently render a scene with a predefined set of cameras. This is an important performance aspect for rendering VR scenes. An instance of ˋArrayCameraˋ always has an array of sub cameras. It's mandatory to define for each sub camera the ˋviewportˋ property which determines the part of the viewport that is rendered with this camera. @augments PerspectiveCamera。父类 `PerspectiveCamera`。

- `constructor(array=[])` [源码:17229](../../eyes/src/vendor/three/core.js#L17229)：Constructs a new array camera. @param {Array<PerspectiveCamera>} [array=[]] - An array of perspective sub cameras.

### `Timer`

This class is an alternative to {@link Clock} with a different API design and behavior. The goal is to avoid the conceptual flaws that became apparent in ˋClockˋ over time. - ˋTimerˋ has an ˋupdate()ˋ method that updates its internal state. That makes it possible to call ˋgetDelta()ˋ and ˋgetElapsed()ˋ multiple times per simulation step without getting different values. - The class can make use of the Page Visibility API to avoid large time delta values when the app is inactive (e.g. tab switched or browser hidden). ˋˋˋjs const timer = new Timer(); timer.connect( document ); // use Page Visibility API ˋˋˋ。父类 `无`。

- `constructor()` [源码:17248](../../eyes/src/vendor/three/core.js#L17248)：当前操作：写入 _currentTime、_delta、_document、_elapsed、_pageVisibilityHandler、_previousTime、_startTime、_timescale；返回 无显式返回。
- `connect(document)` [源码:17251](../../eyes/src/vendor/three/core.js#L17251)：当前操作：写入 _document、_pageVisibilityHandler；返回 无显式返回。
- `disconnect()` [源码:17254](../../eyes/src/vendor/three/core.js#L17254)：当前操作：写入 _document、_pageVisibilityHandler；返回 无显式返回。
- `getDelta()` [源码:17257](../../eyes/src/vendor/three/core.js#L17257)：当前操作：写入 无直接字段写入；返回 this._delta/1e3。
- `getElapsed()` [源码:17260](../../eyes/src/vendor/three/core.js#L17260)：当前操作：写入 无直接字段写入；返回 this._elapsed/1e3。
- `getTimescale()` [源码:17268](../../eyes/src/vendor/three/core.js#L17268)：Returns the timescale. @return {number} The timescale.
- `setTimescale(timescale)` [源码:17278](../../eyes/src/vendor/three/core.js#L17278)：Sets the given timescale which scale the time delta computation in ˋupdate()ˋ. @param {number} timescale - The timescale to set. @return {Timer} A reference to this timer.
- `reset()` [源码:17286](../../eyes/src/vendor/three/core.js#L17286)：Resets the time computation for the current simulation step. @return {Timer} A reference to this timer.
- `dispose()` [源码:17289](../../eyes/src/vendor/three/core.js#L17289)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `update(timestamp)` [源码:17292](../../eyes/src/vendor/three/core.js#L17292)：当前操作：写入 _currentTime、_delta、_elapsed、_previousTime；返回 null!==this._pageVisibilityHandler&&!0===this._document.hidden?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(void 0!==timestamp?timestamp:performance.now())-this._startTime,this._delta=(this._cur。

### `AudioListener`

The class represents a virtual listener of the all positional and non-positional audio effects in the scene. A three.js application usually creates a single listener. It is a mandatory constructor parameter for audios entities like {@link Audio} and {@link PositionalAudio}. In most cases, the listener object is a child of the camera. So the 3D transformation of the camera represents the 3D transformation of the listener. @augments Object3D。父类 `Object3D`。

- `constructor()` [源码:17316](../../eyes/src/vendor/three/core.js#L17316)：当前操作：写入 _timer、context、filter、gain、timeDelta、type；返回 无显式返回。
- `getInput()` [源码:17326](../../eyes/src/vendor/three/core.js#L17326)：Returns the listener's input node. This method is used by other audio nodes to connect to this listener. @return {GainNode} The input node.
- `removeFilter()` [源码:17329](../../eyes/src/vendor/three/core.js#L17329)：当前操作：写入 filter；返回 null!==this.filter&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this。
- `getFilter()` [源码:17337](../../eyes/src/vendor/three/core.js#L17337)：Returns the current set filter. @return {?AudioNode} The filter.
- `setFilter(value)` [源码:17340](../../eyes/src/vendor/three/core.js#L17340)：当前操作：写入 filter；返回 null!==this.filter?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=value,this.gain.connect(this.filter),this.filter.connect(。
- `getMasterVolume()` [源码:17348](../../eyes/src/vendor/three/core.js#L17348)：Returns the applications master volume. @return {number} The master volume.
- `setMasterVolume(value)` [源码:17351](../../eyes/src/vendor/three/core.js#L17351)：当前操作：写入 无直接字段写入；返回 this.gain.gain.setTargetAtTime(value,this.context.currentTime,.01),this。
- `updateMatrixWorld(force)` [源码:17354](../../eyes/src/vendor/three/core.js#L17354)：当前操作：写入 timeDelta；返回 无显式返回。

### `Audio`

Represents a non-positional ( global ) audio object. This and related audio modules make use of the [Web Audio API](https://www.w3.org/TR/webaudio-1.1/). ˋˋˋjs // create an AudioListener and add it to the camera const listener = new THREE.AudioListener(); camera.add( listener ); // create a global audio source const sound = new THREE.Audio( listener ); // load a sound and set it as the Audio object's buffer const audioLoader = new THREE.AudioLoader(); audioLoader.load( 'sounds/ambient.ogg', function( buffer ) { sound.setBuffer( buffer ); sound.setLoop( true ); sound.setVolume( 0.5 ); sound.play(); }); ˋˋˋ @augments Object3D。父类 `Object3D`。

- `constructor(listener)` [源码:17389](../../eyes/src/vendor/three/core.js#L17389)：当前操作：写入 _connected、_progress、_startedAt、autoplay、buffer、context、detune、duration、filters、gain、hasPlaybackControl、isPlaying、listener、loop、loopEnd、loopStart、offset、playbackRate、source、sourceType、type；返回 无显式返回。
- `getOutput()` [源码:17397](../../eyes/src/vendor/three/core.js#L17397)：Returns the output audio node. @return {GainNode} The output node.
- `setNodeSource(audioNode)` [源码:17400](../../eyes/src/vendor/three/core.js#L17400)：当前操作：写入 hasPlaybackControl、source、sourceType；返回 this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=audioNode,this.connect(),this。
- `setMediaElementSource(mediaElement)` [源码:17403](../../eyes/src/vendor/three/core.js#L17403)：当前操作：写入 hasPlaybackControl、source、sourceType；返回 this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(mediaElement),this.connect(),this。
- `setMediaStreamSource(mediaStream)` [源码:17406](../../eyes/src/vendor/three/core.js#L17406)：当前操作：写入 hasPlaybackControl、source、sourceType；返回 this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(mediaStream),this.connect(),this。
- `setBuffer(audioBuffer)` [源码:17409](../../eyes/src/vendor/three/core.js#L17409)：当前操作：写入 buffer、sourceType；返回 this.buffer=audioBuffer,this.sourceType="buffer",this.autoplay&&this.play(),this。
- `play(delay=0)` [源码:17412](../../eyes/src/vendor/three/core.js#L17412)：当前操作：写入 _startedAt、isPlaying、source；返回 void warn("Audio: Audio is already playing.")、void warn("Audio: this Audio has no playback control.")、source.buffer=this.buffer,source.loop=this.loop,source.loopStart=this.loopStart,source.loopEnd=this.loopEnd,source.onended=this.onEnded.bind(this),source.start(this._startedAt,this._progress+this.offset,this.duration),th。
- `pause()` [源码:17420](../../eyes/src/vendor/three/core.js#L17420)：hasPlaybackControl=false 警告并返回 undefined；若播放中，把 max(currentTime-startedAt,0)*playbackRate 加入 _progress，循环按 duration\|\|buffer.duration 取模。停止 source、清 onended、isPlaying=false，返回 this，保留进度供继续。非播放中不停止 source。
- `stop(e=0)` [源码:17425](../../eyes/src/vendor/three/core.js#L17425)：无控制权同样警告退出；进度归0，source 非null才在 currentTime+delay 调 stop并清 onended，立即设 isPlaying=false，返回 this。delay 影响真实声源停止时间，不推迟该对象状态修改。
- `connect()` [源码:17429](../../eyes/src/vendor/three/core.js#L17429)：当前操作：写入 _connected；返回 this._connected=!0,this。
- `disconnect()` [源码:17437](../../eyes/src/vendor/three/core.js#L17437)：当前操作：写入 _connected；返回 this._connected=!1,this。
- `getFilters()` [源码:17452](../../eyes/src/vendor/three/core.js#L17452)：Returns the current set filters. @return {Array<AudioNode>} The list of filters.
- `setFilters(value)` [源码:17455](../../eyes/src/vendor/three/core.js#L17455)：当前操作：写入 filters；返回 value\|\|(value=[]),!0===this._connected?(this.disconnect(),this.filters=value.slice(),this.connect()):this.filters=value.slice(),this。
- `setDetune(value)` [源码:17458](../../eyes/src/vendor/three/core.js#L17458)：当前操作：写入 detune；返回 this.detune=value,!0===this.isPlaying&&void 0!==this.source.detune&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this。
- `getDetune()` [源码:17466](../../eyes/src/vendor/three/core.js#L17466)：Returns the detuning of oscillation in cents. @return {number} The detuning of oscillation in cents.
- `getFilter()` [源码:17474](../../eyes/src/vendor/three/core.js#L17474)：Returns the first filter in the list of filters. @return {AudioNode\|undefined} The first filter in the list of filters.
- `setFilter(filter)` [源码:17483](../../eyes/src/vendor/three/core.js#L17483)：Applies a single filter node to the audio. @param {AudioNode} [filter] - The filter to set. @return {Audio} A reference to this instance.
- `setPlaybackRate(playbackRate)` [源码:17487](../../eyes/src/vendor/three/core.js#L17487)：无控制权退出；存 playbackRate，播放中对 AudioParam 用 setTargetAtTime(value,currentTime,.01) 平滑趋近。返回 this，不校验正负或重算已积累 _progress。
- `getPlaybackRate()` [源码:17495](../../eyes/src/vendor/three/core.js#L17495)：Returns the current playback rate. @return {number} The playback rate.
- `onEnded()` [源码:17498](../../eyes/src/vendor/three/core.js#L17498)：当前操作：写入 _progress、isPlaying；返回 无显式返回。
- `getLoop()` [源码:17501](../../eyes/src/vendor/three/core.js#L17501)：当前操作：写入 无直接字段写入；返回 !1===this.hasPlaybackControl?(warn("Audio: this Audio has no playback control."),!1):this.loop。
- `setLoop(loop)` [源码:17505](../../eyes/src/vendor/three/core.js#L17505)：无控制权退出；存 loop，播放时同步 source.loop，否则只保留以供下次播放。返回 this；不会在此更改 loopStart/loopEnd 或进度。
- `setLoopStart(value)` [源码:17516](../../eyes/src/vendor/three/core.js#L17516)：Sets the loop start value which defines where in the audio buffer the replay should start, in seconds. @param {number} value - The loop start value. @return {Audio} A reference to this instance.
- `setLoopEnd(value)` [源码:17526](../../eyes/src/vendor/three/core.js#L17526)：Sets the loop end value which defines where in the audio buffer the replay should stop, in seconds. @param {number} value - The loop end value. @return {Audio} A reference to this instance.
- `getVolume()` [源码:17534](../../eyes/src/vendor/three/core.js#L17534)：Returns the volume. @return {number} The volume.
- `setVolume(value)` [源码:17537](../../eyes/src/vendor/three/core.js#L17537)：当前操作：写入 无直接字段写入；返回 this.gain.gain.setTargetAtTime(value,this.context.currentTime,.01),this。
- `copy(source, recursive)` [源码:17540](../../eyes/src/vendor/three/core.js#L17540)：当前操作：写入 autoplay、buffer、detune、duration、filters、hasPlaybackControl、loop、loopEnd、loopStart、offset、playbackRate、sourceType；返回 super.copy(source,recursive),"buffer"!==source.sourceType?(warn("Audio: Audio source type cannot be copied."),this):(this.autoplay=source.autoplay,this.buffer=source.buffer,this.detune=source.detune,this.loop=source.loop。
- `clone(recursive)` [源码:17543](../../eyes/src/vendor/three/core.js#L17543)：当前操作：写入 无直接字段写入；返回 new this.constructor(this.listener).copy(this,recursive)。

### `PositionalAudio`

Represents a positional audio object. ˋˋˋjs // create an AudioListener and add it to the camera const listener = new THREE.AudioListener(); camera.add( listener ); // create the PositionalAudio object (passing in the listener) const sound = new THREE.PositionalAudio( listener ); // load a sound and set it as the PositionalAudio object's buffer const audioLoader = new THREE.AudioLoader(); audioLoader.load( 'sounds/song.ogg', function( buffer ) { sound.setBuffer( buffer ); sound.setRefDistance( 20 ); sound.play(); }); // create an object for the sound to play from const sphere = new THREE.SphereGeometry( 20, 32, 16 ); const material = new THREE.MeshPhongMaterial( { color: 0xff2200 } ); const mesh = new THREE.Mesh( sphere, material ); scene.add( mesh ); // finally add the sound to the mesh mesh.add( sound ); @augments Audio。父类 `Audio`。

- `constructor(listener)` [源码:17582](../../eyes/src/vendor/three/core.js#L17582)：当前操作：写入 panner、panner.panningModel；返回 无显式返回。
- `connect()` [源码:17585](../../eyes/src/vendor/three/core.js#L17585)：当前操作：写入 无直接字段写入；返回 super.connect(),this.panner.connect(this.gain),this。
- `disconnect()` [源码:17588](../../eyes/src/vendor/three/core.js#L17588)：当前操作：写入 无直接字段写入；返回 super.disconnect(),this.panner.disconnect(this.gain),this。
- `getOutput()` [源码:17591](../../eyes/src/vendor/three/core.js#L17591)：当前操作：写入 无直接字段写入；返回 this.panner。
- `getRefDistance()` [源码:17599](../../eyes/src/vendor/three/core.js#L17599)：Returns the current reference distance. @return {number} The reference distance.
- `setRefDistance(value)` [源码:17610](../../eyes/src/vendor/three/core.js#L17610)：Defines the reference distance for reducing volume as the audio source moves further from the listener – i.e. the distance at which the volume reduction starts taking effect. @param {number} value - The reference distance to set. @return {PositionalAudio} A reference to this instance.
- `getRolloffFactor()` [源码:17618](../../eyes/src/vendor/three/core.js#L17618)：Returns the current rolloff factor. @return {number} The rolloff factor.
- `setRolloffFactor(value)` [源码:17627](../../eyes/src/vendor/three/core.js#L17627)：Defines how quickly the volume is reduced as the source moves away from the listener. @param {number} value - The rolloff factor. @return {PositionalAudio} A reference to this instance.
- `getDistanceModel()` [源码:17635](../../eyes/src/vendor/three/core.js#L17635)：Returns the current distance model. @return {('linear'\|'inverse'\|'exponential')} The distance model.
- `setDistanceModel(value)` [源码:17648](../../eyes/src/vendor/three/core.js#L17648)：Defines which algorithm to use to reduce the volume of the audio source as it moves away from the listener. Read [the spec](https://www.w3.org/TR/webaudio-1.1/#enumdef-distancemodeltype) for more details. @param {('linear'\|'inverse'\|'exponential')} value - The distance model to set. @return {PositionalAudio} A reference to this instance.
- `getMaxDistance()` [源码:17656](../../eyes/src/vendor/three/core.js#L17656)：Returns the current max distance. @return {number} The max distance.
- `setMaxDistance(value)` [源码:17668](../../eyes/src/vendor/three/core.js#L17668)：Defines the maximum distance between the audio source and the listener, after which the volume is not reduced any further. This value is used only by the ˋlinearˋ distance model. @param {number} value - The max distance. @return {PositionalAudio} A reference to this instance.
- `setDirectionalCone(coneInnerAngle, coneOuterAngle, coneOuterGain)` [源码:17679](../../eyes/src/vendor/three/core.js#L17679)：Sets the directional cone in which the audio can be listened. @param {number} coneInnerAngle - An angle, in degrees, of a cone inside of which there will be no volume reduction. @param {number} coneOuterAngle - An angle, in degrees, of a cone outside of which the volume will be reduced by a constant value, defined by the ˋconeOuterGainˋ parameter. @param {number} coneOuterGain - The amount of volume reduction outside the cone defined by the ˋconeOuterAngleˋ. When set to ˋ0ˋ, no sound can be heard. @return {PositionalAudio} A reference to this instance.
- `updateMatrixWorld(force)` [源码:17682](../../eyes/src/vendor/three/core.js#L17682)：当前操作：写入 无直接字段写入；返回 void。

### `AudioAnalyser`

This class can be used to analyse audio data. ˋˋˋjs // create an AudioListener and add it to the camera const listener = new THREE.AudioListener(); camera.add( listener ); // create an Audio source const sound = new THREE.Audio( listener ); // load a sound and set it as the Audio object's buffer const audioLoader = new THREE.AudioLoader(); audioLoader.load( 'sounds/ambient.ogg', function( buffer ) { sound.setBuffer( buffer ); sound.setLoop(true); sound.setVolume(0.5); sound.play(); }); // create an AudioAnalyser, passing in the sound and desired fftSize const analyser = new THREE.AudioAnalyser( sound, 32 ); // get the average frequency of the sound const data = analyser.getAverageFrequency(); ˋˋˋ。父类 `无`。

- `constructor(audio, fftSize=2048)` [源码:17726](../../eyes/src/vendor/three/core.js#L17726)：Constructs a new audio analyzer. @param {Audio} audio - The audio to analyze. @param {number} [fftSize=2048] - The window size in samples that is used when performing a Fast Fourier Transform (FFT) to get frequency domain data.
- `getFrequencyData()` [源码:17739](../../eyes/src/vendor/three/core.js#L17739)：Returns an array with frequency data of the audio. Each item in the array represents the decibel value for a specific frequency. The frequencies are spread linearly from 0 to 1/2 of the sample rate. For example, for 48000 sample rate, the last item of the array will represent the decibel value for 24000 Hz. @return {Uint8Array} The frequency data.
- `getAverageFrequency()` [源码:17742](../../eyes/src/vendor/three/core.js#L17742)：当前操作：写入 无直接字段写入；返回 value/data.length。

### `PropertyMixer`

Buffered scene graph property that allows weighted accumulation; used internally.。父类 `无`。

- `constructor(binding, t, valueSize)` [源码:17754](../../eyes/src/vendor/three/core.js#L17754)：输入 binding、typeName、valueSize，四元数选 slerp/slerpAdditive 与单位四元数 identity，Float64Array 六区、workIndex=5；bool/string 用普通 Array 五区与选择函数；数值 Float64Array 五区与 lerp/加法。origIndex=3/addIndex=4，权重/使用/引用计数归0。buffer 的不同区保存输入、累积、原值和 additive，不是一个独立值数组。
- `accumulate(accuIndex, weight)` [源码:17769](../../eyes/src/vendor/three/core.js#L17769)：当前操作：写入 cumulativeWeight；返回 无显式返回。
- `accumulateAdditive(weight)` [源码:17784](../../eyes/src/vendor/three/core.js#L17784)：当前操作：写入 cumulativeWeightAdditive；返回 无显式返回。
- `apply(accuIndex)` [源码:17790](../../eyes/src/vendor/three/core.js#L17790)：当前操作：写入 cumulativeWeight、cumulativeWeightAdditive；返回 无显式返回。
- `saveOriginalState()` [源码:17807](../../eyes/src/vendor/three/core.js#L17807)：当前操作：写入 cumulativeWeight、cumulativeWeightAdditive；返回 无显式返回。
- `restoreOriginalState()` [源码:17816](../../eyes/src/vendor/three/core.js#L17816)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setAdditiveIdentityNumeric()` [源码:17820](../../eyes/src/vendor/three/core.js#L17820)：当前操作：写入 buffer[i]；返回 无显式返回。
- `_setAdditiveIdentityQuaternion()` [源码:17825](../../eyes/src/vendor/three/core.js#L17825)：当前操作：写入 buffer[this._addIndex*this.valueSize+3]；返回 无显式返回。
- `_setAdditiveIdentityOther()` [源码:17828](../../eyes/src/vendor/three/core.js#L17828)：当前操作：写入 buffer[targetIndex+i]；返回 无显式返回。
- `_select(buffer, dstOffset, srcOffset, t, stride)` [源码:17833](../../eyes/src/vendor/three/core.js#L17833)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_slerp(buffer, dstOffset, srcOffset, t)` [源码:17836](../../eyes/src/vendor/three/core.js#L17836)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_slerpAdditive(buffer, dstOffset, srcOffset, t, stride)` [源码:17839](../../eyes/src/vendor/three/core.js#L17839)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_lerp(buffer, dstOffset, srcOffset, t, stride)` [源码:17843](../../eyes/src/vendor/three/core.js#L17843)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_lerpAdditive(buffer, dstOffset, srcOffset, t, stride)` [源码:17850](../../eyes/src/vendor/three/core.js#L17850)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `PropertyBinding`

Note: This class uses a State pattern on a per-method basis: 'bind' sets 'this.getValue' / 'setValue' and shadows the prototype version of these methods with one that represents the bound state. When the property is not found, the methods become no-ops. This holds a reference to a real property in the scene graph; used internally.。父类 `无`。

- `constructor(rootNode, path, parsedPath)` [源码:17880](../../eyes/src/vendor/three/core.js#L17880)：Constructs a new property binding. @param {Object} rootNode - The root node. @param {string} path - The path. @param {?Object} [parsedPath] - The parsed path.
- `static create(e, t, n)` [源码:17884](../../eyes/src/vendor/three/core.js#L17884)：root 有 isAnimationObjectGroup 标志则返回 Composite，否则普通 PropertyBinding；path/parsedPath 透传。此处不强制 root 非null，也不自己解析或立刻写入目标。
- `static sanitizeNodeName(name)` [源码:17887](../../eyes/src/vendor/three/core.js#L17887)：当前操作：写入 无直接字段写入；返回 name.replace(/\s/g,"_").replace(regExp,"")。
- `static parseTrackName(trackName)` [源码:17890](../../eyes/src/vendor/three/core.js#L17890)：当前操作：写入 无直接字段写入；返回 results。
- `static findNode(root, nodeName)` [源码:17908](../../eyes/src/vendor/three/core.js#L17908)：当前操作：写入 无直接字段写入；返回 root、bone、subTreeNode、null。
- `_getValue_unavailable()` [源码:17929](../../eyes/src/vendor/three/core.js#L17929)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setValue_unavailable()` [源码:17930](../../eyes/src/vendor/three/core.js#L17930)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getValue_direct(buffer, offset)` [源码:17931](../../eyes/src/vendor/three/core.js#L17931)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getValue_array(buffer, offset)` [源码:17934](../../eyes/src/vendor/three/core.js#L17934)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getValue_arrayElement(buffer, offset)` [源码:17938](../../eyes/src/vendor/three/core.js#L17938)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getValue_toArray(buffer, offset)` [源码:17941](../../eyes/src/vendor/three/core.js#L17941)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setValue_direct(buffer, offset)` [源码:17944](../../eyes/src/vendor/three/core.js#L17944)：当前操作：写入 targetObject[this.propertyName]；返回 无显式返回。
- `_setValue_direct_setNeedsUpdate(buffer, offset)` [源码:17947](../../eyes/src/vendor/three/core.js#L17947)：当前操作：写入 targetObject.needsUpdate、targetObject[this.propertyName]；返回 无显式返回。
- `_setValue_direct_setMatrixWorldNeedsUpdate(buffer, offset)` [源码:17950](../../eyes/src/vendor/three/core.js#L17950)：当前操作：写入 targetObject.matrixWorldNeedsUpdate、targetObject[this.propertyName]；返回 无显式返回。
- `_setValue_array(buffer, offset)` [源码:17953](../../eyes/src/vendor/three/core.js#L17953)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setValue_array_setNeedsUpdate(buffer, offset)` [源码:17957](../../eyes/src/vendor/three/core.js#L17957)：当前操作：写入 targetObject.needsUpdate；返回 无显式返回。
- `_setValue_array_setMatrixWorldNeedsUpdate(buffer, offset)` [源码:17962](../../eyes/src/vendor/three/core.js#L17962)：当前操作：写入 targetObject.matrixWorldNeedsUpdate；返回 无显式返回。
- `_setValue_arrayElement(buffer, offset)` [源码:17967](../../eyes/src/vendor/three/core.js#L17967)：当前操作：写入 resolvedProperty[this.propertyIndex]；返回 无显式返回。
- `_setValue_arrayElement_setNeedsUpdate(buffer, offset)` [源码:17970](../../eyes/src/vendor/three/core.js#L17970)：当前操作：写入 resolvedProperty[this.propertyIndex]、targetObject.needsUpdate；返回 无显式返回。
- `_setValue_arrayElement_setMatrixWorldNeedsUpdate(buffer, offset)` [源码:17973](../../eyes/src/vendor/three/core.js#L17973)：当前操作：写入 resolvedProperty[this.propertyIndex]、targetObject.matrixWorldNeedsUpdate；返回 无显式返回。
- `_setValue_fromArray(buffer, offset)` [源码:17976](../../eyes/src/vendor/three/core.js#L17976)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setValue_fromArray_setNeedsUpdate(buffer, offset)` [源码:17979](../../eyes/src/vendor/three/core.js#L17979)：当前操作：写入 targetObject.needsUpdate；返回 无显式返回。
- `_setValue_fromArray_setMatrixWorldNeedsUpdate(buffer, offset)` [源码:17982](../../eyes/src/vendor/three/core.js#L17982)：当前操作：写入 targetObject.matrixWorldNeedsUpdate；返回 无显式返回。
- `_getValue_unbound(targetArray, offset)` [源码:17985](../../eyes/src/vendor/three/core.js#L17985)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setValue_unbound(sourceArray, offset)` [源码:17988](../../eyes/src/vendor/three/core.js#L17988)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `bind()` [源码:17992](../../eyes/src/vendor/three/core.js#L17992)：找不到缓存 node 时从 root/path 寻找；先把 getter/setter 置 unavailable，缺节点/对象/属性报错后保持不可用。支持 materials、bones 按名转索引、map 在节点或材质上解析，普通 objectName/index 逐层访问。记录 target/resolvedProperty，不克隆目标。
- `unbind()` [源码:18050](../../eyes/src/vendor/three/core.js#L18050)：当前操作：写入 getValue、node、setValue；返回 无显式返回。

### `Composite`

精确业务语义尚未确认，以下提供声明与操作证据。。父类 `无`。

- `constructor(targetGroup, path, optionalParsedPath)` [源码:18055](../../eyes/src/vendor/three/core.js#L18055)：当前操作：写入 _bindings、_targetGroup；返回 无显式返回。
- `getValue(array, offset)` [源码:18059](../../eyes/src/vendor/three/core.js#L18059)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setValue(array, offset)` [源码:18065](../../eyes/src/vendor/three/core.js#L18065)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `bind()` [源码:18069](../../eyes/src/vendor/three/core.js#L18069)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `unbind()` [源码:18073](../../eyes/src/vendor/three/core.js#L18073)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `AnimationObjectGroup`

让多个对象共享同一组动画绑定。父类 `无`。

- `constructor()` [源码:18088](../../eyes/src/vendor/three/core.js#L18088)：当前操作：写入 _bindings、_bindingsIndicesByPath、_indicesByUUID、_objects、_parsedPaths、_paths、isAnimationObjectGroup、nCachedObjects_、stats、uuid；返回 无显式返回。
- `add()` [源码:18110](../../eyes/src/vendor/three/core.js#L18110)：维护 _objects 的缓存前缀 [0,nCachedObjects_) 与活跃后缀、UUID→索引以及每条 path 对齐 bindings。新对象追加并建绑定；缓存对象与最后缓存交换进入活跃区，缺绑定补建；发现重复 UUID 对象则 error。本地和官方都用 knownObject 临时变量参与重复检查，本文记录现状而不宣称逻辑完美。
- `remove()` [源码:18142](../../eyes/src/vendor/three/core.js#L18142)：当前操作：写入 nCachedObjects_；返回 无显式返回。
- `uncache()` [源码:18167](../../eyes/src/vendor/three/core.js#L18167)：永久删指定 UUID 的索引；缓存对象先与最后缓存交换，再把最后对象填入活跃边界，活跃对象直接以尾部 swap-pop。同步所有 bindings 数组与 UUID 反向表，减少 nCachedObjects_。不是仅把对象移进缓存，也不 dispose 场景对象。
- `subscribe_(path, parsedPath)` [源码:18201](../../eyes/src/vendor/three/core.js#L18201)：当前操作：写入 无直接字段写入；返回 bindings[index]、bindingsForPath。
- `unsubscribe_(e)` [源码:18220](../../eyes/src/vendor/three/core.js#L18220)：查 path 的 binding 索引，将最后一组 bindings、parsedPaths、paths 填洞再 pop。特别是实际代码用参数 path[lastBindingsIndex] 更新索引表，不是 paths[lastBindingsIndex]，也没有在此 delete 原键；两版官方都有这个写法。不能把期望的正确缓存维护行为冒充实际行为，是否可触发错误仍需单独运行场景验证。

### `AnimationAction`

An instance of ˋAnimationActionˋ schedules the playback of an animation which is stored in {@link AnimationClip}.。父类 `无`。

- `constructor(mixer, clip, localRoot=null, blendMode=clip.blendMode)` [源码:18238](../../eyes/src/vendor/three/core.js#L18238)：当前操作：写入 _byClipCacheIndex、_cacheIndex、_clip、_effectiveTimeScale、_effectiveWeight、_interpolantSettings、_interpolants、_localRoot、_loopCount、_mixer、_propertyBindings、_restoreTimeScale、_startTime、_timeScaleInterpolant、_weightInterpolant、blendMode、clampWhenFinished、enabled、loop、paused、repetitions、time、timeScale、weight、zeroSlopeAtEnd、zeroSlopeAtStart；返回 无显式返回。
- `play()` [源码:18258](../../eyes/src/vendor/three/core.js#L18258)：Starts the playback of the animation. @return {AnimationAction} A reference to this animation action.
- `stop()` [源码:18266](../../eyes/src/vendor/three/core.js#L18266)：Stops the playback of the animation. @return {AnimationAction} A reference to this animation action.
- `reset()` [源码:18274](../../eyes/src/vendor/three/core.js#L18274)：Resets the playback of the animation. @return {AnimationAction} A reference to this animation action.
- `isRunning()` [源码:18277](../../eyes/src/vendor/three/core.js#L18277)：当前操作：写入 无直接字段写入；返回 this.enabled&&!this.paused&&0!==this.timeScale&&null===this._startTime&&this._mixer._isActiveAction(this)。
- `isScheduled()` [源码:18285](../../eyes/src/vendor/three/core.js#L18285)：Returns ˋtrueˋ when {@link AnimationAction#play} has been called. @return {boolean} Whether the animation is scheduled or not.
- `startAt(time)` [源码:18294](../../eyes/src/vendor/three/core.js#L18294)：Defines the time when the animation should start. @param {number} time - The start time in seconds. @return {AnimationAction} A reference to this animation action.
- `setLoop(mode, repetitions)` [源码:18304](../../eyes/src/vendor/three/core.js#L18304)：Configures the loop settings for this action. @param {(LoopRepeat\|LoopOnce\|LoopPingPong)} mode - The loop mode. @param {number} repetitions - The number of repetitions. @return {AnimationAction} A reference to this animation action.
- `setEffectiveWeight(weight)` [源码:18316](../../eyes/src/vendor/three/core.js#L18316)：Sets the effective weight of this action. An action has no effect and thus an effective weight of zero when the action is disabled. @param {number} weight - The weight to set. @return {AnimationAction} A reference to this animation action.
- `getEffectiveWeight()` [源码:18324](../../eyes/src/vendor/three/core.js#L18324)：Returns the effective weight of this action. @return {number} The effective weight.
- `fadeIn(duration)` [源码:18334](../../eyes/src/vendor/three/core.js#L18334)：Fades the animation in by increasing its weight gradually from ˋ0ˋ to ˋ1ˋ, within the passed time interval. @param {number} duration - The duration of the fade. @return {AnimationAction} A reference to this animation action.
- `fadeOut(duration)` [源码:18344](../../eyes/src/vendor/three/core.js#L18344)：Fades the animation out by decreasing its weight gradually from ˋ1ˋ to ˋ0ˋ, within the passed time interval. @param {number} duration - The duration of the fade. @return {AnimationAction} A reference to this animation action.
- `crossFadeFrom(fadeOutAction, duration, warp=!1)` [源码:18347](../../eyes/src/vendor/three/core.js#L18347)：当前操作：写入 _restoreTimeScale；返回 this。
- `crossFadeTo(fadeInAction, duration, warp=!1)` [源码:18366](../../eyes/src/vendor/three/core.js#L18366)：Causes this action to fade out and the given action to fade in, within the passed time interval. @param {AnimationAction} fadeInAction - The animation action to fade in. @param {number} duration - The duration of the fade. @param {boolean} [warp=false] - Whether warping should be used or not. @return {AnimationAction} A reference to this animation action.
- `stopFading()` [源码:18369](../../eyes/src/vendor/three/core.js#L18369)：当前操作：写入 _weightInterpolant；返回 null!==weightInterpolant&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(weightInterpolant)),this。
- `setEffectiveTimeScale(timeScale)` [源码:18382](../../eyes/src/vendor/three/core.js#L18382)：Sets the effective time scale of this action. An action has no effect and thus an effective time scale of zero when the action is paused. @param {number} timeScale - The time scale to set. @return {AnimationAction} A reference to this animation action.
- `getEffectiveTimeScale()` [源码:18390](../../eyes/src/vendor/three/core.js#L18390)：Returns the effective time scale of this action. @return {number} The effective time scale.
- `setDuration(duration)` [源码:18399](../../eyes/src/vendor/three/core.js#L18399)：Sets the duration for a single loop of this action. @param {number} duration - The duration to set. @return {AnimationAction} A reference to this animation action.
- `syncWith(action)` [源码:18408](../../eyes/src/vendor/three/core.js#L18408)：Synchronizes this action with the passed other action. @param {AnimationAction} action - The action to sync with. @return {AnimationAction} A reference to this animation action.
- `halt(duration)` [源码:18417](../../eyes/src/vendor/three/core.js#L18417)：Decelerates this animation's speed to ˋ0ˋ within the passed time interval. @param {number} duration - The duration. @return {AnimationAction} A reference to this animation action.
- `warp(startTimeScale, endTimeScale, duration)` [源码:18420](../../eyes/src/vendor/three/core.js#L18420)：当前操作：写入 _timeScaleInterpolant；返回 times[0]=now,times[1]=now+duration,values[0]=startTimeScale/timeScale,values[1]=endTimeScale/timeScale,this。
- `stopWarping()` [源码:18430](../../eyes/src/vendor/three/core.js#L18430)：当前操作：写入 _restoreTimeScale、_timeScaleInterpolant；返回 null!==timeScaleInterpolant&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(timeScaleInterpolant)),this._restoreTimeScale=null,this。
- `getMixer()` [源码:18439](../../eyes/src/vendor/three/core.js#L18439)：Returns the animation mixer of this animation action. @return {AnimationMixer} The animation mixer.
- `getClip()` [源码:18447](../../eyes/src/vendor/three/core.js#L18447)：Returns the animation clip of this animation action. @return {AnimationClip} The animation clip.
- `getRoot()` [源码:18455](../../eyes/src/vendor/three/core.js#L18455)：Returns the root object of this animation action. @return {Object3D} The root object.
- `_update(e, t, n, r)` [源码:18459](../../eyes/src/vendor/three/core.js#L18459)：disabled 时只更新权重；等待 startTime 时用 timeDirection 算是否到时，再乘有效 timeScale，得到 clipTime 与有效 weight。weight>0 才 evaluate 每轨 interpolant；Additive 调 accumulateAdditive，否则调用 accumulate(accuIndex,weight)。这里累加到 PropertyMixer，不直接 set 场景属性；mixer 后续统一 apply。
- `_updateWeight(time)` [源码:18475](../../eyes/src/vendor/three/core.js#L18475)：当前操作：写入 _effectiveWeight、enabled；返回 this._effectiveWeight=weight,weight。
- `_updateTimeScale(e)` [源码:18488](../../eyes/src/vendor/three/core.js#L18488)：paused 时有效速度0；否则 timeScale 乘可选 warp interpolant。过其末时刻，零速设 paused，非零可恢复 _restoreTimeScale 并存回 timeScale，stopWarping 释放控制插值器。写 _effectiveTimeScale 并返回标量；结束判定用严格大于末时间。
- `_updateTime(e)` [源码:18500](../../eyes/src/vendor/three/core.js#L18500)：把 delta 加 this.time；delta=0 返回当前或奇数 pingpong 周期的镜像时间。LoopOnce 截到0/duration并 paused或disabled，发 finished(direction)。没有替 duration=0 特设除零分支。
- `_setEndings(e, t, n)` [源码:18549](../../eyes/src/vendor/three/core.js#L18549)：修改共享 _interpolantSettings.endingStart/End；pingpong 两端固定 ZeroSlope，普通模式的真实起止按 zeroSlopeAtStart/End 选 ZeroSlope/ZeroCurvature，循环内部用 WrapAround。仅配置插值边界，不改变动作时间。
- `_scheduleFading(duration, weightNow, weightThen)` [源码:18553](../../eyes/src/vendor/three/core.js#L18553)：当前操作：写入 _weightInterpolant；返回 times[0]=now,values[0]=weightNow,times[1]=now+duration,values[1]=weightThen,this。

### `AnimationMixer`

ˋAnimationMixerˋ is a player for animations on a particular object in the scene. When multiple objects in the scene are animated independently, one ˋAnimationMixerˋ may be used for each object.。父类 `EventDispatcher`。

- `constructor(root)` [源码:18570](../../eyes/src/vendor/three/core.js#L18570)：当前操作：写入 _accuIndex、_root、time、timeScale；返回 无显式返回。
- `_bindAction(action, prototypeAction)` [源码:18575](../../eyes/src/vendor/three/core.js#L18575)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_activateAction(action)` [源码:18600](../../eyes/src/vendor/three/core.js#L18600)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_deactivateAction(action)` [源码:18616](../../eyes/src/vendor/three/core.js#L18616)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_initMemoryManager()` [源码:18626](../../eyes/src/vendor/three/core.js#L18626)：当前操作：写入 _actions、_actionsByClip、_bindings、_bindingsByRootAndName、_controlInterpolants、_nActiveActions、_nActiveBindings、_nActiveControlInterpolants、stats；返回 无显式返回。
- `_isActiveAction(action)` [源码:18656](../../eyes/src/vendor/three/core.js#L18656)：当前操作：写入 无直接字段写入；返回 null!==index&&index<this._nActiveActions。
- `_addInactiveAction(action, clipUuid, rootUuid)` [源码:18660](../../eyes/src/vendor/three/core.js#L18660)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_removeInactiveAction(e)` [源码:18674](../../eyes/src/vendor/three/core.js#L18674)：要求 action 已在 inactive 区。对全 actions 与 clip.knownActions 两级 swap-pop，并修被搬动作 _cacheIndex/_byClipCacheIndex；移除 root→action，空 clip 表删除，最后释放此 action 的 inactive bindings。动作本体留在外部仍可引用；不自动 stop 活跃动作。
- `_removeInactiveBindingsForAction(action)` [源码:18688](../../eyes/src/vendor/three/core.js#L18688)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_lendAction(action)` [源码:18695](../../eyes/src/vendor/three/core.js#L18695)：当前操作：写入 _nActiveActions；返回 无显式返回。
- `_takeBackAction(action)` [源码:18702](../../eyes/src/vendor/three/core.js#L18702)：当前操作：写入 _nActiveActions；返回 无显式返回。
- `_addInactiveBinding(binding, rootUuid, trackName)` [源码:18709](../../eyes/src/vendor/three/core.js#L18709)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_removeInactiveBinding(binding)` [源码:18715](../../eyes/src/vendor/three/core.js#L18715)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_lendBinding(binding)` [源码:18726](../../eyes/src/vendor/three/core.js#L18726)：当前操作：写入 _nActiveBindings；返回 无显式返回。
- `_takeBackBinding(binding)` [源码:18733](../../eyes/src/vendor/three/core.js#L18733)：当前操作：写入 _nActiveBindings；返回 无显式返回。
- `_lendControlInterpolant()` [源码:18740](../../eyes/src/vendor/three/core.js#L18740)：当前操作：写入 _nActiveControlInterpolants；返回 void 0===interpolant&&(interpolant=new LinearInterpolant(new Float32Array(2),new Float32Array(2),1,float32Array),interpolant.__cacheIndex=lastActiveIndex,interpolants[lastActiveIndex]=interpolant),interpolant。
- `_takeBackControlInterpolant(interpolant)` [源码:18746](../../eyes/src/vendor/three/core.js#L18746)：当前操作：写入 _nActiveControlInterpolants；返回 无显式返回。
- `clipAction(e, t, n)` [源码:18754](../../eyes/src/vendor/three/core.js#L18754)：按 optionalRoot或默认 root、clip 名/对象解析 UUID，blendMode 默认 clip值。相同 clip/root且模式相同返回缓存动作；可用 knownActions 首项为绑定原型，必要时从它取 clip。找不到 clip 返回null，否则 new AnimationAction，_bindAction、_addInactiveAction 后返回，尚未 play。
- `existingAction(e, t)` [源码:18771](../../eyes/src/vendor/three/core.js#L18771)：同样解析 root/clip查 actionsByClip.actionByRoot，返回已有或null；没有构造、绑定或激活副作用。只按 root/clip查，不带 blendMode 参数过滤。
- `stopAllAction()` [源码:18780](../../eyes/src/vendor/three/core.js#L18780)：从 _nActiveActions-1 向0遍历并 stop，避免 stop 的活跃区交换导致漏项；返回 mixer。不是遍历所有缓存 action，也不删除缓存对象。
- `update(deltaTime)` [源码:18785](../../eyes/src/vendor/three/core.js#L18785)：当前操作：写入 _accuIndex、time；返回 this。
- `setTime(time)` [源码:18800](../../eyes/src/vendor/three/core.js#L18800)：当前操作：写入 _actions[i].time、time；返回 this.update(time)。
- `getRoot()` [源码:18810](../../eyes/src/vendor/three/core.js#L18810)：Returns this mixer's root object. @return {Object3D} The mixer's root object.
- `uncacheClip(clip)` [源码:18813](../../eyes/src/vendor/three/core.js#L18813)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `uncacheRoot(e)` [源码:18831](../../eyes/src/vendor/three/core.js#L18831)：逐 clip 找此 root动作，先 deactivate 再 removeInactive；随后对该 root所有属性绑定 restoreOriginalState，再 removeInactiveBinding。恢复动画前值而不是 dispose root/geometry/material，其他 root 动作可继续共享同 clip。
- `uncacheAction(clip, optionalRoot)` [源码:18844](../../eyes/src/vendor/three/core.js#L18844)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `RenderTarget3D`

Represents a 3D render target. @augments RenderTarget。父类 `RenderTarget`。

- `constructor(width=1, height=1, depth=1, options={})` [源码:18863](../../eyes/src/vendor/three/core.js#L18863)：Constructs a new 3D render target. @param {number} [width=1] - The width of the render target. @param {number} [height=1] - The height of the render target. @param {number} [depth=1] - The height of the render target. @param {RenderTarget~Options} [options] - The configuration object.

### `Uniform`

Represents a uniform which is a global shader variable. They are passed to shader programs. When declaring a uniform of a {@link ShaderMaterial}, it is declared by value or by object. ˋˋˋjs uniforms: { time: { value: 1.0 }, resolution: new Uniform( new Vector2() ) }; ˋˋˋ Since this class can only be used in context of {@link ShaderMaterial}, it is only supported in {@link WebGLRenderer}.。父类 `无`。

- `constructor(value)` [源码:18886](../../eyes/src/vendor/three/core.js#L18886)：Constructs a new uniform. @param {any} value - The uniform value.
- `clone()` [源码:18889](../../eyes/src/vendor/three/core.js#L18889)：当前操作：写入 无直接字段写入；返回 new Uniform(void 0===this.value.clone?this.value:this.value.clone())。

### `UniformsGroup`

A class for managing multiple uniforms in a single group. The renderer will process such a definition as a single UBO. Since this class can only be used in context of {@link ShaderMaterial}, it is only supported in {@link WebGLRenderer}. @augments EventDispatcher。父类 `EventDispatcher`。

- `constructor()` [源码:18904](../../eyes/src/vendor/three/core.js#L18904)：当前操作：写入 isUniformsGroup、name、uniforms、usage；返回 无显式返回。
- `add(uniform)` [源码:18915](../../eyes/src/vendor/three/core.js#L18915)：Adds the given uniform to this uniforms group. @param {Uniform} uniform - The uniform to add. @return {UniformsGroup} A reference to this uniforms group.
- `remove(uniform)` [源码:18918](../../eyes/src/vendor/three/core.js#L18918)：当前操作：写入 无直接字段写入；返回 -1!==index&&this.uniforms.splice(index,1),this。
- `setName(name)` [源码:18928](../../eyes/src/vendor/three/core.js#L18928)：Sets the name of this uniforms group. @param {string} name - The name to set. @return {UniformsGroup} A reference to this uniforms group.
- `setUsage(value)` [源码:18937](../../eyes/src/vendor/three/core.js#L18937)：Sets the usage of this uniforms group. @param {(StaticDrawUsage\|DynamicDrawUsage\|StreamDrawUsage\|StaticReadUsage\|DynamicReadUsage\|StreamReadUsage\|StaticCopyUsage\|DynamicCopyUsage\|StreamCopyUsage)} value - The usage to set. @return {UniformsGroup} A reference to this uniforms group.
- `dispose()` [源码:18940](../../eyes/src/vendor/three/core.js#L18940)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `copy(source)` [源码:18945](../../eyes/src/vendor/three/core.js#L18945)：当前操作：写入 name、uniforms.length、usage；返回 this。
- `clone()` [源码:18960](../../eyes/src/vendor/three/core.js#L18960)：Returns a new uniforms group with copied values from this instance. @return {UniformsGroup} A clone of this instance.

### `InstancedInterleavedBuffer`

An instanced version of an interleaved buffer. @augments InterleavedBuffer。父类 `InterleavedBuffer`。

- `constructor(array, stride, meshPerAttribute=1)` [源码:18977](../../eyes/src/vendor/three/core.js#L18977)：Constructs a new instanced interleaved buffer. @param {TypedArray} array - A typed array with a shared buffer storing attribute data. @param {number} stride - The number of typed-array elements per vertex. @param {number} [meshPerAttribute=1] - Defines how often a value of this interleaved buffer should be repeated.
- `copy(source)` [源码:18980](../../eyes/src/vendor/three/core.js#L18980)：当前操作：写入 meshPerAttribute；返回 super.copy(source),this.meshPerAttribute=source.meshPerAttribute,this。
- `clone(data)` [源码:18983](../../eyes/src/vendor/three/core.js#L18983)：当前操作：写入 无直接字段写入；返回 ib.meshPerAttribute=this.meshPerAttribute,ib。
- `toJSON(data)` [源码:18987](../../eyes/src/vendor/three/core.js#L18987)：当前操作：写入 无直接字段写入；返回 json.isInstancedInterleavedBuffer=!0,json.meshPerAttribute=this.meshPerAttribute,json。

### `GLBufferAttribute`

An alternative version of a buffer attribute with more control over the VBO. The renderer does not construct a VBO for this kind of attribute. Instead, it uses whatever VBO is passed in constructor and can later be altered via the ˋbufferˋ property. The most common use case for this class is when some kind of GPGPU calculation interferes or even produces the VBOs in question. Notice that this class can only be used with {@link WebGLRenderer}.。父类 `无`。

- `constructor(buffer, type, itemSize, elementSize, count, normalized=!1)` [源码:19004](../../eyes/src/vendor/three/core.js#L19004)：当前操作：写入 buffer、count、elementSize、isGLBufferAttribute、itemSize、name、normalized、type、version；返回 无显式返回。
- `set needsUpdate(value)` [源码:19007](../../eyes/src/vendor/three/core.js#L19007)：当前操作：写入 version；返回 无显式返回。
- `setBuffer(buffer)` [源码:19016](../../eyes/src/vendor/three/core.js#L19016)：Sets the given native WebGL buffer. @param {WebGLBuffer} buffer - The buffer to set. @return {BufferAttribute} A reference to this instance.
- `setType(type, elementSize)` [源码:19026](../../eyes/src/vendor/three/core.js#L19026)：Sets the given native data type and element size. @param {number} type - The native data type (e.g. ˋgl.FLOATˋ). @param {number} elementSize - The corresponding size (in bytes) for the given ˋtypeˋ parameter. @return {BufferAttribute} A reference to this instance.
- `setItemSize(itemSize)` [源码:19035](../../eyes/src/vendor/three/core.js#L19035)：Sets the item size. @param {number} itemSize - The item size. @return {BufferAttribute} A reference to this instance.
- `setCount(count)` [源码:19044](../../eyes/src/vendor/three/core.js#L19044)：Sets the count (the expected number of vertices in VBO). @param {number} count - The count. @return {BufferAttribute} A reference to this instance.

### `Raycaster`

This class is designed to assist with raycasting. Raycasting is used for mouse picking (working out what objects in the 3d space the mouse is over) amongst other things.。父类 `无`。

- `constructor(origin, direction, near=0, far=1/0)` [源码:19055](../../eyes/src/vendor/three/core.js#L19055)：当前操作：写入 camera、far、layers、near、params、ray；返回 无显式返回。
- `set(origin, direction)` [源码:19074](../../eyes/src/vendor/three/core.js#L19074)：Updates the ray with a new origin and direction by copying the values from the arguments. @param {Vector3} origin - The origin vector where the ray casts from. @param {Vector3} direction - The (normalized) direction vector that gives direction to the ray.
- `setFromCamera(coords, camera)` [源码:19077](../../eyes/src/vendor/three/core.js#L19077)：当前操作：写入 camera；返回 无显式返回。
- `setFromXRController(controller)` [源码:19086](../../eyes/src/vendor/three/core.js#L19086)：Uses the given WebXR controller to compute a new origin and direction for the internal ray. @param {WebXRController} controller - The controller to copy the position and direction from. @return {Raycaster} A reference to this raycaster.
- `intersectObject(object, recursive=!0, intersects=[])` [源码:19125](../../eyes/src/vendor/three/core.js#L19125)：The intersection point of a raycaster intersection test. @typedef {Object} Raycaster~Intersection @property {number} distance - The distance from the ray's origin to the intersection point. @property {number} distanceToRay - Some 3D objects e.g. {@link Points} provide the distance of the intersection to the nearest point on the ray. For other objects it will be ˋundefinedˋ. @property {Vector3} point - The intersection point, in world coordinates. @property {Object} face - The face that has been intersected. @property {number} faceIndex - The face index. @property {Object3D} object - The 3D object that has been intersected. @property {Vector2} uv - U,V coordinates at point of intersection. @property {Vector2} uv1 - Second set of U,V coordinates at point of intersection. @property {Vector3} normal - Interpolated normal vector at point of intersection. @property {number} instanceId - The index number of the instance where the ray intersects the {@link InstancedMesh}. Checks all intersection between the ray and the object with or without the descendants. Intersections are returned sorted by distance, closest first. ˋRaycasterˋ delegates to the ˋraycast()ˋ method of the passed 3D object, when evaluating whether the ray intersects the object or not. This allows meshes to respond differently to ray casting than lines or points. Note that for meshes, faces must be pointed towards the origin of the ray in order to be detected; intersections of the ray passing through the back of a face will not be detected. To raycast against both faces of an object, you'll want to set {@link Material#side} to ˋTHREE.DoubleSideˋ. @param {Object3D} object - The 3D object to check for intersection with the ray. @param {boolean} [recursive=true] - If set to ˋtrueˋ, it also checks all descendants. Otherwise it only checks intersection with the object. @param {Array<Raycaster~Intersection>} [intersects=[]] The target array that holds the result of the method. @return {Array<Raycaster~Intersection>} An array holding the intersection points.
- `intersectObjects(objects, recursive=!0, intersects=[])` [源码:19128](../../eyes/src/vendor/three/core.js#L19128)：当前操作：写入 无直接字段写入；返回 intersects.sort(ascSort),intersects。

### `Clock`

Class for keeping track of time. @deprecated since r183.。父类 `无`。

- `constructor(autoStart=!0)` [源码:19154](../../eyes/src/vendor/three/core.js#L19154)：当前操作：写入 autoStart、elapsedTime、oldTime、running、startTime；返回 无显式返回。
- `start()` [源码:19157](../../eyes/src/vendor/three/core.js#L19157)：当前操作：写入 elapsedTime、oldTime、running、startTime；返回 无显式返回。
- `stop()` [源码:19160](../../eyes/src/vendor/three/core.js#L19160)：当前操作：写入 autoStart、running；返回 无显式返回。
- `getElapsedTime()` [源码:19168](../../eyes/src/vendor/three/core.js#L19168)：Returns the elapsed time in seconds. @return {number} The elapsed time.
- `getDelta()` [源码:19171](../../eyes/src/vendor/three/core.js#L19171)：当前操作：写入 elapsedTime、oldTime；返回 this.start(),0、diff。

### `Spherical`

This class can be used to represent points in 3D space as [Spherical coordinates](https://en.wikipedia.org/wiki/Spherical_coordinate_system).。父类 `无`。

- `constructor(radius=1, phi=0, theta=0)` [源码:19193](../../eyes/src/vendor/three/core.js#L19193)：Constructs a new spherical. @param {number} [radius=1] - The radius, or the Euclidean distance (straight-line distance) from the point to the origin. @param {number} [phi=0] - The polar angle in radians from the y (up) axis. @param {number} [theta=0] - The equator/azimuthal angle in radians around the y (up) axis.
- `set(radius, phi, theta)` [源码:19204](../../eyes/src/vendor/three/core.js#L19204)：Sets the spherical components by copying the given values. @param {number} radius - The radius. @param {number} phi - The polar angle. @param {number} theta - The azimuthal angle. @return {Spherical} A reference to this spherical.
- `copy(other)` [源码:19213](../../eyes/src/vendor/three/core.js#L19213)：Copies the values of the given spherical to this instance. @param {Spherical} other - The spherical to copy. @return {Spherical} A reference to this spherical.
- `makeSafe()` [源码:19216](../../eyes/src/vendor/three/core.js#L19216)：当前操作：写入 phi；返回 this.phi=clamp(this.phi,EPS,Math.PI-EPS),this。
- `setFromVector3(v)` [源码:19227](../../eyes/src/vendor/three/core.js#L19227)：Sets the spherical components from the given vector which is assumed to hold Cartesian coordinates. @param {Vector3} v - The vector to set. @return {Spherical} A reference to this spherical.
- `setFromCartesianCoords(x, y, z)` [源码:19230](../../eyes/src/vendor/three/core.js#L19230)：当前操作：写入 phi、radius、theta；返回 this.radius=Math.sqrt(x*x+y*y+z*z),0===this.radius?(this.theta=0,this.phi=0):(this.theta=Math.atan2(x,z),this.phi=Math.acos(clamp(y/this.radius,-1,1))),this。
- `clone()` [源码:19238](../../eyes/src/vendor/three/core.js#L19238)：Returns a new spherical with copied values from this instance. @return {Spherical} A clone of this instance.

### `Cylindrical`

This class can be used to represent points in 3D space as [Cylindrical coordinates](https://en.wikipedia.org/wiki/Cylindrical_coordinate_system).。父类 `无`。

- `constructor(radius=1, theta=0, y=0)` [源码:19254](../../eyes/src/vendor/three/core.js#L19254)：Constructs a new cylindrical. @param {number} [radius=1] - The distance from the origin to a point in the x-z plane. @param {number} [theta=0] - A counterclockwise angle in the x-z plane measured in radians from the positive z-axis. @param {number} [y=0] - The height above the x-z plane.
- `set(radius, theta, y)` [源码:19265](../../eyes/src/vendor/three/core.js#L19265)：Sets the cylindrical components by copying the given values. @param {number} radius - The radius. @param {number} theta - The theta angle. @param {number} y - The height value. @return {Cylindrical} A reference to this cylindrical.
- `copy(other)` [源码:19274](../../eyes/src/vendor/three/core.js#L19274)：Copies the values of the given cylindrical to this instance. @param {Cylindrical} other - The cylindrical to copy. @return {Cylindrical} A reference to this cylindrical.
- `setFromVector3(v)` [源码:19284](../../eyes/src/vendor/three/core.js#L19284)：Sets the cylindrical components from the given vector which is assumed to hold Cartesian coordinates. @param {Vector3} v - The vector to set. @return {Cylindrical} A reference to this cylindrical.
- `setFromCartesianCoords(x, y, z)` [源码:19295](../../eyes/src/vendor/three/core.js#L19295)：Sets the cylindrical components from the given Cartesian coordinates. @param {number} x - The x value. @param {number} y - The x value. @param {number} z - The x value. @return {Cylindrical} A reference to this cylindrical.
- `clone()` [源码:19303](../../eyes/src/vendor/three/core.js#L19303)：Returns a new cylindrical with copied values from this instance. @return {Cylindrical} A clone of this instance.

### `Matrix2`

Represents a 2x2 matrix. A Note on Row-Major and Column-Major Ordering: The constructor and {@link Matrix2#set} method take arguments in [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order) order, while internally they are stored in the {@link Matrix2#elements} array in column-major order. This means that calling: ˋˋˋjs const m = new THREE.Matrix2(); m.set( 11, 12, 21, 22 ); ˋˋˋ will result in the elements array containing: ˋˋˋjs m.elements = [ 11, 21, 12, 22 ]; ˋˋˋ and internally all calculations are performed using column-major ordering. However, as the actual ordering makes no difference mathematically and most people are used to thinking about matrices in row-major order, the three.js documentation shows matrices in row-major order. Just bear in mind that if you are reading the source code, you'll have to take the transpose of any matrices outlined here to make sense of the calculations.。父类 `无`。

- `static <static block>()` [源码:19334](../../eyes/src/vendor/three/core.js#L19334)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `constructor(n11, n12, n21, n22)` [源码:19337](../../eyes/src/vendor/three/core.js#L19337)：当前操作：写入 elements；返回 无显式返回。
- `identity()` [源码:19345](../../eyes/src/vendor/three/core.js#L19345)：Sets this matrix to the 2x2 identity matrix. @return {Matrix2} A reference to this matrix.
- `fromArray(array, offset=0)` [源码:19348](../../eyes/src/vendor/three/core.js#L19348)：当前操作：写入 elements[i]；返回 this。
- `set(n11, n12, n21, n22)` [源码:19362](../../eyes/src/vendor/three/core.js#L19362)：Sets the elements of the matrix.The arguments are supposed to be in row-major order. @param {number} n11 - 1-1 matrix element. @param {number} n12 - 1-2 matrix element. @param {number} n21 - 2-1 matrix element. @param {number} n22 - 2-2 matrix element. @return {Matrix2} A reference to this matrix.

### `Box2`

Represents an axis-aligned bounding box (AABB) in 2D space.。父类 `无`。

- `constructor(min=new Vector2(1/0,1/0), max=new Vector2(-1/0,-1/0))` [源码:19372](../../eyes/src/vendor/three/core.js#L19372)：当前操作：写入 isBox2、max、min；返回 无显式返回。
- `set(min, max)` [源码:19383](../../eyes/src/vendor/three/core.js#L19383)：Sets the lower and upper boundaries of this box. Please note that this method only copies the values from the given objects. @param {Vector2} min - The lower boundary of the box. @param {Vector2} max - The upper boundary of the box. @return {Box2} A reference to this bounding box.
- `setFromPoints(points)` [源码:19386](../../eyes/src/vendor/three/core.js#L19386)：当前操作：写入 无直接字段写入；返回 this。
- `setFromCenterAndSize(center, size)` [源码:19391](../../eyes/src/vendor/three/core.js#L19391)：当前操作：写入 无直接字段写入；返回 this.min.copy(center).sub(halfSize),this.max.copy(center).add(halfSize),this。
- `clone()` [源码:19400](../../eyes/src/vendor/three/core.js#L19400)：Returns a new box with copied values from this instance. @return {Box2} A clone of this instance.
- `copy(box)` [源码:19409](../../eyes/src/vendor/three/core.js#L19409)：Copies the values of the given box to this instance. @param {Box2} box - The box to copy. @return {Box2} A reference to this bounding box.
- `makeEmpty()` [源码:19412](../../eyes/src/vendor/three/core.js#L19412)：当前操作：写入 max.x、max.y、min.x、min.y；返回 this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this。
- `isEmpty()` [源码:19422](../../eyes/src/vendor/three/core.js#L19422)：Returns true if this box includes zero points within its bounds. Note that a box with equal lower and upper bounds still includes one point, the one both bounds share. @return {boolean} Whether this box is empty or not.
- `getCenter(target)` [源码:19425](../../eyes/src/vendor/three/core.js#L19425)：当前操作：写入 无直接字段写入；返回 this.isEmpty()?target.set(0,0):target.addVectors(this.min,this.max).multiplyScalar(.5)。
- `getSize(target)` [源码:19434](../../eyes/src/vendor/three/core.js#L19434)：Returns the dimensions of this box. @param {Vector2} target - The target vector that is used to store the method's result. @return {Vector2} The size.
- `expandByPoint(point)` [源码:19443](../../eyes/src/vendor/three/core.js#L19443)：Expands the boundaries of this box to include the given point. @param {Vector2} point - The point that should be included by the bounding box. @return {Box2} A reference to this bounding box.
- `expandByVector(vector)` [源码:19455](../../eyes/src/vendor/three/core.js#L19455)：Expands this box equilaterally by the given vector. The width of this box will be expanded by the x component of the vector in both directions. The height of this box will be expanded by the y component of the vector in both directions. @param {Vector2} vector - The vector that should expand the bounding box. @return {Box2} A reference to this bounding box.
- `expandByScalar(scalar)` [源码:19465](../../eyes/src/vendor/three/core.js#L19465)：Expands each dimension of the box by the given scalar. If negative, the dimensions of the box will be contracted. @param {number} scalar - The scalar value that should expand the bounding box. @return {Box2} A reference to this bounding box.
- `containsPoint(point)` [源码:19474](../../eyes/src/vendor/three/core.js#L19474)：Returns ˋtrueˋ if the given point lies within or on the boundaries of this box. @param {Vector2} point - The point to test. @return {boolean} Whether the bounding box contains the given point or not.
- `containsBox(box)` [源码:19484](../../eyes/src/vendor/three/core.js#L19484)：Returns ˋtrueˋ if this bounding box includes the entirety of the given bounding box. If this box and the given one are identical, this function also returns ˋtrueˋ. @param {Box2} box - The bounding box to test. @return {boolean} Whether the bounding box contains the given bounding box or not.
- `getParameter(point, target)` [源码:19494](../../eyes/src/vendor/three/core.js#L19494)：Returns a point as a proportion of this box's width and height. @param {Vector2} point - A point in 2D space. @param {Vector2} target - The target vector that is used to store the method's result. @return {Vector2} A point as a proportion of this box's width and height.
- `intersectsBox(box)` [源码:19503](../../eyes/src/vendor/three/core.js#L19503)：Returns ˋtrueˋ if the given bounding box intersects with this bounding box. @param {Box2} box - The bounding box to test. @return {boolean} Whether the given bounding box intersects with this bounding box.
- `clampPoint(point, target)` [源码:19513](../../eyes/src/vendor/three/core.js#L19513)：Clamps the given point within the bounds of this box. @param {Vector2} point - The point to clamp. @param {Vector2} target - The target vector that is used to store the method's result. @return {Vector2} The clamped point.
- `distanceToPoint(point)` [源码:19523](../../eyes/src/vendor/three/core.js#L19523)：Returns the euclidean distance from any edge of this box to the specified point. If the given point lies inside of this box, the distance will be ˋ0ˋ. @param {Vector2} point - The point to compute the distance to. @return {number} The euclidean distance.
- `intersect(box)` [源码:19535](../../eyes/src/vendor/three/core.js#L19535)：Computes the intersection of this bounding box and the given one, setting the upper bound of this box to the lesser of the two boxes' upper bounds and the lower bound of this box to the greater of the two boxes' lower bounds. If there's no overlap, makes this box empty. @param {Box2} box - The bounding box to intersect with. @return {Box2} A reference to this bounding box.
- `union(box)` [源码:19546](../../eyes/src/vendor/three/core.js#L19546)：Computes the union of this box and another and the given one, setting the upper bound of this box to the greater of the two boxes' upper bounds and the lower bound of this box to the lesser of the two boxes' lower bounds. @param {Box2} box - The bounding box that will be unioned with this instance. @return {Box2} A reference to this bounding box.
- `translate(offset)` [源码:19556](../../eyes/src/vendor/three/core.js#L19556)：Adds the given offset to both the upper and lower bounds of this bounding box, effectively moving it in 2D space. @param {Vector2} offset - The offset that should be used to translate the bounding box. @return {Box2} A reference to this bounding box.
- `equals(box)` [源码:19565](../../eyes/src/vendor/three/core.js#L19565)：Returns ˋtrueˋ if this bounding box is equal with the given one. @param {Box2} box - The box to test for equality. @return {boolean} Whether this bounding box is equal with the given one.

### `Line3`

An analytical line segment in 3D space represented by a start and end point.。父类 `无`。

- `constructor(start=new Vector3(), end=new Vector3())` [源码:19586](../../eyes/src/vendor/three/core.js#L19586)：Constructs a new line segment. @param {Vector3} [start=(0,0,0)] - Start of the line segment. @param {Vector3} [end=(0,0,0)] - End of the line segment.
- `set(start, end)` [源码:19596](../../eyes/src/vendor/three/core.js#L19596)：Sets the start and end values by copying the given vectors. @param {Vector3} start - The start point. @param {Vector3} end - The end point. @return {Line3} A reference to this line segment.
- `copy(line)` [源码:19605](../../eyes/src/vendor/three/core.js#L19605)：Copies the values of the given line segment to this instance. @param {Line3} line - The line segment to copy. @return {Line3} A reference to this line segment.
- `getCenter(target)` [源码:19608](../../eyes/src/vendor/three/core.js#L19608)：当前操作：写入 无直接字段写入；返回 target.addVectors(this.start,this.end).multiplyScalar(.5)。
- `delta(target)` [源码:19617](../../eyes/src/vendor/three/core.js#L19617)：Returns the delta vector of the line segment's start and end point. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The delta vector.
- `distanceSq()` [源码:19625](../../eyes/src/vendor/three/core.js#L19625)：Returns the squared Euclidean distance between the line' start and end point. @return {number} The squared Euclidean distance.
- `distance()` [源码:19633](../../eyes/src/vendor/three/core.js#L19633)：Returns the Euclidean distance between the line' start and end point. @return {number} The Euclidean distance.
- `at(t, target)` [源码:19643](../../eyes/src/vendor/three/core.js#L19643)：Returns a vector at a certain position along the line segment. @param {number} t - A value between ˋ[0,1]ˋ to represent a position along the line segment. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The delta vector.
- `closestPointToPointParameter(e, t)` [源码:19647](../../eyes/src/vendor/three/core.js#L19647)：返回 (end-start)·(point-start)/\|end-start\|²；零长度返回0，clampToLine 为真时夹到[0,1]。只给参数不写最近点，也不改变端点。
- `closestPointToPoint(point, clampToLine, target)` [源码:19662](../../eyes/src/vendor/three/core.js#L19662)：Returns the closest point on the line for a given point. @param {Vector3} point - The point to compute the closest point on the line for. @param {boolean} clampToLine - Whether to clamp the result to the range ˋ[0,1]ˋ or not. @param {Vector3} target - The target vector that is used to store the method's result. @return {Vector3} The closest point on the line.
- `distanceSqToLine3(e, t=Qc, n=Kc)` [源码:19667](../../eyes/src/vendor/three/core.js#L19667)：两线段最近点解，长度平方<=1e-16 作退化，先处理两点/单点情况，其余解二元投影并将 s/t夹到[0,1]，平行分母0先取s=0再修边界。通常写 c1/c2为最近点并返回平方距离；两条都退化时实际把 c1减去c2，c1最终是差向量，这是代码可见的边界。默认输出是共享模块临时量。
- `applyMatrix4(matrix)` [源码:19695](../../eyes/src/vendor/three/core.js#L19695)：Applies a 4x4 transformation matrix to this line segment. @param {Matrix4} matrix - The transformation matrix. @return {Line3} A reference to this line segment.
- `equals(line)` [源码:19704](../../eyes/src/vendor/three/core.js#L19704)：Returns ˋtrueˋ if this line segment is equal with the given one. @param {Line3} line - The line segment to test for equality. @return {boolean} Whether this line segment is equal with the given one.
- `clone()` [源码:19712](../../eyes/src/vendor/three/core.js#L19712)：Returns a new line segment with copied values from this instance. @return {Line3} A clone of this instance.

### `SpotLightHelper`

This displays a cone shaped helper object for a {@link SpotLight}. When the spot light or its target are transformed or light properties are changed, it's necessary to call the ˋupdate()ˋ method of the respective helper. ˋˋˋjs const spotLight = new THREE.SpotLight( 0xffffff ); spotLight.position.set( 10, 10, 10 ); scene.add( spotLight ); const spotLightHelper = new THREE.SpotLightHelper( spotLight ); scene.add( spotLightHelper ); ˋˋˋ @augments Object3D。父类 `Object3D`。

- `constructor(light, color)` [源码:19735](../../eyes/src/vendor/three/core.js#L19735)：当前操作：写入 color、cone、light、matrixAutoUpdate、type；返回 无显式返回。
- `dispose()` [源码:19751](../../eyes/src/vendor/three/core.js#L19751)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `update()` [源码:19754](../../eyes/src/vendor/three/core.js#L19754)：当前操作：写入 matrixWorldNeedsUpdate；返回 无显式返回。

### `SkeletonHelper`

A helper object to assist with visualizing a {@link Skeleton}. ˋˋˋjs const helper = new THREE.SkeletonHelper( skinnedMesh ); scene.add( helper ); ˋˋˋ @augments LineSegments。父类 `LineSegments`。

- `constructor(root)` [源码:19776](../../eyes/src/vendor/three/core.js#L19776)：递归收集 bones，仅 bone-parent也是Bone的边预留两个 position/color顶点。新 LineBasicMaterial 开 vertexColors、禁深度测/写与toneMapping、透明；root/bones保存引用，matrix直接引用root.matrixWorld，matrixAutoUpdate=false，端色蓝/绿。此时位置全0，后续 update才填骨骼端点。
- `updateMatrixWorld(force)` [源码:19797](../../eyes/src/vendor/three/core.js#L19797)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setColors(color1, color2)` [源码:19808](../../eyes/src/vendor/three/core.js#L19808)：当前操作：写入 无直接字段写入；返回 colorAttribute.needsUpdate=!0,this。
- `dispose()` [源码:19813](../../eyes/src/vendor/three/core.js#L19813)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `PointLightHelper`

This displays a helper object consisting of a spherical mesh for visualizing an instance of {@link PointLight}. ˋˋˋjs const pointLight = new THREE.PointLight( 0xff0000, 1, 100 ); pointLight.position.set( 10, 10, 10 ); scene.add( pointLight ); const sphereSize = 1; const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize ); scene.add( pointLightHelper ); ˋˋˋ @augments Mesh。父类 `Mesh`。

- `constructor(light, t, n)` [源码:19842](../../eyes/src/vendor/three/core.js#L19842)：创建低分辨率 SphereGeometry(sphereSize,4,2)+wireframe MeshBasicMaterial，fog/toneMapped=false。保存 light和可选覆盖色，matrix共享light.matrixWorld、禁自动本地矩阵，立即 update同步颜色。构造拥有辅助几何/材质，不拥有被观察的light。
- `dispose()` [源码:19849](../../eyes/src/vendor/three/core.js#L19849)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `update()` [源码:19852](../../eyes/src/vendor/three/core.js#L19852)：当前操作：写入 matrixWorldNeedsUpdate；返回 无显式返回。

### `HemisphereLightHelper`

Creates a visual aid consisting of a spherical mesh for a given {@link HemisphereLight}. When the hemisphere light is transformed or its light properties are changed, it's necessary to call the ˋupdate()ˋ method of the respective helper. ˋˋˋjs const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ); const helper = new THREE.HemisphereLightHelper( light, 5 ); scene.add( helper ); ˋˋˋ @augments Object3D。父类 `Object3D`。

- `constructor(light, size, color)` [源码:19875](../../eyes/src/vendor/three/core.js#L19875)：当前操作：写入 color、light、material、material.vertexColors、matrix、matrixAutoUpdate、type；返回 无显式返回。
- `dispose()` [源码:19887](../../eyes/src/vendor/three/core.js#L19887)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `update()` [源码:19890](../../eyes/src/vendor/three/core.js#L19890)：当前操作：写入 matrixWorldNeedsUpdate；返回 无显式返回。

### `GridHelper`

The helper is an object to define grids. Grids are two-dimensional arrays of lines. ˋˋˋjs const size = 10; const divisions = 10; const gridHelper = new THREE.GridHelper( size, divisions ); scene.add( gridHelper ); ˋˋˋ @augments LineSegments。父类 `LineSegments`。

- `constructor(e=10, t=10, n=4473924, r=8947848)` [源码:19920](../../eyes/src/vendor/three/core.js#L19920)：size/divisions 决定XZ网格：每个刻度生成两条互相垂直线，中心刻度用color1，其余color2；顶点与颜色为新 Float32 attributes。材质vertexColors=true、toneMapped=false。奇数divisions没有整数中心刻度；无divisions=0保护。
- `dispose()` [源码:19939](../../eyes/src/vendor/three/core.js#L19939)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `PolarGridHelper`

This helper is an object to define polar grids. Grids are two-dimensional arrays of lines. ˋˋˋjs const radius = 10; const sectors = 16; const rings = 8; const divisions = 64; const helper = new THREE.PolarGridHelper( radius, sectors, rings, divisions ); scene.add( helper ); ˋˋˋ @augments LineSegments。父类 `LineSegments`。

- `constructor(e=10, t=16, n=8, r=64, i=4473924, a=8947848)` [源码:19961](../../eyes/src/vendor/three/core.js#L19961)：XZ平面 radius，sectors>1才建中心到边的径向线，再建 rings个从外往内圆，每圆divisions段，交替两色。生成 position/color线段属性与不做toneMapping的顶点色材质；不是闭合索引圆，也不生成半径0的中心环。
- `dispose()` [源码:19990](../../eyes/src/vendor/three/core.js#L19990)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `DirectionalLightHelper`

Helper object to assist with visualizing a {@link DirectionalLight}'s effect on the scene. This consists of a plane and a line representing the light's position and direction. When the directional light or its target are transformed or light properties are changed, it's necessary to call the ˋupdate()ˋ method of the respective helper. ˋˋˋjs const light = new THREE.DirectionalLight( 0xFFFFFF ); scene.add( light ); const helper = new THREE.DirectionalLightHelper( light, 5 ); scene.add( helper ); ˋˋˋ @augments Object3D。父类 `Object3D`。

- `constructor(light, size, color)` [源码:20016](../../eyes/src/vendor/three/core.js#L20016)：当前操作：写入 color、light、lightPlane、matrix、matrixAutoUpdate、targetLine、type；返回 无显式返回。
- `dispose()` [源码:20026](../../eyes/src/vendor/three/core.js#L20026)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `update()` [源码:20029](../../eyes/src/vendor/three/core.js#L20029)：当前操作：写入 matrixWorldNeedsUpdate、targetLine.scale.z；返回 无显式返回。

### `CameraHelper`

This helps with visualizing what a camera contains in its frustum. It visualizes the frustum of a camera using a line segments. Based on frustum visualization in [lightgl.js shadowmap example](https://github.com/evanw/lightgl.js/blob/master/tests/shadowmap.html). ˋCameraHelperˋ must be a child of the scene. When the camera is transformed or its projection matrix is changed, it's necessary to call the ˋupdate()ˋ method of the respective helper. ˋˋˋjs const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); const helper = new THREE.CameraHelper( camera ); scene.add( helper ); ˋˋˋ @augments LineSegments。父类 `LineSegments`。

- `constructor(camera)` [源码:20055](../../eyes/src/vendor/three/core.js#L20055)：当前操作：写入 camera、matrix、matrixAutoUpdate、pointMap、type；返回 无显式返回。
- `setColors(frustum, cone, up, target, cross)` [源码:20079](../../eyes/src/vendor/three/core.js#L20079)：当前操作：写入 无直接字段写入；返回 colorAttribute.setXYZ(0,frustum.r,frustum.g,frustum.b),colorAttribute.setXYZ(1,frustum.r,frustum.g,frustum.b),colorAttribute.setXYZ(2,frustum.r,frustum.g,frustum.b),colorAttribute.setXYZ(3,frustum.r,frustum.g,frustum.b),。
- `update()` [源码:20084](../../eyes/src/vendor/three/core.js#L20084)：复制被观察相机 projectionMatrixInverse 到共享临时 camera。near/far NDC z反深度为1/0，标准WebGL为-1/1、WebGPU为0/1，非法坐标抛错。setPoint 对近远角、中心、上方向箭头和十字反投影，并按pointMap更新所有重复顶点，position.needsUpdate=true；不更新被观察相机投影。
- `dispose()` [源码:20094](../../eyes/src/vendor/three/core.js#L20094)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `BoxHelper`

Helper object to graphically show the world-axis-aligned bounding box around an object. The actual bounding box is handled with {@link Box3}, this is just a visual helper for debugging. It can be automatically resized with {@link BoxHelper#update} when the object it's created from is transformed. Note that the object must have a geometry for this to work, so it won't work with sprites. ˋˋˋjs const sphere = new THREE.SphereGeometry(); const object = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( 0xff0000 ) ); const box = new THREE.BoxHelper( object, 0xffff00 ); scene.add( box ); ˋˋˋ @augments LineSegments。父类 `LineSegments`。

- `constructor(object, color=16776960)` [源码:20126](../../eyes/src/vendor/three/core.js#L20126)：当前操作：写入 matrixAutoUpdate、object、type；返回 无显式返回。
- `update()` [源码:20135](../../eyes/src/vendor/three/core.js#L20135)：当前操作：写入 无直接字段写入；返回 void。
- `setFromObject(object)` [源码:20149](../../eyes/src/vendor/three/core.js#L20149)：Updates the wireframe box for the passed object. @param {Object3D} object - The 3D object to create the helper for. @return {BoxHelper} A reference to this instance.
- `copy(source, recursive)` [源码:20152](../../eyes/src/vendor/three/core.js#L20152)：当前操作：写入 object；返回 super.copy(source,recursive),this.object=source.object,this。
- `dispose()` [源码:20155](../../eyes/src/vendor/three/core.js#L20155)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `Box3Helper`

A helper object to visualize an instance of {@link Box3}. ˋˋˋjs const box = new THREE.Box3(); box.setFromCenterAndSize( new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( 2, 1, 3 ) ); const helper = new THREE.Box3Helper( box, 0xffff00 ); scene.add( helper ) ˋˋˋ @augments LineSegments。父类 `LineSegments`。

- `constructor(box, t=16776960)` [源码:20174](../../eyes/src/vendor/three/core.js#L20174)：8个±1立方角与12条边（24个Uint16索引），新 line材质默认黄且toneMapped=false；保存外部box引用并计算辅助几何sphere。构造不把box尺寸烘焙进顶点，后续更新通过变换呈现范围。
- `updateMatrixWorld(force)` [源码:20182](../../eyes/src/vendor/three/core.js#L20182)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `dispose()` [源码:20186](../../eyes/src/vendor/three/core.js#L20186)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `PlaneHelper`

A helper object to visualize an instance of {@link Plane}. ˋˋˋjs const plane = new THREE.Plane( new THREE.Vector3( 1, 1, 0.2 ), 3 ); const helper = new THREE.PlaneHelper( plane, 1, 0xffff00 ); scene.add( helper ); ˋˋˋ @augments Line。父类 `Line`。

- `constructor(plane, size=1, n=16776960)` [源码:20203](../../eyes/src/vendor/three/core.js#L20203)：保存外部plane与size，创建XY平面的轮廓/法线线段以及两三角填充子Mesh。填充同色opacity=.2、transparent=true、depthWrite=false，两个材质toneMapped=false，各几何算sphere。构造只建标准形状，后续方向/位置更新从plane取值。
- `updateMatrixWorld(force)` [源码:20219](../../eyes/src/vendor/three/core.js#L20219)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `dispose()` [源码:20222](../../eyes/src/vendor/three/core.js#L20222)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `ArrowHelper`

An 3D arrow object for visualizing directions. ˋˋˋjs const dir = new THREE.Vector3( 1, 2, 0 ); //normalize the direction vector (convert to vector of length 1) dir.normalize(); const origin = new THREE.Vector3( 0, 0, 0 ); const length = 1; const hex = 0xffff00; const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex ); scene.add( arrowHelper ); ˋˋˋ @augments Object3D。父类 `Object3D`。

- `constructor(dir=new Vector3(0,0,1), origin=new Vector3(0,0,0), length=1, color=16776960, headLength=.2*length, headWidth=.2*headLength)` [源码:20248](../../eyes/src/vendor/three/core.js#L20248)：当前操作：写入 cone、cone.matrixAutoUpdate、line、line.matrixAutoUpdate、type；返回 无显式返回。
- `setDirection(dir)` [源码:20257](../../eyes/src/vendor/three/core.js#L20257)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setLength(length, headLength=.2*length, headWidth=.2*headLength)` [源码:20264](../../eyes/src/vendor/three/core.js#L20264)：当前操作：写入 cone.position.y；返回 无显式返回。
- `setColor(color)` [源码:20272](../../eyes/src/vendor/three/core.js#L20272)：Sets the color of the helper. @param {number\|Color\|string} color - The color to set.
- `copy(source)` [源码:20275](../../eyes/src/vendor/three/core.js#L20275)：当前操作：写入 无直接字段写入；返回 super.copy(source,!1),this.line.copy(source.line),this.cone.copy(source.cone),this。
- `dispose()` [源码:20278](../../eyes/src/vendor/three/core.js#L20278)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `AxesHelper`

An axis object to visualize the 3 axes in a simple way. The X axis is red. The Y axis is green. The Z axis is blue. ˋˋˋjs const axesHelper = new THREE.AxesHelper( 5 ); scene.add( axesHelper ); ˋˋˋ @augments LineSegments。父类 `LineSegments`。

- `constructor(e=1)` [源码:20295](../../eyes/src/vendor/three/core.js#L20295)：三条从原点到+X/+Y/+Z、长度size的线，端点分别红到橙、绿到黄绿、蓝到青渐变；新position/color属性与vertexColors线材质、toneMapped=false。这里保留官方诊断图元色，不是新spacelibre产品表面或品牌资产。
- `setColors(xAxisColor, yAxisColor, zAxisColor)` [源码:20312](../../eyes/src/vendor/three/core.js#L20312)：Defines the colors of the axes helper. @param {number\|Color\|string} xAxisColor - The color for the x axis. @param {number\|Color\|string} yAxisColor - The color for the y axis. @param {number\|Color\|string} zAxisColor - The color for the z axis. @return {AxesHelper} A reference to this axes helper.
- `dispose()` [源码:20317](../../eyes/src/vendor/three/core.js#L20317)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `ShapePath`

This class is used to convert a series of paths to an array of shapes. It is specifically used in context of fonts and SVG.。父类 `无`。

- `constructor()` [源码:20326](../../eyes/src/vendor/three/core.js#L20326)：当前操作：写入 color、currentPath、subPaths、type、userData；返回 无显式返回。
- `moveTo(x, y)` [源码:20336](../../eyes/src/vendor/three/core.js#L20336)：Creates a new path and moves it current point to the given one. @param {number} x - The x coordinate. @param {number} y - The y coordinate. @return {ShapePath} A reference to this shape path.
- `lineTo(x, y)` [源码:20347](../../eyes/src/vendor/three/core.js#L20347)：Adds an instance of {@link LineCurve} to the path by connecting the current point with the given one. @param {number} x - The x coordinate of the end point. @param {number} y - The y coordinate of the end point. @return {ShapePath} A reference to this shape path.
- `quadraticCurveTo(aCPx, aCPy, aX, aY)` [源码:20360](../../eyes/src/vendor/three/core.js#L20360)：Adds an instance of {@link QuadraticBezierCurve} to the path by connecting the current point with the given one. @param {number} aCPx - The x coordinate of the control point. @param {number} aCPy - The y coordinate of the control point. @param {number} aX - The x coordinate of the end point. @param {number} aY - The y coordinate of the end point. @return {ShapePath} A reference to this shape path.
- `bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY)` [源码:20375](../../eyes/src/vendor/three/core.js#L20375)：Adds an instance of {@link CubicBezierCurve} to the path by connecting the current point with the given one. @param {number} aCP1x - The x coordinate of the first control point. @param {number} aCP1y - The y coordinate of the first control point. @param {number} aCP2x - The x coordinate of the second control point. @param {number} aCP2y - The y coordinate of the second control point. @param {number} aX - The x coordinate of the end point. @param {number} aY - The y coordinate of the end point. @return {ShapePath} A reference to this shape path.
- `splineThru(pts)` [源码:20385](../../eyes/src/vendor/three/core.js#L20385)：Adds an instance of {@link SplineCurve} to the path by connecting the current point with the given list of points. @param {Array<Vector2>} pts - An array of points in 2D space. @return {ShapePath} A reference to this shape path.
- `toShapes()` [源码:20389](../../eyes/src/vendor/three/core.js#L20389)：按userData.style.fillRule选nonzero（累计绕数非0）或evenodd（奇偶），未知警告回退。每subPath取点，少于3或面积0跳过；计算Box2、内部点、面积绝对值与方向；面积降序后寻找最近包含轮廓，累计winding，填充状态未改变的边界exclude。内部点先试盒中心，不在内则取水平交点前两项中点，不是通用复杂自交面片布尔求解。

### `Controls`

Abstract base class for controls. @abstract @augments EventDispatcher。父类 `EventDispatcher`。

- `constructor(object, domElement=null)` [源码:20483](../../eyes/src/vendor/three/core.js#L20483)：Constructs a new controls instance. @param {Object3D} object - The object that is managed by the controls. @param {?HTMLElement} domElement - The HTML element used for event listeners.
- `connect(domElement)` [源码:20494](../../eyes/src/vendor/three/core.js#L20494)：undefined element只警告；有值时若旧domElement非null先disconnect，再存新元素。基类不安装事件监听器，也不限制元素具体DOM类型；返回undefined。
- `disconnect()` [源码:20497](../../eyes/src/vendor/three/core.js#L20497)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `dispose()` [源码:20498](../../eyes/src/vendor/three/core.js#L20498)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `update()` [源码:20505](../../eyes/src/vendor/three/core.js#L20505)：Controls should implement this method if they have to update their internal state per simulation step. @param {number} [delta] - The time delta in seconds.

### `TextureUtils`

A class containing utility functions for textures. @hideconstructor。父类 `无`。

- `static contain(e, t)` [源码:20628](../../eyes/src/vendor/three/core.js#L20628)：图像有width时取width/height，否则图像比例1；与目标aspect比，调整repeat使一轴=1、另一轴>=1，offset=(1-repeat)/2居中，完整图像落入框内且边缘由wrapping行为决定。修改同一Texture的repeat/offset并返回，不生成新像素、不改wrap。
- `static cover(e, t)` [源码:20635](../../eyes/src/vendor/three/core.js#L20635)：同一比例比较，但将裁剪轴repeat设为<=1，offset居中，让框被图覆盖并裁掉超出部分。原位返回texture；没有非正aspect或image.height=0保护。
- `static fill(e)` [源码:20642](../../eyes/src/vendor/three/core.js#L20642)：把repeat=(1,1)、offset=(0,0)，返回同纹理；不改center/rotation/matrix，也不主动updateMatrix，因此称为“清除所有纹理变换”不准确。
- `static getByteLength(width, height, format, type)` [源码:20656](../../eyes/src/vendor/three/core.js#L20656)：Determines how many bytes must be used to represent the texture. @param {number} width - The width of the texture. @param {number} height - The height of the texture. @param {number} format - The texture's format. @param {number} type - The texture's type. @return {number} The byte length.

## `eyes/src/vendor/three/index.js`

Three.js WebGL 渲染器和 GLSL shader chunks；重导出 core 并管理 GPU、阴影、环境贴图和 XR。[源码](../../eyes/src/vendor/three/index.js)。语义状态：`partially-matched-upstream`。

[总文档中的完整条目](README.md#file-eyes-src-vendor-three-index-js)

### `PMREMGenerator`

将环境纹理预滤波为多粗糙度立方 UV 辐照贴图。父类 `无`。

- `constructor(renderer)` [源码:1332](../../eyes/src/vendor/three/index.js#L1332)：当前操作：写入 _backgroundBox、_blurMaterial、_cubeSize、_cubemapMaterial、_equirectMaterial、_ggxMaterial、_lodMax、_lodMeshes、_pingPongRenderTarget、_renderer、_sigmas、_sizeLods；返回 无显式返回。
- `fromScene(scene, sigma=0, near=.1, far=100, options={})` [源码:1335](../../eyes/src/vendor/three/index.js#L1335)：当前操作：写入 _renderer.xr.enabled；返回 o.depthBuffer=!0,this._sceneToCubeUV(scene,near,far,o,s),sigma>0&&this._blur(o,0,0,sigma),this._applyPMREM(o),this._cleanup(o),o。
- `fromEquirectangular(equirectangular, renderTarget=null)` [源码:1344](../../eyes/src/vendor/three/index.js#L1344)：当前操作：写入 无直接字段写入；返回 this._fromTexture(equirectangular,renderTarget)。
- `fromCubemap(cubemap, renderTarget=null)` [源码:1347](../../eyes/src/vendor/three/index.js#L1347)：当前操作：写入 无直接字段写入；返回 this._fromTexture(cubemap,renderTarget)。
- `compileCubemapShader()` [源码:1350](../../eyes/src/vendor/three/index.js#L1350)：当前操作：写入 _cubemapMaterial；返回 无显式返回。
- `compileEquirectangularShader()` [源码:1353](../../eyes/src/vendor/three/index.js#L1353)：当前操作：写入 _equirectMaterial；返回 无显式返回。
- `dispose()` [源码:1356](../../eyes/src/vendor/three/index.js#L1356)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setSize(cubeSize)` [源码:1359](../../eyes/src/vendor/three/index.js#L1359)：当前操作：写入 _cubeSize、_lodMax；返回 无显式返回。
- `_dispose()` [源码:1362](../../eyes/src/vendor/three/index.js#L1362)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_cleanup(outputTarget)` [源码:1366](../../eyes/src/vendor/three/index.js#L1366)：当前操作：写入 _renderer.xr.enabled；返回 无显式返回。
- `_fromTexture(texture, renderTarget)` [源码:1369](../../eyes/src/vendor/three/index.js#L1369)：当前操作：写入 _renderer.xr.enabled；返回 this._textureToCubeUV(texture,n),this._applyPMREM(n),this._cleanup(n),n。
- `_allocateTargets()` [源码:1374](../../eyes/src/vendor/three/index.js#L1374)：当前操作：写入 _blurMaterial、_ggxMaterial、_pingPongRenderTarget；返回 i。
- `_compileMaterial(material)` [源码:1507](../../eyes/src/vendor/three/index.js#L1507)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_sceneToCubeUV(scene, near, far, cubeUVRenderTarget, position)` [源码:1511](../../eyes/src/vendor/three/index.js#L1511)：当前操作：写入 _backgroundBox；返回 无显式返回。
- `_textureToCubeUV(texture, cubeUVRenderTarget)` [源码:1538](../../eyes/src/vendor/three/index.js#L1538)：当前操作：写入 _cubemapMaterial、_cubemapMaterial.uniforms.flipEnvMap.value、_equirectMaterial；返回 无显式返回。
- `_applyPMREM(cubeUVRenderTarget)` [源码:1549](../../eyes/src/vendor/three/index.js#L1549)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_applyGGXFilter(cubeUVRenderTarget, lodIn, lodOut)` [源码:1557](../../eyes/src/vendor/three/index.js#L1557)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_blur(cubeUVRenderTarget, lodIn, lodOut, sigma, poleAxis)` [源码:1575](../../eyes/src/vendor/three/index.js#L1575)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_halfBlur(targetIn, targetOut, lodIn, lodOut, sigmaRadians, direction, poleAxis)` [源码:1579](../../eyes/src/vendor/three/index.js#L1579)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `WebGLCubeRenderTarget`

WebGLCube 离屏颜色/深度附件、尺寸和释放生命周期。父类 `ThreeCore.WebGLRenderTarget`。

- `constructor(size=1, options={})` [源码:1652](../../eyes/src/vendor/three/index.js#L1652)：当前操作：写入 isWebGLCubeRenderTarget、texture、texture.isRenderTargetTexture；返回 无显式返回。
- `fromEquirectangularTexture(renderer, texture)` [源码:1662](../../eyes/src/vendor/three/index.js#L1662)：当前操作：写入 texture.colorSpace、texture.generateMipmaps、texture.magFilter、texture.minFilter、texture.type；返回 new ThreeCore.CubeCamera(1,10,this).update(renderer,mesh),texture.minFilter=o,mesh.geometry.dispose(),mesh.material.dispose(),this。
- `clear(renderer, color=!0, depth=!0, stencil=!0)` [源码:1688](../../eyes/src/vendor/three/index.js#L1688)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `SingleUniform`

上传单个 GL uniform 并缓存前值。父类 `无`。

- `constructor(id, activeInfo, addr)` [源码:2315](../../eyes/src/vendor/three/index.js#L2315)：当前操作：写入 addr、cache、id、setValue、type；返回 无显式返回。

### `PureArrayUniform`

按类型上传连续 GL uniform 数组。父类 `无`。

- `constructor(id, activeInfo, addr)` [源码:2377](../../eyes/src/vendor/three/index.js#L2377)：当前操作：写入 addr、cache、id、setValue、size、type；返回 无显式返回。

### `StructuredUniform`

按树递归上传结构体 uniform。父类 `无`。

- `constructor(id)` [源码:2439](../../eyes/src/vendor/three/index.js#L2439)：当前操作：写入 id、map、seq；返回 无显式返回。
- `setValue(gl, value, textures)` [源码:2442](../../eyes/src/vendor/three/index.js#L2442)：当前操作：写入 无直接字段写入；返回 无显式返回。

### `WebGLUniforms`

反射 GL uniform 类型并缓存上传值。父类 `无`。

- `constructor(gl, program)` [源码:2474](../../eyes/src/vendor/three/index.js#L2474)：当前操作：写入 map、seq；返回 无显式返回。
- `setValue(gl, name, value, textures)` [源码:2486](../../eyes/src/vendor/three/index.js#L2486)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setOptional(gl, object, name)` [源码:2490](../../eyes/src/vendor/three/index.js#L2490)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static upload(gl, seq, values, textures)` [源码:2494](../../eyes/src/vendor/three/index.js#L2494)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `static seqWithValue(seq, values)` [源码:2501](../../eyes/src/vendor/three/index.js#L2501)：当前操作：写入 无直接字段写入；返回 n。

### `WebGLShaderCache`

以材质关联缓存 shader stage 源码及使用计数。父类 `无`。

- `constructor()` [源码:2734](../../eyes/src/vendor/three/index.js#L2734)：当前操作：写入 materialCache、shaderCache；返回 无显式返回。
- `update(material, vertexShaderStage, fragmentShaderStage)` [源码:2737](../../eyes/src/vendor/three/index.js#L2737)：当前操作：写入 无直接字段写入；返回 !1===r.has(vertexShaderStage)&&(r.add(vertexShaderStage),vertexShaderStage.usedTimes++),!1===r.has(fragmentShaderStage)&&(r.add(fragmentShaderStage),fragmentShaderStage.usedTimes++),this。
- `remove(material)` [源码:2741](../../eyes/src/vendor/three/index.js#L2741)：当前操作：写入 无直接字段写入；返回 this.materialCache.delete(material),this。
- `getVertexShaderStage(material)` [源码:2746](../../eyes/src/vendor/three/index.js#L2746)：当前操作：写入 无直接字段写入；返回 this._getShaderStage(material.vertexShader)。
- `getFragmentShaderStage(material)` [源码:2749](../../eyes/src/vendor/three/index.js#L2749)：当前操作：写入 无直接字段写入；返回 this._getShaderStage(material.fragmentShader)。
- `dispose()` [源码:2752](../../eyes/src/vendor/three/index.js#L2752)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getShaderCacheForMaterial(material)` [源码:2755](../../eyes/src/vendor/three/index.js#L2755)：当前操作：写入 无直接字段写入；返回 void 0===n&&(n=new Set(),materialCache.set(material,n)),n。
- `_getShaderStage(code)` [源码:2760](../../eyes/src/vendor/three/index.js#L2760)：当前操作：写入 无直接字段写入；返回 void 0===n&&(n=new WebGLShaderStage(code),shaderCache.set(code,n)),n。

### `WebGLShaderStage`

保存 shader 源码与稳定 stage 标识。父类 `无`。

- `constructor(code)` [源码:2767](../../eyes/src/vendor/three/index.js#L2767)：当前操作：写入 code、id、usedTimes；返回 无显式返回。

### `WebXRDepthSensing`

将 XR 深度纹理整合到渲染器深度采样。父类 `无`。

- `constructor()` [源码:4701](../../eyes/src/vendor/three/index.js#L4701)：当前操作：写入 depthFar、depthNear、mesh、texture；返回 无显式返回。
- `init(depthData, renderState)` [源码:4704](../../eyes/src/vendor/three/index.js#L4704)：当前操作：写入 depthFar、depthNear、texture；返回 无显式返回。
- `getMesh(cameraXR)` [源码:4710](../../eyes/src/vendor/three/index.js#L4710)：当前操作：写入 mesh；返回 this.mesh。
- `reset()` [源码:4732](../../eyes/src/vendor/three/index.js#L4732)：当前操作：写入 mesh、texture；返回 无显式返回。
- `getDepthTexture()` [源码:4735](../../eyes/src/vendor/three/index.js#L4735)：当前操作：写入 无直接字段写入；返回 this.texture。

### `WebXRManager`

协调 XRSession、帧、相机、控制器和渲染目标生命周期。父类 `ThreeCore.EventDispatcher`。

- `constructor(renderer, gl)` [源码:4740](../../eyes/src/vendor/three/index.js#L4740)：当前操作：写入 cameraAutoUpdate、dispose、enabled、getBaseLayer、getBinding、getCamera、getCameraTexture、getController、getControllerGrip、getDepthSensingMesh、getDepthTexture、getEnvironmentBlendMode、getFoveation、getFrame、getHand、getReferenceSpace、getSession、hasDepthSensing、isPresenting、setAnimationLoop、setFoveation、setFramebufferScaleFactor、setReferenceSpace、setReferenceSpaceType、setSession、updateCamera；返回 无显式返回。

### `WebGLRenderer`

WebGL 渲染主循环：更新对象、灯光、材质程序、排序和绘制并维护 GPU 资源。父类 `无`。

- `constructor(parameters={})` [源码:5176](../../eyes/src/vendor/three/index.js#L5176)：当前操作：写入 _outputColorSpace、autoClear、autoClearColor、autoClearDepth、autoClearStencil、clear、clearColor、clearDepth、clearStencil、clippingPlanes、compile、compileAsync、copyFramebufferToTexture、copyTextureToTexture、debug、dispose、domElement、forceContextLoss、forceContextRestore、getActiveCubeFace、getActiveMipmapLevel、getClearAlpha、getClearColor、getContext、getContextAttributes、getCurrentViewport、getDrawingBufferSize、getPixelRatio、getRenderTarget、getScissor、getScissorTest、getSize、getViewport、info.render.frame、initRenderTarget、initTexture、isWebGLRenderer、localClippingEnabled、readRenderTargetPixels、readRenderTargetPixelsAsync、render、renderBufferDirect、resetState、setAnimationLoop、setClearAlpha、setClearColor、setDrawingBufferSize、setEffects、setNodesHandler、setOpaqueSort、setPixelRatio、setRenderTarget、setRenderTargetFramebuffer、setRenderTargetTextures、setScissor、setScissorTest、setSize、setTransparentSort、setViewport、sortObjects、toneMapping、toneMappingExposure、transmissionResolutionScale、xr；返回 无显式返回。
- `get coordinateSystem()` [源码:5867](../../eyes/src/vendor/three/index.js#L5867)：当前操作：写入 无直接字段写入；返回 ThreeCore.WebGLCoordinateSystem。
- `get outputColorSpace()` [源码:5870](../../eyes/src/vendor/three/index.js#L5870)：当前操作：写入 无直接字段写入；返回 this._outputColorSpace。
- `set outputColorSpace(outputColorSpace)` [源码:5873](../../eyes/src/vendor/three/index.js#L5873)：当前操作：写入 _outputColorSpace；返回 无显式返回。
