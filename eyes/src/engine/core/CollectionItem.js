/** @eyes-analysis
 * 文件职责：带名称、启用与销毁生命周期的集合项，以及按名称/类型索引、移动和销毁项目的 Collection 容器。
 * 依据：CollectionItem @2；Collection @36
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:26059-29352.
/** @eyes-analysis
 * 类职责：带名称、启用与销毁生命周期的集合项，以及按名称/类型索引、移动和销毁项目的 Collection 容器。
 * 继承：无显式父类；导出：CollectionItem。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class CollectionItem {
  /** @eyes-analysis
   * 【结构证据】写入 `_classIndex`、`_collectionParent`、`_index`、`_name`。
   * 状态写入：_classIndex、_collectionParent、_index、_name。
   */
  constructor(name, collectionParent) {
    this._index = 0;
    this._classIndex = 0;
    this._name = name;
    this._collectionParent = collectionParent;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._index`。
   */
  getIndex() {
    return this._index;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_index`。
   * 状态写入：_index。
   */
  __setIndex(index) {
    this._index = index;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._classIndex`。
   */
  getClassIndex() {
    return this._classIndex;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_classIndex`。
   * 状态写入：_classIndex。
   */
  __setClassIndex(classIndex) {
    this._classIndex = classIndex;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._name`。
   */
  getName() {
    return this._name;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._collectionParent`。
   */
  __getCollectionParent() {
    return this._collectionParent;
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_collectionParent`。
   * 状态写入：_collectionParent。
   */
  __setCollectionParent(collectionParent) {
    this._collectionParent = collectionParent;
  }
  /** @eyes-analysis
   * 【结构证据】空方法/无可观测字段副作用的协议钩子；须结合继承者或调用者解释。
   */
  __destroy() {}
  _index;
  _classIndex;
  _name;
  _collectionParent;
}
/** @eyes-analysis
 * 类职责：带名称、启用与销毁生命周期的集合项，以及按名称/类型索引、移动和销毁项目的 Collection 容器。
 * 继承：无显式父类；导出：Collection。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Collection {
  /** @eyes-analysis
   * 【结构证据】写入 `_items`、`_itemsByClass`、`_itemsByName`、`_parent`；调用 `new Map`。
   * 状态写入：_items、_itemsByClass、_itemsByName、_parent。
   * 调用线索：new Map。
   */
  constructor(parent) {
    this._parent = parent;
    this._items = [];
    this._itemsByName = new Map();
    this._itemsByClass = new Map();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `this._items[t].__destroy`。
   * 调用线索：this._items[t].__destroy。
   */
  __destroy() {
    for (let t = this._items.length - 1; t >= 0; t--) this._items[t].__destroy();
  }
  /** @eyes-analysis
   * 【结构证据】返回 `i?i[e]??null:null` 或 `i instanceof t?i:null`；调用 `this._itemsByClass.get`、`this._itemsByName.get`。
   * 调用线索：this._itemsByClass.get、this._itemsByName.get。
   */
  get(t, e = 0) {
    if ("number" == typeof e) {
      const i = this._itemsByClass.get(t);
      return i ? i[e] ?? null : null;
    }
    {
      const i = this._itemsByName.get(e);
      return i instanceof t ? i : null;
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._items[t]`。
   */
  getAt(t) {
    return this._items[t];
  }
  /** @eyes-analysis
   * 【结构证据】返回 `this._items.length`。
   */
  getSize() {
    return this._items.length;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `i` 或 `s[e??0]??null`；调用 `this._itemsByName.get`。
   * 调用线索：this._itemsByName.get。
   */
  getAny(t, e) {
    const i = this._itemsByName.get(t);
    if (i) return i;
    for (const [i, s] of this._itemsByClass) if (i.name === t) return s[e ?? 0] ?? null;
    return null;
  }
  /** @eyes-analysis
   * 【结构证据】返回 `s`；调用 `e[0].match`、`i.getIndex`、`new Error`、`new t`、`this._addToLists`、`this._itemsByName.has`；含显式错误分支。
   * 调用线索：e[0].match、i.getIndex、new Error、new t、this._addToLists等。
   */
  add(t, e = "", i) {
    if ("" !== e && e[0].match("/A-Z/")) throw new Error(`The name "${e}" must start with lowercase to differentiate it from class names.`);
    if ("" !== e && this._itemsByName.has(e)) throw new Error(`Already added "${e}".`);
    if (i && this._items[i.getIndex()] !== i) throw new Error(`While adding ${t.name}${"" !== e ? ` named ${e}` : ""}: The beforeItem ${i} does not exist in the same class list.`);
    try {
      const s = new t(e, this._parent);
      this._addToLists(s, i);
      return s;
    } catch (i) {
      throw i instanceof Error && (i.message = `While adding ${t.name}${"" !== e ? ` named ${e}` : ""}: ${i.message}`), i;
    }
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e._addToLists`、`e._itemsByName.has`、`new Error`、`s.__setCollectionParent`、`s.getIndex`、`s.getName`；含显式错误分支。
   * 调用线索：e._addToLists、e._itemsByName.has、new Error、s.__setCollectionParent、s.getIndex等。
   */
  move(t, e, i) {
    let s;
    if ("string" == typeof t) {
      if (s = this._itemsByName.get(t), !s) throw new Error(`There is no item with name ${t}.`);
    } else s = t;
    const n = s.getIndex();
    if (s !== this._items[n]) throw new Error(`While moving ${s}, it is not in the source collection.`);
    const o = s.getName();
    if ("" !== o && e._itemsByName.has(o)) throw new Error(`While moving ${s}, an item with the same name "${o}" already exists in the destination collection.`);
    this._removeFromLists(s.getIndex(), s);
    e._addToLists(s, i);
    s.__setCollectionParent(e._parent);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.__destroy`、`e.getIndex`、`new Error`、`this._itemsByName.get`、`this._removeFromLists`；含显式错误分支。
   * 调用线索：e.__destroy、e.getIndex、new Error、this._itemsByName.get、this._removeFromLists。
   */
  remove(t) {
    let e;
    if ("string" == typeof t) {
      if (e = this._itemsByName.get(t), !e) throw new Error(`There is no item with name "${t}".`);
    } else e = t;
    const i = e.getIndex();
    if (e !== this._items[i]) throw new Error(`While removing ${e}, it is not in the collection.`);
    this._removeFromLists(i, e);
    e.__destroy();
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_items`；调用 `this._itemsByClass.clear`、`this._itemsByName.clear`、`this._items[t].__destroy`。
   * 状态写入：_items。
   * 调用线索：this._itemsByClass.clear、this._itemsByName.clear、this._items[t].__destroy。
   */
  clear() {
    for (let t = 0, e = this._items.length; t < e; t++) this._items[t].__destroy();
    this._items = [];
    this._itemsByClass.clear();
    this._itemsByName.clear();
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.getIndex`、`t.getName`、`this._items.splice`、`this._itemsByName.set`、`this._updateIndices`。
   * 调用线索：e.getIndex、t.getName、this._items.splice、this._itemsByName.set、this._updateIndices。
   */
  _addToLists(t, e) {
    const i = void 0 !== e ? e.getIndex() : this._items.length;
    this._items.splice(i, 0, t);
    "" !== t.getName() && this._itemsByName.set(t.getName(), t);
    this._updateIndices(i, t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.getName`、`this._items.splice`、`this._itemsByName.delete`、`this._updateIndices`。
   * 调用线索：e.getName、this._items.splice、this._itemsByName.delete、this._updateIndices。
   */
  _removeFromLists(t, e) {
    this._items.splice(t, 1);
    "" !== e.getName() && this._itemsByName.delete(e.getName());
    this._updateIndices(t, e);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `e.__setClassIndex`、`s.push`、`this._itemsByClass.delete`、`this._itemsByClass.set`、`this._items[e].__setIndex`。
   * 调用线索：e.__setClassIndex、s.push、this._itemsByClass.delete、this._itemsByClass.set、this._items[e].__setIndex。
   */
  _updateIndices(t, e) {
    for (let e = t, i = this._items.length; e < i; e++) this._items[e].__setIndex(e);
    const i = e.constructor;
    const s = [];
    for (let t = 0, e = this._items.length; t < e; t++) {
      const e = this._items[t];
      e.constructor === i && (e.__setClassIndex(s.length), s.push(e));
    }
    s.length > 0 ? this._itemsByClass.set(i, s) : this._itemsByClass.delete(i);
  }
  _parent;
  _items;
  _itemsByName;
  _itemsByClass;
}
export { Collection };
export { CollectionItem };
