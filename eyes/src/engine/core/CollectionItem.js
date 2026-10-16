// Recovered from app.js:26059-29352.
class CollectionItem {
  constructor(name, collectionParent) {
    this._index = 0;
    this._classIndex = 0;
    this._name = name;
    this._collectionParent = collectionParent;
  }
  getIndex() {
    return this._index;
  }
  __setIndex(index) {
    this._index = index;
  }
  getClassIndex() {
    return this._classIndex;
  }
  __setClassIndex(classIndex) {
    this._classIndex = classIndex;
  }
  getName() {
    return this._name;
  }
  __getCollectionParent() {
    return this._collectionParent;
  }
  __setCollectionParent(collectionParent) {
    this._collectionParent = collectionParent;
  }
  __destroy() {}
  _index;
  _classIndex;
  _name;
  _collectionParent;
}
class Collection {
  constructor(parent) {
    this._parent = parent;
    this._items = [];
    this._itemsByName = new Map();
    this._itemsByClass = new Map();
  }
  __destroy() {
    for (let t = this._items.length - 1; t >= 0; t--) this._items[t].__destroy();
  }
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
  getAt(t) {
    return this._items[t];
  }
  getSize() {
    return this._items.length;
  }
  getAny(t, e) {
    const i = this._itemsByName.get(t);
    if (i) return i;
    for (const [i, s] of this._itemsByClass) if (i.name === t) return s[e ?? 0] ?? null;
    return null;
  }
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
  clear() {
    for (let t = 0, e = this._items.length; t < e; t++) this._items[t].__destroy();
    this._items = [];
    this._itemsByClass.clear();
    this._itemsByName.clear();
  }
  _addToLists(t, e) {
    const i = void 0 !== e ? e.getIndex() : this._items.length;
    this._items.splice(i, 0, t);
    "" !== t.getName() && this._itemsByName.set(t.getName(), t);
    this._updateIndices(i, t);
  }
  _removeFromLists(t, e) {
    this._items.splice(t, 1);
    "" !== e.getName() && this._itemsByName.delete(e.getName());
    this._updateIndices(t, e);
  }
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
