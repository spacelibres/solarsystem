import { expect,it } from 'vitest';
import { placeScreenLabel } from '../src/solar/render/labels';
it('keeps all nine overview names separated even when inner planets cluster',()=>{
 const occupied:{x:number;y:number}[]=[];
 for(let i=0;i<9;i++){
  const placed=placeScreenLabel(640,240,1280,490,occupied);
  expect(placed).toBeDefined();
  expect(occupied.some(point=>Math.abs(point.x-placed!.x)<85&&Math.abs(point.y-placed!.y)<22)).toBe(false);
  occupied.push(placed!);
 }
});
