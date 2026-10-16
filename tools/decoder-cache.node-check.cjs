const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const os=require('node:os');
const path=require('node:path');
const {createHash}=require('node:crypto');
async function fixture(t){const folder=await fs.mkdtemp(path.join(os.tmpdir(),'eyes-decoder-'));t.after(async()=>{if(path.dirname(folder)===os.tmpdir()&&path.basename(folder).startsWith('eyes-decoder-'))await fs.rm(folder,{recursive:true});});return folder;}
const bytes=Buffer.from([0,97,115,109,1,0,0,0]);
const resource={file:'test/decoder.wasm',url:'https://eyes.nasa.gov/verified-decoder.wasm',sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length};
test('downloads once, validates WASM and reuses verified local bytes offline',async t=>{
 const {ensureDecoderCache}=await import('../eyes/scripts/decoder-cache.mjs');const root=await fixture(t);let calls=0;
 const fetcher=async()=>{calls++;return new Response(bytes);};
 await ensureDecoderCache({root,resources:[resource],fetcher});
 await ensureDecoderCache({root,resources:[resource],fetcher:()=>{throw Error('Network must not be used');}});
 assert.equal(calls,1);assert.deepEqual(await fs.readFile(path.join(root,resource.file)),bytes);
});
test('rejects altered downloads and leaves the previous cache intact',async t=>{
 const {ensureDecoderCache}=await import('../eyes/scripts/decoder-cache.mjs');const root=await fixture(t);
 await assert.rejects(ensureDecoderCache({root,resources:[resource],fetcher:async()=>new Response('not wasm')}),/digest|integrity|SHA/i);
 await assert.rejects(fs.access(path.join(root,resource.file)));
});
test('repairs a corrupt cache from the pinned original resource',async t=>{
 const {ensureDecoderCache}=await import('../eyes/scripts/decoder-cache.mjs');const root=await fixture(t);await fs.mkdir(path.join(root,'test'));await fs.writeFile(path.join(root,resource.file),'bad');
 await ensureDecoderCache({root,resources:[resource],fetcher:async()=>new Response(bytes)});
 assert.deepEqual(await fs.readFile(path.join(root,resource.file)),bytes);
});
test('decoder URLs stay on the local app origin and carry the pinned revision',async()=>{
 const {localDecoderUrl}=await import('../eyes/src/runtime/decoder-paths.js');
 const host=new URL(localDecoderUrl('draco/','http://127.0.0.1:3000/eyes/index.html'));
 assert.equal(host.origin,'http://127.0.0.1:3000');assert.equal(host.pathname,'/eyes/decoders/'+require('../eyes/decoders/manifest.json').revision+'/draco/');assert.ok(host.href.endsWith('/'),'directory URL must support filename concatenation');
 const standalone=new URL(localDecoderUrl('ktx2/','http://127.0.0.1:3002/'));
 assert.equal(standalone.pathname,'/decoders/'+require('../eyes/decoders/manifest.json').revision+'/ktx2/');
});
