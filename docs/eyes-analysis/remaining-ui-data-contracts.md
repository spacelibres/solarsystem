# 剩余 UI、样式和数据契约（源代码审阅）

本报告只分析当前恢复树；不把文件枚举、注释清理或模板可解析等同于语义等价验收。`semantic-progress.json` 原有状态需由主审阅流程分别更新。本报告没有运行 NASA 远端应用，也没有复制资源库。

## 范围与证据边界

直接读取全部 55 个 `eyes/src/ui/templates/*.html`、84 个 `eyes/src/styles/extracted/*.js`、`styles/index.js`、4 个 shell 文件与8个 `src/data/*.json`。模板逐项交叉检查实际 import 者及其事件、manager 引用；不是依文件名猜控制器。下表 state/params/DOM key 是模板词法接口，控制器仍可动态创建额外 DOM。控制器的 manager/event 摘录为直接引用（不含继承和动态计算），不能当作完整调用图。

## 模板执行模型

`ui/components/BaseComponent.js` 构造器从传入 options 中取出并删除 `config`、`params`，其余进入 `_state`；`{$x}` 由模板 params 替换，`{{x}}` 注册为状态变量；`key` 建立 `_children`，不是实体 ID。`init` 调用 `htmlWithParamsToElement`、变量收集和事件绑定；`setState` 仅差异更新并触发渲染回调。`_setEventHandlersFromAttributes` 只识别属性名**开头**的 on，将其后转小写并要求同名实例方法；因此 `data-tippy-content` 与 `aria-controls` 不是事件。`__enable/__disable` 对 callback registry 注册/移除订阅并挂载/移除 DOM。重建应使用 React 明确 props、受控 state、effect cleanup 和真正的 button/aria，而非移植 innerHTML 绑定器。

## 逐模板契约（55/55）

### `eyes/src/ui/templates/BreadcrumbTemplate.html`

首页返回与路径上下文。

- 直接 import / 控制器：`eyes/src/ui/components/Breadcrumb.js`。
- 状态插值：`isHomeActiveClass`。params 输入：`title`。
- 模板事件→实例动作：`onclick → _goToHome`。
- DOM key / 动态内容插槽：`static`、`staticLogo`。
- `Breadcrumb.js` 直接服务：`content`、`router`；显式发出：无；额外 DOM/window 监听：`click`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/ButtonsBlockTemplate.html`

内容按钮容器，由控制器动态插入按钮。

- 直接 import / 控制器：`eyes/src/ui/components/ButtonsBlock.js`。
- 状态插值：无。params 输入：`blockTitle`。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：无。
- `ButtonsBlock.js` 直接服务：`content`、`time`；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/CameraViewBlockTemplate.html`

相机视角选项容器。

- 直接 import / 控制器：`eyes/src/ui/components/CameraViewBlock.js`。
- 状态插值：无。params 输入：无。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：`cameraOptions`。
- `CameraViewBlock.js` 直接服务：`camera`、`cameraFollow`、`content`、`router`、`scene`、`trajectory`；显式发出：无；额外 DOM/window 监听：`click`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/CarouselPanelTemplate.html`

可展开卡片面板、分页、选项卡。

- 直接 import / 控制器：`eyes/src/ui/components/CarouselPanel.js`。
- 状态插值：`caption`、`captionClass`、`carouselClass`、`headerIconClass`、`isExpandedClass`、`isVisibleClass`、`nextButtonClass`、`paginationClass`、`panelTypeClass`、`preTitle`、`prevButtonClass`、`tabNumClass`、`tabsVisibleClass`、`title`。params 输入：无。
- 模板事件→实例动作：`onclick → expand`、`onclick → collapse`。
- DOM key / 动态内容插槽：`content`、`tabsContainer`、`swiperSlides`、`bullets`。
- `CarouselPanel.js` 直接服务：`layer`；显式发出：`expandtoggle`、`visiblechange`；额外 DOM/window 监听：`click`、`mousemove`、`mouseup`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/CarouselTemplate-390.html`

故事轮播外壳/前后重播折叠控件；390 与391是同一组件的不同局部。

- 直接 import / 控制器：`eyes/src/ui/components/Carousel.js`。
- 状态插值：`closeButtonText`、`collapseClass`、`isCloseButtonVisibleClass`、`isScrollingClass`、`isVisibleClass`、`slideType`。params 输入：无。
- 模板事件→实例动作：`onclick → close`。
- DOM key / 动态内容插槽：`progress`、`carousel`、`track`。
- `Carousel.js` 直接服务：`router`、`spout`；显式发出：`expandtoggle`、`slidechange`；额外 DOM/window 监听：`keydown`、`touchend`、`touchmove`、`touchstart`、`transitionend`、`transitionstart`、`wheel`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/CarouselTemplate-391.html`

故事轮播外壳/前后重播折叠控件；390 与391是同一组件的不同局部。

- 直接 import / 控制器：`eyes/src/ui/components/Carousel.js`。
- 状态插值：`collapseButtonClass`、`collapseClass`、`isControlsVisibleClass`。params 输入：`hintText`、`nextButtonIcon`、`nextButtonText`、`replayButtonIcon`、`replayButtonText`、`type`。
- 模板事件→实例动作：`onclick → goToPrevSlide`、`onclick → goToNextSlide`、`onclick → _onControlsToggle`、`onclick → _toggleCollapse`、`onclick → goToFirstSlide`、`onclick → goToNextSlide`、`onclick → goToFirstSlide`、`onclick → _toggleCollapse`。
- DOM key / 动态内容插槽：无。
- `Carousel.js` 直接服务：`router`、`spout`；显式发出：`expandtoggle`、`slidechange`；额外 DOM/window 监听：`keydown`、`touchend`、`touchmove`、`touchstart`、`transitionend`、`transitionstart`、`wheel`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/CheckboxBlockTemplate.html`

复选框分组标题与子项。

- 直接 import / 控制器：`eyes/src/ui/components/CheckboxBlock.js`。
- 状态插值：无。params 输入：`checkboxBlockTitle`。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：无。
- `CheckboxBlock.js` 直接服务：无；显式发出：无；额外 DOM/window 监听：`change`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/CheckboxMultistateTemplate.html`

二态/多态复选框展示，共用模板由两个类控制。

- 直接 import / 控制器：`eyes/src/ui/components/Checkbox.js`、`eyes/src/ui/components/CheckboxMultistate.js`。
- 状态插值：`checkboxClass`、`iconCheckmarkClass`、`isCheckedClass`、`text`、`textClass`。params 输入：无。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：`icon`、`text`。
- `Checkbox.js` 直接服务：无；显式发出：无；额外 DOM/window 监听：`click`。
- `CheckboxMultistate.js` 直接服务：无；显式发出：无；额外 DOM/window 监听：`click`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/ClockShortcutTemplate.html`

实时复位与事件重播快捷入口。

- 直接 import / 控制器：`eyes/src/ui/components/ClockShortcut.js`。
- 状态插值：`isVisibleClass`、`liveClass`、`liveContainerClass`、`liveIcon`、`liveText`、`replayClass`、`replayIcon`。params 输入：无。
- 模板事件→实例动作：`onclick → _replay`、`onclick → backToLive`。
- DOM key / 动态内容插槽：`replayContainer`、`iconReplay`、`replay`、`liveContainer`、`iconLive`、`live`。
- `ClockShortcut.js` 直接服务：`router`、`time`；显式发出：无；额外 DOM/window 监听：`mouseenter`、`mouseleave`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/ClockTemplate.html`

可编辑时钟、日期与时区显示。

- 直接 import / 控制器：`eyes/src/ui/components/Clock.js`。
- 状态插值：`alert`、`date`、`isDateVisibleClass`、`isMeridiemVisibleClass`、`isTimeVisibleClass`、`isVisibleClass`、`meridiem`、`time`。params 输入：无。
- 模板事件→实例动作：`onclick → onDateTimeClick`、`onclick → onDateTimeClick`、`onclick → onDateTimeClick`。
- DOM key / 动态内容插槽：`displayContainer`、`date`、`time`、`meridiem`、`timeForm`、`timeInput`。
- `Clock.js` 直接服务：`router`、`time`；显式发出：无；额外 DOM/window 监听：`blur`、`keydown`、`keyup`、`submit`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/CollapsibleMenuItemTemplate.html`

单个可折叠子菜单。

- 直接 import / 控制器：`eyes/src/ui/components/CollapsibleMenuItem.js`。
- 状态插值：`collapseBtnVisibleClass`、`expandedClass`、`isVisibleClass`、`itemTitle`。params 输入：无。
- 模板事件→实例动作：`onclick → onCollapseClick`、`onclick → onToggleClick`。
- DOM key / 动态内容插槽：`componentContainer`、`collapseButton`、`toggleButton`。
- `CollapsibleMenuItem.js` 直接服务：无；显式发出：`expandtoggle`；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/CollapsibleMenuTemplate.html`

菜单集合容器。

- 直接 import / 控制器：`eyes/src/ui/components/CollapsibleMenu.js`。
- 状态插值：`expandedMenusClass`、`isVisibleClass`、`numMenusClass`。params 输入：无。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：无。
- `CollapsibleMenu.js` 直接服务：`router`；显式发出：`expandtoggle`；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/ComparisonTemplate.html`

两对象尺寸比较，前后选择与退出。

- 直接 import / 控制器：`eyes/src/ui/components/Comparison.js`。
- 状态插值：`altFontSizeClass`、`fontSizeClass`、`isVisibleClass`、`leftCategory`、`leftGenericDisclaimerClass`、`leftIdentifier`、`leftRadius`、`leftTitle`、`leftType`、`leftValueClass`、`rightCategory`、`rightGenericDisclaimerClass`、`rightIdentifier`、`rightRadius`、`rightTitle`、`rightType`、`rightUnit`、`rightValueClass`、`unit`。params 输入：无。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：`left`、`right`、`previous`、`next`、`exit`、`exitIcon`。
- `Comparison.js` 直接服务：`comparison`、`content`、`router`；显式发出：无；额外 DOM/window 监听：`click`、`mouseenter`、`mouseleave`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/ContentPanelTemplate.html`

信息/工具箱/视图选项卡，移动端拖动展开。

- 直接 import / 控制器：`eyes/src/ui/components/ContentPanel.js`。
- 状态插值：`desktopIconName`、`iconCollapseClass`、`iconExpandClass`、`infoTabVisibleClass`、`isCollapsedClass`、`isExpandedClass`、`isOverlayClass`、`isVisibleClass`、`subtabsVisible`、`tabsVisible`、`toolboxTabVisibleClass`、`viewOptionsSelectedClass`、`viewOptionsTabVisibleClass`。params 输入：无。
- 模板事件→实例动作：`onclick → onClickShowCollapse`、`ontouchstart → onDragStart`、`ontouchmove → onDrag`、`ontouchend → onDragEnd`、`onclick → expand`、`onclick → collapse`、`onclick → _onTabSelect`、`onclick → _onTabSelect`、`onclick → _onTabSelect`。
- DOM key / 动态内容插槽：`desktopCollapseExpandButton`、`tabGroup`、`dragHandle`、`expandButton`、`collapseButton`、`subTabNav`、`infoTab`、`toolboxTab`、`viewOptionsTab`、`infoPanel`、`toolboxPanel`、`viewOptionsPanel`。
- `ContentPanel.js` 直接服务：`content`、`layer`、`router`、`scene`、`time`；显式发出：`expandtoggle`；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/DescriptionBlockTemplate-1006.html`

描述与展开更多；两个版本不可互换。

- 直接 import / 控制器：`eyes/src/ui/components/DescriptionBlock-1005.js`。
- 状态插值：`blurbDescription`、`isButtonVisible`、`isExpanded`、`isMoreVisible`、`moreDescription`、`readMsg`、`showTitleLabel`。params 输入：无。
- 模板事件→实例动作：`onclick → onClickReadMore`。
- DOM key / 动态内容插槽：`copyContainer`、`moreContainer`、`moreCopy`。
- `DescriptionBlock-1005.js` 直接服务：`content`、`router`；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/DescriptionBlockTemplate-542.html`

描述与展开更多；两个版本不可互换。

- 直接 import / 控制器：`eyes/src/ui/components/DescriptionBlock-541.js`。
- 状态插值：`hasMoreClass`、`moreClass`、`moreIcon`、`moreMessage`。params 输入：`description`、`more`、`subtitle`、`title`。
- 模板事件→实例动作：`onclick → toggleMore`。
- DOM key / 动态内容插槽：`header`、`body`、`footer`。
- `DescriptionBlock-541.js` 直接服务：无；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/DistancePanelTemplate.html`

来源/目标搜索、交换、测量点、距离/光行时/相对速度。

- 直接 import / 控制器：`eyes/src/ui/components/DistancePanel.js`。
- 状态插值：`canMinimizeClass`、`currDraggingClass`、`dotPosClass`、`fromText`、`isDraggableClass`、`isExpandedClass`、`isLoadingClass`、`isMinimizedClass`、`isSearchingClass`、`isVisibleClass`、`lightTimeText`、`lightTimeVisibleClass`、`maxMinBtnPosition`、`maxMinIconClass`、`relVelocityClass`、`relVelocityText`、`relVelocityUnit`、`resultText`、`resultTextClass`、`resultUnit`、`showSourceMPToggleClass`、`showTargetMPToggleClass`、`sourceMpClass`、`swapIsVisibleClass`、`swapOffsetClass`、`targetMpClass`、`toText`、`touchActiveClass`。params 输入：无。
- 模板事件→实例动作：`onclick → onContainerClick`、`onclick → exit`、`onclick → toggleSourceMP`、`onclick → onSwapClick`、`onclick → toggleTargetMP`、`onclick → toggleSourceMP`、`onclick → toggleTargetMP`、`onclick → onLineClick`、`onclick → onResultClick`、`onclick → toggleUnitSystem`、`onclick → toggleUnitSystem`、`onclick → toggleIsMinimized`。
- DOM key / 动态内容插槽：`dragArea`、`dpTitle`、`dpCloseButton`、`sourceSearchContainer`、`targetSearchContainer`、`lineGraphic`、`maxMinButton`。
- `DistancePanel.js` 直接服务：`distance`、`router`；显式发出：无；额外 DOM/window 监听：`mousedown`、`mouseenter`、`mouseleave`、`mousemove`、`mouseup`、`touchend`、`touchmove`、`touchstart`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/EventsBlockTemplate.html`

事件表与时间线切换、标题/年份/目标排序。

- 直接 import / 控制器：`eyes/src/ui/components/EventsBlock.js`、`eyes/src/ui/components/FeaturedEventsBlock.js`。
- 状态插值：`introLabelText`、`isEventsViewContainerVisible`、`isIntroLabelVisible`、`isLoadingClass`、`isNumEventsVisible`、`isViewToggleVisible`、`numEvents`。params 输入：无。
- 模板事件→实例动作：`onclick → _onTabSelect`、`onclick → _onTabSelect`、`onclick → sortEventsByTitle`、`onclick → sortEventsByYear`、`onclick → sortEventsByTarget`。
- DOM key / 动态内容插槽：`toggleContainer`、`timelineContainer`、`tableContainer`、`table`、`eventsTable`。
- `EventsBlock.js` 直接服务：`content`、`router`、`time`；显式发出：无；额外 DOM/window 监听：无。
- `FeaturedEventsBlock.js` 直接服务：`content`、`router`；显式发出：无；额外 DOM/window 监听：`click`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/EventsTimelineTemplate.html`

事件时间轴，聚类缩放、焦点卡、指针和触摸操作。

- 直接 import / 控制器：`eyes/src/ui/components/EventsTimeline.js`。
- 状态插值：`focusContentVisibleClass`、`fpArrowVisible`、`fpEventName`、`fpEventTime`、`fpTargetLineVisibleClass`、`fpViewingLineVisibleClass`、`fpVisibleClass`、`isVisibleClass`、`resetZoomVisibleClass`、`targetDateColorClass`、`targetDateVisibleClass`、`targetLineVisibleClass`、`viewingLineVisibleClass`。params 输入：无。
- 模板事件→实例动作：`onmouseenter → _onFpMouseEnter`、`onmouseleave → _onFpMouseLeaveDebounced`、`onwheel → _onFpWheel`、`onclick → _onFpArrowClick`、`ontouchstart → _onFpTouchStart`、`ontouchmove → _onFpTouchMoveThrottled`、`ontouchend → _onFpTouchEnd`、`ontouchstart → _onFpTicksTouchStart`、`ontouchmove → _onFpTicksTouchMove`、`ontouchend → _onFpTicksTouchEnd`、`onmouseenter → _onFpTicksMouseEnter`、`onmousemove → _onFpTicksMouseMove`、`onmouseleave → _onFpTicksMouseLeave`、`onclick → _onFpTicksClick`、`onclick → _onFpArrowClick`、`ontouchstart → _onTimelineTouchStart`、`ontouchmove → _onTimelineTouchMove`、`ontouchend → _onTimelineTouchEnd`、`onmousemove → _onTimelineMouseMove`、`onmouseleave → _onTimelineMouseLeaveDebounced`、`onclick → _onTimelineClick`、`ontouchstart → _onDateTouchStart`、`ontouchend → _onDateTouchEnd`、`onclick → _zoomOutOfCluster`。
- DOM key / 动态内容插槽：`focusPanel`、`fpMask`、`fpDetails`、`fpTicksContainer`、`fpLine`、`fpTicks`、`timelinebar`、`eventContainer`、`fpContent`、`markerContainer`、`rangeDateStart`、`rangeDateEnd`。
- `EventsTimeline.js` 直接服务：`router`、`scene`、`time`；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/ExplorationBlockTemplate.html`

探索任务链接与更多条目。

- 直接 import / 控制器：`eyes/src/ui/components/ExplorationBlock.js`。
- 状态插值：`colorClass`、`hideMoreMessage`、`moreIcon`、`moreMessage`。params 输入：无。
- 模板事件→实例动作：`onclick → toggleMore`。
- DOM key / 动态内容插槽：`explorationList`。
- `ExplorationBlock.js` 直接服务：`content`、`router`；显式发出：无；额外 DOM/window 监听：`click`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/FeaturedEventsBlockTemplate.html`

精选事件列表与更多条目。

- 直接 import / 控制器：`eyes/src/ui/components/FeaturedEventsBlock.js`。
- 状态插值：`colorClass`、`hideMoreMessage`、`moreIcon`、`moreMessage`。params 输入：无。
- 模板事件→实例动作：`onclick → toggleMore`。
- DOM key / 动态内容插槽：`featuredEventsList`。
- `FeaturedEventsBlock.js` 直接服务：`content`、`router`；显式发出：无；额外 DOM/window 监听：`click`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/FeaturedMoonsBlockTemplate.html`

精选卫星列表与更多条目。

- 直接 import / 控制器：`eyes/src/ui/components/FeaturedMoonsBlock.js`。
- 状态插值：`hideMoreMessage`、`moreIcon`、`moreMessage`、`showTitleLabel`。params 输入：无。
- 模板事件→实例动作：`onclick → toggleMore`。
- DOM key / 动态内容插槽：`featuredMoonsList`。
- `FeaturedMoonsBlock.js` 直接服务：`router`；显式发出：无；额外 DOM/window 监听：`click`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/FeaturedStoriesPanelTemplate.html`

精选故事面板展开收起。

- 直接 import / 控制器：`eyes/src/ui/components/FeaturedStoriesPanel.js`。
- 状态插值：`desktopIconName`、`isOpenButtonClass`、`isOpenTitleClass`、`isOverlayClass`、`isVisibleClass`、`mobileIconName`。params 输入：无。
- 模板事件→实例动作：`onclick → onClickShowCollapse`、`onclick → onClickShowCollapse`。
- DOM key / 动态内容插槽：`expandToggleBtn`。
- `FeaturedStoriesPanel.js` 直接服务：`layer`、`router`；显式发出：`overlay`；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/FeaturedStoryBlockTemplate.html`

故事卡片列表动态装配。

- 直接 import / 控制器：`eyes/src/ui/components/FeaturedStoryBlock.js`。
- 状态插值：`blockTitle`、`colorClass`、`hideTitle`。params 输入：无。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：`storyBlock`、`storyList`。
- `FeaturedStoryBlock.js` 直接服务：`content`、`router`；显式发出：无；额外 DOM/window 监听：`click`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/FeaturesBlockTemplate.html`

功能入口列表，由 SpecialFeatures 复用。

- 直接 import / 控制器：`eyes/src/ui/components/FeaturesBlock.js`、`eyes/src/ui/components/SpecialFeaturesBlock.js`。
- 状态插值：`showFeatures`。params 输入：无。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：`featuresBlock`、`featuresList`。
- `FeaturesBlock.js` 直接服务：`content`、`layer`、`scene`；显式发出：无；额外 DOM/window 监听：无。
- `SpecialFeaturesBlock.js` 直接服务：`content`、`router`；显式发出：无；额外 DOM/window 监听：`click`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/HintBlockTemplate.html`

提示文字与前后图标。

- 直接 import / 控制器：`eyes/src/ui/components/HintBlock.js`。
- 状态插值：`iconAfter`、`iconBefore`、`isIconAfterVisibleClass`、`isIconBeforeVisibleClass`、`text`。params 输入：`class`。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：无。
- `HintBlock.js` 直接服务：无；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/ImageBlockTemplate.html`

运行时图片 URL/alt/title；不复制媒体。

- 直接 import / 控制器：`eyes/src/ui/components/ImageBlock.js`。
- 状态插值：无。params 输入：`alt`、`className`、`src`、`title`。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：无。
- `ImageBlock.js` 直接服务：无；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/InfoPanelTemplate.html`

全局信息面板挂载点。

- 直接 import / 控制器：`eyes/src/ui/components/InfoPanel.js`。
- 状态插值：`isVisibleClass`。params 输入：无。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：`infoPanel`。
- `InfoPanel.js` 直接服务：无；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/InstrumentFOVBlockTemplate.html`

航天器仪器视场选项。

- 直接 import / 控制器：`eyes/src/ui/components/InstrumentFOVBlock.js`。
- 状态插值：无。params 输入：无。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：`instrumentFOVBlock`、`instrumentsList`。
- `InstrumentFOVBlock.js` 直接服务：无；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/KioskBaseTemplate.html`

无人值守会话倒计时、继续/重新开始、自动播放。

- 直接 import / 控制器：`eyes/src/ui/components/KioskBase.js`。
- 状态插值：`autoplayVisibleClass`、`continueButtonVisibleClass`、`forceRestartClass`、`isKioskCountdownClass`、`isVisibleClass`、`loadingTextVisibleClass`、`sessionEndVisibleClass`、`sessionTimerVisibleClass`。params 输入：无。
- 模板事件→实例动作：`onclick → onWindowInteract`、`ontouchstart → onWindowInteract`、`onclick → sessionStartOverButtonClick`、`ontouchstart → sessionStartOverButtonClick`。
- DOM key / 动态内容插槽：`kioskContainer`、`kioskLoadingText`、`kioskSessionEnd`、`sessionEndButtons`、`kioskStartOverBtn`、`kioskContinueBtn`、`kioskAutoplay`、`kioskSessionTimer`。
- `KioskBase.js` 直接服务：`camera`、`layer`、`router`；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/LayerPanelTemplate.html`

全局图层选项与关闭。

- 直接 import / 控制器：`eyes/src/ui/components/LayerPanel.js`。
- 状态插值：`isVisibleClass`。params 输入：无。
- 模板事件→实例动作：`onclick → hide`。
- DOM key / 动态内容插槽：`layerPanelBody`。
- `LayerPanel.js` 直接服务：`layer`；显式发出：无；额外 DOM/window 监听：`click`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/LayersBlockTemplate.html`

实体上下文图层选项。

- 直接 import / 控制器：`eyes/src/ui/components/LayersBlock.js`。
- 状态插值：`showContextualLayers`。params 输入：无。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：`layersBlock`、`layersList`。
- `LayersBlock.js` 直接服务：`content`、`layer`、`router`；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/LoadIconTemplate.html`

异步加载可见状态。

- 直接 import / 控制器：`eyes/src/ui/components/LoadIcon.js`。
- 状态插值：`isVisibleClass`。params 输入：无。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：无。
- `LoadIcon.js` 直接服务：`scene`；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/MenuTemplate.html`

菜单入口与链接容器。

- 直接 import / 控制器：`eyes/src/ui/components/CollapsibleMenu.js`、`eyes/src/ui/components/Menu.js`。
- 状态插值：`brandingText`、`isVisibleClass`、`menuClass`、`menuText`、`titleText`。params 输入：无。
- 模板事件→实例动作：`onclick → toggle`、`onclick → hide`、`onclick → hide`、`onclick → hide`、`onclick → hide`。
- DOM key / 动态内容插槽：`container`、`header`、`branding`、`contentWrapper`、`mainMenu`。
- `CollapsibleMenu.js` 直接服务：`router`；显式发出：`expandtoggle`；额外 DOM/window 监听：无。
- `Menu.js` 直接服务：`content`、`router`；显式发出：无；额外 DOM/window 监听：`click`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/MobileExpandButtonTemplate.html`

移动内容面板展开入口。

- 直接 import / 控制器：`eyes/src/ui/components/MobileExpandButton.js`。
- 状态插值：`isVisibleClass`。params 输入：无。
- 模板事件→实例动作：`onclick → _expandButtonClicked`。
- DOM key / 动态内容插槽：`mobileExpandButton`。
- `MobileExpandButton.js` 直接服务：无；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/OverlayTemplate.html`

遮罩及子内容插槽，TutorialOverlay也复用。

- 直接 import / 控制器：`eyes/src/ui/components/Overlay.js`、`eyes/src/ui/components/TutorialOverlay.js`。
- 状态插值：`isOpenButtonVisibleClass`、`isVisibleClass`。params 输入：无。
- 模板事件→实例动作：`onclick → show`、`onclick → hide`。
- DOM key / 动态内容插槽：`overlay`、`overlayContent`。
- `Overlay.js` 直接服务：无；显式发出：无；额外 DOM/window 监听：`animationend`、`click`。
- `TutorialOverlay.js` 直接服务：`content`、`layer`、`router`；显式发出：无；额外 DOM/window 监听：`click`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/OverviewBlockTemplate.html`

实体类别/形状/任务日期/免责声明与返回。

- 直接 import / 控制器：`eyes/src/ui/components/OverviewBlock.js`。
- 状态插值：`category`、`disclaimerClass`、`disclaimerMessage`、`isBackButtonVisible`、`isCategoryVisibleClass`、`isDateVisible`、`isShapeVisibleClass`、`missionDates`、`shapeColor`、`shapeType`、`title`。params 输入：无。
- 模板事件→实例动作：`onclick → goBack`。
- DOM key / 动态内容插槽：`overviewTitle`。
- `OverviewBlock.js` 直接服务：`content`、`router`、`scene`、`time`；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/RelatedBlockTemplate.html`

相关链接与故事卡。

- 直接 import / 控制器：`eyes/src/ui/components/RelatedBlock.js`。
- 状态插值：`showTitleLabel`。params 输入：无。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：`relatedBlock`、`storyBlock`、`storyList`、`relatedList`。
- `RelatedBlock.js` 直接服务：`camera`、`content`、`router`；显式发出：无；额外 DOM/window 监听：`click`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/ReplayBlockTemplate.html`

事件前后切换与播放暂停。

- 直接 import / 控制器：`eyes/src/ui/components/ReplayBlock.js`。
- 状态插值：`dateText`、`hideNextEventButton`、`isNextBtnActive`、`isPrevBtnActive`、`playIconClass`。params 输入：无。
- 模板事件→实例动作：`onclick → prevButtonClicked`、`onclick → playPauseEvent`、`onclick → nextButtonClicked`。
- DOM key / 动态内容插槽：`clockContainer`。
- `ReplayBlock.js` 直接服务：`content`、`time`；显式发出：无；额外 DOM/window 监听：`input`、`mouseup`、`touchend`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/ReplayButtonBlockTemplate.html`

进入事件重播。

- 直接 import / 控制器：`eyes/src/ui/components/ReplayButtonBlock.js`。
- 状态插值：无。params 输入：`text`。
- 模板事件→实例动作：`onclick → onClick`。
- DOM key / 动态内容插槽：无。
- `ReplayButtonBlock.js` 直接服务：`router`；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/SearchTemplate.html`

异步搜索、建议、详情与路由选择。

- 直接 import / 控制器：`eyes/src/ui/components/Search.js`。
- 状态插值：`allowFeaturedClass`、`allowInfoClass`、`focusedClass`、`isFeaturedVisibleClass`、`isVisibleClass`、`magClass`、`searchClass`、`searchInfo`。params 输入：`placeholderText`。
- 模板事件→实例动作：`onclick → onIconClick`、`onclick → reset`、`oninput → _find`、`onfocus → onInputFocus`、`onkeydown → keydown`、`onclick → reset`。
- DOM key / 动态内容插槽：`container`、`input`、`results`、`featured`。
- `Search.js` 直接服务：`content`、`router`、`search`；显式发出：`resultselected`；额外 DOM/window 监听：`click`、`mouseover`、`setupSearch`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/SettingsTemplate.html`

信息/图层/单位/摄影模式/缩放/光照/引导相机/全屏。

- 直接 import / 控制器：`eyes/src/ui/components/Settings.js`。
- 状态插值：`allowFullscreenClass`、`allowGuidedCameraClass`、`allowInfoPanelClass`、`allowLayersClass`、`allowLightingClass`、`allowPhotoModeClass`、`allowToggleUnitClass`、`allowZoomClass`、`containerClass`、`fullscreenClass`、`guidedClass`、`infoButton`、`isCollapsibleClass`、`isVisibleClass`、`lightClass`、`orientationClass`、`photoModeClass`、`showLightingOptionsClass`、`unitButton`。params 输入：无。
- 模板事件→实例动作：`onclick → toggleInfoPanel`、`onclick → toggleLayers`、`onclick → toggleUnit`、`onclick → togglePhotoMode`、`onclick → toggleLight`、`onclick → toggleGuidedCamera`、`onclick → toggleFullscreen`、`onclick → toggleCollapse`。
- DOM key / 动态内容插槽：`container`、`content`、`zoomInButton`、`zoomOutButton`、`lightToggle`、`lightOptions`、`flood`、`shadow`、`natural`。
- `Settings.js` 直接服务：`camera`、`comparison`、`router`、`time`；显式发出：`expandtoggle`、`guidedcamerachange`、`photomodechange`、`unitchange`；额外 DOM/window 监听：`mousedown`、`mouseleave`、`mouseup`、`touchend`、`touchmove`、`touchstart`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/ShareModalTemplate.html`

链接与iframe嵌入代码、预览与剪贴板。

- 直接 import / 控制器：`eyes/src/ui/components/ShareModal.js`。
- 状态插值：`isVisibleClass`、`linkTitle`、`previewDevice`、`previewVisibleClass`。params 输入：无。
- 模板事件→实例动作：`onclick → handleClick`、`onclick → handleTabClick`、`onclick → copyToClipboard`、`onchange → toggleIframeElements`、`onclick → copyToClipboard`。
- DOM key / 动态内容插槽：`tabHeaders`、`closeButton`、`tabContent`、`linkContainer`、`linkImage`、`linkCode`、`embedContainer`、`embedPreviewParent`、`embedCode`、`embedOptsContent`、`embedAdvOptsContent`、`copiedOverlay`。
- `ShareModal.js` 直接服务：`router`、`title`；显式发出：无；额外 DOM/window 监听：`change`、`click`、`load`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/SolarSystemAppTemplate.html`

应用组合根与具名组件占位符。

- 直接 import / 控制器：`eyes/src/app/SolarSystemApp.js`。
- 状态插值：无。params 输入：无。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：无。
- `SolarSystemApp.js` 直接服务：`content`、`layer`、`router`、`search`；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/SpecialFeaturesBlockTemplate.html`

分类特殊功能容器。

- 直接 import / 控制器：`eyes/src/ui/components/SpecialFeaturesBlock.js`。
- 状态插值：`category`。params 输入：无。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：`specialFeatures`。
- `SpecialFeaturesBlock.js` 直接服务：`content`、`router`；显式发出：无；额外 DOM/window 监听：`click`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/SurfaceMapBlockTemplate.html`

表面地图选项。

- 直接 import / 控制器：`eyes/src/ui/components/SurfaceMapBlock.js`。
- 状态插值：`showSubtitle`、`showSurfaceMaps`。params 输入：无。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：`surfaceMapBlock`、`surfaceMapList`。
- `SurfaceMapBlock.js` 直接服务：`content`、`layer`、`router`、`scene`；显式发出：无；额外 DOM/window 监听：`click`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/TelescopeTemplate.html`

经纬度编辑、方位/仰角、地面/空中与星座切换。

- 直接 import / 控制器：`eyes/src/ui/components/Telescope.js`。
- 状态插值：`airClass`、`azimuth`、`constellationsClass`、`elevation`、`formattedLatitude`、`formattedLongitude`、`inputTipVisibleClass`、`latitudeTitle`、`longitudeTitle`、`surfaceClass`。params 输入：无。
- 模板事件→实例动作：`onclick → showCoordinateInputTip`、`ontouch → showCoordinateInputTip`、`oninput → latitudeInputChange`、`oninput → longitudeInputChange`、`onclick → goSurfaceViewClick`、`onclick → exitTelescope`、`onclick → exitSurfaceMode`、`onclick → toggleConstellation`、`onclick → exitSurfaceMode`。
- DOM key / 动态内容插槽：`coordinateTipPopup`、`coordinateInfo`、`latitude`、`longitude`、`constellationToggleButton`、`tapHint`。
- `Telescope.js` 直接服务：`content`、`label`、`layer`、`router`、`scene`、`selection`；显式发出：无；额外 DOM/window 监听：`mousedown`、`mouseup`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/TextureQualityBlockTemplate.html`

纹理质量选项。

- 直接 import / 控制器：`eyes/src/ui/components/TextureQualityBlock.js`。
- 状态插值：无。params 输入：无。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：`textureQualityBlock`、`optionsList`。
- `TextureQualityBlock.js` 直接服务：`router`、`scene`；显式发出：无；额外 DOM/window 监听：`click`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/TimeControllerTemplate.html`

旧 TimeController 播放/速率接口，区别于 TimeControls。

- 直接 import / 控制器：`eyes/src/engine/controllers/TimeController.js`。
- 状态插值：`isVisibleClass`、`playClass`、`rateDisplay`。params 输入：无。
- 模板事件→实例动作：`onclick → togglePlayPause`、`onclick → decreaseRate`、`onclick → increaseRate`。
- DOM key / 动态内容插槽：`toggleBtn`、`label`、`decreaseBtn`、`decreaseContainer`、`increaseBtn`、`increaseContainer`、`rateDisplay`。
- `TimeController.js` 直接服务：`router`、`time`；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/TimeControlsTemplate.html`

仿真速率滑块、暂停恢复、实时速度及日期显示。

- 直接 import / 控制器：`eyes/src/ui/components/TimeControls.js`。
- 状态插值：`dateValue`、`isLiveClass`、`isPlayingClass`、`isRateControlsVisible`、`isVisibleClass`、`playIconClass`、`rateDisplay`、`realTimeBtnClass`、`timeValue`、`touchActiveClass`。params 输入：无。
- 模板事件→实例动作：`onclick → decreaseRate`、`onclick → playPauseRate`、`onclick → increaseRate`、`onclick → onRealtimeClick`。
- DOM key / 动态内容插槽：无。
- `TimeControls.js` 直接服务：`router`、`time`；显式发出：无；额外 DOM/window 监听：`click`、`input`、`touchend`、`touchstart`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/TitleBlockTemplate.html`

标题与副标题。

- 直接 import / 控制器：`eyes/src/ui/components/TitleBlock.js`。
- 状态插值：无。params 输入：`subtitle`、`title`。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：无。
- `TitleBlock.js` 直接服务：无；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/ToastTemplate.html`

错误/提示消息与关闭。

- 直接 import / 控制器：`eyes/src/ui/components/Toast.js`。
- 状态插值：`errorClass`、`iconClass`、`isVisibleClass`、`toastContent`。params 输入：无。
- 模板事件→实例动作：`onclick → hide`。
- DOM key / 动态内容插槽：`toastContent`。
- `Toast.js` 直接服务：无；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/ToggleBlockTemplate.html`

文字选择态，点击由控制器绑定。

- 直接 import / 控制器：`eyes/src/ui/components/ToggleBlock.js`。
- 状态插值：`isSelectedClass`。params 输入：`text`。
- 模板事件→实例动作：无。
- DOM key / 动态内容插槽：无。
- `ToggleBlock.js` 直接服务：无；显式发出：无；额外 DOM/window 监听：无。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/ToolboxBlockTemplate.html`

工具路由入口与桌面/触摸提示。

- 直接 import / 控制器：`eyes/src/ui/components/ToolboxBlock.js`。
- 状态插值：`iconClass`、`inputTipVisibleClass`、`isVisibleClass`、`title`、`tooltipText`。params 输入：无。
- 模板事件→实例动作：`onclick → _showTooltip`、`ontouch → _showTooltip`、`onclick → _closeTooltip`、`ontouchstart → _closeTooltip`。
- DOM key / 动态内容插槽：`toolboxBlock`、`clickableDiv`、`tooltipIcon`、`goButton`、`tooltipPopup`。
- `ToolboxBlock.js` 直接服务：`router`；显式发出：无；额外 DOM/window 监听：`click`、`contentPanelCollapse`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

### `eyes/src/ui/templates/TutorialOverlayTemplate.html`

教程轮播与关闭。

- 直接 import / 控制器：`eyes/src/ui/components/TutorialOverlay.js`。
- 状态插值：`carouselClass`、`dismissText`、`isVisibleClass`、`slideClass`。params 输入：无。
- 模板事件→实例动作：`onclick → close`。
- DOM key / 动态内容插槽：`swiperSlides`、`bullets`。
- `TutorialOverlay.js` 直接服务：`content`、`layer`、`router`；显式发出：无；额外 DOM/window 监听：`click`。
- 重建落点：将上述输入映射为组件 props，动作交给独立控制服务；模板中仅占位的列表由该控制器动态生成，不能以静态 HTML 空列表判定无功能。

## 核心交互必须保持的行为

- 导航：`app/config/components.js` 注册的具名实例不同于类名；同一个 Clock 和 Search 有多个实例。`ViewInfo.json` 决定各视图启用集，`app/config/views.js` 将 class 字符串映射到实际构造器。`SolarSystemAppTemplate` 只提供默认插槽，`hasPlaceholder:false` 的实例由代码装配；不能只迁移 root HTML。`ToolboxBlock.onRouteChange` 保存 `[query, /${entityId}${link}, options]`，点击后 `router.navigate(...nav)`；默认 `__remove:all` 与 Search 的 `keepTime:true` 不同。新路由必须显式定义合并/移除 query 及返回栈。

- 搜索：`Search.js` 100 ms 防抖；`nameSearch/nameDisplay` 字段有顺序；score < 0.05 进入结果，其余建议受 maxSuggestions 限制；可 stopOnExactMatch；排除 ID 在渲染前过滤；单结果允许异步详情，404 退回列表。鼠标 hover 与 ArrowUp/Down/Enter 共用 selection index；Escape 清空收起。详情中的故事、事件、探索、卫星加入同一键盘导航序列。选中先 reset，再发 resultselected；事件路由清全部 query，其余默认保持时间。异步搜索重建需增加请求代际/取消，避免旧结果覆盖新请求（当前源码没有证明竞态已解决）。

- 时间：`TimeControls.js` 监听 time 的 ratechange/update，写 router query 的节流 200 ms、绘图节流50 ms。22档基点 `[-94608000,-31536000,-6048000,-604800,-86400,-36000,-3600,-600,-60,-10,-1,1,10,60,600,3600,36000,86400,604800,6048000,31536000,94608000]` 单位为仿真秒/真实秒；滑块 0..100 插值，反向不跨入 (-1,0)。暂停记忆恢复速率，时间上下限限制方向。yr=31536000、mth=2592000 是显示近似，不是历法月/年。Clock 解析输入后由 time manager 生成 URL；UTC/本地显示状态与 epoch 分开。ClockShortcut 的 backToLive 必须返回现在和1倍速；仅正在播放不代表 LIVE。TimeControllerTemplate 属另一 controller 接口，不应并行挂两个独立时钟。

- 图层：全局配置分为 ui；planets/asteroids/comets/dwarfPlanets/constellations；spacecraft；trails/orbits/labels/icons。`LayersBlock` 增加 parentId/satelliteGroup 上下文的 majorMoons/minorMoons/orbiters/landers/satelliteGroup/heliosphere；majorMoons 文本计算还更新 minorMoons 数量。主 spacecraft 和子项同步，query 与默认层优先级应显式建模。不能将5个布尔开关当完整图层系统。

- 工具：CameraViewBlock/InstrumentFOVBlock/SurfaceMapBlock/TextureQualityBlock 通过 options 工厂动态生成条目；ToolboxBlock 导航到 compare/distance/telescope 等视图。Comparison 独立两侧实体、类别候选、单位转换与相机；DistancePanel 独立 source/target、测量点、交换、相对速度、光行时、最小化/拖动；Telescope 使用经纬度输入、azimuth/elevation 和地表相机。必须接真实场景服务，不能保留有状态外观而没有引擎动作。

- 故事：StoryCatalog 的 stories 元数据不是故事播放脚本；StoryView 与 engine/core/STORIES.js 的脚本注册共同决定播放。Carousel 两局部支持上一步、下一步、首屏重播、折叠、进度和关闭。精选卡只 focus target/setTime 的行为不等于恢复故事时间线。事件 replay 还有前后事件、事件时钟与 EventsTimeline 聚类/缩放/焦点交互。

## 样式：84 个提取桩与真实 shell CSS

所有84个 extracted 文件删去 `//`、`/* */` 注释和空白后均为空，没有 export、CSS 字符串、插入 style 或运行时逻辑。它们保留了 app/preload bundle 的字节区间来源；import 这些桩不会提供 CSS，也不能据名字认定原始 CSS 规则已恢复。以下逐文件 SHA256 是本次读取的范围凭据，角色一律为“仅来源定位桩；视觉语义由 shell CSS 承担，原模块归属未证明”。

| 文件 | SHA256 |
|---|---|
| `eyes/src/styles/extracted/AppUtilsStyles.js` | `1a51fa88a62fd73755edb4ddff0a4caf5ec621bc65590a292ada9b82b58df035` |
| `eyes/src/styles/extracted/BaseContentBlockStyles.js` | `a23e6fd8ea5083de79bb488bf820bbc060ad9124223c8762c8e7d4faf3016d80` |
| `eyes/src/styles/extracted/BreadcrumbStyles.js` | `eb411e4ac6147850e9873ef25bbbfcebb56159597e1d00a3652f0a0fb0e0d283` |
| `eyes/src/styles/extracted/ButtonsBlockStyles.js` | `0d5bb2a9800df5dbb7ad522ffbed0edb890c6ddc50de69f2e9948131382cb337` |
| `eyes/src/styles/extracted/CameraViewBlockStyles.js` | `d87ab0945f3395701cad3bc69da557cb8f587bc18a4a08ec9b694ce69d904437` |
| `eyes/src/styles/extracted/CheckboxBlockStyles.js` | `72dddb19a5077294e193388e56cca8eb866101a826bdf703e554f8c29b1c6e46` |
| `eyes/src/styles/extracted/CollapsibleMenuItemStyles.js` | `62f68a8933458fcc3da3feb130402dfac2bbeaa89adc8226739e67c4959ccd8d` |
| `eyes/src/styles/extracted/CollapsibleMenuStyles.js` | `d8bec1cf373c4700ca6b2d8f152e7f0747cde6d865160dae8f4b42206a436dac` |
| `eyes/src/styles/extracted/ComparisonStyles.js` | `3bd2934aa8adbb6221614b9bae9dc4f031a248c96b505508be0dea97e3724e6d` |
| `eyes/src/styles/extracted/ContentPanelStyles.js` | `bb5767c6a40ead0bcb407672186ecb8972eb93de487c4a37290830ee8dfcb537` |
| `eyes/src/styles/extracted/DescriptionBlockStyles-1007.js` | `51e4799da16b099bf5b4ed2fb83d4db0fb581254e1b8ece629de52f84d867935` |
| `eyes/src/styles/extracted/DescriptionBlockStyles-543.js` | `c3968dcab0b4d0e82220300ac80f32ef20fc16960b879aedcc7847a839411558` |
| `eyes/src/styles/extracted/DistancePanelStyles.js` | `8f50195e4b9625869a3678a534d5b2a4a6cfb8e24c362de2feefa10f8a580b94` |
| `eyes/src/styles/extracted/EventsBlockStyles.js` | `157785ea355a146cc92b3c7fc32caa05c1ce812bd6e9fa642e93306fde468c9f` |
| `eyes/src/styles/extracted/EventsTimelineStyles.js` | `6f02852e1b1f470c01fa9f17cd61f78b82d1a8681ffc57ea8adbb354a972c4ec` |
| `eyes/src/styles/extracted/FeaturedStoriesPanelStyles.js` | `5a22aab7beae27595c18e8983e51000ad066316fdd3c987bf07195c97a9b3ea5` |
| `eyes/src/styles/extracted/FeaturedStoryBlockStyles.js` | `0cbd078a55abec3eadae77c12224d16378c8e6f4910f12d1e5f3ffe284a8f19e` |
| `eyes/src/styles/extracted/HintBlockStyles.js` | `f11e3721c3fe73641c9049c672d84628c171065b8be97b80bc9a8840ed55c8b1` |
| `eyes/src/styles/extracted/ImageBlockStyles.js` | `cde3da69e0ca09c456be24780edde9d41213a8f207c3e8c656dba35496e038d8` |
| `eyes/src/styles/extracted/InfoPanelStyles.js` | `83ee6ea01edf144e595c488699fb7e9f6f449084e7ae694893be9290af57752b` |
| `eyes/src/styles/extracted/InstrumentFOVBlockStyles.js` | `913a7ba053edf87737b060c6c4af9d79722b028c18b00d77f801c0e73ee7ab7d` |
| `eyes/src/styles/extracted/KioskBaseStyles.js` | `fde779f3c0c5e8ea0594d876efb8228039eb770569c9185fbcc868e7ecadcc46` |
| `eyes/src/styles/extracted/LayerPanelStyles.js` | `6730d4dadc648d9d6b2b0998ab136f58c35da58fea9ad09be658c13d19d201a5` |
| `eyes/src/styles/extracted/MenuStyles.js` | `c7aa43c885b6911c9b23b7b5454c70d0f6641a945666beb1aed79afeabb3daab` |
| `eyes/src/styles/extracted/MobileExpandButtonStyles-928.js` | `0af4e0091b5e5dcc1c9e039b01587510ae0a8c6b8f657c03683352b800f94c9e` |
| `eyes/src/styles/extracted/MobileExpandButtonStyles-987.js` | `f8f08eb5d223e924991c30836631b8cfc98f2dc4053b3f8edf06e592a1fc15c8` |
| `eyes/src/styles/extracted/OptionsBlockStyles.js` | `fcc7cbb26bb10400ab4d73f533ef4ef5aa81afcd6e42e61b55db831dd8c55180` |
| `eyes/src/styles/extracted/OverviewBlockStyles.js` | `8a8c92f3c7216b1946d1e1e5b0acee7e30a5d6a89f5535b66e9c65597e888d06` |
| `eyes/src/styles/extracted/PreloadStyles.js` | `f51ccf1a3d80639d88fd068a62f9445404bff5177f3e7d907acf69655c74e441` |
| `eyes/src/styles/extracted/RelatedBlockStyles.js` | `16fb077c95ba454b4b78f0578f324f72c2f70e38961d99b92c573e67e3f0f076` |
| `eyes/src/styles/extracted/ReplayBlockStyles.js` | `9ea8ecea4ba3ff72daa65dbb41b7e60801a9542f863e25e6b71a664dbc97c9e6` |
| `eyes/src/styles/extracted/ReplayButtonBlockStyles.js` | `17b74db52702826b9234bdc3b07f51999887cb3e9bf586c1d8cd972da56b6d87` |
| `eyes/src/styles/extracted/SpecialFeaturesBlockStyles.js` | `06c6b16be978f26b58a6446b74d8d3d88c3d821550b7b8f97fddf996fa04aed7` |
| `eyes/src/styles/extracted/StoryBaseContentBlockStyles.js` | `3dcfeeab2bf6866654999f5374f211958e1ccbea7cf1ae6d3aa957566159ab89` |
| `eyes/src/styles/extracted/StoryStyles.js` | `789d654a1c33535b9e4abba2ab8064af80475bdee4f2a4aea4458e743a60d013` |
| `eyes/src/styles/extracted/TelescopeStyles.js` | `ca833c5c7adf36b3789b07fb640899f165bd98a47515d7384e598176235205e9` |
| `eyes/src/styles/extracted/TextureQualityBlockStyles.js` | `e8ee87048f3ba1d709891b24eb2bfea4fe5e90c4d98041ac74d26a430888f15f` |
| `eyes/src/styles/extracted/TimeControlsStyles.js` | `cd1e95263b1492dc6a6574058e214dab62094ed41070578104cf8875c55c51f9` |
| `eyes/src/styles/extracted/ToastStyles.js` | `b4028347602dac897542923362836eb23bdcc98b414128d9d0864a35a5bd50cc` |
| `eyes/src/styles/extracted/ToggleBlockStyles.js` | `fe81a735a84168a7ed08cbab71e2314b5b1e1a3a081f3f66de1663a2cdc17c08` |
| `eyes/src/styles/extracted/ToolboxBlockStyles.js` | `3a9548bb26118437348cd5b6748375c0006f2d5fdec07ad633e2a35a6d2c8bc7` |
| `eyes/src/styles/extracted/TutorialOverlayStyles-497.js` | `7d8e145d1da8fbc52dadab24e03be92eb0d4e6b36ba3fe99dfdc5953b6f9cd2b` |
| `eyes/src/styles/extracted/TutorialOverlayStyles-498.js` | `d279d3d7b6718ebb57d8999e4d8903489fe35c463aca7e1e1ccdf08f0c0bc5c3` |
| `eyes/src/styles/extracted/TutorialOverlayStyles-499.js` | `71bbb9f4929864f9580226a535e173025afac2f6da2ff067a25e7b7b704d4d7c` |
| `eyes/src/styles/extracted/TutorialOverlayStyles-500.js` | `5e8667454254d183b9f4d769c9c984065e320476b68ef21247e7e1ba3d21c121` |
| `eyes/src/styles/extracted/Unidentified226.js` | `82df84b06398f450b4cd41080de3474951d4d6b6898e13526c504e425c472d73` |
| `eyes/src/styles/extracted/Unidentified227.js` | `c587a497bb6ffadcda56f4f231fae68bf6ed73c2aa305d79f108dae442595826` |
| `eyes/src/styles/extracted/Unidentified231.js` | `27dd46a02e801fbb4e20f47c256e009954b42a772a2af41d87d33dcc4171ef50` |
| `eyes/src/styles/extracted/Unidentified235.js` | `74f675187b77f11eff0e42ac125b16a827eca515656c2d334e5fc1c595381dcb` |
| `eyes/src/styles/extracted/Unidentified239.js` | `572a514c99852fe5de669a7dc361f7e6c69dd59c48ef8261004648ea2d1a31f2` |
| `eyes/src/styles/extracted/Unidentified383.js` | `cc3706c6847dc25cf965bc2925a800087e99bac71cf58a2a123cf17b373f2b54` |
| `eyes/src/styles/extracted/Unidentified387.js` | `d3d48818d6a891731d8a6de98824f090fb8f605e7797c55a57c5533ca7a36bf1` |
| `eyes/src/styles/extracted/Unidentified392.js` | `876b0bfc51f82d1f5759fd2d9dcebc570cb968b030c9b7503cee83004834d0e4` |
| `eyes/src/styles/extracted/Unidentified502.js` | `fbb3b2fed9570f1a5ee78dfe4576d12fbd66a06f1985b2ef5954f47d4ae5cc0b` |
| `eyes/src/styles/extracted/Unidentified506.js` | `10fa39f24e3cae5d85c5c0abd4e4de9696bd25f0b7b9ef606da8316ed2c38cca` |
| `eyes/src/styles/extracted/Unidentified507.js` | `fe7b2c4ce5cc7ee5b084cd01521507e75b2ee194dcbaad01035158eb133f425f` |
| `eyes/src/styles/extracted/Unidentified512.js` | `38f2fb0b20e982a3274bcb8eaea080441582c8c7e64a021ebcc463c4f37257a5` |
| `eyes/src/styles/extracted/Unidentified516.js` | `3e01a05d4c2467f98bca555d7cc5efdc6416bec19427faa28c56fbca325c9017` |
| `eyes/src/styles/extracted/Unidentified521.js` | `7394621f69432ee8f0ff7d16a64135bb5f1421d46c949edeff5aa11ebfde7bbc` |
| `eyes/src/styles/extracted/Unidentified739.js` | `a6cca0e7edee5af5cf7b858f48329c4e964787ec099e275986f8970afb1b7b61` |
| `eyes/src/styles/extracted/Unidentified740.js` | `f1be1c52520f6866a9cf2fab1f2266a261182969a7b2c2a27faf9a938932ef05` |
| `eyes/src/styles/extracted/Unidentified741.js` | `444475b05717ee5a33c61f9e5813af4b7404dbcd1121dbd7498ac6ec84cf6dd6` |
| `eyes/src/styles/extracted/Unidentified742.js` | `71cf4ab5c6a921a65a9bb59569702ce599c6c2187a226414af3c610b7dbf2a0c` |
| `eyes/src/styles/extracted/Unidentified743.js` | `56b41419d4c259b1ea55d11da357cf806516647266aecdbe710c847b9f2eb022` |
| `eyes/src/styles/extracted/Unidentified744.js` | `fa03b002776a42013926de109d6c2d83de1064a84bfa26d006f5b69262f552b4` |
| `eyes/src/styles/extracted/Unidentified745.js` | `085d364ecddea4a40fe41d44f825872106a5c6e95e8a2b078858568ee78f96a1` |
| `eyes/src/styles/extracted/Unidentified746.js` | `7c24d5597a28cab05fe52ddabfc2d160103d06003835d0760504f3ae9b146b43` |
| `eyes/src/styles/extracted/Unidentified747.js` | `c994e4b4e9e5e6ad1cf786842456d4bb49865545f916356247a088366b421cf0` |
| `eyes/src/styles/extracted/Unidentified748.js` | `923f57f99c0517c1cd7899fb169bc060a304e175ef0f83ec3b779ec5e2330868` |
| `eyes/src/styles/extracted/Unidentified749.js` | `e529540d1d393484da063af1361c2c10f53d6eec25226913a1750fead6a7c06f` |
| `eyes/src/styles/extracted/Unidentified750.js` | `51279b9ede69ebb1af4056b012f4c1bd72562d43de081a8fd96f7dc0ffe4aeaf` |
| `eyes/src/styles/extracted/Unidentified751.js` | `85b9f19ec86308607f8e79d85f3fdfb1e9543d1352628b806e2884f43c84aa77` |
| `eyes/src/styles/extracted/Unidentified756.js` | `a0cc1e71b832d8a2978519d980d6f65cca6f2d74dcaf45c177e156d1bfd4fcef` |
| `eyes/src/styles/extracted/Unidentified757.js` | `9fcd0ab86a587f80b314ce39c602b735be36012a29be0aaf0c2efe7057c6f075` |
| `eyes/src/styles/extracted/Unidentified758.js` | `c69ab022cbf5042251070b8818e28503513cf3e72d26a1c96faaa326c59cb627` |
| `eyes/src/styles/extracted/Unidentified759.js` | `45f7b9c3ef92faf282580c064c27d0f311cb30e9b5823eb542fb387d31a3f2a4` |
| `eyes/src/styles/extracted/Unidentified760.js` | `7a0a6d88bd5e49dc41e34ae1ca53989cd147e2749a9dd0bad7a2cc448eb1b045` |
| `eyes/src/styles/extracted/Unidentified761.js` | `82e457e85cac5504c18f45b9b81b8db6c361da90a416244145ccb54000bbedb9` |
| `eyes/src/styles/extracted/Unidentified762.js` | `6dd8b6eadd186507fdcea7bf3001d859c120aec7777e9025e5f1be2043df7b5f` |
| `eyes/src/styles/extracted/Unidentified763.js` | `4eb7e1c4bbcc564868d6e1d0045af1131bee3abf7970c34d3ef64b0bee58e2a3` |
| `eyes/src/styles/extracted/Unidentified764.js` | `aae5f7603c9a864cc4c1cec082ce413287e822dd0dc119157836f325d44823c3` |
| `eyes/src/styles/extracted/Unidentified765.js` | `964c575e2e65ee516cecd5328a177ecd5adec5e1260f69e63125e2380aa81230` |
| `eyes/src/styles/extracted/Unidentified766.js` | `b86e8ca623f920a13a0c8cb87eb80ceba53a995f92cba5a93fb99162db951248` |
| `eyes/src/styles/extracted/VendorStyles.js` | `7bf49d79e21cdf6e32525c3a0dee187637ebd03f6dec94350dcd1120eedb7d44` |

`eyes/src/styles/index.js` 仅 import Unidentified756..766 共11个空桩；不会加载实际 CSS。`eyes/scripts/build.mjs` 用 esbuild 将 HTML 当文本，复制整个 shell 到 dist（publish 时再到 public/eyes）；没有 CSS module 编译步骤。

| 实际文件 | 作用与边界 |
|---|---|
| `eyes/shell/index.html` | `#pioneer` 场景根、static/dynamic UI、loading/embed 占位，预加载字体/图标，加载三个 CSS 与 application.js；包含 NASA 元信息和运行时资源基址。新应用必须使用自身品牌元信息并保留归属，不照抄 NASA canonical/endorsement。 |
| `eyes/shell/preload.css` | 预加载/启动界面实际样式；相对 url 解析依 shell 输出位置，NASA URL 保持远端。 |
| `eyes/shell/vendors.css` | 第三方控件实际样式（可确认 OverlayScrollbars 1.13.0，另含提示/轮播规则，以规则本体为准），不是 VendorStyles.js 的运行效果。 |
| `eyes/shell/app.css` | 应用布局/组件/状态与响应式实际样式；选择器与模板/动态DOM共同使用，不能逐桩一对一归属。 |

重建不要求继承全部旧 CSS；需要提取交互状态与尺寸行为。新 spacelibre 界面按绑定 VI 规范和现有 palette/logo masters，原 NASA 界面按用户方向保留；不得重建 logo 或将单色母版拆色。旧 CSS 已在本报告附录逐规则解析、归类，尚未做浏览器视觉等价验证，空桩的“非运行代码”分类不构成此类验证。

## JSON 数据契约（8/8）

### `eyes/src/data/EntityCatalog.json`

直接引用：`eyes/src/app/PreloadManager.js`、`eyes/src/engine/core/BaseApp.js`。顶层 dict，数量 724。SHA256 `3a4866644169e436fbed3bc5ecd90841c6737e5007a36be32dfd29d4b724ed7a`。

724条 ID→元数据；并非 orbital ephemeris 或 mesh manifest。字段实际类型：`id`=str；`displayName`=str；`category`=str；`searchable`=bool；`comparisonFeature`=bool；`disabled`=bool；`iauName`=str；`subcategory`=str；`planeEntity`=str；`keywords`=list；`hasMoons`=bool；`forceVisibleEntities`=list；`hasEvents`=bool；`ignoreDependentWhenUnloading`=list；`constellation`=str；`altName`=str；`related`=dict；`landingDate`=str；`customDistance`=float；`cameraOptions`=dict；`horizontalOffset`=int；`verticalOffset`=int。

id/planeEntity/forceVisibleEntities/ignoreDependentWhenUnloading/related 内实体引用必须与场景目录关联校验；displayName 与 iauName fallback 由 Search 决定；disabled/searchable/comparisonFeature 是能力门控，hasMoons/hasEvents 决定内容块。customDistance、cameraOptions、horizontalOffset/verticalOffset 是镜头/布局元数据，不能误作天体公里坐标；本文件自身未声明所有这些数值单位，需按消费者验证。

EntityCatalog 嵌套字段实值补充：`related` 是分类→ID数组（如 sc_dawn 的 asteroid=[4_vesta,1_ceres]）；Deep Impact 的 `9p_temp_1` 字面引用与常见 `9p_tempel_1` 拼写不同，重建必须走 alias/缺失引用诊断，不能盲目重命名。`cameraOptions` 是可选 `{forwardVector?:string,upVector?:string,distance?:number}`，值包含 ±x/y-axis；sc_iss_emit distance=0.006、rapidscat=0.007。`customDistance` 有 sc_iss=0.1、sc_juno=0.04。sc_mars_2020 的 offsets=(60,95) 经 CameraViewBlock 传给 cameraScripts，不是轨道位置。forceVisibleEntities 表达 barycenter 显示依赖；ignoreDependentWhenUnloading 表达卸载例外。严格 schema 应容许可选字段而非填入物理默认值。

StoryCatalog 的 featured 是 string[]：roman_launch、psyche_mars_assist、artemis2、voyager_grand_tour；引用需要跨 stories/internal/external 三组解析，不能只索引 stories。

### `eyes/src/data/SceneInfo.json`

直接引用：`eyes/src/app/SolarSystemApp.js`。顶层 dict，数量 5。SHA256 `2395c8fa4d8dfa41afb11000c46016bbeae866fa23d5b517935b5fd7f0c33081`。

`zoomMax:0`、staticEntityGroups=[stars,planets]、dynamicEntities=[all]、entityOptions={milkyWaySprite:true,heliosphere:true}、meta={titlePrefix,titleSuffix,url,description}。由 SolarSystemApp 传到 BaseApp/SceneManager；all 是加载策略，不代表单个实体。zoomMax 的0不是已证明的公里距离；应保留配置语义直到相机消费者确定约定。meta 只用于页面信息，不能作为 NASA 认可的依据。

### `eyes/src/data/StoryCatalog.json`

直接引用：`eyes/src/app/PreloadManager.js`、`eyes/src/engine/core/STORIES.js`。顶层 dict，数量 4。SHA256 `c4aa6c31d5f7155f255fbd9caa3885f78e3d2ecdb49b4c35c8e79b63608ece9d`。

四组：`stories`(5)、`external`(4)、`internal`(22)、`featured`(4)。stories/external/internal 为键控元数据，featured 是精选引用集合；id/title/subtitle/icon 是展示，link/internal/contentPanelTab/iconFullSize 控制导航/布局。icon 为已存在远端 URL，不应镜像。internal link 中 ISO time 与 rate 保持路由语义，external 需外链导航；不是所有卡都有同一播放能力。

### `eyes/src/data/TimeInfo.json`

直接引用：`eyes/src/app/SolarSystemApp.js`。顶层 dict，数量 1。SHA256 `327babde8b7a9984b3fee9571d16e210e5083f13ce673b2ef79e6226f1cae82f`。

`{limits:{min:"1949-12-31T00:00:00Z",max:"2049-12-31T00:00:00Z"}}`；字符串为 UTC ISO 时间，不是 J2000 秒、毫秒或 Julian day。应用 time manager 负责解析/强制边界；新服务必须提供唯一 epoch 转换并分离数据可用区间和 UI 全局范围。

### `eyes/src/data/Unidentified381.json`

直接引用：无。顶层 dict，数量 4。SHA256 `dae210fbd6264ff11cee5b6d8b39b3a465da9426a240ce49cb4f05a3ee8dff1c`。

Moment timezone 压缩数据 `{version:"2021a",zones:string[],links:string[],countries:string[]（247条国家记录）}`，由对应 vendor wrapper `.tz.load()` 导入。不是 Eyes 场景、控制器或故事配置；zone 字符串使用 packed TZ 格式，不应当 ephemeris 数值解析。两个文件内容相同（字节哈希见上），是两套依赖链加载的重复数据。新系统宜使用 Intl/明确定版的时区库；2021a 只表明恢复快照，不保证今天的时区规则正确。

### `eyes/src/data/Unidentified775.json`

直接引用：`eyes/src/ui/views/CompareView.js`。顶层 dict，数量 7。SHA256 `93b3a1f3d18aedc197cedcf9316e52bca18dcd8a76144df49f9adbd64b43cfe9`。

比较候选顺序表 `{Planet,Moon,Asteroid,Comet,DwarfPlanet,Spacecraft,default}:string[]`。CompareView 按源实体 category 选组，排除本体，以 query.id 覆盖默认第一项；scientist/school_bus/rose_bowl 为比较用参照物，不能要求全部存在于天体 ephemeris。半径比较基准是 km，由 CompareView 转 KM/M/MI/FT；这里的数组无物理数值。

### `eyes/src/data/Unidentified916.json`

直接引用：无。顶层 dict，数量 4。SHA256 `dae210fbd6264ff11cee5b6d8b39b3a465da9426a240ce49cb4f05a3ee8dff1c`。

Moment timezone 压缩数据 `{version:"2021a",zones:string[],links:string[],countries:string[]（247条国家记录）}`，由对应 vendor wrapper `.tz.load()` 导入。不是 Eyes 场景、控制器或故事配置；zone 字符串使用 packed TZ 格式，不应当 ephemeris 数值解析。两个文件内容相同（字节哈希见上），是两套依赖链加载的重复数据。新系统宜使用 Intl/明确定版的时区库；2021a 只表明恢复快照，不保证今天的时区规则正确。

### `eyes/src/data/ViewInfo.json`

直接引用：`eyes/src/app/SolarSystemApp.js`。顶层 list，数量 8。SHA256 `d21d7da894b1f4845494ace6051e32734372b73ded7605b987b305a2596c2264`。

数组元素 `{class:string,name:string,components:string[]}`；组件名必须在 components.js 注册，class 必须在 views.js 注册。视图切换需启停订阅与状态，不只是显示隐藏。

- `home` / `HomeView`：`clock`、`clockShortcut`、`settings`、`menu`、`layerPanel`、`breadcrumb`、`searchDesktop`、`searchMobile`、`mobileExpandButton`、`featuredStoriesPanel`、`overlay`、`infoPanel`、`shareModal`、`collapsibleMenu`、`timeControls`、`kioskMode`、`kioskSessionClock`。
- `object` / `ObjectView`：`clock`、`clockShortcut`、`cameraFollowSearch`、`settings`、`menu`、`layerPanel`、`breadcrumb`、`searchDesktop`、`searchMobile`、`overlay`、`loadIcon`、`contentPanel`、`eventsTimeline`、`infoPanel`、`shareModal`、`collapsibleMenu`、`timeControls`、`kioskMode`、`kioskSessionClock`、`toast`。
- `story` / `StoryView`：`clock`、`clockShortcut`、`settings`、`layerPanel`、`shareModal`、`breadcrumb`、`story`、`overlay`、`infoPanel`、`collapsibleMenu`、`timeControls`、`kioskMode`、`kioskSessionClock`、`menu`。
- `compare` / `CompareView`：`settings`、`breadcrumb`、`loadIcon`、`comparison`、`infoPanel`、`shareModal`、`overlay`、`kioskMode`、`kioskSessionClock`、`menu`。
- `event` / `EventView`：`clock`、`clockShortcut`、`cameraFollowSearch`、`settings`、`menu`、`layerPanel`、`breadcrumb`、`searchDesktop`、`searchMobile`、`overlay`、`loadIcon`、`contentPanel`、`eventsTimeline`、`infoPanel`、`shareModal`、`collapsibleMenu`、`timeControls`、`kioskMode`、`kioskSessionClock`、`toast`。
- `telescope` / `TelescopeView`：`menu`、`telescope`、`breadcrumb`、`searchDesktop`、`searchMobile`、`overlay`、`loadIcon`、`infoPanel`、`shareModal`、`kioskMode`、`kioskSessionClock`。
- `feature` / `FeatureView`：`clock`、`clockShortcut`、`settings`、`menu`、`layerPanel`、`breadcrumb`、`searchDesktop`、`searchMobile`、`overlay`、`loadIcon`、`contentPanel`、`infoPanel`、`shareModal`、`collapsibleMenu`、`timeControls`、`kioskMode`、`kioskSessionClock`。
- `distance` / `DistanceView`：`clock`、`clockShortcut`、`settings`、`layerPanel`、`breadcrumb`、`distancePanel`、`distanceSourceSearch`、`distanceTargetSearch`、`collapsibleMenu`、`timeControls`、`shareModal`、`kioskMode`、`kioskSessionClock`、`overlay`。

## 与现有 React/Next 界面的实际差距

`src/app/page.tsx` 当前重定向 `/eyes/index.html`；因此以下 React 组件存在于仓库不表示默认首页已经运行它们。`SolarViewer.tsx` 的 React 路径有实体挑选与最大额外60个对象预算、异步 dynamo 加载、焦点/选中、错误重试、图层状态、故事卡点击。`onStory` 只按 date 设置时间并 focus target。

| 已存在接口 | 已读取的实际行为 | 重建尚需承担 |
|---|---|---|
| `TopNav.tsx` | 本地目录搜索与选择回调 | 评分建议、详情卡、统一键盘序列、异步取消及 route/query 保留规则 |
| `TimeBar.tsx` | 正向五档速度、暂停、围绕当前 epoch 的±100年绝对时间滑块 | 双向速率、真实 now/1×判定、固定合法范围、日期输入、UTC/本地、query可分享；当前 Live 只基于 playing，Real Rate 文案不证明1× |
| `SettingsRail.tsx` | 五个图层布尔项与本地 lighting 状态、fullscreen/reset | lighting 没有传入 scene 的接口；尚需真实灯光模式、上下文图层、单位、摄影/引导相机 |
| `InfoPanel.tsx` / `FeaturedStories.tsx` | 实体资料、精选卡与回调 | 完整内容块注册、事件表/时间轴、Carousel故事脚本与工具面板 |
| `SolarViewer.tsx` | 管理 scene handle 生命周期和基本选择 | compare/distance/telescope/instrument-FOV/surface-map/texture-quality/kiosk/share 契约及八种视图路由 |

该表为源码能力差距，不是实时渲染验收。特别是“有按钮”和“有独立可控场景能力”需要分别证明。

## 独立 Next.js + Three.js 实现的验收切面

1. 一个不依赖旧 application.js 的 SimulationStore：UTC/J2000转化、signed seconds/second、now/live、暂停恢复、可用时间区间；renderer 只消费明确状态。URL adapter 双向恢复 entity/view/time/rate/layers/tool参数，浏览器前后退不丢状态。
2. EntityRegistry、ContentRepository 和 StoryRegistry 分层：ID引用验证、可搜索性/能力门控、远端失败回退；NASA URL 精确使用，只有小型测试夹具可以入库。动态内容使用安全节点渲染，不直接复制 innerHTML 拼接。
3. UI 按八种视图与组件启用集重写；相机、比较、距离、地面望远镜、图层和事件服务各有可测试命令；工具可外部控制，改变状态必须影响 Three 实体/相机而非仅图标。
4. 优先验证 search选中→URL→focus、改时间→轨道刷新→边界暂停、全局/上下文图层同步、故事步骤→镜头/时钟→退出恢复、compare/distance单位切换、移动拖动与键盘/读屏；远端失败应明确显示，不用静默空场景充当成功。
5. 使用绑定视觉规范与实际 SVG masters，验证主题下 full-color/monochrome 的规则；在支持的视口截图验证。不把旧 shell 样式桩数量计入实现完成度。

## 控制器动作定义与服务命令的源码定位

下面补充每个模板调用者实际声明的动作定义行号和直接服务调用。行号按本次读取的恢复树；继承动作由 BaseComponent/OptionsBlock/BaseContentBlock 解析，不能把未在子类定义视作失效按钮。直接服务命令的集合只包含 `getManager("literal").method`，保存到局部变量后的调用在上述核心契约和控制器正文中继续追踪。

- `BreadcrumbTemplate.html`：
  - eyes/src/ui/components/Breadcrumb.js；`_goToHome` @ eyes/src/ui/components/Breadcrumb.js:62；服务成员：`content.events`, `content.getEntityInfo`, `content.getStoryList`, `router.configs`, `router.navigate`。
- `ButtonsBlockTemplate.html`：
  - eyes/src/ui/components/ButtonsBlock.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：`content.getStory`。
- `CameraViewBlockTemplate.html`：
  - eyes/src/ui/components/CameraViewBlock.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：`camera.updateLighting`, `cameraFollow.isEnabled`, `cameraFollow.setEnabled`, `content.getColorClass`, `content.getEntityInfo`, `router.parseQuery`, `router.query`, `scene.addLoading`, `scene.getCMTSEntity`, `scene.getParent`, `scene.isReady`, `scene.removeLoading`, `scene.terrainIsReady`, `trajectory.createUI`, `trajectory.getCustomMissions`, `trajectory.registerCallback`, `trajectory.setEnabled`。
- `CarouselPanelTemplate.html`：
  - eyes/src/ui/components/CarouselPanel.js；`collapse` @ eyes/src/ui/components/CarouselPanel.js:298；`expand` @ eyes/src/ui/components/CarouselPanel.js:291；服务成员：`layer.getLayer`。
- `CarouselTemplate-390.html`：
  - eyes/src/ui/components/Carousel.js；`close` @ eyes/src/ui/components/Carousel.js:344；服务成员：`router.configs`, `spout.setUpSpoutLabels`。
- `CarouselTemplate-391.html`：
  - eyes/src/ui/components/Carousel.js；`_onControlsToggle` @ eyes/src/ui/components/Carousel.js:76；`_toggleCollapse` @ eyes/src/ui/components/Carousel.js:359；`goToFirstSlide` @ eyes/src/ui/components/Carousel.js:322；`goToNextSlide` @ eyes/src/ui/components/Carousel.js:315；`goToPrevSlide` @ eyes/src/ui/components/Carousel.js:307；服务成员：`router.configs`, `spout.setUpSpoutLabels`。
- `CheckboxBlockTemplate.html`：
  - eyes/src/ui/components/CheckboxBlock.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：无直接链式引用。
- `CheckboxMultistateTemplate.html`：
  - eyes/src/ui/components/Checkbox.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：无直接链式引用。
  - eyes/src/ui/components/CheckboxMultistate.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：无直接链式引用。
- `ClockShortcutTemplate.html`：
  - eyes/src/ui/components/ClockShortcut.js；`_replay` @ eyes/src/ui/components/ClockShortcut.js:78；`backToLive` @ eyes/src/ui/components/ClockShortcut.js:64；服务成员：`router.navigate`, `time.getNow`, `time.isNow`, `time.isWithinLimits`, `time.setTimeRate`, `time.setToStart`。
- `ClockTemplate.html`：
  - eyes/src/ui/components/Clock.js；`onDateTimeClick` @ eyes/src/ui/components/Clock.js:78；服务成员：`router.currentRoute`, `time.forcedPause`, `time.getDateFormat`, `time.getTimeUrl`, `time.isUTC`, `time.parseTime`, `time.setDateFormats`, `time.setDisplayUTC`。
- `CollapsibleMenuItemTemplate.html`：
  - eyes/src/ui/components/CollapsibleMenuItem.js；`onCollapseClick` @ eyes/src/ui/components/CollapsibleMenuItem.js:57；`onToggleClick` @ eyes/src/ui/components/CollapsibleMenuItem.js:50；服务成员：无直接链式引用。
- `CollapsibleMenuTemplate.html`：
  - eyes/src/ui/components/CollapsibleMenu.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：`router.configs`。
- `ComparisonTemplate.html`：
  - eyes/src/ui/components/Comparison.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：`comparison.entityLeft`, `comparison.entityRight`, `comparison.exit`, `content.getClassName`, `content.getColorClass`, `content.getEntityDesc`, `content.getEntityInfo`, `router.navigate`。
- `ContentPanelTemplate.html`：
  - eyes/src/ui/components/ContentPanel.js；`_onTabSelect` @ eyes/src/ui/components/ContentPanel.js:248；`collapse` @ eyes/src/ui/components/ContentPanel.js:618；`expand` @ eyes/src/ui/components/ContentPanel.js:597；`onClickShowCollapse` @ eyes/src/ui/components/ContentPanel.js:544；`onDrag` @ eyes/src/ui/components/ContentPanel.js:564；`onDragEnd` @ eyes/src/ui/components/ContentPanel.js:571；`onDragStart` @ eyes/src/ui/components/ContentPanel.js:560；服务成员：`content.context`, `content.getEntityDesc`, `content.getEntityInfo`, `content.hasLanded`, `layer.getLayer`, `router.configs`, `router.navigate`, `scene.get`, `scene.getCMTSEntity`, `scene.getHDToggleEntity`, `scene.getParent`, `scene.updateHDTarget`。
- `DescriptionBlockTemplate-1006.html`：
  - eyes/src/ui/components/DescriptionBlock-1005.js；`onClickReadMore` @ eyes/src/ui/components/DescriptionBlock-1005.js:65；服务成员：`content.hideExternalLinksInText`, `router.configs`。
- `DescriptionBlockTemplate-542.html`：
  - eyes/src/ui/components/DescriptionBlock-541.js；`toggleMore` @ eyes/src/ui/components/DescriptionBlock-541.js:54；服务成员：无直接链式引用。
- `DistancePanelTemplate.html`：
  - eyes/src/ui/components/DistancePanel.js；`exit` @ eyes/src/ui/components/DistancePanel.js:182；`onContainerClick` @ eyes/src/ui/components/DistancePanel.js:223；`onLineClick` @ eyes/src/ui/components/DistancePanel.js:511；`onResultClick` @ eyes/src/ui/components/DistancePanel.js:214；`onSwapClick` @ eyes/src/ui/components/DistancePanel.js:206；`toggleIsMinimized` @ eyes/src/ui/components/DistancePanel.js:369；`toggleSourceMP` @ eyes/src/ui/components/DistancePanel.js:192；`toggleTargetMP` @ eyes/src/ui/components/DistancePanel.js:199；`toggleUnitSystem` @ eyes/src/ui/components/DistancePanel.js:209；服务成员：`distance.errorResultTimeout`。
- `EventsBlockTemplate.html`：
  - eyes/src/ui/components/EventsBlock.js；`_onTabSelect` @ eyes/src/ui/components/EventsBlock.js:92；`sortEventsByTarget`：继承/运行时绑定（需沿基类查）；`sortEventsByTitle`：继承/运行时绑定（需沿基类查）；`sortEventsByYear`：继承/运行时绑定（需沿基类查）；服务成员：`content.getEntityInfo`, `time.parseTime`。
  - eyes/src/ui/components/FeaturedEventsBlock.js；`_onTabSelect`：继承/运行时绑定（需沿基类查）；`sortEventsByTarget`：继承/运行时绑定（需沿基类查）；`sortEventsByTitle`：继承/运行时绑定（需沿基类查）；`sortEventsByYear`：继承/运行时绑定（需沿基类查）；服务成员：`content.events`, `content.getColorClass`, `router.navigate`。
- `EventsTimelineTemplate.html`：
  - eyes/src/ui/components/EventsTimeline.js；`_onDateTouchEnd` @ eyes/src/ui/components/EventsTimeline.js:1006；`_onDateTouchStart` @ eyes/src/ui/components/EventsTimeline.js:1003；`_onFpArrowClick` @ eyes/src/ui/components/EventsTimeline.js:1030；`_onFpMouseEnter` @ eyes/src/ui/components/EventsTimeline.js:613；`_onFpMouseLeaveDebounced`：继承/运行时绑定（需沿基类查）；`_onFpTicksClick` @ eyes/src/ui/components/EventsTimeline.js:685；`_onFpTicksMouseEnter` @ eyes/src/ui/components/EventsTimeline.js:648；`_onFpTicksMouseLeave` @ eyes/src/ui/components/EventsTimeline.js:682；`_onFpTicksMouseMove` @ eyes/src/ui/components/EventsTimeline.js:657；`_onFpTicksTouchEnd` @ eyes/src/ui/components/EventsTimeline.js:943；`_onFpTicksTouchMove` @ eyes/src/ui/components/EventsTimeline.js:910；`_onFpTicksTouchStart` @ eyes/src/ui/components/EventsTimeline.js:859；`_onFpTouchEnd` @ eyes/src/ui/components/EventsTimeline.js:809；`_onFpTouchMoveThrottled`：继承/运行时绑定（需沿基类查）；`_onFpTouchStart` @ eyes/src/ui/components/EventsTimeline.js:800；`_onFpWheel` @ eyes/src/ui/components/EventsTimeline.js:765；`_onTimelineClick` @ eyes/src/ui/components/EventsTimeline.js:518；`_onTimelineMouseLeaveDebounced`：继承/运行时绑定（需沿基类查）；`_onTimelineMouseMove` @ eyes/src/ui/components/EventsTimeline.js:490；`_onTimelineTouchEnd` @ eyes/src/ui/components/EventsTimeline.js:1131；`_onTimelineTouchMove` @ eyes/src/ui/components/EventsTimeline.js:1109；`_onTimelineTouchStart` @ eyes/src/ui/components/EventsTimeline.js:1062；`_zoomOutOfCluster` @ eyes/src/ui/components/EventsTimeline.js:742；服务成员：`scene.getCoverage`, `time.getDefaultLimits`, `time.getTimeUrl`。
- `ExplorationBlockTemplate.html`：
  - eyes/src/ui/components/ExplorationBlock.js；`toggleMore`：继承/运行时绑定（需沿基类查）；服务成员：`content.getColorClass`, `router.navigate`。
- `FeaturedEventsBlockTemplate.html`：
  - eyes/src/ui/components/FeaturedEventsBlock.js；`toggleMore`：继承/运行时绑定（需沿基类查）；服务成员：`content.events`, `content.getColorClass`, `router.navigate`。
- `FeaturedMoonsBlockTemplate.html`：
  - eyes/src/ui/components/FeaturedMoonsBlock.js；`toggleMore`：继承/运行时绑定（需沿基类查）；服务成员：`router.navigate`。
- `FeaturedStoriesPanelTemplate.html`：
  - eyes/src/ui/components/FeaturedStoriesPanel.js；`onClickShowCollapse` @ eyes/src/ui/components/FeaturedStoriesPanel.js:86；服务成员：无直接链式引用。
- `FeaturedStoryBlockTemplate.html`：
  - eyes/src/ui/components/FeaturedStoryBlock.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：`content.context`, `router.navigate`。
- `FeaturesBlockTemplate.html`：
  - eyes/src/ui/components/FeaturesBlock.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：`layer.changeSpheroidMap`, `scene.get`。
  - eyes/src/ui/components/SpecialFeaturesBlock.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：`content.getColorClass`, `content.hasLanded`, `router.navigate`。
- `HintBlockTemplate.html`：
  - eyes/src/ui/components/HintBlock.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：无直接链式引用。
- `ImageBlockTemplate.html`：
  - eyes/src/ui/components/ImageBlock.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：无直接链式引用。
- `InfoPanelTemplate.html`：
  - eyes/src/ui/components/InfoPanel.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：无直接链式引用。
- `InstrumentFOVBlockTemplate.html`：
  - eyes/src/ui/components/InstrumentFOVBlock.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：无直接链式引用。
- `KioskBaseTemplate.html`：
  - eyes/src/ui/components/KioskBase.js；`onWindowInteract` @ eyes/src/ui/components/KioskBase.js:99；`sessionStartOverButtonClick` @ eyes/src/ui/components/KioskBase.js:88；服务成员：`camera.getContext`, `camera.getIsTransitioning`, `camera.waitForTransitionComplete`, `layer.getLayer`, `layer.toggleLayer`。
- `LayerPanelTemplate.html`：
  - eyes/src/ui/components/LayerPanel.js；`hide` @ eyes/src/ui/components/LayerPanel.js:231；服务成员：`layer.getLayer`, `layer.toggleLayer`。
- `LayersBlockTemplate.html`：
  - eyes/src/ui/components/LayersBlock.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：`content.getEntityInfo`, `layer.getContextualLayers`, `layer.getLayer`, `layer.toggleLayer`, `router.configs`。
- `LoadIconTemplate.html`：
  - eyes/src/ui/components/LoadIcon.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：无直接链式引用。
- `MenuTemplate.html`：
  - eyes/src/ui/components/CollapsibleMenu.js；`hide`：继承/运行时绑定（需沿基类查）；`toggle`：继承/运行时绑定（需沿基类查）；服务成员：`router.configs`。
  - eyes/src/ui/components/Menu.js；`hide` @ eyes/src/ui/components/Menu.js:190；`toggle`：继承/运行时绑定（需沿基类查）；服务成员：`router.configs`, `router.navigate`。
- `MobileExpandButtonTemplate.html`：
  - eyes/src/ui/components/MobileExpandButton.js；`_expandButtonClicked` @ eyes/src/ui/components/MobileExpandButton.js:29；服务成员：无直接链式引用。
- `OverlayTemplate.html`：
  - eyes/src/ui/components/Overlay.js；`hide`：继承/运行时绑定（需沿基类查）；`show` @ eyes/src/ui/components/Overlay.js:37；服务成员：无直接链式引用。
  - eyes/src/ui/components/TutorialOverlay.js；`hide` @ eyes/src/ui/components/TutorialOverlay.js:266；`show` @ eyes/src/ui/components/TutorialOverlay.js:256；服务成员：`content.hideExternalLinksInText`, `router.configs`, `router.navigate`。
- `OverviewBlockTemplate.html`：
  - eyes/src/ui/components/OverviewBlock.js；`goBack` @ eyes/src/ui/components/OverviewBlock.js:33；服务成员：`content.getCategoryShapeMap`, `content.getEntityInfo`, `router.currentView`, `scene.get`, `time.etToMoment`, `time.parseTime`。
- `RelatedBlockTemplate.html`：
  - eyes/src/ui/components/RelatedBlock.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：`camera.waitForTransitionComplete`, `content.getCategoryShapeMap`, `content.getEntityInfo`, `router.navigate`。
- `ReplayBlockTemplate.html`：
  - eyes/src/ui/components/ReplayBlock.js；`nextButtonClicked` @ eyes/src/ui/components/ReplayBlock.js:118；`playPauseEvent` @ eyes/src/ui/components/ReplayBlock.js:133；`prevButtonClicked` @ eyes/src/ui/components/ReplayBlock.js:115；服务成员：`content.orderedEvents`, `time.getDateFormat`, `time.parseTime`, `time.pause`, `time.play`, `time.setTime`。
- `ReplayButtonBlockTemplate.html`：
  - eyes/src/ui/components/ReplayButtonBlock.js；`onClick` @ eyes/src/ui/components/ReplayButtonBlock.js:12；服务成员：无直接链式引用。
- `SearchTemplate.html`：
  - eyes/src/ui/components/Search.js；`_find` @ eyes/src/ui/components/Search.js:115；`keydown` @ eyes/src/ui/components/Search.js:88；`onIconClick` @ eyes/src/ui/components/Search.js:77；`onInputFocus` @ eyes/src/ui/components/Search.js:101；`reset` @ eyes/src/ui/components/Search.js:84；服务成员：`content.getEntityDesc`, `content.getEntityInfo`, `content.getStoryList`。
- `SettingsTemplate.html`：
  - eyes/src/ui/components/Settings.js；`toggleCollapse` @ eyes/src/ui/components/Settings.js:341；`toggleFullscreen` @ eyes/src/ui/components/Settings.js:354；`toggleGuidedCamera` @ eyes/src/ui/components/Settings.js:411；`toggleInfoPanel` @ eyes/src/ui/components/Settings.js:414；`toggleLayers` @ eyes/src/ui/components/Settings.js:357；`toggleLight` @ eyes/src/ui/components/Settings.js:393；`togglePhotoMode` @ eyes/src/ui/components/Settings.js:360；`toggleUnit` @ eyes/src/ui/components/Settings.js:345；服务成员：`camera.toggleCameraLight`, `camera.zoomIn`, `camera.zoomOut`, `comparison.setCameraLight`, `router.configs`。
- `ShareModalTemplate.html`：
  - eyes/src/ui/components/ShareModal.js；`copyToClipboard` @ eyes/src/ui/components/ShareModal.js:618；`handleClick` @ eyes/src/ui/components/ShareModal.js:630；`handleTabClick` @ eyes/src/ui/components/ShareModal.js:637；`toggleIframeElements` @ eyes/src/ui/components/ShareModal.js:398；服务成员：无直接链式引用。
- `SolarSystemAppTemplate.html`：
  - eyes/src/app/SolarSystemApp.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：`router.addRoutes`, `router.homeRoute`, `router.navigate`, `router.parseQuery`, `search.setDatabase`。
- `SpecialFeaturesBlockTemplate.html`：
  - eyes/src/ui/components/SpecialFeaturesBlock.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：`content.getColorClass`, `content.hasLanded`, `router.navigate`。
- `SurfaceMapBlockTemplate.html`：
  - eyes/src/ui/components/SurfaceMapBlock.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：`content.getSpheroidDefaultTextureInformation`, `content.getSpheroidLayers`, `layer.changeSpheroidMap`, `layer.getCurrentSurfaceLayer`, `router.configs`, `scene.getCMTSEntity`, `scene.updateHDTarget`。
- `TelescopeTemplate.html`：
  - eyes/src/ui/components/Telescope.js；`exitSurfaceMode` @ eyes/src/ui/components/Telescope.js:149；`exitTelescope` @ eyes/src/ui/components/Telescope.js:87；`goSurfaceViewClick` @ eyes/src/ui/components/Telescope.js:176；`latitudeInputChange` @ eyes/src/ui/components/Telescope.js:161；`longitudeInputChange` @ eyes/src/ui/components/Telescope.js:166；`showCoordinateInputTip` @ eyes/src/ui/components/Telescope.js:243；`toggleConstellation` @ eyes/src/ui/components/Telescope.js:154；服务成员：`content.getSpheroidDefaultTextureInformation`, `content.getSpheroidLayers`, `label.setClickable`, `layer.changeSpheroidMap`, `layer.getLayer`, `layer.toggleLayer`, `router.configs`, `router.navigate`, `scene.addLoading`, `scene.removeLoading`, `selection.setClickable`。
- `TextureQualityBlockTemplate.html`：
  - eyes/src/ui/components/TextureQualityBlock.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：`scene.isEntityHD`, `scene.isHD`, `scene.toggleHDTextureForEntity`。
- `TimeControllerTemplate.html`：
  - eyes/src/engine/controllers/TimeController.js；`decreaseRate` @ eyes/src/engine/controllers/TimeController.js:75；`increaseRate` @ eyes/src/engine/controllers/TimeController.js:85；`togglePlayPause` @ eyes/src/engine/controllers/TimeController.js:94；服务成员：无直接链式引用。
- `TimeControlsTemplate.html`：
  - eyes/src/ui/components/TimeControls.js；`decreaseRate` @ eyes/src/ui/components/TimeControls.js:263；`increaseRate` @ eyes/src/ui/components/TimeControls.js:276；`onRealtimeClick` @ eyes/src/ui/components/TimeControls.js:299；`playPauseRate` @ eyes/src/ui/components/TimeControls.js:289；服务成员：无直接链式引用。
- `TitleBlockTemplate.html`：
  - eyes/src/ui/components/TitleBlock.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：无直接链式引用。
- `ToastTemplate.html`：
  - eyes/src/ui/components/Toast.js；`hide` @ eyes/src/ui/components/Toast.js:45；服务成员：无直接链式引用。
- `ToggleBlockTemplate.html`：
  - eyes/src/ui/components/ToggleBlock.js；无模板内联事件，动作由动态 DOM/子组件提供；服务成员：无直接链式引用。
- `ToolboxBlockTemplate.html`：
  - eyes/src/ui/components/ToolboxBlock.js；`_closeTooltip` @ eyes/src/ui/components/ToolboxBlock.js:74；`_showTooltip` @ eyes/src/ui/components/ToolboxBlock.js:59；服务成员：`router.navigate`。
- `TutorialOverlayTemplate.html`：
  - eyes/src/ui/components/TutorialOverlay.js；`close` @ eyes/src/ui/components/TutorialOverlay.js:292；服务成员：`content.hideExternalLinksInText`, `router.configs`, `router.navigate`。

CSS 实读计数（花括号计数包括 @media/keyframes 嵌套，不等于独立 selector 数）：preload.css 6,022 字符 / 52个左括号 / 3个 @media；vendors.css 31,528 字符 /174个左括号 /0个 @media。这类统计仅证明遍历范围，不替代视觉测试。时区两个快照各有377条 zones、216条 links、247条 countries；countries 不是空数组。

## 可机检覆盖与未解决项

本节 manifest 只声明阅读范围，不能自动升级为语义等价证明。可执行以下 Python 校验：manifest 等于磁盘当前 glob 文件集合、逐项 hash、模板 import 存在、84桩去注释为空；控制器行为和视觉仍需独立测试。

```json
{
  "scope": "ui-data-contracts",
  "templates": [
    "eyes/src/ui/templates/BreadcrumbTemplate.html",
    "eyes/src/ui/templates/ButtonsBlockTemplate.html",
    "eyes/src/ui/templates/CameraViewBlockTemplate.html",
    "eyes/src/ui/templates/CarouselPanelTemplate.html",
    "eyes/src/ui/templates/CarouselTemplate-390.html",
    "eyes/src/ui/templates/CarouselTemplate-391.html",
    "eyes/src/ui/templates/CheckboxBlockTemplate.html",
    "eyes/src/ui/templates/CheckboxMultistateTemplate.html",
    "eyes/src/ui/templates/ClockShortcutTemplate.html",
    "eyes/src/ui/templates/ClockTemplate.html",
    "eyes/src/ui/templates/CollapsibleMenuItemTemplate.html",
    "eyes/src/ui/templates/CollapsibleMenuTemplate.html",
    "eyes/src/ui/templates/ComparisonTemplate.html",
    "eyes/src/ui/templates/ContentPanelTemplate.html",
    "eyes/src/ui/templates/DescriptionBlockTemplate-1006.html",
    "eyes/src/ui/templates/DescriptionBlockTemplate-542.html",
    "eyes/src/ui/templates/DistancePanelTemplate.html",
    "eyes/src/ui/templates/EventsBlockTemplate.html",
    "eyes/src/ui/templates/EventsTimelineTemplate.html",
    "eyes/src/ui/templates/ExplorationBlockTemplate.html",
    "eyes/src/ui/templates/FeaturedEventsBlockTemplate.html",
    "eyes/src/ui/templates/FeaturedMoonsBlockTemplate.html",
    "eyes/src/ui/templates/FeaturedStoriesPanelTemplate.html",
    "eyes/src/ui/templates/FeaturedStoryBlockTemplate.html",
    "eyes/src/ui/templates/FeaturesBlockTemplate.html",
    "eyes/src/ui/templates/HintBlockTemplate.html",
    "eyes/src/ui/templates/ImageBlockTemplate.html",
    "eyes/src/ui/templates/InfoPanelTemplate.html",
    "eyes/src/ui/templates/InstrumentFOVBlockTemplate.html",
    "eyes/src/ui/templates/KioskBaseTemplate.html",
    "eyes/src/ui/templates/LayerPanelTemplate.html",
    "eyes/src/ui/templates/LayersBlockTemplate.html",
    "eyes/src/ui/templates/LoadIconTemplate.html",
    "eyes/src/ui/templates/MenuTemplate.html",
    "eyes/src/ui/templates/MobileExpandButtonTemplate.html",
    "eyes/src/ui/templates/OverlayTemplate.html",
    "eyes/src/ui/templates/OverviewBlockTemplate.html",
    "eyes/src/ui/templates/RelatedBlockTemplate.html",
    "eyes/src/ui/templates/ReplayBlockTemplate.html",
    "eyes/src/ui/templates/ReplayButtonBlockTemplate.html",
    "eyes/src/ui/templates/SearchTemplate.html",
    "eyes/src/ui/templates/SettingsTemplate.html",
    "eyes/src/ui/templates/ShareModalTemplate.html",
    "eyes/src/ui/templates/SolarSystemAppTemplate.html",
    "eyes/src/ui/templates/SpecialFeaturesBlockTemplate.html",
    "eyes/src/ui/templates/SurfaceMapBlockTemplate.html",
    "eyes/src/ui/templates/TelescopeTemplate.html",
    "eyes/src/ui/templates/TextureQualityBlockTemplate.html",
    "eyes/src/ui/templates/TimeControllerTemplate.html",
    "eyes/src/ui/templates/TimeControlsTemplate.html",
    "eyes/src/ui/templates/TitleBlockTemplate.html",
    "eyes/src/ui/templates/ToastTemplate.html",
    "eyes/src/ui/templates/ToggleBlockTemplate.html",
    "eyes/src/ui/templates/ToolboxBlockTemplate.html",
    "eyes/src/ui/templates/TutorialOverlayTemplate.html"
  ],
  "styleStubs": [
    "eyes/src/styles/extracted/AppUtilsStyles.js",
    "eyes/src/styles/extracted/BaseContentBlockStyles.js",
    "eyes/src/styles/extracted/BreadcrumbStyles.js",
    "eyes/src/styles/extracted/ButtonsBlockStyles.js",
    "eyes/src/styles/extracted/CameraViewBlockStyles.js",
    "eyes/src/styles/extracted/CheckboxBlockStyles.js",
    "eyes/src/styles/extracted/CollapsibleMenuItemStyles.js",
    "eyes/src/styles/extracted/CollapsibleMenuStyles.js",
    "eyes/src/styles/extracted/ComparisonStyles.js",
    "eyes/src/styles/extracted/ContentPanelStyles.js",
    "eyes/src/styles/extracted/DescriptionBlockStyles-1007.js",
    "eyes/src/styles/extracted/DescriptionBlockStyles-543.js",
    "eyes/src/styles/extracted/DistancePanelStyles.js",
    "eyes/src/styles/extracted/EventsBlockStyles.js",
    "eyes/src/styles/extracted/EventsTimelineStyles.js",
    "eyes/src/styles/extracted/FeaturedStoriesPanelStyles.js",
    "eyes/src/styles/extracted/FeaturedStoryBlockStyles.js",
    "eyes/src/styles/extracted/HintBlockStyles.js",
    "eyes/src/styles/extracted/ImageBlockStyles.js",
    "eyes/src/styles/extracted/InfoPanelStyles.js",
    "eyes/src/styles/extracted/InstrumentFOVBlockStyles.js",
    "eyes/src/styles/extracted/KioskBaseStyles.js",
    "eyes/src/styles/extracted/LayerPanelStyles.js",
    "eyes/src/styles/extracted/MenuStyles.js",
    "eyes/src/styles/extracted/MobileExpandButtonStyles-928.js",
    "eyes/src/styles/extracted/MobileExpandButtonStyles-987.js",
    "eyes/src/styles/extracted/OptionsBlockStyles.js",
    "eyes/src/styles/extracted/OverviewBlockStyles.js",
    "eyes/src/styles/extracted/PreloadStyles.js",
    "eyes/src/styles/extracted/RelatedBlockStyles.js",
    "eyes/src/styles/extracted/ReplayBlockStyles.js",
    "eyes/src/styles/extracted/ReplayButtonBlockStyles.js",
    "eyes/src/styles/extracted/SpecialFeaturesBlockStyles.js",
    "eyes/src/styles/extracted/StoryBaseContentBlockStyles.js",
    "eyes/src/styles/extracted/StoryStyles.js",
    "eyes/src/styles/extracted/TelescopeStyles.js",
    "eyes/src/styles/extracted/TextureQualityBlockStyles.js",
    "eyes/src/styles/extracted/TimeControlsStyles.js",
    "eyes/src/styles/extracted/ToastStyles.js",
    "eyes/src/styles/extracted/ToggleBlockStyles.js",
    "eyes/src/styles/extracted/ToolboxBlockStyles.js",
    "eyes/src/styles/extracted/TutorialOverlayStyles-497.js",
    "eyes/src/styles/extracted/TutorialOverlayStyles-498.js",
    "eyes/src/styles/extracted/TutorialOverlayStyles-499.js",
    "eyes/src/styles/extracted/TutorialOverlayStyles-500.js",
    "eyes/src/styles/extracted/Unidentified226.js",
    "eyes/src/styles/extracted/Unidentified227.js",
    "eyes/src/styles/extracted/Unidentified231.js",
    "eyes/src/styles/extracted/Unidentified235.js",
    "eyes/src/styles/extracted/Unidentified239.js",
    "eyes/src/styles/extracted/Unidentified383.js",
    "eyes/src/styles/extracted/Unidentified387.js",
    "eyes/src/styles/extracted/Unidentified392.js",
    "eyes/src/styles/extracted/Unidentified502.js",
    "eyes/src/styles/extracted/Unidentified506.js",
    "eyes/src/styles/extracted/Unidentified507.js",
    "eyes/src/styles/extracted/Unidentified512.js",
    "eyes/src/styles/extracted/Unidentified516.js",
    "eyes/src/styles/extracted/Unidentified521.js",
    "eyes/src/styles/extracted/Unidentified739.js",
    "eyes/src/styles/extracted/Unidentified740.js",
    "eyes/src/styles/extracted/Unidentified741.js",
    "eyes/src/styles/extracted/Unidentified742.js",
    "eyes/src/styles/extracted/Unidentified743.js",
    "eyes/src/styles/extracted/Unidentified744.js",
    "eyes/src/styles/extracted/Unidentified745.js",
    "eyes/src/styles/extracted/Unidentified746.js",
    "eyes/src/styles/extracted/Unidentified747.js",
    "eyes/src/styles/extracted/Unidentified748.js",
    "eyes/src/styles/extracted/Unidentified749.js",
    "eyes/src/styles/extracted/Unidentified750.js",
    "eyes/src/styles/extracted/Unidentified751.js",
    "eyes/src/styles/extracted/Unidentified756.js",
    "eyes/src/styles/extracted/Unidentified757.js",
    "eyes/src/styles/extracted/Unidentified758.js",
    "eyes/src/styles/extracted/Unidentified759.js",
    "eyes/src/styles/extracted/Unidentified760.js",
    "eyes/src/styles/extracted/Unidentified761.js",
    "eyes/src/styles/extracted/Unidentified762.js",
    "eyes/src/styles/extracted/Unidentified763.js",
    "eyes/src/styles/extracted/Unidentified764.js",
    "eyes/src/styles/extracted/Unidentified765.js",
    "eyes/src/styles/extracted/Unidentified766.js",
    "eyes/src/styles/extracted/VendorStyles.js"
  ],
  "styleIndex": "eyes/src/styles/index.js",
  "shellFiles": [
    "eyes/shell/index.html",
    "eyes/shell/app.css",
    "eyes/shell/preload.css",
    "eyes/shell/vendors.css"
  ],
  "data": [
    "eyes/src/data/EntityCatalog.json",
    "eyes/src/data/SceneInfo.json",
    "eyes/src/data/StoryCatalog.json",
    "eyes/src/data/TimeInfo.json",
    "eyes/src/data/Unidentified381.json",
    "eyes/src/data/Unidentified775.json",
    "eyes/src/data/Unidentified916.json",
    "eyes/src/data/ViewInfo.json"
  ],
  "counts": {
    "templates": 55,
    "styleStubs": 84,
    "styleIndex": 1,
    "shellFiles": 4,
    "data": 8,
    "total": 152
  }
}
```

未解决：旧 shell CSS 已追加逐规则/上下文/属性分析，但尚未跨视口像素比对；相机 customDistance/offset 等数值未逐消费者证明单位；恢复模板的多根节点/动态插槽行为仍应以运行时测试确认；所有远端内容字段不由这8个内嵌JSON穷尽；事件、故事、工具仍依赖其他 manager/controller，本报告的直接引用不是完整调用图。不得将这些事项从清单中删除后宣称与 NASA 全功能一致。

## 实际 CSS 深分析（PostCSS 源码审阅，完整规则目录）

本次使用仓库已安装的 PostCSS 解析 app.css、preload.css、vendors.css；没有请求任何 URL、字体或媒体。以下覆盖所有 rule（包括关键帧百分比与原生嵌套规则）、@media、变量定义/引用、@font-face、keyframes、url()、!important 和 z-index。选择器目录按源码顺序逐规则列出，逗号列表保留在同一条；`父规则 › &...` 表示真实原生嵌套上下文，未声称是展开后的 CSS。恢复 build 只复制 CSS，不会把原生 nesting/:has()/现代 media query 转译；浏览器支持必须纳入新宿主验收。

### 状态与交互语义

`.hidden` 不是统一 display:none。全局 app.css:4905的 `.hidden { display:none }` 以工具类隐藏，但 settings.hidden、carousel.hidden、initialized overlay.hidden、tutorial/panel/menu hidden 等用更高 specificity 的 display:flex/block/unset 配合 opacity/visibility/transform 保留离场动画；`.invisible` 通常保留布局；events-timeline.hidden 仅 opacity:0，子标记/焦点另处理 pointer-events；compare.hidden 用 visibility:hidden，compare.show 设置尺寸与 visibility。React不能把所有 hidden 分支改成条件卸载，否则丢动画/布局/测量。完整状态声明见下方逐规则目录。

- Search：search-open 将结果容器 display:grid/pointer-events:all；featured 面板 scaleY(1)、高度300px并受 `var(--vh)-86px` 限制；search-close .featured.hidden 设置0高、透明与 scaleY(0)。`.result-div.active` 对应 Search.setSelected 的鼠标/键盘选中，粗指针规则取消背景高亮；输入聚焦类提高搜索层级。search-close 在后续样式中 display:none，说明旧版到新版规则在同文件层叠，不能只采用第一个定义。
- Content/Carousel：panel-container.collapsed 展示简单标题条，expanded 隐藏简单条并展示主面板；content-panel-container 的 collapsed 在桌面 translateX(calc(-100% - 20px))，移动条件又 transform:none；featured-stories-panel.hidden 隐藏正文而保留可点击收起钮。c-menu-item 的 collapsed/hidden 将 expanded-container 透明、下移、visibility:hidden，仍保留 flex 结构；items-N/expanded-N 控制底部菜单分配与按钮位置。
- 时间/事件：time-controls.touchactive/hover 与 `:has(.display-container.hidden)` 改变 c-menu container 活跃高度；realtime.hidden 缩放到0并禁点/隐藏；rate-play/rate-pause 和 live/paused颜色是控制器状态投影。事件 active 改线高、白色、伪元素提示及渐变过渡；hidden-slow 使用1秒延迟+1秒淡出，cluster-marker.active 另高亮。
- Distance/Telescope：draggable 使用运行时 --d-panel-x/y/width/height，minimizable/minimized/expanded 操作结果条与测量图形，searching 临时 z-index100防遮挡；fixed 和 draggable 用不同定位。telescope.pick 将拾取UI提到1111/1200，surface/air 状态与经纬度输入布局切换不能当普通实体panel。
- Settings/Overlay/Kiosk：settings active/hidden 使用 bottom fade动画，不是直接卸载；overlay hidden 禁止指针，initialized 后才加入退出动画；kiosk/sessionEnd 用 overlay层级倍数覆盖会话UI。loading/embed 的 show/loading/view/interact 分开控制透明、blur和指针穿透。
- Checkbox/options：checked/selected、radio选择态、icon前缀与 disabled/disable 不是同义词；disabled 的 opacity .5 + pointer-events:none 是UI禁止操作，值/能力仍由服务约束。icon-* 映射 sprite background-position，不能把规则当独立SVG资产或替换品牌几何。

### 样式家族的实际职责

| 家族（类/ID前缀） | 实际规则作用与调用关系 |
|---|---|
| settings / layer-panel / checkbox-option / checked / radio / toggle / slider / eyes-checkbox / eyes-toggle | 设置轨道、图层勾选、光照浮层与输入选择态；Settings/LayerPanel/OptionsBlock动态生成项目，层叠覆盖原生 input 与伪元素。 |
| load-icon / loading-bar / loading-screen / embed-overlay | 启动屏、条动画、旋转和嵌入授权交互遮罩；PreloadManager装配与progress驱动，不能用永久loading覆盖错误。 |
| overlay-container / tutorial-overlay / tutorial-carousel / tutorial-smallprint | 全局遮罩与教程swiper，含渐显、分页、关闭、滑动导航、短屏重排。 |
| search / search-open / search-close / camera-follow / top-right-nav | 搜索栏、结果/建议、焦点与选中，camera-follow复用Search但有独立尺寸/偏移；不是重复组件。 |
| clock / clock-shortcut / time-controller / time-controls / rate-controls / event-time-controls | 日期/时区编辑、实时/重播标识、速率旋钮与暂停图标，时钟面板与底部控制共享c-menu布局。 |
| carousel / carousel-container / panel-container / panel-simple / panel-header / panel-content / swiper | 故事/卡片大面板与简版条、嵌入视频图片、页码、控制按钮、折叠动画；swiper样式决定测量/手势区域。 |
| share-modal / share-button | 55层分享对话框、链接/iframe选项、设备预览比例和剪贴板提示，iframe尺寸由局部CSS变量控制。 |
| breadcrumb / hint-block / toggle-block / image-block / replay-button-block / buttons-block / checkboxes-block | 内容基元的间距、字号、图标/按钮与复选容器；模板params提供文本、控制器动态创建动作。 |
| kiosk / session / force-restart / autoplay / loading-text / toast | kiosk倒计时/开始重试与覆盖层，toast错误/提示的独立固定定位与颜色。 |
| grid-layout / simple-grid / grid-N-12 / ui / static-ui / dynamic-ui / pioneer / float / extended-controls | 全屏宿主网格，场景与UI指针层，header、底部控制与比较viewport定位；断点改变列/行和空白。 |
| pioneer-label-div / pioneer-constellation-label / planet / sun / spacecraft / ring-label | 场景投影标签的颜色、形状、缩放/透明度与选择交互，constellation glow/font与主次标签淡入变量；不等同Three材质。 |
| icon / icon-* / shape / circle / hexagon / crescent / blue/yellow/brown/gray | 图标sprite坐标、尺寸、选中/颜色与类别符号，必须保持原资源路径；新spacelibre品牌不重造NASA图标/标识。 |
| bg-color / color / text / semi / thin / small / large / tiny / x-small / monospace / display / uppercase / capitalize | 天体主题色及文字工具类；monospace后段实际指定Inter而非等宽字体，类名不能当CSS结果。 |
| mega-menu / c-menu-container / c-menu-item / expanded-container / offset / main-viewport | 全站菜单的header、AZ列表、mask显示/隐藏、底部可折叠菜单和触摸扩展；由Menu/CollapsibleMenu控制。 |
| story-block / related-story-block / related-block / special-features / content-block / options-block | 故事卡图/遮罩/标题定位、相关内容列表、功能选项及标题层级；数据有无决定动态DOM。 |
| events-block / toggle-container / tab / selected / events-timeline / event-row / event-line / cluster / focus / timeline-footer | 事件表/时间轴选择、排序箭头、加载、高亮、marker/cluster/焦点时间尺，部分元素由EventsTimeline运行时创建。 |
| overview / description / copy / more / expanded / back-button / title / subtitle / mission-option | 实体标题、分类/形状、返回、阅读更多粘性顶部/滚动区域及轨迹任务选项。 |
| toolbox / tooltip / caret / camera-views / trajectory / nearby / system / follow / texture / surface-map / replay-block | 工具入口、hover/触摸提示、相机/轨迹/纹理/表面选项、事件重播按钮的命中范围和状态。 |
| content-panel / tab-group / sub-tab / drag-handle / expand-btn-group / collapse-button / featured-stories-panel | 右侧/底部内容面板、页签、移动拖柄、展开收起、故事面板，是现代规则原生嵌套主要区域。 |
| compare / left-viewport / right-viewport / compare-view | 双视口尺寸比较与左右信息栏，响应式变更左右布局和标题尺寸；show/hidden保留测量。 |
| distance-panel / result / line-graphic / source-mp / target-mp / rel-velocity / light-time / max-min | 距离工具拖动/最小化、测量点符号、来源目标搜索、交换、结果条/速度光行时与单位，多个stacking contexts。 |
| telescope / telescope-view / coordinate / latitude / longitude / enable-constellations / go-btn-footer | 观察者定位与地面/空中界面、输入提示、可触控放大区域、短屏适配。 |
| os-*（vendors+app覆盖） | OverlayScrollbars包的viewport/glue/observer、滚动条/handle/RTL/resize与明暗主题；app重写theme颜色/尺寸，不是NASA业务状态。 |
| swiper-*（vendors+app覆盖） | 轮播wrapper/slide、3D变换、方向、分页、progressbar、lock/disabled、CSS scroll-snap；不能删除vendor规则只留业务面板CSS。 |
| tippy-* | 提示框placement/arrow/content/动画和交互状态；由ToolboxBlock等tippy调用生成，不在55模板静态markup内。 |
| GLOBAL / 标签规则 / * / :root | reset、字体、颜色token、viewport/排版和动效定义；全局user-select:none例外input/textarea会影响新宿主可访问性。 |

### 响应式与层叠规则

app 不是单一移动/桌面断点：320、481、640/641、767/768、915、960/961、1024/1025、1300宽，以及370/481/500/600/641/900/1366高和方向/hover/pointer条件共同参与。min/max为包含边界，641、1025等边界可能同时命中；先比较importance与specificity，再比较同权重源码顺序，不能“最后一个media整个覆盖前面”。`(max-width:1025px) or (max-height:600px)` 是媒体条件or；不等于and。每个实际media的规则范围与属性见下附录，旧/新两组样式并存需按最终cascade理解。

基础 body 固定满屏/禁overscroll，后段 body/html 又 position:relative、overflow:hidden；html高度依 --vh，缺少运行时设置会影响所有calc高度。通用网格先有small/mobile默认，≥961常把面板移到桌面侧区；≥1025且高≥600调整桌面字号/控制布局，短高度条件对教程/分享/面板提供独立补丁。pointer:fine+hover 提供hover高亮，coarse/hover:none减少hover假态并放大触摸控制。

z-index 必须按 stacking context 解释：dynamic-ui=1；compare=10；底部clock/time/events=20；内容/故事=30；settings容器=40；header/toast=50；mega-menu=51；share=55；overlay型内容=60；搜索中的distance临时=100；telescope拾取1111/1200；全局overlay变量9999；kiosk/session=19998，loading-text=39996。这些数值不能脱离祖先transform/opacity/position比较。load-icon早段1000被后段同specificity `.load-icon` 改为1，是必须按顺序读取的例子。负值伪元素/背景和nav(-10)用于本地层，不意味着在所有页面内容后。

### 字体、变量、外部资源与可访问性

@font-face 定义 Metropolis、Inter、DMMono；字体权重、src及每个调用位置均见结构目录。body主要Metropolis300，后续内容面板/分享/导航Inter fallback；constellation标签DMMono。颜色token含NASA天体/类别/live/error/paused与灰阶，不是spacelibre VI palette；新品牌表面必须重新映射角色，不直接挪整套NASA色。运行时几何变量含 --vh、distance拖动、focus marker、container宽高，CSS-only快照不提供它们的值。变量引用和本地定义不相等不必然错误：JS可能setProperty，以下逐项列出供控制服务接线。

全局 * 禁止选择，input/textarea恢复text；button去边框/背景，a统一颜色；body/html锁滚动，滚动依内部面板。新实现需要自行保留键盘focus可见性、屏幕阅读顺序、触摸/缩放和reduced-motion支持；这里记录旧行为并不建议逐项复制。源码未提供全局prefers-reduced-motion分支。!important集中在vendor几何/重置及部分业务覆盖，完整声明列出，迁移时优先按局部组件边界移除冲突。

### `eyes/shell/app.css` 结构与完整证据

PostCSS解析成功；258354 UTF-8 bytes；2087 rule节点；5892 declaration；178 media块（去重36）；0 important；143变量定义；152不同变量引用；82 url()。

#### @media 完整目录

| 行 | 条件 | 直属/后代规则数 | 改动属性集合 |
|---|---|---:|---|
| 147 | `(pointer: fine) and (hover: hover)` | 1 | opacity |
| 153 | `only screen and (min-width: 320px)` | 5 | margin-bottom, margin-left, animation-duration, animation-fill-mode, animation-iteration-count, animation-name, animation-timing-function, display, row-gap, bottom |
| 180 | `only screen and (min-width: 320px) and (orientation: landscape)` | 1 | bottom, right |
| 186 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 1 | bottom, right |
| 272 | `only screen and (min-width: 961px)` | 1 | transform |
| 290 | `(pointer: fine) and (hover: hover)` | 1 | background, width |
| 340 | `(pointer: fine) and (hover: hover)` | 1 | opacity |
| 345 | `only screen and (min-width: 320px) and (orientation: landscape)` | 1 | left, width |
| 397 | `(hover: hover)` | 2 | background-size, color, transition, filter, transform |
| 569 | `only screen and (min-width: 320px)` | 2 | grid-template-areas, grid-template-columns, margin, width, display |
| 580 | `(pointer: coarse)` | 1 | background-color, cursor |
| 634 | `only screen and (min-width: 320px)` | 3 | grid-column, grid-row, gap, justify-content, margin, text-align |
| 649 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 4 | grid-column, grid-row, margin-left, text-align, outline-offset |
| 682 | `(pointer: fine) and (hover: hover)` | 1 | background-color, cursor |
| 697 | `(pointer: fine) and (hover: hover)` | 1 | background-color |
| 707 | `(pointer: fine) and (hover: hover)` | 1 | background-color, cursor |
| 716 | `(pointer: fine) and (hover: hover)` | 1 | color |
| 724 | `(pointer: fine) and (hover: hover)` | 1 | color |
| 890 | `(pointer: fine) and (hover: hover)` | 1 | animation-duration, animation-iteration-count, animation-name, cursor |
| 1017 | `only screen and (min-width: 320px)` | 11 | -webkit-mask-image, mask-image, justify-content, padding, flex-flow, flex-wrap, margin-left, margin-right, bottom, height, transform, display |
| 1067 | `only screen and (min-width: 320px) and (orientation: landscape)` | 2 | padding, flex-flow, flex-wrap |
| 1076 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 10 | align-content, -webkit-mask-image, mask-image, display, justify-content, padding, flex-flow, flex-wrap, height, top, margin |
| 1381 | `only screen and (max-width: 641px) and (orientation: portrait)` | 1 | opacity, transition-duration, visibility |
| 1393 | `only screen and (max-height: 641px)` | 2 | height, opacity, visibility, transition-duration |
| 1404 | `only screen and (max-height: 481px)` | 2 | transform |
| 1415 | `only screen and (min-width: 320px) and (max-width: 767px)` | 2 | transform, z-index |
| 1427 | `only screen and (max-width: 481px)` | 1 | content |
| 1433 | `(pointer: fine) and (hover: hover)` | 2 | filter, color, transition |
| 1659 | `(pointer: fine) and (hover: hover)` | 3 | opacity, color, filter, transition |
| 1707 | `only screen and (max-width: 641px) and (orientation: portrait)` | 11 | align-self, grid-column, grid-row-end, grid-row-start, min-width, padding, top, bottom, left, margin, transition, position, transform, border-radius, margin-top, text-align |
| 1758 | `only screen and (max-width: 641px) and (orientation: landscape)` | 1 | padding |
| 1763 | `only screen and (min-width: 961px)` | 9 | min-width, font-size, padding, flex-shrink, transform, transform-origin |
| 1796 | `only screen and (max-height: 900px)` | 5 | padding, bottom, inset, content, margin |
| 1816 | `only screen and (max-height: 641px)` | 6 | margin-bottom, padding, margin-top, bottom, margin |
| 1837 | `only screen and (max-height: 641px) and (min-width: 641px)` | 1 | grid-row-end |
| 1842 | `only screen and (max-height: 500px)` | 4 | align-self, grid-row-end, top, border-radius, height, display |
| 1858 | `only screen and (max-height: 370px)` | 1 | margin |
| 2258 | `only screen and (min-width: 961px)` | 13 | width, display, gap, grid-auto-columns, grid-auto-flow, grid-auto-rows, height, justify-content, padding, margin, position, background-color, bottom, content, left, right, transform, transition, z-index, max-width, padding-right |
| 2319 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 1 | background-color, color, gap, margin, width |
| 2328 | `(max-height: 600px)` | 2 | display, padding |
| 2416 | `(pointer: fine) and (hover: hover)` | 2 | opacity, background-color |
| 2429 | `only screen and (min-width: 320px)` | 4 | margin-left, width, height |
| 2445 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 4 | margin-left, width, height |
| 2535 | `(pointer: fine) and (hover: hover)` | 1 | background-color |
| 2540 | `only screen and (min-width: 320px)` | 4 | background, bottom, left, position, right, width, z-index, display, gap, grid-template-columns, padding, justify-content, transform |
| 2563 | `only screen and (min-width: 320px) and (orientation: landscape), only screen and (min-width: 641px) and (orientation: portrait)` | 1 | display, gap, grid-template-columns, grid-template-rows, padding |
| 2572 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 7 | background, border-radius, bottom, left, position, right, width, display, grid-template-columns, padding, border-bottom, border-right, border, justify-content, opacity, transform |
| 2601 | `(pointer: fine) and (hover: hover)` | 1 | opacity |
| 2663 | `(pointer: fine) and (hover: hover)` | 2 | opacity |
| 2671 | `only screen and (min-width: 320px)` | 4 | grid-auto-flow, display, grid-template-columns, padding-left |
| 2678 | `(pointer: coarse)` | 2 | display, grid-template-columns, padding-left |
| 2689 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 3 | grid-auto-flow, align-items, display, grid-template-columns, padding |
| 2699 | `(pointer: coarse)` | 1 | display, padding |
| 2737 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 1 | font-size |
| 2785 | `only screen and (min-width: 320px)` | 1 | font-size, height, margin-bottom, padding-bottom |
| 2793 | `only screen and (max-height: 600px) and (orientation: landscape)` | 3 | flex-direction, display, height, justify-content, margin-bottom, width, flex-flow |
| 2812 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 1 | font-size, height, padding-bottom |
| 2838 | `only screen and (min-width: 320px)` | 4 | font-size, margin-top, margin-bottom, line-height |
| 2854 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 3 | font-size, margin-bottom |
| 3006 | `only screen and (min-width: 320px)` | 12 | align-content, align-self, grid-column, grid-row, height, overflow, transition, animation-direction, animation-duration, animation-fill-mode, animation-iteration-count, animation-name, animation-timing-function, line-height, padding, display, flex, flex-direction, justify-content, background, animation |
| 3073 | `only screen and (min-width: 320px) and (orientation: landscape)` | 4 | grid-row, height, bottom, display |
| 3088 | `only screen and (min-width: 641px) and (orientation: portrait)` | 1 | height |
| 3093 | `only screen and (min-width: 961px) and (orientation: landscape)` | 4 | height, bottom, display |
| 3107 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 12 | grid-column, grid-row, height, margin, position, padding, animation, background, font-size, display, animation-fill-mode, background-size, content, right, top, width |
| 3138 | `(pointer: fine) and (hover: hover)` | 4 | animation, animation-fill-mode, background, background-size, content, grid-column, height, position, right, top, width |
| 3398 | `(max-width: 1025px) or (max-height: 600px)` | 2 | align-self, grid-column, grid-row, justify-self, margin, max-width |
| 3410 | `(min-width: 1025px)` | 1 | grid-column, grid-row, justify-self, margin |
| 3773 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 3796 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 3902 | `(pointer: fine) and (hover: hover)` | 1 | opacity |
| 3915 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 3928 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 3961 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 3974 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 3987 | `(pointer: fine) and (hover: hover)` | 2 | background-position, height, width |
| 4011 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 4030 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 4043 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 4056 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 4069 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 4082 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 4095 | `(pointer: fine) and (hover: hover)` | 2 | background-position, height, width |
| 4119 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 4162 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 4175 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 4208 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 4221 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 4234 | `(pointer: fine) and (hover: hover)` | 1 | background-position, height, width |
| 4292 | `(pointer: fine) and (hover: hover)` | 2 | background, opacity |
| 4337 | `only screen and (min-width: 320px) and (orientation: landscape), only screen and (min-width: 641px) and (orientation: portrait)` | 1 | --rowGap, --columnGap, padding |
| 4344 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 1 | --rowGap, --columnGap, padding |
| 4419 | `only screen and (min-width: 320px)` | 6 | align-self, grid-column, grid-row, justify-self, grid-template-columns, grid-template-rows, display, border-top, margin-bottom, padding-top |
| 4446 | `only screen and (min-width: 320px) and (orientation: landscape)` | 1 | grid-template-columns, grid-template-rows |
| 4452 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 6 | align-self, grid-column, grid-row, justify-self, grid-template-columns, grid-template-rows, display, border-top, margin-bottom, padding-top |
| 4494 | `only screen and (min-width: 320px)` | 10 | grid-column, grid-row, align-items, display, gap, grid-area, grid-template-columns, justify-content, margin, align-self, justify-self, margin-bottom, padding-right, position, width, bottom, grid-template-rows, justify-items |
| 4557 | `only screen and (min-width: 320px) and (orientation: landscape)` | 5 | margin, align-items, align-self, display, grid-column, grid-row, justify-content, justify-self, margin-bottom, padding-bottom, padding-right, gap, grid-template-columns, grid-template-rows, height, margin-left, width |
| 4596 | `only screen and (min-width: 641px) and (orientation: portrait)` | 1 | align-items, align-self, display, grid-column, grid-row, height, justify-content, justify-self, margin-bottom, padding-bottom, padding-right |
| 4611 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 7 | grid-column, grid-row, display, gap, grid-template-columns, grid-template-rows, height, margin, align-items, align-self, justify-self, margin-bottom, padding, width, justify-items, position |
| 4720 | `(pointer: fine) and (hover: hover)` | 3 | transform, transform-origin, opacity |
| 4739 | `(pointer: fine) and (hover: hover)` | 2 | transform |
| 4772 | `(pointer: fine) and (hover: hover)` | 3 | transform, opacity |
| 4841 | `(pointer: fine) and (hover: hover)` | 1 | cursor, filter, text-shadow |
| 4860 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 2 | font-size |
| 4927 | `(pointer: fine) and (hover: hover)` | 1 | opacity |
| 5082 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 1 | display |
| 5087 | `(pointer: coarse)` | 1 | display |
| 5186 | `(pointer: fine) and (hover: hover)` | 1 | background-color |
| 5462 | `(pointer: fine) and (hover: hover)` | 2 | background, opacity |
| 5823 | `only screen and (min-width: 320px)` | 1 | margin-right |
| 5828 | `only screen and (min-width: 320px) and (orientation: landscape)` | 1 | margin-right |
| 5833 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 3 | grid-row, margin, height, margin-right |
| 6084 | `only screen and (max-width: 641px) and (orientation: portrait)` | 1 | font-size |
| 6091 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 1 | justify-content |
| 6112 | `only screen and (min-width: 961px)` | 1 | grid-row |
| 6117 | `only screen and (min-width: 1024px) and (max-height: 1366px)` | 1 | grid-column |
| 6122 | `only screen and (min-width: 1300px)` | 1 | grid-column, justify-self |
| 6132 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 2 | grid-template-areas, grid-template-columns, width, display |
| 6191 | `only screen and (min-width: 1025px)` | 1 | background-image |
| 6254 | `only screen and (min-width: 320px)` | 1 | justify-self, margin-bottom, order |
| 6261 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 1 | display |
| 6418 | `only screen and (min-width: 320px)` | 24 | border-bottom, height, overflow, display, grid-auto-flow, margin, padding, justify-self, font-size, text-align, align-items, justify-items, pointer-events, width, padding-top, opacity, background-color, border-radius, text-decoration, border, justify-content, transform, margin-left |
| 6531 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 31 | display, height, padding-right, filter, transform, border-bottom, overflow, letter-spacing, margin-left, opacity, transition, grid-auto-flow, margin, padding, align-items, font-size, border-right, border-left, gap, grid-template-rows, justify-items, padding-bottom, justify-content, border, align-content |
| 6654 | `(pointer: fine) and (hover: hover)` | 2 | opacity, text-decoration |
| 6940 | `(pointer: fine) and (hover: hover)` | 3 | background, color, opacity |
| 6952 | `only screen and (min-width: 320px) and (orientation: landscape)` | 1 | grid-template-columns |
| 6957 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 1 | grid-template-columns |
| 6962 | `only screen and (min-width: 1025px) and (max-width: 1300px) and (min-height: 600px)` | 1 | filter |
| 7162 | `only screen and (min-width: 320px) and (max-width: 1025px)` | 2 | gap, height |
| 7221 | `only screen and (min-width: 320px) and (max-width: 1025px)` | 3 | width, margin-top |
| 7268 | `only screen and (min-width: 320px) and (max-width: 1025px)` | 5 | height, padding |
| 7283 | `only screen and (min-width: 320px) and (orientation: landscape)` | 1 | margin-bottom |
| 7288 | `only screen and (min-width: 641px)` | 2 | margin-top |
| 7295 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 2 | margin-top |
| 7632 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 1 | margin-top |
| 7637 | `only screen and (min-width: 320px) and (max-width: 1025px)` | 1 | border-top |
| 7657 | `only screen and (max-width: 960px)` | 0 | transform |
| 7728 | `(pointer: fine) and (hover: hover)` | 1 | background, color |
| 7810 | `(pointer: fine) and (hover: hover)` | 3 | background, color, opacity |
| 7822 | `only screen and (min-width: 320px) and (orientation: landscape)` | 1 | grid-template-columns |
| 7827 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 1 | grid-template-columns |
| 7956 | `(hover: none)` | 0 | filter |
| 8138 | `only screen and (min-width: 320px) and (max-width: 1025px)` | 34 | grid-column, grid-row, margin, width, margin-bottom, min-height, display, margin-top, border-radius, height, transform, gap, right, top, background, opacity, border, flex-direction, background-color, cursor, left, position, z-index, content, inset, bottom, padding, pointer-events, align-items, color, flex-grow, justify-content, font-weight, padding-bottom, background-image, background-position, background-repeat, background-size, flex, grid-template-columns, font-size, transition, filter |
| 8313 | `only screen and (min-width: 320px) and (orientation: landscape)` | 6 | margin-top |
| 8330 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 6 | top, margin-top, padding-left |
| 8375 | `only screen and (min-width: 320px)` | 7 | padding, background, padding-bottom, align-items, display, grid-template-columns, grid-template-rows, align-self, gap, justify-self |
| 8406 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 13 | padding, display, padding-right, color, grid-column, grid-row, background, border-radius, justify-self, cursor, pointer-events |
| 8551 | `(pointer: fine) and (hover: hover)` | 2 | opacity, color |
| 8561 | `only screen and (min-width: 320px)` | 7 | background, height, left, opacity, position, top, width, grid-column, grid-row, padding, padding-left, padding-right, margin-bottom, padding-bottom, right, display |
| 8599 | `only screen and (min-width: 320px) and (orientation: landscape)` | 10 | left, height, top, width, background, opacity, margin-bottom, grid-column, grid-row, padding, margin-top, padding-bottom, padding-right |
| 8646 | `only screen and (min-width: 641px) and (orientation: portrait)` | 1 | right |
| 8651 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 5 | display, padding-bottom, padding-top, text-align, margin-bottom, right |
| 8704 | `only screen and (min-width: 320px)` | 1 | width |
| 8709 | `only screen and (min-width: 320px) and (orientation: landscape)` | 1 | width |
| 8730 | `only screen and (min-width: 640px) and (orientation: landscape)` | 1 | background-color, pointer-events, z-index |
| 8737 | `only screen and (min-width: 915px) and (orientation: portrait)` | 1 | background-color, pointer-events, z-index |
| 9395 | `only screen and (orientation: landscape) and (max-height: 600px)` | 1 | margin-right |
| 9400 | `(pointer: fine) and (hover: hover)` | 11 | opacity, filter, transition-delay, transition-duration, margin-left, left, transform, border-color |
| 9523 | `only screen and (min-width: 320px) and (max-width: 1025px)` | 1 | background-color |
| 10006 | `only screen and (min-width: 320px) and (max-width: 1025px)` | 1 | background-color, height, left, opacity, transform, width |
| 10147 | `(pointer: fine) and (hover: hover)` | 1 | display |
| 10196 | `only screen and (min-width: 320px) and (max-width: 1025px)` | 1 | margin-bottom |
| 10201 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 2 | margin, max-width, transition, left, transition-delay, transition-duration |
| 10213 | `only screen and (orientation: landscape) and (max-height: 600px)` | 1 | margin |
| 10218 | `(pointer: fine) and (hover: hover)` | 1 | margin-bottom, transition |
| 10219 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 1 | margin-bottom, transition |
| 10384 | `only screen and (min-width: 641px)` | 3 | bottom, left, right |
| 10395 | `only screen and (orientation: landscape) and (max-height: 600px)` | 2 | pointer-events, bottom |
| 10403 | `(pointer: fine) and (hover: hover)` | 6 | opacity, pointer-events, z-index, transition-duration, visibility, left, transform, transition-delay, right, color, box-shadow, transition |
| 10409 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 3 | opacity, transition-duration, visibility, left, transform, transition-delay, right |
| 10547 | `only screen and (orientation: landscape) and (max-height: 600px)` | 1 | transform |
| 10552 | `(pointer: fine) and (hover: hover)` | 5 | transform, transition, opacity, transition-delay, transition-duration, visibility, filter |
| 10769 | `only screen and (max-width: 641px) and (orientation: portrait)` | 2 | padding, width |
| 10777 | `only screen and (min-width: 961px)` | 1 | transition-delay |
| 11019 | `only screen and (min-width: 320px) and (max-width: 767px)` | 6 | left, bottom, align-self, grid-column-start, justify-self |
| 11042 | `only screen and (min-width: 320px)` | 3 | display, gap, grid-template-columns, margin-left, margin-right, width |
| 11058 | `only screen and (min-width: 320px) and (orientation: landscape), only screen and (min-width: 641px) and (orientation: portrait)` | 3 | gap, margin-left, margin-right, width |
| 11072 | `only screen and (min-width: 768px) and (max-width: 1024px)` | 2 | left, bottom |
| 11080 | `only screen and (min-width: 1025px) and (min-height: 600px)` | 15 | display, margin, grid-template-columns, margin-right, padding-right, z-index, text-transform, align-items, margin-left, margin-top, max-width, border-right, width |

#### 变量定义（含局部scope）

| 行 | scope | 定义 |
|---|---|---|
| 278 | `:root` | `--overlay-z-index: 9999` |
| 1152 | `#tutorial-overlay .swiper` | `--swiper-pagination-bullet-horizontal-gap: 0` |
| 1153 | `#tutorial-overlay .swiper` | `--swiper-pagination-color: var(--grayblueMed)` |
| 1154 | `#tutorial-overlay .swiper` | `--swiper-pagination-bullet-inactive-color: var(--grayblueMed)` |
| 1444 | `#panel-container` | `--sandMed: #cbb296` |
| 1609 | `.panel-content .swiper` | `--swiper-pagination-bullet-horizontal-gap: 0` |
| 1610 | `.panel-content .swiper` | `--swiper-pagination-color: var(--grayblueMed)` |
| 1611 | `.panel-content .swiper` | `--swiper-pagination-bullet-inactive-color: var(--grayblueMed)` |
| 1899 | `#share-modal` | `--embed-aspect-ratio: 1.777` |
| 1900 | `#share-modal` | `--iframe-width: 100%` |
| 1901 | `#share-modal` | `--iframe-height: 100%` |
| 1902 | `#share-modal` | `--iframe-scale: 0.3` |
| 1903 | `#share-modal` | `--iframe-offset-x: 0` |
| 2608 | `.breadcrumb` | `--inactiveOpacity: 0.7` |
| 2609 | `.breadcrumb` | `--activeOpacity: 1.0` |
| 2820 | `.carousel .content-block` | `--highlightNumber: #ff0` |
| 2983 | `.carousel-container` | `--story-height: calc((var(--vh) - 4px)*2/5)` |
| 3497 | `:root` | `--ease-out-bezier: cubic-bezier(0.2,0.2,0,1)` |
| 3604 | `:root` | `--black: #000` |
| 3605 | `:root` | `--blackAlpha: #00000380` |
| 3606 | `:root` | `--white: #fff` |
| 3607 | `:root` | `--whiteAlpha15: #ffffff26` |
| 3608 | `:root` | `--gray: #95959d` |
| 3609 | `:root` | `--grayAlpha: #95959d33` |
| 3610 | `:root` | `--grayMed: #c6c6c9` |
| 3611 | `:root` | `--grayLight: #eaeaeb` |
| 3612 | `:root` | `--grayDark: #252527` |
| 3613 | `:root` | `--grayDarkAlpha: #25252799` |
| 3614 | `:root` | `--grayDarkAlpha80: #252527cc` |
| 3615 | `:root` | `--cta-blue: #3e63dd` |
| 3616 | `:root` | `--toast-bg-color: #c6d4f9` |
| 3617 | `:root` | `--grayblueWhite: #f0f8fc` |
| 3618 | `:root` | `--grayblueLight: #d2e1e8` |
| 3619 | `:root` | `--grayblueMed: #a4bac1` |
| 3620 | `:root` | `--grayblueText: #83959b` |
| 3621 | `:root` | `--grayblueDivider: #25282b` |
| 3622 | `:root` | `--grayblueBackground: #151a1d` |
| 3623 | `:root` | `--grayblueButton: #425571` |
| 3624 | `:root` | `--live: #47da84` |
| 3625 | `:root` | `--liveAlpha: #47da84bf` |
| 3626 | `:root` | `--error: #d55033` |
| 3627 | `:root` | `--grayDivider: #37373a` |
| 3628 | `:root` | `--bgGradient: linear-gradient( 180deg,#272527,rgba(37,37,39,.8) 52.08%,rgba(37,37,39,0))` |
| 3630 | `:root` | `--mobileBgGradient: linear-gradient( 180deg,#252527ee,rgba(37,37,39,.85) 52.08%,rgba(0,0,0,.8))` |
| 3632 | `:root` | `--sun: #f7f4df` |
| 3633 | `:root` | `--sunMed: #b8b7a7` |
| 3634 | `:root` | `--sunDark: #626259` |
| 3635 | `:root` | `--mercury: #9768ac` |
| 3636 | `:root` | `--mercuryMed: #714e81` |
| 3637 | `:root` | `--mercuryDark: #3c2a45` |
| 3638 | `:root` | `--venus: #b07919` |
| 3639 | `:root` | `--venusMed: #845b13` |
| 3640 | `:root` | `--venusDark: #46300a` |
| 3641 | `:root` | `--earth: #09c` |
| 3642 | `:root` | `--earthMed: #007399` |
| 3643 | `:root` | `--earthDark: #003d52` |
| 3644 | `:root` | `--mars: #9a4e19` |
| 3645 | `:root` | `--marsMed: #733a13` |
| 3646 | `:root` | `--marsDark: #3d1f0a` |
| 3647 | `:root` | `--jupiter: #da8b72` |
| 3648 | `:root` | `--jupiterMed: #a36855` |
| 3649 | `:root` | `--jupiterDark: #57382e` |
| 3650 | `:root` | `--saturn: #d5c187` |
| 3651 | `:root` | `--saturnMed: #786d4c` |
| 3652 | `:root` | `--saturnDark: #554d36` |
| 3653 | `:root` | `--uranus: #68ccda` |
| 3654 | `:root` | `--uranusMed: #4e99a3` |
| 3655 | `:root` | `--uranusDark: #2a5257` |
| 3656 | `:root` | `--neptune: #708ce3` |
| 3657 | `:root` | `--neptuneMed: #5469aa` |
| 3658 | `:root` | `--neptuneDark: #2d385b` |
| 3659 | `:root` | `--nasa-blue: #288bff` |
| 3660 | `:root` | `--spacecraft: #cd9745` |
| 3661 | `:root` | `--moon: #b6acac` |
| 3662 | `:root` | `--dwarfPlanet: #929871` |
| 3663 | `:root` | `--comet: #7e86b0` |
| 3664 | `:root` | `--asteroid: #806262` |
| 3665 | `:root` | `--constellation: #59b2ff` |
| 3666 | `:root` | `--constellationGlow: #287bc4` |
| 3667 | `:root` | `--constellationGlowMed: #165d9b` |
| 3668 | `:root` | `--constellationGlowDark: #070a99` |
| 4243 | `:root` | `--customIconLabelMargin: 50%` |
| 4330 | `.simple-grid` | `--rowGap: 4px` |
| 4331 | `.simple-grid` | `--columnGap: 8px` |
| 4339 | `@media only screen and (min-width: 320px) and (orientation: landscape), only screen and (min-width: 641px) and (orientation: portrait) › .simple-grid` | `--rowGap: 4px` |
| 4340 | `@media only screen and (min-width: 320px) and (orientation: landscape), only screen and (min-width: 641px) and (orientation: portrait) › .simple-grid` | `--columnGap: 4px` |
| 4346 | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .simple-grid` | `--rowGap: 20px` |
| 4347 | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .simple-grid` | `--columnGap: 24px` |
| 4483 | `:root` | `--gridHeaderHeight: 75px` |
| 4665 | `.pioneer-constellation-label` | `--constellationFadeIn: 1.0` |
| 4666 | `.pioneer-constellation-label` | `--constellationFadeOut: 0.05` |
| 4669 | `.pioneer-label-div` | `--fontSize: 16px` |
| 4670 | `.pioneer-label-div` | `--fontSizeLarge: 18px` |
| 4671 | `.pioneer-label-div` | `--fontSizeSmall: 14px` |
| 4672 | `.pioneer-label-div` | `--fontSizeXSmall: 12px` |
| 4673 | `.pioneer-label-div` | `--fontSizeTiny: 10px` |
| 4674 | `.pioneer-label-div` | `--secondaryFadeIn: 0.35` |
| 4675 | `.pioneer-label-div` | `--secondaryFadeOut: 0.05` |
| 4676 | `.pioneer-label-div` | `--primaryFadeIn: 0.75` |
| 4677 | `.pioneer-label-div` | `--primaryFadeOut: 0.05` |
| 4678 | `.pioneer-label-div` | `--hoverOpacity: 1` |
| 5479 | `:root` | `--settings: #0d67ff` |
| 5480 | `:root` | `--settingsAlt: #6180b6` |
| 5481 | `:root` | `--paused: #ff9a42` |
| 5482 | `:root` | `--pausedAlpha: #ff9a42bf` |
| 5483 | `:root` | `--distance-tool-color: #7a90a8` |
| 5484 | `:root` | `--border-gray: #ffffff50` |
| 5485 | `:root` | `--tab-border-gray: #606060` |
| 5486 | `:root` | `--overlayBgGradient: linear-gradient( 180deg,#252527,rgba(0,0,0,.95) 52.08%,rgba(0,0,0,.9))` |
| 5488 | `:root` | `--menuGradient: linear-gradient( 180deg,#252527 0.7%,#000)` |
| 5490 | `:root` | `--horizonalFade: linear-gradient( to bottom,#000 0,var(--gray) 30%,var(--gray) 70%,#000)` |
| 5492 | `:root` | `--verticalFade: linear-gradient( to right,#000 0,var(--gray) 30%,var(--gray) 70%,#000)` |
| 5494 | `:root` | `--horizontalHighlight: linear-gradient( 100deg,#434347 30%,rgba(37,37,39,0))` |
| 5496 | `:root` | `--textBgGradient: linear-gradient( 0deg,#000000cc 0%,#000000aa 20%,#00000000)` |
| 5498 | `:root` | `--darkGrayBgGradientBtm: linear-gradient( to bottom,var(--grayDarkAlpha) 0%,#17171bcc 100%)` |
| 5500 | `:root` | `--darkGrayBgGradientTop: linear-gradient( 0deg,#212123 0%,#17171b)` |
| 5502 | `:root` | `--darkGrayGradientLeft: linear-gradient( 90deg,#484848,#313131)` |
| 5504 | `:root` | `--blackGradientVert: linear-gradient( 180deg,rgba(16,15,18,.95) 21.2%,rgba(18,16,18,.85) 84.8%)` |
| 5506 | `:root` | `--panelBg: #181818` |
| 5759 | `:root` | `--settings-z-index: 40` |
| 6143 | `:root` | `--offset-right: 12vw` |
| 6144 | `:root` | `--offset-up: 18vh` |
| 6201 | `#dynamic-ui` | `--bgDark: rgba(0,0,0,.85)` |
| 6202 | `#dynamic-ui` | `--bgMed: rgba(0,0,0,.75)` |
| 6267 | `.mega-menu` | `--headerHeight: 75px` |
| 6268 | `.mega-menu` | `--mobileHeaderHeight: 70px` |
| 6269 | `.mega-menu` | `--mobileAZHeight: 70px` |
| 7303 | `.toolbox-block` | `--tooltip-top-margin: 0` |
| 7833 | `:root` | `--content-bottom-margin: 10em` |
| 7834 | `:root` | `--custom-overview-border: none` |
| 7835 | `:root` | `--collapsible-bottom-margin: 1em` |
| 8719 | `.distance-panel-container` | `--d-panel-x: unset` |
| 8720 | `.distance-panel-container` | `--d-panel-y: unset` |
| 8721 | `.distance-panel-container` | `--d-panel-width: unset` |
| 8722 | `.distance-panel-container` | `--d-panel-height: unset` |
| 8723 | `.distance-panel-container` | `--d-panel-collapsed-height: unset` |
| 8999 | `.distance-panel .line-graphic-container` | `--focus-dot-mp-mult: 1` |
| 9140 | `.line-graphic-container.centered-dot:has(button.source-mp-toggle.surface):has(button.target-mp-toggle.center)` | `--focus-dot-mp-mult: 0.87` |
| 9143 | `.line-graphic-container.centered-dot:has(button.source-mp-toggle.center):has(button.target-mp-toggle.surface)` | `--focus-dot-mp-mult: 1.14` |
| 9740 | `.events-timeline .focus-container` | `--fpMarker-scaleX: 0.08` |
| 10246 | `nav.c-menu-container .c-menu-item` | `--container-width: 100%` |
| 10247 | `nav.c-menu-container .c-menu-item` | `--container-height: 100%` |
| 10248 | `nav.c-menu-container .c-menu-item` | `--container-height-active: 100%` |

变量引用 → 全部源码行：

- `--black` → 66, 430, 828, 2753, 5512, 5515, 5546, 6050, 6289
- `--vh` → 67, 298, 356, 431, 804, 2763, 2983, 4554, 4892, 6291, 6421, 6425, 6457, 6467, 6547, 8540, 8546, 8548, 8605, 8614
- `--grayDark` → 98, 491, 544, 3373, 4440, 4852, 5039, 5046, 5047, 5052, 5055, 5058, 5061, 5071, 5518, 5521, 6333, 6390, 6449, 6488, 6550, 6582, 6585, 6617, 6622, 6743, 6866, 7465, 8485, 8685, 8692, 8988, 10849, 10855, 10875, 10876, 10889, 10932, 10991, 10998, 11142
- `--bgGradient` → 120, 1517, 2489, 2574
- `--ease-out-bezier` → 200, 362, 370, 1135, 1165, 1171, 1203, 1229, 1237, 1271, 1321, 1345, 1458, 1493, 1497, 1530, 1587, 1591, 1601, 1606, 1617, 1630, 1636, 1725, 1988, 1999, 2291, 3353, 3392, 3562, 3601, 5880, 6002, 6104, 6157, 6169, 6250, 6313, 6368, 6369, 6370, 6669, 7866, 7891, 7944, 7997, 8718, 8771, 8778, 8837, 8891, 8926, 9015, 9055, 9067, 9104, 9136, 9171, 9233, 9240, 9344, 9455, 9484, 9488, 9494, 9598, 9605, 10030, 10040, 10053, 10178, 10205, 10223, 10244, 10282, 10310, 10351, 10367, 10454, 10474, 10493, 10508, 10520, 10527, 10555, 10667, 10742
- `--offset-right-sm` → 208
- `--offset-up` → 212, 6147, 6182, 6187
- `--grayLight` → 217, 2076, 2137, 2153, 2195, 5048, 5536, 5539, 6274, 7436, 7474, 8006, 8033, 8304, 9241
- `--offset-right-lg` → 274
- `--gray` → 287, 292, 714, 2030, 2065, 2119, 2200, 2215, 2254, 2471, 2537, 5076, 5490, 5492, 5524, 5527, 6749, 6787, 6817, 6872, 7450, 7487, 8418, 8499, 8519, 10034, 10325, 10361, 10726, 10727
- `--overlay-z-index` → 304, 3246, 3260, 3331, 7360
- `--grayDivider` → 353, 1960, 2049, 2061, 2151, 2245
- `--grayMed` → 393, 2165, 2204, 2322, 2626, 5530, 5533, 6006, 8100, 8290, 8968, 9324, 9478, 10017
- `--white` → 400, 449, 718, 802, 831, 947, 1867, 2748, 2752, 2874, 2892, 4679, 4895, 4920, 4974, 5509, 5965, 5988, 6732, 6855, 6943, 7342, 7492, 7731, 7813, 8558, 10449, 10452
- `--grayAlpha` → 423, 468, 684, 2423, 2888, 4294, 5464, 6942, 7264, 7628, 7730, 7812
- `--grayDarkAlpha80` → 513, 2049, 3503, 3530, 8930
- `--whiteAlpha15` → 529, 955, 2746
- `--grayDarkAlpha` → 674, 2414, 2872, 5216, 5498, 6026, 6889, 7750, 10726
- `--liveAlpha` → 699, 10478
- `--live` → 722, 726, 5735, 5738, 10477, 10684, 10720
- `--tutorial-mask-grad` → 1121, 1122
- `--tutorial-mask-pos` → 1123, 1124
- `--tutorial-mask-size` → 1127, 1128
- `--grayblueMed` → 1153, 1154, 1180, 1209, 1218, 1285, 1324, 1584, 1610, 1611
- `--grayblueWhite` → 1174, 1439, 1590, 1664
- `--grayblueText` → 1207, 1326, 1349, 1478, 1561, 1674
- `--grayblueDivider` → 1241
- `--grayblueLight` → 1357
- `--sandMed` → 1594
- `--cta-blue` → 1865, 1885, 1980, 2074, 2283, 2475, 6773, 6835, 6839, 7470, 7490, 7703, 7739
- `--blackAlpha` → 1891, 2192
- `--darkGrayBgGradientBtm` → 1911, 2092
- `--blackGradientVert` → 2036, 2057, 2150, 8760
- `--iframe-height` → 2128
- `--iframe-scale` → 2132
- `--iframe-offset-x` → 2132
- `--iframe-width` → 2134
- `--nasa-blue` → 2193
- `--mobileBgGradient` → 2542
- `--inactiveOpacity` → 2649, 2665
- `--activeOpacity` → 2653, 2668
- `--uranus` → 2829, 5669, 5672
- `--highlightNumber` → 2836
- `--toast-bg-color` → 3339, 3555, 3566, 3567, 3579
- `--error` → 3484, 3487, 3490, 5741, 5744, 10886
- `--offset-right` → 3597, 6108, 6172, 6177, 6193, 10208
- `--rowGap` → 4332
- `--columnGap` → 4332
- `--gridHeaderHeight` → 4626
- `--fontSizeSmall` → 4680
- `--secondaryFadeOut` → 4697
- `--secondaryFadeIn` → 4703
- `--hoverOpacity` → 4728, 4779, 5851, 5857, 5870
- `--primaryFadeIn` → 4754, 4792
- `--primaryFadeOut` → 4769, 4806
- `--fontSize` → 4786, 4862
- `--constellation` → 4812
- `--constellationGlowMed` → 4818, 4845
- `--constellationGlowDark` → 4818, 4845
- `--constellationFadeIn` → 4833
- `--constellationFadeOut` → 4838
- `--constellationGlow` → 4845
- `--fontSizeLarge` → 4865
- `--sun` → 5542, 5545
- `--sunMed` → 5549, 5552
- `--sunDark` → 5555, 5558
- `--mercury` → 5561, 5564
- `--mercuryMed` → 5567, 5570
- `--mercuryDark` → 5573, 5576
- `--venus` → 5579, 5582
- `--venusMed` → 5585, 5588
- `--venusDark` → 5591, 5594
- `--earth` → 5597, 5600
- `--earthMed` → 5603, 5606
- `--earthDark` → 5609, 5612
- `--mars` → 5615, 5618
- `--marsMed` → 5621, 5624
- `--marsDark` → 5627, 5630
- `--jupiter` → 5633, 5636
- `--jupiterMed` → 5639, 5642
- `--jupiterDark` → 5645, 5648
- `--saturn` → 5651, 5654
- `--saturnMed` → 5657, 5660
- `--saturnDark` → 5663, 5666
- `--uranusMed` → 5675, 5678
- `--uranusDark` → 5681, 5684
- `--neptune` → 5687, 5690
- `--neptuneMed` → 5693, 5696
- `--neptuneDark` → 5699, 5702
- `--spacecraft` → 5705, 5708, 9512, 9530, 9540, 9582, 9730, 9939, 9976, 10070
- `--moon` → 5711, 5714
- `--dwarfPlanet` → 5717, 5720
- `--comet` → 5723, 5726
- `--asteroid` → 5729, 5732, 6779
- `--settings` → 5747, 5750
- `--settingsAlt` → 5753, 5756
- `--collapsible-bottom-margin` → 5782, 6101, 10215, 10462, 10762
- `--settings-z-index` → 5786
- `--distance-tool-color` → 5867, 5884, 9017, 9023, 9096, 9127, 9213, 9224
- `--icon-offset-x` → 5871, 5905
- `--icon-offset-y` → 5871, 5905
- `--paused` → 6028, 10481, 10694
- `--limit-message` → 6029
- `--bgDark` → 6206, 6228
- `--bgMed` → 6206, 6228
- `--btm-grad-height` → 6235
- `--btm-grad-scale` → 6248
- `--menuGradient` → 6306
- `--mobileHeaderHeight` → 6425, 6428, 6457, 6467
- `--mobileAZHeight` → 6467, 6482
- `--headerHeight` → 6547, 6555
- `--horizontalHighlight` → 6946, 7816
- `--panelBg` → 7244, 7363, 7838, 8036, 8038, 8051
- `--overviewBlockHeight` → 7245
- `--content-bottom-margin` → 7349, 8145
- `--tooltip-top-margin` → 7358
- `--custom-overview-border` → 7893
- `--tab-border-gray` → 7963, 8037, 8051
- `--overlayBgGradient` → 8384
- `--textBgGradient` → 8473
- `--verticalFade` → 8563
- `--horizonalFade` → 8613
- `--d-panel-height` → 8751, 9167, 9176, 9371, 9374
- `--d-panel-x` → 8754, 9167, 9176, 9371, 9374
- `--d-panel-y` → 8754, 9167, 9176, 9371, 9374
- `--d-panel-width` → 8755, 9172, 9371
- `--focus-dot-offset` → 9134
- `--focus-dot-pos` → 9134
- `--focus-dot-mp-mult` → 9134
- `--d-panel-height-factor` → 9176
- `--d-panel-collapsed-height` → 9195
- `--d-panel-bpX` → 9197, 9377, 9382
- `--d-panel-bpY` → 9197, 9377, 9382
- `--viewingline-X` → 9519
- `--dateline-X` → 9547, 9574
- `--timeline-height` → 9573
- `--formatted-date` → 9585
- `--event-name` → 9637
- `--event-offset-x` → 9644
- `--fpMarker-X` → 9762, 9781, 9934, 10102
- `--fp-dateline-X` → 9946
- `--fp-viewingline-X` → 9966
- `--focus-X` → 9993
- `--darkGrayGradientLeft` → 10023, 10503
- `--container-height` → 10266
- `--container-width` → 10284
- `--pausedAlpha` → 10482
- `--knobOffsetY` → 10619, 10631, 10637
- `--knobX` → 10666
- `--knobY` → 10666
- `--container-height-active` → 10767
- `--graydDarkAlpha` → 10988

#### 字体 / keyframes / 其他 at-rule

| 行 | 声明与完整子规则 |
|---|---|
| 898 | `@keyframes animated-cursor { 0% { cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/1.png), auto; } 7% { cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/2.png), auto; } 21% { cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/3.png), auto; } 28% { cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/4.png), auto; } 35% { cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/5.png), auto; } 42% { cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/6.png), auto; } 49% { cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/7.png), auto; } 56% { cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/8.png), auto; } 63% { cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/9.png), auto; } 70% { cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/10.png), auto; } 77% { cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/11.png), auto; } 84% { cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/12.png), auto; } to { cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/12.png), auto; } }` |
| 1139 | `@supports not (backdrop-filter:blur()) { #tutorial-overlay { background-color: rgba(11, 17, 19, .95); } }` |
| 2047 | `@supports not selector(::-webkit-scrollbar) { #share-modal code { scrollbar-color: var(--grayDivider) var(--grayDarkAlpha80); scrollbar-width: thin; } }` |
| 2337 | `@keyframes flash { 0% { opacity: 0; } 5% { opacity: 1; } 50% { opacity: 1; } to { opacity: 0; } }` |
| 3176 | `@keyframes gradient { 0% { background-position: 0 50%; } to { background-position: 100% 50%; } }` |
| 3184 | `@keyframes mobile-gradient { 0% { background: linear-gradient( 180deg, rgba(37, 37, 39, 0), rgba(37, 37, 39, 0) 25%, rgba(37, 37, 39, 0)); } 25% { background: linear-gradient( 180deg, rgba(37, 37, 39, 0), rgba(37, 37, 39, .1) 25%, rgba(37, 37, 39, .15)); } 50% { background: linear-gradient( 180deg, rgba(37, 37, 39, .1), rgba(37, 37, 39, .2) 25%, rgba(37, 37, 39, .3)); } 75% { background: linear-gradient( 180deg, rgba(37, 37, 39, .15), rgba(82, 82, 126, .25) 25%, rgba(37, 37, 39, .4)); } to { background: linear-gradient( 180deg, rgba(37, 37, 39, .2), rgba(37, 37, 39, .3) 25%, rgba(37, 37, 39, .45)); } }` |
| 3226 | `@keyframes text-pulse { 0% { opacity: .5; } 50% { opacity: .9; } to { opacity: .5; } }` |
| 3418 | `@keyframes fade-in { 0% { opacity: 0; } to { opacity: 1; } }` |
| 3426 | `@keyframes fade-out { 0% { opacity: 1; } to { opacity: 0; } }` |
| 3434 | `@keyframes fade-in-left { 0% { opacity: 0; transform: translateX(-100%); } to { opacity: 1; transform: translateX(0); } }` |
| 3444 | `@keyframes fade-out-left { 0% { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(-100%); } }` |
| 3454 | `@keyframes fade-out-bottom { 0% { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(100%); } }` |
| 3464 | `@keyframes fade-in-bottom { 0% { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }` |
| 3474 | `@keyframes spin { to { transform: rotate(1turn); } }` |
| 3479 | `@keyframes blink { 0% { outline: 1px solid transparent; } 25% { outline: 1px var(--error) solid; } 50% { outline: 4px var(--error) solid; } 75% { outline: 1px var(--error) solid; } to { outline: 1px solid transparent; } }` |
| 3670 | `@font-face { font-family: Metropolis; font-weight: 100; src: url(https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Metropolis-Thin.woff); }` |
| 3675 | `@font-face { font-family: Metropolis; font-weight: 300; src: url(https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Metropolis-Light.woff); }` |
| 3680 | `@font-face { font-family: Metropolis; font-weight: 600; src: url(https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Metropolis-SemiBold.woff); }` |
| 3685 | `@font-face { font-display: swap; font-family: Inter; font-style: normal; font-weight: 300; src: url(https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Inter-Light.woff2?v=3.15) format("woff2"), url(https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Inter-Light.woff?v=3.15) format("woff"); }` |
| 3692 | `@font-face { font-display: swap; font-family: Inter; font-style: normal; font-weight: 400; src: url(https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Inter-Regular.woff2?v=3.15) format("woff2"), url(https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Inter-Regular.woff?v=3.15) format("woff"); }` |
| 3699 | `@font-face { font-display: swap; font-family: Inter; font-style: normal; font-weight: 600; src: url(https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Inter-SemiBold.woff2?v=3.15) format("woff2"), url(https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Inter-SemiBold.woff?v=3.15) format("woff"); }` |
| 3706 | `@font-face { font-display: swap; font-family: Inter; font-style: normal; font-weight: 700; src: url(https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Inter-Bold.woff2?v=3.15) format("woff2"), url(https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Inter-Bold.woff?v=3.15) format("woff"); }` |
| 3713 | `@font-face { font-family: DMMono; font-weight: 300; src: url(https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/DMMono-Light.woff); }` |
| 3718 | `@font-face { font-family: DMMono; font-weight: 400; src: url(https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/DMMono-Regular.woff); }` |
| 3723 | `@font-face { font-family: DMMono; font-weight: 500; src: url(https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/DMMono-Medium.woff); }` |
| 7148 | `@keyframes load { 0% { margin-left: 0; margin-right: 100%; } 50% { margin-left: 25%; margin-right: 0; } to { margin-left: 100%; margin-right: 0; } }` |
| 9035 | `@keyframes pulse { 0% { outline-offset: 0; transform: scale(0); } to { outline-offset: .1rem; transform: scale(1.2); } }` |
| 9319 | `@keyframes loading-bar { 0%, to { transform: translateX(0); } 50% { background-color: var(--grayMed); transform: translateX(700%); } }` |
| 10671 | `@supports not (backdrop-filter:blur()) { nav.time-controls .slider-container .knob { background: radial-gradient( 50% 50% at 50% 50%, #616060 36.72%, #262627 51.3%, #505052 55.99%, #252525 79.43%, #19191b 100%); } }` |
| 11005 | `@keyframes tap-hint { 0% { opacity: 1; transform: translate(-50%, -50%) scale(1); } 30% { opacity: .5; transform: translate(-50%, -50%) scale(.7); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }` |

font-family实际调用：

- L1286 `.tutorial-carousel .swiper-button-next:after, .tutorial-carousel .swiper-button-prev:after` → `Metropolis, sans-serif`
- L1675 `.panel-content .swiper-button-next:after, .panel-content .swiper-button-prev:after` → `Metropolis, sans-serif`
- L1869 `.share-button` → `Inter, Metropolis, sans-serif`
- L2833 `.carousel .content-block .number` → `monospace`
- L2897 `.buttons-block` → `Metropolis, sans-serif`
- L3671 `@font-face ` → `Metropolis`
- L3676 `@font-face ` → `Metropolis`
- L3681 `@font-face ` → `Metropolis`
- L3687 `@font-face ` → `Inter`
- L3694 `@font-face ` → `Inter`
- L3701 `@font-face ` → `Inter`
- L3708 `@font-face ` → `Inter`
- L3714 `@font-face ` → `DMMono`
- L3719 `@font-face ` → `DMMono`
- L3724 `@font-face ` → `DMMono`
- L4409 `.grid-layout header .top-right-nav` → `Inter, Metropolis, sans-serif`
- L4814 `.pioneer-constellation-label .text` → `DMMono, monospace`
- L4896 `body` → `Metropolis, sans-serif`
- L4939 `.small` → `Metropolis, sans-serif`
- L4949 `.tiny, .x-small` → `Metropolis, sans-serif`
- L4975 `.display, h1, h2, h3, h4, h5` → `Metropolis, sans-serif`
- L5937 `.large` → `Metropolis, sans-serif`
- L5943 `.monospace` → `Inter, sans-serif`
- L5952 `.monospace.small, .monospace.tiny, .monospace.x-small` → `Inter, sans-serif`
- L5966 `button` → `Metropolis, sans-serif`
- L7841 `.content-panel-container` → `Inter, Metropolis, sans-serif`

#### URL（仅本地源码字符串，没有fetch）

| 行 | 属性 | URL |
|---|---|---|
| 230 | background | `https://eyes.nasa.gov/apps/solar-system/assets/default/svg/cubemap.svg` |
| 747 | background | `https://eyes.nasa.gov/apps/solar-system/assets/default/svg/timeline_bg.svg` |
| 895 | cursor | `https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/1.png` |
| 900 | cursor | `https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/1.png` |
| 903 | cursor | `https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/2.png` |
| 906 | cursor | `https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/3.png` |
| 909 | cursor | `https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/4.png` |
| 912 | cursor | `https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/5.png` |
| 915 | cursor | `https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/6.png` |
| 918 | cursor | `https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/7.png` |
| 921 | cursor | `https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/8.png` |
| 924 | cursor | `https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/9.png` |
| 927 | cursor | `https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/10.png` |
| 930 | cursor | `https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/11.png` |
| 933 | cursor | `https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/12.png` |
| 936 | cursor | `https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/12.png` |
| 3673 | src | `https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Metropolis-Thin.woff` |
| 3678 | src | `https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Metropolis-Light.woff` |
| 3683 | src | `https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Metropolis-SemiBold.woff` |
| 3690 | src | `https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Inter-Light.woff2?v=3.15` |
| 3690 | src | `https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Inter-Light.woff?v=3.15` |
| 3697 | src | `https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Inter-Regular.woff2?v=3.15` |
| 3697 | src | `https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Inter-Regular.woff?v=3.15` |
| 3704 | src | `https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Inter-SemiBold.woff2?v=3.15` |
| 3704 | src | `https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Inter-SemiBold.woff?v=3.15` |
| 3711 | src | `https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Inter-Bold.woff2?v=3.15` |
| 3711 | src | `https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Inter-Bold.woff?v=3.15` |
| 3716 | src | `https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/DMMono-Light.woff` |
| 3721 | src | `https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/DMMono-Regular.woff` |
| 3726 | src | `https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/DMMono-Medium.woff` |
| 3729 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/default/svg/sprite.svg` |
| 4246 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/default/svg/nasa_logo.svg` |
| 4251 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/default/svg/crosshair.svg` |
| 4256 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/default/svg/finger.svg` |
| 4261 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/default/svg/share_arrow.svg` |
| 4272 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/default/svg/help_icon.svg` |
| 4277 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/default/svg/locked.svg` |
| 4287 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/default/svg/error.svg` |
| 5240 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/caret_right.svg` |
| 5245 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/caret_up.svg` |
| 5255 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/caret_down.svg` |
| 5258 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/caret_double_left.svg` |
| 5268 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/arrow_line_up.svg` |
| 5271 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/arrow_line_down.svg` |
| 5278 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/mission_events.svg` |
| 5288 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/compare_size.svg` |
| 5291 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/distance_tool.svg` |
| 5301 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/telescope_mode.svg` |
| 5304 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/constellation.svg` |
| 5314 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/latlong_target.svg` |
| 5319 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/telescope_target.svg` |
| 5329 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/rate_increase.svg` |
| 5334 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/rate_pause.svg` |
| 5344 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/rate_play.svg` |
| 5347 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/rate-replay.svg` |
| 5357 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/replay-icon-solid.svg` |
| 5362 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/play-icon-solid.svg` |
| 5372 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/pause-icon-solid.svg` |
| 5375 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/next-arrow-solid.svg` |
| 5382 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/collapse_arrow.svg` |
| 5388 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/scroll_top.svg` |
| 5395 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/watch.svg` |
| 5405 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/draggable.svg` |
| 5410 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/distance_source.svg` |
| 5420 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/distance_target.svg` |
| 5425 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/distance_swap.svg` |
| 5435 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/camera_lock.svg` |
| 5440 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/timeline.svg` |
| 5450 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/table.svg` |
| 5453 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/calendar_check.svg` |
| 7410 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/cam_nearby.svg` |
| 7413 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/cam_system.svg` |
| 7416 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/cam_follow.svg` |
| 7419 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/trajectory.svg` |
| 8078 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/content_info.svg` |
| 8081 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/content_info_sel.svg` |
| 8085 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/content_toolbox.svg` |
| 8088 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/content_toolbox_sel.svg` |
| 8092 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/content_view_options.svg` |
| 8095 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/content_view_options_sel.svg` |
| 9298 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/speed-icon.svg` |
| 9313 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/svg/light-clock-icon.svg` |

#### !important完整声明

| 行 | 上下文 | 值 |
|---|---|---|

#### z-index完整声明

| 行 | 上下文 | 值 |
|---|---|---|
| 72 | `.settings .overlay-bg` | `z-index: 100` |
| 126 | `.settings .lighting-option-container` | `z-index: 101` |
| 202 | `.load-icon` | `z-index: 1000` |
| 304 | `.overlay-container .overlay` | `z-index: var(--overlay-z-index)` |
| 338 | `.overlay-container .overlay .close-button` | `z-index: 10` |
| 476 | `.search span.search-info` | `z-index: 1` |
| 762 | `.carousel-container .close-button` | `z-index: 2000` |
| 952 | `.carousel-container .carousel .navigation-button` | `z-index: 2` |
| 1137 | `#tutorial-overlay` | `z-index: 1000` |
| 1305 | `.tutorial-carousel .swiper-button-next:before, .tutorial-carousel .swiper-button-prev:before` | `z-index: -1` |
| 1418 | `@media only screen and (min-width: 320px) and (max-width: 767px) › #tutorial-overlay.tutorial-slide-time .dismiss-button` | `z-index: 10` |
| 1460 | `#panel-container` | `z-index: 1` |
| 1532 | `#panel-container .panel-main` | `z-index: 101` |
| 1632 | `.panel-content .bullet-container` | `z-index: 1` |
| 1694 | `.panel-content .swiper-button-next:before, .panel-content .swiper-button-prev:before` | `z-index: -1` |
| 1898 | `#share-modal` | `z-index: 55` |
| 1989 | `#share-modal ul.tab-headers button:after` | `z-index: 1` |
| 2292 | `@media only screen and (min-width: 961px) › #share-modal ul.tab-headers button:after` | `z-index: 1` |
| 2548 | `@media only screen and (min-width: 320px) › .layer-panel` | `z-index: 10` |
| 2995 | `.carousel-container .carousel .slide.overlay .container` | `z-index: 10` |
| 3246 | `.kiosk-container, .session-end-container` | `z-index: calc(var(--overlay-z-index)*2)` |
| 3260 | `.session-end-buttons-container` | `z-index: calc(var(--overlay-z-index)*2)` |
| 3331 | `.loading-text` | `z-index: calc(var(--overlay-z-index)*4)` |
| 3354 | `.toast-container` | `z-index: 50` |
| 3511 | `.camera-follow.search .results` | `z-index: 1` |
| 3524 | `.camera-follow.active .input-focused span.search-info` | `z-index: 2` |
| 3539 | `.camera-follow .featured` | `z-index: 1` |
| 3594 | `#static-ui > div.follow-reframe:after` | `z-index: 1` |
| 5460 | `.load-icon` | `z-index: 1` |
| 5767 | `.ui header` | `z-index: 50` |
| 5773 | `.ui header .search .cover` | `z-index: 0` |
| 5776 | `.ui header .search .bar` | `z-index: 1` |
| 5786 | `.ui .float-right-bottom` | `z-index: var(--settings-z-index)` |
| 5789 | `.ui .float-right-bottom .layer-panel` | `z-index: 1` |
| 5792 | `.ui .float-right-bottom .settings` | `z-index: 0` |
| 5797 | `.ui .carousel-container, .ui .content-panel, .ui .featured-stories-panel` | `z-index: 30` |
| 5802 | `.ui .carousel-container.overlay, .ui .content-panel.overlay, .ui .featured-stories-panel.overlay` | `z-index: 60` |
| 5806 | `.ui .float-mid-bottom` | `z-index: 20` |
| 5812 | `.datetime-container > form:not(.hidden), .ui .datetime-container .date, .ui .datetime-container .time, .ui .time-controls` | `z-index: 20` |
| 5818 | `.ui .float-full-bottom` | `z-index: 20` |
| 5821 | `.ui .compare` | `z-index: 10` |
| 6105 | `nav.clock-shortcut` | `z-index: 30` |
| 6203 | `#dynamic-ui` | `z-index: 1` |
| 6225 | `#dynamic-ui > header:before` | `z-index: -1` |
| 6252 | `#dynamic-ui:after` | `z-index: -1` |
| 6283 | `.mega-menu .menu-btn > span.icon-menu` | `z-index: -1` |
| 6297 | `.mega-menu .overlay-bg` | `z-index: 10` |
| 6315 | `.mega-menu .menu-container` | `z-index: 51` |
| 6904 | `.story-block .story-title` | `z-index: 10` |
| 6919 | `.story-block .story-subtitle` | `z-index: 10` |
| 6926 | `.story-block .story-icon` | `z-index: 0` |
| 6932 | `.story-block .story-icon-image` | `z-index: 0` |
| 7019 | `.events-block › & #toggle-container › & .tab` | `z-index: 5` |
| 7077 | `.events-block › .table-container › & table › & thead › &:after` | `z-index: -1` |
| 7262 | `.description › & .more-button` | `z-index: 10` |
| 7317 | `.toolbox-block › & .clickable-div` | `z-index: 0` |
| 7327 | `.toolbox-block › & .toolbox-description › .tooltop-icon-container` | `z-index: 5` |
| 7360 | `.toolbox-block › .tooltip-popup` | `z-index: var(--overlay-z-index)` |
| 7769 | `.related-story-block .story-title` | `z-index: 10` |
| 7784 | `.related-story-block .story-subtitle` | `z-index: 10` |
| 7795 | `.related-story-block .story-icon › &:not(.icon-external) :not(.full-size-icon)` | `z-index: 0` |
| 7852 | `.content-panel-container` | `z-index: 40` |
| 7854 | `.content-panel-container › &.overlay` | `z-index: 60` |
| 7867 | `.content-panel-container › & .desktop-collapse-button` | `z-index: 1` |
| 7999 | `.content-panel-container › .tab-group › nav › ul › li › .bg` | `z-index: -1` |
| 8047 | `.content-panel-container › .tab-group › nav › ul › li › &.selected › &:before` | `z-index: 1` |
| 8209 | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › span.drag-handle` | `z-index: 100` |
| 8226 | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav` | `z-index: 10` |
| 8228 | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav › &:has(.sub-tab-container.hidden)` | `z-index: -10` |
| 8250 | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav › .sub-tab-container › & .sub-tab-nav › li` | `z-index: 1` |
| 8728 | `.distance-panel-container:has(.distance-panel.draggable).searching` | `z-index: 100` |
| 8734 | `@media only screen and (min-width: 640px) and (orientation: landscape) › .distance-panel-container.searching` | `z-index: 100` |
| 8741 | `@media only screen and (min-width: 915px) and (orientation: portrait) › .distance-panel-container.searching` | `z-index: 100` |
| 8756 | `.distance-panel.draggable` | `z-index: 50` |
| 8772 | `.distance-panel.draggable:after` | `z-index: -1` |
| 8954 | `.distance-panel .input-focused .bar` | `z-index: 4` |
| 8958 | `.distance-panel .input-focused .cover` | `z-index: 3` |
| 8982 | `.distance-panel.fixed .input-focused .cover` | `z-index: 3` |
| 9057 | `.line-graphic-container > button` | `z-index: 1` |
| 9137 | `.distance-panel-container.minimizable .line-graphic-container .line-graphic:after` | `z-index: 1` |
| 9173 | `.distance-panel.draggable ~ .result-container` | `z-index: 52` |
| 9288 | `.result-subcontainer › .tooltip:after` | `z-index: 53` |
| 9346 | `.distance-panel-container.minimizable .distance-panel.draggable ~ button.max-min-btn` | `z-index: 51` |
| 9456 | `.events-timeline` | `z-index: 20` |
| 9485 | `.events-timeline .range-date` | `z-index: -1` |
| 10054 | `.events-timeline .fp-details > button:after` | `z-index: -1` |
| 10088 | `.events-timeline .focus-ticks-container` | `z-index: -1` |
| 10356 | `.c-menu-item button.item-toggle-btn` | `z-index: 20` |
| 10407 | `@media (pointer: fine) and (hover: hover) › .c-menu-item:hover button.item-collapse-btn` | `z-index: 1` |
| 10496 | `nav.time-controls .rate-controls` | `z-index: 20` |
| 10521 | `.rate-controls button:after` | `z-index: -1` |
| 10958 | `.telescope.pick` | `z-index: 1111` |
| 10968 | `.telescope.pick button` | `z-index: 1200` |
| 11104 | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .telescope .surface .container .changeLocation` | `z-index: 1` |
| 11113 | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .telescope .container .title` | `z-index: 1` |

#### 全selector目录：行号 / 类前缀家族 / 祖先上下文 / 全部直接声明

每条规则按自身 selector 和完整父链定位；嵌套子规则另外列出。keyframes帧属于动画，不是DOM选择器；GLOBAL规则无class并不代表无作用。源码逗号、`:is/:not/:has`、伪元素保留原义。无直接声明表示仅包装子规则，不是空功能。

| 行 | 家族 | 上下文（含完整selector） | 直接属性和值 |
|---|---|---|---|
| 1 | settings | `.settings` | `display: none; justify-content: flex-end; margin-bottom: 3em; margin-left: auto; transition: transform 1s ease-in-out` |
| 8 | settings | `.settings.active` | `align-items: flex-end; align-self: end; animation-duration: .95s; animation-fill-mode: both; animation-iteration-count: 1; animation-name: fade-in-bottom; animation-timing-function: ease-in-out; display: flex` |
| 18 | settings | `.settings.vertical` | `flex-direction: column` |
| 21 | settings | `.settings.horizontal` | `flex-direction: row` |
| 24 | settings | `.settings.hidden` | `animation-duration: 1s; animation-fill-mode: both; animation-iteration-count: 1; animation-name: fade-out-bottom; animation-timing-function: ease-in-out; display: flex` |
| 32 | settings | `.settings button` | `outline: 0; padding: 0` |
| 36 | settings | `.settings button.zoom-in` | `margin-bottom: 0` |
| 39 | settings | `.settings button span` | `opacity: .4` |
| 42 | settings | `.settings button.hidden` | `display: none` |
| 45 | settings | `.settings .container` | `display: block; flex-basis: auto; overflow: hidden; position: relative; transition: all 1s` |
| 52 | settings | `.settings .container.active` | `flex-grow: 1; flex-shrink: 1` |
| 56 | settings | `.settings .container.hidden` | `flex-grow: 0` |
| 59 | settings | `.settings.vertical .container` | `width: 100%` |
| 62 | settings | `.settings.horizontal .container` | `height: 100%` |
| 65 | settings | `.settings .overlay-bg` | `background-color: var(--black); height: var(--vh); margin-right: -20px; opacity: .6; position: fixed; width: 100vw; z-index: 100` |
| 74 | settings | `.settings .container .content` | `display: grid; height: 100%; overflow: hidden; position: absolute` |
| 80 | settings | `.settings.vertical .container .content` | `align-items: end; grid-auto-flow: row; row-gap: 2px` |
| 85 | settings | `.settings.horizontal .container .content` | `align-items: start; -moz-column-gap: 2px; column-gap: 2px; grid-auto-flow: column` |
| 91 | settings | `.settings.vertical .toggle` | `margin-top: 2px` |
| 94 | settings | `.settings .zoom` | `margin: 0` |
| 97 | settings | `.settings .horizontal-line` | `background: var(--grayDark); box-sizing: border-box; margin: auto` |
| 102 | settings | `.settings.vertical .zoom` | `display: grid; grid-template-columns: 30px; grid-template-rows: 30px 2px 30px` |
| 107 | settings | `.settings.vertical .horizontal-line` | `height: 2px; width: 22px` |
| 111 | settings | `.settings.horizontal .zoom` | `display: flex` |
| 114 | settings | `.settings.horizontal .horizontal-line` | `display: inline-block; height: 22px; width: 2px` |
| 119 | settings | `.settings .lighting-option-container` | `background: var(--bgGradient); border-radius: 3px; bottom: 34px; padding: 8px 10px; position: fixed; right: 34px; z-index: 101` |
| 128 | settings | `.settings .lighting-option` | `align-items: center; display: grid; gap: 8px; grid-template-columns: auto auto; padding: 4px 0` |
| 135 | settings | `.settings .lighting-option .title` | `opacity: .4; pointer-events: none; white-space: nowrap` |
| 140 | settings | `.settings .lighting-option-container .lighting-option.selected-lighting span` | `opacity: 1` |
| 143 | settings | `.settings .lighting-option .lighting-icon` | `min-width: 16px; pointer-events: none` |
| 148 | settings | `@media (pointer: fine) and (hover: hover) › .settings .lighting-option:hover .lighting-icon, .settings .lighting-option:hover .title` | `opacity: 1` |
| 154 | settings | `@media only screen and (min-width: 320px) › .settings` | `margin-bottom: 0; margin-left: auto` |
| 158 | settings | `@media only screen and (min-width: 320px) › .settings.active` | `animation-duration: .5s; animation-fill-mode: both; animation-iteration-count: 1; animation-name: fade-in-bottom; animation-timing-function: ease-in-out` |
| 165 | settings | `@media only screen and (min-width: 320px) › .settings.hidden` | `animation-duration: 1s; animation-fill-mode: both; animation-iteration-count: 1; animation-name: fade-out-bottom; animation-timing-function: ease-in-out; display: flex` |
| 173 | settings | `@media only screen and (min-width: 320px) › .settings .container .content` | `row-gap: 2px` |
| 176 | settings | `@media only screen and (min-width: 320px) › .settings .overlay-bg` | `bottom: -105px` |
| 181 | settings | `@media only screen and (min-width: 320px) and (orientation: landscape) › .settings .overlay-bg` | `bottom: -10px; right: -56px` |
| 187 | settings | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .settings .overlay-bg` | `bottom: -25px; right: unset` |
| 192 | load-icon | `.load-icon` | `display: flex; flex-wrap: wrap; height: 80px; left: 50%; position: fixed; top: 50%; transform: translate(-50%, -50%); transition: transform .5s var(--ease-out-bezier); width: 80px; z-index: 1000` |
| 204 | load-icon | `.load-icon.hidden` | `display: none` |
| 207 | load-icon | `.load-icon.offset-right` | `transform: translate(calc(var(--offset-right-sm, 0) - 50%), -50%); transition-duration: .8s` |
| 211 | load-icon | `.load-icon.offset-up` | `transform: translate(-50%, calc(-50% - var(--offset-up, 0))); transition-duration: .8s` |
| 215 | load-icon | `.load-icon .text` | `bottom: -1em; color: var(--grayLight); font-size: 1em; left: 50%; position: absolute; text-transform: uppercase; transform: translateX(-50%)` |
| 224 | load-icon | `.load-icon .bg, .load-icon .bottom, .load-icon .front, .load-icon .left, .load-icon .right, .load-icon .top` | `background: transparent url(https://eyes.nasa.gov/apps/solar-system/assets/default/svg/cubemap.svg) no-repeat 0 -400px; display: block; height: 80px; left: 0; position: absolute; top: 0; width: 80px` |
| 238 | load-icon | `.load-icon .bg` | `opacity: .15` |
| 241 | load-icon | `.load-icon .bottom, .load-icon .front, .load-icon .left, .load-icon .right, .load-icon .top` | `animation: pulse 2s infinite` |
| 248 | load-icon | `.load-icon .front` | `background-position-y: -320px; transform-origin: 47px 48px` |
| 252 | load-icon | `.load-icon .left` | `animation-delay: .25s; background-position-y: 0; transform-origin: 17px 44px` |
| 257 | load-icon | `.load-icon .top` | `animation-delay: .5s; background-position-y: -80px; transform-origin: 41px 18px` |
| 262 | load-icon | `.load-icon .right` | `animation-delay: .75s; background-position-y: -160px; transform-origin: 67px 39.5px` |
| 267 | load-icon | `.load-icon .bottom` | `animation-delay: 1s; background-position-y: -240px; transform-origin: 40px 67px` |
| 273 | load-icon | `@media only screen and (min-width: 961px) › .load-icon.offset-right` | `transform: translate(calc(var(--offset-right-lg, 0) - 50%), -50%)` |
| 277 | GLOBAL | `:root` | `--overlay-z-index: 9999` |
| 280 | os-host-resize-disabled | `.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden > .os-scrollbar-vertical, .os-scrollbar-vertical, .os-theme-dark > .os-scrollbar` | `bottom: 40px; top: 40px` |
| 286 | os-theme-dark | `.os-theme-dark > .os-scrollbar:active > .os-scrollbar-track > .os-scrollbar-handle` | `background: var(--gray); width: 6px` |
| 291 | os-theme-dark | `@media (pointer: fine) and (hover: hover) › .os-theme-dark > .os-scrollbar:hover > .os-scrollbar-track > .os-scrollbar-handle` | `background: var(--gray); width: 6px` |
| 296 | overlay-container | `.overlay-container .overlay` | `background: #000; height: var(--vh); left: 0; opacity: .9; position: absolute; top: 0; width: 100vw; z-index: var(--overlay-z-index)` |
| 306 | overlay-container | `.overlay-container .overlay.active` | `animation-duration: .5s; animation-fill-mode: both; animation-iteration-count: 1; animation-name: fade-in; animation-timing-function: ease-in; display: flex; pointer-events: all` |
| 315 | overlay-container | `.overlay-container .overlay.hidden` | `pointer-events: none` |
| 318 | overlay-container | `.overlay-container.initialized .overlay.hidden` | `animation-duration: .5s; animation-fill-mode: both; animation-iteration-count: 1; animation-name: fade-out; animation-timing-function: ease-out; display: flex` |
| 326 | overlay-container | `.overlay-container.initialized .overlay.hidden .clickable` | `display: none` |
| 329 | overlay-container | `.overlay-container .overlay .close-button` | `margin: 20px 20px 0 0; opacity: .4; padding: 0; position: absolute; right: 0; top: 0; transform: scale(1.5); transform-origin: top right; z-index: 10` |
| 341 | overlay-container | `@media (pointer: fine) and (hover: hover) › .overlay-container .overlay .close-button:hover` | `opacity: 1` |
| 346 | overlay-container | `@media only screen and (min-width: 320px) and (orientation: landscape) › .overlay-container .overlay` | `left: -20px; width: calc(100vw + 20px)` |
| 351 | search-open | `.search-open .featured` | `border-radius: 0 0 12px 12px; border-top: 1px solid var(--grayDivider); height: 300px; left: 0; max-height: calc(var(--vh) - 86px); opacity: 1; position: absolute; top: 100%; transform: scaleY(1); transform-origin: top; transition: transform .3s .2s var(--ease-out-bezier), opacity .3s .2s var(--ease-out-bezier); width: 100%` |
| 365 | search-close | `.search-close .featured.hidden` | `display: unset; height: 0; opacity: 0; transform: scaleY(0); transition: transform .2s var(--ease-out-bezier), opacity .2s var(--ease-out-bezier)` |
| 372 | search | `.search .featured ul` | `font-size: 14px; list-style: none; margin: 0; opacity: 1; padding: 24px 0 68px; transition: opacity .5s ease-out .2s` |
| 380 | search | `.search .featured.hidden ul` | `opacity: 0` |
| 383 | search | `.search .featured li` | `background-image: radial-gradient( at 10%, #303030 0, transparent 110%); background-position: 50%; background-repeat: no-repeat; background-size: 0 0; border-radius: 6px; color: var(--grayMed); margin: 9px 40px 9px 16px; padding: 8px 16px` |
| 398 | search | `@media (hover: hover) › .search .featured li:hover` | `background-size: 100% 100%; color: var(--white); transition: background-size .15s ease-out` |
| 403 | search | `@media (hover: hover) › .search .mag-open:hover` | `filter: brightness(1.2); transform: scale(1.05); transition: filter .2s, transform .2s` |
| 409 | top-right-nav | `.top-right-nav .search` | `order: 1` |
| 412 | top-right-nav | `.top-right-nav .mega-menu` | `order: 3` |
| 415 | search | `.search` | `display: block; justify-self: end; opacity: 1; pointer-events: none; transition: opacity .6s ease-out, visibility .6s ease-out` |
| 422 | search | `.search .bar` | `background: var(--grayAlpha); border-radius: .2em; display: grid; padding: 7.5px; position: relative` |
| 429 | search | `.search .cover` | `background: var(--black); height: var(--vh); left: 0; opacity: 0; pointer-events: all; position: fixed; top: 0; transition: opacity .4s ease-out, visibility .4s ease-out; visibility: hidden; width: 100vw` |
| 441 | search | `.search .input-focused .cover` | `opacity: .6; transition: opacity .6s ease-in, visibility .6s ease-in; visibility: visible` |
| 446 | search | `.search input[type=text]` | `background: transparent; border: none; color: var(--white); grid-area: input; outline: none; padding: 0 10px; width: inherit` |
| 455 | search | `.search .mag-open` | `display: block; filter: brightness(.8); grid-area: mag; margin: 7.5px; transition: filter .1s, transform .1s` |
| 462 | search | `.search .search-open` | `display: grid; pointer-events: all` |
| 466 | search | `.search span.search-info` | `bottom: -24px; color: var(--grayAlpha); font-weight: 600; left: 50%; opacity: 1; position: absolute; text-transform: uppercase; transform: translateX(-50%); transition: opacity .3s ease-out .3s; z-index: 1` |
| 478 | search-close | `.search-close span.search-info` | `opacity: 0; transition: opacity .2s ease-out` |
| 482 | search | `.search .bar .results` | `backdrop-filter: blur(.5rem); border-radius: 0 0 .2em .2em; left: 0; position: absolute; top: 100%; width: 100%` |
| 490 | search | `.search .bar .results:not(:empty)` | `border-top: .1em solid var(--grayDark)` |
| 493 | search | `.search .bar:has(.results:not(:empty))` | `border-radius: .2em .2em 0 0` |
| 496 | search | `.search .bar .results .result-div:first-child` | `margin-top: .6em` |
| 499 | search | `.search .bar .results .result-div:last-child` | `margin-bottom: .4em` |
| 502 | search | `.search .bar .results .block-container` | `margin-bottom: 20px` |
| 505 | search | `.search .suggestion` | `padding: 20px 0` |
| 508 | search | `.search .suggestion .title` | `display: block; padding: 2px 20px` |
| 512 | search | `.search .gradient` | `background: linear-gradient( 180deg, var(--grayDarkAlpha80) 0, rgba(37, 37, 39, .64) 60.64%, rgba(37, 37, 39, 0) 116.42%)` |
| 520 | search | `.search .result-div` | `padding: .4em 1.3em; transition: all .3s` |
| 524 | search | `.search .result-div button` | `padding: 0; text-align: left` |
| 528 | search | `.search .result-div.active` | `background-color: var(--whiteAlpha15); cursor: pointer` |
| 532 | search | `.search .result-div.active .clickable` | `text-decoration: underline` |
| 535 | search | `.search .results .entries` | `display: block; outline: none; padding: 0; text-align: left; width: 100%` |
| 542 | search | `.search .card-title` | `align-items: baseline; border-bottom: 1px solid var(--grayDark); display: grid; grid-template-columns: 1fr auto; margin-bottom: 10px; padding: 15px 20px` |
| 550 | search | `.search .bar .results .card-title.result-div:first-child` | `margin-top: 0` |
| 553 | search | `.search .card-title img` | `width: 50px` |
| 556 | search | `.search .results .unmatch` | `opacity: .6` |
| 559 | search | `.search .detail .entry` | `opacity: 1; padding: 0` |
| 563 | search | `.search .title` | `padding: 0 20px` |
| 566 | search-close-icon | `.search-close-icon` | `grid-area: close` |
| 570 | search | `@media only screen and (min-width: 320px) › .search .bar` | `grid-template-areas: "input search"; grid-template-columns: 1fr auto; margin: auto; width: 90%` |
| 576 | search | `@media only screen and (min-width: 320px) › .search .search-close-icon` | `display: none` |
| 581 | search | `@media (pointer: coarse) › .search .result-div.active` | `background-color: transparent; cursor: normal` |
| 586 | clock | `.clock .date, .clock .meridiem, .clock .time` | `display: inline-block; margin-right: 1em` |
| 592 | clock | `.clock .date.hidden, .clock .meridiem.hidden, .clock .time.hidden` | `display: none` |
| 597 | clock | `.clock .hour-input` | `background: none; border: 0; color: #fff; padding: 0; -webkit-user-select: text; -moz-user-select: text; user-select: text; width: 90%` |
| 607 | clock | `.clock .datetime-container .display-container` | `display: grid; gap: 5px; grid-template-columns: auto auto auto; opacity: .6; white-space: nowrap` |
| 614 | clock | `.clock .datetime-container .display-container.hidden` | `display: none` |
| 617 | clock | `.clock .date, .clock .meridiem, .clock .time` | `font-variant: tabular-nums; margin-right: 0` |
| 623 | clock | `.clock .time` | `margin-left: 10px` |
| 626 | clock | `.clock .hour-input` | `opacity: .6` |
| 629 | clock | `.clock .datetime-container form, .clock .datetime-container input` | `margin: 0; padding: 0` |
| 635 | clock | `@media only screen and (min-width: 320px) › .clock .datetime-container` | `grid-column: 2; grid-row: 1` |
| 639 | clock | `@media only screen and (min-width: 320px) › .clock .datetime-container .display-container` | `gap: 2px; justify-content: end; margin: 0` |
| 644 | clock | `@media only screen and (min-width: 320px) › .clock .datetime-container form, .clock .datetime-container input` | `text-align: right` |
| 650 | clock | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .clock .datetime-container` | `grid-column: 1; grid-row: 2; margin-left: 8px` |
| 655 | clock | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .clock .datetime-container form, .clock .datetime-container input` | `text-align: left` |
| 659 | clock | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .clock .hour-input` | `margin-left: 8px` |
| 662 | alert | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .alert` | `outline-offset: 0` |
| 666 | clock-shortcut | `.clock-shortcut .text` | `display: inline-block; text-transform: uppercase` |
| 670 | clock-shortcut | `.clock-shortcut .active .live` | `color: red` |
| 673 | clock-shortcut | `.clock-shortcut .container` | `background-color: var(--grayDarkAlpha); border-radius: 2px; margin-left: 0; padding: 1px 7px` |
| 679 | clock-shortcut | `.clock-shortcut .container.hidden` | `display: none` |
| 683 | clock-shortcut | `@media (pointer: fine) and (hover: hover) › .clock-shortcut .container:hover` | `background-color: var(--grayAlpha); cursor: pointer` |
| 688 | clock-shortcut | `.clock-shortcut .live-container, .clock-shortcut .replay-container` | `align-items: center; display: grid; gap: 0 7px; grid-template-columns: auto auto; grid-template-rows: auto; justify-content: start` |
| 698 | clock-shortcut | `@media (pointer: fine) and (hover: hover) › .clock-shortcut .live-container:hover` | `background-color: var(--liveAlpha)` |
| 702 | clock-shortcut | `.clock-shortcut .live-container.active` | `background-color: transparent; margin-left: 8px; padding-left: 0` |
| 708 | clock-shortcut | `@media (pointer: fine) and (hover: hover) › .clock-shortcut .live-container.active:hover` | `background-color: transparent; cursor: auto` |
| 713 | clock-shortcut | `.clock-shortcut .text` | `color: var(--gray)` |
| 717 | clock-shortcut | `@media (pointer: fine) and (hover: hover) › .clock-shortcut .container:hover .text` | `color: var(--white)` |
| 721 | clock-shortcut | `.clock-shortcut .active .live` | `color: var(--live)` |
| 725 | clock-shortcut | `@media (pointer: fine) and (hover: hover) › .clock-shortcut .container.active:hover .live` | `color: var(--live)` |
| 729 | carousel-container | `.carousel-container` | `height: 100%; left: 0; pointer-events: none; position: absolute; top: 0; width: 100%` |
| 737 | carousel-container | `.carousel-container.small h1` | `font-size: 28px` |
| 740 | carousel-container | `.carousel-container.small h2` | `font-size: 24px` |
| 743 | carousel-container | `.carousel-container.small h4` | `font-size: 16px` |
| 746 | carousel-container | `.carousel-container .progress` | `background: transparent url(https://eyes.nasa.gov/apps/solar-system/assets/default/svg/timeline_bg.svg) repeat-y 0 0; left: 0; margin: auto; pointer-events: all; position: absolute; width: 10%` |
| 754 | carousel-container | `.carousel-container .close-button` | `align-items: center; display: flex; margin: 20px 20px 0 0; padding: 0; position: fixed; right: 0; top: 0; z-index: 2000` |
| 764 | carousel-container | `.carousel-container .close-button.hidden` | `display: none` |
| 767 | carousel-container | `.carousel-container .close-button .icon` | `transform: scale(1.5)` |
| 770 | carousel-container | `.carousel-container .carousel` | `background: transparent; height: 100%; overflow: hidden; pointer-events: none; position: relative; width: 100%` |
| 778 | carousel-container | `.carousel-container .carousel.initialized` | `transition: all .7s ease` |
| 781 | carousel-container | `.carousel-container .carousel.active` | `animation-duration: 1s; animation-fill-mode: both; animation-iteration-count: 1; animation-name: fade-in-left; animation-timing-function: ease-in-out` |
| 788 | carousel-container | `.carousel-container .carousel.hidden` | `animation-duration: 1s; animation-fill-mode: both; animation-iteration-count: 1; animation-name: fade-out-left; animation-timing-function: ease-in-out; display: block` |
| 796 | carousel-container | `.carousel-container .carousel .track` | `opacity: 1; pointer-events: none; transition: transform 1s ease` |
| 801 | carousel-container | `.carousel-container .carousel .slide` | `color: var(--white); display: block; height: var(--vh); overflow: hidden; pointer-events: none; width: 100%` |
| 809 | carousel-container | `.carousel-container .carousel .slide.active` | `animation-duration: .5s; animation-fill-mode: both; animation-iteration-count: 1; animation-name: fade-in; animation-timing-function: ease-in` |
| 816 | carousel-container | `.carousel-container .carousel .slide.hidden` | `animation-duration: .5s; animation-fill-mode: both; animation-iteration-count: 1; animation-name: fade-out; animation-timing-function: ease-out; pointer-events: none` |
| 824 | carousel-container | `.carousel-container .carousel .slide.opaque` | `opacity: 1` |
| 827 | carousel-container | `.carousel-container .carousel .slide.black` | `background-color: var(--black)` |
| 830 | carousel-container | `.carousel-container .carousel .slide.white` | `background-color: var(--white)` |
| 833 | carousel-container | `.carousel-container .carousel .slide .wrapper` | `grid-column: main-start/side-end; grid-row: head-start/foot-end` |
| 837 | carousel-container | `.carousel-container .carousel .slide .container` | `background: transparent; display: flex; flex-direction: column; padding: 0; pointer-events: all; width: 100%` |
| 845 | carousel-container | `.carousel-container .carousel .slide.overlay .container` | `text-align: center` |
| 848 | carousel-container | `.carousel-container .carousel .slide .container .container-wrapper` | `display: flex; flex-direction: column; height: 100%` |
| 853 | carousel-container | `.carousel-container .carousel .slide.overlay .controls` | `display: none` |
| 856 | carousel-container | `.carousel-container .carousel .slide .content-container` | `display: flex; flex: 1; flex-direction: column; overflow: inherit; pointer-events: none; width: 100%` |
| 864 | carousel-container | `.carousel-container .carousel .slide .content-container *` | `pointer-events: none` |
| 867 | carousel-container | `.carousel-container .carousel .slide .content-container .clickable` | `pointer-events: all` |
| 870 | carousel-container | `.carousel-container .carousel .slide .content-wrapper` | `display: flex; flex: 1; flex-direction: column; overflow: auto; padding: 10px 0; pointer-events: all; width: 100%` |
| 879 | carousel-container | `.carousel-container .carousel .slide .content-wrapper .content` | `display: flex; flex-direction: column` |
| 883 | carousel-container | `.carousel-container .progress .icon-triangle` | `left: 0; position: absolute; top: 0; transform: rotate(90deg); transition: top 2s ease 0s` |
| 891 | carousel | `@media (pointer: fine) and (hover: hover) › .carousel .track:hover` | `animation-duration: 1.4s; animation-iteration-count: infinite; animation-name: animated-cursor; cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/1.png), auto` |
| 899 | KEYFRAME | `@keyframes animated-cursor › 0%` | `cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/1.png), auto` |
| 902 | KEYFRAME | `@keyframes animated-cursor › 7%` | `cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/2.png), auto` |
| 905 | KEYFRAME | `@keyframes animated-cursor › 21%` | `cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/3.png), auto` |
| 908 | KEYFRAME | `@keyframes animated-cursor › 28%` | `cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/4.png), auto` |
| 911 | KEYFRAME | `@keyframes animated-cursor › 35%` | `cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/5.png), auto` |
| 914 | KEYFRAME | `@keyframes animated-cursor › 42%` | `cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/6.png), auto` |
| 917 | KEYFRAME | `@keyframes animated-cursor › 49%` | `cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/7.png), auto` |
| 920 | KEYFRAME | `@keyframes animated-cursor › 56%` | `cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/8.png), auto` |
| 923 | KEYFRAME | `@keyframes animated-cursor › 63%` | `cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/9.png), auto` |
| 926 | KEYFRAME | `@keyframes animated-cursor › 70%` | `cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/10.png), auto` |
| 929 | KEYFRAME | `@keyframes animated-cursor › 77%` | `cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/11.png), auto` |
| 932 | KEYFRAME | `@keyframes animated-cursor › 84%` | `cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/12.png), auto` |
| 935 | KEYFRAME | `@keyframes animated-cursor › to` | `cursor: url(https://eyes.nasa.gov/apps/solar-system/assets/default/cursor/12.png), auto` |
| 939 | carousel-container | `.carousel-container .carousel .icon-greater.up` | `transform: rotate(-90deg)` |
| 942 | carousel-container | `.carousel-container .carousel .icon-greater.down` | `transform: rotate(90deg)` |
| 945 | carousel-container | `.carousel-container .carousel .navigation-button` | `background: transparent; color: var(--white); cursor: pointer; padding: 10px; pointer-events: all; transition: all .3s ease; z-index: 2` |
| 954 | carousel-container | `.carousel-container .carousel .navigation-button:active` | `background: var(--whiteAlpha15)` |
| 957 | carousel-container | `.carousel-container .carousel .navigation-button:focus` | `outline: 0` |
| 960 | carousel-container | `.carousel-container .carousel .navigation-button .icon` | `display: block; margin: auto` |
| 964 | carousel-container | `.carousel-container .carousel .navigation-button .icon.hidden` | `display: none` |
| 967 | carousel-container | `.carousel-container .carousel.vertical .navigation-button` | `align-self: start` |
| 970 | carousel-container | `.carousel-container .carousel .track > .slide .navigation-button.replay, .carousel-container .carousel .track > .slide:first-child .navigation-button.prev, .carousel-container .carousel .track > .slide:last-child .navigation-button.next` | `display: none` |
| 975 | carousel-container | `.carousel-container .carousel.vertical .navigation-button.next, .carousel-container .carousel.vertical .navigation-button.replay` | `align-self: center; justify-self: end; margin: auto` |
| 981 | carousel-container | `.carousel-container .carousel .mobile-hint` | `align-items: center; display: flex; justify-content: center; pointer-events: none` |
| 987 | carousel-container | `.carousel-container .carousel .mobile-hint span` | `display: inline-block; vertical-align: middle` |
| 991 | carousel-container | `.carousel-container .carousel .slide.overlay .mobile-hint` | `order: 2` |
| 994 | carousel-container | `.carousel-container .carousel .slide:only-child .mobile-hint, .carousel-container .carousel .track > .slide:first-child:last-child .navigation-button.replay` | `display: none` |
| 998 | carousel-container | `.carousel-container .carousel .track > .slide:first-child .mobile-hint .icon-greater.up, .carousel-container .carousel .track > .slide:last-child .mobile-hint .icon-greater.down` | `visibility: hidden` |
| 1002 | carousel-container | `.carousel-container .collapse-container` | `grid-column: side; grid-row: head-start/foot-end; justify-self: end; position: relative; width: 100%` |
| 1009 | carousel-container | `.carousel-container .mobile-collapse` | `bottom: 30%; position: absolute; right: 10px` |
| 1014 | carousel-container | `.carousel-container .carousel .slide.overlay .collapse-container` | `display: none` |
| 1018 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .carousel .slide .content-container` | `-webkit-mask-image: linear-gradient( 0deg, #000 95%, transparent); mask-image: linear-gradient( 0deg, #000 95%, transparent)` |
| 1030 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .carousel .slide.overlay .content-container` | `-webkit-mask-image: none; mask-image: none` |
| 1034 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .carousel .slide .content-wrapper` | `justify-content: flex-start; padding: 5% 20px 20px` |
| 1038 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .carousel .slide.overlay .content-wrapper` | `padding: 0` |
| 1041 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .carousel .slide .content-wrapper .content` | `flex-flow: column; flex-wrap: nowrap` |
| 1045 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .carousel .controls` | `margin-left: auto` |
| 1048 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .carousel .controls .icon-clock` | `margin-right: 10px` |
| 1051 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .progress` | `bottom: 0; height: 40%; transform: none` |
| 1056 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .carousel .navigation-button, .carousel-container .carousel .track > .slide:last-child .navigation-button.replay` | `display: none` |
| 1060 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .carousel .track > .slide:last-child .navigation-button.replay.mobile` | `display: block` |
| 1063 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .carousel .track > .slide:first-child:last-child .navigation-button.replay.mobile` | `display: none` |
| 1068 | carousel-container | `@media only screen and (min-width: 320px) and (orientation: landscape) › .carousel-container .carousel .slide .content-wrapper` | `padding: 10px 20px 20px` |
| 1071 | carousel-container | `@media only screen and (min-width: 320px) and (orientation: landscape) › .carousel-container .carousel .slide .content-wrapper .content` | `flex-flow: row; flex-wrap: wrap` |
| 1077 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .carousel .slide .container` | `align-content: center` |
| 1080 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .carousel .slide .content-container` | `-webkit-mask-image: none; mask-image: none` |
| 1084 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .carousel .slide .collapse-container` | `display: none` |
| 1087 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .carousel .slide .content-wrapper` | `justify-content: center; padding: 0 20px 20px 40px` |
| 1091 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .carousel .slide .content-wrapper .content` | `flex-flow: column; flex-wrap: nowrap` |
| 1095 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .carousel .controls` | `display: none` |
| 1098 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .progress` | `height: 80%; top: 0` |
| 1102 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .carousel .navigation-button, .carousel-container .carousel .track > .slide:last-child .navigation-button.replay` | `display: block` |
| 1106 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .carousel .mobile-hint, .carousel-container .carousel .track > .slide:last-child .navigation-button.replay.mobile` | `display: none` |
| 1110 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .close-button` | `margin: 20px 20px 0 0` |
| 1114 | tutorial-overlay | `#tutorial-overlay` | `backdrop-filter: blur(5px); background-color: rgba(11, 17, 19, .8); display: flex; flex-direction: column; inset: 0; justify-content: space-between; mask-image: var(--tutorial-mask-grad); -webkit-mask-image: var(--tutorial-mask-grad); mask-position: var(--tutorial-mask-pos,50% 50%); -webkit-mask-position: var(--tutorial-mask-pos,50% 50%); mask-repeat: no-repeat; -webkit-mask-repeat: no-repeat; mask-size: var(--tutorial-mask-size,200% 200%); -webkit-mask-size: var(--tutorial-mask-size,200% 200%); opacity: 1; padding: 4vh 6vh 2vh; pointer-events: all; position: absolute; transition-duration: .8s, .8s; transition-property: opacity, visibility; transition-timing-function: var(--ease-out-bezier); visibility: visible; z-index: 1000` |
| 1140 | tutorial-overlay | `@supports not (backdrop-filter:blur()) › #tutorial-overlay` | `background-color: rgba(11, 17, 19, .95)` |
| 1144 | tutorial-overlay | `#tutorial-overlay.hidden` | `display: flex; opacity: 0; pointer-events: none; transition-duration: .4s; visibility: hidden` |
| 1151 | tutorial-overlay | `#tutorial-overlay .swiper` | `--swiper-pagination-bullet-horizontal-gap: 0; --swiper-pagination-color: var(--grayblueMed); --swiper-pagination-bullet-inactive-color: var(--grayblueMed); flex-grow: 0.3; max-width: 600px; overflow: visible; width: 100%` |
| 1160 | tutorial-overlay | `#tutorial-overlay .swiper-wrapper` | `align-items: center` |
| 1163 | tutorial-overlay | `#tutorial-overlay .swiper-slide` | `opacity: 0; transition: opacity .5s var(--ease-out-bezier)` |
| 1167 | tutorial-overlay | `#tutorial-overlay .swiper-slide-active` | `opacity: 1; transition-duration: .5s; transition-property: opacity, transform; transition-timing-function: var(--ease-out-bezier)` |
| 1173 | tutorial-overlay | `#tutorial-overlay .swiper-slide > h2` | `color: var(--grayblueWhite); font-size: clamp(26px, min(5vw, 5vh), 56px); font-weight: 100; text-transform: uppercase` |
| 1179 | tutorial-overlay | `#tutorial-overlay .swiper-slide > p` | `color: var(--grayblueMed); font-size: clamp(14px, min(1.8vw, 1.8vh), 18px); font-weight: 100; line-height: 1.6; margin-bottom: clamp(1em, 4vh, 4em); margin-top: clamp(0em, 2vh, 3em)` |
| 1187 | tutorial-overlay | `#tutorial-overlay .swiper-slide > p > br.big-br` | `content: ""; display: block; margin-top: clamp(0em, 2vh, 2em)` |
| 1192 | swiper-slide | `.swiper-slide > div.tutorial-extra` | `align-items: baseline; display: flex; flex-direction: column; height: 15vh; opacity: 1; transition-duration: .5s; transition-property: opacity, visibility, height; transition-timing-function: var(--ease-out-bezier); visibility: visible` |
| 1206 | swiper-slide | `.swiper-slide > div.tutorial-extra > h5` | `border: 1px solid var(--grayblueText); border-radius: 4px; color: var(--grayblueMed); font-size: clamp(14px, min(1.8vw, 1.8vh), 18px); font-weight: 600; line-height: 1.3; margin-left: .5em; padding: .2em .6em .1em; transform: rotate(-5deg)` |
| 1217 | swiper-slide | `.swiper-slide > div.tutorial-extra > p` | `color: var(--grayblueMed); font-size: clamp(12px, min(1.5vw, 1.5vh), 16px); margin: .5em 0 0 2em` |
| 1222 | tutorial-overlay | `#tutorial-overlay .bullet-container` | `display: flex; justify-content: space-around; left: 10%; min-height: 15px; opacity: 1; position: absolute; transition: opacity .6s ease-out, width .6s var(--ease-out-bezier), transform .5s var(--ease-out-bezier); width: 80%` |
| 1235 | tutorial-overlay | `#tutorial-overlay .bullet-container.hidden` | `opacity: 0; transition: opacity .2s ease-in, width .3s var(--ease-out-bezier); width: 0` |
| 1240 | tutorial-overlay | `#tutorial-overlay .bullet-container:before` | `background-color: var(--grayblueDivider); content: ""; height: 1px; position: absolute; top: clamp(-36px, -3vh, -15px); width: calc(100% + 8vw)` |
| 1248 | tutorial-overlay | `#tutorial-overlay span.swiper-pagination-bullet` | `cursor: pointer; position: relative` |
| 1252 | tutorial-overlay | `#tutorial-overlay span.swiper-pagination-bullet:before` | `content: ""; inset: max(-2vw, -14px); position: absolute` |
| 1257 | tutorial-overlay | `#tutorial-overlay .swiper-pagination-bullet-active` | `transform: scale(1.2); transition: all .3s ease-out` |
| 1261 | tutorial-carousel | `.tutorial-carousel .swiper-button-next, .tutorial-carousel .swiper-button-prev` | `bottom: max(-4em, -12vh); opacity: 1; top: unset; transition-duration: .5s; transition-property: filter, opacity, transform; transition-timing-function: var(--ease-out-bezier)` |
| 1273 | tutorial-carousel | `.tutorial-carousel .swiper-button-prev` | `left: 5%` |
| 1276 | tutorial-carousel | `.tutorial-carousel .swiper-button-next` | `right: 5%` |
| 1279 | tutorial-carousel | `.tutorial-carousel .swiper-button-next.swiper-button-disabled, .tutorial-carousel .swiper-button-prev.swiper-button-disabled` | `opacity: 0` |
| 1283 | tutorial-carousel | `.tutorial-carousel .swiper-button-next:after, .tutorial-carousel .swiper-button-prev:after` | `color: var(--grayblueMed); font-family: Metropolis, sans-serif; font-size: clamp(14px, 2vh, 16px); line-height: 1.2` |
| 1290 | tutorial-carousel | `.tutorial-carousel .swiper-button-prev:after` | `content: "Previous"; left: calc(100% + 12px); position: absolute` |
| 1295 | tutorial-carousel | `.tutorial-carousel .swiper-button-next:after` | `content: "Next"; position: absolute; right: calc(100% + 12px)` |
| 1300 | tutorial-carousel | `.tutorial-carousel .swiper-button-next:before, .tutorial-carousel .swiper-button-prev:before` | `content: ""; inset: -10px; position: absolute; z-index: -1` |
| 1307 | tutorial-carousel | `.tutorial-carousel .swiper-button-prev:before` | `right: -90px` |
| 1310 | tutorial-carousel | `.tutorial-carousel .swiper-button-next:before` | `left: -60px` |
| 1313 | tutorial-overlay | `#tutorial-overlay .dismiss-container` | `align-items: center; display: flex; flex-direction: column; flex-grow: 0.3; justify-content: flex-end; transition-duration: .5s; transition-property: transform, flex-grow; transition-timing-function: var(--ease-out-bezier)` |
| 1323 | tutorial-overlay | `#tutorial-overlay .dismiss-button` | `border: 1px solid var(--grayblueMed); border-radius: 24px; color: var(--grayblueText); font-size: clamp(12px, 2vh, 16px); font-weight: 600; padding: .5em 1.5em; transition: filter .2s ease-in` |
| 1332 | tutorial-overlay | `#tutorial-overlay .dismiss-button:active, #tutorial-overlay .dismiss-button:hover` | `filter: brightness(1.5); transition: filter .4s ease-out` |
| 1337 | tutorial-overlay | `#tutorial-overlay footer` | `height: 10vh; opacity: 1; transition-duration: 2s; transition-property: opacity, visibility, height; transition-timing-function: var(--ease-out-bezier); visibility: visible` |
| 1348 | tutorial-smallprint | `footer p.tutorial-smallprint` | `color: var(--grayblueText); font-size: clamp(11px, 1.2vh, 14px); line-height: clamp(1.2em, 2vh, 2.5em); margin: auto; max-width: 500px; text-align: center` |
| 1356 | tutorial-smallprint | `footer p.tutorial-smallprint > a` | `color: var(--grayblueLight); text-decoration: underline; transition: color .2s ease-in` |
| 1361 | tutorial-overlay | `#tutorial-overlay.tutorial-slide-labels .bullet-container, #tutorial-overlay.tutorial-slide-labels .swiper-button-next, #tutorial-overlay.tutorial-slide-labels .swiper-button-prev, #tutorial-overlay.tutorial-slide-nav3d .bullet-container, #tutorial-overlay.tutorial-slide-nav3d .swiper-button-next, #tutorial-overlay.tutorial-slide-nav3d .swiper-button-prev` | `transform: translateY(max(2vh, 2vw))` |
| 1369 | tutorial-overlay | `#tutorial-overlay .swiper-slide.tutorial-slide-labels, #tutorial-overlay .swiper-slide.tutorial-slide-nav3d` | `transform: translateY(-12vh)` |
| 1373 | tutorial-overlay | `#tutorial-overlay.tutorial-slide-time footer` | `opacity: 0; transition-duration: 1.2s; visibility: hidden` |
| 1378 | tutorial-overlay | `#tutorial-overlay.tutorial-slide-time .dismiss-container` | `flex-grow: 0.1` |
| 1382 | tutorial-overlay | `@media only screen and (max-width: 641px) and (orientation: portrait) › #tutorial-overlay.tutorial-slide-complete footer, #tutorial-overlay.tutorial-slide-filters footer, #tutorial-overlay.tutorial-slide-learn footer, #tutorial-overlay.tutorial-slide-search footer, #tutorial-overlay.tutorial-slide-settings footer, #tutorial-overlay.tutorial-slide-watch footer` | `opacity: 0; transition-duration: 1.2s; visibility: hidden` |
| 1394 | tutorial-overlay | `@media only screen and (max-height: 641px) › #tutorial-overlay footer, .swiper-slide > div.tutorial-extra` | `height: 0; opacity: 0; visibility: hidden` |
| 1400 | tutorial-overlay | `@media only screen and (max-height: 641px) › #tutorial-overlay footer` | `transition-duration: 1.2s` |
| 1405 | tutorial-overlay | `@media only screen and (max-height: 481px) › #tutorial-overlay.tutorial-slide-time .dismiss-container` | `transform: translateY(-15vh)` |
| 1408 | tutorial-overlay | `@media only screen and (max-height: 481px) › #tutorial-overlay.tutorial-slide-time .bullet-container, #tutorial-overlay.tutorial-slide-time .swiper-button-next, #tutorial-overlay.tutorial-slide-time .swiper-button-prev, #tutorial-overlay.tutorial-slide-time .swiper-slide-active` | `transform: translateY(-12vh)` |
| 1416 | tutorial-overlay | `@media only screen and (min-width: 320px) and (max-width: 767px) › #tutorial-overlay.tutorial-slide-time .dismiss-button` | `transform: translateY(-10vh); z-index: 10` |
| 1420 | tutorial-overlay | `@media only screen and (min-width: 320px) and (max-width: 767px) › #tutorial-overlay.tutorial-slide-time .bullet-container, #tutorial-overlay.tutorial-slide-time .swiper-button-next, #tutorial-overlay.tutorial-slide-time .swiper-button-prev, #tutorial-overlay.tutorial-slide-time .swiper-slide-active` | `transform: translateY(-10vh)` |
| 1428 | tutorial-carousel | `@media only screen and (max-width: 481px) › .tutorial-carousel .swiper-button-next:after, .tutorial-carousel .swiper-button-prev:after` | `content: ""` |
| 1434 | tutorial-carousel | `@media (pointer: fine) and (hover: hover) › .tutorial-carousel .swiper-button-next:hover, .tutorial-carousel .swiper-button-prev:hover` | `filter: brightness(1.5)` |
| 1438 | tutorial-smallprint | `@media (pointer: fine) and (hover: hover) › footer p.tutorial-smallprint > a:hover` | `color: var(--grayblueWhite); transition: color .3s ease-out` |
| 1443 | panel-container | `#panel-container` | `--sandMed: #cbb296; align-self: center; grid-column-start: 1; grid-row-start: 3; height: -moz-fit-content; height: fit-content; max-height: calc(100vh - 72px); min-width: 300px; opacity: 1; padding: 0; position: relative; top: 3em; transition-duration: .6s; transition-property: opacity, visibility; transition-timing-function: var(--ease-out-bezier); visibility: visible; z-index: 1` |
| 1462 | panel-container | `#panel-container.hidden` | `display: unset; opacity: 0; transition-duration: .3s; visibility: hidden` |
| 1468 | panel-container | `#panel-container .panel-simple` | `left: 8px; pointer-events: all; position: absolute; top: 50px` |
| 1474 | panel-simple | `.panel-simple > .expand-button .icon` | `transform: rotate(-90deg)` |
| 1477 | panel-simple | `.panel-simple > h5.simple-pretitle` | `color: var(--grayblueText); font-size: 18px; line-height: 1.5; margin: -4px 0 0 11px` |
| 1483 | panel-simple | `.panel-simple > h4.simple-title` | `font-size: 22px; margin: 8px 0 0 10px; text-transform: capitalize` |
| 1488 | panel-container | `#panel-container.collapsed .panel-simple` | `opacity: 1; transition-delay: .2s; transition-duration: .6s; transition-property: opacity, visibility; transition-timing-function: var(--ease-out-bezier); visibility: visible` |
| 1496 | panel-container | `#panel-container.collapsed .panel-simple > *` | `transition: transform .6s .1s var(--ease-out-bezier)` |
| 1499 | panel-container | `#panel-container.expanded .panel-simple` | `opacity: 0; pointer-events: none; transition-duration: .3s; visibility: hidden` |
| 1505 | panel-container | `#panel-container.expanded .panel-simple > .expand-button > .icon` | `transform: translateX(100%) rotate(90deg); transition-duration: .2s` |
| 1509 | panel-container | `#panel-container.expanded .panel-simple > h5.simple-pretitle` | `transition-duration: .3s` |
| 1512 | panel-container | `#panel-container.expanded .panel-simple > h4.simple-title` | `transform: translateY(-200%); transition-duration: .4s` |
| 1516 | panel-container | `#panel-container .panel-main` | `background: var(--bgGradient); border-radius: 12px; display: flex; flex-direction: column; height: 100%; opacity: 1; padding: 10px 20px; pointer-events: all; transition-duration: .6s; transition-property: opacity, visibility, transform; transition-timing-function: var(--ease-out-bezier); visibility: visible; z-index: 101` |
| 1534 | panel-container | `#panel-container.collapsed .panel-main` | `opacity: 0; pointer-events: none; transform: translateX(-75%); transition-duration: .3s; visibility: hidden` |
| 1541 | panel-header | `.panel-header .header-title` | `align-items: center; display: flex; justify-content: space-between` |
| 1546 | header-title | `.header-title .title-icon` | `flex-shrink: 0; transform: scale(1.2)` |
| 1550 | header-title | `.header-title > h4.title-text` | `padding: 0 .5em` |
| 1553 | header-title | `.header-title .collapse-button` | `opacity: .8` |
| 1556 | header-title | `.header-title .collapse-button > .icon` | `margin-right: -10px; transform: rotate(90deg)` |
| 1560 | panel-header | `.panel-header .header-caption` | `color: var(--grayblueText); font-size: 14px; margin-top: 4px; text-align: center; white-space: nowrap` |
| 1567 | panel-main | `.panel-main .panel-content` | `height: inherit` |
| 1570 | panel-container | `#panel-container .tabs-container` | `display: flex; font-size: 12px; justify-content: space-between; margin-top: 0; position: relative` |
| 1577 | panel-container | `#panel-container .tabs-container.tabs-2` | `justify-content: space-around` |
| 1580 | panel-container | `#panel-container .tabs-container.tabs-1` | `opacity: 0` |
| 1583 | panel-container | `#panel-container .tabs-container > button` | `color: var(--grayblueMed); padding: .2em; position: relative; transition: color .2s .1s var(--ease-out-bezier)` |
| 1589 | panel-container | `#panel-container .tabs-container > button.active` | `color: var(--grayblueWhite); transition: color .3s var(--ease-out-bezier)` |
| 1593 | panel-container | `#panel-container .tabs-container > button:after` | `background-color: var(--sandMed); bottom: 0; content: ""; height: 2.5px; left: 0; position: absolute; transform: scaleX(0); transition: transform .2s .1s var(--ease-out-bezier); width: 100%` |
| 1604 | panel-container | `#panel-container .tabs-container > button.active:after` | `transform: scaleX(1); transition: transform .5s var(--ease-out-bezier)` |
| 1608 | panel-content | `.panel-content .swiper` | `--swiper-pagination-bullet-horizontal-gap: 0; --swiper-pagination-color: var(--grayblueMed); --swiper-pagination-bullet-inactive-color: var(--grayblueMed); padding: 3em 0 1em; width: 100%` |
| 1615 | swiper | `.swiper .swiper-wrapper` | `align-items: center; transition-timing-function: var(--ease-out-bezier)` |
| 1619 | swiper-wrapper | `.swiper-wrapper .swiper-slide` | `display: flex; flex-direction: column; justify-content: center` |
| 1624 | panel-content | `.panel-content .bullet-container` | `display: flex; justify-content: space-around; margin: 1em auto 3.5em; min-height: 8px; opacity: 1; transition: opacity .6s ease-out, width .6s var(--ease-out-bezier); width: 62%; z-index: 1` |
| 1634 | panel-content | `.panel-content .bullet-container.hidden` | `opacity: 0; transition: opacity .2s ease-in, width .3s var(--ease-out-bezier); width: 0` |
| 1639 | panel-content | `.panel-content span.swiper-pagination-bullet` | `cursor: pointer; position: relative` |
| 1643 | panel-content | `.panel-content span.swiper-pagination-bullet:before` | `content: ""; inset: -8px; position: absolute` |
| 1648 | panel-content | `.panel-content .swiper-pagination-bullet-active` | `transform: scale(1.2); transition: all .3s ease-out` |
| 1652 | panel-content | `.panel-content .swiper-button-next, .panel-content .swiper-button-prev` | `bottom: 20px; opacity: 1; top: unset; transition: filter .25s ease-out, opacity .3s ease-out` |
| 1660 | header-title | `@media (pointer: fine) and (hover: hover) › .header-title .collapse-button:hover` | `opacity: 1` |
| 1663 | panel-container | `@media (pointer: fine) and (hover: hover) › #panel-container .tabs-container > button:hover` | `color: var(--grayblueWhite)` |
| 1666 | panel-content | `@media (pointer: fine) and (hover: hover) › .panel-content .swiper-button-next:hover, .panel-content .swiper-button-prev:hover` | `filter: brightness(1.5); transition: filter .5s ease-out` |
| 1672 | panel-content | `.panel-content .swiper-button-next:after, .panel-content .swiper-button-prev:after` | `color: var(--grayblueText); font-family: Metropolis, sans-serif; font-size: 14px; line-height: 1.2` |
| 1679 | panel-content | `.panel-content .swiper-button-prev:after` | `content: "Previous"; left: calc(100% + 12px); position: absolute` |
| 1684 | panel-content | `.panel-content .swiper-button-next:after` | `content: "Next"; position: absolute; right: calc(100% + 12px)` |
| 1689 | panel-content | `.panel-content .swiper-button-next:before, .panel-content .swiper-button-prev:before` | `content: ""; inset: -10px; position: absolute; z-index: -1` |
| 1696 | panel-content | `.panel-content .swiper-button-prev:before` | `right: -90px` |
| 1699 | panel-content | `.panel-content .swiper-button-next:before` | `left: -60px` |
| 1702 | panel-content | `.panel-content .swiper-button-next.swiper-button-disabled, .panel-content .swiper-button-prev.swiper-button-disabled` | `opacity: 0; transition: opacity .25s ease-out` |
| 1708 | panel-container | `@media only screen and (max-width: 641px) and (orientation: portrait) › #panel-container` | `align-self: flex-end; grid-column: foot-start/foot-end; grid-row-end: -1; grid-row-start: unset; min-width: 0; padding: 0 20px; top: unset` |
| 1717 | panel-container | `@media only screen and (max-width: 641px) and (orientation: portrait) › #panel-container .panel-simple` | `bottom: 100px; left: 2.5vw; margin: 0; min-width: 150px; top: unset` |
| 1724 | panel-container | `@media only screen and (max-width: 641px) and (orientation: portrait) › #panel-container.collapsed .panel-simple > *` | `transition: transform .3s var(--ease-out-bezier)` |
| 1727 | panel-simple | `@media only screen and (max-width: 641px) and (orientation: portrait) › .panel-simple > .expand-button` | `left: 5em; position: absolute; top: -23%` |
| 1732 | panel-simple | `@media only screen and (max-width: 641px) and (orientation: portrait) › .panel-simple > .expand-button > .icon` | `transform: rotate(-180deg)` |
| 1735 | panel-container | `@media only screen and (max-width: 641px) and (orientation: portrait) › #panel-container.expanded .panel-simple > .expand-button > .icon` | `transform: rotate(0deg)` |
| 1738 | panel-container | `@media only screen and (max-width: 641px) and (orientation: portrait) › #panel-container .panel-main` | `border-radius: 12px; bottom: 90px; padding: 2.7vw 4.8vw; position: relative` |
| 1744 | panel-container | `@media only screen and (max-width: 641px) and (orientation: portrait) › #panel-container.collapsed .panel-main` | `transform: translateY(75%)` |
| 1747 | panel-header | `@media only screen and (max-width: 641px) and (orientation: portrait) › .panel-header .header-caption` | `margin-top: -4px; text-align: center` |
| 1751 | header-title | `@media only screen and (max-width: 641px) and (orientation: portrait) › .header-title .collapse-button > .icon` | `transform: rotate(0)` |
| 1754 | panel-container | `@media only screen and (max-width: 641px) and (orientation: portrait) › #panel-container .tabs-container` | `margin-top: .5em` |
| 1759 | panel-container | `@media only screen and (max-width: 641px) and (orientation: landscape) › #panel-container` | `padding: 0` |
| 1764 | panel-container | `@media only screen and (min-width: 961px) › #panel-container` | `min-width: 385px` |
| 1767 | panel-simple | `@media only screen and (min-width: 961px) › .panel-simple > h4.simple-title` | `font-size: 29px` |
| 1770 | panel-container | `@media only screen and (min-width: 961px) › #panel-container .panel-main` | `padding: 20px 30px` |
| 1773 | panel-header | `@media only screen and (min-width: 961px) › .panel-header .header-caption` | `font-size: 18px` |
| 1776 | header-title | `@media only screen and (min-width: 961px) › .header-title .title-icon` | `flex-shrink: 0; transform: scale(1.4)` |
| 1780 | header-title | `@media only screen and (min-width: 961px) › .header-title > h4.title-text` | `font-size: 29px` |
| 1783 | panel-container | `@media only screen and (min-width: 961px) › #panel-container .tabs-container` | `font-size: 14px` |
| 1786 | panel-content | `@media only screen and (min-width: 961px) › .panel-content .swiper-button-next:after, .panel-content .swiper-button-prev:after` | `font-size: 16px` |
| 1790 | header-title | `@media only screen and (min-width: 961px) › .header-title > .collapse-button, .panel-simple > .expand-button` | `transform: scale(1.2); transform-origin: left` |
| 1797 | panel-content | `@media only screen and (max-height: 900px) › .panel-content .swiper` | `padding: 3em 0 0` |
| 1800 | panel-content | `@media only screen and (max-height: 900px) › .panel-content .swiper-button-next, .panel-content .swiper-button-prev` | `bottom: 1.5em` |
| 1804 | panel-content | `@media only screen and (max-height: 900px) › .panel-content .swiper-button-next:before, .panel-content .swiper-button-prev:before` | `inset: -6px` |
| 1808 | panel-content | `@media only screen and (max-height: 900px) › .panel-content .swiper-button-next:after, .panel-content .swiper-button-prev:after` | `content: ""` |
| 1812 | panel-content | `@media only screen and (max-height: 900px) › .panel-content .bullet-container` | `margin: 1em auto 1.7em` |
| 1817 | panel-container | `@media only screen and (max-height: 641px) › #panel-container.collapsed .panel-simple > .expand-button` | `margin-bottom: -14px` |
| 1820 | panel-simple | `@media only screen and (max-height: 641px) › .panel-simple > h5.simple-pretitle` | `margin-bottom: -2px` |
| 1823 | panel-content | `@media only screen and (max-height: 641px) › .panel-content .swiper` | `padding: 2em 0 1.5em` |
| 1826 | panel-container | `@media only screen and (max-height: 641px) › #panel-container .tabs-container` | `margin-top: .5em` |
| 1829 | panel-content | `@media only screen and (max-height: 641px) › .panel-content .swiper-button-next, .panel-content .swiper-button-prev` | `bottom: 1.2em` |
| 1833 | panel-content | `@media only screen and (max-height: 641px) › .panel-content .bullet-container` | `margin: 2em auto 0` |
| 1838 | panel-container | `@media only screen and (max-height: 641px) and (min-width: 641px) › #panel-container` | `grid-row-end: -2` |
| 1843 | panel-container | `@media only screen and (max-height: 500px) › #panel-container` | `align-self: flex-end; grid-row-end: -1; top: unset` |
| 1848 | panel-container | `@media only screen and (max-height: 500px) › #panel-container .panel-main` | `border-radius: 12px 12px 0 0` |
| 1851 | panel-header | `@media only screen and (max-height: 500px) › .panel-header .header-title` | `height: 2.5em` |
| 1854 | panel-header | `@media only screen and (max-height: 500px) › .panel-header .header-caption` | `display: none` |
| 1859 | panel-content | `@media only screen and (max-height: 370px) › .panel-content .bullet-container` | `margin: 1.5em auto 0` |
| 1863 | share-button | `.share-button` | `align-items: center; background-color: var(--cta-blue); border-radius: .375em; color: var(--white); display: flex; font-family: Inter, Metropolis, sans-serif; font-size: 1rem; font-weight: 500; gap: .4em; height: calc(1em + 24px); justify-content: center; margin-top: 2rem; order: 2; padding: 0 1em; transition: all .3s ease; width: calc(100% - .75rem)` |
| 1884 | share-button | `.share-button:hover` | `background-color: var(--cta-blue); filter: brightness(1.2)` |
| 1888 | share-modal | `#share-modal` | `align-items: center; backdrop-filter: blur(.5rem); background-color: var(--blackAlpha); display: flex; inset: 0; justify-content: center; pointer-events: all; position: fixed; transition: opacity .3s, visibility .3s; z-index: 55; --embed-aspect-ratio: 1.777; --iframe-width: 100%; --iframe-height: 100%; --iframe-scale: 0.3; --iframe-offset-x: 0` |
| 1905 | share-modal | `#share-modal.hidden` | `opacity: 0; pointer-events: none; visibility: hidden` |
| 1910 | share-modal | `#share-modal > article` | `background-image: var(--darkGrayBgGradientBtm); border-radius: .5rem; max-height: calc(100% - min(5vh, 2.5rem)); max-width: calc(100% - min(5vw, 2.5rem)); padding: min(max(1vh, 1vw), 1rem); position: relative; width: 30rem` |
| 1919 | share-modal | `#share-modal .modal-header` | `align-items: center; display: flex; gap: 1rem; height: auto; justify-content: space-between; margin: 0 0 min(.2vh, .5rem); padding-bottom: clamp(1.5rem, 4vh, 3rem); position: relative` |
| 1929 | share-modal | `#share-modal .modal-header .icon-share` | `height: 2rem; padding: .4rem; width: 2rem` |
| 1934 | share-modal | `#share-modal .modal-header .modal-title` | `font-size: clamp(1.3rem, min(6vw, 6vh), 1.8rem); transform: translateY(.05rem)` |
| 1938 | share-modal | `#share-modal .modal-header .modal-close` | `opacity: .7; transform: scale(1.5); transition: opacity .1s, transform .1s` |
| 1943 | share-modal | `#share-modal .modal-header .modal-close:hover, .touch #share-modal .modal-header .modal-close` | `opacity: 1; transform: scale(1.5); transition: opacity .2s, transform .2s` |
| 1949 | share-modal | `#share-modal ul.tab-headers` | `align-items: center; bottom: 0; display: flex; justify-content: flex-start; margin: 0 0 0 .5rem; padding: 0; position: absolute; width: calc(100% - 1rem)` |
| 1959 | share-modal | `#share-modal ul.tab-headers:after` | `background-color: var(--grayDivider); bottom: 0; content: ""; height: .08rem; left: 0; position: absolute; right: 0` |
| 1968 | share-modal | `#share-modal ul.tab-headers > li` | `list-style: none; opacity: .7; padding: .5rem 1rem; position: relative; transition: opacity .2s` |
| 1975 | share-modal | `#share-modal ul.tab-headers > li.active, #share-modal ul.tab-headers > li:hover` | `opacity: 1` |
| 1979 | share-modal | `#share-modal ul.tab-headers button:after` | `background-color: var(--cta-blue); bottom: 0; content: ""; height: .08rem; left: 0; position: absolute; right: 0; transform: scaleX(0); transition: transform .2s .1s var(--ease-out-bezier); z-index: 1` |
| 1991 | share-modal | `#share-modal li:first-child button:after` | `transform-origin: right` |
| 1994 | share-modal | `#share-modal li:last-child button:after` | `transform-origin: left` |
| 1997 | share-modal | `#share-modal ul.tab-headers > li.active > button:after` | `transform: scaleX(1); transition: transform .3s var(--ease-out-bezier)` |
| 2001 | share-modal | `#share-modal .tab-content` | `padding: min(max(1vh, 1vw), 1rem); position: relative` |
| 2005 | share-modal | `#share-modal .tab-pane` | `display: none` |
| 2008 | share-modal | `#share-modal .tab-pane.active` | `display: flex; flex-direction: column; gap: min(1.5vh, 1.5rem)` |
| 2013 | share-modal | `#share-modal .embed > section` | `display: flex; flex-direction: column; gap: min(1vh, 1rem)` |
| 2018 | share-modal | `#share-modal .embed > section.options-section` | `height: min(min(36vw, 33vh), 20rem)` |
| 2021 | share-modal | `#share-modal .embed .options-container` | `height: 100%; padding-right: max(6vw, 1rem)` |
| 2025 | share-modal | `#share-modal .link-container` | `display: flex; flex-direction: column` |
| 2029 | share-modal | `#share-modal .link-container span` | `color: var(--gray); display: block; font-size: clamp(.5rem, min(2.5vw, 2.5vh), .8rem); text-align: center` |
| 2035 | share-modal | `#share-modal code` | `background-image: var(--blackGradientVert); border-radius: .3rem; font-size: clamp(.7rem, min(3vw, 3vh), .9rem); max-width: 30rem; overflow-x: scroll; padding: .4rem .8rem; -webkit-user-select: all; -moz-user-select: all; user-select: all; white-space: nowrap` |
| 2048 | share-modal | `@supports not selector(::-webkit-scrollbar) › #share-modal code` | `scrollbar-color: var(--grayDivider) var(--grayDarkAlpha80); scrollbar-width: thin` |
| 2053 | share-modal | `#share-modal code::-webkit-scrollbar` | `height: .4rem` |
| 2056 | share-modal | `#share-modal code::-webkit-scrollbar-track` | `background: var(--blackGradientVert); border-radius: 0 0 .3rem .3rem` |
| 2060 | share-modal | `#share-modal code::-webkit-scrollbar-thumb` | `background: var(--grayDivider); border-radius: .1rem .1rem .3rem .3rem` |
| 2064 | share-modal | `#share-modal code::-webkit-scrollbar-thumb:hover` | `background: var(--gray)` |
| 2067 | share-modal | `#share-modal .tab-content img` | `border-radius: .3rem; margin: 0 auto; max-width: min(45vh, 30rem); width: 100%` |
| 2073 | share-modal | `#share-modal .tab-content button.copy-link` | `background-color: var(--cta-blue); border-radius: .3rem; color: var(--grayLight); padding: .3rem; transition: transform .2s, filter .2s` |
| 2080 | share-modal | `#share-modal .tab-content button.copy-link:hover, .touch #share-modal .tab-content button.copy-link` | `filter: brightness(1.1)` |
| 2084 | share-modal | `#share-modal .tab-content button.copy-link:active` | `filter: brightness(1); transform: scale(.99, .95); transition-duration: .05s` |
| 2089 | share-modal | `#share-modal .copied-overlay` | `align-items: center; backdrop-filter: blur(.1rem); background-image: var(--darkGrayBgGradientBtm); border-radius: .5rem; display: flex; font-size: 1.3rem; inset: 0; justify-content: center; opacity: 0; pointer-events: none; position: absolute` |
| 2102 | share-modal | `#share-modal .copied-overlay.flash` | `animation: flash 2s ease-in` |
| 2105 | share-modal | `#share-modal .preview-container` | `margin: 0 auto; max-width: min(45vh, 30rem); width: 100%` |
| 2110 | share-modal | `#share-modal .preview` | `align-items: center; aspect-ratio: 1.777; display: flex; justify-content: center; position: relative; width: 100%` |
| 2118 | share-modal | `#share-modal .preview-container span` | `color: var(--gray); display: block; font-size: .75rem; pointer-events: none; text-align: center` |
| 2125 | share-modal | `#share-modal .preview iframe` | `border: none; border-radius: 1rem; height: var(--iframe-height); left: 0; position: absolute; top: 0; transform: scale(var(--iframe-scale)) translateX(var(--iframe-offset-x)); transform-origin: 0 0; width: var(--iframe-width)` |
| 2136 | share-modal | `#share-modal section.options-section h5` | `color: var(--grayLight); font-size: clamp(.8rem, min(3.5vw, 3.5vh), 1rem)` |
| 2140 | share-modal | `#share-modal input[type=checkbox], #share-modal input[type=radio]` | `filter: brightness(1.1) hue-rotate(20deg); transform: scale(1.2); transform-origin: right` |
| 2146 | share-modal | `#share-modal input[type=number]` | `-webkit-appearance: textfield; -moz-appearance: textfield; appearance: textfield; background-image: var(--blackGradientVert); border: .1rem solid var(--grayDivider); border-radius: .3rem; color: var(--grayLight); padding: .2rem .4rem; width: 4rem` |
| 2157 | share-modal | `#share-modal input[type=number]::-webkit-inner-spin-button` | `cursor: pointer; filter: invert(.9)` |
| 2161 | share-modal | `#share-modal input[type=number]:invalid` | `border-color: red` |
| 2164 | share-modal | `#share-modal label` | `color: var(--grayMed); font-size: clamp(.6rem, min(3vw, 3vh), .85rem)` |
| 2168 | share-modal | `#share-modal input[type=radio]:checked + label, #share-modal label:hover` | `filter: brightness(1.15)` |
| 2172 | share-modal | `#share-modal span.icon-help:focus, #share-modal span.icon-help:hover` | `filter: brightness(1.2); transform: scale(1.2); transition: filter .2s, transform .2s` |
| 2178 | share-modal | `#share-modal .resolution-preset-buttons` | `display: flex; gap: .3rem; justify-content: center; margin: 2rem 0 0` |
| 2184 | share-modal | `#share-modal .custom-resolution` | `align-items: center; display: flex; gap: .5rem; justify-content: center; margin: .5rem 0` |
| 2191 | share-modal | `#share-modal .custom-resolution input` | `background-color: var(--blackAlpha); border: 1px solid var(--nasa-blue); border-radius: .3rem; color: var(--grayLight); padding: .2rem .6rem; width: 6rem` |
| 2199 | share-modal | `#share-modal .custom-resolution > span` | `color: var(--gray); font-size: 1rem` |
| 2203 | share-modal | `#share-modal .advanced > summary` | `color: var(--grayMed)` |
| 2206 | share-modal | `#share-modal .advanced .options` | `padding: 1rem 0 0` |
| 2209 | share-modal | `#share-modal .advanced > summary:hover, #share-modal .advanced[open] > summary, .touch #share-modal .advanced > summary` | `filter: brightness(1.2)` |
| 2214 | share-modal | `#share-modal .options > h3` | `color: var(--gray); font-size: 1.2rem; margin: .5rem 0; text-align: center` |
| 2220 | share-modal | `#share-modal .embed-group` | `margin: 0 0 1rem` |
| 2223 | share-modal | `#share-modal div.input-container` | `align-items: center; display: flex; gap: .5rem` |
| 2228 | share-modal | `#share-modal div.input-container.greyed-out > label, #share-modal div.input-container.greyed-out > span` | `filter: brightness(.5)` |
| 2232 | share-modal | `#share-modal div.input-container.greyed-out-disabled > input, #share-modal div.input-container.greyed-out-disabled > label, #share-modal div.input-container.greyed-out-disabled > span` | `filter: brightness(.5); pointer-events: none` |
| 2238 | share-modal | `#share-modal fieldset div.input-container:not(:last-child)` | `margin-bottom: .6em` |
| 2241 | share-modal | `#share-modal fieldset div.number-container` | `margin-top: .7em` |
| 2244 | share-modal | `#share-modal fieldset` | `border: 1px solid var(--grayDivider); border-radius: .3rem; padding: .4em .9em .9em` |
| 2249 | share-modal | `#share-modal fieldset.radio-fieldset` | `border-radius: .2rem; margin-top: 1em` |
| 2253 | share-modal | `#share-modal fieldset legend` | `color: var(--gray); font-size: clamp(.75rem, min(3vw, 3vh), .9rem); padding: 0 .5rem` |
| 2259 | share-modal | `@media only screen and (min-width: 961px) › #share-modal > article` | `width: unset` |
| 2262 | share-modal | `@media only screen and (min-width: 961px) › #share-modal .tab-pane.embed.active` | `display: grid; gap: 1rem; grid-auto-columns: minmax(30rem, 42rem) minmax(22rem, auto); grid-auto-flow: column; grid-auto-rows: 0fr; height: 100%` |
| 2270 | share-modal | `@media only screen and (min-width: 961px) › #share-modal .modal-header` | `justify-content: flex-start; padding: 0` |
| 2274 | share-modal | `@media only screen and (min-width: 961px) › #share-modal .modal-header .modal-close` | `margin: 0 0 0 auto` |
| 2277 | share-modal | `@media only screen and (min-width: 961px) › #share-modal ul.tab-headers` | `margin: 0 2rem; position: relative; width: unset` |
| 2282 | share-modal | `@media only screen and (min-width: 961px) › #share-modal ul.tab-headers button:after` | `background-color: var(--cta-blue); bottom: 0; content: ""; height: .16rem; left: 0; position: absolute; right: 0; transform: scaleX(0); transition: transform .2s .1s var(--ease-out-bezier); z-index: 1` |
| 2294 | share-modal | `@media only screen and (min-width: 961px) › #share-modal ul.tab-headers:after` | `height: .16rem` |
| 2297 | share-modal | `@media only screen and (min-width: 961px) › #share-modal .embed code, #share-modal .preview-container` | `max-width: unset` |
| 2301 | share-modal | `@media only screen and (min-width: 961px) › #share-modal .options` | `padding: .5rem .5rem .5rem 0` |
| 2304 | share-modal | `@media only screen and (min-width: 961px) › #share-modal .embed > section` | `gap: 1.5rem` |
| 2307 | share-modal | `@media only screen and (min-width: 961px) › #share-modal .embed .options-container` | `padding-right: 1.5rem` |
| 2310 | share-modal | `@media only screen and (min-width: 961px) › #share-modal .embed > section.options-section` | `gap: .5rem; height: unset; padding: 1rem 0 0 1.5rem` |
| 2315 | share-modal | `@media only screen and (min-width: 961px) › #share-modal .advanced .options` | `padding: 1rem .5rem 0 0` |
| 2320 | share-button | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .share-button` | `background-color: transparent; color: var(--grayMed); gap: .8em; margin: 0; width: unset` |
| 2329 | share-modal | `@media (max-height: 600px) › #share-modal .preview-container, #share-modal .tab-content img` | `display: none` |
| 2333 | share-modal | `@media (max-height: 600px) › #share-modal .embed > section.options-section` | `padding: 0 0 0 1rem` |
| 2338 | KEYFRAME | `@keyframes flash › 0%` | `opacity: 0` |
| 2341 | KEYFRAME | `@keyframes flash › 5%` | `opacity: 1` |
| 2344 | KEYFRAME | `@keyframes flash › 50%` | `opacity: 1` |
| 2347 | KEYFRAME | `@keyframes flash › to` | `opacity: 0` |
| 2351 | time-controller | `.time-controller button:focus` | `box-shadow: none; outline: 0` |
| 2355 | time-controller | `.time-controller label` | `text-transform: uppercase` |
| 2358 | time-controller | `.time-controller .play-pause` | `margin-right: 5%` |
| 2361 | time-controller | `.time-controller .next-rate, .time-controller .prev-rate` | `align-items: center; background: none; border: 0; display: flex; height: 30px; justify-content: center; padding: 0; width: 80px` |
| 2372 | time-controller | `.time-controller .prev-rate` | `margin-left: 10px` |
| 2375 | time-controller | `.time-controller .next-rate` | `margin-right: 10px` |
| 2378 | time-controller | `.time-controller .next-rate .container, .time-controller .prev-rate .container` | `background-color: hsla(0, 0%, 50%, .5); height: 10px; margin: 0 auto; width: 100%` |
| 2385 | time-controller | `.time-controller .prev-rate .container` | `border-radius: 3px 0 0 3px` |
| 2388 | time-controller | `.time-controller .next-rate .container` | `border-radius: 0 3px 3px 0` |
| 2391 | time-controller | `.time-controller label` | `opacity: .6` |
| 2394 | time-controller | `.time-controller .play-pause` | `margin-right: 30px` |
| 2397 | time-controller | `.time-controller .vertical-line` | `opacity: .6` |
| 2400 | time-controller | `.time-controller .next-rate, .time-controller .prev-rate` | `position: relative` |
| 2404 | time-controller | `.time-controller .icon-backward, .time-controller .icon-forward` | `left: 50%; opacity: .2; position: absolute; top: 50%; transform: translate(-50%, -50%)` |
| 2412 | time-controller | `.time-controller .next-rate .container, .time-controller .prev-rate .container` | `background-color: var(--grayDarkAlpha)` |
| 2417 | time-controller | `@media (pointer: fine) and (hover: hover) › .time-controller .next-rate:hover .icon-forward, .time-controller .prev-rate:hover .icon-backward` | `opacity: 1` |
| 2421 | time-controller | `@media (pointer: fine) and (hover: hover) › .time-controller .next-rate:hover .container, .time-controller .prev-rate:hover .container` | `background-color: var(--grayAlpha)` |
| 2426 | time-controller | `.time-controller .rate-display-label` | `white-space: nowrap` |
| 2430 | time-controller | `@media only screen and (min-width: 320px) › .time-controller .rate-container` | `margin-left: 8px` |
| 2433 | time-controller | `@media only screen and (min-width: 320px) › .time-controller .next-rate, .time-controller .prev-rate` | `width: 75px` |
| 2437 | time-controller | `@media only screen and (min-width: 320px) › .time-controller .next-rate .container, .time-controller .prev-rate .container` | `height: 22px` |
| 2441 | time-controller | `@media only screen and (min-width: 320px) › .time-controller .vertical-line` | `height: 29px` |
| 2446 | time-controller | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .time-controller .rate-container` | `margin-left: 0` |
| 2449 | time-controller | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .time-controller .next-rate, .time-controller .prev-rate` | `width: 80px` |
| 2453 | time-controller | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .time-controller .next-rate .container, .time-controller .prev-rate .container` | `height: 10px` |
| 2457 | time-controller | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .time-controller .vertical-line` | `height: 20px` |
| 2461 | checkbox-option | `.checkbox-option` | `align-items: center; display: grid; gap: 15px; grid-template-columns: auto max-content; justify-content: start; list-style: none; margin: 5px 0` |
| 2469 | checkbox-option | `.checkbox-option › &:hover` | `(嵌套包装)` |
| 2470 | checkbox-option | `.checkbox-option › &:hover › .icon` | `background-color: var(--gray)` |
| 2474 | checkbox-option | `.checkbox-option › &.checked .icon` | `background-color: var(--cta-blue)` |
| 2477 | checkbox-option | `.checkbox-option › &:not(.checked) > .icon` | `border: 1px solid #636363` |
| 2481 | checkbox-option | `.checkbox-option span` | `pointer-events: none` |
| 2484 | checkbox-option | `.checkbox-option .text` | `grid-column: 2; grid-row: 1` |
| 2488 | layer-panel | `.layer-panel` | `background: var(--bgGradient); border-radius: 3px; pointer-events: all` |
| 2493 | layer-panel | `.layer-panel .header` | `cursor: pointer; display: grid; grid-template-columns: auto auto; margin: 0 10px; padding-top: 20px` |
| 2500 | layer-panel | `.layer-panel .layers` | `margin: 10px 0; padding: 0` |
| 2504 | layer-panel | `.layer-panel .layers li` | `cursor: pointer; display: flex; gap: 0; height: 100%; list-style: none; margin-bottom: 5px; opacity: .7; transition: opacity .2s ease-out` |
| 2514 | layer-panel | `.layer-panel .layers li:last-child` | `margin-bottom: 0` |
| 2517 | layer-panel | `.layer-panel .layers li.active, .layer-panel .layers li:hover` | `opacity: 1` |
| 2521 | layer-panel | `.layer-panel .layers li > *` | `pointer-events: none` |
| 2524 | layer-panel | `.layer-panel .layers li > span.checkbox` | `margin: 3px 0` |
| 2527 | layer-panel | `.layer-panel .layers li > :last-child` | `line-height: 24px; margin-left: 10px` |
| 2531 | layer-panel | `.layer-panel .layers li.disabled` | `opacity: .3; pointer-events: none` |
| 2536 | layer-panel | `@media (pointer: fine) and (hover: hover) › .layer-panel .item:hover .checkbox-hover` | `background-color: var(--gray)` |
| 2541 | layer-panel | `@media only screen and (min-width: 320px) › .layer-panel` | `background: var(--mobileBgGradient); bottom: 0; left: 0; position: fixed; right: 0; width: 100%; z-index: 10` |
| 2550 | layer-panel | `@media only screen and (min-width: 320px) › .layer-panel .container` | `display: grid; gap: 0 10px; grid-template-columns: calc(50% - 5px) calc(50% - 5px); padding: 20px 35px 40px` |
| 2556 | layer-panel | `@media only screen and (min-width: 320px) › .layer-panel .header` | `justify-content: center` |
| 2559 | layer-panel | `@media only screen and (min-width: 320px) › .layer-panel .header .close` | `transform: rotate(90deg)` |
| 2564 | layer-panel | `@media only screen and (min-width: 320px) and (orientation: landscape), only screen and (min-width: 641px) and (orientation: portrait) › .layer-panel .container` | `display: grid; gap: 0 15px; grid-template-columns: calc(33% - 10px) calc(33% - 10px) calc(33% - 10px); grid-template-rows: max-content auto; padding: 20px 35px 10px` |
| 2573 | layer-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .layer-panel` | `background: var(--bgGradient); border-radius: 3px; bottom: unset; left: unset; position: absolute; right: 0; width: auto` |
| 2582 | layer-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .layer-panel .container` | `display: block; grid-template-columns: unset; padding: 20px 35px 40px` |
| 2587 | layer-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .layer-panel .block` | `border-bottom: 1px solid #404040; border-right: 0` |
| 2591 | layer-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .layer-panel .block:last-child` | `border: 0` |
| 2594 | layer-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .layer-panel .header` | `justify-content: end` |
| 2597 | layer-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .layer-panel .header .close` | `opacity: .6; transform: none` |
| 2602 | layer-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › @media (pointer: fine) and (hover: hover) › .layer-panel .header .close:hover` | `opacity: 1` |
| 2607 | breadcrumb | `.breadcrumb` | `--inactiveOpacity: 0.7; --activeOpacity: 1.0; align-items: center; display: grid; justify-content: left` |
| 2614 | breadcrumb | `.breadcrumb nav` | `display: inline-block; vertical-align: middle` |
| 2618 | breadcrumb | `.breadcrumb .container.home` | `align-items: center; -moz-column-gap: .5em; column-gap: .5em; display: grid; grid-template-columns: auto 1fr` |
| 2625 | breadcrumb | `.breadcrumb .text` | `color: var(--grayMed); display: contents; font-size: inherit; font-weight: 600; letter-spacing: .64px` |
| 2632 | breadcrumb | `.breadcrumb .link` | `display: inline-block` |
| 2635 | breadcrumb | `.breadcrumb .text:first-letter` | `text-transform: uppercase` |
| 2638 | breadcrumb | `.breadcrumb .home .text` | `display: none; vertical-align: middle` |
| 2642 | breadcrumb | `.breadcrumb.large .text, .breadcrumb.small .text, .breadcrumb.tiny .text, .breadcrumb.x-small .text` | `font-size: inherit` |
| 2648 | breadcrumb | `.breadcrumb .container` | `opacity: var(--inactiveOpacity)` |
| 2651 | breadcrumb | `.breadcrumb .container.active, .breadcrumb .container:last-child` | `opacity: var(--activeOpacity)` |
| 2655 | breadcrumb | `.breadcrumb .container.hidden` | `display: none` |
| 2658 | breadcrumb | `.breadcrumb .container .separator` | `display: inline-block; transform: scale(.66); vertical-align: middle` |
| 2664 | breadcrumb | `@media (pointer: fine) and (hover: hover) › .breadcrumb .container.home` | `opacity: var(--inactiveOpacity)` |
| 2667 | breadcrumb | `@media (pointer: fine) and (hover: hover) › .breadcrumb .container:hover` | `opacity: var(--activeOpacity)` |
| 2672 | breadcrumb | `@media only screen and (min-width: 320px) › .breadcrumb` | `grid-auto-flow: row` |
| 2675 | breadcrumb | `@media only screen and (min-width: 320px) › .breadcrumb .container` | `display: none` |
| 2679 | breadcrumb | `@media only screen and (min-width: 320px) › @media (pointer: coarse) › .breadcrumb:hover .container:not(.home)` | `display: grid; grid-template-columns: max-content auto; padding-left: 45px` |
| 2684 | breadcrumb | `@media only screen and (min-width: 320px) › @media (pointer: coarse) › .breadcrumb:hover .container.home` | `padding-left: 0` |
| 2690 | breadcrumb | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .breadcrumb` | `grid-auto-flow: column` |
| 2693 | breadcrumb | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .breadcrumb .container` | `align-items: center; display: grid; grid-template-columns: max-content max-content; padding: 0` |
| 2700 | breadcrumb | `@media only screen and (min-width: 1025px) and (min-height: 600px) › @media (pointer: coarse) › .breadcrumb:hover .container:not(.home)` | `display: grid; padding: 0` |
| 2706 | carousel | `.carousel .content-block` | `margin: auto auto 10px` |
| 2709 | carousel | `.carousel .content-block:last-of-type` | `margin-bottom: 20px` |
| 2712 | carousel | `.carousel .content-block:first-of-type:last-of-type` | `margin-bottom: auto` |
| 2715 | hint-block | `.hint-block .icon` | `margin: auto` |
| 2718 | hint-block | `.hint-block.top` | `margin-bottom: auto` |
| 2721 | hint-block | `.hint-block.bottom` | `margin-top: auto` |
| 2724 | hint-block | `.hint-block.bottom .icon, .hint-block.top .icon` | `display: block` |
| 2728 | hint-block | `.hint-block .icon.hidden` | `display: none` |
| 2731 | hint-block | `.hint-block.up .icon-greater` | `transform: rotate(-90deg)` |
| 2734 | hint-block | `.hint-block.down .icon-greater` | `transform: rotate(90deg)` |
| 2738 | hint-block | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .hint-block` | `font-size: 18px` |
| 2742 | toggle-block | `.toggle-block` | `display: inline-block` |
| 2745 | toggle-block | `.toggle-block button` | `background: var(--whiteAlpha15); border-radius: 5px; color: var(--white)` |
| 2750 | toggle-block | `.toggle-block.selected button, .toggle-block:hover button` | `background: var(--white); color: var(--black)` |
| 2755 | image-block | `.image-block` | `align-items: center; display: inline-flex; flex-direction: column; max-height: 70vh` |
| 2761 | image-block | `.image-block.fullscreen` | `display: flex; height: var(--vh); justify-content: center; margin: 0; max-height: 100%; max-width: 100%; padding: 5%; width: 100%` |
| 2771 | image-block | `.image-block .title` | `color: #aaa; margin: 2px 0 12px; text-align: center` |
| 2776 | image-block | `.image-block img` | `height: auto; max-height: 100%; max-width: 100%; -o-object-fit: contain; object-fit: contain; overflow: hidden; width: 100%` |
| 2786 | image-block | `@media only screen and (min-width: 320px) › .image-block` | `font-size: 12px; height: 50vh; margin-bottom: 8px; padding-bottom: 25px` |
| 2794 | carousel-container | `@media only screen and (max-height: 600px) and (orientation: landscape) › .carousel-container .carousel .slide.overlay .container .content-wrapper .content` | `flex-direction: unset` |
| 2797 | carousel-container | `@media only screen and (max-height: 600px) and (orientation: landscape) › .carousel-container .carousel .slide.overlay .image-block` | `display: flex; height: 100%; justify-content: center; margin-bottom: auto; width: 40%` |
| 2804 | image-block | `@media only screen and (max-height: 600px) and (orientation: landscape) › .image-block + .description-block` | `display: flex; flex-flow: column; height: 100%; justify-content: center; width: 60%` |
| 2813 | image-block | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .image-block` | `font-size: 14px; height: auto; padding-bottom: 0` |
| 2819 | carousel | `.carousel .content-block` | `--highlightNumber: #ff0` |
| 2822 | carousel | `.carousel .content-block .more-toggle` | `display: block` |
| 2825 | carousel | `.carousel .content-block .more-toggle.hidden` | `display: none` |
| 2828 | carousel | `.carousel .content-block a` | `color: var(--uranus); text-decoration: underline` |
| 2832 | carousel | `.carousel .content-block .number` | `font-family: monospace` |
| 2835 | carousel | `.carousel .content-block .number.highlight` | `color: var(--highlightNumber)` |
| 2839 | carousel | `@media only screen and (min-width: 320px) › .carousel .content-block.large .body` | `font-size: 22px` |
| 2842 | carousel | `@media only screen and (min-width: 320px) › .carousel .description-block .title` | `margin-top: 25px` |
| 2845 | carousel | `@media only screen and (min-width: 320px) › .carousel .description-block .subtitle, .carousel .description-block .title` | `margin-bottom: 5px` |
| 2849 | carousel | `@media only screen and (min-width: 320px) › .carousel .description-block .subtitle` | `font-size: 22px; line-height: 1.2` |
| 2855 | carousel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel .content-block .body` | `font-size: 18px` |
| 2858 | carousel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel .content-block.large .body` | `font-size: 26px` |
| 2861 | carousel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel .description-block .subtitle, .carousel .description-block .title` | `margin-bottom: 10px` |
| 2866 | replay-button-block | `.replay-button-block` | `display: inline-block; padding-top: 20px` |
| 2870 | replay-button-block | `.replay-button-block button` | `align-items: center; background: var(--grayDarkAlpha); border-radius: 5px; color: var(--white); display: grid; gap: 0 2px; grid-template-columns: 30px auto; padding: 1px 7px 1px 2px` |
| 2880 | replay-button-block | `.replay-button-block .text` | `text-transform: uppercase` |
| 2883 | replay-button-block | `.replay-button-block .icon, .replay-button-block .text` | `opacity: .4` |
| 2887 | replay-button-block | `.replay-button-block:hover button` | `background: var(--grayAlpha)` |
| 2890 | replay-button-block | `.replay-button-block:hover .icon, .replay-button-block:hover .text` | `color: var(--white); opacity: 1` |
| 2895 | buttons-block | `.buttons-block` | `display: grid; font-family: Metropolis, sans-serif; grid-auto-rows: 1fr; height: 300px; width: 90%` |
| 2902 | block-title | `.block-title` | `font-weight: 600; margin-top: 20px` |
| 2906 | custom-button | `.custom-button` | `align-items: center; background-color: #202021; border: 1px solid #000; display: flex; gap: 20px` |
| 2913 | buttons-block | `.buttons-block .focused, .custom-button:hover` | `background-color: #343434` |
| 2917 | buttons-block | `.buttons-block .focused` | `border-left: solid #0d67ff` |
| 2920 | button-icon | `.button-icon` | `height: 56px; width: 56px` |
| 2924 | checkboxes-block | `.checkboxes-block` | `height: 200px; width: 90%` |
| 2928 | cb-block-title | `.cb-block-title` | `font-weight: 700; margin: 35px 0 15px` |
| 2932 | cb-container | `.cb-container` | `cursor: pointer; display: block; font-size: 16px; margin-bottom: 12px; padding-left: 35px; position: relative; -webkit-user-select: none; -moz-user-select: none; user-select: none` |
| 2943 | cb-container | `.cb-container input` | `cursor: pointer; height: 0; opacity: 0; position: absolute; width: 0` |
| 2950 | checkmark | `.checkmark` | `background-color: #eee; border-radius: 3px; height: 20px; left: 5px; position: absolute; top: 2px; width: 20px` |
| 2959 | cb-container | `.cb-container:hover input ~ .checkmark` | `background-color: #ccc` |
| 2962 | cb-container | `.cb-container input:checked ~ .checkmark` | `background-color: #0d67ff` |
| 2965 | checkmark | `.checkmark:after` | `content: ""; display: none; position: absolute` |
| 2970 | cb-container | `.cb-container input:checked ~ .checkmark:after` | `display: block` |
| 2973 | cb-container | `.cb-container .checkmark:after` | `border: solid #fff; border-width: 0 3px 3px 0; height: 9px; left: 7px; top: 3px; transform: rotate(45deg); width: 3px` |
| 2982 | carousel-container | `.carousel-container` | `--story-height: calc((var(--vh) - 4px)*2/5); padding: 0` |
| 2986 | carousel-container | `.carousel-container .carousel .slide.grid-layout` | `display: grid` |
| 2989 | carousel-container | `.carousel-container .carousel .slide .container, .carousel-container .carousel .slide.overlay .container` | `grid-column: head-start/head-end; grid-row: head-start/foot-end` |
| 2994 | carousel-container | `.carousel-container .carousel .slide.overlay .container` | `z-index: 10` |
| 2997 | carousel-container | `.carousel-container .mobile-collapse` | `transition: bottom 1s` |
| 3000 | carousel-container | `.carousel-container .slide .collapse-container.collapse .mobile-collapse` | `bottom: 20px` |
| 3003 | carousel-container | `.carousel-container .progress.overlay` | `height: 100%` |
| 3007 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .carousel .slide .container` | `align-content: end; align-self: end; grid-column: main-start/side-end; grid-row: extf-start/foot-end; height: 100%; overflow: hidden; transition: height 1s` |
| 3016 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .carousel .slide .container.collapse` | `height: 0` |
| 3019 | carousel | `@media only screen and (min-width: 320px) › .carousel.expand .slide.active .mobile-hint` | `animation-direction: alternate; animation-duration: 1.9s; animation-fill-mode: both; animation-iteration-count: 3; animation-name: text-pulse; animation-timing-function: ease-in-out` |
| 3027 | carousel | `@media only screen and (min-width: 320px) › .carousel.expand .slide.active .mobile-hint > .hint-text` | `height: 30px; line-height: 30px` |
| 3031 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .carousel .slide.overlay .container` | `align-content: stretch; align-self: unset; height: unset` |
| 3036 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .carousel .slide.overlay .content-wrapper` | `padding: 0 20px` |
| 3039 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .carousel .slide.overlay .container .content` | `display: flex; flex: 1; flex-direction: column; justify-content: center` |
| 3045 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .carousel.scrolling-done .slide .container .content-container` | `animation-duration: .2s; animation-fill-mode: both; animation-iteration-count: 1; animation-name: mobile-gradient; animation-timing-function: ease-in-out; background: linear-gradient( 180deg, rgba(37, 37, 39, 0), rgba(37, 37, 39, .1) 25%, rgba(37, 37, 39, .4))` |
| 3058 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .carousel.scrolling-done .slide.overlay .container .content-container` | `animation: none; background: none` |
| 3062 | carousel | `@media only screen and (min-width: 320px) › .carousel.hidden .slide .container .content-container, .carousel.scrolling .slide .container .content-container` | `animation: none` |
| 3066 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .progress` | `height: 30%` |
| 3069 | carousel-container | `@media only screen and (min-width: 320px) › .carousel-container .close-button .text` | `display: none` |
| 3074 | carousel-container | `@media only screen and (min-width: 320px) and (orientation: landscape) › .carousel-container .carousel .slide .container` | `grid-row: extf-start/foot-end; height: 100%` |
| 3078 | carousel-container | `@media only screen and (min-width: 320px) and (orientation: landscape) › .carousel-container .progress` | `height: 40%` |
| 3081 | carousel-container | `@media only screen and (min-width: 320px) and (orientation: landscape) › .carousel-container .mobile-collapse` | `bottom: 40%` |
| 3084 | carousel-container | `@media only screen and (min-width: 320px) and (orientation: landscape) › .carousel-container .close-button .text` | `display: unset` |
| 3089 | carousel-container | `@media only screen and (min-width: 641px) and (orientation: portrait) › .carousel-container .carousel .slide .container` | `height: 75%` |
| 3094 | carousel-container | `@media only screen and (min-width: 961px) and (orientation: landscape) › .carousel-container .carousel .slide .container` | `height: 60%` |
| 3097 | carousel-container | `@media only screen and (min-width: 961px) and (orientation: landscape) › .carousel-container .mobile-collapse` | `bottom: 24%` |
| 3100 | carousel-container | `@media only screen and (min-width: 961px) and (orientation: landscape) › .carousel-container .progress` | `height: 24%` |
| 3103 | carousel-container | `@media only screen and (min-width: 961px) and (orientation: landscape) › .carousel-container .close-button .text` | `display: unset` |
| 3108 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .carousel .slide .container` | `grid-column: main-start/extd-end; grid-row: head-end/foot-start; height: 100%; margin: 0 0 0 -20px; position: relative` |
| 3115 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .carousel .slide.overlay .container` | `height: 100%; margin: 0` |
| 3119 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .carousel .slide.overlay .content-wrapper` | `padding: 0` |
| 3122 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .carousel.scrolling-done .slide .container .content-container` | `animation: none` |
| 3125 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .carousel.scrolling .slide .container .content-container, .carousel-container .carousel.scrolling-done .slide .container .content-container` | `background: none` |
| 3129 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .close-button` | `font-size: 18px` |
| 3132 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .close-button .text` | `display: unset` |
| 3135 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .carousel-container .progress` | `height: 60%` |
| 3139 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › @media (pointer: fine) and (hover: hover) › .carousel-container .carousel .slide .container:hover` | `animation: gradient 6s ease 1; animation-fill-mode: both; background: linear-gradient( 90deg, rgba(37, 37, 39, .4), rgba(37, 37, 39, 0) 25%, rgba(37, 37, 39, 0) 50%, rgba(37, 37, 39, .4)); background-size: 200% 100%` |
| 3151 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › @media (pointer: fine) and (hover: hover) › .carousel-container .carousel .slide .container:hover:after` | `background: linear-gradient( 180deg, hsla(240, 4%, 60%, 0), hsla(240, 4%, 60%, .5) 50%, hsla(240, 4%, 60%, 0)); content: ""; grid-column: 5; height: 100%; position: absolute; right: 0; top: 0; width: 1px` |
| 3166 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › @media (pointer: fine) and (hover: hover) › .carousel-container .carousel .slide.overlay .container:hover` | `animation: none; background: none` |
| 3170 | carousel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › @media (pointer: fine) and (hover: hover) › .carousel-container .carousel .slide.overlay .container:hover:after` | `background: none; width: 0` |
| 3177 | KEYFRAME | `@keyframes gradient › 0%` | `background-position: 0 50%` |
| 3180 | KEYFRAME | `@keyframes gradient › to` | `background-position: 100% 50%` |
| 3185 | KEYFRAME | `@keyframes mobile-gradient › 0%` | `background: linear-gradient( 180deg, rgba(37, 37, 39, 0), rgba(37, 37, 39, 0) 25%, rgba(37, 37, 39, 0))` |
| 3193 | KEYFRAME | `@keyframes mobile-gradient › 25%` | `background: linear-gradient( 180deg, rgba(37, 37, 39, 0), rgba(37, 37, 39, .1) 25%, rgba(37, 37, 39, .15))` |
| 3201 | KEYFRAME | `@keyframes mobile-gradient › 50%` | `background: linear-gradient( 180deg, rgba(37, 37, 39, .1), rgba(37, 37, 39, .2) 25%, rgba(37, 37, 39, .3))` |
| 3209 | KEYFRAME | `@keyframes mobile-gradient › 75%` | `background: linear-gradient( 180deg, rgba(37, 37, 39, .15), rgba(82, 82, 126, .25) 25%, rgba(37, 37, 39, .4))` |
| 3217 | KEYFRAME | `@keyframes mobile-gradient › to` | `background: linear-gradient( 180deg, rgba(37, 37, 39, .2), rgba(37, 37, 39, .3) 25%, rgba(37, 37, 39, .45))` |
| 3227 | KEYFRAME | `@keyframes text-pulse › 0%` | `opacity: .5` |
| 3230 | KEYFRAME | `@keyframes text-pulse › 50%` | `opacity: .9` |
| 3233 | KEYFRAME | `@keyframes text-pulse › to` | `opacity: .5` |
| 3237 | kiosk-container | `.kiosk-container` | `grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(5, 1fr)` |
| 3241 | kiosk-container | `.kiosk-container, .session-end-container` | `display: grid; inset: 0; position: absolute; z-index: calc(var(--overlay-z-index)*2)` |
| 3248 | session-end-container | `.session-end-container` | `align-items: center; background: rgba(0, 0, 0, .75); justify-items: center` |
| 3253 | session-end-buttons-container | `.session-end-buttons-container` | `-moz-column-gap: 3em; column-gap: 3em; display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(2, 1fr); pointer-events: all; z-index: calc(var(--overlay-z-index)*2)` |
| 3262 | session-ended-msg | `.session-ended-msg` | `align-self: center; grid-column: 2/span 2; margin: 1em` |
| 3267 | kiosk-btn | `.kiosk-btn, .session-ended-msg` | `font-size: 1.75em; font-weight: 600; text-align: center` |
| 3273 | kiosk-btn | `.kiosk-btn` | `align-items: center; backdrop-filter: blur(.2rem); background-color: rgba(47, 69, 102, .7); border-radius: .5em; display: grid; height: 3.5em; width: 13em` |
| 3282 | session-end-btn | `.session-end-btn` | `grid-column: span 2; grid-row: 2` |
| 3286 | force-restart | `.force-restart` | `grid-column: 2/span 2` |
| 3289 | autoplay-container | `.autoplay-container` | `align-self: center; display: grid; grid-column-start: 2; grid-row-start: 5; justify-self: center; pointer-events: all` |
| 3297 | session-timer-container | `.session-timer-container` | `align-items: center; align-self: center; color: #ffffbc; display: flex; font-size: 1.5em; grid-column-start: 3; grid-row-start: 1; grid-template-columns: 1fr 1fr; justify-self: end; margin-right: 1em` |
| 3309 | session-countdown-timer | `.session-countdown-timer` | `opacity: .6` |
| 3312 | loading-text | `.loading-text` | `align-items: center; align-self: center; background: rgba(0, 0, 0, .35); border-radius: 5px; color: #fff; display: grid; font: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 2.5em; font-weight: 600; grid-column-start: 2; grid-row-start: 4; justify-self: center; padding: 1em; text-align: center; z-index: calc(var(--overlay-z-index)*4)` |
| 3333 | toast-container | `.toast-container.error` | `background-color: #ff6363; color: #000` |
| 3337 | toast-container | `.toast-container` | `align-items: center; background-color: var(--toast-bg-color); border-radius: .5em; color: #000; display: flex; font-weight: 400; gap: min(2vw, .7em); grid-column-start: 1; grid-row: -2; justify-content: space-between; opacity: 1; padding: .5em .5em .5em .8em; position: inherit; transition-duration: .5s; transition-property: opacity, transform; transition-timing-function: var(--ease-out-bezier); z-index: 50` |
| 3356 | toast-container | `.toast-container.hidden` | `display: flex; opacity: 0; transform: translateY(2em); transition-duration: .2s` |
| 3362 | toast-container | `.toast-container button.close` | `filter: invert(); transform: scale(1.5)` |
| 3366 | toast-content | `.toast-content > div` | `align-items: center; display: flex; gap: min(2vw, .7em); max-width: 40vw` |
| 3372 | toast-content | `.toast-content .content-text` | `color: var(--grayDark); display: block; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap` |
| 3380 | toast-content | `.toast-content .content-text, .toast-content button.undo` | `font-size: clamp(.75rem, min(2vh, 2vw), .9rem); font-weight: 600` |
| 3385 | toast-content | `.toast-content button.undo` | `border: .1em solid rgba(0, 37, 158, .2); border-radius: .25em; color: rgba(0, 37, 158, .8); flex: 1; line-height: 1; padding: .4em .6em; transition: transform .2s var(--ease-out-bezier)` |
| 3394 | toast-content | `.toast-content button.undo:hover` | `background-color: rgba(0, 37, 158, .2); transform: scale(1.05)` |
| 3399 | toast-container | `@media (max-width: 1025px) or (max-height: 600px) › .toast-container` | `align-self: flex-end; grid-column: 2/-2; grid-row: -4/-3; justify-self: center; margin: 0 0 3em` |
| 3406 | toast-content | `@media (max-width: 1025px) or (max-height: 600px) › .toast-content > div` | `max-width: 66vw` |
| 3411 | touch | `@media (min-width: 1025px) › body.touch:has(nav.items-2) .toast-container` | `grid-column: 2/-2; grid-row: 2; justify-self: center; margin: 0` |
| 3419 | KEYFRAME | `@keyframes fade-in › 0%` | `opacity: 0` |
| 3422 | KEYFRAME | `@keyframes fade-in › to` | `opacity: 1` |
| 3427 | KEYFRAME | `@keyframes fade-out › 0%` | `opacity: 1` |
| 3430 | KEYFRAME | `@keyframes fade-out › to` | `opacity: 0` |
| 3435 | KEYFRAME | `@keyframes fade-in-left › 0%` | `opacity: 0; transform: translateX(-100%)` |
| 3439 | KEYFRAME | `@keyframes fade-in-left › to` | `opacity: 1; transform: translateX(0)` |
| 3445 | KEYFRAME | `@keyframes fade-out-left › 0%` | `opacity: 1; transform: translateX(0)` |
| 3449 | KEYFRAME | `@keyframes fade-out-left › to` | `opacity: 0; transform: translateX(-100%)` |
| 3455 | KEYFRAME | `@keyframes fade-out-bottom › 0%` | `opacity: 1; transform: translateY(0)` |
| 3459 | KEYFRAME | `@keyframes fade-out-bottom › to` | `opacity: 0; transform: translateY(100%)` |
| 3465 | KEYFRAME | `@keyframes fade-in-bottom › 0%` | `opacity: 0; transform: translateY(100%)` |
| 3469 | KEYFRAME | `@keyframes fade-in-bottom › to` | `opacity: 1; transform: translateY(0)` |
| 3475 | KEYFRAME | `@keyframes spin › to` | `transform: rotate(1turn)` |
| 3480 | KEYFRAME | `@keyframes blink › 0%` | `outline: 1px solid transparent` |
| 3483 | KEYFRAME | `@keyframes blink › 25%` | `outline: 1px var(--error) solid` |
| 3486 | KEYFRAME | `@keyframes blink › 50%` | `outline: 4px var(--error) solid` |
| 3489 | KEYFRAME | `@keyframes blink › 75%` | `outline: 1px var(--error) solid` |
| 3492 | KEYFRAME | `@keyframes blink › to` | `outline: 1px solid transparent` |
| 3496 | GLOBAL | `:root` | `--ease-out-bezier: cubic-bezier(0.2,0.2,0,1)` |
| 3499 | camera-follow | `.camera-follow.search .cover` | `display: none` |
| 3502 | camera-follow | `.camera-follow.search .results` | `background: linear-gradient( 180deg, var(--grayDarkAlpha80) 0, #252527 10%, #070709 100%); border: none; border-radius: 0 0 .3em .3em; z-index: 1` |
| 3513 | camera-follow | `.camera-follow.search .results .result-div:last-child` | `margin-bottom: .7em` |
| 3516 | camera-follow | `.camera-follow .results-container > .results:not(:empty)` | `padding-top: 1rem` |
| 3519 | camera-follow | `.camera-follow.active span.search-info` | `opacity: 0` |
| 3522 | camera-follow | `.camera-follow.active .input-focused span.search-info` | `opacity: 1; z-index: 2` |
| 3526 | camera-follow | `.camera-follow.active .input-focused span.search-info:has(+ .featured > ul:empty)` | `opacity: 0` |
| 3529 | camera-follow | `.camera-follow .featured` | `background: linear-gradient( 180deg, var(--grayDarkAlpha80) 0, #252527 10%, #070709 100%); border-radius: 0 0 .3em .3em; height: unset; opacity: 0; z-index: 1` |
| 3541 | camera-follow | `.camera-follow .featured.hidden` | `display: unset; transform: scaleY(0)` |
| 3545 | camera-follow | `.camera-follow .input-focused .featured` | `opacity: 1` |
| 3548 | camera-follow | `.camera-follow .featured:has(ul:empty)` | `opacity: 0` |
| 3551 | camera-follow | `.camera-follow .featured > ul` | `padding: 1rem 0 0` |
| 3554 | static-ui | `#static-ui > div.follow-reframe` | `border: .1rem solid var(--toast-bg-color); bottom: 12vh; left: 8vw; opacity: 0; position: absolute; right: 8vw; top: 12vh; transition: opacity .3s 1s var(--ease-out-bezier)` |
| 3564 | static-ui | `#static-ui > div.follow-reframe:before` | `align-items: center; border: .1rem solid var(--toast-bg-color); color: var(--toast-bg-color); content: "\25a3"; display: flex; font-size: 1rem; font-weight: 100; inset: 8vh 8vw 8vh 8vw; justify-content: center; opacity: .4; position: absolute` |
| 3577 | static-ui | `#static-ui > div.follow-reframe:after` | `border-radius: .5em; color: var(--toast-bg-color); content: "Re-framing follow camera"; font-size: clamp(.8rem, min(2vh, 2vw), 1rem); font-weight: 600; left: 50%; padding: .4em .8em; position: absolute; text-align: center; text-shadow: 0 0 .3em rgba(30, 30, 80, .8), 0 0 .3em rgba(30, 30, 80, .8), 0 0 1em #152a41; top: 0; transform: translate(-50%, -50%); white-space: nowrap; z-index: 1` |
| 3596 | offset-right | `body.offset-right #static-ui > div.follow-reframe` | `left: calc(8vw + var(--offset-right)*2)` |
| 3599 | static-ui | `#static-ui.follow-dragging > div.follow-reframe` | `opacity: .9; transition: opacity .5s var(--ease-out-bezier)` |
| 3603 | GLOBAL | `:root` | `--black: #000; --blackAlpha: #00000380; --white: #fff; --whiteAlpha15: #ffffff26; --gray: #95959d; --grayAlpha: #95959d33; --grayMed: #c6c6c9; --grayLight: #eaeaeb; --grayDark: #252527; --grayDarkAlpha: #25252799; --grayDarkAlpha80: #252527cc; --cta-blue: #3e63dd; --toast-bg-color: #c6d4f9; --grayblueWhite: #f0f8fc; --grayblueLight: #d2e1e8; --grayblueMed: #a4bac1; --grayblueText: #83959b; --grayblueDivider: #25282b; --grayblueBackground: #151a1d; --grayblueButton: #425571; --live: #47da84; --liveAlpha: #47da84bf; --error: #d55033; --grayDivider: #37373a; --bgGradient: linear-gradient( 180deg,#272527,rgba(37,37,39,.8) 52.08%,rgba(37,37,39,0)); --mobileBgGradient: linear-gradient( 180deg,#252527ee,rgba(37,37,39,.85) 52.08%,rgba(0,0,0,.8)); --sun: #f7f4df; --sunMed: #b8b7a7; --sunDark: #626259; --mercury: #9768ac; --mercuryMed: #714e81; --mercuryDark: #3c2a45; --venus: #b07919; --venusMed: #845b13; --venusDark: #46300a; --earth: #09c; --earthMed: #007399; --earthDark: #003d52; --mars: #9a4e19; --marsMed: #733a13; --marsDark: #3d1f0a; --jupiter: #da8b72; --jupiterMed: #a36855; --jupiterDark: #57382e; --saturn: #d5c187; --saturnMed: #786d4c; --saturnDark: #554d36; --uranus: #68ccda; --uranusMed: #4e99a3; --uranusDark: #2a5257; --neptune: #708ce3; --neptuneMed: #5469aa; --neptuneDark: #2d385b; --nasa-blue: #288bff; --spacecraft: #cd9745; --moon: #b6acac; --dwarfPlanet: #929871; --comet: #7e86b0; --asteroid: #806262; --constellation: #59b2ff; --constellationGlow: #287bc4; --constellationGlowMed: #165d9b; --constellationGlowDark: #070a99` |
| 3728 | icon | `.icon` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/default/svg/sprite.svg); background-repeat: no-repeat; display: inline-block` |
| 3733 | icon-arrow-left-large | `.icon-arrow-left-large` | `background-position: 0 0; height: 60px; width: 60px` |
| 3738 | icon-arrow-right-large | `.icon-arrow-right-large` | `background-position: -76px 0; height: 60px; width: 60px` |
| 3743 | icon-back-to-live | `.icon-back-to-live` | `background-position: 0 -76px; height: 10px; width: 10px` |
| 3748 | icon-live | `.icon-live` | `background-position: -26px -76px; height: 10px; width: 10px` |
| 3753 | icon-external | `.icon-external` | `background-position: 0 -102px; height: 14px; width: 14px` |
| 3758 | icon-backward | `.icon-backward` | `background-position: -30px -102px; height: 14px; width: 14px` |
| 3763 | icon-forward | `.icon-forward` | `background-position: -60px -102px; height: 14px; width: 14px` |
| 3768 | icon-checkmark | `.icon-checkmark` | `background-position: 0 -132px; height: 15px; width: 15px` |
| 3774 | icon-checkbox | `@media (pointer: fine) and (hover: hover) › .icon-checkbox.hover, .icon-checkbox:hover` | `background-position: -31px -132px; height: 15px; width: 15px` |
| 3781 | icon-checkbox | `.icon-checkbox` | `background-position: -62px -132px; height: 15px; width: 15px` |
| 3786 | icon-checkbox-selected | `.icon-checkbox-selected` | `background-position: -93px -132px; height: 15px; width: 15px` |
| 3791 | icon-radio-circle | `.icon-radio-circle` | `background-position: -124px -132px; height: 15px; width: 15px` |
| 3797 | icon-radio-circle | `@media (pointer: fine) and (hover: hover) › .icon-radio-circle.hover, .icon-radio-circle:hover` | `background-position: -155px -132px; height: 15px; width: 15px` |
| 3804 | icon-radio-selected | `.icon-radio-selected` | `background-position: -186px -132px; height: 15px; width: 15px` |
| 3809 | icon-hexagon | `.icon-hexagon` | `background-position: 0 -163px; height: 16px; width: 14px` |
| 3814 | icon-circle-white-small | `.icon-circle-white-small` | `background-position: -32px -163px; height: 16px; width: 16px` |
| 3819 | icon-natural-light | `.icon-natural-light` | `background-position: -64px -163px; height: 16px; width: 8px` |
| 3824 | icon-flood-light | `.icon-flood-light` | `background-position: -96px -163px; height: 16px; width: 16px` |
| 3829 | icon-shadow-light | `.icon-shadow-light` | `background-position: -128px -163px; height: 16px; width: 16px` |
| 3834 | icon-triangle | `.icon-triangle` | `background-position: 0 -195px; height: 20px; width: 20px` |
| 3839 | icon-circle-earth | `.icon-circle-earth` | `background-position: -36px -195px; height: 20px; width: 20px` |
| 3844 | icon-circle-jupiter | `.icon-circle-jupiter` | `background-position: -72px -195px; height: 20px; width: 20px` |
| 3849 | icon-circle-mars | `.icon-circle-mars` | `background-position: -108px -195px; height: 20px; width: 20px` |
| 3854 | icon-circle-mercury | `.icon-circle-mercury` | `background-position: -144px -195px; height: 20px; width: 20px` |
| 3859 | icon-circle-neptune | `.icon-circle-neptune` | `background-position: -180px -195px; height: 20px; width: 20px` |
| 3864 | icon-circle-saturn | `.icon-circle-saturn` | `background-position: -216px -195px; height: 20px; width: 20px` |
| 3869 | icon-circle-sun | `.icon-circle-sun` | `background-position: -252px -195px; height: 20px; width: 20px` |
| 3874 | icon-circle-uranus | `.icon-circle-uranus` | `background-position: -288px -195px; height: 20px; width: 20px` |
| 3879 | icon-circle-venus | `.icon-circle-venus` | `background-position: -324px -195px; height: 20px; width: 20px` |
| 3884 | icon-circle-white | `.icon-circle-white` | `background-position: -360px -195px; height: 20px; width: 20px` |
| 3889 | icon-hd | `.icon-hd` | `background-position: 0 -231px` |
| 3892 | icon-hd | `.icon-hd, .icon-hd-on` | `background-color: none; height: 30px; opacity: .4; width: 30px` |
| 3899 | icon-hd-on | `.icon-hd-on` | `background-position: -46px -231px` |
| 3903 | icon-hd-on | `@media (pointer: fine) and (hover: hover) › .icon-hd-on.hover, .icon-hd-on:hover, .icon-hd.hover, .icon-hd:hover` | `opacity: 1` |
| 3910 | icon-constellation | `.icon-constellation` | `background-position: -92px -231px; height: 30px; width: 30px` |
| 3916 | icon-constellation | `@media (pointer: fine) and (hover: hover) › .icon-constellation.hover, .icon-constellation:hover` | `background-position: -138px -231px; height: 30px; width: 30px` |
| 3923 | icon-layers | `.icon-layers` | `background-position: -184px -231px; height: 30px; width: 30px` |
| 3929 | icon-layers | `@media (pointer: fine) and (hover: hover) › .icon-layers.hover, .icon-layers:hover` | `background-position: -230px -231px; height: 30px; width: 30px` |
| 3936 | icon-arrow-down | `.icon-arrow-down` | `background-position: -276px -231px; height: 30px; width: 30px` |
| 3941 | icon-arrow-left | `.icon-arrow-left` | `background-position: -322px -231px; height: 30px; width: 30px` |
| 3946 | icon-arrow-right | `.icon-arrow-right` | `background-position: -368px -231px; height: 30px; width: 30px` |
| 3951 | icon-arrow-up | `.icon-arrow-up` | `background-position: -414px -231px; height: 30px; width: 30px` |
| 3956 | icon-clock | `.icon-clock` | `background-position: -460px -231px; height: 30px; width: 30px` |
| 3962 | icon-clock | `@media (pointer: fine) and (hover: hover) › .icon-clock.hover, .icon-clock:hover` | `background-position: -506px -231px; height: 30px; width: 30px` |
| 3969 | icon-story | `.icon-story` | `background-position: -552px -231px; height: 30px; width: 30px` |
| 3975 | icon-story | `@media (pointer: fine) and (hover: hover) › .icon-story.hover, .icon-story:hover` | `background-position: -598px -231px; height: 30px; width: 30px` |
| 3982 | icon-auto-cam | `.icon-auto-cam` | `background-position: -644px -231px; height: 30px; width: 30px` |
| 3988 | icon-auto-cam | `@media (pointer: fine) and (hover: hover) › .icon-auto-cam.hover, .icon-auto-cam:hover` | `background-position: -690px -231px; height: 30px; width: 30px` |
| 3994 | icon-free-cam | `@media (pointer: fine) and (hover: hover) › .icon-free-cam.hover, .icon-free-cam:hover` | `background-position: 0 -277px; height: 30px; width: 30px` |
| 4001 | icon-free-cam | `.icon-free-cam` | `background-position: -46px -277px; height: 30px; width: 30px` |
| 4006 | icon-box | `.icon-box` | `background-position: -92px -277px; height: 30px; width: 30px` |
| 4012 | icon-box | `@media (pointer: fine) and (hover: hover) › .icon-box.hover, .icon-box:hover` | `background-position: -138px -277px; height: 30px; width: 30px` |
| 4019 | icon-info | `.icon-info` | `background-position: -184px -277px` |
| 4022 | icon-hide | `.icon-hide, .icon-info` | `height: 30px; width: 30px` |
| 4027 | icon-hide | `.icon-hide` | `background-position: -230px -277px` |
| 4031 | icon-hide | `@media (pointer: fine) and (hover: hover) › .icon-hide.hover, .icon-hide:hover` | `background-position: -276px -277px; height: 30px; width: 30px` |
| 4038 | icon-km | `.icon-km` | `background-position: -322px -277px; height: 30px; width: 30px` |
| 4044 | icon-km | `@media (pointer: fine) and (hover: hover) › .icon-km.hover, .icon-km:hover` | `background-position: -368px -277px; height: 30px; width: 30px` |
| 4051 | icon-mi | `.icon-mi` | `background-position: -414px -277px; height: 30px; width: 30px` |
| 4057 | icon-mi | `@media (pointer: fine) and (hover: hover) › .icon-mi.hover, .icon-mi:hover` | `background-position: -460px -277px; height: 30px; width: 30px` |
| 4064 | icon-lighting | `.icon-lighting` | `background-position: -506px -277px; height: 30px; width: 54px` |
| 4070 | icon-lighting | `@media (pointer: fine) and (hover: hover) › .icon-lighting.hover, .icon-lighting:hover` | `background-position: -598px -277px; height: 30px; width: 54px` |
| 4077 | icon-fullscreen | `.icon-fullscreen` | `background-position: 0 -323px; height: 30px; width: 30px` |
| 4083 | icon-fullscreen | `@media (pointer: fine) and (hover: hover) › .icon-fullscreen.hover, .icon-fullscreen:hover` | `background-position: -46px -323px; height: 30px; width: 30px` |
| 4090 | icon-expand | `.icon-expand` | `background-position: -92px -323px; height: 30px; width: 30px` |
| 4096 | icon-expand | `@media (pointer: fine) and (hover: hover) › .icon-expand.hover, .icon-expand:hover` | `background-position: -138px -323px; height: 30px; width: 30px` |
| 4102 | icon-controls | `@media (pointer: fine) and (hover: hover) › .icon-controls.hover, .icon-controls:hover` | `background-position: -184px -323px; height: 30px; width: 30px` |
| 4109 | icon-controls | `.icon-controls` | `background-position: -230px -323px; height: 30px; width: 30px` |
| 4114 | icon-expand-side | `.icon-expand-side` | `background-position: -276px -323px; height: 30px; width: 30px` |
| 4120 | icon-expand-side | `@media (pointer: fine) and (hover: hover) › .icon-expand-side.hover, .icon-expand-side:hover` | `background-position: -322px -323px; height: 30px; width: 30px` |
| 4127 | icon-replay | `.icon-replay` | `background-position: -368px -323px; height: 30px; width: 30px` |
| 4132 | icon-menu | `.icon-menu` | `background-position: -414px -323px; height: 30px; width: 30px` |
| 4137 | icon-search | `.icon-search` | `background-position: -460px -323px; height: 30px; width: 30px` |
| 4142 | icon-close | `.icon-close` | `background-position: -506px -323px; height: 30px; width: 30px` |
| 4147 | icon-minus | `.icon-minus` | `background-position: -552px -323px; height: 30px; width: 30px` |
| 4152 | icon-plus | `.icon-plus` | `background-position: -598px -323px; height: 30px; width: 30px` |
| 4157 | icon-collapse | `.icon-collapse` | `background-position: -644px -323px; height: 30px; width: 30px` |
| 4163 | icon-collapse | `@media (pointer: fine) and (hover: hover) › .icon-collapse.hover, .icon-collapse:hover` | `background-position: -690px -323px; height: 30px; width: 30px` |
| 4170 | icon-collapse-side | `.icon-collapse-side` | `background-position: 0 -369px; height: 30px; width: 30px` |
| 4176 | icon-collapse-side | `@media (pointer: fine) and (hover: hover) › .icon-collapse-side.hover, .icon-collapse-side:hover` | `background-position: -46px -369px; height: 30px; width: 30px` |
| 4183 | icon-dropdown | `.icon-dropdown` | `background-position: -92px -369px; height: 30px; width: 30px` |
| 4188 | icon-dropup | `.icon-dropup` | `background-position: -138px -369px; height: 30px; width: 31px` |
| 4193 | icon-greater | `.icon-greater` | `background-position: -184px -369px; height: 30px; width: 30px` |
| 4198 | icon-lesser | `.icon-lesser` | `background-position: -230px -369px; height: 30px; width: 30px` |
| 4203 | icon-pause | `.icon-pause` | `background-position: -276px -369px; height: 30px; width: 30px` |
| 4209 | icon-pause | `@media (pointer: fine) and (hover: hover) › .icon-pause.hover, .icon-pause:hover` | `background-position: -322px -369px; height: 30px; width: 30px` |
| 4216 | icon-play | `.icon-play` | `background-position: -368px -369px; height: 30px; width: 30px` |
| 4222 | icon-play | `@media (pointer: fine) and (hover: hover) › .icon-play.hover, .icon-play:hover` | `background-position: -414px -369px; height: 30px; width: 30px` |
| 4229 | icon-telescope | `.icon-telescope` | `background-position: -460px -369px; height: 30px; width: 30px` |
| 4235 | icon-telescope | `@media (pointer: fine) and (hover: hover) › .icon-telescope.hover, .icon-telescope:hover` | `background-position: -506px -369px; height: 30px; width: 30px` |
| 4242 | GLOBAL | `:root` | `--customIconLabelMargin: 50%` |
| 4245 | icon-nasa-logo | `.icon-nasa-logo` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/default/svg/nasa_logo.svg); height: 45px; width: 45px` |
| 4250 | icon-crosshair | `.icon-crosshair` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/default/svg/crosshair.svg); height: 40px; width: 80px` |
| 4255 | icon-finger | `.icon-finger` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/default/svg/finger.svg); height: 30px; width: 30px` |
| 4260 | icon-share | `.icon-share` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/default/svg/share_arrow.svg); background-size: contain; height: 1.125rem; width: 1.125rem` |
| 4266 | icon-help | `.icon-help, .icon-share` | `background-origin: content-box; background-position: 50%` |
| 4271 | icon-help | `.icon-help` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/default/svg/help_icon.svg); height: 1.5rem; width: 1.5rem` |
| 4276 | icon-locked | `.icon-locked` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/default/svg/locked.svg)` |
| 4279 | icon-error | `.icon-error, .icon-locked` | `background-origin: content-box; background-position: 50%; height: 1.4rem; width: 1.4rem` |
| 4286 | icon-error | `.icon-error` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/default/svg/error.svg)` |
| 4289 | icon | `.icon.hidden` | `display: none` |
| 4293 | icon-bg | `@media (pointer: fine) and (hover: hover) › .icon-bg:hover` | `background: var(--grayAlpha)` |
| 4296 | icon-box | `@media (pointer: fine) and (hover: hover) › .icon-box:hover .icon-flood-light, .icon-box:hover .icon-natural-light, .icon-minus:hover, .icon-plus:hover` | `opacity: 1` |
| 4303 | grid-layout | `.grid-layout` | `background: transparent; display: grid; gap: 2px; padding: 0` |
| 4309 | grid-5-12 | `.grid-5-12` | `grid-template-areas: "header header header header header header header header header header header header" "left left left mid-left mid-left mid-left mid-right mid-right mid-right right right right" "left left left mid-left mid-left mid-left mid-right mid-right mid-right right right right" "left left left mid-left mid-left mid-left mid-right mid-right mid-right right right right" "footer footer footer footer footer footer footer footer footer footer footer footer"; grid-template-rows: repeat(5, 1fr)` |
| 4313 | grid-5-12 | `.grid-5-12, .grid-6-12` | `grid-template-columns: repeat(12, 1fr)` |
| 4317 | grid-6-12 | `.grid-6-12` | `grid-template-areas: "header header header header header header header header header header header header" "left left left mid-left mid-left mid-left mid-right mid-right mid-right right right right" "left left left mid-left mid-left mid-left mid-right mid-right mid-right right right right" "left left left mid-left mid-left mid-left mid-right mid-right mid-right right right right" "left left left mid-left mid-left mid-left mid-right mid-right mid-right right right right" "footer footer footer footer footer footer footer footer footer footer footer footer"; grid-template-rows: repeat(6, 1fr)` |
| 4321 | grid-8-12 | `.grid-8-12` | `grid-template-areas: "header header header header header header header header header header header header" "left left left mid-left mid-left mid-left mid-right mid-right mid-right right right right" "left left left mid-left mid-left mid-left mid-right mid-right mid-right right right right" "left left left mid-left mid-left mid-left mid-right mid-right mid-right right right right" "left left left mid-left mid-left mid-left mid-right mid-right mid-right right right right" "left left left mid-left mid-left mid-left mid-right mid-right mid-right right right right" "left left left mid-left mid-left mid-left mid-right mid-right mid-right right right right" "footer footer footer footer footer footer footer footer footer footer footer footer"; grid-template-rows: repeat(8, 1fr)` |
| 4325 | grid-8-12 | `.grid-8-12, .simple-grid` | `grid-template-columns: repeat(12, 1fr)` |
| 4329 | simple-grid | `.simple-grid` | `--rowGap: 4px; --columnGap: 8px; gap: var(--rowGap) var(--columnGap); grid-template-areas: "head head head head head head head head head head head head" "main main main extd .... .... .... .... .... .... side side" "main main main extd extm extm extm extm extm extm side side" "main main main extd extf extf extf extf extf extf side side" "foot foot foot foot foot foot foot foot foot foot foot foot"; grid-template-rows: repeat(5, 1fr); padding: 0` |
| 4338 | simple-grid | `@media only screen and (min-width: 320px) and (orientation: landscape), only screen and (min-width: 641px) and (orientation: portrait) › .simple-grid` | `--rowGap: 4px; --columnGap: 4px; padding: 0 20px` |
| 4345 | simple-grid | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .simple-grid` | `--rowGap: 20px; --columnGap: 24px; padding: 0 20px` |
| 4351 | GLOBAL | `body` | `color: #000; height: 100%; left: 0; margin: 0; overscroll-behavior: none; position: fixed; top: 0; width: 100vw` |
| 4361 | pioneer | `#pioneer` | `width: 100%` |
| 4364 | pioneer | `#pioneer, .ui` | `height: 100%; left: 0; position: absolute; top: 0` |
| 4371 | ui | `.ui` | `min-width: 320px; pointer-events: none; width: 100vw` |
| 4376 | ui | `.ui .clickable` | `cursor: pointer; pointer-events: all` |
| 4380 | ui | `.ui .hidden .clickable` | `cursor: unset; pointer-events: none` |
| 4384 | time-controller | `.time-controller .rate-container` | `align-items: center; display: grid; grid-template-rows: auto; justify-content: start` |
| 4390 | clock-shortcut | `.clock-shortcut` | `display: grid; grid-column: 1; grid-row: 1` |
| 4395 | extended-controls | `.extended-controls` | `align-items: center; display: grid; grid-template-columns: auto auto; width: 100%` |
| 4401 | grid-layout | `.grid-layout header .breadcrumb` | `grid-column: 1; grid-row: 1; height: 45px` |
| 4406 | grid-layout | `.grid-layout header .top-right-nav` | `align-items: center; display: flex; font-family: Inter, Metropolis, sans-serif; gap: 1rem; grid-column: 2; grid-row: 1; justify-content: flex-end; justify-self: end` |
| 4420 | clock | `@media only screen and (min-width: 320px) › .clock` | `align-self: end; grid-column: 2; grid-row: 1; justify-self: end` |
| 4426 | time-controller | `@media only screen and (min-width: 320px) › .time-controller` | `justify-self: stretch` |
| 4429 | time-controller | `@media only screen and (min-width: 320px) › .time-controller .rate-container` | `grid-template-columns: auto 85px 2px 85px auto; grid-template-rows: 30px` |
| 4433 | time-controller | `@media only screen and (min-width: 320px) › .time-controller .rate-container .play-pause` | `display: none` |
| 4436 | clock-shortcut | `@media only screen and (min-width: 320px) › .clock-shortcut` | `grid-template-rows: auto auto` |
| 4439 | extended-controls | `@media only screen and (min-width: 320px) › .extended-controls` | `border-top: 1px solid var(--grayDark); grid-column: span 2; margin-bottom: 10px; padding-top: 10px` |
| 4447 | clock-shortcut | `@media only screen and (min-width: 320px) and (orientation: landscape) › .clock-shortcut` | `grid-template-columns: auto auto; grid-template-rows: auto` |
| 4453 | clock | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .clock` | `align-self: auto; grid-column: 1; grid-row: 2` |
| 4458 | clock | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .clock, .time-controller` | `justify-self: auto` |
| 4462 | time-controller | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .time-controller .rate-container` | `grid-template-columns: auto auto 90px 2px 90px auto; grid-template-rows: 30px` |
| 4466 | time-controller | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .time-controller .rate-container .play-pause` | `display: block` |
| 4469 | clock-shortcut | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .clock-shortcut` | `grid-column: span 2; grid-template-columns: auto auto; grid-template-rows: auto` |
| 4474 | extended-controls | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .extended-controls` | `border-top: none; grid-column: 2; grid-row: 2; margin-bottom: 0; padding-top: 0` |
| 4482 | GLOBAL | `:root` | `--gridHeaderHeight: 75px` |
| 4485 | simple-grid | `.simple-grid .float-mid` | `align-self: end; justify-self: start; width: 100%` |
| 4490 | simple-grid | `.simple-grid .overlay-container .overlay` | `grid-column: auto; grid-row: auto` |
| 4495 | simple-grid | `@media only screen and (min-width: 320px) › .simple-grid .content-panel` | `grid-column: main-start/side-end; grid-row: extf-start/foot-end` |
| 4499 | simple-grid | `@media only screen and (min-width: 320px) › .simple-grid .content-panel.overlay` | `grid-row: head-start/foot-end` |
| 4502 | simple-grid | `@media only screen and (min-width: 320px) › .simple-grid .featured-stories-panel` | `grid-column: main-start/side-end; grid-row: extf-start/foot-end` |
| 4506 | simple-grid | `@media only screen and (min-width: 320px) › .simple-grid header` | `align-items: center; display: grid; gap: 10px; grid-area: head; grid-template-columns: auto minmax(70px, max-content); justify-content: space-between; margin: 0 20px` |
| 4515 | simple-grid | `@media only screen and (min-width: 320px) › .simple-grid .float-right-bottom` | `align-self: end; grid-column: 11/side-end; grid-row: foot-start/foot-end; justify-self: start; margin-bottom: 105px; padding-right: 20px; position: absolute; width: 100%` |
| 4525 | simple-grid | `@media only screen and (min-width: 320px) › .simple-grid .float-mid` | `grid-column: 2/side-start; grid-row: 3` |
| 4529 | simple-grid | `@media only screen and (min-width: 320px) › .simple-grid .float-mid.low` | `grid-row: 4` |
| 4532 | simple-grid | `@media only screen and (min-width: 320px) › .simple-grid .float-mid-bottom` | `align-self: center; bottom: 0; display: grid; gap: 10px 5px; grid-area: foot; grid-template-columns: auto max-content; grid-template-rows: auto auto; justify-items: start; justify-self: center; margin: 0 20px; position: absolute; width: calc(100% - 40px)` |
| 4546 | simple-grid | `@media only screen and (min-width: 320px) › .simple-grid .float-mid-bottom.hidden` | `display: none` |
| 4549 | simple-grid | `@media only screen and (min-width: 320px) › .simple-grid .compare` | `display: grid; grid-column: main-start/foot-end; grid-row: head-start/foot-end; grid-template-columns: auto; grid-template-rows: 60px calc(var(--vh)/2 - 60px) calc(var(--vh)/2 - 40px) 40px` |
| 4558 | simple-grid | `@media only screen and (min-width: 320px) and (orientation: landscape) › .simple-grid header` | `margin: 0` |
| 4561 | simple-grid | `@media only screen and (min-width: 320px) and (orientation: landscape) › .simple-grid .float-right-bottom` | `align-items: end; align-self: end; display: grid; grid-column: 9/side-end; grid-row: foot; justify-content: end; justify-self: end; margin-bottom: 0; padding-bottom: 10px; padding-right: 56px` |
| 4573 | simple-grid | `@media only screen and (min-width: 320px) and (orientation: landscape) › .simple-grid .float-mid` | `grid-row: main` |
| 4576 | simple-grid | `@media only screen and (min-width: 320px) and (orientation: landscape) › .simple-grid .float-mid-bottom` | `align-items: normal; align-self: start; gap: 10px 5px; grid-column: main-start/side-end; grid-row: foot-start/foot-end; grid-template-columns: auto max-content; grid-template-rows: auto auto; height: auto` |
| 4586 | simple-grid | `@media only screen and (min-width: 320px) and (orientation: landscape) › .simple-grid .compare` | `display: grid; grid-column: main-start/foot-end; grid-row: head-start/foot-end; grid-template-columns: 50% 50%; grid-template-rows: 60px auto 40px; margin-left: -20px; width: calc(100% + 40px)` |
| 4597 | simple-grid | `@media only screen and (min-width: 641px) and (orientation: portrait) › .simple-grid .float-right-bottom` | `align-items: end; align-self: end; display: grid; grid-column: 9/side-end; grid-row: foot; height: 51px; justify-content: end; justify-self: end; margin-bottom: 0; padding-bottom: 10px; padding-right: 56px` |
| 4612 | simple-grid | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .simple-grid .detail` | `grid-column: main-start/main-end; grid-row: head-start/foot-end` |
| 4616 | simple-grid | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .simple-grid .content-panel, .simple-grid .featured-stories-panel` | `display: grid; gap: 5px; grid-column: main-start/main-end; grid-row: head-start/foot-end; grid-template-columns: 1fr; grid-template-rows: 80px max-content auto 3%` |
| 4625 | simple-grid | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .simple-grid header` | `height: var(--gridHeaderHeight); margin: 0` |
| 4629 | simple-grid | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .simple-grid .float-right-bottom` | `align-items: end; align-self: end; grid-column: 11/side-end; grid-row: side-start/foot-end; height: 100%; justify-self: end; margin-bottom: 25px; padding: 0; width: 100%` |
| 4640 | simple-grid | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .simple-grid .float-mid` | `grid-column: main-end/side-start; grid-row: extf-start` |
| 4644 | simple-grid | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .simple-grid .float-mid-bottom` | `align-items: center; align-self: end; display: grid; gap: 0 30px; grid-column: main-end/side-start; grid-row: foot-start/foot-end; grid-template-columns: minmax(250px, 30%) 70%; grid-template-rows: 50% 50%; height: auto; justify-items: start; margin-bottom: 25px; position: static` |
| 4658 | simple-grid | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .simple-grid .compare` | `display: grid; grid-column: main-start/foot-end; grid-row: head-start/foot-end` |
| 4664 | pioneer-constellation-label | `.pioneer-constellation-label` | `--constellationFadeIn: 1.0; --constellationFadeOut: 0.05` |
| 4668 | pioneer-label-div | `.pioneer-label-div` | `--fontSize: 16px; --fontSizeLarge: 18px; --fontSizeSmall: 14px; --fontSizeXSmall: 12px; --fontSizeTiny: 10px; --secondaryFadeIn: 0.35; --secondaryFadeOut: 0.05; --primaryFadeIn: 0.75; --primaryFadeOut: 0.05; --hoverOpacity: 1; color: var(--white); font-size: var(--fontSizeSmall); left: 12px; pointer-events: all; top: -4px; transition: opacity .25s ease-out; white-space: nowrap` |
| 4686 | pioneer-label-div | `.pioneer-label-div › &.unclickable` | `pointer-events: none` |
| 4689 | pioneer-label-div | `.pioneer-label-div › &.hidden, &.hiddenByLabelQuadtree` | `display: initial; opacity: 0; pointer-events: none; transition: opacity .75s ease-out` |
| 4695 | pioneer-label-div | `.pioneer-label-div › &.hidden, &.hiddenByLabelQuadtree › .icon, .text` | `opacity: var(--secondaryFadeOut); transition: opacity .75s, transform .75s ease-in-out` |
| 4701 | pioneer-label-div | `.pioneer-label-div › .icon, .text` | `opacity: var(--secondaryFadeIn); transition: opacity .25s, transform .25s ease-in-out` |
| 4706 | pioneer-label-div | `.pioneer-label-div › .text` | `transition: opacity .25s ease-out` |
| 4709 | pioneer-label-div | `.pioneer-label-div › .icon` | `height: 16px; left: 0; position: absolute; top: 50%; transform: translate(calc(-50% - 12px), calc(-50% + 4px)); width: 16px` |
| 4716 | pioneer-label-div | `.pioneer-label-div › .icon › &.no-icon` | `display: none` |
| 4721 | pioneer-label-div | `.pioneer-label-div › @media (pointer: fine) and (hover: hover) › &:hover` | `(嵌套包装)` |
| 4722 | pioneer-label-div | `.pioneer-label-div › @media (pointer: fine) and (hover: hover) › &:hover › .icon` | `transform: translate(calc(-50% - 12px), calc(-50% + 4px)) scale(1.2); transform-origin: center center` |
| 4726 | pioneer-label-div | `.pioneer-label-div › @media (pointer: fine) and (hover: hover) › &:hover › .icon, .text` | `opacity: var(--hoverOpacity)` |
| 4732 | pioneer-label-div | `.pioneer-label-div › &.spacecraft` | `left: 14px; top: -4px` |
| 4735 | pioneer-label-div | `.pioneer-label-div › &.spacecraft › .icon` | `transform: translate(calc(-50% - 14px), calc(-50% + 4px)); width: 14px` |
| 4740 | pioneer-label-div | `.pioneer-label-div › &.spacecraft › @media (pointer: fine) and (hover: hover) › &:hover` | `(嵌套包装)` |
| 4741 | pioneer-label-div | `.pioneer-label-div › &.spacecraft › @media (pointer: fine) and (hover: hover) › &:hover › .icon` | `transform: translate(calc(-50% - 14px), calc(-50% + 4px)) scale(1.2)` |
| 4747 | pioneer-label-div | `.pioneer-label-div › &.planet` | `left: 18px; letter-spacing: .3em; position: relative; top: -6px` |
| 4752 | pioneer-label-div | `.pioneer-label-div › &.planet › .icon, .text` | `opacity: var(--primaryFadeIn)` |
| 4756 | pioneer-label-div | `.pioneer-label-div › &.planet › .text` | `font-weight: 600; text-transform: uppercase` |
| 4760 | pioneer-label-div | `.pioneer-label-div › &.planet › .icon` | `height: 20px; transform: translate(calc(-50% - 18px), calc(-50% + 6px)); width: 20px` |
| 4765 | pioneer-label-div | `.pioneer-label-div › &.planet › &.hidden, &.hiddenByLabelQuadtree` | `(嵌套包装)` |
| 4767 | pioneer-label-div | `.pioneer-label-div › &.planet › &.hidden, &.hiddenByLabelQuadtree › .icon, .text` | `opacity: var(--primaryFadeOut)` |
| 4773 | pioneer-label-div | `.pioneer-label-div › &.planet › @media (pointer: fine) and (hover: hover) › &:hover` | `(嵌套包装)` |
| 4774 | pioneer-label-div | `.pioneer-label-div › &.planet › @media (pointer: fine) and (hover: hover) › &:hover › .icon` | `transform: translate(calc(-50% - 18px), calc(-50% + 6px)) scale(1.2)` |
| 4777 | pioneer-label-div | `.pioneer-label-div › &.planet › @media (pointer: fine) and (hover: hover) › &:hover › .icon, .text` | `opacity: var(--hoverOpacity)` |
| 4784 | pioneer-label-div | `.pioneer-label-div › &.sun` | `bottom: unset; font-size: var(--fontSize); left: 20px; letter-spacing: .3em; top: 8px` |
| 4790 | pioneer-label-div | `.pioneer-label-div › &.sun › .icon, .text` | `opacity: var(--primaryFadeIn)` |
| 4794 | pioneer-label-div | `.pioneer-label-div › &.sun › .text` | `font-weight: 600; text-transform: uppercase` |
| 4798 | pioneer-label-div | `.pioneer-label-div › &.sun › .icon` | `height: 20px; width: 20px` |
| 4802 | pioneer-label-div | `.pioneer-label-div › &.sun › &.hidden, &.hiddenByLabelQuadtree` | `(嵌套包装)` |
| 4804 | pioneer-label-div | `.pioneer-label-div › &.sun › &.hidden, &.hiddenByLabelQuadtree › .icon, .text` | `opacity: var(--primaryFadeOut)` |
| 4811 | pioneer-constellation-label | `.pioneer-constellation-label .text` | `color: var(--constellation); filter: brightness(.5); font-family: DMMono, monospace; font-size: 20px; font-weight: 300; letter-spacing: .5em; text-shadow: 0 0 7px var(--constellationGlowMed), 0 0 10px var(--constellationGlowDark); text-transform: uppercase` |
| 4821 | pioneer-constellation-label | `.pioneer-constellation-label .icon` | `display: none` |
| 4824 | pioneer-constellation-label | `.pioneer-constellation-label` | `pointer-events: all` |
| 4827 | pioneer-constellation-label | `.pioneer-constellation-label.hidden, .pioneer-constellation-label.hiddenByLabelQuadtree` | `display: initial; pointer-events: none` |
| 4832 | pioneer-constellation-label | `.pioneer-constellation-label .text` | `opacity: var(--constellationFadeIn); transition: opacity .25s, transform .25s ease-in-out` |
| 4836 | pioneer-constellation-label | `.pioneer-constellation-label.hidden .text, .pioneer-constellation-label.hiddenByLabelQuadtree .text` | `opacity: var(--constellationFadeOut); transition: opacity .75s, transform .75s ease-in-out` |
| 4842 | pioneer-constellation-label | `@media (pointer: fine) and (hover: hover) › .pioneer-constellation-label:hover .text` | `cursor: pointer; filter: brightness(1.2); text-shadow: 0 0 5px var(--constellationGlow), 0 0 7px var(--constellationGlowMed), 0 0 10px var(--constellationGlowDark)` |
| 4851 | ring-label | `.ring-label` | `background: var(--grayDark); border-radius: 5px; padding: 0 4px; pointer-events: none` |
| 4857 | ring-label | `.ring-label .icon` | `display: none` |
| 4861 | pioneer-label-div | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .pioneer-label-div` | `font-size: var(--fontSize)` |
| 4864 | pioneer-label-div | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .pioneer-label-div.sun` | `font-size: var(--fontSizeLarge)` |
| 4868 | GLOBAL | `*` | `box-sizing: border-box; -webkit-user-select: none; -moz-user-select: none; user-select: none; -webkit-tap-highlight-color: transparent` |
| 4875 | GLOBAL | `input, textarea` | `font: inherit; -webkit-user-select: text; -moz-user-select: text; user-select: text` |
| 4882 | GLOBAL | `body, html` | `height: 100%; overflow: hidden; position: relative; -webkit-text-size-adjust: none; -moz-text-size-adjust: none; text-size-adjust: none` |
| 4891 | GLOBAL | `html` | `height: var(--vh)` |
| 4894 | GLOBAL | `body` | `color: var(--white); font-family: Metropolis, sans-serif; font-size: 16px; font-weight: 300; letter-spacing: 0; line-height: 150%` |
| 4902 | semi | `body .semi` | `letter-spacing: .02em` |
| 4905 | hidden | `.hidden` | `display: none` |
| 4908 | invisible | `.invisible` | `visibility: hidden` |
| 4911 | editable | `.editable` | `cursor: text; pointer-events: all` |
| 4915 | clickable | `.clickable` | `cursor: pointer; pointer-events: all` |
| 4919 | clickable | `.clickable.underline` | `color: var(--white); cursor: pointer; opacity: .75; position: relative; text-decoration: underline; transition: opacity .25s ease-in-out` |
| 4928 | clickable | `@media (pointer: fine) and (hover: hover) › .clickable.underline:hover` | `opacity: 1` |
| 4932 | wide-text | `.wide-text` | `letter-spacing: .6em` |
| 4935 | semi | `.semi` | `font-weight: 600` |
| 4938 | small | `.small` | `font-family: Metropolis, sans-serif; font-size: 14px; letter-spacing: 0; line-height: 150%` |
| 4944 | x-small | `.x-small` | `font-size: 12px` |
| 4947 | tiny | `.tiny, .x-small` | `font-family: Metropolis, sans-serif; letter-spacing: .03em; line-height: 180%` |
| 4953 | tiny | `.tiny` | `font-size: 11px` |
| 4956 | uppercase | `.uppercase` | `text-transform: uppercase` |
| 4959 | capitalize | `.capitalize` | `text-transform: capitalize` |
| 4962 | vertical-line | `.vertical-line` | `border: 1px solid #fff; box-sizing: border-box; height: 20px; width: 2px` |
| 4968 | display | `.display, h1, h2, h3, h4, h5` | `color: var(--white); font-family: Metropolis, sans-serif; letter-spacing: -.02em; margin: 0` |
| 4979 | display | `.display.semi, h1.semi, h2.semi, h3.semi, h4.semi, h5.semi` | `letter-spacing: -.02em` |
| 4987 | display | `.display` | `font-size: 48px` |
| 4990 | display | `.display, h1` | `font-weight: 100; line-height: 120%` |
| 4995 | GLOBAL | `h1` | `font-size: 41px` |
| 4998 | GLOBAL | `h2` | `font-size: 36px; font-weight: 100; line-height: 120%` |
| 5003 | GLOBAL | `h3` | `font-size: 29px; font-weight: 300; line-height: 95%` |
| 5008 | semi | `h3.semi` | `line-height: 100%` |
| 5011 | GLOBAL | `h4` | `font-size: 22px; line-height: 120%` |
| 5015 | GLOBAL | `h4, h5` | `font-weight: 300` |
| 5019 | GLOBAL | `h5` | `font-size: 18px; line-height: 180%` |
| 5023 | semi | `h5.semi` | `line-height: 150%` |
| 5026 | line-break-text | `.line-break-text` | `white-space: pre-line` |
| 5029 | alert | `.alert` | `animation-direction: alternate; animation-duration: .5s; animation-iteration-count: 3; animation-name: blink; animation-timing-function: ease-in-out; outline: none; outline-offset: 4px` |
| 5038 | checkbox | `.checkbox` | `background-color: var(--grayDark); border-radius: 3px; height: 15px; transform: scale(1.333); width: 15px` |
| 5045 | tippy-box | `.tippy-box[data-theme~=default]` | `background-color: var(--grayDark); border-color: var(--grayDark); color: var(--grayLight); opacity: .9` |
| 5051 | tippy-box | `.tippy-box[data-theme~=default][data-placement^=top] > .tippy-arrow:before` | `border-top-color: var(--grayDark)` |
| 5054 | tippy-box | `.tippy-box[data-theme~=default][data-placement^=bottom] > .tippy-arrow:before` | `border-bottom-color: var(--grayDark)` |
| 5057 | tippy-box | `.tippy-box[data-theme~=default][data-placement^=left] > .tippy-arrow:before` | `border-left-color: var(--grayDark)` |
| 5060 | tippy-box | `.tippy-box[data-theme~=default][data-placement^=right] > .tippy-arrow:before` | `border-right-color: var(--grayDark)` |
| 5063 | os-host-resize-disabled | `.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden > .os-scrollbar-vertical, .os-scrollbar-vertical, .os-theme-dark > .os-scrollbar` | `bottom: 0; right: 6px; top: 0` |
| 5070 | os-theme-dark | `.os-theme-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle` | `background: var(--grayDark); width: 4px` |
| 5074 | os-theme-dark | `.os-theme-dark > .os-scrollbar:active > .os-scrollbar-track > .os-scrollbar-handle, .os-theme-dark > .os-scrollbar:hover > .os-scrollbar-track > .os-scrollbar-handle` | `background: var(--gray); width: 6px` |
| 5079 | os-theme-dark | `.os-theme-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle` | `min-height: 20px` |
| 5083 | os-theme-dark | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .os-theme-dark > .os-scrollbar` | `display: block` |
| 5088 | os-theme-dark | `@media (pointer: coarse) › .os-theme-dark > .os-scrollbar` | `display: none` |
| 5092 | eyes-toggle | `.eyes-toggle` | `height: 26px; position: relative` |
| 5096 | eyes-toggle | `.eyes-toggle input[type=checkbox]` | `-webkit-appearance: none; -moz-appearance: none; appearance: none; cursor: pointer` |
| 5102 | eyes-toggle | `.eyes-toggle input[type=checkbox]:focus` | `outline: 0` |
| 5105 | eyes-toggle | `.eyes-toggle input` | `background: linear-gradient( 180deg, #2d2f39, #1f2027); border: 1px solid #827a7a; border-radius: 16px; display: inline-block; height: 26px; margin: 0; position: relative; transition: all .2s ease; width: 40px` |
| 5120 | eyes-toggle | `.eyes-toggle input:after` | `background: #827a7a; border-radius: 50%; box-shadow: 0 1px 2px rgba(44, 44, 44, .2); content: ""; height: 20px; left: 2px; position: absolute; top: 2px; transition: all .2s cubic-bezier(.5, .1, .75, 1.35); width: 20px` |
| 5132 | eyes-toggle | `.eyes-toggle input:checked` | `border-color: #b6acac` |
| 5135 | eyes-toggle | `.eyes-toggle input:checked:after` | `background: #b6acac; transform: translateX(15px)` |
| 5139 | eyes-toggle | `.eyes-toggle label` | `cursor: pointer; height: 26px; left: 0; position: absolute; top: 0; transition: all .2s ease; width: 26px` |
| 5148 | eyes-toggle | `.eyes-toggle label:after` | `border: 2px solid #252527; border-right: none; border-top: none; content: ""; height: 3px; left: 10px; opacity: 0; position: absolute; top: 10px; transform: rotate(-45deg); transition: all .2s ease; width: 6px` |
| 5162 | eyes-toggle | `.eyes-toggle input[type=checkbox]:checked + label` | `border-color: #b6acac; left: 14px` |
| 5166 | eyes-toggle | `.eyes-toggle input[type=checkbox]:checked + label:after` | `opacity: 1` |
| 5169 | eyes-checkbox | `.eyes-checkbox` | `height: 22px; position: relative; width: 22px` |
| 5174 | eyes-checkbox | `.eyes-checkbox label` | `background-color: #252527; border: 1px solid #b6acac; border-radius: 3px; cursor: pointer; height: 22px; left: 0; position: absolute; top: 0; transition: all .2s ease; width: 22px` |
| 5187 | eyes-checkbox | `@media (pointer: fine) and (hover: hover) › .eyes-checkbox label:hover` | `background-color: #3a3a3a` |
| 5191 | eyes-checkbox | `.eyes-checkbox label:after` | `border: 2px solid #252527; border-right: none; border-top: none; content: ""; height: 4px; left: 5px; opacity: 0; position: absolute; top: 6px; transform: rotate(-45deg); transition: all .2s ease; width: 9px` |
| 5205 | eyes-checkbox | `.eyes-checkbox input[type=checkbox]` | `visibility: hidden` |
| 5208 | eyes-checkbox | `.eyes-checkbox input[type=checkbox]:checked + label` | `background-color: #b6acac; border-color: #b6acac` |
| 5212 | eyes-checkbox | `.eyes-checkbox input[type=checkbox]:checked + label:after` | `opacity: 1` |
| 5215 | icon-bg | `.icon-bg` | `background: var(--grayDarkAlpha); border-radius: 3px` |
| 5219 | icon-box | `.icon-box .icon-auto-cam, .icon-box .icon-flood-light, .icon-box .icon-free-cam, .icon-box .icon-natural-light, .icon-box .icon-shadow-light` | `display: flex; margin: auto` |
| 5227 | icon | `.icon.circle` | `background-color: hsla(0, 0%, 100%, .17); background-image: none; border-radius: 50%; height: 48px; width: 48px` |
| 5234 | icon | `.icon.caret-right, .icon.circle` | `background-position: 50%; background-size: cover` |
| 5239 | icon | `.icon.caret-right` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/caret_right.svg); height: 32px; width: 32px` |
| 5244 | icon | `.icon.caret-up` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/caret_up.svg)` |
| 5247 | icon | `.icon.caret-down, .icon.caret-up` | `background-position: 50%; background-size: cover; height: 24px; width: 24px` |
| 5254 | icon | `.icon.caret-down` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/caret_down.svg)` |
| 5257 | icon | `.icon.caret-double-left` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/caret_double_left.svg)` |
| 5260 | icon | `.icon.arrow-line-up, .icon.caret-double-left` | `background-position: 50%; background-size: cover; height: 16px; width: 16px` |
| 5267 | icon | `.icon.arrow-line-up` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/arrow_line_up.svg)` |
| 5270 | icon | `.icon.arrow-line-down` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/arrow_line_down.svg); background-position: 50%; background-size: cover; height: 16px; width: 16px` |
| 5277 | icon | `.icon.mission-events` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/mission_events.svg)` |
| 5280 | icon | `.icon.compare-size, .icon.mission-events` | `background-position: 50%; background-size: cover; height: 32px; width: 32px` |
| 5287 | icon | `.icon.compare-size` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/compare_size.svg)` |
| 5290 | icon | `.icon.distance-tool` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/distance_tool.svg)` |
| 5293 | icon | `.icon.distance-tool, .icon.telescope-mode` | `background-position: 50%; background-size: cover; height: 32px; width: 32px` |
| 5300 | icon | `.icon.telescope-mode` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/telescope_mode.svg)` |
| 5303 | icon | `.icon.constellation` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/constellation.svg); height: 30px; width: 30px` |
| 5308 | icon | `.icon.constellation, .icon.latlong-target` | `background-position: 50%; background-size: cover` |
| 5313 | icon | `.icon.latlong-target` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/latlong_target.svg); height: 19px; width: 12px` |
| 5318 | icon | `.icon.telescope-target` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/telescope_target.svg); height: 40px; width: 80px` |
| 5323 | icon | `.icon.rate-change, .icon.telescope-target` | `background-position: 50%; background-size: cover` |
| 5328 | icon | `.icon.rate-change` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/rate_increase.svg); height: 28px; width: 40px` |
| 5333 | icon | `.icon.rate-pause` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/rate_pause.svg)` |
| 5336 | icon | `.icon.rate-pause, .icon.rate-play` | `background-position: 50%; background-size: cover; height: 20px; width: 32px` |
| 5343 | icon | `.icon.rate-play` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/rate_play.svg)` |
| 5346 | icon | `.icon.rate-replay` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/rate-replay.svg); height: 20px; width: 32px` |
| 5351 | icon | `.icon.rate-replay, .icon.replay-icon-solid` | `background-position: 50%; background-size: cover` |
| 5356 | icon | `.icon.replay-icon-solid` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/replay-icon-solid.svg); height: 18px; width: 20px` |
| 5361 | icon | `.icon.play-icon-solid` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/play-icon-solid.svg)` |
| 5364 | icon | `.icon.pause-icon-solid, .icon.play-icon-solid` | `background-position: 50%; background-size: cover; height: 24px; width: 18px` |
| 5371 | icon | `.icon.pause-icon-solid` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/pause-icon-solid.svg)` |
| 5374 | icon | `.icon.next-arrow-solid` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/next-arrow-solid.svg); background-position: 50%; background-size: cover; height: 18px; width: 16px` |
| 5381 | icon | `.icon.collapse-arrow` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/collapse_arrow.svg); background-size: contain; height: 40px; width: 40px` |
| 5387 | icon | `.icon.scroll-top` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/scroll_top.svg); background-position: 50%; background-size: auto; height: 24px; width: 24px` |
| 5394 | icon | `.icon.watch` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/watch.svg); height: 16px; width: 16px` |
| 5399 | icon | `.icon.icon-drag, .icon.watch` | `background-position: 50%; background-size: contain` |
| 5404 | icon | `.icon.icon-drag` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/draggable.svg); height: 24px; width: 24px` |
| 5409 | icon | `.icon.distance-source` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/distance_source.svg); height: 16px; width: 16px` |
| 5414 | icon | `.icon.distance-source, .icon.distance-target` | `background-position: 50%; background-size: contain` |
| 5419 | icon | `.icon.distance-target` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/distance_target.svg); height: 18px; width: 18px` |
| 5424 | icon | `.icon.distance-swap` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/distance_swap.svg); height: 24px; width: 24px` |
| 5429 | icon | `.icon.camera-lock, .icon.distance-swap` | `background-position: 50%; background-size: contain` |
| 5434 | icon | `.icon.camera-lock` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/camera_lock.svg); height: 32px; width: 32px` |
| 5439 | icon-timeline | `.icon-timeline` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/timeline.svg)` |
| 5442 | icon-table | `.icon-table, .icon-timeline` | `background-origin: content-box; background-position: 50%; height: 1.8rem; width: 1.8rem` |
| 5449 | icon-table | `.icon-table` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/table.svg)` |
| 5452 | icon-calendar | `.icon-calendar` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/calendar_check.svg); background-origin: content-box; background-position: 50%; height: 1.8rem; width: 1.8rem` |
| 5459 | load-icon | `.load-icon` | `z-index: 1` |
| 5463 | icon-bg | `@media (pointer: fine) and (hover: hover) › .icon-bg:hover` | `background: var(--grayAlpha)` |
| 5466 | icon-box | `@media (pointer: fine) and (hover: hover) › .icon-box:hover .icon-auto-cam, .icon-box:hover .icon-flood-light, .icon-box:hover .icon-free-cam, .icon-box:hover .icon-natural-light, .icon-box:hover .icon-shadow-light, .icon-info:hover, .icon-minus:hover, .icon-plus:hover, .icon-replay:hover` | `opacity: 1` |
| 5478 | GLOBAL | `:root` | `--settings: #0d67ff; --settingsAlt: #6180b6; --paused: #ff9a42; --pausedAlpha: #ff9a42bf; --distance-tool-color: #7a90a8; --border-gray: #ffffff50; --tab-border-gray: #606060; --overlayBgGradient: linear-gradient( 180deg,#252527,rgba(0,0,0,.95) 52.08%,rgba(0,0,0,.9)); --menuGradient: linear-gradient( 180deg,#252527 0.7%,#000); --horizonalFade: linear-gradient( to bottom,#000 0,var(--gray) 30%,var(--gray) 70%,#000); --verticalFade: linear-gradient( to right,#000 0,var(--gray) 30%,var(--gray) 70%,#000); --horizontalHighlight: linear-gradient( 100deg,#434347 30%,rgba(37,37,39,0)); --textBgGradient: linear-gradient( 0deg,#000000cc 0%,#000000aa 20%,#00000000); --darkGrayBgGradientBtm: linear-gradient( to bottom,var(--grayDarkAlpha) 0%,#17171bcc 100%); --darkGrayBgGradientTop: linear-gradient( 0deg,#212123 0%,#17171b); --darkGrayGradientLeft: linear-gradient( 90deg,#484848,#313131); --blackGradientVert: linear-gradient( 180deg,rgba(16,15,18,.95) 21.2%,rgba(18,16,18,.85) 84.8%); --panelBg: #181818` |
| 5508 | bg-color | `.bg-color` | `color: var(--white)` |
| 5511 | color | `.color.black` | `color: var(--black)` |
| 5514 | bg-color | `.bg-color.black` | `background-color: var(--black)` |
| 5517 | color | `.color.gray.dark` | `color: var(--grayDark)` |
| 5520 | bg-color | `.bg-color.gray.dark` | `background-color: var(--grayDark)` |
| 5523 | color | `.color.gray` | `color: var(--gray)` |
| 5526 | bg-color | `.bg-color.gray` | `background-color: var(--gray)` |
| 5529 | color | `.color.gray.med` | `color: var(--grayMed)` |
| 5532 | bg-color | `.bg-color.gray.med` | `background-color: var(--grayMed)` |
| 5535 | color | `.color.gray.light` | `color: var(--grayLight)` |
| 5538 | bg-color | `.bg-color.gray.light` | `background-color: var(--grayLight)` |
| 5541 | color | `.color.sun` | `color: var(--sun)` |
| 5544 | bg-color | `.bg-color.sun` | `background-color: var(--sun); color: var(--black)` |
| 5548 | color | `.color.sun.med` | `color: var(--sunMed)` |
| 5551 | bg-color | `.bg-color.sun.med` | `background-color: var(--sunMed)` |
| 5554 | color | `.color.sun.dark` | `color: var(--sunDark)` |
| 5557 | bg-color | `.bg-color.sun.dark` | `background-color: var(--sunDark)` |
| 5560 | color | `.color.mercury` | `color: var(--mercury)` |
| 5563 | bg-color | `.bg-color.mercury` | `background-color: var(--mercury)` |
| 5566 | color | `.color.mercury.med` | `color: var(--mercuryMed)` |
| 5569 | bg-color | `.bg-color.mercury.med` | `background-color: var(--mercuryMed)` |
| 5572 | color | `.color.mercury.dark` | `color: var(--mercuryDark)` |
| 5575 | bg-color | `.bg-color.mercury.dark` | `background-color: var(--mercuryDark)` |
| 5578 | color | `.color.venus` | `color: var(--venus)` |
| 5581 | bg-color | `.bg-color.venus` | `background-color: var(--venus)` |
| 5584 | color | `.color.venus.med` | `color: var(--venusMed)` |
| 5587 | bg-color | `.bg-color.venus.med` | `background-color: var(--venusMed)` |
| 5590 | color | `.color.venus.dark` | `color: var(--venusDark)` |
| 5593 | bg-color | `.bg-color.venus.dark` | `background-color: var(--venusDark)` |
| 5596 | color | `.color.earth` | `color: var(--earth)` |
| 5599 | bg-color | `.bg-color.earth` | `background-color: var(--earth)` |
| 5602 | color | `.color.earth.med` | `color: var(--earthMed)` |
| 5605 | bg-color | `.bg-color.earth.med` | `background-color: var(--earthMed)` |
| 5608 | color | `.color.earth.dark` | `color: var(--earthDark)` |
| 5611 | bg-color | `.bg-color.earth.dark` | `background-color: var(--earthDark)` |
| 5614 | color | `.color.mars` | `color: var(--mars)` |
| 5617 | bg-color | `.bg-color.mars` | `background-color: var(--mars)` |
| 5620 | color | `.color.mars.med` | `color: var(--marsMed)` |
| 5623 | bg-color | `.bg-color.mars.med` | `background-color: var(--marsMed)` |
| 5626 | color | `.color.mars.dark` | `color: var(--marsDark)` |
| 5629 | bg-color | `.bg-color.mars.dark` | `background-color: var(--marsDark)` |
| 5632 | color | `.color.jupiter` | `color: var(--jupiter)` |
| 5635 | bg-color | `.bg-color.jupiter` | `background-color: var(--jupiter)` |
| 5638 | color | `.color.jupiter.med` | `color: var(--jupiterMed)` |
| 5641 | bg-color | `.bg-color.jupiter.med` | `background-color: var(--jupiterMed)` |
| 5644 | color | `.color.jupiter.dark` | `color: var(--jupiterDark)` |
| 5647 | bg-color | `.bg-color.jupiter.dark` | `background-color: var(--jupiterDark)` |
| 5650 | color | `.color.saturn` | `color: var(--saturn)` |
| 5653 | bg-color | `.bg-color.saturn` | `background-color: var(--saturn)` |
| 5656 | color | `.color.saturn.med` | `color: var(--saturnMed)` |
| 5659 | bg-color | `.bg-color.saturn.med` | `background-color: var(--saturnMed)` |
| 5662 | color | `.color.saturn.dark` | `color: var(--saturnDark)` |
| 5665 | bg-color | `.bg-color.saturn.dark` | `background-color: var(--saturnDark)` |
| 5668 | color | `.color.uranus` | `color: var(--uranus)` |
| 5671 | bg-color | `.bg-color.uranus` | `background-color: var(--uranus)` |
| 5674 | color | `.color.uranus.med` | `color: var(--uranusMed)` |
| 5677 | bg-color | `.bg-color.uranus.med` | `background-color: var(--uranusMed)` |
| 5680 | color | `.color.uranus.dark` | `color: var(--uranusDark)` |
| 5683 | bg-color | `.bg-color.uranus.dark` | `background-color: var(--uranusDark)` |
| 5686 | color | `.color.neptune` | `color: var(--neptune)` |
| 5689 | bg-color | `.bg-color.neptune` | `background-color: var(--neptune)` |
| 5692 | color | `.color.neptune.med` | `color: var(--neptuneMed)` |
| 5695 | bg-color | `.bg-color.neptune.med` | `background-color: var(--neptuneMed)` |
| 5698 | color | `.color.neptune.dark` | `color: var(--neptuneDark)` |
| 5701 | bg-color | `.bg-color.neptune.dark` | `background-color: var(--neptuneDark)` |
| 5704 | color | `.color.spacecraft` | `color: var(--spacecraft)` |
| 5707 | bg-color | `.bg-color.spacecraft` | `background-color: var(--spacecraft)` |
| 5710 | color | `.color.moon` | `color: var(--moon)` |
| 5713 | bg-color | `.bg-color.moon` | `background-color: var(--moon)` |
| 5716 | color | `.color.dwarf-planet` | `color: var(--dwarfPlanet)` |
| 5719 | bg-color | `.bg-color.dwarf-planet` | `background-color: var(--dwarfPlanet)` |
| 5722 | color | `.color.comet` | `color: var(--comet)` |
| 5725 | bg-color | `.bg-color.comet` | `background-color: var(--comet)` |
| 5728 | color | `.color.asteroid` | `color: var(--asteroid)` |
| 5731 | bg-color | `.bg-color.asteroid` | `background-color: var(--asteroid)` |
| 5734 | color | `.color.live` | `color: var(--live)` |
| 5737 | bg-color | `.bg-color.live` | `background-color: var(--live)` |
| 5740 | color | `.color.error` | `color: var(--error)` |
| 5743 | bg-color | `.bg-color.error` | `background-color: var(--error)` |
| 5746 | color | `.color.settings` | `color: var(--settings)` |
| 5749 | bg-color | `.bg-color.settings` | `background-color: var(--settings)` |
| 5752 | color | `.color.settings-alt` | `color: var(--settingsAlt)` |
| 5755 | bg-color | `.bg-color.settings-alt` | `background-color: var(--settingsAlt)` |
| 5758 | GLOBAL | `:root` | `--settings-z-index: 40` |
| 5761 | dynamic-ui | `#dynamic-ui` | `grid-template-areas: "head head head head head head head head head head head head" "main main main extd .... .... .... .... .... .... side side" "main main main extd extm extm extm extm extm extm side side" "main main main extd extf extf extf extf extf extf side side" "main main main extd extf extf extf extf extf extf side side" "foot foot foot foot foot foot foot foot foot foot foot foot"; grid-template-rows: minmax(70px, max-content) 1fr 1fr 1fr minmax(20px, max-content) minmax(min(13vh, 70px), auto)` |
| 5765 | ui | `.ui header` | `grid-template-columns: auto; z-index: 50` |
| 5769 | grid-layout | `.grid-layout header .top-right-nav:not(:has(.share-button))` | `gap: 0` |
| 5772 | ui | `.ui header .search .cover` | `z-index: 0` |
| 5775 | ui | `.ui header .search .bar` | `z-index: 1` |
| 5778 | ui | `.ui .float-right-bottom` | `grid-row: -4; justify-self: unset; margin: 0 20px 0 0; margin-bottom: var(--collapsible-bottom-margin); padding: 0; position: relative; width: unset; z-index: var(--settings-z-index)` |
| 5788 | ui | `.ui .float-right-bottom .layer-panel` | `z-index: 1` |
| 5791 | ui | `.ui .float-right-bottom .settings` | `z-index: 0` |
| 5794 | ui | `.ui .carousel-container, .ui .content-panel, .ui .featured-stories-panel` | `z-index: 30` |
| 5799 | ui | `.ui .carousel-container.overlay, .ui .content-panel.overlay, .ui .featured-stories-panel.overlay` | `z-index: 60` |
| 5804 | ui | `.ui .float-mid-bottom` | `position: unset; z-index: 20` |
| 5808 | datetime-container | `.datetime-container > form:not(.hidden), .ui .datetime-container .date, .ui .datetime-container .time, .ui .time-controls` | `z-index: 20` |
| 5814 | ui | `.ui .float-mid-bottom .extended-controls` | `grid-template-columns: auto` |
| 5817 | ui | `.ui .float-full-bottom` | `z-index: 20` |
| 5820 | ui | `.ui .compare` | `z-index: 10` |
| 5824 | story-view | `@media only screen and (min-width: 320px) › body.story-view header .top-right-nav` | `margin-right: 2rem` |
| 5829 | story-view | `@media only screen and (min-width: 320px) and (orientation: landscape) › body.story-view header .top-right-nav` | `margin-right: 5rem` |
| 5834 | ui | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .ui .float-right-bottom` | `grid-row: -3; margin: 0` |
| 5838 | ui | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .ui .float-mid-bottom` | `height: 0` |
| 5841 | story-view | `@media only screen and (min-width: 1025px) and (min-height: 600px) › body.story-view header .top-right-nav` | `margin-right: 6rem` |
| 5845 | pioneer-label-div | `.pioneer-label-div.active:has(.distance-source), .pioneer-label-div.active:has(.distance-target)` | `pointer-events: none` |
| 5849 | pioneer-label-div | `.pioneer-label-div.active > span.icon.distance-source` | `height: 16px; opacity: var(--hoverOpacity); width: 16px` |
| 5854 | pioneer-label-div | `.pioneer-label-div.active > span.icon.distance-source + span.text, .pioneer-label-div.active > span.icon.distance-target, .pioneer-label-div.active > span.icon.distance-target + span.text` | `opacity: var(--hoverOpacity)` |
| 5859 | pioneer-label-div | `.pioneer-label-div.distance-between-pos` | `cursor: crosshair` |
| 5862 | pioneer-label-div | `.pioneer-label-div.distance-between-pos.hide` | `visibility: hidden` |
| 5865 | pioneer-label-div | `.pioneer-label-div.distance-between-pos > span.icon` | `background: none; background-color: var(--distance-tool-color); border-radius: .25rem; height: .1rem; opacity: var(--hoverOpacity); transform: translate(calc(var(--icon-offset-x, 0) - 50%), calc(var(--icon-offset-y, 0) - 50%)); transition-duration: .2s, .2s, .3s; transition-property: transform, opacity, filter; transition-timing-function: var(--ease-out-bezier); width: .1rem` |
| 5883 | pioneer-label-div | `.pioneer-label-div.distance-between-pos > span.icon:after` | `color: var(--distance-tool-color); content: "\2732"; font-size: .3rem; line-height: 1; position: absolute; transform: translate(-25%, -15%) scale(1.2)` |
| 5891 | pioneer-label-div | `.pioneer-label-div.distance-between-pos > span.icon:before` | `content: ""; height: 45px; left: 50%; position: absolute; top: 50%; transform: translate(-50%, -50%); width: 45px` |
| 5900 | pioneer-label-div | `.pioneer-label-div.distance-between-pos > span.text` | `display: none` |
| 5903 | pioneer-label-div | `.pioneer-label-div.distance-between-pos.intersect > span.icon` | `filter: brightness(1.3); transform: translate(calc(var(--icon-offset-x, 0) - 50%), calc(var(--icon-offset-y, 0) - 50%)) scale(1.8)` |
| 5907 | pioneer-indicator | `.pioneer-indicator` | `opacity: .75` |
| 5909 | pioneer-indicator | `.pioneer-indicator › &.arrowLeft .left` | `margin-right: .25rem` |
| 5912 | pioneer-indicator | `.pioneer-indicator › &.arrowRight .right` | `margin-left: .25rem` |
| 5915 | pioneer-indicator | `.pioneer-indicator › &.arrowLeft .right, &.arrowRight .left` | `display: none` |
| 5920 | GLOBAL | `body, html` | `background: #000; margin: 0; padding: 0` |
| 5926 | GLOBAL | `body` | `overflow: hidden` |
| 5929 | semi | `body .semi, body .thin` | `letter-spacing: .02em` |
| 5933 | thin | `.thin` | `font-weight: 100` |
| 5936 | large | `.large` | `font-family: Metropolis, sans-serif; font-size: 36px; letter-spacing: 0; line-height: 120%` |
| 5942 | monospace | `.monospace` | `font-family: Inter, sans-serif; font-variant-numeric: tabular-nums; font-weight: 300; letter-spacing: -.03em; line-height: 1em` |
| 5949 | monospace | `.monospace.small, .monospace.tiny, .monospace.x-small` | `font-family: Inter, sans-serif` |
| 5954 | display | `.display.semi, h1.semi, h2.semi, h3.semi, h4.semi, h5.semi` | `font-weight: 600` |
| 5962 | GLOBAL | `button` | `background-color: transparent; border: 0; color: var(--white); font-family: Metropolis, sans-serif; font-size: inherit; font-weight: 300; letter-spacing: .02em; line-height: 150%; padding: 0` |
| 5973 | icon-close | `button.icon-close` | `opacity: .5; transform: scale(1.3); transition: opacity .15s ease-in-out` |
| 5978 | touch | `.touch button.icon-close` | `opacity: .8` |
| 5981 | icon-close | `button.icon-close:active, button.icon-close:hover` | `opacity: 1` |
| 5985 | GLOBAL | `a, a:active, a:visited` | `color: var(--white); pointer-events: all; text-decoration: none` |
| 5992 | breadcrumb | `.breadcrumb .home .text` | `display: inline-block; margin-top: 2px` |
| 5996 | c-menu-item | `.c-menu-item time.clock` | `bottom: calc(3em + 2vh); left: 11%; position: absolute; transition-duration: .5s; transition-property: left, width; transition-timing-function: var(--ease-out-bezier); width: 76%` |
| 6005 | c-menu-item | `.c-menu-item time.clock .display-container` | `color: var(--grayMed); display: flex; justify-content: flex-end; opacity: 1` |
| 6011 | c-menu-item | `.c-menu-item time.clock .display-container.hidden` | `display: flex; opacity: .1` |
| 6015 | c-menu-item | `.c-menu-item time.clock .display-container > div, .extended-controls time.clock .display-container > div` | `font-weight: 400; text-transform: uppercase` |
| 6020 | c-menu-item | `.c-menu-item time.clock .display-container .date` | `left: 0; position: absolute` |
| 6024 | c-menu-item | `.c-menu-item time.clock .display-container:before` | `backdrop-filter: blur(4px); background-color: var(--grayDarkAlpha); border-radius: 5px; color: var(--paused); content: var(--limit-message,""); left: 50%; letter-spacing: .04em; opacity: 0; padding: .4em .8em; pointer-events: none; position: absolute; text-transform: uppercase; top: -3.5em; transform: translateX(-50%); transition: opacity 1s ease-in; white-space: nowrap` |
| 6042 | c-menu-item | `.c-menu-item time.clock .display-container.limit:before` | `opacity: 1; transition: opacity 1ms ease-out` |
| 6046 | c-menu-item | `.c-menu-item time.clock .datetime-container` | `margin-left: 0` |
| 6049 | c-menu-item | `.c-menu-item time.clock .datetime-container > form` | `background-color: var(--black); font-size: 18px; margin: auto; position: relative; top: -1.3em; width: -moz-fit-content; width: fit-content` |
| 6058 | c-menu-item | `.c-menu-item time.clock .datetime-container > form:before` | `content: "Input custom time"; font-size: small; font-weight: 400; left: 50%; opacity: .5; position: absolute; text-transform: uppercase; top: -2em; transform: translateX(-50%); white-space: nowrap` |
| 6070 | c-menu-item | `.c-menu-item time.clock .datetime-container > form > input` | `padding: .3em .5em; text-align: center; text-transform: uppercase; width: -moz-fit-content; width: fit-content` |
| 6077 | extended-controls | `.extended-controls time.clock` | `grid-column: 1; justify-self: start` |
| 6081 | extended-controls | `.extended-controls.mobile-bottom-margin` | `margin-bottom: 110px` |
| 6085 | c-menu-item | `@media only screen and (max-width: 641px) and (orientation: portrait) › .c-menu-item time.clock .display-container div.date, .c-menu-item time.clock .display-container div.meridiem, .c-menu-item time.clock .display-container div.time` | `font-size: smaller` |
| 6092 | clock | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .clock .datetime-container .display-container` | `justify-content: start` |
| 6096 | clock-shortcut | `nav.clock-shortcut` | `align-self: flex-end; grid-column: 2; grid-row: -4; justify-self: flex-start; margin-bottom: var(--collapsible-bottom-margin); max-width: 5rem; transform: scale(1.2); transition: transform .6s var(--ease-out-bezier); z-index: 30` |
| 6107 | offset-right | `.offset-right nav.clock-shortcut` | `transform: translateX(calc(var(--offset-right, 0) + 100%)) scale(1.2); transition-delay: .2s; transition-duration: .8s` |
| 6113 | clock-shortcut | `@media only screen and (min-width: 961px) › nav.clock-shortcut` | `grid-row: -3` |
| 6118 | clock-shortcut | `@media only screen and (min-width: 1024px) and (max-height: 1366px) › nav.clock-shortcut` | `grid-column: 3` |
| 6123 | clock-shortcut | `@media only screen and (min-width: 1300px) › nav.clock-shortcut` | `grid-column: 2; justify-self: flex-end` |
| 6128 | search | `.search .mag-close, .search .search-close` | `display: none` |
| 6133 | search | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .search .bar` | `grid-template-areas: "search input close"; grid-template-columns: auto 1fr auto; width: auto` |
| 6138 | search | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .search .search-close-icon` | `display: block` |
| 6142 | GLOBAL | `:root` | `--offset-right: 12vw; --offset-up: 18vh` |
| 6146 | pioneer | `#pioneer:after` | `background-image: linear-gradient( to top, #000 var(--offset-up), transparent calc(var(--offset-up) + 25vh)); content: ""; inset: 0; opacity: 0; pointer-events: none; position: absolute; transition: opacity 2s var(--ease-out-bezier)` |
| 6159 | offset-right | `.offset-right > #pioneer:after, .offset-up > #pioneer:after` | `opacity: 1; transition-duration: .8s` |
| 6164 | main-viewport | `#main-viewport` | `bottom: 0; left: 0; transition-duration: .5s; transition-property: left, bottom; transition-timing-function: var(--ease-out-bezier)` |
| 6171 | offset-right | `.offset-right #main-viewport` | `left: var(--offset-right); transition-delay: .2s; transition-duration: .8s` |
| 6176 | offset-right | `.offset-right .load-icon` | `transform: translate(calc(var(--offset-right, 0) - 50%), -50%); transition-delay: .2s; transition-duration: .8s` |
| 6181 | offset-up | `.offset-up #main-viewport` | `bottom: var(--offset-up); transition-delay: .2s; transition-duration: .8s` |
| 6186 | offset-up | `.offset-up .load-icon` | `transform: translate(-50%, calc(-50% - var(--offset-up, 0))); transition-delay: .2s; transition-duration: .8s` |
| 6192 | pioneer | `@media only screen and (min-width: 1025px) › #pioneer:after` | `background-image: linear-gradient( to right, #000 var(--offset-right), transparent calc(var(--offset-right) + 15vw))` |
| 6200 | dynamic-ui | `#dynamic-ui` | `--bgDark: rgba(0,0,0,.85); --bgMed: rgba(0,0,0,.75); z-index: 1` |
| 6205 | dynamic-ui | `#dynamic-ui > header:before` | `background-image: linear-gradient( to bottom, var(--bgDark) 70%, var(--bgMed) 100%); content: ""; grid-area: head; inset: 0 -20px -2vh -20px; -webkit-mask-image: linear-gradient( 180deg, #fff 0, transparent); mask-image: linear-gradient( 180deg, #fff 0, transparent); position: absolute; z-index: -1` |
| 6227 | dynamic-ui | `#dynamic-ui:after` | `background-image: linear-gradient( to top, var(--bgDark) 70%, var(--bgMed) 100%); bottom: 0; content: ""; height: calc(var(--btm-grad-height) + 2vh); left: 0; -webkit-mask-image: linear-gradient( 0deg, #fff 0, transparent); mask-image: linear-gradient( 0deg, #fff 0, transparent); position: absolute; transform: scaleY(var(--btm-grad-scale)); transform-origin: bottom; transition: transform .5s var(--ease-out-bezier); width: 100%; z-index: -1` |
| 6255 | mobile-expand-button | `@media only screen and (min-width: 320px) › .mobile-expand-button` | `justify-self: end; margin-bottom: -10px; order: 2` |
| 6262 | mobile-expand-button | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mobile-expand-button` | `display: none` |
| 6266 | mega-menu | `.mega-menu` | `--headerHeight: 75px; --mobileHeaderHeight: 70px; --mobileAZHeight: 70px` |
| 6271 | mega-menu | `.mega-menu .menu-btn` | `align-items: center; border-radius: .375rem; color: var(--grayLight); display: flex; font-size: 1.1rem; font-weight: 500; gap: .25rem; height: 2.5rem` |
| 6281 | mega-menu | `.mega-menu .menu-btn > span.icon-menu` | `transform: scale(1.3, .9) translateX(.3rem); z-index: -1` |
| 6285 | mega-menu | `.mega-menu .menu-btn:hover` | `filter: brightness(1.2)` |
| 6288 | mega-menu | `.mega-menu .overlay-bg` | `background: var(--black); display: none; height: var(--vh); left: 0; opacity: .6; position: fixed; top: 0; width: 100vw; z-index: 10` |
| 6299 | mega-menu | `.mega-menu .overlay-bg.active` | `display: block` |
| 6302 | mega-menu | `.mega-menu .overlay-bg.hidden` | `display: none` |
| 6305 | mega-menu | `.mega-menu .menu-container` | `background: var(--menuGradient); left: 0; margin: 0; position: absolute; top: 0; transition-duration: .8s; transition-property: opacity, visibility; transition-timing-function: var(--ease-out-bezier); width: 100vw; z-index: 51` |
| 6317 | mega-menu | `.mega-menu .menu-container.active` | `pointer-events: all; visibility: visible` |
| 6321 | mega-menu | `.mega-menu .menu-container.hidden` | `display: block; opacity: 0; transition-duration: .4s; visibility: hidden` |
| 6327 | mega-menu | `.mega-menu .menu-container.hidden .content-wrapper` | `-webkit-mask-size: 100% 0; mask-size: 100% 0; transition-duration: .2s` |
| 6332 | mega-menu | `.mega-menu .menu-header` | `border-bottom: 1px solid var(--grayDark); justify-items: center; padding: 0 20px` |
| 6337 | mega-menu | `.mega-menu .branding, .mega-menu .menu-header` | `align-items: center; display: grid; grid-auto-flow: column` |
| 6343 | mega-menu | `.mega-menu .branding` | `justify-self: start` |
| 6346 | mega-menu | `.mega-menu .branding .text` | `text-transform: uppercase` |
| 6349 | mega-menu | `.mega-menu .close-button` | `justify-self: end; transform: scale(1.5)` |
| 6353 | mega-menu | `.mega-menu .content-wrapper` | `-webkit-mask-image: linear-gradient( 180deg, #fff 50%, transparent); mask-image: linear-gradient( 180deg, #fff 50%, transparent); -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: 100% 200%; mask-size: 100% 200%; transition: -webkit-mask-size 1.2s .1s var(--ease-out-bezier); transition: mask-size 1.2s .1s var(--ease-out-bezier); transition: mask-size 1.2s .1s var(--ease-out-bezier), -webkit-mask-size 1.2s .1s var(--ease-out-bezier)` |
| 6372 | mega-menu | `.mega-menu .menu-content` | `display: grid` |
| 6375 | mega-menu | `.mega-menu .menu-content .list-container` | `align-items: stretch; display: grid` |
| 6379 | mega-menu | `.mega-menu .menu-content .entry-label` | `display: block; padding: 8px 0` |
| 6383 | mega-menu | `.mega-menu .entry-label .icon` | `justify-self: center; margin-left: .5em; vertical-align: middle` |
| 6388 | mega-menu | `.mega-menu .az-link-container` | `align-items: flex-start; border-top: 1px solid var(--grayDark); display: flex; opacity: .7; padding: 1em 0; transition: opacity .1s ease-in-out` |
| 6396 | mega-menu | `.mega-menu .az-link-container > button` | `padding: 0; text-align: left` |
| 6400 | mega-menu | `.mega-menu .a-to-z .block .title` | `text-transform: uppercase` |
| 6403 | mega-menu | `.mega-menu .menu-content .block` | `display: grid` |
| 6406 | mega-menu | `.mega-menu .list .entry-label` | `cursor: pointer` |
| 6409 | mega-menu | `.mega-menu .link-container` | `align-items: center; display: flex` |
| 6413 | mega-menu | `.mega-menu .menu-content .entry-image` | `display: inline; max-height: 48px; max-width: 48px` |
| 6419 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .menu-container` | `border-bottom: none; height: var(--vh); overflow: hidden` |
| 6424 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .content-wrapper` | `height: calc(var(--vh) - var(--mobileHeaderHeight))` |
| 6427 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .menu-header` | `height: var(--mobileHeaderHeight)` |
| 6430 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .menu-header .app-title, .mega-menu .menu-header .branding .text` | `display: none` |
| 6434 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .menu-content` | `grid-auto-flow: row; margin: 0 20px; padding: 1.5em 0 50px 1em` |
| 6439 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .block .expand` | `justify-self: end` |
| 6442 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .menu-content .title` | `font-size: 16px; padding: 0; text-align: left` |
| 6447 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .menu-content .block` | `align-items: center; border-bottom: 1px solid var(--grayDark); font-size: 18px; grid-auto-flow: column; justify-items: stretch; padding: 20px 0; pointer-events: all` |
| 6456 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .main-menu` | `height: calc(var(--vh) - var(--mobileHeaderHeight)); pointer-events: all` |
| 6459 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .main-menu › & .search` | `width: 100%` |
| 6463 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .list .list-container` | `height: 100%` |
| 6466 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .list .list-container .entry-container` | `height: calc(var(--vh) - var(--mobileHeaderHeight) - var(--mobileAZHeight)); margin: 0 20px; overflow: auto; padding-top: 1.5em; pointer-events: all` |
| 6473 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .list .entry-label` | `font-size: 16px; padding: 1em` |
| 6477 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .list .az-link-container .expand` | `justify-self: end` |
| 6480 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .list .az-link-container` | `align-items: unset; height: var(--mobileAZHeight); margin: 0 20px; opacity: 1; padding: 8px 0` |
| 6487 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .list .az-link-container > button` | `background-color: var(--grayDark); border-radius: 5px; font-size: 16px; opacity: 1; padding: 0; text-align: center; text-decoration: none; width: 100%` |
| 6497 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .a-to-z .container` | `height: 100%; pointer-events: all` |
| 6501 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .a-to-z .menu-content .title` | `display: none` |
| 6504 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .a-to-z .menu-content .block` | `border: 0; justify-content: stretch; padding: 0` |
| 6509 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .a-to-z .menu-content .entry-label` | `align-items: center; display: flex; font-size: 16px; padding: 1em 0; text-align: left; width: 100%` |
| 6517 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .a-to-z .menu-content .entry-label.with-thumb` | `padding: 0` |
| 6520 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .menu-content .entry-image-label` | `padding: 1em` |
| 6523 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .entry-image, .mega-menu .entry-image-all` | `transform: scale(.7)` |
| 6527 | mega-menu | `@media only screen and (min-width: 320px) › .mega-menu .entry-image-all` | `margin-left: -.86em` |
| 6532 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .main-menu` | `display: grid; height: 100%` |
| 6536 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .menu-btn` | `padding-right: .4rem` |
| 6539 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .menu-btn > span.icon-menu` | `filter: brightness(.9); transform: scale(1.1, .8) translateY(-.05rem)` |
| 6543 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .content-wrapper` | `height: 505px` |
| 6546 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .a-to-z .content-wrapper` | `height: calc(var(--vh) - var(--headerHeight))` |
| 6549 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .menu-container` | `border-bottom: 1px solid var(--grayDark); height: auto; overflow: hidden` |
| 6554 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .menu-header` | `height: var(--headerHeight)` |
| 6557 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .menu-header .app-title, .mega-menu .menu-header .branding .text` | `display: block; letter-spacing: .04em; margin-left: .5em` |
| 6563 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .menu-header .app-title, .mega-menu .menu-header .icon-nasa-logo` | `opacity: .7; transition: opacity .1s ease-in-out` |
| 6568 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .menu-content` | `grid-auto-flow: column; margin: 0; padding: 1% 3%` |
| 6573 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .menu-content .title` | `align-items: flex-start; display: flex; font-size: 14px` |
| 6578 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .block .expand` | `display: none` |
| 6581 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .menu-content .block:first-child` | `border-right: 1px solid var(--grayDark)` |
| 6584 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .menu-content .block:last-child` | `border-left: 1px solid var(--grayDark)` |
| 6587 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .menu-content .block` | `align-items: normal; border-bottom: none; gap: .5em; grid-auto-flow: row; grid-template-rows: 3em 1fr; justify-items: normal; padding: .5em clamp(.5em, 1.3vw, 3em) 0 clamp(.5em, 2vw, 3em)` |
| 6596 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .menu-content .list-container` | `grid-template-rows: 1fr 4em` |
| 6599 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .list .list-container .entry-container` | `height: auto` |
| 6602 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .link-container` | `gap: min(2vw, 1em); opacity: .7; transition: opacity .1s ease-in-out` |
| 6607 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .a-to-z .container` | `height: auto` |
| 6610 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .a-to-z .menu-content` | `padding-bottom: 0` |
| 6613 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .a-to-z .menu-content .title` | `display: block` |
| 6616 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .a-to-z .menu-content .block` | `border-right: 1px solid var(--grayDark); justify-content: normal; padding: 30px 20px 50px 30px` |
| 6621 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .a-to-z .menu-content .block:first-child` | `border-right: 1px solid var(--grayDark)` |
| 6624 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .a-to-z .menu-content .block:last-child` | `border: 0` |
| 6627 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .a-to-z .menu-content .entry-label` | `display: block; opacity: .7; padding: 8px 0; transition: opacity .1s ease-in-out` |
| 6633 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .a-to-z .menu-content .list-container` | `align-content: start` |
| 6636 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .a-to-z .list-container` | `grid-template-rows: unset` |
| 6639 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .menu-content .entry-image` | `display: inherit; margin: .5em 0; transform: scale(1)` |
| 6644 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .menu-content .entry-image-all` | `display: none` |
| 6647 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .menu-content .entry-image-label` | `padding: 0` |
| 6650 | mega-menu | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .mega-menu .a-to-z .menu-content .entry-label.with-thumb` | `padding: 1em 0` |
| 6655 | mega-menu | `@media (pointer: fine) and (hover: hover) › .mega-menu .a-to-z .menu-content .entry-label:hover, .mega-menu .branding:hover .app-title, .mega-menu .branding:hover .icon-nasa-logo, .mega-menu .link-container:hover` | `opacity: 1` |
| 6661 | mega-menu | `@media (pointer: fine) and (hover: hover) › .mega-menu .az-link-container:hover` | `opacity: 1; text-decoration: underline` |
| 6666 | content-block | `.content-block` | `opacity: 1; padding: .5em 1.25em; transition: opacity .5s var(--ease-out-bezier), visibility .5s var(--ease-out-bezier); visibility: visible` |
| 6671 | content-block | `.content-block › &:not(:last-child)` | `border-bottom: 1px solid #ffffff30` |
| 6674 | content-block | `.content-block › &.hidden` | `display: unset; opacity: 0; transition-duration: .25s; visibility: hidden` |
| 6681 | hover-background | `.hover-background:hover` | `background-color: hsla(0, 0%, 100%, .07); transition: background-color .5s` |
| 6685 | GLOBAL | `ul` | `list-style-type: none; margin: 0; padding-left: 0` |
| 6689 | GLOBAL | `ul › li` | `display: flex` |
| 6691 | radio-option | `ul › li › &.radio-option` | `cursor: pointer; position: relative; -webkit-user-select: none; -moz-user-select: none; user-select: none` |
| 6698 | checkbox-option | `ul › li › &.checkbox-option, &.radio-option` | `align-items: center; display: grid; gap: 0 12px; grid-template-columns: 20px auto; justify-content: start; list-style: none` |
| 6706 | checkbox-option | `ul › li › &.checkbox-option, &.radio-option › input` | `cursor: pointer; height: 100%; margin: 0; opacity: 0; top: 0; width: 100%` |
| 6714 | checkbox-option | `ul › li › &.checkbox-option, &.radio-option › .radio-icon, input` | `left: 0; position: absolute` |
| 6719 | checkbox-option | `ul › li › &.checkbox-option, &.radio-option › .radio-icon` | `border-radius: 100px; height: 15px; pointer-events: none; top: 50%; transform: translateY(-50%) scale(1.333); width: 15px` |
| 6727 | checkbox-option | `ul › li › &.checkbox-option, &.radio-option › label` | `grid-column: 2; grid-row: 1` |
| 6731 | checkbox-option | `ul › li › &.checkbox-option, &.radio-option › .radio-icon:after` | `background: var(--white); border-radius: 100px; content: ""; display: none; height: 7px; left: 4px; position: absolute; top: 4px; width: 7px` |
| 6742 | checkbox-option | `ul › li › &.checkbox-option, &.radio-option › .radio-button:not(:checked) ~ .radio-icon` | `background-color: var(--grayDark)` |
| 6745 | checkbox-option | `ul › li › &.checkbox-option, &.radio-option › .radio-button:checked ~ .radio-icon:after` | `display: block` |
| 6748 | checkbox-option | `ul › li › &.checkbox-option, &.radio-option › &:hover .radio-button:not(:checked) ~ .radio-icon` | `background-color: var(--gray)` |
| 6754 | no-side-padding | `.no-side-padding` | `padding: .5em 0` |
| 6757 | shape | `.shape` | `display: inline-block; height: 1em; width: 1em` |
| 6761 | shape | `.shape › &.hexagon` | `clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)` |
| 6764 | shape | `.shape › &.circle` | `clip-path: circle(40%)` |
| 6767 | shape | `.shape › &.crescent` | `background-color: transparent; border-radius: 50%; box-shadow: inset 3px -2px 0 .5px #ffc53d` |
| 6772 | shape | `.shape › &.blue` | `background: var(--cta-blue)` |
| 6775 | shape | `.shape › &.yellow` | `background: #ffc53d` |
| 6778 | shape | `.shape › &.brown` | `background: var(--asteroid)` |
| 6781 | shape | `.shape › &.gray` | `background: gray` |
| 6785 | options-block | `.options-block` | `(嵌套包装)` |
| 6786 | options-block | `.options-block › .subtitle` | `color: var(--gray); line-height: 1.4; margin: 0; padding-bottom: .5em` |
| 6792 | options-block | `.options-block › ul` | `list-style-type: none; margin: 0; padding-left: 0` |
| 6796 | options-block | `.options-block › ul › li` | `(嵌套包装)` |
| 6797 | options-block | `.options-block › ul › li › &.radio-option` | `cursor: pointer; position: relative; -webkit-user-select: none; -moz-user-select: none; user-select: none` |
| 6804 | options-block | `.options-block › ul › li › &:not(:last-child)` | `margin-bottom: .5em` |
| 6807 | options-block | `.options-block › ul › li › &.checkbox-option, &.radio-option` | `align-items: center; display: grid; gap: 0 12px; grid-template-columns: 20px auto; justify-content: start; list-style: none` |
| 6815 | options-block | `.options-block › ul › li › &.checkbox-option, &.radio-option › &:hover` | `(嵌套包装)` |
| 6816 | options-block | `.options-block › ul › li › &.checkbox-option, &.radio-option › &:hover › .icon` | `background-color: var(--gray)` |
| 6820 | options-block | `.options-block › ul › li › &.checkbox-option, &.radio-option › input` | `cursor: pointer; height: 100%; left: 0; margin: 0; opacity: 0; position: absolute; top: 0; width: 100%` |
| 6830 | options-block | `.options-block › ul › li › &.checkbox-option, &.radio-option › &:not(.checked) > .icon` | `border: 1px solid #636363` |
| 6833 | options-block | `.options-block › ul › li › &.checkbox-option, &.radio-option › &.checked` | `(嵌套包装)` |
| 6834 | options-block | `.options-block › ul › li › &.checkbox-option, &.radio-option › &.checked › .icon` | `background-color: var(--cta-blue)` |
| 6838 | options-block | `.options-block › ul › li › &.checkbox-option, &.radio-option › .radio-icon` | `background-color: var(--cta-blue); border: 1px solid #636363; border-radius: 100px; height: 15px; left: 0; pointer-events: none; position: absolute; top: 50%; transform: translateY(-50%) scale(1.333); width: 15px` |
| 6850 | options-block | `.options-block › ul › li › &.checkbox-option, &.radio-option › label` | `grid-column: 2; grid-row: 1` |
| 6854 | options-block | `.options-block › ul › li › &.checkbox-option, &.radio-option › .radio-icon:after` | `background: var(--white); border-radius: 100px; content: ""; display: none; height: 7px; left: 3px; position: absolute; top: 3px; width: 7px` |
| 6865 | options-block | `.options-block › ul › li › &.checkbox-option, &.radio-option › .radio-button:not(:checked) ~ .radio-icon` | `background-color: var(--grayDark)` |
| 6868 | options-block | `.options-block › ul › li › &.checkbox-option, &.radio-option › .radio-button:checked ~ .radio-icon:after` | `display: block` |
| 6871 | options-block | `.options-block › ul › li › &.checkbox-option, &.radio-option › &:hover .radio-button:not(:checked) ~ .radio-icon` | `background-color: var(--gray)` |
| 6878 | story-block | `.story-block .list, .story-block.content-block` | `padding: 0` |
| 6882 | story-block | `.story-block ul` | `(嵌套包装)` |
| 6883 | story-block | `.story-block ul › li` | `display: block` |
| 6887 | story-block | `.story-block .story-container` | `align-items: center; background: var(--grayDarkAlpha); border-radius: 3px; display: grid; gap: 5px 10px; grid-template-columns: minmax(55%, auto) minmax(40px, 100px); grid-template-rows: auto auto; margin: 10px 0; padding: 20px 20px 20px 25px; position: relative; word-break: break-word` |
| 6900 | story-block | `.story-block .story-title` | `align-self: end; grid-column: 1; grid-row: 1; z-index: 10` |
| 6906 | story-block | `.story-block .story-title > h2` | `font-size: 29px; font-weight: 300; line-height: 95%; min-width: 185px` |
| 6912 | story-block | `.story-block .story-subtitle` | `align-self: start; grid-column: 1; grid-row: 2; letter-spacing: .6em; min-width: 185px; text-transform: uppercase; z-index: 10` |
| 6921 | story-block | `.story-block .story-icon` | `align-self: center; grid-column: 2; grid-row: span 2; justify-self: center; z-index: 0` |
| 6928 | story-block | `.story-block .story-icon-image` | `float: right; max-height: 100%; max-width: 200%; z-index: 0` |
| 6934 | story-block | `.story-block .story-container .icon-external` | `opacity: .4; position: absolute; right: .5em; top: .5em` |
| 6941 | related-block | `@media (pointer: fine) and (hover: hover) › .related-block .item:hover` | `background: var(--grayAlpha); color: var(--white)` |
| 6945 | story-block | `@media (pointer: fine) and (hover: hover) › .story-block .story-container:hover` | `background: var(--horizontalHighlight)` |
| 6948 | story-block | `@media (pointer: fine) and (hover: hover) › .story-block .story-container:hover .icon-external` | `opacity: 1` |
| 6953 | story-block | `@media only screen and (min-width: 320px) and (orientation: landscape) › .story-block .story-container` | `grid-template-columns: minmax(55%, auto) minmax(40px, 80px)` |
| 6958 | story-block | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .story-block .story-container` | `grid-template-columns: minmax(55%, auto) minmax(40px, 100px)` |
| 6963 | story-block | `@media only screen and (min-width: 1025px) and (max-width: 1300px) and (min-height: 600px) › .story-block .story-icon` | `filter: brightness(.5)` |
| 6967 | events-block | `.events-block` | `align-items: center; display: flex; flex-direction: column; gap: 1.5em; justify-content: center; padding: 1em .75em 2em` |
| 6974 | events-block | `.events-block › #events-view-container` | `display: block; height: 100%; transition: display 1s ease-in; width: 100%` |
| 6980 | events-block | `.events-block › .title-toggle-block` | `align-items: center; display: flex; gap: 1em; height: 2em` |
| 6985 | events-block | `.events-block › .title-toggle-block › & .num-events-label` | `opacity: .5` |
| 6989 | events-block | `.events-block › & #toggle-container` | `background-color: #282828; border-radius: 2em; display: flex; gap: 1.5em; height: 1.5em; position: relative; transition: display .25s ease-in; width: 12em` |
| 6998 | events-block | `.events-block › & #toggle-container › &.hide` | `display: none` |
| 7001 | events-block | `.events-block › & #toggle-container › .toggle-slider` | `background-color: #cacaca; border-radius: 1em; bottom: 0; content: ""; height: 100%; left: 0; position: absolute; right: 0; top: 0; transition: .25s; width: 6em` |
| 7014 | events-block | `.events-block › & #toggle-container › & .tab` | `color: #cacaca; display: flex; font-size: .85em; place-items: center; z-index: 5` |
| 7020 | events-block | `.events-block › & #toggle-container › & .tab › & .toggle-icon` | `background-repeat: no-repeat; filter: invert(20%)` |
| 7024 | events-block | `.events-block › & #toggle-container › & .tab › &.selected` | `color: #000` |
| 7026 | events-block | `.events-block › & #toggle-container › & .tab › &.selected › & .toggle-icon` | `filter: invert(100%)` |
| 7030 | events-block | `.events-block › & #toggle-container › & .tab › &.selected + .toggle-slider` | `transform: translateX(6em)` |
| 7035 | events-block | `.events-block › & .intro-label` | `color: #cacaca; font-size: .85em` |
| 7038 | events-block | `.events-block › & .intro-label › &.invisible` | `opacity: 0` |
| 7042 | events-block | `.events-block › .events-timeline` | `padding-bottom: .75em` |
| 7045 | events-block | `.events-block › .table-container` | `border: 1px solid hsla(0, 0%, 100%, .17); border-top: none; display: block; max-height: 13em; overflow-y: auto; scrollbar-color: hsla(0, 0%, 100%, .17) #282828; scrollbar-width: thin; transition: display .25s ease-in 2s; width: 100%` |
| 7055 | events-block | `.events-block › .table-container › &.hide` | `display: none` |
| 7058 | events-block | `.events-block › .table-container › & table` | `border-collapse: collapse; font-size: .9em; height: 100%; table-layout: fixed; width: 100%` |
| 7064 | events-block | `.events-block › .table-container › & table › & thead` | `background-color: #282828; height: 3em; position: sticky; top: 0` |
| 7069 | events-block | `.events-block › .table-container › & table › & thead › &:after` | `background-color: #282828; content: ""; height: 3em; left: 0; position: absolute; top: -2px; width: 100%; z-index: -1` |
| 7079 | events-block | `.events-block › .table-container › & table › & thead › & th` | `padding-left: .5em; text-align: left` |
| 7083 | events-block | `.events-block › .table-container › & table › & thead › & th:first-child` | `width: 40%` |
| 7086 | events-block | `.events-block › .table-container › & table › & thead › & th:nth-child(2)` | `width: 20%` |
| 7089 | events-block | `.events-block › .table-container › & table › & thead › & th:nth-child(3)` | `width: 40%` |
| 7092 | events-block | `.events-block › .table-container › & table › & thead › & .sort-triangle` | `border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid; display: inline-block; margin-left: .25em; transition: transform .1s ease-in .1s` |
| 7099 | events-block | `.events-block › .table-container › & table › & thead › & .sort-triangle › &.rotated` | `top: 1.2em; transform: rotate(180deg)` |
| 7105 | events-block | `.events-block › .table-container › & table › & .event-row` | `(嵌套包装)` |
| 7106 | events-block | `.events-block › .table-container › & table › & .event-row › &:hover` | `background-color: #fcb5000f; color: #ffcb47` |
| 7110 | events-block | `.events-block › .table-container › & table › & .event-row › &:first-child` | `(嵌套包装)` |
| 7111 | events-block | `.events-block › .table-container › & table › & .event-row › &:first-child › & td` | `padding-top: 2em` |
| 7116 | events-block | `.events-block › .table-container › & table › .highlight` | `background-color: #fcb5000f; color: #ffcb47` |
| 7120 | events-block | `.events-block › .table-container › & table › & td` | `word-wrap: break-word; border-bottom: 1px solid hsla(0, 0%, 100%, .17); font-size: .9em; line-height: 1.65em; padding: 1em` |
| 7129 | events-block | `.events-block › .hide` | `display: none` |
| 7133 | loading-bar | `.loading-bar.loading` | `background: hsla(0, 0%, 100%, .5); border-radius: 4px; height: 4px; overflow: hidden; width: 100%` |
| 7139 | loading-bar | `.loading-bar.loading › &:after` | `animation: load 2s cubic-bezier(.4, 0, .2, 1) infinite; background: #fff; content: ""; display: block; height: 4px; width: 100%` |
| 7149 | KEYFRAME | `@keyframes load › 0%` | `margin-left: 0; margin-right: 100%` |
| 7153 | KEYFRAME | `@keyframes load › 50%` | `margin-left: 25%; margin-right: 0` |
| 7157 | KEYFRAME | `@keyframes load › to` | `margin-left: 100%; margin-right: 0` |
| 7163 | events-block | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .events-block` | `gap: 2em` |
| 7165 | events-block | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .events-block › & #toggle-container` | `height: 2em` |
| 7170 | overview | `.overview` | `display: flex` |
| 7172 | overview | `.overview › & .back-button` | `align-items: center; background-color: #282828; display: flex; margin-right: .6em; width: 24px` |
| 7178 | overview | `.overview › & .back-button › & .icon` | `height: 16px; margin-left: 3px; transform: rotate(-90deg); width: 16px` |
| 7184 | overview | `.overview › & .back-button › &:hover` | `background-color: #646464` |
| 7188 | overview | `.overview › & .overview-content-container` | `display: flex; flex-direction: column; gap: .5em; margin-top: 1em; padding-bottom: .5em; width: 90%` |
| 7195 | overview | `.overview › & .overview-content-container › & .title` | `font-size: 1.4rem` |
| 7198 | overview | `.overview › & .overview-content-container › & .subtitle-container` | `align-items: center; display: flex; font-size: .85em; gap: .5em` |
| 7203 | overview | `.overview › & .overview-content-container › & .subtitle-container › & .subtitle` | `align-items: center; display: flex; gap: .5em` |
| 7209 | overview | `.overview › & .overview-content-container › & .event-title:not(.hidden)` | `align-items: center; display: flex` |
| 7214 | overview | `.overview › & .hidden` | `display: none` |
| 7217 | overview | `.overview › &:has(.back-button:not(.hidden))` | `padding: 0` |
| 7222 | overview | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .overview` | `(嵌套包装)` |
| 7223 | overview | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .overview › & .overview-content-container` | `width: 80%` |
| 7225 | overview | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .overview › & .overview-content-container › & .long-title` | `margin-top: .5em` |
| 7231 | description | `.description` | `display: flex; flex-direction: column; gap: .5em; padding-bottom: 1em` |
| 7236 | description | `.description › & .copy` | `font-size: .9em; opacity: .66; -webkit-user-select: text; -moz-user-select: text; user-select: text` |
| 7243 | description | `.description › &.expanded` | `background-color: var(--panelBg); top: var(--overviewBlockHeight)` |
| 7247 | description | `.description › & .copy-container` | `display: flex; flex-direction: column; height: 100%` |
| 7252 | description | `.description › & .more-container` | `(嵌套包装)` |
| 7253 | description | `.description › & .more-container › &.expanded` | `height: 100%; padding-top: .5em` |
| 7258 | description | `.description › & .more-button` | `background-color: #ffffff12; border-radius: .2em; min-height: 2em; z-index: 10` |
| 7263 | description | `.description › & .more-button › &:hover` | `background-color: var(--grayAlpha)` |
| 7269 | description | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .description` | `(嵌套包装)` |
| 7270 | description | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .description › & .copy-container` | `height: 100%` |
| 7273 | description | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .description › & .copy` | `(嵌套包装)` |
| 7274 | description | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .description › & .copy › &:not(.more)` | `padding: .5em` |
| 7277 | description | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .description › & .copy › &.more` | `padding: 0 .5em 1em` |
| 7284 | description | `@media only screen and (min-width: 320px) and (orientation: landscape) › .description` | `margin-bottom: 0` |
| 7289 | description | `@media only screen and (min-width: 641px) › .description` | `(嵌套包装)` |
| 7290 | description | `@media only screen and (min-width: 641px) › .description › &.expanded` | `margin-top: 4.5em` |
| 7296 | description | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .description` | `(嵌套包装)` |
| 7297 | description | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .description › &.expanded` | `margin-top: .005em` |
| 7302 | toolbox-block | `.toolbox-block` | `--tooltip-top-margin: 0; border-bottom: 1px solid (255, 255, 255/17%); display: grid; gap: 16px; grid-template-columns: max-content auto max-content; list-style: none; padding-bottom: 1em; padding-top: 1em; position: relative; transition: all .5s` |
| 7313 | toolbox-block | `.toolbox-block › & .clickable-div` | `height: 100%; position: absolute; width: 100%; z-index: 0` |
| 7319 | toolbox-block | `.toolbox-block › & .toolbox-description` | `align-items: center; display: flex; gap: .5em; width: -moz-max-content; width: max-content` |
| 7325 | toolbox-block | `.toolbox-block › & .toolbox-description › .tooltop-icon-container` | `opacity: .5; z-index: 5` |
| 7328 | toolbox-block | `.toolbox-block › & .toolbox-description › .tooltop-icon-container › &:hover` | `opacity: 1; transition: opacity .5s` |
| 7334 | toolbox-block | `.toolbox-block › & .caret-right` | `border-radius: 3px` |
| 7337 | toolbox-block | `.toolbox-block › & .icon` | `display: flex; margin: auto` |
| 7341 | toolbox-block | `.toolbox-block › & .shape.crescent` | `box-shadow: inset 5px -2px 0 .5px var(--white); height: 24px; width: 24px` |
| 7346 | toolbox-block | `.toolbox-block › .tooltip-popup` | `align-items: center; background-color: rgba(0, 0, 0, .75); bottom: var(--content-bottom-margin); color: #d3d3d3; display: flex; flex-direction: column; font-size: 1em; justify-content: center; left: 0; position: fixed; text-align: center; top: var(--tooltip-top-margin); width: 100%; z-index: var(--overlay-z-index)` |
| 7361 | toolbox-block | `.toolbox-block › .tooltip-popup › .tooltip-text` | `backdrop-filter: blur(.5rem); background-color: var(--panelBg); border-radius: 10px; margin: 0 3em; padding: 2em; position: absolute` |
| 7369 | toolbox-block | `.toolbox-block › .tooltip-popup › .tooltip-close-btn` | `height: 30px; position: absolute; right: 0; top: 0; width: 30px` |
| 7377 | toolbox-block | `.toolbox-block › & .hidden` | `display: none` |
| 7381 | camera-views | `.camera-views` | `(嵌套包装)` |
| 7382 | camera-views | `.camera-views › > ul` | `display: flex; flex-wrap: wrap; gap: 1rem; padding: 0` |
| 7387 | camera-views | `.camera-views › > ul › li` | `align-items: center; display: flex; filter: brightness(.9); flex-direction: column; gap: .5em; list-style: none; position: relative; transition: filter .2s` |
| 7396 | camera-views | `.camera-views › > ul › li › div.icon` | `background-color: #282828; background-position: 50%; background-repeat: no-repeat; background-size: 60%; border: .25em solid transparent; border-radius: .5em; height: 3.6em; transition: background-color .2s, background-size .2s, border .2s; width: 3.6em` |
| 7409 | camera-views | `.camera-views › > ul › li › div.icon › &.nearby` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/cam_nearby.svg)` |
| 7412 | camera-views | `.camera-views › > ul › li › div.icon › &.system` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/cam_system.svg)` |
| 7415 | camera-views | `.camera-views › > ul › li › div.icon › &.follow` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/cam_follow.svg)` |
| 7418 | camera-views | `.camera-views › > ul › li › div.icon › &.trajectory` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/trajectory.svg)` |
| 7422 | camera-views | `.camera-views › > ul › li › &:hover` | `filter: brightness(1.1)` |
| 7424 | camera-views | `.camera-views › > ul › li › &:hover › div.icon` | `background-size: 65%` |
| 7428 | camera-views | `.camera-views › > ul › li › &.selected` | `filter: brightness(1.1)` |
| 7430 | camera-views | `.camera-views › > ul › li › &.selected › div.icon` | `background-color: rgba(35, 80, 255, .18); background-size: 65%; border: .25em solid #3e63dd` |
| 7435 | camera-views | `.camera-views › > ul › li › &.selected › label` | `color: var(--grayLight)` |
| 7439 | camera-views | `.camera-views › > ul › li › input` | `cursor: pointer; height: 100%; left: 0; margin: 0; opacity: 0; position: absolute; top: 0; width: 100%` |
| 7449 | camera-views | `.camera-views › > ul › li › label` | `color: var(--gray)` |
| 7454 | camera-views | `.camera-views › .camera-follow.active` | `justify-self: unset; padding: 12px 0` |
| 7458 | camera-views | `.camera-views › .trajectory-options` | `display: flex; flex-direction: column; gap: .25em; padding-top: 1em` |
| 7464 | camera-views | `.camera-views › .trajectory-exit-button` | `background-color: var(--grayDark); border-radius: .5em; color: #fff; padding: .25em` |
| 7469 | camera-views | `.camera-views › .trajectory-exit-button › &:hover` | `background-color: var(--cta-blue)` |
| 7473 | camera-views | `.camera-views › .mission-option-label` | `color: var(--grayLight); padding-left: .25em` |
| 7478 | option-container | `.option-container` | `margin-bottom: .5em` |
| 7480 | option-container | `.option-container › input` | `opacity: 0` |
| 7483 | option-container | `.option-container › &:not(.checked) > .icon` | `border: 1px solid #636363` |
| 7486 | option-container | `.option-container › &:hover .radio-button:not(:checked) ~ .radio-icon` | `background-color: var(--gray)` |
| 7489 | option-container | `.option-container › & .checked ~ .radio-icon` | `background-color: var(--cta-blue)` |
| 7491 | option-container | `.option-container › & .checked ~ .radio-icon › &:after` | `background: var(--white); border-radius: 100px; content: ""; height: 7px; left: 3px; position: absolute; top: 3px; width: 7px` |
| 7502 | option-container | `.option-container › .radio-icon` | `border: 1px solid #636363; border-radius: 100px; height: 15px; left: 1.5em; margin-top: .75em; pointer-events: none; position: absolute; transform: translateY(-50%) scale(1.333); width: 15px` |
| 7513 | option-container | `.option-container › label` | `cursor: pointer; margin-left: .5em` |
| 7518 | special-features | `.special-features li` | `align-items: center; display: grid; gap: 15px; grid-template-columns: auto max-content; justify-content: stretch; list-style: none` |
| 7526 | special-features | `.special-features li:last-child` | `border-bottom: 0` |
| 7529 | special-features | `.special-features li h5, .special-features li span` | `pointer-events: none` |
| 7533 | replay-block | `:has(+ #replay-block)` | `border-bottom: none` |
| 7536 | replay-block | `#replay-block` | `border-top: 1px solid #ffffff30; display: flex; flex-direction: column; font-size: 16px; gap: .5em; padding-top: 1em; text-transform: uppercase` |
| 7544 | replay-block | `#replay-block › & .icon` | `vertical-align: middle` |
| 7546 | replay-block | `#replay-block › & .icon › &.prev-icon` | `transform: rotate(180deg)` |
| 7550 | replay-block | `#replay-block › .date-container` | `display: grid; grid-template-columns: 2fr .5fr 2fr; justify-items: center` |
| 7554 | replay-block | `#replay-block › .date-container › .date` | `justify-self: end` |
| 7557 | replay-block | `#replay-block › .date-container › .clock` | `font-size: 16px; grid-column: 3; grid-row: 1; justify-self: start` |
| 7564 | replay-block | `#replay-block › input[type=range]` | `background: transparent; cursor: pointer; width: 100%` |
| 7569 | replay-block | `#replay-block › .button-container` | `display: grid; grid-template-columns: 2fr 1fr 2fr` |
| 7573 | replay-block | `#replay-block › & .event-button` | `align-items: center; border-radius: 3px; display: flex; gap: 1em; height: 40px; justify-content: center; margin-bottom: 5px; padding: 0 .5em` |
| 7582 | replay-block | `#replay-block › & .event-button › &.disable` | `opacity: .4; pointer-events: none` |
| 7587 | replay-block | `#replay-block › .hidden` | `display: none` |
| 7590 | replay-block | `#replay-block › .clock .datetime-container .display-container, .date` | `opacity: .6` |
| 7594 | replay-block | `#replay-block › .clock` | `align-self: center` |
| 7596 | replay-block | `#replay-block › .clock › & .time` | `margin: 0; padding: 0` |
| 7601 | replay-block | `#replay-block › .slider-input` | `pointer-events: all` |
| 7604 | replay-block | `#replay-block › nav.time-controls input.slider-input` | `-webkit-appearance: auto; -moz-appearance: auto; appearance: auto` |
| 7609 | replay-block | `#replay-block › .event-time-controls` | `(嵌套包装)` |
| 7610 | replay-block | `#replay-block › .event-time-controls › & .svg-parent` | `display: none` |
| 7614 | replay-block | `#replay-block › nav.time-controls .slider-container .knob` | `display: none` |
| 7617 | replay-block | `#replay-block › nav.time-controls input.slider-input::-webkit-slider-thumb` | `margin-bottom: 0; transform: none` |
| 7621 | replay-block | `#replay-block › nav.time-controls input.slider-input::-moz-range-thumb` | `transform: none` |
| 7624 | replay-block | `#replay-block › nav.time-controls input.slider-input::-ms-thumb` | `transform: none` |
| 7627 | replay-block | `#replay-block › & button:hover` | `background: var(--grayAlpha); color: #fff` |
| 7633 | replay-block | `@media only screen and (min-width: 1025px) and (min-height: 600px) › #replay-block` | `margin-top: auto` |
| 7638 | replay-block | `@media only screen and (min-width: 320px) and (max-width: 1025px) › #replay-block` | `border-top: none` |
| 7642 | options-block | `.options-block` | `(嵌套包装)` |
| 7643 | options-block | `.options-block › .checkbox-option` | `(嵌套包装)` |
| 7644 | options-block | `.options-block › .checkbox-option › &.checked .icon.fov-coverage` | `background-color: #7e3e9c; height: 21px; position: absolute; transform: translateX(-3.8px); width: 23px` |
| 7650 | options-block | `.options-block › .checkbox-option › &.checked .icon.fov-coverage › &:after` | `color: #fff; content: "AUTO"; font-size: 7.7px; font-weight: 700; position: absolute; transform: translate(.5px, -1.3px) scaleY(1.3)` |
| 7664 | texture-block | `.texture-block` | `padding-bottom: 1em` |
| 7666 | texture-block | `.texture-block › ul` | `(嵌套包装)` |
| 7667 | texture-block | `.texture-block › ul › li` | `cursor: pointer; display: flex; gap: 1em` |
| 7673 | texture-block | `.texture-block › .toggle` | `display: inline-block; height: 1.5em; position: relative; width: 2.75em` |
| 7678 | texture-block | `.texture-block › .toggle › input` | `display: none` |
| 7681 | texture-block | `.texture-block › .toggle › .slider` | `background-color: #282828; border: 1px solid #636363; cursor: pointer; right: 0` |
| 7687 | texture-block | `.texture-block › .toggle › .slider, .slider:before` | `border-radius: 1em; bottom: 0; left: 0; position: absolute; top: 0` |
| 7695 | texture-block | `.texture-block › .toggle › .slider:before` | `background-color: #fff; content: ""; height: 1.4em; transition: .25s; width: 1.4em` |
| 7702 | texture-block | `.texture-block › .toggle › input:checked + .slider` | `background-color: var(--cta-blue)` |
| 7705 | texture-block | `.texture-block › .toggle › input:checked + .slider:before` | `transform: translateX(1.25em)` |
| 7710 | disabled | `.disabled` | `cursor: auto; opacity: .5; pointer-events: none` |
| 7715 | related-block | `.related-block .list` | `padding: 0` |
| 7718 | related-block | `.related-block .item` | `align-items: center; background: #ffffff12; border-radius: .5em; display: inline-flex; gap: .5em; margin: .5em; padding: .3em .5em; text-align: center` |
| 7729 | related-block | `@media (pointer: fine) and (hover: hover) › .related-block .item:hover` | `background: var(--grayAlpha); color: var(--white)` |
| 7734 | related-story-block | `.related-story-block .list` | `padding: 0` |
| 7737 | story-tag | `.story-tag` | `align-self: start; background-color: var(--cta-blue); border-radius: .25em; display: grid; grid-column: 1; grid-row: 1; padding: .15em .5em; place-items: center; width: -moz-fit-content; width: fit-content` |
| 7749 | related-story-block | `.related-story-block .story-container` | `background: var(--grayDarkAlpha); border-radius: 3px; margin-bottom: .5em; width: 100%` |
| 7754 | related-story-block | `.related-story-block .story-container › &:not(.full-size-icon)` | `align-items: center; display: grid; gap: 5px 10px; grid-template-columns: minmax(15%, auto) minmax(40px, 100px); grid-template-rows: auto auto auto; margin: 10px 0; padding: 20px 20px 20px 25px; position: relative; word-break: break-word` |
| 7766 | related-story-block | `.related-story-block .story-title` | `grid-column: 1; grid-row: 2; z-index: 10` |
| 7771 | related-story-block | `.related-story-block .story-title > h2` | `font-size: 29px; font-weight: 300; line-height: 95%; min-width: 185px` |
| 7777 | related-story-block | `.related-story-block .story-subtitle` | `align-self: start; grid-column: 1; grid-row: 3; letter-spacing: .6em; min-width: 185px; text-transform: uppercase; z-index: 10` |
| 7786 | related-story-block | `.related-story-block .story-icon` | `grid-column: 2; grid-row: span 3; height: 7em` |
| 7790 | related-story-block | `.related-story-block .story-icon › &:not(.icon-external) :not(.full-size-icon)` | `align-self: center; grid-column: 2; grid-row: span 2; justify-self: center; z-index: 0` |
| 7798 | related-story-block | `.related-story-block .story-icon-image` | `height: 100%; max-height: 100%; max-width: 200%; width: 100%` |
| 7804 | related-story-block | `.related-story-block .story-container .icon-external` | `opacity: .4; position: absolute; right: .5em; top: .5em` |
| 7811 | related-block | `@media (pointer: fine) and (hover: hover) › .related-block .item:hover` | `background: var(--grayAlpha); color: var(--white)` |
| 7815 | related-story-block | `@media (pointer: fine) and (hover: hover) › .related-story-block .story-container:hover` | `background: var(--horizontalHighlight)` |
| 7818 | related-story-block | `@media (pointer: fine) and (hover: hover) › .related-story-block .story-container:hover .icon-external` | `opacity: 1` |
| 7823 | related-story-block | `@media only screen and (min-width: 320px) and (orientation: landscape) › .related-story-block .story-container` | `grid-template-columns: minmax(55%, auto) minmax(40px, 80px)` |
| 7828 | related-story-block | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .related-story-block .story-container` | `grid-template-columns: minmax(15%, auto) minmax(40px, 100px)` |
| 7832 | GLOBAL | `:root` | `--content-bottom-margin: 10em; --custom-overview-border: none; --collapsible-bottom-margin: 1em` |
| 7837 | content-panel-container | `.content-panel-container` | `background-color: var(--panelBg); bottom: 0; display: flex; font-family: Inter, Metropolis, sans-serif; grid-area: main; left: 0; padding-left: 0; pointer-events: all; position: fixed; transition: transform height .8s cubic-bezier(.2, .75, 0, 1) .2s; width: 22rem; z-index: 40` |
| 7853 | content-panel-container | `.content-panel-container › &.overlay` | `z-index: 60` |
| 7856 | content-panel-container | `.content-panel-container › &.hidden` | `display: none` |
| 7858 | content-panel-container | `.content-panel-container › &.hidden › & .desktop-collapse-button` | `display: block; justify-self: start` |
| 7863 | content-panel-container | `.content-panel-container › & .desktop-collapse-button` | `justify-self: end; position: absolute; transition: right .8s var(--ease-out-bezier); z-index: 1` |
| 7868 | content-panel-container | `.content-panel-container › & .desktop-collapse-button › button` | `filter: brightness(1.1); line-height: 0; transition: filter .1s ease-out, transform .1s ease-out` |
| 7872 | content-panel-container | `.content-panel-container › & .desktop-collapse-button › button › &:hover` | `filter: brightness(1.4); transform: scale(1.1)` |
| 7877 | content-panel-container | `.content-panel-container › & .desktop-collapse-button › &.clickable` | `cursor: pointer; pointer-events: all` |
| 7882 | content-panel-container | `.content-panel-container › &.expanded` | `(嵌套包装)` |
| 7883 | content-panel-container | `.content-panel-container › &.expanded › .expand-btn-group` | `(嵌套包装)` |
| 7884 | content-panel-container | `.content-panel-container › &.expanded › .expand-btn-group › .expand-button` | `display: none` |
| 7889 | content-panel-container | `.content-panel-container › &.collapsed` | `transform: translateX(calc(-100% - 20px)); transition: transform .4s var(--ease-out-bezier)` |
| 7892 | content-panel-container | `.content-panel-container › &.collapsed › .overview` | `border-bottom: var(--custom-overview-border)` |
| 7895 | content-panel-container | `.content-panel-container › &.collapsed › .expand-btn-group` | `transform: translateX(calc(100% + 40px))` |
| 7897 | content-panel-container | `.content-panel-container › &.collapsed › .expand-btn-group › .collapse-button` | `display: none` |
| 7902 | content-panel-container | `.content-panel-container › &:before` | `content: ""; filter: blur(3rem); height: 4rem; left: -.5rem; -webkit-mask-composite: source-in, xor; mask-composite: intersect; -webkit-mask-image: linear-gradient( 180deg, transparent, #fff 40%, #fff 60%, transparent), linear-gradient( 90deg, transparent, #fff 5%, #fff 96%, transparent); mask-image: linear-gradient( 180deg, transparent, #fff 40%, #fff 60%, transparent), linear-gradient( 90deg, transparent, #fff 5%, #fff 96%, transparent); position: absolute; top: -2.5rem; width: calc(100% + 1rem)` |
| 7939 | content-panel-container | `.content-panel-container › .expand-btn-group` | `background: none; position: absolute; right: 0; top: -32px; transition: right .8s var(--ease-out-bezier)` |
| 7945 | content-panel-container | `.content-panel-container › .expand-btn-group › button` | `background: none; filter: brightness(1.1); height: 32px; line-height: 0; transition: filter .1s ease-out, transform .1s ease-out; width: 32px` |
| 7952 | content-panel-container | `.content-panel-container › .expand-btn-group › button › &:hover` | `filter: brightness(1.4); transform: scale(1.1)` |
| 7961 | content-panel-container | `.content-panel-container › .tab-group` | `backdrop-filter: blur(5px); border-top: 1px solid var(--tab-border-gray); transition: opacity .4s ease-in-out; width: 100%` |
| 7966 | content-panel-container | `.content-panel-container › .tab-group › nav` | `font-size: .875rem; padding-left: .95rem; position: absolute; transform: translateY(-100%)` |
| 7971 | content-panel-container | `.content-panel-container › .tab-group › nav › .sub-tab-container` | `display: none` |
| 7974 | content-panel-container | `.content-panel-container › .tab-group › nav › ul` | `align-items: center; display: flex; height: 100%; margin: 0; padding: 0` |
| 7980 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li` | `align-items: center; display: grid; gap: .3em; grid-template-columns: auto auto; height: 2.5em; justify-items: center; list-style: none; padding: .6em .8em .4em .6em; position: relative` |
| 7990 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › .bg` | `border-radius: 6px 6px 0 0; bottom: -1px; height: 0; left: 0; pointer-events: none; position: absolute; transition: height .2s var(--ease-out-bezier); width: 100%; z-index: -1` |
| 8001 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › &:hover` | `(嵌套包装)` |
| 8002 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › &:hover › div.icon` | `filter: brightness(1.25)` |
| 8005 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › &:hover › button` | `color: var(--grayLight)` |
| 8009 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › &.selected` | `(嵌套包装)` |
| 8010 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › &.selected › div.icon` | `filter: brightness(2); transition: opacity .1s ease-out` |
| 8013 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › &.selected › div.icon › &.info` | `opacity: 0` |
| 8016 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › &.selected › div.icon › &.info-sel` | `opacity: 1` |
| 8019 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › &.selected › div.icon › &.toolbox` | `opacity: 0` |
| 8022 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › &.selected › div.icon › &.toolbox-sel` | `opacity: 1` |
| 8025 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › &.selected › div.icon › &.view-options` | `opacity: 0` |
| 8028 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › &.selected › div.icon › &.view-options-sel` | `opacity: 1` |
| 8032 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › &.selected › button` | `color: var(--grayLight)` |
| 8035 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › &.selected › .bg` | `background-color: var(--panelBg); border: 1px solid var(--tab-border-gray); border-bottom-color: var(--panelBg); height: 100%` |
| 8041 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › &.selected › &:before` | `background-position: -7px -7px; height: 15px; left: 0; transform: translate(-5.5px, 8.5px); width: 15px; z-index: 1` |
| 8049 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › &.selected › &:after, &:before` | `background-image: radial-gradient( transparent 45%, var(--tab-border-gray) 50%, var(--panelBg) 60%); background-repeat: no-repeat; bottom: 0; content: ""; position: absolute` |
| 8061 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › &.selected › &:after` | `background-position: 7px -7px; height: 14px; right: 0; transform: translate(4.5px, 8.5px); width: 14px` |
| 8069 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › div.icon` | `background-position: 50%; background-repeat: no-repeat; background-size: contain; grid-area: 1/1; height: 1em; transition: filter .1s ease-out; width: 1em` |
| 8077 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › div.icon › &.info` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/content_info.svg)` |
| 8080 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › div.icon › &.info-sel` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/content_info_sel.svg); opacity: 0` |
| 8084 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › div.icon › &.toolbox` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/content_toolbox.svg)` |
| 8087 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › div.icon › &.toolbox-sel` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/content_toolbox_sel.svg); opacity: 0` |
| 8091 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › div.icon › &.view-options` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/content_view_options.svg)` |
| 8094 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › div.icon › &.view-options-sel` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/content_view_options_sel.svg); opacity: 0` |
| 8099 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › button` | `color: var(--grayMed); line-height: 1; transition: color .1s ease-out; white-space: nowrap` |
| 8104 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li › button › &:before` | `content: ""; height: 100%; left: 0; position: absolute; top: 0; width: 100%` |
| 8114 | content-panel-container | `.content-panel-container › .tab-group › nav › ul › li.hidden` | `display: none` |
| 8119 | content-panel-container | `.content-panel-container › .tab-group › main` | `height: 100%` |
| 8122 | content-panel-container | `.content-panel-container › .tab-group › & .tab-content` | `display: none` |
| 8124 | content-panel-container | `.content-panel-container › .tab-group › & .tab-content › &.selected` | `display: flex; flex-direction: column; height: 100%` |
| 8129 | content-panel-container | `.content-panel-container › .tab-group › & .tab-content › & .toolbox-content` | `border-bottom: none` |
| 8135 | content-panel-container | `.content-panel-container a` | `text-decoration: underline` |
| 8139 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container` | `grid-column: 1/-1; grid-row: -3/-1; margin: 0; width: 100%` |
| 8144 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › #content-main` | `margin-bottom: var(--content-bottom-margin)` |
| 8147 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › main` | `min-height: 8em` |
| 8150 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › &:after, &:before, .bg` | `display: none` |
| 8155 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › &.expanded` | `(嵌套包装)` |
| 8156 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › &.expanded › .expand-btn-group` | `margin-top: 4vw` |
| 8158 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › &.expanded › .expand-btn-group › .collapse-button` | `border-radius: 50%; height: 40px; width: 40px` |
| 8165 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › &.collapsed` | `transform: none` |
| 8167 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › &.collapsed › .expand-btn-group` | `margin-top: 4vw; transform: none` |
| 8170 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › &.collapsed › .expand-btn-group › .expand-button` | `border-radius: 50%; height: 40px; width: 40px` |
| 8177 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .expand-btn-group` | `display: grid; gap: 5px; margin-top: 2vw; right: 4vw; top: 0` |
| 8183 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .expand-btn-group › button` | `background: hsla(0, 0%, 100%, .07)` |
| 8185 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .expand-btn-group › button › &.collapse-button, &.expand-button` | `height: 32px; width: 40px` |
| 8190 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .expand-btn-group › button › .icon` | `opacity: .75` |
| 8195 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group` | `border: none; border-radius: .75rem .75rem 0 0; display: flex; flex-direction: column` |
| 8200 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › span.drag-handle` | `background-color: hsla(0, 0%, 93%, .3); border-radius: .1rem; cursor: grab; height: .2rem; left: 40%; position: absolute; top: .5rem; width: 20%; z-index: 100` |
| 8210 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › span.drag-handle › &:after` | `content: ""; inset: -1rem -3rem -1rem -3rem; position: absolute` |
| 8215 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › span.drag-handle › &:active` | `cursor: grabbing` |
| 8219 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav` | `bottom: 0; height: 4em; left: 0; padding: 0; position: absolute; right: 0; z-index: 10` |
| 8227 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav › &:has(.sub-tab-container.hidden)` | `z-index: -10` |
| 8230 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav › .sub-tab-container` | `background-color: #282828b2; border-radius: 2em 2em 0 0; display: flex; padding: 0 .75em` |
| 8235 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav › .sub-tab-container › &.hidden` | `opacity: 0; pointer-events: none` |
| 8239 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav › .sub-tab-container › & .sub-tab-nav` | `background-color: #3d3d3d; border-radius: 2em; display: flex; width: 100%` |
| 8244 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav › .sub-tab-container › & .sub-tab-nav › li` | `align-items: center; border-radius: 2em; color: #b1b1b1; flex-grow: 1; justify-content: center; z-index: 1` |
| 8251 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav › .sub-tab-container › & .sub-tab-nav › li › &:after, &:before` | `display: none` |
| 8255 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav › .sub-tab-container › & .sub-tab-nav › li › &.selected` | `background-color: #cecece; color: #000; font-weight: 400` |
| 8263 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav › ul.tab-nav` | `background-color: #000; justify-content: center; padding-bottom: 0` |
| 8267 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav › ul.tab-nav › li` | `background-image: radial-gradient( at 10%, rgba(35, 80, 255, .18) 0, transparent 150%); background-position: 50%; background-repeat: no-repeat; background-size: 0 0; flex: 1; gap: 0; grid-template-columns: unset; height: 100%; padding: .25em 0` |
| 8281 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav › ul.tab-nav › li › div.icon` | `height: 2em; width: 2em` |
| 8285 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav › ul.tab-nav › li › &:after, &:before` | `opacity: 0` |
| 8289 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav › ul.tab-nav › li › button` | `color: var(--grayMed); font-size: .75rem; transition: color .1s ease-out` |
| 8294 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav › ul.tab-nav › li › &:hover` | `filter: brightness(1.4); transition: filter .1s ease-out` |
| 8298 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav › ul.tab-nav › li › &.selected` | `background-color: #2350ff2e; background-size: 100% 100%; filter: brightness(1.5); transition: background-size .1s ease-out, filter .1s ease-out` |
| 8303 | content-panel-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .content-panel-container › .tab-group › nav › ul.tab-nav › li › &.selected › button` | `color: var(--grayLight)` |
| 8314 | content-panel-container | `@media only screen and (min-width: 320px) and (orientation: landscape) › .content-panel-container` | `(嵌套包装)` |
| 8315 | content-panel-container | `@media only screen and (min-width: 320px) and (orientation: landscape) › .content-panel-container › .expand-btn-group` | `margin-top: 2vh` |
| 8318 | content-panel-container | `@media only screen and (min-width: 320px) and (orientation: landscape) › .content-panel-container › &.expanded` | `(嵌套包装)` |
| 8319 | content-panel-container | `@media only screen and (min-width: 320px) and (orientation: landscape) › .content-panel-container › &.expanded › .expand-btn-group` | `margin-top: 4vh` |
| 8323 | content-panel-container | `@media only screen and (min-width: 320px) and (orientation: landscape) › .content-panel-container › &.collapsed` | `(嵌套包装)` |
| 8324 | content-panel-container | `@media only screen and (min-width: 320px) and (orientation: landscape) › .content-panel-container › &.collapsed › .expand-btn-group` | `margin-top: 4vh` |
| 8331 | content-panel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .content-panel-container` | `top: 8em` |
| 8333 | content-panel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .content-panel-container › &.expanded` | `(嵌套包装)` |
| 8334 | content-panel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .content-panel-container › &.expanded › .expand-btn-group` | `margin-top: 0` |
| 8338 | content-panel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .content-panel-container › &.collapsed` | `(嵌套包装)` |
| 8339 | content-panel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .content-panel-container › &.collapsed › .expand-btn-group` | `margin-top: 0` |
| 8343 | content-panel-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .content-panel-container › nav:has(~ main .back-button:not(.hidden))` | `padding-left: 1.6rem` |
| 8348 | featured-stories-panel | `.featured-stories-panel .content-body` | `background: none; height: 100%; pointer-events: all; width: 100%` |
| 8354 | featured-stories-panel | `.featured-stories-panel .featured-stories-header` | `align-items: center; display: grid; grid-row: 2; grid-template-columns: inherit; grid-template-rows: 1fr; padding-left: 20px; padding-right: 25px` |
| 8363 | featured-stories-panel | `.featured-stories-panel .content-header` | `margin-bottom: 5px` |
| 8366 | featured-stories-panel | `.featured-stories-panel .content` | `padding-bottom: 40px` |
| 8369 | featured-stories-panel | `.featured-stories-panel .hidden` | `display: none` |
| 8372 | featured-stories-panel | `.featured-stories-panel .os-scrollbar-vertical .os-scrollbar-handle` | `right: -8px` |
| 8376 | featured-stories-panel | `@media only screen and (min-width: 320px) › .featured-stories-panel` | `padding: 0 20px` |
| 8379 | featured-stories-panel | `@media only screen and (min-width: 320px) › .featured-stories-panel .content-body` | `background: none; padding-bottom: 0` |
| 8383 | featured-stories-panel | `@media only screen and (min-width: 320px) › .featured-stories-panel.overlay .content-body` | `background: var(--overlayBgGradient)` |
| 8386 | featured-stories-panel | `@media only screen and (min-width: 320px) › .featured-stories-panel .content-header` | `align-items: center; display: grid; grid-template-columns: auto max-content; grid-template-rows: auto` |
| 8392 | featured-stories-panel | `@media only screen and (min-width: 320px) › .featured-stories-panel .featured-stories-header` | `display: none` |
| 8395 | featured-stories-panel | `@media only screen and (min-width: 320px) › .featured-stories-panel .mobile-button-pair` | `align-self: start; display: inline-grid; gap: 5px; justify-self: end` |
| 8401 | featured-stories-panel | `@media only screen and (min-width: 320px) › .featured-stories-panel .desktop-collapse-button, .featured-stories-panel.overlay .mobile-overlay-button` | `display: none` |
| 8407 | featured-stories-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .featured-stories-panel` | `padding: 0` |
| 8410 | featured-stories-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .featured-stories-panel.hidden .content-body` | `display: none` |
| 8413 | featured-stories-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .featured-stories-panel .featured-stories-header` | `display: grid; padding-right: 0` |
| 8417 | featured-stories-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .featured-stories-panel .featured-stories-title` | `color: var(--gray); display: -moz-inline-grid; grid-column: 1; grid-row: 1` |
| 8423 | featured-stories-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .featured-stories-panel .open.featured-stories-title` | `display: inline-grid` |
| 8426 | featured-stories-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .featured-stories-panel .closed.featured-stories-title` | `display: none` |
| 8429 | featured-stories-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .featured-stories-panel .content-body` | `background: none; border-radius: 3px; grid-row: 3; padding-right: 0` |
| 8435 | featured-stories-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .featured-stories-panel .mobile-button-pair` | `display: none` |
| 8438 | featured-stories-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .featured-stories-panel.hidden .desktop-collapse-button` | `justify-self: start` |
| 8441 | featured-stories-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .featured-stories-panel .desktop-collapse-button` | `display: -moz-inline-grid; display: inline-grid; grid-row: 1` |
| 8446 | featured-stories-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .featured-stories-panel.hidden .desktop-collapse-button.clickable` | `cursor: pointer; pointer-events: all` |
| 8450 | featured-stories-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .featured-stories-panel .open.desktop-collapse-button` | `grid-column: 2` |
| 8453 | featured-stories-panel | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .featured-stories-panel .closed.desktop-collapse-button` | `grid-column: 1` |
| 8457 | compare | `.compare .hidden` | `visibility: hidden` |
| 8460 | compare | `.compare .show` | `height: 100%; visibility: visible; width: 100%` |
| 8465 | compare | `.compare .section.left, .compare .section.right` | `display: flex; justify-content: center; position: relative` |
| 8471 | compare | `.compare .block` | `align-self: flex-end; background: var(--textBgGradient); padding-bottom: 5px; padding-top: 10px` |
| 8477 | compare | `.compare .generic-model-disclaimer` | `margin-top: .5em` |
| 8479 | compare | `.compare .generic-model-disclaimer › span` | `text-transform: lowercase` |
| 8483 | compare | `.compare .footer` | `align-items: center; border-top: 1px solid var(--grayDark); display: grid; grid-template-columns: auto auto` |
| 8489 | compare | `.compare .exit` | `align-items: center; display: flex; grid-column: 2; justify-self: flex-end` |
| 8495 | compare | `.compare .exit .icon` | `display: block` |
| 8498 | compare | `.compare .text` | `color: var(--gray); display: none; margin-right: 5px` |
| 8503 | compare | `.compare .upper` | `text-transform: uppercase` |
| 8506 | compare | `.compare .data-area` | `align-content: start; display: inline-grid; grid-template-columns: auto auto` |
| 8511 | compare | `.compare .data-area span:first-child` | `margin-right: 10px; opacity: .75` |
| 8515 | compare | `.compare .data-area .left` | `margin-right: 10px` |
| 8518 | compare | `.compare .data-area .right` | `border-left: 1px solid var(--gray); padding-left: 10px; text-align: left` |
| 8523 | compare | `.compare .data-area .right .radius` | `margin-right: 8px` |
| 8526 | compare | `.compare .next` | `right: 0` |
| 8529 | compare | `.compare .next, .compare .previous` | `opacity: .5; position: absolute; top: 50%; transform: translateY(-50%)` |
| 8536 | compare | `.compare .previous` | `left: 0` |
| 8539 | left-viewport | `#left-viewport` | `height: calc(var(--vh)/2); left: 0; top: 0; width: 100vw` |
| 8545 | right-viewport | `#right-viewport` | `height: calc(var(--vh)/2 - 40px); left: 0; top: calc(var(--vh)/2); width: 100vw` |
| 8552 | compare | `@media (pointer: fine) and (hover: hover) › .compare .exit:hover .icon-close, .compare .next:hover, .compare .previous:hover` | `opacity: 1` |
| 8557 | compare | `@media (pointer: fine) and (hover: hover) › .compare .exit:hover .text` | `color: var(--white)` |
| 8562 | compare | `@media only screen and (min-width: 320px) › .compare .divider` | `background: var(--verticalFade); height: 1px; left: 0; opacity: .5; position: absolute; top: 50%; width: 100vw` |
| 8571 | compare | `@media only screen and (min-width: 320px) › .compare .section.left` | `grid-column: 1; grid-row: 2` |
| 8575 | compare | `@media only screen and (min-width: 320px) › .compare .section.right` | `grid-column: 1; grid-row: 3` |
| 8579 | compare | `@media only screen and (min-width: 320px) › .compare .footer` | `grid-column: 1; grid-row: 4; padding: 0 20px` |
| 8584 | compare | `@media only screen and (min-width: 320px) › .compare .section.left .block, .compare .section.right .block` | `padding-left: 20px; padding-right: 20px` |
| 8589 | compare-view | `@media only screen and (min-width: 320px) › .compare-view .grid-layout .float-right-bottom` | `margin-bottom: 4px; padding-bottom: 0; right: 35px` |
| 8594 | compare | `@media only screen and (min-width: 320px) › .compare .data-area section.left span:first-child, .compare-view .extended-controls` | `display: none` |
| 8600 | left-viewport | `@media only screen and (min-width: 320px) and (orientation: landscape) › #left-viewport` | `left: 0` |
| 8603 | left-viewport | `@media only screen and (min-width: 320px) and (orientation: landscape) › #left-viewport, #right-viewport` | `height: calc(var(--vh) - 40px); top: 0; width: 50vw` |
| 8609 | right-viewport | `@media only screen and (min-width: 320px) and (orientation: landscape) › #right-viewport` | `left: 50%` |
| 8612 | compare | `@media only screen and (min-width: 320px) and (orientation: landscape) › .compare .divider` | `background: var(--horizonalFade); height: var(--vh); left: 50%; opacity: .5; top: 0; width: 1px` |
| 8620 | compare | `@media only screen and (min-width: 320px) and (orientation: landscape) › .compare .block .title` | `margin-bottom: 4px` |
| 8623 | compare | `@media only screen and (min-width: 320px) and (orientation: landscape) › .compare .section.left` | `grid-column: 1; grid-row: 2` |
| 8627 | compare | `@media only screen and (min-width: 320px) and (orientation: landscape) › .compare .section.right` | `grid-column: 2; grid-row: 2` |
| 8631 | compare | `@media only screen and (min-width: 320px) and (orientation: landscape) › .compare .footer` | `grid-column: span 2; grid-row: 3; padding: 0 20px` |
| 8636 | compare | `@media only screen and (min-width: 320px) and (orientation: landscape) › .compare .next, .compare .previous` | `margin-top: -30px` |
| 8640 | compare-view | `@media only screen and (min-width: 320px) and (orientation: landscape) › .compare-view .grid-layout .float-right-bottom` | `margin-bottom: 5px; padding-bottom: 0; padding-right: 0` |
| 8647 | compare-view | `@media only screen and (min-width: 641px) and (orientation: portrait) › .compare-view .grid-layout .float-right-bottom` | `right: 0` |
| 8652 | compare | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .compare .data-area section.left span:first-child` | `display: unset` |
| 8655 | compare | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .compare .block` | `padding-bottom: 50px; padding-top: 30px; text-align: center` |
| 8660 | compare | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .compare .block .title` | `margin-bottom: 8px` |
| 8663 | compare | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .compare .text` | `display: block` |
| 8666 | compare-view | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .compare-view .grid-layout .float-right-bottom` | `margin-bottom: 45px; right: 0` |
| 8671 | info-panel | `.info-panel` | `margin: auto; padding: 40px 0` |
| 8675 | info-panel | `.info-panel ul` | `margin-block-end: 1em; margin-block-start: 1em; padding-inline-start: 40px` |
| 8680 | info-panel | `.info-panel li` | `display: list-item; list-style: disc` |
| 8684 | info-panel | `.info-panel .title` | `border-bottom: 1px solid var(--grayDark); border-right: 0; padding-top: 25px; text-align: center` |
| 8690 | info-panel | `.info-panel .subtitle` | `border: 0; border-bottom: 1px solid var(--grayDark); padding-top: 25px; text-align: center` |
| 8696 | info-panel | `.info-panel .content` | `margin: auto; padding-top: 25px; text-align: justify` |
| 8701 | GLOBAL | `strong` | `font-weight: 700` |
| 8705 | info-panel | `@media only screen and (min-width: 320px) › .info-panel` | `width: 80%` |
| 8710 | info-panel | `@media only screen and (min-width: 320px) and (orientation: landscape) › .info-panel` | `width: 55%` |
| 8714 | distance-panel-container | `.distance-panel-container` | `background-color: transparent; inset: 0; position: absolute; transition: background-color 1s var(--ease-out-bezier); --d-panel-x: unset; --d-panel-y: unset; --d-panel-width: unset; --d-panel-height: unset; --d-panel-collapsed-height: unset` |
| 8725 | distance-panel-container | `.distance-panel-container:has(.distance-panel.draggable).searching` | `background-color: rgba(0, 0, 0, .7); pointer-events: all; z-index: 100` |
| 8731 | distance-panel-container | `@media only screen and (min-width: 640px) and (orientation: landscape) › .distance-panel-container.searching` | `background-color: rgba(0, 0, 0, .7); pointer-events: all; z-index: 100` |
| 8738 | distance-panel-container | `@media only screen and (min-width: 915px) and (orientation: portrait) › .distance-panel-container.searching` | `background-color: rgba(0, 0, 0, .7); pointer-events: all; z-index: 100` |
| 8744 | distance-panel | `.distance-panel` | `display: flex; flex-direction: column; justify-content: flex-start; pointer-events: all` |
| 8750 | distance-panel | `.distance-panel.draggable` | `height: var(--d-panel-height); padding: 1rem; position: absolute; transform: translate(var(--d-panel-x), var(--d-panel-y)); width: var(--d-panel-width); z-index: 50` |
| 8758 | distance-panel | `.distance-panel.draggable:after` | `backdrop-filter: blur(15px); background-image: var(--blackGradientVert); border-radius: .5rem; content: ""; inset: 0; position: absolute; transition-delay: 0s; transition-duration: .6s; transition-property: opacity, visibility, transform; transition-timing-function: var(--ease-out-bezier); z-index: -1` |
| 8774 | distance-panel | `.distance-panel.draggable > div` | `transition-delay: .4s; transition-duration: .6s; transition-property: opacity, visibility; transition-timing-function: var(--ease-out-bezier)` |
| 8780 | distance-panel-container | `.distance-panel-container.minimized .distance-panel.draggable, .distance-panel-container.minimized .distance-panel.draggable *` | `pointer-events: none` |
| 8784 | distance-panel-container | `.distance-panel-container.minimized .distance-panel.draggable:after` | `opacity: 0; transform: scaleY(.2); transition-delay: .2s; transition-duration: .4s; visibility: hidden` |
| 8791 | distance-panel-container | `.distance-panel-container.minimized .distance-panel.draggable > div` | `opacity: 0; transition-delay: 0s; transition-duration: .3s; visibility: hidden` |
| 8797 | distance-panel | `.distance-panel.fixed` | `padding: 0 20px; width: 100%` |
| 8801 | c-menu-item | `.c-menu-item.collapsed .distance-panel.fixed` | `opacity: 0; transition-delay: 0s; visibility: hidden` |
| 8806 | c-menu-item | `.c-menu-item.collapsed ~ .c-menu-item.expanded nav.clock-shortcut` | `top: -5em` |
| 8809 | distance-panel-header | `.distance-panel-header` | `align-items: center; cursor: move; display: flex; gap: 0; height: -moz-fit-content; height: fit-content; justify-content: center; margin: 0; opacity: .8; transition: opacity .3s ease-in-out` |
| 8821 | distance-panel | `.distance-panel button.icon-drag` | `cursor: move; flex-basis: 30px` |
| 8825 | distance-panel | `.distance-panel.fixed button.icon-drag` | `display: none` |
| 8828 | distance-panel-header | `.distance-panel-header > h1` | `cursor: move; flex: 1; font-size: 1rem; text-align: center` |
| 8834 | distance-panel | `.distance-panel.draggable.dragging .distance-panel-header > button.icon-drag, .distance-panel.draggable.dragging .distance-panel-header > h1` | `transform: scale(1.1); transition: transform .8s var(--ease-out-bezier)` |
| 8839 | distance-panel | `.distance-panel.draggable.dragging .distance-panel-header > button.icon-drag` | `transform-origin: left` |
| 8842 | dynamic-ui | `#dynamic-ui > h1.dp-title` | `align-self: center; grid-area: head; justify-self: center; text-transform: uppercase` |
| 8848 | distance-panel | `.distance-panel .distance-panel-content` | `display: flex; flex-basis: 13.5rem; flex-direction: column; justify-content: space-around` |
| 8854 | distance-panel | `.distance-panel.fixed .distance-panel-content` | `flex: 1; justify-content: flex-end` |
| 8858 | distance-panel | `.distance-panel.fixed .search-container.source` | `margin-bottom: 2vh` |
| 8861 | distance-panel | `.distance-panel span.from-to` | `line-height: 1; margin-left: 2.2rem; text-transform: uppercase` |
| 8866 | distance-panel | `.distance-panel span.mp-highlight` | `filter: brightness(1.5); text-decoration: underline` |
| 8870 | search-container | `.search-container > button` | `height: 1.5em; left: 7em; position: absolute; width: 4.7em` |
| 8876 | search-container | `.search-container.source > button` | `left: 8.4em` |
| 8879 | distance-panel-content | `.distance-panel-content > button.swap-btn` | `background-color: #fff; border: 1px solid #fff; border-radius: 12px; filter: invert(1) contrast(.7) brightness(.8); left: 2rem; position: absolute; top: 10rem; transform: translate(-50%, -50%); transition-delay: 1s, 0s; transition-duration: .5s, .3s; transition-property: left, transform; transition-timing-function: var(--ease-out-bezier)` |
| 8893 | distance-panel | `.distance-panel.fixed .distance-panel-content > button.swap-btn` | `bottom: 2rem; top: unset` |
| 8897 | distance-panel-content | `.distance-panel-content > button.swap-btn:active` | `filter: contrast(.7) brightness(1); transform: translate(-50%, -50%) rotate(-180deg) scale(1.1); transition-duration: .5s` |
| 8902 | distance-panel-content | `.distance-panel-content > button.swap-btn:after` | `content: ""; inset: -.7rem; position: absolute` |
| 8907 | distance-panel-container | `.distance-panel-container.minimized .distance-panel-content button` | `pointer-events: none` |
| 8910 | distance-panel | `.distance-panel.draggable .search .cover` | `height: 100%; width: 100%` |
| 8914 | distance-panel-content | `.distance-panel-content .search .bar` | `border-radius: .3em; grid-template-areas: "search input"; grid-template-columns: auto 1fr; left: 1rem; margin: 0; padding: .2rem .4rem; transition-duration: .5s; transition-property: width, left, transform; transition-timing-function: var(--ease-out-bezier); width: 75%` |
| 8929 | distance-panel-content | `.distance-panel-content .search .results` | `background: linear-gradient( 180deg, var(--grayDarkAlpha80) 0, #070709 120%); border: none; border-radius: 0 0 .3em .3em` |
| 8938 | distance-panel-content | `.distance-panel-content .search .results .result-div:last-child` | `margin-bottom: 10px` |
| 8941 | distance-panel-content | `.distance-panel-content .search .search-close-icon` | `display: none` |
| 8944 | distance-panel-content | `.distance-panel-content .search input` | `font-size: 16px; overflow: hidden; padding: 0 .5rem; text-overflow: ellipsis; width: auto` |
| 8951 | distance-panel | `.distance-panel .input-focused .bar` | `left: 3%; width: 94%; z-index: 4` |
| 8956 | distance-panel | `.distance-panel .input-focused .cover` | `opacity: .7; z-index: 3` |
| 8960 | distance-panel | `.distance-panel.fixed .input-focused .bar` | `transform: translateY(calc(-75vh + 170px)); transition-duration: .25s` |
| 8964 | distance-panel | `.distance-panel.fixed .target .input-focused .bar` | `transform: translateY(calc(-75vh + 100px))` |
| 8967 | distance-panel | `.distance-panel.fixed .input-focused .bar:after` | `color: var(--grayMed); content: ""; position: absolute; text-align: center; top: -2em; width: 100%` |
| 8975 | distance-panel | `.distance-panel.fixed .source .input-focused .bar:after` | `content: "Search for a source to measure from"` |
| 8978 | distance-panel | `.distance-panel.fixed .target .input-focused .bar:after` | `content: "Search for a target to measure to"` |
| 8981 | distance-panel | `.distance-panel.fixed .input-focused .cover` | `z-index: 3` |
| 8984 | distance-panel-container | `.distance-panel-container.searching .search .bar:has(.result-div)` | `border-radius: .3em .3em 0 0` |
| 8987 | distance-panel | `.distance-panel .search .results:has(.result-div)` | `border-top: 1px solid var(--grayDark)` |
| 8990 | distance-panel | `.distance-panel .line-graphic-container` | `align-items: center; display: flex; flex-direction: column; height: 9rem; justify-content: space-between; position: absolute; right: 1.5rem; top: 5.9rem; --focus-dot-mp-mult: 1` |
| 9001 | distance-panel | `.distance-panel.fixed .line-graphic-container` | `height: calc(70% + 2vh); top: unset; top: 1.5em` |
| 9006 | touch | `.touch .line-graphic-container:before` | `content: ""; inset: -1rem; position: absolute` |
| 9011 | touch | `.touch .line-graphic-container.touchactive` | `pointer-events: none` |
| 9014 | touch | `.touch .line-graphic-container.touchactive:after` | `animation: pulse .3s 4 var(--ease-out-bezier) alternate; animation-fill-mode: forwards; background-color: var(--distance-tool-color); border-radius: .25rem; content: ""; height: .5rem; left: calc(50% - .25rem); opacity: .7; outline: var(--distance-tool-color) solid .1rem; outline-offset: .1rem; position: absolute; top: 35%; width: .5rem` |
| 9029 | touch | `.touch .line-graphic-container.touchactive.source-dot:after` | `top: 50%` |
| 9032 | touch | `.touch .line-graphic-container.touchactive.target-dot:after` | `top: calc(50% - .25rem)` |
| 9036 | KEYFRAME | `@keyframes pulse › 0%` | `outline-offset: 0; transform: scale(0)` |
| 9040 | KEYFRAME | `@keyframes pulse › to` | `outline-offset: .1rem; transform: scale(1.2)` |
| 9045 | line-graphic-container | `.line-graphic-container > button` | `align-items: center; border: 1.5px solid #464646; border-radius: 1rem; display: flex; height: 1.8rem; justify-content: center; position: relative; transition-duration: .3s; transition-property: border-color; transition-timing-function: var(--ease-out-bezier); width: 1.8rem; z-index: 1` |
| 9059 | touch | `.touch .line-graphic-container > button` | `border-color: #646464` |
| 9062 | line-graphic-container | `.line-graphic-container > button > span` | `filter: brightness(1); transition-delay: 0s, .1s; transition-duration: .3s, .5s; transition-property: transform, filter; transition-timing-function: var(--ease-out-bezier)` |
| 9069 | line-graphic-container | `.line-graphic-container > button.source-mp-toggle` | `margin-top: .25rem` |
| 9072 | line-graphic-container | `.line-graphic-container > button.target-mp-toggle` | `margin-bottom: .25rem` |
| 9075 | line-graphic-container | `.line-graphic-container > button.no-toggle` | `border: none; pointer-events: none` |
| 9079 | line-graphic-container | `.line-graphic-container .source-icon` | `transform: scale(.9)` |
| 9082 | line-graphic-container | `.line-graphic-container > button.surface .source-icon` | `transform: scale(.9) translateY(.88rem)` |
| 9085 | line-graphic-container | `.line-graphic-container > button.no-toggle .source-icon` | `transform: scale(1.2)` |
| 9088 | line-graphic-container | `.line-graphic-container > button.surface .target-icon` | `transform: translateY(-.8rem)` |
| 9091 | line-graphic-container | `.line-graphic-container > button.no-toggle .target-icon` | `transform: scale(1.3)` |
| 9094 | line-graphic-container | `.line-graphic-container .line-graphic` | `border: none; border-right: 2.5px solid var(--distance-tool-color); bottom: 18px; cursor: crosshair; pointer-events: none; position: absolute; top: 18px; transition-duration: .3s; transition-property: top, bottom; transition-timing-function: var(--ease-out-bezier)` |
| 9106 | distance-panel-container | `.distance-panel-container.minimizable .line-graphic` | `pointer-events: all` |
| 9109 | source-mp-toggle | `button.source-mp-toggle.center ~ button.target-mp-toggle.surface ~ .line-graphic, button.source-mp-toggle.no-toggle ~ button.target-mp-toggle.surface ~ .line-graphic` | `bottom: 32px` |
| 9113 | source-mp-toggle | `button.source-mp-toggle.surface ~ button.target-mp-toggle.center ~ .line-graphic, button.source-mp-toggle.surface ~ button.target-mp-toggle.no-toggle ~ .line-graphic` | `top: 32px` |
| 9117 | source-mp-toggle | `button.source-mp-toggle.surface ~ button.target-mp-toggle.surface ~ .line-graphic` | `bottom: 32px; top: 32px` |
| 9121 | distance-panel-container | `.distance-panel-container.minimizable .line-graphic-container .line-graphic:before` | `content: ""; inset: -14px -15px -14px -13px; position: absolute` |
| 9126 | distance-panel-container | `.distance-panel-container.minimizable .line-graphic-container .line-graphic:after` | `color: var(--distance-tool-color); content: "\2732"; filter: brightness(1.3); font-size: .5rem; line-height: 1; pointer-events: none; position: absolute; top: calc(var(--focus-dot-offset, var(--focus-dot-pos, 0))*var(--focus-dot-mp-mult)); transform: translate(-27%, -45%); transition: top .3s var(--ease-out-bezier); z-index: 1` |
| 9139 | line-graphic-container | `.line-graphic-container.centered-dot:has(button.source-mp-toggle.surface):has(button.target-mp-toggle.center)` | `--focus-dot-mp-mult: 0.87` |
| 9142 | line-graphic-container | `.line-graphic-container.centered-dot:has(button.source-mp-toggle.center):has(button.target-mp-toggle.surface)` | `--focus-dot-mp-mult: 1.14` |
| 9145 | distance-panel | `.distance-panel ~ .result-container` | `align-items: center; display: flex; flex-direction: column; height: 20px; pointer-events: all` |
| 9151 | distance-panel | `.distance-panel ~ .result-container › > div` | `align-items: center; display: flex; flex-direction: row` |
| 9155 | distance-panel | `.distance-panel ~ .result-container › > div › &.hidden` | `display: none` |
| 9160 | distance-panel | `.distance-panel.fixed ~ .result-container` | `justify-content: center; padding: 0 20px` |
| 9164 | distance-panel | `.distance-panel.draggable ~ .result-container` | `position: absolute; text-align: center; transform: translate(var(--d-panel-x), calc(var(--d-panel-y) + var(--d-panel-height) - 100% - 1.2rem)); transition-delay: 0s; transition-duration: .4s; transition-property: transform, opacity; transition-timing-function: var(--ease-out-bezier); width: var(--d-panel-width); z-index: 52` |
| 9175 | distance-panel | `.distance-panel.draggable ~ .result-container.expanded` | `transform: translate(var(--d-panel-x), calc(var(--d-panel-y) + var(--d-panel-height) - 100% - var(--d-panel-height-factor)))` |
| 9178 | distance-panel | `.distance-panel.fixed ~ .result-container.expanded` | `background-color: #0000009a; border-radius: 10px; height: 7rem; left: 0; position: fixed; top: 4em; width: 100%` |
| 9187 | c-menu-item | `.c-menu-item.collapsed .expanded-container:has(.distance-panel-container .result-container)` | `position: fixed; top: 4em; transform: unset` |
| 9192 | distance-panel-container | `.distance-panel-container.minimized .distance-panel.draggable ~ .result-container` | `background-color: #0000006b; border-radius: 10px; height: var(--d-panel-collapsed-height); padding: .5em; transform: translate(calc(var(--d-panel-bpX) - 50%), calc(var(--d-panel-bpY) + 25%)); transition-delay: .2s; transition-duration: .4s` |
| 9200 | distance-panel-container | `.distance-panel-container.minimized .distance-panel.draggable ~ .result-container › .rel-velocity-subcontainer .rel-velocity` | `margin-left: 0` |
| 9204 | distance-panel | `.distance-panel.draggable.dragging ~ .result-container` | `transition-duration: 0s; transition-property: opacity` |
| 9208 | distance-panel-container | `.distance-panel-container.searching .distance-panel.draggable ~ .result-container` | `opacity: .05; pointer-events: none` |
| 9212 | result-container | `.result-container h3.result-text:not(.info)` | `color: var(--distance-tool-color); filter: brightness(1.3); flex-grow: 1; font-size: 1.7rem; font-weight: 100` |
| 9219 | result-container | `.result-container h3.result-text.info` | `flex-grow: 1; text-align: center` |
| 9223 | result-container | `.result-container h3.result-unit` | `color: var(--distance-tool-color); filter: brightness(1.2); flex-grow: 1; font-size: 1.4rem; font-weight: 100; opacity: .8; padding: .7rem; text-align: left; text-decoration: underline; transition: opacity .3s var(--ease-out-bezier)` |
| 9235 | result-container | `.result-container h3.result-unit:empty` | `flex-grow: 0; padding: 0` |
| 9239 | result-container | `.result-container .loading-bar` | `animation: loading-bar 2s var(--ease-out-bezier) infinite; background-color: var(--grayLight); border-radius: 2px; height: 4px; left: 10%; position: absolute; width: 10%` |
| 9248 | distance-panel | `.distance-panel.draggable ~ .result-container .loading-bar` | `top: calc(50% - 2px)` |
| 9251 | result-container | `.result-container h3.result-text.rel-velocity` | `font-size: 1.5rem; padding-left: 0` |
| 9255 | result-container | `.result-container h3.result-unit.rel-velocity` | `font-size: 1.2rem; padding-left: .5rem` |
| 9259 | result-subcontainer | `.result-subcontainer` | `display: flex; justify-content: center` |
| 9262 | result-subcontainer | `.result-subcontainer › > div` | `align-items: center; display: flex; gap: .5em` |
| 9267 | result-subcontainer | `.result-subcontainer › .tooltip` | `background-repeat: no-repeat; background-size: contain; cursor: help; display: inline-block; height: 22px; width: 22px` |
| 9275 | result-subcontainer | `.result-subcontainer › .tooltip:after` | `background: #333; border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, .2); color: #fff; font-size: .85rem; line-height: 1.4; margin-right: 1em; opacity: 0; padding: 12px; position: absolute; transition: all .3s ease; visibility: hidden; z-index: 53` |
| 9290 | result-subcontainer | `.result-subcontainer › .tooltip:hover:after` | `opacity: 1; visibility: visible` |
| 9295 | rel-velocity-subcontainer | `.rel-velocity-subcontainer` | `margin-top: -.3rem` |
| 9297 | rel-velocity-subcontainer | `.rel-velocity-subcontainer › .tooltip` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/speed-icon.svg)` |
| 9299 | rel-velocity-subcontainer | `.rel-velocity-subcontainer › .tooltip › &.hidden` | `display: none` |
| 9303 | rel-velocity-subcontainer | `.rel-velocity-subcontainer › .tooltip:after` | `content: "Relative velocity is how fast one object appears to be moving relative to another object that is also in motion. Velocity is always measured relative to a specific observer or frame of reference."` |
| 9307 | light-time-subcontainer | `.light-time-subcontainer` | `text-align: center` |
| 9309 | light-time-subcontainer | `.light-time-subcontainer › &.hidden` | `display: none` |
| 9312 | light-time-subcontainer | `.light-time-subcontainer › .tooltip` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/svg/light-clock-icon.svg)` |
| 9315 | light-time-subcontainer | `.light-time-subcontainer › .tooltip:after` | `content: "Light time distance is how long it takes for light to travel from one object to another, without taking into account their relative velocity."` |
| 9320 | KEYFRAME | `@keyframes loading-bar › 0%, to` | `transform: translateX(0)` |
| 9323 | KEYFRAME | `@keyframes loading-bar › 50%` | `background-color: var(--grayMed); transform: translateX(700%)` |
| 9328 | distance-panel | `.distance-panel ~ button.max-min-btn` | `display: none` |
| 9331 | distance-panel-container | `.distance-panel-container.minimizable .distance-panel.draggable ~ button.max-min-btn` | `background-color: #18171a; border-radius: 15px; display: block; height: 30px; opacity: 0; position: absolute; transition-delay: 1s; transition-duration: .4s; transition-property: opacity, margin, transform; transition-timing-function: var(--ease-out-bezier); width: 30px; z-index: 51` |
| 9348 | distance-panel-container | `.distance-panel-container.searching .distance-panel.draggable ~ button.max-min-btn` | `pointer-events: none; transition-delay: 0s` |
| 9352 | touch | `.touch .distance-panel-container.minimizable:not(.searching) .distance-panel.draggable ~ button.max-min-btn` | `opacity: 1; transition-delay: 0s` |
| 9356 | touch | `.touch .distance-panel-container.minimizable button.max-min-btn.right` | `margin-left: 15px` |
| 9359 | touch | `.touch .distance-panel-container.minimizable button.max-min-btn.left` | `margin-left: -15px` |
| 9362 | touch | `.touch .distance-panel-container.minimizable .distance-panel.dragging ~ button.max-min-btn` | `transition-delay: 0s; transition-duration: .2s; transition-property: opacity, margin` |
| 9367 | touch | `.touch .distance-panel-container.minimizable button.max-min-btn:active` | `filter: invert()` |
| 9370 | distance-panel-container | `.distance-panel-container.minimizable button.max-min-btn.right` | `transform: translate(calc(var(--d-panel-x) + var(--d-panel-width) - 100%), calc(var(--d-panel-y) + var(--d-panel-height)*.5 - 50%))` |
| 9373 | distance-panel-container | `.distance-panel-container.minimizable button.max-min-btn.left` | `transform: translate(var(--d-panel-x), calc(var(--d-panel-y) + var(--d-panel-height)*.5 - 50%))` |
| 9376 | distance-panel-container | `.distance-panel-container.minimizable.minimized button.max-min-btn` | `transform: translate(calc(var(--d-panel-bpX) - 50% - 15px), calc(var(--d-panel-bpY) + 550%)); transition-delay: .2s; transition-duration: .4s` |
| 9381 | distance-panel-container | `.distance-panel-container.minimizable.minimized button.max-min-btn.left` | `transform: translate(calc(var(--d-panel-bpX) - 50%), calc(var(--d-panel-bpY) + 550%))` |
| 9384 | distance-panel-container | `.distance-panel-container.minimizable .distance-panel.dragging ~ button.max-min-btn` | `transition-delay: 0s; transition-duration: .2s; transition-property: opacity, margin` |
| 9389 | dynamic-ui | `#dynamic-ui > button.dp-close-button.icon-close` | `align-self: center; grid-area: head; justify-self: flex-end; margin-right: 1rem` |
| 9396 | dynamic-ui | `@media only screen and (orientation: landscape) and (max-height: 600px) › #dynamic-ui > button.dp-close-button.icon-close` | `margin-right: 0` |
| 9401 | distance-panel-header | `@media (pointer: fine) and (hover: hover) › .distance-panel-header:hover` | `opacity: 1` |
| 9404 | distance-panel-container | `@media (pointer: fine) and (hover: hover) › .distance-panel-container.minimizable button.max-min-btn:hover` | `filter: invert()` |
| 9407 | distance-panel-container | `@media (pointer: fine) and (hover: hover) › .distance-panel-container.minimizable .distance-panel.draggable ~ button.max-min-btn:hover, .distance-panel-container.minimizable:not(.searching) .result-container:hover ~ button.max-min-btn, .distance-panel-container.minimizable:not(.searching).maximized .distance-panel:hover ~ button.max-min-btn` | `opacity: 1; transition-delay: 0s; transition-duration: .8s` |
| 9414 | distance-panel-container | `@media (pointer: fine) and (hover: hover) › .distance-panel-container.minimizable .max-min-btn.right:hover, .distance-panel-container.minimizable .result-container:hover ~ .max-min-btn.right, .distance-panel-container.minimizable.maximized .distance-panel:hover ~ .max-min-btn.right` | `margin-left: 15px` |
| 9419 | distance-panel-container | `@media (pointer: fine) and (hover: hover) › .distance-panel-container.minimizable .max-min-btn.left:hover, .distance-panel-container.minimizable .result-container:hover ~ .max-min-btn.left, .distance-panel-container.minimizable.maximized .distance-panel:hover ~ .max-min-btn.left` | `margin-left: -15px` |
| 9424 | distance-panel-container | `@media (pointer: fine) and (hover: hover) › .distance-panel-container.maximized .distance-panel.draggable:hover button.swap-btn.offset, .distance-panel-container.maximized:hover button.swap-btn.offset` | `left: 2.7rem; transition-delay: 0s` |
| 9429 | distance-panel-content | `@media (pointer: fine) and (hover: hover) › .distance-panel-content > button.swap-btn:hover` | `filter: contrast(.7) brightness(1); transform: translate(-50%, -50%) rotate(-180deg) scale(1.1); transition-duration: .5s` |
| 9434 | line-graphic-container | `@media (pointer: fine) and (hover: hover) › .line-graphic-container > button:hover` | `border-color: #646464` |
| 9437 | line-graphic-container | `@media (pointer: fine) and (hover: hover) › .line-graphic-container > button:hover > span` | `filter: brightness(1.5)` |
| 9440 | line-graphic-container | `@media (pointer: fine) and (hover: hover) › .line-graphic-container .line-graphic:hover:after` | `filter: brightness(1.5); transform: translate(-27%, -45%) scale(1.2)` |
| 9444 | result-container | `@media (pointer: fine) and (hover: hover) › .result-container > h3.result-unit:hover` | `opacity: 1` |
| 9448 | events-timeline | `.events-timeline` | `display: block; margin: 0 auto; max-width: 800px; opacity: 1; pointer-events: all; position: relative; transition: transform 1s var(--ease-out-bezier), opacity .25s var(--ease-out-bezier); z-index: 20` |
| 9458 | events-timeline | `.events-timeline.hidden` | `opacity: 0` |
| 9461 | timeline-footer-container | `.timeline-footer-container` | `(嵌套包装)` |
| 9462 | timeline-footer-container | `.timeline-footer-container › & .reset-zoom-button` | `color: #99a2ff; font-size: .9em; left: 0; margin-top: 1em; position: absolute; text-align: center; text-transform: uppercase; transition: color .1s ease-in; width: 100%` |
| 9472 | timeline-footer-container | `.timeline-footer-container › & .reset-zoom-button › &:hover` | `color: #fff` |
| 9477 | events-timeline | `.events-timeline .range-date` | `color: var(--grayMed); font-size: .9em; margin-top: 1em; opacity: 1; position: absolute; text-transform: uppercase; transition: opacity .5s .3s var(--ease-out-bezier), transform .5s .3s var(--ease-out-bezier); z-index: -1` |
| 9487 | events-timeline | `.events-timeline .range-date.fadein-slow` | `transition: opacity 1s 1.8s var(--ease-out-bezier)` |
| 9490 | events-timeline | `.events-timeline .range-date.hidden` | `display: unset; opacity: 0; transform: translateY(50%); transition: opacity .01s var(--ease-out-bezier), transform 10ms .3s` |
| 9496 | events-timeline | `.events-timeline .range-date.start-date` | `left: 0` |
| 9499 | events-timeline | `.events-timeline .range-date.end-date` | `right: 0; text-align: right` |
| 9503 | events-timeline | `.events-timeline .bar` | `backdrop-filter: blur(5px); background: #282828; border-radius: 3px; cursor: pointer; height: 40px; position: relative` |
| 9511 | events-timeline | `.events-timeline .viewing-line` | `background-color: var(--spacecraft); border-radius: 1.5px; bottom: 0; height: 40px; opacity: 1; pointer-events: none; position: absolute; transform: translateX(calc(var(--viewingline-X) - 50%)); transition: opacity 1s ease-out 2s, transform .25s ease-out; width: 1px` |
| 9524 | events-timeline | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .events-timeline .viewing-line` | `background-color: transparent` |
| 9528 | events-timeline | `.events-timeline .viewing-line:after` | `border: 8px solid transparent; border-bottom: 8px solid var(--spacecraft); border-radius: 8px; bottom: 0; content: ""; left: 50%; position: absolute; transform: translate(-50%, 20%); width: 1px` |
| 9539 | events-timeline | `.events-timeline .target-date-line` | `background-color: var(--spacecraft); border-radius: .5px; height: 40px; opacity: 1; pointer-events: none; position: absolute; top: 0; transform: translateX(var(--dateline-X)); transition: opacity .2s ease-out, visibility .2s ease-out; visibility: visible; width: 1px` |
| 9552 | events-timeline | `.events-timeline .target-date-line.hidden` | `display: unset; opacity: 0; transition: opacity .15s ease-in .15s, visibility .15s ease-in .15s; visibility: hidden` |
| 9558 | touch | `.touch .events-timeline .target-date-line` | `transition: none` |
| 9561 | touch | `.touch .events-timeline .target-date-line.hidden-slow` | `display: unset; opacity: 0; transition: opacity 1s ease-in 1s, visibility 1s ease-in 1s; visibility: hidden` |
| 9567 | events-timeline | `.events-timeline .target-date-label` | `backdrop-filter: blur(5px); font-size: .9em; opacity: 1; pointer-events: none; position: absolute; top: calc(var(--timeline-height)*-1 + 1em); transform: translateX(calc(var(--dateline-X) - 50%)); transition: opacity .15s ease-out, visibility .15s ease-out; visibility: visible` |
| 9578 | events-timeline | `.events-timeline .target-date-label.white` | `color: #fff` |
| 9581 | events-timeline | `.events-timeline .target-date-label.yellow` | `color: var(--spacecraft)` |
| 9584 | events-timeline | `.events-timeline .target-date-label:before` | `content: var(--formatted-date,"")` |
| 9587 | events-timeline | `.events-timeline .target-date-label.hidden` | `display: unset; opacity: 0; transition: opacity .15s ease-in .15s, visibility .15s ease-in .15s; visibility: hidden` |
| 9593 | events-timeline | `.events-timeline .event-container` | `inset: 0; opacity: 1; pointer-events: none; position: absolute; transition: opacity .25s var(--ease-out-bezier)` |
| 9600 | events-timeline | `.events-timeline.hidden .event-container` | `opacity: 0` |
| 9603 | events-timeline | `.events-timeline .marker-container` | `opacity: 1; transition: opacity .25s var(--ease-out-bezier)` |
| 9607 | events-timeline | `.events-timeline.hidden .marker-container` | `opacity: 0` |
| 9610 | events-timeline | `.events-timeline .event-static` | `width: 1px` |
| 9613 | events-timeline | `.events-timeline .event-marker, .events-timeline .event-static` | `background-color: hsla(0, 0%, 100%, .3); height: 40px; position: absolute` |
| 9619 | events-timeline | `.events-timeline .event-marker` | `border-radius: 50%; cursor: pointer` |
| 9623 | events-timeline | `.events-timeline .event-marker:before` | `background-image: radial-gradient(hsla(0, 0%, 100%, .6) 10%, transparent 70%); content: ""; height: 120%; left: 50%; opacity: 0; position: absolute; transform: translate(-50%, -10%); transition: opacity .15s ease-out; width: calc(100% + 5px)` |
| 9634 | events-timeline | `.events-timeline .event-marker:after` | `border: 1px solid #fff; border-radius: 3px; content: var(--event-name,""); font-size: .8em; line-height: 1em; opacity: 0; padding: .5em .8em; position: absolute; top: -2.5em; transform: translateX(var(--event-offset-x,-50%)); transition: opacity .1s ease-in, visibility .1s ease-in; visibility: hidden; white-space: nowrap` |
| 9649 | events-timeline | `.events-timeline .event-marker.active:before` | `opacity: 1; transition: opacity .3s ease-out` |
| 9653 | events-timeline | `.events-timeline .event-marker.active:after` | `opacity: 1; transition: opacity .25s ease-out .3s, visibility .25s ease-out .3s; visibility: visible` |
| 9658 | events-timeline | `.events-timeline .cluster-marker` | `bottom: 0; display: flex; height: 100%; justify-content: center; position: absolute; transition: all .15s ease-out` |
| 9665 | events-timeline | `.events-timeline .cluster-marker › &.cluster-dashed-line:not(.active)` | `background: repeating-linear-gradient( gray, gray 4px, transparent 0, transparent 5px)` |
| 9673 | events-timeline | `.events-timeline .cluster-marker › &.active` | `background-color: #fff; height: 120%` |
| 9676 | events-timeline | `.events-timeline .cluster-marker › &.active › &:not(.single-event)` | `height: 100%` |
| 9681 | events-timeline | `.events-timeline .hidden-marker` | `display: none` |
| 9684 | events-timeline | `.events-timeline .cluster-num-events` | `align-self: center; background-color: #fff; border-radius: .2em; color: #000; display: grid; font-size: .7em; height: 1.5em; padding: .7em; place-content: center; width: 1em` |
| 9695 | events-timeline | `.events-timeline .cluster-num-events › &.single-event` | `background-color: transparent` |
| 9699 | events-timeline | `.events-timeline .cluster-marker:before` | `background-image: radial-gradient(hsla(0, 0%, 100%, .8) 10%, transparent 80%); content: ""; height: 125%; left: 50%; opacity: 0; position: absolute; transform: translate(-50%, -10%); transition: opacity .15s ease-out; width: calc(100% + 6px)` |
| 9710 | events-timeline | `.events-timeline .cluster-marker.active` | `backdrop-filter: brightness(1.5); box-shadow: 0 0 6px #fff` |
| 9714 | events-timeline | `.events-timeline .cluster-marker.active:before` | `transition: opacity .3s ease-out` |
| 9717 | events-timeline | `.events-timeline .cluster-line` | `border-radius: 20%; height: 40px; opacity: 1; pointer-events: none; position: absolute; width: 1px` |
| 9725 | events-timeline | `.events-timeline .cluster-line.white` | `background-color: #fff; box-shadow: 0 0 2px .5px #fff` |
| 9729 | events-timeline | `.events-timeline .cluster-line.yellow` | `background-color: var(--spacecraft); box-shadow: none; opacity: .7` |
| 9734 | events-timeline | `.events-timeline .cluster-line.hidden-slow` | `display: unset; opacity: 0; transition: opacity 1s ease-in 1s` |
| 9739 | events-timeline | `.events-timeline .focus-container` | `--fpMarker-scaleX: 0.08; bottom: 135%; display: flex; height: 100%; opacity: 1; position: absolute; text-align: center; transition: all .25s ease-in-out; visibility: visible; width: 100%` |
| 9751 | events-timeline | `.events-timeline .focus-container:before` | `bottom: -10px; content: ""; height: 10px; position: absolute; width: 100%` |
| 9758 | events-timeline | `.events-timeline .focus-container:after` | `border: 9px solid transparent; bottom: 0; content: ""; left: var(--fpMarker-X,50%); pointer-events: none; position: absolute; transform: translate(-50%, 100%); transition: left .2s ease-out` |
| 9768 | events-timeline | `.events-timeline .focus-container.hidden` | `opacity: 0; pointer-events: none; transition: all .2s ease-in-out; visibility: hidden` |
| 9774 | events-timeline | `.events-timeline .fp-mask` | `flex-grow: 15; position: relative` |
| 9778 | events-timeline | `.events-timeline .focus-content` | `height: 100%; pointer-events: none; transform-origin: var(--fpMarker-X) 70% 0` |
| 9783 | events-timeline | `.events-timeline .fp-arrow` | `background-color: #282828; flex: 1 1 10px; padding: 0; position: relative` |
| 9789 | events-timeline | `.events-timeline .fp-arrow:before` | `border: .6em solid transparent; content: ""; opacity: .6; position: absolute; top: 50%; transition: opacity .2s ease-in .1s` |
| 9797 | events-timeline | `.events-timeline .fp-arrow:after` | `bottom: 10%; content: ""; height: 80%; position: absolute; width: 10px` |
| 9804 | events-timeline | `.events-timeline .fp-arrow.left:before` | `border-right-color: #fff; transform: translate(-75%, -50%)` |
| 9808 | events-timeline | `.events-timeline .fp-arrow.right:before` | `border-left-color: #fff; transform: translate(-25%, -50%)` |
| 9812 | events-timeline | `.events-timeline .fp-arrow.left:after` | `border-right: 1px solid hsla(0, 0%, 100%, .15); right: 0` |
| 9816 | events-timeline | `.events-timeline .fp-arrow.right:after` | `border-left: 1px solid hsla(0, 0%, 100%, .15); left: 0` |
| 9820 | events-timeline | `.events-timeline .fp-arrow:active:before` | `opacity: 1; transition: none` |
| 9824 | events-timeline | `.events-timeline .focus-content .event-line` | `background-color: #b4b4b4; border-radius: 25%; bottom: 0; cursor: pointer; height: 100%; opacity: 1; pointer-events: all; position: absolute; transform: translateX(-50%); transition: transform 1s cubic-bezier(.3, 0, 0, 1), height .2s ease-out .25s, bottom .2s ease-out .25s, opacity .1s ease-in .1s; visibility: visible` |
| 9841 | events-timeline | `.events-timeline .focus-content .event-line:before` | `content: ""; height: 120%; left: 50%; opacity: 0; position: absolute; transform: translate(-50%, -10%); transition: opacity .1s ease-in .1s; width: calc(100% + 5px)` |
| 9851 | events-timeline | `.events-timeline .event-line` | `background-color: #b4b4b4; border-radius: 25%; bottom: 10%; cursor: pointer; height: 100%; opacity: 1; pointer-events: all; position: absolute; transform: translateX(-50%); transition: transform 1s cubic-bezier(.3, 0, 0, 1), height .2s ease-out .25s, bottom .2s ease-out .25s, opacity .1s ease-in .1s; visibility: visible` |
| 9868 | events-timeline | `.events-timeline .event-line:before` | `content: ""; height: 120%; left: 50%; opacity: 0; position: absolute; transform: translate(-50%, -10%); transition: opacity .1s ease-in .1s; width: calc(100% + 5px)` |
| 9878 | events-timeline | `.events-timeline .focus-content .event-line.active` | `backdrop-filter: brightness(1.5); box-shadow: 0 0 6px #fff; height: 120%; transition: transform .5s cubic-bezier(.3, 0, 0, 1), height .2s ease-out, bottom .2s linear .25s, background-color .2s ease-out` |
| 9888 | events-timeline | `.events-timeline .focus-content .event-line.active:before` | `transition: opacity .2s ease-out` |
| 9891 | events-timeline | `.events-timeline .focus-content .event-line.active:after` | `opacity: 1; transition: opacity .25s ease-out .25s, visibility .25s ease-out .25s; visibility: visible` |
| 9896 | events-timeline | `.events-timeline .event-line.active` | `background-color: #fff; height: 70%; transition: transform .5s cubic-bezier(.3, 0, 0, 1), height .2s ease-out, bottom .2s linear .25s, background-color .2s ease-out` |
| 9905 | events-timeline | `.events-timeline .event-line.active:before` | `opacity: 1; transition: opacity .2s ease-out` |
| 9909 | events-timeline | `.events-timeline .event-line.active:after` | `opacity: 1; transition: opacity .25s ease-out .25s, visibility .25s ease-out .25s; visibility: visible` |
| 9914 | events-timeline | `.events-timeline .focus-content .event-line.left:after` | `transform: translateX(-105%)` |
| 9917 | events-timeline | `.events-timeline .focus-content .event-line.right:after` | `transform: translateX(5%)` |
| 9920 | events-timeline | `.events-timeline .event-line.left:after` | `transform: translateX(-105%)` |
| 9923 | events-timeline | `.events-timeline .event-line.right:after` | `transform: translateX(5%)` |
| 9926 | events-timeline | `.events-timeline .hidden .event-line, .events-timeline .hidden .focus-content .event-line` | `pointer-events: none` |
| 9930 | events-timeline | `.events-timeline .event-line.hidden, .events-timeline .focus-content .event-line.hidden` | `display: unset; opacity: 0; transform: translateX(calc(var(--fpMarker-X) - 50%)) scaleX(0); transition: all .2s ease-in; visibility: hidden` |
| 9938 | events-timeline | `.events-timeline .focus-target-line` | `background-color: var(--spacecraft); border-radius: 50% 50% 0 0; bottom: 17%; height: 20px; opacity: 1; pointer-events: none; position: absolute; transform: translateX(var(--fp-dateline-X)); transition: opacity .2s ease-out; width: 1px` |
| 9950 | events-timeline | `.events-timeline .focus-target-line.hidden` | `display: unset; opacity: 0; transition: opacity .1s ease-in` |
| 9955 | events-timeline | `.events-timeline .focus-target-line.hidden-slow` | `display: unset; opacity: 0; transition: opacity 1s ease-in 1s` |
| 9960 | events-timeline | `.events-timeline .focus-viewing-line` | `bottom: 15%; height: 20px; opacity: 1; pointer-events: none; position: absolute; transform: translateX(calc(var(--fp-viewingline-X) - 50%)); transition: opacity .3s ease-out .3s, visibility .3s ease-out .3s, transform .5s ease-out; visibility: visible; width: 1px` |
| 9974 | events-timeline | `.events-timeline .focus-viewing-line:after` | `border: 6px solid transparent; border-bottom: 6px solid var(--spacecraft); border-radius: 6px; bottom: 0; content: ""; left: 50%; position: absolute; transform: translateX(-50%); width: 1px` |
| 9985 | events-timeline | `.events-timeline .focus-viewing-line.hidden` | `display: unset; opacity: 0; transition: none; visibility: hidden` |
| 9991 | events-timeline | `.events-timeline .fp-details` | `position: absolute; transform: translateX(var(--focus-X)); transition: opacity .2s ease-out .2s, visibility .2s ease-out .2s, transform .2s ease-out` |
| 9999 | events-timeline | `.events-timeline .fp-details > h2` | `filter: brightness(1.2); font-size: 1rem; font-weight: 500; height: 50%; margin-top: .5em` |
| 10007 | events-timeline | `@media only screen and (min-width: 320px) and (max-width: 1025px) › .events-timeline .fp-details` | `background-color: #24273b; height: 100%; left: 0; opacity: 1; transform: translateX(0); width: 100%` |
| 10016 | events-timeline | `.events-timeline .fp-details > time` | `color: var(--grayMed); font-weight: 300; opacity: .85; text-transform: uppercase` |
| 10022 | events-timeline | `.events-timeline .fp-details > button` | `background: var(--darkGrayGradientLeft); border-radius: 6px; bottom: 0; line-height: 0; padding: .3em .7em; position: absolute; right: 0; transition: box-shadow 50ms var(--ease-out-bezier)` |
| 10032 | events-timeline | `.events-timeline .fp-details > button > span` | `background-position: unset; color: var(--gray); filter: drop-shadow(0 2px 8px rgba(0, 0, 0, .5)) brightness(1.5); line-height: 1.1; text-align: right; transition-duration: .2s; transition-property: filter, transform; transition-timing-function: var(--ease-out-bezier); width: 54px` |
| 10043 | events-timeline | `.events-timeline .fp-details > button:after` | `background: linear-gradient( 180deg, #6e6e72, #464647); border-radius: 6.7px; content: ""; inset: -1px; position: absolute; transition: filter .2s var(--ease-out-bezier); z-index: -1` |
| 10056 | events-timeline | `.events-timeline .fp-details > button:active` | `box-shadow: inset 0 4px 4px rgba(0, 0, 0, .5)` |
| 10059 | events-timeline | `.events-timeline .fp-details > button:active:after` | `filter: brightness(.5); transition-duration: 50ms` |
| 10063 | events-timeline | `.events-timeline .fp-details > button:active > span` | `filter: brightness(1.2); transform: scale(.95); transition-duration: 50ms` |
| 10068 | events-timeline | `.events-timeline .fp-details.yellow > h2, .events-timeline .fp-details.yellow > time` | `color: var(--spacecraft)` |
| 10072 | events-timeline | `.events-timeline .fp-details.yellow > button:after, .events-timeline .fp-details.yellow > button > span` | `filter: sepia(1) saturate(2) contrast(1.1) brightness(.9)` |
| 10076 | events-timeline | `.events-timeline .fp-details.yellow > button:active:after` | `filter: sepia(1) saturate(2) contrast(1.1) brightness(.5)` |
| 10079 | events-timeline | `.events-timeline .focus-ticks-container` | `bottom: 0; height: 50%; left: 0; opacity: 1; pointer-events: none; position: absolute; visibility: visible; width: 100%; z-index: -1` |
| 10090 | events-timeline | `.events-timeline .focus-ticks` | `backface-visibility: hidden; display: flex; font-size: .3em; font-weight: 900; justify-content: center; letter-spacing: .8em; line-height: 1em; pointer-events: all; position: relative; top: 70%; transform: translateX(0); transform-origin: var(--fpMarker-X) 50% 0` |
| 10104 | events-timeline | `.events-timeline .focus-ticks:after` | `bottom: -10px; content: ""; cursor: pointer; left: -50%; position: absolute; right: -50%; top: -10px` |
| 10113 | events-timeline | `.events-timeline .hidden .focus-ticks` | `pointer-events: none` |
| 10116 | events-timeline | `.events-timeline .focus-line` | `background-color: #fff; height: 4px; -webkit-mask-image: linear-gradient( 180deg, transparent 0, #fff 30%, #fff 70%, transparent); mask-image: linear-gradient( 180deg, transparent 0, #fff 30%, #fff 70%, transparent); opacity: .6; pointer-events: none; position: absolute; top: 68%; transition: opacity .1s linear .1s, visibility .1s linear .1s; visibility: visible; width: 100%` |
| 10141 | events-timeline | `.events-timeline .focus-line.hidden` | `display: unset; opacity: 0; transition: all 2s cubic-bezier(.3, 0, 0, 1) .2s; visibility: hidden` |
| 10148 | events-timeline | `@media (pointer: fine) and (hover: hover) › .events-timeline .fp-details > button` | `display: none` |
| 10152 | c-menu-container | `nav.c-menu-container` | `align-items: center; display: flex; flex-direction: column; grid-column: 1/-1; grid-row-end: 6; justify-content: flex-end; left: 0; opacity: 1; padding-top: 1rem; position: relative; transition-delay: .2s, .2s, .2s, 0s; transition-duration: .8s, .8s, .8s, .2s; transition-property: opacity, transform, gap, height; transition-timing-function: var(--ease-out-bezier); width: 100%` |
| 10181 | c-menu-container | `nav.c-menu-container.hidden` | `height: 0; opacity: 0; transform: translateY(50%); transition-delay: 0s, 0s, 0s, .4s; transition-duration: .4s, .4, .4, .2` |
| 10197 | c-menu-container | `@media only screen and (min-width: 320px) and (max-width: 1025px) › nav.c-menu-container` | `margin-bottom: 1em` |
| 10202 | c-menu-container | `@media only screen and (min-width: 1025px) and (min-height: 600px) › nav.c-menu-container` | `margin: 0 auto; max-width: 800px; transition: left .8s var(--ease-out-bezier), margin-bottom .2s .2s var(--ease-out-bezier)` |
| 10207 | offset-right | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .offset-right nav.c-menu-container` | `left: calc(var(--offset-right) + 2em); transition-delay: .3s, .2s; transition-duration: .5s, .2s` |
| 10214 | c-menu-container | `@media only screen and (orientation: landscape) and (max-height: 600px) › nav.c-menu-container` | `margin: 0 0 calc(var(--collapsible-bottom-margin)/2)` |
| 10220 | c-menu-container | `@media (pointer: fine) and (hover: hover) › @media only screen and (min-width: 1025px) and (min-height: 600px) › nav.c-menu-container.items-1.expanded-1, nav.c-menu-container.items-2.expanded-2` | `margin-bottom: -40px; transition: left .8s var(--ease-out-bezier), margin-bottom 1s .2s var(--ease-out-bezier)` |
| 10227 | c-menu-container | `nav.c-menu-container .c-menu-item` | `align-items: center; display: flex; flex-direction: column; justify-content: flex-end; min-height: 0; opacity: 1; pointer-events: all; transition-delay: 0s, 0s, .5s; transition-duration: .5s; transition-property: opacity, flex-grow, margin-bottom; transition-timing-function: var(--ease-out-bezier); width: 100%; --container-width: 100%; --container-height: 100%; --container-height-active: 100%` |
| 10250 | c-menu-container | `nav.c-menu-container .c-menu-item.hidden` | `display: flex; flex-grow: 0.001; opacity: 0` |
| 10255 | c-menu-container | `nav.c-menu-container .c-menu-item.collapsed` | `flex-grow: 0.001` |
| 10258 | c-menu-container | `nav.c-menu-container:not(.expanded-1) > div:first-child` | `margin-bottom: 1vh; transition-delay: 0s` |
| 10262 | c-menu-item | `.c-menu-item .expanded-container` | `align-items: center; display: flex; flex-direction: column; height: var(--container-height); justify-content: flex-end; opacity: 1; pointer-events: none; position: relative; transition-delay: .2s, .2s, .2s, 0s; transition-duration: .8s; transition-property: opacity, visibility, transform, height; transition-timing-function: var(--ease-out-bezier); visibility: visible; width: var(--container-width)` |
| 10286 | c-menu-item | `.c-menu-item.collapsed .expanded-container, .c-menu-item.hidden .expanded-container` | `opacity: 0; transform: translateY(50%); transition-delay: 0s, 0s, 0s, .5s; transition-duration: .5s; visibility: hidden` |
| 10298 | expanded-container | `.expanded-container button.item-collapse-btn` | `backdrop-filter: blur(8px); background-color: rgba(50, 50, 50, .5); border-radius: 1.1em; bottom: 3%; font-size: medium; height: 2em; opacity: 0; padding: 1.1em; pointer-events: none; position: absolute; right: -3em; transition: opacity .5s var(--ease-out-bezier); width: 2em` |
| 10313 | expanded-container | `.expanded-container button.item-collapse-btn.hidden` | `display: unset; opacity: 0; transition-duration: .3s` |
| 10318 | expanded-container | `.expanded-container button.item-collapse-btn:before` | `content: ""; inset: -.5em -.5em -.5em -1.5em; position: absolute` |
| 10323 | c-menu-item | `.c-menu-item button.item-toggle-btn` | `bottom: -4em; color: var(--gray); opacity: 1; padding: 1em 0 0; position: absolute; text-transform: uppercase; transition-delay: .5s, 0s, 0s, .5s, .5s, .5s; transition-duration: .5s, .5s, .2s, .3s, .3s, .3s; transition-property: opacity, visibility, color, left, right, transform; transition-timing-function: var(--ease-out-bezier); visibility: visible; white-space: nowrap; width: -moz-fit-content; width: fit-content; z-index: 20` |
| 10358 | c-menu-item | `.c-menu-item button.item-toggle-btn:after` | `border-radius: .1em; bottom: 25%; box-shadow: -.2em .2em 0 0 var(--gray); content: ""; height: 1em; left: 50%; position: absolute; transform: translate(-50%, -120%) scaleY(.5) rotate(-45deg); transition: transform .3s .2s var(--ease-out-bezier); width: 1em` |
| 10370 | c-menu-item | `.c-menu-item.expanded button.item-toggle-btn` | `filter: brightness(1.5)` |
| 10373 | c-menu-item | `.c-menu-item.collapsed button.item-toggle-btn:after` | `transform: translate(-50%, -70%) scaleY(-.5) rotate(-45deg)` |
| 10376 | c-menu-container | `nav.c-menu-container.items-2 > div:first-child button.item-toggle-btn` | `left: 25%; transform: translateX(-50%)` |
| 10380 | c-menu-container | `nav.c-menu-container.items-2 > div:nth-child(2) button.item-toggle-btn` | `right: 35%; transform: translateX(50%)` |
| 10385 | c-menu-item | `@media only screen and (min-width: 641px) › .c-menu-item button.item-toggle-btn` | `bottom: -3.7em` |
| 10388 | c-menu-container | `@media only screen and (min-width: 641px) › nav.c-menu-container.items-2 > div:first-child button.item-toggle-btn` | `left: max(50px, 20%)` |
| 10391 | c-menu-container | `@media only screen and (min-width: 641px) › nav.c-menu-container.items-2 > div:nth-child(2) button.item-toggle-btn` | `right: max(150px, 15%)` |
| 10396 | c-menu-container | `@media only screen and (orientation: landscape) and (max-height: 600px) › nav.c-menu-container .c-menu-item` | `pointer-events: none` |
| 10399 | c-menu-item | `@media only screen and (orientation: landscape) and (max-height: 600px) › .c-menu-item button.item-toggle-btn` | `bottom: -3.5em` |
| 10404 | c-menu-item | `@media (pointer: fine) and (hover: hover) › .c-menu-item:hover button.item-collapse-btn` | `opacity: 1; pointer-events: all; z-index: 1` |
| 10410 | c-menu-item | `@media (pointer: fine) and (hover: hover) › @media only screen and (min-width: 1025px) and (min-height: 600px) › .c-menu-item.expanded button.item-toggle-btn` | `opacity: 0; transition-duration: .2s; visibility: hidden` |
| 10415 | c-menu-container | `@media (pointer: fine) and (hover: hover) › @media only screen and (min-width: 1025px) and (min-height: 600px) › nav.c-menu-container.items-2.expanded-1 > div:first-child button.item-toggle-btn` | `left: 50%; transform: translateX(-50%); transition-delay: .2s, .2s, 0s, 0s, 0s, 0s; transition-duration: .2s, .2s, .2s, .5s .5s .5s` |
| 10431 | c-menu-container | `@media (pointer: fine) and (hover: hover) › @media only screen and (min-width: 1025px) and (min-height: 600px) › nav.c-menu-container.items-2.expanded-1 > div:nth-child(2) button.item-toggle-btn` | `right: 50%; transform: translateX(50%); transition-delay: .2s, .2s, 0s, 0s, 0s, 0s; transition-duration: .2s, .2s, .2s, .5s .5s .5s` |
| 10448 | c-menu-item | `@media (pointer: fine) and (hover: hover) › .c-menu-item button.item-toggle-btn:hover` | `color: var(--white)` |
| 10451 | c-menu-item | `@media (pointer: fine) and (hover: hover) › .c-menu-item.collapsed button.item-toggle-btn:hover:after` | `box-shadow: -.2em .2em 0 0 var(--white); transform: translate(-50%, -80%) scaleY(-.5) rotate(-45deg); transition: transform .2s var(--ease-out-bezier)` |
| 10457 | time-controls | `nav.time-controls` | `align-items: center; align-self: flex-end; display: flex; flex-direction: column; margin-bottom: var(--collapsible-bottom-margin); padding: 0 20px; pointer-events: auto; text-align: center; width: 100%` |
| 10468 | time-controls | `nav.time-controls h3.rate` | `filter: drop-shadow(0 0 2px rgb(255 255 255/60%)); text-transform: uppercase; transform: translateY(150%) scale(.7); transition-duration: 1s; transition-property: transform, padding; transition-timing-function: var(--ease-out-bezier)` |
| 10476 | time-controls | `nav.time-controls.live h3.rate` | `color: var(--live); filter: drop-shadow(0 0 2px var(--liveAlpha))` |
| 10480 | time-controls | `nav.time-controls.paused h3.rate` | `color: var(--paused); filter: drop-shadow(0 0 2px var(--pausedAlpha))` |
| 10484 | time-controls | `nav.time-controls .rate-controls` | `align-items: center; display: flex; justify-content: space-between; max-width: 160px; opacity: 0; position: relative; transition-duration: .7s; transition-property: opacity, visibility; transition-timing-function: var(--ease-out-bezier); visibility: hidden; width: 80%; z-index: 20` |
| 10498 | touch | `.touch nav.time-controls .rate-controls, .touch nav.time-controls h3.rate` | `transition-delay: 0s` |
| 10502 | rate-controls | `.rate-controls button` | `background: var(--darkGrayGradientLeft); border-radius: 6px; line-height: 0; padding: 0; position: relative; transition: box-shadow 50ms var(--ease-out-bezier)` |
| 10510 | rate-controls | `.rate-controls button:after` | `background: linear-gradient( 180deg, #6e6e72, #464647); border-radius: 6.7px; content: ""; inset: -1px; position: absolute; transition: filter .2s var(--ease-out-bezier); z-index: -1` |
| 10523 | rate-controls | `.rate-controls button > span` | `filter: drop-shadow(0 2px 8px rgb(0 0 0/50%)); transition-duration: .2s; transition-property: filter, transform; transition-timing-function: var(--ease-out-bezier)` |
| 10529 | rate-controls | `.rate-controls button > span.decrease` | `transform: scaleX(-1)` |
| 10532 | time-controls | `nav.time-controls.touchactive h3.rate` | `backdrop-filter: blur(8px); transform: translateY(-50%); transition-duration: .5s` |
| 10537 | time-controls | `nav.time-controls.touchactive .rate-controls` | `opacity: 1; transition-delay: .1s; transition-duration: .5s; visibility: visible` |
| 10543 | time-controls | `nav.time-controls.touchactive + time` | `left: 9%; width: 81%` |
| 10548 | time-controls | `@media only screen and (orientation: landscape) and (max-height: 600px) › nav.time-controls.touchactive h3.rate` | `transform: translateY(0)` |
| 10553 | time-controls | `@media (pointer: fine) and (hover: hover) › nav.time-controls:hover h3.rate` | `transform: translateY(-40%); transition: transform .5s var(--ease-out-bezier)` |
| 10557 | time-controls | `@media (pointer: fine) and (hover: hover) › nav.time-controls:hover .rate-controls` | `opacity: 1; transition-delay: .1s; transition-duration: .5s; visibility: visible` |
| 10563 | rate-controls | `@media (pointer: fine) and (hover: hover) › .rate-controls button:hover > span` | `filter: brightness(1.5); transform: scale(1.05); transition-duration: .4s` |
| 10568 | rate-controls | `@media (pointer: fine) and (hover: hover) › .rate-controls button:hover > span.decrease` | `transform: scale(-1.05, 1.05)` |
| 10571 | rate-controls | `@media (pointer: fine) and (hover: hover) › .rate-controls button:hover:after` | `filter: brightness(1.5); transition-duration: .4s` |
| 10576 | rate-controls | `.rate-controls button:active` | `box-shadow: inset 0 4px 4px rgba(0, 0, 0, .5)` |
| 10579 | rate-controls | `.rate-controls button:active:after` | `filter: brightness(.5); transition-duration: 50ms` |
| 10583 | rate-controls | `.rate-controls button:active > span` | `filter: brightness(.8); transform: scale(.95); transition-duration: 50ms` |
| 10588 | rate-controls | `.rate-controls button:active > span.decrease` | `transform: scale(-.95, .95)` |
| 10591 | time-controls | `nav.time-controls .slider-container` | `height: 50px; pointer-events: none; position: relative; width: 100%` |
| 10597 | time-controls | `nav.time-controls input.slider-input` | `-webkit-appearance: none; -moz-appearance: none; appearance: none; background: transparent; bottom: 0; left: -17px; margin: 0; outline: none; pointer-events: none; position: absolute; width: calc(100% + 34px)` |
| 10610 | time-controls | `nav.time-controls input.slider-input::-webkit-slider-thumb` | `-webkit-appearance: none; appearance: none; background-color: transparent; border-radius: 21px; cursor: grab; height: 42px; margin-bottom: -21px; pointer-events: auto; transform: translateY(var(--knobOffsetY)); width: 42px` |
| 10622 | time-controls | `nav.time-controls input.slider-input::-moz-range-thumb` | `-moz-appearance: none; appearance: none; background: transparent; border: none; border-radius: 16px; cursor: grab; height: 32px; pointer-events: auto; transform: translateY(calc(var(--knobOffsetY) + 11px)); width: 32px` |
| 10634 | time-controls | `nav.time-controls input.slider-input::-ms-thumb` | `cursor: grab; pointer-events: auto; transform: scale(3.5) translateY(var(--knobOffsetY))` |
| 10639 | time-controls | `nav.time-controls input.slider-input:active::-webkit-slider-thumb` | `cursor: grabbing` |
| 10642 | time-controls | `nav.time-controls input.slider-input:active::-moz-range-thumb` | `cursor: grabbing` |
| 10645 | time-controls | `nav.time-controls input.slider-input:active::-ms-thumb` | `cursor: grabbing` |
| 10648 | time-controls | `nav.time-controls .slider-container .knob` | `backdrop-filter: blur(4px); background: radial-gradient( 50% 50% at 50% 50%, rgba(97, 96, 96, .82) 36.72%, hsla(240, 3%, 69%, .24) 51.3%, hsla(240, 1%, 46%, .72) 55.99%, hsla(0, 0%, 42%, .32) 79.43%, rgba(87, 87, 87, .14) 100%); border-radius: 18px; bottom: 0; box-shadow: 0 0 12px 4px rgba(0, 0, 0, .4); color: transparent; cursor: grab; display: block; height: 36px; position: absolute; transform: translate(calc(var(--knobX) - 50%), calc(var(--knobY) - 88%)); transition: transform .15s var(--ease-out-bezier); white-space: nowrap; width: 36px` |
| 10672 | time-controls | `@supports not (backdrop-filter:blur()) › nav.time-controls .slider-container .knob` | `background: radial-gradient( 50% 50% at 50% 50%, #616060 36.72%, #262627 51.3%, #505052 55.99%, #252525 79.43%, #19191b 100%)` |
| 10683 | time-controls | `nav.time-controls.live .slider-container .knob` | `background: radial-gradient( 50% 50% at 50% 50%, var(--live) 36.72%, hsla(240, 3%, 69%, .24) 51.3%, rgba(77, 118, 94, .72) 55.99%, hsla(0, 0%, 42%, .32) 79.43%, rgba(87, 87, 87, .14) 100%)` |
| 10693 | time-controls | `nav.time-controls.paused .slider-container .knob` | `background: radial-gradient( 50% 50% at 50% 50%, var(--paused) 36.72%, hsla(240, 3%, 69%, .24) 51.3%, rgba(245, 165, 95, .52) 55.99%, hsla(0, 0%, 42%, .32) 79.43%, rgba(87, 87, 87, .14) 100%)` |
| 10703 | time-controls | `nav.time-controls .slider-container .knob:active` | `cursor: grabbing` |
| 10706 | time-controls | `nav.time-controls .slider-container .knob:before` | `background: linear-gradient( 42.16deg, hsla(0, 2%, 92%, .47) 9.23%, hsla(0, 0%, 56%, .45) 50.94%); border-radius: 20px; content: ""; inset: -2px; -webkit-mask-image: radial-gradient(transparent 18px, #000 18.1px); mask-image: radial-gradient(transparent 18px, #000 18.1px); position: absolute` |
| 10719 | time-controls | `nav.time-controls.live .slider-container .knob:before` | `filter: drop-shadow(0 0 8px var(--live))` |
| 10722 | time-controls | `nav.time-controls svg.svg-parent` | `overflow: visible` |
| 10725 | time-controls | `nav.time-controls .slider-container button.realtime` | `background: radial-gradient(var(--gray) 0, var(--grayDarkAlpha) 100%); border: 2px solid var(--gray); border-radius: 50%; bottom: 4px; height: 16px; left: 50%; opacity: 1; padding: 0; position: absolute; transform: translateX(-50%) scale(.8); transition-delay: .05s; transition-duration: .5s; transition-property: opacity, visibility, transform; transition-timing-function: var(--ease-out-bezier); visibility: visible; width: 16px` |
| 10746 | time-controls | `nav.time-controls .slider-container button.realtime:after` | `content: ""; height: 300%; position: absolute; transform: translate(-50%, -50%); width: 300%` |
| 10753 | time-controls | `nav.time-controls .slider-container button.realtime.hidden` | `display: unset; opacity: 0; transform: translateX(-50%) scale(0); transition-delay: 0s; transition-duration: .3s; visibility: hidden` |
| 10761 | c-menu-item | `.c-menu-item .item-toggle-btn` | `margin-bottom: var(--collapsible-bottom-margin)` |
| 10764 | c-menu-item | `.c-menu-item .expanded-container:has(.display-container.hidden), .c-menu-item .expanded-container:has(nav.time-controls.touchactive), .c-menu-item .expanded-container:has(nav.time-controls:hover)` | `height: var(--container-height-active)` |
| 10770 | time-controls | `@media only screen and (max-width: 641px) and (orientation: portrait) › nav.time-controls` | `padding: 0 20px` |
| 10773 | time-controls | `@media only screen and (max-width: 641px) and (orientation: portrait) › nav.time-controls .rate-controls` | `width: 40%` |
| 10778 | time-controls | `@media only screen and (min-width: 961px) › nav.time-controls .rate-controls, nav.time-controls h3.rate` | `transition-delay: 1s` |
| 10783 | telescope | `.telescope` | `display: grid; grid-area: foot` |
| 10787 | telescope-view | `.telescope-view #main-viewport` | `cursor: crosshair` |
| 10790 | telescope | `.telescope .air, .telescope .surface` | `margin-top: auto` |
| 10794 | telescope | `.telescope .surface` | `margin-bottom: 0` |
| 10797 | extended-controls | `.extended-controls` | `border: none` |
| 10800 | telescope | `.telescope .surface .readout` | `display: flex` |
| 10803 | telescope | `.telescope .air .container, .telescope .surface .container` | `display: grid; margin-bottom: 20px; margin-top: auto` |
| 10809 | telescope | `.telescope .air .container` | `grid-template-columns: auto 1fr` |
| 10812 | telescope | `.telescope .surface .container` | `background: #000; display: grid; grid-template-columns: 1fr auto; margin: auto; padding: 5px 11px` |
| 10819 | telescope | `.telescope .surface .target` | `left: 50vw; position: absolute; top: 50vh; transform: translate(-50%)` |
| 10825 | telescope | `.telescope .container .title` | `display: none` |
| 10828 | telescope | `.telescope .container .exit` | `justify-self: end; opacity: .8` |
| 10832 | telescope | `.telescope .container .exit:hover` | `opacity: 1` |
| 10835 | telescope | `.telescope .container .exit .text` | `display: none` |
| 10838 | telescope | `.telescope .container .exit .icon` | `filter: brightness(1.6)` |
| 10841 | coordinate-info-icon | `.coordinate-info-icon` | `opacity: .6` |
| 10844 | coordinate-info-icon | `.coordinate-info-icon:hover` | `opacity: .8` |
| 10847 | coordinate-info-tip-popup | `.coordinate-info-tip-popup:before` | `border: 10px solid transparent; border-top: 10px solid var(--grayDark); content: ""; position: absolute; top: 3.45em` |
| 10854 | coordinate-info-tip-popup | `.coordinate-info-tip-popup` | `background: var(--grayDark); border-radius: 6px; bottom: 5em; height: 3.5em; padding: .25em; position: absolute; text-align: center; transform: translate(-1.15em); width: 20em` |
| 10865 | telescope | `.telescope .latitude, .telescope .longitude` | `margin: auto` |
| 10869 | telescope | `.telescope .latitude label, .telescope .longitude label` | `padding-right: 10px` |
| 10873 | telescope | `.telescope .latitude input, .telescope .longitude input` | `background: var(--grayDark); border: 1px solid var(--grayDark); border-radius: 3px; color: #ffffff66; font-size: 14px; max-width: 20vw; outline: none; padding: 3px 9px` |
| 10884 | telescope | `.telescope .latitude input.error, .telescope .longitude input.error` | `border: 1px solid var(--error)` |
| 10888 | telescope | `.telescope button` | `background: var(--grayDark); border: none; border-radius: 3px; opacity: .6` |
| 10894 | telescope | `.telescope button:hover` | `opacity: .8` |
| 10897 | telescope | `.telescope .icon-constellation` | `(嵌套包装)` |
| 10898 | telescope | `.telescope .icon-constellation › &.enable-constellations` | `background-position: -138px -231px; filter: brightness(2)` |
| 10903 | telescope | `.telescope .description.above` | `text-align: center; text-transform: uppercase` |
| 10907 | telescope | `.telescope .description.above, .telescope .description.surface` | `left: 50%; position: absolute; top: 100px; transform: translate(-50%)` |
| 10914 | telescope | `.telescope .description.surface` | `display: grid; grid-template-columns: 1fr 1fr; text-align: left` |
| 10919 | telescope | `.telescope .description.surface span:first-child, .telescope .description.surface span:nth-child(3)` | `border-right: 1px solid #38383b; margin-right: 10px; padding-right: 10px` |
| 10925 | telescope | `.telescope .surface .container` | `grid-template-columns: 1fr 1fr` |
| 10928 | telescope | `.telescope .surface .container .changeLocation` | `display: none` |
| 10931 | telescope | `.telescope .surface .location` | `background: var(--grayDark); border-radius: 3px; display: flex; margin-right: 10px; opacity: .6; padding: 5px 10px` |
| 10939 | telescope | `.telescope .surface .location:hover` | `opacity: .8` |
| 10942 | telescope | `.telescope .surface .location span:first-child` | `margin-right: 15px` |
| 10945 | telescope | `.telescope .surface .description` | `white-space: nowrap` |
| 10948 | telescope | `.telescope .surface .description.top` | `display: grid` |
| 10951 | telescope | `.telescope .surface .description.center` | `display: none` |
| 10954 | telescope | `.telescope.pick` | `border-radius: 3px; padding: 5px 10px; transform: translateY(-35px); z-index: 1111` |
| 10960 | telescope | `.telescope.pick, .telescope.pick button` | `background-color: rgba(37, 37, 39, .6); position: relative` |
| 10965 | telescope | `.telescope.pick button` | `margin: auto; width: 100%; z-index: 1200` |
| 10970 | telescope | `.telescope.pick div` | `white-space: nowrap` |
| 10973 | telescope | `.telescope.pick span` | `vertical-align: middle` |
| 10976 | telescope | `.telescope .tap-hint` | `display: block; left: 50%; position: absolute; top: 50%` |
| 10982 | telescope | `.telescope .tap-hint.hidden` | `display: none` |
| 10985 | telescope | `.telescope .tap-hint .circle` | `animation: tap-hint 3s infinite; backdrop-filter: blur(10px); background: var(--graydDarkAlpha); border: 2px solid hsla(0, 0%, 100%, .75); border-radius: 50px; filter: drop-shadow(0 0 2px var(--grayDark)); height: 50px; transform: translate(-50%, -50%); transform-origin: center center; width: 50px` |
| 10997 | telescope | `.telescope .tap-hint .icon` | `filter: drop-shadow(0 0 2px var(--grayDark)); left: 0; position: absolute; top: 10px; transform: scale(1.2); transform-origin: top left` |
| 11006 | KEYFRAME | `@keyframes tap-hint › 0%` | `opacity: 1; transform: translate(-50%, -50%) scale(1)` |
| 11010 | KEYFRAME | `@keyframes tap-hint › 30%` | `opacity: .5; transform: translate(-50%, -50%) scale(.7)` |
| 11014 | KEYFRAME | `@keyframes tap-hint › to` | `opacity: 1; transform: translate(-50%, -50%) scale(1)` |
| 11020 | coordinate-info-tip-popup | `@media only screen and (min-width: 320px) and (max-width: 767px) › .coordinate-info-tip-popup:before` | `left: 1.5em` |
| 11023 | coordinate-info-tip-popup | `@media only screen and (min-width: 320px) and (max-width: 767px) › .coordinate-info-tip-popup` | `bottom: 6em; left: 1.5em` |
| 11027 | coordinate-info-icon | `@media only screen and (min-width: 320px) and (max-width: 767px) › .coordinate-info-icon` | `align-self: center; grid-column-start: 1; justify-self: center` |
| 11032 | latitude | `@media only screen and (min-width: 320px) and (max-width: 767px) › .latitude` | `grid-column-start: 2` |
| 11035 | longitude | `@media only screen and (min-width: 320px) and (max-width: 767px) › .longitude` | `grid-column-start: 3` |
| 11038 | go-btn-footer | `@media only screen and (min-width: 320px) and (max-width: 767px) › .go-btn-footer` | `grid-column-start: 4` |
| 11043 | telescope | `@media only screen and (min-width: 320px) › .telescope .container .latlong` | `display: grid; gap: 5%; grid-template-columns: minmax(min-content, auto) 1fr 1fr minmax(min-content, auto)` |
| 11048 | telescope | `@media only screen and (min-width: 320px) › .telescope .air .container, .telescope .surface .container` | `gap: 5%; margin-left: max(calc(10% - 30px - 2em), 3%); margin-right: max(calc(10% - 30px - 2em), 3%)` |
| 11054 | go-btn-footer | `@media only screen and (min-width: 320px) › .go-btn-footer` | `width: 4em` |
| 11059 | telescope | `@media only screen and (min-width: 320px) and (orientation: landscape), only screen and (min-width: 641px) and (orientation: portrait) › .telescope .container .latlong` | `gap: 20px` |
| 11062 | telescope | `@media only screen and (min-width: 320px) and (orientation: landscape), only screen and (min-width: 641px) and (orientation: portrait) › .telescope .air .container, .telescope .surface .container` | `gap: 20px; margin-left: 20px; margin-right: 20px` |
| 11068 | go-btn-footer | `@media only screen and (min-width: 320px) and (orientation: landscape), only screen and (min-width: 641px) and (orientation: portrait) › .go-btn-footer` | `width: 5em` |
| 11073 | coordinate-info-tip-popup | `@media only screen and (min-width: 768px) and (max-width: 1024px) › .coordinate-info-tip-popup:before` | `left: 1.5em` |
| 11076 | coordinate-info-tip-popup | `@media only screen and (min-width: 768px) and (max-width: 1024px) › .coordinate-info-tip-popup` | `bottom: 6em` |
| 11081 | telescope | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .telescope .container .latlong` | `display: flex; margin: auto` |
| 11085 | telescope | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .telescope .surface .description.top` | `display: none` |
| 11088 | telescope | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .telescope .surface .description.center` | `display: grid` |
| 11091 | telescope | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .telescope .air .container` | `grid-template-columns: 1fr auto 1fr` |
| 11094 | telescope | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .telescope .surface .container .middle` | `display: flex` |
| 11097 | telescope | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .telescope .surface .location` | `margin-right: 19px` |
| 11100 | telescope | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .telescope .surface .container .changeLocation` | `display: unset; margin: auto; padding-right: 15px; z-index: 1` |
| 11106 | telescope | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .telescope .surface .container` | `grid-template-columns: 1fr auto 1fr` |
| 11109 | telescope | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .telescope .container .title` | `display: unset; margin: auto 0; text-transform: uppercase; z-index: 1` |
| 11115 | telescope | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .telescope .container .exit` | `align-items: center; display: flex; margin-left: auto; margin-right: unset` |
| 11121 | telescope | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .telescope .container .exit .text` | `display: unset; padding-right: 5px; text-transform: uppercase` |
| 11126 | telescope | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .telescope .container` | `display: grid; grid-template-columns: 1fr auto 1fr; margin-top: auto` |
| 11131 | telescope | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .telescope .latitude, .telescope .longitude` | `display: unset; margin: auto; padding-right: 20px` |
| 11137 | telescope | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .telescope .latitude input, .telescope .longitude input` | `max-width: 100px` |
| 11141 | telescope | `@media only screen and (min-width: 1025px) and (min-height: 600px) › .telescope .container .title .vertical` | `border-right: 1px solid var(--grayDark); display: table-cell; padding-right: 20px; width: 100%` |
### `eyes/shell/preload.css` 结构与完整证据

PostCSS解析成功；6022 UTF-8 bytes；45 rule节点；157 declaration；3 media块（去重3）；0 important；2变量定义；5不同变量引用；1 url()。

#### @media 完整目录

| 行 | 条件 | 直属/后代规则数 | 改动属性集合 |
|---|---|---:|---|
| 96 | `only screen and (max-width: 960px)` | 2 | height, width, font-size |
| 105 | `only screen and (max-width: 660px)` | 1 | height, width |
| 111 | `only screen and (max-height: 550px)` | 1 | height, width |

#### 变量定义（含局部scope）

| 行 | scope | 定义 |
|---|---|---|
| 134 | `#embed-overlay` | `--loading-blue: #288bff` |
| 135 | `#embed-overlay` | `--load-percent: 0%` |

变量引用 → 全部源码行：

- `--ease-out-bezier` → 11, 131, 175, 179, 190, 200, 222, 235, 260
- `--grayDark` → 182
- `--loading-blue` → 194, 239
- `--load-percent` → 201
- `--grayLight` → 241

#### 字体 / keyframes / 其他 at-rule

| 行 | 声明与完整子规则 |
|---|---|
| 71 | `@keyframes load { 0% { margin-left: 0; margin-right: 100%; } 50% { margin-left: 25%; margin-right: 0; } to { margin-left: 100%; margin-right: 0; } }` |
| 85 | `@keyframes fadeInDelayed { 0% { opacity: 0; } 75% { opacity: 0; } to { opacity: 1; } }` |
| 155 | `@supports not (backdrop-filter:blur()) { #embed-overlay.show.loading { background-color: rgba(0, 0, 0, .8); } #embed-overlay.show.interact { backdrop-filter: rgba(0, 0, 0, .3); } }` |
| 207 | `@keyframes interactanimation { 0% { transform: translateX(-25%); } to { transform: translateX(25%); } }` |

font-family实际调用：


#### URL（仅本地源码字符串，没有fetch）

| 行 | 属性 | URL |
|---|---|---|
| 29 | background-image | `https://eyes.nasa.gov/apps/solar-system/assets/default/svg/nasa_logo.svg` |

#### !important完整声明

| 行 | 上下文 | 值 |
|---|---|---|

#### z-index完整声明

| 行 | 上下文 | 值 |
|---|---|---|
| 6 | `#loading-screen` | `z-index: 2` |
| 133 | `#embed-overlay` | `z-index: 2` |

#### 全selector目录：行号 / 类前缀家族 / 祖先上下文 / 全部直接声明

每条规则按自身 selector 和完整父链定位；嵌套子规则另外列出。keyframes帧属于动画，不是DOM选择器；GLOBAL规则无class并不代表无作用。源码逗号、`:is/:not/:has`、伪元素保留原义。无直接声明表示仅包装子规则，不是空功能。

| 行 | 家族 | 上下文（含完整selector） | 直接属性和值 |
|---|---|---|---|
| 1 | loading-screen | `#loading-screen` | `background: #000; inset: 0; pointer-events: none; position: fixed; z-index: 2` |
| 8 | loading-screen-wrapper | `#loading-screen-wrapper` | `animation: fadeInDelayed .8s linear; opacity: 0; transition: opacity .5s var(--ease-out-bezier), visibility .5s var(--ease-out-bezier); visibility: hidden` |
| 14 | show | `.show > #loading-screen-wrapper` | `opacity: 1; visibility: visible` |
| 18 | loading-screen-container | `#loading-screen-container` | `text-align: center; top: 50%` |
| 22 | loading-screen-container | `#loading-screen-container, #loading-screen-logo` | `left: 50%; position: absolute; transform: translateX(-50%) translateY(-50%)` |
| 28 | loading-screen-logo | `#loading-screen-logo` | `background-image: url(https://eyes.nasa.gov/apps/solar-system/assets/default/svg/nasa_logo.svg); background-repeat: no-repeat; background-size: contain; height: 110px; opacity: .7; top: 15%; width: 110px` |
| 37 | loading-screen-text | `#loading-screen-text` | `font-size: 22px; font-weight: 200; letter-spacing: 5px; text-transform: uppercase` |
| 43 | loading-screen-bar | `#loading-screen-bar` | `background: hsla(0, 0%, 100%, .5); border-radius: 4px; height: 4px; margin-top: 20px; max-width: 85vw; overflow: hidden; width: 200px` |
| 52 | loading-screen-bar | `#loading-screen-bar:after` | `animation: load 2s cubic-bezier(.4, 0, .2, 1) infinite; background: #fff; content: ""; display: block; height: 4px` |
| 59 | loading-screen-stars1 | `#loading-screen-stars1` | `background: transparent; height: 2px; pointer-events: none; width: 2px` |
| 65 | loading-screen-stars2 | `#loading-screen-stars2` | `background: transparent; height: 1px; pointer-events: none; width: 1px` |
| 72 | KEYFRAME | `@keyframes load › 0%` | `margin-left: 0; margin-right: 100%` |
| 76 | KEYFRAME | `@keyframes load › 50%` | `margin-left: 25%; margin-right: 0` |
| 80 | KEYFRAME | `@keyframes load › to` | `margin-left: 100%; margin-right: 0` |
| 86 | KEYFRAME | `@keyframes fadeInDelayed › 0%` | `opacity: 0` |
| 89 | KEYFRAME | `@keyframes fadeInDelayed › 75%` | `opacity: 0` |
| 92 | KEYFRAME | `@keyframes fadeInDelayed › to` | `opacity: 1` |
| 97 | loading-screen-logo | `@media only screen and (max-width: 960px) › #loading-screen-logo` | `height: 90px; width: 90px` |
| 101 | loading-screen-text | `@media only screen and (max-width: 960px) › #loading-screen-text` | `font-size: 18px` |
| 106 | loading-screen-logo | `@media only screen and (max-width: 660px) › #loading-screen-logo` | `height: 80px; width: 80px` |
| 112 | loading-screen-logo | `@media only screen and (max-height: 550px) › #loading-screen-logo` | `height: 70px; width: 70px` |
| 117 | embed-overlay | `#embed-overlay` | `align-items: center; backdrop-filter: blur(0); background-color: rgba(0, 0, 0, .2); display: flex; inset: 0; justify-content: center; opacity: 0; position: fixed; transition-duration: .5s; transition-property: backdrop-filter, opacity, visibility; transition-timing-function: var(--ease-out-bezier); visibility: hidden; z-index: 2; --loading-blue: #288bff; --load-percent: 0%` |
| 137 | embed-overlay | `#embed-overlay.show` | `opacity: 1; visibility: visible` |
| 141 | embed-overlay | `#embed-overlay.show.loading` | `backdrop-filter: blur(.5rem)` |
| 144 | embed-overlay | `#embed-overlay.show.view` | `backdrop-filter: blur(.3rem)` |
| 147 | embed-overlay | `#embed-overlay.show.interact` | `pointer-events: none; transition-delay: .6s` |
| 151 | embed-overlay | `#embed-overlay.view, body:has(#embed-overlay.interact)` | `cursor: pointer` |
| 156 | embed-overlay | `@supports not (backdrop-filter:blur()) › #embed-overlay.show.loading` | `background-color: rgba(0, 0, 0, .8)` |
| 159 | embed-overlay | `@supports not (backdrop-filter:blur()) › #embed-overlay.show.interact` | `backdrop-filter: rgba(0, 0, 0, .3)` |
| 163 | embed-overlay | `#embed-overlay > .embed-wrapper` | `align-items: center; display: flex; flex-direction: column; justify-content: center; min-width: 15rem; position: relative` |
| 171 | embed-overlay | `#embed-overlay img.embed-interact` | `animation: interactanimation 2s linear infinite alternate-reverse; height: clamp(5rem, min(15vw, 15vh), 8rem); opacity: 0; transition: opacity .5s var(--ease-out-bezier)` |
| 177 | embed-overlay | `#embed-overlay.interact img.embed-interact` | `opacity: 1; transition: opacity .5s var(--ease-out-bezier) 1s` |
| 181 | embed-overlay | `#embed-overlay .embed-loader` | `background-color: var(--grayDark); border-radius: .25rem; height: .5rem; opacity: 0; position: relative; transition-delay: 1.5s; transition-duration: .5s; transition-property: margin-top, opacity; transition-timing-function: var(--ease-out-bezier); width: 100%` |
| 193 | embed-overlay | `#embed-overlay .embed-loader:after` | `background-color: var(--loading-blue); border-radius: .25rem; content: ""; height: .5rem; left: 0; position: absolute; transition: width 1s var(--ease-out-bezier); width: var(--load-percent)` |
| 203 | embed-overlay | `#embed-overlay.loading .embed-loader` | `margin-top: 5vh; opacity: 1` |
| 208 | KEYFRAME | `@keyframes interactanimation › 0%` | `transform: translateX(-25%)` |
| 211 | KEYFRAME | `@keyframes interactanimation › to` | `transform: translateX(25%)` |
| 215 | embed-overlay | `#embed-overlay span` | `opacity: 0` |
| 218 | embed-overlay | `#embed-overlay span.loader-text` | `font-size: min(1.8rem, min(5.5vh, 5.5vw)); line-height: min(2rem, min(7vh, 7vw)); text-align: center; transition: opacity .5s var(--ease-out-bezier) 1.5s; word-break: break-word` |
| 225 | embed-overlay | `#embed-overlay span.interact-text` | `font-size: min(1.5rem, min(5vh, 5vw)); font-weight: 600; left: 50%; line-height: min(1.6rem, min(6vh, 6vw)); margin-top: 5vh; position: absolute; text-align: center; top: clamp(5rem, min(15vw, 15vh), 8rem); transform: translateX(-50%); transition: opacity .5s var(--ease-out-bezier) 1s; width: 100%` |
| 238 | embed-overlay | `#embed-overlay button.view-btn` | `border: .1em solid var(--loading-blue); border-radius: .5em; color: var(--grayLight); filter: brightness(.7); font-size: min(1.8rem, min(5.5vh, 5.5vw)); font-weight: 900; line-height: min(2rem, min(7vh, 7vw)); opacity: 0; padding: .5em; transition-delay: 2s, 0s, 0s; transition-duration: .6s, .3s, .3s; transition-property: opacity, filter, transform; transition-timing-function: var(--ease-out-bezier); width: 7em` |
| 263 | embed-overlay | `#embed-overlay.interact button.view-btn` | `transition-delay: 0s` |
| 266 | embed-overlay | `#embed-overlay button.view-btn:active, #embed-overlay button.view-btn:focus, #embed-overlay:hover button.view-btn, body:not(.hover) #embed-overlay button.view-btn` | `filter: brightness(1)` |
| 272 | embed-overlay | `#embed-overlay:hover button.view-btn` | `transform: scale(1.05); transition-duration: .6s` |
| 276 | embed-overlay | `#embed-overlay.interact span.interact-text, #embed-overlay.loading span.loader-text, #embed-overlay.view button.view-btn` | `opacity: 1` |
### `eyes/shell/vendors.css` 结构与完整证据

PostCSS解析成功；31528 UTF-8 bytes；172 rule节点；522 declaration；0 media块（去重0）；68 important；2变量定义；14不同变量引用；2 url()。

#### @media 完整目录

| 行 | 条件 | 直属/后代规则数 | 改动属性集合 |
|---|---|---:|---|

#### 变量定义（含局部scope）

| 行 | scope | 定义 |
|---|---|---|
| 576 | `:root` | `--swiper-theme-color: #007aff` |
| 727 | `:root` | `--swiper-navigation-size: 44px` |

变量引用 → 全部源码行：

- `--swiper-centered-offset-before` → 708, 716
- `--swiper-centered-offset-after` → 713, 719
- `--swiper-navigation-color` → 732
- `--swiper-theme-color` → 732, 846, 893
- `--swiper-navigation-size` → 735, 737, 740, 752
- `--swiper-pagination-bullet-inactive-color` → 823
- `--swiper-pagination-bullet-height` → 826
- `--swiper-pagination-bullet-size` → 826, 828
- `--swiper-pagination-bullet-inactive-opacity` → 827
- `--swiper-pagination-bullet-width` → 828
- `--swiper-pagination-color` → 846, 893
- `--swiper-pagination-bullet-opacity` → 847
- `--swiper-pagination-bullet-vertical-gap` → 858
- `--swiper-pagination-bullet-horizontal-gap` → 873

#### 字体 / keyframes / 其他 at-rule

| 行 | 声明与完整子规则 |
|---|---|
| 326 | `@keyframes os-resize-observer-dummy-animation { 0% { z-index: 0; } to { z-index: -1; } }` |
| 569 | `@font-face { font-family: swiper-icons; font-style: normal; font-weight: 400; src: url(data:application/font-woff;charset=utf-8;base64,\ d09GRgABAAAAAAZgABAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAGRAAAABoAAAAci6qHkUdERUYAAAWgAAAAIwAAACQAYABXR1BPUwAABhQAAAAuAAAANuAY7+xHU1VCAAAFxAAAAFAAAABm2fPczU9TLzIAAAHcAAAASgAAAGBP9V5RY21hcAAAAkQAAACIAAABYt6F0cBjdnQgAAACzAAAAAQAAAAEABEBRGdhc3AAAAWYAAAACAAAAAj//wADZ2x5ZgAAAywAAADMAAAD2MHtryVoZWFkAAABbAAAADAAAAA2E2+eoWhoZWEAAAGcAAAAHwAAACQC9gDzaG10eAAAAigAAAAZAAAArgJkABFsb2NhAAAC0AAAAFoAAABaFQAUGG1heHAAAAG8AAAAHwAAACAAcABAbmFtZQAAA/gAAAE5AAACXvFdBwlwb3N0AAAFNAAAAGIAAACE5s74hXjaY2BkYGAAYpf5Hu/j+W2+MnAzMYDAzaX6QjD6/4//Bxj5GA8AuRwMYGkAPywL13jaY2BkYGA88P8Agx4j+/8fQDYfA1AEBWgDAIB2BOoAeNpjYGRgYNBh4GdgYgABEMnIABJzYNADCQAACWgAsQB42mNgYfzCOIGBlYGB0YcxjYGBwR1Kf2WQZGhhYGBiYGVmgAFGBiQQkOaawtDAoMBQxXjg/wEGPcYDDA4wNUA2CCgwsAAAO4EL6gAAeNpj2M0gyAACqxgGNWBkZ2D4/wMA+xkDdgAAAHjaY2BgYGaAYBkGRgYQiAHyGMF8FgYHIM3DwMHABGQrMOgyWDLEM1T9/w8UBfEMgLzE////P/5//f/V/xv+r4eaAAeMbAxwIUYmIMHEgKYAYjUcsDAwsLKxc3BycfPw8jEQA/gZBASFhEVExcQlJKWkZWTl5BUUlZRVVNXUNTQZBgMAAMR+E+gAEQFEAAAAKgAqACoANAA+AEgAUgBcAGYAcAB6AIQAjgCYAKIArAC2AMAAygDUAN4A6ADyAPwBBgEQARoBJAEuATgBQgFMAVYBYAFqAXQBfgGIAZIBnAGmAbIBzgHsAAB42u2NMQ6CUAyGW568x9AneYYgm4MJbhKFaExIOAVX8ApewSt4Bic4AfeAid3VOBixDxfPYEza5O+Xfi04YADggiUIULCuEJK8VhO4bSvpdnktHI5QCYtdi2sl8ZnXaHlqUrNKzdKcT8cjlq+rwZSvIVczNiezsfnP/uznmfPFBNODM2K7MTQ45YEAZqGP81AmGGcF3iPqOop0r1SPTaTbVkfUe4HXj97wYE+yNwWYxwWu4v1ugWHgo3S1XdZEVqWM7ET0cfnLGxWfkgR42o2PvWrDMBSFj/IHLaF0zKjRgdiVMwScNRAoWUoH78Y2icB/yIY09An6AH2Bdu/UB+yxopYshQiEvnvu0dURgDt8QeC8PDw7Fpji3fEA4z/PEJ6YOB5hKh4dj3EvXhxPqH/SKUY3rJ7srZ4FZnh1PMAtPhwP6fl2PMJMPDgeQ4rY8YT6Gzao0eAEA409DuggmTnFnOcSCiEiLMgxCiTI6Cq5DZUd3Qmp10vO0LaLTd2cjN4fOumlc7lUYbSQcZFkutRG7g6JKZKy0RmdLY680CDnEJ+UMkpFFe1RN7nxdVpXrC4aTtnaurOnYercZg2YVmLN/d/gczfEimrE/fs/bOuq29Zmn8tloORaXgZgGa78yO9/cnXm2BpaGvq25Dv9S4E9+5SIc9PqupJKhYFSSl47+Qcr1mYNAAAAeNptw0cKwkAAAMDZJA8Q7OUJvkLsPfZ6zFVERPy8qHh2YER+3i/BP83vIBLLySsoKimrqKqpa2hp6+jq6RsYGhmbmJqZSy0sraxtbO3sHRydnEMU4uR6yx7JJXveP7WrDycAAAAAAAH//wACeNpjYGRgYOABYhkgZgJCZgZNBkYGLQZtIJsFLMYAAAw3ALgAeNolizEKgDAQBCchRbC2sFER0YD6qVQiBCv/H9ezGI6Z5XBAw8CBK/m5iQQVauVbXLnOrMZv2oLdKFa8Pjuru2hJzGabmOSLzNMzvutpB3N42mNgZGBg4GKQYzBhYMxJLMlj4GBgAYow/P/PAJJhLM6sSoWKfWCAAwDAjgbRAAB42mNgYGBkAIIbCZo5IPrmUn0hGA0AO8EFTQAA); }` |

font-family实际调用：

- L208 `.os-text-inherit` → `inherit`
- L570 `@font-face ` → `swiper-icons`
- L751 `.swiper-button-next:after, .swiper-button-prev:after` → `swiper-icons`

#### URL（仅本地源码字符串，没有fetch）

| 行 | 属性 | URL |
|---|---|---|
| 446 | background-image | `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PGcgc3R5bGU9ImRpc3BsYXk6aW5saW5lIj48cGF0aCBkPSJNNy40MjQgMTA0Mi4zNjJhMS4zMSAxLjMxIDAgMCAwLTEuMzEgMS4zMWMwIC4zLjEwNC41NzEuMjczLjc5Mi4yMS4xNDEuNDY2LjIxOC43MzcuMjE4YTEuMzEgMS4zMSAwIDAgMCAxLjMxLTEuMzFjMC0uMjcxLS4wNzctLjUyOC0uMjE4LS43MzdhMS4zIDEuMyAwIDAgMC0uNzkyLS4yNzNtMCAzLjA4NGExLjMxIDEuMzEgMCAwIDAtMS4zMSAxLjMxYzAgLjMuMTA0LjU3Mi4yNzMuNzkyLjIxLjE0MS40NjYuMjE5LjczNy4yMTlhMS4zMSAxLjMxIDAgMCAwIDEuMzEtMS4zMWMwLS4yNzItLjA3Ny0uNTI4LS4yMTgtLjczOGExLjMgMS4zIDAgMCAwLS43OTItLjI3M20tMy4wODQgMGExLjMxIDEuMzEgMCAwIDAtMS4zMSAxLjMxYzAgLjMuMTA0LjU3Mi4yNzMuNzkyLjIwOS4xNDEuNDY1LjIxOS43MzcuMjE5YTEuMzEgMS4zMSAwIDAgMCAxLjMxLTEuMzFjMC0uMjcyLS4wNzctLjUyOC0uMjE5LS43MzhhMS4zIDEuMyAwIDAgMC0uNzkxLS4yNzNtLTMuMDMgMy4wM2ExLjMxIDEuMzEgMCAwIDAtMS4zMSAxLjMxYzAgLjMuMTA0LjU3MS4yNzMuNzkyLjIxLjE0MS40NjYuMjE4LjczNy4yMThhMS4zMSAxLjMxIDAgMCAwIDEuMzEtMS4zMWMwLS4yNzEtLjA3Ny0uNTI4LS4yMTgtLjczN2ExLjMgMS4zIDAgMCAwLS43OTItLjI3M20zLjAzIDBhMS4zMSAxLjMxIDAgMCAwLTEuMzEgMS4zMWMwIC4zLjEwNC41NzEuMjczLjc5Mi4yMDkuMTQxLjQ2NS4yMTguNzM3LjIxOGExLjMxIDEuMzEgMCAwIDAgMS4zMS0xLjMxYzAtLjI3MS0uMDc3LS41MjgtLjIxOS0uNzM3YTEuMyAxLjMgMCAwIDAtLjc5MS0uMjczbTMuMDg0IDBhMS4zMSAxLjMxIDAgMCAwLTEuMzEgMS4zMWMwIC4zLjEwNC41NzEuMjczLjc5Mi4yMS4xNDEuNDY2LjIxOC43MzcuMjE4YTEuMzEgMS4zMSAwIDAgMCAxLjMxLTEuMzFjMC0uMjcxLS4wNzctLjUyOC0uMjE4LS43MzdhMS4zIDEuMyAwIDAgMC0uNzkyLS4yNzMiIHN0eWxlPSJmaWxsOiMwMDA7ZmlsbC1vcGFjaXR5Oi40OTQxMTc2NTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6bm9uZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtMTA0Mi4zNjIpIi8+PC9nPjxnIHN0eWxlPSJkaXNwbGF5OmlubGluZSI+PHBhdGggZD0iTTguMjE2LjI3M2MuMTQxLjIxLjIxOC40NjYuMjE4LjczN2ExLjMxIDEuMzEgMCAwIDEtMS4zMSAxLjMxYy0uMjcxIDAtLjUyOC0uMDc3LS43MzctLjIxOC4yNC4zMTMuNjEzLjUxOCAxLjAzNy41MThhMS4zMSAxLjMxIDAgMCAwIDEuMzEtMS4zMWMwLS40MjQtLjIwNS0uNzk4LS41MTgtMS4wMzdtMCAzLjA4NGMuMTQxLjIxLjIxOC40NjYuMjE4LjczN2ExLjMxIDEuMzEgMCAwIDEtMS4zMSAxLjMxYy0uMjcxIDAtLjUyOC0uMDc3LS43MzctLjIxOC4yNC4zMTMuNjEzLjUxOSAxLjAzNy41MTlhMS4zMSAxLjMxIDAgMCAwIDEuMzEtMS4zMWMwLS40MjUtLjIwNS0uNzk4LS41MTgtMS4wMzhtLTMuMDg1IDBjLjE0Mi4yMS4yMTkuNDY2LjIxOS43MzdhMS4zMSAxLjMxIDAgMCAxLTEuMzEgMS4zMWMtLjI3MiAwLS41MjgtLjA3Ny0uNzM3LS4yMTguMjQuMzEzLjYxMi41MTkgMS4wMzcuNTE5YTEuMzEgMS4zMSAwIDAgMCAxLjMxLTEuMzFjMC0uNDI1LS4yMDUtLjc5OC0uNTE5LTEuMDM4bS0zLjAzIDMuMDNjLjE0Mi4yMS4yMi40NjYuMjIuNzM3YTEuMzEgMS4zMSAwIDAgMS0xLjMxMSAxLjMxYy0uMjcxIDAtLjUyOC0uMDc3LS43MzctLjIxOC4yNC4zMTMuNjEzLjUxOCAxLjAzNy41MThhMS4zMSAxLjMxIDAgMCAwIDEuMzEtMS4zMWMwLS40MjQtLjIwNS0uNzk4LS41MTgtMS4wMzdtMy4wMyAwYy4xNDIuMjEuMjE5LjQ2Ni4yMTkuNzM3YTEuMzEgMS4zMSAwIDAgMS0xLjMxIDEuMzFjLS4yNzIgMC0uNTI4LS4wNzctLjczNy0uMjE4LjI0LjMxMy42MTIuNTE4IDEuMDM3LjUxOGExLjMxIDEuMzEgMCAwIDAgMS4zMS0xLjMxYzAtLjQyNC0uMjA1LS43OTgtLjUxOS0xLjAzN20zLjA4NSAwYy4xNDEuMjEuMjE4LjQ2Ni4yMTguNzM3YTEuMzEgMS4zMSAwIDAgMS0xLjMxIDEuMzFjLS4yNzEgMC0uNTI4LS4wNzctLjczNy0uMjE4LjI0LjMxMy42MTMuNTE4IDEuMDM3LjUxOGExLjMxIDEuMzEgMCAwIDAgMS4zMS0xLjMxYzAtLjQyNC0uMjA1LS43OTgtLjUxOC0xLjAzNyIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6bm9uZSIvPjwvZz48L3N2Zz4=` |
| 573 | src | `data:application/font-woff;charset=utf-8;base64,\ d09GRgABAAAAAAZgABAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAGRAAAABoAAAAci6qHkUdERUYAAAWgAAAAIwAAACQAYABXR1BPUwAABhQAAAAuAAAANuAY7+xHU1VCAAAFxAAAAFAAAABm2fPczU9TLzIAAAHcAAAASgAAAGBP9V5RY21hcAAAAkQAAACIAAABYt6F0cBjdnQgAAACzAAAAAQAAAAEABEBRGdhc3AAAAWYAAAACAAAAAj//wADZ2x5ZgAAAywAAADMAAAD2MHtryVoZWFkAAABbAAAADAAAAA2E2+eoWhoZWEAAAGcAAAAHwAAACQC9gDzaG10eAAAAigAAAAZAAAArgJkABFsb2NhAAAC0AAAAFoAAABaFQAUGG1heHAAAAG8AAAAHwAAACAAcABAbmFtZQAAA/gAAAE5AAACXvFdBwlwb3N0AAAFNAAAAGIAAACE5s74hXjaY2BkYGAAYpf5Hu/j+W2+MnAzMYDAzaX6QjD6/4//Bxj5GA8AuRwMYGkAPywL13jaY2BkYGA88P8Agx4j+/8fQDYfA1AEBWgDAIB2BOoAeNpjYGRgYNBh4GdgYgABEMnIABJzYNADCQAACWgAsQB42mNgYfzCOIGBlYGB0YcxjYGBwR1Kf2WQZGhhYGBiYGVmgAFGBiQQkOaawtDAoMBQxXjg/wEGPcYDDA4wNUA2CCgwsAAAO4EL6gAAeNpj2M0gyAACqxgGNWBkZ2D4/wMA+xkDdgAAAHjaY2BgYGaAYBkGRgYQiAHyGMF8FgYHIM3DwMHABGQrMOgyWDLEM1T9/w8UBfEMgLzE////P/5//f/V/xv+r4eaAAeMbAxwIUYmIMHEgKYAYjUcsDAwsLKxc3BycfPw8jEQA/gZBASFhEVExcQlJKWkZWTl5BUUlZRVVNXUNTQZBgMAAMR+E+gAEQFEAAAAKgAqACoANAA+AEgAUgBcAGYAcAB6AIQAjgCYAKIArAC2AMAAygDUAN4A6ADyAPwBBgEQARoBJAEuATgBQgFMAVYBYAFqAXQBfgGIAZIBnAGmAbIBzgHsAAB42u2NMQ6CUAyGW568x9AneYYgm4MJbhKFaExIOAVX8ApewSt4Bic4AfeAid3VOBixDxfPYEza5O+Xfi04YADggiUIULCuEJK8VhO4bSvpdnktHI5QCYtdi2sl8ZnXaHlqUrNKzdKcT8cjlq+rwZSvIVczNiezsfnP/uznmfPFBNODM2K7MTQ45YEAZqGP81AmGGcF3iPqOop0r1SPTaTbVkfUe4HXj97wYE+yNwWYxwWu4v1ugWHgo3S1XdZEVqWM7ET0cfnLGxWfkgR42o2PvWrDMBSFj/IHLaF0zKjRgdiVMwScNRAoWUoH78Y2icB/yIY09An6AH2Bdu/UB+yxopYshQiEvnvu0dURgDt8QeC8PDw7Fpji3fEA4z/PEJ6YOB5hKh4dj3EvXhxPqH/SKUY3rJ7srZ4FZnh1PMAtPhwP6fl2PMJMPDgeQ4rY8YT6Gzao0eAEA409DuggmTnFnOcSCiEiLMgxCiTI6Cq5DZUd3Qmp10vO0LaLTd2cjN4fOumlc7lUYbSQcZFkutRG7g6JKZKy0RmdLY680CDnEJ+UMkpFFe1RN7nxdVpXrC4aTtnaurOnYercZg2YVmLN/d/gczfEimrE/fs/bOuq29Zmn8tloORaXgZgGa78yO9/cnXm2BpaGvq25Dv9S4E9+5SIc9PqupJKhYFSSl47+Qcr1mYNAAAAeNptw0cKwkAAAMDZJA8Q7OUJvkLsPfZ6zFVERPy8qHh2YER+3i/BP83vIBLLySsoKimrqKqpa2hp6+jq6RsYGhmbmJqZSy0sraxtbO3sHRydnEMU4uR6yx7JJXveP7WrDycAAAAAAAH//wACeNpjYGRgYOABYhkgZgJCZgZNBkYGLQZtIJsFLMYAAAw3ALgAeNolizEKgDAQBCchRbC2sFER0YD6qVQiBCv/H9ezGI6Z5XBAw8CBK/m5iQQVauVbXLnOrMZv2oLdKFa8Pjuru2hJzGabmOSLzNMzvutpB3N42mNgZGBg4GKQYzBhYMxJLMlj4GBgAYow/P/PAJJhLM6sSoWKfWCAAwDAjgbRAAB42mNgYGBkAIIbCZo5IPrmUn0hGA0AO8EFTQAA` |

#### !important完整声明

| 行 | 上下文 | 值 |
|---|---|---|
| 17 | `html.os-html, html.os-html > .os-host` | `height: 100% !important` |
| 18 | `html.os-html, html.os-html > .os-host` | `margin: 0 !important` |
| 19 | `html.os-html, html.os-html > .os-host` | `min-height: 100% !important` |
| 20 | `html.os-html, html.os-html > .os-host` | `min-width: 100% !important` |
| 22 | `html.os-html, html.os-html > .os-host` | `position: absolute !important` |
| 23 | `html.os-html, html.os-html > .os-host` | `width: 100% !important` |
| 38 | `.os-host, .os-host-textarea` | `overflow: visible !important` |
| 47 | `.os-host-flexbox` | `overflow: hidden !important` |
| 50 | `.os-host-flexbox > .os-size-auto-observer` | `height: inherit !important` |
| 94 | `#os-dummy-scrollbar-size, .os-viewport` | `-ms-overflow-style: scrollbar !important` |
| 98 | `.os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size, .os-viewport-native-scrollbars-invisible.os-viewport` | `scrollbar-width: none !important` |
| 104 | `.os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar, .os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar-corner, .os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar, .os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar-corner` | `background: transparent !important` |
| 105 | `.os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar, .os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar-corner, .os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar, .os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar-corner` | `display: none !important` |
| 106 | `.os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar, .os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar-corner, .os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar, .os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar-corner` | `height: 0 !important` |
| 107 | `.os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar, .os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar-corner, .os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar, .os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar-corner` | `visibility: hidden !important` |
| 108 | `.os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar, .os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar-corner, .os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar, .os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar-corner` | `width: 0 !important` |
| 121 | `.os-padding` | `height: auto !important` |
| 129 | `.os-padding` | `width: auto !important` |
| 138 | `.os-viewport` | `box-sizing: inherit !important` |
| 139 | `.os-viewport` | `direction: inherit !important` |
| 142 | `.os-viewport` | `outline: none !important` |
| 145 | `.os-viewport` | `resize: none !important` |
| 158 | `.os-content` | `box-sizing: border-box !important` |
| 167 | `.os-content > .os-textarea` | `background: transparent !important` |
| 168 | `.os-content > .os-textarea` | `border: none !important` |
| 169 | `.os-content > .os-textarea` | `border-radius: 0 !important` |
| 170 | `.os-content > .os-textarea` | `box-shadow: none !important` |
| 171 | `.os-content > .os-textarea` | `box-sizing: border-box !important` |
| 172 | `.os-content > .os-textarea` | `direction: inherit !important` |
| 173 | `.os-content > .os-textarea` | `display: block !important` |
| 174 | `.os-content > .os-textarea` | `filter: none !important` |
| 175 | `.os-content > .os-textarea` | `float: none !important` |
| 176 | `.os-content > .os-textarea` | `left: 0 !important` |
| 177 | `.os-content > .os-textarea` | `margin: 0 !important` |
| 178 | `.os-content > .os-textarea` | `max-height: none !important` |
| 179 | `.os-content > .os-textarea` | `max-width: none !important` |
| 180 | `.os-content > .os-textarea` | `opacity: 1 !important` |
| 181 | `.os-content > .os-textarea` | `outline: 0 none transparent !important` |
| 182 | `.os-content > .os-textarea` | `overflow: hidden !important` |
| 183 | `.os-content > .os-textarea` | `perspective: none !important` |
| 184 | `.os-content > .os-textarea` | `position: absolute !important` |
| 185 | `.os-content > .os-textarea` | `resize: none !important` |
| 186 | `.os-content > .os-textarea` | `top: 0 !important` |
| 187 | `.os-content > .os-textarea` | `transform: none !important` |
| 188 | `.os-content > .os-textarea` | `z-index: 1 !important` |
| 189 | `.os-content > .os-textarea` | `clip: auto !important` |
| 191 | `.os-content > .os-textarea` | `vertical-align: baseline !important` |
| 194 | `.os-host-rtl > .os-padding > .os-viewport > .os-content > .os-textarea` | `right: 0 !important` |
| 201 | `.os-content > .os-textarea[wrap=off]` | `margin: 0 !important` |
| 202 | `.os-content > .os-textarea[wrap=off]` | `white-space: pre !important` |
| 278 | `.os-size-auto-observer` | `box-sizing: inherit !important` |
| 302 | `.os-resize-observer-item` | `direction: ltr !important` |
| 303 | `.os-resize-observer-item` | `flex: none !important` |
| 313 | `.os-resize-observer-item-final` | `flex: none !important` |
| 317 | `.os-resize-observer-item-final` | `transition: none !important` |
| 324 | `object.os-resize-observer` | `box-sizing: border-box !important` |
| 363 | `.os-scrollbar-track` | `border: none !important` |
| 364 | `.os-scrollbar-track` | `padding: 0 !important` |
| 382 | `.os-scrollbar.os-scrollbar-unusable, .os-scrollbar.os-scrollbar-unusable *` | `pointer-events: none !important` |
| 385 | `.os-scrollbar.os-scrollbar-unusable .os-scrollbar-handle` | `opacity: 0 !important` |
| 442 | `.os-scrollbar-corner.os-scrollbar-corner-resize, .os-scrollbar:hover` | `opacity: 1 !important` |
| 443 | `.os-scrollbar-corner.os-scrollbar-corner-resize, .os-scrollbar:hover` | `visibility: visible !important` |
| 449 | `.os-scrollbar-corner.os-scrollbar-corner-resize` | `pointer-events: auto !important` |
| 455 | `.os-host-overflow` | `overflow: hidden !important` |
| 460 | `.os-theme-none > .os-scrollbar-corner, .os-theme-none > .os-scrollbar-horizontal, .os-theme-none > .os-scrollbar-vertical` | `display: none !important` |
| 463 | `.os-theme-none > .os-scrollbar-corner-resize` | `display: block !important` |
| 756 | `.swiper-button-next:after, .swiper-button-prev:after` | `text-transform: none !important` |
| 843 | `.swiper-pagination-bullet:only-child` | `display: none !important` |

#### z-index完整声明

| 行 | 上下文 | 值 |
|---|---|---|
| 130 | `.os-padding` | `z-index: 0` |
| 155 | `.os-content-arrange` | `z-index: -1` |
| 188 | `.os-content > .os-textarea` | `z-index: 1 !important` |
| 198 | `.os-content > .os-textarea-cover` | `z-index: -1` |
| 236 | `.os-resize-observer, .os-resize-observer-host` | `z-index: -1` |
| 292 | `.os-size-auto-observer` | `z-index: -1` |
| 310 | `.os-resize-observer-item` | `z-index: -1` |
| 328 | `@keyframes os-resize-observer-dummy-animation › 0%` | `z-index: 0` |
| 331 | `@keyframes os-resize-observer-dummy-animation › to` | `z-index: -1` |
| 346 | `html.os-html > .os-host > .os-scrollbar` | `z-index: 999999` |
| 353 | `.os-scrollbar, .os-scrollbar-corner` | `z-index: 1` |
| 585 | `.swiper` | `z-index: 1` |
| 597 | `.swiper-wrapper` | `z-index: 1` |
| 652 | `.swiper-3d .swiper-slide-shadow, .swiper-3d .swiper-slide-shadow-bottom, .swiper-3d .swiper-slide-shadow-left, .swiper-3d .swiper-slide-shadow-right, .swiper-3d .swiper-slide-shadow-top` | `z-index: 10` |
| 741 | `.swiper-button-next, .swiper-button-prev` | `z-index: 10` |
| 785 | `.swiper-pagination` | `z-index: 10` |
| 1001 | `.tippy-content` | `z-index: 1` |

#### 全selector目录：行号 / 类前缀家族 / 祖先上下文 / 全部直接声明

每条规则按自身 selector 和完整父链定位；嵌套子规则另外列出。keyframes帧属于动画，不是DOM选择器；GLOBAL规则无class并不代表无作用。源码逗号、`:is/:not/:has`、伪元素保留原义。无直接声明表示仅包装子规则，不是空功能。

| 行 | 家族 | 上下文（含完整selector） | 直接属性和值 |
|---|---|---|---|
| 13 | os-html | `html.os-html, html.os-html > .os-host` | `box-sizing: border-box; display: block; height: 100% !important; margin: 0 !important; min-height: 100% !important; min-width: 100% !important; overflow: hidden; position: absolute !important; width: 100% !important` |
| 25 | os-html | `html.os-html > .os-host > .os-padding` | `position: absolute` |
| 28 | os-dragging | `body.os-dragging, body.os-dragging *` | `cursor: default` |
| 32 | os-host | `.os-host, .os-host-textarea` | `align-content: flex-start; flex-direction: column; flex-wrap: nowrap; justify-content: flex-start; overflow: visible !important; position: relative; -webkit-box-align: start; -ms-flex-align: start; -ms-grid-row-align: flex-start; align-items: flex-start` |
| 45 | os-host-flexbox | `.os-host-flexbox` | `display: flex; overflow: hidden !important` |
| 49 | os-host-flexbox | `.os-host-flexbox > .os-size-auto-observer` | `height: inherit !important` |
| 52 | os-host-flexbox | `.os-host-flexbox > .os-content-glue` | `flex-grow: 1; flex-shrink: 0` |
| 56 | os-host-flexbox | `.os-host-flexbox > .os-content-glue, .os-host-flexbox > .os-size-auto-observer` | `flex-basis: auto; flex-grow: 0; flex-shrink: 1; min-height: 0; min-width: 0` |
| 64 | os-dummy-scrollbar-size | `#os-dummy-scrollbar-size` | `-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"; height: 500px; opacity: 0; overflow: scroll; position: fixed; visibility: hidden; width: 500px` |
| 73 | os-dummy-scrollbar-size | `#os-dummy-scrollbar-size > div` | `height: 200%; margin: 10px 0; width: 200%` |
| 78 | os-dummy-scrollbar-size | `#os-dummy-scrollbar-size:after, #os-dummy-scrollbar-size:before, .os-content:after, .os-content:before` | `content: ""; display: table; flex-grow: 0; flex-shrink: 0; font-size: 0; height: .01px; line-height: 0; visibility: hidden; width: .01px` |
| 92 | os-dummy-scrollbar-size | `#os-dummy-scrollbar-size, .os-viewport` | `-ms-overflow-style: scrollbar !important` |
| 96 | os-viewport-native-scrollbars-invisible | `.os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size, .os-viewport-native-scrollbars-invisible.os-viewport` | `scrollbar-width: none !important` |
| 100 | os-viewport-native-scrollbars-invisible | `.os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar, .os-viewport-native-scrollbars-invisible#os-dummy-scrollbar-size::-webkit-scrollbar-corner, .os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar, .os-viewport-native-scrollbars-invisible.os-viewport::-webkit-scrollbar-corner` | `background: transparent !important; display: none !important; height: 0 !important; visibility: hidden !important; width: 0 !important` |
| 110 | os-content-glue | `.os-content-glue` | `box-sizing: inherit; max-height: 100%; max-width: 100%; pointer-events: none; width: 100%` |
| 117 | os-padding | `.os-padding` | `bottom: 0; box-sizing: inherit; direction: inherit; height: auto !important; left: 0; margin: 0; overflow: visible; padding: 0; position: absolute; right: 0; top: 0; width: auto !important; z-index: 0` |
| 132 | os-host-overflow | `.os-host-overflow > .os-padding, .os-viewport` | `overflow: hidden` |
| 136 | os-viewport | `.os-viewport` | `bottom: 0; box-sizing: inherit !important; direction: inherit !important; left: 0; margin: 0; outline: none !important; padding: 0; position: absolute; resize: none !important; right: 0; top: 0; -webkit-overflow-scrolling: touch` |
| 150 | os-content-arrange | `.os-content-arrange` | `min-height: 1px; min-width: 1px; pointer-events: none; position: absolute; z-index: -1` |
| 157 | os-content | `.os-content` | `box-sizing: border-box !important; direction: inherit; display: block; height: 100%; position: relative; visibility: visible; width: 100%` |
| 166 | os-content | `.os-content > .os-textarea` | `background: transparent !important; border: none !important; border-radius: 0 !important; box-shadow: none !important; box-sizing: border-box !important; direction: inherit !important; display: block !important; filter: none !important; float: none !important; left: 0 !important; margin: 0 !important; max-height: none !important; max-width: none !important; opacity: 1 !important; outline: 0 none transparent !important; overflow: hidden !important; perspective: none !important; position: absolute !important; resize: none !important; top: 0 !important; transform: none !important; z-index: 1 !important; clip: auto !important; padding: 0; vertical-align: baseline !important` |
| 193 | os-host-rtl | `.os-host-rtl > .os-padding > .os-viewport > .os-content > .os-textarea` | `right: 0 !important` |
| 196 | os-content | `.os-content > .os-textarea-cover` | `pointer-events: none; z-index: -1` |
| 200 | os-content | `.os-content > .os-textarea[wrap=off]` | `margin: 0 !important; white-space: pre !important` |
| 204 | os-text-inherit | `.os-text-inherit` | `color: inherit; cursor: text; direction: inherit; font-family: inherit; font-size: inherit; font-style: inherit; font-variant: inherit; font-weight: inherit; letter-spacing: inherit; line-height: inherit; text-align: inherit; text-decoration: inherit; text-indent: inherit; text-overflow: inherit; text-shadow: inherit; text-transform: inherit; unicode-bidi: inherit; word-spacing: inherit` |
| 224 | os-resize-observer | `.os-resize-observer, .os-resize-observer-host` | `box-sizing: inherit; display: block; height: 100%; left: 0; overflow: hidden; pointer-events: none; position: absolute; top: 0; visibility: hidden; width: 100%; z-index: -1` |
| 238 | os-resize-observer-host | `.os-resize-observer-host` | `border: inherit; border-color: transparent; border-style: solid; box-sizing: border-box; padding: inherit` |
| 245 | os-resize-observer-host | `.os-resize-observer-host.observed` | `align-items: flex-start; display: flex; flex-direction: column; justify-content: flex-start` |
| 251 | os-resize-observer-host | `.os-resize-observer-host.observed > .os-resize-observer, .os-resize-observer-host > .os-resize-observer` | `border: inherit; box-sizing: content-box; display: block; height: 200%; margin: 0; padding: inherit; width: 200%` |
| 261 | os-resize-observer-host | `.os-resize-observer-host.observed > .os-resize-observer, .os-resize-observer-host.observed > .os-resize-observer:before` | `box-sizing: border-box; display: flex; flex-basis: auto; flex-grow: 1; flex-shrink: 0; position: relative` |
| 270 | os-resize-observer-host | `.os-resize-observer-host.observed > .os-resize-observer:before` | `border: inherit; box-sizing: content-box; content: ""; margin: 0; padding: inherit` |
| 277 | os-size-auto-observer | `.os-size-auto-observer` | `box-sizing: inherit !important; flex-basis: 0; flex-grow: inherit; flex-shrink: 0; float: left; height: 100%; margin: 0; max-height: 1px; max-width: 1px; overflow: hidden; padding: 0; pointer-events: none; position: relative; width: inherit; z-index: -1` |
| 294 | os-size-auto-observer | `.os-size-auto-observer > .os-resize-observer` | `height: 1000%; min-height: 1px; min-width: 1px; width: 1000%` |
| 300 | os-resize-observer-item | `.os-resize-observer-item` | `bottom: 0; direction: ltr !important; flex: none !important; left: 0; opacity: 0; overflow: hidden; position: absolute; right: 0; top: 0; z-index: -1` |
| 312 | os-resize-observer-item-final | `.os-resize-observer-item-final` | `flex: none !important; left: 0; position: absolute; top: 0; transition: none !important` |
| 319 | os-resize-observer | `.os-resize-observer` | `animation-duration: 1ms; animation-name: os-resize-observer-dummy-animation` |
| 323 | os-resize-observer | `object.os-resize-observer` | `box-sizing: border-box !important` |
| 327 | KEYFRAME | `@keyframes os-resize-observer-dummy-animation › 0%` | `z-index: 0` |
| 330 | KEYFRAME | `@keyframes os-resize-observer-dummy-animation › to` | `z-index: -1` |
| 334 | os-host-transition | `.os-host-transition > .os-scrollbar, .os-host-transition > .os-scrollbar-corner` | `transition: opacity .3s, visibility .3s, top .3s, right .3s, bottom .3s, left .3s` |
| 344 | os-html | `html.os-html > .os-host > .os-scrollbar` | `position: absolute; z-index: 999999` |
| 348 | os-scrollbar | `.os-scrollbar, .os-scrollbar-corner` | `-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)"; opacity: 1; position: absolute; z-index: 1` |
| 355 | os-scrollbar-corner | `.os-scrollbar-corner` | `bottom: 0; right: 0` |
| 359 | os-scrollbar | `.os-scrollbar` | `pointer-events: none` |
| 362 | os-scrollbar-track | `.os-scrollbar-track` | `border: none !important; padding: 0 !important; position: relative` |
| 367 | os-scrollbar-handle | `.os-scrollbar-handle, .os-scrollbar-track` | `height: 100%; pointer-events: auto; width: 100%` |
| 373 | os-scrollbar-handle | `.os-scrollbar-handle` | `position: absolute` |
| 376 | os-scrollbar-handle-off | `.os-scrollbar-handle-off, .os-scrollbar-track-off` | `pointer-events: none` |
| 380 | os-scrollbar | `.os-scrollbar.os-scrollbar-unusable, .os-scrollbar.os-scrollbar-unusable *` | `pointer-events: none !important` |
| 384 | os-scrollbar | `.os-scrollbar.os-scrollbar-unusable .os-scrollbar-handle` | `opacity: 0 !important` |
| 387 | os-scrollbar-horizontal | `.os-scrollbar-horizontal` | `bottom: 0; left: 0` |
| 391 | os-scrollbar-vertical | `.os-scrollbar-vertical` | `right: 0; top: 0` |
| 395 | os-host-rtl | `.os-host-rtl > .os-scrollbar-horizontal` | `right: 0` |
| 398 | os-host-rtl | `.os-host-rtl > .os-scrollbar-corner, .os-host-rtl > .os-scrollbar-vertical` | `left: 0; right: auto` |
| 403 | os-host-resize-disabled | `.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden > .os-scrollbar-corner, .os-host-resize-disabled.os-host-scrollbar-vertical-hidden > .os-scrollbar-corner, .os-host-scrollbar-horizontal-hidden > .os-scrollbar-horizontal, .os-host-scrollbar-vertical-hidden > .os-scrollbar-vertical, .os-padding + .os-scrollbar-corner, .os-scrollbar-auto-hidden, .os-scrollbar-horizontal + .os-scrollbar-vertical.os-scrollbar-auto-hidden + .os-scrollbar-corner, .os-scrollbar-horizontal.os-scrollbar-auto-hidden + .os-scrollbar-vertical + .os-scrollbar-corner, .os-scrollbar-horizontal.os-scrollbar-auto-hidden + .os-scrollbar-vertical.os-scrollbar-auto-hidden + .os-scrollbar-corner` | `opacity: 0; pointer-events: none; visibility: hidden` |
| 416 | os-scrollbar-corner-resize-both | `.os-scrollbar-corner-resize-both` | `cursor: nwse-resize` |
| 419 | os-host-rtl | `.os-host-rtl > .os-scrollbar-corner-resize-both` | `cursor: nesw-resize` |
| 422 | os-scrollbar-corner-resize-horizontal | `.os-scrollbar-corner-resize-horizontal` | `cursor: ew-resize` |
| 425 | os-scrollbar-corner-resize-vertical | `.os-scrollbar-corner-resize-vertical` | `cursor: ns-resize` |
| 428 | os-dragging | `.os-dragging .os-scrollbar-corner.os-scrollbar-corner-resize` | `cursor: default` |
| 431 | os-host-resize-disabled | `.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden > .os-scrollbar-vertical` | `bottom: 0; top: 0` |
| 435 | os-host-resize-disabled | `.os-host-resize-disabled.os-host-scrollbar-vertical-hidden > .os-scrollbar-horizontal, .os-host-rtl.os-host-resize-disabled.os-host-scrollbar-vertical-hidden > .os-scrollbar-horizontal` | `left: 0; right: 0` |
| 440 | os-scrollbar-corner | `.os-scrollbar-corner.os-scrollbar-corner-resize, .os-scrollbar:hover` | `opacity: 1 !important; visibility: visible !important` |
| 445 | os-scrollbar-corner | `.os-scrollbar-corner.os-scrollbar-corner-resize` | `background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PGcgc3R5bGU9ImRpc3BsYXk6aW5saW5lIj48cGF0aCBkPSJNNy40MjQgMTA0Mi4zNjJhMS4zMSAxLjMxIDAgMCAwLTEuMzEgMS4zMWMwIC4zLjEwNC41NzEuMjczLjc5Mi4yMS4xNDEuNDY2LjIxOC43MzcuMjE4YTEuMzEgMS4zMSAwIDAgMCAxLjMxLTEuMzFjMC0uMjcxLS4wNzctLjUyOC0uMjE4LS43MzdhMS4zIDEuMyAwIDAgMC0uNzkyLS4yNzNtMCAzLjA4NGExLjMxIDEuMzEgMCAwIDAtMS4zMSAxLjMxYzAgLjMuMTA0LjU3Mi4yNzMuNzkyLjIxLjE0MS40NjYuMjE5LjczNy4yMTlhMS4zMSAxLjMxIDAgMCAwIDEuMzEtMS4zMWMwLS4yNzItLjA3Ny0uNTI4LS4yMTgtLjczOGExLjMgMS4zIDAgMCAwLS43OTItLjI3M20tMy4wODQgMGExLjMxIDEuMzEgMCAwIDAtMS4zMSAxLjMxYzAgLjMuMTA0LjU3Mi4yNzMuNzkyLjIwOS4xNDEuNDY1LjIxOS43MzcuMjE5YTEuMzEgMS4zMSAwIDAgMCAxLjMxLTEuMzFjMC0uMjcyLS4wNzctLjUyOC0uMjE5LS43MzhhMS4zIDEuMyAwIDAgMC0uNzkxLS4yNzNtLTMuMDMgMy4wM2ExLjMxIDEuMzEgMCAwIDAtMS4zMSAxLjMxYzAgLjMuMTA0LjU3MS4yNzMuNzkyLjIxLjE0MS40NjYuMjE4LjczNy4yMThhMS4zMSAxLjMxIDAgMCAwIDEuMzEtMS4zMWMwLS4yNzEtLjA3Ny0uNTI4LS4yMTgtLjczN2ExLjMgMS4zIDAgMCAwLS43OTItLjI3M20zLjAzIDBhMS4zMSAxLjMxIDAgMCAwLTEuMzEgMS4zMWMwIC4zLjEwNC41NzEuMjczLjc5Mi4yMDkuMTQxLjQ2NS4yMTguNzM3LjIxOGExLjMxIDEuMzEgMCAwIDAgMS4zMS0xLjMxYzAtLjI3MS0uMDc3LS41MjgtLjIxOS0uNzM3YTEuMyAxLjMgMCAwIDAtLjc5MS0uMjczbTMuMDg0IDBhMS4zMSAxLjMxIDAgMCAwLTEuMzEgMS4zMWMwIC4zLjEwNC41NzEuMjczLjc5Mi4yMS4xNDEuNDY2LjIxOC43MzcuMjE4YTEuMzEgMS4zMSAwIDAgMCAxLjMxLTEuMzFjMC0uMjcxLS4wNzctLjUyOC0uMjE4LS43MzdhMS4zIDEuMyAwIDAgMC0uNzkyLS4yNzMiIHN0eWxlPSJmaWxsOiMwMDA7ZmlsbC1vcGFjaXR5Oi40OTQxMTc2NTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6bm9uZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtMTA0Mi4zNjIpIi8+PC9nPjxnIHN0eWxlPSJkaXNwbGF5OmlubGluZSI+PHBhdGggZD0iTTguMjE2LjI3M2MuMTQxLjIxLjIxOC40NjYuMjE4LjczN2ExLjMxIDEuMzEgMCAwIDEtMS4zMSAxLjMxYy0uMjcxIDAtLjUyOC0uMDc3LS43MzctLjIxOC4yNC4zMTMuNjEzLjUxOCAxLjAzNy41MThhMS4zMSAxLjMxIDAgMCAwIDEuMzEtMS4zMWMwLS40MjQtLjIwNS0uNzk4LS41MTgtMS4wMzdtMCAzLjA4NGMuMTQxLjIxLjIxOC40NjYuMjE4LjczN2ExLjMxIDEuMzEgMCAwIDEtMS4zMSAxLjMxYy0uMjcxIDAtLjUyOC0uMDc3LS43MzctLjIxOC4yNC4zMTMuNjEzLjUxOSAxLjAzNy41MTlhMS4zMSAxLjMxIDAgMCAwIDEuMzEtMS4zMWMwLS40MjUtLjIwNS0uNzk4LS41MTgtMS4wMzhtLTMuMDg1IDBjLjE0Mi4yMS4yMTkuNDY2LjIxOS43MzdhMS4zMSAxLjMxIDAgMCAxLTEuMzEgMS4zMWMtLjI3MiAwLS41MjgtLjA3Ny0uNzM3LS4yMTguMjQuMzEzLjYxMi41MTkgMS4wMzcuNTE5YTEuMzEgMS4zMSAwIDAgMCAxLjMxLTEuMzFjMC0uNDI1LS4yMDUtLjc5OC0uNTE5LTEuMDM4bS0zLjAzIDMuMDNjLjE0Mi4yMS4yMi40NjYuMjIuNzM3YTEuMzEgMS4zMSAwIDAgMS0xLjMxMSAxLjMxYy0uMjcxIDAtLjUyOC0uMDc3LS43MzctLjIxOC4yNC4zMTMuNjEzLjUxOCAxLjAzNy41MThhMS4zMSAxLjMxIDAgMCAwIDEuMzEtMS4zMWMwLS40MjQtLjIwNS0uNzk4LS41MTgtMS4wMzdtMy4wMyAwYy4xNDIuMjEuMjE5LjQ2Ni4yMTkuNzM3YTEuMzEgMS4zMSAwIDAgMS0xLjMxIDEuMzFjLS4yNzIgMC0uNTI4LS4wNzctLjczNy0uMjE4LjI0LjMxMy42MTIuNTE4IDEuMDM3LjUxOGExLjMxIDEuMzEgMCAwIDAgMS4zMS0xLjMxYzAtLjQyNC0uMjA1LS43OTgtLjUxOS0xLjAzN20zLjA4NSAwYy4xNDEuMjEuMjE4LjQ2Ni4yMTguNzM3YTEuMzEgMS4zMSAwIDAgMS0xLjMxIDEuMzFjLS4yNzEgMC0uNTI4LS4wNzctLjczNy0uMjE4LjI0LjMxMy42MTMuNTE4IDEuMDM3LjUxOGExLjMxIDEuMzEgMCAwIDAgMS4zMS0xLjMxYzAtLjQyNC0uMjA1LS43OTgtLjUxOC0xLjAzNyIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6bm9uZSIvPjwvZz48L3N2Zz4=); background-position: 100% 100%; background-repeat: no-repeat; pointer-events: auto !important` |
| 451 | os-host-rtl | `.os-host-rtl > .os-scrollbar-corner.os-scrollbar-corner-resize` | `transform: scaleX(-1)` |
| 454 | os-host-overflow | `.os-host-overflow` | `overflow: hidden !important` |
| 457 | os-theme-none | `.os-theme-none > .os-scrollbar-corner, .os-theme-none > .os-scrollbar-horizontal, .os-theme-none > .os-scrollbar-vertical` | `display: none !important` |
| 462 | os-theme-none | `.os-theme-none > .os-scrollbar-corner-resize` | `display: block !important; min-height: 10px; min-width: 10px` |
| 467 | os-theme-dark | `.os-theme-dark > .os-scrollbar-horizontal, .os-theme-light > .os-scrollbar-horizontal` | `height: 10px; right: 10px` |
| 472 | os-theme-dark | `.os-theme-dark > .os-scrollbar-vertical, .os-theme-light > .os-scrollbar-vertical` | `bottom: 10px; width: 10px` |
| 477 | os-theme-dark | `.os-theme-dark.os-host-rtl > .os-scrollbar-horizontal, .os-theme-light.os-host-rtl > .os-scrollbar-horizontal` | `left: 10px; right: 0` |
| 482 | os-theme-dark | `.os-theme-dark > .os-scrollbar-corner, .os-theme-light > .os-scrollbar-corner` | `background-color: transparent; height: 10px; width: 10px` |
| 488 | os-theme-dark | `.os-theme-dark > .os-scrollbar, .os-theme-light > .os-scrollbar` | `background: transparent; box-sizing: border-box; padding: 2px` |
| 494 | os-theme-dark | `.os-theme-dark > .os-scrollbar.os-scrollbar-unusable, .os-theme-dark > .os-scrollbar > .os-scrollbar-track, .os-theme-light > .os-scrollbar.os-scrollbar-unusable, .os-theme-light > .os-scrollbar > .os-scrollbar-track` | `background: transparent` |
| 500 | os-theme-dark | `.os-theme-dark > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle, .os-theme-light > .os-scrollbar-horizontal > .os-scrollbar-track > .os-scrollbar-handle` | `min-width: 30px` |
| 504 | os-theme-dark | `.os-theme-dark > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle, .os-theme-light > .os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle` | `min-height: 30px` |
| 508 | os-theme-dark | `.os-theme-dark.os-host-transition > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle, .os-theme-light.os-host-transition > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle` | `transition: background-color .3s` |
| 512 | os-theme-dark | `.os-theme-dark > .os-scrollbar > .os-scrollbar-track, .os-theme-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle, .os-theme-light > .os-scrollbar > .os-scrollbar-track, .os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle` | `border-radius: 10px` |
| 518 | os-theme-dark | `.os-theme-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle` | `background: rgba(0, 0, 0, .4)` |
| 521 | os-theme-light | `.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle` | `background: hsla(0, 0%, 100%, .4)` |
| 524 | os-theme-dark | `.os-theme-dark > .os-scrollbar:hover > .os-scrollbar-track > .os-scrollbar-handle` | `background: rgba(0, 0, 0, .55)` |
| 527 | os-theme-light | `.os-theme-light > .os-scrollbar:hover > .os-scrollbar-track > .os-scrollbar-handle` | `background: hsla(0, 0%, 100%, .55)` |
| 530 | os-theme-dark | `.os-theme-dark > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle.active` | `background: rgba(0, 0, 0, .7)` |
| 533 | os-theme-light | `.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle.active` | `background: hsla(0, 0%, 100%, .7)` |
| 536 | os-theme-dark | `.os-theme-dark > .os-scrollbar-horizontal .os-scrollbar-handle:before, .os-theme-dark > .os-scrollbar-vertical .os-scrollbar-handle:before, .os-theme-light > .os-scrollbar-horizontal .os-scrollbar-handle:before, .os-theme-light > .os-scrollbar-vertical .os-scrollbar-handle:before` | `bottom: 0; content: ""; display: block; left: 0; position: absolute; right: 0; top: 0` |
| 548 | os-theme-dark | `.os-theme-dark.os-host-scrollbar-horizontal-hidden > .os-scrollbar-horizontal .os-scrollbar-handle:before, .os-theme-dark.os-host-scrollbar-vertical-hidden > .os-scrollbar-vertical .os-scrollbar-handle:before, .os-theme-light.os-host-scrollbar-horizontal-hidden > .os-scrollbar-horizontal .os-scrollbar-handle:before, .os-theme-light.os-host-scrollbar-vertical-hidden > .os-scrollbar-vertical .os-scrollbar-handle:before` | `display: none` |
| 554 | os-theme-dark | `.os-theme-dark > .os-scrollbar-horizontal .os-scrollbar-handle:before, .os-theme-light > .os-scrollbar-horizontal .os-scrollbar-handle:before` | `bottom: -2px; top: -6px` |
| 559 | os-theme-dark | `.os-theme-dark > .os-scrollbar-vertical .os-scrollbar-handle:before, .os-theme-light > .os-scrollbar-vertical .os-scrollbar-handle:before` | `left: -6px; right: -2px` |
| 564 | os-host-rtl | `.os-host-rtl.os-theme-dark > .os-scrollbar-vertical .os-scrollbar-handle:before, .os-host-rtl.os-theme-light > .os-scrollbar-vertical .os-scrollbar-handle:before` | `left: -2px; right: -6px` |
| 575 | GLOBAL | `:root` | `--swiper-theme-color: #007aff` |
| 578 | swiper | `.swiper` | `list-style: none; margin-left: auto; margin-right: auto; overflow: hidden; padding: 0; position: relative; z-index: 1` |
| 587 | swiper-vertical | `.swiper-vertical > .swiper-wrapper` | `flex-direction: column` |
| 590 | swiper-wrapper | `.swiper-wrapper` | `box-sizing: content-box; display: flex; height: 100%; position: relative; transition-property: transform; width: 100%; z-index: 1` |
| 599 | swiper-android | `.swiper-android .swiper-slide, .swiper-wrapper` | `transform: translateZ(0)` |
| 603 | swiper-pointer-events | `.swiper-pointer-events` | `touch-action: pan-y` |
| 606 | swiper-pointer-events | `.swiper-pointer-events.swiper-vertical` | `touch-action: pan-x` |
| 609 | swiper-slide | `.swiper-slide` | `flex-shrink: 0; height: 100%; position: relative; transition-property: transform; width: 100%` |
| 616 | swiper-slide-invisible-blank | `.swiper-slide-invisible-blank` | `visibility: hidden` |
| 619 | swiper-autoheight | `.swiper-autoheight, .swiper-autoheight .swiper-slide` | `height: auto` |
| 623 | swiper-autoheight | `.swiper-autoheight .swiper-wrapper` | `align-items: flex-start; transition-property: transform, height` |
| 627 | swiper-3d | `.swiper-3d, .swiper-3d.swiper-css-mode .swiper-wrapper` | `perspective: 1200px` |
| 631 | swiper-3d | `.swiper-3d .swiper-cube-shadow, .swiper-3d .swiper-slide, .swiper-3d .swiper-slide-shadow, .swiper-3d .swiper-slide-shadow-bottom, .swiper-3d .swiper-slide-shadow-left, .swiper-3d .swiper-slide-shadow-right, .swiper-3d .swiper-slide-shadow-top, .swiper-3d .swiper-wrapper` | `transform-style: preserve-3d` |
| 641 | swiper-3d | `.swiper-3d .swiper-slide-shadow, .swiper-3d .swiper-slide-shadow-bottom, .swiper-3d .swiper-slide-shadow-left, .swiper-3d .swiper-slide-shadow-right, .swiper-3d .swiper-slide-shadow-top` | `height: 100%; left: 0; pointer-events: none; position: absolute; top: 0; width: 100%; z-index: 10` |
| 654 | swiper-3d | `.swiper-3d .swiper-slide-shadow` | `background: rgba(0, 0, 0, .15)` |
| 657 | swiper-3d | `.swiper-3d .swiper-slide-shadow-left` | `background-image: linear-gradient( 270deg, rgba(0, 0, 0, .5), transparent)` |
| 664 | swiper-3d | `.swiper-3d .swiper-slide-shadow-right` | `background-image: linear-gradient( 90deg, rgba(0, 0, 0, .5), transparent)` |
| 671 | swiper-3d | `.swiper-3d .swiper-slide-shadow-top` | `background-image: linear-gradient( 0deg, rgba(0, 0, 0, .5), transparent)` |
| 678 | swiper-3d | `.swiper-3d .swiper-slide-shadow-bottom` | `background-image: linear-gradient( 180deg, rgba(0, 0, 0, .5), transparent)` |
| 685 | swiper-css-mode | `.swiper-css-mode > .swiper-wrapper` | `overflow: auto; scrollbar-width: none; -ms-overflow-style: none` |
| 690 | swiper-css-mode | `.swiper-css-mode > .swiper-wrapper::-webkit-scrollbar` | `display: none` |
| 693 | swiper-css-mode | `.swiper-css-mode > .swiper-wrapper > .swiper-slide` | `scroll-snap-align: start start` |
| 696 | swiper-horizontal | `.swiper-horizontal.swiper-css-mode > .swiper-wrapper` | `scroll-snap-type: x mandatory` |
| 699 | swiper-vertical | `.swiper-vertical.swiper-css-mode > .swiper-wrapper` | `scroll-snap-type: y mandatory` |
| 702 | swiper-centered | `.swiper-centered > .swiper-wrapper:before` | `content: ""; flex-shrink: 0; order: 9999` |
| 707 | swiper-centered | `.swiper-centered.swiper-horizontal > .swiper-wrapper > .swiper-slide:first-child` | `margin-inline-start: var(--swiper-centered-offset-before)` |
| 710 | swiper-centered | `.swiper-centered.swiper-horizontal > .swiper-wrapper:before` | `height: 100%; min-height: 1px; width: var(--swiper-centered-offset-after)` |
| 715 | swiper-centered | `.swiper-centered.swiper-vertical > .swiper-wrapper > .swiper-slide:first-child` | `margin-block-start: var(--swiper-centered-offset-before)` |
| 718 | swiper-centered | `.swiper-centered.swiper-vertical > .swiper-wrapper:before` | `height: var(--swiper-centered-offset-after); min-width: 1px; width: 100%` |
| 723 | swiper-centered | `.swiper-centered > .swiper-wrapper > .swiper-slide` | `scroll-snap-align: center center` |
| 726 | GLOBAL | `:root` | `--swiper-navigation-size: 44px` |
| 729 | swiper-button-next | `.swiper-button-next, .swiper-button-prev` | `align-items: center; color: var(--swiper-navigation-color,var(--swiper-theme-color)); cursor: pointer; display: flex; height: var(--swiper-navigation-size); justify-content: center; margin-top: calc(0px - var(--swiper-navigation-size)/2); position: absolute; top: 50%; width: calc(var(--swiper-navigation-size)/44*27); z-index: 10` |
| 743 | swiper-button-next | `.swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled` | `cursor: auto; opacity: .35; pointer-events: none` |
| 749 | swiper-button-next | `.swiper-button-next:after, .swiper-button-prev:after` | `font-family: swiper-icons; font-size: var(--swiper-navigation-size); font-variant: normal; letter-spacing: 0; line-height: 1; text-transform: none !important; text-transform: none` |
| 759 | swiper-button-prev | `.swiper-button-prev, .swiper-rtl .swiper-button-next` | `left: 10px; right: auto` |
| 764 | swiper-button-prev | `.swiper-button-prev:after, .swiper-rtl .swiper-button-next:after` | `content: "prev"` |
| 768 | swiper-button-next | `.swiper-button-next, .swiper-rtl .swiper-button-prev` | `left: auto; right: 10px` |
| 773 | swiper-button-next | `.swiper-button-next:after, .swiper-rtl .swiper-button-prev:after` | `content: "next"` |
| 777 | swiper-button-lock | `.swiper-button-lock` | `display: none` |
| 780 | swiper-pagination | `.swiper-pagination` | `position: absolute; text-align: center; transform: translateZ(0); transition: opacity .3s; z-index: 10` |
| 787 | swiper-pagination | `.swiper-pagination.swiper-pagination-hidden` | `opacity: 0` |
| 790 | swiper-horizontal | `.swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction` | `bottom: 10px; left: 0; width: 100%` |
| 798 | swiper-pagination-bullets-dynamic | `.swiper-pagination-bullets-dynamic` | `font-size: 0; overflow: hidden` |
| 802 | swiper-pagination-bullets-dynamic | `.swiper-pagination-bullets-dynamic .swiper-pagination-bullet` | `position: relative; transform: scale(.33)` |
| 806 | swiper-pagination-bullets-dynamic | `.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active, .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main` | `transform: scale(1)` |
| 810 | swiper-pagination-bullets-dynamic | `.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev` | `transform: scale(.66)` |
| 813 | swiper-pagination-bullets-dynamic | `.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev` | `transform: scale(.33)` |
| 816 | swiper-pagination-bullets-dynamic | `.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next` | `transform: scale(.66)` |
| 819 | swiper-pagination-bullets-dynamic | `.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next` | `transform: scale(.33)` |
| 822 | swiper-pagination-bullet | `.swiper-pagination-bullet` | `background: var(--swiper-pagination-bullet-inactive-color,#000); border-radius: 50%; display: inline-block; height: var(--swiper-pagination-bullet-height,var(--swiper-pagination-bullet-size,8px)); opacity: var(--swiper-pagination-bullet-inactive-opacity,.2); width: var(--swiper-pagination-bullet-width,var(--swiper-pagination-bullet-size,8px))` |
| 830 | swiper-pagination-bullet | `button.swiper-pagination-bullet` | `-webkit-appearance: none; -moz-appearance: none; appearance: none; border: none; box-shadow: none; margin: 0; padding: 0` |
| 839 | swiper-pagination-clickable | `.swiper-pagination-clickable .swiper-pagination-bullet` | `cursor: pointer` |
| 842 | swiper-pagination-bullet | `.swiper-pagination-bullet:only-child` | `display: none !important` |
| 845 | swiper-pagination-bullet-active | `.swiper-pagination-bullet-active` | `background: var(--swiper-pagination-color,var(--swiper-theme-color)); opacity: var(--swiper-pagination-bullet-opacity,1)` |
| 849 | swiper-pagination-vertical | `.swiper-pagination-vertical.swiper-pagination-bullets, .swiper-vertical > .swiper-pagination-bullets` | `right: 10px; top: 50%; transform: translate3d(0, -50%, 0)` |
| 855 | swiper-pagination-vertical | `.swiper-pagination-vertical.swiper-pagination-bullets .swiper-pagination-bullet, .swiper-vertical > .swiper-pagination-bullets .swiper-pagination-bullet` | `display: block; margin: var(--swiper-pagination-bullet-vertical-gap,6px) 0` |
| 860 | swiper-pagination-vertical | `.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic, .swiper-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic` | `top: 50%; transform: translateY(-50%); width: 8px` |
| 866 | swiper-pagination-vertical | `.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet, .swiper-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet` | `display: inline-block; transition: transform .2s, top .2s` |
| 871 | swiper-horizontal | `.swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet, .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet` | `margin: 0 var(--swiper-pagination-bullet-horizontal-gap,4px)` |
| 875 | swiper-horizontal | `.swiper-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic, .swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic` | `left: 50%; transform: translateX(-50%); white-space: nowrap` |
| 881 | swiper-horizontal | `.swiper-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet, .swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet` | `transition: transform .2s, left .2s` |
| 885 | swiper-horizontal | `.swiper-horizontal.swiper-rtl > .swiper-pagination-bullets-dynamic .swiper-pagination-bullet` | `transition: transform .2s, right .2s` |
| 888 | swiper-pagination-progressbar | `.swiper-pagination-progressbar` | `background: rgba(0, 0, 0, .25); position: absolute` |
| 892 | swiper-pagination-progressbar | `.swiper-pagination-progressbar .swiper-pagination-progressbar-fill` | `background: var(--swiper-pagination-color,var(--swiper-theme-color)); height: 100%; left: 0; position: absolute; top: 0; transform: scale(0); transform-origin: left top; width: 100%` |
| 902 | swiper-rtl | `.swiper-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill` | `transform-origin: right top` |
| 905 | swiper-horizontal | `.swiper-horizontal > .swiper-pagination-progressbar, .swiper-pagination-progressbar.swiper-pagination-horizontal, .swiper-pagination-progressbar.swiper-pagination-vertical.swiper-pagination-progressbar-opposite, .swiper-vertical > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite` | `height: 4px; left: 0; top: 0; width: 100%` |
| 914 | swiper-horizontal | `.swiper-horizontal > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite, .swiper-pagination-progressbar.swiper-pagination-horizontal.swiper-pagination-progressbar-opposite, .swiper-pagination-progressbar.swiper-pagination-vertical, .swiper-vertical > .swiper-pagination-progressbar` | `height: 100%; left: 0; top: 0; width: 4px` |
| 923 | swiper-pagination-lock | `.swiper-pagination-lock` | `display: none` |
| 926 | tippy-box | `.tippy-box[data-animation=fade][data-state=hidden]` | `opacity: 0` |
| 929 | GLOBAL | `[data-tippy-root]` | `max-width: calc(100vw - 10px)` |
| 932 | tippy-box | `.tippy-box` | `background-color: #333; border-radius: 4px; color: #fff; font-size: 14px; line-height: 1.4; outline: 0; position: relative; transition-property: transform, visibility, opacity; white-space: normal` |
| 946 | tippy-box | `.tippy-box[data-placement^=top] > .tippy-arrow` | `bottom: 0` |
| 949 | tippy-box | `.tippy-box[data-placement^=top] > .tippy-arrow:before` | `border-top-color: initial; border-width: 8px 8px 0; bottom: -7px; left: 0; transform-origin: center top` |
| 956 | tippy-box | `.tippy-box[data-placement^=bottom] > .tippy-arrow` | `top: 0` |
| 959 | tippy-box | `.tippy-box[data-placement^=bottom] > .tippy-arrow:before` | `border-bottom-color: initial; border-width: 0 8px 8px; left: 0; top: -7px; transform-origin: center bottom` |
| 966 | tippy-box | `.tippy-box[data-placement^=left] > .tippy-arrow` | `right: 0` |
| 969 | tippy-box | `.tippy-box[data-placement^=left] > .tippy-arrow:before` | `border-left-color: initial; border-width: 8px 0 8px 8px; right: -7px; transform-origin: center left` |
| 975 | tippy-box | `.tippy-box[data-placement^=right] > .tippy-arrow` | `left: 0` |
| 978 | tippy-box | `.tippy-box[data-placement^=right] > .tippy-arrow:before` | `border-right-color: initial; border-width: 8px 8px 8px 0; left: -7px; transform-origin: center right` |
| 984 | tippy-box | `.tippy-box[data-inertia][data-state=visible]` | `transition-timing-function: cubic-bezier(.54, 1.5, .38, 1.11)` |
| 987 | tippy-arrow | `.tippy-arrow` | `color: #333; height: 16px; width: 16px` |
| 992 | tippy-arrow | `.tippy-arrow:before` | `border-color: transparent; border-style: solid; content: ""; position: absolute` |
| 998 | tippy-content | `.tippy-content` | `padding: 5px 9px; position: relative; z-index: 1` |

### CSS覆盖检查结果与验证边界

PostCSS三文件全部解析成功：2304规则节点、6571声明、181media块；上方每一规则恰有一个目录行。所有声明均随规则或at-rule记录（font-face等另列），嵌套上下文保留。空样式桩已证明不执行；真实CSS现已完成可由源码确证的行为/状态/断点/变量/字体/URL/层级分析。没有做像素截图、真实字体加载、浏览器特性兼容或跨设备操作验证，这些仍必须在新应用验收时完成。
