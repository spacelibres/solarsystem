export interface ResourceLease<T> {
  readonly ready: Promise<T>;
  release(): void;
}

interface Subscriber<T> {
  resolve(value: T): void;
  reject(reason: unknown): void;
  detach(): void;
}

interface Entry<T> {
  readonly key: string;
  readonly load: (signal: AbortSignal) => Promise<T>;
  readonly controller: AbortController;
  readonly owners: Set<Subscriber<T>>;
  state: 'queued' | 'loading' | 'ready' | 'dead';
  value?: T;
  bytes: number;
  used: number;
}

export interface ResourcePoolOptions<T> {
  readonly maxConcurrent: number;
  readonly maxBytes: number;
  readonly sizeOf: (value: T) => number;
  readonly dispose?: (value: T) => void;
}

function canceled(): DOMException {
  return new DOMException('Resource lease released or canceled', 'AbortError');
}

/** Owns physical requests and independently cancelable consumer leases. */
export class ResourcePool<T> {
  private readonly entries = new Map<string, Entry<T>>();
  private readonly queue: Entry<T>[] = [];
  private active = 0;
  private bytes = 0;
  private clock = 0;
  private disposed = false;

  constructor(private readonly options: ResourcePoolOptions<T>) {
    if (!Number.isSafeInteger(options.maxConcurrent) || options.maxConcurrent < 1 ||
        !Number.isFinite(options.maxBytes) || options.maxBytes < 0) {
      throw new RangeError('Resource limits must be finite and nonnegative, with positive integer concurrency');
    }
  }

  acquire(key: string, load: (signal: AbortSignal) => Promise<T>, signal?: AbortSignal): ResourceLease<T> {
    if (this.disposed || signal?.aborted) {
      return { ready: Promise.reject(canceled()), release() {} };
    }
    let entry = this.entries.get(key);
    if (!entry) {
      entry = { key, load, controller: new AbortController(), owners: new Set(), state: 'queued', bytes: 0, used: ++this.clock };
      this.entries.set(key, entry);
      this.queue.push(entry);
    }
    const owned = entry;
    owned.used = ++this.clock;
    let released = false;
    let subscriber!: Subscriber<T>;
    const release = () => {
      if (released) return;
      released = true;
      subscriber.detach();
      owned.owners.delete(subscriber);
      subscriber.reject(canceled());
      if (owned.owners.size === 0 && owned.state !== 'ready') this.remove(owned);
      this.trim();
    };
    const ready = new Promise<T>((resolve, reject) => {
      subscriber = { resolve, reject, detach: () => signal?.removeEventListener('abort', release) };
      owned.owners.add(subscriber);
      signal?.addEventListener('abort', release, { once: true });
      if (owned.state === 'ready') resolve(owned.value as T);
    });
    this.pump();
    return { ready, release };
  }

  snapshot(): Readonly<{ active: number; queued: number; entries: number; bytes: number; references: number }> {
    let references = 0;
    for (const entry of this.entries.values()) references += entry.owners.size;
    return Object.freeze({ active: this.active, queued: this.queue.length, entries: this.entries.size, bytes: this.bytes, references });
  }

  clearUnused(): void {
    for (const entry of this.entries.values()) if (!entry.owners.size) this.remove(entry);
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    for (const entry of this.entries.values()) this.remove(entry);
  }

  private destroy(value: T): void {
    // A consumer cleanup failure must not strand other leases or scheduler slots.
    try { this.options.dispose?.(value); } catch { /* Ownership is still relinquished. */ }
  }

  private remove(entry: Entry<T>, reason: unknown = canceled()): void {
    if (entry.state === 'dead') return;
    if (entry.state === 'ready') {
      this.bytes -= entry.bytes;
      this.destroy(entry.value as T);
      entry.value = undefined;
    }
    entry.state = 'dead';
    entry.controller.abort();
    if (this.entries.get(entry.key) === entry) this.entries.delete(entry.key);
    const index = this.queue.indexOf(entry);
    if (index >= 0) this.queue.splice(index, 1);
    for (const owner of entry.owners) { owner.detach(); owner.reject(reason); }
    entry.owners.clear();
  }

  private trim(): void {
    if (this.bytes <= this.options.maxBytes) return;
    const unused = [...this.entries.values()]
      .filter(entry => entry.state === 'ready' && entry.owners.size === 0)
      .sort((a, b) => a.used - b.used);
    for (const entry of unused) {
      this.remove(entry);
      if (this.bytes <= this.options.maxBytes) break;
    }
  }

  private pump(): void {
    while (!this.disposed && this.active < this.options.maxConcurrent && this.queue.length) {
      const entry = this.queue.shift()!;
      entry.state = 'loading';
      this.active++;
      // A canceled handler may ignore its signal; its slot stays occupied until settlement.
      void Promise.resolve().then(() => entry.load(entry.controller.signal)).then(value => {
        this.active--;
        if (entry.state === 'dead') {
          this.destroy(value);
        } else {
          try {
            const bytes = this.options.sizeOf(value);
            if (!Number.isFinite(bytes) || bytes < 0) throw new RangeError('Invalid resource byte size');
            entry.value = value;
            entry.bytes = bytes;
            entry.state = 'ready';
            this.bytes += bytes;
            for (const owner of entry.owners) owner.resolve(value);
            this.trim();
          } catch (error) {
            this.destroy(value);
            this.remove(entry, error);
          }
        }
        this.pump();
      }, error => {
        this.active--;
        this.remove(entry, error);
        this.pump();
      });
    }
  }
}
