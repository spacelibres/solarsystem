import { expect,it } from 'vitest';
import { PerspectiveCamera, Vector3 } from 'three';
import { parseConstellations, starBrightness } from '../src/solar/domain/sky';
import { createSkyStars } from '../src/solar/render/sky';

it('decodes real constellation field order, validates indices and transforms axes',()=>{
  const bytes=new ArrayBuffer(1+3+4+1+24+1+2),view=new DataView(bytes);let o=0;
  view.setUint8(o++,3); for(const c of 'Test'.slice(0,3)) view.setUint8(o++,c.charCodeAt(0));
  for(const c of [255,100,50,128])view.setUint8(o++,c);
  view.setUint8(o++,2);
  for(const v of [0,0,10,0,10,0]){view.setFloat32(o,v,true);o+=4;}
  view.setUint8(o++,1);view.setUint8(o++,0);view.setUint8(o,1);
  const result=parseConstellations(bytes);
  expect(result[0].name).toBe('Tes');expect(result[0].segments).toEqual([0,1]);
  expect(result[0].stars[0]).toEqual({x:10,y:0,z:0});
  expect(result[0].stars[1].y).toBeCloseTo(-3.9777715593,8);
  expect(result[0].stars[1].z).toBeCloseTo(9.174820621,8);
  expect(()=>parseConstellations(bytes.slice(0,-1))).toThrow();
  view.setUint8(o,5);expect(()=>parseConstellations(bytes)).toThrow();
});

it('keeps magnitude-based bright stars distinct and correctly projects a standard Three camera',()=>{
  const brightness=starBrightness(0,1e14);
  expect(brightness).toBeCloseTo(2*Math.log1p(3.0128e28/(4*Math.PI*1e28)*1e4),10);
  const stars=createSkyStars([{position:new Vector3(0,0,-1e14),color:{r:1,g:1,b:1},magnitude:0,absoluteMagnitude:0}]);
  expect(stars.geometry.getAttribute('brightness').getX(0)).toBeCloseTo(brightness,5);
  expect(stars.material.vertexShader).not.toContain('viewPosition.y');
  expect(stars.material.depthTest).toBe(true);
  const camera=new PerspectiveCamera(60,1,.1,10);camera.updateMatrixWorld();
  const front=new Vector3(0,0,-1).project(camera);
  expect(front.x).toBe(0);expect(front.y).toBe(0);
  expect(stars.material.fragmentShader).toContain('5.0');
  stars.geometry.dispose();stars.material.dispose();
});
