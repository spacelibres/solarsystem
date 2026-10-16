# 应用层逐文件中文参考

> 这是 v0.2.31 的初始静态研究基线。后续实际重命名、控制流整理与运行验证见同目录 semantic-changes 清单；当前源码签名、行号和进度以 README.md 与 semantic-progress.json 为准。不能用本研究基线替代源码语义验收。


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
