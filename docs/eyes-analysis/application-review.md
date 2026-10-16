# 应用层逐文件中文参考

范围：`eyes/src/` 排除 `engine/`、`vendor/`，共 224 个当前文件。类与方法项目根据实际源码声明及调用提取；调用摘要描述可见副作用，不声称恢复压缩前的局部命名或作者意图。完整结构化索引见 `application-notes.json`。其中 66 个类的 AST 方法/访问器共 924 项（文本摘要初始匹配 910 项），结构覆盖不等于逐分支人工正确性验证。核心启动、组件与路由经过人工语义复核，其他方法给出实际调用、写入和依赖证据。

## 启动与模块边界

`main.js:2` 首先导入 `PreloadManager`，预加载模块在末尾创建单例并建立加载界面；随后导入样式占位和 `SolarSystemApp`。`SolarSystemApp` 继承 `Eyes.BaseApp`，构造器提供 TimeInfo、SceneInfo、ViewInfo、组件配置及视图构造器。`setUpRoutes` 按声明顺序加入首页、故事、对象、比较、望远镜、距离、特征及事件路由。`setUpManagers` 接入 link/cameraFollow/trajectory，向 content 注册故事，向 search 提供实体数据库，再初始化 title/autoplay。

`framework/eyes/public-api.js` 和 `app/public-api.js` 是不同层的聚合接口。它们与组件及 SolarSystemApp 相互引用，形成原生 ESM 循环。命名空间导入延迟读取有助于保留运行时关系；不能随意把字段访问改成求值期解构或合并同名类。`Recovered from app.js:start-end` 中数字是来源 bundle 的字符区间，不是当前源码行号、类型 id 或 NASA 资产版本。

## DOM 与组件所有权

`BaseComponent.js:4` 构造器保存 app、根节点、parent、config、params、state、子组件及回调表。`init` 从静态 html 生成节点，扫描 `key` 到 `_children`，把完整 `{{stateKey}}` 文本或 class 占位登记到 `_vars`。模板 `on*="method"` 解析成当前实例方法后删除原始属性；它不是 React 或浏览器内联脚本执行。`setState` 浅比较并保存 `_oldState`，仅为变化键触发 `_render`。HTML 状态可能 replaceChild，绑定目标会更新。

`setEnabled` 控制 __enable/__disable 和子组件启用；show/hide 只改变可见性状态。业务订阅通过 `_callbackRegistry` 对称注册移除。已观察到 resize 监听器身份不匹配，属于现状风险，本参考没有修改行为。constructor 对传入 options 删除 config/params，调用者不得默认输入对象保持不变。

## 路由、视图和管理器调用链

`BaseView.onRouteChange` 顺序为 before → reset → resources → processQuery（速率、时间、图层、标题）→ components visibility → ready → camera → loading → after；cancelToken 在阶段之间阻止陈旧结果继续提交。`onEnter` 根据 ViewInfo 启停组件并添加 body view class；onLeave 移除订阅、清除 selection/forceLoad 和该视图专属 query。`ExtendedBaseView` 加入 embed/kiosk/locked、内容面板偏移、控件显示规则。

ObjectView 准备目标及父子实体、描述、事件、轨道和相机跟随；FeatureView 将特征与对象内容分开；EventView 将时间收敛到事件并支持重播；HomeView 管理精选故事；CompareView 控制比较和照片模式；DistanceView 校验源目标时间覆盖交集；TelescopeView 委托 Telescope 组件；StoryView 在故事与 slide 切换中保存/恢复时钟、点击性和相机状态。每个文件下列出的 manager/component dependencies 是实际字符串查询。

## 故事与未知模块的已验证关联

`engine/core/STORIES.js:9` 的注册表提供精确关联：Unidentified1081 → AnnularSolarEclipseStory；1082 → TotalSolarEclipseStory；1083 → EnceladusDiscoveryStory；1084 → VoyagerGrandTourStory；1085 → ParkerSolarProbePerihelionStory。这是模块语义名，不能自动作为内部所有 helper class 的名字。`StoryCatalog` 提供卡片和 slide 元数据，注册表提供实际故事行为。数据 Unidentified381/916 是两份 2021a 时区表；Unidentified775 是分类精选实体列表。

## 模板、样式与配置

ViewInfo 的 class 对应 app/config/views 构造器；components 数组对应 app/config/components 的 name。组件类静态 html 指向 templates 中具体模板；同名 DescriptionBlock 有故事层（-541）和应用对象层（-1005）两个构造器，分别继承 StoryBaseContentBlock、BaseContentBlock，不能按显示类名合并。所有 extracted 样式文件当前只有来源注释，逐文件确认无 CSS 实现。不要据文件名描述不存在的颜色、动画或选择器。

## 逐文件与类方法目录

### `eyes/src/app/config/components.js`

组件名称、类型、实例选项及 postCreationFunction 配置。

- `imports: ../../framework/eyes/index.js, ./settings.js`
- `manager dependencies: cameraFollow`
- `component dependencies: settings, distancePanel`

### `eyes/src/app/config/settings.js`

设置及分享/嵌入 UI 使用的选项定义。

### `eyes/src/app/config/views.js`

视图构造器注册表，与 ViewInfo class 字段对应。

- `imports: ../../ui/views/CompareView.js, ../../ui/views/EventView.js, ../../ui/views/FeatureView.js, ../../ui/views/HomeView.js, ../../ui/views/ObjectView.js, ../../ui/views/StoryView.js, ../../ui/views/TelescopeView.js, ../../ui/views/DistanceView.js`

### `eyes/src/app/PreloadManager.js`

在应用依赖图加载前显示普通或嵌入模式加载界面并更新进度。

- `imports: ../data/StoryCatalog.json, ../data/EntityCatalog.json`

**PreloadManager**：在应用依赖图加载前显示普通或嵌入模式加载界面并更新进度。

- `constructor`：建立实例初始字段和依赖；调用 this._isEmbed, this._isInteractPrompt, this._showEmbedScreen, this._showLoadingScreen；写入 _isTouch, _canHover, _embedEl, _loadingScreenEl, _storyList, _entityInfo, _urlParams, _hashRoute。
- `_isEmbed`：执行 _isEmbed 对应的组件业务步骤；调用 this._urlParams.get。
- `_isInteractPrompt`：执行 _isInteractPrompt 对应的组件业务步骤；调用 this._urlParams.get。
- `_showLoadingScreen`：执行 _showLoadingScreen 对应的组件业务步骤；调用 this._loadingScreenEl.appendChild, Math.random, this._loadingScreenEl.classList.add。
- `_showEmbedScreen`：执行 _showEmbedScreen 对应的组件业务步骤；调用 this._embedEl.appendChild, this._getTitleFromURL, this._embedEl.classList.add, this.updateEmbedLoadPercent。
- `showEmbedInteraction`：执行 showEmbedInteraction 对应的组件业务步骤；调用 this._embedEl.classList.remove, this._embedEl.classList.add。
- `showEmbedViewButton`：执行 showEmbedViewButton 对应的组件业务步骤；调用 this._embedEl.classList.remove, this._embedEl.classList.add, this.showEmbedInteraction。
- `_getTitleFromURL`：执行 _getTitleFromURL 对应的组件业务步骤；调用 this._hashRoute.includes, this._hashRoute.split, this._urlParams.get, this._getNameFromEntityInfo。
- `_getNameFromEntityInfo`：执行 _getNameFromEntityInfo 对应的组件业务步骤。
- `hideLoadingScreen`：执行 hideLoadingScreen 对应的组件业务步骤；调用 this._loadingScreenEl.classList.remove, this._loadingScreenEl.remove。
- `updateEmbedLoadPercent`：执行 updateEmbedLoadPercent 对应的组件业务步骤。
- `embedLoading`：执行 embedLoading 对应的组件业务步骤。

### `eyes/src/app/public-api.js`

公共导出适配层，将已恢复模块按应用接口重新导出。

- `imports: ./version.js, ./SolarSystemApp.js, ../engine/managers/TimeManager-922.js, ../engine/managers/LinkManager.js, ../engine/managers/LabelManager-924.js, ../engine/managers/SelectionManager-925.js, ../engine/managers/TrajectoryManager.js, ../ui/components/MobileExpandButton.js, ../ui/components/Menu.js, ../engine/core/BaseContentBlock.js, ../engine/core/OptionsBlock.js, ../ui/components/FeaturedStoryBlock.js, ../ui/components/EventsBlock.js, ../ui/components/OverviewBlock.js, ../ui/components/DescriptionBlock-1005.js, ../ui/components/FeaturedMoonsBlock.js, ../ui/components/FeaturedEventsBlock.js, ../ui/components/ExplorationBlock.js, ../ui/components/ToolboxBlock.js, ../ui/components/CameraViewBlock.js, ../ui/components/SpecialFeaturesBlock.js, ../ui/components/ReplayBlock.js, ../ui/components/LayersBlock.js, ../ui/components/InstrumentFOVBlock.js, ../ui/components/SurfaceMapBlock.js, ../ui/components/TextureQualityBlock.js, ../ui/components/FeaturesBlock.js, ../ui/components/RelatedBlock.js, ../ui/components/ContentPanel.js, ../ui/components/FeaturedStoriesPanel.js, ../ui/components/Comparison.js, ../ui/components/InfoPanel.js, ../ui/components/DistancePanel.js, ../ui/components/EventsTimeline.js, ../ui/components/CollapsibleMenu.js, ../ui/components/CollapsibleMenuItem.js, ../ui/components/TimeControls.js, ../ui/components/Telescope.js, ../engine/core/Search.js, ../engine/core/KioskMode.js, ../engine/core/Settings.js, ../engine/core/Types-1075.js, ./version.js, ../engine/core/BaseContentBlock.js, ../ui/components/CameraViewBlock.js, ../ui/components/CollapsibleMenu.js, ../ui/components/CollapsibleMenuItem.js, ../ui/components/Comparison.js, ../ui/components/ContentPanel.js, ../ui/components/DescriptionBlock-1005.js, ../ui/components/DistancePanel.js, ../ui/components/EventsBlock.js, ../ui/components/EventsTimeline.js, ../ui/components/ExplorationBlock.js, ../ui/components/FeaturedEventsBlock.js, ../ui/components/FeaturedMoonsBlock.js, ../ui/components/FeaturedStoriesPanel.js, ../ui/components/FeaturedStoryBlock.js, ../ui/components/FeaturesBlock.js, ../ui/components/InfoPanel.js, ../ui/components/InstrumentFOVBlock.js, ../engine/core/KioskMode.js, ../engine/managers/LabelManager-924.js, ../ui/components/LayersBlock.js, ../engine/managers/LinkManager.js, ../ui/components/Menu.js, ../ui/components/MobileExpandButton.js, ../engine/core/OptionsBlock.js, ../ui/components/OverviewBlock.js, ../ui/components/RelatedBlock.js, ../ui/components/ReplayBlock.js, ../engine/core/Search.js, ../engine/managers/SelectionManager-925.js, ../engine/core/Settings.js, ./SolarSystemApp.js, ../ui/components/SpecialFeaturesBlock.js, ../ui/components/SurfaceMapBlock.js, ../ui/components/Telescope.js, ../ui/components/TextureQualityBlock.js, ../ui/components/TimeControls.js, ../engine/managers/TimeManager-922.js, ../ui/components/ToolboxBlock.js, ../engine/managers/TrajectoryManager.js, ../engine/core/Types-1075.js`

- 注意：聚合模块参与循环依赖；导出绑定存在不代表导入求值时即可安全读取所有类。

### `eyes/src/app/SolarSystemApp.js`

装配太阳系应用的路由、管理器、组件配置和启动实例。

- `imports: ../framework/eyes/index.js, ../styles/index.js, ./config/components.js, ../data/TimeInfo.json, ../data/SceneInfo.json, ../data/ViewInfo.json, ./config/views.js, ../engine/core/STORIES.js, ../ui/templates/SolarSystemAppTemplate.html, ./public-api.js, ../engine/solar-system/public-api.js, ./PreloadManager.js`
- `manager dependencies: router, content, search, layer`
- `component dependencies: menu, layerPanel, breadcrumb`

**SolarSystemApp**：装配太阳系应用的路由、管理器、组件配置和启动实例；继承 Eyes.BaseApp。

- `constructor`：建立实例初始字段和依赖；写入 _timeInfo, _sceneInfo, _viewClasses, _viewInfo, _componentInfo。
- `init`：初始化模板与关联资源；调用 super.init, SolarSystemSceneExports.Entity._entities.get, PreloadManager.default.hideLoadingScreen, PreloadManager.default.updateEmbedLoadPercent, this.getComponent。
- `setUpRoutes`：执行 setUpRoutes 对应的组件业务步骤；调用 this.getManager。
- `setUpScene`：执行 setUpScene 对应的组件业务步骤；调用 super.setUpScene, this.scene.getLoadedPromise。
- `setUpManagers`：执行 setUpManagers 对应的组件业务步骤；调用 super.setUpManagers, this.addManager, this.getManager, Manager.setStoryList, Manager.setStories, Manager.getEntityList, this.getView, SolarSystemPublicApi.Types.get。
- `setUpComponents`：执行 setUpComponents 对应的组件业务步骤；调用 super.setUpComponents, this.getManager, Manager.getLayer, this.getComponent, PanelComponent.toggleLayer。
- `getVersion`：执行 getVersion 对应的组件业务步骤。
- `getVersions`：执行 getVersions 对应的组件业务步骤；调用 this.getPioneerVersion, this.getEyesVersion, this.getVersion。

### `eyes/src/app/version.js`

保存恢复的 NASA 应用版本常量，不等于仓库发行版本。

### `eyes/src/data/EntityCatalog.json`

实体索引：名称、类别、可搜索性等元数据；供内容与搜索管理器使用。

- `top-level: observable_universe, milky_way, l1, l2, l3, l4, l5, sun, mercury, venus, earth, mars, jupiter, saturn, neptune, uranus, 134340_pluto, 134340_pluto_barycenter, 617_patroclus_barycenter, 21_lutetia, 253_mathilde, 11351_leucus, 15094_polymele, 21900_orus, 3548_eurybates, 5535_annefrank, 52246_donaldjohanson, 617_patroclus`

- 注意：JSON 只提供静态数据；运行时加载行为属于其引用者。

### `eyes/src/data/SceneInfo.json`

场景配置：静态组、动态实体、实体选项及 metadata URL。

- `top-level: zoomMax, staticEntityGroups, dynamicEntities, entityOptions, meta`

- 注意：JSON 只提供静态数据；运行时加载行为属于其引用者。

### `eyes/src/data/StoryCatalog.json`

故事卡片与 slide 目录；故事 id 与 STORIES 注册键对应。

- `top-level: stories, external, internal, featured`

- 注意：JSON 只提供静态数据；运行时加载行为属于其引用者。

### `eyes/src/data/TimeInfo.json`

默认时间范围 1949-12-31 至 2049-12-31 UTC。

- `top-level: limits`

- 注意：JSON 只提供静态数据；运行时加载行为属于其引用者。

### `eyes/src/data/Unidentified381.json`

Moment Timezone 打包时区数据库，版本 2021a。

- `top-level: version, zones, links, countries`

- 注意：JSON 只提供静态数据；运行时加载行为属于其引用者。

### `eyes/src/data/Unidentified775.json`

按 Planet/Moon/Spacecraft 等类别列出的精选搜索实体 id。

- `top-level: Planet, Moon, Asteroid, Comet, DwarfPlanet, Spacecraft, default`

- 注意：JSON 只提供静态数据；运行时加载行为属于其引用者。

### `eyes/src/data/Unidentified916.json`

第二份 Moment Timezone 打包时区数据库，版本 2021a。

- `top-level: version, zones, links, countries`

- 注意：JSON 只提供静态数据；运行时加载行为属于其引用者。

### `eyes/src/data/ViewInfo.json`

视图类、名称及启用组件列表的声明式映射。

- `top-level: home, object, story, compare, event, telescope, feature, distance`

- 注意：JSON 只提供静态数据；运行时加载行为属于其引用者。

### `eyes/src/framework/eyes/index.js`

模块聚合入口，使用显式导出或副作用 import 连接依赖。

- `imports: ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js, ./public-api.js`

- 注意：聚合模块参与循环依赖；导出绑定存在不代表导入求值时即可安全读取所有类。

### `eyes/src/framework/eyes/public-api.js`

公共导出适配层，将已恢复模块按应用接口重新导出。

- `imports: ../../engine/core/version-8.js, ../../engine/components/OrbiterLineOfSightComponent.js, ../../engine/components/DistanceLineComponent.js, ../../engine/core/CancelToken.js, ../../engine/core/AppUtils.js, ../../engine/core/AnimationUtils.js, ../../ui/components/BaseComponent.js, ../../engine/core/SettingsEntry.js, ../../engine/core/LoadIconEntry.js, ../../engine/core/OverlayEntry.js, ../../engine/core/SearchEntry.js, ../../engine/core/ClockEntry.js, ../../engine/core/ClockShortcutEntry.js, ../../engine/core/CarouselEntry.js, ../../engine/core/TutorialOverlayEntry.js, ../../engine/core/CarouselPanelEntry.js, ../../engine/core/ShareModalEntry.js, ../../engine/core/TimeControllerEntry.js, ../../engine/core/CheckboxMultistate.js, ../../ui/components/LayerPanel.js, ../../ui/components/Breadcrumb.js, ../../engine/core/StoryBaseContentBlock.js, ../../ui/components/HintBlock.js, ../../ui/components/ToggleBlock.js, ../../ui/components/TitleBlock.js, ../../ui/components/ImageBlock.js, ../../ui/components/DescriptionBlock-541.js, ../../ui/components/ReplayButtonBlock.js, ../../ui/components/ButtonsBlock.js, ../../ui/components/CheckboxBlock.js, ../../engine/core/Story.js, ../../ui/components/KioskBase.js, ../../ui/components/Toast.js, ../../engine/managers/BaseManager.js, ../../engine/managers/SelectionManager-562.js, ../../engine/managers/LabelManager-563.js, ../../engine/managers/RouteManager.js, ../../engine/managers/ContentManager.js, ../../engine/managers/SceneManager.js, ../../engine/managers/WMTSManager.js, ../../engine/managers/LayerManager.js, ../../engine/managers/TrailManager.js, ../../engine/managers/CameraManager.js, ../../engine/core/CameraScripts.js, ../../engine/managers/ERTManager.js, ../../engine/managers/TimeManager-728.js, ../../engine/managers/ComparisonManager.js, ../../engine/managers/SearchManager.js, ../../engine/managers/TitleManager.js, ../../engine/managers/SpoutManager.js, ../../engine/managers/CameraFollowManager.js, ../../engine/managers/AutoplayManager.js, ../../ui/views/BaseView.js, ../../engine/core/BaseApp.js, ../../engine/core/Types-754.js, ../../engine/core/AnimationUtils.js, ../../engine/core/AppUtils.js, ../../engine/managers/AutoplayManager.js, ../../engine/core/BaseApp.js, ../../ui/components/BaseComponent.js, ../../engine/managers/BaseManager.js, ../../ui/views/BaseView.js, ../../ui/components/Breadcrumb.js, ../../ui/components/ButtonsBlock.js, ../../engine/managers/CameraFollowManager.js, ../../engine/managers/CameraManager.js, ../../engine/core/CameraScripts.js, ../../engine/core/CancelToken.js, ../../engine/core/CarouselEntry.js, ../../engine/core/CarouselPanelEntry.js, ../../engine/core/CheckboxMultistate.js, ../../ui/components/CheckboxBlock.js, ../../engine/core/CheckboxMultistate.js, ../../engine/core/ClockEntry.js, ../../engine/core/ClockShortcutEntry.js, ../../engine/managers/ComparisonManager.js, ../../engine/managers/ContentManager.js, ../../ui/components/DescriptionBlock-541.js, ../../engine/components/DistanceLineComponent.js, ../../engine/managers/ERTManager.js, ../../engine/core/version-8.js, ../../ui/components/HintBlock.js, ../../ui/components/ImageBlock.js, ../../ui/components/KioskBase.js, ../../engine/managers/LabelManager-563.js, ../../engine/managers/LayerManager.js, ../../ui/components/LayerPanel.js, ../../engine/core/LoadIconEntry.js, ../../engine/components/OrbiterLineOfSightComponent.js, ../../engine/core/OverlayEntry.js, ../../ui/components/ReplayButtonBlock.js, ../../engine/managers/RouteManager.js, ../../engine/managers/SceneManager.js, ../../engine/core/SearchEntry.js, ../../engine/managers/SearchManager.js, ../../engine/managers/SelectionManager-562.js, ../../engine/core/SettingsEntry.js, ../../engine/core/ShareModalEntry.js, ../../engine/managers/SpoutManager.js, ../../engine/core/Story.js, ../../engine/core/StoryBaseContentBlock.js, ../../engine/core/TimeControllerEntry.js, ../../engine/managers/TimeManager-728.js, ../../ui/components/TitleBlock.js, ../../engine/managers/TitleManager.js, ../../ui/components/Toast.js, ../../ui/components/ToggleBlock.js, ../../engine/managers/TrailManager.js, ../../engine/core/TutorialOverlayEntry.js, ../../engine/core/Types-754.js, ../../engine/managers/WMTSManager.js`

- 注意：聚合模块参与循环依赖；导出绑定存在不代表导入求值时即可安全读取所有类。

### `eyes/src/main.js`

启动入口：先加载 preload，再初始化应用依赖图。

- `imports: ./app/PreloadManager.js, ./styles/extracted/PreloadStyles.js, ./styles/extracted/VendorStyles.js, ./app/SolarSystemApp.js`

### `eyes/src/runtime/decoder-paths.js`

按 decoder manifest revision 构造解码器资源绝对 URL。

- `imports: ../../decoders/manifest.json`

### `eyes/src/runtime/interop.cjs`

兼容 CommonJS/ESModule 默认导出访问器。

### `eyes/src/styles/extracted/AppUtilsStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/BaseContentBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/BreadcrumbStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/ButtonsBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/CameraViewBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/CheckboxBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/CollapsibleMenuItemStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/CollapsibleMenuStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/ComparisonStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/ContentPanelStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/DescriptionBlockStyles-1007.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/DescriptionBlockStyles-543.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/DistancePanelStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/EventsBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/EventsTimelineStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/FeaturedStoriesPanelStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/FeaturedStoryBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/HintBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/ImageBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/InfoPanelStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/InstrumentFOVBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/KioskBaseStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/LayerPanelStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/MenuStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/MobileExpandButtonStyles-928.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/MobileExpandButtonStyles-987.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/OptionsBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/OverviewBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/PreloadStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/RelatedBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/ReplayBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/ReplayButtonBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/SpecialFeaturesBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/StoryBaseContentBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/StoryStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/TelescopeStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/TextureQualityBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/TimeControlsStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/ToastStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/ToggleBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/ToolboxBlockStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/TutorialOverlayStyles-497.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/TutorialOverlayStyles-498.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/TutorialOverlayStyles-499.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/TutorialOverlayStyles-500.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified226.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified227.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified231.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified235.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified239.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified383.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified387.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified392.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified502.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified506.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified507.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified512.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified516.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified521.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified739.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified740.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified741.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified742.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified743.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified744.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified745.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified746.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified747.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified748.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified749.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified750.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified751.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified756.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified757.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified758.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified759.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified760.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified761.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified762.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified763.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified764.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified765.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/Unidentified766.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/extracted/VendorStyles.js`

恢复的样式模块占位；当前文件只有来源注释，没有 CSS 注入或导出。

- 注意：不要把占位模块误写成包含完整原始 CSS；原始 bundle 区间只是溯源位置。

### `eyes/src/styles/index.js`

模块聚合入口，使用显式导出或副作用 import 连接依赖。

- `imports: ./extracted/Unidentified756.js, ./extracted/Unidentified757.js, ./extracted/Unidentified758.js, ./extracted/Unidentified759.js, ./extracted/Unidentified760.js, ./extracted/Unidentified761.js, ./extracted/Unidentified762.js, ./extracted/Unidentified763.js, ./extracted/Unidentified764.js, ./extracted/Unidentified765.js, ./extracted/Unidentified766.js`

### `eyes/src/ui/components/BaseComponent.js`

组件模板、状态绑定、DOM 挂载和回调订阅的共同基类。

- `imports: ../../framework/eyes/public-api.js`

**BaseComponent**：组件模板、状态绑定、DOM 挂载和回调订阅的共同基类。

- `components`：执行 components 对应的组件业务步骤。
- `app`：执行 app 对应的组件业务步骤。
- `resize`：重排响应式界面；调用 this._updateFontSize。
- `_updateFontSize`：执行 _updateFontSize 对应的组件业务步骤；调用 EyesPublicApi.AppUtils.isMobile, EyesPublicApi.AppUtils.isTablet, EyesPublicApi.AppUtils.isPanorama, EyesPublicApi.AppUtils.is2K, EyesPublicApi.AppUtils.is4K, this.setState。
- `element`：执行 element 对应的组件业务步骤。
- `getParent`：执行 getParent 对应的组件业务步骤。
- `setParent`：执行 setParent 对应的组件业务步骤；调用 this._parent.removeChild, this._parent.appendChild；写入 _parent。
- `init`：初始化模板与关联资源；调用 Object.assign, EyesPublicApi.AppUtils.htmlWithParamsToElement, this._element.classList.add, this._setVariables, this._setEventHandlersFromAttributes, this._updateFontSize；写入 _element。
- `getConfig`：执行 getConfig 对应的组件业务步骤。
- `setConfig`：执行 setConfig 对应的组件业务步骤；调用 Object.assign。
- `bindFunctions`：执行 bindFunctions 对应的组件业务步骤。
- `isEnabled`：执行 isEnabled 对应的组件业务步骤。
- `setEnabled`：切换当前组件及其子组件的启用状态；调用 this.__enable, this.__disable, this._components.forEach, this._app.getComponent；写入 _enabled。
- `destroy`：执行 destroy 对应的组件业务步骤；调用 this.__destroy。
- `show`：执行 show 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
- `hide`：执行 hide 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
- `toggle`：执行 toggle 对应的组件业务步骤；调用 this.hide, this.show。
- `loadHTML`：执行 loadHTML 对应的组件业务步骤；调用 this._parseHTML。
- `getState`：读取已登记状态键。
- `addState`：执行 addState 对应的组件业务步骤；调用 this._setVariables。
- `setState`：合并变化状态并更新对应 DOM 绑定；调用 EyesPublicApi.AppUtils.isEmptyObject, this._render；写入 _oldState, _state。
- `_parseHTML`：执行 _parseHTML 对应的组件业务步骤；调用 EyesPublicApi.AppUtils.htmlToElements, this._setVariables, this._setEventHandlersFromAttributes；写入 _roots。
- `_containVar`：执行 _containVar 对应的组件业务步骤。
- `_splitNonEmpty`：执行 _splitNonEmpty 对应的组件业务步骤。
- `_setVariables`：扫描 key 与双花括号占位符，建立 DOM 状态索引；调用 this._containVar, Var.startsWith, Var.endsWith, Var.replace, List.remove, this._splitNonEmpty, List.add, EyesPublicApi.AppUtils.isHTML, EyesPublicApi.AppUtils.htmlToElement, Node.replaceChild, EyesPublicApi.AppUtils.hasHTML, this._setVariables。
- `_setEventHandlersFromAttributes`：把模板 on* 属性解析为绑定当前实例的事件监听器；调用 this._setEventHandlersFromAttributes。
- `_render`：将变化的状态写到文本、HTML 或 classList 绑定；调用 Object.keys, this._splitNonEmpty, EyesPublicApi.AppUtils.isHTML, EyesPublicApi.AppUtils.htmlToElement, Node.replaceChild, EyesPublicApi.AppUtils.hasHTML。
- `__enable`：挂载 DOM 并登记窗口和业务订阅；调用 this.registerCallbacks, this._parent.appendChild, this.triggerCallbacks；写入 _resizeTimeout。
- `__disable`：卸载 DOM 并取消业务订阅；调用 this._parent.contains, this.triggerCallbacks, this._parent.removeChild, this.removeCallbacks；写入 _element。
- `__destroy`：执行停用并释放根节点和父节点引用；调用 this.__disable；写入 _element, _parent。
- `_initCallbacks`：执行 _initCallbacks 对应的组件业务步骤。
- `registerCallback`：执行 registerCallback 对应的组件业务步骤；调用 this._eventNames.indexOf。
- `removeCallback`：执行 removeCallback 对应的组件业务步骤；调用 this._eventNames.indexOf。
- `triggerCallbacks`：执行 triggerCallbacks 对应的组件业务步骤。
- `registerCallbacks`：登记跨组件或管理器事件订阅。
- `removeCallbacks`：移除本模块登记的事件订阅。

- 注意：constructor 会 delete options.config/options.params，调用者传入对象被原地修改。
- 注意：setState 仅在至少一个顶层键 !== 时渲染并回调；原地修改引用不会触发更新。
- 注意：模板 HTML 分支使用 innerHTML/replaceChild，必须确保传入内容可信；这里只记录边界，不改变 NASA 内容。
- 注意：__enable 注册匿名 resize 包装函数，__disable 却 removeEventListener(this.resize)：监听器身份不匹配，重复启停会累积窗口监听器。
- 注意：show/hide 与 setEnabled 分开：前者改变 class 与状态，后者控制 DOM 挂载及订阅。

### `eyes/src/ui/components/Breadcrumb.js`

将路由和目标层级转换为可点击面包屑。

- `imports: ../../framework/eyes/public-api.js, ../templates/BreadcrumbTemplate.html, ../../styles/extracted/BreadcrumbStyles.js`
- `manager dependencies: router, content`

**Breadcrumb**：将路由和目标层级转换为可点击面包屑；继承 EyesPublicApi.BaseComponent。

- `updateBreadcrumb`：执行 updateBreadcrumb 对应的组件业务步骤；调用 this._app.getManager, this._children.staticLogo.classList.add, this._children.static.classList.remove, this.setState, this._createCrumb, this._element.appendChild。
- `setCrumbClickHandler`：执行 setCrumbClickHandler 对应的组件业务步骤；写入 _onCrumbClick。
- `_goToHome`：执行 _goToHome 对应的组件业务步骤；调用 this._app.getManager, this._app.cameraScripts.goToSystem, Manager.navigate。
- `_getCrumbText`：执行 _getCrumbText 对应的组件业务步骤；调用 this._app.getManager。
- `_createCrumb`：执行 _createCrumb 对应的组件业务步骤；调用 this._app.getManager, this._onCrumbClick, this._getCrumbText。

### `eyes/src/ui/components/ButtonsBlock.js`

故事内容中的动作按钮组。

- `imports: ../../framework/eyes/public-api.js, ../templates/ButtonsBlockTemplate.html, ../../styles/extracted/ButtonsBlockStyles.js`
- `manager dependencies: time, content`
- `component dependencies: story`

**ButtonsBlock**：故事内容中的动作按钮组；继承 EyesPublicApi.StoryBaseContentBlock。

- `constructor`：建立实例初始字段和依赖；调用 this.setUpHTML；写入 _app, _options。
- `setUpHTML`：执行 setUpHTML 对应的组件业务步骤；调用 Content.forEach, List.add。

### `eyes/src/ui/components/CameraViewBlock.js`

对象内容中的相机视角选项。

- `imports: ../../engine/pioneer/index.js, ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/CameraViewBlockTemplate.html, ../../styles/extracted/CameraViewBlockStyles.js`
- `manager dependencies: content, scene, camera, cameraFollow, trajectory, router`

**CameraViewBlock**：对象内容中的相机视角选项；继承 SolarSystemPublicApi.BaseContentBlock。

- `constructor`：建立实例初始字段和依赖；调用 this._app.cameraScripts.goToCelestialObject, this._app.getManager, this._app.cameraScripts.goToSpacecraft, this._app.pioneer.getScene, this.app.getView, this._app.cameraScripts.alignObjects, this._app.cameraScripts.alignSpacecraftPlanet, this._app.cameraScripts.goToInstrument, this._app.cameraScripts.goToSystem, this._app.cameraScripts.showLocationInParentSystem, this._app.cameraScripts.showLocationInSolarSystem, this.app.getManager, FollowManager.initSearch, FollowManager.registerCallback；写入 onLoaded, _cameraOptions, _followId, _activeCameraOptions, _currentCameraView, _prevCameraView, _activeCamOptIndex, _prevCamOptIndex, _optionIndexMap, _trajectoryViewId, _defaultViewIndexOverride, _entityId。
- `_renderOptions`：执行 _renderOptions 对应的组件业务步骤；调用 Text.toLowerCase, this._goToView, this._activeCameraOptions.push, this._children.cameraOptions.appendChild, this._setVariables；写入 _activeCameraOptions, _currentCameraView, _prevCameraView, _activeCamOptIndex, _prevCamOptIndex, _optionIndexMap。
- `_addPlanetOptions`：执行 _addPlanetOptions 对应的组件业务步骤；调用 this._cameraOptions.nearObject, this._cameraOptions.system, this._cameraOptions.cameraFollow, this._renderOptions。
- `_addMoonOptions`：执行 _addMoonOptions 对应的组件业务步骤；调用 this._app.getManager, this._cameraOptions.nearObject, this._cameraOptions.system, this._cameraOptions.cameraFollow, this._renderOptions。
- `_addStarOptions`：执行 _addStarOptions 对应的组件业务步骤；调用 this._cameraOptions.nearObject, this._cameraOptions.system, this._cameraOptions.cameraFollow, this._renderOptions。
- `_addSpacecraftOptions`：执行 _addSpacecraftOptions 对应的组件业务步骤；调用 this._app.getManager, this._app.getView, Manager.getEntityInfo, this._app.pioneer.getScene, Manager.hasLanded, this._cameraOptions.nearEvent, this._cameraOptions.cameraFollow, this._cameraOptions.nearInstrument, this._cameraOptions.nearSpacecraft, this._cameraOptions.aboveParent, this.app.getManager, Manager.hasTrajectoryOptions, this._cameraOptions.trajectory, this._cameraOptions.alignSpacecraftPlanet。
- `_addFeatureOptions`：执行 _addFeatureOptions 对应的组件业务步骤；调用 this._cameraOptions.nearObject, this._cameraOptions.system, this._renderOptions。
- `_addDefaultOptions`：执行 _addDefaultOptions 对应的组件业务步骤；调用 this._app.getManager, Manager.getEntityInfo, this._cameraOptions.nearObject, this._cameraOptions.aboveParent, this._cameraOptions.cameraFollow, this._cameraOptions.aboveSun, this._renderOptions。
- `_goToView`：执行 _goToView 对应的组件业务步骤；调用 List.remove, List.add；写入 _prevCameraView, _currentCameraView, _prevCamOptIndex, _activeCamOptIndex。
- `goBackToPreviousView`：执行 goBackToPreviousView 对应的组件业务步骤；调用 this._selectDefaultView, this._goToView。
- `goToFollowCameraView`：执行 goToFollowCameraView 对应的组件业务步骤；调用 this._goToView；写入 _followId。
- `goToTrajectoryView`：执行 goToTrajectoryView 对应的组件业务步骤；调用 this._goToView。
- `goToDefaultView`：执行 goToDefaultView 对应的组件业务步骤；调用 this._selectDefaultView。
- `getCameraView`：执行 getCameraView 对应的组件业务步骤。
- `_selectDefaultView`：执行 _selectDefaultView 对应的组件业务步骤；调用 this._goToView。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this.app.getManager, FollowManager.setEnabled, this._app.getManager, this.setState, List.remove, this._addPlanetOptions, this._addMoonOptions, this._addStarOptions, this._addSpacecraftOptions, this._addFeatureOptions, this._addDefaultOptions, this._activeCameraOptions.find, this._processQuery, this._selectDefaultView；写入 _entityId, _defaultViewIndexOverride, onLoaded。
- `onQueryChange`：响应查询参数变化；调用 this._processQuery。
- `_processQuery`：执行 _processQuery 对应的组件业务步骤；调用 this.app.getManager, Manager.parseQuery, Manager.setEntitiesForceVisible, FollowManager.follow, FollowManager.setEnabled, this._selectDefaultView, Manager.hasTrajectoryOptions, this._app.getManager, Manager.setEnabled。
- `isLoaded`：执行 isLoaded 对应的组件业务步骤。

### `eyes/src/ui/components/Carousel.js`

轮播条目选择、滚动与响应式显示。

- `imports: ../../vendor/modules/animateFill-168.js, ../../framework/eyes/public-api.js, ../templates/CarouselTemplate-390.html, ../templates/CarouselTemplate-391.html`
- `manager dependencies: router, spout`

**Carousel**：轮播条目选择、滚动与响应式显示；继承 EyesPublicApi.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 EyesPublicApi.AppUtils.isPrimaryTouch, Object.assign, this._eventNames.push, this._initCallbacks, this.bindFunctions；写入 _children, _progressTooltip, _onEnter, _onLeave, _slideTypes, _currentInfo, _onSlideChange, _toggleControls。
- `currentInfo`：执行 currentInfo 对应的组件业务步骤。
- `_onControlsToggle`：执行 _onControlsToggle 对应的组件业务步骤；调用 this._toggleControls。
- `setOnControlsToggle`：执行 setOnControlsToggle 对应的组件业务步骤；写入 _toggleControls。
- `init`：初始化模板与关联资源；调用 super.init, this._children.carousel.classList.add, this._createSlideTrack, this._updateCarousel, this._children.carousel.addEventListener, this.setState, this._children.progress.addEventListener, this._onScroll；写入 _touchStartY。
- `resize`：重排响应式界面；调用 super.resize, this._updateTooltipsProps。
- `_updateTooltipsProps`：执行 _updateTooltipsProps 对应的组件业务步骤；调用 this._progressTooltip.setProps。
- `_createSlideTrack`：执行 _createSlideTrack 对应的组件业务步骤；调用 this._children.slides.forEach, this._children.track.appendChild, this._setSlideTrackDimensions。
- `_setSlideTrackDimensions`：执行 _setSlideTrackDimensions 对应的组件业务步骤；调用 this._updateTrackPosition。
- `_updateTrackPosition`：执行 _updateTrackPosition 对应的组件业务步骤。
- `_updateSlides`：执行 _updateSlides 对应的组件业务步骤；调用 List.remove, List.add。
- `_updateCarousel`：执行 _updateCarousel 对应的组件业务步骤；调用 this._updateTrackPosition, this._updateSlides。
- `_onScroll`：执行 _onScroll 对应的组件业务步骤；调用 this.expand, Target.querySelector, Math.ceil, this.goToPrevSlide, this.goToNextSlide, this.setState。
- `addSlides`：执行 addSlides 对应的组件业务步骤；调用 this.addSlide。
- `onEnter`：进入视图时准备界面和订阅。
- `onLeave`：离开视图时恢复状态并解除订阅。
- `goToSlide`：执行 goToSlide 对应的组件业务步骤；调用 this.app.getManager, this.onLeave, this.setState, this._updateCarousel, this.triggerCallbacks, this._progressTooltip.setContent, this._updateTooltipsProps, this._progressTooltip.show, this.onEnter。
- `goToPrevSlide`：执行 goToPrevSlide 对应的组件业务步骤；调用 this._onSlideChange。
- `goToNextSlide`：执行 goToNextSlide 对应的组件业务步骤；调用 this._onSlideChange。
- `goToFirstSlide`：执行 goToFirstSlide 对应的组件业务步骤；调用 this._onSlideChange。
- `isVisible`：执行 isVisible 对应的组件业务步骤。
- `collapse`：执行 collapse 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
- `expand`：执行 expand 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
- `close`：执行 close 对应的组件业务步骤。
- `show`：执行 show 对应的组件业务步骤；调用 super.show, this._updateCarousel, this._progressTooltip.show。
- `clear`：执行 clear 对应的组件业务步骤；写入 _onEnter, _onLeave, _currentInfo。
- `_toggleCollapse`：执行 _toggleCollapse 对应的组件业务步骤；调用 this.expand, this.collapse。

### `eyes/src/ui/components/CarouselPanel.js`

轮播面板及其条目生命周期。

- `imports: ../../vendor/modules/A11y.js, ../../framework/eyes/public-api.js, ../templates/CarouselPanelTemplate.html`
- `manager dependencies: layer`
- `component dependencies: definitionOverlay`

**CarouselPanel**：轮播面板及其条目生命周期；继承 EyesPublicApi.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 this._eventNames.push, this._initCallbacks, this.bindFunctions；写入 _swiper, _tabIndices, _activeTabIndex, _tabElements, _bulletClass, _activeBulletClass, _swiperSlideClass, _onSlideChange, _expandOnShow, _orientation, _resizeTimeout, _isInitialized。
- `_addEvents`：执行 _addEvents 对应的组件业务步骤；调用 this._swiper.on, this._onSlideChange, Instance.scroll, this._tabIndices.findIndex, this._tabElements.forEach, List.toggle, this._createBullets, this._setActiveBullet, this._children.swiperSlides.addEventListener, this._app.getComponent；写入 _activeTabIndex。
- `_hasOrientationChanged`：执行 _hasOrientationChanged 对应的组件业务步骤；调用 EyesPublicApi.AppUtils.isPortrait；写入 _orientation。
- `_addScrollbars`：执行 _addScrollbars 对应的组件业务步骤；调用 this._hasOrientationChanged, List.add, EyesPublicApi.AppUtils.addScrollbar, Instance.scroll。
- `createTabs`：执行 createTabs 对应的组件业务步骤；调用 this._destroy, this._tabIndices.push, this._createSlideElements, this.addSlide, this._children.tabsContainer.replaceChildren, this.setState；写入 _tabIndices, _activeTabIndex, _tabElements。
- `_createSlideElements`：执行 _createSlideElements 对应的组件业务步骤。
- `_createBullets`：执行 _createBullets 对应的组件业务步骤；调用 List.add, this._swiper.slideTo, List.remove, this._setActiveBullet, List.contains。
- `_setActiveBullet`：执行 _setActiveBullet 对应的组件业务步骤；调用 Nodes.forEach, List.remove, List.add。
- `addSlide`：执行 addSlide 对应的组件业务步骤；调用 this._children.swiperSlides.append。
- `initSwiper`：执行 initSwiper 对应的组件业务步骤；调用 EyesPublicApi.AppUtils.elementReady, this._swiper.update, this._addScrollbars, this._createBullets, this._swiper.slideTo, A11y.default, this._postSwiperInitFunction；写入 _swiper。
- `_postSwiperInitFunction`：执行 _postSwiperInitFunction 对应的组件业务步骤；调用 this._addEvents, this._addScrollbars, this._createBullets, this._swiper.update, this._swiper.slideTo。
- `_destroy`：执行 _destroy 对应的组件业务步骤。
- `_onTabClick`：执行 _onTabClick 对应的组件业务步骤；调用 this._tabElements.findIndex, this._swiper.slideTo。
- `expand`：执行 expand 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
- `collapse`：执行 collapse 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
- `setExpandState`：执行 setExpandState 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
- `show`：执行 show 对应的组件业务步骤；调用 this._app.getManager, this.setState, this.triggerCallbacks, super.show, this.initSwiper。
- `hide`：执行 hide 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks；写入 _isInitialized。
- `resize`：重排响应式界面；调用 this._addScrollbars；写入 _resizeTimeout。

### `eyes/src/ui/components/Checkbox.js`

复选输入状态与 change 回调。

- `imports: ../../framework/eyes/public-api.js, ../templates/CheckboxMultistateTemplate.html`

**Checkbox**：复选输入状态与 change 回调；继承 EyesPublicApi.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 Object.assign, this.bindFunctions。
- `init`：初始化模板与关联资源；调用 super.init, this._element.setAttribute, this._element.addEventListener。
- `toggle`：执行 toggle 对应的组件业务步骤；调用 this.setState, this._config.function。

### `eyes/src/ui/components/CheckboxBlock.js`

故事内容中的复选项组。

- `imports: ../../framework/eyes/public-api.js, ../templates/CheckboxBlockTemplate.html, ../../styles/extracted/CheckboxBlockStyles.js`

**CheckboxBlock**：故事内容中的复选项组；继承 EyesPublicApi.StoryBaseContentBlock。

- `constructor`：建立实例初始字段和依赖；调用 this.setUpHTML；写入 options。
- `setUpHTML`：执行 setUpHTML 对应的组件业务步骤；调用 Content.forEach, List.add。
- `setChecked`：执行 setChecked 对应的组件业务步骤。

### `eyes/src/ui/components/CheckboxMultistate.js`

扩展复选框以表示多个状态。

- `imports: ../../framework/eyes/public-api.js, ./Checkbox.js, ../templates/CheckboxMultistateTemplate.html`

**CheckboxMultistate**：扩展复选框以表示多个状态；继承 Checkbox.Checkbox。

- `constructor`：建立实例初始字段和依赖；调用 this._initStates, this.bindFunctions；写入 _numStates。
- `_initStates`：执行 _initStates 对应的组件业务步骤；调用 Object.assign, Array.from, this.setState。
- `init`：初始化模板与关联资源；调用 super.init, this._element.setAttribute, this._element.removeEventListener, this._element.addEventListener。
- `setNumStates`：执行 setNumStates 对应的组件业务步骤；调用 this._initStates；写入 _numStates。
- `getCurrentStateIndex`：执行 getCurrentStateIndex 对应的组件业务步骤。
- `setClassesForIndex`：执行 setClassesForIndex 对应的组件业务步骤；调用 Object.keys, Array.from, this.setState。
- `cycle`：执行 cycle 对应的组件业务步骤；调用 this.setState, this._config.function。

### `eyes/src/ui/components/Clock.js`

时间编辑、显示、时区和边界提示。

- `imports: ../../framework/eyes/public-api.js, ../../vendor/modules/FollowName.cjs, ../templates/ClockTemplate.html`
- `manager dependencies: time, router`

**Clock**：时间编辑、显示、时区和边界提示；继承 EyesPublicApi.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 Object.assign, this.bindFunctions。
- `init`：初始化模板与关联资源；调用 super.init, this._app.getManager, Container.classList.add, Input.addEventListener, Form.classList.add, Form.addEventListener, Input.blur, this._parseTime, Container.classList.remove, this._setVariables, this._children.date.classList.add, this._children.time.classList.add, this._children.meridiem.classList.add, this._children.timeInput.classList.add。
- `onDateTimeClick`：执行 onDateTimeClick 对应的组件业务步骤；调用 this._app.getManager, Route.url.includes, Container.classList.add, Form.classList.remove, Input.focus。
- `isERT`：执行 isERT 对应的组件业务步骤。
- `toggle`：执行 toggle 对应的组件业务步骤；调用 this.setState。
- `_parseTime`：执行 _parseTime 对应的组件业务步骤；调用 this._app.getManager, Manager.navigate。
- `update`：执行 update 对应的组件业务步骤；调用 this.setState, this._app.getManager。
- `backToLive`：执行 backToLive 对应的组件业务步骤；调用 this._app.getManager, Manager.isNow, Manager.getTimeUrl, Manager.getNow, Manager.navigate, Manager.setTimeRate, Manager.setToNow。
- `setLimitMessage`：执行 setLimitMessage 对应的组件业务步骤；调用 this._app.getManager, this._app.getView, this._displayLimitMessage；写入 limitMessageTimeout。
- `_displayLimitMessage`：执行 _displayLimitMessage 对应的组件业务步骤；调用 List.toggle。
- `__disable`：卸载 DOM 并取消业务订阅；调用 this._displayLimitMessage, super.__disable。

### `eyes/src/ui/components/ClockShortcut.js`

快速日期时间选择入口。

- `imports: ../../vendor/modules/animateFill-168.js, ../../vendor/modules/FollowName.cjs, ../../framework/eyes/public-api.js, ../templates/ClockShortcutTemplate.html`
- `manager dependencies: time, router`

**ClockShortcut**：快速日期时间选择入口；继承 EyesPublicApi.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 this.bindFunctions；写入 _liveCallback。
- `init`：初始化模板与关联资源；调用 super.init, this._children.liveContainer.addEventListener, this.setState, Fill.default.setDefaultProps, this._children.live.classList.add, this._children.replay.classList.add, this._element.removeChild, this._callbackRegistry.push, this._app.getManager。
- `setCallback`：执行 setCallback 对应的组件业务步骤；写入 _liveCallback。
- `backToLive`：执行 backToLive 对应的组件业务步骤；调用 this._liveCallback, this._app.getManager, Manager.isNow, Manager.getTimeUrl, Manager.getNow, Manager.navigate, Manager.setTimeRate, Manager.setToNow。
- `_replay`：执行 _replay 对应的组件业务步骤；调用 this._app.getManager。
- `update`：执行 update 对应的组件业务步骤；调用 this._app.getManager, EyesPublicApi.AppUtils.isMobileMode, this.setState。

### `eyes/src/ui/components/CollapsibleMenu.js`

可折叠工具菜单和子项显示。

- `imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../../styles/extracted/CollapsibleMenuStyles.js, ../templates/CollapsibleMenuTemplate.html, ./CollapsibleMenuItem.js`
- `manager dependencies: router`
- `component dependencies: timeControls`

**CollapsibleMenu**：可折叠工具菜单和子项显示；继承 Eyes.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 this._getMaxHeight, this._calcAvailableHeight, this._collapseLastItem, this._eventNames.push, this._initCallbacks, this.bindFunctions；写入 _menuItems, _expandedItems, _allowMultiple, _maxHeight, _availableHeight, _resizeObserver。
- `init`：初始化模板与关联资源；调用 super.init, this._resizeObserver.observe。
- `_getMaxHeight`：执行 _getMaxHeight 对应的组件业务步骤。
- `_calcUsedHeight`：执行 _calcUsedHeight 对应的组件业务步骤；调用 this._expandedItems.forEach。
- `_calcAvailableHeight`：执行 _calcAvailableHeight 对应的组件业务步骤；调用 this._calcUsedHeight。
- `_addExpandedItem`：执行 _addExpandedItem 对应的组件业务步骤；调用 this._expandedItems.push, this._calcAvailableHeight；写入 _availableHeight。
- `_removeExpandedItem`：执行 _removeExpandedItem 对应的组件业务步骤；调用 this._expandedItems.filter, this._calcAvailableHeight；写入 _expandedItems, _availableHeight。
- `_collapseLastItem`：执行 _collapseLastItem 对应的组件业务步骤。
- `collapse`：执行 collapse 对应的组件业务步骤；调用 this.triggerCallbacks。
- `_setBtmGradScale`：执行 _setBtmGradScale 对应的组件业务步骤；调用 this._calcUsedHeight。
- `removeAllItems`：执行 removeAllItems 对应的组件业务步骤；调用 this._menuItems.forEach, this._element.removeChild, this.onItemVisibleChange, this._calcAvailableHeight；写入 _menuItems, _expandedItems, _availableHeight。
- `onItemToggle`：执行 onItemToggle 对应的组件业务步骤；调用 this._itemHasSpace, this._collapseLastItem, this._addExpandedItem, this._removeExpandedItem, this.setState, this.triggerCallbacks, this._setBtmGradScale。
- `onItemVisibleChange`：执行 onItemVisibleChange 对应的组件业务步骤；调用 this.setState。
- `setAllowMultiple`：执行 setAllowMultiple 对应的组件业务步骤；写入 _allowMultiple。
- `visibleItems`：执行 visibleItems 对应的组件业务步骤；调用 this._menuItems.filter。
- `allItems`：执行 allItems 对应的组件业务步骤。

### `eyes/src/ui/components/CollapsibleMenuItem.js`

工具菜单中的独立动作项。

- `imports: ../../framework/eyes/index.js, ../../styles/extracted/CollapsibleMenuItemStyles.js, ../templates/CollapsibleMenuItemTemplate.html`

**CollapsibleMenuItem**：工具菜单中的独立动作项；继承 Eyes.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 this._eventNames.push, this._initCallbacks；写入 _parentComponent, _components。
- `init`：初始化模板与关联资源；调用 super.init, Button.setAttribute, Title.toLowerCase, this._element.style.setProperty, this._setContainerHeight, this._setToggleAriaLabel。
- `addComponent`：执行 addComponent 对应的组件业务步骤；调用 this._components.push, this.show, this.hide, Container.appendChild。
- `onToggleClick`：执行 onToggleClick 对应的组件业务步骤；调用 this.setExpanded。
- `onCollapseClick`：执行 onCollapseClick 对应的组件业务步骤；调用 this.setExpanded。
- `_setToggleAriaLabel`：执行 _setToggleAriaLabel 对应的组件业务步骤；调用 Button.setAttribute, Title.toLowerCase。
- `setExpanded`：执行 setExpanded 对应的组件业务步骤；调用 this.triggerCallbacks, this.setState, this._setToggleAriaLabel, this._components.forEach, this._setContainerHeight。
- `_setContainerHeight`：执行 _setContainerHeight 对应的组件业务步骤；调用 this._element.style.setProperty。
- `parentComponent`：执行 parentComponent 对应的组件业务步骤。

### `eyes/src/ui/components/Comparison.js`

目标与比较对象的尺寸、距离或照片比较交互。

- `imports: ../../framework/eyes/index.js, ../../engine/pioneer/index.js, ../../styles/extracted/ComparisonStyles.js, ../templates/ComparisonTemplate.html`
- `manager dependencies: router, content, comparison`

**Comparison**：目标与比较对象的尺寸、距离或照片比较交互；继承 Eyes.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 Object.assign, this.bindFunctions；写入 list, name, compare, unitConverter。
- `init`：初始化模板与关联资源；调用 super.init, this._children.exitIcon.classList.add, this._children.exitIcon.classList.remove, this._children.next.addEventListener, this._children.previous.addEventListener。
- `_updateFontSize`：执行 _updateFontSize 对应的组件业务步骤；调用 Eyes.AppUtils.isMobileMode, Eyes.AppUtils.is2K, Eyes.AppUtils.is4K, this.setState。
- `unitchange`：执行 unitchange 对应的组件业务步骤；调用 this.setState, this.generateValues。
- `nextCompare`：执行 nextCompare 对应的组件业务步骤；调用 this.list.indexOf, this.clearRightPanelText, this._app.getManager；写入 compare。
- `previousCompare`：执行 previousCompare 对应的组件业务步骤；调用 this.list.indexOf, this.clearRightPanelText, this._app.getManager；写入 compare。
- `clearRightPanelText`：执行 clearRightPanelText 对应的组件业务步骤；调用 this._app.getManager, this.setState。
- `clearLeftPanelText`：执行 clearLeftPanelText 对应的组件业务步骤；调用 this._app.getManager, this.setState。
- `setup`：执行 setup 对应的组件业务步骤；调用 Object.keys, this.list.slice, this.generateValues；写入 list, name, compare, unitConverter。
- `formatValue`：执行 formatValue 对应的组件业务步骤；调用 Number.parseFloat, Math.round, Math.pow。
- `generateValues`：执行 generateValues 对应的组件业务步骤；调用 this._app.getManager, this.entityCompareLookup, this.formatValue, Title.toUpperCase, this.setState；写入 leftDescription, rightDescription。
- `entityCompareLookup`：执行 entityCompareLookup 对应的组件业务步骤；调用 this._app.getManager。
- `closeView`：执行 closeView 对应的组件业务步骤；调用 this._app.getManager。

### `eyes/src/ui/components/ContentPanel.js`

按路由描述装配对象内容块并控制面板折叠与覆盖。

- `imports: ../../styles/extracted/MobileExpandButtonStyles-928.js, ../../vendor/modules/animateFill-929.js, ../../engine/solar-system/public-api.js, ../../engine/pioneer/index.js, ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/ContentPanelTemplate.html, ../../styles/extracted/ContentPanelStyles.js`
- `manager dependencies: content, router, scene, layer, time`
- `component dependencies: collapsibleMenu`

**ContentPanel**：按路由描述装配对象内容块并控制面板折叠与覆盖；继承 Eyes.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 Object.keys, this._eventNames.push, this._initCallbacks, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, this.setState, Fill.default.setDefaultProps, this.bindFunctions；写入 _backRoute, _backButtonVisibleClass, _defaultState, _blockState, _components, _currentId, _overviewBlock, _cameraViewBlock, _descriptionBlock, _relatedBlock, _eventsBlock, _featuredMoonsBlock。
- `getScrollbar`：执行 getScrollbar 对应的组件业务步骤。
- `_showTab`：执行 _showTab 对应的组件业务步骤；调用 this.setState。
- `_hideTab`：执行 _hideTab 对应的组件业务步骤；调用 this.setState。
- `init`：初始化模板与关联资源；调用 super.init, this._app.addComponent, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, Eyes.AppUtils.isLandscape, Eyes.AppUtils.deepClone, this.setState, this._app.getComponent, this.resize；写入 _overviewBlock, _descriptionBlock, _relatedBlock, _eventsBlock, _replayBlock, _featuredMoonsBlock, _compareSizeBlock, _distanceToolBlock, _moonsBlock, _telescopeModeBlock, _cameraViewBlock, _surfaceMapBlock。
- `_onRouteChange`：执行 _onRouteChange 对应的组件业务步骤；调用 this.isEnabled, this._disableAllComponents, this.setupBackButton, Eyes.AppUtils.deepClone, this.selectTab；写入 _currentId, _tabContent, _persistingBlocks。
- `getParentTabOfSubtab`：执行 getParentTabOfSubtab 对应的组件业务步骤；调用 Object.entries, Object.keys。
- `selectTab`：执行 selectTab 对应的组件业务步骤；调用 this.getParentTabOfSubtab, Object.keys, this.setState, this._calcTabPanelBottomMargin, this.populateTabs, List.toggle。
- `_onTabSelect`：执行 _onTabSelect 对应的组件业务步骤；调用 Element.classList.contains, this.selectTab。
- `addBlockToTab`：执行 addBlockToTab 对应的组件业务步骤；调用 Blocks.includes, Blocks.push。
- `removeBlockFromTab`：执行 removeBlockFromTab 对应的组件业务步骤；调用 Blocks.includes, Blocks.indexOf, Blocks.splice。
- `populateTabs`：执行 populateTabs 对应的组件业务步骤；调用 this.createSubtabHTML, this._children.tabGroup.contains, this._overviewBlock.element.parentElement.removeChild, this._app.getComponent。
- `createSubtabHTML`：执行 createSubtabHTML 对应的组件业务步骤；调用 Array.from, this._children.tabGroup.insertBefore, this._app.getManager, Object.keys, TabNav.appendChild, List.toggle, this.setState。
- `onQueryChange`：响应查询参数变化；调用 this._cameraViewBlock.onQueryChange。
- `setupBackButton`：执行 setupBackButton 对应的组件业务步骤；调用 this._app.getManager；写入 _backButtonVisibleClass, _backRoute。
- `onRouteChangeEvent`：执行 onRouteChangeEvent 对应的组件业务步骤；调用 this._onRouteChange, this._app.getManager, this._overviewBlock.onRouteChange, this._replayBlock.onRouteChange, this.addBlockToTab, this._delayedResize, this._descriptionBlock.onRouteChange, this._app.getView, this.removeBlockFromTab, this._eventsBlock.onRouteChange, this._relatedBlock.onRouteChange, this._hideTab, this.selectTab, this._cameraViewBlock.onRouteChange；写入 _persistingBlocks。
- `onRouteChangeObject`：执行 onRouteChangeObject 对应的组件业务步骤；调用 this._onRouteChange, this._app.getManager, this._overviewBlock.onRouteChange, this._delayedResize, this.setState, this._descriptionBlock.onRouteChange, this.addBlockToTab, this._app.getView, this._eventsBlock.onRouteChange, this.removeBlockFromTab, this._relatedBlock.onRouteChange, this._hideTab, this.determineToolboxBlocksState, this._showTab。
- `onRouteChangeObjectLoaded`：执行 onRouteChangeObjectLoaded 对应的组件业务步骤；调用 this._app.getView, this._app.getManager, this._relatedBlock.onRouteChange, this.addBlockToTab, this._cameraViewBlock.onRouteChange, this.determineViewOptionBlocksState, this.populateTabs。
- `onRouteChangeFeature`：执行 onRouteChangeFeature 对应的组件业务步骤；调用 this._onRouteChange, SolarSystemSceneExports.Entity.getEntityNamesInGroup, this._overviewBlock.onRouteChange, this._delayedResize, this._descriptionBlock.onRouteChange, this.addBlockToTab, this._featuredMoonsBlock.onRouteChange, this._hideTab, this._cameraViewBlock.onRouteChange, this._app.getView, this.determineViewOptionBlocksState, this.populateTabs, this._setUpMobileCollapse。
- `onChildParentChange`：执行 onChildParentChange 对应的组件业务步骤；调用 this._app.getManager, this._app.pioneer.getScene, this.determineViewOptionBlocksState, this._app.getView, this.populateTabs。
- `determineToolboxBlocksState`：执行 determineToolboxBlocksState 对应的组件业务步骤；调用 this._compareSizeBlock.onRouteChange, this._distanceToolBlock.onRouteChange, SolarSystemSceneExports.Entity.getEntityNamesInGroup, this._moonsBlock.onRouteChange, this._telescopeModeBlock.onRouteChange, this.addBlockToTab。
- `determineViewOptionBlocksState`：执行 determineViewOptionBlocksState 对应的组件业务步骤；调用 this._app.getManager, this.determineSurfaceMapBlockState, this.determineInstrumentFOVBlockState, this.determineLayersBlockState, this.determineTextureQualityBlockState, this.determineFeaturesBlockState。
- `determineSurfaceMapBlockState`：执行 determineSurfaceMapBlockState 对应的组件业务步骤；调用 this._app.getManager, this._app.pioneer.getScene, Manager.getEntityInfo, Manager.getSpheroidLayers, this.addBlockToTab, this._surfaceMapBlock.onRouteChange, this.removeBlockFromTab。
- `determineLayersBlockState`：执行 determineLayersBlockState 对应的组件业务步骤；调用 this._app.getManager, Manager.getContextualLayers, Manager.getEntityInfo, this._app.pioneer.getScene, this.addBlockToTab, this._layersBlock.onRouteChange, this._app.getView, Manager.getSpheroidLayers, this.removeBlockFromTab。
- `determineInstrumentFOVBlockState`：执行 determineInstrumentFOVBlockState 对应的组件业务步骤；调用 this._app.getManager, Manager.getEntityInfo, this._instrumentFOVBlock.hasInstrumentsWithFOV, this.addBlockToTab, this._instrumentFOVBlock.onRouteChange, this.removeBlockFromTab。
- `determineTextureQualityBlockState`：执行 determineTextureQualityBlockState 对应的组件业务步骤；调用 this._app.getManager, this._app.pioneer.getScene, Manager.getEntityInfo, Manager.hasHD, Eyes.AppUtils.isiPhone, this.addBlockToTab, this._textureQualityBlock.onRouteChange, this.removeBlockFromTab, Eyes.AppUtils.isAppleDevice。
- `determineFeaturesBlockState`：执行 determineFeaturesBlockState 对应的组件业务步骤；调用 this._app.getManager, Manager.getSpheroidFeatures, this.addBlockToTab, this._featuresBlock.onRouteChange, this.removeBlockFromTab。
- `backRoute`：执行 backRoute 对应的组件业务步骤；调用 this._app.getManager, Manager.getTimeUrl, Manager.getTimeRate。
- `onClickShowCollapse`：执行 onClickShowCollapse 对应的组件业务步骤；调用 Eyes.AppUtils.isMobileMode, this.hideOverlay, this.hide, this.show。
- `resize`：重排响应式界面；调用 super.resize, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, Eyes.AppUtils.isLandscape, this.selectTab, this.populateTabs, this._setUpMobileCollapse；写入 _isMobile, _isLandscape。
- `onDragStart`：执行 onDragStart 对应的组件业务步骤；写入 _isDragging。
- `onDrag`：执行 onDrag 对应的组件业务步骤。
- `onDragEnd`：执行 onDragEnd 对应的组件业务步骤；调用 this._snapHeights.value.reduce, Math.abs, this._snapHeights.value.indexOf, this.setState, this._setUpMobileCollapse；写入 _isDragging。
- `expand`：执行 expand 对应的组件业务步骤；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, this.setState, this._setUpMobileCollapse, this.toggleExpandCollapse。
- `collapse`：执行 collapse 对应的组件业务步骤；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, this.setState, this._setUpMobileCollapse, this.toggleExpandCollapse。
- `toggleExpandCollapse`：执行 toggleExpandCollapse 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
- `show`：执行 show 对应的组件业务步骤；调用 this._app.getManager, super.show, this.setEnabled, this._components.forEach, this._app.getComponent, this.triggerCallbacks, Eyes.AppUtils.addScrollbar, this._element.querySelector；写入 _scrollbar。
- `hide`：执行 hide 对应的组件业务步骤；调用 super.hide, this.triggerCallbacks。
- `_delayedResize`：执行 _delayedResize 对应的组件业务步骤；调用 this.resize；写入 _adjustedMobileHeight。
- `_getParentTabOfSubtab`：执行 _getParentTabOfSubtab 对应的组件业务步骤；调用 Object.entries, Object.keys。
- `_calcTabPanelBottomMargin`：执行 _calcTabPanelBottomMargin 对应的组件业务步骤；调用 Array.from, this._element.style.setProperty。
- `_getBlockHeight`：执行 _getBlockHeight 对应的组件业务步骤。
- `_calculateAdjustedMobileHeight`：执行 _calculateAdjustedMobileHeight 对应的组件业务步骤；调用 this._getBlockHeight, this._determineCollapsedBlockVisiblity, Array.from, Element.style.setProperty, this._app.getComponent；写入 _adjustedMobileHeight。
- `_setUpMobileCollapse`：执行 _setUpMobileCollapse 对应的组件业务步骤；调用 this._calculateAdjustedMobileHeight, Eyes.AppUtils.isLandscape, this._snapHeights.value.push, this._calcTabPanelBottomMargin, this.element.classList.add, this.element.classList.remove, this.setState, this.populateTabs, this.triggerCallbacks。
- `_determineCollapsedBlockVisiblity`：执行 _determineCollapsedBlockVisiblity 对应的组件业务步骤；调用 this._app.getComponent, Blocks.includes, this._element.style.setProperty。
- `_disableAllComponents`：执行 _disableAllComponents 对应的组件业务步骤；调用 this._components.forEach, this._app.getComponent。
- `clearPanel`：执行 clearPanel 对应的组件业务步骤；调用 this._disableAllComponents, this.setState。
- `reset`：执行 reset 对应的组件业务步骤；调用 this.setState, this._app.getComponent, Element.style.setProperty；写入 _currentId。
- `__disable`：卸载 DOM 并取消业务订阅；调用 this.reset, super.__disable。

### `eyes/src/ui/components/DescriptionBlock-1005.js`

DescriptionBlock-1005 模块。

- `imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../../engine/solar-system/public-api.js, ../templates/DescriptionBlockTemplate-1006.html, ../../styles/extracted/DescriptionBlockStyles-1007.js`
- `manager dependencies: router, content`
- `component dependencies: contentPanel`

**DescriptionBlock**：可展开的描述正文与更多内容；继承 SolarSystemPublicApi.BaseContentBlock。

- `constructor`：建立实例初始字段和依赖；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTabletPortrait, this.setState；写入 _app。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTabletPortrait, this._app.getManager, SolarSystemSceneExports.Entity.getEntityNamesInGroup, this.app.pioneer.getScene, this.setState, this.resetScrollbar。
- `resetScrollbar`：执行 resetScrollbar 对应的组件业务步骤；调用 this._app.getComponent。
- `resize`：重排响应式界面；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTabletPortrait, this.setState。
- `onClickReadMore`：执行 onClickReadMore 对应的组件业务步骤；调用 this.getState, Element.style.setProperty, this.resetScrollbar, this.setState。

- 注意：此 DescriptionBlock 是应用 BaseContentBlock 子类；不能与 -541 故事内容类合并。

### `eyes/src/ui/components/DescriptionBlock-541.js`

DescriptionBlock-541 模块。

- `imports: ../../framework/eyes/public-api.js, ../templates/DescriptionBlockTemplate-542.html, ../../styles/extracted/DescriptionBlockStyles-543.js`

**DescriptionBlock**：可展开的描述正文与更多内容；继承 EyesPublicApi.StoryBaseContentBlock。

- `constructor`：建立实例初始字段和依赖；调用 Object.assign；写入 _more。
- `init`：初始化模板与关联资源；调用 super.init, this.setState。
- `showMore`：执行 showMore 对应的组件业务步骤；调用 this.setState。
- `hideMore`：执行 hideMore 对应的组件业务步骤；调用 this.setState。
- `toggleMore`：执行 toggleMore 对应的组件业务步骤；调用 this.hideMore, this.showMore。

- 注意：此 DescriptionBlock 是 StoryBaseContentBlock 子类；与 -1005 的同名应用内容类不是同一个构造器。

### `eyes/src/ui/components/DistancePanel.js`

距离源目标选择和距离计算显示面板。

- `imports: ../../framework/eyes/index.js, ../../styles/extracted/DistancePanelStyles.js, ../templates/DistancePanelTemplate.html`
- `manager dependencies: router, distance`
- `component dependencies: distanceSourceSearch, distanceTargetSearch`

**DistancePanel**：距离源目标选择和距离计算显示面板；继承 Eyes.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 Eyes.AppUtils.isMobile, this.bindFunctions；写入 _isTouch, _touchOptions, _canHover, _isMobile, isMobileChangedCallback, _dragState, _size, _lineGraphic。
- `initSearchUI`：执行 initSearchUI 对应的组件业务步骤；调用 this.app.getComponent, SearchContainer.appendChild, this.sourceSearch.show, this.targetSearch.show；写入 sourceSearch, targetSearch。
- `onMouseDown`：执行 onMouseDown 对应的组件业务步骤；调用 this.setCurrentlyDragging, this.setDownXY。
- `onMouseMove`：执行 onMouseMove 对应的组件业务步骤；调用 this._calcNewXandY, this.getLimitedXandY, this.setLimitXY, this.setTransformCSSVars, this.calcMaxMinBtnPos。
- `onMouseUp`：执行 onMouseUp 对应的组件业务步骤；调用 this.setDragXY, this.setCurrentlyDragging。
- `onTouchStart`：执行 onTouchStart 对应的组件业务步骤；调用 this.setCurrentlyDragging, this.setDownXY。
- `onTouchMove`：执行 onTouchMove 对应的组件业务步骤；调用 this._calcNewXandY, this.getLimitedXandY, this.setLimitXY, this.setTransformCSSVars, this.calcMaxMinBtnPos。
- `onTouchEnd`：执行 onTouchEnd 对应的组件业务步骤；调用 this.setDragXY, this.setCurrentlyDragging。
- `_calcNewXandY`：执行 _calcNewXandY 对应的组件业务步骤。
- `exit`：执行 exit 对应的组件业务步骤；调用 this.app.getManager, Manager.navigate。
- `toggleSourceMP`：执行 toggleSourceMP 对应的组件业务步骤；调用 this.distanceManager.toggleSourceMeasurePoint, this.onLineClick。
- `toggleTargetMP`：执行 toggleTargetMP 对应的组件业务步骤；调用 this.distanceManager.toggleTargetMeasurePoint, this.onLineClick。
- `onSwapClick`：执行 onSwapClick 对应的组件业务步骤。
- `toggleUnitSystem`：执行 toggleUnitSystem 对应的组件业务步骤。
- `onResultClick`：执行 onResultClick 对应的组件业务步骤；调用 this._cMenuParent.setExpanded。
- `onContainerClick`：执行 onContainerClick 对应的组件业务步骤。
- `addEvents`：执行 addEvents 对应的组件业务步骤；调用 Area.addEventListener, Graphic.addEventListener；写入 _isTouch, _canHover。
- `removeAllEvents`：执行 removeAllEvents 对应的组件业务步骤；调用 Area.removeEventListener, Graphic.addEventListener, Graphic.removeEventListener。
- `setIsSearching`：执行 setIsSearching 对应的组件业务步骤；调用 this.setState。
- `setScreenCenter`：执行 setScreenCenter 对应的组件业务步骤。
- `setPanelProps`：执行 setPanelProps 对应的组件业务步骤；调用 this._element.style.setProperty, Eyes.AppUtils.isLandscape, this.getLimitedXandY, this.setDragXY, this.setTransformCSSVars, this.calcMaxMinBtnPos, this.setScreenCenter。
- `currentlyDragging`：执行 currentlyDragging 对应的组件业务步骤。
- `setCurrentlyDragging`：执行 setCurrentlyDragging 对应的组件业务步骤；调用 this.setState。
- `setDownXY`：执行 setDownXY 对应的组件业务步骤。
- `setLimitXY`：执行 setLimitXY 对应的组件业务步骤。
- `setDragXY`：执行 setDragXY 对应的组件业务步骤。
- `setTransformCSSVars`：执行 setTransformCSSVars 对应的组件业务步骤；调用 this._element.style.setProperty。
- `setCanMinimize`：执行 setCanMinimize 对应的组件业务步骤；调用 this.setState。
- `setSwapButtonVisible`：执行 setSwapButtonVisible 对应的组件业务步骤；调用 this.setState。
- `calcMaxMinBtnPos`：执行 calcMaxMinBtnPos 对应的组件业务步骤；调用 this.setState。
- `getLimitedXandY`：执行 getLimitedXandY 对应的组件业务步骤；调用 Math.min, Math.max。
- `toggleIsMinimized`：执行 toggleIsMinimized 对应的组件业务步骤；调用 this.setState, MinButton.setAttribute。
- `setIsDraggable`：执行 setIsDraggable 对应的组件业务步骤；调用 this.setState。
- `setIsLoading`：执行 setIsLoading 对应的组件业务步骤；调用 this.setState。
- `setLightTime`：执行 setLightTime 对应的组件业务步骤；调用 this._element.style.setProperty, this.setState。
- `setSourceText`：执行 setSourceText 对应的组件业务步骤。
- `setSourceMpState`：执行 setSourceMpState 对应的组件业务步骤；调用 this.setState。
- `setTargetText`：执行 setTargetText 对应的组件业务步骤。
- `setTargetMpState`：执行 setTargetMpState 对应的组件业务步骤；调用 this.setState。
- `onIsMobileChanged`：执行 onIsMobileChanged 对应的组件业务步骤；调用 this._updateTitleAndCloseBtnParent, this.setIsDraggable, this.isMobileChangedCallback；写入 _isMobile。
- `_updateTitleAndCloseBtnParent`：执行 _updateTitleAndCloseBtnParent 对应的组件业务步骤；调用 this.app._dynamicElement.prepend, Area.append。
- `allowBpOffset`：执行 allowBpOffset 对应的组件业务步骤。
- `setBpCSSOffsets`：执行 setBpCSSOffsets 对应的组件业务步骤；调用 this.app.pioneer.getInput, this._element.style.setProperty。
- `onLineClick`：执行 onLineClick 对应的组件业务步骤；调用 this.distanceManager.hideTooltip, this.setState, this.distanceManager.getOffsetU, this.distanceManager.on3dLineClick, this.distanceManager.setHoldU。
- `onLineMouseMove`：执行 onLineMouseMove 对应的组件业务步骤；调用 this.setLineGraphicDotOffset。
- `onLineMouseEnter`：执行 onLineMouseEnter 对应的组件业务步骤；调用 this.setLineGraphicDimensions。
- `onLineMouseLeave`：执行 onLineMouseLeave 对应的组件业务步骤；调用 this.setLineGraphicDotOffset。
- `setLineGraphicDimensions`：执行 setLineGraphicDimensions 对应的组件业务步骤；调用 Graphic.getBoundingClientRect。
- `_onLineTouchStart`：执行 _onLineTouchStart 对应的组件业务步骤；调用 this.setState, this.setLineGraphicDimensions, this.distanceManager.showTooltip。
- `_onLineTouchEnd`：执行 _onLineTouchEnd 对应的组件业务步骤；调用 this.setState, this.distanceManager.hideTooltip。
- `setLineGraphicDotPos`：执行 setLineGraphicDotPos 对应的组件业务步骤。
- `setLineGraphicDotOffset`：执行 setLineGraphicDotOffset 对应的组件业务步骤。
- `resize`：重排响应式界面；调用 Eyes.AppUtils.isMobile, this.onIsMobileChanged, this.removeAllEvents, this.addEvents, this.setPanelProps。
- `show`：执行 show 对应的组件业务步骤；调用 this.app.getManager, this.toggleIsMinimized。
- `hide`：执行 hide 对应的组件业务步骤；调用 this.toggleIsMinimized, Element.getAttribute。
- `__enable`：挂载 DOM 并登记窗口和业务订阅；调用 super.__enable, this.resize。
- `__disable`：卸载 DOM 并取消业务订阅；调用 this.removeAllEvents, this._updateTitleAndCloseBtnParent, super.__disable。

### `eyes/src/ui/components/EventsBlock.js`

对象事件列表内容块。

- `imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/EventsBlockTemplate.html, ../../styles/extracted/EventsBlockStyles.js`
- `manager dependencies: router, time, content`
- `component dependencies: eventsTimeline`

**EventsBlock**：对象事件列表内容块；继承 SolarSystemPublicApi.BaseContentBlock。

- `constructor`：建立实例初始字段和依赖；调用 this.setState；写入 _introMessages, _currentTab, _defaultTab, _minEventsForTimeline, _app。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this.startLoading, this._app.getComponent, this._timeline.setParent, this._app.pioneer.getScene, this._app.pioneer.getTime, this._events.find, this._app.getManager, Object.keys, this.setState, List.remove, this._timeline.setTarget, this.selectTab, this.stopLoading；写入 _currentTab, _timeline, _events, _currentEvent, _numEvents。
- `startLoading`：执行 startLoading 对应的组件业务步骤；调用 this.showContainer, this.setState。
- `stopLoading`：执行 stopLoading 对应的组件业务步骤；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, this.setState, this.selectTab。
- `_onTabSelect`：执行 _onTabSelect 对应的组件业务步骤；调用 List.contains, Array.from, this.selectTab。
- `selectTab`：执行 selectTab 对应的组件业务步骤；调用 Array.from, List.contains, List.toggle, Child.innerText.toLowerCase, this.setState, this.showTimeline, this.showTable；写入 _currentTab。
- `showTimeline`：执行 showTimeline 对应的组件业务步骤；调用 this.showContainer, this.setState, this._timeline.checkForZoom, this._timeline.show。
- `showTable`：执行 showTable 对应的组件业务步骤；调用 this.showContainer, this._timeline.hide, this.populateTable, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, this.setState。
- `resetScrollbar`：执行 resetScrollbar 对应的组件业务步骤。
- `populateTable`：执行 populateTable 对应的组件业务步骤；调用 Object.values, List.add, this._app.getManager, Table.appendChild, List.toggle。
- `rotateSortTriangle`：执行 rotateSortTriangle 对应的组件业务步骤；调用 Array.from, List.contains, List.toggle。
- `sortTable`：执行 sortTable 对应的组件业务步骤；调用 this._app.getManager, this.setState, this.getState, Object.values, Manager.getEntityInfo；写入 _events。
- `showContainer`：执行 showContainer 对应的组件业务步骤；调用 List.toggle。
- `resize`：重排响应式界面；调用 super.resize, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, this.setState, Eyes.AppUtils.isLandscape, Object.keys, this._timeline.show。

### `eyes/src/ui/components/EventsTimeline.js`

航天器事件时间轴、播放和当前事件选择。

- `imports: ../../vendor/modules/MomentSecondary.cjs, ../../framework/eyes/index.js, ../../styles/extracted/EventsTimelineStyles.js, ../templates/EventsTimelineTemplate.html`
- `manager dependencies: router, time, scene`
- `component dependencies: settings, contentPanel, eventsBlock, collapsibleMenu`

**EventsTimeline**：航天器事件时间轴、播放和当前事件选择；继承 Eyes.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 this._app.getComponent, this.setState, this.bindFunctions, this.setOptions, this._app.getManager；写入 _settings, defaultOptions, _localState, _events, _markers, _tooltips, _animations, _setViewingLineXThrottled, _onFpTouchMoveThrottled, _showToolTipDebounced, _resizeDebounced, _onMarkerMouseEnterDebounced。
- `init`：初始化模板与关联资源；调用 super.init, this._settings.addTooltips, this._callbackRegistry.push, this._app.getManager, this._app.getComponent, this._setResizeTimeout。
- `_addFpTooltips`：执行 _addFpTooltips 对应的组件业务步骤；调用 this._settings.addTooltips。
- `_createAnimation`：执行 _createAnimation 对应的组件业务步骤。
- `_depopulateFocusPanel`：执行 _depopulateFocusPanel 对应的组件业务步骤；调用 Content.removeChild。
- `_populateFocusPanel`：执行 _populateFocusPanel 对应的组件业务步骤；调用 this._calcXfromTime, EventXs.push, this._onViewClick, Array.from, Content.appendChild, this._setVariables。
- `_createEventsAndMarkers`：执行 _createEventsAndMarkers 对应的组件业务步骤；调用 this._events.forEach, this._calcWidthBtwnTimes, this._addToCluster, this._markers.forEach, Array.from, List.contains, List.toggle。
- `_createEventElement`：执行 _createEventElement 对应的组件业务步骤；调用 this._calcMidpointX, Container.appendChild。
- `_addToCluster`：执行 _addToCluster 对应的组件业务步骤；调用 this._getLastCluster, this._calcEventClusterMax, this._onViewClick, Container.appendChild, this._markers.push, this._markers.find, List.add, Array.from, List.contains。
- `_createClusterEventLine`：执行 _createClusterEventLine 对应的组件业务步骤；调用 this._children.markerContainer.appendChild；写入 _clusterEventLine。
- `_populate`：执行 _populate 对应的组件业务步骤；调用 this._destroy, this._createEventsAndMarkers, this._setMarkerPositions, this._markers.some, this.setLocalState, this._createClusterEventLine, this._setVariables。
- `_destroy`：执行 _destroy 对应的组件业务步骤；调用 this._depopulateFocusPanel, Container.removeChild, EventElements.filter；写入 _markers。
- `_setClickedOnce`：执行 _setClickedOnce 对应的组件业务步骤；调用 this.setLocalState。
- `_onTimelineMouseLeave`：执行 _onTimelineMouseLeave 对应的组件业务步骤；调用 this._hideTooltip, this.setState, this.setLocalState。
- `_onTimelineMouseMove`：执行 _onTimelineMouseMove 对应的组件业务步骤；调用 this._hideTooltip, this._onMarkerMouseEnterDebounced.cancel, this._calcTimefromTimelineX, this.setState, this.setLocalState, this._setDateAndPosition, this._showToolTipDebounced。
- `_onTimelineClick`：执行 _onTimelineClick 对应的组件业务步骤；调用 this._calcTimefromTimelineX, this.goToTime, this.setLocalState。
- `_onMarkerMouseEnter`：执行 _onMarkerMouseEnter 对应的组件业务步骤；调用 this._markers.find, this._markers.indexOf, this.setLocalState, this._hideTooltip, this.setState, this._app.getComponent, Eyes.AppUtils.isMobilePortrait, this._markers.forEach, this._setActive, this._setFocusPanelPos, this._setEventName, this._setDateAndPosition。
- `_onMarkerMouseLeave`：执行 _onMarkerMouseLeave 对应的组件业务步骤；调用 this._resetStates。
- `_onMarkerMouseMove`：执行 _onMarkerMouseMove 对应的组件业务步骤；调用 this._onFpMouseLeaveDebounced.cancel, this._onMarkerMouseLeaveDebounced.cancel, this._markers.find, List.contains, this._getNearestIndex, this._setDateAndPosition, this._setClusterEvent, this._setEventName, this.setLocalState。
- `_onFpMouseEnter`：执行 _onFpMouseEnter 对应的组件业务步骤；调用 this._onMarkerMouseLeaveDebounced.cancel, this._onFpMouseLeaveDebounced.cancel, this.setLocalState。
- `_onFpMouseLeave`：执行 _onFpMouseLeave 对应的组件业务步骤；调用 this._resetStates。
- `_onFpEventMouseOver`：执行 _onFpEventMouseOver 对应的组件业务步骤；调用 this._hideTooltip, this._getMarkerAndIndexFromFocusEl, this._setClusterEvent, EventElements.find, List.contains, this._setFocusPanelPos, this.setState, this._app.getComponent。
- `_onFpTicksMouseEnter`：执行 _onFpTicksMouseEnter 对应的组件业务步骤；调用 this._setFpElementActive, this._setEventName。
- `_onFpTicksMouseMove`：执行 _onFpTicksMouseMove 对应的组件业务步骤；调用 this._hideTooltip, this.setState, this.setLocalState, this._calcTimeFromFpX, this._calcXfromTime, this._setDateAndPosition, this._setClusterLineTransform, this._children.focusPanel.style.setProperty, this._showToolTipDebounced。
- `_onFpTicksMouseLeave`：执行 _onFpTicksMouseLeave 对应的组件业务步骤；调用 this._hideTooltip。
- `_onFpTicksClick`：执行 _onFpTicksClick 对应的组件业务步骤；调用 this._hideTooltip, this._calcTimeFromFpX, this.goToTime, this.setLocalState。
- `_onViewClick`：执行 _onViewClick 对应的组件业务步骤；调用 this._hideTooltip, this._zoomIntoCluster, this.goToEvent, this._onDateTouchEnd, this.setLocalState。
- `_zoomIntoCluster`：执行 _zoomIntoCluster 对应的组件业务步骤；调用 Container.removeChild, this._buildRangeOptions, this._setStartEndDates, this._populateFocusPanel, this.setState。
- `_zoomOutOfCluster`：执行 _zoomOutOfCluster 对应的组件业务步骤；调用 this._app.getView, this._calcCoverage, this._buildRangeOptions, this._setStartEndDates, this.setState, this._populate。
- `_onFpWheel`：执行 _onFpWheel 对应的组件业务步骤；调用 this._hideTooltip, Math.abs, this._onMarkerMouseEnter, this.setLocalState, this._createAnimation。
- `_onFpTouchStart`：执行 _onFpTouchStart 对应的组件业务步骤；调用 this._hideTooltip, this.setLocalState。
- `_onFpTouchEnd`：执行 _onFpTouchEnd 对应的组件业务步骤；调用 this.setLocalState。
- `_onFpTouchMove`：执行 _onFpTouchMove 对应的组件业务步骤；调用 Math.abs, this.setLocalState, this._onMarkerTouch, this._createAnimation。
- `_onFpTicksTouchStart`：执行 _onFpTicksTouchStart 对应的组件业务步骤；调用 this._hideTooltip, this.setLocalState, Math.abs, this._setClickedOnce, this.setState, this._setEventName, this._setFpElementActive, this._calcTimeFromFpX, this._calcXfromTime, this._setDateAndPosition, this._setClusterLineTransform, this._children.focusPanel.style.setProperty。
- `_onFpTicksTouchMove`：执行 _onFpTicksTouchMove 对应的组件业务步骤；调用 this.setLocalState, this.setState, this._calcTimeFromFpX, this._calcXfromTime, this._setDateAndPosition, this._setClusterLineTransform, this._children.focusPanel.style.setProperty。
- `_onFpTicksTouchEnd`：执行 _onFpTicksTouchEnd 对应的组件业务步骤；调用 this.setLocalState, this._onDateTouchEnd。
- `_onMarkerTouch`：执行 _onMarkerTouch 对应的组件业务步骤；调用 this._markers.find, this._markers.indexOf, this._hideTooltip, this._markers.forEach, this._setActive, this.setState, Eyes.AppUtils.isMobilePortrait, this.setLocalState, this._getNearestIndex, this._setFpViewingLineStart, this._zoomIntoCluster, this._setFocusPanelPos, this._setFpAnimation, this._setEventNameDebounced.cancel。
- `_onDateTouchStart`：执行 _onDateTouchStart 对应的组件业务步骤。
- `_onDateTouchEnd`：执行 _onDateTouchEnd 对应的组件业务步骤；调用 this._calcTimeFromFpX, this._calcTimefromTimelineX, this.goToTime, this.setLocalState。
- `_onFpEventTouch`：执行 _onFpEventTouch 对应的组件业务步骤；调用 this._getMarkerAndIndexFromFocusEl, this._hideTooltip, this._setClusterEvent, this._onViewClick。
- `_onFpArrowClick`：执行 _onFpArrowClick 对应的组件业务步骤；调用 this._markers.find, this._markers.indexOf, this._calcTimeFromFpX, this._hideTooltip, this._getNextEventIndexByTime, this._zoomOutOfCluster, this._onMarkerTouch, this._resetStates, this._setClusterEvent。
- `_onTimelineTouchStart`：执行 _onTimelineTouchStart 对应的组件业务步骤；调用 this._hideTooltip, this.setLocalState, Math.abs, this._setClickedOnce, this._resetStates, this.setState, this._setDateAndPosition。
- `_onTimelineTouchMove`：执行 _onTimelineTouchMove 对应的组件业务步骤；调用 this.setLocalState, this.setState, this._setDateAndPosition。
- `_onTimelineTouchEnd`：执行 _onTimelineTouchEnd 对应的组件业务步骤；调用 this._onDateTouchEnd, this.setLocalState, this.setState。
- `_onOutsideTouch`：执行 _onOutsideTouch 对应的组件业务步骤；调用 this._element.contains, this._resetStates。
- `_setResizeTimeout`：执行 _setResizeTimeout 对应的组件业务步骤；写入 _resizeTimeout。
- `_onResize`：执行 _onResize 对应的组件业务步骤；调用 this._resetStates, this._children.timelinebar.getBoundingClientRect, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, this.setLocalState, this._children.timelinebar.style.setProperty, this._populate；写入 _resizeTimeout。
- `resize`：重排响应式界面；调用 this._resizeDebounced。
- `_calcEventClusterMax`：执行 _calcEventClusterMax 对应的组件业务步骤；调用 Math.floor, Math.max, Math.min。
- `_calcMidpointX`：执行 _calcMidpointX 对应的组件业务步骤；调用 this._calcXfromTime。
- `_calcWidthBtwnTimes`：执行 _calcWidthBtwnTimes 对应的组件业务步骤；调用 Math.max, Math.min, Math.round。
- `_calcXfromTime`：执行 _calcXfromTime 对应的组件业务步骤。
- `_calcTimefromTimelineX`：执行 _calcTimefromTimelineX 对应的组件业务步骤。
- `_calcTimeFromFpX`：执行 _calcTimeFromFpX 对应的组件业务步骤。
- `_calcRelativeProgress`：执行 _calcRelativeProgress 对应的组件业务步骤。
- `_calcFpEventOffset`：执行 _calcFpEventOffset 对应的组件业务步骤。
- `_nestedPropsChanged`：执行 _nestedPropsChanged 对应的组件业务步骤；调用 this._nestedPropsChanged。
- `_showToolTip`：执行 _showToolTip 对应的组件业务步骤；调用 Math.min, Math.max, Math.abs, this._setTooltipModifiers, this.setLocalState。
- `_setTooltipModifiers`：执行 _setTooltipModifiers 对应的组件业务步骤。
- `_resetTooltip`：执行 _resetTooltip 对应的组件业务步骤；调用 this._showToolTipDebounced.cancel。
- `_hideTooltip`：执行 _hideTooltip 对应的组件业务步骤；调用 this._resetTooltip, Object.values。
- `_setViewingLineX`：执行 _setViewingLineX 对应的组件业务步骤；调用 this._calcXfromTime, this._getFpViewingLineX, this._children.timelinebar.style.setProperty, this._children.focusPanel.style.setProperty, this.setState, this.setLocalState。
- `_setFpViewingLineStart`：执行 _setFpViewingLineStart 对应的组件业务步骤；调用 this._children.focusPanel.style.setProperty。
- `_setClusterEvent`：执行 _setClusterEvent 对应的组件业务步骤；调用 this._setEventName, this._setDateAndPosition, this._setClusterLineTransform, this.setState, this._setFpElementActive。
- `_setFpAnimation`：执行 _setFpAnimation 对应的组件业务步骤；调用 this._markers.indexOf, this._getNormDistance, this._calcRelativeProgress, this.setState, this.setLocalState, this._depopulateFocusPanel, this._populateFocusPanel, this._setClusterEvent, this._getFpEventsEnterAnim, this._getFpEventsExitAnim, this._getFpTickAnim, this._getFpLineAnim, this._createAnimation。
- `_getFpViewingLineX`：执行 _getFpViewingLineX 对应的组件业务步骤；调用 this._calcXfromTime, Math.round。
- `_getNearestEvent`：执行 _getNearestEvent 对应的组件业务步骤；调用 this._getNearestIndex。
- `_getNextEventIndexByTime`：执行 _getNextEventIndexByTime 对应的组件业务步骤。
- `_setDateAndPosition`：执行 _setDateAndPosition 对应的组件业务步骤。
- `_setEventName`：执行 _setEventName 对应的组件业务步骤；调用 this._element.style.setProperty, this.setState。
- `_setActive`：执行 _setActive 对应的组件业务步骤；调用 List.add, List.remove。
- `_getNormDistance`：执行 _getNormDistance 对应的组件业务步骤；调用 Math.abs。
- `_getFpEventsEnterAnim`：执行 _getFpEventsEnterAnim 对应的组件业务步骤；调用 this._createAnimation。
- `_getFpEventsExitAnim`：执行 _getFpEventsExitAnim 对应的组件业务步骤；调用 this._createAnimation。
- `_getFpTickAnim`：执行 _getFpTickAnim 对应的组件业务步骤；调用 this._calcRelativeProgress, this._createAnimation。
- `_getFpLineAnim`：执行 _getFpLineAnim 对应的组件业务步骤；调用 this._createAnimation。
- `_setFpEventScaledClass`：执行 _setFpEventScaledClass 对应的组件业务步骤；调用 EventElements.forEach, List.add, List.remove。
- `_setClusterLineTransform`：执行 _setClusterLineTransform 对应的组件业务步骤；调用 this._clusterEventLine.style.setProperty。
- `_getMarkerAndIndexFromFocusEl`：执行 _getMarkerAndIndexFromFocusEl 对应的组件业务步骤；调用 EventElements.indexOf。
- `_setFpElementActive`：执行 _setFpElementActive 对应的组件业务步骤；调用 EventElements.forEach, List.toggle, EventElements.indexOf, this.setLocalState。
- `_setNumOfTicks`：执行 _setNumOfTicks 对应的组件业务步骤；调用 Math.round, Char.repeat。
- `_getLastCluster`：执行 _getLastCluster 对应的组件业务步骤。
- `_setMarkerPositions`：执行 _setMarkerPositions 对应的组件业务步骤；调用 this._markers.forEach, Math.max, this._calcWidthBtwnTimes, this._calcMidpointX, Math.min, this._createEventElement。
- `_getNearestIndex`：执行 _getNearestIndex 对应的组件业务步骤；调用 Math.abs。
- `setOptions`：执行 setOptions 对应的组件业务步骤；写入 _options。
- `setLocalState`：执行 setLocalState 对应的组件业务步骤；调用 this._nestedPropsChanged；写入 _localState。
- `_setEvents`：执行 _setEvents 对应的组件业务步骤；调用 this._events.forEach, this._events.sort；写入 _events。
- `_buildRangeOptions`：执行 _buildRangeOptions 对应的组件业务步骤；调用 this.setOptions。
- `_setStartEndDates`：执行 _setStartEndDates 对应的组件业务步骤；调用 DateStart.setAttribute, DateEnd.setAttribute。
- `checkForZoom`：执行 checkForZoom 对应的组件业务步骤；调用 this._markers.find, this._zoomIntoCluster, this._zoomOutOfCluster。
- `show`：执行 show 对应的组件业务步骤；调用 super.show, this._setResizeTimeout。
- `hide`：执行 hide 对应的组件业务步骤；调用 super.hide。
- `__disable`：卸载 DOM 并取消业务订阅；调用 super.__disable。
- `goToTime`：执行 goToTime 对应的组件业务步骤；调用 this._app.getManager, this.routeManager.navigate。
- `goToEvent`：执行 goToEvent 对应的组件业务步骤；调用 this.routeManager.navigate。
- `setTime`：执行 setTime 对应的组件业务步骤；调用 this.setLocalState。
- `update`：执行 update 对应的组件业务步骤；调用 this.isEnabled, this._setViewingLineXThrottled。

### `eyes/src/ui/components/ExplorationBlock.js`

对象探索入口内容块。

- `imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/ExplorationBlockTemplate.html`
- `manager dependencies: content, router`

**ExplorationBlock**：对象探索入口内容块；继承 SolarSystemPublicApi.BaseContentBlock。

- `constructor`：建立实例初始字段和依赖；写入 _explorationList。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this.setEnabled, this.setState, this._app.getManager, this._element.classList.remove, List.add, this._explorationList.appendChild, this._setVariables；写入 _explorationList。

### `eyes/src/ui/components/FeaturedEventsBlock.js`

精选事件卡片内容块。

- `imports: ../../vendor/modules/Unidentified777.cjs, ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/FeaturedEventsBlockTemplate.html`
- `manager dependencies: router, content`

**FeaturedEventsBlock**：精选事件卡片内容块；继承 SolarSystemPublicApi.BaseContentBlock。

- `constructor`：建立实例初始字段和依赖；写入 _featuredEventsList。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 List.add, this._app.getManager, this._featuredEventsList.appendChild, this._setVariables, this.setState；写入 _featuredEventsList。

### `eyes/src/ui/components/FeaturedMoonsBlock.js`

精选卫星内容块。

- `imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/FeaturedMoonsBlockTemplate.html`
- `manager dependencies: router`

**FeaturedMoonsBlock**：精选卫星内容块；继承 SolarSystemPublicApi.BaseContentBlock。

- `constructor`：建立实例初始字段和依赖；调用 this.resize。
- `resize`：重排响应式界面；调用 super.resize, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTabletPortrait, this.setState。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this.hideMore, this._element.classList.remove, Array.isArray, this.setState, this._createListElement, this._children.featuredMoonsList.appendChild, List.add, this.setEnabled, this._setVariables。
- `_createListElement`：执行 _createListElement 对应的组件业务步骤；调用 this._app.getManager, List.add。

### `eyes/src/ui/components/FeaturedStoriesPanel.js`

首页精选故事卡片面板。

- `imports: ../../vendor/modules/Unidentified989.cjs, ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/FeaturedStoriesPanelTemplate.html, ../../styles/extracted/FeaturedStoriesPanelStyles.js`
- `manager dependencies: layer, router`
- `component dependencies: mobileExpandButton`

**FeaturedStoriesPanel**：首页精选故事卡片面板；继承 Eyes.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 this._eventNames.push, this._initCallbacks, this.bindFunctions；写入 _collapseMobile, _expandMobile, _collapseDesktop, _expandDesktop, _defaultState, _components, _scrollbar, _currentId, _storyBlock。
- `init`：初始化模板与关联资源；调用 super.init, this._app.addComponentWithPlaceholder, Eyes.AppUtils.isLandscape, this._callbackRegistry.push, this._app.getManager；写入 _storyBlock, _isLandscape。
- `_onRouteChange`：执行 _onRouteChange 对应的组件业务步骤；调用 this.isEnabled, this._disableAllComponents。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this._onRouteChange, this._storyBlock.onRouteChange, this._storyBlock.setEnabled, this._scrollbar.scroll, Eyes.AppUtils.addScrollbar；写入 _scrollbar。
- `showOverlay`：执行 showOverlay 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
- `hideOverlay`：执行 hideOverlay 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
- `onClickShowCollapse`：执行 onClickShowCollapse 对应的组件业务步骤；调用 Eyes.AppUtils.isMobileMode, this.hideOverlay, this.hide, this.show。
- `shouldOffsetRight`：执行 shouldOffsetRight 对应的组件业务步骤；调用 Eyes.AppUtils.isDesktop。
- `show`：执行 show 对应的组件业务步骤；调用 super.show, this._app.getManager, this._app.getView, ToggleBtn.setAttribute, this._app.getComponent, this.setState。
- `hide`：执行 hide 对应的组件业务步骤；调用 super.hide, this._app.getManager, this._app.getView, ToggleBtn.setAttribute, this._app.getComponent, this.setState。
- `handleLayerToggle`：执行 handleLayerToggle 对应的组件业务步骤；调用 this.show, this.hide。
- `_disableAllComponents`：执行 _disableAllComponents 对应的组件业务步骤；调用 this._components.forEach, this._app.getComponent。
- `reset`：执行 reset 对应的组件业务步骤；调用 this.setState；写入 _currentId。
- `__disable`：卸载 DOM 并取消业务订阅；调用 this.reset, super.__disable。

### `eyes/src/ui/components/FeaturedStoryBlock.js`

单个精选故事卡片。

- `imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/FeaturedStoryBlockTemplate.html, ../../styles/extracted/FeaturedStoryBlockStyles.js`
- `manager dependencies: content, router`

**FeaturedStoryBlock**：单个精选故事卡片；继承 SolarSystemPublicApi.BaseContentBlock。

- `constructor`：建立实例初始字段和依赖；写入 _storyList。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this.setEnabled, this._app.getManager, List.add, this._storyList.appendChild, this._setVariables, this.setState；写入 _storyList。

### `eyes/src/ui/components/FeaturesBlock.js`

对象特征选项列表。

- `imports: ../../framework/eyes/index.js, ../../engine/solar-system/public-api.js, ../../app/public-api.js, ../templates/FeaturesBlockTemplate.html`
- `manager dependencies: content, scene, layer`

**FeaturesBlock**：对象特征选项列表；继承 SolarSystemPublicApi.OptionsBlock。

- `constructor`：建立实例初始字段和依赖；调用 Object.assign。
- `addFeatures`：执行 addFeatures 对应的组件业务步骤；调用 this._app.getManager, Manager.getSpheroidFeatures, this.setState, SolarSystemSceneExports.Features.isEnabled, SolarSystemSceneExports.Features.setEnabled, this._createCheckbox, this._children.featuresList.appendChild, this._setVariables。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this._app.getManager, this._app.scene.getEntity, Manager.getSpheroidFeatures, Manager.getEntityInfo, this.addFeatures；写入 _defaultTextureDescription, _previousEntity。

### `eyes/src/ui/components/HintBlock.js`

故事提示内容。

- `imports: ../../framework/eyes/public-api.js, ../templates/HintBlockTemplate.html, ../../styles/extracted/HintBlockStyles.js`

**HintBlock**：故事提示内容；继承 EyesPublicApi.StoryBaseContentBlock。

- `constructor`：建立实例初始字段和依赖；调用 Object.assign。

### `eyes/src/ui/components/ImageBlock.js`

故事图像与说明内容。

- `imports: ../../framework/eyes/public-api.js, ../templates/ImageBlockTemplate.html, ../../styles/extracted/ImageBlockStyles.js`
- `component dependencies: overlay`

**ImageBlock**：故事图像与说明内容；继承 EyesPublicApi.StoryBaseContentBlock。

- `onClick`：执行 onClick 对应的组件业务步骤；调用 this._element.cloneNode, List.add, List.remove, this._app.getComponent。

### `eyes/src/ui/components/InfoPanel.js`

辅助对象信息面板。

- `imports: ../../framework/eyes/index.js, ../../styles/extracted/InfoPanelStyles.js, ../templates/InfoPanelTemplate.html`
- `component dependencies: overlay`

**InfoPanel**：辅助对象信息面板；继承 Eyes.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 Object.assign, this.bindFunctions。
- `openPanel`：执行 openPanel 对应的组件业务步骤；调用 this.show。
- `closePanel`：执行 closePanel 对应的组件业务步骤；调用 this.hide。
- `hide`：执行 hide 对应的组件业务步骤；调用 this.getState, super.hide, this._app.getComponent。
- `show`：执行 show 对应的组件业务步骤；调用 super.show, this._app.getComponent。

### `eyes/src/ui/components/InstrumentFOVBlock.js`

仪器视场选项内容块。

- `imports: ../../engine/solar-system/public-api.js, ../../engine/pioneer/index.js, ../../app/public-api.js, ../../styles/extracted/InstrumentFOVBlockStyles.js, ../templates/InstrumentFOVBlockTemplate.html`

**InstrumentFOVBlock**：仪器视场选项内容块；继承 SolarSystemPublicApi.OptionsBlock。

- `constructor`：建立实例初始字段和依赖；调用 Object.assign, Pioneer.Vector3, Pioneer.Color；写入 _previousEntity, _spacecraft, _instrumentCheckboxes。
- `hasInstrumentsWithFOV`：执行 hasInstrumentsWithFOV 对应的组件业务步骤。
- `init`：初始化模板与关联资源；调用 super.init。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this.reset, this.setState, this._addInstrumentOptions, this._setVariables；写入 _previousEntity。
- `_addInstrumentOptions`：执行 _addInstrumentOptions 对应的组件业务步骤；调用 this.reset, this._instrumentCheckboxes.forEach, this._toggleFrustums, this._createMultistateCheckbox, this._createCheckbox, this._children.instrumentsList.appendChild, this._instrumentCheckboxes.some, this._instrumentCheckboxes.push。
- `_toggleFrustums`：执行 _toggleFrustums 对应的组件业务步骤；调用 this._app.scene.getEntity, Object.entries。
- `reset`：执行 reset 对应的组件业务步骤；写入 _instrumentCheckboxes, _triggeredByInstrumentCheckbox, _triggeredByAllCheckbox。
- `__disable`：卸载 DOM 并取消业务订阅；调用 this.setState, super.__disable；写入 _previousEntity。

### `eyes/src/ui/components/KioskBase.js`

展陈模式基础界面及计时行为。

- `imports: ../../framework/eyes/public-api.js, ../../engine/pioneer/index.js, ../templates/KioskBaseTemplate.html, ../../styles/extracted/KioskBaseStyles.js`
- `manager dependencies: router, camera, layer`
- `component dependencies: kioskSessionClock, layerPanel, story, clock`

**KioskBase**：展陈模式基础界面及计时行为；继承 EyesPublicApi.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 this.app.getManager, Math.ceil, Pioneer.TimeUtils.now；写入 _router, inactivityInterval, sessionInterval, timeOfDaySessionStarted, componentDefaultVisibility, componentEnabledAutoplay。
- `init`：初始化模板与关联资源；调用 super.init, this.app.pioneer.getScene, this.resetLastClicked, this.validateQueries, this._isValidTime, EyesPublicApi.AppUtils.minToSec, this.setUpSessionTimerComponent, this.startSessionTimer, this.setState, this.startInactivityTimer；写入 maxSessionTime, maxInactivityTime。
- `validateQueries`：执行 validateQueries 对应的组件业务步骤；调用 Object.entries, this._isValidTime, Math.abs, this._router.setConfig。
- `_isValidTime`：执行 _isValidTime 对应的组件业务步骤。
- `setEnabled`：切换当前组件及其子组件的启用状态；调用 super.setEnabled, this._isValidTime, this.show。
- `resetLastClicked`：执行 resetLastClicked 对应的组件业务步骤；调用 Math.ceil, Pioneer.TimeUtils.now。
- `sessionStartOverButtonClick`：执行 sessionStartOverButtonClick 对应的组件业务步骤；调用 this.setState, this.resetApp, this.app.getManager。
- `onWindowInteract`：执行 onWindowInteract 对应的组件业务步骤；调用 this.isHidden, this.setState, this.app.getManager, this.resetApp, this.resetLastClicked, this._isValidTime, this.resetSessionTimer, this.startInactivityTimer；写入 inactivityInterval。
- `setUpSessionTimerComponent`：执行 setUpSessionTimerComponent 对应的组件业务步骤；调用 this.app.getComponent, SessionClockComponent.setState, SessionClockComponent.show, SessionClockComponent.setEnabled, SessionClockComponent.setParent, this.updateSessionTimerComponent。
- `startSessionTimer`：执行 startSessionTimer 对应的组件业务步骤；调用 Math.ceil, Pioneer.TimeUtils.now, this.handleSessionTimer；写入 timeOfDaySessionStarted, sessionInterval。
- `handleSessionTimer`：执行 handleSessionTimer 对应的组件业务步骤；调用 this.isHidden, Math.ceil, Pioneer.TimeUtils.now, this.setState, this.updateSessionTimerComponent, this.endSession；写入 timeElapsed。
- `endSession`：执行 endSession 对应的组件业务步骤；调用 this.setState, this.isHidden, this.resetApp, this.setComponentsVisibility；写入 sessionInterval。
- `resetSessionTimer`：执行 resetSessionTimer 对应的组件业务步骤；调用 this.setUpSessionTimerComponent, this.startSessionTimer, this.setState；写入 timeElapsed。
- `updateSessionTimerComponent`：执行 updateSessionTimerComponent 对应的组件业务步骤；调用 this.app.getComponent, EyesPublicApi.AppUtils.formatCountdownTime, SessionClockComponent.update。
- `startInactivityTimer`：执行 startInactivityTimer 对应的组件业务步骤；调用 this.handleMaxInactivityTime；写入 inactivityInterval。
- `handleMaxInactivityTime`：执行 handleMaxInactivityTime 对应的组件业务步骤；调用 Math.ceil, Pioneer.TimeUtils.now；写入 currentTimeWithoutActivity。
- `startAutoplay`：执行 startAutoplay 对应的组件业务步骤；调用 this.setState, this.resetApp, this.setComponentsEnabled；写入 inactivityInterval。
- `resetLayers`：执行 resetLayers 对应的组件业务步骤；调用 Object.keys, this.app.getManager。
- `setComponentsVisibility`：执行 setComponentsVisibility 对应的组件业务步骤；调用 Object.entries, this.app.getComponent。
- `setComponentsEnabled`：执行 setComponentsEnabled 对应的组件业务步骤；调用 Object.entries, this.app.getComponent。
- `resetApp`：执行 resetApp 对应的组件业务步骤；调用 this.app.getComponent, this.app.getManager, this.resetLayers, this.setComponentsVisibility, this._router.navigate, this.app.cameraScripts.goToSystem。
- `isHidden`：执行 isHidden 对应的组件业务步骤；调用 List.contains。

### `eyes/src/ui/components/LayerPanel.js`

图层分组与可见性开关面板。

- `imports: ../../framework/eyes/public-api.js, ../templates/LayerPanelTemplate.html, ../../styles/extracted/LayerPanelStyles.js`
- `manager dependencies: layer`

**LayerPanel**：图层分组与可见性开关面板；继承 EyesPublicApi.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 Object.assign, this.bindFunctions, EyesPublicApi.AppUtils.isMobileMode, this._initCallbacks；写入 _eyesCheck, _categories, _categoriesDisplay, _fadeInRight, _fadeOutRight, _fadeInBottom, _fadeOutBottom, _lastMode。
- `getCategoriesDisplay`：执行 getCategoriesDisplay 对应的组件业务步骤。
- `resize`：重排响应式界面；调用 super.resize, this._updatePosition。
- `init`：初始化模板与关联资源；调用 super.init, this._callbackRegistry.push, this._app.getManager, this._config.layers.forEach, List.add, EyesPublicApi.Checkbox, this._components.push, this._setVariables。
- `_createAnimations`：执行 _createAnimations 对应的组件业务步骤；调用 EyesPublicApi.AnimationUtils.directionalFade；写入 _fadeOutRight, _fadeInRight, _fadeOutBottom, _fadeInBottom。
- `_resetAnimations`：执行 _resetAnimations 对应的组件业务步骤；调用 this._fadeInRight.pause, this._fadeOutRight.pause, this._fadeInBottom.pause, this._fadeOutBottom.pause。
- `toggleLayer`：执行 toggleLayer 对应的组件业务步骤；调用 this._app.getManager。
- `handleLayerToggle`：执行 handleLayerToggle 对应的组件业务步骤；调用 this.getState, this.setState, this._components.find, this._app.getManager。
- `isCategoryEnabled`：执行 isCategoryEnabled 对应的组件业务步骤；调用 List.contains。
- `setCategoryEnabled`：执行 setCategoryEnabled 对应的组件业务步骤；调用 List.toggle。
- `hide`：执行 hide 对应的组件业务步骤；调用 this.getState, super.hide, EyesPublicApi.AppUtils.isMobileMode, EyesPublicApi.AnimationUtils.directionalFade, this._fadeOutBottom.play, this._fadeOutRight.play；写入 _fadeOutBottom, _fadeOutRight。
- `show`：执行 show 对应的组件业务步骤；调用 super.show, EyesPublicApi.AppUtils.isMobileMode, EyesPublicApi.AnimationUtils.directionalFade, this._fadeInBottom.play, this._fadeInRight.play；写入 _fadeInBottom, _fadeInRight。
- `_updatePosition`：执行 _updatePosition 对应的组件业务步骤；调用 EyesPublicApi.AppUtils.isMobileMode, this.show；写入 _lastMode。
- `__enable`：挂载 DOM 并登记窗口和业务订阅；调用 super.__enable, this._createAnimations。
- `__disable`：卸载 DOM 并取消业务订阅；调用 super.__disable；写入 _fadeInRight, _fadeOutRight, _fadeInBottom, _fadeOutBottom。

### `eyes/src/ui/components/LayersBlock.js`

对象相关图层选项内容块。

- `imports: ../../engine/pioneer/index.js, ../../engine/solar-system/public-api.js, ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/LayersBlockTemplate.html`
- `manager dependencies: content, layer, router`

**LayersBlock**：对象相关图层选项内容块；继承 SolarSystemPublicApi.OptionsBlock。

- `constructor`：建立实例初始字段和依赖；调用 Object.assign, this._app.getManager, SolarSystemSceneExports.Entity.getEntityNamesInGroup, Manager.getEntityInfo, this._defaultLayers.includes, this.bindFunctions；写入 _layers, _previousEntity, _previousChildEntity, _defaultLayers。
- `init`：初始化模板与关联资源；调用 super.init, this._callbackRegistry.push, this._app.getManager。
- `_addLayerOptions`：执行 _addLayerOptions 对应的组件业务步骤；调用 this._app.getManager, this._createCheckbox, this._components.push, this._children.layersList.appendChild。
- `_addDefaultOptions`：执行 _addDefaultOptions 对应的组件业务步骤；调用 this._app.getManager, this.setState, this._defaultLayers.push, this._defaultLayers.includes, this._addLayerOptions, this._setVariables。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this._app.scene.getEntity, this.reset, this.setState, this._addDefaultOptions, this._app.getManager, Manager.getLayer, this._defaultLayers.includes, this._components.find；写入 _previousEntity, _previousChildEntity。
- `syncSpacecraftLayer`：执行 syncSpacecraftLayer 对应的组件业务步骤；调用 this._components.find, this.syncCheckbox。
- `syncAllLayerCheckboxes`：执行 syncAllLayerCheckboxes 对应的组件业务步骤；调用 this._components.find, this.syncCheckbox, this._app.getManager。
- `syncCheckbox`：执行 syncCheckbox 对应的组件业务步骤；调用 this._app.getManager。
- `reset`：执行 reset 对应的组件业务步骤；调用 this._app.getManager, this._components.find, this.syncCheckbox；写入 _defaultLayers, _components。
- `__disable`：卸载 DOM 并取消业务订阅；调用 this.setState, super.__disable；写入 _previousEntity, _previousChildEntity。

### `eyes/src/ui/components/LoadIcon.js`

加载指示器显示与隐藏。

- `imports: ../../framework/eyes/public-api.js, ../templates/LoadIconTemplate.html`
- `manager dependencies: scene`

**LoadIcon**：加载指示器显示与隐藏；继承 EyesPublicApi.BaseComponent。

- `init`：初始化模板与关联资源；调用 super.init, this._callbackRegistry.push, this._app.getManager, this.hide。

### `eyes/src/ui/components/Menu.js`

主菜单、搜索和导航入口。

- `imports: ../../vendor/modules/Unidentified989.cjs, ../../framework/eyes/index.js, ../templates/MenuTemplate.html, ../../styles/extracted/MenuStyles.js`
- `manager dependencies: router, content`
- `component dependencies: searchMobile`

**Menu**：主菜单、搜索和导航入口；继承 Eyes.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 this.bindFunctions；写入 _backFunction, _categories, _listMenuContainer, _listMenu, _aToZMenu, _scrollbar。
- `handleBackButton`：执行 handleBackButton 对应的组件业务步骤；调用 this._backFunction。
- `init`：初始化模板与关联资源；调用 super.init, Eyes.AppUtils.htmlToElement, this._setEventHandlersFromAttributes, this.resize。
- `resize`：重排响应式界面；调用 super.resize, Eyes.AppUtils.isMobileMode, this.setState, this.getState, this._goToMain；写入 _backFunction。
- `setupAtoZ`：执行 setupAtoZ 对应的组件业务步骤；调用 List.add, this.clickOnEntry。
- `_goToMain`：执行 _goToMain 对应的组件业务步骤；调用 this.setState, this._scrollbar.destroy, this._children.header.replaceChild, this._children.contentWrapper.replaceChild, this._children.contentWrapper.appendChild, Eyes.AppUtils.isMobileMode, this._app.getComponent, this._children.mainMenu.prepend, this.getState, this._initScrollbar；写入 _scrollbar。
- `_goToList`：执行 _goToList 对应的组件业务步骤；调用 this.setState, this._scrollbar.destroy, this._children.header.replaceChild, this._children.contentWrapper.replaceChild, this.getState, this._initScrollbar；写入 _backFunction, _scrollbar。
- `_goToAtoZ`：执行 _goToAtoZ 对应的组件业务步骤；调用 Eyes.AppUtils.isMobileMode, this.setState, this._scrollbar.destroy, this._children.header.replaceChild, this._children.contentWrapper.replaceChild, this.getState, this._initScrollbar；写入 _backFunction, _scrollbar。
- `clickOnEntry`：执行 clickOnEntry 对应的组件业务步骤；调用 this.hide, this._app.getManager。
- `_initScrollbar`：执行 _initScrollbar 对应的组件业务步骤；调用 Eyes.AppUtils.addScrollbar, this._scrollbar.scroll；写入 _scrollbar。
- `show`：执行 show 对应的组件业务步骤；调用 super.show, this._goToMain。
- `hide`：执行 hide 对应的组件业务步骤；调用 this._scrollbar.destroy, super.hide；写入 _scrollbar。
- `updateMenuContent`：执行 updateMenuContent 对应的组件业务步骤；调用 this._app.getManager, Manager.getEntityInfo, Manager.getStoryList, Object.keys, this.setupContent, this._app.getComponent。
- `setupContent`：执行 setupContent 对应的组件业务步骤；调用 Eyes.AppUtils.isMobileMode, this.setState, this._goToList, List.add, this.clickOnEntry, Math.min, this._goToAtoZ, this.setupAtoZ, this._app.getComponent, this._children.mainMenu.appendChild, this.resize, this._goToMain；写入 _contentInfo。

### `eyes/src/ui/components/MobileExpandButton.js`

移动端展开目标内容面板的按钮。

- `imports: ../../framework/eyes/index.js, ../../styles/extracted/MobileExpandButtonStyles-928.js, ../../vendor/modules/animateFill-929.js, ../templates/MobileExpandButtonTemplate.html, ../../styles/extracted/MobileExpandButtonStyles-987.js`

**MobileExpandButton**：移动端展开目标内容面板的按钮；继承 Eyes.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 this._expandButtonClicked.bind, this.showCPButton.bind, Fill.default.setDefaultProps；写入 _component, _expandButtonClicked, showCPButton。
- `init`：初始化模板与关联资源；调用 super.init。
- `_expandButtonClicked`：执行 _expandButtonClicked 对应的组件业务步骤；调用 this._app.getComponent, this.hide。
- `showCPButton`：执行 showCPButton 对应的组件业务步骤；调用 Eyes.AppUtils.isMobileMode, this.setState；写入 _component。

### `eyes/src/ui/components/Overlay.js`

遮罩显示和关闭交互。

- `imports: ../../vendor/modules/Unidentified160.cjs, ../../framework/eyes/public-api.js, ../templates/OverlayTemplate.html`

**Overlay**：遮罩显示和关闭交互；继承 EyesPublicApi.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 Object.assign；写入 _scrollbar。
- `init`：初始化模板与关联资源；调用 super.init, this._children.overlayContent.appendChild, this._element.addEventListener, this._children.overlay.classList.contains。
- `setContent`：执行 setContent 对应的组件业务步骤；调用 this._children.overlayContent.appendChild, this._children.overlayContent.replaceChild。
- `show`：执行 show 对应的组件业务步骤；调用 this._element.classList.add, super.show。
- `__enable`：挂载 DOM 并登记窗口和业务订阅；调用 super.__enable, EyesPublicApi.AppUtils.onAttachElement, EyesPublicApi.AppUtils.addScrollbar, this._scrollbar.scroll；写入 _scrollbar。

### `eyes/src/ui/components/OverviewBlock.js`

对象概览内容块。

- `imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../../vendor/modules/Unidentified777.cjs, ../templates/OverviewBlockTemplate.html, ../../styles/extracted/OverviewBlockStyles.js, ../../engine/pioneer/index.js`
- `manager dependencies: router, content, time, scene`
- `component dependencies: contentPanel`

**OverviewBlock**：对象概览内容块；继承 SolarSystemPublicApi.BaseContentBlock。

- `constructor`：建立实例初始字段和依赖；调用 this.setState, this.bindFunctions。
- `goBack`：执行 goBack 对应的组件业务步骤；调用 this._app.getManager, this._app.getComponent, Manager.navigate。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this._app.getManager, this._app.scene.getEntity, this._determineOverviewContent, Pioneer.TimeUtils.now, this.setState, this._setVariables, this._app.getComponent, this._children.overviewTitle.classList.toggle, this._app.pioneer.getScene, this._app.pioneer.getTime；写入 _targetId。
- `_determineOverviewContent`：执行 _determineOverviewContent 对应的组件业务步骤；调用 this._getSubheadingForObject。
- `_getSubheadingForObject`：执行 _getSubheadingForObject 对应的组件业务步骤；调用 this._app.getManager。

### `eyes/src/ui/components/RelatedBlock.js`

相关对象链接内容块。

- `imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/RelatedBlockTemplate.html, ../../styles/extracted/RelatedBlockStyles.js`
- `manager dependencies: content, router, camera`
- `component dependencies: contentPanel`

**RelatedBlock**：相关对象链接内容块；继承 SolarSystemPublicApi.BaseContentBlock。

- `constructor`：建立实例初始字段和依赖；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTabletPortrait, this.setState。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTabletPortrait, this.populateStoryCard, this.setState, this._app.getManager, List.add, this._children.relatedList.appendChild, this.hide。
- `populateStoryCard`：执行 populateStoryCard 对应的组件业务步骤；调用 this.setEnabled, List.add, this._app.getManager, this._app.scene.getLoadedPromise, this._app.getComponent, this._storyList.appendChild；写入 _storyList。
- `resize`：重排响应式界面；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTabletPortrait, this.setState。

### `eyes/src/ui/components/ReplayBlock.js`

对象事件重播控件。

- `imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/ReplayBlockTemplate.html, ../../styles/extracted/ReplayBlockStyles.js`
- `manager dependencies: time, content`
- `component dependencies: eventsReplayClock, clockShortcut, eventReplayTimeControls, eventsTimeline`

**ReplayBlock**：对象事件重播控件；继承 SolarSystemPublicApi.BaseContentBlock。

- `constructor`：建立实例初始字段和依赖；调用 this.bindFunctions；写入 _app, _isPlaying。
- `init`：初始化模板与关联资源；调用 super.init, this._callbackRegistry.push, this._app.getManager。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this._app.getManager, Events.findIndex, Manager.getTime, Manager.getDateFormat, this.setState, this.app.getComponent, ReplayClockComponent.show, ReplayClockComponent.setEnabled, ReplayClockComponent.setParent, this._app.getComponent, InputRange.addEventListener, this._app.pioneer.getTimeRate；写入 _objectId, _eventStartTime, _eventEndTime, _currentEvent, _prevEventId, _nextEventId。
- `_addTimeToDate`：执行 _addTimeToDate 对应的组件业务步骤。
- `_onSliderMove`：执行 _onSliderMove 对应的组件业务步骤；调用 this._addTimeToDate, this._app.getManager, this.setState。
- `update`：执行 update 对应的组件业务步骤；调用 this.setState, this._app.getManager, this._app.pioneer.getTimeRate；写入 _isAtEnd。
- `setUpEventTimeControls`：执行 setUpEventTimeControls 对应的组件业务步骤；调用 this._app.getComponent, ReplayTimeControlsComponent.setState, ReplayTimeControlsComponent.show, ReplayTimeControlsComponent.element.classList.add, ReplayTimeControlsComponent.setCanUpdate, ReplayTimeControlsComponent.setEnabled, ReplayTimeControlsComponent.setParent。
- `prevButtonClicked`：执行 prevButtonClicked 对应的组件业务步骤；调用 this._app.getComponent。
- `nextButtonClicked`：执行 nextButtonClicked 对应的组件业务步骤；调用 this._app.getComponent。
- `_pauseEvent`：执行 _pauseEvent 对应的组件业务步骤；调用 this.setState, this._app.getManager。
- `_playEvent`：执行 _playEvent 对应的组件业务步骤；调用 this.setState, this._app.getManager。
- `playPauseEvent`：执行 playPauseEvent 对应的组件业务步骤；调用 this._app.getView, this._app.pioneer.getTimeRate, this._playEvent, this._pauseEvent。

### `eyes/src/ui/components/ReplayButtonBlock.js`

故事内重播按钮。

- `imports: ../../framework/eyes/public-api.js, ../templates/ReplayButtonBlockTemplate.html, ../../styles/extracted/ReplayButtonBlockStyles.js`
- `manager dependencies: router`

**ReplayButtonBlock**：故事内重播按钮；继承 EyesPublicApi.StoryBaseContentBlock。

- `init`：初始化模板与关联资源；调用 super.init。
- `onClick`：执行 onClick 对应的组件业务步骤；调用 this._app.getManager, Manager.navigate, Manager.reload。

### `eyes/src/ui/components/Search.js`

搜索输入、建议结果和选择导航。

- `imports: ../../framework/eyes/public-api.js, ../templates/SearchTemplate.html`
- `manager dependencies: search, content, router`

**Search**：搜索输入、建议结果和选择导航；继承 EyesPublicApi.BaseComponent。

- `init`：初始化模板与关联资源；调用 super.init, this._children.input.getAttribute, this.setState, this.resize, this.registerManager, this._app.getManager。
- `onIconClick`：执行 onIconClick 对应的组件业务步骤；调用 this.open, this._children.input.focus, this.reset, this._children.results.querySelector, Child.click。
- `resize`：重排响应式界面；调用 super.resize, this.onResize。
- `reset`：执行 reset 对应的组件业务步骤；调用 this.eraseInput, this.close。
- `keydown`：执行 keydown 对应的组件业务步骤；调用 this.eraseInput, this.close, this._handleClick, this.setSelected；写入 index。
- `setSelected`：执行 setSelected 对应的组件业务步骤；调用 List.add, List.remove；写入 index。
- `onInputFocus`：执行 onInputFocus 对应的组件业务步骤；调用 this.setState。
- `eraseInput`：执行 eraseInput 对应的组件业务步骤；写入 _resultsScrollbar。
- `registerManager`：执行 registerManager 对应的组件业务步骤；写入 _searchManager。
- `_find`：执行 _find 对应的组件业务步骤；调用 this._searchManager.find, this._excludeResults.includes, this.renderResults；写入 _searchTimeout。
- `renderResults`：执行 renderResults 对应的组件业务步骤；调用 this._children.results.classList.remove, Array.isArray, Search.find, String.toLowerCase, this._renderResultCard, this._renderResultList, this._renderSuggestions, this._createScrollbar, Math.min, this.setState, this.setSelected；写入 index, results, _searchString, _resultsScrollbar。
- `_renderResultCard`：执行 _renderResultCard 对应的组件业务步骤；调用 this._getDetails, Display.find, EyesPublicApi.AppUtils.addStartToPath, this.setSelected, this._handleClick, this.results.push, this._children.results.appendChild, this._createStoryBlock, this._createEventsBlock, this._createExplorationBlock, this._createMoonsBlock, this._renderResultList。
- `_createEventsBlock`：执行 _createEventsBlock 对应的组件业务步骤；调用 Array.isArray, this._app.getManager, this._createBlockContainer, List.add, this._createHeaderBlock, EyesPublicApi.AppUtils.addStartToPath, this._createSingleResult, this.results.push。
- `_createMoonsBlock`：执行 _createMoonsBlock 对应的组件业务步骤；调用 Array.isArray, this._createBlockContainer, List.add, this._createHeaderBlock, this._createSingleResult, this.results.push。
- `_createExplorationBlock`：执行 _createExplorationBlock 对应的组件业务步骤；调用 Array.isArray, this._createBlockContainer, List.add, this._createHeaderBlock, this._createSingleResult, this.results.push。
- `_createStoryBlock`：执行 _createStoryBlock 对应的组件业务步骤；调用 Array.isArray, this._createBlockContainer, List.add, this._app.getManager, this._createHeaderBlock, this._createSingleResult, this.results.push。
- `_createBlockContainer`：执行 _createBlockContainer 对应的组件业务步骤；调用 this._children.results.appendChild。
- `_createHeaderBlock`：执行 _createHeaderBlock 对应的组件业务步骤。
- `_createSingleResult`：执行 _createSingleResult 对应的组件业务步骤；调用 this._handleClick, this.setSelected。
- `_renderResultList`：执行 _renderResultList 对应的组件业务步骤；调用 Search.find, EyesPublicApi.AppUtils.addStartToPath, this.setSelected, this._handleClick, this.results.push, this._children.results.appendChild。
- `_renderSuggestions`：执行 _renderSuggestions 对应的组件业务步骤；调用 Math.min, Search.find, EyesPublicApi.AppUtils.addStartToPath, this.setSelected, this._handleClick, this.results.push, this._children.results.classList.add, this._children.results.appendChild。
- `open`：执行 open 对应的组件业务步骤；调用 this.setState。
- `close`：执行 close 对应的组件业务步骤；调用 this.getState, this.setState。
- `setupFeaturedSuggestion`：执行 setupFeaturedSuggestion 对应的组件业务步骤；调用 this._handleClick, this._children.featured.appendChild。
- `_createScrollbar`：执行 _createScrollbar 对应的组件业务步骤；调用 EyesPublicApi.AppUtils.addScrollbar。
- `_getLink`：执行 _getLink 对应的组件业务步骤。
- `_handleClick`：执行 _handleClick 对应的组件业务步骤；调用 this.reset, this.triggerCallbacks, this._app.getManager, this._getLink, Manager.navigate。
- `simulate`：执行 simulate 对应的组件业务步骤；调用 this.onIconClick, this._find。
- `_getDetails`：执行 _getDetails 对应的组件业务步骤；调用 this._app.getManager。
- `setExcludeResults`：执行 setExcludeResults 对应的组件业务步骤；写入 _excludeResults。
- `__enable`：挂载 DOM 并登记窗口和业务订阅；调用 super.__enable, this._createScrollbar。

### `eyes/src/ui/components/Settings.js`

单位、图层等用户设置的交互界面。

- `imports: ../../vendor/modules/Unidentified167.js, ../../vendor/modules/animateFill-168.js, ../../engine/pioneer/index.js, ../../framework/eyes/public-api.js, ../templates/SettingsTemplate.html`
- `manager dependencies: camera, time, router, comparison`
- `component dependencies: layerPanel, infoPanel`

**Settings**：单位、图层等用户设置的交互界面；继承 EyesPublicApi.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 EyesPublicApi.AppUtils.isPortrait, EyesPublicApi.AppUtils.isMobilePortrait, EyesPublicApi.AppUtils.isTabletPortrait, EyesPublicApi.AppUtils.isLandscape, EyesPublicApi.AppUtils.isMobileLandscape, EyesPublicApi.AppUtils.isTabletLandscape, EyesPublicApi.AppUtils.isPanorama, EyesPublicApi.AppUtils.isMobileMode, Object.assign, this.isHorizontal, this.app.getManager, Manager.getFullLightColor, Manager.getShadowLightColor, this._eventNames.push；写入 _ori, _isMobileMode, _isHorizontal, _fullLightColor, _shadowLightColor, _isMouseHold, _isContinuousZoom, _zoomInterval, _zoomTimeout, _tooltips。
- `init`：初始化模板与关联资源；调用 super.init, this._children.zoomInButton.addEventListener, this._stopZooming, this._zoomIn, this._children.zoomOutButton.addEventListener, this._zoomOut, this.toggleLightOptions.bind, this._children.shadow.classList.add, this.toggleLightOptions, Unidentified167.default.on, this.setState, this._element.querySelectorAll, this.addTooltips, this.setProps。
- `addTooltips`：执行 addTooltips 对应的组件业务步骤；调用 this._tooltips.push。
- `updateTooltips`：执行 updateTooltips 对应的组件业务步骤。
- `setConfig`：执行 setConfig 对应的组件业务步骤；调用 this.app.getManager, super.setConfig, this.isHorizontal, this.setState, this.collapse, this.hideFullScreenOption, this.toggleLightOptions, this._updateSize。
- `getOrientation`：执行 getOrientation 对应的组件业务步骤。
- `setOrientation`：执行 setOrientation 对应的组件业务步骤；写入 _ori。
- `isHorizontal`：执行 isHorizontal 对应的组件业务步骤。
- `_updateSize`：执行 _updateSize 对应的组件业务步骤；调用 this.isHorizontal, Array.from, this._children.content.querySelectorAll, List.contains, this.updateTooltips；写入 _isHorizontal。
- `_zoomContinuously`：执行 _zoomContinuously 对应的组件业务步骤；写入 _isMouseHold, _zoomTimeout, _isContinuousZoom, _zoomInterval。
- `_zoomIn`：执行 _zoomIn 对应的组件业务步骤；调用 this._zoomContinuously, this._config.zoomIn。
- `_zoomOut`：执行 _zoomOut 对应的组件业务步骤；调用 this._zoomContinuously, this._config.zoomOut。
- `_stopZooming`：执行 _stopZooming 对应的组件业务步骤；写入 _isMouseHold, _isContinuousZoom。
- `show`：执行 show 对应的组件业务步骤；调用 this.setState。
- `hide`：执行 hide 对应的组件业务步骤；调用 this.setState。
- `isVisible`：执行 isVisible 对应的组件业务步骤。
- `expand`：执行 expand 对应的组件业务步骤；调用 this.setState。
- `collapse`：执行 collapse 对应的组件业务步骤；调用 this.setState。
- `toggleCollapse`：执行 toggleCollapse 对应的组件业务步骤；调用 this.expand, this.collapse, this.triggerCallbacks。
- `toggleUnit`：执行 toggleUnit 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
- `toggleFullscreen`：执行 toggleFullscreen 对应的组件业务步骤；调用 Unidentified167.default.toggle。
- `toggleLayers`：执行 toggleLayers 对应的组件业务步骤；调用 this._app.getComponent, this.collapse。
- `togglePhotoMode`：执行 togglePhotoMode 对应的组件业务步骤；调用 this.setState, this.collapse, this.expand, this.triggerCallbacks。
- `hideLightingOptions`：执行 hideLightingOptions 对应的组件业务步骤；调用 this.setState。
- `hideFullScreenOption`：执行 hideFullScreenOption 对应的组件业务步骤；调用 this.setState。
- `toggleLightOptions`：执行 toggleLightOptions 对应的组件业务步骤；调用 this.setState, this._app.getManager, List.remove, List.add。
- `toggleLight`：执行 toggleLight 对应的组件业务步骤；调用 this.setState, this.getState。
- `startGuidedCamera`：执行 startGuidedCamera 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
- `stopGuidedCamera`：执行 stopGuidedCamera 对应的组件业务步骤；调用 this.setState, this.triggerCallbacks。
- `toggleGuidedCamera`：执行 toggleGuidedCamera 对应的组件业务步骤；调用 this.stopGuidedCamera, this.startGuidedCamera。
- `toggleInfoPanel`：执行 toggleInfoPanel 对应的组件业务步骤；调用 this._app.getComponent。
- `resize`：重排响应式界面；调用 super.resize, this.isHorizontal, this.setState, this._updateSize。

### `eyes/src/ui/components/ShareModal.js`

分享 URL、嵌入设置和复制界面。

- `imports: ../../framework/eyes/public-api.js, ../../vendor/modules/Unidentified160.cjs, ../templates/ShareModalTemplate.html, ../../vendor/modules/animateFill-168.js, ../../engine/core/Unidentified511.js`
- `manager dependencies: title, router`

**ShareModal**：分享 URL、嵌入设置和复制界面；继承 EyesPublicApi.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 EyesPublicApi.AppUtils.isiPhone, this.bindFunctions；写入 _activeTab, _srcURL, _embedOptionsScrollbar, _tippySingleton, _tippyItems, _tippyTimeout, _embedQueries, _inputElements。
- `mergeEmbedControls`：执行 mergeEmbedControls 对应的组件业务步骤；调用 Unidentified511.default.map。
- `init`：初始化模板与关联资源；调用 super.init, this.mergeEmbedControls, this.setEmbedParams, this.generateEmbedContent, this.setIsWide, this.createScrollbars, this.createShareButton, this.addShareButtonToParent, Fill.default.setDefaultProps；写入 _tippyTimeout。
- `createScrollbars`：执行 createScrollbars 对应的组件业务步骤；调用 EyesPublicApi.AppUtils.onAttachElement, EyesPublicApi.AppUtils.addScrollbar；写入 _embedOptionsScrollbar。
- `getCurrentDevice`：执行 getCurrentDevice 对应的组件业务步骤；调用 EyesPublicApi.AppUtils.isTablet, EyesPublicApi.AppUtils.isMobile。
- `createShareButton`：执行 createShareButton 对应的组件业务步骤；调用 this.shareButton.prepend, this.shareButton.addEventListener, this.setSrcURL, this.setPreviewDevice, this.getCurrentDevice, this.setActiveTab, Image.setAttribute, this._app.getManager, this.setState, this.show；写入 shareButton。
- `setIsWide`：执行 setIsWide 对应的组件业务步骤；调用 this.setState。
- `addShareButtonToParent`：执行 addShareButtonToParent 对应的组件业务步骤；调用 EyesPublicApi.AppUtils.elementReady。
- `setSrcURL`：执行 setSrcURL 对应的组件业务步骤；调用 Options.flatMap, this._app.getManager, Array.from, ToKeep.includes；写入 _srcURL。
- `setEmbedParams`：执行 setEmbedParams 对应的组件业务步骤；调用 Options.forEach。
- `updateEmbedParams`：执行 updateEmbedParams 对应的组件业务步骤；调用 this.updateEmbedCode。
- `updateEmbedCode`：执行 updateEmbedCode 对应的组件业务步骤；调用 this.getEmbedCodeFromParams, EyesPublicApi.AppUtils.isiPhone, HTML.replace, PreviewParent.querySelector, Options.flatMap, ToKeep.includes, this._app.getManager, Object.keys, List.add, this.resize。
- `calcTemplateWidth`：执行 calcTemplateWidth 对应的组件业务步骤。
- `calcIframeTransform`：执行 calcIframeTransform 对应的组件业务步骤；调用 this.resize。
- `_iframeLoadEventListener`：执行 _iframeLoadEventListener 对应的组件业务步骤；调用 this.setSrcURL, this.updateEmbedCode。
- `calcIframeTransforms`：执行 calcIframeTransforms 对应的组件业务步骤；调用 this._element.style.setProperty, Math.min。
- `setPreviewDevice`：执行 setPreviewDevice 对应的组件业务步骤；调用 this.setState, this.updateEmbedCode。
- `toggleIframeElements`：执行 toggleIframeElements 对应的组件业务步骤；调用 this.setState, this.updateEmbedCode。
- `getEmbedCodeFromParams`：执行 getEmbedCodeFromParams 对应的组件业务步骤；调用 Options.flatMap, this._srcURL.split, Object.entries, Object.fromEntries, Object.keys, RLSearchParams.set, RLSearchParams.toString。
- `generateEmbedContent`：执行 generateEmbedContent 对应的组件业务步骤；调用 Options.forEach, this.createGroupLegend, this.createGroupInputs。
- `createGroupLegend`：执行 createGroupLegend 对应的组件业务步骤。
- `createGroupInputs`：执行 createGroupInputs 对应的组件业务步骤；调用 this.createGroupLegend, this.createGroupInputs, this.updateEmbedParams, List.toggle。
- `destroyEmbedContent`：执行 destroyEmbedContent 对应的组件业务步骤。
- `setActiveTab`：执行 setActiveTab 对应的组件业务步骤；调用 Headers.childNodes.forEach, List.contains, List.toggle, Content.childNodes.forEach, this.updateEmbedCode；写入 _tippyItems, _tippySingleton, _activeTab。
- `copyToClipboard`：执行 copyToClipboard 对应的组件业务步骤；调用 Overlay.classList.remove, Overlay.classList.add。
- `handleClick`：执行 handleClick 对应的组件业务步骤；调用 this.hide, this.resetScrollbar, this.resetEmbedOptions, this.destroyTooltips。
- `handleTabClick`：执行 handleTabClick 对应的组件业务步骤；调用 this.setActiveTab。
- `destroyTooltips`：执行 destroyTooltips 对应的组件业务步骤；写入 _tippyItems, _tippySingleton。
- `resetEmbedOptions`：执行 resetEmbedOptions 对应的组件业务步骤；调用 this.setEmbedParams, this.destroyEmbedContent, this.generateEmbedContent。
- `resetScrollbar`：执行 resetScrollbar 对应的组件业务步骤；调用 this._embedOptionsScrollbar.scroll。
- `resize`：重排响应式界面；调用 this.calcIframeTransforms, this.setIsWide, this.addShareButtonToParent, this.resetScrollbar。
- `setEnabled`：切换当前组件及其子组件的启用状态；调用 super.setEnabled, this.shareButton.classList.toggle, this.addShareButtonToParent。
- `__destroy`：执行停用并释放根节点和父节点引用；调用 super.__disable；写入 shareButton。

### `eyes/src/ui/components/SpecialFeaturesBlock.js`

对象特殊功能入口。

- `imports: ../../framework/eyes/index.js, ../../engine/solar-system/public-api.js, ../../app/public-api.js, ../templates/SpecialFeaturesBlockTemplate.html, ../../styles/extracted/SpecialFeaturesBlockStyles.js`
- `manager dependencies: content, router`

**SpecialFeaturesBlock**：对象特殊功能入口；继承 SolarSystemPublicApi.BaseContentBlock。

- `constructor`：建立实例初始字段和依赖；写入 _state。
- `init`：初始化模板与关联资源；调用 super.init, this._element.classList.add。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this._app.getManager, this.hide, this.show, this.setState, SolarSystemSceneExports.Entity.getEntityNamesInGroup, List.add, this._children.specialFeatures.appendChild。

### `eyes/src/ui/components/SurfaceMapBlock.js`

对象表面地图选择。

- `imports: ../../engine/pioneer/index.js, ../../engine/solar-system/public-api.js, ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/SurfaceMapBlockTemplate.html`
- `manager dependencies: layer, scene, content, router`

**SurfaceMapBlock**：对象表面地图选择；继承 SolarSystemPublicApi.OptionsBlock。

- `constructor`：建立实例初始字段和依赖；调用 Object.assign, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet；写入 _defaultTextureDescription, _currentlyCheckedOption, _previousEntity, _previousChildEntity。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this._app.getManager, this.setState, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet, this.addSurfaceMaps, this._setVariables；写入 _currentLayer, _currentlyCheckedOption, _previousEntity, _previousChildEntity。
- `addSurfaceMaps`：执行 addSurfaceMaps 对应的组件业务步骤；调用 this._app.getManager, this.setState, this.addDefaultTexture, this._createDefaultRadioButton, this._createRadioButton, this._children.surfaceMapList.appendChild, Array.from；写入 _currentlyCheckedOption。
- `_createDefaultRadioButton`：执行 _createDefaultRadioButton 对应的组件业务步骤；调用 this.addDefaultTexture, this._app.getManager, this._children.surfaceMapList.appendChild；写入 _currentlyCheckedOption。
- `addDefaultTexture`：执行 addDefaultTexture 对应的组件业务步骤；调用 this._app.pioneer.getScene, this._app.getManager；写入 _defaultTextureDescription, _defaultTextureType。
- `resize`：重排响应式界面；调用 super.resize, this.setState, Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet。
- `reset`：执行 reset 对应的组件业务步骤；调用 this.app.getManager, this.addDefaultTexture, this.addSurfaceMaps, this._app.getManager；写入 _defaultTextureDescription。
- `__disable`：卸载 DOM 并取消业务订阅；调用 this.setState, super.__disable；写入 _previousEntity, _previousChildEntity。

### `eyes/src/ui/components/Telescope.js`

望远镜观察目标、视场和相机控制。

- `imports: ../../engine/pioneer/index.js, ../../framework/eyes/index.js, ../../styles/extracted/MobileExpandButtonStyles-928.js, ../../vendor/modules/animateFill-929.js, ../../engine/core/Unidentified1069.js, ../templates/TelescopeTemplate.html, ../../styles/extracted/TelescopeStyles.js`
- `manager dependencies: label, selection, layer, router, scene, content`
- `component dependencies: settings`

**Telescope**：望远镜观察目标、视场和相机控制；继承 Eyes.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 Eyes.AppUtils.isMobileMode, Fill.default.setDefaultProps；写入 _target, _targetEntity, longitude, latitude, helper, _firstLoad。
- `resize`：重排响应式界面；调用 super.resize, this.checkPlatform。
- `onEnter`：进入视图时准备界面和订阅；调用 this.app.getManager, this.app.getComponent, this.toggleConstellation, this._toggleSurfaceMaps；写入 lightType。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this._children.tapHint.classList.remove, Unidentified1069.default, this.app.getManager, this.setLatitudeLongitude；写入 _target, _targetEntity, _firstLoad, helper, lyrManager, orbiterVisibility。
- `onLeave`：离开视图时恢复状态并解除订阅；调用 this.helper.reset, this.app.scene.getEntity, this.toggleConstellation, this.app.getManager, this.app.getComponent, this._targetEntity.setOcclusionRadius, this.lyrManager.toggleLayer, this._app.pioneer.getScene, this._toggleSurfaceMaps；写入 helper。
- `exitTelescope`：执行 exitTelescope 对应的组件业务步骤；调用 this._app.getManager。
- `processQuery`：把查询参数应用到时间、图层或模块状态；调用 this._children.tapHint.classList.add, this.setLatitudeLongitude, this.setView, this.helper.flyToSurface, this._children.tapHint.classList.remove, this._app.getManager, this.toggleConstellation；写入 latitude, longitude, _firstLoad。
- `checkPlatform`：执行 checkPlatform 对应的组件业务步骤；调用 this.setState, Eyes.AppUtils.isMobileMode。
- `setView`：执行 setView 对应的组件业务步骤；调用 this.setState, this.app.getManager, this.app.cameraScripts.goToCelestialObject, this.app.cameraScripts.lookAtSurfaceLatLon, this.app.pioneer.getScene, this.app.scene.getEntity, this._pickController.setPickedEntity, this._pickController.setCallback, Pioneer.Vector3, this.position.rotateInverse, this._targetEntity.getOrientation, this.helper.getLatitudeLongitude, this.addPickLocation, this.setLatitudeLongitude；写入 azimathelevationInterval, _firstLoad, _pickController, position, latitude, longitude。
- `exitSurfaceMode`：执行 exitSurfaceMode 对应的组件业务步骤；调用 this.toggleConstellation, this.validateLatLong, this.addPickLocation, this.app.getManager。
- `toggleConstellation`：执行 toggleConstellation 对应的组件业务步骤；调用 this.setState, this.app.getManager；写入 constellations。
- `latitudeInputChange`：执行 latitudeInputChange 对应的组件业务步骤；调用 this.validateLatLong, this.addPickLocation；写入 latitude。
- `longitudeInputChange`：执行 longitudeInputChange 对应的组件业务步骤；调用 this.validateLatLong, this.addPickLocation；写入 longitude。
- `validateLatLong`：执行 validateLatLong 对应的组件业务步骤；调用 this._children.latitude.classList.remove, this._children.longitude.classList.remove, Math.abs, this._children.latitude.classList.add, this._children.longitude.classList.add。
- `goSurfaceViewClick`：执行 goSurfaceViewClick 对应的组件业务步骤；调用 this.setLatitudeLongitude, this.validateLatLong, this.helper.removePlacemark, this._toggleSurfaceMaps, this.app.getManager。
- `_toggleSurfaceMaps`：执行 _toggleSurfaceMaps 对应的组件业务步骤；调用 this._app.pioneer.getScene, this._app.getManager, this.app.getManager。
- `addPickLocation`：执行 addPickLocation 对应的组件业务步骤；调用 this.helper.addPlacemark, Pioneer.Vector2, this._placemarkEl.classList.remove, this.helper.formatLatitudeLongitude, this._placemarkEl.appendChild, this._setEventHandlersFromAttributes；写入 _placemarkEl。
- `setLatitudeLongitude`：执行 setLatitudeLongitude 对应的组件业务步骤；调用 this.validateLatLong, this.setState。
- `showCoordinateInputTip`：执行 showCoordinateInputTip 对应的组件业务步骤；调用 this._children.coordinateTipPopup.classList.value.includes, this.setState。

### `eyes/src/ui/components/TextureQualityBlock.js`

对象纹理质量选择。

- `imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/TextureQualityBlockTemplate.html, ../../styles/extracted/TextureQualityBlockStyles.js, ../../engine/solar-system/public-api.js`
- `manager dependencies: scene, router`

**TextureQualityBlock**：对象纹理质量选择；继承 SolarSystemPublicApi.OptionsBlock。

- `constructor`：建立实例初始字段和依赖；调用 Object.assign, this._toggleHD, this._app.pioneer.getScene, this._app.getManager, List.toggle；写入 _previousEntity, _previousChildEntity, _defaultOptions。
- `_addDefaultOptions`：执行 _addDefaultOptions 对应的组件业务步骤；调用 Object.entries, this._createToggle, this._app.getManager, Object.keys, this._children.optionsList.appendChild。
- `_toggleHD`：执行 _toggleHD 对应的组件业务步骤；调用 this.app.getManager。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this._app.scene.getEntity, this.reset, this._addDefaultOptions；写入 _hdToggleEntity, _previousEntity, _previousChildEntity。
- `__disable`：卸载 DOM 并取消业务订阅；调用 super.__disable；写入 _previousEntity, _previousChildEntity。

### `eyes/src/ui/components/TimeControls.js`

时间播放速率与时间拖动控制。

- `imports: ../../framework/eyes/index.js, ../../styles/extracted/TimeControlsStyles.js, ../templates/TimeControlsTemplate.html`
- `manager dependencies: time, router`

**TimeControls**：时间播放速率与时间拖动控制；继承 Eyes.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 Parent.setAttribute, this._drawCurve, this._drawKnob, this._app.getManager, this._manager.getTimeRate, this.setState, this.getRateDisplay, this.bindFunctions；写入 _curve, _rates, _resizeObserver, _normValue, _currentRate, _currentIsLive, _canUpdate, _rateBeforePause, _touchTimeout, _activeDelay, _manager, _router。
- `init`：初始化模板与关联资源；调用 super.init, this._createRatesMap, this._app.getManager, this._callbackRegistry.push, Range.addEventListener, Range.blur, this._element.addEventListener, this._resizeObserver.observe。
- `_onRateChange`：执行 _onRateChange 对应的组件业务步骤；调用 this._setRate, this._setQuery。
- `_onSliderMove`：执行 _onSliderMove 对应的组件业务步骤；调用 this._drawKnobThrottled, this._setQueryDebounced；写入 _normValue, _currentRate。
- `_onTouchStart`：执行 _onTouchStart 对应的组件业务步骤；调用 List.contains, this.setState。
- `_onTouchEnd`：执行 _onTouchEnd 对应的组件业务步骤；调用 this.setState；写入 _touchTimeout。
- `_createRatesMap`：执行 _createRatesMap 对应的组件业务步骤；调用 this._rates.indexOf, this._rates.slice, Math.round, this._roundRate, this._ratesMap.push, Math.floor；写入 _ratesMap。
- `_roundRate`：执行 _roundRate 对应的组件业务步骤；调用 this.getRateUnit。
- `_drawCurve`：执行 _drawCurve 对应的组件业务步骤；调用 Path.setAttribute。
- `_drawKnob`：执行 _drawKnob 对应的组件业务步骤；调用 Math.pow, Math.abs, this._element.style.setProperty。
- `_setRate`：执行 _setRate 对应的组件业务步骤；调用 this._getTimeLimit, this._getValueFromRate, this._drawKnob, this.setState, this.getRateDisplay；写入 _rateBeforePause, _normValue, _currentRate, _timeLimit。
- `_getTimeLimit`：执行 _getTimeLimit 对应的组件业务步骤；调用 this._manager.getTime, Math.abs。
- `_getValueFromRate`：执行 _getValueFromRate 对应的组件业务步骤；调用 this._ratesMap.indexOf。
- `_setQuery`：执行 _setQuery 对应的组件业务步骤；调用 this._router.navigate, this._manager.getTimeUrl。
- `decreaseRate`：执行 decreaseRate 对应的组件业务步骤；调用 this._getValueFromRate, Math.floor, this._setQuery。
- `increaseRate`：执行 increaseRate 对应的组件业务步骤；调用 this._getValueFromRate, Math.ceil, this._setQuery。
- `playPauseRate`：执行 playPauseRate 对应的组件业务步骤；调用 this._app.getView, this._setQuery。
- `onRealtimeClick`：执行 onRealtimeClick 对应的组件业务步骤；调用 this._setQuery。
- `getRateUnit`：执行 getRateUnit 对应的组件业务步骤；调用 Object.keys。
- `getRateDisplay`：执行 getRateDisplay 对应的组件业务步骤；调用 this.getRateUnit。
- `setCanUpdate`：执行 setCanUpdate 对应的组件业务步骤；写入 _canUpdate。
- `update`：执行 update 对应的组件业务步骤；调用 this._manager.isNow, this.setState；写入 _currentIsLive。
- `__disable`：卸载 DOM 并取消业务订阅；调用 super.__disable。

### `eyes/src/ui/components/TitleBlock.js`

故事标题内容块。

- `imports: ../../framework/eyes/public-api.js, ../templates/TitleBlockTemplate.html`

**TitleBlock**：故事标题内容块；继承 EyesPublicApi.StoryBaseContentBlock。


### `eyes/src/ui/components/Toast.js`

临时通知消息及定时隐藏。

- `imports: ../../framework/eyes/public-api.js, ../templates/ToastTemplate.html, ../../styles/extracted/ToastStyles.js`

**Toast**：临时通知消息及定时隐藏；继承 EyesPublicApi.BaseComponent。

- `constructor`：建立实例初始字段和依赖；写入 _hideTimeout。
- `setIcon`：执行 setIcon 对应的组件业务步骤；调用 this.setState。
- `setContent`：执行 setContent 对应的组件业务步骤；调用 this.setState。
- `setError`：执行 setError 对应的组件业务步骤；调用 this.setIcon, this.setState。
- `show`：执行 show 对应的组件业务步骤；调用 super.show, this.hide；写入 _hideTimeout。
- `hide`：执行 hide 对应的组件业务步骤；调用 super.hide, this.setState。

### `eyes/src/ui/components/ToggleBlock.js`

故事内开关交互。

- `imports: ../../framework/eyes/public-api.js, ../templates/ToggleBlockTemplate.html, ../../styles/extracted/ToggleBlockStyles.js`

**ToggleBlock**：故事内开关交互；继承 EyesPublicApi.StoryBaseContentBlock。

- `constructor`：建立实例初始字段和依赖；调用 Object.assign。
- `onEnter`：进入视图时准备界面和订阅；调用 super.onEnter, this.onClick。
- `onLeave`：离开视图时恢复状态并解除订阅；调用 super.onLeave, this.onClick。
- `onClick`：执行 onClick 对应的组件业务步骤；调用 super.onClick, this.unselect, this.select。
- `select`：执行 select 对应的组件业务步骤；调用 this.setState。
- `unselect`：执行 unselect 对应的组件业务步骤；调用 this.setState。

### `eyes/src/ui/components/ToolboxBlock.js`

对象工具入口集合。

- `imports: ../../framework/eyes/index.js, ../../app/public-api.js, ../templates/ToolboxBlockTemplate.html, ../../styles/extracted/ToolboxBlockStyles.js, ../../styles/extracted/MobileExpandButtonStyles-928.js, ../../vendor/modules/animateFill-929.js`
- `manager dependencies: router`

**ToolboxBlock**：对象工具入口集合；继承 SolarSystemPublicApi.BaseContentBlock。

- `constructor`：建立实例初始字段和依赖；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet；写入 _state, _isTouch。
- `init`：初始化模板与关联资源；调用 super.init, this._children.clickableDiv.addEventListener, this._app.getManager, this._closeTooltip。
- `_showTooltip`：执行 _showTooltip 对应的组件业务步骤；调用 this.element.style.setProperty, this._children.tooltipPopup.classList.value.includes, Array.from, List.toggle, this.setState, List.contains, this._closeTooltip。
- `_closeTooltip`：执行 _closeTooltip 对应的组件业务步骤；调用 Array.from, List.add, this.setState。
- `resize`：重排响应式界面；调用 Eyes.AppUtils.isMobile, Eyes.AppUtils.isTablet；写入 _isTouch。

### `eyes/src/ui/components/TutorialOverlay.js`

教程步骤遮罩与提示定位。

- `imports: ../../vendor/modules/A11y.js, ../../styles/extracted/TutorialOverlayStyles-497.js, ../../styles/extracted/TutorialOverlayStyles-498.js, ../../styles/extracted/TutorialOverlayStyles-499.js, ../../styles/extracted/TutorialOverlayStyles-500.js, ../../framework/eyes/public-api.js, ../templates/TutorialOverlayTemplate.html`
- `manager dependencies: router, layer, content`
- `component dependencies: definitionOverlay`

**TutorialOverlay**：教程步骤遮罩与提示定位；继承 EyesPublicApi.BaseComponent。

- `constructor`：建立实例初始字段和依赖；写入 _swiper, _allTutorials, _elementMeasures, _currIndex, _slideViewedTimeout, _initTimeout, _bulletClass, _activeBulletClass, _swiperSlideClass, _storageName。
- `setTutorials`：执行 setTutorials 对应的组件业务步骤；调用 this._createSlides；写入 _allTutorials。
- `hideTutorialSlide`：执行 hideTutorialSlide 对应的组件业务步骤。
- `_addEvents`：执行 _addEvents 对应的组件业务步骤；调用 this._swiper.on, this._setHighlightedElement, this._setActiveBullet, this.navigateToTutorial, this.setState, this._children.swiperSlides.addEventListener, this._app.getComponent。
- `_createSlides`：执行 _createSlides 对应的组件业务步骤；调用 this._allTutorials.forEach, this._addSlide。
- `_addSlide`：执行 _addSlide 对应的组件业务步骤；调用 this._children.swiperSlides.append。
- `_createBullets`：执行 _createBullets 对应的组件业务步骤；调用 List.add, this._swiper.slideTo。
- `_setActiveBullet`：执行 _setActiveBullet 对应的组件业务步骤；调用 Nodes.forEach, List.remove, List.add。
- `_setHighlightedElement`：执行 _setHighlightedElement 对应的组件业务步骤；调用 this._calcElementMeasures, Math.max, this._element.style.setProperty；写入 _elementMeasures。
- `_initSwiper`：执行 _initSwiper 对应的组件业务步骤；调用 EyesPublicApi.AppUtils.elementReady, this._swiper.update, this._swiper.slideTo, A11y.default, this._postSwiperInitFunction, this._setActiveBullet, this._setHighlightedElement, super.show；写入 _initTimeout, _swiper。
- `_postSwiperInitFunction`：执行 _postSwiperInitFunction 对应的组件业务步骤；调用 this._addEvents, this._createBullets, this._swiper.slideTo。
- `_getIndexByTutorialId`：执行 _getIndexByTutorialId 对应的组件业务步骤。
- `_setSlideViewedTimeout`：执行 _setSlideViewedTimeout 对应的组件业务步骤；写入 _slideViewedTimeout。
- `_calcElementMeasures`：执行 _calcElementMeasures 对应的组件业务步骤；调用 this._allTutorials.map。
- `show`：执行 show 对应的组件业务步骤；调用 this._app.getManager, Manager.getLayer, Manager.toggleLayer, this._initSwiper。
- `hide`：执行 hide 对应的组件业务步骤；调用 super.hide；写入 _currIndex。
- `calcPriorityIndex`：执行 calcPriorityIndex 对应的组件业务步骤；调用 this._allTutorials.filter, this._getIndexByTutorialId。
- `navigateToTutorial`：执行 navigateToTutorial 对应的组件业务步骤；调用 this.app.getManager。
- `close`：执行 close 对应的组件业务步骤；调用 this.app.getManager。
- `resize`：重排响应式界面；调用 this._setHighlightedElement。

### `eyes/src/ui/templates/BreadcrumbTemplate.html`

BreadcrumbTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: static, staticLogo`
- `handlers: _goToHome`
- `state: isHomeActiveClass`

### `eyes/src/ui/templates/ButtonsBlockTemplate.html`

ButtonsBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: `
- `handlers: `
- `state: `

### `eyes/src/ui/templates/CameraViewBlockTemplate.html`

CameraViewBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: cameraOptions`
- `handlers: `
- `state: `

### `eyes/src/ui/templates/CarouselPanelTemplate.html`

CarouselPanelTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: content, tabsContainer, swiperSlides, bullets`
- `handlers: expand, collapse`
- `state: panelTypeClass, isVisibleClass, isExpandedClass, preTitle, title, headerIconClass, captionClass, caption, tabsVisibleClass, tabNumClass, carouselClass, paginationClass, prevButtonClass, nextButtonClass`

### `eyes/src/ui/templates/CarouselTemplate-390.html`

CarouselTemplate-390 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: progress, carousel, track`
- `handlers: close`
- `state: isVisibleClass, slideType, isCloseButtonVisibleClass, closeButtonText, collapseClass, isScrollingClass`

### `eyes/src/ui/templates/CarouselTemplate-391.html`

CarouselTemplate-391 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: `
- `handlers: goToPrevSlide, goToNextSlide, _onControlsToggle, _toggleCollapse, goToFirstSlide`
- `state: collapseClass, isControlsVisibleClass, collapseButtonClass`

### `eyes/src/ui/templates/CheckboxBlockTemplate.html`

CheckboxBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: `
- `handlers: `
- `state: `

### `eyes/src/ui/templates/CheckboxMultistateTemplate.html`

CheckboxMultistateTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: icon, text`
- `handlers: `
- `state: checkboxClass, isCheckedClass, iconCheckmarkClass, textClass, text`

### `eyes/src/ui/templates/ClockShortcutTemplate.html`

ClockShortcutTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: replayContainer, iconReplay, replay, liveContainer, iconLive, live`
- `handlers: _replay, backToLive, Reset time to live.`
- `state: isVisibleClass, replayClass, replayIcon, liveContainerClass, liveIcon, liveClass, liveText`

### `eyes/src/ui/templates/ClockTemplate.html`

ClockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: displayContainer, date, time, meridiem, timeForm, timeInput`
- `handlers: onDateTimeClick`
- `state: isVisibleClass, alert, isDateVisibleClass, date, isTimeVisibleClass, time, isMeridiemVisibleClass, meridiem`

### `eyes/src/ui/templates/CollapsibleMenuItemTemplate.html`

CollapsibleMenuItemTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: componentContainer, collapseButton, toggleButton`
- `handlers: onCollapseClick, onToggleClick`
- `state: expandedClass, isVisibleClass, collapseBtnVisibleClass, itemTitle`

### `eyes/src/ui/templates/CollapsibleMenuTemplate.html`

CollapsibleMenuTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: `
- `handlers: `
- `state: isVisibleClass, numMenusClass, expandedMenusClass`

### `eyes/src/ui/templates/ComparisonTemplate.html`

ComparisonTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: left, right, previous, next, exit, exitIcon`
- `handlers: `
- `state: isVisibleClass, leftTitle, fontSizeClass, leftType, leftIdentifier, leftValueClass, leftRadius, altFontSizeClass, unit, leftGenericDisclaimerClass, leftCategory, rightTitle, rightType, rightIdentifier, rightValueClass, rightRadius, rightUnit, rightGenericDisclaimerClass, rightCategory`

### `eyes/src/ui/templates/ContentPanelTemplate.html`

ContentPanelTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: desktopCollapseExpandButton, tabGroup, dragHandle, expandButton, collapseButton, subTabNav, infoTab, toolboxTab, viewOptionsTab, infoPanel, toolboxPanel, viewOptionsPanel`
- `handlers: Toggle content panel., onClickShowCollapse, onDragStart, onDrag, onDragEnd, Expand content panel., expand, Collapse content panel, collapse, info-tab-panel, _onTabSelect, toolbox-tab-panel, viewOptions-tab-panel`
- `state: isVisibleClass, isOverlayClass, isExpandedClass, isCollapsedClass, desktopIconName, iconExpandClass, iconCollapseClass, tabsVisible, subtabsVisible, infoTabVisibleClass, toolboxTabVisibleClass, viewOptionsTabVisibleClass, viewOptionsSelectedClass`

### `eyes/src/ui/templates/DescriptionBlockTemplate-1006.html`

DescriptionBlockTemplate-1006 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: copyContainer, moreContainer, moreCopy`
- `handlers: onClickReadMore`
- `state: isExpanded, showTitleLabel, blurbDescription, isMoreVisible, moreDescription, isButtonVisible, readMsg`

### `eyes/src/ui/templates/DescriptionBlockTemplate-542.html`

DescriptionBlockTemplate-542 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: header, body, footer`
- `handlers: toggleMore`
- `state: moreClass, hasMoreClass, moreMessage, moreIcon`

### `eyes/src/ui/templates/DistancePanelTemplate.html`

DistancePanelTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: dragArea, dpTitle, dpCloseButton, sourceSearchContainer, targetSearchContainer, lineGraphic, maxMinButton`
- `handlers: onContainerClick, exit, toggleSourceMP, onSwapClick, toggleTargetMP, onLineClick, onResultClick, toggleUnitSystem, toggleIsMinimized`
- `state: isVisibleClass, canMinimizeClass, isMinimizedClass, isSearchingClass, isDraggableClass, currDraggingClass, fromText, showSourceMPToggleClass, swapIsVisibleClass, swapOffsetClass, toText, showTargetMPToggleClass, touchActiveClass, dotPosClass, sourceMpClass, targetMpClass, isExpandedClass, resultTextClass, resultText, resultUnit, isLoadingClass, relVelocityClass, relVelocityText, relVelocityUnit, lightTimeVisibleClass, lightTimeText, maxMinIconClass, maxMinBtnPosition`

### `eyes/src/ui/templates/EventsBlockTemplate.html`

EventsBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: toggleContainer, timelineContainer, tableContainer, table, eventsTable`
- `handlers: _onTabSelect, sortEventsByTitle, sortEventsByYear, sortEventsByTarget`
- `state: isViewToggleVisible, isNumEventsVisible, numEvents, isIntroLabelVisible, introLabelText, isLoadingClass, isEventsViewContainerVisible`

### `eyes/src/ui/templates/EventsTimelineTemplate.html`

EventsTimelineTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: focusPanel, fpMask, fpDetails, fpTicksContainer, fpLine, fpTicks, timelinebar, eventContainer, fpContent, markerContainer, rangeDateStart, rangeDateEnd`
- `handlers: _onFpMouseEnter, _onFpMouseLeaveDebounced, _onFpWheel, _onFpArrowClick, _onFpTouchStart, _onFpTouchMoveThrottled, _onFpTouchEnd, _onFpTicksTouchStart, _onFpTicksTouchMove, _onFpTicksTouchEnd, _onFpTicksMouseEnter, _onFpTicksMouseMove, _onFpTicksMouseLeave, _onFpTicksClick, _onTimelineTouchStart, _onTimelineTouchMove, _onTimelineTouchEnd, _onTimelineMouseMove, _onTimelineMouseLeaveDebounced, _onTimelineClick, _onDateTouchStart, _onDateTouchEnd, _zoomOutOfCluster`
- `state: isVisibleClass, fpVisibleClass, fpArrowVisible, fpEventName, fpEventTime, fpTargetLineVisibleClass, fpViewingLineVisibleClass, focusContentVisibleClass, viewingLineVisibleClass, targetLineVisibleClass, targetDateVisibleClass, targetDateColorClass, resetZoomVisibleClass`

### `eyes/src/ui/templates/ExplorationBlockTemplate.html`

ExplorationBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: explorationList`
- `handlers: toggleMore`
- `state: colorClass, hideMoreMessage, moreMessage, moreIcon`

### `eyes/src/ui/templates/FeaturedEventsBlockTemplate.html`

FeaturedEventsBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: featuredEventsList`
- `handlers: toggleMore`
- `state: colorClass, hideMoreMessage, moreMessage, moreIcon`

### `eyes/src/ui/templates/FeaturedMoonsBlockTemplate.html`

FeaturedMoonsBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: featuredMoonsList`
- `handlers: toggleMore`
- `state: showTitleLabel, hideMoreMessage, moreMessage, moreIcon`

### `eyes/src/ui/templates/FeaturedStoriesPanelTemplate.html`

FeaturedStoriesPanelTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: expandToggleBtn`
- `handlers: onClickShowCollapse`
- `state: isVisibleClass, isOverlayClass, isOpenTitleClass, desktopIconName, isOpenButtonClass, mobileIconName`

### `eyes/src/ui/templates/FeaturedStoryBlockTemplate.html`

FeaturedStoryBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: storyBlock, storyList`
- `handlers: `
- `state: colorClass, hideTitle, blockTitle`

### `eyes/src/ui/templates/FeaturesBlockTemplate.html`

FeaturesBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: featuresBlock, featuresList`
- `handlers: `
- `state: showFeatures`

### `eyes/src/ui/templates/HintBlockTemplate.html`

HintBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: `
- `handlers: `
- `state: iconBefore, isIconBeforeVisibleClass, text, iconAfter, isIconAfterVisibleClass`

### `eyes/src/ui/templates/ImageBlockTemplate.html`

ImageBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: `
- `handlers: `
- `state: `

### `eyes/src/ui/templates/InfoPanelTemplate.html`

InfoPanelTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: infoPanel`
- `handlers: `
- `state: isVisibleClass`

### `eyes/src/ui/templates/InstrumentFOVBlockTemplate.html`

InstrumentFOVBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: instrumentFOVBlock, instrumentsList`
- `handlers: `
- `state: `

### `eyes/src/ui/templates/KioskBaseTemplate.html`

KioskBaseTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: kioskContainer, kioskLoadingText, kioskSessionEnd, sessionEndButtons, kioskStartOverBtn, kioskContinueBtn, kioskAutoplay, kioskSessionTimer`
- `handlers: onWindowInteract, sessionStartOverButtonClick`
- `state: isVisibleClass, loadingTextVisibleClass, sessionEndVisibleClass, forceRestartClass, continueButtonVisibleClass, autoplayVisibleClass, sessionTimerVisibleClass, isKioskCountdownClass`

### `eyes/src/ui/templates/LayerPanelTemplate.html`

LayerPanelTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: layerPanelBody`
- `handlers: hide`
- `state: isVisibleClass`

### `eyes/src/ui/templates/LayersBlockTemplate.html`

LayersBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: layersBlock, layersList`
- `handlers: `
- `state: showContextualLayers`

### `eyes/src/ui/templates/LoadIconTemplate.html`

LoadIconTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: `
- `handlers: `
- `state: isVisibleClass`

### `eyes/src/ui/templates/MenuTemplate.html`

MenuTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: container, header, branding, contentWrapper, mainMenu`
- `handlers: toggle, hide`
- `state: menuText, isVisibleClass, menuClass, brandingText, titleText`

### `eyes/src/ui/templates/MobileExpandButtonTemplate.html`

MobileExpandButtonTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: mobileExpandButton`
- `handlers: _expandButtonClicked, Expand content panel.`
- `state: isVisibleClass`

### `eyes/src/ui/templates/OverlayTemplate.html`

OverlayTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: overlay, overlayContent`
- `handlers: show, hide`
- `state: isOpenButtonVisibleClass, isVisibleClass`

### `eyes/src/ui/templates/OverviewBlockTemplate.html`

OverviewBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: overviewTitle`
- `handlers: goBack`
- `state: isBackButtonVisible, title, shapeType, shapeColor, isShapeVisibleClass, isCategoryVisibleClass, category, isDateVisible, missionDates, disclaimerClass, disclaimerMessage`

### `eyes/src/ui/templates/RelatedBlockTemplate.html`

RelatedBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: relatedBlock, storyBlock, storyList, relatedList`
- `handlers: `
- `state: showTitleLabel`

### `eyes/src/ui/templates/ReplayBlockTemplate.html`

ReplayBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: clockContainer, eventsSliderContainer, eventInputRange`
- `handlers: prevButtonClicked, Pause / play, playPauseEvent, nextButtonClicked`
- `state: dateText, isPrevBtnActive, playIconClass, hideNextEventButton, isNextBtnActive`

### `eyes/src/ui/templates/ReplayButtonBlockTemplate.html`

ReplayButtonBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: `
- `handlers: onClick`
- `state: `

### `eyes/src/ui/templates/SearchTemplate.html`

SearchTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: container, input, results, featured`
- `handlers: onIconClick, reset, _find, onInputFocus, keydown`
- `state: isVisibleClass, magClass, searchClass, focusedClass, allowInfoClass, searchInfo, allowFeaturedClass, isFeaturedVisibleClass`

### `eyes/src/ui/templates/SettingsTemplate.html`

SettingsTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: container, content, zoomInButton, zoomOutButton, lightToggle, lightOptions, flood, shadow, natural`
- `handlers: toggleInfoPanel, Show info panel, toggleLayers, Toggle layers, toggleUnit, Toggle between metric and imperial units, togglePhotoMode, Show or hide UI, Zoom in, Zoom out, toggleLight, Toggle light modes, toggleGuidedCamera, Toggle auto camera, toggleFullscreen, Toggle fullscreen, toggleCollapse, Show or hide settings`
- `state: isVisibleClass, orientationClass, containerClass, allowInfoPanelClass, infoButton, allowLayersClass, unitButton, allowToggleUnitClass, photoModeClass, allowPhotoModeClass, allowZoomClass, allowLightingClass, lightClass, guidedClass, allowGuidedCameraClass, showLightingOptionsClass, fullscreenClass, allowFullscreenClass, isCollapsibleClass`

### `eyes/src/ui/templates/ShareModalTemplate.html`

ShareModalTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: tabHeaders, closeButton, tabContent, linkContainer, linkImage, linkCode, embedContainer, embedPreviewParent, embedCode, embedOptsContent, embedAdvOptsContent, copiedOverlay`
- `handlers: handleClick, handleTabClick, copyToClipboard, toggleIframeElements, Include the iframe HTML tags in the embed code`
- `state: isVisibleClass, linkTitle, previewDevice, previewVisibleClass`

### `eyes/src/ui/templates/SolarSystemAppTemplate.html`

SolarSystemAppTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: `
- `handlers: `
- `state: `

### `eyes/src/ui/templates/SpecialFeaturesBlockTemplate.html`

SpecialFeaturesBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: specialFeatures`
- `handlers: `
- `state: category`

### `eyes/src/ui/templates/SurfaceMapBlockTemplate.html`

SurfaceMapBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: surfaceMapBlock, surfaceMapList`
- `handlers: `
- `state: showSurfaceMaps, showSubtitle`

### `eyes/src/ui/templates/TelescopeTemplate.html`

TelescopeTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: coordinateTipPopup, coordinateInfo, latitude, longitude, constellationToggleButton, tapHint`
- `handlers: showCoordinateInputTip, latitudeInputChange, longitudeInputChange, goSurfaceViewClick, exitTelescope, exitSurfaceMode, toggleConstellation`
- `state: airClass, inputTipVisibleClass, latitudeTitle, longitudeTitle, surfaceClass, azimuth, elevation, formattedLatitude, formattedLongitude, constellationsClass`

### `eyes/src/ui/templates/TextureQualityBlockTemplate.html`

TextureQualityBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: textureQualityBlock, optionsList`
- `handlers: `
- `state: `

### `eyes/src/ui/templates/TimeControllerTemplate.html`

TimeControllerTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: toggleBtn, label, decreaseBtn, decreaseContainer, increaseBtn, increaseContainer, rateDisplay`
- `handlers: Pause / play, togglePlayPause, Decrease time rate, decreaseRate, Increase time rate, increaseRate`
- `state: isVisibleClass, playClass, rateDisplay`

### `eyes/src/ui/templates/TimeControlsTemplate.html`

TimeControlsTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: sliderContainer, inputRange, svgParent, sliderPath`
- `handlers: Decrease time rate, decreaseRate, Pause / play, playPauseRate, Increase time rate, increaseRate, Return to real time speed, onRealtimeClick`
- `state: isVisibleClass, touchActiveClass, isLiveClass, isPlayingClass, dateValue, timeValue, isRateControlsVisible, rateDisplay, playIconClass, realTimeBtnClass`

### `eyes/src/ui/templates/TitleBlockTemplate.html`

TitleBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: `
- `handlers: `
- `state: `

### `eyes/src/ui/templates/ToastTemplate.html`

ToastTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: toastContent`
- `handlers: hide`
- `state: isVisibleClass, errorClass, iconClass, toastContent`

### `eyes/src/ui/templates/ToggleBlockTemplate.html`

ToggleBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: `
- `handlers: `
- `state: isSelectedClass`

### `eyes/src/ui/templates/ToolboxBlockTemplate.html`

ToolboxBlockTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: toolboxBlock, clickableDiv, tooltipIcon, goButton, tooltipPopup`
- `handlers: _showTooltip, _closeTooltip`
- `state: isVisibleClass, iconClass, title, inputTipVisibleClass, tooltipText`

### `eyes/src/ui/templates/TutorialOverlayTemplate.html`

TutorialOverlayTemplate 静态 DOM 模板；为配套组件提供节点、事件入口和状态插值。

- `key: swiperSlides, bullets`
- `handlers: close`
- `state: isVisibleClass, slideClass, carouselClass, dismissText`

### `eyes/src/ui/views/BaseView.js`

路由视图共同生命周期：资源、时间、组件、相机与清理。

- `imports: ../../vendor/modules/FollowName.cjs, ../../engine/solar-system/public-api.js, ../../framework/eyes/public-api.js, ../../engine/pioneer/index.js`
- `manager dependencies: layer, router, label, selection, spout, title, scene, time, content`
- `component dependencies: layerPanel, clock`

**BaseView**：路由视图共同生命周期：资源、时间、组件、相机与清理；继承 EyesPublicApi.BaseComponent。

- `constructor`：建立实例初始字段和依赖；调用 this.bindFunctions；写入 _components, _validQueries, _rules, _target, _enabled。
- `app`：执行 app 对应的组件业务步骤。
- `_showControls`：执行 _showControls 对应的组件业务步骤。
- `_hideControls`：执行 _hideControls 对应的组件业务步骤。
- `_shouldHideControls`：根据面板状态判断是否隐藏控制项。
- `updateVisibility`：执行 updateVisibility 对应的组件业务步骤；调用 this._app.getManager, this._shouldHideControls, this._hideControls, this._showControls。
- `resize`：重排响应式界面；调用 this.updateVisibility。
- `toggleViewUI`：执行 toggleViewUI 对应的组件业务步骤。
- `_shouldResetStatus`：执行 _shouldResetStatus 对应的组件业务步骤；调用 this._app.getManager。
- `_resetStatus`：执行 _resetStatus 对应的组件业务步骤；调用 this._shouldResetStatus, Object.keys, this._app.getComponents, this._app.getComponent, this._components.includes。
- `registerCallbacks`：登记跨组件或管理器事件订阅；调用 this._app.getManager。
- `removeCallbacks`：移除本模块登记的事件订阅；调用 this._app.getManager。
- `onEnter`：进入视图时准备界面和订阅；调用 this._resetStatus, this.registerCallbacks, this._app.getManager, List.add。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this.before, this._reset, this._updateResources, this.processQuery, this._updateComponentsVisibility, this._checkReady, this._updateCamera, this._updateLoading, this.after, this.app.getManager。
- `onQueryChange`：响应查询参数变化；调用 this.processQuery。
- `validateQuery`：检查查询规则并重定向、补默认值或报错；调用 Object.keys, this._app.getManager, this._rules.redirect, Manager.navigate, EyesPublicApi.AppUtils.isEmptyObject, this._handleError, JSON.stringify。
- `processQuery`：把查询参数应用到时间、图层或模块状态；调用 this._updateTimeRate, this._updateTime, this._app.getManager, Manager.parseQuery, Object.keys, this._app.getComponent, Manager.getLayer, PanelComponent.toggleLayer, this.app.getManager。
- `_handleError`：执行 _handleError 对应的组件业务步骤；调用 this._app.getManager。
- `onLeave`：离开视图时恢复状态并解除订阅；调用 this.removeCallbacks, this._app.getManager, List.remove。
- `_reset`：重置上一目标留下的临时状态；调用 this._app.getManager。
- `_updateResources`：按目标和路由准备数据及实体。
- `_updateTimeRate`：执行 _updateTimeRate 对应的组件业务步骤；调用 this._app.getManager, Manager.setTimeRate, Manager.resetTimeRate。
- `_updateTime`：按查询参数或当前目标设置时间；调用 this._app.getManager, Route.url.includes, Manager.resetMin, Manager.resetMax, this._updateTimeForTarget。
- `_updateTimeForTarget`：将时间限制收敛到目标覆盖范围；调用 this._app.getManager, Manager.timeLimits.min.clone, Manager.timeLimits.max.clone, Manager.getDefaultLimits, Manager.parseTime, this._app.getComponent, Manager.navigate, Manager.setMax, Manager.setMin, Manager.setTime, Manager.setTimeRate, Manager.setToNow。
- `_updateComponentsVisibility`：执行 _updateComponentsVisibility 对应的组件业务步骤；调用 this._updateComponents, this.updateVisibility。
- `_updateComponents`：把当前目标数据交给 UI 组件。
- `_updateCamera`：按当前模式定位相机与目标。
- `_updateLoading`：把目标组件加载状态关联到场景加载提示；调用 this._app.getManager, Manager.getEntityInfo, Manager.addLoading, Manager._scene.getEntity, Manager.get, Manager.forceLoad, Manager.componentIsReady, Promise.all, Manager.removeLoading。
- `_checkReady`：等待所需实体就位；调用 this._app.getManager, this._app.pioneer.getScene, this._app.pioneer.waitUntilNextFrame。
- `before`：执行路由更新前置步骤。
- `after`：执行路由更新后的收尾步骤；调用 this._app.getManager。

- 注意：路由更新多处检查 cancelToken；异步任务取消后应由后续检查阻止新 UI/相机写入。
- 注意：onRouteChange 的 finally(after) 只覆盖相机更新区间；更早阶段抛错不会自动执行 after。
- 注意：_updateTimeForTarget 合并默认范围、scene coverage、description dates，并夹紧请求时间。

### `eyes/src/ui/views/CompareView.js`

对象比较模式和照片模式切换。

- `imports: ./ExtendedBaseView.js, ../../framework/eyes/index.js, ../../data/Unidentified775.json`
- `manager dependencies: content, time, layer, comparison, router, camera`
- `component dependencies: menu, comparison, breadcrumb, settings`

**CompareView**：对象比较模式和照片模式切换；继承 ExtendedBaseView.default。

- `constructor`：建立实例初始字段和依赖；调用 this._validQueries.push, this._app.getManager, this.bindFunctions；写入 defaultConfig, _category, _compare。
- `onEnter`：进入视图时准备界面和订阅；调用 super.onEnter, this._app.getManager, this._app.getComponent, Eyes.AppUtils.isMobileMode。
- `_updateResources`：按目标和路由准备数据及实体；调用 this._app.getManager；写入 _category。
- `processQuery`：把查询参数应用到时间、图层或模块状态；调用 super.processQuery, this._app.getComponent, this._app.getManager；写入 _compare, _compareTo, _entityInfo, _compareEntityInfo。
- `_updateComponents`：把当前目标数据交给 UI 组件；调用 super._updateComponents, this._app.getManager, Route.url.match, this._app.getComponent, Component.getConfig, Eyes.AppUtils.deepCopy, Component.setConfig；写入 defaultConfig。
- `togglePhotoMode`：执行 togglePhotoMode 对应的组件业务步骤；调用 this._app.getComponent。
- `onLeave`：离开视图时恢复状态并解除订阅；调用 super.onLeave, this._app.getManager, this._app.getComponent, Component.setConfig；写入 _compare。
- `resize`：重排响应式界面；调用 super.resize, this._app.getComponent, Eyes.AppUtils.isMobileMode。
- `registerCallbacks`：登记跨组件或管理器事件订阅；调用 super.registerCallbacks, this._app.getComponent。
- `removeCallbacks`：移除本模块登记的事件订阅；调用 super.removeCallbacks, this._app.getComponent。

### `eyes/src/ui/views/DistanceView.js`

距离模式的源目标、覆盖时间交集及双目标相机。

- `imports: ../../framework/eyes/index.js, ../../engine/managers/DistanceManager.js, ./ExtendedBaseView.js`
- `manager dependencies: content, router, scene, time, layer, selection`
- `component dependencies: distancePanel, collapsibleMenu, breadcrumb, timecontrolsCollapsible`

**DistanceView**：距离模式的源目标、覆盖时间交集及双目标相机；继承 ExtendedBaseView.default。

- `constructor`：建立实例初始字段和依赖；调用 this._app.getManager, Manager.getEntityInfo, Manager._entityStatuses.get, this.bindFunctions；写入 _rules, _forceLoadEntities, _spaceObjectChanged, _targetChanged, _timeChanged, _rateChanged, _redirect。
- `onEnter`：进入视图时准备界面和订阅；调用 this.app.addManager, this.app.getComponent, this.distancePanel.show, this.distanceManager.init, this.distancePanel.initSearchUI, this.setBreadcrumbStaticTextVisible, this.updateVisibility, super.onEnter。
- `onLeave`：离开视图时恢复状态并解除订阅；调用 this.app.getComponent, this.distanceManager.deinit, this.setBreadcrumbStaticTextVisible, super.onLeave。
- `registerCallbacks`：登记跨组件或管理器事件订阅；调用 super.registerCallbacks, this._app.getManager。
- `removeCallbacks`：移除本模块登记的事件订阅；调用 super.removeCallbacks, this._app.getManager。
- `processQuery`：把查询参数应用到时间、图层或模块状态；调用 super.processQuery, this.app.getManager, Manager.parseQuery, Token.cancel, this.distanceManager.setIsWaitingForEntities, this.distanceManager.setBetweenPosHidden, this._forceLoadEntities.push, this._forceLoadEntities.map, Manager.getDependencies, this._forceLoadEntities.flat, Manager.setEntitiesForceVisible, this.distanceManager.setTargetDistanceEntities；写入 _spaceObjectChanged, _targetChanged, _timeChanged, _rateChanged, _forceLoadEntities。
- `onQueryChange`：响应查询参数变化；调用 this.distanceManager.setIsWaitingForEntities, super.onQueryChange, this.distanceManager.updateMeasurement, this._updateComponents, this._checkReady, this._updateCamera。
- `_updateTime`：按查询参数或当前目标设置时间；调用 this.app.getManager, Manager.parseTime, Manager.setTime, this._app.getManager。
- `_reset`：重置上一目标留下的临时状态；调用 super._reset, this.distanceManager.resetAllDistanceEntities；写入 _forceLoadEntities。
- `_updateComponents`：把当前目标数据交给 UI 组件；调用 super._updateComponents, this._app.getManager, this._app.getComponent, DisplayNames.join, Manager.currentRoute.url.match, Component.onRouteChange。
- `_checkReady`：等待所需实体就位；调用 this.app.getManager, Manager.parseTime, Manager.getTime, Manager.momentToET, this.distanceManager.measureDistance, this.distancePanel.setIsLoading, this._app.scene.waitTillEntitiesInPlace, this._checkCoverageOverlap, this.distanceManager.setTempErrorResult, this._app.getManager, this.distanceManager.setIsWaitingForEntities, this.distanceManager.updateMeasurement；写入 _redirect。
- `_checkCoverageOverlap`：执行 _checkCoverageOverlap 对应的组件业务步骤；调用 this.app.getManager, Manager.getDefaultLimits, Manager.getCoverage, Manager.setMin, Manager.setMax, Manager.getTime, Manager.isWithinLimits, Manager.getLimits, this.app.getComponent, Manager.navigate, Manager.getTimeUrl；写入 _redirect。
- `_updateCamera`：按当前模式定位相机与目标；调用 this.distanceManager.camToBetweenPos, this.app.cameraScripts.goToCelestialObject, this.distanceManager.setBetweenPosHidden。
- `_updateCollapsibleMenu`：执行 _updateCollapsibleMenu 对应的组件业务步骤；调用 this._collapsibleItemOptions.filter, this._collapsibleItemOptions.push, super._updateCollapsibleMenu；写入 _collapsibleItemOptions。
- `onIsMobileChange`：执行 onIsMobileChange 对应的组件业务步骤；调用 this._updateCollapsibleMenu, Promise.all, this._collapsibleItems.find, this.distancePanel.setParent；写入 _collapsibleItems。
- `setBreadcrumbStaticTextVisible`：执行 setBreadcrumbStaticTextVisible 对应的组件业务步骤；调用 this._app.getComponent。
- `resize`：重排响应式界面；调用 super.resize, this.setBreadcrumbStaticTextVisible。
- `shouldOffsetRight`：执行 shouldOffsetRight 对应的组件业务步骤。
- `shouldOffsetUp`：执行 shouldOffsetUp 对应的组件业务步骤。

### `eyes/src/ui/views/EventView.js`

对象事件的有效时间、重播及相关实体相机。

- `imports: ../../framework/eyes/index.js, ./ExtendedBaseView.js, ../../vendor/modules/Unidentified777.cjs`
- `manager dependencies: content, layer, cameraFollow, selection, scene, router, time`
- `component dependencies: clockShortcut, contentPanel, timeControls, breadcrumb, eventsTimeline, clock`

**EventView**：对象事件的有效时间、重播及相关实体相机；继承 ExtendedBaseView.default。

- `constructor`：建立实例初始字段和依赖；调用 this._app.getManager, this.bindFunctions；写入 _entityInfo, _entityDesc, _scEvents, _scOrderedEvents, _eventName, _eventInfo, _eventDesc, _isSpacecraft, _hasLoaded, _onLoaded, _onAfter。
- `onEnter`：进入视图时准备界面和订阅；调用 this._app.getComponent, super.onEnter；写入 _offsetPanel。
- `onLeave`：离开视图时恢复状态并解除订阅；调用 this._app.getManager, this.app.getManager, super.onLeave, this._app.getComponent, MenuParent.setExpanded。
- `onQueryChange`：响应查询参数变化；调用 super.onQueryChange, this._app.getComponent, PanelComponent.onQueryChange。
- `registerCallbacks`：登记跨组件或管理器事件订阅；调用 super.registerCallbacks, this._app.getComponent, PanelComponent.registerCallback。
- `removeCallbacks`：移除本模块登记的事件订阅；调用 super.removeCallbacks, this._app.getComponent, PanelComponent.removeCallback。
- `_reset`：重置上一目标留下的临时状态；调用 super._reset；写入 _entityInfo, _entityDesc, _scEvents, _scOrderedEvents, _eventName, _eventInfo, _eventDesc, _hasLoaded, _onLoaded, _target。
- `_updateResources`：按目标和路由准备数据及实体；调用 this._app.getManager, this._handleError, Eyes.AppUtils.deepCopy, this.app.getManager, Manager.setEntitiesForceVisible；写入 _entityInfo, _hasLoaded, _scEvents, _scOrderedEvents, _entityDesc, _eventName, _eventInfo, _eventDesc。
- `_updateComponents`：把当前目标数据交给 UI 组件；调用 super._updateComponents, this._app.getManager, Manager.currentRoute.url.match, this._app.getComponent, PanelComponent.onRouteChangeEvent, PanelComponent.show, PanelComponent.collapse, MenuParent.setExpanded, Promise.all, this._collapsibleItems.find, TimelineComponent.setTarget, TimelineComponent.resize, this._onLoaded；写入 _collapsibleItems, _onLoaded。
- `_updateTimeForTarget`：将时间限制收敛到目标覆盖范围；调用 super._updateTimeForTarget, this._app.getManager, Manager.getTime, this._setMinEventEnd, Manager.setMin, Manager.setMax, Manager.parseTime, Manager.isWithinLimits, Manager.setTime, Manager.getTimeUrl, C.isAfter, C.isBefore, Manager.getDefaultLimits, this._app.getComponent；写入 _onAfter。
- `_setMinEventEnd`：执行 _setMinEventEnd 对应的组件业务步骤；调用 Math.abs。
- `_loaded`：执行 _loaded 对应的组件业务步骤；调用 super._loaded, this._onLoaded；写入 _onLoaded, _hasLoaded。
- `_backToLive`：执行 _backToLive 对应的组件业务步骤；调用 this._app.getManager, Manager.getTimeUrl, Manager.getNow。
- `replayEvent`：执行 replayEvent 对应的组件业务步骤；调用 this._app.getManager, Manager.getTime, Manager.lastRouteResolved, this._updateCamera, Manager.getTimeUrl, Eyes.AppUtils.deepEqual, Manager.reload, Manager.navigate。
- `_updateCamera`：按当前模式定位相机与目标；调用 this._app.getManager, this._app.cameraScripts.alignSpacecraftPlanet, this._app.cameraScripts.alignObjects, this._app.cameraScripts.goToSpacecraft, this.app.getManager。
- `_shouldHideControls`：根据面板状态判断是否隐藏控制项；调用 this._app.getComponent, Eyes.AppUtils.isMobileMode。
- `after`：执行路由更新后的收尾步骤；调用 this._onAfter；写入 _onAfter。

### `eyes/src/ui/views/ExtendedBaseView.js`

加入 embed/kiosk 查询控制、面板偏移与全局 UI 可见性策略。

- `imports: ../../framework/eyes/index.js, ../../app/PreloadManager.js`
- `manager dependencies: router, content, scene, layer`
- `component dependencies: searchDesktop, clockShortcut, timeControls, eventsTimeline, contentPanel, settings, collapsibleMenu, infoPanel, clock, mobileExpandButton, menu`

**ExtendedBaseView**：加入 embed/kiosk 查询控制、面板偏移与全局 UI 可见性策略；继承 Eyes.BaseView。

- `constructor`：建立实例初始字段和依赖；调用 this.bindFunctions；写入 _collapsibleItemOptions, _collapsibleItems, _offsetPanel, embedQueries, kioskValues。
- `onEnter`：进入视图时准备界面和订阅；调用 this.setViewportOffset, this._app.getManager, this.disableUIComponent, Eyes.AppUtils.isMobileMode, this._app.getComponent, this._updateCollapsibleMenu, super.onEnter。
- `disableUIComponent`：执行 disableUIComponent 对应的组件业务步骤；调用 this._components.indexOf, this._components.splice, this._app.removeComponent。
- `onLeave`：离开视图时恢复状态并解除订阅；调用 this.setViewportOffset, this._app.getComponent, ShortcutComponent.setCallback, ShortcutComponent.hide, super.onLeave。
- `registerCallbacks`：登记跨组件或管理器事件订阅；调用 super.registerCallbacks, this._app.getManager。
- `removeCallbacks`：移除本模块登记的事件订阅；调用 super.removeCallbacks, this._app.getManager。
- `_reset`：重置上一目标留下的临时状态；调用 super._reset, this._app.getComponent。
- `processQuery`：把查询参数应用到时间、图层或模块状态；调用 super.processQuery。
- `_updateComponents`：把当前目标数据交给 UI 组件；调用 this._components.includes, this.app.getComponent, this._app.getManager, this._components.indexOf, this._components.push, this._components.splice, this.app.getManager, this._updateCollapsibleMenu, Manager.getEntityInfo, this._app.getComponent, Manager.updateHDTarget, Manager.getHDToggleEntity, Manager.toggleHDTextureForEntity, Manager.getSpheroidLayers；写入 _collapsibleItems。
- `_loaded`：执行 _loaded 对应的组件业务步骤；调用 PreloadManager.default.updateEmbedLoadPercent, PreloadManager.default.showEmbedViewButton。
- `_updateLoading`：把目标组件加载状态关联到场景加载提示；调用 super._updateLoading, this._app.getManager, this._loaded。
- `_updateCollapsibleMenu`：执行 _updateCollapsibleMenu 对应的组件业务步骤；调用 this._app.getComponent, this._components.includes, MenuComponent.removeAllItems, this._app.getManager, this._collapsibleItemOptions.filter, this._collapsibleItemOptions.map, Names.every, MenuComponent.addItem；写入 _collapsibleItemOptions, _collapsibleItems。
- `_handleInfoPanelEmbedQueries`：执行 _handleInfoPanelEmbedQueries 对应的组件业务步骤；调用 this._components.includes, this._app.getComponent, Object.keys, HTML.replace。
- `_showControls`：执行 _showControls 对应的组件业务步骤；调用 this._app.getComponent, MenuComponent.show, Component.show, List.remove, List.add, this._app.getManager, Eyes.AppUtils.isMobileMode, Component.collapse, MenuComponent.collapse。
- `_hideControls`：执行 _hideControls 对应的组件业务步骤；调用 Eyes.AppUtils.isMobileMode, this._app.getComponent, List.add, List.remove, TimelineComponent.hide。
- `toggleViewUI`：执行 toggleViewUI 对应的组件业务步骤；调用 this._app.getManager, this._components.forEach, this._app.getComponent, List.remove, this.updateVisibility, List.add, this.setViewportOffset。
- `shouldOffsetRight`：执行 shouldOffsetRight 对应的组件业务步骤；调用 Eyes.AppUtils.isDesktop。
- `shouldOffsetUp`：执行 shouldOffsetUp 对应的组件业务步骤；调用 Eyes.AppUtils.isDesktop。
- `setViewportOffset`：执行 setViewportOffset 对应的组件业务步骤；调用 this._app.getManager, List.toggle。
- `resize`：重排响应式界面；调用 this.setViewportOffset, super.resize。

### `eyes/src/ui/views/FeatureView.js`

对象特征页资源与描述加载。

- `imports: ../../framework/eyes/index.js, ./ExtendedBaseView.js`
- `manager dependencies: content, router, scene, layer, selection`
- `component dependencies: contentPanel, breadcrumb`

**FeatureView**：对象特征页资源与描述加载；继承 ExtendedBaseView.default。

- `constructor`：建立实例初始字段和依赖；调用 this._app.getManager；写入 _entityInfo, _entityDesc, _featureDesc, _featureInfo, _forceLoadEntities。
- `onEnter`：进入视图时准备界面和订阅；调用 this._app.getComponent, super.onEnter；写入 _offsetPanel。
- `registerCallbacks`：登记跨组件或管理器事件订阅；调用 super.registerCallbacks, this._app.getComponent, PanelComponent.registerCallback。
- `removeCallbacks`：移除本模块登记的事件订阅；调用 super.removeCallbacks, this._app.getComponent, PanelComponent.removeCallback。
- `_reset`：重置上一目标留下的临时状态；调用 super._reset；写入 _entityInfo, _entityDesc, _featureDesc, _featureInfo, _forceLoadEntities, _target。
- `_updateResources`：按目标和路由准备数据及实体；调用 this._app.getManager, this._handleError, this.app.getManager, this._forceLoadEntities.push, this._app.cameraScripts.isBarycenter, this._app.cameraScripts.removeBarycenter, Manager.setEntitiesForceVisible, this._app.scene.waitTillEntitiesInPlace, Eyes.AppUtils.deepCopy；写入 _entityInfo, _featureInfo, _entityDesc, _featureDesc。
- `_updateComponents`：把当前目标数据交给 UI 组件；调用 super._updateComponents, this._app.getManager, Route.url.match, this._app.getComponent, PanelComponent.onRouteChangeFeature, PanelComponent.show, PanelComponent.collapse。
- `_updateCamera`：按当前模式定位相机与目标；调用 this._app.getComponent, this._app.cameraScripts.goToSystem, this.app.getManager。
- `_shouldHideControls`：根据面板状态判断是否隐藏控制项；调用 this._app.getComponent, Eyes.AppUtils.isMobileMode。

### `eyes/src/ui/views/HomeView.js`

首页精选故事、默认目标及全景相机流程。

- `imports: ../../framework/eyes/index.js, ./ExtendedBaseView.js`
- `manager dependencies: scene, time, layer, content, router`
- `component dependencies: featuredStoriesPanel, mobileExpandButton, breadcrumb`

**HomeView**：首页精选故事、默认目标及全景相机流程；继承 ExtendedBaseView.default。

- `onEnter`：进入视图时准备界面和订阅；调用 this._app.getComponent, super.onEnter；写入 _offsetPanel。
- `registerCallbacks`：登记跨组件或管理器事件订阅；调用 super.registerCallbacks, this._app.getComponent。
- `removeCallbacks`：移除本模块登记的事件订阅；调用 super.removeCallbacks, this._app.getComponent。
- `_updateResources`：按目标和路由准备数据及实体；调用 this.app.getManager, this._app.getManager, Eyes.AppUtils.deepCopy, this._featuredCardsList.push；写入 _featuredCardsList。
- `_updateComponents`：把当前目标数据交给 UI 组件；调用 super._updateComponents, this._app.getManager, this._app.getComponent, StoriesPanelComponent.onRouteChange, StoriesPanelComponent.hide, StoriesPanelComponent.show, StoriesPanelComponent.setEnabled。
- `_updateCamera`：按当前模式定位相机与目标；调用 this._app.cameraScripts.goToSystem, this.app.getManager。
- `_shouldHideControls`：根据面板状态判断是否隐藏控制项；调用 Eyes.AppUtils.isMobileMode, this._app.getComponent。

### `eyes/src/ui/views/ObjectView.js`

对象页的实体准备、子父对象切换、覆盖时间及相机跟随。

- `imports: ../../engine/solar-system/public-api.js, ../../engine/pioneer/index.js, ../../framework/eyes/index.js, ../../app/public-api.js, ./ExtendedBaseView.js`
- `manager dependencies: content, layer, scene, cameraFollow, trajectory, router, time, selection`
- `component dependencies: contentPanel, breadcrumb, eventsTimeline, clock`

**ObjectView**：对象页的实体准备、子父对象切换、覆盖时间及相机跟随；继承 ExtendedBaseView.default。

- `constructor`：建立实例初始字段和依赖；调用 this._app.getManager, this.bindFunctions；写入 _entityInfo, _entityDesc, _scEvents, _featuredCardsList, _isSpacecraft, _forceLoadEntities, _hasLoaded, _onLoaded, _onAfter。
- `onEnter`：进入视图时准备界面和订阅；调用 this._app.getComponent, super.onEnter；写入 _offsetPanel。
- `onLeave`：离开视图时恢复状态并解除订阅；调用 this._app.getManager, this.app.getManager, super.onLeave。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this._app.getManager, Manager.get, super.onRouteChange。
- `onQueryChange`：响应查询参数变化；调用 super.onQueryChange, this._app.getComponent。
- `registerCallbacks`：登记跨组件或管理器事件订阅；调用 super.registerCallbacks, this._app.getComponent, PanelComponent.registerCallback。
- `removeCallbacks`：移除本模块登记的事件订阅；调用 super.removeCallbacks, this._app.getComponent, PanelComponent.removeCallback。
- `_reset`：重置上一目标留下的临时状态；调用 super._reset；写入 _entityDesc, _scEvents, _featuredCardsList, _scOrderedEvents, _isSpacecraft, _forceLoadEntities, _hasLoaded, _onLoaded, _target。
- `_updateResources`：按目标和路由准备数据及实体；调用 this._app.getManager, this.app.getManager, this._app.pioneer.getScene, Manager.getEntityInfo, this._handleError, Manager.resetContext, this._forceLoadEntities.push, this._app.cameraScripts.isBarycenter, this._app.cameraScripts.removeBarycenter, Manager.setEntitiesForceVisible, this._app.scene.waitTillEntitiesInPlace, Manager.setTarget, this._entityInfo.category.toLowerCase, Manager.loadEvents；写入 _entityInfo, _isSpacecraft, _hasLoaded, _scEvents, _scOrderedEvents, _entityDesc, _featuredCardsList。
- `getCurrentTarget`：执行 getCurrentTarget 对应的组件业务步骤。
- `appendForceLoadEntities`：执行 appendForceLoadEntities 对应的组件业务步骤；调用 this._forceLoadEntities.push。
- `removeForceLoadEntities`：执行 removeForceLoadEntities 对应的组件业务步骤；调用 this._forceLoadEntities.includes, this._forceLoadEntities.indexOf, this._forceLoadEntities.splice。
- `onChildChanged`：执行 onChildChanged 对应的组件业务步骤；调用 this._app.getComponent, this._app.getManager, PanelComponent.onChildParentChange。
- `onParentChanged`：执行 onParentChanged 对应的组件业务步骤；调用 this._app.getManager, Manager.resetContextualLayers, this._app.getComponent, PanelComponent.onChildParentChange, this._updateCamera。
- `_updateComponents`：把当前目标数据交给 UI 组件；调用 super._updateComponents, this._app.getManager, Manager.currentRoute.url.match, this._app.getComponent, this._components.includes, Promise.all, this._collapsibleItems.find, TimelineComponent.setTarget, this._onLoaded.push, TimelineComponent.resize, PanelComponent.clearPanel, PanelComponent.onRouteChangeObject, this.getCurrentTarget, PanelComponent.onRouteChangeObjectLoaded；写入 _collapsibleItems, _onLoaded。
- `_updateTimeForTarget`：将时间限制收敛到目标覆盖范围；调用 Math.abs, super._updateTimeForTarget, this._app.getManager, Manager.parseTime, Manager.isWithinLimits, Manager.getTimeUrl, this._app.getComponent, Manager.reroute；写入 _onAfter。
- `_updateCamera`：按当前模式定位相机与目标；调用 this._entityInfo.category.toLowerCase, this._app.getManager, this._app.getComponent, this._updateCameraOnParentChange, Scripts.alignSpacecraftPlanet, Scripts.goToSpacecraft, Scripts.goToInstrument, Scripts.goToCelestialObject, this.app.getManager, Manager.setEntitiesForceVisible, Manager.getCMTSEntity, SolarSystemSceneExports.Mapping.set, this._app.pioneer.getScene。
- `_updateCameraOnParentChange`：执行 _updateCameraOnParentChange 对应的组件业务步骤。
- `_loaded`：执行 _loaded 对应的组件业务步骤；调用 super._loaded；写入 _onLoaded, _hasLoaded。
- `_shouldHideControls`：根据面板状态判断是否隐藏控制项；调用 this._app.getComponent, Eyes.AppUtils.isMobileMode。
- `after`：执行路由更新后的收尾步骤；调用 this._onAfter；写入 _onAfter。

### `eyes/src/ui/views/StoryView.js`

故事与 slide 查询切换、故事时钟及相机状态。

- `imports: ../../framework/eyes/index.js, ./ExtendedBaseView.js`
- `manager dependencies: content, label, selection, time, router, layer, scene`
- `component dependencies: story, clock, menu, breadcrumb, storyClock, timeControls, clockShortcut, settings`

**StoryView**：故事与 slide 查询切换、故事时钟及相机状态；继承 ExtendedBaseView.default。

- `constructor`：建立实例初始字段和依赖；调用 this._validQueries.push, this._app.getManager, this.bindFunctions；写入 _story, _storyId, _slideId, _isStoryEntry, _isStoryExit。
- `before`：执行路由更新前置步骤；调用 super.before；写入 _isStoryEntry, _isStoryExit。
- `after`：执行路由更新后的收尾步骤；调用 super.after；写入 _isStoryEntry。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 super.onRouteChange, this._verifySlideInfo。
- `onQueryChange`：响应查询参数变化；调用 this._verifySlideInfo, super.onQueryChange, this._app.getComponent, this._updateCamera；写入 _isStoryExit, _slideId, _isStoryEntry。
- `onEnter`：进入视图时准备界面和订阅；调用 this._app.getComponent, super.onEnter, this._app.getManager, Eyes.AppUtils.isMobileMode；写入 _isStoryExit, _offsetPanel。
- `onLeave`：离开视图时恢复状态并解除订阅；调用 super.onLeave, this._app.getComponent, Component.onLeave, Component.hide, this.setViewportOffset, this._app.getManager；写入 _story, _isStoryEntry, _isStoryExit。
- `_verifySlideInfo`：执行 _verifySlideInfo 对应的组件业务步骤；调用 this._story.slides.find, this._app.getManager, Manager.reroute。
- `_updateResources`：按目标和路由准备数据及实体；调用 super._updateResources, this._app.getManager, this._app.getComponent, Eyes.AppUtils.deepClone, this._story.slides.find, this.app.getManager, this._app.scene.waitTillEntitiesInPlace, this._handleError；写入 _isStoryExit, _story, _storyId, _slideId。
- `_updateTime`：按查询参数或当前目标设置时间；调用 super._updateTime, this._app.getManager, this._story.slides.find, Manager.setTime, this._app.pioneer.waitUntilNextFrame, Manager.setMin, Manager.setMax。
- `_shouldHideControls`：根据面板状态判断是否隐藏控制项；调用 Eyes.AppUtils.isMobileMode, this._app.getComponent。
- `_updateComponents`：把当前目标数据交给 UI 组件；调用 super._updateComponents, this._app.getManager, Route.url.match, this._app.getComponent, Component.onRouteChange, Component.show, this.setViewportOffset。
- `_updateCamera`：按当前模式定位相机与目标；调用 super._updateCamera, this._story.slides.find, this._app.getComponent, Component.getState, this._app.cameraScripts.goToSystem, this.app.getManager, this._app.scene.waitTillEntitiesInPlace。
- `resize`：重排响应式界面；调用 super.resize, this._app.getComponent, Eyes.AppUtils.isMobileMode。
- `registerCallbacks`：登记跨组件或管理器事件订阅；调用 super.registerCallbacks, this._app.getComponent, Component.registerCallback。
- `removeCallbacks`：移除本模块登记的事件订阅；调用 super.removeCallbacks, this._app.getComponent, Component.removeCallback。
- `setStorySlides`：执行 setStorySlides 对应的组件业务步骤。
- `isStoryExit`：执行 isStoryExit 对应的组件业务步骤。

### `eyes/src/ui/views/TelescopeView.js`

将路由生命周期转交望远镜组件。

- `imports: ./ExtendedBaseView.js`
- `manager dependencies: scene, content, router`
- `component dependencies: telescope, breadcrumb`

**TelescopeView**：将路由生命周期转交望远镜组件；继承 ExtendedBaseView.default。

- `onEnter`：进入视图时准备界面和订阅；调用 super.onEnter, this._app.getComponent。
- `onRouteChange`：响应路径参数变化并刷新本模块；调用 this._app.getComponent, super.onRouteChange。
- `_updateResources`：按目标和路由准备数据及实体；调用 this.app.getManager；写入 _target。
- `processQuery`：把查询参数应用到时间、图层或模块状态；调用 super.processQuery, this._app.getComponent。
- `_updateComponents`：把当前目标数据交给 UI 组件；调用 super._updateComponents, this._app.getManager, Route.url.match, this._app.getComponent；写入 _entityInfo。
- `_updateCamera`：按当前模式定位相机与目标；调用 this.app.getManager。
- `onLeave`：离开视图时恢复状态并解除订阅；调用 super.onLeave, this._app.getComponent。


## 验证边界

本次只读源码分析，不运行页面、服务器或 NASA 请求，不修改生产逻辑。`application-notes.json` 的 methodEvidence 保存 AST 方法行号、参数、读取/写入、调用、返回、管理器及组件依赖；包含 getter/setter 等文本扫描容易遗漏的入口。样式占位和时区表不具有业务类。未能从调用上下文唯一确定的压缩变量保留原名，不把推断包装成原始作者命名。
