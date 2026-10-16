// 太阳系主天体注册表，postCreate 按选项接入大气、行星环、星空与日球层；木星表面经度通过旋转观测表插值并换算 System II/III。所有天体参数、日期、轴向和资产路径保持原值。
// Recovered from app.js:794403-805627.
import * as Pioneer from "../pioneer/index.js";
import * as Entity from "./Entity-567.js";
import * as SceneHelpers from "./SceneHelpers.js";
Entity.Entity.register({
  observable_universe: {
    groups: ["stars"],
    radius: 5e23,
    systemRadius: 5e23,
    label: "Observable Universe",
    parents: [],
    controllers: [{
      type: "fixed",
      position: Pioneer.Vector3.Zero,
      orientation: Pioneer.Quaternion.Identity
    }],
    postCreateFunction: entity => {
      entity.setCanOcclude(false);
    }
  },
  milky_way: {
    groups: ["stars"],
    radius: 1e18,
    systemRadius: 13e18,
    label: "Milky Way",
    parents: [[Number.NEGATIVE_INFINITY, "observable_universe"]],
    controllers: [{
      type: "fixed",
      position: Pioneer.Vector3.Zero,
      orientation: Pioneer.Quaternion.Identity
    }],
    postCreateFunction: (entity, options) => {
      entity.setCanOcclude(false);
      const fixedController = entity.getController(Pioneer.FixedController);
      if (!fixedController) return;
      const vector3 = new Pioneer.Vector3();
      const poleRightAscension = 192.85948120833 * Math.PI / 180;
      const poleDeclination = 27.12825119444 * Math.PI / 180;
      vector3.x = Math.cos(poleRightAscension) * Math.cos(poleDeclination);
      vector3.y = Math.sin(poleRightAscension) * Math.cos(poleDeclination);
      vector3.z = Math.sin(poleDeclination);
      const galacticCenter = new Pioneer.Vector3();
      const centerRightAscension = 266.40499625 * Math.PI / 180;
      const centerDeclination = -28.93617241667 * Math.PI / 180;
      galacticCenter.x = Math.cos(centerRightAscension) * Math.cos(centerDeclination);
      galacticCenter.y = Math.sin(centerRightAscension) * Math.cos(centerDeclination);
      galacticCenter.z = Math.sin(centerDeclination);
      const quaternion = new Pioneer.Quaternion();
      quaternion.setFromAxes(galacticCenter, void 0, vector3);
      fixedController.setOrientation(quaternion);
      if (options && true === options.milkyWaySprite) {
        const sprite = entity.addComponent(Pioneer.SpriteComponent);
        sprite.setTextureUrl("$STATIC_ASSETS_URL/sprites/milky_way.png");
        sprite.setSize(new Pioneer.Vector2(12e17, 12e17));
        sprite.setTransparent(true);
        sprite.setBlending("normal");
        sprite.setVisibleInterval(new Pioneer.VisibleInterval(12e15, Number.POSITIVE_INFINITY, "z-distance"));
      }
      const spinController = entity.addController(Pioneer.SpinController);
      spinController.setAxis(new Pioneer.Vector3(-.8676661356982597, -.19807638974470915, .45598379452940485), false);
      spinController.setRate(-2192686e-23);
      spinController.setReferenceAngle(0);
      spinController.setReferenceTime(0);
    }
  },
  sun: {
    groups: ["stars"],
    radius: 695500,
    systemRadius: 2991957e7,
    label: "Sun",
    parents: [[Number.NEGATIVE_INFINITY, "milky_way"]],
    spheroid: {
      equatorialRadius: 695500,
      polarRadius: 695500,
      planetographic: false
    },
    spheroidLOD: {
      materialOptions: ["colorMapEmissive"],
      textures: {
        color: {
          url: "sun/color_$SIZE_$FACE.png",
          sizes: [4, 512]
        }
      }
    },
    controllers: [{
      type: "orbitalElements",
      epoch: 0,
      eccentricity: 0,
      semiMajorAxis: 246237071e9,
      meanAngularMotion: -2192686e-23,
      meanAnomalyAtEpoch: Math.PI,
      orientation: new Pioneer.Quaternion(-.48894750765094835, -.4832106839985283, .19625375824756275, .6992297419646486)
    }, {
      type: "fixed",
      orientation: Pioneer.Quaternion.Identity
    }],
    postCreateFunction: (entity, options) => {
      entity.addComponent(Pioneer.LightSourceComponent).setAbsoluteMagnitude(4.83);
      const atmosphere = entity.addComponent(Pioneer.AtmosphereComponent);
      atmosphere.setEmissivity(1);
      atmosphere.setScaleHeight(2e5);
      atmosphere.setDensity(8e-7);
      atmosphere.setColor(new Pioneer.Color(1, 1, 64 / 255));
      const glow = entity.addComponent(Pioneer.SpriteComponent);
      glow.setBillboard(true);
      glow.setTextureUrl("$STATIC_ASSETS_URL/sprites/sun_glow.png");
      glow.setSize(new Pioneer.Vector2(100, 100));
      glow.setSizeUnits("pixels");
      glow.setTransparent(true);
      glow.setColorMultiplier(new Pioneer.Color(1, 1, .5));
      glow.setRenderOrder(-2);
      if (void 0 !== options && true === options.skybox) {
        entity.addComponent(Pioneer.SkyboxComponent).setTextureUrl(`$STATIC_ASSETS_URL/env_maps/starmap_${options.skyboxResolution ?? 2048}.jpg`);
      }
      if (void 0 === options || true === options.skybox && true === options.starfield || false !== options.starfield) {
        entity.addComponent(Pioneer.StarfieldComponent).setUrl("$STATIC_ASSETS_URL/stars/galaxies.0.bin");
        const starfieldSize = options?.starfieldSize;
        for (let starfieldIndex = 0; starfieldIndex < 6; starfieldIndex++) {
          const starfield = entity.addComponent(Pioneer.StarfieldComponent);
          starfield.setUrl(`$STATIC_ASSETS_URL/stars/stars.${starfieldIndex}.bin`);
          if (void 0 !== starfieldSize) {
            starfield.setParticleSize(starfieldSize);
          }
        }
      }
      if (void 0 !== options && true === options.heliosphere) {
        const heliosphere = entity.addComponent(Pioneer.ModelComponent);
        heliosphere.setUrl("$STATIC_ASSETS_URL/models/heliosphere/voyager_heliosphere.gltf");
        heliosphere.setScale(new Pioneer.Vector3(201e6, 19e7, 19e7));
        heliosphere.setForceLoaded(true);
        const latLonAlt = new Pioneer.LatLonAlt(0, -105 * Math.PI / 180, 0);
        const vector3 = new Pioneer.Vector3();
        Pioneer.Geometry.getXYZFromLLAOnSphere(vector3, latLonAlt, 1);
        vector3.rotate(SceneHelpers.SceneHelpers.getEclipJ2000ToJ2000Rotation(), vector3);
        vector3.normalize(vector3);
        const quaternion = new Pioneer.Quaternion();
        quaternion.setFromVectorFromTo(new Pioneer.Vector3(.9937396508197329, .11171728072160429, .0008692392338424033), vector3);
        heliosphere.setRotation(quaternion);
      }
    }
  },
  mercury: {
    groups: ["planets"],
    radius: 2439.4,
    systemRadius: 292764,
    label: "Mercury",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0,
      color: [.6, .6, .6, .7]
    },
    spheroid: {
      equatorialRadius: 2439.4,
      polarRadius: 2439.4,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "mercury/color_$SIZE_$FACE.png",
          sizes: [4, 512, 4096]
        }
      }
    },
    controllers: [{
      type: "dynamo",
      url: "mercury/sun/orb"
    }, {
      type: "dynamo",
      url: "mercury/ori"
    }]
  },
  venus: {
    groups: ["planets"],
    radius: 6051.8,
    systemRadius: 726216,
    label: "Venus",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0,
      color: [.9, .8, .45, .7]
    },
    spheroid: {
      equatorialRadius: 6051.8,
      polarRadius: 6051.8,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "venus/color_$SIZE_$FACE.png",
          sizes: [4, 512]
        }
      }
    },
    controllers: [{
      type: "dynamo",
      url: "venus/sun/orb"
    }, {
      type: "dynamo",
      url: "venus/ori"
    }],
    postCreateFunction: entity => {
      const atmosphere = entity.addComponent(Pioneer.AtmosphereComponent);
      atmosphere.setScaleHeight(15);
      atmosphere.setDensity(.001);
      atmosphere.setColor(new Pioneer.Color(213 / 255, 160 / 255, 94 / 255));
      atmosphere.setSunBrightness(.25);
    }
  },
  earth: {
    groups: ["planets"],
    radius: 6378.1,
    systemRadius: 765372,
    label: "Earth",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0,
      color: [0, .6, .8, .7]
    },
    spheroid: {
      equatorialRadius: 6378.137,
      polarRadius: 6356.752,
      planetographic: true
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "earth/color_$SIZE_$FACE.png",
          sizes: [16, 512, 4096]
        },
        normal: {
          url: "earth/normal_$SIZE_$FACE.png",
          sizes: [16, 512, 4096]
        },
        specular: {
          url: "earth/specular_$SIZE_$FACE.png",
          sizes: [16, 512, 4096]
        },
        night: {
          url: "earth/night_$SIZE_$FACE.png",
          sizes: [16, 512, 4096]
        },
        decal: {
          url: "earth/cloud_$SIZE_$FACE.png",
          sizes: [16, 512, 4096]
        }
      },
      shadowEntities: ["moon"]
    },
    controllers: [{
      type: "dynamo",
      url: "earth/sun/orb"
    }, {
      type: "dynamo",
      url: "earth/ori"
    }],
    postCreateFunction: (entity, options) => {
      if (options && false === options.clouds) {
        const surface = entity.getComponent(Pioneer.SpheroidLODComponent);
        if (!surface) return;
        surface.setTexture("decal", "");
      }
      const atmosphere = entity.addComponent(Pioneer.AtmosphereComponent);
      atmosphere.setScaleHeight(8);
      atmosphere.setDensity(.0015);
      atmosphere.setColor(new Pioneer.Color(214.5 / 255, 267 / 255, 1.5));
      atmosphere.setSunBrightness(2);
      atmosphere.setSunsetColor(new Pioneer.Color(1, .5, 0));
      atmosphere.setSunsetIntensity(1.2);
    }
  },
  mars: {
    groups: ["planets"],
    radius: 3396.2,
    systemRadius: 46922,
    label: "Mars",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0,
      color: [.89, .51, .35, .7]
    },
    spheroid: {
      equatorialRadius: 3396.19,
      polarRadius: 3376.2,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "mars/color_$SIZE_$FACE.png",
          sizes: [4, 512, 4096]
        }
      },
      shadowEntities: ["phobos", "deimos"]
    },
    controllers: [{
      type: "dynamo",
      url: "mars/sun/orb"
    }, {
      type: "dynamo",
      url: "mars/ori"
    }],
    postCreateFunction: entity => {
      const atmosphere = entity.addComponent(Pioneer.AtmosphereComponent);
      atmosphere.setScaleHeight(10.8);
      atmosphere.setDensity(.001);
      atmosphere.setColor(new Pioneer.Color(225 / 255, 178 / 255, 112 / 255));
      atmosphere.setSunBrightness(.8);
      atmosphere.setSunsetColor(new Pioneer.Color(10 / 255, 75 / 255, 140 / 255));
      atmosphere.setSunsetIntensity(1);
      const graphicSpheroid = entity.addComponent(Pioneer.SpheroidComponent, "aero");
      graphicSpheroid.setEquatorialRadius(3396.19);
      graphicSpheroid.setPolarRadius(3376.2);
      graphicSpheroid.setPlanetographic(true);
    }
  },
  jupiter: {
    groups: ["planets"],
    radius: 71492,
    systemRadius: 3782501,
    label: "Jupiter",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0,
      color: [.95, .71, .64, .7]
    },
    spheroid: {
      equatorialRadius: 71492,
      polarRadius: 66854,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "jupiter/color_$SIZE_$FACE.jpg",
          sizes: [16, 512, 4096]
        }
      },
      shadowEntities: ["io", "europa", "ganymede", "callisto"]
    },
    controllers: [{
      type: "dynamo",
      url: "jupiter/sun/orb"
    }, {
      type: "dynamo",
      url: "jupiter/ori"
    }, {
      type: "coverage",
      coverage: [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
      update: entity => {
        if (entity.getOrientation().isNaN()) return;
        const time = entity.getScene().getEngine().getTime();
        const rotations = jupiterRotationTable.rotations;
        let angularRate = (rotations[rotations.length - 1][1] - rotations[rotations.length - 2][1]) / (rotations[rotations.length - 1][0] - rotations[rotations.length - 2][0]);
        let hintIndex = jupiterRotationTable.hintIndex;
        if (time < rotations[hintIndex][0] || hintIndex < rotations.length - 1 && rotations[hintIndex + 1][0] <= time) {
          if (time >= rotations[rotations.length - 1][0]) hintIndex = rotations.length - 1;else if (time < rotations[0][0]) {
            hintIndex = 0;
            angularRate = 0;
          } else for (let rotationIndex = rotations.length - 2; rotationIndex >= 0; rotationIndex--) if (rotations[rotationIndex][0] <= time && time < rotations[rotationIndex + 1][0]) {
            hintIndex = rotationIndex;
            angularRate = (rotations[rotationIndex + 1][1] - rotations[rotationIndex][1]) / (rotations[rotationIndex + 1][0] - rotations[rotationIndex][0]);
          }
        } else if (hintIndex < rotations.length - 1) {
          angularRate = (rotations[hintIndex + 1][1] - rotations[hintIndex][1]) / (rotations[hintIndex + 1][0] - rotations[hintIndex][0]);
        }
        jupiterRotationTable.hintIndex = hintIndex;
        const rotationAngle = rotations[hintIndex][1] + (time - rotations[hintIndex][0]) * angularRate;
        const textureLongitude = Pioneer.MathUtils.wrap(jupiterRotationTable.referenceAngleInSystemIII - (rotationAngle + jupiterRotationTable.textureAngleOffset - jupiterRotationTable.referenceAngleInSystemII) + (time - jupiterRotationTable.referenceTime) * jupiterRotationTable.offsetFactor, 0, 360);
        const surface = entity.getComponent(Pioneer.SpheroidLODComponent);
        if (null !== surface) {
          surface.setLongitudeRotation(Pioneer.MathUtils.degToRad(textureLongitude));
        }
      }
    }],
    postCreateFunction: entity => {
      const atmosphere = entity.addComponent(Pioneer.AtmosphereComponent);
      atmosphere.setScaleHeight(200);
      atmosphere.setDensity(5e-5);
      atmosphere.setColor(new Pioneer.Color(234 / 255, 202 / 255, 170 / 255));
      atmosphere.setSunBrightness(.25);
    }
  },
  saturn: {
    groups: ["planets"],
    radius: 60268,
    systemRadius: 7184413,
    label: "Saturn",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0,
      color: [.72, .65, .52, .7]
    },
    spheroid: {
      equatorialRadius: 60268,
      polarRadius: 54364,
      planetographic: false
    },
    spheroidLOD: {
      materialOptions: ["shadowRings"],
      textures: {
        color: {
          url: "saturn/color_$SIZE_$FACE.png",
          sizes: [4, 512]
        }
      },
      shadowEntities: ["iapetus", "dione", "rhea", "tethys", "titan", "mimas", "enceladus"]
    },
    controllers: [{
      type: "dynamo",
      url: "saturn/sun/orb"
    }, {
      type: "dynamo",
      url: "saturn/ori"
    }],
    postCreateFunction: entity => {
      const rings = entity.addComponent(Pioneer.RingsComponent);
      rings.setInnerRadius(74270.580913);
      rings.setOuterRadius(140478.924731);
      rings.setTopTextureUrl("$STATIC_ASSETS_URL/sprites/saturn_rings_top.png");
      rings.setBottomTextureUrl("$STATIC_ASSETS_URL/sprites/saturn_rings_bottom.png");
      rings.setShadowEntities(["iapetus", "dione", "rhea", "tethys", "titan", "mimas", "enceladus"]);
      const atmosphere = entity.addComponent(Pioneer.AtmosphereComponent);
      atmosphere.setScaleHeight(200);
      atmosphere.setDensity(5e-5);
      atmosphere.setColor(new Pioneer.Color(234 / 255, 202 / 255, 151 / 255));
    }
  },
  uranus: {
    groups: ["planets"],
    radius: 25559,
    systemRadius: 1164893,
    label: "Uranus",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0,
      color: [.67, .92, 1, .7]
    },
    spheroid: {
      equatorialRadius: 25559,
      polarRadius: 24973,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "uranus/color_$SIZE_$FACE.png",
          sizes: [4, 256]
        }
      },
      shadowEntities: ["titania", "oberon", "umbriel", "ariel", "miranda"]
    },
    controllers: [{
      type: "dynamo",
      url: "uranus/sun/orb"
    }, {
      type: "dynamo",
      url: "uranus/ori"
    }],
    postCreateFunction: entity => {
      const rings = entity.addComponent(Pioneer.RingsComponent);
      rings.setInnerRadius(26840);
      rings.setOuterRadius(103e3);
      rings.setTopTextureUrl("$STATIC_ASSETS_URL/sprites/uranus_rings.png");
      rings.setBottomTextureUrl("$STATIC_ASSETS_URL/sprites/uranus_rings.png");
      rings.setShadowEntities(["miranda", "ariel", "umbriel", "titania", "oberon"]);
      const atmosphere = entity.addComponent(Pioneer.AtmosphereComponent);
      atmosphere.setScaleHeight(200);
      atmosphere.setDensity(5e-5);
      atmosphere.setColor(new Pioneer.Color(147 / 255, 183 / 255, 201 / 255));
      atmosphere.setSunsetColor(new Pioneer.Color(164 / 255, 168 / 255, .4));
      atmosphere.setSunsetIntensity(1);
    }
  },
  neptune: {
    groups: ["planets"],
    radius: 24764,
    systemRadius: 43213894,
    label: "Neptune",
    parents: [[Number.NEGATIVE_INFINITY, "sun"]],
    trail: {
      length: void 0,
      color: [.48, .69, 1, .7]
    },
    spheroid: {
      equatorialRadius: 24764,
      polarRadius: 24341,
      planetographic: false
    },
    spheroidLOD: {
      textures: {
        color: {
          url: "neptune/color_$SIZE_$FACE.png",
          sizes: [4, 256]
        }
      },
      shadowEntities: ["triton", "proteus", "despina", "galatea", "larissa"]
    },
    controllers: [{
      type: "dynamo",
      url: "neptune/sun/orb"
    }, {
      type: "dynamo",
      url: "neptune/ori"
    }],
    postCreateFunction: entity => {
      const rings = entity.addComponent(Pioneer.RingsComponent);
      rings.setInnerRadius(40900);
      rings.setOuterRadius(62964);
      rings.setTopTextureUrl("$STATIC_ASSETS_URL/sprites/neptune_rings.png");
      rings.setBottomTextureUrl("$STATIC_ASSETS_URL/sprites/neptune_rings.png");
      const atmosphere = entity.addComponent(Pioneer.AtmosphereComponent);
      atmosphere.setScaleHeight(200);
      atmosphere.setDensity(5e-5);
      atmosphere.setColor(new Pioneer.Color(138 / 255, 160 / 255, 1));
    }
  }
});
const jupiterRotationTable = {
  hintIndex: 0,
  textureAngleOffset: -60.38,
  referenceTime: 617098056,
  referenceAngleInSystemII: 313.47,
  referenceAngleInSystemIII: 305,
  offsetFactor: -3074e-9,
  rotations: [[-1136116758, 15], [-1037534358, 28], [-938951958, 22], [-867931156, 0], [-812721554, 12], [-744292752, 47], [-639143949, 62], [-533822346, 48], [-483883145, 27], [-391953544, 15], [102427264, 85], [315576066, 138], [615211269, 312], [660052869, 347]]
};
