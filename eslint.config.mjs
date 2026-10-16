import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'tools/**',
      // Standalone host scripts: they run under plain Node on the server, outside
      // this package's module system, so the app's lint rules do not apply.
      'deploy/**',
      'next-env.d.ts',
      'data/**',
      'artifacts/**',
      'deobf/**',
      'public/eyes/**',
    ],
  },
];

export default config;
