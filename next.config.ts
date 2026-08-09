import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/how-it-works",
        destination: "/how-to-apply",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/international-driving-permit-:citySlug",
        destination: "/city/:citySlug",
      },
    ];
  },
};

export default nextConfig;
