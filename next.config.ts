import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.21.0.51', '127.0.0.1', 'localhost'],
  async redirects() {
    return [{ source: '/services/industrial', destination: '/services/commercial/industrial-construction', permanent: false }];
  },
};

export default nextConfig;
