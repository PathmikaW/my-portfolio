import withNextIntl from 'next-intl/plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Your Next.js configuration
   devIndicators: false,
};

export default withNextIntl()(nextConfig);
