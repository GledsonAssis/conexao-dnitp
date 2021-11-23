const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en-US'],
    localeDetection: false,
  },
  localePath: path.resolve('./src/static/locales'),
};
