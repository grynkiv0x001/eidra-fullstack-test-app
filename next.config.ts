import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'work-test-web-2024-eze6j4scpq-lz.a.run.app',
      },
    ],
  },
};

export default nextConfig;
