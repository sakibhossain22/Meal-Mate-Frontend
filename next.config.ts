import type { NextConfig } from "next";
import "./src/env"
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'themes.templatescoder.com',
      }
    ]
  }
};

export default nextConfig;
