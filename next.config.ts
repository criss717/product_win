import type { NextConfig } from 'next';

/**
 * Configuración principal de Next.js para la aplicación product_star.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'cf.cjdropshipping.com'
      },
      {
        protocol: 'https',
        hostname: 'oss-cf.cjdropshipping.com'
      },
      {
        protocol: 'https',
        hostname: 'cc-west-usa.oss-us-west-1.aliyuncs.com'
      },
      {
        protocol: 'https',
        hostname: 'cbu01.alicdn.com'
      }
    ]
  }
};

export default nextConfig;
