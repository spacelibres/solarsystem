/** @eyes-analysis
 * 文件职责：2024 日全食故事定义：地理城市/遮挡百分比标记、日食时间段、视角与贴图切换。
 * 依据：import ../pioneer/index.js；import ../solar-system/public-api.js
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1705346-1714327.
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
let defaultExport;
const o = {
  layers: []
};
const r = "2024-04-08T15:40:00Z";
let a;
let l;
let c;
let h;
let d;
let u;
let p;
let _;
let m;
let g;
let y;
let f;
const T = {
  Mazatlan: {
    text: "Mazatlan",
    latLng: [23.24923710314604, -106.40993819539558]
  },
  Durango: {
    text: "Durango",
    latLng: [24.02441384699334, -104.66984097026072]
  },
  "San Antonio": {
    text: "San Antonio",
    latLng: [29.420047396623932, -98.57519484659794]
  },
  Austin: {
    text: "Austin",
    latLng: [30.263780185402428, -97.75987715008797]
  },
  Dallas: {
    text: "Dallas",
    latLng: [32.77380380404552, -96.79954491353796]
  },
  "Little Rock": {
    text: "Little Rock",
    latLng: [34.74290714935434, -92.29046361128361]
  },
  Indianapolis: {
    text: "Indianapolis",
    latLng: [39.76489045302965, -86.17327537195442]
  },
  Buffalo: {
    text: "Buffalo",
    latLng: [42.88564478789335, -78.88023833127143]
  },
  Montreal: {
    text: "Montreal",
    latLng: [45.50519157056544, -73.56425672504801]
  }
};
const b = {
  top_left_50: {
    text: "50%",
    latLng: [6.4, -162]
  },
  top_left_75: {
    text: "75%",
    latLng: [-.4, -159.7]
  },
  top_left_95: {
    text: "95%",
    latLng: [-5.3, -157.8]
  },
  left_100: {
    text: "100%",
    latLng: [-7.5, -157.4]
  },
  bottom_left_95: {
    text: "95%",
    latLng: [-9.5, -157]
  },
  bottom_left_75: {
    text: "75%",
    latLng: [-14.6, -155.4]
  },
  bottom_left_50: {
    text: "50%",
    latLng: [-20.5, -153.9]
  },
  top_right_50: {
    text: "50%",
    latLng: [62.2, -13.2]
  },
  top_right_75: {
    text: "75%",
    latLng: [55.1, -17.9]
  },
  top_right_95: {
    text: "95%",
    latLng: [50, -20.3]
  },
  right_100: {
    text: "100%",
    latLng: [47.7, -20.9]
  },
  bottom_right_95: {
    text: "95%",
    latLng: [45.7, -21.9]
  },
  bottom_right_75: {
    text: "75%",
    latLng: [40.8, -23.6]
  },
  bottom_right_50: {
    text: "50%",
    latLng: [34.7, -24.9]
  }
};
defaultExport = {
  type: "nonsequential",
  entities: ["earth", "moon"],
  onEnter: async t => {
    const layerManager = t.getManager("layer");
    const layerPanelComponent = t.getComponent("layerPanel");
    t.getManager("time").resetLimits();
    const r = t.scene.getEntity("earth");
    if (["asteroids", "comets", "dwarfPlanets", "minorMoons", "spacecraft", "planets"].forEach(t => {
      layerManager.getLayer(t).visible && (o.layers.push(t), layerPanelComponent.toggleLayer(t));
    }), y = r.getComponent(Pioneer.SpheroidLODComponent), f = r.getComponent(Pioneer.SpheroidComponent), r.getComponent(SolarSystemSceneExports.WMTSComponent)) {
      const t = r.getComponent(SolarSystemSceneExports.WMTSComponent);
      r.removeComponent(t);
      y.setEnabled(true);
    }
    a = y.getTextureUrl("decal");
    l = y.getTextureSizes("decal");
    c = y.getTextureUrl("color");
    h = y.getTextureSizes("color");
    d = y.getTextureUrl("night");
    u = y.getTextureSizes("night");
    p = y.getTextureUrl("specular");
    _ = y.getTextureSizes("specular");
    m = r.getComponent(Pioneer.AtmosphereComponent).getDensity();
    g = new Pioneer.Color();
    g.copy(t.scene.getAmbientLightColor());
    y.setTexture("night", "", "");
    y.setTexture("specular", "", [1024]);
    y.setTexture("decal", "https://eyes.nasa.gov/apps/solar-system/assets/images/2024_eclipse_contour/eclipse_contour_$SIZE_$FACE.png", [1024]);
    y.setTexture("color", "https://eyes.nasa.gov/apps/solar-system/assets/images/stories/annular_solar_eclipse/earth_color_$FACE.png", [1024]);
    r.getComponent(Pioneer.AtmosphereComponent).setDensity(1e-4);
    t.scene.setAmbientLightColor(new Pioneer.Color(.125, .125, .125));
    S(t, "contour_map_group", b, false);
    S(t, "city_placemarks_group", T, true);
    E(t);
  },
  onLeave: t => {
    const {
      layers: layers
    } = o;
    const layerPanelComponent = t.getComponent("layerPanel");
    t.getManager("time").resetLimits();
    for (let t = 0; t < layers.length; t++) layerPanelComponent.toggleLayer(layers[t]);
    o.layers = [];
    const r = t.scene.getEntity("moon");
    r.removeComponent(r.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConeUmbra"));
    r.removeComponent(r.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConePenumbra"));
    v(t, "contour_map_group", false);
    C(t);
    y.setTexture("decal", a, l);
    y.setTexture("color", c, h);
    y.setTexture("night", d, u);
    y.setTexture("specular", p, _);
    t.scene.getEntity("earth").getComponent(Pioneer.AtmosphereComponent).setDensity(m);
    t.scene.setAmbientLightColor(g);
    t.scene.removeEntity("contour_map_group");
    t.scene.removeEntity("city_placemarks_group");
  },
  slides: [{
    id: "slide_1",
    type: "panel",
    content: [{
      type: "description",
      title: "Total Solar Eclipse",
      description: "On April 8, 2024, a total solar eclipse crossed North and Central America and created a path of totality.",
      more: "During a total solar eclipse, the Moon completely blocks the Sun while it passes between the Sun and Earth. The sky darkens as if it were dawn or dusk and those standing in the path of totality may see the Sun's outer atmosphere (the corona) if weather permits."
    }, {
      type: "buttons",
      blockTitle: "Select your view",
      buttonContent: [{
        id: "earth",
        label: "Earth",
        iconSrc: "https://eyes.nasa.gov/apps/solar-system/assets/images/cards/eclipse_view_earth_icon.png",
        onClick: async t => {
          v(t, "contour_map_group");
          v(t, "city_placemarks_group");
          C(t);
          E(t);
          y.setTexture("decal", "https://eyes.nasa.gov/apps/solar-system/assets/images/2024_eclipse_contour/eclipse_contour_$SIZE_$FACE.png", [1024]);
          t.getComponent("story").getStoryBlock("checkboxes").setChecked("shadow_cones", true);
          await t.cameraScripts.alignObjects("earth", "sun", {
            distance: 28e3,
            horizontalOffset: 155,
            verticalOffset: 30
          });
        }
      }, {
        id: "behind-moon",
        label: "Behind Moon",
        iconSrc: "https://eyes.nasa.gov/apps/solar-system/assets/images/cards/eclipse_view_behind_moon_icon.png",
        onClick: async t => {
          v(t, "contour_map_group", false);
          v(t, "city_placemarks_group", false);
          C(t);
          await t.cameraScripts.alignObjects("moon", "earth", {
            distance: 1e4,
            horizontalOffset: -15,
            verticalOffset: 10
          });
        }
      }, {
        id: "earth-moon",
        label: "Earth-Moon",
        iconSrc: "https://eyes.nasa.gov/apps/solar-system/assets/images/cards/eclipse_view_earth_moon_icon.png",
        onClick: async t => {
          const e = t.scene.getEntity("earth");
          if (v(t, "contour_map_group", false), v(t, "city_placemarks_group", false), await t.cameraScripts.alignObjects("earth", "moon", {
            distance: 12e5,
            horizontalOffset: -90,
            verticalOffset: 10
          }), !t.scene.getEntity("earthEcliptic")) {
            const i = t.scene.addEntity("earthEcliptic");
            i.setParent(e);
            i.setPosition(Pioneer.Vector3.Zero);
            const quaternion = new Pioneer.Quaternion();
            e.getController(Pioneer.DynamoController).getOrbitOrientation(quaternion, t.pioneer.getTime());
            i.setOrientation(quaternion);
            const r = i.addComponent(SolarSystemSceneExports.AnnulusComponent, "annulus");
            r.setInnerRadius(0);
            r.setOuterRadius(42e4);
            r.setVisibleInterval(new Pioneer.VisibleInterval(0, 3e6, "z-distance"));
            r.setColor(new Pioneer.Color(110, 110, 110, .1));
          }
        }
      }, {
        id: "sun-earth-moon",
        label: "Sun-Earth-Moon",
        iconSrc: "https://eyes.nasa.gov/apps/solar-system/assets/images/cards/eclipse_view_sun_earth_moon_icon.png",
        onClick: t => {
          v(t, "contour_map_group", false);
          v(t, "city_placemarks_group", false);
          C(t);
          t.cameraScripts.alignObjects("earth", "sun", {
            distance: 1e6,
            horizontalOffset: -5,
            verticalOffset: 10
          });
        }
      }],
      clickable: true
    }, {
      type: "checkboxes",
      checkboxBlockTitle: "More Options",
      checkboxContent: [{
        id: "city_placemarks",
        label: "Display Cities",
        onChange: (t, e) => {
          v(e, "city_placemarks_group", t.target.checked);
        }
      }, {
        id: "shadow_cones",
        label: "Enable Shadow Cones",
        onChange: (t, e) => {
          if (t.target.checked) E(e);else {
            const t = e.scene.getEntity("moon");
            t.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConeUmbra").setEnabled(false);
            t.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConePenumbra").setEnabled(false);
          }
        }
      }, {
        id: "contour_map",
        label: "Enable Contour Map",
        onChange: (t, e) => {
          const i = t.target.checked ? "https://eyes.nasa.gov/apps/solar-system/assets/images/2024_eclipse_contour/eclipse_contour_$SIZE_$FACE.png" : "";
          y.setTexture("decal", i, [1024]);
          v(e, "contour_map_group", t.target.checked);
        }
      }]
    }],
    time: r,
    timeLimits: {
      min: r,
      max: "2024-04-08T20:50:00Z"
    },
    camera: [async (t, e) => {
      await t.cameraScripts.goToSystem("inner_solar_system");
      e() || (await t.scene.waitTillEntitiesInPlace(["sun", "earth"]), await t.cameraScripts.alignObjects("earth", "sun", {
        distance: 28e3,
        horizontalOffset: 155,
        verticalOffset: 30
      }), e() || (await t.scene.waitTillEntitiesInPlace(["moon"]), E(t), t.getManager("time").setTimeRate(300)));
    }]
  }]
};
const E = t => {
  const e = t.scene.getEntity("moon");
  let i = e.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConeUmbra");
  let o = e.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConePenumbra");
  i && o ? (i.setEnabled(true), o.setEnabled(true)) : (i = e.addComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConeUmbra"), o = e.addComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConePenumbra"), i.setSourceEntity("sun"), i.setTargetEntity("earth"), i.setColor(new Pioneer.Color(.437, .18, .593, .25)), o.setSourceEntity("sun"), o.setTargetEntity("earth"), o.setShadowType("penumbra"), o.setColor(new Pioneer.Color(.218, .093, .3, .3)));
};
const S = (t, e, i, o = false) => {
  const r = t.scene.getEntity("earth");
  const a = t.scene.getEntity(e) || t.scene.addEntity(e);
  a.setParent(r);
  a.setCanOcclude(false);
  a.setOcclusionRadius(r.getOcclusionRadius());
  const l = a.addController(Pioneer.FixedController);
  l.setPosition(Pioneer.Vector3.Zero);
  l.setOrientation(Pioneer.Quaternion.Identity);
  a.addController(Pioneer.RotateByEntityOrientationController);
  for (const e in i) {
    const l = i[e];
    const c = 10;
    const h = t.scene.getEntity(e) || SolarSystemSceneExports.Placemarks.addPlacemark(e, l.text, r, l.latLng[0], l.latLng[1], c);
    h.setEnabled(true);
    h.setParent(a);
    const d = h.getComponent(Pioneer.DivComponent).getDiv();
    if (d.id = e, d.classList.add("placemark"), h.getComponent(Pioneer.DivComponent).setAlignment(new Pioneer.Vector2(-.25, .6)), d.classList.remove("pioneer-label-div"), o) {
      const i = t.scene.getEntity(`${e}_placemark_icon`) || SolarSystemSceneExports.Placemarks.addPlacemark(`${e}_placemark_icon`, "", r, l.latLng[0], l.latLng[1], 0);
      i.setEnabled(true);
      i.setParent(a);
      const o = i.getComponent(Pioneer.DivComponent).getDiv();
      o.classList.add("placemark");
      o.classList.remove("pioneer-label-div");
      o.innerHTML = "<div class=\"pin\"><img class=\"no-drag\" style=\"width: 10px\" src=\"https://eyes.nasa.gov/apps/solar-system/assets/images/map_marker.svg\"></div><div class=\"content\"></div>";
    }
  }
  a.setEnabled(true);
};
const v = (t, e, i = true) => {
  t.scene.getEntity(e)?.setEnabled(i);
  const s = e.split("_group")[0];
  if (s) {
    const {
      checkboxContent: checkboxContent
    } = t.getComponent("story").getStoryBlock("checkboxes").options.config.info;
    Object.values(checkboxContent)?.forEach(e => {
      t.getComponent("story").getStoryBlock("checkboxes")?.setChecked(s, i);
    });
  }
};
const C = t => {
  t.scene.getEntity("earthEcliptic") && t.scene.removeEntity("earthEcliptic");
};
export { defaultExport as default };
