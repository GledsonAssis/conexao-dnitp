// next.config.js
const withImages = require('next-images');
const { i18n } = require('./next-i18next.config');
const { routes } = require('./src/infra/services/routes');

module.exports = {
  basePath: process.env.BASEURL,
  compress: false,
  async redirects() {
    return [
      {
        source: '/cms/:path*',
        destination: '/cms/:path*',
        permanent: true,
      }
    ];
  },
  async rewrites() {
    return routes;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  ...withImages(),
  i18n,
  react: { useSuspense: false },
};
