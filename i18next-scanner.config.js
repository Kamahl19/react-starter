const typescriptTransform = require('i18next-scanner-typescript');

module.exports = {
  input: ['src/**/*.{ts,tsx}', '!src/**/*.test.{ts,tsx}'],
  options: {
    debug: true,
    sort: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.ts', '.tsx'],
    },
    trans: {
      extensions: [], // Parse Trans only in custom transformer
    },
    lngs: ['en'],
    resource: {
      loadPath: 'public/locales/{{lng}}/{{ns}}.json',
      savePath: 'public/locales/{{lng}}/{{ns}}.json',
    },
  },
  transform: typescriptTransform(),
};
