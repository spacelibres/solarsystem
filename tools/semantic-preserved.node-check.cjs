const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {semanticHash}=require('./lib/eyes-analysis.cjs');
const baselines=require('./lib/preserved-eyes-contracts.json');

// The original application graph stays pinned. The explicitly authored add-on
// is an intentional new entry import, not a recovered NASA behavior change.
const artworkExtension="import './custom/constellation-art/app.js';";
test('files without semantic acceptance retain the executable AST from v0.2.31',()=>{
 assert.ok(Object.keys(baselines).length>600);
 for(const [file,baseline]of Object.entries(baselines)){
  let source=fs.readFileSync(file,'utf8');
  if(file==='eyes/src/main.js')source=source.replace(artworkExtension,'');
  assert.equal(semanticHash(source,file),baseline,file+' changed beyond the explicit independent extension');
 }
});
test('the artwork extension installs after the recovered application graph',()=>{
 const source=fs.readFileSync('eyes/src/main.js','utf8');
 assert.equal(source.split(artworkExtension).length,2,'exactly one independent extension import');
 assert.ok(source.indexOf("import './app/SolarSystemApp.js';")<source.indexOf(artworkExtension));
});
