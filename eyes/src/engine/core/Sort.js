// Recovered from app.js:39659-40702.
class Sort {
  static getIndex(t, e) {
    let i = 0;
    let s = e.length;
    for (; i < s;) {
      const n = i + s >>> 1;
      e[n] < t ? i = n + 1 : s = n;
    }
    return i;
  }
  static getIndexObject(t, e, i) {
    let s = 0;
    let n = e.length;
    for (; s < n;) {
      const o = s + n >>> 1;
      i(e[o], t) ? s = o + 1 : n = o;
    }
    return s;
  }
  static add(t, e) {
    let i = this.getIndex(t, e);
    for (; i < e.length && e[i] === t;) i += 1;
    e.splice(i, 0, t);
  }
  static addObject(t, e, i, s) {
    let n = this.getIndexObject(t, e, i);
    for (; n < e.length && s(e[n], t);) n += 1;
    e.splice(n, 0, t);
  }
  static remove(t, e) {
    const i = this.getIndex(t, e);
    let s = false;
    i < e.length && e[i] === t && (s = true);
    s && e.splice(i, 1);
    return s;
  }
  static removeObject(t, e, i, s) {
    const n = this.getIndexObject(t, e, i);
    let o = false;
    n < e.length && s(e[n], t) && (o = true);
    o && e.splice(n, 1);
    return o;
  }
  static sort(t, e) {
    if (0 === t.length) return;
    let i = 1;
    for (; i < t.length;) {
      let s = i - 1;
      for (; s >= 0 && t[s + 1] < t[s];) {
        const i = t[s];
        t[s] = t[s + 1];
        t[s + 1] = i;
        e && e(s + 1, s);
        s--;
      }
      i++;
    }
  }
  static sortObject(t, e, i) {
    if (0 === t.length) return;
    let s = 1;
    for (; s < t.length;) {
      let n = s - 1;
      for (; n >= 0 && e(t[n + 1], t[n]);) {
        const e = t[n];
        t[n] = t[n + 1];
        t[n + 1] = e;
        i && i(n + 1, n);
        n--;
      }
      s++;
    }
  }
}
export { Sort };
