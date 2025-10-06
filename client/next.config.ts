import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows any hostname for HTTPS
      },
      {
        protocol: 'http',
        hostname: '**', // Allows any hostname for HTTP
      },
    ],
  },
};

export default nextConfig;
