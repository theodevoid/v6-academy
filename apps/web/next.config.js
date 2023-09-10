/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
      },
    ],
  },
  transpilePackages: ['@v6-academy/db', '@v6-academy/dto'],
};

module.exports = nextConfig;
