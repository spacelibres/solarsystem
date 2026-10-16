# 剩余 vendor 责任、公开契约与独立系统替换边界

本轮范围是 `semantic-progress.json` 中 `not-semantically-accepted` 的 **349 个 vendor/modules 文件 + 270 个 Moment locale 文件 = 619 个文件**。研究基于0.2.33源码快照；这是补充研究，不改变语义验收状态。逐文件清单齐全不表示每个压缩算法、投影公式、语言词形已被数学或运行证明。附录保留真实静态依赖、应用直接调用、源码指纹与可枚举文件路径；关键异步与资源边界另行分析。

独立 Next.js + Three.js 系统只把 recovered vendor 当作行为研究材料；新 `/explorer` 不加载 `eyes/` 运行时、不建iframe或全局桥接。通用算法从正式依赖导入；应用拥有时间、场景、资源、路由、配置与debug接口。本文没有联网下载NASA媒体库，也不修改生产源码。

## 1. 身份证据、范围与旧基线纠正

- `KeyStore.js:1045` 明确 `Fuse.version = "6.6.2"`，因此是完整Fuse搜索库，不能据文件名当普通键值Map。`Easing.js:321` 是tween 18.6.4，包含Group/Tween/Interpolation/Sequence，不只是缓动函数。
- 两个Moment核心均自报2.29.1，两个Timezone模块`:199`自报0.5.33；库版本不是tzdata版本。`FollowName.cjs`/`Unidentified777.cjs`分别加载`data/Unidentified381.json`/`Unidentified916.json`，数据范围需以JSON另行核对。
- `Ci.js`的writer保留 `KTX-Parse v1.0.1` 字符串，与read/write/createDefaultContainer实现共同支持KTX2容器身份。`Unidentified585.js`是proj4装配入口，但version是 `__VERSION__` 占位符，不能宣称精确版本。各投影身份来自其自身`names`字面量，附录已展开。
- `Unidentified719.cjs:239`的 `__NAVIGO_WINDOW_LOCATION_MOCK__` 加上PARAMETER_REGEXP、hash/history/hook API支持Navigo身份，精确版本未证。全屏模块与screenfull API形状相符，但未逐行匹配上游版本。Swiper/Dom7/Popper/Tippy由入口装配与内部API确定职责，未确认精确版本。
- 两个OverlayScrollbars副本保留实名；`eyes/THIRD_PARTY_LICENSES.txt:1–12`有1.13.0许可证头，但该头不证明所有副本逐函数相同。两组Popper/Tippy有独立默认配置和实例注册状态，不能仅因源码相似就合并。
- **纠正旧静态基线：Unidentified157.cjs实现深合并，不是递归等值比较。** `:15–21`克隆/数组concat，`:38–56`合并对象与过滤目标继承/非枚举键，`:57–66`主函数及`.all`。`engine/core/AppUtils.js:99–104`真实deepMerge调用还排除Moment对象；用deepEqual替代将破坏功能。
- Three加载器已有部分上游匹配，不在本619项剩余计数中；为解释压缩/加载链仍读取GLTFLoader/DRACOLoader/KTX2Loader实际代码。Three math/render core和NASA领域层不在本文件重复验收。普通源码分析没有把整个vendor目录当NASA私有算法。

## 2. 应用实际使用与新系统的责任

| 边界 | 真实应用调用、可观察行为 | 独立系统归属 |
|---|---|---|
| glTF/Draco/KTX2 | `engine/components/ModelComponent.js`、`engine/core/TextureLoader.js`配置加载器 | 正式Three addons做解码/解析；应用负责精确URL、优先级、取消、缓存、错误与GPU资源所有权 |
| Fuse | `SearchManager.js:10–45`过滤searchable=false；threshold=.4，id/name权重.99/.98；includeScore/includeMatches/ignoreLocation；空查询null、最多10项 | 应用拥有实体索引和选中状态；正式Fuse承担搜索，不重写Bitap；若减为精确匹配必须明确产品差异 |
| Moment/Timezone | `TimeManager-728.js:41,95–107`本地时区guess、UTC/严格本地解析；Scene/BaseView/Autoplay用min/max；EventsTimeline用secondary | 应用以UTC/ET数值拥有时钟、rate/seek/limits；显示可用Intl；严格解析、DST与ET/闰秒不是Intl格式化功能 |
| tween | `AppUtils.js:300–319`每个tween创建独立RAF，却更新同一默认Group | 应用统一一帧一次推进，拥有动画取消与对象寿命；正式tween库/明确插值实现承担数学 |
| Swiper | CarouselPanel/TutorialOverlay从A11y入口创建实例，完整入口安装所有插件 | React拥有组件状态/焦点；正式Swiper或CSS scroll-snap承担轮播。未使用的zoom/history等不必迁入新UI |
| Tippy/Popper | TimeController/Settings/ShareModal/ClockShortcut/DistanceManager等调用；提示与定位不是一个animateFill动画 | React拥有文案/可访问性/挂载；正式定位库或符合目标需求的原生popover承担浮层。原生popover不自动复制flip/箭头/跟随指针 |
| OverlayScrollbars | AppUtils.addScrollbar指定x隐藏、y滚动、autoHide=move；Menu等存在副作用导入 | 新UI优先CSS overflow；确需自定义滚动再导入正式库，卸载时destroy；副作用import不等于已创建实例 |
| 深合并/防抖/节流 | AppUtils包装157/158/159；后两者有cancel/flush、this及最后参数语义 | 应用明确配置schema和effect清理；Object.assign不等价深合并，RAF节流也不自动等价leading/trailing/maxWait |
| Navigo | RouteManager构造(null,true)使用hash；before显式continueRoute；离开时应用CancelToken取消 | Next router与history处理导航；应用拥有可序列化实体/时间/相机schema、导航generation、过期结果丢弃，避免两个router抢链接 |
| proj4 | `Capabilities-584.js`从WMTS CRS得到投影、bounds | 正式proj4承担通用地理算法；应用定义LLA/弧度/椭球/投影接口；普通太阳系全局视图不需要默认装入全部投影 |
| 全屏 | Settings使用isEnabled、on(change)、toggle | 应用拥有用户手势、状态与Promise拒绝；目标浏览器允许时直接Fullscreen API，否则正式适配器 |

这里“正式依赖”是职责选择，不是未经查询声称最新版必然兼容。实现时应锁定版本、核对安装包exports/类型并验证配套decoder；不可混用宿主npm Three与recovered r185对象。新增系统的配置/debug接口只表达其自己的状态，不暴露 recovered `_app` 作为控制核心。

## 3. KTX、WASM、加载器与取消

### 3.1 KTX容器和颜色

`Ci.js:276–312`游标用DataView读取；`:332–450`验证12字节magic、读取尺寸/levelCount/supercompression、64位level offset/length、DFD采样范围、4字节对齐KVD和Basis SGD。返回levelData等为输入buffer的视图，不是全部深拷贝；转移输入后不可继续把其视图当长期缓存。64位拼为JS number，超过2^53没有安全整数保护；坏offset多由TypedArray/DataView RangeError兜底，不等于全面格式校验。write仅支持单BASICFORMAT DFD，默认改写KTXwriter；新查看器只读资源时无需复制writer。

`KTX2Loader.js:25–45`按renderer检测ASTC/ETC/DXT/BPTC/PVRTC，并有Linux/Android环境修正。`:102–152`区分vkFormat直接纹理与Basis转码两路；none/ZSTD、HDR、3D/cube/array、float/half-float各有条件。色彩由DFD primaries/transfer/alpha决定，不能统一设sRGB。`DisplayP3ColorSpace.js`定义P3/Rec2020矩阵及传递函数，由同版本Three ColorManagement解释。

### 3.2 worker、buffer与GPU资源

`WorkerPool.js:2–44`默认4并发、FIFO、bitmask忙闲；postMessage Promise只有resolve，无reject、任务id校验、worker error/messageerror、超时或AbortSignal。dispose终止worker并清queue/resolve数组，**不settle排队及在途Promise**。`1 << index`还是32位运算，因此不能无限提高pool。独立资源服务应约束并发，任务有requestId/signal/settled和错误类别；网络、排队、解码、上传分别处理取消。不能物理中断解码时，逻辑取消并在晚结果到达时立即dispose，不把旧场景资源交给新状态。

`DRACOLoader.js:65–91`以输入ArrayBuffer身份和JSON任务配置作WeakMap缓存；transfer使buffer脱离，相同配置复用Promise，不同配置重解已脱离buffer明确抛错。`:146–182`按任务成本选worker并在完成后释放任务；dispose终止worker/撤销URL，但不销毁返回BufferGeometry，也没有完整pending任务拒绝保证。`KTX2Loader.js:76–81,147–156`同样缓存并转移buffer；loader.dispose只管pool/Blob URL，texture.dispose由应用承担。detectSupport先于load/parse是同步抛错的前置条件。

应用以SceneResourceService拥有单套loader/pool，资源按共享引用管理；卸载必须结算pending任务、终止worker、撤销Blob URL、释放geometry/material/texture/renderTarget等。只remove scene节点不释放GPU。Blob worker与WASM还要求生产CSP/worker-src/connect-src允许，开发机成功不能证明部署支持。

### 3.3 失败分支中确认的问题

1. `KTX2Loader.js:83–96`在判断type=error之前解构`transcodeResult.data.faces`；worker`:325–329`错误消息只有type/id/error，会先抛TypeError遮蔽原解码错误。独立适配先判断成功/失败联合类型，保留cause。
2. `KTX2Loader.js:115–119`使用`new Promise(async resolve => { await decoder.init(); resolve(decoder) })`；init拒绝没有回传reject，外层可能永久pending。独立实现直接memoize `init().then(()=>decoder)`，失败可重试并清理状态。
3. `ZSTDDecoder.js:2–24`共享init Promise/instance/heap view；未await init会抛`Await .init()`。decode是malloc输入/输出→ZSTD_decompress→slice复制→free；WASM虽导出ZSTD_isError，JS不调用它，也没有try/finally/解压大小预算。坏数据可能得不出可靠错误，异常可能跳过free。使用正式配套实现并设解压预算，测截断/坏magic/巨型声明/失败后重试。
4. `GLTFLoader.js:46–132,555–580`检查GLB头/版本/JSON与必需扩展；Draco/KTX2/Meshopt需注入各decoder。loader没有拥有整棵scene GPU资源的dispose；动画mixer、骨架与共享纹理需独立生命周期。

这些是控制流确认的约束，不是恶意二进制或WASM内存安全证明；没有真实损坏fixture、GPU矩阵，不应宣称全部解码兼容性通过。

### 3.4 decoder路径的确切含义

7个CJS模块是恢复构建路径适配，不是NASA私有解码算法。caller由DRACOLoader:4–15和KTX2Loader:7–10确认；manifest提供revision/sha256，当前revision `1225db209857fe97`。相同sha才能证明URL别名相同，不能猜文件名。

| 模块 | manifest bundled文件 | 调用含义 |
|---|---|---|
| Unidentified78.cjs | c58ed249a0b6b2787e4f.wasm | Basis WASM，hash与ktx2/basis_transcoder.wasm相同 |
| Unidentified79.cjs | 0389c8aac482cf438e98.js | KTX2默认JS；hash与static JS不同，不宣称字节一致 |
| Unidentified112.cjs | a1553835436ceb1527f4.wasm | 默认Draco WASM，与draco_decoder.wasm hash相同 |
| Unidentified113.cjs | ced5c642e77e3c24f122.js | 默认Draco WASM wrapper JS |
| Unidentified114.cjs | 786c7dae1f2e34c054da.js | Draco无WASM回退JS，与manifest draco_decoder.js hash相同 |
| Unidentified115.cjs | 9d116d62fde9fd5bbbaa.js | 独立DRACO_GLTF_CONFIG.js |
| Unidentified116.cjs | 8e17072deeb50510e590.wasm | DRACO_GLTF_CONFIG.wasm，与默认Draco二进制不同 |

新系统部署正式依赖配套decoder，NASA媒体继续精确runtime URL。不能保留这些相对恢复路径便期待Next自动解析；manifest记录没有在本轮联网复验远端当前可用性。

## 4. 日期、事件、模板与组件边界

### 4.1 Moment的两份状态

`MomentPrimary.cjs:754–760`缺locale时require `engine/core/MomentLocalesPrimary.cjs` context并恢复原当前locale；secondary走自己的context。135对文件require不同核心、defineLocale具有注册副作用，不是270个可任意去重的纯JSON。两入口分别装timezone243/778；timezone`:185,199–214`设置`moveInvalidForward=true`、`moveAmbiguousForward=false`，DST缺失/重复本地时间有具体策略。新输入规范需明确disambiguation，不能静默依赖系统时区。

Moment对象可变，locale/defaultZone/guess缓存也可变；SSR不要跨请求修改默认配置。新系统UTC/ET数值存储、显示显式locale/timeZone；Date/Intl不是ET/闰秒转换器。应用TimeUtils领域转换须独立fixture验证。附录270文件逐对列出L、week起始/首周规则与特殊hooks；这是注册/配置覆盖，不等于135种语言所有词形校对。若新UI只用中英文，只加载目标语言。

### 4.2 vendor emitter不是应用响应式内核

`Unidentified406.js:3–61`是Swiper同步on/once/onAny/off/emit；emit前置context/swiper，onAny额外前置事件名。once代理先off；普通重复on不去重，off在forEach中splice有重复监听器边界。异常同步冒泡可能中止后续回调。没有背压、Observable、订阅对象或异步调度。resize404/mutation405在init观察、destroy解除；多mutation排队RAF没有单独取消handle。

真正应用状态在 `ui/components/BaseComponent.js`、`engine/core/Engine.js` 等。BaseComponent:143–155浅比较→立即render→callback；AppUtils的`{$param}`与BaseComponent的`{{state}}`是两阶段模板，不是React/Vue/RxJS。新系统React负责UI状态/effects，外部引擎暴露明确subscribe/unsubscribe和只读snapshot，不复制Swiper emitter作全局总线。

`AppUtils.htmlToElement/htmlWithParamsToElement`及BaseComponent模板写innerHTML；Tippy allowHTML默认false但可开启，Dom7也能拼HTML。模板替换不是转义器。新React对可信NASA富文本建立明确处理边界。AppUtils.onAttachElement是轮询，elementReady是MutationObserver+timeout；appendWithCallback等待没有失败超时，不是供应商响应式框架。React挂载/effect cleanup替代这些DOM猜测。

### 4.3 动画、tooltip、滚动与路由销毁

`Easing.js:154–181`默认Group全局保存Tween，update续跑本轮新加任务；Tween修改传入对象，stop不触发onComplete。AppUtils.tween只在onComplete取消自己的RAF，提前stop可能留RAF；库本身不拥有应用的帧循环。新系统单RAF统一update，组件卸载取消任务。

Tippy `animateFill-168.js:136–175,299–407,679`管理延迟、触发器、aria、transition、Popper和挂载；hide不等于destroy，destroy清延迟/unmount/监听/reference._tippy并触发onDestroy。Popper `createPopper-174.js:45–137`每次setOptions先清旧effects，重排依赖与阶段；update合并微任务，forceUpdate同步，destroy清effect。两个副本的defaultProps/hideAll/实例集合不能盲合；新React UI可统一持有正式依赖实例。

OverlayScrollbars:1307的destroy移实例、观察器、扩展、附加节点和监听并恢复DOM；CSS隐藏不等于销毁。Fullscreen先注册change再调用浏览器Promise，拒绝路径没有像成功路径明确off；新effect在finally/cleanup解除。Navigo before是continuation，不是返回Promise自动等待；destroy清hash/popstate/轮询，但链接闭包仍存在，靠_destroyed不再导航。RouteManager.leave的CancelToken是应用逻辑，路由库自己不取消fetch/decode；新导航用generation/signal。

## 5. proj4数值、单位与失败契约

入口585装defs/Proj/Point/mgrs/transform/nadgrid/插件。591解析+proj参数并把角度转弧度；transformInternal按source逆投影、to_meter、from_greenwich、axis和target正投影排列，必要时绕WGS84。625拒绝非有限坐标；部分迭代失败返回NaN/-9999/null/undefined，不能一律按Promise拒绝处理。

`getNadgrids.js`支持NTv2 ArrayBuffer和外部GeoTIFF-like对象。NTv2按header判大小端，subgrid起始176字节、点默认16字节，includeErrorFields=false时8字节，角秒转弧度。GeoTIFF分支返回`{ready:Promise}`，需await注册完成才能变换；注册表持有数据，无统一dispose/取消。applyGridShift遇mandatory grid缺失或覆盖外返回-1/undefined并console日志，应用需转结构化错误。这里是该库自己的NTv2契约，**不是NASA .dyn格式**。

附录105个投影相关文件明确职责及各插件names，未声称证明全球误差/极区/反子午线全域性质。迁移地表图层用已知CRS正逆/边界fixture；无须自己重写所有投影。太阳系渲染、地表LLA和地球CRS各自定义单位/轴/椭球，不能把WGS84当所有星体默认模型。

## 6. 验证、可复现探针与真实缺口

附录精确筛选619文件、读取全部源码、枚举静态边和locale规则；每module一链接、每locale双副本分别一链接。静态import/require图不保证eval/动态拼接调用完备，Moment动态context另行说明。下面从仓库根目录运行（无网络、无写入）可复现3个公开行为；mock worker只验证pool生命周期，不验证真实decoder。

```javascript
// PowerShell: 将本段通过 here-string 传入 node
const fs = require('node:fs');
(async () => {
  const source = fs.readFileSync('eyes/src/vendor/modules/WorkerPool.js', 'utf8');
  const { WorkerPool } = await import('data:text/javascript,' + encodeURIComponent(source));
  const pool = new WorkerPool(1);
  let settled = 0, terminated = 0;
  pool.setWorkerCreator(() => ({
    addEventListener() {}, postMessage() {}, terminate() { terminated++; }
  }));
  pool.postMessage({id: 1}).then(() => settled++);
  pool.postMessage({id: 2}).then(() => settled++);
  pool.dispose(); await Promise.resolve();
  console.log({settled, terminated, queue: pool.queue.length});
  const primary = require('./eyes/src/vendor/modules/MomentPrimary.cjs');
  const secondary = require('./eyes/src/vendor/modules/MomentSecondary.cjs');
  primary.locale('zh-cn');
  console.log({same: primary === secondary, p: primary.locale(), s: secondary.locale(), pv: primary.version, sv: secondary.version});
  const merge = require('./eyes/src/vendor/modules/Unidentified157.cjs');
  console.log(merge({a:[1],b:{x:1}}, {a:[2],b:{y:2}}));
})();
```

本轮实际输出：`settled:0, terminated:1, queue:0`；Moment `same:false,p:zh-cn,s:en,pv:2.29.1,sv:2.29.1`；merge `{a:[1,2],b:{x:1,y:2}}`。这证实注销未结算、双实例locale隔离与深合并数组拼接，不代替完整浏览器测试。

不阻断独立系统设计的未知：供应商部分精确版本、minifier原变量名、未公开上游差异；可选正式依赖并定义自己的可测契约。阻断“全部运行行为已验证”的真实缺口：损坏KTX/Draco及网络失败fixture、生产GPU格式矩阵、时区/DST历史对照、全部proj4精度基准、observer/touch/fullscreen卸载、双副本所有动态状态路径。这些仍未验证；没有把它们计作验收完成。新系统优先验证资源错误/取消、单一时钟、可序列化URL和卸载，再验收新渲染器/React UI。


## 7. 精确覆盖与349个模块逐文件映射

计数来自semantic-progress的精确状态筛选；全部源码读取，静态import/require边按相对路径解析。依赖列只列同目录模块，其他Three/runtime/JSON依赖见源码。直接应用调用指vendor外静态导入，不等于动态行为覆盖；“内部”不表示未使用。SHA256前12位固定此研究快照，不是上游等价证明。

| 家族（入口可达图，按前者优先去重） | 文件数 |
|---|---:|
| Swiper/Dom7 | 102 |
| KTX2 | 6 |
| proj4 | 105 |
| 独立/日期/适配 | 20 |
| Tippy/Popper A | 57 |
| Tippy/Popper B | 57 |
| Three工具 | 2 |
| Moment primary locale | 135 |
| Moment secondary locale | 135 |
| 总计 | 619 |

| 文件 / SHA256前12位 | 责任与身份 | 同目录直接依赖 | vendor外直接导入（文件:行） |
|---|---|---|---|
| [A11y.js](../../eyes/src/vendor/modules/A11y.js) `9b881b7405ea` | Swiper/Dom7：Swiper完整功能入口：安装Virtual至EffectCards插件并导出Swiper/default与插件 | `Swiper.js`, `Unidentified462.js`, `Unidentified463.js`, `Unidentified464.js`, `Unidentified465.js`, `Unidentified467.js`, `Unidentified469.js`, `Unidentified470.js`, `Unidentified471.js`, `Unidentified472.js`, `Unidentified473.js`, `Unidentified474.js`, `Unidentified475.js`, `Unidentified476.js`, `Unidentified477.js`, `Unidentified478.js`, `Unidentified479.js`, `Unidentified480.js`, `Unidentified481.js`, `Unidentified487.js`, `Unidentified491.js`, `Unidentified492.js`, `Unidentified494.js`, `Unidentified495.js`, `Unidentified496.js` | `ui/components/CarouselPanel.js:2`；`ui/components/TutorialOverlay.js:2` |
| [Ci.js](../../eyes/src/vendor/modules/Ci.js) `89c532d624d3` | KTX2：解析 KTX2 层级、DFD、键值和二进制纹理元数据 | — | 内部 |
| [D2R.js](../../eyes/src/vendor/modules/D2R.js) `2e0e6df7748d` | proj4：投影角度/弧度/角秒、WGS84椭球、基准类型常量 | — | 内部 |
| [DisplayP3ColorSpace.js](../../eyes/src/vendor/modules/DisplayP3ColorSpace.js) `1d68a298137e` | KTX2：Three P3/Rec2020色域矩阵、白点、传递函数、extended-srgb输出配置 | — | 内部 |
| [Dom7.js](../../eyes/src/vendor/modules/Dom7.js) `28e4363aca26` | Swiper/Dom7：提供链式 DOM 集合查询、样式、事件和节点操作 | `extend.js` | 内部 |
| [Dom7Entry.js](../../eyes/src/vendor/modules/Dom7Entry.js) `74f5ecd995af` | Swiper/Dom7：将 DOM 方法装配到 Dom7 原型并导出查询入口 | `Dom7.js` | 内部 |
| [EQUIT.js](../../eyes/src/vendor/modules/EQUIT.js) `b9fb3b3bcaee` | proj4：proj4投影插件：Lambert Azimuthal Equal Area, Lambert_Azimuthal_Equal_Area, laea；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js`, `Unidentified662.js`, `Unidentified663.js`, `Unidentified664.js` | 内部 |
| [Easing.js](../../eyes/src/vendor/modules/Easing.js) `7e11f77e2c8c` | 独立/日期/适配：Tween 插值动画工具 18.6.4：Easing 缓动族、Tween 状态、Group 更新、Interpolation 路径插值和递增 Sequence；并非仅缓动函数 | — | `engine/core/AppUtils.js:8` |
| [FollowName.cjs](../../eyes/src/vendor/modules/FollowName.cjs) `6281e6ab28e2` | 独立/日期/适配：将对应压缩时区 JSON 加载进 Moment Timezone 实例并导出该实例 | `Unidentified243.cjs` | `engine/core/BaseApp.js:3`；`engine/managers/AutoplayManager.js:3`；`engine/managers/CameraFollowManager.js:6`；`engine/managers/ContentManager.js:3`；`engine/managers/SceneManager.js:3`；`engine/managers/TimeManager-728.js:4`；`ui/views/BaseView.js:2` |
| [KeyStore.js](../../eyes/src/vendor/modules/KeyStore.js) `b8ecbb1bf6cd` | 独立/日期/适配：规范化 Fuse 搜索字段的路径、权重和键标识；构建并维护字符串/对象的 Fuse 搜索索引；使用位运算的 Bitap 模糊匹配与阈值评分；扩展搜索匹配器的模式存储基类；扩展搜索中的模糊模式匹配；扩展搜索中的包含模式匹配；解析扩展搜索语法并组合多条件匹配；以索引和评分规则执行加权模糊搜索 | — | `engine/managers/SearchManager.js:3` |
| [MomentPrimary.cjs](../../eyes/src/vendor/modules/MomentPrimary.cjs) `6653ab358990` | 独立/日期/适配：Moment 2.29.1 日期解析、格式化、时长、语言区域及 UTC/偏移处理；此副本有独立 locale 注册状态 | — | 内部 |
| [MomentSecondary.cjs](../../eyes/src/vendor/modules/MomentSecondary.cjs) `8e6681a85366` | 独立/日期/适配：Moment 2.29.1 日期解析、格式化、时长、语言区域及 UTC/偏移处理；此副本有独立 locale 注册状态 | — | `ui/components/EventsTimeline.js:2` |
| [N.js](../../eyes/src/vendor/modules/N.js) `ad74c957b8f8` | proj4：将超出范围的经度按 2π 折回；允许 force 参数保留输入 | `D2R.js`, `Unidentified611.js` | 内部 |
| [PROJJSONBuilder2015.js](../../eyes/src/vendor/modules/PROJJSONBuilder2015.js) `b80f27df04fc` | proj4：从 WKT 树构造 2015 规范的 PROJJSON 结构 | `Unidentified599.js` | 内部 |
| [PROJJSONBuilder2019.js](../../eyes/src/vendor/modules/PROJJSONBuilder2019.js) `1130f2800be3` | proj4：处理 WKT2:2019 的 USAGE/SCOPE/AREA/BBOX 元数据 | `Unidentified599.js` | 内部 |
| [Swiper.js](../../eyes/src/vendor/modules/Swiper.js) `79d7c3aaa3b8` | Swiper/Dom7：轮播实例，组合尺寸、事件、滑动、循环与扩展模块生命周期 | `Dom7Entry.js`, `Unidentified404.js`, `Unidentified405.js`, `Unidentified406.js`, `Unidentified407.js`, `Unidentified417.js`, `Unidentified423.js`, `Unidentified428.js`, `Unidentified436.js`, `Unidentified440.js`, `Unidentified443.js`, `Unidentified450.js`, `Unidentified453.js`, `Unidentified456.js`, `Unidentified459.js`, `Unidentified460.js`, `Unidentified461.js`, `animateCSSModeScroll.js`, `extend.js`, `getBrowser.js`, `getDevice.js`, `getSupport.js` | 内部 |
| [Unidentified112.cjs](../../eyes/src/vendor/modules/Unidentified112.cjs) `983f5c0a36b4` | 独立/日期/适配：恢复构建路径适配：manifest.revision + /bundled/a1553835436ceb1527f4.wasm；用途见decoder契约表 | — | 内部 |
| [Unidentified113.cjs](../../eyes/src/vendor/modules/Unidentified113.cjs) `e8851d1e0af5` | 独立/日期/适配：恢复构建路径适配：manifest.revision + /bundled/ced5c642e77e3c24f122.js；用途见decoder契约表 | — | 内部 |
| [Unidentified114.cjs](../../eyes/src/vendor/modules/Unidentified114.cjs) `c4e408029f5b` | 独立/日期/适配：恢复构建路径适配：manifest.revision + /bundled/786c7dae1f2e34c054da.js；用途见decoder契约表 | — | 内部 |
| [Unidentified115.cjs](../../eyes/src/vendor/modules/Unidentified115.cjs) `cd4547f706b9` | 独立/日期/适配：恢复构建路径适配：manifest.revision + /bundled/9d116d62fde9fd5bbbaa.js；用途见decoder契约表 | — | 内部 |
| [Unidentified116.cjs](../../eyes/src/vendor/modules/Unidentified116.cjs) `f5c54ae1ecef` | 独立/日期/适配：恢复构建路径适配：manifest.revision + /bundled/8e17072deeb50510e590.wasm；用途见decoder契约表 | — | 内部 |
| [Unidentified157.cjs](../../eyes/src/vendor/modules/Unidentified157.cjs) `a22cdf4988f2` | 独立/日期/适配：递归深合并；默认数组concat，clone/arrayMerge/customMerge/isMergeableObject配置与all批量归并；不是等值比较 | — | `engine/core/AppUtils.js:3` |
| [Unidentified158.cjs](../../eyes/src/vendor/modules/Unidentified158.cjs) `0ff204298344` | 独立/日期/适配：带 leading、trailing、maxWait 的调用防抖 | — | `engine/core/AppUtils.js:4` |
| [Unidentified159.cjs](../../eyes/src/vendor/modules/Unidentified159.cjs) `8d1bcf726bb4` | 独立/日期/适配：限制函数调用频率，复用防抖和最大等待窗口 | — | `engine/core/AppUtils.js:5` |
| [Unidentified160.cjs](../../eyes/src/vendor/modules/Unidentified160.cjs) `f38ef8540715` | 独立/日期/适配：自定义滚动条实现，观察尺寸和 DOM 并管理原生滚动同步 | — | `engine/core/AppUtils.js:6` |
| [Unidentified167.js](../../eyes/src/vendor/modules/Unidentified167.js) `7248d6faa862` | 独立/日期/适配：封装不同浏览器前缀的全屏请求、退出与状态事件 | — | `ui/components/Settings.js:2` |
| [Unidentified169.js](../../eyes/src/vendor/modules/Unidentified169.js) `b78c2ae417f6` | Tippy/Popper A：Popper 浮层定位：把计算样式和属性应用到浮层、箭头、参考元素，并在清理时撤销 | `Unidentified170.js`, `isElement-171.js` | 内部 |
| [Unidentified170.js](../../eyes/src/vendor/modules/Unidentified170.js) `54cb5b2f3575` | Tippy/Popper A：Popper 浮层定位：取得 DOM nodeName 的小写形式 | — | 内部 |
| [Unidentified172.js](../../eyes/src/vendor/modules/Unidentified172.js) `1aeaea41ed44` | Tippy/Popper A：Popper 浮层定位：取得节点所属 window，处理跨文档和无节点输入 | — | 内部 |
| [Unidentified175.js](../../eyes/src/vendor/modules/Unidentified175.js) `261f8293488a` | Tippy/Popper A：Popper 浮层定位：计算相对 offsetParent 的参考矩形，补偿缩放、滚动和边框 | `Unidentified170.js`, `Unidentified176.js`, `Unidentified180.js`, `Unidentified183.js`, `Unidentified184.js`, `Unidentified185.js`, `isElement-171.js`, `max-177.js` | 内部 |
| [Unidentified176.js](../../eyes/src/vendor/modules/Unidentified176.js) `507572ba3c36` | Tippy/Popper A：Popper 浮层定位：归一化 boundingClientRect，补偿元素缩放和 visualViewport 偏移 | `Unidentified172.js`, `Unidentified178.js`, `isElement-171.js`, `max-177.js` | 内部 |
| [Unidentified178.js](../../eyes/src/vendor/modules/Unidentified178.js) `55e64c939414` | Tippy/Popper A：Popper 浮层定位：根据 Safari UA 判断视口偏移策略 | `Unidentified179.js` | 内部 |
| [Unidentified179.js](../../eyes/src/vendor/modules/Unidentified179.js) `f9c571210866` | Tippy/Popper A：Popper 浮层定位：优先读取 User-Agent Client Hints，再回退 navigator.userAgent | — | 内部 |
| [Unidentified180.js](../../eyes/src/vendor/modules/Unidentified180.js) `ab2f075bfcbe` | Tippy/Popper A：Popper 浮层定位：按节点类型选择 window 或元素的滚动偏移 | `Unidentified172.js`, `Unidentified181.js`, `Unidentified182.js`, `isElement-171.js` | 内部 |
| [Unidentified181.js](../../eyes/src/vendor/modules/Unidentified181.js) `fe6869ddfe16` | Tippy/Popper A：Popper 浮层定位：取得 window pageXOffset/pageYOffset | `Unidentified172.js` | 内部 |
| [Unidentified182.js](../../eyes/src/vendor/modules/Unidentified182.js) `8f65ce8e970b` | Tippy/Popper A：Popper 浮层定位：取得元素 scrollLeft/scrollTop | — | 内部 |
| [Unidentified183.js](../../eyes/src/vendor/modules/Unidentified183.js) `4785be75107d` | Tippy/Popper A：Popper 浮层定位：计算文档根元素与 window 滚动的横向差值 | `Unidentified176.js`, `Unidentified181.js`, `Unidentified184.js` | 内部 |
| [Unidentified184.js](../../eyes/src/vendor/modules/Unidentified184.js) `8e7bd6ae1097` | Tippy/Popper A：Popper 浮层定位：取得所属文档的 documentElement | `isElement-171.js` | 内部 |
| [Unidentified185.js](../../eyes/src/vendor/modules/Unidentified185.js) `ffe206f0224e` | Tippy/Popper A：Popper 浮层定位：依据 overflow/overflowX/overflowY 判断滚动裁剪祖先 | `Unidentified186.js` | 内部 |
| [Unidentified186.js](../../eyes/src/vendor/modules/Unidentified186.js) `ca86670bf3b6` | Tippy/Popper A：Popper 浮层定位：通过节点所属 window 读取计算样式 | `Unidentified172.js` | 内部 |
| [Unidentified187.js](../../eyes/src/vendor/modules/Unidentified187.js) `d81c1db25234` | Tippy/Popper A：Popper 浮层定位：返回 offset 布局矩形并校正一像素内的测量差 | `Unidentified176.js` | 内部 |
| [Unidentified188.js](../../eyes/src/vendor/modules/Unidentified188.js) `c21a210cfbf4` | Tippy/Popper A：Popper 浮层定位：递归收集滚动祖先及 window/visualViewport | `Unidentified172.js`, `Unidentified185.js`, `Unidentified189.js`, `Unidentified190.js` | 内部 |
| [Unidentified189.js](../../eyes/src/vendor/modules/Unidentified189.js) `a2107ef097ac` | Tippy/Popper A：Popper 浮层定位：向上寻找最近的滚动祖先 | `Unidentified170.js`, `Unidentified185.js`, `Unidentified190.js`, `isElement-171.js` | 内部 |
| [Unidentified190.js](../../eyes/src/vendor/modules/Unidentified190.js) `42470de4cf47` | Tippy/Popper A：Popper 浮层定位：处理 assignedSlot、parentNode、ShadowRoot host 的祖先遍历 | `Unidentified170.js`, `Unidentified184.js`, `isElement-171.js` | 内部 |
| [Unidentified191.js](../../eyes/src/vendor/modules/Unidentified191.js) `83178cb93e9b` | Tippy/Popper A：Popper 浮层定位：跳过 static table，识别 transform/filter 等 containing block | `Unidentified170.js`, `Unidentified172.js`, `Unidentified179.js`, `Unidentified186.js`, `Unidentified190.js`, `Unidentified192.js`, `isElement-171.js` | 内部 |
| [Unidentified192.js](../../eyes/src/vendor/modules/Unidentified192.js) `a4dc68355f7e` | Tippy/Popper A：Popper 浮层定位：判断 table、td、th 类型 | `Unidentified170.js` | 内部 |
| [Unidentified193.js](../../eyes/src/vendor/modules/Unidentified193.js) `03721b694edc` | Tippy/Popper A：Popper 浮层定位：按依赖拓扑和 read/main/write 阶段排序定位修饰器 | `afterMain-194.js` | 内部 |
| [Unidentified195.js](../../eyes/src/vendor/modules/Unidentified195.js) `2ffe539bda1f` | Tippy/Popper A：Popper 浮层定位：把同一微任务前的重复请求合并为一个 Promise | — | 内部 |
| [Unidentified196.js](../../eyes/src/vendor/modules/Unidentified196.js) `1c28fefbb9c3` | Tippy/Popper A：Popper 浮层定位：按修饰器名称合并 options 和 data | — | 内部 |
| [Unidentified197.js](../../eyes/src/vendor/modules/Unidentified197.js) `f88791a5d1e1` | Tippy/Popper A：Popper 浮层定位：比较参考或浮层边界与裁剪矩形，返回四边溢出量 | `Unidentified176.js`, `Unidentified184.js`, `Unidentified198.js`, `Unidentified202.js`, `Unidentified203.js`, `Unidentified207.js`, `Unidentified209.js`, `afterMain-194.js`, `isElement-171.js` | 内部 |
| [Unidentified198.js](../../eyes/src/vendor/modules/Unidentified198.js) `daa1fbea2ccb` | Tippy/Popper A：Popper 浮层定位：求多个裁剪祖先与根边界矩形的交集 | `Unidentified170.js`, `Unidentified176.js`, `Unidentified184.js`, `Unidentified186.js`, `Unidentified188.js`, `Unidentified190.js`, `Unidentified191.js`, `Unidentified199.js`, `Unidentified200.js`, `Unidentified201.js`, `Unidentified202.js`, `afterMain-194.js`, `isElement-171.js`, `max-177.js` | 内部 |
| [Unidentified199.js](../../eyes/src/vendor/modules/Unidentified199.js) `e98e0b8284f0` | Tippy/Popper A：Popper 浮层定位：计算布局/视觉视口尺寸和偏移 | `Unidentified172.js`, `Unidentified178.js`, `Unidentified183.js`, `Unidentified184.js` | 内部 |
| [Unidentified200.js](../../eyes/src/vendor/modules/Unidentified200.js) `f79405fdc6c8` | Tippy/Popper A：Popper 浮层定位：计算完整文档滚动范围并补偿 RTL 横向位置 | `Unidentified181.js`, `Unidentified183.js`, `Unidentified184.js`, `Unidentified186.js`, `max-177.js` | 内部 |
| [Unidentified201.js](../../eyes/src/vendor/modules/Unidentified201.js) `a49688c1f0d5` | Tippy/Popper A：Popper 浮层定位：沿 Shadow DOM host 链执行包含关系判断 | `isElement-171.js` | 内部 |
| [Unidentified202.js](../../eyes/src/vendor/modules/Unidentified202.js) `830dabf129c5` | Tippy/Popper A：Popper 浮层定位：为 x/y/width/height 矩形补齐 top/right/bottom/left | — | 内部 |
| [Unidentified203.js](../../eyes/src/vendor/modules/Unidentified203.js) `948d4973bdfb` | Tippy/Popper A：Popper 浮层定位：根据 placement 和 start/end 对齐计算浮层位置 | `Unidentified204.js`, `Unidentified205.js`, `Unidentified206.js`, `afterMain-194.js` | 内部 |
| [Unidentified204.js](../../eyes/src/vendor/modules/Unidentified204.js) `72aab1cb242f` | Tippy/Popper A：Popper 浮层定位：提取 placement 连字符前的方向 | — | 内部 |
| [Unidentified205.js](../../eyes/src/vendor/modules/Unidentified205.js) `4f17e4644b83` | Tippy/Popper A：Popper 浮层定位：提取 placement 连字符后的 start/end 变化 | — | 内部 |
| [Unidentified206.js](../../eyes/src/vendor/modules/Unidentified206.js) `3c35fbf12140` | Tippy/Popper A：Popper 浮层定位：将 top/bottom 映射到 x，left/right 映射到 y | — | 内部 |
| [Unidentified207.js](../../eyes/src/vendor/modules/Unidentified207.js) `2ef3b07fd391` | Tippy/Popper A：Popper 浮层定位：用给定四边 padding 覆盖零值默认对象 | `Unidentified208.js` | 内部 |
| [Unidentified208.js](../../eyes/src/vendor/modules/Unidentified208.js) `2995a6bd5bcb` | Tippy/Popper A：Popper 浮层定位：创建上下左右全零的独立对象 | — | 内部 |
| [Unidentified209.js](../../eyes/src/vendor/modules/Unidentified209.js) `df91a345f7ea` | Tippy/Popper A：Popper 浮层定位：将同一值分配给一组侧边键 | — | 内部 |
| [Unidentified210.js](../../eyes/src/vendor/modules/Unidentified210.js) `c62045cd8c49` | Tippy/Popper A：Popper 浮层定位：注册滚动和 resize 更新监听并返回清理函数 | `Unidentified172.js` | 内部 |
| [Unidentified211.js](../../eyes/src/vendor/modules/Unidentified211.js) `c60f10b4bf8e` | Tippy/Popper A：Popper 浮层定位：在 read 阶段建立 popperOffsets 坐标 | `Unidentified203.js` | 内部 |
| [Unidentified214.js](../../eyes/src/vendor/modules/Unidentified214.js) `727db3ce8e9e` | Tippy/Popper A：Popper 浮层定位：根据溢出程度切换首选方向及候选方向 | `Unidentified197.js`, `Unidentified204.js`, `Unidentified205.js`, `Unidentified215.js`, `Unidentified216.js`, `Unidentified217.js`, `afterMain-194.js` | 内部 |
| [Unidentified215.js](../../eyes/src/vendor/modules/Unidentified215.js) `42d8f73255bc` | Tippy/Popper A：Popper 浮层定位：交换 top/bottom 和 left/right | — | 内部 |
| [Unidentified216.js](../../eyes/src/vendor/modules/Unidentified216.js) `6b0cdf16e5d6` | Tippy/Popper A：Popper 浮层定位：交换 start/end 对齐 | — | 内部 |
| [Unidentified217.js](../../eyes/src/vendor/modules/Unidentified217.js) `f11dc43a1e5a` | Tippy/Popper A：Popper 浮层定位：按方向的溢出量排序自动定位候选 | `Unidentified197.js`, `Unidentified204.js`, `Unidentified205.js`, `afterMain-194.js` | 内部 |
| [Unidentified218.js](../../eyes/src/vendor/modules/Unidentified218.js) `2c9a16f24c0f` | Tippy/Popper A：Popper 浮层定位：沿主轴/副轴约束浮层，结合 tether 保持参考联系 | `Unidentified187.js`, `Unidentified191.js`, `Unidentified197.js`, `Unidentified204.js`, `Unidentified205.js`, `Unidentified206.js`, `Unidentified208.js`, `Unidentified219.js`, `afterMain-194.js`, `max-177.js`, `within-220.js` | 内部 |
| [Unidentified219.js](../../eyes/src/vendor/modules/Unidentified219.js) `a31bf9e459a4` | Tippy/Popper A：Popper 浮层定位：在 x 和 y 之间切换 | — | 内部 |
| [Unidentified221.js](../../eyes/src/vendor/modules/Unidentified221.js) `41ad21b16057` | Tippy/Popper A：Popper 浮层定位：计算箭头在浮层内的偏移及中心误差 | `Unidentified187.js`, `Unidentified191.js`, `Unidentified201.js`, `Unidentified204.js`, `Unidentified206.js`, `Unidentified207.js`, `Unidentified209.js`, `afterMain-194.js`, `within-220.js` | 内部 |
| [Unidentified222.js](../../eyes/src/vendor/modules/Unidentified222.js) `351b90a22dae` | Tippy/Popper A：Popper 浮层定位：识别参考被裁剪或浮层逃逸并设置 data 属性 | `Unidentified197.js`, `afterMain-194.js` | 内部 |
| [Unidentified243.cjs](../../eyes/src/vendor/modules/Unidentified243.cjs) `35a78d0485db` | 独立/日期/适配：Moment Timezone 0.5.33：时区数据库加载、偏移计算、时间转换与猜测 | `MomentPrimary.cjs` | 内部 |
| [Unidentified404.js](../../eyes/src/vendor/modules/Unidentified404.js) `8a959cc9fcaa` | Swiper/Dom7：观察容器 ResizeObserver 或 window resize 并发射轮播尺寸事件 | `extend.js` | 内部 |
| [Unidentified405.js](../../eyes/src/vendor/modules/Unidentified405.js) `b5bced7c62dc` | Swiper/Dom7：观察 DOM mutation 并通知轮播更新 | `extend.js` | 内部 |
| [Unidentified406.js](../../eyes/src/vendor/modules/Unidentified406.js) `b53eb775b988` | Swiper/Dom7：实现 eventsEmitter；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified407.js](../../eyes/src/vendor/modules/Unidentified407.js) `83610ff81ad2` | Swiper/Dom7：实现 update；调用方以这些语义键装配模块 | `Unidentified408.js`, `Unidentified409.js`, `Unidentified410.js`, `Unidentified411.js`, `Unidentified412.js`, `Unidentified413.js`, `Unidentified414.js`, `Unidentified415.js`, `Unidentified416.js` | 内部 |
| [Unidentified408.js](../../eyes/src/vendor/modules/Unidentified408.js) `77ce9d1cdb1d` | Swiper/Dom7：实现 updateSize；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified409.js](../../eyes/src/vendor/modules/Unidentified409.js) `f42ca8d1e333` | Swiper/Dom7：实现 updateSlides；调用方以这些语义键装配模块 | `animateCSSModeScroll.js` | 内部 |
| [Unidentified410.js](../../eyes/src/vendor/modules/Unidentified410.js) `684c6b757f10` | Swiper/Dom7：实现 updateAutoHeight；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified411.js](../../eyes/src/vendor/modules/Unidentified411.js) `fe8a07478e6d` | Swiper/Dom7：实现 updateSlidesOffset；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified412.js](../../eyes/src/vendor/modules/Unidentified412.js) `98aeacdb43e2` | Swiper/Dom7：实现 updateSlidesProgress；调用方以这些语义键装配模块 | `Dom7Entry.js` | 内部 |
| [Unidentified413.js](../../eyes/src/vendor/modules/Unidentified413.js) `99e66f35905d` | Swiper/Dom7：实现 updateProgress；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified414.js](../../eyes/src/vendor/modules/Unidentified414.js) `45b74dde8b8e` | Swiper/Dom7：实现 updateSlidesClasses；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified415.js](../../eyes/src/vendor/modules/Unidentified415.js) `add7c1bff616` | Swiper/Dom7：实现 updateActiveIndex；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified416.js](../../eyes/src/vendor/modules/Unidentified416.js) `24422629022b` | Swiper/Dom7：实现 updateClickedSlide；调用方以这些语义键装配模块 | `Dom7Entry.js` | 内部 |
| [Unidentified417.js](../../eyes/src/vendor/modules/Unidentified417.js) `83b4f643c0f1` | Swiper/Dom7：实现 translate；调用方以这些语义键装配模块 | `Unidentified418.js`, `Unidentified419.js`, `Unidentified420.js`, `Unidentified421.js`, `Unidentified422.js` | 内部 |
| [Unidentified418.js](../../eyes/src/vendor/modules/Unidentified418.js) `cba87d74b67a` | Swiper/Dom7：实现 getTranslate；调用方以这些语义键装配模块 | `animateCSSModeScroll.js` | 内部 |
| [Unidentified419.js](../../eyes/src/vendor/modules/Unidentified419.js) `3f140399c167` | Swiper/Dom7：实现 setTranslate；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified420.js](../../eyes/src/vendor/modules/Unidentified420.js) `9c7e0ed6b432` | Swiper/Dom7：实现 minTranslate；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified421.js](../../eyes/src/vendor/modules/Unidentified421.js) `0d766ab032da` | Swiper/Dom7：实现 maxTranslate；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified422.js](../../eyes/src/vendor/modules/Unidentified422.js) `498ba89e00c9` | Swiper/Dom7：实现 translateTo；调用方以这些语义键装配模块 | `animateCSSModeScroll.js` | 内部 |
| [Unidentified423.js](../../eyes/src/vendor/modules/Unidentified423.js) `114fcbfe1fba` | Swiper/Dom7：实现 transition；调用方以这些语义键装配模块 | `Unidentified424.js`, `Unidentified425.js`, `Unidentified427.js` | 内部 |
| [Unidentified424.js](../../eyes/src/vendor/modules/Unidentified424.js) `6f197263f394` | Swiper/Dom7：实现 setTransition；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified425.js](../../eyes/src/vendor/modules/Unidentified425.js) `8ca04b782e31` | Swiper/Dom7：实现 transitionStart；调用方以这些语义键装配模块 | `Unidentified426.js` | 内部 |
| [Unidentified426.js](../../eyes/src/vendor/modules/Unidentified426.js) `3d0b1e8c692d` | Swiper/Dom7：按当前/前一索引判断 next/prev/reset 并发射过渡阶段事件 | — | 内部 |
| [Unidentified427.js](../../eyes/src/vendor/modules/Unidentified427.js) `eecac4ee82f5` | Swiper/Dom7：实现 transitionEnd；调用方以这些语义键装配模块 | `Unidentified426.js` | 内部 |
| [Unidentified428.js](../../eyes/src/vendor/modules/Unidentified428.js) `4f9b64a85007` | Swiper/Dom7：实现 slide；调用方以这些语义键装配模块 | `Unidentified429.js`, `Unidentified430.js`, `Unidentified431.js`, `Unidentified432.js`, `Unidentified433.js`, `Unidentified434.js`, `Unidentified435.js` | 内部 |
| [Unidentified429.js](../../eyes/src/vendor/modules/Unidentified429.js) `6700b6dd14e7` | Swiper/Dom7：实现 slideTo；调用方以这些语义键装配模块 | `animateCSSModeScroll.js` | 内部 |
| [Unidentified430.js](../../eyes/src/vendor/modules/Unidentified430.js) `12f8d1804133` | Swiper/Dom7：实现 slideToLoop；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified431.js](../../eyes/src/vendor/modules/Unidentified431.js) `6a383a28ef36` | Swiper/Dom7：实现 slideNext；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified432.js](../../eyes/src/vendor/modules/Unidentified432.js) `a29ef8725a6f` | Swiper/Dom7：实现 slidePrev；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified433.js](../../eyes/src/vendor/modules/Unidentified433.js) `b43723178fe1` | Swiper/Dom7：实现 slideReset；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified434.js](../../eyes/src/vendor/modules/Unidentified434.js) `e50a8209bd17` | Swiper/Dom7：实现 slideToClosest；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified435.js](../../eyes/src/vendor/modules/Unidentified435.js) `7d435d0b5449` | Swiper/Dom7：实现 slideToClickedSlide；调用方以这些语义键装配模块 | `Dom7Entry.js`, `animateCSSModeScroll.js` | 内部 |
| [Unidentified436.js](../../eyes/src/vendor/modules/Unidentified436.js) `5f55362c7670` | Swiper/Dom7：实现 loop；调用方以这些语义键装配模块 | `Unidentified437.js`, `Unidentified438.js`, `Unidentified439.js` | 内部 |
| [Unidentified437.js](../../eyes/src/vendor/modules/Unidentified437.js) `7694264d19d3` | Swiper/Dom7：实现 loopCreate；调用方以这些语义键装配模块 | `Dom7Entry.js`, `extend.js` | 内部 |
| [Unidentified438.js](../../eyes/src/vendor/modules/Unidentified438.js) `7a0f2d4ed395` | Swiper/Dom7：实现 loopFix；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified439.js](../../eyes/src/vendor/modules/Unidentified439.js) `2c4772a43629` | Swiper/Dom7：实现 loopDestroy；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified440.js](../../eyes/src/vendor/modules/Unidentified440.js) `6633715b29b8` | Swiper/Dom7：实现 grabCursor；调用方以这些语义键装配模块 | `Unidentified441.js`, `Unidentified442.js` | 内部 |
| [Unidentified441.js](../../eyes/src/vendor/modules/Unidentified441.js) `c36b85203998` | Swiper/Dom7：实现 setGrabCursor；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified442.js](../../eyes/src/vendor/modules/Unidentified442.js) `e0c5e1436a5a` | Swiper/Dom7：实现 unsetGrabCursor；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified443.js](../../eyes/src/vendor/modules/Unidentified443.js) `a6ec18d07f4c` | Swiper/Dom7：实现 events；调用方以这些语义键装配模块 | `Unidentified444.js`, `Unidentified445.js`, `Unidentified446.js`, `Unidentified447.js`, `Unidentified448.js`, `Unidentified449.js`, `extend.js` | 内部 |
| [Unidentified444.js](../../eyes/src/vendor/modules/Unidentified444.js) `630233a4f961` | Swiper/Dom7：筛选有效触摸/指针起点，初始化拖动状态并发射 touchStart | `Dom7Entry.js`, `animateCSSModeScroll.js`, `extend.js` | 内部 |
| [Unidentified445.js](../../eyes/src/vendor/modules/Unidentified445.js) `4b6a71be0aba` | Swiper/Dom7：判定滚动方向、阈值和嵌套拖动，更新平移及速度采样 | `Dom7Entry.js`, `animateCSSModeScroll.js`, `extend.js` | 内部 |
| [Unidentified446.js](../../eyes/src/vendor/modules/Unidentified446.js) `e6094ecb6c9d` | Swiper/Dom7：结束拖动，处理点击/双击、惯性以及滑片吸附 | `animateCSSModeScroll.js` | 内部 |
| [Unidentified447.js](../../eyes/src/vendor/modules/Unidentified447.js) `8abf96e10e18` | Swiper/Dom7：重算响应式断点、容器与滑片尺寸，恢复索引和导航锁 | — | 内部 |
| [Unidentified448.js](../../eyes/src/vendor/modules/Unidentified448.js) `8db97628520b` | Swiper/Dom7：拖动或动画期间按配置阻止点击默认行为及传播 | — | 内部 |
| [Unidentified449.js](../../eyes/src/vendor/modules/Unidentified449.js) `686296aa2054` | Swiper/Dom7：CSS scroll 模式下同步 scrollLeft/Top 到平移、索引和进度 | — | 内部 |
| [Unidentified450.js](../../eyes/src/vendor/modules/Unidentified450.js) `400566df08ee` | Swiper/Dom7：实现 breakpoints；调用方以这些语义键装配模块 | `Unidentified451.js`, `Unidentified452.js` | 内部 |
| [Unidentified451.js](../../eyes/src/vendor/modules/Unidentified451.js) `8122707cf409` | Swiper/Dom7：实现 setBreakpoint；调用方以这些语义键装配模块 | `animateCSSModeScroll.js` | 内部 |
| [Unidentified452.js](../../eyes/src/vendor/modules/Unidentified452.js) `50a51535794b` | Swiper/Dom7：实现 getBreakpoint；调用方以这些语义键装配模块 | `extend.js` | 内部 |
| [Unidentified453.js](../../eyes/src/vendor/modules/Unidentified453.js) `1b3e5fd28725` | Swiper/Dom7：实现 classes；调用方以这些语义键装配模块 | `Unidentified454.js`, `Unidentified455.js` | 内部 |
| [Unidentified454.js](../../eyes/src/vendor/modules/Unidentified454.js) `2ba1ba1661d6` | Swiper/Dom7：实现 addClasses；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified455.js](../../eyes/src/vendor/modules/Unidentified455.js) `3e56bc51260d` | Swiper/Dom7：实现 removeClasses；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified456.js](../../eyes/src/vendor/modules/Unidentified456.js) `2435ea09f1f6` | Swiper/Dom7：实现 images；调用方以这些语义键装配模块 | `Unidentified457.js`, `Unidentified458.js` | 内部 |
| [Unidentified457.js](../../eyes/src/vendor/modules/Unidentified457.js) `76728abb19e3` | Swiper/Dom7：实现 loadImage；调用方以这些语义键装配模块 | `Dom7Entry.js`, `extend.js` | 内部 |
| [Unidentified458.js](../../eyes/src/vendor/modules/Unidentified458.js) `05d643080963` | Swiper/Dom7：实现 preloadImages；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified459.js](../../eyes/src/vendor/modules/Unidentified459.js) `860b3084775f` | Swiper/Dom7：实现 checkOverflow；调用方以这些语义键装配模块 | — | 内部 |
| [Unidentified460.js](../../eyes/src/vendor/modules/Unidentified460.js) `eea5f4a4aec6` | Swiper/Dom7：轮播默认配置表：触摸、布局、类名、循环、断点与交互策略 | — | 内部 |
| [Unidentified461.js](../../eyes/src/vendor/modules/Unidentified461.js) `9580335b202f` | Swiper/Dom7：扩展模块默认参数，并规范化 enabled/auto/navigation 等输入 | `animateCSSModeScroll.js` | 内部 |
| [Unidentified462.js](../../eyes/src/vendor/modules/Unidentified462.js) `cccdbb0b3792` | Swiper/Dom7：Swiper 的 Virtual 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Dom7Entry.js`, `animateCSSModeScroll.js` | 内部 |
| [Unidentified463.js](../../eyes/src/vendor/modules/Unidentified463.js) `6cbd267aa6a4` | Swiper/Dom7：Swiper 的 Keyboard 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Dom7Entry.js`, `extend.js` | 内部 |
| [Unidentified464.js](../../eyes/src/vendor/modules/Unidentified464.js) `1b378dadd1ee` | Swiper/Dom7：Swiper 的 Mousewheel 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Dom7Entry.js`, `animateCSSModeScroll.js`, `extend.js` | 内部 |
| [Unidentified465.js](../../eyes/src/vendor/modules/Unidentified465.js) `67101a69363e` | Swiper/Dom7：Swiper 的 Navigation 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Dom7Entry.js`, `Unidentified466.js` | 内部 |
| [Unidentified466.js](../../eyes/src/vendor/modules/Unidentified466.js) `a889e3605c18` | Swiper/Dom7：按 createElements/auto 配置创建缺失的导航等 DOM 并同步参数 | `extend.js` | 内部 |
| [Unidentified467.js](../../eyes/src/vendor/modules/Unidentified467.js) `66c57a4c19d3` | Swiper/Dom7：Swiper 的 Pagination 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Dom7Entry.js`, `Unidentified466.js`, `Unidentified468.js` | 内部 |
| [Unidentified468.js](../../eyes/src/vendor/modules/Unidentified468.js) `53dd3088e24c` | Swiper/Dom7：将类名转换为选择器并转义特殊标点 | — | 内部 |
| [Unidentified469.js](../../eyes/src/vendor/modules/Unidentified469.js) `b1d9d9eaf7bd` | Swiper/Dom7：Swiper 的 Scrollbar 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Dom7Entry.js`, `Unidentified466.js`, `animateCSSModeScroll.js`, `extend.js` | 内部 |
| [Unidentified470.js](../../eyes/src/vendor/modules/Unidentified470.js) `72a078248a7f` | Swiper/Dom7：Swiper 的 Parallax 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Dom7Entry.js` | 内部 |
| [Unidentified471.js](../../eyes/src/vendor/modules/Unidentified471.js) `0f9476313b7e` | Swiper/Dom7：Swiper 的 Zoom 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Dom7Entry.js`, `animateCSSModeScroll.js`, `extend.js` | 内部 |
| [Unidentified472.js](../../eyes/src/vendor/modules/Unidentified472.js) `f9d0cb959188` | Swiper/Dom7：Swiper 的 Lazy 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Dom7Entry.js`, `extend.js` | 内部 |
| [Unidentified473.js](../../eyes/src/vendor/modules/Unidentified473.js) `337292bb3ee0` | Swiper/Dom7：Swiper 的 Controller 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `animateCSSModeScroll.js` | 内部 |
| [Unidentified474.js](../../eyes/src/vendor/modules/Unidentified474.js) `00d1f1e0e4c8` | Swiper/Dom7：Swiper 的 A11y 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Dom7Entry.js`, `Unidentified468.js` | 内部 |
| [Unidentified475.js](../../eyes/src/vendor/modules/Unidentified475.js) `01cb7e99c053` | Swiper/Dom7：Swiper 的 History 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `extend.js` | 内部 |
| [Unidentified476.js](../../eyes/src/vendor/modules/Unidentified476.js) `56a4271d16f5` | Swiper/Dom7：Swiper 的 HashNavigation 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Dom7Entry.js`, `extend.js` | 内部 |
| [Unidentified477.js](../../eyes/src/vendor/modules/Unidentified477.js) `615a736cbb2c` | Swiper/Dom7：Swiper 的 Autoplay 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `animateCSSModeScroll.js`, `extend.js` | 内部 |
| [Unidentified478.js](../../eyes/src/vendor/modules/Unidentified478.js) `bf1c3bbb924b` | Swiper/Dom7：Swiper 的 Thumbs 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Dom7Entry.js`, `animateCSSModeScroll.js` | 内部 |
| [Unidentified479.js](../../eyes/src/vendor/modules/Unidentified479.js) `597f4c5c4fc9` | Swiper/Dom7：Swiper 的 FreeMode 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `animateCSSModeScroll.js` | 内部 |
| [Unidentified480.js](../../eyes/src/vendor/modules/Unidentified480.js) `620a3cb33e83` | Swiper/Dom7：Swiper 的 Grid 功能插件；按初始化、更新和销毁事件管理状态及 DOM | — | 内部 |
| [Unidentified481.js](../../eyes/src/vendor/modules/Unidentified481.js) `b6e4fc0ada0b` | Swiper/Dom7：将滑片添加、插入、移除接口绑定到轮播实例 | `Unidentified482.js`, `Unidentified483.js`, `Unidentified484.js`, `Unidentified485.js`, `Unidentified486.js` | 内部 |
| [Unidentified482.js](../../eyes/src/vendor/modules/Unidentified482.js) `533e02b4f622` | Swiper/Dom7：末尾添加滑片，重建循环并按 observer 状态更新 | — | 内部 |
| [Unidentified483.js](../../eyes/src/vendor/modules/Unidentified483.js) `b55ce0896a48` | Swiper/Dom7：开头添加滑片，按新增数量修正当前索引并重建循环 | — | 内部 |
| [Unidentified484.js](../../eyes/src/vendor/modules/Unidentified484.js) `ddaa27155f75` | Swiper/Dom7：在索引处插入滑片，移动尾部节点并维持当前滑片位置 | — | 内部 |
| [Unidentified485.js](../../eyes/src/vendor/modules/Unidentified485.js) `060ba863164d` | Swiper/Dom7：移除一个或多个索引滑片并修正当前索引及循环副本 | — | 内部 |
| [Unidentified486.js](../../eyes/src/vendor/modules/Unidentified486.js) `514a97e5514c` | Swiper/Dom7：构造所有滑片索引并委托 removeSlide 删除 | — | 内部 |
| [Unidentified487.js](../../eyes/src/vendor/modules/Unidentified487.js) `6fa448f3c0f6` | Swiper/Dom7：Swiper 的 EffectFade 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Unidentified488.js`, `Unidentified489.js`, `Unidentified490.js` | 内部 |
| [Unidentified488.js](../../eyes/src/vendor/modules/Unidentified488.js) `9b52fc5f28ed` | Swiper/Dom7：在 beforeInit/setTranslate/setTransition 上装配视觉效果与透视类 | — | 内部 |
| [Unidentified489.js](../../eyes/src/vendor/modules/Unidentified489.js) `aefdc2e203a0` | Swiper/Dom7：选择效果 transformEl 并隐藏背面，否则返回原滑片 | — | 内部 |
| [Unidentified490.js](../../eyes/src/vendor/modules/Unidentified490.js) `464e5a7be581` | Swiper/Dom7：为虚拟平移模式监听效果目标的 transitionend 并结束动画 | — | 内部 |
| [Unidentified491.js](../../eyes/src/vendor/modules/Unidentified491.js) `49f2e91a7d15` | Swiper/Dom7：Swiper 的 EffectCube 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Dom7Entry.js`, `Unidentified488.js` | 内部 |
| [Unidentified492.js](../../eyes/src/vendor/modules/Unidentified492.js) `9c99577dd2bc` | Swiper/Dom7：Swiper 的 EffectFlip 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Unidentified488.js`, `Unidentified489.js`, `Unidentified490.js`, `Unidentified493.js` | 内部 |
| [Unidentified493.js](../../eyes/src/vendor/modules/Unidentified493.js) `12a3c3d5b596` | Swiper/Dom7：创建或复用 swiper-slide-shadow 节点用于 3D 效果明暗 | `Dom7Entry.js` | 内部 |
| [Unidentified494.js](../../eyes/src/vendor/modules/Unidentified494.js) `4833f93e664e` | Swiper/Dom7：Swiper 的 EffectCoverflow 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Unidentified488.js`, `Unidentified489.js`, `Unidentified493.js` | 内部 |
| [Unidentified495.js](../../eyes/src/vendor/modules/Unidentified495.js) `fbf35fecee56` | Swiper/Dom7：Swiper 的 EffectCreative 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Unidentified488.js`, `Unidentified489.js`, `Unidentified490.js`, `Unidentified493.js` | 内部 |
| [Unidentified496.js](../../eyes/src/vendor/modules/Unidentified496.js) `b4a43a041275` | Swiper/Dom7：Swiper 的 EffectCards 功能插件；按初始化、更新和销毁事件管理状态及 DOM | `Unidentified488.js`, `Unidentified489.js`, `Unidentified490.js`, `Unidentified493.js` | 内部 |
| [Unidentified585.js](../../eyes/src/vendor/modules/Unidentified585.js) `ba9d5a27a9d0` | proj4：组装 proj4 兼容坐标转换入口、投影注册表和定义 API | `Unidentified586.js`, `Unidentified587.js`, `Unidentified589.js`, `Unidentified624.js`, `Unidentified626.js`, `Unidentified628.js`, `forward-627.js`, `getNadgrids.js`, `transformInternal.js` | `engine/core/Capabilities-584.js:4` |
| [Unidentified586.js](../../eyes/src/vendor/modules/Unidentified586.js) `ba6c2ae0bf9e` | proj4：创建正反向坐标转换器并处理输入数组或点对象 | `Unidentified587.js`, `Unidentified624.js`, `transformInternal.js` | 内部 |
| [Unidentified587.js](../../eyes/src/vendor/modules/Unidentified587.js) `494ece5528b6` | proj4：解析坐标参考定义，建立椭球、基准面和投影实例 | `Unidentified588.js`, `Unidentified595.js`, `Unidentified606.js`, `Unidentified617.js`, `Unidentified618.js`, `add.js`, `eccentricity.js`, `getNadgrids.js` | 内部 |
| [Unidentified588.js](../../eyes/src/vendor/modules/Unidentified588.js) `447ed8166081` | proj4：将 EPSG、WKT、PROJJSON 或 proj4 定义归一化 | `Unidentified589.js`, `Unidentified591.js`, `Unidentified595.js`, `Unidentified596.js` | 内部 |
| [Unidentified589.js](../../eyes/src/vendor/modules/Unidentified589.js) `5c090fedaf58` | proj4：注册和读取 EPSG、ESRI、IAU2000 等命名坐标定义 | `Unidentified590.js`, `Unidentified591.js`, `Unidentified596.js` | 内部 |
| [Unidentified590.js](../../eyes/src/vendor/modules/Unidentified590.js) `8c8af680d32e` | proj4：初始化 WGS84、Web Mercator、UTM 和极区坐标参考定义 | — | 内部 |
| [Unidentified591.js](../../eyes/src/vendor/modules/Unidentified591.js) `c5852a7a8864` | proj4：解析 +proj 参数并把角度转为弧度 | `D2R.js`, `Unidentified593.js`, `Unidentified594.js`, `Unidentified595.js` | 内部 |
| [Unidentified593.js](../../eyes/src/vendor/modules/Unidentified593.js) `241ec9b2b2fb` | proj4：本初子午线名称到相对格林尼治经度的常量表 | — | 内部 |
| [Unidentified594.js](../../eyes/src/vendor/modules/Unidentified594.js) `09b3c6023c7a` | proj4：线性单位名称到米的转换系数表 | — | 内部 |
| [Unidentified595.js](../../eyes/src/vendor/modules/Unidentified595.js) `d242f942a7e6` | proj4：忽略大小写、空白和标点匹配投影参数名称 | — | 内部 |
| [Unidentified596.js](../../eyes/src/vendor/modules/Unidentified596.js) `a1638c26c19c` | proj4：解析 WKT 坐标参考树并归一化投影属性 | `Unidentified602.js`, `applyProjectionDefaults.js`, `buildPROJJSON.js`, `detectWKTVersion.js`, `sExpr.js`, `transformPROJJSON.js` | 内部 |
| [Unidentified599.js](../../eyes/src/vendor/modules/Unidentified599.js) `2ed2e8253844` | proj4：将 WKT2 坐标轴、单位和投影参数映射为内部表示 | — | 内部 |
| [Unidentified602.js](../../eyes/src/vendor/modules/Unidentified602.js) `3f82702ae74b` | proj4：通过字符串状态机解析 WKT 关键字、引号、数值和嵌套结构 | — | 内部 |
| [Unidentified606.js](../../eyes/src/vendor/modules/Unidentified606.js) `c510aaa4264e` | proj4：复制非 undefined 属性到目标对象 | — | 内部 |
| [Unidentified609.js](../../eyes/src/vendor/modules/Unidentified609.js) `b44851788be9` | proj4：计算依偏心率和纬度正弦变化的椭球曲率半径 | — | 内部 |
| [Unidentified611.js](../../eyes/src/vendor/modules/Unidentified611.js) `677650a5ff8a` | proj4：负数返回 -1，其余返回 1 | — | 内部 |
| [Unidentified612.js](../../eyes/src/vendor/modules/Unidentified612.js) `85e7bd17544b` | proj4：计算椭球等角纬度的指数辅助量 | `D2R.js` | 内部 |
| [Unidentified613.js](../../eyes/src/vendor/modules/Unidentified613.js) `49cba2e17b00` | proj4：最多 16 轮迭代反求等角纬度，失败返回 -9999 | `D2R.js` | 内部 |
| [Unidentified616.js](../../eyes/src/vendor/modules/Unidentified616.js) `7f16881be0e9` | proj4：命名椭球长半轴、短半轴或反扁率表 | — | 内部 |
| [Unidentified617.js](../../eyes/src/vendor/modules/Unidentified617.js) `8ee824805505` | proj4：命名大地基准、椭球和 Helmert/gridshift 参数表 | — | 内部 |
| [Unidentified618.js](../../eyes/src/vendor/modules/Unidentified618.js) `24735f3a24c8` | proj4：构造基准参数；将角秒和 ppm 变换到内部单位 | `D2R.js` | 内部 |
| [Unidentified624.js](../../eyes/src/vendor/modules/Unidentified624.js) `7f0d8ebcaa76` | proj4：将坐标数组转换为 x/y/z 点对象 | — | 内部 |
| [Unidentified625.js](../../eyes/src/vendor/modules/Unidentified625.js) `0b07e8374af3` | proj4：拒绝非有限数坐标 | — | 内部 |
| [Unidentified626.js](../../eyes/src/vendor/modules/Unidentified626.js) `60eb5ab6929d` | proj4：兼容数组、对象、逗号字符串的旧 proj4.Point 接口 | `forward-627.js` | 内部 |
| [Unidentified628.js](../../eyes/src/vendor/modules/Unidentified628.js) `0ef7e8fae94f` | proj4：向 Proj 注册各投影插件 | `EQUIT.js`, `dependsOn.js`, `forward-629.js`, `forward-633.js`, `forward-644.js`, `forward-647.js`, `forward-648.js`, `forward-649.js`, `forward-650.js`, `forward-651.js`, `forward-652.js`, `forward-665.js`, `forward-667.js`, `forward-668.js`, `forward-670.js`, `forward-671.js`, `forward-672.js`, `forward-673.js`, `forward-674.js`, `forward-675.js`, `forward-676.js`, `forward-677.js`, `forward-678.js`, `forward-679.js`, `forward-681.js`, `forward-682.js`, `forward-683.js`, `forward-684.js`, `forward-685.js`, `forward-687.js`, `forward-689.js`, `init-686.js`, `init-688.js` | 内部 |
| [Unidentified630.js](../../eyes/src/vendor/modules/Unidentified630.js) `cd3e3894570a` | proj4：展开偏心率的子午线弧长级数系数 | — | 内部 |
| [Unidentified631.js](../../eyes/src/vendor/modules/Unidentified631.js) `073e40653661` | proj4：使用纬度、正余弦和级数系数计算子午线弧长 | — | 内部 |
| [Unidentified632.js](../../eyes/src/vendor/modules/Unidentified632.js) `31dad9bc9a7a` | proj4：最多 20 次 Newton 迭代反求子午线弧长对应纬度 | `D2R.js`, `Unidentified631.js` | 内部 |
| [Unidentified634.js](../../eyes/src/vendor/modules/Unidentified634.js) `7da1820a7861` | proj4：通过指数函数计算双曲正弦 | — | 内部 |
| [Unidentified635.js](../../eyes/src/vendor/modules/Unidentified635.js) `cfb808ffd6cc` | proj4：按最大分量缩放计算二元范数，降低溢出 | — | 内部 |
| [Unidentified636.js](../../eyes/src/vendor/modules/Unidentified636.js) `f0bab99c9416` | proj4：组合稳定 log1p 和 hypot 计算反双曲正弦 | `Unidentified635.js`, `Unidentified637.js` | 内部 |
| [Unidentified637.js](../../eyes/src/vendor/modules/Unidentified637.js) `86a361bf4f26` | proj4：对小量修正 log(1+x) 的舍入误差 | — | 内部 |
| [Unidentified638.js](../../eyes/src/vendor/modules/Unidentified638.js) `8997cf060503` | proj4：Clenshaw 递推计算纬度级数 | — | 内部 |
| [Unidentified639.js](../../eyes/src/vendor/modules/Unidentified639.js) `4a3be3c45a41` | proj4：Clenshaw 递推计算实正弦级数 | — | 内部 |
| [Unidentified640.js](../../eyes/src/vendor/modules/Unidentified640.js) `5a866d7f6bab` | proj4：通过双曲函数计算复数形式的 Clenshaw 级数 | `Unidentified634.js`, `Unidentified641.js` | 内部 |
| [Unidentified641.js](../../eyes/src/vendor/modules/Unidentified641.js) `01b2715a9f84` | proj4：通过指数函数计算双曲余弦 | — | 内部 |
| [Unidentified643.js](../../eyes/src/vendor/modules/Unidentified643.js) `375a4abf14c0` | proj4：由经度推导并约束 UTM 分区 | `N.js` | 内部 |
| [Unidentified646.js](../../eyes/src/vendor/modules/Unidentified646.js) `b8935b6937ee` | proj4：计算椭球共形转换的幂比值 | — | 内部 |
| [Unidentified653.js](../../eyes/src/vendor/modules/Unidentified653.js) `edc894239a7b` | proj4：使用四项三角级数计算子午线弧 | — | 内部 |
| [Unidentified654.js](../../eyes/src/vendor/modules/Unidentified654.js) `42dd450745ba` | proj4：子午线弧零阶系数 | — | 内部 |
| [Unidentified655.js](../../eyes/src/vendor/modules/Unidentified655.js) `7ecc2c302094` | proj4：子午线弧二倍角系数 | — | 内部 |
| [Unidentified656.js](../../eyes/src/vendor/modules/Unidentified656.js) `c432f3ed0691` | proj4：子午线弧四倍角系数 | — | 内部 |
| [Unidentified657.js](../../eyes/src/vendor/modules/Unidentified657.js) `1962e67500af` | proj4：子午线弧六倍角系数 | — | 内部 |
| [Unidentified658.js](../../eyes/src/vendor/modules/Unidentified658.js) `2f990c7dc0e4` | proj4：计算卯酉圈曲率半径 | — | 内部 |
| [Unidentified659.js](../../eyes/src/vendor/modules/Unidentified659.js) `5ffa40598308` | proj4：将超出半圆范围的纬度折回 | `D2R.js`, `Unidentified611.js` | 内部 |
| [Unidentified660.js](../../eyes/src/vendor/modules/Unidentified660.js) `d08921488b06` | proj4：最多 15 次迭代反求子午线弧纬度，失败返回 NaN | — | 内部 |
| [Unidentified662.js](../../eyes/src/vendor/modules/Unidentified662.js) `e99ed3346630` | proj4：计算等积纬度辅助量 q | — | 内部 |
| [Unidentified663.js](../../eyes/src/vendor/modules/Unidentified663.js) `385a2a1f1e7a` | proj4：计算等积纬度逆变换级数系数 | — | 内部 |
| [Unidentified664.js](../../eyes/src/vendor/modules/Unidentified664.js) `c44bc6b8d7a8` | proj4：通过正弦级数恢复等积变换纬度 | — | 内部 |
| [Unidentified666.js](../../eyes/src/vendor/modules/Unidentified666.js) `d8b793b4f3a6` | proj4：将舍入后越界的输入夹到 [-1,1] 再求反正弦 | — | 内部 |
| [Unidentified669.js](../../eyes/src/vendor/modules/Unidentified669.js) `addbe496aeb3` | proj4：最多 30 次迭代反求等积纬度，极点特殊处理 | `D2R.js` | 内部 |
| [Unidentified719.cjs](../../eyes/src/vendor/modules/Unidentified719.cjs) `87309dcd51d2` | 独立/日期/适配：Navigo hash/history路由、路径参数与before/after/leave hook、链接拦截；保留__NAVIGO_WINDOW_LOCATION_MOCK__身份标记 | — | `engine/managers/RouteManager.js:3` |
| [Unidentified777.cjs](../../eyes/src/vendor/modules/Unidentified777.cjs) `40fb12ad1431` | 独立/日期/适配：将对应压缩时区 JSON 加载进 Moment Timezone 实例并导出该实例 | `Unidentified778.cjs` | `ui/components/FeaturedEventsBlock.js:2`；`ui/components/OverviewBlock.js:4`；`ui/views/EventView.js:4` |
| [Unidentified778.cjs](../../eyes/src/vendor/modules/Unidentified778.cjs) `aeb6c25ab023` | 独立/日期/适配：Moment Timezone 0.5.33：时区数据库加载、偏移计算、时间转换与猜测 | `MomentSecondary.cjs` | 内部 |
| [Unidentified78.cjs](../../eyes/src/vendor/modules/Unidentified78.cjs) `1230c9c30930` | KTX2：恢复构建路径适配：manifest.revision + /bundled/c58ed249a0b6b2787e4f.wasm；用途见decoder契约表 | — | 内部 |
| [Unidentified79.cjs](../../eyes/src/vendor/modules/Unidentified79.cjs) `9065d4afdce4` | KTX2：恢复构建路径适配：manifest.revision + /bundled/0389c8aac482cf438e98.js；用途见decoder契约表 | — | 内部 |
| [Unidentified930.js](../../eyes/src/vendor/modules/Unidentified930.js) `d069571d6c50` | Tippy/Popper B：Popper 浮层定位：把计算样式和属性应用到浮层、箭头、参考元素，并在清理时撤销 | `Unidentified931.js`, `isElement-932.js` | 内部 |
| [Unidentified931.js](../../eyes/src/vendor/modules/Unidentified931.js) `bff1fbeee8fe` | Tippy/Popper B：Popper 浮层定位：取得 DOM nodeName 的小写形式 | — | 内部 |
| [Unidentified933.js](../../eyes/src/vendor/modules/Unidentified933.js) `b14098c4bc3e` | Tippy/Popper B：Popper 浮层定位：取得节点所属 window，处理跨文档和无节点输入 | — | 内部 |
| [Unidentified936.js](../../eyes/src/vendor/modules/Unidentified936.js) `fc1793bbf0db` | Tippy/Popper B：Popper 浮层定位：计算相对 offsetParent 的参考矩形，补偿缩放、滚动和边框 | `Unidentified931.js`, `Unidentified937.js`, `Unidentified941.js`, `Unidentified944.js`, `Unidentified945.js`, `Unidentified946.js`, `isElement-932.js`, `max-938.js` | 内部 |
| [Unidentified937.js](../../eyes/src/vendor/modules/Unidentified937.js) `e7a19717585b` | Tippy/Popper B：Popper 浮层定位：归一化 boundingClientRect，补偿元素缩放和 visualViewport 偏移 | `Unidentified933.js`, `Unidentified939.js`, `isElement-932.js`, `max-938.js` | 内部 |
| [Unidentified939.js](../../eyes/src/vendor/modules/Unidentified939.js) `fbae858a1464` | Tippy/Popper B：Popper 浮层定位：根据 Safari UA 判断视口偏移策略 | `Unidentified940.js` | 内部 |
| [Unidentified940.js](../../eyes/src/vendor/modules/Unidentified940.js) `3adc388ec805` | Tippy/Popper B：Popper 浮层定位：优先读取 User-Agent Client Hints，再回退 navigator.userAgent | — | 内部 |
| [Unidentified941.js](../../eyes/src/vendor/modules/Unidentified941.js) `72cfc70cf6b6` | Tippy/Popper B：Popper 浮层定位：按节点类型选择 window 或元素的滚动偏移 | `Unidentified933.js`, `Unidentified942.js`, `Unidentified943.js`, `isElement-932.js` | 内部 |
| [Unidentified942.js](../../eyes/src/vendor/modules/Unidentified942.js) `c1d3ef9eff8f` | Tippy/Popper B：Popper 浮层定位：取得 window pageXOffset/pageYOffset | `Unidentified933.js` | 内部 |
| [Unidentified943.js](../../eyes/src/vendor/modules/Unidentified943.js) `a8c67d2b390f` | Tippy/Popper B：Popper 浮层定位：取得元素 scrollLeft/scrollTop | — | 内部 |
| [Unidentified944.js](../../eyes/src/vendor/modules/Unidentified944.js) `c42822c920ff` | Tippy/Popper B：Popper 浮层定位：计算文档根元素与 window 滚动的横向差值 | `Unidentified937.js`, `Unidentified942.js`, `Unidentified945.js` | 内部 |
| [Unidentified945.js](../../eyes/src/vendor/modules/Unidentified945.js) `582931cfd95d` | Tippy/Popper B：Popper 浮层定位：取得所属文档的 documentElement | `isElement-932.js` | 内部 |
| [Unidentified946.js](../../eyes/src/vendor/modules/Unidentified946.js) `9648ad4e5309` | Tippy/Popper B：Popper 浮层定位：依据 overflow/overflowX/overflowY 判断滚动裁剪祖先 | `Unidentified947.js` | 内部 |
| [Unidentified947.js](../../eyes/src/vendor/modules/Unidentified947.js) `1dfda6efdee0` | Tippy/Popper B：Popper 浮层定位：通过节点所属 window 读取计算样式 | `Unidentified933.js` | 内部 |
| [Unidentified948.js](../../eyes/src/vendor/modules/Unidentified948.js) `ebc57827d7b1` | Tippy/Popper B：Popper 浮层定位：返回 offset 布局矩形并校正一像素内的测量差 | `Unidentified937.js` | 内部 |
| [Unidentified949.js](../../eyes/src/vendor/modules/Unidentified949.js) `1268f4700517` | Tippy/Popper B：Popper 浮层定位：递归收集滚动祖先及 window/visualViewport | `Unidentified933.js`, `Unidentified946.js`, `Unidentified950.js`, `Unidentified951.js` | 内部 |
| [Unidentified950.js](../../eyes/src/vendor/modules/Unidentified950.js) `d3f470f67e88` | Tippy/Popper B：Popper 浮层定位：向上寻找最近的滚动祖先 | `Unidentified931.js`, `Unidentified946.js`, `Unidentified951.js`, `isElement-932.js` | 内部 |
| [Unidentified951.js](../../eyes/src/vendor/modules/Unidentified951.js) `86b24c9c6408` | Tippy/Popper B：Popper 浮层定位：处理 assignedSlot、parentNode、ShadowRoot host 的祖先遍历 | `Unidentified931.js`, `Unidentified945.js`, `isElement-932.js` | 内部 |
| [Unidentified952.js](../../eyes/src/vendor/modules/Unidentified952.js) `daef0bfcbb37` | Tippy/Popper B：Popper 浮层定位：跳过 static table，识别 transform/filter 等 containing block | `Unidentified931.js`, `Unidentified933.js`, `Unidentified940.js`, `Unidentified947.js`, `Unidentified951.js`, `Unidentified953.js`, `isElement-932.js` | 内部 |
| [Unidentified953.js](../../eyes/src/vendor/modules/Unidentified953.js) `3794c5607fdd` | Tippy/Popper B：Popper 浮层定位：判断 table、td、th 类型 | `Unidentified931.js` | 内部 |
| [Unidentified954.js](../../eyes/src/vendor/modules/Unidentified954.js) `486dd81217fe` | Tippy/Popper B：Popper 浮层定位：按依赖拓扑和 read/main/write 阶段排序定位修饰器 | `afterMain-955.js` | 内部 |
| [Unidentified956.js](../../eyes/src/vendor/modules/Unidentified956.js) `d13c6726c835` | Tippy/Popper B：Popper 浮层定位：把同一微任务前的重复请求合并为一个 Promise | — | 内部 |
| [Unidentified957.js](../../eyes/src/vendor/modules/Unidentified957.js) `767d0bdc77be` | Tippy/Popper B：Popper 浮层定位：按修饰器名称合并 options 和 data | — | 内部 |
| [Unidentified958.js](../../eyes/src/vendor/modules/Unidentified958.js) `7654e053e842` | Tippy/Popper B：Popper 浮层定位：比较参考或浮层边界与裁剪矩形，返回四边溢出量 | `Unidentified937.js`, `Unidentified945.js`, `Unidentified959.js`, `Unidentified963.js`, `Unidentified964.js`, `Unidentified968.js`, `Unidentified970.js`, `afterMain-955.js`, `isElement-932.js` | 内部 |
| [Unidentified959.js](../../eyes/src/vendor/modules/Unidentified959.js) `92aa7b47672e` | Tippy/Popper B：Popper 浮层定位：求多个裁剪祖先与根边界矩形的交集 | `Unidentified931.js`, `Unidentified937.js`, `Unidentified945.js`, `Unidentified947.js`, `Unidentified949.js`, `Unidentified951.js`, `Unidentified952.js`, `Unidentified960.js`, `Unidentified961.js`, `Unidentified962.js`, `Unidentified963.js`, `afterMain-955.js`, `isElement-932.js`, `max-938.js` | 内部 |
| [Unidentified960.js](../../eyes/src/vendor/modules/Unidentified960.js) `039ff19a3947` | Tippy/Popper B：Popper 浮层定位：计算布局/视觉视口尺寸和偏移 | `Unidentified933.js`, `Unidentified939.js`, `Unidentified944.js`, `Unidentified945.js` | 内部 |
| [Unidentified961.js](../../eyes/src/vendor/modules/Unidentified961.js) `9ac5f8e00e1f` | Tippy/Popper B：Popper 浮层定位：计算完整文档滚动范围并补偿 RTL 横向位置 | `Unidentified942.js`, `Unidentified944.js`, `Unidentified945.js`, `Unidentified947.js`, `max-938.js` | 内部 |
| [Unidentified962.js](../../eyes/src/vendor/modules/Unidentified962.js) `e67cc69acae1` | Tippy/Popper B：Popper 浮层定位：沿 Shadow DOM host 链执行包含关系判断 | `isElement-932.js` | 内部 |
| [Unidentified963.js](../../eyes/src/vendor/modules/Unidentified963.js) `b10d8c75af20` | Tippy/Popper B：Popper 浮层定位：为 x/y/width/height 矩形补齐 top/right/bottom/left | — | 内部 |
| [Unidentified964.js](../../eyes/src/vendor/modules/Unidentified964.js) `b125cf18359c` | Tippy/Popper B：Popper 浮层定位：根据 placement 和 start/end 对齐计算浮层位置 | `Unidentified965.js`, `Unidentified966.js`, `Unidentified967.js`, `afterMain-955.js` | 内部 |
| [Unidentified965.js](../../eyes/src/vendor/modules/Unidentified965.js) `a1ac6de64ebb` | Tippy/Popper B：Popper 浮层定位：提取 placement 连字符前的方向 | — | 内部 |
| [Unidentified966.js](../../eyes/src/vendor/modules/Unidentified966.js) `2b906359e29b` | Tippy/Popper B：Popper 浮层定位：提取 placement 连字符后的 start/end 变化 | — | 内部 |
| [Unidentified967.js](../../eyes/src/vendor/modules/Unidentified967.js) `5616e83325a1` | Tippy/Popper B：Popper 浮层定位：将 top/bottom 映射到 x，left/right 映射到 y | — | 内部 |
| [Unidentified968.js](../../eyes/src/vendor/modules/Unidentified968.js) `19d48e6541e7` | Tippy/Popper B：Popper 浮层定位：用给定四边 padding 覆盖零值默认对象 | `Unidentified969.js` | 内部 |
| [Unidentified969.js](../../eyes/src/vendor/modules/Unidentified969.js) `e350ed832f5c` | Tippy/Popper B：Popper 浮层定位：创建上下左右全零的独立对象 | — | 内部 |
| [Unidentified970.js](../../eyes/src/vendor/modules/Unidentified970.js) `4579aac46f1b` | Tippy/Popper B：Popper 浮层定位：将同一值分配给一组侧边键 | — | 内部 |
| [Unidentified971.js](../../eyes/src/vendor/modules/Unidentified971.js) `8f8adae94ad1` | Tippy/Popper B：Popper 浮层定位：注册滚动和 resize 更新监听并返回清理函数 | `Unidentified933.js` | 内部 |
| [Unidentified972.js](../../eyes/src/vendor/modules/Unidentified972.js) `633d3b2f597d` | Tippy/Popper B：Popper 浮层定位：在 read 阶段建立 popperOffsets 坐标 | `Unidentified964.js` | 内部 |
| [Unidentified975.js](../../eyes/src/vendor/modules/Unidentified975.js) `c5f1a670636d` | Tippy/Popper B：Popper 浮层定位：根据溢出程度切换首选方向及候选方向 | `Unidentified958.js`, `Unidentified965.js`, `Unidentified966.js`, `Unidentified976.js`, `Unidentified977.js`, `Unidentified978.js`, `afterMain-955.js` | 内部 |
| [Unidentified976.js](../../eyes/src/vendor/modules/Unidentified976.js) `381506c20784` | Tippy/Popper B：Popper 浮层定位：交换 top/bottom 和 left/right | — | 内部 |
| [Unidentified977.js](../../eyes/src/vendor/modules/Unidentified977.js) `39d570fbbe6a` | Tippy/Popper B：Popper 浮层定位：交换 start/end 对齐 | — | 内部 |
| [Unidentified978.js](../../eyes/src/vendor/modules/Unidentified978.js) `ed5ca8e536ad` | Tippy/Popper B：Popper 浮层定位：按方向的溢出量排序自动定位候选 | `Unidentified958.js`, `Unidentified965.js`, `Unidentified966.js`, `afterMain-955.js` | 内部 |
| [Unidentified979.js](../../eyes/src/vendor/modules/Unidentified979.js) `577fdea3cd05` | Tippy/Popper B：Popper 浮层定位：沿主轴/副轴约束浮层，结合 tether 保持参考联系 | `Unidentified948.js`, `Unidentified952.js`, `Unidentified958.js`, `Unidentified965.js`, `Unidentified966.js`, `Unidentified967.js`, `Unidentified969.js`, `Unidentified980.js`, `afterMain-955.js`, `max-938.js`, `within-981.js` | 内部 |
| [Unidentified980.js](../../eyes/src/vendor/modules/Unidentified980.js) `aaec4ec5a123` | Tippy/Popper B：Popper 浮层定位：在 x 和 y 之间切换 | — | 内部 |
| [Unidentified982.js](../../eyes/src/vendor/modules/Unidentified982.js) `c79383e5934e` | Tippy/Popper B：Popper 浮层定位：计算箭头在浮层内的偏移及中心误差 | `Unidentified948.js`, `Unidentified952.js`, `Unidentified962.js`, `Unidentified965.js`, `Unidentified967.js`, `Unidentified968.js`, `Unidentified970.js`, `afterMain-955.js`, `within-981.js` | 内部 |
| [Unidentified983.js](../../eyes/src/vendor/modules/Unidentified983.js) `593e841888b7` | Tippy/Popper B：Popper 浮层定位：识别参考被裁剪或浮层逃逸并设置 data 属性 | `Unidentified958.js`, `afterMain-955.js` | 内部 |
| [Unidentified989.cjs](../../eyes/src/vendor/modules/Unidentified989.cjs) `787c573c052c` | 独立/日期/适配：第二份自定义滚动条实现，保留独立模块状态 | — | 内部 |
| [WorkerPool.js](../../eyes/src/vendor/modules/WorkerPool.js) `1880d5ed80a1` | KTX2：限制 worker 并发，排队分发任务并复用空闲 worker | — | 内部 |
| [ZSTDDecoder.js](../../eyes/src/vendor/modules/ZSTDDecoder.js) `67af6f7e9dee` | KTX2：初始化内嵌 WASM 模块并解压 Zstandard 数据 | — | 内部 |
| [add.js](../../eyes/src/vendor/modules/add.js) `7ac20f2ef4dc` | proj4：proj4投影注册表：names小写别名与名称归一化；预装merc/longlat | `forward-608.js`, `forward-614.js` | 内部 |
| [adjustAxisFromEnu.js](../../eyes/src/vendor/modules/adjustAxisFromEnu.js) `dcedf871b95d` | proj4：proj4按axis字母交换维度/反号；ENU输入输出适配 | — | 内部 |
| [afterMain-194.js](../../eyes/src/vendor/modules/afterMain-194.js) `51195000fb36` | Tippy/Popper A：Popper placement/variation/modifierPhase常量与阶段顺序 | — | 内部 |
| [afterMain-955.js](../../eyes/src/vendor/modules/afterMain-955.js) `0f7e1029fd30` | Tippy/Popper B：Popper placement/variation/modifierPhase常量与阶段顺序 | — | 内部 |
| [animateCSSModeScroll.js](../../eyes/src/vendor/modules/animateCSSModeScroll.js) `7e84f7ac15b1` | Swiper/Dom7：Swiper工具：对象扩展、矩阵平移、nextTick/now及CSS scroll的RAF缓动 | `extend.js` | 内部 |
| [animateFill-168.js](../../eyes/src/vendor/modules/animateFill-168.js) `6e33b24b5d08` | Tippy/Popper A：Tippy完整提示库：show/hide/setProps/setContent/destroy及singleton/delegate/followCursor/inlinePositioning/sticky插件 | `Unidentified169.js`, `applyStyles-173.js` | `engine/controllers/TimeController.js:2`；`ui/components/Carousel.js:2`；`ui/components/ClockShortcut.js:2`；`ui/components/Settings.js:3`；`ui/components/ShareModal.js:5` |
| [animateFill-929.js](../../eyes/src/vendor/modules/animateFill-929.js) `0384d3f320b3` | Tippy/Popper B：Tippy完整提示库：show/hide/setProps/setContent/destroy及singleton/delegate/followCursor/inlinePositioning/sticky插件 | `Unidentified930.js`, `applyStyles-934.js` | `engine/managers/DistanceManager.js:6`；`ui/components/ContentPanel.js:3`；`ui/components/MobileExpandButton.js:4`；`ui/components/Telescope.js:5`；`ui/components/ToolboxBlock.js:7` |
| [applyGridShift.js](../../eyes/src/vendor/modules/applyGridShift.js) `568375c9a7b3` | proj4：基准转换：NTv2网格偏移/Helmert/ECEF，必需网格缺失或覆盖外失败 | `D2R.js`, `N.js`, `compareDatums.js` | 内部 |
| [applyProjectionDefaults.js](../../eyes/src/vendor/modules/applyProjectionDefaults.js) `bb1626858173` | proj4：投影缺省属性合并及指定角度字段d2r归一化 | — | 内部 |
| [applyStyles-173.js](../../eyes/src/vendor/modules/applyStyles-173.js) `02b9b57e3e67` | Tippy/Popper A：Popper入口或修饰器再导出；包含applyStyles/arrow/computeStyles/flip/hide/offset | `Unidentified169.js`, `Unidentified197.js`, `Unidentified210.js`, `Unidentified211.js`, `Unidentified214.js`, `Unidentified218.js`, `Unidentified221.js`, `Unidentified222.js`, `applyStyles-224.js`, `createPopper-174.js`, `createPopper-223.js`, `distanceAndSkiddingToXY-213.js`, `mapToStyles-212.js` | 内部 |
| [applyStyles-224.js](../../eyes/src/vendor/modules/applyStyles-224.js) `8ff66589a5ee` | Tippy/Popper A：Popper入口或修饰器再导出；包含applyStyles/arrow/computeStyles/flip/hide/offset | `Unidentified169.js`, `Unidentified210.js`, `Unidentified211.js`, `Unidentified214.js`, `Unidentified218.js`, `Unidentified221.js`, `Unidentified222.js`, `distanceAndSkiddingToXY-213.js`, `mapToStyles-212.js` | 内部 |
| [applyStyles-934.js](../../eyes/src/vendor/modules/applyStyles-934.js) `4f4696427cb0` | Tippy/Popper B：Popper入口或修饰器再导出；包含applyStyles/arrow/computeStyles/flip/hide/offset | `Unidentified930.js`, `Unidentified958.js`, `Unidentified971.js`, `Unidentified972.js`, `Unidentified975.js`, `Unidentified979.js`, `Unidentified982.js`, `Unidentified983.js`, `applyStyles-985.js`, `createPopper-935.js`, `createPopper-984.js`, `distanceAndSkiddingToXY-974.js`, `mapToStyles-973.js` | 内部 |
| [applyStyles-985.js](../../eyes/src/vendor/modules/applyStyles-985.js) `8a401e13dcad` | Tippy/Popper B：Popper入口或修饰器再导出；包含applyStyles/arrow/computeStyles/flip/hide/offset | `Unidentified930.js`, `Unidentified971.js`, `Unidentified972.js`, `Unidentified975.js`, `Unidentified979.js`, `Unidentified982.js`, `Unidentified983.js`, `distanceAndSkiddingToXY-974.js`, `mapToStyles-973.js` | 内部 |
| [buildPROJJSON.js](../../eyes/src/vendor/modules/buildPROJJSON.js) `06ac7edac6aa` | proj4：按WKT版本分派2015/2019 PROJJSON构建器 | `PROJJSONBuilder2015.js`, `PROJJSONBuilder2019.js` | 内部 |
| [clone.js](../../eyes/src/vendor/modules/clone.js) `3dbe6ff60bdd` | Three工具：Three骨骼动画retarget/retargetClip，clone重建骨骼引用 | — | 内部 |
| [compareDatums.js](../../eyes/src/vendor/modules/compareDatums.js) `6fe80332e300` | proj4：基准等价、大地/ECEF正逆、3/7参数Helmert正逆转换 | `D2R.js` | 内部 |
| [computeMikkTSpaceTangents.js](../../eyes/src/vendor/modules/computeMikkTSpaceTangents.js) `58e8c83f7a56` | Three工具：Three几何工具：切线、merge/deinterleave、morph、group、draw mode转换 | — | 内部 |
| [createPopper-174.js](../../eyes/src/vendor/modules/createPopper-174.js) `38d3fcd920ee` | Tippy/Popper A：Popper generator或Lite装配：setOptions/update/forceUpdate/destroy与默认修饰器 | `Unidentified175.js`, `Unidentified187.js`, `Unidentified188.js`, `Unidentified191.js`, `Unidentified193.js`, `Unidentified195.js`, `Unidentified196.js`, `Unidentified197.js`, `isElement-171.js` | 内部 |
| [createPopper-223.js](../../eyes/src/vendor/modules/createPopper-223.js) `dab7d5f4d65b` | Tippy/Popper A：Popper generator或Lite装配：setOptions/update/forceUpdate/destroy与默认修饰器 | `Unidentified169.js`, `Unidentified197.js`, `Unidentified210.js`, `Unidentified211.js`, `createPopper-174.js`, `mapToStyles-212.js` | 内部 |
| [createPopper-935.js](../../eyes/src/vendor/modules/createPopper-935.js) `754afc3b363f` | Tippy/Popper B：Popper generator或Lite装配：setOptions/update/forceUpdate/destroy与默认修饰器 | `Unidentified936.js`, `Unidentified948.js`, `Unidentified949.js`, `Unidentified952.js`, `Unidentified954.js`, `Unidentified956.js`, `Unidentified957.js`, `Unidentified958.js`, `isElement-932.js` | 内部 |
| [createPopper-984.js](../../eyes/src/vendor/modules/createPopper-984.js) `b476cd96cf0c` | Tippy/Popper B：Popper generator或Lite装配：setOptions/update/forceUpdate/destroy与默认修饰器 | `Unidentified930.js`, `Unidentified958.js`, `Unidentified971.js`, `Unidentified972.js`, `createPopper-935.js`, `mapToStyles-973.js` | 内部 |
| [dependsOn.js](../../eyes/src/vendor/modules/dependsOn.js) `d3b7b92c328f` | proj4：proj4投影插件：Universal Transverse Mercator System, utm；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `Unidentified643.js`, `forward-633.js` | 内部 |
| [detectWKTVersion.js](../../eyes/src/vendor/modules/detectWKTVersion.js) `1e0d9e4bd244` | proj4：从WKT顶层关键字区分旧WKT/WKT2 2015/2019 | — | 内部 |
| [distanceAndSkiddingToXY-213.js](../../eyes/src/vendor/modules/distanceAndSkiddingToXY-213.js) `57295503c09e` | Tippy/Popper A：Popper offset：按placement将skidding/distance转换成x/y偏移 | `Unidentified204.js`, `afterMain-194.js` | 内部 |
| [distanceAndSkiddingToXY-974.js](../../eyes/src/vendor/modules/distanceAndSkiddingToXY-974.js) `23bb97a5de0e` | Tippy/Popper B：Popper offset：按placement将skidding/distance转换成x/y偏移 | `Unidentified965.js`, `afterMain-955.js` | 内部 |
| [eccentricity.js](../../eyes/src/vendor/modules/eccentricity.js) `840ee50f884b` | proj4：椭球a/b/rf与球体判定、偏心率派生 | `D2R.js`, `Unidentified595.js`, `Unidentified616.js` | 内部 |
| [extend.js](../../eyes/src/vendor/modules/extend.js) `37de7705e8d0` | Swiper/Dom7：Swiper SSR window/document替身与缺省字段填充；不修改全局原型 | — | 内部 |
| [forward-608.js](../../eyes/src/vendor/modules/forward-608.js) `cabcee5a24c4` | proj4：proj4投影插件：Mercator, Popular Visualisation Pseudo Mercator, Mercator_1SP, Mercator_Auxiliary_Sphere, Mercator_Variant_A, merc；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js`, `Unidentified609.js`, `Unidentified612.js`, `Unidentified613.js` | 内部 |
| [forward-614.js](../../eyes/src/vendor/modules/forward-614.js) `383cb70be8b4` | proj4：proj4投影插件：longlat, identity；init/forward/inverse以实际导出为准，未证明所有数值公式 | — | 内部 |
| [forward-627.js](../../eyes/src/vendor/modules/forward-627.js) `3d509a1dacac` | proj4：实现 mgrs；调用方以这些语义键装配模块 | — | 内部 |
| [forward-629.js](../../eyes/src/vendor/modules/forward-629.js) `91a7f90ebd40` | proj4：proj4投影插件：Fast_Transverse_Mercator, Fast Transverse Mercator；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js`, `Unidentified611.js`, `Unidentified630.js`, `Unidentified631.js`, `Unidentified632.js` | 内部 |
| [forward-633.js](../../eyes/src/vendor/modules/forward-633.js) `9020b0a088b6` | proj4：proj4投影插件：Extended_Transverse_Mercator, Extended Transverse Mercator, etmerc, Transverse_Mercator, Transverse Mercator, Gauss Kruger, Gauss_Kruger, tmerc；init/forward/inverse以实际导出为准，未证明所有数值公式 | `N.js`, `Unidentified634.js`, `Unidentified635.js`, `Unidentified636.js`, `Unidentified638.js`, `Unidentified639.js`, `Unidentified640.js`, `forward-629.js` | 内部 |
| [forward-644.js](../../eyes/src/vendor/modules/forward-644.js) `4aa4632a5301` | proj4：proj4投影插件：Stereographic_North_Pole, Oblique_Stereographic, sterea, Oblique Stereographic Alternative, Double_Stereographic；init/forward/inverse以实际导出为准，未证明所有数值公式 | `N.js`, `Unidentified635.js`, `forward-645.js` | 内部 |
| [forward-645.js](../../eyes/src/vendor/modules/forward-645.js) `55c5c605786b` | proj4：proj4投影插件：gauss；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `Unidentified646.js` | 内部 |
| [forward-647.js](../../eyes/src/vendor/modules/forward-647.js) `2438331b297e` | proj4：proj4投影插件：stere, Stereographic_South_Pole, Polar_Stereographic_variant_A, Polar_Stereographic_variant_B, Polar_Stereographic；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js`, `Unidentified609.js`, `Unidentified611.js`, `Unidentified612.js`, `Unidentified613.js` | 内部 |
| [forward-648.js](../../eyes/src/vendor/modules/forward-648.js) `2eb80ffc5324` | proj4：proj4投影插件：somerc；init/forward/inverse以实际导出为准，未证明所有数值公式 | — | 内部 |
| [forward-649.js](../../eyes/src/vendor/modules/forward-649.js) `f0d5bb668105` | proj4：proj4投影插件：Hotine_Oblique_Mercator, Hotine Oblique Mercator, Hotine_Oblique_Mercator_variant_A, Hotine_Oblique_Mercator_Variant_B, Hotine_Oblique_Mercator_Azimuth_Natural_Origin, Hotine_Oblique_Mercator_Two_Point_Natural_Origin, Hotine_Oblique_Mercator_Azimuth_Center, Oblique_Mercator, omerc；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js`, `Unidentified612.js`, `Unidentified613.js`, `add.js` | 内部 |
| [forward-650.js](../../eyes/src/vendor/modules/forward-650.js) `9d2df37ad909` | proj4：proj4投影插件：Lambert Tangential Conformal Conic Projection, Lambert_Conformal_Conic, Lambert_Conformal_Conic_1SP, Lambert_Conformal_Conic_2SP, lcc, Lambert Conic Conformal (1SP), Lambert Conic Conformal (2SP)；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js`, `Unidentified609.js`, `Unidentified611.js`, `Unidentified612.js`, `Unidentified613.js` | 内部 |
| [forward-651.js](../../eyes/src/vendor/modules/forward-651.js) `b13bd60df43b` | proj4：proj4投影插件：Krovak, Krovak Modified, Krovak (North Orientated), Krovak Modified (North Orientated), krovak；init/forward/inverse以实际导出为准，未证明所有数值公式 | `N.js` | 内部 |
| [forward-652.js](../../eyes/src/vendor/modules/forward-652.js) `d0f027f68624` | proj4：proj4投影插件：Cassini, Cassini_Soldner, cass；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js`, `Unidentified653.js`, `Unidentified654.js`, `Unidentified655.js`, `Unidentified656.js`, `Unidentified657.js`, `Unidentified658.js`, `Unidentified659.js`, `Unidentified660.js` | 内部 |
| [forward-665.js](../../eyes/src/vendor/modules/forward-665.js) `08bf8fcc766f` | proj4：proj4投影插件：Albers_Conic_Equal_Area, Albers_Equal_Area, Albers, aea；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js`, `Unidentified609.js`, `Unidentified662.js`, `Unidentified666.js` | 内部 |
| [forward-667.js](../../eyes/src/vendor/modules/forward-667.js) `66f4fc0b0f0d` | proj4：proj4投影插件：gnom；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js`, `Unidentified666.js` | 内部 |
| [forward-668.js](../../eyes/src/vendor/modules/forward-668.js) `e3ced7bbee46` | proj4：proj4投影插件：cea；init/forward/inverse以实际导出为准，未证明所有数值公式 | `N.js`, `Unidentified609.js`, `Unidentified662.js`, `Unidentified669.js` | 内部 |
| [forward-670.js](../../eyes/src/vendor/modules/forward-670.js) `b8e7e83b392c` | proj4：proj4投影插件：Equirectangular, Equidistant_Cylindrical, Equidistant_Cylindrical_Spherical, eqc；init/forward/inverse以实际导出为准，未证明所有数值公式 | `N.js`, `Unidentified659.js` | 内部 |
| [forward-671.js](../../eyes/src/vendor/modules/forward-671.js) `1f82aae424f9` | proj4：proj4投影插件：Polyconic, American_Polyconic, poly；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js`, `Unidentified653.js`, `Unidentified654.js`, `Unidentified655.js`, `Unidentified656.js`, `Unidentified657.js`, `Unidentified658.js`, `Unidentified659.js` | 内部 |
| [forward-672.js](../../eyes/src/vendor/modules/forward-672.js) `1f7b594ca169` | proj4：proj4投影插件：New_Zealand_Map_Grid, nzmg；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js` | 内部 |
| [forward-673.js](../../eyes/src/vendor/modules/forward-673.js) `95c552f59ec7` | proj4：proj4投影插件：Miller_Cylindrical, mill；init/forward/inverse以实际导出为准，未证明所有数值公式 | `N.js` | 内部 |
| [forward-674.js](../../eyes/src/vendor/modules/forward-674.js) `38634b8c69a2` | proj4：proj4投影插件：Sinusoidal, sinu；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js`, `Unidentified630.js`, `Unidentified631.js`, `Unidentified632.js`, `Unidentified659.js`, `Unidentified666.js` | 内部 |
| [forward-675.js](../../eyes/src/vendor/modules/forward-675.js) `c2953f6f4c17` | proj4：proj4投影插件：Eckert_VI, eck6；init/forward/inverse以实际导出为准，未证明所有数值公式 | `forward-674.js` | 内部 |
| [forward-676.js](../../eyes/src/vendor/modules/forward-676.js) `beb2ac8a3f9f` | proj4：proj4投影插件：Mollweide, moll；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js` | 内部 |
| [forward-677.js](../../eyes/src/vendor/modules/forward-677.js) `263d0ce431e3` | proj4：proj4投影插件：Equidistant_Conic, eqdc；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js`, `Unidentified609.js`, `Unidentified653.js`, `Unidentified654.js`, `Unidentified655.js`, `Unidentified656.js`, `Unidentified657.js`, `Unidentified659.js`, `Unidentified660.js` | 内部 |
| [forward-678.js](../../eyes/src/vendor/modules/forward-678.js) `b9d9c417acc3` | proj4：proj4投影插件：Van_der_Grinten_I, VanDerGrinten, Van_der_Grinten, vandg；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js`, `Unidentified666.js` | 内部 |
| [forward-679.js](../../eyes/src/vendor/modules/forward-679.js) `5f88673d4820` | proj4：proj4投影插件：Azimuthal_Equidistant, aeqd；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js`, `Unidentified653.js`, `Unidentified654.js`, `Unidentified655.js`, `Unidentified656.js`, `Unidentified657.js`, `Unidentified660.js`, `Unidentified666.js`, `vincentyDirect.js` | 内部 |
| [forward-681.js](../../eyes/src/vendor/modules/forward-681.js) `b4fd69bb8ee2` | proj4：proj4投影插件：ortho；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js`, `Unidentified666.js` | 内部 |
| [forward-682.js](../../eyes/src/vendor/modules/forward-682.js) `b01ad4dac9e9` | proj4：proj4投影插件：Quadrilateralized Spherical Cube, Quadrilateralized_Spherical_Cube, qsc；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js` | 内部 |
| [forward-683.js](../../eyes/src/vendor/modules/forward-683.js) `5e9cd8de79bd` | proj4：proj4投影插件：Robinson, robin；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js` | 内部 |
| [forward-684.js](../../eyes/src/vendor/modules/forward-684.js) `0ea811ac17ae` | proj4：proj4投影插件：Geocentric, geocentric, geocent, Geocent；init/forward/inverse以实际导出为准，未证明所有数值公式 | `compareDatums.js` | 内部 |
| [forward-685.js](../../eyes/src/vendor/modules/forward-685.js) `ae72c5fe9ff6` | proj4：proj4投影插件：Tilted_Perspective, tpers；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `Unidentified635.js` | 内部 |
| [forward-687.js](../../eyes/src/vendor/modules/forward-687.js) `6943bd98901c` | proj4：proj4投影插件：eqearth, Equal Earth, Equal_Earth；init/forward/inverse以实际导出为准，未证明所有数值公式 | `N.js`, `Unidentified662.js`, `Unidentified663.js`, `Unidentified664.js` | 内部 |
| [forward-689.js](../../eyes/src/vendor/modules/forward-689.js) `32391bc0f2aa` | proj4：proj4投影插件：General Oblique Transformation, General_Oblique_Transformation, ob_tran；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js`, `Unidentified587.js`, `forward-614.js` | 内部 |
| [getBrowser.js](../../eyes/src/vendor/modules/getBrowser.js) `42c0abbca6b4` | Swiper/Dom7：Swiper Safari/iOS WebView环境判定缓存 | `extend.js` | 内部 |
| [getDevice.js](../../eyes/src/vendor/modules/getDevice.js) `a6ab379bae80` | Swiper/Dom7：Swiper iOS/Android/iPad启发式设备判定缓存 | `extend.js`, `getSupport.js` | 内部 |
| [getNadgrids.js](../../eyes/src/vendor/modules/getNadgrids.js) `c64ca0637e41` | proj4：实现 nadgrid；调用方以这些语义键装配模块 | — | 内部 |
| [getSupport.js](../../eyes/src/vendor/modules/getSupport.js) `b540a6109ee2` | Swiper/Dom7：Swiper smoothScroll/touch/passiveListener/gestures能力缓存 | `extend.js` | 内部 |
| [init-686.js](../../eyes/src/vendor/modules/init-686.js) `dde402f59cef` | proj4：proj4投影插件：Geostationary Satellite View, Geostationary_Satellite, geos；init/forward/inverse以实际导出为准，未证明所有数值公式 | `Unidentified635.js` | 内部 |
| [init-688.js](../../eyes/src/vendor/modules/init-688.js) `4889720fc9d6` | proj4：proj4投影插件：bonne, Bonne (Werner lat_1=90)；init/forward/inverse以实际导出为准，未证明所有数值公式 | `D2R.js`, `N.js`, `Unidentified630.js`, `Unidentified631.js`, `Unidentified632.js`, `Unidentified635.js`, `Unidentified659.js` | 内部 |
| [isElement-171.js](../../eyes/src/vendor/modules/isElement-171.js) `20757a704071` | Tippy/Popper A：Popper跨window Element/HTMLElement/ShadowRoot判断 | `Unidentified172.js` | 内部 |
| [isElement-932.js](../../eyes/src/vendor/modules/isElement-932.js) `2a663ab7e0bf` | Tippy/Popper B：Popper跨window Element/HTMLElement/ShadowRoot判断 | `Unidentified933.js` | 内部 |
| [mapToStyles-212.js](../../eyes/src/vendor/modules/mapToStyles-212.js) `dce74653a675` | Tippy/Popper A：Popper computeStyles：DPR取整/adaptive侧边/GPU transform输出 | `Unidentified172.js`, `Unidentified184.js`, `Unidentified186.js`, `Unidentified191.js`, `Unidentified204.js`, `Unidentified205.js`, `afterMain-194.js`, `max-177.js` | 内部 |
| [mapToStyles-973.js](../../eyes/src/vendor/modules/mapToStyles-973.js) `233ad72a614e` | Tippy/Popper B：Popper computeStyles：DPR取整/adaptive侧边/GPU transform输出 | `Unidentified933.js`, `Unidentified945.js`, `Unidentified947.js`, `Unidentified952.js`, `Unidentified965.js`, `Unidentified966.js`, `afterMain-955.js`, `max-938.js` | 内部 |
| [max-177.js](../../eyes/src/vendor/modules/max-177.js) `cecfb7b5d244` | Tippy/Popper A：Popper Math.max/min/round引用 | — | 内部 |
| [max-938.js](../../eyes/src/vendor/modules/max-938.js) `e4ebc1762791` | Tippy/Popper B：Popper Math.max/min/round引用 | — | 内部 |
| [sExpr.js](../../eyes/src/vendor/modules/sExpr.js) `5d5c05b9e3fa` | proj4：WKT S表达树转结构化属性，处理axis/parameter/extension/unit | — | 内部 |
| [transformInternal.js](../../eyes/src/vendor/modules/transformInternal.js) `66397fe2ceb7` | proj4：投影编排：有限数校验→轴/单位→逆投影→基准→正投影→目标单位/轴 | `D2R.js`, `Unidentified587.js`, `Unidentified624.js`, `Unidentified625.js`, `adjustAxisFromEnu.js`, `applyGridShift.js` | 内部 |
| [transformPROJJSON.js](../../eyes/src/vendor/modules/transformPROJJSON.js) `b7fd6ad9b34c` | proj4：PROJJSON坐标系统/单位/基准/投影参数到内部proj4属性 | `applyProjectionDefaults.js` | 内部 |
| [vincentyDirect.js](../../eyes/src/vendor/modules/vincentyDirect.js) `33f29af351f1` | proj4：Vincenty椭球测地正解/逆解；迭代距离方位与终点换算 | — | 内部 |
| [within-220.js](../../eyes/src/vendor/modules/within-220.js) `2420d7bdf189` | Tippy/Popper A：Popper within/withinMaxClamp坐标约束 | `max-177.js` | 内部 |
| [within-981.js](../../eyes/src/vendor/modules/within-981.js) `7dcc829102b1` | Tippy/Popper B：Popper within/withinMaxClamp坐标约束 | `max-938.js` | 内部 |

## 8. 270个locale：135对精确路径、配置和规则

每行两个精确源码路径，各defineLocale同名code，require各自Moment核心；都是语言规则注册模块，并非polyfill/应用算法。L/dow/doy是本文件显式值，“继承”表示需由Moment默认/父locale解释。特殊规则键仅说明实现中存在，不等于人工校对全部语言词形。正文一致检查忽略Recovered偏移注释和核心Primary/Secondary差异。

| primary / secondary 精确文件 | defineLocale | L；dow/doy | 特殊规则键 | 注册以外正文一致 |
|---|---|---|---|---|
| [af.cjs primary](../../eyes/src/vendor/moment/primary/locale/af.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/af.cjs) | `af` | `DD/MM/YYYY`；1/4 | meridiemParse, meridiem, ordinal, relativeTime, calendar | 是 |
| [ar-dz.cjs primary](../../eyes/src/vendor/moment/primary/locale/ar-dz.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ar-dz.cjs) | `ar-dz` | `D/‏M/‏YYYY`；0/4 | meridiemParse, meridiem, postformat, relativeTime, calendar | 是 |
| [ar-kw.cjs primary](../../eyes/src/vendor/moment/primary/locale/ar-kw.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ar-kw.cjs) | `ar-kw` | `DD/MM/YYYY`；0/12 | relativeTime, calendar | 是 |
| [ar-ly.cjs primary](../../eyes/src/vendor/moment/primary/locale/ar-ly.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ar-ly.cjs) | `ar-ly` | `D/‏M/‏YYYY`；6/12 | meridiemParse, meridiem, preparse, postformat, relativeTime, calendar | 是 |
| [ar-ma.cjs primary](../../eyes/src/vendor/moment/primary/locale/ar-ma.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ar-ma.cjs) | `ar-ma` | `DD/MM/YYYY`；1/4 | relativeTime, calendar | 是 |
| [ar-sa.cjs primary](../../eyes/src/vendor/moment/primary/locale/ar-sa.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ar-sa.cjs) | `ar-sa` | `DD/MM/YYYY`；0/6 | meridiemParse, meridiem, preparse, postformat, relativeTime, calendar | 是 |
| [ar-tn.cjs primary](../../eyes/src/vendor/moment/primary/locale/ar-tn.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ar-tn.cjs) | `ar-tn` | `DD/MM/YYYY`；1/4 | relativeTime, calendar | 是 |
| [ar.cjs primary](../../eyes/src/vendor/moment/primary/locale/ar.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ar.cjs) | `ar` | `D/‏M/‏YYYY`；6/12 | meridiemParse, meridiem, preparse, postformat, relativeTime, calendar | 是 |
| [az.cjs primary](../../eyes/src/vendor/moment/primary/locale/az.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/az.cjs) | `az` | `DD.MM.YYYY`；1/7 | meridiemParse, meridiem, ordinal, relativeTime, calendar | 是 |
| [be.cjs primary](../../eyes/src/vendor/moment/primary/locale/be.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/be.cjs) | `be` | `DD.MM.YYYY`；1/7 | meridiemParse, meridiem, ordinal, relativeTime, calendar | 是 |
| [bg.cjs primary](../../eyes/src/vendor/moment/primary/locale/bg.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/bg.cjs) | `bg` | `D.MM.YYYY`；1/7 | ordinal, relativeTime, calendar | 是 |
| [bm.cjs primary](../../eyes/src/vendor/moment/primary/locale/bm.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/bm.cjs) | `bm` | `DD/MM/YYYY`；1/4 | relativeTime, calendar | 是 |
| [bn-bd.cjs primary](../../eyes/src/vendor/moment/primary/locale/bn-bd.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/bn-bd.cjs) | `bn-bd` | `DD/MM/YYYY`；0/6 | meridiemParse, meridiemHour, meridiem, preparse, postformat, relativeTime, calendar | 是 |
| [bn.cjs primary](../../eyes/src/vendor/moment/primary/locale/bn.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/bn.cjs) | `bn` | `DD/MM/YYYY`；0/6 | meridiemParse, meridiemHour, meridiem, preparse, postformat, relativeTime, calendar | 是 |
| [bo.cjs primary](../../eyes/src/vendor/moment/primary/locale/bo.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/bo.cjs) | `bo` | `DD/MM/YYYY`；0/6 | meridiemParse, meridiemHour, meridiem, preparse, postformat, relativeTime, calendar | 是 |
| [br.cjs primary](../../eyes/src/vendor/moment/primary/locale/br.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/br.cjs) | `br` | `DD/MM/YYYY`；1/4 | meridiemParse, meridiem, monthsParse, weekdaysParse, ordinal, relativeTime, calendar | 是 |
| [bs.cjs primary](../../eyes/src/vendor/moment/primary/locale/bs.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/bs.cjs) | `bs` | `DD.MM.YYYY`；1/7 | ordinal, relativeTime, calendar | 是 |
| [ca.cjs primary](../../eyes/src/vendor/moment/primary/locale/ca.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ca.cjs) | `ca` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [cs.cjs primary](../../eyes/src/vendor/moment/primary/locale/cs.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/cs.cjs) | `cs` | `DD.MM.YYYY`；1/4 | monthsParse, ordinal, relativeTime, calendar | 是 |
| [cv.cjs primary](../../eyes/src/vendor/moment/primary/locale/cv.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/cv.cjs) | `cv` | `DD-MM-YYYY`；1/7 | ordinal, relativeTime, calendar | 是 |
| [cy.cjs primary](../../eyes/src/vendor/moment/primary/locale/cy.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/cy.cjs) | `cy` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [da.cjs primary](../../eyes/src/vendor/moment/primary/locale/da.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/da.cjs) | `da` | `DD.MM.YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [de-at.cjs primary](../../eyes/src/vendor/moment/primary/locale/de-at.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/de-at.cjs) | `de-at` | `DD.MM.YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [de-ch.cjs primary](../../eyes/src/vendor/moment/primary/locale/de-ch.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/de-ch.cjs) | `de-ch` | `DD.MM.YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [de.cjs primary](../../eyes/src/vendor/moment/primary/locale/de.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/de.cjs) | `de` | `DD.MM.YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [dv.cjs primary](../../eyes/src/vendor/moment/primary/locale/dv.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/dv.cjs) | `dv` | `D/M/YYYY`；7/12 | meridiemParse, meridiem, preparse, postformat, relativeTime, calendar | 是 |
| [el.cjs primary](../../eyes/src/vendor/moment/primary/locale/el.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/el.cjs) | `el` | `DD/MM/YYYY`；1/4 | meridiemParse, meridiem, ordinal, relativeTime, calendar | 是 |
| [en-au.cjs primary](../../eyes/src/vendor/moment/primary/locale/en-au.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/en-au.cjs) | `en-au` | `DD/MM/YYYY`；0/4 | ordinal, relativeTime, calendar | 是 |
| [en-ca.cjs primary](../../eyes/src/vendor/moment/primary/locale/en-ca.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/en-ca.cjs) | `en-ca` | `YYYY-MM-DD`；继承/继承 | ordinal, relativeTime, calendar | 是 |
| [en-gb.cjs primary](../../eyes/src/vendor/moment/primary/locale/en-gb.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/en-gb.cjs) | `en-gb` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [en-ie.cjs primary](../../eyes/src/vendor/moment/primary/locale/en-ie.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/en-ie.cjs) | `en-ie` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [en-il.cjs primary](../../eyes/src/vendor/moment/primary/locale/en-il.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/en-il.cjs) | `en-il` | `DD/MM/YYYY`；继承/继承 | ordinal, relativeTime, calendar | 是 |
| [en-in.cjs primary](../../eyes/src/vendor/moment/primary/locale/en-in.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/en-in.cjs) | `en-in` | `DD/MM/YYYY`；0/6 | ordinal, relativeTime, calendar | 是 |
| [en-nz.cjs primary](../../eyes/src/vendor/moment/primary/locale/en-nz.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/en-nz.cjs) | `en-nz` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [en-sg.cjs primary](../../eyes/src/vendor/moment/primary/locale/en-sg.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/en-sg.cjs) | `en-sg` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [eo.cjs primary](../../eyes/src/vendor/moment/primary/locale/eo.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/eo.cjs) | `eo` | `YYYY-MM-DD`；1/7 | meridiemParse, meridiem, ordinal, relativeTime, calendar | 是 |
| [es-do.cjs primary](../../eyes/src/vendor/moment/primary/locale/es-do.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/es-do.cjs) | `es-do` | `DD/MM/YYYY`；1/4 | monthsParse, ordinal, relativeTime, calendar | 是 |
| [es-mx.cjs primary](../../eyes/src/vendor/moment/primary/locale/es-mx.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/es-mx.cjs) | `es-mx` | `DD/MM/YYYY`；0/4 | monthsParse, ordinal, relativeTime, calendar | 是 |
| [es-us.cjs primary](../../eyes/src/vendor/moment/primary/locale/es-us.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/es-us.cjs) | `es-us` | `MM/DD/YYYY`；0/6 | monthsParse, ordinal, relativeTime, calendar | 是 |
| [es.cjs primary](../../eyes/src/vendor/moment/primary/locale/es.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/es.cjs) | `es` | `DD/MM/YYYY`；1/4 | monthsParse, ordinal, relativeTime, calendar | 是 |
| [et.cjs primary](../../eyes/src/vendor/moment/primary/locale/et.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/et.cjs) | `et` | `DD.MM.YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [eu.cjs primary](../../eyes/src/vendor/moment/primary/locale/eu.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/eu.cjs) | `eu` | `YYYY-MM-DD`；1/7 | ordinal, relativeTime, calendar | 是 |
| [fa.cjs primary](../../eyes/src/vendor/moment/primary/locale/fa.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/fa.cjs) | `fa` | `DD/MM/YYYY`；6/12 | meridiemParse, meridiem, preparse, postformat, ordinal, relativeTime, calendar | 是 |
| [fi.cjs primary](../../eyes/src/vendor/moment/primary/locale/fi.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/fi.cjs) | `fi` | `DD.MM.YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [fil.cjs primary](../../eyes/src/vendor/moment/primary/locale/fil.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/fil.cjs) | `fil` | `MM/D/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [fo.cjs primary](../../eyes/src/vendor/moment/primary/locale/fo.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/fo.cjs) | `fo` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [fr-ca.cjs primary](../../eyes/src/vendor/moment/primary/locale/fr-ca.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/fr-ca.cjs) | `fr-ca` | `YYYY-MM-DD`；继承/继承 | ordinal, relativeTime, calendar | 是 |
| [fr-ch.cjs primary](../../eyes/src/vendor/moment/primary/locale/fr-ch.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/fr-ch.cjs) | `fr-ch` | `DD.MM.YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [fr.cjs primary](../../eyes/src/vendor/moment/primary/locale/fr.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/fr.cjs) | `fr` | `DD/MM/YYYY`；1/4 | monthsParse, ordinal, relativeTime, calendar | 是 |
| [fy.cjs primary](../../eyes/src/vendor/moment/primary/locale/fy.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/fy.cjs) | `fy` | `DD-MM-YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [ga.cjs primary](../../eyes/src/vendor/moment/primary/locale/ga.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ga.cjs) | `ga` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [gd.cjs primary](../../eyes/src/vendor/moment/primary/locale/gd.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/gd.cjs) | `gd` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [gl.cjs primary](../../eyes/src/vendor/moment/primary/locale/gl.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/gl.cjs) | `gl` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [gom-deva.cjs primary](../../eyes/src/vendor/moment/primary/locale/gom-deva.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/gom-deva.cjs) | `gom-deva` | `DD-MM-YYYY`；0/3 | meridiemParse, meridiemHour, meridiem, ordinal, relativeTime, calendar | 是 |
| [gom-latn.cjs primary](../../eyes/src/vendor/moment/primary/locale/gom-latn.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/gom-latn.cjs) | `gom-latn` | `DD-MM-YYYY`；0/3 | meridiemParse, meridiemHour, meridiem, ordinal, relativeTime, calendar | 是 |
| [gu.cjs primary](../../eyes/src/vendor/moment/primary/locale/gu.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/gu.cjs) | `gu` | `DD/MM/YYYY`；0/6 | meridiemParse, meridiemHour, meridiem, preparse, postformat, relativeTime, calendar | 是 |
| [he.cjs primary](../../eyes/src/vendor/moment/primary/locale/he.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/he.cjs) | `he` | `DD/MM/YYYY`；继承/继承 | meridiemParse, meridiem, relativeTime, calendar | 是 |
| [hi.cjs primary](../../eyes/src/vendor/moment/primary/locale/hi.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/hi.cjs) | `hi` | `DD/MM/YYYY`；0/6 | meridiemParse, meridiemHour, meridiem, preparse, postformat, monthsParse, relativeTime, calendar | 是 |
| [hr.cjs primary](../../eyes/src/vendor/moment/primary/locale/hr.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/hr.cjs) | `hr` | `DD.MM.YYYY`；1/7 | ordinal, relativeTime, calendar | 是 |
| [hu.cjs primary](../../eyes/src/vendor/moment/primary/locale/hu.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/hu.cjs) | `hu` | `YYYY.MM.DD.`；1/4 | meridiemParse, meridiem, ordinal, relativeTime, calendar | 是 |
| [hy-am.cjs primary](../../eyes/src/vendor/moment/primary/locale/hy-am.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/hy-am.cjs) | `hy-am` | `DD.MM.YYYY`；1/7 | meridiemParse, meridiem, ordinal, relativeTime, calendar | 是 |
| [id.cjs primary](../../eyes/src/vendor/moment/primary/locale/id.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/id.cjs) | `id` | `DD/MM/YYYY`；0/6 | meridiemParse, meridiemHour, meridiem, relativeTime, calendar | 是 |
| [is.cjs primary](../../eyes/src/vendor/moment/primary/locale/is.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/is.cjs) | `is` | `DD.MM.YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [it-ch.cjs primary](../../eyes/src/vendor/moment/primary/locale/it-ch.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/it-ch.cjs) | `it-ch` | `DD.MM.YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [it.cjs primary](../../eyes/src/vendor/moment/primary/locale/it.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/it.cjs) | `it` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [ja.cjs primary](../../eyes/src/vendor/moment/primary/locale/ja.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ja.cjs) | `ja` | `YYYY/MM/DD`；继承/继承 | meridiemParse, meridiem, ordinal, relativeTime, calendar | 是 |
| [jv.cjs primary](../../eyes/src/vendor/moment/primary/locale/jv.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/jv.cjs) | `jv` | `DD/MM/YYYY`；1/7 | meridiemParse, meridiemHour, meridiem, relativeTime, calendar | 是 |
| [ka.cjs primary](../../eyes/src/vendor/moment/primary/locale/ka.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ka.cjs) | `ka` | `DD/MM/YYYY`；1/7 | ordinal, relativeTime, calendar | 是 |
| [kk.cjs primary](../../eyes/src/vendor/moment/primary/locale/kk.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/kk.cjs) | `kk` | `DD.MM.YYYY`；1/7 | ordinal, relativeTime, calendar | 是 |
| [km.cjs primary](../../eyes/src/vendor/moment/primary/locale/km.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/km.cjs) | `km` | `DD/MM/YYYY`；1/4 | meridiemParse, meridiem, preparse, postformat, ordinal, relativeTime, calendar | 是 |
| [kn.cjs primary](../../eyes/src/vendor/moment/primary/locale/kn.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/kn.cjs) | `kn` | `DD/MM/YYYY`；0/6 | meridiemParse, meridiemHour, meridiem, preparse, postformat, ordinal, relativeTime, calendar | 是 |
| [ko.cjs primary](../../eyes/src/vendor/moment/primary/locale/ko.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ko.cjs) | `ko` | `YYYY.MM.DD.`；继承/继承 | meridiemParse, meridiem, ordinal, relativeTime, calendar | 是 |
| [ku.cjs primary](../../eyes/src/vendor/moment/primary/locale/ku.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ku.cjs) | `ku` | `DD/MM/YYYY`；6/12 | meridiemParse, meridiem, preparse, postformat, relativeTime, calendar | 是 |
| [ky.cjs primary](../../eyes/src/vendor/moment/primary/locale/ky.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ky.cjs) | `ky` | `DD.MM.YYYY`；1/7 | ordinal, relativeTime, calendar | 是 |
| [lb.cjs primary](../../eyes/src/vendor/moment/primary/locale/lb.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/lb.cjs) | `lb` | `DD.MM.YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [lo.cjs primary](../../eyes/src/vendor/moment/primary/locale/lo.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/lo.cjs) | `lo` | `DD/MM/YYYY`；继承/继承 | meridiemParse, meridiem, ordinal, relativeTime, calendar | 是 |
| [lt.cjs primary](../../eyes/src/vendor/moment/primary/locale/lt.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/lt.cjs) | `lt` | `YYYY-MM-DD`；1/4 | ordinal, relativeTime, calendar | 是 |
| [lv.cjs primary](../../eyes/src/vendor/moment/primary/locale/lv.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/lv.cjs) | `lv` | `DD.MM.YYYY.`；1/4 | ordinal, relativeTime, calendar | 是 |
| [me.cjs primary](../../eyes/src/vendor/moment/primary/locale/me.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/me.cjs) | `me` | `DD.MM.YYYY`；1/7 | ordinal, relativeTime, calendar | 是 |
| [mi.cjs primary](../../eyes/src/vendor/moment/primary/locale/mi.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/mi.cjs) | `mi` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [mk.cjs primary](../../eyes/src/vendor/moment/primary/locale/mk.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/mk.cjs) | `mk` | `D.MM.YYYY`；1/7 | ordinal, relativeTime, calendar | 是 |
| [ml.cjs primary](../../eyes/src/vendor/moment/primary/locale/ml.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ml.cjs) | `ml` | `DD/MM/YYYY`；继承/继承 | meridiemParse, meridiemHour, meridiem, relativeTime, calendar | 是 |
| [mn.cjs primary](../../eyes/src/vendor/moment/primary/locale/mn.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/mn.cjs) | `mn` | `YYYY-MM-DD`；继承/继承 | meridiemParse, meridiem, ordinal, relativeTime, calendar | 是 |
| [mr.cjs primary](../../eyes/src/vendor/moment/primary/locale/mr.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/mr.cjs) | `mr` | `DD/MM/YYYY`；0/6 | meridiemParse, meridiemHour, meridiem, preparse, postformat, relativeTime, calendar | 是 |
| [ms-my.cjs primary](../../eyes/src/vendor/moment/primary/locale/ms-my.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ms-my.cjs) | `ms-my` | `DD/MM/YYYY`；1/7 | meridiemParse, meridiemHour, meridiem, relativeTime, calendar | 是 |
| [ms.cjs primary](../../eyes/src/vendor/moment/primary/locale/ms.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ms.cjs) | `ms` | `DD/MM/YYYY`；1/7 | meridiemParse, meridiemHour, meridiem, relativeTime, calendar | 是 |
| [mt.cjs primary](../../eyes/src/vendor/moment/primary/locale/mt.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/mt.cjs) | `mt` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [my.cjs primary](../../eyes/src/vendor/moment/primary/locale/my.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/my.cjs) | `my` | `DD/MM/YYYY`；1/4 | preparse, postformat, relativeTime, calendar | 是 |
| [nb.cjs primary](../../eyes/src/vendor/moment/primary/locale/nb.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/nb.cjs) | `nb` | `DD.MM.YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [ne.cjs primary](../../eyes/src/vendor/moment/primary/locale/ne.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ne.cjs) | `ne` | `DD/MM/YYYY`；0/6 | meridiemParse, meridiemHour, meridiem, preparse, postformat, relativeTime, calendar | 是 |
| [nl-be.cjs primary](../../eyes/src/vendor/moment/primary/locale/nl-be.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/nl-be.cjs) | `nl-be` | `DD/MM/YYYY`；1/4 | monthsParse, ordinal, relativeTime, calendar | 是 |
| [nl.cjs primary](../../eyes/src/vendor/moment/primary/locale/nl.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/nl.cjs) | `nl` | `DD-MM-YYYY`；1/4 | monthsParse, ordinal, relativeTime, calendar | 是 |
| [nn.cjs primary](../../eyes/src/vendor/moment/primary/locale/nn.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/nn.cjs) | `nn` | `DD.MM.YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [oc-lnc.cjs primary](../../eyes/src/vendor/moment/primary/locale/oc-lnc.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/oc-lnc.cjs) | `oc-lnc` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [pa-in.cjs primary](../../eyes/src/vendor/moment/primary/locale/pa-in.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/pa-in.cjs) | `pa-in` | `DD/MM/YYYY`；0/6 | meridiemParse, meridiemHour, meridiem, preparse, postformat, relativeTime, calendar | 是 |
| [pl.cjs primary](../../eyes/src/vendor/moment/primary/locale/pl.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/pl.cjs) | `pl` | `DD.MM.YYYY`；1/4 | monthsParse, ordinal, relativeTime, calendar | 是 |
| [pt-br.cjs primary](../../eyes/src/vendor/moment/primary/locale/pt-br.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/pt-br.cjs) | `pt-br` | `DD/MM/YYYY`；继承/继承 | ordinal, relativeTime, calendar | 是 |
| [pt.cjs primary](../../eyes/src/vendor/moment/primary/locale/pt.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/pt.cjs) | `pt` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [ro.cjs primary](../../eyes/src/vendor/moment/primary/locale/ro.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ro.cjs) | `ro` | `DD.MM.YYYY`；1/7 | relativeTime, calendar | 是 |
| [ru.cjs primary](../../eyes/src/vendor/moment/primary/locale/ru.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ru.cjs) | `ru` | `DD.MM.YYYY`；1/4 | meridiemParse, meridiem, monthsParse, ordinal, relativeTime, calendar | 是 |
| [sd.cjs primary](../../eyes/src/vendor/moment/primary/locale/sd.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/sd.cjs) | `sd` | `DD/MM/YYYY`；1/4 | meridiemParse, meridiem, preparse, postformat, relativeTime, calendar | 是 |
| [se.cjs primary](../../eyes/src/vendor/moment/primary/locale/se.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/se.cjs) | `se` | `DD.MM.YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [si.cjs primary](../../eyes/src/vendor/moment/primary/locale/si.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/si.cjs) | `si` | `YYYY/MM/DD`；继承/继承 | meridiemParse, meridiem, ordinal, relativeTime, calendar | 是 |
| [sk.cjs primary](../../eyes/src/vendor/moment/primary/locale/sk.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/sk.cjs) | `sk` | `DD.MM.YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [sl.cjs primary](../../eyes/src/vendor/moment/primary/locale/sl.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/sl.cjs) | `sl` | `DD. MM. YYYY`；1/7 | ordinal, relativeTime, calendar | 是 |
| [sq.cjs primary](../../eyes/src/vendor/moment/primary/locale/sq.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/sq.cjs) | `sq` | `DD/MM/YYYY`；1/4 | meridiemParse, meridiem, ordinal, relativeTime, calendar | 是 |
| [sr-cyrl.cjs primary](../../eyes/src/vendor/moment/primary/locale/sr-cyrl.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/sr-cyrl.cjs) | `sr-cyrl` | `D. M. YYYY.`；1/7 | ordinal, relativeTime, calendar | 是 |
| [sr.cjs primary](../../eyes/src/vendor/moment/primary/locale/sr.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/sr.cjs) | `sr` | `D. M. YYYY.`；1/7 | ordinal, relativeTime, calendar | 是 |
| [ss.cjs primary](../../eyes/src/vendor/moment/primary/locale/ss.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ss.cjs) | `ss` | `DD/MM/YYYY`；1/4 | meridiemParse, meridiemHour, meridiem, ordinal, relativeTime, calendar | 是 |
| [sv.cjs primary](../../eyes/src/vendor/moment/primary/locale/sv.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/sv.cjs) | `sv` | `YYYY-MM-DD`；1/4 | ordinal, relativeTime, calendar | 是 |
| [sw.cjs primary](../../eyes/src/vendor/moment/primary/locale/sw.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/sw.cjs) | `sw` | `DD.MM.YYYY`；1/7 | relativeTime, calendar | 是 |
| [ta.cjs primary](../../eyes/src/vendor/moment/primary/locale/ta.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ta.cjs) | `ta` | `DD/MM/YYYY`；0/6 | meridiemParse, meridiemHour, meridiem, preparse, postformat, ordinal, relativeTime, calendar | 是 |
| [te.cjs primary](../../eyes/src/vendor/moment/primary/locale/te.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/te.cjs) | `te` | `DD/MM/YYYY`；0/6 | meridiemParse, meridiemHour, meridiem, ordinal, relativeTime, calendar | 是 |
| [tet.cjs primary](../../eyes/src/vendor/moment/primary/locale/tet.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/tet.cjs) | `tet` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [tg.cjs primary](../../eyes/src/vendor/moment/primary/locale/tg.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/tg.cjs) | `tg` | `DD.MM.YYYY`；1/7 | meridiemParse, meridiemHour, meridiem, ordinal, relativeTime, calendar | 是 |
| [th.cjs primary](../../eyes/src/vendor/moment/primary/locale/th.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/th.cjs) | `th` | `DD/MM/YYYY`；继承/继承 | meridiemParse, meridiem, relativeTime, calendar | 是 |
| [tk.cjs primary](../../eyes/src/vendor/moment/primary/locale/tk.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/tk.cjs) | `tk` | `DD.MM.YYYY`；1/7 | ordinal, relativeTime, calendar | 是 |
| [tl-ph.cjs primary](../../eyes/src/vendor/moment/primary/locale/tl-ph.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/tl-ph.cjs) | `tl-ph` | `MM/D/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [tlh.cjs primary](../../eyes/src/vendor/moment/primary/locale/tlh.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/tlh.cjs) | `tlh` | `DD.MM.YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [tr.cjs primary](../../eyes/src/vendor/moment/primary/locale/tr.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/tr.cjs) | `tr` | `DD.MM.YYYY`；1/7 | meridiemParse, meridiem, ordinal, relativeTime, calendar | 是 |
| [tzl.cjs primary](../../eyes/src/vendor/moment/primary/locale/tzl.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/tzl.cjs) | `tzl` | `DD.MM.YYYY`；1/4 | meridiemParse, meridiem, ordinal, relativeTime, calendar | 是 |
| [tzm-latn.cjs primary](../../eyes/src/vendor/moment/primary/locale/tzm-latn.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/tzm-latn.cjs) | `tzm-latn` | `DD/MM/YYYY`；6/12 | relativeTime, calendar | 是 |
| [tzm.cjs primary](../../eyes/src/vendor/moment/primary/locale/tzm.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/tzm.cjs) | `tzm` | `DD/MM/YYYY`；6/12 | relativeTime, calendar | 是 |
| [ug-cn.cjs primary](../../eyes/src/vendor/moment/primary/locale/ug-cn.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ug-cn.cjs) | `ug-cn` | `YYYY-MM-DD`；1/7 | meridiemParse, meridiemHour, meridiem, preparse, postformat, ordinal, relativeTime, calendar | 是 |
| [uk.cjs primary](../../eyes/src/vendor/moment/primary/locale/uk.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/uk.cjs) | `uk` | `DD.MM.YYYY`；1/7 | meridiemParse, meridiem, ordinal, relativeTime, calendar | 是 |
| [ur.cjs primary](../../eyes/src/vendor/moment/primary/locale/ur.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/ur.cjs) | `ur` | `DD/MM/YYYY`；1/4 | meridiemParse, meridiem, preparse, postformat, relativeTime, calendar | 是 |
| [uz-latn.cjs primary](../../eyes/src/vendor/moment/primary/locale/uz-latn.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/uz-latn.cjs) | `uz-latn` | `DD/MM/YYYY`；1/7 | relativeTime, calendar | 是 |
| [uz.cjs primary](../../eyes/src/vendor/moment/primary/locale/uz.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/uz.cjs) | `uz` | `DD/MM/YYYY`；1/7 | relativeTime, calendar | 是 |
| [vi.cjs primary](../../eyes/src/vendor/moment/primary/locale/vi.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/vi.cjs) | `vi` | `DD/MM/YYYY`；1/4 | meridiemParse, meridiem, ordinal, relativeTime, calendar | 是 |
| [x-pseudo.cjs primary](../../eyes/src/vendor/moment/primary/locale/x-pseudo.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/x-pseudo.cjs) | `x-pseudo` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [yo.cjs primary](../../eyes/src/vendor/moment/primary/locale/yo.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/yo.cjs) | `yo` | `DD/MM/YYYY`；1/4 | ordinal, relativeTime, calendar | 是 |
| [zh-cn.cjs primary](../../eyes/src/vendor/moment/primary/locale/zh-cn.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/zh-cn.cjs) | `zh-cn` | `YYYY/MM/DD`；1/4 | meridiemParse, meridiemHour, meridiem, ordinal, relativeTime, calendar | 是 |
| [zh-hk.cjs primary](../../eyes/src/vendor/moment/primary/locale/zh-hk.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/zh-hk.cjs) | `zh-hk` | `YYYY/MM/DD`；继承/继承 | meridiemParse, meridiemHour, meridiem, ordinal, relativeTime, calendar | 是 |
| [zh-mo.cjs primary](../../eyes/src/vendor/moment/primary/locale/zh-mo.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/zh-mo.cjs) | `zh-mo` | `DD/MM/YYYY`；继承/继承 | meridiemParse, meridiemHour, meridiem, ordinal, relativeTime, calendar | 是 |
| [zh-tw.cjs primary](../../eyes/src/vendor/moment/primary/locale/zh-tw.cjs) / [secondary](../../eyes/src/vendor/moment/secondary/locale/zh-tw.cjs) | `zh-tw` | `YYYY/MM/DD`；继承/继承 | meridiemParse, meridiemHour, meridiem, ordinal, relativeTime, calendar | 是 |
