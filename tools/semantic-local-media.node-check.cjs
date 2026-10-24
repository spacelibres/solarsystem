const {test}=require('node:test');const assert=require('node:assert/strict');
test('nested third-party image resources map locally while attribution pages stay external',async()=>{
 const {localizeAssetUrls}=await import('../eyes/scripts/local-assets.mjs');
 assert.equal(localizeAssetUrls('<img src="https://photojournal.jpl.nasa.gov/jpeg/PIA00001.jpg">'),'<img src="/nasa/external/photojournal.jpl.nasa.gov/jpeg/PIA00001.jpg">');
 assert.equal(localizeAssetUrls('https://www.nasa.gov/mission/'),'https://www.nasa.gov/mission/');
});
