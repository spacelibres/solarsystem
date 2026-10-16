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
    postCreateFunction: t => {
      t.setCanOcclude(false);
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
    postCreateFunction: (t, e) => {
      t.setCanOcclude(false);
      const i = t.getController(Pioneer.FixedController);
      if (!i) return;
      const vector3 = new Pioneer.Vector3();
      const o = 192.85948120833 * Math.PI / 180;
      const r = 27.12825119444 * Math.PI / 180;
      vector3.x = Math.cos(o) * Math.cos(r);
      vector3.y = Math.sin(o) * Math.cos(r);
      vector3.z = Math.sin(r);
      const a = new Pioneer.Vector3();
      const l = 266.40499625 * Math.PI / 180;
      const c = -28.93617241667 * Math.PI / 180;
      a.x = Math.cos(l) * Math.cos(c);
      a.y = Math.sin(l) * Math.cos(c);
      a.z = Math.sin(c);
      const quaternion = new Pioneer.Quaternion();
      if (quaternion.setFromAxes(a, void 0, vector3), i.setOrientation(quaternion), e && true === e.milkyWaySprite) {
        const e = t.addComponent(Pioneer.SpriteComponent);
        e.setTextureUrl("$STATIC_ASSETS_URL/sprites/milky_way.png");
        e.setSize(new Pioneer.Vector2(12e17, 12e17));
        e.setTransparent(true);
        e.setBlending("normal");
        e.setVisibleInterval(new Pioneer.VisibleInterval(12e15, Number.POSITIVE_INFINITY, "z-distance"));
      }
      const d = t.addController(Pioneer.SpinController);
      d.setAxis(new Pioneer.Vector3(-.8676661356982597, -.19807638974470915, .45598379452940485), false);
      d.setRate(-2192686e-23);
      d.setReferenceAngle(0);
      d.setReferenceTime(0);
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
    postCreateFunction: (t, e) => {
      t.addComponent(Pioneer.LightSourceComponent).setAbsoluteMagnitude(4.83);
      const i = t.addComponent(Pioneer.AtmosphereComponent);
      i.setEmissivity(1);
      i.setScaleHeight(2e5);
      i.setDensity(8e-7);
      i.setColor(new Pioneer.Color(1, 1, 64 / 255));
      const n = t.addComponent(Pioneer.SpriteComponent);
      if (n.setBillboard(true), n.setTextureUrl("$STATIC_ASSETS_URL/sprites/sun_glow.png"), n.setSize(new Pioneer.Vector2(100, 100)), n.setSizeUnits("pixels"), n.setTransparent(true), n.setColorMultiplier(new Pioneer.Color(1, 1, .5)), n.setRenderOrder(-2), void 0 !== e && true === e.skybox) {
        t.addComponent(Pioneer.SkyboxComponent).setTextureUrl(`$STATIC_ASSETS_URL/env_maps/starmap_${e.skyboxResolution ?? 2048}.jpg`);
      }
      if (void 0 === e || true === e.skybox && true === e.starfield || false !== e.starfield) {
        t.addComponent(Pioneer.StarfieldComponent).setUrl("$STATIC_ASSETS_URL/stars/galaxies.0.bin");
        const i = e?.starfieldSize;
        for (let e = 0; e < 6; e++) {
          const n = t.addComponent(Pioneer.StarfieldComponent);
          n.setUrl(`$STATIC_ASSETS_URL/stars/stars.${e}.bin`);
          void 0 !== i && n.setParticleSize(i);
        }
      }
      if (void 0 !== e && true === e.heliosphere) {
        const e = t.addComponent(Pioneer.ModelComponent);
        e.setUrl("$STATIC_ASSETS_URL/models/heliosphere/voyager_heliosphere.gltf");
        e.setScale(new Pioneer.Vector3(201e6, 19e7, 19e7));
        e.setForceLoaded(true);
        const latLonAlt = new Pioneer.LatLonAlt(0, -105 * Math.PI / 180, 0);
        const vector3 = new Pioneer.Vector3();
        Pioneer.Geometry.getXYZFromLLAOnSphere(vector3, latLonAlt, 1);
        vector3.rotate(SceneHelpers.SceneHelpers.getEclipJ2000ToJ2000Rotation(), vector3);
        vector3.normalize(vector3);
        const quaternion = new Pioneer.Quaternion();
        quaternion.setFromVectorFromTo(new Pioneer.Vector3(.9937396508197329, .11171728072160429, .0008692392338424033), vector3);
        e.setRotation(quaternion);
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
    postCreateFunction: t => {
      const e = t.addComponent(Pioneer.AtmosphereComponent);
      e.setScaleHeight(15);
      e.setDensity(.001);
      e.setColor(new Pioneer.Color(213 / 255, 160 / 255, 94 / 255));
      e.setSunBrightness(.25);
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
    postCreateFunction: (t, e) => {
      if (e && false === e.clouds) {
        const e = t.getComponent(Pioneer.SpheroidLODComponent);
        if (!e) return;
        e.setTexture("decal", "");
      }
      const i = t.addComponent(Pioneer.AtmosphereComponent);
      i.setScaleHeight(8);
      i.setDensity(.0015);
      i.setColor(new Pioneer.Color(214.5 / 255, 267 / 255, 1.5));
      i.setSunBrightness(2);
      i.setSunsetColor(new Pioneer.Color(1, .5, 0));
      i.setSunsetIntensity(1.2);
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
    postCreateFunction: t => {
      const e = t.addComponent(Pioneer.AtmosphereComponent);
      e.setScaleHeight(10.8);
      e.setDensity(.001);
      e.setColor(new Pioneer.Color(225 / 255, 178 / 255, 112 / 255));
      e.setSunBrightness(.8);
      e.setSunsetColor(new Pioneer.Color(10 / 255, 75 / 255, 140 / 255));
      e.setSunsetIntensity(1);
      const i = t.addComponent(Pioneer.SpheroidComponent, "aero");
      i.setEquatorialRadius(3396.19);
      i.setPolarRadius(3376.2);
      i.setPlanetographic(true);
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
      update: t => {
        if (t.getOrientation().isNaN()) return;
        const e = t.getScene().getEngine().getTime();
        const i = r.rotations;
        let n = (i[i.length - 1][1] - i[i.length - 2][1]) / (i[i.length - 1][0] - i[i.length - 2][0]);
        let o = r.hintIndex;
        if (e < i[o][0] || o < i.length - 1 && i[o + 1][0] <= e) {
          if (e >= i[i.length - 1][0]) o = i.length - 1;else if (e < i[0][0]) {
            o = 0;
            n = 0;
          } else for (let t = i.length - 2; t >= 0; t--) i[t][0] <= e && e < i[t + 1][0] && (o = t, n = (i[t + 1][1] - i[t][1]) / (i[t + 1][0] - i[t][0]));
        } else o < i.length - 1 && (n = (i[o + 1][1] - i[o][1]) / (i[o + 1][0] - i[o][0]));
        r.hintIndex = o;
        const a = i[o][1] + (e - i[o][0]) * n;
        const l = Pioneer.MathUtils.wrap(r.referenceAngleInSystemIII - (a + r.textureAngleOffset - r.referenceAngleInSystemII) + (e - r.referenceTime) * r.offsetFactor, 0, 360);
        const c = t.getComponent(Pioneer.SpheroidLODComponent);
        null !== c && c.setLongitudeRotation(Pioneer.MathUtils.degToRad(l));
      }
    }],
    postCreateFunction: t => {
      const e = t.addComponent(Pioneer.AtmosphereComponent);
      e.setScaleHeight(200);
      e.setDensity(5e-5);
      e.setColor(new Pioneer.Color(234 / 255, 202 / 255, 170 / 255));
      e.setSunBrightness(.25);
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
    postCreateFunction: t => {
      const e = t.addComponent(Pioneer.RingsComponent);
      e.setInnerRadius(74270.580913);
      e.setOuterRadius(140478.924731);
      e.setTopTextureUrl("$STATIC_ASSETS_URL/sprites/saturn_rings_top.png");
      e.setBottomTextureUrl("$STATIC_ASSETS_URL/sprites/saturn_rings_bottom.png");
      e.setShadowEntities(["iapetus", "dione", "rhea", "tethys", "titan", "mimas", "enceladus"]);
      const i = t.addComponent(Pioneer.AtmosphereComponent);
      i.setScaleHeight(200);
      i.setDensity(5e-5);
      i.setColor(new Pioneer.Color(234 / 255, 202 / 255, 151 / 255));
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
    postCreateFunction: t => {
      const e = t.addComponent(Pioneer.RingsComponent);
      e.setInnerRadius(26840);
      e.setOuterRadius(103e3);
      e.setTopTextureUrl("$STATIC_ASSETS_URL/sprites/uranus_rings.png");
      e.setBottomTextureUrl("$STATIC_ASSETS_URL/sprites/uranus_rings.png");
      e.setShadowEntities(["miranda", "ariel", "umbriel", "titania", "oberon"]);
      const i = t.addComponent(Pioneer.AtmosphereComponent);
      i.setScaleHeight(200);
      i.setDensity(5e-5);
      i.setColor(new Pioneer.Color(147 / 255, 183 / 255, 201 / 255));
      i.setSunsetColor(new Pioneer.Color(164 / 255, 168 / 255, .4));
      i.setSunsetIntensity(1);
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
    postCreateFunction: t => {
      const e = t.addComponent(Pioneer.RingsComponent);
      e.setInnerRadius(40900);
      e.setOuterRadius(62964);
      e.setTopTextureUrl("$STATIC_ASSETS_URL/sprites/neptune_rings.png");
      e.setBottomTextureUrl("$STATIC_ASSETS_URL/sprites/neptune_rings.png");
      const i = t.addComponent(Pioneer.AtmosphereComponent);
      i.setScaleHeight(200);
      i.setDensity(5e-5);
      i.setColor(new Pioneer.Color(138 / 255, 160 / 255, 1));
    }
  }
});
const r = {
  hintIndex: 0,
  textureAngleOffset: -60.38,
  referenceTime: 617098056,
  referenceAngleInSystemII: 313.47,
  referenceAngleInSystemIII: 305,
  offsetFactor: -3074e-9,
  rotations: [[-1136116758, 15], [-1037534358, 28], [-938951958, 22], [-867931156, 0], [-812721554, 12], [-744292752, 47], [-639143949, 62], [-533822346, 48], [-483883145, 27], [-391953544, 15], [102427264, 85], [315576066, 138], [615211269, 312], [660052869, 347]]
};
