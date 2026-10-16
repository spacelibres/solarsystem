/** @eyes-analysis
 * 文件职责：提供 computeMikkTSpaceTangents、computeMorphedAttributes、deepCloneAttribute、deinterleaveAttribute、deinterleaveGeometry、estimateBytesUsed、interleaveAttributes、mergeAttributes、mergeGeometries、mergeGroups、mergeVertices、toCreasedNormals、toTrianglesDrawMode；实现由这些导出命名的第三方工具/常量
 * 依据：// Recovered from vendors.js:958088-971912.；exports: computeMikkTSpaceTangents, computeMorphedAttributes, deepCloneAttribute, deinterleaveAttribute, deinterleaveGeometry, estimateBytesUsed, interleaveAttributes, mergeAttributes, mergeGeometries, mergeGroups, mergeVertices, toCreasedNormals, toTrianglesDrawMode
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:958088-971912.
import * as ThreeCore from "../three/core.js";
function computeMikkTSpaceTangents(e, t, n = !0) {
  if (!t || !t.isReady) throw new Error("THREE.BufferGeometryUtils: Initialized MikkTSpace library required.");
  if (!e.hasAttribute("position") || !e.hasAttribute("normal") || !e.hasAttribute("uv")) throw new Error('THREE.BufferGeometryUtils: Tangents require "position", "normal", and "uv" attributes.');
  function i(e) {
    if (e.normalized || e.isInterleavedBufferAttribute) {
      const float32Array = new Float32Array(e.count * e.itemSize);
      for (let n = 0, r = 0; n < e.count; n++) float32Array[r++] = e.getX(n), float32Array[r++] = e.getY(n), e.itemSize > 2 && (float32Array[r++] = e.getZ(n));
      return float32Array;
    }
    return e.array instanceof Float32Array ? e.array : new Float32Array(e.array);
  }
  const a = e.index ? e.toNonIndexed() : e,
    s = t.generateTangents(i(a.attributes.position), i(a.attributes.normal), i(a.attributes.uv));
  if (n) for (let e = 3; e < s.length; e += 4) s[e] *= -1;
  return a.setAttribute("tangent", new ThreeCore.BufferAttribute(s, 4)), e !== a && e.copy(a), e;
}
function mergeGeometries(e, t = !1) {
  const n = null !== e[0].index,
    set = new Set(Object.keys(e[0].attributes)),
    a = new Set(Object.keys(e[0].morphAttributes)),
    o = {},
    c = {},
    l = e[0].morphTargetsRelative,
    bufferGeometry = new ThreeCore.BufferGeometry();
  let d = 0;
  for (let r = 0; r < e.length; ++r) {
    const s = e[r];
    let h = 0;
    if (n !== (null !== s.index)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + r + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
    for (const e in s.attributes) {
      if (!set.has(e)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + r + '. All geometries must have compatible attributes; make sure "' + e + '" attribute exists among all geometries, or in none of them.'), null;
      void 0 === o[e] && (o[e] = []), o[e].push(s.attributes[e]), h++;
    }
    if (h !== set.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + r + ". Make sure all geometries have the same number of attributes."), null;
    if (l !== s.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + r + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
    for (const e in s.morphAttributes) {
      if (!a.has(e)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + r + ".  .morphAttributes must be consistent throughout all geometries."), null;
      void 0 === c[e] && (c[e] = []), c[e].push(s.morphAttributes[e]);
    }
    if (t) {
      let e;
      if (n) e = s.index.count;else {
        if (void 0 === s.attributes.position) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + r + ". The geometry must have either an index or a position attribute"), null;
        e = s.attributes.position.count;
      }
      bufferGeometry.addGroup(d, e, r), d += e;
    }
  }
  if (n) {
    let t = 0;
    const n = [];
    for (let r = 0; r < e.length; ++r) {
      const i = e[r].index;
      for (let e = 0; e < i.count; ++e) n.push(i.getX(e) + t);
      t += e[r].attributes.position.count;
    }
    bufferGeometry.setIndex(n);
  }
  for (const e in o) {
    const t = mergeAttributes(o[e]);
    if (!t) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " attribute."), null;
    bufferGeometry.setAttribute(e, t);
  }
  for (const e in c) {
    const t = c[e][0].length;
    if (0 !== t) {
      bufferGeometry.morphAttributes = bufferGeometry.morphAttributes || {}, bufferGeometry.morphAttributes[e] = [];
      for (let n = 0; n < t; ++n) {
        const t = [];
        for (let r = 0; r < c[e].length; ++r) t.push(c[e][r][n]);
        const r = mergeAttributes(t);
        if (!r) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
        bufferGeometry.morphAttributes[e].push(r);
      }
    }
  }
  return bufferGeometry;
}
function mergeAttributes(e) {
  let t,
    n,
    i,
    a = -1,
    s = 0;
  for (let r = 0; r < e.length; ++r) {
    const o = e[r];
    if (void 0 === t && (t = o.array.constructor), t !== o.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
    if (void 0 === n && (n = o.itemSize), n !== o.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
    if (void 0 === i && (i = o.normalized), i !== o.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
    if (-1 === a && (a = o.gpuType), a !== o.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
    s += o.count * n;
  }
  const o = new t(s),
    bufferAttribute = new ThreeCore.BufferAttribute(o, n, i);
  let l = 0;
  for (let t = 0; t < e.length; ++t) {
    const r = e[t];
    if (r.isInterleavedBufferAttribute) {
      const e = l / n;
      for (let t = 0, i = r.count; t < i; t++) for (let i = 0; i < n; i++) {
        const n = r.getComponent(t, i);
        bufferAttribute.setComponent(t + e, i, n);
      }
    } else o.set(r.array, l);
    l += r.count * n;
  }
  return void 0 !== a && (bufferAttribute.gpuType = a), bufferAttribute;
}
function deepCloneAttribute(e) {
  return e.isInstancedInterleavedBufferAttribute || e.isInterleavedBufferAttribute ? deinterleaveAttribute(e) : e.isInstancedBufferAttribute ? new ThreeCore.InstancedBufferAttribute().copy(e) : new ThreeCore.BufferAttribute().copy(e);
}
function interleaveAttributes(e) {
  let t,
    n = 0,
    i = 0;
  for (let r = 0, a = e.length; r < a; ++r) {
    const a = e[r];
    if (void 0 === t && (t = a.array.constructor), t !== a.array.constructor) return console.error("AttributeBuffers of different types cannot be interleaved"), null;
    n += a.array.length, i += a.itemSize;
  }
  const interleavedBuffer = new ThreeCore.InterleavedBuffer(new t(n), i);
  let s = 0;
  const o = [],
    c = ["getX", "getY", "getZ", "getW"],
    l = ["setX", "setY", "setZ", "setW"];
  for (let t = 0, n = e.length; t < n; t++) {
    const n = e[t],
      i = n.itemSize,
      u = n.count,
      interleavedBufferAttribute = new ThreeCore.InterleavedBufferAttribute(interleavedBuffer, i, s, n.normalized);
    o.push(interleavedBufferAttribute), s += i;
    for (let e = 0; e < u; e++) for (let t = 0; t < i; t++) interleavedBufferAttribute[l[t]](e, n[c[t]](e));
  }
  return o;
}
function deinterleaveAttribute(e) {
  const t = e.data.array.constructor,
    n = e.count,
    i = e.itemSize,
    a = e.normalized,
    s = new t(n * i);
  let o;
  o = e.isInstancedInterleavedBufferAttribute ? new ThreeCore.InstancedBufferAttribute(s, i, a, e.meshPerAttribute) : new ThreeCore.BufferAttribute(s, i, a);
  for (let t = 0; t < n; t++) o.setX(t, e.getX(t)), i >= 2 && o.setY(t, e.getY(t)), i >= 3 && o.setZ(t, e.getZ(t)), i >= 4 && o.setW(t, e.getW(t));
  return o;
}
function deinterleaveGeometry(e) {
  const t = e.attributes,
    n = e.morphTargets,
    map = new Map();
  for (const e in t) {
    const n = t[e];
    n.isInterleavedBufferAttribute && (map.has(n) || map.set(n, deinterleaveAttribute(n)), t[e] = map.get(n));
  }
  for (const e in n) {
    const t = n[e];
    t.isInterleavedBufferAttribute && (map.has(t) || map.set(t, deinterleaveAttribute(t)), n[e] = map.get(t));
  }
}
function estimateBytesUsed(e) {
  let t = 0;
  for (const n in e.attributes) {
    const r = e.getAttribute(n);
    t += r.count * r.itemSize * r.array.BYTES_PER_ELEMENT;
  }
  const n = e.getIndex();
  return t += n ? n.count * n.itemSize * n.array.BYTES_PER_ELEMENT : 0, t;
}
function mergeVertices(e, t = 1e-4) {
  t = Math.max(t, Number.EPSILON);
  const n = {},
    r = e.getIndex(),
    i = e.getAttribute("position"),
    a = r ? r.count : i.count;
  let s = 0;
  const o = Object.keys(e.attributes),
    c = {},
    l = {},
    u = [],
    d = ["getX", "getY", "getZ", "getW"],
    h = ["setX", "setY", "setZ", "setW"];
  for (let t = 0, n = o.length; t < n; t++) {
    const n = o[t],
      r = e.attributes[n];
    c[n] = new r.constructor(new r.array.constructor(r.count * r.itemSize), r.itemSize, r.normalized);
    const i = e.morphAttributes[n];
    i && (l[n] || (l[n] = []), i.forEach((e, t) => {
      const constructor = new e.array.constructor(e.count * e.itemSize);
      l[n][t] = new e.constructor(constructor, e.itemSize, e.normalized);
    }));
  }
  const p = .5 * t,
    f = Math.log10(1 / t),
    m = Math.pow(10, f),
    M = p * m;
  for (let t = 0; t < a; t++) {
    const i = r ? r.getX(t) : t;
    let a = "";
    for (let t = 0, n = o.length; t < n; t++) {
      const n = o[t],
        r = e.getAttribute(n),
        s = r.itemSize;
      for (let e = 0; e < s; e++) a += ~~(r[d[e]](i) * m + M) + ",";
    }
    if (a in n) u.push(n[a]);else {
      for (let t = 0, n = o.length; t < n; t++) {
        const n = o[t],
          r = e.getAttribute(n),
          a = e.morphAttributes[n],
          u = r.itemSize,
          p = c[n],
          f = l[n];
        for (let e = 0; e < u; e++) {
          const t = d[e],
            n = h[e];
          if (p[n](s, r[t](i)), a) for (let e = 0, r = a.length; e < r; e++) f[e][n](s, a[e][t](i));
        }
      }
      n[a] = s, u.push(s), s++;
    }
  }
  const _ = e.clone();
  for (const t in e.attributes) {
    const e = c[t];
    if (_.setAttribute(t, new e.constructor(e.array.slice(0, s * e.itemSize), e.itemSize, e.normalized)), t in l) for (let e = 0; e < l[t].length; e++) {
      const n = l[t][e];
      _.morphAttributes[t][e] = new n.constructor(n.array.slice(0, s * n.itemSize), n.itemSize, n.normalized);
    }
  }
  return _.setIndex(u), _;
}
function toTrianglesDrawMode(e, t) {
  if (t === ThreeCore.TrianglesDrawMode) return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), e;
  if (t === ThreeCore.TriangleFanDrawMode || t === ThreeCore.TriangleStripDrawMode) {
    let n = e.getIndex();
    if (null === n) {
      const t = [],
        r = e.getAttribute("position");
      if (void 0 === r) return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), e;
      for (let e = 0; e < r.count; e++) t.push(e);
      e.setIndex(t), n = e.getIndex();
    }
    const i = n.count - 2,
      a = [];
    if (t === ThreeCore.TriangleFanDrawMode) for (let e = 1; e <= i; e++) a.push(n.getX(0)), a.push(n.getX(e)), a.push(n.getX(e + 1));else for (let e = 0; e < i; e++) e % 2 == 0 ? (a.push(n.getX(e)), a.push(n.getX(e + 1)), a.push(n.getX(e + 2))) : (a.push(n.getX(e + 2)), a.push(n.getX(e + 1)), a.push(n.getX(e)));
    a.length / 3 !== i && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const s = e.clone();
    return s.setIndex(a), s.clearGroups(), s;
  }
  return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", t), e;
}
function computeMorphedAttributes(e) {
  const vector3 = new ThreeCore.Vector3(),
    n = new ThreeCore.Vector3(),
    i = new ThreeCore.Vector3(),
    a = new ThreeCore.Vector3(),
    s = new ThreeCore.Vector3(),
    o = new ThreeCore.Vector3(),
    c = new ThreeCore.Vector3(),
    l = new ThreeCore.Vector3(),
    u = new ThreeCore.Vector3();
  function d(e, r, d, h, p, f, m, M) {
    vector3.fromBufferAttribute(r, p), n.fromBufferAttribute(r, f), i.fromBufferAttribute(r, m);
    const _ = e.morphTargetInfluences;
    if (d && _) {
      c.set(0, 0, 0), l.set(0, 0, 0), u.set(0, 0, 0);
      for (let e = 0, r = d.length; e < r; e++) {
        const r = _[e],
          M = d[e];
        0 !== r && (a.fromBufferAttribute(M, p), s.fromBufferAttribute(M, f), o.fromBufferAttribute(M, m), h ? (c.addScaledVector(a, r), l.addScaledVector(s, r), u.addScaledVector(o, r)) : (c.addScaledVector(a.sub(vector3), r), l.addScaledVector(s.sub(n), r), u.addScaledVector(o.sub(i), r)));
      }
      vector3.add(c), n.add(l), i.add(u);
    }
    e.isSkinnedMesh && (e.applyBoneTransform(p, vector3), e.applyBoneTransform(f, n), e.applyBoneTransform(m, i)), M[3 * p + 0] = vector3.x, M[3 * p + 1] = vector3.y, M[3 * p + 2] = vector3.z, M[3 * f + 0] = n.x, M[3 * f + 1] = n.y, M[3 * f + 2] = n.z, M[3 * m + 0] = i.x, M[3 * m + 1] = i.y, M[3 * m + 2] = i.z;
  }
  const h = e.geometry,
    p = e.material;
  let f, m, M;
  const _ = h.index,
    A = h.attributes.position,
    g = h.morphAttributes.position,
    b = h.morphTargetsRelative,
    y = h.attributes.normal,
    L = h.morphAttributes.normal,
    v = h.groups,
    T = h.drawRange;
  let S, w, E, x, C, z, O;
  const float32Array = new Float32Array(A.count * A.itemSize),
    D = new Float32Array(y.count * y.itemSize);
  if (null !== _) {
    if (Array.isArray(p)) for (S = 0, E = v.length; S < E; S++) for (C = v[S], z = Math.max(C.start, T.start), O = Math.min(C.start + C.count, T.start + T.count), w = z, x = O; w < x; w += 3) f = _.getX(w), m = _.getX(w + 1), M = _.getX(w + 2), d(e, A, g, b, f, m, M, float32Array), d(e, y, L, b, f, m, M, D);else for (z = Math.max(0, T.start), O = Math.min(_.count, T.start + T.count), S = z, E = O; S < E; S += 3) f = _.getX(S), m = _.getX(S + 1), M = _.getX(S + 2), d(e, A, g, b, f, m, M, float32Array), d(e, y, L, b, f, m, M, D);
  } else if (Array.isArray(p)) for (S = 0, E = v.length; S < E; S++) for (C = v[S], z = Math.max(C.start, T.start), O = Math.min(C.start + C.count, T.start + T.count), w = z, x = O; w < x; w += 3) f = w, m = w + 1, M = w + 2, d(e, A, g, b, f, m, M, float32Array), d(e, y, L, b, f, m, M, D);else for (z = Math.max(0, T.start), O = Math.min(A.count, T.start + T.count), S = z, E = O; S < E; S += 3) f = S, m = S + 1, M = S + 2, d(e, A, g, b, f, m, M, float32Array), d(e, y, L, b, f, m, M, D);
  return {
    positionAttribute: A,
    normalAttribute: y,
    morphedPositionAttribute: new ThreeCore.Float32BufferAttribute(float32Array, 3),
    morphedNormalAttribute: new ThreeCore.Float32BufferAttribute(D, 3)
  };
}
function mergeGroups(e) {
  if (0 === e.groups.length) return console.warn("THREE.BufferGeometryUtils.mergeGroups(): No groups are defined. Nothing to merge."), e;
  let t = e.groups;
  if (t = t.sort((e, t) => e.materialIndex !== t.materialIndex ? e.materialIndex - t.materialIndex : e.start - t.start), null === e.getIndex()) {
    const t = e.getAttribute("position"),
      n = [];
    for (let e = 0; e < t.count; e += 3) n.push(e, e + 1, e + 2);
    e.setIndex(n);
  }
  const n = e.getIndex(),
    r = [];
  for (let e = 0; e < t.length; e++) {
    const i = t[e],
      a = i.start,
      s = a + i.count;
    for (let e = a; e < s; e++) r.push(n.getX(e));
  }
  e.dispose(), e.setIndex(r);
  let i = 0;
  for (let e = 0; e < t.length; e++) {
    const n = t[e];
    n.start = i, i += n.count;
  }
  let a = t[0];
  e.groups = [a];
  for (let n = 1; n < t.length; n++) {
    const r = t[n];
    a.materialIndex === r.materialIndex ? a.count += r.count : (a = r, e.groups.push(a));
  }
  return e;
}
function toCreasedNormals(e, t = Math.PI / 3) {
  const n = e.index ? e.toNonIndexed() : e,
    i = n.attributes.position,
    a = i.count;
  let s;
  if (!0 === i.isBufferAttribute && 3 === i.itemSize && !1 === i.normalized) s = i.array;else {
    s = new Float64Array(3 * a);
    for (let e = 0; e < a; e++) s[3 * e + 0] = i.getX(e), s[3 * e + 1] = i.getY(e), s[3 * e + 2] = i.getZ(e);
  }
  const o = Math.cos(t),
    c = 100 * (1 + 1e-10),
    l = a / 3,
    float64Array = new Float64Array(3 * l);
  for (let e = 0; e < l; e++) {
    const t = 9 * e,
      n = s[t + 0],
      r = s[t + 1],
      i = s[t + 2],
      a = s[t + 3],
      o = s[t + 4],
      c = s[t + 5],
      l = s[t + 6] - a,
      d = s[t + 7] - o,
      h = s[t + 8] - c,
      p = n - a,
      f = r - o,
      m = i - c,
      M = d * m - h * f,
      _ = h * p - l * m,
      A = l * f - d * p,
      g = 1 / (Math.sqrt(M * M + _ * _ + A * A) || 1);
    float64Array[3 * e + 0] = M * g, float64Array[3 * e + 1] = _ * g, float64Array[3 * e + 2] = A * g;
  }
  const int32Array = new Int32Array(a),
    h = new Int32Array(3 * a);
  let p = 1;
  for (; p < 2 * a;) p <<= 1;
  const f = p - 1,
    m = new Int32Array(p);
  let M = 0;
  for (let e = 0; e < a; e++) {
    const t = 3 * e,
      n = ~~(s[t + 0] * c),
      r = ~~(s[t + 1] * c),
      i = ~~(s[t + 2] * c);
    let a = (Math.imul(n, 73856093) ^ Math.imul(r, 19349663) ^ Math.imul(i, 83492791)) & f;
    for (;;) {
      const t = m[a];
      if (0 === t) {
        const t = 3 * M;
        h[t + 0] = n, h[t + 1] = r, h[t + 2] = i, m[a] = M + 1, int32Array[e] = M++;
        break;
      }
      const s = 3 * (t - 1);
      if (h[s + 0] === n && h[s + 1] === r && h[s + 2] === i) {
        int32Array[e] = t - 1;
        break;
      }
      a = a + 1 & f;
    }
  }
  const _ = new Int32Array(M + 1);
  for (let e = 0; e < a; e++) _[int32Array[e] + 1]++;
  for (let e = 0; e < M; e++) _[e + 1] += _[e];
  const A = new Int32Array(a),
    g = _.slice(0, M);
  for (let e = 0; e < l; e++) {
    const t = 3 * e;
    A[g[int32Array[t + 0]]++] = e, A[g[int32Array[t + 1]]++] = e, A[g[int32Array[t + 2]]++] = e;
  }
  const float32Array = new Float32Array(3 * a);
  for (let e = 0; e < l; e++) {
    const t = 3 * e,
      n = float64Array[t + 0],
      r = float64Array[t + 1],
      i = float64Array[t + 2];
    for (let e = 0; e < 3; e++) {
      const a = t + e,
        s = int32Array[a];
      let c = 0,
        l = 0,
        h = 0;
      for (let e = _[s], t = _[s + 1]; e < t; e++) {
        const t = 3 * A[e],
          a = float64Array[t + 0],
          s = float64Array[t + 1],
          d = float64Array[t + 2];
        n * a + r * s + i * d > o && (c += a, l += s, h += d);
      }
      const p = 1 / (Math.sqrt(c * c + l * l + h * h) || 1);
      float32Array[3 * a + 0] = c * p, float32Array[3 * a + 1] = l * p, float32Array[3 * a + 2] = h * p;
    }
  }
  return n.setAttribute("normal", new ThreeCore.BufferAttribute(float32Array, 3, !1)), n;
}
export { computeMikkTSpaceTangents };
export { computeMorphedAttributes };
export { deepCloneAttribute };
export { deinterleaveAttribute };
export { deinterleaveGeometry };
export { estimateBytesUsed };
export { interleaveAttributes };
export { mergeAttributes };
export { mergeGeometries };
export { mergeGroups };
export { mergeVertices };
export { toCreasedNormals };
export { toTrianglesDrawMode };
