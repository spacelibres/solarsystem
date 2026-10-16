/** @eyes-analysis
 * 文件职责：启动 Eyes 监听构建与 Next 开发子进程；信号退出时释放监听器
 * 依据：当前源码声明、导入关系及工程调用链
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
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
