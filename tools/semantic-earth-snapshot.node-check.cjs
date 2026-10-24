const {test}=require('node:test');const assert=require('node:assert/strict');
test('Earth snapshot remains fixed as calendar time advances without changing other body dimensions',async()=>{
 const {installEarthSnapshot}=await import('../eyes/src/runtime/snapshot-policy.js');
 class Manager{getImageDate(time){return time==='now'?'2035-06-10':null;}}
 class Component{constructor(body){this.body=body;}getEntity(){return {getName:()=>this.body};}setDimensionValue(name,value){this.last=[name,value];return value;}}
 const layers={earth:[{title:'Yesterday'}]};installEarthSnapshot({manager:Manager,component:Component,layers},{date:'2026-10-23'});
 assert.equal(new Manager().getImageDate('now'),'2026-10-23');assert.equal(new Manager().getImageDate('invalid'),null);
 const earth=new Component('earth'),moon=new Component('moon');assert.equal(earth.setDimensionValue('Time','2035-06-10'),'2026-10-23');assert.equal(moon.setDimensionValue('Time','2035-06-10'),'2035-06-10');assert.equal(earth.setDimensionValue('Style','default'),'default');
 assert.match(layers.earth[0].title,/2026-10-23/);
});
