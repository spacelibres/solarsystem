import { expect,it } from 'vitest';
import { relativeEphemeris } from '../src/solar/domain/observations';
it('reports Moon distance and velocity relative to Earth, not the solar origin',()=>{
 const parent={status:'ready',id:'earth',parentId:'sun',phaseIndex:0,position:{x:150e6,y:0,z:0},velocity:{x:0,y:30,z:0},orientation:null} as const;
 const moon={...parent,id:'moon',parentId:'earth',position:{x:150e6+384400,y:0,z:0},velocity:{x:0,y:31.022,z:0}};
 expect(relativeEphemeris(moon,parent)?.distanceKm).toBe(384400);
 expect(relativeEphemeris(moon,parent)?.speedKmS).toBeCloseTo(1.022,12);
 expect(relativeEphemeris(moon,undefined)).toBeNull();
});
