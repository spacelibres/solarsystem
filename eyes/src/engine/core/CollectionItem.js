// 集合同时维护顺序数组、名称映射和精确构造器分组；增删只重建受影响类型的 classIndex。移动先从源集合摘除，再加入目标并更换 parent；remove 才调用销毁钩子。
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
    for (let itemIndex = this._items.length - 1; itemIndex >= 0; itemIndex--) this._items[itemIndex].__destroy();
  }
  get(itemType, nameOrClassIndex = 0) {
    if ("number" == typeof nameOrClassIndex) {
      const classItems = this._itemsByClass.get(itemType);
      return classItems ? classItems[nameOrClassIndex] ?? null : null;
    }
    {
      const namedItem = this._itemsByName.get(nameOrClassIndex);
      return namedItem instanceof itemType ? namedItem : null;
    }
  }
  getAt(itemIndex) {
    return this._items[itemIndex];
  }
  getSize() {
    return this._items.length;
  }
  getAny(nameOrType, classIndex) {
    const namedItem = this._itemsByName.get(nameOrType);
    if (namedItem) return namedItem;
    for (const [itemType, classItems] of this._itemsByClass) if (itemType.name === nameOrType) return classItems[classIndex ?? 0] ?? null;
    return null;
  }
  add(itemType, name = "", beforeItem) {
    if ("" !== name && name[0].match("/A-Z/")) throw new Error(`The name "${name}" must start with lowercase to differentiate it from class names.`);
    if ("" !== name && this._itemsByName.has(name)) throw new Error(`Already added "${name}".`);
    if (beforeItem && this._items[beforeItem.getIndex()] !== beforeItem) throw new Error(`While adding ${itemType.name}${"" !== name ? ` named ${name}` : ""}: The beforeItem ${beforeItem} does not exist in the same class list.`);
    try {
      const item = new itemType(name, this._parent);
      this._addToLists(item, beforeItem);
      return item;
    } catch (error) {
      throw error instanceof Error && (error.message = `While adding ${itemType.name}${"" !== name ? ` named ${name}` : ""}: ${error.message}`), error;
    }
  }
  move(itemOrName, targetCollection, beforeItem) {
    let item;
    if ("string" == typeof itemOrName) {
      item = this._itemsByName.get(itemOrName);
      if (!item) throw new Error(`There is no item with name ${itemOrName}.`);
    } else item = itemOrName;
    const sourceIndex = item.getIndex();
    if (item !== this._items[sourceIndex]) throw new Error(`While moving ${item}, it is not in the source collection.`);
    const name = item.getName();
    if ("" !== name && targetCollection._itemsByName.has(name)) throw new Error(`While moving ${item}, an item with the same name "${name}" already exists in the destination collection.`);
    this._removeFromLists(item.getIndex(), item);
    targetCollection._addToLists(item, beforeItem);
    item.__setCollectionParent(targetCollection._parent);
  }
  remove(itemOrName) {
    let item;
    if ("string" == typeof itemOrName) {
      item = this._itemsByName.get(itemOrName);
      if (!item) throw new Error(`There is no item with name "${itemOrName}".`);
    } else item = itemOrName;
    const itemIndex = item.getIndex();
    if (item !== this._items[itemIndex]) throw new Error(`While removing ${item}, it is not in the collection.`);
    this._removeFromLists(itemIndex, item);
    item.__destroy();
  }
  clear() {
    for (let itemIndex = 0, itemCount = this._items.length; itemIndex < itemCount; itemIndex++) this._items[itemIndex].__destroy();
    this._items = [];
    this._itemsByClass.clear();
    this._itemsByName.clear();
  }
  _addToLists(item, beforeItem) {
    const insertIndex = void 0 !== beforeItem ? beforeItem.getIndex() : this._items.length;
    this._items.splice(insertIndex, 0, item);
    if ("" !== item.getName()) {
      this._itemsByName.set(item.getName(), item);
    }
    this._updateIndices(insertIndex, item);
  }
  _removeFromLists(itemIndex, item) {
    this._items.splice(itemIndex, 1);
    if ("" !== item.getName()) {
      this._itemsByName.delete(item.getName());
    }
    this._updateIndices(itemIndex, item);
  }
  // 全局 index 从改动位置后移；classIndex 按同一精确构造器重新编号，继承类不会合并到父类分组。
  _updateIndices(startIndex, changedItem) {
    for (let itemIndex = startIndex, itemCount = this._items.length; itemIndex < itemCount; itemIndex++) this._items[itemIndex].__setIndex(itemIndex);
    const itemType = changedItem.constructor;
    const classItems = [];
    for (let itemIndex = 0, itemCount = this._items.length; itemIndex < itemCount; itemIndex++) {
      const item = this._items[itemIndex];
      if (item.constructor === itemType) {
        item.__setClassIndex(classItems.length);
        classItems.push(item);
      }
    }
    if (classItems.length > 0) {
      this._itemsByClass.set(itemType, classItems);
    } else {
      this._itemsByClass.delete(itemType);
    }
  }
  _parent;
  _items;
  _itemsByName;
  _itemsByClass;
}
export { Collection };
export { CollectionItem };
