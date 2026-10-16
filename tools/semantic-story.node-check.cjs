const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const parser=require('@babel/parser');
const generate=require('@babel/generator').default;
const {analyzeJavaScript}=require('./lib/eyes-analysis.cjs');
const {bindingHash}=require('./lib/semantic-source.cjs');
const file='eyes/src/engine/core/AnnularSolarEclipseStory.js';
const source=fs.readFileSync(file,'utf8');
function harness(){
 const tree=parser.parse(source,{sourceType:'module'});
 const exportName=tree.program.body.find(node=>node.type==='ExportNamedDeclaration').specifiers.find(specifier=>specifier.exported.name==='default').local.name;
 tree.program.body=tree.program.body.filter(node=>!['ImportDeclaration','ExportNamedDeclaration'].includes(node.type));
 const toggles=[],labels=[],removedEntities=[],textureChanges=[],cones=new Map();let density=0.25,ambientColor;
 class Color{constructor(...channels){this.channels=channels;}copy(color){this.channels=[...color.channels];}}
 ambientColor=new Color(0.4,0.5,0.6);
 const originalAmbient=ambientColor;
 const originalTextures=Object.fromEntries(['decal','color','night','specular'].map(slot=>[slot,{url:slot+'-original',sizes:[256,1024]}]));
 const textureLOD={getTextureUrl:slot=>originalTextures[slot].url,getTextureSizes:slot=>originalTextures[slot].sizes,setTexture:(...args)=>textureChanges.push(args),setEnabled(){}};
 const atmosphere={getDensity:()=>density,setDensity:value=>{density=value;}};
 const earth={isEnabled(){},getComponent:type=>type==='atmosphere'?atmosphere:type==='lod'?textureLOD:null};
 const moon={getComponent:(type,id)=>cones.get(id),addComponent(type,id){const cone={setSourceEntity(value){this.source=value;},setTargetEntity(value){this.target=value;},setShadowType(value){this.type=value;},setColor(value){this.color=value;}};cones.set(id,cone);return cone;},removeComponent(cone){for(const [id,value]of cones)if(value===cone)cones.delete(id);}};
 const layerManager={getLayer:id=>({visible:['planets','spacecraft'].includes(id)})};
 const timeManager={resetLimits(){},setTimeRate(rate){this.rate=rate;}};
 const scene={getEntity:id=>id==='earth'?earth:moon,getAmbientLightColor:()=>ambientColor,setAmbientLightColor:value=>{ambientColor=value;},removeEntity:id=>removedEntities.push(id),waitTillEntitiesInPlace:()=>Promise.resolve()};
 const app={getManager:name=>name==='time'?timeManager:layerManager,getComponent:()=>({toggleLayer:id=>toggles.push(id)}),pioneer:{getScene:()=>scene,getTime:()=>123},scene,cameraScripts:{goToSystem:async()=>{},alignObjects:async()=>{}}};
 const context=vm.createContext({app,console,Pioneer:{Color,AtmosphereComponent:'atmosphere',SpheroidLODComponent:'lod',SpheroidComponent:'spheroid',DivComponent:'div'},SolarSystemSceneExports:{ShadowConeComponent:'shadow',WMTSComponent:'wmts',Placemarks:{addPlacemark(id){const label={id,style:{}};labels.push(label);return {getComponent:()=>({getDiv:()=>label})};}}}});
 vm.runInContext(generate(tree).code+';globalThis.story='+exportName+';',context);
 return {story:context.story,app,toggles,labels,cones,removedEntities,textureChanges,originalTextures,originalAmbient,get density(){return density;},get ambient(){return ambientColor;}};
}
test('annular story restores exactly the layers hidden on entry',async()=>{
 const state=harness();await state.story.onEnter(state.app);
 assert.deepEqual(state.toggles,['spacecraft','planets']);state.story.onLeave(state.app);
 assert.deepEqual(state.toggles,['spacecraft','planets','spacecraft','planets']);
});
test('annular camera/leave transfers and restores texture, atmosphere, ambient and labels',async()=>{
 const state=harness();const slide=state.story.slides[0];await slide.camera[0](state.app);
 assert.equal(state.labels.length,12);assert.equal(state.cones.size,2);assert.equal(state.density,0.0001);
 assert.equal(state.cones.get('shadowConePenumbra').type,'penumbra');
 assert.equal(state.app.getManager('time').rate,300);
 slide.onLeave(state.app);assert.equal(state.cones.size,0);assert.equal(state.density,0.25);
 assert.deepEqual(state.ambient.channels,state.originalAmbient.channels);
 for(const [slot,url,sizes]of state.textureChanges.slice(-4)){assert.equal(url,state.originalTextures[slot].url);assert.equal(sizes,state.originalTextures[slot].sizes);}
 assert.equal(state.removedEntities.length,12);assert.ok(state.labels.every(label=>label.style.display==='none'));
});
test('contour labels respect behind-moon and user contour toggles',async()=>{
 const state=harness();const slide=state.story.slides[0];await slide.camera[0](state.app);
 const buttons=slide.content[1].buttonContent,contour=slide.content[2].checkboxContent[1];
 await buttons.find(button=>button.id==='behind-moon').onClick();assert.ok(state.labels.every(label=>label.style.display==='none'));
 contour.onChange({target:{checked:false}});buttons.find(button=>button.id==='earth').onClick();
 assert.ok(state.labels.every(label=>label.style.display==='none'));
 contour.onChange({target:{checked:true}});assert.ok(state.labels.every(label=>label.style.display==='block'));
});
test('annular story has meaningful names across module state, hooks and nested callbacks',()=>{
 assert.deepEqual(analyzeJavaScript(source,file).shortBindings.map(binding=>binding.scope+':'+binding.name),[]);
});
function loadStory(name,globals={}){
 const code=fs.readFileSync('eyes/src/engine/core/'+name+'.js','utf8');
 const tree=parser.parse(code,{sourceType:'module'});
 const exportName=tree.program.body.find(node=>node.type==='ExportNamedDeclaration').specifiers.find(specifier=>specifier.exported.name==='default').local.name;
 tree.program.body=tree.program.body.filter(node=>!['ImportDeclaration','ExportNamedDeclaration'].includes(node.type));
 return vm.runInNewContext(generate(tree).code+';'+exportName,{Pioneer:{},SolarSystemSceneExports:{},...globals});
}
test('Enceladus restores texture limit and the saved Cassini trail start time',async()=>{
 const story=loadStory('EnceladusDiscoveryStory');let maxTextureSize=4096,startTime=42,relativeTo='';const lighting=[];
 const trail={getStartTime:()=>startTime,setStartTime:value=>{startTime=value;},setRelativeToEntity:value=>{relativeTo=value;}};
 const app={getManager:()=>({getLayer:()=>({visible:false})}),getComponent:name=>name==='settings'?{toggleLightOptions:mode=>lighting.push(mode)}:{toggleLayer(){}},pioneer:{getConfig:()=>({getValue:()=>maxTextureSize,setValue:(key,value)=>{maxTextureSize=value;}})},scene:{getEntity:()=>({getComponent:()=>trail})}};
 await story.onEnter(app);assert.equal(maxTextureSize,2048);
 const plumeSlide=story.slides.find(slide=>slide.id==='slide_8');plumeSlide.onEnter(app);assert.equal(startTime,1000);assert.equal(relativeTo,'enceladus');
 plumeSlide.onLeave(app);assert.equal(startTime,42);assert.equal(relativeTo,'');
 story.onLeave(app);assert.equal(maxTextureSize,4096);assert.deepEqual(lighting,['flood','shadow']);
});
test('Voyager flight overview releases its timer and restores both trail lengths',async()=>{
 const timers=new Map(),exceptions=[];let nextTimer=0;const starts={sc_voyager_1:2,sc_voyager_2:3};
 const story=loadStory('VoyagerGrandTourStory',{setInterval:callback=>{timers.set(++nextTimer,callback);return nextTimer;},clearInterval:id=>timers.delete(id)});
 const managers={label:{addExceptions:ids=>exceptions.push(['add',...ids]),removeExceptions:ids=>exceptions.push(['remove',...ids])},scene:{isListReady:async()=>{}},time:{getTime:()=>new Date(0),getNow:()=>new Date(1)}};
 const app={getManager:name=>managers[name],scene:{getEntity:id=>({getComponent:()=>({getStartTime:()=>starts[id],setStartTime:value=>{starts[id]=value;}})})}};
 const slide=story.slides.find(slide=>slide.id==='slide_2');await slide.onEnter(app);
 assert.equal(starts.sc_voyager_1,2e8);assert.equal(starts.sc_voyager_2,3e8);assert.equal(timers.size,1);
 slide.onLeave(app);assert.equal(starts.sc_voyager_1,2);assert.equal(starts.sc_voyager_2,3);assert.equal(timers.size,0);assert.equal(exceptions.length,2);
});
test('total eclipse camera respects the story-exit predicate between async phases',async()=>{
 const story=loadStory('TotalSolarEclipseStory');const calls=[];
 const app={cameraScripts:{goToSystem:async()=>calls.push('system'),alignObjects:async()=>calls.push('align')},scene:{waitTillEntitiesInPlace:async()=>calls.push('wait')}};
 await story.slides[0].camera[0](app,()=>true);assert.deepEqual(calls,['system']);
 let exited=false;calls.length=0;app.scene.waitTillEntitiesInPlace=async()=>{calls.push('wait');exited=true;};
 await story.slides[0].camera[0](app,()=>exited);assert.deepEqual(calls,['system','wait','align']);
});
test('Parker story retains its explicit spacecraft-layer entry and exit policy',async()=>{
 const story=loadStory('ParkerSolarProbePerihelionStory');const toggles=[];const app={getManager:()=>({toggleLayer:(id,options,enabled)=>toggles.push([id,enabled])})};
 await story.onEnter(app);await story.onLeave(app);assert.deepEqual(toggles,[['spacecraft',false],['spacecraft',true]]);
});
const storyBaselines={AnnularSolarEclipseStory:'66a7b5a20873151f500030e8b4ea0931ab0446987ebff3c9e28f13e18f08747a',TotalSolarEclipseStory:'51a6681533b21e32d564c421febd45ac6c5baee3d9e911b1638c263b63b62e04',EnceladusDiscoveryStory:'836e10b73a61dc3df803e928cf1aa11a8b4d2f2993930c13b1c0b5f67cc34048',VoyagerGrandTourStory:'2365c704b8c3e5015191787494e33585ea6c143503db57b9459025adf4fd5f0f',ParkerSolarProbePerihelionStory:'1b73762d499d2ba11cefe7952dc07f9e89def87282ff03e452ae97bc6109b0c1'};
for(const [name,hash]of Object.entries(storyBaselines))test(name+' preserves the normalized original implementation and has readable scoped names',()=>{
 const file='eyes/src/engine/core/'+name+'.js',code=fs.readFileSync(file,'utf8');
 assert.equal(bindingHash(code),hash);assert.deepEqual(analyzeJavaScript(code,file).shortBindings,[]);assert.ok(!code.includes('@eyes-analysis'));
});
