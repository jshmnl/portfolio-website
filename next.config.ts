import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Allow local images from the public folder
    unoptimized: false,
  },
}

export default nextConfig
