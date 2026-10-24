import { expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

it('publishes same-origin shell resource references', () => {
  for (const name of readdirSync('public/eyes').filter(name => /\.(html|css)$/.test(name))) {
    const shell = readFileSync(join('public/eyes', name), 'utf8');
    expect(shell).not.toMatch(/(?:src\s*=\s*["']|url\(\s*["']?)(?:https?:)?\/\//i);
    expect(shell).not.toMatch(/<link\b[^>]*rel=["'](?:stylesheet|preload|modulepreload)["'][^>]*href=["']https?:\/\//i);
  }
});

it('serves a strict Eyes policy and retains immutable decoder caching', async () => {
  const configPath = '../next.config.mjs';
  const policyPath = '../eyes/scripts/local-assets.mjs';
  const [{ default: config }, { eyesResourcePolicy }] = await Promise.all([import(configPath), import(policyPath)]);
  const headers = await config.headers();
  for (const source of ['/eyes', '/eyes/:path*']) {
    expect(headers.find((entry: { source: string }) => entry.source === source).headers)
      .toContainEqual({ key: 'Content-Security-Policy', value: eyesResourcePolicy });
  }
  expect(eyesResourcePolicy).not.toMatch(/https:|\*|'unsafe-eval'/);
  expect(headers.find((entry: { source: string }) => entry.source === '/eyes/decoders/:path*').headers)
    .toContainEqual({ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' });
});
