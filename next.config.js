/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      // Cloudflare R2 domains (replace with your actual domains)
      'pub-5458c2318bd04430871d38443c0c616b.r2.dev',
      'your-custom-domain.com',
      'img.clerk.com',
      'images.unsplash.com',
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig