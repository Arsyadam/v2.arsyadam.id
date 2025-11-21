import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Configure external image domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.cdn.dicoding.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // Configure CORS headers for API routes
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
