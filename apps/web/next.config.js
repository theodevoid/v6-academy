const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
      },
      {
        hostname: 'localhost',
      },
    ],
  },
  transpilePackages: ['@v6-academy/db', '@v6-academy/dto', '@v6-academy/api'],
  webpack: (config, options) => {
    if (options.isServer) {
      config.externals = ['@tanstack/react-query', ...config.externals];
    }
    config.resolve.alias['@tanstack/react-query'] = path.resolve(
      require.resolve('@tanstack/react-query'),
      '../../../',
    );
    return config;
  },
};

module.exports = nextConfig;
