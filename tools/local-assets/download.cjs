#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const { assetPath, args, atomicJson, dependencies, sha256, validate, isDirectoryUrl } = require('./lib.cjs');
const { inventory } = require('./manifest.cjs');
async function provision({ mirror, manifest, concurrency = 6, retry = 2, timeout = 30000, fetcher = fetch, expectedMissing = [], onProgress, progressIntervalMs = 15000 }) {
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 32) throw new Error('concurrency must be 1..32');
  const queue = [], seen = new Set(), paths = new Map();
  const report = { schemaVersion: 1, completed: [], failures: [], expectedMissing: [], unresolved: manifest.unresolved || [] };
  const missing = new Set(expectedMissing);
  function enqueue(url, source) {
    if (isDirectoryUrl(url)) return;
    if (seen.has(url)) return;
    const relative = assetPath(url);
    const prior = paths.get(relative);
    if (prior && prior !== url) {
      const a = new URL(prior), b = new URL(url); a.searchParams.delete('v'); b.searchParams.delete('v');
      if (a.href !== b.href) throw new Error(`Meaningful query collision: ${url} and ${prior}`);
      return;
    }
    paths.set(relative, url); seen.add(url); queue.push({ url, path: relative, source });
  }
  for (const resource of manifest.resources) enqueue(resource.url, resource.source);
  async function one(item) {
    const target = path.resolve(mirror, item.path);
    if (!target.startsWith(path.resolve(mirror) + path.sep)) throw new Error('Asset escapes mirror root');
    let bytes, status = 'reused';
    try { bytes = await fsp.readFile(target); validate(bytes, item.url); }
    catch { bytes = null; }
    let last;
    if (!bytes) for (let attempt = 0; attempt <= retry; attempt++) {
      try {
        const response = await fetcher(item.url, { signal: AbortSignal.timeout(timeout) });
        if (!response.ok) {
          const error = new Error(`HTTP ${response.status}`); error.httpStatus = response.status; throw error;
        }
        bytes = Buffer.from(await response.arrayBuffer());
        validate(bytes, item.url, response.headers.get('content-type') || '');
        await fsp.mkdir(path.dirname(target), { recursive: true });
        const temporary = target + '.' + crypto.randomUUID() + '.tmp';
        try { await fsp.writeFile(temporary, bytes, { flag: 'wx' }); await fsp.rename(temporary, target); }
        finally { await fsp.unlink(temporary).catch(e => { if (e.code !== 'ENOENT') throw e; }); }
        status = 'downloaded'; last = null; break;
      } catch (error) { bytes = null; last = error; }
    }
    if (last) {
      const failure = { ...item, error: last.message, httpStatus: last.httpStatus || null, attempts: retry + 1, classification: missing.has(item.url) && last.httpStatus === 404 ? 'expected-404' : 'unverified-failure' };
      (failure.classification === 'expected-404' ? report.expectedMissing : report.failures).push(failure);
      return;
    }
    report.completed.push({ ...item, bytes: bytes.length, sha256: sha256(bytes), status });
    try { for (const url of dependencies(bytes, item.url)) enqueue(url, item.url); }
    catch (error) { report.failures.push({ ...item, error: 'Dependency discovery: ' + error.message, classification: 'unverified-failure' }); }
  }
  // A worker that discovers nested dependencies remains alive to consume them;
  // no unbounded Promise.all is created for large dynamo window catalogues.
  async function worker() { while (queue.length) await one(queue.shift()); }
  const startedAt = Date.now();
  const progress = () => onProgress?.({elapsedMs:Date.now()-startedAt,discovered:seen.size,pending:queue.length,completed:report.completed.length,downloaded:report.completed.filter(r=>r.status==='downloaded').length,reused:report.completed.filter(r=>r.status==='reused').length,failures:report.failures.length,expectedMissing:report.expectedMissing.length,bytes:report.completed.reduce((n,r)=>n+r.bytes,0)});
  progress();
  const timer = onProgress && progressIntervalMs > 0 ? setInterval(progress,progressIntervalMs) : null;
  try { await Promise.all(Array.from({ length: concurrency }, worker)); }
  finally { if(timer)clearInterval(timer); progress(); }
  for (const key of ['completed','failures','expectedMissing']) report[key].sort((a,b) => a.url.localeCompare(b.url));
  return report;
}
if (require.main === module) (async () => {
  const options = args(process.argv.slice(2));
  const mirror = path.resolve(options.mirror || path.join(__dirname, '../../../.solarsystem-mirror'));
  const manifest = options.manifest ? JSON.parse(fs.readFileSync(options.manifest, 'utf8')) : inventory({ mirror });
  if (!manifest.resources) manifest.resources = [...(manifest.static || []), ...(manifest.dynamic || [])].map(url => ({url}));
  if (options.legacy) {
    const legacy = JSON.parse(fs.readFileSync(options.legacy, 'utf8'));
    manifest.resources.push(...[...(legacy.static || []), ...(legacy.dynamic || [])].map(url => ({url,source:options.legacy})));
  }
  const expectedMissing = options['expected-missing'] ? JSON.parse(fs.readFileSync(options['expected-missing'], 'utf8')) : [];
  const output = path.resolve(options.report || path.join(mirror, 'provision-report.json'));
  const report = await provision({ mirror, manifest, concurrency: Number(options.concurrency || 6), retry: Number(options.retry || 2), timeout: Number(options.timeout || 30000), expectedMissing, progressIntervalMs:Number(options['progress-ms']||15000), onProgress:progress=>{atomicJson(output+'.progress.json',progress);console.error(JSON.stringify({progress}));} });
  atomicJson(output, report);
  console.log(JSON.stringify({ output, completed: report.completed.length, downloaded: report.completed.filter(r => r.status === 'downloaded').length, reused: report.completed.filter(r => r.status === 'reused').length, failures: report.failures.length, expectedMissing: report.expectedMissing.length, bytes: report.completed.reduce((n,r) => n+r.bytes,0) }));
  if (report.failures.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
module.exports = { provision };
