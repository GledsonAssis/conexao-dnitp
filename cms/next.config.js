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
        source: '/cms',
        has: [
          {
            type: 'header',
            key: 'referer',
            value: '(?<utm_source>http://localhost:3000/)'
          },
        ],
        permanent: true,
        destination: '/cms?utm_source=teste',
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
