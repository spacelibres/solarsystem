// Recovered from vendors.js:811439-812562.
class WorkerPool {
  constructor(pool = 4) {
    this.pool = pool, this.queue = [], this.workers = [], this.workersResolve = [], this.workerStatus = 0, this.workerCreator = null;
  }
  _initWorker(e) {
    if (!this.workers[e]) {
      const t = this.workerCreator();
      t.addEventListener("message", this._onMessage.bind(this, e)), this.workers[e] = t;
    }
  }
  _getIdleWorker() {
    for (let e = 0; e < this.pool; e++) if (!(this.workerStatus & 1 << e)) return e;
    return -1;
  }
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
  setWorkerCreator(workerCreator) {
    this.workerCreator = workerCreator;
  }
  setWorkerLimit(pool) {
    this.pool = pool;
  }
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
  dispose() {
    this.workers.forEach(e => e.terminate()), this.workersResolve.length = 0, this.workers.length = 0, this.queue.length = 0, this.workerStatus = 0;
  }
}
export { WorkerPool };
