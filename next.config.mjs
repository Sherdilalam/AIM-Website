/** @type {import('next').NextConfig} */
const nextConfig = {
  // Preserved Webflow scripts have real side effects and are not safe to
  // double-invoke, so disable StrictMode's development double-render.
  reactStrictMode: false,
  // Static HTML export (no Node server needed) -- matches the original static
  // site and deploys to any static host (e.g. Azure Static Web Apps).
  output: 'export',
  // We render the preserved Webflow <img> markup directly, so skip next/image.
  images: { unoptimized: true },
  // Emit /about-us/index.html so clean URLs work on static hosts.
  trailingSlash: true,
};

export default nextConfig;
