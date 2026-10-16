// Recovered from app.js:1301907-1302985.
import * as KeyStore from "../../vendor/modules/KeyStore.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
class SearchManager extends EyesPublicApi.BaseManager {
  constructor(t, e = {}) {
    super(t);
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
      ...e
    };
  }
  setOptions(t) {
    Object.assign(this._options, t);
    this._fuse = new KeyStore.default(this._database, this._options);
  }
  setDatabase(t, e = {}) {
    t ? (Object.assign(this._options, e), this._database = Object.keys(t).filter(e => false !== t[e].searchable).map(e => {
      const i = t[e].keywords || [];
      i.map(t => ({
        value: t
      }));
      t[e].keywords = i;
      return t[e];
    }), Array.isArray(this._database) ? this._fuse = new KeyStore.default(this._database, this._options) : console.error("[SearchManager.setDatabase] Database is not an array.")) : console.error("[SearchManager.setDatabase] Missing database.");
  }
  getEntry(t) {
    return this._database.find(e => e.id === t);
  }
  find(t, e = this._maxEntries) {
    if ("" === t || null == t || !this._fuse) return null;
    let i = this._fuse.search(t);
    i = i.slice(0, e);
    return i;
  }
}
export { SearchManager };
