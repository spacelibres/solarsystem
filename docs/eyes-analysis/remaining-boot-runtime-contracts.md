# 剩余启动、运行时与发布契约

基线：v0.2.33（9f14926）。这是对实际源码的静态语义审阅，不是把 `not-semantically-accepted` 自动提升为行为等价证明。本篇拥有 26 个文件；筛选条件为 semantic-progress.json 中尚未接受且排除 vendor、styles/extracted、ui/templates、data。其余文件只作为调用链证据。未访问 NASA 网络，未改变资产路径，未运行恢复器或发布命令。

## 逐文件覆盖

| 文件（相对 eyes/） | 实际契约与限制 |
|---|---|
| README.md | 3–4、32–42、46–63、65–78：区分可编辑源码、一次恢复和正常编译；说明原始短变量及未公开仓库不可恢复的边界；本地缓存仅解码依赖。文字不是运行时资产完整性的证明。 |
| THIRD_PARTY_LICENSES.txt | 1–33：保存 OverlayScrollbars 1.13.0、Three MIT、JS Foundation、Moment/Moment Timezone 通知摘录；不是所有嵌入依赖逐包完整许可证清单，不能据此把所有代码重新许可为项目 MIT。 |
| decoders/manifest.json | 3–75：12 项 URL、长度、SHA-256；77：revision=1225db209857fe97。含 Draco wrapper/WASM/JS fallback、Basis wrapper/WASM 和原打包 fallback 文件；相同 WASM 哈希以不同文件名重复列出，属于 URL/加载器兼容而非不同算法。 |
| package-lock.json | 1–14 与各 packages 项：锁定构建工具及平台 esbuild optional 包的精确版本、integrity、engines；不是浏览器应用依赖清单。源码内嵌 vendor 不会被 npm 锁文件更新。 |
| package.json | 2–14：private ESM 子项目；build、dev、check、decoders:cache 分别指向本地脚本；只依赖 esbuild 0.28.2、Babel parser 7.29.9 作为开发工具。0.2.33 与应用内部 NASA 版本不同。 |
| provenance.json | 1–40 记录来源/UTF-16 偏移/抓取时间/原 bundle 哈希；modules 数组逐项记录 id、文件、exports、dependencies、部分 initialRecoveredFile。它证明映射来源，不能证明之后改动仍等价，也不是源码名称恢复率。 |
| scripts/audit.mjs | 6–8：以 provenance 模块表为审计范围并拒绝大小写碰撞；18–41：JSON parse、HTML 跳过、JS AST 检查残留工厂标识/非静态 require/非相对依赖和目标实际大小写。43 的成功是结构可解析且 import 存在，不是运行时初始化成功。不会发现未列入 manifest 的额外孤立文件，也不检查网络资源。 |
| scripts/build.mjs | 8–30：先验证 decoder cache，以 src/main.js 打包 IIFE application.js，保留函数名/生成 sourcemap/HTML 作为文本；成功 onEnd 才复制 shell、decoder cache，publish 才复制到 ../public/eyes。32–41：源码 watch 加 shell 递归 watch，100ms 合并变更；dispose 清 watcher。没有删旧 dist/public 文件或发布原子切换。 |
| scripts/decoder-cache.mjs | 6–9：长度和哈希双检、WASM validate；11–31：默认 cache 位于 .cache/decoders，拒绝路径越根，缺失/损坏才 30 秒限时下载，验证后 UUID 临时文件 rename。每项串行；错误停止构建。revision 来源 manifest，注入 resources 的测试模式可不带 revision。没有下载重试、锁或整个 revision 原子提交。 |
| scripts/dev-next.mjs | 5–6：先 watch/publish Eyes，再 spawn 当前 Node 执行解析到的 Next CLI，转发参数和 stdio；8–18：幂等 stop、kill 子进程、dispose watcher、响应 SIGINT/SIGTERM/exit/error。正常启动没有 recover 调用；不提供浏览器 HMR。 |
| scripts/serve.mjs | 6–18：先 build watch 后仅监听 loopback:3002（PORT 可覆盖）；dist 静态 GET，根映射 index.html、类型表、no-cache、失败 404。decodeURIComponent 在 try 外，畸形编码异常无显式兜底；无 Range/代理/SSR/认证/生产服务承诺。 |
| shell/index.html | 32–37 CSS 加载及 NASA logo/font preload；40–50 固定 pioneer/ui/static-ui/dynamic-ui/LoadIcon/loading-screen/embed-overlay DOM；52–56 先声明全局 config 再同步加载 application.js。NASA 标题、canonical、OG、图标均是原 UI 外壳，不能直接作为独立 spacelibre 产品 metadata。 |
| shell/app.css | 258354 字节的原应用全局样式；如230、747、895–900 的背景/cursor URL 直接指向 NASA app 资源，不经过 Downloader replacement。build 原样复制而非从 JS 抽取重建。逐 selector 语义应与 UI 样式专篇合看，本篇不声称全部布局跨设备已验证。 |
| shell/preload.css | 1–65 的 loading DOM、117–171 的 embed 三阶段交互/遮罩及其后动画；必须与 PreloadManager 生成的 DOM/class 同时存在。body:has 等选择器形成浏览器兼容边界，未做目标浏览器像素对照。 |
| shell/vendors.css | 原 vendor 全局 CSS；446 内嵌 SVG、573 内嵌字体等 data URI 不受 NASA URL replacement 影响。来源许可与 vendor 行为另审；不能当成新产品的通用 reset。 |
| src/app/public-api.js | 2–42 强制导入应用版本、类、managers、components 和 Types 注册副作用；43 起重新导出命名绑定。它不是孤立无副作用 SDK；例如同名 Search/Settings/TimeManager 是应用专用类。 |
| src/app/version.js | 2：NASA 应用版本常量 1.8.1.5；不等于 npm/release 的 0.2.33，不应拿它作为本产品发布版本。 |
| src/engine/pioneer/index.js | 2 起 import public-api 并逐名转导出；保持命名空间身份，没有创建独立引擎或插件注册器；调用者大量通过命名空间访问构造器。 |
| src/engine/pioneer/public-api.js | 2–109 导入 engine/core/component/controller；110 起导出；Collection 与 CollectionItem 来自同一模块、THREE 是 vendor three namespace。credits 是模块局部常量导出。导入任意名称会进入较大且互相回引的模块图，不能等价为仅该类的依赖。 |
| src/engine/solar-system/public-api.js | 2–46 包括场景 helpers、专用组件/controllers 及 Unidentified694–717/EntityEntry 配置副作用；47 起导出 Cameras、DateTime、Entity、Mapping/mappingOptions 等。它不是另一份 Three renderer；桥接给 window.PioneerScripts 的正是此 namespace。 |
| src/framework/eyes/index.js | 2–60 转导出 public-api；保留 Eyes.BaseApp、Types、manager/UI 的一致绑定；没有 React 生命周期。 |
| src/framework/eyes/public-api.js | 2–58 先导入框架模块及 Types，59 起导出；部分 UI 使用 Entry 默认导出，而非同名源组件直接导出。BaseApp import 此 barrel，本 barrel 又 import BaseApp，明确存在 ESM 环。 |
| src/main.js | 1–5 先 PreloadManager，再 preload/vendor 样式 shim，再 SolarSystemApp；启动是模块副作用，entry 没有 createApp 返回句柄。import 顺序是初始化契约，不可凭自动 import 排序调整。 |
| src/runtime/decoder-paths.js | 1–4 从 manifest 读 revision；localDecoderUrl(resource, baseUrl=document.baseURI) 用 URL 解析 decoders/revision/resource。默认基准是文档，不是 chunk/import.meta.url；在 /eyes/index.html 正确，在任意深层页面/自定义 base 下不同，调用方应明确 base。 |
| src/runtime/interop.cjs | 1：__esModule 或 Symbol.toStringTag=Module 时返回 default getter，否则返回原值 getter；2：将 module.paths 清空，children 缺失才置数组，返回 module。支持 legacy CJS metadata/default 语义，不含模块注册、网络加载或 webpack runtime。 |
| src/styles/index.js | 2–12 导入 11 个 extracted Unidentified756–766 样式 shim；它不读取 shell CSS、不生成 stylesheet。实际 CSS 来自 HTML link；仅分析这些 import 不能认为样式已覆盖。 |

## 启动实际顺序与环

1. HTML 已存在占位 DOM，config 先于 application.js；main 在浏览器加载时执行 PreloadManager 单例。不是 Next server component 可安全直接 import 的模块。
2. SolarSystemApp → framework Eyes barrel → BaseApp → Pioneer barrel/solar-system barrel/Eyes public-api；SolarSystemApp → app public-api → SolarSystemApp/Types-1075，构成回边。ESM live binding 与原执行顺序共同保证类、namespace、注册表身份，不能把循环看作所有值随时已经初始化。
3. BaseApp:566–575 注册 window load 回调、设置默认类、暴露 window.Pioneer/PioneerScripts。SolarSystemApp:184–186 设置 html 模板并通过继承的静态 setAppClass 覆盖待创建类。Types-754:6–45 建框架注册表，Types-1075:5–26 原地覆盖同一 Map，createManagers/createComponents 再查这个表。
4. load 时构造应用，BaseApp:17 暴露 window.app，并在构造期安装 touch/resize 全局监听。init:57–76 获取固定 DOM、创建 Engine、配置资源替换/pbr/time，依次 await managers、components，设置 routes/update，启动 router。createManagers:137–330 设置 catalogs、内容 URL、camera/scene 和回调；SolarSystemApp:68–71 额外等待 scene.loaded。
5. SolarSystemApp:26–31 在 super.init 后修正 Bennu 半径、隐藏 loading screen、更新 embed 50%、刷新 menu。故“init resolved”“scene 可用”“资源完整”“首帧呈现”不是同一个完成信号。

全局桥接不是模块图的主要依赖方式：例如 Unidentified694:3 显式 import Pioneer，12–13 在顶层注册配置中读取 Vector3/Quaternion；不能把此命名空间使用误报为全局自由变量。太阳系 barrel 的注册副作用导入不得被随意 tree-shake。window.Pioneer/PioneerScripts 的确被暴露，但本次检索没有找到显式 window.Pioneer 的内部读取；外部调试脚本或未穷举的自由标识符消费仍不能据此排除。

## 错误、取消、配置与远程边界

BaseApp:566–571 的 load listener 虽为 async，却没有 await `new BaseApp._appClass().init()`。catch 能捕获构造同步抛错并清空 body，不能捕获 init 异步拒绝；Loading UI 可能滞留，不能视为完整启动错误处理。构造期监听和 Engine 资源也没有同一 abort/dispose 事务。

配置有三种不同来源：shell 的 window.config 只替换 STATIC/DYNAMIC token；内嵌 JSON 给出 Time/Scene/View/Entity catalogs；路由 configs 另管 spout 等状态。ContentManager:73 通过 AppUtils.loadJSON 取 description，AppUtils:51–59 使用 fetch 并在非 OK 时抛错，没有 signal 参数。BaseApp:154–158 的 descriptions/events/stories 是固定 NASA app URL，不随 staticAssetsUrl 改动。Downloader:40–43 只按 Map 顺序把每个 `$NAME` 的第一次出现替换，不是通用 URL 代理。

CancelToken:3–13 只是单向布尔标记；Downloader:26–39 对活动 XHR abort、对队列移除并拒绝 CanceledError，DOM image/video 没有 request 句柄。Downloader:81–160 的网络/媒体分支取消强度不同；不能将取消 token 等同 AbortController。新版需要同时取消请求、拒收旧路由完成结果及释放 GPU/worker/media 对象。

Next 边界参考 `src/app/page.tsx:1–5` 当前只 redirect 到 /eyes/index.html。`src/app/nasa/[...path]/route.ts:39–93` 是旧磁盘镜像静态服务，非远程代理：params 异步、拒绝含 ..、normalize/path prefix、stat、stream、immutable 一年；缺文件 404，无 NASA fallback，无 Range/ETag 条件请求。注释说 abort 时 destroy，但实现仅注册 stream error handler，没有 request.signal 监听；应以实现为准。`src/lib/nasa/mirror.ts:1–14` 的“不得依赖 NASA runtime”旧注释与当前 AGENTS/ recovered shell 的直接 NASA URL政策冲突，不能拿此旧镜像设施作为新产品要求，也不应下载媒体库。

## 解码与构建责任的分界

application.js 来自本仓库 editable JS 的 esbuild 编译；decoder JS/WASM 来自 manifest 固定原 URL，经 cache 哈希确认后复制。后者不是“我们编译的解码器”。ModelComponent:195 与 TextureLoader:95 默认用 localDecoderUrl(draco/、ktx2/)，但 string 配置可覆盖；vendor Unidentified78/79/112–116 是相对文档的 bundled fallback 地址。12 项清单只能证明字节身份，不证明 Draco/Basis 与新版 npm Three 的 API/worker/纹理能力组合兼容。

root package.json 的 dev→dev-next 与 prebuild→check prerequisites + build --publish 都不运行 eyes:recover；恢复是独立显式研究命令。build 的 copy 不是 clean deploy：旧 revision/旧 shell 文件可残留，watch 的 shell copy 与后续 publish 没有事务锁；生产 Next 构建还受 in-tree mirror 防护约束。不能把“audit 通过”或“编译成功”升级成 NASA 服务、冷 cache、移动端 WebGL 或嵌入页面行为通过。

## 独立 Next.js + Three.js 系统应接管的契约

新系统应有 client runtime 工厂 `createRuntime(canvas, config, signal)` 及幂等 dispose，React effect 负责创建/销毁，服务端只输出可访问 shell/metadata。通过显式 typed services 注入时钟、catalog、URL resolver、loader、selection、camera、route state；不 import recovered entry/barrels，不读取 window.Pioneer/app/config，不复用其原地可变 Types Map。

启动状态至少区分 shell、catalog、renderer、scene、first-frame、failed/canceled；统一 await 异步启动并向 UI 提供 retry 和具体失败阶段。配置验证应在建 renderer 前进行。catalog 固定数据与远程动态数据各自校验，时间/路由恢复不得隐含任意网络代码执行。对于场景配置里的函数，改为仓库内具名 handler registry；逐项迁移原回调，不接受字符串 eval。

资产 resolver 保留经实物验证的精确 NASA URL；将应用内容、static、dynamic、decoder 分开建模，不能假定统一替换捕获 CSS/fonts/descriptions。decoder 使用新 renderer 兼容且已验证的版本/worker 生命周期，单独锁定和许可；可延续小型依赖缓存，但不能把媒体复制进仓库。revision/base URL 显式传入，部署子路径及 worker/WASM MIME/CSP 需要真实浏览器检查。

源码映射/原 LICENSE 留作来源证据；新产品版本、NASA数据版本和 decoder revision 各自独立。构建必须直接编译我们的 Next/Three 源，不以 recovered application.js iframe/重写 window 桥接冒充自主实现。NASA UI保留与新 spacelibre 表面是迁移产品决定，不能仅靠删除 CSS 达成。

## 尚需验证而非泛化接受

- ESM 环中的全部自由 Pioneer/PioneerScripts 标识符与注册副作用最早执行顺序，尚无独立图执行测试。
- 双启动、React StrictMode mount/unmount、路由切换期间 init reject/late result、全部全局监听与 GPU/worker 回收，当前恢复运行时无统一契约；新实现必须测试。
- manifest 未在本篇重新联网复核；字节锁定及源码引用已读，不能推断原 URL 今日可达或第三方许可完备。
- CSS 本篇按加载、外部资源与全局作用域边界审阅，未声称全部 selector/动画/响应式像素等价；应与 UI 样式分析共同验收。
- 冷 cache/损坏 cache/并发 build、publish 残留、子路径 decoder worker、WASM capability fallback 和远程 CORS/CSP 尚需运行验证；本篇没有用静态审阅替代这些证据。
