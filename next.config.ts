import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Product and section imagery is served from the store's own Shopify CDN.
    remotePatterns: [
      { protocol: 'https', hostname: 'www.thekskinstudio.com', pathname: '/cdn/**' },
      { protocol: 'https', hostname: 'thekskinstudio.com', pathname: '/cdn/**' },
      { protocol: 'https', hostname: 'cdn.shopify.com', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
