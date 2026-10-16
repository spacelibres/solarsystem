/** @eyes-analysis
 * 文件职责：将可搜索数据库条目交给模糊搜索实例，按 id 取条目并限制搜索结果数量。
 * 依据：import ../../vendor/modules/KeyStore.js；import ../../framework/eyes/public-api.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1301907-1302985.
import * as KeyStore from "../../vendor/modules/KeyStore.js";
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
/** @eyes-analysis
 * 类职责：将可搜索数据库条目交给模糊搜索实例，按 id 取条目并限制搜索结果数量。
 * 继承：EyesPublicApi.BaseManager；导出：SearchManager。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class SearchManager extends EyesPublicApi.BaseManager {
  /** @eyes-analysis
   * 【结构证据】写入 `_database`、`_fuse`、`_maxEntries`、`_options`；调用 `super`。
   * 状态写入：_database、_fuse、_maxEntries、_options。
   * 调用线索：super。
   */
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
  /** @eyes-analysis
   * 【结构证据】写入 `_fuse`；调用 `Object.assign`、`new KeyStore.default`。
   * 状态写入：_fuse。
   * 调用线索：Object.assign、new KeyStore.default。
   */
  setOptions(t) {
    Object.assign(this._options, t);
    this._fuse = new KeyStore.default(this._database, this._options);
  }
  /** @eyes-analysis
   * 【结构证据】写入 `_database`、`_fuse`；调用 `Array.isArray`、`Object.assign`、`Object.keys`、`Object.keys(t).filter`、`console.error`、`i.map`。
   * 状态写入：_database、_fuse。
   * 调用线索：Array.isArray、Object.assign、Object.keys、Object.keys(t).filter、Object.keys(t).filter(e=>false!==t[e].searchable).map等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `this._database.find(e=>e.id===t)`；调用 `this._database.find`。
   * 调用线索：this._database.find。
   */
  getEntry(t) {
    return this._database.find(e => e.id === t);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `null` 或 `i`；调用 `i.slice`、`this._fuse.search`。
   * 调用线索：i.slice、this._fuse.search。
   */
  find(t, e = this._maxEntries) {
    if ("" === t || null == t || !this._fuse) return null;
    let i = this._fuse.search(t);
    i = i.slice(0, e);
    return i;
  }
}
export { SearchManager };
