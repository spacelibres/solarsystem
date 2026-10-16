# 时间契约

`src/solar/domain/time.ts` 是不依赖 DOM、Three 或恢复运行时的纯时间模块。
它只以 `eyes/src/engine/core/TimeUtils.js` 为格式契约证据，生产代码没有导入该文件。

所有模拟时间都是 ET 秒；UTC 入口和出口都是 Unix 毫秒。转换严格保留源应用的
`946727957.816` 秒基准和 27 次闰秒表，最后一次表项生效于
`2017-01-01T00:00:00Z`。例如 `2026-01-01T00:00:00Z` 转为
`820497669.184` ET。这里实现的是该数据源的时间约定，没有增加天文 TDB 周期修正、
1972 年以前的 UTC 历史修正或自动更新未来闰秒。

Unix 时间不能表示 `23:59:60`。源兼容的 ET → Unix 转换把闰秒 ET 区间折叠到前一个
Unix 秒，因此那个 ET 区间无法通过 Unix 时间无损往返。普通 Unix 毫秒时间可以往返，
误差取决于 JavaScript 双精度数值。所有输入和计算输出都必须有限，溢出抛出 `RangeError`。

`SimulationClock` 的构造函数接收 ET 秒；初始模式为 `paused`、速率为 `1`。

| 操作 | 状态效果 |
| --- | --- |
| `snapshot()` | 返回独立的只读类型记录 `{ timeEt, rate, mode }` |
| `seek(timeEt)` | 替换时间；保留 paused/playback，live 转为 paused |
| `play(rate = 1)` | 进入 playback；支持负速率和零速率 |
| `pause()` | 进入 paused；保留时间和速率 |
| `live(unixMilliseconds)` | 用显式 Unix 样本设置时间，进入 live，速率设为 1 |
| `advance(realSeconds, unixMilliseconds?)` | paused 不动，playback 按速率推进，live 使用显式 Unix 样本 |

`advance` 拒绝负的真实经过秒数；在 live 模式中必须提供 Unix 毫秒样本，允许该样本因
系统时间校正而倒退。模块不读取 `Date.now()`。任何无效命令均在状态变更前拒绝，
包括 playback 计算溢出。`advance` 的可选 Unix 参数若提供，即使不在 live 模式也必须有限。

验证记录：先创建测试并运行 `npx vitest run tests/solar-time.test.ts`，得到预期的
`Cannot find module '../src/solar/domain/time'` 失败；随后实现模块，同命令通过 19 个测试。
测试在隔离 VM 中执行恢复源码的纯 `TimeUtils`，比较全部 27 个闰秒边界，并覆盖普通时间
往返、Unix 闰秒歧义、所有时钟模式、倒放、快照隔离、无效输入和溢出。两个文件也通过
独立 strict TypeScript 检查和 ESLint。
