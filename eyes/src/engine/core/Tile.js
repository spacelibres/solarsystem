// 瓦片切分先加载所有叶级替代再隐藏父级，合并则先加载父级再卸载后代；transitioning 阻止交错切换，destroy 递归释放已加载瓦片。保留加载失败仍进入 Loaded 的现有状态机。
// Recovered from app.js:40703-43267.
const TileState = {
  Unloaded: Symbol("unloaded"),
  Loading: Symbol("loading"),
  Loaded: Symbol("loaded")
};
class Tile {
  constructor(parent) {
    this._parent = parent;
    this._children = [];
    this._state = TileState.Unloaded;
    this._splitFailed = false;
    this._destroyed = false;
    this._transitioning = false;
  }
  getParent() {
    return this._parent;
  }
  async forceLoad() {
    this._transitioning = true;
    this._state = TileState.Loading;
    await this.load();
    this._state = TileState.Loaded;
    this.setVisible(true);
    this._transitioning = false;
  }
  check() {
    if (!(this._destroyed || this._transitioning)) {
      if (0 === this._children.length && !this._splitFailed && this.checkSplit()) {
        this._split();
      } else {
        if (this._children.length > 0 && this.checkJoin()) {
          this._join();
        }
      }
    }
    return this._transitioning;
  }
  getChildren() {
    return this._children;
  }
  destroy() {
    for (let childIndex = 0; childIndex < this._children.length; childIndex++) this._children[childIndex].destroy();
    if (this._state === TileState.Loaded) {
      this.setVisible(false);
      this._state = TileState.Unloaded;
      this.unload();
    }
    this._destroyed = true;
  }
  isDestroyed() {
    return this._destroyed;
  }
  // 叶级全部加载完成后统一显隐交接；过渡期间父级继续可见，避免中间帧出现空洞。
  async _split() {
    const descendants = [];
    const leaves = [];
    this._splitAndGetNeedingLoad(descendants, leaves);
    for (let tileIndex = 0; tileIndex < descendants.length; tileIndex++) descendants[tileIndex]._transitioning = true;
    this._transitioning = true;
    const requests = [];
    for (let leafIndex = 0; leafIndex < leaves.length; leafIndex++) {
      const leaf = leaves[leafIndex];
      leaf._state = TileState.Loading;
      requests.push(leaf.load().catch(async error => {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }).finally(() => {
        leaf._state = TileState.Loaded;
      }));
    }
    await Promise.allSettled(requests);
    for (let leafIndex = 0; leafIndex < leaves.length; leafIndex++) {
      leaves[leafIndex].setVisible(true);
    }
    if (this._state === TileState.Loaded) {
      this._state = TileState.Unloaded;
      this.setVisible(false);
      this.unload();
    }
    for (let tileIndex = 0; tileIndex < descendants.length; tileIndex++) descendants[tileIndex]._transitioning = false;
    this._transitioning = false;
  }
  // 已有后代若仍过渡则不合并；父级就绪后才清理后代，保留原失败处理和状态推进。
  async _join() {
    const descendants = [];
    this._getDescendentTiles(descendants);
    for (let tileIndex = 0; tileIndex < descendants.length; tileIndex++) if (descendants[tileIndex]._transitioning) return;
    const loadedTiles = [];
    for (let tileIndex = 0; tileIndex < descendants.length; tileIndex++) {
      const tile = descendants[tileIndex];
      if (tile._state === TileState.Loaded) {
        loadedTiles.push(tile);
      }
      tile._transitioning = true;
    }
    this._transitioning = true;
    this._state = TileState.Loading;
    try {
      await this.load();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
    this._state = TileState.Loaded;
    this.setVisible(true);
    for (let loadedIndex = 0; loadedIndex < loadedTiles.length; loadedIndex++) {
      const tile = loadedTiles[loadedIndex];
      if (tile._state === TileState.Loaded) {
        tile.setVisible(false);
        tile._state = TileState.Unloaded;
        tile.unload();
      }
    }
    for (let tileIndex = 0; tileIndex < descendants.length; tileIndex++) descendants[tileIndex]._destroyed = true;
    if (this._destroyed && this._state === TileState.Loaded) {
      this.setVisible(false);
      this._state = TileState.Unloaded;
      this.unload();
    }
    this._children = [];
    this._transitioning = false;
  }
  _splitAndGetNeedingLoad(descendants, leaves) {
    for (let childColumn = 0; childColumn < 2; childColumn++) for (let childRow = 0; childRow < 2; childRow++) {
      const child = this.createNewTile(this, childColumn, childRow);
      if (child) {
        this._children.push(child);
        if (child.checkSplit()) {
          child._splitAndGetNeedingLoad(descendants, leaves);
        } else {
          leaves.push(child);
        }
        descendants.push(child);
      }
    }
  }
  _getDescendentTiles(output) {
    for (let childIndex = 0; childIndex < this._children.length; childIndex++) {
      const child = this._children[childIndex];
      output.push(child);
      child._getDescendentTiles(output);
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
