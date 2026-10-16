/** @eyes-analysis
 * 文件职责：限制 worker 并发，排队分发任务并复用空闲 worker
 * 依据：// Recovered from vendors.js:811439-812562.；exports: WorkerPool
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
// Recovered from vendors.js:811439-812562.
/** @eyes-analysis
 * 类职责：限制 worker 并发，排队分发任务并复用空闲 worker
 * 继承：无显式父类；导出：WorkerPool。
 * 字段、全部方法、读写/调用证据及语义置信边界见逐类参考；本注释不改变执行流程。
 */
class WorkerPool {
  /** @eyes-analysis
   * 方法语义尚未人工确认；以下是当前源码的句法证据。
   * 状态写入：pool、queue、workerCreator、workerStatus、workers、workersResolve。
   */
  constructor(pool = 4) {
    this.pool = pool, this.queue = [], this.workers = [], this.workersResolve = [], this.workerStatus = 0, this.workerCreator = null;
  }
  /** @eyes-analysis
   * 源码方法 _initWorker；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：workers[e]。
   * 调用线索：t.addEventListener、this._onMessage.bind、this.workerCreator。
   */
  _initWorker(e) {
    if (!this.workers[e]) {
      const t = this.workerCreator();
      t.addEventListener("message", this._onMessage.bind(this, e)), this.workers[e] = t;
    }
  }
  /** @eyes-analysis
   * 源码方法 _getIdleWorker；作用以类职责与源码实现为准，未猜测压缩参数含义
   */
  _getIdleWorker() {
    for (let e = 0; e < this.pool; e++) if (!(this.workerStatus & 1 << e)) return e;
    return -1;
  }
  /** @eyes-analysis
   * 源码方法 _onMessage；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：workerStatus、workersResolve[e]。
   * 调用线索：n、this.queue.shift、this.workers[e].postMessage。
   */
  _onMessage(e, t) {
    const n = this.workersResolve[e];
    if (n && n(t), this.queue.length) {
      const {
        resolve: resolve,
        msg: msg,
        transfer: transfer
      } = this.queue.shift();
      this.workersResolve[e] = resolve, this.workers[e].postMessage(msg, transfer);
    } else this.workerStatus ^= 1 << e;
  }
  /** @eyes-analysis
   * 源码方法 setWorkerCreator；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：workerCreator。
   */
  setWorkerCreator(workerCreator) {
    this.workerCreator = workerCreator;
  }
  /** @eyes-analysis
   * 源码方法 setWorkerLimit；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：pool。
   */
  setWorkerLimit(pool) {
    this.pool = pool;
  }
  /** @eyes-analysis
   * 源码方法 postMessage；作用以类职责与源码实现为准，未猜测压缩参数含义
   * 状态写入：workerStatus、workersResolve[r]。
   * 调用线索：new Promise、this._getIdleWorker、this._initWorker、this.queue.push、this.workers[r].postMessage。
   */
  postMessage(e, t) {
    return new Promise(n => {
      const r = this._getIdleWorker();
      -1 !== r ? (this._initWorker(r), this.workerStatus |= 1 << r, this.workersResolve[r] = n, this.workers[r].postMessage(e, t)) : this.queue.push({
        resolve: n,
        msg: e,
        transfer: t
      });
    });
  }
  /** @eyes-analysis
   * 发送释放事件或销毁持有的 GPU/worker 资源；JS 对象仍需调用方解除引用
   * 状态写入：queue.length、workerStatus、workers.length、workersResolve.length。
   * 调用线索：e.terminate、this.workers.forEach。
   */
  dispose() {
    this.workers.forEach(e => e.terminate()), this.workersResolve.length = 0, this.workers.length = 0, this.queue.length = 0, this.workerStatus = 0;
  }
}
export { WorkerPool };
