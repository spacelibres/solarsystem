/** @eyes-analysis
 * 文件职责：创建行星/实体附加可视特征及其配置。
 * 依据：import ../pioneer/index.js；import ./Entity-567.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:715579-719508.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
/** @eyes-analysis
 * 类职责：创建行星/实体附加可视特征及其配置。
 * 继承：无显式父类；导出：Features。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class Features {
  /** @eyes-analysis
   * 【结构证据】调用 `new Error`、`o`；含显式错误分支。
   * 调用线索：new Error、o。
   */
  static setEnabled(t, e, i, s) {
    const n = Features.entityFeatureSetEnabledMap[e];
    if (void 0 === n) throw new Error(`Attempted to access unavailable feature ${i} for ${e}.`);
    const o = n[i];
    if (void 0 === o) throw new Error(`Attempted to access unavailable feature ${i} for ${e}.`);
    o(t, s);
  }
  /** @eyes-analysis
   * 【结构证据】返回 `n(t)`；调用 `n`、`new Error`；含显式错误分支。
   * 调用线索：n、new Error。
   */
  static isEnabled(t, e, i) {
    const s = Features.entityFeatureIsEnabledMap[e];
    if (void 0 === s) throw new Error(`Attempted to access unavailable feature ${i} for ${e}.`);
    const n = s[i];
    if (void 0 === n) throw new Error(`Attempted to access unavailable feature ${i} for ${e}.`);
    return n(t);
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Features._createJupiterModelComponent`、`e.removeComponent`、`t.getEntity`。
   * 调用线索：Features._createJupiterModelComponent、e.removeComponent、t.getEntity。
   */
  static setEnabledJupiterAuroras(t, e) {
    if (e) Features._createJupiterModelComponent(t, "auroras", "auroras");else {
      const e = t.getEntity("jupiter");
      e && e.removeComponent("auroras");
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `!!e&&null!==e.getComponent(Pioneer.ModelComponent,"auroras")`；调用 `e.getComponent`、`t.getEntity`。
   * 调用线索：e.getComponent、t.getEntity。
   */
  static isEnabledJupiterAuroras(t) {
    const e = t.getEntity("jupiter");
    return !!e && null !== e.getComponent(Pioneer.ModelComponent, "auroras");
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Features._createJupiterModelComponent`、`e.removeComponent`、`t.getEntity`。
   * 调用线索：Features._createJupiterModelComponent、e.removeComponent、t.getEntity。
   */
  static setEnabledJupiterMagnetosphere(t, e) {
    if (e) Features._createJupiterModelComponent(t, "magnetosphere", "magnetosphere");else {
      const e = t.getEntity("jupiter");
      e && e.removeComponent("magnetosphere");
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `!!e&&null!==e.getComponent(Pioneer.ModelComponent,"magnetosphere")`；调用 `e.getComponent`、`t.getEntity`。
   * 调用线索：e.getComponent、t.getEntity。
   */
  static isEnabledJupiterMagnetosphere(t) {
    const e = t.getEntity("jupiter");
    return !!e && null !== e.getComponent(Pioneer.ModelComponent, "magnetosphere");
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Features._createJupiterModelComponent`、`e.removeComponent`、`t.getEntity`。
   * 调用线索：Features._createJupiterModelComponent、e.removeComponent、t.getEntity。
   */
  static setEnabledJupiterRadiationBelt(t, e) {
    if (e) for (let e = 1; e <= 4; e++) Features._createJupiterModelComponent(t, `radiation_belt_${e}`, `radbelt${e}`);else {
      const e = t.getEntity("jupiter");
      if (e) for (let t = 1; t <= 4; t++) e.removeComponent(`radiation_belt_${t}`);
    }
  }
  /** @eyes-analysis
   * 【结构证据】返回 `false` 或 `true`；调用 `e.getComponent`、`t.getEntity`。
   * 调用线索：e.getComponent、t.getEntity。
   */
  static isEnabledJupiterRadiationBelt(t) {
    const e = t.getEntity("jupiter");
    if (!e) return false;
    for (let t = 1; t <= 4; t++) if (null === e.getComponent(Pioneer.ModelComponent, `radiation_belt_${t}`)) return false;
    return true;
  }
  /** @eyes-analysis
   * 【结构证据】调用 `Entity.Entity.createFromOptions`、`Math.sqrt`、`e.getThreeJsObjects`、`e.setResourcesLoadedCallback`、`e.setRotation`、`e.setScale`。
   * 调用线索：Entity.Entity.createFromOptions、Math.sqrt、e.getThreeJsObjects、e.setResourcesLoadedCallback、e.setRotation等。
   */
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
  /** @eyes-analysis
   * 【结构证据】返回 `null!==t.getEntity("saturn_magnetosphere")`；调用 `t.getEntity`。
   * 调用线索：t.getEntity。
   */
  static isEnabledSaturnMagnetosphere(t) {
    return null !== t.getEntity("saturn_magnetosphere");
  }
  /** @eyes-analysis
   * 【结构证据】调用 `n.addComponent`、`new Error`、`new Pioneer.Quaternion`、`o.setRotation`、`o.setScale`、`o.setUrl`；含显式错误分支。
   * 调用线索：n.addComponent、new Error、new Pioneer.Quaternion、o.setRotation、o.setScale等。
   */
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
