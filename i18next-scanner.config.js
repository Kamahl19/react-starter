module.exports = {
  input: ['src/**/*.js', '!src/**/*.test.js'],
  options: {
    debug: true,
    sort: true,
    func: {
      list: ['t'],
      extensions: ['.js'],
    },
    trans: {
      extensions: ['.js'],
    },
    lngs: ['en'],
    ns: ['resource'],
    defaultNs: 'resource',
    resource: {
      loadPath: 'src/resources/locales/{{lng}}/{{ns}}.json',
      savePath: 'src/resources/locales/{{lng}}/{{ns}}.json',
    },
    nsSeparator: false,
  },
};
