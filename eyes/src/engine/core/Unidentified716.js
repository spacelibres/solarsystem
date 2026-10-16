/** @eyes-analysis
 * 文件职责：声明式实体目录，注册 2 个实体/参考系（如 sc_magellan、sc_venus_express），供 Entity-567 工厂创建半径、父级、几何与控制器。
 * 依据：import ../pioneer/index.js；import ./Entity-567.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1203457-1205553.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
Entity.Entity.register({
  sc_magellan: {
    groups: ["venus", "spacecraft"],
    occlusionRadius: .0032,
    extentsRadius: .006,
    label: "Magellan",
    parents: [[-336388283.36, "sun"], [-296448521.457, "venus"], [-164631538.81763855, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_magellan/magellan.gltf",
      shadowEntities: ["venus"]
    },
    controllers: [{
      type: "orbitalElements",
      epoch: -336388283.36,
      eccentricity: .17918861581129622,
      semiMajorAxis: 128281121.43726774,
      meanAngularMotion: 2.507331144532023e-7,
      meanAnomalyAtEpoch: 2.9242434213343413,
      orientation: new Pioneer.Quaternion(.8728021714644884, .18758909504943425, -.08950844277066175, .44160495873368477),
      coverage: [-336388283.36, -296448521.457]
    }, {
      type: "orbitalElements",
      epoch: -296448521.457,
      eccentricity: 1.272922970547487,
      semiMajorAxis: 23358.593430196037,
      meanAngularMotion: .00015965302516479147,
      meanAnomalyAtEpoch: -6.138103356108873,
      orientation: new Pioneer.Quaternion(-.49933963770188916, .11817755769547109, .7262027627540558, -.45751889408554064),
      coverage: [-296448521.457, -296410230.351]
    }, {
      type: "orbitalElements",
      epoch: -295884037.7511,
      eccentricity: .39186818222106645,
      semiMajorAxis: 10434.012201911135,
      meanAngularMotion: .000534773863104956,
      meanAnomalyAtEpoch: -1.5165416917234864,
      orientation: new Pioneer.Quaternion(-.4665778554219434, .18802595119032475, .7217932088991018, -.47535871728198204),
      coverage: [-296410230.351, -295884037.7511]
    }, {
      type: "dynamo",
      url: "sc_magellan/venus/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "align",
        axis: new Pioneer.Vector3(-Math.sqrt(.5), Math.sqrt(.5), 0),
        target: "venus",
        targetAxis: Pioneer.Vector3.ZAxisNeg
      }
    }]
  },
  sc_venus_express: {
    groups: ["venus", "spacecraft"],
    occlusionRadius: 9e-4,
    extentsRadius: .004,
    label: "Venus Express",
    parents: [[184784702, "earth"], [185369766, "sun"], [197902579, "venus"], [473341201, ""]],
    trail: {
      length: 779592.165087551
    },
    controllers: [{
      type: "dynamo",
      url: "sc_venus_express/earth"
    }, {
      type: "dynamo",
      url: "sc_venus_express/sun"
    }, {
      type: "dynamo",
      url: "sc_venus_express/venus"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }, {
      type: "dynamo",
      url: "sc_venus_express/quat"
    }]
  }
});
