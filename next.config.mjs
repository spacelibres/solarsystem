/** @type {import('next').NextConfig} */
const nextConfig = {
  // The viewer loads a large ephemeris set on mount and owns a WebGL context, so
  // double-invoking effects in development only doubles network traffic.
  reactStrictMode: false,
  images: { unoptimized: true },
};

export default nextConfig;
