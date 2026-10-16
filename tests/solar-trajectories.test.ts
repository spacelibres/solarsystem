import { describe, it, expect } from 'vitest';
import { orbitalBodyFactor, orbitPolyline, sampledPolyline } from '../src/solar/domain/trajectories';
import type { EphemerisWindow } from '../src/solar/domain/ephemeris';

describe('source data trajectories', () => {
  it('samples an osculating ellipse instead of a decorative circular orbit', () => {
    const point = { kind: 'orb' as const, time: 0, semiMajorAxis: 10, eccentricity: .5, meanAngularMotion: .1, meanAnomalyAtEpoch: 0, orientation: {w:1,x:0,y:0,z:0} };
    const positions = orbitPolyline(point, 64);
    expect(positions).toHaveLength(65);
    expect(positions[0].x).toBeCloseTo(5);
    expect(positions[32].x).toBeCloseTo(-15);
    expect(positions[64].x).toBeCloseTo(5);
    expect(() => orbitPolyline({...point,eccentricity: 1.5},64)).toThrow();
  });
  it('samples only real coverage and preserves a moving position trail', () => {
    const window: EphemerisWindow = { header:{version:2,pointType:'lin',name:'lin',numberOfDigits:0},source:{path:'fixture',segment:null},interval:{min:0,max:10},points:[{kind:'lin',time:0,position:{x:0,y:0,z:0}},{kind:'lin',time:10,position:{x:10,y:20,z:0}}] };
    const positions=sampledPolyline(window, -5, 8, 4);
    expect(positions).toHaveLength(5);
    expect(positions[0]).toEqual({x:0,y:0,z:0});
    expect(positions[4]).toEqual({x:8,y:16,z:0});
    expect(sampledPolyline(window,20,30,4)).toEqual([]);
  });
});

it('uses the exact evaluator barycentric factors and leaves ordinary orbits unchanged',()=>{
 const header={gravitationalParameter1:2,gravitationalParameter2:8};
 expect(orbitalBodyFactor(header)).toBe(1);
 expect(orbitalBodyFactor(header,1)).toBe(.8);
 expect(orbitalBodyFactor(header,2)).toBe(-.2);
});
