/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standalone output for Vercel
  output: "standalone",

  // Skip prerendering pages that need database
  skipTrailingSlashRedirect: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
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
