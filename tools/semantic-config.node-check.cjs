const {originalBrandingContract}=require('./lib/branding-contract.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const parser=require('@babel/parser'),generate=require('@babel/generator').default;
const {analyzeJavaScript}=require('./lib/eyes-analysis.cjs');
const {bindingHash}=require('./lib/semantic-source.cjs');
function load(file,globals){const tree=parser.parse(fs.readFileSync(file,'utf8'),{sourceType:'module'});const exportName=tree.program.body.find(node=>node.type==='ExportNamedDeclaration').specifiers.find(specifier=>specifier.exported.name==='default').local.name;tree.program.body=tree.program.body.filter(node=>!['ImportDeclaration','ExportNamedDeclaration'].includes(node.type));return vm.runInNewContext(generate(tree).code+';'+exportName,globals);}
test('component hooks preserve search visibility, distance focus/reset, and comparison subscription',()=>{
 let mobile=false;const states=[],subscriptions=[];
 const definitions=load('eyes/src/app/config/components.js',{Eyes:{AppUtils:{isMobileMode:()=>mobile}},SettingsOptions:{default:[]}});
 const find=name=>definitions.find(definition=>definition.name===name);
 const search={hide:()=>states.push('hide'),show:()=>states.push('show')};
 find('searchDesktop').postCreationFunction({},search);search.onResize();mobile=true;search.onResize();assert.deepEqual(states,['show','hide']);
 states.length=0;find('searchMobile').postCreationFunction({},search);search.onResize();mobile=false;search.onResize();assert.deepEqual(states,['show','hide']);
 const focus=[];const distanceSearch={eraseInput:()=>focus.push('erase'),app:{getComponent:()=>({setIsSearching:value=>focus.push(value)})},_config:{defaultText:'Earth'},_children:{input:{value:'Mars'}}};
 const callbacks=find('distanceSourceSearch').options.config;callbacks.onSearchFocus(distanceSearch);callbacks.onReset(distanceSearch);
 assert.deepEqual(focus,['erase',true,false]);assert.equal(distanceSearch._children.input.value,'Earth');
 const comparison={unitchange(){}};find('comparison').postCreationFunction({getComponent:()=>({registerCallback:(...args)=>subscriptions.push(args)})},comparison);
 assert.equal(subscriptions[0][0],'unitchange');assert.equal(subscriptions[0][1],comparison.unitchange);
});
test('kiosk options enforce positive forced-restart duration and emit bubbling changes',()=>{
 const changes=[];const inputs={'input-maxSessionTime':{value:'0'},'input-forceRestart':{checked:true}};
 for(const [id,input]of Object.entries(inputs))input.dispatchEvent=event=>changes.push([id,event.type,event.bubbles]);
 const settings=load('eyes/src/app/config/settings.js',{document:{getElementById:id=>inputs[id]},Event:class{constructor(type,options){this.type=type;this.bubbles=options.bubbles;}}});
 const items=settings.find(group=>group.groupName==='Kiosk/Museum Mode').items;
 items.find(item=>item.query==='forceRestart').onChange(true);assert.equal(inputs['input-maxSessionTime'].value,'1');
 items.find(item=>item.query==='maxSessionTime').onChange('0');assert.equal(inputs['input-forceRestart'].checked,false);
 assert.deepEqual(changes,[['input-maxSessionTime','change',true],['input-forceRestart','change',true]]);
});
test('configuration callbacks expose semantic parameter names rather than compressed scopes',()=>{
 for(const name of ['components','settings','views']){const file='eyes/src/app/config/'+name+'.js';assert.deepEqual(analyzeJavaScript(fs.readFileSync(file,'utf8'),file).shortBindings,[],name);}
});
const baselines={components:'79e368b54b693ae8f7ccee61f7833551fdc5e78e361e1551ec563bfa519e326d',settings:'e8d618f29a06989bb527774adaeedc0e3ad4b2b06b4a03b20e757946d0e4fc86',views:'96cfa87c3e09f9c5545d3706f7d37bd05fea4f05962c13af4d15c054d6077a46'};
for(const [name,hash]of Object.entries(baselines))test(name+' retains the original binding-normalized execution',()=>assert.equal(bindingHash(originalBrandingContract('eyes/src/app/config/'+name+'.js',fs.readFileSync('eyes/src/app/config/'+name+'.js','utf8'))),hash));
