/**
 * Time-segmented parenting.
 *
 * NASA Eyes does not place every body relative to the Sun. Each entity carries
 * a `parents` table of `[startTime, parentName]` segments and is re-parented as
 * simulation time advances, which is how a spacecraft flies
 *
 *   Earth launch → heliocentric cruise → Jupiter capture → moon flybys
 *
 * while its `.dyn` files keep describing motion *relative to whatever it is
 * currently attached to*. World position is then the sum of local positions up
 * the parent chain (see `worldPosition`).
 *
 * Times are seconds since J2000. `-Infinity` from NASA's bundle is stored as
 * {@link ALWAYS} because JSON cannot carry infinities.
 */

/** Sentinel meaning "attached from the beginning of time". */
export const ALWAYS = -1e18;

export type ParentSegment = [time: number, parent: string];

/**
 * Resolve the parent of an entity at `time`, mirroring NASA's
 * `getParentAtTime`: find the last segment whose start is ≤ time, falling back
 * to "no parent" when time precedes every segment.
 *
 * An empty parent name means the body sits in the root frame (NASA's `""`).
 */
export function parentAtTime(segments: ParentSegment[], time: number): string | null {
  if (!segments.length) return null;
  let best: ParentSegment | null = null;
  for (const seg of segments) {
    if (seg[0] <= time) best = seg;
    else break; // segments are time-sorted
  }
  if (!best) return null;
  return best[1] === '' ? null : best[1];
}

/**
 * Index of the active segment, or -1 when time precedes all segments. Used to
 * pair a parenting segment with the matching dynamo controller, since NASA
 * lists them in the same order.
 */
export function parentSegmentIndex(segments: ParentSegment[], time: number): number {
  let idx = -1;
  for (let i = 0; i < segments.length; i++) {
    if (segments[i][0] <= time) idx = i;
    else break;
  }
  return idx;
}

export interface TreeNode {
  id: string;
  parentId: string | null;
  children: string[];
}

/**
 * Build the parent→children index for a fixed time. Cycles are broken by
 * falling back to the root, so a malformed table cannot hang the frame loop.
 */
export function buildTree(
  ids: Iterable<string>,
  segmentsOf: (id: string) => ParentSegment[],
  time: number,
): Map<string, TreeNode> {
  const nodes = new Map<string, TreeNode>();
  for (const id of ids) nodes.set(id, { id, parentId: null, children: [] });

  for (const id of ids) {
    const parentId = parentAtTime(segmentsOf(id), time);
    const node = nodes.get(id)!;
    if (!parentId || !nodes.has(parentId) || parentId === id) continue;

    // Guard against cycles by walking up before linking.
    let cursor: string | null = parentId;
    let cyclic = false;
    for (let guard = 0; cursor && guard < 64; guard++) {
      if (cursor === id) { cyclic = true; break; }
      cursor = nodes.get(cursor)?.parentId ?? null;
    }
    if (cyclic) continue;

    node.parentId = parentId;
    nodes.get(parentId)!.children.push(id);
  }
  return nodes;
}

/**
 * World position of a node = sum of local positions from the node up to the root.
 * `localOf` returns a body's position relative to its current parent (NaN when
 * unknown, which NASA propagates rather than discarding).
 */
export function worldPosition(
  id: string,
  nodes: Map<string, TreeNode>,
  localOf: (id: string) => { x: number; y: number; z: number },
): { x: number; y: number; z: number } {
  let x = 0;
  let y = 0;
  let z = 0;
  let cursor: string | null = id;
  for (let guard = 0; cursor && guard < 64; guard++) {
    const p = localOf(cursor);
    x += p.x;
    y += p.y;
    z += p.z;
    cursor = nodes.get(cursor)?.parentId ?? null;
  }
  return { x, y, z };
}

/** Depth of a node from the root, used for render ordering. */
export function depthOf(id: string, nodes: Map<string, TreeNode>): number {
  let depth = 0;
  let cursor: string | null = id;
  for (let guard = 0; cursor && guard < 64; guard++) {
    cursor = nodes.get(cursor)?.parentId ?? null;
    if (cursor) depth++;
  }
  return depth;
}
