/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fully static site (home + SSG project pages, no server runtime) → export to
  // `out/` so it can be hosted as static files (AWS Amplify static hosting).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
