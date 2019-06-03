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
      extensions: ['.ts', '.tsx'],
    },
    lngs: ['en'],
    resource: {
      loadPath: 'src/resources/locales/{{lng}}/{{ns}}.json',
      savePath: 'src/resources/locales/{{lng}}/{{ns}}.json',
    },
  },
};
