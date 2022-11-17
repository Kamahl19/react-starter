module.exports = {
  locales: ['en'],
  input: ['src/**/*.{ts,tsx}', '!src/**/*.{spec,test}.{ts,tsx}', '!src/**/__tests__/**/*'],
  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  sort: true,
  verbose: true,
};
