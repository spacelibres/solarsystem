const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { parseCapabilities, latestEarthDate, tileEntries, rewriteCapabilities } = require('./local-assets/wmts.cjs');
const fixture = fs.readFileSync('tests/fixtures/earth-wmts-capabilities.xml', 'utf8');
test('real Earth capabilities enumerate all advertised dimensions without guessed grids', () => {
 const c = parseCapabilities(fixture); const l = c.layers[0];
 assert.equal(l.id, 'VIIRS_SNPP_CorrectedReflectance_TrueColor');
 assert.equal(c.matrixSets[0].matrices.length, 9);
 const entries = [...tileEntries(c,{layerId:l.id,matrixSetId:'250m',date:'2026-10-23'})];
 assert.equal(entries.length,68273); assert.match(entries[0].url,/gitc\.earthdata\.nasa\.gov/);
 assert.ok(entries.at(-1).url.endsWith('/250m/8/159/319.jpeg'));
 assert.throws(()=>[...tileEntries(c,{layerId:'missing'})],/layer/i);
});
test('latest date uses actual availableDates and skips missing dates',()=> {
 assert.deepEqual(latestEarthDate({availableDates:{'2026-10-23':{layerId:'b'},'2026-10-24':{layerId:'a'}},missingDates:['2026-10-24']}),{date:'2026-10-23',layerId:'b'});
 assert.throws(()=>latestEarthDate({availableDates:{}}),/date/i);
});
test('snapshot XML rewrites absolute resource templates and freezes dimension',()=>{
 const out=rewriteCapabilities(fixture,{date:'2026-10-23',mapUrl:u=>'/nasa/external/'+new URL(u).host+new URL(u).pathname});
 assert.match(out,/<Default>2026-10-23<\/Default>/); assert.match(out,/<Value>2026-10-23<\/Value>/);
 assert.ok(!out.includes('template="https:')); assert.ok(out.includes('{TileRow}'));
});
test('rejects malicious XML and unknown/unbound template parameters',()=>{
 assert.throws(()=>parseCapabilities('<!DOCTYPE foo>'+fixture),/DTD|DOCTYPE/i);
 const c=parseCapabilities(fixture.replace('{TileCol}','{Unknown}'));
 assert.throws(()=>[...tileEntries(c,{layerId:c.layers[0].id,matrixSetId:'250m',date:'2026-10-23'})],/unresolved/i);
});


test('commented example matrices are not advertised',()=>{
 const c=parseCapabilities(fixture.replace('</TileMatrixSet>','</TileMatrixSet>'));
 const changed=fixture.replace('</Contents>','<!-- <TileMatrixSet><Identifier>fake</Identifier><TileMatrix><Identifier>0</Identifier><MatrixWidth>1</MatrixWidth><MatrixHeight>1</MatrixHeight></TileMatrix></TileMatrixSet> --></Contents>');
 assert.deepEqual(parseCapabilities(changed),c);
});
