export function loadArtworkBatch<T, R>(items: readonly T[], load: (item: T, index: number) => Promise<R>, dispose: (resource: R) => void, signal: AbortSignal, concurrency?: number): Promise<R[]>;
