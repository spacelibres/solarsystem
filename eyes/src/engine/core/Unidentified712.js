// 外行星任务目录包含 Juno 发动机盖/点火区间、Cassini 点火表与 Huygens 显隐、Voyager 旋转机构、Galileo 分离姿态；时间表与关键帧标识按其实际使用角色命名。
// Recovered from app.js:1150175-1172018.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
import * as KeyframePointingController from "../controllers/KeyframePointingController.js";
import * as KeyframeSpinController from "../controllers/KeyframeSpinController.js";
Entity.Entity.register({
  sc_juno: {
    groups: ["jupiter", "spacecraft"],
    occlusionRadius: .001732,
    extentsRadius: .01,
    label: "Juno",
    parents: [[365836752.1832, "earth"], [366088266.183, "sun"], [434433667.182, "earth"], [434793667.182, "sun"], [519652868.184, "jupiter"], [676339597, "ganymede"], [676381521, "jupiter"], [717700360, "europa"], [717727733, "jupiter"], [757191924, "io"], [757203571, "jupiter"], [760247560, "io"], [760262808, "jupiter"]],
    trail: {
      length: void 0,
      lengthCoverages: [[63072e3, Number.NEGATIVE_INFINITY, 519652868.184], [5184e3, 519652868.184, Number.POSITIVE_INFINITY]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_juno/Juno.gltf",
      rotate: [{
        x: 90
      }],
      shadowEntities: ["jupiter", "europa", "ganymede", "callisto", "io"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_juno/earth/launch/orb"
    }, {
      type: "dynamo",
      url: "sc_juno/sun/preflyby/orb"
    }, {
      type: "dynamo",
      url: "sc_juno/earth/flyby/orb"
    }, {
      type: "dynamo",
      url: "sc_juno/sun/postflyby/orb"
    }, {
      type: "dynamo",
      url: "sc_juno/jupiter/orb"
    }, {
      type: "dynamo",
      url: "sc_juno/ganymede/orb"
    }, {
      type: "dynamo",
      url: "sc_juno/europa/orb"
    }, {
      type: "dynamo",
      url: "sc_juno/io/1/orb"
    }, {
      type: "dynamo",
      url: "sc_juno/io/2/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity,
      coverage: [365836752.1832, Number.POSITIVE_INFINITY]
    }, {
      type: "dynamo",
      url: "sc_juno/ori"
    }, {
      type: "coverage",
      coverage: [393471366, 529749008],
      update: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (!model) return;
        const engineCover = model.getThreeJsObjectByName("engine_cover");
        if (!engineCover) return;
        const time = entity.getScene().getEngine().getTime();
        const intervalIndex = Pioneer.Sort.getIndexObject(time, junoCoverIntervals, (interval, sampleTime) => interval[1] < sampleTime);
        const startTime = junoCoverIntervals[intervalIndex][0];
        const endTime = junoCoverIntervals[intervalIndex][1];
        const openingFraction = Pioneer.MathUtils.clamp01(((endTime - startTime) / 2 - Math.abs(time - (endTime + startTime) / 2)) / 600);
        engineCover.rotation.x = Pioneer.MathUtils.lerp(Math.PI, Math.PI / 8, openingFraction);
      },
      exit: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (!model) return;
        const engineCover = model.getThreeJsObjectByName("engine_cover");
        if (engineCover) {
          engineCover.rotation.x = Math.PI;
        }
      }
    }, {
      type: "coverage",
      coverage: [399637867.183, 520959604.184],
      update: entity => {
        const spray = entity.getComponent(Pioneer.ParticleSprayComponent);
        if (!spray) return;
        const time = entity.getScene().getEngine().getTime();
        const intervalIndex = Pioneer.Sort.getIndexObject(time, junoBurnIntervals, (interval, sampleTime) => interval[1] < sampleTime);
        const startTime = junoBurnIntervals[intervalIndex][0];
        const endTime = junoBurnIntervals[intervalIndex][1];
        const burnActive = startTime <= time && time < endTime;
        spray.setEnabled(burnActive);
      },
      exit: entity => {
        const spray = entity.getComponent(Pioneer.ParticleSprayComponent);
        if (spray) {
          spray.setEnabled(false);
        }
      }
    }, {
      type: "coverage",
      coverage: [519652868.184, Number.POSITIVE_INFINITY],
      enter: entity => {
        const trail = entity.getComponent(Pioneer.TrailComponent);
        if (trail) {
          trail.setRelativeToEntity("jupiter");
        }
      },
      exit: entity => {
        const trail = entity.getComponent(Pioneer.TrailComponent);
        if (trail) {
          trail.setRelativeToEntity("");
        }
      }
    }],
    postCreateFunction: entity => {
      const pointingController = entity.addController(KeyframePointingController.KeyframePointingController);
      pointingController.setKeyframes(junoPointingKeyframes);
      pointingController.setDirection(Pioneer.Vector3.ZAxis);
      pointingController.setCoverage(new Pioneer.Interval(365836752.1832, 521025625));
      const keyframeSpinController = entity.addController(KeyframeSpinController.KeyframeSpinController);
      keyframeSpinController.setKeyframes(junoSpinKeyframes);
      keyframeSpinController.setAxis(Pioneer.Vector3.ZAxis);
      keyframeSpinController.setCoverage(new Pioneer.Interval(365836752.1832, 521025625));
      keyframeSpinController.setStartingAngle(-.96);
      const spray = entity.addComponent(Pioneer.ParticleSprayComponent);
      spray.setNumberOfParticles(100);
      spray.setSizeOfParticles(3e-4);
      spray.setSpeedOfParticles(.01);
      spray.setColorOfParticles(new Pioneer.Color(1, .75, 0, .25));
      spray.setSpread(-3);
      spray.setParticleSpacingRandom(false);
      spray.setLength(.003);
      spray.setOriginOffset(new Pioneer.Vector3(0, 0, -.0017));
      spray.setDirection(Pioneer.Vector3.ZAxisNeg);
      spray.setEnabled(false);
    }
  },
  sc_cassini: {
    groups: ["saturn", "spacecraft"],
    occlusionRadius: .0034,
    extentsRadius: .0055,
    label: "Cassini",
    parents: [[-69820368.42763124, "earth"], [-69537536.818, "sun"], [-53179136.814, "venus"], [-53092736.814, "sun"], [-16495135.816, "venus"], [-16451935.816, "sun"], [-11951935.817, "earth"], [-11660335.817, "sun"], [139219264.185, "saturn"], [558743640, ""]],
    dependents: ["sc_huygens"],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_cassini/Cassini.gltf",
      rotate: [{
        x: -90
      }, {
        z: 180
      }],
      shadowEntities: ["saturn", "titan", "enceladus", "mimas", "tethys"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_cassini/earth/launch/orb"
    }, {
      type: "dynamo",
      url: "sc_cassini/sun/1/orb"
    }, {
      type: "dynamo",
      url: "sc_cassini/venus/flyby1/orb"
    }, {
      type: "dynamo",
      url: "sc_cassini/sun/2/orb"
    }, {
      type: "dynamo",
      url: "sc_cassini/venus/flyby2/orb"
    }, {
      type: "dynamo",
      url: "sc_cassini/sun/3/orb"
    }, {
      type: "dynamo",
      url: "sc_cassini/earth/flyby/orb"
    }, {
      type: "dynamo",
      url: "sc_cassini/sun/4/orb"
    }, {
      type: "dynamo",
      url: "sc_cassini/saturn/orb"
    }, {
      type: "dynamo",
      url: "sc_cassini/quat"
    }, {
      type: "coverage",
      coverage: [-13098535.817, 534124760.143],
      update: entity => {
        const spray = entity.getComponent(Pioneer.ParticleSprayComponent);
        if (!spray) return;
        const time = entity.getScene().getEngine().getTime();
        const intervalIndex = Pioneer.Sort.getIndexObject(time, cassiniBurnIntervals, (interval, sampleTime) => interval[1] < sampleTime);
        const startTime = cassiniBurnIntervals[intervalIndex][0];
        const endTime = cassiniBurnIntervals[intervalIndex][1];
        const burnActive = startTime <= time && time < endTime;
        spray.setEnabled(burnActive);
      },
      exit: entity => {
        const spray = entity.getComponent(Pioneer.ParticleSprayComponent);
        if (spray) {
          spray.setEnabled(false);
        }
      }
    }, {
      type: "coverage",
      coverage: [157212064.184, Number.POSITIVE_INFINITY],
      enter: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (null !== model) {
          model.setHiddenObject("huygens_probe", true);
        }
      },
      exit: entity => {
        const model = entity.getComponent(Pioneer.ModelComponent);
        if (null !== model) {
          model.setHiddenObject("huygens_probe", false);
        }
      }
    }],
    postCreateFunction: entity => {
      const spray = entity.addComponent(Pioneer.ParticleSprayComponent);
      spray.setNumberOfParticles(50);
      spray.setSizeOfParticles(3e-4);
      spray.setSpeedOfParticles(.01);
      spray.setColorOfParticles(new Pioneer.Color(1, .75, 0, .25));
      spray.setSpread(-3);
      spray.setParticleSpacingRandom(false);
      spray.setLength(.002);
      spray.setOriginOffset(new Pioneer.Vector3(0, 29e-5, .0033));
      spray.setDirection(Pioneer.Vector3.ZAxis);
      spray.setEnabled(false);
    }
  },
  sc_europa_clipper: {
    groups: ["jupiter", "europa", "ganymede", "callisto", "spacecraft"],
    occlusionRadius: .003,
    extentsRadius: .011,
    label: "Europa Clipper",
    parents: [[782194503, "earth"], [782641310, "sun"], [794086294, "mars"], [794230007, "sun"], [849407067, "earth"], [849810294, "sun"], [953991214, "jupiter"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_europa_clipper/europa_clipper.gltf",
      shadowEntities: ["jupiter", "earth", "mars", "europa"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_europa_clipper/earth/launch"
    }, {
      type: "dynamo",
      url: "sc_europa_clipper/sun"
    }, {
      type: "dynamo",
      url: "sc_europa_clipper/mars/flyby"
    }, {
      type: "dynamo",
      url: "sc_europa_clipper/earth/flyby"
    }, {
      type: "dynamo",
      url: "sc_europa_clipper/jupiter"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "align",
        target: "jupiter",
        axis: Pioneer.Vector3.XAxisNeg,
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "dynamo",
      url: "sc_europa_clipper/ori"
    }]
  },
  sc_galileo: {
    groups: ["jupiter", "spacecraft"],
    occlusionRadius: .003,
    extentsRadius: .0055,
    label: "Galileo",
    parents: [[-321964226.73959994, "earth"], [-321559829, "sun"], [-312199026, "venus"], [-311946958, "sun"], [-286252262, "earth"], [-285827020, "sun"], [-223105356, "earth"], [-222610262, "sun"], [-129268796, "jupiter"], [117442702, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_galileo/galileo.gltf",
      shadowEntities: ["jupiter", "earth", "venus"],
      rotate: [{
        x: -90
      }, {
        z: 180
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_galileo/earth/launch/orb"
    }, {
      type: "dynamo",
      url: "sc_galileo/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_galileo/venus/flyby/orb"
    }, {
      type: "dynamo",
      url: "sc_galileo/earth/flyby1/orb"
    }, {
      type: "dynamo",
      url: "sc_galileo/earth/flyby2/orb"
    }, {
      type: "dynamo",
      url: "sc_galileo/jupiter/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "mercury",
        axis: Pioneer.Vector3.ZAxisNeg
      },
      secondary: {
        type: "align",
        axis: Pioneer.Vector3.YAxis,
        target: "earth",
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "dynamo",
      url: "sc_galileo/quat"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      relativeToTime: -141114597.48322043,
      axisInFrameSpace: true,
      periodInHours: 1 / 624,
      coverage: [-141114597.48322043, -141114477.48322043]
    }, {
      type: "coverage",
      coverage: [-141114597.48322043, -141114477.48322043],
      enter: entity => {
        const spinController = entity.getController(Pioneer.SpinController, "rotorSpin");
        if (spinController) {
          spinController.setRate(-14.8 * Math.PI / 60);
        }
      },
      exit: entity => {
        const spinController = entity.getController(Pioneer.SpinController, "rotorSpin");
        if (spinController) {
          spinController.setRate(6 * Math.PI / 60);
        }
      }
    }],
    postCreateFunction: entity => {
      const spinController = entity.addController(Pioneer.SpinController, "rotorSpin");
      spinController.setJoint("spinning_section");
      spinController.setRate(6 * Math.PI / 60);
      spinController.setAxis(Pioneer.Vector3.YAxisNeg, true);
    }
  },
  sc_galileo_probe: {
    groups: ["jupiter", "spacecraft"],
    radius: 72e-5,
    label: "Galileo Probe",
    parents: [[-321964226.73959994, "sc_galileo"], [-129268796, "jupiter"], [-128353980, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_galileo_probe/galileo_probe.gltf",
      rotate: [{
        x: -90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_galileo_probe/galileo/orb"
    }, {
      type: "dynamo",
      url: "sc_galileo_probe/jupiter/orb"
    }, {
      type: "fixed",
      position: Pioneer.Vector3.Zero,
      orientation: Pioneer.Quaternion.Identity,
      coverage: [-321964226.73959994, -141114537.48322043]
    }, {
      type: "coverage",
      coverage: [Number.NEGATIVE_INFINITY, -141114537.48322043],
      enter: entity => {
        const label = entity.getComponent(Pioneer.DivComponent);
        if (null !== label) {
          label.setEnabled(false);
        }
        const trail = entity.getComponent(Pioneer.TrailComponent);
        if (null !== trail) {
          trail.setEnabled(false);
        }
        const translationController = entity.getController(Pioneer.TranslateController);
        if (translationController) {
          translationController.setTranslation(new Pioneer.Vector3(0, 0, .001));
        }
      },
      exit: entity => {
        const label = entity.getComponent(Pioneer.DivComponent);
        if (null !== label) {
          label.setEnabled(true);
        }
        const trail = entity.getComponent(Pioneer.TrailComponent);
        if (null !== trail) {
          trail.setEnabled(true);
        }
        const translationController = entity.getController(Pioneer.TranslateController);
        if (translationController) {
          translationController.setTranslation(new Pioneer.Vector3(-16e-6, 24e-6, 7e-4));
        }
      }
    }],
    postCreateFunction: entity => {
      const model = entity.getComponent(Pioneer.ModelComponent);
      if (!model) return;
      model.setTranslation(new Pioneer.Vector3(0, 0, -.001));
      const translationController = entity.addController(Pioneer.TranslateController);
      translationController.setTranslation(new Pioneer.Vector3(-16e-6, 24e-6, 7e-4));
      translationController.setRelativeToOrientation(true);
      translationController.setCoverage(new Pioneer.Interval(-321964226.73959994, -128353980));
      entity.addController(Pioneer.RotateByEntityOrientationController).setCoverage(new Pioneer.Interval(-321964226.73959994, -141114537.48322043));
      const fixedController = entity.addController(Pioneer.FixedController);
      fixedController.setOrientation(new Pioneer.Quaternion(.40004226980201746, .3894033591393042, -.7928008139628516, .24453645053961984));
      fixedController.setCoverage(new Pioneer.Interval(-141114537.48322043, Number.POSITIVE_INFINITY));
      const spinController = entity.addController(Pioneer.SpinController);
      spinController.setReferenceAngle(0);
      spinController.setReferenceTime(-141114537.48322043);
      spinController.setAxis(Pioneer.Vector3.ZAxis, true);
      spinController.setRate(20.8 * Math.PI / 60);
      spinController.setCoverage(new Pioneer.Interval(-141114537.48322043, Number.POSITIVE_INFINITY));
    }
  },
  sc_huygens: {
    groups: ["saturn", "spacecraft", "titan"],
    occlusionRadius: .0013,
    extentsRadius: .0013,
    label: "Huygens",
    parents: [[157212064.184, "saturn"], [158945582, "titan"], [158974766.184, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_huygens/Huygens.gltf",
      rotate: [{
        x: -90
      }, {
        z: 180
      }],
      shadowEntities: ["saturn", "titan", "enceladus", "mimas", "tethys"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_huygens/saturn/orb"
    }, {
      type: "dynamo",
      url: "sc_huygens/titan/orb"
    }, {
      type: "fixed",
      orientation: new Pioneer.Quaternion(.8295521744501194, .09912464029342342, -.04158756948048668, -.5479853735424731)
    }, {
      type: "custom",
      func: entity => {
        const keyframeController = entity.addController(Pioneer.KeyframeController);
        keyframeController.addPositionKeyframe(158965616.707, new Pioneer.Vector3(-74.84608000701567, -3832.0774028380238, -305.9513410781612));
        keyframeController.addPositionKeyframe(158965667.7750001, new Pioneer.Vector3(-168.19015737501377, -3541.733393771429, -291.12326824195395));
        keyframeController.addPositionKeyframe(158965894.184, new Pioneer.Vector3(-376.8992769951708, -2686.9622048526126, -273.33138256355716));
        return keyframeController;
      }
    }, {
      type: "custom",
      func: entity => {
        const keyframeController = entity.addController(Pioneer.KeyframeController);
        keyframeController.addPositionKeyframe(158965894.184, new Pioneer.Vector3(-376.8992769951708, -2686.9622048526126, -273.33138256355716));
        keyframeController.addPositionKeyframe(158974766.184, new Pioneer.Vector3(-251.2479743710496, -2548.813556954952, -266.5500089234507));
        return keyframeController;
      }
    }, {
      type: "custom",
      func: entity => {
        const translationController = entity.addController(Pioneer.TranslateController);
        translationController.setTranslation(new Pioneer.Vector3(-.0013, 0, .0011));
        translationController.setRelativeToOrientation(true);
        translationController.setCoverage(new Pioneer.Interval(157212064.184, 158974766.184));
        return translationController;
      }
    }, {
      type: "custom",
      func: entity => {
        const keyframeSpinController = entity.addController(KeyframeSpinController.KeyframeSpinController);
        keyframeSpinController.setKeyframes(galileoSpinKeyframes);
        keyframeSpinController.setAxis(Pioneer.Vector3.XAxisNeg);
        keyframeSpinController.setCoverage(new Pioneer.Interval(157212064.184, Number.POSITIVE_INFINITY));
        return keyframeSpinController;
      }
    }, {
      type: "coverage",
      coverage: [158965616.707, Number.POSITIVE_INFINITY],
      enter: entity => {
        const trail = entity.getComponent(Pioneer.TrailComponent);
        if (null !== trail) {
          trail.setRelativeToEntityOrientation(true);
        }
      },
      exit: entity => {
        const trail = entity.getComponent(Pioneer.TrailComponent);
        if (null !== trail) {
          trail.setRelativeToEntityOrientation(false);
        }
      }
    }],
    postCreateFunction: entity => {
      const model = entity.getComponent(Pioneer.ModelComponent);
      if (model) {
        model.setTranslation(new Pioneer.Vector3(.0013, 0, -.0011));
      }
    }
  },
  sc_huygens_landing_site: {
    groups: ["titan", "sc_huygens", "sites"],
    radius: .001,
    systemRadius: 200,
    label: "Huygens Landing Site",
    parents: [[157212064.184, "titan"]],
    controllers: [{
      type: "fixed",
      llaOnSpheroid: new Pioneer.LatLonAlt(-.18453331247520502, 2.9263055188728955, 0),
      coverage: [157212064.184, Number.POSITIVE_INFINITY]
    }]
  },
  sc_juice: {
    groups: ["jupiter", "ganymede", "spacecraft"],
    occlusionRadius: .007,
    extentsRadius: .0135,
    label: "JUICE",
    parents: [[734748207, "earth"], [735606318, "sun"], [777026548, "earth"], [778061110, "sun"], [809697014, "venus"], [810162491, "sun"], [843697642, "earth"], [844049179, "sun"], [916393497, "earth"], [916903199, "sun"], [994471790, "jupiter"], [1103217877, "ganymede"]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_juice/juice.gltf",
      shadowEntities: ["ganymede", "jupiter", "earth"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_juice/earth/launch"
    }, {
      type: "dynamo",
      url: "sc_juice/sun"
    }, {
      type: "dynamo",
      url: "sc_juice/earth/flyby1"
    }, {
      type: "dynamo",
      url: "sc_juice/venus/flyby"
    }, {
      type: "dynamo",
      url: "sc_juice/earth/flyby2"
    }, {
      type: "dynamo",
      url: "sc_juice/earth/flyby3"
    }, {
      type: "dynamo",
      url: "sc_juice/jupiter"
    }, {
      type: "dynamo",
      url: "sc_juice/ganymede"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.XAxisNeg
      },
      secondary: {
        type: "align",
        target: "sun",
        axis: Pioneer.Vector3.YAxisNeg,
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "dynamo",
      url: "sc_juice/quat"
    }]
  },
  sc_pioneer_10: {
    groups: ["sun", "jupiter", "spacecraft"],
    occlusionRadius: .002118055,
    extentsRadius: .003,
    label: "Pioneer 10",
    parents: [[-878291717.8145751, "earth"], [-878146409, "sun"], [-824046472, "jupiter"], [-822011429, "sun"]],
    trail: {
      length: 31536e4
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_pioneer/pioneer.gltf",
      rotate: [{
        x: 90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_pioneer_10/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_pioneer_10/sun/1/orb"
    }, {
      type: "dynamo",
      url: "sc_pioneer_10/jupiter/orb"
    }, {
      type: "dynamo",
      url: "sc_pioneer_10/sun/2/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "align",
        target: "sun",
        axis: Pioneer.Vector3.ZAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_pioneer_11: {
    groups: ["sun", "jupiter", "saturn", "spacecraft"],
    occlusionRadius: .002118055,
    extentsRadius: .003,
    label: "Pioneer 11",
    parents: [[-843816855.8143449, "earth"], [-843644357, "sun"], [-792658454, "jupiter"], [-790152245, "sun"], [-643302619, "saturn"], [-640194311, "sun"]],
    trail: {
      length: 31536e4
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_pioneer/pioneer.gltf",
      rotate: [{
        x: 90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_pioneer_11/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_pioneer_11/sun/1/orb"
    }, {
      type: "dynamo",
      url: "sc_pioneer_11/jupiter/orb"
    }, {
      type: "dynamo",
      url: "sc_pioneer_11/sun/2/orb"
    }, {
      type: "dynamo",
      url: "sc_pioneer_11/saturn/orb"
    }, {
      type: "dynamo",
      url: "sc_pioneer_11/sun/3/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.YAxis
      },
      secondary: {
        type: "align",
        target: "sun",
        axis: Pioneer.Vector3.ZAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_voyager_1: {
    groups: ["jupiter", "saturn", "sun", "spacecraft"],
    occlusionRadius: .00183,
    extentsRadius: .0043,
    label: "Voyager 1",
    parents: [[-704412035.617, "earth"], [-703530245, "sun"], [-660264745, "jupiter"], [-655057463, "sun"], [-606239665, "saturn"], [-600733702, "sun"]],
    trail: {
      length: 94608e4,
      lengthCoverages: [[15768e4, Number.NEGATIVE_INFINITY, 377123932.454], [94608e4, 377123932.454, Number.POSITIVE_INFINITY], [5184e3, -660264745, -655057463], [5184e3, -606239665, -600733702]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_voyager/Voyager.gltf",
      rotate: [{
        x: -90
      }, {
        z: 180
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_voyager_1/earth"
    }, {
      type: "dynamo",
      url: "sc_voyager_1/sun/1"
    }, {
      type: "dynamo",
      url: "sc_voyager_1/jupiter"
    }, {
      type: "dynamo",
      url: "sc_voyager_1/sun/2"
    }, {
      type: "dynamo",
      url: "sc_voyager_1/saturn"
    }, {
      type: "dynamo",
      url: "sc_voyager_1/sun/3"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }, {
      type: "dynamo",
      url: "sc_voyager_1/ori"
    }]
  },
  sc_voyager_2: {
    groups: ["jupiter", "saturn", "uranus", "neptune", "sun", "spacecraft"],
    occlusionRadius: .00183,
    extentsRadius: .0043,
    label: "Voyager 2",
    parents: [[-705788847.817, "earth"], [-704774613, "sun"], [-650828783, "jupiter"], [-642276063, "sun"], [-582886481, "saturn"], [-574538624, "sun"], [-440395228, "uranus"], [-439259319, "sun"], [-327233138, "neptune"], [-326252606, "sun"]],
    trail: {
      length: 94608e4,
      lengthCoverages: [[15768e4, Number.NEGATIVE_INFINITY, 651751314.724], [94608e4, 651751314.724, Number.POSITIVE_INFINITY], [5184e3, -650828783, -642276063], [5184e3, -582886481, -574538624], [5184e3, -440395228, -439259319], [5184e3, -327233138, -326252606]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_voyager/Voyager.gltf",
      rotate: [{
        x: -90
      }, {
        z: 180
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_voyager_2/earth"
    }, {
      type: "dynamo",
      url: "sc_voyager_2/sun/1"
    }, {
      type: "dynamo",
      url: "sc_voyager_2/jupiter"
    }, {
      type: "dynamo",
      url: "sc_voyager_2/sun/2"
    }, {
      type: "dynamo",
      url: "sc_voyager_2/saturn"
    }, {
      type: "dynamo",
      url: "sc_voyager_2/sun/3"
    }, {
      type: "dynamo",
      url: "sc_voyager_2/uranus"
    }, {
      type: "dynamo",
      url: "sc_voyager_2/sun/4"
    }, {
      type: "dynamo",
      url: "sc_voyager_2/neptune"
    }, {
      type: "dynamo",
      url: "sc_voyager_2/sun/5"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "earth",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }, {
      type: "dynamo",
      url: "sc_voyager_2/ori"
    }]
  }
});
const cassiniBurnIntervals = [[-13098535.817, -13098146.797], [-12342535.817, -12342421.197], [-10612735.817, -10612663.357], [14274064.185, 14274070.255], [36653454.185, 36653459.605], [71128864.186, 71128875.066], [105091264.185, 105091282.755], [118339264.182, 118339287.092], [138968824.185, 138969181.735], [140692084.184, 140692123.174], [141916392.184, 141922237.024], [146548444.183, 146551498.073], [147846664.183, 147846668.693], [152302564.182, 152302569.842], [154285264.183, 154285267.193], [156518584.184, 156518669.274], [157466284.184, 157466438.074], [159139264.184, 159139404.074], [160168144.185, 160168264.795], [161978464.185, 161978469.745], [163011064.185, 163011104.295], [163869664.186, 163869667.996], [164528404.186, 164528414.466], [165853384.186, 165853391.046], [166370464.186, 166370502.696], [168008344.186, 168008476.766], [174127084.184, 174127086.454], [176341864.183, 176341881.793], [176952124.183, 176952139.533], [178261744.183, 178261753.433], [178699444.183, 178699535.673], [180420064.182, 180420240.372], [182368684.182, 182368777.962], [184039204.183, 184039282.793], [185162584.183, 185162597.343], [196273205.186, 196273208.936], [197566385.186, 197566387.476], [199978145.185, 199978148.205], [202994705.185, 202994717.245], [207734765.183, 207734800.073], [211183265.182, 211183306.302], [211500485.182, 211500537.082], [212965745.182, 212965786.692], [214371665.182, 214371670.582], [216354545.183, 216354568.983], [219456245.183, 219456251.063], [219887345.184, 219887389.034], [220835165.184, 220835169.094], [221266265.184, 221266275.434], [222644225.185, 222644240.975], [224109485.185, 224109487.885], [226090325.185, 226090329.355], [227038025.186, 227038032.946], [227469065.186, 227469075.266], [228387005.186, 228387008.496], [228846905.186, 228846923.006], [230225585.186, 230225608.176], [231577265.185, 231577300.725], [232982885.185, 232982919.625], [233930525.185, 233930529.665], [234334565.185, 234334641.855], [235309205.185, 235309210.915], [235740245.184, 235740294.424], [239704565.183, 239704568.933], [242004965.183, 242004968.253], [242979665.182, 242979748.272], [244876985.182, 244876993.442], [247203665.183, 247203671.283], [248986685.183, 248986692.503], [249417845.183, 249417942.863], [250365665.183, 250365669.503], [250801865.183, 250801924.453], [252201785.184, 252201798.884], [253728965.184, 253728983.974], [255535625.185, 255535853.415], [256682225.185, 256682228.065], [257684225.185, 257684269.165], [258146525.185, 258146533.105], [258722525.186, 258722543.076], [261147905.186, 261147925.516], [262453685.186, 262453688.326], [264259265.185, 264259272.395], [267474305.184, 267474379.954], [271073765.183, 271073780.663], [272731805.183, 272731887.753], [275208605.182, 275208611.692], [276214805.182, 276214829.892], [277127525.182, 277127545.362], [277506665.182, 277506708.062], [279455045.183, 279455100.823], [279799805.183, 279799837.073], [280747565.183, 280747571.013], [282126485.183, 282126503.483], [282471245.183, 282471256.053], [286040946.185, 286040974.915], [287532306.185, 287532308.475], [289858866.186, 289858897.046], [291603966.186, 291603971.806], [292809906.186, 292809948.366], [294188586.186, 294188602.066], [295567266.185, 295567279.505], [296945946.185, 296945956.015], [297893586.185, 297893599.995], [299272206.184, 299272220.614], [300687786.184, 300687808.034], [302066526.183, 302066563.313], [303703506.183, 303703583.793], [304824006.183, 304824009.283], [305390946.183, 305390972.583], [308925306.182, 308925311.352], [309355506.182, 309355530.682], [310684866.183, 310684869.093], [312200586.183, 312200601.223], [534124756.143, 534124760.143]];
const junoCoverIntervals = [[393471366, 393501486], [399019747, 399883447], [400569547, 400988887], [420541747, 420794647], [454490527, 454650187], [487136707, 487309687], [519804068, 521041748], [528958868, 529749008]];
const junoBurnIntervals = [[399637867.183, 399639659.183], [400933867.182, 400935660.182], [420714067.185, 420714072.185], [454572067.185, 454572072.185], [487231267.185, 487231272.185], [520957868.184, 520959604.184]];
const junoPointingKeyframes = [[365835906, "velocity"], [365836206, "sun"], [371908866, "sun"], [371909466, "earth"], [399631646, "earth"], [399632628, "sun"], [399635271, "sun"], [399636306, "-velocity"], [399640481, "-velocity"], [399641686, "sun"], [399700717, "sun"], [399641887, "earth"], [400927646, "earth"], [400928454, "sun"], [400931272, "sun"], [400932282, "-velocity"], [400936477, "-velocity"], [400937632, "sun"], [401003197, "sun"], [401009197, "earth"], [423014467, "earth"], [423014767, "sun"], [436924867, "sun"], [436925167, "earth"], [520954868, "earth"], [520955888, "-velocity"], [520960808, "-velocity"], [520962008, "sun"], [521018048, "sun"], [521025625, "earth"]];
const junoSpinKeyframes = [[394545667, 1 * Math.PI / 30], [394545967, 2 * Math.PI / 30], [399636967, 2 * Math.PI / 30], [399637264, 5 * Math.PI / 30], [399637866, 5 * Math.PI / 30], [399639659, 5.5 * Math.PI / 30], [399639788, 5.5 * Math.PI / 30], [399640072, 2 * Math.PI / 30], [400932921, 2 * Math.PI / 30], [400933214, 5 * Math.PI / 30], [400933866, 5 * Math.PI / 30], [400935660, 5.5 * Math.PI / 30], [400935790, 5.5 * Math.PI / 30], [400936068, 2 * Math.PI / 30], [520956548, 2 * Math.PI / 30], [520956848, 5 * Math.PI / 30], [520960088, 5 * Math.PI / 30], [520960388, 2 * Math.PI / 30], [521025625, 2 * Math.PI / 30]];
const galileoSpinKeyframes = [[157212064.184, 7.5 * Math.PI / 30], [158965863.184, 7.5 * Math.PI / 30], [158966163.184, 2.6 * Math.PI / 30], [158966434.184, 0], [158966883.184, -5.6 * Math.PI / 30], [158967123.184, -9.7 * Math.PI / 30], [158967363.184, -7.3 * Math.PI / 30], [158968263.184, -2.8 * Math.PI / 30], [158973723.184, -1 * Math.PI / 30]];
