import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.21.0.51', '127.0.0.1', 'localhost'],
  async redirects() {
    return [
      { source: '/services/industrial', destination: '/services/commercial/industrial-food', permanent: false },
      { source: '/services/commercial/industrial-construction', destination: '/services/commercial/industrial-food', permanent: false },
      { source: '/services/commercial/retail-parking', destination: '/services/commercial/retail-restaurants-automotive', permanent: false },
      { source: '/services/commercial/fleet', destination: '/services/commercial/fleet-logistics', permanent: false },
    ];
  },
};

export default nextConfig;
