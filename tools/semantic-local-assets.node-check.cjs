const {test}=require('node:test');
const assert=require('node:assert/strict');
const path=require('node:path');
const fs=require('node:fs/promises');
const os=require('node:os');
const {build}=require('esbuild');
const modulePromise=import('../eyes/scripts/local-assets.mjs');
test('dynamic resources use a fresh namespace to bypass previously immutable browser entries',async()=>{
 const {localizeAssetUrls}=await modulePromise;
 assert.equal(localizeAssetUrls('https://eyes.nasa.gov/assets/dynamic'),'/nasa/live/dynamic');
 assert.equal(localizeAssetUrls('https://eyes.nasa.gov/assets/dynamic/dynamo/a/def.dyn'),'/nasa/live/dynamic/dynamo/a/def.dyn');
});
test('compiled resources stay same-origin while source files and navigation remain intact',async()=>{
 const {localAssetsPlugin}=await modulePromise;
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'eyes-local-build-'));
 try{
  const source='export const media="https://eyes.nasa.gov/assets/static/models/a.gltf";export const description="https://eyes.nasa.gov/apps/solar-system/descriptions/";export const citation="https://www.nasa.gov/";';
  const entry=path.join(root,'entry.js');await fs.writeFile(entry,source);
  const result=await build({entryPoints:[entry],bundle:true,write:false,format:'esm',plugins:[localAssetsPlugin()]});
  const output=result.outputFiles[0].text;
  assert.match(output,/\/nasa\/static\/models\/a.gltf/);assert.match(output,/\/nasa\/site\/descriptions\//);
  assert.match(output,/https:\/\/www.nasa.gov\//);assert.equal(await fs.readFile(entry,'utf8'),source);
 }finally{await fs.rm(root,{recursive:true,force:true});}
});
test('CSS/font references and escaped JSON resources are localized; hidden Google iframe removed',async()=>{
 const {localizeAssetUrls}=await modulePromise;
 const css='src:url(https://eyes.nasa.gov/apps/solar-system/assets/default/fonts/Inter-Light.woff2?v=3.15)';
 assert.equal(localizeAssetUrls(css),'src:url(/nasa/site/assets/default/fonts/Inter-Light.woff2?v=3.15)');
 const json=JSON.stringify({image:'https://eyes.nasa.gov/assets/static/maps/a.png'}).replaceAll('/','\\/');
 assert.equal(JSON.parse(localizeAssetUrls(json)).image,'/nasa/static/maps/a.png');
 assert.equal(localizeAssetUrls('<iframe src="https://www.youtube.com/embed/QRTfKYOfPLg" allowFullScreen></iframe>'),'');
});
test('strict runtime policy prohibits external resource connections without disabling WASM workers',async()=>{
 const {eyesResourcePolicy}=await modulePromise;
 assert.match(eyesResourcePolicy,/connect-src 'self' blob: data:/);
 assert.match(eyesResourcePolicy,/wasm-unsafe-eval/);assert.match(eyesResourcePolicy,/worker-src 'self' blob:/);
 assert.doesNotMatch(eyesResourcePolicy,/https:|\*/);
});
