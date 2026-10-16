// Recovered from app.js:1698304-1705345.
import * as Pioneer from "../pioneer/index.js";
import * as SolarSystemSceneExports from "../solar-system/public-api.js";
let defaultExport;
const o = {
  layers: []
};
let r;
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
let T;
let b = false;
let E = true;
const S = [];
function v() {
  let t = y.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConeUmbra");
  let e = y.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConePenumbra");
  t && e || (t = y.addComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConeUmbra"), e = y.addComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConePenumbra"));
  t.setSourceEntity("sun");
  t.setTargetEntity("earth");
  t.setColor(new Pioneer.Color(.437, .18, .593, .25));
  e.setSourceEntity("sun");
  e.setTargetEntity("earth");
  e.setShadowType("penumbra");
  e.setColor(new Pioneer.Color(.218, .093, .3, .3));
}
function C() {
  for (const t of S) t.style.display = "none";
}
function x() {
  if (E) for (const t of S) t.style.display = "block";
}
defaultExport = {
  type: "nonsequential",
  entities: ["moon"],
  onEnter: async t => {
    const layerManager = t.getManager("layer");
    const layerPanelComponent = t.getComponent("layerPanel");
    t.getManager("time").resetLimits();
    ["asteroids", "comets", "dwarfPlanets", "minorMoons", "spacecraft", "planets", "majorMoons"].forEach(t => {
      layerManager.getLayer(t).visible && (o.layers.push(t), layerPanelComponent.toggleLayer(t));
    });
    t.pioneer.getScene("main").getEntity("earth").isEnabled(true);
  },
  onLeave: t => {
    const {
      layers: layers
    } = o;
    const layerPanelComponent = t.getComponent("layerPanel");
    t.getManager("time").resetLimits();
    for (let t = 0; t < layers.length; t++) layerPanelComponent.toggleLayer(layers[t]);
    o.layers = [];
  },
  slides: [{
    id: "slide_1",
    type: "panel",
    content: [{
      type: "description",
      title: "Annular Solar Eclipse",
      description: "On October 14, 2023, an annular solar eclipse crossed North, Central, and South America creating a path of annularity.",
      more: 'An annular solar eclipse occurs when the Moon passes between the Sun and Earth while at its farthest point from Earth. Because the Moon is farther away from Earth, it does not completely block the Sun. This creates a "ring of fire" effect in the sky for those standing in the path of annularity. During an annular eclipse, it is never safe to look directly at the Sun without specialized eye protection designed for solar viewing.'
    }, {
      type: "buttons",
      blockTitle: "Select your view",
      buttonContent: [{
        id: "earth",
        label: "Earth",
        iconSrc: "https://eyes.nasa.gov/apps/solar-system/assets/images/cards/eclipse_view_earth_icon.png",
        onClick: () => {
          x();
          b = false;
          app.cameraScripts.alignObjects("earth", "sun", {
            distance: 28e3,
            horizontalOffset: 150
          });
        }
      }, {
        id: "behind-moon",
        label: "Behind Moon",
        iconSrc: "https://eyes.nasa.gov/apps/solar-system/assets/images/cards/eclipse_view_behind_moon_icon.png",
        onClick: async () => {
          C();
          b = true;
          app.cameraScripts.alignObjects("moon", "earth", {
            distance: 1e4,
            horizontalOffset: -15,
            verticalOffset: 10
          });
        }
      }, {
        id: "earth-moon",
        label: "Earth-Moon",
        iconSrc: "https://eyes.nasa.gov/apps/solar-system/assets/images/cards/eclipse_view_earth_moon_icon.png",
        onClick: () => {
          x();
          b = false;
          app.cameraScripts.alignObjects("earth", "moon", {
            distance: 12e5,
            horizontalOffset: -90,
            verticalOffset: 10
          });
        }
      }, {
        id: "sun-earth-moon",
        label: "Sun-Earth-Moon",
        iconSrc: "https://eyes.nasa.gov/apps/solar-system/assets/images/cards/eclipse_view_sun_earth_moon_icon.png",
        onClick: () => {
          x();
          b = false;
          app.cameraScripts.alignObjects("earth", "sun", {
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
        label: "Enable Shadow Cones",
        onChange: t => {
          t.target.checked ? v() : (y.removeComponent(y.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConeUmbra")), y.removeComponent(y.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConePenumbra")));
        }
      }, {
        label: "Enable Contour Map",
        onChange: t => {
          t.target.checked ? (E = true, f.setTexture("decal", "https://eyes.nasa.gov/apps/solar-system/assets/images/stories/annular_solar_eclipse/eclipse_$SIZE_$FACE.png", [1024]), b || x()) : (E = false, f.setTexture("decal", "", [1024]), C());
        }
      }]
    }],
    time: "2023-10-14T14:50:00Z",
    timeLimits: {
      min: "2023-10-14T14:50:00Z",
      max: "2023-10-14T23:00:00Z"
    },
    onLeave: t => {
      y.removeComponent(y.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConeUmbra"));
      y.removeComponent(y.getComponent(SolarSystemSceneExports.ShadowConeComponent, "shadowConePenumbra"));
      C();
      f.setTexture("decal", r, a);
      f.setTexture("color", l, c);
      f.setTexture("night", h, d);
      f.setTexture("specular", u, p);
      g.getComponent(Pioneer.AtmosphereComponent).setDensity(_);
      t.scene.setAmbientLightColor(m);
      t.scene.removeEntity("top_left_35");
      t.scene.removeEntity("top_left_60");
      t.scene.removeEntity("top_left_85");
      t.scene.removeEntity("bottom_left_85");
      t.scene.removeEntity("bottom_left_60");
      t.scene.removeEntity("bottom_left_35");
      t.scene.removeEntity("top_right_35");
      t.scene.removeEntity("top_right_60");
      t.scene.removeEntity("top_right_85");
      t.scene.removeEntity("bottom_right_85");
      t.scene.removeEntity("bottom_right_60");
      t.scene.removeEntity("bottom_right_35");
      S.length = 0;
    },
    camera: [async t => {
      if (await t.cameraScripts.goToSystem("inner_solar_system"), g = t.scene.getEntity("earth"), y = t.scene.getEntity("moon"), f = g.getComponent(Pioneer.SpheroidLODComponent), T = g.getComponent(Pioneer.SpheroidComponent), g.getComponent(SolarSystemSceneExports.WMTSComponent)) {
        const t = g.getComponent(SolarSystemSceneExports.WMTSComponent);
        g.removeComponent(t);
        f.setEnabled(true);
      }
      if (r = f.getTextureUrl("decal"), a = f.getTextureSizes("decal"), l = f.getTextureUrl("color"), c = f.getTextureSizes("color"), h = f.getTextureUrl("night"), d = f.getTextureSizes("night"), u = f.getTextureUrl("specular"), p = f.getTextureSizes("specular"), _ = g.getComponent(Pioneer.AtmosphereComponent).getDensity(), m = new Pioneer.Color(), m.copy(t.scene.getAmbientLightColor()), v(), 0 === S.length) {
        S.push(SolarSystemSceneExports.Placemarks.addPlacemark("top_left_35", "35%", g, 68.4, -140, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        S.push(SolarSystemSceneExports.Placemarks.addPlacemark("top_left_60", "60%", g, 59.3, -141.9, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        S.push(SolarSystemSceneExports.Placemarks.addPlacemark("top_left_85", "85%", g, 51.5, -143.5, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        S.push(SolarSystemSceneExports.Placemarks.addPlacemark("bottom_left_85", "85%", g, 46.7, -144, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        S.push(SolarSystemSceneExports.Placemarks.addPlacemark("bottom_left_60", "60%", g, 39.4, -145.3, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        S.push(SolarSystemSceneExports.Placemarks.addPlacemark("bottom_left_35", "35%", g, 32, -146.7, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        S.push(SolarSystemSceneExports.Placemarks.addPlacemark("top_right_35", "35%", g, 13.4, -33.7, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        S.push(SolarSystemSceneExports.Placemarks.addPlacemark("top_right_60", "60%", g, 4.3, -33.2, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        S.push(SolarSystemSceneExports.Placemarks.addPlacemark("top_right_85", "85%", g, -3.6, -32.6, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        S.push(SolarSystemSceneExports.Placemarks.addPlacemark("bottom_right_85", "85%", g, -8.2, -32.3, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        S.push(SolarSystemSceneExports.Placemarks.addPlacemark("bottom_right_60", "60%", g, -15.7, -32, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        S.push(SolarSystemSceneExports.Placemarks.addPlacemark("bottom_right_35", "35%", g, -23.2, -31.4, 0, false).getComponent(Pioneer.DivComponent).getDiv());
        for (const t of S) t.style.fontSize = ".75em";
      } else x();
      f.setTexture("decal", "https://eyes.nasa.gov/apps/solar-system/assets/images/stories/annular_solar_eclipse/eclipse_$SIZE_$FACE.png", [1024]);
      f.setTexture("color", "https://eyes.nasa.gov/apps/solar-system/assets/images/stories/annular_solar_eclipse/earth_color_$FACE.png", [1024]);
      f.setTexture("night", "", "");
      f.setTexture("specular", "", [1024]);
      g.getComponent(Pioneer.AtmosphereComponent).setDensity(1e-4);
      t.scene.setAmbientLightColor(new Pioneer.Color(.125, .125, .125));
      await t.cameraScripts.alignObjects("earth", "sun", {
        distance: 28e3,
        horizontalOffset: 150
      });
      t.pioneer.getScene("main").waitTillEntitiesInPlace(["earth", "moon"], t.pioneer.getTime(), 10).then(() => (t.getManager("time").setTimeRate(300), true)).catch(t => {
        console.warn(t);
      });
    }]
  }]
};
export { defaultExport as default };
