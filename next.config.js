/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip static page generation during build if DB not available
  output: 'standalone',
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  
  // Disable static generation for dynamic routes during build
  experimental: {
    // This prevents build errors when MongoDB is not available
  },
  
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
