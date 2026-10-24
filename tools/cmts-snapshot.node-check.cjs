'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const parser = require('@babel/parser');
const { tileUrls, summarize, configurations, verifySamples } = require('./local-assets/cmts.cjs');
const source = fs.readFileSync(path.join(__dirname,'../eyes/src/engine/components/CMTSComponent.js'),'utf8');
const tree = parser.parse(source,{sourceType:'module'});
const classNode = tree.program.body.find(n=>n.type === 'ClassDeclaration' && n.id.name === 'CMTSTile');
const method = classNode.body.body.find(n=>n.key?.name === '_isInABoundary');
const originalBoundary = new Function('configuration','face','level','tileCoord',source.slice(method.body.start+1,method.body.end-1));
const base = 'https://eyes.nasa.gov/assets/dynamic/cmts/test/color';
const configuration = {first_level:-2,extension:'ktx2',boundaries:[
  {face:0,last_level:3,min:[1,2],max:[4,6]},
  {face:0,last_level:3,min:[3,3],max:[6,7]},
  {face:1,last_level:1,min:[0,0],max:[1,1]}
]};
test('streamed union matches recovered boundary method for every synthetic tile',()=>{
  const urls = [...tileUrls(configuration,base)];
  assert.equal(new Set(urls).size,urls.length,'overlapping boundaries must not duplicate files');
  const set = new Set(urls);
  for (let face=0;face<6;face++) for(let level=0;level<=4;level++) for(let x=0;x<2**level;x++) for(let y=0;y<2**level;y++) {
    assert.equal(set.has(`${base}/${face}/${level}/${x}/${y}.ktx2`),originalBoundary(configuration,face,level,{x,y}),`${face}/${level}/${x}/${y}`);
  }
  assert.equal(summarize(configuration,base).count,urls.length);
});
test('non-positive textures use 0/0, while height follows source root-level behavior',()=>{
  const color = [...tileUrls(configuration,base)];
  assert(color.includes(`${base}/0/-2/0/0.ktx2`));
  assert(color.includes(`${base}/0/-1/0/0.ktx2`));
  assert(!color.includes(`${base}/2/-1/0/0.ktx2`));
  const height = [...tileUrls({...configuration,extension:'webp'},base.replace('color','height'))];
  assert(height.every(url=>!url.includes('/-')));
  assert(height.some(url=>url.endsWith('/0/0/0/0.webp')));
});
test('inclusive projected endpoints preserve sparse deep tiles',()=>{
  const sparse = {first_level:0,extension:'webp',boundaries:[{face:5,last_level:12,min:[816,348],max:[817,350]}]};
  const urls = [...tileUrls(sparse,base,'height')];
  assert(urls.includes(`${base}/5/12/817/350.webp`));
  assert(!urls.includes(`${base}/5/12/818/350.webp`));
  assert.equal(summarize(sparse,base,'height').byLevel[12],6);
});
test('sample verification requires actual successful, correctly typed payloads',async()=>{
  const entries = ['color','height','normal'].map(channel=>({body:'earth',channel,baseUrl:base.replace('color',channel),configuration:{...configuration,extension:channel==='height'?'webp':'ktx2'}}));
  const ktx = Buffer.from('ab4b5458203230bb0d0a1a0a','hex');
  const webp = Buffer.from('RIFF0000WEBP');
  const result = await verifySamples(entries,async url=>new Response(url.endsWith('webp')?webp:ktx));
  assert.equal(result.length,3);
  await assert.rejects(verifySamples(entries,async()=>new Response('<html>bad</html>')),/Invalid KTX2/);
});
const mirror = path.resolve(__dirname,'../../.solarsystem-mirror');
test('all 18 observed configuration files yield bounded counts without retaining URL arrays',{skip:!fs.existsSync(path.join(mirror,'dynamic/cmts/earth/color/configuration.json'))},()=>{
  const entries = configurations(mirror);
  assert.equal(entries.length,18);
  for (const entry of entries) {
    const summary = summarize(entry.configuration,entry.baseUrl,entry.channel);
    assert(summary.count>0);
    assert(Number.isSafeInteger(summary.count));
    assert(summary.samples.length<=4);
    assert.equal(summary.firstRuntimeLevel,entry.channel==='height'?0:entry.configuration.first_level);
  }
});
