// Recovered from app.js:1301907-1302985.
/* 搜索索引从目录排除 searchable=false 的实体，find 返回最多指定条数的 Fuse 匹配。setDatabase 会把关键词数组写回原目录项；原 map 结果未使用的行为保留。 */
import * as KeyStore from "../../vendor/modules/KeyStore.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class SearchManager extends EyesPublicApi.BaseManager {
  constructor(app, options = {}) {
    super(app);
    this._maxEntries = 10;
    this._fuse = null;
    this._database = null;
    this._options = {
      threshold: .4,
      keys: [{
        name: "id",
        weight: .99
      }, {
        name: "name",
        weight: .98
      }],
      includeScore: true,
      includeMatches: true,
      ignoreLocation: true,
      ...options
    };
  }
  setOptions(options) {
    Object.assign(this._options, options);
    this._fuse = new KeyStore.default(this._database, this._options);
  }
  setDatabase(database, options = {}) {
    database ? (Object.assign(this._options, options), this._database = Object.keys(database).filter(entryId => false !== database[entryId].searchable).map(entryId => {
      const keywords = database[entryId].keywords || [];
      keywords.map(keyword => ({
        value: keyword
      }));
      database[entryId].keywords = keywords;
      return database[entryId];
    }), Array.isArray(this._database) ? this._fuse = new KeyStore.default(this._database, this._options) : console.error("[SearchManager.setDatabase] Database is not an array.")) : console.error("[SearchManager.setDatabase] Missing database.");
  }
  getEntry(entityId) {
    return this._database.find(entry => entry.id === entityId);
  }
  find(searchText, maximumEntries = this._maxEntries) {
    if ("" === searchText || null == searchText || !this._fuse) return null;
    let matches = this._fuse.search(searchText);
    matches = matches.slice(0, maximumEntries);
    return matches;
  }
}
export { SearchManager };
