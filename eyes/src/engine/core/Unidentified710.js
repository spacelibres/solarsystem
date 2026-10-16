// Recovered from app.js:1117756-1148264.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
Entity.Entity.register({
  sc_escapade_blue: {
    groups: ["mars", "spacecraft"],
    radius: .001,
    label: "ESCAPADE Blue",
    parents: [[816342898, "earth"], [847971260, "sun"], [873517951, "mars"]],
    trail: {
      length: 2419200
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_escapade/escapade.gltf",
      shadowEntities: ["earth", "mars", "deimos", "phobos"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_escapade_blue/earth"
    }, {
      type: "dynamo",
      url: "sc_escapade_blue/sun"
    }, {
      type: "dynamo",
      url: "sc_escapade_blue/mars"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "align",
        target: "mars",
        axis: Pioneer.Vector3.XAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }]
  },
  sc_escapade_gold: {
    groups: ["mars", "spacecraft"],
    radius: .001,
    label: "ESCAPADE Gold",
    parents: [[816342898, "earth"], [847971260, "sun"], [873258326, "mars"]],
    trail: {
      length: 2419200
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_escapade/escapade.gltf",
      shadowEntities: ["earth", "mars", "deimos", "phobos"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_escapade_gold/earth"
    }, {
      type: "dynamo",
      url: "sc_escapade_gold/sun"
    }, {
      type: "dynamo",
      url: "sc_escapade_gold/mars"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "mars",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_escapade_gold",
        axis: Pioneer.Vector3.XAxis
      }
    }]
  },
  sc_mars_2020: {
    groups: ["mars", "spacecraft", "landers"],
    occlusionRadius: .0015,
    extentsRadius: .003,
    label: "Mars 2020",
    parents: [[649385564, "earth"], [649595376, "sun"], [666932224, "mars"], [666952859, "sc_mars_2020_landing_site"]],
    trail: {
      length: 1e7,
      lengthCoverages: [[1e7, 649385564, 666932224], [3e3, 666932224, 666953098.003], [9676800, 676629898.003, Number.POSITIVE_INFINITY]],
      updatePointPositions: true
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_mars_2020/cruise_whole/msl_cruise_stage.gltf",
      rotate: [{
        x: -90
      }],
      shadowEntities: ["mars"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mars_2020/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_mars_2020/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_mars_2020/mars/pos"
    }, {
      type: "dynamo",
      url: "sc_mars_2020/surface/lin"
    }, {
      type: "custom",
      func: t => {
        const e = t.addController(Pioneer.TranslateController);
        e.setTranslation(new Pioneer.Vector3(-.125148, .026867, -.023641));
        return e;
      },
      coverage: [666952859, 666953098.003]
    }, {
      type: "dynamo",
      url: "sc_mars_2020/quat"
    }, {
      type: "dynamo",
      url: "sc_mars_2020/surface/quat_v2"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: .00833333333,
      relativeToTime: 649385564,
      coverage: [649385564, 666952859]
    }, {
      type: "rotateByEntityOrientation",
      entityForOrientation: "mars",
      coverage: [666952859, Number.POSITIVE_INFINITY]
    }, {
      type: "custom",
      func: t => {
        const e = t.addController(Pioneer.GroundClampController);
        e.setDistanceFromGround(.001);
        e.setGroundEntityRef("mars");
        e.setUp(Pioneer.Vector3.ZAxisNeg);
        e.setCoverage(new Pioneer.Interval(666953086.614, Number.POSITIVE_INFINITY));
        return e;
      }
    }, {
      type: "coverage",
      coverage: [666953086.614, Number.POSITIVE_INFINITY],
      enter: t => {
        const e = t.getComponent(Pioneer.DivComponent);
        e && e.getDiv().innerHTML.replace("Mars 2020", "Perseverance");
      },
      exit: t => {
        const e = t.getComponent(Pioneer.DivComponent);
        e && e.getDiv().innerHTML.replace("Perseverance", "Mars 2020");
      }
    }, {
      type: "coverage",
      coverage: [666953098.003, 676629898.003],
      enter: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        null !== e && (e.setStartTime(666953098.003), e.setRelativeStartTime(false));
      },
      exit: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        null !== e && e.setRelativeStartTime(true);
      }
    }, {
      type: "coverage",
      coverage: [666932224, Number.POSITIVE_INFINITY],
      enter: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        null !== e && e.setRelativeToEntityOrientation(true);
      },
      exit: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        null !== e && e.setRelativeToEntityOrientation(false);
      }
    }, {
      type: "coverage",
      coverage: [666953086.614, Number.POSITIVE_INFINITY],
      enter: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        e && (e.setUrl("$STATIC_ASSETS_URL/models/sc_mars_2020/rover/perseverance.gltf"), e.setRotation(new Pioneer.Quaternion(.5, -.5, .5, -.5)), e.setTranslation(new Pioneer.Vector3(0, 0, .001)));
      },
      exit: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        e && (e.setUrl("$STATIC_ASSETS_URL/models/sc_mars_2020/cruise_whole/msl_cruise_stage.gltf"), e.setRotation(new Pioneer.Quaternion(.7071067811865478, -.7071067811865472, 0, 0)), e.setTranslation(new Pioneer.Vector3(0, 0, 0)));
      }
    }, {
      type: "coverage",
      coverage: [666953098.003, Number.POSITIVE_INFINITY],
      enter: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        e && e.setVisibleInterval(Pioneer.VisibleInterval.AlwaysVisible);
      },
      exit: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        e && e.setVisibleInterval(Pioneer.VisibleInterval.DefaultVisibleFar);
      }
    }, {
      type: "coverage",
      coverage: [666952458, 666953086.614],
      enter: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        null !== e && (e.setHiddenObject("solar_panels", true), e.setHiddenObject("frame_etc", true));
      },
      exit: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        null !== e && (e.setHiddenObject("solar_panels", false), e.setHiddenObject("frame_etc", false));
      }
    }]
  },
  sc_mars_2020_landing_site: {
    groups: ["mars", "sc_mars_2020", "sites"],
    radius: .001,
    systemRadius: 200,
    label: "Mars 2020 Landing Site",
    parents: [[649385563.6433017, "mars"]],
    controllers: [{
      type: "fixed",
      llaOnSpheroid: new Pioneer.LatLonAlt(.321919527884589, 1.3517727025459014, -2.2250972487986473),
      coverage: [649385563.6433017, Number.POSITIVE_INFINITY]
    }]
  },
  sc_mars_science_laboratory: {
    groups: ["mars", "spacecraft", "landers"],
    occlusionRadius: .001515,
    extentsRadius: .004,
    label: "Mars Science Laboratory",
    parents: [[375594733, "earth"], [376039259, "sun"], [397477501, "mars"], [397502386.832, "sc_mars_science_laboratory_landing_site"]],
    trail: {
      length: 1e7,
      lengthCoverages: [[1e7, 375594733, 397501373], [3e3, 397501373, 407179186.832], [9676800, 407179186.832, Number.POSITIVE_INFINITY]],
      updatePointPositions: true
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_mars_science_laboratory/cruise/msl_cruisestage.gltf",
      rotate: [{
        x: -90
      }],
      shadowEntities: ["mars"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mars_science_laboratory/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_mars_science_laboratory/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_mars_science_laboratory/mars/orb"
    }, {
      type: "dynamo",
      url: "sc_mars_science_laboratory/edl/pos"
    }, {
      type: "custom",
      func: t => {
        const e = t.addController(Pioneer.TranslateController);
        e.setTranslation(new Pioneer.Vector3(.002583, .002995, .001937));
        return e;
      },
      coverage: [397501373, 397502386.832]
    }, {
      type: "dynamo",
      url: "sc_mars_science_laboratory/surface/lin_v2"
    }, {
      type: "dynamo",
      url: "sc_mars_science_laboratory/quat"
    }, {
      type: "dynamo",
      url: "sc_mars_science_laboratory/surface/quat_v2"
    }, {
      type: "spin",
      axis: Pioneer.Vector3.ZAxis,
      periodInHours: .00833333333,
      relativeToTime: 375594733,
      coverage: [375594733, 397501866]
    }, {
      type: "rotateByEntityOrientation",
      entityForOrientation: "mars",
      rotatingOrientation: false,
      coverage: [397501373, Number.POSITIVE_INFINITY]
    }, {
      type: "rotateByEntityOrientation",
      entityForOrientation: "mars",
      rotatingPosition: false,
      coverage: [397502386.832, Number.POSITIVE_INFINITY]
    }, {
      type: "custom",
      func: t => {
        const e = t.addController(Pioneer.GroundClampController);
        e.setDistanceFromGround(98e-5);
        e.setGroundEntityRef("mars");
        e.setUp(Pioneer.Vector3.ZAxisNeg);
        e.setCoverage(new Pioneer.Interval(397502386.832, Number.POSITIVE_INFINITY));
        return e;
      }
    }, {
      type: "coverage",
      coverage: [397502386.832, Number.POSITIVE_INFINITY],
      enter: t => {
        const e = t.getComponent(Pioneer.DivComponent);
        e && e.getDiv().innerHTML.replace("Mars Science Laboratory", "Curiosity");
      },
      exit: t => {
        const e = t.getComponent(Pioneer.DivComponent);
        e && e.getDiv().innerHTML.replace("Curiosity", "Mars Science Laboratory");
      }
    }, {
      type: "coverage",
      coverage: [397501373, Number.POSITIVE_INFINITY],
      enter: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        null !== e && e.setRelativeToEntityOrientation(true);
      },
      exit: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        null !== e && e.setRelativeToEntityOrientation(false);
      }
    }, {
      type: "coverage",
      coverage: [397502324, Number.POSITIVE_INFINITY],
      enter: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        null !== e && (e.setUrl("$STATIC_ASSETS_URL/models/sc_mars_science_laboratory/rover/curiosity_static.gltf"), e.setRotation(new Pioneer.Quaternion(.5, -.5, .5, -.5)), e.setTranslation(new Pioneer.Vector3(0, 0, .001)));
      },
      exit: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        null !== e && (e.setUrl("$STATIC_ASSETS_URL/models/sc_mars_science_laboratory/cruise/msl_cruisestage.gltf"), e.setRotation(new Pioneer.Quaternion(.7071067811865478, -.7071067811865472, 0, 0)), e.setTranslation(new Pioneer.Vector3(0, 0, 0)));
      }
    }, {
      type: "coverage",
      coverage: [397502386.832, Number.POSITIVE_INFINITY],
      enter: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        e && e.setVisibleInterval(Pioneer.VisibleInterval.AlwaysVisible);
      },
      exit: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        e && e.setVisibleInterval(Pioneer.VisibleInterval.DefaultVisibleFar);
      }
    }, {
      type: "coverage",
      coverage: [397501758, 397502386.832],
      enter: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        null !== e && (e.setHiddenObject("solar_panels", true), e.setHiddenObject("frame_etc", true));
      },
      exit: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        null !== e && (e.setHiddenObject("solar_panels", false), e.setHiddenObject("frame_etc", false));
      }
    }]
  },
  sc_mars_science_laboratory_landing_site: {
    groups: ["mars", "sc_mars_science_laboratory", "sites"],
    occlusionRadius: .001515,
    extentsRadius: .004,
    systemRadius: 200,
    label: "Curiosity Landing Site",
    parents: [[375594732.3829685, "mars"]],
    controllers: [{
      type: "fixed",
      llaOnSpheroid: new Pioneer.LatLonAlt(-.08010131004894551, 2.3988090252433336, -4.931465618370112),
      coverage: [375594732.3829685, Number.POSITIVE_INFINITY]
    }]
  },
  sc_mars_exploration_rover_1: {
    groups: ["mars", "spacecraft", "landers"],
    occlusionRadius: .0013,
    extentsRadius: .0026,
    label: "Opportunity",
    parents: [[110911022.184, "earth"], [111234172, "sun"], [128262836, "mars"], [128278419, "sc_mars_exploration_rover_1_landing_site"], [581920316.8566707, ""]],
    trail: {
      length: 6720,
      lengthCoverages: [[1e7, Number.NEGATIVE_INFINITY, 128262836], [6720, 128262836, 128278523], [9676800, 137955323, 581920316.856]],
      updatePointPositions: true
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_mars_exploration_rover/cruise/mpf_mera_merb_cruise.gltf",
      rotate: [{
        x: 90
      }],
      shadowEntities: ["mars"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mars_exploration_rover_1/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_mars_exploration_rover_1/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_mars_exploration_rover_1/mars/pos"
    }, {
      type: "dynamo",
      url: "sc_mars_exploration_rover_1/edl/pos"
    }, {
      type: "dynamo",
      url: "sc_mars_exploration_rover_1/surface/lin"
    }, {
      type: "custom",
      func: t => {
        const e = t.addController(Pioneer.RotateController);
        const quaternion = new Pioneer.Quaternion();
        quaternion.setFromAxes(Pioneer.Vector3.YAxis, Pioneer.Vector3.XAxisNeg, void 0);
        e.setRotation(quaternion);
        e.setRotatingOrientation(false);
        return e;
      },
      coverage: [128278419, 581920316.856]
    }, {
      type: "rotateByEntityOrientation",
      rotatingOrientation: false,
      coverage: [128278419, 581920316.856]
    }, {
      type: "custom",
      func: t => {
        const e = t.addController(Pioneer.GroundClampController);
        e.setGroundEntityRef("mars");
        e.setUp(Pioneer.Vector3.ZAxisNeg);
        return e;
      },
      coverage: [128278523, 581920316.856]
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "align",
        target: "mars",
        axis: Pioneer.Vector3.YAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      },
      coverage: [Number.NEGATIVE_INFINITY, 128262836]
    }, {
      type: "align",
      primary: {
        type: "velocity",
        target: "sc_mars_exploration_rover_1",
        axis: Pioneer.Vector3.ZAxisNeg
      },
      secondary: {
        type: "align",
        target: "mars",
        axis: Pioneer.Vector3.YAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      },
      coverage: [128262836, 128278523.336]
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity,
      coverage: [128278523, 581920316.856]
    }, {
      type: "rotateByEntityOrientation",
      rotatingPosition: false,
      coverage: [128278523, 581920316.856]
    }, {
      type: "coverage",
      coverage: [128278419, 581920316.856],
      enter: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        null !== e && (e.setRelativeToEntityOrientation(true), e.setVisibleInterval(Pioneer.VisibleInterval.AlwaysVisible));
      },
      exit: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        null !== e && (e.setRelativeToEntityOrientation(false), e.setVisibleInterval(Pioneer.VisibleInterval.DefaultVisibleFar));
      }
    }, {
      type: "coverage",
      coverage: [128278523, 137955323],
      enter: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        null !== e && (e.setStartTime(128278523), e.setRelativeStartTime(false));
      },
      exit: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        null !== e && e.setRelativeStartTime(true);
      }
    }, {
      type: "coverage",
      coverage: [128278523, 581920316.856],
      enter: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        null !== e && e.setUrl("$STATIC_ASSETS_URL/models/sc_mars_exploration_rover/rover/mer_static.gltf");
      },
      exit: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        null !== e && e.setUrl("$STATIC_ASSETS_URL/models/sc_mars_exploration_rover/cruise/mpf_mera_merb_cruise.gltf");
      }
    }]
  },
  sc_mars_exploration_rover_1_landing_site: {
    groups: ["mars", "sc_mars_exploration_rover_1", "sites"],
    radius: .001,
    systemRadius: 200,
    label: "Opportunity Landing Site",
    parents: [[110911022.184, "mars"]],
    controllers: [{
      type: "fixed",
      llaOnSpheroid: new Pioneer.LatLonAlt(-.03400393456981894, -.09644392740547793, -2.003555232992767),
      coverage: [110911022.184, Number.POSITIVE_INFINITY]
    }]
  },
  sc_mars_exploration_rover_2: {
    groups: ["mars", "spacecraft", "landers"],
    occlusionRadius: .0013,
    extentsRadius: .0026,
    label: "Spirit",
    parents: [[108541883.184, "earth"], [108887371, "sun"], [126444477, "mars"], [126462105, "sc_mars_exploration_rover_2_landing_site"], [322567479.3896215, ""]],
    trail: {
      length: 6720,
      lengthCoverages: [[1e7, Number.NEGATIVE_INFINITY, 126444477], [6720, 126444477, 126462396], [9676800, 136139196, 322567479.38962]],
      updatePointPositions: true
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_mars_exploration_rover/cruise/mpf_mera_merb_cruise.gltf",
      rotate: [{
        x: 90
      }],
      shadowEntities: ["mars"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mars_exploration_rover_2/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_mars_exploration_rover_2/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_mars_exploration_rover_2/mars/pos"
    }, {
      type: "dynamo",
      url: "sc_mars_exploration_rover_2/edl/pos"
    }, {
      type: "dynamo",
      url: "sc_mars_exploration_rover_2/surface/lin"
    }, {
      type: "custom",
      func: t => {
        const e = t.addController(Pioneer.RotateController);
        const quaternion = new Pioneer.Quaternion();
        quaternion.setFromAxes(Pioneer.Vector3.YAxis, Pioneer.Vector3.XAxisNeg, void 0);
        e.setRotation(quaternion);
        e.setRotatingOrientation(false);
        return e;
      },
      coverage: [126462105, 322567479.38962]
    }, {
      type: "rotateByEntityOrientation",
      rotatingOrientation: false,
      coverage: [126462105, 322567479.38962]
    }, {
      type: "custom",
      func: t => {
        const e = t.addController(Pioneer.GroundClampController);
        e.setGroundEntityRef("mars");
        e.setUp(Pioneer.Vector3.ZAxisNeg);
        return e;
      },
      coverage: [126462396, 322567479.38962]
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "align",
        target: "mars",
        axis: Pioneer.Vector3.YAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      },
      coverage: [Number.NEGATIVE_INFINITY, 126444477]
    }, {
      type: "align",
      primary: {
        type: "velocity",
        target: "sc_mars_exploration_rover_2",
        axis: Pioneer.Vector3.ZAxisNeg
      },
      secondary: {
        type: "align",
        target: "mars",
        axis: Pioneer.Vector3.YAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      },
      coverage: [126444477, 126462396]
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity,
      coverage: [126462396, 322567479.38962]
    }, {
      type: "rotateByEntityOrientation",
      rotatingPosition: false,
      coverage: [126462396, 322567479.38962]
    }, {
      type: "coverage",
      coverage: [126462105, 322567479.38962],
      enter: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        null !== e && (e.setRelativeToEntityOrientation(true), e.setVisibleInterval(Pioneer.VisibleInterval.AlwaysVisible));
      },
      exit: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        null !== e && (e.setRelativeToEntityOrientation(false), e.setVisibleInterval(Pioneer.VisibleInterval.DefaultVisibleFar));
      }
    }, {
      type: "coverage",
      coverage: [126462396, 136139196],
      enter: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        null !== e && (e.setStartTime(126462396), e.setRelativeStartTime(false));
      },
      exit: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        null !== e && e.setRelativeStartTime(true);
      }
    }, {
      type: "coverage",
      coverage: [126462396, 322567479.38962],
      enter: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        null !== e && e.setUrl("$STATIC_ASSETS_URL/models/sc_mars_exploration_rover/rover/mer_static.gltf");
      },
      exit: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        null !== e && e.setUrl("$STATIC_ASSETS_URL/models/sc_mars_exploration_rover/cruise/mpf_mera_merb_cruise.gltf");
      }
    }]
  },
  sc_mars_exploration_rover_2_landing_site: {
    groups: ["mars", "sc_mars_exploration_rover_2", "sites"],
    radius: .001,
    systemRadius: 200,
    label: "Spirit Landing Site",
    parents: [[108541883.184, "mars"]],
    controllers: [{
      type: "fixed",
      llaOnSpheroid: new Pioneer.LatLonAlt(-.25432749290990797, 3.062677242395019, -2.6606658976375),
      coverage: [108541883.184, Number.POSITIVE_INFINITY]
    }]
  },
  sc_insight: {
    groups: ["mars", "spacecraft", "landers"],
    radius: .00306,
    label: "InSight",
    parents: [[578795968.9654216, "earth"], [579182469.185, "sun"], [596376069.183, "mars"]],
    trail: {
      length: 32137022.16,
      lengthCoverages: [[32137022.16, Number.NEGATIVE_INFINITY, 596376069.183], [14400, 596376069.183, 596529871.284], [3600, 596529871.284, 596533602], [0, 596533602, Number.POSITIVE_INFINITY]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_insight/lander/insight.gltf",
      rotate: [{
        y: 90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_insight/earth/pos"
    }, {
      type: "dynamo",
      url: "sc_insight/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_insight/mars/orb"
    }, {
      type: "dynamo",
      url: "sc_insight_edl/mars/pos"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "mars",
        axis: Pioneer.Vector3.ZAxisNeg
      },
      secondary: {
        type: "align",
        target: "mars",
        axis: Pioneer.Vector3.YAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      },
      coverage: [578795968.9654216, 596533602]
    }, {
      type: "dynamo",
      url: "sc_insight/ori"
    }, {
      type: "dynamo",
      url: "sc_insight_edl/ori"
    }, {
      type: "fixed",
      llaOnSpheroid: new Pioneer.LatLonAlt(.07881611091588067, 2.3734709256393973, -3.028314443771251),
      llaOnSpheroidEntity: "mars",
      coverage: [596533602, Number.POSITIVE_INFINITY]
    }, {
      type: "coverage",
      coverage: [596529871.284, 596533602],
      enter: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        null !== e && e.setRelativeToEntityOrientation(true);
      },
      exit: t => {
        const e = t.getComponent(Pioneer.TrailComponent);
        null !== e && e.setRelativeToEntityOrientation(false);
      }
    }, {
      type: "coverage",
      coverage: [578795968.9654216, 596533602],
      enter: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        null !== e && (e.setUrl("$STATIC_ASSETS_URL/models/sc_insight/cruise/model.gltf"), e.setRotation(new Pioneer.Quaternion(Math.sqrt(.5), 0, Math.sqrt(.5), 0)), e.setTranslation(Pioneer.Vector3.Zero));
      }
    }, {
      type: "coverage",
      coverage: [596533602, Number.POSITIVE_INFINITY],
      enter: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        null !== e && (e.setUrl("$STATIC_ASSETS_URL/models/sc_insight/lander/insight.gltf"), e.setRotation(new Pioneer.Quaternion(Math.sqrt(.5), Math.sqrt(.5), 0, 0)), e.setTranslation(new Pioneer.Vector3(0, 0, 85e-5)));
      }
    }]
  },
  sc_insight_landing_site: {
    groups: ["mars", "sc_insight", "sites"],
    radius: .001,
    systemRadius: 200,
    label: "InSight Landing Site",
    parents: [[578795968.9654216, "mars"], [596533602, ""]],
    controllers: [{
      type: "fixed",
      llaOnSpheroid: new Pioneer.LatLonAlt(.07881611091588067, 2.3734709256393973, -3.028314443771251),
      coverage: [578795968.9654216, 596533602]
    }]
  },
  sc_marco_a: {
    groups: ["mars", "spacecraft"],
    radius: 44375e-8,
    label: "MarCO A",
    parents: [[578796051, "earth"], [579182469.185, "sun"], [596376069.183, "mars"], [596552080, "sun"], [631152e3, ""]],
    trail: {
      length: 6720,
      lengthCoverages: [[1e7, Number.NEGATIVE_INFINITY, 579182469.185], [6720, 579182469.185, 596552080], [1e7, 596552080, Number.POSITIVE_INFINITY]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_marco/model.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "sc_marco_a/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_marco_a/sun/1/orb"
    }, {
      type: "dynamo",
      url: "sc_marco_a/mars/orb"
    }, {
      type: "dynamo",
      url: "sc_marco_a/sun/2/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
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
  sc_marco_b: {
    groups: ["mars", "spacecraft"],
    radius: 44375e-8,
    label: "MarCO B",
    parents: [[578796051, "earth"], [579182469.185, "sun"], [596376069.183, "mars"], [596552080, "sun"], [631152e3, ""]],
    trail: {
      length: 6720,
      lengthCoverages: [[1e7, Number.NEGATIVE_INFINITY, 579182469.185], [6720, 579182469.185, 596552080], [1e7, 596552080, Number.POSITIVE_INFINITY]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_marco/model.gltf"
    },
    controllers: [{
      type: "dynamo",
      url: "sc_marco_b/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_marco_b/sun/1/orb"
    }, {
      type: "dynamo",
      url: "sc_marco_b/mars/orb"
    }, {
      type: "dynamo",
      url: "sc_marco_b/sun/2/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
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
  sc_mars_odyssey: {
    groups: ["mars", "spacecraft"],
    occlusionRadius: .0013,
    extentsRadius: .004,
    label: "Mars Odyssey",
    parents: [[39932700, "earth"], [40233664, "sun"], [57128464, "mars"]],
    trail: {
      length: 6727,
      lengthCoverages: [[1e7, Number.NEGATIVE_INFINITY, 57128464], [6727, 57128464, Number.POSITIVE_INFINITY]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_mars_odyssey/mars_odyssey.gltf",
      shadowEntities: ["mars", "deimos", "phobos"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mars_odyssey/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_mars_odyssey/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_mars_odyssey/mars/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "mars",
        axis: new Pioneer.Vector3(-.95630475596, .29237170472, 0)
      },
      secondary: {
        type: "velocity",
        target: "sc_mars_odyssey",
        axis: new Pioneer.Vector3(.29237170472, .95630475596, 0)
      }
    }, {
      type: "dynamo",
      url: "sc_mars_odyssey/ori"
    }]
  },
  sc_mars_reconnaissance_orbiter: {
    groups: ["mars", "spacecraft"],
    radius: .0068,
    label: "Mars Reconnaissance Orbiter",
    parents: [[177122516, "earth"], [177429664, "sun"], [195285665, "mars"]],
    trail: {
      length: 6720,
      lengthCoverages: [[1e7, Number.NEGATIVE_INFINITY, 195285665], [6720, 195285665, Number.POSITIVE_INFINITY]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_mars_reconnaissance_orbiter/MRO.gltf",
      shadowEntities: ["mars", "deimos", "phobos"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mars_reconnaissance_orbiter/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_mars_reconnaissance_orbiter/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_mars_reconnaissance_orbiter/mars/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "mars",
        axis: Pioneer.Vector3.ZAxis
      },
      secondary: {
        type: "velocity",
        target: "sc_mars_reconnaissance_orbiter",
        axis: Pioneer.Vector3.XAxis
      }
    }, {
      type: "dynamo",
      url: "sc_mars_reconnaissance_orbiter/ori"
    }]
  },
  sc_maven: {
    groups: ["mars", "spacecraft"],
    radius: .0057,
    label: "MAVEN",
    parents: [[438074509.3428109, "earth"], [438296467, "sun"], [464590867, "mars"], [829709700, ""]],
    trail: {
      length: 16139
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_maven/Maven.gltf",
      rotate: [{
        x: 90
      }, {
        z: 90
      }],
      shadowEntities: ["mars", "deimos", "phobos"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_maven/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_maven/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_maven/mars/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "dynamo",
      url: "sc_maven/ori"
    }]
  },
  sc_mars_express: {
    groups: ["mars", "spacecraft"],
    radius: .006,
    label: "Mars Express",
    parents: [[107853140.59600002, "earth"], [108232264, "sun"], [125539264, "mars"]],
    trail: {
      length: 25e3,
      lengthCoverages: [[1e7, Number.NEGATIVE_INFINITY, 126749131], [12720, 126749131, Number.POSITIVE_INFINITY]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_mars_express/mars_express.gltf",
      rotate: [{
        x: 90
      }, {
        z: -180
      }],
      shadowEntities: ["mars", "deimos", "phobos"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mars_express/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_mars_express/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_mars_express/mars/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "mars",
        axis: Pioneer.Vector3.XAxisNeg
      }
    }, {
      type: "dynamo",
      url: "sc_mars_express/ori"
    }]
  },
  sc_phoenix: {
    groups: ["mars", "spacecraft"],
    radius: .0027,
    label: "Phoenix",
    parents: [[239496427, "earth"], [239618121, "sun"], [265008306, "mars"], [265030318, "sc_phoenix_landing_site"], [278942465, ""]],
    trail: {
      length: 45411186,
      lengthCoverages: [[45411186, Number.NEGATIVE_INFINITY, 265008306], [5e4, 265008306, 265030318], [500, 265030318, 265030769], [0, 265030769, 278942465]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_phoenix/cruise/phoenix_cruise.gltf",
      rotate: [{
        z: 90
      }]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_phoenix/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_phoenix/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_phoenix/mars/orb"
    }, {
      type: "dynamo",
      url: "sc_phoenix/phx_topo/pos"
    }, {
      type: "dynamo",
      url: "sc_phoenix/ori"
    }, {
      type: "fixed",
      position: new Pioneer.Vector3(.027059368126568832, .013878235928918032, -.04367634407940447),
      coverage: [265030769, 278942465]
    }, {
      type: "rotateByEntityOrientation",
      rotatingOrientation: false,
      coverage: [265030769, 278942465]
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.ZAxisNeg
      }
    }, {
      type: "coverage",
      coverage: [265029904, Number.POSITIVE_INFINITY],
      enter: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        e && e.setUrl("$STATIC_ASSETS_URL/models/sc_phoenix/edl/phoenix_edl.gltf");
      },
      exit: t => {
        const e = t.getComponent(Pioneer.ModelComponent);
        e && e.setUrl("$STATIC_ASSETS_URL/models/sc_phoenix/cruise/phoenix_cruise.gltf");
      }
    }],
    postCreateFunction: t => {
      t.addParentChangedCallback((t, e, i) => {
        if (null !== i) {
          const e = i.getName();
          const n = t.getComponent(Pioneer.TrailComponent);
          n && ("sc_phoenix_landing_site" === e ? (n.setRelativeToEntity("mars"), n.setRelativeToEntityOrientation(true)) : (n.setRelativeToEntity(""), n.setRelativeToEntityOrientation(false)));
        }
      });
    }
  },
  sc_phoenix_landing_site: {
    groups: ["mars", "sc_phoenix", "sites"],
    radius: .001,
    systemRadius: 200,
    label: "Phoenix Landing Site",
    parents: [[239496427, "mars"]],
    controllers: [{
      type: "fixed",
      llaOnSpheroid: new Pioneer.LatLonAlt(1.1906355815662266, -2.194774049130221, -2.6266732008584768),
      coverage: [239496427, Number.POSITIVE_INFINITY]
    }]
  },
  sc_trace_gas_orbiter: {
    groups: ["mars", "spacecraft"],
    radius: .00875915,
    label: "Trace Gas Orbiter",
    parents: [[511257268, "earth"], [511941668, "sun"], [530107268, "mars"]],
    trail: {
      length: 6720,
      lengthCoverages: [[1e7, Number.NEGATIVE_INFINITY, 530160041], [6720, 530160041, Number.POSITIVE_INFINITY]]
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_trace_gas_orbiter/TGO.gltf",
      rotate: [{
        x: -90
      }, {
        y: -90
      }],
      shadowEntities: ["mars", "deimos", "phobos"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_trace_gas_orbiter/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_trace_gas_orbiter/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_trace_gas_orbiter/mars/orb"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "mars",
        axis: Pioneer.Vector3.YAxisNeg
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.XAxisNeg
      }
    }, {
      type: "dynamo",
      url: "sc_trace_gas_orbiter/ori"
    }, {
      type: "align",
      joint: "right_array_1",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.XAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      }
    }, {
      type: "align",
      joint: "left_array_1",
      primary: {
        type: "none",
        axis: Pioneer.Vector3.XAxis
      },
      secondary: {
        type: "point",
        target: "sun",
        axis: Pioneer.Vector3.YAxis
      }
    }]
  },
  sc_mars_orbiter_mission: {
    groups: ["mars", "spacecraft"],
    radius: .00275,
    label: "Mars Orbiter Mission",
    parents: [[436917230, "earth"], [439621267, "sun"], [464758867, "mars"], [702924129, ""]],
    trail: {
      length: void 0
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mars_orbiter_mission/earth/orb"
    }, {
      type: "dynamo",
      url: "sc_mars_orbiter_mission/sun/orb"
    }, {
      type: "dynamo",
      url: "sc_mars_orbiter_mission/mars/orb"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_mars_global_surveyor: {
    groups: ["mars", "spacecraft"],
    occlusionRadius: .003,
    extentsRadius: .005,
    label: "Mars Global Surveyor",
    parents: [[-99329637, "earth"], [-99081876, "sun"], [-72717692, "mars"], [215806800, ""]],
    trail: {
      length: void 0
    },
    model: {
      url: "$STATIC_ASSETS_URL/models/sc_mars_global_surveyor/mars_global_surveyor.gltf",
      rotate: [{
        x: 90
      }],
      shadowEntities: ["mars"]
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mars_global_surveyor/earth"
    }, {
      type: "dynamo",
      url: "sc_mars_global_surveyor/sun"
    }, {
      type: "dynamo",
      url: "sc_mars_global_surveyor/mars"
    }, {
      type: "align",
      primary: {
        type: "point",
        target: "mars",
        axis: Pioneer.Vector3.XAxisNeg
      },
      secondary: {
        type: "align",
        target: "mars",
        axis: Pioneer.Vector3.ZAxis,
        targetAxis: Pioneer.Vector3.ZAxis
      }
    }, {
      type: "dynamo",
      url: "sc_mars_global_surveyor/ori"
    }]
  },
  sc_mars_climate_orbiter: {
    groups: ["mars", "spacecraft"],
    radius: .0011,
    label: "Mars Climate Orbiter",
    parents: [[-33318e3, "earth"], [-33074503, "sun"], [-8818837, "mars"], [-7689600, ""]],
    trail: {
      length: void 0
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mars_climate_orbiter/earth"
    }, {
      type: "dynamo",
      url: "sc_mars_climate_orbiter/sun"
    }, {
      type: "dynamo",
      url: "sc_mars_climate_orbiter/mars"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_mars_pathfinder: {
    groups: ["mars", "spacecraft"],
    radius: 33e-5,
    label: "Mars Pathfinder",
    parents: [[-91704541, "sun"], [-78799646, "mars"], [-78692826, "sc_mars_pathfinder_landing_site"], [-71372156, ""]],
    trail: {
      length: void 0
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mars_pathfinder/sun"
    }, {
      type: "dynamo",
      url: "sc_mars_pathfinder/mars"
    }, {
      type: "fixed",
      position: new Pioneer.Vector3(1733.8045354970886, -3114.1893353832183, -682.0562165671394),
      coverage: [-78692880, -78692826]
    }, {
      type: "fixed",
      position: Pioneer.Vector3.Zero,
      coverage: [-78692826, -71372156]
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }, {
      type: "rotateByEntityOrientation",
      entityForOrientation: "mars",
      rotatingPosition: false,
      rotatingOrientation: true,
      coverage: [-78692826, -71372156]
    }]
  },
  sc_mars_pathfinder_landing_site: {
    groups: ["mars", "sc_mars_pathfinder", "sites"],
    radius: .001,
    systemRadius: 200,
    label: "Mars Pathfinder Landing Site",
    parents: [[-97045250.817, "mars"]],
    controllers: [{
      type: "fixed",
      llaOnSpheroid: new Pioneer.LatLonAlt(19.09724 * Math.PI / 180, -33.25392 * Math.PI / 180, -4.159712420881988),
      coverage: [-97045250.817, Number.POSITIVE_INFINITY]
    }]
  },
  sc_mars_polar_lander: {
    groups: ["mars", "spacecraft"],
    radius: .0018,
    label: "Mars Polar Lander",
    parents: [[-31298400, "earth"], [-31084810, "sun"], [-2507347, "mars"], [-2476791, ""]],
    trail: {
      length: void 0
    },
    controllers: [{
      type: "dynamo",
      url: "sc_mars_polar_lander/earth"
    }, {
      type: "dynamo",
      url: "sc_mars_polar_lander/sun"
    }, {
      type: "dynamo",
      url: "sc_mars_polar_lander/mars"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }]
  },
  sc_viking_1_orbiter: {
    groups: ["mars", "spacecraft"],
    radius: .0047,
    label: "Viking 1 Orbiter",
    parents: [[-768916753, "sun"], [-742936101, "mars"], [-613227284, ""]],
    trail: {
      length: void 0
    },
    controllers: [{
      type: "custom",
      func: t => {
        const e = t.addController(Pioneer.OrbitalElementsController);
        const i = -768916753;
        e.addOrbitalElements(i, new Pioneer.OrbitalElements({
          epoch: i,
          eccentricity: .24781032090592367,
          semiMajorAxis: 199304047.36272663,
          meanAngularMotion: 1.2947372404056059e-7,
          meanAnomalyAtEpoch: -.17563763365135676,
          orientation: new Pioneer.Quaternion(.9780085682498194, .16676729106030264, .041633746528088954, -.1181293452634939)
        }));
        e.setCoverage(new Pioneer.Interval(i, -742936101));
        return e;
      }
    }, {
      type: "dynamo",
      url: "sc_viking_1_orbiter/mars"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }, {
      type: "dynamo",
      url: "sc_viking_1_orbiter/ori"
    }]
  },
  sc_viking_1_lander_landing_site: {
    groups: ["mars", "sc_viking_1_lander", "sites"],
    radius: .001,
    systemRadius: 200,
    label: "Viking 1 Lander Landing Site",
    parents: [[-768926233.817, "mars"]],
    controllers: [{
      type: "fixed",
      llaOnSpheroid: new Pioneer.LatLonAlt(22.27 * Math.PI / 180, 312.05 * Math.PI / 180, -3.9223828202807454),
      coverage: [-768926233.817, Number.POSITIVE_INFINITY]
    }]
  },
  sc_viking_2_orbiter: {
    groups: ["mars", "spacecraft"],
    radius: .0047,
    label: "Viking 2 Orbiter",
    parents: [[-767190013, "sun"], [-738643374, "mars"], [-676517400, ""]],
    trail: {
      length: void 0
    },
    controllers: [{
      type: "custom",
      func: t => {
        const e = t.addController(Pioneer.OrbitalElementsController);
        const i = -767190013;
        e.addOrbitalElements(i, new Pioneer.OrbitalElements({
          epoch: i,
          eccentricity: .24703340916784627,
          semiMajorAxis: 199805187.99925858,
          meanAngularMotion: 1.2898692104667572e-7,
          meanAnomalyAtEpoch: -.04222563359483367,
          orientation: new Pioneer.Quaternion(.9813245661511657, .1770589344739274, .0190380802985824, -.07273088126599732)
        }));
        e.setCoverage(new Pioneer.Interval(i, -738643374));
        return e;
      }
    }, {
      type: "dynamo",
      url: "sc_viking_2_orbiter/mars"
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }, {
      type: "dynamo",
      url: "sc_viking_2_orbiter/ori"
    }]
  },
  sc_viking_2_lander_landing_site: {
    groups: ["mars", "sc_viking_2_lander", "sites"],
    radius: .001,
    systemRadius: 200,
    label: "Viking 2 Lander Landing Site",
    parents: [[-767208013.818, "mars"]],
    controllers: [{
      type: "fixed",
      llaOnSpheroid: new Pioneer.LatLonAlt(47.64 * Math.PI / 180, 134.29 * Math.PI / 180, -3.3442726072767073),
      coverage: [-767208013.818, Number.POSITIVE_INFINITY]
    }]
  }
});
