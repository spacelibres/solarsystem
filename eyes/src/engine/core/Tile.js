// Recovered from app.js:40703-43267.
const s = {
  Unloaded: Symbol("unloaded"),
  Loading: Symbol("loading"),
  Loaded: Symbol("loaded")
};
class Tile {
  constructor(parent) {
    this._parent = parent;
    this._children = [];
    this._state = s.Unloaded;
    this._splitFailed = false;
    this._destroyed = false;
    this._transitioning = false;
  }
  getParent() {
    return this._parent;
  }
  async forceLoad() {
    this._transitioning = true;
    this._state = s.Loading;
    await this.load();
    this._state = s.Loaded;
    this.setVisible(true);
    this._transitioning = false;
  }
  check() {
    this._destroyed || this._transitioning || (0 === this._children.length && !this._splitFailed && this.checkSplit() ? this._split() : this._children.length > 0 && this.checkJoin() && this._join());
    return this._transitioning;
  }
  getChildren() {
    return this._children;
  }
  destroy() {
    for (let t = 0; t < this._children.length; t++) this._children[t].destroy();
    this._state === s.Loaded && (this.setVisible(false), this._state = s.Unloaded, this.unload());
    this._destroyed = true;
  }
  isDestroyed() {
    return this._destroyed;
  }
  async _split() {
    const t = [];
    const e = [];
    this._splitAndGetNeedingLoad(t, e);
    for (let e = 0; e < t.length; e++) t[e]._transitioning = true;
    this._transitioning = true;
    const i = [];
    for (let t = 0; t < e.length; t++) {
      const n = e[t];
      n._state = s.Loading;
      i.push(n.load().catch(async t => {
        t instanceof Error && console.log(t.message);
      }).finally(() => {
        n._state = s.Loaded;
      }));
    }
    await Promise.allSettled(i);
    for (let t = 0; t < e.length; t++) {
      e[t].setVisible(true);
    }
    this._state === s.Loaded && (this._state = s.Unloaded, this.setVisible(false), this.unload());
    for (let e = 0; e < t.length; e++) t[e]._transitioning = false;
    this._transitioning = false;
  }
  async _join() {
    const t = [];
    this._getDescendentTiles(t);
    for (let e = 0; e < t.length; e++) if (t[e]._transitioning) return;
    const e = [];
    for (let i = 0; i < t.length; i++) {
      const n = t[i];
      n._state === s.Loaded && e.push(n);
      n._transitioning = true;
    }
    this._transitioning = true;
    this._state = s.Loading;
    try {
      await this.load();
    } catch (t) {
      t instanceof Error && console.log(t.message);
    }
    this._state = s.Loaded;
    this.setVisible(true);
    for (let t = 0; t < e.length; t++) {
      const i = e[t];
      i._state === s.Loaded && (i.setVisible(false), i._state = s.Unloaded, i.unload());
    }
    for (let e = 0; e < t.length; e++) t[e]._destroyed = true;
    this._destroyed && this._state === s.Loaded && (this.setVisible(false), this._state = s.Unloaded, this.unload());
    this._children = [];
    this._transitioning = false;
  }
  _splitAndGetNeedingLoad(t, e) {
    for (let i = 0; i < 2; i++) for (let s = 0; s < 2; s++) {
      const n = this.createNewTile(this, i, s);
      n && (this._children.push(n), n.checkSplit() ? n._splitAndGetNeedingLoad(t, e) : e.push(n), t.push(n));
    }
  }
  _getDescendentTiles(t) {
    for (let e = 0; e < this._children.length; e++) {
      const i = this._children[e];
      t.push(i);
      i._getDescendentTiles(t);
    }
  }
  _parent;
  _children;
  _state;
  _splitFailed;
  _destroyed;
  _transitioning;
}
export { Tile };
