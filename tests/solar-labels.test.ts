import { expect,it } from 'vitest';
import { placeScreenLabel } from '../src/solar/render/labels';
it('never relocates clustered names by hundreds of pixels to imply false body positions',()=>{
 const occupied:{x:number;y:number}[]=[];
 for(let i=0;i<9;i++){
  const placed=placeScreenLabel(640,240,1280,490,occupied);
  if(!placed)break;
  expect(Math.hypot(placed.x-640,placed.y-240)).toBeLessThanOrEqual(32);
  expect(occupied.some(point=>Math.abs(point.x-placed!.x)<85&&Math.abs(point.y-placed!.y)<22)).toBe(false);
  occupied.push(placed!);
 }
 expect(occupied.length).toBeGreaterThan(0);
 expect(occupied.length).toBeLessThan(9);
});
