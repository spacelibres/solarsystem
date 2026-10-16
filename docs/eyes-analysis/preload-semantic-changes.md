# PreloadManager 实际语义整理与缺陷修复

源码：[PreloadManager.js](../../eyes/src/app/PreloadManager.js)。回归：[semantic-preload.node-check.cjs](../../tools/semantic-preload.node-check.cjs)。

此前源码只有结构说明，仍有 46 个短名称绑定；那不足以称为完成语义反混淆。本次直接整理完整类、嵌套回调和单例导出接口，短绑定为零。命名依据是实际 DOM ID、URL 字段、目录访问和回调用途，不声称得到 NASA 未发布的原始变量名。

## 方法与状态契约

| 方法 | 实际职责和约束 |
| --- | --- |
| constructor | 仅首次构建单例；采样触摸/悬停能力，从 hash 内部拆出路由和查询参数，选择普通或嵌入界面并移除另一宿主 |
| `_isEmbed` / `_isInteractPrompt` | 只接受查询值字符串 `true`，保留空值和其他字符串的区别 |
| `_showLoadingScreen` | 建立 wrapper、两层星点、logo、文本和进度条；DOM 所有权属于 loading-screen |
| `_createStarShadows` | 每颗星依次消费三个随机数：横坐标、纵坐标、亮度；保留 parseInt 和随机调用次序 |
| `_showEmbedScreen` | 建立提示图、触摸/鼠标文案、View 3D 按钮和进度样式；标题长于 20 字符时使用 HTML 换行 |
| `showEmbedViewButton` | loading → view；注册 touchend/mouseup，同一回调移除两个监听后进入 interact |
| `showEmbedInteraction` | view → interact；注册 touchstart/mousedown，同一回调移除两个监听并清除 overlay class |
| `_getTitleFromURL` | 从预加载目录识别首页、故事 slide、卫星、望远镜、事件、比较路由，不依赖主应用管理器 |
| `_getNameFromEntityInfo` | 别名优先，其次展示名，最后 IAU 名称 |
| `hideLoadingScreen` | 设置 400ms 淡出，再删除 DOM；不是立即删除 |
| `updateEmbedLoadPercent` | 更新嵌入宿主的 `--load-percent` CSS 自定义属性 |
| `embedLoading` | 宿主不存在时仍返回 undefined；不将其强制转换为 false |

## 逐作用域命名依据

| 原作用域/短名 | 当前名称 | 源码依据 |
| --- | --- | --- |
| constructor `o` | `hashRoute` / `hashQuery` | `#/` 后的字符串以 `?` 拆分，分别供路由与 URLSearchParams 使用 |
| loading `o` | `wrapperElement` | id = loading-screen-wrapper，拥有本界面所有子节点 |
| loading `s` / `e` | `primaryStarsElement` / `secondaryStarsElement` | id = loading-screen-stars1 / stars2 |
| loading `a` | `logoElement` | id = loading-screen-logo |
| loading `r` | `loadingContainerElement` | id = loading-screen-container，拥有文字与进度条 |
| loading `t` / `i` | `loadingTextElement` / `progressBarElement` | 对应 loading-screen-text / loading-screen-bar |
| loading `n` / `m` 与两层循环 `o` | `starShadows` / `starIndex` | 提取成共同生成函数，各自的返回值直接写入对应星层 |
| embed `o` | `wrapperElement` | class = embed-wrapper |
| embed `s` / `e` / `a` | `interactionImage` / `interactionTextElement` / `viewButtonElement` | img、提示 span、View 3D button |
| embed `r` / `t` | `loadingTextElement` / `routeTitle` | loader-text 节点及 `_getTitleFromURL` 返回值 |
| embed `i` / `n` / `m` / `c` | `shouldWrapTitle` / `titleSeparator` / `loadingMessage` / `loaderElement` | 长标题条件、换行符、最终文案及 embed-loader 节点 |
| interaction `o` / `s` | `dismissInteractionPrompt` / `inputEvent` | 防止默认事件、隐藏提示、解除两个输入监听 |
| view `o` / `s` | `enterInteractionPrompt` / `inputEvent` | view 阶段的独立监听函数，不能与上一阶段混名 |
| title 外层 `s/e/a/r/t` | `storyRoutePrefix` / `moonsRouteSuffix` / `telescopeRouteSuffix` / `eventsRouteSuffix` / `compareRouteSuffix` | 分别是五个已存在的路由字符串 |
| story 分支 `o/e/a/r` | `storyId` / `storyInfo` / `slideParameter` / `slideNumber` | stories 索引、目录条目、slide 查询值及去除 slide_ 的编号 |
| moons 分支 `s/a/r/t` | `parentRoute`、`moonRoute` / `moonId` / `moonName` / `parentName` | 父路由、子路由、目录检索与所有格标题 |
| events 分支 `s/e` | `targetRoute`、`eventRoute` / `entityName` | 已知实体但缺少事件 ID 时必须返回 null |
| compare 分支 `s/e` | `primaryEntityName` / `comparisonEntityName` | 当前路由和 id 查询值各自对应的实体名称 |
| 名称查询 `o` / 进度 `o` | `entityId` / `loadPercent` | 字典索引和百分比输入 |
| 模块 `defaultExport` | `preloadInterface` | 导出的是已绑定单例操作的 facade 对象，并非 PreloadManager 构造器 |

## 星层覆盖缺陷

原实现先向 stars1 写入 8 颗星，随后仍向 stars1 写入 24 颗，导致第一层被覆盖、第二层没有阴影。实际 [preload.css](../../eyes/shell/preload.css) 分别将两个节点定义为 2px 和 1px。修复是让两次结果写入各自已创建的节点；没有改变颜色、logo、CSS 或 NASA 媒体地址。

验证顺序：先运行回归，明确得到第一层 `24 !== 8` 的失败；改源码后，8/24 数量、DOM 层级、文案、事件解除、标题十种分支、400ms 删除和可选宿主用例全部通过。真实浏览器加载当前模块并读取 computed style，结果为 stars1=8/2px、stars2=24/1px；截图保存在忽略目录 artifacts/preload-semantic-proof.png。

## 行为边界

这是本次明确的行为修复，因此不能套用“所有执行 AST 不变”的结论。URL 解析、路由标题和交互阶段改用明确控制流表达，分别由回归验证；嵌入提示仍使用 document 级事件监听，未顺带改变点击区域。其他模块的语义进度必须以主文档的实际修改清单为准。
