/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 * Verified naming references: official three@0.185.0 and three@0.185.1 core builds.
 * Exact bundled patch remains unconfirmed. Executable operations retained; identifier reflection changes.
 */
// Recovered from vendors.js:386331-792655.
const REVISION = "185",
  MOUSE = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2,
    ROTATE: 0,
    DOLLY: 1,
    PAN: 2
  },
  TOUCH = {
    ROTATE: 0,
    PAN: 1,
    DOLLY_PAN: 2,
    DOLLY_ROTATE: 3
  },
  CullFaceNone = 0,
  CullFaceBack = 1,
  CullFaceFront = 2,
  CullFaceFrontBack = 3,
  BasicShadowMap = 0,
  PCFShadowMap = 1,
  PCFSoftShadowMap = 2,
  VSMShadowMap = 3,
  FrontSide = 0,
  BackSide = 1,
  DoubleSide = 2,
  NoBlending = 0,
  NormalBlending = 1,
  AdditiveBlending = 2,
  SubtractiveBlending = 3,
  MultiplyBlending = 4,
  CustomBlending = 5,
  MaterialBlending = 6,
  AddEquation = 100,
  SubtractEquation = 101,
  ReverseSubtractEquation = 102,
  MinEquation = 103,
  MaxEquation = 104,
  ZeroFactor = 200,
  OneFactor = 201,
  SrcColorFactor = 202,
  OneMinusSrcColorFactor = 203,
  SrcAlphaFactor = 204,
  OneMinusSrcAlphaFactor = 205,
  DstAlphaFactor = 206,
  OneMinusDstAlphaFactor = 207,
  DstColorFactor = 208,
  OneMinusDstColorFactor = 209,
  SrcAlphaSaturateFactor = 210,
  ConstantColorFactor = 211,
  OneMinusConstantColorFactor = 212,
  ConstantAlphaFactor = 213,
  OneMinusConstantAlphaFactor = 214,
  NeverDepth = 0,
  AlwaysDepth = 1,
  LessDepth = 2,
  LessEqualDepth = 3,
  EqualDepth = 4,
  GreaterEqualDepth = 5,
  GreaterDepth = 6,
  NotEqualDepth = 7,
  MultiplyOperation = 0,
  MixOperation = 1,
  AddOperation = 2,
  NoToneMapping = 0,
  LinearToneMapping = 1,
  ReinhardToneMapping = 2,
  CineonToneMapping = 3,
  ACESFilmicToneMapping = 4,
  CustomToneMapping = 5,
  AgXToneMapping = 6,
  NeutralToneMapping = 7,
  AttachedBindMode = "attached",
  DetachedBindMode = "detached",
  UVMapping = 300,
  CubeReflectionMapping = 301,
  CubeRefractionMapping = 302,
  EquirectangularReflectionMapping = 303,
  EquirectangularRefractionMapping = 304,
  CubeUVReflectionMapping = 306,
  RepeatWrapping = 1e3,
  ClampToEdgeWrapping = 1001,
  MirroredRepeatWrapping = 1002,
  NearestFilter = 1003,
  NearestMipmapNearestFilter = 1004,
  NearestMipMapNearestFilter = 1004,
  NearestMipmapLinearFilter = 1005,
  NearestMipMapLinearFilter = 1005,
  LinearFilter = 1006,
  LinearMipmapNearestFilter = 1007,
  LinearMipMapNearestFilter = 1007,
  LinearMipmapLinearFilter = 1008,
  LinearMipMapLinearFilter = 1008,
  UnsignedByteType = 1009,
  ByteType = 1010,
  ShortType = 1011,
  UnsignedShortType = 1012,
  IntType = 1013,
  UnsignedIntType = 1014,
  FloatType = 1015,
  HalfFloatType = 1016,
  UnsignedShort4444Type = 1017,
  UnsignedShort5551Type = 1018,
  UnsignedInt248Type = 1020,
  UnsignedInt5999Type = 35902,
  UnsignedInt101111Type = 35899,
  AlphaFormat = 1021,
  RGBFormat = 1022,
  RGBAFormat = 1023,
  DepthFormat = 1026,
  DepthStencilFormat = 1027,
  RedFormat = 1028,
  RedIntegerFormat = 1029,
  RGFormat = 1030,
  RGIntegerFormat = 1031,
  RGBIntegerFormat = 1032,
  RGBAIntegerFormat = 1033,
  RGB_S3TC_DXT1_Format = 33776,
  RGBA_S3TC_DXT1_Format = 33777,
  RGBA_S3TC_DXT3_Format = 33778,
  RGBA_S3TC_DXT5_Format = 33779,
  RGB_PVRTC_4BPPV1_Format = 35840,
  RGB_PVRTC_2BPPV1_Format = 35841,
  RGBA_PVRTC_4BPPV1_Format = 35842,
  RGBA_PVRTC_2BPPV1_Format = 35843,
  RGB_ETC1_Format = 36196,
  RGB_ETC2_Format = 37492,
  RGBA_ETC2_EAC_Format = 37496,
  R11_EAC_Format = 37488,
  SIGNED_R11_EAC_Format = 37489,
  RG11_EAC_Format = 37490,
  SIGNED_RG11_EAC_Format = 37491,
  RGBA_ASTC_4x4_Format = 37808,
  RGBA_ASTC_5x4_Format = 37809,
  RGBA_ASTC_5x5_Format = 37810,
  RGBA_ASTC_6x5_Format = 37811,
  RGBA_ASTC_6x6_Format = 37812,
  RGBA_ASTC_8x5_Format = 37813,
  RGBA_ASTC_8x6_Format = 37814,
  RGBA_ASTC_8x8_Format = 37815,
  RGBA_ASTC_10x5_Format = 37816,
  RGBA_ASTC_10x6_Format = 37817,
  RGBA_ASTC_10x8_Format = 37818,
  RGBA_ASTC_10x10_Format = 37819,
  RGBA_ASTC_12x10_Format = 37820,
  RGBA_ASTC_12x12_Format = 37821,
  RGBA_BPTC_Format = 36492,
  RGB_BPTC_SIGNED_Format = 36494,
  RGB_BPTC_UNSIGNED_Format = 36495,
  RED_RGTC1_Format = 36283,
  SIGNED_RED_RGTC1_Format = 36284,
  RED_GREEN_RGTC2_Format = 36285,
  SIGNED_RED_GREEN_RGTC2_Format = 36286,
  LoopOnce = 2200,
  LoopRepeat = 2201,
  LoopPingPong = 2202,
  InterpolateDiscrete = 2300,
  InterpolateLinear = 2301,
  InterpolateSmooth = 2302,
  InterpolateBezier = 2303,
  ZeroCurvatureEnding = 2400,
  ZeroSlopeEnding = 2401,
  WrapAroundEnding = 2402,
  NormalAnimationBlendMode = 2500,
  AdditiveAnimationBlendMode = 2501,
  TrianglesDrawMode = 0,
  TriangleStripDrawMode = 1,
  TriangleFanDrawMode = 2,
  BasicDepthPacking = 3200,
  RGBADepthPacking = 3201,
  RGBDepthPacking = 3202,
  RGDepthPacking = 3203,
  TangentSpaceNormalMap = 0,
  ObjectSpaceNormalMap = 1,
  NoColorSpace = "",
  SRGBColorSpace = "srgb",
  LinearSRGBColorSpace = "srgb-linear",
  LinearTransfer = "linear",
  SRGBTransfer = "srgb",
  NoNormalPacking = "",
  NormalRGPacking = "rg",
  NormalGAPacking = "ga",
  ZeroStencilOp = 0,
  KeepStencilOp = 7680,
  ReplaceStencilOp = 7681,
  IncrementStencilOp = 7682,
  DecrementStencilOp = 7683,
  IncrementWrapStencilOp = 34055,
  DecrementWrapStencilOp = 34056,
  InvertStencilOp = 5386,
  NeverStencilFunc = 512,
  LessStencilFunc = 513,
  EqualStencilFunc = 514,
  LessEqualStencilFunc = 515,
  GreaterStencilFunc = 516,
  NotEqualStencilFunc = 517,
  GreaterEqualStencilFunc = 518,
  AlwaysStencilFunc = 519,
  NeverCompare = 512,
  LessCompare = 513,
  EqualCompare = 514,
  LessEqualCompare = 515,
  GreaterCompare = 516,
  NotEqualCompare = 517,
  GreaterEqualCompare = 518,
  AlwaysCompare = 519,
  StaticDrawUsage = 35044,
  DynamicDrawUsage = 35048,
  StreamDrawUsage = 35040,
  StaticReadUsage = 35045,
  DynamicReadUsage = 35049,
  StreamReadUsage = 35041,
  StaticCopyUsage = 35046,
  DynamicCopyUsage = 35050,
  StreamCopyUsage = 35042,
  GLSL1 = "100",
  GLSL3 = "300 es",
  WebGLCoordinateSystem = 2e3,
  WebGPUCoordinateSystem = 2001,
  TimestampQuery = {
    COMPUTE: "compute",
    RENDER: "render"
  },
  InterpolationSamplingType = {
    PERSPECTIVE: "perspective",
    LINEAR: "linear",
    FLAT: "flat"
  },
  InterpolationSamplingMode = {
    NORMAL: "normal",
    CENTROID: "centroid",
    SAMPLE: "sample",
    FIRST: "first",
    EITHER: "either"
  },
  Compatibility = {
    TEXTURE_COMPARE: "depthTextureCompare"
  };
const er = {
  Int8Array: Int8Array,
  Uint8Array: Uint8Array,
  Uint8ClampedArray: Uint8ClampedArray,
  Int16Array: Int16Array,
  Uint16Array: Uint16Array,
  Int32Array: Int32Array,
  Uint32Array: Uint32Array,
  Float32Array: Float32Array,
  Float64Array: Float64Array
};
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：getTypedArray。 */
function getTypedArray(type, buffer) {
  return new er[type](buffer);
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：isTypedArray。 */
function isTypedArray(array) {
  return ArrayBuffer.isView(array) && !(array instanceof DataView);
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：createElementNS。 */
function createElementNS(name) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", name);
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：createCanvasElement。 */
function createCanvasElement() {
  const canvas = createElementNS("canvas");
  return canvas.style.display = "block", canvas;
}
const ar = {};
let sr = null;
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：setConsoleFunction。 */
function setConsoleFunction(fn) {
  sr = fn;
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：getConsoleFunction。 */
function getConsoleFunction() {
  return sr;
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：log。 */
function log(...params) {
  const message = "THREE." + params.shift();
  sr ? sr("log", message, ...params) : console.log(message, ...params);
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：enhanceLogMessage。 */
function enhanceLogMessage(params) {
  const message = params[0];
  if ("string" == typeof message && message.startsWith("TSL:")) {
    const stackTrace = params[1];
    stackTrace && stackTrace.isStackTrace ? params[0] += " " + stackTrace.getLocation() : params[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
  }
  return params;
}
/* 人工身份合同：console.warn 分支及增强日志调用。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function warn(...e) {
  const t = "THREE." + (e = enhanceLogMessage(e)).shift();
  if (sr) sr("warn", t, ...e);else {
    const n = e[0];
    n && n.isStackTrace ? console.warn(n.getError(t)) : console.warn(t, ...e);
  }
}
/* 人工身份合同：console.error 分支及增强日志调用。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function error(...e) {
  const t = "THREE." + (e = enhanceLogMessage(e)).shift();
  if (sr) sr("error", t, ...e);else {
    const n = e[0];
    n && n.isStackTrace ? console.error(n.getError(t)) : console.error(t, ...e);
  }
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：warnOnce。 */
function warnOnce(...params) {
  const message = params.join(" ");
  message in ar || (ar[message] = !0, warn(...params));
}
/* 人工身份合同：scheduler.yield 与延迟调度回退。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function yieldToMain() {
  return "undefined" != typeof self && void 0 !== self.scheduler && void 0 !== self.scheduler.yield ? self.scheduler.yield() : new Promise(e => {
    requestAnimationFrame(e);
  });
}
/* 人工身份合同：WebGL clientWaitSync 的轮询与 WAIT_FAILED/CONDITION_SATISFIED 分支。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function probeAsync(e, t, n) {
  return new Promise(function (r, i) {
    setTimeout(function a() {
      switch (e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case e.WAIT_FAILED:
          i();
          break;
        case e.TIMEOUT_EXPIRED:
          setTimeout(a, n);
          break;
        default:
          r();
      }
    }, n);
  });
}
const ReversedDepthFuncs = {
  [NeverDepth]: AlwaysDepth,
  [LessDepth]: GreaterDepth,
  [EqualDepth]: NotEqualDepth,
  [LessEqualDepth]: GreaterEqualDepth,
  [AlwaysDepth]: NeverDepth,
  [GreaterDepth]: LessDepth,
  [NotEqualDepth]: EqualDepth,
  [GreaterEqualDepth]: LessEqualDepth
};
class EventDispatcher {
  addEventListener(type, listener) {
    void 0 === this._listeners && (this._listeners = {});
    const listeners = this._listeners;
    void 0 === listeners[type] && (listeners[type] = []), -1 === listeners[type].indexOf(listener) && listeners[type].push(listener);
  }
  hasEventListener(type, listener) {
    const listeners = this._listeners;
    return void 0 !== listeners && void 0 !== listeners[type] && -1 !== listeners[type].indexOf(listener);
  }
  removeEventListener(type, listener) {
    const listeners = this._listeners;
    if (void 0 === listeners) return;
    const listenerArray = listeners[type];
    if (void 0 !== listenerArray) {
      const index = listenerArray.indexOf(listener);
      -1 !== index && listenerArray.splice(index, 1);
    }
  }
  dispatchEvent(event) {
    const listeners = this._listeners;
    if (void 0 === listeners) return;
    const listenerArray = listeners[event.type];
    if (void 0 !== listenerArray) {
      event.target = this;
      const array = listenerArray.slice(0);
      for (let i = 0, l = array.length; i < l; i++) array[i].call(this, event);
      event.target = null;
    }
  }
}
const _r = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
let Ar = 1234567;
const gr = Math.PI / 180,
  RAD2DEG = 180 / Math.PI;
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：generateUUID。通过原随机数与位掩码生成 UUID 字符串；不引入新的随机源或安全性保证。 */
function generateUUID() {
  const d0 = 4294967295 * Math.random() | 0,
    d1 = 4294967295 * Math.random() | 0,
    d2 = 4294967295 * Math.random() | 0,
    d3 = 4294967295 * Math.random() | 0;
  return (_r[255 & d0] + _r[d0 >> 8 & 255] + _r[d0 >> 16 & 255] + _r[d0 >> 24 & 255] + "-" + _r[255 & d1] + _r[d1 >> 8 & 255] + "-" + _r[d1 >> 16 & 15 | 64] + _r[d1 >> 24 & 255] + "-" + _r[63 & d2 | 128] + _r[d2 >> 8 & 255] + "-" + _r[d2 >> 16 & 255] + _r[d2 >> 24 & 255] + _r[255 & d3] + _r[d3 >> 8 & 255] + _r[d3 >> 16 & 255] + _r[d3 >> 24 & 255]).toLowerCase();
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：clamp。将数值限制到闭区间，边界按原 Math.min/Math.max 顺序计算。 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：euclideanModulo。以两次取模处理负被除数，保持原表达式的 JavaScript 数值语义。 */
function euclideanModulo(n, m) {
  return (n % m + m) % m;
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：lerp。按权重计算两个端点的线性插值，保留原乘加顺序。 */
function lerp(x, y, t) {
  return (1 - t) * x + t * y;
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：denormalize。根据整型数组构造器，把存储整数转换到对应归一化范围。 */
function denormalize(value, array) {
  switch (array.constructor) {
    case Float32Array:
      return value;
    case Uint32Array:
      return value / 4294967295;
    case Uint16Array:
      return value / 65535;
    case Uint8Array:
      return value / 255;
    case Int32Array:
      return Math.max(value / 2147483647, -1);
    case Int16Array:
      return Math.max(value / 32767, -1);
    case Int8Array:
      return Math.max(value / 127, -1);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：normalize。根据整型数组构造器，将归一化值缩放并舍入为存储整数。 */
function normalize(value, array) {
  switch (array.constructor) {
    case Float32Array:
      return value;
    case Uint32Array:
      return Math.round(4294967295 * value);
    case Uint16Array:
      return Math.round(65535 * value);
    case Uint8Array:
      return Math.round(255 * value);
    case Int32Array:
      return Math.round(2147483647 * value);
    case Int16Array:
      return Math.round(32767 * value);
    case Int8Array:
      return Math.round(127 * value);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
const MathUtils = {
  DEG2RAD: gr,
  RAD2DEG: RAD2DEG,
  generateUUID: generateUUID,
  clamp: clamp,
  euclideanModulo: euclideanModulo,
  mapLinear: function (x, a1, a2, b1, b2) {
    return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
  },
  inverseLerp: function (x, y, value) {
    return x !== y ? (value - x) / (y - x) : 0;
  },
  lerp: lerp,
  damp: function (x, y, lambda, dt) {
    return lerp(x, y, 1 - Math.exp(-lambda * dt));
  },
  pingpong: function (x, length = 1) {
    return length - Math.abs(euclideanModulo(x, 2 * length) - length);
  },
  smoothstep: function (e, t, n) {
    return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t)) * e * (3 - 2 * e);
  },
  smootherstep: function (e, t, n) {
    return e <= t ? 0 : e >= n ? 1 : (e = (e - t) / (n - t)) * e * e * (e * (6 * e - 15) + 10);
  },
  randInt: function (low, high) {
    return low + Math.floor(Math.random() * (high - low + 1));
  },
  randFloat: function (low, high) {
    return low + Math.random() * (high - low);
  },
  randFloatSpread: function (range) {
    return range * (.5 - Math.random());
  },
  seededRandom: function (s) {
    void 0 !== s && (Ar = s);
    let t = Ar += 1831565813;
    return t = Math.imul(t ^ t >>> 15, 1 | t), t ^= t + Math.imul(t ^ t >>> 7, 61 | t), ((t ^ t >>> 14) >>> 0) / 4294967296;
  },
  degToRad: function (degrees) {
    return degrees * gr;
  },
  radToDeg: function (radians) {
    return radians * RAD2DEG;
  },
  isPowerOfTwo: function (e) {
    return !(e & e - 1) && 0 !== e;
  },
  ceilPowerOfTwo: function (value) {
    return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
  },
  floorPowerOfTwo: function (value) {
    return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
  },
  setQuaternionFromProperEuler: function (q, a, b, c, order) {
    const cos = Math.cos,
      sin = Math.sin,
      c2 = cos(b / 2),
      s2 = sin(b / 2),
      c13 = cos((a + c) / 2),
      s13 = sin((a + c) / 2),
      c1_3 = cos((a - c) / 2),
      s1_3 = sin((a - c) / 2),
      c3_1 = cos((c - a) / 2),
      s3_1 = sin((c - a) / 2);
    switch (order) {
      case "XYX":
        q.set(c2 * s13, s2 * c1_3, s2 * s1_3, c2 * c13);
        break;
      case "YZY":
        q.set(s2 * s1_3, c2 * s13, s2 * c1_3, c2 * c13);
        break;
      case "ZXZ":
        q.set(s2 * c1_3, s2 * s1_3, c2 * s13, c2 * c13);
        break;
      case "XZX":
        q.set(c2 * s13, s2 * s3_1, s2 * c3_1, c2 * c13);
        break;
      case "YXY":
        q.set(s2 * c3_1, c2 * s13, s2 * s3_1, c2 * c13);
        break;
      case "ZYZ":
        q.set(s2 * s3_1, s2 * c3_1, c2 * s13, c2 * c13);
        break;
      default:
        warn("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + order);
    }
  },
  normalize: normalize,
  denormalize: denormalize
};
/**
 * Class representing a 2D vector. A 2D vector is an ordered pair of numbers
 * (labeled x and y), which can be used to represent a number of things, such as:
 *
 * - A point in 2D space (i.e. a position on a plane).
 * - A direction and length across a plane. In three.js the length will
 * always be the Euclidean distance(straight-line distance) from `(0, 0)` to `(x, y)`
 * and the direction is also measured from `(0, 0)` towards `(x, y)`.
 * - Any arbitrary ordered pair of numbers.
 *
 * There are other things a 2D vector can be used to represent, such as
 * momentum vectors, complex numbers and so on, however these are the most
 * common uses in three.js.
 *
 * Iterating through a vector instance will yield its components `(x, y)` in
 * the corresponding order.
 * ```js
 * const a = new THREE.Vector2( 0, 1 );
 *
 * //no arguments; will be initialised to (0, 0)
 * const b = new THREE.Vector2( );
 *
 * const d = a.distanceTo( b );
 * ```
 */
class Vector2 {
  static {
    Vector2.prototype.isVector2 = !0;
  }
  /**
   * Constructs a new 2D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   */
  constructor(x = 0, y = 0) {
    this.x = x, this.y = y;
  }
  get width() {
    return this.x;
  }
  set width(value) {
    this.x = value;
  }
  get height() {
    return this.y;
  }
  set height(value) {
    this.y = value;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @return {Vector2} A reference to this vector.
   */
  set(x, y) {
    return this.x = x, this.y = y, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector2} A reference to this vector.
   */
  setScalar(scalar) {
    return this.x = scalar, this.y = scalar, this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setX(x) {
    return this.x = x, this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setY(y) {
    return this.y = y, this;
  }
  setComponent(index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + index);
    }
    return this;
  }
  getComponent(index) {
    switch (index) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + index);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector2} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector2} v - The vector to copy.
   * @return {Vector2} A reference to this vector.
   */
  copy(v) {
    return this.x = v.x, this.y = v.y, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector2} v - The vector to add.
   * @return {Vector2} A reference to this vector.
   */
  add(v) {
    return this.x += v.x, this.y += v.y, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector2} A reference to this vector.
   */
  addScalar(s) {
    return this.x += s, this.y += s, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  addVectors(a, b) {
    return this.x = a.x + b.x, this.y = a.y + b.y, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector2} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector2} A reference to this vector.
   */
  addScaledVector(v, s) {
    return this.x += v.x * s, this.y += v.y * s, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector2} v - The vector to subtract.
   * @return {Vector2} A reference to this vector.
   */
  sub(v) {
    return this.x -= v.x, this.y -= v.y, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector2} A reference to this vector.
   */
  subScalar(s) {
    return this.x -= s, this.y -= s, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  subVectors(a, b) {
    return this.x = a.x - b.x, this.y = a.y - b.y, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector2} v - The vector to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiply(v) {
    return this.x *= v.x, this.y *= v.y, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiplyScalar(scalar) {
    return this.x *= scalar, this.y *= scalar, this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector2} v - The vector to divide.
   * @return {Vector2} A reference to this vector.
   */
  divide(v) {
    return this.x /= v.x, this.y /= v.y, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector2} A reference to this vector.
   */
  divideScalar(scalar) {
    return this.multiplyScalar(1 / scalar);
  }
  /**
   * Multiplies this vector (with an implicit 1 as the 3rd component) by
   * the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {Vector2} A reference to this vector.
   */
  applyMatrix3(m) {
    const x = this.x,
      y = this.y,
      e = m.elements;
    return this.x = e[0] * x + e[3] * y + e[6], this.y = e[1] * x + e[4] * y + e[7], this;
  }
  /**
   * If this vector's x or y value is greater than the given vector's x or y
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  min(v) {
    return this.x = Math.min(this.x, v.x), this.y = Math.min(this.y, v.y), this;
  }
  /**
   * If this vector's x or y value is less than the given vector's x or y
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  max(v) {
    return this.x = Math.max(this.x, v.x), this.y = Math.max(this.y, v.y), this;
  }
  /**
   * If this vector's x or y value is greater than the max vector's x or y
   * value, it is replaced by the corresponding value.
   * If this vector's x or y value is less than the min vector's x or y value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector2} min - The minimum x and y values.
   * @param {Vector2} max - The maximum x and y values in the desired range.
   * @return {Vector2} A reference to this vector.
   */
  clamp(min, max) {
    return this.x = clamp(this.x, min.x, max.x), this.y = clamp(this.y, min.y, max.y), this;
  }
  /**
   * If this vector's x or y values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x or y values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampScalar(minVal, maxVal) {
    return this.x = clamp(this.x, minVal, maxVal), this.y = clamp(this.y, minVal, maxVal), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampLength(min, max) {
    const length = this.length();
    return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector2} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x and y = -y.
   *
   * @return {Vector2} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the cross product with.
   * @return {number} The result of the cross product.
   */
  cross(v) {
    return this.x * v.y - this.y * v.x;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0) to (x, y). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0) to (x, y).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(v) {
    const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
    if (0 === denominator) return Math.PI / 2;
    const theta = this.dot(v) / denominator;
    return Math.acos(clamp(theta, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector2} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(v) {
    const dx = this.x - v.x,
      dy = this.y - v.y;
    return dx * dx + dy * dy;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(v) {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector2} A reference to this vector.
   */
  setLength(length) {
    return this.normalize().multiplyScalar(length);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector2} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerp(v, alpha) {
    return this.x += (v.x - this.x) * alpha, this.y += (v.y - this.y) * alpha, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector2} v1 - The first vector.
   * @param {Vector2} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerpVectors(v1, v2, alpha) {
    return this.x = v1.x + (v2.x - v1.x) * alpha, this.y = v1.y + (v2.y - v1.y) * alpha, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector2} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(v) {
    return v.x === this.x && v.y === this.y;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]` and y
   * value to be `array[ offset + 1 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector2} A reference to this vector.
   */
  fromArray(array, offset = 0) {
    return this.x = array[offset], this.y = array[offset + 1], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(array = [], offset = 0) {
    return array[offset] = this.x, array[offset + 1] = this.y, array;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector2} A reference to this vector.
   */
  fromBufferAttribute(attribute, index) {
    return this.x = attribute.getX(index), this.y = attribute.getY(index), this;
  }
  /**
   * Rotates this vector around the given center by the given angle.
   *
   * @param {Vector2} center - The point around which to rotate.
   * @param {number} angle - The angle to rotate, in radians.
   * @return {Vector2} A reference to this vector.
   */
  rotateAround(center, angle) {
    const c = Math.cos(angle),
      s = Math.sin(angle),
      x = this.x - center.x,
      y = this.y - center.y;
    return this.x = x * c - y * s + center.x, this.y = x * s + y * c + center.y, this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
/**
 * Class for representing a Quaternion. Quaternions are used in three.js to represent rotations.
 *
 * Iterating through a vector instance will yield its components `(x, y, z, w)` in
 * the corresponding order.
 *
 * Note that three.js expects Quaternions to be normalized.
 * ```js
 * const quaternion = new THREE.Quaternion();
 * quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );
 *
 * const vector = new THREE.Vector3( 1, 0, 0 );
 * vector.applyQuaternion( quaternion );
 * ```
 */
class Quaternion {
  /**
   * Constructs a new quaternion.
   *
   * @param {number} [x=0] - The x value of this quaternion.
   * @param {number} [y=0] - The y value of this quaternion.
   * @param {number} [z=0] - The z value of this quaternion.
   * @param {number} [w=1] - The w value of this quaternion.
   */
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.isQuaternion = !0, this._x = x, this._y = y, this._z = z, this._w = w;
  }
  /* 输入两个平铺数组中的四元数、各自偏移、目标数组偏移和插值量。先读取全部分量，所以支持源与目标重叠；点积为负就翻转第二四元数，选择短弧。官方把第二权重赋值独立为语句，本地嵌入第一次分量计算，不能据此猜局部原名。 */
  static slerpFlat(e, t, n, r, i, a, s) {
    let o = n[r + 0],
      c = n[r + 1],
      l = n[r + 2],
      u = n[r + 3],
      d = i[a + 0],
      h = i[a + 1],
      p = i[a + 2],
      f = i[a + 3];
    if (u !== f || o !== d || c !== h || l !== p) {
      let e = o * d + c * h + l * p + u * f;
      e < 0 && (d = -d, h = -h, p = -p, f = -f, e = -e);
      let t = 1 - s;
      if (e < .9995) {
        const n = Math.acos(e),
          r = Math.sin(n);
        t = Math.sin(t * n) / r, o = o * t + d * (s = Math.sin(s * n) / r), c = c * t + h * s, l = l * t + p * s, u = u * t + f * s;
      } else {
        o = o * t + d * s, c = c * t + h * s, l = l * t + p * s, u = u * t + f * s;
        const e = 1 / Math.sqrt(o * o + c * c + l * l + u * u);
        o *= e, c *= e, l *= e, u *= e;
      }
    }
    e[t] = o, e[t + 1] = c, e[t + 2] = l, e[t + 3] = u;
  }
  /**
   * Multiplies two quaternions. This implementation assumes the quaternion data are managed
   * in flat arrays.
   *
   * @param {Array<number>} dst - The destination array.
   * @param {number} dstOffset - An offset into the destination array.
   * @param {Array<number>} src0 - The source array of the first quaternion.
   * @param {number} srcOffset0 - An offset into the first source array.
   * @param {Array<number>} src1 -  The source array of the second quaternion.
   * @param {number} srcOffset1 - An offset into the second source array.
   * @return {Array<number>} The destination array.
   * @see {@link Quaternion#multiplyQuaternions}.
   */
  static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {
    const x0 = src0[srcOffset0],
      y0 = src0[srcOffset0 + 1],
      z0 = src0[srcOffset0 + 2],
      w0 = src0[srcOffset0 + 3],
      x1 = src1[srcOffset1],
      y1 = src1[srcOffset1 + 1],
      z1 = src1[srcOffset1 + 2],
      w1 = src1[srcOffset1 + 3];
    return dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1, dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1, dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1, dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1, dst;
  }
  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(value) {
    this._z = value, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(value) {
    this._w = value, this._onChangeCallback();
  }
  /**
   * Sets the quaternion components.
   *
   * @param {number} x - The x value of this quaternion.
   * @param {number} y - The y value of this quaternion.
   * @param {number} z - The z value of this quaternion.
   * @param {number} w - The w value of this quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  set(x, y, z, w) {
    return this._x = x, this._y = y, this._z = z, this._w = w, this._onChangeCallback(), this;
  }
  /**
   * Returns a new quaternion with copied values from this instance.
   *
   * @return {Quaternion} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  /**
   * Copies the values of the given quaternion to this instance.
   *
   * @param {Quaternion} quaternion - The quaternion to copy.
   * @return {Quaternion} A reference to this quaternion.
   */
  copy(quaternion) {
    return this._x = quaternion.x, this._y = quaternion.y, this._z = quaternion.z, this._w = quaternion.w, this._onChangeCallback(), this;
  }
  setFromEuler(euler, update = !0) {
    const x = euler._x,
      y = euler._y,
      z = euler._z,
      order = euler._order,
      cos = Math.cos,
      sin = Math.sin,
      c1 = cos(x / 2),
      c2 = cos(y / 2),
      c3 = cos(z / 2),
      s1 = sin(x / 2),
      s2 = sin(y / 2),
      s3 = sin(z / 2);
    switch (order) {
      case "XYZ":
        this._x = s1 * c2 * c3 + c1 * s2 * s3, this._y = c1 * s2 * c3 - s1 * c2 * s3, this._z = c1 * c2 * s3 + s1 * s2 * c3, this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;
      case "YXZ":
        this._x = s1 * c2 * c3 + c1 * s2 * s3, this._y = c1 * s2 * c3 - s1 * c2 * s3, this._z = c1 * c2 * s3 - s1 * s2 * c3, this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;
      case "ZXY":
        this._x = s1 * c2 * c3 - c1 * s2 * s3, this._y = c1 * s2 * c3 + s1 * c2 * s3, this._z = c1 * c2 * s3 + s1 * s2 * c3, this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;
      case "ZYX":
        this._x = s1 * c2 * c3 - c1 * s2 * s3, this._y = c1 * s2 * c3 + s1 * c2 * s3, this._z = c1 * c2 * s3 - s1 * s2 * c3, this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;
      case "YZX":
        this._x = s1 * c2 * c3 + c1 * s2 * s3, this._y = c1 * s2 * c3 + s1 * c2 * s3, this._z = c1 * c2 * s3 - s1 * s2 * c3, this._w = c1 * c2 * c3 - s1 * s2 * s3;
        break;
      case "XZY":
        this._x = s1 * c2 * c3 - c1 * s2 * s3, this._y = c1 * s2 * c3 - s1 * c2 * s3, this._z = c1 * c2 * s3 + s1 * s2 * c3, this._w = c1 * c2 * c3 + s1 * s2 * s3;
        break;
      default:
        warn("Quaternion: .setFromEuler() encountered an unknown order: " + order);
    }
    return !0 === update && this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the given axis and angle.
   *
   * @param {Vector3} axis - The normalized axis.
   * @param {number} angle - The angle in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromAxisAngle(axis, angle) {
    const halfAngle = angle / 2,
      s = Math.sin(halfAngle);
    return this._x = axis.x * s, this._y = axis.y * s, this._z = axis.z * s, this._w = Math.cos(halfAngle), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(m) {
    const te = m.elements,
      m11 = te[0],
      m12 = te[4],
      m13 = te[8],
      m21 = te[1],
      m22 = te[5],
      m23 = te[9],
      m31 = te[2],
      m32 = te[6],
      m33 = te[10],
      trace = m11 + m22 + m33;
    if (trace > 0) {
      const s = .5 / Math.sqrt(trace + 1);
      this._w = .25 / s, this._x = (m32 - m23) * s, this._y = (m13 - m31) * s, this._z = (m21 - m12) * s;
    } else if (m11 > m22 && m11 > m33) {
      const s = 2 * Math.sqrt(1 + m11 - m22 - m33);
      this._w = (m32 - m23) / s, this._x = .25 * s, this._y = (m12 + m21) / s, this._z = (m13 + m31) / s;
    } else if (m22 > m33) {
      const s = 2 * Math.sqrt(1 + m22 - m11 - m33);
      this._w = (m13 - m31) / s, this._x = (m12 + m21) / s, this._y = .25 * s, this._z = (m23 + m32) / s;
    } else {
      const s = 2 * Math.sqrt(1 + m33 - m11 - m22);
      this._w = (m21 - m12) / s, this._x = (m13 + m31) / s, this._y = (m23 + m32) / s, this._z = .25 * s;
    }
    return this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion to the rotation required to rotate the direction vector
   * `vFrom` to the direction vector `vTo`.
   *
   * @param {Vector3} vFrom - The first (normalized) direction vector.
   * @param {Vector3} vTo - The second (normalized) direction vector.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromUnitVectors(vFrom, vTo) {
    let r = vFrom.dot(vTo) + 1;
    return r < 1e-8 ? (r = 0, Math.abs(vFrom.x) > Math.abs(vFrom.z) ? (this._x = -vFrom.y, this._y = vFrom.x, this._z = 0, this._w = r) : (this._x = 0, this._y = -vFrom.z, this._z = vFrom.y, this._w = r)) : (this._x = vFrom.y * vTo.z - vFrom.z * vTo.y, this._y = vFrom.z * vTo.x - vFrom.x * vTo.z, this._z = vFrom.x * vTo.y - vFrom.y * vTo.x, this._w = r), this.normalize();
  }
  /**
   * Returns the angle between this quaternion and the given one in radians.
   *
   * @param {Quaternion} q - The quaternion to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(q) {
    return 2 * Math.acos(Math.abs(clamp(this.dot(q), -1, 1)));
  }
  rotateTowards(q, step) {
    const angle = this.angleTo(q);
    if (0 === angle) return this;
    const t = Math.min(1, step / angle);
    return this.slerp(q, t), this;
  }
  /**
   * Sets this quaternion to the identity quaternion; that is, to the
   * quaternion that represents "no rotation".
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  identity() {
    return this.set(0, 0, 0, 1);
  }
  /**
   * Inverts this quaternion via {@link Quaternion#conjugate}. The
   * quaternion is assumed to have unit length.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  invert() {
    return this.conjugate();
  }
  /**
   * Returns the rotational conjugate of this quaternion. The conjugate of a
   * quaternion represents the same rotation in the opposite direction about
   * the rotational axis.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  /**
   * Calculates the dot product of this quaternion and the given one.
   *
   * @param {Quaternion} v - The quaternion to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(v) {
    return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
  }
  /**
   * Computes the squared Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector. This can be useful if you are comparing the
   * lengths of two quaternions, as this is a slightly more efficient calculation than
   * {@link Quaternion#length}.
   *
   * @return {number} The squared Euclidean length.
   */
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  /**
   * Computes the Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector.
   *
   * @return {number} The Euclidean length.
   */
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let l = this.length();
    return 0 === l ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (l = 1 / l, this._x = this._x * l, this._y = this._y * l, this._z = this._z * l, this._w = this._w * l), this._onChangeCallback(), this;
  }
  /**
   * Multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiply(q) {
    return this.multiplyQuaternions(this, q);
  }
  /**
   * Pre-multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  premultiply(q) {
    return this.multiplyQuaternions(q, this);
  }
  /**
   * Multiplies the given quaternions and stores the result in this instance.
   *
   * @param {Quaternion} a - The first quaternion.
   * @param {Quaternion} b - The second quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiplyQuaternions(a, b) {
    const qax = a._x,
      qay = a._y,
      qaz = a._z,
      qaw = a._w,
      qbx = b._x,
      qby = b._y,
      qbz = b._z,
      qbw = b._w;
    return this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby, this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz, this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx, this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz, this._onChangeCallback(), this;
  }
  slerp(qb, t) {
    let x = qb._x,
      y = qb._y,
      z = qb._z,
      w = qb._w,
      dot = this.dot(qb);
    dot < 0 && (x = -x, y = -y, z = -z, w = -w, dot = -dot);
    let s = 1 - t;
    if (dot < .9995) {
      const theta = Math.acos(dot),
        sin = Math.sin(theta);
      s = Math.sin(s * theta) / sin, t = Math.sin(t * theta) / sin, this._x = this._x * s + x * t, this._y = this._y * s + y * t, this._z = this._z * s + z * t, this._w = this._w * s + w * t, this._onChangeCallback();
    } else this._x = this._x * s + x * t, this._y = this._y * s + y * t, this._z = this._z * s + z * t, this._w = this._w * s + w * t, this.normalize();
    return this;
  }
  /**
   * Performs a spherical linear interpolation between the given quaternions
   * and stores the result in this quaternion.
   *
   * @param {Quaternion} qa - The source quaternion.
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerpQuaternions(qa, qb, t) {
    return this.copy(qa).slerp(qb, t);
  }
  /**
   * Sets this quaternion to a uniformly random, normalized quaternion.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  random() {
    const theta1 = 2 * Math.PI * Math.random(),
      theta2 = 2 * Math.PI * Math.random(),
      x0 = Math.random(),
      r1 = Math.sqrt(1 - x0),
      r2 = Math.sqrt(x0);
    return this.set(r1 * Math.sin(theta1), r1 * Math.cos(theta1), r2 * Math.sin(theta2), r2 * Math.cos(theta2));
  }
  /**
   * Returns `true` if this quaternion is equal with the given one.
   *
   * @param {Quaternion} quaternion - The quaternion to test for equality.
   * @return {boolean} Whether this quaternion is equal with the given one.
   */
  equals(quaternion) {
    return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
  }
  /**
   * Sets this quaternion's components from the given array.
   *
   * @param {Array<number>} array - An array holding the quaternion component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromArray(array, offset = 0) {
    return this._x = array[offset], this._y = array[offset + 1], this._z = array[offset + 2], this._w = array[offset + 3], this._onChangeCallback(), this;
  }
  /**
   * Writes the components of this quaternion to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the quaternion components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The quaternion components.
   */
  toArray(array = [], offset = 0) {
    return array[offset] = this._x, array[offset + 1] = this._y, array[offset + 2] = this._z, array[offset + 3] = this._w, array;
  }
  /**
   * Sets the components of this quaternion from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding quaternion data.
   * @param {number} index - The index into the attribute.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromBufferAttribute(attribute, index) {
    return this._x = attribute.getX(index), this._y = attribute.getY(index), this._z = attribute.getZ(index), this._w = attribute.getW(index), this._onChangeCallback(), this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the
   * numerical elements of this quaternion in an array of format `[x, y, z, w]`.
   *
   * @return {Array<number>} The serialized quaternion.
   */
  toJSON() {
    return this.toArray();
  }
  _onChange(callback) {
    return this._onChangeCallback = callback, this;
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
/**
 * Class representing a 3D vector. A 3D vector is an ordered triplet of numbers
 * (labeled x, y and z), which can be used to represent a number of things, such as:
 *
 * - A point in 3D space.
 * - A direction and length in 3D space. In three.js the length will
 * always be the Euclidean distance(straight-line distance) from `(0, 0, 0)` to `(x, y, z)`
 * and the direction is also measured from `(0, 0, 0)` towards `(x, y, z)`.
 * - Any arbitrary ordered triplet of numbers.
 *
 * There are other things a 3D vector can be used to represent, such as
 * momentum vectors and so on, however these are the most
 * common uses in three.js.
 *
 * Iterating through a vector instance will yield its components `(x, y, z)` in
 * the corresponding order.
 * ```js
 * const a = new THREE.Vector3( 0, 1, 0 );
 *
 * //no arguments; will be initialised to (0, 0, 0)
 * const b = new THREE.Vector3( );
 *
 * const d = a.distanceTo( b );
 * ```
 */
class Vector3 {
  static {
    Vector3.prototype.isVector3 = !0;
  }
  /**
   * Constructs a new 3D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   */
  constructor(x = 0, y = 0, z = 0) {
    this.x = x, this.y = y, this.z = z;
  }
  set(x, y, z) {
    return void 0 === z && (z = this.z), this.x = x, this.y = y, this.z = z, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector3} A reference to this vector.
   */
  setScalar(scalar) {
    return this.x = scalar, this.y = scalar, this.z = scalar, this;
  }
  /**
   * Sets the vector's x component to the given value.
   *
   * @param {number} x - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setX(x) {
    return this.x = x, this;
  }
  /**
   * Sets the vector's y component to the given value.
   *
   * @param {number} y - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setY(y) {
    return this.y = y, this;
  }
  /**
   * Sets the vector's z component to the given value.
   *
   * @param {number} z - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setZ(z) {
    return this.z = z, this;
  }
  setComponent(index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      case 2:
        this.z = value;
        break;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + index);
    }
    return this;
  }
  getComponent(index) {
    switch (index) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + index);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector3} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector3} v - The vector to copy.
   * @return {Vector3} A reference to this vector.
   */
  copy(v) {
    return this.x = v.x, this.y = v.y, this.z = v.z, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector3} v - The vector to add.
   * @return {Vector3} A reference to this vector.
   */
  add(v) {
    return this.x += v.x, this.y += v.y, this.z += v.z, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector3} A reference to this vector.
   */
  addScalar(s) {
    return this.x += s, this.y += s, this.z += s, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  addVectors(a, b) {
    return this.x = a.x + b.x, this.y = a.y + b.y, this.z = a.z + b.z, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector3|Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector3} A reference to this vector.
   */
  addScaledVector(v, s) {
    return this.x += v.x * s, this.y += v.y * s, this.z += v.z * s, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector3} v - The vector to subtract.
   * @return {Vector3} A reference to this vector.
   */
  sub(v) {
    return this.x -= v.x, this.y -= v.y, this.z -= v.z, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector3} A reference to this vector.
   */
  subScalar(s) {
    return this.x -= s, this.y -= s, this.z -= s, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  subVectors(a, b) {
    return this.x = a.x - b.x, this.y = a.y - b.y, this.z = a.z - b.z, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector3} v - The vector to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiply(v) {
    return this.x *= v.x, this.y *= v.y, this.z *= v.z, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiplyScalar(scalar) {
    return this.x *= scalar, this.y *= scalar, this.z *= scalar, this;
  }
  /**
   * Multiplies the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  multiplyVectors(a, b) {
    return this.x = a.x * b.x, this.y = a.y * b.y, this.z = a.z * b.z, this;
  }
  /**
   * Applies the given Euler rotation to this vector.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Vector3} A reference to this vector.
   */
  applyEuler(euler) {
    return this.applyQuaternion(_quaternion$5.setFromEuler(euler));
  }
  /**
   * Applies a rotation specified by an axis and an angle to this vector.
   *
   * @param {Vector3} axis - A normalized vector representing the rotation axis.
   * @param {number} angle - The angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  applyAxisAngle(axis, angle) {
    return this.applyQuaternion(_quaternion$5.setFromAxisAngle(axis, angle));
  }
  /**
   * Multiplies this vector with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix3(m) {
    const x = this.x,
      y = this.y,
      z = this.z,
      e = m.elements;
    return this.x = e[0] * x + e[3] * y + e[6] * z, this.y = e[1] * x + e[4] * y + e[7] * z, this.z = e[2] * x + e[5] * y + e[8] * z, this;
  }
  /**
   * Multiplies this vector by the given normal matrix and normalizes
   * the result.
   *
   * @param {Matrix3} m - The normal matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyNormalMatrix(m) {
    return this.applyMatrix3(m).normalize();
  }
  /**
   * Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and
   * divides by perspective.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix4(m) {
    const x = this.x,
      y = this.y,
      z = this.z,
      e = m.elements,
      w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
    return this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w, this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w, this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w, this;
  }
  /**
   * Applies the given Quaternion to this vector.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Vector3} A reference to this vector.
   */
  applyQuaternion(q) {
    const vx = this.x,
      vy = this.y,
      vz = this.z,
      qx = q.x,
      qy = q.y,
      qz = q.z,
      qw = q.w,
      tx = 2 * (qy * vz - qz * vy),
      ty = 2 * (qz * vx - qx * vz),
      tz = 2 * (qx * vy - qy * vx);
    return this.x = vx + qw * tx + qy * tz - qz * ty, this.y = vy + qw * ty + qz * tx - qx * tz, this.z = vz + qw * tz + qx * ty - qy * tx, this;
  }
  /**
   * Projects this vector from world space into the camera's normalized
   * device coordinate (NDC) space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  project(camera) {
    return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
  }
  /**
   * Unprojects this vector from the camera's normalized device coordinate (NDC)
   * space into world space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  unproject(camera) {
    return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);
  }
  /**
   * Transforms the direction of this vector by a matrix (the upper left 3 x 3
   * subset of the given 4x4 matrix and then normalizes the result.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Vector3} A reference to this vector.
   */
  transformDirection(m) {
    const x = this.x,
      y = this.y,
      z = this.z,
      e = m.elements;
    return this.x = e[0] * x + e[4] * y + e[8] * z, this.y = e[1] * x + e[5] * y + e[9] * z, this.z = e[2] * x + e[6] * y + e[10] * z, this.normalize();
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector3} v - The vector to divide.
   * @return {Vector3} A reference to this vector.
   */
  divide(v) {
    return this.x /= v.x, this.y /= v.y, this.z /= v.z, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector3} A reference to this vector.
   */
  divideScalar(scalar) {
    return this.multiplyScalar(1 / scalar);
  }
  /**
   * If this vector's x, y or z value is greater than the given vector's x, y or z
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  min(v) {
    return this.x = Math.min(this.x, v.x), this.y = Math.min(this.y, v.y), this.z = Math.min(this.z, v.z), this;
  }
  /**
   * If this vector's x, y or z value is less than the given vector's x, y or z
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  max(v) {
    return this.x = Math.max(this.x, v.x), this.y = Math.max(this.y, v.y), this.z = Math.max(this.z, v.z), this;
  }
  /**
   * If this vector's x, y or z value is greater than the max vector's x, y or z
   * value, it is replaced by the corresponding value.
   * If this vector's x, y or z value is less than the min vector's x, y or z value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector3} min - The minimum x, y and z values.
   * @param {Vector3} max - The maximum x, y and z values in the desired range.
   * @return {Vector3} A reference to this vector.
   */
  clamp(min, max) {
    return this.x = clamp(this.x, min.x, max.x), this.y = clamp(this.y, min.y, max.y), this.z = clamp(this.z, min.z, max.z), this;
  }
  /**
   * If this vector's x, y or z values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y or z values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampScalar(minVal, maxVal) {
    return this.x = clamp(this.x, minVal, maxVal), this.y = clamp(this.y, minVal, maxVal), this.z = clamp(this.z, minVal, maxVal), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampLength(min, max) {
    const length = this.length();
    return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector3} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
   *
   * @return {Vector3} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector3} A reference to this vector.
   */
  setLength(length) {
    return this.normalize().multiplyScalar(length);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector3} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerp(v, alpha) {
    return this.x += (v.x - this.x) * alpha, this.y += (v.y - this.y) * alpha, this.z += (v.z - this.z) * alpha, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector3} v1 - The first vector.
   * @param {Vector3} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerpVectors(v1, v2, alpha) {
    return this.x = v1.x + (v2.x - v1.x) * alpha, this.y = v1.y + (v2.y - v1.y) * alpha, this.z = v1.z + (v2.z - v1.z) * alpha, this;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the cross product with.
   * @return {Vector3} The result of the cross product.
   */
  cross(v) {
    return this.crossVectors(this, v);
  }
  /**
   * Calculates the cross product of the given vectors and stores the result
   * in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  crossVectors(a, b) {
    const ax = a.x,
      ay = a.y,
      az = a.z,
      bx = b.x,
      by = b.y,
      bz = b.z;
    return this.x = ay * bz - az * by, this.y = az * bx - ax * bz, this.z = ax * by - ay * bx, this;
  }
  projectOnVector(v) {
    const denominator = v.lengthSq();
    if (0 === denominator) return this.set(0, 0, 0);
    const scalar = v.dot(this) / denominator;
    return this.copy(v).multiplyScalar(scalar);
  }
  /**
   * Projects this vector onto a plane by subtracting this
   * vector projected onto the plane's normal from this vector.
   *
   * @param {Vector3} planeNormal - The plane normal.
   * @return {Vector3} A reference to this vector.
   */
  projectOnPlane(planeNormal) {
    return _vector$c.copy(this).projectOnVector(planeNormal), this.sub(_vector$c);
  }
  /**
   * Reflects this vector off a plane orthogonal to the given normal vector.
   *
   * @param {Vector3} normal - The (normalized) normal vector.
   * @return {Vector3} A reference to this vector.
   */
  reflect(normal) {
    return this.sub(_vector$c.copy(normal).multiplyScalar(2 * this.dot(normal)));
  }
  angleTo(v) {
    const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
    if (0 === denominator) return Math.PI / 2;
    const theta = this.dot(v) / denominator;
    return Math.acos(clamp(theta, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector3} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(v) {
    const dx = this.x - v.x,
      dy = this.y - v.y,
      dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(v) {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {Spherical} s - The spherical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromSpherical(s) {
    return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} phi - The phi angle in radians.
   * @param {number} theta - The theta angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  setFromSphericalCoords(radius, phi, theta) {
    const sinPhiRadius = Math.sin(phi) * radius;
    return this.x = sinPhiRadius * Math.sin(theta), this.y = Math.cos(phi) * radius, this.z = sinPhiRadius * Math.cos(theta), this;
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {Cylindrical} c - The cylindrical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindrical(c) {
    return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} theta - The theta angle in radians.
   * @param {number} y - The y value.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindricalCoords(radius, theta, y) {
    return this.x = radius * Math.sin(theta), this.y = y, this.z = radius * Math.cos(theta), this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixPosition(m) {
    const e = m.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this;
  }
  /**
   * Sets the vector components to the scale elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixScale(m) {
    const sx = this.setFromMatrixColumn(m, 0).length(),
      sy = this.setFromMatrixColumn(m, 1).length(),
      sz = this.setFromMatrixColumn(m, 2).length();
    return this.x = sx, this.y = sy, this.z = sz, this;
  }
  setFromMatrixColumn(m, index) {
    return this.fromArray(m.elements, 4 * index);
  }
  setFromMatrix3Column(m, index) {
    return this.fromArray(m.elements, 3 * index);
  }
  /**
   * Sets the vector components from the given Euler angles.
   *
   * @param {Euler} e - The Euler angles to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  /**
   * Sets the vector components from the RGB components of the
   * given color.
   *
   * @param {Color} c - The color to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromColor(c) {
    return this.x = c.r, this.y = c.g, this.z = c.b, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector3} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(v) {
    return v.x === this.x && v.y === this.y && v.z === this.z;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`
   * and z value to be `array[ offset + 2 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector3} A reference to this vector.
   */
  fromArray(array, offset = 0) {
    return this.x = array[offset], this.y = array[offset + 1], this.z = array[offset + 2], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(array = [], offset = 0) {
    return array[offset] = this.x, array[offset + 1] = this.y, array[offset + 2] = this.z, array;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector3} A reference to this vector.
   */
  fromBufferAttribute(attribute, index) {
    return this.x = attribute.getX(index), this.y = attribute.getY(index), this.z = attribute.getZ(index), this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const theta = Math.random() * Math.PI * 2,
      u = 2 * Math.random() - 1,
      c = Math.sqrt(1 - u * u);
    return this.x = c * Math.cos(theta), this.y = u, this.z = c * Math.sin(theta), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const _vector$c = new Vector3(),
  _quaternion$5 = new Quaternion();
/**
 * Represents a 3x3 matrix.
 *
 * A Note on Row-Major and Column-Major Ordering:
 *
 * The constructor and {@link Matrix3#set} method take arguments in
 * [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order)
 * order, while internally they are stored in the {@link Matrix3#elements} array in column-major order.
 * This means that calling:
 * ```js
 * const m = new THREE.Matrix();
 * m.set( 11, 12, 13,
 *        21, 22, 23,
 *        31, 32, 33 );
 * ```
 * will result in the elements array containing:
 * ```js
 * m.elements = [ 11, 21, 31,
 *                12, 22, 32,
 *                13, 23, 33 ];
 * ```
 * and internally all calculations are performed using column-major ordering.
 * However, as the actual ordering makes no difference mathematically and
 * most people are used to thinking about matrices in row-major order, the
 * three.js documentation shows matrices in row-major order. Just bear in
 * mind that if you are reading the source code, you'll have to take the
 * transpose of any matrices outlined here to make sense of the calculations.
 */
class Matrix3 {
  static {
    Matrix3.prototype.isMatrix3 = !0;
  }
  constructor(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
    this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], void 0 !== n11 && this.set(n11, n12, n13, n21, n22, n23, n31, n32, n33);
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @return {Matrix3} A reference to this matrix.
   */
  set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
    const te = this.elements;
    return te[0] = n11, te[1] = n21, te[2] = n31, te[3] = n12, te[4] = n22, te[5] = n32, te[6] = n13, te[7] = n23, te[8] = n33, this;
  }
  /**
   * Sets this matrix to the 3x3 identity matrix.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  identity() {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix3} m - The matrix to copy.
   * @return {Matrix3} A reference to this matrix.
   */
  copy(m) {
    const te = this.elements,
      me = m.elements;
    return te[0] = me[0], te[1] = me[1], te[2] = me[2], te[3] = me[3], te[4] = me[4], te[5] = me[5], te[6] = me[6], te[7] = me[7], te[8] = me[8], this;
  }
  /**
   * Extracts the basis of this matrix into the three axis vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix3} A reference to this matrix.
   */
  extractBasis(xAxis, yAxis, zAxis) {
    return xAxis.setFromMatrix3Column(this, 0), yAxis.setFromMatrix3Column(this, 1), zAxis.setFromMatrix3Column(this, 2), this;
  }
  /**
   * Set this matrix to the upper 3x3 matrix of the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  setFromMatrix4(m) {
    const me = m.elements;
    return this.set(me[0], me[4], me[8], me[1], me[5], me[9], me[2], me[6], me[10]), this;
  }
  /**
   * Post-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  multiply(m) {
    return this.multiplyMatrices(this, m);
  }
  /**
   * Pre-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  premultiply(m) {
    return this.multiplyMatrices(m, this);
  }
  /**
   * Multiples the given 3x3 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix3} a - The first matrix.
   * @param {Matrix3} b - The second matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyMatrices(a, b) {
    const ae = a.elements,
      be = b.elements,
      te = this.elements,
      a11 = ae[0],
      a12 = ae[3],
      a13 = ae[6],
      a21 = ae[1],
      a22 = ae[4],
      a23 = ae[7],
      a31 = ae[2],
      a32 = ae[5],
      a33 = ae[8],
      b11 = be[0],
      b12 = be[3],
      b13 = be[6],
      b21 = be[1],
      b22 = be[4],
      b23 = be[7],
      b31 = be[2],
      b32 = be[5],
      b33 = be[8];
    return te[0] = a11 * b11 + a12 * b21 + a13 * b31, te[3] = a11 * b12 + a12 * b22 + a13 * b32, te[6] = a11 * b13 + a12 * b23 + a13 * b33, te[1] = a21 * b11 + a22 * b21 + a23 * b31, te[4] = a21 * b12 + a22 * b22 + a23 * b32, te[7] = a21 * b13 + a22 * b23 + a23 * b33, te[2] = a31 * b11 + a32 * b21 + a33 * b31, te[5] = a31 * b12 + a32 * b22 + a33 * b32, te[8] = a31 * b13 + a32 * b23 + a33 * b33, this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyScalar(s) {
    const te = this.elements;
    return te[0] *= s, te[3] *= s, te[6] *= s, te[1] *= s, te[4] *= s, te[7] *= s, te[2] *= s, te[5] *= s, te[8] *= s, this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * @return {number} The determinant.
   */
  determinant() {
    const te = this.elements,
      a = te[0],
      b = te[1],
      c = te[2],
      d = te[3],
      e = te[4],
      f = te[5],
      g = te[6],
      h = te[7],
      i = te[8];
    return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
  }
  invert() {
    const te = this.elements,
      n11 = te[0],
      n21 = te[1],
      n31 = te[2],
      n12 = te[3],
      n22 = te[4],
      n32 = te[5],
      n13 = te[6],
      n23 = te[7],
      n33 = te[8],
      t11 = n33 * n22 - n32 * n23,
      t12 = n32 * n13 - n33 * n12,
      t13 = n23 * n12 - n22 * n13,
      det = n11 * t11 + n21 * t12 + n31 * t13;
    if (0 === det) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const detInv = 1 / det;
    return te[0] = t11 * detInv, te[1] = (n31 * n23 - n33 * n21) * detInv, te[2] = (n32 * n21 - n31 * n22) * detInv, te[3] = t12 * detInv, te[4] = (n33 * n11 - n31 * n13) * detInv, te[5] = (n31 * n12 - n32 * n11) * detInv, te[6] = t13 * detInv, te[7] = (n21 * n13 - n23 * n11) * detInv, te[8] = (n22 * n11 - n21 * n12) * detInv, this;
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  transpose() {
    let tmp;
    const m = this.elements;
    return tmp = m[1], m[1] = m[3], m[3] = tmp, tmp = m[2], m[2] = m[6], m[6] = tmp, tmp = m[5], m[5] = m[7], m[7] = tmp, this;
  }
  /**
   * Computes the normal matrix which is the inverse transpose of the upper
   * left 3x3 portion of the given 4x4 matrix.
   *
   * @param {Matrix4} matrix4 - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  getNormalMatrix(matrix4) {
    return this.setFromMatrix4(matrix4).invert().transpose();
  }
  /**
   * Transposes this matrix into the supplied array, and returns itself unchanged.
   *
   * @param {Array<number>} r - An array to store the transposed matrix elements.
   * @return {Matrix3} A reference to this matrix.
   */
  transposeIntoArray(r) {
    const m = this.elements;
    return r[0] = m[0], r[1] = m[3], r[2] = m[6], r[3] = m[1], r[4] = m[4], r[5] = m[7], r[6] = m[2], r[7] = m[5], r[8] = m[8], this;
  }
  /**
   * Sets the UV transform matrix from offset, repeat, rotation, and center.
   *
   * @param {number} tx - Offset x.
   * @param {number} ty - Offset y.
   * @param {number} sx - Repeat x.
   * @param {number} sy - Repeat y.
   * @param {number} rotation - Rotation, in radians. Positive values rotate counterclockwise.
   * @param {number} cx - Center x of rotation.
   * @param {number} cy - Center y of rotation
   * @return {Matrix3} A reference to this matrix.
   */
  setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {
    const c = Math.cos(rotation),
      s = Math.sin(rotation);
    return this.set(sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx, -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty, 0, 0, 1), this;
  }
  scale(sx, sy) {
    return warnOnce("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(matrix3.makeScale(sx, sy)), this;
  }
  rotate(theta) {
    return warnOnce("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(matrix3.makeRotation(-theta)), this;
  }
  translate(tx, ty) {
    return warnOnce("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(matrix3.makeTranslation(tx, ty)), this;
  }
  // for 2D Transforms

  /**
   * Sets this matrix as a 2D translation transform.
   *
   * @param {number|Vector2} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeTranslation(x, y) {
    return x.isVector2 ? this.set(1, 0, x.x, 0, 1, x.y, 0, 0, 1) : this.set(1, 0, x, 0, 1, y, 0, 0, 1), this;
  }
  /**
   * Sets this matrix as a 2D rotational transformation.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  makeRotation(theta) {
    const c = Math.cos(theta),
      s = Math.sin(theta);
    return this.set(c, -s, 0, s, c, 0, 0, 0, 1), this;
  }
  /**
   * Sets this matrix as a 2D scale transform.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeScale(x, y) {
    return this.set(x, 0, 0, 0, y, 0, 0, 0, 1), this;
  }
  equals(matrix) {
    const te = this.elements,
      me = matrix.elements;
    for (let i = 0; i < 9; i++) if (te[i] !== me[i]) return !1;
    return !0;
  }
  fromArray(array, offset = 0) {
    for (let i = 0; i < 9; i++) this.elements[i] = array[i + offset];
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(array = [], offset = 0) {
    const te = this.elements;
    return array[offset] = te[0], array[offset + 1] = te[1], array[offset + 2] = te[2], array[offset + 3] = te[3], array[offset + 4] = te[4], array[offset + 5] = te[5], array[offset + 6] = te[6], array[offset + 7] = te[7], array[offset + 8] = te[8], array;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix3} A clone of this instance.
   */
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const matrix3 = new Matrix3(),
  Or = new Matrix3().set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322),
  Br = new Matrix3().set(3.2409699, -1.5373832, -.4986108, -.9692436, 1.8759675, .0415551, .0556301, -.203977, 1.0569715);
/* 人工身份合同：workingColorSpace/spaces/convert/getTransfer 色彩管理对象工厂。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function createColorManagement() {
  const e = {
      enabled: !0,
      workingColorSpace: LinearSRGBColorSpace,
      spaces: {},
      convert: function (e, t, n) {
        return !1 !== this.enabled && t !== n && t && n ? (this.spaces[t].transfer === SRGBTransfer && (e.r = SRGBToLinear(e.r), e.g = SRGBToLinear(e.g), e.b = SRGBToLinear(e.b)), this.spaces[t].primaries !== this.spaces[n].primaries && (e.applyMatrix3(this.spaces[t].toXYZ), e.applyMatrix3(this.spaces[n].fromXYZ)), this.spaces[n].transfer === SRGBTransfer && (e.r = LinearToSRGB(e.r), e.g = LinearToSRGB(e.g), e.b = LinearToSRGB(e.b)), e) : e;
      },
      workingToColorSpace: function (e, t) {
        return this.convert(e, this.workingColorSpace, t);
      },
      colorSpaceToWorking: function (e, t) {
        return this.convert(e, t, this.workingColorSpace);
      },
      getPrimaries: function (e) {
        return this.spaces[e].primaries;
      },
      getTransfer: function (e) {
        return e === NoColorSpace ? LinearTransfer : this.spaces[e].transfer;
      },
      getToneMappingMode: function (e) {
        return this.spaces[e].outputColorSpaceConfig.toneMappingMode || "standard";
      },
      getLuminanceCoefficients: function (e, t = this.workingColorSpace) {
        return e.fromArray(this.spaces[t].luminanceCoefficients);
      },
      define: function (e) {
        Object.assign(this.spaces, e);
      },
      _getMatrix: function (e, t, n) {
        return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ);
      },
      _getDrawingBufferColorSpace: function (e) {
        return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace;
      },
      _getUnpackColorSpace: function (e = this.workingColorSpace) {
        return this.spaces[e].workingColorSpaceConfig.unpackColorSpace;
      },
      fromWorkingColorSpace: function (t, n) {
        return warnOnce("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), e.workingToColorSpace(t, n);
      },
      toWorkingColorSpace: function (t, n) {
        return warnOnce("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), e.colorSpaceToWorking(t, n);
      }
    },
    t = [.64, .33, .3, .6, .15, .06],
    n = [.2126, .7152, .0722],
    r = [.3127, .329];
  return e.define({
    [LinearSRGBColorSpace]: {
      primaries: t,
      whitePoint: r,
      transfer: LinearTransfer,
      toXYZ: Or,
      fromXYZ: Br,
      luminanceCoefficients: n,
      workingColorSpaceConfig: {
        unpackColorSpace: SRGBColorSpace
      },
      outputColorSpaceConfig: {
        drawingBufferColorSpace: SRGBColorSpace
      }
    },
    [SRGBColorSpace]: {
      primaries: t,
      whitePoint: r,
      transfer: SRGBTransfer,
      toXYZ: Or,
      fromXYZ: Br,
      luminanceCoefficients: n,
      outputColorSpaceConfig: {
        drawingBufferColorSpace: SRGBColorSpace
      }
    }
  }), e;
}
const ColorManagement = createColorManagement();
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：SRGBToLinear。按原分段传递函数将 sRGB 通道转换为线性通道，保留阈值与幂指数。 */
function SRGBToLinear(c) {
  return c < .04045 ? .0773993808 * c : Math.pow(.9478672986 * c + .0521327014, 2.4);
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：LinearToSRGB。按原反向分段传递函数将线性通道转换为 sRGB 通道。 */
function LinearToSRGB(c) {
  return c < .0031308 ? 12.92 * c : 1.055 * Math.pow(c, .41666) - .055;
}
let kr;
class ImageUtils {
  static getDataURL(image, type = "image/png") {
    if (/^data:/i.test(image.src)) return image.src;
    if ("undefined" == typeof HTMLCanvasElement) return image.src;
    let canvas;
    if (image instanceof HTMLCanvasElement) canvas = image;else {
      void 0 === kr && (kr = createElementNS("canvas")), kr.width = image.width, kr.height = image.height;
      const context = kr.getContext("2d");
      image instanceof ImageData ? context.putImageData(image, 0, 0) : context.drawImage(image, 0, 0, image.width, image.height), canvas = kr;
    }
    return canvas.toDataURL(type);
  }
  static sRGBToLinear(image) {
    if ("undefined" != typeof HTMLImageElement && image instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && image instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && image instanceof ImageBitmap) {
      const canvas = createElementNS("canvas");
      canvas.width = image.width, canvas.height = image.height;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, image.width, image.height);
      const imageData = context.getImageData(0, 0, image.width, image.height),
        data = imageData.data;
      for (let i = 0; i < data.length; i++) data[i] = 255 * SRGBToLinear(data[i] / 255);
      return context.putImageData(imageData, 0, 0), canvas;
    }
    if (image.data) {
      const data = image.data.slice(0);
      for (let i = 0; i < data.length; i++) data instanceof Uint8Array || data instanceof Uint8ClampedArray ? data[i] = Math.floor(255 * SRGBToLinear(data[i] / 255)) : data[i] = SRGBToLinear(data[i]);
      return {
        data: data,
        width: image.width,
        height: image.height
      };
    }
    return warn("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), image;
  }
}
let Pr = 0;
class Source {
  constructor(data = null) {
    this.isSource = !0, Object.defineProperty(this, "id", {
      value: Pr++
    }), this.uuid = generateUUID(), this.data = data, this.dataReady = !0, this.version = 0;
  }
  getSize(target) {
    const data = this.data;
    return "undefined" != typeof HTMLVideoElement && data instanceof HTMLVideoElement ? target.set(data.videoWidth, data.videoHeight, 0) : "undefined" != typeof VideoFrame && data instanceof VideoFrame ? target.set(data.displayWidth, data.displayHeight, 0) : null !== data ? target.set(data.width, data.height, data.depth || 0) : target.set(0, 0, 0), target;
  }
  set needsUpdate(value) {
    !0 === value && this.version++;
  }
  toJSON(meta) {
    const isRootObject = void 0 === meta || "string" == typeof meta;
    if (!isRootObject && void 0 !== meta.images[this.uuid]) return meta.images[this.uuid];
    const output = {
        uuid: this.uuid,
        url: ""
      },
      data = this.data;
    if (null !== data) {
      let url;
      if (Array.isArray(data)) {
        url = [];
        for (let i = 0, l = data.length; i < l; i++) data[i].isDataTexture ? url.push(serializeImage(data[i].image)) : url.push(serializeImage(data[i]));
      } else url = serializeImage(data);
      output.url = url;
    }
    return isRootObject || (meta.images[this.uuid] = output), output;
  }
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：serializeImage。 */
function serializeImage(image) {
  return "undefined" != typeof HTMLImageElement && image instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && image instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && image instanceof ImageBitmap ? ImageUtils.getDataURL(image) : image.data ? {
    data: Array.from(image.data),
    width: image.width,
    height: image.height,
    type: image.data.constructor.name
  } : (warn("Texture: Unable to serialize Texture."), {});
}
let Wr = 0;
const _tempVec3 = new Vector3();
/**
 * Base class for all textures.
 *
 * Note: After the initial use of a texture, its dimensions, format, and type
 * cannot be changed. Instead, call {@link Texture#dispose} on the texture and instantiate a new one.
 *
 * @augments EventDispatcher
 */
class Texture extends EventDispatcher {
  constructor(image = Texture.DEFAULT_IMAGE, mapping = Texture.DEFAULT_MAPPING, wrapS = ClampToEdgeWrapping, wrapT = ClampToEdgeWrapping, magFilter = LinearFilter, minFilter = LinearMipmapLinearFilter, format = RGBAFormat, type = UnsignedByteType, anisotropy = Texture.DEFAULT_ANISOTROPY, colorSpace = NoColorSpace) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", {
      value: Wr++
    }), this.uuid = generateUUID(), this.name = "", this.source = new Source(image), this.mipmaps = [], this.mapping = mapping, this.channel = 0, this.wrapS = wrapS, this.wrapT = wrapT, this.magFilter = magFilter, this.minFilter = minFilter, this.anisotropy = anisotropy, this.format = format, this.internalFormat = null, this.type = type, this.offset = new Vector2(0, 0), this.repeat = new Vector2(1, 1), this.center = new Vector2(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Matrix3(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = colorSpace, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(image && image.depth && image.depth > 1), this.pmremVersion = 0, this.normalized = !1;
  }
  get width() {
    return this.source.getSize(_tempVec3).x;
  }
  get height() {
    return this.source.getSize(_tempVec3).y;
  }
  get depth() {
    return this.source.getSize(_tempVec3).z;
  }
  get image() {
    return this.source.data;
  }
  set image(value) {
    this.source.data = value;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  /**
   * Adds a range of data in the data texture to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(start, count) {
    this.updateRanges.push({
      start: start,
      count: count
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Returns a new texture with copied values from this instance.
   *
   * @return {Texture} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given texture to this instance.
   *
   * @param {Texture} source - The texture to copy.
   * @return {Texture} A reference to this instance.
   */
  copy(source) {
    return this.name = source.name, this.source = source.source, this.mipmaps = source.mipmaps.slice(0), this.mapping = source.mapping, this.channel = source.channel, this.wrapS = source.wrapS, this.wrapT = source.wrapT, this.magFilter = source.magFilter, this.minFilter = source.minFilter, this.anisotropy = source.anisotropy, this.format = source.format, this.internalFormat = source.internalFormat, this.type = source.type, this.normalized = source.normalized, this.offset.copy(source.offset), this.repeat.copy(source.repeat), this.center.copy(source.center), this.rotation = source.rotation, this.matrixAutoUpdate = source.matrixAutoUpdate, this.matrix.copy(source.matrix), this.generateMipmaps = source.generateMipmaps, this.premultiplyAlpha = source.premultiplyAlpha, this.flipY = source.flipY, this.unpackAlignment = source.unpackAlignment, this.colorSpace = source.colorSpace, this.renderTarget = source.renderTarget, this.isRenderTargetTexture = source.isRenderTargetTexture, this.isArrayTexture = source.isArrayTexture, this.userData = JSON.parse(JSON.stringify(source.userData)), this.needsUpdate = !0, this;
  }
  /* 遍历输入可枚举属性，undefined 值和实例不存在的属性只警告。Vector2、Vector3、Matrix3 的新旧对象类型标志相符时调用旧对象.copy，保持持有者的引用；其他值直接替换字段。没有自动置 needsUpdate，没有深拷贝任意对象，返回 undefined。 */
  setValues(e) {
    for (const t in e) {
      const n = e[t];
      if (void 0 === n) {
        warn(`Texture.setValues(): parameter '${t}' has value of undefined.`);
        continue;
      }
      const r = this[t];
      void 0 !== r ? r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[t] = n : warn(`Texture.setValues(): property '${t}' does not exist.`);
    }
  }
  toJSON(meta) {
    const isRootObject = void 0 === meta || "string" == typeof meta;
    if (!isRootObject && void 0 !== meta.textures[this.uuid]) return meta.textures[this.uuid];
    const output = {
      metadata: {
        version: 4.7,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(meta).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      normalized: this.normalized,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (output.userData = this.userData), isRootObject || (meta.textures[this.uuid] = output), output;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
  /* 仅 UVMapping 对传入 Vector2 原位变换：乘 matrix，分别按 wrapS/wrapT 处理越出 [0,1] 的分量。Repeat 减 floor；Clamp 取 0 或 1；Mirror 根据 floor 的奇偶反射，因此也覆盖负坐标；最后按 flipY 翻转 y。返回输入本身；恰好为 0/1 时不进入 wrapping 分支。 */
  transformUv(e) {
    if (this.mapping !== UVMapping) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1) switch (this.wrapS) {
      case RepeatWrapping:
        e.x = e.x - Math.floor(e.x);
        break;
      case ClampToEdgeWrapping:
        e.x = e.x < 0 ? 0 : 1;
        break;
      case MirroredRepeatWrapping:
        1 === Math.abs(Math.floor(e.x) % 2) ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
    }
    if (e.y < 0 || e.y > 1) switch (this.wrapT) {
      case RepeatWrapping:
        e.y = e.y - Math.floor(e.y);
        break;
      case ClampToEdgeWrapping:
        e.y = e.y < 0 ? 0 : 1;
        break;
      case MirroredRepeatWrapping:
        1 === Math.abs(Math.floor(e.y) % 2) ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
    }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  set needsUpdate(value) {
    !0 === value && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(value) {
    !0 === value && this.pmremVersion++;
  }
}
Texture.DEFAULT_IMAGE = null, Texture.DEFAULT_MAPPING = UVMapping, Texture.DEFAULT_ANISOTROPY = 1;
/**
 * Class representing a 4D vector. A 4D vector is an ordered quadruplet of numbers
 * (labeled x, y, z and w), which can be used to represent a number of things, such as:
 *
 * - A point in 4D space.
 * - A direction and length in 4D space. In three.js the length will
 * always be the Euclidean distance(straight-line distance) from `(0, 0, 0, 0)` to `(x, y, z, w)`
 * and the direction is also measured from `(0, 0, 0, 0)` towards `(x, y, z, w)`.
 * - Any arbitrary ordered quadruplet of numbers.
 *
 * There are other things a 4D vector can be used to represent, however these
 * are the most common uses in *three.js*.
 *
 * Iterating through a vector instance will yield its components `(x, y, z, w)` in
 * the corresponding order.
 * ```js
 * const a = new THREE.Vector4( 0, 1, 0, 0 );
 *
 * //no arguments; will be initialised to (0, 0, 0, 1)
 * const b = new THREE.Vector4( );
 *
 * const d = a.dot( b );
 * ```
 */
class Vector4 {
  static {
    Vector4.prototype.isVector4 = !0;
  }
  /**
   * Constructs a new 4D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   * @param {number} [w=1] - The w value of this vector.
   */
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.x = x, this.y = y, this.z = z, this.w = w;
  }
  get width() {
    return this.z;
  }
  set width(value) {
    this.z = value;
  }
  get height() {
    return this.w;
  }
  set height(value) {
    this.w = value;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @param {number} w - The value of the w component.
   * @return {Vector4} A reference to this vector.
   */
  set(x, y, z, w) {
    return this.x = x, this.y = y, this.z = z, this.w = w, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector4} A reference to this vector.
   */
  setScalar(scalar) {
    return this.x = scalar, this.y = scalar, this.z = scalar, this.w = scalar, this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setX(x) {
    return this.x = x, this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setY(y) {
    return this.y = y, this;
  }
  /**
   * Sets the vector's z component to the given value
   *
   * @param {number} z - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setZ(z) {
    return this.z = z, this;
  }
  /**
   * Sets the vector's w component to the given value
   *
   * @param {number} w - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setW(w) {
    return this.w = w, this;
  }
  setComponent(index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      case 2:
        this.z = value;
        break;
      case 3:
        this.w = value;
        break;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + index);
    }
    return this;
  }
  getComponent(index) {
    switch (index) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + index);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector4} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(v) {
    return this.x = v.x, this.y = v.y, this.z = v.z, this.w = void 0 !== v.w ? v.w : 1, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector4} v - The vector to add.
   * @return {Vector4} A reference to this vector.
   */
  add(v) {
    return this.x += v.x, this.y += v.y, this.z += v.z, this.w += v.w, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector4} A reference to this vector.
   */
  addScalar(s) {
    return this.x += s, this.y += s, this.z += s, this.w += s, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  addVectors(a, b) {
    return this.x = a.x + b.x, this.y = a.y + b.y, this.z = a.z + b.z, this.w = a.w + b.w, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector4} A reference to this vector.
   */
  addScaledVector(v, s) {
    return this.x += v.x * s, this.y += v.y * s, this.z += v.z * s, this.w += v.w * s, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector4} v - The vector to subtract.
   * @return {Vector4} A reference to this vector.
   */
  sub(v) {
    return this.x -= v.x, this.y -= v.y, this.z -= v.z, this.w -= v.w, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector4} A reference to this vector.
   */
  subScalar(s) {
    return this.x -= s, this.y -= s, this.z -= s, this.w -= s, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  subVectors(a, b) {
    return this.x = a.x - b.x, this.y = a.y - b.y, this.z = a.z - b.z, this.w = a.w - b.w, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector4} v - The vector to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiply(v) {
    return this.x *= v.x, this.y *= v.y, this.z *= v.z, this.w *= v.w, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiplyScalar(scalar) {
    return this.x *= scalar, this.y *= scalar, this.z *= scalar, this.w *= scalar, this;
  }
  /**
   * Multiplies this vector with the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  applyMatrix4(m) {
    const x = this.x,
      y = this.y,
      z = this.z,
      w = this.w,
      e = m.elements;
    return this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w, this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w, this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w, this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w, this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector4} v - The vector to divide.
   * @return {Vector4} A reference to this vector.
   */
  divide(v) {
    return this.x /= v.x, this.y /= v.y, this.z /= v.z, this.w /= v.w, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector4} A reference to this vector.
   */
  divideScalar(scalar) {
    return this.multiplyScalar(1 / scalar);
  }
  setAxisAngleFromQuaternion(q) {
    this.w = 2 * Math.acos(q.w);
    const s = Math.sqrt(1 - q.w * q.w);
    return s < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = q.x / s, this.y = q.y / s, this.z = q.z / s), this;
  }
  setAxisAngleFromRotationMatrix(m) {
    let angle, x, y, z;
    const epsilon = .01,
      epsilon2 = .1,
      te = m.elements,
      m11 = te[0],
      m12 = te[4],
      m13 = te[8],
      m21 = te[1],
      m22 = te[5],
      m23 = te[9],
      m31 = te[2],
      m32 = te[6],
      m33 = te[10];
    if (Math.abs(m12 - m21) < epsilon && Math.abs(m13 - m31) < epsilon && Math.abs(m23 - m32) < epsilon) {
      if (Math.abs(m12 + m21) < epsilon2 && Math.abs(m13 + m31) < epsilon2 && Math.abs(m23 + m32) < epsilon2 && Math.abs(m11 + m22 + m33 - 3) < epsilon2) return this.set(1, 0, 0, 0), this;
      angle = Math.PI;
      const xx = (m11 + 1) / 2,
        yy = (m22 + 1) / 2,
        zz = (m33 + 1) / 2,
        xy = (m12 + m21) / 4,
        xz = (m13 + m31) / 4,
        yz = (m23 + m32) / 4;
      return xx > yy && xx > zz ? xx < epsilon ? (x = 0, y = .707106781, z = .707106781) : (x = Math.sqrt(xx), y = xy / x, z = xz / x) : yy > zz ? yy < epsilon ? (x = .707106781, y = 0, z = .707106781) : (y = Math.sqrt(yy), x = xy / y, z = yz / y) : zz < epsilon ? (x = .707106781, y = .707106781, z = 0) : (z = Math.sqrt(zz), x = xz / z, y = yz / z), this.set(x, y, z, angle), this;
    }
    let s = Math.sqrt((m32 - m23) * (m32 - m23) + (m13 - m31) * (m13 - m31) + (m21 - m12) * (m21 - m12));
    return Math.abs(s) < .001 && (s = 1), this.x = (m32 - m23) / s, this.y = (m13 - m31) / s, this.z = (m21 - m12) / s, this.w = Math.acos((m11 + m22 + m33 - 1) / 2), this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  setFromMatrixPosition(m) {
    const e = m.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this.w = e[15], this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the given vector's x, y, z or w
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  min(v) {
    return this.x = Math.min(this.x, v.x), this.y = Math.min(this.y, v.y), this.z = Math.min(this.z, v.z), this.w = Math.min(this.w, v.w), this;
  }
  /**
   * If this vector's x, y, z or w value is less than the given vector's x, y, z or w
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  max(v) {
    return this.x = Math.max(this.x, v.x), this.y = Math.max(this.y, v.y), this.z = Math.max(this.z, v.z), this.w = Math.max(this.w, v.w), this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the max vector's x, y, z or w
   * value, it is replaced by the corresponding value.
   * If this vector's x, y, z or w value is less than the min vector's x, y, z or w value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector4} min - The minimum x, y and z values.
   * @param {Vector4} max - The maximum x, y and z values in the desired range.
   * @return {Vector4} A reference to this vector.
   */
  clamp(min, max) {
    return this.x = clamp(this.x, min.x, max.x), this.y = clamp(this.y, min.y, max.y), this.z = clamp(this.z, min.z, max.z), this.w = clamp(this.w, min.w, max.w), this;
  }
  /**
   * If this vector's x, y, z or w values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y, z or w values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampScalar(minVal, maxVal) {
    return this.x = clamp(this.x, minVal, maxVal), this.y = clamp(this.y, minVal, maxVal), this.z = clamp(this.z, minVal, maxVal), this.w = clamp(this.w, minVal, maxVal), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampLength(min, max) {
    const length = this.length();
    return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector4} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y, z = -z, w = -w.
   *
   * @return {Vector4} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector4} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0, 0) to (x, y, z, w). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector4} A reference to this vector.
   */
  setLength(length) {
    return this.normalize().multiplyScalar(length);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector4} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerp(v, alpha) {
    return this.x += (v.x - this.x) * alpha, this.y += (v.y - this.y) * alpha, this.z += (v.z - this.z) * alpha, this.w += (v.w - this.w) * alpha, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector4} v1 - The first vector.
   * @param {Vector4} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerpVectors(v1, v2, alpha) {
    return this.x = v1.x + (v2.x - v1.x) * alpha, this.y = v1.y + (v2.y - v1.y) * alpha, this.z = v1.z + (v2.z - v1.z) * alpha, this.w = v1.w + (v2.w - v1.w) * alpha, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector4} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(v) {
    return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`,
   * z value to be `array[ offset + 2 ]`, w value to be `array[ offset + 3 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector4} A reference to this vector.
   */
  fromArray(array, offset = 0) {
    return this.x = array[offset], this.y = array[offset + 1], this.z = array[offset + 2], this.w = array[offset + 3], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(array = [], offset = 0) {
    return array[offset] = this.x, array[offset + 1] = this.y, array[offset + 2] = this.z, array[offset + 3] = this.w, array;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector4} A reference to this vector.
   */
  fromBufferAttribute(attribute, index) {
    return this.x = attribute.getX(index), this.y = attribute.getY(index), this.z = attribute.getZ(index), this.w = attribute.getW(index), this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
/**
 * A render target is a buffer where the video card draws pixels for a scene
 * that is being rendered in the background. It is used in different effects,
 * such as applying postprocessing to a rendered image before displaying it
 * on the screen.
 *
 * @augments EventDispatcher
 */
class RenderTarget extends EventDispatcher {
  /**
   * Render target options.
   *
   * @typedef {Object} RenderTarget~Options
   * @property {boolean} [generateMipmaps=false] - Whether to generate mipmaps or not.
   * @property {number} [magFilter=LinearFilter] - The mag filter.
   * @property {number} [minFilter=LinearFilter] - The min filter.
   * @property {number} [format=RGBAFormat] - The texture format.
   * @property {number} [type=UnsignedByteType] - The texture type.
   * @property {?string} [internalFormat=null] - The texture's internal format.
   * @property {number} [wrapS=ClampToEdgeWrapping] - The texture's uv wrapping mode.
   * @property {number} [wrapT=ClampToEdgeWrapping] - The texture's uv wrapping mode.
   * @property {number} [anisotropy=1] - The texture's anisotropy value.
   * @property {string} [colorSpace=NoColorSpace] - The texture's color space.
   * @property {boolean} [depthBuffer=true] - Whether to allocate a depth buffer or not.
   * @property {boolean} [stencilBuffer=false] - Whether to allocate a stencil buffer or not.
   * @property {boolean} [resolveDepthBuffer=true] - Whether to resolve the depth buffer or not.
   * @property {boolean} [resolveStencilBuffer=true] - Whether  to resolve the stencil buffer or not.
   * @property {?Texture} [depthTexture=null] - Reference to a depth texture.
   * @property {number} [samples=0] - The MSAA samples count.
   * @property {number} [count=1] - Defines the number of color attachments . Must be at least `1`.
   * @property {number} [depth=1] - The texture depth.
   * @property {boolean} [multiview=false] - Whether this target is used for multiview rendering (WebGL OVR_multiview2 extension).
   * @property {boolean} [useArrayDepthTexture=false] - Whether to create the depth texture as an array texture for per-layer depth testing. This is separate from multiview so layered render targets can use array depth without the multiview extension.
   */

  /**
   * Constructs a new render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(width = 1, height = 1, options = {}) {
    super(), options = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: LinearFilter,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1,
      depth: 1,
      multiview: !1,
      useArrayDepthTexture: !1
    }, options), this.isRenderTarget = !0, this.width = width, this.height = height, this.depth = options.depth, this.scissor = new Vector4(0, 0, width, height), this.scissorTest = !1, this.viewport = new Vector4(0, 0, width, height), this.textures = [];
    const image = {
        width: width,
        height: height,
        depth: options.depth
      },
      texture = new Texture(image),
      count = options.count;
    for (let i = 0; i < count; i++) this.textures[i] = texture.clone(), this.textures[i].isRenderTargetTexture = !0, this.textures[i].renderTarget = this;
    this._setTextureOptions(options), this.depthBuffer = options.depthBuffer, this.stencilBuffer = options.stencilBuffer, this.resolveDepthBuffer = options.resolveDepthBuffer, this.resolveStencilBuffer = options.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = options.depthTexture, this.samples = options.samples, this.multiview = options.multiview, this.useArrayDepthTexture = options.useArrayDepthTexture;
  }
  _setTextureOptions(options = {}) {
    const values = {
      minFilter: LinearFilter,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null
    };
    void 0 !== options.mapping && (values.mapping = options.mapping), void 0 !== options.wrapS && (values.wrapS = options.wrapS), void 0 !== options.wrapT && (values.wrapT = options.wrapT), void 0 !== options.wrapR && (values.wrapR = options.wrapR), void 0 !== options.magFilter && (values.magFilter = options.magFilter), void 0 !== options.minFilter && (values.minFilter = options.minFilter), void 0 !== options.format && (values.format = options.format), void 0 !== options.type && (values.type = options.type), void 0 !== options.anisotropy && (values.anisotropy = options.anisotropy), void 0 !== options.colorSpace && (values.colorSpace = options.colorSpace), void 0 !== options.flipY && (values.flipY = options.flipY), void 0 !== options.generateMipmaps && (values.generateMipmaps = options.generateMipmaps), void 0 !== options.internalFormat && (values.internalFormat = options.internalFormat);
    for (let i = 0; i < this.textures.length; i++) {
      this.textures[i].setValues(values);
    }
  }
  get texture() {
    return this.textures[0];
  }
  set texture(value) {
    this.textures[0] = value;
  }
  set depthTexture(current) {
    null !== this._depthTexture && (this._depthTexture.renderTarget = null), null !== current && (current.renderTarget = this), this._depthTexture = current;
  }
  get depthTexture() {
    return this._depthTexture;
  }
  setSize(width, height, depth = 1) {
    if (this.width !== width || this.height !== height || this.depth !== depth) {
      this.width = width, this.height = height, this.depth = depth;
      for (let i = 0, il = this.textures.length; i < il; i++) this.textures[i].image.width = width, this.textures[i].image.height = height, this.textures[i].image.depth = depth, !0 !== this.textures[i].isData3DTexture && (this.textures[i].isArrayTexture = this.textures[i].image.depth > 1);
      this.dispose();
    }
    this.viewport.set(0, 0, width, height), this.scissor.set(0, 0, width, height);
  }
  /**
   * Returns a new render target with copied values from this instance.
   *
   * @return {RenderTarget} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  copy(source) {
    this.width = source.width, this.height = source.height, this.depth = source.depth, this.scissor.copy(source.scissor), this.scissorTest = source.scissorTest, this.viewport.copy(source.viewport), this.textures.length = 0;
    for (let i = 0, il = source.textures.length; i < il; i++) {
      this.textures[i] = source.textures[i].clone(), this.textures[i].isRenderTargetTexture = !0, this.textures[i].renderTarget = this;
      const image = Object.assign({}, source.textures[i].image);
      this.textures[i].source = new Source(image);
    }
    return this.depthBuffer = source.depthBuffer, this.stencilBuffer = source.stencilBuffer, this.resolveDepthBuffer = source.resolveDepthBuffer, this.resolveStencilBuffer = source.resolveStencilBuffer, null !== source.depthTexture && (this.depthTexture = source.depthTexture.clone()), this.samples = source.samples, this.multiview = source.multiview, this.useArrayDepthTexture = source.useArrayDepthTexture, this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
}
/**
 * A render target used in context of {@link WebGLRenderer}.
 *
 * @augments RenderTarget
 */
class WebGLRenderTarget extends RenderTarget {
  /**
   * Constructs a new 3D render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(width = 1, height = 1, options = {}) {
    super(width, height, options), this.isWebGLRenderTarget = !0;
  }
}
/**
 * Creates an array of textures directly from raw buffer data.
 *
 * @augments Texture
 */
class DataArrayTexture extends Texture {
  /**
   * Constructs a new data array texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(data = null, width = 1, height = 1, depth = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = {
      data: data,
      width: width,
      height: height,
      depth: depth
    }, this.magFilter = NearestFilter, this.minFilter = NearestFilter, this.wrapR = ClampToEdgeWrapping, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = new Set();
  }
  /**
   * Describes that a specific layer of the texture needs to be updated.
   * Normally when {@link Texture#needsUpdate} is set to `true`, the
   * entire data texture array is sent to the GPU. Marking specific
   * layers will only transmit subsets of all mipmaps associated with a
   * specific depth in the array which is often much more performant.
   *
   * @param {number} layerIndex - The layer index that should be updated.
   */
  addLayerUpdate(layerIndex) {
    this.layerUpdates.add(layerIndex);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
/**
 * An array render target used in context of {@link WebGLRenderer}.
 *
 * @augments WebGLRenderTarget
 */
class WebGLArrayRenderTarget extends WebGLRenderTarget {
  /**
   * Constructs a new array render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {number} [depth=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(width = 1, height = 1, depth = 1, options = {}) {
    super(width, height, options), this.isWebGLArrayRenderTarget = !0, this.depth = depth, this.texture = new DataArrayTexture(null, width, height, depth), this._setTextureOptions(options), this.texture.isRenderTargetTexture = !0;
  }
}
/**
 * Creates a three-dimensional texture from raw data, with parameters to
 * divide it into width, height, and depth.
 *
 * @augments Texture
 */
class Data3DTexture extends Texture {
  /**
   * Constructs a new data array texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(data = null, width = 1, height = 1, depth = 1) {
    super(null), this.isData3DTexture = !0, this.image = {
      data: data,
      width: width,
      height: height,
      depth: depth
    }, this.magFilter = NearestFilter, this.minFilter = NearestFilter, this.wrapR = ClampToEdgeWrapping, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
/**
 * A 3D render target used in context of {@link WebGLRenderer}.
 *
 * @augments WebGLRenderTarget
 */
class WebGL3DRenderTarget extends WebGLRenderTarget {
  /**
   * Constructs a new 3D render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {number} [depth=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(width = 1, height = 1, depth = 1, options = {}) {
    super(width, height, options), this.isWebGL3DRenderTarget = !0, this.depth = depth, this.texture = new Data3DTexture(null, width, height, depth), this._setTextureOptions(options), this.texture.isRenderTargetTexture = !0;
  }
}
/**
 * Represents a 4x4 matrix.
 *
 * The most common use of a 4x4 matrix in 3D computer graphics is as a transformation matrix.
 * For an introduction to transformation matrices as used in WebGL, check out [this tutorial](https://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices)
 *
 * This allows a 3D vector representing a point in 3D space to undergo
 * transformations such as translation, rotation, shear, scale, reflection,
 * orthogonal or perspective projection and so on, by being multiplied by the
 * matrix. This is known as `applying` the matrix to the vector.
 *
 * A Note on Row-Major and Column-Major Ordering:
 *
 * The constructor and {@link Matrix3#set} method take arguments in
 * [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order)
 * order, while internally they are stored in the {@link Matrix3#elements} array in column-major order.
 * This means that calling:
 * ```js
 * const m = new THREE.Matrix4();
 * m.set( 11, 12, 13, 14,
 *        21, 22, 23, 24,
 *        31, 32, 33, 34,
 *        41, 42, 43, 44 );
 * ```
 * will result in the elements array containing:
 * ```js
 * m.elements = [ 11, 21, 31, 41,
 *                12, 22, 32, 42,
 *                13, 23, 33, 43,
 *                14, 24, 34, 44 ];
 * ```
 * and internally all calculations are performed using column-major ordering.
 * However, as the actual ordering makes no difference mathematically and
 * most people are used to thinking about matrices in row-major order, the
 * three.js documentation shows matrices in row-major order. Just bear in
 * mind that if you are reading the source code, you'll have to take the
 * transpose of any matrices outlined here to make sense of the calculations.
 */
class Matrix4 {
  static {
    Matrix4.prototype.isMatrix4 = !0;
  }
  constructor(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], void 0 !== n11 && this.set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n14] - 1-4 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n24] - 2-4 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @param {number} [n34] - 3-4 matrix element.
   * @param {number} [n41] - 4-1 matrix element.
   * @param {number} [n42] - 4-2 matrix element.
   * @param {number} [n43] - 4-3 matrix element.
   * @param {number} [n44] - 4-4 matrix element.
   * @return {Matrix4} A reference to this matrix.
   */
  set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    const te = this.elements;
    return te[0] = n11, te[4] = n12, te[8] = n13, te[12] = n14, te[1] = n21, te[5] = n22, te[9] = n23, te[13] = n24, te[2] = n31, te[6] = n32, te[10] = n33, te[14] = n34, te[3] = n41, te[7] = n42, te[11] = n43, te[15] = n44, this;
  }
  /**
   * Sets this matrix to the 4x4 identity matrix.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix4} A clone of this instance.
   */
  clone() {
    return new Matrix4().fromArray(this.elements);
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix4} m - The matrix to copy.
   * @return {Matrix4} A reference to this matrix.
   */
  copy(m) {
    const te = this.elements,
      me = m.elements;
    return te[0] = me[0], te[1] = me[1], te[2] = me[2], te[3] = me[3], te[4] = me[4], te[5] = me[5], te[6] = me[6], te[7] = me[7], te[8] = me[8], te[9] = me[9], te[10] = me[10], te[11] = me[11], te[12] = me[12], te[13] = me[13], te[14] = me[14], te[15] = me[15], this;
  }
  /**
   * Copies the translation component of the given matrix
   * into this matrix's translation component.
   *
   * @param {Matrix4} m - The matrix to copy the translation component.
   * @return {Matrix4} A reference to this matrix.
   */
  copyPosition(m) {
    const te = this.elements,
      me = m.elements;
    return te[12] = me[12], te[13] = me[13], te[14] = me[14], this;
  }
  /**
   * Set the upper 3x3 elements of this matrix to the values of given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  setFromMatrix3(m) {
    const me = m.elements;
    return this.set(me[0], me[3], me[6], 0, me[1], me[4], me[7], 0, me[2], me[5], me[8], 0, 0, 0, 0, 1), this;
  }
  extractBasis(xAxis, yAxis, zAxis) {
    return 0 === this.determinantAffine() ? (xAxis.set(1, 0, 0), yAxis.set(0, 1, 0), zAxis.set(0, 0, 1), this) : (xAxis.setFromMatrixColumn(this, 0), yAxis.setFromMatrixColumn(this, 1), zAxis.setFromMatrixColumn(this, 2), this);
  }
  /**
   * Sets the given basis vectors to this matrix.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeBasis(xAxis, yAxis, zAxis) {
    return this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1), this;
  }
  extractRotation(m) {
    if (0 === m.determinantAffine()) return this.identity();
    const te = this.elements,
      me = m.elements,
      scaleX = 1 / qr.setFromMatrixColumn(m, 0).length(),
      scaleY = 1 / qr.setFromMatrixColumn(m, 1).length(),
      scaleZ = 1 / qr.setFromMatrixColumn(m, 2).length();
    return te[0] = me[0] * scaleX, te[1] = me[1] * scaleX, te[2] = me[2] * scaleX, te[3] = 0, te[4] = me[4] * scaleY, te[5] = me[5] * scaleY, te[6] = me[6] * scaleY, te[7] = 0, te[8] = me[8] * scaleZ, te[9] = me[9] * scaleZ, te[10] = me[10] * scaleZ, te[11] = 0, te[12] = 0, te[13] = 0, te[14] = 0, te[15] = 1, this;
  }
  makeRotationFromEuler(euler) {
    const te = this.elements,
      x = euler.x,
      y = euler.y,
      z = euler.z,
      a = Math.cos(x),
      b = Math.sin(x),
      c = Math.cos(y),
      d = Math.sin(y),
      e = Math.cos(z),
      f = Math.sin(z);
    if ("XYZ" === euler.order) {
      const ae = a * e,
        af = a * f,
        be = b * e,
        bf = b * f;
      te[0] = c * e, te[4] = -c * f, te[8] = d, te[1] = af + be * d, te[5] = ae - bf * d, te[9] = -b * c, te[2] = bf - ae * d, te[6] = be + af * d, te[10] = a * c;
    } else if ("YXZ" === euler.order) {
      const ce = c * e,
        cf = c * f,
        de = d * e,
        df = d * f;
      te[0] = ce + df * b, te[4] = de * b - cf, te[8] = a * d, te[1] = a * f, te[5] = a * e, te[9] = -b, te[2] = cf * b - de, te[6] = df + ce * b, te[10] = a * c;
    } else if ("ZXY" === euler.order) {
      const ce = c * e,
        cf = c * f,
        de = d * e,
        df = d * f;
      te[0] = ce - df * b, te[4] = -a * f, te[8] = de + cf * b, te[1] = cf + de * b, te[5] = a * e, te[9] = df - ce * b, te[2] = -a * d, te[6] = b, te[10] = a * c;
    } else if ("ZYX" === euler.order) {
      const ae = a * e,
        af = a * f,
        be = b * e,
        bf = b * f;
      te[0] = c * e, te[4] = be * d - af, te[8] = ae * d + bf, te[1] = c * f, te[5] = bf * d + ae, te[9] = af * d - be, te[2] = -d, te[6] = b * c, te[10] = a * c;
    } else if ("YZX" === euler.order) {
      const ac = a * c,
        ad = a * d,
        bc = b * c,
        bd = b * d;
      te[0] = c * e, te[4] = bd - ac * f, te[8] = bc * f + ad, te[1] = f, te[5] = a * e, te[9] = -b * e, te[2] = -d * e, te[6] = ad * f + bc, te[10] = ac - bd * f;
    } else if ("XZY" === euler.order) {
      const ac = a * c,
        ad = a * d,
        bc = b * c,
        bd = b * d;
      te[0] = c * e, te[4] = -f, te[8] = d * e, te[1] = ac * f + bd, te[5] = a * e, te[9] = ad * f - bc, te[2] = bc * f - ad, te[6] = b * e, te[10] = bd * f + ac;
    }
    return te[3] = 0, te[7] = 0, te[11] = 0, te[12] = 0, te[13] = 0, te[14] = 0, te[15] = 1, this;
  }
  /**
   * Sets the rotation component of this matrix to the rotation specified by
   * the given Quaternion as outlined [here](https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion)
   * The rest of the matrix is set to the identity.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromQuaternion(q) {
    return this.compose(_zero, q, _one);
  }
  lookAt(eye, target, up) {
    const te = this.elements;
    return Vr.subVectors(eye, target), 0 === Vr.lengthSq() && (Vr.z = 1), Vr.normalize(), Xr.crossVectors(up, Vr), 0 === Xr.lengthSq() && (1 === Math.abs(up.z) ? Vr.x += 1e-4 : Vr.z += 1e-4, Vr.normalize(), Xr.crossVectors(up, Vr)), Xr.normalize(), jr.crossVectors(Vr, Xr), te[0] = Xr.x, te[4] = jr.x, te[8] = Vr.x, te[1] = Xr.y, te[5] = jr.y, te[9] = Vr.y, te[2] = Xr.z, te[6] = jr.z, te[10] = Vr.z, this;
  }
  /**
   * Post-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  multiply(m) {
    return this.multiplyMatrices(this, m);
  }
  /**
   * Pre-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  premultiply(m) {
    return this.multiplyMatrices(m, this);
  }
  /**
   * Multiples the given 4x4 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix4} a - The first matrix.
   * @param {Matrix4} b - The second matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyMatrices(a, b) {
    const ae = a.elements,
      be = b.elements,
      te = this.elements,
      a11 = ae[0],
      a12 = ae[4],
      a13 = ae[8],
      a14 = ae[12],
      a21 = ae[1],
      a22 = ae[5],
      a23 = ae[9],
      a24 = ae[13],
      a31 = ae[2],
      a32 = ae[6],
      a33 = ae[10],
      a34 = ae[14],
      a41 = ae[3],
      a42 = ae[7],
      a43 = ae[11],
      a44 = ae[15],
      b11 = be[0],
      b12 = be[4],
      b13 = be[8],
      b14 = be[12],
      b21 = be[1],
      b22 = be[5],
      b23 = be[9],
      b24 = be[13],
      b31 = be[2],
      b32 = be[6],
      b33 = be[10],
      b34 = be[14],
      b41 = be[3],
      b42 = be[7],
      b43 = be[11],
      b44 = be[15];
    return te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41, te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42, te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43, te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44, te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41, te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42, te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43, te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44, te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41, te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42, te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43, te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44, te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41, te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42, te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43, te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44, this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyScalar(s) {
    const te = this.elements;
    return te[0] *= s, te[4] *= s, te[8] *= s, te[12] *= s, te[1] *= s, te[5] *= s, te[9] *= s, te[13] *= s, te[2] *= s, te[6] *= s, te[10] *= s, te[14] *= s, te[3] *= s, te[7] *= s, te[11] *= s, te[15] *= s, this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * Based on the method outlined [here](http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.html).
   *
   * @return {number} The determinant.
   */
  determinant() {
    const te = this.elements,
      n11 = te[0],
      n12 = te[4],
      n13 = te[8],
      n14 = te[12],
      n21 = te[1],
      n22 = te[5],
      n23 = te[9],
      n24 = te[13],
      n31 = te[2],
      n32 = te[6],
      n33 = te[10],
      n34 = te[14],
      n41 = te[3],
      n42 = te[7],
      n43 = te[11],
      n44 = te[15],
      t11 = n23 * n34 - n24 * n33,
      t12 = n22 * n34 - n24 * n32,
      t13 = n22 * n33 - n23 * n32,
      t21 = n21 * n34 - n24 * n31,
      t22 = n21 * n33 - n23 * n31,
      t23 = n21 * n32 - n22 * n31;
    return n11 * (n42 * t11 - n43 * t12 + n44 * t13) - n12 * (n41 * t11 - n43 * t21 + n44 * t22) + n13 * (n41 * t12 - n42 * t21 + n44 * t23) - n14 * (n41 * t13 - n42 * t22 + n43 * t23);
  }
  /**
   * Computes and returns the determinant of the 4x4 matrix, but assumes the
   * matrix is affine, saving some computations.
   *
   * For affine matrices (like an object's world matrix), this value equals the
   * full 4x4 {@link Matrix4#determinant} but is cheaper to compute.
   *
   * Assumes the bottom row is [0, 0, 0, 1].
   *
   * @return {number} The determinant of the matrix.
   */
  determinantAffine() {
    const te = this.elements,
      n11 = te[0],
      n12 = te[4],
      n13 = te[8],
      n21 = te[1],
      n22 = te[5],
      n23 = te[9],
      n31 = te[2],
      n32 = te[6],
      n33 = te[10];
    return n11 * (n22 * n33 - n23 * n32) - n12 * (n21 * n33 - n23 * n31) + n13 * (n21 * n32 - n22 * n31);
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  transpose() {
    const te = this.elements;
    let tmp;
    return tmp = te[1], te[1] = te[4], te[4] = tmp, tmp = te[2], te[2] = te[8], te[8] = tmp, tmp = te[6], te[6] = te[9], te[9] = tmp, tmp = te[3], te[3] = te[12], te[12] = tmp, tmp = te[7], te[7] = te[13], te[13] = tmp, tmp = te[11], te[11] = te[14], te[14] = tmp, this;
  }
  /**
   * Sets the position component for this matrix from the given vector,
   * without affecting the rest of the matrix.
   *
   * @param {number|Vector3} x - The x component of the vector or alternatively the vector object.
   * @param {number} y - The y component of the vector.
   * @param {number} z - The z component of the vector.
   * @return {Matrix4} A reference to this matrix.
   */
  setPosition(x, y, z) {
    const te = this.elements;
    return x.isVector3 ? (te[12] = x.x, te[13] = x.y, te[14] = x.z) : (te[12] = x, te[13] = y, te[14] = z), this;
  }
  invert() {
    const te = this.elements,
      n11 = te[0],
      n21 = te[1],
      n31 = te[2],
      n41 = te[3],
      n12 = te[4],
      n22 = te[5],
      n32 = te[6],
      n42 = te[7],
      n13 = te[8],
      n23 = te[9],
      n33 = te[10],
      n43 = te[11],
      n14 = te[12],
      n24 = te[13],
      n34 = te[14],
      n44 = te[15],
      t1 = n11 * n22 - n21 * n12,
      t2 = n11 * n32 - n31 * n12,
      t3 = n11 * n42 - n41 * n12,
      t4 = n21 * n32 - n31 * n22,
      t5 = n21 * n42 - n41 * n22,
      t6 = n31 * n42 - n41 * n32,
      t7 = n13 * n24 - n23 * n14,
      t8 = n13 * n34 - n33 * n14,
      t9 = n13 * n44 - n43 * n14,
      t10 = n23 * n34 - n33 * n24,
      t11 = n23 * n44 - n43 * n24,
      t12 = n33 * n44 - n43 * n34,
      det = t1 * t12 - t2 * t11 + t3 * t10 + t4 * t9 - t5 * t8 + t6 * t7;
    if (0 === det) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const detInv = 1 / det;
    return te[0] = (n22 * t12 - n32 * t11 + n42 * t10) * detInv, te[1] = (n31 * t11 - n21 * t12 - n41 * t10) * detInv, te[2] = (n24 * t6 - n34 * t5 + n44 * t4) * detInv, te[3] = (n33 * t5 - n23 * t6 - n43 * t4) * detInv, te[4] = (n32 * t9 - n12 * t12 - n42 * t8) * detInv, te[5] = (n11 * t12 - n31 * t9 + n41 * t8) * detInv, te[6] = (n34 * t3 - n14 * t6 - n44 * t2) * detInv, te[7] = (n13 * t6 - n33 * t3 + n43 * t2) * detInv, te[8] = (n12 * t11 - n22 * t9 + n42 * t7) * detInv, te[9] = (n21 * t9 - n11 * t11 - n41 * t7) * detInv, te[10] = (n14 * t5 - n24 * t3 + n44 * t1) * detInv, te[11] = (n23 * t3 - n13 * t5 - n43 * t1) * detInv, te[12] = (n22 * t8 - n12 * t10 - n32 * t7) * detInv, te[13] = (n11 * t10 - n21 * t8 + n31 * t7) * detInv, te[14] = (n24 * t2 - n14 * t4 - n34 * t1) * detInv, te[15] = (n13 * t4 - n23 * t2 + n33 * t1) * detInv, this;
  }
  /**
   * Multiplies the columns of this matrix by the given vector.
   *
   * @param {Vector3} v - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  scale(v) {
    const te = this.elements,
      x = v.x,
      y = v.y,
      z = v.z;
    return te[0] *= x, te[4] *= y, te[8] *= z, te[1] *= x, te[5] *= y, te[9] *= z, te[2] *= x, te[6] *= y, te[10] *= z, te[3] *= x, te[7] *= y, te[11] *= z, this;
  }
  /**
   * Gets the maximum scale value of the three axes.
   *
   * @return {number} The maximum scale.
   */
  getMaxScaleOnAxis() {
    const te = this.elements,
      scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2],
      scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6],
      scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
    return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
  }
  /**
   * Sets this matrix as a translation transform from the given vector.
   *
   * @param {number|Vector3} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @param {number} z - The amount to translate in the z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeTranslation(x, y, z) {
    return x.isVector3 ? this.set(1, 0, 0, x.x, 0, 1, 0, x.y, 0, 0, 1, x.z, 0, 0, 0, 1) : this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the X axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationX(theta) {
    const c = Math.cos(theta),
      s = Math.sin(theta);
    return this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Y axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationY(theta) {
    const c = Math.cos(theta),
      s = Math.sin(theta);
    return this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Z axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationZ(theta) {
    const c = Math.cos(theta),
      s = Math.sin(theta);
    return this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the given axis by
   * the given angle.
   *
   * This is a somewhat controversial but mathematically sound alternative to
   * rotating via Quaternions. See the discussion [here](https://www.gamedev.net/articles/programming/math-and-physics/do-we-really-need-quaternions-r1199).
   *
   * @param {Vector3} axis - The normalized rotation axis.
   * @param {number} angle - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationAxis(axis, angle) {
    const c = Math.cos(angle),
      s = Math.sin(angle),
      t = 1 - c,
      x = axis.x,
      y = axis.y,
      z = axis.z,
      tx = t * x,
      ty = t * y;
    return this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1), this;
  }
  /**
   * Sets this matrix as a scale transformation.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @param {number} z - The amount to scale in the Z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeScale(x, y, z) {
    return this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1), this;
  }
  /**
   * Sets this matrix as a shear transformation.
   *
   * @param {number} xy - The amount to shear X by Y.
   * @param {number} xz - The amount to shear X by Z.
   * @param {number} yx - The amount to shear Y by X.
   * @param {number} yz - The amount to shear Y by Z.
   * @param {number} zx - The amount to shear Z by X.
   * @param {number} zy - The amount to shear Z by Y.
   * @return {Matrix4} A reference to this matrix.
   */
  makeShear(xy, xz, yx, yz, zx, zy) {
    return this.set(1, yx, zx, 0, xy, 1, zy, 0, xz, yz, 1, 0, 0, 0, 0, 1), this;
  }
  /**
   * Sets this matrix to the transformation composed of the given position,
   * rotation (Quaternion) and scale.
   *
   * @param {Vector3} position - The position vector.
   * @param {Quaternion} quaternion - The rotation as a Quaternion.
   * @param {Vector3} scale - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  compose(position, quaternion, scale) {
    const te = this.elements,
      x = quaternion._x,
      y = quaternion._y,
      z = quaternion._z,
      w = quaternion._w,
      x2 = x + x,
      y2 = y + y,
      z2 = z + z,
      xx = x * x2,
      xy = x * y2,
      xz = x * z2,
      yy = y * y2,
      yz = y * z2,
      zz = z * z2,
      wx = w * x2,
      wy = w * y2,
      wz = w * z2,
      sx = scale.x,
      sy = scale.y,
      sz = scale.z;
    return te[0] = (1 - (yy + zz)) * sx, te[1] = (xy + wz) * sx, te[2] = (xz - wy) * sx, te[3] = 0, te[4] = (xy - wz) * sy, te[5] = (1 - (xx + zz)) * sy, te[6] = (yz + wx) * sy, te[7] = 0, te[8] = (xz + wy) * sz, te[9] = (yz - wx) * sz, te[10] = (1 - (xx + yy)) * sz, te[11] = 0, te[12] = position.x, te[13] = position.y, te[14] = position.z, te[15] = 1, this;
  }
  decompose(position, quaternion, scale) {
    const te = this.elements;
    position.x = te[12], position.y = te[13], position.z = te[14];
    const det = this.determinantAffine();
    if (0 === det) return scale.set(1, 1, 1), quaternion.identity(), this;
    let sx = qr.set(te[0], te[1], te[2]).length();
    const sy = qr.set(te[4], te[5], te[6]).length(),
      sz = qr.set(te[8], te[9], te[10]).length();
    det < 0 && (sx = -sx), matrix4.copy(this);
    const invSX = 1 / sx,
      invSY = 1 / sy,
      invSZ = 1 / sz;
    return matrix4.elements[0] *= invSX, matrix4.elements[1] *= invSX, matrix4.elements[2] *= invSX, matrix4.elements[4] *= invSY, matrix4.elements[5] *= invSY, matrix4.elements[6] *= invSY, matrix4.elements[8] *= invSZ, matrix4.elements[9] *= invSZ, matrix4.elements[10] *= invSZ, quaternion.setFromRotationMatrix(matrix4), scale.x = sx, scale.y = sy, scale.z = sz, this;
  }
  /* 用 left/right/top/bottom/near/far 覆盖列主序 16 个 elements，x/y 比例为 2near/跨度、偏心项为边界和/跨度，w 行为 [0,0,-1,0]。标准 WebGL 深度映射到 [-1,1]，WebGPU 到 [0,1]；reversedDepth 用 near/(far-near)、far*near/(far-near)。返回 this；没有防止零跨度、near=far 或无限 far 的数值退化。 */
  makePerspective(e, t, n, r, i, a, s = WebGLCoordinateSystem, o = !1) {
    const elements = this.elements,
      l = 2 * i / (t - e),
      u = 2 * i / (n - r),
      d = (t + e) / (t - e),
      h = (n + r) / (n - r);
    let p, f;
    if (o) p = i / (a - i), f = a * i / (a - i);else if (s === WebGLCoordinateSystem) p = -(a + i) / (a - i), f = -2 * a * i / (a - i);else {
      if (s !== WebGPUCoordinateSystem) throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + s);
      p = -a / (a - i), f = -a * i / (a - i);
    }
    return elements[0] = l, elements[4] = 0, elements[8] = d, elements[12] = 0, elements[1] = 0, elements[5] = u, elements[9] = h, elements[13] = 0, elements[2] = 0, elements[6] = 0, elements[10] = p, elements[14] = f, elements[3] = 0, elements[7] = 0, elements[11] = -1, elements[15] = 0, this;
  }
  /* 同样完整覆盖矩阵，但横纵比例为 2/跨度，平移为负边界和/跨度，齐次 w=1。WebGL z 比例 -2/(far-near)，WebGPU 为 -1/(far-near)，反向深度为正 1/(far-near) 且平移 far/(far-near)。官方的嵌套 else-if 与本地 guard-throw 是结构差异，不能省略 reversed 分支绕过坐标验证这一行为。 */
  makeOrthographic(e, t, n, r, i, a, s = WebGLCoordinateSystem, o = !1) {
    const elements = this.elements,
      l = 2 / (t - e),
      u = 2 / (n - r),
      d = -(t + e) / (t - e),
      h = -(n + r) / (n - r);
    let p, f;
    if (o) p = 1 / (a - i), f = a / (a - i);else if (s === WebGLCoordinateSystem) p = -2 / (a - i), f = -(a + i) / (a - i);else {
      if (s !== WebGPUCoordinateSystem) throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + s);
      p = -1 / (a - i), f = -i / (a - i);
    }
    return elements[0] = l, elements[4] = 0, elements[8] = 0, elements[12] = d, elements[1] = 0, elements[5] = u, elements[9] = 0, elements[13] = h, elements[2] = 0, elements[6] = 0, elements[10] = p, elements[14] = f, elements[3] = 0, elements[7] = 0, elements[11] = 0, elements[15] = 1, this;
  }
  equals(matrix) {
    const te = this.elements,
      me = matrix.elements;
    for (let i = 0; i < 16; i++) if (te[i] !== me[i]) return !1;
    return !0;
  }
  fromArray(array, offset = 0) {
    for (let i = 0; i < 16; i++) this.elements[i] = array[i + offset];
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(array = [], offset = 0) {
    const te = this.elements;
    return array[offset] = te[0], array[offset + 1] = te[1], array[offset + 2] = te[2], array[offset + 3] = te[3], array[offset + 4] = te[4], array[offset + 5] = te[5], array[offset + 6] = te[6], array[offset + 7] = te[7], array[offset + 8] = te[8], array[offset + 9] = te[9], array[offset + 10] = te[10], array[offset + 11] = te[11], array[offset + 12] = te[12], array[offset + 13] = te[13], array[offset + 14] = te[14], array[offset + 15] = te[15], array;
  }
}
const qr = new Vector3(),
  matrix4 = new Matrix4(),
  _zero = new Vector3(0, 0, 0),
  _one = new Vector3(1, 1, 1),
  Xr = new Vector3(),
  jr = new Vector3(),
  Vr = new Vector3(),
  _matrix$2 = new Matrix4(),
  _quaternion$4 = new Quaternion();
/**
 * A class representing Euler angles.
 *
 * Euler angles describe a rotational transformation by rotating an object on
 * its various axes in specified amounts per axis, and a specified axis
 * order.
 *
 * Iterating through an instance will yield its components (x, y, z,
 * order) in the corresponding order.
 *
 * ```js
 * const a = new THREE.Euler( 0, 1, 1.57, 'XYZ' );
 * const b = new THREE.Vector3( 1, 0, 1 );
 * b.applyEuler(a);
 * ```
 */
class Euler {
  /**
   * Constructs a new euler instance.
   *
   * @param {number} [x=0] - The angle of the x axis in radians.
   * @param {number} [y=0] - The angle of the y axis in radians.
   * @param {number} [z=0] - The angle of the z axis in radians.
   * @param {string} [order=Euler.DEFAULT_ORDER] - A string representing the order that the rotations are applied.
   */
  constructor(x = 0, y = 0, z = 0, order = Euler.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = x, this._y = y, this._z = z, this._order = order;
  }
  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(value) {
    this._z = value, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(value) {
    this._order = value, this._onChangeCallback();
  }
  /**
   * Sets the Euler components.
   *
   * @param {number} x - The angle of the x axis in radians.
   * @param {number} y - The angle of the y axis in radians.
   * @param {number} z - The angle of the z axis in radians.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  set(x, y, z, order = this._order) {
    return this._x = x, this._y = y, this._z = z, this._order = order, this._onChangeCallback(), this;
  }
  /**
   * Returns a new Euler instance with copied values from this instance.
   *
   * @return {Euler} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  /**
   * Copies the values of the given Euler instance to this instance.
   *
   * @param {Euler} euler - The Euler instance to copy.
   * @return {Euler} A reference to this Euler instance.
   */
  copy(euler) {
    return this._x = euler._x, this._y = euler._y, this._z = euler._z, this._order = euler._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(m, order = this._order, update = !0) {
    const te = m.elements,
      m11 = te[0],
      m12 = te[4],
      m13 = te[8],
      m21 = te[1],
      m22 = te[5],
      m23 = te[9],
      m31 = te[2],
      m32 = te[6],
      m33 = te[10];
    switch (order) {
      case "XYZ":
        this._y = Math.asin(clamp(m13, -1, 1)), Math.abs(m13) < .9999999 ? (this._x = Math.atan2(-m23, m33), this._z = Math.atan2(-m12, m11)) : (this._x = Math.atan2(m32, m22), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-clamp(m23, -1, 1)), Math.abs(m23) < .9999999 ? (this._y = Math.atan2(m13, m33), this._z = Math.atan2(m21, m22)) : (this._y = Math.atan2(-m31, m11), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(clamp(m32, -1, 1)), Math.abs(m32) < .9999999 ? (this._y = Math.atan2(-m31, m33), this._z = Math.atan2(-m12, m22)) : (this._y = 0, this._z = Math.atan2(m21, m11));
        break;
      case "ZYX":
        this._y = Math.asin(-clamp(m31, -1, 1)), Math.abs(m31) < .9999999 ? (this._x = Math.atan2(m32, m33), this._z = Math.atan2(m21, m11)) : (this._x = 0, this._z = Math.atan2(-m12, m22));
        break;
      case "YZX":
        this._z = Math.asin(clamp(m21, -1, 1)), Math.abs(m21) < .9999999 ? (this._x = Math.atan2(-m23, m22), this._y = Math.atan2(-m31, m11)) : (this._x = 0, this._y = Math.atan2(m13, m33));
        break;
      case "XZY":
        this._z = Math.asin(-clamp(m12, -1, 1)), Math.abs(m12) < .9999999 ? (this._x = Math.atan2(m32, m22), this._y = Math.atan2(m13, m11)) : (this._x = Math.atan2(-m23, m33), this._y = 0);
        break;
      default:
        warn("Euler: .setFromRotationMatrix() encountered an unknown order: " + order);
    }
    return this._order = order, !0 === update && this._onChangeCallback(), this;
  }
  /**
   * Sets the angles of this Euler instance from a normalized quaternion.
   *
   * @param {Quaternion} q - A normalized Quaternion.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromQuaternion(q, order, update) {
    return _matrix$2.makeRotationFromQuaternion(q), this.setFromRotationMatrix(_matrix$2, order, update);
  }
  /**
   * Sets the angles of this Euler instance from the given vector.
   *
   * @param {Vector3} v - The vector.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromVector3(v, order = this._order) {
    return this.set(v.x, v.y, v.z, order);
  }
  /**
   * Resets the euler angle with a new order by creating a quaternion from this
   * euler angle and then setting this euler angle with the quaternion and the
   * new order.
   *
   * Warning: This discards revolution information.
   *
   * @param {string} [newOrder] - A string representing the new order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  reorder(newOrder) {
    return _quaternion$4.setFromEuler(this), this.setFromQuaternion(_quaternion$4, newOrder);
  }
  /**
   * Returns `true` if this Euler instance is equal with the given one.
   *
   * @param {Euler} euler - The Euler instance to test for equality.
   * @return {boolean} Whether this Euler instance is equal with the given one.
   */
  equals(euler) {
    return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order;
  }
  fromArray(array) {
    return this._x = array[0], this._y = array[1], this._z = array[2], void 0 !== array[3] && (this._order = array[3]), this._onChangeCallback(), this;
  }
  /**
   * Writes the components of this Euler instance to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number,number,number,string>} [array=[]] - The target array holding the Euler components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number,number,number,string>} The Euler components.
   */
  toArray(array = [], offset = 0) {
    return array[offset] = this._x, array[offset + 1] = this._y, array[offset + 2] = this._z, array[offset + 3] = this._order, array;
  }
  _onChange(callback) {
    return this._onChangeCallback = callback, this;
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
Euler.DEFAULT_ORDER = "XYZ";
/**
 * A layers object assigns an 3D object to 1 or more of 32
 * layers numbered `0` to `31` - internally the layers are stored as a
 * bit mask], and by default all 3D objects are a member of layer `0`.
 *
 * This can be used to control visibility - an object must share a layer with
 * a camera to be visible when that camera's view is
 * rendered.
 *
 * All classes that inherit from {@link Object3D} have an `layers` property which
 * is an instance of this class.
 */
class Layers {
  constructor() {
    this.mask = 1;
  }
  set(layer) {
    this.mask = 1 << layer >>> 0;
  }
  enable(layer) {
    this.mask |= 1 << layer;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(layer) {
    this.mask ^= 1 << layer;
  }
  disable(layer) {
    this.mask &= ~(1 << layer);
  }
  disableAll() {
    this.mask = 0;
  }
  test(layers) {
    return 0 !== (this.mask & layers.mask);
  }
  isEnabled(layer) {
    return !!(this.mask & 1 << layer);
  }
}
let Jr = 0;
const _v1$6 = new Vector3(),
  _q1 = new Quaternion(),
  _m1$1 = new Matrix4(),
  _target = new Vector3(),
  _position$4 = new Vector3(),
  _scale$3 = new Vector3(),
  _quaternion$3 = new Quaternion(),
  _xAxis = new Vector3(1, 0, 0),
  _yAxis = new Vector3(0, 1, 0),
  _zAxis = new Vector3(0, 0, 1),
  ci = {
    type: "added"
  },
  li = {
    type: "removed"
  },
  ui = {
    type: "childadded",
    child: null
  },
  di = {
    type: "childremoved",
    child: null
  };
/**
 * This is the base class for most objects in three.js and provides a set of
 * properties and methods for manipulating objects in 3D space.
 *
 * @augments EventDispatcher
 */
class Object3D extends EventDispatcher {
  /* 建立递增只读 id、随机 uuid、parent=null、独有 children/userData/animations、克隆 DEFAULT_UP。position/rotation/quaternion/scale 是新对象；Euler 和 quaternion 的 change 回调双向同步，传 false 避免递归通知。children 不共享，父子关系此时为空；这里只初始化，不计算世界变换。 */
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", {
      value: Jr++
    }), this.uuid = generateUUID(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = Object3D.DEFAULT_UP.clone();
    const e = new Vector3(),
      euler = new Euler(),
      n = new Quaternion(),
      r = new Vector3(1, 1, 1);
    euler._onChange(function () {
      n.setFromEuler(euler, !1);
    }), n._onChange(function () {
      euler.setFromQuaternion(n, void 0, !1);
    }), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: euler
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      modelViewMatrix: {
        value: new Matrix4()
      },
      normalMatrix: {
        value: new Matrix3()
      }
    }), this.matrix = new Matrix4(), this.matrixWorld = new Matrix4(), this.matrixAutoUpdate = Object3D.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Layers(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
  }
  /**
   * A callback that is executed immediately before a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeShadow() {}
  /**
   * A callback that is executed immediately after a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onAfterShadow() {}
  /**
   * A callback that is executed immediately before a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeRender() {}
  /**
   * A callback that is executed immediately after a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onAfterRender() {}
  /**
   * Applies the given transformation matrix to the object and updates the object's position,
   * rotation and scale.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   */
  applyMatrix4(matrix) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(matrix), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  /**
   * Applies a rotation represented by given the quaternion to the 3D object.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Object3D} A reference to this instance.
   */
  applyQuaternion(q) {
    return this.quaternion.premultiply(q), this;
  }
  /**
   * Sets the given rotation represented as an axis/angle couple to the 3D object.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   */
  setRotationFromAxisAngle(axis, angle) {
    this.quaternion.setFromAxisAngle(axis, angle);
  }
  /**
   * Sets the given rotation represented as Euler angles to the 3D object.
   *
   * @param {Euler} euler - The Euler angles.
   */
  setRotationFromEuler(euler) {
    this.quaternion.setFromEuler(euler, !0);
  }
  /**
   * Sets the given rotation represented as rotation matrix to the 3D object.
   *
   * @param {Matrix4} m - Although a 4x4 matrix is expected, the upper 3x3 portion must be
   * a pure rotation matrix (i.e, unscaled).
   */
  setRotationFromMatrix(m) {
    this.quaternion.setFromRotationMatrix(m);
  }
  /**
   * Sets the given rotation represented as a Quaternion to the 3D object.
   *
   * @param {Quaternion} q - The Quaternion
   */
  setRotationFromQuaternion(q) {
    this.quaternion.copy(q);
  }
  /**
   * Rotates the 3D object along an axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnAxis(axis, angle) {
    return _q1.setFromAxisAngle(axis, angle), this.quaternion.multiply(_q1), this;
  }
  /**
   * Rotates the 3D object along an axis in world space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnWorldAxis(axis, angle) {
    return _q1.setFromAxisAngle(axis, angle), this.quaternion.premultiply(_q1), this;
  }
  /**
   * Rotates the 3D object around its X axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateX(angle) {
    return this.rotateOnAxis(_xAxis, angle);
  }
  /**
   * Rotates the 3D object around its Y axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateY(angle) {
    return this.rotateOnAxis(_yAxis, angle);
  }
  /**
   * Rotates the 3D object around its Z axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateZ(angle) {
    return this.rotateOnAxis(_zAxis, angle);
  }
  /**
   * Translate the 3D object by a distance along the given axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateOnAxis(axis, distance) {
    return _v1$6.copy(axis).applyQuaternion(this.quaternion), this.position.add(_v1$6.multiplyScalar(distance)), this;
  }
  /**
   * Translate the 3D object by a distance along its X-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateX(distance) {
    return this.translateOnAxis(_xAxis, distance);
  }
  /**
   * Translate the 3D object by a distance along its Y-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateY(distance) {
    return this.translateOnAxis(_yAxis, distance);
  }
  /**
   * Translate the 3D object by a distance along its Z-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateZ(distance) {
    return this.translateOnAxis(_zAxis, distance);
  }
  /**
   * Converts the given vector from this 3D object's local space to world space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  localToWorld(vector) {
    return this.updateWorldMatrix(!0, !1), vector.applyMatrix4(this.matrixWorld);
  }
  /**
   * Converts the given vector from this 3D object's world space to local space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  worldToLocal(vector) {
    return this.updateWorldMatrix(!0, !1), vector.applyMatrix4(_m1$1.copy(this.matrixWorld).invert());
  }
  /**
   * Rotates the object to face a point in world space.
   *
   * This method does not support objects having non-uniformly-scaled parent(s).
   *
   * @param {number|Vector3} x - The x coordinate in world space. Alternatively, a vector representing a position in world space
   * @param {number} [y] - The y coordinate in world space.
   * @param {number} [z] - The z coordinate in world space.
   */
  lookAt(x, y, z) {
    x.isVector3 ? _target.copy(x) : _target.set(x, y, z);
    const parent = this.parent;
    this.updateWorldMatrix(!0, !1), _position$4.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? _m1$1.lookAt(_position$4, _target, this.up) : _m1$1.lookAt(_target, _position$4, this.up), this.quaternion.setFromRotationMatrix(_m1$1), parent && (_m1$1.extractRotation(parent.matrixWorld), _q1.setFromRotationMatrix(_m1$1), this.quaternion.premultiply(_q1.invert()));
  }
  add(object) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) this.add(arguments[i]);
      return this;
    }
    return object === this ? (error("Object3D.add: object can't be added as a child of itself.", object), this) : (object && object.isObject3D ? (object.removeFromParent(), object.parent = this, this.children.push(object), object.dispatchEvent(ci), ui.child = object, this.dispatchEvent(ui), ui.child = null) : error("Object3D.add: object not an instance of THREE.Object3D.", object), this);
  }
  remove(object) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++) this.remove(arguments[i]);
      return this;
    }
    const index = this.children.indexOf(object);
    return -1 !== index && (object.parent = null, this.children.splice(index, 1), object.dispatchEvent(li), di.child = object, this.dispatchEvent(di), di.child = null), this;
  }
  removeFromParent() {
    const parent = this.parent;
    return null !== parent && parent.remove(this), this;
  }
  /**
   * Removes all child objects.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  clear() {
    return this.remove(...this.children);
  }
  attach(object) {
    return this.updateWorldMatrix(!0, !1), _m1$1.copy(this.matrixWorld).invert(), null !== object.parent && (object.parent.updateWorldMatrix(!0, !1), _m1$1.multiply(object.parent.matrixWorld)), object.applyMatrix4(_m1$1), object.removeFromParent(), object.parent = this, this.children.push(object), object.updateWorldMatrix(!1, !0), object.dispatchEvent(ci), ui.child = object, this.dispatchEvent(ui), ui.child = null, this;
  }
  getObjectById(id) {
    return this.getObjectByProperty("id", id);
  }
  getObjectByName(name) {
    return this.getObjectByProperty("name", name);
  }
  getObjectByProperty(name, value) {
    if (this[name] === value) return this;
    for (let i = 0, l = this.children.length; i < l; i++) {
      const object = this.children[i].getObjectByProperty(name, value);
      if (void 0 !== object) return object;
    }
  }
  getObjectsByProperty(name, value, result = []) {
    this[name] === value && result.push(this);
    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) children[i].getObjectsByProperty(name, value, result);
    return result;
  }
  /**
   * Returns a vector representing the position of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's position in world space.
   */
  getWorldPosition(target) {
    return this.updateWorldMatrix(!0, !1), target.setFromMatrixPosition(this.matrixWorld);
  }
  /**
   * Returns a Quaternion representing the position of the 3D object in world space.
   *
   * @param {Quaternion} target - The target Quaternion the result is stored to.
   * @return {Quaternion} The 3D object's rotation in world space.
   */
  getWorldQuaternion(target) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(_position$4, target, _scale$3), target;
  }
  /**
   * Returns a vector representing the scale of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's scale in world space.
   */
  getWorldScale(target) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(_position$4, _quaternion$3, target), target;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(target) {
    this.updateWorldMatrix(!0, !1);
    const e = this.matrixWorld.elements;
    return target.set(e[8], e[9], e[10]).normalize();
  }
  /**
   * Abstract method to get intersections between a casted ray and this
   * 3D object. Renderable 3D objects such as {@link Mesh}, {@link Line} or {@link Points}
   * implement this method in order to use raycasting.
   *
   * @abstract
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - An array holding the result of the method.
   */
  raycast() {}
  traverse(callback) {
    callback(this);
    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) children[i].traverse(callback);
  }
  traverseVisible(callback) {
    if (!1 === this.visible) return;
    callback(this);
    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) children[i].traverseVisible(callback);
  }
  traverseAncestors(callback) {
    const parent = this.parent;
    null !== parent && (callback(parent), parent.traverseAncestors(callback));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    const pivot = this.pivot;
    if (null !== pivot) {
      const px = pivot.x,
        py = pivot.y,
        pz = pivot.z,
        te = this.matrix.elements;
      te[12] += px - te[0] * px - te[4] * py - te[8] * pz, te[13] += py - te[1] * px - te[5] * py - te[9] * pz, te[14] += pz - te[2] * px - te[6] * py - te[10] * pz;
    }
    this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(force) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || force) && (!0 === this.matrixWorldAutoUpdate && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, force = !0);
    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) {
      children[i].updateMatrixWorld(force);
    }
  }
  updateWorldMatrix(updateParents, updateChildren, force = !1) {
    const parent = this.parent;
    if (!0 === updateParents && null !== parent && parent.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || force) && (!0 === this.matrixWorldAutoUpdate && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, force = !0), !0 === updateChildren) {
      const children = this.children;
      for (let i = 0, l = children.length; i < l; i++) {
        children[i].updateWorldMatrix(!1, !0, force);
      }
    }
  }
  toJSON(meta) {
    const isRootObject = void 0 === meta || "string" == typeof meta,
      output = {};
    isRootObject && (meta = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, output.metadata = {
      version: 4.7,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const object = {};
    function serialize(library, element) {
      return void 0 === library[element.uuid] && (library[element.uuid] = element.toJSON(meta)), element.uuid;
    }
    if (object.uuid = this.uuid, object.type = this.type, "" !== this.name && (object.name = this.name), !0 === this.castShadow && (object.castShadow = !0), !0 === this.receiveShadow && (object.receiveShadow = !0), !1 === this.visible && (object.visible = !1), !1 === this.frustumCulled && (object.frustumCulled = !1), 0 !== this.renderOrder && (object.renderOrder = this.renderOrder), !1 !== this.static && (object.static = this.static), Object.keys(this.userData).length > 0 && (object.userData = this.userData), object.layers = this.layers.mask, object.matrix = this.matrix.toArray(), object.up = this.up.toArray(), null !== this.pivot && (object.pivot = this.pivot.toArray()), !1 === this.matrixAutoUpdate && (object.matrixAutoUpdate = !1), void 0 !== this.morphTargetDictionary && (object.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), void 0 !== this.morphTargetInfluences && (object.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (object.type = "InstancedMesh", object.count = this.count, object.instanceMatrix = this.instanceMatrix.toJSON(), null !== this.instanceColor && (object.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (object.type = "BatchedMesh", object.perObjectFrustumCulled = this.perObjectFrustumCulled, object.sortObjects = this.sortObjects, object.drawRanges = this._drawRanges, object.reservedRanges = this._reservedRanges, object.geometryInfo = this._geometryInfo.map(info => ({
      ...info,
      boundingBox: info.boundingBox ? info.boundingBox.toJSON() : void 0,
      boundingSphere: info.boundingSphere ? info.boundingSphere.toJSON() : void 0
    })), object.instanceInfo = this._instanceInfo.map(info => ({
      ...info
    })), object.availableInstanceIds = this._availableInstanceIds.slice(), object.availableGeometryIds = this._availableGeometryIds.slice(), object.nextIndexStart = this._nextIndexStart, object.nextVertexStart = this._nextVertexStart, object.geometryCount = this._geometryCount, object.maxInstanceCount = this._maxInstanceCount, object.maxVertexCount = this._maxVertexCount, object.maxIndexCount = this._maxIndexCount, object.geometryInitialized = this._geometryInitialized, object.matricesTexture = this._matricesTexture.toJSON(meta), object.indirectTexture = this._indirectTexture.toJSON(meta), null !== this._colorsTexture && (object.colorsTexture = this._colorsTexture.toJSON(meta)), null !== this.boundingSphere && (object.boundingSphere = this.boundingSphere.toJSON()), null !== this.boundingBox && (object.boundingBox = this.boundingBox.toJSON())), this.isScene) this.background && (this.background.isColor ? object.background = this.background.toJSON() : this.background.isTexture && (object.background = this.background.toJSON(meta).uuid)), this.environment && this.environment.isTexture && !0 !== this.environment.isRenderTargetTexture && (object.environment = this.environment.toJSON(meta).uuid);else if (this.isMesh || this.isLine || this.isPoints) {
      object.geometry = serialize(meta.geometries, this.geometry);
      const parameters = this.geometry.parameters;
      if (void 0 !== parameters && void 0 !== parameters.shapes) {
        const shapes = parameters.shapes;
        if (Array.isArray(shapes)) for (let i = 0, l = shapes.length; i < l; i++) {
          const shape = shapes[i];
          serialize(meta.shapes, shape);
        } else serialize(meta.shapes, shapes);
      }
    }
    if (this.isSkinnedMesh && (object.bindMode = this.bindMode, object.bindMatrix = this.bindMatrix.toArray(), void 0 !== this.skeleton && (serialize(meta.skeletons, this.skeleton), object.skeleton = this.skeleton.uuid)), void 0 !== this.material) if (Array.isArray(this.material)) {
      const uuids = [];
      for (let i = 0, l = this.material.length; i < l; i++) uuids.push(serialize(meta.materials, this.material[i]));
      object.material = uuids;
    } else object.material = serialize(meta.materials, this.material);
    if (this.children.length > 0) {
      object.children = [];
      for (let i = 0; i < this.children.length; i++) object.children.push(this.children[i].toJSON(meta).object);
    }
    if (this.animations.length > 0) {
      object.animations = [];
      for (let i = 0; i < this.animations.length; i++) {
        const animation = this.animations[i];
        object.animations.push(serialize(meta.animations, animation));
      }
    }
    if (isRootObject) {
      const geometries = extractFromCache(meta.geometries),
        materials = extractFromCache(meta.materials),
        textures = extractFromCache(meta.textures),
        images = extractFromCache(meta.images),
        shapes = extractFromCache(meta.shapes),
        skeletons = extractFromCache(meta.skeletons),
        animations = extractFromCache(meta.animations),
        nodes = extractFromCache(meta.nodes);
      geometries.length > 0 && (output.geometries = geometries), materials.length > 0 && (output.materials = materials), textures.length > 0 && (output.textures = textures), images.length > 0 && (output.images = images), shapes.length > 0 && (output.shapes = shapes), skeletons.length > 0 && (output.skeletons = skeletons), animations.length > 0 && (output.animations = animations), nodes.length > 0 && (output.nodes = nodes);
    }
    return output.object = object, output;
    function extractFromCache(cache) {
      const values = [];
      for (const key in cache) {
        const data = cache[key];
        delete data.metadata, values.push(data);
      }
      return values;
    }
  }
  /**
   * Returns a new 3D object with copied values from this instance.
   *
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are also cloned.
   * @return {Object3D} A clone of this instance.
   */
  clone(recursive) {
    return new this.constructor().copy(this, recursive);
  }
  copy(source, recursive = !0) {
    if (this.name = source.name, this.up.copy(source.up), this.position.copy(source.position), this.rotation.order = source.rotation.order, this.quaternion.copy(source.quaternion), this.scale.copy(source.scale), this.pivot = null !== source.pivot ? source.pivot.clone() : null, this.matrix.copy(source.matrix), this.matrixWorld.copy(source.matrixWorld), this.matrixAutoUpdate = source.matrixAutoUpdate, this.matrixWorldAutoUpdate = source.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate, this.layers.mask = source.layers.mask, this.visible = source.visible, this.castShadow = source.castShadow, this.receiveShadow = source.receiveShadow, this.frustumCulled = source.frustumCulled, this.renderOrder = source.renderOrder, this.static = source.static, this.animations = source.animations.slice(), this.userData = JSON.parse(JSON.stringify(source.userData)), !0 === recursive) for (let i = 0; i < source.children.length; i++) {
      const child = source.children[i];
      this.add(child.clone());
    }
    return this;
  }
}
Object3D.DEFAULT_UP = new Vector3(0, 1, 0), Object3D.DEFAULT_MATRIX_AUTO_UPDATE = !0, Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
class Group extends Object3D {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const hi = {
  type: "move"
};
/**
 * Class for representing a XR controller with its
 * different coordinate systems.
 *
 * @private
 */
class WebXRController {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return null === this._hand && (this._hand = new Group(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = {
      pinching: !1
    }), this._hand;
  }
  getTargetRaySpace() {
    return null === this._targetRay && (this._targetRay = new Group(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new Vector3(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new Vector3()), this._targetRay;
  }
  getGripSpace() {
    return null === this._grip && (this._grip = new Group(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new Vector3(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new Vector3(), this._grip.eventsEnabled = !1), this._grip;
  }
  dispatchEvent(event) {
    return null !== this._targetRay && this._targetRay.dispatchEvent(event), null !== this._grip && this._grip.dispatchEvent(event), null !== this._hand && this._hand.dispatchEvent(event), this;
  }
  connect(inputSource) {
    if (inputSource && inputSource.hand) {
      const hand = this._hand;
      if (hand) for (const inputjoint of inputSource.hand.values()) this._getHandJoint(hand, inputjoint);
    }
    return this.dispatchEvent({
      type: "connected",
      data: inputSource
    }), this;
  }
  disconnect(inputSource) {
    return this.dispatchEvent({
      type: "disconnected",
      data: inputSource
    }), null !== this._targetRay && (this._targetRay.visible = !1), null !== this._grip && (this._grip.visible = !1), null !== this._hand && (this._hand.visible = !1), this;
  }
  update(inputSource, frame, referenceSpace) {
    let inputPose = null,
      gripPose = null,
      handPose = null;
    const targetRay = this._targetRay,
      grip = this._grip,
      hand = this._hand;
    if (inputSource && "visible-blurred" !== frame.session.visibilityState) {
      if (hand && inputSource.hand) {
        handPose = !0;
        for (const inputjoint of inputSource.hand.values()) {
          const jointPose = frame.getJointPose(inputjoint, referenceSpace),
            joint = this._getHandJoint(hand, inputjoint);
          null !== jointPose && (joint.matrix.fromArray(jointPose.transform.matrix), joint.matrix.decompose(joint.position, joint.rotation, joint.scale), joint.matrixWorldNeedsUpdate = !0, joint.jointRadius = jointPose.radius), joint.visible = null !== jointPose;
        }
        const indexTip = hand.joints["index-finger-tip"],
          thumbTip = hand.joints["thumb-tip"],
          distance = indexTip.position.distanceTo(thumbTip.position),
          distanceToPinch = .02,
          threshold = .005;
        hand.inputState.pinching && distance > distanceToPinch + threshold ? (hand.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: inputSource.handedness,
          target: this
        })) : !hand.inputState.pinching && distance <= distanceToPinch - threshold && (hand.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: inputSource.handedness,
          target: this
        }));
      } else null !== grip && inputSource.gripSpace && (gripPose = frame.getPose(inputSource.gripSpace, referenceSpace), null !== gripPose && (grip.matrix.fromArray(gripPose.transform.matrix), grip.matrix.decompose(grip.position, grip.rotation, grip.scale), grip.matrixWorldNeedsUpdate = !0, gripPose.linearVelocity ? (grip.hasLinearVelocity = !0, grip.linearVelocity.copy(gripPose.linearVelocity)) : grip.hasLinearVelocity = !1, gripPose.angularVelocity ? (grip.hasAngularVelocity = !0, grip.angularVelocity.copy(gripPose.angularVelocity)) : grip.hasAngularVelocity = !1, grip.eventsEnabled && grip.dispatchEvent({
        type: "gripUpdated",
        data: inputSource,
        target: this
      })));
      null !== targetRay && (inputPose = frame.getPose(inputSource.targetRaySpace, referenceSpace), null === inputPose && null !== gripPose && (inputPose = gripPose), null !== inputPose && (targetRay.matrix.fromArray(inputPose.transform.matrix), targetRay.matrix.decompose(targetRay.position, targetRay.rotation, targetRay.scale), targetRay.matrixWorldNeedsUpdate = !0, inputPose.linearVelocity ? (targetRay.hasLinearVelocity = !0, targetRay.linearVelocity.copy(inputPose.linearVelocity)) : targetRay.hasLinearVelocity = !1, inputPose.angularVelocity ? (targetRay.hasAngularVelocity = !0, targetRay.angularVelocity.copy(inputPose.angularVelocity)) : targetRay.hasAngularVelocity = !1, this.dispatchEvent(hi)));
    }
    return null !== targetRay && (targetRay.visible = null !== inputPose), null !== grip && (grip.visible = null !== gripPose), null !== hand && (hand.visible = null !== handPose), this;
  }
  _getHandJoint(hand, inputjoint) {
    if (void 0 === hand.joints[inputjoint.jointName]) {
      const joint = new Group();
      joint.matrixAutoUpdate = !1, joint.visible = !1, hand.joints[inputjoint.jointName] = joint, hand.add(joint);
    }
    return hand.joints[inputjoint.jointName];
  }
}
const pi = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  },
  _hslA = {
    h: 0,
    s: 0,
    l: 0
  },
  _hslB = {
    h: 0,
    s: 0,
    l: 0
  };
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：hue2rgb。 */
function hue2rgb(p, q, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? p + 6 * (q - p) * t : t < .5 ? q : t < 2 / 3 ? p + 6 * (q - p) * (2 / 3 - t) : p;
}
/**
 * A Color instance is represented by RGB components in the linear <i>working
 * color space</i>, which defaults to `LinearSRGBColorSpace`. Inputs
 * conventionally using `SRGBColorSpace` (such as hexadecimals and CSS
 * strings) are converted to the working color space automatically.
 *
 * ```js
 * // converted automatically from SRGBColorSpace to LinearSRGBColorSpace
 * const color = new THREE.Color().setHex( 0x112233 );
 * ```
 * Source color spaces may be specified explicitly, to ensure correct conversions.
 * ```js
 * // assumed already LinearSRGBColorSpace; no conversion
 * const color = new THREE.Color().setRGB( 0.5, 0.5, 0.5 );
 *
 * // converted explicitly from SRGBColorSpace to LinearSRGBColorSpace
 * const color = new THREE.Color().setRGB( 0.5, 0.5, 0.5, SRGBColorSpace );
 * ```
 * If THREE.ColorManagement is disabled, no conversions occur. For details,
 * see <i>Color management</i>. Iterating through a Color instance will yield
 * its components (r, g, b) in the corresponding order. A Color can be initialised
 * in any of the following ways:
 * ```js
 * //empty constructor - will default white
 * const color1 = new THREE.Color();
 *
 * //Hexadecimal color (recommended)
 * const color2 = new THREE.Color( 0xff0000 );
 *
 * //RGB string
 * const color3 = new THREE.Color("rgb(255, 0, 0)");
 * const color4 = new THREE.Color("rgb(100%, 0%, 0%)");
 *
 * //X11 color name - all 140 color names are supported.
 * //Note the lack of CamelCase in the name
 * const color5 = new THREE.Color( 'skyblue' );
 * //HSL string
 * const color6 = new THREE.Color("hsl(0, 100%, 50%)");
 *
 * //Separate RGB values between 0 and 1
 * const color7 = new THREE.Color( 1, 0, 0 );
 * ```
 */
class Color {
  /**
   * Constructs a new color.
   *
   * Note that standard method of specifying color in three.js is with a hexadecimal triplet,
   * and that method is used throughout the rest of the documentation.
   *
   * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
   * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
   * @param {number} [g] - The green component.
   * @param {number} [b] - The blue component.
   */
  constructor(r, g, b) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(r, g, b);
  }
  set(r, g, b) {
    if (void 0 === g && void 0 === b) {
      const value = r;
      value && value.isColor ? this.copy(value) : "number" == typeof value ? this.setHex(value) : "string" == typeof value && this.setStyle(value);
    } else this.setRGB(r, g, b);
    return this;
  }
  /**
   * Sets the colors's components to the given scalar value.
   *
   * @param {number} scalar - The scalar value.
   * @return {Color} A reference to this color.
   */
  setScalar(scalar) {
    return this.r = scalar, this.g = scalar, this.b = scalar, this;
  }
  setHex(hex, colorSpace = SRGBColorSpace) {
    return hex = Math.floor(hex), this.r = (hex >> 16 & 255) / 255, this.g = (hex >> 8 & 255) / 255, this.b = (255 & hex) / 255, ColorManagement.colorSpaceToWorking(this, colorSpace), this;
  }
  /**
   * Sets this color from RGB values.
   *
   * @param {number} r - Red channel value between `0.0` and `1.0`.
   * @param {number} g - Green channel value between `0.0` and `1.0`.
   * @param {number} b - Blue channel value between `0.0` and `1.0`.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setRGB(r, g, b, colorSpace = ColorManagement.workingColorSpace) {
    return this.r = r, this.g = g, this.b = b, ColorManagement.colorSpaceToWorking(this, colorSpace), this;
  }
  setHSL(h, s, l, colorSpace = ColorManagement.workingColorSpace) {
    if (h = euclideanModulo(h, 1), s = clamp(s, 0, 1), l = clamp(l, 0, 1), 0 === s) this.r = this.g = this.b = l;else {
      const p = l <= .5 ? l * (1 + s) : l + s - l * s,
        q = 2 * l - p;
      this.r = hue2rgb(q, p, h + 1 / 3), this.g = hue2rgb(q, p, h), this.b = hue2rgb(q, p, h - 1 / 3);
    }
    return ColorManagement.colorSpaceToWorking(this, colorSpace), this;
  }
  /* 解析 rgb/rgba 整数或百分比、hsl/hsla、3/6 位 hex，否则走颜色名。RGB 分别以 255/100 上限截断并归一化，HSL 角度除 360；颜色空间默认 SRGBColorSpace，经 setRGB/setHSL 转入工作空间。正则不是现代 CSS 任意语法解析器。 */
  setStyle(e, t = SRGBColorSpace) {
    function n(t) {
      void 0 !== t && parseFloat(t) < 1 && warn("Color: Alpha component of " + e + " will be ignored.");
    }
    let r;
    if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let i;
      const a = r[1],
        s = r[2];
      switch (a) {
        case "rgb":
        case "rgba":
          if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)) return n(i[4]), this.setRGB(Math.min(255, parseInt(i[1], 10)) / 255, Math.min(255, parseInt(i[2], 10)) / 255, Math.min(255, parseInt(i[3], 10)) / 255, t);
          if (i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)) return n(i[4]), this.setRGB(Math.min(100, parseInt(i[1], 10)) / 100, Math.min(100, parseInt(i[2], 10)) / 100, Math.min(100, parseInt(i[3], 10)) / 100, t);
          break;
        case "hsl":
        case "hsla":
          if (i = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)) return n(i[4]), this.setHSL(parseFloat(i[1]) / 360, parseFloat(i[2]) / 100, parseFloat(i[3]) / 100, t);
          break;
        default:
          warn("Color: Unknown color model " + e);
      }
    } else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const n = r[1],
        i = n.length;
      if (3 === i) return this.setRGB(parseInt(n.charAt(0), 16) / 15, parseInt(n.charAt(1), 16) / 15, parseInt(n.charAt(2), 16) / 15, t);
      if (6 === i) return this.setHex(parseInt(n, 16), t);
      warn("Color: Invalid hex color " + e);
    } else if (e && e.length > 0) return this.setColorName(e, t);
    return this;
  }
  setColorName(style, colorSpace = SRGBColorSpace) {
    const hex = pi[style.toLowerCase()];
    return void 0 !== hex ? this.setHex(hex, colorSpace) : warn("Color: Unknown color " + style), this;
  }
  /**
   * Returns a new color with copied values from this instance.
   *
   * @return {Color} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  /**
   * Copies the values of the given color to this instance.
   *
   * @param {Color} color - The color to copy.
   * @return {Color} A reference to this color.
   */
  copy(color) {
    return this.r = color.r, this.g = color.g, this.b = color.b, this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copySRGBToLinear(color) {
    return this.r = SRGBToLinear(color.r), this.g = SRGBToLinear(color.g), this.b = SRGBToLinear(color.b), this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copyLinearToSRGB(color) {
    return this.r = LinearToSRGB(color.r), this.g = LinearToSRGB(color.g), this.b = LinearToSRGB(color.b), this;
  }
  /**
   * Converts this color from `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  /**
   * Converts this color from `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(colorSpace = SRGBColorSpace) {
    return ColorManagement.workingToColorSpace(_color.copy(this), colorSpace), 65536 * Math.round(clamp(255 * _color.r, 0, 255)) + 256 * Math.round(clamp(255 * _color.g, 0, 255)) + Math.round(clamp(255 * _color.b, 0, 255));
  }
  getHexString(colorSpace = SRGBColorSpace) {
    return ("000000" + this.getHex(colorSpace).toString(16)).slice(-6);
  }
  /* 把 this 复制到共享临时 Color 并转换到请求空间，避免改 this。max/min 给 lightness=(max+min)/2；灰阶 h=s=0；其余按亮度选择 saturation 分母、按最大通道选择 hue 扇区，再除 6。数值不是强制 clamp，不能把工作空间原始 RGB 直接当成 sRGB。 */
  getHSL(e, t = ColorManagement.workingColorSpace) {
    ColorManagement.workingToColorSpace(_color.copy(this), t);
    const n = _color.r,
      r = _color.g,
      i = _color.b,
      a = Math.max(n, r, i),
      s = Math.min(n, r, i);
    let o, c;
    const l = (s + a) / 2;
    if (s === a) o = 0, c = 0;else {
      const e = a - s;
      switch (c = l <= .5 ? e / (a + s) : e / (2 - a - s), a) {
        case n:
          o = (r - i) / e + (r < i ? 6 : 0);
          break;
        case r:
          o = (i - n) / e + 2;
          break;
        case i:
          o = (n - r) / e + 4;
      }
      o /= 6;
    }
    return e.h = o, e.s = c, e.l = l, e;
  }
  /**
   * Returns the RGB values of this color and stores them into the given target object.
   *
   * @param {Color} target - The target color that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} The RGB representation of this color.
   */
  getRGB(target, colorSpace = ColorManagement.workingColorSpace) {
    return ColorManagement.workingToColorSpace(_color.copy(this), colorSpace), target.r = _color.r, target.g = _color.g, target.b = _color.b, target;
  }
  getStyle(colorSpace = SRGBColorSpace) {
    ColorManagement.workingToColorSpace(_color.copy(this), colorSpace);
    const r = _color.r,
      g = _color.g,
      b = _color.b;
    return colorSpace !== SRGBColorSpace ? `color(${colorSpace} ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)})` : `rgb(${Math.round(255 * r)},${Math.round(255 * g)},${Math.round(255 * b)})`;
  }
  /**
   * Adds the given HSL values to this color's values.
   * Internally, this converts the color's RGB values to HSL, adds HSL
   * and then converts the color back to RGB.
   *
   * @param {number} h - Hue value between `0.0` and `1.0`.
   * @param {number} s - Saturation value between `0.0` and `1.0`.
   * @param {number} l - Lightness value between `0.0` and `1.0`.
   * @return {Color} A reference to this color.
   */
  offsetHSL(h, s, l) {
    return this.getHSL(_hslA), this.setHSL(_hslA.h + h, _hslA.s + s, _hslA.l + l);
  }
  /**
   * Adds the RGB values of the given color to the RGB values of this color.
   *
   * @param {Color} color - The color to add.
   * @return {Color} A reference to this color.
   */
  add(color) {
    return this.r += color.r, this.g += color.g, this.b += color.b, this;
  }
  /**
   * Adds the RGB values of the given colors and stores the result in this instance.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @return {Color} A reference to this color.
   */
  addColors(color1, color2) {
    return this.r = color1.r + color2.r, this.g = color1.g + color2.g, this.b = color1.b + color2.b, this;
  }
  /**
   * Adds the given scalar value to the RGB values of this color.
   *
   * @param {number} s - The scalar to add.
   * @return {Color} A reference to this color.
   */
  addScalar(s) {
    return this.r += s, this.g += s, this.b += s, this;
  }
  /**
   * Subtracts the RGB values of the given color from the RGB values of this color.
   *
   * @param {Color} color - The color to subtract.
   * @return {Color} A reference to this color.
   */
  sub(color) {
    return this.r = Math.max(0, this.r - color.r), this.g = Math.max(0, this.g - color.g), this.b = Math.max(0, this.b - color.b), this;
  }
  /**
   * Multiplies the RGB values of the given color with the RGB values of this color.
   *
   * @param {Color} color - The color to multiply.
   * @return {Color} A reference to this color.
   */
  multiply(color) {
    return this.r *= color.r, this.g *= color.g, this.b *= color.b, this;
  }
  /**
   * Multiplies the given scalar value with the RGB values of this color.
   *
   * @param {number} s - The scalar to multiply.
   * @return {Color} A reference to this color.
   */
  multiplyScalar(s) {
    return this.r *= s, this.g *= s, this.b *= s, this;
  }
  /**
   * Linearly interpolates this color's RGB values toward the RGB values of the
   * given color. The alpha argument can be thought of as the ratio between
   * the two colors, where `0.0` is this color and `1.0` is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerp(color, alpha) {
    return this.r += (color.r - this.r) * alpha, this.g += (color.g - this.g) * alpha, this.b += (color.b - this.b) * alpha, this;
  }
  /**
   * Linearly interpolates between the given colors and stores the result in this instance.
   * The alpha argument can be thought of as the ratio between the two colors, where `0.0`
   * is the first and `1.0` is the second color.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpColors(color1, color2, alpha) {
    return this.r = color1.r + (color2.r - color1.r) * alpha, this.g = color1.g + (color2.g - color1.g) * alpha, this.b = color1.b + (color2.b - color1.b) * alpha, this;
  }
  /**
   * Linearly interpolates this color's HSL values toward the HSL values of the
   * given color. It differs from {@link Color#lerp} by not interpolating straight
   * from one color to the other, but instead going through all the hues in between
   * those two colors. The alpha argument can be thought of as the ratio between
   * the two colors, where 0.0 is this color and 1.0 is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpHSL(color, alpha) {
    this.getHSL(_hslA), color.getHSL(_hslB);
    const h = lerp(_hslA.h, _hslB.h, alpha),
      s = lerp(_hslA.s, _hslB.s, alpha),
      l = lerp(_hslA.l, _hslB.l, alpha);
    return this.setHSL(h, s, l), this;
  }
  /**
   * Sets the color's RGB components from the given 3D vector.
   *
   * @param {Vector3} v - The vector to set.
   * @return {Color} A reference to this color.
   */
  setFromVector3(v) {
    return this.r = v.x, this.g = v.y, this.b = v.z, this;
  }
  /**
   * Transforms this color with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix.
   * @return {Color} A reference to this color.
   */
  applyMatrix3(m) {
    const r = this.r,
      g = this.g,
      b = this.b,
      e = m.elements;
    return this.r = e[0] * r + e[3] * g + e[6] * b, this.g = e[1] * r + e[4] * g + e[7] * b, this.b = e[2] * r + e[5] * g + e[8] * b, this;
  }
  /**
   * Returns `true` if this color is equal with the given one.
   *
   * @param {Color} c - The color to test for equality.
   * @return {boolean} Whether this bounding color is equal with the given one.
   */
  equals(c) {
    return c.r === this.r && c.g === this.g && c.b === this.b;
  }
  /**
   * Sets this color's RGB components from the given array.
   *
   * @param {Array<number>} array - An array holding the RGB values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Color} A reference to this color.
   */
  fromArray(array, offset = 0) {
    return this.r = array[offset], this.g = array[offset + 1], this.b = array[offset + 2], this;
  }
  /**
   * Writes the RGB components of this color to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the color components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The color components.
   */
  toArray(array = [], offset = 0) {
    return array[offset] = this.r, array[offset + 1] = this.g, array[offset + 2] = this.b, array;
  }
  /**
   * Sets the components of this color from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding color data.
   * @param {number} index - The index into the attribute.
   * @return {Color} A reference to this color.
   */
  fromBufferAttribute(attribute, index) {
    return this.r = attribute.getX(index), this.g = attribute.getY(index), this.b = attribute.getZ(index), this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the color
   * as a hexadecimal value.
   *
   * @return {number} The hexadecimal value.
   */
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const _color = new Color();
Color.NAMES = pi;
/**
 * This class can be used to define an exponential squared fog,
 * which gives a clear view near the camera and a faster than exponentially
 * densening fog farther from the camera.
 *
 * ```js
 * const scene = new THREE.Scene();
 * scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
 * ```
 */
class FogExp2 {
  constructor(color, density = 25e-5) {
    this.isFogExp2 = !0, this.name = "", this.color = new Color(color), this.density = density;
  }
  /**
   * Returns a new fog with copied values from this instance.
   *
   * @return {FogExp2} A clone of this instance.
   */
  clone() {
    return new FogExp2(this.color, this.density);
  }
  toJSON() {
    return {
      type: "FogExp2",
      name: this.name,
      color: this.color.getHex(),
      density: this.density
    };
  }
}
/**
 * This class can be used to define a linear fog that grows linearly denser
 * with the distance.
 *
 * ```js
 * const scene = new THREE.Scene();
 * scene.fog = new THREE.Fog( 0xcccccc, 10, 15 );
 * ```
 */
class Fog {
  constructor(color, near = 1, far = 1e3) {
    this.isFog = !0, this.name = "", this.color = new Color(color), this.near = near, this.far = far;
  }
  /**
   * Returns a new fog with copied values from this instance.
   *
   * @return {Fog} A clone of this instance.
   */
  clone() {
    return new Fog(this.color, this.near, this.far);
  }
  toJSON() {
    return {
      type: "Fog",
      name: this.name,
      color: this.color.getHex(),
      near: this.near,
      far: this.far
    };
  }
}
class Scene extends Object3D {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Euler(), this.environmentIntensity = 1, this.environmentRotation = new Euler(), this.overrideMaterial = null, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
      detail: this
    }));
  }
  copy(source, recursive) {
    return super.copy(source, recursive), null !== source.background && (this.background = source.background.clone()), null !== source.environment && (this.environment = source.environment.clone()), null !== source.fog && (this.fog = source.fog.clone()), this.backgroundBlurriness = source.backgroundBlurriness, this.backgroundIntensity = source.backgroundIntensity, this.backgroundRotation.copy(source.backgroundRotation), this.environmentIntensity = source.environmentIntensity, this.environmentRotation.copy(source.environmentRotation), null !== source.overrideMaterial && (this.overrideMaterial = source.overrideMaterial.clone()), this.matrixAutoUpdate = source.matrixAutoUpdate, this;
  }
  toJSON(meta) {
    const data = super.toJSON(meta);
    return null !== this.fog && (data.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (data.object.backgroundBlurriness = this.backgroundBlurriness), 1 !== this.backgroundIntensity && (data.object.backgroundIntensity = this.backgroundIntensity), data.object.backgroundRotation = this.backgroundRotation.toArray(), 1 !== this.environmentIntensity && (data.object.environmentIntensity = this.environmentIntensity), data.object.environmentRotation = this.environmentRotation.toArray(), data;
  }
}
const _v0$2 = new Vector3(),
  _v1$5 = new Vector3(),
  bi = new Vector3(),
  yi = new Vector3(),
  _vab = new Vector3(),
  _vac = new Vector3(),
  _vbc = new Vector3(),
  _vap = new Vector3(),
  _vbp = new Vector3(),
  _vcp = new Vector3(),
  _v40 = new Vector4(),
  _v41 = new Vector4(),
  _v42 = new Vector4();
/**
 * A geometric triangle as defined by three vectors representing its three corners.
 */
class Triangle {
  /**
   * Constructs a new triangle.
   *
   * @param {Vector3} [a=(0,0,0)] - The first corner of the triangle.
   * @param {Vector3} [b=(0,0,0)] - The second corner of the triangle.
   * @param {Vector3} [c=(0,0,0)] - The third corner of the triangle.
   */
  constructor(a = new Vector3(), b = new Vector3(), c = new Vector3()) {
    this.a = a, this.b = b, this.c = c;
  }
  static getNormal(a, b, c, target) {
    target.subVectors(c, b), _v0$2.subVectors(a, b), target.cross(_v0$2);
    const targetLengthSq = target.lengthSq();
    return targetLengthSq > 0 ? target.multiplyScalar(1 / Math.sqrt(targetLengthSq)) : target.set(0, 0, 0);
  }
  static getBarycoord(point, a, b, c, target) {
    _v0$2.subVectors(c, a), _v1$5.subVectors(b, a), bi.subVectors(point, a);
    const dot00 = _v0$2.dot(_v0$2),
      dot01 = _v0$2.dot(_v1$5),
      dot02 = _v0$2.dot(bi),
      dot11 = _v1$5.dot(_v1$5),
      dot12 = _v1$5.dot(bi),
      denom = dot00 * dot11 - dot01 * dot01;
    if (0 === denom) return target.set(0, 0, 0), null;
    const invDenom = 1 / denom,
      u = (dot11 * dot02 - dot01 * dot12) * invDenom,
      v = (dot00 * dot12 - dot01 * dot02) * invDenom;
    return target.set(1 - u - v, v, u);
  }
  static containsPoint(point, a, b, c) {
    return null !== this.getBarycoord(point, a, b, c, yi) && yi.x >= 0 && yi.y >= 0 && yi.x + yi.y <= 1;
  }
  static getInterpolation(point, p1, p2, p3, v1, v2, v3, target) {
    return null === this.getBarycoord(point, p1, p2, p3, yi) ? (target.x = 0, target.y = 0, "z" in target && (target.z = 0), "w" in target && (target.w = 0), null) : (target.setScalar(0), target.addScaledVector(v1, yi.x), target.addScaledVector(v2, yi.y), target.addScaledVector(v3, yi.z), target);
  }
  /**
   * Computes the value barycentrically interpolated for the given attribute and indices.
   *
   * @param {BufferAttribute} attr - The attribute to interpolate.
   * @param {number} i1 - Index of first vertex.
   * @param {number} i2 - Index of second vertex.
   * @param {number} i3 - Index of third vertex.
   * @param {Vector3} barycoord - The barycoordinate value to use to interpolate.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The interpolated attribute value.
   */
  static getInterpolatedAttribute(attr, i1, i2, i3, barycoord, target) {
    return _v40.setScalar(0), _v41.setScalar(0), _v42.setScalar(0), _v40.fromBufferAttribute(attr, i1), _v41.fromBufferAttribute(attr, i2), _v42.fromBufferAttribute(attr, i3), target.setScalar(0), target.addScaledVector(_v40, barycoord.x), target.addScaledVector(_v41, barycoord.y), target.addScaledVector(_v42, barycoord.z), target;
  }
  /**
   * Returns `true` if the triangle is oriented towards the given direction.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} direction - The (normalized) direction vector.
   * @return {boolean} Whether the triangle is oriented towards the given direction or not.
   */
  static isFrontFacing(a, b, c, direction) {
    return _v0$2.subVectors(c, b), _v1$5.subVectors(a, b), _v0$2.cross(_v1$5).dot(direction) < 0;
  }
  /**
   * Sets the triangle's vertices by copying the given values.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  set(a, b, c) {
    return this.a.copy(a), this.b.copy(b), this.c.copy(c), this;
  }
  /**
   * Sets the triangle's vertices by copying the given array values.
   *
   * @param {Array<Vector3>} points - An array with 3D points.
   * @param {number} i0 - The array index representing the first corner of the triangle.
   * @param {number} i1 - The array index representing the second corner of the triangle.
   * @param {number} i2 - The array index representing the third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  setFromPointsAndIndices(points, i0, i1, i2) {
    return this.a.copy(points[i0]), this.b.copy(points[i1]), this.c.copy(points[i2]), this;
  }
  /**
   * Sets the triangle's vertices by copying the given attribute values.
   *
   * @param {BufferAttribute} attribute - A buffer attribute with 3D points data.
   * @param {number} i0 - The attribute index representing the first corner of the triangle.
   * @param {number} i1 - The attribute index representing the second corner of the triangle.
   * @param {number} i2 - The attribute index representing the third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  setFromAttributeAndIndices(attribute, i0, i1, i2) {
    return this.a.fromBufferAttribute(attribute, i0), this.b.fromBufferAttribute(attribute, i1), this.c.fromBufferAttribute(attribute, i2), this;
  }
  /**
   * Returns a new triangle with copied values from this instance.
   *
   * @return {Triangle} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given triangle to this instance.
   *
   * @param {Triangle} triangle - The triangle to copy.
   * @return {Triangle} A reference to this triangle.
   */
  copy(triangle) {
    return this.a.copy(triangle.a), this.b.copy(triangle.b), this.c.copy(triangle.c), this;
  }
  getArea() {
    return _v0$2.subVectors(this.c, this.b), _v1$5.subVectors(this.a, this.b), .5 * _v0$2.cross(_v1$5).length();
  }
  /**
   * Computes the midpoint of the triangle.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's midpoint.
   */
  getMidpoint(target) {
    return target.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  /**
   * Computes the normal of the triangle.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's normal.
   */
  getNormal(target) {
    return Triangle.getNormal(this.a, this.b, this.c, target);
  }
  /**
   * Computes a plane the triangle lies within.
   *
   * @param {Plane} target - The target vector that is used to store the method's result.
   * @return {Plane} The plane the triangle lies within.
   */
  getPlane(target) {
    return target.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  /**
   * Computes a barycentric coordinates from the given vector.
   * Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The barycentric coordinates for the given point
   */
  getBarycoord(point, target) {
    return Triangle.getBarycoord(point, this.a, this.b, this.c, target);
  }
  /**
   * Computes the value barycentrically interpolated for the given point on the
   * triangle. Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - Position of interpolated point.
   * @param {Vector3} v1 - Value to interpolate of first vertex.
   * @param {Vector3} v2 - Value to interpolate of second vertex.
   * @param {Vector3} v3 - Value to interpolate of third vertex.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The interpolated value.
   */
  getInterpolation(point, v1, v2, v3, target) {
    return Triangle.getInterpolation(point, this.a, this.b, this.c, v1, v2, v3, target);
  }
  /**
   * Returns `true` if the given point, when projected onto the plane of the
   * triangle, lies within the triangle.
   *
   * @param {Vector3} point - The point in 3D space to test.
   * @return {boolean} Whether the given point, when projected onto the plane of the
   * triangle, lies within the triangle or not.
   */
  containsPoint(point) {
    return Triangle.containsPoint(point, this.a, this.b, this.c);
  }
  /**
   * Returns `true` if the triangle is oriented towards the given direction.
   *
   * @param {Vector3} direction - The (normalized) direction vector.
   * @return {boolean} Whether the triangle is oriented towards the given direction or not.
   */
  isFrontFacing(direction) {
    return Triangle.isFrontFacing(this.a, this.b, this.c, direction);
  }
  /**
   * Returns `true` if this triangle intersects with the given box.
   *
   * @param {Box3} box - The box to intersect.
   * @return {boolean} Whether this triangle intersects with the given box or not.
   */
  intersectsBox(box) {
    return box.intersectsTriangle(this);
  }
  /**
   * Returns the closest point on the triangle to the given point.
   *
   * @param {Vector3} p - The point to compute the closest point for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The closest point on the triangle.
   */
  closestPointToPoint(p, target) {
    const a = this.a,
      b = this.b,
      c = this.c;
    let v, w;
    _vab.subVectors(b, a), _vac.subVectors(c, a), _vap.subVectors(p, a);
    const d1 = _vab.dot(_vap),
      d2 = _vac.dot(_vap);
    if (d1 <= 0 && d2 <= 0) return target.copy(a);
    _vbp.subVectors(p, b);
    const d3 = _vab.dot(_vbp),
      d4 = _vac.dot(_vbp);
    if (d3 >= 0 && d4 <= d3) return target.copy(b);
    const vc = d1 * d4 - d3 * d2;
    if (vc <= 0 && d1 >= 0 && d3 <= 0) return v = d1 / (d1 - d3), target.copy(a).addScaledVector(_vab, v);
    _vcp.subVectors(p, c);
    const d5 = _vab.dot(_vcp),
      d6 = _vac.dot(_vcp);
    if (d6 >= 0 && d5 <= d6) return target.copy(c);
    const vb = d5 * d2 - d1 * d6;
    if (vb <= 0 && d2 >= 0 && d6 <= 0) return w = d2 / (d2 - d6), target.copy(a).addScaledVector(_vac, w);
    const va = d3 * d6 - d5 * d4;
    if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) return _vbc.subVectors(c, b), w = (d4 - d3) / (d4 - d3 + (d5 - d6)), target.copy(b).addScaledVector(_vbc, w);
    const denom = 1 / (va + vb + vc);
    return v = vb * denom, w = vc * denom, target.copy(a).addScaledVector(_vab, v).addScaledVector(_vac, w);
  }
  /**
   * Returns `true` if this triangle is equal with the given one.
   *
   * @param {Triangle} triangle - The triangle to test for equality.
   * @return {boolean} Whether this triangle is equal with the given one.
   */
  equals(triangle) {
    return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);
  }
}
/**
 * Represents an axis-aligned bounding box (AABB) in 3D space.
 */
class Box3 {
  constructor(min = new Vector3(1 / 0, 1 / 0, 1 / 0), max = new Vector3(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = min, this.max = max;
  }
  /**
   * Sets the lower and upper boundaries of this box.
   * Please note that this method only copies the values from the given objects.
   *
   * @param {Vector3} min - The lower boundary of the box.
   * @param {Vector3} max - The upper boundary of the box.
   * @return {Box3} A reference to this bounding box.
   */
  set(min, max) {
    return this.min.copy(min), this.max.copy(max), this;
  }
  setFromArray(array) {
    this.makeEmpty();
    for (let i = 0, il = array.length; i < il; i += 3) this.expandByPoint(_vector$b.fromArray(array, i));
    return this;
  }
  setFromBufferAttribute(attribute) {
    this.makeEmpty();
    for (let i = 0, il = attribute.count; i < il; i++) this.expandByPoint(_vector$b.fromBufferAttribute(attribute, i));
    return this;
  }
  setFromPoints(points) {
    this.makeEmpty();
    for (let i = 0, il = points.length; i < il; i++) this.expandByPoint(points[i]);
    return this;
  }
  setFromCenterAndSize(center, size) {
    const halfSize = _vector$b.copy(size).multiplyScalar(.5);
    return this.min.copy(center).sub(halfSize), this.max.copy(center).add(halfSize), this;
  }
  /**
   * Computes the world-axis-aligned bounding box for the given 3D object
   * (including its children), accounting for the object's, and children's,
   * world transforms. The function may result in a larger box than strictly necessary.
   *
   * Note: To compute the correct bounding box, make sure the given 3D object
   * has an up-to-date world matrix that reflects the current transformation of its
   * ancestor nodes. Call `object.updateWorldMatrix( true, false )` beforehand if
   * you're unsure.
   *
   * @param {Object3D} object - The 3D object to compute the bounding box for.
   * @param {boolean} [precise=false] - If set to `true`, the method computes the smallest
   * world-axis-aligned bounding box at the expense of more computation.
   * @return {Box3} A reference to this bounding box.
   */
  setFromObject(object, precise = !1) {
    return this.makeEmpty(), this.expandByObject(object, precise);
  }
  /**
   * Returns a new box with copied values from this instance.
   *
   * @return {Box3} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given box to this instance.
   *
   * @param {Box3} box - The box to copy.
   * @return {Box3} A reference to this bounding box.
   */
  copy(box) {
    return this.min.copy(box.min), this.max.copy(box.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  /**
   * Returns true if this box includes zero points within its bounds.
   * Note that a box with equal lower and upper bounds still includes one
   * point, the one both bounds share.
   *
   * @return {boolean} Whether this box is empty or not.
   */
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(target) {
    return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(.5);
  }
  /**
   * Returns the dimensions of this box.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The size.
   */
  getSize(target) {
    return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);
  }
  /**
   * Expands the boundaries of this box to include the given point.
   *
   * @param {Vector3} point - The point that should be included by the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByPoint(point) {
    return this.min.min(point), this.max.max(point), this;
  }
  /**
   * Expands this box equilaterally by the given vector. The width of this
   * box will be expanded by the x component of the vector in both
   * directions. The height of this box will be expanded by the y component of
   * the vector in both directions. The depth of this box will be
   * expanded by the z component of the vector in both directions.
   *
   * @param {Vector3} vector - The vector that should expand the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByVector(vector) {
    return this.min.sub(vector), this.max.add(vector), this;
  }
  /**
   * Expands each dimension of the box by the given scalar. If negative, the
   * dimensions of the box will be contracted.
   *
   * @param {number} scalar - The scalar value that should expand the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByScalar(scalar) {
    return this.min.addScalar(-scalar), this.max.addScalar(scalar), this;
  }
  expandByObject(object, precise = !1) {
    object.updateWorldMatrix(!1, !1);
    const geometry = object.geometry;
    if (void 0 !== geometry) {
      const positionAttribute = geometry.getAttribute("position");
      if (!0 === precise && void 0 !== positionAttribute && !0 !== object.isInstancedMesh) for (let i = 0, l = positionAttribute.count; i < l; i++) !0 === object.isMesh ? object.getVertexPosition(i, _vector$b) : _vector$b.fromBufferAttribute(positionAttribute, i), _vector$b.applyMatrix4(object.matrixWorld), this.expandByPoint(_vector$b);else void 0 !== object.boundingBox ? (null === object.boundingBox && object.computeBoundingBox(), box3.copy(object.boundingBox)) : (null === geometry.boundingBox && geometry.computeBoundingBox(), box3.copy(geometry.boundingBox)), box3.applyMatrix4(object.matrixWorld), this.union(box3);
    }
    const children = object.children;
    for (let i = 0, l = children.length; i < l; i++) this.expandByObject(children[i], precise);
    return this;
  }
  /**
   * Returns `true` if the given point lies within or on the boundaries of this box.
   *
   * @param {Vector3} point - The point to test.
   * @return {boolean} Whether the bounding box contains the given point or not.
   */
  containsPoint(point) {
    return point.x >= this.min.x && point.x <= this.max.x && point.y >= this.min.y && point.y <= this.max.y && point.z >= this.min.z && point.z <= this.max.z;
  }
  /**
   * Returns `true` if this bounding box includes the entirety of the given bounding box.
   * If this box and the given one are identical, this function also returns `true`.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the bounding box contains the given bounding box or not.
   */
  containsBox(box) {
    return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;
  }
  /**
   * Returns a point as a proportion of this box's width, height and depth.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} A point as a proportion of this box's width, height and depth.
   */
  getParameter(point, target) {
    return target.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y), (point.z - this.min.z) / (this.max.z - this.min.z));
  }
  /**
   * Returns `true` if the given bounding box intersects with this bounding box.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with this bounding box.
   */
  intersectsBox(box) {
    return box.max.x >= this.min.x && box.min.x <= this.max.x && box.max.y >= this.min.y && box.min.y <= this.max.y && box.max.z >= this.min.z && box.min.z <= this.max.z;
  }
  /**
   * Returns `true` if the given bounding sphere intersects with this bounding box.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with this bounding box.
   */
  intersectsSphere(sphere) {
    return this.clampPoint(sphere.center, _vector$b), _vector$b.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;
  }
  /**
   * Returns `true` if the given plane intersects with this bounding box.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether the given plane intersects with this bounding box.
   */
  intersectsPlane(plane) {
    let min, max;
    return plane.normal.x > 0 ? (min = plane.normal.x * this.min.x, max = plane.normal.x * this.max.x) : (min = plane.normal.x * this.max.x, max = plane.normal.x * this.min.x), plane.normal.y > 0 ? (min += plane.normal.y * this.min.y, max += plane.normal.y * this.max.y) : (min += plane.normal.y * this.max.y, max += plane.normal.y * this.min.y), plane.normal.z > 0 ? (min += plane.normal.z * this.min.z, max += plane.normal.z * this.max.z) : (min += plane.normal.z * this.max.z, max += plane.normal.z * this.min.z), min <= -plane.constant && max >= -plane.constant;
  }
  /* 空盒直接 false。将三角形平移到盒中心坐标，使用盒半径和三条边构造分离轴：9 个边×坐标轴、3 个盒轴、1 个三角形法线；任一投影分离就 false。边界接触按非严格分离保留。 */
  intersectsTriangle(e) {
    if (this.isEmpty()) return !1;
    this.getCenter(Fi), qi.subVectors(this.max, Fi), Ii.subVectors(e.a, Fi), Ri.subVectors(e.b, Fi), ki.subVectors(e.c, Fi), Pi.subVectors(Ri, Ii), Yi.subVectors(ki, Ri), Wi.subVectors(Ii, ki);
    let t = [0, -Pi.z, Pi.y, 0, -Yi.z, Yi.y, 0, -Wi.z, Wi.y, Pi.z, 0, -Pi.x, Yi.z, 0, -Yi.x, Wi.z, 0, -Wi.x, -Pi.y, Pi.x, 0, -Yi.y, Yi.x, 0, -Wi.y, Wi.x, 0];
    return !!satForAxes(t, Ii, Ri, ki, qi) && (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !!satForAxes(t, Ii, Ri, ki, qi) && (Hi.crossVectors(Pi, Yi), t = [Hi.x, Hi.y, Hi.z], satForAxes(t, Ii, Ri, ki, qi)));
  }
  /**
   * Clamps the given point within the bounds of this box.
   *
   * @param {Vector3} point - The point to clamp.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The clamped point.
   */
  clampPoint(point, target) {
    return target.copy(point).clamp(this.min, this.max);
  }
  /**
   * Returns the euclidean distance from any edge of this box to the specified point. If
   * the given point lies inside of this box, the distance will be `0`.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The euclidean distance.
   */
  distanceToPoint(point) {
    return this.clampPoint(point, _vector$b).distanceTo(point);
  }
  getBoundingSphere(target) {
    return this.isEmpty() ? target.makeEmpty() : (this.getCenter(target.center), target.radius = .5 * this.getSize(_vector$b).length()), target;
  }
  /**
   * Computes the intersection of this bounding box and the given one, setting the upper
   * bound of this box to the lesser of the two boxes' upper bounds and the
   * lower bound of this box to the greater of the two boxes' lower bounds. If
   * there's no overlap, makes this box empty.
   *
   * @param {Box3} box - The bounding box to intersect with.
   * @return {Box3} A reference to this bounding box.
   */
  intersect(box) {
    return this.min.max(box.min), this.max.min(box.max), this.isEmpty() && this.makeEmpty(), this;
  }
  /**
   * Computes the union of this box and another and the given one, setting the upper
   * bound of this box to the greater of the two boxes' upper bounds and the
   * lower bound of this box to the lesser of the two boxes' lower bounds.
   *
   * @param {Box3} box - The bounding box that will be unioned with this instance.
   * @return {Box3} A reference to this bounding box.
   */
  union(box) {
    return this.min.min(box.min), this.max.max(box.max), this;
  }
  applyMatrix4(matrix) {
    return this.isEmpty() || (Bi[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix), Bi[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix), Bi[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix), Bi[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix), Bi[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix), Bi[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix), Bi[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix), Bi[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix), this.setFromPoints(Bi)), this;
  }
  /**
   * Adds the given offset to both the upper and lower bounds of this bounding box,
   * effectively moving it in 3D space.
   *
   * @param {Vector3} offset - The offset that should be used to translate the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  translate(offset) {
    return this.min.add(offset), this.max.add(offset), this;
  }
  /**
   * Returns `true` if this bounding box is equal with the given one.
   *
   * @param {Box3} box - The box to test for equality.
   * @return {boolean} Whether this bounding box is equal with the given one.
   */
  equals(box) {
    return box.min.equals(this.min) && box.max.equals(this.max);
  }
  /**
   * Returns a serialized structure of the bounding box.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      min: this.min.toArray(),
      max: this.max.toArray()
    };
  }
  /**
   * Returns a serialized structure of the bounding box.
   *
   * @param {Object} json - The serialized json to set the box from.
   * @return {Box3} A reference to this bounding box.
   */
  fromJSON(json) {
    return this.min.fromArray(json.min), this.max.fromArray(json.max), this;
  }
}
const Bi = [new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3()],
  _vector$b = new Vector3(),
  box3 = new Box3(),
  Ii = new Vector3(),
  Ri = new Vector3(),
  ki = new Vector3(),
  Pi = new Vector3(),
  Yi = new Vector3(),
  Wi = new Vector3(),
  Fi = new Vector3(),
  qi = new Vector3(),
  Hi = new Vector3(),
  Ui = new Vector3();
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：satForAxes。把三角形投影到分离轴并与包围盒半径比较，任一轴分离即返回 false。 */
function satForAxes(axes, v0, v1, v2, extents) {
  for (let i = 0, j = axes.length - 3; i <= j; i += 3) {
    Ui.fromArray(axes, i);
    const r = extents.x * Math.abs(Ui.x) + extents.y * Math.abs(Ui.y) + extents.z * Math.abs(Ui.z),
      p0 = v0.dot(Ui),
      p1 = v1.dot(Ui),
      p2 = v2.dot(Ui);
    if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) return !1;
  }
  return !0;
}
const Xi = _generateTables();
/* 人工身份合同：512/2048/64项半精度指数尾数位表的构造和返回。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function _generateTables() {
  const arrayBuffer = new ArrayBuffer(4),
    float32Array = new Float32Array(arrayBuffer),
    uint32Array = new Uint32Array(arrayBuffer),
    r = new Uint32Array(512),
    i = new Uint32Array(512);
  for (let e = 0; e < 256; ++e) {
    const t = e - 127;
    t < -27 ? (r[e] = 0, r[256 | e] = 32768, i[e] = 24, i[256 | e] = 24) : t < -14 ? (r[e] = 1024 >> -t - 14, r[256 | e] = 1024 >> -t - 14 | 32768, i[e] = -t - 1, i[256 | e] = -t - 1) : t <= 15 ? (r[e] = t + 15 << 10, r[256 | e] = t + 15 << 10 | 32768, i[e] = 13, i[256 | e] = 13) : t < 128 ? (r[e] = 31744, r[256 | e] = 64512, i[e] = 24, i[256 | e] = 24) : (r[e] = 31744, r[256 | e] = 64512, i[e] = 13, i[256 | e] = 13);
  }
  const a = new Uint32Array(2048),
    s = new Uint32Array(64),
    o = new Uint32Array(64);
  for (let e = 1; e < 1024; ++e) {
    let t = e << 13,
      n = 0;
    for (; !(8388608 & t);) t <<= 1, n -= 8388608;
    t &= -8388609, n += 947912704, a[e] = t | n;
  }
  for (let e = 1024; e < 2048; ++e) a[e] = 939524096 + (e - 1024 << 13);
  for (let e = 1; e < 31; ++e) s[e] = e << 23;
  s[31] = 1199570944, s[32] = 2147483648;
  for (let e = 33; e < 63; ++e) s[e] = 2147483648 + (e - 32 << 23);
  s[63] = 3347054592;
  for (let e = 1; e < 64; ++e) 32 !== e && (o[e] = 1024);
  return {
    floatView: float32Array,
    uint32View: uint32Array,
    baseTable: r,
    shiftTable: i,
    mantissaTable: a,
    exponentTable: s,
    offsetTable: o
  };
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：toHalfFloat。通过位模式提取符号、指数和尾数，返回半精度浮点存储位。 */
function toHalfFloat(val) {
  Math.abs(val) > 65504 && warn("DataUtils.toHalfFloat(): Value out of range."), val = clamp(val, -65504, 65504), Xi.floatView[0] = val;
  const f = Xi.uint32View[0],
    e = f >> 23 & 511;
  return Xi.baseTable[e] + ((8388607 & f) >> Xi.shiftTable[e]);
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：fromHalfFloat。通过预计算位表将半精度存储位解码成 JavaScript 数值。 */
function fromHalfFloat(val) {
  const m = val >> 10;
  return Xi.uint32View[0] = Xi.mantissaTable[Xi.offsetTable[m] + (1023 & val)] + Xi.exponentTable[m], Xi.floatView[0];
}
/**
 * A class containing utility functions for data.
 *
 * @hideconstructor
 */
class DataUtils {
  /**
   * Returns a half precision floating point value (FP16) from the given single
   * precision floating point value (FP32).
   *
   * @param {number} val - A single precision floating point value.
   * @return {number} The FP16 value.
   */
  static toHalfFloat(val) {
    return toHalfFloat(val);
  }
  /**
   * Returns a single precision floating point value (FP32) from the given half
   * precision floating point value (FP16).
   *
   * @param {number} val - A half precision floating point value.
   * @return {number} The FP32 value.
   */
  static fromHalfFloat(val) {
    return fromHalfFloat(val);
  }
}
const _vector$a = new Vector3(),
  vector2 = new Vector2();
let $i = 0;
/**
 * This class stores data for an attribute (such as vertex positions, face
 * indices, normals, colors, UVs, and any custom attributes ) associated with
 * a geometry, which allows for more efficient passing of data to the GPU.
 *
 * When working with vector-like data, the `fromBufferAttribute( attribute, index )`
 * helper methods on vector and color class might be helpful. E.g. {@link Vector3#fromBufferAttribute}.
 */
class BufferAttribute extends EventDispatcher {
  constructor(array, itemSize, normalized = !1) {
    if (super(), Array.isArray(array)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", {
      value: $i++
    }), this.name = "", this.array = array, this.itemSize = itemSize, this.count = void 0 !== array ? array.length / itemSize : 0, this.normalized = normalized, this.usage = StaticDrawUsage, this.updateRanges = [], this.gpuType = FloatType, this.version = 0;
  }
  onUploadCallback() {}
  set needsUpdate(value) {
    !0 === value && this.version++;
  }
  /**
   * Sets the usage of this buffer attribute.
   *
   * @param {(StaticDrawUsage|DynamicDrawUsage|StreamDrawUsage|StaticReadUsage|DynamicReadUsage|StreamReadUsage|StaticCopyUsage|DynamicCopyUsage|StreamCopyUsage)} value - The usage to set.
   * @return {BufferAttribute} A reference to this buffer attribute.
   */
  setUsage(value) {
    return this.usage = value, this;
  }
  /**
   * Adds a range of data in the data array to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(start, count) {
    this.updateRanges.push({
      start: start,
      count: count
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Copies the values of the given buffer attribute to this instance.
   *
   * @param {BufferAttribute} source - The buffer attribute to copy.
   * @return {BufferAttribute} A reference to this instance.
   */
  copy(source) {
    return this.name = source.name, this.array = new source.array.constructor(source.array), this.itemSize = source.itemSize, this.count = source.count, this.normalized = source.normalized, this.usage = source.usage, this.gpuType = source.gpuType, this;
  }
  copyAt(index1, attribute, index2) {
    index1 *= this.itemSize, index2 *= attribute.itemSize;
    for (let i = 0, l = this.itemSize; i < l; i++) this.array[index1 + i] = attribute.array[index2 + i];
    return this;
  }
  /**
   * Copies the given array data into this buffer attribute.
   *
   * @param {(TypedArray|Array)} array - The array to copy.
   * @return {BufferAttribute} A reference to this instance.
   */
  copyArray(array) {
    return this.array.set(array), this;
  }
  applyMatrix3(m) {
    if (2 === this.itemSize) for (let i = 0, l = this.count; i < l; i++) vector2.fromBufferAttribute(this, i), vector2.applyMatrix3(m), this.setXY(i, vector2.x, vector2.y);else if (3 === this.itemSize) for (let i = 0, l = this.count; i < l; i++) _vector$a.fromBufferAttribute(this, i), _vector$a.applyMatrix3(m), this.setXYZ(i, _vector$a.x, _vector$a.y, _vector$a.z);
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyMatrix4(m) {
    for (let i = 0, l = this.count; i < l; i++) _vector$a.fromBufferAttribute(this, i), _vector$a.applyMatrix4(m), this.setXYZ(i, _vector$a.x, _vector$a.y, _vector$a.z);
    return this;
  }
  /**
   * Applies the given 3x3 normal matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix3} m - The normal matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyNormalMatrix(m) {
    for (let i = 0, l = this.count; i < l; i++) _vector$a.fromBufferAttribute(this, i), _vector$a.applyNormalMatrix(m), this.setXYZ(i, _vector$a.x, _vector$a.y, _vector$a.z);
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3` and with direction vectors.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  transformDirection(m) {
    for (let i = 0, l = this.count; i < l; i++) _vector$a.fromBufferAttribute(this, i), _vector$a.transformDirection(m), this.setXYZ(i, _vector$a.x, _vector$a.y, _vector$a.z);
    return this;
  }
  /**
   * Sets the given array data in the buffer attribute.
   *
   * @param {(TypedArray|Array)} value - The array data to set.
   * @param {number} [offset=0] - The offset in this buffer attribute's array.
   * @return {BufferAttribute} A reference to this instance.
   */
  set(value, offset = 0) {
    return this.array.set(value, offset), this;
  }
  /**
   * Returns the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @return {number} The returned value.
   */
  getComponent(index, component) {
    let value = this.array[index * this.itemSize + component];
    return this.normalized && (value = denormalize(value, this.array)), value;
  }
  /**
   * Sets the given value to the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @param {number} value - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setComponent(index, component, value) {
    return this.normalized && (value = normalize(value, this.array)), this.array[index * this.itemSize + component] = value, this;
  }
  /**
   * Returns the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The x component.
   */
  getX(index) {
    let x = this.array[index * this.itemSize];
    return this.normalized && (x = denormalize(x, this.array)), x;
  }
  /**
   * Sets the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setX(index, x) {
    return this.normalized && (x = normalize(x, this.array)), this.array[index * this.itemSize] = x, this;
  }
  /**
   * Returns the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The y component.
   */
  getY(index) {
    let y = this.array[index * this.itemSize + 1];
    return this.normalized && (y = denormalize(y, this.array)), y;
  }
  /**
   * Sets the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} y - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setY(index, y) {
    return this.normalized && (y = normalize(y, this.array)), this.array[index * this.itemSize + 1] = y, this;
  }
  /**
   * Returns the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The z component.
   */
  getZ(index) {
    let z = this.array[index * this.itemSize + 2];
    return this.normalized && (z = denormalize(z, this.array)), z;
  }
  /**
   * Sets the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} z - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setZ(index, z) {
    return this.normalized && (z = normalize(z, this.array)), this.array[index * this.itemSize + 2] = z, this;
  }
  /**
   * Returns the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The w component.
   */
  getW(index) {
    let w = this.array[index * this.itemSize + 3];
    return this.normalized && (w = denormalize(w, this.array)), w;
  }
  /**
   * Sets the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} w - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setW(index, w) {
    return this.normalized && (w = normalize(w, this.array)), this.array[index * this.itemSize + 3] = w, this;
  }
  /**
   * Sets the x and y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXY(index, x, y) {
    return index *= this.itemSize, this.normalized && (x = normalize(x, this.array), y = normalize(y, this.array)), this.array[index + 0] = x, this.array[index + 1] = y, this;
  }
  /**
   * Sets the x, y and z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXYZ(index, x, y, z) {
    return index *= this.itemSize, this.normalized && (x = normalize(x, this.array), y = normalize(y, this.array), z = normalize(z, this.array)), this.array[index + 0] = x, this.array[index + 1] = y, this.array[index + 2] = z, this;
  }
  /**
   * Sets the x, y, z and w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @param {number} w - The value for the w component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXYZW(index, x, y, z, w) {
    return index *= this.itemSize, this.normalized && (x = normalize(x, this.array), y = normalize(y, this.array), z = normalize(z, this.array), w = normalize(w, this.array)), this.array[index + 0] = x, this.array[index + 1] = y, this.array[index + 2] = z, this.array[index + 3] = w, this;
  }
  /**
   * Sets the given callback function that is executed after the Renderer has transferred
   * the attribute array data to the GPU. Can be used to perform clean-up operations after
   * the upload when attribute data are not needed anymore on the CPU side.
   *
   * @param {Function} callback - The `onUpload()` callback.
   * @return {BufferAttribute} A reference to this instance.
   */
  onUpload(callback) {
    return this.onUploadCallback = callback, this;
  }
  /**
   * Returns a new buffer attribute with copied values from this instance.
   *
   * @return {BufferAttribute} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const data = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return "" !== this.name && (data.name = this.name), this.usage !== StaticDrawUsage && (data.usage = this.usage), data;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
}
/**
 * Convenient class that can be used when creating a `Int8` buffer attribute with
 * a plain `Array` instance.
 *
 * @augments BufferAttribute
 */
class Int8BufferAttribute extends BufferAttribute {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Int8Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(array, itemSize, normalized) {
    super(new Int8Array(array), itemSize, normalized);
  }
}
/**
 * Convenient class that can be used when creating a `UInt8` buffer attribute with
 * a plain `Array` instance.
 *
 * @augments BufferAttribute
 */
class Uint8BufferAttribute extends BufferAttribute {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint8Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(array, itemSize, normalized) {
    super(new Uint8Array(array), itemSize, normalized);
  }
}
/**
 * Convenient class that can be used when creating a `UInt8Clamped` buffer attribute with
 * a plain `Array` instance.
 *
 * @augments BufferAttribute
 */
class Uint8ClampedBufferAttribute extends BufferAttribute {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint8ClampedArray)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(array, itemSize, normalized) {
    super(new Uint8ClampedArray(array), itemSize, normalized);
  }
}
/**
 * Convenient class that can be used when creating a `Int16` buffer attribute with
 * a plain `Array` instance.
 *
 * @augments BufferAttribute
 */
class Int16BufferAttribute extends BufferAttribute {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Int16Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(array, itemSize, normalized) {
    super(new Int16Array(array), itemSize, normalized);
  }
}
/**
 * Convenient class that can be used when creating a `UInt16` buffer attribute with
 * a plain `Array` instance.
 *
 * @augments BufferAttribute
 */
class Uint16BufferAttribute extends BufferAttribute {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint16Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(array, itemSize, normalized) {
    super(new Uint16Array(array), itemSize, normalized);
  }
}
/**
 * Convenient class that can be used when creating a `Int32` buffer attribute with
 * a plain `Array` instance.
 *
 * @augments BufferAttribute
 */
class Int32BufferAttribute extends BufferAttribute {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Int32Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(array, itemSize, normalized) {
    super(new Int32Array(array), itemSize, normalized);
  }
}
/**
 * Convenient class that can be used when creating a `UInt32` buffer attribute with
 * a plain `Array` instance.
 *
 * @augments BufferAttribute
 */
class Uint32BufferAttribute extends BufferAttribute {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint32Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(array, itemSize, normalized) {
    super(new Uint32Array(array), itemSize, normalized);
  }
}
/**
 * Convenient class that can be used when creating a `Float16` buffer attribute with
 * a plain `Array` instance.
 *
 * This class automatically converts to and from FP16 via `Uint16Array` since `Float16Array`
 * browser support is still problematic.
 *
 * @augments BufferAttribute
 */
class Float16BufferAttribute extends BufferAttribute {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint16Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(array, itemSize, normalized) {
    super(new Uint16Array(array), itemSize, normalized), this.isFloat16BufferAttribute = !0;
  }
  getX(index) {
    let x = fromHalfFloat(this.array[index * this.itemSize]);
    return this.normalized && (x = denormalize(x, this.array)), x;
  }
  setX(index, x) {
    return this.normalized && (x = normalize(x, this.array)), this.array[index * this.itemSize] = toHalfFloat(x), this;
  }
  getY(index) {
    let y = fromHalfFloat(this.array[index * this.itemSize + 1]);
    return this.normalized && (y = denormalize(y, this.array)), y;
  }
  setY(index, y) {
    return this.normalized && (y = normalize(y, this.array)), this.array[index * this.itemSize + 1] = toHalfFloat(y), this;
  }
  getZ(index) {
    let z = fromHalfFloat(this.array[index * this.itemSize + 2]);
    return this.normalized && (z = denormalize(z, this.array)), z;
  }
  setZ(index, z) {
    return this.normalized && (z = normalize(z, this.array)), this.array[index * this.itemSize + 2] = toHalfFloat(z), this;
  }
  getW(index) {
    let w = fromHalfFloat(this.array[index * this.itemSize + 3]);
    return this.normalized && (w = denormalize(w, this.array)), w;
  }
  setW(index, w) {
    return this.normalized && (w = normalize(w, this.array)), this.array[index * this.itemSize + 3] = toHalfFloat(w), this;
  }
  setXY(index, x, y) {
    return index *= this.itemSize, this.normalized && (x = normalize(x, this.array), y = normalize(y, this.array)), this.array[index + 0] = toHalfFloat(x), this.array[index + 1] = toHalfFloat(y), this;
  }
  setXYZ(index, x, y, z) {
    return index *= this.itemSize, this.normalized && (x = normalize(x, this.array), y = normalize(y, this.array), z = normalize(z, this.array)), this.array[index + 0] = toHalfFloat(x), this.array[index + 1] = toHalfFloat(y), this.array[index + 2] = toHalfFloat(z), this;
  }
  setXYZW(index, x, y, z, w) {
    return index *= this.itemSize, this.normalized && (x = normalize(x, this.array), y = normalize(y, this.array), z = normalize(z, this.array), w = normalize(w, this.array)), this.array[index + 0] = toHalfFloat(x), this.array[index + 1] = toHalfFloat(y), this.array[index + 2] = toHalfFloat(z), this.array[index + 3] = toHalfFloat(w), this;
  }
}
/**
 * Convenient class that can be used when creating a `Float32` buffer attribute with
 * a plain `Array` instance.
 *
 * @augments BufferAttribute
 */
class Float32BufferAttribute extends BufferAttribute {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Float32Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(array, itemSize, normalized) {
    super(new Float32Array(array), itemSize, normalized);
  }
}
const Zi = new Box3(),
  ea = new Vector3(),
  ta = new Vector3();
/**
 * An analytical 3D sphere defined by a center and radius. This class is mainly
 * used as a Bounding Sphere for 3D objects.
 */
class Sphere {
  /**
   * Constructs a new sphere.
   *
   * @param {Vector3} [center=(0,0,0)] - The center of the sphere
   * @param {number} [radius=-1] - The radius of the sphere.
   */
  constructor(center = new Vector3(), radius = -1) {
    this.isSphere = !0, this.center = center, this.radius = radius;
  }
  /**
   * Sets the sphere's components by copying the given values.
   *
   * @param {Vector3} center - The center.
   * @param {number} radius - The radius.
   * @return {Sphere} A reference to this sphere.
   */
  set(center, radius) {
    return this.center.copy(center), this.radius = radius, this;
  }
  setFromPoints(points, optionalCenter) {
    const center = this.center;
    void 0 !== optionalCenter ? center.copy(optionalCenter) : Zi.setFromPoints(points).getCenter(center);
    let maxRadiusSq = 0;
    for (let i = 0, il = points.length; i < il; i++) maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
    return this.radius = Math.sqrt(maxRadiusSq), this;
  }
  /**
   * Copies the values of the given sphere to this instance.
   *
   * @param {Sphere} sphere - The sphere to copy.
   * @return {Sphere} A reference to this sphere.
   */
  copy(sphere) {
    return this.center.copy(sphere.center), this.radius = sphere.radius, this;
  }
  /**
   * Returns `true` if the sphere is empty (the radius set to a negative number).
   *
   * Spheres with a radius of `0` contain only their center point and are not
   * considered to be empty.
   *
   * @return {boolean} Whether this sphere is empty or not.
   */
  isEmpty() {
    return this.radius < 0;
  }
  /**
   * Makes this sphere empty which means in encloses a zero space in 3D.
   *
   * @return {Sphere} A reference to this sphere.
   */
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  /**
   * Returns `true` if this sphere contains the given point inclusive of
   * the surface of the sphere.
   *
   * @param {Vector3} point - The point to check.
   * @return {boolean} Whether this sphere contains the given point or not.
   */
  containsPoint(point) {
    return point.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  /**
   * Returns the closest distance from the boundary of the sphere to the
   * given point. If the sphere contains the point, the distance will
   * be negative.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The distance to the point.
   */
  distanceToPoint(point) {
    return point.distanceTo(this.center) - this.radius;
  }
  /**
   * Returns `true` if this sphere intersects with the given one.
   *
   * @param {Sphere} sphere - The sphere to test.
   * @return {boolean} Whether this sphere intersects with the given one or not.
   */
  intersectsSphere(sphere) {
    const radiusSum = this.radius + sphere.radius;
    return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;
  }
  /**
   * Returns `true` if this sphere intersects with the given box.
   *
   * @param {Box3} box - The box to test.
   * @return {boolean} Whether this sphere intersects with the given box or not.
   */
  intersectsBox(box) {
    return box.intersectsSphere(this);
  }
  /**
   * Returns `true` if this sphere intersects with the given plane.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether this sphere intersects with the given plane or not.
   */
  intersectsPlane(plane) {
    return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
  }
  /**
   * Clamps a point within the sphere. If the point is outside the sphere, it
   * will clamp it to the closest point on the edge of the sphere. Points
   * already inside the sphere will not be affected.
   *
   * @param {Vector3} point - The plane to clamp.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The clamped point.
   */
  clampPoint(point, target) {
    const deltaLengthSq = this.center.distanceToSquared(point);
    return target.copy(point), deltaLengthSq > this.radius * this.radius && (target.sub(this.center).normalize(), target.multiplyScalar(this.radius).add(this.center)), target;
  }
  getBoundingBox(target) {
    return this.isEmpty() ? (target.makeEmpty(), target) : (target.set(this.center, this.center), target.expandByScalar(this.radius), target);
  }
  /**
   * Transforms this sphere with the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Sphere} A reference to this sphere.
   */
  applyMatrix4(matrix) {
    return this.center.applyMatrix4(matrix), this.radius = this.radius * matrix.getMaxScaleOnAxis(), this;
  }
  /**
   * Translates the sphere's center by the given offset.
   *
   * @param {Vector3} offset - The offset.
   * @return {Sphere} A reference to this sphere.
   */
  translate(offset) {
    return this.center.add(offset), this;
  }
  expandByPoint(point) {
    if (this.isEmpty()) return this.center.copy(point), this.radius = 0, this;
    ea.subVectors(point, this.center);
    const lengthSq = ea.lengthSq();
    if (lengthSq > this.radius * this.radius) {
      const length = Math.sqrt(lengthSq),
        delta = .5 * (length - this.radius);
      this.center.addScaledVector(ea, delta / length), this.radius += delta;
    }
    return this;
  }
  union(sphere) {
    return sphere.isEmpty() ? this : this.isEmpty() ? (this.copy(sphere), this) : (!0 === this.center.equals(sphere.center) ? this.radius = Math.max(this.radius, sphere.radius) : (ta.subVectors(sphere.center, this.center).setLength(sphere.radius), this.expandByPoint(ea.copy(sphere.center).add(ta)), this.expandByPoint(ea.copy(sphere.center).sub(ta))), this);
  }
  /**
   * Returns `true` if this sphere is equal with the given one.
   *
   * @param {Sphere} sphere - The sphere to test for equality.
   * @return {boolean} Whether this bounding sphere is equal with the given one.
   */
  equals(sphere) {
    return sphere.center.equals(this.center) && sphere.radius === this.radius;
  }
  /**
   * Returns a new sphere with copied values from this instance.
   *
   * @return {Sphere} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Returns a serialized structure of the bounding sphere.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      radius: this.radius,
      center: this.center.toArray()
    };
  }
  /**
   * Returns a serialized structure of the bounding sphere.
   *
   * @param {Object} json - The serialized json to set the sphere from.
   * @return {Sphere} A reference to this bounding sphere.
   */
  fromJSON(json) {
    return this.radius = json.radius, this.center.fromArray(json.center), this;
  }
}
let na = 0;
const _m1 = new Matrix4(),
  _obj = new Object3D(),
  _offset = new Vector3(),
  sa = new Box3(),
  oa = new Box3(),
  _vector$9 = new Vector3();
/**
 * A representation of mesh, line, or point geometry. Includes vertex
 * positions, face indices, normals, colors, UVs, and custom attributes
 * within buffers, reducing the cost of passing all this data to the GPU.
 *
 * ```js
 * const geometry = new THREE.BufferGeometry();
 * // create a simple square shape. We duplicate the top left and bottom right
 * // vertices because each vertex needs to appear once per triangle.
 * const vertices = new Float32Array( [
 * 	-1.0, -1.0,  1.0, // v0
 * 	 1.0, -1.0,  1.0, // v1
 * 	 1.0,  1.0,  1.0, // v2
 *
 * 	 1.0,  1.0,  1.0, // v3
 * 	-1.0,  1.0,  1.0, // v4
 * 	-1.0, -1.0,  1.0  // v5
 * ] );
 * // itemSize = 3 because there are 3 values (components) per vertex
 * geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
 * const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
 * const mesh = new THREE.Mesh( geometry, material );
 * ```
 *
 * @augments EventDispatcher
 */
class BufferGeometry extends EventDispatcher {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", {
      value: na++
    }), this.uuid = generateUUID(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
      start: 0,
      count: 1 / 0
    }, this.userData = {}, this._transformed = !1;
  }
  /**
   * Returns the index of this geometry.
   *
   * @return {?BufferAttribute} The index. Returns `null` if no index is defined.
   */
  getIndex() {
    return this.index;
  }
  /* Array 输入从尾向前检查，任一值 >=65535 选 Uint32BufferAttribute，否则 Uint16，itemSize=1；注意阈值包含 65535。非 Array 输入直接作为 index（包括 null），不克隆现有 attribute。返回 this；内联的判宽函数对应官方 arrayNeedsUint32 的操作，不代表所有输入都验证为合法索引。 */
  setIndex(index) {
    return Array.isArray(index) ? this.index = new (function (e) {
      for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
      return !1;
    }(index) ? Uint32BufferAttribute : Uint16BufferAttribute)(index, 1) : this.index = index, this;
  }
  /**
   * Sets the given indirect attribute to this geometry.
   *
   * @param {BufferAttribute} indirect - The attribute holding indirect draw calls.
   * @param {number|Array<number>} [indirectOffset=0] - The offset, in bytes, into the indirect drawing buffer where the value data begins. If an array is provided, multiple indirect draw calls will be made for each offset.
   * @return {BufferGeometry} A reference to this instance.
   */
  setIndirect(indirect, indirectOffset = 0) {
    return this.indirect = indirect, this.indirectOffset = indirectOffset, this;
  }
  /**
   * Returns the indirect attribute of this geometry.
   *
   * @return {?BufferAttribute} The indirect attribute. Returns `null` if no indirect attribute is defined.
   */
  getIndirect() {
    return this.indirect;
  }
  /**
   * Returns the buffer attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @return {BufferAttribute|InterleavedBufferAttribute|undefined} The buffer attribute.
   * Returns `undefined` if not attribute has been found.
   */
  getAttribute(name) {
    return this.attributes[name];
  }
  /**
   * Sets the given attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @param {BufferAttribute|InterleavedBufferAttribute} attribute - The attribute to set.
   * @return {BufferGeometry} A reference to this instance.
   */
  setAttribute(name, attribute) {
    return this.attributes[name] = attribute, this;
  }
  /**
   * Deletes the attribute for the given name.
   *
   * @param {string} name - The attribute name to delete.
   * @return {BufferGeometry} A reference to this instance.
   */
  deleteAttribute(name) {
    return delete this.attributes[name], this;
  }
  hasAttribute(name) {
    return void 0 !== this.attributes[name];
  }
  /**
   * Adds a group to this geometry.
   *
   * @param {number} start - The first element in this draw call. That is the first
   * vertex for non-indexed geometry, otherwise the first triangle index.
   * @param {number} count - Specifies how many vertices (or indices) are part of this group.
   * @param {number} [materialIndex=0] - The material array index to use.
   */
  addGroup(start, count, materialIndex = 0) {
    this.groups.push({
      start: start,
      count: count,
      materialIndex: materialIndex
    });
  }
  clearGroups() {
    this.groups = [];
  }
  /**
   * Sets the draw range for this geometry.
   *
   * @param {number} start - The first vertex for non-indexed geometry, otherwise the first triangle index.
   * @param {number} count - For non-indexed BufferGeometry, `count` is the number of vertices to render.
   * For indexed BufferGeometry, `count` is the number of indices to render.
   */
  setDrawRange(start, count) {
    this.drawRange.start = start, this.drawRange.count = count;
  }
  applyMatrix4(matrix) {
    const position = this.attributes.position;
    void 0 !== position && (position.applyMatrix4(matrix), position.needsUpdate = !0);
    const normal = this.attributes.normal;
    if (void 0 !== normal) {
      const normalMatrix = new Matrix3().getNormalMatrix(matrix);
      normal.applyNormalMatrix(normalMatrix), normal.needsUpdate = !0;
    }
    const tangent = this.attributes.tangent;
    return void 0 !== tangent && (tangent.transformDirection(matrix), tangent.needsUpdate = !0), null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this._transformed = !0, this;
  }
  /**
   * Applies the rotation represented by the Quaternion to the geometry.
   *
   * @param {Quaternion} q - The Quaternion to apply.
   * @return {BufferGeometry} A reference to this instance.
   */
  applyQuaternion(q) {
    return _m1.makeRotationFromQuaternion(q), this.applyMatrix4(_m1), this;
  }
  /**
   * Rotates the geometry about the X axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateX(angle) {
    return _m1.makeRotationX(angle), this.applyMatrix4(_m1), this;
  }
  /**
   * Rotates the geometry about the Y axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateY(angle) {
    return _m1.makeRotationY(angle), this.applyMatrix4(_m1), this;
  }
  /**
   * Rotates the geometry about the Z axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateZ(angle) {
    return _m1.makeRotationZ(angle), this.applyMatrix4(_m1), this;
  }
  /**
   * Translates the geometry. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#position} for typical
   * real-time mesh rotation.
   *
   * @param {number} x - The x offset.
   * @param {number} y - The y offset.
   * @param {number} z - The z offset.
   * @return {BufferGeometry} A reference to this instance.
   */
  translate(x, y, z) {
    return _m1.makeTranslation(x, y, z), this.applyMatrix4(_m1), this;
  }
  /**
   * Scales the geometry. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#scale} for typical
   * real-time mesh rotation.
   *
   * @param {number} x - The x scale.
   * @param {number} y - The y scale.
   * @param {number} z - The z scale.
   * @return {BufferGeometry} A reference to this instance.
   */
  scale(x, y, z) {
    return _m1.makeScale(x, y, z), this.applyMatrix4(_m1), this;
  }
  /**
   * Rotates the geometry to face a point in 3D space. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#lookAt} for typical
   * real-time mesh rotation.
   *
   * @param {Vector3} vector - The target point.
   * @return {BufferGeometry} A reference to this instance.
   */
  lookAt(vector) {
    return _obj.lookAt(vector), _obj.updateMatrix(), this.applyMatrix4(_obj.matrix), this;
  }
  /**
   * Center the geometry based on its bounding box.
   *
   * @return {BufferGeometry} A reference to this instance.
   */
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(_offset).negate(), this.translate(_offset.x, _offset.y, _offset.z), this;
  }
  setFromPoints(points) {
    const positionAttribute = this.getAttribute("position");
    if (void 0 === positionAttribute) {
      const position = [];
      for (let i = 0, l = points.length; i < l; i++) {
        const point = points[i];
        position.push(point.x, point.y, point.z || 0);
      }
      this.setAttribute("position", new Float32BufferAttribute(position, 3));
    } else {
      const l = Math.min(points.length, positionAttribute.count);
      for (let i = 0; i < l; i++) {
        const point = points[i];
        positionAttribute.setXYZ(i, point.x, point.y, point.z || 0);
      }
      points.length > positionAttribute.count && warn("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), positionAttribute.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    null === this.boundingBox && (this.boundingBox = new Box3());
    const position = this.attributes.position,
      morphAttributesPosition = this.morphAttributes.position;
    if (position && position.isGLBufferAttribute) return error("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), void this.boundingBox.set(new Vector3(-1 / 0, -1 / 0, -1 / 0), new Vector3(1 / 0, 1 / 0, 1 / 0));
    if (void 0 !== position) {
      if (this.boundingBox.setFromBufferAttribute(position), morphAttributesPosition) for (let i = 0, il = morphAttributesPosition.length; i < il; i++) {
        const morphAttribute = morphAttributesPosition[i];
        sa.setFromBufferAttribute(morphAttribute), this.morphTargetsRelative ? (_vector$9.addVectors(this.boundingBox.min, sa.min), this.boundingBox.expandByPoint(_vector$9), _vector$9.addVectors(this.boundingBox.max, sa.max), this.boundingBox.expandByPoint(_vector$9)) : (this.boundingBox.expandByPoint(sa.min), this.boundingBox.expandByPoint(sa.max));
      }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && error('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    null === this.boundingSphere && (this.boundingSphere = new Sphere());
    const position = this.attributes.position,
      morphAttributesPosition = this.morphAttributes.position;
    if (position && position.isGLBufferAttribute) return error("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), void this.boundingSphere.set(new Vector3(), 1 / 0);
    if (position) {
      const center = this.boundingSphere.center;
      if (sa.setFromBufferAttribute(position), morphAttributesPosition) for (let i = 0, il = morphAttributesPosition.length; i < il; i++) {
        const morphAttribute = morphAttributesPosition[i];
        oa.setFromBufferAttribute(morphAttribute), this.morphTargetsRelative ? (_vector$9.addVectors(sa.min, oa.min), sa.expandByPoint(_vector$9), _vector$9.addVectors(sa.max, oa.max), sa.expandByPoint(_vector$9)) : (sa.expandByPoint(oa.min), sa.expandByPoint(oa.max));
      }
      sa.getCenter(center);
      let maxRadiusSq = 0;
      for (let i = 0, il = position.count; i < il; i++) _vector$9.fromBufferAttribute(position, i), maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_vector$9));
      if (morphAttributesPosition) for (let i = 0, il = morphAttributesPosition.length; i < il; i++) {
        const morphAttribute = morphAttributesPosition[i],
          morphTargetsRelative = this.morphTargetsRelative;
        for (let j = 0, jl = morphAttribute.count; j < jl; j++) _vector$9.fromBufferAttribute(morphAttribute, j), morphTargetsRelative && (_offset.fromBufferAttribute(position, j), _vector$9.add(_offset)), maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_vector$9));
      }
      this.boundingSphere.radius = Math.sqrt(maxRadiusSq), isNaN(this.boundingSphere.radius) && error('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  /* 缺少 index/position/normal/uv 时记录 error 并退出。新建或复用 count 相符的四分量 tangent。生成值写 attribute，返回 undefined。 */
  computeTangents() {
    const index = this.index,
      attributes = this.attributes;
    if (null === index || void 0 === attributes.position || void 0 === attributes.normal || void 0 === attributes.uv) return void error("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
    const n = attributes.position,
      r = attributes.normal,
      i = attributes.uv;
    let a = this.getAttribute("tangent");
    void 0 !== a && a.count === n.count || (a = new BufferAttribute(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", a));
    const s = [],
      o = [];
    for (let e = 0; e < n.count; e++) s[e] = new Vector3(), o[e] = new Vector3();
    const c = new Vector3(),
      l = new Vector3(),
      u = new Vector3(),
      d = new Vector2(),
      h = new Vector2(),
      p = new Vector2(),
      f = new Vector3(),
      m = new Vector3();
    function M(e, t, r) {
      c.fromBufferAttribute(n, e), l.fromBufferAttribute(n, t), u.fromBufferAttribute(n, r), d.fromBufferAttribute(i, e), h.fromBufferAttribute(i, t), p.fromBufferAttribute(i, r), l.sub(c), u.sub(c), h.sub(d), p.sub(d);
      const a = 1 / (h.x * p.y - p.x * h.y);
      isFinite(a) && (f.copy(l).multiplyScalar(p.y).addScaledVector(u, -h.y).multiplyScalar(a), m.copy(u).multiplyScalar(h.x).addScaledVector(l, -p.x).multiplyScalar(a), s[e].add(f), s[t].add(f), s[r].add(f), o[e].add(m), o[t].add(m), o[r].add(m));
    }
    let groups = this.groups;
    0 === groups.length && (groups = [{
      start: 0,
      count: index.count
    }]);
    for (let t = 0, n = groups.length; t < n; ++t) {
      const n = groups[t],
        r = n.start;
      for (let t = r, i = r + n.count; t < i; t += 3) M(index.getX(t + 0), index.getX(t + 1), index.getX(t + 2));
    }
    const A = new Vector3(),
      g = new Vector3(),
      b = new Vector3(),
      y = new Vector3();
    function L(e) {
      b.fromBufferAttribute(r, e), y.copy(b);
      const t = s[e];
      A.copy(t), A.sub(b.multiplyScalar(b.dot(t))).normalize(), g.crossVectors(y, t);
      const n = g.dot(o[e]) < 0 ? -1 : 1;
      a.setXYZW(e, A.x, A.y, A.z, n);
    }
    for (let t = 0, n = groups.length; t < n; ++t) {
      const n = groups[t],
        r = n.start;
      for (let t = r, i = r + n.count; t < i; t += 3) L(index.getX(t + 0)), L(index.getX(t + 1)), L(index.getX(t + 2));
    }
    this._transformed = !0;
  }
  computeVertexNormals() {
    const index = this.index,
      positionAttribute = this.getAttribute("position");
    if (void 0 !== positionAttribute) {
      let normalAttribute = this.getAttribute("normal");
      if (void 0 === normalAttribute || normalAttribute.count !== positionAttribute.count) normalAttribute = new BufferAttribute(new Float32Array(3 * positionAttribute.count), 3), this.setAttribute("normal", normalAttribute);else for (let i = 0, il = normalAttribute.count; i < il; i++) normalAttribute.setXYZ(i, 0, 0, 0);
      const pA = new Vector3(),
        pB = new Vector3(),
        pC = new Vector3(),
        nA = new Vector3(),
        nB = new Vector3(),
        nC = new Vector3(),
        cb = new Vector3(),
        ab = new Vector3();
      if (index) for (let i = 0, il = index.count; i < il; i += 3) {
        const vA = index.getX(i + 0),
          vB = index.getX(i + 1),
          vC = index.getX(i + 2);
        pA.fromBufferAttribute(positionAttribute, vA), pB.fromBufferAttribute(positionAttribute, vB), pC.fromBufferAttribute(positionAttribute, vC), cb.subVectors(pC, pB), ab.subVectors(pA, pB), cb.cross(ab), nA.fromBufferAttribute(normalAttribute, vA), nB.fromBufferAttribute(normalAttribute, vB), nC.fromBufferAttribute(normalAttribute, vC), nA.add(cb), nB.add(cb), nC.add(cb), normalAttribute.setXYZ(vA, nA.x, nA.y, nA.z), normalAttribute.setXYZ(vB, nB.x, nB.y, nB.z), normalAttribute.setXYZ(vC, nC.x, nC.y, nC.z);
      } else for (let i = 0, il = positionAttribute.count; i < il; i += 3) pA.fromBufferAttribute(positionAttribute, i + 0), pB.fromBufferAttribute(positionAttribute, i + 1), pC.fromBufferAttribute(positionAttribute, i + 2), cb.subVectors(pC, pB), ab.subVectors(pA, pB), cb.cross(ab), normalAttribute.setXYZ(i + 0, cb.x, cb.y, cb.z), normalAttribute.setXYZ(i + 1, cb.x, cb.y, cb.z), normalAttribute.setXYZ(i + 2, cb.x, cb.y, cb.z);
      this.normalizeNormals(), normalAttribute.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const normals = this.attributes.normal;
    for (let i = 0, il = normals.count; i < il; i++) _vector$9.fromBufferAttribute(normals, i), _vector$9.normalize(), normals.setXYZ(i, _vector$9.x, _vector$9.y, _vector$9.z);
  }
  /* 有 index 时新建 BufferGeometry，按 index 逐项展开所有 attributes 和 morphAttributes；交错属性从 data.stride+offset 取数据，保留原 typed-array 构造类型、itemSize、normalized。复制 morphTargetsRelative 和组范围，新缓冲独立持有数据；没有复制任意元数据。已非索引时警告并返回 this，而非克隆。 */
  toNonIndexed() {
    function e(e, t) {
      const n = e.array,
        r = e.itemSize,
        i = e.normalized,
        constructor = new n.constructor(t.length * r);
      let s = 0,
        o = 0;
      for (let i = 0, c = t.length; i < c; i++) {
        s = e.isInterleavedBufferAttribute ? t[i] * e.data.stride + e.offset : t[i] * r;
        for (let e = 0; e < r; e++) constructor[o++] = n[s++];
      }
      return new BufferAttribute(constructor, r, i);
    }
    if (null === this.index) return warn("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const bufferGeometry = new BufferGeometry(),
      n = this.index.array,
      attributes = this.attributes;
    for (const i in attributes) {
      const a = e(attributes[i], n);
      bufferGeometry.setAttribute(i, a);
    }
    const morphAttributes = this.morphAttributes;
    for (const r in morphAttributes) {
      const a = [],
        s = morphAttributes[r];
      for (let t = 0, r = s.length; t < r; t++) {
        const r = e(s[t], n);
        a.push(r);
      }
      bufferGeometry.morphAttributes[r] = a;
    }
    bufferGeometry.morphTargetsRelative = this.morphTargetsRelative;
    const groups = this.groups;
    for (let e = 0, n = groups.length; e < n; e++) {
      const n = groups[e];
      bufferGeometry.addGroup(n.start, n.count, n.materialIndex);
    }
    return bufferGeometry;
  }
  toJSON() {
    const data = {
      metadata: {
        version: 4.7,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (data.uuid = this.uuid, data.type = void 0 !== this.parameters && !0 === this._transformed ? "BufferGeometry" : this.type, "" !== this.name && (data.name = this.name), Object.keys(this.userData).length > 0 && (data.userData = this.userData), void 0 !== this.parameters && !0 !== this._transformed) {
      const parameters = this.parameters;
      for (const key in parameters) void 0 !== parameters[key] && (data[key] = parameters[key]);
      return data;
    }
    data.data = {
      attributes: {}
    };
    const index = this.index;
    null !== index && (data.data.index = {
      type: index.array.constructor.name,
      array: Array.prototype.slice.call(index.array)
    });
    const attributes = this.attributes;
    for (const key in attributes) {
      const attribute = attributes[key];
      data.data.attributes[key] = attribute.toJSON(data.data);
    }
    const morphAttributes = {};
    let hasMorphAttributes = !1;
    for (const key in this.morphAttributes) {
      const attributeArray = this.morphAttributes[key],
        array = [];
      for (let i = 0, il = attributeArray.length; i < il; i++) {
        const attribute = attributeArray[i];
        array.push(attribute.toJSON(data.data));
      }
      array.length > 0 && (morphAttributes[key] = array, hasMorphAttributes = !0);
    }
    hasMorphAttributes && (data.data.morphAttributes = morphAttributes, data.data.morphTargetsRelative = this.morphTargetsRelative);
    const groups = this.groups;
    groups.length > 0 && (data.data.groups = JSON.parse(JSON.stringify(groups)));
    const boundingSphere = this.boundingSphere;
    return null !== boundingSphere && (data.data.boundingSphere = boundingSphere.toJSON()), data;
  }
  /**
   * Returns a new geometry with copied values from this instance.
   *
   * @return {BufferGeometry} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  copy(source) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const data = {};
    this.name = source.name;
    const index = source.index;
    null !== index && this.setIndex(index.clone());
    const attributes = source.attributes;
    for (const name in attributes) {
      const attribute = attributes[name];
      this.setAttribute(name, attribute.clone(data));
    }
    const morphAttributes = source.morphAttributes;
    for (const name in morphAttributes) {
      const array = [],
        morphAttribute = morphAttributes[name];
      for (let i = 0, l = morphAttribute.length; i < l; i++) array.push(morphAttribute[i].clone(data));
      this.morphAttributes[name] = array;
    }
    this.morphTargetsRelative = source.morphTargetsRelative;
    const groups = source.groups;
    for (let i = 0, l = groups.length; i < l; i++) {
      const group = groups[i];
      this.addGroup(group.start, group.count, group.materialIndex);
    }
    const boundingBox = source.boundingBox;
    null !== boundingBox && (this.boundingBox = boundingBox.clone());
    const boundingSphere = source.boundingSphere;
    return null !== boundingSphere && (this.boundingSphere = boundingSphere.clone()), this.drawRange.start = source.drawRange.start, this.drawRange.count = source.drawRange.count, this.userData = source.userData, this._transformed = source._transformed, this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
}
/**
 * "Interleaved" means that multiple attributes, possibly of different types,
 * (e.g., position, normal, uv, color) are packed into a single array buffer.
 *
 * An introduction into interleaved arrays can be found here: [Interleaved array basics](https://blog.tojicode.com/2011/05/interleaved-array-basics.html)
 */
class InterleavedBuffer {
  constructor(array, stride) {
    this.isInterleavedBuffer = !0, this.array = array, this.stride = stride, this.count = void 0 !== array ? array.length / stride : 0, this.usage = StaticDrawUsage, this.updateRanges = [], this.version = 0, this.uuid = generateUUID();
  }
  onUploadCallback() {}
  set needsUpdate(value) {
    !0 === value && this.version++;
  }
  /**
   * Sets the usage of this interleaved buffer.
   *
   * @param {(StaticDrawUsage|DynamicDrawUsage|StreamDrawUsage|StaticReadUsage|DynamicReadUsage|StreamReadUsage|StaticCopyUsage|DynamicCopyUsage|StreamCopyUsage)} value - The usage to set.
   * @return {InterleavedBuffer} A reference to this interleaved buffer.
   */
  setUsage(value) {
    return this.usage = value, this;
  }
  /**
   * Adds a range of data in the data array to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(start, count) {
    this.updateRanges.push({
      start: start,
      count: count
    });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Copies the values of the given interleaved buffer to this instance.
   *
   * @param {InterleavedBuffer} source - The interleaved buffer to copy.
   * @return {InterleavedBuffer} A reference to this instance.
   */
  copy(source) {
    return this.array = new source.array.constructor(source.array), this.count = source.count, this.stride = source.stride, this.usage = source.usage, this;
  }
  copyAt(index1, interleavedBuffer, index2) {
    index1 *= this.stride, index2 *= interleavedBuffer.stride;
    for (let i = 0, l = this.stride; i < l; i++) this.array[index1 + i] = interleavedBuffer.array[index2 + i];
    return this;
  }
  /**
   * Sets the given array data in the interleaved buffer.
   *
   * @param {(TypedArray|Array)} value - The array data to set.
   * @param {number} [offset=0] - The offset in this interleaved buffer's array.
   * @return {InterleavedBuffer} A reference to this instance.
   */
  set(value, offset = 0) {
    return this.array.set(value, offset), this;
  }
  clone(data) {
    void 0 === data.arrayBuffers && (data.arrayBuffers = {}), void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = generateUUID()), void 0 === data.arrayBuffers[this.array.buffer._uuid] && (data.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
    const array = new this.array.constructor(data.arrayBuffers[this.array.buffer._uuid]),
      ib = new this.constructor(array, this.stride);
    return ib.setUsage(this.usage), ib;
  }
  /**
   * Sets the given callback function that is executed after the Renderer has transferred
   * the array data to the GPU. Can be used to perform clean-up operations after
   * the upload when data are not needed anymore on the CPU side.
   *
   * @param {Function} callback - The `onUpload()` callback.
   * @return {InterleavedBuffer} A reference to this instance.
   */
  onUpload(callback) {
    return this.onUploadCallback = callback, this;
  }
  toJSON(data) {
    return void 0 === data.arrayBuffers && (data.arrayBuffers = {}), void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = generateUUID()), void 0 === data.arrayBuffers[this.array.buffer._uuid] && (data.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), {
      uuid: this.uuid,
      buffer: this.array.buffer._uuid,
      type: this.array.constructor.name,
      stride: this.stride
    };
  }
}
const _vector$8 = new Vector3();
/**
 * An alternative version of a buffer attribute with interleaved data. Interleaved
 * attributes share a common interleaved data storage ({@link InterleavedBuffer}) and refer with
 * different offsets into the buffer.
 */
class InterleavedBufferAttribute {
  constructor(interleavedBuffer, itemSize, offset, normalized = !1) {
    this.isInterleavedBufferAttribute = !0, this.name = "", this.data = interleavedBuffer, this.itemSize = itemSize, this.offset = offset, this.normalized = normalized;
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  /**
   * Flag to indicate that this attribute has changed and should be re-sent to
   * the GPU. Set this to `true` when you modify the value of the array.
   *
   * @type {number}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(value) {
    this.data.needsUpdate = value;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  applyMatrix4(m) {
    for (let i = 0, l = this.data.count; i < l; i++) _vector$8.fromBufferAttribute(this, i), _vector$8.applyMatrix4(m), this.setXYZ(i, _vector$8.x, _vector$8.y, _vector$8.z);
    return this;
  }
  /**
   * Applies the given 3x3 normal matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix3} m - The normal matrix to apply.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  applyNormalMatrix(m) {
    for (let i = 0, l = this.count; i < l; i++) _vector$8.fromBufferAttribute(this, i), _vector$8.applyNormalMatrix(m), this.setXYZ(i, _vector$8.x, _vector$8.y, _vector$8.z);
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3` and with direction vectors.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  transformDirection(m) {
    for (let i = 0, l = this.count; i < l; i++) _vector$8.fromBufferAttribute(this, i), _vector$8.transformDirection(m), this.setXYZ(i, _vector$8.x, _vector$8.y, _vector$8.z);
    return this;
  }
  /**
   * Returns the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @return {number} The returned value.
   */
  getComponent(index, component) {
    let value = this.array[index * this.data.stride + this.offset + component];
    return this.normalized && (value = denormalize(value, this.array)), value;
  }
  /**
   * Sets the given value to the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @param {number} value - The value to set.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  setComponent(index, component, value) {
    return this.normalized && (value = normalize(value, this.array)), this.data.array[index * this.data.stride + this.offset + component] = value, this;
  }
  /**
   * Sets the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value to set.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  setX(index, x) {
    return this.normalized && (x = normalize(x, this.array)), this.data.array[index * this.data.stride + this.offset] = x, this;
  }
  /**
   * Sets the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} y - The value to set.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  setY(index, y) {
    return this.normalized && (y = normalize(y, this.array)), this.data.array[index * this.data.stride + this.offset + 1] = y, this;
  }
  /**
   * Sets the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} z - The value to set.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  setZ(index, z) {
    return this.normalized && (z = normalize(z, this.array)), this.data.array[index * this.data.stride + this.offset + 2] = z, this;
  }
  /**
   * Sets the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} w - The value to set.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  setW(index, w) {
    return this.normalized && (w = normalize(w, this.array)), this.data.array[index * this.data.stride + this.offset + 3] = w, this;
  }
  /**
   * Returns the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The x component.
   */
  getX(index) {
    let x = this.data.array[index * this.data.stride + this.offset];
    return this.normalized && (x = denormalize(x, this.array)), x;
  }
  /**
   * Returns the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The y component.
   */
  getY(index) {
    let y = this.data.array[index * this.data.stride + this.offset + 1];
    return this.normalized && (y = denormalize(y, this.array)), y;
  }
  /**
   * Returns the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The z component.
   */
  getZ(index) {
    let z = this.data.array[index * this.data.stride + this.offset + 2];
    return this.normalized && (z = denormalize(z, this.array)), z;
  }
  /**
   * Returns the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The w component.
   */
  getW(index) {
    let w = this.data.array[index * this.data.stride + this.offset + 3];
    return this.normalized && (w = denormalize(w, this.array)), w;
  }
  /**
   * Sets the x and y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  setXY(index, x, y) {
    return index = index * this.data.stride + this.offset, this.normalized && (x = normalize(x, this.array), y = normalize(y, this.array)), this.data.array[index + 0] = x, this.data.array[index + 1] = y, this;
  }
  /**
   * Sets the x, y and z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  setXYZ(index, x, y, z) {
    return index = index * this.data.stride + this.offset, this.normalized && (x = normalize(x, this.array), y = normalize(y, this.array), z = normalize(z, this.array)), this.data.array[index + 0] = x, this.data.array[index + 1] = y, this.data.array[index + 2] = z, this;
  }
  /**
   * Sets the x, y, z and w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @param {number} w - The value for the w component to set.
   * @return {InterleavedBufferAttribute} A reference to this instance.
   */
  setXYZW(index, x, y, z, w) {
    return index = index * this.data.stride + this.offset, this.normalized && (x = normalize(x, this.array), y = normalize(y, this.array), z = normalize(z, this.array), w = normalize(w, this.array)), this.data.array[index + 0] = x, this.data.array[index + 1] = y, this.data.array[index + 2] = z, this.data.array[index + 3] = w, this;
  }
  clone(data) {
    if (void 0 === data) {
      log("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
      const array = [];
      for (let i = 0; i < this.count; i++) {
        const index = i * this.data.stride + this.offset;
        for (let j = 0; j < this.itemSize; j++) array.push(this.data.array[index + j]);
      }
      return new BufferAttribute(new this.array.constructor(array), this.itemSize, this.normalized);
    }
    return void 0 === data.interleavedBuffers && (data.interleavedBuffers = {}), void 0 === data.interleavedBuffers[this.data.uuid] && (data.interleavedBuffers[this.data.uuid] = this.data.clone(data)), new InterleavedBufferAttribute(data.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
  }
  toJSON(data) {
    if (void 0 === data) {
      log("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
      const array = [];
      for (let i = 0; i < this.count; i++) {
        const index = i * this.data.stride + this.offset;
        for (let j = 0; j < this.itemSize; j++) array.push(this.data.array[index + j]);
      }
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: array,
        normalized: this.normalized
      };
    }
    return void 0 === data.interleavedBuffers && (data.interleavedBuffers = {}), void 0 === data.interleavedBuffers[this.data.uuid] && (data.interleavedBuffers[this.data.uuid] = this.data.toJSON(data)), {
      isInterleavedBufferAttribute: !0,
      itemSize: this.itemSize,
      data: this.data.uuid,
      offset: this.offset,
      normalized: this.normalized
    };
  }
}
let geometry,
  da = 0;
/**
 * Abstract base class for materials.
 *
 * Materials define the appearance of renderable 3D objects.
 *
 * @abstract
 * @augments EventDispatcher
 */
class Material extends EventDispatcher {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", {
      value: da++
    }), this.uuid = generateUUID(), this.name = "", this.type = "Material", this.blending = NormalBlending, this.side = FrontSide, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = SrcAlphaFactor, this.blendDst = OneMinusSrcAlphaFactor, this.blendEquation = AddEquation, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Color(0, 0, 0), this.blendAlpha = 0, this.depthFunc = LessEqualDepth, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = AlwaysStencilFunc, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = KeepStencilOp, this.stencilZFail = KeepStencilOp, this.stencilZPass = KeepStencilOp, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(value) {
    this._alphaTest > 0 != value > 0 && this.version++, this._alphaTest = value;
  }
  /**
   * An optional callback that is executed immediately before the material is used to render a 3D object.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Scene} scene - The scene.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Object3D} object - The 3D object.
   * @param {Object} group - The geometry group data.
   */
  onBeforeRender() {}
  /**
   * An optional callback that is executed immediately before the shader
   * program is compiled. This function is called with the shader source code
   * as a parameter. Useful for the modification of built-in materials.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}. The
   * recommended approach when customizing materials is to use `WebGPURenderer` with the new
   * Node Material system and [TSL](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language).
   *
   * @param {{vertexShader:string,fragmentShader:string,uniforms:Object}} shaderobject - The object holds the uniforms and the vertex and fragment shader source.
   * @param {WebGLRenderer} renderer - A reference to the renderer.
   */
  onBeforeCompile() {}
  /**
   * In case {@link Material#onBeforeCompile} is used, this callback can be used to identify
   * values of settings used in `onBeforeCompile()`, so three.js can reuse a cached
   * shader or recompile the shader for this material as needed.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}.
   *
   * @return {string} The custom program cache key.
   */
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  /* undefined 输入直接结束；逐属性跳过 undefined/未知属性并警告。已有 Color 调 set，已有同类型 Vector2/Euler/Vector3 调 copy，否则替换引用。与 Texture.setValues 不同，Color 可以接受数字或字符串值，也支持 Euler；不自动深拷贝纹理，不统一置 needsUpdate。 */
  setValues(e) {
    if (void 0 !== e) for (const t in e) {
      const n = e[t];
      if (void 0 === n) {
        warn(`Material: parameter '${t}' has value of undefined.`);
        continue;
      }
      const r = this[t];
      void 0 !== r ? r && r.isColor ? r.set(n) : r && r.isVector2 && n && n.isVector2 || r && r.isEuler && n && n.isEuler || r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n : warn(`Material: '${t}' is not a property of THREE.${this.type}.`);
    }
  }
  toJSON(meta) {
    const isRootObject = void 0 === meta || "string" == typeof meta;
    isRootObject && (meta = {
      textures: {},
      images: {}
    });
    const data = {
      metadata: {
        version: 4.7,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    function extractFromCache(cache) {
      const values = [];
      for (const key in cache) {
        const data = cache[key];
        delete data.metadata, values.push(data);
      }
      return values;
    }
    if (data.uuid = this.uuid, data.type = this.type, "" !== this.name && (data.name = this.name), this.color && this.color.isColor && (data.color = this.color.getHex()), void 0 !== this.roughness && (data.roughness = this.roughness), void 0 !== this.metalness && (data.metalness = this.metalness), void 0 !== this.sheen && (data.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (data.sheenColor = this.sheenColor.getHex()), void 0 !== this.sheenRoughness && (data.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (data.emissive = this.emissive.getHex()), void 0 !== this.emissiveIntensity && 1 !== this.emissiveIntensity && (data.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (data.specular = this.specular.getHex()), void 0 !== this.specularIntensity && (data.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (data.specularColor = this.specularColor.getHex()), void 0 !== this.shininess && (data.shininess = this.shininess), void 0 !== this.clearcoat && (data.clearcoat = this.clearcoat), void 0 !== this.clearcoatRoughness && (data.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (data.clearcoatMap = this.clearcoatMap.toJSON(meta).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (data.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(meta).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (data.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(meta).uuid, data.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (data.sheenColorMap = this.sheenColorMap.toJSON(meta).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (data.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(meta).uuid), void 0 !== this.dispersion && (data.dispersion = this.dispersion), void 0 !== this.iridescence && (data.iridescence = this.iridescence), void 0 !== this.iridescenceIOR && (data.iridescenceIOR = this.iridescenceIOR), void 0 !== this.iridescenceThicknessRange && (data.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (data.iridescenceMap = this.iridescenceMap.toJSON(meta).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (data.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(meta).uuid), void 0 !== this.anisotropy && (data.anisotropy = this.anisotropy), void 0 !== this.anisotropyRotation && (data.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (data.anisotropyMap = this.anisotropyMap.toJSON(meta).uuid), this.map && this.map.isTexture && (data.map = this.map.toJSON(meta).uuid), this.matcap && this.matcap.isTexture && (data.matcap = this.matcap.toJSON(meta).uuid), this.alphaMap && this.alphaMap.isTexture && (data.alphaMap = this.alphaMap.toJSON(meta).uuid), this.lightMap && this.lightMap.isTexture && (data.lightMap = this.lightMap.toJSON(meta).uuid, data.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (data.aoMap = this.aoMap.toJSON(meta).uuid, data.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (data.bumpMap = this.bumpMap.toJSON(meta).uuid, data.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (data.normalMap = this.normalMap.toJSON(meta).uuid, data.normalMapType = this.normalMapType, data.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (data.displacementMap = this.displacementMap.toJSON(meta).uuid, data.displacementScale = this.displacementScale, data.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (data.roughnessMap = this.roughnessMap.toJSON(meta).uuid), this.metalnessMap && this.metalnessMap.isTexture && (data.metalnessMap = this.metalnessMap.toJSON(meta).uuid), this.emissiveMap && this.emissiveMap.isTexture && (data.emissiveMap = this.emissiveMap.toJSON(meta).uuid), this.specularMap && this.specularMap.isTexture && (data.specularMap = this.specularMap.toJSON(meta).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (data.specularIntensityMap = this.specularIntensityMap.toJSON(meta).uuid), this.specularColorMap && this.specularColorMap.isTexture && (data.specularColorMap = this.specularColorMap.toJSON(meta).uuid), this.envMap && this.envMap.isTexture && (data.envMap = this.envMap.toJSON(meta).uuid, void 0 !== this.combine && (data.combine = this.combine)), void 0 !== this.envMapRotation && (data.envMapRotation = this.envMapRotation.toArray()), void 0 !== this.envMapIntensity && (data.envMapIntensity = this.envMapIntensity), void 0 !== this.reflectivity && (data.reflectivity = this.reflectivity), void 0 !== this.refractionRatio && (data.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (data.gradientMap = this.gradientMap.toJSON(meta).uuid), void 0 !== this.transmission && (data.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (data.transmissionMap = this.transmissionMap.toJSON(meta).uuid), void 0 !== this.thickness && (data.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (data.thicknessMap = this.thicknessMap.toJSON(meta).uuid), void 0 !== this.attenuationDistance && this.attenuationDistance !== 1 / 0 && (data.attenuationDistance = this.attenuationDistance), void 0 !== this.attenuationColor && (data.attenuationColor = this.attenuationColor.getHex()), void 0 !== this.size && (data.size = this.size), null !== this.shadowSide && (data.shadowSide = this.shadowSide), void 0 !== this.sizeAttenuation && (data.sizeAttenuation = this.sizeAttenuation), this.blending !== NormalBlending && (data.blending = this.blending), this.side !== FrontSide && (data.side = this.side), !0 === this.vertexColors && (data.vertexColors = !0), this.opacity < 1 && (data.opacity = this.opacity), !0 === this.transparent && (data.transparent = !0), this.blendSrc !== SrcAlphaFactor && (data.blendSrc = this.blendSrc), this.blendDst !== OneMinusSrcAlphaFactor && (data.blendDst = this.blendDst), this.blendEquation !== AddEquation && (data.blendEquation = this.blendEquation), null !== this.blendSrcAlpha && (data.blendSrcAlpha = this.blendSrcAlpha), null !== this.blendDstAlpha && (data.blendDstAlpha = this.blendDstAlpha), null !== this.blendEquationAlpha && (data.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (data.blendColor = this.blendColor.getHex()), 0 !== this.blendAlpha && (data.blendAlpha = this.blendAlpha), this.depthFunc !== LessEqualDepth && (data.depthFunc = this.depthFunc), !1 === this.depthTest && (data.depthTest = this.depthTest), !1 === this.depthWrite && (data.depthWrite = this.depthWrite), !1 === this.colorWrite && (data.colorWrite = this.colorWrite), 255 !== this.stencilWriteMask && (data.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== AlwaysStencilFunc && (data.stencilFunc = this.stencilFunc), 0 !== this.stencilRef && (data.stencilRef = this.stencilRef), 255 !== this.stencilFuncMask && (data.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== KeepStencilOp && (data.stencilFail = this.stencilFail), this.stencilZFail !== KeepStencilOp && (data.stencilZFail = this.stencilZFail), this.stencilZPass !== KeepStencilOp && (data.stencilZPass = this.stencilZPass), !0 === this.stencilWrite && (data.stencilWrite = this.stencilWrite), void 0 !== this.rotation && 0 !== this.rotation && (data.rotation = this.rotation), !0 === this.polygonOffset && (data.polygonOffset = !0), 0 !== this.polygonOffsetFactor && (data.polygonOffsetFactor = this.polygonOffsetFactor), 0 !== this.polygonOffsetUnits && (data.polygonOffsetUnits = this.polygonOffsetUnits), void 0 !== this.linewidth && 1 !== this.linewidth && (data.linewidth = this.linewidth), void 0 !== this.dashSize && (data.dashSize = this.dashSize), void 0 !== this.gapSize && (data.gapSize = this.gapSize), void 0 !== this.scale && (data.scale = this.scale), !0 === this.dithering && (data.dithering = !0), this.alphaTest > 0 && (data.alphaTest = this.alphaTest), !0 === this.alphaHash && (data.alphaHash = !0), !0 === this.alphaToCoverage && (data.alphaToCoverage = !0), !0 === this.premultipliedAlpha && (data.premultipliedAlpha = !0), !0 === this.forceSinglePass && (data.forceSinglePass = !0), !1 === this.allowOverride && (data.allowOverride = !1), !0 === this.wireframe && (data.wireframe = !0), this.wireframeLinewidth > 1 && (data.wireframeLinewidth = this.wireframeLinewidth), "round" !== this.wireframeLinecap && (data.wireframeLinecap = this.wireframeLinecap), "round" !== this.wireframeLinejoin && (data.wireframeLinejoin = this.wireframeLinejoin), !0 === this.flatShading && (data.flatShading = !0), !1 === this.visible && (data.visible = !1), !1 === this.toneMapped && (data.toneMapped = !1), !1 === this.fog && (data.fog = !1), Object.keys(this.userData).length > 0 && (data.userData = this.userData), isRootObject) {
      const textures = extractFromCache(meta.textures),
        images = extractFromCache(meta.images);
      textures.length > 0 && (data.textures = textures), images.length > 0 && (data.images = images);
    }
    return data;
  }
  fromJSON(json, textures) {
    if (void 0 !== json.uuid && (this.uuid = json.uuid), void 0 !== json.name && (this.name = json.name), void 0 !== json.color && void 0 !== this.color && this.color.setHex(json.color), void 0 !== json.roughness && (this.roughness = json.roughness), void 0 !== json.metalness && (this.metalness = json.metalness), void 0 !== json.sheen && (this.sheen = json.sheen), void 0 !== json.sheenColor && (this.sheenColor = new Color().setHex(json.sheenColor)), void 0 !== json.sheenRoughness && (this.sheenRoughness = json.sheenRoughness), void 0 !== json.emissive && void 0 !== this.emissive && this.emissive.setHex(json.emissive), void 0 !== json.specular && void 0 !== this.specular && this.specular.setHex(json.specular), void 0 !== json.specularIntensity && (this.specularIntensity = json.specularIntensity), void 0 !== json.specularColor && void 0 !== this.specularColor && this.specularColor.setHex(json.specularColor), void 0 !== json.shininess && (this.shininess = json.shininess), void 0 !== json.clearcoat && (this.clearcoat = json.clearcoat), void 0 !== json.clearcoatRoughness && (this.clearcoatRoughness = json.clearcoatRoughness), void 0 !== json.dispersion && (this.dispersion = json.dispersion), void 0 !== json.iridescence && (this.iridescence = json.iridescence), void 0 !== json.iridescenceIOR && (this.iridescenceIOR = json.iridescenceIOR), void 0 !== json.iridescenceThicknessRange && (this.iridescenceThicknessRange = json.iridescenceThicknessRange), void 0 !== json.transmission && (this.transmission = json.transmission), void 0 !== json.thickness && (this.thickness = json.thickness), void 0 !== json.attenuationDistance && (this.attenuationDistance = json.attenuationDistance), void 0 !== json.attenuationColor && void 0 !== this.attenuationColor && this.attenuationColor.setHex(json.attenuationColor), void 0 !== json.anisotropy && (this.anisotropy = json.anisotropy), void 0 !== json.anisotropyRotation && (this.anisotropyRotation = json.anisotropyRotation), void 0 !== json.fog && (this.fog = json.fog), void 0 !== json.flatShading && (this.flatShading = json.flatShading), void 0 !== json.blending && (this.blending = json.blending), void 0 !== json.combine && (this.combine = json.combine), void 0 !== json.side && (this.side = json.side), void 0 !== json.shadowSide && (this.shadowSide = json.shadowSide), void 0 !== json.opacity && (this.opacity = json.opacity), void 0 !== json.transparent && (this.transparent = json.transparent), void 0 !== json.alphaTest && (this.alphaTest = json.alphaTest), void 0 !== json.alphaHash && (this.alphaHash = json.alphaHash), void 0 !== json.depthFunc && (this.depthFunc = json.depthFunc), void 0 !== json.depthTest && (this.depthTest = json.depthTest), void 0 !== json.depthWrite && (this.depthWrite = json.depthWrite), void 0 !== json.colorWrite && (this.colorWrite = json.colorWrite), void 0 !== json.blendSrc && (this.blendSrc = json.blendSrc), void 0 !== json.blendDst && (this.blendDst = json.blendDst), void 0 !== json.blendEquation && (this.blendEquation = json.blendEquation), void 0 !== json.blendSrcAlpha && (this.blendSrcAlpha = json.blendSrcAlpha), void 0 !== json.blendDstAlpha && (this.blendDstAlpha = json.blendDstAlpha), void 0 !== json.blendEquationAlpha && (this.blendEquationAlpha = json.blendEquationAlpha), void 0 !== json.blendColor && void 0 !== this.blendColor && this.blendColor.setHex(json.blendColor), void 0 !== json.blendAlpha && (this.blendAlpha = json.blendAlpha), void 0 !== json.stencilWriteMask && (this.stencilWriteMask = json.stencilWriteMask), void 0 !== json.stencilFunc && (this.stencilFunc = json.stencilFunc), void 0 !== json.stencilRef && (this.stencilRef = json.stencilRef), void 0 !== json.stencilFuncMask && (this.stencilFuncMask = json.stencilFuncMask), void 0 !== json.stencilFail && (this.stencilFail = json.stencilFail), void 0 !== json.stencilZFail && (this.stencilZFail = json.stencilZFail), void 0 !== json.stencilZPass && (this.stencilZPass = json.stencilZPass), void 0 !== json.stencilWrite && (this.stencilWrite = json.stencilWrite), void 0 !== json.wireframe && (this.wireframe = json.wireframe), void 0 !== json.wireframeLinewidth && (this.wireframeLinewidth = json.wireframeLinewidth), void 0 !== json.wireframeLinecap && (this.wireframeLinecap = json.wireframeLinecap), void 0 !== json.wireframeLinejoin && (this.wireframeLinejoin = json.wireframeLinejoin), void 0 !== json.rotation && (this.rotation = json.rotation), void 0 !== json.linewidth && (this.linewidth = json.linewidth), void 0 !== json.dashSize && (this.dashSize = json.dashSize), void 0 !== json.gapSize && (this.gapSize = json.gapSize), void 0 !== json.scale && (this.scale = json.scale), void 0 !== json.polygonOffset && (this.polygonOffset = json.polygonOffset), void 0 !== json.polygonOffsetFactor && (this.polygonOffsetFactor = json.polygonOffsetFactor), void 0 !== json.polygonOffsetUnits && (this.polygonOffsetUnits = json.polygonOffsetUnits), void 0 !== json.dithering && (this.dithering = json.dithering), void 0 !== json.alphaToCoverage && (this.alphaToCoverage = json.alphaToCoverage), void 0 !== json.premultipliedAlpha && (this.premultipliedAlpha = json.premultipliedAlpha), void 0 !== json.forceSinglePass && (this.forceSinglePass = json.forceSinglePass), void 0 !== json.allowOverride && (this.allowOverride = json.allowOverride), void 0 !== json.visible && (this.visible = json.visible), void 0 !== json.toneMapped && (this.toneMapped = json.toneMapped), void 0 !== json.userData && (this.userData = json.userData), void 0 !== json.vertexColors && ("number" == typeof json.vertexColors ? this.vertexColors = json.vertexColors > 0 : this.vertexColors = json.vertexColors), void 0 !== json.size && (this.size = json.size), void 0 !== json.sizeAttenuation && (this.sizeAttenuation = json.sizeAttenuation), void 0 !== json.map && (this.map = textures[json.map] || null), void 0 !== json.matcap && (this.matcap = textures[json.matcap] || null), void 0 !== json.alphaMap && (this.alphaMap = textures[json.alphaMap] || null), void 0 !== json.bumpMap && (this.bumpMap = textures[json.bumpMap] || null), void 0 !== json.bumpScale && (this.bumpScale = json.bumpScale), void 0 !== json.normalMap && (this.normalMap = textures[json.normalMap] || null), void 0 !== json.normalMapType && (this.normalMapType = json.normalMapType), void 0 !== json.normalScale) {
      let normalScale = json.normalScale;
      !1 === Array.isArray(normalScale) && (normalScale = [normalScale, normalScale]), this.normalScale = new Vector2().fromArray(normalScale);
    }
    return void 0 !== json.displacementMap && (this.displacementMap = textures[json.displacementMap] || null), void 0 !== json.displacementScale && (this.displacementScale = json.displacementScale), void 0 !== json.displacementBias && (this.displacementBias = json.displacementBias), void 0 !== json.roughnessMap && (this.roughnessMap = textures[json.roughnessMap] || null), void 0 !== json.metalnessMap && (this.metalnessMap = textures[json.metalnessMap] || null), void 0 !== json.emissiveMap && (this.emissiveMap = textures[json.emissiveMap] || null), void 0 !== json.emissiveIntensity && (this.emissiveIntensity = json.emissiveIntensity), void 0 !== json.specularMap && (this.specularMap = textures[json.specularMap] || null), void 0 !== json.specularIntensityMap && (this.specularIntensityMap = textures[json.specularIntensityMap] || null), void 0 !== json.specularColorMap && (this.specularColorMap = textures[json.specularColorMap] || null), void 0 !== json.envMap && (this.envMap = textures[json.envMap] || null), void 0 !== json.envMapRotation && this.envMapRotation.fromArray(json.envMapRotation), void 0 !== json.envMapIntensity && (this.envMapIntensity = json.envMapIntensity), void 0 !== json.reflectivity && (this.reflectivity = json.reflectivity), void 0 !== json.refractionRatio && (this.refractionRatio = json.refractionRatio), void 0 !== json.lightMap && (this.lightMap = textures[json.lightMap] || null), void 0 !== json.lightMapIntensity && (this.lightMapIntensity = json.lightMapIntensity), void 0 !== json.aoMap && (this.aoMap = textures[json.aoMap] || null), void 0 !== json.aoMapIntensity && (this.aoMapIntensity = json.aoMapIntensity), void 0 !== json.gradientMap && (this.gradientMap = textures[json.gradientMap] || null), void 0 !== json.clearcoatMap && (this.clearcoatMap = textures[json.clearcoatMap] || null), void 0 !== json.clearcoatRoughnessMap && (this.clearcoatRoughnessMap = textures[json.clearcoatRoughnessMap] || null), void 0 !== json.clearcoatNormalMap && (this.clearcoatNormalMap = textures[json.clearcoatNormalMap] || null), void 0 !== json.clearcoatNormalScale && (this.clearcoatNormalScale = new Vector2().fromArray(json.clearcoatNormalScale)), void 0 !== json.iridescenceMap && (this.iridescenceMap = textures[json.iridescenceMap] || null), void 0 !== json.iridescenceThicknessMap && (this.iridescenceThicknessMap = textures[json.iridescenceThicknessMap] || null), void 0 !== json.transmissionMap && (this.transmissionMap = textures[json.transmissionMap] || null), void 0 !== json.thicknessMap && (this.thicknessMap = textures[json.thicknessMap] || null), void 0 !== json.anisotropyMap && (this.anisotropyMap = textures[json.anisotropyMap] || null), void 0 !== json.sheenColorMap && (this.sheenColorMap = textures[json.sheenColorMap] || null), void 0 !== json.sheenRoughnessMap && (this.sheenRoughnessMap = textures[json.sheenRoughnessMap] || null), this;
  }
  /**
   * Returns a new material with copied values from this instance.
   *
   * @return {Material} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  copy(source) {
    this.name = source.name, this.blending = source.blending, this.side = source.side, this.vertexColors = source.vertexColors, this.opacity = source.opacity, this.transparent = source.transparent, this.blendSrc = source.blendSrc, this.blendDst = source.blendDst, this.blendEquation = source.blendEquation, this.blendSrcAlpha = source.blendSrcAlpha, this.blendDstAlpha = source.blendDstAlpha, this.blendEquationAlpha = source.blendEquationAlpha, this.blendColor.copy(source.blendColor), this.blendAlpha = source.blendAlpha, this.depthFunc = source.depthFunc, this.depthTest = source.depthTest, this.depthWrite = source.depthWrite, this.stencilWriteMask = source.stencilWriteMask, this.stencilFunc = source.stencilFunc, this.stencilRef = source.stencilRef, this.stencilFuncMask = source.stencilFuncMask, this.stencilFail = source.stencilFail, this.stencilZFail = source.stencilZFail, this.stencilZPass = source.stencilZPass, this.stencilWrite = source.stencilWrite;
    const srcPlanes = source.clippingPlanes;
    let dstPlanes = null;
    if (null !== srcPlanes) {
      const n = srcPlanes.length;
      dstPlanes = new Array(n);
      for (let i = 0; i !== n; ++i) dstPlanes[i] = srcPlanes[i].clone();
    }
    return this.clippingPlanes = dstPlanes, this.clipIntersection = source.clipIntersection, this.clipShadows = source.clipShadows, this.shadowSide = source.shadowSide, this.colorWrite = source.colorWrite, this.precision = source.precision, this.polygonOffset = source.polygonOffset, this.polygonOffsetFactor = source.polygonOffsetFactor, this.polygonOffsetUnits = source.polygonOffsetUnits, this.dithering = source.dithering, this.alphaTest = source.alphaTest, this.alphaHash = source.alphaHash, this.alphaToCoverage = source.alphaToCoverage, this.premultipliedAlpha = source.premultipliedAlpha, this.forceSinglePass = source.forceSinglePass, this.allowOverride = source.allowOverride, this.visible = source.visible, this.toneMapped = source.toneMapped, this.userData = JSON.parse(JSON.stringify(source.userData)), this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
  set needsUpdate(value) {
    !0 === value && this.version++;
  }
}
/**
 * A material for rendering instances of {@link Sprite}.
 *
 * ```js
 * const map = new THREE.TextureLoader().load( 'textures/sprite.png' );
 * const material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );
 *
 * const sprite = new THREE.Sprite( material );
 * sprite.scale.set(200, 200, 1)
 * scene.add( sprite );
 * ```
 *
 * @augments Material
 */
class SpriteMaterial extends Material {
  constructor(parameters) {
    super(), this.isSpriteMaterial = !0, this.type = "SpriteMaterial", this.color = new Color(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.fog = !0, this.setValues(parameters);
  }
  copy(source) {
    return super.copy(source), this.color.copy(source.color), this.map = source.map, this.alphaMap = source.alphaMap, this.rotation = source.rotation, this.sizeAttenuation = source.sizeAttenuation, this.fog = source.fog, this;
  }
}
const ha = new Vector3(),
  pa = new Vector3(),
  fa = new Vector3(),
  ma = new Vector2(),
  Ma = new Vector2(),
  _a = new Matrix4(),
  Aa = new Vector3(),
  ga = new Vector3(),
  ba = new Vector3(),
  ya = new Vector2(),
  La = new Vector2(),
  va = new Vector2();
class Sprite extends Object3D {
  constructor(material = new SpriteMaterial()) {
    if (super(), this.isSprite = !0, this.type = "Sprite", void 0 === geometry) {
      geometry = new BufferGeometry();
      const float32Array = new Float32Array([-.5, -.5, 0, 0, 0, .5, -.5, 0, 1, 0, .5, .5, 0, 1, 1, -.5, .5, 0, 0, 1]),
        interleavedBuffer = new InterleavedBuffer(float32Array, 5);
      geometry.setIndex([0, 1, 2, 0, 2, 3]), geometry.setAttribute("position", new InterleavedBufferAttribute(interleavedBuffer, 3, 0, !1)), geometry.setAttribute("uv", new InterleavedBufferAttribute(interleavedBuffer, 2, 3, !1));
    }
    this.geometry = geometry, this.material = material, this.center = new Vector2(.5, .5), this.count = 1;
  }
  /* 根据 raycaster.camera 的世界矩阵构建朝向相机的四边形，采用 matrixWorld 尺度、center 和 material.rotation。透视相机且 sizeAttenuation=false 时乘相机空间负 z 保持屏幕尺寸。camera=null 只记录错误后仍继续访问，不能说是安全返回。 */
  raycast(e, t) {
    null === e.camera && error('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'), pa.setFromMatrixScale(this.matrixWorld), _a.copy(e.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld), fa.setFromMatrixPosition(this.modelViewMatrix), e.camera.isPerspectiveCamera && !1 === this.material.sizeAttenuation && pa.multiplyScalar(-fa.z);
    const n = this.material.rotation;
    let r, i;
    0 !== n && (i = Math.cos(n), r = Math.sin(n));
    const center = this.center;
    transformVertex(Aa.set(-.5, -.5, 0), fa, center, pa, r, i), transformVertex(ga.set(.5, -.5, 0), fa, center, pa, r, i), transformVertex(ba.set(.5, .5, 0), fa, center, pa, r, i), ya.set(0, 0), La.set(1, 0), va.set(1, 1);
    let s = e.ray.intersectTriangle(Aa, ga, ba, !1, ha);
    if (null === s && (transformVertex(ga.set(-.5, .5, 0), fa, center, pa, r, i), La.set(0, 1), s = e.ray.intersectTriangle(Aa, ba, ga, !1, ha), null === s)) return;
    const o = e.ray.origin.distanceTo(ha);
    o < e.near || o > e.far || t.push({
      distance: o,
      point: ha.clone(),
      uv: Triangle.getInterpolation(ha, Aa, ga, ba, ya, La, va, new Vector2()),
      face: null,
      object: this
    });
  }
  copy(source, recursive) {
    return super.copy(source, recursive), void 0 !== source.center && this.center.copy(source.center), this.material = source.material, this;
  }
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：transformVertex。将精灵顶点按中心、缩放和可选旋转偏移，再通过相机矩阵转换。 */
function transformVertex(vertexPosition, mvPosition, center, scale, sin, cos) {
  ma.subVectors(vertexPosition, center).addScalar(.5).multiply(scale), void 0 !== sin ? (Ma.x = cos * ma.x - sin * ma.y, Ma.y = sin * ma.x + cos * ma.y) : Ma.copy(ma), vertexPosition.copy(mvPosition), vertexPosition.x += Ma.x, vertexPosition.y += Ma.y, vertexPosition.applyMatrix4(_a);
}
const Sa = new Vector3(),
  wa = new Vector3();
/**
 * A component for providing a basic Level of Detail (LOD) mechanism.
 *
 * Every LOD level is associated with an object, and rendering can be switched
 * between them at the distances specified. Typically you would create, say,
 * three meshes, one for far away (low detail), one for mid range (medium
 * detail) and one for close up (high detail).
 *
 * ```js
 * const lod = new THREE.LOD();
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 *
 * //Create spheres with 3 levels of detail and create new LOD levels for them
 * for( let i = 0; i < 3; i++ ) {
 *
 * 	const geometry = new THREE.IcosahedronGeometry( 10, 3 - i );
 * 	const mesh = new THREE.Mesh( geometry, material );
 * 	lod.addLevel( mesh, i * 75 );
 *
 * }
 *
 * scene.add( lod );
 * ```
 *
 * @augments Object3D
 */
class LOD extends Object3D {
  constructor() {
    super(), this.isLOD = !0, this._currentLevel = 0, this.type = "LOD", Object.defineProperties(this, {
      levels: {
        enumerable: !0,
        value: []
      }
    }), this.autoUpdate = !0;
  }
  copy(source) {
    super.copy(source, !1);
    const levels = source.levels;
    for (let i = 0, l = levels.length; i < l; i++) {
      const level = levels[i];
      this.addLevel(level.object.clone(), level.distance, level.hysteresis);
    }
    return this.autoUpdate = source.autoUpdate, this;
  }
  /* distance 先取绝对值，再按 distance 升序插入 {distance,hysteresis,object}；同距离插在已有同距离后面。this.add(object) 建立父子关系，返回 this；未对 hysteresis 进行范围限制。 */
  addLevel(e, t = 0, n = 0) {
    t = Math.abs(t);
    const levels = this.levels;
    let i;
    for (i = 0; i < levels.length && !(t < levels[i].distance); i++);
    return levels.splice(i, 0, {
      distance: t,
      hysteresis: n,
      object: e
    }), this.add(e), this;
  }
  removeLevel(distance) {
    const levels = this.levels;
    for (let i = 0; i < levels.length; i++) if (levels[i].distance === distance) {
      const removedElements = levels.splice(i, 1);
      return this.remove(removedElements[0].object), !0;
    }
    return !1;
  }
  /**
   * Returns the currently active LOD level index.
   *
   * @return {number} The current active LOD level index.
   */
  getCurrentLevel() {
    return this._currentLevel;
  }
  getObjectForDistance(distance) {
    const levels = this.levels;
    if (levels.length > 0) {
      let i, l;
      for (i = 1, l = levels.length; i < l; i++) {
        let levelDistance = levels[i].distance;
        if (levels[i].object.visible && (levelDistance -= levelDistance * levels[i].hysteresis), distance < levelDistance) break;
      }
      return levels[i - 1].object;
    }
    return null;
  }
  /* 有 level 时取 LOD 的世界位置，与射线原点计算距离，getObjectForDistance 选择对象后委派 raycast，向同一命中数组追加。不按相机 zoom 修正，此处与 update 的选级距离不同。 */
  raycast(e, t) {
    if (this.levels.length > 0) {
      Sa.setFromMatrixPosition(this.matrixWorld);
      const n = e.ray.origin.distanceTo(Sa);
      this.getObjectForDistance(n).raycast(e, t);
    }
  }
  /* 超过一个 level 时，世界相机到 LOD 距离除 camera.zoom。首级先可见；按距离提升，原本可见的候选阈值减去 distance*hysteresis，减少跳变。0/1 级分支不改状态；不返回选中对象。 */
  update(e) {
    const levels = this.levels;
    if (levels.length > 1) {
      Sa.setFromMatrixPosition(e.matrixWorld), wa.setFromMatrixPosition(this.matrixWorld);
      const n = Sa.distanceTo(wa) / e.zoom;
      let r, i;
      for (levels[0].object.visible = !0, r = 1, i = levels.length; r < i; r++) {
        let e = levels[r].distance;
        if (levels[r].object.visible && (e -= e * levels[r].hysteresis), !(n >= e)) break;
        levels[r - 1].object.visible = !1, levels[r].object.visible = !0;
      }
      for (this._currentLevel = r - 1; r < i; r++) levels[r].object.visible = !1;
    }
  }
  toJSON(meta) {
    const data = super.toJSON(meta);
    !1 === this.autoUpdate && (data.object.autoUpdate = !1), data.object.levels = [];
    const levels = this.levels;
    for (let i = 0, l = levels.length; i < l; i++) {
      const level = levels[i];
      data.object.levels.push({
        object: level.object.uuid,
        distance: level.distance,
        hysteresis: level.hysteresis
      });
    }
    return data;
  }
}
const _vector$7 = new Vector3(),
  xa = new Vector3(),
  Ca = new Vector3(),
  za = new Vector3(),
  Oa = new Vector3(),
  Ba = new Vector3(),
  Da = new Vector3();
/**
 * A ray that emits from an origin in a certain direction. The class is used by
 * {@link Raycaster} to assist with raycasting. Raycasting is used for
 * mouse picking (working out what objects in the 3D space the mouse is over)
 * amongst other things.
 */
class Ray {
  /**
   * Constructs a new ray.
   *
   * @param {Vector3} [origin=(0,0,0)] - The origin of the ray.
   * @param {Vector3} [direction=(0,0,-1)] - The (normalized) direction of the ray.
   */
  constructor(origin = new Vector3(), direction = new Vector3(0, 0, -1)) {
    this.origin = origin, this.direction = direction;
  }
  /**
   * Sets the ray's components by copying the given values.
   *
   * @param {Vector3} origin - The origin.
   * @param {Vector3} direction - The direction.
   * @return {Ray} A reference to this ray.
   */
  set(origin, direction) {
    return this.origin.copy(origin), this.direction.copy(direction), this;
  }
  /**
   * Copies the values of the given ray to this instance.
   *
   * @param {Ray} ray - The ray to copy.
   * @return {Ray} A reference to this ray.
   */
  copy(ray) {
    return this.origin.copy(ray.origin), this.direction.copy(ray.direction), this;
  }
  /**
   * Returns a vector that is located at a given distance along this ray.
   *
   * @param {number} t - The distance along the ray to retrieve a position for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} A position on the ray.
   */
  at(t, target) {
    return target.copy(this.origin).addScaledVector(this.direction, t);
  }
  /**
   * Adjusts the direction of the ray to point at the given vector in world space.
   *
   * @param {Vector3} v - The target position.
   * @return {Ray} A reference to this ray.
   */
  lookAt(v) {
    return this.direction.copy(v).sub(this.origin).normalize(), this;
  }
  /**
   * Shift the origin of this ray along its direction by the given distance.
   *
   * @param {number} t - The distance along the ray to interpolate.
   * @return {Ray} A reference to this ray.
   */
  recast(t) {
    return this.origin.copy(this.at(t, _vector$7)), this;
  }
  closestPointToPoint(point, target) {
    target.subVectors(point, this.origin);
    const directionDistance = target.dot(this.direction);
    return directionDistance < 0 ? target.copy(this.origin) : target.copy(this.origin).addScaledVector(this.direction, directionDistance);
  }
  /**
   * Returns the distance of the closest approach between this ray and the given point.
   *
   * @param {Vector3} point - A point in 3D space to compute the distance to.
   * @return {number} The distance.
   */
  distanceToPoint(point) {
    return Math.sqrt(this.distanceSqToPoint(point));
  }
  distanceSqToPoint(point) {
    const directionDistance = _vector$7.subVectors(point, this.origin).dot(this.direction);
    return directionDistance < 0 ? this.origin.distanceToSquared(point) : (_vector$7.copy(this.origin).addScaledVector(this.direction, directionDistance), _vector$7.distanceToSquared(point));
  }
  distanceSqToSegment(v0, v1, optionalPointOnRay, optionalPointOnSegment) {
    xa.copy(v0).add(v1).multiplyScalar(.5), Ca.copy(v1).sub(v0).normalize(), za.copy(this.origin).sub(xa);
    const segExtent = .5 * v0.distanceTo(v1),
      a01 = -this.direction.dot(Ca),
      b0 = za.dot(this.direction),
      b1 = -za.dot(Ca),
      c = za.lengthSq(),
      det = Math.abs(1 - a01 * a01);
    let s0, s1, sqrDist, extDet;
    if (det > 0) {
      if (s0 = a01 * b1 - b0, s1 = a01 * b0 - b1, extDet = segExtent * det, s0 >= 0) {
        if (s1 >= -extDet) {
          if (s1 <= extDet) {
            const invDet = 1 / det;
            s0 *= invDet, s1 *= invDet, sqrDist = s0 * (s0 + a01 * s1 + 2 * b0) + s1 * (a01 * s0 + s1 + 2 * b1) + c;
          } else s1 = segExtent, s0 = Math.max(0, -(a01 * s1 + b0)), sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
        } else s1 = -segExtent, s0 = Math.max(0, -(a01 * s1 + b0)), sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
      } else s1 <= -extDet ? (s0 = Math.max(0, -(-a01 * segExtent + b0)), s1 = s0 > 0 ? -segExtent : Math.min(Math.max(-segExtent, -b1), segExtent), sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c) : s1 <= extDet ? (s0 = 0, s1 = Math.min(Math.max(-segExtent, -b1), segExtent), sqrDist = s1 * (s1 + 2 * b1) + c) : (s0 = Math.max(0, -(a01 * segExtent + b0)), s1 = s0 > 0 ? segExtent : Math.min(Math.max(-segExtent, -b1), segExtent), sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c);
    } else s1 = a01 > 0 ? -segExtent : segExtent, s0 = Math.max(0, -(a01 * s1 + b0)), sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
    return optionalPointOnRay && optionalPointOnRay.copy(this.origin).addScaledVector(this.direction, s0), optionalPointOnSegment && optionalPointOnSegment.copy(xa).addScaledVector(Ca, s1), sqrDist;
  }
  intersectSphere(sphere, target) {
    _vector$7.subVectors(sphere.center, this.origin);
    const tca = _vector$7.dot(this.direction),
      d2 = _vector$7.dot(_vector$7) - tca * tca,
      radius2 = sphere.radius * sphere.radius;
    if (d2 > radius2) return null;
    const thc = Math.sqrt(radius2 - d2),
      t0 = tca - thc,
      t1 = tca + thc;
    return t1 < 0 ? null : t0 < 0 ? this.at(t1, target) : this.at(t0, target);
  }
  intersectsSphere(sphere) {
    return !(sphere.radius < 0) && this.distanceSqToPoint(sphere.center) <= sphere.radius * sphere.radius;
  }
  distanceToPlane(plane) {
    const denominator = plane.normal.dot(this.direction);
    if (0 === denominator) return 0 === plane.distanceToPoint(this.origin) ? 0 : null;
    const t = -(this.origin.dot(plane.normal) + plane.constant) / denominator;
    return t >= 0 ? t : null;
  }
  intersectPlane(plane, target) {
    const t = this.distanceToPlane(plane);
    return null === t ? null : this.at(t, target);
  }
  /* 起点在平面上立即 true；否则 plane.normal·direction 与起点有符号距离异号才 true。平行且不共面返回 false，交点在反向也 false；只判断，不写目标点。 */
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    if (0 === t) return !0;
    return e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(box, target) {
    let tmin, tmax, tymin, tymax, tzmin, tzmax;
    const invdirx = 1 / this.direction.x,
      invdiry = 1 / this.direction.y,
      invdirz = 1 / this.direction.z,
      origin = this.origin;
    return invdirx >= 0 ? (tmin = (box.min.x - origin.x) * invdirx, tmax = (box.max.x - origin.x) * invdirx) : (tmin = (box.max.x - origin.x) * invdirx, tmax = (box.min.x - origin.x) * invdirx), invdiry >= 0 ? (tymin = (box.min.y - origin.y) * invdiry, tymax = (box.max.y - origin.y) * invdiry) : (tymin = (box.max.y - origin.y) * invdiry, tymax = (box.min.y - origin.y) * invdiry), tmin > tymax || tymin > tmax ? null : ((tymin > tmin || isNaN(tmin)) && (tmin = tymin), (tymax < tmax || isNaN(tmax)) && (tmax = tymax), invdirz >= 0 ? (tzmin = (box.min.z - origin.z) * invdirz, tzmax = (box.max.z - origin.z) * invdirz) : (tzmin = (box.max.z - origin.z) * invdirz, tzmax = (box.min.z - origin.z) * invdirz), tmin > tzmax || tzmin > tmax ? null : ((tzmin > tmin || tmin != tmin) && (tmin = tzmin), (tzmax < tmax || tmax != tmax) && (tmax = tzmax), tmax < 0 ? null : this.at(tmin >= 0 ? tmin : tmax, target)));
  }
  intersectsBox(box) {
    return null !== this.intersectBox(box, _vector$7);
  }
  /* 边向量叉积得法线，direction 点积判平行及背面剔除。通过两个带符号三重积检查重心坐标非负、和不超过分母，再检查射线参数非负。复用共享临时量，不把退化三角形当命中。 */
  intersectTriangle(e, t, n, r, i) {
    Oa.subVectors(t, e), Ba.subVectors(n, e), Da.crossVectors(Oa, Ba);
    let a,
      s = this.direction.dot(Da);
    if (s > 0) {
      if (r) return null;
      a = 1;
    } else {
      if (!(s < 0)) return null;
      a = -1, s = -s;
    }
    za.subVectors(this.origin, e);
    const o = a * this.direction.dot(Ba.crossVectors(za, Ba));
    if (o < 0) return null;
    const c = a * this.direction.dot(Oa.cross(za));
    if (c < 0) return null;
    if (o + c > s) return null;
    const l = -a * za.dot(Da);
    return l < 0 ? null : this.at(l / s, i);
  }
  /**
   * Transforms this ray with the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix4 - The transformation matrix.
   * @return {Ray} A reference to this ray.
   */
  applyMatrix4(matrix4) {
    return this.origin.applyMatrix4(matrix4), this.direction.transformDirection(matrix4), this;
  }
  /**
   * Returns `true` if this ray is equal with the given one.
   *
   * @param {Ray} ray - The ray to test for equality.
   * @return {boolean} Whether this ray is equal with the given one.
   */
  equals(ray) {
    return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);
  }
  /**
   * Returns a new ray with copied values from this instance.
   *
   * @return {Ray} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
/**
 * A material for drawing geometries in a simple shaded (flat or wireframe) way.
 *
 * This material is not affected by lights.
 *
 * @augments Material
 * @demo scenes/material-browser.html#MeshBasicMaterial
 */
class MeshBasicMaterial extends Material {
  constructor(parameters) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Color(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Euler(), this.combine = MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(parameters);
  }
  copy(source) {
    return super.copy(source), this.color.copy(source.color), this.map = source.map, this.lightMap = source.lightMap, this.lightMapIntensity = source.lightMapIntensity, this.aoMap = source.aoMap, this.aoMapIntensity = source.aoMapIntensity, this.specularMap = source.specularMap, this.alphaMap = source.alphaMap, this.envMap = source.envMap, this.envMapRotation.copy(source.envMapRotation), this.combine = source.combine, this.reflectivity = source.reflectivity, this.refractionRatio = source.refractionRatio, this.wireframe = source.wireframe, this.wireframeLinewidth = source.wireframeLinewidth, this.wireframeLinecap = source.wireframeLinecap, this.wireframeLinejoin = source.wireframeLinejoin, this.fog = source.fog, this;
  }
}
const Na = new Matrix4(),
  ray = new Ray(),
  sphere = new Sphere(),
  ka = new Vector3(),
  Pa = new Vector3(),
  Ya = new Vector3(),
  Wa = new Vector3(),
  Fa = new Vector3(),
  qa = new Vector3(),
  Ha = new Vector3(),
  Ua = new Vector3();
class Mesh extends Object3D {
  constructor(geometry = new BufferGeometry(), material = new MeshBasicMaterial()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = geometry, this.material = material, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
  }
  copy(source, recursive) {
    return super.copy(source, recursive), void 0 !== source.morphTargetInfluences && (this.morphTargetInfluences = source.morphTargetInfluences.slice()), void 0 !== source.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, source.morphTargetDictionary)), this.material = Array.isArray(source.material) ? source.material.slice() : source.material, this.geometry = source.geometry, this;
  }
  /* 取 geometry.morphAttributes 的第一个键的数组，重建零权重 morphTargetInfluences 和 name→index 的 morphTargetDictionary；无名项用字符串索引，重名覆盖字典前项。没有 morph 数据时保持旧字段，未清空。Line/Points 的独立同名实现见各节。 */
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      t = Object.keys(e);
    if (t.length > 0) {
      const n = e[t[0]];
      if (void 0 !== n) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let e = 0, t = n.length; e < t; e++) {
          const t = n[e].name || String(e);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
        }
      }
    }
  }
  getVertexPosition(index, target) {
    const geometry = this.geometry,
      position = geometry.attributes.position,
      morphPosition = geometry.morphAttributes.position,
      morphTargetsRelative = geometry.morphTargetsRelative;
    target.fromBufferAttribute(position, index);
    const morphInfluences = this.morphTargetInfluences;
    if (morphPosition && morphInfluences) {
      qa.set(0, 0, 0);
      for (let i = 0, il = morphPosition.length; i < il; i++) {
        const influence = morphInfluences[i],
          morphAttribute = morphPosition[i];
        0 !== influence && (Fa.fromBufferAttribute(morphAttribute, index), morphTargetsRelative ? qa.addScaledVector(Fa, influence) : qa.addScaledVector(Fa.sub(target), influence));
      }
      target.add(qa);
    }
    return target;
  }
  /* material undefined 退出。必要时计算几何包围球，转世界空间；射线先从 near 处 recast，若起点不在球内再测球交点且限制剩余 far-near 范围。球测试是粗筛，三角形命中还有世界 near/far 过滤。 */
  raycast(e, t) {
    const n = this.geometry,
      material = this.material,
      matrixWorld = this.matrixWorld;
    if (void 0 !== material) {
      if (null === n.boundingSphere && n.computeBoundingSphere(), sphere.copy(n.boundingSphere), sphere.applyMatrix4(matrixWorld), ray.copy(e.ray).recast(e.near), !1 === sphere.containsPoint(ray.origin)) {
        if (null === ray.intersectSphere(sphere, ka)) return;
        if (ray.origin.distanceToSquared(ka) > (e.far - e.near) ** 2) return;
      }
      Na.copy(matrixWorld).invert(), ray.copy(e.ray).applyMatrix4(Na), null !== n.boundingBox && !1 === ray.intersectsBox(n.boundingBox) || this._computeIntersections(e, t, ray);
    }
  }
  /* 遍历 indexed 或 non-indexed 三角形，步长 3；多材质模式必须按 groups 选 materialIndex，并与 drawRange 和实际 attribute/index count 取交。每次调用 Ga 获取实际顶点（包含 getVertexPosition 的变形语义），成功写 faceIndex=floor(绘制位置/3)，组模式补 face.materialIndex 并追加。单材质不依赖 groups；本地把索引三项读取内联，不能由局部数量推断缺少逻辑。 */
  _computeIntersections(e, t, n) {
    let r;
    const i = this.geometry,
      material = this.material,
      s = i.index,
      o = i.attributes.position,
      c = i.attributes.uv,
      l = i.attributes.uv1,
      u = i.attributes.normal,
      d = i.groups,
      h = i.drawRange;
    if (null !== s) {
      if (Array.isArray(material)) for (let i = 0, o = d.length; i < o; i++) {
        const o = d[i],
          p = material[o.materialIndex];
        for (let i = Math.max(o.start, h.start), a = Math.min(s.count, Math.min(o.start + o.count, h.start + h.count)); i < a; i += 3) {
          r = checkGeometryIntersection(this, p, e, n, c, l, u, s.getX(i), s.getX(i + 1), s.getX(i + 2)), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = o.materialIndex, t.push(r));
        }
      } else {
        for (let i = Math.max(0, h.start), o = Math.min(s.count, h.start + h.count); i < o; i += 3) {
          r = checkGeometryIntersection(this, material, e, n, c, l, u, s.getX(i), s.getX(i + 1), s.getX(i + 2)), r && (r.faceIndex = Math.floor(i / 3), t.push(r));
        }
      }
    } else if (void 0 !== o) if (Array.isArray(material)) for (let i = 0, s = d.length; i < s; i++) {
      const s = d[i],
        p = material[s.materialIndex];
      for (let i = Math.max(s.start, h.start), a = Math.min(o.count, Math.min(s.start + s.count, h.start + h.count)); i < a; i += 3) {
        r = checkGeometryIntersection(this, p, e, n, c, l, u, i, i + 1, i + 2), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = s.materialIndex, t.push(r));
      }
    } else {
      for (let i = Math.max(0, h.start), s = Math.min(o.count, h.start + h.count); i < s; i += 3) {
        r = checkGeometryIntersection(this, material, e, n, c, l, u, i, i + 1, i + 2), r && (r.faceIndex = Math.floor(i / 3), t.push(r));
      }
    }
  }
}
/* 人工身份合同：取三顶点、射线三角形求交、uv/normal 插值及 face/barycoord 命中结果。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function checkGeometryIntersection(e, t, n, r, i, a, s, o, c, l) {
  e.getVertexPosition(o, Pa), e.getVertexPosition(c, Ya), e.getVertexPosition(l, Wa);
  const u = function (e, t, n, r, i, a, s, o) {
    let c;
    if (c = t.side === BackSide ? r.intersectTriangle(s, a, i, !0, o) : r.intersectTriangle(i, a, s, t.side === FrontSide, o), null === c) return null;
    Ua.copy(o), Ua.applyMatrix4(e.matrixWorld);
    const l = n.ray.origin.distanceTo(Ua);
    return l < n.near || l > n.far ? null : {
      distance: l,
      point: Ua.clone(),
      object: e
    };
  }(e, t, n, r, Pa, Ya, Wa, Ha);
  if (u) {
    const e = new Vector3();
    Triangle.getBarycoord(Ha, Pa, Ya, Wa, e), i && (u.uv = Triangle.getInterpolatedAttribute(i, o, c, l, e, new Vector2())), a && (u.uv1 = Triangle.getInterpolatedAttribute(a, o, c, l, e, new Vector2())), s && (u.normal = Triangle.getInterpolatedAttribute(s, o, c, l, e, new Vector3()), u.normal.dot(r.direction) > 0 && u.normal.multiplyScalar(-1));
    const t = {
      a: o,
      b: c,
      c: l,
      normal: new Vector3(),
      materialIndex: 0
    };
    Triangle.getNormal(Pa, Ya, Wa, t.normal), u.face = t, u.barycoord = e;
  }
  return u;
}
const Xa = new Vector4(),
  ja = new Vector4(),
  Va = new Vector4(),
  Qa = new Vector4(),
  Ka = new Matrix4(),
  Ja = new Vector3(),
  $a = new Sphere(),
  Za = new Matrix4(),
  es = new Ray();
/**
 * A mesh that has a {@link Skeleton} that can then be used to animate the
 * vertices of the geometry with skinning/skeleton animation.
 *
 * Next to a valid skeleton, the skinned mesh requires skin indices and weights
 * as buffer attributes in its geometry. These attribute define which bones affect a single
 * vertex to a certain extend.
 *
 * Typically skinned meshes are not created manually but loaders like {@link GLTFLoader}
 * or {@link FBXLoader } import respective models.
 *
 * @augments Mesh
 * @demo scenes/bones-browser.html
 */
class SkinnedMesh extends Mesh {
  constructor(geometry, material) {
    super(geometry, material), this.isSkinnedMesh = !0, this.type = "SkinnedMesh", this.bindMode = AttachedBindMode, this.bindMatrix = new Matrix4(), this.bindMatrixInverse = new Matrix4(), this.boundingBox = null, this.boundingSphere = null;
  }
  computeBoundingBox() {
    const geometry = this.geometry;
    null === this.boundingBox && (this.boundingBox = new Box3()), this.boundingBox.makeEmpty();
    const positionAttribute = geometry.getAttribute("position");
    for (let i = 0; i < positionAttribute.count; i++) this.getVertexPosition(i, Ja), this.boundingBox.expandByPoint(Ja);
  }
  computeBoundingSphere() {
    const geometry = this.geometry;
    null === this.boundingSphere && (this.boundingSphere = new Sphere()), this.boundingSphere.makeEmpty();
    const positionAttribute = geometry.getAttribute("position");
    for (let i = 0; i < positionAttribute.count; i++) this.getVertexPosition(i, Ja), this.boundingSphere.expandByPoint(Ja);
  }
  copy(source, recursive) {
    return super.copy(source, recursive), this.bindMode = source.bindMode, this.bindMatrix.copy(source.bindMatrix), this.bindMatrixInverse.copy(source.bindMatrixInverse), this.skeleton = source.skeleton, null !== source.boundingBox && (this.boundingBox = source.boundingBox.clone()), null !== source.boundingSphere && (this.boundingSphere = source.boundingSphere.clone()), this;
  }
  /* 使用自身 boundingSphere/boundingBox 而非 geometry 的静态边界，必要时 computeBoundingSphere（反映皮肤变形）。球转世界空间粗筛后，逆世界矩阵得到局部射线，盒若存在再筛，再调用继承的 _computeIntersections。最终 getVertexPosition 负责蒙皮顶点；此处不主动计算 boundingBox，不承诺随每帧骨骼变化重建边界。 */
  raycast(e, t) {
    const material = this.material,
      matrixWorld = this.matrixWorld;
    void 0 !== material && (null === this.boundingSphere && this.computeBoundingSphere(), $a.copy(this.boundingSphere), $a.applyMatrix4(matrixWorld), !1 !== e.ray.intersectsSphere($a) && (Za.copy(matrixWorld).invert(), es.copy(e.ray).applyMatrix4(Za), null !== this.boundingBox && !1 === es.intersectsBox(this.boundingBox) || this._computeIntersections(e, t, es)));
  }
  getVertexPosition(index, target) {
    return super.getVertexPosition(index, target), this.applyBoneTransform(index, target), target;
  }
  bind(skeleton, bindMatrix) {
    this.skeleton = skeleton, void 0 === bindMatrix && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), bindMatrix = this.matrixWorld), this.bindMatrix.copy(bindMatrix), this.bindMatrixInverse.copy(bindMatrix).invert();
  }
  pose() {
    this.skeleton.pose();
  }
  normalizeSkinWeights() {
    const vector = new Vector4(),
      skinWeight = this.geometry.attributes.skinWeight;
    for (let i = 0, l = skinWeight.count; i < l; i++) {
      vector.fromBufferAttribute(skinWeight, i);
      const scale = 1 / vector.manhattanLength();
      scale !== 1 / 0 ? vector.multiplyScalar(scale) : vector.set(1, 0, 0, 0), skinWeight.setXYZW(i, vector.x, vector.y, vector.z, vector.w);
    }
  }
  updateMatrixWorld(force) {
    super.updateMatrixWorld(force), this.bindMode === AttachedBindMode ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : this.bindMode === DetachedBindMode ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : warn("SkinnedMesh: Unrecognized bindMode: " + this.bindMode);
  }
  applyBoneTransform(index, target) {
    const skeleton = this.skeleton,
      geometry = this.geometry;
    ja.fromBufferAttribute(geometry.attributes.skinIndex, index), Va.fromBufferAttribute(geometry.attributes.skinWeight, index), target.isVector4 ? (Xa.copy(target), target.set(0, 0, 0, 0)) : (Xa.set(...target, 1), target.set(0, 0, 0)), Xa.applyMatrix4(this.bindMatrix);
    for (let i = 0; i < 4; i++) {
      const weight = Va.getComponent(i);
      if (0 !== weight) {
        const boneIndex = ja.getComponent(i);
        Ka.multiplyMatrices(skeleton.bones[boneIndex].matrixWorld, skeleton.boneInverses[boneIndex]), target.addScaledVector(Qa.copy(Xa).applyMatrix4(Ka), weight);
      }
    }
    return target.isVector4 && (target.w = Xa.w), target.applyMatrix4(this.bindMatrixInverse);
  }
}
class Bone extends Object3D {
  constructor() {
    super(), this.isBone = !0, this.type = "Bone";
  }
}
/**
 * Creates a texture directly from raw buffer data.
 *
 * The interpretation of the data depends on type and format: If the type is
 * `UnsignedByteType`, a `Uint8Array` will be useful for addressing the
 * texel data. If the format is `RGBAFormat`, data needs four values for
 * one texel; Red, Green, Blue and Alpha (typically the opacity).
 *
 * @augments Texture
 */
class DataTexture extends Texture {
  /**
   * Constructs a new data texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=NearestFilter] - The mag filter value.
   * @param {number} [minFilter=NearestFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space.
   */
  constructor(data = null, width = 1, height = 1, format, type, mapping, wrapS, wrapT, magFilter = NearestFilter, minFilter = NearestFilter, anisotropy, colorSpace) {
    super(null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace), this.isDataTexture = !0, this.image = {
      data: data,
      width: width,
      height: height
    }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const ts = new Matrix4(),
  ns = new Matrix4();
/**
 * Class for representing the armatures in `three.js`. The skeleton
 * is defined by a hierarchy of bones.
 *
 * ```js
 * const bones = [];
 *
 * const shoulder = new THREE.Bone();
 * const elbow = new THREE.Bone();
 * const hand = new THREE.Bone();
 *
 * shoulder.add( elbow );
 * elbow.add( hand );
 *
 * bones.push( shoulder , elbow, hand);
 *
 * shoulder.position.y = -5;
 * elbow.position.y = 0;
 * hand.position.y = 5;
 *
 * const armSkeleton = new THREE.Skeleton( bones );
 * ```
 */
class Skeleton {
  /**
   * Constructs a new skeleton.
   *
   * @param {Array<Bone>} [bones] - An array of bones.
   * @param {Array<Matrix4>} [boneInverses] - An array of bone inverse matrices.
   * If not provided, these matrices will be computed automatically via {@link Skeleton#calculateInverses}.
   */
  constructor(bones = [], boneInverses = []) {
    this.uuid = generateUUID(), this.bones = bones.slice(0), this.boneInverses = boneInverses, this.boneMatrices = null, this.boneTexture = null, this.init();
  }
  init() {
    const bones = this.bones,
      boneInverses = this.boneInverses;
    if (this.boneMatrices = new Float32Array(16 * bones.length), 0 === boneInverses.length) this.calculateInverses();else if (bones.length !== boneInverses.length) {
      warn("Skeleton: Number of inverse bone matrices does not match amount of bones."), this.boneInverses = [];
      for (let i = 0, il = this.bones.length; i < il; i++) this.boneInverses.push(new Matrix4());
    }
  }
  calculateInverses() {
    this.boneInverses.length = 0;
    for (let i = 0, il = this.bones.length; i < il; i++) {
      const inverse = new Matrix4();
      this.bones[i] && inverse.copy(this.bones[i].matrixWorld).invert(), this.boneInverses.push(inverse);
    }
  }
  pose() {
    for (let i = 0, il = this.bones.length; i < il; i++) {
      const bone = this.bones[i];
      bone && bone.matrixWorld.copy(this.boneInverses[i]).invert();
    }
    for (let i = 0, il = this.bones.length; i < il; i++) {
      const bone = this.bones[i];
      bone && (bone.parent && bone.parent.isBone ? (bone.matrix.copy(bone.parent.matrixWorld).invert(), bone.matrix.multiply(bone.matrixWorld)) : bone.matrix.copy(bone.matrixWorld), bone.matrix.decompose(bone.position, bone.quaternion, bone.scale));
    }
  }
  update() {
    const bones = this.bones,
      boneInverses = this.boneInverses,
      boneMatrices = this.boneMatrices,
      boneTexture = this.boneTexture;
    for (let i = 0, il = bones.length; i < il; i++) {
      const matrix = bones[i] ? bones[i].matrixWorld : ns;
      ts.multiplyMatrices(matrix, boneInverses[i]), ts.toArray(boneMatrices, 16 * i);
    }
    null !== boneTexture && (boneTexture.needsUpdate = !0);
  }
  /**
   * Returns a new skeleton with copied values from this instance.
   *
   * @return {Skeleton} A clone of this instance.
   */
  clone() {
    return new Skeleton(this.bones, this.boneInverses);
  }
  computeBoneTexture() {
    let size = Math.sqrt(4 * this.bones.length);
    size = 4 * Math.ceil(size / 4), size = Math.max(size, 4);
    const boneMatrices = new Float32Array(size * size * 4);
    boneMatrices.set(this.boneMatrices);
    const boneTexture = new DataTexture(boneMatrices, size, size, RGBAFormat, FloatType);
    return boneTexture.needsUpdate = !0, this.boneMatrices = boneMatrices, this.boneTexture = boneTexture, this;
  }
  getBoneByName(name) {
    for (let i = 0, il = this.bones.length; i < il; i++) {
      const bone = this.bones[i];
      if (bone.name === name) return bone;
    }
  }
  dispose() {
    null !== this.boneTexture && (this.boneTexture.dispose(), this.boneTexture = null);
  }
  fromJSON(json, bones) {
    this.uuid = json.uuid;
    for (let i = 0, l = json.bones.length; i < l; i++) {
      const uuid = json.bones[i];
      let bone = bones[uuid];
      void 0 === bone && (warn("Skeleton: No bone found with UUID:", uuid), bone = new Bone()), this.bones.push(bone), this.boneInverses.push(new Matrix4().fromArray(json.boneInverses[i]));
    }
    return this.init(), this;
  }
  toJSON() {
    const data = {
      metadata: {
        version: 4.7,
        type: "Skeleton",
        generator: "Skeleton.toJSON"
      },
      bones: [],
      boneInverses: []
    };
    data.uuid = this.uuid;
    const bones = this.bones,
      boneInverses = this.boneInverses;
    for (let i = 0, l = bones.length; i < l; i++) {
      const bone = bones[i];
      data.bones.push(bone.uuid);
      const boneInverse = boneInverses[i];
      data.boneInverses.push(boneInverse.toArray());
    }
    return data;
  }
}
/**
 * An instanced version of a buffer attribute.
 *
 * @augments BufferAttribute
 */
class InstancedBufferAttribute extends BufferAttribute {
  /**
   * Constructs a new instanced buffer attribute.
   *
   * @param {TypedArray} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   * @param {number} [meshPerAttribute=1] - How often a value of this buffer attribute should be repeated.
   */
  constructor(array, itemSize, normalized, meshPerAttribute = 1) {
    super(array, itemSize, normalized), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = meshPerAttribute;
  }
  copy(source) {
    return super.copy(source), this.meshPerAttribute = source.meshPerAttribute, this;
  }
  toJSON() {
    const data = super.toJSON();
    return data.meshPerAttribute = this.meshPerAttribute, data.isInstancedBufferAttribute = !0, data;
  }
}
const rs = new Matrix4(),
  is = new Matrix4(),
  as = [],
  ss = new Box3(),
  os = new Matrix4(),
  mesh = new Mesh(),
  ls = new Sphere();
/**
 * A special version of a mesh with instanced rendering support. Use
 * this class if you have to render a large number of objects with the same
 * geometry and material(s) but with different world transformations. The usage
 * of 'InstancedMesh' will help you to reduce the number of draw calls and thus
 * improve the overall rendering performance in your application.
 *
 * @augments Mesh
 */
class InstancedMesh extends Mesh {
  constructor(geometry, material, count) {
    super(geometry, material), this.isInstancedMesh = !0, this.instanceMatrix = new InstancedBufferAttribute(new Float32Array(16 * count), 16), this.instanceColor = null, this.morphTexture = null, this.count = count, this.boundingBox = null, this.boundingSphere = null;
    for (let i = 0; i < count; i++) this.setMatrixAt(i, os);
  }
  computeBoundingBox() {
    const geometry = this.geometry,
      count = this.count;
    null === this.boundingBox && (this.boundingBox = new Box3()), null === geometry.boundingBox && geometry.computeBoundingBox(), this.boundingBox.makeEmpty();
    for (let i = 0; i < count; i++) this.getMatrixAt(i, rs), ss.copy(geometry.boundingBox).applyMatrix4(rs), this.boundingBox.union(ss);
  }
  computeBoundingSphere() {
    const geometry = this.geometry,
      count = this.count;
    null === this.boundingSphere && (this.boundingSphere = new Sphere()), null === geometry.boundingSphere && geometry.computeBoundingSphere(), this.boundingSphere.makeEmpty();
    for (let i = 0; i < count; i++) this.getMatrixAt(i, rs), ls.copy(geometry.boundingSphere).applyMatrix4(rs), this.boundingSphere.union(ls);
  }
  copy(source, recursive) {
    return super.copy(source, recursive), this.instanceMatrix.copy(source.instanceMatrix), null !== source.morphTexture && (this.morphTexture = source.morphTexture.clone()), null !== source.instanceColor && (this.instanceColor = source.instanceColor.clone()), this.count = source.count, null !== source.boundingBox && (this.boundingBox = source.boundingBox.clone()), null !== source.boundingSphere && (this.boundingSphere = source.boundingSphere.clone()), this;
  }
  getColorAt(index, color) {
    return null === this.instanceColor ? color.setRGB(1, 1, 1) : color.fromArray(this.instanceColor.array, 3 * index);
  }
  getMatrixAt(index, matrix) {
    return matrix.fromArray(this.instanceMatrix.array, 16 * index);
  }
  /* 输入实例索引和带 morphTargetInfluences 的目标对象。从 morphTexture.source.data.data 读取一行；步幅为目标权重数+1，跳过该行第一项（基础 influence），覆盖目标数组。不创建数组、不返回 mesh、不检查索引与数组长度。 */
  getMorphAt(e, t) {
    const n = t.morphTargetInfluences,
      r = this.morphTexture.source.data.data,
      i = e * (n.length + 1) + 1;
    for (let e = 0; e < n.length; e++) n[e] = r[i + e];
  }
  /* 共享临时 mesh 使用此 geometry/material。整体实例包围球世界粗筛后，逐实例读取矩阵，与 matrixWorld 相乘；委派临时 mesh.raycast。count 控制实例范围；整体球没更新会影响粗筛。 */
  raycast(e, t) {
    const matrixWorld = this.matrixWorld,
      count = this.count;
    if (mesh.geometry = this.geometry, mesh.material = this.material, void 0 !== mesh.material && (null === this.boundingSphere && this.computeBoundingSphere(), ls.copy(this.boundingSphere), ls.applyMatrix4(matrixWorld), !1 !== e.ray.intersectsSphere(ls))) for (let i = 0; i < count; i++) {
      this.getMatrixAt(i, rs), is.multiplyMatrices(matrixWorld, rs), mesh.matrixWorld = is, mesh.raycast(e, as);
      for (let e = 0, n = as.length; e < n; e++) {
        const n = as[e];
        n.instanceId = i, n.object = this, t.push(n);
      }
      as.length = 0;
    }
  }
  setColorAt(index, color) {
    return null === this.instanceColor && (this.instanceColor = new InstancedBufferAttribute(new Float32Array(3 * this.instanceMatrix.count).fill(1), 3)), color.toArray(this.instanceColor.array, 3 * index), this;
  }
  setMatrixAt(index, matrix) {
    return matrix.toArray(this.instanceMatrix.array, 16 * index), this;
  }
  setMorphAt(index, object) {
    const objectInfluences = object.morphTargetInfluences,
      len = objectInfluences.length + 1;
    null === this.morphTexture && (this.morphTexture = new DataTexture(new Float32Array(len * this.count), len, this.count, RedFormat, FloatType));
    const array = this.morphTexture.source.data.data;
    let morphInfluencesSum = 0;
    for (let i = 0; i < objectInfluences.length; i++) morphInfluencesSum += objectInfluences[i];
    const morphBaseInfluence = this.geometry.morphTargetsRelative ? 1 : 1 - morphInfluencesSum,
      dataIndex = len * index;
    return array[dataIndex] = morphBaseInfluence, array.set(objectInfluences, dataIndex + 1), this;
  }
  updateMorphTargets() {}
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    }), null !== this.morphTexture && (this.morphTexture.dispose(), this.morphTexture = null);
  }
}
const _vector1 = new Vector3(),
  _vector2 = new Vector3(),
  _normalMatrix = new Matrix3();
/**
 * A two dimensional surface that extends infinitely in 3D space, represented
 * in [Hessian normal form](http://mathworld.wolfram.com/HessianNormalForm.html)
 * by a unit length normal vector and a constant.
 */
class Plane {
  /**
   * Constructs a new plane.
   *
   * @param {Vector3} [normal=(1,0,0)] - A unit length vector defining the normal of the plane.
   * @param {number} [constant=0] - The signed distance from the origin to the plane.
   */
  constructor(normal = new Vector3(1, 0, 0), constant = 0) {
    this.isPlane = !0, this.normal = normal, this.constant = constant;
  }
  /**
   * Sets the plane components by copying the given values.
   *
   * @param {Vector3} normal - The normal.
   * @param {number} constant - The constant.
   * @return {Plane} A reference to this plane.
   */
  set(normal, constant) {
    return this.normal.copy(normal), this.constant = constant, this;
  }
  /**
   * Sets the plane components by defining `x`, `y`, `z` as the
   * plane normal and `w` as the constant.
   *
   * @param {number} x - The value for the normal's x component.
   * @param {number} y - The value for the normal's y component.
   * @param {number} z - The value for the normal's z component.
   * @param {number} w - The constant value.
   * @return {Plane} A reference to this plane.
   */
  setComponents(x, y, z, w) {
    return this.normal.set(x, y, z), this.constant = w, this;
  }
  /**
   * Sets the plane from the given normal and coplanar point (that is a point
   * that lies onto the plane).
   *
   * @param {Vector3} normal - The normal.
   * @param {Vector3} point - A coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromNormalAndCoplanarPoint(normal, point) {
    return this.normal.copy(normal), this.constant = -point.dot(this.normal), this;
  }
  /**
   * Sets the plane from three coplanar points. The winding order is
   * assumed to be counter-clockwise, and determines the direction of
   * the plane normal.
   *
   * @param {Vector3} a - The first coplanar point.
   * @param {Vector3} b - The second coplanar point.
   * @param {Vector3} c - The third coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromCoplanarPoints(a, b, c) {
    const normal = _vector1.subVectors(c, b).cross(_vector2.subVectors(a, b)).normalize();
    return this.setFromNormalAndCoplanarPoint(normal, a), this;
  }
  /**
   * Copies the values of the given plane to this instance.
   *
   * @param {Plane} plane - The plane to copy.
   * @return {Plane} A reference to this plane.
   */
  copy(plane) {
    return this.normal.copy(plane.normal), this.constant = plane.constant, this;
  }
  normalize() {
    const inverseNormalLength = 1 / this.normal.length();
    return this.normal.multiplyScalar(inverseNormalLength), this.constant *= inverseNormalLength, this;
  }
  /**
   * Negates both the plane normal and the constant.
   *
   * @return {Plane} A reference to this plane.
   */
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  /**
   * Returns the signed distance from the given point to this plane.
   *
   * @param {Vector3} point - The point to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToPoint(point) {
    return this.normal.dot(point) + this.constant;
  }
  /**
   * Returns the signed distance from the given sphere to this plane.
   *
   * @param {Sphere} sphere - The sphere to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToSphere(sphere) {
    return this.distanceToPoint(sphere.center) - sphere.radius;
  }
  /**
   * Projects a the given point onto the plane.
   *
   * @param {Vector3} point - The point to project.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The projected point on the plane.
   */
  projectPoint(point, target) {
    return target.copy(point).addScaledVector(this.normal, -this.distanceToPoint(point));
  }
  intersectLine(line, target, clampToLine = !0) {
    const direction = line.delta(_vector1),
      denominator = this.normal.dot(direction);
    if (0 === denominator) return 0 === this.distanceToPoint(line.start) ? target.copy(line.start) : null;
    const t = -(line.start.dot(this.normal) + this.constant) / denominator;
    return !0 === clampToLine && (t < 0 || t > 1) ? null : target.copy(line.start).addScaledVector(direction, t);
  }
  /**
   * Returns `true` if the given line segment intersects with (passes through) the plane.
   *
   * @param {Line3} line - The line to test.
   * @return {boolean} Whether the given line segment intersects with the plane or not.
   */
  intersectsLine(line) {
    const startSign = this.distanceToPoint(line.start),
      endSign = this.distanceToPoint(line.end);
    return startSign < 0 && endSign > 0 || endSign < 0 && startSign > 0;
  }
  /**
   * Returns `true` if the given bounding box intersects with the plane.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with the plane or not.
   */
  intersectsBox(box) {
    return box.intersectsPlane(this);
  }
  /**
   * Returns `true` if the given bounding sphere intersects with the plane.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with the plane or not.
   */
  intersectsSphere(sphere) {
    return sphere.intersectsPlane(this);
  }
  /**
   * Returns a coplanar vector to the plane, by calculating the
   * projection of the normal at the origin onto the plane.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The coplanar point.
   */
  coplanarPoint(target) {
    return target.copy(this.normal).multiplyScalar(-this.constant);
  }
  /**
   * Apply a 4x4 matrix to the plane. The matrix must be an affine, homogeneous transform.
   *
   * The optional normal matrix can be pre-computed like so:
   * ```js
   * const optionalNormalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );
   * ```
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @param {Matrix4} [optionalNormalMatrix] - A pre-computed normal matrix.
   * @return {Plane} A reference to this plane.
   */
  applyMatrix4(matrix, optionalNormalMatrix) {
    const normalMatrix = optionalNormalMatrix || _normalMatrix.getNormalMatrix(matrix),
      referencePoint = this.coplanarPoint(_vector1).applyMatrix4(matrix),
      normal = this.normal.applyMatrix3(normalMatrix).normalize();
    return this.constant = -referencePoint.dot(normal), this;
  }
  /**
   * Translates the plane by the distance defined by the given offset vector.
   * Note that this only affects the plane constant and will not affect the normal vector.
   *
   * @param {Vector3} offset - The offset vector.
   * @return {Plane} A reference to this plane.
   */
  translate(offset) {
    return this.constant -= offset.dot(this.normal), this;
  }
  /**
   * Returns `true` if this plane is equal with the given one.
   *
   * @param {Plane} plane - The plane to test for equality.
   * @return {boolean} Whether this plane is equal with the given one.
   */
  equals(plane) {
    return plane.normal.equals(this.normal) && plane.constant === this.constant;
  }
  /**
   * Returns a new plane with copied values from this instance.
   *
   * @return {Plane} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
const ps = new Sphere(),
  fs = new Vector2(.5, .5),
  ms = new Vector3();
/**
 * Frustums are used to determine what is inside the camera's field of view.
 * They help speed up the rendering process - objects which lie outside a camera's
 * frustum can safely be excluded from rendering.
 *
 * This class is mainly intended for use internally by a renderer.
 */
class Frustum {
  /**
   * Constructs a new frustum.
   *
   * @param {Plane} [p0] - The first plane that encloses the frustum.
   * @param {Plane} [p1] - The second plane that encloses the frustum.
   * @param {Plane} [p2] - The third plane that encloses the frustum.
   * @param {Plane} [p3] - The fourth plane that encloses the frustum.
   * @param {Plane} [p4] - The fifth plane that encloses the frustum.
   * @param {Plane} [p5] - The sixth plane that encloses the frustum.
   */
  constructor(p0 = new Plane(), p1 = new Plane(), p2 = new Plane(), p3 = new Plane(), p4 = new Plane(), p5 = new Plane()) {
    this.planes = [p0, p1, p2, p3, p4, p5];
  }
  /**
   * Sets the frustum planes by copying the given planes.
   *
   * @param {Plane} [p0] - The first plane that encloses the frustum.
   * @param {Plane} [p1] - The second plane that encloses the frustum.
   * @param {Plane} [p2] - The third plane that encloses the frustum.
   * @param {Plane} [p3] - The fourth plane that encloses the frustum.
   * @param {Plane} [p4] - The fifth plane that encloses the frustum.
   * @param {Plane} [p5] - The sixth plane that encloses the frustum.
   * @return {Frustum} A reference to this frustum.
   */
  set(p0, p1, p2, p3, p4, p5) {
    const planes = this.planes;
    return planes[0].copy(p0), planes[1].copy(p1), planes[2].copy(p2), planes[3].copy(p3), planes[4].copy(p4), planes[5].copy(p5), this;
  }
  copy(frustum) {
    const planes = this.planes;
    for (let i = 0; i < 6; i++) planes[i].copy(frustum.planes[i]);
    return this;
  }
  /* 从组合投影矩阵的行加减提取左右上下四平面并 normalize。标准 far 用第4行-第3行；WebGL near 用第4行+第3行，WebGPU near 直接第3行；反向深度交换相应 near/far 组合。覆盖已有 planes，返回 this，不分配新视锥。 */
  setFromProjectionMatrix(e, t = WebGLCoordinateSystem, n = !1) {
    const planes = this.planes,
      i = e.elements,
      a = i[0],
      s = i[1],
      o = i[2],
      c = i[3],
      l = i[4],
      u = i[5],
      d = i[6],
      h = i[7],
      p = i[8],
      f = i[9],
      m = i[10],
      M = i[11],
      _ = i[12],
      A = i[13],
      g = i[14],
      b = i[15];
    if (planes[0].setComponents(c - a, h - l, M - p, b - _).normalize(), planes[1].setComponents(c + a, h + l, M + p, b + _).normalize(), planes[2].setComponents(c + s, h + u, M + f, b + A).normalize(), planes[3].setComponents(c - s, h - u, M - f, b - A).normalize(), n) planes[4].setComponents(o, d, m, g).normalize(), planes[5].setComponents(c - o, h - d, M - m, b - g).normalize();else if (planes[4].setComponents(c - o, h - d, M - m, b - g).normalize(), t === WebGLCoordinateSystem) planes[5].setComponents(c + o, h + d, M + m, b + g).normalize();else {
      if (t !== WebGPUCoordinateSystem) throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
      planes[5].setComponents(o, d, m, g).normalize();
    }
    return this;
  }
  intersectsObject(object) {
    if (void 0 !== object.boundingSphere) null === object.boundingSphere && object.computeBoundingSphere(), ps.copy(object.boundingSphere).applyMatrix4(object.matrixWorld);else {
      const geometry = object.geometry;
      null === geometry.boundingSphere && geometry.computeBoundingSphere(), ps.copy(geometry.boundingSphere).applyMatrix4(object.matrixWorld);
    }
    return this.intersectsSphere(ps);
  }
  intersectsSprite(sprite) {
    ps.center.set(0, 0, 0);
    const offset = fs.distanceTo(sprite.center);
    return ps.radius = .7071067811865476 + offset, ps.applyMatrix4(sprite.matrixWorld), this.intersectsSphere(ps);
  }
  /* 逐个六平面检查 center 的有符号距离是否小于 -radius；任一在外即 false，否则 true。依赖法线已归一化，边界相切保留；这是保守视锥球相交判断，不是求交点。 */
  intersectsSphere(e) {
    const planes = this.planes,
      n = e.center,
      r = -e.radius;
    for (let e = 0; e < 6; e++) {
      if (planes[e].distanceToPoint(n) < r) return !1;
    }
    return !0;
  }
  intersectsBox(box) {
    const planes = this.planes;
    for (let i = 0; i < 6; i++) {
      const plane = planes[i];
      if (ms.x = plane.normal.x > 0 ? box.max.x : box.min.x, ms.y = plane.normal.y > 0 ? box.max.y : box.min.y, ms.z = plane.normal.z > 0 ? box.max.z : box.min.z, plane.distanceToPoint(ms) < 0) return !1;
    }
    return !0;
  }
  containsPoint(point) {
    const planes = this.planes;
    for (let i = 0; i < 6; i++) if (planes[i].distanceToPoint(point) < 0) return !1;
    return !0;
  }
  /**
   * Returns a new frustum with copied values from this instance.
   *
   * @return {Frustum} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
const Ms = new Matrix4();
/**
 * FrustumArray is used to determine if an object is visible in at least one camera
 * from an array of cameras. This is particularly useful for multi-view renderers.
*/
class FrustumArray {
  constructor() {
    this.coordinateSystem = WebGLCoordinateSystem, this._frustums = [], this._count = 0;
  }
  setFromArrayCamera(cameraArray) {
    const cameras = cameraArray.cameras,
      frustums = this._frustums;
    for (let i = 0; i < cameras.length; i++) {
      const camera = cameras[i];
      Ms.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse), void 0 === frustums[i] && (frustums[i] = new Frustum()), frustums[i].setFromProjectionMatrix(Ms, camera.coordinateSystem, camera.reversedDepth);
    }
    return this._count = cameras.length, this;
  }
  intersectsObject(object) {
    const frustums = this._frustums;
    for (let i = 0; i < this._count; i++) if (frustums[i].intersectsObject(object)) return !0;
    return !1;
  }
  intersectsSprite(sprite) {
    const frustums = this._frustums;
    for (let i = 0; i < this._count; i++) if (frustums[i].intersectsSprite(sprite)) return !0;
    return !1;
  }
  intersectsSphere(sphere) {
    const frustums = this._frustums;
    for (let i = 0; i < this._count; i++) if (frustums[i].intersectsSphere(sphere)) return !0;
    return !1;
  }
  intersectsBox(box) {
    const frustums = this._frustums;
    for (let i = 0; i < this._count; i++) if (frustums[i].intersectsBox(box)) return !0;
    return !1;
  }
  containsPoint(point) {
    const frustums = this._frustums;
    for (let i = 0; i < this._count; i++) if (frustums[i].containsPoint(point)) return !0;
    return !1;
  }
  copy(source) {
    this.coordinateSystem = source.coordinateSystem;
    const frustums = this._frustums,
      sourceFrustums = source._frustums;
    for (let i = 0; i < source._count; i++) void 0 === frustums[i] && (frustums[i] = new Frustum()), frustums[i].copy(sourceFrustums[i]);
    return this._count = source._count, this;
  }
  /**
   * Returns a new frustum array with copied values from this instance.
   *
   * @return {FrustumArray} A clone of this instance.
   */
  clone() {
    return new FrustumArray().copy(this);
  }
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：ascIdSort。 */
function ascIdSort(a, b) {
  return a - b;
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：sortOpaque。 */
function sortOpaque(a, b) {
  return a.z - b.z;
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：sortTransparent。 */
function sortTransparent(a, b) {
  return b.z - a.z;
}
class MultiDrawRenderList {
  constructor() {
    this.index = 0, this.pool = [], this.list = [];
  }
  push(start, count, z, index) {
    const pool = this.pool,
      list = this.list;
    this.index >= pool.length && pool.push({
      start: -1,
      count: -1,
      z: -1,
      index: -1
    });
    const item = pool[this.index];
    list.push(item), this.index++, item.start = start, item.count = count, item.z = z, item.index = index;
  }
  reset() {
    this.list.length = 0, this.index = 0;
  }
}
const bs = new Matrix4(),
  ys = new Color(1, 1, 1),
  frustum = new Frustum(),
  frustumArray = new FrustumArray(),
  Ts = new Box3(),
  Ss = new Sphere(),
  ws = new Vector3(),
  Es = new Vector3(),
  xs = new Vector3(),
  multiDrawRenderList = new MultiDrawRenderList(),
  zs = new Mesh(),
  Os = [];
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：copyAttributeData。交错属性或异构造器逐分量读取写入；其他情况按元素偏移批量复制，并标记需要上传。 */
function copyAttributeData(src, target, targetOffset = 0) {
  const itemSize = target.itemSize;
  if (src.isInterleavedBufferAttribute || src.array.constructor !== target.array.constructor) {
    const vertexCount = src.count;
    for (let i = 0; i < vertexCount; i++) for (let c = 0; c < itemSize; c++) target.setComponent(i + targetOffset, c, src.getComponent(i, c));
  } else target.array.set(src.array, targetOffset * itemSize);
  target.needsUpdate = !0;
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：copyArrayContents。按两数组较短长度复制；同构造器走 TypedArray.set，异构造器逐项赋值。 */
function copyArrayContents(src, target) {
  if (src.constructor !== target.constructor) {
    const len = Math.min(src.length, target.length);
    for (let i = 0; i < len; i++) target[i] = src[i];
  } else {
    const len = Math.min(src.length, target.length);
    target.set(new src.constructor(src.buffer, 0, len));
  }
}
/**
 * A special version of a mesh with multi draw batch rendering support. Use
 * this class if you have to render a large number of objects with the same
 * material but with different geometries or world transformations. The usage of
 * `BatchedMesh` will help you to reduce the number of draw calls and thus improve the overall
 * rendering performance in your application.
 *
 * ```js
 * const box = new THREE.BoxGeometry( 1, 1, 1 );
 * const sphere = new THREE.SphereGeometry( 1, 12, 12 );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 *
 * // initialize and add geometries into the batched mesh
 * const batchedMesh = new BatchedMesh( 10, 5000, 10000, material );
 * const boxGeometryId = batchedMesh.addGeometry( box );
 * const sphereGeometryId = batchedMesh.addGeometry( sphere );
 *
 * // create instances of those geometries
 * const boxInstancedId1 = batchedMesh.addInstance( boxGeometryId );
 * const boxInstancedId2 = batchedMesh.addInstance( boxGeometryId );
 *
 * const sphereInstancedId1 = batchedMesh.addInstance( sphereGeometryId );
 * const sphereInstancedId2 = batchedMesh.addInstance( sphereGeometryId );
 *
 * // position the geometries
 * batchedMesh.setMatrixAt( boxInstancedId1, boxMatrix1 );
 * batchedMesh.setMatrixAt( boxInstancedId2, boxMatrix2 );
 *
 * batchedMesh.setMatrixAt( sphereInstancedId1, sphereMatrix1 );
 * batchedMesh.setMatrixAt( sphereInstancedId2, sphereMatrix2 );
 *
 * scene.add( batchedMesh );
 * ```
 *
 * @augments Mesh
 */
class BatchedMesh extends Mesh {
  constructor(maxInstanceCount, maxVertexCount, maxIndexCount = 2 * maxVertexCount, material) {
    super(new BufferGeometry(), material), this.isBatchedMesh = !0, this.perObjectFrustumCulled = !0, this.sortObjects = !0, this.boundingBox = null, this.boundingSphere = null, this.customSort = null, this._instanceInfo = [], this._geometryInfo = [], this._availableInstanceIds = [], this._availableGeometryIds = [], this._nextIndexStart = 0, this._nextVertexStart = 0, this._geometryCount = 0, this._visibilityChanged = !0, this._geometryInitialized = !1, this._maxInstanceCount = maxInstanceCount, this._maxVertexCount = maxVertexCount, this._maxIndexCount = maxIndexCount, this._multiDrawCounts = new Int32Array(maxInstanceCount), this._multiDrawStarts = new Int32Array(maxInstanceCount), this._multiDrawCount = 0, this._matricesTexture = null, this._indirectTexture = null, this._colorsTexture = null, this._initMatricesTexture(), this._initIndirectTexture();
  }
  get maxInstanceCount() {
    return this._maxInstanceCount;
  }
  get instanceCount() {
    return this._instanceInfo.length - this._availableInstanceIds.length;
  }
  get unusedVertexCount() {
    return this._maxVertexCount - this._nextVertexStart;
  }
  get unusedIndexCount() {
    return this._maxIndexCount - this._nextIndexStart;
  }
  _initMatricesTexture() {
    let size = Math.sqrt(4 * this._maxInstanceCount);
    size = 4 * Math.ceil(size / 4), size = Math.max(size, 4);
    const matricesArray = new Float32Array(size * size * 4),
      matricesTexture = new DataTexture(matricesArray, size, size, RGBAFormat, FloatType);
    this._matricesTexture = matricesTexture;
  }
  _initIndirectTexture() {
    let size = Math.sqrt(this._maxInstanceCount);
    size = Math.ceil(size);
    const indirectArray = new Uint32Array(size * size),
      indirectTexture = new DataTexture(indirectArray, size, size, RedIntegerFormat, UnsignedIntType);
    this._indirectTexture = indirectTexture;
  }
  _initColorsTexture() {
    let size = Math.sqrt(this._maxInstanceCount);
    size = Math.ceil(size);
    const colorsArray = new Float32Array(size * size * 4).fill(1),
      colorsTexture = new DataTexture(colorsArray, size, size, RGBAFormat, FloatType);
    colorsTexture.colorSpace = ColorManagement.workingColorSpace, this._colorsTexture = colorsTexture;
  }
  _initializeGeometry(reference) {
    const geometry = this.geometry,
      maxVertexCount = this._maxVertexCount,
      maxIndexCount = this._maxIndexCount;
    if (!1 === this._geometryInitialized) {
      for (const attributeName in reference.attributes) {
        const i = reference.getAttribute(attributeName),
          {
            array: array,
            itemSize: itemSize,
            normalized: normalized
          } = i,
          dstArray = new array.constructor(maxVertexCount * itemSize),
          dstAttribute = new BufferAttribute(dstArray, itemSize, normalized);
        geometry.setAttribute(attributeName, dstAttribute);
      }
      if (null !== reference.getIndex()) {
        const indexArray = maxVertexCount > 65535 ? new Uint32Array(maxIndexCount) : new Uint16Array(maxIndexCount);
        geometry.setIndex(new BufferAttribute(indexArray, 1));
      }
      this._geometryInitialized = !0;
    }
  }
  _validateGeometry(geometry) {
    const batchGeometry = this.geometry;
    if (Boolean(geometry.getIndex()) !== Boolean(batchGeometry.getIndex())) throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');
    for (const attributeName in batchGeometry.attributes) {
      if (!geometry.hasAttribute(attributeName)) throw new Error(`THREE.BatchedMesh: Added geometry missing "${attributeName}". All geometries must have consistent attributes.`);
      const srcAttribute = geometry.getAttribute(attributeName),
        dstAttribute = batchGeometry.getAttribute(attributeName);
      if (srcAttribute.itemSize !== dstAttribute.itemSize || srcAttribute.normalized !== dstAttribute.normalized) throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.");
    }
  }
  validateInstanceId(instanceId) {
    const instanceInfo = this._instanceInfo;
    if (instanceId < 0 || instanceId >= instanceInfo.length || !1 === instanceInfo[instanceId].active) throw new Error(`THREE.BatchedMesh: Invalid instanceId ${instanceId}. Instance is either out of range or has been deleted.`);
  }
  validateGeometryId(geometryId) {
    const geometryInfoList = this._geometryInfo;
    if (geometryId < 0 || geometryId >= geometryInfoList.length || !1 === geometryInfoList[geometryId].active) throw new Error(`THREE.BatchedMesh: Invalid geometryId ${geometryId}. Geometry is either out of range or has been deleted.`);
  }
  /**
   * Takes a sort a function that is run before render. The function takes a list of instances to
   * sort and a camera. The objects in the list include a "z" field to perform a depth-ordered sort with.
   *
   * @param {Function} func - The custom sort function.
   * @return {BatchedMesh} A reference to this batched mesh.
   */
  setCustomSort(func) {
    return this.customSort = func, this;
  }
  computeBoundingBox() {
    null === this.boundingBox && (this.boundingBox = new Box3());
    const boundingBox = this.boundingBox,
      instanceInfo = this._instanceInfo;
    boundingBox.makeEmpty();
    for (let i = 0, l = instanceInfo.length; i < l; i++) {
      if (!1 === instanceInfo[i].active) continue;
      const geometryId = instanceInfo[i].geometryIndex;
      this.getMatrixAt(i, bs), this.getBoundingBoxAt(geometryId, Ts).applyMatrix4(bs), boundingBox.union(Ts);
    }
  }
  computeBoundingSphere() {
    null === this.boundingSphere && (this.boundingSphere = new Sphere());
    const boundingSphere = this.boundingSphere,
      instanceInfo = this._instanceInfo;
    boundingSphere.makeEmpty();
    for (let i = 0, l = instanceInfo.length; i < l; i++) {
      if (!1 === instanceInfo[i].active) continue;
      const geometryId = instanceInfo[i].geometryIndex;
      this.getMatrixAt(i, bs), this.getBoundingSphereAt(geometryId, Ss).applyMatrix4(bs), boundingSphere.union(Ss);
    }
  }
  /* 没有空闲 ID 且已达到 maxInstanceCount 时抛错。重用最小空闲 ID 或追加 instanceInfo，标记 visible/active 与 geometryIndex；矩阵纹理对应 16 项写 identity，颜色纹理若存在写默认颜色四项，并置纹理 needsUpdate、_visibilityChanged。返回实例 ID，不克隆独立 Mesh，也没有在此验证 geometry ID。 */
  addInstance(e) {
    if (this._instanceInfo.length >= this.maxInstanceCount && 0 === this._availableInstanceIds.length) throw new Error("THREE.BatchedMesh: Maximum item count reached.");
    const t = {
      visible: !0,
      active: !0,
      geometryIndex: e
    };
    let n = null;
    this._availableInstanceIds.length > 0 ? (this._availableInstanceIds.sort(ascIdSort), n = this._availableInstanceIds.shift(), this._instanceInfo[n] = t) : (n = this._instanceInfo.length, this._instanceInfo.push(t));
    const matricesTexture = this._matricesTexture;
    bs.identity().toArray(matricesTexture.image.data, 16 * n), matricesTexture.needsUpdate = !0;
    const colorsTexture = this._colorsTexture;
    return colorsTexture && (ys.toArray(colorsTexture.image.data, 4 * n), colorsTexture.needsUpdate = !0), this._visibilityChanged = !0, n;
  }
  /* 初始化/验证兼容的布局。为顶点及可选 index 保存起点、实际数、保留容量与 null 边界缓存；-1 容量用输入 count，超总容量抛错。预留容量区别于实际 draw count，供以后替换几何体。 */
  addGeometry(e, t = -1, n = -1) {
    this._initializeGeometry(e), this._validateGeometry(e);
    const r = {
        vertexStart: -1,
        vertexCount: -1,
        reservedVertexCount: -1,
        indexStart: -1,
        indexCount: -1,
        reservedIndexCount: -1,
        start: -1,
        count: -1,
        boundingBox: null,
        boundingSphere: null,
        active: !0
      },
      geometryInfo = this._geometryInfo;
    r.vertexStart = this._nextVertexStart, r.reservedVertexCount = -1 === t ? e.getAttribute("position").count : t;
    const a = e.getIndex();
    if (null !== a && (r.indexStart = this._nextIndexStart, r.reservedIndexCount = -1 === n ? a.count : n), -1 !== r.indexStart && r.indexStart + r.reservedIndexCount > this._maxIndexCount || r.vertexStart + r.reservedVertexCount > this._maxVertexCount) throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");
    let s;
    return this._availableGeometryIds.length > 0 ? (this._availableGeometryIds.sort(ascIdSort), s = this._availableGeometryIds.shift(), geometryInfo[s] = r) : (s = this._geometryCount, this._geometryCount++, geometryInfo.push(r)), this.setGeometryAt(s, e), this._nextIndexStart = r.indexStart + r.reservedIndexCount, this._nextVertexStart = r.vertexStart + r.reservedVertexCount, s;
  }
  setGeometryAt(geometryId, geometry) {
    if (geometryId >= this._geometryCount) throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");
    this._validateGeometry(geometry);
    const batchGeometry = this.geometry,
      hasIndex = null !== batchGeometry.getIndex(),
      dstIndex = batchGeometry.getIndex(),
      srcIndex = geometry.getIndex(),
      geometryInfo = this._geometryInfo[geometryId];
    if (hasIndex && srcIndex.count > geometryInfo.reservedIndexCount || geometry.attributes.position.count > geometryInfo.reservedVertexCount) throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");
    const vertexStart = geometryInfo.vertexStart,
      reservedVertexCount = geometryInfo.reservedVertexCount;
    geometryInfo.vertexCount = geometry.getAttribute("position").count;
    for (const attributeName in batchGeometry.attributes) {
      const srcAttribute = geometry.getAttribute(attributeName),
        dstAttribute = batchGeometry.getAttribute(attributeName);
      copyAttributeData(srcAttribute, dstAttribute, vertexStart);
      const itemSize = srcAttribute.itemSize;
      for (let i = srcAttribute.count, l = reservedVertexCount; i < l; i++) {
        const index = vertexStart + i;
        for (let c = 0; c < itemSize; c++) dstAttribute.setComponent(index, c, 0);
      }
      dstAttribute.needsUpdate = !0, dstAttribute.addUpdateRange(vertexStart * itemSize, reservedVertexCount * itemSize);
    }
    if (hasIndex) {
      const indexStart = geometryInfo.indexStart,
        reservedIndexCount = geometryInfo.reservedIndexCount;
      geometryInfo.indexCount = geometry.getIndex().count;
      for (let i = 0; i < srcIndex.count; i++) dstIndex.setX(indexStart + i, vertexStart + srcIndex.getX(i));
      for (let i = srcIndex.count, l = reservedIndexCount; i < l; i++) dstIndex.setX(indexStart + i, vertexStart);
      dstIndex.needsUpdate = !0, dstIndex.addUpdateRange(indexStart, geometryInfo.reservedIndexCount);
    }
    return geometryInfo.start = hasIndex ? geometryInfo.indexStart : geometryInfo.vertexStart, geometryInfo.count = hasIndex ? geometryInfo.indexCount : geometryInfo.vertexCount, geometryInfo.boundingBox = null, null !== geometry.boundingBox && (geometryInfo.boundingBox = geometry.boundingBox.clone()), geometryInfo.boundingSphere = null, null !== geometry.boundingSphere && (geometryInfo.boundingSphere = geometry.boundingSphere.clone()), this._visibilityChanged = !0, geometryId;
  }
  deleteGeometry(geometryId) {
    const geometryInfoList = this._geometryInfo;
    if (geometryId >= geometryInfoList.length || !1 === geometryInfoList[geometryId].active) return this;
    const instanceInfo = this._instanceInfo;
    for (let i = 0, l = instanceInfo.length; i < l; i++) instanceInfo[i].active && instanceInfo[i].geometryIndex === geometryId && this.deleteInstance(i);
    return geometryInfoList[geometryId].active = !1, this._availableGeometryIds.push(geometryId), this._visibilityChanged = !0, this;
  }
  /**
   * Deletes an existing instance from the batch using the given ID.
   *
   * @param {number} instanceId - The ID of the instance to remove from the batch.
   * @return {BatchedMesh} A reference to this batched mesh.
   */
  deleteInstance(instanceId) {
    return this.validateInstanceId(instanceId), this._instanceInfo[instanceId].active = !1, this._availableInstanceIds.push(instanceId), this._visibilityChanged = !0, this;
  }
  /* 按 vertexStart 排列 geometry ID，跳过 inactive，向前压紧活跃保留区。index 搬移时修正基址差，copyWithin 搬移 index/每项 attribute，加入 updateRange 并标 needsUpdate，刷新每个范围 start 与最终 _next*Start/_visibilityChanged，返回 this。ID 与实例引用保持，改变的是存储位置；本地和官方都在 indexStart 改变分支内修正索引。 */
  optimize() {
    let nextVertexStart = 0,
      nextIndexStart = 0;
    const geometryInfo = this._geometryInfo,
      r = geometryInfo.map((e, t) => t).sort((e, t) => geometryInfo[e].vertexStart - geometryInfo[t].vertexStart),
      i = this.geometry;
    for (let a = 0, s = geometryInfo.length; a < s; a++) {
      const s = r[a],
        o = geometryInfo[s];
      if (!1 !== o.active) {
        if (null !== i.index) {
          if (o.indexStart !== nextIndexStart) {
            const {
                indexStart: indexStart,
                vertexStart: vertexStart,
                reservedIndexCount: reservedIndexCount
              } = o,
              s = i.index,
              c = s.array,
              l = nextVertexStart - vertexStart;
            for (let e = indexStart; e < indexStart + reservedIndexCount; e++) c[e] = c[e] + l;
            s.array.copyWithin(nextIndexStart, indexStart, indexStart + reservedIndexCount), s.addUpdateRange(nextIndexStart, reservedIndexCount), s.needsUpdate = !0, o.indexStart = nextIndexStart;
          }
          nextIndexStart += o.reservedIndexCount;
        }
        if (o.vertexStart !== nextVertexStart) {
          const {
              vertexStart: vertexStart,
              reservedVertexCount: reservedVertexCount
            } = o,
            r = i.attributes;
          for (const i in r) {
            const a = r[i],
              {
                array: array,
                itemSize: itemSize
              } = a;
            array.copyWithin(nextVertexStart * itemSize, vertexStart * itemSize, (vertexStart + reservedVertexCount) * itemSize), a.addUpdateRange(nextVertexStart * itemSize, reservedVertexCount * itemSize), a.needsUpdate = !0;
          }
          o.vertexStart = nextVertexStart;
        }
        nextVertexStart += o.reservedVertexCount, o.start = i.index ? o.indexStart : o.vertexStart;
      }
    }
    return this._nextIndexStart = nextIndexStart, this._nextVertexStart = nextVertexStart, this._visibilityChanged = !0, this;
  }
  getBoundingBoxAt(geometryId, target) {
    if (geometryId >= this._geometryCount) return null;
    const geometry = this.geometry,
      geometryInfo = this._geometryInfo[geometryId];
    if (null === geometryInfo.boundingBox) {
      const box = new Box3(),
        index = geometry.index,
        position = geometry.attributes.position;
      for (let i = geometryInfo.start, l = geometryInfo.start + geometryInfo.count; i < l; i++) {
        let iv = i;
        index && (iv = index.getX(iv)), box.expandByPoint(ws.fromBufferAttribute(position, iv));
      }
      geometryInfo.boundingBox = box;
    }
    return target.copy(geometryInfo.boundingBox), target;
  }
  getBoundingSphereAt(geometryId, target) {
    if (geometryId >= this._geometryCount) return null;
    const geometry = this.geometry,
      geometryInfo = this._geometryInfo[geometryId];
    if (null === geometryInfo.boundingSphere) {
      const sphere = new Sphere();
      this.getBoundingBoxAt(geometryId, Ts), Ts.getCenter(sphere.center);
      const index = geometry.index,
        position = geometry.attributes.position;
      let maxRadiusSq = 0;
      for (let i = geometryInfo.start, l = geometryInfo.start + geometryInfo.count; i < l; i++) {
        let iv = i;
        index && (iv = index.getX(iv)), ws.fromBufferAttribute(position, iv), maxRadiusSq = Math.max(maxRadiusSq, sphere.center.distanceToSquared(ws));
      }
      sphere.radius = Math.sqrt(maxRadiusSq), geometryInfo.boundingSphere = sphere;
    }
    return target.copy(geometryInfo.boundingSphere), target;
  }
  setMatrixAt(instanceId, matrix) {
    this.validateInstanceId(instanceId);
    const matricesTexture = this._matricesTexture,
      matricesArray = this._matricesTexture.image.data;
    return matrix.toArray(matricesArray, 16 * instanceId), matricesTexture.needsUpdate = !0, this;
  }
  getMatrixAt(instanceId, matrix) {
    return this.validateInstanceId(instanceId), matrix.fromArray(this._matricesTexture.image.data, 16 * instanceId);
  }
  setColorAt(instanceId, color) {
    return this.validateInstanceId(instanceId), null === this._colorsTexture && this._initColorsTexture(), color.toArray(this._colorsTexture.image.data, 4 * instanceId), this._colorsTexture.needsUpdate = !0, this;
  }
  getColorAt(instanceId, color) {
    return this.validateInstanceId(instanceId), null === this._colorsTexture ? color.isVector4 ? color.set(1, 1, 1, 1) : color.setRGB(1, 1, 1) : color.fromArray(this._colorsTexture.image.data, 4 * instanceId);
  }
  setVisibleAt(instanceId, visible) {
    return this.validateInstanceId(instanceId), this._instanceInfo[instanceId].visible === visible || (this._instanceInfo[instanceId].visible = visible, this._visibilityChanged = !0), this;
  }
  /**
   * Returns the visibility state of the defined instance.
   *
   * @param {number} instanceId - The ID of an instance to get the visibility state of.
   * @return {boolean} Whether the instance is visible or not.
   */
  getVisibleAt(instanceId) {
    return this.validateInstanceId(instanceId), this._instanceInfo[instanceId].visible;
  }
  /**
   * Sets the geometry ID of the instance at the given index.
   *
   * @param {number} instanceId - The ID of the instance to set the geometry ID of.
   * @param {number} geometryId - The geometry ID to be use by the instance.
   * @return {BatchedMesh} A reference to this batched mesh.
   */
  setGeometryIdAt(instanceId, geometryId) {
    return this.validateInstanceId(instanceId), this.validateGeometryId(geometryId), this._instanceInfo[instanceId].geometryIndex = geometryId, this;
  }
  /**
   * Returns the geometry ID of the defined instance.
   *
   * @param {number} instanceId - The ID of an instance to get the geometry ID of.
   * @return {number} The instance's geometry ID.
   */
  getGeometryIdAt(instanceId) {
    return this.validateInstanceId(instanceId), this._instanceInfo[instanceId].geometryIndex;
  }
  /**
   * Get the range representing the subset of triangles related to the attached geometry,
   * indicating the starting offset and count, or `null` if invalid.
   *
   * @param {number} geometryId - The id of the geometry to get the range of.
   * @param {Object} [target] - The target object that is used to store the method's result.
   * @return {{
   * 	vertexStart:number,vertexCount:number,reservedVertexCount:number,
   * 	indexStart:number,indexCount:number,reservedIndexCount:number,
   * 	start:number,count:number
   * }} The result object with range data.
   */
  getGeometryRangeAt(geometryId, target = {}) {
    this.validateGeometryId(geometryId);
    const geometryInfo = this._geometryInfo[geometryId];
    return target.vertexStart = geometryInfo.vertexStart, target.vertexCount = geometryInfo.vertexCount, target.reservedVertexCount = geometryInfo.reservedVertexCount, target.indexStart = geometryInfo.indexStart, target.indexCount = geometryInfo.indexCount, target.reservedIndexCount = geometryInfo.reservedIndexCount, target.start = geometryInfo.start, target.count = geometryInfo.count, target;
  }
  /* 先移除末尾连续空闲 ID；若新上限仍覆盖不了有效 instanceInfo 则抛错。新建 multiDraw counts/starts 数组并复制内容，更新上限；dispose 旧 indirect/matrix/可选 color 纹理后重建并拷贝旧数据。资源所有权属于 BatchedMesh，不是只改 count 数字；返回 undefined。 */
  setInstanceCount(maxInstanceCount) {
    const availableInstanceIds = this._availableInstanceIds,
      instanceInfo = this._instanceInfo;
    for (availableInstanceIds.sort(ascIdSort); availableInstanceIds[availableInstanceIds.length - 1] === instanceInfo.length - 1;) instanceInfo.pop(), availableInstanceIds.pop();
    if (maxInstanceCount < instanceInfo.length) throw new Error(`THREE.BatchedMesh: Instance ids outside the range ${maxInstanceCount} are being used. Cannot shrink instance count.`);
    const r = new Int32Array(maxInstanceCount),
      i = new Int32Array(maxInstanceCount);
    copyArrayContents(this._multiDrawCounts, r), copyArrayContents(this._multiDrawStarts, i), this._multiDrawCounts = r, this._multiDrawStarts = i, this._maxInstanceCount = maxInstanceCount;
    const indirectTexture = this._indirectTexture,
      matricesTexture = this._matricesTexture,
      colorsTexture = this._colorsTexture;
    indirectTexture.dispose(), this._initIndirectTexture(), copyArrayContents(indirectTexture.image.data, this._indirectTexture.image.data), matricesTexture.dispose(), this._initMatricesTexture(), copyArrayContents(matricesTexture.image.data, this._matricesTexture.image.data), colorsTexture && (colorsTexture.dispose(), this._initColorsTexture(), copyArrayContents(colorsTexture.image.data, this._colorsTexture.image.data));
  }
  /* 按所有 active 范围的 start+reservedCount 检查新顶点/index 容量，不能截掉已保留范围。dispose 旧 geometry，更新上限，已初始化则用旧布局重建 BufferGeometry，再复制 index 和 attributes。错误字符串顶点分支也插入 maxIndexCount，这是两份代码可见的现状，不替作者修正。 */
  setGeometrySize(maxVertexCount, maxIndexCount) {
    const n = [...this._geometryInfo].filter(e => e.active);
    if (Math.max(...n.map(e => e.vertexStart + e.reservedVertexCount)) > maxVertexCount) throw new Error(`THREE.BatchedMesh: Geometry vertex values are being used outside the range ${maxIndexCount}. Cannot shrink further.`);
    if (this.geometry.index) {
      if (Math.max(...n.map(e => e.indexStart + e.reservedIndexCount)) > maxIndexCount) throw new Error(`THREE.BatchedMesh: Geometry index values are being used outside the range ${maxIndexCount}. Cannot shrink further.`);
    }
    const r = this.geometry;
    r.dispose(), this._maxVertexCount = maxVertexCount, this._maxIndexCount = maxIndexCount, this._geometryInitialized && (this._geometryInitialized = !1, this.geometry = new BufferGeometry(), this._initializeGeometry(r));
    const i = this.geometry;
    r.index && copyArrayContents(r.index.array, i.index.array);
    for (const e in r.attributes) copyArrayContents(r.attributes[e].array, i.attributes[e].array);
  }
  raycast(raycaster, intersects) {
    const instanceInfo = this._instanceInfo,
      geometryInfoList = this._geometryInfo,
      matrixWorld = this.matrixWorld,
      batchGeometry = this.geometry;
    zs.material = this.material, zs.geometry.index = batchGeometry.index, zs.geometry.attributes = batchGeometry.attributes, null === zs.geometry.boundingBox && (zs.geometry.boundingBox = new Box3()), null === zs.geometry.boundingSphere && (zs.geometry.boundingSphere = new Sphere());
    for (let i = 0, l = instanceInfo.length; i < l; i++) {
      if (!instanceInfo[i].visible || !instanceInfo[i].active) continue;
      const geometryId = instanceInfo[i].geometryIndex,
        geometryInfo = geometryInfoList[geometryId];
      zs.geometry.setDrawRange(geometryInfo.start, geometryInfo.count), this.getMatrixAt(i, zs.matrixWorld).premultiply(matrixWorld), this.getBoundingBoxAt(geometryId, zs.geometry.boundingBox), this.getBoundingSphereAt(geometryId, zs.geometry.boundingSphere), zs.raycast(raycaster, Os);
      for (let j = 0, l = Os.length; j < l; j++) {
        const intersect = Os[j];
        intersect.object = this, intersect.batchId = i, intersects.push(intersect);
      }
      Os.length = 0;
    }
    zs.material = null, zs.geometry.index = null, zs.geometry.attributes = {}, zs.geometry.setDrawRange(0, 1 / 0);
  }
  copy(source) {
    return super.copy(source), this.geometry = source.geometry.clone(), this.perObjectFrustumCulled = source.perObjectFrustumCulled, this.sortObjects = source.sortObjects, this.boundingBox = null !== source.boundingBox ? source.boundingBox.clone() : null, this.boundingSphere = null !== source.boundingSphere ? source.boundingSphere.clone() : null, this._geometryInfo = source._geometryInfo.map(info => ({
      ...info,
      boundingBox: null !== info.boundingBox ? info.boundingBox.clone() : null,
      boundingSphere: null !== info.boundingSphere ? info.boundingSphere.clone() : null
    })), this._instanceInfo = source._instanceInfo.map(info => ({
      ...info
    })), this._availableInstanceIds = source._availableInstanceIds.slice(), this._availableGeometryIds = source._availableGeometryIds.slice(), this._nextIndexStart = source._nextIndexStart, this._nextVertexStart = source._nextVertexStart, this._geometryCount = source._geometryCount, this._maxInstanceCount = source._maxInstanceCount, this._maxVertexCount = source._maxVertexCount, this._maxIndexCount = source._maxIndexCount, this._geometryInitialized = source._geometryInitialized, this._multiDrawCounts = source._multiDrawCounts.slice(), this._multiDrawStarts = source._multiDrawStarts.slice(), this._indirectTexture = source._indirectTexture.clone(), this._indirectTexture.image.data = this._indirectTexture.image.data.slice(), this._matricesTexture = source._matricesTexture.clone(), this._matricesTexture.image.data = this._matricesTexture.image.data.slice(), null !== this._colorsTexture && (this._colorsTexture = source._colorsTexture.clone(), this._colorsTexture.image.data = this._colorsTexture.image.data.slice()), this;
  }
  dispose() {
    this.geometry.dispose(), this._matricesTexture.dispose(), this._matricesTexture = null, this._indirectTexture.dispose(), this._indirectTexture = null, null !== this._colorsTexture && (this._colorsTexture.dispose(), this._colorsTexture = null);
  }
  onBeforeRender(renderer, scene, camera, geometry, material) {
    if (!this._visibilityChanged && !this.perObjectFrustumCulled && !this.sortObjects) return;
    const index = geometry.getIndex();
    let bytesPerElement = null === index ? 1 : index.array.BYTES_PER_ELEMENT,
      multiDrawMultiplier = 1;
    material.wireframe && (multiDrawMultiplier = 2, bytesPerElement = geometry.attributes.position.count > 65535 ? 4 : 2);
    const instanceInfo = this._instanceInfo,
      multiDrawStarts = this._multiDrawStarts,
      multiDrawCounts = this._multiDrawCounts,
      geometryInfoList = this._geometryInfo,
      perObjectFrustumCulled = this.perObjectFrustumCulled,
      indirectTexture = this._indirectTexture,
      indirectArray = indirectTexture.image.data,
      m = camera.isArrayCamera ? frustumArray : frustum;
    perObjectFrustumCulled && (camera.isArrayCamera ? m.setFromArrayCamera(camera) : (bs.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse).multiply(this.matrixWorld), m.setFromProjectionMatrix(bs, camera.coordinateSystem, camera.reversedDepth)));
    let multiDrawCount = 0;
    if (this.sortObjects) {
      bs.copy(this.matrixWorld).invert(), ws.setFromMatrixPosition(camera.matrixWorld).applyMatrix4(bs), Es.set(0, 0, -1).transformDirection(camera.matrixWorld).transformDirection(bs);
      for (let i = 0, l = instanceInfo.length; i < l; i++) if (instanceInfo[i].visible && instanceInfo[i].active) {
        const geometryId = instanceInfo[i].geometryIndex;
        this.getMatrixAt(i, bs), this.getBoundingSphereAt(geometryId, Ss).applyMatrix4(bs);
        let culled = !1;
        if (perObjectFrustumCulled && (culled = !m.intersectsSphere(Ss)), !culled) {
          const geometryInfo = geometryInfoList[geometryId],
            z = xs.subVectors(Ss.center, ws).dot(Es);
          multiDrawRenderList.push(geometryInfo.start, geometryInfo.count, z, i);
        }
      }
      const list = multiDrawRenderList.list,
        customSort = this.customSort;
      null === customSort ? list.sort(material.transparent ? sortTransparent : sortOpaque) : customSort.call(this, list, camera);
      for (let i = 0, l = list.length; i < l; i++) {
        const item = list[i];
        multiDrawStarts[multiDrawCount] = item.start * bytesPerElement * multiDrawMultiplier, multiDrawCounts[multiDrawCount] = item.count * multiDrawMultiplier, indirectArray[multiDrawCount] = item.index, multiDrawCount++;
      }
      multiDrawRenderList.reset();
    } else for (let i = 0, l = instanceInfo.length; i < l; i++) if (instanceInfo[i].visible && instanceInfo[i].active) {
      const geometryId = instanceInfo[i].geometryIndex;
      let culled = !1;
      if (perObjectFrustumCulled && (this.getMatrixAt(i, bs), this.getBoundingSphereAt(geometryId, Ss).applyMatrix4(bs), culled = !m.intersectsSphere(Ss)), !culled) {
        const geometryInfo = geometryInfoList[geometryId];
        multiDrawStarts[multiDrawCount] = geometryInfo.start * bytesPerElement * multiDrawMultiplier, multiDrawCounts[multiDrawCount] = geometryInfo.count * multiDrawMultiplier, indirectArray[multiDrawCount] = i, multiDrawCount++;
      }
    }
    indirectTexture.needsUpdate = !0, this._multiDrawCount = multiDrawCount, this._visibilityChanged = !1;
  }
  onBeforeShadow(renderer, object, camera, shadowCamera, geometry, depthMaterial) {
    this.onBeforeRender(renderer, null, shadowCamera, geometry, depthMaterial);
  }
}
/**
 * A material for rendering line primitives.
 *
 * Materials define the appearance of renderable 3D objects.
 *
 * ```js
 * const material = new THREE.LineBasicMaterial( { color: 0xffffff } );
 * ```
 *
 * @augments Material
 */
class LineBasicMaterial extends Material {
  constructor(parameters) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new Color(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(parameters);
  }
  copy(source) {
    return super.copy(source), this.color.copy(source.color), this.map = source.map, this.linewidth = source.linewidth, this.linecap = source.linecap, this.linejoin = source.linejoin, this.fog = source.fog, this;
  }
}
const Ns = new Vector3(),
  Is = new Vector3(),
  Rs = new Matrix4(),
  ks = new Ray(),
  Ps = new Sphere(),
  Ys = new Vector3(),
  Ws = new Vector3();
/**
 * A continuous line. The line are rendered by connecting consecutive
 * vertices with straight lines.
 *
 * ```js
 * const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
 *
 * const points = [];
 * points.push( new THREE.Vector3( - 10, 0, 0 ) );
 * points.push( new THREE.Vector3( 0, 10, 0 ) );
 * points.push( new THREE.Vector3( 10, 0, 0 ) );
 *
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 *
 * const line = new THREE.Line( geometry, material );
 * scene.add( line );
 * ```
 *
 * @augments Object3D
 */
class Line extends Object3D {
  constructor(geometry = new BufferGeometry(), material = new LineBasicMaterial()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = geometry, this.material = material, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
  }
  copy(source, recursive) {
    return super.copy(source, recursive), this.material = Array.isArray(source.material) ? source.material.slice() : source.material, this.geometry = source.geometry, this;
  }
  computeLineDistances() {
    const geometry = this.geometry;
    if (null === geometry.index) {
      const positionAttribute = geometry.attributes.position,
        lineDistances = [0];
      for (let i = 1, l = positionAttribute.count; i < l; i++) Ns.fromBufferAttribute(positionAttribute, i - 1), Is.fromBufferAttribute(positionAttribute, i), lineDistances[i] = lineDistances[i - 1], lineDistances[i] += Ns.distanceTo(Is);
      geometry.setAttribute("lineDistance", new Float32BufferAttribute(lineDistances, 1));
    } else warn("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  /* 世界包围球半径加 threshold 粗筛；逆世界射线，threshold 除本地 scale 三分量均值后平方。indexed/non-indexed 都与 drawRange 交集，LineSegments 步长 2、普通线步长 1，LineLoop 额外闭合最后与首点；Fs 求射线到线段距离并做世界 near/far。平均尺度是近似，不能宣称非均匀缩放下严格等距。 */
  raycast(e, t) {
    const n = this.geometry,
      matrixWorld = this.matrixWorld,
      i = e.params.Line.threshold,
      a = n.drawRange;
    if (null === n.boundingSphere && n.computeBoundingSphere(), Ps.copy(n.boundingSphere), Ps.applyMatrix4(matrixWorld), Ps.radius += i, !1 === e.ray.intersectsSphere(Ps)) return;
    Rs.copy(matrixWorld).invert(), ks.copy(e.ray).applyMatrix4(Rs);
    const s = i / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      o = s * s,
      c = this.isLineSegments ? 2 : 1,
      l = n.index,
      u = n.attributes.position;
    if (null !== l) {
      const n = Math.max(0, a.start),
        r = Math.min(l.count, a.start + a.count);
      for (let i = n, a = r - 1; i < a; i += c) {
        const n = l.getX(i),
          r = l.getX(i + 1),
          a = checkIntersection(this, e, ks, o, n, r, i);
        a && t.push(a);
      }
      if (this.isLineLoop) {
        const i = l.getX(r - 1),
          a = l.getX(n),
          s = checkIntersection(this, e, ks, o, i, a, r - 1);
        s && t.push(s);
      }
    } else {
      const n = Math.max(0, a.start),
        r = Math.min(u.count, a.start + a.count);
      for (let i = n, a = r - 1; i < a; i += c) {
        const n = checkIntersection(this, e, ks, o, i, i + 1, i);
        n && t.push(n);
      }
      if (this.isLineLoop) {
        const i = checkIntersection(this, e, ks, o, r - 1, n, r - 1);
        i && t.push(i);
      }
    }
  }
  /* 与 Mesh 的独立实现一样，按首个 morph 属性数组重建零 influences 和名称字典；无属性时不清旧值，重名末项胜出。这不是从 Mesh 继承的同一函数，已单独检查。 */
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      t = Object.keys(e);
    if (t.length > 0) {
      const n = e[t[0]];
      if (void 0 !== n) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let e = 0, t = n.length; e < t; e++) {
          const t = n[e].name || String(e);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
        }
      }
    }
  }
}
/* 人工身份合同：线段端点与 distanceSqToSegment、near/far 和 index 命中结果。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function checkIntersection(e, t, n, r, i, a, s) {
  const o = e.geometry.attributes.position;
  Ns.fromBufferAttribute(o, i), Is.fromBufferAttribute(o, a);
  if (n.distanceSqToSegment(Ns, Is, Ys, Ws) > r) return;
  Ys.applyMatrix4(e.matrixWorld);
  const c = t.ray.origin.distanceTo(Ys);
  return c < t.near || c > t.far ? void 0 : {
    distance: c,
    point: Ws.clone().applyMatrix4(e.matrixWorld),
    index: s,
    face: null,
    faceIndex: null,
    barycoord: null,
    object: e
  };
}
const qs = new Vector3(),
  Hs = new Vector3();
class LineSegments extends Line {
  constructor(geometry, material) {
    super(geometry, material), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const geometry = this.geometry;
    if (null === geometry.index) {
      const positionAttribute = geometry.attributes.position,
        lineDistances = [];
      for (let i = 0, l = positionAttribute.count; i < l; i += 2) qs.fromBufferAttribute(positionAttribute, i), Hs.fromBufferAttribute(positionAttribute, i + 1), lineDistances[i] = 0 === i ? 0 : lineDistances[i - 1], lineDistances[i + 1] = lineDistances[i] + qs.distanceTo(Hs);
      geometry.setAttribute("lineDistance", new Float32BufferAttribute(lineDistances, 1));
    } else warn("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class LineLoop extends Line {
  constructor(geometry, material) {
    super(geometry, material), this.isLineLoop = !0, this.type = "LineLoop";
  }
}
/**
 * A material for rendering point primitives.
 *
 * Materials define the appearance of renderable 3D objects.
 *
 * ```js
 * const vertices = [];
 *
 * for ( let i = 0; i < 10000; i ++ ) {
 * 	const x = THREE.MathUtils.randFloatSpread( 2000 );
 * 	const y = THREE.MathUtils.randFloatSpread( 2000 );
 * 	const z = THREE.MathUtils.randFloatSpread( 2000 );
 *
 * 	vertices.push( x, y, z );
 * }
 *
 * const geometry = new THREE.BufferGeometry();
 * geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
 * const material = new THREE.PointsMaterial( { color: 0x888888 } );
 * const points = new THREE.Points( geometry, material );
 * scene.add( points );
 * ```
 *
 * @augments Material
 */
class PointsMaterial extends Material {
  constructor(parameters) {
    super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new Color(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(parameters);
  }
  copy(source) {
    return super.copy(source), this.color.copy(source.color), this.map = source.map, this.alphaMap = source.alphaMap, this.size = source.size, this.sizeAttenuation = source.sizeAttenuation, this.fog = source.fog, this;
  }
}
const Us = new Matrix4(),
  Gs = new Ray(),
  Xs = new Sphere(),
  js = new Vector3();
/**
 * A class for displaying points or point clouds.
 *
 * @augments Object3D
 */
class Points extends Object3D {
  constructor(geometry = new BufferGeometry(), material = new PointsMaterial()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = geometry, this.material = material, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
  }
  copy(source, recursive) {
    return super.copy(source, recursive), this.material = Array.isArray(source.material) ? source.material.slice() : source.material, this.geometry = source.geometry, this;
  }
  /* 世界包围球加 Points.threshold 粗筛，射线转局部、阈值除平均 scale。indexed 遍历索引值，non-indexed 遍历位置下标，均遵守 drawRange，调用 testPoint 测射线距离并追加含 index 的世界命中。不是把点看成带屏幕像素尺寸的 sprite。 */
  raycast(e, t) {
    const n = this.geometry,
      matrixWorld = this.matrixWorld,
      i = e.params.Points.threshold,
      a = n.drawRange;
    if (null === n.boundingSphere && n.computeBoundingSphere(), Xs.copy(n.boundingSphere), Xs.applyMatrix4(matrixWorld), Xs.radius += i, !1 === e.ray.intersectsSphere(Xs)) return;
    Us.copy(matrixWorld).invert(), Gs.copy(e.ray).applyMatrix4(Us);
    const s = i / ((this.scale.x + this.scale.y + this.scale.z) / 3),
      o = s * s,
      c = n.index,
      l = n.attributes.position;
    if (null !== c) {
      for (let n = Math.max(0, a.start), i = Math.min(c.count, a.start + a.count); n < i; n++) {
        const i = c.getX(n);
        js.fromBufferAttribute(l, i), testPoint(js, i, o, matrixWorld, e, t, this);
      }
    } else {
      for (let n = Math.max(0, a.start), i = Math.min(l.count, a.start + a.count); n < i; n++) js.fromBufferAttribute(l, n), testPoint(js, n, o, matrixWorld, e, t, this);
    }
  }
  /* 单独实现首个 morph 属性驱动的 influences/dictionary 初始化；权重全 0，名称缺失用索引，空数据不主动删除旧状态。与 Line 和 Mesh 的三处都已阅读。 */
  updateMorphTargets() {
    const e = this.geometry.morphAttributes,
      t = Object.keys(e);
    if (t.length > 0) {
      const n = e[t[0]];
      if (void 0 !== n) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let e = 0, t = n.length; e < t; e++) {
          const t = n[e].name || String(e);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
        }
      }
    }
  }
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：testPoint。检查点到局部射线的平方距离，再用世界距离和 near/far 筛选命中。 */
function testPoint(point, index, localThresholdSq, matrixWorld, raycaster, intersects, object) {
  const rayPointDistanceSq = Gs.distanceSqToPoint(point);
  if (rayPointDistanceSq < localThresholdSq) {
    const intersectPoint = new Vector3();
    Gs.closestPointToPoint(point, intersectPoint), intersectPoint.applyMatrix4(matrixWorld);
    const distance = raycaster.ray.origin.distanceTo(intersectPoint);
    if (distance < raycaster.near || distance > raycaster.far) return;
    intersects.push({
      distance: distance,
      distanceToRay: Math.sqrt(rayPointDistanceSq),
      point: intersectPoint,
      index: index,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: object
    });
  }
}
/**
 * A texture for use with a video.
 *
 * ```js
 * // assuming you have created a HTML video element with id="video"
 * const video = document.getElementById( 'video' );
 * const texture = new THREE.VideoTexture( video );
 * ```
 *
 * Note: When using video textures with {@link WebGPURenderer}, {@link Texture#colorSpace} must be
 * set to THREE.SRGBColorSpace.
 *
 * Note: After the initial use of a texture, its dimensions, format, and type
 * cannot be changed. Instead, call {@link Texture#dispose} on the texture and instantiate a new one.
 *
 * @augments Texture
 */
class VideoTexture extends Texture {
  /* 向 Texture 传视频和 mapping/wrap/filter/type 参数，默认 min/mag 为 LinearFilter，禁止 mipmaps。若视频支持 requestVideoFrameCallback，注册自续回调，每帧置 needsUpdate 并保存最新 callback ID。只调度视频更新，未在构造时上传 GPU；回调闭包持有此纹理与视频。 */
  constructor(e, t, n, r, i = LinearFilter, a = LinearFilter, s, o, c) {
    super(e, t, n, r, i, a, s, o, c), this.isVideoTexture = !0, this.generateMipmaps = !1, this._requestVideoFrameCallbackId = 0;
    const l = this;
    "requestVideoFrameCallback" in e && (this._requestVideoFrameCallbackId = e.requestVideoFrameCallback(function t() {
      l.needsUpdate = !0, l._requestVideoFrameCallbackId = e.requestVideoFrameCallback(t);
    }));
  }
  clone() {
    return new this.constructor(this.image).copy(this);
  }
  /* 仅当视频没有 requestVideoFrameCallback 且 readyState>=HAVE_CURRENT_DATA 时标 needsUpdate，避免有逐帧 API 时每个渲染帧重复更新。函数不返回帧或纹理，旧浏览器 fallback 没有比较时间戳。 */
  update() {
    const image = this.image;
    !1 === "requestVideoFrameCallback" in image && image.readyState >= image.HAVE_CURRENT_DATA && (this.needsUpdate = !0);
  }
  dispose() {
    0 !== this._requestVideoFrameCallbackId && (this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId), this._requestVideoFrameCallbackId = 0), super.dispose();
  }
}
/**
 * This class can be used as an alternative way to define video data. Instead of using
 * an instance of `HTMLVideoElement` like with `VideoTexture`, `VideoFrameTexture` expects each frame is
 * defined manually via {@link VideoFrameTexture#setFrame}. A typical use case for this module is when
 * video frames are decoded with the WebCodecs API.
 *
 * ```js
 * const texture = new THREE.VideoFrameTexture();
 * texture.setFrame( frame );
 * ```
 *
 * @augments VideoTexture
 */
class VideoFrameTexture extends VideoTexture {
  /**
   * Constructs a new video frame texture.
   *
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   */
  constructor(mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
    super({}, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy), this.isVideoFrameTexture = !0;
  }
  update() {}
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Sets the current frame of the video. This will automatically update the texture
   * so the data can be used for rendering.
   *
   * @param {VideoFrame} frame - The video frame.
   */
  setFrame(frame) {
    this.image = frame, this.needsUpdate = !0;
  }
}
/**
 * This class can only be used in combination with `copyFramebufferToTexture()` methods
 * of renderers. It extracts the contents of the current bound framebuffer and provides it
 * as a texture for further usage.
 *
 * ```js
 * const pixelRatio = window.devicePixelRatio;
 * const textureSize = 128 * pixelRatio;
 *
 * const frameTexture = new FramebufferTexture( textureSize, textureSize );
 *
 * // calculate start position for copying part of the frame data
 * const vector = new Vector2();
 * vector.x = ( window.innerWidth * pixelRatio / 2 ) - ( textureSize / 2 );
 * vector.y = ( window.innerHeight * pixelRatio / 2 ) - ( textureSize / 2 );
 *
 * renderer.render( scene, camera );
 *
 * // copy part of the rendered frame into the framebuffer texture
 * renderer.copyFramebufferToTexture( frameTexture, vector );
 * ```
 *
 * @augments Texture
 */
class FramebufferTexture extends Texture {
  /**
   * Constructs a new framebuffer texture.
   *
   * @param {number} [width] - The width of the texture.
   * @param {number} [height] - The height of the texture.
   */
  constructor(width, height) {
    super({
      width: width,
      height: height
    }), this.isFramebufferTexture = !0, this.magFilter = NearestFilter, this.minFilter = NearestFilter, this.generateMipmaps = !1, this.needsUpdate = !0;
  }
}
/**
 * Creates a texture based on data in compressed form.
 *
 * These texture are usually loaded with {@link CompressedTextureLoader}.
 *
 * @augments Texture
 */
class CompressedTexture extends Texture {
  /**
   * Constructs a new compressed texture.
   *
   * @param {Array<Object>} mipmaps - This array holds for all mipmaps (including the bases mip)
   * the data and dimensions.
   * @param {number} width - The width of the texture.
   * @param {number} height - The height of the texture.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space.
   */
  constructor(mipmaps, width, height, format, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, colorSpace) {
    super(null, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace), this.isCompressedTexture = !0, this.image = {
      width: width,
      height: height
    }, this.mipmaps = mipmaps, this.flipY = !1, this.generateMipmaps = !1;
  }
}
/**
 * Creates a texture 2D array based on data in compressed form.
 *
 * These texture are usually loaded with {@link CompressedTextureLoader}.
 *
 * @augments CompressedTexture
 */
class CompressedArrayTexture extends CompressedTexture {
  /**
   * Constructs a new compressed array texture.
   *
   * @param {Array<Object>} mipmaps - This array holds for all mipmaps (including the bases mip)
   * the data and dimensions.
   * @param {number} width - The width of the texture.
   * @param {number} height - The height of the texture.
   * @param {number} depth - The depth of the texture.
   * @param {number} [format=RGBAFormat] - The min filter value.
   * @param {number} [type=UnsignedByteType] - The min filter value.
   */
  constructor(mipmaps, width, height, depth, format, type) {
    super(mipmaps, width, height, format, type), this.isCompressedArrayTexture = !0, this.image.depth = depth, this.wrapR = ClampToEdgeWrapping, this.layerUpdates = new Set();
  }
  /**
   * Describes that a specific layer of the texture needs to be updated.
   * Normally when {@link Texture#needsUpdate} is set to `true`, the
   * entire compressed texture array is sent to the GPU. Marking specific
   * layers will only transmit subsets of all mipmaps associated with a
   * specific depth in the array which is often much more performant.
   *
   * @param {number} layerIndex - The layer index that should be updated.
   */
  addLayerUpdate(layerIndex) {
    this.layerUpdates.add(layerIndex);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class CompressedCubeTexture extends CompressedTexture {
  constructor(images, format, type) {
    super(void 0, images[0].width, images[0].height, format, type, CubeReflectionMapping), this.isCompressedCubeTexture = !0, this.isCubeTexture = !0, this.image = images;
  }
}
/**
 * Creates a cube texture made up of six images.
 *
 * ```js
 * const loader = new THREE.CubeTextureLoader();
 * loader.setPath( 'textures/cube/pisa/' );
 *
 * const textureCube = loader.load( [
 * 	'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'
 * ] );
 *
 * const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
 * ```
 *
 * @augments Texture
 */
class CubeTexture extends Texture {
  /**
   * Constructs a new cube texture.
   *
   * @param {Array<Image>} [images=[]] - An array holding a image for each side of a cube.
   * @param {number} [mapping=CubeReflectionMapping] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space value.
   */
  constructor(images = [], mapping = CubeReflectionMapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace) {
    super(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, colorSpace), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(value) {
    this.image = value;
  }
}
/**
 * Creates a texture from a canvas element.
 *
 * This is almost the same as the base texture class, except that it sets {@link Texture#needsUpdate}
 * to `true` immediately since a canvas can directly be used for rendering.
 *
 * @augments Texture
 */
class CanvasTexture extends Texture {
  /**
   * Constructs a new texture.
   *
   * @param {HTMLCanvasElement} [canvas] - The HTML canvas element.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   */
  constructor(canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
    super(canvas, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy), this.isCanvasTexture = !0, this.needsUpdate = !0;
  }
}
class HTMLTexture extends Texture {
  constructor(element, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
    super(element, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy), this.isHTMLTexture = !0, this.generateMipmaps = !1, this.needsUpdate = !0;
    const parent = element ? element.parentNode : null;
    null !== parent && "requestPaint" in parent && (parent.onpaint = () => {
      this.needsUpdate = !0;
    }, parent.requestPaint());
  }
  dispose() {
    const parent = this.image ? this.image.parentNode : null;
    null !== parent && "onpaint" in parent && (parent.onpaint = null), super.dispose();
  }
}
/**
 * This class can be used to automatically save the depth information of a
 * rendering into a texture.
 *
 * @augments Texture
 */
class DepthTexture extends Texture {
  /* 输入 width,height、默认 UnsignedIntType、采样/映射参数及默认 DepthFormat、depth=1。只接受 DepthFormat/DepthStencilFormat，否则构造前抛错；image 是新 {width,height,depth} 描述，不是像素数组。flipY=false、generateMipmaps=false、compareFunction=null，默认最近采样，父类建立其余纹理状态。 */
  constructor(e, t, n = UnsignedIntType, r, i, a, s = NearestFilter, o = NearestFilter, c, l = DepthFormat, u = 1) {
    if (l !== DepthFormat && l !== DepthStencilFormat) throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    super({
      width: e,
      height: t,
      depth: u
    }, r, i, a, s, o, l, n, c), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(source) {
    return super.copy(source), this.source = new Source(Object.assign({}, source.image)), this.compareFunction = source.compareFunction, this;
  }
  toJSON(meta) {
    const data = super.toJSON(meta);
    return null !== this.compareFunction && (data.compareFunction = this.compareFunction), data;
  }
}
/**
 * This class can be used to automatically save the depth information of a
 * cube rendering into a cube texture with depth format. Used for PointLight shadows.
 *
 * @augments DepthTexture
 */
class CubeDepthTexture extends DepthTexture {
  /**
   * Constructs a new cube depth texture.
   *
   * @param {number} size - The size (width and height) of each cube face.
   * @param {number} [type=UnsignedIntType] - The texture type.
   * @param {number} [mapping=CubeReflectionMapping] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=NearestFilter] - The mag filter value.
   * @param {number} [minFilter=NearestFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {number} [format=DepthFormat] - The texture format.
   */
  constructor(size, type = UnsignedIntType, mapping = CubeReflectionMapping, wrapS, wrapT, magFilter = NearestFilter, minFilter = NearestFilter, anisotropy, format = DepthFormat) {
    const image = {
        width: size,
        height: size,
        depth: 1
      },
      images = [image, image, image, image, image, image];
    super(size, size, type, mapping, wrapS, wrapT, magFilter, minFilter, anisotropy, format), this.image = images, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
  }
  get images() {
    return this.image;
  }
  set images(value) {
    this.image = value;
  }
}
/**
 * Represents a texture created externally with the same renderer context.
 *
 * This may be a texture from a protected media stream, device camera feed,
 * or other data feeds like a depth sensor.
 *
 * @augments Texture
 */
class ExternalTexture extends Texture {
  /**
   * Creates a new raw texture.
   *
   * @param {?(WebGLTexture|GPUTexture)} [sourceTexture=null] - The external texture.
   */
  constructor(sourceTexture = null) {
    super(), this.sourceTexture = sourceTexture, this.isExternalTexture = !0;
  }
  copy(source) {
    return super.copy(source), this.sourceTexture = source.sourceTexture, this;
  }
}
/**
 * A geometry class for a rectangular cuboid with a given width, height, and depth.
 * On creation, the cuboid is centred on the origin, with each edge parallel to one
 * of the axes.
 *
 * ```js
 * const geometry = new THREE.BoxGeometry( 1, 1, 1 );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 * const cube = new THREE.Mesh( geometry, material );
 * scene.add( cube );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#BoxGeometry
 */
class BoxGeometry extends BufferGeometry {
  constructor(width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: width,
      height: height,
      depth: depth,
      widthSegments: widthSegments,
      heightSegments: heightSegments,
      depthSegments: depthSegments
    };
    const scope = this;
    widthSegments = Math.floor(widthSegments), heightSegments = Math.floor(heightSegments), depthSegments = Math.floor(depthSegments);
    const indices = [],
      vertices = [],
      normals = [],
      uvs = [];
    let numberOfVertices = 0,
      groupStart = 0;
    function buildPlane(u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex) {
      const segmentWidth = width / gridX,
        segmentHeight = height / gridY,
        widthHalf = width / 2,
        heightHalf = height / 2,
        depthHalf = depth / 2,
        gridX1 = gridX + 1,
        gridY1 = gridY + 1;
      let vertexCounter = 0,
        groupCount = 0;
      const vector = new Vector3();
      for (let iy = 0; iy < gridY1; iy++) {
        const y = iy * segmentHeight - heightHalf;
        for (let ix = 0; ix < gridX1; ix++) {
          const x = ix * segmentWidth - widthHalf;
          vector[u] = x * udir, vector[v] = y * vdir, vector[w] = depthHalf, vertices.push(vector.x, vector.y, vector.z), vector[u] = 0, vector[v] = 0, vector[w] = depth > 0 ? 1 : -1, normals.push(vector.x, vector.y, vector.z), uvs.push(ix / gridX), uvs.push(1 - iy / gridY), vertexCounter += 1;
        }
      }
      for (let iy = 0; iy < gridY; iy++) for (let ix = 0; ix < gridX; ix++) {
        const a = numberOfVertices + ix + gridX1 * iy,
          b = numberOfVertices + ix + gridX1 * (iy + 1),
          c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1),
          d = numberOfVertices + (ix + 1) + gridX1 * iy;
        indices.push(a, b, d), indices.push(b, c, d), groupCount += 6;
      }
      scope.addGroup(groupStart, groupCount, materialIndex), groupStart += groupCount, numberOfVertices += vertexCounter;
    }
    buildPlane("z", "y", "x", -1, -1, depth, height, width, depthSegments, heightSegments, 0), buildPlane("z", "y", "x", 1, -1, depth, height, -width, depthSegments, heightSegments, 1), buildPlane("x", "z", "y", 1, 1, width, depth, height, widthSegments, depthSegments, 2), buildPlane("x", "z", "y", 1, -1, width, depth, -height, widthSegments, depthSegments, 3), buildPlane("x", "y", "z", 1, -1, width, height, depth, widthSegments, heightSegments, 4), buildPlane("x", "y", "z", -1, -1, width, height, -depth, widthSegments, heightSegments, 5), this.setIndex(indices), this.setAttribute("position", new Float32BufferAttribute(vertices, 3)), this.setAttribute("normal", new Float32BufferAttribute(normals, 3)), this.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  }
  copy(source) {
    return super.copy(source), this.parameters = Object.assign({}, source.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {BoxGeometry} A new instance.
   */
  static fromJSON(data) {
    return new BoxGeometry(data.width, data.height, data.depth, data.widthSegments, data.heightSegments, data.depthSegments);
  }
}
/**
 * A geometry class for representing a capsule.
 *
 * ```js
 * const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8, 1 );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 * const capsule = new THREE.Mesh( geometry, material );
 * scene.add( capsule );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#CapsuleGeometry
 */
class CapsuleGeometry extends BufferGeometry {
  /* 参数半径、圆柱高度、每端 capSegments、radialSegments、heightSegments。高度至少 0，分段取整并分别至少 1/3/1；沿剖面先下半球、圆柱、上半球生成 radialSegments+1 的闭合环。本地 profileY 加法次序与官方不同，数学说明不是浮点逐位等价证明。 */
  constructor(e = 1, t = 1, n = 4, r = 8, i = 1) {
    super(), this.type = "CapsuleGeometry", this.parameters = {
      radius: e,
      height: t,
      capSegments: n,
      radialSegments: r,
      heightSegments: i
    }, t = Math.max(0, t), n = Math.max(1, Math.floor(n)), r = Math.max(3, Math.floor(r)), i = Math.max(1, Math.floor(i));
    const a = [],
      s = [],
      o = [],
      c = [],
      l = t / 2,
      u = Math.PI / 2 * e,
      d = t,
      h = 2 * u + d,
      p = 2 * n + i,
      f = r + 1,
      m = new Vector3(),
      M = new Vector3();
    for (let _ = 0; _ <= p; _++) {
      let A = 0,
        g = 0,
        b = 0,
        y = 0;
      if (_ <= n) {
        const t = _ / n,
          r = t * Math.PI / 2;
        g = -l - e * Math.cos(r), b = e * Math.sin(r), y = -e * Math.cos(r), A = t * u;
      } else if (_ <= n + i) {
        const r = (_ - n) / i;
        g = r * t - l, b = e, y = 0, A = u + r * d;
      } else {
        const t = (_ - n - i) / n,
          r = t * Math.PI / 2;
        g = l + e * Math.sin(r), b = e * Math.cos(r), y = e * Math.sin(r), A = u + d + t * u;
      }
      const L = Math.max(0, Math.min(1, A / h));
      let v = 0;
      0 === _ ? v = .5 / r : _ === p && (v = -.5 / r);
      for (let e = 0; e <= r; e++) {
        const t = e / r,
          n = t * Math.PI * 2,
          i = Math.sin(n),
          a = Math.cos(n);
        M.x = -b * a, M.y = g, M.z = b * i, s.push(M.x, M.y, M.z), m.set(-b * a, y, b * i), m.normalize(), o.push(m.x, m.y, m.z), c.push(t + v, L);
      }
      if (_ > 0) {
        const e = (_ - 1) * f;
        for (let t = 0; t < r; t++) {
          const n = e + t,
            r = e + t + 1,
            i = _ * f + t,
            s = _ * f + t + 1;
          a.push(n, r, i), a.push(r, s, i);
        }
      }
    }
    this.setIndex(a), this.setAttribute("position", new Float32BufferAttribute(s, 3)), this.setAttribute("normal", new Float32BufferAttribute(o, 3)), this.setAttribute("uv", new Float32BufferAttribute(c, 2));
  }
  copy(source) {
    return super.copy(source), this.parameters = Object.assign({}, source.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {CapsuleGeometry} A new instance.
   */
  static fromJSON(data) {
    return new CapsuleGeometry(data.radius, data.height, data.capSegments, data.radialSegments, data.heightSegments);
  }
}
/**
 * A simple shape of Euclidean geometry. It is constructed from a
 * number of triangular segments that are oriented around a central point and
 * extend as far out as a given radius. It is built counter-clockwise from a
 * start angle and a given central angle. It can also be used to create
 * regular polygons, where the number of segments determines the number of
 * sides.
 *
 * ```js
 * const geometry = new THREE.CircleGeometry( 5, 32 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const circle = new THREE.Mesh( geometry, material );
 * scene.add( circle )
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#CircleGeometry
 */
class CircleGeometry extends BufferGeometry {
  constructor(radius = 1, segments = 32, thetaStart = 0, thetaLength = 2 * Math.PI) {
    super(), this.type = "CircleGeometry", this.parameters = {
      radius: radius,
      segments: segments,
      thetaStart: thetaStart,
      thetaLength: thetaLength
    }, segments = Math.max(3, segments);
    const indices = [],
      vertices = [],
      normals = [],
      uvs = [],
      vertex = new Vector3(),
      uv = new Vector2();
    vertices.push(0, 0, 0), normals.push(0, 0, 1), uvs.push(.5, .5);
    for (let s = 0, i = 3; s <= segments; s++, i += 3) {
      const segment = thetaStart + s / segments * thetaLength;
      vertex.x = radius * Math.cos(segment), vertex.y = radius * Math.sin(segment), vertices.push(vertex.x, vertex.y, vertex.z), normals.push(0, 0, 1), uv.x = (vertices[i] / radius + 1) / 2, uv.y = (vertices[i + 1] / radius + 1) / 2, uvs.push(uv.x, uv.y);
    }
    for (let i = 1; i <= segments; i++) indices.push(i, i + 1, 0);
    this.setIndex(indices), this.setAttribute("position", new Float32BufferAttribute(vertices, 3)), this.setAttribute("normal", new Float32BufferAttribute(normals, 3)), this.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  }
  copy(source) {
    return super.copy(source), this.parameters = Object.assign({}, source.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {CircleGeometry} A new instance.
   */
  static fromJSON(data) {
    return new CircleGeometry(data.radius, data.segments, data.thetaStart, data.thetaLength);
  }
}
/**
 * A geometry class for representing a cylinder.
 *
 * ```js
 * const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const cylinder = new THREE.Mesh( geometry, material );
 * scene.add( cylinder );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#CylinderGeometry
 */
class CylinderGeometry extends BufferGeometry {
  /* 输入上下半径、高度、周向/高度段、openEnded、角起点和范围；段数 floor。侧壁半径线性变化，法线 (sinθ,(bottom-top)/height,cosθ) 归一化，锥尖跳过退化一半三角形。groups 材质索引侧0、顶1、底2；写 index 与三个浮点属性。 */
  constructor(e = 1, t = 1, n = 1, r = 32, i = 1, a = !1, s = 0, o = 2 * Math.PI) {
    super(), this.type = "CylinderGeometry", this.parameters = {
      radiusTop: e,
      radiusBottom: t,
      height: n,
      radialSegments: r,
      heightSegments: i,
      openEnded: a,
      thetaStart: s,
      thetaLength: o
    };
    const c = this;
    r = Math.floor(r), i = Math.floor(i);
    const l = [],
      u = [],
      d = [],
      h = [];
    let p = 0;
    const f = [],
      m = n / 2;
    let M = 0;
    function _(n) {
      const i = p,
        a = new Vector2(),
        f = new Vector3();
      let _ = 0;
      const A = !0 === n ? e : t,
        g = !0 === n ? 1 : -1;
      for (let e = 1; e <= r; e++) u.push(0, m * g, 0), d.push(0, g, 0), h.push(.5, .5), p++;
      const b = p;
      for (let e = 0; e <= r; e++) {
        const t = e / r * o + s,
          n = Math.cos(t),
          i = Math.sin(t);
        f.x = A * i, f.y = m * g, f.z = A * n, u.push(f.x, f.y, f.z), d.push(0, g, 0), a.x = .5 * n + .5, a.y = .5 * i * g + .5, h.push(a.x, a.y), p++;
      }
      for (let e = 0; e < r; e++) {
        const t = i + e,
          r = b + e;
        !0 === n ? l.push(r, r + 1, t) : l.push(r + 1, r, t), _ += 3;
      }
      c.addGroup(M, _, !0 === n ? 1 : 2), M += _;
    }
    !function () {
      const a = new Vector3(),
        _ = new Vector3();
      let A = 0;
      const g = (t - e) / n;
      for (let c = 0; c <= i; c++) {
        const l = [],
          M = c / i,
          A = M * (t - e) + e;
        for (let e = 0; e <= r; e++) {
          const t = e / r,
            i = t * o + s,
            c = Math.sin(i),
            f = Math.cos(i);
          _.x = A * c, _.y = -M * n + m, _.z = A * f, u.push(_.x, _.y, _.z), a.set(c, g, f).normalize(), d.push(a.x, a.y, a.z), h.push(t, 1 - M), l.push(p++);
        }
        f.push(l);
      }
      for (let n = 0; n < r; n++) for (let r = 0; r < i; r++) {
        const a = f[r][n],
          s = f[r + 1][n],
          o = f[r + 1][n + 1],
          c = f[r][n + 1];
        (e > 0 || 0 !== r) && (l.push(a, s, c), A += 3), (t > 0 || r !== i - 1) && (l.push(s, o, c), A += 3);
      }
      c.addGroup(M, A, 0), M += A;
    }(), !1 === a && (e > 0 && _(!0), t > 0 && _(!1)), this.setIndex(l), this.setAttribute("position", new Float32BufferAttribute(u, 3)), this.setAttribute("normal", new Float32BufferAttribute(d, 3)), this.setAttribute("uv", new Float32BufferAttribute(h, 2));
  }
  copy(source) {
    return super.copy(source), this.parameters = Object.assign({}, source.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {CylinderGeometry} A new instance.
   */
  static fromJSON(data) {
    return new CylinderGeometry(data.radiusTop, data.radiusBottom, data.height, data.radialSegments, data.heightSegments, data.openEnded, data.thetaStart, data.thetaLength);
  }
}
/**
 * A geometry class for representing a cone.
 *
 * ```js
 * const geometry = new THREE.ConeGeometry( 5, 20, 32 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const cone = new THREE.Mesh(geometry, material );
 * scene.add( cone );
 * ```
 *
 * @augments CylinderGeometry
 * @demo scenes/geometry-browser.html#ConeGeometry
 */
class ConeGeometry extends CylinderGeometry {
  constructor(radius = 1, height = 1, radialSegments = 32, heightSegments = 1, openEnded = !1, thetaStart = 0, thetaLength = 2 * Math.PI) {
    super(0, radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength), this.type = "ConeGeometry", this.parameters = {
      radius: radius,
      height: height,
      radialSegments: radialSegments,
      heightSegments: heightSegments,
      openEnded: openEnded,
      thetaStart: thetaStart,
      thetaLength: thetaLength
    };
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {ConeGeometry} A new instance.
   */
  static fromJSON(data) {
    return new ConeGeometry(data.radius, data.height, data.radialSegments, data.heightSegments, data.openEnded, data.thetaStart, data.thetaLength);
  }
}
/**
 * A polyhedron is a solid in three dimensions with flat faces. This class
 * will take an array of vertices, project them onto a sphere, and then
 * divide them up to the desired level of detail.
 *
 * @augments BufferGeometry
 */
class PolyhedronGeometry extends BufferGeometry {
  /* 输入 xyz 平铺顶点、三角索引、radius、detail。每面分成 detail+1 列三角网，展开为非索引三角形，归一化投到半径球面；用 atan2 方位/倾角给 UV，再修极点方位与跨 seam 的 u+1。生成自有 position/normal/uv；保留参数引用但不直接改原输入数组。 */
  constructor(e = [], t = [], n = 1, r = 0) {
    super(), this.type = "PolyhedronGeometry", this.parameters = {
      vertices: e,
      indices: t,
      radius: n,
      detail: r
    };
    const i = [],
      a = [];
    function s(e, t, n, r) {
      const i = r + 1,
        a = [];
      for (let r = 0; r <= i; r++) {
        a[r] = [];
        const s = e.clone().lerp(n, r / i),
          o = t.clone().lerp(n, r / i),
          c = i - r;
        for (let e = 0; e <= c; e++) a[r][e] = 0 === e && r === i ? s : s.clone().lerp(o, e / c);
      }
      for (let e = 0; e < i; e++) for (let t = 0; t < 2 * (i - e) - 1; t++) {
        const n = Math.floor(t / 2);
        t % 2 == 0 ? (o(a[e][n + 1]), o(a[e + 1][n]), o(a[e][n])) : (o(a[e][n + 1]), o(a[e + 1][n + 1]), o(a[e + 1][n]));
      }
    }
    function o(e) {
      i.push(e.x, e.y, e.z);
    }
    function c(t, n) {
      const r = 3 * t;
      n.x = e[r + 0], n.y = e[r + 1], n.z = e[r + 2];
    }
    function l(e, t, n, r) {
      r < 0 && 1 === e.x && (a[t] = e.x - 1), 0 === n.x && 0 === n.z && (a[t] = r / 2 / Math.PI + .5);
    }
    function u(e) {
      return Math.atan2(e.z, -e.x);
    }
    function d(e) {
      return Math.atan2(-e.y, Math.sqrt(e.x * e.x + e.z * e.z));
    }
    !function (e) {
      const n = new Vector3(),
        r = new Vector3(),
        i = new Vector3();
      for (let a = 0; a < t.length; a += 3) c(t[a + 0], n), c(t[a + 1], r), c(t[a + 2], i), s(n, r, i, e);
    }(r), function (e) {
      const t = new Vector3();
      for (let n = 0; n < i.length; n += 3) t.x = i[n + 0], t.y = i[n + 1], t.z = i[n + 2], t.normalize().multiplyScalar(e), i[n + 0] = t.x, i[n + 1] = t.y, i[n + 2] = t.z;
    }(n), function () {
      const e = new Vector3();
      for (let t = 0; t < i.length; t += 3) {
        e.x = i[t + 0], e.y = i[t + 1], e.z = i[t + 2];
        const n = u(e) / 2 / Math.PI + .5,
          r = d(e) / Math.PI + .5;
        a.push(n, 1 - r);
      }
      (function () {
        const e = new Vector3(),
          t = new Vector3(),
          n = new Vector3(),
          r = new Vector3(),
          s = new Vector2(),
          o = new Vector2(),
          c = new Vector2();
        for (let d = 0, h = 0; d < i.length; d += 9, h += 6) {
          e.set(i[d + 0], i[d + 1], i[d + 2]), t.set(i[d + 3], i[d + 4], i[d + 5]), n.set(i[d + 6], i[d + 7], i[d + 8]), s.set(a[h + 0], a[h + 1]), o.set(a[h + 2], a[h + 3]), c.set(a[h + 4], a[h + 5]), r.copy(e).add(t).add(n).divideScalar(3);
          const p = u(r);
          l(s, h + 0, e, p), l(o, h + 2, t, p), l(c, h + 4, n, p);
        }
      })(), function () {
        for (let e = 0; e < a.length; e += 6) {
          const t = a[e + 0],
            n = a[e + 2],
            r = a[e + 4],
            i = Math.max(t, n, r),
            s = Math.min(t, n, r);
          i > .9 && s < .1 && (t < .2 && (a[e + 0] += 1), n < .2 && (a[e + 2] += 1), r < .2 && (a[e + 4] += 1));
        }
      }();
    }(), this.setAttribute("position", new Float32BufferAttribute(i, 3)), this.setAttribute("normal", new Float32BufferAttribute(i.slice(), 3)), this.setAttribute("uv", new Float32BufferAttribute(a, 2)), 0 === r ? this.computeVertexNormals() : this.normalizeNormals();
  }
  copy(source) {
    return super.copy(source), this.parameters = Object.assign({}, source.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {PolyhedronGeometry} A new instance.
   */
  static fromJSON(data) {
    return new PolyhedronGeometry(data.vertices, data.indices, data.radius, data.detail);
  }
}
/**
 * A geometry class for representing a dodecahedron.
 *
 * ```js
 * const geometry = new THREE.DodecahedronGeometry();
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const dodecahedron = new THREE.Mesh( geometry, material );
 * scene.add( dodecahedron );
 * ```
 *
 * @augments PolyhedronGeometry
 * @demo scenes/geometry-browser.html#DodecahedronGeometry
 */
class DodecahedronGeometry extends PolyhedronGeometry {
  /* radius=1/detail=0，20 个种子顶点（立方角点及黄金比/倒数坐标），36 个三角形即十二个五边面三角化；传 PolyhedronGeometry 完成细分/投球/UV。重置 type 与仅含 radius/detail 的 parameters。与其他多面体仅共享父算法，种子拓扑不同，不能折为同一个“几何体构造器”。 */
  constructor(e = 1, t = 0) {
    const n = (1 + Math.sqrt(5)) / 2,
      r = 1 / n;
    super([-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -r, -n, 0, -r, n, 0, r, -n, 0, r, n, -r, -n, 0, -r, n, 0, r, -n, 0, r, n, 0, -n, 0, -r, n, 0, -r, -n, 0, r, n, 0, r], [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9], e, t), this.type = "DodecahedronGeometry", this.parameters = {
      radius: e,
      detail: t
    };
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {DodecahedronGeometry} A new instance.
   */
  static fromJSON(data) {
    return new DodecahedronGeometry(data.radius, data.detail);
  }
}
const Qs = new Vector3(),
  Ks = new Vector3(),
  Js = new Vector3(),
  triangle = new Triangle();
/**
 * Can be used as a helper object to view the edges of a geometry.
 *
 * ```js
 * const geometry = new THREE.BoxGeometry();
 * const edges = new THREE.EdgesGeometry( geometry );
 * const line = new THREE.LineSegments( edges );
 * scene.add( line );
 * ```
 *
 * Note: It is not yet possible to serialize/deserialize instances of this class.
 *
 * @augments BufferGeometry
 */
class EdgesGeometry extends BufferGeometry {
  /* 输入 geometry 可空与角阈值（度，默认1）。逐三角形将位置四舍五入到 1e-4 作 hash，退化三角形跳过；建立有向边表，遇反向边时比较面法线点积<=cos阈值才输出，随后标该边已消费。结果只有非索引 position 线段；与 Wireframe 的所有唯一边不同，焊接精度是固定的。 */
  constructor(e = null, t = 1) {
    if (super(), this.type = "EdgesGeometry", this.parameters = {
      geometry: e,
      thresholdAngle: t
    }, null !== e) {
      const n = 4,
        r = Math.pow(10, n),
        i = Math.cos(gr * t),
        a = e.getIndex(),
        s = e.getAttribute("position"),
        o = a ? a.count : s.count,
        c = [0, 0, 0],
        l = ["a", "b", "c"],
        array = new Array(3),
        d = {},
        h = [];
      for (let e = 0; e < o; e += 3) {
        a ? (c[0] = a.getX(e), c[1] = a.getX(e + 1), c[2] = a.getX(e + 2)) : (c[0] = e, c[1] = e + 1, c[2] = e + 2);
        const {
          a: t,
          b: n,
          c: o
        } = triangle;
        if (t.fromBufferAttribute(s, c[0]), n.fromBufferAttribute(s, c[1]), o.fromBufferAttribute(s, c[2]), triangle.getNormal(Js), array[0] = `${Math.round(t.x * r)},${Math.round(t.y * r)},${Math.round(t.z * r)}`, array[1] = `${Math.round(n.x * r)},${Math.round(n.y * r)},${Math.round(n.z * r)}`, array[2] = `${Math.round(o.x * r)},${Math.round(o.y * r)},${Math.round(o.z * r)}`, array[0] !== array[1] && array[1] !== array[2] && array[2] !== array[0]) for (let e = 0; e < 3; e++) {
          const t = (e + 1) % 3,
            n = array[e],
            r = array[t],
            a = triangle[l[e]],
            s = triangle[l[t]],
            o = `${n}_${r}`,
            p = `${r}_${n}`;
          p in d && d[p] ? (Js.dot(d[p].normal) <= i && (h.push(a.x, a.y, a.z), h.push(s.x, s.y, s.z)), d[p] = null) : o in d || (d[o] = {
            index0: c[e],
            index1: c[t],
            normal: Js.clone()
          });
        }
      }
      for (const e in d) if (d[e]) {
        const {
          index0: index0,
          index1: index1
        } = d[e];
        Qs.fromBufferAttribute(s, index0), Ks.fromBufferAttribute(s, index1), h.push(Qs.x, Qs.y, Qs.z), h.push(Ks.x, Ks.y, Ks.z);
      }
      this.setAttribute("position", new Float32BufferAttribute(h, 3));
    }
  }
  copy(source) {
    return super.copy(source), this.parameters = Object.assign({}, source.parameters), this;
  }
}
/**
 * An abstract base class for creating an analytic curve object that contains methods
 * for interpolation.
 *
 * @abstract
 */
class Curve {
  constructor() {
    this.type = "Curve", this.arcLengthDivisions = 200, this.needsUpdate = !1, this.cacheArcLengths = null;
  }
  getPoint() {
    warn("Curve: .getPoint() not implemented.");
  }
  /**
   * This method returns a vector in 2D or 3D space (depending on the curve definition)
   * for the given interpolation factor. Unlike {@link Curve#getPoint}, this method honors the length
   * of the curve which equidistant samples.
   *
   * @param {number} u - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
   * @param {(Vector2|Vector3)} [optionalTarget] - The optional target vector the result is written to.
   * @return {(Vector2|Vector3)} The position on the curve. It can be a 2D or 3D vector depending on the curve definition.
   */
  getPointAt(u, optionalTarget) {
    const t = this.getUtoTmapping(u);
    return this.getPoint(t, optionalTarget);
  }
  getPoints(divisions = 5) {
    const points = [];
    for (let d = 0; d <= divisions; d++) points.push(this.getPoint(d / divisions));
    return points;
  }
  getSpacedPoints(divisions = 5) {
    const points = [];
    for (let d = 0; d <= divisions; d++) points.push(this.getPointAt(d / divisions));
    return points;
  }
  /**
   * Returns the total arc length of the curve.
   *
   * @return {number} The length of the curve.
   */
  getLength() {
    const lengths = this.getLengths();
    return lengths[lengths.length - 1];
  }
  /**
   * Returns an array of cumulative segment lengths of the curve.
   *
   * @param {number} [divisions=this.arcLengthDivisions] - The number of divisions.
   * @return {Array<number>} An array holding the cumulative segment lengths.
   */
  getLengths(divisions = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === divisions + 1 && !this.needsUpdate) return this.cacheArcLengths;
    this.needsUpdate = !1;
    const cache = [];
    let current,
      last = this.getPoint(0),
      sum = 0;
    cache.push(0);
    for (let p = 1; p <= divisions; p++) current = this.getPoint(p / divisions), sum += current.distanceTo(last), cache.push(sum), last = current;
    return this.cacheArcLengths = cache, cache;
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.getLengths();
  }
  /* 从缓存/生成的弧长表 getLengths 读取累计距离；distance 为真值时用它，否则 u*总长（distance=0 走 u 分支）。二分找精确项或前一项，再在两个累计值间线性插值得参数 t。返回标量，不改 curve 控制点；没有 clamp 超出范围输入，对零长表区间除法不另作保护。 */
  getUtoTmapping(e, t = null) {
    const n = this.getLengths();
    let r = 0;
    const i = n.length;
    let a;
    a = t || e * n[i - 1];
    let s,
      o = 0,
      c = i - 1;
    for (; o <= c;) if (r = Math.floor(o + (c - o) / 2), s = n[r] - a, s < 0) o = r + 1;else {
      if (!(s > 0)) {
        c = r;
        break;
      }
      c = r - 1;
    }
    if (r = c, n[r] === a) return r / (i - 1);
    const l = n[r];
    return (r + (a - l) / (n[r + 1] - l)) / (i - 1);
  }
  getTangent(t, optionalTarget) {
    const delta = 1e-4;
    let t1 = t - delta,
      t2 = t + delta;
    t1 < 0 && (t1 = 0), t2 > 1 && (t2 = 1);
    const pt1 = this.getPoint(t1),
      pt2 = this.getPoint(t2),
      tangent = optionalTarget || (pt1.isVector2 ? new Vector2() : new Vector3());
    return tangent.copy(pt2).sub(pt1).normalize(), tangent;
  }
  /**
   * Same as {@link Curve#getTangent} but with equidistant samples.
   *
   * @param {number} u - The interpolation factor.
   * @param {(Vector2|Vector3)} [optionalTarget] - The optional target vector the result is written to.
   * @return {(Vector2|Vector3)} The tangent vector.
   * @see {@link Curve#getPointAt}
   */
  getTangentAt(u, optionalTarget) {
    const t = this.getUtoTmapping(u);
    return this.getTangent(t, optionalTarget);
  }
  computeFrenetFrames(segments, closed = !1) {
    const normal = new Vector3(),
      tangents = [],
      normals = [],
      binormals = [],
      vec = new Vector3(),
      mat = new Matrix4();
    for (let i = 0; i <= segments; i++) {
      const u = i / segments;
      tangents[i] = this.getTangentAt(u, new Vector3());
    }
    normals[0] = new Vector3(), binormals[0] = new Vector3();
    let min = Number.MAX_VALUE;
    const tx = Math.abs(tangents[0].x),
      ty = Math.abs(tangents[0].y),
      tz = Math.abs(tangents[0].z);
    tx <= min && (min = tx, normal.set(1, 0, 0)), ty <= min && (min = ty, normal.set(0, 1, 0)), tz <= min && normal.set(0, 0, 1), vec.crossVectors(tangents[0], normal).normalize(), normals[0].crossVectors(tangents[0], vec), binormals[0].crossVectors(tangents[0], normals[0]);
    for (let i = 1; i <= segments; i++) {
      if (normals[i] = normals[i - 1].clone(), binormals[i] = binormals[i - 1].clone(), vec.crossVectors(tangents[i - 1], tangents[i]), vec.length() > Number.EPSILON) {
        vec.normalize();
        const theta = Math.acos(clamp(tangents[i - 1].dot(tangents[i]), -1, 1));
        normals[i].applyMatrix4(mat.makeRotationAxis(vec, theta));
      }
      binormals[i].crossVectors(tangents[i], normals[i]);
    }
    if (!0 === closed) {
      let theta = Math.acos(clamp(normals[0].dot(normals[segments]), -1, 1));
      theta /= segments, tangents[0].dot(vec.crossVectors(normals[0], normals[segments])) > 0 && (theta = -theta);
      for (let i = 1; i <= segments; i++) normals[i].applyMatrix4(mat.makeRotationAxis(tangents[i], theta * i)), binormals[i].crossVectors(tangents[i], normals[i]);
    }
    return {
      tangents: tangents,
      normals: normals,
      binormals: binormals
    };
  }
  /**
   * Returns a new curve with copied values from this instance.
   *
   * @return {Curve} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given curve to this instance.
   *
   * @param {Curve} source - The curve to copy.
   * @return {Curve} A reference to this curve.
   */
  copy(source) {
    return this.arcLengthDivisions = source.arcLengthDivisions, this;
  }
  toJSON() {
    const data = {
      metadata: {
        version: 4.7,
        type: "Curve",
        generator: "Curve.toJSON"
      }
    };
    return data.arcLengthDivisions = this.arcLengthDivisions, data.type = this.type, data;
  }
  /**
   * Deserializes the curve from the given JSON.
   *
   * @param {Object} json - The JSON holding the serialized curve.
   * @return {Curve} A reference to this curve.
   */
  fromJSON(json) {
    return this.arcLengthDivisions = json.arcLengthDivisions, this;
  }
}
/**
 * A curve representing an ellipse.
 *
 * ```js
 * const curve = new THREE.EllipseCurve(
 * 	0, 0,
 * 	10, 10,
 * 	0, 2 * Math.PI,
 * 	false,
 * 	0
 * );
 *
 * const points = curve.getPoints( 50 );
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 *
 * const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
 *
 * // Create the final object to add to the scene
 * const ellipse = new THREE.Line( geometry, material );
 * ```
 *
 * @augments Curve
 */
class EllipseCurve extends Curve {
  constructor(aX = 0, aY = 0, xRadius = 1, yRadius = 1, aStartAngle = 0, aEndAngle = 2 * Math.PI, aClockwise = !1, aRotation = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = aX, this.aY = aY, this.xRadius = xRadius, this.yRadius = yRadius, this.aStartAngle = aStartAngle, this.aEndAngle = aEndAngle, this.aClockwise = aClockwise, this.aRotation = aRotation;
  }
  /* 输入 t 与可复用 Vector2 target。将 end-start 角差按 2π 规整，EPSILON 区分零角与整圈；clockwise 反转角差，按椭圆半径求坐标，再绕 (aX,aY) 用 aRotation 旋转。覆盖 target 并返回；不限制 t 到 [0,1]。 */
  getPoint(e, t = new Vector2()) {
    const n = t,
      r = 2 * Math.PI;
    let i = this.aEndAngle - this.aStartAngle;
    const a = Math.abs(i) < Number.EPSILON;
    for (; i < 0;) i += r;
    for (; i > r;) i -= r;
    i < Number.EPSILON && (i = a ? 0 : r), !0 !== this.aClockwise || a || (i === r ? i = -r : i -= r);
    const s = this.aStartAngle + e * i;
    let o = this.aX + this.xRadius * Math.cos(s),
      c = this.aY + this.yRadius * Math.sin(s);
    if (0 !== this.aRotation) {
      const e = Math.cos(this.aRotation),
        t = Math.sin(this.aRotation),
        n = o - this.aX,
        r = c - this.aY;
      o = n * e - r * t + this.aX, c = n * t + r * e + this.aY;
    }
    return n.set(o, c);
  }
  copy(source) {
    return super.copy(source), this.aX = source.aX, this.aY = source.aY, this.xRadius = source.xRadius, this.yRadius = source.yRadius, this.aStartAngle = source.aStartAngle, this.aEndAngle = source.aEndAngle, this.aClockwise = source.aClockwise, this.aRotation = source.aRotation, this;
  }
  toJSON() {
    const data = super.toJSON();
    return data.aX = this.aX, data.aY = this.aY, data.xRadius = this.xRadius, data.yRadius = this.yRadius, data.aStartAngle = this.aStartAngle, data.aEndAngle = this.aEndAngle, data.aClockwise = this.aClockwise, data.aRotation = this.aRotation, data;
  }
  fromJSON(json) {
    return super.fromJSON(json), this.aX = json.aX, this.aY = json.aY, this.xRadius = json.xRadius, this.yRadius = json.yRadius, this.aStartAngle = json.aStartAngle, this.aEndAngle = json.aEndAngle, this.aClockwise = json.aClockwise, this.aRotation = json.aRotation, this;
  }
}
class ArcCurve extends EllipseCurve {
  constructor(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
    super(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise), this.isArcCurve = !0, this.type = "ArcCurve";
  }
}
/* 人工身份合同：initCatmullRom/initNonuniformCatmullRom/calc 四系数多项式工厂。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function CubicPoly() {
  let e = 0,
    t = 0,
    n = 0,
    r = 0;
  function i(i, a, s, o) {
    e = i, t = s, n = -3 * i + 3 * a - 2 * s - o, r = 2 * i - 2 * a + s + o;
  }
  return {
    initCatmullRom: function (e, t, n, r, a) {
      i(t, n, a * (n - e), a * (r - t));
    },
    initNonuniformCatmullRom: function (e, t, n, r, a, s, o) {
      let c = (t - e) / a - (n - e) / (a + s) + (n - t) / s,
        l = (n - t) / s - (r - t) / (s + o) + (r - n) / o;
      c *= s, l *= s, i(t, n, c, l);
    },
    calc: function (i) {
      const a = i * i;
      return e + t * i + n * a + r * (a * i);
    }
  };
}
const eo = new Vector3(),
  to = new Vector3(),
  no = new CubicPoly(),
  ro = new CubicPoly(),
  io = new CubicPoly();
/**
 * A curve representing a Catmull-Rom spline.
 *
 * ```js
 * //Create a closed wavey loop
 * const curve = new THREE.CatmullRomCurve3( [
 * 	new THREE.Vector3( -10, 0, 10 ),
 * 	new THREE.Vector3( -5, 5, 5 ),
 * 	new THREE.Vector3( 0, 0, 0 ),
 * 	new THREE.Vector3( 5, -5, 5 ),
 * 	new THREE.Vector3( 10, 0, 10 )
 * ] );
 *
 * const points = curve.getPoints( 50 );
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 *
 * const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
 *
 * // Create the final object to add to the scene
 * const curveObject = new THREE.Line( geometry, material );
 * ```
 *
 * @augments Curve
 */
class CatmullRomCurve3 extends Curve {
  constructor(points = [], closed = !1, curveType = "centripetal", tension = .5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = points, this.closed = closed, this.curveType = curveType, this.tension = tension;
  }
  /* 由 t 得段索引与段内权重；closed 循环取点，开放曲线两端线性外推虚拟控制点，并特判 t=1 的最后段。centripetal/chordal 对距离平方分别用 1/4、1/2 次幂，dt<1e-4 做退化修复，再初始化 x/y/z 三个三次多项式；catmullrom 分支用 tension。求值写 target，复用模块多项式状态；不验证足够点数。 */
  getPoint(e, t = new Vector3()) {
    const n = t,
      points = this.points,
      i = points.length,
      a = (i - (this.closed ? 0 : 1)) * e;
    let s,
      o,
      c = Math.floor(a),
      l = a - c;
    this.closed ? c += c > 0 ? 0 : (Math.floor(Math.abs(c) / i) + 1) * i : 0 === l && c === i - 1 && (c = i - 2, l = 1), this.closed || c > 0 ? s = points[(c - 1) % i] : (to.subVectors(points[0], points[1]).add(points[0]), s = to);
    const u = points[c % i],
      d = points[(c + 1) % i];
    if (this.closed || c + 2 < i ? o = points[(c + 2) % i] : (eo.subVectors(points[i - 1], points[i - 2]).add(points[i - 1]), o = eo), "centripetal" === this.curveType || "chordal" === this.curveType) {
      const e = "chordal" === this.curveType ? .5 : .25;
      let t = Math.pow(s.distanceToSquared(u), e),
        n = Math.pow(u.distanceToSquared(d), e),
        r = Math.pow(d.distanceToSquared(o), e);
      n < 1e-4 && (n = 1), t < 1e-4 && (t = n), r < 1e-4 && (r = n), no.initNonuniformCatmullRom(s.x, u.x, d.x, o.x, t, n, r), ro.initNonuniformCatmullRom(s.y, u.y, d.y, o.y, t, n, r), io.initNonuniformCatmullRom(s.z, u.z, d.z, o.z, t, n, r);
    } else "catmullrom" === this.curveType && (no.initCatmullRom(s.x, u.x, d.x, o.x, this.tension), ro.initCatmullRom(s.y, u.y, d.y, o.y, this.tension), io.initCatmullRom(s.z, u.z, d.z, o.z, this.tension));
    return n.set(no.calc(l), ro.calc(l), io.calc(l)), n;
  }
  copy(source) {
    super.copy(source), this.points = [];
    for (let i = 0, l = source.points.length; i < l; i++) {
      const point = source.points[i];
      this.points.push(point.clone());
    }
    return this.closed = source.closed, this.curveType = source.curveType, this.tension = source.tension, this;
  }
  toJSON() {
    const data = super.toJSON();
    data.points = [];
    for (let i = 0, l = this.points.length; i < l; i++) {
      const point = this.points[i];
      data.points.push(point.toArray());
    }
    return data.closed = this.closed, data.curveType = this.curveType, data.tension = this.tension, data;
  }
  fromJSON(json) {
    super.fromJSON(json), this.points = [];
    for (let i = 0, l = json.points.length; i < l; i++) {
      const point = json.points[i];
      this.points.push(new Vector3().fromArray(point));
    }
    return this.closed = json.closed, this.curveType = json.curveType, this.tension = json.tension, this;
  }
}
/* 人工身份合同：四控制点 Catmull-Rom 的二次三次项公式及曲线调用。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function CatmullRom(e, t, n, r, i) {
  const a = .5 * (r - t),
    s = .5 * (i - n),
    o = e * e;
  return (2 * n - 2 * r + a + s) * (e * o) + (-3 * n + 3 * r - 2 * a - s) * o + a * e + n;
}
/* 人工身份合同：(1-t)^2 p0 + 2(1-t)t p1 + t^2 p2 公式及曲线调用。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function QuadraticBezier(e, t, n, r) {
  return function (e, t) {
    const n = 1 - e;
    return n * n * t;
  }(e, t) + function (e, t) {
    return 2 * (1 - e) * e * t;
  }(e, n) + function (e, t) {
    return e * e * t;
  }(e, r);
}
/* 人工身份合同：三次 Bernstein 四权重公式及曲线调用。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function CubicBezier(e, t, n, r, i) {
  return function (e, t) {
    const n = 1 - e;
    return n * n * n * t;
  }(e, t) + function (e, t) {
    const n = 1 - e;
    return 3 * n * n * e * t;
  }(e, n) + function (e, t) {
    return 3 * (1 - e) * e * e * t;
  }(e, r) + function (e, t) {
    return e * e * e * t;
  }(e, i);
}
/**
 * A curve representing a 2D Cubic Bezier curve.
 *
 * ```js
 * const curve = new THREE.CubicBezierCurve(
 * 	new THREE.Vector2( - 0, 0 ),
 * 	new THREE.Vector2( - 5, 15 ),
 * 	new THREE.Vector2( 20, 15 ),
 * 	new THREE.Vector2( 10, 0 )
 * );
 *
 * const points = curve.getPoints( 50 );
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 *
 * const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
 *
 * // Create the final object to add to the scene
 * const curveObject = new THREE.Line( geometry, material );
 * ```
 *
 * @augments Curve
 */
class CubicBezierCurve extends Curve {
  constructor(v0 = new Vector2(), v1 = new Vector2(), v2 = new Vector2(), v3 = new Vector2()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = v0, this.v1 = v1, this.v2 = v2, this.v3 = v3;
  }
  /**
   * Returns a point on the curve.
   *
   * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
   * @param {Vector2} [optionalTarget] - The optional target vector the result is written to.
   * @return {Vector2} The position on the curve.
   */
  getPoint(t, optionalTarget = new Vector2()) {
    const point = optionalTarget,
      v0 = this.v0,
      v1 = this.v1,
      v2 = this.v2,
      v3 = this.v3;
    return point.set(CubicBezier(t, v0.x, v1.x, v2.x, v3.x), CubicBezier(t, v0.y, v1.y, v2.y, v3.y)), point;
  }
  copy(source) {
    return super.copy(source), this.v0.copy(source.v0), this.v1.copy(source.v1), this.v2.copy(source.v2), this.v3.copy(source.v3), this;
  }
  toJSON() {
    const data = super.toJSON();
    return data.v0 = this.v0.toArray(), data.v1 = this.v1.toArray(), data.v2 = this.v2.toArray(), data.v3 = this.v3.toArray(), data;
  }
  fromJSON(json) {
    return super.fromJSON(json), this.v0.fromArray(json.v0), this.v1.fromArray(json.v1), this.v2.fromArray(json.v2), this.v3.fromArray(json.v3), this;
  }
}
/**
 * A curve representing a 3D Cubic Bezier curve.
 *
 * @augments Curve
 */
class CubicBezierCurve3 extends Curve {
  constructor(v0 = new Vector3(), v1 = new Vector3(), v2 = new Vector3(), v3 = new Vector3()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = v0, this.v1 = v1, this.v2 = v2, this.v3 = v3;
  }
  /**
   * Returns a point on the curve.
   *
   * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
   * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
   * @return {Vector3} The position on the curve.
   */
  getPoint(t, optionalTarget = new Vector3()) {
    const point = optionalTarget,
      v0 = this.v0,
      v1 = this.v1,
      v2 = this.v2,
      v3 = this.v3;
    return point.set(CubicBezier(t, v0.x, v1.x, v2.x, v3.x), CubicBezier(t, v0.y, v1.y, v2.y, v3.y), CubicBezier(t, v0.z, v1.z, v2.z, v3.z)), point;
  }
  copy(source) {
    return super.copy(source), this.v0.copy(source.v0), this.v1.copy(source.v1), this.v2.copy(source.v2), this.v3.copy(source.v3), this;
  }
  toJSON() {
    const data = super.toJSON();
    return data.v0 = this.v0.toArray(), data.v1 = this.v1.toArray(), data.v2 = this.v2.toArray(), data.v3 = this.v3.toArray(), data;
  }
  fromJSON(json) {
    return super.fromJSON(json), this.v0.fromArray(json.v0), this.v1.fromArray(json.v1), this.v2.fromArray(json.v2), this.v3.fromArray(json.v3), this;
  }
}
/**
 * A curve representing a 2D line segment.
 *
 * @augments Curve
 */
class LineCurve extends Curve {
  constructor(v1 = new Vector2(), v2 = new Vector2()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = v1, this.v2 = v2;
  }
  getPoint(t, optionalTarget = new Vector2()) {
    const point = optionalTarget;
    return 1 === t ? point.copy(this.v2) : (point.copy(this.v2).sub(this.v1), point.multiplyScalar(t).add(this.v1)), point;
  }
  getPointAt(u, optionalTarget) {
    return this.getPoint(u, optionalTarget);
  }
  getTangent(t, optionalTarget = new Vector2()) {
    return optionalTarget.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(u, optionalTarget) {
    return this.getTangent(u, optionalTarget);
  }
  copy(source) {
    return super.copy(source), this.v1.copy(source.v1), this.v2.copy(source.v2), this;
  }
  toJSON() {
    const data = super.toJSON();
    return data.v1 = this.v1.toArray(), data.v2 = this.v2.toArray(), data;
  }
  fromJSON(json) {
    return super.fromJSON(json), this.v1.fromArray(json.v1), this.v2.fromArray(json.v2), this;
  }
}
/**
 * A curve representing a 3D line segment.
 *
 * @augments Curve
 */
class LineCurve3 extends Curve {
  constructor(v1 = new Vector3(), v2 = new Vector3()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = v1, this.v2 = v2;
  }
  getPoint(t, optionalTarget = new Vector3()) {
    const point = optionalTarget;
    return 1 === t ? point.copy(this.v2) : (point.copy(this.v2).sub(this.v1), point.multiplyScalar(t).add(this.v1)), point;
  }
  getPointAt(u, optionalTarget) {
    return this.getPoint(u, optionalTarget);
  }
  getTangent(t, optionalTarget = new Vector3()) {
    return optionalTarget.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(u, optionalTarget) {
    return this.getTangent(u, optionalTarget);
  }
  copy(source) {
    return super.copy(source), this.v1.copy(source.v1), this.v2.copy(source.v2), this;
  }
  toJSON() {
    const data = super.toJSON();
    return data.v1 = this.v1.toArray(), data.v2 = this.v2.toArray(), data;
  }
  fromJSON(json) {
    return super.fromJSON(json), this.v1.fromArray(json.v1), this.v2.fromArray(json.v2), this;
  }
}
/**
 * A curve representing a 2D Quadratic Bezier curve.
 *
 * ```js
 * const curve = new THREE.QuadraticBezierCurve(
 * 	new THREE.Vector2( - 10, 0 ),
 * 	new THREE.Vector2( 20, 15 ),
 * 	new THREE.Vector2( 10, 0 )
 * )
 *
 * const points = curve.getPoints( 50 );
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 *
 * const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
 *
 * // Create the final object to add to the scene
 * const curveObject = new THREE.Line( geometry, material );
 * ```
 *
 * @augments Curve
 */
class QuadraticBezierCurve extends Curve {
  constructor(v0 = new Vector2(), v1 = new Vector2(), v2 = new Vector2()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = v0, this.v1 = v1, this.v2 = v2;
  }
  /**
   * Returns a point on the curve.
   *
   * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
   * @param {Vector2} [optionalTarget] - The optional target vector the result is written to.
   * @return {Vector2} The position on the curve.
   */
  getPoint(t, optionalTarget = new Vector2()) {
    const point = optionalTarget,
      v0 = this.v0,
      v1 = this.v1,
      v2 = this.v2;
    return point.set(QuadraticBezier(t, v0.x, v1.x, v2.x), QuadraticBezier(t, v0.y, v1.y, v2.y)), point;
  }
  copy(source) {
    return super.copy(source), this.v0.copy(source.v0), this.v1.copy(source.v1), this.v2.copy(source.v2), this;
  }
  toJSON() {
    const data = super.toJSON();
    return data.v0 = this.v0.toArray(), data.v1 = this.v1.toArray(), data.v2 = this.v2.toArray(), data;
  }
  fromJSON(json) {
    return super.fromJSON(json), this.v0.fromArray(json.v0), this.v1.fromArray(json.v1), this.v2.fromArray(json.v2), this;
  }
}
/**
 * A curve representing a 3D Quadratic Bezier curve.
 *
 * @augments Curve
 */
class QuadraticBezierCurve3 extends Curve {
  constructor(v0 = new Vector3(), v1 = new Vector3(), v2 = new Vector3()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = v0, this.v1 = v1, this.v2 = v2;
  }
  /**
   * Returns a point on the curve.
   *
   * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
   * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
   * @return {Vector3} The position on the curve.
   */
  getPoint(t, optionalTarget = new Vector3()) {
    const point = optionalTarget,
      v0 = this.v0,
      v1 = this.v1,
      v2 = this.v2;
    return point.set(QuadraticBezier(t, v0.x, v1.x, v2.x), QuadraticBezier(t, v0.y, v1.y, v2.y), QuadraticBezier(t, v0.z, v1.z, v2.z)), point;
  }
  copy(source) {
    return super.copy(source), this.v0.copy(source.v0), this.v1.copy(source.v1), this.v2.copy(source.v2), this;
  }
  toJSON() {
    const data = super.toJSON();
    return data.v0 = this.v0.toArray(), data.v1 = this.v1.toArray(), data.v2 = this.v2.toArray(), data;
  }
  fromJSON(json) {
    return super.fromJSON(json), this.v0.fromArray(json.v0), this.v1.fromArray(json.v1), this.v2.fromArray(json.v2), this;
  }
}
/**
 * A curve representing a 2D spline curve.
 *
 * ```js
 * // Create a sine-like wave
 * const curve = new THREE.SplineCurve( [
 * 	new THREE.Vector2( -10, 0 ),
 * 	new THREE.Vector2( -5, 5 ),
 * 	new THREE.Vector2( 0, 0 ),
 * 	new THREE.Vector2( 5, -5 ),
 * 	new THREE.Vector2( 10, 0 )
 * ] );
 *
 * const points = curve.getPoints( 50 );
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 *
 * const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
 *
 * // Create the final object to add to the scene
 * const splineObject = new THREE.Line( geometry, material );
 * ```
 *
 * @augments Curve
 */
class SplineCurve extends Curve {
  constructor(points = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = points;
  }
  getPoint(t, optionalTarget = new Vector2()) {
    const point = optionalTarget,
      points = this.points,
      p = (points.length - 1) * t,
      intPoint = Math.floor(p),
      weight = p - intPoint,
      p0 = points[0 === intPoint ? intPoint : intPoint - 1],
      p1 = points[intPoint],
      p2 = points[intPoint > points.length - 2 ? points.length - 1 : intPoint + 1],
      p3 = points[intPoint > points.length - 3 ? points.length - 1 : intPoint + 2];
    return point.set(CatmullRom(weight, p0.x, p1.x, p2.x, p3.x), CatmullRom(weight, p0.y, p1.y, p2.y, p3.y)), point;
  }
  copy(source) {
    super.copy(source), this.points = [];
    for (let i = 0, l = source.points.length; i < l; i++) {
      const point = source.points[i];
      this.points.push(point.clone());
    }
    return this;
  }
  toJSON() {
    const data = super.toJSON();
    data.points = [];
    for (let i = 0, l = this.points.length; i < l; i++) {
      const point = this.points[i];
      data.points.push(point.toArray());
    }
    return data;
  }
  fromJSON(json) {
    super.fromJSON(json), this.points = [];
    for (let i = 0, l = json.points.length; i < l; i++) {
      const point = json.points[i];
      this.points.push(new Vector2().fromArray(point));
    }
    return this;
  }
}
var Curves = Object.freeze({
  __proto__: null,
  ArcCurve: ArcCurve,
  CatmullRomCurve3: CatmullRomCurve3,
  CubicBezierCurve: CubicBezierCurve,
  CubicBezierCurve3: CubicBezierCurve3,
  EllipseCurve: EllipseCurve,
  LineCurve: LineCurve,
  LineCurve3: LineCurve3,
  QuadraticBezierCurve: QuadraticBezierCurve,
  QuadraticBezierCurve3: QuadraticBezierCurve3,
  SplineCurve: SplineCurve
});
/**
 * A base class extending {@link Curve}. `CurvePath` is simply an
 * array of connected curves, but retains the API of a curve.
 *
 * @augments Curve
 */
class CurvePath extends Curve {
  constructor() {
    super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1;
  }
  /**
   * Adds a curve to this curve path.
   *
   * @param {Curve} curve - The curve to add.
   */
  add(curve) {
    this.curves.push(curve);
  }
  closePath() {
    const startPoint = this.curves[0].getPoint(0),
      endPoint = this.curves[this.curves.length - 1].getPoint(1);
    if (!startPoint.equals(endPoint)) {
      const lineType = !0 === startPoint.isVector2 ? "LineCurve" : "LineCurve3";
      this.curves.push(new Curves[lineType](endPoint, startPoint));
    }
    return this;
  }
  /* 把 t*总长转成路径距离，顺序找到第一个累计子曲线长度>=距离的段；换算该段内弧长比例并调用 getPointAt，零长子段用0。传透 optionalTarget，超出所有子段返回 null；不是按曲线条数等分 t。 */
  getPoint(e, t) {
    const n = e * this.getLength(),
      r = this.getCurveLengths();
    let i = 0;
    for (; i < r.length;) {
      if (r[i] >= n) {
        const e = r[i] - n,
          a = this.curves[i],
          s = a.getLength(),
          o = 0 === s ? 0 : 1 - e / s;
        return a.getPointAt(o, t);
      }
      i++;
    }
    return null;
  }
  getLength() {
    const lens = this.getCurveLengths();
    return lens[lens.length - 1];
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths();
  }
  /**
   * Returns list of cumulative curve lengths of the defined curves.
   *
   * @return {Array<number>} The curve lengths.
   */
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
    const lengths = [];
    let sums = 0;
    for (let i = 0, l = this.curves.length; i < l; i++) sums += this.curves[i].getLength(), lengths.push(sums);
    return this.cacheLengths = lengths, lengths;
  }
  getSpacedPoints(divisions = 40) {
    const points = [];
    for (let i = 0; i <= divisions; i++) points.push(this.getPoint(i / divisions));
    return this.autoClose && points.push(points[0]), points;
  }
  getPoints(divisions = 12) {
    const points = [];
    let last;
    for (let i = 0, curves = this.curves; i < curves.length; i++) {
      const curve = curves[i],
        resolution = curve.isEllipseCurve ? 2 * divisions : curve.isLineCurve || curve.isLineCurve3 ? 1 : curve.isSplineCurve ? divisions * curve.points.length : divisions,
        pts = curve.getPoints(resolution);
      for (let j = 0; j < pts.length; j++) {
        const point = pts[j];
        last && last.equals(point) || (points.push(point), last = point);
      }
    }
    return this.autoClose && points.length > 1 && !points[points.length - 1].equals(points[0]) && points.push(points[0]), points;
  }
  copy(source) {
    super.copy(source), this.curves = [];
    for (let i = 0, l = source.curves.length; i < l; i++) {
      const curve = source.curves[i];
      this.curves.push(curve.clone());
    }
    return this.autoClose = source.autoClose, this;
  }
  toJSON() {
    const data = super.toJSON();
    data.autoClose = this.autoClose, data.curves = [];
    for (let i = 0, l = this.curves.length; i < l; i++) {
      const curve = this.curves[i];
      data.curves.push(curve.toJSON());
    }
    return data;
  }
  fromJSON(json) {
    super.fromJSON(json), this.autoClose = json.autoClose, this.curves = [];
    for (let i = 0, l = json.curves.length; i < l; i++) {
      const curve = json.curves[i];
      this.curves.push(new Curves[curve.type]().fromJSON(curve));
    }
    return this;
  }
}
/**
 * A 2D path representation. The class provides methods for creating paths
 * and contours of 2D shapes similar to the 2D Canvas API.
 *
 * ```js
 * const path = new THREE.Path();
 *
 * path.lineTo( 0, 0.8 );
 * path.quadraticCurveTo( 0, 1, 0.2, 1 );
 * path.lineTo( 1, 1 );
 *
 * const points = path.getPoints();
 *
 * const geometry = new THREE.BufferGeometry().setFromPoints( points );
 * const material = new THREE.LineBasicMaterial( { color: 0xffffff } );
 *
 * const line = new THREE.Line( geometry, material );
 * scene.add( line );
 * ```
 *
 * @augments CurvePath
 */
class Path extends CurvePath {
  constructor(points) {
    super(), this.type = "Path", this.currentPoint = new Vector2(), points && this.setFromPoints(points);
  }
  setFromPoints(points) {
    this.moveTo(points[0].x, points[0].y);
    for (let i = 1, l = points.length; i < l; i++) this.lineTo(points[i].x, points[i].y);
    return this;
  }
  /**
   * Moves {@link Path#currentPoint} to the given point.
   *
   * @param {number} x - The x coordinate.
   * @param {number} y - The y coordinate.
   * @return {Path} A reference to this path.
   */
  moveTo(x, y) {
    return this.currentPoint.set(x, y), this;
  }
  /**
   * Adds an instance of {@link LineCurve} to the path by connecting
   * the current point with the given one.
   *
   * @param {number} x - The x coordinate of the end point.
   * @param {number} y - The y coordinate of the end point.
   * @return {Path} A reference to this path.
   */
  lineTo(x, y) {
    const curve = new LineCurve(this.currentPoint.clone(), new Vector2(x, y));
    return this.curves.push(curve), this.currentPoint.set(x, y), this;
  }
  /**
   * Adds an instance of {@link QuadraticBezierCurve} to the path by connecting
   * the current point with the given one.
   *
   * @param {number} aCPx - The x coordinate of the control point.
   * @param {number} aCPy - The y coordinate of the control point.
   * @param {number} aX - The x coordinate of the end point.
   * @param {number} aY - The y coordinate of the end point.
   * @return {Path} A reference to this path.
   */
  quadraticCurveTo(aCPx, aCPy, aX, aY) {
    const curve = new QuadraticBezierCurve(this.currentPoint.clone(), new Vector2(aCPx, aCPy), new Vector2(aX, aY));
    return this.curves.push(curve), this.currentPoint.set(aX, aY), this;
  }
  /**
   * Adds an instance of {@link CubicBezierCurve} to the path by connecting
   * the current point with the given one.
   *
   * @param {number} aCP1x - The x coordinate of the first control point.
   * @param {number} aCP1y - The y coordinate of the first control point.
   * @param {number} aCP2x - The x coordinate of the second control point.
   * @param {number} aCP2y - The y coordinate of the second control point.
   * @param {number} aX - The x coordinate of the end point.
   * @param {number} aY - The y coordinate of the end point.
   * @return {Path} A reference to this path.
   */
  bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY) {
    const curve = new CubicBezierCurve(this.currentPoint.clone(), new Vector2(aCP1x, aCP1y), new Vector2(aCP2x, aCP2y), new Vector2(aX, aY));
    return this.curves.push(curve), this.currentPoint.set(aX, aY), this;
  }
  /**
   * Adds an instance of {@link SplineCurve} to the path by connecting
   * the current point with the given list of points.
   *
   * @param {Array<Vector2>} pts - An array of points in 2D space.
   * @return {Path} A reference to this path.
   */
  splineThru(pts) {
    const npts = [this.currentPoint.clone()].concat(pts),
      curve = new SplineCurve(npts);
    return this.curves.push(curve), this.currentPoint.copy(pts[pts.length - 1]), this;
  }
  /**
   * Adds an arc as an instance of {@link EllipseCurve} to the path, positioned relative
   * to the current point.
   *
   * @param {number} [aX=0] - The x coordinate of the center of the arc offsetted from the previous curve.
   * @param {number} [aY=0] - The y coordinate of the center of the arc offsetted from the previous curve.
   * @param {number} [aRadius=1] - The radius of the arc.
   * @param {number} [aStartAngle=0] - The start angle in radians.
   * @param {number} [aEndAngle=Math.PI*2] - The end angle in radians.
   * @param {boolean} [aClockwise=false] - Whether to sweep the arc clockwise or not.
   * @return {Path} A reference to this path.
   */
  arc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
    const x0 = this.currentPoint.x,
      y0 = this.currentPoint.y;
    return this.absarc(aX + x0, aY + y0, aRadius, aStartAngle, aEndAngle, aClockwise), this;
  }
  /**
   * Adds an absolutely positioned arc as an instance of {@link EllipseCurve} to the path.
   *
   * @param {number} [aX=0] - The x coordinate of the center of the arc.
   * @param {number} [aY=0] - The y coordinate of the center of the arc.
   * @param {number} [aRadius=1] - The radius of the arc.
   * @param {number} [aStartAngle=0] - The start angle in radians.
   * @param {number} [aEndAngle=Math.PI*2] - The end angle in radians.
   * @param {boolean} [aClockwise=false] - Whether to sweep the arc clockwise or not.
   * @return {Path} A reference to this path.
   */
  absarc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise) {
    return this.absellipse(aX, aY, aRadius, aRadius, aStartAngle, aEndAngle, aClockwise), this;
  }
  /**
   * Adds an ellipse as an instance of {@link EllipseCurve} to the path, positioned relative
   * to the current point
   *
   * @param {number} [aX=0] - The x coordinate of the center of the ellipse offsetted from the previous curve.
   * @param {number} [aY=0] - The y coordinate of the center of the ellipse offsetted from the previous curve.
   * @param {number} [xRadius=1] - The radius of the ellipse in the x axis.
   * @param {number} [yRadius=1] - The radius of the ellipse in the y axis.
   * @param {number} [aStartAngle=0] - The start angle in radians.
   * @param {number} [aEndAngle=Math.PI*2] - The end angle in radians.
   * @param {boolean} [aClockwise=false] - Whether to sweep the ellipse clockwise or not.
   * @param {number} [aRotation=0] - The rotation angle of the ellipse in radians, counterclockwise from the positive X axis.
   * @return {Path} A reference to this path.
   */
  ellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {
    const x0 = this.currentPoint.x,
      y0 = this.currentPoint.y;
    return this.absellipse(aX + x0, aY + y0, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation), this;
  }
  /**
   * Adds an absolutely positioned ellipse as an instance of {@link EllipseCurve} to the path.
   *
   * @param {number} [aX=0] - The x coordinate of the absolute center of the ellipse.
   * @param {number} [aY=0] - The y coordinate of the absolute center of the ellipse.
   * @param {number} [xRadius=1] - The radius of the ellipse in the x axis.
   * @param {number} [yRadius=1] - The radius of the ellipse in the y axis.
   * @param {number} [aStartAngle=0] - The start angle in radians.
   * @param {number} [aEndAngle=Math.PI*2] - The end angle in radians.
   * @param {boolean} [aClockwise=false] - Whether to sweep the ellipse clockwise or not.
   * @param {number} [aRotation=0] - The rotation angle of the ellipse in radians, counterclockwise from the positive X axis.
   * @return {Path} A reference to this path.
   */
  absellipse(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation) {
    const curve = new EllipseCurve(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise, aRotation);
    if (this.curves.length > 0) {
      const firstPoint = curve.getPoint(0);
      firstPoint.equals(this.currentPoint) || this.lineTo(firstPoint.x, firstPoint.y);
    }
    this.curves.push(curve);
    const lastPoint = curve.getPoint(1);
    return this.currentPoint.copy(lastPoint), this;
  }
  copy(source) {
    return super.copy(source), this.currentPoint.copy(source.currentPoint), this;
  }
  toJSON() {
    const data = super.toJSON();
    return data.currentPoint = this.currentPoint.toArray(), data;
  }
  fromJSON(json) {
    return super.fromJSON(json), this.currentPoint.fromArray(json.currentPoint), this;
  }
}
/**
 * Defines an arbitrary 2d shape plane using paths with optional holes. It
 * can be used with {@link ExtrudeGeometry}, {@link ShapeGeometry}, to get
 * points, or to get triangulated faces.
 *
 * ```js
 * const heartShape = new THREE.Shape();
 *
 * heartShape.moveTo( 25, 25 );
 * heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
 * heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
 * heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
 * heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
 * heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
 * heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );
 *
 * const extrudeSettings = {
 * 	depth: 8,
 * 	bevelEnabled: true,
 * 	bevelSegments: 2,
 * 	steps: 2,
 * 	bevelSize: 1,
 * 	bevelThickness: 1
 * };
 *
 * const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
 * const mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial() );
 * ```
 *
 * @augments Path
 */
class Shape extends Path {
  constructor(points) {
    super(points), this.uuid = generateUUID(), this.type = "Shape", this.holes = [];
  }
  getPointsHoles(divisions) {
    const holesPts = [];
    for (let i = 0, l = this.holes.length; i < l; i++) holesPts[i] = this.holes[i].getPoints(divisions);
    return holesPts;
  }
  // get points of shape and holes (keypoints based on segments parameter)

  /**
   * Returns an object that holds contour data for the shape and its holes as
   * arrays of 2D points.
   *
   * @param {number} divisions - The fineness of the result.
   * @return {{shape:Array<Vector2>,holes:Array<Array<Vector2>>}} An object with contour data.
   */
  extractPoints(divisions) {
    return {
      shape: this.getPoints(divisions),
      holes: this.getPointsHoles(divisions)
    };
  }
  copy(source) {
    super.copy(source), this.holes = [];
    for (let i = 0, l = source.holes.length; i < l; i++) {
      const hole = source.holes[i];
      this.holes.push(hole.clone());
    }
    return this;
  }
  toJSON() {
    const data = super.toJSON();
    data.uuid = this.uuid, data.holes = [];
    for (let i = 0, l = this.holes.length; i < l; i++) {
      const hole = this.holes[i];
      data.holes.push(hole.toJSON());
    }
    return data;
  }
  fromJSON(json) {
    super.fromJSON(json), this.uuid = json.uuid, this.holes = [];
    for (let i = 0, l = json.holes.length; i < l; i++) {
      const hole = json.holes[i];
      this.holes.push(new Path().fromJSON(hole));
    }
    return this;
  }
}
/* 人工身份合同：维度参数、孔环消除、三角索引输出的 Earcut 入口。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function earcut(e, t, n = 2) {
  const r = t && t.length,
    i = r ? t[0] * n : e.length;
  let a = linkedList(e, 0, i, n, !0);
  const s = [];
  if (!a || a.next === a.prev) return s;
  let o, c, l;
  if (r && (a = function (e, t, n, r) {
    const i = [];
    for (let n = 0, a = t.length; n < a; n++) {
      const s = linkedList(e, t[n] * r, n < a - 1 ? t[n + 1] * r : e.length, r, !1);
      s === s.next && (s.steiner = !0), i.push(getLeftmost(s));
    }
    i.sort(compareXYSlope);
    for (let e = 0; e < i.length; e++) n = eliminateHole(i[e], n);
    return n;
  }(e, t, a, n)), e.length > 80 * n) {
    o = e[0], c = e[1];
    let t = o,
      r = c;
    for (let a = n; a < i; a += n) {
      const n = e[a],
        i = e[a + 1];
      n < o && (o = n), i < c && (c = i), n > t && (t = n), i > r && (r = i);
    }
    l = Math.max(t - o, r - c), l = 0 !== l ? 32767 / l : 0;
  }
  return earcutLinked(a, s, n, o, c, l, 0), s;
}
/* 人工身份合同：按面积方向构建环状顶点链并去重复端点。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function linkedList(e, t, n, r, i) {
  let a;
  if (i === function (e, t, n, r) {
    let i = 0;
    for (let a = t, s = n - r; a < n; a += r) i += (e[s] - e[a]) * (e[a + 1] + e[s + 1]), s = a;
    return i;
  }(e, t, n, r) > 0) for (let i = t; i < n; i += r) a = insertNode(i / r | 0, e[i], e[i + 1], a);else for (let i = n - r; i >= t; i -= r) a = insertNode(i / r | 0, e[i], e[i + 1], a);
  return a && equals(a, a.next) && (removeNode(a), a = a.next), a;
}
/* 人工身份合同：删除相等或共线的非 Steiner 顶点。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function filterPoints(e, t) {
  if (!e) return e;
  t || (t = e);
  let n,
    r = e;
  do {
    if (n = !1, r.steiner || !equals(r, r.next) && 0 !== area(r.prev, r, r.next)) r = r.next;else {
      if (removeNode(r), r = t = r.prev, r === r.next) break;
      n = !0;
    }
  } while (n || r !== t);
  return t;
}
/* 人工身份合同：顺环剪耳、空间索引及多遍恢复调度。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function earcutLinked(e, t, n, r, i, a, s) {
  if (!e) return;
  !s && a && function (e, t, n, r) {
    let i = e;
    do {
      0 === i.z && (i.z = zOrder(i.x, i.y, t, n, r)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next;
    } while (i !== e);
    i.prevZ.nextZ = null, i.prevZ = null, function (e) {
      let t,
        n = 1;
      do {
        let r,
          i = e;
        e = null;
        let a = null;
        for (t = 0; i;) {
          t++;
          let s = i,
            o = 0;
          for (let e = 0; e < n && (o++, s = s.nextZ, s); e++);
          let c = n;
          for (; o > 0 || c > 0 && s;) 0 !== o && (0 === c || !s || i.z <= s.z) ? (r = i, i = i.nextZ, o--) : (r = s, s = s.nextZ, c--), a ? a.nextZ = r : e = r, r.prevZ = a, a = r;
          i = s;
        }
        a.nextZ = null, n *= 2;
      } while (t > 1);
    }(i);
  }(e, r, i, a);
  let o = e;
  for (; e.prev !== e.next;) {
    const c = e.prev,
      l = e.next;
    if (a ? isEarHashed(e, r, i, a) : isEar(e)) t.push(c.i, e.i, l.i), removeNode(e), e = l.next, o = l.next;else if ((e = l) === o) {
      s ? 1 === s ? earcutLinked(e = cureLocalIntersections(filterPoints(e), t), t, n, r, i, a, 2) : 2 === s && splitEarcut(e, t, n, r, i, a) : earcutLinked(filterPoints(e), t, n, r, i, a, 1);
      break;
    }
  }
}
/* 人工身份合同：凸性和其他顶点在候选耳内检测。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function isEar(e) {
  const t = e.prev,
    n = e,
    r = e.next;
  if (area(t, n, r) >= 0) return !1;
  const i = t.x,
    a = n.x,
    s = r.x,
    o = t.y,
    c = n.y,
    l = r.y,
    u = Math.min(i, a, s),
    d = Math.min(o, c, l),
    h = Math.max(i, a, s),
    p = Math.max(o, c, l);
  let f = r.next;
  for (; f !== t;) {
    if (f.x >= u && f.x <= h && f.y >= d && f.y <= p && pointInTriangleExceptFirst(i, o, a, c, s, l, f.x, f.y) && area(f.prev, f, f.next) >= 0) return !1;
    f = f.next;
  }
  return !0;
}
/* 人工身份合同：耳包围盒 z 序范围筛选和点内检测。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function isEarHashed(e, t, n, r) {
  const i = e.prev,
    a = e,
    s = e.next;
  if (area(i, a, s) >= 0) return !1;
  const o = i.x,
    c = a.x,
    l = s.x,
    u = i.y,
    d = a.y,
    h = s.y,
    p = Math.min(o, c, l),
    f = Math.min(u, d, h),
    m = Math.max(o, c, l),
    M = Math.max(u, d, h),
    _ = zOrder(p, f, t, n, r),
    A = zOrder(m, M, t, n, r);
  let g = e.prevZ,
    b = e.nextZ;
  for (; g && g.z >= _ && b && b.z <= A;) {
    if (g.x >= p && g.x <= m && g.y >= f && g.y <= M && g !== i && g !== s && pointInTriangleExceptFirst(o, u, c, d, l, h, g.x, g.y) && area(g.prev, g, g.next) >= 0) return !1;
    if (g = g.prevZ, b.x >= p && b.x <= m && b.y >= f && b.y <= M && b !== i && b !== s && pointInTriangleExceptFirst(o, u, c, d, l, h, b.x, b.y) && area(b.prev, b, b.next) >= 0) return !1;
    b = b.nextZ;
  }
  for (; g && g.z >= _;) {
    if (g.x >= p && g.x <= m && g.y >= f && g.y <= M && g !== i && g !== s && pointInTriangleExceptFirst(o, u, c, d, l, h, g.x, g.y) && area(g.prev, g, g.next) >= 0) return !1;
    g = g.prevZ;
  }
  for (; b && b.z <= A;) {
    if (b.x >= p && b.x <= m && b.y >= f && b.y <= M && b !== i && b !== s && pointInTriangleExceptFirst(o, u, c, d, l, h, b.x, b.y) && area(b.prev, b, b.next) >= 0) return !1;
    b = b.nextZ;
  }
  return !0;
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：cureLocalIntersections。 */
function cureLocalIntersections(start, triangles) {
  let p = start;
  do {
    const a = p.prev,
      b = p.next.next;
    !equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a) && (triangles.push(a.i, p.i, b.i), removeNode(p), removeNode(p.next), p = start = b), p = p.next;
  } while (p !== start);
  return filterPoints(p);
}
/* 人工身份合同：搜索有效对角线、拆环并递归剪耳。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function splitEarcut(e, t, n, r, i, a) {
  let s = e;
  do {
    let e = s.next.next;
    for (; e !== s.prev;) {
      if (s.i !== e.i && isValidDiagonal(s, e)) {
        let o = splitPolygon(s, e);
        return s = filterPoints(s, s.next), o = filterPoints(o, o.next), earcutLinked(s, t, n, r, i, a, 0), void earcutLinked(o, t, n, r, i, a, 0);
      }
      e = e.next;
    }
    s = s.next;
  } while (s !== e);
}
/* 人工身份合同：孔队列的 x、y、出边斜率三级排序比较。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function compareXYSlope(e, t) {
  let n = e.x - t.x;
  if (0 === n && (n = e.y - t.y, 0 === n)) {
    n = (e.next.y - e.y) / (e.next.x - e.x) - (t.next.y - t.y) / (t.next.x - t.x);
  }
  return n;
}
/* 人工身份合同：桥接孔和外环并过滤桥边；findHoleBridge 已内联。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function eliminateHole(e, t) {
  const n = function (e, t) {
    let n = t;
    const r = e.x,
      i = e.y;
    let a,
      s = -1 / 0;
    if (equals(e, n)) return n;
    do {
      if (equals(e, n.next)) return n.next;
      if (i <= n.y && i >= n.next.y && n.next.y !== n.y) {
        const e = n.x + (i - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
        if (e <= r && e > s && (s = e, a = n.x < n.next.x ? n : n.next, e === r)) return a;
      }
      n = n.next;
    } while (n !== t);
    if (!a) return null;
    const o = a,
      c = a.x,
      l = a.y;
    let u = 1 / 0;
    n = a;
    do {
      if (r >= n.x && n.x >= c && r !== n.x && pointInTriangle(i < l ? r : s, i, c, l, i < l ? s : r, i, n.x, n.y)) {
        const t = Math.abs(i - n.y) / (r - n.x);
        locallyInside(n, e) && (t < u || t === u && (n.x > a.x || n.x === a.x && sectorContainsSector(a, n))) && (a = n, u = t);
      }
      n = n.next;
    } while (n !== o);
    return a;
  }(e, t);
  if (!n) return t;
  const r = splitPolygon(n, e);
  return filterPoints(r, r.next), filterPoints(n, n.next);
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：sectorContainsSector。 */
function sectorContainsSector(m, p) {
  return area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;
}
/* 人工身份合同：0x55555555/0x33333333/0x0f0f0f0f 位交织 Morton 编码。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function zOrder(e, t, n, r, i) {
  return (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = (e - n) * i | 0) | e << 8)) | e << 4)) | e << 2)) | e << 1)) | (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = (t - r) * i | 0) | t << 8)) | t << 4)) | t << 2)) | t << 1)) << 1;
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：getLeftmost。 */
function getLeftmost(start) {
  let p = start,
    leftmost = start;
  do {
    (p.x < leftmost.x || p.x === leftmost.x && p.y < leftmost.y) && (leftmost = p), p = p.next;
  } while (p !== start);
  return leftmost;
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：pointInTriangle。以三条有向边的叉积符号判断点是否位于三角形内。 */
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
  return (cx - px) * (ay - py) >= (ax - px) * (cy - py) && (ax - px) * (by - py) >= (bx - px) * (ay - py) && (bx - px) * (cy - py) >= (cx - px) * (by - py);
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：pointInTriangleExceptFirst。 */
function pointInTriangleExceptFirst(ax, ay, bx, by, cx, cy, px, py) {
  return !(ax === px && ay === py) && pointInTriangle(ax, ay, bx, by, cx, cy, px, py);
}
/* 人工身份合同：相邻索引排除、边交叉、局部可见与中点内测试（后两辅助被内联）。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function isValidDiagonal(e, t) {
  return e.next.i !== t.i && e.prev.i !== t.i && !function (e, t) {
    let n = e;
    do {
      if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && intersects(n, n.next, e, t)) return !0;
      n = n.next;
    } while (n !== e);
    return !1;
  }(e, t) && (locallyInside(e, t) && locallyInside(t, e) && function (e, t) {
    let n = e,
      r = !1;
    const i = (e.x + t.x) / 2,
      a = (e.y + t.y) / 2;
    do {
      n.y > a != n.next.y > a && n.next.y !== n.y && i < (n.next.x - n.x) * (a - n.y) / (n.next.y - n.y) + n.x && (r = !r), n = n.next;
    } while (n !== e);
    return r;
  }(e, t) && (area(e.prev, e, t.prev) || area(e, t.prev, t)) || equals(e, t) && area(e.prev, e, e.next) > 0 && area(t.prev, t, t.next) > 0);
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：area。 */
function area(p, q, r) {
  return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：equals。 */
function equals(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}
/* 人工身份合同：四个有向面积符号和共线 onSegment 分支。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function intersects(e, t, n, r) {
  const i = sign(area(e, t, n)),
    a = sign(area(e, t, r)),
    s = sign(area(n, r, e)),
    o = sign(area(n, r, t));
  return i !== a && s !== o || !(0 !== i || !onSegment(e, n, t)) || !(0 !== a || !onSegment(e, r, t)) || !(0 !== s || !onSegment(n, e, r)) || !(0 !== o || !onSegment(n, t, r));
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：onSegment。 */
function onSegment(p, q, r) {
  return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：sign。 */
function sign(num) {
  return num > 0 ? 1 : num < 0 ? -1 : 0;
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：locallyInside。 */
function locallyInside(a, b) {
  return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：splitPolygon。 */
function splitPolygon(a, b) {
  const a2 = createNode(a.i, a.x, a.y),
    b2 = createNode(b.i, b.x, b.y),
    an = a.next,
    bp = b.prev;
  return a.next = b, b.prev = a, a2.next = an, an.prev = a2, b2.next = a2, a2.prev = b2, bp.next = b2, b2.prev = bp, b2;
}
/* 人工身份合同：createNode 后接入双向环，空环自连。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function insertNode(e, t, n, r) {
  const i = createNode(e, t, n);
  return r ? (i.next = r.next, i.prev = r, r.next.prev = i, r.next = i) : (i.prev = i, i.next = i), i;
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：removeNode。同时修复双向环链表及可选 z 序链表的相邻引用。 */
function removeNode(p) {
  p.next.prev = p.prev, p.prev.next = p.next, p.prevZ && (p.prevZ.nextZ = p.nextZ), p.nextZ && (p.nextZ.prevZ = p.prevZ);
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：createNode。 */
function createNode(i, x, y) {
  return {
    i: i,
    x: x,
    y: y,
    prev: null,
    next: null,
    z: 0,
    prevZ: null,
    nextZ: null,
    steiner: !1
  };
}
/**
 * An implementation of the earcut polygon triangulation algorithm.
 * The code is a port of [mapbox/earcut](https://github.com/mapbox/earcut).
 *
 * @see https://github.com/mapbox/earcut
 */
class Earcut {
  /**
   * Triangulates the given shape definition by returning an array of triangles.
   *
   * @param {Array<number>} data - An array with 2D points.
   * @param {Array<number>} holeIndices - An array with indices defining holes.
   * @param {number} [dim=2] - The number of coordinates per vertex in the input array.
   * @return {Array<number>} An array representing the triangulated faces. Each face is defined by three consecutive numbers
   * representing vertex indices.
   */
  static triangulate(data, holeIndices, dim = 2) {
    return earcut(data, holeIndices, dim);
  }
}
/**
 * A class containing utility functions for shapes.
 *
 * @hideconstructor
 */
class ShapeUtils {
  static area(contour) {
    const n = contour.length;
    let a = 0;
    for (let p = n - 1, q = 0; q < n; p = q++) a += contour[p].x * contour[q].y - contour[q].x * contour[p].y;
    return .5 * a;
  }
  /**
   * Returns `true` if the given contour uses a clockwise winding order.
   *
   * @param {Array<Vector2>} pts - An array of 2D points defining a polygon.
   * @return {boolean} Whether the given contour uses a clockwise winding order or not.
   */
  static isClockWise(pts) {
    return ShapeUtils.area(pts) < 0;
  }
  static triangulateShape(contour, holes) {
    const vertices = [],
      holeIndices = [],
      faces = [];
    removeDupEndPts(contour), addContour(vertices, contour);
    let holeIndex = contour.length;
    holes.forEach(removeDupEndPts);
    for (let i = 0; i < holes.length; i++) holeIndices.push(holeIndex), holeIndex += holes[i].length, addContour(vertices, holes[i]);
    const triangles = Earcut.triangulate(vertices, holeIndices);
    for (let i = 0; i < triangles.length; i += 3) faces.push(triangles.slice(i, i + 3));
    return faces;
  }
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：removeDupEndPts。 */
function removeDupEndPts(points) {
  const l = points.length;
  l > 2 && points[l - 1].equals(points[0]) && points.pop();
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：addContour。 */
function addContour(vertices, contour) {
  for (let i = 0; i < contour.length; i++) vertices.push(contour[i].x), vertices.push(contour[i].y);
}
/**
 * Creates extruded geometry from a path shape.
 *
 * ```js
 * const length = 12, width = 8;
 *
 * const shape = new THREE.Shape();
 * shape.moveTo( 0,0 );
 * shape.lineTo( 0, width );
 * shape.lineTo( length, width );
 * shape.lineTo( length, 0 );
 * shape.lineTo( 0, 0 );
 *
 * const geometry = new THREE.ExtrudeGeometry( shape );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 * const mesh = new THREE.Mesh( geometry, material ) ;
 * scene.add( mesh );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#ExtrudeGeometry
 */
class ExtrudeGeometry extends BufferGeometry {
  /* shape 或 shape 数组+options，默认单位方形。extractPoints 后规范轮廓/洞绕序，以相对坐标尺度的 1e-10 距离阈值合并重叠点；由邻边求 bevel 位移，超过长度平方2时缩短尖角，平行边另分同/反向。原 shapes/options 在 parameters 保留引用，没有复制任意路径对象。 */
  constructor(e = new Shape([new Vector2(.5, .5), new Vector2(-.5, .5), new Vector2(-.5, -.5), new Vector2(.5, -.5)]), t = {}) {
    super(), this.type = "ExtrudeGeometry", this.parameters = {
      shapes: e,
      options: t
    }, e = Array.isArray(e) ? e : [e];
    const n = this,
      r = [],
      i = [];
    for (let t = 0, n = e.length; t < n; t++) {
      a(e[t]);
    }
    function a(e) {
      const a = [],
        s = void 0 !== t.curveSegments ? t.curveSegments : 12,
        o = void 0 !== t.steps ? t.steps : 1,
        c = void 0 !== t.depth ? t.depth : 1;
      let l = void 0 === t.bevelEnabled || t.bevelEnabled,
        u = void 0 !== t.bevelThickness ? t.bevelThickness : .2,
        d = void 0 !== t.bevelSize ? t.bevelSize : u - .1,
        h = void 0 !== t.bevelOffset ? t.bevelOffset : 0,
        p = void 0 !== t.bevelSegments ? t.bevelSegments : 3;
      const f = t.extrudePath,
        m = void 0 !== t.UVGenerator ? t.UVGenerator : Po;
      let M,
        _,
        A,
        g,
        b,
        y = !1;
      if (f) {
        M = f.getSpacedPoints(o), y = !0, l = !1;
        const e = !!f.isCatmullRomCurve3 && f.closed;
        _ = f.computeFrenetFrames(o, e), A = new Vector3(), g = new Vector3(), b = new Vector3();
      }
      l || (p = 0, u = 0, d = 0, h = 0);
      const L = e.extractPoints(s);
      let v = L.shape;
      const T = L.holes;
      if (!ShapeUtils.isClockWise(v)) {
        v = v.reverse();
        for (let e = 0, t = T.length; e < t; e++) {
          const t = T[e];
          ShapeUtils.isClockWise(t) && (T[e] = t.reverse());
        }
      }
      function S(e) {
        const t = 1e-10 * 1e-10;
        let n = e[0];
        for (let r = 1; r <= e.length; r++) {
          const i = r % e.length,
            a = e[i],
            s = a.x - n.x,
            o = a.y - n.y,
            c = s * s + o * o,
            l = Math.max(Math.abs(a.x), Math.abs(a.y), Math.abs(n.x), Math.abs(n.y));
          c <= t * l * l ? (e.splice(i, 1), r--) : n = a;
        }
      }
      S(v), T.forEach(S);
      const w = T.length,
        E = v;
      for (let e = 0; e < w; e++) {
        const t = T[e];
        v = v.concat(t);
      }
      function x(e, t, n) {
        return t || error("ExtrudeGeometry: vec does not exist"), e.clone().addScaledVector(t, n);
      }
      const C = v.length;
      function z(e, t, n) {
        let r, i, a;
        const s = e.x - t.x,
          o = e.y - t.y,
          c = n.x - e.x,
          l = n.y - e.y,
          u = s * s + o * o,
          d = s * l - o * c;
        if (Math.abs(d) > Number.EPSILON) {
          const d = Math.sqrt(u),
            h = Math.sqrt(c * c + l * l),
            p = t.x - o / d,
            f = t.y + s / d,
            m = ((n.x - l / h - p) * l - (n.y + c / h - f) * c) / (s * l - o * c);
          r = p + s * m - e.x, i = f + o * m - e.y;
          const M = r * r + i * i;
          if (M <= 2) return new Vector2(r, i);
          a = Math.sqrt(M / 2);
        } else {
          let e = !1;
          s > Number.EPSILON ? c > Number.EPSILON && (e = !0) : s < -Number.EPSILON ? c < -Number.EPSILON && (e = !0) : Math.sign(o) === Math.sign(l) && (e = !0), e ? (r = -o, i = s, a = Math.sqrt(u)) : (r = s, i = o, a = Math.sqrt(u / 2));
        }
        return new Vector2(r / a, i / a);
      }
      const O = [];
      for (let e = 0, t = E.length, n = t - 1, r = e + 1; e < t; e++, n++, r++) n === t && (n = 0), r === t && (r = 0), O[e] = z(E[e], E[n], E[r]);
      const B = [];
      let D,
        N,
        I = O.concat();
      for (let e = 0, t = w; e < t; e++) {
        const t = T[e];
        D = [];
        for (let e = 0, n = t.length, r = n - 1, i = e + 1; e < n; e++, r++, i++) r === n && (r = 0), i === n && (i = 0), D[e] = z(t[e], t[r], t[i]);
        B.push(D), I = I.concat(D);
      }
      if (0 === p) N = ShapeUtils.triangulateShape(E, T);else {
        const e = [],
          t = [];
        for (let n = 0; n < p; n++) {
          const r = n / p,
            i = u * Math.cos(r * Math.PI / 2),
            a = d * Math.sin(r * Math.PI / 2) + h;
          for (let t = 0, n = E.length; t < n; t++) {
            const n = x(E[t], O[t], a);
            Y(n.x, n.y, -i), 0 === r && e.push(n);
          }
          for (let e = 0, n = w; e < n; e++) {
            const n = T[e];
            D = B[e];
            const s = [];
            for (let e = 0, t = n.length; e < t; e++) {
              const t = x(n[e], D[e], a);
              Y(t.x, t.y, -i), 0 === r && s.push(t);
            }
            0 === r && t.push(s);
          }
        }
        N = ShapeUtils.triangulateShape(e, t);
      }
      const R = N.length,
        k = d + h;
      for (let e = 0; e < C; e++) {
        const t = l ? x(v[e], I[e], k) : v[e];
        y ? (g.copy(_.normals[0]).multiplyScalar(t.x), A.copy(_.binormals[0]).multiplyScalar(t.y), b.copy(M[0]).add(g).add(A), Y(b.x, b.y, b.z)) : Y(t.x, t.y, 0);
      }
      for (let e = 1; e <= o; e++) for (let t = 0; t < C; t++) {
        const n = l ? x(v[t], I[t], k) : v[t];
        y ? (g.copy(_.normals[e]).multiplyScalar(n.x), A.copy(_.binormals[e]).multiplyScalar(n.y), b.copy(M[e]).add(g).add(A), Y(b.x, b.y, b.z)) : Y(n.x, n.y, c / o * e);
      }
      for (let e = p - 1; e >= 0; e--) {
        const t = e / p,
          n = u * Math.cos(t * Math.PI / 2),
          r = d * Math.sin(t * Math.PI / 2) + h;
        for (let e = 0, t = E.length; e < t; e++) {
          const t = x(E[e], O[e], r);
          Y(t.x, t.y, c + n);
        }
        for (let e = 0, t = T.length; e < t; e++) {
          const t = T[e];
          D = B[e];
          for (let e = 0, i = t.length; e < i; e++) {
            const i = x(t[e], D[e], r);
            y ? Y(i.x, i.y + M[o - 1].y, M[o - 1].x + n) : Y(i.x, i.y, c + n);
          }
        }
      }
      function P(e, t) {
        let n = e.length;
        for (; --n >= 0;) {
          const r = n;
          let i = n - 1;
          i < 0 && (i = e.length - 1);
          for (let e = 0, n = o + 2 * p; e < n; e++) {
            const n = C * e,
              a = C * (e + 1);
            F(t + r + n, t + i + n, t + i + a, t + r + a);
          }
        }
      }
      function Y(e, t, n) {
        a.push(e), a.push(t), a.push(n);
      }
      function W(e, t, i) {
        q(e), q(t), q(i);
        const a = r.length / 3,
          s = m.generateTopUV(n, r, a - 3, a - 2, a - 1);
        H(s[0]), H(s[1]), H(s[2]);
      }
      function F(e, t, i, a) {
        q(e), q(t), q(a), q(t), q(i), q(a);
        const s = r.length / 3,
          o = m.generateSideWallUV(n, r, s - 6, s - 3, s - 2, s - 1);
        H(o[0]), H(o[1]), H(o[3]), H(o[1]), H(o[2]), H(o[3]);
      }
      function q(e) {
        r.push(a[3 * e + 0]), r.push(a[3 * e + 1]), r.push(a[3 * e + 2]);
      }
      function H(e) {
        i.push(e.x), i.push(e.y);
      }
      !function () {
        const e = r.length / 3;
        if (l) {
          let e = 0,
            t = C * e;
          for (let e = 0; e < R; e++) {
            const n = N[e];
            W(n[2] + t, n[1] + t, n[0] + t);
          }
          e = o + 2 * p, t = C * e;
          for (let e = 0; e < R; e++) {
            const n = N[e];
            W(n[0] + t, n[1] + t, n[2] + t);
          }
        } else {
          for (let e = 0; e < R; e++) {
            const t = N[e];
            W(t[2], t[1], t[0]);
          }
          for (let e = 0; e < R; e++) {
            const t = N[e];
            W(t[0] + C * o, t[1] + C * o, t[2] + C * o);
          }
        }
        n.addGroup(e, r.length / 3 - e, 0);
      }(), function () {
        const e = r.length / 3;
        let t = 0;
        P(E, t), t += E.length;
        for (let e = 0, n = T.length; e < n; e++) {
          const n = T[e];
          P(n, t), t += n.length;
        }
        n.addGroup(e, r.length / 3 - e, 1);
      }();
    }
    this.setAttribute("position", new Float32BufferAttribute(r, 3)), this.setAttribute("uv", new Float32BufferAttribute(i, 2)), this.computeVertexNormals();
  }
  copy(source) {
    return super.copy(source), this.parameters = Object.assign({}, source.parameters), this;
  }
  /* 先取 BufferGeometry 序列化结果；shapes 只存 UUID 数组，options 做 Object.assign 浅拷贝，extrudePath 若存在改为路径.toJSON。原 options 不被这次替换改变，其他对象值仍共享引用；不会把 Shape 实例本体内嵌。 */
  toJSON() {
    const e = super.toJSON();
    return function (e, t, n) {
      if (n.shapes = [], Array.isArray(e)) for (let t = 0, r = e.length; t < r; t++) {
        const r = e[t];
        n.shapes.push(r.uuid);
      } else n.shapes.push(e.uuid);
      n.options = Object.assign({}, t), void 0 !== t.extrudePath && (n.options.extrudePath = t.extrudePath.toJSON());
      return n;
    }(this.parameters.shapes, this.parameters.options, e);
  }
  static fromJSON(data, shapes) {
    const geometryShapes = [];
    for (let j = 0, jl = data.shapes.length; j < jl; j++) {
      const shape = shapes[data.shapes[j]];
      geometryShapes.push(shape);
    }
    const extrudePath = data.options.extrudePath;
    return void 0 !== extrudePath && (data.options.extrudePath = new Curves[extrudePath.type]().fromJSON(extrudePath)), new ExtrudeGeometry(geometryShapes, data.options);
  }
}
const Po = {
  generateTopUV: function (geometry, vertices, indexA, indexB, indexC) {
    const a_x = vertices[3 * indexA],
      a_y = vertices[3 * indexA + 1],
      b_x = vertices[3 * indexB],
      b_y = vertices[3 * indexB + 1],
      c_x = vertices[3 * indexC],
      c_y = vertices[3 * indexC + 1];
    return [new Vector2(a_x, a_y), new Vector2(b_x, b_y), new Vector2(c_x, c_y)];
  },
  generateSideWallUV: function (geometry, vertices, indexA, indexB, indexC, indexD) {
    const a_x = vertices[3 * indexA],
      a_y = vertices[3 * indexA + 1],
      a_z = vertices[3 * indexA + 2],
      b_x = vertices[3 * indexB],
      b_y = vertices[3 * indexB + 1],
      b_z = vertices[3 * indexB + 2],
      c_x = vertices[3 * indexC],
      c_y = vertices[3 * indexC + 1],
      c_z = vertices[3 * indexC + 2],
      d_x = vertices[3 * indexD],
      d_y = vertices[3 * indexD + 1],
      d_z = vertices[3 * indexD + 2];
    return Math.abs(a_y - b_y) < Math.abs(a_x - b_x) ? [new Vector2(a_x, 1 - a_z), new Vector2(b_x, 1 - b_z), new Vector2(c_x, 1 - c_z), new Vector2(d_x, 1 - d_z)] : [new Vector2(a_y, 1 - a_z), new Vector2(b_y, 1 - b_z), new Vector2(c_y, 1 - c_z), new Vector2(d_y, 1 - d_z)];
  }
};
/**
 * A geometry class for representing an icosahedron.
 *
 * ```js
 * const geometry = new THREE.IcosahedronGeometry();
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const icosahedron = new THREE.Mesh( geometry, material );
 * scene.add( icosahedron );
 * ```
 *
 * @augments PolyhedronGeometry
 * @demo scenes/geometry-browser.html#IcosahedronGeometry
 */
class IcosahedronGeometry extends PolyhedronGeometry {
  /* radius/detail 输入，12 个含黄金比的种子顶点、20 个三角面传 PolyhedronGeometry，随后设自身 type 和 radius/detail parameters。与 Dodecahedron 的20顶点/36三角种子不同；细分与球面 UV 由父类执行。 */
  constructor(e = 1, t = 0) {
    const n = (1 + Math.sqrt(5)) / 2;
    super([-1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, 0, 0, -1, n, 0, 1, n, 0, -1, -n, 0, 1, -n, n, 0, -1, n, 0, 1, -n, 0, -1, -n, 0, 1], [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], e, t), this.type = "IcosahedronGeometry", this.parameters = {
      radius: e,
      detail: t
    };
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {IcosahedronGeometry} A new instance.
   */
  static fromJSON(data) {
    return new IcosahedronGeometry(data.radius, data.detail);
  }
}
/**
 * Creates meshes with axial symmetry like vases. The lathe rotates around the Y axis.
 *
 * ```js
 * const points = [];
 * for ( let i = 0; i < 10; i ++ ) {
 * 	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
 * }
 * const geometry = new THREE.LatheGeometry( points );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const lathe = new THREE.Mesh( geometry, material );
 * scene.add( lathe );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#LatheGeometry
 */
class LatheGeometry extends BufferGeometry {
  constructor(points = [new Vector2(0, -.5), new Vector2(.5, 0), new Vector2(0, .5)], segments = 12, phiStart = 0, phiLength = 2 * Math.PI) {
    super(), this.type = "LatheGeometry", this.parameters = {
      points: points,
      segments: segments,
      phiStart: phiStart,
      phiLength: phiLength
    }, segments = Math.floor(segments), phiLength = clamp(phiLength, 0, 2 * Math.PI);
    const indices = [],
      vertices = [],
      uvs = [],
      initNormals = [],
      normals = [],
      inverseSegments = 1 / segments,
      vertex = new Vector3(),
      uv = new Vector2(),
      normal = new Vector3(),
      curNormal = new Vector3(),
      prevNormal = new Vector3();
    let dx = 0,
      dy = 0;
    for (let j = 0; j <= points.length - 1; j++) switch (j) {
      case 0:
        dx = points[j + 1].x - points[j].x, dy = points[j + 1].y - points[j].y, normal.x = 1 * dy, normal.y = -dx, normal.z = 0 * dy, prevNormal.copy(normal), normal.normalize(), initNormals.push(normal.x, normal.y, normal.z);
        break;
      case points.length - 1:
        initNormals.push(prevNormal.x, prevNormal.y, prevNormal.z);
        break;
      default:
        dx = points[j + 1].x - points[j].x, dy = points[j + 1].y - points[j].y, normal.x = 1 * dy, normal.y = -dx, normal.z = 0 * dy, curNormal.copy(normal), normal.x += prevNormal.x, normal.y += prevNormal.y, normal.z += prevNormal.z, normal.normalize(), initNormals.push(normal.x, normal.y, normal.z), prevNormal.copy(curNormal);
    }
    for (let i = 0; i <= segments; i++) {
      const phi = phiStart + i * inverseSegments * phiLength,
        sin = Math.sin(phi),
        cos = Math.cos(phi);
      for (let j = 0; j <= points.length - 1; j++) {
        vertex.x = points[j].x * sin, vertex.y = points[j].y, vertex.z = points[j].x * cos, vertices.push(vertex.x, vertex.y, vertex.z), uv.x = i / segments, uv.y = j / (points.length - 1), uvs.push(uv.x, uv.y);
        const x = initNormals[3 * j + 0] * sin,
          y = initNormals[3 * j + 1],
          z = initNormals[3 * j + 0] * cos;
        normals.push(x, y, z);
      }
    }
    for (let i = 0; i < segments; i++) for (let j = 0; j < points.length - 1; j++) {
      const base = j + i * points.length,
        a = base,
        b = base + points.length,
        c = base + points.length + 1,
        d = base + 1;
      indices.push(a, b, d), indices.push(c, d, b);
    }
    this.setIndex(indices), this.setAttribute("position", new Float32BufferAttribute(vertices, 3)), this.setAttribute("uv", new Float32BufferAttribute(uvs, 2)), this.setAttribute("normal", new Float32BufferAttribute(normals, 3));
  }
  copy(source) {
    return super.copy(source), this.parameters = Object.assign({}, source.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {LatheGeometry} A new instance.
   */
  static fromJSON(data) {
    return new LatheGeometry(data.points, data.segments, data.phiStart, data.phiLength);
  }
}
/**
 * A geometry class for representing an octahedron.
 *
 * ```js
 * const geometry = new THREE.OctahedronGeometry();
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const octahedron = new THREE.Mesh( geometry, material );
 * scene.add( octahedron );
 * ```
 *
 * @augments PolyhedronGeometry
 * @demo scenes/geometry-browser.html#OctahedronGeometry
 */
class OctahedronGeometry extends PolyhedronGeometry {
  /* 6 个轴向 ±1 种子顶点、8 个三角面，radius/detail 传父类；参数及 type 记录为 OctahedronGeometry。不是直接生成经纬线球，detail=0 保留三角面法线。 */
  constructor(e = 1, t = 0) {
    super([1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2], e, t), this.type = "OctahedronGeometry", this.parameters = {
      radius: e,
      detail: t
    };
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {OctahedronGeometry} A new instance.
   */
  static fromJSON(data) {
    return new OctahedronGeometry(data.radius, data.detail);
  }
}
/**
 * A geometry class for representing a plane.
 *
 * ```js
 * const geometry = new THREE.PlaneGeometry( 1, 1 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
 * const plane = new THREE.Mesh( geometry, material );
 * scene.add( plane );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#PlaneGeometry
 */
class PlaneGeometry extends BufferGeometry {
  constructor(width = 1, height = 1, widthSegments = 1, heightSegments = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: width,
      height: height,
      widthSegments: widthSegments,
      heightSegments: heightSegments
    };
    const width_half = width / 2,
      height_half = height / 2,
      gridX = Math.floor(widthSegments),
      gridY = Math.floor(heightSegments),
      gridX1 = gridX + 1,
      gridY1 = gridY + 1,
      segment_width = width / gridX,
      segment_height = height / gridY,
      indices = [],
      vertices = [],
      normals = [],
      uvs = [];
    for (let iy = 0; iy < gridY1; iy++) {
      const y = iy * segment_height - height_half;
      for (let ix = 0; ix < gridX1; ix++) {
        const x = ix * segment_width - width_half;
        vertices.push(x, -y, 0), normals.push(0, 0, 1), uvs.push(ix / gridX), uvs.push(1 - iy / gridY);
      }
    }
    for (let iy = 0; iy < gridY; iy++) for (let ix = 0; ix < gridX; ix++) {
      const a = ix + gridX1 * iy,
        b = ix + gridX1 * (iy + 1),
        c = ix + 1 + gridX1 * (iy + 1),
        d = ix + 1 + gridX1 * iy;
      indices.push(a, b, d), indices.push(b, c, d);
    }
    this.setIndex(indices), this.setAttribute("position", new Float32BufferAttribute(vertices, 3)), this.setAttribute("normal", new Float32BufferAttribute(normals, 3)), this.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  }
  copy(source) {
    return super.copy(source), this.parameters = Object.assign({}, source.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {PlaneGeometry} A new instance.
   */
  static fromJSON(data) {
    return new PlaneGeometry(data.width, data.height, data.widthSegments, data.heightSegments);
  }
}
/**
 * A class for generating a two-dimensional ring geometry.
 *
 * ```js
 * const geometry = new THREE.RingGeometry( 1, 5, 32 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
 * const mesh = new THREE.Mesh( geometry, material );
 * scene.add( mesh );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#RingGeometry
 */
class RingGeometry extends BufferGeometry {
  /* innerRadius=.5/outerRadius=1、thetaSegments>=3、phiSegments>=1、thetaStart/Length 定义 XY 平面的扇形环。半径按 phi 线性增长，每行 theta+1 顶点，法线固定+Z，UV 以 outerRadius 归一到中心 .5；每格两个索引三角形。不 floor 这两个分段参数，不验证 outerRadius 非零或半径顺序。 */
  constructor(e = .5, t = 1, n = 32, r = 1, i = 0, a = 2 * Math.PI) {
    super(), this.type = "RingGeometry", this.parameters = {
      innerRadius: e,
      outerRadius: t,
      thetaSegments: n,
      phiSegments: r,
      thetaStart: i,
      thetaLength: a
    }, n = Math.max(3, n);
    const s = [],
      o = [],
      c = [],
      l = [];
    let u = e;
    const d = (t - e) / (r = Math.max(1, r)),
      h = new Vector3(),
      p = new Vector2();
    for (let e = 0; e <= r; e++) {
      for (let e = 0; e <= n; e++) {
        const r = i + e / n * a;
        h.x = u * Math.cos(r), h.y = u * Math.sin(r), o.push(h.x, h.y, h.z), c.push(0, 0, 1), p.x = (h.x / t + 1) / 2, p.y = (h.y / t + 1) / 2, l.push(p.x, p.y);
      }
      u += d;
    }
    for (let e = 0; e < r; e++) {
      const t = e * (n + 1);
      for (let e = 0; e < n; e++) {
        const r = e + t,
          i = r,
          a = r + n + 1,
          o = r + n + 2,
          c = r + 1;
        s.push(i, a, c), s.push(a, o, c);
      }
    }
    this.setIndex(s), this.setAttribute("position", new Float32BufferAttribute(o, 3)), this.setAttribute("normal", new Float32BufferAttribute(c, 3)), this.setAttribute("uv", new Float32BufferAttribute(l, 2));
  }
  copy(source) {
    return super.copy(source), this.parameters = Object.assign({}, source.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {RingGeometry} A new instance.
   */
  static fromJSON(data) {
    return new RingGeometry(data.innerRadius, data.outerRadius, data.thetaSegments, data.phiSegments, data.thetaStart, data.thetaLength);
  }
}
/**
 * Creates an one-sided polygonal geometry from one or more path shapes.
 *
 * ```js
 * const arcShape = new THREE.Shape()
 *	.moveTo( 5, 1 )
 *	.absarc( 1, 1, 4, 0, Math.PI * 2, false );
 *
 * const geometry = new THREE.ShapeGeometry( arcShape );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.DoubleSide } );
 * const mesh = new THREE.Mesh( geometry, material ) ;
 * scene.add( mesh );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#ShapeGeometry
 */
class ShapeGeometry extends BufferGeometry {
  constructor(shapes = new Shape([new Vector2(0, .5), new Vector2(-.5, -.5), new Vector2(.5, -.5)]), curveSegments = 12) {
    super(), this.type = "ShapeGeometry", this.parameters = {
      shapes: shapes,
      curveSegments: curveSegments
    };
    const indices = [],
      vertices = [],
      normals = [],
      uvs = [];
    let groupStart = 0,
      groupCount = 0;
    if (!1 === Array.isArray(shapes)) addShape(shapes);else for (let i = 0; i < shapes.length; i++) addShape(shapes[i]), this.addGroup(groupStart, groupCount, i), groupStart += groupCount, groupCount = 0;
    function addShape(shape) {
      const indexOffset = vertices.length / 3,
        points = shape.extractPoints(curveSegments);
      let shapeVertices = points.shape;
      const shapeHoles = points.holes;
      !1 === ShapeUtils.isClockWise(shapeVertices) && (shapeVertices = shapeVertices.reverse());
      for (let i = 0, l = shapeHoles.length; i < l; i++) {
        const shapeHole = shapeHoles[i];
        !0 === ShapeUtils.isClockWise(shapeHole) && (shapeHoles[i] = shapeHole.reverse());
      }
      const faces = ShapeUtils.triangulateShape(shapeVertices, shapeHoles);
      for (let i = 0, l = shapeHoles.length; i < l; i++) {
        const shapeHole = shapeHoles[i];
        shapeVertices = shapeVertices.concat(shapeHole);
      }
      for (let i = 0, l = shapeVertices.length; i < l; i++) {
        const vertex = shapeVertices[i];
        vertices.push(vertex.x, vertex.y, 0), normals.push(0, 0, 1), uvs.push(vertex.x, vertex.y);
      }
      for (let i = 0, l = faces.length; i < l; i++) {
        const face = faces[i],
          a = face[0] + indexOffset,
          b = face[1] + indexOffset,
          c = face[2] + indexOffset;
        indices.push(a, b, c), groupCount += 3;
      }
    }
    this.setIndex(indices), this.setAttribute("position", new Float32BufferAttribute(vertices, 3)), this.setAttribute("normal", new Float32BufferAttribute(normals, 3)), this.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  }
  copy(source) {
    return super.copy(source), this.parameters = Object.assign({}, source.parameters), this;
  }
  /* 在 super.toJSON 结果中填 shapes UUID 数组，单 Shape 同样转为数组。不会复制曲线数据或洞坐标；反序列化需要外部 shapes 字典。与 Extrude 的区别是不包含 options/extrudePath。 */
  toJSON() {
    const e = super.toJSON();
    return function (e, t) {
      if (t.shapes = [], Array.isArray(e)) for (let n = 0, r = e.length; n < r; n++) {
        const r = e[n];
        t.shapes.push(r.uuid);
      } else t.shapes.push(e.uuid);
      return t;
    }(this.parameters.shapes, e);
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @param {Array<Shape>} shapes - An array of shapes.
   * @return {ShapeGeometry} A new instance.
   */
  static fromJSON(data, shapes) {
    const geometryShapes = [];
    for (let j = 0, jl = data.shapes.length; j < jl; j++) {
      const shape = shapes[data.shapes[j]];
      geometryShapes.push(shape);
    }
    return new ShapeGeometry(geometryShapes, data.curveSegments);
  }
}
/**
 * A class for generating a sphere geometry.
 *
 * ```js
 * const geometry = new THREE.SphereGeometry( 15, 32, 16 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const sphere = new THREE.Mesh( geometry, material );
 * scene.add( sphere );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#SphereGeometry
 */
class SphereGeometry extends BufferGeometry {
  constructor(radius = 1, widthSegments = 32, heightSegments = 16, phiStart = 0, phiLength = 2 * Math.PI, thetaStart = 0, thetaLength = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = {
      radius: radius,
      widthSegments: widthSegments,
      heightSegments: heightSegments,
      phiStart: phiStart,
      phiLength: phiLength,
      thetaStart: thetaStart,
      thetaLength: thetaLength
    }, widthSegments = Math.max(3, Math.floor(widthSegments)), heightSegments = Math.max(2, Math.floor(heightSegments));
    const thetaEnd = Math.min(thetaStart + thetaLength, Math.PI);
    let index = 0;
    const grid = [],
      vertex = new Vector3(),
      normal = new Vector3(),
      indices = [],
      vertices = [],
      normals = [],
      uvs = [];
    for (let iy = 0; iy <= heightSegments; iy++) {
      const verticesRow = [],
        v = iy / heightSegments,
        theta = thetaStart + v * thetaLength,
        y = radius * Math.cos(theta),
        ringRadius = Math.sqrt(radius * radius - y * y);
      let uOffset = 0;
      0 === iy && 0 === thetaStart ? uOffset = .5 / widthSegments : iy === heightSegments && thetaEnd === Math.PI && (uOffset = -.5 / widthSegments);
      for (let ix = 0; ix <= widthSegments; ix++) {
        const u = ix / widthSegments,
          phi = phiStart + u * phiLength;
        vertex.x = -ringRadius * Math.cos(phi), vertex.y = y, vertex.z = ringRadius * Math.sin(phi), vertices.push(vertex.x, vertex.y, vertex.z), normal.copy(vertex).normalize(), normals.push(normal.x, normal.y, normal.z), uvs.push(u + uOffset, 1 - v), verticesRow.push(index++);
      }
      grid.push(verticesRow);
    }
    for (let iy = 0; iy < heightSegments; iy++) for (let ix = 0; ix < widthSegments; ix++) {
      const a = grid[iy][ix + 1],
        b = grid[iy][ix],
        c = grid[iy + 1][ix],
        d = grid[iy + 1][ix + 1];
      (0 !== iy || thetaStart > 0) && indices.push(a, b, d), (iy !== heightSegments - 1 || thetaEnd < Math.PI) && indices.push(b, c, d);
    }
    this.setIndex(indices), this.setAttribute("position", new Float32BufferAttribute(vertices, 3)), this.setAttribute("normal", new Float32BufferAttribute(normals, 3)), this.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  }
  copy(source) {
    return super.copy(source), this.parameters = Object.assign({}, source.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {SphereGeometry} A new instance.
   */
  static fromJSON(data) {
    return new SphereGeometry(data.radius, data.widthSegments, data.heightSegments, data.phiStart, data.phiLength, data.thetaStart, data.thetaLength);
  }
}
/**
 * A geometry class for representing an tetrahedron.
 *
 * ```js
 * const geometry = new THREE.TetrahedronGeometry();
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const tetrahedron = new THREE.Mesh( geometry, material );
 * scene.add( tetrahedron );
 * ```
 *
 * @augments PolyhedronGeometry
 * @demo scenes/geometry-browser.html#TetrahedronGeometry
 */
class TetrahedronGeometry extends PolyhedronGeometry {
  /* 4 个交错立方角种子顶点、4 个三角面，调用 PolyhedronGeometry(radius,detail)，再设置自身 type 与 parameters。与 Octahedron/ Icosahedron / Dodecahedron 的顶点面数逐项不同。 */
  constructor(e = 1, t = 0) {
    super([1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], e, t), this.type = "TetrahedronGeometry", this.parameters = {
      radius: e,
      detail: t
    };
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {TetrahedronGeometry} A new instance.
   */
  static fromJSON(data) {
    return new TetrahedronGeometry(data.radius, data.detail);
  }
}
/**
 * A geometry class for representing an torus.
 *
 * ```js
 * const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const torus = new THREE.Mesh( geometry, material );
 * scene.add( torus );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#TorusGeometry
 */
class TorusGeometry extends BufferGeometry {
  constructor(radius = 1, tube = .4, radialSegments = 12, tubularSegments = 48, arc = 2 * Math.PI, thetaStart = 0, thetaLength = 2 * Math.PI) {
    super(), this.type = "TorusGeometry", this.parameters = {
      radius: radius,
      tube: tube,
      radialSegments: radialSegments,
      tubularSegments: tubularSegments,
      arc: arc,
      thetaStart: thetaStart,
      thetaLength: thetaLength
    }, radialSegments = Math.floor(radialSegments), tubularSegments = Math.floor(tubularSegments);
    const indices = [],
      vertices = [],
      normals = [],
      uvs = [],
      center = new Vector3(),
      vertex = new Vector3(),
      normal = new Vector3();
    for (let j = 0; j <= radialSegments; j++) {
      const v = thetaStart + j / radialSegments * thetaLength;
      for (let i = 0; i <= tubularSegments; i++) {
        const u = i / tubularSegments * arc;
        vertex.x = (radius + tube * Math.cos(v)) * Math.cos(u), vertex.y = (radius + tube * Math.cos(v)) * Math.sin(u), vertex.z = tube * Math.sin(v), vertices.push(vertex.x, vertex.y, vertex.z), center.x = radius * Math.cos(u), center.y = radius * Math.sin(u), normal.subVectors(vertex, center).normalize(), normals.push(normal.x, normal.y, normal.z), uvs.push(i / tubularSegments), uvs.push(j / radialSegments);
      }
    }
    for (let j = 1; j <= radialSegments; j++) for (let i = 1; i <= tubularSegments; i++) {
      const a = (tubularSegments + 1) * j + i - 1,
        b = (tubularSegments + 1) * (j - 1) + i - 1,
        c = (tubularSegments + 1) * (j - 1) + i,
        d = (tubularSegments + 1) * j + i;
      indices.push(a, b, d), indices.push(b, c, d);
    }
    this.setIndex(indices), this.setAttribute("position", new Float32BufferAttribute(vertices, 3)), this.setAttribute("normal", new Float32BufferAttribute(normals, 3)), this.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  }
  copy(source) {
    return super.copy(source), this.parameters = Object.assign({}, source.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {TorusGeometry} A new instance.
   */
  static fromJSON(data) {
    return new TorusGeometry(data.radius, data.tube, data.radialSegments, data.tubularSegments, data.arc);
  }
}
/**
 * Creates a torus knot, the particular shape of which is defined by a pair
 * of coprime integers, p and q. If p and q are not coprime, the result will
 * be a torus link.
 *
 * ```js
 * const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
 * const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
 * const torusKnot = new THREE.Mesh( geometry, material );
 * scene.add( torusKnot );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#TorusKnotGeometry
 */
class TorusKnotGeometry extends BufferGeometry {
  constructor(radius = 1, tube = .4, tubularSegments = 64, radialSegments = 8, p = 2, q = 3) {
    super(), this.type = "TorusKnotGeometry", this.parameters = {
      radius: radius,
      tube: tube,
      tubularSegments: tubularSegments,
      radialSegments: radialSegments,
      p: p,
      q: q
    }, tubularSegments = Math.floor(tubularSegments), radialSegments = Math.floor(radialSegments);
    const indices = [],
      vertices = [],
      normals = [],
      uvs = [],
      vertex = new Vector3(),
      normal = new Vector3(),
      P1 = new Vector3(),
      P2 = new Vector3(),
      B = new Vector3(),
      T = new Vector3(),
      N = new Vector3();
    for (let i = 0; i <= tubularSegments; ++i) {
      const u = i / tubularSegments * p * Math.PI * 2;
      calculatePositionOnCurve(u, p, q, radius, P1), calculatePositionOnCurve(u + .01, p, q, radius, P2), T.subVectors(P2, P1), N.addVectors(P2, P1), B.crossVectors(T, N), N.crossVectors(B, T), B.normalize(), N.normalize();
      for (let j = 0; j <= radialSegments; ++j) {
        const v = j / radialSegments * Math.PI * 2,
          cx = -tube * Math.cos(v),
          cy = tube * Math.sin(v);
        vertex.x = P1.x + (cx * N.x + cy * B.x), vertex.y = P1.y + (cx * N.y + cy * B.y), vertex.z = P1.z + (cx * N.z + cy * B.z), vertices.push(vertex.x, vertex.y, vertex.z), normal.subVectors(vertex, P1).normalize(), normals.push(normal.x, normal.y, normal.z), uvs.push(i / tubularSegments), uvs.push(j / radialSegments);
      }
    }
    for (let j = 1; j <= tubularSegments; j++) for (let i = 1; i <= radialSegments; i++) {
      const a = (radialSegments + 1) * (j - 1) + (i - 1),
        b = (radialSegments + 1) * j + (i - 1),
        c = (radialSegments + 1) * j + i,
        d = (radialSegments + 1) * (j - 1) + i;
      indices.push(a, b, d), indices.push(b, c, d);
    }
    function calculatePositionOnCurve(u, p, q, radius, position) {
      const cu = Math.cos(u),
        su = Math.sin(u),
        quOverP = q / p * u,
        cs = Math.cos(quOverP);
      position.x = radius * (2 + cs) * .5 * cu, position.y = radius * (2 + cs) * su * .5, position.z = radius * Math.sin(quOverP) * .5;
    }
    this.setIndex(indices), this.setAttribute("position", new Float32BufferAttribute(vertices, 3)), this.setAttribute("normal", new Float32BufferAttribute(normals, 3)), this.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  }
  copy(source) {
    return super.copy(source), this.parameters = Object.assign({}, source.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {TorusKnotGeometry} A new instance.
   */
  static fromJSON(data) {
    return new TorusKnotGeometry(data.radius, data.tube, data.tubularSegments, data.radialSegments, data.p, data.q);
  }
}
/**
 * Creates a tube that extrudes along a 3D curve.
 *
 * ```js
 * class CustomSinCurve extends THREE.Curve {
 *
 * 	getPoint( t, optionalTarget = new THREE.Vector3() ) {
 *
 * 		const tx = t * 3 - 1.5;
 * 		const ty = Math.sin( 2 * Math.PI * t );
 * 		const tz = 0;
 *
 * 		return optionalTarget.set( tx, ty, tz );
 * 	}
 *
 * }
 *
 * const path = new CustomSinCurve( 10 );
 * const geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
 * const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 * const mesh = new THREE.Mesh( geometry, material );
 * scene.add( mesh );
 * ```
 *
 * @augments BufferGeometry
 * @demo scenes/geometry-browser.html#TubeGeometry
 */
class TubeGeometry extends BufferGeometry {
  /* path、tubularSegments=64、radius=1、radialSegments=8、closed=false。沿 path.getPointAt（弧长参数）采样，Frenet normals/binormals 组合 -cos 和 sin 得径向法线，顶点=路径点+radius*法线；每圈重复 seam 顶点。this.tangents/normals/binormals 持有 frame 数组，输入 path 保留引用。 */
  constructor(e = new QuadraticBezierCurve3(new Vector3(-1, -1, 0), new Vector3(-1, 1, 0), new Vector3(1, 1, 0)), t = 64, n = 1, r = 8, i = !1) {
    super(), this.type = "TubeGeometry", this.parameters = {
      path: e,
      tubularSegments: t,
      radius: n,
      radialSegments: r,
      closed: i
    };
    const a = e.computeFrenetFrames(t, i);
    this.tangents = a.tangents, this.normals = a.normals, this.binormals = a.binormals;
    const s = new Vector3(),
      o = new Vector3(),
      c = new Vector2();
    let l = new Vector3();
    const u = [],
      d = [],
      h = [],
      p = [];
    function f(i) {
      l = e.getPointAt(i / t, l);
      const c = a.normals[i],
        h = a.binormals[i];
      for (let e = 0; e <= r; e++) {
        const t = e / r * Math.PI * 2,
          i = Math.sin(t),
          a = -Math.cos(t);
        o.x = a * c.x + i * h.x, o.y = a * c.y + i * h.y, o.z = a * c.z + i * h.z, o.normalize(), d.push(o.x, o.y, o.z), s.x = l.x + n * o.x, s.y = l.y + n * o.y, s.z = l.z + n * o.z, u.push(s.x, s.y, s.z);
      }
    }
    !function () {
      for (let e = 0; e < t; e++) f(e);
      f(!1 === i ? t : 0), function () {
        for (let e = 0; e <= t; e++) for (let n = 0; n <= r; n++) c.x = e / t, c.y = n / r, h.push(c.x, c.y);
      }(), function () {
        for (let e = 1; e <= t; e++) for (let t = 1; t <= r; t++) {
          const n = (r + 1) * (e - 1) + (t - 1),
            i = (r + 1) * e + (t - 1),
            a = (r + 1) * e + t,
            s = (r + 1) * (e - 1) + t;
          p.push(n, i, s), p.push(i, a, s);
        }
      }();
    }(), this.setIndex(p), this.setAttribute("position", new Float32BufferAttribute(u, 3)), this.setAttribute("normal", new Float32BufferAttribute(d, 3)), this.setAttribute("uv", new Float32BufferAttribute(h, 2));
  }
  copy(source) {
    return super.copy(source), this.parameters = Object.assign({}, source.parameters), this;
  }
  toJSON() {
    const data = super.toJSON();
    return data.path = this.parameters.path.toJSON(), data;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {TubeGeometry} A new instance.
   */
  static fromJSON(data) {
    return new TubeGeometry(new Curves[data.path.type]().fromJSON(data.path), data.tubularSegments, data.radius, data.radialSegments, data.closed);
  }
}
/**
 * Can be used as a helper object to visualize a geometry as a wireframe.
 *
 * ```js
 * const geometry = new THREE.SphereGeometry();
 *
 * const wireframe = new THREE.WireframeGeometry( geometry );
 *
 * const line = new THREE.LineSegments( wireframe );
 * line.material.depthWrite = false;
 * line.material.opacity = 0.25;
 * line.material.transparent = true;
 *
 * scene.add( line );
 * ```
 *
 * Note: It is not yet possible to serialize/deserialize instances of this class.
 *
 * @augments BufferGeometry
 */
class WireframeGeometry extends BufferGeometry {
  /* 对 indexed geometry 按 groups（空则全范围）、non-indexed 按每三位置为面，提取三条边。Yo 用两端点完整坐标字符串同时记录正反 hash，首次边才输出两个顶点；不进行角阈值或 1e-4 焊接。结果自有非索引 position；geometry=null 生成空对象。 */
  constructor(e = null) {
    if (super(), this.type = "WireframeGeometry", this.parameters = {
      geometry: e
    }, null !== e) {
      const t = [],
        set = new Set(),
        r = new Vector3(),
        i = new Vector3();
      if (null !== e.index) {
        const a = e.attributes.position,
          s = e.index;
        let o = e.groups;
        0 === o.length && (o = [{
          start: 0,
          count: s.count,
          materialIndex: 0
        }]);
        for (let e = 0, c = o.length; e < c; ++e) {
          const c = o[e],
            l = c.start;
          for (let e = l, o = l + c.count; e < o; e += 3) for (let o = 0; o < 3; o++) {
            const c = s.getX(e + o),
              l = s.getX(e + (o + 1) % 3);
            r.fromBufferAttribute(a, c), i.fromBufferAttribute(a, l), !0 === isUniqueEdge(r, i, set) && (t.push(r.x, r.y, r.z), t.push(i.x, i.y, i.z));
          }
        }
      } else {
        const a = e.attributes.position;
        for (let e = 0, s = a.count / 3; e < s; e++) for (let s = 0; s < 3; s++) {
          const o = 3 * e + s,
            c = 3 * e + (s + 1) % 3;
          r.fromBufferAttribute(a, o), i.fromBufferAttribute(a, c), !0 === isUniqueEdge(r, i, set) && (t.push(r.x, r.y, r.z), t.push(i.x, i.y, i.z));
        }
      }
      this.setAttribute("position", new Float32BufferAttribute(t, 3));
    }
  }
  copy(source) {
    return super.copy(source), this.parameters = Object.assign({}, source.parameters), this;
  }
}
/* 人工身份合同：将三维端点序列化为正反向字符串键，查询并写入 Set 以排除重复边。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function isUniqueEdge(e, t, n) {
  const r = `${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`,
    i = `${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;
  return !0 !== n.has(r) && !0 !== n.has(i) && (n.add(r), n.add(i), !0);
}
var Wo = Object.freeze({
  __proto__: null,
  BoxGeometry: BoxGeometry,
  CapsuleGeometry: CapsuleGeometry,
  CircleGeometry: CircleGeometry,
  ConeGeometry: ConeGeometry,
  CylinderGeometry: CylinderGeometry,
  DodecahedronGeometry: DodecahedronGeometry,
  EdgesGeometry: EdgesGeometry,
  ExtrudeGeometry: ExtrudeGeometry,
  IcosahedronGeometry: IcosahedronGeometry,
  LatheGeometry: LatheGeometry,
  OctahedronGeometry: OctahedronGeometry,
  PlaneGeometry: PlaneGeometry,
  PolyhedronGeometry: PolyhedronGeometry,
  RingGeometry: RingGeometry,
  ShapeGeometry: ShapeGeometry,
  SphereGeometry: SphereGeometry,
  TetrahedronGeometry: TetrahedronGeometry,
  TorusGeometry: TorusGeometry,
  TorusKnotGeometry: TorusKnotGeometry,
  TubeGeometry: TubeGeometry,
  WireframeGeometry: WireframeGeometry
});
/**
 * This material can receive shadows, but otherwise is completely transparent.
 *
 * ```js
 * const geometry = new THREE.PlaneGeometry( 2000, 2000 );
 * geometry.rotateX( - Math.PI / 2 );
 *
 * const material = new THREE.ShadowMaterial();
 * material.opacity = 0.2;
 *
 * const plane = new THREE.Mesh( geometry, material );
 * plane.position.y = -200;
 * plane.receiveShadow = true;
 * scene.add( plane );
 * ```
 *
 * @augments Material
 */
class ShadowMaterial extends Material {
  constructor(parameters) {
    super(), this.isShadowMaterial = !0, this.type = "ShadowMaterial", this.color = new Color(0), this.transparent = !0, this.fog = !0, this.setValues(parameters);
  }
  copy(source) {
    return super.copy(source), this.color.copy(source.color), this.fog = source.fog, this;
  }
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：cloneUniforms。复制 uniform 容器，并对受支持的 Three 对象调用 clone，避免共享可变数学对象。 */
function cloneUniforms(src) {
  const dst = {};
  for (const u in src) {
    dst[u] = {};
    for (const p in src[u]) {
      const property = src[u][p];
      if (isThreeObject(property)) property.isRenderTargetTexture ? (warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), dst[u][p] = null) : dst[u][p] = property.clone();else if (Array.isArray(property)) {
        if (isThreeObject(property[0])) {
          const clonedProperty = [];
          for (let i = 0, l = property.length; i < l; i++) clonedProperty[i] = property[i].clone();
          dst[u][p] = clonedProperty;
        } else dst[u][p] = property.slice();
      } else dst[u][p] = property;
    }
  }
  return dst;
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：mergeUniforms。依次克隆再合并 uniform 集合，后面的同名条目覆盖前面。 */
function mergeUniforms(uniforms) {
  const merged = {};
  for (let u = 0; u < uniforms.length; u++) {
    const tmp = cloneUniforms(uniforms[u]);
    for (const p in tmp) merged[p] = tmp[p];
  }
  return merged;
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：isThreeObject。 */
function isThreeObject(property) {
  return property && (property.isColor || property.isMatrix3 || property.isMatrix4 || property.isVector2 || property.isVector3 || property.isVector4 || property.isTexture || property.isQuaternion);
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：getUnlitUniformColorSpace。默认目标取输出色域，XR 目标取纹理色域，其他离屏目标取工作色域。 */
function getUnlitUniformColorSpace(renderer) {
  const currentRenderTarget = renderer.getRenderTarget();
  return null === currentRenderTarget ? renderer.outputColorSpace : !0 === currentRenderTarget.isXRRenderTarget ? currentRenderTarget.texture.colorSpace : ColorManagement.workingColorSpace;
}
const UniformsUtils = {
  clone: cloneUniforms,
  merge: mergeUniforms
};
class ShaderMaterial extends Material {
  /* 初始化新 defines/uniforms/uniformsGroups，默认顶点 shader 为投影*modelView*position、片元为不透明红色；line/wireframe 默认宽1，fog/lights/clipping=false，forceSinglePass=true。extensions 两个布尔开关默认false，缺省 color=[1,1,1]、uv/uv1=[0,0]，glslVersion=null。官方引用默认 shader 常量，本地内嵌同样文字。 */
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      multiDraw: !1
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, void 0 !== e && this.setValues(e);
  }
  /* 先父类复制；uniforms 用 cloneUniforms，uniformsGroups 每组.clone，避免这些容器直接共享；defines/extensions/defaultAttributeValues 仅 Object.assign 浅拷贝（嵌套缺省数组仍共享）。shader 字符串与线框、灯光、裁剪、GLSL 等标志赋值，返回 this。不能把“copy”描述为所有纹理和数组均深拷贝。 */
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = cloneUniforms(e.uniforms), this.uniformsGroups = function (e) {
      const t = [];
      for (let n = 0; n < e.length; n++) t.push(e[n].clone());
      return t;
    }(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
  }
  /* 为每个 uniform.value 按 Texture/Color/Vector2/3/4/Matrix3/4 写 type t/c/v2/v3/v4/m3/m4 与 UUID/hex/数组，其余保留 value。纹理通过 toJSON(meta) 进入资源缓存。非空 defines、shader 字符串、lights/clipping 与仅 true 的 extensions 保存；返回父结果扩展对象，不保存 uniform 的其他任意字段。 */
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const n in this.uniforms) {
      const r = this.uniforms[n].value;
      r && r.isTexture ? t.uniforms[n] = {
        type: "t",
        value: r.toJSON(e).uuid
      } : r && r.isColor ? t.uniforms[n] = {
        type: "c",
        value: r.getHex()
      } : r && r.isVector2 ? t.uniforms[n] = {
        type: "v2",
        value: r.toArray()
      } : r && r.isVector3 ? t.uniforms[n] = {
        type: "v3",
        value: r.toArray()
      } : r && r.isVector4 ? t.uniforms[n] = {
        type: "v4",
        value: r.toArray()
      } : r && r.isMatrix3 ? t.uniforms[n] = {
        type: "m3",
        value: r.toArray()
      } : r && r.isMatrix4 ? t.uniforms[n] = {
        type: "m4",
        value: r.toArray()
      } : t.uniforms[n] = {
        value: r
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const n = {};
    for (const e in this.extensions) !0 === this.extensions[e] && (n[e] = !0);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
  /* 先父类恢复；按 uniform type 新建 Color/向量/矩阵，texture 按传入纹理 UUID 字典取共享引用，缺失为 null；无 type 直接赋 value。可选 defines 直接引用 json 对象，extensions 合并现有对象，shader/glsl/lights/clipping 有字段才替换。返回 this，不清除 JSON 未列出的已有 uniforms。 */
  fromJSON(e, t) {
    if (super.fromJSON(e, t), void 0 !== e.uniforms) for (const n in e.uniforms) {
      const r = e.uniforms[n];
      switch (this.uniforms[n] = {}, r.type) {
        case "t":
          this.uniforms[n].value = t[r.value] || null;
          break;
        case "c":
          this.uniforms[n].value = new Color().setHex(r.value);
          break;
        case "v2":
          this.uniforms[n].value = new Vector2().fromArray(r.value);
          break;
        case "v3":
          this.uniforms[n].value = new Vector3().fromArray(r.value);
          break;
        case "v4":
          this.uniforms[n].value = new Vector4().fromArray(r.value);
          break;
        case "m3":
          this.uniforms[n].value = new Matrix3().fromArray(r.value);
          break;
        case "m4":
          this.uniforms[n].value = new Matrix4().fromArray(r.value);
          break;
        default:
          this.uniforms[n].value = r.value;
      }
    }
    if (void 0 !== e.defines && (this.defines = e.defines), void 0 !== e.vertexShader && (this.vertexShader = e.vertexShader), void 0 !== e.fragmentShader && (this.fragmentShader = e.fragmentShader), void 0 !== e.glslVersion && (this.glslVersion = e.glslVersion), void 0 !== e.extensions) for (const t in e.extensions) this.extensions[t] = e.extensions[t];
    return void 0 !== e.lights && (this.lights = e.lights), void 0 !== e.clipping && (this.clipping = e.clipping), this;
  }
}
class RawShaderMaterial extends ShaderMaterial {
  constructor(parameters) {
    super(parameters), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}
class MeshStandardMaterial extends Material {
  /* STANDARD define，白 color、roughness=1、metalness=0、黑 emissive；所有 map 默认null，normalScale=(1,1)，切线空间 normalMap，displacementScale=1/bias=0，光照/环境强度1，独有 envMapRotation Euler，fog=true、wireframe/flatShading=false。setValues 应用参数；不是在构造时加载或拥有贴图像素。 */
  constructor(e) {
    super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = {
      STANDARD: ""
    }, this.color = new Color(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Color(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = TangentSpaceNormalMap, this.normalScale = new Vector2(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Euler(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  /* 重置 STANDARD define，color/emissive/normalScale/envMapRotation 使用已有对象.copy 保持目的引用；map、lightMap、aoMap、emissiveMap、normal/roughness/metalness/alpha/env 等纹理字段直接共享源引用。数值/线框/fog 标志赋值并返回 this；不会 clone 或 dispose 贴图。 */
  copy(e) {
    return super.copy(e), this.defines = {
      STANDARD: ""
    }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
/**
 * An extension of the {@link MeshStandardMaterial}, providing more advanced
 * physically-based rendering properties:
 *
 * - Anisotropy: Ability to represent the anisotropic property of materials
 * as observable with brushed metals.
 * - Clearcoat: Some materials — like car paints, carbon fiber, and wet surfaces — require
 * a clear, reflective layer on top of another layer that may be irregular or rough.
 * Clearcoat approximates this effect, without the need for a separate transparent surface.
 * - Iridescence: Allows to render the effect where hue varies  depending on the viewing
 * angle and illumination angle. This can be seen on soap bubbles, oil films, or on the
 * wings of many insects.
 * - Physically-based transparency: One limitation of {@link Material#opacity} is that highly
 * transparent materials are less reflective. Physically-based transmission provides a more
 * realistic option for thin, transparent surfaces like glass.
 * - Advanced reflectivity: More flexible reflectivity for non-metallic materials.
 * - Sheen: Can be used for representing cloth and fabric materials.
 *
 * As a result of these complex shading features, `MeshPhysicalMaterial` has a
 * higher performance cost, per pixel, than other three.js materials. Most
 * effects are disabled by default, and add cost as they are enabled. For
 * best results, always specify an environment map when using this material.
 *
 * @augments MeshStandardMaterial
 * @demo scenes/material-browser.html#MeshPhysicalMaterial
 */
class MeshPhysicalMaterial extends MeshStandardMaterial {
  /* 基于 Standard，增加 STANDARD+PHYSICAL，ior=1.5、reflectivity getter=clamp(2.5*(ior-1)/(ior+1),0,1)，setter 反算 ior。薄膜 IOR=1.3、厚度范围[100,400]，clearcoatNormalScale=(1,1)、sheenColor黑、attenuationColor/specularColor白、attenuationDistance=Infinity；内部 anisotropy/clearcoat/dispersion/iridescence/sheen/transmission 初值0，maps 为null，最后 setValues。反射率不是独立存储字段。 */
  constructor(e) {
    super(), this.isMeshPhysicalMaterial = !0, this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.type = "MeshPhysicalMaterial", this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new Vector2(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
      get: function () {
        return clamp(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
      },
      set: function (e) {
        this.ior = (1 + .4 * e) / (1 - .4 * e);
      }
    }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new Color(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 1 / 0, this.attenuationColor = new Color(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new Color(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._dispersion = 0, this._iridescence = 0, this._sheen = 0, this._transmission = 0, this.setValues(e);
  }
  get anisotropy() {
    return this._anisotropy;
  }
  set anisotropy(value) {
    this._anisotropy > 0 != value > 0 && this.version++, this._anisotropy = value;
  }
  get clearcoat() {
    return this._clearcoat;
  }
  set clearcoat(value) {
    this._clearcoat > 0 != value > 0 && this.version++, this._clearcoat = value;
  }
  get iridescence() {
    return this._iridescence;
  }
  set iridescence(value) {
    this._iridescence > 0 != value > 0 && this.version++, this._iridescence = value;
  }
  get dispersion() {
    return this._dispersion;
  }
  set dispersion(value) {
    this._dispersion > 0 != value > 0 && this.version++, this._dispersion = value;
  }
  get sheen() {
    return this._sheen;
  }
  set sheen(value) {
    this._sheen > 0 != value > 0 && this.version++, this._sheen = value;
  }
  get transmission() {
    return this._transmission;
  }
  set transmission(value) {
    this._transmission > 0 != value > 0 && this.version++, this._transmission = value;
  }
  /* 先 Standard.copy，重置两 define；通过公开属性赋 anisotropy/clearcoat/dispersion/iridescence/sheen/transmission（会走各 setter），复制 ior、厚度、衰减与 specular 标量。颜色与 clearcoatNormalScale 用 copy，iridescenceThicknessRange 展开成新数组，所有 map 共享引用。返回 this，不把整个物理材质字段统称深拷贝。 */
  copy(e) {
    return super.copy(e), this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.anisotropy = e.anisotropy, this.anisotropyRotation = e.anisotropyRotation, this.anisotropyMap = e.anisotropyMap, this.clearcoat = e.clearcoat, this.clearcoatMap = e.clearcoatMap, this.clearcoatRoughness = e.clearcoatRoughness, this.clearcoatRoughnessMap = e.clearcoatRoughnessMap, this.clearcoatNormalMap = e.clearcoatNormalMap, this.clearcoatNormalScale.copy(e.clearcoatNormalScale), this.dispersion = e.dispersion, this.ior = e.ior, this.iridescence = e.iridescence, this.iridescenceMap = e.iridescenceMap, this.iridescenceIOR = e.iridescenceIOR, this.iridescenceThicknessRange = [...e.iridescenceThicknessRange], this.iridescenceThicknessMap = e.iridescenceThicknessMap, this.sheen = e.sheen, this.sheenColor.copy(e.sheenColor), this.sheenColorMap = e.sheenColorMap, this.sheenRoughness = e.sheenRoughness, this.sheenRoughnessMap = e.sheenRoughnessMap, this.transmission = e.transmission, this.transmissionMap = e.transmissionMap, this.thickness = e.thickness, this.thicknessMap = e.thicknessMap, this.attenuationDistance = e.attenuationDistance, this.attenuationColor.copy(e.attenuationColor), this.specularIntensity = e.specularIntensity, this.specularIntensityMap = e.specularIntensityMap, this.specularColor.copy(e.specularColor), this.specularColorMap = e.specularColorMap, this;
  }
}
/**
 * A material for shiny surfaces with specular highlights.
 *
 * The material uses a non-physically based [Blinn-Phong](https://en.wikipedia.org/wiki/Blinn-Phong_shading_model)
 * model for calculating reflectance. Unlike the Lambertian model used in the
 * {@link MeshLambertMaterial} this can simulate shiny surfaces with specular
 * highlights (such as varnished wood). `MeshPhongMaterial` uses per-fragment shading.
 *
 * Performance will generally be greater when using this material over the
 * {@link MeshStandardMaterial} or {@link MeshPhysicalMaterial}, at the cost of
 * some graphical accuracy.
 *
 * @augments Material
 * @demo scenes/material-browser.html#MeshPhongMaterial
 */
class MeshPhongMaterial extends Material {
  constructor(parameters) {
    super(), this.isMeshPhongMaterial = !0, this.type = "MeshPhongMaterial", this.color = new Color(16777215), this.specular = new Color(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Color(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = TangentSpaceNormalMap, this.normalScale = new Vector2(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Euler(), this.combine = MultiplyOperation, this.reflectivity = 1, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(parameters);
  }
  copy(source) {
    return super.copy(source), this.color.copy(source.color), this.specular.copy(source.specular), this.shininess = source.shininess, this.map = source.map, this.lightMap = source.lightMap, this.lightMapIntensity = source.lightMapIntensity, this.aoMap = source.aoMap, this.aoMapIntensity = source.aoMapIntensity, this.emissive.copy(source.emissive), this.emissiveMap = source.emissiveMap, this.emissiveIntensity = source.emissiveIntensity, this.bumpMap = source.bumpMap, this.bumpScale = source.bumpScale, this.normalMap = source.normalMap, this.normalMapType = source.normalMapType, this.normalScale.copy(source.normalScale), this.displacementMap = source.displacementMap, this.displacementScale = source.displacementScale, this.displacementBias = source.displacementBias, this.specularMap = source.specularMap, this.alphaMap = source.alphaMap, this.envMap = source.envMap, this.envMapRotation.copy(source.envMapRotation), this.combine = source.combine, this.reflectivity = source.reflectivity, this.envMapIntensity = source.envMapIntensity, this.refractionRatio = source.refractionRatio, this.wireframe = source.wireframe, this.wireframeLinewidth = source.wireframeLinewidth, this.wireframeLinecap = source.wireframeLinecap, this.wireframeLinejoin = source.wireframeLinejoin, this.flatShading = source.flatShading, this.fog = source.fog, this;
  }
}
/**
 * A material implementing toon shading.
 *
 * @augments Material
 * @demo scenes/material-browser.html#MeshToonMaterial
 */
class MeshToonMaterial extends Material {
  /* TOON define、白 color、黑 emissive，新增 gradientMap=null；保留 map/lightMap/ao/emissive/bump/normal/displacement/alpha 贴图字段与强度/尺度，normalScale=(1,1)，fog=true、wireframe=false，最后 setValues。没有 Standard 的 roughness/metalness/envMap 参数系统。 */
  constructor(e) {
    super(), this.isMeshToonMaterial = !0, this.defines = {
      TOON: ""
    }, this.type = "MeshToonMaterial", this.color = new Color(16777215), this.map = null, this.gradientMap = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Color(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = TangentSpaceNormalMap, this.normalScale = new Vector2(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.alphaMap = null, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(source) {
    return super.copy(source), this.color.copy(source.color), this.map = source.map, this.gradientMap = source.gradientMap, this.lightMap = source.lightMap, this.lightMapIntensity = source.lightMapIntensity, this.aoMap = source.aoMap, this.aoMapIntensity = source.aoMapIntensity, this.emissive.copy(source.emissive), this.emissiveMap = source.emissiveMap, this.emissiveIntensity = source.emissiveIntensity, this.bumpMap = source.bumpMap, this.bumpScale = source.bumpScale, this.normalMap = source.normalMap, this.normalMapType = source.normalMapType, this.normalScale.copy(source.normalScale), this.displacementMap = source.displacementMap, this.displacementScale = source.displacementScale, this.displacementBias = source.displacementBias, this.alphaMap = source.alphaMap, this.wireframe = source.wireframe, this.wireframeLinewidth = source.wireframeLinewidth, this.wireframeLinecap = source.wireframeLinecap, this.wireframeLinejoin = source.wireframeLinejoin, this.fog = source.fog, this;
  }
}
/**
 * A material that maps the normal vectors to RGB colors.
 *
 * @augments Material
 * @demo scenes/material-browser.html#MeshNormalMaterial
 */
class MeshNormalMaterial extends Material {
  constructor(parameters) {
    super(), this.isMeshNormalMaterial = !0, this.type = "MeshNormalMaterial", this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = TangentSpaceNormalMap, this.normalScale = new Vector2(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.flatShading = !1, this.setValues(parameters);
  }
  copy(source) {
    return super.copy(source), this.bumpMap = source.bumpMap, this.bumpScale = source.bumpScale, this.normalMap = source.normalMap, this.normalMapType = source.normalMapType, this.normalScale.copy(source.normalScale), this.displacementMap = source.displacementMap, this.displacementScale = source.displacementScale, this.displacementBias = source.displacementBias, this.wireframe = source.wireframe, this.wireframeLinewidth = source.wireframeLinewidth, this.flatShading = source.flatShading, this;
  }
}
/**
 * A material for non-shiny surfaces, without specular highlights.
 *
 * The material uses a non-physically based [Lambertian](https://en.wikipedia.org/wiki/Lambertian_reflectance)
 * model for calculating reflectance. This can simulate some surfaces (such
 * as untreated wood or stone) well, but cannot simulate shiny surfaces with
 * specular highlights (such as varnished wood). `MeshLambertMaterial` uses per-fragment
 * shading.
 *
 * Due to the simplicity of the reflectance and illumination models,
 * performance will be greater when using this material over the
 * {@link MeshPhongMaterial}, {@link MeshStandardMaterial} or
 * {@link MeshPhysicalMaterial}, at the cost of some graphical accuracy.
 *
 * @augments Material
 * @demo scenes/material-browser.html#MeshLambertMaterial
 */
class MeshLambertMaterial extends Material {
  constructor(parameters) {
    super(), this.isMeshLambertMaterial = !0, this.type = "MeshLambertMaterial", this.color = new Color(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Color(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = TangentSpaceNormalMap, this.normalScale = new Vector2(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Euler(), this.combine = MultiplyOperation, this.reflectivity = 1, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(parameters);
  }
  copy(source) {
    return super.copy(source), this.color.copy(source.color), this.map = source.map, this.lightMap = source.lightMap, this.lightMapIntensity = source.lightMapIntensity, this.aoMap = source.aoMap, this.aoMapIntensity = source.aoMapIntensity, this.emissive.copy(source.emissive), this.emissiveMap = source.emissiveMap, this.emissiveIntensity = source.emissiveIntensity, this.bumpMap = source.bumpMap, this.bumpScale = source.bumpScale, this.normalMap = source.normalMap, this.normalMapType = source.normalMapType, this.normalScale.copy(source.normalScale), this.displacementMap = source.displacementMap, this.displacementScale = source.displacementScale, this.displacementBias = source.displacementBias, this.specularMap = source.specularMap, this.alphaMap = source.alphaMap, this.envMap = source.envMap, this.envMapRotation.copy(source.envMapRotation), this.combine = source.combine, this.reflectivity = source.reflectivity, this.envMapIntensity = source.envMapIntensity, this.refractionRatio = source.refractionRatio, this.wireframe = source.wireframe, this.wireframeLinewidth = source.wireframeLinewidth, this.wireframeLinecap = source.wireframeLinecap, this.wireframeLinejoin = source.wireframeLinejoin, this.flatShading = source.flatShading, this.fog = source.fog, this;
  }
}
/**
 * A material for drawing geometry by depth. Depth is based off of the camera
 * near and far plane. White is nearest, black is farthest.
 *
 * @augments Material
 * @demo scenes/material-browser.html#MeshDepthMaterial
 */
class MeshDepthMaterial extends Material {
  constructor(parameters) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = BasicDepthPacking, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(parameters);
  }
  copy(source) {
    return super.copy(source), this.depthPacking = source.depthPacking, this.map = source.map, this.alphaMap = source.alphaMap, this.displacementMap = source.displacementMap, this.displacementScale = source.displacementScale, this.displacementBias = source.displacementBias, this.wireframe = source.wireframe, this.wireframeLinewidth = source.wireframeLinewidth, this;
  }
}
/**
 * A material used internally for implementing shadow mapping with
 * point lights.
 *
 * Can also be used to customize the shadow casting of an object by assigning
 * an instance of `MeshDistanceMaterial` to {@link Object3D#customDistanceMaterial}.
 * The following examples demonstrates this approach in order to ensure
 * transparent parts of objects do not cast shadows.
 *
 * @augments Material
 */
class MeshDistanceMaterial extends Material {
  constructor(parameters) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(parameters);
  }
  copy(source) {
    return super.copy(source), this.map = source.map, this.alphaMap = source.alphaMap, this.displacementMap = source.displacementMap, this.displacementScale = source.displacementScale, this.displacementBias = source.displacementBias, this;
  }
}
class MeshMatcapMaterial extends Material {
  /* MATCAP define，白 color，matcap 与 map/bump/normal/displacement/alphaMap 为null，切线空间法线与 normalScale=(1,1)，wireframe=false、flatShading=false、fog=true，setValues 应用参数。matcap 是引用而非生成的环境立方纹理。 */
  constructor(e) {
    super(), this.isMeshMatcapMaterial = !0, this.defines = {
      MATCAP: ""
    }, this.type = "MeshMatcapMaterial", this.color = new Color(16777215), this.matcap = null, this.map = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = TangentSpaceNormalMap, this.normalScale = new Vector2(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.alphaMap = null, this.wireframe = !1, this.wireframeLinewidth = 1, this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  /* 父类复制后重建 MATCAP define；color/normalScale 原位.copy，其余 matcap 和各贴图引用直接赋值，复制 bump/displacement、线宽、flatShading/fog 等标量，返回 this。不会克隆 matcap Texture。 */
  copy(e) {
    return super.copy(e), this.defines = {
      MATCAP: ""
    }, this.color.copy(e.color), this.matcap = e.matcap, this.map = e.map, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.alphaMap = e.alphaMap, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
/**
 * A material for rendering line primitives.
 *
 * Materials define the appearance of renderable 3D objects.
 *
 * ```js
 * const material = new THREE.LineDashedMaterial( {
 * 	color: 0xffffff,
 * 	scale: 1,
 * 	dashSize: 3,
 * 	gapSize: 1,
 * } );
 * ```
 *
 * @augments LineBasicMaterial
 */
class LineDashedMaterial extends LineBasicMaterial {
  constructor(parameters) {
    super(), this.isLineDashedMaterial = !0, this.type = "LineDashedMaterial", this.scale = 1, this.dashSize = 3, this.gapSize = 1, this.setValues(parameters);
  }
  copy(source) {
    return super.copy(source), this.scale = source.scale, this.dashSize = source.dashSize, this.gapSize = source.gapSize, this;
  }
}
/* 人工身份合同：构造器一致保留原数组，TypedArray BYTES_PER_ELEMENT 与普通数组转换。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function convertArray(e, t) {
  return e && e.constructor !== t ? "number" == typeof t.BYTES_PER_ELEMENT ? new t(e) : Array.prototype.slice.call(e) : e;
}
/* 人工身份合同：按 times 排序的原始索引数组。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function getKeyframeOrder(e) {
  const t = e.length,
    array = new Array(t);
  for (let e = 0; e !== t; ++e) array[e] = e;
  return array.sort(function (t, n) {
    return e[t] - e[n];
  }), array;
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：sortedArray。 */
function sortedArray(values, stride, order) {
  const nValues = values.length,
    result = new values.constructor(nValues);
  for (let i = 0, dstOffset = 0; dstOffset !== nValues; ++i) {
    const srcOffset = order[i] * stride;
    for (let j = 0; j !== stride; ++j) result[dstOffset++] = values[srcOffset + j];
  }
  return result;
}
/* 人工身份合同：提取 time 与 valuePropertyName，处理数组/toArray/标量。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function flattenJSON(e, t, n, r) {
  let i = 1,
    a = e[0];
  for (; void 0 !== a && void 0 === a[r];) a = e[i++];
  if (void 0 === a) return;
  let s = a[r];
  if (void 0 !== s) if (Array.isArray(s)) do {
    s = a[r], void 0 !== s && (t.push(a.time), n.push(...s)), a = e[i++];
  } while (void 0 !== a);else if (void 0 !== s.toArray) do {
    s = a[r], void 0 !== s && (t.push(a.time), s.toArray(n, n.length)), a = e[i++];
  } while (void 0 !== a);else do {
    s = a[r], void 0 !== s && (t.push(a.time), n.push(s)), a = e[i++];
  } while (void 0 !== a);
}
/**
 * A class with various methods to assist with animations.
 *
 * @hideconstructor
 */
class AnimationUtils {
  /**
   * Converts an array to a specific type
   *
   * @static
   * @param {TypedArray|Array} array - The array to convert.
   * @param {TypedArray.constructor} type - The constructor of a type array.
   * @return {TypedArray} The converted array
   */
  static convertArray(array, type) {
    return convertArray(array, type);
  }
  /**
   * Returns `true` if the given object is a typed array.
   *
   * @static
   * @param {any} object - The object to check.
   * @return {boolean} Whether the given object is a typed array.
   */
  static isTypedArray(object) {
    return isTypedArray(object);
  }
  /**
   * Returns an array by which times and values can be sorted.
   *
   * @static
   * @param {Array<number>} times - The keyframe time values.
   * @return {Array<number>} The array.
   */
  static getKeyframeOrder(times) {
    return getKeyframeOrder(times);
  }
  /**
   * Sorts the given array by the previously computed order via `getKeyframeOrder()`.
   *
   * @static
   * @param {Array<number>} values - The values to sort.
   * @param {number} stride - The stride.
   * @param {Array<number>} order - The sort order.
   * @return {Array<number>} The sorted values.
   */
  static sortedArray(values, stride, order) {
    return sortedArray(values, stride, order);
  }
  /**
   * Used for parsing AOS keyframe formats.
   *
   * @static
   * @param {Array<number>} jsonKeys - A list of JSON keyframes.
   * @param {Array<number>} times - This array will be filled with keyframe times by this method.
   * @param {Array<number>} values - This array will be filled with keyframe values by this method.
   * @param {string} valuePropertyName - The name of the property to use.
   */
  static flattenJSON(jsonKeys, times, values, valuePropertyName) {
    flattenJSON(jsonKeys, times, values, valuePropertyName);
  }
  /* 克隆 sourceClip、改 name，逐轨选择 times*fps 在 [startFrame,endFrame) 的键，按 getValueSize 复制对应值，剔除没有键的轨道并保持原 times/values 构造类型。求所有首键最小时间，所有轨统一 shift 到该时间为0，再 resetDuration。返回新 clip，不改源；不在剪切边界插入补偿采样。 */
  static subclip(e, t, n, r, i = 30) {
    return function (e, t, n, r, i = 30) {
      const a = e.clone();
      a.name = t;
      const s = [];
      for (let e = 0; e < a.tracks.length; ++e) {
        const t = a.tracks[e],
          o = t.getValueSize(),
          c = [],
          l = [];
        for (let e = 0; e < t.times.length; ++e) {
          const a = t.times[e] * i;
          if (!(a < n || a >= r)) {
            c.push(t.times[e]);
            for (let n = 0; n < o; ++n) l.push(t.values[e * o + n]);
          }
        }
        0 !== c.length && (t.times = convertArray(c, t.times.constructor), t.values = convertArray(l, t.values.constructor), s.push(t));
      }
      a.tracks = s;
      let o = 1 / 0;
      for (let e = 0; e < a.tracks.length; ++e) o > a.tracks[e].times[0] && (o = a.tracks[e].times[0]);
      for (let e = 0; e < a.tracks.length; ++e) a.tracks[e].shift(-1 * o);
      return a.resetDuration(), a;
    }(e, t, n, r, i);
  }
  /* 原位修改 targetClip，referenceFrame/fps（fps<=0回退30）选参考时刻，按 name+ValueTypeName 匹配轨道，bool/string 跳过。越界用端点，否则插值参考值；GLTF cubic spline 跳过两侧切线槽。referenceClip 默认 target，调用会改变目标 values。 */
  static makeClipAdditive(e, t = 0, n = e, r = 30) {
    return function (e, t = 0, n = e, r = 30) {
      r <= 0 && (r = 30);
      const i = n.tracks.length,
        a = t / r;
      for (let t = 0; t < i; ++t) {
        const r = n.tracks[t],
          i = r.ValueTypeName;
        if ("bool" === i || "string" === i) continue;
        const s = e.tracks.find(function (e) {
          return e.name === r.name && e.ValueTypeName === i;
        });
        if (void 0 === s) continue;
        let o = 0;
        const c = r.getValueSize();
        r.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (o = c / 3);
        let l = 0;
        const u = s.getValueSize();
        s.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline && (l = u / 3);
        const d = r.times.length - 1;
        let h;
        if (a <= r.times[0]) {
          const e = o,
            t = c - o;
          h = r.values.slice(e, t);
        } else if (a >= r.times[d]) {
          const e = d * c + o,
            t = e + c - o;
          h = r.values.slice(e, t);
        } else {
          const e = r.createInterpolant(),
            t = o,
            n = c - o;
          e.evaluate(a), h = e.resultBuffer.slice(t, n);
        }
        "quaternion" === i && new Quaternion().fromArray(h).normalize().conjugate().toArray(h);
        const p = s.times.length;
        for (let e = 0; e < p; ++e) {
          const t = e * u + l;
          if ("quaternion" === i) Quaternion.multiplyQuaternionsFlat(s.values, t, h, 0, s.values, t);else {
            const e = u - 2 * l;
            for (let n = 0; n < e; ++n) s.values[t + n] -= h[n];
          }
        }
      }
      return e.blendMode = AdditiveAnimationBlendMode, e;
    }(e, t, n, r);
  }
}
/**
 * Abstract base class of interpolants over parametric samples.
 *
 * The parameter domain is one dimensional, typically the time or a path
 * along a curve defined by the data.
 *
 * The sample values can have any dimensionality and derived classes may
 * apply special interpretations to the data.
 *
 * This class provides the interval seek in a Template Method, deferring
 * the actual interpolation to derived classes.
 *
 * Time complexity is O(1) for linear access crossing at most two points
 * and O(log N) for random access, where N is the number of positions.
 *
 * References: {@link http://www.oodesign.com/template-method-pattern.html}
 *
 * @abstract
 */
class Interpolant {
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    this.parameterPositions = parameterPositions, this._cachedIndex = 0, this.resultBuffer = void 0 !== resultBuffer ? resultBuffer : new sampleValues.constructor(sampleSize), this.sampleValues = sampleValues, this.valueSize = sampleSize, this.settings = null, this.DefaultSettings_ = {};
  }
  /* 维护 _cachedIndex；从缓存区间向前/后最多短扫，远跳再二分有序 parameterPositions。范围外复制首/末采样值，区间改变才 intervalChanged_，有效区间交给 interpolate_。本地单字母 label 对应控制流跳转，不能因 label 名差异称为算法差异。 */
  evaluate(e) {
    const parameterPositions = this.parameterPositions;
    let cachedIndex = this._cachedIndex,
      r = parameterPositions[cachedIndex],
      i = parameterPositions[cachedIndex - 1];
    e: {
      t: {
        let a;
        n: {
          r: if (!(e < r)) {
            for (let a = cachedIndex + 2;;) {
              if (void 0 === r) {
                if (e < i) break r;
                return cachedIndex = parameterPositions.length, this._cachedIndex = cachedIndex, this.copySampleValue_(cachedIndex - 1);
              }
              if (cachedIndex === a) break;
              if (i = r, r = parameterPositions[++cachedIndex], e < r) break t;
            }
            a = parameterPositions.length;
            break n;
          }
          if (!(e >= i)) {
            const s = parameterPositions[1];
            e < s && (cachedIndex = 2, i = s);
            for (let a = cachedIndex - 2;;) {
              if (void 0 === i) return this._cachedIndex = 0, this.copySampleValue_(0);
              if (cachedIndex === a) break;
              if (r = i, i = parameterPositions[--cachedIndex - 1], e >= i) break t;
            }
            a = cachedIndex, cachedIndex = 0;
            break n;
          }
          break e;
        }
        for (; cachedIndex < a;) {
          const r = cachedIndex + a >>> 1;
          e < parameterPositions[r] ? a = r : cachedIndex = r + 1;
        }
        if (r = parameterPositions[cachedIndex], i = parameterPositions[cachedIndex - 1], void 0 === i) return this._cachedIndex = 0, this.copySampleValue_(0);
        if (void 0 === r) return cachedIndex = parameterPositions.length, this._cachedIndex = cachedIndex, this.copySampleValue_(cachedIndex - 1);
      }
      this._cachedIndex = cachedIndex, this.intervalChanged_(cachedIndex, i, r);
    }
    return this.interpolate_(cachedIndex, i, e, r);
  }
  /**
   * Returns the interpolation settings.
   *
   * @return {Object} The interpolation settings.
   */
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(index) {
    const result = this.resultBuffer,
      values = this.sampleValues,
      stride = this.valueSize,
      offset = index * stride;
    for (let i = 0; i !== stride; ++i) result[i] = values[offset + i];
    return result;
  }
  interpolate_() {
    throw new Error("THREE.Interpolant: Call to abstract method.");
  }
  /**
   * Optional method that is executed when the interval has changed.
   *
   * @param {number} i1 - An index into the sample value buffer.
   * @param {number} t0 - The previous interpolation factor.
   * @param {number} t - The current interpolation factor.
   */
  intervalChanged_() {}
}
/**
 * Fast and simple cubic spline interpolant.
 *
 * It was derived from a Hermitian construction setting the first derivative
 * at each sample position to the linear slope between neighboring positions
 * over their parameter interval.
 *
 * @augments Interpolant
 */
class CubicInterpolant extends Interpolant {
  /**
   * Constructs a new cubic interpolant.
   *
   * @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
   * @param {TypedArray} sampleValues - The sample values.
   * @param {number} sampleSize - The sample size
   * @param {TypedArray} [resultBuffer] - The result buffer.
   */
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: ZeroCurvatureEnding,
      endingEnd: ZeroCurvatureEnding
    };
  }
  intervalChanged_(i1, t0, t1) {
    const pp = this.parameterPositions;
    let iPrev = i1 - 2,
      iNext = i1 + 1,
      tPrev = pp[iPrev],
      tNext = pp[iNext];
    if (void 0 === tPrev) switch (this.getSettings_().endingStart) {
      case ZeroSlopeEnding:
        iPrev = i1, tPrev = 2 * t0 - t1;
        break;
      case WrapAroundEnding:
        iPrev = pp.length - 2, tPrev = t0 + pp[iPrev] - pp[iPrev + 1];
        break;
      default:
        iPrev = i1, tPrev = t1;
    }
    if (void 0 === tNext) switch (this.getSettings_().endingEnd) {
      case ZeroSlopeEnding:
        iNext = i1, tNext = 2 * t1 - t0;
        break;
      case WrapAroundEnding:
        iNext = 1, tNext = t1 + pp[1] - pp[0];
        break;
      default:
        iNext = i1 - 1, tNext = t0;
    }
    const halfDt = .5 * (t1 - t0),
      stride = this.valueSize;
    this._weightPrev = halfDt / (t0 - tPrev), this._weightNext = halfDt / (tNext - t1), this._offsetPrev = iPrev * stride, this._offsetNext = iNext * stride;
  }
  interpolate_(i1, t0, t, t1) {
    const result = this.resultBuffer,
      values = this.sampleValues,
      stride = this.valueSize,
      o1 = i1 * stride,
      o0 = o1 - stride,
      oP = this._offsetPrev,
      oN = this._offsetNext,
      wP = this._weightPrev,
      wN = this._weightNext,
      p = (t - t0) / (t1 - t0),
      pp = p * p,
      ppp = pp * p,
      sP = -wP * ppp + 2 * wP * pp - wP * p,
      s0 = (1 + wP) * ppp + (-1.5 - 2 * wP) * pp + (-.5 + wP) * p + 1,
      s1 = (-1 - wN) * ppp + (1.5 + wN) * pp + .5 * p,
      sN = wN * ppp - wN * pp;
    for (let i = 0; i !== stride; ++i) result[i] = sP * values[oP + i] + s0 * values[o0 + i] + s1 * values[o1 + i] + sN * values[oN + i];
    return result;
  }
}
/**
 * A basic linear interpolant.
 *
 * @augments Interpolant
 */
class LinearInterpolant extends Interpolant {
  /**
   * Constructs a new linear interpolant.
   *
   * @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
   * @param {TypedArray} sampleValues - The sample values.
   * @param {number} sampleSize - The sample size
   * @param {TypedArray} [resultBuffer] - The result buffer.
   */
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
  }
  interpolate_(i1, t0, t, t1) {
    const result = this.resultBuffer,
      values = this.sampleValues,
      stride = this.valueSize,
      offset1 = i1 * stride,
      offset0 = offset1 - stride,
      weight1 = (t - t0) / (t1 - t0),
      weight0 = 1 - weight1;
    for (let i = 0; i !== stride; ++i) result[i] = values[offset0 + i] * weight0 + values[offset1 + i] * weight1;
    return result;
  }
}
/**
 * Interpolant that evaluates to the sample value at the position preceding
 * the parameter.
 *
 * @augments Interpolant
 */
class DiscreteInterpolant extends Interpolant {
  /**
   * Constructs a new discrete interpolant.
   *
   * @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
   * @param {TypedArray} sampleValues - The sample values.
   * @param {number} sampleSize - The sample size
   * @param {TypedArray} [resultBuffer] - The result buffer.
   */
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
  }
  interpolate_(i1) {
    return this.copySampleValue_(i1 - 1);
  }
}
class BezierInterpolant extends Interpolant {
  /* 输入右键索引、两端时间和请求时间；缺 in/outTangents 时按时间线性插值。每分量切线是控制点(time,value)对；以归一时间初值解 x(s)=t，最多8次 Newton，残差/导数阈值1e-10，每步 clamp s∈[0,1]，再以 cubic Bernstein 求 y。没有二分兜底或保证任意非单调时间控制点收敛。 */
  interpolate_(e, t, n, r) {
    const resultBuffer = this.resultBuffer,
      sampleValues = this.sampleValues,
      valueSize = this.valueSize,
      o = e * valueSize,
      c = o - valueSize,
      inTangents = this.inTangents,
      outTangents = this.outTangents;
    if (!inTangents || !outTangents) {
      const e = (n - t) / (r - t),
        l = 1 - e;
      for (let t = 0; t !== valueSize; ++t) resultBuffer[t] = sampleValues[c + t] * l + sampleValues[o + t] * e;
      return resultBuffer;
    }
    const d = 2 * valueSize,
      h = e - 1;
    for (let p = 0; p !== valueSize; ++p) {
      const s = sampleValues[c + p],
        f = sampleValues[o + p],
        m = h * d + 2 * p,
        M = outTangents[m],
        _ = outTangents[m + 1],
        A = e * d + 2 * p,
        g = inTangents[A],
        b = inTangents[A + 1];
      let y,
        L,
        v,
        T,
        S,
        w = (n - t) / (r - t);
      for (let e = 0; e < 8; e++) {
        y = w * w, L = y * w, v = 1 - w, T = v * v, S = T * v;
        const e = S * t + 3 * T * w * M + 3 * v * y * g + L * r - n;
        if (Math.abs(e) < 1e-10) break;
        const i = 3 * T * (M - t) + 6 * v * w * (g - M) + 3 * y * (r - g);
        if (Math.abs(i) < 1e-10) break;
        w -= e / i, w = Math.max(0, Math.min(1, w));
      }
      resultBuffer[p] = S * s + 3 * T * w * _ + 3 * v * y * b + L * f;
    }
    return resultBuffer;
  }
}
/**
 * Represents a timed sequence of keyframes, which are composed of lists of
 * times and related values, and which are used to animate a specific property
 * of an object.
 */
class KeyframeTrack {
  constructor(name, times, values, interpolation) {
    if (void 0 === name) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (void 0 === times || 0 === times.length) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + name);
    this.name = name, this.times = convertArray(times, this.TimeBufferType), this.values = convertArray(values, this.ValueBufferType), this.setInterpolation(interpolation || this.DefaultInterpolation);
  }
  /* 若具体构造器有自己的 toJSON 则委派；否则保存 name 及转换成普通 Array 的 times/values，插值非默认才保存 interpolation；最后补 ValueTypeName 为 type。返回对象，typed array 转换不是 JSON 字符串化。 */
  static toJSON(e) {
    const t = e.constructor;
    let n;
    if (t.toJSON !== this.toJSON) n = t.toJSON(e);else {
      n = {
        name: e.name,
        times: convertArray(e.times, Array),
        values: convertArray(e.values, Array)
      };
      const t = e.getInterpolation();
      t !== e.DefaultInterpolation && (n.interpolation = t);
    }
    return n.type = e.ValueTypeName, n;
  }
  /**
   * Factory method for creating a new discrete interpolant.
   *
   * @static
   * @param {TypedArray} [result] - The result buffer.
   * @return {DiscreteInterpolant} The new interpolant.
   */
  InterpolantFactoryMethodDiscrete(result) {
    return new DiscreteInterpolant(this.times, this.values, this.getValueSize(), result);
  }
  /**
   * Factory method for creating a new linear interpolant.
   *
   * @static
   * @param {TypedArray} [result] - The result buffer.
   * @return {LinearInterpolant} The new interpolant.
   */
  InterpolantFactoryMethodLinear(result) {
    return new LinearInterpolant(this.times, this.values, this.getValueSize(), result);
  }
  /**
   * Factory method for creating a new smooth interpolant.
   *
   * @static
   * @param {TypedArray} [result] - The result buffer.
   * @return {CubicInterpolant} The new interpolant.
   */
  InterpolantFactoryMethodSmooth(result) {
    return new CubicInterpolant(this.times, this.values, this.getValueSize(), result);
  }
  /**
   * Factory method for creating a new Bezier interpolant.
   *
   * The Bezier interpolant requires tangent data to be set via the `settings` property
   * on the track before creating the interpolant. The settings should contain:
   * - `inTangents`: Float32Array with [time, value] pairs per keyframe per component
   * - `outTangents`: Float32Array with [time, value] pairs per keyframe per component
   *
   * @static
   * @param {TypedArray} [result] - The result buffer.
   * @return {BezierInterpolant} The new interpolant.
   */
  InterpolantFactoryMethodBezier(result) {
    const interpolant = new BezierInterpolant(this.times, this.values, this.getValueSize(), result);
    return this.settings && (interpolant.inTangents = this.settings.inTangents, interpolant.outTangents = this.settings.outTangents), interpolant;
  }
  /* 枚举 Discrete/Linear/Smooth/Bezier 选实例插值工厂。不可用时，若还没工厂且请求非默认则递归设默认；默认也不支持时抛错，否则警告保留已有工厂。成功设 createInterpolant 并返回 this；不是立即创建插值器。 */
  setInterpolation(e) {
    let createInterpolant;
    switch (e) {
      case InterpolateDiscrete:
        createInterpolant = this.InterpolantFactoryMethodDiscrete;
        break;
      case InterpolateLinear:
        createInterpolant = this.InterpolantFactoryMethodLinear;
        break;
      case InterpolateSmooth:
        createInterpolant = this.InterpolantFactoryMethodSmooth;
        break;
      case InterpolateBezier:
        createInterpolant = this.InterpolantFactoryMethodBezier;
    }
    if (void 0 === createInterpolant) {
      const t = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (void 0 === this.createInterpolant) {
        if (e === this.DefaultInterpolation) throw new Error(t);
        this.setInterpolation(this.DefaultInterpolation);
      }
      return warn("KeyframeTrack:", t), this;
    }
    return this.createInterpolant = createInterpolant, this;
  }
  /**
   * Returns the current interpolation type.
   *
   * @return {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth|InterpolateBezier)} The interpolation type.
   */
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return InterpolateDiscrete;
      case this.InterpolantFactoryMethodLinear:
        return InterpolateLinear;
      case this.InterpolantFactoryMethodSmooth:
        return InterpolateSmooth;
      case this.InterpolantFactoryMethodBezier:
        return InterpolateBezier;
    }
  }
  /**
   * Returns the value size.
   *
   * @return {number} The value size.
   */
  getValueSize() {
    return this.values.length / this.times.length;
  }
  shift(timeOffset) {
    if (0 !== timeOffset) {
      const times = this.times;
      for (let i = 0, n = times.length; i !== n; ++i) times[i] += timeOffset;
    }
    return this;
  }
  scale(timeScale) {
    if (1 !== timeScale) {
      const times = this.times;
      for (let i = 0, n = times.length; i !== n; ++i) times[i] *= timeScale;
    }
    return this;
  }
  /* 去掉 startTime 前、endTime 后的键，端点等于边界保留；times.slice 与 values 按 valueSize 切片。若区间空，强制至少保留一个键（已有轨道的边界邻近项），避免产生空轨。返回 this，不将剩余时间归零，不生成边界插值键。 */
  trim(e, t) {
    const times = this.times,
      r = times.length;
    let i = 0,
      a = r - 1;
    for (; i !== r && times[i] < e;) ++i;
    for (; -1 !== a && times[a] > t;) --a;
    if (++a, 0 !== i || a !== r) {
      i >= a && (a = Math.max(a, 1), i = a - 1);
      const e = this.getValueSize();
      this.times = times.slice(i, a), this.values = this.values.slice(i * e, a * e);
    }
    return this;
  }
  /* 检查 values/time 个数比为整数、times 非空、时间数值不是 NaN且非降序；typed array 的 values 逐个检查 NaN。发现错误记录 error 并返回 false，否则 true。不要求严格递增、不拒绝 Infinity，也不是完整类型/维度 schema 验证。 */
  validate() {
    let e = !0;
    const t = this.getValueSize();
    t - Math.floor(t) !== 0 && (error("KeyframeTrack: Invalid value size in track.", this), e = !1);
    const times = this.times,
      values = this.values,
      i = times.length;
    0 === i && (error("KeyframeTrack: Track is empty.", this), e = !1);
    let a = null;
    for (let t = 0; t !== i; t++) {
      const r = times[t];
      if ("number" == typeof r && isNaN(r)) {
        error("KeyframeTrack: Time is not a valid number.", this, t, r), e = !1;
        break;
      }
      if (null !== a && a > r) {
        error("KeyframeTrack: Out of order keys.", this, t, r, a), e = !1;
        break;
      }
      a = r;
    }
    if (void 0 !== values && isTypedArray(values)) for (let t = 0, n = values.length; t !== n; ++t) {
      const n = values[t];
      if (isNaN(n)) {
        error("KeyframeTrack: Value is not a valid number.", this, t, n), e = !1;
        break;
      }
    }
    return e;
  }
  /* 先复制 times/values，再用读写指针删除同一时间冗余键和中间连续相等值。Smooth 模式保留值相同的中间关键点以免改曲线；首尾规则单独保留最后键。按 stride 搬值、裁掉尾部，赋回新的数组，返回 this，不修改调用前数组本体。 */
  optimize() {
    const times = this.times.slice(),
      values = this.values.slice(),
      n = this.getValueSize(),
      r = this.getInterpolation() === InterpolateSmooth,
      i = times.length - 1;
    let a = 1;
    for (let s = 1; s < i; ++s) {
      let i = !1;
      const o = times[s];
      if (o !== times[s + 1] && (1 !== s || o !== times[0])) if (r) i = !0;else {
        const e = s * n,
          r = e - n,
          a = e + n;
        for (let s = 0; s !== n; ++s) {
          const n = values[e + s];
          if (n !== values[r + s] || n !== values[a + s]) {
            i = !0;
            break;
          }
        }
      }
      if (i) {
        if (s !== a) {
          times[a] = times[s];
          const r = s * n,
            i = a * n;
          for (let e = 0; e !== n; ++e) values[i + e] = values[r + e];
        }
        ++a;
      }
    }
    if (i > 0) {
      times[a] = times[i];
      for (let e = i * n, r = a * n, s = 0; s !== n; ++s) values[r + s] = values[e + s];
      ++a;
    }
    return a !== times.length ? (this.times = times.slice(0, a), this.values = values.slice(0, a * n)) : (this.times = times, this.values = values), this;
  }
  /* times/values 分别.slice，新建 this.constructor(name,times,values)，再保留源 createInterpolant 工厂引用。返回新具体轨道，不只是基类；构造器的其他附加自定义状态不在这里统一复制。 */
  clone() {
    const e = this.times.slice(),
      t = this.values.slice(),
      n = new (0, this.constructor)(this.name, e, t);
    return n.createInterpolant = this.createInterpolant, n;
  }
}
KeyframeTrack.prototype.ValueTypeName = "", KeyframeTrack.prototype.TimeBufferType = Float32Array, KeyframeTrack.prototype.ValueBufferType = Float32Array, KeyframeTrack.prototype.DefaultInterpolation = InterpolateLinear;
/**
 * A track for boolean keyframe values.
 *
 * @augments KeyframeTrack
 */
class BooleanKeyframeTrack extends KeyframeTrack {
  /**
   * Constructs a new boolean keyframe track.
   *
   * This keyframe track type has no `interpolation` parameter because the
   * interpolation is always discrete.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<boolean>} values - A list of keyframe values.
   */
  constructor(name, times, values) {
    super(name, times, values);
  }
}
BooleanKeyframeTrack.prototype.ValueTypeName = "bool", BooleanKeyframeTrack.prototype.ValueBufferType = Array, BooleanKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete, BooleanKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0, BooleanKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
/**
 * A track for color keyframe values.
 *
 * @augments KeyframeTrack
 */
class ColorKeyframeTrack extends KeyframeTrack {
  /**
   * Constructs a new color keyframe track.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<number>} values - A list of keyframe values.
   * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} [interpolation] - The interpolation type.
   */
  constructor(name, times, values, interpolation) {
    super(name, times, values, interpolation);
  }
}
ColorKeyframeTrack.prototype.ValueTypeName = "color";
/**
 * A track for numeric keyframe values.
 *
 * @augments KeyframeTrack
 */
class NumberKeyframeTrack extends KeyframeTrack {
  /**
   * Constructs a new number keyframe track.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<number>} values - A list of keyframe values.
   * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} [interpolation] - The interpolation type.
   */
  constructor(name, times, values, interpolation) {
    super(name, times, values, interpolation);
  }
}
NumberKeyframeTrack.prototype.ValueTypeName = "number";
/**
 * Spherical linear unit quaternion interpolant.
 *
 * @augments Interpolant
 */
class QuaternionLinearInterpolant extends Interpolant {
  /**
   * Constructs a new SLERP interpolant.
   *
   * @param {TypedArray} parameterPositions - The parameter positions hold the interpolation factors.
   * @param {TypedArray} sampleValues - The sample values.
   * @param {number} sampleSize - The sample size
   * @param {TypedArray} [resultBuffer] - The result buffer.
   */
  constructor(parameterPositions, sampleValues, sampleSize, resultBuffer) {
    super(parameterPositions, sampleValues, sampleSize, resultBuffer);
  }
  interpolate_(i1, t0, t, t1) {
    const result = this.resultBuffer,
      values = this.sampleValues,
      stride = this.valueSize,
      alpha = (t - t0) / (t1 - t0);
    let offset = i1 * stride;
    for (let end = offset + stride; offset !== end; offset += 4) Quaternion.slerpFlat(result, 0, values, offset - stride, values, offset, alpha);
    return result;
  }
}
/**
 * A track for Quaternion keyframe values.
 *
 * @augments KeyframeTrack
 */
class QuaternionKeyframeTrack extends KeyframeTrack {
  /**
   * Constructs a new Quaternion keyframe track.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<number>} values - A list of keyframe values.
   * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} [interpolation] - The interpolation type.
   */
  constructor(name, times, values, interpolation) {
    super(name, times, values, interpolation);
  }
  /**
   * Overwritten so the method returns Quaternion based interpolant.
   *
   * @static
   * @param {TypedArray} [result] - The result buffer.
   * @return {QuaternionLinearInterpolant} The new interpolant.
   */
  InterpolantFactoryMethodLinear(result) {
    return new QuaternionLinearInterpolant(this.times, this.values, this.getValueSize(), result);
  }
}
QuaternionKeyframeTrack.prototype.ValueTypeName = "quaternion", QuaternionKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
/**
 * A track for string keyframe values.
 *
 * @augments KeyframeTrack
 */
class StringKeyframeTrack extends KeyframeTrack {
  /**
   * Constructs a new string keyframe track.
   *
   * This keyframe track type has no `interpolation` parameter because the
   * interpolation is always discrete.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<string>} values - A list of keyframe values.
   */
  constructor(name, times, values) {
    super(name, times, values);
  }
}
StringKeyframeTrack.prototype.ValueTypeName = "string", StringKeyframeTrack.prototype.ValueBufferType = Array, StringKeyframeTrack.prototype.DefaultInterpolation = InterpolateDiscrete, StringKeyframeTrack.prototype.InterpolantFactoryMethodLinear = void 0, StringKeyframeTrack.prototype.InterpolantFactoryMethodSmooth = void 0;
/**
 * A track for vector keyframe values.
 *
 * @augments KeyframeTrack
 */
class VectorKeyframeTrack extends KeyframeTrack {
  /**
   * Constructs a new vector keyframe track.
   *
   * @param {string} name - The keyframe track's name.
   * @param {Array<number>} times - A list of keyframe times.
   * @param {Array<number>} values - A list of keyframe values.
   * @param {(InterpolateLinear|InterpolateDiscrete|InterpolateSmooth)} [interpolation] - The interpolation type.
   */
  constructor(name, times, values, interpolation) {
    super(name, times, values, interpolation);
  }
}
VectorKeyframeTrack.prototype.ValueTypeName = "vector";
/**
 * A reusable set of keyframe tracks which represent an animation.
 */
class AnimationClip {
  constructor(name = "", duration = -1, tracks = [], blendMode = NormalAnimationBlendMode) {
    this.name = name, this.tracks = tracks, this.duration = duration, this.blendMode = blendMode, this.uuid = generateUUID(), this.userData = {}, this.duration < 0 && this.resetDuration();
  }
  static parse(json) {
    const tracks = [],
      jsonTracks = json.tracks,
      frameTime = 1 / (json.fps || 1);
    for (let i = 0, n = jsonTracks.length; i !== n; ++i) tracks.push(parseKeyframeTrack(jsonTracks[i]).scale(frameTime));
    const clip = new this(json.name, json.duration, tracks, json.blendMode);
    return clip.uuid = json.uuid, clip.userData = JSON.parse(json.userData || "{}"), clip;
  }
  /* 保存 name/duration/uuid/blendMode 与逐轨 KeyframeTrack.toJSON；userData 特别用 JSON.stringify 写成字符串。返回对象而非完整 JSON 文本；不能把 userData 描述成直接共享对象。 */
  static toJSON(e) {
    const t = [],
      n = e.tracks,
      r = {
        name: e.name,
        duration: e.duration,
        tracks: t,
        uuid: e.uuid,
        blendMode: e.blendMode,
        userData: JSON.stringify(e.userData)
      };
    for (let e = 0, r = n.length; e !== r; ++e) t.push(KeyframeTrack.toJSON(n[e]));
    return r;
  }
  /* 每个 morph 名创建权重轨道，循环前一/本/后一帧权重0/1/0，先按时间排序；允许循环且首时间0时补 numMorphTargets 帧首值，再 scale(1/fps) 从帧变秒。轨道路径是 .morphTargetInfluences[name]，新 clip duration=-1 由构造计算；不插入网格或 morph 几何数据。 */
  static CreateFromMorphTargetSequence(e, t, n, r) {
    const i = t.length,
      a = [];
    for (let e = 0; e < i; e++) {
      let s = [],
        o = [];
      s.push((e + i - 1) % i, e, (e + 1) % i), o.push(0, 1, 0);
      const c = getKeyframeOrder(s);
      s = sortedArray(s, 1, c), o = sortedArray(o, 1, c), r || 0 !== s[0] || (s.push(i), o.push(o[0])), a.push(new NumberKeyframeTrack(".morphTargetInfluences[" + t[e].name + "]", s, o).scale(1 / n));
    }
    return new this(e, -1, a);
  }
  static findByName(objectOrClipArray, name) {
    let clipArray = objectOrClipArray;
    if (!Array.isArray(objectOrClipArray)) {
      const o = objectOrClipArray;
      clipArray = o.geometry && o.geometry.animations || o.animations;
    }
    for (let i = 0; i < clipArray.length; i++) if (clipArray[i].name === name) return clipArray[i];
    return null;
  }
  static CreateClipsFromMorphTargetSequences(morphTargets, fps, noLoop) {
    const animationToMorphTargets = {},
      pattern = /^([\w-]*?)([\d]+)$/;
    for (let i = 0, il = morphTargets.length; i < il; i++) {
      const morphTarget = morphTargets[i],
        parts = morphTarget.name.match(pattern);
      if (parts && parts.length > 1) {
        const name = parts[1];
        let animationMorphTargets = animationToMorphTargets[name];
        animationMorphTargets || (animationToMorphTargets[name] = animationMorphTargets = []), animationMorphTargets.push(morphTarget);
      }
    }
    const clips = [];
    for (const name in animationToMorphTargets) clips.push(this.CreateFromMorphTargetSequence(name, animationToMorphTargets[name], fps, noLoop));
    return clips;
  }
  /* 从0开始取每个轨道最后 times 项的最大值，写 this.duration 并返回 this。依赖轨道时间有序非空；不是扫描全部键，空轨可能传播 NaN。 */
  resetDuration() {
    let duration = 0;
    for (let t = 0, n = this.tracks.length; t !== n; ++t) {
      const n = this.tracks[t];
      duration = Math.max(duration, n.times[n.times.length - 1]);
    }
    return this.duration = duration, this;
  }
  trim() {
    for (let i = 0; i < this.tracks.length; i++) this.tracks[i].trim(0, this.duration);
    return this;
  }
  validate() {
    let valid = !0;
    for (let i = 0; i < this.tracks.length; i++) valid = valid && this.tracks[i].validate();
    return valid;
  }
  optimize() {
    for (let i = 0; i < this.tracks.length; i++) this.tracks[i].optimize();
    return this;
  }
  clone() {
    const tracks = [];
    for (let i = 0; i < this.tracks.length; i++) tracks.push(this.tracks[i].clone());
    const clip = new this.constructor(this.name, this.duration, tracks, this.blendMode);
    return clip.userData = JSON.parse(JSON.stringify(this.userData)), clip;
  }
  /**
   * Serializes this animation clip into JSON.
   *
   * @return {Object} The JSON object.
   */
  toJSON() {
    return this.constructor.toJSON(this);
  }
}
/* 人工身份合同：由 JSON type/name/times/values/interpolation 构造对应关键帧轨道；类型分派已内联。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function parseKeyframeTrack(e) {
  if (void 0 === e.type) throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
  const t = function (e) {
    switch (e.toLowerCase()) {
      case "scalar":
      case "double":
      case "float":
      case "number":
      case "integer":
        return NumberKeyframeTrack;
      case "vector":
      case "vector2":
      case "vector3":
      case "vector4":
        return VectorKeyframeTrack;
      case "color":
        return ColorKeyframeTrack;
      case "quaternion":
        return QuaternionKeyframeTrack;
      case "bool":
      case "boolean":
        return BooleanKeyframeTrack;
      case "string":
        return StringKeyframeTrack;
    }
    throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + e);
  }(e.type);
  if (void 0 === e.times) {
    const t = [],
      n = [];
    flattenJSON(e.keys, t, n, "value"), e.times = t, e.values = n;
  }
  return void 0 !== t.parse ? t.parse(e) : new t(e.name, e.times, e.values, e.interpolation);
}
const Cache = {
  enabled: !1,
  files: {},
  add: function (e, t) {
    !1 !== this.enabled && (isBlobURL(e) || (this.files[e] = t));
  },
  get: function (e) {
    if (!1 !== this.enabled && !isBlobURL(e)) return this.files[e];
  },
  remove: function (key) {
    delete this.files[key];
  },
  clear: function () {
    this.files = {};
  }
};
/* 人工身份合同：blob: URL 前缀识别及 Cache 调用。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function isBlobURL(e) {
  try {
    const t = e.slice(e.indexOf(":") + 1);
    return "blob:" === new URL(t).protocol;
  } catch (e) {
    return !1;
  }
}
/**
 * Handles and keeps track of loaded and pending data. A default global
 * instance of this class is created and used by loaders if not supplied
 * manually.
 *
 * In general that should be sufficient, however there are times when it can
 * be useful to have separate loaders - for example if you want to show
 * separate loading bars for objects and textures.
 *
 * ```js
 * const manager = new THREE.LoadingManager();
 * manager.onLoad = () => console.log( 'Loading complete!' );
 *
 * const loader1 = new OBJLoader( manager );
 * const loader2 = new ColladaLoader( manager );
 * ```
 */
class LoadingManager {
  /* 闭包维护 isLoading/loaded/total、URL modifier 和正则/loader 成对数组。itemStart 增总数且首项触发 onStart；itemEnd 增完成数、报 progress，完成等总数触发 onLoad；itemError 只通知。这里加载批次数累计，不是每次 onLoad 后把计数清零。 */
  constructor(onLoad, onProgress, onError) {
    const r = this;
    let i,
      a = !1,
      s = 0,
      o = 0;
    const c = [];
    this.onStart = void 0, this.onLoad = onLoad, this.onProgress = onProgress, this.onError = onError, this._abortController = null, this.itemStart = function (e) {
      o++, !1 === a && void 0 !== r.onStart && r.onStart(e, s, o), a = !0;
    }, this.itemEnd = function (e) {
      s++, void 0 !== r.onProgress && r.onProgress(e, s, o), s === o && (a = !1, void 0 !== r.onLoad && r.onLoad());
    }, this.itemError = function (e) {
      void 0 !== r.onError && r.onError(e);
    }, this.resolveURL = function (e) {
      return e = e.normalize("NFC"), i ? i(e) : e;
    }, this.setURLModifier = function (e) {
      return i = e, this;
    }, this.addHandler = function (e, t) {
      return c.push(e, t), this;
    }, this.removeHandler = function (e) {
      const t = c.indexOf(e);
      return -1 !== t && c.splice(t, 2), this;
    }, this.getHandler = function (e) {
      for (let t = 0, n = c.length; t < n; t += 2) {
        const n = c[t],
          r = c[t + 1];
        if (n.global && (n.lastIndex = 0), n.test(e)) return r;
      }
      return null;
    }, this.abort = function () {
      return this.abortController.abort(), this._abortController = null, this;
    };
  }
  get abortController() {
    return this._abortController || (this._abortController = new AbortController()), this._abortController;
  }
}
const DefaultLoadingManager = new LoadingManager();
/**
 * Abstract base class for loaders.
 *
 * @abstract
 */
class Loader {
  constructor(manager) {
    this.manager = void 0 !== manager ? manager : DefaultLoadingManager, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
      detail: this
    }));
  }
  /**
   * This method needs to be implemented by all concrete loaders. It holds the
   * logic for loading assets from the backend.
   *
   * @abstract
   * @param {string} url - The path/URL of the file to be loaded.
   * @param {Function} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
   * @param {onErrorCallback} [onError] - Executed when errors occur.
   */
  load() {}
  /**
   * A async version of {@link Loader#load}.
   *
   * @param {string} url - The path/URL of the file to be loaded.
   * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
   * @return {Promise} A Promise that resolves when the asset has been loaded.
   */
  loadAsync(url, onProgress) {
    const scope = this;
    return new Promise(function (resolve, reject) {
      scope.load(url, resolve, onProgress, reject);
    });
  }
  /**
   * This method needs to be implemented by all concrete loaders. It holds the
   * logic for parsing the asset into three.js entities.
   *
   * @abstract
   * @param {any} data - The data to parse.
   */
  parse() {}
  /**
   * Sets the `crossOrigin` String to implement CORS for loading the URL
   * from a different domain that allows CORS.
   *
   * @param {string} crossOrigin - The `crossOrigin` value.
   * @return {Loader} A reference to this instance.
   */
  setCrossOrigin(crossOrigin) {
    return this.crossOrigin = crossOrigin, this;
  }
  /**
   * Whether the XMLHttpRequest uses credentials such as cookies, authorization
   * headers or TLS client certificates, see [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials).
   *
   * Note: This setting has no effect if you are loading files locally or from the same domain.
   *
   * @param {boolean} value - The `withCredentials` value.
   * @return {Loader} A reference to this instance.
   */
  setWithCredentials(value) {
    return this.withCredentials = value, this;
  }
  /**
   * Sets the base path for the asset.
   *
   * @param {string} path - The base path.
   * @return {Loader} A reference to this instance.
   */
  setPath(path) {
    return this.path = path, this;
  }
  /**
   * Sets the base path for dependent resources like textures.
   *
   * @param {string} resourcePath - The resource path.
   * @return {Loader} A reference to this instance.
   */
  setResourcePath(resourcePath) {
    return this.resourcePath = resourcePath, this;
  }
  /**
   * Sets the given request header.
   *
   * @param {Object} requestHeader - A [request header](https://developer.mozilla.org/en-US/docs/Glossary/Request_header)
   * for configuring the HTTP request.
   * @return {Loader} A reference to this instance.
   */
  setRequestHeader(requestHeader) {
    return this.requestHeader = requestHeader, this;
  }
  /**
   * This method can be implemented in loaders for aborting ongoing requests.
   *
   * @abstract
   * @return {Loader} A reference to this instance.
   */
  abort() {
    return this;
  }
}
Loader.DEFAULT_MATERIAL_NAME = "__DEFAULT";
const ec = {};
class HttpError extends Error {
  constructor(message, response) {
    super(message), this.response = response;
  }
}
/**
 * A low level class for loading resources with the Fetch API, used internally by
 * most loaders. It can also be used directly to load any file type that does
 * not have a loader.
 *
 * This loader supports caching. If you want to use it, add `THREE.Cache.enabled = true;`
 * once to your application.
 *
 * ```js
 * const loader = new THREE.FileLoader();
 * const data = await loader.loadAsync( 'example.txt' );
 * ```
 *
 * @augments Loader
 */
class FileLoader extends Loader {
  constructor(manager) {
    super(manager), this.mimeType = "", this.responseType = "", this._abortController = new AbortController();
  }
  /* path 拼接后经 manager.resolveURL；file: 缓存命中异步 setTimeout 回调，正在请求同 URL 则合并回调队列。新 Request 带 headers/credentials，支持时合并本 loader 与 manager 的 abort signals。返回 undefined，不把 Promise 作为此接口的返回值。 */
  load(e, t, n, r) {
    void 0 === e && (e = ""), void 0 !== this.path && (e = this.path + e), e = this.manager.resolveURL(e);
    const i = Cache.get(`file:${e}`);
    if (void 0 !== i) return this.manager.itemStart(e), void setTimeout(() => {
      t && t(i), this.manager.itemEnd(e);
    }, 0);
    if (void 0 !== ec[e]) return void ec[e].push({
      onLoad: t,
      onProgress: n,
      onError: r
    });
    ec[e] = [], ec[e].push({
      onLoad: t,
      onProgress: n,
      onError: r
    });
    const request = new Request(e, {
        headers: new Headers(this.requestHeader),
        credentials: this.withCredentials ? "include" : "same-origin",
        signal: "function" == typeof AbortSignal.any ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal
      }),
      mimeType = this.mimeType,
      responseType = this.responseType;
    fetch(request).then(t => {
      if (200 === t.status || 0 === t.status) {
        if (0 === t.status && warn("FileLoader: HTTP Status 0 received."), "undefined" == typeof ReadableStream || void 0 === t.body || void 0 === t.body.getReader) return t;
        const n = ec[e],
          r = t.body.getReader(),
          i = t.headers.get("X-File-Size") || t.headers.get("Content-Length"),
          a = i ? parseInt(i) : 0,
          s = 0 !== a;
        let o = 0;
        const readableStream = new ReadableStream({
          start(e) {
            !function t() {
              r.read().then(({
                done: done,
                value: value
              }) => {
                if (done) e.close();else {
                  o += value.byteLength;
                  const progressEvent = new ProgressEvent("progress", {
                    lengthComputable: s,
                    loaded: o,
                    total: a
                  });
                  for (let e = 0, t = n.length; e < t; e++) {
                    const t = n[e];
                    t.onProgress && t.onProgress(progressEvent);
                  }
                  e.enqueue(value), t();
                }
              }, t => {
                e.error(t);
              });
            }();
          }
        });
        return new Response(readableStream);
      }
      throw new HttpError(`fetch for "${t.url}" responded with ${t.status}: ${t.statusText}`, t);
    }).then(e => {
      switch (responseType) {
        case "arraybuffer":
          return e.arrayBuffer();
        case "blob":
          return e.blob();
        case "document":
          return e.text().then(e => new DOMParser().parseFromString(e, mimeType));
        case "json":
          return e.json();
        default:
          if ("" === mimeType) return e.text();
          {
            const t = /charset="?([^;"\s]*)"?/i.exec(mimeType),
              n = t && t[1] ? t[1].toLowerCase() : void 0,
              textDecoder = new TextDecoder(n);
            return e.arrayBuffer().then(e => textDecoder.decode(e));
          }
      }
    }).then(t => {
      Cache.add(`file:${e}`, t);
      const n = ec[e];
      delete ec[e];
      for (let e = 0, r = n.length; e < r; e++) {
        const r = n[e];
        r.onLoad && r.onLoad(t);
      }
    }).catch(t => {
      const n = ec[e];
      if (void 0 === n) throw this.manager.itemError(e), t;
      delete ec[e];
      for (let e = 0, r = n.length; e < r; e++) {
        const r = n[e];
        r.onError && r.onError(t);
      }
      this.manager.itemError(e);
    }).finally(() => {
      this.manager.itemEnd(e);
    }), this.manager.itemStart(e);
  }
  /**
   * Sets the expected response type.
   *
   * @param {('arraybuffer'|'blob'|'document'|'json'|'')} value - The response type.
   * @return {FileLoader} A reference to this file loader.
   */
  setResponseType(value) {
    return this.responseType = value, this;
  }
  /**
   * Sets the expected mime type of the loaded file.
   *
   * @param {string} value - The mime type.
   * @return {FileLoader} A reference to this file loader.
   */
  setMimeType(value) {
    return this.mimeType = value, this;
  }
  /**
   * Aborts ongoing fetch requests.
   *
   * @return {FileLoader} A reference to this instance.
   */
  abort() {
    return this._abortController.abort(), this._abortController = new AbortController(), this;
  }
}
/**
 * Class for loading animation clips in the JSON format. The files are internally
 * loaded via {@link FileLoader}.
 *
 * ```js
 * const loader = new THREE.AnimationLoader();
 * const animations = await loader.loadAsync( 'animations/animation.js' );
 * ```
 *
 * @augments Loader
 */
class AnimationLoader extends Loader {
  /**
   * Constructs a new animation loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager);
  }
  /**
   * Starts loading from the given URL and pass the loaded animations as an array
   * holding instances of {@link AnimationClip} to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(Array<AnimationClip>)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  load(url, onLoad, onProgress, onError) {
    const scope = this,
      loader = new FileLoader(this.manager);
    loader.setPath(this.path), loader.setRequestHeader(this.requestHeader), loader.setWithCredentials(this.withCredentials), loader.load(url, function (text) {
      try {
        onLoad(scope.parse(JSON.parse(text)));
      } catch (e) {
        onError ? onError(e) : error(e), scope.manager.itemError(url);
      }
    }, onProgress, onError);
  }
  /**
   * Parses the given JSON object and returns an array of animation clips.
   *
   * @param {Object} json - The serialized animation clips.
   * @return {Array<AnimationClip>} The parsed animation clips.
   */
  parse(json) {
    const animations = [];
    for (let i = 0; i < json.length; i++) {
      const clip = AnimationClip.parse(json[i]);
      animations.push(clip);
    }
    return animations;
  }
}
/**
 * Abstract base class for loading compressed texture formats S3TC, ASTC or ETC.
 * Textures are internally loaded via {@link FileLoader}.
 *
 * Derived classes have to implement the `parse()` method which holds the parsing
 * for the respective format.
 *
 * @abstract
 * @augments Loader
 */
class CompressedTextureLoader extends Loader {
  /**
   * Constructs a new compressed texture loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager);
  }
  load(url, onLoad, onProgress, onError) {
    const scope = this,
      images = [],
      texture = new CompressedTexture(),
      loader = new FileLoader(this.manager);
    loader.setPath(this.path), loader.setResponseType("arraybuffer"), loader.setRequestHeader(this.requestHeader), loader.setWithCredentials(scope.withCredentials);
    let loaded = 0;
    function loadTexture(i) {
      loader.load(url[i], function (buffer) {
        const texDatas = scope.parse(buffer, !0);
        images[i] = {
          width: texDatas.width,
          height: texDatas.height,
          format: texDatas.format,
          mipmaps: texDatas.mipmaps
        }, loaded += 1, 6 === loaded && (1 === texDatas.mipmapCount && (texture.minFilter = LinearFilter), texture.image = images, texture.format = texDatas.format, texture.needsUpdate = !0, onLoad && onLoad(texture));
      }, onProgress, onError);
    }
    if (Array.isArray(url)) for (let i = 0, il = url.length; i < il; ++i) loadTexture(i);else loader.load(url, function (buffer) {
      const texDatas = scope.parse(buffer, !0);
      if (texDatas.isCubemap) {
        const faces = texDatas.mipmaps.length / texDatas.mipmapCount;
        for (let f = 0; f < faces; f++) {
          images[f] = {
            mipmaps: []
          };
          for (let i = 0; i < texDatas.mipmapCount; i++) images[f].mipmaps.push(texDatas.mipmaps[f * texDatas.mipmapCount + i]), images[f].format = texDatas.format, images[f].width = texDatas.width, images[f].height = texDatas.height;
        }
        texture.image = images;
      } else texture.image.width = texDatas.width, texture.image.height = texDatas.height, texture.mipmaps = texDatas.mipmaps;
      1 === texDatas.mipmapCount && (texture.minFilter = LinearFilter), texture.format = texDatas.format, texture.needsUpdate = !0, onLoad && onLoad(texture);
    }, onProgress, onError);
    return texture;
  }
}
const weakMap = new WeakMap();
/**
 * A loader for loading images. The class loads images with the HTML `Image` API.
 *
 * ```js
 * const loader = new THREE.ImageLoader();
 * const image = await loader.loadAsync( 'image.png' );
 * ```
 * Please note that `ImageLoader` has dropped support for progress
 * events in `r84`. For an `ImageLoader` that supports progress events, see
 * [this thread](https://github.com/mrdoob/three.js/issues/10439#issuecomment-275785639).
 *
 * @augments Loader
 */
class ImageLoader extends Loader {
  /**
   * Constructs a new image loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager);
  }
  /* image: 缓存完整图用异步回调，未完成的缓存图用 WeakMap 合并回调并返回同 img。新建 img、安装 load/error，非 data URL 才设 crossOrigin，缓存后 itemStart 再设 src；成功清监听、广播并 itemEnd，失败还删除缓存/报 itemError。函数返回 HTMLImageElement，不返回解码后的像素。 */
  load(e, t, n, r) {
    void 0 !== this.path && (e = this.path + e), e = this.manager.resolveURL(e);
    const i = this,
      a = Cache.get(`image:${e}`);
    if (void 0 !== a) {
      if (!0 === a.complete) i.manager.itemStart(e), setTimeout(function () {
        t && t(a), i.manager.itemEnd(e);
      }, 0);else {
        let e = weakMap.get(a);
        void 0 === e && (e = [], weakMap.set(a, e)), e.push({
          onLoad: t,
          onError: r
        });
      }
      return a;
    }
    const s = createElementNS("img");
    function o() {
      l(), t && t(this);
      const n = weakMap.get(this) || [];
      for (let e = 0; e < n.length; e++) {
        const t = n[e];
        t.onLoad && t.onLoad(this);
      }
      weakMap.delete(this), i.manager.itemEnd(e);
    }
    function c(t) {
      l(), r && r(t), Cache.remove(`image:${e}`);
      const n = weakMap.get(this) || [];
      for (let e = 0; e < n.length; e++) {
        const r = n[e];
        r.onError && r.onError(t);
      }
      weakMap.delete(this), i.manager.itemError(e), i.manager.itemEnd(e);
    }
    function l() {
      s.removeEventListener("load", o, !1), s.removeEventListener("error", c, !1);
    }
    return s.addEventListener("load", o, !1), s.addEventListener("error", c, !1), "data:" !== e.slice(0, 5) && void 0 !== this.crossOrigin && (s.crossOrigin = this.crossOrigin), Cache.add(`image:${e}`, s), i.manager.itemStart(e), s.src = e, s;
  }
}
/**
 * Class for loading cube textures. Images are internally loaded via {@link ImageLoader}.
 *
 * The loader returns an instance of {@link CubeTexture} and expects the cube map to
 * be defined as six separate images representing the sides of a cube. Other cube map definitions
 * like vertical and horizontal cross, column and row layouts are not supported.
 *
 * Note that, by convention, cube maps are specified in a coordinate system
 * in which positive-x is to the right when looking up the positive-z axis --
 * in other words, using a left-handed coordinate system. Since three.js uses
 * a right-handed coordinate system, environment maps used in three.js will
 * have pos-x and neg-x swapped.
 *
 * The loaded cube texture is in sRGB color space. Meaning {@link Texture#colorSpace}
 * is set to `SRGBColorSpace` by default.
 *
 * ```js
 * const loader = new THREE.CubeTextureLoader().setPath( 'textures/cubeMaps/' );
 * const cubeTexture = await loader.loadAsync( [
 * 	'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'
 * ] );
 * scene.background = cubeTexture;
 * ```
 *
 * @augments Loader
 */
class CubeTextureLoader extends Loader {
  /**
   * Constructs a new cube texture loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager);
  }
  load(urls, onLoad, onProgress, onError) {
    const texture = new CubeTexture();
    texture.colorSpace = SRGBColorSpace;
    const loader = new ImageLoader(this.manager);
    loader.setCrossOrigin(this.crossOrigin), loader.setPath(this.path);
    let loaded = 0;
    function loadTexture(i) {
      loader.load(urls[i], function (image) {
        texture.images[i] = image, loaded++, 6 === loaded && (texture.needsUpdate = !0, onLoad && onLoad(texture));
      }, void 0, onError);
    }
    for (let i = 0; i < urls.length; ++i) loadTexture(i);
    return texture;
  }
}
/**
 * Abstract base class for loading binary texture formats RGBE, EXR or TGA.
 * Textures are internally loaded via {@link FileLoader}.
 *
 * Derived classes have to implement the `parse()` method which holds the parsing
 * for the respective format.
 *
 * @abstract
 * @augments Loader
 */
class DataTextureLoader extends Loader {
  /**
   * Constructs a new data texture loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager);
  }
  load(url, onLoad, onProgress, onError) {
    const scope = this,
      texture = new DataTexture(),
      loader = new FileLoader(this.manager);
    return loader.setResponseType("arraybuffer"), loader.setRequestHeader(this.requestHeader), loader.setPath(this.path), loader.setWithCredentials(scope.withCredentials), loader.load(url, function (buffer) {
      let texData;
      try {
        texData = scope.parse(buffer);
      } catch (e) {
        return void (void 0 !== onError ? onError(e) : error(e));
      }
      scope._applyTexData(texture, texData), onLoad && onLoad(texture, texData);
    }, onProgress, onError), texture;
  }
  /**
   * Parses the given buffer and returns a configured data texture. Use this method
   * for parsing texture data that is already in memory (e.g. drag and drop or data
   * loaded from a server) without going through {@link DataTextureLoader#load}.
   *
   * @param {ArrayBuffer} buffer - The raw texture data.
   * @return {DataTexture} The data texture.
   */
  createDataTexture(buffer) {
    const texture = new DataTexture();
    return this._applyTexData(texture, this.parse(buffer)), texture;
  }
  _applyTexData(texture, texData) {
    void 0 !== texData.image ? texture.image = texData.image : void 0 !== texData.data && (texture.image.width = texData.width, texture.image.height = texData.height, texture.image.data = texData.data), texture.wrapS = void 0 !== texData.wrapS ? texData.wrapS : ClampToEdgeWrapping, texture.wrapT = void 0 !== texData.wrapT ? texData.wrapT : ClampToEdgeWrapping, texture.magFilter = void 0 !== texData.magFilter ? texData.magFilter : LinearFilter, texture.minFilter = void 0 !== texData.minFilter ? texData.minFilter : LinearFilter, texture.anisotropy = void 0 !== texData.anisotropy ? texData.anisotropy : 1, void 0 !== texData.colorSpace && (texture.colorSpace = texData.colorSpace), void 0 !== texData.flipY && (texture.flipY = texData.flipY), void 0 !== texData.format && (texture.format = texData.format), void 0 !== texData.type && (texture.type = texData.type), void 0 !== texData.mipmaps && (texture.mipmaps = texData.mipmaps, texture.minFilter = LinearMipmapLinearFilter), 1 === texData.mipmapCount && (texture.minFilter = LinearFilter), void 0 !== texData.generateMipmaps && (texture.generateMipmaps = texData.generateMipmaps), texture.needsUpdate = !0;
  }
}
/**
 * Class for loading textures. Images are internally
 * loaded via {@link ImageLoader}.
 *
 * ```js
 * const loader = new THREE.TextureLoader();
 * const texture = await loader.loadAsync( 'textures/land_ocean_ice_cloud_2048.jpg' );
 *
 * const material = new THREE.MeshBasicMaterial( { map:texture } );
 * ```
 * Please note that `TextureLoader` has dropped support for progress
 * events in `r84`. For a `TextureLoader` that supports progress events, see
 * [this thread](https://github.com/mrdoob/three.js/issues/10439#issuecomment-293260145).
 *
 * @augments Loader
 */
class TextureLoader extends Loader {
  /**
   * Constructs a new texture loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager);
  }
  load(url, onLoad, onProgress, onError) {
    const texture = new Texture(),
      loader = new ImageLoader(this.manager);
    return loader.setCrossOrigin(this.crossOrigin), loader.setPath(this.path), loader.load(url, function (image) {
      texture.image = image, texture.needsUpdate = !0, void 0 !== onLoad && onLoad(texture);
    }, onProgress, onError), texture;
  }
}
/**
 * Abstract base class for lights - all other light types inherit the
 * properties and methods described here.
 *
 * @abstract
 * @augments Object3D
 */
class Light extends Object3D {
  constructor(color, intensity = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Color(color), this.intensity = intensity;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
  copy(source, recursive) {
    return super.copy(source, recursive), this.color.copy(source.color), this.intensity = source.intensity, this;
  }
  toJSON(meta) {
    const data = super.toJSON(meta);
    return data.object.color = this.color.getHex(), data.object.intensity = this.intensity, data;
  }
}
/**
 * A light source positioned directly above the scene, with color fading from
 * the sky color to the ground color.
 *
 * This light cannot be used to cast shadows.
 *
 * ```js
 * const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
 * scene.add( light );
 * ```
 *
 * @augments Light
 */
class HemisphereLight extends Light {
  constructor(skyColor, groundColor, intensity) {
    super(skyColor, intensity), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(Object3D.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Color(groundColor);
  }
  copy(source, recursive) {
    return super.copy(source, recursive), this.groundColor.copy(source.groundColor), this;
  }
  toJSON(meta) {
    const data = super.toJSON(meta);
    return data.object.groundColor = this.groundColor.getHex(), data;
  }
}
const nc = new Matrix4(),
  rc = new Vector3(),
  ic = new Vector3();
/**
 * Abstract base class for light shadow classes. These classes
 * represent the shadow configuration for different light types.
 *
 * @abstract
 */
class LightShadow {
  /**
   * Constructs a new light shadow.
   *
   * @param {Camera} camera - The light's view of the world.
   */
  constructor(camera) {
    this.camera = camera, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new Vector2(512, 512), this.mapType = UnsignedByteType, this.map = null, this.mapPass = null, this.matrix = new Matrix4(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Frustum(), this._frameExtents = new Vector2(1, 1), this._viewportCount = 1, this._viewports = [new Vector4(0, 0, 1, 1)];
  }
  /**
   * Used internally by the renderer to get the number of viewports that need
   * to be rendered for this shadow.
   *
   * @return {number} The viewport count.
   */
  getViewportCount() {
    return this._viewportCount;
  }
  /**
   * Gets the shadow cameras frustum. Used internally by the renderer to cull objects.
   *
   * @return {Frustum} The shadow camera frustum.
   */
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(light) {
    const shadowCamera = this.camera,
      shadowMatrix = this.matrix;
    rc.setFromMatrixPosition(light.matrixWorld), shadowCamera.position.copy(rc), ic.setFromMatrixPosition(light.target.matrixWorld), shadowCamera.lookAt(ic), shadowCamera.updateMatrixWorld(), nc.multiplyMatrices(shadowCamera.projectionMatrix, shadowCamera.matrixWorldInverse), this._frustum.setFromProjectionMatrix(nc, shadowCamera.coordinateSystem, shadowCamera.reversedDepth), shadowCamera.coordinateSystem === WebGPUCoordinateSystem || shadowCamera.reversedDepth ? shadowMatrix.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, 1, 0, 0, 0, 0, 1) : shadowMatrix.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), shadowMatrix.multiply(nc);
  }
  /**
   * Returns a viewport definition for the given viewport index.
   *
   * @param {number} viewportIndex - The viewport index.
   * @return {Vector4} The viewport.
   */
  getViewport(viewportIndex) {
    return this._viewports[viewportIndex];
  }
  /**
   * Returns the frame extends.
   *
   * @return {Vector2} The frame extends.
   */
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  /**
   * Copies the values of the given light shadow instance to this instance.
   *
   * @param {LightShadow} source - The light shadow to copy.
   * @return {LightShadow} A reference to this light shadow instance.
   */
  copy(source) {
    return this.camera = source.camera.clone(), this.intensity = source.intensity, this.bias = source.bias, this.radius = source.radius, this.autoUpdate = source.autoUpdate, this.needsUpdate = source.needsUpdate, this.normalBias = source.normalBias, this.blurSamples = source.blurSamples, this.mapSize.copy(source.mapSize), this.biasNode = source.biasNode, this;
  }
  /**
   * Returns a new light shadow instance with copied values from this instance.
   *
   * @return {LightShadow} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /* 仅写非默认 intensity/bias/normalBias/radius/mapSize；camera.toJSON(false).object 后删除 camera.matrix。返回轻量配置，不保存 shadow map/render target 或实时 shadow 矩阵，不修改 camera 原实例。 */
  toJSON() {
    const e = {};
    return 1 !== this.intensity && (e.intensity = this.intensity), 0 !== this.bias && (e.bias = this.bias), 0 !== this.normalBias && (e.normalBias = this.normalBias), 1 !== this.radius && (e.radius = this.radius), 512 === this.mapSize.x && 512 === this.mapSize.y || (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
  }
}
const ac = new Vector3(),
  sc = new Quaternion(),
  oc = new Vector3();
/**
 * Abstract base class for cameras. This class should always be inherited
 * when you build a new camera.
 *
 * @abstract
 * @augments Object3D
 */
class Camera extends Object3D {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Matrix4(), this.projectionMatrix = new Matrix4(), this.projectionMatrixInverse = new Matrix4(), this.coordinateSystem = WebGLCoordinateSystem, this._reversedDepth = !1;
  }
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(source, recursive) {
    return super.copy(source, recursive), this.matrixWorldInverse.copy(source.matrixWorldInverse), this.projectionMatrix.copy(source.projectionMatrix), this.projectionMatrixInverse.copy(source.projectionMatrixInverse), this.coordinateSystem = source.coordinateSystem, this;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * This method is overwritten since cameras have a different forward vector compared to other
   * 3D objects. A camera looks down its local, negative z-axis by default.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(target) {
    return super.getWorldDirection(target).negate();
  }
  updateMatrixWorld(force) {
    super.updateMatrixWorld(force), this.matrixWorld.decompose(ac, sc, oc), 1 === oc.x && 1 === oc.y && 1 === oc.z ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(ac, sc, oc.set(1, 1, 1)).invert();
  }
  updateWorldMatrix(updateParents, updateChildren, force = !1) {
    super.updateWorldMatrix(updateParents, updateChildren, force), this.matrixWorld.decompose(ac, sc, oc), 1 === oc.x && 1 === oc.y && 1 === oc.z ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(ac, sc, oc.set(1, 1, 1)).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const cc = new Vector3(),
  _minTarget = new Vector2(),
  _maxTarget = new Vector2();
/**
 * Camera that uses [perspective projection](https://en.wikipedia.org/wiki/Perspective_(graphical)).
 *
 * This projection mode is designed to mimic the way the human eye sees. It
 * is the most common projection mode used for rendering a 3D scene.
 *
 * ```js
 * const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
 * scene.add( camera );
 * ```
 *
 * @augments Camera
 */
class PerspectiveCamera extends Camera {
  constructor(fov = 50, aspect = 1, near = .1, far = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = fov, this.zoom = 1, this.near = near, this.far = far, this.focus = 10, this.aspect = aspect, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(source, recursive) {
    return super.copy(source, recursive), this.fov = source.fov, this.zoom = source.zoom, this.near = source.near, this.far = source.far, this.focus = source.focus, this.aspect = source.aspect, this.view = null === source.view ? null : Object.assign({}, source.view), this.filmGauge = source.filmGauge, this.filmOffset = source.filmOffset, this;
  }
  setFocalLength(focalLength) {
    const vExtentSlope = .5 * this.getFilmHeight() / focalLength;
    this.fov = 2 * RAD2DEG * Math.atan(vExtentSlope), this.updateProjectionMatrix();
  }
  getFocalLength() {
    const vExtentSlope = Math.tan(.5 * gr * this.fov);
    return .5 * this.getFilmHeight() / vExtentSlope;
  }
  getEffectiveFOV() {
    return 2 * RAD2DEG * Math.atan(Math.tan(.5 * gr * this.fov) / this.zoom);
  }
  /**
   * Returns the width of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or
   * equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The film width.
   */
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  /**
   * Returns the height of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or
   * equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The film width.
   */
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  getViewBounds(distance, minTarget, maxTarget) {
    cc.set(-1, -1, .5).applyMatrix4(this.projectionMatrixInverse), minTarget.set(cc.x, cc.y).multiplyScalar(-distance / cc.z), cc.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse), maxTarget.set(cc.x, cc.y).multiplyScalar(-distance / cc.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   *
   * @param {number} distance - The viewing distance.
   * @param {Vector2} target - The target vector that is used to store result where x is width and y is height.
   * @returns {Vector2} The view size.
   */
  getViewSize(distance, target) {
    return this.getViewBounds(distance, _minTarget, _maxTarget), target.subVectors(_maxTarget, _minTarget);
  }
  setViewOffset(fullWidth, fullHeight, x, y, width, height) {
    this.aspect = fullWidth / fullHeight, null === this.view && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = fullWidth, this.view.fullHeight = fullHeight, this.view.offsetX = x, this.view.offsetY = y, this.view.width = width, this.view.height = height, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const near = this.near;
    let top = near * Math.tan(.5 * gr * this.fov) / this.zoom,
      height = 2 * top,
      width = this.aspect * height,
      left = -.5 * width;
    const view = this.view;
    if (null !== this.view && this.view.enabled) {
      const fullWidth = view.fullWidth,
        fullHeight = view.fullHeight;
      left += view.offsetX * width / fullWidth, top -= view.offsetY * height / fullHeight, width *= view.width / fullWidth, height *= view.height / fullHeight;
    }
    const skew = this.filmOffset;
    0 !== skew && (left += near * skew / this.getFilmWidth()), this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(meta) {
    const data = super.toJSON(meta);
    return data.object.fov = this.fov, data.object.zoom = this.zoom, data.object.near = this.near, data.object.far = this.far, data.object.focus = this.focus, data.object.aspect = this.aspect, null !== this.view && (data.object.view = Object.assign({}, this.view)), data.object.filmGauge = this.filmGauge, data.object.filmOffset = this.filmOffset, data;
  }
}
/**
 * Represents the shadow configuration of directional lights.
 *
 * @augments LightShadow
 */
class SpotLightShadow extends LightShadow {
  constructor() {
    super(new PerspectiveCamera(50, 1, .5, 500)), this.isSpotLightShadow = !0, this.focus = 1, this.aspect = 1;
  }
  /* fov=2*RAD2DEG*light.angle*focus，aspect=mapSize.width/height*this.aspect，far=light.distance||camera.far；任一变化才更新投影，随后 super.updateMatrices 更新位置/方向与 shadow matrix。distance=0 表示沿用 far，不是将 far 设0；函数没有返回矩阵。 */
  updateMatrices(e) {
    const camera = this.camera,
      n = 2 * RAD2DEG * e.angle * this.focus,
      r = this.mapSize.width / this.mapSize.height * this.aspect,
      i = e.distance || camera.far;
    n === camera.fov && r === camera.aspect && i === camera.far || (camera.fov = n, camera.aspect = r, camera.far = i, camera.updateProjectionMatrix()), super.updateMatrices(e);
  }
  copy(source) {
    return super.copy(source), this.focus = source.focus, this;
  }
}
/**
 * This light gets emitted from a single point in one direction, along a cone
 * that increases in size the further from the light it gets.
 *
 * This light can cast shadows - see the {@link SpotLightShadow} for details.
 *
 * ```js
 * // white spotlight shining from the side, modulated by a texture
 * const spotLight = new THREE.SpotLight( 0xffffff );
 * spotLight.position.set( 100, 1000, 100 );
 * spotLight.map = new THREE.TextureLoader().load( url );
 *
 * spotLight.castShadow = true;
 * spotLight.shadow.mapSize.width = 1024;
 * spotLight.shadow.mapSize.height = 1024;
 * spotLight.shadow.camera.near = 500;
 * spotLight.shadow.camera.far = 4000;
 * spotLight.shadow.camera.fov = 30;s
 * ```
 *
 * @augments Light
 */
class SpotLight extends Light {
  constructor(color, intensity, distance = 0, angle = Math.PI / 3, penumbra = 0, decay = 2) {
    super(color, intensity), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(Object3D.DEFAULT_UP), this.updateMatrix(), this.target = new Object3D(), this.distance = distance, this.angle = angle, this.penumbra = penumbra, this.decay = decay, this.map = null, this.shadow = new SpotLightShadow();
  }
  get power() {
    return this.intensity * Math.PI;
  }
  set power(power) {
    this.intensity = power / Math.PI;
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(source, recursive) {
    return super.copy(source, recursive), this.distance = source.distance, this.angle = source.angle, this.penumbra = source.penumbra, this.decay = source.decay, this.target = source.target.clone(), this.map = source.map, this.shadow = source.shadow.clone(), this;
  }
  toJSON(meta) {
    const data = super.toJSON(meta);
    return data.object.distance = this.distance, data.object.angle = this.angle, data.object.decay = this.decay, data.object.penumbra = this.penumbra, data.object.target = this.target.uuid, this.map && this.map.isTexture && (data.object.map = this.map.toJSON(meta).uuid), data.object.shadow = this.shadow.toJSON(), data;
  }
}
class PointLightShadow extends LightShadow {
  constructor() {
    super(new PerspectiveCamera(90, 1, .5, 500)), this.isPointLightShadow = !0;
  }
}
/**
 * A light that gets emitted from a single point in all directions. A common
 * use case for this is to replicate the light emitted from a bare
 * lightbulb.
 *
 * This light can cast shadows - see the {@link PointLightShadow} for details.
 *
 * ```js
 * const light = new THREE.PointLight( 0xff0000, 1, 100 );
 * light.position.set( 50, 50, 50 );
 * scene.add( light );
 * ```
 *
 * @augments Light
 */
class PointLight extends Light {
  constructor(color, intensity, distance = 0, decay = 2) {
    super(color, intensity), this.isPointLight = !0, this.type = "PointLight", this.distance = distance, this.decay = decay, this.shadow = new PointLightShadow();
  }
  get power() {
    return 4 * this.intensity * Math.PI;
  }
  set power(power) {
    this.intensity = power / (4 * Math.PI);
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(source, recursive) {
    return super.copy(source, recursive), this.distance = source.distance, this.decay = source.decay, this.shadow = source.shadow.clone(), this;
  }
  toJSON(meta) {
    const data = super.toJSON(meta);
    return data.object.distance = this.distance, data.object.decay = this.decay, data.object.shadow = this.shadow.toJSON(), data;
  }
}
class OrthographicCamera extends Camera {
  constructor(left = -1, right = 1, top = 1, bottom = -1, near = .1, far = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = left, this.right = right, this.top = top, this.bottom = bottom, this.near = near, this.far = far, this.updateProjectionMatrix();
  }
  copy(source, recursive) {
    return super.copy(source, recursive), this.left = source.left, this.right = source.right, this.top = source.top, this.bottom = source.bottom, this.near = source.near, this.far = source.far, this.zoom = source.zoom, this.view = null === source.view ? null : Object.assign({}, source.view), this;
  }
  setViewOffset(fullWidth, fullHeight, x, y, width, height) {
    null === this.view && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = fullWidth, this.view.fullHeight = fullHeight, this.view.offsetX = x, this.view.offsetY = y, this.view.width = width, this.view.height = height, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const dx = (this.right - this.left) / (2 * this.zoom),
      dy = (this.top - this.bottom) / (2 * this.zoom),
      cx = (this.right + this.left) / 2,
      cy = (this.top + this.bottom) / 2;
    let left = cx - dx,
      right = cx + dx,
      top = cy + dy,
      bottom = cy - dy;
    if (null !== this.view && this.view.enabled) {
      const scaleW = (this.right - this.left) / this.view.fullWidth / this.zoom,
        scaleH = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      left += scaleW * this.view.offsetX, right = left + scaleW * this.view.width, top -= scaleH * this.view.offsetY, bottom = top - scaleH * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(left, right, top, bottom, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(meta) {
    const data = super.toJSON(meta);
    return data.object.zoom = this.zoom, data.object.left = this.left, data.object.right = this.right, data.object.top = this.top, data.object.bottom = this.bottom, data.object.near = this.near, data.object.far = this.far, null !== this.view && (data.object.view = Object.assign({}, this.view)), data;
  }
}
class DirectionalLightShadow extends LightShadow {
  constructor() {
    super(new OrthographicCamera(-5, 5, 5, -5, .5, 500)), this.isDirectionalLightShadow = !0;
  }
}
/**
 * A light that gets emitted in a specific direction. This light will behave
 * as though it is infinitely far away and the rays produced from it are all
 * parallel. The common use case for this is to simulate daylight; the sun is
 * far enough away that its position can be considered to be infinite, and
 * all light rays coming from it are parallel.
 *
 * A common point of confusion for directional lights is that setting the
 * rotation has no effect. This is because three.js's DirectionalLight is the
 * equivalent to what is often called a 'Target Direct Light' in other
 * applications.
 *
 * This means that its direction is calculated as pointing from the light's
 * {@link Object3D#position} to the {@link DirectionalLight#target} position
 * (as opposed to a 'Free Direct Light' that just has a rotation
 * component).
 *
 * This light can cast shadows - see the {@link DirectionalLightShadow} for details.
 *
 * ```js
 * // White directional light at half intensity shining from the top.
 * const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
 * scene.add( directionalLight );
 * ```
 *
 * @augments Light
 */
class DirectionalLight extends Light {
  constructor(color, intensity) {
    super(color, intensity), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(Object3D.DEFAULT_UP), this.updateMatrix(), this.target = new Object3D(), this.shadow = new DirectionalLightShadow();
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(source) {
    return super.copy(source), this.target = source.target.clone(), this.shadow = source.shadow.clone(), this;
  }
  toJSON(meta) {
    const data = super.toJSON(meta);
    return data.object.shadow = this.shadow.toJSON(), data.object.target = this.target.uuid, data;
  }
}
class AmbientLight extends Light {
  constructor(color, intensity) {
    super(color, intensity), this.isAmbientLight = !0, this.type = "AmbientLight";
  }
}
/**
 * This class emits light uniformly across the face a rectangular plane.
 * This light type can be used to simulate light sources such as bright
 * windows or strip lighting.
 *
 * Important Notes:
 *
 * - There is no shadow support.
 * - Only PBR materials are supported.
 * - You have to include `RectAreaLightUniformsLib` (`WebGLRenderer`) or `RectAreaLightTexturesLib` (`WebGPURenderer`)
 * into your app and init the uniforms/textures.
 *
 * ```js
 * RectAreaLightUniformsLib.init(); // only relevant for WebGLRenderer
 * THREE.RectAreaLightNode.setLTC( RectAreaLightTexturesLib.init() ); //  only relevant for WebGPURenderer
 *
 * const intensity = 1; const width = 10; const height = 10;
 * const rectLight = new THREE.RectAreaLight( 0xffffff, intensity, width, height );
 * rectLight.position.set( 5, 5, 0 );
 * rectLight.lookAt( 0, 0, 0 );
 * scene.add( rectLight )
 * ```
 *
 * @augments Light
 */
class RectAreaLight extends Light {
  constructor(color, intensity, width = 10, height = 10) {
    super(color, intensity), this.isRectAreaLight = !0, this.type = "RectAreaLight", this.width = width, this.height = height;
  }
  get power() {
    return this.intensity * this.width * this.height * Math.PI;
  }
  set power(power) {
    this.intensity = power / (this.width * this.height * Math.PI);
  }
  copy(source) {
    return super.copy(source), this.width = source.width, this.height = source.height, this;
  }
  toJSON(meta) {
    const data = super.toJSON(meta);
    return data.object.width = this.width, data.object.height = this.height, data;
  }
}
/**
 * Represents a third-order spherical harmonics (SH). Light probes use this class
 * to encode lighting information.
 *
 * - Primary reference: {@link https://graphics.stanford.edu/papers/envmap/envmap.pdf}
 * - Secondary reference: {@link https://www.ppsloan.org/publications/StupidSH36.pdf}
 */
class SphericalHarmonics3 {
  constructor() {
    this.isSphericalHarmonics3 = !0, this.coefficients = [];
    for (let i = 0; i < 9; i++) this.coefficients.push(new Vector3());
  }
  set(coefficients) {
    for (let i = 0; i < 9; i++) this.coefficients[i].copy(coefficients[i]);
    return this;
  }
  zero() {
    for (let i = 0; i < 9; i++) this.coefficients[i].set(0, 0, 0);
    return this;
  }
  getAt(normal, target) {
    const x = normal.x,
      y = normal.y,
      z = normal.z,
      coeff = this.coefficients;
    return target.copy(coeff[0]).multiplyScalar(.282095), target.addScaledVector(coeff[1], .488603 * y), target.addScaledVector(coeff[2], .488603 * z), target.addScaledVector(coeff[3], .488603 * x), target.addScaledVector(coeff[4], x * y * 1.092548), target.addScaledVector(coeff[5], y * z * 1.092548), target.addScaledVector(coeff[6], .315392 * (3 * z * z - 1)), target.addScaledVector(coeff[7], x * z * 1.092548), target.addScaledVector(coeff[8], .546274 * (x * x - y * y)), target;
  }
  getIrradianceAt(normal, target) {
    const x = normal.x,
      y = normal.y,
      z = normal.z,
      coeff = this.coefficients;
    return target.copy(coeff[0]).multiplyScalar(.886227), target.addScaledVector(coeff[1], 1.023328 * y), target.addScaledVector(coeff[2], 1.023328 * z), target.addScaledVector(coeff[3], 1.023328 * x), target.addScaledVector(coeff[4], .858086 * x * y), target.addScaledVector(coeff[5], .858086 * y * z), target.addScaledVector(coeff[6], .743125 * z * z - .247708), target.addScaledVector(coeff[7], .858086 * x * z), target.addScaledVector(coeff[8], .429043 * (x * x - y * y)), target;
  }
  add(sh) {
    for (let i = 0; i < 9; i++) this.coefficients[i].add(sh.coefficients[i]);
    return this;
  }
  addScaledSH(sh, s) {
    for (let i = 0; i < 9; i++) this.coefficients[i].addScaledVector(sh.coefficients[i], s);
    return this;
  }
  scale(s) {
    for (let i = 0; i < 9; i++) this.coefficients[i].multiplyScalar(s);
    return this;
  }
  lerp(sh, alpha) {
    for (let i = 0; i < 9; i++) this.coefficients[i].lerp(sh.coefficients[i], alpha);
    return this;
  }
  equals(sh) {
    for (let i = 0; i < 9; i++) if (!this.coefficients[i].equals(sh.coefficients[i])) return !1;
    return !0;
  }
  /**
   * Copies the values of the given spherical harmonics to this instance.
   *
   * @param {SphericalHarmonics3} sh - The spherical harmonics to copy.
   * @return {SphericalHarmonics3} A reference to this spherical harmonics.
   */
  copy(sh) {
    return this.set(sh.coefficients);
  }
  /**
   * Returns a new spherical harmonics with copied values from this instance.
   *
   * @return {SphericalHarmonics3} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  fromArray(array, offset = 0) {
    const coefficients = this.coefficients;
    for (let i = 0; i < 9; i++) coefficients[i].fromArray(array, offset + 3 * i);
    return this;
  }
  toArray(array = [], offset = 0) {
    const coefficients = this.coefficients;
    for (let i = 0; i < 9; i++) coefficients[i].toArray(array, offset + 3 * i);
    return array;
  }
  static getBasisAt(normal, shBasis) {
    const x = normal.x,
      y = normal.y,
      z = normal.z;
    shBasis[0] = .282095, shBasis[1] = .488603 * y, shBasis[2] = .488603 * z, shBasis[3] = .488603 * x, shBasis[4] = 1.092548 * x * y, shBasis[5] = 1.092548 * y * z, shBasis[6] = .315392 * (3 * z * z - 1), shBasis[7] = 1.092548 * x * z, shBasis[8] = .546274 * (x * x - y * y);
  }
}
/**
 * Light probes are an alternative way of adding light to a 3D scene. Unlike
 * classical light sources (e.g. directional, point or spot lights), light
 * probes do not emit light. Instead they store information about light
 * passing through 3D space. During rendering, the light that hits a 3D
 * object is approximated by using the data from the light probe.
 *
 * Light probes are usually created from (radiance) environment maps. The
 * class {@link LightProbeGenerator} can be used to create light probes from
 * cube textures or render targets. However, light estimation data could also
 * be provided in other forms e.g. by WebXR. This enables the rendering of
 * augmented reality content that reacts to real world lighting.
 *
 * The current probe implementation in three.js supports so-called diffuse
 * light probes. This type of light probe is functionally equivalent to an
 * irradiance environment map.
 *
 * @augments Light
 */
class LightProbe extends Light {
  constructor(sh = new SphericalHarmonics3(), intensity = 1) {
    super(void 0, intensity), this.isLightProbe = !0, this.sh = sh;
  }
  copy(source) {
    return super.copy(source), this.sh.copy(source.sh), this;
  }
  toJSON(meta) {
    const data = super.toJSON(meta);
    return data.object.sh = this.sh.toArray(), data;
  }
}
const _customMaterials = {};
/**
 * Class for loading materials. The files are internally
 * loaded via {@link FileLoader}.
 *
 * ```js
 * const loader = new THREE.MaterialLoader();
 * const material = await loader.loadAsync( 'material.json' );
 * ```
 * This loader does not support node materials. Use {@link NodeMaterialLoader} instead.
 *
 * @augments Loader
 */
class MaterialLoader extends Loader {
  /**
   * Constructs a new material loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager), this.textures = {};
  }
  /**
   * Starts loading from the given URL and pass the loaded material to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(Material)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  load(url, onLoad, onProgress, onError) {
    const scope = this,
      loader = new FileLoader(scope.manager);
    loader.setPath(scope.path), loader.setRequestHeader(scope.requestHeader), loader.setWithCredentials(scope.withCredentials), loader.load(url, function (text) {
      try {
        onLoad(scope.parse(JSON.parse(text)));
      } catch (e) {
        onError ? onError(e) : error(e), scope.manager.itemError(url);
      }
    }, onProgress, onError);
  }
  /**
   * Parses the given JSON object and returns a material.
   *
   * @param {Object} json - The serialized material.
   * @return {Material} The parsed material.
   */
  parse(json) {
    const material = this.createMaterialFromType(json.type);
    return material.fromJSON(json, this.textures), material;
  }
  /**
   * Textures are not embedded in the material JSON so they have
   * to be injected before the loading process starts.
   *
   * @param {Object} value - A dictionary holding textures for material properties.
   * @return {MaterialLoader} A reference to this material loader.
   */
  setTextures(value) {
    return this.textures = value, this;
  }
  /**
   * Creates a material for the given type.
   *
   * @param {string} type - The material type.
   * @return {Material} The new material.
   */
  createMaterialFromType(type) {
    return MaterialLoader.createMaterialFromType(type);
  }
  /* 在内建材质构造器表后展开 _customMaterials，自定义键可覆盖内建。未知类型 warnOnce 并回退 new Material，已知无参构造对应类型；返回实例，尚未填 JSON 内容。 */
  static createMaterialFromType(e) {
    const t = {
      ShadowMaterial: ShadowMaterial,
      SpriteMaterial: SpriteMaterial,
      RawShaderMaterial: RawShaderMaterial,
      ShaderMaterial: ShaderMaterial,
      PointsMaterial: PointsMaterial,
      MeshPhysicalMaterial: MeshPhysicalMaterial,
      MeshStandardMaterial: MeshStandardMaterial,
      MeshPhongMaterial: MeshPhongMaterial,
      MeshToonMaterial: MeshToonMaterial,
      MeshNormalMaterial: MeshNormalMaterial,
      MeshLambertMaterial: MeshLambertMaterial,
      MeshDepthMaterial: MeshDepthMaterial,
      MeshDistanceMaterial: MeshDistanceMaterial,
      MeshBasicMaterial: MeshBasicMaterial,
      MeshMatcapMaterial: MeshMatcapMaterial,
      LineDashedMaterial: LineDashedMaterial,
      LineBasicMaterial: LineBasicMaterial,
      Material: Material,
      ..._customMaterials
    }[e];
    let n;
    return void 0 === t ? (warnOnce(`MaterialLoader: Unknown material type "${e}". Use .registerMaterial() before starting the deserialization process.`), n = new Material()) : n = new t(), n;
  }
  /**
   * Registers the given material at the internal
   * material library.
   *
   * @static
   * @param {string} type - The material type.
   * @param {Material.constructor} materialClass - The material class.
   */
  static registerMaterial(type, materialClass) {
    _customMaterials[type] = materialClass;
  }
}
class LoaderUtils {
  static extractUrlBase(url) {
    const index = url.lastIndexOf("/");
    return -1 === index ? "./" : url.slice(0, index + 1);
  }
  /* 非字符串/空 URL 返回空串；当 base 是 http(s) 且 URL 以 / 开头，先把 base 截到 origin。http(s)/协议相对、data:（匹配含逗号）、blob: 保持；其余直接 path+url。不是完整 new URL 归一化：不解析 ../、不替换所有协议。 */
  static resolveURL(e, t) {
    return "string" != typeof e || "" === e ? "" : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e);
  }
}
class InstancedBufferGeometry extends BufferGeometry {
  constructor() {
    super(), this.isInstancedBufferGeometry = !0, this.type = "InstancedBufferGeometry", this.instanceCount = 1 / 0;
  }
  copy(source) {
    return super.copy(source), this.instanceCount = source.instanceCount, this;
  }
  toJSON() {
    const data = super.toJSON();
    return data.instanceCount = this.instanceCount, data.isInstancedBufferGeometry = !0, data;
  }
}
/**
 * Class for loading geometries. The files are internally
 * loaded via {@link FileLoader}.
 *
 * ```js
 * const loader = new THREE.BufferGeometryLoader();
 * const geometry = await loader.loadAsync( 'models/json/pressure.json' );
 *
 * const material = new THREE.MeshBasicMaterial( { color: 0xF5F5F5 } );
 * const object = new THREE.Mesh( geometry, material );
 * scene.add( object );
 * ```
 *
 * @augments Loader
 */
class BufferGeometryLoader extends Loader {
  /**
   * Constructs a new geometry loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager);
  }
  /**
   * Starts loading from the given URL and pass the loaded geometry to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(BufferGeometry)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  load(url, onLoad, onProgress, onError) {
    const scope = this,
      loader = new FileLoader(scope.manager);
    loader.setPath(scope.path), loader.setRequestHeader(scope.requestHeader), loader.setWithCredentials(scope.withCredentials), loader.load(url, function (text) {
      try {
        onLoad(scope.parse(JSON.parse(text)));
      } catch (e) {
        onError ? onError(e) : error(e), scope.manager.itemError(url);
      }
    }, onProgress, onError);
  }
  /* 由 isInstancedBufferGeometry 选实例；还原 index typed array、普通/实例/交错 attributes、morphAttributes/name/usage/normalized。交错 buffer 与底层 ArrayBuffer 按 UUID 两级缓存，保留共享存储关系；序列化 words 经 Uint32Array(...).buffer 复原，再按声明 type 建 view。返回 geometry，不计算缺失 normal 或 bounds，也不上传 GPU。 */
  parse(e) {
    const t = {},
      n = {};
    function r(e, r) {
      if (void 0 !== t[r]) return t[r];
      const i = e.interleavedBuffers[r],
        a = function (e, t) {
          if (void 0 !== n[t]) return n[t];
          const r = e.arrayBuffers,
            i = r[t],
            a = new Uint32Array(i).buffer;
          return n[t] = a, a;
        }(e, i.buffer),
        s = getTypedArray(i.type, a),
        interleavedBuffer = new InterleavedBuffer(s, i.stride);
      return interleavedBuffer.uuid = i.uuid, t[r] = interleavedBuffer, interleavedBuffer;
    }
    const i = e.isInstancedBufferGeometry ? new InstancedBufferGeometry() : new BufferGeometry(),
      a = e.data.index;
    if (void 0 !== a) {
      const e = getTypedArray(a.type, a.array);
      i.setIndex(new BufferAttribute(e, 1));
    }
    const s = e.data.attributes;
    for (const t in s) {
      const n = s[t];
      let a;
      if (n.isInterleavedBufferAttribute) {
        const t = r(e.data, n.data);
        a = new InterleavedBufferAttribute(t, n.itemSize, n.offset, n.normalized);
      } else {
        const e = getTypedArray(n.type, n.array);
        a = new (n.isInstancedBufferAttribute ? InstancedBufferAttribute : BufferAttribute)(e, n.itemSize, n.normalized);
      }
      void 0 !== n.name && (a.name = n.name), void 0 !== n.usage && a.setUsage(n.usage), i.setAttribute(t, a);
    }
    const o = e.data.morphAttributes;
    if (o) for (const t in o) {
      const n = o[t],
        a = [];
      for (let t = 0, i = n.length; t < i; t++) {
        const i = n[t];
        let s;
        if (i.isInterleavedBufferAttribute) {
          const t = r(e.data, i.data);
          s = new InterleavedBufferAttribute(t, i.itemSize, i.offset, i.normalized);
        } else {
          const e = getTypedArray(i.type, i.array);
          s = new BufferAttribute(e, i.itemSize, i.normalized);
        }
        void 0 !== i.name && (s.name = i.name), a.push(s);
      }
      i.morphAttributes[t] = a;
    }
    e.data.morphTargetsRelative && (i.morphTargetsRelative = !0);
    const c = e.data.groups || e.data.drawcalls || e.data.offsets;
    if (void 0 !== c) for (let e = 0, t = c.length; e !== t; ++e) {
      const t = c[e];
      i.addGroup(t.start, t.count, t.materialIndex);
    }
    const l = e.data.boundingSphere;
    return void 0 !== l && (i.boundingSphere = new Sphere().fromJSON(l)), e.name && (i.name = e.name), e.userData && (i.userData = e.userData), i;
  }
}
const _customGeometries = {};
/**
 * A loader for loading a JSON resource in the [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4).
 * The files are internally loaded via {@link FileLoader}.
 *
 * ```js
 * const loader = new THREE.ObjectLoader();
 * const obj = await loader.loadAsync( 'models/json/example.json' );
 * scene.add( obj );
 *
 * // Alternatively, to parse a previously loaded JSON structure
 * const object = await loader.parseAsync( a_json_object );
 * scene.add( object );
 * ```
 *
 * @augments Loader
 */
class ObjectLoader extends Loader {
  /**
   * Constructs a new object loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager);
  }
  load(url, onLoad, onProgress, onError) {
    const scope = this,
      path = "" === this.path ? LoaderUtils.extractUrlBase(url) : this.path;
    this.resourcePath = this.resourcePath || path;
    const loader = new FileLoader(this.manager);
    loader.setPath(this.path), loader.setRequestHeader(this.requestHeader), loader.setWithCredentials(this.withCredentials), loader.load(url, function (text) {
      let json = null;
      try {
        json = JSON.parse(text);
      } catch (e) {
        return void 0 !== onError && onError(e), void error("ObjectLoader: Can't parse " + url + ".", e.message);
      }
      const metadata = json.metadata;
      if (void 0 === metadata || void 0 === metadata.type || "geometry" === metadata.type.toLowerCase()) return void 0 !== onError && onError(new Error("THREE.ObjectLoader: Can't load " + url)), void error("ObjectLoader: Can't load " + url);
      scope.parse(json, onLoad);
    }, onProgress, onError);
  }
  /* 确定 resourcePath（优先已有值，否则 this.path 或请求目录），配置 FileLoader 的 path/header/credentials，await 文本并 JSON.parse；坏 JSON 包装含 URL 错误，metadata 缺 type 或 type=geometry 拒绝，最终 await parseAsync。返回完整对象 Promise，区别于仅 callback 的 FileLoader.load。 */
  async loadAsync(e, t) {
    const n = "" === this.path ? LoaderUtils.extractUrlBase(e) : this.path;
    this.resourcePath = this.resourcePath || n;
    const fileLoader = new FileLoader(this.manager);
    fileLoader.setPath(this.path), fileLoader.setRequestHeader(this.requestHeader), fileLoader.setWithCredentials(this.withCredentials);
    const i = await fileLoader.loadAsync(e, t);
    let a;
    try {
      a = JSON.parse(i);
    } catch (t) {
      throw new Error("THREE.ObjectLoader: Can't parse " + e + ". " + t.message);
    }
    const s = a.metadata;
    if (void 0 === s || void 0 === s.type || "geometry" === s.type.toLowerCase()) throw new Error("THREE.ObjectLoader: Can't load " + e);
    return await this.parseAsync(a);
  }
  parse(json, onLoad) {
    const animations = this.parseAnimations(json.animations),
      shapes = this.parseShapes(json.shapes),
      geometries = this.parseGeometries(json.geometries, shapes),
      images = this.parseImages(json.images, function () {
        void 0 !== onLoad && onLoad(object);
      }),
      textures = this.parseTextures(json.textures, images),
      materials = this.parseMaterials(json.materials, textures),
      object = this.parseObject(json.object, geometries, materials, textures, animations),
      skeletons = this.parseSkeletons(json.skeletons, object);
    if (this.bindSkeletons(object, skeletons), this.bindLightTargets(object), void 0 !== onLoad) {
      let hasImages = !1;
      for (const uuid in images) if (images[uuid].data instanceof HTMLImageElement) {
        hasImages = !0;
        break;
      }
      !1 === hasImages && onLoad(object);
    }
    return object;
  }
  /**
   * Async version of {@link ObjectLoader#parse}.
   *
   * @param {Object} json - The serialized 3D object.
   * @return {Promise<Object3D>} A Promise that resolves with the parsed 3D object.
   */
  async parseAsync(json) {
    const animations = this.parseAnimations(json.animations),
      shapes = this.parseShapes(json.shapes),
      geometries = this.parseGeometries(json.geometries, shapes),
      images = await this.parseImagesAsync(json.images),
      textures = this.parseTextures(json.textures, images),
      materials = this.parseMaterials(json.materials, textures),
      object = this.parseObject(json.object, geometries, materials, textures, animations),
      skeletons = this.parseSkeletons(json.skeletons, object);
    return this.bindSkeletons(object, skeletons), this.bindLightTargets(object), object;
  }
  /**
   * Registers the given geometry at the internal
   * geometry library.
   *
   * @static
   * @param {string} type - The geometry type.
   * @param {BufferGeometry.constructor} geometryClass - The geometry class.
   */
  static registerGeometry(type, geometryClass) {
    _customGeometries[type] = geometryClass;
  }
  parseShapes(json) {
    const shapes = {};
    if (void 0 !== json) for (let i = 0, l = json.length; i < l; i++) {
      const shape = new Shape().fromJSON(json[i]);
      shapes[shape.uuid] = shape;
    }
    return shapes;
  }
  parseSkeletons(json, object) {
    const skeletons = {},
      bones = {};
    if (object.traverse(function (child) {
      child.isBone && (bones[child.uuid] = child);
    }), void 0 !== json) for (let i = 0, l = json.length; i < l; i++) {
      const skeleton = new Skeleton().fromJSON(json[i], bones);
      skeletons[skeleton.uuid] = skeleton;
    }
    return skeletons;
  }
  parseGeometries(json, shapes) {
    const geometries = {};
    if (void 0 !== json) {
      const bufferGeometryLoader = new BufferGeometryLoader();
      for (let i = 0, l = json.length; i < l; i++) {
        let geometry;
        const data = json[i];
        switch (data.type) {
          case "BufferGeometry":
          case "InstancedBufferGeometry":
            geometry = bufferGeometryLoader.parse(data);
            break;
          default:
            data.type in Wo ? geometry = Wo[data.type].fromJSON(data, shapes) : data.type in _customGeometries ? geometry = _customGeometries[data.type].fromJSON(data, shapes) : warn(`ObjectLoader: Unknown geometry type "${data.type}". Use .registerGeometry() before starting the deserialization process.`);
        }
        geometry.uuid = data.uuid, void 0 !== data.name && (geometry.name = data.name), void 0 !== data.userData && (geometry.userData = data.userData), geometries[data.uuid] = geometry;
      }
    }
    return geometries;
  }
  parseMaterials(json, textures) {
    const cache = {},
      materials = {};
    if (void 0 !== json) {
      const loader = new MaterialLoader();
      loader.setTextures(textures);
      for (let i = 0, l = json.length; i < l; i++) {
        const data = json[i];
        void 0 === cache[data.uuid] && (cache[data.uuid] = loader.parse(data)), materials[data.uuid] = cache[data.uuid];
      }
    }
    return materials;
  }
  parseAnimations(json) {
    const animations = {};
    if (void 0 !== json) for (let i = 0; i < json.length; i++) {
      const data = json[i],
        clip = AnimationClip.parse(data);
      animations[clip.uuid] = clip;
    }
    return animations;
  }
  /* 字符串 URL 按 resourcePath 补相对路径，经 manager.resolveURL 与父 manager 的 itemStart/End 计数；独立 LoadingManager(onLoad)+ImageLoader 跟踪图完成。内嵌 data 对象重建 typed array/width/height；cube 数组将内嵌数据包装为 DataTexture，HTMLImageElement 保持。每 UUID 包成 Source，返回字典；字符串图片此时可仍在加载，不意味着像素已可用。 */
  parseImages(e, t) {
    const n = this,
      r = {};
    let i;
    function a(e) {
      if ("string" == typeof e) {
        const t = e;
        return function (e) {
          return e = n.manager.resolveURL(e), n.manager.itemStart(e), i.load(e, function () {
            n.manager.itemEnd(e);
          }, void 0, function () {
            n.manager.itemError(e), n.manager.itemEnd(e);
          });
        }(/^(\/\/)|([a-z]+:(\/\/)?)/i.test(t) ? t : n.resourcePath + t);
      }
      return e.data ? {
        data: getTypedArray(e.type, e.data),
        width: e.width,
        height: e.height
      } : null;
    }
    if (void 0 !== e && e.length > 0) {
      const loadingManager = new LoadingManager(t);
      i = new ImageLoader(loadingManager), i.setCrossOrigin(this.crossOrigin);
      for (let t = 0, n = e.length; t < n; t++) {
        const n = e[t],
          i = n.url;
        if (Array.isArray(i)) {
          const e = [];
          for (let t = 0, n = i.length; t < n; t++) {
            const n = a(i[t]);
            null !== n && (n instanceof HTMLImageElement ? e.push(n) : e.push(new DataTexture(n.data, n.width, n.height)));
          }
          r[n.uuid] = new Source(e);
        } else {
          const e = a(n.url);
          r[n.uuid] = new Source(e);
        }
      }
    }
    return r;
  }
  async parseImagesAsync(json) {
    const scope = this,
      images = {};
    let loader;
    async function deserializeImage(image) {
      if ("string" == typeof image) {
        const url = image,
          path = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(url) ? url : scope.resourcePath + url;
        return await loader.loadAsync(path);
      }
      return image.data ? {
        data: getTypedArray(image.type, image.data),
        width: image.width,
        height: image.height
      } : null;
    }
    if (void 0 !== json && json.length > 0) {
      loader = new ImageLoader(this.manager), loader.setCrossOrigin(this.crossOrigin);
      for (let i = 0, il = json.length; i < il; i++) {
        const image = json[i],
          url = image.url;
        if (Array.isArray(url)) {
          const imageArray = [];
          for (let j = 0, jl = url.length; j < jl; j++) {
            const currentUrl = url[j],
              deserializedImage = await deserializeImage(currentUrl);
            null !== deserializedImage && (deserializedImage instanceof HTMLImageElement ? imageArray.push(deserializedImage) : imageArray.push(new DataTexture(deserializedImage.data, deserializedImage.width, deserializedImage.height)));
          }
          images[image.uuid] = new Source(imageArray);
        } else {
          const deserializedImage = await deserializeImage(image.url);
          images[image.uuid] = new Source(deserializedImage);
        }
      }
    }
    return images;
  }
  /* 按 Source.data 判断 CubeTexture、DataTexture 或 Texture，关联共享 Source 与 UUID。cube 六面或普通非空图标 needsUpdate；恢复 channel、UV变换、wrap/filter/mapping、像素type/format/colorSpace、mipmap/flipY/compare 等字段，历史字符串常量查表且警告。返回纹理字典；缺 Source 虽先 warn，但后续直接 source.data，未做可恢复 fallback。 */
  parseTextures(e, t) {
    function n(e, t) {
      return "number" == typeof e ? e : (warn("ObjectLoader.parseTexture: Constant should be in numeric form.", e), t[e]);
    }
    const r = {};
    if (void 0 !== e) for (let i = 0, a = e.length; i < a; i++) {
      const a = e[i];
      void 0 === a.image && warn('ObjectLoader: No "image" specified for', a.uuid), void 0 === t[a.image] && warn("ObjectLoader: Undefined image", a.image);
      const s = t[a.image],
        o = s.data;
      let c;
      Array.isArray(o) ? (c = new CubeTexture(), 6 === o.length && (c.needsUpdate = !0)) : (c = o && o.data ? new DataTexture() : new Texture(), o && (c.needsUpdate = !0)), c.source = s, c.uuid = a.uuid, void 0 !== a.name && (c.name = a.name), void 0 !== a.mapping && (c.mapping = n(a.mapping, pc)), void 0 !== a.channel && (c.channel = a.channel), void 0 !== a.offset && c.offset.fromArray(a.offset), void 0 !== a.repeat && c.repeat.fromArray(a.repeat), void 0 !== a.center && c.center.fromArray(a.center), void 0 !== a.rotation && (c.rotation = a.rotation), void 0 !== a.wrap && (c.wrapS = n(a.wrap[0], fc), c.wrapT = n(a.wrap[1], fc)), void 0 !== a.format && (c.format = a.format), void 0 !== a.internalFormat && (c.internalFormat = a.internalFormat), void 0 !== a.type && (c.type = a.type), void 0 !== a.colorSpace && (c.colorSpace = a.colorSpace), void 0 !== a.minFilter && (c.minFilter = n(a.minFilter, mc)), void 0 !== a.magFilter && (c.magFilter = n(a.magFilter, mc)), void 0 !== a.anisotropy && (c.anisotropy = a.anisotropy), void 0 !== a.flipY && (c.flipY = a.flipY), void 0 !== a.generateMipmaps && (c.generateMipmaps = a.generateMipmaps), void 0 !== a.premultiplyAlpha && (c.premultiplyAlpha = a.premultiplyAlpha), void 0 !== a.unpackAlignment && (c.unpackAlignment = a.unpackAlignment), void 0 !== a.compareFunction && (c.compareFunction = a.compareFunction), void 0 !== a.normalized && (c.normalized = a.normalized), void 0 !== a.userData && (c.userData = a.userData), r[a.uuid] = c;
    }
    return r;
  }
  parseObject(data, geometries, materials, textures, animations) {
    let object, geometry, material;
    function getGeometry(name) {
      return void 0 === geometries[name] && warn("ObjectLoader: Undefined geometry", name), geometries[name];
    }
    function getMaterial(name) {
      if (void 0 !== name) {
        if (Array.isArray(name)) {
          const array = [];
          for (let i = 0, l = name.length; i < l; i++) {
            const uuid = name[i];
            void 0 === materials[uuid] && warn("ObjectLoader: Undefined material", uuid), array.push(materials[uuid]);
          }
          return array;
        }
        return void 0 === materials[name] && warn("ObjectLoader: Undefined material", name), materials[name];
      }
    }
    function getTexture(uuid) {
      return void 0 === textures[uuid] && warn("ObjectLoader: Undefined texture", uuid), textures[uuid];
    }
    switch (data.type) {
      case "Scene":
        object = new Scene(), void 0 !== data.background && (Number.isInteger(data.background) ? object.background = new Color(data.background) : object.background = getTexture(data.background)), void 0 !== data.environment && (object.environment = getTexture(data.environment)), void 0 !== data.fog && ("Fog" === data.fog.type ? object.fog = new Fog(data.fog.color, data.fog.near, data.fog.far) : "FogExp2" === data.fog.type && (object.fog = new FogExp2(data.fog.color, data.fog.density)), "" !== data.fog.name && (object.fog.name = data.fog.name)), void 0 !== data.backgroundBlurriness && (object.backgroundBlurriness = data.backgroundBlurriness), void 0 !== data.backgroundIntensity && (object.backgroundIntensity = data.backgroundIntensity), void 0 !== data.backgroundRotation && object.backgroundRotation.fromArray(data.backgroundRotation), void 0 !== data.environmentIntensity && (object.environmentIntensity = data.environmentIntensity), void 0 !== data.environmentRotation && object.environmentRotation.fromArray(data.environmentRotation);
        break;
      case "PerspectiveCamera":
        object = new PerspectiveCamera(data.fov, data.aspect, data.near, data.far), void 0 !== data.focus && (object.focus = data.focus), void 0 !== data.zoom && (object.zoom = data.zoom), void 0 !== data.filmGauge && (object.filmGauge = data.filmGauge), void 0 !== data.filmOffset && (object.filmOffset = data.filmOffset), void 0 !== data.view && (object.view = Object.assign({}, data.view));
        break;
      case "OrthographicCamera":
        object = new OrthographicCamera(data.left, data.right, data.top, data.bottom, data.near, data.far), void 0 !== data.zoom && (object.zoom = data.zoom), void 0 !== data.view && (object.view = Object.assign({}, data.view));
        break;
      case "AmbientLight":
        object = new AmbientLight(data.color, data.intensity);
        break;
      case "DirectionalLight":
        object = new DirectionalLight(data.color, data.intensity), object.target = data.target || "";
        break;
      case "PointLight":
        object = new PointLight(data.color, data.intensity, data.distance, data.decay);
        break;
      case "RectAreaLight":
        object = new RectAreaLight(data.color, data.intensity, data.width, data.height);
        break;
      case "SpotLight":
        object = new SpotLight(data.color, data.intensity, data.distance, data.angle, data.penumbra, data.decay), object.target = data.target || "";
        break;
      case "HemisphereLight":
        object = new HemisphereLight(data.color, data.groundColor, data.intensity);
        break;
      case "LightProbe":
        const sh = new SphericalHarmonics3().fromArray(data.sh);
        object = new LightProbe(sh, data.intensity);
        break;
      case "SkinnedMesh":
        geometry = getGeometry(data.geometry), material = getMaterial(data.material), object = new SkinnedMesh(geometry, material), void 0 !== data.bindMode && (object.bindMode = data.bindMode), void 0 !== data.bindMatrix && object.bindMatrix.fromArray(data.bindMatrix), void 0 !== data.skeleton && (object.skeleton = data.skeleton);
        break;
      case "Mesh":
        geometry = getGeometry(data.geometry), material = getMaterial(data.material), object = new Mesh(geometry, material);
        break;
      case "InstancedMesh":
        geometry = getGeometry(data.geometry), material = getMaterial(data.material);
        const count = data.count,
          instanceMatrix = data.instanceMatrix,
          instanceColor = data.instanceColor;
        object = new InstancedMesh(geometry, material, count), object.instanceMatrix = new InstancedBufferAttribute(new Float32Array(instanceMatrix.array), 16), void 0 !== instanceColor && (object.instanceColor = new InstancedBufferAttribute(new Float32Array(instanceColor.array), instanceColor.itemSize));
        break;
      case "BatchedMesh":
        geometry = getGeometry(data.geometry), material = getMaterial(data.material), object = new BatchedMesh(data.maxInstanceCount, data.maxVertexCount, data.maxIndexCount, material), object.geometry = geometry, object.perObjectFrustumCulled = data.perObjectFrustumCulled, object.sortObjects = data.sortObjects, object._drawRanges = data.drawRanges, object._reservedRanges = data.reservedRanges, object._geometryInfo = data.geometryInfo.map(info => {
          let box = null,
            sphere = null;
          return void 0 !== info.boundingBox && (box = new Box3().fromJSON(info.boundingBox)), void 0 !== info.boundingSphere && (sphere = new Sphere().fromJSON(info.boundingSphere)), {
            ...info,
            boundingBox: box,
            boundingSphere: sphere
          };
        }), object._instanceInfo = data.instanceInfo, object._availableInstanceIds = data._availableInstanceIds, object._availableGeometryIds = data._availableGeometryIds, object._nextIndexStart = data.nextIndexStart, object._nextVertexStart = data.nextVertexStart, object._geometryCount = data.geometryCount, object._maxInstanceCount = data.maxInstanceCount, object._maxVertexCount = data.maxVertexCount, object._maxIndexCount = data.maxIndexCount, object._geometryInitialized = data.geometryInitialized, object._matricesTexture = getTexture(data.matricesTexture.uuid), object._indirectTexture = getTexture(data.indirectTexture.uuid), void 0 !== data.colorsTexture && (object._colorsTexture = getTexture(data.colorsTexture.uuid)), void 0 !== data.boundingSphere && (object.boundingSphere = new Sphere().fromJSON(data.boundingSphere)), void 0 !== data.boundingBox && (object.boundingBox = new Box3().fromJSON(data.boundingBox));
        break;
      case "LOD":
        object = new LOD();
        break;
      case "Line":
        object = new Line(getGeometry(data.geometry), getMaterial(data.material));
        break;
      case "LineLoop":
        object = new LineLoop(getGeometry(data.geometry), getMaterial(data.material));
        break;
      case "LineSegments":
        object = new LineSegments(getGeometry(data.geometry), getMaterial(data.material));
        break;
      case "PointCloud":
      case "Points":
        object = new Points(getGeometry(data.geometry), getMaterial(data.material));
        break;
      case "Sprite":
        object = new Sprite(getMaterial(data.material));
        break;
      case "Group":
        object = new Group();
        break;
      case "Bone":
        object = new Bone();
        break;
      default:
        object = new Object3D();
    }
    if (object.uuid = data.uuid, void 0 !== data.name && (object.name = data.name), void 0 !== data.matrix ? (object.matrix.fromArray(data.matrix), void 0 !== data.matrixAutoUpdate && (object.matrixAutoUpdate = data.matrixAutoUpdate), object.matrixAutoUpdate && object.matrix.decompose(object.position, object.quaternion, object.scale)) : (void 0 !== data.position && object.position.fromArray(data.position), void 0 !== data.rotation && object.rotation.fromArray(data.rotation), void 0 !== data.quaternion && object.quaternion.fromArray(data.quaternion), void 0 !== data.scale && object.scale.fromArray(data.scale)), void 0 !== data.up && object.up.fromArray(data.up), void 0 !== data.pivot && (object.pivot = new Vector3().fromArray(data.pivot)), void 0 !== data.morphTargetDictionary && (object.morphTargetDictionary = Object.assign({}, data.morphTargetDictionary)), void 0 !== data.morphTargetInfluences && (object.morphTargetInfluences = data.morphTargetInfluences.slice()), void 0 !== data.castShadow && (object.castShadow = data.castShadow), void 0 !== data.receiveShadow && (object.receiveShadow = data.receiveShadow), data.shadow && (void 0 !== data.shadow.intensity && (object.shadow.intensity = data.shadow.intensity), void 0 !== data.shadow.bias && (object.shadow.bias = data.shadow.bias), void 0 !== data.shadow.normalBias && (object.shadow.normalBias = data.shadow.normalBias), void 0 !== data.shadow.radius && (object.shadow.radius = data.shadow.radius), void 0 !== data.shadow.mapSize && object.shadow.mapSize.fromArray(data.shadow.mapSize), void 0 !== data.shadow.camera && (object.shadow.camera = this.parseObject(data.shadow.camera))), void 0 !== data.visible && (object.visible = data.visible), void 0 !== data.frustumCulled && (object.frustumCulled = data.frustumCulled), void 0 !== data.renderOrder && (object.renderOrder = data.renderOrder), void 0 !== data.static && (object.static = data.static), void 0 !== data.userData && (object.userData = data.userData), void 0 !== data.layers && (object.layers.mask = data.layers), void 0 !== data.children) {
      const children = data.children;
      for (let i = 0; i < children.length; i++) object.add(this.parseObject(children[i], geometries, materials, textures, animations));
    }
    if (void 0 !== data.animations) {
      const objectAnimations = data.animations;
      for (let i = 0; i < objectAnimations.length; i++) {
        const uuid = objectAnimations[i];
        object.animations.push(animations[uuid]);
      }
    }
    if ("LOD" === data.type) {
      void 0 !== data.autoUpdate && (object.autoUpdate = data.autoUpdate);
      const levels = data.levels;
      for (let l = 0; l < levels.length; l++) {
        const level = levels[l],
          child = object.getObjectByProperty("uuid", level.object);
        void 0 !== child && object.addLevel(child, level.distance, level.hysteresis);
      }
    }
    return object;
  }
  bindSkeletons(object, skeletons) {
    0 !== Object.keys(skeletons).length && object.traverse(function (child) {
      if (!0 === child.isSkinnedMesh && void 0 !== child.skeleton) {
        const skeleton = skeletons[child.skeleton];
        void 0 === skeleton ? warn("ObjectLoader: No skeleton found with UUID:", child.skeleton) : child.bind(skeleton, child.bindMatrix);
      }
    });
  }
  /* 遍历对象树，只处理 directional/spot light，把 child.target 暂存的 UUID 用树内 getObjectByProperty 解成对象；找不到则 new Object3D。修补引用而非复制目标坐标，不自动 add fallback 到场景。 */
  bindLightTargets(e) {
    e.traverse(function (t) {
      if (t.isDirectionalLight || t.isSpotLight) {
        const n = t.target,
          r = e.getObjectByProperty("uuid", n);
        t.target = void 0 !== r ? r : new Object3D();
      }
    });
  }
}
const pc = {
    UVMapping: UVMapping,
    CubeReflectionMapping: CubeReflectionMapping,
    CubeRefractionMapping: CubeRefractionMapping,
    EquirectangularReflectionMapping: EquirectangularReflectionMapping,
    EquirectangularRefractionMapping: EquirectangularRefractionMapping,
    CubeUVReflectionMapping: CubeUVReflectionMapping
  },
  fc = {
    RepeatWrapping: RepeatWrapping,
    ClampToEdgeWrapping: ClampToEdgeWrapping,
    MirroredRepeatWrapping: MirroredRepeatWrapping
  },
  mc = {
    NearestFilter: NearestFilter,
    NearestMipmapNearestFilter: NearestMipmapNearestFilter,
    NearestMipmapLinearFilter: NearestMipmapLinearFilter,
    LinearFilter: LinearFilter,
    LinearMipmapNearestFilter: LinearMipmapNearestFilter,
    LinearMipmapLinearFilter: LinearMipmapLinearFilter
  },
  Mc = new WeakMap();
/**
 * A loader for loading images as an [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap).
 * An `ImageBitmap` provides an asynchronous and resource efficient pathway to prepare
 * textures for rendering.
 *
 * Note that {@link Texture#flipY} and {@link Texture#premultiplyAlpha} are ignored with image bitmaps.
 * These options need to be configured via {@link ImageBitmapLoader#setOptions} prior to loading,
 * unlike regular images which can be configured on the Texture to set these options on GPU upload instead.
 *
 * To match the default behaviour of {@link Texture}, the following options are needed:
 *
 * ```js
 * { imageOrientation: 'flipY', premultiplyAlpha: 'none' }
 * ```
 *
 * Also note that unlike {@link FileLoader}, this loader will only avoid multiple concurrent requests to the same URL if {@link Cache} is enabled.
 *
 * ```js
 * const loader = new THREE.ImageBitmapLoader();
 * loader.setOptions( { imageOrientation: 'flipY' } ); // set options if needed
 * const imageBitmap = await loader.loadAsync( 'image.png' );
 *
 * const texture = new THREE.Texture( imageBitmap );
 * texture.needsUpdate = true;
 * ```
 *
 * @augments Loader
 */
class ImageBitmapLoader extends Loader {
  constructor(manager) {
    super(manager), this.isImageBitmapLoader = !0, "undefined" == typeof createImageBitmap && warn("ImageBitmapLoader: createImageBitmap() not supported."), "undefined" == typeof fetch && warn("ImageBitmapLoader: fetch() not supported."), this.options = {
      premultiplyAlpha: "none"
    }, this._abortController = new AbortController();
  }
  /**
   * Sets the given loader options. The structure of the object must match the `options` parameter of
   * [createImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/Window/createImageBitmap).
   *
   * Note: When caching is enabled, the cache key is based on the URL only. Loading the same URL with
   * different options will return the cached result of the first request.
   *
   * @param {Object} options - The loader options to set.
   * @return {ImageBitmapLoader} A reference to this image bitmap loader.
   */
  setOptions(options) {
    return this.options = options, this;
  }
  load(url, onLoad, onProgress, onError) {
    void 0 === url && (url = ""), void 0 !== this.path && (url = this.path + url), url = this.manager.resolveURL(url);
    const scope = this,
      cached = Cache.get(`image-bitmap:${url}`);
    if (void 0 !== cached) return scope.manager.itemStart(url), cached.then ? void cached.then(imageBitmap => {
      !0 === Mc.has(cached) ? (onError && onError(Mc.get(cached)), scope.manager.itemError(url), scope.manager.itemEnd(url)) : (onLoad && onLoad(imageBitmap), scope.manager.itemEnd(url));
    }) : void setTimeout(function () {
      onLoad && onLoad(cached), scope.manager.itemEnd(url);
    }, 0);
    const fetchOptions = {};
    fetchOptions.credentials = "anonymous" === this.crossOrigin ? "same-origin" : "include", fetchOptions.headers = this.requestHeader, fetchOptions.signal = "function" == typeof AbortSignal.any ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal;
    const promise = fetch(url, fetchOptions).then(function (res) {
      return res.blob();
    }).then(function (blob) {
      return createImageBitmap(blob, Object.assign(scope.options, {
        colorSpaceConversion: "none"
      }));
    }).then(function (imageBitmap) {
      Cache.add(`image-bitmap:${url}`, imageBitmap), onLoad && onLoad(imageBitmap), scope.manager.itemEnd(url);
    }).catch(function (e) {
      onError && onError(e), Mc.set(promise, e), Cache.remove(`image-bitmap:${url}`), scope.manager.itemError(url), scope.manager.itemEnd(url);
    });
    Cache.add(`image-bitmap:${url}`, promise), scope.manager.itemStart(url);
  }
  /**
   * Aborts ongoing fetch requests.
   *
   * @return {ImageBitmapLoader} A reference to this instance.
   */
  abort() {
    return this._abortController.abort(), this._abortController = new AbortController(), this;
  }
}
let _c;
class AudioContext {
  static getContext() {
    return void 0 === _c && (_c = new (window.AudioContext || window.webkitAudioContext)()), _c;
  }
  static setContext(value) {
    _c = value;
  }
}
/**
 * Class for loading audio buffers. Audios are internally
 * loaded via {@link FileLoader}.
 *
 * ```js
 * const audioListener = new THREE.AudioListener();
 * const ambientSound = new THREE.Audio( audioListener );
 *
 * const loader = new THREE.AudioLoader();
 * const audioBuffer = await loader.loadAsync( 'audio/ambient_ocean.ogg' );
 *
 * ambientSound.setBuffer( audioBuffer );
 * ambientSound.play();
 * ```
 *
 * @augments Loader
 */
class AudioLoader extends Loader {
  /**
   * Constructs a new audio loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(manager) {
    super(manager);
  }
  load(url, onLoad, onProgress, onError) {
    const scope = this,
      loader = new FileLoader(this.manager);
    function handleError(e) {
      onError ? onError(e) : error(e), scope.manager.itemError(url);
    }
    loader.setResponseType("arraybuffer"), loader.setPath(this.path), loader.setRequestHeader(this.requestHeader), loader.setWithCredentials(this.withCredentials), loader.load(url, function (buffer) {
      try {
        const bufferCopy = buffer.slice(0),
          context = AudioContext.getContext(),
          decodeUrl = url + "#decode";
        scope.manager.itemStart(decodeUrl), context.decodeAudioData(bufferCopy, function (audioBuffer) {
          onLoad(audioBuffer), scope.manager.itemEnd(decodeUrl);
        }).catch(function (e) {
          handleError(e), scope.manager.itemEnd(decodeUrl);
        });
      } catch (e) {
        handleError(e);
      }
    }, onProgress, onError);
  }
}
const Ac = new Matrix4(),
  gc = new Matrix4(),
  bc = new Matrix4();
class StereoCamera {
  constructor() {
    this.type = "StereoCamera", this.aspect = 1, this.eyeSep = .064, this.cameraL = new PerspectiveCamera(), this.cameraL.layers.enable(1), this.cameraL.matrixAutoUpdate = !1, this.cameraR = new PerspectiveCamera(), this.cameraR.layers.enable(2), this.cameraR.matrixAutoUpdate = !1, this._cache = {
      focus: null,
      fov: null,
      aspect: null,
      near: null,
      far: null,
      zoom: null,
      eyeSep: null
    };
  }
  /* 缓存 focus/fov/aspect*本身aspect/near/far/zoom/eyeSep，变化才重算左右非对称视锥，眼间距/2 给±X平移，投影偏移按 near/focus。每次都以相机 matrixWorld 乘对应眼平移写 cameraL/R.matrix，置 matrixWorldNeedsUpdate。此方法不渲染，两子相机的投影对象独立。 */
  update(e) {
    const cache = this._cache;
    if (cache.focus !== e.focus || cache.fov !== e.fov || cache.aspect !== e.aspect * this.aspect || cache.near !== e.near || cache.far !== e.far || cache.zoom !== e.zoom || cache.eyeSep !== this.eyeSep) {
      cache.focus = e.focus, cache.fov = e.fov, cache.aspect = e.aspect * this.aspect, cache.near = e.near, cache.far = e.far, cache.zoom = e.zoom, cache.eyeSep = this.eyeSep, bc.copy(e.projectionMatrix);
      const n = cache.eyeSep / 2,
        r = n * cache.near / cache.focus,
        i = cache.near * Math.tan(gr * cache.fov * .5) / cache.zoom;
      let a, s;
      gc.elements[12] = -n, Ac.elements[12] = n, a = -i * cache.aspect + r, s = i * cache.aspect + r, bc.elements[0] = 2 * cache.near / (s - a), bc.elements[8] = (s + a) / (s - a), this.cameraL.projectionMatrix.copy(bc), a = -i * cache.aspect - r, s = i * cache.aspect - r, bc.elements[0] = 2 * cache.near / (s - a), bc.elements[8] = (s + a) / (s - a), this.cameraR.projectionMatrix.copy(bc);
    }
    this.cameraL.matrix.copy(e.matrixWorld).multiply(gc), this.cameraL.matrixWorldNeedsUpdate = !0, this.cameraR.matrix.copy(e.matrixWorld).multiply(Ac), this.cameraR.matrixWorldNeedsUpdate = !0;
  }
}
const yc = -90;
class CubeCamera extends Object3D {
  /* 持有外部 renderTarget，创建六个 FOV=-90°、aspect=1、给定 near/far 的 PerspectiveCamera 子对象。六相机.layers 共享此 CubeCamera.layers，coordinateSystem=null、activeMipmapLevel=0；构造时尚未选定每面的方向，也不分配 renderTarget。 */
  constructor(e, t, renderTarget) {
    super(), this.type = "CubeCamera", this.renderTarget = renderTarget, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const perspectiveCamera = new PerspectiveCamera(yc, 1, e, t);
    perspectiveCamera.layers = this.layers, this.add(perspectiveCamera);
    const i = new PerspectiveCamera(yc, 1, e, t);
    i.layers = this.layers, this.add(i);
    const a = new PerspectiveCamera(yc, 1, e, t);
    a.layers = this.layers, this.add(a);
    const s = new PerspectiveCamera(yc, 1, e, t);
    s.layers = this.layers, this.add(s);
    const o = new PerspectiveCamera(yc, 1, e, t);
    o.layers = this.layers, this.add(o);
    const c = new PerspectiveCamera(yc, 1, e, t);
    c.layers = this.layers, this.add(c);
  }
  /* 先移除六个子相机，按 WebGL/WebGPU 设置各面的 up/lookAt，再重新 add 并 updateMatrixWorld，避免父变换影响定向。非法坐标系统在移除后抛错，children 保持被移除状态。 */
  updateCoordinateSystem() {
    const coordinateSystem = this.coordinateSystem,
      t = this.children.concat(),
      [n, r, i, a, s, o] = t;
    for (const e of t) this.remove(e);
    if (coordinateSystem === WebGLCoordinateSystem) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), i.up.set(0, 0, -1), i.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), s.up.set(0, 1, 0), s.lookAt(0, 0, 1), o.up.set(0, 1, 0), o.lookAt(0, 0, -1);else {
      if (coordinateSystem !== WebGPUCoordinateSystem) throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + coordinateSystem);
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), i.up.set(0, 0, 1), i.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), s.up.set(0, -1, 0), s.lookAt(0, 0, 1), o.up.set(0, -1, 0), o.lookAt(0, 0, -1);
    }
    for (const e of t) this.add(e), e.updateMatrixWorld();
  }
  /* 同步坐标系统，保存 renderer 当前 target/cubeFace/mip/XR，禁用XR与前五面 mip 生成；每面设目标后渲染，reversed depth 且 autoClear=false 时单独 clearDepth。最后一面恢复 generateMipmaps以触发整立方纹理 mip，再还原目标/XR并标 needsPMREMUpdate。没有 try/finally，渲染抛错时此函数不保证状态恢复；正常路径不 dispose 外部 target。 */
  update(e, t) {
    null === this.parent && this.updateMatrixWorld();
    const {
      renderTarget: renderTarget,
      activeMipmapLevel: activeMipmapLevel
    } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [i, a, s, o, c, l] = this.children,
      u = e.getRenderTarget(),
      d = e.getActiveCubeFace(),
      h = e.getActiveMipmapLevel(),
      p = e.xr.enabled;
    e.xr.enabled = !1;
    const f = renderTarget.texture.generateMipmaps;
    renderTarget.texture.generateMipmaps = !1;
    let m = !1;
    m = !0 === e.isWebGLRenderer ? e.state.buffers.depth.getReversed() : e.reversedDepthBuffer, e.setRenderTarget(renderTarget, 0, activeMipmapLevel), m && !1 === e.autoClear && e.clearDepth(), e.render(t, i), e.setRenderTarget(renderTarget, 1, activeMipmapLevel), m && !1 === e.autoClear && e.clearDepth(), e.render(t, a), e.setRenderTarget(renderTarget, 2, activeMipmapLevel), m && !1 === e.autoClear && e.clearDepth(), e.render(t, s), e.setRenderTarget(renderTarget, 3, activeMipmapLevel), m && !1 === e.autoClear && e.clearDepth(), e.render(t, o), e.setRenderTarget(renderTarget, 4, activeMipmapLevel), m && !1 === e.autoClear && e.clearDepth(), e.render(t, c), renderTarget.texture.generateMipmaps = f, e.setRenderTarget(renderTarget, 5, activeMipmapLevel), m && !1 === e.autoClear && e.clearDepth(), e.render(t, l), e.setRenderTarget(u, d, h), e.xr.enabled = p, renderTarget.texture.needsPMREMUpdate = !0;
  }
}
/**
 * This type of camera can be used in order to efficiently render a scene with a
 * predefined set of cameras. This is an important performance aspect for
 * rendering VR scenes.
 *
 * An instance of `ArrayCamera` always has an array of sub cameras. It's mandatory
 * to define for each sub camera the `viewport` property which determines the
 * part of the viewport that is rendered with this camera.
 *
 * @augments PerspectiveCamera
 */
class ArrayCamera extends PerspectiveCamera {
  /**
   * Constructs a new array camera.
   *
   * @param {Array<PerspectiveCamera>} [array=[]] - An array of perspective sub cameras.
   */
  constructor(array = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = array;
  }
}
/**
 * This class is an alternative to {@link Clock} with a different API design and behavior.
 * The goal is to avoid the conceptual flaws that became apparent in `Clock` over time.
 *
 * - `Timer` has an `update()` method that updates its internal state. That makes it possible to
 * call `getDelta()` and `getElapsed()` multiple times per simulation step without getting different values.
 * - The class can make use of the Page Visibility API to avoid large time delta values when the app
 * is inactive (e.g. tab switched or browser hidden).
 *
 * ```js
 * const timer = new Timer();
 * timer.connect( document ); // use Page Visibility API
 * ```
 */
class Timer {
  constructor() {
    this._previousTime = 0, this._currentTime = 0, this._startTime = performance.now(), this._delta = 0, this._elapsed = 0, this._timescale = 1, this._document = null, this._pageVisibilityHandler = null;
  }
  connect(document) {
    this._document = document, void 0 !== document.hidden && (this._pageVisibilityHandler = handleVisibilityChange.bind(this), document.addEventListener("visibilitychange", this._pageVisibilityHandler, !1));
  }
  disconnect() {
    null !== this._pageVisibilityHandler && (this._document.removeEventListener("visibilitychange", this._pageVisibilityHandler), this._pageVisibilityHandler = null), this._document = null;
  }
  getDelta() {
    return this._delta / 1e3;
  }
  getElapsed() {
    return this._elapsed / 1e3;
  }
  /**
   * Returns the timescale.
   *
   * @return {number} The timescale.
   */
  getTimescale() {
    return this._timescale;
  }
  /**
   * Sets the given timescale which scale the time delta computation
   * in `update()`.
   *
   * @param {number} timescale - The timescale to set.
   * @return {Timer} A reference to this timer.
   */
  setTimescale(timescale) {
    return this._timescale = timescale, this;
  }
  /**
   * Resets the time computation for the current simulation step.
   *
   * @return {Timer} A reference to this timer.
   */
  reset() {
    return this._currentTime = performance.now() - this._startTime, this;
  }
  dispose() {
    this.disconnect();
  }
  update(timestamp) {
    return null !== this._pageVisibilityHandler && !0 === this._document.hidden ? this._delta = 0 : (this._previousTime = this._currentTime, this._currentTime = (void 0 !== timestamp ? timestamp : performance.now()) - this._startTime, this._delta = (this._currentTime - this._previousTime) * this._timescale, this._elapsed += this._delta), this;
  }
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：handleVisibilityChange。页面重新可见时重置计时基准，避免把隐藏时段计入下一帧。 */
function handleVisibilityChange() {
  !1 === this._document.hidden && this.reset();
}
const _position$1 = new Vector3(),
  _quaternion$1 = new Quaternion(),
  _scale$1 = new Vector3(),
  _forward = new Vector3(),
  _up = new Vector3();
/**
 * The class represents a virtual listener of the all positional and non-positional audio effects
 * in the scene. A three.js application usually creates a single listener. It is a mandatory
 * constructor parameter for audios entities like {@link Audio} and {@link PositionalAudio}.
 *
 * In most cases, the listener object is a child of the camera. So the 3D transformation of the
 * camera represents the 3D transformation of the listener.
 *
 * @augments Object3D
 */
class AudioListener extends Object3D {
  constructor() {
    super(), this.type = "AudioListener", this.context = AudioContext.getContext(), this.gain = this.context.createGain(), this.gain.connect(this.context.destination), this.filter = null, this.timeDelta = 0, this._timer = new Timer();
  }
  /**
   * Returns the listener's input node.
   *
   * This method is used by other audio nodes to connect to this listener.
   *
   * @return {GainNode} The input node.
   */
  getInput() {
    return this.gain;
  }
  removeFilter() {
    return null !== this.filter && (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination), this.gain.connect(this.context.destination), this.filter = null), this;
  }
  /**
   * Returns the current set filter.
   *
   * @return {?AudioNode} The filter.
   */
  getFilter() {
    return this.filter;
  }
  setFilter(value) {
    return null !== this.filter ? (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination)) : this.gain.disconnect(this.context.destination), this.filter = value, this.gain.connect(this.filter), this.filter.connect(this.context.destination), this;
  }
  /**
   * Returns the applications master volume.
   *
   * @return {number} The master volume.
   */
  getMasterVolume() {
    return this.gain.gain.value;
  }
  setMasterVolume(value) {
    return this.gain.gain.setTargetAtTime(value, this.context.currentTime, .01), this;
  }
  updateMatrixWorld(force) {
    super.updateMatrixWorld(force), this._timer.update();
    const listener = this.context.listener;
    if (this.timeDelta = this._timer.getDelta(), this.matrixWorld.decompose(_position$1, _quaternion$1, _scale$1), _forward.set(0, 0, -1).applyQuaternion(_quaternion$1), _up.set(0, 1, 0).applyQuaternion(_quaternion$1), listener.positionX) {
      const endTime = this.context.currentTime + this.timeDelta;
      listener.positionX.linearRampToValueAtTime(_position$1.x, endTime), listener.positionY.linearRampToValueAtTime(_position$1.y, endTime), listener.positionZ.linearRampToValueAtTime(_position$1.z, endTime), listener.forwardX.linearRampToValueAtTime(_forward.x, endTime), listener.forwardY.linearRampToValueAtTime(_forward.y, endTime), listener.forwardZ.linearRampToValueAtTime(_forward.z, endTime), listener.upX.linearRampToValueAtTime(_up.x, endTime), listener.upY.linearRampToValueAtTime(_up.y, endTime), listener.upZ.linearRampToValueAtTime(_up.z, endTime);
    } else listener.setPosition(_position$1.x, _position$1.y, _position$1.z), listener.setOrientation(_forward.x, _forward.y, _forward.z, _up.x, _up.y, _up.z);
  }
}
/**
 * Represents a non-positional ( global ) audio object.
 *
 * This and related audio modules make use of the [Web Audio API](https://www.w3.org/TR/webaudio-1.1/).
 *
 * ```js
 * // create an AudioListener and add it to the camera
 * const listener = new THREE.AudioListener();
 * camera.add( listener );
 *
 * // create a global audio source
 * const sound = new THREE.Audio( listener );
 *
 * // load a sound and set it as the Audio object's buffer
 * const audioLoader = new THREE.AudioLoader();
 * audioLoader.load( 'sounds/ambient.ogg', function( buffer ) {
 * 	sound.setBuffer( buffer );
 * 	sound.setLoop( true );
 * 	sound.setVolume( 0.5 );
 * 	sound.play();
 * });
 * ```
 *
 * @augments Object3D
 */
class Audio extends Object3D {
  constructor(listener) {
    super(), this.type = "Audio", this.listener = listener, this.context = listener.context, this.gain = this.context.createGain(), this.gain.connect(listener.getInput()), this.autoplay = !1, this.buffer = null, this.detune = 0, this.loop = !1, this.loopStart = 0, this.loopEnd = 0, this.offset = 0, this.duration = void 0, this.playbackRate = 1, this.isPlaying = !1, this.hasPlaybackControl = !0, this.source = null, this.sourceType = "empty", this._startedAt = 0, this._progress = 0, this._connected = !1, this.filters = [];
  }
  /**
   * Returns the output audio node.
   *
   * @return {GainNode} The output node.
   */
  getOutput() {
    return this.gain;
  }
  setNodeSource(audioNode) {
    return this.hasPlaybackControl = !1, this.sourceType = "audioNode", this.source = audioNode, this.connect(), this;
  }
  setMediaElementSource(mediaElement) {
    return this.hasPlaybackControl = !1, this.sourceType = "mediaNode", this.source = this.context.createMediaElementSource(mediaElement), this.connect(), this;
  }
  setMediaStreamSource(mediaStream) {
    return this.hasPlaybackControl = !1, this.sourceType = "mediaStreamNode", this.source = this.context.createMediaStreamSource(mediaStream), this.connect(), this;
  }
  setBuffer(audioBuffer) {
    return this.buffer = audioBuffer, this.sourceType = "buffer", this.autoplay && this.play(), this;
  }
  play(delay = 0) {
    if (!0 === this.isPlaying) return void warn("Audio: Audio is already playing.");
    if (!1 === this.hasPlaybackControl) return void warn("Audio: this Audio has no playback control.");
    this._startedAt = this.context.currentTime + delay;
    const source = this.context.createBufferSource();
    return source.buffer = this.buffer, source.loop = this.loop, source.loopStart = this.loopStart, source.loopEnd = this.loopEnd, source.onended = this.onEnded.bind(this), source.start(this._startedAt, this._progress + this.offset, this.duration), this.isPlaying = !0, this.source = source, this.setDetune(this.detune), this.setPlaybackRate(this.playbackRate), this.connect();
  }
  /* hasPlaybackControl=false 警告并返回 undefined；若播放中，把 max(currentTime-startedAt,0)*playbackRate 加入 _progress，循环按 duration||buffer.duration 取模。停止 source、清 onended、isPlaying=false，返回 this，保留进度供继续。非播放中不停止 source。 */
  pause() {
    if (!1 !== this.hasPlaybackControl) return !0 === this.isPlaying && (this._progress += Math.max(this.context.currentTime - this._startedAt, 0) * this.playbackRate, !0 === this.loop && (this._progress = this._progress % (this.duration || this.buffer.duration)), this.source.stop(), this.source.onended = null, this.isPlaying = !1), this;
    warn("Audio: this Audio has no playback control.");
  }
  /* 无控制权同样警告退出；进度归0，source 非null才在 currentTime+delay 调 stop并清 onended，立即设 isPlaying=false，返回 this。delay 影响真实声源停止时间，不推迟该对象状态修改。 */
  stop(e = 0) {
    if (!1 !== this.hasPlaybackControl) return this._progress = 0, null !== this.source && (this.source.stop(this.context.currentTime + e), this.source.onended = null), this.isPlaying = !1, this;
    warn("Audio: this Audio has no playback control.");
  }
  connect() {
    if (this.filters.length > 0) {
      this.source.connect(this.filters[0]);
      for (let i = 1, l = this.filters.length; i < l; i++) this.filters[i - 1].connect(this.filters[i]);
      this.filters[this.filters.length - 1].connect(this.getOutput());
    } else this.source.connect(this.getOutput());
    return this._connected = !0, this;
  }
  disconnect() {
    if (!1 !== this._connected) {
      if (this.filters.length > 0) {
        this.source.disconnect(this.filters[0]);
        for (let i = 1, l = this.filters.length; i < l; i++) this.filters[i - 1].disconnect(this.filters[i]);
        this.filters[this.filters.length - 1].disconnect(this.getOutput());
      } else this.source.disconnect(this.getOutput());
      return this._connected = !1, this;
    }
  }
  /**
   * Returns the current set filters.
   *
   * @return {Array<AudioNode>} The list of filters.
   */
  getFilters() {
    return this.filters;
  }
  setFilters(value) {
    return value || (value = []), !0 === this._connected ? (this.disconnect(), this.filters = value.slice(), this.connect()) : this.filters = value.slice(), this;
  }
  setDetune(value) {
    return this.detune = value, !0 === this.isPlaying && void 0 !== this.source.detune && this.source.detune.setTargetAtTime(this.detune, this.context.currentTime, .01), this;
  }
  /**
   * Returns the detuning of oscillation in cents.
   *
   * @return {number} The detuning of oscillation in cents.
   */
  getDetune() {
    return this.detune;
  }
  /**
   * Returns the first filter in the list of filters.
   *
   * @return {AudioNode|undefined} The first filter in the list of filters.
   */
  getFilter() {
    return this.getFilters()[0];
  }
  /**
   * Applies a single filter node to the audio.
   *
   * @param {AudioNode} [filter] - The filter to set.
   * @return {Audio} A reference to this instance.
   */
  setFilter(filter) {
    return this.setFilters(filter ? [filter] : []);
  }
  /* 无控制权退出；存 playbackRate，播放中对 AudioParam 用 setTargetAtTime(value,currentTime,.01) 平滑趋近。返回 this，不校验正负或重算已积累 _progress。 */
  setPlaybackRate(playbackRate) {
    if (!1 !== this.hasPlaybackControl) return this.playbackRate = playbackRate, !0 === this.isPlaying && this.source.playbackRate.setTargetAtTime(this.playbackRate, this.context.currentTime, .01), this;
    warn("Audio: this Audio has no playback control.");
  }
  /**
   * Returns the current playback rate.
  * @return {number} The playback rate.
   */
  getPlaybackRate() {
    return this.playbackRate;
  }
  onEnded() {
    this.isPlaying = !1, this._progress = 0;
  }
  getLoop() {
    return !1 === this.hasPlaybackControl ? (warn("Audio: this Audio has no playback control."), !1) : this.loop;
  }
  /* 无控制权退出；存 loop，播放时同步 source.loop，否则只保留以供下次播放。返回 this；不会在此更改 loopStart/loopEnd 或进度。 */
  setLoop(loop) {
    if (!1 !== this.hasPlaybackControl) return this.loop = loop, !0 === this.isPlaying && (this.source.loop = this.loop), this;
    warn("Audio: this Audio has no playback control.");
  }
  /**
   * Sets the loop start value which defines where in the audio buffer the replay should
   * start, in seconds.
   *
   * @param {number} value - The loop start value.
   * @return {Audio} A reference to this instance.
   */
  setLoopStart(value) {
    return this.loopStart = value, this;
  }
  /**
   * Sets the loop end value which defines where in the audio buffer the replay should
   * stop, in seconds.
   *
   * @param {number} value - The loop end value.
   * @return {Audio} A reference to this instance.
   */
  setLoopEnd(value) {
    return this.loopEnd = value, this;
  }
  /**
   * Returns the volume.
   *
   * @return {number} The volume.
   */
  getVolume() {
    return this.gain.gain.value;
  }
  setVolume(value) {
    return this.gain.gain.setTargetAtTime(value, this.context.currentTime, .01), this;
  }
  copy(source, recursive) {
    return super.copy(source, recursive), "buffer" !== source.sourceType ? (warn("Audio: Audio source type cannot be copied."), this) : (this.autoplay = source.autoplay, this.buffer = source.buffer, this.detune = source.detune, this.loop = source.loop, this.loopStart = source.loopStart, this.loopEnd = source.loopEnd, this.offset = source.offset, this.duration = source.duration, this.playbackRate = source.playbackRate, this.hasPlaybackControl = source.hasPlaybackControl, this.sourceType = source.sourceType, this.filters = source.filters.slice(), this);
  }
  clone(recursive) {
    return new this.constructor(this.listener).copy(this, recursive);
  }
}
const xc = new Vector3(),
  Cc = new Quaternion(),
  zc = new Vector3(),
  Oc = new Vector3();
/**
 * Represents a positional audio object.
 *
 * ```js
 * // create an AudioListener and add it to the camera
 * const listener = new THREE.AudioListener();
 * camera.add( listener );
 *
 * // create the PositionalAudio object (passing in the listener)
 * const sound = new THREE.PositionalAudio( listener );
 *
 * // load a sound and set it as the PositionalAudio object's buffer
 * const audioLoader = new THREE.AudioLoader();
 * audioLoader.load( 'sounds/song.ogg', function( buffer ) {
 * 	sound.setBuffer( buffer );
 * 	sound.setRefDistance( 20 );
 * 	sound.play();
 * });
 *
 * // create an object for the sound to play from
 * const sphere = new THREE.SphereGeometry( 20, 32, 16 );
 * const material = new THREE.MeshPhongMaterial( { color: 0xff2200 } );
 * const mesh = new THREE.Mesh( sphere, material );
 * scene.add( mesh );
 *
 * // finally add the sound to the mesh
 * mesh.add( sound );
 *
 * @augments Audio
 */
class PositionalAudio extends Audio {
  constructor(listener) {
    super(listener), this.panner = this.context.createPanner(), this.panner.panningModel = "HRTF", this.panner.connect(this.gain);
  }
  connect() {
    return super.connect(), this.panner.connect(this.gain), this;
  }
  disconnect() {
    return super.disconnect(), this.panner.disconnect(this.gain), this;
  }
  getOutput() {
    return this.panner;
  }
  /**
   * Returns the current reference distance.
   *
   * @return {number} The reference distance.
   */
  getRefDistance() {
    return this.panner.refDistance;
  }
  /**
   * Defines the reference distance for reducing volume as the audio source moves
   * further from the listener – i.e. the distance at which the volume reduction
   * starts taking effect.
   *
   * @param {number} value - The reference distance to set.
   * @return {PositionalAudio} A reference to this instance.
   */
  setRefDistance(value) {
    return this.panner.refDistance = value, this;
  }
  /**
   * Returns the current rolloff factor.
   *
   * @return {number} The rolloff factor.
   */
  getRolloffFactor() {
    return this.panner.rolloffFactor;
  }
  /**
   * Defines how quickly the volume is reduced as the source moves away from the listener.
   *
   * @param {number} value - The rolloff factor.
   * @return {PositionalAudio} A reference to this instance.
   */
  setRolloffFactor(value) {
    return this.panner.rolloffFactor = value, this;
  }
  /**
   * Returns the current distance model.
   *
   * @return {('linear'|'inverse'|'exponential')} The distance model.
   */
  getDistanceModel() {
    return this.panner.distanceModel;
  }
  /**
   * Defines which algorithm to use to reduce the volume of the audio source
   * as it moves away from the listener.
   *
   * Read [the spec](https://www.w3.org/TR/webaudio-1.1/#enumdef-distancemodeltype)
   * for more details.
   *
   * @param {('linear'|'inverse'|'exponential')} value - The distance model to set.
   * @return {PositionalAudio} A reference to this instance.
   */
  setDistanceModel(value) {
    return this.panner.distanceModel = value, this;
  }
  /**
   * Returns the current max distance.
   *
   * @return {number} The max distance.
   */
  getMaxDistance() {
    return this.panner.maxDistance;
  }
  /**
   * Defines the maximum distance between the audio source and the listener,
   * after which the volume is not reduced any further.
   *
   * This value is used only by the `linear` distance model.
   *
   * @param {number} value - The max distance.
   * @return {PositionalAudio} A reference to this instance.
   */
  setMaxDistance(value) {
    return this.panner.maxDistance = value, this;
  }
  /**
   * Sets the directional cone in which the audio can be listened.
   *
   * @param {number} coneInnerAngle - An angle, in degrees, of a cone inside of which there will be no volume reduction.
   * @param {number} coneOuterAngle - An angle, in degrees, of a cone outside of which the volume will be reduced by a constant value, defined by the `coneOuterGain` parameter.
   * @param {number} coneOuterGain - The amount of volume reduction outside the cone defined by the `coneOuterAngle`. When set to `0`, no sound can be heard.
   * @return {PositionalAudio} A reference to this instance.
   */
  setDirectionalCone(coneInnerAngle, coneOuterAngle, coneOuterGain) {
    return this.panner.coneInnerAngle = coneInnerAngle, this.panner.coneOuterAngle = coneOuterAngle, this.panner.coneOuterGain = coneOuterGain, this;
  }
  updateMatrixWorld(force) {
    if (super.updateMatrixWorld(force), !0 === this.hasPlaybackControl && !1 === this.isPlaying) return;
    this.matrixWorld.decompose(xc, Cc, zc), Oc.set(0, 0, 1).applyQuaternion(Cc);
    const panner = this.panner;
    if (panner.positionX) {
      const endTime = this.context.currentTime + this.listener.timeDelta;
      panner.positionX.linearRampToValueAtTime(xc.x, endTime), panner.positionY.linearRampToValueAtTime(xc.y, endTime), panner.positionZ.linearRampToValueAtTime(xc.z, endTime), panner.orientationX.linearRampToValueAtTime(Oc.x, endTime), panner.orientationY.linearRampToValueAtTime(Oc.y, endTime), panner.orientationZ.linearRampToValueAtTime(Oc.z, endTime);
    } else panner.setPosition(xc.x, xc.y, xc.z), panner.setOrientation(Oc.x, Oc.y, Oc.z);
  }
}
/**
 * This class can be used to analyse audio data.
 *
 * ```js
 * // create an AudioListener and add it to the camera
 * const listener = new THREE.AudioListener();
 * camera.add( listener );
 *
 * // create an Audio source
 * const sound = new THREE.Audio( listener );
 *
 * // load a sound and set it as the Audio object's buffer
 * const audioLoader = new THREE.AudioLoader();
 * audioLoader.load( 'sounds/ambient.ogg', function( buffer ) {
 * 	sound.setBuffer( buffer );
 * 	sound.setLoop(true);
 * 	sound.setVolume(0.5);
 * 	sound.play();
 * });
 *
 * // create an AudioAnalyser, passing in the sound and desired fftSize
 * const analyser = new THREE.AudioAnalyser( sound, 32 );
 *
 * // get the average frequency of the sound
 * const data = analyser.getAverageFrequency();
 * ```
 */
class AudioAnalyser {
  /**
   * Constructs a new audio analyzer.
   *
   * @param {Audio} audio - The audio to analyze.
   * @param {number} [fftSize=2048] - The window size in samples that is used when performing a Fast Fourier Transform (FFT) to get frequency domain data.
   */
  constructor(audio, fftSize = 2048) {
    this.analyser = audio.context.createAnalyser(), this.analyser.fftSize = fftSize, this.data = new Uint8Array(this.analyser.frequencyBinCount), audio.getOutput().connect(this.analyser);
  }
  /**
   * Returns an array with frequency data of the audio.
   *
   * Each item in the array represents the decibel value for a specific frequency.
   * The frequencies are spread linearly from 0 to 1/2 of the sample rate.
   * For example, for 48000 sample rate, the last item of the array will represent
   * the decibel value for 24000 Hz.
   *
   * @return {Uint8Array} The frequency data.
   */
  getFrequencyData() {
    return this.analyser.getByteFrequencyData(this.data), this.data;
  }
  getAverageFrequency() {
    let value = 0;
    const data = this.getFrequencyData();
    for (let i = 0; i < data.length; i++) value += data[i];
    return value / data.length;
  }
}
/**
 * Buffered scene graph property that allows weighted accumulation; used internally.
 */
class PropertyMixer {
  /* 输入 binding、typeName、valueSize，四元数选 slerp/slerpAdditive 与单位四元数 identity，Float64Array 六区、workIndex=5；bool/string 用普通 Array 五区与选择函数；数值 Float64Array 五区与 lerp/加法。origIndex=3/addIndex=4，权重/使用/引用计数归0。buffer 的不同区保存输入、累积、原值和 additive，不是一个独立值数组。 */
  constructor(binding, t, valueSize) {
    let mixBufferRegion, mixBufferRegionAdditive, setIdentity;
    switch (this.binding = binding, this.valueSize = valueSize, t) {
      case "quaternion":
        mixBufferRegion = this._slerp, mixBufferRegionAdditive = this._slerpAdditive, setIdentity = this._setAdditiveIdentityQuaternion, this.buffer = new Float64Array(6 * valueSize), this._workIndex = 5;
        break;
      case "string":
      case "bool":
        mixBufferRegion = this._select, mixBufferRegionAdditive = this._select, setIdentity = this._setAdditiveIdentityOther, this.buffer = new Array(5 * valueSize);
        break;
      default:
        mixBufferRegion = this._lerp, mixBufferRegionAdditive = this._lerpAdditive, setIdentity = this._setAdditiveIdentityNumeric, this.buffer = new Float64Array(5 * valueSize);
    }
    this._mixBufferRegion = mixBufferRegion, this._mixBufferRegionAdditive = mixBufferRegionAdditive, this._setIdentity = setIdentity, this._origIndex = 3, this._addIndex = 4, this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0, this.useCount = 0, this.referenceCount = 0;
  }
  accumulate(accuIndex, weight) {
    const buffer = this.buffer,
      stride = this.valueSize,
      offset = accuIndex * stride + stride;
    let currentWeight = this.cumulativeWeight;
    if (0 === currentWeight) {
      for (let i = 0; i !== stride; ++i) buffer[offset + i] = buffer[i];
      currentWeight = weight;
    } else {
      currentWeight += weight;
      const mix = weight / currentWeight;
      this._mixBufferRegion(buffer, offset, 0, mix, stride);
    }
    this.cumulativeWeight = currentWeight;
  }
  accumulateAdditive(weight) {
    const buffer = this.buffer,
      stride = this.valueSize,
      offset = stride * this._addIndex;
    0 === this.cumulativeWeightAdditive && this._setIdentity(), this._mixBufferRegionAdditive(buffer, offset, 0, weight, stride), this.cumulativeWeightAdditive += weight;
  }
  apply(accuIndex) {
    const stride = this.valueSize,
      buffer = this.buffer,
      offset = accuIndex * stride + stride,
      weight = this.cumulativeWeight,
      weightAdditive = this.cumulativeWeightAdditive,
      binding = this.binding;
    if (this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0, weight < 1) {
      const originalValueOffset = stride * this._origIndex;
      this._mixBufferRegion(buffer, offset, originalValueOffset, 1 - weight, stride);
    }
    weightAdditive > 0 && this._mixBufferRegionAdditive(buffer, offset, this._addIndex * stride, 1, stride);
    for (let i = stride, e = stride + stride; i !== e; ++i) if (buffer[i] !== buffer[i + stride]) {
      binding.setValue(buffer, offset);
      break;
    }
  }
  saveOriginalState() {
    const binding = this.binding,
      buffer = this.buffer,
      stride = this.valueSize,
      originalValueOffset = stride * this._origIndex;
    binding.getValue(buffer, originalValueOffset);
    for (let i = stride, e = originalValueOffset; i !== e; ++i) buffer[i] = buffer[originalValueOffset + i % stride];
    this._setIdentity(), this.cumulativeWeight = 0, this.cumulativeWeightAdditive = 0;
  }
  restoreOriginalState() {
    const originalValueOffset = 3 * this.valueSize;
    this.binding.setValue(this.buffer, originalValueOffset);
  }
  _setAdditiveIdentityNumeric() {
    const startIndex = this._addIndex * this.valueSize,
      endIndex = startIndex + this.valueSize;
    for (let i = startIndex; i < endIndex; i++) this.buffer[i] = 0;
  }
  _setAdditiveIdentityQuaternion() {
    this._setAdditiveIdentityNumeric(), this.buffer[this._addIndex * this.valueSize + 3] = 1;
  }
  _setAdditiveIdentityOther() {
    const startIndex = this._origIndex * this.valueSize,
      targetIndex = this._addIndex * this.valueSize;
    for (let i = 0; i < this.valueSize; i++) this.buffer[targetIndex + i] = this.buffer[startIndex + i];
  }
  _select(buffer, dstOffset, srcOffset, t, stride) {
    if (t >= .5) for (let i = 0; i !== stride; ++i) buffer[dstOffset + i] = buffer[srcOffset + i];
  }
  _slerp(buffer, dstOffset, srcOffset, t) {
    Quaternion.slerpFlat(buffer, dstOffset, buffer, dstOffset, buffer, srcOffset, t);
  }
  _slerpAdditive(buffer, dstOffset, srcOffset, t, stride) {
    const workOffset = this._workIndex * stride;
    Quaternion.multiplyQuaternionsFlat(buffer, workOffset, buffer, dstOffset, buffer, srcOffset), Quaternion.slerpFlat(buffer, dstOffset, buffer, dstOffset, buffer, workOffset, t);
  }
  _lerp(buffer, dstOffset, srcOffset, t, stride) {
    const s = 1 - t;
    for (let i = 0; i !== stride; ++i) {
      const j = dstOffset + i;
      buffer[j] = buffer[j] * s + buffer[srcOffset + i] * t;
    }
  }
  _lerpAdditive(buffer, dstOffset, srcOffset, t, stride) {
    for (let i = 0; i !== stride; ++i) {
      const j = dstOffset + i;
      buffer[j] = buffer[j] + buffer[srcOffset + i] * t;
    }
  }
}
const Bc = "\\[\\]\\.:\\/",
  regExp = new RegExp("[" + Bc + "]", "g"),
  Nc = "[^" + Bc + "]",
  Ic = "[^" + Bc.replace("\\.", "") + "]",
  Rc = new RegExp("^" + /((?:WC+[\/:])*)/.source.replace("WC", Nc) + /(WCOD+)?/.source.replace("WCOD", Ic) + /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Nc) + /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Nc) + "$"),
  kc = ["material", "materials", "bones", "map"];
// Note: This class uses a State pattern on a per-method basis:
// 'bind' sets 'this.getValue' / 'setValue' and shadows the
// prototype version of these methods with one that represents
// the bound state. When the property is not found, the methods
// become no-ops.

/**
 * This holds a reference to a real property in the scene graph; used internally.
 */
class PropertyBinding {
  /**
   * Constructs a new property binding.
   *
   * @param {Object} rootNode - The root node.
   * @param {string} path - The path.
   * @param {?Object} [parsedPath] - The parsed path.
   */
  constructor(rootNode, path, parsedPath) {
    this.path = path, this.parsedPath = parsedPath || PropertyBinding.parseTrackName(path), this.node = PropertyBinding.findNode(rootNode, this.parsedPath.nodeName), this.rootNode = rootNode, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  /* root 有 isAnimationObjectGroup 标志则返回 Composite，否则普通 PropertyBinding；path/parsedPath 透传。此处不强制 root 非null，也不自己解析或立刻写入目标。 */
  static create(e, t, n) {
    return e && e.isAnimationObjectGroup ? new PropertyBinding.Composite(e, t, n) : new PropertyBinding(e, t, n);
  }
  static sanitizeNodeName(name) {
    return name.replace(/\s/g, "_").replace(regExp, "");
  }
  static parseTrackName(trackName) {
    const matches = Rc.exec(trackName);
    if (null === matches) throw new Error("THREE.PropertyBinding: Cannot parse trackName: " + trackName);
    const results = {
        nodeName: matches[2],
        objectName: matches[3],
        objectIndex: matches[4],
        propertyName: matches[5],
        propertyIndex: matches[6]
      },
      lastDot = results.nodeName && results.nodeName.lastIndexOf(".");
    if (void 0 !== lastDot && -1 !== lastDot) {
      const objectName = results.nodeName.substring(lastDot + 1);
      -1 !== kc.indexOf(objectName) && (results.nodeName = results.nodeName.substring(0, lastDot), results.objectName = objectName);
    }
    if (null === results.propertyName || 0 === results.propertyName.length) throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: " + trackName);
    return results;
  }
  static findNode(root, nodeName) {
    if (void 0 === nodeName || "" === nodeName || "." === nodeName || -1 === nodeName || nodeName === root.name || nodeName === root.uuid) return root;
    if (root.skeleton) {
      const bone = root.skeleton.getBoneByName(nodeName);
      if (void 0 !== bone) return bone;
    }
    if (root.children) {
      const searchNodeSubtree = function (children) {
          for (let i = 0; i < children.length; i++) {
            const childNode = children[i];
            if (childNode.name === nodeName || childNode.uuid === nodeName) return childNode;
            const result = searchNodeSubtree(childNode.children);
            if (result) return result;
          }
          return null;
        },
        subTreeNode = searchNodeSubtree(root.children);
      if (subTreeNode) return subTreeNode;
    }
    return null;
  }
  _getValue_unavailable() {}
  _setValue_unavailable() {}
  _getValue_direct(buffer, offset) {
    buffer[offset] = this.targetObject[this.propertyName];
  }
  _getValue_array(buffer, offset) {
    const source = this.resolvedProperty;
    for (let i = 0, n = source.length; i !== n; ++i) buffer[offset++] = source[i];
  }
  _getValue_arrayElement(buffer, offset) {
    buffer[offset] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(buffer, offset) {
    this.resolvedProperty.toArray(buffer, offset);
  }
  _setValue_direct(buffer, offset) {
    this.targetObject[this.propertyName] = buffer[offset];
  }
  _setValue_direct_setNeedsUpdate(buffer, offset) {
    this.targetObject[this.propertyName] = buffer[offset], this.targetObject.needsUpdate = !0;
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(buffer, offset) {
    this.targetObject[this.propertyName] = buffer[offset], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_array(buffer, offset) {
    const dest = this.resolvedProperty;
    for (let i = 0, n = dest.length; i !== n; ++i) dest[i] = buffer[offset++];
  }
  _setValue_array_setNeedsUpdate(buffer, offset) {
    const dest = this.resolvedProperty;
    for (let i = 0, n = dest.length; i !== n; ++i) dest[i] = buffer[offset++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(buffer, offset) {
    const dest = this.resolvedProperty;
    for (let i = 0, n = dest.length; i !== n; ++i) dest[i] = buffer[offset++];
    this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_arrayElement(buffer, offset) {
    this.resolvedProperty[this.propertyIndex] = buffer[offset];
  }
  _setValue_arrayElement_setNeedsUpdate(buffer, offset) {
    this.resolvedProperty[this.propertyIndex] = buffer[offset], this.targetObject.needsUpdate = !0;
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(buffer, offset) {
    this.resolvedProperty[this.propertyIndex] = buffer[offset], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _setValue_fromArray(buffer, offset) {
    this.resolvedProperty.fromArray(buffer, offset);
  }
  _setValue_fromArray_setNeedsUpdate(buffer, offset) {
    this.resolvedProperty.fromArray(buffer, offset), this.targetObject.needsUpdate = !0;
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(buffer, offset) {
    this.resolvedProperty.fromArray(buffer, offset), this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _getValue_unbound(targetArray, offset) {
    this.bind(), this.getValue(targetArray, offset);
  }
  _setValue_unbound(sourceArray, offset) {
    this.bind(), this.setValue(sourceArray, offset);
  }
  /* 找不到缓存 node 时从 root/path 寻找；先把 getter/setter 置 unavailable，缺节点/对象/属性报错后保持不可用。支持 materials、bones 按名转索引、map 在节点或材质上解析，普通 objectName/index 逐层访问。记录 target/resolvedProperty，不克隆目标。 */
  bind() {
    let e = this.node;
    const parsedPath = this.parsedPath,
      n = parsedPath.objectName,
      propertyName = parsedPath.propertyName;
    let propertyIndex = parsedPath.propertyIndex;
    if (e || (e = PropertyBinding.findNode(this.rootNode, parsedPath.nodeName), this.node = e), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !e) return void warn("PropertyBinding: No target node found for track: " + this.path + ".");
    if (n) {
      let r = parsedPath.objectIndex;
      switch (n) {
        case "materials":
          if (!e.material) return void error("PropertyBinding: Can not bind to material as node does not have a material.", this);
          if (!e.material.materials) return void error("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
          e = e.material.materials;
          break;
        case "bones":
          if (!e.skeleton) return void error("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
          e = e.skeleton.bones;
          for (let t = 0; t < e.length; t++) if (e[t].name === r) {
            r = t;
            break;
          }
          break;
        case "map":
          if ("map" in e) {
            e = e.map;
            break;
          }
          if (!e.material) return void error("PropertyBinding: Can not bind to material as node does not have a material.", this);
          if (!e.material.map) return void error("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
          e = e.material.map;
          break;
        default:
          if (void 0 === e[n]) return void error("PropertyBinding: Can not bind to objectName of node undefined.", this);
          e = e[n];
      }
      if (void 0 !== r) {
        if (void 0 === e[r]) return void error("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, e);
        e = e[r];
      }
    }
    const resolvedProperty = e[propertyName];
    if (void 0 === resolvedProperty) {
      return void error("PropertyBinding: Trying to update property for track: " + parsedPath.nodeName + "." + propertyName + " but it wasn't found.", e);
    }
    let s = this.Versioning.None;
    this.targetObject = e, !0 === e.isMaterial ? s = this.Versioning.NeedsUpdate : !0 === e.isObject3D && (s = this.Versioning.MatrixWorldNeedsUpdate);
    let o = this.BindingType.Direct;
    if (void 0 !== propertyIndex) {
      if ("morphTargetInfluences" === propertyName) {
        if (!e.geometry) return void error("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
        if (!e.geometry.morphAttributes) return void error("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
        void 0 !== e.morphTargetDictionary[propertyIndex] && (propertyIndex = e.morphTargetDictionary[propertyIndex]);
      }
      o = this.BindingType.ArrayElement, this.resolvedProperty = resolvedProperty, this.propertyIndex = propertyIndex;
    } else void 0 !== resolvedProperty.fromArray && void 0 !== resolvedProperty.toArray ? (o = this.BindingType.HasFromToArray, this.resolvedProperty = resolvedProperty) : Array.isArray(resolvedProperty) ? (o = this.BindingType.EntireArray, this.resolvedProperty = resolvedProperty) : this.propertyName = propertyName;
    this.getValue = this.GetterByBindingType[o], this.setValue = this.SetterByBindingTypeAndVersioning[o][s];
  }
  unbind() {
    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
}
PropertyBinding.Composite = class Composite {
  constructor(targetGroup, path, optionalParsedPath) {
    const parsedPath = optionalParsedPath || PropertyBinding.parseTrackName(path);
    this._targetGroup = targetGroup, this._bindings = targetGroup.subscribe_(path, parsedPath);
  }
  getValue(array, offset) {
    this.bind();
    const firstValidIndex = this._targetGroup.nCachedObjects_,
      binding = this._bindings[firstValidIndex];
    void 0 !== binding && binding.getValue(array, offset);
  }
  setValue(array, offset) {
    const bindings = this._bindings;
    for (let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i) bindings[i].setValue(array, offset);
  }
  bind() {
    const bindings = this._bindings;
    for (let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i) bindings[i].bind();
  }
  unbind() {
    const bindings = this._bindings;
    for (let i = this._targetGroup.nCachedObjects_, n = bindings.length; i !== n; ++i) bindings[i].unbind();
  }
}, PropertyBinding.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
}, PropertyBinding.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
}, PropertyBinding.prototype.GetterByBindingType = [PropertyBinding.prototype._getValue_direct, PropertyBinding.prototype._getValue_array, PropertyBinding.prototype._getValue_arrayElement, PropertyBinding.prototype._getValue_toArray], PropertyBinding.prototype.SetterByBindingTypeAndVersioning = [[PropertyBinding.prototype._setValue_direct, PropertyBinding.prototype._setValue_direct_setNeedsUpdate, PropertyBinding.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [PropertyBinding.prototype._setValue_array, PropertyBinding.prototype._setValue_array_setNeedsUpdate, PropertyBinding.prototype._setValue_array_setMatrixWorldNeedsUpdate], [PropertyBinding.prototype._setValue_arrayElement, PropertyBinding.prototype._setValue_arrayElement_setNeedsUpdate, PropertyBinding.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [PropertyBinding.prototype._setValue_fromArray, PropertyBinding.prototype._setValue_fromArray_setNeedsUpdate, PropertyBinding.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];
class AnimationObjectGroup {
  constructor() {
    this.isAnimationObjectGroup = !0, this.uuid = generateUUID(), this._objects = Array.prototype.slice.call(arguments), this.nCachedObjects_ = 0;
    const indices = {};
    this._indicesByUUID = indices;
    for (let i = 0, n = arguments.length; i !== n; ++i) indices[arguments[i].uuid] = i;
    this._paths = [], this._parsedPaths = [], this._bindings = [], this._bindingsIndicesByPath = {};
    const scope = this;
    this.stats = {
      objects: {
        get total() {
          return scope._objects.length;
        },
        get inUse() {
          return this.total - scope.nCachedObjects_;
        }
      },
      get bindingsPerObject() {
        return scope._bindings.length;
      }
    };
  }
  /* 维护 _objects 的缓存前缀 [0,nCachedObjects_) 与活跃后缀、UUID→索引以及每条 path 对齐 bindings。新对象追加并建绑定；缓存对象与最后缓存交换进入活跃区，缺绑定补建；发现重复 UUID 对象则 error。本地和官方都用 knownObject 临时变量参与重复检查，本文记录现状而不宣称逻辑完美。 */
  add() {
    const objects = this._objects,
      indicesByUUID = this._indicesByUUID,
      paths = this._paths,
      parsedPaths = this._parsedPaths,
      bindings = this._bindings,
      a = bindings.length;
    let s,
      o = objects.length,
      nCachedObjects_ = this.nCachedObjects_;
    for (let l = 0, u = arguments.length; l !== u; ++l) {
      const u = arguments[l],
        d = u.uuid;
      let h = indicesByUUID[d];
      if (void 0 === h) {
        h = o++, indicesByUUID[d] = h, objects.push(u);
        for (let e = 0, t = a; e !== t; ++e) bindings[e].push(new PropertyBinding(u, paths[e], parsedPaths[e]));
      } else if (h < nCachedObjects_) {
        s = objects[h];
        const o = --nCachedObjects_,
          l = objects[o];
        indicesByUUID[l.uuid] = h, objects[h] = l, indicesByUUID[d] = o, objects[o] = u;
        for (let e = 0, t = a; e !== t; ++e) {
          const t = bindings[e],
            a = t[o];
          let s = t[h];
          t[h] = a, void 0 === s && (s = new PropertyBinding(u, paths[e], parsedPaths[e])), t[o] = s;
        }
      } else objects[h] !== s && error("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.");
    }
    this.nCachedObjects_ = nCachedObjects_;
  }
  remove() {
    const objects = this._objects,
      indicesByUUID = this._indicesByUUID,
      bindings = this._bindings,
      nBindings = bindings.length;
    let nCachedObjects = this.nCachedObjects_;
    for (let i = 0, n = arguments.length; i !== n; ++i) {
      const object = arguments[i],
        uuid = object.uuid,
        index = indicesByUUID[uuid];
      if (void 0 !== index && index >= nCachedObjects) {
        const lastCachedIndex = nCachedObjects++,
          firstActiveObject = objects[lastCachedIndex];
        indicesByUUID[firstActiveObject.uuid] = index, objects[index] = firstActiveObject, indicesByUUID[uuid] = lastCachedIndex, objects[lastCachedIndex] = object;
        for (let j = 0, m = nBindings; j !== m; ++j) {
          const bindingsForPath = bindings[j],
            firstActive = bindingsForPath[lastCachedIndex],
            binding = bindingsForPath[index];
          bindingsForPath[index] = firstActive, bindingsForPath[lastCachedIndex] = binding;
        }
      }
    }
    this.nCachedObjects_ = nCachedObjects;
  }
  /* 永久删指定 UUID 的索引；缓存对象先与最后缓存交换，再把最后对象填入活跃边界，活跃对象直接以尾部 swap-pop。同步所有 bindings 数组与 UUID 反向表，减少 nCachedObjects_。不是仅把对象移进缓存，也不 dispose 场景对象。 */
  uncache() {
    const objects = this._objects,
      indicesByUUID = this._indicesByUUID,
      bindings = this._bindings,
      r = bindings.length;
    let nCachedObjects_ = this.nCachedObjects_,
      a = objects.length;
    for (let s = 0, o = arguments.length; s !== o; ++s) {
      const o = arguments[s].uuid,
        c = indicesByUUID[o];
      if (void 0 !== c) if (delete indicesByUUID[o], c < nCachedObjects_) {
        const s = --nCachedObjects_,
          o = objects[s],
          l = --a,
          u = objects[l];
        indicesByUUID[o.uuid] = c, objects[c] = o, indicesByUUID[u.uuid] = s, objects[s] = u, objects.pop();
        for (let e = 0, t = r; e !== t; ++e) {
          const t = bindings[e],
            r = t[s],
            i = t[l];
          t[c] = r, t[s] = i, t.pop();
        }
      } else {
        const i = --a,
          s = objects[i];
        i > 0 && (indicesByUUID[s.uuid] = c), objects[c] = s, objects.pop();
        for (let e = 0, t = r; e !== t; ++e) {
          const t = bindings[e];
          t[c] = t[i], t.pop();
        }
      }
    }
    this.nCachedObjects_ = nCachedObjects_;
  }
  subscribe_(path, parsedPath) {
    const indicesByPath = this._bindingsIndicesByPath;
    let index = indicesByPath[path];
    const bindings = this._bindings;
    if (void 0 !== index) return bindings[index];
    const paths = this._paths,
      parsedPaths = this._parsedPaths,
      objects = this._objects,
      nObjects = objects.length,
      nCachedObjects = this.nCachedObjects_,
      bindingsForPath = new Array(nObjects);
    index = bindings.length, indicesByPath[path] = index, paths.push(path), parsedPaths.push(parsedPath), bindings.push(bindingsForPath);
    for (let i = nCachedObjects, n = objects.length; i !== n; ++i) {
      const object = objects[i];
      bindingsForPath[i] = new PropertyBinding(object, path, parsedPath);
    }
    return bindingsForPath;
  }
  /* 查 path 的 binding 索引，将最后一组 bindings、parsedPaths、paths 填洞再 pop。特别是实际代码用参数 path[lastBindingsIndex] 更新索引表，不是 paths[lastBindingsIndex]，也没有在此 delete 原键；两版官方都有这个写法。不能把期望的正确缓存维护行为冒充实际行为，是否可触发错误仍需单独运行场景验证。 */
  unsubscribe_(e) {
    const bindingsIndicesByPath = this._bindingsIndicesByPath,
      n = bindingsIndicesByPath[e];
    if (void 0 !== n) {
      const paths = this._paths,
        parsedPaths = this._parsedPaths,
        bindings = this._bindings,
        s = bindings.length - 1,
        o = bindings[s];
      bindingsIndicesByPath[e[s]] = n, bindings[n] = o, bindings.pop(), parsedPaths[n] = parsedPaths[s], parsedPaths.pop(), paths[n] = paths[s], paths.pop();
    }
  }
}
/**
 * An instance of `AnimationAction` schedules the playback of an animation which is
 * stored in {@link AnimationClip}.
 */
class AnimationAction {
  constructor(mixer, clip, localRoot = null, blendMode = clip.blendMode) {
    this._mixer = mixer, this._clip = clip, this._localRoot = localRoot, this.blendMode = blendMode;
    const tracks = clip.tracks,
      nTracks = tracks.length,
      interpolants = new Array(nTracks),
      interpolantSettings = {
        endingStart: ZeroCurvatureEnding,
        endingEnd: ZeroCurvatureEnding
      };
    for (let i = 0; i !== nTracks; ++i) {
      const interpolant = tracks[i].createInterpolant(null);
      interpolants[i] = interpolant, interpolant.settings = interpolantSettings;
    }
    this._interpolantSettings = interpolantSettings, this._interpolants = interpolants, this._propertyBindings = new Array(nTracks), this._cacheIndex = null, this._byClipCacheIndex = null, this._timeScaleInterpolant = null, this._restoreTimeScale = null, this._weightInterpolant = null, this.loop = LoopRepeat, this._loopCount = -1, this._startTime = null, this.time = 0, this.timeScale = 1, this._effectiveTimeScale = 1, this.weight = 1, this._effectiveWeight = 1, this.repetitions = 1 / 0, this.paused = !1, this.enabled = !0, this.clampWhenFinished = !1, this.zeroSlopeAtStart = !0, this.zeroSlopeAtEnd = !0;
  }
  /**
   * Starts the playback of the animation.
   *
   * @return {AnimationAction} A reference to this animation action.
   */
  play() {
    return this._mixer._activateAction(this), this;
  }
  /**
   * Stops the playback of the animation.
   *
   * @return {AnimationAction} A reference to this animation action.
   */
  stop() {
    return this._mixer._deactivateAction(this), this.reset();
  }
  /**
   * Resets the playback of the animation.
   *
   * @return {AnimationAction} A reference to this animation action.
   */
  reset() {
    return this.paused = !1, this.enabled = !0, this.time = 0, this._loopCount = -1, this._startTime = null, this.stopFading().stopWarping();
  }
  isRunning() {
    return this.enabled && !this.paused && 0 !== this.timeScale && null === this._startTime && this._mixer._isActiveAction(this);
  }
  /**
   * Returns `true` when {@link AnimationAction#play} has been called.
   *
   * @return {boolean} Whether the animation is scheduled or not.
   */
  isScheduled() {
    return this._mixer._isActiveAction(this);
  }
  /**
   * Defines the time when the animation should start.
   *
   * @param {number} time - The start time in seconds.
   * @return {AnimationAction} A reference to this animation action.
   */
  startAt(time) {
    return this._startTime = time, this;
  }
  /**
   * Configures the loop settings for this action.
   *
   * @param {(LoopRepeat|LoopOnce|LoopPingPong)} mode - The loop mode.
   * @param {number} repetitions - The number of repetitions.
   * @return {AnimationAction} A reference to this animation action.
   */
  setLoop(mode, repetitions) {
    return this.loop = mode, this.repetitions = repetitions, this;
  }
  /**
   * Sets the effective weight of this action.
   *
   * An action has no effect and thus an effective weight of zero when the
   * action is disabled.
   *
   * @param {number} weight - The weight to set.
   * @return {AnimationAction} A reference to this animation action.
   */
  setEffectiveWeight(weight) {
    return this.weight = weight, this._effectiveWeight = this.enabled ? weight : 0, this.stopFading();
  }
  /**
   * Returns the effective weight of this action.
   *
   * @return {number} The effective weight.
   */
  getEffectiveWeight() {
    return this._effectiveWeight;
  }
  /**
   * Fades the animation in by increasing its weight gradually from `0` to `1`,
   * within the passed time interval.
   *
   * @param {number} duration - The duration of the fade.
   * @return {AnimationAction} A reference to this animation action.
   */
  fadeIn(duration) {
    return this._scheduleFading(duration, 0, 1);
  }
  /**
   * Fades the animation out by decreasing its weight gradually from `1` to `0`,
   * within the passed time interval.
   *
   * @param {number} duration - The duration of the fade.
   * @return {AnimationAction} A reference to this animation action.
   */
  fadeOut(duration) {
    return this._scheduleFading(duration, 1, 0);
  }
  crossFadeFrom(fadeOutAction, duration, warp = !1) {
    if (fadeOutAction.fadeOut(duration), this.fadeIn(duration), !0 === warp) {
      const fadeInDuration = this._clip.duration,
        fadeOutDuration = fadeOutAction._clip.duration,
        startEndRatio = fadeOutDuration / fadeInDuration,
        endStartRatio = fadeInDuration / fadeOutDuration;
      fadeOutAction._restoreTimeScale = fadeOutAction.timeScale, this._restoreTimeScale = this.timeScale, fadeOutAction.warp(1, startEndRatio, duration), this.warp(endStartRatio, 1, duration);
    }
    return this;
  }
  /**
   * Causes this action to fade out and the given action to fade in,
   * within the passed time interval.
   *
   * @param {AnimationAction} fadeInAction - The animation action to fade in.
   * @param {number} duration - The duration of the fade.
   * @param {boolean} [warp=false] - Whether warping should be used or not.
   * @return {AnimationAction} A reference to this animation action.
   */
  crossFadeTo(fadeInAction, duration, warp = !1) {
    return fadeInAction.crossFadeFrom(this, duration, warp);
  }
  stopFading() {
    const weightInterpolant = this._weightInterpolant;
    return null !== weightInterpolant && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(weightInterpolant)), this;
  }
  /**
   * Sets the effective time scale of this action.
   *
   * An action has no effect and thus an effective time scale of zero when the
   * action is paused.
   *
   * @param {number} timeScale - The time scale to set.
   * @return {AnimationAction} A reference to this animation action.
   */
  setEffectiveTimeScale(timeScale) {
    return this.timeScale = timeScale, this._effectiveTimeScale = this.paused ? 0 : timeScale, this.stopWarping();
  }
  /**
   * Returns the effective time scale of this action.
   *
   * @return {number} The effective time scale.
   */
  getEffectiveTimeScale() {
    return this._effectiveTimeScale;
  }
  /**
   * Sets the duration for a single loop of this action.
   *
   * @param {number} duration - The duration to set.
   * @return {AnimationAction} A reference to this animation action.
   */
  setDuration(duration) {
    return this.timeScale = this._clip.duration / duration, this.stopWarping();
  }
  /**
   * Synchronizes this action with the passed other action.
   *
   * @param {AnimationAction} action - The action to sync with.
   * @return {AnimationAction} A reference to this animation action.
   */
  syncWith(action) {
    return this.time = action.time, this.timeScale = action.timeScale, this.stopWarping();
  }
  /**
   * Decelerates this animation's speed to `0` within the passed time interval.
   *
   * @param {number} duration - The duration.
   * @return {AnimationAction} A reference to this animation action.
   */
  halt(duration) {
    return this.warp(this._effectiveTimeScale, 0, duration);
  }
  warp(startTimeScale, endTimeScale, duration) {
    const mixer = this._mixer,
      now = mixer.time,
      timeScale = this.timeScale;
    let interpolant = this._timeScaleInterpolant;
    null === interpolant && (interpolant = mixer._lendControlInterpolant(), this._timeScaleInterpolant = interpolant);
    const times = interpolant.parameterPositions,
      values = interpolant.sampleValues;
    return times[0] = now, times[1] = now + duration, values[0] = startTimeScale / timeScale, values[1] = endTimeScale / timeScale, this;
  }
  stopWarping() {
    const timeScaleInterpolant = this._timeScaleInterpolant;
    return null !== timeScaleInterpolant && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(timeScaleInterpolant)), this._restoreTimeScale = null, this;
  }
  /**
   * Returns the animation mixer of this animation action.
   *
   * @return {AnimationMixer} The animation mixer.
   */
  getMixer() {
    return this._mixer;
  }
  /**
   * Returns the animation clip of this animation action.
   *
   * @return {AnimationClip} The animation clip.
   */
  getClip() {
    return this._clip;
  }
  /**
   * Returns the root object of this animation action.
   *
   * @return {Object3D} The root object.
   */
  getRoot() {
    return this._localRoot || this._mixer._root;
  }
  /* disabled 时只更新权重；等待 startTime 时用 timeDirection 算是否到时，再乘有效 timeScale，得到 clipTime 与有效 weight。weight>0 才 evaluate 每轨 interpolant；Additive 调 accumulateAdditive，否则调用 accumulate(accuIndex,weight)。这里累加到 PropertyMixer，不直接 set 场景属性；mixer 后续统一 apply。 */
  _update(e, t, n, r) {
    if (!this.enabled) return void this._updateWeight(e);
    const startTime = this._startTime;
    if (null !== startTime) {
      const r = (e - startTime) * n;
      r < 0 || 0 === n ? t = 0 : (this._startTime = null, t = n * r);
    }
    t *= this._updateTimeScale(e);
    const a = this._updateTime(t),
      s = this._updateWeight(e);
    if (s > 0) {
      const interpolants = this._interpolants,
        propertyBindings = this._propertyBindings;
      if (this.blendMode === AdditiveAnimationBlendMode) for (let n = 0, r = interpolants.length; n !== r; ++n) interpolants[n].evaluate(a), propertyBindings[n].accumulateAdditive(s);else for (let n = 0, i = interpolants.length; n !== i; ++n) interpolants[n].evaluate(a), propertyBindings[n].accumulate(r, s);
    }
  }
  _updateWeight(time) {
    let weight = 0;
    if (this.enabled) {
      weight = this.weight;
      const interpolant = this._weightInterpolant;
      if (null !== interpolant) {
        const interpolantValue = interpolant.evaluate(time)[0];
        weight *= interpolantValue, time > interpolant.parameterPositions[1] && (this.stopFading(), 0 === interpolantValue && (this.enabled = !1));
      }
    }
    return this._effectiveWeight = weight, weight;
  }
  /* paused 时有效速度0；否则 timeScale 乘可选 warp interpolant。过其末时刻，零速设 paused，非零可恢复 _restoreTimeScale 并存回 timeScale，stopWarping 释放控制插值器。写 _effectiveTimeScale 并返回标量；结束判定用严格大于末时间。 */
  _updateTimeScale(e) {
    let t = 0;
    if (!this.paused) {
      t = this.timeScale;
      const timeScaleInterpolant = this._timeScaleInterpolant;
      if (null !== timeScaleInterpolant) {
        t *= timeScaleInterpolant.evaluate(e)[0], e > timeScaleInterpolant.parameterPositions[1] && (0 === t ? this.paused = !0 : (null !== this._restoreTimeScale && (t = this._restoreTimeScale), this.timeScale = t), this.stopWarping());
      }
    }
    return this._effectiveTimeScale = t, t;
  }
  /* 把 delta 加 this.time；delta=0 返回当前或奇数 pingpong 周期的镜像时间。LoopOnce 截到0/duration并 paused或disabled，发 finished(direction)。没有替 duration=0 特设除零分支。 */
  _updateTime(e) {
    const t = this._clip.duration,
      loop = this.loop;
    let time = this.time + e,
      loopCount = this._loopCount;
    const a = loop === LoopPingPong;
    if (0 === e) return -1 === loopCount || !a || 1 & ~loopCount ? time : t - time;
    if (loop === LoopOnce) {
      -1 === loopCount && (this._loopCount = 0, this._setEndings(!0, !0, !1));
      e: {
        if (time >= t) time = t;else {
          if (!(time < 0)) {
            this.time = time;
            break e;
          }
          time = 0;
        }
        this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, this.time = time, this._mixer.dispatchEvent({
          type: "finished",
          action: this,
          direction: e < 0 ? -1 : 1
        });
      }
    } else {
      if (-1 === loopCount && (e >= 0 ? (loopCount = 0, this._setEndings(!0, 0 === this.repetitions, a)) : this._setEndings(0 === this.repetitions, !0, a)), time >= t || time < 0) {
        const n = Math.floor(time / t);
        time -= t * n, loopCount += Math.abs(n);
        const s = this.repetitions - loopCount;
        if (s <= 0) this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, time = e > 0 ? t : 0, this.time = time, this._mixer.dispatchEvent({
          type: "finished",
          action: this,
          direction: e > 0 ? 1 : -1
        });else {
          if (1 === s) {
            const t = e < 0;
            this._setEndings(t, !t, a);
          } else this._setEndings(!1, !1, a);
          this._loopCount = loopCount, this.time = time, this._mixer.dispatchEvent({
            type: "loop",
            action: this,
            loopDelta: n
          });
        }
      } else this._loopCount = loopCount, this.time = time;
      if (a && !(1 & ~loopCount)) return t - time;
    }
    return time;
  }
  /* 修改共享 _interpolantSettings.endingStart/End；pingpong 两端固定 ZeroSlope，普通模式的真实起止按 zeroSlopeAtStart/End 选 ZeroSlope/ZeroCurvature，循环内部用 WrapAround。仅配置插值边界，不改变动作时间。 */
  _setEndings(e, t, n) {
    const interpolantSettings = this._interpolantSettings;
    n ? (interpolantSettings.endingStart = ZeroSlopeEnding, interpolantSettings.endingEnd = ZeroSlopeEnding) : (interpolantSettings.endingStart = e ? this.zeroSlopeAtStart ? ZeroSlopeEnding : ZeroCurvatureEnding : WrapAroundEnding, interpolantSettings.endingEnd = t ? this.zeroSlopeAtEnd ? ZeroSlopeEnding : ZeroCurvatureEnding : WrapAroundEnding);
  }
  _scheduleFading(duration, weightNow, weightThen) {
    const mixer = this._mixer,
      now = mixer.time;
    let interpolant = this._weightInterpolant;
    null === interpolant && (interpolant = mixer._lendControlInterpolant(), this._weightInterpolant = interpolant);
    const times = interpolant.parameterPositions,
      values = interpolant.sampleValues;
    return times[0] = now, values[0] = weightNow, times[1] = now + duration, values[1] = weightThen, this;
  }
}
const float32Array = new Float32Array(1);
/**
 * `AnimationMixer` is a player for animations on a particular object in
 * the scene. When multiple objects in the scene are animated independently,
 * one `AnimationMixer` may be used for each object.
 */
class AnimationMixer extends EventDispatcher {
  constructor(root) {
    super(), this._root = root, this._initMemoryManager(), this._accuIndex = 0, this.time = 0, this.timeScale = 1, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
      detail: this
    }));
  }
  _bindAction(action, prototypeAction) {
    const root = action._localRoot || this._root,
      tracks = action._clip.tracks,
      nTracks = tracks.length,
      bindings = action._propertyBindings,
      interpolants = action._interpolants,
      rootUuid = root.uuid,
      bindingsByRoot = this._bindingsByRootAndName;
    let bindingsByName = bindingsByRoot[rootUuid];
    void 0 === bindingsByName && (bindingsByName = {}, bindingsByRoot[rootUuid] = bindingsByName);
    for (let i = 0; i !== nTracks; ++i) {
      const track = tracks[i],
        trackName = track.name;
      let binding = bindingsByName[trackName];
      if (void 0 !== binding) ++binding.referenceCount, bindings[i] = binding;else {
        if (binding = bindings[i], void 0 !== binding) {
          null === binding._cacheIndex && (++binding.referenceCount, this._addInactiveBinding(binding, rootUuid, trackName));
          continue;
        }
        const path = prototypeAction && prototypeAction._propertyBindings[i].binding.parsedPath;
        binding = new PropertyMixer(PropertyBinding.create(root, trackName, path), track.ValueTypeName, track.getValueSize()), ++binding.referenceCount, this._addInactiveBinding(binding, rootUuid, trackName), bindings[i] = binding;
      }
      interpolants[i].resultBuffer = binding.buffer;
    }
  }
  _activateAction(action) {
    if (!this._isActiveAction(action)) {
      if (null === action._cacheIndex) {
        const rootUuid = (action._localRoot || this._root).uuid,
          clipUuid = action._clip.uuid,
          actionsForClip = this._actionsByClip[clipUuid];
        this._bindAction(action, actionsForClip && actionsForClip.knownActions[0]), this._addInactiveAction(action, clipUuid, rootUuid);
      }
      const bindings = action._propertyBindings;
      for (let i = 0, n = bindings.length; i !== n; ++i) {
        const binding = bindings[i];
        0 === binding.useCount++ && (this._lendBinding(binding), binding.saveOriginalState());
      }
      this._lendAction(action);
    }
  }
  _deactivateAction(action) {
    if (this._isActiveAction(action)) {
      const bindings = action._propertyBindings;
      for (let i = 0, n = bindings.length; i !== n; ++i) {
        const binding = bindings[i];
        0 === --binding.useCount && (binding.restoreOriginalState(), this._takeBackBinding(binding));
      }
      this._takeBackAction(action);
    }
  }
  _initMemoryManager() {
    this._actions = [], this._nActiveActions = 0, this._actionsByClip = {}, this._bindings = [], this._nActiveBindings = 0, this._bindingsByRootAndName = {}, this._controlInterpolants = [], this._nActiveControlInterpolants = 0;
    const scope = this;
    this.stats = {
      actions: {
        get total() {
          return scope._actions.length;
        },
        get inUse() {
          return scope._nActiveActions;
        }
      },
      bindings: {
        get total() {
          return scope._bindings.length;
        },
        get inUse() {
          return scope._nActiveBindings;
        }
      },
      controlInterpolants: {
        get total() {
          return scope._controlInterpolants.length;
        },
        get inUse() {
          return scope._nActiveControlInterpolants;
        }
      }
    };
  }
  _isActiveAction(action) {
    const index = action._cacheIndex;
    return null !== index && index < this._nActiveActions;
  }
  _addInactiveAction(action, clipUuid, rootUuid) {
    const actions = this._actions,
      actionsByClip = this._actionsByClip;
    let actionsForClip = actionsByClip[clipUuid];
    if (void 0 === actionsForClip) actionsForClip = {
      knownActions: [action],
      actionByRoot: {}
    }, action._byClipCacheIndex = 0, actionsByClip[clipUuid] = actionsForClip;else {
      const knownActions = actionsForClip.knownActions;
      action._byClipCacheIndex = knownActions.length, knownActions.push(action);
    }
    action._cacheIndex = actions.length, actions.push(action), actionsForClip.actionByRoot[rootUuid] = action;
  }
  /* 要求 action 已在 inactive 区。对全 actions 与 clip.knownActions 两级 swap-pop，并修被搬动作 _cacheIndex/_byClipCacheIndex；移除 root→action，空 clip 表删除，最后释放此 action 的 inactive bindings。动作本体留在外部仍可引用；不自动 stop 活跃动作。 */
  _removeInactiveAction(e) {
    const actions = this._actions,
      n = actions[actions.length - 1],
      r = e._cacheIndex;
    n._cacheIndex = r, actions[r] = n, actions.pop(), e._cacheIndex = null;
    const i = e._clip.uuid,
      actionsByClip = this._actionsByClip,
      s = actionsByClip[i],
      o = s.knownActions,
      c = o[o.length - 1],
      l = e._byClipCacheIndex;
    c._byClipCacheIndex = l, o[l] = c, o.pop(), e._byClipCacheIndex = null;
    delete s.actionByRoot[(e._localRoot || this._root).uuid], 0 === o.length && delete actionsByClip[i], this._removeInactiveBindingsForAction(e);
  }
  _removeInactiveBindingsForAction(action) {
    const bindings = action._propertyBindings;
    for (let i = 0, n = bindings.length; i !== n; ++i) {
      const binding = bindings[i];
      0 === --binding.referenceCount && this._removeInactiveBinding(binding);
    }
  }
  _lendAction(action) {
    const actions = this._actions,
      prevIndex = action._cacheIndex,
      lastActiveIndex = this._nActiveActions++,
      firstInactiveAction = actions[lastActiveIndex];
    action._cacheIndex = lastActiveIndex, actions[lastActiveIndex] = action, firstInactiveAction._cacheIndex = prevIndex, actions[prevIndex] = firstInactiveAction;
  }
  _takeBackAction(action) {
    const actions = this._actions,
      prevIndex = action._cacheIndex,
      firstInactiveIndex = --this._nActiveActions,
      lastActiveAction = actions[firstInactiveIndex];
    action._cacheIndex = firstInactiveIndex, actions[firstInactiveIndex] = action, lastActiveAction._cacheIndex = prevIndex, actions[prevIndex] = lastActiveAction;
  }
  _addInactiveBinding(binding, rootUuid, trackName) {
    const bindingsByRoot = this._bindingsByRootAndName,
      bindings = this._bindings;
    let bindingByName = bindingsByRoot[rootUuid];
    void 0 === bindingByName && (bindingByName = {}, bindingsByRoot[rootUuid] = bindingByName), bindingByName[trackName] = binding, binding._cacheIndex = bindings.length, bindings.push(binding);
  }
  _removeInactiveBinding(binding) {
    const bindings = this._bindings,
      propBinding = binding.binding,
      rootUuid = propBinding.rootNode.uuid,
      trackName = propBinding.path,
      bindingsByRoot = this._bindingsByRootAndName,
      bindingByName = bindingsByRoot[rootUuid],
      lastInactiveBinding = bindings[bindings.length - 1],
      cacheIndex = binding._cacheIndex;
    lastInactiveBinding._cacheIndex = cacheIndex, bindings[cacheIndex] = lastInactiveBinding, bindings.pop(), delete bindingByName[trackName], 0 === Object.keys(bindingByName).length && delete bindingsByRoot[rootUuid];
  }
  _lendBinding(binding) {
    const bindings = this._bindings,
      prevIndex = binding._cacheIndex,
      lastActiveIndex = this._nActiveBindings++,
      firstInactiveBinding = bindings[lastActiveIndex];
    binding._cacheIndex = lastActiveIndex, bindings[lastActiveIndex] = binding, firstInactiveBinding._cacheIndex = prevIndex, bindings[prevIndex] = firstInactiveBinding;
  }
  _takeBackBinding(binding) {
    const bindings = this._bindings,
      prevIndex = binding._cacheIndex,
      firstInactiveIndex = --this._nActiveBindings,
      lastActiveBinding = bindings[firstInactiveIndex];
    binding._cacheIndex = firstInactiveIndex, bindings[firstInactiveIndex] = binding, lastActiveBinding._cacheIndex = prevIndex, bindings[prevIndex] = lastActiveBinding;
  }
  _lendControlInterpolant() {
    const interpolants = this._controlInterpolants,
      lastActiveIndex = this._nActiveControlInterpolants++;
    let interpolant = interpolants[lastActiveIndex];
    return void 0 === interpolant && (interpolant = new LinearInterpolant(new Float32Array(2), new Float32Array(2), 1, float32Array), interpolant.__cacheIndex = lastActiveIndex, interpolants[lastActiveIndex] = interpolant), interpolant;
  }
  _takeBackControlInterpolant(interpolant) {
    const interpolants = this._controlInterpolants,
      prevIndex = interpolant.__cacheIndex,
      firstInactiveIndex = --this._nActiveControlInterpolants,
      lastActiveInterpolant = interpolants[firstInactiveIndex];
    interpolant.__cacheIndex = firstInactiveIndex, interpolants[firstInactiveIndex] = interpolant, lastActiveInterpolant.__cacheIndex = prevIndex, interpolants[prevIndex] = lastActiveInterpolant;
  }
  /* 按 optionalRoot或默认 root、clip 名/对象解析 UUID，blendMode 默认 clip值。相同 clip/root且模式相同返回缓存动作；可用 knownActions 首项为绑定原型，必要时从它取 clip。找不到 clip 返回null，否则 new AnimationAction，_bindAction、_addInactiveAction 后返回，尚未 play。 */
  clipAction(e, t, n) {
    const r = t || this._root,
      i = r.uuid;
    let a = "string" == typeof e ? AnimationClip.findByName(r, e) : e;
    const s = null !== a ? a.uuid : e,
      o = this._actionsByClip[s];
    let c = null;
    if (void 0 === n && (n = null !== a ? a.blendMode : NormalAnimationBlendMode), void 0 !== o) {
      const e = o.actionByRoot[i];
      if (void 0 !== e && e.blendMode === n) return e;
      c = o.knownActions[0], null === a && (a = c._clip);
    }
    if (null === a) return null;
    const animationAction = new AnimationAction(this, a, t, n);
    return this._bindAction(animationAction, c), this._addInactiveAction(animationAction, s, i), animationAction;
  }
  /* 同样解析 root/clip查 actionsByClip.actionByRoot，返回已有或null；没有构造、绑定或激活副作用。只按 root/clip查，不带 blendMode 参数过滤。 */
  existingAction(e, t) {
    const n = t || this._root,
      r = n.uuid,
      i = "string" == typeof e ? AnimationClip.findByName(n, e) : e,
      a = i ? i.uuid : e,
      s = this._actionsByClip[a];
    return void 0 !== s && s.actionByRoot[r] || null;
  }
  /* 从 _nActiveActions-1 向0遍历并 stop，避免 stop 的活跃区交换导致漏项；返回 mixer。不是遍历所有缓存 action，也不删除缓存对象。 */
  stopAllAction() {
    const actions = this._actions;
    for (let t = this._nActiveActions - 1; t >= 0; --t) actions[t].stop();
    return this;
  }
  update(deltaTime) {
    deltaTime *= this.timeScale;
    const actions = this._actions,
      nActions = this._nActiveActions,
      time = this.time += deltaTime,
      timeDirection = Math.sign(deltaTime),
      accuIndex = this._accuIndex ^= 1;
    for (let i = 0; i !== nActions; ++i) {
      actions[i]._update(time, deltaTime, timeDirection, accuIndex);
    }
    const bindings = this._bindings,
      nBindings = this._nActiveBindings;
    for (let i = 0; i !== nBindings; ++i) bindings[i].apply(accuIndex);
    return this;
  }
  setTime(time) {
    this.time = 0;
    for (let i = 0; i < this._actions.length; i++) this._actions[i].time = 0;
    return this.update(time);
  }
  /**
   * Returns this mixer's root object.
   *
   * @return {Object3D} The mixer's root object.
   */
  getRoot() {
    return this._root;
  }
  uncacheClip(clip) {
    const actions = this._actions,
      clipUuid = clip.uuid,
      actionsByClip = this._actionsByClip,
      actionsForClip = actionsByClip[clipUuid];
    if (void 0 !== actionsForClip) {
      const actionsToRemove = actionsForClip.knownActions;
      for (let i = 0, n = actionsToRemove.length; i !== n; ++i) {
        const action = actionsToRemove[i];
        this._deactivateAction(action);
        const cacheIndex = action._cacheIndex,
          lastInactiveAction = actions[actions.length - 1];
        action._cacheIndex = null, action._byClipCacheIndex = null, lastInactiveAction._cacheIndex = cacheIndex, actions[cacheIndex] = lastInactiveAction, actions.pop(), this._removeInactiveBindingsForAction(action);
      }
      delete actionsByClip[clipUuid];
    }
  }
  /* 逐 clip 找此 root动作，先 deactivate 再 removeInactive；随后对该 root所有属性绑定 restoreOriginalState，再 removeInactiveBinding。恢复动画前值而不是 dispose root/geometry/material，其他 root 动作可继续共享同 clip。 */
  uncacheRoot(e) {
    const t = e.uuid,
      actionsByClip = this._actionsByClip;
    for (const e in actionsByClip) {
      const r = actionsByClip[e].actionByRoot[t];
      void 0 !== r && (this._deactivateAction(r), this._removeInactiveAction(r));
    }
    const r = this._bindingsByRootAndName[t];
    if (void 0 !== r) for (const e in r) {
      const t = r[e];
      t.restoreOriginalState(), this._removeInactiveBinding(t);
    }
  }
  uncacheAction(clip, optionalRoot) {
    const action = this.existingAction(clip, optionalRoot);
    null !== action && (this._deactivateAction(action), this._removeInactiveAction(action));
  }
}
/**
 * Represents a 3D render target.
 *
 * @augments RenderTarget
 */
class RenderTarget3D extends RenderTarget {
  /**
   * Constructs a new 3D render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {number} [depth=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(width = 1, height = 1, depth = 1, options = {}) {
    super(width, height, options), this.isRenderTarget3D = !0, this.depth = depth, this.texture = new Data3DTexture(null, width, height, depth), this._setTextureOptions(options), this.texture.isRenderTargetTexture = !0;
  }
}
/**
 * Represents a uniform which is a global shader variable. They are passed to shader programs.
 *
 * When declaring a uniform of a {@link ShaderMaterial}, it is declared by value or by object.
 * ```js
 * uniforms: {
 * 	time: { value: 1.0 },
 * 	resolution: new Uniform( new Vector2() )
 * };
 * ```
 * Since this class can only be used in context of {@link ShaderMaterial}, it is only supported
 * in {@link WebGLRenderer}.
 */
class Uniform {
  /**
   * Constructs a new uniform.
   *
   * @param {any} value - The uniform value.
   */
  constructor(value) {
    this.value = value;
  }
  clone() {
    return new Uniform(void 0 === this.value.clone ? this.value : this.value.clone());
  }
}
let Yc = 0;
/**
 * A class for managing multiple uniforms in a single group. The renderer will process
 * such a definition as a single UBO.
 *
 * Since this class can only be used in context of {@link ShaderMaterial}, it is only supported
 * in {@link WebGLRenderer}.
 *
 * @augments EventDispatcher
 */
class UniformsGroup extends EventDispatcher {
  constructor() {
    super(), this.isUniformsGroup = !0, Object.defineProperty(this, "id", {
      value: Yc++
    }), this.name = "", this.usage = StaticDrawUsage, this.uniforms = [];
  }
  /**
   * Adds the given uniform to this uniforms group.
   *
   * @param {Uniform} uniform - The uniform to add.
   * @return {UniformsGroup} A reference to this uniforms group.
   */
  add(uniform) {
    return this.uniforms.push(uniform), this;
  }
  remove(uniform) {
    const index = this.uniforms.indexOf(uniform);
    return -1 !== index && this.uniforms.splice(index, 1), this;
  }
  /**
   * Sets the name of this uniforms group.
   *
   * @param {string} name - The name to set.
   * @return {UniformsGroup} A reference to this uniforms group.
   */
  setName(name) {
    return this.name = name, this;
  }
  /**
   * Sets the usage of this uniforms group.
   *
   * @param {(StaticDrawUsage|DynamicDrawUsage|StreamDrawUsage|StaticReadUsage|DynamicReadUsage|StreamReadUsage|StaticCopyUsage|DynamicCopyUsage|StreamCopyUsage)} value - The usage to set.
   * @return {UniformsGroup} A reference to this uniforms group.
   */
  setUsage(value) {
    return this.usage = value, this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
  copy(source) {
    this.name = source.name, this.usage = source.usage;
    const uniformsSource = source.uniforms;
    this.uniforms.length = 0;
    for (let i = 0, l = uniformsSource.length; i < l; i++) {
      const uniforms = Array.isArray(uniformsSource[i]) ? uniformsSource[i] : [uniformsSource[i]];
      for (let j = 0; j < uniforms.length; j++) this.uniforms.push(uniforms[j].clone());
    }
    return this;
  }
  /**
   * Returns a new uniforms group with copied values from this instance.
   *
   * @return {UniformsGroup} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
/**
 * An instanced version of an interleaved buffer.
 *
 * @augments InterleavedBuffer
 */
class InstancedInterleavedBuffer extends InterleavedBuffer {
  /**
   * Constructs a new instanced interleaved buffer.
   *
   * @param {TypedArray} array - A typed array with a shared buffer storing attribute data.
   * @param {number} stride - The number of typed-array elements per vertex.
   * @param {number} [meshPerAttribute=1] - Defines how often a value of this interleaved buffer should be repeated.
   */
  constructor(array, stride, meshPerAttribute = 1) {
    super(array, stride), this.isInstancedInterleavedBuffer = !0, this.meshPerAttribute = meshPerAttribute;
  }
  copy(source) {
    return super.copy(source), this.meshPerAttribute = source.meshPerAttribute, this;
  }
  clone(data) {
    const ib = super.clone(data);
    return ib.meshPerAttribute = this.meshPerAttribute, ib;
  }
  toJSON(data) {
    const json = super.toJSON(data);
    return json.isInstancedInterleavedBuffer = !0, json.meshPerAttribute = this.meshPerAttribute, json;
  }
}
/**
 * An alternative version of a buffer attribute with more control over the VBO.
 *
 * The renderer does not construct a VBO for this kind of attribute. Instead, it uses
 * whatever VBO is passed in constructor and can later be altered via the `buffer` property.
 *
 * The most common use case for this class is when some kind of GPGPU calculation interferes
 * or even produces the VBOs in question.
 *
 * Notice that this class can only be used with {@link WebGLRenderer}.
 */
class GLBufferAttribute {
  constructor(buffer, type, itemSize, elementSize, count, normalized = !1) {
    this.isGLBufferAttribute = !0, this.name = "", this.buffer = buffer, this.type = type, this.itemSize = itemSize, this.elementSize = elementSize, this.count = count, this.normalized = normalized, this.version = 0;
  }
  set needsUpdate(value) {
    !0 === value && this.version++;
  }
  /**
   * Sets the given native WebGL buffer.
   *
   * @param {WebGLBuffer} buffer - The buffer to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setBuffer(buffer) {
    return this.buffer = buffer, this;
  }
  /**
   * Sets the given native data type and element size.
   *
   * @param {number} type - The native data type (e.g. `gl.FLOAT`).
   * @param {number} elementSize - The corresponding size (in bytes) for the given `type` parameter.
   * @return {BufferAttribute} A reference to this instance.
   */
  setType(type, elementSize) {
    return this.type = type, this.elementSize = elementSize, this;
  }
  /**
   * Sets the item size.
   *
   * @param {number} itemSize - The item size.
   * @return {BufferAttribute} A reference to this instance.
   */
  setItemSize(itemSize) {
    return this.itemSize = itemSize, this;
  }
  /**
   * Sets the count (the expected number of vertices in VBO).
   *
   * @param {number} count - The count.
   * @return {BufferAttribute} A reference to this instance.
   */
  setCount(count) {
    return this.count = count, this;
  }
}
const _matrix = new Matrix4();
/**
 * This class is designed to assist with raycasting. Raycasting is used for
 * mouse picking (working out what objects in the 3d space the mouse is over)
 * amongst other things.
 */
class Raycaster {
  constructor(origin, direction, near = 0, far = 1 / 0) {
    this.ray = new Ray(origin, direction), this.near = near, this.far = far, this.camera = null, this.layers = new Layers(), this.params = {
      Mesh: {},
      Line: {
        threshold: 1
      },
      LOD: {},
      Points: {
        threshold: 1
      },
      Sprite: {}
    };
  }
  /**
   * Updates the ray with a new origin and direction by copying the values from the arguments.
   *
   * @param {Vector3} origin - The origin vector where the ray casts from.
   * @param {Vector3} direction - The (normalized) direction vector that gives direction to the ray.
   */
  set(origin, direction) {
    this.ray.set(origin, direction);
  }
  setFromCamera(coords, camera) {
    camera.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(camera.matrixWorld), this.ray.direction.set(coords.x, coords.y, .5).unproject(camera).sub(this.ray.origin).normalize(), this.camera = camera) : camera.isOrthographicCamera ? (this.ray.origin.set(coords.x, coords.y, camera.projectionMatrix.elements[14]).unproject(camera), this.ray.direction.set(0, 0, -1).transformDirection(camera.matrixWorld), this.camera = camera) : error("Raycaster: Unsupported camera type: " + camera.type);
  }
  /**
   * Uses the given WebXR controller to compute a new origin and direction for the internal ray.
   *
   * @param {WebXRController} controller - The controller to copy the position and direction from.
   * @return {Raycaster} A reference to this raycaster.
   */
  setFromXRController(controller) {
    return _matrix.identity().extractRotation(controller.matrixWorld), this.ray.origin.setFromMatrixPosition(controller.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(_matrix), this;
  }
  /**
   * The intersection point of a raycaster intersection test.
   * @typedef {Object} Raycaster~Intersection
   * @property {number} distance - The distance from the ray's origin to the intersection point.
   * @property {number} distanceToRay -  Some 3D objects e.g. {@link Points} provide the distance of the
   * intersection to the nearest point on the ray. For other objects it will be `undefined`.
   * @property {Vector3} point - The intersection point, in world coordinates.
   * @property {Object} face - The face that has been intersected.
   * @property {number} faceIndex - The face index.
   * @property {Object3D} object - The 3D object that has been intersected.
   * @property {Vector2} uv - U,V coordinates at point of intersection.
   * @property {Vector2} uv1 - Second set of U,V coordinates at point of intersection.
   * @property {Vector3} normal - Interpolated normal vector at point of intersection.
   * @property {number} instanceId - The index number of the instance where the ray
   * intersects the {@link InstancedMesh}.
   */

  /**
   * Checks all intersection between the ray and the object with or without the
   * descendants. Intersections are returned sorted by distance, closest first.
   *
   * `Raycaster` delegates to the `raycast()` method of the passed 3D object, when
   * evaluating whether the ray intersects the object or not. This allows meshes to respond
   * differently to ray casting than lines or points.
   *
   * Note that for meshes, faces must be pointed towards the origin of the ray in order
   * to be detected; intersections of the ray passing through the back of a face will not
   * be detected. To raycast against both faces of an object, you'll want to set  {@link Material#side}
   * to `THREE.DoubleSide`.
   *
   * @param {Object3D} object - The 3D object to check for intersection with the ray.
   * @param {boolean} [recursive=true] - If set to `true`, it also checks all descendants.
   * Otherwise it only checks intersection with the object.
   * @param {Array<Raycaster~Intersection>} [intersects=[]] The target array that holds the result of the method.
   * @return {Array<Raycaster~Intersection>} An array holding the intersection points.
   */
  intersectObject(object, recursive = !0, intersects = []) {
    return intersect(object, this, intersects, recursive), intersects.sort(ascSort), intersects;
  }
  intersectObjects(objects, recursive = !0, intersects = []) {
    for (let i = 0, l = objects.length; i < l; i++) intersect(objects[i], this, intersects, recursive);
    return intersects.sort(ascSort), intersects;
  }
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：ascSort。 */
function ascSort(a, b) {
  return a.distance - b.distance;
}
/* 人工身份合同：layers 检查、object.raycast 和 recursive 子对象遍历。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function intersect(e, t, n, r) {
  let i = !0;
  if (e.layers.test(t.layers)) {
    !1 === e.raycast(t, n) && (i = !1);
  }
  if (!0 === i && !0 === r) {
    const r = e.children;
    for (let e = 0, i = r.length; e < i; e++) intersect(r[e], t, n, !0);
  }
}
/**
 * Class for keeping track of time.
 *
 * @deprecated since r183.
 */
class Clock {
  constructor(autoStart = !0) {
    this.autoStart = autoStart, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1, warn("Clock: This module has been deprecated. Please use THREE.Timer instead.");
  }
  start() {
    this.startTime = performance.now(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0;
  }
  stop() {
    this.getElapsedTime(), this.running = !1, this.autoStart = !1;
  }
  /**
   * Returns the elapsed time in seconds.
   *
   * @return {number} The elapsed time.
   */
  getElapsedTime() {
    return this.getDelta(), this.elapsedTime;
  }
  getDelta() {
    let diff = 0;
    if (this.autoStart && !this.running) return this.start(), 0;
    if (this.running) {
      const newTime = performance.now();
      diff = (newTime - this.oldTime) / 1e3, this.oldTime = newTime, this.elapsedTime += diff;
    }
    return diff;
  }
}
/**
 * This class can be used to represent points in 3D space as
 * [Spherical coordinates](https://en.wikipedia.org/wiki/Spherical_coordinate_system).
 */
class Spherical {
  /**
   * Constructs a new spherical.
   *
   * @param {number} [radius=1] - The radius, or the Euclidean distance (straight-line distance) from the point to the origin.
   * @param {number} [phi=0] - The polar angle in radians from the y (up) axis.
   * @param {number} [theta=0] - The equator/azimuthal angle in radians around the y (up) axis.
   */
  constructor(radius = 1, phi = 0, theta = 0) {
    this.radius = radius, this.phi = phi, this.theta = theta;
  }
  /**
   * Sets the spherical components by copying the given values.
   *
   * @param {number} radius - The radius.
   * @param {number} phi - The polar angle.
   * @param {number} theta - The azimuthal angle.
   * @return {Spherical} A reference to this spherical.
   */
  set(radius, phi, theta) {
    return this.radius = radius, this.phi = phi, this.theta = theta, this;
  }
  /**
   * Copies the values of the given spherical to this instance.
   *
   * @param {Spherical} other - The spherical to copy.
   * @return {Spherical} A reference to this spherical.
   */
  copy(other) {
    return this.radius = other.radius, this.phi = other.phi, this.theta = other.theta, this;
  }
  makeSafe() {
    const EPS = 1e-6;
    return this.phi = clamp(this.phi, EPS, Math.PI - EPS), this;
  }
  /**
   * Sets the spherical components from the given vector which is assumed to hold
   * Cartesian coordinates.
   *
   * @param {Vector3} v - The vector to set.
   * @return {Spherical} A reference to this spherical.
   */
  setFromVector3(v) {
    return this.setFromCartesianCoords(v.x, v.y, v.z);
  }
  setFromCartesianCoords(x, y, z) {
    return this.radius = Math.sqrt(x * x + y * y + z * z), 0 === this.radius ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(x, z), this.phi = Math.acos(clamp(y / this.radius, -1, 1))), this;
  }
  /**
   * Returns a new spherical with copied values from this instance.
   *
   * @return {Spherical} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
/**
 * This class can be used to represent points in 3D space as
 * [Cylindrical coordinates](https://en.wikipedia.org/wiki/Cylindrical_coordinate_system).
 */
class Cylindrical {
  /**
   * Constructs a new cylindrical.
   *
   * @param {number} [radius=1] - The distance from the origin to a point in the x-z plane.
   * @param {number} [theta=0] - A counterclockwise angle in the x-z plane measured in radians from the positive z-axis.
   * @param {number} [y=0] - The height above the x-z plane.
   */
  constructor(radius = 1, theta = 0, y = 0) {
    this.radius = radius, this.theta = theta, this.y = y;
  }
  /**
   * Sets the cylindrical components by copying the given values.
   *
   * @param {number} radius - The radius.
   * @param {number} theta - The theta angle.
   * @param {number} y - The height value.
   * @return {Cylindrical} A reference to this cylindrical.
   */
  set(radius, theta, y) {
    return this.radius = radius, this.theta = theta, this.y = y, this;
  }
  /**
   * Copies the values of the given cylindrical to this instance.
   *
   * @param {Cylindrical} other - The cylindrical to copy.
   * @return {Cylindrical} A reference to this cylindrical.
   */
  copy(other) {
    return this.radius = other.radius, this.theta = other.theta, this.y = other.y, this;
  }
  /**
   * Sets the cylindrical components from the given vector which is assumed to hold
   * Cartesian coordinates.
   *
   * @param {Vector3} v - The vector to set.
   * @return {Cylindrical} A reference to this cylindrical.
   */
  setFromVector3(v) {
    return this.setFromCartesianCoords(v.x, v.y, v.z);
  }
  /**
   * Sets the cylindrical components from the given Cartesian coordinates.
   *
   * @param {number} x - The x value.
   * @param {number} y - The x value.
   * @param {number} z - The x value.
   * @return {Cylindrical} A reference to this cylindrical.
   */
  setFromCartesianCoords(x, y, z) {
    return this.radius = Math.sqrt(x * x + z * z), this.theta = Math.atan2(x, z), this.y = y, this;
  }
  /**
   * Returns a new cylindrical with copied values from this instance.
   *
   * @return {Cylindrical} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
/**
 * Represents a 2x2 matrix.
 *
 * A Note on Row-Major and Column-Major Ordering:
 *
 * The constructor and {@link Matrix2#set} method take arguments in
 * [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order)
 * order, while internally they are stored in the {@link Matrix2#elements} array in column-major order.
 * This means that calling:
 * ```js
 * const m = new THREE.Matrix2();
 * m.set( 11, 12,
 *        21, 22 );
 * ```
 * will result in the elements array containing:
 * ```js
 * m.elements = [ 11, 21,
 *                12, 22 ];
 * ```
 * and internally all calculations are performed using column-major ordering.
 * However, as the actual ordering makes no difference mathematically and
 * most people are used to thinking about matrices in row-major order, the
 * three.js documentation shows matrices in row-major order. Just bear in
 * mind that if you are reading the source code, you'll have to take the
 * transpose of any matrices outlined here to make sense of the calculations.
 */
class Matrix2 {
  static {
    Matrix2.prototype.isMatrix2 = !0;
  }
  constructor(n11, n12, n21, n22) {
    this.elements = [1, 0, 0, 1], void 0 !== n11 && this.set(n11, n12, n21, n22);
  }
  /**
   * Sets this matrix to the 2x2 identity matrix.
   *
   * @return {Matrix2} A reference to this matrix.
   */
  identity() {
    return this.set(1, 0, 0, 1), this;
  }
  fromArray(array, offset = 0) {
    for (let i = 0; i < 4; i++) this.elements[i] = array[i + offset];
    return this;
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} n11 - 1-1 matrix element.
   * @param {number} n12 - 1-2 matrix element.
   * @param {number} n21 - 2-1 matrix element.
   * @param {number} n22 - 2-2 matrix element.
   * @return {Matrix2} A reference to this matrix.
   */
  set(n11, n12, n21, n22) {
    const te = this.elements;
    return te[0] = n11, te[2] = n12, te[1] = n21, te[3] = n22, this;
  }
}
const _vector$4 = new Vector2();
/**
 * Represents an axis-aligned bounding box (AABB) in 2D space.
 */
class Box2 {
  constructor(min = new Vector2(1 / 0, 1 / 0), max = new Vector2(-1 / 0, -1 / 0)) {
    this.isBox2 = !0, this.min = min, this.max = max;
  }
  /**
   * Sets the lower and upper boundaries of this box.
   * Please note that this method only copies the values from the given objects.
   *
   * @param {Vector2} min - The lower boundary of the box.
   * @param {Vector2} max - The upper boundary of the box.
   * @return {Box2} A reference to this bounding box.
   */
  set(min, max) {
    return this.min.copy(min), this.max.copy(max), this;
  }
  setFromPoints(points) {
    this.makeEmpty();
    for (let i = 0, il = points.length; i < il; i++) this.expandByPoint(points[i]);
    return this;
  }
  setFromCenterAndSize(center, size) {
    const halfSize = _vector$4.copy(size).multiplyScalar(.5);
    return this.min.copy(center).sub(halfSize), this.max.copy(center).add(halfSize), this;
  }
  /**
   * Returns a new box with copied values from this instance.
   *
   * @return {Box2} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given box to this instance.
   *
   * @param {Box2} box - The box to copy.
   * @return {Box2} A reference to this bounding box.
   */
  copy(box) {
    return this.min.copy(box.min), this.max.copy(box.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = 1 / 0, this.max.x = this.max.y = -1 / 0, this;
  }
  /**
   * Returns true if this box includes zero points within its bounds.
   * Note that a box with equal lower and upper bounds still includes one
   * point, the one both bounds share.
   *
   * @return {boolean} Whether this box is empty or not.
   */
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y;
  }
  getCenter(target) {
    return this.isEmpty() ? target.set(0, 0) : target.addVectors(this.min, this.max).multiplyScalar(.5);
  }
  /**
   * Returns the dimensions of this box.
   *
   * @param {Vector2} target - The target vector that is used to store the method's result.
   * @return {Vector2} The size.
   */
  getSize(target) {
    return this.isEmpty() ? target.set(0, 0) : target.subVectors(this.max, this.min);
  }
  /**
   * Expands the boundaries of this box to include the given point.
   *
   * @param {Vector2} point - The point that should be included by the bounding box.
   * @return {Box2} A reference to this bounding box.
   */
  expandByPoint(point) {
    return this.min.min(point), this.max.max(point), this;
  }
  /**
   * Expands this box equilaterally by the given vector. The width of this
   * box will be expanded by the x component of the vector in both
   * directions. The height of this box will be expanded by the y component of
   * the vector in both directions.
   *
   * @param {Vector2} vector - The vector that should expand the bounding box.
   * @return {Box2} A reference to this bounding box.
   */
  expandByVector(vector) {
    return this.min.sub(vector), this.max.add(vector), this;
  }
  /**
   * Expands each dimension of the box by the given scalar. If negative, the
   * dimensions of the box will be contracted.
   *
   * @param {number} scalar - The scalar value that should expand the bounding box.
   * @return {Box2} A reference to this bounding box.
   */
  expandByScalar(scalar) {
    return this.min.addScalar(-scalar), this.max.addScalar(scalar), this;
  }
  /**
   * Returns `true` if the given point lies within or on the boundaries of this box.
   *
   * @param {Vector2} point - The point to test.
   * @return {boolean} Whether the bounding box contains the given point or not.
   */
  containsPoint(point) {
    return point.x >= this.min.x && point.x <= this.max.x && point.y >= this.min.y && point.y <= this.max.y;
  }
  /**
   * Returns `true` if this bounding box includes the entirety of the given bounding box.
   * If this box and the given one are identical, this function also returns `true`.
   *
   * @param {Box2} box - The bounding box to test.
   * @return {boolean} Whether the bounding box contains the given bounding box or not.
   */
  containsBox(box) {
    return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y;
  }
  /**
   * Returns a point as a proportion of this box's width and height.
   *
   * @param {Vector2} point - A point in 2D space.
   * @param {Vector2} target - The target vector that is used to store the method's result.
   * @return {Vector2} A point as a proportion of this box's width and height.
   */
  getParameter(point, target) {
    return target.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y));
  }
  /**
   * Returns `true` if the given bounding box intersects with this bounding box.
   *
   * @param {Box2} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with this bounding box.
   */
  intersectsBox(box) {
    return box.max.x >= this.min.x && box.min.x <= this.max.x && box.max.y >= this.min.y && box.min.y <= this.max.y;
  }
  /**
   * Clamps the given point within the bounds of this box.
   *
   * @param {Vector2} point - The point to clamp.
   * @param {Vector2} target - The target vector that is used to store the method's result.
   * @return {Vector2} The clamped point.
   */
  clampPoint(point, target) {
    return target.copy(point).clamp(this.min, this.max);
  }
  /**
   * Returns the euclidean distance from any edge of this box to the specified point. If
   * the given point lies inside of this box, the distance will be `0`.
   *
   * @param {Vector2} point - The point to compute the distance to.
   * @return {number} The euclidean distance.
   */
  distanceToPoint(point) {
    return this.clampPoint(point, _vector$4).distanceTo(point);
  }
  /**
   * Computes the intersection of this bounding box and the given one, setting the upper
   * bound of this box to the lesser of the two boxes' upper bounds and the
   * lower bound of this box to the greater of the two boxes' lower bounds. If
   * there's no overlap, makes this box empty.
   *
   * @param {Box2} box - The bounding box to intersect with.
   * @return {Box2} A reference to this bounding box.
   */
  intersect(box) {
    return this.min.max(box.min), this.max.min(box.max), this.isEmpty() && this.makeEmpty(), this;
  }
  /**
   * Computes the union of this box and another and the given one, setting the upper
   * bound of this box to the greater of the two boxes' upper bounds and the
   * lower bound of this box to the lesser of the two boxes' lower bounds.
   *
   * @param {Box2} box - The bounding box that will be unioned with this instance.
   * @return {Box2} A reference to this bounding box.
   */
  union(box) {
    return this.min.min(box.min), this.max.max(box.max), this;
  }
  /**
   * Adds the given offset to both the upper and lower bounds of this bounding box,
   * effectively moving it in 2D space.
   *
   * @param {Vector2} offset - The offset that should be used to translate the bounding box.
   * @return {Box2} A reference to this bounding box.
   */
  translate(offset) {
    return this.min.add(offset), this.max.add(offset), this;
  }
  /**
   * Returns `true` if this bounding box is equal with the given one.
   *
   * @param {Box2} box - The box to test for equality.
   * @return {boolean} Whether this bounding box is equal with the given one.
   */
  equals(box) {
    return box.min.equals(this.min) && box.max.equals(this.max);
  }
}
const Uc = new Vector3(),
  Gc = new Vector3(),
  Xc = new Vector3(),
  jc = new Vector3(),
  Vc = new Vector3(),
  Qc = new Vector3(),
  Kc = new Vector3();
/**
 * An analytical line segment in 3D space represented by a start and end point.
 */
class Line3 {
  /**
   * Constructs a new line segment.
   *
   * @param {Vector3} [start=(0,0,0)] - Start of the line segment.
   * @param {Vector3} [end=(0,0,0)] - End of the line segment.
   */
  constructor(start = new Vector3(), end = new Vector3()) {
    this.start = start, this.end = end;
  }
  /**
   * Sets the start and end values by copying the given vectors.
   *
   * @param {Vector3} start - The start point.
   * @param {Vector3} end - The end point.
   * @return {Line3} A reference to this line segment.
   */
  set(start, end) {
    return this.start.copy(start), this.end.copy(end), this;
  }
  /**
   * Copies the values of the given line segment to this instance.
   *
   * @param {Line3} line - The line segment to copy.
   * @return {Line3} A reference to this line segment.
   */
  copy(line) {
    return this.start.copy(line.start), this.end.copy(line.end), this;
  }
  getCenter(target) {
    return target.addVectors(this.start, this.end).multiplyScalar(.5);
  }
  /**
   * Returns the delta vector of the line segment's start and end point.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The delta vector.
   */
  delta(target) {
    return target.subVectors(this.end, this.start);
  }
  /**
   * Returns the squared Euclidean distance between the line' start and end point.
   *
   * @return {number} The squared Euclidean distance.
   */
  distanceSq() {
    return this.start.distanceToSquared(this.end);
  }
  /**
   * Returns the Euclidean distance between the line' start and end point.
   *
   * @return {number} The Euclidean distance.
   */
  distance() {
    return this.start.distanceTo(this.end);
  }
  /**
   * Returns a vector at a certain position along the line segment.
   *
   * @param {number} t - A value between `[0,1]` to represent a position along the line segment.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The delta vector.
   */
  at(t, target) {
    return this.delta(target).multiplyScalar(t).add(this.start);
  }
  /* 返回 (end-start)·(point-start)/|end-start|²；零长度返回0，clampToLine 为真时夹到[0,1]。只给参数不写最近点，也不改变端点。 */
  closestPointToPointParameter(e, t) {
    Uc.subVectors(e, this.start), Gc.subVectors(this.end, this.start);
    const n = Gc.dot(Gc);
    if (0 === n) return 0;
    let r = Gc.dot(Uc) / n;
    return t && (r = clamp(r, 0, 1)), r;
  }
  /**
   * Returns the closest point on the line for a given point.
   *
   * @param {Vector3} point - The point to compute the closest point on the line for.
   * @param {boolean} clampToLine - Whether to clamp the result to the range `[0,1]` or not.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The closest point on the line.
   */
  closestPointToPoint(point, clampToLine, target) {
    const t = this.closestPointToPointParameter(point, clampToLine);
    return this.delta(target).multiplyScalar(t).add(this.start);
  }
  /* 两线段最近点解，长度平方<=1e-16 作退化，先处理两点/单点情况，其余解二元投影并将 s/t夹到[0,1]，平行分母0先取s=0再修边界。通常写 c1/c2为最近点并返回平方距离；两条都退化时实际把 c1减去c2，c1最终是差向量，这是代码可见的边界。默认输出是共享模块临时量。 */
  distanceSqToLine3(e, t = Qc, n = Kc) {
    const r = 1e-8 * 1e-8;
    let i, a;
    const start = this.start,
      o = e.start,
      end = this.end,
      l = e.end;
    Xc.subVectors(end, start), jc.subVectors(l, o), Vc.subVectors(start, o);
    const u = Xc.dot(Xc),
      d = jc.dot(jc),
      h = jc.dot(Vc);
    if (u <= r && d <= r) return t.copy(start), n.copy(o), t.sub(n), t.dot(t);
    if (u <= r) i = 0, a = h / d, a = clamp(a, 0, 1);else {
      const e = Xc.dot(Vc);
      if (d <= r) a = 0, i = clamp(-e / u, 0, 1);else {
        const t = Xc.dot(jc),
          n = u * d - t * t;
        i = 0 !== n ? clamp((t * h - e * d) / n, 0, 1) : 0, a = (t * i + h) / d, a < 0 ? (a = 0, i = clamp(-e / u, 0, 1)) : a > 1 && (a = 1, i = clamp((t - e) / u, 0, 1));
      }
    }
    return t.copy(start).addScaledVector(Xc, i), n.copy(o).addScaledVector(jc, a), t.distanceToSquared(n);
  }
  /**
   * Applies a 4x4 transformation matrix to this line segment.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Line3} A reference to this line segment.
   */
  applyMatrix4(matrix) {
    return this.start.applyMatrix4(matrix), this.end.applyMatrix4(matrix), this;
  }
  /**
   * Returns `true` if this line segment is equal with the given one.
   *
   * @param {Line3} line - The line segment to test for equality.
   * @return {boolean} Whether this line segment is equal with the given one.
   */
  equals(line) {
    return line.start.equals(this.start) && line.end.equals(this.end);
  }
  /**
   * Returns a new line segment with copied values from this instance.
   *
   * @return {Line3} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
const Jc = new Vector3();
/**
 * This displays a cone shaped helper object for a {@link SpotLight}.
 *
 * When the spot light or its target are transformed or light properties are
 * changed, it's necessary to call the `update()` method of the respective helper.
 *
 * ```js
 * const spotLight = new THREE.SpotLight( 0xffffff );
 * spotLight.position.set( 10, 10, 10 );
 * scene.add( spotLight );
 *
 * const spotLightHelper = new THREE.SpotLightHelper( spotLight );
 * scene.add( spotLightHelper );
 * ```
 *
 * @augments Object3D
 */
class SpotLightHelper extends Object3D {
  constructor(light, color) {
    super(), this.light = light, this.matrixAutoUpdate = !1, this.color = color, this.type = "SpotLightHelper";
    const geometry = new BufferGeometry(),
      positions = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1];
    for (let i = 0, j = 1, l = 32; i < l; i++, j++) {
      const p1 = i / l * Math.PI * 2,
        p2 = j / l * Math.PI * 2;
      positions.push(Math.cos(p1), Math.sin(p1), 1, Math.cos(p2), Math.sin(p2), 1);
    }
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    const material = new LineBasicMaterial({
      fog: !1,
      toneMapped: !1
    });
    this.cone = new LineSegments(geometry, material), this.add(this.cone), this.update();
  }
  dispose() {
    this.cone.geometry.dispose(), this.cone.material.dispose();
  }
  update() {
    this.light.updateWorldMatrix(!0, !1), this.light.target.updateWorldMatrix(!0, !1), this.parent ? (this.parent.updateWorldMatrix(!0), this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)) : this.matrix.copy(this.light.matrixWorld), this.matrixWorldNeedsUpdate = !0;
    const coneLength = this.light.distance ? this.light.distance : 1e3,
      coneWidth = coneLength * Math.tan(this.light.angle);
    this.cone.scale.set(coneWidth, coneWidth, coneLength), Jc.setFromMatrixPosition(this.light.target.matrixWorld), this.cone.lookAt(Jc), void 0 !== this.color ? this.cone.material.color.set(this.color) : this.cone.material.color.copy(this.light.color);
  }
}
const $c = new Vector3(),
  Zc = new Matrix4(),
  el = new Matrix4();
/**
 * A helper object to assist with visualizing a {@link Skeleton}.
 *
 * ```js
 * const helper = new THREE.SkeletonHelper( skinnedMesh );
 * scene.add( helper );
 * ```
 *
 * @augments LineSegments
 */
class SkeletonHelper extends LineSegments {
  /* 递归收集 bones，仅 bone-parent也是Bone的边预留两个 position/color顶点。新 LineBasicMaterial 开 vertexColors、禁深度测/写与toneMapping、透明；root/bones保存引用，matrix直接引用root.matrixWorld，matrixAutoUpdate=false，端色蓝/绿。此时位置全0，后续 update才填骨骼端点。 */
  constructor(root) {
    const bones = getBoneList(root),
      bufferGeometry = new BufferGeometry(),
      r = [],
      i = [];
    for (let e = 0; e < bones.length; e++) {
      const n = bones[e];
      n.parent && n.parent.isBone && (r.push(0, 0, 0), r.push(0, 0, 0), i.push(0, 0, 0), i.push(0, 0, 0));
    }
    bufferGeometry.setAttribute("position", new Float32BufferAttribute(r, 3)), bufferGeometry.setAttribute("color", new Float32BufferAttribute(i, 3));
    super(bufferGeometry, new LineBasicMaterial({
      vertexColors: !0,
      depthTest: !1,
      depthWrite: !1,
      toneMapped: !1,
      transparent: !0
    })), this.isSkeletonHelper = !0, this.type = "SkeletonHelper", this.root = root, this.bones = bones, this.matrix = root.matrixWorld, this.matrixAutoUpdate = !1;
    const a = new Color(255),
      s = new Color(65280);
    this.setColors(a, s);
  }
  updateMatrixWorld(force) {
    const bones = this.bones,
      geometry = this.geometry,
      position = geometry.getAttribute("position");
    el.copy(this.root.matrixWorld).invert();
    for (let i = 0, j = 0; i < bones.length; i++) {
      const bone = bones[i];
      bone.parent && bone.parent.isBone && (Zc.multiplyMatrices(el, bone.matrixWorld), $c.setFromMatrixPosition(Zc), position.setXYZ(j, $c.x, $c.y, $c.z), Zc.multiplyMatrices(el, bone.parent.matrixWorld), $c.setFromMatrixPosition(Zc), position.setXYZ(j + 1, $c.x, $c.y, $c.z), j += 2);
    }
    geometry.getAttribute("position").needsUpdate = !0, super.updateMatrixWorld(force);
  }
  setColors(color1, color2) {
    const colorAttribute = this.geometry.getAttribute("color");
    for (let i = 0; i < colorAttribute.count; i += 2) colorAttribute.setXYZ(i, color1.r, color1.g, color1.b), colorAttribute.setXYZ(i + 1, color2.r, color2.g, color2.b);
    return colorAttribute.needsUpdate = !0, this;
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：getBoneList。 */
function getBoneList(object) {
  const boneList = [];
  !0 === object.isBone && boneList.push(object);
  for (let i = 0; i < object.children.length; i++) boneList.push(...getBoneList(object.children[i]));
  return boneList;
}
/**
 * This displays a helper object consisting of a spherical mesh for
 * visualizing an instance of {@link PointLight}.
 *
 * ```js
 * const pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
 * pointLight.position.set( 10, 10, 10 );
 * scene.add( pointLight );
 *
 * const sphereSize = 1;
 * const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
 * scene.add( pointLightHelper );
 * ```
 *
 * @augments Mesh
 */
class PointLightHelper extends Mesh {
  /* 创建低分辨率 SphereGeometry(sphereSize,4,2)+wireframe MeshBasicMaterial，fog/toneMapped=false。保存 light和可选覆盖色，matrix共享light.matrixWorld、禁自动本地矩阵，立即 update同步颜色。构造拥有辅助几何/材质，不拥有被观察的light。 */
  constructor(light, t, n) {
    super(new SphereGeometry(t, 4, 2), new MeshBasicMaterial({
      wireframe: !0,
      fog: !1,
      toneMapped: !1
    })), this.light = light, this.color = n, this.type = "PointLightHelper", this.matrix = this.light.matrixWorld, this.matrixAutoUpdate = !1, this.update();
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
  update() {
    this.matrixWorldNeedsUpdate = !0, this.light.updateWorldMatrix(!0, !1), void 0 !== this.color ? this.material.color.set(this.color) : this.material.color.copy(this.light.color);
  }
}
const nl = new Vector3(),
  rl = new Color(),
  il = new Color();
/**
 * Creates a visual aid consisting of a spherical mesh for a
 * given {@link HemisphereLight}.
 *
 * When the hemisphere light is transformed or its light properties are changed,
 * it's necessary to call the `update()` method of the respective helper.
 *
 * ```js
 * const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
 * const helper = new THREE.HemisphereLightHelper( light, 5 );
 * scene.add( helper );
 * ```
 *
 * @augments Object3D
 */
class HemisphereLightHelper extends Object3D {
  constructor(light, size, color) {
    super(), this.light = light, this.matrix = light.matrixWorld, this.matrixAutoUpdate = !1, this.color = color, this.type = "HemisphereLightHelper";
    const geometry = new OctahedronGeometry(size);
    geometry.rotateY(.5 * Math.PI), this.material = new MeshBasicMaterial({
      wireframe: !0,
      fog: !1,
      toneMapped: !1
    }), void 0 === this.color && (this.material.vertexColors = !0);
    const position = geometry.getAttribute("position"),
      colors = new Float32Array(3 * position.count);
    geometry.setAttribute("color", new BufferAttribute(colors, 3)), this.add(new Mesh(geometry, this.material)), this.update();
  }
  dispose() {
    this.children[0].geometry.dispose(), this.children[0].material.dispose();
  }
  update() {
    const mesh = this.children[0];
    if (void 0 !== this.color) this.material.color.set(this.color);else {
      const colors = mesh.geometry.getAttribute("color");
      rl.copy(this.light.color), il.copy(this.light.groundColor);
      for (let i = 0, l = colors.count; i < l; i++) {
        const color = i < l / 2 ? rl : il;
        colors.setXYZ(i, color.r, color.g, color.b);
      }
      colors.needsUpdate = !0;
    }
    this.matrixWorldNeedsUpdate = !0, this.light.updateWorldMatrix(!0, !1), mesh.lookAt(nl.setFromMatrixPosition(this.light.matrixWorld).negate());
  }
}
/**
 * The helper is an object to define grids. Grids are two-dimensional
 * arrays of lines.
 *
 * ```js
 * const size = 10;
 * const divisions = 10;
 *
 * const gridHelper = new THREE.GridHelper( size, divisions );
 * scene.add( gridHelper );
 * ```
 *
 * @augments LineSegments
 */
class GridHelper extends LineSegments {
  /* size/divisions 决定XZ网格：每个刻度生成两条互相垂直线，中心刻度用color1，其余color2；顶点与颜色为新 Float32 attributes。材质vertexColors=true、toneMapped=false。奇数divisions没有整数中心刻度；无divisions=0保护。 */
  constructor(e = 10, t = 10, n = 4473924, r = 8947848) {
    n = new Color(n), r = new Color(r);
    const i = t / 2,
      a = e / t,
      s = e / 2,
      o = [],
      c = [];
    for (let e = 0, l = 0, u = -s; e <= t; e++, u += a) {
      o.push(-s, 0, u, s, 0, u), o.push(u, 0, -s, u, 0, s);
      const t = e === i ? n : r;
      t.toArray(c, l), l += 3, t.toArray(c, l), l += 3, t.toArray(c, l), l += 3, t.toArray(c, l), l += 3;
    }
    const bufferGeometry = new BufferGeometry();
    bufferGeometry.setAttribute("position", new Float32BufferAttribute(o, 3)), bufferGeometry.setAttribute("color", new Float32BufferAttribute(c, 3));
    super(bufferGeometry, new LineBasicMaterial({
      vertexColors: !0,
      toneMapped: !1
    })), this.type = "GridHelper";
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
/**
 * This helper is an object to define polar grids. Grids are
 * two-dimensional arrays of lines.
 *
 * ```js
 * const radius = 10;
 * const sectors = 16;
 * const rings = 8;
 * const divisions = 64;
 *
 * const helper = new THREE.PolarGridHelper( radius, sectors, rings, divisions );
 * scene.add( helper );
 * ```
 *
 * @augments LineSegments
 */
class PolarGridHelper extends LineSegments {
  /* XZ平面 radius，sectors>1才建中心到边的径向线，再建 rings个从外往内圆，每圆divisions段，交替两色。生成 position/color线段属性与不做toneMapping的顶点色材质；不是闭合索引圆，也不生成半径0的中心环。 */
  constructor(e = 10, t = 16, n = 8, r = 64, i = 4473924, a = 8947848) {
    i = new Color(i), a = new Color(a);
    const s = [],
      o = [];
    if (t > 1) for (let n = 0; n < t; n++) {
      const r = n / t * (2 * Math.PI),
        c = Math.sin(r) * e,
        l = Math.cos(r) * e;
      s.push(0, 0, 0), s.push(c, 0, l);
      const u = 1 & n ? i : a;
      o.push(u.r, u.g, u.b), o.push(u.r, u.g, u.b);
    }
    for (let t = 0; t < n; t++) {
      const c = 1 & t ? i : a,
        l = e - e / n * t;
      for (let e = 0; e < r; e++) {
        let t = e / r * (2 * Math.PI),
          n = Math.sin(t) * l,
          i = Math.cos(t) * l;
        s.push(n, 0, i), o.push(c.r, c.g, c.b), t = (e + 1) / r * (2 * Math.PI), n = Math.sin(t) * l, i = Math.cos(t) * l, s.push(n, 0, i), o.push(c.r, c.g, c.b);
      }
    }
    const bufferGeometry = new BufferGeometry();
    bufferGeometry.setAttribute("position", new Float32BufferAttribute(s, 3)), bufferGeometry.setAttribute("color", new Float32BufferAttribute(o, 3));
    super(bufferGeometry, new LineBasicMaterial({
      vertexColors: !0,
      toneMapped: !1
    })), this.type = "PolarGridHelper";
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
const al = new Vector3(),
  sl = new Vector3(),
  ol = new Vector3();
/**
 * Helper object to assist with visualizing a {@link DirectionalLight}'s
 * effect on the scene. This consists of a plane and a line representing the
 * light's position and direction.
 *
 * When the directional light or its target are transformed or light properties
 * are changed, it's necessary to call the `update()` method of the respective helper.
 *
 * ```js
 * const light = new THREE.DirectionalLight( 0xFFFFFF );
 * scene.add( light );
 *
 * const helper = new THREE.DirectionalLightHelper( light, 5 );
 * scene.add( helper );
 * ```
 *
 * @augments Object3D
 */
class DirectionalLightHelper extends Object3D {
  constructor(light, size, color) {
    super(), this.light = light, this.matrix = light.matrixWorld, this.matrixAutoUpdate = !1, this.color = color, this.type = "DirectionalLightHelper", void 0 === size && (size = 1);
    let geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute([-size, size, 0, size, size, 0, size, -size, 0, -size, -size, 0, -size, size, 0], 3));
    const material = new LineBasicMaterial({
      fog: !1,
      toneMapped: !1
    });
    this.lightPlane = new Line(geometry, material), this.add(this.lightPlane), geometry = new BufferGeometry(), geometry.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 0, 0, 1], 3)), this.targetLine = new Line(geometry, material), this.add(this.targetLine), this.update();
  }
  dispose() {
    this.lightPlane.geometry.dispose(), this.lightPlane.material.dispose(), this.targetLine.geometry.dispose(), this.targetLine.material.dispose();
  }
  update() {
    this.matrixWorldNeedsUpdate = !0, this.light.updateWorldMatrix(!0, !1), this.light.target.updateWorldMatrix(!0, !1), al.setFromMatrixPosition(this.light.matrixWorld), sl.setFromMatrixPosition(this.light.target.matrixWorld), ol.subVectors(sl, al), this.lightPlane.lookAt(sl), void 0 !== this.color ? (this.lightPlane.material.color.set(this.color), this.targetLine.material.color.set(this.color)) : (this.lightPlane.material.color.copy(this.light.color), this.targetLine.material.color.copy(this.light.color)), this.targetLine.lookAt(sl), this.targetLine.scale.z = ol.length();
  }
}
const cl = new Vector3(),
  camera = new Camera();
/**
 * This helps with visualizing what a camera contains in its frustum. It
 * visualizes the frustum of a camera using a line segments.
 *
 * Based on frustum visualization in [lightgl.js shadowmap example](https://github.com/evanw/lightgl.js/blob/master/tests/shadowmap.html).
 *
 * `CameraHelper` must be a child of the scene.
 *
 * When the camera is transformed or its projection matrix is changed, it's necessary
 * to call the `update()` method of the respective helper.
 *
 * ```js
 * const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
 * const helper = new THREE.CameraHelper( camera );
 * scene.add( helper );
 * ```
 *
 * @augments LineSegments
 */
class CameraHelper extends LineSegments {
  constructor(camera) {
    const geometry = new BufferGeometry(),
      material = new LineBasicMaterial({
        color: 16777215,
        vertexColors: !0,
        toneMapped: !1
      }),
      vertices = [],
      colors = [],
      pointMap = {};
    function addLine(a, b) {
      addPoint(a), addPoint(b);
    }
    function addPoint(id) {
      vertices.push(0, 0, 0), colors.push(0, 0, 0), void 0 === pointMap[id] && (pointMap[id] = []), pointMap[id].push(vertices.length / 3 - 1);
    }
    addLine("n1", "n2"), addLine("n2", "n4"), addLine("n4", "n3"), addLine("n3", "n1"), addLine("f1", "f2"), addLine("f2", "f4"), addLine("f4", "f3"), addLine("f3", "f1"), addLine("n1", "f1"), addLine("n2", "f2"), addLine("n3", "f3"), addLine("n4", "f4"), addLine("p", "n1"), addLine("p", "n2"), addLine("p", "n3"), addLine("p", "n4"), addLine("u1", "u2"), addLine("u2", "u3"), addLine("u3", "u1"), addLine("c", "t"), addLine("p", "c"), addLine("cn1", "cn2"), addLine("cn3", "cn4"), addLine("cf1", "cf2"), addLine("cf3", "cf4"), geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3)), geometry.setAttribute("color", new Float32BufferAttribute(colors, 3)), super(geometry, material), this.type = "CameraHelper", this.camera = camera, this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix(), this.matrix = camera.matrixWorld, this.matrixAutoUpdate = !1, this.pointMap = pointMap, this.update();
    const colorFrustum = new Color(16755200),
      colorCone = new Color(16711680),
      colorUp = new Color(43775),
      colorTarget = new Color(16777215),
      colorCross = new Color(3355443);
    this.setColors(colorFrustum, colorCone, colorUp, colorTarget, colorCross);
  }
  setColors(frustum, cone, up, target, cross) {
    const colorAttribute = this.geometry.getAttribute("color");
    return colorAttribute.setXYZ(0, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(1, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(2, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(3, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(4, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(5, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(6, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(7, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(8, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(9, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(10, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(11, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(12, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(13, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(14, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(15, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(16, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(17, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(18, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(19, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(20, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(21, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(22, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(23, frustum.r, frustum.g, frustum.b), colorAttribute.setXYZ(24, cone.r, cone.g, cone.b), colorAttribute.setXYZ(25, cone.r, cone.g, cone.b), colorAttribute.setXYZ(26, cone.r, cone.g, cone.b), colorAttribute.setXYZ(27, cone.r, cone.g, cone.b), colorAttribute.setXYZ(28, cone.r, cone.g, cone.b), colorAttribute.setXYZ(29, cone.r, cone.g, cone.b), colorAttribute.setXYZ(30, cone.r, cone.g, cone.b), colorAttribute.setXYZ(31, cone.r, cone.g, cone.b), colorAttribute.setXYZ(32, up.r, up.g, up.b), colorAttribute.setXYZ(33, up.r, up.g, up.b), colorAttribute.setXYZ(34, up.r, up.g, up.b), colorAttribute.setXYZ(35, up.r, up.g, up.b), colorAttribute.setXYZ(36, up.r, up.g, up.b), colorAttribute.setXYZ(37, up.r, up.g, up.b), colorAttribute.setXYZ(38, target.r, target.g, target.b), colorAttribute.setXYZ(39, target.r, target.g, target.b), colorAttribute.setXYZ(40, cross.r, cross.g, cross.b), colorAttribute.setXYZ(41, cross.r, cross.g, cross.b), colorAttribute.setXYZ(42, cross.r, cross.g, cross.b), colorAttribute.setXYZ(43, cross.r, cross.g, cross.b), colorAttribute.setXYZ(44, cross.r, cross.g, cross.b), colorAttribute.setXYZ(45, cross.r, cross.g, cross.b), colorAttribute.setXYZ(46, cross.r, cross.g, cross.b), colorAttribute.setXYZ(47, cross.r, cross.g, cross.b), colorAttribute.setXYZ(48, cross.r, cross.g, cross.b), colorAttribute.setXYZ(49, cross.r, cross.g, cross.b), colorAttribute.needsUpdate = !0, this;
  }
  /* 复制被观察相机 projectionMatrixInverse 到共享临时 camera。near/far NDC z反深度为1/0，标准WebGL为-1/1、WebGPU为0/1，非法坐标抛错。setPoint 对近远角、中心、上方向箭头和十字反投影，并按pointMap更新所有重复顶点，position.needsUpdate=true；不更新被观察相机投影。 */
  update() {
    const e = this.geometry,
      pointMap = this.pointMap;
    let n, r;
    if (camera.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse), !0 === this.camera.reversedDepth) n = 1, r = 0;else if (this.camera.coordinateSystem === WebGLCoordinateSystem) n = -1, r = 1;else {
      if (this.camera.coordinateSystem !== WebGPUCoordinateSystem) throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: " + this.camera.coordinateSystem);
      n = 0, r = 1;
    }
    setPoint("c", pointMap, e, camera, 0, 0, n), setPoint("t", pointMap, e, camera, 0, 0, r), setPoint("n1", pointMap, e, camera, -1, -1, n), setPoint("n2", pointMap, e, camera, 1, -1, n), setPoint("n3", pointMap, e, camera, -1, 1, n), setPoint("n4", pointMap, e, camera, 1, 1, n), setPoint("f1", pointMap, e, camera, -1, -1, r), setPoint("f2", pointMap, e, camera, 1, -1, r), setPoint("f3", pointMap, e, camera, -1, 1, r), setPoint("f4", pointMap, e, camera, 1, 1, r), setPoint("u1", pointMap, e, camera, .7, 1.1, n), setPoint("u2", pointMap, e, camera, -.7, 1.1, n), setPoint("u3", pointMap, e, camera, 0, 2, n), setPoint("cf1", pointMap, e, camera, -1, 0, r), setPoint("cf2", pointMap, e, camera, 1, 0, r), setPoint("cf3", pointMap, e, camera, 0, -1, r), setPoint("cf4", pointMap, e, camera, 0, 1, r), setPoint("cn1", pointMap, e, camera, -1, 0, n), setPoint("cn2", pointMap, e, camera, 1, 0, n), setPoint("cn3", pointMap, e, camera, 0, -1, n), setPoint("cn4", pointMap, e, camera, 0, 1, n), e.getAttribute("position").needsUpdate = !0;
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
/* 合同：此辅助函数与两份 r185 官方构建的参数、词法结构及外部调用角色一致；仅恢复命名，保留原有求值顺序。官方角色：setPoint。将相机规范空间坐标反投影，并更新映射到该点的所有几何顶点。 */
function setPoint(point, pointMap, geometry, camera, x, y, z) {
  cl.set(x, y, z).unproject(camera);
  const points = pointMap[point];
  if (void 0 !== points) {
    const position = geometry.getAttribute("position");
    for (let i = 0, l = points.length; i < l; i++) position.setXYZ(points[i], cl.x, cl.y, cl.z);
  }
}
const dl = new Box3();
/**
 * Helper object to graphically show the world-axis-aligned bounding box
 * around an object. The actual bounding box is handled with {@link Box3},
 * this is just a visual helper for debugging. It can be automatically
 * resized with {@link BoxHelper#update} when the object it's created from
 * is transformed. Note that the object must have a geometry for this to work,
 * so it won't work with sprites.
 *
 * ```js
 * const sphere = new THREE.SphereGeometry();
 * const object = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( 0xff0000 ) );
 * const box = new THREE.BoxHelper( object, 0xffff00 );
 * scene.add( box );
 * ```
 *
 * @augments LineSegments
 */
class BoxHelper extends LineSegments {
  constructor(object, color = 16776960) {
    const indices = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]),
      positions = new Float32Array(24),
      geometry = new BufferGeometry();
    geometry.setIndex(new BufferAttribute(indices, 1)), geometry.setAttribute("position", new BufferAttribute(positions, 3)), super(geometry, new LineBasicMaterial({
      color: color,
      toneMapped: !1
    })), this.object = object, this.type = "BoxHelper", this.matrixAutoUpdate = !1, this.update();
  }
  update() {
    if (void 0 !== this.object && dl.setFromObject(this.object), dl.isEmpty()) return;
    const min = dl.min,
      max = dl.max,
      position = this.geometry.attributes.position,
      array = position.array;
    array[0] = max.x, array[1] = max.y, array[2] = max.z, array[3] = min.x, array[4] = max.y, array[5] = max.z, array[6] = min.x, array[7] = min.y, array[8] = max.z, array[9] = max.x, array[10] = min.y, array[11] = max.z, array[12] = max.x, array[13] = max.y, array[14] = min.z, array[15] = min.x, array[16] = max.y, array[17] = min.z, array[18] = min.x, array[19] = min.y, array[20] = min.z, array[21] = max.x, array[22] = min.y, array[23] = min.z, position.needsUpdate = !0, this.geometry.computeBoundingSphere();
  }
  /**
   * Updates the wireframe box for the passed object.
   *
   * @param {Object3D} object - The 3D object to create the helper for.
   * @return {BoxHelper} A reference to this instance.
   */
  setFromObject(object) {
    return this.object = object, this.update(), this;
  }
  copy(source, recursive) {
    return super.copy(source, recursive), this.object = source.object, this;
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
/**
 * A helper object to visualize an instance of {@link Box3}.
 *
 * ```js
 * const box = new THREE.Box3();
 * box.setFromCenterAndSize( new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( 2, 1, 3 ) );
 *
 * const helper = new THREE.Box3Helper( box, 0xffff00 );
 * scene.add( helper )
 * ```
 *
 * @augments LineSegments
 */
class Box3Helper extends LineSegments {
  /* 8个±1立方角与12条边（24个Uint16索引），新 line材质默认黄且toneMapped=false；保存外部box引用并计算辅助几何sphere。构造不把box尺寸烘焙进顶点，后续更新通过变换呈现范围。 */
  constructor(box, t = 16776960) {
    const uint16Array = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]),
      bufferGeometry = new BufferGeometry();
    bufferGeometry.setIndex(new BufferAttribute(uint16Array, 1)), bufferGeometry.setAttribute("position", new Float32BufferAttribute([1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1], 3)), super(bufferGeometry, new LineBasicMaterial({
      color: t,
      toneMapped: !1
    })), this.box = box, this.type = "Box3Helper", this.geometry.computeBoundingSphere();
  }
  updateMatrixWorld(force) {
    const box = this.box;
    box.isEmpty() || (box.getCenter(this.position), box.getSize(this.scale), this.scale.multiplyScalar(.5), super.updateMatrixWorld(force));
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
/**
 * A helper object to visualize an instance of {@link Plane}.
 *
 * ```js
 * const plane = new THREE.Plane( new THREE.Vector3( 1, 1, 0.2 ), 3 );
 * const helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
 * scene.add( helper );
 * ```
 *
 * @augments Line
 */
class PlaneHelper extends Line {
  /* 保存外部plane与size，创建XY平面的轮廓/法线线段以及两三角填充子Mesh。填充同色opacity=.2、transparent=true、depthWrite=false，两个材质toneMapped=false，各几何算sphere。构造只建标准形状，后续方向/位置更新从plane取值。 */
  constructor(plane, size = 1, n = 16776960) {
    const r = n,
      bufferGeometry = new BufferGeometry();
    bufferGeometry.setAttribute("position", new Float32BufferAttribute([1, -1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], 3)), bufferGeometry.computeBoundingSphere(), super(bufferGeometry, new LineBasicMaterial({
      color: r,
      toneMapped: !1
    })), this.type = "PlaneHelper", this.plane = plane, this.size = size;
    const a = new BufferGeometry();
    a.setAttribute("position", new Float32BufferAttribute([1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], 3)), a.computeBoundingSphere(), this.add(new Mesh(a, new MeshBasicMaterial({
      color: r,
      opacity: .2,
      transparent: !0,
      depthWrite: !1,
      toneMapped: !1
    })));
  }
  updateMatrixWorld(force) {
    this.position.set(0, 0, 0), this.scale.set(.5 * this.size, .5 * this.size, 1), this.lookAt(this.plane.normal), this.translateZ(-this.plane.constant), super.updateMatrixWorld(force);
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose(), this.children[0].geometry.dispose(), this.children[0].material.dispose();
  }
}
const hl = new Vector3();
let pl, fl;
/**
 * An 3D arrow object for visualizing directions.
 *
 * ```js
 * const dir = new THREE.Vector3( 1, 2, 0 );
 *
 * //normalize the direction vector (convert to vector of length 1)
 * dir.normalize();
 *
 * const origin = new THREE.Vector3( 0, 0, 0 );
 * const length = 1;
 * const hex = 0xffff00;
 *
 * const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
 * scene.add( arrowHelper );
 * ```
 *
 * @augments Object3D
 */
class ArrowHelper extends Object3D {
  constructor(dir = new Vector3(0, 0, 1), origin = new Vector3(0, 0, 0), length = 1, color = 16776960, headLength = .2 * length, headWidth = .2 * headLength) {
    super(), this.type = "ArrowHelper", void 0 === pl && (pl = new BufferGeometry(), pl.setAttribute("position", new Float32BufferAttribute([0, 0, 0, 0, 1, 0], 3)), fl = new ConeGeometry(.5, 1, 5, 1), fl.translate(0, -.5, 0)), this.position.copy(origin), this.line = new Line(pl, new LineBasicMaterial({
      color: color,
      toneMapped: !1
    })), this.line.matrixAutoUpdate = !1, this.add(this.line), this.cone = new Mesh(fl, new MeshBasicMaterial({
      color: color,
      toneMapped: !1
    })), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(dir), this.setLength(length, headLength, headWidth);
  }
  setDirection(dir) {
    if (dir.y > .99999) this.quaternion.set(0, 0, 0, 1);else if (dir.y < -.99999) this.quaternion.set(1, 0, 0, 0);else {
      hl.set(dir.z, 0, -dir.x).normalize();
      const radians = Math.acos(dir.y);
      this.quaternion.setFromAxisAngle(hl, radians);
    }
  }
  setLength(length, headLength = .2 * length, headWidth = .2 * headLength) {
    this.line.scale.set(1, Math.max(1e-4, length - headLength), 1), this.line.updateMatrix(), this.cone.scale.set(headWidth, headLength, headWidth), this.cone.position.y = length, this.cone.updateMatrix();
  }
  /**
   * Sets the color of the helper.
   *
   * @param {number|Color|string} color - The color to set.
   */
  setColor(color) {
    this.line.material.color.set(color), this.cone.material.color.set(color);
  }
  copy(source) {
    return super.copy(source, !1), this.line.copy(source.line), this.cone.copy(source.cone), this;
  }
  dispose() {
    this.line.geometry.dispose(), this.line.material.dispose(), this.cone.geometry.dispose(), this.cone.material.dispose();
  }
}
/**
 * An axis object to visualize the 3 axes in a simple way.
 * The X axis is red. The Y axis is green. The Z axis is blue.
 *
 * ```js
 * const axesHelper = new THREE.AxesHelper( 5 );
 * scene.add( axesHelper );
 * ```
 *
 * @augments LineSegments
 */
class AxesHelper extends LineSegments {
  /* 三条从原点到+X/+Y/+Z、长度size的线，端点分别红到橙、绿到黄绿、蓝到青渐变；新position/color属性与vertexColors线材质、toneMapped=false。这里保留官方诊断图元色，不是新spacelibre产品表面或品牌资产。 */
  constructor(e = 1) {
    const t = [0, 0, 0, e, 0, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, 0, e],
      bufferGeometry = new BufferGeometry();
    bufferGeometry.setAttribute("position", new Float32BufferAttribute(t, 3)), bufferGeometry.setAttribute("color", new Float32BufferAttribute([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1], 3));
    super(bufferGeometry, new LineBasicMaterial({
      vertexColors: !0,
      toneMapped: !1
    })), this.type = "AxesHelper";
  }
  /**
   * Defines the colors of the axes helper.
   *
   * @param {number|Color|string} xAxisColor - The color for the x axis.
   * @param {number|Color|string} yAxisColor - The color for the y axis.
   * @param {number|Color|string} zAxisColor - The color for the z axis.
   * @return {AxesHelper} A reference to this axes helper.
   */
  setColors(xAxisColor, yAxisColor, zAxisColor) {
    const color = new Color(),
      array = this.geometry.attributes.color.array;
    return color.set(xAxisColor), color.toArray(array, 0), color.toArray(array, 3), color.set(yAxisColor), color.toArray(array, 6), color.toArray(array, 9), color.set(zAxisColor), color.toArray(array, 12), color.toArray(array, 15), this.geometry.attributes.color.needsUpdate = !0, this;
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
/**
 * This class is used to convert a series of paths to an array of
 * shapes. It is specifically used in context of fonts and SVG.
 */
class ShapePath {
  constructor() {
    this.type = "ShapePath", this.color = new Color(), this.subPaths = [], this.currentPath = null, this.userData = {};
  }
  /**
   * Creates a new path and moves it current point to the given one.
   *
   * @param {number} x - The x coordinate.
   * @param {number} y - The y coordinate.
   * @return {ShapePath} A reference to this shape path.
   */
  moveTo(x, y) {
    return this.currentPath = new Path(), this.subPaths.push(this.currentPath), this.currentPath.moveTo(x, y), this;
  }
  /**
   * Adds an instance of {@link LineCurve} to the path by connecting
   * the current point with the given one.
   *
   * @param {number} x - The x coordinate of the end point.
   * @param {number} y - The y coordinate of the end point.
   * @return {ShapePath} A reference to this shape path.
   */
  lineTo(x, y) {
    return this.currentPath.lineTo(x, y), this;
  }
  /**
   * Adds an instance of {@link QuadraticBezierCurve} to the path by connecting
   * the current point with the given one.
   *
   * @param {number} aCPx - The x coordinate of the control point.
   * @param {number} aCPy - The y coordinate of the control point.
   * @param {number} aX - The x coordinate of the end point.
   * @param {number} aY - The y coordinate of the end point.
   * @return {ShapePath} A reference to this shape path.
   */
  quadraticCurveTo(aCPx, aCPy, aX, aY) {
    return this.currentPath.quadraticCurveTo(aCPx, aCPy, aX, aY), this;
  }
  /**
   * Adds an instance of {@link CubicBezierCurve} to the path by connecting
   * the current point with the given one.
   *
   * @param {number} aCP1x - The x coordinate of the first control point.
   * @param {number} aCP1y - The y coordinate of the first control point.
   * @param {number} aCP2x - The x coordinate of the second control point.
   * @param {number} aCP2y - The y coordinate of the second control point.
   * @param {number} aX - The x coordinate of the end point.
   * @param {number} aY - The y coordinate of the end point.
   * @return {ShapePath} A reference to this shape path.
   */
  bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY) {
    return this.currentPath.bezierCurveTo(aCP1x, aCP1y, aCP2x, aCP2y, aX, aY), this;
  }
  /**
   * Adds an instance of {@link SplineCurve} to the path by connecting
   * the current point with the given list of points.
   *
   * @param {Array<Vector2>} pts - An array of points in 2D space.
   * @return {ShapePath} A reference to this shape path.
   */
  splineThru(pts) {
    return this.currentPath.splineThru(pts), this;
  }
  /* 按userData.style.fillRule选nonzero（累计绕数非0）或evenodd（奇偶），未知警告回退。每subPath取点，少于3或面积0跳过；计算Box2、内部点、面积绝对值与方向；面积降序后寻找最近包含轮廓，累计winding，填充状态未改变的边界exclude。内部点先试盒中心，不在内则取水平交点前两项中点，不是通用复杂自交面片布尔求解。 */
  toShapes() {
    function e(e, t) {
      let n = !1;
      const r = t.length;
      for (let i = 0, a = r - 1; i < r; a = i++) {
        const r = t[i],
          s = t[a];
        r.y > e.y != s.y > e.y && e.x < (s.x - r.x) * (e.y - r.y) / (s.y - r.y) + r.x && (n = !n);
      }
      return n;
    }
    function t(t, n) {
      const r = n.getCenter(new Vector2());
      if (e(r, t)) return r;
      const i = r.y,
        a = [],
        s = t.length;
      for (let e = 0; e < s; e++) {
        const n = t[e],
          r = t[(e + 1) % s];
        if (n.y > i != r.y > i) {
          const e = n.x + (i - n.y) * (r.x - n.x) / (r.y - n.y);
          a.push(e);
        }
      }
      return a.length > 1 && (a.sort((e, t) => e - t), r.x = (a[0] + a[1]) / 2), r;
    }
    let n = this.userData.style && this.userData.style.fillRule || "nonzero";
    "nonzero" !== n && "evenodd" !== n && (warn('Fill-rule "' + n + '" is not supported, falling back to "nonzero".'), n = "nonzero");
    const r = "nonzero" === n ? e => 0 !== e : e => !!(1 & e),
      i = [];
    for (const e of this.subPaths) {
      const n = e.getPoints();
      if (n.length < 3) continue;
      const r = ShapeUtils.area(n);
      if (0 === r) continue;
      const box2 = new Box2();
      for (let e = 0; e < n.length; e++) box2.expandByPoint(n[e]);
      i.push({
        subPath: e,
        points: n,
        boundingBox: box2,
        interiorPoint: t(n, box2),
        absArea: Math.abs(r),
        winding: r < 0 ? -1 : 1,
        container: null,
        exclude: !1,
        role: null
      });
    }
    i.sort((e, t) => t.absArea - e.absArea);
    for (let t = 0; t < i.length; t++) {
      const n = i[t];
      let a = 0;
      for (let r = t - 1; r >= 0; r--) {
        const t = i[r];
        if (t.boundingBox.containsBox(n.boundingBox) && e(n.interiorPoint, t.points)) {
          n.container = t.exclude ? t.container : t, a = t.winding, n.winding += a;
          break;
        }
      }
      r(n.winding) === r(a) && (n.exclude = !0);
    }
    for (const e of i) e.exclude || (e.role = null === e.container || "hole" === e.container.role ? "outer" : "hole");
    const a = [],
      map = new Map();
    for (const e of i) {
      if (e.exclude || "outer" !== e.role) continue;
      const shape = new Shape();
      shape.curves = e.subPath.curves, a.push(shape), map.set(e, shape);
    }
    for (const e of i) {
      if (e.exclude || "hole" !== e.role) continue;
      const t = map.get(e.container);
      if (!t) continue;
      const path = new Path();
      path.curves = e.subPath.curves, t.holes.push(path);
    }
    return a;
  }
}
/**
 * Abstract base class for controls.
 *
 * @abstract
 * @augments EventDispatcher
 */
class Controls extends EventDispatcher {
  /**
   * Constructs a new controls instance.
   *
   * @param {Object3D} object - The object that is managed by the controls.
   * @param {?HTMLElement} domElement - The HTML element used for event listeners.
   */
  constructor(object, domElement = null) {
    super(), this.object = object, this.domElement = domElement, this.enabled = !0, this.state = -1, this.keys = {}, this.mouseButtons = {
      LEFT: null,
      MIDDLE: null,
      RIGHT: null
    }, this.touches = {
      ONE: null,
      TWO: null
    };
  }
  /* undefined element只警告；有值时若旧domElement非null先disconnect，再存新元素。基类不安装事件监听器，也不限制元素具体DOM类型；返回undefined。 */
  connect(domElement) {
    void 0 !== domElement ? (null !== this.domElement && this.disconnect(), this.domElement = domElement) : warn("Controls: connect() now requires an element.");
  }
  disconnect() {}
  dispose() {}
  /**
   * Controls should implement this method if they have to update their internal state
   * per simulation step.
   *
   * @param {number} [delta] - The time delta in seconds.
   */
  update() {}
}
/* 人工身份合同：纹理格式宽高块计数和字节数分派。该角色由两版官方声明/调用交叉核对，整函数结构尚不匹配；仅恢复模块函数名，不冒认内部局部原名。 */
function getByteLength(e, t, n, r) {
  const i = function (e) {
    switch (e) {
      case UnsignedByteType:
      case ByteType:
        return {
          byteLength: 1,
          components: 1
        };
      case UnsignedShortType:
      case ShortType:
      case HalfFloatType:
        return {
          byteLength: 2,
          components: 1
        };
      case UnsignedShort4444Type:
      case UnsignedShort5551Type:
        return {
          byteLength: 2,
          components: 4
        };
      case UnsignedIntType:
      case IntType:
      case FloatType:
        return {
          byteLength: 4,
          components: 1
        };
      case UnsignedInt5999Type:
      case UnsignedInt101111Type:
        return {
          byteLength: 4,
          components: 3
        };
    }
    throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`);
  }(r);
  switch (n) {
    case AlphaFormat:
      return e * t;
    case RedFormat:
    case RedIntegerFormat:
      return e * t / i.components * i.byteLength;
    case RGFormat:
    case RGIntegerFormat:
      return e * t * 2 / i.components * i.byteLength;
    case RGBFormat:
      return e * t * 3 / i.components * i.byteLength;
    case RGBAFormat:
    case RGBAIntegerFormat:
      return e * t * 4 / i.components * i.byteLength;
    case RGB_S3TC_DXT1_Format:
    case RGBA_S3TC_DXT1_Format:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case RGBA_S3TC_DXT3_Format:
    case RGBA_S3TC_DXT5_Format:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case RGB_PVRTC_2BPPV1_Format:
    case RGBA_PVRTC_2BPPV1_Format:
      return Math.max(e, 16) * Math.max(t, 8) / 4;
    case RGB_PVRTC_4BPPV1_Format:
    case RGBA_PVRTC_4BPPV1_Format:
      return Math.max(e, 8) * Math.max(t, 8) / 2;
    case RGB_ETC1_Format:
    case RGB_ETC2_Format:
    case R11_EAC_Format:
    case SIGNED_R11_EAC_Format:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case RGBA_ETC2_EAC_Format:
    case RG11_EAC_Format:
    case SIGNED_RG11_EAC_Format:
    case RGBA_ASTC_4x4_Format:
      return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case RGBA_ASTC_5x4_Format:
      return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case RGBA_ASTC_5x5_Format:
      return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case RGBA_ASTC_6x5_Format:
      return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case RGBA_ASTC_6x6_Format:
      return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case RGBA_ASTC_8x5_Format:
      return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case RGBA_ASTC_8x6_Format:
      return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case RGBA_ASTC_8x8_Format:
      return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case RGBA_ASTC_10x5_Format:
      return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case RGBA_ASTC_10x6_Format:
      return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case RGBA_ASTC_10x8_Format:
      return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case RGBA_ASTC_10x10_Format:
      return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case RGBA_ASTC_12x10_Format:
      return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case RGBA_ASTC_12x12_Format:
      return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case RGBA_BPTC_Format:
    case RGB_BPTC_SIGNED_Format:
    case RGB_BPTC_UNSIGNED_Format:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
    case RED_RGTC1_Format:
    case SIGNED_RED_RGTC1_Format:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
    case RED_GREEN_RGTC2_Format:
    case SIGNED_RED_GREEN_RGTC2_Format:
      return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(`Unable to determine texture byte length for ${n} format.`);
}
/**
 * A class containing utility functions for textures.
 *
 * @hideconstructor
 */
class TextureUtils {
  /* 图像有width时取width/height，否则图像比例1；与目标aspect比，调整repeat使一轴=1、另一轴>=1，offset=(1-repeat)/2居中，完整图像落入框内且边缘由wrapping行为决定。修改同一Texture的repeat/offset并返回，不生成新像素、不改wrap。 */
  static contain(e, t) {
    return function (e, t) {
      const n = e.image && e.image.width ? e.image.width / e.image.height : 1;
      return n > t ? (e.repeat.x = 1, e.repeat.y = n / t, e.offset.x = 0, e.offset.y = (1 - e.repeat.y) / 2) : (e.repeat.x = t / n, e.repeat.y = 1, e.offset.x = (1 - e.repeat.x) / 2, e.offset.y = 0), e;
    }(e, t);
  }
  /* 同一比例比较，但将裁剪轴repeat设为<=1，offset居中，让框被图覆盖并裁掉超出部分。原位返回texture；没有非正aspect或image.height=0保护。 */
  static cover(e, t) {
    return function (e, t) {
      const n = e.image && e.image.width ? e.image.width / e.image.height : 1;
      return n > t ? (e.repeat.x = t / n, e.repeat.y = 1, e.offset.x = (1 - e.repeat.x) / 2, e.offset.y = 0) : (e.repeat.x = 1, e.repeat.y = n / t, e.offset.x = 0, e.offset.y = (1 - e.repeat.y) / 2), e;
    }(e, t);
  }
  /* 把repeat=(1,1)、offset=(0,0)，返回同纹理；不改center/rotation/matrix，也不主动updateMatrix，因此称为“清除所有纹理变换”不准确。 */
  static fill(e) {
    return function (e) {
      return e.repeat.x = 1, e.repeat.y = 1, e.offset.x = 0, e.offset.y = 0, e;
    }(e);
  }
  /**
   * Determines how many bytes must be used to represent the texture.
   *
   * @param {number} width - The width of the texture.
   * @param {number} height - The height of the texture.
   * @param {number} format - The texture's format.
   * @param {number} type - The texture's type.
   * @return {number} The byte length.
   */
  static getByteLength(width, height, format, type) {
    return getByteLength(width, height, format, type);
  }
}
"undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", {
  detail: {
    revision: REVISION
  }
})), "undefined" != typeof window && (window.__THREE__ ? warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = REVISION);
export { ACESFilmicToneMapping };
export { AddEquation };
export { AddOperation };
export { AdditiveAnimationBlendMode };
export { AdditiveBlending };
export { AgXToneMapping };
export { AlphaFormat };
export { AlwaysCompare };
export { AlwaysDepth };
export { AlwaysStencilFunc };
export { AmbientLight };
export { AnimationAction };
export { AnimationClip };
export { AnimationLoader };
export { AnimationMixer };
export { AnimationObjectGroup };
export { AnimationUtils };
export { ArcCurve };
export { ArrayCamera };
export { ArrowHelper };
export { AttachedBindMode };
export { Audio };
export { AudioAnalyser };
export { AudioContext };
export { AudioListener };
export { AudioLoader };
export { AxesHelper };
export { BackSide };
export { BasicDepthPacking };
export { BasicShadowMap };
export { BatchedMesh };
export { BezierInterpolant };
export { Bone };
export { BooleanKeyframeTrack };
export { Box2 };
export { Box3 };
export { Box3Helper };
export { BoxGeometry };
export { BoxHelper };
export { BufferAttribute };
export { BufferGeometry };
export { BufferGeometryLoader };
export { ByteType };
export { Cache };
export { Camera };
export { CameraHelper };
export { CanvasTexture };
export { CapsuleGeometry };
export { CatmullRomCurve3 };
export { CineonToneMapping };
export { CircleGeometry };
export { ClampToEdgeWrapping };
export { Clock };
export { Color };
export { ColorKeyframeTrack };
export { ColorManagement };
export { Compatibility };
export { CompressedArrayTexture };
export { CompressedCubeTexture };
export { CompressedTexture };
export { CompressedTextureLoader };
export { ConeGeometry };
export { ConstantAlphaFactor };
export { ConstantColorFactor };
export { Controls };
export { CubeCamera };
export { CubeDepthTexture };
export { CubeReflectionMapping };
export { CubeRefractionMapping };
export { CubeTexture };
export { CubeTextureLoader };
export { CubeUVReflectionMapping };
export { CubicBezierCurve };
export { CubicBezierCurve3 };
export { CubicInterpolant };
export { CullFaceBack };
export { CullFaceFront };
export { CullFaceFrontBack };
export { CullFaceNone };
export { Curve };
export { CurvePath };
export { CustomBlending };
export { CustomToneMapping };
export { CylinderGeometry };
export { Cylindrical };
export { Data3DTexture };
export { DataArrayTexture };
export { DataTexture };
export { DataTextureLoader };
export { DataUtils };
export { DecrementStencilOp };
export { DecrementWrapStencilOp };
export { DefaultLoadingManager };
export { DepthFormat };
export { DepthStencilFormat };
export { DepthTexture };
export { DetachedBindMode };
export { DirectionalLight };
export { DirectionalLightHelper };
export { DiscreteInterpolant };
export { DodecahedronGeometry };
export { DoubleSide };
export { DstAlphaFactor };
export { DstColorFactor };
export { DynamicCopyUsage };
export { DynamicDrawUsage };
export { DynamicReadUsage };
export { EdgesGeometry };
export { EllipseCurve };
export { EqualCompare };
export { EqualDepth };
export { EqualStencilFunc };
export { EquirectangularReflectionMapping };
export { EquirectangularRefractionMapping };
export { Euler };
export { EventDispatcher };
export { ExternalTexture };
export { ExtrudeGeometry };
export { FileLoader };
export { Float16BufferAttribute };
export { Float32BufferAttribute };
export { FloatType };
export { Fog };
export { FogExp2 };
export { FramebufferTexture };
export { FrontSide };
export { Frustum };
export { FrustumArray };
export { GLBufferAttribute };
export { GLSL1 };
export { GLSL3 };
export { GreaterCompare };
export { GreaterDepth };
export { GreaterEqualCompare };
export { GreaterEqualDepth };
export { GreaterEqualStencilFunc };
export { GreaterStencilFunc };
export { GridHelper };
export { Group };
export { HTMLTexture };
export { HalfFloatType };
export { HemisphereLight };
export { HemisphereLightHelper };
export { IcosahedronGeometry };
export { ImageBitmapLoader };
export { ImageLoader };
export { ImageUtils };
export { IncrementStencilOp };
export { IncrementWrapStencilOp };
export { InstancedBufferAttribute };
export { InstancedBufferGeometry };
export { InstancedInterleavedBuffer };
export { InstancedMesh };
export { Int16BufferAttribute };
export { Int32BufferAttribute };
export { Int8BufferAttribute };
export { IntType };
export { InterleavedBuffer };
export { InterleavedBufferAttribute };
export { Interpolant };
export { InterpolateBezier };
export { InterpolateDiscrete };
export { InterpolateLinear };
export { InterpolateSmooth };
export { InterpolationSamplingMode };
export { InterpolationSamplingType };
export { InvertStencilOp };
export { KeepStencilOp };
export { KeyframeTrack };
export { LOD };
export { LatheGeometry };
export { Layers };
export { LessCompare };
export { LessDepth };
export { LessEqualCompare };
export { LessEqualDepth };
export { LessEqualStencilFunc };
export { LessStencilFunc };
export { Light };
export { LightProbe };
export { Line };
export { Line3 };
export { LineBasicMaterial };
export { LineCurve };
export { LineCurve3 };
export { LineDashedMaterial };
export { LineLoop };
export { LineSegments };
export { LinearFilter };
export { LinearInterpolant };
export { LinearMipMapLinearFilter };
export { LinearMipMapNearestFilter };
export { LinearMipmapLinearFilter };
export { LinearMipmapNearestFilter };
export { LinearSRGBColorSpace };
export { LinearToneMapping };
export { LinearTransfer };
export { Loader };
export { LoaderUtils };
export { LoadingManager };
export { LoopOnce };
export { LoopPingPong };
export { LoopRepeat };
export { MOUSE };
export { Material };
export { MaterialBlending };
export { MaterialLoader };
export { MathUtils };
export { Matrix2 };
export { Matrix3 };
export { Matrix4 };
export { MaxEquation };
export { Mesh };
export { MeshBasicMaterial };
export { MeshDepthMaterial };
export { MeshDistanceMaterial };
export { MeshLambertMaterial };
export { MeshMatcapMaterial };
export { MeshNormalMaterial };
export { MeshPhongMaterial };
export { MeshPhysicalMaterial };
export { MeshStandardMaterial };
export { MeshToonMaterial };
export { MinEquation };
export { MirroredRepeatWrapping };
export { MixOperation };
export { MultiplyBlending };
export { MultiplyOperation };
export { NearestFilter };
export { NearestMipMapLinearFilter };
export { NearestMipMapNearestFilter };
export { NearestMipmapLinearFilter };
export { NearestMipmapNearestFilter };
export { NeutralToneMapping };
export { NeverCompare };
export { NeverDepth };
export { NeverStencilFunc };
export { NoBlending };
export { NoColorSpace };
export { NoNormalPacking };
export { NoToneMapping };
export { NormalAnimationBlendMode };
export { NormalBlending };
export { NormalGAPacking };
export { NormalRGPacking };
export { NotEqualCompare };
export { NotEqualDepth };
export { NotEqualStencilFunc };
export { NumberKeyframeTrack };
export { Object3D };
export { ObjectLoader };
export { ObjectSpaceNormalMap };
export { OctahedronGeometry };
export { OneFactor };
export { OneMinusConstantAlphaFactor };
export { OneMinusConstantColorFactor };
export { OneMinusDstAlphaFactor };
export { OneMinusDstColorFactor };
export { OneMinusSrcAlphaFactor };
export { OneMinusSrcColorFactor };
export { OrthographicCamera };
export { PCFShadowMap };
export { PCFSoftShadowMap };
export { Path };
export { PerspectiveCamera };
export { Plane };
export { PlaneGeometry };
export { PlaneHelper };
export { PointLight };
export { PointLightHelper };
export { Points };
export { PointsMaterial };
export { PolarGridHelper };
export { PolyhedronGeometry };
export { PositionalAudio };
export { PropertyBinding };
export { PropertyMixer };
export { QuadraticBezierCurve };
export { QuadraticBezierCurve3 };
export { Quaternion };
export { QuaternionKeyframeTrack };
export { QuaternionLinearInterpolant };
export { R11_EAC_Format };
export { RAD2DEG };
export { RED_GREEN_RGTC2_Format };
export { RED_RGTC1_Format };
export { REVISION };
export { RG11_EAC_Format };
export { RGBADepthPacking };
export { RGBAFormat };
export { RGBAIntegerFormat };
export { RGBA_ASTC_10x10_Format };
export { RGBA_ASTC_10x5_Format };
export { RGBA_ASTC_10x6_Format };
export { RGBA_ASTC_10x8_Format };
export { RGBA_ASTC_12x10_Format };
export { RGBA_ASTC_12x12_Format };
export { RGBA_ASTC_4x4_Format };
export { RGBA_ASTC_5x4_Format };
export { RGBA_ASTC_5x5_Format };
export { RGBA_ASTC_6x5_Format };
export { RGBA_ASTC_6x6_Format };
export { RGBA_ASTC_8x5_Format };
export { RGBA_ASTC_8x6_Format };
export { RGBA_ASTC_8x8_Format };
export { RGBA_BPTC_Format };
export { RGBA_ETC2_EAC_Format };
export { RGBA_PVRTC_2BPPV1_Format };
export { RGBA_PVRTC_4BPPV1_Format };
export { RGBA_S3TC_DXT1_Format };
export { RGBA_S3TC_DXT3_Format };
export { RGBA_S3TC_DXT5_Format };
export { RGBDepthPacking };
export { RGBFormat };
export { RGBIntegerFormat };
export { RGB_BPTC_SIGNED_Format };
export { RGB_BPTC_UNSIGNED_Format };
export { RGB_ETC1_Format };
export { RGB_ETC2_Format };
export { RGB_PVRTC_2BPPV1_Format };
export { RGB_PVRTC_4BPPV1_Format };
export { RGB_S3TC_DXT1_Format };
export { RGDepthPacking };
export { RGFormat };
export { RGIntegerFormat };
export { RawShaderMaterial };
export { Ray };
export { Raycaster };
export { RectAreaLight };
export { RedFormat };
export { RedIntegerFormat };
export { ReinhardToneMapping };
export { RenderTarget };
export { RenderTarget3D };
export { RepeatWrapping };
export { ReplaceStencilOp };
export { ReverseSubtractEquation };
export { ReversedDepthFuncs };
export { RingGeometry };
export { SIGNED_R11_EAC_Format };
export { SIGNED_RED_GREEN_RGTC2_Format };
export { SIGNED_RED_RGTC1_Format };
export { SIGNED_RG11_EAC_Format };
export { SRGBColorSpace };
export { SRGBTransfer };
export { Scene };
export { ShaderMaterial };
export { ShadowMaterial };
export { Shape };
export { ShapeGeometry };
export { ShapePath };
export { ShapeUtils };
export { ShortType };
export { Skeleton };
export { SkeletonHelper };
export { SkinnedMesh };
export { Source };
export { Sphere };
export { SphereGeometry };
export { Spherical };
export { SphericalHarmonics3 };
export { SplineCurve };
export { SpotLight };
export { SpotLightHelper };
export { Sprite };
export { SpriteMaterial };
export { SrcAlphaFactor };
export { SrcAlphaSaturateFactor };
export { SrcColorFactor };
export { StaticCopyUsage };
export { StaticDrawUsage };
export { StaticReadUsage };
export { StereoCamera };
export { StreamCopyUsage };
export { StreamDrawUsage };
export { StreamReadUsage };
export { StringKeyframeTrack };
export { SubtractEquation };
export { SubtractiveBlending };
export { TOUCH };
export { TangentSpaceNormalMap };
export { TetrahedronGeometry };
export { Texture };
export { TextureLoader };
export { TextureUtils };
export { Timer };
export { TimestampQuery };
export { TorusGeometry };
export { TorusKnotGeometry };
export { Triangle };
export { TriangleFanDrawMode };
export { TriangleStripDrawMode };
export { TrianglesDrawMode };
export { TubeGeometry };
export { UVMapping };
export { Uint16BufferAttribute };
export { Uint32BufferAttribute };
export { Uint8BufferAttribute };
export { Uint8ClampedBufferAttribute };
export { Uniform };
export { UniformsGroup };
export { UniformsUtils };
export { UnsignedByteType };
export { UnsignedInt101111Type };
export { UnsignedInt248Type };
export { UnsignedInt5999Type };
export { UnsignedIntType };
export { UnsignedShort4444Type };
export { UnsignedShort5551Type };
export { UnsignedShortType };
export { VSMShadowMap };
export { Vector2 };
export { Vector3 };
export { Vector4 };
export { VectorKeyframeTrack };
export { VideoFrameTexture };
export { VideoTexture };
export { WebGL3DRenderTarget };
export { WebGLArrayRenderTarget };
export { WebGLCoordinateSystem };
export { WebGLRenderTarget };
export { WebGPUCoordinateSystem };
export { WebXRController };
export { WireframeGeometry };
export { WrapAroundEnding };
export { ZeroCurvatureEnding };
export { ZeroFactor };
export { ZeroSlopeEnding };
export { ZeroStencilOp };
export { cloneUniforms };
export { createCanvasElement };
export { createElementNS };
export { error };
export { getByteLength };
export { getConsoleFunction };
export { getUnlitUniformColorSpace };
export { isTypedArray };
export { log };
export { mergeUniforms };
export { probeAsync };
export { setConsoleFunction };
export { warn };
export { warnOnce };
export { yieldToMain };
