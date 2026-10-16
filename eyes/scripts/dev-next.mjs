import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { buildEyes } from './build.mjs';
const require = createRequire(import.meta.url);
const watcher = await buildEyes({ watch: true, publish: true });
const child = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'dev', ...process.argv.slice(2)], { stdio: 'inherit' });
let stopping = false;
async function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  child.kill();
  await watcher.dispose();
  process.exit(code);
}
process.on('SIGINT', () => { void stop(); });
process.on('SIGTERM', () => { void stop(); });
child.on('exit', code => { void stop(code ?? 1); });
child.on('error', error => { console.error(error); void stop(1); });
