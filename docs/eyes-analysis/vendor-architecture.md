# 第三方源码逐文件语义参考

> 这是 v0.2.31 的初始静态研究基线。后续实际重命名、控制流整理与运行验证见同目录 semantic-changes 清单；当前源码签名、行号和进度以 README.md 与 semantic-progress.json 为准。不能用本研究基线替代源码语义验收。


本参考对 633 个 git 跟踪的 vendor 文件逐一解析 AST 与源码字面量，并结合模块装配调用关系核对职责。observed 表示源码直接可见；inferred 表示包族或职责推断，绝不意味着已恢复上游原名。压缩参数名与内部闭包未强行重新命名。

## 包边界与证据

- `three/core.js` 显式 `REVISION = "185"`，与宿主 package.json 的 npm Three 版本不同；`three/index.js` 为 WebGL 渲染器与 shader 管线。不能按宿主依赖版本推断此副本。
- `modules/GLTFLoader.js` 支持 glTF >=2.0；DRACO、KTX2、ZSTD 为独立解码路径，资源代理文件从 decoder manifest 读取 revision。KTX2 的 Basis worker 转码取决于 GPU 支持，不能将扩展检测视为所有格式都可上传。`Ci.js` 保留 `KTX-Parse v1.0.1` 字符串。
- `modules/KeyStore.js` 明确 `Fuse.version = "6.6.2"`，包含 Bitap 与扩展匹配；文件名只代表其中一个导出，不能把整个模块理解为简单键值仓库。
- 两份 Moment 均显式 2.29.1；两份 Timezone 显式 0.5.33；primary/secondary locale 树分别注册不同副本，合并会改变可观察状态。
- `Swiper.js` 经对象键装配 update/translate/transition/slide/loop 等子模块；404–496 区间大量匿名文件可从此装配和插件事件恢复语义，但源码没有可靠完整版本号证据。Dom7 与 SSR window/document 工具在这一边界。
- 两组 Popper 相同结构链为 169–224 与 930–985，差值 761；Tippy 入口为 animateFill-168/929，包含 tooltip、插件和可访问性逻辑；精确版本未确认。不能因文件名叫 animateFill 就认为只含动画。
- proj4 边界为 585–689 及相关命名模块。585 的版本字段是 `__VERSION__` 占位符，不能报告精确版本。其包含 EPSG 定义、WKT/PROJJSON、基准转换、NTv2 网格与多个投影插件。
- `Unidentified160.cjs` 与 `Unidentified989.cjs` 直接保留 `OverlayScrollbars` 标识。157/158/159 分别为递归深合并（默认数组拼接）、防抖、节流实现；719 为 History/hash 客户端路由器；包名/版本未直接出现的部分只说明行为。
- 本目录未见可据以断言 Babel/core-js 包身份的明确包标识；typeof/Symbol 等兼容代码也可能被内联进其他包，不能仅凭辅助函数形状归属整包。

- `Easing.js` 导出 Tween/Group/Interpolation/Sequence 并显式 VERSION 18.6.4；其包边界覆盖完整 tween 管理，不只是 Easing。

## 关键不变量

Three 场景节点的 world matrix 与几何 bounds 存在缓存；直接改数组或局部参数需按 API 标记更新。dispose 是资源生命周期信号，并不自动解除应用所有引用。WebGLRenderer/后处理通道共享状态，新增 pass 需正确交换读写缓冲、恢复 stencil 与 render target。纹理解码器必须先初始化并匹配运行时资源 revision；不能猜测 WASM ABI。Moment 的两个实例与 Popper/Tippy 的两个模块图不应仅因内容相似而贸然合并。proj4 角度内部使用弧度，网格变换和 Helmert 参数存在明确单位约定。
