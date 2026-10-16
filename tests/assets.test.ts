import { describe, expect, it } from 'vitest';

import {
  dynamoUrl, textureUrl, modelUrl, starfieldUrl, SPRITES,
} from '../src/lib/nasa/assets';

describe('NASA runtime asset URLs', () => {
  it('loads controllers directly from the verified NASA origin', () => {
    expect(dynamoUrl('earth/sun/orb/def.dyn')).toBe(
      'https://eyes.nasa.gov/assets/dynamic/dynamo/earth/sun/orb/def.dyn',
    );
  });

  it('resolves catalog texture placeholders without changing the source path', () => {
    expect(textureUrl({ url: 'earth/color_$SIZE_$FACE.png' }, 512, 3)).toBe(
      'https://eyes.nasa.gov/assets/static/maps/earth/color_512_3.png',
    );
  });

  it('uses the same runtime origin for sprites, stars and models', () => {
    expect(SPRITES.sunGlow).toBe('https://eyes.nasa.gov/assets/static/sprites/sun_glow.png');
    expect(starfieldUrl(2)).toBe('https://eyes.nasa.gov/assets/static/stars/stars.2.bin');
    expect(modelUrl('models/jupiter/0/jupiter_0.gltf')).toBe(
      'https://eyes.nasa.gov/assets/static/models/jupiter/0/jupiter_0.gltf',
    );
  });
});
