# 五个故事模块的实际语义整理

此前 `Unidentified1081` 至 `1085` 是恢复工具产生的占位名。本次结合 STORIES 注册键、真实 title、实体列表和行为钩子，修改了实际文件名及导入关系；provenance 保留原 module id、bundle 区间，并用 initialRecoveredFile 记录初次恢复路径。

| module id | 现在的源码 | 命名证据 |
| --- | --- | --- |
| 1081 | [AnnularSolarEclipseStory.js](../../eyes/src/engine/core/AnnularSolarEclipseStory.js) | annular_solar_eclipse 注册项、2023-10-14、Annular Solar Eclipse 标题 |
| 1082 | [TotalSolarEclipseStory.js](../../eyes/src/engine/core/TotalSolarEclipseStory.js) | total_solar_eclipse 注册项、2024-04-08、城市和等食分地图 |
| 1083 | [EnceladusDiscoveryStory.js](../../eyes/src/engine/core/EnceladusDiscoveryStory.js) | enceladus_discovery 注册项、Cassini/Enceladus 实体和发现故事 |
| 1084 | [VoyagerGrandTourStory.js](../../eyes/src/engine/core/VoyagerGrandTourStory.js) | voyager_grand_tour、Voyager 1/2、Grand Tour 标题 |
| 1085 | [ParkerSolarProbePerihelionStory.js](../../eyes/src/engine/core/ParkerSolarProbePerihelionStory.js) | psp_perihelion、近日点时间、Parker Solar Probe 实体 |

## 完成内容

五个模块共重命名 165 个词法绑定（包括 defaultExport），所有一/两字符绑定清零。作用域独立处理：相同 t 在应用钩子中是 app，在图层遍历中是 layerId，在 DOM 遍历中是 labelElement，在错误回调中是 loadError。不是全文字符串替换。

已展开仅作为语句使用的逗号表达式、三元分支和 &&/|| 短路调用；返回值、await、相机动作次序与异步退出检查保持原样。没有修改故事文案、时间、坐标、实体 id、CSS、图片地址或材质公式。

## 日环食

模块状态保存原地球 decal/color/night/specular 的 URL 与尺寸列表、原大气密度及环境光；它们在 camera 阶段初始化，slide 离开时成对恢复。earthEntity 与 moonEntity 分开，earthTextureLOD 与地球基础 spheroid 组件分开。原 r/a/l/c/h/d/u/p/_/m/g/y/f/T 已分别写成这些具体角色。

ensureShadowCones 拥有月球上的本影/半影组件；hideContourLabels 直接隐藏标注，showContourLabels 还检查用户的等食分开关。isBehindMoonView 与 isContourMapEnabled 是不同状态：离开背月视角不代表用户重新打开等食分。相机中的 waitTillEntitiesInPlace 回调在原实现中未被外层 await，当前保留此时序，不能把 camera Promise 完成当成全部实体就位。

## 日全食

cityPlacemarkDefinitions 与 contourPlacemarkDefinitions 是不同的数据表；createPlacemarkGroup 为标注实体及可选针脚实体设置地球父级和固定参考系。setPlacemarkGroupEnabled 将 group id 的后缀去掉后对应 checkbox id。原实现按 checkboxContent 的每个条目重复同步同一 checkbox，这个可疑次数没有混入重命名修复。

enableShadowCones 在两个锥已存在时重新启用它们，首次才创建并设置太阳到地球的关系。removeEarthEcliptic 只移除临时黄道实体。camera 第二个参数名为 hasStoryExited，依据是 StoryView 实际传入绑定的 isStoryExit 方法；它不是 CancelToken 对象。异步阶段后的检查次序保持不变。

## 土卫二

savedStoryState 同时拥有原图层可见性和 maxTextureSize。仅把实际需要切换的图层记录进去，离开时再次切换回去。第八个 slide 单独保存 cassiniTrail 原起始时刻，临时改为 enceladus 相对轨迹，离开该 slide 后恢复空参考和原时刻；故事级清理不能先删除 slide 尚需读取的状态。

## 旅行者

voyagerOneTrail / voyagerTwoTrail 分别保存原轨迹起始值；飞行总览把其临时扩大 1e8 倍。savedStoryState.timeCheck 每 500ms 检查模拟时间是否追上真实现在，到达时重置时间倍率并清除定时器，slide 离开也要清除它。cameraEntity 上的 zoomFitController 属于故事临时状态；金唱片临时实体 voyager_disc 的创建/移除与相机父级切换保留原次序。

## 帕克

perihelionTime 是第二和第四 slide 复用的时间常量。进入故事显式关闭 spacecraft 层，离开显式打开；这是原有政策，不是保存并恢复先前可见性。当前只将 s/t/defaultExport 等名称还原为具体职责，未顺带改变这一政策。

## 证明与回归

[semantic-story.node-check.cjs](../../tools/semantic-story.node-check.cjs) 覆盖图层恢复、纹理/大气/环境光恢复、等食分交互、土卫二轨迹与纹理上限、旅行者定时器/双轨迹、日全食退出查询和帕克图层政策。

所有五个模块在改名前后比较 bindingHash：先将等价语句控制流归一化，再规范化词法绑定，保持自由全局名、属性名、常量和调用结构参与比较。只有变量名/等价语句表达不同，摘要才会相同；工具另有短路副作用、await、异常/finally、捕获全局与常量变更回归。该证明不等于 NASA 运行环境的所有边界都经过实机验证。
