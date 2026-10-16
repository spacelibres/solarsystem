/** @eyes-analysis
 * 文件职责：规范化 Fuse 搜索字段的路径、权重和键标识；构建并维护字符串/对象的 Fuse 搜索索引；使用位运算的 Bitap 模糊匹配与阈值评分；扩展搜索匹配器的模式存储基类；扩展搜索中的模糊模式匹配；扩展搜索中的包含模式匹配；解析扩展搜索语法并组合多条件匹配；以索引和评分规则执行加权模糊搜索
 * 依据：// Recovered from vendors.js:1881696-1897604.；exports: default
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:1881696-1897604.
function r(e) {
  return Array.isArray ? Array.isArray(e) : "[object Array]" === u(e);
}
function i(e) {
  return "string" == typeof e;
}
function a(e) {
  return "number" == typeof e;
}
function s(e) {
  return !0 === e || !1 === e || function (e) {
    return o(e) && null !== e;
  }(e) && "[object Boolean]" == u(e);
}
function o(e) {
  return "object" == typeof e;
}
function c(e) {
  return null != e;
}
function l(e) {
  return !e.trim().length;
}
function u(e) {
  return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
const d = Object.prototype.hasOwnProperty;
/** @eyes-analysis
 * 类职责：规范化 Fuse 搜索字段的路径、权重和键标识
 * 继承：无显式父类；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class KeyStore {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：_keyMap、_keyMap[n.id]、_keys。
   * 调用线索：e.forEach、h、this._keys.forEach、this._keys.push。
   */
  constructor(e) {
    this._keys = [], this._keyMap = {};
    let t = 0;
    e.forEach(e => {
      let n = h(e);
      t += n.weight, this._keys.push(n), this._keyMap[n.id] = n, t += n.weight;
    }), this._keys.forEach(e => {
      e.weight /= t;
    });
  }
  /** @eyes-analysis
   * 源码方法 get；作用以类职责与源码实现为准，未猜测压缩参数含义
   */
  get(e) {
    return this._keyMap[e];
  }
  /** @eyes-analysis
   * 源码方法 keys；作用以类职责与源码实现为准，未猜测压缩参数含义
   */
  keys() {
    return this._keys;
  }
  /** @eyes-analysis
   * 序列化资源和引用；共享资源通过元数据缓存去重
   * 调用线索：JSON.stringify。
   */
  toJSON() {
    return JSON.stringify(this._keys);
  }
}
function h(e) {
  let t = null,
    n = null,
    a = null,
    s = 1,
    o = null;
  if (i(e) || r(e)) a = e, t = p(e), n = f(e);else {
    if (!d.call(e, "name")) throw new Error((e => `Missing ${e} property in key`)("name"));
    const r = e.name;
    if (a = r, d.call(e, "weight") && (s = e.weight, s <= 0)) throw new Error((e => `Property 'weight' in key '${e}' must be a positive integer`)(r));
    t = p(r), n = f(r), o = e.getFn;
  }
  return {
    path: t,
    id: n,
    weight: s,
    src: a,
    getFn: o
  };
}
function p(e) {
  return r(e) ? e : e.split(".");
}
function f(e) {
  return r(e) ? e.join(".") : e;
}
var m = {
  isCaseSensitive: !1,
  includeScore: !1,
  keys: [],
  shouldSort: !0,
  sortFn: (e, t) => e.score === t.score ? e.idx < t.idx ? -1 : 1 : e.score < t.score ? -1 : 1,
  includeMatches: !1,
  findAllMatches: !1,
  minMatchCharLength: 1,
  location: 0,
  threshold: .6,
  distance: 100,
  ...{
    useExtendedSearch: !1,
    getFn: function (e, t) {
      let n = [],
        o = !1;
      const l = (e, t, u) => {
        if (c(e)) if (t[u]) {
          const d = e[t[u]];
          if (!c(d)) return;
          if (u === t.length - 1 && (i(d) || a(d) || s(d))) n.push(function (e) {
            return null == e ? "" : function (e) {
              if ("string" == typeof e) return e;
              let t = e + "";
              return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
            }(e);
          }(d));else if (r(d)) {
            o = !0;
            for (let e = 0, n = d.length; e < n; e += 1) l(d[e], t, u + 1);
          } else t.length && l(d, t, u + 1);
        } else n.push(e);
      };
      return l(e, i(t) ? t.split(".") : t, 0), o ? n : n[0];
    },
    ignoreLocation: !1,
    ignoreFieldNorm: !1,
    fieldNormWeight: 1
  }
};
const M = /[^ ]+/g;
/** @eyes-analysis
 * 类职责：构建并维护字符串/对象的 Fuse 搜索索引
 * 继承：无显式父类；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class FuseIndex {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：getFn、isCreated、norm。
   * 调用线索：Math.pow、Math.round、function(e=1,t=3){const map=new Map(),r=Math.pow(10,t);return{get(t){const i=t.match(M).length;if(map.has(i))return map.get(i);const a=1/Math.pow(i,.5*e),s=parseFloat(Math.round(a*r)/r);return map.set(i,s),s;},clear(){map.clear();}};}、map.clear、map.get等。
   */
  constructor({
    getFn = m.getFn,
    fieldNormWeight: t = m.fieldNormWeight
  } = {}) {
    this.norm = function (e = 1, t = 3) {
      const map = new Map(),
        r = Math.pow(10, t);
      return {
        get(t) {
          const i = t.match(M).length;
          if (map.has(i)) return map.get(i);
          const a = 1 / Math.pow(i, .5 * e),
            s = parseFloat(Math.round(a * r) / r);
          return map.set(i, s), s;
        },
        clear() {
          map.clear();
        }
      };
    }(t, 3), this.getFn = getFn, this.isCreated = !1, this.setIndexRecords();
  }
  /** @eyes-analysis
   * 源码方法 setSources；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：docs。
   */
  setSources(docs = []) {
    this.docs = docs;
  }
  /** @eyes-analysis
   * 源码方法 setIndexRecords；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：records。
   */
  setIndexRecords(records = []) {
    this.records = records;
  }
  /** @eyes-analysis
   * 源码方法 setKeys；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：_keysMap、_keysMap[e.id]、keys。
   * 调用线索：keys.forEach。
   */
  setKeys(keys = []) {
    this.keys = keys, this._keysMap = {}, keys.forEach((e, t) => {
      this._keysMap[e.id] = t;
    });
  }
  /** @eyes-analysis
   * 源码方法 create；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：isCreated。
   * 调用线索：i、this._addObject、this._addString、this.docs.forEach、this.norm.clear。
   */
  create() {
    !this.isCreated && this.docs.length && (this.isCreated = !0, i(this.docs[0]) ? this.docs.forEach((e, t) => {
      this._addString(e, t);
    }) : this.docs.forEach((e, t) => {
      this._addObject(e, t);
    }), this.norm.clear());
  }
  /** @eyes-analysis
   * 源码方法 add；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：i、this._addObject、this._addString、this.size。
   */
  add(e) {
    const t = this.size();
    i(e) ? this._addString(e, t) : this._addObject(e, t);
  }
  /** @eyes-analysis
   * 源码方法 removeAt；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：records[t].i。
   * 调用线索：this.records.splice、this.size。
   */
  removeAt(e) {
    this.records.splice(e, 1);
    for (let t = e, n = this.size(); t < n; t += 1) this.records[t].i -= 1;
  }
  /** @eyes-analysis
   * 源码方法 getValueForItemAtKeyId；作用以类职责与源码实现为准，未猜测压缩参数含义
   */
  getValueForItemAtKeyId(e, t) {
    return e[this._keysMap[t]];
  }
  /** @eyes-analysis
   * 源码方法 size；作用以类职责与源码实现为准，未猜测压缩参数含义
   */
  size() {
    return this.records.length;
  }
  /** @eyes-analysis
   * 源码方法 _addString；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：c、l、this.norm.get、this.records.push。
   */
  _addString(e, t) {
    if (!c(e) || l(e)) return;
    let n = {
      v: e,
      i: t,
      n: this.norm.get(e)
    };
    this.records.push(n);
  }
  /** @eyes-analysis
   * 源码方法 _addObject；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：c、e.push、i、l、r等。
   */
  _addObject(e, t) {
    let n = {
      i: t,
      $: {}
    };
    this.keys.forEach((t, a) => {
      let s = t.getFn ? t.getFn(e) : this.getFn(e, t.path);
      if (c(s)) if (r(s)) {
        let e = [];
        const t = [{
          nestedArrIndex: -1,
          value: s
        }];
        for (; t.length;) {
          const {
            nestedArrIndex: nestedArrIndex,
            value: value
          } = t.pop();
          if (c(value)) if (i(value) && !l(value)) {
            let t = {
              v: value,
              i: nestedArrIndex,
              n: this.norm.get(value)
            };
            e.push(t);
          } else r(value) && value.forEach((e, n) => {
            t.push({
              nestedArrIndex: n,
              value: e
            });
          });
        }
        n.$[a] = e;
      } else if (i(s) && !l(s)) {
        let e = {
          v: s,
          n: this.norm.get(s)
        };
        n.$[a] = e;
      }
    }), this.records.push(n);
  }
  /** @eyes-analysis
   * 序列化资源和引用；共享资源通过元数据缓存去重
   */
  toJSON() {
    return {
      keys: this.keys,
      records: this.records
    };
  }
}
function _(e, t, {
  getFn: n = m.getFn,
  fieldNormWeight: r = m.fieldNormWeight
} = {}) {
  const fuseIndex = new FuseIndex({
    getFn: n,
    fieldNormWeight: r
  });
  return fuseIndex.setKeys(e.map(h)), fuseIndex.setSources(t), fuseIndex.create(), fuseIndex;
}
function A(e, {
  errors: t = 0,
  currentLocation: n = 0,
  expectedLocation: r = 0,
  distance: i = m.distance,
  ignoreLocation: a = m.ignoreLocation
} = {}) {
  const s = t / e.length;
  if (a) return s;
  const o = Math.abs(r - n);
  return i ? s + o / i : o ? 1 : s;
}
const g = 32;
function b(e, t, n, {
  location: r = m.location,
  distance: i = m.distance,
  threshold: a = m.threshold,
  findAllMatches: s = m.findAllMatches,
  minMatchCharLength: o = m.minMatchCharLength,
  includeMatches: c = m.includeMatches,
  ignoreLocation: l = m.ignoreLocation
} = {}) {
  if (t.length > g) throw new Error(`Pattern length exceeds max of ${g}.`);
  const u = t.length,
    d = e.length,
    h = Math.max(0, Math.min(r, d));
  let p = a,
    f = h;
  const M = o > 1 || c,
    _ = M ? Array(d) : [];
  let b;
  for (; (b = e.indexOf(t, f)) > -1;) {
    let e = A(t, {
      currentLocation: b,
      expectedLocation: h,
      distance: i,
      ignoreLocation: l
    });
    if (p = Math.min(e, p), f = b + u, M) {
      let e = 0;
      for (; e < u;) _[b + e] = 1, e += 1;
    }
  }
  f = -1;
  let y = [],
    L = 1,
    v = u + d;
  const T = 1 << u - 1;
  for (let r = 0; r < u; r += 1) {
    let a = 0,
      o = v;
    for (; a < o;) {
      A(t, {
        errors: r,
        currentLocation: h + o,
        expectedLocation: h,
        distance: i,
        ignoreLocation: l
      }) <= p ? a = o : v = o, o = Math.floor((v - a) / 2 + a);
    }
    v = o;
    let c = Math.max(1, h - o + 1),
      m = s ? d : Math.min(h + o, d) + u,
      g = Array(m + 2);
    g[m + 1] = (1 << r) - 1;
    for (let a = m; a >= c; a -= 1) {
      let s = a - 1,
        o = n[e.charAt(s)];
      if (M && (_[s] = +!!o), g[a] = (g[a + 1] << 1 | 1) & o, r && (g[a] |= (y[a + 1] | y[a]) << 1 | 1 | y[a + 1]), g[a] & T && (L = A(t, {
        errors: r,
        currentLocation: s,
        expectedLocation: h,
        distance: i,
        ignoreLocation: l
      }), L <= p)) {
        if (p = L, f = s, f <= h) break;
        c = Math.max(1, 2 * h - f);
      }
    }
    if (A(t, {
      errors: r + 1,
      currentLocation: h,
      expectedLocation: h,
      distance: i,
      ignoreLocation: l
    }) > p) break;
    y = g;
  }
  const S = {
    isMatch: f >= 0,
    score: Math.max(.001, L)
  };
  if (M) {
    const e = function (e = [], t = m.minMatchCharLength) {
      let n = [],
        r = -1,
        i = -1,
        a = 0;
      for (let s = e.length; a < s; a += 1) {
        let s = e[a];
        s && -1 === r ? r = a : s || -1 === r || (i = a - 1, i - r + 1 >= t && n.push([r, i]), r = -1);
      }
      return e[a - 1] && a - r >= t && n.push([r, a - 1]), n;
    }(_, o);
    e.length ? c && (S.indices = e) : S.isMatch = !1;
  }
  return S;
}
function y(e) {
  let t = {};
  for (let n = 0, r = e.length; n < r; n += 1) {
    const i = e.charAt(n);
    t[i] = (t[i] || 0) | 1 << r - n - 1;
  }
  return t;
}
/** @eyes-analysis
 * 类职责：使用位运算的 Bitap 模糊匹配与阈值评分
 * 继承：无显式父类；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class BitapSearch {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：chunks、options、pattern。
   * 调用线索：e.toLowerCase、l、this.chunks.push、this.pattern.substr、y。
   */
  constructor(e, {
    location: t = m.location,
    threshold: n = m.threshold,
    distance: r = m.distance,
    includeMatches: i = m.includeMatches,
    findAllMatches: a = m.findAllMatches,
    minMatchCharLength: s = m.minMatchCharLength,
    isCaseSensitive: o = m.isCaseSensitive,
    ignoreLocation: c = m.ignoreLocation
  } = {}) {
    if (this.options = {
      location: t,
      threshold: n,
      distance: r,
      includeMatches: i,
      findAllMatches: a,
      minMatchCharLength: s,
      isCaseSensitive: o,
      ignoreLocation: c
    }, this.pattern = o ? e : e.toLowerCase(), this.chunks = [], !this.pattern.length) return;
    const l = (e, t) => {
        this.chunks.push({
          pattern: e,
          alphabet: y(e),
          startIndex: t
        });
      },
      u = this.pattern.length;
    if (u > g) {
      let e = 0;
      const t = u % g,
        n = u - t;
      for (; e < n;) l(this.pattern.substr(e, g), e), e += g;
      if (t) {
        const e = u - g;
        l(this.pattern.substr(e), e);
      }
    } else l(this.pattern, 0);
  }
  /** @eyes-analysis
   * 源码方法 searchIn；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：b、e.toLowerCase、this.chunks.forEach。
   */
  searchIn(e) {
    const {
      isCaseSensitive: isCaseSensitive,
      includeMatches: includeMatches
    } = this.options;
    if (isCaseSensitive || (e = e.toLowerCase()), this.pattern === e) {
      let t = {
        isMatch: !0,
        score: 0
      };
      return includeMatches && (t.indices = [[0, e.length - 1]]), t;
    }
    const {
      location: location,
      distance: distance,
      threshold: threshold,
      findAllMatches: findAllMatches,
      minMatchCharLength: minMatchCharLength,
      ignoreLocation: ignoreLocation
    } = this.options;
    let l = [],
      u = 0,
      d = !1;
    this.chunks.forEach(({
      pattern: pattern,
      alphabet: alphabet,
      startIndex: startIndex
    }) => {
      const {
        isMatch: isMatch,
        score: score,
        indices: indices
      } = b(e, pattern, alphabet, {
        location: location + startIndex,
        distance: distance,
        threshold: threshold,
        findAllMatches: findAllMatches,
        minMatchCharLength: minMatchCharLength,
        includeMatches: includeMatches,
        ignoreLocation: ignoreLocation
      });
      isMatch && (d = !0), u += score, isMatch && indices && (l = [...l, ...indices]);
    });
    let h = {
      isMatch: d,
      score: d ? u / this.chunks.length : 1
    };
    return d && includeMatches && (h.indices = l), h;
  }
}
/** @eyes-analysis
 * 类职责：扩展搜索匹配器的模式存储基类
 * 继承：无显式父类；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class BaseMatch {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：pattern。
   */
  constructor(pattern) {
    this.pattern = pattern;
  }
  /** @eyes-analysis
   * 源码方法 isMultiMatch；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：L。
   */
  static isMultiMatch(e) {
    return L(e, this.multiRegex);
  }
  /** @eyes-analysis
   * 源码方法 isSingleMatch；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：L。
   */
  static isSingleMatch(e) {
    return L(e, this.singleRegex);
  }
  /** @eyes-analysis
   * 源码方法 search；作用以类职责与源码实现为准，未猜测压缩参数含义
   */
  search() {}
}
function L(e, t) {
  const n = e.match(t);
  return n ? n[1] : null;
}
/** @eyes-analysis
 * 类职责：扩展搜索中的模糊模式匹配
 * 继承：BaseMatch；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class FuzzyMatch extends BaseMatch {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：_bitapSearch。
   * 调用线索：new BitapSearch、super。
   */
  constructor(e, {
    location: t = m.location,
    threshold: n = m.threshold,
    distance: r = m.distance,
    includeMatches: i = m.includeMatches,
    findAllMatches: a = m.findAllMatches,
    minMatchCharLength: s = m.minMatchCharLength,
    isCaseSensitive: o = m.isCaseSensitive,
    ignoreLocation: c = m.ignoreLocation
  } = {}) {
    super(e), this._bitapSearch = new BitapSearch(e, {
      location: t,
      threshold: n,
      distance: r,
      includeMatches: i,
      findAllMatches: a,
      minMatchCharLength: s,
      isCaseSensitive: o,
      ignoreLocation: c
    });
  }
  /** @eyes-analysis
   * 只读返回 "fuzzy"；此 getter 不执行对应 setter 的写入或更新通知
   */
  static get type() {
    return "fuzzy";
  }
  /** @eyes-analysis
   * 只读返回 /^"(.*)"$/；此 getter 不执行对应 setter 的写入或更新通知
   */
  static get multiRegex() {
    return /^"(.*)"$/;
  }
  /** @eyes-analysis
   * 只读返回 /^(.*)$/；此 getter 不执行对应 setter 的写入或更新通知
   */
  static get singleRegex() {
    return /^(.*)$/;
  }
  /** @eyes-analysis
   * 源码方法 search；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：this._bitapSearch.searchIn。
   */
  search(e) {
    return this._bitapSearch.searchIn(e);
  }
}
/** @eyes-analysis
 * 类职责：扩展搜索中的包含模式匹配
 * 继承：BaseMatch；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class IncludeMatch extends BaseMatch {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 调用线索：super。
   */
  constructor(e) {
    super(e);
  }
  /** @eyes-analysis
   * 只读返回 "include"；此 getter 不执行对应 setter 的写入或更新通知
   */
  static get type() {
    return "include";
  }
  /** @eyes-analysis
   * 只读返回 /^'"(.*)"$/；此 getter 不执行对应 setter 的写入或更新通知
   */
  static get multiRegex() {
    return /^'"(.*)"$/;
  }
  /** @eyes-analysis
   * 只读返回 /^'(.*)$/；此 getter 不执行对应 setter 的写入或更新通知
   */
  static get singleRegex() {
    return /^'(.*)$/;
  }
  /** @eyes-analysis
   * 源码方法 search；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：e.indexOf、r.push。
   */
  search(e) {
    let t,
      n = 0;
    const r = [],
      i = this.pattern.length;
    for (; (t = e.indexOf(this.pattern, n)) > -1;) n = t + i, r.push([t, n - 1]);
    const a = !!r.length;
    return {
      isMatch: a,
      score: a ? 0 : 1,
      indices: r
    };
  }
}
const v = [/** @eyes-analysis
            * 类职责：规范化 Fuse 搜索字段的路径、权重和键标识；构建并维护字符串/对象的 Fuse 搜索索引；使用位运算的 Bitap 模糊匹配与阈值评分；扩展搜索匹配器的模式存储基类；扩展搜索中的模糊模式匹配；扩展搜索中的包含模式匹配；解析扩展搜索语法并组合多条件匹配；以索引和评分规则执行加权模糊搜索中的 ExactMatch 实现（角色需结合调用者确认）
            * 继承：BaseMatch；导出：模块内部声明。
            * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
            */
           class ExactMatch extends BaseMatch {
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 调用线索：super。
     */
    constructor(e) {
      super(e);
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回："exact"。
     */
    static get type() {
      return "exact";
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回：/^="(.*)"$/。
     */
    static get multiRegex() {
      return /^="(.*)"$/;
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回：/^=(.*)$/。
     */
    static get singleRegex() {
      return /^=(.*)$/;
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：pattern、pattern.length；返回：{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}。
     */
    search(e) {
      const t = e === this.pattern;
      return {
        isMatch: t,
        score: t ? 0 : 1,
        indices: [0, this.pattern.length - 1]
      };
    }
  }, IncludeMatch, /** @eyes-analysis
                    * 类职责：规范化 Fuse 搜索字段的路径、权重和键标识；构建并维护字符串/对象的 Fuse 搜索索引；使用位运算的 Bitap 模糊匹配与阈值评分；扩展搜索匹配器的模式存储基类；扩展搜索中的模糊模式匹配；扩展搜索中的包含模式匹配；解析扩展搜索语法并组合多条件匹配；以索引和评分规则执行加权模糊搜索中的 PrefixExactMatch 实现（角色需结合调用者确认）
                    * 继承：BaseMatch；导出：模块内部声明。
                    * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
                    */
                   class PrefixExactMatch extends BaseMatch {
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 调用线索：super。
     */
    constructor(e) {
      super(e);
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回："prefix-exact"。
     */
    static get type() {
      return "prefix-exact";
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回：/^\^"(.*)"$/。
     */
    static get multiRegex() {
      return /^\^"(.*)"$/;
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回：/^\^(.*)$/。
     */
    static get singleRegex() {
      return /^\^(.*)$/;
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 调用线索：e.startsWith。
     */
    search(e) {
      const t = e.startsWith(this.pattern);
      return {
        isMatch: t,
        score: t ? 0 : 1,
        indices: [0, this.pattern.length - 1]
      };
    }
  }, /** @eyes-analysis
      * 类职责：规范化 Fuse 搜索字段的路径、权重和键标识；构建并维护字符串/对象的 Fuse 搜索索引；使用位运算的 Bitap 模糊匹配与阈值评分；扩展搜索匹配器的模式存储基类；扩展搜索中的模糊模式匹配；扩展搜索中的包含模式匹配；解析扩展搜索语法并组合多条件匹配；以索引和评分规则执行加权模糊搜索中的 InversePrefixExactMatch 实现（角色需结合调用者确认）
      * 继承：BaseMatch；导出：模块内部声明。
      * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
      */
     class InversePrefixExactMatch extends BaseMatch {
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 调用线索：super。
     */
    constructor(e) {
      super(e);
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回："inverse-prefix-exact"。
     */
    static get type() {
      return "inverse-prefix-exact";
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回：/^!\^"(.*)"$/。
     */
    static get multiRegex() {
      return /^!\^"(.*)"$/;
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回：/^!\^(.*)$/。
     */
    static get singleRegex() {
      return /^!\^(.*)$/;
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 调用线索：e.startsWith。
     */
    search(e) {
      const t = !e.startsWith(this.pattern);
      return {
        isMatch: t,
        score: t ? 0 : 1,
        indices: [0, e.length - 1]
      };
    }
  }, /** @eyes-analysis
      * 类职责：规范化 Fuse 搜索字段的路径、权重和键标识；构建并维护字符串/对象的 Fuse 搜索索引；使用位运算的 Bitap 模糊匹配与阈值评分；扩展搜索匹配器的模式存储基类；扩展搜索中的模糊模式匹配；扩展搜索中的包含模式匹配；解析扩展搜索语法并组合多条件匹配；以索引和评分规则执行加权模糊搜索中的 InverseSuffixExactMatch 实现（角色需结合调用者确认）
      * 继承：BaseMatch；导出：模块内部声明。
      * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
      */
     class InverseSuffixExactMatch extends BaseMatch {
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 调用线索：super。
     */
    constructor(e) {
      super(e);
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回："inverse-suffix-exact"。
     */
    static get type() {
      return "inverse-suffix-exact";
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回：/^!"(.*)"\$$/。
     */
    static get multiRegex() {
      return /^!"(.*)"\$$/;
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回：/^!(.*)\$$/。
     */
    static get singleRegex() {
      return /^!(.*)\$$/;
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 调用线索：e.endsWith。
     */
    search(e) {
      const t = !e.endsWith(this.pattern);
      return {
        isMatch: t,
        score: t ? 0 : 1,
        indices: [0, e.length - 1]
      };
    }
  }, /** @eyes-analysis
      * 类职责：规范化 Fuse 搜索字段的路径、权重和键标识；构建并维护字符串/对象的 Fuse 搜索索引；使用位运算的 Bitap 模糊匹配与阈值评分；扩展搜索匹配器的模式存储基类；扩展搜索中的模糊模式匹配；扩展搜索中的包含模式匹配；解析扩展搜索语法并组合多条件匹配；以索引和评分规则执行加权模糊搜索中的 SuffixExactMatch 实现（角色需结合调用者确认）
      * 继承：BaseMatch；导出：模块内部声明。
      * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
      */
     class SuffixExactMatch extends BaseMatch {
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 调用线索：super。
     */
    constructor(e) {
      super(e);
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回："suffix-exact"。
     */
    static get type() {
      return "suffix-exact";
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回：/^"(.*)"\$$/。
     */
    static get multiRegex() {
      return /^"(.*)"\$$/;
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回：/^(.*)\$$/。
     */
    static get singleRegex() {
      return /^(.*)\$$/;
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 调用线索：e.endsWith。
     */
    search(e) {
      const t = e.endsWith(this.pattern);
      return {
        isMatch: t,
        score: t ? 0 : 1,
        indices: [e.length - this.pattern.length, e.length - 1]
      };
    }
  }, /** @eyes-analysis
      * 类职责：规范化 Fuse 搜索字段的路径、权重和键标识；构建并维护字符串/对象的 Fuse 搜索索引；使用位运算的 Bitap 模糊匹配与阈值评分；扩展搜索匹配器的模式存储基类；扩展搜索中的模糊模式匹配；扩展搜索中的包含模式匹配；解析扩展搜索语法并组合多条件匹配；以索引和评分规则执行加权模糊搜索中的 InverseExactMatch 实现（角色需结合调用者确认）
      * 继承：BaseMatch；导出：模块内部声明。
      * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
      */
     class InverseExactMatch extends BaseMatch {
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 调用线索：super。
     */
    constructor(e) {
      super(e);
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回："inverse-exact"。
     */
    static get type() {
      return "inverse-exact";
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回：/^!"(.*)"$/。
     */
    static get multiRegex() {
      return /^!"(.*)"$/;
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 读取：；返回：/^!(.*)$/。
     */
    static get singleRegex() {
      return /^!(.*)$/;
    }
    /** @eyes-analysis
     * 方法语义尚未人工确认；以下是当前源码的句法证据。
     * 调用线索：e.indexOf。
     */
    search(e) {
      const t = -1 === e.indexOf(this.pattern);
      return {
        isMatch: t,
        score: t ? 0 : 1,
        indices: [0, e.length - 1]
      };
    }
  }, FuzzyMatch],
  T = v.length,
  S = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
const set = new Set([FuzzyMatch.type, IncludeMatch.type]);
/** @eyes-analysis
 * 类职责：解析扩展搜索语法并组合多条件匹配
 * 继承：无显式父类；导出：模块内部声明。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class ExtendedSearch {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：options、pattern、query。
   * 调用线索：e.isMultiMatch、e.isSingleMatch、e.split、e.split("|").map、e.toLowerCase等。
   */
  constructor(e, {
    isCaseSensitive: t = m.isCaseSensitive,
    includeMatches: n = m.includeMatches,
    minMatchCharLength: r = m.minMatchCharLength,
    ignoreLocation: i = m.ignoreLocation,
    findAllMatches: a = m.findAllMatches,
    location: s = m.location,
    threshold: o = m.threshold,
    distance: c = m.distance
  } = {}) {
    this.query = null, this.options = {
      isCaseSensitive: t,
      includeMatches: n,
      minMatchCharLength: r,
      findAllMatches: a,
      ignoreLocation: i,
      location: s,
      threshold: o,
      distance: c
    }, this.pattern = t ? e : e.toLowerCase(), this.query = function (e, t = {}) {
      return e.split("|").map(e => {
        let n = e.trim().split(S).filter(e => e && !!e.trim()),
          r = [];
        for (let e = 0, i = n.length; e < i; e += 1) {
          const i = n[e];
          let a = !1,
            s = -1;
          for (; !a && ++s < T;) {
            const e = v[s];
            let n = e.isMultiMatch(i);
            n && (r.push(new e(n, t)), a = !0);
          }
          if (!a) for (s = -1; ++s < T;) {
            const e = v[s];
            let n = e.isSingleMatch(i);
            if (n) {
              r.push(new e(n, t));
              break;
            }
          }
        }
        return r;
      });
    }(this.pattern, this.options);
  }
  /** @eyes-analysis
   * 源码方法 condition；作用以类职责与源码实现为准，未猜测压缩参数含义
   */
  static condition(e, t) {
    return t.useExtendedSearch;
  }
  /** @eyes-analysis
   * 源码方法 searchIn；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：a.push、e.toLowerCase、r.search、set.has。
   */
  searchIn(e) {
    const query = this.query;
    if (!query) return {
      isMatch: !1,
      score: 1
    };
    const {
      includeMatches: includeMatches,
      isCaseSensitive: isCaseSensitive
    } = this.options;
    e = isCaseSensitive ? e : e.toLowerCase();
    let i = 0,
      a = [],
      s = 0;
    for (let r = 0, o = query.length; r < o; r += 1) {
      const o = query[r];
      a.length = 0, i = 0;
      for (let t = 0, r = o.length; t < r; t += 1) {
        const r = o[t],
          {
            isMatch: isMatch,
            indices: indices,
            score: score
          } = r.search(e);
        if (!isMatch) {
          s = 0, i = 0, a.length = 0;
          break;
        }
        if (i += 1, s += score, includeMatches) {
          const e = r.constructor.type;
          set.has(e) ? a = [...a, ...indices] : a.push(indices);
        }
      }
      if (i) {
        let e = {
          isMatch: !0,
          score: s / i
        };
        return includeMatches && (e.indices = a), e;
      }
    }
    return {
      isMatch: !1,
      score: 1
    };
  }
}
const E = [];
function x(e, t) {
  for (let n = 0, r = E.length; n < r; n += 1) {
    let r = E[n];
    if (r.condition(e, t)) return new r(e, t);
  }
  return new BitapSearch(e, t);
}
const C = "$and",
  z = "$or",
  O = "$path",
  B = "$val",
  D = e => !(!e[C] && !e[z]),
  N = e => ({
    [C]: Object.keys(e).map(t => ({
      [t]: e[t]
    }))
  });
function I(e, t, {
  auto: n = !0
} = {}) {
  const a = e => {
    let s = Object.keys(e);
    const c = (e => !!e[O])(e);
    if (!c && s.length > 1 && !D(e)) return a(N(e));
    if ((e => !r(e) && o(e) && !D(e))(e)) {
      const r = c ? e[O] : s[0],
        a = c ? e[B] : e[r];
      if (!i(a)) throw new Error((e => `Invalid value for key ${e}`)(r));
      const o = {
        keyId: f(r),
        pattern: a
      };
      return n && (o.searcher = x(a, t)), o;
    }
    let l = {
      children: [],
      operator: s[0]
    };
    return s.forEach(t => {
      const n = e[t];
      r(n) && n.forEach(e => {
        l.children.push(a(e));
      });
    }), l;
  };
  return D(e) || (e = N(e)), a(e);
}
function R(e, t) {
  const n = e.matches;
  t.matches = [], c(n) && n.forEach(e => {
    if (!c(e.indices) || !e.indices.length) return;
    const {
      indices: indices,
      value: value
    } = e;
    let i = {
      indices: indices,
      value: value
    };
    e.key && (i.key = e.key.src), e.idx > -1 && (i.refIndex = e.idx), t.matches.push(i);
  });
}
function k(e, t) {
  t.score = e.score;
}
/** @eyes-analysis
 * 类职责：以索引和评分规则执行加权模糊搜索
 * 继承：无显式父类；导出：default。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Fuse {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：_keyStore、options。
   * 调用线索：new KeyStore、this.setCollection。
   */
  constructor(e, t = {}, n) {
    this.options = {
      ...m,
      ...t
    }, this.options.useExtendedSearch, this._keyStore = new KeyStore(this.options.keys), this.setCollection(e, n);
  }
  /** @eyes-analysis
   * 源码方法 setCollection；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：_docs、_myIndex。
   * 调用线索：_、new Error。
   */
  setCollection(docs, t) {
    if (this._docs = docs, t && !(t instanceof FuseIndex)) throw new Error("Incorrect 'index' type");
    this._myIndex = t || _(this.options.keys, this._docs, {
      getFn: this.options.getFn,
      fieldNormWeight: this.options.fieldNormWeight
    });
  }
  /** @eyes-analysis
   * 源码方法 add；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：c、this._docs.push、this._myIndex.add。
   */
  add(e) {
    c(e) && (this._docs.push(e), this._myIndex.add(e));
  }
  /** @eyes-analysis
   * 源码方法 remove；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：e、t.push、this.removeAt。
   */
  remove(e = () => !1) {
    const t = [];
    for (let n = 0, r = this._docs.length; n < r; n += 1) {
      const i = this._docs[n];
      e(i, n) && (this.removeAt(n), n -= 1, r -= 1, t.push(i));
    }
    return t;
  }
  /** @eyes-analysis
   * 源码方法 removeAt；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：this._docs.splice、this._myIndex.removeAt。
   */
  removeAt(e) {
    this._docs.splice(e, 1), this._myIndex.removeAt(e);
  }
  /** @eyes-analysis
   * 源码方法 getIndex；作用以类职责与源码实现为准，未猜测压缩参数含义
   */
  getIndex() {
    return this._myIndex;
  }
  /** @eyes-analysis
   * 源码方法 search；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：Math.pow、a、e.forEach、e.map、e.matches.forEach等。
   */
  search(e, {
    limit: t = -1
  } = {}) {
    const {
      includeMatches: includeMatches,
      includeScore: includeScore,
      shouldSort: shouldSort,
      sortFn: sortFn,
      ignoreFieldNorm: ignoreFieldNorm
    } = this.options;
    let l = i(e) ? i(this._docs[0]) ? this._searchStringList(e) : this._searchObjectList(e) : this._searchLogical(e);
    return function (e, {
      ignoreFieldNorm: t = m.ignoreFieldNorm
    }) {
      e.forEach(e => {
        let n = 1;
        e.matches.forEach(({
          key: key,
          norm: norm,
          score: score
        }) => {
          const a = key ? key.weight : null;
          n *= Math.pow(0 === score && a ? Number.EPSILON : score, (a || 1) * (t ? 1 : norm));
        }), e.score = n;
      });
    }(l, {
      ignoreFieldNorm: ignoreFieldNorm
    }), shouldSort && l.sort(sortFn), a(t) && t > -1 && (l = l.slice(0, t)), function (e, t, {
      includeMatches: n = m.includeMatches,
      includeScore: r = m.includeScore
    } = {}) {
      const i = [];
      return n && i.push(R), r && i.push(k), e.map(e => {
        const {
            idx: idx
          } = e,
          r = {
            item: t[idx],
            refIndex: idx
          };
        return i.length && i.forEach(t => {
          t(e, r);
        }), r;
      });
    }(l, this._docs, {
      includeMatches: includeMatches,
      includeScore: includeScore
    });
  }
  /** @eyes-analysis
   * 源码方法 _searchStringList；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：c、r.push、records.forEach、t.searchIn、x。
   */
  _searchStringList(e) {
    const t = x(e, this.options),
      {
        records: records
      } = this._myIndex,
      r = [];
    return records.forEach(({
      v: e,
      i: n,
      n: i
    }) => {
      if (!c(e)) return;
      const {
        isMatch: isMatch,
        score: score,
        indices: indices
      } = t.searchIn(e);
      isMatch && r.push({
        item: e,
        idx: n,
        matches: [{
          score: score,
          value: e,
          norm: i,
          indices: indices
        }]
      });
    }), r;
  }
  /** @eyes-analysis
   * 源码方法 _searchLogical；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：I、a.push、c、i.push、i[r].matches.push等。
   */
  _searchLogical(e) {
    const t = I(e, this.options),
      n = (e, t, r) => {
        if (!e.children) {
          const {
              keyId: keyId,
              searcher: searcher
            } = e,
            a = this._findMatches({
              key: this._keyStore.get(keyId),
              value: this._myIndex.getValueForItemAtKeyId(t, keyId),
              searcher: searcher
            });
          return a && a.length ? [{
            idx: r,
            item: t,
            matches: a
          }] : [];
        }
        const i = [];
        for (let a = 0, s = e.children.length; a < s; a += 1) {
          const s = e.children[a],
            o = n(s, t, r);
          if (o.length) i.push(...o);else if (e.operator === C) return [];
        }
        return i;
      },
      r = this._myIndex.records,
      i = {},
      a = [];
    return r.forEach(({
      $: e,
      i: r
    }) => {
      if (c(e)) {
        let s = n(t, e, r);
        s.length && (i[r] || (i[r] = {
          idx: r,
          item: e,
          matches: []
        }, a.push(i[r])), s.forEach(({
          matches: matches
        }) => {
          i[r].matches.push(...matches);
        }));
      }
    }), a;
  }
  /** @eyes-analysis
   * 源码方法 _searchObjectList；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：a.push、c、i.push、keys.forEach、records.forEach等。
   */
  _searchObjectList(e) {
    const t = x(e, this.options),
      {
        keys: keys,
        records: records
      } = this._myIndex,
      i = [];
    return records.forEach(({
      $: e,
      i: r
    }) => {
      if (!c(e)) return;
      let a = [];
      keys.forEach((n, r) => {
        a.push(...this._findMatches({
          key: n,
          value: e[r],
          searcher: t
        }));
      }), a.length && i.push({
        idx: r,
        item: e,
        matches: a
      });
    }), i;
  }
  /** @eyes-analysis
   * 源码方法 _findMatches；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 调用线索：c、i.push、r、searcher.searchIn、value.forEach。
   */
  _findMatches({
    key: key,
    value: value,
    searcher: searcher
  }) {
    if (!c(value)) return [];
    let i = [];
    if (r(value)) value.forEach(({
      v: t,
      i: r,
      n: a
    }) => {
      if (!c(t)) return;
      const {
        isMatch: isMatch,
        score: score,
        indices: indices
      } = searcher.searchIn(t);
      isMatch && i.push({
        score: score,
        key: key,
        value: t,
        idx: r,
        norm: a,
        indices: indices
      });
    });else {
      const {
          v: r,
          n: a
        } = value,
        {
          isMatch: isMatch,
          score: score,
          indices: indices
        } = searcher.searchIn(r);
      isMatch && i.push({
        score: score,
        key: key,
        value: r,
        norm: a,
        indices: indices
      });
    }
    return i;
  }
}
Fuse.version = "6.6.2", Fuse.createIndex = _, Fuse.parseIndex = function (e, {
  getFn: t = m.getFn,
  fieldNormWeight: n = m.fieldNormWeight
} = {}) {
  const {
      keys: keys,
      records: records
    } = e,
    fuseIndex = new FuseIndex({
      getFn: t,
      fieldNormWeight: n
    });
  return fuseIndex.setKeys(keys), fuseIndex.setIndexRecords(records), fuseIndex;
}, Fuse.config = m, Fuse.parseQuery = I, function (...e) {
  E.push(...e);
}(ExtendedSearch);
export { Fuse as default };
