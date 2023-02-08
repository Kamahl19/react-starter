import { deepmergeCustom } from 'deepmerge-ts';
import { theme, type ThemeConfig } from 'antd';

const baseConfig: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  // https://ant.design/docs/react/customize-theme#theme
};

export default baseConfig;

export const mergeWithBase = (config: ThemeConfig) =>
  deepmergeCustom({ mergeArrays: false })(baseConfig, config);
