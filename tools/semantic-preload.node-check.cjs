const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const parser=require('@babel/parser');
const generate=require('@babel/generator').default;
const {analyzeJavaScript}=require('./lib/eyes-analysis.cjs');
const source=fs.readFileSync('eyes/src/app/PreloadManager.js','utf8');
const declaration=parser.parse(source,{sourceType:'module'}).program.body.find(node=>node.type==='ClassDeclaration');

function createHarness({route='home',query='',touch=false,hover=true,missingLoading=false,missingEmbed=false}={}){
 const listeners=new Map(),timers=[];
 const createElement=tag=>{
  const element={tagName:tag,id:'',className:'',children:[],style:{setProperty(name,value){this[name]=value;}},innerText:'',innerHTML:'',offsetWidth:800};
  element.classList={
   add(...names){element.className=[...new Set([...element.className.split(' ').filter(Boolean),...names])].join(' ');},
   remove(...names){element.className=element.className.split(' ').filter(name=>!names.includes(name)).join(' ');},
   contains(name){return element.className.split(' ').includes(name);}
  };
  element.appendChild=child=>{element.children.push(child);child.parent=element;return child;};
  element.remove=()=>{element.removed=true;if(element.parent)element.parent.children=element.parent.children.filter(child=>child!==element);};
  return element;
 };
 const loading=createElement('div');loading.id='loading-screen';
 const embed=createElement('div');embed.id='embed-overlay';
 const roots=[...(!missingLoading?[loading]:[]),...(!missingEmbed?[embed]:[])];
 function find(id,nodes=roots){for(const element of nodes){if(element.id===id&&!element.removed)return element;const nested=find(id,element.children);if(nested)return nested;}return null;}
 const document={createElement,getElementById:find,
  addEventListener(type,callback){if(!listeners.has(type))listeners.set(type,new Set());listeners.get(type).add(callback);},
  removeEventListener(type,callback){listeners.get(type)?.delete(callback);}
 };
 const deterministicMath=Object.create(Math);deterministicMath.random=()=>0.5;
 const window={innerWidth:800,innerHeight:600,location:{hash:'#/'+route+(query?'?'+query:'')},navigator:{maxTouchPoints:touch?1:0}};
 const context=vm.createContext({document,window,URLSearchParams,Math:deterministicMath,matchMedia:()=>({matches:!hover}),setTimeout:(callback,delay)=>timers.push({callback,delay}),
  StoryCatalog:{stories:{voyager:{title:'Voyager Grand Tour'}}},EntityCatalog:{earth:{displayName:'Earth'},mars:{iauName:'Mars'},venus:{altName:'Venus'},enceladus:{displayName:'Enceladus'}}});
 vm.runInContext(generate(declaration).code+';globalThis.manager=new PreloadManager();',context);
 function fire(type){let prevented=0;for(const callback of [...(listeners.get(type)||[])])callback({preventDefault(){prevented++;}});return prevented;}
 return {manager:context.manager,loading,embed,find,listeners,timers,fire};
}

test('loading screen gives the two CSS star layers independent 8/24-star shadows',()=>{
 const {find,loading}=createHarness();
 const first=find('loading-screen-stars1'),second=find('loading-screen-stars2');
 const count=element=>(element.style.boxShadow||'').match(/px \d+px hsl\(/g)?.length||0;
 assert.equal(count(first),8);assert.equal(count(second),24);
 assert.equal(first.parent.id,'loading-screen-wrapper');
 assert.equal(find('loading-screen-bar').parent.id,'loading-screen-container');
 assert.equal(find('loading-screen-text').innerText,'Loading');assert.ok(loading.classList.contains('show'));
});
test('embed route titles preserve story slides, moons, comparison and missing events',()=>{
 const cases=[['home','','Home'],['story/voyager','slide=slide_3','Voyager Grand Tour - Slide 3'],['earth/moons/enceladus','','Enceladus'],['mars/moons','','Mars\' Moons'],['earth/telescope','','Earth Telescope Mode'],['earth/events/launch','','Earth Event'],['earth/events','',null],['earth/compare','id=mars','Earth compared to Mars'],['earth/compare','','Earth Comparison'],['unknown','','Home']];
 for(const [route,query,expected]of cases){const {manager}=createHarness({route,query:query+(query?'&':'')+'embed=true'});assert.equal(manager._getTitleFromURL(),expected,route);}
});
test('embed loading, view prompt and interaction listeners have distinct lifecycle phases',()=>{
 const {manager,embed,listeners,fire}=createHarness({route:'earth',query:'embed=true',touch:true});
 assert.equal(manager.embedLoading,true);assert.equal(embed.style['--load-percent'],'10%');
 manager.updateEmbedLoadPercent(65);assert.equal(embed.style['--load-percent'],'65%');
 manager.showEmbedViewButton();assert.ok(embed.classList.contains('view'));assert.equal(manager.embedLoading,false);
 assert.equal(fire('touchend'),1);assert.ok(embed.classList.contains('interact'));
 assert.equal(listeners.get('touchend').size,0);assert.equal(listeners.get('mouseup').size,0);
 assert.equal(fire('mousedown'),1);assert.equal(embed.className,'');
 assert.equal(listeners.get('touchstart').size,0);assert.equal(listeners.get('mousedown').size,0);
});
test('loading fade waits 400ms and optional host containers can be absent',()=>{
 const {manager,loading,timers}=createHarness();manager.hideLoadingScreen();
 assert.equal(loading.style.opacity,'0');assert.equal(loading.removed,undefined);assert.equal(timers[0].delay,400);
 timers[0].callback();assert.equal(loading.removed,true);
 assert.doesNotThrow(()=>createHarness({missingLoading:true,missingEmbed:true}).manager.hideLoadingScreen());
});
test('PreloadManager source has semantic local names throughout, including callback scopes',()=>{
 assert.deepEqual(analyzeJavaScript(source,'PreloadManager.js').shortBindings.map(binding=>binding.scope+':'+binding.name),[]);
});
