// Recovered from vendors.js:971913-976079.
import * as ThreeCore from "../three/core.js";
function i(e, t) {
  return void 0 !== t.getBoneName ? t.getBoneName(e) : t.names[e.name];
}
function retarget(e, t, n = {}) {
  const quaternion = new ThreeCore.Quaternion(),
    vector3 = new ThreeCore.Vector3(),
    matrix4 = new ThreeCore.Matrix4(),
    u = new ThreeCore.Matrix4();
  n.preserveBoneMatrix = void 0 === n.preserveBoneMatrix || n.preserveBoneMatrix, n.preserveBonePositions = void 0 === n.preserveBonePositions || n.preserveBonePositions, n.useTargetMatrix = void 0 !== n.useTargetMatrix && n.useTargetMatrix, n.hip = void 0 !== n.hip ? n.hip : "hip", n.hipInfluence = void 0 !== n.hipInfluence ? n.hipInfluence : new ThreeCore.Vector3(1, 1, 1), n.scale = void 0 !== n.scale ? n.scale : 1, n.names = n.names || {};
  const d = t.isObject3D ? t.skeleton.bones : l(t),
    h = e.isObject3D ? e.skeleton.bones : l(e);
  let p, f, m, M;
  if (e.isObject3D ? e.skeleton.pose() : (n.useTargetMatrix = !0, n.preserveBoneMatrix = !1), n.preserveBonePositions) {
    M = [];
    for (let e = 0; e < h.length; e++) M.push(h[e].position.clone());
  }
  if (n.preserveBoneMatrix) {
    e.updateMatrixWorld(), e.matrixWorld.identity();
    for (let t = 0; t < e.children.length; ++t) e.children[t].updateMatrixWorld(!0);
  }
  for (let t = 0; t < h.length; ++t) p = h[t], f = i(p, n), m = c(f, d), u.copy(p.matrixWorld), m && (m.updateMatrixWorld(), n.useTargetMatrix ? matrix4.copy(m.matrixWorld) : (matrix4.copy(e.matrixWorld).invert(), matrix4.multiply(m.matrixWorld)), vector3.setFromMatrixScale(matrix4), matrix4.scale(vector3.set(1 / vector3.x, 1 / vector3.y, 1 / vector3.z)), u.makeRotationFromQuaternion(quaternion.setFromRotationMatrix(matrix4)), e.isObject3D && n.localOffsets && n.localOffsets[p.name] && u.multiply(n.localOffsets[p.name]), u.copyPosition(matrix4)), f === n.hip && (u.elements[12] *= n.scale * n.hipInfluence.x, u.elements[13] *= n.scale * n.hipInfluence.y, u.elements[14] *= n.scale * n.hipInfluence.z, void 0 !== n.hipPosition && (u.elements[12] += n.hipPosition.x * n.scale, u.elements[13] += n.hipPosition.y * n.scale, u.elements[14] += n.hipPosition.z * n.scale)), p.parent ? (p.matrix.copy(p.parent.matrixWorld).invert(), p.matrix.multiply(u)) : p.matrix.copy(u), p.matrix.decompose(p.position, p.quaternion, p.scale), p.updateMatrixWorld();
  if (n.preserveBonePositions) for (let e = 0; e < h.length; ++e) p = h[e], f = i(p, n) || p.name, f !== n.hip && p.position.copy(M[e]);
  n.preserveBoneMatrix && e.updateMatrixWorld(!0);
}
function retargetClip(e, t, n, s = {}) {
  s.useFirstFramePosition = void 0 !== s.useFirstFramePosition && s.useFirstFramePosition, s.fps = void 0 !== s.fps ? s.fps : Math.max(...n.tracks.map(e => e.times.length)) / n.duration, s.names = s.names || [], t.isObject3D || (t = function (e) {
    const skeletonHelper = new ThreeCore.SkeletonHelper(e.bones[0]);
    return skeletonHelper.skeleton = e, skeletonHelper;
  }(t));
  const o = Math.round(n.duration * (s.fps / 1e3) * 1e3),
    u = n.duration / (o - 1),
    d = [],
    animationMixer = new ThreeCore.AnimationMixer(t),
    p = l(e.skeleton),
    f = [];
  let m, M, _, A, g;
  animationMixer.clipAction(n).play();
  let b = 0,
    y = o;
  void 0 !== s.trim ? (b = Math.round(s.trim[0] * s.fps), y = Math.min(Math.round(s.trim[1] * s.fps), o) - b, animationMixer.update(s.trim[0])) : animationMixer.update(0), t.updateMatrixWorld();
  for (let n = 0; n < y; ++n) {
    const r = n * u;
    retarget(e, t, s);
    for (let e = 0; e < p.length; ++e) M = p[e], g = i(M, s) || M.name, _ = c(g, t.skeleton), _ && (A = f[e] = f[e] || {
      bone: M
    }, s.hip === g && (A.pos || (A.pos = {
      times: new Float32Array(y),
      values: new Float32Array(3 * y)
    }), s.useFirstFramePosition && (0 === n && (m = M.position.clone()), M.position.sub(m)), A.pos.times[n] = r, M.position.toArray(A.pos.values, 3 * n)), A.quat || (A.quat = {
      times: new Float32Array(y),
      values: new Float32Array(4 * y)
    }), A.quat.times[n] = r, M.quaternion.toArray(A.quat.values, 4 * n));
    n === y - 2 ? animationMixer.update(u - 1e-7) : animationMixer.update(u), t.updateMatrixWorld();
  }
  for (let e = 0; e < f.length; ++e) A = f[e], A && (A.pos && d.push(new ThreeCore.VectorKeyframeTrack(".bones[" + A.bone.name + "].position", A.pos.times, A.pos.values)), d.push(new ThreeCore.QuaternionKeyframeTrack(".bones[" + A.bone.name + "].quaternion", A.quat.times, A.quat.values)));
  return animationMixer.uncacheAction(n), new ThreeCore.AnimationClip(n.name, -1, d);
}
function clone(e) {
  const map = new Map(),
    n = new Map(),
    r = e.clone();
  return u(e, r, function (e, r) {
    map.set(r, e), n.set(e, r);
  }), r.traverse(function (e) {
    if (!e.isSkinnedMesh) return;
    const r = e,
      i = map.get(e),
      a = i.skeleton.bones;
    r.skeleton = i.skeleton.clone(), r.bindMatrix.copy(i.bindMatrix), r.skeleton.bones = a.map(function (e) {
      return n.get(e);
    }), r.bind(r.skeleton, r.bindMatrix);
  }), r;
}
function c(e, t) {
  for (let n = 0, r = l(t); n < r.length; n++) if (e === r[n].name) return r[n];
}
function l(e) {
  return Array.isArray(e) ? e : e.bones;
}
function u(e, t, n) {
  n(e, t);
  for (let r = 0; r < e.children.length; r++) u(e.children[r], t.children[r], n);
}
export { clone };
export { retarget };
export { retargetClip };
