/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // NASA's asset bucket allows per-file hotlinking but sends no CORS relaxation
  // for canvas readback; we only sample pixels for rendering, so requests are
  // fine as-is. Keep images unoptimised since all art comes from NASA directly.
  images: { unoptimized: true },
};

export default nextConfig;
