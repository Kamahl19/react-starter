/**
 * TODO
 * remove once this issue https://github.com/storybookjs/storybook/issues/7563 is fixed
 */

module.exports = ({ config }) => {
  const babelLoader = config.module.rules.find(
    rule => rule.loader && rule.loader.includes('babel')
  );

  babelLoader.include = [babelLoader.include, __dirname];

  return config;
};
