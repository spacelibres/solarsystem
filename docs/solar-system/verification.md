# 基础工程验证记录 · v0.2.35

本次验证针对独立 `/explorer` 基础，不代表完整 Eyes 复刻验收。分析基线是 v0.2.34；新生产代码仅在 `src/solar/` 与独立 Next 路由中运行。

## 发布检查

以下命令在同一工作树顺序执行，退出码均为0：

1. `npm ci`：按现有锁文件安装，未升级依赖。输出仍含 ESLint 版本弃用提示及6项高等级依赖审计报告；本次没有自动修复或强制升级。
2. `npm test`：28个 Vitest 文件，329项通过；Node检查229项通过；共558项，没有失败或跳过。新增基础测试103项。
3. `npm run check`：TypeScript、ESLint、恢复源码审计、分析索引新鲜度均通过。
4. `npm run build`：生产构建通过，包含独立静态 `/explorer`；正常构建未调用恢复工具。

792个剩余源码契约条目的LF规范化SHA-256逐一匹配。版本更新仅刷新两个 Eyes 包元数据的身份记录，不改变原有语义验收状态。新入口源码依赖检查无恢复应用 import、旧 SolarViewer/solar-scene、iframe 或 Pioneer 全局；引用恢复文件的字符串仅作来源说明。

## 实际浏览器

- 开发版及生产版直接打开 `http://127.0.0.1:3000/explorer`，真实NASA网络资源可用。
- 1280×720：地球六面纹理可见，六个目标数据ready，选择地球/月球/木星/旅行者可用，暂停/播放/速率/实时可操作。
- UTC跳转1979-03-05 12:00:00，旅行者父级为木星；返回实时后为太阳。没有用历史成功掩盖当前时间失败。
- 当前旅行者404字节数据包含末尾完全重复记录。精确响应回归先失败，后通过窄范围规范化修复；中间重复、冲突末尾记录继续拒绝。当前时刻与最后端点均数值可用。
- 生产页面错误/警告日志为空。截图：工作区 `artifacts/explorer-foundation.png`。

独立审查分别覆盖时间/实体、求值、资源、运行时、渲染/UI与最终集成。已修复极小四元数归一化、极小角速度倒数溢出、订阅回调重入、宽屏FOV裁切、构造失败清理、旅行者尾部填充问题。

## 尚不能宣称通过的验收

移动触控与真实窄屏设备、context loss/restoration、全目录、完整航天器模型/姿态、长时GPU资源曲线、全功能图像对照与所有故事流程仍待后续实施和设备测试。CPU几何/相机测试不替代这些验收。


# 对象与展示验证记录 · v0.2.36

本节记录独立 `/explorer` 的目录、系统及模型扩展，保留上面的v0.2.35历史结果。参考恢复代码不作为新入口运行时依赖。844条源码注册静态提取为可再现清单，独立目录842项；454天然卫星、221航天器等是源分组数量，不是逐对象验收数。

## 发布检查

- `npm ci` 退出0；沿用锁文件，现有依赖审计报告仍在，没有自动升级。
- `npm test`：36个Vitest文件，377项通过；Node检查229项通过，共606项，无失败或跳过。
- `npm run check`：TypeScript、ESLint、恢复源码审计、分析索引新鲜度通过。
- `npm run build`：生产构建通过，独立静态入口存在；未调用恢复工具。
- 清单重新生成字节一致；792个剩余源码契约条目的LF规范化SHA-256全部匹配。版本变更不提高旧源码语义验收等级。

## 实际浏览器证据

在本机生产服务 `http://127.0.0.1:3000/explorer`，使用真实NASA远程资源核对：

- 太阳与八大行星总览9项ready，真实距离/六面贴图及轨道；截图 `artifacts/explorer-solar-overview.png`。
- 木星系统包含Io、Europa、Ganymede、Callisto及其他卫星、Juno名称和轨道；一次截图时107项ready、4项仍加载、5项不可用。不可用数量不隐去，不表示整个木星系统逐对象验收；截图 `artifacts/explorer-jupiter-system.png`。
- 土星实际环贴图、上下表面和近景；截图 `artifacts/explorer-saturn.png`。
- ISS原始模型及当前位置/姿态，3项依赖ready；截图 `artifacts/explorer-iss.png`。
- Hubble原始模型在开发版实际显示；截图 `artifacts/explorer-hubble.png`。
- Voyager1原始模型在生产版显示，加载完成按实际模型包围体重新取景，长杆完整，3项依赖ready；截图 `artifacts/explorer-voyager.png`。
- Juno原始模型和木星相对位置可显示；当前姿态数据不可用，界面明确显示“当前姿态未解析”，不列为完整姿态验收；截图 `artifacts/explorer-juno.png`。
- 浏览器视口包含1280×720及用户调整后的873×1004，后者系统按钮仍可见；真实手机触控尚未验证。最终生产ISS/Voyager检查的页面错误/警告日志为空。
- 名称搜索发现Moon被通用moon类别结果淹没，已增加精确名称/ID优先排序回归，生产浏览器确认Moon首条、月球真实六面贴图及3项依赖ready；截图 `artifacts/explorer-moon.png`。类别搜索和目录分页继续可用。

## 行为修复与独立审查

真实Venus中间连续重复记录只在字节相同时合并；Mars原序跨回历史记录按原PointSet选择算法取正区间，缓存窗口收窄到真实选择单元，正反播放/跳转与边界回归通过。没有排序后跨反向边插值。

候选路径no-data按真实不可用区间缓存，播放离开该区间后自动重试，网络和无效数据仍需显式重试。嵌套索引共享端点的左子级窗口排除切换时刻，右子级在精确端点可加载；最终端点仍闭合。真实格式二进制与运行时联合回归覆盖9.5→10。

独立审查覆盖目录/模型、控制器/覆盖、场景导航与最终集成，发现的问题已修复复审。实际Three的CPU测试覆盖非交换旋转、相机/标签、轨道重心因子、未知姿态清除及模型包围体；这些不替代GPU长期和设备验收。

## 仍待完成

这次完成目录、系统与模型的首轮扩展，未宣称完整Eyes一比一。自定义控制器、地面LLA/夹地、机构关节、增量/时间偏移姿态、完整地形LOD、云/大气/遮影与后处理、原应用所有工具及故事仍需迁移。所有842项对象、所有日期、真实移动触控、context loss/restoration和长时GPU资源曲线尚未逐项通过。详细边界见 `display.md`、`controllers.md` 与 `models.md`。


# 参考展示修正 · v0.2.37

根因、源码公式、实际数据及画面对照见 [参考展示修正](reference-display.md)。本次不是目录数量更新：修正物理标记被标签位移、父级隐藏、轨道色值及当前状态重建、星表旋转、缺少五层星空/星座、近景遮挡和星历读数。

实时两日期核对十个基本对象全部ready；直接对照TrailManager和VisibleInterval，独立审查未发现剩余阻塞问题。依赖按原锁文件重装退出0（本机耗时6分钟；现有6项高等级审计报告仍在，未自动升级）。`npm test` 39个Vitest文件385项、Node229项，共614项全部通过；`npm run check` 与 `npm run build` 退出0。792个源码契约身份匹配。

生产版页面总览十个物理DOM标记可见（太阳、八行星、月球），未用移动文字伪装位置。Moon近景缩远后Earth仍可见，白色月轨围绕Earth；近景月面不再被星空/星座线或自身轨道覆盖。页面以1天/秒从2026-10-16播放至2026-10-24，月地距离从约404853km变为374057km，再返回实时；十个基本对象保持ready。最终生产页面错误/警告日志为空。

生产截图：`artifacts/orbit-sky-production.png`、`artifacts/moon-ephemeris.png`、`artifacts/earth-moon-context-production.png`。原开发过程中HMR旧快照缺少新增字段的错误已修复并完整重载，未把开发历史日志当作生产无错误证据。

## 卫星显隐、轨迹和缩放性能 · v0.2.38

依据和边界见 [卫星显示、轨迹与性能](satellite-visibility-and-trails.md)。
`npm ci`、`npm test`（43 个 Vitest 文件 406 项 + Node 229 项，共 635 项）、
`npm run check`、`npm run build`、目录复现检查均退出 0。

实际 NASA 叶数据验证 ISS 5573 秒、Hubble 5748.5 秒历史窗口，Phobos 自动
周期约 27575.145 秒、Io 约 152981.079 秒；各自当前端点精确、覆盖连续。
回归测试包含稀疏采样跨多个连续叶、真实缺口、请求预算和取消，不把未探测的叶
误报为缺口；实际已安装 Three.js shader 的宽度和透明度替换点也已验证。

生产页面连续缩放和暂停缩放保持轨道几何计数 9；最终地球卫星暂停近景为
142–143 FPS，实时近景约 115 FPS。截图 `artifacts/satellite-performance-production.png`。
帧率为本机观察值，不是所有设备保证。记录正常缺少日期覆盖与解析失败，不隐瞒
TESS 和部分深空任务尚未接受的分段/姿态数据。

最终生产版确认鼠标停在 Sun 名称上滚轮仍改变视角尺度，随后点击 Jupiter
场景标签可切换木星近景；标签转交滚轮没有破坏点击选择。木星系统缩放后
Io、Europa、Ganymede、Callisto 的真实轨迹可见；截图
`artifacts/jupiter-satellite-trails-production.png`。页面控制台错误/警告为空，
但界面诊断仍明确列出未接受的数据，二者不可混淆。


## v0.2.39 连续拖尾修正（2026-10-17）

`npm ci`、`npm test`、`npm run check`、`npm run solar:catalog:check`、
`npm run build` 均成功。最终测试为 47 文件/425 项 Vitest 测试及 229 项
Node 源码契约测试，0 失败。最后增加的时长区间缓存回归先失败、实现后通过，
随后重新执行全部测试、检查和生产构建。

生产页面验证 Earth 卫星曲线、ISS 模型近景、60 秒/秒播放及连续缩放，
再暂停观察轨道弧段；小型天然卫星开关可切换并保持 ISS 选择。
浏览器控制台 error/warn 为空。截图：`artifacts/iss-continuous-trails-v39.png`。
界面仍报告 7 项星历暂时不可用及 29 条当前时刻无覆盖；这些不被空控制台掩盖。
未重新测量生产 FPS，不沿用 v0.2.38 的帧率作为本版结果。
实现原因、真实 ISS 数值检验与未完成边界见 [连续拖尾分析](continuous-trails.md)。


## v0.2.40 太阳初始化方块（2026-10-17）

生产版 v0.2.39 刷新 `/explorer` 可复现中心约 100 像素黄色实心方块。
根因是 Sun 的 `SpriteMaterial` 在异步透明贴图返回前已经可见：没有 map 时
整张矩形面片均参与加色混合，并不是球体几何变成了立方体。

`sun-glow.ts` 创建隐藏光晕，仅在现有资源池成功加载并挂上 alpha 贴图后显示。
失败保持隐藏，太阳球面与名称继续可用；销毁/取消沿用现有 attachTexture 所有权检查。
回归测试覆盖未加载时隐藏、成功后绑定纹理并显示；先红后绿。

最终 `npm ci`、`npm test`（48 文件/427 项 Vitest + 229 项 Node）、
`npm run check`、`npm run build` 全部通过。
生产包连续两次刷新检查初始加载画面，均无黄色矩形；加载完成后圆形光晕正常。
截图 `artifacts/sun-startup-v40.png`；浏览器 error/warn 为空。


## v0.2.41 星历与模型关节（2026-10-17）

`npm ci`、完整测试（51 文件/443 项 Vitest + 229 项 Node）、
`npm run check`、`npm run solar:catalog:check`、`npm run build` 均通过。
模型关节主轴 none 在祖先旋转浮点误差下产生 NaN 的问题先由新测试复现，
修复后再次通过全套测试、检查和生产构建。最终静态检查单独再次成功。

生产太阳系总览在 ET845470723 附近为 ready，原六项解析错误及重试提示消失；
仍有4条真实姿态时刻无覆盖，不伪造姿态。截图 `artifacts/ephemeris-ready-v41.png`。
GPM 实际 glTF 绑定 GPM_antenna，角度从11.0296增加至31.0661；暂停后两次读取
均为31.066076489786095；倒放后降至-1.19799，恢复60秒/秒正放继续增加。
截图 `artifacts/gpm-animation-v41.png`。使用源端192度/秒及实时钳制。

最终 ISS 生产模型10组太阳翼关节全部 applied，无 missing/unavailable；
COWVR_top_spin active 且角度增长。RapidScat 在当前ET正确 outside-coverage，
没有强迫过期设备旋转。截图 `artifacts/iss-joints-v41.png`。
浏览器 error/warn 为空；其他任务的无覆盖提示与跨参考体拖尾缺口仍显式记录。
未宣称任意自定义回调或所有对象全部实现；见新分析文档的范围说明。


## v0.2.42 全量关节控制对照（2026-10-17）

本版先确认 v0.2.41 的范围缺口：缺少OSIRIS/Stardust关键帧及部件显示控制；
关节 primary-none/secondary 算法与原源码不完全一致；OSIRIS Bennu阶段的父体
编号和目录别名未匹配，导致任务时刻对象不可见。没有把active/applied当成画面验收。

完整目录221航天器，其中20项声明关节或部件显示控制：25align、10spin、
10rotation、3visibility、17visibility-interval，共65项。逐项清单可重新生成和校验。
原版CPU控制器与我们求解器的对照覆盖全部25个对齐配置的多组模型/祖先/实体旋转，
以及原Animation helper的全部10组旋转和3组显示关键帧前后、中点、反向顺序。

最终 `npm ci`、`npm test`（53文件/493项Vitest+229项Node）、`npm run check`、
`npm run solar:catalog:check`、清单校验、生产构建通过。一次并行测试中的目录重现
测试超过既有5秒限制，未提高限制；复跑完整测试通过。追加原helper对照测试后再次
执行完整测试和检查成功，部署代码未再修改。

最终生产包真实NASA模型：OSIRIS在UTC2020-10-20 21:30:14/21:34:14两时刻均为ready，
父体Bennu、姿态和位置已解析；相机位置未变，太阳翼网格明显改变。基座角从
-1.219857156变为0，左右俯仰轴到+/-0.663225116；两次截图均由实际浏览器保存：
`artifacts/osiris-gimbal-before-v42.png`、`artifacts/osiris-gimbal-after-v42.png`。
浏览器error/warn为空，仍有NewHorizons的2条当前任务时间姿态覆盖缺口明确显示。

这是完整显式关节配置和算法对照，加上实际任务时刻的可见网格验证；没有宣称已经
逐个航天器、每个日期、所有GPU组合完成画面等价验收。旧层级审计的空几何限制
和原始source数据缺口见joint-mesh-audit.md与model-animation.md。


## v0.2.43 THEMIS整星自旋（2026-10-17）

用户指定Eyes THEMIS A后核查发现：此前部件关节覆盖没有检查整星自旋，
转换器错误要求relativeToTime，丢弃122个缺省历元配置。已保留全部129个源spin
并在runtime初始化时为缺省历元建立相位起点，显式源历元保持原值。
旧测试对referenceTime必填的断言随真实源规则修正；新增全目录保留检查与运行时
THEMIS正放/暂停/倒放回归，修复前两项均失败，修复后通过。

`npm ci`、完整495项Vitest（54文件）和229项Node、`npm run check`、清单校验、
生产构建全部通过。真实NASA模型在LIVE1秒/秒下本体与天线方向明显变化，
10.86秒间隔的姿态最短差角与2.99988秒周期预测差约1.62e-6弧度；暂停姿态不变。
截图themis-spin-a-v43.png与themis-spin-b-v43.png；保留新生产页面为实时THEMIS A。
错误/警告控制台为空。其他任务26条时刻无覆盖仍明确显示，不混同于本次自旋修复。
详见whole-craft-spin.md。

## v0.2.44 IXPE初始取景（2026-10-17）

对照CameraScripts.goToSpacecraft确认源相机采用父相对径向外侧位置、父北轴为上。
IXPE源控制器为dynamo位置加fixed单位姿态；修复的是共用相机初始化，保留本体姿态。
Three OrbitControls缓存up基础，改为重置取景时重新绑定并清除旧阻尼。
新增4项回归（首次3项缺少实现失败，然后通过），完整499项Vitest/55文件和
229项Node通过；npm ci、npm run check、npm run build全部通过。
新生产页面IXPE的地球标签位于模型背景中心，不再朝星空；诊断parent=earth、
orientation=(0,0,0,1)，浏览器error/warn为空。截图ixpe-earth-view-v44.png。
当前地球背景呈平面深蓝，尚未对齐原版地球着色与景深；未宣称所有姿态视觉等价。
镜头边界与后续差异见spacecraft-camera.md。

## v0.2.45 全屏透明浮层（2026-10-17）

依照用户明确要求移除界面底部来源句，README来源说明保持；上下栏不再占布局行。
生产浏览器实测canvas边界为(0,0,1280,720)，与主视图尺寸相同；header、aside、
footer的computed background均为rgba(0,0,0,0)。目录收起/恢复、天体选择、暂停、
场景拖动可用。目录clientWidth=scrollWidth=210，无横向溢出；浏览器error/warn为空。
截图artifacts/transparent-hud-v45.png。小屏使用原有横向目录并保留滚动与控件换行，
本次未单独执行移动设备截图验收。
完整npm ci、499项Vitest和229项Node测试通过；最终CSS调整后再次check及生产build
通过。布局规则与归属文案变更依据记录在transparent-hud.md。
