import catalog from '../../../data/starlink-orbits.json';
import { encodeStarlinkDyn } from '../../../lib/starlink/dyn';
import type { StarlinkOrbit } from '../../../solar/domain/starlink';

export async function GET(request: Request) {
  const number = Number(new URL(request.url).searchParams.get('n'));
  if (!Number.isInteger(number) || number <= 0) {
    return new Response('Expected ?n=<starlink number>', { status: 400 });
  }
  const satellite = (catalog.satellites as unknown as StarlinkOrbit[]).find(orbit => orbit.n === number);
  if (!satellite) return new Response(`Unknown STARLINK-${number}`, { status: 404 });
  try {
    const bytes = encodeStarlinkDyn(satellite);
    return new Response(bytes, {
      headers: {
        'content-type': 'application/octet-stream',
        'cache-control': 'public, max-age=86400, immutable',
      },
    });
  } catch (error) {
    return new Response(error instanceof Error ? error.message : 'Encode failed', { status: 500 });
  }
}
