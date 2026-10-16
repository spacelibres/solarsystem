/** @eyes-analysis
 * 文件职责：高清地表影像配置表，包含地球 VIIRS、火星 Viking、月球 LRO 的 WMTS 图源。
 * 依据：顶层副作用 defaultExport={earth:[{id:"viirs",title:"High-quality global mosaic from yesterday",description:"This daily global mosaic is from the Visible Infrared Imaging Radiometer Suite (VIIRS), which is one of the key instruments；实际标题：High-quality global mosaic from yesterday；Global mosaic from the Viking missions to Mars；Global mosaic from the Lunar Reconnaissance Orbiter mission；Surface imagery of Titan from Cassini's Imaging Science Subsystem camera；Radar Map of Titan's Surface；Radar Map of the Surface of Venus
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from app.js:1346499-1348873.
let defaultExport;
defaultExport = {
  earth: [{
    id: "viirs",
    title: "High-quality global mosaic from yesterday",
    description: "This daily global mosaic is from the Visible Infrared Imaging Radiometer Suite (VIIRS), which is one of the key instruments onboard the Suomi National Polar-Orbiting Partnership (Suomi NPP) spacecraft.",
    type: "wmts",
    features: ["shadowEntities", "atmosphere"],
    endPoint: "https://eyes.nasa.gov/apps/solar-system/assets/wmts_xml",
    layer: "VIIRS_SNPP_CorrectedReflectance_TrueColor",
    tile: "250m",
    time: "yesterday",
    wmtsManifest: "$DYNAMIC_ASSETS_URL/earth/data/visibleEarth/dataset_manifest.json",
    fallbacks: [{
      endPoint: "https://eyes.nasa.gov/apps/solar-system/assets/wmts_xml_noaa_20",
      layer: "VIIRS_NOAA20_CorrectedReflectance_TrueColor"
    }, {
      endPoint: "https://eyes.nasa.gov/apps/solar-system/assets/wmts_xml_noaa_21",
      layer: "VIIRS_NOAA21_CorrectedReflectance_TrueColor"
    }]
  }],
  mars: [{
    id: "vikingMosaic",
    title: "Global mosaic from the Viking missions to Mars",
    description: "The two Mars Viking Orbiters imaged the entire surface of Mars at a resolution of 150 to 300 meters.",
    type: "wmts",
    features: ["shadowEntities", "atmosphere"],
    endPoint: "https://trek.nasa.gov/tiles/Mars/EQ/corrected/Mars_Viking_MDIM21_ClrMosaic_global_232m",
    layer: "Mars_Viking_MDIM21_ClrMosaic_global_232m"
  }],
  moon: [{
    id: "lroMosaic",
    title: "Global mosaic from the Lunar Reconnaissance Orbiter mission",
    description: "The wide-angle camera on LRO mapped the entire moon at 100 meters/pixel.",
    type: "wmts",
    features: ["shadowEntities"],
    endPoint: "https://trek.nasa.gov/tiles/Moon/EQ/corrected/LRO_WAC_Mosaic_Global_303ppd_v02",
    layer: "LRO_WAC_Mosaic_Global_303ppd_v02"
  }],
  titan: [{
    id: "surface",
    title: "Surface imagery of Titan from Cassini's Imaging Science Subsystem camera",
    description: "This global mosaic is at 4 km/pixel, combining one hundred flybys of Titan by the Cassini mission",
    type: "texture",
    features: ["shadowEntities"],
    textures: {
      color: {
        url: "titan/surface_$SIZE_$FACE.png",
        sizes: [16, 512, 2048]
      }
    }
  }, {
    id: "radar",
    title: "Radar Map of Titan's Surface",
    description: "This 351 meters/pixel map incorporates 104 Titan flybys by the Cassini mission.",
    type: "texture",
    features: ["shadowEntities"],
    textures: {
      color: {
        url: "titan/radar_$SIZE_$FACE.png",
        sizes: [16, 512, 2048, 4096]
      }
    }
  }],
  venus: [{
    id: "surface",
    title: "Radar Map of the Surface of Venus",
    description: "The Magellan mission used radar to see beneath the smog of Venus.",
    type: "texture",
    features: ["shadowEntities"],
    textures: {
      color: {
        url: "venus/surface_$SIZE_$FACE.png",
        sizes: [16, 512, 1024]
      }
    }
  }]
};
export { defaultExport as default };
