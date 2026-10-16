import { describe,it,expect } from 'vitest';
import { visibleSystemIds, searchBodies } from '../src/solar/ui/navigation';
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

it('does not classify a departed Mars mission as an Earth satellite only because it launched there',()=>{
 const mission={...DEFAULT_SCENE[5],id:'mars_probe',groups:['mars','spacecraft'],phases:[{startEt:0,parentId:'earth'},{startEt:10,parentId:'mars'}]};
 expect(searchBodies([mission],'','earth-satellites')).toEqual([]);
});

it('ranks an exact Moon name before generic moon category matches',()=>{
 const generic={...DEFAULT_SCENE[1],id:'adrastea',label:'Adrastea',category:'moon'};
 const moon={...DEFAULT_SCENE[2],id:'moon',label:'Moon',category:'moon'};
 expect(searchBodies([generic,moon],'Moon','all').map(body=>body.id)).toEqual(['moon','adrastea']);
});
