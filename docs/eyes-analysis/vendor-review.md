# 第三方源码逐文件语义参考

本参考对 633 个 git 跟踪的 vendor 文件逐一解析 AST 与源码字面量，并结合模块装配调用关系核对职责。observed 表示源码直接可见；inferred 表示包族或职责推断，绝不意味着已恢复上游原名。压缩参数名与内部闭包未强行重新命名。

## 包边界与证据

- `three/core.js` 显式 `REVISION = "185"`，与宿主 package.json 的 npm Three 版本不同；`three/index.js` 为 WebGL 渲染器与 shader 管线。不能按宿主依赖版本推断此副本。
- `modules/GLTFLoader.js` 支持 glTF >=2.0；DRACO、KTX2、ZSTD 为独立解码路径，资源代理文件从 decoder manifest 读取 revision。KTX2 的 Basis worker 转码取决于 GPU 支持，不能将扩展检测视为所有格式都可上传。`Ci.js` 保留 `KTX-Parse v1.0.1` 字符串。
- `modules/KeyStore.js` 明确 `Fuse.version = "6.6.2"`，包含 Bitap 与扩展匹配；文件名只代表其中一个导出，不能把整个模块理解为简单键值仓库。
- 两份 Moment 均显式 2.29.1；两份 Timezone 显式 0.5.33；primary/secondary locale 树分别注册不同副本，合并会改变可观察状态。
- `Swiper.js` 经对象键装配 update/translate/transition/slide/loop 等子模块；404–496 区间大量匿名文件可从此装配和插件事件恢复语义，但源码没有可靠完整版本号证据。Dom7 与 SSR window/document 工具在这一边界。
- 两组 Popper 相同结构链为 169–224 与 930–985，差值 761；Tippy 入口为 animateFill-168/929，包含 tooltip、插件和可访问性逻辑；精确版本未确认。不能因文件名叫 animateFill 就认为只含动画。
- proj4 边界为 585–689 及相关命名模块。585 的版本字段是 `__VERSION__` 占位符，不能报告精确版本。其包含 EPSG 定义、WKT/PROJJSON、基准转换、NTv2 网格与多个投影插件。
- `Unidentified160.cjs` 与 `Unidentified989.cjs` 直接保留 `OverlayScrollbars` 标识。157/158/159 分别为递归等值、防抖、节流形状；719 为 History/hash 客户端路由器；包名/版本未直接出现的部分只说明行为。
- 本目录未见可据以断言 Babel/core-js 包身份的明确包标识；typeof/Symbol 等兼容代码也可能被内联进其他包，不能仅凭辅助函数形状归属整包。

- `Easing.js` 导出 Tween/Group/Interpolation/Sequence 并显式 VERSION 18.6.4；其包边界覆盖完整 tween 管理，不只是 Easing。

## 关键不变量

Three 场景节点的 world matrix 与几何 bounds 存在缓存；直接改数组或局部参数需按 API 标记更新。dispose 是资源生命周期信号，并不自动解除应用所有引用。WebGLRenderer/后处理通道共享状态，新增 pass 需正确交换读写缓冲、恢复 stencil 与 render target。纹理解码器必须先初始化并匹配运行时资源 revision；不能猜测 WASM ABI。Moment 的两个实例与 Popper/Tippy 的两个模块图不应仅因内容相似而贸然合并。proj4 角度内部使用弧度，网格变换和 Helmert 参数存在明确单位约定。

## 每个文件

### `eyes/src/vendor/modules/A11y.js`

提供 A11y、Autoplay、Controller、EffectCards、EffectCoverflow、EffectCreative、EffectCube、EffectFade、EffectFlip、FreeMode、Grid、HashNavigation、History、Keyboard、Lazy、Manipulation、Mousewheel、Navigation、Pagination、Parallax、Scrollbar、Swiper、Thumbs、Virtual、Zoom、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1563950-1565230.`；`exports: A11y, Autoplay, Controller, EffectCards, EffectCoverflow, EffectCreative, EffectCube, EffectFade, EffectFlip, FreeMode, Grid, HashNavigation, History, Keyboard, Lazy, Manipulation, Mousewheel, Navigation, Pagination, Parallax, Scrollbar, Swiper, Thumbs, Virtual, Zoom, default`。

### `eyes/src/vendor/modules/Ci.js`

解析 KTX2 层级、DFD、键值和二进制纹理元数据。可信度：observed。

证据：`// Recovered from vendors.js:812563-836508.`；`exports: KHR_DF_CHANNEL_RGBSDA_ALPHA, KHR_DF_CHANNEL_RGBSDA_BLUE, KHR_DF_CHANNEL_RGBSDA_DEPTH, KHR_DF_CHANNEL_RGBSDA_GREEN, KHR_DF_CHANNEL_RGBSDA_RED, KHR_DF_CHANNEL_RGBSDA_STENCIL, KHR_DF_FLAG_ALPHA_PREMULTIPLIED, KHR_DF_FLAG_ALPHA_STRAIGHT, KHR_DF_KHR_DESCRIPTORTYPE_BASICFORMAT, KHR_DF_MODEL_ASTC, KHR_DF_MODEL_ETC1, KHR_DF_MODEL_ETC1S, KHR_DF_MODEL_ETC2, KHR_DF_MODEL_RGBSDA, KHR_DF_MODEL_UASTC, KHR_DF_MODEL_UNSPECIFIED, KHR_DF_PRIMARIES_ACES, KHR_DF_PRIMARIES_ACESCC, KHR_DF_PRIMARIES_ADOBERGB, KHR_DF_PRIMARIES_BT2020, KHR_DF_PRIMARIES_BT601_EBU, KHR_DF_PRIMARIES_BT601_SMPTE, KHR_DF_PRIMARIES_BT709, KHR_DF_PRIMARIES_CIEXYZ, KHR_DF_PRIMARIES_DISPLAYP3, KHR_DF_PRIMARIES_NTSC1953, KHR_DF_PRIMARIES_PAL525, KHR_DF_PRIMARIES_UNSPECIFIED, KHR_DF_SAMPLE_DATATYPE_EXPONENT, KHR_DF_SAMPLE_DATATYPE_FLOAT, KHR_DF_SAMPLE_DATATYPE_LINEAR, KHR_DF_SAMPLE_DATATYPE_SIGNED, KHR_DF_TRANSFER_ACESCC, KHR_DF_TRANSFER_ACESCCT, KHR_DF_TRANSFER_ADOBERGB, KHR_DF_TRANSFER_BT1886, KHR_DF_TRANSFER_DCIP3, KHR_DF_TRANSFER_HLG_EOTF, KHR_DF_TRANSFER_HLG_OETF, KHR_DF_TRANSFER_ITU, KHR_DF_TRANSFER_LINEAR, KHR_DF_TRANSFER_NTSC, KHR_DF_TRANSFER_PAL625_EOTF, KHR_DF_TRANSFER_PAL_OETF, KHR_DF_TRANSFER_PQ_EOTF, KHR_DF_TRANSFER_PQ_OETF, KHR_DF_TRANSFER_SLOG, KHR_DF_TRANSFER_SLOG2, KHR_DF_TRANSFER_SRGB, KHR_DF_TRANSFER_ST240, KHR_DF_TRANSFER_UNSPECIFIED, KHR_DF_VENDORID_KHRONOS, KHR_DF_VERSION, KHR_SUPERCOMPRESSION_BASISLZ, KHR_SUPERCOMPRESSION_NONE, KHR_SUPERCOMPRESSION_ZLIB, KHR_SUPERCOMPRESSION_ZSTD, VK_FORMAT_A1R5G5B5_UNORM_PACK16, VK_FORMAT_A2B10G10R10_SINT_PACK32, VK_FORMAT_A2B10G10R10_SNORM_PACK32, VK_FORMAT_A2B10G10R10_UINT_PACK32, VK_FORMAT_A2B10G10R10_UNORM_PACK32, VK_FORMAT_A2R10G10B10_SINT_PACK32, VK_FORMAT_A2R10G10B10_SNORM_PACK32, VK_FORMAT_A2R10G10B10_UINT_PACK32, VK_FORMAT_A2R10G10B10_UNORM_PACK32, VK_FORMAT_A4B4G4R4_UNORM_PACK16_EXT, VK_FORMAT_A4R4G4B4_UNORM_PACK16_EXT, VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK_EXT, VK_FORMAT_ASTC_10x10_SRGB_BLOCK, VK_FORMAT_ASTC_10x10_UNORM_BLOCK, VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK_EXT, VK_FORMAT_ASTC_10x5_SRGB_BLOCK, VK_FORMAT_ASTC_10x5_UNORM_BLOCK, VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK_EXT, VK_FORMAT_ASTC_10x6_SRGB_BLOCK, VK_FORMAT_ASTC_10x6_UNORM_BLOCK, VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK_EXT, VK_FORMAT_ASTC_10x8_SRGB_BLOCK, VK_FORMAT_ASTC_10x8_UNORM_BLOCK, VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK_EXT, VK_FORMAT_ASTC_12x10_SRGB_BLOCK, VK_FORMAT_ASTC_12x10_UNORM_BLOCK, VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK_EXT, VK_FORMAT_ASTC_12x12_SRGB_BLOCK, VK_FORMAT_ASTC_12x12_UNORM_BLOCK, VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK_EXT, VK_FORMAT_ASTC_4x4_SRGB_BLOCK, VK_FORMAT_ASTC_4x4_UNORM_BLOCK, VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK_EXT, VK_FORMAT_ASTC_5x4_SRGB_BLOCK, VK_FORMAT_ASTC_5x4_UNORM_BLOCK, VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK_EXT, VK_FORMAT_ASTC_5x5_SRGB_BLOCK, VK_FORMAT_ASTC_5x5_UNORM_BLOCK, VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK_EXT, VK_FORMAT_ASTC_6x5_SRGB_BLOCK, VK_FORMAT_ASTC_6x5_UNORM_BLOCK, VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK_EXT, VK_FORMAT_ASTC_6x6_SRGB_BLOCK, VK_FORMAT_ASTC_6x6_UNORM_BLOCK, VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK_EXT, VK_FORMAT_ASTC_8x5_SRGB_BLOCK, VK_FORMAT_ASTC_8x5_UNORM_BLOCK, VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK_EXT, VK_FORMAT_ASTC_8x6_SRGB_BLOCK, VK_FORMAT_ASTC_8x6_UNORM_BLOCK, VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK_EXT, VK_FORMAT_ASTC_8x8_SRGB_BLOCK, VK_FORMAT_ASTC_8x8_UNORM_BLOCK, VK_FORMAT_B10G11R11_UFLOAT_PACK32, VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16, VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16, VK_FORMAT_B4G4R4A4_UNORM_PACK16, VK_FORMAT_B5G5R5A1_UNORM_PACK16, VK_FORMAT_B5G6R5_UNORM_PACK16, VK_FORMAT_B8G8R8A8_SINT, VK_FORMAT_B8G8R8A8_SNORM, VK_FORMAT_B8G8R8A8_SRGB, VK_FORMAT_B8G8R8A8_UINT, VK_FORMAT_B8G8R8A8_UNORM, VK_FORMAT_B8G8R8_SINT, VK_FORMAT_B8G8R8_SNORM, VK_FORMAT_B8G8R8_SRGB, VK_FORMAT_B8G8R8_UINT, VK_FORMAT_B8G8R8_UNORM, VK_FORMAT_BC1_RGBA_SRGB_BLOCK, VK_FORMAT_BC1_RGBA_UNORM_BLOCK, VK_FORMAT_BC1_RGB_SRGB_BLOCK, VK_FORMAT_BC1_RGB_UNORM_BLOCK, VK_FORMAT_BC2_SRGB_BLOCK, VK_FORMAT_BC2_UNORM_BLOCK, VK_FORMAT_BC3_SRGB_BLOCK, VK_FORMAT_BC3_UNORM_BLOCK, VK_FORMAT_BC4_SNORM_BLOCK, VK_FORMAT_BC4_UNORM_BLOCK, VK_FORMAT_BC5_SNORM_BLOCK, VK_FORMAT_BC5_UNORM_BLOCK, VK_FORMAT_BC6H_SFLOAT_BLOCK, VK_FORMAT_BC6H_UFLOAT_BLOCK, VK_FORMAT_BC7_SRGB_BLOCK, VK_FORMAT_BC7_UNORM_BLOCK, VK_FORMAT_D16_UNORM, VK_FORMAT_D16_UNORM_S8_UINT, VK_FORMAT_D24_UNORM_S8_UINT, VK_FORMAT_D32_SFLOAT, VK_FORMAT_D32_SFLOAT_S8_UINT, VK_FORMAT_E5B9G9R9_UFLOAT_PACK32, VK_FORMAT_EAC_R11G11_SNORM_BLOCK, VK_FORMAT_EAC_R11G11_UNORM_BLOCK, VK_FORMAT_EAC_R11_SNORM_BLOCK, VK_FORMAT_EAC_R11_UNORM_BLOCK, VK_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK, VK_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK, VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK, VK_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK, VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK, VK_FORMAT_ETC2_R8G8B8_UNORM_BLOCK, VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16, VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16, VK_FORMAT_PVRTC1_2BPP_SRGB_BLOCK_IMG, VK_FORMAT_PVRTC1_2BPP_UNORM_BLOCK_IMG, VK_FORMAT_PVRTC1_4BPP_SRGB_BLOCK_IMG, VK_FORMAT_PVRTC1_4BPP_UNORM_BLOCK_IMG, VK_FORMAT_PVRTC2_2BPP_SRGB_BLOCK_IMG, VK_FORMAT_PVRTC2_2BPP_UNORM_BLOCK_IMG, VK_FORMAT_PVRTC2_4BPP_SRGB_BLOCK_IMG, VK_FORMAT_PVRTC2_4BPP_UNORM_BLOCK_IMG, VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16, VK_FORMAT_R10X6G10X6_UNORM_2PACK16, VK_FORMAT_R10X6_UNORM_PACK16, VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16, VK_FORMAT_R12X4G12X4_UNORM_2PACK16, VK_FORMAT_R12X4_UNORM_PACK16, VK_FORMAT_R16G16B16A16_SFLOAT, VK_FORMAT_R16G16B16A16_SINT, VK_FORMAT_R16G16B16A16_SNORM, VK_FORMAT_R16G16B16A16_UINT, VK_FORMAT_R16G16B16A16_UNORM, VK_FORMAT_R16G16B16_SFLOAT, VK_FORMAT_R16G16B16_SINT, VK_FORMAT_R16G16B16_SNORM, VK_FORMAT_R16G16B16_UINT, VK_FORMAT_R16G16B16_UNORM, VK_FORMAT_R16G16_SFLOAT, VK_FORMAT_R16G16_SINT, VK_FORMAT_R16G16_SNORM, VK_FORMAT_R16G16_UINT, VK_FORMAT_R16G16_UNORM, VK_FORMAT_R16_SFLOAT, VK_FORMAT_R16_SINT, VK_FORMAT_R16_SNORM, VK_FORMAT_R16_UINT, VK_FORMAT_R16_UNORM, VK_FORMAT_R32G32B32A32_SFLOAT, VK_FORMAT_R32G32B32A32_SINT, VK_FORMAT_R32G32B32A32_UINT, VK_FORMAT_R32G32B32_SFLOAT, VK_FORMAT_R32G32B32_SINT, VK_FORMAT_R32G32B32_UINT, VK_FORMAT_R32G32_SFLOAT, VK_FORMAT_R32G32_SINT, VK_FORMAT_R32G32_UINT, VK_FORMAT_R32_SFLOAT, VK_FORMAT_R32_SINT, VK_FORMAT_R32_UINT, VK_FORMAT_R4G4B4A4_UNORM_PACK16, VK_FORMAT_R4G4_UNORM_PACK8, VK_FORMAT_R5G5B5A1_UNORM_PACK16, VK_FORMAT_R5G6B5_UNORM_PACK16, VK_FORMAT_R64G64B64A64_SFLOAT, VK_FORMAT_R64G64B64A64_SINT, VK_FORMAT_R64G64B64A64_UINT, VK_FORMAT_R64G64B64_SFLOAT, VK_FORMAT_R64G64B64_SINT, VK_FORMAT_R64G64B64_UINT, VK_FORMAT_R64G64_SFLOAT, VK_FORMAT_R64G64_SINT, VK_FORMAT_R64G64_UINT, VK_FORMAT_R64_SFLOAT, VK_FORMAT_R64_SINT, VK_FORMAT_R64_UINT, VK_FORMAT_R8G8B8A8_SINT, VK_FORMAT_R8G8B8A8_SNORM, VK_FORMAT_R8G8B8A8_SRGB, VK_FORMAT_R8G8B8A8_UINT, VK_FORMAT_R8G8B8A8_UNORM, VK_FORMAT_R8G8B8_SINT, VK_FORMAT_R8G8B8_SNORM, VK_FORMAT_R8G8B8_SRGB, VK_FORMAT_R8G8B8_UINT, VK_FORMAT_R8G8B8_UNORM, VK_FORMAT_R8G8_SINT, VK_FORMAT_R8G8_SNORM, VK_FORMAT_R8G8_SRGB, VK_FORMAT_R8G8_UINT, VK_FORMAT_R8G8_UNORM, VK_FORMAT_R8_SINT, VK_FORMAT_R8_SNORM, VK_FORMAT_R8_SRGB, VK_FORMAT_R8_UINT, VK_FORMAT_R8_UNORM, VK_FORMAT_S8_UINT, VK_FORMAT_UNDEFINED, VK_FORMAT_X8_D24_UNORM_PACK32, createDefaultContainer, read, write`；`literal: Missing KTX 2.0 identifier.`；`literal: KTX-Parse v1.0.1`；`literal: string`；`literal: Only BASICFORMAT Data Format Descriptor output supported.`；`literal: texelBlockDimension is now an array. For dimensionality 'd', set 'd - 1'.`。

- `Ci`：解析 KTX2 层级、DFD、键值和二进制纹理元数据。方法：`constructor`、`_nextUint8`、`_nextUint16`、`_nextUint32`、`_nextUint64`、`_nextInt32`、`_nextUint8Array`、`_skip`、`_scan`。
  `constructor`：function Object() { [native code] }。

### `eyes/src/vendor/modules/CopyShader.js`

提供 CopyShader；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:880790-881346.`；`exports: CopyShader`；`literal: CopyShader`。

### `eyes/src/vendor/modules/D2R.js`

提供 D2R、EPSLN、FORTPI、HALF_PI、PJD_3PARAM、PJD_7PARAM、PJD_GRIDSHIFT、PJD_NODATUM、PJD_WGS84、R2D、RA4、RA6、SEC_TO_RAD、SIXTH、SPI、SRS_WGS84_ESQUARED、SRS_WGS84_SEMIMAJOR、SRS_WGS84_SEMIMINOR、TWO_PI；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1730390-1731275.`；`exports: D2R, EPSLN, FORTPI, HALF_PI, PJD_3PARAM, PJD_7PARAM, PJD_GRIDSHIFT, PJD_NODATUM, PJD_WGS84, R2D, RA4, RA6, SEC_TO_RAD, SIXTH, SPI, SRS_WGS84_ESQUARED, SRS_WGS84_SEMIMAJOR, SRS_WGS84_SEMIMINOR, TWO_PI`。

### `eyes/src/vendor/modules/DRACOLoader.js`

DRACOLoader 对应资源的请求、解析与缓存协作。可信度：observed。

证据：`// Recovered from vendors.js:976080-983485.`；`exports: DRACOLoader, DRACO_GLTF_CONFIG`；`literal: POSITION`；`literal: NORMAL`；`literal: COLOR`；`literal: TEX_COORD`；`literal: Float32Array`。

- `DRACOLoader`：DRACOLoader 对应资源的请求、解析与缓存协作。方法：`constructor`、`setDecoderPath`、`setDecoderConfig`、`setWorkerLimit`、`load`、`parse`、`decodeDracoFile`、`decodeGeometry`、`_createGeometry`、`_assignVertexColorSpace`、`_loadLibrary`、`preload`、`_initDecoder`、`_getWorker`、`_releaseTask`、`debug`、`dispose`。
  `constructor`：function Object() { [native code] }；`load`：发起异步资源获取并交给解析路径；管理加载器回调和错误传播；`parse`：把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

### `eyes/src/vendor/modules/DisplayP3ColorSpace.js`

提供 DisplayP3ColorSpace、DisplayP3ColorSpaceImpl、ExtendedSRGBColorSpace、ExtendedSRGBColorSpaceImpl、LinearDisplayP3ColorSpace、LinearDisplayP3ColorSpaceImpl、LinearRec2020ColorSpace、LinearRec2020ColorSpaceImpl；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:876316-877927.`；`exports: DisplayP3ColorSpace, DisplayP3ColorSpaceImpl, ExtendedSRGBColorSpace, ExtendedSRGBColorSpaceImpl, LinearDisplayP3ColorSpace, LinearDisplayP3ColorSpaceImpl, LinearRec2020ColorSpace, LinearRec2020ColorSpaceImpl`；`literal: display-p3`；`literal: display-p3-linear`；`literal: rec2020-linear`；`literal: extended-srgb`；`literal: extended`。

### `eyes/src/vendor/modules/Dom7.js`

提供链式 DOM 集合查询、样式、事件和节点操作。可信度：observed。

证据：`// Recovered from vendors.js:1575730-1594956.`；`exports: $, add, addClass, animate, animationEnd, append, appendTo, attr, blur, change, children, click, closest, css, data, dataset, detach, each, empty, eq, filter, find, focus, focusin, focusout, hasClass, height, hide, html, index, insertAfter, insertBefore, is, keydown, keypress, keyup, mousedown, mouseenter, mouseleave, mousemove, mouseout, mouseover, mouseup, next, nextAll, off, offset, on, once, outerHeight, outerWidth, parent, parents, prepend, prependTo, prev, prevAll, prop, remove, removeAttr, removeClass, removeData, resize, scroll, scrollLeft, scrollTo, scrollTop, show, siblings, stop, styles, submit, text, toggleClass, touchend, touchmove, touchstart, transform, transition, transitionEnd, transitionStart, trigger, val, value, width, default`；`literal: number`；`literal: __proto__`；`literal: string`；`literal: tbody`；`literal: <tbody`。

- `Dom7`：提供链式 DOM 集合查询、样式、事件和节点操作。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

### `eyes/src/vendor/modules/Dom7Entry.js`

将 DOM 方法装配到 Dom7 原型并导出查询入口。可信度：observed。

可审查语义名：`Dom7Entry`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1574962-1575729.`；`exports: default`。

### `eyes/src/vendor/modules/EQUIT.js`

提供 EQUIT、N_POLE、OBLIQ、S_POLE、forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1825868-1829739.`；`exports: EQUIT, N_POLE, OBLIQ, S_POLE, forward, init, inverse, names, default`；`literal: Lambert Azimuthal Equal Area`；`literal: Lambert_Azimuthal_Equal_Area`；`literal: laea`。

### `eyes/src/vendor/modules/Easing.js`

提供 Easing、Group、Interpolation、Sequence、Tween、VERSION、add、getAll、nextId、now、remove、removeAll、update、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1044152-1054814.`；`exports: Easing, Group, Interpolation, Sequence, Tween, VERSION, add, getAll, nextId, now, remove, removeAll, update, default`；`literal: undefined`；`literal: string`；`literal: array`；`literal: function`；`literal: object`。

### `eyes/src/vendor/modules/EffectComposer.js`

串联后处理通道并在双渲染目标之间交换读写缓冲。可信度：observed。

证据：`// Recovered from vendors.js:877933-880789.`；`exports: EffectComposer`；`literal: EffectComposer.rt1`；`literal: EffectComposer.rt2`。

- `EffectComposer`：串联后处理通道并在双渲染目标之间交换读写缓冲。方法：`constructor`、`swapBuffers`、`addPass`、`insertPass`、`removePass`、`isLastEnabledPass`、`render`、`reset`、`setSize`、`setPixelRatio`、`dispose`。
  `constructor`：function Object() { [native code] }；`render`：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定；`setSize`：更新像素尺寸及关联目标；后处理链需要同步所有通道；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

### `eyes/src/vendor/modules/FollowName.cjs`

将对应压缩时区 JSON 加载进 Moment Timezone 实例并导出该实例。可信度：observed。

证据：`// Recovered from vendors.js:1110728-1110779.`。

### `eyes/src/vendor/modules/GLTFLoader.js`

GLTFLoader 对应资源的请求、解析与缓存协作；glTF Lights 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsUnlit 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsEmissiveStrength 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsClearcoat 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsDispersion 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsIridescence 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsSheen 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsTransmission 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsVolume 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsIor 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsSpecular 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsBump 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MaterialsAnisotropy 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF TextureBasisU 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF TextureWebP 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF TextureAVIF 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MeshoptCompression 解析、缓存或插值组件；glTF MeshGpuInstancing 解析、缓存或插值组件；glTF Binary 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF DracoMeshCompression 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF TextureTransform 扩展处理器；将扩展字段映射到 Three 对象或材质；glTF MeshQuantization 扩展处理器；将扩展字段映射到 Three 对象或材质；GLTFCubicSpline 插值算法；对关键帧区间求连续或离散值；GLTFCubicSplineQuaternion 插值算法；对关键帧区间求连续或离散值；glTF Parser 解析、缓存或插值组件。可信度：observed。

证据：`// Recovered from vendors.js:912013-958087.`；`exports: GLTFLoader`；`literal: arraybuffer`；`literal: string`；`literal: THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.`；`literal: THREE.GLTFLoader: Invalid plugin found: missing name`；`literal: THREE.GLTFLoader: Unknown extension "`。

- `GLTFLoader`：GLTFLoader 对应资源的请求、解析与缓存协作。方法：`constructor`、`load`、`setDRACOLoader`、`setKTX2Loader`、`setMeshoptDecoder`、`register`、`unregister`、`parse`、`parseAsync`。
  `constructor`：function Object() { [native code] }；`load`：发起异步资源获取并交给解析路径；管理加载器回调和错误传播；`parse`：把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调。

- `GLTFLightsExtension`：glTF Lights 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`_markDefs`、`_loadLight`、`getDependency`、`createNodeAttachment`。
  `constructor`：function Object() { [native code] }。

- `GLTFMaterialsUnlitExtension`：glTF MaterialsUnlit 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`getMaterialType`、`extendParams`。
  `constructor`：function Object() { [native code] }。

- `GLTFMaterialsEmissiveStrengthExtension`：glTF MaterialsEmissiveStrength 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`extendMaterialParams`。
  `constructor`：function Object() { [native code] }。

- `GLTFMaterialsClearcoatExtension`：glTF MaterialsClearcoat 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`getMaterialType`、`extendMaterialParams`。
  `constructor`：function Object() { [native code] }。

- `GLTFMaterialsDispersionExtension`：glTF MaterialsDispersion 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`getMaterialType`、`extendMaterialParams`。
  `constructor`：function Object() { [native code] }。

- `GLTFMaterialsIridescenceExtension`：glTF MaterialsIridescence 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`getMaterialType`、`extendMaterialParams`。
  `constructor`：function Object() { [native code] }。

- `GLTFMaterialsSheenExtension`：glTF MaterialsSheen 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`getMaterialType`、`extendMaterialParams`。
  `constructor`：function Object() { [native code] }。

- `GLTFMaterialsTransmissionExtension`：glTF MaterialsTransmission 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`getMaterialType`、`extendMaterialParams`。
  `constructor`：function Object() { [native code] }。

- `GLTFMaterialsVolumeExtension`：glTF MaterialsVolume 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`getMaterialType`、`extendMaterialParams`。
  `constructor`：function Object() { [native code] }。

- `GLTFMaterialsIorExtension`：glTF MaterialsIor 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`getMaterialType`、`extendMaterialParams`。
  `constructor`：function Object() { [native code] }。

- `GLTFMaterialsSpecularExtension`：glTF MaterialsSpecular 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`getMaterialType`、`extendMaterialParams`。
  `constructor`：function Object() { [native code] }。

- `GLTFMaterialsBumpExtension`：glTF MaterialsBump 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`getMaterialType`、`extendMaterialParams`。
  `constructor`：function Object() { [native code] }。

- `GLTFMaterialsAnisotropyExtension`：glTF MaterialsAnisotropy 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`getMaterialType`、`extendMaterialParams`。
  `constructor`：function Object() { [native code] }。

- `GLTFTextureBasisUExtension`：glTF TextureBasisU 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`loadTexture`。
  `constructor`：function Object() { [native code] }。

- `GLTFTextureWebPExtension`：glTF TextureWebP 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`loadTexture`。
  `constructor`：function Object() { [native code] }。

- `GLTFTextureAVIFExtension`：glTF TextureAVIF 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`loadTexture`。
  `constructor`：function Object() { [native code] }。

- `GLTFMeshoptCompression`：glTF MeshoptCompression 解析、缓存或插值组件。方法：`constructor`、`loadBufferView`。
  `constructor`：function Object() { [native code] }。

- `GLTFMeshGpuInstancing`：glTF MeshGpuInstancing 解析、缓存或插值组件。方法：`constructor`、`createNodeMesh`。
  `constructor`：function Object() { [native code] }。

- `GLTFBinaryExtension`：glTF Binary 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `GLTFDracoMeshCompressionExtension`：glTF DracoMeshCompression 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`decodePrimitive`。
  `constructor`：function Object() { [native code] }。

- `GLTFTextureTransformExtension`：glTF TextureTransform 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`、`extendTexture`。
  `constructor`：function Object() { [native code] }。

- `GLTFMeshQuantizationExtension`：glTF MeshQuantization 扩展处理器；将扩展字段映射到 Three 对象或材质。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `GLTFCubicSplineInterpolant`：GLTFCubicSpline 插值算法；对关键帧区间求连续或离散值。方法：`constructor`、`copySampleValue_`、`interpolate_`。
  `constructor`：function Object() { [native code] }；`interpolate_`：在当前时间区间执行特定插值算法。

- `GLTFCubicSplineQuaternionInterpolant`：GLTFCubicSplineQuaternion 插值算法；对关键帧区间求连续或离散值。方法：`interpolate_`。
  `interpolate_`：在当前时间区间执行特定插值算法。

- `GLTFParser`：glTF Parser 解析、缓存或插值组件。方法：`constructor`、`setExtensions`、`setPlugins`、`parse`、`_markDefs`、`_addNodeRef`、`_getNodeRef`、`_invokeOne`、`_invokeAll`、`getDependency`、`getDependencies`、`loadBuffer`、`loadBufferView`、`loadAccessor`、`loadTexture`、`loadTextureImage`、`loadImageSource`、`assignTexture`、`assignFinalMaterial`、`getMaterialType`、`loadMaterial`、`createUniqueName`、`loadGeometries`、`loadMesh`、`loadCamera`、`loadSkin`、`loadAnimation`、`createNodeMesh`、`loadNode`、`_loadNodeShallow`、`loadScene`、`_createAnimationTracks`、`_getArrayFromAccessor`、`_createCubicSplineTrackInterpolant`。
  `constructor`：function Object() { [native code] }；`parse`：把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调。

### `eyes/src/vendor/modules/KTX2Loader.js`

KTX2Loader 对应资源的请求、解析与缓存协作。可信度：observed。

证据：`// Recovered from vendors.js:792719-811296.`；`exports: KTX2Loader`；`literal: undefined`；`literal: texture-compression-astc`；`literal: texture-compression-etc1`；`literal: texture-compression-etc2`；`literal: texture-compression-s3tc`。

- `KTX2Loader`：KTX2Loader 对应资源的请求、解析与缓存协作。方法：`constructor`、`setTranscoderPath`、`setWorkerLimit`、`detectSupportAsync`、`detectSupport`、`init`、`load`、`parse`、`_createTextureFrom`、`_createTexture`、`dispose`。
  `constructor`：function Object() { [native code] }；`init`：初始化延迟资源和运行时能力；必须先完成再使用依赖资源的方法；`load`：发起异步资源获取并交给解析路径；管理加载器回调和错误传播；`parse`：把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

### `eyes/src/vendor/modules/KeyStore.js`

规范化 Fuse 搜索字段的路径、权重和键标识；构建并维护字符串/对象的 Fuse 搜索索引；使用位运算的 Bitap 模糊匹配与阈值评分；扩展搜索匹配器的模式存储基类；扩展搜索中的模糊模式匹配；扩展搜索中的包含模式匹配；解析扩展搜索语法并组合多条件匹配；以索引和评分规则执行加权模糊搜索。可信度：observed。

证据：`// Recovered from vendors.js:1881696-1897604.`；`exports: default`；`literal: [object Array]`；`literal: string`；`literal: number`；`literal: [object Boolean]`；`literal: object`。

- `KeyStore`：规范化 Fuse 搜索字段的路径、权重和键标识。方法：`constructor`、`get`、`keys`、`toJSON`。
  `constructor`：function Object() { [native code] }；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `FuseIndex`：构建并维护字符串/对象的 Fuse 搜索索引。方法：`constructor`、`setSources`、`setIndexRecords`、`setKeys`、`create`、`add`、`removeAt`、`getValueForItemAtKeyId`、`size`、`_addString`、`_addObject`、`toJSON`。
  `constructor`：function Object() { [native code] }；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `BitapSearch`：使用位运算的 Bitap 模糊匹配与阈值评分。方法：`constructor`、`searchIn`。
  `constructor`：function Object() { [native code] }。

- `BaseMatch`：扩展搜索匹配器的模式存储基类。方法：`constructor`、`isMultiMatch`、`isSingleMatch`、`search`。
  `constructor`：function Object() { [native code] }。

- `FuzzyMatch`：扩展搜索中的模糊模式匹配。方法：`constructor`、`get:type`、`get:multiRegex`、`get:singleRegex`、`search`。
  `constructor`：function Object() { [native code] }。

  访问器分别记录（kind:name，避免同名覆盖）：`get:type`：只读返回 "fuzzy"；此 getter 不执行对应 setter 的写入或更新通知；`get:multiRegex`：只读返回 /^"(.*)"$/；此 getter 不执行对应 setter 的写入或更新通知；`get:singleRegex`：只读返回 /^(.*)$/；此 getter 不执行对应 setter 的写入或更新通知。

- `IncludeMatch`：扩展搜索中的包含模式匹配。方法：`constructor`、`get:type`、`get:multiRegex`、`get:singleRegex`、`search`。
  `constructor`：function Object() { [native code] }。

  访问器分别记录（kind:name，避免同名覆盖）：`get:type`：只读返回 "include"；此 getter 不执行对应 setter 的写入或更新通知；`get:multiRegex`：只读返回 /^'"(.*)"$/；此 getter 不执行对应 setter 的写入或更新通知；`get:singleRegex`：只读返回 /^'(.*)$/；此 getter 不执行对应 setter 的写入或更新通知。

- `ExtendedSearch`：解析扩展搜索语法并组合多条件匹配。方法：`constructor`、`condition`、`searchIn`。
  `constructor`：function Object() { [native code] }。

- `Fuse`：以索引和评分规则执行加权模糊搜索。方法：`constructor`、`setCollection`、`add`、`remove`、`removeAt`、`getIndex`、`search`、`_searchStringList`、`_searchLogical`、`_searchObjectList`、`_findMatches`。
  `constructor`：function Object() { [native code] }。

### `eyes/src/vendor/modules/LuminosityHighPassShader.js`

提供 LuminosityHighPassShader；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:910981-912002.`；`exports: LuminosityHighPassShader`；`literal: LuminosityHighPassShader`。

### `eyes/src/vendor/modules/MaskPass.js`

通过 stencil buffer 写入后处理遮罩；关闭后续通道的 stencil 遮罩约束。可信度：observed。

证据：`// Recovered from vendors.js:883225-884484.`；`exports: ClearMaskPass, MaskPass`。

- `MaskPass`：通过 stencil buffer 写入后处理遮罩。方法：`constructor`、`render`。
  `constructor`：function Object() { [native code] }；`render`：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定。

- `ClearMaskPass`：关闭后续通道的 stencil 遮罩约束。方法：`constructor`、`render`。
  `constructor`：function Object() { [native code] }；`render`：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定。

### `eyes/src/vendor/modules/MomentPrimary.cjs`

Moment 2.29.1 日期解析、格式化、时长、语言区域及 UTC/偏移处理；此副本有独立 locale 注册状态。可信度：observed。

证据：`// Recovered from vendors.js:1117849-1177785.`；`literal: [object Array]`；`literal: [object Object]`；`literal: number`；`literal: [object Number]`；`literal: [object Date]`。

### `eyes/src/vendor/modules/MomentSecondary.cjs`

Moment 2.29.1 日期解析、格式化、时长、语言区域及 UTC/偏移处理；此副本有独立 locale 注册状态。可信度：observed。

证据：`// Recovered from vendors.js:1904771-1964707.`；`literal: [object Array]`；`literal: [object Object]`；`literal: number`；`literal: [object Number]`；`literal: [object Date]`。

### `eyes/src/vendor/modules/N.js`

将超出范围的经度按 2π 折回；允许 force 参数保留输入。可信度：observed。

可审查语义名：`AdjustLongitude`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1754757-1754929.`；`exports: default`。

### `eyes/src/vendor/modules/OutlinePass.js`

分离可见/遮挡边缘并以降采样模糊叠加选中对象轮廓。可信度：observed。

证据：`// Recovered from vendors.js:884485-900662.`；`exports: OutlinePass`；`literal: OutlinePass.mask`；`literal: perspective`；`literal: orthographic`；`literal: DepthToViewZ`；`literal: OutlinePass.depth`。

- `OutlinePass`：分离可见/遮挡边缘并以降采样模糊叠加选中对象轮廓。方法：`constructor`、`dispose`、`setSize`、`render`、`_updateSelectionCache`、`_changeVisibilityOfSelectedObjects`、`_changeVisibilityOfNonSelectedObjects`、`_updateTextureMatrix`、`_getPrepareMaskMaterial`、`_getEdgeDetectionMaterial`、`_getSeparableBlurMaterial`、`_getOverlayMaterial`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用；`setSize`：更新像素尺寸及关联目标；后处理链需要同步所有通道；`render`：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定。

### `eyes/src/vendor/modules/PROJJSONBuilder2015.js`

从 WKT 树构造 2015 规范的 PROJJSON 结构。可信度：observed。

证据：`// Recovered from vendors.js:1737266-1737556.`；`exports: default`；`literal: Cartesian`。

- `PROJJSONBuilder2015`：从 WKT 树构造 2015 规范的 PROJJSON 结构。方法：`convert`。

### `eyes/src/vendor/modules/PROJJSONBuilder2019.js`

处理 WKT2:2019 的 USAGE/SCOPE/AREA/BBOX 元数据。可信度：observed。

证据：`// Recovered from vendors.js:1742552-1743128.`；`exports: default`；`literal: USAGE`；`literal: SCOPE`；`literal: AREA`；`literal: BBOX`。

- `PROJJSONBuilder2019`：处理 WKT2:2019 的 USAGE/SCOPE/AREA/BBOX 元数据。方法：`convert`。

### `eyes/src/vendor/modules/Pass.js`

后处理通道契约与启停、清屏及交换缓冲标志；FullscreenTriangle 几何生成器；构建 position/normal/uv 属性及三角索引；使用全屏三角形绘制后处理材质。可信度：observed。

证据：`// Recovered from vendors.js:882328-883224.`；`exports: FullScreenQuad, Pass`；`literal: THREE.Pass: .render() must be implemented in derived pass.`；`literal: position`。

- `Pass`：后处理通道契约与启停、清屏及交换缓冲标志。方法：`constructor`、`setSize`、`render`、`dispose`。
  `constructor`：function Object() { [native code] }；`setSize`：更新像素尺寸及关联目标；后处理链需要同步所有通道；`render`：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

- `FullscreenTriangleGeometry`：FullscreenTriangle 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `FullScreenQuad`：使用全屏三角形绘制后处理材质。方法：`constructor`、`dispose`、`render`、`get:material`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用；`render`：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定。

  访问器分别记录（kind:name，避免同名覆盖）：`get:material`：只读返回 this._mesh.material；此 getter 不执行对应 setter 的写入或更新通知；`set:material`：将输入值写入 this._mesh.material，实际变更发生在 setter 中。

### `eyes/src/vendor/modules/RenderPass.js`

将场景和相机绘制到当前后处理目标。可信度：observed。

证据：`// Recovered from vendors.js:900663-901775.`；`exports: RenderPass`。

- `RenderPass`：将场景和相机绘制到当前后处理目标。方法：`constructor`、`render`。
  `constructor`：function Object() { [native code] }；`render`：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定。

### `eyes/src/vendor/modules/ShaderPass.js`

把前序纹理绑定到 shader uniform 后绘制全屏通道。可信度：observed。

证据：`// Recovered from vendors.js:881347-882327.`；`exports: ShaderPass`；`literal: tDiffuse`；`literal: unspecified`。

- `ShaderPass`：把前序纹理绑定到 shader uniform 后绘制全屏通道。方法：`constructor`、`render`、`dispose`。
  `constructor`：function Object() { [native code] }；`render`：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

### `eyes/src/vendor/modules/Swiper.js`

轮播实例，组合尺寸、事件、滑动、循环与扩展模块生命周期。可信度：observed。

证据：`// Recovered from vendors.js:1565231-1573320.`；`exports: default`；`literal: Object`；`literal: horizontal`；`literal: vertical`；`literal: touchstart`；`literal: touchmove`。

- `Swiper`：轮播实例，组合尺寸、事件、滑动、循环与扩展模块生命周期。方法：`constructor`、`enable`、`disable`、`setProgress`、`emitContainerClasses`、`getSlideClasses`、`emitSlidesClasses`、`slidesPerViewDynamic`、`update`、`changeDirection`、`mount`、`init`、`destroy`、`extendDefaults`、`get:extendedDefaults`、`get:defaults`、`installModule`、`use`。
  `constructor`：function Object() { [native code] }；`update`：按当前时间或场景状态推进对象并维护缓存失效；`init`：初始化延迟资源和运行时能力；必须先完成再使用依赖资源的方法。

  访问器分别记录（kind:name，避免同名覆盖）：`get:extendedDefaults`：只读返回 w；此 getter 不执行对应 setter 的写入或更新通知；`get:defaults`：只读返回 Unidentified460.default；此 getter 不执行对应 setter 的写入或更新通知。

### `eyes/src/vendor/modules/Unidentified112.cjs`

从 decoder manifest revision 构造打包 WASM/JS 资源路径；具体编解码器由 manifest 和调用方确定。可信度：observed。

证据：`// Recovered from vendors.js:983486-983557.`；`literal: /bundled/a1553835436ceb1527f4.wasm`。

### `eyes/src/vendor/modules/Unidentified113.cjs`

从 decoder manifest revision 构造打包 WASM/JS 资源路径；具体编解码器由 manifest 和调用方确定。可信度：observed。

证据：`// Recovered from vendors.js:983558-983627.`；`literal: /bundled/ced5c642e77e3c24f122.js`。

### `eyes/src/vendor/modules/Unidentified114.cjs`

从 decoder manifest revision 构造打包 WASM/JS 资源路径；具体编解码器由 manifest 和调用方确定。可信度：observed。

证据：`// Recovered from vendors.js:983628-983697.`；`literal: /bundled/786c7dae1f2e34c054da.js`。

### `eyes/src/vendor/modules/Unidentified115.cjs`

从 decoder manifest revision 构造打包 WASM/JS 资源路径；具体编解码器由 manifest 和调用方确定。可信度：observed。

证据：`// Recovered from vendors.js:983698-983767.`；`literal: /bundled/9d116d62fde9fd5bbbaa.js`。

### `eyes/src/vendor/modules/Unidentified116.cjs`

从 decoder manifest revision 构造打包 WASM/JS 资源路径；具体编解码器由 manifest 和调用方确定。可信度：observed。

证据：`// Recovered from vendors.js:983768-983839.`；`literal: /bundled/8e17072deeb50510e590.wasm`。

### `eyes/src/vendor/modules/Unidentified157.cjs`

递归比较对象、数组、日期和正则；兼容 React element 的循环字段。可信度：observed。

可审查语义名：`DeepEqual`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:983880-985409.`；`literal: object`；`literal: [object RegExp]`；`literal: [object Date]`；`literal: function`；`literal: react.element`。

### `eyes/src/vendor/modules/Unidentified158.cjs`

带 leading、trailing、maxWait 的调用防抖。可信度：observed。

可审查语义名：`Debounce`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:985410-987054.`；`literal: object`；`literal: return this`；`literal: function`；`literal: number`；`literal: symbol`。

### `eyes/src/vendor/modules/Unidentified159.cjs`

限制函数调用频率，复用防抖和最大等待窗口。可信度：observed。

可审查语义名：`Throttle`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:987055-988899.`；`literal: Expected a function`；`literal: object`；`literal: return this`；`literal: function`；`literal: maxWait`。

### `eyes/src/vendor/modules/Unidentified160.cjs`

自定义滚动条实现，观察尺寸和 DOM 并管理原生滚动同步。可信度：observed。

可审查语义名：`OverlayScrollbars`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:988900-1044114.`；`literal: undefined`；`literal: OverlayScrollbars`；`literal: object`；`literal: function`；`literal: array`。

### `eyes/src/vendor/modules/Unidentified167.js`

封装不同浏览器前缀的全屏请求、退出与状态事件。可信度：observed。

可审查语义名：`FullscreenAPI`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1054819-1056711.`；`exports: default`；`literal: requestFullscreen`；`literal: exitFullscreen`；`literal: fullscreenElement`；`literal: fullscreenEnabled`；`literal: fullscreenchange`。

### `eyes/src/vendor/modules/Unidentified169.js`

Popper 浮层定位：把计算样式和属性应用到浮层、箭头、参考元素，并在清理时撤销。可信度：observed。

可审查语义名：`ApplyStylesModifier`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1080673-1081728.`；`exports: default`；`literal: applyStyles`；`literal: write`；`literal: absolute`；`literal: computeStyles`。

### `eyes/src/vendor/modules/Unidentified170.js`

Popper 浮层定位：取得 DOM nodeName 的小写形式。可信度：observed。

可审查语义名：`GetNodeName`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1081729-1081862.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified172.js`

Popper 浮层定位：取得节点所属 window，处理跨文档和无节点输入。可信度：observed。

可审查语义名：`GetWindow`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1082310-1082523.`；`exports: default`；`literal: [object Window]`。

### `eyes/src/vendor/modules/Unidentified175.js`

Popper 浮层定位：计算相对 offsetParent 的参考矩形，补偿缩放、滚动和边框。可信度：observed。

可审查语义名：`GetCompositeRect`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1085665-1086420.`；`exports: default`；`literal: body`。

### `eyes/src/vendor/modules/Unidentified176.js`

Popper 浮层定位：归一化 boundingClientRect，补偿元素缩放和 visualViewport 偏移。可信度：observed。

可审查语义名：`GetBoundingClientRect`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1086421-1087026.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified178.js`

Popper 浮层定位：根据 Safari UA 判断视口偏移策略。可信度：observed。

可审查语义名：`IsLayoutViewport`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1087189-1087352.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified179.js`

Popper 浮层定位：优先读取 User-Agent Client Hints，再回退 navigator.userAgent。可信度：observed。

可审查语义名：`GetUserAgent`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1087353-1087606.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified180.js`

Popper 浮层定位：按节点类型选择 window 或元素的滚动偏移。可信度：observed。

可审查语义名：`GetNodeScroll`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1087607-1087822.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified181.js`

Popper 浮层定位：取得 window pageXOffset/pageYOffset。可信度：observed。

可审查语义名：`GetWindowScroll`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1087823-1088005.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified182.js`

Popper 浮层定位：取得元素 scrollLeft/scrollTop。可信度：observed。

可审查语义名：`GetHTMLElementScroll`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1088006-1088148.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified183.js`

Popper 浮层定位：计算文档根元素与 window 滚动的横向差值。可信度：observed。

可审查语义名：`GetWindowScrollBarX`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1088149-1088340.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified184.js`

Popper 浮层定位：取得所属文档的 documentElement。可信度：observed。

可审查语义名：`GetDocumentElement`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1088341-1088532.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified185.js`

Popper 浮层定位：依据 overflow/overflowX/overflowY 判断滚动裁剪祖先。可信度：observed。

可审查语义名：`IsScrollParent`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1088533-1088746.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified186.js`

Popper 浮层定位：通过节点所属 window 读取计算样式。可信度：observed。

可审查语义名：`GetComputedStyle`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1088747-1088892.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified187.js`

Popper 浮层定位：返回 offset 布局矩形并校正一像素内的测量差。可信度：observed。

可审查语义名：`GetLayoutRect`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1088893-1089180.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified188.js`

Popper 浮层定位：递归收集滚动祖先及 window/visualViewport。可信度：observed。

可审查语义名：`ListScrollParents`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1089181-1089543.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified189.js`

Popper 浮层定位：向上寻找最近的滚动祖先。可信度：observed。

可审查语义名：`GetScrollParent`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1089544-1089820.`；`exports: default`；`literal: html`；`literal: body`；`literal: #document`。

### `eyes/src/vendor/modules/Unidentified190.js`

Popper 浮层定位：处理 assignedSlot、parentNode、ShadowRoot host 的祖先遍历。可信度：observed。

可审查语义名：`GetParentNode`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1089821-1090059.`；`exports: default`；`literal: html`。

### `eyes/src/vendor/modules/Unidentified191.js`

Popper 浮层定位：跳过 static table，识别 transform/filter 等 containing block。可信度：observed。

可审查语义名：`GetOffsetParent`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1090060-1091066.`；`exports: default`；`literal: fixed`；`literal: static`；`literal: html`；`literal: body`；`literal: none`。

### `eyes/src/vendor/modules/Unidentified192.js`

Popper 浮层定位：判断 table、td、th 类型。可信度：observed。

可审查语义名：`IsTableElement`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1091067-1091224.`；`exports: default`；`literal: table`。

### `eyes/src/vendor/modules/Unidentified193.js`

Popper 浮层定位：按依赖拓扑和 read/main/write 阶段排序定位修饰器。可信度：observed。

可审查语义名：`OrderModifiers`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1091225-1091730.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified195.js`

Popper 浮层定位：把同一微任务前的重复请求合并为一个 Promise。可信度：observed。

可审查语义名：`DebounceMicrotask`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1092927-1093134.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified196.js`

Popper 浮层定位：按修饰器名称合并 options 和 data。可信度：observed。

可审查语义名：`MergeByName`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1093135-1093455.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified197.js`

Popper 浮层定位：比较参考或浮层边界与裁剪矩形，返回四边溢出量。可信度：observed。

可审查语义名：`DetectOverflow`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1093456-1094657.`；`exports: default`；`literal: number`；`literal: absolute`。

### `eyes/src/vendor/modules/Unidentified198.js`

Popper 浮层定位：求多个裁剪祖先与根边界矩形的交集。可信度：observed。

可审查语义名：`GetClippingRect`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1094658-1095886.`；`exports: default`；`literal: fixed`；`literal: clippingParents`；`literal: absolute`；`literal: body`。

### `eyes/src/vendor/modules/Unidentified199.js`

Popper 浮层定位：计算布局/视觉视口尺寸和偏移。可信度：observed。

可审查语义名：`GetViewportRect`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1095887-1096272.`；`exports: default`；`literal: fixed`。

### `eyes/src/vendor/modules/Unidentified200.js`

Popper 浮层定位：计算完整文档滚动范围并补偿 RTL 横向位置。可信度：observed。

可审查语义名：`GetDocumentRect`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1096273-1096825.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified201.js`

Popper 浮层定位：沿 Shadow DOM host 链执行包含关系判断。可信度：observed。

可审查语义名：`ContainsShadowDOM`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1096826-1097105.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified202.js`

Popper 浮层定位：为 x/y/width/height 矩形补齐 top/right/bottom/left。可信度：observed。

可审查语义名：`RectToClientRect`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1097106-1097278.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified203.js`

Popper 浮层定位：根据 placement 和 start/end 对齐计算浮层位置。可信度：observed。

可审查语义名：`ComputeOffsets`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1097279-1097933.`；`exports: default`；`literal: height`；`literal: width`。

### `eyes/src/vendor/modules/Unidentified204.js`

Popper 浮层定位：提取 placement 连字符前的方向。可信度：observed。

可审查语义名：`GetBasePlacement`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1097934-1098045.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified205.js`

Popper 浮层定位：提取 placement 连字符后的 start/end 变化。可信度：observed。

可审查语义名：`GetVariation`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1098046-1098157.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified206.js`

Popper 浮层定位：将 top/bottom 映射到 x，left/right 映射到 y。可信度：observed。

可审查语义名：`GetMainAxisFromPlacement`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1098158-1098291.`；`exports: default`；`literal: bottom`。

### `eyes/src/vendor/modules/Unidentified207.js`

Popper 浮层定位：用给定四边 padding 覆盖零值默认对象。可信度：observed。

可审查语义名：`MergePaddingObject`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1098292-1098437.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified208.js`

Popper 浮层定位：创建上下左右全零的独立对象。可信度：observed。

可审查语义名：`GetFreshSideObject`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1098438-1098563.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified209.js`

Popper 浮层定位：将同一值分配给一组侧边键。可信度：observed。

可审查语义名：`ExpandToHashMap`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1098564-1098705.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified210.js`

Popper 浮层定位：注册滚动和 resize 更新监听并返回清理函数。可信度：observed。

可审查语义名：`EventListenersModifier`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1098706-1099308.`；`exports: default`；`literal: eventListeners`；`literal: write`；`literal: scroll`；`literal: resize`。

### `eyes/src/vendor/modules/Unidentified211.js`

Popper 浮层定位：在 read 阶段建立 popperOffsets 坐标。可信度：observed。

可审查语义名：`PopperOffsetsModifier`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1099309-1099591.`；`exports: default`；`literal: popperOffsets`；`literal: read`；`literal: absolute`。

### `eyes/src/vendor/modules/Unidentified214.js`

Popper 浮层定位：根据溢出程度切换首选方向及候选方向。可信度：observed。

可审查语义名：`FlipModifier`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1102689-1104307.`；`exports: default`；`literal: flip`；`literal: main`；`literal: width`；`literal: height`；`literal: break`。

### `eyes/src/vendor/modules/Unidentified215.js`

Popper 浮层定位：交换 top/bottom 和 left/right。可信度：observed。

可审查语义名：`GetOppositePlacement`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1104308-1104525.`；`exports: default`；`literal: right`；`literal: left`；`literal: bottom`。

### `eyes/src/vendor/modules/Unidentified216.js`

Popper 浮层定位：交换 start/end 对齐。可信度：observed。

可审查语义名：`GetOppositeVariationPlacement`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1104526-1104703.`；`exports: default`；`literal: start`。

### `eyes/src/vendor/modules/Unidentified217.js`

Popper 浮层定位：按方向的溢出量排序自动定位候选。可信度：observed。

可审查语义名：`ComputeAutoPlacement`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1104704-1105386.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified218.js`

Popper 浮层定位：沿主轴/副轴约束浮层，结合 tether 保持参考联系。可信度：observed。

可审查语义名：`PreventOverflowModifier`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1105387-1107438.`；`exports: default`；`literal: preventOverflow`；`literal: main`；`literal: function`；`literal: number`；`literal: height`。

### `eyes/src/vendor/modules/Unidentified219.js`

Popper 浮层定位：在 x 和 y 之间切换。可信度：observed。

可审查语义名：`GetAltAxis`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1107439-1107549.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified221.js`

Popper 浮层定位：计算箭头在浮层内的偏移及中心误差。可信度：observed。

可审查语义名：`ArrowModifier`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1107774-1108986.`；`exports: default`；`literal: arrow`；`literal: main`；`literal: height`；`literal: width`；`literal: function`。

### `eyes/src/vendor/modules/Unidentified222.js`

Popper 浮层定位：识别参考被裁剪或浮层逃逸并设置 data 属性。可信度：observed。

可审查语义名：`HideModifier`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1108987-1109825.`；`exports: default`；`literal: hide`；`literal: main`；`literal: preventOverflow`；`literal: reference`；`literal: data-popper-reference-hidden`。

### `eyes/src/vendor/modules/Unidentified243.cjs`

Moment Timezone 0.5.33：时区数据库加载、偏移计算、时间转换与猜测。可信度：observed。

证据：`// Recovered from vendors.js:1110780-1117848.`；`literal: function`；`literal: string`；`literal: Moment Timezone requires Moment.js. See https://momentjs.com/timezone/docs/#/use-it/browser/`；`literal: Moment Timezone found `；`literal:  from the Intl api, but did not have that data loaded.`。

### `eyes/src/vendor/modules/Unidentified404.js`

观察容器 ResizeObserver 或 window resize 并发射轮播尺寸事件。可信度：observed。

可审查语义名：`SwiperResize`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1599514-1600376.`；`exports: default`；`literal: beforeResize`；`literal: resize`；`literal: orientationchange`；`literal: init`；`literal: destroy`。

### `eyes/src/vendor/modules/Unidentified405.js`

观察 DOM mutation 并通知轮播更新。可信度：observed。

可审查语义名：`SwiperObserver`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1600377-1601309.`；`exports: default`；`literal: observerUpdate`；`literal: init`；`literal: destroy`。

### `eyes/src/vendor/modules/Unidentified406.js`

实现 eventsEmitter；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`eventsEmitter`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1601310-1602748.`；`exports: default`；`literal: function`；`literal: unshift`；`literal: push`；`literal: string`。

### `eyes/src/vendor/modules/Unidentified407.js`

实现 update；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`update`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1602749-1603125.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified408.js`

实现 updateSize；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`updateSize`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1603126-1603734.`；`exports: default`；`literal: padding-left`；`literal: padding-right`；`literal: padding-top`；`literal: padding-bottom`。

### `eyes/src/vendor/modules/Unidentified409.js`

实现 updateSlides；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`updateSlides`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1603735-1608151.`；`exports: default`；`literal: height`；`literal: margin-top`；`literal: margin-left`；`literal: margin-bottom `；`literal: margin-right`。

### `eyes/src/vendor/modules/Unidentified410.js`

实现 updateAutoHeight；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`updateAutoHeight`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1608152-1608892.`；`exports: default`；`literal: number`；`literal: data-swiper-slide-index`；`literal: auto`；`literal: height`。

### `eyes/src/vendor/modules/Unidentified411.js`

实现 updateSlidesOffset；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`updateSlidesOffset`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1608893-1609103.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified412.js`

实现 updateSlidesProgress；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`updateSlidesProgress`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1609104-1610041.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified413.js`

实现 updateProgress；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`updateProgress`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1610042-1610654.`；`exports: default`；`literal: reachBeginning toEdge`；`literal: reachEnd toEdge`；`literal: fromEdge`；`literal: progress`。

### `eyes/src/vendor/modules/Unidentified414.js`

实现 updateSlidesClasses；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`updateSlidesClasses`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1610655-1612437.`；`exports: default`；`literal: data-swiper-slide-index`。

### `eyes/src/vendor/modules/Unidentified415.js`

实现 updateActiveIndex；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`updateActiveIndex`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1612438-1613370.`；`exports: default`；`literal: snapIndexChange`；`literal: data-swiper-slide-index`；`literal: activeIndexChange`；`literal: realIndexChange`；`literal: slideChange`。

### `eyes/src/vendor/modules/Unidentified416.js`

实现 updateClickedSlide；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`updateClickedSlide`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1613371-1613958.`；`exports: default`；`literal: data-swiper-slide-index`。

### `eyes/src/vendor/modules/Unidentified417.js`

实现 translate；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`translate`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1613959-1614170.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified418.js`

实现 getTranslate；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`getTranslate`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1614171-1614477.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified419.js`

实现 setTranslate；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`setTranslate`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1614478-1615093.`；`exports: default`；`literal: scrollLeft`；`literal: scrollTop`；`literal: setTranslate`。

### `eyes/src/vendor/modules/Unidentified420.js`

实现 minTranslate；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`minTranslate`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1615094-1615205.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified421.js`

实现 maxTranslate；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`maxTranslate`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1615206-1615338.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified422.js`

实现 translateTo；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`translateTo`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1615339-1616776.`；`exports: default`；`literal: scrollLeft`；`literal: scrollTop`；`literal: left`；`literal: smooth`；`literal: beforeTransitionStart`。

### `eyes/src/vendor/modules/Unidentified423.js`

实现 transition；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`transition`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1616777-1616930.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified424.js`

实现 setTransition；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`setTransition`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1616931-1617107.`；`exports: default`；`literal: setTransition`。

### `eyes/src/vendor/modules/Unidentified425.js`

实现 transitionStart；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`transitionStart`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1617108-1617355.`；`exports: default`；`literal: Start`。

### `eyes/src/vendor/modules/Unidentified426.js`

按当前/前一索引判断 next/prev/reset 并发射过渡阶段事件。可信度：observed。

可审查语义名：`SwiperTransitionEmit`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1617356-1617787.`；`exports: default`；`literal: next`；`literal: prev`；`literal: reset`。

### `eyes/src/vendor/modules/Unidentified427.js`

实现 transitionEnd；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`transitionEnd`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1617788-1618032.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified428.js`

实现 slide；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`slide`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1618033-1618304.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified429.js`

实现 slideTo；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`slideTo`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1618305-1621224.`；`exports: default`；`literal: number`；`literal: string`；`literal: beforeSlideChangeStart`；`literal: next`；`literal: prev`。

### `eyes/src/vendor/modules/Unidentified430.js`

实现 slideToLoop；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`slideToLoop`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1621225-1621424.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified431.js`

实现 slideNext；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`slideNext`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1621425-1621933.`；`exports: default`；`literal: auto`；`literal: current`。

### `eyes/src/vendor/modules/Unidentified432.js`

实现 slidePrev；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`slidePrev`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1621934-1622704.`；`exports: default`；`literal: auto`；`literal: previous`。

### `eyes/src/vendor/modules/Unidentified433.js`

实现 slideReset；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`slideReset`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1622705-1622862.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified434.js`

实现 slideToClosest；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`slideToClosest`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1622863-1623411.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified435.js`

实现 slideToClickedSlide；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`slideToClickedSlide`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1623412-1624220.`；`exports: default`；`literal: auto`；`literal: data-swiper-slide-index`。

### `eyes/src/vendor/modules/Unidentified436.js`

实现 loop；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`loop`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1624221-1624361.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified437.js`

实现 loopCreate；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`loopCreate`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1624362-1625518.`；`exports: default`；`literal: auto`；`literal: data-swiper-slide-index`。

### `eyes/src/vendor/modules/Unidentified438.js`

实现 loopFix；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`loopFix`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1625519-1626109.`；`exports: default`；`literal: beforeLoopFix`；`literal: loopFix`。

### `eyes/src/vendor/modules/Unidentified439.js`

实现 loopDestroy；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`loopDestroy`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1626110-1626383.`；`exports: default`；`literal: data-swiper-slide-index`。

### `eyes/src/vendor/modules/Unidentified440.js`

实现 grabCursor；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`grabCursor`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1626384-1626504.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified441.js`

实现 setGrabCursor；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`setGrabCursor`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1626505-1626929.`；`exports: default`；`literal: container`；`literal: move`；`literal: -webkit-grabbing`；`literal: -webkit-grab`；`literal: -moz-grabbin`。

### `eyes/src/vendor/modules/Unidentified442.js`

实现 unsetGrabCursor；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`unsetGrabCursor`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1626930-1627180.`；`exports: default`；`literal: container`；`literal: wrapperEl`。

### `eyes/src/vendor/modules/Unidentified443.js`

实现 events；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`events`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1627181-1628495.`；`exports: default`；`literal: addEventListener`；`literal: removeEventListener`；`literal: touchstart`；`literal: click`；`literal: scroll`。

### `eyes/src/vendor/modules/Unidentified444.js`

筛选有效触摸/指针起点，初始化拖动状态并发射 touchStart。可信度：observed。

可审查语义名：`SwiperOnTouchStart`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1628496-1630642.`；`exports: default`；`literal: wrapper`；`literal: touchstart`；`literal: which`；`literal: button`；`literal: prevent`。

### `eyes/src/vendor/modules/Unidentified445.js`

判定滚动方向、阈值和嵌套拖动，更新平移及速度采样。可信度：observed。

可审查语义名：`SwiperOnTouchMove`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1630643-1634509.`；`exports: default`；`literal: touchMoveOpposite`；`literal: touchmove`；`literal: touchMove`；`literal: webkitTransitionEnd transitionend`；`literal: sliderFirstMove`。

### `eyes/src/vendor/modules/Unidentified446.js`

结束拖动，处理点击/双击、惯性以及滑片吸附。可信度：observed。

可审查语义名：`SwiperOnTouchEnd`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1634510-1636505.`；`exports: default`；`literal: touchEnd`；`literal: tap click`；`literal: doubleTap doubleClick`；`literal: next`；`literal: prev`。

### `eyes/src/vendor/modules/Unidentified447.js`

重算响应式断点、容器与滑片尺寸，恢复索引和导航锁。可信度：observed。

可审查语义名：`SwiperOnResize`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1636506-1637169.`；`exports: default`；`literal: auto`。

### `eyes/src/vendor/modules/Unidentified448.js`

拖动或动画期间按配置阻止点击默认行为及传播。可信度：observed。

可审查语义名：`SwiperOnClick`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1637170-1637442.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified449.js`

CSS scroll 模式下同步 scrollLeft/Top 到平移、索引和进度。可信度：observed。

可审查语义名：`SwiperOnScroll`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1637443-1637967.`；`exports: default`；`literal: setTranslate`。

### `eyes/src/vendor/modules/Unidentified450.js`

实现 breakpoints；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`breakpoints`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1637968-1638086.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified451.js`

实现 setBreakpoint；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`setBreakpoint`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1638087-1639382.`；`exports: default`；`literal: column`；`literal: _beforeBreakpoint`；`literal: breakpoint`。

### `eyes/src/vendor/modules/Unidentified452.js`

实现 getBreakpoint；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`getBreakpoint`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1639383-1639981.`；`exports: default`；`literal: window`；`literal: container`；`literal: string`。

### `eyes/src/vendor/modules/Unidentified453.js`

实现 classes；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`classes`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1639982-1640097.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified454.js`

实现 addClasses；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`addClasses`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1640098-1640826.`；`exports: default`；`literal: object`；`literal: string`；`literal: initialized`；`literal: pointer-events`；`literal: free-mode`。

### `eyes/src/vendor/modules/Unidentified455.js`

实现 removeClasses；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`removeClasses`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1640827-1641000.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified456.js`

实现 images；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`images`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1641001-1641115.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified457.js`

实现 loadImage；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`loadImage`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1641116-1641435.`；`exports: default`；`literal: picture`。

### `eyes/src/vendor/modules/Unidentified458.js`

实现 preloadImages；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`preloadImages`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1641436-1641953.`；`exports: default`；`literal: imagesReady`；`literal: srcset`；`literal: sizes`。

### `eyes/src/vendor/modules/Unidentified459.js`

实现 checkOverflow；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`checkOverflow`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1641954-1642414.`；`exports: default`；`literal: lock`；`literal: unlock`。

### `eyes/src/vendor/modules/Unidentified460.js`

轮播默认配置表：触摸、布局、类名、循环、断点与交互策略。可信度：observed。

可审查语义名：`SwiperDefaults`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1642415-1644450.`；`exports: default`；`literal: horizontal`；`literal: wrapper`；`literal: input, select, option, textarea, button, video, label`；`literal: slide`；`literal: window`。

### `eyes/src/vendor/modules/Unidentified461.js`

扩展模块默认参数，并规范化 enabled/auto/navigation 等输入。可信度：observed。

可审查语义名：`SwiperModuleExtendParams`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1644451-1644919.`；`exports: default`；`literal: object`；`literal: navigation`；`literal: pagination`；`literal: scrollbar`；`literal: enabled`。

### `eyes/src/vendor/modules/Unidentified462.js`

Swiper 的 Virtual 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperVirtual`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1644920-1648806.`；`exports: default`；`literal: data-swiper-slide-index`；`literal: right`；`literal: left`；`literal: .swiper-slide`；`literal: beforeInit`。

### `eyes/src/vendor/modules/Unidentified463.js`

Swiper 的 Keyboard 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperKeyboard`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1648807-1650802.`；`exports: default`；`literal: input`；`literal: textarea`；`literal: keyPress`；`literal: keydown`；`literal: init`。

### `eyes/src/vendor/modules/Unidentified464.js`

Swiper 的 Mousewheel 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperMousewheel`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1650803-1655405.`；`exports: default`；`literal: container`；`literal: scroll`；`literal: detail`；`literal: wheelDelta`；`literal: wheelDeltaY`。

### `eyes/src/vendor/modules/Unidentified465.js`

Swiper 的 Navigation 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperNavigation`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1655406-1658003.`；`exports: default`；`literal: string`；`literal: addClass`；`literal: removeClass`；`literal: BUTTON`；`literal: swiper-button-next`。

### `eyes/src/vendor/modules/Unidentified466.js`

按 createElements/auto 配置创建缺失的导航等 DOM 并同步参数。可信度：observed。

可审查语义名：`SwiperCreateElementIfNotDefined`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1658004-1658340.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified467.js`

Swiper 的 Pagination 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperPagination`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1658341-1665415.`；`exports: default`；`literal: swiper-pagination`；`literal: span`；`literal: bullets`；`literal: outerWidth`；`literal: outerHeight`。

### `eyes/src/vendor/modules/Unidentified468.js`

将类名转换为选择器并转义特殊标点。可信度：observed。

可审查语义名：`SwiperClassesToSelector`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1665416-1665576.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified469.js`

Swiper 的 Scrollbar 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperScrollbar`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1665577-1670189.`；`exports: default`；`literal: auto`；`literal: none`；`literal: addClass`；`literal: removeClass`；`literal: touchstart`。

### `eyes/src/vendor/modules/Unidentified470.js`

Swiper 的 Parallax 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperParallax`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1670190-1672147.`；`exports: default`；`literal: data-swiper-parallax`；`literal: data-swiper-parallax-x`；`literal: data-swiper-parallax-y`；`literal: data-swiper-parallax-scale`；`literal: data-swiper-parallax-opacity`。

### `eyes/src/vendor/modules/Unidentified471.js`

Swiper 的 Zoom 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperZoom`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1672148-1682812.`；`exports: default`；`literal: swiper-zoom-container`；`literal: swiper-slide-zoomed`；`literal: touchstart`；`literal: img, svg, canvas, picture, .swiper-zoom-target`；`literal: data-swiper-zoom`。

### `eyes/src/vendor/modules/Unidentified472.js`

Swiper 的 Lazy 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperLazy`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1682813-1687421.`；`exports: default`；`literal: swiper-lazy`；`literal: swiper-lazy-loading`；`literal: swiper-lazy-loaded`；`literal: swiper-lazy-preloader`；`literal: data-background`。

### `eyes/src/vendor/modules/Unidentified473.js`

Swiper 的 Controller 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperController`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1687422-1689623.`；`exports: default`；`literal: slide`；`literal: beforeInit`；`literal: update`；`literal: resize`；`literal: observerUpdate`。

### `eyes/src/vendor/modules/Unidentified474.js`

Swiper 的 A11y 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperA11y`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1689624-1693596.`；`exports: default`；`literal: swiper-notification`；`literal: Previous slide`；`literal: Next slide`；`literal: This is the first slide`；`literal: This is the last slide`。

### `eyes/src/vendor/modules/Unidentified475.js`

Swiper 的 History 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperHistory`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1693597-1695564.`；`exports: default`；`literal: slides`；`literal: data-history`；`literal: init`；`literal: popstate`；`literal: destroy`。

### `eyes/src/vendor/modules/Unidentified476.js`

Swiper 的 HashNavigation 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperHashNavigation`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1695565-1697155.`；`exports: default`；`literal: hashChange`；`literal: data-hash`；`literal: hashSet`；`literal: data-history`；`literal: init`。

### `eyes/src/vendor/modules/Unidentified477.js`

Swiper 的 Autoplay 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperAutoplay`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1697156-1700125.`；`exports: default`；`literal: data-swiper-autoplay`；`literal: autoplay`；`literal: autoplayStart`；`literal: autoplayStop`；`literal: transitionend`。

### `eyes/src/vendor/modules/Unidentified478.js`

Swiper 的 Thumbs 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperThumbs`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1700126-1703434.`；`exports: default`；`literal: swiper-slide-thumb-active`；`literal: swiper-thumbs`；`literal: data-swiper-slide-index`；`literal: auto`；`literal: next`。

### `eyes/src/vendor/modules/Unidentified479.js`

Swiper 的 FreeMode 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperFreeMode`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1703435-1706603.`；`exports: default`；`literal: startX`；`literal: startY`；`literal: currentX`；`literal: currentY`；`literal: next`。

### `eyes/src/vendor/modules/Unidentified480.js`

Swiper 的 Grid 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperGrid`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1706604-1707794.`；`exports: default`；`literal: column`；`literal: auto`；`literal: -webkit-order`；`literal: margin-top`；`literal: width`。

### `eyes/src/vendor/modules/Unidentified481.js`

将滑片添加、插入、移除接口绑定到轮播实例。可信度：observed。

可审查语义名：`SwiperManipulation`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1707795-1708113.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified482.js`

末尾添加滑片，重建循环并按 observer 状态更新。可信度：observed。

可审查语义名：`SwiperAppendSlide`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1708114-1708413.`；`exports: default`；`literal: object`；`literal: length`。

### `eyes/src/vendor/modules/Unidentified483.js`

开头添加滑片，按新增数量修正当前索引并重建循环。可信度：observed。

可审查语义名：`SwiperPrependSlide`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1708414-1708771.`；`exports: default`；`literal: object`；`literal: length`。

### `eyes/src/vendor/modules/Unidentified484.js`

在索引处插入滑片，移动尾部节点并维持当前滑片位置。可信度：observed。

可审查语义名：`SwiperAddSlide`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1708772-1709474.`；`exports: default`；`literal: object`；`literal: length`。

### `eyes/src/vendor/modules/Unidentified485.js`

移除一个或多个索引滑片并修正当前索引及循环副本。可信度：observed。

可审查语义名：`SwiperRemoveSlide`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1709475-1710033.`；`exports: default`；`literal: object`；`literal: length`。

### `eyes/src/vendor/modules/Unidentified486.js`

构造所有滑片索引并委托 removeSlide 删除。可信度：observed。

可审查语义名：`SwiperRemoveAllSlides`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1710034-1710201.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified487.js`

Swiper 的 EffectFade 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperEffectFade`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1710202-1711163.`；`exports: default`；`literal: fade`。

### `eyes/src/vendor/modules/Unidentified488.js`

在 beforeInit/setTranslate/setTransition 上装配视觉效果与透视类。可信度：observed。

可审查语义名：`SwiperEffectInit`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1711164-1711705.`；`exports: default`；`literal: beforeInit`；`literal: setTranslate`；`literal: setTransition`。

### `eyes/src/vendor/modules/Unidentified489.js`

选择效果 transformEl 并隐藏背面，否则返回原滑片。可信度：observed。

可审查语义名：`SwiperEffectTarget`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1711706-1711918.`；`exports: default`；`literal: backface-visibility`；`literal: hidden`；`literal: -webkit-backface-visibility`。

### `eyes/src/vendor/modules/Unidentified490.js`

为虚拟平移模式监听效果目标的 transitionend 并结束动画。可信度：observed。

可审查语义名：`SwiperEffectVirtualTransitionEnd`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1711919-1712364.`；`exports: default`；`literal: webkitTransitionEnd`；`literal: transitionend`。

### `eyes/src/vendor/modules/Unidentified491.js`

Swiper 的 EffectCube 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperEffectCube`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1712365-1715194.`；`exports: default`；`literal: cube`；`literal: .swiper-cube-shadow`；`literal: <div class="swiper-cube-shadow"></div>`；`literal: data-swiper-slide-index`；`literal: .swiper-slide-shadow-left`。

### `eyes/src/vendor/modules/Unidentified492.js`

Swiper 的 EffectFlip 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperEffectFlip`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1715195-1716851.`；`exports: default`；`literal: flip`；`literal: .swiper-slide-shadow-left`；`literal: .swiper-slide-shadow-top`；`literal: .swiper-slide-shadow-right`；`literal: .swiper-slide-shadow-bottom`。

### `eyes/src/vendor/modules/Unidentified493.js`

创建或复用 swiper-slide-shadow 节点用于 3D 效果明暗。可信度：observed。

可审查语义名：`SwiperCreateShadow`（行为命名，不声称已恢复上游文件名）。

证据：`// Recovered from vendors.js:1716852-1717176.`；`exports: default`；`literal: swiper-slide-shadow`。

### `eyes/src/vendor/modules/Unidentified494.js`

Swiper 的 EffectCoverflow 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperEffectCoverflow`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1717177-1718926.`；`exports: default`；`literal: coverflow`；`literal: string`；`literal: .swiper-slide-shadow-left`；`literal: .swiper-slide-shadow-top`；`literal: .swiper-slide-shadow-right`。

### `eyes/src/vendor/modules/Unidentified495.js`

Swiper 的 EffectCreative 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperEffectCreative`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1718927-1721021.`；`exports: default`；`literal: string`；`literal: creative`；`literal: .swiper-slide-shadow`；`literal: transform-origin`。

### `eyes/src/vendor/modules/Unidentified496.js`

Swiper 的 EffectCards 功能插件；按初始化、更新和销毁事件管理状态及 DOM。可信度：observed。

可审查语义名：`SwiperEffectCards`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1721022-1722868.`；`exports: default`；`literal: cards`；`literal: .swiper-slide-shadow`。

### `eyes/src/vendor/modules/Unidentified585.js`

组装 proj4 兼容坐标转换入口、投影注册表和定义 API。可信度：observed。

可审查语义名：`Proj4API`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1723137-1723511.`；`exports: default`；`literal: WGS84`；`literal: __VERSION__`。

### `eyes/src/vendor/modules/Unidentified586.js`

创建正反向坐标转换器并处理输入数组或点对象。可信度：observed。

可审查语义名：`Proj4TransformFactory`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1723512-1724633.`；`exports: default`；`literal: WGS84`；`literal: geocent`；`literal: number`；`literal: object`；`literal: oProj`。

### `eyes/src/vendor/modules/Unidentified587.js`

解析坐标参考定义，建立椭球、基准面和投影实例。可信度：observed。

可审查语义名：`Projection`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1724634-1725891.`；`exports: default`；`literal: object`；`literal: none`；`literal: wgs84`；`literal: init`；`literal: function`。

### `eyes/src/vendor/modules/Unidentified588.js`

将 EPSG、WKT、PROJJSON 或 proj4 定义归一化。可信度：observed。

可审查语义名：`ParseCRSDefinition`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1725892-1726728.`；`exports: default`；`literal: 3857`；`literal: 900913`；`literal: 3785`；`literal: 102113`；`literal: string`。

### `eyes/src/vendor/modules/Unidentified589.js`

注册和读取 EPSG、ESRI、IAU2000 等命名坐标定义。可信度：observed。

可审查语义名：`ProjectionDefinitions`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1726729-1727388.`；`exports: default`；`literal: string`；`literal: object`；`literal: projName`；`literal: EPSG`；`literal: EPSG:`。

### `eyes/src/vendor/modules/Unidentified590.js`

初始化 WGS84、Web Mercator、UTM 和极区坐标参考定义。可信度：observed。

可审查语义名：`BuiltinCRSDefinitions`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1727389-1728444.`；`exports: default`；`literal: EPSG:4326`；`literal: +title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees`；`literal: EPSG:4269`；`literal: EPSG:3857`；`literal: EPSG:`。

### `eyes/src/vendor/modules/Unidentified591.js`

解析 +proj 参数并把角度转为弧度。可信度：observed。

可审查语义名：`ParseProjString`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1728445-1730389.`；`exports: default`；`literal: projName`；`literal: datumCode`；`literal: @null`；`literal: none`；`literal: ewnsud`。

### `eyes/src/vendor/modules/Unidentified593.js`

本初子午线名称到相对格林尼治经度的常量表。可信度：observed。

可审查语义名：`PrimeMeridians`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1731276-1731607.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified594.js`

线性单位名称到米的转换系数表。可信度：observed。

可审查语义名：`LinearUnits`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1731608-1732165.`；`exports: default`；`literal: us-ft`；`literal: us-ch`；`literal: us-mi`；`literal: ind-ft`；`literal: ind-yd`。

### `eyes/src/vendor/modules/Unidentified595.js`

忽略大小写、空白和标点匹配投影参数名称。可信度：observed。

可审查语义名：`MatchNormalizedKey`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1732166-1732434.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified596.js`

解析 WKT 坐标参考树并归一化投影属性。可信度：observed。

可审查语义名：`ParseWKT`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1732435-1736922.`；`exports: default`；`literal: PROJECTEDCRS`；`literal: PROJCRS`；`literal: GEOGCS`；`literal: GEOCCS`；`literal: PROJCS`。

### `eyes/src/vendor/modules/Unidentified599.js`

将 WKT2 坐标轴、单位和投影参数映射为内部表示。可信度：observed。

可审查语义名：`WKTParameterMapping`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1737557-1742551.`；`exports: default`；`literal: unit`；`literal: unknown`；`literal: Unknown`；`literal: east`；`literal: north`。

### `eyes/src/vendor/modules/Unidentified602.js`

通过字符串状态机解析 WKT 关键字、引号、数值和嵌套结构。可信度：observed。

可审查语义名：`WKTTokenizer`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1743552-1745943.`；`exports: default`；`literal: string`；`literal: not a string`；`literal: havn't handled "`；`literal: " in afterquote yet, index `；`literal: " in number yet, index `。

### `eyes/src/vendor/modules/Unidentified606.js`

复制非 undefined 属性到目标对象。可信度：observed。

可审查语义名：`CopyDefinedProperties`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1752421-1752590.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified609.js`

计算依偏心率和纬度正弦变化的椭球曲率半径。可信度：observed。

可审查语义名：`EllipsoidRadius`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1754628-1754756.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified611.js`

负数返回 -1，其余返回 1。可信度：observed。

可审查语义名：`SignNonzero`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1754930-1755034.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified612.js`

计算椭球等角纬度的指数辅助量。可信度：observed。

可审查语义名：`Tsfn`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1755035-1755220.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified613.js`

最多 16 轮迭代反求等角纬度，失败返回 -9999。可信度：observed。

可审查语义名：`Phi2`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1755221-1755500.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified616.js`

命名椭球长半轴、短半轴或反扁率表。可信度：observed。

可审查语义名：`EllipsoidDefinitions`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1756264-1759077.`；`exports: default`；`literal: MERIT 1983`；`literal: Soviet Geodetic System 85`；`literal: GRS 1980(IUGG, 1980)`；`literal: IAU 1976`；`literal: Airy 1830`。

### `eyes/src/vendor/modules/Unidentified617.js`

命名大地基准、椭球和 Helmert/gridshift 参数表。可信度：observed。

可审查语义名：`DatumDefinitions`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1759078-1779500.`；`exports: default`；`literal: 0,0,0`；`literal: WGS84`；`literal: 674.374,15.056,405.346`；`literal: bessel`；`literal: swiss`。

### `eyes/src/vendor/modules/Unidentified618.js`

构造基准参数；将角秒和 ppm 变换到内部单位。可信度：observed。

可审查语义名：`CreateDatum`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1779501-1780146.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified624.js`

将坐标数组转换为 x/y/z 点对象。可信度：observed。

可审查语义名：`ToPoint`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1790046-1790211.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified625.js`

拒绝非有限数坐标。可信度：observed。

可审查语义名：`CheckFiniteCoordinates`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1790212-1790554.`；`exports: default`；`literal: function`；`literal: coordinates must be finite numbers`；`literal: number`。

### `eyes/src/vendor/modules/Unidentified626.js`

兼容数组、对象、逗号字符串的旧 proj4.Point 接口。可信度：observed。

可审查语义名：`LegacyPoint`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1790555-1791171.`；`exports: default`；`literal: object`；`literal: string`；`literal: proj4.Point will be removed in version 3, use proj4.toPoint`。

### `eyes/src/vendor/modules/Unidentified628.js`

向 Proj 注册各投影插件。可信度：observed。

可审查语义名：`RegisterProjections`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1796432-1797944.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified630.js`

展开偏心率的子午线弧长级数系数。可信度：observed。

可审查语义名：`MeridionalCoefficients`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1800340-1800734.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified631.js`

使用纬度、正余弦和级数系数计算子午线弧长。可信度：observed。

可审查语义名：`MeridionalLength`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1800735-1800887.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified632.js`

最多 20 次 Newton 迭代反求子午线弧长对应纬度。可信度：observed。

可审查语义名：`InverseMeridionalLength`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1800888-1801171.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified634.js`

通过指数函数计算双曲正弦。可信度：observed。

可审查语义名：`Sinh`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1804625-1804750.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified635.js`

按最大分量缩放计算二元范数，降低溢出。可信度：observed。

可审查语义名：`HypotStable`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1804751-1804948.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified636.js`

组合稳定 log1p 和 hypot 计算反双曲正弦。可信度：observed。

可审查语义名：`AsinhStable`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1804949-1805142.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified637.js`

对小量修正 log(1+x) 的舍入误差。可信度：observed。

可审查语义名：`Log1pStable`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1805143-1805278.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified638.js`

Clenshaw 递推计算纬度级数。可信度：observed。

可审查语义名：`ClenshawGatg`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1805279-1805475.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified639.js`

Clenshaw 递推计算实正弦级数。可信度：observed。

可审查语义名：`ClenshawReal`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1805476-1805666.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified640.js`

通过双曲函数计算复数形式的 Clenshaw 级数。可信度：observed。

可审查语义名：`ClenshawComplex`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1805667-1805998.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified641.js`

通过指数函数计算双曲余弦。可信度：observed。

可审查语义名：`Cosh`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1805999-1806124.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified643.js`

由经度推导并约束 UTM 分区。可信度：observed。

可审查语义名：`AdjustUTMZone`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1806686-1806902.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified646.js`

计算椭球共形转换的幂比值。可信度：observed。

可审查语义名：`Srat`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1809188-1809309.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified653.js`

使用四项三角级数计算子午线弧。可信度：observed。

可审查语义名：`Mlfn`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1824638-1824793.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified654.js`

子午线弧零阶系数。可信度：observed。

可审查语义名：`E0fn`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1824794-1824917.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified655.js`

子午线弧二倍角系数。可信度：observed。

可审查语义名：`E1fn`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1824918-1825042.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified656.js`

子午线弧四倍角系数。可信度：observed。

可审查语义名：`E2fn`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1825043-1825161.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified657.js`

子午线弧六倍角系数。可信度：observed。

可审查语义名：`E3fn`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1825162-1825273.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified658.js`

计算卯酉圈曲率半径。可信度：observed。

可审查语义名：`Gnsfn`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1825274-1825402.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified659.js`

将超出半圆范围的纬度折回。可信度：observed。

可审查语义名：`AdjustLatitude`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1825403-1825572.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified660.js`

最多 15 次迭代反求子午线弧纬度，失败返回 NaN。可信度：observed。

可审查语义名：`InverseMlfn`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1825573-1825867.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified662.js`

计算等积纬度辅助量 q。可信度：observed。

可审查语义名：`Qsfn`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1829740-1829907.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified663.js`

计算等积纬度逆变换级数系数。可信度：observed。

可审查语义名：`AuthalicCoefficients`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1829908-1830214.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified664.js`

通过正弦级数恢复等积变换纬度。可信度：observed。

可审查语义名：`AuthalicLatitude`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1830215-1830381.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified666.js`

将舍入后越界的输入夹到 [-1,1] 再求反正弦。可信度：observed。

可审查语义名：`SafeAsin`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1832530-1832666.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified669.js`

最多 30 次迭代反求等积纬度，极点特殊处理。可信度：observed。

可审查语义名：`InverseQsfn`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1834793-1835208.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified719.cjs`

使用 History API 或 hash 匹配路由，管理导航钩子及链接监听。可信度：observed。

可审查语义名：`ClientRouter`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1873634-1881684.`；`literal: function`；`literal: symbol`；`literal: undefined`；`literal: pushState`；`literal: ($|/)`。

### `eyes/src/vendor/modules/Unidentified777.cjs`

将对应压缩时区 JSON 加载进 Moment Timezone 实例并导出该实例。可信度：observed。

证据：`// Recovered from vendors.js:1897650-1897701.`。

### `eyes/src/vendor/modules/Unidentified778.cjs`

Moment Timezone 0.5.33：时区数据库加载、偏移计算、时间转换与猜测。可信度：observed。

证据：`// Recovered from vendors.js:1897702-1904770.`；`literal: function`；`literal: string`；`literal: Moment Timezone requires Moment.js. See https://momentjs.com/timezone/docs/#/use-it/browser/`；`literal: Moment Timezone found `；`literal:  from the Intl api, but did not have that data loaded.`。

### `eyes/src/vendor/modules/Unidentified78.cjs`

从 decoder manifest revision 构造打包 WASM/JS 资源路径；具体编解码器由 manifest 和调用方确定。可信度：observed。

证据：`// Recovered from vendors.js:811297-811368.`；`literal: /bundled/c58ed249a0b6b2787e4f.wasm`。

### `eyes/src/vendor/modules/Unidentified79.cjs`

从 decoder manifest revision 构造打包 WASM/JS 资源路径；具体编解码器由 manifest 和调用方确定。可信度：observed。

证据：`// Recovered from vendors.js:811369-811438.`；`literal: /bundled/0389c8aac482cf438e98.js`。

### `eyes/src/vendor/modules/Unidentified930.js`

Popper 浮层定位：把计算样式和属性应用到浮层、箭头、参考元素，并在清理时撤销。可信度：observed。

可审查语义名：`ApplyStylesModifier`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2374868-2375923.`；`exports: default`；`literal: applyStyles`；`literal: write`；`literal: absolute`；`literal: computeStyles`。

### `eyes/src/vendor/modules/Unidentified931.js`

Popper 浮层定位：取得 DOM nodeName 的小写形式。可信度：observed。

可审查语义名：`GetNodeName`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2375924-2376057.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified933.js`

Popper 浮层定位：取得节点所属 window，处理跨文档和无节点输入。可信度：observed。

可审查语义名：`GetWindow`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2376505-2376718.`；`exports: default`；`literal: [object Window]`。

### `eyes/src/vendor/modules/Unidentified936.js`

Popper 浮层定位：计算相对 offsetParent 的参考矩形，补偿缩放、滚动和边框。可信度：observed。

可审查语义名：`GetCompositeRect`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2379860-2380615.`；`exports: default`；`literal: body`。

### `eyes/src/vendor/modules/Unidentified937.js`

Popper 浮层定位：归一化 boundingClientRect，补偿元素缩放和 visualViewport 偏移。可信度：observed。

可审查语义名：`GetBoundingClientRect`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2380616-2381221.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified939.js`

Popper 浮层定位：根据 Safari UA 判断视口偏移策略。可信度：observed。

可审查语义名：`IsLayoutViewport`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2381384-2381547.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified940.js`

Popper 浮层定位：优先读取 User-Agent Client Hints，再回退 navigator.userAgent。可信度：observed。

可审查语义名：`GetUserAgent`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2381548-2381801.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified941.js`

Popper 浮层定位：按节点类型选择 window 或元素的滚动偏移。可信度：observed。

可审查语义名：`GetNodeScroll`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2381802-2382017.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified942.js`

Popper 浮层定位：取得 window pageXOffset/pageYOffset。可信度：observed。

可审查语义名：`GetWindowScroll`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2382018-2382200.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified943.js`

Popper 浮层定位：取得元素 scrollLeft/scrollTop。可信度：observed。

可审查语义名：`GetHTMLElementScroll`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2382201-2382343.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified944.js`

Popper 浮层定位：计算文档根元素与 window 滚动的横向差值。可信度：observed。

可审查语义名：`GetWindowScrollBarX`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2382344-2382535.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified945.js`

Popper 浮层定位：取得所属文档的 documentElement。可信度：observed。

可审查语义名：`GetDocumentElement`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2382536-2382727.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified946.js`

Popper 浮层定位：依据 overflow/overflowX/overflowY 判断滚动裁剪祖先。可信度：observed。

可审查语义名：`IsScrollParent`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2382728-2382941.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified947.js`

Popper 浮层定位：通过节点所属 window 读取计算样式。可信度：observed。

可审查语义名：`GetComputedStyle`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2382942-2383087.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified948.js`

Popper 浮层定位：返回 offset 布局矩形并校正一像素内的测量差。可信度：observed。

可审查语义名：`GetLayoutRect`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2383088-2383375.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified949.js`

Popper 浮层定位：递归收集滚动祖先及 window/visualViewport。可信度：observed。

可审查语义名：`ListScrollParents`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2383376-2383738.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified950.js`

Popper 浮层定位：向上寻找最近的滚动祖先。可信度：observed。

可审查语义名：`GetScrollParent`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2383739-2384015.`；`exports: default`；`literal: html`；`literal: body`；`literal: #document`。

### `eyes/src/vendor/modules/Unidentified951.js`

Popper 浮层定位：处理 assignedSlot、parentNode、ShadowRoot host 的祖先遍历。可信度：observed。

可审查语义名：`GetParentNode`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2384016-2384254.`；`exports: default`；`literal: html`。

### `eyes/src/vendor/modules/Unidentified952.js`

Popper 浮层定位：跳过 static table，识别 transform/filter 等 containing block。可信度：observed。

可审查语义名：`GetOffsetParent`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2384255-2385261.`；`exports: default`；`literal: fixed`；`literal: static`；`literal: html`；`literal: body`；`literal: none`。

### `eyes/src/vendor/modules/Unidentified953.js`

Popper 浮层定位：判断 table、td、th 类型。可信度：observed。

可审查语义名：`IsTableElement`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2385262-2385419.`；`exports: default`；`literal: table`。

### `eyes/src/vendor/modules/Unidentified954.js`

Popper 浮层定位：按依赖拓扑和 read/main/write 阶段排序定位修饰器。可信度：observed。

可审查语义名：`OrderModifiers`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2385420-2385925.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified956.js`

Popper 浮层定位：把同一微任务前的重复请求合并为一个 Promise。可信度：observed。

可审查语义名：`DebounceMicrotask`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2387122-2387329.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified957.js`

Popper 浮层定位：按修饰器名称合并 options 和 data。可信度：observed。

可审查语义名：`MergeByName`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2387330-2387650.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified958.js`

Popper 浮层定位：比较参考或浮层边界与裁剪矩形，返回四边溢出量。可信度：observed。

可审查语义名：`DetectOverflow`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2387651-2388852.`；`exports: default`；`literal: number`；`literal: absolute`。

### `eyes/src/vendor/modules/Unidentified959.js`

Popper 浮层定位：求多个裁剪祖先与根边界矩形的交集。可信度：observed。

可审查语义名：`GetClippingRect`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2388853-2390081.`；`exports: default`；`literal: fixed`；`literal: clippingParents`；`literal: absolute`；`literal: body`。

### `eyes/src/vendor/modules/Unidentified960.js`

Popper 浮层定位：计算布局/视觉视口尺寸和偏移。可信度：observed。

可审查语义名：`GetViewportRect`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2390082-2390467.`；`exports: default`；`literal: fixed`。

### `eyes/src/vendor/modules/Unidentified961.js`

Popper 浮层定位：计算完整文档滚动范围并补偿 RTL 横向位置。可信度：observed。

可审查语义名：`GetDocumentRect`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2390468-2391020.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified962.js`

Popper 浮层定位：沿 Shadow DOM host 链执行包含关系判断。可信度：observed。

可审查语义名：`ContainsShadowDOM`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2391021-2391300.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified963.js`

Popper 浮层定位：为 x/y/width/height 矩形补齐 top/right/bottom/left。可信度：observed。

可审查语义名：`RectToClientRect`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2391301-2391473.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified964.js`

Popper 浮层定位：根据 placement 和 start/end 对齐计算浮层位置。可信度：observed。

可审查语义名：`ComputeOffsets`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2391474-2392128.`；`exports: default`；`literal: height`；`literal: width`。

### `eyes/src/vendor/modules/Unidentified965.js`

Popper 浮层定位：提取 placement 连字符前的方向。可信度：observed。

可审查语义名：`GetBasePlacement`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2392129-2392240.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified966.js`

Popper 浮层定位：提取 placement 连字符后的 start/end 变化。可信度：observed。

可审查语义名：`GetVariation`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2392241-2392352.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified967.js`

Popper 浮层定位：将 top/bottom 映射到 x，left/right 映射到 y。可信度：observed。

可审查语义名：`GetMainAxisFromPlacement`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2392353-2392486.`；`exports: default`；`literal: bottom`。

### `eyes/src/vendor/modules/Unidentified968.js`

Popper 浮层定位：用给定四边 padding 覆盖零值默认对象。可信度：observed。

可审查语义名：`MergePaddingObject`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2392487-2392632.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified969.js`

Popper 浮层定位：创建上下左右全零的独立对象。可信度：observed。

可审查语义名：`GetFreshSideObject`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2392633-2392758.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified970.js`

Popper 浮层定位：将同一值分配给一组侧边键。可信度：observed。

可审查语义名：`ExpandToHashMap`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2392759-2392900.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified971.js`

Popper 浮层定位：注册滚动和 resize 更新监听并返回清理函数。可信度：observed。

可审查语义名：`EventListenersModifier`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2392901-2393503.`；`exports: default`；`literal: eventListeners`；`literal: write`；`literal: scroll`；`literal: resize`。

### `eyes/src/vendor/modules/Unidentified972.js`

Popper 浮层定位：在 read 阶段建立 popperOffsets 坐标。可信度：observed。

可审查语义名：`PopperOffsetsModifier`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2393504-2393786.`；`exports: default`；`literal: popperOffsets`；`literal: read`；`literal: absolute`。

### `eyes/src/vendor/modules/Unidentified975.js`

Popper 浮层定位：根据溢出程度切换首选方向及候选方向。可信度：observed。

可审查语义名：`FlipModifier`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2396884-2398502.`；`exports: default`；`literal: flip`；`literal: main`；`literal: width`；`literal: height`；`literal: break`。

### `eyes/src/vendor/modules/Unidentified976.js`

Popper 浮层定位：交换 top/bottom 和 left/right。可信度：observed。

可审查语义名：`GetOppositePlacement`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2398503-2398720.`；`exports: default`；`literal: right`；`literal: left`；`literal: bottom`。

### `eyes/src/vendor/modules/Unidentified977.js`

Popper 浮层定位：交换 start/end 对齐。可信度：observed。

可审查语义名：`GetOppositeVariationPlacement`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2398721-2398898.`；`exports: default`；`literal: start`。

### `eyes/src/vendor/modules/Unidentified978.js`

Popper 浮层定位：按方向的溢出量排序自动定位候选。可信度：observed。

可审查语义名：`ComputeAutoPlacement`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2398899-2399581.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified979.js`

Popper 浮层定位：沿主轴/副轴约束浮层，结合 tether 保持参考联系。可信度：observed。

可审查语义名：`PreventOverflowModifier`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2399582-2401633.`；`exports: default`；`literal: preventOverflow`；`literal: main`；`literal: function`；`literal: number`；`literal: height`。

### `eyes/src/vendor/modules/Unidentified980.js`

Popper 浮层定位：在 x 和 y 之间切换。可信度：observed。

可审查语义名：`GetAltAxis`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2401634-2401744.`；`exports: default`。

### `eyes/src/vendor/modules/Unidentified982.js`

Popper 浮层定位：计算箭头在浮层内的偏移及中心误差。可信度：observed。

可审查语义名：`ArrowModifier`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2401969-2403181.`；`exports: default`；`literal: arrow`；`literal: main`；`literal: height`；`literal: width`；`literal: function`。

### `eyes/src/vendor/modules/Unidentified983.js`

Popper 浮层定位：识别参考被裁剪或浮层逃逸并设置 data 属性。可信度：observed。

可审查语义名：`HideModifier`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2403182-2404020.`；`exports: default`；`literal: hide`；`literal: main`；`literal: preventOverflow`；`literal: reference`；`literal: data-popper-reference-hidden`。

### `eyes/src/vendor/modules/Unidentified989.cjs`

第二份自定义滚动条实现，保留独立模块状态。可信度：observed。

可审查语义名：`OverlayScrollbars`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:2404873-2460087.`；`literal: undefined`；`literal: OverlayScrollbars`；`literal: object`；`literal: function`；`literal: array`。

### `eyes/src/vendor/modules/UnrealBloomPass.js`

阈值提亮、多级分离高斯模糊与加权合成辉光。可信度：observed。

证据：`// Recovered from vendors.js:901776-910980.`；`exports: UnrealBloomPass`；`literal: UnrealBloomPass.bright`；`literal: UnrealBloomPass.h`；`literal: UnrealBloomPass.v`。

- `UnrealBloomPass`：阈值提亮、多级分离高斯模糊与加权合成辉光。方法：`constructor`、`dispose`、`setSize`、`render`、`_getSeparableBlurMaterial`、`_getCompositeMaterial`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用；`setSize`：更新像素尺寸及关联目标；后处理链需要同步所有通道；`render`：执行此类的渲染阶段；必须遵守 render target、缓冲交换和状态恢复约定。

### `eyes/src/vendor/modules/WorkerPool.js`

限制 worker 并发，排队分发任务并复用空闲 worker。可信度：observed。

证据：`// Recovered from vendors.js:811439-812562.`；`exports: WorkerPool`；`literal: message`。

- `WorkerPool`：限制 worker 并发，排队分发任务并复用空闲 worker。方法：`constructor`、`_initWorker`、`_getIdleWorker`、`_onMessage`、`setWorkerCreator`、`setWorkerLimit`、`postMessage`、`dispose`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

### `eyes/src/vendor/modules/ZSTDDecoder.js`

初始化内嵌 WASM 模块并解压 Zstandard 数据。可信度：observed。

证据：`// Recovered from vendors.js:836509-876315.`；`exports: ZSTDDecoder`；`literal: undefined`；`literal: data:application/wasm;base64,`；`literal: base64`；`literal: ZSTDDecoder: Await .init() before decoding.`。

- `ZSTDDecoder`：初始化内嵌 WASM 模块并解压 Zstandard 数据。方法：`init`、`_init`、`decode`。
  `init`：初始化延迟资源和运行时能力；必须先完成再使用依赖资源的方法；`decode`：解码压缩数据；保留输入类型和 decoder 初始化约束。

### `eyes/src/vendor/modules/add.js`

提供 add、get、getNormalizedProjName、start、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1752591-1753195.`；`exports: add, get, getNormalizedProjName, start, default`。

### `eyes/src/vendor/modules/adjustAxisFromEnu.js`

提供 adjustAxisFromEnu、adjustAxisToEnu；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1789330-1790045.`；`exports: adjustAxisFromEnu, adjustAxisToEnu`。

### `eyes/src/vendor/modules/afterMain-194.js`

提供 afterMain、afterRead、afterWrite、auto、basePlacements、beforeMain、beforeRead、beforeWrite、bottom、clippingParents、end、left、main、modifierPhases、placements、popper、read、reference、right、start、top、variationPlacements、viewport、write；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1091731-1092926.`；`exports: afterMain, afterRead, afterWrite, auto, basePlacements, beforeMain, beforeRead, beforeWrite, bottom, clippingParents, end, left, main, modifierPhases, placements, popper, read, reference, right, start, top, variationPlacements, viewport, write`；`literal: bottom`；`literal: right`；`literal: left`；`literal: auto`；`literal: start`。

### `eyes/src/vendor/modules/afterMain-955.js`

提供 afterMain、afterRead、afterWrite、auto、basePlacements、beforeMain、beforeRead、beforeWrite、bottom、clippingParents、end、left、main、modifierPhases、placements、popper、read、reference、right、start、top、variationPlacements、viewport、write；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:2385926-2387121.`；`exports: afterMain, afterRead, afterWrite, auto, basePlacements, beforeMain, beforeRead, beforeWrite, bottom, clippingParents, end, left, main, modifierPhases, placements, popper, read, reference, right, start, top, variationPlacements, viewport, write`；`literal: bottom`；`literal: right`；`literal: left`；`literal: auto`；`literal: start`。

### `eyes/src/vendor/modules/animateCSSModeScroll.js`

提供 animateCSSModeScroll、deleteProps、extend、getComputedStyle、getTranslate、isObject、nextTick、now、setCSSProperty；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1594957-1597720.`；`exports: animateCSSModeScroll, deleteProps, extend, getComputedStyle, getTranslate, isObject, nextTick, now, setCSSProperty`；`literal: none`；`literal: transform`；`literal: translate(`；`literal: matrix(1, 0, 0, 1,`；`literal: object`。

### `eyes/src/vendor/modules/animateFill-168.js`

提供 animateFill、createSingleton、delegate、followCursor、hideAll、inlinePositioning、roundArrow、sticky、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1056712-1080672.`；`exports: animateFill, createSingleton, delegate, followCursor, hideAll, inlinePositioning, roundArrow, sticky, default`；`literal: tippy-content`；`literal: tippy-backdrop`；`literal: tippy-arrow`；`literal: tippy-svg-arrow`；`literal: [object`。

### `eyes/src/vendor/modules/animateFill-929.js`

提供 animateFill、createSingleton、delegate、followCursor、hideAll、inlinePositioning、roundArrow、sticky、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:2350907-2374867.`；`exports: animateFill, createSingleton, delegate, followCursor, hideAll, inlinePositioning, roundArrow, sticky, default`；`literal: tippy-content`；`literal: tippy-backdrop`；`literal: tippy-arrow`；`literal: tippy-svg-arrow`；`literal: [object`。

### `eyes/src/vendor/modules/applyGridShift.js`

提供 applyGridShift、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1784365-1787186.`；`exports: applyGridShift, default`；`literal: Grid shift grids not found`；`literal: Unable to find mandatory grid '`；`literal: Failed to find a grid shift table for location '`；`literal:  tried: '`；`literal: Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.`。

### `eyes/src/vendor/modules/applyProjectionDefaults.js`

提供 applyProjectionDefaults、d2r；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1751838-1752420.`；`exports: applyProjectionDefaults, d2r`；`literal: stereographic south pole`；`literal: polar stereographic (variant b)`；`literal: polar stereographic`；`literal: polar stereographic (variant a)`。

### `eyes/src/vendor/modules/applyStyles-173.js`

提供 applyStyles、arrow、computeStyles、createPopper、createPopperLite、defaultModifiers、detectOverflow、eventListeners、flip、hide、offset、popperGenerator、popperOffsets、preventOverflow；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1082524-1083427.`；`exports: applyStyles, arrow, computeStyles, createPopper, createPopperLite, defaultModifiers, detectOverflow, eventListeners, flip, hide, offset, popperGenerator, popperOffsets, preventOverflow`。

### `eyes/src/vendor/modules/applyStyles-224.js`

提供 applyStyles、arrow、computeStyles、eventListeners、flip、hide、offset、popperOffsets、preventOverflow；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1110189-1110674.`；`exports: applyStyles, arrow, computeStyles, eventListeners, flip, hide, offset, popperOffsets, preventOverflow`。

### `eyes/src/vendor/modules/applyStyles-934.js`

提供 applyStyles、arrow、computeStyles、createPopper、createPopperLite、defaultModifiers、detectOverflow、eventListeners、flip、hide、offset、popperGenerator、popperOffsets、preventOverflow；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:2376719-2377622.`；`exports: applyStyles, arrow, computeStyles, createPopper, createPopperLite, defaultModifiers, detectOverflow, eventListeners, flip, hide, offset, popperGenerator, popperOffsets, preventOverflow`。

### `eyes/src/vendor/modules/applyStyles-985.js`

提供 applyStyles、arrow、computeStyles、eventListeners、flip、hide、offset、popperOffsets、preventOverflow；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:2404384-2404869.`；`exports: applyStyles, arrow, computeStyles, eventListeners, flip, hide, offset, popperOffsets, preventOverflow`。

### `eyes/src/vendor/modules/buildPROJJSON.js`

提供 buildPROJJSON；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1736923-1737265.`；`exports: buildPROJJSON`；`literal: USAGE`；`literal: 2019`；`literal: BOUNDCRS`；`literal: PROJCRS`；`literal: 2015`。

### `eyes/src/vendor/modules/clone.js`

提供 clone、retarget、retargetClip；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:971913-976079.`；`exports: clone, retarget, retargetClip`；`literal: .bones[`；`literal: ].position`；`literal: ].quaternion`。

### `eyes/src/vendor/modules/compareDatums.js`

提供 compareDatums、geocentricFromWgs84、geocentricToGeodetic、geocentricToWgs84、geodeticToGeocentric；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1787187-1789329.`；`exports: compareDatums, geocentricFromWgs84, geocentricToGeodetic, geocentricToWgs84, geodeticToGeocentric`。

### `eyes/src/vendor/modules/computeMikkTSpaceTangents.js`

提供 computeMikkTSpaceTangents、computeMorphedAttributes、deepCloneAttribute、deinterleaveAttribute、deinterleaveGeometry、estimateBytesUsed、interleaveAttributes、mergeAttributes、mergeGeometries、mergeGroups、mergeVertices、toCreasedNormals、toTrianglesDrawMode；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:958088-971912.`；`exports: computeMikkTSpaceTangents, computeMorphedAttributes, deepCloneAttribute, deinterleaveAttribute, deinterleaveGeometry, estimateBytesUsed, interleaveAttributes, mergeAttributes, mergeGeometries, mergeGroups, mergeVertices, toCreasedNormals, toTrianglesDrawMode`；`literal: THREE.BufferGeometryUtils: Initialized MikkTSpace library required.`；`literal: position`；`literal: normal`；`literal: THREE.BufferGeometryUtils: Tangents require "position", "normal", and "uv" attributes.`；`literal: tangent`。

### `eyes/src/vendor/modules/createPopper-174.js`

提供 createPopper、detectOverflow、popperGenerator；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1083428-1085664.`；`exports: createPopper, detectOverflow, popperGenerator`；`literal: bottom`；`literal: absolute`；`literal: function`；`literal: fixed`。

### `eyes/src/vendor/modules/createPopper-223.js`

提供 createPopper、defaultModifiers、detectOverflow、popperGenerator；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1109826-1110188.`；`exports: createPopper, defaultModifiers, detectOverflow, popperGenerator`。

### `eyes/src/vendor/modules/createPopper-935.js`

提供 createPopper、detectOverflow、popperGenerator；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:2377623-2379859.`；`exports: createPopper, detectOverflow, popperGenerator`；`literal: bottom`；`literal: absolute`；`literal: function`；`literal: fixed`。

### `eyes/src/vendor/modules/createPopper-984.js`

提供 createPopper、defaultModifiers、detectOverflow、popperGenerator；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:2404021-2404383.`；`exports: createPopper, defaultModifiers, detectOverflow, popperGenerator`。

### `eyes/src/vendor/modules/dependsOn.js`

提供 dependsOn、init、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1806125-1806685.`；`exports: dependsOn, init, names, default`；`literal: etmerc`；`literal: unknown utm zone`；`literal: Universal Transverse Mercator System`。

### `eyes/src/vendor/modules/detectWKTVersion.js`

提供 detectWKTVersion；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1743129-1743551.`；`exports: detectWKTVersion`；`literal: PROJCRS`；`literal: GEOGCRS`；`literal: BOUNDCRS`；`literal: VERTCRS`；`literal: LENGTHUNIT`。

### `eyes/src/vendor/modules/distanceAndSkiddingToXY-213.js`

提供 distanceAndSkiddingToXY、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1101958-1102688.`；`exports: distanceAndSkiddingToXY, default`；`literal: function`；`literal: offset`；`literal: main`；`literal: popperOffsets`。

### `eyes/src/vendor/modules/distanceAndSkiddingToXY-974.js`

提供 distanceAndSkiddingToXY、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:2396153-2396883.`；`exports: distanceAndSkiddingToXY, default`；`literal: function`；`literal: offset`；`literal: main`；`literal: popperOffsets`。

### `eyes/src/vendor/modules/eccentricity.js`

提供 eccentricity、sphere；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1755771-1756263.`；`exports: eccentricity, sphere`。

### `eyes/src/vendor/modules/extend.js`

提供 extend、getDocument、getWindow、ssrDocument、ssrWindow；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1573321-1574961.`；`exports: extend, getDocument, getWindow, ssrDocument, ssrWindow`；`literal: object`；`literal: constructor`；`literal: undefined`。

### `eyes/src/vendor/modules/forward-608.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1753196-1754627.`；`exports: forward, init, inverse, names, default`；`literal: Mercator`；`literal: Popular Visualisation Pseudo Mercator`；`literal: Mercator_1SP`；`literal: Mercator_Auxiliary_Sphere`；`literal: Mercator_Variant_A`。

### `eyes/src/vendor/modules/forward-614.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1755501-1755770.`；`exports: forward, init, inverse, names, default`；`literal: longlat`；`literal: identity`。

### `eyes/src/vendor/modules/forward-627.js`

实现 mgrs；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`mgrs`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1791172-1796431.`；`exports: forward, inverse, toPoint, default`；`literal: AJSAJS`；`literal: AFAFAF`；`literal: 00000`；`literal: MGRSPoint coverting from nothing`；`literal: MGRSPoint bad conversion from: `。

### `eyes/src/vendor/modules/forward-629.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1797945-1800339.`；`exports: forward, init, inverse, names, default`；`literal: Fast_Transverse_Mercator`；`literal: Fast Transverse Mercator`。

### `eyes/src/vendor/modules/forward-633.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1801172-1804624.`；`exports: forward, init, inverse, names, default`；`literal: Extended_Transverse_Mercator`；`literal: Extended Transverse Mercator`；`literal: etmerc`；`literal: Transverse_Mercator`；`literal: Transverse Mercator`。

### `eyes/src/vendor/modules/forward-644.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1806903-1808182.`；`exports: forward, init, inverse, names, default`；`literal: Oblique Stereographic Alternative`；`literal: Stereographic_North_Pole`；`literal: Oblique_Stereographic`；`literal: sterea`；`literal: Double_Stereographic`。

### `eyes/src/vendor/modules/forward-645.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1808183-1809187.`；`exports: forward, init, inverse, names, default`；`literal: gauss`。

### `eyes/src/vendor/modules/forward-647.js`

提供 forward、init、inverse、names、ssfn_、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1809310-1812826.`；`exports: forward, init, inverse, names, ssfn_, default`；`literal: stere`；`literal: Stereographic_South_Pole`；`literal: Polar_Stereographic_variant_A`；`literal: Polar_Stereographic_variant_B`；`literal: Polar_Stereographic`。

### `eyes/src/vendor/modules/forward-648.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1812827-1814513.`；`exports: forward, init, inverse, names, default`；`literal: somerc`。

### `eyes/src/vendor/modules/forward-649.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1814514-1818454.`；`exports: forward, init, inverse, names, default`；`literal: Hotine_Oblique_Mercator`；`literal: Hotine_Oblique_Mercator_variant_A`；`literal: Hotine_Oblique_Mercator_Azimuth_Natural_Origin`；`literal: object`；`literal: no_uoff`。

### `eyes/src/vendor/modules/forward-650.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1818455-1820513.`；`exports: forward, init, inverse, names, default`；`literal: Lambert Conformal Conic`；`literal: Lambert Tangential Conformal Conic Projection`；`literal: Lambert_Conformal_Conic`；`literal: Lambert_Conformal_Conic_1SP`；`literal: Lambert_Conformal_Conic_2SP`。

### `eyes/src/vendor/modules/forward-651.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1820514-1822924.`；`exports: forward, init, inverse, names, default`；`literal: Krovak`；`literal: Krovak Modified`；`literal: Krovak (North Orientated)`；`literal: Krovak Modified (North Orientated)`；`literal: krovak`。

### `eyes/src/vendor/modules/forward-652.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1822925-1824637.`；`exports: forward, init, inverse, names, default`；`literal: Cassini`；`literal: Cassini_Soldner`；`literal: cass`。

### `eyes/src/vendor/modules/forward-665.js`

提供 forward、init、inverse、names、phi1z、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1830382-1832529.`；`exports: forward, init, inverse, names, phi1z, default`；`literal: Albers_Conic_Equal_Area`；`literal: Albers_Equal_Area`；`literal: Albers`。

### `eyes/src/vendor/modules/forward-667.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1832667-1833822.`；`exports: forward, init, inverse, names, default`；`literal: gnom`。

### `eyes/src/vendor/modules/forward-668.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1833823-1834792.`；`exports: forward, init, inverse, names, default`。

### `eyes/src/vendor/modules/forward-670.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1835209-1836061.`；`exports: forward, init, inverse, names, default`；`literal: Equidistant Cylindrical (Plate Carre)`；`literal: Equirectangular`；`literal: Equidistant_Cylindrical`；`literal: Equidistant_Cylindrical_Spherical`。

### `eyes/src/vendor/modules/forward-671.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1836062-1838306.`；`exports: forward, init, inverse, names, default`；`literal: Polyconic`；`literal: American_Polyconic`；`literal: poly`。

### `eyes/src/vendor/modules/forward-672.js`

提供 forward、init、inverse、iterations、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1838307-1840642.`；`exports: forward, init, inverse, iterations, names, default`；`literal: New_Zealand_Map_Grid`；`literal: nzmg`。

### `eyes/src/vendor/modules/forward-673.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1840643-1841244.`；`exports: forward, init, inverse, names, default`；`literal: Miller_Cylindrical`；`literal: mill`。

### `eyes/src/vendor/modules/forward-674.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1841245-1842734.`；`exports: forward, init, inverse, names, default`；`literal: Sinusoidal`；`literal: sinu`。

### `eyes/src/vendor/modules/forward-675.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1842735-1843156.`；`exports: forward, init, inverse, names, default`；`literal: Eckert_VI`；`literal: eck6`。

### `eyes/src/vendor/modules/forward-676.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1843157-1844230.`；`exports: forward, init, inverse, names, default`；`literal: Mollweide`；`literal: moll`。

### `eyes/src/vendor/modules/forward-677.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1844231-1846197.`；`exports: forward, init, inverse, names, default`；`literal: Equidistant_Conic`；`literal: eqdc`。

### `eyes/src/vendor/modules/forward-678.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1846198-1847701.`；`exports: forward, init, inverse, names, default`；`literal: Van_der_Grinten_I`；`literal: VanDerGrinten`；`literal: Van_der_Grinten`；`literal: vandg`。

### `eyes/src/vendor/modules/forward-679.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1847702-1850648.`；`exports: forward, init, inverse, names, default`；`literal: Azimuthal_Equidistant`；`literal: aeqd`。

### `eyes/src/vendor/modules/forward-681.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1852195-1853382.`；`exports: forward, init, inverse, names, default`；`literal: ortho`。

### `eyes/src/vendor/modules/forward-682.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1853383-1857852.`；`exports: forward, init, inverse, names, default`；`literal: Quadrilateralized Spherical Cube`；`literal: Quadrilateralized_Spherical_Cube`。

### `eyes/src/vendor/modules/forward-683.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1857853-1860665.`；`exports: forward, init, inverse, names, default`；`literal: Robinson`；`literal: robin`。

### `eyes/src/vendor/modules/forward-684.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1860666-1861106.`；`exports: forward, init, inverse, names, default`；`literal: geocent`；`literal: Geocentric`；`literal: geocentric`；`literal: Geocent`。

### `eyes/src/vendor/modules/forward-685.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1861107-1863547.`；`exports: forward, init, inverse, names, default`；`literal: Invalid parameter value, must be numeric `；`literal: Invalid height`；`literal: Tilted_Perspective`；`literal: tpers`。

### `eyes/src/vendor/modules/forward-687.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1866170-1867515.`；`exports: forward, init, inverse, names, default`；`literal: eqearth`；`literal: Equal Earth`；`literal: Equal_Earth`。

### `eyes/src/vendor/modules/forward-689.js`

提供 forward、init、inverse、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1869477-1873604.`；`exports: forward, init, inverse, names, default`；`literal: oAlpha`；`literal: oLongC`；`literal: oLatC`；`literal: oLatP`；`literal: oLongP`。

### `eyes/src/vendor/modules/getBrowser.js`

提供 getBrowser；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1599110-1599513.`；`exports: getBrowser`；`literal: safari`；`literal: chrome`；`literal: android`。

### `eyes/src/vendor/modules/getDevice.js`

提供 getDevice；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1598268-1599109.`；`exports: getDevice`；`literal: Win32`；`literal: MacIntel`；`literal: 1024x1366`；`literal: 1366x1024`；`literal: 834x1194`。

### `eyes/src/vendor/modules/getNadgrids.js`

实现 nadgrid；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`nadgrid`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1780147-1783098.`；`exports: default, getNadgrids`；`literal: Failed to detect nadgrid endian-ness, defaulting to little-endian`；`literal: function`；`literal: ModelPixelScale`；`literal: null`。

### `eyes/src/vendor/modules/getSupport.js`

提供 getSupport；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1597721-1598267.`；`exports: getSupport`；`literal: scrollBehavior`；`literal: ontouchstart`；`literal: passive`；`literal: testPassiveListener`；`literal: ongesturestart`。

### `eyes/src/vendor/modules/init-686.js`

提供 init、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1863548-1866169.`；`exports: init, names, default`；`literal: ellipse`；`literal: sphere`；`literal: Geostationary Satellite View`；`literal: Geostationary_Satellite`；`literal: geos`。

### `eyes/src/vendor/modules/init-688.js`

提供 init、names、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1867516-1869476.`；`exports: init, names, default`；`literal: bonne`；`literal: Bonne (Werner lat_1=90)`。

### `eyes/src/vendor/modules/isElement-171.js`

提供 isElement、isHTMLElement、isShadowRoot；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1081863-1082309.`；`exports: isElement, isHTMLElement, isShadowRoot`；`literal: undefined`。

### `eyes/src/vendor/modules/isElement-932.js`

提供 isElement、isHTMLElement、isShadowRoot；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:2376058-2376504.`；`exports: isElement, isHTMLElement, isShadowRoot`；`literal: undefined`。

### `eyes/src/vendor/modules/mapToStyles-212.js`

提供 mapToStyles、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1099592-1101957.`；`exports: mapToStyles, default`；`literal: auto`；`literal: function`；`literal: clientHeight`；`literal: clientWidth`；`literal: static`。

### `eyes/src/vendor/modules/mapToStyles-973.js`

提供 mapToStyles、default；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:2393787-2396152.`；`exports: mapToStyles, default`；`literal: auto`；`literal: function`；`literal: clientHeight`；`literal: clientWidth`；`literal: static`。

### `eyes/src/vendor/modules/max-177.js`

提供 max、min、round；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1087027-1087188.`；`exports: max, min, round`。

### `eyes/src/vendor/modules/max-938.js`

提供 max、min、round；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:2381222-2381383.`；`exports: max, min, round`。

### `eyes/src/vendor/modules/sExpr.js`

提供 sExpr；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1745944-1747228.`；`exports: sExpr`；`literal: PARAMETER`；`literal: TOWGS84`；`literal: AXIS`；`literal: UNIT`；`literal: PRIMEM`。

### `eyes/src/vendor/modules/transformInternal.js`

实现 transform；调用方以这些语义键装配模块。可信度：observed。

可审查语义名：`transform`（仅建议，不是已验证的上游文件名）。

证据：`// Recovered from vendors.js:1783099-1784364.`；`exports: default, transformInternal`；`literal: WGS84`；`literal: longlat`；`literal: geocent`。

### `eyes/src/vendor/modules/transformPROJJSON.js`

提供 transformPROJJSON；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1747229-1751837.`；`exports: transformPROJJSON`；`literal: string`；`literal: metre`；`literal: meter`；`literal: object`；`literal: BoundCRS`。

### `eyes/src/vendor/modules/vincentyDirect.js`

提供 vincentyDirect、vincentyInverse；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1850649-1852194.`；`exports: vincentyDirect, vincentyInverse`。

### `eyes/src/vendor/modules/within-220.js`

提供 within、withinMaxClamp；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:1107550-1107773.`；`exports: within, withinMaxClamp`。

### `eyes/src/vendor/modules/within-981.js`

提供 within、withinMaxClamp；实现由这些导出命名的第三方工具/常量。可信度：observed。

证据：`// Recovered from vendors.js:2401745-2401968.`；`exports: within, withinMaxClamp`。

### `eyes/src/vendor/moment/primary/locale/af.cjs`

Moment primary 独立实例的 af 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1177787-1178971.`；`literal: Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember`；`literal: Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des`；`literal: Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag`；`literal: Son_Maa_Din_Woe_Don_Vry_Sat`；`literal: So_Ma_Di_Wo_Do_Vr_Sa`。

### `eyes/src/vendor/moment/primary/locale/ar-dz.cjs`

Moment primary 独立实例的 ar-dz 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1180984-1182706.`；`literal: أقل من ثانية`；`literal: ثانية واحدة`；`literal: ثانيتان`；`literal: ثانيتين`；`literal: %d ثوان`。

### `eyes/src/vendor/moment/primary/locale/ar-kw.cjs`

Moment primary 独立实例的 ar-kw 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1182707-1183676.`；`literal: ar-kw`；`literal: يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر`；`literal: الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت`；`literal: احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت`；`literal: ح_ن_ث_ر_خ_ج_س`。

### `eyes/src/vendor/moment/primary/locale/ar-ly.cjs`

Moment primary 独立实例的 ar-ly 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1183677-1185557.`；`literal: أقل من ثانية`；`literal: ثانية واحدة`；`literal: ثانيتان`；`literal: ثانيتين`；`literal: %d ثوان`。

### `eyes/src/vendor/moment/primary/locale/ar-ma.cjs`

Moment primary 独立实例的 ar-ma 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1185558-1186526.`；`literal: ar-ma`；`literal: يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر`；`literal: الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت`；`literal: احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت`；`literal: ح_ن_ث_ر_خ_ج_س`。

### `eyes/src/vendor/moment/primary/locale/ar-sa.cjs`

Moment primary 独立实例的 ar-sa 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1186527-1187945.`；`literal: ar-sa`；`literal: يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر`；`literal: الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت`；`literal: أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت`；`literal: ح_ن_ث_ر_خ_ج_س`。

### `eyes/src/vendor/moment/primary/locale/ar-tn.cjs`

Moment primary 独立实例的 ar-tn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1187946-1188916.`；`literal: ar-tn`；`literal: جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر`；`literal: الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت`；`literal: أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت`；`literal: ح_ن_ث_ر_خ_ج_س`。

### `eyes/src/vendor/moment/primary/locale/ar.cjs`

Moment primary 独立实例的 ar 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1178972-1180983.`；`literal: أقل من ثانية`；`literal: ثانية واحدة`；`literal: ثانيتان`；`literal: ثانيتين`；`literal: %d ثوان`。

### `eyes/src/vendor/moment/primary/locale/az.cjs`

Moment primary 独立实例的 az 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1188917-1190447.`；`literal: -inci`；`literal: -nci`；`literal: -üncü`；`literal: -ncı`；`literal: -uncu`。

### `eyes/src/vendor/moment/primary/locale/be.cjs`

Moment primary 独立实例的 be 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1190448-1192584.`；`literal: хвіліна`；`literal: хвіліну`；`literal: гадзіна`；`literal: гадзіну`；`literal: секунда_секунды_секунд`。

### `eyes/src/vendor/moment/primary/locale/bg.cjs`

Moment primary 独立实例的 bg 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1192585-1193856.`；`literal: януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември`；`literal: яну_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек`；`literal: неделя_понеделник_вторник_сряда_четвъртък_петък_събота`；`literal: нед_пон_вто_сря_чет_пет_съб`；`literal: нд_пн_вт_ср_чт_пт_сб`。

### `eyes/src/vendor/moment/primary/locale/bm.cjs`

Moment primary 独立实例的 bm 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1193857-1194921.`；`literal: Zan_Few_Mar_Awi_Mɛ_Zuw_Zul_Uti_Sɛt_ɔku_Now_Des`；`literal: Kari_Ntɛnɛn_Tarata_Araba_Alamisa_Juma_Sibiri`；`literal: Kar_Ntɛ_Tar_Ara_Ala_Jum_Sib`；`literal: Ka_Nt_Ta_Ar_Al_Ju_Si`；`literal: HH:mm`。

### `eyes/src/vendor/moment/primary/locale/bn-bd.cjs`

Moment primary 独立实例的 bn-bd 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1196437-1198045.`；`literal: bn-bd`；`literal: জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর`；`literal: জানু_ফেব্রু_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্ট_অক্টো_নভে_ডিসে`；`literal: রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার`；`literal: রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি`。

### `eyes/src/vendor/moment/primary/locale/bn.cjs`

Moment primary 独立实例的 bn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1194922-1196436.`；`literal: জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর`；`literal: জানু_ফেব্রু_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্ট_অক্টো_নভে_ডিসে`；`literal: রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার`；`literal: রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি`；`literal: রবি_সোম_মঙ্গল_বুধ_বৃহ_শুক্র_শনি`。

### `eyes/src/vendor/moment/primary/locale/bo.cjs`

Moment primary 独立实例的 bo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1198046-1199747.`；`literal: ཟླ་1_ཟླ་2_ཟླ་3_ཟླ་4_ཟླ་5_ཟླ་6_ཟླ་7_ཟླ་8_ཟླ་9_ཟླ་10_ཟླ་11_ཟླ་12`；`literal: གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་`；`literal: ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་`；`literal: ཉི_ཟླ_མིག_ལྷག_ཕུར_སངས_སྤེན`；`literal: A h:mm`。

### `eyes/src/vendor/moment/primary/locale/br.cjs`

Moment primary 独立实例的 br 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1199748-1202050.`；`literal: munutenn`；`literal: devezh`；`literal:  bloaz`；`literal:  vloaz`；`literal: Genver_Cʼhwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu`。

### `eyes/src/vendor/moment/primary/locale/bs.cjs`

Moment primary 独立实例的 bs 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1202051-1203872.`；`literal: sekunda`；`literal: sekunde`；`literal: sekundi`；`literal: jedna minuta`；`literal: jedne minute`。

### `eyes/src/vendor/moment/primary/locale/ca.cjs`

Moment primary 独立实例的 ca 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1203873-1205542.`；`literal: gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre`；`literal: gen._febr._març_abr._maig_juny_jul._ag._set._oct._nov._des.`；`literal: diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte`；`literal: dg._dl._dt._dc._dj._dv._ds.`；`literal: dg_dl_dt_dc_dj_dv_ds`。

### `eyes/src/vendor/moment/primary/locale/cs.cjs`

Moment primary 独立实例的 cs 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1205543-1208160.`；`literal: leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec`；`literal: led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro`；`literal: pár sekund`；`literal: pár sekundami`；`literal: sekundy`。

### `eyes/src/vendor/moment/primary/locale/cv.cjs`

Moment primary 独立实例的 cv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1208161-1209323.`；`literal: кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав`；`literal: кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш`；`literal: вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун`；`literal: выр_тун_ытл_юн_кӗҫ_эрн_шӑм`；`literal: вр_тн_ыт_юн_кҫ_эр_шм`。

### `eyes/src/vendor/moment/primary/locale/cy.cjs`

Moment primary 独立实例的 cy 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1209324-1210595.`；`literal: Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr`；`literal: Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag`；`literal: Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn`；`literal: Sul_Llun_Maw_Mer_Iau_Gwe_Sad`；`literal: Su_Ll_Ma_Me_Ia_Gw_Sa`。

### `eyes/src/vendor/moment/primary/locale/da.cjs`

Moment primary 独立实例的 da 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1210596-1211601.`；`literal: januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december`；`literal: jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec`；`literal: søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag`；`literal: søn_man_tir_ons_tor_fre_lør`；`literal: sø_ma_ti_on_to_fr_lø`。

### `eyes/src/vendor/moment/primary/locale/de-at.cjs`

Moment primary 独立实例的 de-at 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1212964-1214328.`；`literal: eine Minute`；`literal: einer Minute`；`literal: eine Stunde`；`literal: einer Stunde`；`literal: ein Tag`。

### `eyes/src/vendor/moment/primary/locale/de-ch.cjs`

Moment primary 独立实例的 de-ch 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1214329-1215686.`；`literal: eine Minute`；`literal: einer Minute`；`literal: eine Stunde`；`literal: einer Stunde`；`literal: ein Tag`。

### `eyes/src/vendor/moment/primary/locale/de.cjs`

Moment primary 独立实例的 de 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1211602-1212963.`；`literal: eine Minute`；`literal: einer Minute`；`literal: eine Stunde`；`literal: einer Stunde`；`literal: ein Tag`。

### `eyes/src/vendor/moment/primary/locale/dv.cjs`

Moment primary 独立实例的 dv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1215687-1216800.`；`literal: ޖެނުއަރީ`；`literal: ފެބްރުއަރީ`；`literal: މާރިޗު`；`literal: އޭޕްރީލު`；`literal: ޖޫން`。

### `eyes/src/vendor/moment/primary/locale/el.cjs`

Moment primary 独立实例的 el 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1216801-1218673.`；`literal: undefined`；`literal: [object Function]`；`literal: string`；`literal: MMMM`；`literal: Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ`。

### `eyes/src/vendor/moment/primary/locale/en-au.cjs`

Moment primary 独立实例的 en-au 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1218674-1219777.`；`literal: en-au`；`literal: January_February_March_April_May_June_July_August_September_October_November_December`；`literal: Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec`；`literal: Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`；`literal: Sun_Mon_Tue_Wed_Thu_Fri_Sat`。

### `eyes/src/vendor/moment/primary/locale/en-ca.cjs`

Moment primary 独立实例的 en-ca 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1219778-1220865.`；`literal: en-ca`；`literal: January_February_March_April_May_June_July_August_September_October_November_December`；`literal: Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec`；`literal: Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`；`literal: Sun_Mon_Tue_Wed_Thu_Fri_Sat`。

### `eyes/src/vendor/moment/primary/locale/en-gb.cjs`

Moment primary 独立实例的 en-gb 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1220866-1221965.`；`literal: en-gb`；`literal: January_February_March_April_May_June_July_August_September_October_November_December`；`literal: Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec`；`literal: Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`；`literal: Sun_Mon_Tue_Wed_Thu_Fri_Sat`。

### `eyes/src/vendor/moment/primary/locale/en-ie.cjs`

Moment primary 独立实例的 en-ie 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1221966-1223064.`；`literal: en-ie`；`literal: January_February_March_April_May_June_July_August_September_October_November_December`；`literal: Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec`；`literal: Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`；`literal: Sun_Mon_Tue_Wed_Thu_Fri_Sat`。

### `eyes/src/vendor/moment/primary/locale/en-il.cjs`

Moment primary 独立实例的 en-il 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1223065-1224145.`；`literal: en-il`；`literal: January_February_March_April_May_June_July_August_September_October_November_December`；`literal: Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec`；`literal: Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`；`literal: Sun_Mon_Tue_Wed_Thu_Fri_Sat`。

### `eyes/src/vendor/moment/primary/locale/en-in.cjs`

Moment primary 独立实例的 en-in 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1224146-1225249.`；`literal: en-in`；`literal: January_February_March_April_May_June_July_August_September_October_November_December`；`literal: Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec`；`literal: Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`；`literal: Sun_Mon_Tue_Wed_Thu_Fri_Sat`。

### `eyes/src/vendor/moment/primary/locale/en-nz.cjs`

Moment primary 独立实例的 en-nz 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1225250-1226353.`；`literal: en-nz`；`literal: January_February_March_April_May_June_July_August_September_October_November_December`；`literal: Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec`；`literal: Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`；`literal: Sun_Mon_Tue_Wed_Thu_Fri_Sat`。

### `eyes/src/vendor/moment/primary/locale/en-sg.cjs`

Moment primary 独立实例的 en-sg 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1226354-1227453.`；`literal: en-sg`；`literal: January_February_March_April_May_June_July_August_September_October_November_December`；`literal: Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec`；`literal: Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`；`literal: Sun_Mon_Tue_Wed_Thu_Fri_Sat`。

### `eyes/src/vendor/moment/primary/locale/eo.cjs`

Moment primary 独立实例的 eo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1227454-1228725.`；`literal: januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro`；`literal: jan_feb_mart_apr_maj_jun_jul_aŭg_sept_okt_nov_dec`；`literal: dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato`；`literal: dim_lun_mard_merk_ĵaŭ_ven_sab`；`literal: di_lu_ma_me_ĵa_ve_sa`。

### `eyes/src/vendor/moment/primary/locale/es-do.cjs`

Moment primary 独立实例的 es-do 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1230820-1232895.`；`literal: ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.`；`literal: ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic`；`literal: es-do`；`literal: enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre`；`literal: domingo_lunes_martes_miércoles_jueves_viernes_sábado`。

### `eyes/src/vendor/moment/primary/locale/es-mx.cjs`

Moment primary 独立实例的 es-mx 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1232896-1234992.`；`literal: ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.`；`literal: ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic`；`literal: es-mx`；`literal: enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre`；`literal: domingo_lunes_martes_miércoles_jueves_viernes_sábado`。

### `eyes/src/vendor/moment/primary/locale/es-us.cjs`

Moment primary 独立实例的 es-us 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1234993-1237068.`；`literal: ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.`；`literal: ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic`；`literal: es-us`；`literal: enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre`；`literal: domingo_lunes_martes_miércoles_jueves_viernes_sábado`。

### `eyes/src/vendor/moment/primary/locale/es.cjs`

Moment primary 独立实例的 es 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1228726-1230819.`；`literal: ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.`；`literal: ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic`；`literal: enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre`；`literal: domingo_lunes_martes_miércoles_jueves_viernes_sábado`；`literal: dom._lun._mar._mié._jue._vie._sáb.`。

### `eyes/src/vendor/moment/primary/locale/et.cjs`

Moment primary 独立实例的 et 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1237069-1238394.`；`literal: mõne sekundi`；`literal: mõni sekund`；`literal: paar sekundit`；`literal: sekundi`；`literal: sekundit`。

### `eyes/src/vendor/moment/primary/locale/eu.cjs`

Moment primary 独立实例的 eu 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1238395-1239625.`；`literal: urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua`；`literal: urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.`；`literal: igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata`；`literal: ig._al._ar._az._og._ol._lr.`；`literal: ig_al_ar_az_og_ol_lr`。

### `eyes/src/vendor/moment/primary/locale/fa.cjs`

Moment primary 独立实例的 fa 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1239626-1241129.`；`literal: ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر`；`literal: یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه`；`literal: ی_د_س_چ_پ_ج_ش`；`literal: HH:mm`；`literal: HH:mm:ss`。

### `eyes/src/vendor/moment/primary/locale/fi.cjs`

Moment primary 独立实例的 fi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1241130-1242946.`；`literal: nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän`；`literal: nolla`；`literal: yhden`；`literal: kahden`；`literal: kolmen`。

### `eyes/src/vendor/moment/primary/locale/fil.cjs`

Moment primary 独立实例的 fil 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1242947-1244010.`；`literal: Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre`；`literal: Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis`；`literal: Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado`；`literal: Lin_Lun_Mar_Miy_Huw_Biy_Sab`；`literal: Li_Lu_Ma_Mi_Hu_Bi_Sab`。

### `eyes/src/vendor/moment/primary/locale/fo.cjs`

Moment primary 独立实例的 fo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1244011-1245040.`；`literal: januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember`；`literal: jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des`；`literal: sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur`；`literal: sun_mán_týs_mik_hós_frí_ley`；`literal: su_má_tý_mi_hó_fr_le`。

### `eyes/src/vendor/moment/primary/locale/fr-ca.cjs`

Moment primary 独立实例的 fr-ca 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1246873-1248061.`；`literal: fr-ca`；`literal: janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre`；`literal: janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.`；`literal: dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi`；`literal: dim._lun._mar._mer._jeu._ven._sam.`。

### `eyes/src/vendor/moment/primary/locale/fr-ch.cjs`

Moment primary 独立实例的 fr-ch 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1248062-1249269.`；`literal: fr-ch`；`literal: janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre`；`literal: janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.`；`literal: dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi`；`literal: dim._lun._mar._mer._jeu._ven._sam.`。

### `eyes/src/vendor/moment/primary/locale/fr.cjs`

Moment primary 独立实例的 fr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1245041-1246872.`；`literal: janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre`；`literal: janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.`；`literal: dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi`；`literal: dim._lun._mar._mer._jeu._ven._sam.`；`literal: di_lu_ma_me_je_ve_sa`。

### `eyes/src/vendor/moment/primary/locale/fy.cjs`

Moment primary 独立实例的 fy 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1249270-1250531.`；`literal: jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.`；`literal: jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des`；`literal: jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber`；`literal: snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon`；`literal: si._mo._ti._wo._to._fr._so.`。

### `eyes/src/vendor/moment/primary/locale/ga.cjs`

Moment primary 独立实例的 ga 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1250532-1251726.`；`literal: Eanáir`；`literal: Feabhra`；`literal: Márta`；`literal: Aibreán`；`literal: Bealtaine`。

### `eyes/src/vendor/moment/primary/locale/gd.cjs`

Moment primary 独立实例的 gd 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1251727-1252961.`；`literal: Am Faoilleach`；`literal: An Gearran`；`literal: Am Màrt`；`literal: An Giblean`；`literal: An Cèitean`。

### `eyes/src/vendor/moment/primary/locale/gl.cjs`

Moment primary 独立实例的 gl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1252962-1254313.`；`literal: xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro`；`literal: xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.`；`literal: domingo_luns_martes_mércores_xoves_venres_sábado`；`literal: dom._lun._mar._mér._xov._ven._sáb.`；`literal: do_lu_ma_mé_xo_ve_sá`。

### `eyes/src/vendor/moment/primary/locale/gom-deva.cjs`

Moment primary 独立实例的 gom-deva 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1254314-1256267.`；`literal: थोडया सॅकंडांनी`；`literal: थोडे सॅकंड`；`literal:  सॅकंडांनी`；`literal:  सॅकंड`；`literal: एका मिणटान`。

### `eyes/src/vendor/moment/primary/locale/gom-latn.cjs`

Moment primary 独立实例的 gom-latn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1256268-1258191.`；`literal: thoddea sekondamni`；`literal: thodde sekond`；`literal:  sekondamni`；`literal:  sekond`；`literal: eka mintan`。

### `eyes/src/vendor/moment/primary/locale/gu.cjs`

Moment primary 独立实例的 gu 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1258192-1259742.`；`literal: જાન્યુઆરી_ફેબ્રુઆરી_માર્ચ_એપ્રિલ_મે_જૂન_જુલાઈ_ઑગસ્ટ_સપ્ટેમ્બર_ઑક્ટ્બર_નવેમ્બર_ડિસેમ્બર`；`literal: જાન્યુ._ફેબ્રુ._માર્ચ_એપ્રિ._મે_જૂન_જુલા._ઑગ._સપ્ટે._ઑક્ટ્._નવે._ડિસે.`；`literal: રવિવાર_સોમવાર_મંગળવાર_બુધ્વાર_ગુરુવાર_શુક્રવાર_શનિવાર`；`literal: રવિ_સોમ_મંગળ_બુધ્_ગુરુ_શુક્ર_શનિ`；`literal: ર_સો_મં_બુ_ગુ_શુ_શ`。

### `eyes/src/vendor/moment/primary/locale/he.cjs`

Moment primary 独立实例的 he 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1259743-1261135.`；`literal: ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר`；`literal: ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳`；`literal: ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת`；`literal: א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳`；`literal: א_ב_ג_ד_ה_ו_ש`。

### `eyes/src/vendor/moment/primary/locale/hi.cjs`

Moment primary 独立实例的 hi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1261136-1263640.`；`literal: जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर`；`literal: जनवरी_फरवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितंबर_अक्टूबर_नवंबर_दिसंबर`；`literal: जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.`；`literal: रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार`；`literal: रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि`。

### `eyes/src/vendor/moment/primary/locale/hr.cjs`

Moment primary 独立实例的 hr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1263641-1265645.`；`literal: sekunda`；`literal: sekunde`；`literal: sekundi`；`literal: jedna minuta`；`literal: jedne minute`。

### `eyes/src/vendor/moment/primary/locale/hu.cjs`

Moment primary 独立实例的 hu 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1265646-1267493.`；`literal: vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton`；`literal: néhány másodperc`；`literal: néhány másodperce`；`literal:  másodperc`；`literal:  másodperce`。

### `eyes/src/vendor/moment/primary/locale/hy-am.cjs`

Moment primary 独立实例的 hy-am 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1267494-1268985.`；`literal: hy-am`；`literal: հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր`；`literal: հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ`；`literal: կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ`；`literal: կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ`。

### `eyes/src/vendor/moment/primary/locale/id.cjs`

Moment primary 独立实例的 id 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1268986-1270189.`；`literal: Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember`；`literal: Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des`；`literal: Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu`；`literal: Min_Sen_Sel_Rab_Kam_Jum_Sab`；`literal: Mg_Sn_Sl_Rb_Km_Jm_Sb`。

### `eyes/src/vendor/moment/primary/locale/is.cjs`

Moment primary 独立实例的 is 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1270190-1271888.`；`literal: nokkrar sekúndur`；`literal: nokkrum sekúndum`；`literal: sekúndur`；`literal: sekúndum`；`literal: sekúnda`。

### `eyes/src/vendor/moment/primary/locale/it-ch.cjs`

Moment primary 独立实例的 it-ch 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1273373-1274500.`；`literal: it-ch`；`literal: gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre`；`literal: gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic`；`literal: domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato`；`literal: dom_lun_mar_mer_gio_ven_sab`。

### `eyes/src/vendor/moment/primary/locale/it.cjs`

Moment primary 独立实例的 it 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1271889-1273372.`；`literal: gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre`；`literal: gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic`；`literal: domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato`；`literal: dom_lun_mar_mer_gio_ven_sab`；`literal: do_lu_ma_me_gi_ve_sa`。

### `eyes/src/vendor/moment/primary/locale/ja.cjs`

Moment primary 独立实例的 ja 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1274501-1276304.`；`literal: 2019-05-01`；`literal: 1989-01-08`；`literal: 2019-04-30`；`literal: 1926-12-25`；`literal: 1989-01-07`。

### `eyes/src/vendor/moment/primary/locale/jv.cjs`

Moment primary 独立实例的 jv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1276305-1277573.`；`literal: Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember`；`literal: Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des`；`literal: Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu`；`literal: Min_Sen_Sel_Reb_Kem_Jem_Sep`；`literal: Mg_Sn_Sl_Rb_Km_Jm_Sp`。

### `eyes/src/vendor/moment/primary/locale/ka.cjs`

Moment primary 独立实例的 ka 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1277574-1279015.`；`literal: იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი`；`literal: იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ`；`literal: კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი`；`literal: კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს`；`literal: კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ`。

### `eyes/src/vendor/moment/primary/locale/kk.cjs`

Moment primary 独立实例的 kk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1279016-1280276.`；`literal: қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан`；`literal: қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел`；`literal: жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі`；`literal: жек_дүй_сей_сәр_бей_жұм_сен`；`literal: жк_дй_сй_ср_бй_жм_сн`。

### `eyes/src/vendor/moment/primary/locale/km.cjs`

Moment primary 独立实例的 km 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1280277-1281712.`；`literal: មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ`；`literal: អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍`；`literal: អា_ច_អ_ព_ព្រ_សុ_ស`；`literal: HH:mm`；`literal: HH:mm:ss`。

### `eyes/src/vendor/moment/primary/locale/kn.cjs`

Moment primary 独立实例的 kn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1281713-1283383.`；`literal: ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್`；`literal: ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂ_ಅಕ್ಟೋ_ನವೆಂ_ಡಿಸೆಂ`；`literal: ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ`；`literal: ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ`；`literal: ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ`。

### `eyes/src/vendor/moment/primary/locale/ko.cjs`

Moment primary 独立实例的 ko 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1283384-1284486.`；`literal: 1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월`；`literal: 일요일_월요일_화요일_수요일_목요일_금요일_토요일`；`literal: 일_월_화_수_목_금_토`；`literal: A h:mm`；`literal: A h:mm:ss`。

### `eyes/src/vendor/moment/primary/locale/ku.cjs`

Moment primary 独立实例的 ku 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1284487-1285967.`；`literal: کانونی دووەم`；`literal: شوبات`；`literal: ئازار`；`literal: نیسان`；`literal: ئایار`。

### `eyes/src/vendor/moment/primary/locale/ky.cjs`

Moment primary 独立实例的 ky 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1285968-1287236.`；`literal: январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь`；`literal: янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек`；`literal: Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби`；`literal: Жек_Дүй_Шей_Шар_Бей_Жум_Ише`；`literal: Жк_Дй_Шй_Шр_Бй_Жм_Иш`。

### `eyes/src/vendor/moment/primary/locale/lb.cjs`

Moment primary 独立实例的 lb 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1287237-1288895.`；`literal: eng Minutt`；`literal: enger Minutt`；`literal: eng Stonn`；`literal: enger Stonn`；`literal: een Dag`。

### `eyes/src/vendor/moment/primary/locale/lo.cjs`

Moment primary 独立实例的 lo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1288896-1290061.`；`literal: ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ`；`literal: ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ`；`literal: ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ`；`literal: ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ`；`literal: HH:mm`。

### `eyes/src/vendor/moment/primary/locale/lt.cjs`

Moment primary 独立实例的 lt 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1290062-1292177.`；`literal: sekundė_sekundžių_sekundes`；`literal: minutė_minutės_minutę`；`literal: minutės_minučių_minutes`；`literal: valanda_valandos_valandą`；`literal: valandos_valandų_valandas`。

### `eyes/src/vendor/moment/primary/locale/lv.cjs`

Moment primary 独立实例的 lv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1292178-1293881.`；`literal: sekundes_sekundēm_sekunde_sekundes`；`literal: minūtes_minūtēm_minūte_minūtes`；`literal: stundas_stundām_stunda_stundas`；`literal: dienas_dienām_diena_dienas`；`literal: mēneša_mēnešiem_mēnesis_mēneši`。

### `eyes/src/vendor/moment/primary/locale/me.cjs`

Moment primary 独立实例的 me 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1293882-1295768.`；`literal: sekund`；`literal: sekunda`；`literal: sekundi`；`literal: jedan minut`；`literal: jednog minuta`。

### `eyes/src/vendor/moment/primary/locale/mi.cjs`

Moment primary 独立实例的 mi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1295769-1297076.`；`literal: Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki`；`literal: Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei`；`literal: Ta_Ma_Tū_We_Tāi_Pa_Hā`；`literal: HH:mm`；`literal: HH:mm:ss`。

### `eyes/src/vendor/moment/primary/locale/mk.cjs`

Moment primary 独立实例的 mk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1297077-1298361.`；`literal: јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември`；`literal: јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек`；`literal: недела_понеделник_вторник_среда_четврток_петок_сабота`；`literal: нед_пон_вто_сре_чет_пет_саб`；`literal: нe_пo_вт_ср_че_пе_сa`。

### `eyes/src/vendor/moment/primary/locale/ml.cjs`

Moment primary 独立实例的 ml 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1298362-1299670.`；`literal: ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ`；`literal: ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.`；`literal: ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച`；`literal: ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി`；`literal: ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ`。

### `eyes/src/vendor/moment/primary/locale/mn.cjs`

Moment primary 独立实例的 mn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1299671-1301278.`；`literal: хэдхэн секунд`；`literal: хэдхэн секундын`；`literal:  секунд`；`literal:  секундын`；`literal:  минут`。

### `eyes/src/vendor/moment/primary/locale/mr.cjs`

Moment primary 独立实例的 mr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1301279-1303519.`；`literal: काही सेकंद`；`literal: %d सेकंद`；`literal: एक मिनिट`；`literal: %d मिनिटे`；`literal: एक तास`。

### `eyes/src/vendor/moment/primary/locale/ms-my.cjs`

Moment primary 独立实例的 ms-my 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1304737-1305956.`；`literal: ms-my`；`literal: Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember`；`literal: Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis`；`literal: Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu`；`literal: Ahd_Isn_Sel_Rab_Kha_Jum_Sab`。

### `eyes/src/vendor/moment/primary/locale/ms.cjs`

Moment primary 独立实例的 ms 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1303520-1304736.`；`literal: Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember`；`literal: Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis`；`literal: Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu`；`literal: Ahd_Isn_Sel_Rab_Kha_Jum_Sab`；`literal: Ah_Is_Sl_Rb_Km_Jm_Sb`。

### `eyes/src/vendor/moment/primary/locale/mt.cjs`

Moment primary 独立实例的 mt 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1305957-1306959.`；`literal: Jannar_Frar_Marzu_April_Mejju_Ġunju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Diċembru`；`literal: Jan_Fra_Mar_Apr_Mej_Ġun_Lul_Aww_Set_Ott_Nov_Diċ`；`literal: Il-Ħadd_It-Tnejn_It-Tlieta_L-Erbgħa_Il-Ħamis_Il-Ġimgħa_Is-Sibt`；`literal: Ħad_Tne_Tli_Erb_Ħam_Ġim_Sib`；`literal: Ħa_Tn_Tl_Er_Ħa_Ġi_Si`。

### `eyes/src/vendor/moment/primary/locale/my.cjs`

Moment primary 独立实例的 my 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1306960-1308235.`；`literal: ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ`；`literal: ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ`；`literal: တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ`；`literal: နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ`；`literal: HH:mm`。

### `eyes/src/vendor/moment/primary/locale/nb.cjs`

Moment primary 独立实例的 nb 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1308236-1309326.`；`literal: januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember`；`literal: jan._feb._mars_apr._mai_juni_juli_aug._sep._okt._nov._des.`；`literal: søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag`；`literal: sø._ma._ti._on._to._fr._lø.`；`literal: sø_ma_ti_on_to_fr_lø`。

### `eyes/src/vendor/moment/primary/locale/ne.cjs`

Moment primary 独立实例的 ne 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1309327-1310929.`；`literal: जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर`；`literal: जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.`；`literal: आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार`；`literal: आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.`；`literal: आ._सो._मं._बु._बि._शु._श.`。

### `eyes/src/vendor/moment/primary/locale/nl-be.cjs`

Moment primary 独立实例的 nl-be 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1312794-1314633.`；`literal: jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.`；`literal: jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec`；`literal: nl-be`；`literal: januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december`；`literal: zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag`。

### `eyes/src/vendor/moment/primary/locale/nl.cjs`

Moment primary 独立实例的 nl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1310930-1312793.`；`literal: jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.`；`literal: jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec`；`literal: januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december`；`literal: zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag`；`literal: zo._ma._di._wo._do._vr._za.`。

### `eyes/src/vendor/moment/primary/locale/nn.cjs`

Moment primary 独立实例的 nn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1314634-1315742.`；`literal: januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember`；`literal: jan._feb._mars_apr._mai_juni_juli_aug._sep._okt._nov._des.`；`literal: sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag`；`literal: su._må._ty._on._to._fr._lau.`；`literal: su_må_ty_on_to_fr_la`。

### `eyes/src/vendor/moment/primary/locale/oc-lnc.cjs`

Moment primary 独立实例的 oc-lnc 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1315743-1317148.`；`literal: oc-lnc`；`literal: genièr_febrièr_març_abril_mai_junh_julhet_agost_setembre_octòbre_novembre_decembre`；`literal: gen._febr._març_abr._mai_junh_julh._ago._set._oct._nov._dec.`；`literal: dimenge_diluns_dimars_dimècres_dijòus_divendres_dissabte`；`literal: dg._dl._dm._dc._dj._dv._ds.`。

### `eyes/src/vendor/moment/primary/locale/pa-in.cjs`

Moment primary 独立实例的 pa-in 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1317149-1318667.`；`literal: pa-in`；`literal: ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ`；`literal: ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ`；`literal: ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ`；`literal: A h:mm ਵਜੇ`。

### `eyes/src/vendor/moment/primary/locale/pl.cjs`

Moment primary 独立实例的 pl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1318668-1320721.`；`literal: styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień`；`literal: stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia`；`literal: sekundy`；`literal: sekund`；`literal: minuta`。

### `eyes/src/vendor/moment/primary/locale/pt-br.cjs`

Moment primary 独立实例的 pt-br 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1321891-1323057.`；`literal: pt-br`；`literal: janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro`；`literal: jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez`；`literal: domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado`；`literal: dom_seg_ter_qua_qui_sex_sáb`。

### `eyes/src/vendor/moment/primary/locale/pt.cjs`

Moment primary 独立实例的 pt 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1320722-1321890.`；`literal: janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro`；`literal: jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez`；`literal: Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado`；`literal: Dom_Seg_Ter_Qua_Qui_Sex_Sáb`；`literal: Do_2ª_3ª_4ª_5ª_6ª_Sá`。

### `eyes/src/vendor/moment/primary/locale/ro.cjs`

Moment primary 独立实例的 ro 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1323058-1324158.`；`literal:  de `；`literal: secunde`；`literal: minute`；`literal: zile`；`literal: săptămâni`。

### `eyes/src/vendor/moment/primary/locale/ru.cjs`

Moment primary 独立实例的 ru 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1324159-1327524.`；`literal: минута`；`literal: минуту`；`literal: секунда_секунды_секунд`；`literal: секунду_секунды_секунд`；`literal: минута_минуты_минут`。

### `eyes/src/vendor/moment/primary/locale/sd.cjs`

Moment primary 独立实例的 sd 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1327525-1328528.`；`literal: جنوري`；`literal: فيبروري`；`literal: مارچ`；`literal: اپريل`；`literal: جولاءِ`。

### `eyes/src/vendor/moment/primary/locale/se.cjs`

Moment primary 独立实例的 se 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1328529-1329674.`；`literal: ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov`；`literal: sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat`；`literal: sotn_vuos_maŋ_gask_duor_bear_láv`；`literal: s_v_m_g_d_b_L`；`literal: HH:mm`。

### `eyes/src/vendor/moment/primary/locale/si.cjs`

Moment primary 独立实例的 si 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1329675-1330874.`；`literal: ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්`；`literal: ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ`；`literal: ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා`；`literal: ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන`；`literal: ඉ_ස_අ_බ_බ්‍ර_සි_සෙ`。

### `eyes/src/vendor/moment/primary/locale/sk.cjs`

Moment primary 独立实例的 sk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1330875-1332811.`；`literal: január_február_marec_apríl_máj_jún_júl_august_september_október_november_december`；`literal: jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec`；`literal: pár sekúnd`；`literal: pár sekundami`；`literal: sekundy`。

### `eyes/src/vendor/moment/primary/locale/sl.cjs`

Moment primary 独立实例的 sl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1332812-1335120.`；`literal: nekaj sekund`；`literal: nekaj sekundami`；`literal: sekundo`；`literal: sekundi`；`literal: sekundah`。

### `eyes/src/vendor/moment/primary/locale/sq.cjs`

Moment primary 独立实例的 sq 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1335121-1336236.`；`literal: Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor`；`literal: Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj`；`literal: E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë`；`literal: Die_Hën_Mar_Mër_Enj_Pre_Sht`；`literal: D_H_Ma_Më_E_P_Sh`。

### `eyes/src/vendor/moment/primary/locale/sr-cyrl.cjs`

Moment primary 独立实例的 sr-cyrl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1338110-1339982.`；`literal: секунда`；`literal: секунде`；`literal: секунди`；`literal: један минут`；`literal: једне минуте`。

### `eyes/src/vendor/moment/primary/locale/sr.cjs`

Moment primary 独立实例的 sr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1336237-1338109.`；`literal: sekunda`；`literal: sekunde`；`literal: sekundi`；`literal: jedan minut`；`literal: jedne minute`。

### `eyes/src/vendor/moment/primary/locale/ss.cjs`

Moment primary 独立实例的 ss 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1339983-1341355.`；`literal: Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo`；`literal: Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo`；`literal: Lis_Umb_Lsb_Les_Lsi_Lsh_Umg`；`literal: Li_Us_Lb_Lt_Ls_Lh_Ug`；`literal: h:mm A`。

### `eyes/src/vendor/moment/primary/locale/sv.cjs`

Moment primary 独立实例的 sv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1341356-1342478.`；`literal: januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december`；`literal: jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec`；`literal: söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag`；`literal: sön_mån_tis_ons_tor_fre_lör`；`literal: sö_må_ti_on_to_fr_lö`。

### `eyes/src/vendor/moment/primary/locale/sw.cjs`

Moment primary 独立实例的 sw 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1342479-1343493.`；`literal: Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba`；`literal: Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des`；`literal: Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi`；`literal: Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos`；`literal: J2_J3_J4_J5_Al_Ij_J1`。

### `eyes/src/vendor/moment/primary/locale/ta.cjs`

Moment primary 独立实例的 ta 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1343494-1345248.`；`literal: ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்`；`literal: ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை`；`literal: ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி`；`literal: ஞா_தி_செ_பு_வி_வெ_ச`；`literal: HH:mm`。

### `eyes/src/vendor/moment/primary/locale/te.cjs`

Moment primary 独立实例的 te 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1345249-1346571.`；`literal: జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జులై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్`；`literal: జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జులై_ఆగ._సెప్._అక్టో._నవ._డిసె.`；`literal: ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం`；`literal: ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని`；`literal: ఆ_సో_మం_బు_గు_శు_శ`。

### `eyes/src/vendor/moment/primary/locale/tet.cjs`

Moment primary 独立实例的 tet 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1346572-1347687.`；`literal: Janeiru_Fevereiru_Marsu_Abril_Maiu_Juñu_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru`；`literal: Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez`；`literal: Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu`；`literal: Dom_Seg_Ters_Kua_Kint_Sest_Sab`；`literal: Do_Seg_Te_Ku_Ki_Ses_Sa`。

### `eyes/src/vendor/moment/primary/locale/tg.cjs`

Moment primary 独立实例的 tg 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1347688-1349315.`；`literal: январи_феврали_марти_апрели_майи_июни_июли_августи_сентябри_октябри_ноябри_декабри`；`literal: январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр`；`literal: янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек`；`literal: якшанбе_душанбе_сешанбе_чоршанбе_панҷшанбе_ҷумъа_шанбе`；`literal: яшб_дшб_сшб_чшб_пшб_ҷум_шнб`。

### `eyes/src/vendor/moment/primary/locale/th.cjs`

Moment primary 独立实例的 th 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1349316-1350522.`；`literal: มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม`；`literal: ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.`；`literal: อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์`；`literal: อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์`；`literal: อา._จ._อ._พ._พฤ._ศ._ส.`。

### `eyes/src/vendor/moment/primary/locale/tk.cjs`

Moment primary 独立实例的 tk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1350523-1351822.`；`literal: 'inji`；`literal: 'nji`；`literal: 'ünji`；`literal: 'njy`；`literal: 'unjy`。

### `eyes/src/vendor/moment/primary/locale/tl-ph.cjs`

Moment primary 独立实例的 tl-ph 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1351823-1352888.`；`literal: tl-ph`；`literal: Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre`；`literal: Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis`；`literal: Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado`；`literal: Lin_Lun_Mar_Miy_Huw_Biy_Sab`。

### `eyes/src/vendor/moment/primary/locale/tlh.cjs`

Moment primary 独立实例的 tlh 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1352889-1354818.`；`literal: pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut`；`literal:  pIq`；`literal:  ret`；`literal:  lup`；`literal:  tup`。

### `eyes/src/vendor/moment/primary/locale/tr.cjs`

Moment primary 独立实例的 tr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1354819-1356291.`；`literal: 'inci`；`literal: 'nci`；`literal: 'üncü`；`literal: 'ncı`；`literal: 'uncu`。

### `eyes/src/vendor/moment/primary/locale/tzl.cjs`

Moment primary 独立实例的 tzl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1356292-1357735.`；`literal: viensas secunds`；`literal: 'iensas secunds`；`literal:  secunds`；`literal: 'n míut`；`literal: 'iens míut`。

### `eyes/src/vendor/moment/primary/locale/tzm-latn.cjs`

Moment primary 独立实例的 tzm-latn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1358717-1359717.`；`literal: tzm-latn`；`literal: innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir`；`literal: asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas`；`literal: HH:mm`；`literal: HH:mm:ss`。

### `eyes/src/vendor/moment/primary/locale/tzm.cjs`

Moment primary 独立实例的 tzm 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1357736-1358716.`；`literal: ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ`；`literal: ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ`；`literal: HH:mm`；`literal: HH:mm:ss`；`literal: DD/MM/YYYY`。

### `eyes/src/vendor/moment/primary/locale/ug-cn.cjs`

Moment primary 独立实例的 ug-cn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1359718-1361389.`；`literal: ug-cn`；`literal: يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر`；`literal: يەكشەنبە_دۈشەنبە_سەيشەنبە_چارشەنبە_پەيشەنبە_جۈمە_شەنبە`；`literal: يە_دۈ_سە_چا_پە_جۈ_شە`；`literal: HH:mm`。

### `eyes/src/vendor/moment/primary/locale/uk.cjs`

Moment primary 独立实例的 uk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1361390-1363795.`；`literal: хвилина`；`literal: хвилину`；`literal: година`；`literal: годину`；`literal: секунда_секунди_секунд`。

### `eyes/src/vendor/moment/primary/locale/ur.cjs`

Moment primary 独立实例的 ur 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1363796-1364800.`；`literal: جنوری`；`literal: فروری`；`literal: مارچ`；`literal: اپریل`；`literal: جولائی`。

### `eyes/src/vendor/moment/primary/locale/uz-latn.cjs`

Moment primary 独立实例的 uz-latn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1365772-1366772.`；`literal: uz-latn`；`literal: Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr`；`literal: Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek`；`literal: Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba`；`literal: Yak_Dush_Sesh_Chor_Pay_Jum_Shan`。

### `eyes/src/vendor/moment/primary/locale/uz.cjs`

Moment primary 独立实例的 uz 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1364801-1365771.`；`literal: январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр`；`literal: янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек`；`literal: Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба`；`literal: Якш_Душ_Сеш_Чор_Пай_Жум_Шан`；`literal: Як_Ду_Се_Чо_Па_Жу_Ша`。

### `eyes/src/vendor/moment/primary/locale/vi.cjs`

Moment primary 独立实例的 vi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1366773-1368128.`；`literal: tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12`；`literal: Thg 01_Thg 02_Thg 03_Thg 04_Thg 05_Thg 06_Thg 07_Thg 08_Thg 09_Thg 10_Thg 11_Thg 12`；`literal: chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy`；`literal: CN_T2_T3_T4_T5_T6_T7`；`literal: HH:mm`。

### `eyes/src/vendor/moment/primary/locale/x-pseudo.cjs`

Moment primary 独立实例的 x-pseudo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1368129-1369348.`；`literal: x-pseudo`；`literal: J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc`；`literal: S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý`；`literal: S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát`；`literal: S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá`。

### `eyes/src/vendor/moment/primary/locale/yo.cjs`

Moment primary 独立实例的 yo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1369349-1370414.`；`literal: Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀`；`literal: Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀`；`literal: Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta`；`literal: Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá`；`literal: Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb`。

### `eyes/src/vendor/moment/primary/locale/zh-cn.cjs`

Moment primary 独立实例的 zh-cn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1370415-1371803.`；`literal: zh-cn`；`literal: 一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月`；`literal: 1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月`；`literal: 星期日_星期一_星期二_星期三_星期四_星期五_星期六`；`literal: 周日_周一_周二_周三_周四_周五_周六`。

### `eyes/src/vendor/moment/primary/locale/zh-hk.cjs`

Moment primary 独立实例的 zh-hk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1371804-1373067.`；`literal: zh-hk`；`literal: 一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月`；`literal: 1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月`；`literal: 星期日_星期一_星期二_星期三_星期四_星期五_星期六`；`literal: 週日_週一_週二_週三_週四_週五_週六`。

### `eyes/src/vendor/moment/primary/locale/zh-mo.cjs`

Moment primary 独立实例的 zh-mo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1373068-1374334.`；`literal: zh-mo`；`literal: 一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月`；`literal: 1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月`；`literal: 星期日_星期一_星期二_星期三_星期四_星期五_星期六`；`literal: 週日_週一_週二_週三_週四_週五_週六`。

### `eyes/src/vendor/moment/primary/locale/zh-tw.cjs`

Moment primary 独立实例的 zh-tw 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1374335-1375601.`；`literal: zh-tw`；`literal: 一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月`；`literal: 1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月`；`literal: 星期日_星期一_星期二_星期三_星期四_星期五_星期六`；`literal: 週日_週一_週二_週三_週四_週五_週六`。

### `eyes/src/vendor/moment/secondary/locale/af.cjs`

Moment secondary 独立实例的 af 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1964709-1965893.`；`literal: Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember`；`literal: Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des`；`literal: Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag`；`literal: Son_Maa_Din_Woe_Don_Vry_Sat`；`literal: So_Ma_Di_Wo_Do_Vr_Sa`。

### `eyes/src/vendor/moment/secondary/locale/ar-dz.cjs`

Moment secondary 独立实例的 ar-dz 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1967906-1969628.`；`literal: أقل من ثانية`；`literal: ثانية واحدة`；`literal: ثانيتان`；`literal: ثانيتين`；`literal: %d ثوان`。

### `eyes/src/vendor/moment/secondary/locale/ar-kw.cjs`

Moment secondary 独立实例的 ar-kw 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1969629-1970598.`；`literal: ar-kw`；`literal: يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر`；`literal: الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت`；`literal: احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت`；`literal: ح_ن_ث_ر_خ_ج_س`。

### `eyes/src/vendor/moment/secondary/locale/ar-ly.cjs`

Moment secondary 独立实例的 ar-ly 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1970599-1972479.`；`literal: أقل من ثانية`；`literal: ثانية واحدة`；`literal: ثانيتان`；`literal: ثانيتين`；`literal: %d ثوان`。

### `eyes/src/vendor/moment/secondary/locale/ar-ma.cjs`

Moment secondary 独立实例的 ar-ma 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1972480-1973448.`；`literal: ar-ma`；`literal: يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر`；`literal: الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت`；`literal: احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت`；`literal: ح_ن_ث_ر_خ_ج_س`。

### `eyes/src/vendor/moment/secondary/locale/ar-sa.cjs`

Moment secondary 独立实例的 ar-sa 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1973449-1974867.`；`literal: ar-sa`；`literal: يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر`；`literal: الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت`；`literal: أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت`；`literal: ح_ن_ث_ر_خ_ج_س`。

### `eyes/src/vendor/moment/secondary/locale/ar-tn.cjs`

Moment secondary 独立实例的 ar-tn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1974868-1975838.`；`literal: ar-tn`；`literal: جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر`；`literal: الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت`；`literal: أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت`；`literal: ح_ن_ث_ر_خ_ج_س`。

### `eyes/src/vendor/moment/secondary/locale/ar.cjs`

Moment secondary 独立实例的 ar 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1965894-1967905.`；`literal: أقل من ثانية`；`literal: ثانية واحدة`；`literal: ثانيتان`；`literal: ثانيتين`；`literal: %d ثوان`。

### `eyes/src/vendor/moment/secondary/locale/az.cjs`

Moment secondary 独立实例的 az 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1975839-1977369.`；`literal: -inci`；`literal: -nci`；`literal: -üncü`；`literal: -ncı`；`literal: -uncu`。

### `eyes/src/vendor/moment/secondary/locale/be.cjs`

Moment secondary 独立实例的 be 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1977370-1979506.`；`literal: хвіліна`；`literal: хвіліну`；`literal: гадзіна`；`literal: гадзіну`；`literal: секунда_секунды_секунд`。

### `eyes/src/vendor/moment/secondary/locale/bg.cjs`

Moment secondary 独立实例的 bg 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1979507-1980778.`；`literal: януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември`；`literal: яну_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек`；`literal: неделя_понеделник_вторник_сряда_четвъртък_петък_събота`；`literal: нед_пон_вто_сря_чет_пет_съб`；`literal: нд_пн_вт_ср_чт_пт_сб`。

### `eyes/src/vendor/moment/secondary/locale/bm.cjs`

Moment secondary 独立实例的 bm 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1980779-1981843.`；`literal: Zan_Few_Mar_Awi_Mɛ_Zuw_Zul_Uti_Sɛt_ɔku_Now_Des`；`literal: Kari_Ntɛnɛn_Tarata_Araba_Alamisa_Juma_Sibiri`；`literal: Kar_Ntɛ_Tar_Ara_Ala_Jum_Sib`；`literal: Ka_Nt_Ta_Ar_Al_Ju_Si`；`literal: HH:mm`。

### `eyes/src/vendor/moment/secondary/locale/bn-bd.cjs`

Moment secondary 独立实例的 bn-bd 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1983359-1984967.`；`literal: bn-bd`；`literal: জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর`；`literal: জানু_ফেব্রু_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্ট_অক্টো_নভে_ডিসে`；`literal: রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার`；`literal: রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি`。

### `eyes/src/vendor/moment/secondary/locale/bn.cjs`

Moment secondary 独立实例的 bn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1981844-1983358.`；`literal: জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর`；`literal: জানু_ফেব্রু_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্ট_অক্টো_নভে_ডিসে`；`literal: রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার`；`literal: রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি`；`literal: রবি_সোম_মঙ্গল_বুধ_বৃহ_শুক্র_শনি`。

### `eyes/src/vendor/moment/secondary/locale/bo.cjs`

Moment secondary 独立实例的 bo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1984968-1986669.`；`literal: ཟླ་1_ཟླ་2_ཟླ་3_ཟླ་4_ཟླ་5_ཟླ་6_ཟླ་7_ཟླ་8_ཟླ་9_ཟླ་10_ཟླ་11_ཟླ་12`；`literal: གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་`；`literal: ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་`；`literal: ཉི_ཟླ_མིག_ལྷག_ཕུར_སངས_སྤེན`；`literal: A h:mm`。

### `eyes/src/vendor/moment/secondary/locale/br.cjs`

Moment secondary 独立实例的 br 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1986670-1988972.`；`literal: munutenn`；`literal: devezh`；`literal:  bloaz`；`literal:  vloaz`；`literal: Genver_Cʼhwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu`。

### `eyes/src/vendor/moment/secondary/locale/bs.cjs`

Moment secondary 独立实例的 bs 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1988973-1990794.`；`literal: sekunda`；`literal: sekunde`；`literal: sekundi`；`literal: jedna minuta`；`literal: jedne minute`。

### `eyes/src/vendor/moment/secondary/locale/ca.cjs`

Moment secondary 独立实例的 ca 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1990795-1992464.`；`literal: gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre`；`literal: gen._febr._març_abr._maig_juny_jul._ag._set._oct._nov._des.`；`literal: diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte`；`literal: dg._dl._dt._dc._dj._dv._ds.`；`literal: dg_dl_dt_dc_dj_dv_ds`。

### `eyes/src/vendor/moment/secondary/locale/cs.cjs`

Moment secondary 独立实例的 cs 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1992465-1995082.`；`literal: leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec`；`literal: led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro`；`literal: pár sekund`；`literal: pár sekundami`；`literal: sekundy`。

### `eyes/src/vendor/moment/secondary/locale/cv.cjs`

Moment secondary 独立实例的 cv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1995083-1996245.`；`literal: кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав`；`literal: кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш`；`literal: вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун`；`literal: выр_тун_ытл_юн_кӗҫ_эрн_шӑм`；`literal: вр_тн_ыт_юн_кҫ_эр_шм`。

### `eyes/src/vendor/moment/secondary/locale/cy.cjs`

Moment secondary 独立实例的 cy 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1996246-1997517.`；`literal: Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr`；`literal: Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag`；`literal: Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn`；`literal: Sul_Llun_Maw_Mer_Iau_Gwe_Sad`；`literal: Su_Ll_Ma_Me_Ia_Gw_Sa`。

### `eyes/src/vendor/moment/secondary/locale/da.cjs`

Moment secondary 独立实例的 da 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1997518-1998523.`；`literal: januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december`；`literal: jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec`；`literal: søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag`；`literal: søn_man_tir_ons_tor_fre_lør`；`literal: sø_ma_ti_on_to_fr_lø`。

### `eyes/src/vendor/moment/secondary/locale/de-at.cjs`

Moment secondary 独立实例的 de-at 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1999886-2001250.`；`literal: eine Minute`；`literal: einer Minute`；`literal: eine Stunde`；`literal: einer Stunde`；`literal: ein Tag`。

### `eyes/src/vendor/moment/secondary/locale/de-ch.cjs`

Moment secondary 独立实例的 de-ch 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2001251-2002608.`；`literal: eine Minute`；`literal: einer Minute`；`literal: eine Stunde`；`literal: einer Stunde`；`literal: ein Tag`。

### `eyes/src/vendor/moment/secondary/locale/de.cjs`

Moment secondary 独立实例的 de 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:1998524-1999885.`；`literal: eine Minute`；`literal: einer Minute`；`literal: eine Stunde`；`literal: einer Stunde`；`literal: ein Tag`。

### `eyes/src/vendor/moment/secondary/locale/dv.cjs`

Moment secondary 独立实例的 dv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2002609-2003722.`；`literal: ޖެނުއަރީ`；`literal: ފެބްރުއަރީ`；`literal: މާރިޗު`；`literal: އޭޕްރީލު`；`literal: ޖޫން`。

### `eyes/src/vendor/moment/secondary/locale/el.cjs`

Moment secondary 独立实例的 el 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2003723-2005595.`；`literal: undefined`；`literal: [object Function]`；`literal: string`；`literal: MMMM`；`literal: Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ`。

### `eyes/src/vendor/moment/secondary/locale/en-au.cjs`

Moment secondary 独立实例的 en-au 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2005596-2006699.`；`literal: en-au`；`literal: January_February_March_April_May_June_July_August_September_October_November_December`；`literal: Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec`；`literal: Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`；`literal: Sun_Mon_Tue_Wed_Thu_Fri_Sat`。

### `eyes/src/vendor/moment/secondary/locale/en-ca.cjs`

Moment secondary 独立实例的 en-ca 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2006700-2007787.`；`literal: en-ca`；`literal: January_February_March_April_May_June_July_August_September_October_November_December`；`literal: Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec`；`literal: Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`；`literal: Sun_Mon_Tue_Wed_Thu_Fri_Sat`。

### `eyes/src/vendor/moment/secondary/locale/en-gb.cjs`

Moment secondary 独立实例的 en-gb 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2007788-2008887.`；`literal: en-gb`；`literal: January_February_March_April_May_June_July_August_September_October_November_December`；`literal: Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec`；`literal: Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`；`literal: Sun_Mon_Tue_Wed_Thu_Fri_Sat`。

### `eyes/src/vendor/moment/secondary/locale/en-ie.cjs`

Moment secondary 独立实例的 en-ie 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2008888-2009986.`；`literal: en-ie`；`literal: January_February_March_April_May_June_July_August_September_October_November_December`；`literal: Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec`；`literal: Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`；`literal: Sun_Mon_Tue_Wed_Thu_Fri_Sat`。

### `eyes/src/vendor/moment/secondary/locale/en-il.cjs`

Moment secondary 独立实例的 en-il 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2009987-2011067.`；`literal: en-il`；`literal: January_February_March_April_May_June_July_August_September_October_November_December`；`literal: Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec`；`literal: Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`；`literal: Sun_Mon_Tue_Wed_Thu_Fri_Sat`。

### `eyes/src/vendor/moment/secondary/locale/en-in.cjs`

Moment secondary 独立实例的 en-in 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2011068-2012171.`；`literal: en-in`；`literal: January_February_March_April_May_June_July_August_September_October_November_December`；`literal: Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec`；`literal: Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`；`literal: Sun_Mon_Tue_Wed_Thu_Fri_Sat`。

### `eyes/src/vendor/moment/secondary/locale/en-nz.cjs`

Moment secondary 独立实例的 en-nz 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2012172-2013275.`；`literal: en-nz`；`literal: January_February_March_April_May_June_July_August_September_October_November_December`；`literal: Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec`；`literal: Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`；`literal: Sun_Mon_Tue_Wed_Thu_Fri_Sat`。

### `eyes/src/vendor/moment/secondary/locale/en-sg.cjs`

Moment secondary 独立实例的 en-sg 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2013276-2014375.`；`literal: en-sg`；`literal: January_February_March_April_May_June_July_August_September_October_November_December`；`literal: Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec`；`literal: Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`；`literal: Sun_Mon_Tue_Wed_Thu_Fri_Sat`。

### `eyes/src/vendor/moment/secondary/locale/eo.cjs`

Moment secondary 独立实例的 eo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2014376-2015647.`；`literal: januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro`；`literal: jan_feb_mart_apr_maj_jun_jul_aŭg_sept_okt_nov_dec`；`literal: dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato`；`literal: dim_lun_mard_merk_ĵaŭ_ven_sab`；`literal: di_lu_ma_me_ĵa_ve_sa`。

### `eyes/src/vendor/moment/secondary/locale/es-do.cjs`

Moment secondary 独立实例的 es-do 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2017742-2019817.`；`literal: ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.`；`literal: ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic`；`literal: es-do`；`literal: enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre`；`literal: domingo_lunes_martes_miércoles_jueves_viernes_sábado`。

### `eyes/src/vendor/moment/secondary/locale/es-mx.cjs`

Moment secondary 独立实例的 es-mx 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2019818-2021914.`；`literal: ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.`；`literal: ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic`；`literal: es-mx`；`literal: enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre`；`literal: domingo_lunes_martes_miércoles_jueves_viernes_sábado`。

### `eyes/src/vendor/moment/secondary/locale/es-us.cjs`

Moment secondary 独立实例的 es-us 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2021915-2023990.`；`literal: ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.`；`literal: ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic`；`literal: es-us`；`literal: enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre`；`literal: domingo_lunes_martes_miércoles_jueves_viernes_sábado`。

### `eyes/src/vendor/moment/secondary/locale/es.cjs`

Moment secondary 独立实例的 es 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2015648-2017741.`；`literal: ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.`；`literal: ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic`；`literal: enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre`；`literal: domingo_lunes_martes_miércoles_jueves_viernes_sábado`；`literal: dom._lun._mar._mié._jue._vie._sáb.`。

### `eyes/src/vendor/moment/secondary/locale/et.cjs`

Moment secondary 独立实例的 et 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2023991-2025316.`；`literal: mõne sekundi`；`literal: mõni sekund`；`literal: paar sekundit`；`literal: sekundi`；`literal: sekundit`。

### `eyes/src/vendor/moment/secondary/locale/eu.cjs`

Moment secondary 独立实例的 eu 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2025317-2026547.`；`literal: urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua`；`literal: urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.`；`literal: igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata`；`literal: ig._al._ar._az._og._ol._lr.`；`literal: ig_al_ar_az_og_ol_lr`。

### `eyes/src/vendor/moment/secondary/locale/fa.cjs`

Moment secondary 独立实例的 fa 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2026548-2028051.`；`literal: ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر`；`literal: یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه`；`literal: ی_د_س_چ_پ_ج_ش`；`literal: HH:mm`；`literal: HH:mm:ss`。

### `eyes/src/vendor/moment/secondary/locale/fi.cjs`

Moment secondary 独立实例的 fi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2028052-2029868.`；`literal: nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän`；`literal: nolla`；`literal: yhden`；`literal: kahden`；`literal: kolmen`。

### `eyes/src/vendor/moment/secondary/locale/fil.cjs`

Moment secondary 独立实例的 fil 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2029869-2030932.`；`literal: Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre`；`literal: Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis`；`literal: Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado`；`literal: Lin_Lun_Mar_Miy_Huw_Biy_Sab`；`literal: Li_Lu_Ma_Mi_Hu_Bi_Sab`。

### `eyes/src/vendor/moment/secondary/locale/fo.cjs`

Moment secondary 独立实例的 fo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2030933-2031962.`；`literal: januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember`；`literal: jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des`；`literal: sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur`；`literal: sun_mán_týs_mik_hós_frí_ley`；`literal: su_má_tý_mi_hó_fr_le`。

### `eyes/src/vendor/moment/secondary/locale/fr-ca.cjs`

Moment secondary 独立实例的 fr-ca 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2033795-2034983.`；`literal: fr-ca`；`literal: janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre`；`literal: janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.`；`literal: dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi`；`literal: dim._lun._mar._mer._jeu._ven._sam.`。

### `eyes/src/vendor/moment/secondary/locale/fr-ch.cjs`

Moment secondary 独立实例的 fr-ch 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2034984-2036191.`；`literal: fr-ch`；`literal: janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre`；`literal: janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.`；`literal: dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi`；`literal: dim._lun._mar._mer._jeu._ven._sam.`。

### `eyes/src/vendor/moment/secondary/locale/fr.cjs`

Moment secondary 独立实例的 fr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2031963-2033794.`；`literal: janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre`；`literal: janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.`；`literal: dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi`；`literal: dim._lun._mar._mer._jeu._ven._sam.`；`literal: di_lu_ma_me_je_ve_sa`。

### `eyes/src/vendor/moment/secondary/locale/fy.cjs`

Moment secondary 独立实例的 fy 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2036192-2037453.`；`literal: jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.`；`literal: jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des`；`literal: jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber`；`literal: snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon`；`literal: si._mo._ti._wo._to._fr._so.`。

### `eyes/src/vendor/moment/secondary/locale/ga.cjs`

Moment secondary 独立实例的 ga 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2037454-2038648.`；`literal: Eanáir`；`literal: Feabhra`；`literal: Márta`；`literal: Aibreán`；`literal: Bealtaine`。

### `eyes/src/vendor/moment/secondary/locale/gd.cjs`

Moment secondary 独立实例的 gd 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2038649-2039883.`；`literal: Am Faoilleach`；`literal: An Gearran`；`literal: Am Màrt`；`literal: An Giblean`；`literal: An Cèitean`。

### `eyes/src/vendor/moment/secondary/locale/gl.cjs`

Moment secondary 独立实例的 gl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2039884-2041235.`；`literal: xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro`；`literal: xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.`；`literal: domingo_luns_martes_mércores_xoves_venres_sábado`；`literal: dom._lun._mar._mér._xov._ven._sáb.`；`literal: do_lu_ma_mé_xo_ve_sá`。

### `eyes/src/vendor/moment/secondary/locale/gom-deva.cjs`

Moment secondary 独立实例的 gom-deva 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2041236-2043189.`；`literal: थोडया सॅकंडांनी`；`literal: थोडे सॅकंड`；`literal:  सॅकंडांनी`；`literal:  सॅकंड`；`literal: एका मिणटान`。

### `eyes/src/vendor/moment/secondary/locale/gom-latn.cjs`

Moment secondary 独立实例的 gom-latn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2043190-2045113.`；`literal: thoddea sekondamni`；`literal: thodde sekond`；`literal:  sekondamni`；`literal:  sekond`；`literal: eka mintan`。

### `eyes/src/vendor/moment/secondary/locale/gu.cjs`

Moment secondary 独立实例的 gu 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2045114-2046664.`；`literal: જાન્યુઆરી_ફેબ્રુઆરી_માર્ચ_એપ્રિલ_મે_જૂન_જુલાઈ_ઑગસ્ટ_સપ્ટેમ્બર_ઑક્ટ્બર_નવેમ્બર_ડિસેમ્બર`；`literal: જાન્યુ._ફેબ્રુ._માર્ચ_એપ્રિ._મે_જૂન_જુલા._ઑગ._સપ્ટે._ઑક્ટ્._નવે._ડિસે.`；`literal: રવિવાર_સોમવાર_મંગળવાર_બુધ્વાર_ગુરુવાર_શુક્રવાર_શનિવાર`；`literal: રવિ_સોમ_મંગળ_બુધ્_ગુરુ_શુક્ર_શનિ`；`literal: ર_સો_મં_બુ_ગુ_શુ_શ`。

### `eyes/src/vendor/moment/secondary/locale/he.cjs`

Moment secondary 独立实例的 he 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2046665-2048057.`；`literal: ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר`；`literal: ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳`；`literal: ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת`；`literal: א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳`；`literal: א_ב_ג_ד_ה_ו_ש`。

### `eyes/src/vendor/moment/secondary/locale/hi.cjs`

Moment secondary 独立实例的 hi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2048058-2050562.`；`literal: जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर`；`literal: जनवरी_फरवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितंबर_अक्टूबर_नवंबर_दिसंबर`；`literal: जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.`；`literal: रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार`；`literal: रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि`。

### `eyes/src/vendor/moment/secondary/locale/hr.cjs`

Moment secondary 独立实例的 hr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2050563-2052567.`；`literal: sekunda`；`literal: sekunde`；`literal: sekundi`；`literal: jedna minuta`；`literal: jedne minute`。

### `eyes/src/vendor/moment/secondary/locale/hu.cjs`

Moment secondary 独立实例的 hu 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2052568-2054415.`；`literal: vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton`；`literal: néhány másodperc`；`literal: néhány másodperce`；`literal:  másodperc`；`literal:  másodperce`。

### `eyes/src/vendor/moment/secondary/locale/hy-am.cjs`

Moment secondary 独立实例的 hy-am 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2054416-2055907.`；`literal: hy-am`；`literal: հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր`；`literal: հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ`；`literal: կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ`；`literal: կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ`。

### `eyes/src/vendor/moment/secondary/locale/id.cjs`

Moment secondary 独立实例的 id 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2055908-2057111.`；`literal: Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember`；`literal: Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des`；`literal: Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu`；`literal: Min_Sen_Sel_Rab_Kam_Jum_Sab`；`literal: Mg_Sn_Sl_Rb_Km_Jm_Sb`。

### `eyes/src/vendor/moment/secondary/locale/is.cjs`

Moment secondary 独立实例的 is 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2057112-2058810.`；`literal: nokkrar sekúndur`；`literal: nokkrum sekúndum`；`literal: sekúndur`；`literal: sekúndum`；`literal: sekúnda`。

### `eyes/src/vendor/moment/secondary/locale/it-ch.cjs`

Moment secondary 独立实例的 it-ch 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2060295-2061422.`；`literal: it-ch`；`literal: gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre`；`literal: gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic`；`literal: domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato`；`literal: dom_lun_mar_mer_gio_ven_sab`。

### `eyes/src/vendor/moment/secondary/locale/it.cjs`

Moment secondary 独立实例的 it 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2058811-2060294.`；`literal: gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre`；`literal: gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic`；`literal: domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato`；`literal: dom_lun_mar_mer_gio_ven_sab`；`literal: do_lu_ma_me_gi_ve_sa`。

### `eyes/src/vendor/moment/secondary/locale/ja.cjs`

Moment secondary 独立实例的 ja 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2061423-2063226.`；`literal: 2019-05-01`；`literal: 1989-01-08`；`literal: 2019-04-30`；`literal: 1926-12-25`；`literal: 1989-01-07`。

### `eyes/src/vendor/moment/secondary/locale/jv.cjs`

Moment secondary 独立实例的 jv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2063227-2064495.`；`literal: Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember`；`literal: Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des`；`literal: Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu`；`literal: Min_Sen_Sel_Reb_Kem_Jem_Sep`；`literal: Mg_Sn_Sl_Rb_Km_Jm_Sp`。

### `eyes/src/vendor/moment/secondary/locale/ka.cjs`

Moment secondary 独立实例的 ka 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2064496-2065937.`；`literal: იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი`；`literal: იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ`；`literal: კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი`；`literal: კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს`；`literal: კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ`。

### `eyes/src/vendor/moment/secondary/locale/kk.cjs`

Moment secondary 独立实例的 kk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2065938-2067198.`；`literal: қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан`；`literal: қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел`；`literal: жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі`；`literal: жек_дүй_сей_сәр_бей_жұм_сен`；`literal: жк_дй_сй_ср_бй_жм_сн`。

### `eyes/src/vendor/moment/secondary/locale/km.cjs`

Moment secondary 独立实例的 km 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2067199-2068634.`；`literal: មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ`；`literal: អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍`；`literal: អា_ច_អ_ព_ព្រ_សុ_ស`；`literal: HH:mm`；`literal: HH:mm:ss`。

### `eyes/src/vendor/moment/secondary/locale/kn.cjs`

Moment secondary 独立实例的 kn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2068635-2070305.`；`literal: ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್`；`literal: ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂ_ಅಕ್ಟೋ_ನವೆಂ_ಡಿಸೆಂ`；`literal: ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ`；`literal: ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ`；`literal: ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ`。

### `eyes/src/vendor/moment/secondary/locale/ko.cjs`

Moment secondary 独立实例的 ko 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2070306-2071408.`；`literal: 1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월`；`literal: 일요일_월요일_화요일_수요일_목요일_금요일_토요일`；`literal: 일_월_화_수_목_금_토`；`literal: A h:mm`；`literal: A h:mm:ss`。

### `eyes/src/vendor/moment/secondary/locale/ku.cjs`

Moment secondary 独立实例的 ku 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2071409-2072889.`；`literal: کانونی دووەم`；`literal: شوبات`；`literal: ئازار`；`literal: نیسان`；`literal: ئایار`。

### `eyes/src/vendor/moment/secondary/locale/ky.cjs`

Moment secondary 独立实例的 ky 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2072890-2074158.`；`literal: январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь`；`literal: янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек`；`literal: Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби`；`literal: Жек_Дүй_Шей_Шар_Бей_Жум_Ише`；`literal: Жк_Дй_Шй_Шр_Бй_Жм_Иш`。

### `eyes/src/vendor/moment/secondary/locale/lb.cjs`

Moment secondary 独立实例的 lb 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2074159-2075817.`；`literal: eng Minutt`；`literal: enger Minutt`；`literal: eng Stonn`；`literal: enger Stonn`；`literal: een Dag`。

### `eyes/src/vendor/moment/secondary/locale/lo.cjs`

Moment secondary 独立实例的 lo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2075818-2076983.`；`literal: ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ`；`literal: ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ`；`literal: ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ`；`literal: ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ`；`literal: HH:mm`。

### `eyes/src/vendor/moment/secondary/locale/lt.cjs`

Moment secondary 独立实例的 lt 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2076984-2079099.`；`literal: sekundė_sekundžių_sekundes`；`literal: minutė_minutės_minutę`；`literal: minutės_minučių_minutes`；`literal: valanda_valandos_valandą`；`literal: valandos_valandų_valandas`。

### `eyes/src/vendor/moment/secondary/locale/lv.cjs`

Moment secondary 独立实例的 lv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2079100-2080803.`；`literal: sekundes_sekundēm_sekunde_sekundes`；`literal: minūtes_minūtēm_minūte_minūtes`；`literal: stundas_stundām_stunda_stundas`；`literal: dienas_dienām_diena_dienas`；`literal: mēneša_mēnešiem_mēnesis_mēneši`。

### `eyes/src/vendor/moment/secondary/locale/me.cjs`

Moment secondary 独立实例的 me 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2080804-2082690.`；`literal: sekund`；`literal: sekunda`；`literal: sekundi`；`literal: jedan minut`；`literal: jednog minuta`。

### `eyes/src/vendor/moment/secondary/locale/mi.cjs`

Moment secondary 独立实例的 mi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2082691-2083998.`；`literal: Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki`；`literal: Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei`；`literal: Ta_Ma_Tū_We_Tāi_Pa_Hā`；`literal: HH:mm`；`literal: HH:mm:ss`。

### `eyes/src/vendor/moment/secondary/locale/mk.cjs`

Moment secondary 独立实例的 mk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2083999-2085283.`；`literal: јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември`；`literal: јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек`；`literal: недела_понеделник_вторник_среда_четврток_петок_сабота`；`literal: нед_пон_вто_сре_чет_пет_саб`；`literal: нe_пo_вт_ср_че_пе_сa`。

### `eyes/src/vendor/moment/secondary/locale/ml.cjs`

Moment secondary 独立实例的 ml 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2085284-2086592.`；`literal: ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ`；`literal: ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.`；`literal: ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച`；`literal: ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി`；`literal: ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ`。

### `eyes/src/vendor/moment/secondary/locale/mn.cjs`

Moment secondary 独立实例的 mn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2086593-2088200.`；`literal: хэдхэн секунд`；`literal: хэдхэн секундын`；`literal:  секунд`；`literal:  секундын`；`literal:  минут`。

### `eyes/src/vendor/moment/secondary/locale/mr.cjs`

Moment secondary 独立实例的 mr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2088201-2090441.`；`literal: काही सेकंद`；`literal: %d सेकंद`；`literal: एक मिनिट`；`literal: %d मिनिटे`；`literal: एक तास`。

### `eyes/src/vendor/moment/secondary/locale/ms-my.cjs`

Moment secondary 独立实例的 ms-my 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2091659-2092878.`；`literal: ms-my`；`literal: Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember`；`literal: Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis`；`literal: Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu`；`literal: Ahd_Isn_Sel_Rab_Kha_Jum_Sab`。

### `eyes/src/vendor/moment/secondary/locale/ms.cjs`

Moment secondary 独立实例的 ms 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2090442-2091658.`；`literal: Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember`；`literal: Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis`；`literal: Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu`；`literal: Ahd_Isn_Sel_Rab_Kha_Jum_Sab`；`literal: Ah_Is_Sl_Rb_Km_Jm_Sb`。

### `eyes/src/vendor/moment/secondary/locale/mt.cjs`

Moment secondary 独立实例的 mt 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2092879-2093881.`；`literal: Jannar_Frar_Marzu_April_Mejju_Ġunju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Diċembru`；`literal: Jan_Fra_Mar_Apr_Mej_Ġun_Lul_Aww_Set_Ott_Nov_Diċ`；`literal: Il-Ħadd_It-Tnejn_It-Tlieta_L-Erbgħa_Il-Ħamis_Il-Ġimgħa_Is-Sibt`；`literal: Ħad_Tne_Tli_Erb_Ħam_Ġim_Sib`；`literal: Ħa_Tn_Tl_Er_Ħa_Ġi_Si`。

### `eyes/src/vendor/moment/secondary/locale/my.cjs`

Moment secondary 独立实例的 my 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2093882-2095157.`；`literal: ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ`；`literal: ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ`；`literal: တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ`；`literal: နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ`；`literal: HH:mm`。

### `eyes/src/vendor/moment/secondary/locale/nb.cjs`

Moment secondary 独立实例的 nb 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2095158-2096248.`；`literal: januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember`；`literal: jan._feb._mars_apr._mai_juni_juli_aug._sep._okt._nov._des.`；`literal: søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag`；`literal: sø._ma._ti._on._to._fr._lø.`；`literal: sø_ma_ti_on_to_fr_lø`。

### `eyes/src/vendor/moment/secondary/locale/ne.cjs`

Moment secondary 独立实例的 ne 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2096249-2097851.`；`literal: जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर`；`literal: जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.`；`literal: आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार`；`literal: आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.`；`literal: आ._सो._मं._बु._बि._शु._श.`。

### `eyes/src/vendor/moment/secondary/locale/nl-be.cjs`

Moment secondary 独立实例的 nl-be 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2099716-2101555.`；`literal: jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.`；`literal: jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec`；`literal: nl-be`；`literal: januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december`；`literal: zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag`。

### `eyes/src/vendor/moment/secondary/locale/nl.cjs`

Moment secondary 独立实例的 nl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2097852-2099715.`；`literal: jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.`；`literal: jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec`；`literal: januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december`；`literal: zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag`；`literal: zo._ma._di._wo._do._vr._za.`。

### `eyes/src/vendor/moment/secondary/locale/nn.cjs`

Moment secondary 独立实例的 nn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2101556-2102664.`；`literal: januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember`；`literal: jan._feb._mars_apr._mai_juni_juli_aug._sep._okt._nov._des.`；`literal: sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag`；`literal: su._må._ty._on._to._fr._lau.`；`literal: su_må_ty_on_to_fr_la`。

### `eyes/src/vendor/moment/secondary/locale/oc-lnc.cjs`

Moment secondary 独立实例的 oc-lnc 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2102665-2104070.`；`literal: oc-lnc`；`literal: genièr_febrièr_març_abril_mai_junh_julhet_agost_setembre_octòbre_novembre_decembre`；`literal: gen._febr._març_abr._mai_junh_julh._ago._set._oct._nov._dec.`；`literal: dimenge_diluns_dimars_dimècres_dijòus_divendres_dissabte`；`literal: dg._dl._dm._dc._dj._dv._ds.`。

### `eyes/src/vendor/moment/secondary/locale/pa-in.cjs`

Moment secondary 独立实例的 pa-in 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2104071-2105589.`；`literal: pa-in`；`literal: ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ`；`literal: ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ`；`literal: ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ`；`literal: A h:mm ਵਜੇ`。

### `eyes/src/vendor/moment/secondary/locale/pl.cjs`

Moment secondary 独立实例的 pl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2105590-2107643.`；`literal: styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień`；`literal: stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia`；`literal: sekundy`；`literal: sekund`；`literal: minuta`。

### `eyes/src/vendor/moment/secondary/locale/pt-br.cjs`

Moment secondary 独立实例的 pt-br 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2108813-2109979.`；`literal: pt-br`；`literal: janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro`；`literal: jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez`；`literal: domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado`；`literal: dom_seg_ter_qua_qui_sex_sáb`。

### `eyes/src/vendor/moment/secondary/locale/pt.cjs`

Moment secondary 独立实例的 pt 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2107644-2108812.`；`literal: janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro`；`literal: jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez`；`literal: Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado`；`literal: Dom_Seg_Ter_Qua_Qui_Sex_Sáb`；`literal: Do_2ª_3ª_4ª_5ª_6ª_Sá`。

### `eyes/src/vendor/moment/secondary/locale/ro.cjs`

Moment secondary 独立实例的 ro 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2109980-2111080.`；`literal:  de `；`literal: secunde`；`literal: minute`；`literal: zile`；`literal: săptămâni`。

### `eyes/src/vendor/moment/secondary/locale/ru.cjs`

Moment secondary 独立实例的 ru 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2111081-2114446.`；`literal: минута`；`literal: минуту`；`literal: секунда_секунды_секунд`；`literal: секунду_секунды_секунд`；`literal: минута_минуты_минут`。

### `eyes/src/vendor/moment/secondary/locale/sd.cjs`

Moment secondary 独立实例的 sd 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2114447-2115450.`；`literal: جنوري`；`literal: فيبروري`；`literal: مارچ`；`literal: اپريل`；`literal: جولاءِ`。

### `eyes/src/vendor/moment/secondary/locale/se.cjs`

Moment secondary 独立实例的 se 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2115451-2116596.`；`literal: ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov`；`literal: sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat`；`literal: sotn_vuos_maŋ_gask_duor_bear_láv`；`literal: s_v_m_g_d_b_L`；`literal: HH:mm`。

### `eyes/src/vendor/moment/secondary/locale/si.cjs`

Moment secondary 独立实例的 si 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2116597-2117796.`；`literal: ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්`；`literal: ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ`；`literal: ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා`；`literal: ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන`；`literal: ඉ_ස_අ_බ_බ්‍ර_සි_සෙ`。

### `eyes/src/vendor/moment/secondary/locale/sk.cjs`

Moment secondary 独立实例的 sk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2117797-2119733.`；`literal: január_február_marec_apríl_máj_jún_júl_august_september_október_november_december`；`literal: jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec`；`literal: pár sekúnd`；`literal: pár sekundami`；`literal: sekundy`。

### `eyes/src/vendor/moment/secondary/locale/sl.cjs`

Moment secondary 独立实例的 sl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2119734-2122042.`；`literal: nekaj sekund`；`literal: nekaj sekundami`；`literal: sekundo`；`literal: sekundi`；`literal: sekundah`。

### `eyes/src/vendor/moment/secondary/locale/sq.cjs`

Moment secondary 独立实例的 sq 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2122043-2123158.`；`literal: Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor`；`literal: Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj`；`literal: E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë`；`literal: Die_Hën_Mar_Mër_Enj_Pre_Sht`；`literal: D_H_Ma_Më_E_P_Sh`。

### `eyes/src/vendor/moment/secondary/locale/sr-cyrl.cjs`

Moment secondary 独立实例的 sr-cyrl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2125032-2126904.`；`literal: секунда`；`literal: секунде`；`literal: секунди`；`literal: један минут`；`literal: једне минуте`。

### `eyes/src/vendor/moment/secondary/locale/sr.cjs`

Moment secondary 独立实例的 sr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2123159-2125031.`；`literal: sekunda`；`literal: sekunde`；`literal: sekundi`；`literal: jedan minut`；`literal: jedne minute`。

### `eyes/src/vendor/moment/secondary/locale/ss.cjs`

Moment secondary 独立实例的 ss 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2126905-2128277.`；`literal: Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo`；`literal: Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo`；`literal: Lis_Umb_Lsb_Les_Lsi_Lsh_Umg`；`literal: Li_Us_Lb_Lt_Ls_Lh_Ug`；`literal: h:mm A`。

### `eyes/src/vendor/moment/secondary/locale/sv.cjs`

Moment secondary 独立实例的 sv 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2128278-2129400.`；`literal: januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december`；`literal: jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec`；`literal: söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag`；`literal: sön_mån_tis_ons_tor_fre_lör`；`literal: sö_må_ti_on_to_fr_lö`。

### `eyes/src/vendor/moment/secondary/locale/sw.cjs`

Moment secondary 独立实例的 sw 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2129401-2130415.`；`literal: Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba`；`literal: Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des`；`literal: Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi`；`literal: Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos`；`literal: J2_J3_J4_J5_Al_Ij_J1`。

### `eyes/src/vendor/moment/secondary/locale/ta.cjs`

Moment secondary 独立实例的 ta 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2130416-2132170.`；`literal: ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்`；`literal: ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை`；`literal: ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி`；`literal: ஞா_தி_செ_பு_வி_வெ_ச`；`literal: HH:mm`。

### `eyes/src/vendor/moment/secondary/locale/te.cjs`

Moment secondary 独立实例的 te 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2132171-2133493.`；`literal: జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జులై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్`；`literal: జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జులై_ఆగ._సెప్._అక్టో._నవ._డిసె.`；`literal: ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం`；`literal: ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని`；`literal: ఆ_సో_మం_బు_గు_శు_శ`。

### `eyes/src/vendor/moment/secondary/locale/tet.cjs`

Moment secondary 独立实例的 tet 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2133494-2134609.`；`literal: Janeiru_Fevereiru_Marsu_Abril_Maiu_Juñu_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru`；`literal: Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez`；`literal: Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu`；`literal: Dom_Seg_Ters_Kua_Kint_Sest_Sab`；`literal: Do_Seg_Te_Ku_Ki_Ses_Sa`。

### `eyes/src/vendor/moment/secondary/locale/tg.cjs`

Moment secondary 独立实例的 tg 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2134610-2136237.`；`literal: январи_феврали_марти_апрели_майи_июни_июли_августи_сентябри_октябри_ноябри_декабри`；`literal: январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр`；`literal: янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек`；`literal: якшанбе_душанбе_сешанбе_чоршанбе_панҷшанбе_ҷумъа_шанбе`；`literal: яшб_дшб_сшб_чшб_пшб_ҷум_шнб`。

### `eyes/src/vendor/moment/secondary/locale/th.cjs`

Moment secondary 独立实例的 th 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2136238-2137444.`；`literal: มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม`；`literal: ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.`；`literal: อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์`；`literal: อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์`；`literal: อา._จ._อ._พ._พฤ._ศ._ส.`。

### `eyes/src/vendor/moment/secondary/locale/tk.cjs`

Moment secondary 独立实例的 tk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2137445-2138744.`；`literal: 'inji`；`literal: 'nji`；`literal: 'ünji`；`literal: 'njy`；`literal: 'unjy`。

### `eyes/src/vendor/moment/secondary/locale/tl-ph.cjs`

Moment secondary 独立实例的 tl-ph 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2138745-2139810.`；`literal: tl-ph`；`literal: Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre`；`literal: Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis`；`literal: Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado`；`literal: Lin_Lun_Mar_Miy_Huw_Biy_Sab`。

### `eyes/src/vendor/moment/secondary/locale/tlh.cjs`

Moment secondary 独立实例的 tlh 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2139811-2141740.`；`literal: pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut`；`literal:  pIq`；`literal:  ret`；`literal:  lup`；`literal:  tup`。

### `eyes/src/vendor/moment/secondary/locale/tr.cjs`

Moment secondary 独立实例的 tr 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2141741-2143213.`；`literal: 'inci`；`literal: 'nci`；`literal: 'üncü`；`literal: 'ncı`；`literal: 'uncu`。

### `eyes/src/vendor/moment/secondary/locale/tzl.cjs`

Moment secondary 独立实例的 tzl 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2143214-2144657.`；`literal: viensas secunds`；`literal: 'iensas secunds`；`literal:  secunds`；`literal: 'n míut`；`literal: 'iens míut`。

### `eyes/src/vendor/moment/secondary/locale/tzm-latn.cjs`

Moment secondary 独立实例的 tzm-latn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2145639-2146639.`；`literal: tzm-latn`；`literal: innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir`；`literal: asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas`；`literal: HH:mm`；`literal: HH:mm:ss`。

### `eyes/src/vendor/moment/secondary/locale/tzm.cjs`

Moment secondary 独立实例的 tzm 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2144658-2145638.`；`literal: ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ`；`literal: ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ`；`literal: HH:mm`；`literal: HH:mm:ss`；`literal: DD/MM/YYYY`。

### `eyes/src/vendor/moment/secondary/locale/ug-cn.cjs`

Moment secondary 独立实例的 ug-cn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2146640-2148311.`；`literal: ug-cn`；`literal: يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر`；`literal: يەكشەنبە_دۈشەنبە_سەيشەنبە_چارشەنبە_پەيشەنبە_جۈمە_شەنبە`；`literal: يە_دۈ_سە_چا_پە_جۈ_شە`；`literal: HH:mm`。

### `eyes/src/vendor/moment/secondary/locale/uk.cjs`

Moment secondary 独立实例的 uk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2148312-2150717.`；`literal: хвилина`；`literal: хвилину`；`literal: година`；`literal: годину`；`literal: секунда_секунди_секунд`。

### `eyes/src/vendor/moment/secondary/locale/ur.cjs`

Moment secondary 独立实例的 ur 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2150718-2151722.`；`literal: جنوری`；`literal: فروری`；`literal: مارچ`；`literal: اپریل`；`literal: جولائی`。

### `eyes/src/vendor/moment/secondary/locale/uz-latn.cjs`

Moment secondary 独立实例的 uz-latn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2152694-2153694.`；`literal: uz-latn`；`literal: Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr`；`literal: Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek`；`literal: Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba`；`literal: Yak_Dush_Sesh_Chor_Pay_Jum_Shan`。

### `eyes/src/vendor/moment/secondary/locale/uz.cjs`

Moment secondary 独立实例的 uz 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2151723-2152693.`；`literal: январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр`；`literal: янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек`；`literal: Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба`；`literal: Якш_Душ_Сеш_Чор_Пай_Жум_Шан`；`literal: Як_Ду_Се_Чо_Па_Жу_Ша`。

### `eyes/src/vendor/moment/secondary/locale/vi.cjs`

Moment secondary 独立实例的 vi 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2153695-2155050.`；`literal: tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12`；`literal: Thg 01_Thg 02_Thg 03_Thg 04_Thg 05_Thg 06_Thg 07_Thg 08_Thg 09_Thg 10_Thg 11_Thg 12`；`literal: chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy`；`literal: CN_T2_T3_T4_T5_T6_T7`；`literal: HH:mm`。

### `eyes/src/vendor/moment/secondary/locale/x-pseudo.cjs`

Moment secondary 独立实例的 x-pseudo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2155051-2156270.`；`literal: x-pseudo`；`literal: J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc`；`literal: S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý`；`literal: S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát`；`literal: S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá`。

### `eyes/src/vendor/moment/secondary/locale/yo.cjs`

Moment secondary 独立实例的 yo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2156271-2157336.`；`literal: Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀`；`literal: Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀`；`literal: Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta`；`literal: Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá`；`literal: Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb`。

### `eyes/src/vendor/moment/secondary/locale/zh-cn.cjs`

Moment secondary 独立实例的 zh-cn 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2157337-2158725.`；`literal: zh-cn`；`literal: 一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月`；`literal: 1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月`；`literal: 星期日_星期一_星期二_星期三_星期四_星期五_星期六`；`literal: 周日_周一_周二_周三_周四_周五_周六`。

### `eyes/src/vendor/moment/secondary/locale/zh-hk.cjs`

Moment secondary 独立实例的 zh-hk 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2158726-2159989.`；`literal: zh-hk`；`literal: 一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月`；`literal: 1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月`；`literal: 星期日_星期一_星期二_星期三_星期四_星期五_星期六`；`literal: 週日_週一_週二_週三_週四_週五_週六`。

### `eyes/src/vendor/moment/secondary/locale/zh-mo.cjs`

Moment secondary 独立实例的 zh-mo 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2159990-2161256.`；`literal: zh-mo`；`literal: 一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月`；`literal: 1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月`；`literal: 星期日_星期一_星期二_星期三_星期四_星期五_星期六`；`literal: 週日_週一_週二_週三_週四_週五_週六`。

### `eyes/src/vendor/moment/secondary/locale/zh-tw.cjs`

Moment secondary 独立实例的 zh-tw 语言区域注册：月份/星期名称、日期格式、相对时间和本地化规则。可信度：observed。

证据：`// Recovered from vendors.js:2161257-2162523.`；`literal: zh-tw`；`literal: 一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月`；`literal: 1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月`；`literal: 星期日_星期一_星期二_星期三_星期四_星期五_星期六`；`literal: 週日_週一_週二_週三_週四_週五_週六`。

### `eyes/src/vendor/three/core.js`

Three.js REVISION 185 的数学、场景图、几何、材质、动画、加载、音频及公共基础设施。可信度：observed。

证据：`// Recovered from vendors.js:386331-792655.`；`exports: ACESFilmicToneMapping, AddEquation, AddOperation, AdditiveAnimationBlendMode, AdditiveBlending, AgXToneMapping, AlphaFormat, AlwaysCompare, AlwaysDepth, AlwaysStencilFunc, AmbientLight, AnimationAction, AnimationClip, AnimationLoader, AnimationMixer, AnimationObjectGroup, AnimationUtils, ArcCurve, ArrayCamera, ArrowHelper, AttachedBindMode, Audio, AudioAnalyser, AudioContext, AudioListener, AudioLoader, AxesHelper, BackSide, BasicDepthPacking, BasicShadowMap, BatchedMesh, BezierInterpolant, Bone, BooleanKeyframeTrack, Box2, Box3, Box3Helper, BoxGeometry, BoxHelper, BufferAttribute, BufferGeometry, BufferGeometryLoader, ByteType, Cache, Camera, CameraHelper, CanvasTexture, CapsuleGeometry, CatmullRomCurve3, CineonToneMapping, CircleGeometry, ClampToEdgeWrapping, Clock, Color, ColorKeyframeTrack, ColorManagement, Compatibility, CompressedArrayTexture, CompressedCubeTexture, CompressedTexture, CompressedTextureLoader, ConeGeometry, ConstantAlphaFactor, ConstantColorFactor, Controls, CubeCamera, CubeDepthTexture, CubeReflectionMapping, CubeRefractionMapping, CubeTexture, CubeTextureLoader, CubeUVReflectionMapping, CubicBezierCurve, CubicBezierCurve3, CubicInterpolant, CullFaceBack, CullFaceFront, CullFaceFrontBack, CullFaceNone, Curve, CurvePath, CustomBlending, CustomToneMapping, CylinderGeometry, Cylindrical, Data3DTexture, DataArrayTexture, DataTexture, DataTextureLoader, DataUtils, DecrementStencilOp, DecrementWrapStencilOp, DefaultLoadingManager, DepthFormat, DepthStencilFormat, DepthTexture, DetachedBindMode, DirectionalLight, DirectionalLightHelper, DiscreteInterpolant, DodecahedronGeometry, DoubleSide, DstAlphaFactor, DstColorFactor, DynamicCopyUsage, DynamicDrawUsage, DynamicReadUsage, EdgesGeometry, EllipseCurve, EqualCompare, EqualDepth, EqualStencilFunc, EquirectangularReflectionMapping, EquirectangularRefractionMapping, Euler, EventDispatcher, ExternalTexture, ExtrudeGeometry, FileLoader, Float16BufferAttribute, Float32BufferAttribute, FloatType, Fog, FogExp2, FramebufferTexture, FrontSide, Frustum, FrustumArray, GLBufferAttribute, GLSL1, GLSL3, GreaterCompare, GreaterDepth, GreaterEqualCompare, GreaterEqualDepth, GreaterEqualStencilFunc, GreaterStencilFunc, GridHelper, Group, HTMLTexture, HalfFloatType, HemisphereLight, HemisphereLightHelper, IcosahedronGeometry, ImageBitmapLoader, ImageLoader, ImageUtils, IncrementStencilOp, IncrementWrapStencilOp, InstancedBufferAttribute, InstancedBufferGeometry, InstancedInterleavedBuffer, InstancedMesh, Int16BufferAttribute, Int32BufferAttribute, Int8BufferAttribute, IntType, InterleavedBuffer, InterleavedBufferAttribute, Interpolant, InterpolateBezier, InterpolateDiscrete, InterpolateLinear, InterpolateSmooth, InterpolationSamplingMode, InterpolationSamplingType, InvertStencilOp, KeepStencilOp, KeyframeTrack, LOD, LatheGeometry, Layers, LessCompare, LessDepth, LessEqualCompare, LessEqualDepth, LessEqualStencilFunc, LessStencilFunc, Light, LightProbe, Line, Line3, LineBasicMaterial, LineCurve, LineCurve3, LineDashedMaterial, LineLoop, LineSegments, LinearFilter, LinearInterpolant, LinearMipMapLinearFilter, LinearMipMapNearestFilter, LinearMipmapLinearFilter, LinearMipmapNearestFilter, LinearSRGBColorSpace, LinearToneMapping, LinearTransfer, Loader, LoaderUtils, LoadingManager, LoopOnce, LoopPingPong, LoopRepeat, MOUSE, Material, MaterialBlending, MaterialLoader, MathUtils, Matrix2, Matrix3, Matrix4, MaxEquation, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial, MinEquation, MirroredRepeatWrapping, MixOperation, MultiplyBlending, MultiplyOperation, NearestFilter, NearestMipMapLinearFilter, NearestMipMapNearestFilter, NearestMipmapLinearFilter, NearestMipmapNearestFilter, NeutralToneMapping, NeverCompare, NeverDepth, NeverStencilFunc, NoBlending, NoColorSpace, NoNormalPacking, NoToneMapping, NormalAnimationBlendMode, NormalBlending, NormalGAPacking, NormalRGPacking, NotEqualCompare, NotEqualDepth, NotEqualStencilFunc, NumberKeyframeTrack, Object3D, ObjectLoader, ObjectSpaceNormalMap, OctahedronGeometry, OneFactor, OneMinusConstantAlphaFactor, OneMinusConstantColorFactor, OneMinusDstAlphaFactor, OneMinusDstColorFactor, OneMinusSrcAlphaFactor, OneMinusSrcColorFactor, OrthographicCamera, PCFShadowMap, PCFSoftShadowMap, Path, PerspectiveCamera, Plane, PlaneGeometry, PlaneHelper, PointLight, PointLightHelper, Points, PointsMaterial, PolarGridHelper, PolyhedronGeometry, PositionalAudio, PropertyBinding, PropertyMixer, QuadraticBezierCurve, QuadraticBezierCurve3, Quaternion, QuaternionKeyframeTrack, QuaternionLinearInterpolant, R11_EAC_Format, RAD2DEG, RED_GREEN_RGTC2_Format, RED_RGTC1_Format, REVISION, RG11_EAC_Format, RGBADepthPacking, RGBAFormat, RGBAIntegerFormat, RGBA_ASTC_10x10_Format, RGBA_ASTC_10x5_Format, RGBA_ASTC_10x6_Format, RGBA_ASTC_10x8_Format, RGBA_ASTC_12x10_Format, RGBA_ASTC_12x12_Format, RGBA_ASTC_4x4_Format, RGBA_ASTC_5x4_Format, RGBA_ASTC_5x5_Format, RGBA_ASTC_6x5_Format, RGBA_ASTC_6x6_Format, RGBA_ASTC_8x5_Format, RGBA_ASTC_8x6_Format, RGBA_ASTC_8x8_Format, RGBA_BPTC_Format, RGBA_ETC2_EAC_Format, RGBA_PVRTC_2BPPV1_Format, RGBA_PVRTC_4BPPV1_Format, RGBA_S3TC_DXT1_Format, RGBA_S3TC_DXT3_Format, RGBA_S3TC_DXT5_Format, RGBDepthPacking, RGBFormat, RGBIntegerFormat, RGB_BPTC_SIGNED_Format, RGB_BPTC_UNSIGNED_Format, RGB_ETC1_Format, RGB_ETC2_Format, RGB_PVRTC_2BPPV1_Format, RGB_PVRTC_4BPPV1_Format, RGB_S3TC_DXT1_Format, RGDepthPacking, RGFormat, RGIntegerFormat, RawShaderMaterial, Ray, Raycaster, RectAreaLight, RedFormat, RedIntegerFormat, ReinhardToneMapping, RenderTarget, RenderTarget3D, RepeatWrapping, ReplaceStencilOp, ReverseSubtractEquation, ReversedDepthFuncs, RingGeometry, SIGNED_R11_EAC_Format, SIGNED_RED_GREEN_RGTC2_Format, SIGNED_RED_RGTC1_Format, SIGNED_RG11_EAC_Format, SRGBColorSpace, SRGBTransfer, Scene, ShaderMaterial, ShadowMaterial, Shape, ShapeGeometry, ShapePath, ShapeUtils, ShortType, Skeleton, SkeletonHelper, SkinnedMesh, Source, Sphere, SphereGeometry, Spherical, SphericalHarmonics3, SplineCurve, SpotLight, SpotLightHelper, Sprite, SpriteMaterial, SrcAlphaFactor, SrcAlphaSaturateFactor, SrcColorFactor, StaticCopyUsage, StaticDrawUsage, StaticReadUsage, StereoCamera, StreamCopyUsage, StreamDrawUsage, StreamReadUsage, StringKeyframeTrack, SubtractEquation, SubtractiveBlending, TOUCH, TangentSpaceNormalMap, TetrahedronGeometry, Texture, TextureLoader, TextureUtils, Timer, TimestampQuery, TorusGeometry, TorusKnotGeometry, Triangle, TriangleFanDrawMode, TriangleStripDrawMode, TrianglesDrawMode, TubeGeometry, UVMapping, Uint16BufferAttribute, Uint32BufferAttribute, Uint8BufferAttribute, Uint8ClampedBufferAttribute, Uniform, UniformsGroup, UniformsUtils, UnsignedByteType, UnsignedInt101111Type, UnsignedInt248Type, UnsignedInt5999Type, UnsignedIntType, UnsignedShort4444Type, UnsignedShort5551Type, UnsignedShortType, VSMShadowMap, Vector2, Vector3, Vector4, VectorKeyframeTrack, VideoFrameTexture, VideoTexture, WebGL3DRenderTarget, WebGLArrayRenderTarget, WebGLCoordinateSystem, WebGLRenderTarget, WebGPUCoordinateSystem, WebXRController, WireframeGeometry, WrapAroundEnding, ZeroCurvatureEnding, ZeroFactor, ZeroSlopeEnding, ZeroStencilOp, cloneUniforms, createCanvasElement, createElementNS, error, getByteLength, getConsoleFunction, getUnlitUniformColorSpace, isTypedArray, log, mergeUniforms, probeAsync, setConsoleFunction, warn, warnOnce, yieldToMain`；`literal: attached`；`literal: detached`；`literal: srgb`；`literal: srgb-linear`；`literal: linear`。

- `EventDispatcher`：对象级事件订阅、分发和移除。方法：`addEventListener`、`hasEventListener`、`removeEventListener`、`dispatchEvent`。

- `Vector2`：2 维向量的算术、归一化、插值和坐标变换。方法：`constructor`、`get:width`、`get:height`、`set`、`setScalar`、`setX`、`setY`、`setComponent`、`getComponent`、`clone`、`copy`、`add`、`addScalar`、`addVectors`、`addScaledVector`、`sub`、`subScalar`、`subVectors`、`multiply`、`multiplyScalar`、`divide`、`divideScalar`、`applyMatrix3`、`min`、`max`、`clamp`、`clampScalar`、`clampLength`、`floor`、`ceil`、`round`、`roundToZero`、`negate`、`dot`、`cross`、`lengthSq`、`length`、`manhattanLength`、`normalize`、`angle`、`angleTo`、`distanceTo`、`distanceToSquared`、`manhattanDistanceTo`、`setLength`、`lerp`、`lerpVectors`、`equals`、`fromArray`、`toArray`、`fromBufferAttribute`、`rotateAround`、`random`、`undefined`。
  `constructor`：function Object() { [native code] }；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`copy`：复制自身状态；需注意资源引用与深复制边界。

  访问器分别记录（kind:name，避免同名覆盖）：`get:width`：只读返回 this.x；此 getter 不执行对应 setter 的写入或更新通知；`set:width`：将输入值写入 this.x，实际变更发生在 setter 中；`get:height`：只读返回 this.y；此 getter 不执行对应 setter 的写入或更新通知；`set:height`：将输入值写入 this.y，实际变更发生在 setter 中。

- `Quaternion`：四元数旋转，支持归一化、乘法和球面插值。方法：`constructor`、`slerpFlat`、`multiplyQuaternionsFlat`、`get:x`、`get:y`、`get:z`、`get:w`、`set`、`clone`、`copy`、`setFromEuler`、`setFromAxisAngle`、`setFromRotationMatrix`、`setFromUnitVectors`、`angleTo`、`rotateTowards`、`identity`、`invert`、`conjugate`、`dot`、`lengthSq`、`length`、`normalize`、`multiply`、`premultiply`、`multiplyQuaternions`、`slerp`、`slerpQuaternions`、`random`、`equals`、`fromArray`、`toArray`、`fromBufferAttribute`、`toJSON`、`_onChange`、`_onChangeCallback`、`undefined`。
  `constructor`：function Object() { [native code] }；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

  访问器分别记录（kind:name，避免同名覆盖）：`get:x`：只读返回 this._x；此 getter 不执行对应 setter 的写入或更新通知；`set:x`：写入 _x，随后调用 _onChangeCallback 通知旋转状态变化；`get:y`：只读返回 this._y；此 getter 不执行对应 setter 的写入或更新通知；`set:y`：写入 _y，随后调用 _onChangeCallback 通知旋转状态变化；`get:z`：只读返回 this._z；此 getter 不执行对应 setter 的写入或更新通知；`set:z`：写入 _z，随后调用 _onChangeCallback 通知旋转状态变化；`get:w`：只读返回 this._w；此 getter 不执行对应 setter 的写入或更新通知；`set:w`：写入 _w，随后调用 _onChangeCallback 通知旋转状态变化。

- `Vector3`：3 维向量的算术、归一化、插值和坐标变换。方法：`constructor`、`set`、`setScalar`、`setX`、`setY`、`setZ`、`setComponent`、`getComponent`、`clone`、`copy`、`add`、`addScalar`、`addVectors`、`addScaledVector`、`sub`、`subScalar`、`subVectors`、`multiply`、`multiplyScalar`、`multiplyVectors`、`applyEuler`、`applyAxisAngle`、`applyMatrix3`、`applyNormalMatrix`、`applyMatrix4`、`applyQuaternion`、`project`、`unproject`、`transformDirection`、`divide`、`divideScalar`、`min`、`max`、`clamp`、`clampScalar`、`clampLength`、`floor`、`ceil`、`round`、`roundToZero`、`negate`、`dot`、`lengthSq`、`length`、`manhattanLength`、`normalize`、`setLength`、`lerp`、`lerpVectors`、`cross`、`crossVectors`、`projectOnVector`、`projectOnPlane`、`reflect`、`angleTo`、`distanceTo`、`distanceToSquared`、`manhattanDistanceTo`、`setFromSpherical`、`setFromSphericalCoords`、`setFromCylindrical`、`setFromCylindricalCoords`、`setFromMatrixPosition`、`setFromMatrixScale`、`setFromMatrixColumn`、`setFromMatrix3Column`、`setFromEuler`、`setFromColor`、`equals`、`fromArray`、`toArray`、`fromBufferAttribute`、`random`、`randomDirection`、`undefined`。
  `constructor`：function Object() { [native code] }；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `Matrix3`：3 阶矩阵的乘法、行列式、求逆和变换构造。方法：`constructor`、`set`、`identity`、`copy`、`extractBasis`、`setFromMatrix4`、`multiply`、`premultiply`、`multiplyMatrices`、`multiplyScalar`、`determinant`、`invert`、`transpose`、`getNormalMatrix`、`transposeIntoArray`、`setUvTransform`、`scale`、`rotate`、`translate`、`makeTranslation`、`makeRotation`、`makeScale`、`equals`、`fromArray`、`toArray`、`clone`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定。

- `ImageUtils`：图像像素处理及颜色空间转换。方法：`getDataURL`、`sRGBToLinear`。

- `Source`：共享纹理图像的数据源及更新版本。方法：`constructor`、`getSize`、`set:needsUpdate`、`toJSON`。
  `constructor`：function Object() { [native code] }；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

  访问器分别记录（kind:name，避免同名覆盖）：`set:needsUpdate`：仅输入 true 时递增 version，标记资源需要重新上传或刷新。

- `Texture`：纹理采样参数、源图像和 GPU 更新版本生命周期。方法：`constructor`、`get:width`、`get:height`、`get:depth`、`get:image`、`updateMatrix`、`addUpdateRange`、`clearUpdateRanges`、`clone`、`copy`、`setValues`、`toJSON`、`dispose`、`transformUv`、`set:needsUpdate`、`set:needsPMREMUpdate`。
  `constructor`：function Object() { [native code] }；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

  访问器分别记录（kind:name，避免同名覆盖）：`get:width`：只读返回 this.source.getSize(Fr).x；此 getter 不执行对应 setter 的写入或更新通知；`get:height`：只读返回 this.source.getSize(Fr).y；此 getter 不执行对应 setter 的写入或更新通知；`get:depth`：只读返回 this.source.getSize(Fr).z；此 getter 不执行对应 setter 的写入或更新通知；`get:image`：只读返回 this.source.data；此 getter 不执行对应 setter 的写入或更新通知；`set:image`：将输入值写入 this.source.data，实际变更发生在 setter 中；`set:needsUpdate`：仅输入 true 时递增 version，标记资源需要重新上传或刷新；`set:needsPMREMUpdate`：仅输入 true 时递增 pmremVersion，标记环境预过滤缓存失效。

- `Vector4`：4 维向量的算术、归一化、插值和坐标变换。方法：`constructor`、`get:width`、`get:height`、`set`、`setScalar`、`setX`、`setY`、`setZ`、`setW`、`setComponent`、`getComponent`、`clone`、`copy`、`add`、`addScalar`、`addVectors`、`addScaledVector`、`sub`、`subScalar`、`subVectors`、`multiply`、`multiplyScalar`、`applyMatrix4`、`divide`、`divideScalar`、`setAxisAngleFromQuaternion`、`setAxisAngleFromRotationMatrix`、`setFromMatrixPosition`、`min`、`max`、`clamp`、`clampScalar`、`clampLength`、`floor`、`ceil`、`round`、`roundToZero`、`negate`、`dot`、`lengthSq`、`length`、`manhattanLength`、`normalize`、`setLength`、`lerp`、`lerpVectors`、`equals`、`fromArray`、`toArray`、`fromBufferAttribute`、`random`、`undefined`。
  `constructor`：function Object() { [native code] }；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`copy`：复制自身状态；需注意资源引用与深复制边界。

  访问器分别记录（kind:name，避免同名覆盖）：`get:width`：只读返回 this.z；此 getter 不执行对应 setter 的写入或更新通知；`set:width`：将输入值写入 this.z，实际变更发生在 setter 中；`get:height`：只读返回 this.w；此 getter 不执行对应 setter 的写入或更新通知；`set:height`：将输入值写入 this.w，实际变更发生在 setter 中。

- `RenderTarget`： 离屏颜色/深度附件、尺寸和释放生命周期。方法：`constructor`、`_setTextureOptions`、`get:texture`、`get:depthTexture`、`setSize`、`clone`、`copy`、`dispose`。
  `constructor`：function Object() { [native code] }；`setSize`：更新像素尺寸及关联目标；后处理链需要同步所有通道；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`copy`：复制自身状态；需注意资源引用与深复制边界；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

  访问器分别记录（kind:name，避免同名覆盖）：`get:texture`：只读返回 this.textures[0]；此 getter 不执行对应 setter 的写入或更新通知；`set:texture`：将输入值写入 this.textures[0]，实际变更发生在 setter 中；`set:depthTexture`：写入深度纹理；先解除旧纹理 renderTarget 关联，再为新纹理设置反向关联；`get:depthTexture`：只读返回 this._depthTexture；此 getter 不执行对应 setter 的写入或更新通知。

- `WebGLRenderTarget`：WebGL 离屏颜色/深度附件、尺寸和释放生命周期。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `DataArrayTexture`：DataArray 纹理数据布局、格式和上传生命周期。方法：`constructor`、`addLayerUpdate`、`clearLayerUpdates`。
  `constructor`：function Object() { [native code] }。

- `WebGLArrayRenderTarget`：WebGLArray 离屏颜色/深度附件、尺寸和释放生命周期。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `Data3DTexture`：Data3D 纹理数据布局、格式和上传生命周期。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `WebGL3DRenderTarget`：WebGL3D 离屏颜色/深度附件、尺寸和释放生命周期。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `Matrix4`：4 阶矩阵的乘法、行列式、求逆和变换构造。方法：`constructor`、`set`、`identity`、`clone`、`copy`、`copyPosition`、`setFromMatrix3`、`extractBasis`、`makeBasis`、`extractRotation`、`makeRotationFromEuler`、`makeRotationFromQuaternion`、`lookAt`、`multiply`、`premultiply`、`multiplyMatrices`、`multiplyScalar`、`determinant`、`determinantAffine`、`transpose`、`setPosition`、`invert`、`scale`、`getMaxScaleOnAxis`、`makeTranslation`、`makeRotationX`、`makeRotationY`、`makeRotationZ`、`makeRotationAxis`、`makeScale`、`makeShear`、`compose`、`decompose`、`makePerspective`、`makeOrthographic`、`equals`、`fromArray`、`toArray`。
  `constructor`：function Object() { [native code] }；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `Euler`：按旋转顺序表示欧拉角并与矩阵/四元数互转。方法：`constructor`、`get:x`、`get:y`、`get:z`、`get:order`、`set`、`clone`、`copy`、`setFromRotationMatrix`、`setFromQuaternion`、`setFromVector3`、`reorder`、`equals`、`fromArray`、`toArray`、`_onChange`、`_onChangeCallback`、`undefined`。
  `constructor`：function Object() { [native code] }；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`copy`：复制自身状态；需注意资源引用与深复制边界。

  访问器分别记录（kind:name，避免同名覆盖）：`get:x`：只读返回 this._x；此 getter 不执行对应 setter 的写入或更新通知；`set:x`：写入 _x，随后调用 _onChangeCallback 通知旋转状态变化；`get:y`：只读返回 this._y；此 getter 不执行对应 setter 的写入或更新通知；`set:y`：写入 _y，随后调用 _onChangeCallback 通知旋转状态变化；`get:z`：只读返回 this._z；此 getter 不执行对应 setter 的写入或更新通知；`set:z`：写入 _z，随后调用 _onChangeCallback 通知旋转状态变化；`get:order`：只读返回 this._order；此 getter 不执行对应 setter 的写入或更新通知；`set:order`：写入 _order，随后调用 _onChangeCallback 通知旋转状态变化。

- `Layers`：按位掩码控制对象与相机的可见层匹配。方法：`constructor`、`set`、`enable`、`enableAll`、`toggle`、`disable`、`disableAll`、`test`、`isEnabled`。
  `constructor`：function Object() { [native code] }。

- `Object3D`：场景图节点；管理父子关系、局部/世界矩阵和递归序列化。方法：`constructor`、`onBeforeShadow`、`onAfterShadow`、`onBeforeRender`、`onAfterRender`、`applyMatrix4`、`applyQuaternion`、`setRotationFromAxisAngle`、`setRotationFromEuler`、`setRotationFromMatrix`、`setRotationFromQuaternion`、`rotateOnAxis`、`rotateOnWorldAxis`、`rotateX`、`rotateY`、`rotateZ`、`translateOnAxis`、`translateX`、`translateY`、`translateZ`、`localToWorld`、`worldToLocal`、`lookAt`、`add`、`remove`、`removeFromParent`、`clear`、`attach`、`getObjectById`、`getObjectByName`、`getObjectByProperty`、`getObjectsByProperty`、`getWorldPosition`、`getWorldQuaternion`、`getWorldScale`、`getWorldDirection`、`raycast`、`traverse`、`traverseVisible`、`traverseAncestors`、`updateMatrix`、`updateMatrixWorld`、`updateWorldMatrix`、`toJSON`、`clone`、`copy`。
  `constructor`：function Object() { [native code] }；`raycast`：在几何/对象局部空间做相交测试并将命中结果变换回世界坐标；`updateMatrixWorld`：传播父级世界矩阵；matrixWorldNeedsUpdate 控制失效，递归更新子节点；`updateWorldMatrix`：按参数选择先更新祖先或继续更新后代，避免使用过期世界变换；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `Group`：将多个场景节点组织为共同变换的组。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `WebXRController`：维护 XR 目标射线、握柄、手关节空间及连接事件。方法：`constructor`、`getHandSpace`、`getTargetRaySpace`、`getGripSpace`、`dispatchEvent`、`connect`、`disconnect`、`update`、`_getHandJoint`。
  `constructor`：function Object() { [native code] }；`update`：按当前时间或场景状态推进对象并维护缓存失效。

- `Color`：在线性/显示颜色空间间转换并执行颜色运算。方法：`constructor`、`set`、`setScalar`、`setHex`、`setRGB`、`setHSL`、`setStyle`、`setColorName`、`clone`、`copy`、`copySRGBToLinear`、`copyLinearToSRGB`、`convertSRGBToLinear`、`convertLinearToSRGB`、`getHex`、`getHexString`、`getHSL`、`getRGB`、`getStyle`、`offsetHSL`、`add`、`addColors`、`addScalar`、`sub`、`multiply`、`multiplyScalar`、`lerp`、`lerpColors`、`lerpHSL`、`setFromVector3`、`applyMatrix3`、`equals`、`fromArray`、`toArray`、`fromBufferAttribute`、`toJSON`、`undefined`。
  `constructor`：function Object() { [native code] }；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `FogExp2`：按密度指数平方衰减的场景雾。方法：`constructor`、`clone`、`toJSON`。
  `constructor`：function Object() { [native code] }；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `Fog`：按近远距离线性衰减的场景雾。方法：`constructor`、`clone`、`toJSON`。
  `constructor`：function Object() { [native code] }；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `Scene`：根场景容器，维护环境、背景、雾和材质覆盖。方法：`constructor`、`copy`、`toJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `Triangle`：三角形重心坐标、法线、面积和最近点计算。方法：`constructor`、`getNormal`、`getBarycoord`、`containsPoint`、`getInterpolation`、`getInterpolatedAttribute`、`isFrontFacing`、`set`、`setFromPointsAndIndices`、`setFromAttributeAndIndices`、`clone`、`copy`、`getArea`、`getMidpoint`、`getPlane`、`intersectsBox`、`closestPointToPoint`、`equals`。
  `constructor`：function Object() { [native code] }；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `Box3`：三维轴对齐包围盒，从对象顶点推导边界。方法：`constructor`、`set`、`setFromArray`、`setFromBufferAttribute`、`setFromPoints`、`setFromCenterAndSize`、`setFromObject`、`clone`、`copy`、`makeEmpty`、`isEmpty`、`getCenter`、`getSize`、`expandByPoint`、`expandByVector`、`expandByScalar`、`expandByObject`、`containsPoint`、`containsBox`、`getParameter`、`intersectsBox`、`intersectsSphere`、`intersectsPlane`、`intersectsTriangle`、`clampPoint`、`distanceToPoint`、`getBoundingSphere`、`intersect`、`union`、`applyMatrix4`、`translate`、`equals`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `DataUtils`：浮点与半精度浮点数转换。方法：`toHalfFloat`、`fromHalfFloat`。

- `BufferAttribute`：类型化数组顶点属性；管理归一化、更新范围和 GPU 上传版本。方法：`constructor`、`onUploadCallback`、`set:needsUpdate`、`setUsage`、`addUpdateRange`、`clearUpdateRanges`、`copy`、`copyAt`、`copyArray`、`applyMatrix3`、`applyMatrix4`、`applyNormalMatrix`、`transformDirection`、`set`、`getComponent`、`setComponent`、`getX`、`setX`、`getY`、`setY`、`getZ`、`setZ`、`getW`、`setW`、`setXY`、`setXYZ`、`setXYZW`、`onUpload`、`clone`、`toJSON`、`dispose`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

  访问器分别记录（kind:name，避免同名覆盖）：`set:needsUpdate`：仅输入 true 时递增 version，标记资源需要重新上传或刷新。

- `Int8BufferAttribute`：Int8 类型顶点缓冲属性；继承数组访问与更新范围管理。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `Uint8BufferAttribute`：Uint8 类型顶点缓冲属性；继承数组访问与更新范围管理。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `Uint8ClampedBufferAttribute`：Uint8Clamped 类型顶点缓冲属性；继承数组访问与更新范围管理。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `Int16BufferAttribute`：Int16 类型顶点缓冲属性；继承数组访问与更新范围管理。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `Uint16BufferAttribute`：Uint16 类型顶点缓冲属性；继承数组访问与更新范围管理。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `Int32BufferAttribute`：Int32 类型顶点缓冲属性；继承数组访问与更新范围管理。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `Uint32BufferAttribute`：Uint32 类型顶点缓冲属性；继承数组访问与更新范围管理。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `Float16BufferAttribute`：Float16 类型顶点缓冲属性；继承数组访问与更新范围管理。方法：`constructor`、`getX`、`setX`、`getY`、`setY`、`getZ`、`setZ`、`getW`、`setW`、`setXY`、`setXYZ`、`setXYZW`。
  `constructor`：function Object() { [native code] }。

- `Float32BufferAttribute`：Float32 类型顶点缓冲属性；继承数组访问与更新范围管理。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `Sphere`：包围球，支持扩展、相交和矩阵变换。方法：`constructor`、`set`、`setFromPoints`、`copy`、`isEmpty`、`makeEmpty`、`containsPoint`、`distanceToPoint`、`intersectsSphere`、`intersectsBox`、`intersectsPlane`、`clampPoint`、`getBoundingBox`、`applyMatrix4`、`translate`、`expandByPoint`、`union`、`equals`、`clone`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `BufferGeometry`：管理顶点属性、索引、分组、包围体和几何变换。方法：`constructor`、`getIndex`、`setIndex`、`setIndirect`、`getIndirect`、`getAttribute`、`setAttribute`、`deleteAttribute`、`hasAttribute`、`addGroup`、`clearGroups`、`setDrawRange`、`applyMatrix4`、`applyQuaternion`、`rotateX`、`rotateY`、`rotateZ`、`translate`、`scale`、`lookAt`、`center`、`setFromPoints`、`computeBoundingBox`、`computeBoundingSphere`、`computeTangents`、`computeVertexNormals`、`normalizeNormals`、`toNonIndexed`、`toJSON`、`clone`、`copy`、`dispose`。
  `constructor`：function Object() { [native code] }；`computeBoundingBox`：扫描位置和 morph 属性得到轴对齐包围盒；`computeBoundingSphere`：从顶点和 morph 属性建立包围球；变化后需再次计算；`computeVertexNormals`：累加三角面法线后归一化，索引/非索引路径不同；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`copy`：复制自身状态；需注意资源引用与深复制边界；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

- `InterleavedBuffer`：多个顶点属性共用的交错数组与步长。方法：`constructor`、`onUploadCallback`、`set:needsUpdate`、`setUsage`、`addUpdateRange`、`clearUpdateRanges`、`copy`、`copyAt`、`set`、`clone`、`onUpload`、`toJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

  访问器分别记录（kind:name，避免同名覆盖）：`set:needsUpdate`：仅输入 true 时递增 version，标记资源需要重新上传或刷新。

- `InterleavedBufferAttribute`：以 offset/stride 读取交错缓冲的单个顶点属性。方法：`constructor`、`get:count`、`get:array`、`set:needsUpdate`、`applyMatrix4`、`applyNormalMatrix`、`transformDirection`、`getComponent`、`setComponent`、`setX`、`setY`、`setZ`、`setW`、`getX`、`getY`、`getZ`、`getW`、`setXY`、`setXYZ`、`setXYZW`、`clone`、`toJSON`。
  `constructor`：function Object() { [native code] }；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

  访问器分别记录（kind:name，避免同名覆盖）：`get:count`：只读返回 this.data.count；此 getter 不执行对应 setter 的写入或更新通知；`get:array`：只读返回 this.data.array；此 getter 不执行对应 setter 的写入或更新通知；`set:needsUpdate`：将 needsUpdate 写给共享 data 缓冲，委托其版本更新。

- `Material`：材质公共渲染状态、版本更新和资源释放事件。方法：`constructor`、`get:alphaTest`、`onBeforeRender`、`onBeforeCompile`、`customProgramCacheKey`、`setValues`、`toJSON`、`fromJSON`、`clone`、`copy`、`dispose`、`set:needsUpdate`。
  `constructor`：function Object() { [native code] }；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`copy`：复制自身状态；需注意资源引用与深复制边界；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

  访问器分别记录（kind:name，避免同名覆盖）：`get:alphaTest`：只读返回 this._alphaTest；此 getter 不执行对应 setter 的写入或更新通知；`set:alphaTest`：写入 _alphaTest；当正值启用状态切换时递增 version 使 shader 特性失效；`set:needsUpdate`：仅输入 true 时递增 version，标记资源需要重新上传或刷新。

- `SpriteMaterial`：面向相机精灵颜色、旋转和贴图材质；其参数由渲染器选择 shader 特性并上传 uniform。方法：`constructor`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `Sprite`：始终朝向相机的二维精灵对象及射线求交。方法：`constructor`、`raycast`、`copy`。
  `constructor`：function Object() { [native code] }；`raycast`：在几何/对象局部空间做相交测试并将命中结果变换回世界坐标；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `LOD`：依据相机距离与迟滞阈值选择细节层级。方法：`constructor`、`copy`、`addLevel`、`removeLevel`、`getCurrentLevel`、`getObjectForDistance`、`raycast`、`update`、`toJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`raycast`：在几何/对象局部空间做相交测试并将命中结果变换回世界坐标；`update`：按当前时间或场景状态推进对象并维护缓存失效；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `Ray`：射线与球、平面、盒、三角形的相交及距离计算。方法：`constructor`、`set`、`copy`、`at`、`lookAt`、`recast`、`closestPointToPoint`、`distanceToPoint`、`distanceSqToPoint`、`distanceSqToSegment`、`intersectSphere`、`intersectsSphere`、`distanceToPlane`、`intersectPlane`、`intersectsPlane`、`intersectBox`、`intersectsBox`、`intersectTriangle`、`applyMatrix4`、`equals`、`clone`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定。

- `MeshBasicMaterial`：无光照基础颜色/贴图材质；其参数由渲染器选择 shader 特性并上传 uniform。方法：`constructor`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `Mesh`：三角网格场景对象；绑定几何材质并执行射线求交。方法：`constructor`、`copy`、`updateMorphTargets`、`getVertexPosition`、`raycast`、`_computeIntersections`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`raycast`：在几何/对象局部空间做相交测试并将命中结果变换回世界坐标。

- `SkinnedMesh`：使用骨骼权重和绑定矩阵变形的网格。方法：`constructor`、`computeBoundingBox`、`computeBoundingSphere`、`copy`、`raycast`、`getVertexPosition`、`bind`、`pose`、`normalizeSkinWeights`、`updateMatrixWorld`、`applyBoneTransform`。
  `constructor`：function Object() { [native code] }；`computeBoundingBox`：扫描位置和 morph 属性得到轴对齐包围盒；`computeBoundingSphere`：从顶点和 morph 属性建立包围球；变化后需再次计算；`copy`：复制自身状态；需注意资源引用与深复制边界；`raycast`：在几何/对象局部空间做相交测试并将命中结果变换回世界坐标；`updateMatrixWorld`：传播父级世界矩阵；matrixWorldNeedsUpdate 控制失效，递归更新子节点。

- `Bone`：骨架层级中的局部变换节点。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `DataTexture`：Data 纹理数据布局、格式和上传生命周期。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `Skeleton`：骨骼列表、逆绑定矩阵和骨骼纹理上传。方法：`constructor`、`init`、`calculateInverses`、`pose`、`update`、`clone`、`computeBoneTexture`、`getBoneByName`、`dispose`、`fromJSON`、`toJSON`。
  `constructor`：function Object() { [native code] }；`init`：初始化延迟资源和运行时能力；必须先完成再使用依赖资源的方法；`update`：按当前时间或场景状态推进对象并维护缓存失效；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `InstancedBufferAttribute`：Instanced 类型顶点缓冲属性；继承数组访问与更新范围管理。方法：`constructor`、`copy`、`toJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `InstancedMesh`：共享几何/材质，以实例矩阵和颜色批量绘制网格。方法：`constructor`、`computeBoundingBox`、`computeBoundingSphere`、`copy`、`getColorAt`、`getMatrixAt`、`getMorphAt`、`raycast`、`setColorAt`、`setMatrixAt`、`setMorphAt`、`updateMorphTargets`、`dispose`。
  `constructor`：function Object() { [native code] }；`computeBoundingBox`：扫描位置和 morph 属性得到轴对齐包围盒；`computeBoundingSphere`：从顶点和 morph 属性建立包围球；变化后需再次计算；`copy`：复制自身状态；需注意资源引用与深复制边界；`raycast`：在几何/对象局部空间做相交测试并将命中结果变换回世界坐标；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

- `Plane`：Hessian 法线/常数形式的平面与距离、投影和变换。方法：`constructor`、`set`、`setComponents`、`setFromNormalAndCoplanarPoint`、`setFromCoplanarPoints`、`copy`、`normalize`、`negate`、`distanceToPoint`、`distanceToSphere`、`projectPoint`、`intersectLine`、`intersectsLine`、`intersectsBox`、`intersectsSphere`、`coplanarPoint`、`applyMatrix4`、`translate`、`equals`、`clone`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定。

- `Frustum`：提取投影矩阵的裁剪平面并测试空间对象。方法：`constructor`、`set`、`copy`、`setFromProjectionMatrix`、`intersectsObject`、`intersectsSprite`、`intersectsSphere`、`intersectsBox`、`containsPoint`、`clone`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定。

- `FrustumArray`：维护多视锥体的联合可见性测试。方法：`constructor`、`setFromArrayCamera`、`intersectsObject`、`intersectsSprite`、`intersectsSphere`、`intersectsBox`、`containsPoint`、`copy`、`clone`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定。

- `MultiDrawRenderList`：批量网格的多绘制调用计数和偏移列表。方法：`constructor`、`push`、`reset`。
  `constructor`：function Object() { [native code] }。

- `BatchedMesh`：将几何打包到共享缓冲，以间接/多重绘制降低调用数。方法：`constructor`、`get:maxInstanceCount`、`get:instanceCount`、`get:unusedVertexCount`、`get:unusedIndexCount`、`_initMatricesTexture`、`_initIndirectTexture`、`_initColorsTexture`、`_initializeGeometry`、`_validateGeometry`、`validateInstanceId`、`validateGeometryId`、`setCustomSort`、`computeBoundingBox`、`computeBoundingSphere`、`addInstance`、`addGeometry`、`setGeometryAt`、`deleteGeometry`、`deleteInstance`、`optimize`、`getBoundingBoxAt`、`getBoundingSphereAt`、`setMatrixAt`、`getMatrixAt`、`setColorAt`、`getColorAt`、`setVisibleAt`、`getVisibleAt`、`setGeometryIdAt`、`getGeometryIdAt`、`getGeometryRangeAt`、`setInstanceCount`、`setGeometrySize`、`raycast`、`copy`、`dispose`、`onBeforeRender`、`onBeforeShadow`。
  `constructor`：function Object() { [native code] }；`computeBoundingBox`：扫描位置和 morph 属性得到轴对齐包围盒；`computeBoundingSphere`：从顶点和 morph 属性建立包围球；变化后需再次计算；`raycast`：在几何/对象局部空间做相交测试并将命中结果变换回世界坐标；`copy`：复制自身状态；需注意资源引用与深复制边界；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

  访问器分别记录（kind:name，避免同名覆盖）：`get:maxInstanceCount`：只读返回 this._maxInstanceCount；此 getter 不执行对应 setter 的写入或更新通知；`get:instanceCount`：只读返回 this._instanceInfo.length - this._availableInstanceIds.length；此 getter 不执行对应 setter 的写入或更新通知；`get:unusedVertexCount`：只读返回 this._maxVertexCount - this._nextVertexStart；此 getter 不执行对应 setter 的写入或更新通知；`get:unusedIndexCount`：只读返回 this._maxIndexCount - this._nextIndexStart；此 getter 不执行对应 setter 的写入或更新通知。

- `LineBasicMaterial`：实色/贴图线段材质；其参数由渲染器选择 shader 特性并上传 uniform。方法：`constructor`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `Line`：折线对象及射线距离测试。方法：`constructor`、`copy`、`computeLineDistances`、`raycast`、`updateMorphTargets`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`raycast`：在几何/对象局部空间做相交测试并将命中结果变换回世界坐标。

- `LineSegments`：独立线段对形式的线对象。方法：`constructor`、`computeLineDistances`。
  `constructor`：function Object() { [native code] }。

- `LineLoop`：闭合首尾顶点的线对象。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `PointsMaterial`：点尺寸衰减与点精灵材质；其参数由渲染器选择 shader 特性并上传 uniform。方法：`constructor`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `Points`：点精灵几何对象及射线距离测试。方法：`constructor`、`copy`、`raycast`、`updateMorphTargets`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`raycast`：在几何/对象局部空间做相交测试并将命中结果变换回世界坐标。

- `VideoTexture`：Video 纹理数据布局、格式和上传生命周期。方法：`constructor`、`clone`、`update`、`dispose`。
  `constructor`：function Object() { [native code] }；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`update`：按当前时间或场景状态推进对象并维护缓存失效；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

- `VideoFrameTexture`：VideoFrame 纹理数据布局、格式和上传生命周期。方法：`constructor`、`update`、`clone`、`setFrame`。
  `constructor`：function Object() { [native code] }；`update`：按当前时间或场景状态推进对象并维护缓存失效；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定。

- `FramebufferTexture`：Framebuffer 纹理数据布局、格式和上传生命周期。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `CompressedTexture`：Compressed 纹理数据布局、格式和上传生命周期。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `CompressedArrayTexture`：CompressedArray 纹理数据布局、格式和上传生命周期。方法：`constructor`、`addLayerUpdate`、`clearLayerUpdates`。
  `constructor`：function Object() { [native code] }。

- `CompressedCubeTexture`：CompressedCube 纹理数据布局、格式和上传生命周期。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `CubeTexture`：Cube 纹理数据布局、格式和上传生命周期。方法：`constructor`、`get:images`。
  `constructor`：function Object() { [native code] }。

  访问器分别记录（kind:name，避免同名覆盖）：`get:images`：只读返回 this.image；此 getter 不执行对应 setter 的写入或更新通知；`set:images`：将输入值写入 this.image，实际变更发生在 setter 中。

- `CanvasTexture`：Canvas 纹理数据布局、格式和上传生命周期。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `HTMLTexture`：HTML 纹理数据布局、格式和上传生命周期。方法：`constructor`、`dispose`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

- `DepthTexture`：Depth 纹理数据布局、格式和上传生命周期。方法：`constructor`、`copy`、`toJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `CubeDepthTexture`：CubeDepth 纹理数据布局、格式和上传生命周期。方法：`constructor`、`get:images`。
  `constructor`：function Object() { [native code] }。

  访问器分别记录（kind:name，避免同名覆盖）：`get:images`：只读返回 this.image；此 getter 不执行对应 setter 的写入或更新通知；`set:images`：将输入值写入 this.image，实际变更发生在 setter 中。

- `ExternalTexture`：External 纹理数据布局、格式和上传生命周期。方法：`constructor`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `BoxGeometry`：Box 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`copy`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `CapsuleGeometry`：Capsule 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`copy`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `CircleGeometry`：Circle 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`copy`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `CylinderGeometry`：Cylinder 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`copy`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `ConeGeometry`：Cone 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`fromJSON`。
  `constructor`：function Object() { [native code] }。

- `PolyhedronGeometry`：Polyhedron 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`copy`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `DodecahedronGeometry`：Dodecahedron 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`fromJSON`。
  `constructor`：function Object() { [native code] }。

- `EdgesGeometry`：Edges 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `Curve`：参数曲线基类；弧长采样、切线及 Frenet 标架。方法：`constructor`、`getPoint`、`getPointAt`、`getPoints`、`getSpacedPoints`、`getLength`、`getLengths`、`updateArcLengths`、`getUtoTmapping`、`getTangent`、`getTangentAt`、`computeFrenetFrames`、`clone`、`copy`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`getPoint`：按参数 t 计算曲线位置，通常复用可选目标向量；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `EllipseCurve`：EllipseCurve 参数曲线的点/切线求值及端点控制。方法：`constructor`、`getPoint`、`copy`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`getPoint`：按参数 t 计算曲线位置，通常复用可选目标向量；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `ArcCurve`：ArcCurve 参数曲线的点/切线求值及端点控制。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `CatmullRomCurve3`：CatmullRomCurve3 参数曲线的点/切线求值及端点控制。方法：`constructor`、`getPoint`、`copy`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`getPoint`：按参数 t 计算曲线位置，通常复用可选目标向量；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `CubicBezierCurve`：CubicBezierCurve 参数曲线的点/切线求值及端点控制。方法：`constructor`、`getPoint`、`copy`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`getPoint`：按参数 t 计算曲线位置，通常复用可选目标向量；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `CubicBezierCurve3`：CubicBezierCurve3 参数曲线的点/切线求值及端点控制。方法：`constructor`、`getPoint`、`copy`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`getPoint`：按参数 t 计算曲线位置，通常复用可选目标向量；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `LineCurve`：LineCurve 参数曲线的点/切线求值及端点控制。方法：`constructor`、`getPoint`、`getPointAt`、`getTangent`、`getTangentAt`、`copy`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`getPoint`：按参数 t 计算曲线位置，通常复用可选目标向量；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `LineCurve3`：LineCurve3 参数曲线的点/切线求值及端点控制。方法：`constructor`、`getPoint`、`getPointAt`、`getTangent`、`getTangentAt`、`copy`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`getPoint`：按参数 t 计算曲线位置，通常复用可选目标向量；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `QuadraticBezierCurve`：QuadraticBezierCurve 参数曲线的点/切线求值及端点控制。方法：`constructor`、`getPoint`、`copy`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`getPoint`：按参数 t 计算曲线位置，通常复用可选目标向量；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `QuadraticBezierCurve3`：QuadraticBezierCurve3 参数曲线的点/切线求值及端点控制。方法：`constructor`、`getPoint`、`copy`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`getPoint`：按参数 t 计算曲线位置，通常复用可选目标向量；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `SplineCurve`：SplineCurve 参数曲线的点/切线求值及端点控制。方法：`constructor`、`getPoint`、`copy`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`getPoint`：按参数 t 计算曲线位置，通常复用可选目标向量；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `CurvePath`：将多段曲线串成按累计弧长采样的路径。方法：`constructor`、`add`、`closePath`、`getPoint`、`getLength`、`updateArcLengths`、`getCurveLengths`、`getSpacedPoints`、`getPoints`、`copy`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`getPoint`：按参数 t 计算曲线位置，通常复用可选目标向量；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `Path`：通过绘图命令构建二维曲线路径。方法：`constructor`、`setFromPoints`、`moveTo`、`lineTo`、`quadraticCurveTo`、`bezierCurveTo`、`splineThru`、`arc`、`absarc`、`ellipse`、`absellipse`、`copy`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `Shape`：带内部孔洞的二维封闭轮廓。方法：`constructor`、`getPointsHoles`、`extractPoints`、`copy`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `Earcut`：基于耳切法和空间索引对带孔多边形三角化。方法：`triangulate`。

- `ShapeUtils`：二维轮廓面积、方向判断和三角剖分适配。方法：`area`、`isClockWise`、`triangulateShape`。

- `ExtrudeGeometry`：Extrude 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`copy`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `IcosahedronGeometry`：Icosahedron 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`fromJSON`。
  `constructor`：function Object() { [native code] }。

- `LatheGeometry`：Lathe 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`copy`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `OctahedronGeometry`：Octahedron 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`fromJSON`。
  `constructor`：function Object() { [native code] }。

- `PlaneGeometry`：Plane 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`copy`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `RingGeometry`：Ring 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`copy`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `ShapeGeometry`：Shape 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`copy`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `SphereGeometry`：Sphere 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`copy`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `TetrahedronGeometry`：Tetrahedron 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`fromJSON`。
  `constructor`：function Object() { [native code] }。

- `TorusGeometry`：Torus 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`copy`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `TorusKnotGeometry`：TorusKnot 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`copy`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `TubeGeometry`：Tube 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`copy`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `WireframeGeometry`：Wireframe 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `ShadowMaterial`：仅显示透明背景上的阴影材质；其参数由渲染器选择 shader 特性并上传 uniform。方法：`constructor`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `ShaderMaterial`：用户 GLSL shader 和自动内置声明材质；其参数由渲染器选择 shader 特性并上传 uniform。方法：`constructor`、`copy`、`toJSON`、`fromJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `RawShaderMaterial`：由用户完全控制 shader 声明材质；其参数由渲染器选择 shader 特性并上传 uniform。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `MeshStandardMaterial`：金属度/粗糙度 PBR材质；其参数由渲染器选择 shader 特性并上传 uniform。方法：`constructor`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `MeshPhysicalMaterial`：增加清漆、透射、虹彩等物理层的 PBR材质；其参数由渲染器选择 shader 特性并上传 uniform。方法：`constructor`、`get:anisotropy`、`get:clearcoat`、`get:iridescence`、`get:dispersion`、`get:sheen`、`get:transmission`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

  访问器分别记录（kind:name，避免同名覆盖）：`get:anisotropy`：只读返回 this._anisotropy；此 getter 不执行对应 setter 的写入或更新通知；`set:anisotropy`：写入 _anisotropy；当正值启用状态切换时递增 version 使 shader 特性失效；`get:clearcoat`：只读返回 this._clearcoat；此 getter 不执行对应 setter 的写入或更新通知；`set:clearcoat`：写入 _clearcoat；当正值启用状态切换时递增 version 使 shader 特性失效；`get:iridescence`：只读返回 this._iridescence；此 getter 不执行对应 setter 的写入或更新通知；`set:iridescence`：写入 _iridescence；当正值启用状态切换时递增 version 使 shader 特性失效；`get:dispersion`：只读返回 this._dispersion；此 getter 不执行对应 setter 的写入或更新通知；`set:dispersion`：写入 _dispersion；当正值启用状态切换时递增 version 使 shader 特性失效；`get:sheen`：只读返回 this._sheen；此 getter 不执行对应 setter 的写入或更新通知；`set:sheen`：写入 _sheen；当正值启用状态切换时递增 version 使 shader 特性失效；`get:transmission`：只读返回 this._transmission；此 getter 不执行对应 setter 的写入或更新通知；`set:transmission`：写入 _transmission；当正值启用状态切换时递增 version 使 shader 特性失效。

- `MeshPhongMaterial`：高光反射 Phong材质；其参数由渲染器选择 shader 特性并上传 uniform。方法：`constructor`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `MeshToonMaterial`：渐变分级卡通光照材质；其参数由渲染器选择 shader 特性并上传 uniform。方法：`constructor`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `MeshNormalMaterial`：法线向量可视化材质；其参数由渲染器选择 shader 特性并上传 uniform。方法：`constructor`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `MeshLambertMaterial`：漫反射 Lambert材质；其参数由渲染器选择 shader 特性并上传 uniform。方法：`constructor`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `MeshDepthMaterial`：将相机深度编码到颜色材质；其参数由渲染器选择 shader 特性并上传 uniform。方法：`constructor`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `MeshDistanceMaterial`：将到参考点的距离编码到颜色以生成点光阴影材质；其参数由渲染器选择 shader 特性并上传 uniform。方法：`constructor`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `MeshMatcapMaterial`：以视空间法线查表采样 Matcap材质；其参数由渲染器选择 shader 特性并上传 uniform。方法：`constructor`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `LineDashedMaterial`：以线距离属性计算虚线材质；其参数由渲染器选择 shader 特性并上传 uniform。方法：`constructor`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `AnimationUtils`：关键帧数据裁剪、排序、扁平化与加法动画转换。方法：`convertArray`、`isTypedArray`、`getKeyframeOrder`、`sortedArray`、`flattenJSON`、`subclip`、`makeClipAdditive`。

- `Interpolant`：查找关键帧区间并提供插值缓存基类。方法：`constructor`、`evaluate`、`getSettings_`、`copySampleValue_`、`interpolate_`、`intervalChanged_`。
  `constructor`：function Object() { [native code] }；`evaluate`：定位关键帧区间并调用插值实现；结果复用内部缓冲；`interpolate_`：在当前时间区间执行特定插值算法。

- `CubicInterpolant`：Cubic 插值算法；对关键帧区间求连续或离散值。方法：`constructor`、`intervalChanged_`、`interpolate_`。
  `constructor`：function Object() { [native code] }；`interpolate_`：在当前时间区间执行特定插值算法。

- `LinearInterpolant`：Linear 插值算法；对关键帧区间求连续或离散值。方法：`constructor`、`interpolate_`。
  `constructor`：function Object() { [native code] }；`interpolate_`：在当前时间区间执行特定插值算法。

- `DiscreteInterpolant`：Discrete 插值算法；对关键帧区间求连续或离散值。方法：`constructor`、`interpolate_`。
  `constructor`：function Object() { [native code] }；`interpolate_`：在当前时间区间执行特定插值算法。

- `BezierInterpolant`：Bezier 插值算法；对关键帧区间求连续或离散值。方法：`interpolate_`。
  `interpolate_`：在当前时间区间执行特定插值算法。

- `KeyframeTrack`： 类型关键帧轨道，约束值表示与插值器选择。方法：`constructor`、`toJSON`、`InterpolantFactoryMethodDiscrete`、`InterpolantFactoryMethodLinear`、`InterpolantFactoryMethodSmooth`、`InterpolantFactoryMethodBezier`、`setInterpolation`、`getInterpolation`、`getValueSize`、`shift`、`scale`、`trim`、`validate`、`optimize`、`clone`。
  `constructor`：function Object() { [native code] }；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定。

- `BooleanKeyframeTrack`：Boolean 类型关键帧轨道，约束值表示与插值器选择。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `ColorKeyframeTrack`：Color 类型关键帧轨道，约束值表示与插值器选择。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `NumberKeyframeTrack`：Number 类型关键帧轨道，约束值表示与插值器选择。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `QuaternionLinearInterpolant`：QuaternionLinear 插值算法；对关键帧区间求连续或离散值。方法：`constructor`、`interpolate_`。
  `constructor`：function Object() { [native code] }；`interpolate_`：在当前时间区间执行特定插值算法。

- `QuaternionKeyframeTrack`：Quaternion 类型关键帧轨道，约束值表示与插值器选择。方法：`constructor`、`InterpolantFactoryMethodLinear`。
  `constructor`：function Object() { [native code] }。

- `StringKeyframeTrack`：String 类型关键帧轨道，约束值表示与插值器选择。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `VectorKeyframeTrack`：Vector 类型关键帧轨道，约束值表示与插值器选择。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `AnimationClip`：命名的关键帧轨道集合与持续时间。方法：`constructor`、`parse`、`toJSON`、`CreateFromMorphTargetSequence`、`findByName`、`CreateClipsFromMorphTargetSequences`、`resetDuration`、`trim`、`validate`、`optimize`、`clone`。
  `constructor`：function Object() { [native code] }；`parse`：把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定。

- `LoadingManager`：聚合加载计数、错误、URL 重写和加载器选择。方法：`constructor`、`get:abortController`。
  `constructor`：function Object() { [native code] }。

  访问器分别记录（kind:name，避免同名覆盖）：`get:abortController`：惰性创建并返回 AbortController；第一次读取会写入 _abortController，不能视为纯只读访问。

- `Loader`：资源加载器通用路径、凭证和请求配置。方法：`constructor`、`load`、`loadAsync`、`parse`、`setCrossOrigin`、`setWithCredentials`、`setPath`、`setResourcePath`、`setRequestHeader`、`abort`。
  `constructor`：function Object() { [native code] }；`load`：发起异步资源获取并交给解析路径；管理加载器回调和错误传播；`parse`：把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调。

- `HttpError`：携带 HTTP 响应信息的资源加载异常。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `FileLoader`：FileLoader 对应资源的请求、解析与缓存协作。方法：`constructor`、`load`、`setResponseType`、`setMimeType`、`abort`。
  `constructor`：function Object() { [native code] }；`load`：发起异步资源获取并交给解析路径；管理加载器回调和错误传播。

- `AnimationLoader`：AnimationLoader 对应资源的请求、解析与缓存协作。方法：`constructor`、`load`、`parse`。
  `constructor`：function Object() { [native code] }；`load`：发起异步资源获取并交给解析路径；管理加载器回调和错误传播；`parse`：把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调。

- `CompressedTextureLoader`：CompressedTextureLoader 对应资源的请求、解析与缓存协作。方法：`constructor`、`load`。
  `constructor`：function Object() { [native code] }；`load`：发起异步资源获取并交给解析路径；管理加载器回调和错误传播。

- `ImageLoader`：ImageLoader 对应资源的请求、解析与缓存协作。方法：`constructor`、`load`。
  `constructor`：function Object() { [native code] }；`load`：发起异步资源获取并交给解析路径；管理加载器回调和错误传播。

- `CubeTextureLoader`：CubeTextureLoader 对应资源的请求、解析与缓存协作。方法：`constructor`、`load`。
  `constructor`：function Object() { [native code] }；`load`：发起异步资源获取并交给解析路径；管理加载器回调和错误传播。

- `DataTextureLoader`：DataTextureLoader 对应资源的请求、解析与缓存协作。方法：`constructor`、`load`、`createDataTexture`、`_applyTexData`。
  `constructor`：function Object() { [native code] }；`load`：发起异步资源获取并交给解析路径；管理加载器回调和错误传播。

- `TextureLoader`：TextureLoader 对应资源的请求、解析与缓存协作。方法：`constructor`、`load`。
  `constructor`：function Object() { [native code] }；`load`：发起异步资源获取并交给解析路径；管理加载器回调和错误传播。

- `Light`： 光源颜色、强度及方向/衰减数据。方法：`constructor`、`dispose`、`copy`、`toJSON`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `HemisphereLight`：Hemisphere 光源颜色、强度及方向/衰减数据。方法：`constructor`、`copy`、`toJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `LightShadow`： 光源阴影相机、贴图和投影矩阵。方法：`constructor`、`getViewportCount`、`getFrustum`、`updateMatrices`、`getViewport`、`getFrameExtents`、`dispose`、`copy`、`clone`、`toJSON`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用；`copy`：复制自身状态；需注意资源引用与深复制边界；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `Camera`： 相机视锥及投影矩阵更新。方法：`constructor`、`get:reversedDepth`、`copy`、`getWorldDirection`、`updateMatrixWorld`、`updateWorldMatrix`、`clone`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`updateMatrixWorld`：传播父级世界矩阵；matrixWorldNeedsUpdate 控制失效，递归更新子节点；`updateWorldMatrix`：按参数选择先更新祖先或继续更新后代，避免使用过期世界变换；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定。

  访问器分别记录（kind:name，避免同名覆盖）：`get:reversedDepth`：只读返回 this._reversedDepth；此 getter 不执行对应 setter 的写入或更新通知。

- `PerspectiveCamera`：透视投影相机；由 fov/aspect/near/far 生成投影矩阵并支持视口偏移。方法：`constructor`、`copy`、`setFocalLength`、`getFocalLength`、`getEffectiveFOV`、`getFilmWidth`、`getFilmHeight`、`getViewBounds`、`getViewSize`、`setViewOffset`、`clearViewOffset`、`updateProjectionMatrix`、`toJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `SpotLightShadow`：Spot 光源阴影相机、贴图和投影矩阵。方法：`constructor`、`updateMatrices`、`copy`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `SpotLight`：Spot 光源颜色、强度及方向/衰减数据。方法：`constructor`、`get:power`、`dispose`、`copy`、`toJSON`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

  访问器分别记录（kind:name，避免同名覆盖）：`get:power`：只读返回 intensity × π，不修改强度；`set:power`：将输入光功率除以 π 后写入 intensity。

- `PointLightShadow`：Point 光源阴影相机、贴图和投影矩阵。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `PointLight`：Point 光源颜色、强度及方向/衰减数据。方法：`constructor`、`get:power`、`dispose`、`copy`、`toJSON`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

  访问器分别记录（kind:name，避免同名覆盖）：`get:power`：只读返回 intensity × 4π，不修改强度；`set:power`：将输入光功率除以 4π 后写入 intensity。

- `OrthographicCamera`：正交投影相机；以左右上下边界和 zoom 生成不随距离缩放的投影。方法：`constructor`、`copy`、`setViewOffset`、`clearViewOffset`、`updateProjectionMatrix`、`toJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `DirectionalLightShadow`：Directional 光源阴影相机、贴图和投影矩阵。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `DirectionalLight`：Directional 光源颜色、强度及方向/衰减数据。方法：`constructor`、`dispose`、`copy`、`toJSON`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `AmbientLight`：Ambient 光源颜色、强度及方向/衰减数据。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `RectAreaLight`：RectArea 光源颜色、强度及方向/衰减数据。方法：`constructor`、`get:power`、`copy`、`toJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

  访问器分别记录（kind:name，避免同名覆盖）：`get:power`：只读返回 intensity × width × height × π；`set:power`：将输入光功率除以 width × height × π 后写入 intensity。

- `SphericalHarmonics3`：九个三阶球谐系数及辐照度求值。方法：`constructor`、`set`、`zero`、`getAt`、`getIrradianceAt`、`add`、`addScaledSH`、`scale`、`lerp`、`equals`、`copy`、`clone`、`fromArray`、`toArray`、`getBasisAt`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定。

- `LightProbe`：以三阶球谐系数表示环境光照探针；按强度缩放并供漫反射间接光计算。方法：`constructor`、`copy`、`toJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `MaterialLoader`：MaterialLoader 对应资源的请求、解析与缓存协作。方法：`constructor`、`load`、`parse`、`setTextures`、`createMaterialFromType`、`registerMaterial`。
  `constructor`：function Object() { [native code] }；`load`：发起异步资源获取并交给解析路径；管理加载器回调和错误传播；`parse`：把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调。

- `LoaderUtils`：解析 URL 基路径、字符串和资源地址。方法：`extractUrlBase`、`resolveURL`。

- `InstancedBufferGeometry`：InstancedBuffer 几何生成器；构建 position/normal/uv 属性及三角索引。方法：`constructor`、`copy`、`toJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `BufferGeometryLoader`：BufferGeometryLoader 对应资源的请求、解析与缓存协作。方法：`constructor`、`load`、`parse`。
  `constructor`：function Object() { [native code] }；`load`：发起异步资源获取并交给解析路径；管理加载器回调和错误传播；`parse`：把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调。

- `ObjectLoader`：ObjectLoader 对应资源的请求、解析与缓存协作。方法：`constructor`、`load`、`loadAsync`、`parse`、`parseAsync`、`registerGeometry`、`parseShapes`、`parseSkeletons`、`parseGeometries`、`parseMaterials`、`parseAnimations`、`parseImages`、`parseImagesAsync`、`parseTextures`、`parseObject`、`bindSkeletons`、`bindLightTargets`。
  `constructor`：function Object() { [native code] }；`load`：发起异步资源获取并交给解析路径；管理加载器回调和错误传播；`parse`：把资源字节/JSON转为运行时对象；依赖解析、缓存和错误回调。

- `ImageBitmapLoader`：ImageBitmapLoader 对应资源的请求、解析与缓存协作。方法：`constructor`、`setOptions`、`load`、`abort`。
  `constructor`：function Object() { [native code] }；`load`：发起异步资源获取并交给解析路径；管理加载器回调和错误传播。

- `AudioContext`：共享 Web Audio 上下文访问入口。方法：`getContext`、`setContext`。

- `AudioLoader`：AudioLoader 对应资源的请求、解析与缓存协作。方法：`constructor`、`load`。
  `constructor`：function Object() { [native code] }；`load`：发起异步资源获取并交给解析路径；管理加载器回调和错误传播。

- `StereoCamera`：生成左右眼视差相机。方法：`constructor`、`update`。
  `constructor`：function Object() { [native code] }；`update`：按当前时间或场景状态推进对象并维护缓存失效。

- `CubeCamera`：从六个方向采集环境立方纹理。方法：`constructor`、`updateCoordinateSystem`、`update`。
  `constructor`：function Object() { [native code] }；`update`：按当前时间或场景状态推进对象并维护缓存失效。

- `ArrayCamera`：由多个视口子相机组成的相机。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `Timer`：支持暂停、重置和页面可见性调整的时间源。方法：`constructor`、`connect`、`disconnect`、`getDelta`、`getElapsed`、`getTimescale`、`setTimescale`、`reset`、`dispose`、`update`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用；`update`：按当前时间或场景状态推进对象并维护缓存失效。

- `AudioListener`：将主音量和相机空间位置同步至 Web Audio listener。方法：`constructor`、`getInput`、`removeFilter`、`getFilter`、`setFilter`、`getMasterVolume`、`setMasterVolume`、`updateMatrixWorld`。
  `constructor`：function Object() { [native code] }；`updateMatrixWorld`：传播父级世界矩阵；matrixWorldNeedsUpdate 控制失效，递归更新子节点。

- `Audio`：音频源、播放状态、增益和过滤器链。方法：`constructor`、`getOutput`、`setNodeSource`、`setMediaElementSource`、`setMediaStreamSource`、`setBuffer`、`play`、`pause`、`stop`、`connect`、`disconnect`、`getFilters`、`setFilters`、`setDetune`、`getDetune`、`getFilter`、`setFilter`、`setPlaybackRate`、`getPlaybackRate`、`onEnded`、`getLoop`、`setLoop`、`setLoopStart`、`setLoopEnd`、`getVolume`、`setVolume`、`copy`、`clone`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定。

- `PositionalAudio`：通过 PannerNode 实现随场景对象移动的空间音频。方法：`constructor`、`connect`、`disconnect`、`getOutput`、`getRefDistance`、`setRefDistance`、`getRolloffFactor`、`setRolloffFactor`、`getDistanceModel`、`setDistanceModel`、`getMaxDistance`、`setMaxDistance`、`setDirectionalCone`、`updateMatrixWorld`。
  `constructor`：function Object() { [native code] }；`updateMatrixWorld`：传播父级世界矩阵；matrixWorldNeedsUpdate 控制失效，递归更新子节点。

- `AudioAnalyser`：封装 FFT 频谱和平均频率采样。方法：`constructor`、`getFrequencyData`、`getAverageFrequency`。
  `constructor`：function Object() { [native code] }。

- `PropertyMixer`：累积并混合来自多个动作的属性值。方法：`constructor`、`accumulate`、`accumulateAdditive`、`apply`、`saveOriginalState`、`restoreOriginalState`、`_setAdditiveIdentityNumeric`、`_setAdditiveIdentityQuaternion`、`_setAdditiveIdentityOther`、`_select`、`_slerp`、`_slerpAdditive`、`_lerp`、`_lerpAdditive`。
  `constructor`：function Object() { [native code] }。

- `PropertyBinding`：解析动画属性路径并绑定对象字段。方法：`constructor`、`create`、`sanitizeNodeName`、`parseTrackName`、`findNode`、`_getValue_unavailable`、`_setValue_unavailable`、`_getValue_direct`、`_getValue_array`、`_getValue_arrayElement`、`_getValue_toArray`、`_setValue_direct`、`_setValue_direct_setNeedsUpdate`、`_setValue_direct_setMatrixWorldNeedsUpdate`、`_setValue_array`、`_setValue_array_setNeedsUpdate`、`_setValue_array_setMatrixWorldNeedsUpdate`、`_setValue_arrayElement`、`_setValue_arrayElement_setNeedsUpdate`、`_setValue_arrayElement_setMatrixWorldNeedsUpdate`、`_setValue_fromArray`、`_setValue_fromArray_setNeedsUpdate`、`_setValue_fromArray_setMatrixWorldNeedsUpdate`、`_getValue_unbound`、`_setValue_unbound`、`bind`、`unbind`。
  `constructor`：function Object() { [native code] }。

- `AnimationObjectGroup`：让多个对象共享同一组动画绑定。方法：`constructor`、`add`、`remove`、`uncache`、`subscribe_`、`unsubscribe_`。
  `constructor`：function Object() { [native code] }。

- `AnimationAction`：控制片段时间、循环、权重、淡入淡出与交叉混合。方法：`constructor`、`play`、`stop`、`reset`、`isRunning`、`isScheduled`、`startAt`、`setLoop`、`setEffectiveWeight`、`getEffectiveWeight`、`fadeIn`、`fadeOut`、`crossFadeFrom`、`crossFadeTo`、`stopFading`、`setEffectiveTimeScale`、`getEffectiveTimeScale`、`setDuration`、`syncWith`、`halt`、`warp`、`stopWarping`、`getMixer`、`getClip`、`getRoot`、`_update`、`_updateWeight`、`_updateTimeScale`、`_updateTime`、`_setEndings`、`_scheduleFading`。
  `constructor`：function Object() { [native code] }。

- `AnimationMixer`：以全局时间驱动动画动作并混合目标属性。方法：`constructor`、`_bindAction`、`_activateAction`、`_deactivateAction`、`_initMemoryManager`、`_isActiveAction`、`_addInactiveAction`、`_removeInactiveAction`、`_removeInactiveBindingsForAction`、`_lendAction`、`_takeBackAction`、`_addInactiveBinding`、`_removeInactiveBinding`、`_lendBinding`、`_takeBackBinding`、`_lendControlInterpolant`、`_takeBackControlInterpolant`、`clipAction`、`existingAction`、`stopAllAction`、`update`、`setTime`、`getRoot`、`uncacheClip`、`uncacheRoot`、`uncacheAction`。
  `constructor`：function Object() { [native code] }；`update`：按当前时间或场景状态推进对象并维护缓存失效。

- `RenderTarget3D`：3D 离屏颜色/深度附件、尺寸和释放生命周期。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `Uniform`：封装 shader uniform 值和克隆。方法：`constructor`、`clone`。
  `constructor`：function Object() { [native code] }；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定。

- `UniformsGroup`：管理统一缓冲对象中的 uniform 集合和更新事件。方法：`constructor`、`add`、`remove`、`setName`、`setUsage`、`dispose`、`copy`、`clone`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用；`copy`：复制自身状态；需注意资源引用与深复制边界；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定。

- `InstancedInterleavedBuffer`：可按实例步进的交错顶点缓冲。方法：`constructor`、`copy`、`clone`、`toJSON`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`toJSON`：序列化资源和引用；共享资源通过元数据缓存去重。

- `GLBufferAttribute`：引用外部 GL buffer 的顶点属性元数据。方法：`constructor`、`set:needsUpdate`、`setBuffer`、`setType`、`setItemSize`、`setCount`。
  `constructor`：function Object() { [native code] }。

  访问器分别记录（kind:name，避免同名覆盖）：`set:needsUpdate`：仅输入 true 时递增 version，标记资源需要重新上传或刷新。

- `Raycaster`：从相机或显式射线递归检测场景对象并按距离排序。方法：`constructor`、`set`、`setFromCamera`、`setFromXRController`、`intersectObject`、`intersectObjects`。
  `constructor`：function Object() { [native code] }。

- `Clock`：以高精度时间跟踪帧间隔和累计时间。方法：`constructor`、`start`、`stop`、`getElapsedTime`、`getDelta`。
  `constructor`：function Object() { [native code] }。

- `Spherical`：球坐标半径、极角和方位角转换。方法：`constructor`、`set`、`copy`、`makeSafe`、`setFromVector3`、`setFromCartesianCoords`、`clone`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定。

- `Cylindrical`：柱坐标半径、方位角和高度转换。方法：`constructor`、`set`、`copy`、`setFromVector3`、`setFromCartesianCoords`、`clone`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定。

- `Matrix2`：2 阶矩阵的乘法、行列式、求逆和变换构造。方法：`constructor`、`identity`、`fromArray`、`set`。
  `constructor`：function Object() { [native code] }。

- `Box2`：二维轴对齐包围盒及相交/距离运算。方法：`constructor`、`set`、`setFromPoints`、`setFromCenterAndSize`、`clone`、`copy`、`makeEmpty`、`isEmpty`、`getCenter`、`getSize`、`expandByPoint`、`expandByVector`、`expandByScalar`、`containsPoint`、`containsBox`、`getParameter`、`intersectsBox`、`clampPoint`、`distanceToPoint`、`intersect`、`union`、`translate`、`equals`。
  `constructor`：function Object() { [native code] }；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定；`copy`：复制自身状态；需注意资源引用与深复制边界。

- `Line3`：线段参数化、最近点与矩阵变换。方法：`constructor`、`set`、`copy`、`getCenter`、`delta`、`distanceSq`、`distance`、`at`、`closestPointToPointParameter`、`closestPointToPoint`、`distanceSqToLine3`、`applyMatrix4`、`equals`、`clone`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`clone`：以构造器和 copy 建立副本，资源共享规则由 copy 决定。

- `SpotLightHelper`：SpotLight 对象或空间参考的可视调试几何。方法：`constructor`、`dispose`、`update`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用；`update`：按当前时间或场景状态推进对象并维护缓存失效。

- `SkeletonHelper`：Skeleton 对象或空间参考的可视调试几何。方法：`constructor`、`updateMatrixWorld`、`setColors`、`dispose`。
  `constructor`：function Object() { [native code] }；`updateMatrixWorld`：传播父级世界矩阵；matrixWorldNeedsUpdate 控制失效，递归更新子节点；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

- `PointLightHelper`：PointLight 对象或空间参考的可视调试几何。方法：`constructor`、`dispose`、`update`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用；`update`：按当前时间或场景状态推进对象并维护缓存失效。

- `HemisphereLightHelper`：HemisphereLight 对象或空间参考的可视调试几何。方法：`constructor`、`dispose`、`update`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用；`update`：按当前时间或场景状态推进对象并维护缓存失效。

- `GridHelper`：Grid 对象或空间参考的可视调试几何。方法：`constructor`、`dispose`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

- `PolarGridHelper`：PolarGrid 对象或空间参考的可视调试几何。方法：`constructor`、`dispose`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

- `DirectionalLightHelper`：DirectionalLight 对象或空间参考的可视调试几何。方法：`constructor`、`dispose`、`update`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用；`update`：按当前时间或场景状态推进对象并维护缓存失效。

- `CameraHelper`：Camera 对象或空间参考的可视调试几何。方法：`constructor`、`setColors`、`update`、`dispose`。
  `constructor`：function Object() { [native code] }；`update`：按当前时间或场景状态推进对象并维护缓存失效；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

- `BoxHelper`：Box 对象或空间参考的可视调试几何。方法：`constructor`、`update`、`setFromObject`、`copy`、`dispose`。
  `constructor`：function Object() { [native code] }；`update`：按当前时间或场景状态推进对象并维护缓存失效；`copy`：复制自身状态；需注意资源引用与深复制边界；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

- `Box3Helper`：Box3 对象或空间参考的可视调试几何。方法：`constructor`、`updateMatrixWorld`、`dispose`。
  `constructor`：function Object() { [native code] }；`updateMatrixWorld`：传播父级世界矩阵；matrixWorldNeedsUpdate 控制失效，递归更新子节点；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

- `PlaneHelper`：Plane 对象或空间参考的可视调试几何。方法：`constructor`、`updateMatrixWorld`、`dispose`。
  `constructor`：function Object() { [native code] }；`updateMatrixWorld`：传播父级世界矩阵；matrixWorldNeedsUpdate 控制失效，递归更新子节点；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

- `ArrowHelper`：Arrow 对象或空间参考的可视调试几何。方法：`constructor`、`setDirection`、`setLength`、`setColor`、`copy`、`dispose`。
  `constructor`：function Object() { [native code] }；`copy`：复制自身状态；需注意资源引用与深复制边界；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

- `AxesHelper`：Axes 对象或空间参考的可视调试几何。方法：`constructor`、`setColors`、`dispose`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

- `ShapePath`：把子路径按方向和包含关系组织为形状及孔洞。方法：`constructor`、`moveTo`、`lineTo`、`quadraticCurveTo`、`bezierCurveTo`、`splineThru`、`toShapes`。
  `constructor`：function Object() { [native code] }。

- `Controls`：交互控制器基类；管理对象、DOM 连接及启停。方法：`constructor`、`connect`、`disconnect`、`dispose`、`update`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用；`update`：按当前时间或场景状态推进对象并维护缓存失效。

- `TextureUtils`：纹理处理辅助操作。方法：`contain`、`cover`、`fill`、`getByteLength`。

### `eyes/src/vendor/three/index.js`

Three.js WebGL 渲染器和 GLSL shader chunks；重导出 core 并管理 GPU、阴影、环境贴图和 XR。可信度：observed。

证据：`// Recovered from vendors.js:154-386330.`；`exports: ACESFilmicToneMapping, AddEquation, AddOperation, AdditiveAnimationBlendMode, AdditiveBlending, AgXToneMapping, AlphaFormat, AlwaysCompare, AlwaysDepth, AlwaysStencilFunc, AmbientLight, AnimationAction, AnimationClip, AnimationLoader, AnimationMixer, AnimationObjectGroup, AnimationUtils, ArcCurve, ArrayCamera, ArrowHelper, AttachedBindMode, Audio, AudioAnalyser, AudioContext, AudioListener, AudioLoader, AxesHelper, BackSide, BasicDepthPacking, BasicShadowMap, BatchedMesh, BezierInterpolant, Bone, BooleanKeyframeTrack, Box2, Box3, Box3Helper, BoxGeometry, BoxHelper, BufferAttribute, BufferGeometry, BufferGeometryLoader, ByteType, Cache, Camera, CameraHelper, CanvasTexture, CapsuleGeometry, CatmullRomCurve3, CineonToneMapping, CircleGeometry, ClampToEdgeWrapping, Clock, Color, ColorKeyframeTrack, ColorManagement, Compatibility, CompressedArrayTexture, CompressedCubeTexture, CompressedTexture, CompressedTextureLoader, ConeGeometry, ConstantAlphaFactor, ConstantColorFactor, Controls, CubeCamera, CubeDepthTexture, CubeReflectionMapping, CubeRefractionMapping, CubeTexture, CubeTextureLoader, CubeUVReflectionMapping, CubicBezierCurve, CubicBezierCurve3, CubicInterpolant, CullFaceBack, CullFaceFront, CullFaceFrontBack, CullFaceNone, Curve, CurvePath, CustomBlending, CustomToneMapping, CylinderGeometry, Cylindrical, Data3DTexture, DataArrayTexture, DataTexture, DataTextureLoader, DataUtils, DecrementStencilOp, DecrementWrapStencilOp, DefaultLoadingManager, DepthFormat, DepthStencilFormat, DepthTexture, DetachedBindMode, DirectionalLight, DirectionalLightHelper, DiscreteInterpolant, DodecahedronGeometry, DoubleSide, DstAlphaFactor, DstColorFactor, DynamicCopyUsage, DynamicDrawUsage, DynamicReadUsage, EdgesGeometry, EllipseCurve, EqualCompare, EqualDepth, EqualStencilFunc, EquirectangularReflectionMapping, EquirectangularRefractionMapping, Euler, EventDispatcher, ExternalTexture, ExtrudeGeometry, FileLoader, Float16BufferAttribute, Float32BufferAttribute, FloatType, Fog, FogExp2, FramebufferTexture, FrontSide, Frustum, FrustumArray, GLBufferAttribute, GLSL1, GLSL3, GreaterCompare, GreaterDepth, GreaterEqualCompare, GreaterEqualDepth, GreaterEqualStencilFunc, GreaterStencilFunc, GridHelper, Group, HTMLTexture, HalfFloatType, HemisphereLight, HemisphereLightHelper, IcosahedronGeometry, ImageBitmapLoader, ImageLoader, ImageUtils, IncrementStencilOp, IncrementWrapStencilOp, InstancedBufferAttribute, InstancedBufferGeometry, InstancedInterleavedBuffer, InstancedMesh, Int16BufferAttribute, Int32BufferAttribute, Int8BufferAttribute, IntType, InterleavedBuffer, InterleavedBufferAttribute, Interpolant, InterpolateBezier, InterpolateDiscrete, InterpolateLinear, InterpolateSmooth, InterpolationSamplingMode, InterpolationSamplingType, InvertStencilOp, KeepStencilOp, KeyframeTrack, LOD, LatheGeometry, Layers, LessCompare, LessDepth, LessEqualCompare, LessEqualDepth, LessEqualStencilFunc, LessStencilFunc, Light, LightProbe, Line, Line3, LineBasicMaterial, LineCurve, LineCurve3, LineDashedMaterial, LineLoop, LineSegments, LinearFilter, LinearInterpolant, LinearMipMapLinearFilter, LinearMipMapNearestFilter, LinearMipmapLinearFilter, LinearMipmapNearestFilter, LinearSRGBColorSpace, LinearToneMapping, LinearTransfer, Loader, LoaderUtils, LoadingManager, LoopOnce, LoopPingPong, LoopRepeat, MOUSE, Material, MaterialBlending, MaterialLoader, MathUtils, Matrix2, Matrix3, Matrix4, MaxEquation, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial, MinEquation, MirroredRepeatWrapping, MixOperation, MultiplyBlending, MultiplyOperation, NearestFilter, NearestMipMapLinearFilter, NearestMipMapNearestFilter, NearestMipmapLinearFilter, NearestMipmapNearestFilter, NeutralToneMapping, NeverCompare, NeverDepth, NeverStencilFunc, NoBlending, NoColorSpace, NoNormalPacking, NoToneMapping, NormalAnimationBlendMode, NormalBlending, NormalGAPacking, NormalRGPacking, NotEqualCompare, NotEqualDepth, NotEqualStencilFunc, NumberKeyframeTrack, Object3D, ObjectLoader, ObjectSpaceNormalMap, OctahedronGeometry, OneFactor, OneMinusConstantAlphaFactor, OneMinusConstantColorFactor, OneMinusDstAlphaFactor, OneMinusDstColorFactor, OneMinusSrcAlphaFactor, OneMinusSrcColorFactor, OrthographicCamera, PCFShadowMap, PCFSoftShadowMap, PMREMGenerator, Path, PerspectiveCamera, Plane, PlaneGeometry, PlaneHelper, PointLight, PointLightHelper, Points, PointsMaterial, PolarGridHelper, PolyhedronGeometry, PositionalAudio, PropertyBinding, PropertyMixer, QuadraticBezierCurve, QuadraticBezierCurve3, Quaternion, QuaternionKeyframeTrack, QuaternionLinearInterpolant, R11_EAC_Format, RED_GREEN_RGTC2_Format, RED_RGTC1_Format, REVISION, RG11_EAC_Format, RGBADepthPacking, RGBAFormat, RGBAIntegerFormat, RGBA_ASTC_10x10_Format, RGBA_ASTC_10x5_Format, RGBA_ASTC_10x6_Format, RGBA_ASTC_10x8_Format, RGBA_ASTC_12x10_Format, RGBA_ASTC_12x12_Format, RGBA_ASTC_4x4_Format, RGBA_ASTC_5x4_Format, RGBA_ASTC_5x5_Format, RGBA_ASTC_6x5_Format, RGBA_ASTC_6x6_Format, RGBA_ASTC_8x5_Format, RGBA_ASTC_8x6_Format, RGBA_ASTC_8x8_Format, RGBA_BPTC_Format, RGBA_ETC2_EAC_Format, RGBA_PVRTC_2BPPV1_Format, RGBA_PVRTC_4BPPV1_Format, RGBA_S3TC_DXT1_Format, RGBA_S3TC_DXT3_Format, RGBA_S3TC_DXT5_Format, RGBDepthPacking, RGBFormat, RGBIntegerFormat, RGB_BPTC_SIGNED_Format, RGB_BPTC_UNSIGNED_Format, RGB_ETC1_Format, RGB_ETC2_Format, RGB_PVRTC_2BPPV1_Format, RGB_PVRTC_4BPPV1_Format, RGB_S3TC_DXT1_Format, RGDepthPacking, RGFormat, RGIntegerFormat, RawShaderMaterial, Ray, Raycaster, RectAreaLight, RedFormat, RedIntegerFormat, ReinhardToneMapping, RenderTarget, RenderTarget3D, RepeatWrapping, ReplaceStencilOp, ReverseSubtractEquation, RingGeometry, SIGNED_R11_EAC_Format, SIGNED_RED_GREEN_RGTC2_Format, SIGNED_RED_RGTC1_Format, SIGNED_RG11_EAC_Format, SRGBColorSpace, SRGBTransfer, Scene, ShaderChunk, ShaderLib, ShaderMaterial, ShadowMaterial, Shape, ShapeGeometry, ShapePath, ShapeUtils, ShortType, Skeleton, SkeletonHelper, SkinnedMesh, Source, Sphere, SphereGeometry, Spherical, SphericalHarmonics3, SplineCurve, SpotLight, SpotLightHelper, Sprite, SpriteMaterial, SrcAlphaFactor, SrcAlphaSaturateFactor, SrcColorFactor, StaticCopyUsage, StaticDrawUsage, StaticReadUsage, StereoCamera, StreamCopyUsage, StreamDrawUsage, StreamReadUsage, StringKeyframeTrack, SubtractEquation, SubtractiveBlending, TOUCH, TangentSpaceNormalMap, TetrahedronGeometry, Texture, TextureLoader, TextureUtils, Timer, TimestampQuery, TorusGeometry, TorusKnotGeometry, Triangle, TriangleFanDrawMode, TriangleStripDrawMode, TrianglesDrawMode, TubeGeometry, UVMapping, Uint16BufferAttribute, Uint32BufferAttribute, Uint8BufferAttribute, Uint8ClampedBufferAttribute, Uniform, UniformsGroup, UniformsLib, UniformsUtils, UnsignedByteType, UnsignedInt101111Type, UnsignedInt248Type, UnsignedInt5999Type, UnsignedIntType, UnsignedShort4444Type, UnsignedShort5551Type, UnsignedShortType, VSMShadowMap, Vector2, Vector3, Vector4, VectorKeyframeTrack, VideoFrameTexture, VideoTexture, WebGL3DRenderTarget, WebGLArrayRenderTarget, WebGLCoordinateSystem, WebGLCubeRenderTarget, WebGLRenderTarget, WebGLRenderer, WebGLUtils, WebGPUCoordinateSystem, WebXRController, WireframeGeometry, WrapAroundEnding, ZeroCurvatureEnding, ZeroFactor, ZeroSlopeEnding, ZeroStencilOp, createCanvasElement, error, getConsoleFunction, log, setConsoleFunction, warn, warnOnce`；`literal: undefined`；`literal: THREE.WebGLAttributes: Unsupported buffer data format: `；`literal: #ifdef USE_ALPHAHASH 	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard; #endif`；`literal: #ifdef USE_ALPHAMAP 	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g; #endif`；`literal: #ifdef USE_ALPHAMAP 	uniform sampler2D alphaMap; #endif`。

- `PMREMGenerator`：将环境纹理预滤波为多粗糙度立方 UV 辐照贴图。方法：`constructor`、`fromScene`、`fromEquirectangular`、`fromCubemap`、`compileCubemapShader`、`compileEquirectangularShader`、`dispose`、`_setSize`、`_dispose`、`_cleanup`、`_fromTexture`、`_allocateTargets`、`_compileMaterial`、`_sceneToCubeUV`、`_textureToCubeUV`、`_applyPMREM`、`_applyGGXFilter`、`_blur`、`_halfBlur`。
  `constructor`：function Object() { [native code] }；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

- `WebGLCubeRenderTarget`：WebGLCube 离屏颜色/深度附件、尺寸和释放生命周期。方法：`constructor`、`fromEquirectangularTexture`、`clear`。
  `constructor`：function Object() { [native code] }。

- `SingleUniform`：上传单个 GL uniform 并缓存前值。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `PureArrayUniform`：按类型上传连续 GL uniform 数组。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `StructuredUniform`：按树递归上传结构体 uniform。方法：`constructor`、`setValue`。
  `constructor`：function Object() { [native code] }。

- `WebGLUniforms`：反射 GL uniform 类型并缓存上传值。方法：`constructor`、`setValue`、`setOptional`、`upload`、`seqWithValue`。
  `constructor`：function Object() { [native code] }。

- `WebGLShaderCache`：以材质关联缓存 shader stage 源码及使用计数。方法：`constructor`、`update`、`remove`、`getVertexShaderStage`、`getFragmentShaderStage`、`dispose`、`_getShaderCacheForMaterial`、`_getShaderStage`。
  `constructor`：function Object() { [native code] }；`update`：按当前时间或场景状态推进对象并维护缓存失效；`dispose`：发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用。

- `WebGLShaderStage`：保存 shader 源码与稳定 stage 标识。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `WebXRDepthSensing`：将 XR 深度纹理整合到渲染器深度采样。方法：`constructor`、`init`、`getMesh`、`reset`、`getDepthTexture`。
  `constructor`：function Object() { [native code] }；`init`：初始化延迟资源和运行时能力；必须先完成再使用依赖资源的方法。

- `WebXRManager`：协调 XRSession、帧、相机、控制器和渲染目标生命周期。方法：`constructor`。
  `constructor`：function Object() { [native code] }。

- `WebGLRenderer`：WebGL 渲染主循环：更新对象、灯光、材质程序、排序和绘制并维护 GPU 资源。方法：`constructor`、`get:coordinateSystem`、`get:outputColorSpace`。
  `constructor`：function Object() { [native code] }。

  访问器分别记录（kind:name，避免同名覆盖）：`get:coordinateSystem`：只读返回 ThreeCore.WebGLCoordinateSystem；此 getter 不执行对应 setter 的写入或更新通知；`get:outputColorSpace`：只读返回 this._outputColorSpace；此 getter 不执行对应 setter 的写入或更新通知；`set:outputColorSpace`：写入输出颜色空间，同时更新 GL drawingBufferColorSpace 和 unpackColorSpace。
