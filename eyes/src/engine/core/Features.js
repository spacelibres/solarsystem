// Recovered from app.js:715579-719508.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
class Features {
  static setEnabled(t, e, i, s) {
    const n = Features.entityFeatureSetEnabledMap[e];
    if (void 0 === n) throw new Error(`Attempted to access unavailable feature ${i} for ${e}.`);
    const o = n[i];
    if (void 0 === o) throw new Error(`Attempted to access unavailable feature ${i} for ${e}.`);
    o(t, s);
  }
  static isEnabled(t, e, i) {
    const s = Features.entityFeatureIsEnabledMap[e];
    if (void 0 === s) throw new Error(`Attempted to access unavailable feature ${i} for ${e}.`);
    const n = s[i];
    if (void 0 === n) throw new Error(`Attempted to access unavailable feature ${i} for ${e}.`);
    return n(t);
  }
  static setEnabledJupiterAuroras(t, e) {
    if (e) Features._createJupiterModelComponent(t, "auroras", "auroras");else {
      const e = t.getEntity("jupiter");
      e && e.removeComponent("auroras");
    }
  }
  static isEnabledJupiterAuroras(t) {
    const e = t.getEntity("jupiter");
    return !!e && null !== e.getComponent(Pioneer.ModelComponent, "auroras");
  }
  static setEnabledJupiterMagnetosphere(t, e) {
    if (e) Features._createJupiterModelComponent(t, "magnetosphere", "magnetosphere");else {
      const e = t.getEntity("jupiter");
      e && e.removeComponent("magnetosphere");
    }
  }
  static isEnabledJupiterMagnetosphere(t) {
    const e = t.getEntity("jupiter");
    return !!e && null !== e.getComponent(Pioneer.ModelComponent, "magnetosphere");
  }
  static setEnabledJupiterRadiationBelt(t, e) {
    if (e) for (let e = 1; e <= 4; e++) Features._createJupiterModelComponent(t, `radiation_belt_${e}`, `radbelt${e}`);else {
      const e = t.getEntity("jupiter");
      if (e) for (let t = 1; t <= 4; t++) e.removeComponent(`radiation_belt_${t}`);
    }
  }
  static isEnabledJupiterRadiationBelt(t) {
    const e = t.getEntity("jupiter");
    if (!e) return false;
    for (let t = 1; t <= 4; t++) if (null === e.getComponent(Pioneer.ModelComponent, `radiation_belt_${t}`)) return false;
    return true;
  }
  static setEnabledSaturnMagnetosphere(t, e) {
    e ? Entity.Entity.createFromOptions("saturn_magnetosphere", {
      radius: 5027500,
      parents: [[Number.NEGATIVE_INFINITY, "saturn"]],
      model: {
        url: "$STATIC_ASSETS_URL/models/saturn/magnetosphere/saturn_magnetosphere.gltf",
        scale: 1078.27002124,
        rotate: [{
          x: 90
        }]
      },
      controllers: [{
        type: "fixed",
        position: Pioneer.Vector3.Zero
      }, {
        type: "align",
        primary: {
          type: "align",
          target: "saturn",
          axis: Pioneer.Vector3.ZAxis,
          targetAxis: Pioneer.Vector3.ZAxis
        },
        secondary: {
          type: "point",
          target: "sun",
          axis: Pioneer.Vector3.XAxis
        }
      }],
      postCreateFunction: t => {
        t.setCanOcclude(false);
        const e = t.addComponent(Pioneer.ModelComponent);
        e.setUrl("$STATIC_ASSETS_URL/models/saturn/magnetosphere_thin/saturn_magnetosphere_thin.gltf");
        e.setScale(1078.27002124);
        e.setRotation(new Pioneer.Quaternion(Math.sqrt(.5), Math.sqrt(.5), 0, 0));
        e.setVisibleInterval(new Pioneer.VisibleInterval(4e3, Number.POSITIVE_INFINITY));
        e.setResourcesLoadedCallback(() => {
          e.getThreeJsObjects().length > 0 && (e.getThreeJsObjects()[0].renderOrder = -1);
        });
        const i = t.getComponent(Pioneer.ModelComponent);
        i && (i.setVisibleInterval(new Pioneer.VisibleInterval(0, 4e3)), i.setResourcesLoadedCallback(() => {
          i.getThreeJsObjects().length > 0 && (i.getThreeJsObjects()[0].renderOrder = -1);
        }));
      }
    }, t) : t.removeEntity("saturn_magnetosphere");
  }
  static isEnabledSaturnMagnetosphere(t) {
    return null !== t.getEntity("saturn_magnetosphere");
  }
  static _createJupiterModelComponent(t, e, i) {
    const n = t.getEntity("jupiter");
    if (!n) throw new Error("The entity jupiter is not found.");
    const o = n.addComponent(Pioneer.ModelComponent, e);
    o.setUrl(`$STATIC_ASSETS_URL/models/jupiter/${e}/jupiter_${i}.gltf`);
    o.setScale(1337.08);
    const quaternion = new Pioneer.Quaternion(Math.SQRT1_2, Math.SQRT1_2, 0, 0);
    const a = new Pioneer.Quaternion(Math.SQRT1_2, 0, 0, Math.SQRT1_2);
    quaternion.mult(a, quaternion);
    o.setRotation(quaternion);
  }
  static entityFeatureSetEnabledMap = {
    jupiter: {
      auroras: Features.setEnabledJupiterAuroras,
      magnetosphere: Features.setEnabledJupiterMagnetosphere,
      radiationBelt: Features.setEnabledJupiterRadiationBelt
    },
    saturn: {
      magnetosphere: Features.setEnabledSaturnMagnetosphere
    }
  };
  static entityFeatureIsEnabledMap = {
    jupiter: {
      auroras: Features.isEnabledJupiterAuroras,
      magnetosphere: Features.isEnabledJupiterMagnetosphere,
      radiationBelt: Features.isEnabledJupiterRadiationBelt
    },
    saturn: {
      magnetosphere: Features.isEnabledSaturnMagnetosphere
    }
  };
}
export { Features };
