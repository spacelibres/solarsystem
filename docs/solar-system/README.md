# 可控 Solar System 工程

独立入口：`/explorer`。默认 `/` 仍进入参考 Eyes，新的页面不加载恢复后的应用包，不使用 iframe。生产代码在 `src/solar/`，使用本仓库官方 Three.js 与 Next/React 构建。

## 当前实现与边界

| 能力 | 当前状态 | 实现与依据 |
| --- | --- | --- |
| ET/UTC、暂停、正放/倒放、实时 | 已实现 | [时间](time.md)，显式时钟输入；闰秒歧义和源算法限制有说明 |
| pos/lin/ori/quat/orb 五类求值 | 已实现 | [星历](ephemeris.md)，真实 dyn 样本和恢复源码作为测试证据 |
| 分段索引、缓存、取消、并发和字节预算 | 已实现 | [资源](resources.md)，失败可重试、过期结果隔离 |
| 阶段、父级、世界位置和可用状态 | 已实现 | `domain/entities.ts`，父级平移累加，不擅自继承姿态 |
| 仿真事务、选择、订阅、诊断快照 | 已实现 | [运行时](runtime.md)，单个 ET 求解整帧 |
| 全量源对象目录与按需系统 | 已接入 | [目录](catalog.md)：844项原始注册；日心入口842项，8行星、454天然卫星、221航天器等分组，注册不代表全部行为已支持 |
| 行星六面纹理、椭球、相对相机、拾取 | 基础实现 | `render/`；实际 NASA 六面 URL、标准 Three 投影 |
| 轨道、卫星/航天器真实模型 | 已接入并逐场景验收 | [模型](models.md)、[展示](display.md)；官方GLTF/Draco/KTX2/Meshopt，实际星历轨迹，按可见尺寸加载 |
| 太阳纹理/光晕、土星/天王星/海王星环 | 已接入 | 实际六面太阳图和原始径向环图、原始环半径；高级遮影仍待移植 |
| 地形分块 LOD、法线/高光、云、大气、阴影 | 待实现 | 当前材质仍未达到参考应用完整光照效果 |
| 完整星空亮度模型、银河、透镜/后处理 | 待实现 | 当前使用两层实际恒星数据和基础 Points 材质 |
| Eyes 全部面板、故事、测量、比较、分享和导览 | 待实现 | `/eyes` 是参照，不计入新工程能力 |

## 源码与配置

- `src/solar/domain/`：时间、五类星历、实体图。无 React、浏览器或 Three 运行时依赖。
- `src/solar/runtime/`：共享资源租约、真实数据窗口、仿真事务。帧循环由宿主控制。
- `src/solar/config/scene-catalog.ts`：独立运行入口使用的全目录适配、阶段和控制器。`catalog.generated.json`保留原始注册与诊断，`default-scene.ts`保留基础对照样本。
- `src/solar/render/`：官方 Three 场景、六面椭球、相机。与数据运行时分开销毁。
- `src/solar/ui/`：React 控件、UTC 输入、可见错误和诊断。
- `src/app/explorer/page.tsx`：独立 Next 路由及客户端边界。

配置不是网页编辑器。通过具名 TypeScript 类型编辑配置、替换 repository 或传入运行时实体。NASA 媒体按需在运行时获取，不复制素材库。

## 操作与可复现调试

运行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:3000/explorer`。首页为太阳系总览；搜索或按行星/天然卫星/地球人造卫星/航天器分类选择目标，使用“查看卫星系统”切入子系统，或近距离查看原始模型。轨道和标签可分别开关。拖动旋转、滚轮缩放、右键平移；重置视角按实际视场角重新取景。时间轴和 UTC 表单会暂停并跳转；“实时”重新同步当前墙钟，“播放”按指定速率推进。诊断面板显示帧状态、ET、请求、缓存和 GPU 统计。失败会显式显示并提供重试。

开发环境自动提供具名接口 `window.__SOLAR_EXPLORER__`；生产构建需显式设置 `NEXT_PUBLIC_SOLAR_DEBUG=1`。未开启时不暴露可写全局调试接口，页面诊断仍可查看。类型见 `ExplorerDebugApi`。

```ts
const explorer = window.__SOLAR_EXPLORER__;
if (!explorer) throw new Error('Debug API is disabled');
explorer.pause();
explorer.seek(820497669.184); // 2026-01-01 00:00:00 UTC, source-compatible ET
explorer.select('earth');
explorer.play(60);
explorer.step(1); // 明确推进60秒，并切入手动推进；加载完成仍由 runtime 接收
console.log(explorer.snapshot());
explorer.automatic(); // 恢复宿主 RAF 推进
explorer.live(Date.now());
explorer.resetCamera();
```

`step` 不代表等待网络完成。用 `snapshot().runtime.pending`、`frames` 和 `errors` 判断数据就绪；缺失位置不会伪造一个 ready 帧。模型配置显式允许未知姿态时，位置可以 ready，姿态仍为 null，界面注明；其他天体仍要求配置的姿态流。手动推进中若处于 live，需给 `step(realSeconds, unixMilliseconds)` 显式墙钟。卸载或重试会释放当前资源和调试接口。

宿主动画间隔最大取0.1秒以避免后台恢复时跳跃；独立 runtime 的 `tick` 本身接受显式完整时长。UTC 表单范围沿用参考的1949-12-31至2049-12-31；真实可用性仍由具体文件与阶段决定。

## 验证与后续次序

本次详细证据、环境与验收限制见 [基础及v0.2.36对象展示验证记录](verification.md)。

针对性测试：`npx vitest run solar-`。发布检查：`npm ci && npm test && npm run check && npm run build`。构建必须遵循仓库 mirror 出树规则。算法测试包含恢复源码 CPU 对照，但不替代浏览器和 GPU 验收。

后续按太阳系优先推进：补齐特殊位置/姿态控制器、关节机构与动态工厂 → 轨迹/相机细节对齐 → 表面 LOD 与材质 → 太阳、环、大气、星空和后处理 → 面板工具与故事 → 逐项参考对照。每项以真实文件证据、可读源码、文档和运行验证闭环，完成 Solar System 后再扩展其他 Eyes 应用。

所有分析索引见 [Eyes 分析](../eyes-analysis/README.md)，其中“静态契约已记录”和“行为已验证”是不同的证据等级；不能据此声称所有原始命名或 NASA 未公开仓库已经恢复。

轨道配色、父级可见性、完整星空与星座的修正证据见 [参考展示修正](reference-display.md)。
