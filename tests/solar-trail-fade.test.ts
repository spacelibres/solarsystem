import { expect,it } from 'vitest';
import { eyesTrailFade } from '../src/solar/config/eyes-display';
it('matches Eyes close-camera trail fading rather than showing a full-bright orbit through a craft',()=>{
 expect(eyesTrailFade(.01,1)).toBe(1);
 expect(eyesTrailFade(.01,.0005)).toBeCloseTo(.5);
 expect(eyesTrailFade(.01,0)).toBe(0);
 expect(eyesTrailFade(.04,1)).toBe(0);
 expect(eyesTrailFade(.01,1e-5)).toBeCloseTo(.01);
});
