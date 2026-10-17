import { expect, it } from 'vitest';
import { FULL_SCENE } from '../src/solar/config/scene-catalog';

it('retains unbounded NASA mission trail duration coverages', () => {
    const odyssey = FULL_SCENE.find(body => body.id === 'sc_mars_odyssey')!.trail!;
    expect(odyssey.lengthCoverages).toEqual([[1e7, -1e18, 57128464], [6727, 57128464, 1e18]]);
    const wild = FULL_SCENE.find(body => body.id === '81p_wild_2')!.trail!;
    expect(wild.lengthCoverages).toEqual([[1356976800, -1e18, -611927948.817], [189345600, -611927948.817, 1e18]]);
});

it('preserves explicit ISS and Hubble trail durations', () => {
    expect(FULL_SCENE.find(body => body.id === 'sc_iss')!.trail!.length).toBe(5573);
    expect(FULL_SCENE.find(body => body.id === 'sc_hubble_space_telescope')!.trail!.length).toBe(5748.5);
});
import { configuredTrailLength } from '../src/solar/domain/trails';
it('changes the renderer refresh identity exactly at a source duration boundary',()=>{
 const options={length:1000,lengthCoverages:[[10,0,20],[30,20,40]] as const};
 expect(configuredTrailLength(options,19.999)).toBe(10);
 expect(configuredTrailLength(options,20)).toBe(30);
 expect(configuredTrailLength(options,40)).toBe(1000);
 expect(configuredTrailLength(undefined,20)).toBeUndefined();
});
