import withNextIntl from 'next-intl/plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Your Next.js configuration
  experimental: {
    typedRoutes: true,
  },
};

export default withNextIntl()(nextConfig);
