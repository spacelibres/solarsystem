// Recovered from app.js:73142-74233.
import * as PioneerPublicApi from "../pioneer/public-api.js";
/** 按绝对值最大分量选择面；并列时后遍历面覆盖前者。返回 x/y 为面 UV，z 为面号，面基是固定共享轴引用。 */
class CubeMap {
  static xyzToUVFace(uvFaceOut, direction, faceFrames = CubeMap.defaultCubeMapFaceFrames) {
    let selectedFrame;
    for (let faceIndex = 0; faceIndex < 6; faceIndex++) {
      const faceFrame = faceFrames[faceIndex];
      const faceNormal = faceFrame[2];
      let dominantComponent;
      let secondaryComponent;
      let tertiaryComponent;
      let negativeFace;
      if (faceNormal === PioneerPublicApi.Vector3.XAxis || faceNormal === PioneerPublicApi.Vector3.XAxisNeg) {
        dominantComponent = direction.x;
        secondaryComponent = direction.y;
        tertiaryComponent = direction.z;
        negativeFace = faceNormal === PioneerPublicApi.Vector3.XAxisNeg;
      } else {
        if (faceNormal === PioneerPublicApi.Vector3.YAxis || faceNormal === PioneerPublicApi.Vector3.YAxisNeg) {
          dominantComponent = direction.y;
          secondaryComponent = direction.z;
          tertiaryComponent = direction.x;
          negativeFace = faceNormal === PioneerPublicApi.Vector3.YAxisNeg;
        } else {
          dominantComponent = direction.z;
          secondaryComponent = direction.x;
          tertiaryComponent = direction.y;
          negativeFace = faceNormal === PioneerPublicApi.Vector3.ZAxisNeg;
        }
      }
      if (Math.abs(dominantComponent) >= Math.abs(secondaryComponent) && Math.abs(dominantComponent) >= Math.abs(tertiaryComponent) && (dominantComponent >= 0 && !negativeFace || dominantComponent < 0 && negativeFace)) {
        selectedFrame = faceFrame;
        uvFaceOut.z = faceIndex;
      }
    }
    if (void 0 === selectedFrame) return void uvFaceOut.set(NaN, NaN, NaN);
    let normalProjection = selectedFrame[2].x * direction.x + selectedFrame[2].y * direction.y + selectedFrame[2].z * direction.z;
    if (normalProjection < 0) {
      normalProjection = 1;
    }
    uvFaceOut.x = (selectedFrame[0].x * direction.x + selectedFrame[0].y * direction.y + selectedFrame[0].z * direction.z) / normalProjection;
    uvFaceOut.y = (selectedFrame[1].x * direction.x + selectedFrame[1].y * direction.y + selectedFrame[1].z * direction.z) / normalProjection;
    uvFaceOut.x = .5 * (uvFaceOut.x + 1);
    uvFaceOut.y = .5 * (uvFaceOut.y + 1);
  }
  static defaultCubeMapFaceFrames = [[PioneerPublicApi.Vector3.YAxis, PioneerPublicApi.Vector3.ZAxis, PioneerPublicApi.Vector3.XAxis], [PioneerPublicApi.Vector3.XAxisNeg, PioneerPublicApi.Vector3.ZAxis, PioneerPublicApi.Vector3.YAxis], [PioneerPublicApi.Vector3.YAxisNeg, PioneerPublicApi.Vector3.ZAxis, PioneerPublicApi.Vector3.XAxisNeg], [PioneerPublicApi.Vector3.XAxis, PioneerPublicApi.Vector3.ZAxis, PioneerPublicApi.Vector3.YAxisNeg], [PioneerPublicApi.Vector3.YAxis, PioneerPublicApi.Vector3.XAxisNeg, PioneerPublicApi.Vector3.ZAxis], [PioneerPublicApi.Vector3.YAxis, PioneerPublicApi.Vector3.XAxis, PioneerPublicApi.Vector3.ZAxisNeg]];
}
export { CubeMap };
