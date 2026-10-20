import { expect,it,vi } from 'vitest';
import * as THREE from 'three';
import { createConstellationArt } from '../src/solar/render/constellation-art';
vi.mock('../eyes/src/custom/constellation-art/vector-geometry.js',()=>({createArtworkVectorGeometry:()=>({positions:new Float32Array([1,0,0,1,.1,0,1,0,.1]),colors:new Float32Array([1,1,1,1,1,1,1,.5,1,1,1,1])})}));
const art={id:'Ori',name:'Orion',file:'orion.svg',width:100,height:100,covers:['Ori'],anchors:[{pixel:[0,0],direction:[1,0,0]},{pixel:[100,0],direction:[1,.1,0]},{pixel:[0,100],direction:[1,0,.1]}]};
const catalog={schemaVersion:1 as const,frame:'ICRS/J2000' as const,artworks:[art]};
it('loads only on enable, shares an in-flight attempt, and releases late textures after disposal',async()=>{
 let resolve!:(texture:THREE.Texture)=>void;
 const loadCatalogue=vi.fn(async()=>catalog),loadTexture=vi.fn(()=>new Promise<THREE.Texture>(done=>{resolve=done;}));
 const layer=createConstellationArt({loadCatalogue,loadTexture});
 expect(loadCatalogue).not.toHaveBeenCalled();layer.setVisible(true);layer.setVisible(true);
 await vi.waitFor(()=>expect(loadTexture).toHaveBeenCalledTimes(1));
 layer.dispose();const texture=new THREE.Texture(),release=vi.spyOn(texture,'dispose');resolve(texture);
 await vi.waitFor(()=>expect(release).toHaveBeenCalledOnce());expect(layer.group.children).toHaveLength(0);
});
it('retries failed loads after a fresh enable and disposes attached GPU resources',async()=>{
 let attempt=0;const texture=new THREE.Texture(),release=vi.spyOn(texture,'dispose'),onReady=vi.fn();
 const layer=createConstellationArt({onReady,loadCatalogue:async()=>catalog,loadTexture:async()=>{if(attempt++===0)throw Error('offline');return texture;}});
 layer.setVisible(true);await vi.waitFor(()=>expect(attempt).toBe(1));expect(onReady).not.toHaveBeenCalled();
 layer.setVisible(false);layer.setVisible(true);await vi.waitFor(()=>expect(layer.group.children).toHaveLength(1));
 expect(onReady).toHaveBeenCalledOnce();
 const mesh=layer.group.children[0] as THREE.Mesh,geometry=vi.spyOn(mesh.geometry,'dispose'),material=vi.spyOn(mesh.material as THREE.Material,'dispose');
 layer.dispose();layer.dispose();expect(release).toHaveBeenCalledOnce();expect(geometry).toHaveBeenCalledOnce();expect(material).toHaveBeenCalledOnce();
});
it('bounds concurrent texture work and waits for aborted workers before a quick re-enable',async()=>{
 const pending:Array<(texture:THREE.Texture)=>void>=[];let active=0,maxActive=0;
 const artworks=Array.from({length:7},(_,index)=>({...art,id:String(index)}));
 const layer=createConstellationArt({loadCatalogue:async()=>({...catalog,artworks}),loadTexture:()=>{active++;maxActive=Math.max(active,maxActive);return new Promise<THREE.Texture>(resolve=>pending.push(texture=>{active--;resolve(texture);}));}});
 layer.setVisible(true);await vi.waitFor(()=>expect(pending).toHaveLength(3));
 layer.setVisible(false);layer.setVisible(true);expect(pending).toHaveLength(3);
 const stale=pending.splice(0);stale.forEach(resolve=>resolve(new THREE.Texture()));
 await vi.waitFor(()=>expect(pending).toHaveLength(3));expect(maxActive).toBe(3);
 layer.dispose();pending.splice(0).forEach(resolve=>resolve(new THREE.Texture()));
 await vi.waitFor(()=>expect(active).toBe(0));expect(layer.group.children).toHaveLength(0);
});
it('builds vector artwork from numeric geometry without invoking the texture loader',async()=>{
 const loadTexture=vi.fn(async()=>new THREE.Texture()),onReady=vi.fn();
 const layer=createConstellationArt({loadCatalogue:async()=>({...catalog,artworks:[{...art,renderMode:'vector' as const}]}),loadSvg:async()=>'<svg/>',loadTexture,onReady});
 layer.setVisible(true);await vi.waitFor(()=>expect(layer.group.children).toHaveLength(1));
 expect(loadTexture).not.toHaveBeenCalled();expect(onReady).toHaveBeenCalledOnce();
 const mesh=layer.group.children[0] as THREE.Mesh<THREE.BufferGeometry,THREE.ShaderMaterial>;
 expect(mesh.geometry.getAttribute('artColor').itemSize).toBe(4);expect(mesh.material.uniforms.map).toBeUndefined();
 const dispose=vi.spyOn(mesh.geometry,'dispose');layer.dispose();expect(dispose).toHaveBeenCalledOnce();
});
