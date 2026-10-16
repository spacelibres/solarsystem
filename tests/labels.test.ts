import { describe, expect, it } from 'vitest';

import { LAYERS } from '../src/lib/nasa/astronomy';
import {
  LABEL_FOCUS_SIZE,
  LABEL_ICON_MAP,
  LABEL_WEIGHT_MAP,
  bodyIconName,
  bodyIconUrl,
  labelWeight,
  layerForEntity,
} from '../src/lib/theme/nasa-tokens';

describe('label icons (LabelManager._iconMap)', () => {
  it('does not request an image for the no-icon sentinel', () => {
    expect(bodyIconUrl('sun', 'Star')).toBeNull();
    expect(bodyIconUrl('milky_way', 'Galaxy')).toBeNull();
    expect(bodyIconUrl('earth', 'Planet')).toBe('/icons/icon-circle-earth.svg');
  });
  it('gives planets their own icon and everything else a fixed one', () => {
    expect(bodyIconName('earth', 'Planet')).toBe('circle-earth');
    expect(bodyIconName('jupiter', 'Planet')).toBe('circle-jupiter');
    // Moons, asteroids, comets and dwarf planets all share the small circle.
    expect(bodyIconName('io', 'Moon')).toBe('circle-white-small');
    expect(bodyIconName('1_ceres', 'Dwarf Planet')).toBe('circle-white-small');
    expect(bodyIconName('67p', 'Comet')).toBe('circle-white-small');
    // Spacecraft and landing sites are hexagons.
    expect(bodyIconName('sc_juno', 'Spacecraft')).toBe('hexagon');
    expect(bodyIconName('apollo_11_site', 'Landing site')).toBe('hexagon');
  });

  it('draws no icon for the universe, galaxies and stars', () => {
    expect(bodyIconName('milky_way', 'Galaxy')).toBe('no-icon');
    expect(bodyIconName('sun', 'Star')).toBe('no-icon');
    expect(bodyIconName('observable_universe', 'Universe')).toBe('no-icon');
  });

  it('falls back to the small circle for unknown categories', () => {
    expect(bodyIconName('mystery', '')).toBe('circle-white-small');
    expect(bodyIconName('mystery', 'Something New')).toBe('circle-white-small');
  });

  it('lists every category NASA maps', () => {
    expect(Object.keys(LABEL_ICON_MAP)).toHaveLength(12);
  });
});

describe('label weights (LabelManager._weightMap)', () => {
  it('ranks planets above spacecraft above moons', () => {
    expect(LABEL_WEIGHT_MAP.Planet).toBe(50);
    expect(LABEL_WEIGHT_MAP.Spacecraft).toBe(30);
    expect(LABEL_WEIGHT_MAP.Moon).toBe(25);
  });

  it('always sacrifices a barycentre and keeps stars and galaxies', () => {
    expect(LABEL_WEIGHT_MAP.Barycenter).toBe(0);
    expect(LABEL_WEIGHT_MAP.Star).toBe(100);
    expect(LABEL_WEIGHT_MAP.Galaxy).toBe(100);
  });

  it('resolves a body by subcategory first', () => {
    // A major moon uses the Moon weight; Juno resolves through Orbiter, which
    // has no weight of its own, so it falls back to Spacecraft.
    expect(labelWeight('moon', 'Moon', 'Major Moon')).toBe(25);
    expect(labelWeight('sc_juno', 'Spacecraft', 'Orbiter')).toBe(30);
  });

  it('gives constellation labels their own fixed weight', () => {
    expect(labelWeight('constellation_orion', '', '')).toBe(
      LABEL_WEIGHT_MAP.Constellation,
    );
  });

  it('uses a 5% centre square as the focus region', () => {
    expect(LABEL_FOCUS_SIZE).toBe(0.05);
  });
});

describe('layer resolution (LayerManager.getEntityLayer)', () => {
  it('prefers subcategory over category', () => {
    // Orbiter is its own layer, so Juno is not in `spacecraft`.
    expect(layerForEntity('Spacecraft', 'Orbiter', LAYERS)).toBe('orbiters');
    expect(layerForEntity('Moon', 'Major Moon', LAYERS)).toBe('majorMoons');
    expect(layerForEntity('Moon', 'Minor Moon', LAYERS)).toBe('minorMoons');
  });

  it('falls back to category when the subcategory is not a layer', () => {
    // Terrestrial and Gas Giant are subcategories, not layers.
    expect(layerForEntity('Planet', 'Terrestrial', LAYERS)).toBe('planets');
    expect(layerForEntity('Planet', 'Gas Giant', LAYERS)).toBe('planets');
    expect(layerForEntity('Dwarf Planet', null, LAYERS)).toBe('dwarfPlanets');
    expect(layerForEntity('Comet', 'Jupiter-Family Comet', LAYERS)).toBe('comets');
    expect(layerForEntity('Asteroid', 'S-Type Asteroid', LAYERS)).toBe('asteroids');
  });

  it('places landers and rovers in the landers layer', () => {
    expect(layerForEntity('Spacecraft', 'Lander', LAYERS)).toBe('landers');
    expect(layerForEntity('Spacecraft', 'Rover', LAYERS)).toBe('landers');
  });

  it('returns null for anything with no layer', () => {
    expect(layerForEntity(null, null, LAYERS)).toBeNull();
    expect(layerForEntity('Universe', null, LAYERS)).toBeNull();
    expect(layerForEntity('Galaxy', null, LAYERS)).toBeNull();
  });
});
