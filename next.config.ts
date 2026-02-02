import type { NextConfig } from "next";
import "./src/env"
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
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/auth/:path*",
  //       destination: `${process.env.BACKEND_API}/api/auth/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
