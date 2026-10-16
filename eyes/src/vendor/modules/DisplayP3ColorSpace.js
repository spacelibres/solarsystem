// Recovered from vendors.js:876316-877927.
import * as ThreeCore from "../three/core.js";
const i = [.68, .32, .265, .69, .15, .06],
  a = [.2289, .6917, .0793],
  s = [.3127, .329],
  o = new ThreeCore.Matrix3().set(.4865709, .2656677, .1982173, .2289746, .6917385, .0792869, 0, .0451134, 1.0439444),
  c = new ThreeCore.Matrix3().set(2.4934969, -.9313836, -.4027108, -.829489, 1.7626641, .0236247, .0358458, -.0761724, .9568845),
  DisplayP3ColorSpace = "display-p3",
  LinearDisplayP3ColorSpace = "display-p3-linear",
  DisplayP3ColorSpaceImpl = {
    primaries: i,
    whitePoint: s,
    transfer: ThreeCore.SRGBTransfer,
    toXYZ: o,
    fromXYZ: c,
    luminanceCoefficients: a,
    outputColorSpaceConfig: {
      drawingBufferColorSpace: DisplayP3ColorSpace
    }
  },
  LinearDisplayP3ColorSpaceImpl = {
    primaries: i,
    whitePoint: s,
    transfer: ThreeCore.LinearTransfer,
    toXYZ: o,
    fromXYZ: c,
    luminanceCoefficients: a,
    workingColorSpaceConfig: {
      unpackColorSpace: DisplayP3ColorSpace
    },
    outputColorSpaceConfig: {
      drawingBufferColorSpace: DisplayP3ColorSpace
    }
  },
  p = new ThreeCore.Matrix3().set(.636958, .1446169, .168881, .2627002, .6779981, .0593017, 0, .0280727, 1.0609851),
  f = new ThreeCore.Matrix3().set(1.7166512, -.3556708, -.2533663, -.6666844, 1.6164812, .0157685, .0176399, -.0427706, .9421031),
  LinearRec2020ColorSpace = "rec2020-linear",
  LinearRec2020ColorSpaceImpl = {
    primaries: [.708, .292, .17, .797, .131, .046],
    whitePoint: s,
    transfer: ThreeCore.LinearTransfer,
    toXYZ: p,
    fromXYZ: f,
    luminanceCoefficients: [.2627, .678, .0593]
  },
  ExtendedSRGBColorSpace = "extended-srgb",
  ExtendedSRGBColorSpaceImpl = {
    ...ThreeCore.ColorManagement.spaces[ThreeCore.SRGBColorSpace],
    outputColorSpaceConfig: {
      drawingBufferColorSpace: ThreeCore.SRGBColorSpace,
      toneMappingMode: "extended"
    }
  };
export { DisplayP3ColorSpace };
export { DisplayP3ColorSpaceImpl };
export { ExtendedSRGBColorSpace };
export { ExtendedSRGBColorSpaceImpl };
export { LinearDisplayP3ColorSpace };
export { LinearDisplayP3ColorSpaceImpl };
export { LinearRec2020ColorSpace };
export { LinearRec2020ColorSpaceImpl };
