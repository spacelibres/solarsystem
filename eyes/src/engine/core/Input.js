// 输入将鼠标和触摸统一为 Touch 状态，按按下时长与位移区分点击/拖动；双指位移在连线方向上的点积用于缩放、叉积用于旋转。每帧结束只清增量及 selected，保留按键和持续触点。
// Recovered from app.js:191020-198606.
import * as PioneerPublicApi from "../pioneer/public-api.js";
class Touch {
  identifier;
  pressedPosition;
  pressedTime;
  lastFramePosition;
  thisFramePosition;
  constructor() {
    this.identifier = 0;
    this.pressedPosition = new PioneerPublicApi.Vector2();
    this.pressedTime = 0;
    this.lastFramePosition = new PioneerPublicApi.Vector2();
    this.thisFramePosition = new PioneerPublicApi.Vector2();
  }
}
class Input {
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
    window.addEventListener("keydown", keyEvent => {
      if (!(keyEvent.target instanceof HTMLElement && ["INPUT", "SELECT", "TEXTAREA"].includes(keyEvent.target.tagName))) {
        if ("Shift" === keyEvent.key) {
          this._shiftPressed = true;
        } else {
          if (Input._modifierKeys.has(keyEvent.key)) {
            this._modifierKeysPressed.add(keyEvent.key.toLowerCase());
            this._keysPressed.clear();
            this._shiftPressed = false;
          } else {
            if (0 === this._modifierKeysPressed.size) {
              this._keysPressed.add(keyEvent.key.toLowerCase());
            }
          }
        }
      }
    });
    window.addEventListener("keyup", keyEvent => {
      if ("Shift" === keyEvent.key) {
        this._shiftPressed = false;
      } else {
        if (Input._modifierKeys.has(keyEvent.key)) {
          this._modifierKeysPressed.delete(keyEvent.key.toLowerCase());
        } else {
          this._keysPressed.delete(keyEvent.key.toLowerCase());
        }
      }
    });
    this._engine.getRootDiv().addEventListener("mousedown", mouseEvent => {
      if (0 === mouseEvent.button && (document.activeElement instanceof HTMLElement && document.activeElement.blur(), 0 === this._touches.length)) {
        const rootBounds = this._engine.getRootDiv().getBoundingClientRect();
        let touch = null;
        for (let touchIndex = 0; touchIndex < this._touches.length; touchIndex++) if (0 === this._touches[touchIndex].identifier) {
          touch = this._touches[touchIndex];
        }
        touch ??= new Touch();
        touch.identifier = 0;
        touch.pressedPosition.set(mouseEvent.clientX - rootBounds.left, mouseEvent.clientY - rootBounds.top);
        touch.pressedTime = Date.now();
        touch.lastFramePosition.copy(touch.pressedPosition);
        touch.thisFramePosition.copy(touch.pressedPosition);
        this._touches.push(touch);
        this._updateActiveViewport();
      }
    });
    window.addEventListener("mousemove", mouseEvent => {
      const rootBounds = this._engine.getRootDiv().getBoundingClientRect();
      if (1 === this._touches.length && 0 === this._touches[0].identifier) {
        const touch = this._touches[0];
        touch.thisFramePosition.set(mouseEvent.clientX - rootBounds.left, mouseEvent.clientY - rootBounds.top);
        this._draggedOffset.sub(touch.thisFramePosition, touch.lastFramePosition);
        const displacement = Math.max(Math.abs(touch.thisFramePosition.x - touch.pressedPosition.x), Math.abs(touch.thisFramePosition.y - touch.pressedPosition.y));
        if ((Date.now() - touch.pressedTime) / 1e3 <= this._maxSelectTime && displacement <= this._maxSelectDistance) {
          this._draggedOffset.set(0, 0);
        }
      }
      if (this._touches.length <= 1) {
        this._cursorPosition.set(mouseEvent.clientX - rootBounds.left, mouseEvent.clientY - rootBounds.top);
      }
    });
    window.addEventListener("mouseup", mouseEvent => {
      if (0 === mouseEvent.button && 1 === this._touches.length && 0 === this._touches[0].identifier) {
        const rootBounds = this._engine.getRootDiv().getBoundingClientRect();
        const touch = this._touches[0];
        touch.thisFramePosition.set(mouseEvent.clientX - rootBounds.left, mouseEvent.clientY - rootBounds.top);
        const displacement = Math.max(Math.abs(touch.thisFramePosition.x - touch.pressedPosition.x), Math.abs(touch.thisFramePosition.y - touch.pressedPosition.y));
        if ((Date.now() - touch.pressedTime) / 1e3 <= this._maxSelectTime && displacement <= this._maxSelectDistance) {
          this._selected = true;
          this._selectedPosition.copy(touch.thisFramePosition);
        }
        this._touches.splice(0, 1);
      }
    });
    this._engine.getRootDiv().addEventListener("wheel", wheelEvent => {
      this._zoomedOffset += .1 * wheelEvent.deltaY;
      wheelEvent.preventDefault();
    }, {
      passive: false
    });
    this._engine.getRootDiv().addEventListener("touchstart", touchEvent => {
      const rootBounds = this._engine.getRootDiv().getBoundingClientRect();
      for (let changedIndex = 0; changedIndex < touchEvent.changedTouches.length; changedIndex++) {
        const browserTouch = touchEvent.changedTouches[changedIndex];
        let touch = null;
        for (let touchIndex = 0; touchIndex < this._touches.length; touchIndex++) if (this._touches[touchIndex].identifier === browserTouch.identifier) {
          touch = this._touches[touchIndex];
        }
        touch ??= new Touch();
        touch.identifier = browserTouch.identifier;
        touch.pressedPosition.set(browserTouch.pageX - window.pageXOffset - rootBounds.left, browserTouch.pageY - window.pageYOffset - rootBounds.top);
        touch.pressedTime = Date.now();
        touch.lastFramePosition.copy(touch.pressedPosition);
        touch.thisFramePosition.copy(touch.pressedPosition);
        this._touches.push(touch);
        if (1 === this._touches.length) {
          this._cursorPosition.copy(touch.thisFramePosition);
        }
        this._updateActiveViewport();
      }
    }, {
      passive: false
    });
    window.addEventListener("touchmove", touchEvent => {
      const rootBounds = this._engine.getRootDiv().getBoundingClientRect();
      for (let changedIndex = 0; changedIndex < touchEvent.changedTouches.length; changedIndex++) {
        const browserTouch = touchEvent.changedTouches[changedIndex];
        for (let touchIndex = 0; touchIndex < this._touches.length; touchIndex++) {
          const touch = this._touches[touchIndex];
          if (touch.identifier === browserTouch.identifier) {
            touch.thisFramePosition.set(browserTouch.pageX - window.pageXOffset - rootBounds.left, browserTouch.pageY - window.pageYOffset - rootBounds.top);
            if (1 === this._touches.length) {
              this._draggedOffset.sub(touch.thisFramePosition, touch.lastFramePosition);
              const displacement = Math.max(Math.abs(touch.thisFramePosition.x - touch.pressedPosition.x), Math.abs(touch.thisFramePosition.y - touch.pressedPosition.y));
              if ((Date.now() - touch.pressedTime) / 1e3 <= this._maxSelectTime && displacement <= this._maxSelectDistance) {
                this._draggedOffset.set(0, 0);
              }
              this._cursorPosition.copy(touch.thisFramePosition);
            } else if (2 === this._touches.length) {
              const separation = PioneerPublicApi.Vector2.pool.get();
              separation.sub(this._touches[touchIndex].thisFramePosition, this._touches[1 - touchIndex].thisFramePosition);
              const movement = PioneerPublicApi.Vector2.pool.get();
              movement.sub(this._touches[touchIndex].thisFramePosition, this._touches[touchIndex].lastFramePosition);
              const radialCos = movement.dot(separation) / separation.magnitude() / movement.magnitude();
              const tangentialSin = movement.cross(separation) / separation.magnitude() / movement.magnitude();
              if (radialCos < -.7) {
                this._zoomedOffset += -(radialCos + .7) * movement.magnitude();
              } else {
                if (radialCos > .7) {
                  this._zoomedOffset += -(radialCos - .7) * movement.magnitude();
                } else {
                  if (Math.abs(tangentialSin) > .3) {
                    this._rotatedOffset += tangentialSin * movement.magnitude();
                  }
                }
              }
              PioneerPublicApi.Vector2.pool.release(movement);
              PioneerPublicApi.Vector2.pool.release(separation);
              const displacement = Math.max(Math.abs(touch.thisFramePosition.x - touch.pressedPosition.x), Math.abs(touch.thisFramePosition.y - touch.pressedPosition.y));
              if ((Date.now() - touch.pressedTime) / 1e3 <= this._maxSelectTime && displacement <= this._maxSelectDistance) {
                this._zoomedOffset = 0;
                this._rotatedOffset = 0;
              }
            }
          }
        }
      }
    });
    window.addEventListener("touchend", touchEvent => {
      const rootBounds = this._engine.getRootDiv().getBoundingClientRect();
      for (let changedIndex = 0; changedIndex < touchEvent.changedTouches.length; changedIndex++) {
        const browserTouch = touchEvent.changedTouches[changedIndex];
        for (let touchIndex = 0; touchIndex < this._touches.length; touchIndex++) {
          const touch = this._touches[touchIndex];
          if (touch.identifier === browserTouch.identifier) {
            touch.thisFramePosition.set(browserTouch.pageX - window.pageXOffset - rootBounds.left, browserTouch.pageY - window.pageYOffset - rootBounds.top);
            if (1 === this._touches.length) {
              const displacement = Math.max(Math.abs(touch.thisFramePosition.x - touch.pressedPosition.x), Math.abs(touch.thisFramePosition.y - touch.pressedPosition.y));
              if ((Date.now() - touch.pressedTime) / 1e3 <= this._maxSelectTime && displacement <= this._maxSelectDistance) {
                this._selected = true;
                this._selectedPosition.copy(touch.thisFramePosition);
              }
            }
            this._touches.splice(touchIndex, 1);
          }
        }
      }
    });
    window.addEventListener("touchcancel", () => {});
  }
  getActiveViewport() {
    return this._activeViewport;
  }
  getDraggedOffset() {
    return this._draggedOffset;
  }
  getZoomedOffset() {
    return this._zoomedOffset;
  }
  getRotatedOffset() {
    return this._rotatedOffset;
  }
  isShiftPressed() {
    return this._shiftPressed;
  }
  isKeyPressed(key) {
    return this._keysPressed.has(key);
  }
  isSelected() {
    return this._selected;
  }
  getSelectedPosition() {
    return this._selectedPosition;
  }
  getCursorPosition() {
    return this._cursorPosition;
  }
  __setActiveViewport(activeViewport) {
    this._activeViewport = activeViewport;
  }
  // 当前触点成为下一帧基准；每帧消费的点击/拖动/缩放/旋转清零，不清持续按键。
  __resetStatesForNextFrame() {
    for (let touchIndex = 0; touchIndex < this._touches.length; touchIndex++) {
      const touch = this._touches[touchIndex];
      touch.lastFramePosition.copy(touch.thisFramePosition);
    }
    this._selected = false;
    this._draggedOffset.set(0, 0);
    this._zoomedOffset = 0;
    this._rotatedOffset = 0;
  }
  _updateActiveViewport() {
    this._activeViewport = null;
    for (let viewportIndex = this._engine.getNumViewports() - 1; viewportIndex >= 0; viewportIndex--) {
      const activeViewport = this._engine.getViewportAt(viewportIndex);
      const bounds = activeViewport.getBounds();
      const touch = this._touches[0];
      if (activeViewport.isEnabled() && touch && bounds.contains(touch.pressedPosition)) {
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
