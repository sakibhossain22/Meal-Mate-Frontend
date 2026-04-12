import type { NextConfig } from "next";
import "./src/env";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      }
    ]
  },

  // --- নতুন হেডার অংশ যা পপ-আপ এরর ফিক্স করতে সাহায্য করবে ---
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;