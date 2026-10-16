const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const parser=require('@babel/parser'),generate=require('@babel/generator').default;
const names=['BasicAlphaShader','BasicShader','ConnectedSpriteShader','LineShader','PlumesShader','ShaderChunkLogDepth','SpriteParticlesShader','SpriteShader','TrailShader'];
function load(name,depth){const tree=parser.parse(fs.readFileSync('eyes/src/engine/core/'+name+'.js','utf8'),{sourceType:'module'});tree.program.body=tree.program.body.filter(node=>!['ImportDeclaration','ExportNamedDeclaration'].includes(node.type));return vm.runInNewContext(generate(tree).code+';'+name,{ShaderChunkLogDepth:{ShaderChunkLogDepth:depth},ThreeCore:{Uniform:class{constructor(value){this.value=value;}}}});}
function digest(value){const contract=typeof value==='function'?Object.fromEntries(Object.getOwnPropertyNames(value).filter(name=>!['length','name','prototype'].includes(name)).map(name=>[name,value[name]])):value;return crypto.createHash('sha256').update(JSON.stringify(contract)).digest('hex');}
const depth=load('ShaderChunkLogDepth');
// Filled from the pre-format runtime exports, including exact compiled GLSL strings.
const baselines={BasicAlphaShader:'3ef9644285c655c7c0a7af1c7336236bf0e7e262e2218bed66eb59c9f85e5a9a',BasicShader:'3a85efba6b55ab5a0d5d570d8ca686d10a23ab239518b62c2bdee8e6a0cac828',ConnectedSpriteShader:'6b787477a08cc8e89c28c1dbd6a87b3442756c7699dc30c6d514a76d79878574',LineShader:'6068d71c375412595a92a183a546ab62c8b7afd9e36ecbe87056bd0f217072c9',PlumesShader:'83663d369ca08796dc7c4c01108aaaacef87ff361f7ab7e230371a98f199e529',ShaderChunkLogDepth:'477d1a0dc6019aa0b79416c62f0c1cf777d98fe09a45641001813922cb11e533',SpriteParticlesShader:'27264bf8cedfb178d0a4344cfaf8213fc02eabff0ff4acec66a85dd9072c3c85',SpriteShader:'bc8599c53c5f4c97dc33cac9203430b03da6fbf25a0263e1c73f15f08ad754f4',TrailShader:'0c7a6ea38c25590ea4de84ccdb6c98a6b580a191f939693126463c9574713d90'};
if(process.argv.includes('--capture'))console.log(JSON.stringify(Object.fromEntries(names.map(name=>[name,digest(load(name,depth))])),null,2));
else for(const name of names)test(name+' keeps all uniform/material properties and GLSL bytes while exposing readable source',()=>{
 const shader=load(name,depth);assert.equal(digest(shader),baselines[name]);
 const source=fs.readFileSync('eyes/src/engine/core/'+name+'.js','utf8');
 assert.ok(!source.includes('"\\n\\t')&&!source.includes('`\\n\\t'),'GLSL must appear as real multiline source');
});
