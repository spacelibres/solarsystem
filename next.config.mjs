/** @type {import('next').NextConfig} */

// Building with the NASA asset mirror inside the project tree is refused by the
// `prebuild` script, not here: Turbopack resolves the mirror path while loading
// this config, so a check placed here runs too late to avoid the tree walk.

const nextConfig = {
  // The viewer loads a large ephemeris set on mount and owns a WebGL context, so
  // double-invoking effects in development only doubles network traffic.
  reactStrictMode: false,
  images: { unoptimized: true },
};

export default nextConfig;
