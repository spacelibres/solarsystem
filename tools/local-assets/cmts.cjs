#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { once } = require('node:events');
const { args, atomicJson, sha256, assetPath } = require('./lib.cjs');
const BASE = 'https://eyes.nasa.gov/assets/dynamic/cmts';
function checkConfiguration(configuration) {
  if (!Number.isInteger(configuration.first_level) || configuration.first_level > 0 || configuration.first_level < -20 || !/^[a-z0-9]+$/i.test(configuration.extension) || !Array.isArray(configuration.boundaries)) throw new Error('Invalid CMTS configuration');
  for (const boundary of configuration.boundaries) {
    if (!Number.isInteger(boundary.face) || boundary.face < 0 || boundary.face > 5 || !Number.isInteger(boundary.last_level) || boundary.last_level < 0 || boundary.last_level > 30) throw new Error('Invalid CMTS boundary face/level');
    for (let axis = 0; axis < 2; axis++) if (!Number.isInteger(boundary.min?.[axis]) || !Number.isInteger(boundary.max?.[axis]) || boundary.min[axis] < 0 || boundary.max[axis] < boundary.min[axis] || boundary.max[axis] >= 2 ** boundary.last_level) throw new Error('Invalid CMTS boundary coordinates');
  }
}
// The recovered CMTSTile._isInABoundary projects each inclusive boundary to
// the requested level. Union intervals per row rather than retaining a Set of
// millions of tile URLs or scanning the mostly empty deepest-level globe.
function rectangles(configuration, face, level) {
  return configuration.boundaries.filter(b => b.face === face && b.last_level >= level).map(b => {
    const scale = 2 ** (b.last_level - level);
    return { x0: Math.floor(b.min[0] / scale), x1: Math.floor(b.max[0] / scale), y0: Math.floor(b.min[1] / scale), y1: Math.floor(b.max[1] / scale) };
  });
}
function* rowRanges(regions) {
  if (!regions.length) return;
  const first = Math.min(...regions.map(r => r.y0)), last = Math.max(...regions.map(r => r.y1));
  for (let y = first; y <= last; y++) {
    const intervals = regions.filter(r => r.y0 <= y && r.y1 >= y).map(r => [r.x0,r.x1]).sort((a,b) => a[0]-b[0] || a[1]-b[1]);
    let merged;
    for (const interval of intervals) {
      if (merged && interval[0] <= merged[1] + 1) merged[1] = Math.max(merged[1], interval[1]);
      else { if (merged) yield { y, x0:merged[0], x1:merged[1] }; merged = interval.slice(); }
    }
    if (merged) yield { y, x0:merged[0], x1:merged[1] };
  }
}
function* tileRanges(configuration, channel) {
  checkConfiguration(configuration);
  const maximum = Math.max(0, ...configuration.boundaries.map(b => b.last_level));
  for (let face = 0; face < 6; face++) {
    // CMTSTile always requests height level 0 at the root and explicitly skips
    // height in non-positive LOD updates. Negative height levels are unused.
    if (channel !== 'height' && rectangles(configuration, face, 0).length) for (let level = configuration.first_level; level < 0; level++) yield { face, level, y:0, x0:0, x1:0 };
    for (let level = 0; level <= maximum; level++) for (const range of rowRanges(rectangles(configuration, face, level))) yield { face, level, ...range };
  }
}
function* tileUrls(configuration, baseUrl, channel = baseUrl.split('/').at(-1)) {
  for (const range of tileRanges(configuration, channel)) for (let x = range.x0; x <= range.x1; x++) yield `${baseUrl}/${range.face}/${range.level}/${x}/${range.y}.${configuration.extension}`;
}
function summarize(configuration, baseUrl, channel = baseUrl.split('/').at(-1)) {
  let count = 0;
  const byLevel = {}, byFace = {}, samples = [];
  for (const range of tileRanges(configuration, channel)) {
    const n = range.x1 - range.x0 + 1;
    count += n; byLevel[range.level] = (byLevel[range.level] || 0) + n; byFace[range.face] = (byFace[range.face] || 0) + n;
    if (samples.length < 3) samples.push(`${baseUrl}/${range.face}/${range.level}/${range.x0}/${range.y}.${configuration.extension}`);
  }
  const deepest = Math.max(...configuration.boundaries.map(b=>b.last_level));
  const region = configuration.boundaries.find(b=>b.last_level === deepest);
  if (region) samples.push(`${baseUrl}/${region.face}/${deepest}/${region.min[0]}/${region.min[1]}.${configuration.extension}`);
  return { baseUrl, count, firstConfiguredLevel: configuration.first_level, firstRuntimeLevel: channel === 'height' ? 0 : configuration.first_level, byLevel, byFace, samples };
}
function configurations(mirror) {
  const result = [];
  for (const body of ['1_ceres','earth','mars','mercury','moon']) for (const channel of body === 'earth' ? ['color','normal','height','specular','night','cloud'] : ['color','normal','height']) {
    const baseUrl = `${BASE}/${body}/${channel}`;
    const file = path.join(mirror, assetPath(baseUrl + '/configuration.json'));
    const bytes = fs.readFileSync(file);
    const configuration = JSON.parse(bytes.toString('utf8'));
    checkConfiguration(configuration);
    result.push({ body, channel, baseUrl, configuration, configurationSha256:sha256(bytes) });
  }
  return result;
}
async function verifySamples(entries, fetcher = fetch) {
  const results = [];
  for (const channel of ['color','height','normal']) {
    const entry = entries.find(e => e.body === 'earth' && e.channel === channel);
    if (!entry) throw new Error('Missing Earth sample channel ' + channel);
    const url = tileUrls(entry.configuration, entry.baseUrl, channel).next().value;
    const response = await fetcher(url, { signal:AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`CMTS sample HTTP ${response.status}: ${url}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    const extension = entry.configuration.extension;
    if (extension === 'ktx2' && bytes.subarray(0,12).toString('hex') !== 'ab4b5458203230bb0d0a1a0a') throw new Error('Invalid KTX2 sample: ' + url);
    if (extension === 'webp' && (bytes.toString('ascii',0,4) !== 'RIFF' || bytes.toString('ascii',8,12) !== 'WEBP')) throw new Error('Invalid WebP sample: ' + url);
    results.push({channel,url,status:response.status,bytes:bytes.length,sha256:sha256(bytes)});
  }
  return results;
}
if (require.main === module) (async()=>{
  const options = args(process.argv.slice(2));
  const mirror = path.resolve(options.mirror || path.join(__dirname,'../../../.solarsystem-mirror'));
  const entries = configurations(mirror);
  const resources = entries.map(e => ({...summarize(e.configuration,e.baseUrl,e.channel),configurationSha256:e.configurationSha256}));
  const report = { schemaVersion:1, source:'eyes/src/engine/components/CMTSComponent.js CMTSTile._isInABoundary', configurations:resources, totalTiles:resources.reduce((n,r)=>n+r.count,0) };
  if (options['verify-samples']) report.sampleVerification = await verifySamples(entries);
  if (options.jsonl) {
    fs.mkdirSync(path.dirname(path.resolve(options.jsonl)),{recursive:true});
    const stream = fs.createWriteStream(options.jsonl);
    for (const entry of entries) for (const url of tileUrls(entry.configuration,entry.baseUrl,entry.channel)) if (!stream.write(JSON.stringify({url,path:assetPath(url),source:entry.baseUrl+'/configuration.json'})+'\n')) await once(stream,'drain');
    stream.end(); await once(stream,'finish');
  }
  const output = path.resolve(options.out || path.join(mirror,'cmts-inventory.json'));
  atomicJson(output,report);
  console.log(JSON.stringify({output,configurations:resources.length,totalTiles:report.totalTiles,verifiedSamples:report.sampleVerification?.length || 0,counts:resources.map(r=>({path:assetPath(r.baseUrl),count:r.count}))}));
})().catch(error=>{console.error(error);process.exitCode=1;});
module.exports = { checkConfiguration, rectangles, rowRanges, tileRanges, tileUrls, summarize, configurations, verifySamples };
