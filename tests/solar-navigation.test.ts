import { describe,it,expect } from 'vitest';
import { visibleSystemIds, searchBodies, projectedSystemVisible } from '../src/solar/ui/navigation';
import { DEFAULT_SCENE } from '../src/solar/config/default-scene';
const bodies=DEFAULT_SCENE.map(body=>({...body,groups:body.id==='sun'?['stars']:['earth','jupiter','saturn'].includes(body.id)?['planets']:body.id==='moon'?['earth','moons']:['spacecraft']}));
describe('full scene navigation',()=>{
 it('includes planets in overview and moons in a planet system without pretending everything is visible',()=>{
   expect(visibleSystemIds(bodies,'sun','overview')).toEqual(['sun','earth','moon','jupiter','saturn']);
   expect(visibleSystemIds(bodies,'earth','system')).toEqual(['sun','earth','moon','jupiter','saturn']);
   expect(visibleSystemIds(bodies,'moon','body')).toEqual(['sun','earth','moon','jupiter','saturn']);
 });
 it('searches labels and stable ids and filters spacecraft',()=>{
   expect(searchBodies(bodies,'VOYAGER','all').map(body=>body.id)).toEqual(['sc_voyager_1']);
   expect(searchBodies(bodies,'','moons').map(body=>body.id)).toEqual(['moon']);
 });
});

it('activates current spacecraft children in body view and through projected overview systems',()=>{
 const probe={...DEFAULT_SCENE[5],id:'probe',groups:['earth','spacecraft'],phases:[{startEt:0,parentId:'earth'},{startEt:10,parentId:'jupiter'}]};
 const scene=[...bodies,probe];
 expect(visibleSystemIds(scene,'earth','body',5)).toContain('probe');
 expect(visibleSystemIds(scene,'sun','overview',5,['earth'])).toContain('probe');
 expect(visibleSystemIds(scene,'sun','overview',15,['earth'])).not.toContain('probe');
 expect(visibleSystemIds(scene,'sun','overview',15,['jupiter'])).toContain('probe');
 expect(visibleSystemIds(scene,'earth','body',-1)).not.toContain('probe');
});

it('preserves only the selected craft current ancestors',()=>{
 const oldParent={...DEFAULT_SCENE[1],id:'old_parent',groups:[]};
 const currentParent={...DEFAULT_SCENE[1],id:'current_parent',groups:[]};
 const probe={...DEFAULT_SCENE[5],id:'probe',groups:['spacecraft'],phases:[{startEt:0,parentId:'old_parent'},{startEt:10,parentId:'current_parent'}]};
 const visible=visibleSystemIds([...bodies,oldParent,currentParent,probe],'probe','overview',15);
 expect(visible).toContain('current_parent');
 expect(visible).not.toContain('old_parent');
});

it('uses NASA Eyes twenty pixel projected system radius threshold',()=>{
 expect(projectedSystemVisible(1,20,500,Math.PI/2,1000)).toBe(true);
 expect(projectedSystemVisible(1,19.9,500,Math.PI/2,1000)).toBe(false);
 expect(projectedSystemVisible(1,undefined,500,Math.PI/2,1000)).toBe(true);
 expect(projectedSystemVisible(1,20,1000,Math.PI/2,1000)).toBe(false);
 expect(projectedSystemVisible(1,20,0,Math.PI/2,1000)).toBe(true);
 expect(projectedSystemVisible(1,20,500,Math.PI/2,0)).toBe(false);
});

it('does not classify a departed Mars mission as an Earth satellite only because it launched there',()=>{
 const mission={...DEFAULT_SCENE[5],id:'mars_probe',groups:['mars','spacecraft'],phases:[{startEt:0,parentId:'earth'},{startEt:10,parentId:'mars'}]};
 expect(searchBodies([mission],'','earth-satellites')).toEqual([]);
});

it('ranks an exact Moon name before generic moon category matches',()=>{
 const generic={...DEFAULT_SCENE[1],id:'adrastea',label:'Adrastea',category:'moon'};
 const moon={...DEFAULT_SCENE[2],id:'moon',label:'Moon',category:'moon'};
 expect(searchBodies([generic,moon],'Moon','all').map(body=>body.id)).toEqual(['moon','adrastea']);
});
it('shows heliocentric spacecraft at overview scale while respecting disabled small-body layers',()=>{
 const craft={...DEFAULT_SCENE[5],id:'solar_probe',groups:['spacecraft'],phases:[{startEt:0,parentId:'sun'}]};
 const asteroid={...craft,id:'asteroid',groups:['asteroids']};
 const helper={...craft,id:'reference_axes',groups:['helpers']};
 const visible=visibleSystemIds([...bodies,craft,asteroid,helper],'sun','overview',5,['sun']);
 expect(visible).toContain('solar_probe');expect(visible).not.toContain('asteroid');
 expect(visible).not.toContain('reference_axes');
 expect(visibleSystemIds([...bodies,craft,asteroid],'asteroid','body',5,['sun'])).toContain('asteroid');
});
