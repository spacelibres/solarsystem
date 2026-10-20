import { describe, expect, it } from 'vitest';
import { createRegistration, createArtworkPatch } from '../eyes/src/custom/constellation-art/registration.js';
const direction=(ra:number,dec:number):[number,number,number]=>[Math.cos(dec)*Math.cos(ra),Math.cos(dec)*Math.sin(ra),Math.sin(dec)];
const anchors=[{pixel:[0,0],direction:direction(-.1,.2)},{pixel:[100,0],direction:direction(.1,.2)},{pixel:[0,100],direction:direction(-.1,.4)}];
describe('constellation image registration',()=>{
 it('reproduces three stellar anchors across RA zero without reflecting image Y',()=>{
  const sample=createRegistration(anchors);
  for(const anchor of anchors) { const actual=sample(...anchor.pixel as [number,number]); anchor.direction.forEach((value,index)=>expect(actual[index]).toBeCloseTo(value,10)); }
  expect(sample(0,100)[2]).toBeGreaterThan(sample(0,0)[2]);
 });
 it('normalizes subdivision samples even close to a celestial pole',()=>{
  const art={width:100,height:100,anchors:[{pixel:[0,0],direction:direction(0,1.4)},{pixel:[100,0],direction:direction(1,1.4)},{pixel:[0,100],direction:direction(0,1.5)}]};
  const patch=createArtworkPatch(art,8);
  expect(patch.positions.length).toBe(81*3);expect(patch.indices.length).toBe(8*8*6);
  for(let i=0;i<patch.positions.length;i+=3)expect(Math.hypot(...patch.positions.slice(i,i+3))).toBeCloseTo(1,6);
  expect([...patch.uvs.slice(0,2)]).toEqual([0,1]);
 });
 it('rejects malformed, zero and degenerate registrations and unbounded subdivision',()=>{
  expect(()=>createRegistration([])).toThrow();
  expect(()=>createRegistration(anchors.map(anchor=>({...anchor,pixel:[0,0]})))).toThrow();
  expect(()=>createRegistration(anchors.map(anchor=>({...anchor,direction:[0,0,0]})))).toThrow();
  expect(()=>createRegistration(anchors.map(anchor=>({...anchor,direction:[1,0,0]})))).toThrow();
  expect(()=>createArtworkPatch({width:100,height:0,anchors})).toThrow();
  expect(()=>createArtworkPatch({width:100,height:100,anchors},256)).toThrow();
 });
});
