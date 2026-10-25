const {test}=require('node:test');
const assert=require('node:assert/strict');
test('home starts collapsed while retaining populated stories and the existing open action',async()=>{
 const {installHomePanelPolicy}=await import('../eyes/src/runtime/home-panel-policy.js');
 const panel={visible:false,cards:[],show(){this.visible=true;},hide(){this.visible=false;}};
 class HomeView{
  constructor(){this._app={getComponent:name=>name==='featuredStoriesPanel'?panel:null};}
  async _updateComponents(params){panel.cards=params.cards;panel.show();return 'updated';}
 }
 installHomePanelPolicy(HomeView);
 const view=new HomeView();
 assert.equal(await view._updateComponents({cards:['mission','event']}),'updated');
 assert.equal(panel.visible,false);
 assert.deepEqual(panel.cards,['mission','event']);
 panel.show();assert.equal(panel.visible,true);
 await view._updateComponents({cards:['next']});assert.equal(panel.visible,false);
});
