import * as Pioneer from '../engine/pioneer/index.js';

const EARTH_GM_KM3_S2 = 398600.4418;
const DATA_URL = 'data/starlink-orbits.json';

/**
 * Add the public Starlink constellation to the recovered Eyes Earth entity.
 *
 * OrbitalParticlesComponent projects each particle from a Pioneer
 * OrbitalElements record on every frame, so 11k satellites stay on one
 * instanced draw without creating 11k Eyes entities or labels.
 */
export async function attachStarlinkLayer(scene) {
  try {
    const response = await fetch(new URL(DATA_URL, document.baseURI), { cache: 'force-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const catalogue = await response.json();
    const earth = scene.getEntity('earth');
    if (!earth || !Array.isArray(catalogue.satellites) || catalogue.satellites.length === 0) return null;
    const entity = scene.addEntity('starlink_constellation');
    entity.setParent(earth);
    entity.setPosition(new Pioneer.Vector3(0, 0, 0));
    entity.setOrientation(Pioneer.Quaternion.Identity);
    entity.setExtentsRadius(7000);
    entity.setOcclusionRadius(0);
    const component = entity.addComponent(Pioneer.OrbitalParticlesComponent, 'starlink_particles');
    component.setScaleOfParticles(1);
    component.setLoadFunction(async () => {
      const orbitalElements = [];
      const colors = [];
      const scales = [];
      for (const satellite of catalogue.satellites) {
        const elements = new Pioneer.OrbitalElements();
        elements.setFromPositionAndVelocity(
          new Pioneer.Vector3(satellite.p[0], satellite.p[1], satellite.p[2]),
          new Pioneer.Vector3(satellite.v[0], satellite.v[1], satellite.v[2]),
          Pioneer.TimeUtils.unixToEt(satellite.e),
          EARTH_GM_KM3_S2,
        );
        orbitalElements.push(elements);
        colors.push(new Pioneer.Color(0.62, 0.82, 1, 0.9));
        scales.push(35);
      }
      return { orbitalElements, colors, scales };
    });
    component.setForceLoaded(true);
    return entity;
  } catch (error) {
    console.warn('Starlink layer unavailable:', error);
    return null;
  }
}

