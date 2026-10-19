# 应用当前源码逐文件参考

当前 251 个文件。所有签名、行号、读写证据来自当前源码；[架构研究基线](application-architecture.md) 与 [实际语义进度](semantic-progress.json) 分开记录。完整短名、调用和反向依赖见 [总文档](README.md)。

## `eyes/src/app/PreloadManager.js`

在应用依赖图加载前显示普通或嵌入模式加载界面并更新进度。[源码](../../eyes/src/app/PreloadManager.js)。语义状态：`verified-behavior-fix`。

[总文档中的完整条目](README.md#file-eyes-src-app-PreloadManager-js)

### `PreloadManager`

主应用初始化前显示的加载界面：普通模式拥有 loading-screen，嵌入模式拥有 embed-overlay。 实例保留启动 URL 与输入设备能力；模块只暴露主应用使用的单例操作接口。。父类 `无`。

- `constructor()` [源码:10](../../eyes/src/app/PreloadManager.js#L10)：当前操作：写入 _canHover、_embedEl、_entityInfo、_hashRoute、_isTouch、_loadingScreenEl、_storyList、_urlParams；返回 PreloadManager.instance。
- `_isEmbed()` [源码:34](../../eyes/src/app/PreloadManager.js#L34)：当前操作：写入 无直接字段写入；返回 this._urlParams.get("embed")==="true"。
- `_isInteractPrompt()` [源码:38](../../eyes/src/app/PreloadManager.js#L38)：当前操作：写入 无直接字段写入；返回 this._urlParams.get("interactPrompt")==="true"。
- `_showLoadingScreen()` [源码:43](../../eyes/src/app/PreloadManager.js#L43)：CSS 用 2px、1px 节点形成疏密星层，两组阴影必须分别写入各自节点。
- `_createStarShadows(starCount)` [源码:73](../../eyes/src/app/PreloadManager.js#L73)：每颗星仍消耗三个随机数，保持原位置分布及 20–99% 灰阶亮度；阴影复制星点。
- `_showEmbedScreen()` [源码:85](../../eyes/src/app/PreloadManager.js#L85)：长标题以 HTML 换行；短标题作为纯文本。这里不等待主应用组件系统初始化。
- `showEmbedInteraction()` [源码:122](../../eyes/src/app/PreloadManager.js#L122)：同一回调解除触摸和鼠标监听，避免双输入设备重复关闭交互提示。
- `showEmbedViewButton()` [源码:136](../../eyes/src/app/PreloadManager.js#L136)：加载完成进入 view 阶段；document 级释放事件继续进入交互提示阶段。
- `_getTitleFromURL()` [源码:153](../../eyes/src/app/PreloadManager.js#L153)：用预加载目录推导标题，不依赖 content manager。 已知实体的 events 路由缺少事件 ID 时返回 null；其他无法识别的目标回退 Home。
- `_getNameFromEntityInfo(entityId)` [源码:199](../../eyes/src/app/PreloadManager.js#L199)：名称优先级与预加载目录一致：别名 → 展示名 → IAU 名称。
- `hideLoadingScreen()` [源码:205](../../eyes/src/app/PreloadManager.js#L205)：等待 400ms 淡出结束再移除 DOM，让过渡实际可见。
- `updateEmbedLoadPercent(loadPercent)` [源码:213](../../eyes/src/app/PreloadManager.js#L213)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `get embedLoading()` [源码:217](../../eyes/src/app/PreloadManager.js#L217)：当前操作：写入 无直接字段写入；返回 this._embedEl?.classList.contains("loading")。

## `eyes/src/app/SolarSystemApp.js`

装配太阳系应用的路由、管理器、组件配置和启动实例。[源码](../../eyes/src/app/SolarSystemApp.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-app-SolarSystemApp-js)

### `SolarSystemApp`

装配太阳系应用的路由、管理器、组件配置和启动实例；继承 Eyes.BaseApp。父类 `Eyes.BaseApp`。

- `constructor()` [源码:16](../../eyes/src/app/SolarSystemApp.js#L16)：当前操作：写入 _componentInfo、_sceneInfo、_timeInfo、_viewClasses、_viewInfo；返回 无显式返回。
- `init()` [源码:26](../../eyes/src/app/SolarSystemApp.js#L26)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setUpRoutes()` [源码:33](../../eyes/src/app/SolarSystemApp.js#L33)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setUpScene()` [源码:63](../../eyes/src/app/SolarSystemApp.js#L63)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setUpManagers()` [源码:68](../../eyes/src/app/SolarSystemApp.js#L68)：标题解析器读取路由参数而不修改路由；故事、子对象、事件及比较对象各有独立的标题优先级。Autoplay 管理器必须等待初始化后才能交给应用使用。
- `setUpComponents()` [源码:148](../../eyes/src/app/SolarSystemApp.js#L148)：图层面板负责执行开关操作，保持管理器状态与 NASA 原界面的按钮状态同步；这里只确定启动时的显隐集合。
- `getVersion()` [源码:173](../../eyes/src/app/SolarSystemApp.js#L173)：当前操作：写入 无直接字段写入；返回 SolarSystemPublicApi.AppVersion。
- `getVersions()` [源码:176](../../eyes/src/app/SolarSystemApp.js#L176)：当前操作：写入 无直接字段写入；返回 {pioneer:this.getPioneerVersion(),eyes:this.getEyesVersion(),app:this.getVersion()}。

## `eyes/src/app/config/components.js`

组件名称、类型、实例选项及 postCreationFunction 配置。[源码](../../eyes/src/app/config/components.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-app-config-components-js)

## `eyes/src/app/config/settings.js`

设置及分享/嵌入 UI 使用的选项定义。[源码](../../eyes/src/app/config/settings.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-app-config-settings-js)

## `eyes/src/app/config/views.js`

视图构造器注册表，与 ViewInfo class 字段对应。[源码](../../eyes/src/app/config/views.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-app-config-views-js)

## `eyes/src/app/public-api.js`

公共导出适配层，将已恢复模块按应用接口重新导出。[源码](../../eyes/src/app/public-api.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-app-public-api-js)

## `eyes/src/app/version.js`

保存恢复的 NASA 应用版本常量，不等于仓库发行版本。[源码](../../eyes/src/app/version.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-app-version-js)

## `eyes/src/data/EntityCatalog.json`

实体索引：名称、类别、可搜索性等元数据；供内容与搜索管理器使用。[源码](../../eyes/src/data/EntityCatalog.json)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-data-EntityCatalog-json)

## `eyes/src/data/SceneInfo.json`

场景配置：静态组、动态实体、实体选项及 metadata URL。[源码](../../eyes/src/data/SceneInfo.json)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-data-SceneInfo-json)

## `eyes/src/data/StoryCatalog.json`

故事卡片与 slide 目录；故事 id 与 STORIES 注册键对应。[源码](../../eyes/src/data/StoryCatalog.json)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-data-StoryCatalog-json)

## `eyes/src/data/TimeInfo.json`

默认时间范围 1949-12-31 至 2049-12-31 UTC。[源码](../../eyes/src/data/TimeInfo.json)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-data-TimeInfo-json)

## `eyes/src/data/Unidentified381.json`

Moment Timezone 打包时区数据库，版本 2021a。[源码](../../eyes/src/data/Unidentified381.json)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-data-Unidentified381-json)

## `eyes/src/data/Unidentified775.json`

按 Planet/Moon/Spacecraft 等类别列出的精选搜索实体 id。[源码](../../eyes/src/data/Unidentified775.json)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-data-Unidentified775-json)

## `eyes/src/data/Unidentified916.json`

第二份 Moment Timezone 打包时区数据库，版本 2021a。[源码](../../eyes/src/data/Unidentified916.json)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-data-Unidentified916-json)

## `eyes/src/data/ViewInfo.json`

视图类、名称及启用组件列表的声明式映射。[源码](../../eyes/src/data/ViewInfo.json)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-data-ViewInfo-json)

## `eyes/src/framework/eyes/index.js`

模块聚合入口，使用显式导出或副作用 import 连接依赖。[源码](../../eyes/src/framework/eyes/index.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-framework-eyes-index-js)

## `eyes/src/framework/eyes/public-api.js`

公共导出适配层，将已恢复模块按应用接口重新导出。[源码](../../eyes/src/framework/eyes/public-api.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-framework-eyes-public-api-js)

## `eyes/src/i18n/core.js`

显示层翻译引擎：以英文原文为键的字典、动态模式、实体/单位名称、DOM 文本与属性替换、标题与 HTML 区块翻译；英文时短路。。[源码](../../eyes/src/i18n/core.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-core-js)

## `eyes/src/i18n/index.js`

支持语言的注册表、URL/存储/浏览器语言协商与区域标签归一化；只做纯数据解析，不接入 DOM。。[源码](../../eyes/src/i18n/index.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-index-js)

## `eyes/src/i18n/install.js`

在应用图求值前启用语言层：moment 本地化、AppUtils HTML 助手包装、标题/时间格式补丁、数字与日期 Intl 默认区域、搜索关键词本地化、MutationObserver 与语言选择器挂载。。[源码](../../eyes/src/i18n/install.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-install-js)

## `eyes/src/i18n/locales/ar.js`

阿拉伯语（RTL）翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/ar.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-ar-js)

## `eyes/src/i18n/locales/cs.js`

捷克语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/cs.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-cs-js)

## `eyes/src/i18n/locales/de.js`

德语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/de.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-de-js)

## `eyes/src/i18n/locales/el.js`

希腊语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/el.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-el-js)

## `eyes/src/i18n/locales/en.js`

英文源目录：界面消息、动态模式、实体与别名、类别/子类别、单位、入门 HTML 区块与站点描述；其他语言文件保持同构。。[源码](../../eyes/src/i18n/locales/en.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-en-js)

## `eyes/src/i18n/locales/es.js`

西班牙语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/es.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-es-js)

## `eyes/src/i18n/locales/fr.js`

法语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/fr.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-fr-js)

## `eyes/src/i18n/locales/hi.js`

印地语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/hi.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-hi-js)

## `eyes/src/i18n/locales/id.js`

印度尼西亚语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/id.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-id-js)

## `eyes/src/i18n/locales/it.js`

意大利语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/it.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-it-js)

## `eyes/src/i18n/locales/ja.js`

日语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/ja.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-ja-js)

## `eyes/src/i18n/locales/ko.js`

韩语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/ko.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-ko-js)

## `eyes/src/i18n/locales/nl.js`

荷兰语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/nl.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-nl-js)

## `eyes/src/i18n/locales/pl.js`

波兰语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/pl.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-pl-js)

## `eyes/src/i18n/locales/pt-BR.js`

巴西葡萄牙语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/pt-BR.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-pt-BR-js)

## `eyes/src/i18n/locales/ro.js`

罗马尼亚语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/ro.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-ro-js)

## `eyes/src/i18n/locales/ru.js`

俄语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/ru.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-ru-js)

## `eyes/src/i18n/locales/sv.js`

瑞典语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/sv.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-sv-js)

## `eyes/src/i18n/locales/tr.js`

土耳其语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/tr.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-tr-js)

## `eyes/src/i18n/locales/uk.js`

乌克兰语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/uk.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-uk-js)

## `eyes/src/i18n/locales/vi.js`

越南语翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/vi.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-vi-js)

## `eyes/src/i18n/locales/zh-CN.js`

简体中文翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/zh-CN.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-zh-CN-js)

## `eyes/src/i18n/locales/zh-TW.js`

繁体中文（台湾）翻译目录；由 tools/i18n-apply.mjs 生成，结构与 en.js 同构。。[源码](../../eyes/src/i18n/locales/zh-TW.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-locales-zh-TW-js)

## `eyes/src/i18n/switcher.js`

设置区左上角注入的语言选择按钮与对话框；语言名保持本语言书写并标记 data-i18n-ignore，选择后持久化并带 lang 参数重载。。[源码](../../eyes/src/i18n/switcher.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-i18n-switcher-js)

## `eyes/src/main.js`

启动入口：先加载 preload，再初始化应用依赖图。[源码](../../eyes/src/main.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-main-js)

## `eyes/src/runtime/decoder-paths.js`

按 decoder manifest revision 构造解码器资源绝对 URL。[源码](../../eyes/src/runtime/decoder-paths.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-runtime-decoder-paths-js)

## `eyes/src/runtime/interop.cjs`

兼容 CommonJS/ESModule 默认导出访问器。[源码](../../eyes/src/runtime/interop.cjs)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-runtime-interop-cjs)

## `eyes/src/styles/extracted/AppUtilsStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/AppUtilsStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-AppUtilsStyles-js)

## `eyes/src/styles/extracted/BaseContentBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/BaseContentBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-BaseContentBlockStyles-js)

## `eyes/src/styles/extracted/BreadcrumbStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/BreadcrumbStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-BreadcrumbStyles-js)

## `eyes/src/styles/extracted/ButtonsBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/ButtonsBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-ButtonsBlockStyles-js)

## `eyes/src/styles/extracted/CameraViewBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/CameraViewBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-CameraViewBlockStyles-js)

## `eyes/src/styles/extracted/CheckboxBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/CheckboxBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-CheckboxBlockStyles-js)

## `eyes/src/styles/extracted/CollapsibleMenuItemStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/CollapsibleMenuItemStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-CollapsibleMenuItemStyles-js)

## `eyes/src/styles/extracted/CollapsibleMenuStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/CollapsibleMenuStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-CollapsibleMenuStyles-js)

## `eyes/src/styles/extracted/ComparisonStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/ComparisonStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-ComparisonStyles-js)

## `eyes/src/styles/extracted/ContentPanelStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/ContentPanelStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-ContentPanelStyles-js)

## `eyes/src/styles/extracted/DescriptionBlockStyles-1007.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/DescriptionBlockStyles-1007.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-DescriptionBlockStyles-1007-js)

## `eyes/src/styles/extracted/DescriptionBlockStyles-543.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/DescriptionBlockStyles-543.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-DescriptionBlockStyles-543-js)

## `eyes/src/styles/extracted/DistancePanelStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/DistancePanelStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-DistancePanelStyles-js)

## `eyes/src/styles/extracted/EventsBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/EventsBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-EventsBlockStyles-js)

## `eyes/src/styles/extracted/EventsTimelineStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/EventsTimelineStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-EventsTimelineStyles-js)

## `eyes/src/styles/extracted/FeaturedStoriesPanelStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/FeaturedStoriesPanelStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-FeaturedStoriesPanelStyles-js)

## `eyes/src/styles/extracted/FeaturedStoryBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/FeaturedStoryBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-FeaturedStoryBlockStyles-js)

## `eyes/src/styles/extracted/HintBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/HintBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-HintBlockStyles-js)

## `eyes/src/styles/extracted/ImageBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/ImageBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-ImageBlockStyles-js)

## `eyes/src/styles/extracted/InfoPanelStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/InfoPanelStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-InfoPanelStyles-js)

## `eyes/src/styles/extracted/InstrumentFOVBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/InstrumentFOVBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-InstrumentFOVBlockStyles-js)

## `eyes/src/styles/extracted/KioskBaseStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/KioskBaseStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-KioskBaseStyles-js)

## `eyes/src/styles/extracted/LayerPanelStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/LayerPanelStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-LayerPanelStyles-js)

## `eyes/src/styles/extracted/MenuStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/MenuStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-MenuStyles-js)

## `eyes/src/styles/extracted/MobileExpandButtonStyles-928.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/MobileExpandButtonStyles-928.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-MobileExpandButtonStyles-928-js)

## `eyes/src/styles/extracted/MobileExpandButtonStyles-987.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/MobileExpandButtonStyles-987.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-MobileExpandButtonStyles-987-js)

## `eyes/src/styles/extracted/OptionsBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/OptionsBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-OptionsBlockStyles-js)

## `eyes/src/styles/extracted/OverviewBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/OverviewBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-OverviewBlockStyles-js)

## `eyes/src/styles/extracted/PreloadStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/PreloadStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-PreloadStyles-js)

## `eyes/src/styles/extracted/RelatedBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/RelatedBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-RelatedBlockStyles-js)

## `eyes/src/styles/extracted/ReplayBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/ReplayBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-ReplayBlockStyles-js)

## `eyes/src/styles/extracted/ReplayButtonBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/ReplayButtonBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-ReplayButtonBlockStyles-js)

## `eyes/src/styles/extracted/SpecialFeaturesBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/SpecialFeaturesBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-SpecialFeaturesBlockStyles-js)

## `eyes/src/styles/extracted/StoryBaseContentBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/StoryBaseContentBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-StoryBaseContentBlockStyles-js)

## `eyes/src/styles/extracted/StoryStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/StoryStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-StoryStyles-js)

## `eyes/src/styles/extracted/TelescopeStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/TelescopeStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-TelescopeStyles-js)

## `eyes/src/styles/extracted/TextureQualityBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/TextureQualityBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-TextureQualityBlockStyles-js)

## `eyes/src/styles/extracted/TimeControlsStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/TimeControlsStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-TimeControlsStyles-js)

## `eyes/src/styles/extracted/ToastStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/ToastStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-ToastStyles-js)

## `eyes/src/styles/extracted/ToggleBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/ToggleBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-ToggleBlockStyles-js)

## `eyes/src/styles/extracted/ToolboxBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/ToolboxBlockStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-ToolboxBlockStyles-js)

## `eyes/src/styles/extracted/TutorialOverlayStyles-497.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/TutorialOverlayStyles-497.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-TutorialOverlayStyles-497-js)

## `eyes/src/styles/extracted/TutorialOverlayStyles-498.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/TutorialOverlayStyles-498.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-TutorialOverlayStyles-498-js)

## `eyes/src/styles/extracted/TutorialOverlayStyles-499.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/TutorialOverlayStyles-499.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-TutorialOverlayStyles-499-js)

## `eyes/src/styles/extracted/TutorialOverlayStyles-500.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/TutorialOverlayStyles-500.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-TutorialOverlayStyles-500-js)

## `eyes/src/styles/extracted/Unidentified226.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified226.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified226-js)

## `eyes/src/styles/extracted/Unidentified227.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified227.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified227-js)

## `eyes/src/styles/extracted/Unidentified231.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified231.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified231-js)

## `eyes/src/styles/extracted/Unidentified235.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified235.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified235-js)

## `eyes/src/styles/extracted/Unidentified239.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified239.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified239-js)

## `eyes/src/styles/extracted/Unidentified383.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified383.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified383-js)

## `eyes/src/styles/extracted/Unidentified387.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified387.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified387-js)

## `eyes/src/styles/extracted/Unidentified392.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified392.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified392-js)

## `eyes/src/styles/extracted/Unidentified502.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified502.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified502-js)

## `eyes/src/styles/extracted/Unidentified506.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified506.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified506-js)

## `eyes/src/styles/extracted/Unidentified507.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified507.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified507-js)

## `eyes/src/styles/extracted/Unidentified512.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified512.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified512-js)

## `eyes/src/styles/extracted/Unidentified516.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified516.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified516-js)

## `eyes/src/styles/extracted/Unidentified521.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified521.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified521-js)

## `eyes/src/styles/extracted/Unidentified739.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified739.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified739-js)

## `eyes/src/styles/extracted/Unidentified740.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified740.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified740-js)

## `eyes/src/styles/extracted/Unidentified741.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified741.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified741-js)

## `eyes/src/styles/extracted/Unidentified742.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified742.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified742-js)

## `eyes/src/styles/extracted/Unidentified743.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified743.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified743-js)

## `eyes/src/styles/extracted/Unidentified744.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified744.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified744-js)

## `eyes/src/styles/extracted/Unidentified745.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified745.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified745-js)

## `eyes/src/styles/extracted/Unidentified746.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified746.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified746-js)

## `eyes/src/styles/extracted/Unidentified747.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified747.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified747-js)

## `eyes/src/styles/extracted/Unidentified748.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified748.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified748-js)

## `eyes/src/styles/extracted/Unidentified749.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified749.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified749-js)

## `eyes/src/styles/extracted/Unidentified750.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified750.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified750-js)

## `eyes/src/styles/extracted/Unidentified751.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified751.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified751-js)

## `eyes/src/styles/extracted/Unidentified756.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified756.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified756-js)

## `eyes/src/styles/extracted/Unidentified757.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified757.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified757-js)

## `eyes/src/styles/extracted/Unidentified758.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified758.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified758-js)

## `eyes/src/styles/extracted/Unidentified759.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified759.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified759-js)

## `eyes/src/styles/extracted/Unidentified760.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified760.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified760-js)

## `eyes/src/styles/extracted/Unidentified761.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified761.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified761-js)

## `eyes/src/styles/extracted/Unidentified762.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified762.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified762-js)

## `eyes/src/styles/extracted/Unidentified763.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified763.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified763-js)

## `eyes/src/styles/extracted/Unidentified764.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified764.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified764-js)

## `eyes/src/styles/extracted/Unidentified765.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified765.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified765-js)

## `eyes/src/styles/extracted/Unidentified766.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/Unidentified766.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-Unidentified766-js)

## `eyes/src/styles/extracted/VendorStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。[源码](../../eyes/src/styles/extracted/VendorStyles.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-extracted-VendorStyles-js)

## `eyes/src/styles/index.js`

模块聚合入口，使用显式导出或副作用 import 连接依赖。[源码](../../eyes/src/styles/index.js)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-styles-index-js)

## `eyes/src/ui/components/BaseComponent.js`

组件模板、状态绑定、DOM 挂载和回调订阅的共同基类。[源码](../../eyes/src/ui/components/BaseComponent.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-BaseComponent-js)

### `BaseComponent`

组件模板、状态绑定、DOM 挂载和回调订阅的共同基类。父类 `无`。

- `constructor(app, element, initialOptions={parent:null,config:{},params:{},isVisible:true})` [源码:5](../../eyes/src/ui/components/BaseComponent.js#L5)：config 与 params 被取出后从传入对象删除，剩余选项进入状态。保留这项调用方可观察到的修改，避免去混淆顺带改变构造契约。
- `get components()` [源码:49](../../eyes/src/ui/components/BaseComponent.js#L49)：当前操作：写入 无直接字段写入；返回 this._components。
- `get app()` [源码:52](../../eyes/src/ui/components/BaseComponent.js#L52)：当前操作：写入 无直接字段写入；返回 this._app。
- `resize()` [源码:55](../../eyes/src/ui/components/BaseComponent.js#L55)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateFontSize()` [源码:58](../../eyes/src/ui/components/BaseComponent.js#L58)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `get element()` [源码:65](../../eyes/src/ui/components/BaseComponent.js#L65)：当前操作：写入 无直接字段写入；返回 this._element。
- `getParent()` [源码:68](../../eyes/src/ui/components/BaseComponent.js#L68)：当前操作：写入 无直接字段写入；返回 this._parent。
- `setParent(parent, replacedElement=null)` [源码:71](../../eyes/src/ui/components/BaseComponent.js#L71)：当前操作：写入 _parent；返回 无显式返回。
- `init(templateParams={})` [源码:76](../../eyes/src/ui/components/BaseComponent.js#L76)：当前操作：写入 _element；返回 无显式返回。
- `getConfig()` [源码:82](../../eyes/src/ui/components/BaseComponent.js#L82)：当前操作：写入 无直接字段写入；返回 this._config。
- `setConfig(configUpdates)` [源码:85](../../eyes/src/ui/components/BaseComponent.js#L85)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `bindFunctions(methodNames=[])` [源码:88](../../eyes/src/ui/components/BaseComponent.js#L88)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `isEnabled()` [源码:95](../../eyes/src/ui/components/BaseComponent.js#L95)：当前操作：写入 无直接字段写入；返回 this._enabled。
- `setEnabled(shouldEnable)` [源码:98](../../eyes/src/ui/components/BaseComponent.js#L98)：当前操作：写入 _enabled；返回 无显式返回。
- `destroy()` [源码:106](../../eyes/src/ui/components/BaseComponent.js#L106)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `show()` [源码:109](../../eyes/src/ui/components/BaseComponent.js#L109)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hide()` [源码:115](../../eyes/src/ui/components/BaseComponent.js#L115)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggle()` [源码:121](../../eyes/src/ui/components/BaseComponent.js#L121)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `loadHTML(templateUrl, parentElement=null)` [源码:124](../../eyes/src/ui/components/BaseComponent.js#L124)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getState(stateKey)` [源码:131](../../eyes/src/ui/components/BaseComponent.js#L131)：当前操作：写入 无直接字段写入；返回 stateKey in this._state?this._state[stateKey]:null。
- `addState(stateKey, initialValue, rootElement)` [源码:134](../../eyes/src/ui/components/BaseComponent.js#L134)：当前操作：写入 _state[stateKey]；返回 无显式返回。
- `setState(stateUpdates, onRendered)` [源码:139](../../eyes/src/ui/components/BaseComponent.js#L139)：只在至少一项值变化时保存旧状态、渲染并回调；相同值不会触发 onRendered。DOM 绑定由本组件持有，子组件启用状态另由 setEnabled 传播。
- `_parseHTML(templateHtml, parentElement=null)` [源码:153](../../eyes/src/ui/components/BaseComponent.js#L153)：当前操作：写入 _roots；返回 void。
- `_containVar(text)` [源码:164](../../eyes/src/ui/components/BaseComponent.js#L164)：当前操作：写入 无直接字段写入；返回 text&&"function"==typeof text.includes&&text.includes("{{")&&text.includes("}}")。
- `_splitNonEmpty(text)` [源码:167](../../eyes/src/ui/components/BaseComponent.js#L167)：当前操作：写入 无直接字段写入；返回 text.split(/\s+/g).filter(token=>""!==token)。
- `_setVariables(node, includeChildren=true)` [源码:171](../../eyes/src/ui/components/BaseComponent.js#L171)：文本占位符可能替换成 HTML 元素，因此绑定保存实际替换后的节点；后续渲染必须更新同一份绑定引用。倒序遍历避免节点替换影响尚未访问的兄弟。
- `_setEventHandlersFromAttributes(element)` [源码:233](../../eyes/src/ui/components/BaseComponent.js#L233)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_render(stateUpdates)` [源码:249](../../eyes/src/ui/components/BaseComponent.js#L249)：当前操作：写入 _vars[stateKey][bindingIndex].element、_vars[stateKey][bindingIndex].field；返回 无显式返回。
- `__enable()` [源码:286](../../eyes/src/ui/components/BaseComponent.js#L286)：启用时挂载本组件根节点并注册业务订阅。原实现用匿名 resize 包装器监听窗口，停用时移除的却是 this.resize；此处仅说明现状，不夹带监听器修复。
- `__disable()` [源码:295](../../eyes/src/ui/components/BaseComponent.js#L295)：停用会取消待执行的尺寸更新、卸载根节点并解除登记的业务订阅；根节点引用保留供下一次启用复用。
- `__destroy()` [源码:301](../../eyes/src/ui/components/BaseComponent.js#L301)：当前操作：写入 _element、_parent；返回 无显式返回。
- `_initCallbacks()` [源码:306](../../eyes/src/ui/components/BaseComponent.js#L306)：当前操作：写入 _callbacks[this._eventNames[eventIndex]]；返回 无显式返回。
- `registerCallback(eventName, callback)` [源码:309](../../eyes/src/ui/components/BaseComponent.js#L309)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeCallback(eventName, callback)` [源码:312](../../eyes/src/ui/components/BaseComponent.js#L312)：当前操作：写入 无直接字段写入；返回 void。
- `triggerCallbacks(eventName, callbackArgs=[])` [源码:317](../../eyes/src/ui/components/BaseComponent.js#L317)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `registerCallbacks()` [源码:322](../../eyes/src/ui/components/BaseComponent.js#L322)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeCallbacks()` [源码:332](../../eyes/src/ui/components/BaseComponent.js#L332)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/Breadcrumb.js`

将路由和目标层级转换为可点击面包屑。[源码](../../eyes/src/ui/components/Breadcrumb.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-Breadcrumb-js)

### `Breadcrumb`

面包屑每次路由变化重建动态节点，静态 logo 节点继续复用。每项点击闭包保存该层完整路径，locked 配置决定是否注册点击监听。。父类 `EyesPublicApi.BaseComponent`。

- `constructor(app, options={params:{}})` [源码:8](../../eyes/src/ui/components/Breadcrumb.js#L8)：当前操作：写入 _class.isHomeActiveClass、_crumbTexts；返回 无显式返回。
- `updateBreadcrumb(routeParts)` [源码:36](../../eyes/src/ui/components/Breadcrumb.js#L36)：当前操作：写入 _element.innerHTML；返回 无显式返回。
- `onRouteChange({routeParts:routeParts}={})` [源码:54](../../eyes/src/ui/components/Breadcrumb.js#L54)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setCrumbClickHandler(onCrumbClick)` [源码:59](../../eyes/src/ui/components/Breadcrumb.js#L59)：当前操作：写入 _onCrumbClick；返回 无显式返回。
- `_goToHome()` [源码:62](../../eyes/src/ui/components/Breadcrumb.js#L62)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getCrumbText(routePart)` [源码:68](../../eyes/src/ui/components/Breadcrumb.js#L68)：当前操作：写入 无直接字段写入；返回 this._crumbTexts[routePart]、entityInfo.displayName\|\|entityInfo.iauName、eventInfo.title、story?story.title:""。
- `_createCrumb(routePart, crumbRoute)` [源码:77](../../eyes/src/ui/components/Breadcrumb.js#L77)：当前操作：写入 无直接字段写入；返回 crumbElement。

## `eyes/src/ui/components/ButtonsBlock.js`

故事内容中的动作按钮组。[源码](../../eyes/src/ui/components/ButtonsBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-ButtonsBlock-js)

### `ButtonsBlock`

按钮定义由故事配置持有；场景就绪后创建 DOM，点击时先切换时间边界与速率，再执行该按钮提供的故事回调。。父类 `EyesPublicApi.StoryBaseContentBlock`。

- `constructor(app, options={})` [源码:8](../../eyes/src/ui/components/ButtonsBlock.js#L8)：当前操作：写入 _app、_options；返回 无显式返回。
- `setUpHTML(options)` [源码:18](../../eyes/src/ui/components/ButtonsBlock.js#L18)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `buttonClick(clickEvent)` [源码:44](../../eyes/src/ui/components/ButtonsBlock.js#L44)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/CameraViewBlock.js`

对象内容中的相机视角选项。[源码](../../eyes/src/ui/components/CameraViewBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-CameraViewBlock-js)

### `CameraViewBlock`

相机选项工厂保存目标 id 与各自选择/取消回调，切换时先取消旧选项再启用新选项。航天器选项等待实体就绪并核对当前视图目标，避免旧目标的异步结果覆盖新路由。renderFlag 是原有未使用的兼容参数，不推断其未证实含义。。父类 `SolarSystemPublicApi.BaseContentBlock`。

- `constructor(app, options={})` [源码:10](../../eyes/src/ui/components/CameraViewBlock.js#L10)：当前操作：写入 _activeCamOptIndex、_activeCameraOptions、_cameraOptions、_currentCameraView、_defaultViewIndexOverride、_entityId、_followId、_optionIndexMap、_prevCamOptIndex、_prevCameraView、_trajectoryViewId、onLoaded；返回 无显式返回。
- `_renderOptions(cameraOptions, renderFlag=false)` [源码:173](../../eyes/src/ui/components/CameraViewBlock.js#L173)：当前操作：写入 _activeCamOptIndex、_activeCameraOptions、_children.cameraOptions.innerHTML、_currentCameraView、_optionIndexMap、_optionIndexMap[id]、_prevCamOptIndex、_prevCameraView；返回 无显式返回。
- `_addPlanetOptions(entityInfo, renderFlag=false)` [源码:229](../../eyes/src/ui/components/CameraViewBlock.js#L229)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_addMoonOptions(entityInfo, renderFlag=false)` [源码:235](../../eyes/src/ui/components/CameraViewBlock.js#L235)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_addStarOptions(entityInfo, renderFlag=false)` [源码:242](../../eyes/src/ui/components/CameraViewBlock.js#L242)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_addSpacecraftOptions(entityInfo, renderFlag=false)` [源码:248](../../eyes/src/ui/components/CameraViewBlock.js#L248)：当前操作：写入 无直接字段写入；返回 void。
- `_addFeatureOptions(entityInfo, renderFlag=false)` [源码:279](../../eyes/src/ui/components/CameraViewBlock.js#L279)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_addDefaultOptions(entityInfo, renderFlag)` [源码:285](../../eyes/src/ui/components/CameraViewBlock.js#L285)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_goToView(currentCameraView)` [源码:296](../../eyes/src/ui/components/CameraViewBlock.js#L296)：当前操作：写入 _activeCamOptIndex、_currentCameraView、_prevCamOptIndex、_prevCameraView；返回 无显式返回。
- `goBackToPreviousView()` [源码:311](../../eyes/src/ui/components/CameraViewBlock.js#L311)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `goToFollowCameraView(followId)` [源码:314](../../eyes/src/ui/components/CameraViewBlock.js#L314)：当前操作：写入 _followId；返回 无显式返回。
- `goToTrajectoryView()` [源码:318](../../eyes/src/ui/components/CameraViewBlock.js#L318)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `goToDefaultView()` [源码:321](../../eyes/src/ui/components/CameraViewBlock.js#L321)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getCameraView()` [源码:324](../../eyes/src/ui/components/CameraViewBlock.js#L324)：当前操作：写入 无直接字段写入；返回 this._currentCameraView。
- `_selectDefaultView()` [源码:327](../../eyes/src/ui/components/CameraViewBlock.js#L327)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onRouteChange(routeParams)` [源码:334](../../eyes/src/ui/components/CameraViewBlock.js#L334)：当前操作：写入 _defaultViewIndexOverride、_entityId、onLoaded；返回 无显式返回。
- `onQueryChange(routeParams)` [源码:391](../../eyes/src/ui/components/CameraViewBlock.js#L391)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_processQuery(routeParams)` [源码:394](../../eyes/src/ui/components/CameraViewBlock.js#L394)：当前操作：写入 无直接字段写入；返回 void。
- `get isLoaded()` [源码:431](../../eyes/src/ui/components/CameraViewBlock.js#L431)：当前操作：写入 无直接字段写入；返回 this._activeCameraOptions.length>0。

## `eyes/src/ui/components/Carousel.js`

轮播条目选择、滚动与响应式显示。[源码](../../eyes/src/ui/components/Carousel.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-Carousel-js)

### `Carousel`

幻灯片节点与进入/离开回调按索引归轮播持有；切换先 await 旧页退出，再更新轨道和新页显示，最后 await 新页进入。滚动边界与触摸方向共同决定翻页，timeout 防止连续手势重复切换。。父类 `EyesPublicApi.BaseComponent`。

- `constructor(app, element, options={})` [源码:11](../../eyes/src/ui/components/Carousel.js#L11)：当前操作：写入 _children、_currentInfo、_onEnter、_onLeave、_onSlideChange、_progressTooltip、_slideTypes、_toggleControls；返回 无显式返回。
- `get currentInfo()` [源码:73](../../eyes/src/ui/components/Carousel.js#L73)：当前操作：写入 无直接字段写入；返回 this._currentInfo。
- `_onControlsToggle()` [源码:76](../../eyes/src/ui/components/Carousel.js#L76)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setOnControlsToggle(toggleControls)` [源码:79](../../eyes/src/ui/components/Carousel.js#L79)：当前操作：写入 _toggleControls；返回 无显式返回。
- `init()` [源码:82](../../eyes/src/ui/components/Carousel.js#L82)：当前操作：写入 _children.carousel.style.pointerEvents、_touchStartY；返回 无显式返回。
- `resize()` [源码:125](../../eyes/src/ui/components/Carousel.js#L125)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateTooltipsProps()` [源码:130](../../eyes/src/ui/components/Carousel.js#L130)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_createSlideTrack()` [源码:138](../../eyes/src/ui/components/Carousel.js#L138)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setSlideTrackDimensions()` [源码:144](../../eyes/src/ui/components/Carousel.js#L144)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateTrackPosition()` [源码:167](../../eyes/src/ui/components/Carousel.js#L167)：当前操作：写入 _children.track.style.transform；返回 无显式返回。
- `_updateSlides()` [源码:176](../../eyes/src/ui/components/Carousel.js#L176)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateCarousel()` [源码:186](../../eyes/src/ui/components/Carousel.js#L186)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onScroll(scrollEvent, inputMode="mouse")` [源码:190](../../eyes/src/ui/components/Carousel.js#L190)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addSlide(slideInfo, {isLast=false,isFirst=false}={})` [源码:205](../../eyes/src/ui/components/Carousel.js#L205)：当前操作：写入 _progressTooltip、_touchStartY；返回 无显式返回。
- `addSlides(slideInfos)` [源码:270](../../eyes/src/ui/components/Carousel.js#L270)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onEnter(slideIndex)` [源码:273](../../eyes/src/ui/components/Carousel.js#L273)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onLeave(slideIndex)` [源码:277](../../eyes/src/ui/components/Carousel.js#L277)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `goToSlide(slideIndex)` [源码:282](../../eyes/src/ui/components/Carousel.js#L282)：当前操作：写入 _children.progress.style.top；返回 无显式返回。
- `goToPrevSlide()` [源码:307](../../eyes/src/ui/components/Carousel.js#L307)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `goToNextSlide()` [源码:315](../../eyes/src/ui/components/Carousel.js#L315)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `goToFirstSlide()` [源码:322](../../eyes/src/ui/components/Carousel.js#L322)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `isVisible()` [源码:325](../../eyes/src/ui/components/Carousel.js#L325)：当前操作：写入 无直接字段写入；返回 this._state.isVisible。
- `collapse()` [源码:328](../../eyes/src/ui/components/Carousel.js#L328)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `expand()` [源码:336](../../eyes/src/ui/components/Carousel.js#L336)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `close()` [源码:344](../../eyes/src/ui/components/Carousel.js#L344)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `show()` [源码:345](../../eyes/src/ui/components/Carousel.js#L345)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `clear()` [源码:350](../../eyes/src/ui/components/Carousel.js#L350)：当前操作：写入 _children.slides、_children.track.innerHTML、_currentInfo、_onEnter、_onLeave、_state.currentIndex、_state.previousIndex；返回 无显式返回。
- `_toggleCollapse()` [源码:359](../../eyes/src/ui/components/Carousel.js#L359)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/CarouselPanel.js`

轮播面板及其条目生命周期。[源码](../../eyes/src/ui/components/CarouselPanel.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-CarouselPanel-js)

### `CarouselPanel`

Swiper 全局索引与标签页局部索引分开维护；分页圆点仅覆盖当前标签范围。每张长内容页持有滚动实例和拖动状态，mouseup 闭包成对撤销窗口鼠标监听。。父类 `EyesPublicApi.BaseComponent`。

- `constructor(app, options={})` [源码:10](../../eyes/src/ui/components/CarouselPanel.js#L10)：当前操作：写入 _activeBulletClass、_activeTabIndex、_bulletClass、_expandOnShow、_isInitialized、_onSlideChange、_orientation、_resizeTimeout、_swiper、_swiperSlideClass、_tabElements、_tabIndices；返回 无显式返回。
- `_addEvents()` [源码:73](../../eyes/src/ui/components/CarouselPanel.js#L73)：当前操作：写入 _activeTabIndex；返回 无显式返回。
- `_hasOrientationChanged()` [源码:105](../../eyes/src/ui/components/CarouselPanel.js#L105)：当前操作：写入 _orientation；返回 didOrientationChange。
- `_addScrollbars()` [源码:111](../../eyes/src/ui/components/CarouselPanel.js#L111)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `createTabs(tabInfos)` [源码:157](../../eyes/src/ui/components/CarouselPanel.js#L157)：当前操作：写入 _activeTabIndex、_tabElements、_tabIndices；返回 无显式返回。
- `_createSlideElements(slideInfo)` [源码:187](../../eyes/src/ui/components/CarouselPanel.js#L187)：当前操作：写入 无直接字段写入；返回 slideElements。
- `_createBullets(activeBulletIndex=0)` [源码:214](../../eyes/src/ui/components/CarouselPanel.js#L214)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setActiveBullet(activeBulletIndex)` [源码:248](../../eyes/src/ui/components/CarouselPanel.js#L248)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addSlide(slideElements=[], onClick)` [源码:257](../../eyes/src/ui/components/CarouselPanel.js#L257)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `initSwiper()` [源码:264](../../eyes/src/ui/components/CarouselPanel.js#L264)：当前操作：写入 _swiper；返回 EyesPublicApi.AppUtils.elementReady(slideSelector).then(()=>{this._swiper?(this._swiper.update(),this._addScrollbars(),this._createBullets(),this._swiper.slideTo(0)):(this._swiper=new A11y.default(ˋ.${carouselClass}ˋ,thi。
- `_postSwiperInitFunction()` [源码:273](../../eyes/src/ui/components/CarouselPanel.js#L273)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_destroy()` [源码:280](../../eyes/src/ui/components/CarouselPanel.js#L280)：当前操作：写入 _children.swiperSlides.innerHTML；返回 无显式返回。
- `_onTabClick(clickEvent)` [源码:284](../../eyes/src/ui/components/CarouselPanel.js#L284)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `expand()` [源码:291](../../eyes/src/ui/components/CarouselPanel.js#L291)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `collapse()` [源码:298](../../eyes/src/ui/components/CarouselPanel.js#L298)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setExpandState(isExpanded)` [源码:305](../../eyes/src/ui/components/CarouselPanel.js#L305)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `show(initializeSwiper=true)` [源码:312](../../eyes/src/ui/components/CarouselPanel.js#L312)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hide()` [源码:325](../../eyes/src/ui/components/CarouselPanel.js#L325)：当前操作：写入 _isInitialized；返回 无显式返回。
- `resize()` [源码:336](../../eyes/src/ui/components/CarouselPanel.js#L336)：当前操作：写入 _resizeTimeout；返回 无显式返回。

## `eyes/src/ui/components/Checkbox.js`

复选输入状态与 change 回调。[源码](../../eyes/src/ui/components/Checkbox.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-Checkbox-js)

### `Checkbox`

勾选状态与三个模板 class 同步更新；skipCallback 用于程序化同步显示而不重复执行外部业务动作。。父类 `EyesPublicApi.BaseComponent`。

- `constructor(app, options={})` [源码:8](../../eyes/src/ui/components/Checkbox.js#L8)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `init()` [源码:42](../../eyes/src/ui/components/Checkbox.js#L42)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggle(clickEvent, skipCallback=false)` [源码:47](../../eyes/src/ui/components/Checkbox.js#L47)：当前操作：写入 无直接字段写入；返回 void。

## `eyes/src/ui/components/CheckboxBlock.js`

故事内容中的复选项组。[源码](../../eyes/src/ui/components/CheckboxBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-CheckboxBlock-js)

### `CheckboxBlock`

故事提供 checkboxContent 和 onChange；此块只拥有生成的 label/input 节点，变更事件连同应用实例转交配置回调。。父类 `EyesPublicApi.StoryBaseContentBlock`。

- `constructor(app, options={})` [源码:8](../../eyes/src/ui/components/CheckboxBlock.js#L8)：当前操作：写入 options；返回 无显式返回。
- `setUpHTML(options)` [源码:17](../../eyes/src/ui/components/CheckboxBlock.js#L17)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setChecked(checkboxId, isChecked)` [源码:46](../../eyes/src/ui/components/CheckboxBlock.js#L46)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/CheckboxMultistate.js`

扩展复选框以表示多个状态。[源码](../../eyes/src/ui/components/CheckboxMultistate.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-CheckboxMultistate-js)

### `CheckboxMultistate`

多态复选框替换父类的二态点击监听；状态索引循环，显式 requestedStateIndex 优先，class 表与回调收到同一新索引。。父类 `Checkbox.Checkbox`。

- `constructor(app, options={})` [源码:9](../../eyes/src/ui/components/CheckboxMultistate.js#L9)：当前操作：写入 _numStates；返回 无显式返回。
- `_initStates()` [源码:18](../../eyes/src/ui/components/CheckboxMultistate.js#L18)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `init()` [源码:36](../../eyes/src/ui/components/CheckboxMultistate.js#L36)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setNumStates(numStates)` [源码:42](../../eyes/src/ui/components/CheckboxMultistate.js#L42)：当前操作：写入 _numStates；返回 无显式返回。
- `getCurrentStateIndex()` [源码:45](../../eyes/src/ui/components/CheckboxMultistate.js#L45)：当前操作：写入 无直接字段写入；返回 this._state.stateIndex。
- `setClassesForIndex(stateClasses, stateIndex)` [源码:48](../../eyes/src/ui/components/CheckboxMultistate.js#L48)：当前操作：写入 _class[classRole]、_class[classRole][stateIndex]；返回 无显式返回。
- `cycle(clickEvent, skipCallback=false, requestedStateIndex=null)` [源码:61](../../eyes/src/ui/components/CheckboxMultistate.js#L61)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/Clock.js`

时间编辑、显示、时区和边界提示。[源码](../../eyes/src/ui/components/Clock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-Clock-js)

### `Clock`

时钟格式由 time 管理器统一持有，普通时钟订阅 update，kiosk 计时器由调用者直接传文本。编辑提交经解析后写入路由；停用时取消限时提示的隐藏计时器。。父类 `EyesPublicApi.BaseComponent`。

- `constructor(app, options={})` [源码:9](../../eyes/src/ui/components/Clock.js#L9)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `init()` [源码:30](../../eyes/src/ui/components/Clock.js#L30)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onDateTimeClick()` [源码:78](../../eyes/src/ui/components/Clock.js#L78)：当前操作：写入 无直接字段写入；返回 void。
- `isERT()` [源码:95](../../eyes/src/ui/components/Clock.js#L95)：当前操作：写入 无直接字段写入；返回 this._isERT。
- `toggle(fieldName, isVisible)` [源码:98](../../eyes/src/ui/components/Clock.js#L98)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_parseTime(inputText)` [源码:119](../../eyes/src/ui/components/Clock.js#L119)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `update(timeValue, isTimerText=false)` [源码:135](../../eyes/src/ui/components/Clock.js#L135)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `backToLive()` [源码:145](../../eyes/src/ui/components/Clock.js#L145)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setLimitMessage(limitDirection, customMessage)` [源码:157](../../eyes/src/ui/components/Clock.js#L157)：当前操作：写入 limitMessageTimeout；返回 无显式返回。
- `_displayLimitMessage(isVisible)` [源码:176](../../eyes/src/ui/components/Clock.js#L176)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__disable()` [源码:179](../../eyes/src/ui/components/Clock.js#L179)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/ClockShortcut.js`

快速日期时间选择入口。[源码](../../eyes/src/ui/components/ClockShortcut.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-ClockShortcut-js)

### `ClockShortcut`

时间管理器 update 订阅通过基类注册表随启停解除。外部视图可接管返回实时操作，未接管时才修改路由时间与速率。。父类 `EyesPublicApi.BaseComponent`。

- `constructor(app)` [源码:10](../../eyes/src/ui/components/ClockShortcut.js#L10)：当前操作：写入 _class.fontSize.small、_liveCallback、_state.replayClass；返回 无显式返回。
- `init()` [源码:25](../../eyes/src/ui/components/ClockShortcut.js#L25)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setCallback(callback)` [源码:61](../../eyes/src/ui/components/ClockShortcut.js#L61)：当前操作：写入 _liveCallback；返回 无显式返回。
- `backToLive()` [源码:64](../../eyes/src/ui/components/ClockShortcut.js#L64)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_replay()` [源码:78](../../eyes/src/ui/components/ClockShortcut.js#L78)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `update(timeUpdate)` [源码:83](../../eyes/src/ui/components/ClockShortcut.js#L83)：当前操作：写入 无直接字段写入；返回 void。

## `eyes/src/ui/components/CollapsibleMenu.js`

可折叠工具菜单和子项显示。[源码](../../eyes/src/ui/components/CollapsibleMenu.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-CollapsibleMenu-js)

### `CollapsibleMenu`

菜单保存项目顺序与已展开队列，依据各项最大高度计算剩余空间；新增项目可复用现存组件，组件订阅则登记在本菜单的回调注册表。。父类 `Eyes.BaseComponent`。

- `constructor(app)` [源码:10](../../eyes/src/ui/components/CollapsibleMenu.js#L10)：当前操作：写入 _allowMultiple、_availableHeight、_expandedItems、_maxHeight、_menuItems、_resizeObserver；返回 无显式返回。
- `init()` [源码:31](../../eyes/src/ui/components/CollapsibleMenu.js#L31)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getMaxHeight()` [源码:35](../../eyes/src/ui/components/CollapsibleMenu.js#L35)：当前操作：写入 无直接字段写入；返回 windowHeight>600?.4*windowHeight:.5*windowHeight。
- `_calcUsedHeight()` [源码:39](../../eyes/src/ui/components/CollapsibleMenu.js#L39)：当前操作：写入 无直接字段写入；返回 usedHeight。
- `_calcAvailableHeight()` [源码:51](../../eyes/src/ui/components/CollapsibleMenu.js#L51)：当前操作：写入 无直接字段写入；返回 this._maxHeight-usedHeight。
- `_itemHasSpace({height:height})` [源码:55](../../eyes/src/ui/components/CollapsibleMenu.js#L55)：当前操作：写入 无直接字段写入；返回 this._availableHeight>height.max。
- `_addExpandedItem(menuItem)` [源码:60](../../eyes/src/ui/components/CollapsibleMenu.js#L60)：当前操作：写入 _availableHeight；返回 无显式返回。
- `_removeExpandedItem(menuItem)` [源码:64](../../eyes/src/ui/components/CollapsibleMenu.js#L64)：当前操作：写入 _availableHeight、_expandedItems；返回 无显式返回。
- `_collapseLastItem()` [源码:68](../../eyes/src/ui/components/CollapsibleMenu.js#L68)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `collapse()` [源码:71](../../eyes/src/ui/components/CollapsibleMenu.js#L71)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setBtmGradScale()` [源码:75](../../eyes/src/ui/components/CollapsibleMenu.js#L75)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addItem({itemTitle:itemTitle,componentNames:componentNames,positionIndex:positionIndex,dimensions:dimensions,expand:shouldExpand=true})` [源码:80](../../eyes/src/ui/components/CollapsibleMenu.js#L80)：当前操作：写入 无直接字段写入；返回 menuItem。
- `removeAllItems()` [源码:128](../../eyes/src/ui/components/CollapsibleMenu.js#L128)：当前操作：写入 _availableHeight、_expandedItems、_menuItems；返回 无显式返回。
- `onItemToggle(isExpanded, menuItem)` [源码:139](../../eyes/src/ui/components/CollapsibleMenu.js#L139)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onItemVisibleChange()` [源码:153](../../eyes/src/ui/components/CollapsibleMenu.js#L153)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setAllowMultiple(allowMultiple)` [源码:159](../../eyes/src/ui/components/CollapsibleMenu.js#L159)：当前操作：写入 _allowMultiple；返回 无显式返回。
- `get visibleItems()` [源码:162](../../eyes/src/ui/components/CollapsibleMenu.js#L162)：当前操作：写入 无直接字段写入；返回 this._menuItems.filter(menuItem=>menuItem.getState("isVisible"))。
- `get allItems()` [源码:165](../../eyes/src/ui/components/CollapsibleMenu.js#L165)：当前操作：写入 无直接字段写入；返回 this._element?.childNodes。

## `eyes/src/ui/components/CollapsibleMenuItem.js`

工具菜单中的独立动作项。[源码](../../eyes/src/ui/components/CollapsibleMenuItem.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-CollapsibleMenuItem-js)

### `CollapsibleMenuItem`

子组件 DOM 移入本项容器，同时记录 _cMenuParent 供视图访问；展开事件先发出，再更新本项状态、子组件可见性和尺寸。。父类 `Eyes.BaseComponent`。

- `constructor(app, parentComponent, options={})` [源码:8](../../eyes/src/ui/components/CollapsibleMenuItem.js#L8)：当前操作：写入 _components、_parentComponent；返回 无显式返回。
- `init()` [源码:21](../../eyes/src/ui/components/CollapsibleMenuItem.js#L21)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addComponent(component, followEnabledState=false)` [源码:38](../../eyes/src/ui/components/CollapsibleMenuItem.js#L38)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onToggleClick()` [源码:50](../../eyes/src/ui/components/CollapsibleMenuItem.js#L50)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onCollapseClick()` [源码:57](../../eyes/src/ui/components/CollapsibleMenuItem.js#L57)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setToggleAriaLabel(isExpanded)` [源码:60](../../eyes/src/ui/components/CollapsibleMenuItem.js#L60)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setExpanded(isExpanded)` [源码:70](../../eyes/src/ui/components/CollapsibleMenuItem.js#L70)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setContainerHeight(isExpanded)` [源码:78](../../eyes/src/ui/components/CollapsibleMenuItem.js#L78)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `get parentComponent()` [源码:86](../../eyes/src/ui/components/CollapsibleMenuItem.js#L86)：当前操作：写入 无直接字段写入；返回 this._parentComponent。

## `eyes/src/ui/components/Comparison.js`

目标与比较对象的尺寸、距离或照片比较交互。[源码](../../eyes/src/ui/components/Comparison.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-Comparison-js)

### `Comparison`

两侧对象说明异步读取后转换成单份模板状态；航天器等按长度显示，天体右侧按半径比显示。小单位切换发生在数值格式化前，保持 NASA 原比较规则。。父类 `Eyes.BaseComponent`。

- `constructor(app, element)` [源码:9](../../eyes/src/ui/components/Comparison.js#L9)：当前操作：写入 _class.fontSize.default、_class.fontSize.small、_class.fontSize.xSmall、compare、list、name、unitConverter；返回 无显式返回。
- `init()` [源码:42](../../eyes/src/ui/components/Comparison.js#L42)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateFontSize()` [源码:63](../../eyes/src/ui/components/Comparison.js#L63)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `unitchange(isMetric)` [源码:72](../../eyes/src/ui/components/Comparison.js#L72)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `nextCompare()` [源码:78](../../eyes/src/ui/components/Comparison.js#L78)：当前操作：写入 compare；返回 无显式返回。
- `previousCompare()` [源码:84](../../eyes/src/ui/components/Comparison.js#L84)：当前操作：写入 compare；返回 无显式返回。
- `clearRightPanelText(entityId)` [源码:90](../../eyes/src/ui/components/Comparison.js#L90)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `clearLeftPanelText(entityId)` [源码:103](../../eyes/src/ui/components/Comparison.js#L103)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setup(comparisonOptions={})` [源码:116](../../eyes/src/ui/components/Comparison.js#L116)：当前操作：写入 compare、list、name、unitConverter；返回 void。
- `formatValue(numericValue, fractionDigits=1)` [源码:126](../../eyes/src/ui/components/Comparison.js#L126)：当前操作：写入 无直接字段写入；返回 formattedValue、numericValue.toFixed(fractionDigits)、roundedValue.toFixed(fractionDigits)。
- `generateValues()` [源码:138](../../eyes/src/ui/components/Comparison.js#L138)：当前操作：写入 leftDescription、rightDescription；返回 void。
- `entityCompareLookup(entityId, side)` [源码:207](../../eyes/src/ui/components/Comparison.js#L207)：当前操作：写入 无直接字段写入；返回 null、{icon:iconClass,category:categoryLabel,type:entityInfo.category\|\|"NA",className:this._app.getManager("content").getClassName(entityId),name:entityInfo.displayName\|\|entityInfo.iauName\|\|entityInfo.name\|\|sceneEntity.getName。
- `closeView()` [源码:223](../../eyes/src/ui/components/Comparison.js#L223)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/ContentPanel.js`

按路由描述装配对象内容块并控制面板折叠与覆盖。[源码](../../eyes/src/ui/components/ContentPanel.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-ContentPanel-js)

### `ContentPanel`

面板拥有对象/事件/特征内容块与 tab 拓扑，路由刷新先停用旧块并克隆默认拓扑，再按资源能力增删块。加载完成后的对象阶段单独补入相机与贴图选项，多处取消检查还核对当前目标。移动布局把 overview 和 replay 作为持久块处理，拖动结束吸附到计算出的高度档位；桌面改用展开/折叠状态。routeFlag、refreshFlag 为原有未读取参数，保留签名但不推断业务用途。。父类 `Eyes.BaseComponent`。

- `constructor(app, options)` [源码:33](../../eyes/src/ui/components/ContentPanel.js#L33)：当前操作：写入 _adjustedMobileHeight、_backButtonVisibleClass、_backRoute、_blockState、_cameraViewBlock、_class.iconCollapse、_class.iconExpand、_class.isCollapsed、_class.isExpanded、_class.isOverlay、_class.isScrollToTopVisible、_compareSizeBlock、_components、_currentId、_defaultState、_descriptionBlock、_distanceToolBlock、_eventsBlock、_featuredMoonsBlock、_featuresBlock、_instrumentFOVBlock、_isDragging、_layersBlock、_mainViewportEl、_moonsBlock、_overviewBlock、_pioneerParentEl、_relatedBlock、_replayBlock、_resizeTimeoutAmount、_scrollbar、_snapHeights、_surfaceMapBlock、_telescopeModeBlock、_textureQualityBlock；返回 无显式返回。
- `getScrollbar()` [源码:154](../../eyes/src/ui/components/ContentPanel.js#L154)：当前操作：写入 无直接字段写入；返回 this._scrollbar。
- `_showTab(tabName)` [源码:157](../../eyes/src/ui/components/ContentPanel.js#L157)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_hideTab(tabName)` [源码:162](../../eyes/src/ui/components/ContentPanel.js#L162)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `init()` [源码:167](../../eyes/src/ui/components/ContentPanel.js#L167)：当前操作：写入 _cameraViewBlock、_compareSizeBlock、_descriptionBlock、_distanceToolBlock、_eventsBlock、_featuredMoonsBlock、_featuresBlock、_instrumentFOVBlock、_isLandscape、_isMobile、_layersBlock、_moonsBlock、_overviewBlock、_relatedBlock、_replayBlock、_surfaceMapBlock、_tabContent、_telescopeModeBlock、_textureQualityBlock；返回 无显式返回。
- `_onRouteChange(currentId, routeParts)` [源码:214](../../eyes/src/ui/components/ContentPanel.js#L214)：当前操作：写入 _currentId、_defaultState.title、_persistingBlocks、_tabContent；返回 无显式返回。
- `getParentTabOfSubtab(subtabName)` [源码:217](../../eyes/src/ui/components/ContentPanel.js#L217)：当前操作：写入 无直接字段写入；返回 tabName、""。
- `selectTab(tabName, isMainTab=true)` [源码:221](../../eyes/src/ui/components/ContentPanel.js#L221)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onTabSelect(clickEvent)` [源码:248](../../eyes/src/ui/components/ContentPanel.js#L248)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addBlockToTab(blockName, tabName=defaultMainTab, subtabName=null)` [源码:255](../../eyes/src/ui/components/ContentPanel.js#L255)：当前操作：写入 _blockState[ˋ${blockName}Blockˋ]；返回 无显式返回。
- `removeBlockFromTab(blockName, tabName=defaultMainTab, subtabName=null)` [源码:260](../../eyes/src/ui/components/ContentPanel.js#L260)：当前操作：写入 _blockState[ˋ${blockName}Blockˋ]；返回 无显式返回。
- `populateTabs(tabs, persistingBlocks=[])` [源码:267](../../eyes/src/ui/components/ContentPanel.js#L267)：当前操作：写入 无直接字段写入；返回 void。
- `createSubtabHTML()` [源码:289](../../eyes/src/ui/components/ContentPanel.js#L289)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onQueryChange(queryParams)` [源码:328](../../eyes/src/ui/components/ContentPanel.js#L328)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setupBackButton(routeParts)` [源码:331](../../eyes/src/ui/components/ContentPanel.js#L331)：当前操作：写入 _backButtonVisibleClass、_backRoute；返回 无显式返回。
- `onRouteChangeEvent(entityId, eventId, eventInfo, eventDescription, orderedEvents, cancelToken, routeParts)` [源码:340](../../eyes/src/ui/components/ContentPanel.js#L340)：当前操作：写入 _persistingBlocks；返回 void。
- `onRouteChangeObject(entityId, entityInfo, entityDescription, events, featuredStories, cancelToken, routeParts, routeFlag=false)` [源码:370](../../eyes/src/ui/components/ContentPanel.js#L370)：当前操作：写入 _defaultState.title；返回 void。
- `onRouteChangeObjectLoaded(entityId, entityInfo, entityDescription, events, featuredStories, routeParams, routeParts)` [源码:390](../../eyes/src/ui/components/ContentPanel.js#L390)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onRouteChangeFeature(entityId, entityInfo, featureInfo, featureDescription, cancelToken, routeParts)` [源码:398](../../eyes/src/ui/components/ContentPanel.js#L398)：当前操作：写入 无直接字段写入；返回 void。
- `onChildParentChange(entityId, entityInfo, refreshFlag)` [源码:412](../../eyes/src/ui/components/ContentPanel.js#L412)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `determineToolboxBlocksState(entityInfo)` [源码:422](../../eyes/src/ui/components/ContentPanel.js#L422)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `determineViewOptionBlocksState(entityId, cancelToken=null)` [源码:456](../../eyes/src/ui/components/ContentPanel.js#L456)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `determineSurfaceMapBlockState(entityId)` [源码:464](../../eyes/src/ui/components/ContentPanel.js#L464)：当前操作：写入 无直接字段写入；返回 void。
- `determineLayersBlockState(entityId, cancelToken=null)` [源码:476](../../eyes/src/ui/components/ContentPanel.js#L476)：当前操作：写入 无直接字段写入；返回 void。
- `determineInstrumentFOVBlockState(entityId)` [源码:500](../../eyes/src/ui/components/ContentPanel.js#L500)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `determineTextureQualityBlockState(entityId)` [源码:511](../../eyes/src/ui/components/ContentPanel.js#L511)：当前操作：写入 无直接字段写入；返回 void。
- `determineFeaturesBlockState(entityId, entityInfo)` [源码:523](../../eyes/src/ui/components/ContentPanel.js#L523)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `backRoute()` [源码:533](../../eyes/src/ui/components/ContentPanel.js#L533)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onClickShowCollapse()` [源码:544](../../eyes/src/ui/components/ContentPanel.js#L544)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resize()` [源码:547](../../eyes/src/ui/components/ContentPanel.js#L547)：当前操作：写入 _isLandscape、_isMobile；返回 无显式返回。
- `onDragStart(touchEvent)` [源码:560](../../eyes/src/ui/components/ContentPanel.js#L560)：当前操作：写入 _isDragging；返回 无显式返回。
- `onDrag(touchEvent)` [源码:564](../../eyes/src/ui/components/ContentPanel.js#L564)：当前操作：写入 element.style.height；返回 void。
- `onDragEnd(touchEvent)` [源码:571](../../eyes/src/ui/components/ContentPanel.js#L571)：当前操作：写入 _isDragging、_snapHeights.index、element.style.height；返回 无显式返回。
- `expand()` [源码:597](../../eyes/src/ui/components/ContentPanel.js#L597)：当前操作：写入 _snapHeights.index、element.style.height；返回 void。
- `collapse()` [源码:618](../../eyes/src/ui/components/ContentPanel.js#L618)：当前操作：写入 _snapHeights.index、element.style.height；返回 void。
- `toggleExpandCollapse()` [源码:638](../../eyes/src/ui/components/ContentPanel.js#L638)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `show()` [源码:650](../../eyes/src/ui/components/ContentPanel.js#L650)：当前操作：写入 _scrollbar；返回 无显式返回。
- `hide()` [源码:655](../../eyes/src/ui/components/ContentPanel.js#L655)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_delayedResize()` [源码:659](../../eyes/src/ui/components/ContentPanel.js#L659)：当前操作：写入 _adjustedMobileHeight；返回 无显式返回。
- `_getParentTabOfSubtab(subtabName)` [源码:671](../../eyes/src/ui/components/ContentPanel.js#L671)：当前操作：写入 无直接字段写入；返回 tabName、""。
- `_calcTabPanelBottomMargin()` [源码:675](../../eyes/src/ui/components/ContentPanel.js#L675)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getBlockHeight(blockElement)` [源码:686](../../eyes/src/ui/components/ContentPanel.js#L686)：当前操作：写入 无直接字段写入；返回 new Promise(resolveHeight=>{const heightInterval=setInterval(()=>{const blockHeight=parseFloat(window.getComputedStyle(blockElement).height);isNaN(blockHeight)\|\|(clearInterval(heightInterval),resolveHeight(parseFloat(win。
- `_calculateAdjustedMobileHeight()` [源码:696](../../eyes/src/ui/components/ContentPanel.js#L696)：当前操作：写入 _adjustedMobileHeight；返回 void。
- `_setUpMobileCollapse(forceCollapsed=false)` [源码:716](../../eyes/src/ui/components/ContentPanel.js#L716)：当前操作：写入 _snapHeights.index、_snapHeights.value、element.style.height；返回 无显式返回。
- `_determineCollapsedBlockVisiblity()` [源码:763](../../eyes/src/ui/components/ContentPanel.js#L763)：当前操作：写入 无直接字段写入；返回 new Promise(resolveVisibility=>{collapsibleBlockNames&&collapsibleBlockNames.forEach(blockName=>{const blockElement=this._app.getComponent(ˋ${blockName}Blockˋ).element;isFullyCollapsed?panelElement.contains(blockElement)。
- `_disableAllComponents()` [源码:791](../../eyes/src/ui/components/ContentPanel.js#L791)：当前操作：写入 _blockState[componentName]；返回 无显式返回。
- `clearPanel(targetTitle=null)` [源码:797](../../eyes/src/ui/components/ContentPanel.js#L797)：当前操作：写入 _defaultState.title；返回 无显式返回。
- `reset()` [源码:806](../../eyes/src/ui/components/ContentPanel.js#L806)：当前操作：写入 _currentId；返回 无显式返回。
- `__disable()` [源码:812](../../eyes/src/ui/components/ContentPanel.js#L812)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/DescriptionBlock-1005.js`

DescriptionBlock-1005 模块。[源码](../../eyes/src/ui/components/DescriptionBlock-1005.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-DescriptionBlock-1005-js)

### `DescriptionBlock`

描述文本中的月球计数来自实体分组，必要时退回父实体；移动布局直接显示更多内容，桌面展开时保留原滚动位置规则。。父类 `SolarSystemPublicApi.BaseContentBlock`。

- `constructor(app)` [源码:10](../../eyes/src/ui/components/DescriptionBlock-1005.js#L10)：当前操作：写入 _app；返回 无显式返回。
- `onRouteChange(entityId, entityDescription)` [源码:23](../../eyes/src/ui/components/DescriptionBlock-1005.js#L23)：当前操作：写入 无直接字段写入；返回 void。
- `resetScrollbar()` [源码:52](../../eyes/src/ui/components/DescriptionBlock-1005.js#L52)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resize()` [源码:55](../../eyes/src/ui/components/DescriptionBlock-1005.js#L55)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onClickReadMore()` [源码:65](../../eyes/src/ui/components/DescriptionBlock-1005.js#L65)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/DescriptionBlock-541.js`

DescriptionBlock-541 模块。[源码](../../eyes/src/ui/components/DescriptionBlock-541.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-DescriptionBlock-541-js)

### `DescriptionBlock`

故事描述的更多内容由 info.more 决定；_more 保存完整按钮文字、图标和 class 快照，切换时与 isMoreVisible 一并提交。。父类 `EyesPublicApi.StoryBaseContentBlock`。

- `constructor(app, options={})` [源码:8](../../eyes/src/ui/components/DescriptionBlock-541.js#L8)：当前操作：写入 _class.hasMoreClass、_more；返回 无显式返回。
- `init()` [源码:34](../../eyes/src/ui/components/DescriptionBlock-541.js#L34)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `showMore()` [源码:42](../../eyes/src/ui/components/DescriptionBlock-541.js#L42)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hideMore()` [源码:48](../../eyes/src/ui/components/DescriptionBlock-541.js#L48)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleMore()` [源码:54](../../eyes/src/ui/components/DescriptionBlock-541.js#L54)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/DistancePanel.js`

距离源目标选择和距离计算显示面板。[源码](../../eyes/src/ui/components/DistancePanel.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-DistancePanel-js)

### `DistancePanel`

测距计算归 distance 管理器，面板持有拖动坐标、移动布局与线条交互状态。按下时登记窗口移动/抬起监听，抬起保存限位坐标并解除监听；屏幕中心改变时补偿面板位置。线条点击吸附到源、中心或目标，再由管理器转换到三维线偏移。原 removeAllEvents 的 hover 监听添加行为保留，未在去混淆中修复。。父类 `Eyes.BaseComponent`。

- `constructor(app, options={})` [源码:9](../../eyes/src/ui/components/DistancePanel.js#L9)：当前操作：写入 _canHover、_dragState、_isMobile、_isTouch、_lineGraphic、_size、_touchOptions、isMobileChangedCallback；返回 无显式返回。
- `initSearchUI()` [源码:78](../../eyes/src/ui/components/DistancePanel.js#L78)：当前操作：写入 sourceSearch、targetSearch；返回 无显式返回。
- `onMouseDown(mouseEvent)` [源码:100](../../eyes/src/ui/components/DistancePanel.js#L100)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onMouseMove(mouseEvent)` [源码:106](../../eyes/src/ui/components/DistancePanel.js#L106)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onMouseUp()` [源码:121](../../eyes/src/ui/components/DistancePanel.js#L121)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onTouchStart(touchEvent)` [源码:131](../../eyes/src/ui/components/DistancePanel.js#L131)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onTouchMove(touchEvent)` [源码:141](../../eyes/src/ui/components/DistancePanel.js#L141)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onTouchEnd()` [源码:160](../../eyes/src/ui/components/DistancePanel.js#L160)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_calcNewXandY(pointerX, pointerY)` [源码:170](../../eyes/src/ui/components/DistancePanel.js#L170)：当前操作：写入 无直接字段写入；返回 {newX:dragX+(pointerX-downX),newY:dragY+(pointerY-downY)}。
- `exit()` [源码:182](../../eyes/src/ui/components/DistancePanel.js#L182)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleSourceMP()` [源码:192](../../eyes/src/ui/components/DistancePanel.js#L192)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleTargetMP()` [源码:199](../../eyes/src/ui/components/DistancePanel.js#L199)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onSwapClick()` [源码:206](../../eyes/src/ui/components/DistancePanel.js#L206)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleUnitSystem(clickEvent)` [源码:209](../../eyes/src/ui/components/DistancePanel.js#L209)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onResultClick(clickEvent)` [源码:214](../../eyes/src/ui/components/DistancePanel.js#L214)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onContainerClick(clickEvent)` [源码:223](../../eyes/src/ui/components/DistancePanel.js#L223)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addEvents()` [源码:226](../../eyes/src/ui/components/DistancePanel.js#L226)：当前操作：写入 _canHover、_isTouch；返回 无显式返回。
- `removeAllEvents()` [源码:244](../../eyes/src/ui/components/DistancePanel.js#L244)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setIsSearching(isSearching)` [源码:257](../../eyes/src/ui/components/DistancePanel.js#L257)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setScreenCenter(centerX, centerY)` [源码:262](../../eyes/src/ui/components/DistancePanel.js#L262)：当前操作：写入 _dragState.screenCenterX、_dragState.screenCenterY；返回 无显式返回。
- `setPanelProps()` [源码:266](../../eyes/src/ui/components/DistancePanel.js#L266)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `get currentlyDragging()` [源码:299](../../eyes/src/ui/components/DistancePanel.js#L299)：当前操作：写入 无直接字段写入；返回 this._dragState.currentlyDragging。
- `setCurrentlyDragging(isDragging)` [源码:302](../../eyes/src/ui/components/DistancePanel.js#L302)：当前操作：写入 _dragState.currentlyDragging；返回 无显式返回。
- `setDownXY(pointerX, pointerY)` [源码:308](../../eyes/src/ui/components/DistancePanel.js#L308)：当前操作：写入 _dragState.downX、_dragState.downY；返回 无显式返回。
- `setLimitXY(limitX, limitY)` [源码:312](../../eyes/src/ui/components/DistancePanel.js#L312)：当前操作：写入 _dragState.limitX、_dragState.limitY；返回 无显式返回。
- `setDragXY(dragX=this._dragState.x, dragY=this._dragState.y)` [源码:316](../../eyes/src/ui/components/DistancePanel.js#L316)：当前操作：写入 _dragState.dragX、_dragState.dragY；返回 无显式返回。
- `setTransformCSSVars(panelX, panelY)` [源码:320](../../eyes/src/ui/components/DistancePanel.js#L320)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setCanMinimize(canMinimize)` [源码:325](../../eyes/src/ui/components/DistancePanel.js#L325)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setSwapButtonVisible(isVisible)` [源码:330](../../eyes/src/ui/components/DistancePanel.js#L330)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `calcMaxMinBtnPos(panelX)` [源码:335](../../eyes/src/ui/components/DistancePanel.js#L335)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getLimitedXandY(desiredX, desiredY)` [源码:351](../../eyes/src/ui/components/DistancePanel.js#L351)：当前操作：写入 无直接字段写入；返回 {limitX:Math.min(Math.max(0,desiredX),maximumX),limitY:Math.min(Math.max(minimumY,desiredY),maximumY)}。
- `toggleIsMinimized(clickEvent, requestedMinimized)` [源码:369](../../eyes/src/ui/components/DistancePanel.js#L369)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setIsDraggable(isDraggable)` [源码:387](../../eyes/src/ui/components/DistancePanel.js#L387)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setIsLoading(isLoading)` [源码:393](../../eyes/src/ui/components/DistancePanel.js#L393)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setResult({text:text,unit:unit,relText:relText,relUnit:relUnit,isRelVelocity=false,isDistance=false}={})` [源码:398](../../eyes/src/ui/components/DistancePanel.js#L398)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setLightTime(lightTimeText)` [源码:429](../../eyes/src/ui/components/DistancePanel.js#L429)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setSourceText(sourceText)` [源码:445](../../eyes/src/ui/components/DistancePanel.js#L445)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setSourceMpState(measurePointName)` [源码:454](../../eyes/src/ui/components/DistancePanel.js#L454)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setTargetText(targetText)` [源码:465](../../eyes/src/ui/components/DistancePanel.js#L465)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setTargetMpState(measurePointName)` [源码:474](../../eyes/src/ui/components/DistancePanel.js#L474)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onIsMobileChanged(isMobile)` [源码:485](../../eyes/src/ui/components/DistancePanel.js#L485)：当前操作：写入 _isMobile；返回 无显式返回。
- `_updateTitleAndCloseBtnParent(isMobile=this._isMobile)` [源码:491](../../eyes/src/ui/components/DistancePanel.js#L491)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `get allowBpOffset()` [源码:499](../../eyes/src/ui/components/DistancePanel.js#L499)：当前操作：写入 无直接字段写入；返回 this._state.isDraggable&&this._state.isMinimized。
- `setBpCSSOffsets()` [源码:502](../../eyes/src/ui/components/DistancePanel.js#L502)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onLineClick(clickEvent, requestedPosition)` [源码:511](../../eyes/src/ui/components/DistancePanel.js#L511)：当前操作：写入 无直接字段写入；返回 void。
- `onLineMouseMove(mouseEvent)` [源码:536](../../eyes/src/ui/components/DistancePanel.js#L536)：当前操作：写入 无直接字段写入；返回 void。
- `onLineMouseEnter()` [源码:552](../../eyes/src/ui/components/DistancePanel.js#L552)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onLineMouseLeave()` [源码:555](../../eyes/src/ui/components/DistancePanel.js#L555)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setLineGraphicDimensions()` [源码:558](../../eyes/src/ui/components/DistancePanel.js#L558)：当前操作：写入 _lineGraphic.height、_lineGraphic.top；返回 无显式返回。
- `_onLineTouchStart(touchEvent)` [源码:569](../../eyes/src/ui/components/DistancePanel.js#L569)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onLineTouchEnd()` [源码:581](../../eyes/src/ui/components/DistancePanel.js#L581)：当前操作：写入 _touchOptions.activeTimeout；返回 无显式返回。
- `setLineGraphicDotPos(normalizedPosition)` [源码:589](../../eyes/src/ui/components/DistancePanel.js#L589)：当前操作：写入 _lineGraphic.dotPos；返回 无显式返回。
- `setLineGraphicDotOffset(normalizedOffset)` [源码:598](../../eyes/src/ui/components/DistancePanel.js#L598)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resize(resizeEvent, forceUpdate=false)` [源码:605](../../eyes/src/ui/components/DistancePanel.js#L605)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `show()` [源码:618](../../eyes/src/ui/components/DistancePanel.js#L618)：当前操作：写入 distanceManager；返回 无显式返回。
- `hide()` [源码:622](../../eyes/src/ui/components/DistancePanel.js#L622)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__enable()` [源码:629](../../eyes/src/ui/components/DistancePanel.js#L629)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__disable()` [源码:633](../../eyes/src/ui/components/DistancePanel.js#L633)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/EventsBlock.js`

对象事件列表内容块。[源码](../../eyes/src/ui/components/EventsBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-EventsBlock-js)

### `EventsBlock`

此块在表格与共享 eventsTimeline 间切换；共享时间线重新挂到本块容器。实体就绪后才提交事件集合和选择，排序会替换本块的事件数组但不修改目录事件对象。。父类 `SolarSystemPublicApi.BaseContentBlock`。

- `constructor(app)` [源码:9](../../eyes/src/ui/components/EventsBlock.js#L9)：当前操作：写入 _app、_currentTab、_defaultTab、_introMessages、_minEventsForTimeline；返回 无显式返回。
- `onRouteChange(entityId, events, selectedEvent)` [源码:29](../../eyes/src/ui/components/EventsBlock.js#L29)：当前操作：写入 _currentEvent、_currentTab、_events、_numEvents、_timeline；返回 无显式返回。
- `startLoading()` [源码:66](../../eyes/src/ui/components/EventsBlock.js#L66)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `stopLoading()` [源码:80](../../eyes/src/ui/components/EventsBlock.js#L80)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onTabSelect(clickEvent)` [源码:92](../../eyes/src/ui/components/EventsBlock.js#L92)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `selectTab(tabName)` [源码:99](../../eyes/src/ui/components/EventsBlock.js#L99)：当前操作：写入 _currentTab；返回 无显式返回。
- `showTimeline()` [源码:111](../../eyes/src/ui/components/EventsBlock.js#L111)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `showTable()` [源码:124](../../eyes/src/ui/components/EventsBlock.js#L124)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resetScrollbar()` [源码:137](../../eyes/src/ui/components/EventsBlock.js#L137)：当前操作：写入 _children.tableContainer.scrollTop；返回 无显式返回。
- `populateTable()` [源码:140](../../eyes/src/ui/components/EventsBlock.js#L140)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `sortEventsByTitle()` [源码:174](../../eyes/src/ui/components/EventsBlock.js#L174)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `sortEventsByYear()` [源码:180](../../eyes/src/ui/components/EventsBlock.js#L180)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `sortEventsByTarget()` [源码:186](../../eyes/src/ui/components/EventsBlock.js#L186)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `rotateSortTriangle(sortField)` [源码:192](../../eyes/src/ui/components/EventsBlock.js#L192)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `sortTable(sortField)` [源码:195](../../eyes/src/ui/components/EventsBlock.js#L195)：当前操作：写入 _events；返回 无显式返回。
- `showContainer(container, isVisible=true)` [源码:212](../../eyes/src/ui/components/EventsBlock.js#L212)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `rowClick(clickEvent)` [源码:215](../../eyes/src/ui/components/EventsBlock.js#L215)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resize()` [源码:221](../../eyes/src/ui/components/EventsBlock.js#L221)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/EventsTimeline.js`

航天器事件时间轴、播放和当前事件选择。[源码](../../eyes/src/ui/components/EventsTimeline.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-EventsTimeline-js)

### `EventsTimeline`

时间线分为总览标记与放大 focusPanel 两个坐标空间，各自保存 hover/touch/双击和时间指示线状态。事件按像素间隔与容量聚类，焦点区另做碰撞让位；时间与像素换算必须保留各自 padding 和范围。动画先退出旧簇、重建焦点节点再进入新簇，onfinish 解除 animating 门闩；鼠标和触摸的方向、阈值与延迟提示独立。_setEvents 只复制数组，仍会把传入事件对象的起止值改为 Moment，保留这项原有所有权行为。。父类 `Eyes.BaseComponent`。

- `constructor(app, element, options={})` [源码:17](../../eyes/src/ui/components/EventsTimeline.js#L17)：当前操作：写入 _animations、_events、_localState、_markers、_onFpMouseLeaveDebounced、_onFpTouchMoveThrottled、_onMarkerMouseEnterDebounced、_onMarkerMouseLeaveDebounced、_onTimelineMouseLeaveDebounced、_resizeDebounced、_resizeTimeout、_setEventNameDebounced、_setViewingLineXThrottled、_settings、_showToolTipDebounced、_tooltips、defaultOptions、routeManager；返回 无显式返回。
- `init()` [源码:198](../../eyes/src/ui/components/EventsTimeline.js#L198)：当前操作：写入 _tooltips.timelinebar；返回 无显式返回。
- `_addFpTooltips()` [源码:239](../../eyes/src/ui/components/EventsTimeline.js#L239)：当前操作：写入 _tooltips.focusPanel；返回 void。
- `_createAnimation(element, keyframes, timingOptions)` [源码:273](../../eyes/src/ui/components/EventsTimeline.js#L273)：当前操作：写入 无直接字段写入；返回 new Animation(keyframeEffect,element.ownerDocument.timeline)。
- `_depopulateFocusPanel()` [源码:277](../../eyes/src/ui/components/EventsTimeline.js#L277)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_populateFocusPanel(marker)` [源码:283](../../eyes/src/ui/components/EventsTimeline.js#L283)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_createEventsAndMarkers()` [源码:346](../../eyes/src/ui/components/EventsTimeline.js#L346)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_createEventElement(eventInfo)` [源码:368](../../eyes/src/ui/components/EventsTimeline.js#L368)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_addToCluster(eventInfo, startNewCluster=true)` [源码:381](../../eyes/src/ui/components/EventsTimeline.js#L381)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_createClusterEventLine()` [源码:420](../../eyes/src/ui/components/EventsTimeline.js#L420)：当前操作：写入 _clusterEventLine、_clusterEventLine.className；返回 void。
- `_populate()` [源码:429](../../eyes/src/ui/components/EventsTimeline.js#L429)：当前操作：写入 无直接字段写入；返回 void。
- `_destroy()` [源码:443](../../eyes/src/ui/components/EventsTimeline.js#L443)：当前操作：写入 _markers；返回 无显式返回。
- `_setClickedOnce(stateSection, clickedOnce=true)` [源码:457](../../eyes/src/ui/components/EventsTimeline.js#L457)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onTimelineMouseLeave(mouseEvent)` [源码:474](../../eyes/src/ui/components/EventsTimeline.js#L474)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onTimelineMouseMove(mouseEvent)` [源码:490](../../eyes/src/ui/components/EventsTimeline.js#L490)：当前操作：写入 无直接字段写入；返回 void。
- `_onTimelineClick(clickEvent)` [源码:518](../../eyes/src/ui/components/EventsTimeline.js#L518)：当前操作：写入 无直接字段写入；返回 void。
- `_onMarkerMouseEnter(mouseEvent)` [源码:530](../../eyes/src/ui/components/EventsTimeline.js#L530)：当前操作：写入 无直接字段写入；返回 void。
- `_onMarkerMouseLeave()` [源码:575](../../eyes/src/ui/components/EventsTimeline.js#L575)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onMarkerMouseMove(mouseEvent)` [源码:583](../../eyes/src/ui/components/EventsTimeline.js#L583)：当前操作：写入 无直接字段写入；返回 void。
- `_onFpMouseEnter()` [源码:613](../../eyes/src/ui/components/EventsTimeline.js#L613)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onFpMouseLeave(mouseEvent)` [源码:622](../../eyes/src/ui/components/EventsTimeline.js#L622)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onFpEventMouseOver(mouseEvent)` [源码:625](../../eyes/src/ui/components/EventsTimeline.js#L625)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onFpTicksMouseEnter()` [源码:648](../../eyes/src/ui/components/EventsTimeline.js#L648)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onFpTicksMouseMove(mouseEvent)` [源码:657](../../eyes/src/ui/components/EventsTimeline.js#L657)：当前操作：写入 无直接字段写入；返回 void。
- `_onFpTicksMouseLeave()` [源码:682](../../eyes/src/ui/components/EventsTimeline.js#L682)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onFpTicksClick()` [源码:685](../../eyes/src/ui/components/EventsTimeline.js#L685)：当前操作：写入 无直接字段写入；返回 void。
- `_onViewClick(clickOrEventId)` [源码:698](../../eyes/src/ui/components/EventsTimeline.js#L698)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_zoomIntoCluster(fallbackMarker=null)` [源码:718](../../eyes/src/ui/components/EventsTimeline.js#L718)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_zoomOutOfCluster()` [源码:742](../../eyes/src/ui/components/EventsTimeline.js#L742)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onFpWheel(wheelEvent)` [源码:765](../../eyes/src/ui/components/EventsTimeline.js#L765)：当前操作：写入 无直接字段写入；返回 void、void this._onMarkerMouseEnter({target:adjacentMarker.element,force:true})。
- `_onFpTouchStart(touchEvent)` [源码:800](../../eyes/src/ui/components/EventsTimeline.js#L800)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onFpTouchEnd()` [源码:809](../../eyes/src/ui/components/EventsTimeline.js#L809)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onFpTouchMove(touchEvent)` [源码:816](../../eyes/src/ui/components/EventsTimeline.js#L816)：当前操作：写入 无直接字段写入；返回 void。
- `_onFpTicksTouchStart(touchEvent)` [源码:859](../../eyes/src/ui/components/EventsTimeline.js#L859)：当前操作：写入 无直接字段写入；返回 void、void this.setLocalState({focusPanel:{doubleClick:true}})。
- `_onFpTicksTouchMove(touchEvent)` [源码:910](../../eyes/src/ui/components/EventsTimeline.js#L910)：当前操作：写入 无直接字段写入；返回 void。
- `_onFpTicksTouchEnd(touchEvent)` [源码:943](../../eyes/src/ui/components/EventsTimeline.js#L943)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onMarkerTouch(touchEvent)` [源码:959](../../eyes/src/ui/components/EventsTimeline.js#L959)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onDateTouchStart(touchEvent)` [源码:1003](../../eyes/src/ui/components/EventsTimeline.js#L1003)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onDateTouchEnd()` [源码:1006](../../eyes/src/ui/components/EventsTimeline.js#L1006)：当前操作：写入 无直接字段写入；返回 void。
- `_onFpEventTouch(touchEvent)` [源码:1018](../../eyes/src/ui/components/EventsTimeline.js#L1018)：当前操作：写入 无直接字段写入；返回 void。
- `_onFpArrowClick(clickEvent)` [源码:1030](../../eyes/src/ui/components/EventsTimeline.js#L1030)：当前操作：写入 无直接字段写入；返回 void、void(adjacentMarker?this._onMarkerTouch({target:adjacentMarker.element,touches:[{clientX:movingLeft?timelinebar.width:0}]}):this._resetStates())。
- `_onTimelineTouchStart(touchEvent)` [源码:1062](../../eyes/src/ui/components/EventsTimeline.js#L1062)：当前操作：写入 无直接字段写入；返回 void、void this.setLocalState({timelinebar:{doubleClick:true}})。
- `_onTimelineTouchMove(touchEvent)` [源码:1109](../../eyes/src/ui/components/EventsTimeline.js#L1109)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onTimelineTouchEnd()` [源码:1131](../../eyes/src/ui/components/EventsTimeline.js#L1131)：当前操作：写入 无直接字段写入；返回 void、void this.setLocalState({timelinebar:{doubleClick:false}})。
- `_onOutsideTouch(touchEvent)` [源码:1181](../../eyes/src/ui/components/EventsTimeline.js#L1181)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setResizeTimeout(delayMillis=1e3)` [源码:1184](../../eyes/src/ui/components/EventsTimeline.js#L1184)：当前操作：写入 _resizeTimeout；返回 无显式返回。
- `_onResize()` [源码:1188](../../eyes/src/ui/components/EventsTimeline.js#L1188)：当前操作：写入 _resizeTimeout；返回 无显式返回。
- `resize()` [源码:1213](../../eyes/src/ui/components/EventsTimeline.js#L1213)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_calcEventClusterMax()` [源码:1216](../../eyes/src/ui/components/EventsTimeline.js#L1216)：当前操作：写入 无直接字段写入；返回 Math.max(Math.min(estimatedCapacity,events.clusterMax),events.clusterMin)。
- `_calcMidpointX(startTime, endTime, rangeMinimum=this._options.min, timeRange=this._options.range, timelineWidth=this._localState.timelinebar.width)` [源码:1226](../../eyes/src/ui/components/EventsTimeline.js#L1226)：当前操作：写入 无直接字段写入；返回 this._calcXfromTime(midpointTime,rangeMinimum,timeRange,timelineWidth)。
- `_calcWidthBtwnTimes(startTime, endTime, timeRange=this._options.range, timelineWidth=this._localState.timelinebar.width, minimumWidth=1, maximumWidth=this._options.range, roundPixels=true)` [源码:1230](../../eyes/src/ui/components/EventsTimeline.js#L1230)：当前操作：写入 无直接字段写入；返回 normalizedDuration&&!isNaN(normalizedDuration)?(widthPixels=Math.max(normalizedDuration*timelineWidth,widthPixels),widthPixels=Math.min(widthPixels,maximumWidth),roundPixels?Math.round(widthPixels):widthPixels):null。
- `_calcXfromTime(timeValue, rangeMinimum=this._options.min, timeRange=this._options.range, timelineWidth=this._localState.timelinebar.width, fractionDigits=2)` [源码:1235](../../eyes/src/ui/components/EventsTimeline.js#L1235)：当前操作：写入 无直接字段写入；返回 "string"==typeof formattedPosition?parseFloat(formattedPosition.replace(/,/g,"")):null、null。
- `_calcTimefromTimelineX(timelineX)` [源码:1243](../../eyes/src/ui/components/EventsTimeline.js#L1243)：当前操作：写入 无直接字段写入；返回 getMomentSecondary()(selectedTime)。
- `_calcTimeFromFpX(focusX)` [源码:1251](../../eyes/src/ui/components/EventsTimeline.js#L1251)：当前操作：写入 无直接字段写入；返回 getMomentSecondary()(selectedTime)。
- `_calcRelativeProgress(startValue, endValue, progress)` [源码:1265](../../eyes/src/ui/components/EventsTimeline.js#L1265)：当前操作：写入 无直接字段写入；返回 startValue+progress*(endValue-startValue)。
- `_calcFpEventOffset(marker, eventIndex)` [源码:1268](../../eyes/src/ui/components/EventsTimeline.js#L1268)：当前操作：写入 无直接字段写入；返回 leftOffset-marker.fpEventXs[eventIndex]。
- `_nestedPropsChanged(updates, previousState)` [源码:1274](../../eyes/src/ui/components/EventsTimeline.js#L1274)：当前操作：写入 无直接字段写入；返回 false、true。
- `_showToolTip(tooltipSection="timelinebar")` [源码:1286](../../eyes/src/ui/components/EventsTimeline.js#L1286)：当前操作：写入 无直接字段写入；返回 void。
- `_setTooltipModifiers(tooltip, offsetCallback, arrowPaddingCallback)` [源码:1338](../../eyes/src/ui/components/EventsTimeline.js#L1338)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_resetTooltip()` [源码:1358](../../eyes/src/ui/components/EventsTimeline.js#L1358)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_hideTooltip(resetPendingTooltip=true)` [源码:1362](../../eyes/src/ui/components/EventsTimeline.js#L1362)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_resetStates({hideFocusPanel=true,hideClusterLine=true,hideDate=true}={})` [源码:1366](../../eyes/src/ui/components/EventsTimeline.js#L1366)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setViewingLineX(currentTime)` [源码:1395](../../eyes/src/ui/components/EventsTimeline.js#L1395)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setFpViewingLineStart(viewingLineIsLeft)` [源码:1423](../../eyes/src/ui/components/EventsTimeline.js#L1423)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setClusterEvent(marker, eventIndex)` [源码:1431](../../eyes/src/ui/components/EventsTimeline.js#L1431)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setFpAnimation(previousMarker, nextMarker, selectedEventIndex)` [源码:1448](../../eyes/src/ui/components/EventsTimeline.js#L1448)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getFpViewingLineX(currentTime)` [源码:1530](../../eyes/src/ui/components/EventsTimeline.js#L1530)：当前操作：写入 无直接字段写入；返回 paddedX、null。
- `_getNearestEvent(marker, timelineX)` [源码:1553](../../eyes/src/ui/components/EventsTimeline.js#L1553)：当前操作：写入 无直接字段写入；返回 marker.events[eventIndex]、marker.events[0]。
- `_getNextEventIndexByTime(selectedTime=this._localState.time, marker, movingLeft)` [源码:1560](../../eyes/src/ui/components/EventsTimeline.js#L1560)：当前操作：写入 无直接字段写入；返回 movingLeft?previousEventIndex:previousEventIndex+1。
- `_setDateAndPosition(selectedTime, timelineX)` [源码:1567](../../eyes/src/ui/components/EventsTimeline.js#L1567)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setEventName(eventTitle, eventTime=null)` [源码:1575](../../eyes/src/ui/components/EventsTimeline.js#L1575)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setActive(element, isActive)` [源码:1593](../../eyes/src/ui/components/EventsTimeline.js#L1593)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getNormDistance(previousMarker, nextMarker)` [源码:1596](../../eyes/src/ui/components/EventsTimeline.js#L1596)：当前操作：写入 无直接字段写入；返回 Math.abs(nextMarker.leftX-previousMarker.leftX)/timelinebar.width。
- `_getFpEventsEnterAnim(durationMillis, movingRight, targetOffsetX)` [源码:1602](../../eyes/src/ui/components/EventsTimeline.js#L1602)：当前操作：写入 无直接字段写入；返回 this._createAnimation(this._children.fpContent,keyframes,timingOptions)。
- `_getFpEventsExitAnim(durationMillis, movingRight)` [源码:1618](../../eyes/src/ui/components/EventsTimeline.js#L1618)：当前操作：写入 无直接字段写入；返回 this._createAnimation(this._children.fpContent,keyframes,timingOptions)。
- `_getFpTickAnim(normalizedDistance, durationMillis, movingRight)` [源码:1632](../../eyes/src/ui/components/EventsTimeline.js#L1632)：当前操作：写入 无直接字段写入；返回 this._createAnimation(this._children.fpTicksContainer,keyframes,timingOptions)。
- `_getFpLineAnim(durationMillis)` [源码:1652](../../eyes/src/ui/components/EventsTimeline.js#L1652)：当前操作：写入 无直接字段写入；返回 this._createAnimation(this._children.fpLine,[{opacity:0},{opacity:.6},{opacity:0}],timingOptions)。
- `_setFpEventScaledClass(marker)` [源码:1666](../../eyes/src/ui/components/EventsTimeline.js#L1666)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setClusterLineTransform(timelineX)` [源码:1670](../../eyes/src/ui/components/EventsTimeline.js#L1670)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getMarkerAndIndexFromFocusEl(focusElement)` [源码:1673](../../eyes/src/ui/components/EventsTimeline.js#L1673)：当前操作：写入 无直接字段写入；返回 [marker,eventIndex]、null。
- `_setFpElementActive(marker, activeElement)` [源码:1680](../../eyes/src/ui/components/EventsTimeline.js#L1680)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setFocusPanelPos({leftX:leftX,widthPx:widthPx})` [源码:1688](../../eyes/src/ui/components/EventsTimeline.js#L1688)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setNumOfTicks(contentWidth)` [源码:1726](../../eyes/src/ui/components/EventsTimeline.js#L1726)：当前操作：写入 _children.fpTicks.innerText；返回 无显式返回。
- `_getLastCluster()` [源码:1734](../../eyes/src/ui/components/EventsTimeline.js#L1734)：当前操作：写入 无直接字段写入；返回 marker、null。
- `_setMarkerPositions()` [源码:1741](../../eyes/src/ui/components/EventsTimeline.js#L1741)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getNearestIndex(targetPosition, positions)` [源码:1764](../../eyes/src/ui/components/EventsTimeline.js#L1764)：当前操作：写入 无直接字段写入；返回 positions.indexOf(nearestPosition)。
- `setOptions(optionUpdates, useDefaults=false)` [源码:1768](../../eyes/src/ui/components/EventsTimeline.js#L1768)：当前操作：写入 _options；返回 无显式返回。
- `setLocalState(stateUpdates)` [源码:1772](../../eyes/src/ui/components/EventsTimeline.js#L1772)：当前操作：写入 _localState；返回 无显式返回。
- `_setEvents(events)` [源码:1776](../../eyes/src/ui/components/EventsTimeline.js#L1776)：当前操作：写入 _events；返回 无显式返回。
- `_buildRangeOptions(dateRange)` [源码:1784](../../eyes/src/ui/components/EventsTimeline.js#L1784)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setStartEndDates()` [源码:1799](../../eyes/src/ui/components/EventsTimeline.js#L1799)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_calcCoverage(entityId, {start:start,end:end}={})` [源码:1813](../../eyes/src/ui/components/EventsTimeline.js#L1813)：当前操作：写入 无直接字段写入；返回 {start:min,end:max}。
- `setTarget({id:id,title:title,dates:dates,orderedEvents:orderedEvents})` [源码:1831](../../eyes/src/ui/components/EventsTimeline.js#L1831)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `checkForZoom(eventInfo)` [源码:1850](../../eyes/src/ui/components/EventsTimeline.js#L1850)：当前操作：写入 无直接字段写入；返回 void。
- `show()` [源码:1855](../../eyes/src/ui/components/EventsTimeline.js#L1855)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hide()` [源码:1859](../../eyes/src/ui/components/EventsTimeline.js#L1859)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__disable()` [源码:1862](../../eyes/src/ui/components/EventsTimeline.js#L1862)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `goToTime(selectedTime)` [源码:1866](../../eyes/src/ui/components/EventsTimeline.js#L1866)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `goToEvent(eventId)` [源码:1875](../../eyes/src/ui/components/EventsTimeline.js#L1875)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setTime()` [源码:1882](../../eyes/src/ui/components/EventsTimeline.js#L1882)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `update(currentTime)` [源码:1888](../../eyes/src/ui/components/EventsTimeline.js#L1888)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/ExplorationBlock.js`

对象探索入口内容块。[源码](../../eyes/src/ui/components/ExplorationBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-ExplorationBlock-js)

### `ExplorationBlock`

初始列表和更多列表分别创建节点，更多项带状态占位符；创建完后重新扫描变量绑定，使继承的更多开关能控制这些新节点。。父类 `SolarSystemPublicApi.BaseContentBlock`。

- `constructor(app)` [源码:8](../../eyes/src/ui/components/ExplorationBlock.js#L8)：当前操作：写入 _explorationList；返回 无显式返回。
- `onRouteChange(entityId, explorationInfo, cancelToken)` [源码:12](../../eyes/src/ui/components/ExplorationBlock.js#L12)：当前操作：写入 _explorationList、_explorationList.innerHTML；返回 void this.setEnabled(false)。

## `eyes/src/ui/components/FeaturedEventsBlock.js`

精选事件卡片内容块。[源码](../../eyes/src/ui/components/FeaturedEventsBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-FeaturedEventsBlock-js)

### `FeaturedEventsBlock`

精选事件引用与事件详情分离：首屏从传入 eventsById 取详情，更多列表按原实现读取全局事件表；每项闭包保留独立事件路径。。父类 `SolarSystemPublicApi.BaseContentBlock`。

- `constructor(app)` [源码:10](../../eyes/src/ui/components/FeaturedEventsBlock.js#L10)：当前操作：写入 _featuredEventsList、_more.isHidden.moreMessage；返回 无显式返回。
- `onRouteChange(entityId, entityDescription, eventsById, cancelToken)` [源码:15](../../eyes/src/ui/components/FeaturedEventsBlock.js#L15)：当前操作：写入 _featuredEventsList、_featuredEventsList.innerHTML；返回 无显式返回。

## `eyes/src/ui/components/FeaturedMoonsBlock.js`

精选卫星内容块。[源码](../../eyes/src/ui/components/FeaturedMoonsBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-FeaturedMoonsBlock-js)

### `FeaturedMoonsBlock`

路由取消令牌同时守住整次刷新和逐项 DOM 构建；更多项重新登记模板 class 绑定，以便继承的展开逻辑控制可见性。。父类 `SolarSystemPublicApi.BaseContentBlock`。

- `constructor(...constructorArgs)` [源码:8](../../eyes/src/ui/components/FeaturedMoonsBlock.js#L8)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resize()` [源码:12](../../eyes/src/ui/components/FeaturedMoonsBlock.js#L12)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onRouteChange(entityId, moonLinks, cancelToken)` [源码:19](../../eyes/src/ui/components/FeaturedMoonsBlock.js#L19)：当前操作：写入 _children.featuredMoonsList.innerHTML；返回 无显式返回。
- `_createListElement(moonLink)` [源码:35](../../eyes/src/ui/components/FeaturedMoonsBlock.js#L35)：当前操作：写入 无直接字段写入；返回 listItem。

## `eyes/src/ui/components/FeaturedStoriesPanel.js`

首页精选故事卡片面板。[源码](../../eyes/src/ui/components/FeaturedStoriesPanel.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-FeaturedStoriesPanel-js)

### `FeaturedStoriesPanel`

面板拥有 featuredStoryBlock 和滚动条；路由取消后不启用故事块。显隐同时通知当前视图调整视口，并同步移动展开按钮与可访问标签。。父类 `Eyes.BaseComponent`。

- `constructor(app, options)` [源码:10](../../eyes/src/ui/components/FeaturedStoriesPanel.js#L10)：当前操作：写入 _class.isOpen、_class.isOverlay、_collapseDesktop、_collapseMobile、_components、_currentId、_defaultState、_expandDesktop、_expandMobile、_scrollbar、_state.desktopIconName、_state.mobileIconName、_storyBlock；返回 无显式返回。
- `init()` [源码:45](../../eyes/src/ui/components/FeaturedStoriesPanel.js#L45)：当前操作：写入 _isLandscape、_storyBlock；返回 无显式返回。
- `_onRouteChange()` [源码:58](../../eyes/src/ui/components/FeaturedStoriesPanel.js#L58)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onRouteChange(cancelToken, featuredStories)` [源码:61](../../eyes/src/ui/components/FeaturedStoriesPanel.js#L61)：当前操作：写入 _scrollbar；返回 void。
- `showOverlay()` [源码:70](../../eyes/src/ui/components/FeaturedStoriesPanel.js#L70)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hideOverlay()` [源码:78](../../eyes/src/ui/components/FeaturedStoriesPanel.js#L78)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onClickShowCollapse()` [源码:86](../../eyes/src/ui/components/FeaturedStoriesPanel.js#L86)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `get shouldOffsetRight()` [源码:89](../../eyes/src/ui/components/FeaturedStoriesPanel.js#L89)：当前操作：写入 无直接字段写入；返回 Eyes.AppUtils.isDesktop()。
- `show()` [源码:92](../../eyes/src/ui/components/FeaturedStoriesPanel.js#L92)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hide()` [源码:110](../../eyes/src/ui/components/FeaturedStoriesPanel.js#L110)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `handleLayerToggle(layerName, isVisible)` [源码:128](../../eyes/src/ui/components/FeaturedStoriesPanel.js#L128)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_disableAllComponents()` [源码:131](../../eyes/src/ui/components/FeaturedStoriesPanel.js#L131)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `reset()` [源码:136](../../eyes/src/ui/components/FeaturedStoriesPanel.js#L136)：当前操作：写入 _currentId；返回 无显式返回。
- `__disable()` [源码:140](../../eyes/src/ui/components/FeaturedStoriesPanel.js#L140)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/FeaturedStoryBlock.js`

单个精选故事卡片。[源码](../../eyes/src/ui/components/FeaturedStoryBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-FeaturedStoryBlock-js)

### `FeaturedStoryBlock`

故事卡片支持外部链接、内部路由和故事 id 三种跳转。节点由此块重建，标题和颜色等 class 占位符在创建后登记到基类状态绑定。。父类 `SolarSystemPublicApi.BaseContentBlock`。

- `constructor(app)` [源码:9](../../eyes/src/ui/components/FeaturedStoryBlock.js#L9)：当前操作：写入 _more.isHidden.moreMessage、_storyList；返回 无显式返回。
- `onRouteChange(entityId, blockTitle, stories, cancelToken)` [源码:18](../../eyes/src/ui/components/FeaturedStoryBlock.js#L18)：当前操作：写入 _storyList、_storyList.innerHTML；返回 void this.setEnabled(false)、void。

## `eyes/src/ui/components/FeaturesBlock.js`

对象特征选项列表。[源码](../../eyes/src/ui/components/FeaturesBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-FeaturesBlock-js)

### `FeaturesBlock`

特征定义上挂接的点击函数直接切换引擎 Features 状态；UI 复选框读取同一引擎状态，目标无可用特征时沿父实体查找。。父类 `SolarSystemPublicApi.OptionsBlock`。

- `constructor(app)` [源码:9](../../eyes/src/ui/components/FeaturesBlock.js#L9)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `addFeatures(entityId)` [源码:26](../../eyes/src/ui/components/FeaturesBlock.js#L26)：当前操作：写入 _children.featuresList.innerHTML；返回 无显式返回。
- `onRouteChange(entityInfo)` [源码:48](../../eyes/src/ui/components/FeaturesBlock.js#L48)：当前操作：写入 _defaultTextureDescription、_previousEntity；返回 无显式返回。

## `eyes/src/ui/components/HintBlock.js`

故事提示内容。[源码](../../eyes/src/ui/components/HintBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-HintBlock-js)

### `HintBlock`

提示正文与前后图标来自故事 info；构造时写入模板状态，滚动叙事行为继续由 StoryBaseContentBlock 管理。。父类 `EyesPublicApi.StoryBaseContentBlock`。

- `constructor(app, options={})` [源码:8](../../eyes/src/ui/components/HintBlock.js#L8)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/ImageBlock.js`

故事图像与说明内容。[源码](../../eyes/src/ui/components/ImageBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-ImageBlock-js)

### `ImageBlock`

点击时复制当前图片节点交给共享 overlay；保留原图片在故事布局中的位置，覆盖层拥有副本的挂载位置。。父类 `EyesPublicApi.StoryBaseContentBlock`。

- `onClick()` [源码:8](../../eyes/src/ui/components/ImageBlock.js#L8)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/InfoPanel.js`

辅助对象信息面板。[源码](../../eyes/src/ui/components/InfoPanel.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-InfoPanel-js)

### `InfoPanel`

面板把自身根节点交给共享 overlay 挂载，show/hide 同时协调覆盖层；重复 hide 仅在原面板可见时执行。。父类 `Eyes.BaseComponent`。

- `constructor(app, options={})` [源码:8](../../eyes/src/ui/components/InfoPanel.js#L8)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `openPanel()` [源码:24](../../eyes/src/ui/components/InfoPanel.js#L24)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `closePanel()` [源码:27](../../eyes/src/ui/components/InfoPanel.js#L27)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hide()` [源码:30](../../eyes/src/ui/components/InfoPanel.js#L30)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `show()` [源码:33](../../eyes/src/ui/components/InfoPanel.js#L33)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/InstrumentFOVBlock.js`

仪器视场选项内容块。[源码](../../eyes/src/ui/components/InstrumentFOVBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-InstrumentFOVBlock-js)

### `InstrumentFOVBlock`

仪器配置与实例几何分离，实例属性优先于仪器公共属性。存在 keyframes 的仪器使用三态开关：关闭、覆盖区间、完整视锥；总开关与单仪器互相同步时跳过回调，避免循环触发。。父类 `SolarSystemPublicApi.OptionsBlock`。

- `constructor(app)` [源码:10](../../eyes/src/ui/components/InstrumentFOVBlock.js#L10)：当前操作：写入 _instrumentCheckboxes、_previousEntity、_spacecraft；返回 无显式返回。
- `hasInstrumentsWithFOV(spacecraftId)` [源码:416](../../eyes/src/ui/components/InstrumentFOVBlock.js#L416)：当前操作：写入 无直接字段写入；返回 void 0!==this._spacecraft[spacecraftId]。
- `init()` [源码:419](../../eyes/src/ui/components/InstrumentFOVBlock.js#L419)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onRouteChange(entityInfo, entityName)` [源码:422](../../eyes/src/ui/components/InstrumentFOVBlock.js#L422)：当前操作：写入 _children.instrumentsList.innerHTML、_previousEntity；返回 无显式返回。
- `_addInstrumentOptions(spacecraftId, spacecraftInfo)` [源码:431](../../eyes/src/ui/components/InstrumentFOVBlock.js#L431)：当前操作：写入 _children.instrumentsList.innerHTML；返回 void console.warn(ˋSpacecraft ${spacecraftId} is missing instrumentsˋ)。
- `_toggleFrustums(spacecraftId, instrumentInfo, allEnabled=false)` [源码:498](../../eyes/src/ui/components/InstrumentFOVBlock.js#L498)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `reset()` [源码:533](../../eyes/src/ui/components/InstrumentFOVBlock.js#L533)：当前操作：写入 _instrumentCheckboxes、_triggeredByAllCheckbox、_triggeredByInstrumentCheckbox；返回 无显式返回。
- `__disable()` [源码:538](../../eyes/src/ui/components/InstrumentFOVBlock.js#L538)：当前操作：写入 _previousEntity；返回 无显式返回。

## `eyes/src/ui/components/KioskBase.js`

展陈模式基础界面及计时行为。[源码](../../eyes/src/ui/components/KioskBase.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-KioskBase-js)

### `KioskBase`

会话与空闲分别使用独立 interval，交互时清理并重新启动空闲计时；重置应用等待相机转换再归还实时模式。组件显隐与启用配置分开保存，避免混淆暂时隐藏和停止订阅。。父类 `EyesPublicApi.BaseComponent`。

- `constructor(app, options={})` [源码:10](../../eyes/src/ui/components/KioskBase.js#L10)：当前操作：写入 _router、componentDefaultVisibility、componentEnabledAutoplay、inactivityInterval、sessionInterval、timeOfDaySessionStarted；返回 无显式返回。
- `init()` [源码:37](../../eyes/src/ui/components/KioskBase.js#L37)：当前操作：写入 maxInactivityTime、maxSessionTime；返回 无显式返回。
- `validateQueries()` [源码:57](../../eyes/src/ui/components/KioskBase.js#L57)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_isValidTime(durationValue)` [源码:73](../../eyes/src/ui/components/KioskBase.js#L73)：当前操作：写入 无直接字段写入；返回 ""!==durationValue&&!isNaN(Number(durationValue))&&Number(durationValue)>-1。
- `setEnabled(isEnabled)` [源码:76](../../eyes/src/ui/components/KioskBase.js#L76)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resetLastClicked()` [源码:85](../../eyes/src/ui/components/KioskBase.js#L85)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `sessionStartOverButtonClick()` [源码:88](../../eyes/src/ui/components/KioskBase.js#L88)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onWindowInteract()` [源码:99](../../eyes/src/ui/components/KioskBase.js#L99)：当前操作：写入 inactivityInterval；返回 无显式返回。
- `setUpSessionTimerComponent()` [源码:135](../../eyes/src/ui/components/KioskBase.js#L135)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `startSessionTimer()` [源码:148](../../eyes/src/ui/components/KioskBase.js#L148)：当前操作：写入 sessionInterval、timeOfDaySessionStarted；返回 无显式返回。
- `handleSessionTimer()` [源码:155](../../eyes/src/ui/components/KioskBase.js#L155)：当前操作：写入 timeElapsed；返回 无显式返回。
- `endSession()` [源码:167](../../eyes/src/ui/components/KioskBase.js#L167)：当前操作：写入 sessionInterval；返回 无显式返回。
- `resetSessionTimer()` [源码:184](../../eyes/src/ui/components/KioskBase.js#L184)：当前操作：写入 timeElapsed；返回 无显式返回。
- `updateSessionTimerComponent()` [源码:195](../../eyes/src/ui/components/KioskBase.js#L195)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `startInactivityTimer()` [源码:200](../../eyes/src/ui/components/KioskBase.js#L200)：当前操作：写入 inactivityInterval；返回 无显式返回。
- `handleMaxInactivityTime()` [源码:206](../../eyes/src/ui/components/KioskBase.js#L206)：当前操作：写入 currentTimeWithoutActivity；返回 无显式返回。
- `startAutoplay()` [源码:209](../../eyes/src/ui/components/KioskBase.js#L209)：当前操作：写入 inactivityInterval；返回 无显式返回。
- `resetLayers(layerCategories)` [源码:224](../../eyes/src/ui/components/KioskBase.js#L224)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setComponentsVisibility(visibilityByComponent)` [源码:232](../../eyes/src/ui/components/KioskBase.js#L232)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setComponentsEnabled(enabledByComponent)` [源码:239](../../eyes/src/ui/components/KioskBase.js#L239)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resetApp()` [源码:245](../../eyes/src/ui/components/KioskBase.js#L245)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `isHidden(element)` [源码:262](../../eyes/src/ui/components/KioskBase.js#L262)：当前操作：写入 无直接字段写入；返回 element?.classList.contains("hidden")。

## `eyes/src/ui/components/LayerPanel.js`

图层分组与可见性开关面板。[源码](../../eyes/src/ui/components/LayerPanel.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-LayerPanel-js)

### `LayerPanel`

两种复选框实现共享 layer 管理器事件：NASA eyes 原生 input 与组件 Checkbox。事件回流只同步 UI 状态，程序化 toggle 传 skipCallback 避免再次发出图层切换。。父类 `EyesPublicApi.BaseComponent`。

- `constructor(app, options={})` [源码:8](../../eyes/src/ui/components/LayerPanel.js#L8)：当前操作：写入 _categories、_categoriesDisplay、_eyesCheck、_fadeInBottom、_fadeInRight、_fadeOutBottom、_fadeOutRight、_lastMode；返回 无显式返回。
- `getCategoriesDisplay()` [源码:106](../../eyes/src/ui/components/LayerPanel.js#L106)：当前操作：写入 无直接字段写入；返回 this._categoriesDisplay。
- `resize()` [源码:109](../../eyes/src/ui/components/LayerPanel.js#L109)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `init()` [源码:113](../../eyes/src/ui/components/LayerPanel.js#L113)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_createAnimations()` [源码:169](../../eyes/src/ui/components/LayerPanel.js#L169)：当前操作：写入 _fadeInBottom、_fadeInRight、_fadeOutBottom、_fadeOutRight；返回 无显式返回。
- `_resetAnimations()` [源码:191](../../eyes/src/ui/components/LayerPanel.js#L191)：当前操作：写入 _fadeInBottom.currentTime、_fadeInRight.currentTime、_fadeOutBottom.currentTime、_fadeOutRight.currentTime；返回 无显式返回。
- `toggleLayer(eventOrLayerName)` [源码:201](../../eyes/src/ui/components/LayerPanel.js#L201)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `handleLayerToggle(layerName, isVisible, layerOptions)` [源码:207](../../eyes/src/ui/components/LayerPanel.js#L207)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `isCategoryEnabled(categoryName)` [源码:225](../../eyes/src/ui/components/LayerPanel.js#L225)：当前操作：写入 无直接字段写入；返回 !this._children[categoryName]?.classList.contains("disabled")。
- `setCategoryEnabled(categoryName, isEnabled=true)` [源码:228](../../eyes/src/ui/components/LayerPanel.js#L228)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hide()` [源码:231](../../eyes/src/ui/components/LayerPanel.js#L231)：当前操作：写入 _fadeOutBottom、_fadeOutRight；返回 无显式返回。
- `show()` [源码:242](../../eyes/src/ui/components/LayerPanel.js#L242)：当前操作：写入 _fadeInBottom、_fadeInRight；返回 无显式返回。
- `_updatePosition()` [源码:255](../../eyes/src/ui/components/LayerPanel.js#L255)：当前操作：写入 _lastMode；返回 无显式返回。
- `__enable()` [源码:259](../../eyes/src/ui/components/LayerPanel.js#L259)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__disable()` [源码:263](../../eyes/src/ui/components/LayerPanel.js#L263)：当前操作：写入 _fadeInBottom、_fadeInRight、_fadeOutBottom、_fadeOutRight；返回 无显式返回。

## `eyes/src/ui/components/LayersBlock.js`

对象相关图层选项内容块。[源码](../../eyes/src/ui/components/LayersBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-LayersBlock-js)

### `LayersBlock`

上下文图层工厂闭包保存父实体与卫星组；majorMoons 文本计算也更新 minorMoons 数量。主 spacecraft 图层事件同步 orbiters/landers 等子项，重置时沿用查询与默认可见性优先级。。父类 `SolarSystemPublicApi.OptionsBlock`。

- `constructor(app)` [源码:10](../../eyes/src/ui/components/LayersBlock.js#L10)：当前操作：写入 _defaultLayers、_layers、_previousChildEntity、_previousEntity、_state.numMinorMoons；返回 无显式返回。
- `init()` [源码:112](../../eyes/src/ui/components/LayersBlock.js#L112)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_addLayerOptions(layerOptions)` [源码:120](../../eyes/src/ui/components/LayersBlock.js#L120)：当前操作：写入 _children.layersList.innerHTML；返回 无显式返回。
- `_addDefaultOptions(entityInfo, allowedLayers=null, childEntityInfo={})` [源码:133](../../eyes/src/ui/components/LayersBlock.js#L133)：当前操作：写入 _children.layersList.innerHTML；返回 无显式返回。
- `onRouteChange(entityInfo, entityName, allowedLayers=null, childEntityInfo={})` [源码:165](../../eyes/src/ui/components/LayersBlock.js#L165)：当前操作：写入 _previousChildEntity、_previousEntity；返回 无显式返回。
- `syncSpacecraftLayer(layerName, isVisible, layerOptions)` [源码:188](../../eyes/src/ui/components/LayersBlock.js#L188)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `syncAllLayerCheckboxes()` [源码:198](../../eyes/src/ui/components/LayersBlock.js#L198)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `syncCheckbox(checkbox, layerName, isVisible)` [源码:204](../../eyes/src/ui/components/LayersBlock.js#L204)：当前操作：写入 _app.getManager("layer").getLayer(layerName).visible；返回 无显式返回。
- `reset()` [源码:209](../../eyes/src/ui/components/LayersBlock.js#L209)：当前操作：写入 _components、_defaultLayers；返回 无显式返回。
- `__disable()` [源码:221](../../eyes/src/ui/components/LayersBlock.js#L221)：当前操作：写入 _previousChildEntity、_previousEntity；返回 无显式返回。

## `eyes/src/ui/components/LoadIcon.js`

加载指示器显示与隐藏。[源码](../../eyes/src/ui/components/LoadIcon.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-LoadIcon-js)

### `LoadIcon`

场景 loading/loaded 事件直接映射为显示和隐藏，订阅登记交给 BaseComponent 随组件启停管理。。父类 `EyesPublicApi.BaseComponent`。

- `init()` [源码:8](../../eyes/src/ui/components/LoadIcon.js#L8)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/Menu.js`

主菜单、搜索和导航入口。[源码](../../eyes/src/ui/components/Menu.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-Menu-js)

### `Menu`

菜单缓存分类列表和按首字母分组的 DOM，移动布局把分类列表从主菜单移出再单独挂载。每次切换菜单销毁旧滚动条，跳转条目按外部链接、内部链接、故事与实体分别处理。。父类 `Eyes.BaseComponent`。

- `constructor(app, options={})` [源码:9](../../eyes/src/ui/components/Menu.js#L9)：当前操作：写入 _aToZMenu、_aToZMenu[categoryName]、_backFunction、_categories、_listMenu、_listMenuContainer、_listMenuContainer[categoryName]、_listMenu[categoryName]、_scrollbar；返回 无显式返回。
- `handleBackButton()` [源码:33](../../eyes/src/ui/components/Menu.js#L33)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `init()` [源码:36](../../eyes/src/ui/components/Menu.js#L36)：当前操作：写入 _children.backButton；返回 无显式返回。
- `resize()` [源码:42](../../eyes/src/ui/components/Menu.js#L42)：当前操作：写入 _backFunction；返回 无显式返回。
- `setupAtoZ(categoryInfo)` [源码:66](../../eyes/src/ui/components/Menu.js#L66)：当前操作：写入 _aToZMenu[categoryInfo.id]；返回 无显式返回。
- `_goToMain()` [源码:138](../../eyes/src/ui/components/Menu.js#L138)：当前操作：写入 _scrollbar；返回 无显式返回。
- `_goToList()` [源码:149](../../eyes/src/ui/components/Menu.js#L149)：当前操作：写入 _backFunction、_scrollbar；返回 无显式返回。
- `_goToAtoZ()` [源码:163](../../eyes/src/ui/components/Menu.js#L163)：当前操作：写入 _backFunction、_scrollbar；返回 无显式返回。
- `clickOnEntry(entryInfo)` [源码:177](../../eyes/src/ui/components/Menu.js#L177)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_initScrollbar()` [源码:183](../../eyes/src/ui/components/Menu.js#L183)：当前操作：写入 _scrollbar；返回 无显式返回。
- `show()` [源码:186](../../eyes/src/ui/components/Menu.js#L186)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hide()` [源码:190](../../eyes/src/ui/components/Menu.js#L190)：当前操作：写入 _scrollbar；返回 无显式返回。
- `updateMenuContent()` [源码:194](../../eyes/src/ui/components/Menu.js#L194)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setupContent(contentInfo, featuredStories, featuredPlanets, featuredAsteroids, featuredComets, featuredSpacecraft)` [源码:228](../../eyes/src/ui/components/Menu.js#L228)：当前操作：写入 _children.mainMenu.innerHTML、_contentInfo、_listMenuContainer[categoryInfos[categoryIndex].id]、_listMenu[categoryInfos[categoryIndex].id]；返回 无显式返回。

## `eyes/src/ui/components/MobileExpandButton.js`

移动端展开目标内容面板的按钮。[源码](../../eyes/src/ui/components/MobileExpandButton.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-MobileExpandButton-js)

### `MobileExpandButton`

按钮保存当前内容组件名，点击后调用该组件的展开接口并隐藏自身；桌面环境会强制抑制移动展开按钮。。父类 `Eyes.BaseComponent`。

- `constructor(app)` [源码:10](../../eyes/src/ui/components/MobileExpandButton.js#L10)：当前操作：写入 _component、_expandButtonClicked、showCPButton；返回 无显式返回。
- `init()` [源码:22](../../eyes/src/ui/components/MobileExpandButton.js#L22)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_expandButtonClicked()` [源码:29](../../eyes/src/ui/components/MobileExpandButton.js#L29)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `showCPButton(shouldShow, component)` [源码:33](../../eyes/src/ui/components/MobileExpandButton.js#L33)：当前操作：写入 _component；返回 无显式返回。

## `eyes/src/ui/components/Overlay.js`

遮罩显示和关闭交互。[源码](../../eyes/src/ui/components/Overlay.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-Overlay-js)

### `Overlay`

覆盖层持有当前内容节点，替换内容时更新同一状态引用；动画结束后才将隐藏覆盖层 display 置为 none，重新显示前恢复 display。。父类 `EyesPublicApi.BaseComponent`。

- `constructor(app, options={})` [源码:9](../../eyes/src/ui/components/Overlay.js#L9)：当前操作：写入 _class.isOpenButtonVisibleClass、_scrollbar；返回 无显式返回。
- `init()` [源码:25](../../eyes/src/ui/components/Overlay.js#L25)：当前操作：写入 _children.overlay.style.display；返回 无显式返回。
- `setContent(contentElement)` [源码:33](../../eyes/src/ui/components/Overlay.js#L33)：当前操作：写入 _state.content；返回 无显式返回。
- `show()` [源码:37](../../eyes/src/ui/components/Overlay.js#L37)：当前操作：写入 _children.overlay.style.display；返回 无显式返回。
- `__enable()` [源码:42](../../eyes/src/ui/components/Overlay.js#L42)：当前操作：写入 _scrollbar；返回 无显式返回。

## `eyes/src/ui/components/OverviewBlock.js`

对象概览内容块。[源码](../../eyes/src/ui/components/OverviewBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-OverviewBlock-js)

### `OverviewBlock`

概览将实体/事件信息与描述日期合并成模板状态；通用模型免责声明取引擎当前模型 URL，返回按钮监听在实体就绪后挂接。。父类 `SolarSystemPublicApi.BaseContentBlock`。

- `constructor(app)` [源码:12](../../eyes/src/ui/components/OverviewBlock.js#L12)：当前操作：写入 _more.isHidden.moreMessage；返回 无显式返回。
- `goBack()` [源码:33](../../eyes/src/ui/components/OverviewBlock.js#L33)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onRouteChange(targetId, suppliedInfo, entityDescription)` [源码:38](../../eyes/src/ui/components/OverviewBlock.js#L38)：当前操作：写入 _targetId；返回 无显式返回。
- `_determineOverviewContent(entityId, entityInfo, entityDescription)` [源码:89](../../eyes/src/ui/components/OverviewBlock.js#L89)：当前操作：写入 无直接字段写入；返回 {title:title,subHeadingString:subheading,missionStartDate:missionStart,missionEndDate:missionEnd}。
- `_getSubheadingForObject(entityId, overviewInfo, entityDescription)` [源码:101](../../eyes/src/ui/components/OverviewBlock.js#L101)：当前操作：写入 无直接字段写入；返回 getUnidentified777()(overviewInfo.start).format("MMM DD, YYYY")、""、subheading。

## `eyes/src/ui/components/RelatedBlock.js`

相关对象链接内容块。[源码](../../eyes/src/ui/components/RelatedBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-RelatedBlock-js)

### `RelatedBlock`

相关对象列表按目录分类生成形状；故事卡片可跳外部、内部或故事路由。内部链接等待场景与相机完成后才选择内容标签页。。父类 `SolarSystemPublicApi.BaseContentBlock`。

- `constructor(app)` [源码:9](../../eyes/src/ui/components/RelatedBlock.js#L9)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onRouteChange(sectionTitle, relatedEntityIds, relatedStories, cancelToken)` [源码:18](../../eyes/src/ui/components/RelatedBlock.js#L18)：当前操作：写入 _children.relatedList.innerHTML；返回 无显式返回。
- `populateStoryCard(stories)` [源码:49](../../eyes/src/ui/components/RelatedBlock.js#L49)：当前操作：写入 _storyList、_storyList.innerHTML；返回 void this.setEnabled(false)。
- `resize()` [源码:116](../../eyes/src/ui/components/RelatedBlock.js#L116)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/ReplayBlock.js`

对象事件重播控件。[源码](../../eyes/src/ui/components/ReplayBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-ReplayBlock-js)

### `ReplayBlock`

事件时间滑块持有起止 Date，时间 update 订阅反向同步进度；拖动结束恢复播放，接近终点暂停并切换重播图标。时钟组件重新挂到本块容器。。父类 `SolarSystemPublicApi.BaseContentBlock`。

- `constructor(app)` [源码:9](../../eyes/src/ui/components/ReplayBlock.js#L9)：当前操作：写入 _app、_isPlaying；返回 无显式返回。
- `init()` [源码:27](../../eyes/src/ui/components/ReplayBlock.js#L27)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onRouteChange(objectId, eventId, eventInfo, orderedEvents, cancelToken)` [源码:35](../../eyes/src/ui/components/ReplayBlock.js#L35)：当前操作：写入 _currentEvent、_eventEndTime、_eventStartTime、_nextEventId、_objectId、_prevEventId；返回 void。
- `_addTimeToDate(elapsedMillis)` [源码:70](../../eyes/src/ui/components/ReplayBlock.js#L70)：当前操作：写入 无直接字段写入；返回 date。
- `_onSliderMove(inputEvent)` [源码:77](../../eyes/src/ui/components/ReplayBlock.js#L77)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `update(currentTime)` [源码:86](../../eyes/src/ui/components/ReplayBlock.js#L86)：当前操作：写入 _isAtEnd；返回 无显式返回。
- `setUpEventTimeControls()` [源码:103](../../eyes/src/ui/components/ReplayBlock.js#L103)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `prevButtonClicked()` [源码:115](../../eyes/src/ui/components/ReplayBlock.js#L115)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `nextButtonClicked()` [源码:118](../../eyes/src/ui/components/ReplayBlock.js#L118)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_pauseEvent()` [源码:121](../../eyes/src/ui/components/ReplayBlock.js#L121)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_playEvent()` [源码:127](../../eyes/src/ui/components/ReplayBlock.js#L127)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `playPauseEvent()` [源码:133](../../eyes/src/ui/components/ReplayBlock.js#L133)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/ReplayButtonBlock.js`

故事内重播按钮。[源码](../../eyes/src/ui/components/ReplayButtonBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-ReplayButtonBlock-js)

### `ReplayButtonBlock`

fromStart 决定重新导航到故事入口还是重载当前路由，按钮文字也沿用同一故事配置，避免两种重播语义混淆。。父类 `EyesPublicApi.StoryBaseContentBlock`。

- `init()` [源码:8](../../eyes/src/ui/components/ReplayButtonBlock.js#L8)：当前操作：写入 _config.info.text；返回 无显式返回。
- `onClick()` [源码:12](../../eyes/src/ui/components/ReplayButtonBlock.js#L12)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/Search.js`

搜索输入、建议结果和选择导航。[源码](../../eyes/src/ui/components/Search.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-Search-js)

### `Search`

输入防抖后由 search 管理器返回匹配，低分结果和建议分开渲染；结果数组同时保存链接与 DOM，供键盘与悬停共享选择索引。单结果详情失败为 404 时回退列表，相关故事/事件等块继续加入同一导航序列。。父类 `EyesPublicApi.BaseComponent`。

- `constructor(app, options={config:{}})` [源码:8](../../eyes/src/ui/components/Search.js#L8)：当前操作：写入 _class.isItemVisible、_excludeResults、_featuredScrollbar、_resultsScrollbar、_suggestionsThreshold、index、onResize、results；返回 无显式返回。
- `init()` [源码:60](../../eyes/src/ui/components/Search.js#L60)：当前操作：写入 _children.input.onkeyup、_children.input.style.minWidth；返回 无显式返回。
- `onIconClick()` [源码:77](../../eyes/src/ui/components/Search.js#L77)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resize()` [源码:80](../../eyes/src/ui/components/Search.js#L80)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `reset()` [源码:84](../../eyes/src/ui/components/Search.js#L84)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `keydown(keyEvent)` [源码:88](../../eyes/src/ui/components/Search.js#L88)：当前操作：写入 index；返回 无显式返回。
- `setSelected(index)` [源码:94](../../eyes/src/ui/components/Search.js#L94)：当前操作：写入 index；返回 无显式返回。
- `onInputFocus()` [源码:101](../../eyes/src/ui/components/Search.js#L101)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `eraseInput()` [源码:106](../../eyes/src/ui/components/Search.js#L106)：当前操作：写入 _children.input.value、_children.results.innerHTML、_resultsScrollbar；返回 无显式返回。
- `registerManager(searchManager)` [源码:112](../../eyes/src/ui/components/Search.js#L112)：当前操作：写入 _searchManager；返回 无显式返回。
- `_find(inputEvent, searchText)` [源码:115](../../eyes/src/ui/components/Search.js#L115)：当前操作：写入 _searchTimeout；返回 无显式返回。
- `renderResults(matches, searchString)` [源码:131](../../eyes/src/ui/components/Search.js#L131)：当前操作：写入 _children.results.innerHTML、_resultsScrollbar、_searchString、index、results；返回 void。
- `_renderResultCard(match, searchText)` [源码:165](../../eyes/src/ui/components/Search.js#L165)：当前操作：写入 _children.results.innerHTML；返回 无显式返回。
- `_createEventsBlock(featuredEvents, entityId)` [源码:213](../../eyes/src/ui/components/Search.js#L213)：当前操作：写入 无直接字段写入；返回 void。
- `_createMoonsBlock(moonEntries)` [源码:231](../../eyes/src/ui/components/Search.js#L231)：当前操作：写入 无直接字段写入；返回 void。
- `_createExplorationBlock(explorationLinks)` [源码:246](../../eyes/src/ui/components/Search.js#L246)：当前操作：写入 无直接字段写入；返回 void。
- `_createStoryBlock(storyCards)` [源码:263](../../eyes/src/ui/components/Search.js#L263)：当前操作：写入 无直接字段写入；返回 void。
- `_createBlockContainer()` [源码:285](../../eyes/src/ui/components/Search.js#L285)：当前操作：写入 无直接字段写入；返回 blockElement。
- `_createHeaderBlock(headerText, blockElement)` [源码:291](../../eyes/src/ui/components/Search.js#L291)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_createSingleResult(resultTitle, resultLink, parentElement)` [源码:300](../../eyes/src/ui/components/Search.js#L300)：当前操作：写入 无直接字段写入；返回 resultElement。
- `_renderResultList(matches, searchText)` [源码:318](../../eyes/src/ui/components/Search.js#L318)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_renderSuggestions(suggestions, searchText)` [源码:354](../../eyes/src/ui/components/Search.js#L354)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `open()` [源码:399](../../eyes/src/ui/components/Search.js#L399)：当前操作：写入 app.isSearching；返回 无显式返回。
- `close()` [源码:411](../../eyes/src/ui/components/Search.js#L411)：当前操作：写入 app.isSearching；返回 无显式返回。
- `setupFeaturedSuggestion(suggestions=[])` [源码:428](../../eyes/src/ui/components/Search.js#L428)：当前操作：写入 _children.featured.innerHTML；返回 无显式返回。
- `_createScrollbar(scrollElement)` [源码:445](../../eyes/src/ui/components/Search.js#L445)：当前操作：写入 无直接字段写入；返回 EyesPublicApi.AppUtils.addScrollbar(scrollElement,{sizeAutoCapable:true})。
- `_getLink(link)` [源码:450](../../eyes/src/ui/components/Search.js#L450)：当前操作：写入 无直接字段写入；返回 link。
- `_handleClick(selectedLink, searchText)` [源码:453](../../eyes/src/ui/components/Search.js#L453)：当前操作：写入 无直接字段写入；返回 void。
- `simulate(searchText)` [源码:472](../../eyes/src/ui/components/Search.js#L472)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getDetails(match)` [源码:481](../../eyes/src/ui/components/Search.js#L481)：当前操作：写入 无直接字段写入；返回 this._app.getManager("content").getEntityDesc(match.item.id)。
- `setExcludeResults(excludeResults)` [源码:484](../../eyes/src/ui/components/Search.js#L484)：当前操作：写入 _excludeResults；返回 无显式返回。
- `__enable()` [源码:487](../../eyes/src/ui/components/Search.js#L487)：当前操作：写入 _featuredScrollbar；返回 无显式返回。

## `eyes/src/ui/components/Settings.js`

单位、图层等用户设置的交互界面。[源码](../../eyes/src/ui/components/Settings.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-Settings-js)

### `Settings`

能力配置与按钮状态分离：视图可临时替换 zoom 回调和显示能力，方向规则按设备顺序匹配。长按缩放先等待阈值再开启 interval，松开重置持续缩放标记；光照同时同步常规相机与比较管理器。。父类 `EyesPublicApi.BaseComponent`。

- `constructor(app, options={})` [源码:11](../../eyes/src/ui/components/Settings.js#L11)：当前操作：写入 _fullLightColor、_isContinuousZoom、_isHorizontal、_isMobileMode、_isMouseHold、_ori、_shadowLightColor、_tooltips、_zoomInterval、_zoomTimeout；返回 无显式返回。
- `init()` [源码:150](../../eyes/src/ui/components/Settings.js#L150)：当前操作：写入 _children.flood.onclick、_children.natural.onclick、_children.shadow.onclick；返回 无显式返回。
- `addTooltips(elements, tooltipOptions)` [源码:229](../../eyes/src/ui/components/Settings.js#L229)：当前操作：写入 无直接字段写入；返回 1===tooltipInstances.length?tooltipInstances[0]:tooltipInstances。
- `updateTooltips(isHorizontal)` [源码:237](../../eyes/src/ui/components/Settings.js#L237)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setConfig(configUpdates)` [源码:240](../../eyes/src/ui/components/Settings.js#L240)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getOrientation()` [源码:267](../../eyes/src/ui/components/Settings.js#L267)：当前操作：写入 无直接字段写入；返回 this._ori。
- `setOrientation(ori="")` [源码:270](../../eyes/src/ui/components/Settings.js#L270)：当前操作：写入 _ori；返回 无显式返回。
- `isHorizontal()` [源码:273](../../eyes/src/ui/components/Settings.js#L273)：当前操作：写入 无直接字段写入；返回 "horizontal"===this._ori、"horizontal"===orientationRule.ori、false。
- `_updateSize(forceUpdate=false)` [源码:281](../../eyes/src/ui/components/Settings.js#L281)：当前操作：写入 _element.style.height、_element.style.width、_isHorizontal；返回 void。
- `_zoomContinuously(zoomCallback)` [源码:292](../../eyes/src/ui/components/Settings.js#L292)：当前操作：写入 _isContinuousZoom、_isMouseHold、_zoomInterval、_zoomTimeout；返回 无显式返回。
- `_zoomIn(startContinuous=false)` [源码:301](../../eyes/src/ui/components/Settings.js#L301)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_zoomOut(startContinuous=false)` [源码:304](../../eyes/src/ui/components/Settings.js#L304)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_stopZooming()` [源码:307](../../eyes/src/ui/components/Settings.js#L307)：当前操作：写入 _isContinuousZoom、_isMouseHold；返回 无显式返回。
- `show()` [源码:312](../../eyes/src/ui/components/Settings.js#L312)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hide()` [源码:318](../../eyes/src/ui/components/Settings.js#L318)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `isVisible()` [源码:325](../../eyes/src/ui/components/Settings.js#L325)：当前操作：写入 无直接字段写入；返回 this._state.isVisible。
- `expand()` [源码:328](../../eyes/src/ui/components/Settings.js#L328)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `collapse()` [源码:334](../../eyes/src/ui/components/Settings.js#L334)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleCollapse()` [源码:341](../../eyes/src/ui/components/Settings.js#L341)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleUnit()` [源码:345](../../eyes/src/ui/components/Settings.js#L345)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleFullscreen()` [源码:354](../../eyes/src/ui/components/Settings.js#L354)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleLayers()` [源码:357](../../eyes/src/ui/components/Settings.js#L357)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `togglePhotoMode()` [源码:360](../../eyes/src/ui/components/Settings.js#L360)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hideLightingOptions(pointerEvent)` [源码:370](../../eyes/src/ui/components/Settings.js#L370)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hideFullScreenOption()` [源码:377](../../eyes/src/ui/components/Settings.js#L377)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleLightOptions(lightType)` [源码:382](../../eyes/src/ui/components/Settings.js#L382)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleLight()` [源码:393](../../eyes/src/ui/components/Settings.js#L393)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `startGuidedCamera()` [源码:399](../../eyes/src/ui/components/Settings.js#L399)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `stopGuidedCamera()` [源码:405](../../eyes/src/ui/components/Settings.js#L405)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleGuidedCamera()` [源码:411](../../eyes/src/ui/components/Settings.js#L411)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleInfoPanel()` [源码:414](../../eyes/src/ui/components/Settings.js#L414)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resize()` [源码:417](../../eyes/src/ui/components/Settings.js#L417)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/ShareModal.js`

分享 URL、嵌入设置和复制界面。[源码](../../eyes/src/ui/components/ShareModal.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-ShareModal-js)

### `ShareModal`

分享源 URL 先过滤非保留查询，嵌入选项再按默认值与依赖条件生成最终参数。预览强制 tracking=false，iframe hash 变化只更新代码而不重建预览；更换预览 iframe 前解除旧 load 监听。表单 DOM 与帮助提示归此组件持有。。父类 `EyesPublicApi.BaseComponent`。

- `constructor(app, options)` [源码:11](../../eyes/src/ui/components/ShareModal.js#L11)：当前操作：写入 _activeTab、_embedOptionsScrollbar、_embedQueries、_inputElements、_srcURL、_tippyItems、_tippySingleton、_tippyTimeout；返回 无显式返回。
- `mergeEmbedControls()` [源码:59](../../eyes/src/ui/components/ShareModal.js#L59)：当前操作：写入 _config.embedOptions；返回 无显式返回。
- `init()` [源码:90](../../eyes/src/ui/components/ShareModal.js#L90)：当前操作：写入 _tippyTimeout；返回 无显式返回。
- `createScrollbars()` [源码:125](../../eyes/src/ui/components/ShareModal.js#L125)：当前操作：写入 _embedOptionsScrollbar；返回 无显式返回。
- `getCurrentDevice()` [源码:134](../../eyes/src/ui/components/ShareModal.js#L134)：当前操作：写入 无直接字段写入；返回 EyesPublicApi.AppUtils.isTablet()?"tablet":EyesPublicApi.AppUtils.isMobile()?"phone":"desktop"。
- `createShareButton()` [源码:137](../../eyes/src/ui/components/ShareModal.js#L137)：当前操作：写入 shareButton、shareButton.className、shareButton.innerText；返回 无显式返回。
- `setIsWide()` [源码:175](../../eyes/src/ui/components/ShareModal.js#L175)：当前操作：写入 无直接字段写入；返回 isWide!==shouldBeWide&&(this.setState({isWide:shouldBeWide}),true)。
- `addShareButtonToParent()` [源码:190](../../eyes/src/ui/components/ShareModal.js#L190)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setSrcURL(sourceUrl=window.location.href, updateLinkText=true)` [源码:205](../../eyes/src/ui/components/ShareModal.js#L205)：当前操作：写入 _srcURL；返回 无显式返回。
- `setEmbedParams()` [源码:231](../../eyes/src/ui/components/ShareModal.js#L231)：当前操作：写入 _embedQueries[nestedQueryName]、_embedQueries[query]；返回 无显式返回。
- `updateEmbedParams(queryName, queryValue)` [源码:259](../../eyes/src/ui/components/ShareModal.js#L259)：当前操作：写入 _embedQueries[queryName]；返回 无显式返回。
- `updateEmbedCode(updateOptions)` [源码:262](../../eyes/src/ui/components/ShareModal.js#L262)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `calcTemplateWidth()` [源码:311](../../eyes/src/ui/components/ShareModal.js#L311)：当前操作：写入 无直接字段写入；返回 void。
- `calcIframeTransform()` [源码:331](../../eyes/src/ui/components/ShareModal.js#L331)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_iframeLoadEventListener(loadEvent)` [源码:342](../../eyes/src/ui/components/ShareModal.js#L342)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `calcIframeTransforms()` [源码:353](../../eyes/src/ui/components/ShareModal.js#L353)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setPreviewDevice(changeEvent)` [源码:385](../../eyes/src/ui/components/ShareModal.js#L385)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleIframeElements(changeEvent)` [源码:398](../../eyes/src/ui/components/ShareModal.js#L398)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getEmbedCodeFromParams()` [源码:409](../../eyes/src/ui/components/ShareModal.js#L409)：当前操作：写入 无直接字段写入；返回 {srcURL:embedUrl,iframeString:ˋ<iframe src="${embedUrl}" allowfullscreen ></iframe>ˋ,noTrackingIframeString:ˋ<iframe src="${ˋ${urlParts[0]}${previewParams.size?"?":""}${previewParams.toString()}ˋ}" allowfullscreen ></ifr。
- `generateEmbedContent()` [源码:445](../../eyes/src/ui/components/ShareModal.js#L445)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `createGroupLegend(groupName, groupElement)` [源码:466](../../eyes/src/ui/components/ShareModal.js#L466)：当前操作：写入 无直接字段写入；返回 legendElement。
- `createGroupInputs(inputOptions, groupElement)` [源码:472](../../eyes/src/ui/components/ShareModal.js#L472)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `destroyEmbedContent()` [源码:592](../../eyes/src/ui/components/ShareModal.js#L592)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setActiveTab(activeTab)` [源码:600](../../eyes/src/ui/components/ShareModal.js#L600)：当前操作：写入 _activeTab、_tippyItems、_tippySingleton；返回 无显式返回。
- `copyToClipboard(clickEvent)` [源码:618](../../eyes/src/ui/components/ShareModal.js#L618)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `handleClick(clickEvent)` [源码:630](../../eyes/src/ui/components/ShareModal.js#L630)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `handleTabClick(clickEvent)` [源码:637](../../eyes/src/ui/components/ShareModal.js#L637)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `destroyTooltips()` [源码:641](../../eyes/src/ui/components/ShareModal.js#L641)：当前操作：写入 _tippyItems、_tippySingleton；返回 无显式返回。
- `resetEmbedOptions()` [源码:646](../../eyes/src/ui/components/ShareModal.js#L646)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resetScrollbar()` [源码:651](../../eyes/src/ui/components/ShareModal.js#L651)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resize()` [源码:654](../../eyes/src/ui/components/ShareModal.js#L654)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setEnabled(isEnabled)` [源码:658](../../eyes/src/ui/components/ShareModal.js#L658)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `__destroy()` [源码:663](../../eyes/src/ui/components/ShareModal.js#L663)：当前操作：写入 shareButton；返回 无显式返回。

## `eyes/src/ui/components/SpecialFeaturesBlock.js`

对象特殊功能入口。[源码](../../eyes/src/ui/components/SpecialFeaturesBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-SpecialFeaturesBlock-js)

### `SpecialFeaturesBlock`

可用工具列表由实体能力生成，已着陆对象隐藏此块；各条目拥有独立查询和导航选项，距离工具保留时间。。父类 `SolarSystemPublicApi.BaseContentBlock`。

- `constructor(app, options)` [源码:10](../../eyes/src/ui/components/SpecialFeaturesBlock.js#L10)：当前操作：写入 _state；返回 无显式返回。
- `init()` [源码:17](../../eyes/src/ui/components/SpecialFeaturesBlock.js#L17)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onRouteChange(entityInfo)` [源码:21](../../eyes/src/ui/components/SpecialFeaturesBlock.js#L21)：当前操作：写入 _children.specialFeatures.innerHTML；返回 void this.hide()、void。

## `eyes/src/ui/components/SurfaceMapBlock.js`

对象表面地图选择。[源码](../../eyes/src/ui/components/SurfaceMapBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-SurfaceMapBlock-js)

### `SurfaceMapBlock`

表面地图选项向 layer 管理器提交地图描述，并发出 surfaceMapEnabled 供 HD 开关同步。默认地图另保留原贴图信息；火星默认项恢复 CMTS，其余对象切回默认纹理。。父类 `SolarSystemPublicApi.OptionsBlock`。

- `constructor(app)` [源码:10](../../eyes/src/ui/components/SurfaceMapBlock.js#L10)：当前操作：写入 _currentlyCheckedOption、_defaultTextureDescription、_previousChildEntity、_previousEntity；返回 无显式返回。
- `onRouteChange(entityInfo, entityName, cancelToken=null, childEntityInfo={}, featureRoute=null)` [源码:39](../../eyes/src/ui/components/SurfaceMapBlock.js#L39)：当前操作：写入 _currentLayer、_currentlyCheckedOption、_previousChildEntity、_previousEntity；返回 无显式返回。
- `addSurfaceMaps(entityId)` [源码:58](../../eyes/src/ui/components/SurfaceMapBlock.js#L58)：当前操作：写入 _children.surfaceMapList.innerHTML、_currentlyCheckedOption；返回 无显式返回。
- `_createDefaultRadioButton(entityId)` [源码:90](../../eyes/src/ui/components/SurfaceMapBlock.js#L90)：当前操作：写入 _currentlyCheckedOption；返回 无显式返回。
- `addDefaultTexture(entityId)` [源码:125](../../eyes/src/ui/components/SurfaceMapBlock.js#L125)：当前操作：写入 _defaultTextureDescription、_defaultTextureType；返回 无显式返回。
- `resize()` [源码:132](../../eyes/src/ui/components/SurfaceMapBlock.js#L132)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `reset()` [源码:138](../../eyes/src/ui/components/SurfaceMapBlock.js#L138)：当前操作：写入 _defaultTextureDescription；返回 无显式返回。
- `__disable()` [源码:146](../../eyes/src/ui/components/SurfaceMapBlock.js#L146)：当前操作：写入 _previousChildEntity、_previousEntity；返回 无显式返回。

## `eyes/src/ui/components/Telescope.js`

望远镜观察目标、视场和相机控制。[源码](../../eyes/src/ui/components/Telescope.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-Telescope-js)

### `Telescope`

进入望远镜模式临时接管对象点击、光照与表面地图，退出归还原状态并清理拾取控制器和方位角计时器。拾取位置先逆旋转到目标局部坐标，再换算经纬度写入标记与路由。。父类 `Eyes.BaseComponent`。

- `constructor(app, options={})` [源码:12](../../eyes/src/ui/components/Telescope.js#L12)：当前操作：写入 _firstLoad、_target、_targetEntity、helper、latitude、longitude；返回 无显式返回。
- `resize()` [源码:39](../../eyes/src/ui/components/Telescope.js#L39)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onEnter(routeParams)` [源码:43](../../eyes/src/ui/components/Telescope.js#L43)：当前操作：写入 lightType；返回 无显式返回。
- `onRouteChange(routeParams)` [源码:59](../../eyes/src/ui/components/Telescope.js#L59)：当前操作：写入 _firstLoad、_target、_targetEntity、helper、lyrManager、orbiterVisibility；返回 void。
- `onLeave()` [源码:70](../../eyes/src/ui/components/Telescope.js#L70)：当前操作：写入 helper；返回 无显式返回。
- `exitTelescope()` [源码:87](../../eyes/src/ui/components/Telescope.js#L87)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `processQuery(queryParams)` [源码:90](../../eyes/src/ui/components/Telescope.js#L90)：当前操作：写入 _firstLoad、_placemarkEl.innerHTML、latitude、longitude；返回 无显式返回。
- `checkPlatform()` [源码:103](../../eyes/src/ui/components/Telescope.js#L103)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setView(isSurfaceView)` [源码:109](../../eyes/src/ui/components/Telescope.js#L109)：当前操作：写入 _firstLoad、_pickController、_placemarkEl.innerHTML、azimathelevationInterval、latitude、longitude、position；返回 无显式返回。
- `exitSurfaceMode()` [源码:149](../../eyes/src/ui/components/Telescope.js#L149)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleConstellation(allowToggle=true)` [源码:154](../../eyes/src/ui/components/Telescope.js#L154)：当前操作：写入 constellations；返回 无显式返回。
- `latitudeInputChange(inputEvent)` [源码:161](../../eyes/src/ui/components/Telescope.js#L161)：当前操作：写入 latitude；返回 无显式返回。
- `longitudeInputChange(inputEvent)` [源码:166](../../eyes/src/ui/components/Telescope.js#L166)：当前操作：写入 longitude；返回 无显式返回。
- `validateLatLong()` [源码:171](../../eyes/src/ui/components/Telescope.js#L171)：当前操作：写入 无直接字段写入；返回 null===this.latitude\|\|void 0===this.latitude\|\|isNaN(this.latitude)\|\|Math.abs(this.latitude)>90?(this._children.latitude.classList.add("error"),false):!(null===this.longitude\|\|void 0===this.longitude\|\|isNaN(this.longitude。
- `goSurfaceViewClick(clickEvent)` [源码:176](../../eyes/src/ui/components/Telescope.js#L176)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_toggleSurfaceMaps(enableSurfaceMaps, entityId=this._target)` [源码:184](../../eyes/src/ui/components/Telescope.js#L184)：当前操作：写入 无直接字段写入；返回 void。
- `addPickLocation(latitude, longitude)` [源码:211](../../eyes/src/ui/components/Telescope.js#L211)：当前操作：写入 _placemarkEl、_placemarkEl.id、_placemarkEl.innerHTML；返回 无显式返回。
- `setLatitudeLongitude(latitude, longitude)` [源码:232](../../eyes/src/ui/components/Telescope.js#L232)：当前操作：写入 _children.latitude.value、_children.longitude.value；返回 void。
- `showCoordinateInputTip()` [源码:243](../../eyes/src/ui/components/Telescope.js#L243)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/TextureQualityBlock.js`

对象纹理质量选择。[源码](../../eyes/src/ui/components/TextureQualityBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-TextureQualityBlock-js)

### `TextureQualityBlock`

HD 开关依赖 scene 管理器的实际纹理状态，并受 surfaceMapEnabled 事件协调；URL 配置只在对应选项存在时应用。目标切换会重置旧选项上下文。。父类 `SolarSystemPublicApi.OptionsBlock`。

- `constructor(app)` [源码:10](../../eyes/src/ui/components/TextureQualityBlock.js#L10)：当前操作：写入 _defaultOptions、_previousChildEntity、_previousEntity；返回 无显式返回。
- `_addDefaultOptions()` [源码:59](../../eyes/src/ui/components/TextureQualityBlock.js#L59)：当前操作：写入 _children.optionsList.innerHTML；返回 无显式返回。
- `_toggleHD()` [源码:83](../../eyes/src/ui/components/TextureQualityBlock.js#L83)：当前操作：写入 无直接字段写入；返回 null!==this._hdToggleEntity&&void 0!==this._hdToggleEntity&&(await this.app.getManager("scene").toggleHDTextureForEntity(this._hdToggleEntity))。
- `onRouteChange(entityInfo, entityDescription, cancelToken=null, childEntityInfo={})` [源码:86](../../eyes/src/ui/components/TextureQualityBlock.js#L86)：当前操作：写入 _hdToggleEntity、_previousChildEntity、_previousEntity；返回 无显式返回。
- `__disable()` [源码:94](../../eyes/src/ui/components/TextureQualityBlock.js#L94)：当前操作：写入 _previousChildEntity、_previousEntity；返回 无显式返回。

## `eyes/src/ui/components/TimeControls.js`

时间播放速率与时间拖动控制。[源码](../../eyes/src/ui/components/TimeControls.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-TimeControls-js)

### `TimeControls`

滑块位置通过双向分段速率表转换，反向速率限制为不高于 -1；旋钮图形只是速率的视觉投影。路由写入节流与绘图节流独立，停用清理触摸提示计时器。。父类 `Eyes.BaseComponent`。

- `constructor(app, options={})` [源码:21](../../eyes/src/ui/components/TimeControls.js#L21)：当前操作：写入 _activeDelay、_canUpdate、_class.isPlaying、_currentIsLive、_currentRate、_curve、_curve.cp1x、_curve.cp2x、_curve.endx、_drawKnobThrottled、_manager、_normValue、_rateBeforePause、_rates、_resizeObserver、_router、_setQueryDebounced、_touchTimeout；返回 无显式返回。
- `init()` [源码:86](../../eyes/src/ui/components/TimeControls.js#L86)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onRateChange(currentRate)` [源码:111](../../eyes/src/ui/components/TimeControls.js#L111)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onSliderMove(inputEvent)` [源码:114](../../eyes/src/ui/components/TimeControls.js#L114)：当前操作：写入 _currentRate、_normValue；返回 void(inputEvent.target.value=50)。
- `_onTouchStart(touchEvent)` [源码:125](../../eyes/src/ui/components/TimeControls.js#L125)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_onTouchEnd()` [源码:137](../../eyes/src/ui/components/TimeControls.js#L137)：当前操作：写入 _touchTimeout；返回 无显式返回。
- `_createRatesMap()` [源码:144](../../eyes/src/ui/components/TimeControls.js#L144)：当前操作：写入 _ratesMap；返回 无显式返回。
- `_roundRate(currentRate)` [源码:173](../../eyes/src/ui/components/TimeControls.js#L173)：当前操作：写入 无直接字段写入；返回 rate*secondsPerUnit[unit]。
- `_drawCurve()` [源码:180](../../eyes/src/ui/components/TimeControls.js#L180)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_drawKnob(normalizedPosition)` [源码:196](../../eyes/src/ui/components/TimeControls.js#L196)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setRate(currentRate)` [源码:208](../../eyes/src/ui/components/TimeControls.js#L208)：当前操作：写入 _currentRate、_normValue、_rateBeforePause、_timeLimit；返回 无显式返回。
- `_getTimeLimit()` [源码:237](../../eyes/src/ui/components/TimeControls.js#L237)：当前操作：写入 无直接字段写入；返回 Math.abs(currentTime.valueOf()-max.valueOf())<10?"max":Math.abs(currentTime.valueOf()-min.valueOf())<10?"min":null。
- `_getValueFromRate(currentRate)` [源码:245](../../eyes/src/ui/components/TimeControls.js#L245)：当前操作：写入 无直接字段写入；返回 exactIndex、rateIndex+(currentRate-lowerRate)/(upperRate-lowerRate)、50。
- `_setQuery(currentRate, currentTime)` [源码:257](../../eyes/src/ui/components/TimeControls.js#L257)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `decreaseRate()` [源码:263](../../eyes/src/ui/components/TimeControls.js#L263)：当前操作：写入 无直接字段写入；返回 void。
- `increaseRate()` [源码:276](../../eyes/src/ui/components/TimeControls.js#L276)：当前操作：写入 无直接字段写入；返回 void。
- `playPauseRate(clickEvent, isPlaying=this._state.isPlaying)` [源码:289](../../eyes/src/ui/components/TimeControls.js#L289)：当前操作：写入 无直接字段写入；返回 void、void this._app.getView("event")?.replayEvent()。
- `onRealtimeClick()` [源码:299](../../eyes/src/ui/components/TimeControls.js#L299)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `getRateUnit(currentRate, fractionDigits=0)` [源码:302](../../eyes/src/ui/components/TimeControls.js#L302)：当前操作：写入 无直接字段写入；返回 {rate:parseFloat(formatNumber(scaledRate,fractionDigits)),unit:unitName}。
- `getRateDisplay(currentRate=this._manager.getTimeRate())` [源码:318](../../eyes/src/ui/components/TimeControls.js#L318)：当前操作：写入 无直接字段写入；返回 "paused"、"real rate"、ˋ${rate} ${unit}${1===rate?"":"s"}/sˋ。
- `setCanUpdate(canUpdate)` [源码:327](../../eyes/src/ui/components/TimeControls.js#L327)：当前操作：写入 _canUpdate；返回 无显式返回。
- `update()` [源码:330](../../eyes/src/ui/components/TimeControls.js#L330)：当前操作：写入 _currentIsLive；返回 无显式返回。
- `__disable()` [源码:336](../../eyes/src/ui/components/TimeControls.js#L336)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/TitleBlock.js`

故事标题内容块。[源码](../../eyes/src/ui/components/TitleBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-TitleBlock-js)

### `TitleBlock`

此类只选择故事标题模板；状态、点击与进入退出行为完全继承 StoryBaseContentBlock，没有独立事件或资源所有权。。父类 `EyesPublicApi.StoryBaseContentBlock`。


## `eyes/src/ui/components/Toast.js`

临时通知消息及定时隐藏。[源码](../../eyes/src/ui/components/Toast.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-Toast-js)

### `Toast`

自动隐藏计时器归本组件持有，重复显示先取消旧计时器，手动隐藏也取消计时器并清除错误样式。。父类 `EyesPublicApi.BaseComponent`。

- `constructor(app, options={})` [源码:8](../../eyes/src/ui/components/Toast.js#L8)：当前操作：写入 _hideTimeout；返回 无显式返回。
- `setIcon(iconClass)` [源码:19](../../eyes/src/ui/components/Toast.js#L19)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setContent(messageText, appendedHtml=null)` [源码:24](../../eyes/src/ui/components/Toast.js#L24)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setError(isError)` [源码:30](../../eyes/src/ui/components/Toast.js#L30)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `show()` [源码:36](../../eyes/src/ui/components/Toast.js#L36)：当前操作：写入 _hideTimeout；返回 无显式返回。
- `hide()` [源码:45](../../eyes/src/ui/components/Toast.js#L45)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/ToggleBlock.js`

故事内开关交互。[源码](../../eyes/src/ui/components/ToggleBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-ToggleBlock-js)

### `ToggleBlock`

进入时将选中状态同步到故事配置，退出时撤销选中；onClick 先执行父类动作，再更新模板选择状态，保持故事动作顺序。。父类 `EyesPublicApi.StoryBaseContentBlock`。

- `constructor(app, options={})` [源码:8](../../eyes/src/ui/components/ToggleBlock.js#L8)：当前操作：写入 _class.isSelectedClass、_config.info.selected；返回 无显式返回。
- `onEnter()` [源码:22](../../eyes/src/ui/components/ToggleBlock.js#L22)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onLeave()` [源码:26](../../eyes/src/ui/components/ToggleBlock.js#L26)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onClick()` [源码:30](../../eyes/src/ui/components/ToggleBlock.js#L30)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `select()` [源码:34](../../eyes/src/ui/components/ToggleBlock.js#L34)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `unselect()` [源码:40](../../eyes/src/ui/components/ToggleBlock.js#L40)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/components/ToolboxBlock.js`

对象工具入口集合。[源码](../../eyes/src/ui/components/ToolboxBlock.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-ToolboxBlock-js)

### `ToolboxBlock`

导航参数数组由此块保存并交给 router 展开调用；桌面提示交给 tippy，触摸端另用 DOM 弹层及外部点击关闭逻辑。。父类 `SolarSystemPublicApi.BaseContentBlock`。

- `constructor(app, options={})` [源码:11](../../eyes/src/ui/components/ToolboxBlock.js#L11)：当前操作：写入 _isTouch、_state；返回 无显式返回。
- `init()` [源码:27](../../eyes/src/ui/components/ToolboxBlock.js#L27)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onRouteChange({entityId:entityId,link:link,query:queryParams={},options:navigationOptions={__remove:"all"},updatedTitle="",tooltipText=this._state.tooltipText})` [源码:36](../../eyes/src/ui/components/ToolboxBlock.js#L36)：当前操作：写入 _tippy；返回 无显式返回。
- `_showTooltip(clickEvent)` [源码:59](../../eyes/src/ui/components/ToolboxBlock.js#L59)：当前操作：写入 无直接字段写入；返回 void。
- `_closeTooltip(clickEvent)` [源码:74](../../eyes/src/ui/components/ToolboxBlock.js#L74)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resize()` [源码:83](../../eyes/src/ui/components/ToolboxBlock.js#L83)：当前操作：写入 _isTouch；返回 无显式返回。

## `eyes/src/ui/components/TutorialOverlay.js`

教程步骤遮罩与提示定位。[源码](../../eyes/src/ui/components/TutorialOverlay.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-components-TutorialOverlay-js)

### `TutorialOverlay`

教程实例持有 Swiper、目标测量缓存及延迟初始化/已读计时器。路由只在主页且未取消时驱动教程，mask 百分比由目标视口比例换算，已读索引写入 localStorage。。父类 `EyesPublicApi.BaseComponent`。

- `constructor(app, options={})` [源码:16](../../eyes/src/ui/components/TutorialOverlay.js#L16)：当前操作：写入 _activeBulletClass、_allTutorials、_bulletClass、_currIndex、_elementMeasures、_initTimeout、_slideViewedTimeout、_storageName、_swiper、_swiperSlideClass；返回 无显式返回。
- `setTutorials(allTutorials)` [源码:53](../../eyes/src/ui/components/TutorialOverlay.js#L53)：当前操作：写入 _allTutorials；返回 无显式返回。
- `hideTutorialSlide(tutorialId)` [源码:57](../../eyes/src/ui/components/TutorialOverlay.js#L57)：当前操作：写入 无直接字段写入；返回 tutorials.filter(({id:id})=>id!==tutorialId)。
- `_addEvents()` [源码:65](../../eyes/src/ui/components/TutorialOverlay.js#L65)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_createSlides()` [源码:87](../../eyes/src/ui/components/TutorialOverlay.js#L87)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_addSlide(slideElements=[], slideClass)` [源码:124](../../eyes/src/ui/components/TutorialOverlay.js#L124)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_createBullets()` [源码:130](../../eyes/src/ui/components/TutorialOverlay.js#L130)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setActiveBullet(slideIndex=this._currIndex)` [源码:145](../../eyes/src/ui/components/TutorialOverlay.js#L145)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_setHighlightedElement(slideIndex=this._currIndex, recalculateMeasures=false)` [源码:154](../../eyes/src/ui/components/TutorialOverlay.js#L154)：当前操作：写入 _elementMeasures；返回 无显式返回。
- `onQueryChange({cancelToken:cancelToken,tutorial:tutorial}={})` [源码:190](../../eyes/src/ui/components/TutorialOverlay.js#L190)：当前操作：写入 _currIndex；返回 void。
- `_initSwiper()` [源码:203](../../eyes/src/ui/components/TutorialOverlay.js#L203)：当前操作：写入 _initTimeout、_swiper；返回 无显式返回。
- `_postSwiperInitFunction()` [源码:216](../../eyes/src/ui/components/TutorialOverlay.js#L216)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_getIndexByTutorialId(tutorialId)` [源码:221](../../eyes/src/ui/components/TutorialOverlay.js#L221)：当前操作：写入 无直接字段写入；返回 this._allTutorials?.findIndex(({id:id})=>id===tutorialId)。
- `_setSlideViewedTimeout(slideIndex)` [源码:226](../../eyes/src/ui/components/TutorialOverlay.js#L226)：当前操作：写入 _slideViewedTimeout；返回 无显式返回。
- `_calcElementMeasures()` [源码:232](../../eyes/src/ui/components/TutorialOverlay.js#L232)：当前操作：写入 无直接字段写入；返回 this._allTutorials.map(({targetSelector:targetSelector})=>{const visibleTargets=[...document.body.querySelectorAll(targetSelector)].filter(targetElement=>null!==targetElement.offsetParent);if(!visibleTargets.length)retur。
- `show()` [源码:256](../../eyes/src/ui/components/TutorialOverlay.js#L256)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `hide()` [源码:266](../../eyes/src/ui/components/TutorialOverlay.js#L266)：当前操作：写入 _currIndex；返回 无显式返回。
- `calcPriorityIndex()` [源码:271](../../eyes/src/ui/components/TutorialOverlay.js#L271)：当前操作：写入 无直接字段写入；返回 unviewedTutorials.length?this._getIndexByTutorialId(unviewedTutorials[0].id):null。
- `navigateToTutorial(tutorialIndex, useHomeRoute=false)` [源码:276](../../eyes/src/ui/components/TutorialOverlay.js#L276)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `close()` [源码:292](../../eyes/src/ui/components/TutorialOverlay.js#L292)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resize()` [源码:297](../../eyes/src/ui/components/TutorialOverlay.js#L297)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/templates/BreadcrumbTemplate.html`

BreadcrumbTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/BreadcrumbTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-BreadcrumbTemplate-html)

## `eyes/src/ui/templates/ButtonsBlockTemplate.html`

ButtonsBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/ButtonsBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-ButtonsBlockTemplate-html)

## `eyes/src/ui/templates/CameraViewBlockTemplate.html`

CameraViewBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/CameraViewBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-CameraViewBlockTemplate-html)

## `eyes/src/ui/templates/CarouselPanelTemplate.html`

CarouselPanelTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/CarouselPanelTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-CarouselPanelTemplate-html)

## `eyes/src/ui/templates/CarouselTemplate-390.html`

CarouselTemplate-390 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/CarouselTemplate-390.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-CarouselTemplate-390-html)

## `eyes/src/ui/templates/CarouselTemplate-391.html`

CarouselTemplate-391 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/CarouselTemplate-391.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-CarouselTemplate-391-html)

## `eyes/src/ui/templates/CheckboxBlockTemplate.html`

CheckboxBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/CheckboxBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-CheckboxBlockTemplate-html)

## `eyes/src/ui/templates/CheckboxMultistateTemplate.html`

CheckboxMultistateTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/CheckboxMultistateTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-CheckboxMultistateTemplate-html)

## `eyes/src/ui/templates/ClockShortcutTemplate.html`

ClockShortcutTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/ClockShortcutTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-ClockShortcutTemplate-html)

## `eyes/src/ui/templates/ClockTemplate.html`

ClockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/ClockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-ClockTemplate-html)

## `eyes/src/ui/templates/CollapsibleMenuItemTemplate.html`

CollapsibleMenuItemTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/CollapsibleMenuItemTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-CollapsibleMenuItemTemplate-html)

## `eyes/src/ui/templates/CollapsibleMenuTemplate.html`

CollapsibleMenuTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/CollapsibleMenuTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-CollapsibleMenuTemplate-html)

## `eyes/src/ui/templates/ComparisonTemplate.html`

ComparisonTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/ComparisonTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-ComparisonTemplate-html)

## `eyes/src/ui/templates/ContentPanelTemplate.html`

ContentPanelTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/ContentPanelTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-ContentPanelTemplate-html)

## `eyes/src/ui/templates/DescriptionBlockTemplate-1006.html`

DescriptionBlockTemplate-1006 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/DescriptionBlockTemplate-1006.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-DescriptionBlockTemplate-1006-html)

## `eyes/src/ui/templates/DescriptionBlockTemplate-542.html`

DescriptionBlockTemplate-542 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/DescriptionBlockTemplate-542.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-DescriptionBlockTemplate-542-html)

## `eyes/src/ui/templates/DistancePanelTemplate.html`

DistancePanelTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/DistancePanelTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-DistancePanelTemplate-html)

## `eyes/src/ui/templates/EventsBlockTemplate.html`

EventsBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/EventsBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-EventsBlockTemplate-html)

## `eyes/src/ui/templates/EventsTimelineTemplate.html`

EventsTimelineTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/EventsTimelineTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-EventsTimelineTemplate-html)

## `eyes/src/ui/templates/ExplorationBlockTemplate.html`

ExplorationBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/ExplorationBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-ExplorationBlockTemplate-html)

## `eyes/src/ui/templates/FeaturedEventsBlockTemplate.html`

FeaturedEventsBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/FeaturedEventsBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-FeaturedEventsBlockTemplate-html)

## `eyes/src/ui/templates/FeaturedMoonsBlockTemplate.html`

FeaturedMoonsBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/FeaturedMoonsBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-FeaturedMoonsBlockTemplate-html)

## `eyes/src/ui/templates/FeaturedStoriesPanelTemplate.html`

FeaturedStoriesPanelTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/FeaturedStoriesPanelTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-FeaturedStoriesPanelTemplate-html)

## `eyes/src/ui/templates/FeaturedStoryBlockTemplate.html`

FeaturedStoryBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/FeaturedStoryBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-FeaturedStoryBlockTemplate-html)

## `eyes/src/ui/templates/FeaturesBlockTemplate.html`

FeaturesBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/FeaturesBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-FeaturesBlockTemplate-html)

## `eyes/src/ui/templates/HintBlockTemplate.html`

HintBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/HintBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-HintBlockTemplate-html)

## `eyes/src/ui/templates/ImageBlockTemplate.html`

ImageBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/ImageBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-ImageBlockTemplate-html)

## `eyes/src/ui/templates/InfoPanelTemplate.html`

InfoPanelTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/InfoPanelTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-InfoPanelTemplate-html)

## `eyes/src/ui/templates/InstrumentFOVBlockTemplate.html`

InstrumentFOVBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/InstrumentFOVBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-InstrumentFOVBlockTemplate-html)

## `eyes/src/ui/templates/KioskBaseTemplate.html`

KioskBaseTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/KioskBaseTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-KioskBaseTemplate-html)

## `eyes/src/ui/templates/LayerPanelTemplate.html`

LayerPanelTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/LayerPanelTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-LayerPanelTemplate-html)

## `eyes/src/ui/templates/LayersBlockTemplate.html`

LayersBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/LayersBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-LayersBlockTemplate-html)

## `eyes/src/ui/templates/LoadIconTemplate.html`

LoadIconTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/LoadIconTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-LoadIconTemplate-html)

## `eyes/src/ui/templates/MenuTemplate.html`

MenuTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/MenuTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-MenuTemplate-html)

## `eyes/src/ui/templates/MobileExpandButtonTemplate.html`

MobileExpandButtonTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/MobileExpandButtonTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-MobileExpandButtonTemplate-html)

## `eyes/src/ui/templates/OverlayTemplate.html`

OverlayTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/OverlayTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-OverlayTemplate-html)

## `eyes/src/ui/templates/OverviewBlockTemplate.html`

OverviewBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/OverviewBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-OverviewBlockTemplate-html)

## `eyes/src/ui/templates/RelatedBlockTemplate.html`

RelatedBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/RelatedBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-RelatedBlockTemplate-html)

## `eyes/src/ui/templates/ReplayBlockTemplate.html`

ReplayBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/ReplayBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-ReplayBlockTemplate-html)

## `eyes/src/ui/templates/ReplayButtonBlockTemplate.html`

ReplayButtonBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/ReplayButtonBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-ReplayButtonBlockTemplate-html)

## `eyes/src/ui/templates/SearchTemplate.html`

SearchTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/SearchTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-SearchTemplate-html)

## `eyes/src/ui/templates/SettingsTemplate.html`

SettingsTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/SettingsTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-SettingsTemplate-html)

## `eyes/src/ui/templates/ShareModalTemplate.html`

ShareModalTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/ShareModalTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-ShareModalTemplate-html)

## `eyes/src/ui/templates/SolarSystemAppTemplate.html`

SolarSystemAppTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/SolarSystemAppTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-SolarSystemAppTemplate-html)

## `eyes/src/ui/templates/SpecialFeaturesBlockTemplate.html`

SpecialFeaturesBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/SpecialFeaturesBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-SpecialFeaturesBlockTemplate-html)

## `eyes/src/ui/templates/SurfaceMapBlockTemplate.html`

SurfaceMapBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/SurfaceMapBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-SurfaceMapBlockTemplate-html)

## `eyes/src/ui/templates/TelescopeTemplate.html`

TelescopeTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/TelescopeTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-TelescopeTemplate-html)

## `eyes/src/ui/templates/TextureQualityBlockTemplate.html`

TextureQualityBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/TextureQualityBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-TextureQualityBlockTemplate-html)

## `eyes/src/ui/templates/TimeControllerTemplate.html`

TimeControllerTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/TimeControllerTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-TimeControllerTemplate-html)

## `eyes/src/ui/templates/TimeControlsTemplate.html`

TimeControlsTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/TimeControlsTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-TimeControlsTemplate-html)

## `eyes/src/ui/templates/TitleBlockTemplate.html`

TitleBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/TitleBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-TitleBlockTemplate-html)

## `eyes/src/ui/templates/ToastTemplate.html`

ToastTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/ToastTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-ToastTemplate-html)

## `eyes/src/ui/templates/ToggleBlockTemplate.html`

ToggleBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/ToggleBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-ToggleBlockTemplate-html)

## `eyes/src/ui/templates/ToolboxBlockTemplate.html`

ToolboxBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/ToolboxBlockTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-ToolboxBlockTemplate-html)

## `eyes/src/ui/templates/TutorialOverlayTemplate.html`

TutorialOverlayTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。[源码](../../eyes/src/ui/templates/TutorialOverlayTemplate.html)。语义状态：`not-semantically-accepted`。

[总文档中的完整条目](README.md#file-eyes-src-ui-templates-TutorialOverlayTemplate-html)

## `eyes/src/ui/views/BaseView.js`

路由视图共同生命周期：资源、时间、组件、相机与清理。[源码](../../eyes/src/ui/views/BaseView.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-views-BaseView-js)

### `BaseView`

路由视图共同生命周期：资源、时间、组件、相机与清理；继承 EyesPublicApi.BaseComponent。父类 `EyesPublicApi.BaseComponent`。

- `constructor(app, element, componentNames=[])` [源码:8](../../eyes/src/ui/views/BaseView.js#L8)：当前操作：写入 _components、_enabled、_rules、_target、_validQueries；返回 无显式返回。
- `get app()` [源码:17](../../eyes/src/ui/views/BaseView.js#L17)：当前操作：写入 无直接字段写入；返回 super.app。
- `_showControls()` [源码:20](../../eyes/src/ui/views/BaseView.js#L20)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_hideControls()` [源码:21](../../eyes/src/ui/views/BaseView.js#L21)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_shouldHideControls()` [源码:22](../../eyes/src/ui/views/BaseView.js#L22)：当前操作：写入 无直接字段写入；返回 false。
- `updateVisibility()` [源码:25](../../eyes/src/ui/views/BaseView.js#L25)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resize()` [源码:28](../../eyes/src/ui/views/BaseView.js#L28)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleViewUI()` [源码:31](../../eyes/src/ui/views/BaseView.js#L31)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_shouldResetStatus()` [源码:32](../../eyes/src/ui/views/BaseView.js#L32)：当前操作：写入 无直接字段写入；返回 this._app.getManager("layer").getLayer("ui").visible。
- `_resetStatus(preservedComponentNames=[])` [源码:35](../../eyes/src/ui/views/BaseView.js#L35)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `registerCallbacks()` [源码:44](../../eyes/src/ui/views/BaseView.js#L44)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeCallbacks()` [源码:47](../../eyes/src/ui/views/BaseView.js#L47)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onEnter(routeParams, preservedComponentNames=[])` [源码:51](../../eyes/src/ui/views/BaseView.js#L51)：视图拥有窗口 resize 与图层 UI 订阅，离开时必须成对释放；组件的启用集合由当前视图配置决定。
- `onRouteChange(routeParams)` [源码:61](../../eyes/src/ui/views/BaseView.js#L61)：路由更新分阶段串行执行；资源和界面准备后的取消检查阻止过期路由继续进入相机阶段。相机阶段进入后，无论成功还是抛错都执行 after 清理。
- `onQueryChange(routeParams)` [源码:89](../../eyes/src/ui/views/BaseView.js#L89)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `validateQuery(routeParams)` [源码:92](../../eyes/src/ui/views/BaseView.js#L92)：当前操作：写入 无直接字段写入；返回 false、EyesPublicApi.AppUtils.isEmptyObject(defaultParams)?!!EyesPublicApi.AppUtils.isEmptyObject(invalidParams)\|\|(this._handleError(ˋvalidateQuery: Invalid input - ${JSON.stringify(invalidParams)}ˋ),false):(routerManager.navig。
- `processQuery(routeParams)` [源码:124](../../eyes/src/ui/views/BaseView.js#L124)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_handleError(message="")` [源码:155](../../eyes/src/ui/views/BaseView.js#L155)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onLeave(routeParams)` [源码:164](../../eyes/src/ui/views/BaseView.js#L164)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_reset(routeParams)` [源码:175](../../eyes/src/ui/views/BaseView.js#L175)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateResources(routeParams)` [源码:178](../../eyes/src/ui/views/BaseView.js#L178)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateTimeRate(routeParams)` [源码:179](../../eyes/src/ui/views/BaseView.js#L179)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateTime(routeParams)` [源码:183](../../eyes/src/ui/views/BaseView.js#L183)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateTimeForTarget(routeParams, waitForEntity=true)` [源码:197](../../eyes/src/ui/views/BaseView.js#L197)：时间范围取默认范围、轨道数据覆盖和描述日期的交集。请求时间超界时按原规则夹到边界；不能将这些分支简化成统一的 setToNow。
- `_updateComponentsVisibility(routeParams)` [源码:235](../../eyes/src/ui/views/BaseView.js#L235)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateComponents(routeParams)` [源码:239](../../eyes/src/ui/views/BaseView.js#L239)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateCamera(routeParams)` [源码:240](../../eyes/src/ui/views/BaseView.js#L240)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateLoading(routeParams)` [源码:241](../../eyes/src/ui/views/BaseView.js#L241)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_checkReady(routeParams)` [源码:260](../../eyes/src/ui/views/BaseView.js#L260)：当前操作：写入 无直接字段写入；返回 void。
- `before(routeParams)` [源码:273](../../eyes/src/ui/views/BaseView.js#L273)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `after(routeParams)` [源码:274](../../eyes/src/ui/views/BaseView.js#L274)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/views/CompareView.js`

对象比较模式和照片模式切换。[源码](../../eyes/src/ui/views/CompareView.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-views-CompareView-js)

### `CompareView`

对象比较模式和照片模式切换；继承 ExtendedBaseView.default。父类 `ExtendedBaseView.default`。

- `constructor(...constructorArgs)` [源码:27](../../eyes/src/ui/views/CompareView.js#L27)：当前操作：写入 _category、_compare、_rules.spaceObject、defaultConfig；返回 无显式返回。
- `onEnter(routeParams)` [源码:38](../../eyes/src/ui/views/CompareView.js#L38)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateResources(routeParams)` [源码:43](../../eyes/src/ui/views/CompareView.js#L43)：当前操作：写入 _category；返回 无显式返回。
- `processQuery(routeParams)` [源码:49](../../eyes/src/ui/views/CompareView.js#L49)：候选对象从分类列表中排除当前对象，查询 id 优先于默认候选；两侧文字清理与比较管理器更新顺序保持原样。
- `_updateComponents(routeParams)` [源码:74](../../eyes/src/ui/views/CompareView.js#L74)：当前操作：写入 defaultConfig；返回 无显式返回。
- `togglePhotoMode(isPhotoMode)` [源码:99](../../eyes/src/ui/views/CompareView.js#L99)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onLeave(routeParams)` [源码:103](../../eyes/src/ui/views/CompareView.js#L103)：比较模式临时接管缩放回调与设置能力，退出时将保存的设置交还常规相机。
- `resize()` [源码:111](../../eyes/src/ui/views/CompareView.js#L111)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `registerCallbacks()` [源码:115](../../eyes/src/ui/views/CompareView.js#L115)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeCallbacks()` [源码:119](../../eyes/src/ui/views/CompareView.js#L119)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/views/DistanceView.js`

距离模式的源目标、覆盖时间交集及双目标相机。[源码](../../eyes/src/ui/views/DistanceView.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-views-DistanceView-js)

### `DistanceView`

距离模式的源目标、覆盖时间交集及双目标相机；继承 ExtendedBaseView.default。父类 `ExtendedBaseView.default`。

- `constructor(...constructorArgs)` [源码:6](../../eyes/src/ui/views/DistanceView.js#L6)：当前操作：写入 _forceLoadEntities、_rateChanged、_redirect、_rules、_spaceObjectChanged、_targetChanged、_timeChanged；返回 无显式返回。
- `onEnter(routeParams)` [源码:36](../../eyes/src/ui/views/DistanceView.js#L36)：当前操作：写入 distanceManager、distancePanel、distancePanel.isMobileChangedCallback；返回 无显式返回。
- `onLeave(routeParams)` [源码:48](../../eyes/src/ui/views/DistanceView.js#L48)：当前操作：写入 distancePanel.isMobileChangedCallback；返回 无显式返回。
- `registerCallbacks()` [源码:55](../../eyes/src/ui/views/DistanceView.js#L55)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeCallbacks()` [源码:59](../../eyes/src/ui/views/DistanceView.js#L59)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `processQuery(routeParams)` [源码:64](../../eyes/src/ui/views/DistanceView.js#L64)：源与目标未变时取消本轮完整刷新，保留距离管理器既有实体。需要刷新时展开场景依赖并去重，保证测距之前依赖已就位。
- `onQueryChange(routeParams)` [源码:94](../../eyes/src/ui/views/DistanceView.js#L94)：当前操作：写入 无直接字段写入；返回 void this.distanceManager.updateMeasurement(false)。
- `_updateTime(routeParams)` [源码:103](../../eyes/src/ui/views/DistanceView.js#L103)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_reset(routeParams)` [源码:111](../../eyes/src/ui/views/DistanceView.js#L111)：当前操作：写入 _forceLoadEntities；返回 无显式返回。
- `_updateResources({spaceObject:spaceObject})` [源码:116](../../eyes/src/ui/views/DistanceView.js#L116)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateComponents(routeParams)` [源码:124](../../eyes/src/ui/views/DistanceView.js#L124)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_checkReady(routeParams)` [源码:138](../../eyes/src/ui/views/DistanceView.js#L138)：当前操作：写入 _redirect；返回 void this._app.getManager("router").navigate({__remove:["to"]})。
- `_checkCoverageOverlap(routeParams)` [源码:157](../../eyes/src/ui/views/DistanceView.js#L157)：比较源对象与首个目标的有效覆盖区间；无交集时由调用方移除目标查询。当前时间超界时重定向到交集起点，并保留原有重定向标记。
- `_updateCamera()` [源码:208](../../eyes/src/ui/views/DistanceView.js#L208)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateCollapsibleMenu(isMobile=Eyes.AppUtils.isMobile())` [源码:223](../../eyes/src/ui/views/DistanceView.js#L223)：当前操作：写入 _collapsibleItemOptions；返回 无显式返回。
- `onIsMobileChange(isMobile)` [源码:242](../../eyes/src/ui/views/DistanceView.js#L242)：当前操作：写入 _collapsibleItems；返回 无显式返回。
- `setBreadcrumbStaticTextVisible(isVisible=!Eyes.AppUtils.isMobile())` [源码:249](../../eyes/src/ui/views/DistanceView.js#L249)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `resize()` [源码:254](../../eyes/src/ui/views/DistanceView.js#L254)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `get shouldOffsetRight()` [源码:258](../../eyes/src/ui/views/DistanceView.js#L258)：当前操作：写入 无直接字段写入；返回 false。
- `get shouldOffsetUp()` [源码:261](../../eyes/src/ui/views/DistanceView.js#L261)：当前操作：写入 无直接字段写入；返回 false。

## `eyes/src/ui/views/EventView.js`

对象事件的有效时间、重播及相关实体相机。[源码](../../eyes/src/ui/views/EventView.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-views-EventView-js)

### `EventView`

对象事件的有效时间、重播及相关实体相机；继承 ExtendedBaseView.default。父类 `ExtendedBaseView.default`。

- `constructor(...constructorArgs)` [源码:7](../../eyes/src/ui/views/EventView.js#L7)：当前操作：写入 _entityDesc、_entityInfo、_eventDesc、_eventInfo、_eventName、_hasLoaded、_isSpacecraft、_onAfter、_onLoaded、_rules.spaceObject、_scEvents、_scOrderedEvents；返回 无显式返回。
- `onEnter(routeParams)` [源码:25](../../eyes/src/ui/views/EventView.js#L25)：当前操作：写入 _offsetPanel；返回 无显式返回。
- `onLeave(routeParams)` [源码:30](../../eyes/src/ui/views/EventView.js#L30)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onQueryChange(routeParams)` [源码:42](../../eyes/src/ui/views/EventView.js#L42)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `registerCallbacks()` [源码:47](../../eyes/src/ui/views/EventView.js#L47)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeCallbacks()` [源码:52](../../eyes/src/ui/views/EventView.js#L52)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_reset(routeParams)` [源码:57](../../eyes/src/ui/views/EventView.js#L57)：当前操作：写入 _entityDesc、_entityInfo、_eventDesc、_eventInfo、_eventName、_hasLoaded、_onLoaded、_scEvents、_scOrderedEvents、_target；返回 无显式返回。
- `_updateResources(routeParams)` [源码:71](../../eyes/src/ui/views/EventView.js#L71)：事件列表、对象描述与单事件描述分开加载；每次异步加载后检查取消令牌，避免已经离开的路由继续读取共享 content 上下文。
- `_updateComponents(routeParams)` [源码:108](../../eyes/src/ui/views/EventView.js#L108)：当前操作：写入 _collapsibleItems、_onLoaded；返回 void。
- `_updateTimeForTarget(routeParams, waitForEntity=true)` [源码:153](../../eyes/src/ui/views/EventView.js#L153)：事件时间与实体覆盖共同限定播放区间；显式暂停当前帧优先于默认事件速率。重定向延迟到 after，避免在本轮相机更新中途切换路由。
- `_setMinEventEnd(eventStart, eventEnd)` [源码:218](../../eyes/src/ui/views/EventView.js#L218)：直接扩展传入的结束时间对象，使短于一分钟的事件仍有可操作的播放范围；调用方持有同一个时间对象。
- `_loaded(loadedEntityId)` [源码:225](../../eyes/src/ui/views/EventView.js#L225)：当前操作：写入 _hasLoaded、_onLoaded；返回 无显式返回。
- `_backToLive()` [源码:231](../../eyes/src/ui/views/EventView.js#L231)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `replayEvent(resetCamera=true)` [源码:239](../../eyes/src/ui/views/EventView.js#L239)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateCamera(routeParams)` [源码:264](../../eyes/src/ui/views/EventView.js#L264)：当前操作：写入 无直接字段写入；返回 void。
- `_shouldHideControls()` [源码:294](../../eyes/src/ui/views/EventView.js#L294)：当前操作：写入 无直接字段写入；返回 Eyes.AppUtils.isMobileMode()&&isPanelVisible&&isPanelExpanded。
- `after()` [源码:299](../../eyes/src/ui/views/EventView.js#L299)：当前操作：写入 _onAfter；返回 无显式返回。

## `eyes/src/ui/views/ExtendedBaseView.js`

加入 embed/kiosk 查询控制、面板偏移与全局 UI 可见性策略。[源码](../../eyes/src/ui/views/ExtendedBaseView.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-views-ExtendedBaseView-js)

### `ExtendedBaseView`

加入 embed/kiosk 查询控制、面板偏移与全局 UI 可见性策略；继承 Eyes.BaseView。父类 `Eyes.BaseView`。

- `constructor(...constructorArgs)` [源码:5](../../eyes/src/ui/views/ExtendedBaseView.js#L5)：当前操作：写入 _collapsibleItemOptions、_collapsibleItems、_offsetPanel、embedQueries、kioskValues；返回 无显式返回。
- `onEnter(routeParams)` [源码:42](../../eyes/src/ui/views/ExtendedBaseView.js#L42)：嵌入与 kiosk 配置在进入时折叠到组件集合；这里只协调已有 NASA 控件，不创建新的界面。
- `disableUIComponent(componentName)` [源码:67](../../eyes/src/ui/views/ExtendedBaseView.js#L67)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onLeave(routeParams)` [源码:71](../../eyes/src/ui/views/ExtendedBaseView.js#L71)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `registerCallbacks()` [源码:78](../../eyes/src/ui/views/ExtendedBaseView.js#L78)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeCallbacks()` [源码:83](../../eyes/src/ui/views/ExtendedBaseView.js#L83)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_reset()` [源码:88](../../eyes/src/ui/views/ExtendedBaseView.js#L88)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `processQuery(routeParams)` [源码:92](../../eyes/src/ui/views/ExtendedBaseView.js#L92)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateComponents(routeParams)` [源码:95](../../eyes/src/ui/views/ExtendedBaseView.js#L95)：当前操作：写入 _collapsibleItems；返回 无显式返回。
- `_loaded(loadedEntityId)` [源码:159](../../eyes/src/ui/views/ExtendedBaseView.js#L159)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateLoading(routeParams)` [源码:162](../../eyes/src/ui/views/ExtendedBaseView.js#L162)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateCollapsibleMenu()` [源码:169](../../eyes/src/ui/views/ExtendedBaseView.js#L169)：当前操作：写入 _collapsibleItemOptions、_collapsibleItems；返回 void。
- `_handleInfoPanelEmbedQueries(routeParams)` [源码:177](../../eyes/src/ui/views/ExtendedBaseView.js#L177)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_showControls()` [源码:189](../../eyes/src/ui/views/ExtendedBaseView.js#L189)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_hideControls()` [源码:210](../../eyes/src/ui/views/ExtendedBaseView.js#L210)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `toggleViewUI()` [源码:222](../../eyes/src/ui/views/ExtendedBaseView.js#L222)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `get shouldOffsetRight()` [源码:237](../../eyes/src/ui/views/ExtendedBaseView.js#L237)：当前操作：写入 无直接字段写入；返回 Eyes.AppUtils.isDesktop()。
- `get shouldOffsetUp()` [源码:240](../../eyes/src/ui/views/ExtendedBaseView.js#L240)：当前操作：写入 无直接字段写入；返回 !Eyes.AppUtils.isDesktop()。
- `setViewportOffset(isExpanded, usePanelState=false)` [源码:244](../../eyes/src/ui/views/ExtendedBaseView.js#L244)：偏移同时取决于 UI 图层、面板启用与展开状态及设备方向；usePanelState 用于退出或整层切换时直接读取面板状态。
- `resize()` [源码:256](../../eyes/src/ui/views/ExtendedBaseView.js#L256)：当前操作：写入 无直接字段写入；返回 无显式返回。

## `eyes/src/ui/views/FeatureView.js`

对象特征页资源与描述加载。[源码](../../eyes/src/ui/views/FeatureView.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-views-FeatureView-js)

### `FeatureView`

对象特征页资源与描述加载；继承 ExtendedBaseView.default。父类 `ExtendedBaseView.default`。

- `constructor(...constructorArgs)` [源码:5](../../eyes/src/ui/views/FeatureView.js#L5)：当前操作：写入 _entityDesc、_entityInfo、_featureDesc、_featureInfo、_forceLoadEntities、_rules.feature、_rules.spaceObject；返回 无显式返回。
- `onEnter(routeParams)` [源码:23](../../eyes/src/ui/views/FeatureView.js#L23)：当前操作：写入 _offsetPanel；返回 无显式返回。
- `registerCallbacks()` [源码:28](../../eyes/src/ui/views/FeatureView.js#L28)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeCallbacks()` [源码:33](../../eyes/src/ui/views/FeatureView.js#L33)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_reset(routeParams)` [源码:38](../../eyes/src/ui/views/FeatureView.js#L38)：当前操作：写入 _entityDesc、_entityInfo、_featureDesc、_featureInfo、_forceLoadEntities、_target；返回 无显式返回。
- `_updateResources(routeParams)` [源码:48](../../eyes/src/ui/views/FeatureView.js#L48)：当前仅实现 moons 特征：过滤不存在的目录条目，前五个作为首屏，其余交给更多列表。描述键由目标和特征共同组成。
- `_updateComponents(routeParams)` [源码:86](../../eyes/src/ui/views/FeatureView.js#L86)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateCamera(routeParams)` [源码:101](../../eyes/src/ui/views/FeatureView.js#L101)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_shouldHideControls()` [源码:106](../../eyes/src/ui/views/FeatureView.js#L106)：当前操作：写入 无直接字段写入；返回 Eyes.AppUtils.isMobileMode()&&isPanelVisible&&isPanelExpanded。

## `eyes/src/ui/views/HomeView.js`

首页精选故事、默认目标及全景相机流程。[源码](../../eyes/src/ui/views/HomeView.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-views-HomeView-js)

### `HomeView`

首页精选故事、默认目标及全景相机流程；继承 ExtendedBaseView.default。父类 `ExtendedBaseView.default`。

- `onEnter(routeParams)` [源码:5](../../eyes/src/ui/views/HomeView.js#L5)：当前操作：写入 _offsetPanel；返回 无显式返回。
- `registerCallbacks()` [源码:11](../../eyes/src/ui/views/HomeView.js#L11)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeCallbacks()` [源码:15](../../eyes/src/ui/views/HomeView.js#L15)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateResources(routeParams)` [源码:20](../../eyes/src/ui/views/HomeView.js#L20)：精选故事在深拷贝目录上标记外部或内部链接类型，避免污染 content 管理器共享目录。
- `_updateComponents(routeParams)` [源码:30](../../eyes/src/ui/views/HomeView.js#L30)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateCamera(routeParams)` [源码:40](../../eyes/src/ui/views/HomeView.js#L40)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_shouldHideControls()` [源码:44](../../eyes/src/ui/views/HomeView.js#L44)：当前操作：写入 无直接字段写入；返回 Eyes.AppUtils.isMobileMode()&&this._app.getComponent("featuredStoriesPanel")?.getState("isVisible")。

## `eyes/src/ui/views/ObjectView.js`

对象页的实体准备、子父对象切换、覆盖时间及相机跟随。[源码](../../eyes/src/ui/views/ObjectView.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-views-ObjectView-js)

### `ObjectView`

对象页的实体准备、子父对象切换、覆盖时间及相机跟随；继承 ExtendedBaseView.default。父类 `ExtendedBaseView.default`。

- `constructor(...constructorArgs)` [源码:8](../../eyes/src/ui/views/ObjectView.js#L8)：当前操作：写入 _entityDesc、_entityInfo、_featuredCardsList、_forceLoadEntities、_hasLoaded、_isSpacecraft、_onAfter、_onLoaded、_rules.spaceObject、_scEvents；返回 无显式返回。
- `onEnter(routeParams)` [源码:24](../../eyes/src/ui/views/ObjectView.js#L24)：当前操作：写入 _offsetPanel；返回 无显式返回。
- `onLeave(routeParams)` [源码:29](../../eyes/src/ui/views/ObjectView.js#L29)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onRouteChange(routeParams)` [源码:43](../../eyes/src/ui/views/ObjectView.js#L43)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onQueryChange(routeParams)` [源码:67](../../eyes/src/ui/views/ObjectView.js#L67)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `registerCallbacks()` [源码:71](../../eyes/src/ui/views/ObjectView.js#L71)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeCallbacks()` [源码:76](../../eyes/src/ui/views/ObjectView.js#L76)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_reset(routeParams)` [源码:81](../../eyes/src/ui/views/ObjectView.js#L81)：当前操作：写入 _entityDesc、_featuredCardsList、_forceLoadEntities、_hasLoaded、_isSpacecraft、_onLoaded、_scEvents、_scOrderedEvents、_target；返回 无显式返回。
- `_updateResources(routeParams)` [源码:94](../../eyes/src/ui/views/ObjectView.js#L94)：对象、重心对应实体与跟随对象共同参与强制加载。描述和故事卡片取自 content 上下文的副本，路由取消后不再提交后续资源。
- `getCurrentTarget()` [源码:136](../../eyes/src/ui/views/ObjectView.js#L136)：当前操作：写入 无直接字段写入；返回 this._target。
- `appendForceLoadEntities(entityId)` [源码:139](../../eyes/src/ui/views/ObjectView.js#L139)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeForceLoadEntities(entityId)` [源码:142](../../eyes/src/ui/views/ObjectView.js#L142)：当前操作：写入 无直接字段写入；返回 void。
- `onChildChanged(parentEntity, childEntity)` [源码:147](../../eyes/src/ui/views/ObjectView.js#L147)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onParentChanged(entity, oldParent, newParent)` [源码:158](../../eyes/src/ui/views/ObjectView.js#L158)：父实体变化会重建上下文图层并通知面板；相机收到旧、新父名称，避免把实体句柄误当作路由对象 id。
- `_updateComponents(routeParams)` [源码:173](../../eyes/src/ui/views/ObjectView.js#L173)：时间线与内容面板的后半段刷新放入 _onLoaded 队列；加载完成后统一执行并清空。队列归当前对象视图持有，重置对象时重新创建。
- `_updateTimeForTarget(routeParams)` [源码:224](../../eyes/src/ui/views/ObjectView.js#L224)：当前操作：写入 _onAfter；返回 无显式返回。
- `_updateCamera(routeParams)` [源码:247](../../eyes/src/ui/views/ObjectView.js#L247)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateCameraOnParentChange(routeParams)` [源码:262](../../eyes/src/ui/views/ObjectView.js#L262)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_loaded(loadedEntityId)` [源码:263](../../eyes/src/ui/views/ObjectView.js#L263)：当前操作：写入 _hasLoaded、_onLoaded；返回 无显式返回。
- `_shouldHideControls()` [源码:269](../../eyes/src/ui/views/ObjectView.js#L269)：当前操作：写入 无直接字段写入；返回 Eyes.AppUtils.isMobileMode()&&isPanelVisible&&isPanelExpanded。
- `after()` [源码:274](../../eyes/src/ui/views/ObjectView.js#L274)：当前操作：写入 _onAfter；返回 无显式返回。

## `eyes/src/ui/views/StoryView.js`

故事与 slide 查询切换、故事时钟及相机状态。[源码](../../eyes/src/ui/views/StoryView.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-views-StoryView-js)

### `StoryView`

故事与 slide 查询切换、故事时钟及相机状态；继承 ExtendedBaseView.default。父类 `ExtendedBaseView.default`。

- `constructor(...constructorArgs)` [源码:5](../../eyes/src/ui/views/StoryView.js#L5)：当前操作：写入 _isStoryEntry、_isStoryExit、_rules.id、_slideId、_story、_storyId；返回 无显式返回。
- `before(routeParams)` [源码:18](../../eyes/src/ui/views/StoryView.js#L18)：当前操作：写入 _isStoryEntry、_isStoryExit；返回 无显式返回。
- `after(routeParams)` [源码:23](../../eyes/src/ui/views/StoryView.js#L23)：当前操作：写入 _isStoryEntry；返回 无显式返回。
- `onRouteChange(routeParams)` [源码:27](../../eyes/src/ui/views/StoryView.js#L27)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onQueryChange(routeParams)` [源码:30](../../eyes/src/ui/views/StoryView.js#L30)：当前操作：写入 _isStoryEntry、_isStoryExit、_slideId；返回 无显式返回。
- `onEnter(routeParams, preservedComponents=[])` [源码:33](../../eyes/src/ui/views/StoryView.js#L33)：当前操作：写入 _isStoryExit、_offsetPanel；返回 无显式返回。
- `onLeave(routeParams)` [源码:45](../../eyes/src/ui/views/StoryView.js#L45)：退出故事后归还时钟编辑与对象点击能力，并重置时间范围；isStoryExit 也供仍在运行的故事相机脚本查询。
- `_verifySlideInfo(routeParams)` [源码:63](../../eyes/src/ui/views/StoryView.js#L63)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateResources(routeParams)` [源码:72](../../eyes/src/ui/views/StoryView.js#L72)：故事定义深拷贝后由当前视图持有，幻灯片和故事级实体共同决定加载集合；切换故事前执行旧故事退出钩子。
- `_updateTime(routeParams)` [源码:92](../../eyes/src/ui/views/StoryView.js#L92)：当前操作：写入 无直接字段写入；返回 void。
- `_shouldHideControls()` [源码:100](../../eyes/src/ui/views/StoryView.js#L100)：当前操作：写入 无直接字段写入；返回 Eyes.AppUtils.isMobileMode()&&!this._app.getComponent("story").getState("isCollapsed")。
- `_updateComponents(routeParams)` [源码:103](../../eyes/src/ui/views/StoryView.js#L103)：当前操作：写入 无直接字段写入；返回 void。
- `_updateCamera(routeParams)` [源码:138](../../eyes/src/ui/views/StoryView.js#L138)：当前操作：写入 无直接字段写入；返回 void。
- `resize()` [源码:153](../../eyes/src/ui/views/StoryView.js#L153)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `registerCallbacks()` [源码:157](../../eyes/src/ui/views/StoryView.js#L157)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `removeCallbacks()` [源码:162](../../eyes/src/ui/views/StoryView.js#L162)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `setStorySlides(slides)` [源码:167](../../eyes/src/ui/views/StoryView.js#L167)：当前操作：写入 _story.slides；返回 无显式返回。
- `isStoryExit()` [源码:170](../../eyes/src/ui/views/StoryView.js#L170)：当前操作：写入 无直接字段写入；返回 this._isStoryExit。

## `eyes/src/ui/views/TelescopeView.js`

将路由生命周期转交望远镜组件。[源码](../../eyes/src/ui/views/TelescopeView.js)。语义状态：`verified-semantic-refactor`。

[总文档中的完整条目](README.md#file-eyes-src-ui-views-TelescopeView-js)

### `TelescopeView`

将路由生命周期转交望远镜组件；继承 ExtendedBaseView.default。父类 `ExtendedBaseView.default`。

- `onEnter(routeParams, preservedComponents=[])` [源码:4](../../eyes/src/ui/views/TelescopeView.js#L4)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onRouteChange(routeParams)` [源码:9](../../eyes/src/ui/views/TelescopeView.js#L9)：望远镜组件先接收路由，再执行基类的资源与相机生命周期；查询参数和退出通知也转交同一组件，保持其状态所有权。
- `_updateResources(routeParams)` [源码:13](../../eyes/src/ui/views/TelescopeView.js#L13)：当前操作：写入 _target；返回 无显式返回。
- `processQuery(routeParams)` [源码:17](../../eyes/src/ui/views/TelescopeView.js#L17)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `_updateComponents(routeParams)` [源码:21](../../eyes/src/ui/views/TelescopeView.js#L21)：当前操作：写入 _entityInfo；返回 无显式返回。
- `_updateCamera(routeParams)` [源码:30](../../eyes/src/ui/views/TelescopeView.js#L30)：当前操作：写入 无直接字段写入；返回 无显式返回。
- `onLeave(routeParams)` [源码:34](../../eyes/src/ui/views/TelescopeView.js#L34)：当前操作：写入 无直接字段写入；返回 无显式返回。
