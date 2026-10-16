import { modelExtentRadius } from '../src/solar/render/model-bounds';
import { describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { createModelLibrary, type ModelLoaderPort } from '../src/solar/render/models';
const deferred = () => { let resolve!: (group: THREE.Group) => void; const promise = new Promise<THREE.Group>(yes => { resolve = yes; }); return {promise,resolve}; };
const flush = async () => { for(let i=0;i<8;i++) await Promise.resolve(); };
function fixture() { const group=new THREE.Group(); const texture=new THREE.Texture(); const close=vi.fn(); texture.image={close}; const material=new THREE.MeshStandardMaterial({map:texture,normalMap:texture}); const geometry=new THREE.BoxGeometry(); group.add(new THREE.Mesh(geometry,material),new THREE.Mesh(geometry,material)); return {group,close,geometry,material,texture}; }
describe('model ownership',()=>{
 it('keeps physical pending work bounded after abort and disposes late results once',async()=>{
  const jobs=[deferred(),deferred(),deferred()]; let count=0; const port:ModelLoaderPort={load:()=>jobs[count++].promise,dispose:vi.fn()};
  const library=createModelLibrary(undefined,port); const a=library.acquire({url:'a'});const b=library.acquire({url:'b'});const c=library.acquire({url:'c'});
  const rejected=expect(a.ready).rejects.toMatchObject({name:'AbortError'}); a.release(); await rejected; await flush(); expect(count).toBe(2);
  const value=fixture(); const dispose=vi.spyOn(value.texture,'dispose');jobs[0].resolve(value.group);await flush();expect(count).toBe(3);expect(dispose).toHaveBeenCalledTimes(1);expect(value.close).toHaveBeenCalledTimes(1);
  jobs[1].resolve(new THREE.Group());jobs[2].resolve(new THREE.Group());await Promise.all([b.ready,c.ready]);library.dispose();expect(library.snapshot()).toMatchObject({active:0,pending:0,queued:0,disposed:true});
 });
 it('applies ordered source rotations and absolute scale without scaling translation',async()=>{
  const group=new THREE.Group();const library=createModelLibrary(undefined,{load:async()=>group,dispose:()=>{}});const lease=library.acquire({url:'a',rotate:[{x:90},{y:90}],scale:2,translate:{x:1,y:2,z:3}});const model=await lease.ready;
  expect(model.position.toArray()).toEqual([1,2,3]);expect(group.scale.toArray()).toEqual([2,2,2]);const vector=new THREE.Vector3(0,1,0).applyQuaternion(group.quaternion);expect(vector.x).toBeCloseTo(1);expect(vector.y).toBeCloseTo(0);lease.release();library.dispose();
 });
 it('rejects queued aborted work without loading and makes release idempotent',async()=>{
  const pending=deferred();const load=vi.fn(()=>pending.promise);const dispose=vi.fn();const library=createModelLibrary(undefined,{load,dispose});const a=library.acquire({url:'a'});const b=library.acquire({url:'b'});const controller=new AbortController();const c=library.acquire({url:'c'},controller.signal);const rejected=expect(c.ready).rejects.toMatchObject({name:'AbortError'});controller.abort();await rejected;expect(load).toHaveBeenCalledTimes(2);a.release();b.release();await Promise.allSettled([a.ready,b.ready]);library.dispose();pending.resolve(new THREE.Group());await flush();expect(dispose).toHaveBeenCalledTimes(1);
 });
});

it('owns separate scenes for repeated URLs and frees each complete GPU resource graph once',async()=>{
 const first=fixture();const second=fixture();const values=[first.group,second.group];const library=createModelLibrary(undefined,{load:async()=>values.shift()!,dispose:()=>{}});
 const a=library.acquire({url:'same'});const b=library.acquire({url:'same'});expect(await a.ready).not.toBe(await b.ready);
 const geometry=vi.spyOn(first.geometry,'dispose');const material=vi.spyOn(first.material,'dispose');const texture=vi.spyOn(first.texture,'dispose');a.release();a.release();
 expect(geometry).toHaveBeenCalledTimes(1);expect(material).toHaveBeenCalledTimes(1);expect(texture).toHaveBeenCalledTimes(1);expect(first.close).toHaveBeenCalledTimes(1);expect(second.close).not.toHaveBeenCalled();
 expect((await b.ready).children[0].scale.toArray()).toEqual([0.001,0.001,0.001]);library.dispose();b.release();expect(second.close).toHaveBeenCalledTimes(1);
});
it('propagates load failures and continues queued work',async()=>{
 let count=0;const library=createModelLibrary(undefined,{load:async()=>{if(count++===0)throw new Error('HTTP 404');return new THREE.Group();},dispose:()=>{}});
 const a=library.acquire({url:'missing'});const b=library.acquire({url:'good'});await expect(a.ready).rejects.toThrow('HTTP 404');await expect(b.ready).resolves.toBeInstanceOf(THREE.Group);await flush();expect(library.snapshot()).toMatchObject({active:1,pending:0});library.dispose();
});

it('uses only revision-pinned decoder URLs published by the build', async () => {
 const { readFile, access } = await import('node:fs/promises');
 const { modelDecoderPaths } = await import('../src/solar/render/models');
 const manifest=JSON.parse(await readFile(new URL('../eyes/decoders/manifest.json',import.meta.url),'utf8')) as {revision:string};
 const paths=modelDecoderPaths();
 expect(paths).toEqual({draco:`/eyes/decoders/${manifest.revision}/draco/`,ktx2:`/eyes/decoders/${manifest.revision}/ktx2/`});
 for(const resource of [paths.draco+'draco_wasm_wrapper.js',paths.draco+'draco_decoder.wasm',paths.ktx2+'basis_transcoder.js',paths.ktx2+'basis_transcoder.wasm']) await expect(access(new URL('../public'+resource,import.meta.url))).resolves.toBeUndefined();
});
it('disposes non-triangle glTF primitives as well as meshes',async()=>{
 const geometry=new THREE.BufferGeometry();const material=new THREE.PointsMaterial();const group=new THREE.Group();group.add(new THREE.Points(geometry,material));const geometryDispose=vi.spyOn(geometry,'dispose');const materialDispose=vi.spyOn(material,'dispose');
 const library=createModelLibrary(undefined,{load:async()=>group,dispose:()=>{}});const lease=library.acquire({url:'points'});await lease.ready;lease.release();expect(geometryDispose).toHaveBeenCalledTimes(1);expect(materialDispose).toHaveBeenCalledTimes(1);library.dispose();
});

it('fits complete off-centre booms instead of only the source selection radius',()=>{
 const group=new THREE.Group();
 const mesh=new THREE.Mesh(new THREE.BoxGeometry(2,4,6));mesh.position.x=10;group.add(mesh);
 expect(modelExtentRadius(group)).toBeCloseTo(10+Math.sqrt(14));
 mesh.geometry.dispose();
});
