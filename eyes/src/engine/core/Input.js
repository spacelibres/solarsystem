/** @eyes-analysis
 * 文件职责：收集键盘、鼠标、滚轮与多点触摸状态，识别活动视口并在帧末复位瞬时输入。
 * 依据：import ../pioneer/public-api.js；Touch @3
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:191020-198606.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** @eyes-analysis
 * 类职责：单个触点的当前位置与帧内输入状态。
 * 继承：无显式父类；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Touch {
  identifier;
  pressedPosition;
  pressedTime;
  lastFramePosition;
  thisFramePosition;
  /** @eyes-analysis
   * 【结构证据】写入 `identifier`、`lastFramePosition`、`pressedPosition`、`pressedTime`、`thisFramePosition`；调用 `new PioneerPublicApi.Vector2`。
   * 状态写入：identifier、lastFramePosition、pressedPosition、pressedTime、thisFramePosition。
   * 调用线索：new PioneerPublicApi.Vector2。
   */
  constructor() {
    this.identifier = 0;
    this.pressedPosition = new PioneerPublicApi.Vector2();
    this.pressedTime = 0;
    this.lastFramePosition = new PioneerPublicApi.Vector2();
    this.thisFramePosition = new PioneerPublicApi.Vector2();
  }
}
/** @eyes-analysis
 * 类职责：收集键盘、鼠标、滚轮与多点触摸状态，识别活动视口并在帧末复位瞬时输入。
 * 继承：无显式父类；导出：Input。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Input {
  /** @eyes-analysis
   * 【结构证据】写入 `_activeViewport`、`_cursorPosition`、`_draggedOffset`、`_engine`、`_keysPressed`、`_maxSelectDistance`、`_maxSelectTime`、`_modifierKeysPressed`；调用 `Date.now`、`Input._modifierKeys.has`、`Math.abs`、`Math.max`、`PioneerPublicApi.Vector2.pool.get`、`PioneerPublicApi.Vector2.pool.release`。
   * 状态写入：_activeViewport、_cursorPosition、_draggedOffset、_engine、_keysPressed、_maxSelectDistance、_maxSelectTime、_modifierKeysPressed等；完整记录见索引。
   * 调用线索：Date.now、Input._modifierKeys.has、Math.abs、Math.max、PioneerPublicApi.Vector2.pool.get等。
   */
  constructor(engine) {
    this._engine = engine;
    this._activeViewport = null;
    this._draggedOffset = new PioneerPublicApi.Vector2();
    this._zoomedOffset = 0;
    this._rotatedOffset = 0;
    this._shiftPressed = false;
    this._keysPressed = new Set();
    this._modifierKeysPressed = new Set();
    this._maxSelectTime = .5;
    this._maxSelectDistance = 5;
    this._cursorPosition = new PioneerPublicApi.Vector2();
    this._selected = false;
    this._selectedPosition = new PioneerPublicApi.Vector2();
    this._touches = [];
    window.addEventListener("blur", () => {
      this._touches = [];
      this._keysPressed.clear();
      this._modifierKeysPressed.clear();
      this._shiftPressed = false;
    });
    window.addEventListener("keydown", t => {
      t.target instanceof HTMLElement && ["INPUT", "SELECT", "TEXTAREA"].includes(t.target.tagName) || ("Shift" === t.key ? this._shiftPressed = true : Input._modifierKeys.has(t.key) ? (this._modifierKeysPressed.add(t.key.toLowerCase()), this._keysPressed.clear(), this._shiftPressed = false) : 0 === this._modifierKeysPressed.size && this._keysPressed.add(t.key.toLowerCase()));
    });
    window.addEventListener("keyup", t => {
      "Shift" === t.key ? this._shiftPressed = false : Input._modifierKeys.has(t.key) ? this._modifierKeysPressed.delete(t.key.toLowerCase()) : this._keysPressed.delete(t.key.toLowerCase());
    });
    this._engine.getRootDiv().addEventListener("mousedown", t => {
      if (0 === t.button && (document.activeElement instanceof HTMLElement && document.activeElement.blur(), 0 === this._touches.length)) {
        const e = this._engine.getRootDiv().getBoundingClientRect();
        let i = null;
        for (let t = 0; t < this._touches.length; t++) 0 === this._touches[t].identifier && (i = this._touches[t]);
        i ??= new Touch();
        i.identifier = 0;
        i.pressedPosition.set(t.clientX - e.left, t.clientY - e.top);
        i.pressedTime = Date.now();
        i.lastFramePosition.copy(i.pressedPosition);
        i.thisFramePosition.copy(i.pressedPosition);
        this._touches.push(i);
        this._updateActiveViewport();
      }
    });
    window.addEventListener("mousemove", t => {
      const e = this._engine.getRootDiv().getBoundingClientRect();
      if (1 === this._touches.length && 0 === this._touches[0].identifier) {
        const i = this._touches[0];
        i.thisFramePosition.set(t.clientX - e.left, t.clientY - e.top);
        this._draggedOffset.sub(i.thisFramePosition, i.lastFramePosition);
        const s = Math.max(Math.abs(i.thisFramePosition.x - i.pressedPosition.x), Math.abs(i.thisFramePosition.y - i.pressedPosition.y));
        (Date.now() - i.pressedTime) / 1e3 <= this._maxSelectTime && s <= this._maxSelectDistance && this._draggedOffset.set(0, 0);
      }
      this._touches.length <= 1 && this._cursorPosition.set(t.clientX - e.left, t.clientY - e.top);
    });
    window.addEventListener("mouseup", t => {
      if (0 === t.button && 1 === this._touches.length && 0 === this._touches[0].identifier) {
        const e = this._engine.getRootDiv().getBoundingClientRect();
        const i = this._touches[0];
        i.thisFramePosition.set(t.clientX - e.left, t.clientY - e.top);
        const s = Math.max(Math.abs(i.thisFramePosition.x - i.pressedPosition.x), Math.abs(i.thisFramePosition.y - i.pressedPosition.y));
        (Date.now() - i.pressedTime) / 1e3 <= this._maxSelectTime && s <= this._maxSelectDistance && (this._selected = true, this._selectedPosition.copy(i.thisFramePosition));
        this._touches.splice(0, 1);
      }
    });
    this._engine.getRootDiv().addEventListener("wheel", t => {
      this._zoomedOffset += .1 * t.deltaY;
      t.preventDefault();
    }, {
      passive: false
    });
    this._engine.getRootDiv().addEventListener("touchstart", t => {
      const e = this._engine.getRootDiv().getBoundingClientRect();
      for (let i = 0; i < t.changedTouches.length; i++) {
        const s = t.changedTouches[i];
        let n = null;
        for (let t = 0; t < this._touches.length; t++) this._touches[t].identifier === s.identifier && (n = this._touches[t]);
        n ??= new Touch();
        n.identifier = s.identifier;
        n.pressedPosition.set(s.pageX - window.pageXOffset - e.left, s.pageY - window.pageYOffset - e.top);
        n.pressedTime = Date.now();
        n.lastFramePosition.copy(n.pressedPosition);
        n.thisFramePosition.copy(n.pressedPosition);
        this._touches.push(n);
        1 === this._touches.length && this._cursorPosition.copy(n.thisFramePosition);
        this._updateActiveViewport();
      }
    }, {
      passive: false
    });
    window.addEventListener("touchmove", t => {
      const e = this._engine.getRootDiv().getBoundingClientRect();
      for (let i = 0; i < t.changedTouches.length; i++) {
        const n = t.changedTouches[i];
        for (let t = 0; t < this._touches.length; t++) {
          const i = this._touches[t];
          if (i.identifier === n.identifier) if (i.thisFramePosition.set(n.pageX - window.pageXOffset - e.left, n.pageY - window.pageYOffset - e.top), 1 === this._touches.length) {
            this._draggedOffset.sub(i.thisFramePosition, i.lastFramePosition);
            const t = Math.max(Math.abs(i.thisFramePosition.x - i.pressedPosition.x), Math.abs(i.thisFramePosition.y - i.pressedPosition.y));
            (Date.now() - i.pressedTime) / 1e3 <= this._maxSelectTime && t <= this._maxSelectDistance && this._draggedOffset.set(0, 0);
            this._cursorPosition.copy(i.thisFramePosition);
          } else if (2 === this._touches.length) {
            const e = PioneerPublicApi.Vector2.pool.get();
            e.sub(this._touches[t].thisFramePosition, this._touches[1 - t].thisFramePosition);
            const n = PioneerPublicApi.Vector2.pool.get();
            n.sub(this._touches[t].thisFramePosition, this._touches[t].lastFramePosition);
            const o = n.dot(e) / e.magnitude() / n.magnitude();
            const r = n.cross(e) / e.magnitude() / n.magnitude();
            o < -.7 ? this._zoomedOffset += -(o + .7) * n.magnitude() : o > .7 ? this._zoomedOffset += -(o - .7) * n.magnitude() : Math.abs(r) > .3 && (this._rotatedOffset += r * n.magnitude());
            PioneerPublicApi.Vector2.pool.release(n);
            PioneerPublicApi.Vector2.pool.release(e);
            const a = Math.max(Math.abs(i.thisFramePosition.x - i.pressedPosition.x), Math.abs(i.thisFramePosition.y - i.pressedPosition.y));
            (Date.now() - i.pressedTime) / 1e3 <= this._maxSelectTime && a <= this._maxSelectDistance && (this._zoomedOffset = 0, this._rotatedOffset = 0);
          }
        }
      }
    });
    window.addEventListener("touchend", t => {
      const e = this._engine.getRootDiv().getBoundingClientRect();
      for (let i = 0; i < t.changedTouches.length; i++) {
        const s = t.changedTouches[i];
        for (let t = 0; t < this._touches.length; t++) {
          const i = this._touches[t];
          if (i.identifier === s.identifier) {
            if (i.thisFramePosition.set(s.pageX - window.pageXOffset - e.left, s.pageY - window.pageYOffset - e.top), 1 === this._touches.length) {
              const t = Math.max(Math.abs(i.thisFramePosition.x - i.pressedPosition.x), Math.abs(i.thisFramePosition.y - i.pressedPosition.y));
              (Date.now() - i.pressedTime) / 1e3 <= this._maxSelectTime && t <= this._maxSelectDistance && (this._selected = true, this._selectedPosition.copy(i.thisFramePosition));
            }
            this._touches.splice(t, 1);
          }
        }
      }
    });
    window.addEventListener("touchcancel", () => {});
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._activeViewport`。
   */
  getActiveViewport() {
    return this._activeViewport;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._draggedOffset`。
   */
  getDraggedOffset() {
    return this._draggedOffset;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._zoomedOffset`。
   */
  getZoomedOffset() {
    return this._zoomedOffset;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._rotatedOffset`。
   */
  getRotatedOffset() {
    return this._rotatedOffset;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._shiftPressed`。
   */
  isShiftPressed() {
    return this._shiftPressed;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._keysPressed.has(t)`；调用 `this._keysPressed.has`。
   * 调用线索：this._keysPressed.has。
   */
  isKeyPressed(t) {
    return this._keysPressed.has(t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._selected`。
   */
  isSelected() {
    return this._selected;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._selectedPosition`。
   */
  getSelectedPosition() {
    return this._selectedPosition;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._cursorPosition`。
   */
  getCursorPosition() {
    return this._cursorPosition;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_activeViewport`。
   * 状态写入：_activeViewport。
   */
  __setActiveViewport(activeViewport) {
    this._activeViewport = activeViewport;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_rotatedOffset`、`_selected`、`_zoomedOffset`；调用 `e.lastFramePosition.copy`、`this._draggedOffset.set`。
   * 状态写入：_rotatedOffset、_selected、_zoomedOffset。
   * 调用线索：e.lastFramePosition.copy、this._draggedOffset.set。
   */
  __resetStatesForNextFrame() {
    for (let t = 0; t < this._touches.length; t++) {
      const e = this._touches[t];
      e.lastFramePosition.copy(e.thisFramePosition);
    }
    this._selected = false;
    this._draggedOffset.set(0, 0);
    this._zoomedOffset = 0;
    this._rotatedOffset = 0;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_activeViewport`；调用 `activeViewport.getBounds`、`activeViewport.isEnabled`、`i.contains`、`this._engine.getNumViewports`、`this._engine.getViewportAt`。
   * 状态写入：_activeViewport。
   * 调用线索：activeViewport.getBounds、activeViewport.isEnabled、i.contains、this._engine.getNumViewports、this._engine.getViewportAt。
   */
  _updateActiveViewport() {
    this._activeViewport = null;
    for (let t = this._engine.getNumViewports() - 1; t >= 0; t--) {
      const activeViewport = this._engine.getViewportAt(t);
      const i = activeViewport.getBounds();
      const s = this._touches[0];
      if (activeViewport.isEnabled() && s && i.contains(s.pressedPosition)) {
        this._activeViewport = activeViewport;
        break;
      }
    }
  }
  _engine;
  _activeViewport;
  _draggedOffset;
  _zoomedOffset;
  _rotatedOffset;
  _shiftPressed;
  _keysPressed;
  _modifierKeysPressed;
  _maxSelectTime;
  _maxSelectDistance;
  _cursorPosition;
  _selected;
  _selectedPosition;
  _touches;
  static _modifierKeys = new Set(["Alt", "AltGraph", "CapsLock", "Control", "Fn", "FnLock", "Hyper", "Meta", "NumLock", "ScrollLock", "Shift", "Super", "Symbol", "SymbolLock"]);
}
export { Input };
