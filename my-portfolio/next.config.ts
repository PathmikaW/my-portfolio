import withNextIntl from 'next-intl/plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Your Next.js configuration
   devIndicators: false,
   images: {
     // Blog post covers are served from Medium's CDN
     remotePatterns: [{ protocol: 'https', hostname: 'cdn-images-1.medium.com' }],
   },
};

export default withNextIntl()(nextConfig);
